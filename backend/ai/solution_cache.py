"""Solution cache — stores DeepSeek solutions keyed by pattern + values.

When DeepSeek generates a solution for a question SymPy can't handle:
1. Normalize the question → pattern
2. Hash the student's values
3. Key = pattern + values_hash
4. Store the solution

Next time same pattern + same values → instant, no DeepSeek.
Same pattern + different values → DeepSeek called once, then stored.

This means: a specific ODE with specific coefficients is only solved once.
"""
from __future__ import annotations

import hashlib
import json
import logging
from pathlib import Path
from typing import Optional

from backend.ai.pattern_store import normalize_question

logger = logging.getLogger(__name__)

CACHE_FILE = Path(__file__).parent / "_solution_cache.json"


def _values_hash(values: dict) -> str:
    """Create a short hash from the student's values."""
    # Sort keys for consistency, ignore None/empty
    clean = {k: str(v) for k, v in sorted(values.items()) if v is not None and v != ""}
    raw = json.dumps(clean, sort_keys=True)
    return hashlib.md5(raw.encode()).hexdigest()[:12]


def _cache_key(question: str, values: dict) -> str:
    """Create a cache key from normalized pattern + values hash."""
    pattern = normalize_question(question)
    vhash = _values_hash(values)
    return f"{pattern}||{vhash}"


class SolutionCache:
    """Caches DeepSeek solutions by pattern + values."""

    def __init__(self):
        self._cache: dict[str, dict] = {}

    def load(self) -> None:
        if self._cache:
            return
        if CACHE_FILE.exists():
            try:
                self._cache = json.loads(CACHE_FILE.read_text(encoding="utf-8"))
                logger.info(f"Loaded {len(self._cache)} cached solutions")
            except Exception as e:
                logger.warning(f"Failed to load cache: {e}")
                self._cache = {}

    def save(self) -> None:
        CACHE_FILE.write_text(
            json.dumps(self._cache, indent=2, ensure_ascii=False),
            encoding="utf-8"
        )

    def get(self, question: str, values: dict) -> Optional[dict]:
        """Check if we have a cached solution for this pattern + values."""
        self.load()
        key = _cache_key(question, values)
        return self._cache.get(key)

    def put(self, question: str, values: dict, solution: str, category: str) -> None:
        """Cache a DeepSeek solution."""
        self.load()
        key = _cache_key(question, values)
        self._cache[key] = {
            "solution": solution,
            "category": category,
            "pattern": normalize_question(question),
        }
        self.save()
        logger.info(f"Cached solution for pattern+values (total: {len(self._cache)})")

    def count(self) -> int:
        self.load()
        return len(self._cache)


# Singleton
_cache: Optional[SolutionCache] = None


def get_cache() -> SolutionCache:
    global _cache
    if _cache is None:
        _cache = SolutionCache()
        _cache.load()
    return _cache
