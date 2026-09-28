"""answer_trail.py — the audit trail: honest provenance on every verdict.

Built ONLY from data the answering path already holds — nothing here is
inferred or invented. `mode` reflects where the question came from and
how it was judged; `checks` restates the actual matching rule applied;
`source` carries the authored topic/chapter (never the internal node id
as display text); `coaching`/`flags` surface what extra machinery fired.

The frontend renders this as the collapsed "Why this verdict?" panel
(components/audit/AuditTrail.tsx). Absent data means the field is simply
not emitted — the panel hides missing rows rather than faking them.
"""
from __future__ import annotations

from typing import Any, Optional


def _attr(question: Any, name: str, default: Any = None) -> Any:
    """Questions may be selector dicts or ORM-like objects."""
    if isinstance(question, dict):
        return question.get(name, default)
    return getattr(question, name, default)


def practice_trail(
    question: Any,
    *,
    is_correct: bool,
    check: str,
    selected_option: Optional[str] = None,
    marking_feedback: Optional[dict[str, Any]] = None,
    misconception: Optional[str] = None,
) -> dict[str, Any]:
    """Trail for a practice submit (api/practice.py /submit).

    `check` is the honest label of the matching rule that ran:
      "option-match"  — MCQ/TF: compared to the authored key option
      "text-match"    — free text compared to the authored answer key
    """
    year = _attr(question, "year", None)
    trail: dict[str, Any] = {
        "mode": "RUBRIC" if marking_feedback else "VERIFIED",
        "mode_note": (
            "graded against the authored marking scheme, point by point"
            if marking_feedback
            else "checked against the authored answer key"
        ),
        "source": {
            "topic": _attr(question, "topic", None),
            "subtopic": _attr(question, "subtopic", None),
            "past_paper_year": year,
            "marks": _attr(question, "marks", None),
        },
        "checks": {
            "method": "option-match" if selected_option is not None else check,
            "passed": bool(is_correct),
        },
        "coaching": {
            "marking_scheme": bool(marking_feedback),
            "misconception_targeted": bool(misconception),
        },
    }
    return trail


def solver_trail(result: Any, *, fallback_used: bool = False) -> dict[str, Any]:
    """Trail for a deterministic solver answer (ModelResult-shaped).

    mode SOLVED means a registered family computed the answer AND its
    verification beat ran; FALLBACK means a best-effort path produced it
    (shown honestly, never dressed up as solved).
    """
    steps = getattr(result, "steps", None) or []
    return {
        "mode": "FALLBACK" if fallback_used else "SOLVED",
        "mode_note": (
            "best-effort path — verify with your textbook before relying"
            if fallback_used
            else "computed by a verified formula family with a shown check"
        ),
        "family": getattr(result, "structure", None),
        "checks": {
            "method": getattr(result, "governing_equation", None),
            "steps_shown": len(steps),
        },
    }
