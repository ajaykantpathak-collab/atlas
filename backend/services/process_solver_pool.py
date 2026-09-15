r"""Process-pool solver — bypass the GIL for cold SymPy solves.

THE PROBLEM: Python threads unblock the event loop but do NOT parallelize
SymPy (pure-Python CPU work holds the GIL). One core of solve throughput
per worker, no matter the thread count.

THE FIX: cold solves run in a process pool. N cores → N parallel solves.
Measured: threads gave 5x latency isolation; processes give N-x CPU
parallelism.

DESIGN (Windows-safe):
  - Workers created via spawn; each worker warms the facade ONCE in its
    initializer (forces the lazy backend imports).
  - Per-solve timeout: a hung worker can't be interrupted, so after 3
    consecutive timeouts the ENTIRE pool is killed and recreated fresh
    (stuck workers die with it). max_tasks_per_child recycles workers
    normally between hangs.
  - Graceful fallback: if the pool can't start (or dies twice), solving
    falls back to in-thread permanently — the app never stops working,
    it just loses the parallelism bonus.
  - Cache hits NEVER touch the pool (handled in solution_cache first).

INTEGRATION: solution_cache.cached_solve_step calls
pool_solve_step() on cache miss. Nothing else needs to change.
"""

from __future__ import annotations

import os
import sys
import threading
import time
from concurrent.futures import ProcessPoolExecutor, Future
from concurrent.futures.process import BrokenProcessPool
from typing import Optional

# Make spawn workers able to import backend.*
_PLATFORM_ROOT = r"D:\platform"
if _PLATFORM_ROOT not in sys.path:
    sys.path.insert(0, _PLATFORM_ROOT)

from backend.contracts import SolutionResult, SolverTier

# ── Config ──────────────────────────────────────────────────────
POOL_SIZE = int(os.environ.get("SOLVER_POOL_SIZE", "0")) or os.cpu_count() or 4
SOLVE_TIMEOUT_S = float(os.environ.get("SOLVER_TIMEOUT_S", "12"))
MAX_TASKS_PER_CHILD = 50          # recycle workers regularly
HANG_THRESHOLD = 3               # consecutive timeouts → pool restart
POOL_RESTART_LIMIT = 2            # after 2 failed restarts → in-thread forever

_state_lock = threading.RLock()
_executor: Optional[ProcessPoolExecutor] = None
_consecutive_timeouts = 0
_pool_restarts = 0
_fallback_mode = False            # True → skip pool permanently
_in_flight = 0                    # submitted futures not yet completed


# ── Prometheus pool gauges (lazy import — module stays importable without metrics) ──
def _pool_gauges():
    try:
        from backend.services.metrics import POOL_SIZE as _GS, POOL_ACTIVE as _GA, POOL_QUEUED as _GQ
        return _GS, _GA, _GQ
    except Exception:
        return None, None, None


def _emit_pool_metrics() -> None:
    """Sync the process_pool_* Prometheus gauges with current pool state.

    POOL_SIZE  = configured worker count when pool alive, else 0
    POOL_ACTIVE = min(in_flight, pool_size) — workers currently busy
    POOL_QUEUED = max(0, in_flight - pool_size) — tasks waiting for a worker
    """
    gs, ga, gq = _pool_gauges()
    if gs is None:
        return
    with _state_lock:
        alive = _executor is not None and not _fallback_mode
        size = POOL_SIZE if alive else 0
        inflight = _in_flight
    active = min(inflight, size) if size else 0
    queued = max(0, inflight - size) if size else 0
    try:
        gs.set(size)
        ga.set(active)
        gq.set(queued)
    except Exception:
        pass


# ═══════════════════════════════════════════════════════════════════
# Worker side (runs INSIDE pool processes — must be picklable/top-level)
# ═══════════════════════════════════════════════════════════════════

def _worker_init() -> None:
    """Pool worker initializer: import + warm the facade ONCE per process."""
    global _facade_in_worker
    from backend.solver_facade import get_facade
    _facade_in_worker = get_facade()
    # Force the lazy backend imports with one cheap warm solve
    try:
        _facade_in_worker.solve_step("percentage_of", {"percent": "10", "whole": "50"})
    except Exception:
        pass


_facade_in_worker = None


def _worker_solve(step_type_id: str, inputs: dict, subject: str, class_level: str) -> dict:
    """Pool worker: solve one step, return the contract as a plain dict."""
    result = _facade_in_worker.solve_step(
        step_type_id, inputs, subject=subject, class_level=class_level
    )
    return result.model_dump()


# ═══════════════════════════════════════════════════════════════════
# Parent side — pool lifecycle
# ═══════════════════════════════════════════════════════════════════

def _get_executor() -> Optional[ProcessPoolExecutor]:
    """Get or lazily create the pool. None in fallback mode."""
    global _executor, _fallback_mode, _pool_restarts
    with _state_lock:
        if _fallback_mode:
            return None
        if _executor is None:
            try:
                _executor = ProcessPoolExecutor(
                    max_workers=POOL_SIZE,
                    initializer=_worker_init,
                    max_tasks_per_child=MAX_TASKS_PER_CHILD,
                )
            except Exception:
                _pool_restarts += 1
                if _pool_restarts >= POOL_RESTART_LIMIT:
                    _fallback_mode = True
                _emit_pool_metrics()
                return None
        _emit_pool_metrics()
        return _executor


def _kill_pool() -> None:
    """Shutdown and recreate eligibility. Called on hang threshold."""
    global _executor, _pool_restarts, _fallback_mode, _in_flight
    with _state_lock:
        if _executor is not None:
            try:
                _executor.shutdown(wait=False, cancel_futures=True)
            except Exception:
                pass
            _executor = None
        _in_flight = 0  # cancelled futures no longer in flight
        _pool_restarts += 1
        if _pool_restarts >= POOL_RESTART_LIMIT:
            _fallback_mode = True
    _emit_pool_metrics()


def _timeout_result(step_type_id: str, timed_out: bool) -> SolutionResult:
    return SolutionResult(
        success=False,
        problem_type_id=step_type_id,
        error="solve timed out in process pool" if timed_out else "process pool unavailable",
        error_code="POOL_TIMEOUT" if timed_out else "POOL_BROKEN",
        solver_tier=SolverTier.DETERMINISTIC,
    )


# ═══════════════════════════════════════════════════════════════════
# Adaptive routing — measured, not guessed
# ═══════════════════════════════════════════════════════════════════
# MEASURED FINDING: the process pool is SLOWER than in-thread for light
# solves (IPC/pickling overhead beats compute under ~300ms). It only
# wins when individual solves are HEAVY (multi-second SymPy work).
#
# So we route by measured cost per step type:
#   - Rolling EMA of solve time per step_type_id
#   - EMA > HEAVY_THRESHOLD_MS → route that type to the pool
#   - Otherwise → in-thread (FastAPI's plain-def thread pool already
#     isolates the event loop, and light solves parallelize fine there)
#
# First solve of any type runs in-thread and gets timed; heavy types
# graduate to the pool automatically. No guessing, no config.

HEAVY_THRESHOLD_MS = 400.0
_ema_alpha = 0.3
_step_ema_ms: dict[str, float] = {}
_routing_counts = {"in_thread": 0, "pool": 0}


def _record_time(step_type_id: str, elapsed_ms: float) -> None:
    with _state_lock:
        prev = _step_ema_ms.get(step_type_id)
        if prev is None:
            _step_ema_ms[step_type_id] = elapsed_ms
        else:
            _step_ema_ms[step_type_id] = prev * (1 - _ema_alpha) + elapsed_ms * _ema_alpha


def _is_heavy(step_type_id: str) -> bool:
    with _state_lock:
        return _step_ema_ms.get(step_type_id, 0.0) > HEAVY_THRESHOLD_MS


# ═══════════════════════════════════════════════════════════════════
# Public API
# ═══════════════════════════════════════════════════════════════════

def _solve_in_thread(step_type_id: str, inputs: dict,
                     subject: str, class_level: str) -> SolutionResult:
    from backend.solver_facade import get_facade
    return get_facade().solve_step(
        step_type_id, inputs, subject=subject, class_level=class_level
    )


def pool_solve_step(step_type_id: str, inputs: dict,
                    subject: str = "", class_level: str = "") -> SolutionResult:
    """Solve one step via the process pool. Never raises.

    Direct pool access — used when the caller KNOWS the solve is heavy.
    Most callers should use adaptive_solve_step() instead.
    """
    global _consecutive_timeouts, _in_flight

    executor = _get_executor()
    if executor is None:
        return _solve_in_thread(step_type_id, inputs, subject, class_level)

    with _state_lock:
        _in_flight += 1
    _emit_pool_metrics()

    future: Future = executor.submit(
        _worker_solve, step_type_id, inputs, subject, class_level
    )
    try:
        as_dict = future.result(timeout=SOLVE_TIMEOUT_S)
        with _state_lock:
            _consecutive_timeouts = 0
            _in_flight = max(0, _in_flight - 1)
        _emit_pool_metrics()
        return SolutionResult(**as_dict)
    except TimeoutError:
        future.cancel()
        with _state_lock:
            _consecutive_timeouts += 1
            _in_flight = max(0, _in_flight - 1)
            should_kill = _consecutive_timeouts >= HANG_THRESHOLD
        _emit_pool_metrics()
        if should_kill:
            _kill_pool()
            with _state_lock:
                _consecutive_timeouts = 0
        return _timeout_result(step_type_id, timed_out=True)
    except BrokenProcessPool:
        with _state_lock:
            _in_flight = max(0, _in_flight - 1)
        _kill_pool()
        return pool_solve_step(step_type_id, inputs, subject, class_level)
    except Exception:
        with _state_lock:
            _in_flight = max(0, _in_flight - 1)
        _emit_pool_metrics()
        return _solve_in_thread(step_type_id, inputs, subject, class_level)


def adaptive_solve_step(step_type_id: str, inputs: dict,
                        subject: str = "", class_level: str = "") -> SolutionResult:
    """Solve one step with MEASURED routing. Never raises. THE entry point.

    Light solves (EMA < 400ms) → in-thread (no IPC overhead).
    Heavy solves (EMA > 400ms) → process pool (N-core parallelism).

    This replaces direct facade calls in solution_cache's miss path.
    """
    t0 = time.time()

    if _is_heavy(step_type_id) and not _fallback_mode:
        with _state_lock:
            _routing_counts["pool"] += 1
        result = pool_solve_step(step_type_id, inputs, subject, class_level)
    else:
        with _state_lock:
            _routing_counts["in_thread"] += 1
        result = _solve_in_thread(step_type_id, inputs, subject, class_level)

    elapsed_ms = (time.time() - t0) * 1000
    _record_time(step_type_id, elapsed_ms)
    return result


def pool_status() -> dict:
    """Pool health for /v2/health and the SOP."""
    with _state_lock:
        heavy_types = sorted(
            [k for k, v in _step_ema_ms.items() if v > HEAVY_THRESHOLD_MS]
        )
        status = {
            "mode": "fallback(in-thread)" if _fallback_mode else "adaptive",
            "workers": POOL_SIZE if (_executor is not None and not _fallback_mode) else 0,
            "pool_alive": _executor is not None and not _fallback_mode,
            "restarts": _pool_restarts,
            "consecutive_timeouts": _consecutive_timeouts,
            "in_flight": _in_flight,
            "solve_timeout_s": SOLVE_TIMEOUT_S,
            "heavy_threshold_ms": HEAVY_THRESHOLD_MS,
            "heavy_step_types": heavy_types[:20],
            "routing": dict(_routing_counts),
            "tracked_step_types": len(_step_ema_ms),
        }
    # Refresh Prometheus gauges on every health check.
    _emit_pool_metrics()
    return status


def warm_pool() -> dict:
    """Pre-create + warm all workers (call at startup, optional).

    Each worker's initializer imports and warms the facade. Without this,
    the first pool-routed solve pays the import cost.
    """
    t0 = time.time()
    executor = _get_executor()
    if executor is None:
        return {"warmed": False, "reason": "fallback mode", "elapsed_ms": 0}
    futures = [
        executor.submit(_worker_solve, "percentage_of",
                        {"percent": "10", "whole": "50"}, "", "")
        for _ in range(POOL_SIZE)
    ]
    done = 0
    for f in futures:
        try:
            f.result(timeout=60)
            done += 1
        except Exception:
            pass
    return {"warmed": done, "workers": POOL_SIZE,
            "elapsed_ms": int((time.time() - t0) * 1000)}


if __name__ == "__main__":
    print(pool_status())
    print(warm_pool())
    r = adaptive_solve_step("differentiate_at_point",
                            {"expression": "x*sin(x)", "var": "x", "point": "1"})
    print("solve:", r.success, r.final_answer, "| verified:", r.verified)
    print(pool_status())
