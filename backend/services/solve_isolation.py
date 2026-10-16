"""solve_isolation.py — keep solver compute OFF the event loop and bounded.

ROOT CAUSE (2026-09-30 wedge incident, ~47 min per occurrence):
``/api/practice/deterministic/solve`` was an ``async def`` handler calling
``answer_pipeline.answer()`` INLINE on the event-loop thread. A cold lane
lazily builds one-time singletons (MiniLM load ~10-19 s, spacy
``en_core_web_sm``, the canonical formula graph with round-trip scipy
validation, batched-embed init ~30-40 s) and the CAS cascade has no
internal deadline — a pathological expression can spin sympy for tens of
minutes. All of that ran ON the loop, so one cold solve froze the entire
worker: /api/health stalled, nginx 504'd every route, gunicorn's arbiter
killed the worker mid-request (the competency /ask endpoint already had
this exact fix — see competency_tutor._ask_sync).

ISOLATION CONTRACT (this module is the single boundary):
  1. OFF-LOOP   — solve compute runs on a DEDICATED bounded thread pool
                  (SOLVE_POOL_WORKERS, default 4), never on the event loop
                  and never on the shared default executor.
  2. BUDGET     — every awaited solve has a hard budget
                  (SOLVE_BUDGET_S, default 60). Past the budget the caller
                  gets an honest GUIDED_PRACTICE payload (method content,
                  answer withheld) — never a hang, never a partial answer.
  3. BACKGROUND — the in-flight compute is NOT cancelled at the deadline:
                  it finishes in the background worker and the result is
                  cached (SOLVE_RESULT_TTL_S, default 600). A retry of the
                  same question is served from cache instantly.
  4. BOUNDED    — the pool queue is capped (SOLVE_MAX_QUEUE, default 32).
                  Beyond the cap the caller gets an honest "solver busy"
                  guided response instead of silently piling up threads.

Only successful results are cached; failures re-run on retry (cold-load
failures are cheap; a poisoned input is the pipeline's own refusal path).
"""

from __future__ import annotations

import asyncio
import contextvars
import hashlib
import logging
import os
import threading
import time
from collections import OrderedDict
from concurrent.futures import Future, ThreadPoolExecutor
from concurrent.futures import TimeoutError as FuturesTimeoutError
from dataclasses import dataclass
from typing import Any, Callable, Optional

logger = logging.getLogger(__name__)


def default_budget() -> float:
    """Per-solve budget in seconds (SOLVE_BUDGET_S, default 60)."""
    try:
        return max(1.0, float(os.environ.get("SOLVE_BUDGET_S", "60")))
    except (TypeError, ValueError):
        return 60.0


def _pool_workers() -> int:
    try:
        return max(1, int(os.environ.get("SOLVE_POOL_WORKERS", "4")))
    except (TypeError, ValueError):
        return 4


def _max_queue() -> int:
    try:
        return max(1, int(os.environ.get("SOLVE_MAX_QUEUE", "32")))
    except (TypeError, ValueError):
        return 32


def _result_ttl() -> float:
    try:
        return max(1.0, float(os.environ.get("SOLVE_RESULT_TTL_S", "600")))
    except (TypeError, ValueError):
        return 600.0


class SolvePoolSaturated(Exception):
    """The dedicated solve pool is at its queue cap — degrade honestly."""


# --------------------------------------------------------------------------- #
# Honest guided content for budget/saturation responses
# --------------------------------------------------------------------------- #

#: Method content shipped instead of a final answer (GUIDED_PRACTICE):
#: generic, honest scaffolding — never a guessed result.
GUIDED_METHOD_STEPS = [
    "Identify exactly what is asked, and list every given value with its unit.",
    "Write the rule or formula that connects the given values to the "
    "asked quantity.",
    "Substitute the values step by step, keeping units in every line.",
    "Check the result against the question (order of magnitude, units, "
    "reality).",
]


def timeout_refusal_reason(budget_s: float) -> str:
    return (
        f"Our solver needed more than {budget_s:.0f}s on this question, "
        "so it has moved to background practice and the answer stays "
        "withheld — here is the method to start with instead")


def saturation_refusal_reason() -> str:
    return (
        "Our solver is busy right now — please try again in a moment. "
        "Here is the method to work through meanwhile")


# --------------------------------------------------------------------------- #
# Result cache — completed background results, served on retry
# --------------------------------------------------------------------------- #

_cache: "OrderedDict[str, tuple[float, Any]]" = OrderedDict()
_cache_lock = threading.Lock()


def cache_key(lane: str, text: str) -> str:
    """Stable per-lane key: same question + same lane -> same key."""
    digest = hashlib.sha256(f"{lane}\x00{text}".encode("utf-8", "replace"))
    return f"{lane}:{digest.hexdigest()[:32]}"


def get_cached(key: str) -> Optional[Any]:
    """Cached result for this key if fresh, else None (and evicted)."""
    now = time.monotonic()
    with _cache_lock:
        item = _cache.get(key)
        if item is None:
            return None
        stored_at, result = item
        if now - stored_at > _result_ttl():
            _cache.pop(key, None)
            return None
        _cache.move_to_end(key)
        return result


def _store_cached(key: str, result: Any) -> None:
    with _cache_lock:
        _cache[key] = (time.monotonic(), result)
        _cache.move_to_end(key)
        while len(_cache) > 256:
            _cache.popitem(last=False)


# --------------------------------------------------------------------------- #
# Dedicated bounded pool
# --------------------------------------------------------------------------- #

_POOL = ThreadPoolExecutor(max_workers=_pool_workers(),
                           thread_name_prefix="solve-isolation")
_state_lock = threading.Lock()
_in_flight = 0


def _run_and_cache(key: str, fn: Callable[..., Any],
                   args: tuple, kwargs: dict) -> Any:
    """Pool-side wrapper: run the solve, cache the success, keep the
    in-flight counter honest. Exceptions propagate to the caller's future
    (they are the pipeline's own refusal paths, not timeouts)."""
    global _in_flight
    try:
        result = fn(*args, **kwargs)
    finally:
        with _state_lock:
            _in_flight -= 1
    # Cache only successes — a retry after a failure should re-run.
    _store_cached(key, result)
    return result


def _submit(key: str, fn: Callable[..., Any],
            args: tuple, kwargs: dict) -> Future:
    global _in_flight
    with _state_lock:
        if _in_flight >= _max_queue():
            raise SolvePoolSaturated()
        _in_flight += 1
    # COLD-START brief §C: pool threads do not inherit contextvars, so the
    # request-scoped telemetry binding (student_hash / subject / class)
    # and per-request solver state were invisible to solves run here.
    # Carry a COPY of the caller's context into the pool thread.
    # NOTE: *a, **k — _run_and_cache unpacks (args, kwargs) into positional
    # parameters; a lambda declared as (a, k) bound k to args[1] and
    # `**k` raised "argument after ** must be a mapping" on every solve
    # (the certified LLM-free lane 500ing end-to-end, 2026-10-05).
    caller_ctx = contextvars.copy_context()
    return _POOL.submit(_run_and_cache, key,
                        lambda *a, **k: caller_ctx.run(fn, *a, **k),
                        args, kwargs)


@dataclass
class IsolationOutcome:
    """What an isolated solve returns to its endpoint."""

    result: Any = None
    timed_out: bool = False
    cached: bool = False
    elapsed_ms: float = 0.0
    saturated: bool = False


# --------------------------------------------------------------------------- #
# Async boundary — for `async def` endpoints
# --------------------------------------------------------------------------- #

async def run_async(key: str, fn: Callable[..., Any], /, *args,
                    budget_s: Optional[float] = None, **kwargs) -> IsolationOutcome:
    """Run a blocking solve off the event loop under a hard budget.

    The solve runs on the dedicated pool. Past `budget_s` the await gives
    up and ``timed_out=True`` is returned while the compute CONTINUES in
    the background; when it finishes its result is cached and the next
    request with the same key is served instantly (``cached=True``).

    NOTE on cancellation: ``wait_for`` cancels only the loop-side wrapper;
    the running thread is unaffected — exactly the "keep computing, cache
    it" behaviour this module exists to provide.
    """
    started = time.perf_counter()
    budget = default_budget() if budget_s is None else float(budget_s)

    cached = get_cached(key)
    if cached is not None:
        return IsolationOutcome(result=cached, cached=True,
                                elapsed_ms=(time.perf_counter() - started) * 1000)

    try:
        fut = _submit(key, fn, args, kwargs)
    except SolvePoolSaturated:
        return IsolationOutcome(saturated=True,
                                elapsed_ms=(time.perf_counter() - started) * 1000)

    try:
        result = await asyncio.wait_for(asyncio.wrap_future(fut),
                                        timeout=budget)
    except asyncio.TimeoutError:
        return IsolationOutcome(timed_out=True,
                                elapsed_ms=(time.perf_counter() - started) * 1000)
    return IsolationOutcome(result=result,
                            elapsed_ms=(time.perf_counter() - started) * 1000)


# --------------------------------------------------------------------------- #
# Sync boundary — for plain `def` endpoints (FastAPI threadpool)
# --------------------------------------------------------------------------- #

def run_sync(key: str, fn: Callable[..., Any], /, *args,
             budget_s: Optional[float] = None, **kwargs) -> IsolationOutcome:
    """Sync twin of :func:`run_async` for plain-`def` endpoints.

    The calling thread waits at most `budget_s`; the solve itself is NOT
    aborted at the deadline — it finishes on the dedicated pool and its
    result is cached for the retry. The caller's thread (FastAPI's shared
    threadpool) is therefore never held hostage by a pathological solve.
    """
    started = time.perf_counter()
    budget = default_budget() if budget_s is None else float(budget_s)

    cached = get_cached(key)
    if cached is not None:
        return IsolationOutcome(result=cached, cached=True,
                                elapsed_ms=(time.perf_counter() - started) * 1000)

    try:
        fut = _submit(key, fn, args, kwargs)
    except SolvePoolSaturated:
        return IsolationOutcome(saturated=True,
                                elapsed_ms=(time.perf_counter() - started) * 1000)

    try:
        result = fut.result(timeout=budget)
    except FuturesTimeoutError:
        return IsolationOutcome(timed_out=True,
                                elapsed_ms=(time.perf_counter() - started) * 1000)
    return IsolationOutcome(result=result,
                            elapsed_ms=(time.perf_counter() - started) * 1000)
