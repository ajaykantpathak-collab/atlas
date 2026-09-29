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
"""

from __future__ import annotations

import time
from typing import Any

from backend.its.solver.answer_pipeline import (
    AMBIGUOUS,
    GUIDED,
    VERIFIED,
    VERIFIED_ASSUMED,
    VERIFIED_OFFICIAL,
    answer,
)
from backend.its.solver.contract import (
    SOLVER_VERSION,
    SolverOutcome,
    SolverStatus,
    emit_solver_metrics,
    outcome_from_pipeline,
)
from backend.its.solver.exact_kernels import compute_exact


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


def _metrics(outcome: SolverOutcome, *, subject: str, class_level: str,
             board: str) -> None:
    """One solver_metrics line per solve — never breaks the solve."""
    try:
        emit_solver_metrics(
            outcome, lane="deterministic", subject=subject,
            class_level=class_level, board=board)
    except Exception:  # pragma: no cover — logging must not break the solve
        pass


def _refusal_outcome(
    route: list[str],
    refusal_reason: str,
    label: str,
    *,
    latency_ms: float,
) -> SolverOutcome:
    """Structured-refusal path (empty input / kernel refused / solver error)
    under the strict contract: UNSUPPORTED, no answer, honest reason."""
    return SolverOutcome(
        status=SolverStatus.UNSUPPORTED,
        answer=None, numeric=None, steps=[], proof={"label": label},
        route=route, structure="", note="",
        llm_used=False, latency_ms=latency_ms,
        refusal_reason=refusal_reason,
    )


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
        _metrics(_refusal_outcome(
            [], "Question is empty.", "EMPTY_INPUT",
            latency_ms=0.0),
            subject=subject, class_level=class_level, board=board)
        return {
            "status": "unsupported",
            "answer": None,
            "steps": [],
            "verification": {"verified": False, "label": "EMPTY_INPUT"},
            "audit": {"route": [], "gates_passed": []},
            "llm_used": False,
            "solver_version": SOLVER_VERSION,
            "subject": subject,
            "class_level": class_level,
            "board": board,
            "elapsed_ms": 0,
            "refusal_reason": "Question is empty.",
        }

    # Closed-world kernels run before the large legacy registry. This keeps
    # common novel numeric forms fast, exact, and independent of embeddings or
    # remote providers.
    try:
        exact = compute_exact(normalized, subject=subject)
    except ValueError as exc:
        # A question that starts with a supported exact grammar must not fall
        # through to a looser parser after malformed input is rejected.
        if normalized.startswith(("Evaluate", "Solve for x:", "Calculate speed:",
                                  "Calculate force:", "Calculate moles:")):
            _metrics(_refusal_outcome(
                ["exact_kernel:refused"], str(exc), "EXACT_KERNEL_REFUSED",
                latency_ms=(time.perf_counter() - started) * 1000),
                subject=subject, class_level=class_level, board=board)
            return {
                "status": "unsupported",
                "answer": None,
                "steps": [],
                "verification": {"verified": False, "label": "EXACT_KERNEL_REFUSED"},
                "audit": {"route": ["exact_kernel:refused"], "gates_passed": []},
                "llm_used": False,
                "solver_version": SOLVER_VERSION,
                "subject": subject,
                "class_level": class_level,
                "board": board,
                "elapsed_ms": round((time.perf_counter() - started) * 1000),
                "refusal_reason": str(exc),
            }
        exact = None
    if exact is not None:
        _metrics(SolverOutcome(
            status=SolverStatus.VERIFIED,
            answer=str(exact["answer"]),
            steps=list(exact["steps"] or []),
            proof={"gates_passed": list(exact["checks"] or [])},
            route=[exact["route"]],
            llm_used=False,
            latency_ms=(time.perf_counter() - started) * 1000,
        ), subject=subject, class_level=class_level, board=board)
        return {
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
            "elapsed_ms": round((time.perf_counter() - started) * 1000),
            "refusal_reason": None,
            "problem": exact["problem"],
            "verification_scope": exact["verification_scope"],
        }

    try:
        result = answer(normalized)
    except Exception as exc:  # the API contract must never leak solver errors
        _metrics(_refusal_outcome(
            [], f"Deterministic solver failed safely: {type(exc).__name__}",
            "SOLVER_ERROR",
            latency_ms=(time.perf_counter() - started) * 1000),
            subject=subject, class_level=class_level, board=board)
        return {
            "status": "unsupported",
            "answer": None,
            "steps": [],
            "verification": {"verified": False, "label": "SOLVER_ERROR"},
            "audit": {"route": [], "gates_passed": []},
            "llm_used": False,
            "solver_version": SOLVER_VERSION,
            "subject": subject,
            "class_level": class_level,
            "board": board,
            "elapsed_ms": round((time.perf_counter() - started) * 1000),
            "refusal_reason": f"Deterministic solver failed safely: {type(exc).__name__}",
        }

    # SOLVER CONTRACT: one adapter, one answer gate. outcome_from_pipeline
    # maps the truth labels onto SolverStatus and releases the answer ONLY
    # on the VERIFIED tier — the same predicate the labels encode.
    outcome = outcome_from_pipeline(result)
    outcome.solver_version = SOLVER_VERSION
    outcome.latency_ms = (time.perf_counter() - started) * 1000
    _metrics(outcome, subject=subject, class_level=class_level, board=board)

    verified = outcome.status is SolverStatus.VERIFIED
    if verified:
        status = "verified"
    elif outcome.status is SolverStatus.AMBIGUOUS:
        status = "ambiguous"
    else:
        status = "guided_practice" if result.label == GUIDED else "unsupported"

    return {
        "status": status,
        "answer": outcome.released_answer(),
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
    }
