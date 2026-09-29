"""End-to-end deterministic solver service.

This is the public subject-agnostic entry point for the truth core. It uses
the existing deterministic lane registry and answer pipeline; it never calls
the legacy LLM fallback. Unsupported or ambiguous questions are returned as
structured refusals instead of being guessed.
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


VERIFIED_LABELS = {VERIFIED, VERIFIED_ASSUMED, VERIFIED_OFFICIAL}


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
        return {
            "status": "unsupported",
            "answer": None,
            "steps": [],
            "verification": {"verified": False, "label": "EMPTY_INPUT"},
            "audit": {"route": [], "gates_passed": []},
            "llm_used": False,
            "solver_version": "truth-core-v1",
            "subject": subject,
            "class_level": class_level,
            "board": board,
            "elapsed_ms": 0,
            "refusal_reason": "Question is empty.",
        }

    try:
        result = answer(normalized)
    except Exception as exc:  # the API contract must never leak solver errors
        return {
            "status": "unsupported",
            "answer": None,
            "steps": [],
            "verification": {"verified": False, "label": "SOLVER_ERROR"},
            "audit": {"route": [], "gates_passed": []},
            "llm_used": False,
            "solver_version": "truth-core-v1",
            "subject": subject,
            "class_level": class_level,
            "board": board,
            "elapsed_ms": round((time.perf_counter() - started) * 1000),
            "refusal_reason": f"Deterministic solver failed safely: {type(exc).__name__}",
        }

    verified = result.label in VERIFIED_LABELS
    if verified:
        status = "verified"
    elif result.label == AMBIGUOUS:
        status = "ambiguous"
    else:
        status = "guided_practice" if result.label == GUIDED else "unsupported"

    return {
        "status": status,
        "answer": result.answer if verified else None,
        "steps": list(result.steps or []),
        "verification": {
            "verified": verified,
            "label": result.label,
            "gates_passed": list(result.audit.gates_passed),
            "anchor": result.audit.anchor,
        },
        "audit": result.audit.to_dict(),
        "llm_used": False,
        "solver_version": "truth-core-v1",
        "subject": subject,
        "class_level": class_level,
        "board": board,
        "elapsed_ms": round((time.perf_counter() - started) * 1000),
        "refusal_reason": result.refusal_reason,
    }
