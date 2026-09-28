"""Shared Redis-backed session store for assessment flows (chapter tests,
pre-board papers).  Sessions must survive nginx round-robin between
backend-1/backend-2, so every mutation persists to Redis; the local dict
is only a hot cache.  Mirrors the exam-sim session pattern in
services/exam_service.py."""

from __future__ import annotations

import asyncio
import json
import logging
import time
from typing import Any, Dict, Optional

from backend.api.practice import (
    _check_answer,
    _fold_numeric_with_unit,
    _is_numeric,
)

logger = logging.getLogger(__name__)

_TTL = 6 * 3600

# Interpreter-loop budget for multi-question grading.  A symbolic verify
# costs ~5s (measured in-container); a 49-question paper with garbage
# answers must never pay that per pair.  Constants live with the rolling
# window state at the bottom of this module.


def grade_answer(student_answer: str, correct_answer: Any) -> bool:
    """Honest grading for tests/papers, bounded in time.

    Fast paths (exact, numeric-tolerance, unit-fold) run for every pair.
    The expensive interpreter loop runs only when the two answers are of
    comparable size (symbolic equivalence like "x=2" vs "2" is plausible;
    a 1-char guess against a 40-char model answer is not) AND within a
    per-process budget; past the budget the comparison is strict.
    """
    sa = str(student_answer or "").strip()
    ca = str(correct_answer or "").strip()
    if not sa:
        return False
    if _is_numeric(sa) and _is_numeric(ca):
        try:
            return abs(float(sa) - float(ca)) <= 0.001
        except (ValueError, TypeError):
            pass
    fold = _fold_numeric_with_unit(sa, ca, 0.001)
    if fold is not None:
        return fold
    if sa.lower() == ca.lower():
        return True
    # Expensive interpreter, hard-bounded: max _INTERPRETER_MAX_CALLS
    # symbolic verifies per rolling _INTERPRETER_WINDOW_SECONDS per
    # worker.  Everything past the budget grades strict.
    global _interp_calls_used, _interp_window_start
    now = time.monotonic()
    if _interp_window_start is None or now - _interp_window_start > _INTERPRETER_WINDOW_SECONDS:
        _interp_window_start = now
        _interp_calls_used = 0
    if (len(sa) * 2 >= len(ca) and len(ca) <= 200
            and _interp_calls_used < _INTERPRETER_MAX_CALLS):
        _interp_calls_used += 1
        return bool(_check_answer(sa, ca))
    return sa.lower() == ca.lower()


# per-worker rolling budget for the interpreter loop
_INTERPRETER_MAX_CALLS = 4
_INTERPRETER_WINDOW_SECONDS = 60.0
_interp_calls_used = 0
_interp_window_start: Optional[float] = None


class TestSessionStore:
    def __init__(self, prefix: str) -> None:
        self.prefix = prefix
        self._local: Dict[str, Dict[str, Any]] = {}
        self._redis = None
        self._lock = asyncio.Lock()

    async def _client(self):
        if self._redis is not None:
            return self._redis
        async with self._lock:
            if self._redis is not None:
                return self._redis
            try:
                import redis.asyncio as aioredis
                from backend.config import settings
                self._redis = aioredis.from_url(
                    settings.redis_url, decode_responses=True)
            except Exception:
                self._redis = None
        return self._redis

    async def save(self, session: Dict[str, Any]) -> None:
        self._local[session["session_id"]] = session
        try:
            r = await self._client()
            if r is not None:
                await r.set(f"{self.prefix}:{session['session_id']}",
                            json.dumps(session), ex=_TTL)
        except Exception:
            pass  # local cache still holds it

    async def load(self, session_id: str) -> Optional[Dict[str, Any]]:
        # Redis-first: a request may land on either backend (nginx
        # round-robin), so a backend-local copy can be stale the moment
        # the other backend saves.  Redis is the source of truth; the
        # local dict is only a fallback for when Redis is unreachable.
        try:
            r = await self._client()
            if r is not None:
                raw = await r.get(f"{self.prefix}:{session_id}")
                if raw:
                    sess = json.loads(raw)
                    self._local[session_id] = sess
                    return sess
        except Exception:
            pass
        return self._local.get(session_id)
