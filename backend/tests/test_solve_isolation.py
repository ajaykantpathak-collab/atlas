"""Tests for the solve-wedge isolation boundary (2026-09-30 incident).

The incident: /api/practice/deterministic/solve called the answer pipeline
INLINE on the event loop; a cold lane (MiniLM/spacy/graph lazy loads,
unbounded CAS) wedged the whole worker for ~47 minutes.

Contract under test (backend/services/solve_isolation.py):
  1. a deliberately slow solver returns within its budget with an HONEST
     guided payload — no answer, method content, budget flag set;
  2. a concurrent request does NOT queue behind the slow solve;
  3. the event loop stays responsive (heartbeat keeps ticking) while a
     solve runs through the real endpoint coroutine;
  4. the in-flight compute finishes in the background and its result is
     cached — the retry is served instantly;
  5. the solve runs on the dedicated pool thread, never the loop thread.
"""

from __future__ import annotations

import asyncio
import threading
import time

import pytest

from backend.services import solve_isolation as iso

# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #


def _unique_text(tag: str) -> str:
    return f"A cold lane isolation probe {tag} {time.monotonic_ns()}"


def _loop_thread_id() -> int:
    return threading.get_ident()


def _drain_in_flight(timeout_s: float = 15.0) -> None:
    """Wait for background solves from earlier tests to finish.

    Tests 1/2 deliberately leave 5s solves running on the pool (they
    assert `_in_flight >= 1`).  Without a drain, the next test's 1s
    solve queues behind them and the outcome flips (VERIFIED vs
    GUIDED_PRACTICE) depending on file order — these tests must assert
    ISOLATION, not scheduler luck (WS-D 2026-10-10).
    """
    import time as _t

    deadline = _t.monotonic() + timeout_s
    while iso._in_flight > 0 and _t.monotonic() < deadline:
        _t.sleep(0.05)


import contextlib


@contextlib.contextmanager
def _patch_answer(lane):
    """Patch the pipeline answer for ONE test, everywhere it is read.

    ``solver_gateway`` resolves ``answer`` lazily and CACHES the function
    object in its module globals — a later ``ap.answer = ...`` patch is
    invisible to callers importing through the gateway, so a lane patched
    by an earlier test kept serving ('42' leaking into the thread test —
    the WS-D 2026-10-10 order-dependence).  Patch both surfaces and
    restore both.
    """
    import backend.its.solver.answer_pipeline as ap
    import backend.services.solver_gateway as gw

    orig_ap = getattr(ap, "answer", None)
    orig_gw = gw.__dict__.get("answer")
    ap.answer = lane
    gw.answer = lane
    try:
        yield
    finally:
        ap.answer = orig_ap
        if orig_gw is None:
            gw.__dict__.pop("answer", None)
        else:
            gw.answer = orig_gw


# --------------------------------------------------------------------------- #
# 1. Budget: a deliberately slow solver returns within budget, honestly
# --------------------------------------------------------------------------- #


def test_slow_solver_returns_within_budget_with_honest_response():
    """Solve budget 0.2s vs a 5s solver: the endpoint-side wait must end
    at ~budget with an honest guided response, not hang for 5s."""
    started = time.perf_counter()

    async def scenario():
        def slow_solve(text):
            time.sleep(5.0)
            return {"tier": "VERIFIED", "answer": "never"}

        return await iso.run_async(iso.cache_key("t", _unique_text("budget")),
                                   slow_solve, "q", budget_s=0.2)

    outcome = asyncio.run(scenario())
    elapsed = time.perf_counter() - started

    assert outcome.timed_out is True
    assert outcome.result is None
    assert outcome.saturated is False
    # honest budget: returned near the 0.2s budget, NOT after the 5s solve
    assert elapsed < 2.0, f"budget not enforced: {elapsed:.2f}s"
    # the background compute must still be running (not cancelled)
    assert iso._in_flight >= 1


def test_slow_solver_honest_payload_has_no_answer_and_method_steps():
    """The budget response shape: GUIDED_PRACTICE, answer withheld,
    method content present — the shape both solve endpoints return."""
    from backend.api import verified_practice as vp
    import backend.its.solver.answer_pipeline as ap

    def slow_cold_lane(text, *a, **k):
        time.sleep(5.0)
        return ap.PipelineResult(
            label="VERIFIED", answer="42", numeric=42.0, steps=[],
            audit=ap.AuditTrail(lane="A"))

    with _patch_answer(slow_cold_lane):
        async def scenario():
            return await vp.solve_deterministic(
                vp.SolveTextRequest(text=_unique_text("payload")))

        with pytest.MonkeyPatch.context() as mp:
            mp.setenv("SOLVE_BUDGET_S", "0.2")
            payload = asyncio.run(scenario())

    assert payload["tier"] == "GUIDED_PRACTICE"
    assert payload["solved"] is False
    assert payload["answer"] is None          # honest: no final answer
    assert payload["numeric"] is None
    assert payload["budget_exceeded"] is True
    assert payload["steps"]                    # method content shipped
    assert all(isinstance(s, str) and s for s in payload["steps"])
    # the honest budget refusal (2026-10 wording: answer withheld, moved
    # to background practice — 'budget' was removed from the sentence)
    assert "withheld" in payload["refusal_reason"]
    assert "background practice" in payload["refusal_reason"]


# --------------------------------------------------------------------------- #
# 1b. Wave 9.8 L3: the 6s soft budget hands back the best-available
# Contract A payload (upgrading) while the real solve lands in cache
# --------------------------------------------------------------------------- #


def test_soft_budget_returns_upgrading_then_cached_result():
    """A slow answer() past SOLVE_SOFT_BUDGET_S -> immediate soft payload
    (tier GUIDED_PRACTICE, upgrading:true, Contract A fields); the
    background compute finishes into the cache so the retry is instant
    and carries the real result."""
    import backend.its.solver.answer_pipeline as ap

    def slow_cold_lane(text, *a, **k):
        time.sleep(1.2)
        return ap.PipelineResult(
            label="VERIFIED", answer="42", numeric=42.0, steps=[],
            audit=ap.AuditTrail(lane="A"))

    text = _unique_text("softbudget")

    async def first():
        from backend.api import verified_practice as vp
        return await vp.solve_deterministic(
            vp.SolveTextRequest(text=text))

    async def second():
        from backend.api import verified_practice as vp
        return await vp.solve_deterministic(
            vp.SolveTextRequest(text=text))

    _drain_in_flight()
    with _patch_answer(slow_cold_lane):
        with pytest.MonkeyPatch.context() as mp:
            mp.setenv("SOLVE_SOFT_BUDGET_S", "0.5")
            mp.setenv("SOLVE_BUDGET_S", "60")
            # prod serving mode: the soft payload's model_problem must
            # never reach an LLM
            mp.setenv("SOLVER_LLM_MODE", "off")
            mp.setenv("SOLVER_OFFLINE", "1")
            t0 = time.monotonic()
            payload = asyncio.run(first())
            waited = time.monotonic() - t0
        assert waited < 6.5
        assert payload["tier"] == "GUIDED_PRACTICE"
        assert payload["upgrading"] is True
        assert payload["verified"] is False
        assert payload["answer"] is None
        assert payload["answer_tier"] in (
            "bank_similar", "method_only", "guided")
        # the background solve keeps going and banks the real result
        _drain_in_flight()
        payload2 = asyncio.run(second())
        assert payload2["cached"] is True
        assert payload2["tier"] == "VERIFIED"
        assert payload2["answer"] == "42"


# --------------------------------------------------------------------------- #
# 2. Concurrency: a fast request must not queue behind a slow solve
# --------------------------------------------------------------------------- #


def test_concurrent_request_does_not_queue_behind_slow_solver():
    """One worker chews a 1.5s solve; a second, different request must
    complete in well under that on another pool worker."""

    async def scenario():
        def slow_solve(text):
            time.sleep(1.5)
            return "slow-done"

        def fast_solve(text):
            return "fast-done"

        slow = asyncio.create_task(iso.run_async(
            iso.cache_key("t", _unique_text("slow")), slow_solve, "q",
            budget_s=10.0))
        await asyncio.sleep(0.05)   # let the slow solve claim a worker
        t0 = time.perf_counter()
        fast = await iso.run_async(
            iso.cache_key("t", _unique_text("fast")), fast_solve, "q",
            budget_s=10.0)
        fast_elapsed = time.perf_counter() - t0
        slow_out = await slow
        return fast, fast_elapsed, slow_out

    fast, fast_elapsed, slow_out = asyncio.run(scenario())
    assert fast.result == "fast-done"
    assert fast.timed_out is False
    # the fast solve was NOT queued behind the 1.5s solve
    assert fast_elapsed < 1.0, f"queued behind slow solve: {fast_elapsed:.2f}s"
    assert slow_out.timed_out is False          # slow solve finished too


# --------------------------------------------------------------------------- #
# 3. The loop stays responsive through the real endpoint coroutine
# --------------------------------------------------------------------------- #


def test_event_loop_stays_responsive_during_endpoint_solve():
    """Wedge regression: pre-fix, an inline call froze the loop (heartbeat
    gap == solve duration). Post-fix the heartbeat keeps ticking."""

    async def scenario():
        from backend.api import verified_practice as vp
        import backend.its.solver.answer_pipeline as ap

        def slow_cold_lane(text, *a, **k):
            time.sleep(1.0)
            return ap.PipelineResult(
                label="GUIDED_PRACTICE", answer=None, numeric=None,
                steps=["method"],
                audit=ap.AuditTrail(lane="A"))

        gaps: list[float] = []
        loop = asyncio.get_running_loop()
        last = loop.time()

        async def heartbeat():
            nonlocal last
            while True:
                await asyncio.sleep(0.02)
                now = loop.time()
                gaps.append(now - last)
                last = now

        hb = asyncio.create_task(heartbeat())
        await asyncio.sleep(0.05)   # baseline before the solve, as in the repro
        try:
            with _patch_answer(slow_cold_lane):
                payload = await vp.solve_deterministic(
                    vp.SolveTextRequest(text=_unique_text("heartbeat")))
        finally:
            hb.cancel()
            try:
                await hb
            except asyncio.CancelledError:
                pass
        return payload, gaps

    # deterministic outcome: pin the budget (1s solve > 0.2s budget) and
    # drain background solves left by earlier tests so this one does not
    # queue behind them (order-independence, WS-D 2026-10-10).
    _drain_in_flight()
    with pytest.MonkeyPatch.context() as mp:
        mp.setenv("SOLVE_BUDGET_S", "0.2")
        payload, gaps = asyncio.run(scenario())
    max_gap_ms = max(gaps) * 1000 if gaps else 0.0
    assert payload["tier"] == "GUIDED_PRACTICE"   # 1s solve > 0.2s budget
    # pre-fix this gap EQUALS the solve duration (the wedge); healthy < 500ms
    assert max_gap_ms < 500, f"event loop wedged: max heartbeat gap {max_gap_ms:.0f}ms"


def test_endpoint_solve_runs_off_the_loop_thread_on_dedicated_pool():
    """The solve must execute on a dedicated solve-isolation worker, never
    on the event-loop thread."""

    async def scenario():
        from backend.api import verified_practice as vp
        import backend.its.solver.answer_pipeline as ap

        seen = {}

        def recording_lane(text, *a, **k):
            seen["thread"] = threading.get_ident()
            seen["name"] = threading.current_thread().name
            return ap.PipelineResult(
                label="VERIFIED", answer="7", numeric=7.0, steps=[],
                audit=ap.AuditTrail(lane="A"))

        with _patch_answer(recording_lane):
            payload = await vp.solve_deterministic(
                vp.SolveTextRequest(text=_unique_text("thread")))
        return payload, seen

    # order-independence: drain background solves left by earlier tests
    # and pin a generous budget so the recording lane completes VERIFIED
    # (WS-D 2026-10-10).
    _drain_in_flight()
    with pytest.MonkeyPatch.context() as mp:
        mp.setenv("SOLVE_BUDGET_S", "60")
        payload, seen = asyncio.run(scenario())
    loop_tid = _loop_thread_id()
    assert payload["tier"] == "VERIFIED"          # normal path intact
    assert payload["answer"] == "7"
    assert seen["thread"] != loop_tid
    assert seen["name"].startswith("solve-isolation")


# --------------------------------------------------------------------------- #
# 4. Background completion is cached; retry is served instantly
# --------------------------------------------------------------------------- #


def test_background_result_is_cached_and_retry_served_instantly():
    """Timeout at 0.2s with a 0.6s solver: after the background compute
    lands, the same question is served from cache with the real result."""

    async def scenario():
        def slow_solve(text):
            time.sleep(0.6)
            return {"tier": "VERIFIED", "answer": " eventual"}

        key = iso.cache_key("t", _unique_text("cache"))
        first = await iso.run_async(key, slow_solve, "q", budget_s=0.2)
        assert first.timed_out is True
        await asyncio.sleep(0.8)    # background compute finishes + caches
        t0 = time.perf_counter()
        second = await iso.run_async(key, slow_solve, "q", budget_s=5.0)
        retry_ms = (time.perf_counter() - t0) * 1000
        return first, second, retry_ms

    first, second, retry_ms = asyncio.run(scenario())
    assert second.timed_out is False
    assert second.cached is True
    assert second.result == {"tier": "VERIFIED", "answer": " eventual"}
    assert retry_ms < 200, f"cache retry took {retry_ms:.0f}ms"


def test_v3_deterministic_sync_boundary_times_out_and_caches():
    """The /v3/deterministic boundary (run_sync): budget enforced on the
    calling thread, background completion cached, retry served."""

    def slow_solve(question, **kw):
        time.sleep(0.6)
        return {"status": "verified", "answer": "sync-eventual"}

    key = iso.cache_key("t", _unique_text("sync"))
    started = time.perf_counter()
    first = iso.run_sync(key, slow_solve, "q", budget_s=0.2)
    wait_s = time.perf_counter() - started
    assert first.timed_out is True
    assert wait_s < 2.0

    time.sleep(0.8)
    second = iso.run_sync(key, slow_solve, "q", budget_s=5.0)
    assert second.cached is True
    assert second.result["answer"] == "sync-eventual"


def test_v3_endpoint_budget_payload_shape():
    """The /v3/deterministic endpoint returns the deterministic-service
    guided shape on budget expiry: no answer, honest reason, method."""

    from backend.routers import solver as solver_router

    def slow_service(question, **kw):
        time.sleep(5.0)
        return {"status": "verified", "answer": "never"}

    original = solver_router  # keep flake happy (no module-level patch below)

    import backend.its.solver.deterministic_service as dservice
    original_fn = dservice.solve_deterministically
    dservice.solve_deterministically = slow_service
    try:
        with pytest.MonkeyPatch.context() as mp:
            mp.setenv("SOLVE_BUDGET_S", "0.2")
            payload = solver_router.deterministic_solve(
                solver_router.DeterministicSolveRequest(
                    question=_unique_text("v3"), subject="maths"))
    finally:
        dservice.solve_deterministically = original_fn
    assert original is not None

    assert payload["status"] == "guided_practice"
    assert payload["answer"] is None
    assert payload["budget_exceeded"] is True
    assert payload["verification"]["verified"] is False
    assert payload["verification"]["label"] == "SOLVE_BUDGET_EXCEEDED"
    assert payload["steps"]


# --------------------------------------------------------------------------- #
# 5. Saturation degrades honestly instead of queueing unboundedly
# --------------------------------------------------------------------------- #


def test_pool_saturation_returns_honest_busy_outcome():
    async def scenario():
        blocker = threading.Event()

        def wait_for_event(text):
            blocker.wait(timeout=5.0)
            return "done"

        first = asyncio.create_task(iso.run_async(
            iso.cache_key("t", _unique_text("sat1")), wait_for_event, "q",
            budget_s=10.0))
        await asyncio.sleep(0.05)   # first solve now occupies the pool
        with pytest.MonkeyPatch.context() as mp:
            mp.setenv("SOLVE_MAX_QUEUE", "1")
            second = await iso.run_async(
                iso.cache_key("t", _unique_text("sat2")),
                lambda t: "never", "q", budget_s=10.0)
        blocker.set()
        out1 = await first
        return out1, second

    out1, second = asyncio.run(scenario())
    assert out1.timed_out is False
    assert second.saturated is True
    assert second.result is None
