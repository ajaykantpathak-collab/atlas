"""End-to-end deterministic solver service.

This is the public subject-agnostic entry point for the truth core. It uses
the existing deterministic lane registry and answer pipeline; it never calls
the legacy LLM fallback. Unsupported or ambiguous questions are returned as
structured refusals instead of being guessed.

SOLVER CONTRACT: every exit path publishes through
``backend.its.solver.contract`` — the PipelineResult is adapted with
``outcome_from_pipeline`` (labels VERIFIED/VERIFIED_WITH_ASSUMPTIONS/
VERIFIED_OFFICIAL -> VERIFIED; AMBIGUOUS -> AMBIGUOUS; else GUIDED_PRACTICE),
the API answer is ``released_answer()`` (VERIFIED-only by construction), and
each solve emits exactly one structured ``solver_metrics`` JSON line
(logger "solver.metrics") carrying route / solver_version / status /
llm_used / latency_ms / refusal_reason.

CHOKE POINT (WSA-P1, 2026-10-10): every return of
``solve_deterministically`` — fast lanes, exact kernel, refusals and the
answer() fallback alike — routes through the module-private ``_serve()``
exit which (a) slop-gate scrubs the student-facing strings (same
``gate_result`` semantics as ``answer()``; fail-open by law), (b) emits the
solver_metrics line with lane="v3" and a route stamp, and (c) enforces the
strict contract: a non-VERIFIED wire status never carries an answer.
"""

from __future__ import annotations

import concurrent.futures
import os
import threading
import time
from types import SimpleNamespace
from typing import Any, Optional

from backend.its.solver.answer_pipeline import (
    AMBIGUOUS,
    GUIDED,
    VERIFIED,
    VERIFIED_ASSUMED,
    VERIFIED_OFFICIAL,
    AuditTrail,
    PipelineResult,
    answer,
)
from backend.its.solver.contract import (
    SOLVER_VERSION,
    SolverOutcome,
    SolverStatus,
    emit_solver_metrics,
    log_lane_exception,
    outcome_from_pipeline,
)
from backend.its.solver.exact_kernels import compute_exact
from backend.its.solver.neurolink import (
    NeuroLinkEngine,
    is_pure_concept_query,
    is_calculus_query,
    is_physics_constraint_query,
    is_dimensional_guardrail_query,
    is_circuit_or_optics_query,
    is_asymptotic_query,
    is_inverted_question_query,
    is_chemistry_mechanism_query,
    is_biology_cognitive_query,
    is_accounting_commerce_query,
    is_humanities_query,
    is_graph_calculus_query,
)
from backend.its.solver.slop_gate import gate_result
from backend.services import solve_isolation


VERIFIED_LABELS = {VERIFIED, VERIFIED_ASSUMED, VERIFIED_OFFICIAL}

# SolverStatus -> the endpoint's lowercase wire status (response shape is
# stable for existing clients; the contract enum is the source of truth).
_API_STATUS = {
    SolverStatus.VERIFIED: "verified",
    SolverStatus.GUIDED_PRACTICE: "guided_practice",
    SolverStatus.AMBIGUOUS: "ambiguous",
    SolverStatus.UNSUPPORTED: "unsupported",
    SolverStatus.NEEDS_HUMAN_REVIEW: "unsupported",
}

# wire status -> SolverStatus (for the _serve() metrics line)
_WIRE_STATUS = {
    "verified": SolverStatus.VERIFIED,
    "guided_practice": SolverStatus.GUIDED_PRACTICE,
    "ambiguous": SolverStatus.AMBIGUOUS,
    "unsupported": SolverStatus.UNSUPPORTED,
}

# solve_isolation cache lane for the answer() fallback of this module, plus
# single-flight bookkeeping so a retry while an abandoned compute is still
# running JOINS the in-flight future instead of stacking a second
# unbounded-CAS run on the fallback pool.
_FALLBACK_CACHE_LANE = "solver.v3fallback"
_PENDING_LOCK = threading.Lock()
_PENDING: dict[str, concurrent.futures.Future] = {}
_SOLVER_FALLBACK_POOL = concurrent.futures.ThreadPoolExecutor(
    max_workers=4, thread_name_prefix="solver_fallback")


def _inner_budget_s() -> float:
    """Inner answer()-fallback budget in seconds.

    ``SOLVER_V3_INNER_BUDGET_S`` (default 1.0), read per call so operators
    (and tests) can tune it without a restart. This is DELIBERATELY a
    separate knob from the outer ``SOLVE_BUDGET_S``: the route already
    waits the outer budget in ``solve_isolation.run_sync`` around the whole
    of ``solve_deterministically``; this one governs only the in-module
    ``future.result()`` wait on the answer() fallback.
    """
    try:
        return max(0.05, float(os.environ.get("SOLVER_V3_INNER_BUDGET_S",
                                              "1.0")))
    except (TypeError, ValueError):
        return 1.0


def _forget_pending(key: str, fut: "concurrent.futures.Future") -> None:
    """Done-callback: drop the finished future from the single-flight map.
    Never raises."""
    try:
        with _PENDING_LOCK:
            if _PENDING.get(key) is fut:
                del _PENDING[key]
    except Exception:  # pragma: no cover — bookkeeping must not break anything
        pass


def _cache_completion(key: str,
                      fut: "concurrent.futures.Future") -> None:
    """Done-callback armed only when a caller ABANDONED the future at the
    inner budget: store the completion (successes only) so a retry of the
    same question is served from the solve_isolation cache instead of
    re-nudged. Normal completions are the outer solve_isolation layer's
    caching business. Never raises."""
    try:
        if fut.exception() is not None:
            return  # failures re-run on retry (solve_isolation contract)
        solve_isolation._store_cached(key, fut.result())
    except Exception:  # pragma: no cover — caching must not break anything
        pass


def _fallback_future(key: str, text: str,
                     context: Optional[dict] = None
                     ) -> "concurrent.futures.Future":
    """Single-flight submit of the answer() fallback for one cache key.
    `context` (WS-MH) carries the caller's board/class/subject scope into
    answer() so the bank-answer lane only serves in-scope keys."""
    created = None
    with _PENDING_LOCK:
        fut = _PENDING.get(key)
        if fut is None or fut.done():
            fut = _SOLVER_FALLBACK_POOL.submit(
                answer, text, context=context)
            _PENDING[key] = fut
            created = fut
    if created is not None:
        # Attach OUTSIDE the lock: an already-completed future fires the
        # callback inline on THIS thread, and _forget_pending takes the
        # same lock — attaching it under the lock self-deadlocks (caught
        # by test_deterministic_solver_service's instant-fake answer).
        created.add_done_callback(
            lambda f, _k=key: _forget_pending(_k, f))
    return fut


def _scrub_student_payload(payload: dict[str, Any]) -> None:
    """Slop-gate the student-facing strings of a served v3 payload, IN PLACE.

    Reuses ``slop_gate.gate_result`` through a minimal PipelineResult-shaped
    shim so the scrub semantics are IDENTICAL to the ``answer()`` choke
    point (answer / steps / refusal_reason rewritten, flags land on the
    audit trail, ``slop_gate`` stamped into gates_passed on a clean run).
    Fail-open by law: a broken gate never breaks the solve. Node ids riding
    payload fields (verification.anchor, audit.node_id) are accepted-by-
    design fetch keys and are left alone.
    """
    try:
        verification = payload.get("verification")
        if not isinstance(verification, dict):
            verification = {}
        gates = verification.get("gates_passed")
        shim = SimpleNamespace(
            label=str(verification.get("label") or payload.get("status")
                      or ""),
            answer=payload.get("answer")
            if isinstance(payload.get("answer"), str) else None,
            steps=payload.get("steps")
            if isinstance(payload.get("steps"), list) else [],
            refusal_reason=payload.get("refusal_reason")
            if isinstance(payload.get("refusal_reason"), str) else None,
            socratic=None,
            audit=SimpleNamespace(
                gates_passed=[g for g in gates] if isinstance(gates, list)
                else [],
                slop_flags=None),
        )
        scrubbed = gate_result(shim)

        if isinstance(payload.get("answer"), str):
            payload["answer"] = scrubbed.answer
        if isinstance(payload.get("steps"), list):
            payload["steps"] = scrubbed.steps
        if isinstance(payload.get("refusal_reason"), str):
            payload["refusal_reason"] = scrubbed.refusal_reason

        audit = payload.setdefault("audit", {})
        if not isinstance(audit, dict):
            return
        flags = getattr(getattr(scrubbed, "audit", None), "slop_flags", None)
        if flags:
            audit["slop_flags"] = list(flags)
        if "slop_gate" in shim.audit.gates_passed:
            for holder in (verification, audit):
                passed = holder.get("gates_passed") \
                    if isinstance(holder, dict) else None
                if isinstance(passed, list) and "slop_gate" not in passed:
                    passed.append("slop_gate")
    except Exception:  # noqa: BLE001 — fail-open, always
        pass


def _serve(payload: Any, *, stamp: str, subject: str, class_level: str,
           board: str, started: float) -> dict[str, Any]:
    """THE single exit of ``solve_deterministically``.

    (a) strict contract — a non-VERIFIED wire status never carries an
        answer (answer forced None, verification.verified forced False);
    (b) slop gate — student-facing strings scrubbed, fail-open;
    (c) metrics — exactly one solver_metrics line, lane="v3", route stamp.
    """
    if not isinstance(payload, dict):
        # a non-dict engine return cannot honor the contract — degrade to
        # a typed refusal instead of serving an opaque object
        payload = {
            "status": "unsupported",
            "answer": None,
            "steps": [],
            "verification": {"verified": False,
                             "label": "INVALID_ENGINE_PAYLOAD"},
            "audit": {"route": [stamp], "gates_passed": []},
            "llm_used": False,
            "refusal_reason": ("The solver produced an unreadable result "
                               "for this question."),
        }
    latency_ms = (time.perf_counter() - started) * 1000
    if not payload.get("elapsed_ms"):
        payload["elapsed_ms"] = round(latency_ms)
    # stable response keys every v3 client sees (engines/refusals alike)
    payload.setdefault("solver_version", SOLVER_VERSION)
    payload.setdefault("subject", subject)
    payload.setdefault("class_level", class_level)
    payload.setdefault("board", board)

    # (a) strict contract: the answer ships only on a VERIFIED wire status
    status = str(payload.get("status") or "unsupported")
    if status != "verified":
        payload["answer"] = None
        verification = payload.get("verification")
        if isinstance(verification, dict) and verification.get("verified"):
            verification["verified"] = False

    # (b) slop gate on the student-facing strings (fail-open)
    _scrub_student_payload(payload)

    # (c) one metrics line per solve: lane="v3" + route stamp
    audit = payload.get("audit") if isinstance(payload.get("audit"), dict) \
        else {}
    route = [str(r) for r in (audit.get("route") or [])]
    if stamp not in route:
        route.append(stamp)
    try:
        emit_solver_metrics(
            SolverOutcome(
                status=_WIRE_STATUS.get(status, SolverStatus.UNSUPPORTED),
                answer=payload.get("answer")
                if isinstance(payload.get("answer"), str) else None,
                steps=[s for s in (payload.get("steps") or [])
                       if isinstance(s, str)],
                route=route,
                llm_used=bool(payload.get("llm_used")),
                latency_ms=latency_ms,
                refusal_reason=payload.get("refusal_reason")
                if isinstance(payload.get("refusal_reason"), str) else None,
            ),
            lane="v3", route_stamp=stamp, subject=subject,
            class_level=class_level, board=board)
    except Exception:  # pragma: no cover — metrics never break the solve
        pass
    return payload


def _refusal_payload(
    route: list[str],
    refusal_reason: str,
    label: str,
    *,
    latency_ms: float,
) -> dict[str, Any]:
    """Structured-refusal payload (empty input / kernel refused / solver
    error) under the strict contract: UNSUPPORTED, no answer, honest
    reason. Served through ``_serve`` like every other exit."""
    return {
        "status": "unsupported",
        "answer": None,
        "steps": [],
        "verification": {"verified": False, "label": label},
        "audit": {"route": route, "gates_passed": []},
        "llm_used": False,
        "solver_version": SOLVER_VERSION,
        "elapsed_ms": round(latency_ms),
        "refusal_reason": refusal_reason,
    }


def solve_deterministically(
    question: str,
    *,
    subject: str = "",
    class_level: str = "",
    board: str = "",
) -> dict[str, Any]:
    """Solve a question through deterministic stages only."""
    started = time.perf_counter()
    normalized = str(question or "").strip()
    if not normalized:
        return _serve(
            _refusal_payload([], "Question is empty.", "EMPTY_INPUT",
                             latency_ms=0.0),
            stamp="v3:refusal:empty_input", subject=subject,
            class_level=class_level, board=board, started=started)

    # Fast NeuroLink Concept Lane (< 50ms):
    if is_pure_concept_query(normalized):
        try:
            fast_res = NeuroLinkEngine.get_instance().fast_solve(
                normalized, subject=subject, class_level=class_level
            )
            if isinstance(fast_res, dict) and fast_res:
                fast_res["board"] = board
                return _serve(fast_res, stamp="v3:neurolink:concept",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception("deterministic_service.fast_lane.concept",
                               exc)

    # Fast NeuroLink Calculus Lane (Giac + SymEngine + SymPy cascade < 20ms):
    if is_calculus_query(normalized):
        try:
            calc_res = NeuroLinkEngine.get_instance().solve_calculus(
                normalized, class_level=class_level
            )
            if isinstance(calc_res, dict) and calc_res:
                calc_res["board"] = board
                return _serve(calc_res, stamp="v3:neurolink:calculus",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception("deterministic_service.fast_lane.calculus",
                               exc)

    # Fast NeuroLink Physics Constraint Lane (Mechanics/Fluids/Collisions < 20ms):
    if is_physics_constraint_query(normalized):
        try:
            phys_res = NeuroLinkEngine.get_instance().solve_physics_constraint(
                normalized, class_level=class_level
            )
            if isinstance(phys_res, dict) and phys_res:
                phys_res["board"] = board
                return _serve(phys_res, stamp="v3:neurolink:physics_constraint",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception(
                "deterministic_service.fast_lane.physics_constraint", exc)

    # Fast NeuroLink Dimensional Guardrail Lane (Buckingham Pi & MCQ filter < 20ms):
    if is_dimensional_guardrail_query(normalized):
        try:
            dim_res = NeuroLinkEngine.get_instance().solve_dimensional(
                normalized, class_level=class_level
            )
            if isinstance(dim_res, dict) and dim_res:
                dim_res["board"] = board
                return _serve(dim_res, stamp="v3:neurolink:dimensional",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception(
                "deterministic_service.fast_lane.dimensional", exc)

    # Fast NeuroLink Circuit & Optics Matrix Lane (MNA & ABCD Matrices < 20ms):
    if is_circuit_or_optics_query(normalized):
        try:
            circ_res = NeuroLinkEngine.get_instance().solve_circuit_or_optics(
                normalized, class_level=class_level
            )
            if isinstance(circ_res, dict) and circ_res:
                circ_res["board"] = board
                return _serve(circ_res, stamp="v3:neurolink:circuit_or_optics",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception(
                "deterministic_service.fast_lane.circuit_or_optics", exc)

    # Fast NeuroLink Asymptotic Expansion Lane (Puiseux/Relativistic/Planck < 20ms):
    if is_asymptotic_query(normalized):
        try:
            asymp_res = NeuroLinkEngine.get_instance().solve_asymptotics(
                normalized, class_level=class_level
            )
            if isinstance(asymp_res, dict) and asymp_res:
                asymp_res["board"] = board
                return _serve(asymp_res, stamp="v3:neurolink:asymptotics",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception(
                "deterministic_service.fast_lane.asymptotics", exc)

    # Fast NeuroLink Inverted Solver & Question Engine Lane (< 20ms):
    if is_inverted_question_query(normalized):
        try:
            inv_res = NeuroLinkEngine.get_instance().generate_inverted_question(
                normalized, class_level=class_level
            )
            if isinstance(inv_res, dict) and inv_res:
                inv_res["board"] = board
                return _serve(inv_res, stamp="v3:neurolink:inverted_question",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception(
                "deterministic_service.fast_lane.inverted_question", exc)

    # Fast NeuroLink Chemistry Mechanism Lane (Exact Ionic/Organic/Solid State < 20ms):
    if is_chemistry_mechanism_query(normalized):
        try:
            chem_res = NeuroLinkEngine.get_instance().solve_chemistry_mechanism(
                normalized, class_level=class_level
            )
            if isinstance(chem_res, dict) and chem_res:
                chem_res["board"] = board
                return _serve(chem_res, stamp="v3:neurolink:chemistry_mechanism",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception(
                "deterministic_service.fast_lane.chemistry_mechanism", exc)

    # Fast NeuroLink Biology Cognitive Lane (NEET A-R/Respiration/Cardiac < 20ms):
    if is_biology_cognitive_query(normalized):
        try:
            bio_res = NeuroLinkEngine.get_instance().solve_biology_cognitive(
                normalized, class_level=class_level
            )
            if isinstance(bio_res, dict) and bio_res:
                bio_res["board"] = board
                return _serve(bio_res, stamp="v3:neurolink:biology_cognitive",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception(
                "deterministic_service.fast_lane.biology_cognitive", exc)

    # Fast NeuroLink Accounting & Commerce Lane (Share Forfeiture/Ratios/Keynes < 20ms):
    if is_accounting_commerce_query(normalized):
        try:
            comm_res = NeuroLinkEngine.get_instance().solve_accounting_commerce(
                normalized, class_level=class_level
            )
            if isinstance(comm_res, dict) and comm_res:
                comm_res["board"] = board
                return _serve(comm_res, stamp="v3:neurolink:accounting_commerce",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception(
                "deterministic_service.fast_lane.accounting_commerce", exc)

    # Fast NeuroLink Humanities & English Lane (Board Rubrics/Writs < 20ms):
    if is_humanities_query(normalized):
        try:
            hum_res = NeuroLinkEngine.get_instance().solve_humanities_rubric(
                normalized, class_level=class_level
            )
            if isinstance(hum_res, dict) and hum_res:
                hum_res["board"] = board
                return _serve(hum_res, stamp="v3:neurolink:humanities_rubric",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception(
                "deterministic_service.fast_lane.humanities_rubric", exc)

    # Fast NeuroLink Maths & Physics Zenith Lane (v-x curve calculus < 20ms):
    if is_graph_calculus_query(normalized):
        try:
            graph_res = NeuroLinkEngine.get_instance().solve_graph_calculus(
                normalized, class_level=class_level
            )
            if isinstance(graph_res, dict) and graph_res:
                graph_res["board"] = board
                return _serve(graph_res, stamp="v3:neurolink:graph_calculus",
                              subject=subject, class_level=class_level,
                              board=board, started=started)
        except Exception as exc:
            log_lane_exception(
                "deterministic_service.fast_lane.graph_calculus", exc)


    # Closed-world kernels run before the large legacy registry. This keeps
    # common novel numeric forms fast, exact, and independent of embeddings or
    # remote providers.
    try:
        exact = compute_exact(normalized, subject=subject)
    except ValueError as exc:
        # A question that starts with a supported exact grammar must not
        # fall through to a looser parser after malformed input is
        # rejected -- but ONLY when the text actually IS the arithmetic
        # the grammar promises.  Essay prompts merely PREFIXED with
        # "Evaluate ..."/"Calculate ..." (evaluate-prefix essays) are not
        # arithmetic: a hard refusal here shipped a bare `unsupported`
        # for questions the guided-method lanes scaffold honestly.  An
        # arithmetic-looking body keeps the strict refusal; anything
        # else falls through to answer().
        def _looks_arithmetic(s: str) -> bool:
            import re as _re
            body = _re.sub(r"^(evaluate|solve for x:|calculate speed:|"
                           r"calculate force:|calculate moles:)\s*",
                           "", s, flags=_re.I)
            return bool(_re.match(r"^[\d\s\.\+\-\*/\^\(\)]+$", body)
                        and _re.search(r"\d", body)) \
                or bool(_re.search(r"\d\s*[\+\-\*/\^]\s*\d", body))

        if normalized.startswith(("Evaluate", "Solve for x:",
                                  "Calculate speed:", "Calculate force:",
                                  "Calculate moles:")) \
                and _looks_arithmetic(normalized):
            return _serve(
                _refusal_payload(
                    ["exact_kernel:refused"], str(exc),
                    "EXACT_KERNEL_REFUSED",
                    latency_ms=(time.perf_counter() - started) * 1000),
                stamp="v3:exact_kernel:refused", subject=subject,
                class_level=class_level, board=board, started=started)
        exact = None
    if exact is not None:
        return _serve({
            "status": "verified",
            "answer": exact["answer"],
            "steps": exact["steps"],
            "verification": {
                "verified": True,
                "label": "VERIFIED",
                "gates_passed": exact["checks"],
                "anchor": None,
            },
            "audit": {
                "lane": "exact_kernel",
                "route": [exact["route"]],
                "quantities": [],
                "assumptions": [],
                "gates_passed": exact["checks"],
                "readings_considered": 1,
                "anchor": None,
            },
            "llm_used": False,
            "solver_version": SOLVER_VERSION,
            "subject": subject,
            "class_level": class_level,
            "board": board,
            "refusal_reason": None,
            "problem": exact["problem"],
            "verification_scope": exact["verification_scope"],
        }, stamp="v3:exact_kernel", subject=subject,
            class_level=class_level, board=board, started=started)

    # answer() fallback. The solve runs on this module's dedicated pool —
    # NOT on solve_isolation's: solve_deterministically itself typically
    # executes ON that pool (routers/solver.py run_sync), and a nested
    # same-pool submit can starve it (outer workers waiting on inner tasks
    # queued behind them). What IS shared is solve_isolation's RESULT
    # CACHE: a completion past the inner budget is not discarded — the
    # done-callback stores it (cache_key + _store_cached) so a retry is
    # served from cache, and single-flight joins a still-running attempt.
    # WS-MH: scope the bank-answer lane inside answer() to this call's
    # curriculum context; fold the scope into the cache/single-flight key
    # so a differently-scoped same-text question never joins or is served
    # from this attempt's cache slot.
    _ctx: dict[str, Any] = {}
    if str(subject or "").strip():
        _ctx["subject"] = str(subject).strip()
    if str(board or "").strip():
        _ctx["board"] = str(board).strip()
    try:
        _ctx["class_level"] = int(str(class_level).strip())
    except (TypeError, ValueError):
        pass
    _ctx_tag = "\x00ctx:" + repr(sorted(_ctx.items())) if _ctx else ""
    fallback_key = solve_isolation.cache_key(
        _FALLBACK_CACHE_LANE, normalized + _ctx_tag)
    cached = solve_isolation.get_cached(fallback_key)
    if cached is not None:
        result = cached  # late completion of an earlier >budget call
    else:
        try:
            future = _fallback_future(fallback_key, normalized,
                                      context=_ctx or None)
            result = future.result(timeout=_inner_budget_s())
        except concurrent.futures.TimeoutError as exc:
            # honest nudge now; the abandoned completion keeps running and
            # its result is CACHED when it lands — the retry is served
            # from cache instead of re-nudged
            log_lane_exception(
                "deterministic_service.v3_fallback.timeout", exc,
                budget_s=_inner_budget_s(), cache_key=fallback_key)
            try:
                future.add_done_callback(
                    lambda f, _k=fallback_key: _cache_completion(_k, f))
            except Exception:  # pragma: no cover — already-done future etc.
                _cache_completion(fallback_key, future)
            result = PipelineResult(
                label=GUIDED,
                answer=None,
                numeric=None,
                steps=[],
                audit=AuditTrail(lane="timeout_guard",
                                 route=["fallback:socratic_nudge"]),
                refusal_reason="This question needs a different approach — "
                               "let me help you work through it step by "
                               "step."
            )
        except Exception as exc:  # the API contract must never leak solver errors
            return _serve(
                _refusal_payload(
                    [], f"Deterministic solver failed safely: "
                        f"{type(exc).__name__}",
                    "SOLVER_ERROR",
                    latency_ms=(time.perf_counter() - started) * 1000),
                stamp="v3:refusal:solver_error", subject=subject,
                class_level=class_level, board=board, started=started)

    # SOLVER CONTRACT: one adapter, one answer gate. outcome_from_pipeline
    # maps the truth labels onto SolverStatus and releases the answer ONLY
    # on the VERIFIED tier — the same predicate the labels encode.
    outcome = outcome_from_pipeline(result)
    outcome.solver_version = SOLVER_VERSION
    outcome.latency_ms = (time.perf_counter() - started) * 1000

    verified = outcome.status is SolverStatus.VERIFIED
    if verified:
        status = "verified"
    elif outcome.status is SolverStatus.AMBIGUOUS:
        status = "ambiguous"
    else:
        status = "guided_practice" if result.label == GUIDED else "unsupported"

    # ANSWER GATE (regression guard 2026-10-05): the answer field carries
    # released_answer() ONLY. The previous fallback filled non-verified
    # responses with the pipeline's raw unverified answer — leaking the
    # answer the gate exists to withhold (test_unverified_result_never_
    # carries_an_answer pins this).
    answer_val = outcome.released_answer()

    return _serve({
        "status": status,
        "answer": answer_val,
        "steps": list(outcome.steps or []),
        "verification": {
            "verified": verified,
            "label": result.label,
            "gates_passed": list(result.audit.gates_passed),
            "anchor": result.audit.anchor,
        },
        "audit": result.audit.to_dict(),
        "llm_used": bool(outcome.llm_used),
        "solver_version": SOLVER_VERSION,
        "subject": subject,
        "class_level": class_level,
        "board": board,
        "elapsed_ms": round(outcome.latency_ms),
        "refusal_reason": result.refusal_reason,
        "confidence": getattr(result, "confidence", None),
        "disclaimer": getattr(result, "disclaimer", None),
    }, stamp="v3:answer_pipeline", subject=subject, class_level=class_level,
        board=board, started=started)
