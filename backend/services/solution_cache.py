r"""Solution Cache — instant repeat answers + warm precompute.

THE PROBLEM: Every solve runs SymPy fresh. The same problem solved
twice (two students, or retry after hint) pays the full compute cost.
SymPy operations take 50-500ms; timeouts are 10-15s. Repeat solves
should be instant.

THE FIX: Two-layer cache:
  L1: In-memory LRU (per-process, survives within a worker)
  L2: JSON file on disk (survives restarts, shared across workers)

Key: hash(problem_type_id + sorted(inputs)) — deterministic.

WARM START: `python -m backend.services.solution_cache --warm` solves
all 183 problem types with their DEFAULT/example inputs at startup.
First real student request for any type = cache hit.

This also powers /v2/show-another: variant answers are cached so the
client can verify the student's attempt without re-solving.
"""

from __future__ import annotations

import hashlib
import json
import os
import threading
import time
from collections import OrderedDict
from typing import Optional

CACHE_DIR = os.path.join(
    os.environ.get("DREAM_DATA", r"D:\platform\cbse_data"),
    "solution_cache",
)
CACHE_FILE = os.path.join(CACHE_DIR, "solutions.jsonl")

MAX_MEMORY_ENTRIES = 2000
MAX_AGE_SECONDS = 7 * 24 * 3600  # 1 week


def _cache_key(problem_type_id: str, inputs: dict) -> str:
    """Deterministic cache key from problem type + inputs."""
    # Sort keys so {'a':1,'b':2} == {'b':2,'a':1}
    canonical = json.dumps(
        {problem_type_id: inputs}, sort_keys=True, ensure_ascii=False
    )
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()[:40]


class SolutionCache:
    """Thread-safe two-layer solution cache."""

    def __init__(self, cache_file: str = CACHE_FILE):
        self._lock = threading.RLock()
        self._mem: OrderedDict[str, tuple[float, dict]] = OrderedDict()
        self._cache_file = cache_file
        self._disk: dict[str, tuple[float, dict]] = {}
        self.hits = 0
        self.misses = 0
        self._load_disk()

    # ── Disk layer ───────────────────────────────────────────────
    def _load_disk(self) -> None:
        """Load the JSONL cache at startup (best-effort)."""
        if not os.path.exists(self._cache_file):
            return
        try:
            now = time.time()
            with open(self._cache_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        entry = json.loads(line)
                        key = entry["k"]
                        ts = entry["t"]
                        if now - ts <= MAX_AGE_SECONDS:
                            self._disk[key] = (ts, entry["v"])
                    except (json.JSONDecodeError, KeyError):
                        continue
        except OSError:
            pass

    def _append_disk(self, key: str, value: dict) -> None:
        """Append one entry to the JSONL cache (best-effort)."""
        try:
            os.makedirs(os.path.dirname(self._cache_file), exist_ok=True)
            with open(self._cache_file, "a", encoding="utf-8") as f:
                f.write(json.dumps(
                    {"k": key, "t": time.time(), "v": value},
                    ensure_ascii=False,
                ) + "\n")
        except OSError:
            pass

    # ── Public API ───────────────────────────────────────────────
    def get(self, problem_type_id: str, inputs: dict) -> Optional[dict]:
        """Get a cached solution. None on miss.

        Layer order: memory → Redis (shared, multi-instance) → disk.
        Each lower layer promotes upward on hit.
        """
        key = _cache_key(problem_type_id, inputs)
        now = time.time()
        with self._lock:
            # L1: memory
            entry = self._mem.get(key)
            if entry and now - entry[0] <= MAX_AGE_SECONDS:
                self._mem.move_to_end(key)
                self.hits += 1
                _record_cache_hit("memory")
                return entry[1]
        # L2: Redis (shared across instances — outside the lock, best-effort)
        redis_layer = _get_redis()
        if redis_layer is not None:
            cached = redis_layer.get(key)
            if cached is not None:
                with self._lock:
                    self._mem[key] = (time.time(), cached)
                    self._mem.move_to_end(key)
                    self._evict_memory()
                self.hits += 1
                _record_cache_hit("redis")
                return cached
        # L3: disk
        with self._lock:
            entry = self._disk.get(key)
            if entry and now - entry[0] <= MAX_AGE_SECONDS:
                # Promote to memory (and Redis below, outside lock)
                self._mem[key] = entry
                self._mem.move_to_end(key)
                self._evict_memory()
                self.hits += 1
                _record_cache_hit("disk")
                disk_value = entry[1]
            else:
                disk_value = None
        if disk_value is not None:
            if redis_layer is not None:
                redis_layer.put(key, disk_value)  # backfill Redis from disk
            return disk_value
        self.misses += 1
        _record_cache_miss()
        return None

    def put(self, problem_type_id: str, inputs: dict, solution: dict) -> None:
        """Cache a solution (write-through: memory + Redis + disk)."""
        if not solution.get("success"):
            return  # only cache successful solves
        key = _cache_key(problem_type_id, inputs)
        with self._lock:
            self._mem[key] = (time.time(), solution)
            self._mem.move_to_end(key)
            self._evict_memory()
        redis_layer = _get_redis()
        if redis_layer is not None:
            redis_layer.put(key, solution)
        self._append_disk(key, solution)

    def stats(self) -> dict:
        with self._lock:
            result = {
                "memory_entries": len(self._mem),
                "disk_entries": len(self._disk),
                "hits": self.hits,
                "misses": self.misses,
                "hit_rate": round(self.hits / max(1, self.hits + self.misses), 3),
            }
        redis_layer = _get_redis()
        if redis_layer is not None:
            result["redis"] = redis_layer.status()
        return result

    def _evict_memory(self) -> None:
        while len(self._mem) > MAX_MEMORY_ENTRIES:
            self._mem.popitem(last=False)


# ═══════════════════════════════════════════════════════════════════
# Singleton + facade integration
# ═══════════════════════════════════════════════════════════════════

_cache: Optional[SolutionCache] = None
_cache_lock = threading.Lock()


def get_cache() -> SolutionCache:
    global _cache
    with _cache_lock:
        if _cache is None:
            _cache = SolutionCache()
        return _cache


def _get_redis():
    """Best-effort Redis layer (None if unconfigured/down). Never raises."""
    try:
        from backend.services.redis_cache import get_redis_layer
        return get_redis_layer()
    except Exception:
        return None


def _record_cache_hit(layer: str) -> None:
    """Record a cache hit in Prometheus metrics (best-effort)."""
    try:
        from backend.services.metrics import CACHE_HITS
        CACHE_HITS.labels(layer=layer).inc()
    except Exception:
        pass


def _record_cache_miss() -> None:
    """Record a cache miss in Prometheus metrics (best-effort)."""
    try:
        from backend.services.metrics import CACHE_MISSES
        CACHE_MISSES.inc()
    except Exception:
        pass


def cached_solve_step(step_type_id: str, inputs: dict,
                      subject: str = "", class_level: str = "") -> dict:
    """Solve with cache + adaptive routing. Returns the SolutionResult as a dict.

    Cache hit → instant (0ms).
    Cache miss → adaptive routing:
      light step types → in-thread (no IPC overhead)
      heavy step types → process pool (N-core parallelism)
    """
    cache = get_cache()
    cached = cache.get(step_type_id, inputs)
    if cached is not None:
        result = dict(cached)
        result["cache_hit"] = True
        return result

    from backend.services.process_solver_pool import adaptive_solve_step
    result = adaptive_solve_step(
        step_type_id, inputs, subject=subject, class_level=class_level
    )
    as_dict = result.model_dump()
    as_dict["cache_hit"] = False
    cache.put(step_type_id, inputs, as_dict)
    return as_dict


# ═══════════════════════════════════════════════════════════════════
# Warm start — precompute all problem types
# ═══════════════════════════════════════════════════════════════════

def warm_cache(limit: int = 0) -> dict:
    """Precompute solutions for all step types using their defaults.

    Solves each step type with its default/example input values so the
    first real student request is a cache hit.

    Run: python -m backend.services.solution_cache --warm
    """
    from backend.ai.step_types import get_all_step_types
    from backend.solver_facade import get_facade

    facade = get_facade()
    cache = get_cache()
    step_types = get_all_step_types()

    warmed = 0
    failed = 0
    skipped = 0
    errors = []

    for st in step_types:
        if limit and warmed >= limit:
            break
        # Build default inputs from the step type's field definitions
        defaults = {}
        has_required = False
        for f in st.inputs:
            if f.default:
                defaults[f.name] = f.default
            elif f.required:
                has_required = True
                break  # can't warm a required field with no default

        if has_required or not defaults:
            skipped += 1
            continue

        # Already cached?
        if cache.get(st.id, defaults) is not None:
            skipped += 1
            continue

        try:
            result = facade.solve_step(st.id, defaults)
            if result.success:
                warmed += 1
            else:
                failed += 1
                if len(errors) < 10:
                    errors.append(f"{st.id}: {result.error[:80]}")
        except Exception as e:
            failed += 1
            if len(errors) < 10:
                errors.append(f"{st.id}: {str(e)[:80]}")

    return {
        "warmed": warmed,
        "failed": failed,
        "skipped_no_defaults": skipped,
        "cache_stats": cache.stats(),
        "sample_errors": errors,
    }


if __name__ == "__main__":
    import sys
    if "--warm" in sys.argv:
        print("Warming solution cache...")
        result = warm_cache()
        print(json.dumps(result, indent=2))
    elif "--stats" in sys.argv:
        print(json.dumps(get_cache().stats(), indent=2))
    else:
        print("Use --warm to precompute or --stats to view cache stats")
