"""grade_prose.py — Wave 9.8 L4: mark prose answers against the board's
own marking scheme.

POST /api/prose/grade {question, answer, marks?, board?, class_level?,
                       subject?, node_id?}

Prose stems can't be *solved* — they resolve to the guided tier.  But a
CBSE examiner doesn't need to solve them either: the marking scheme is a
point checklist.  This endpoint resolves the scheme (node marking
points -> node competency steps -> exact-norm bank row's
marking_scheme -> model_answer) and grades coverage deterministically —
no LLM on the path (prod SOLVER_LLM_MODE=off posture preserved).

Envelope carries ``answer_tier: "graded"`` so the FE routes it like the
other Contract A tiers; when no marking data exists the response is
honestly ``verdict: "unknown"`` (and never claims "graded").

Auth-optional like /api/solve/check; rate-limited under the same
expensive prefix class ("/api/prose" is in _EXPENSIVE_PATTERNS).
"""

from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field

log = logging.getLogger(__name__)

router = APIRouter(tags=["prose-grade"])


class ProseGradeRequest(BaseModel):
    question: str = Field(..., min_length=8, max_length=4000)
    answer: str = Field(..., min_length=1, max_length=8000)
    marks: Optional[int] = Field(default=None, ge=1, le=20)
    board: Optional[str] = None
    class_level: Optional[int] = Field(default=None, ge=1, le=12)
    subject: Optional[str] = None
    node_id: Optional[str] = None


_UNKNOWN_FEEDBACK = (
    "No marking data is available for this question, so it can't be "
    "graded against the board's scheme — work through it together with "
    "the tutor instead.")


@router.post("/api/prose/grade")
async def grade_prose(req: ProseGradeRequest):
    import asyncio as _aio
    from backend.services import marking_scheme_grader as _gr

    resolved = None
    try:
        resolved = await _aio.to_thread(
            _gr.resolve_marking, req.question,
            node_id=req.node_id, board=req.board,
            class_level=req.class_level, subject=req.subject)
    except Exception as exc:  # noqa: BLE001 -- fail closed
        log.debug("prose resolve degraded: %s", type(exc).__name__)

    if not resolved or not resolved.get("points"):
        return {"ok": True, "verdict": "unknown",
                "answer_tier": "guided",
                "earned": None, "of": req.marks,
                "hit_points": [], "missed_points": [],
                "feedback": _UNKNOWN_FEEDBACK,
                "model_at_marks": [], "source": None}

    marks = req.marks if req.marks is not None else resolved.get("marks")
    ctx = dict(resolved)
    try:
        graded = await _aio.to_thread(
            _gr.grade, req.question, req.answer,
            marks=marks, context=ctx)
    except Exception as exc:  # noqa: BLE001
        log.debug("prose grade degraded: %s", type(exc).__name__)
        graded = {"verdict": "unknown", "earned": None, "of": marks,
                  "hit_points": [], "missed_points": [],
                  "feedback": _UNKNOWN_FEEDBACK}

    if graded.get("verdict") != "graded":
        return {"ok": True, "verdict": "unknown",
                "answer_tier": "guided",
                "earned": None, "of": marks,
                "hit_points": [], "missed_points": [],
                "feedback": graded.get("feedback") or _UNKNOWN_FEEDBACK,
                "model_at_marks": [], "source": resolved.get("source")}

    model_variants = []
    try:
        model_variants = await _aio.to_thread(
            _gr.model_at_marks, resolved.get("model_answer") or "",
            resolved.get("points"), marks or 5)
    except Exception as exc:  # noqa: BLE001
        log.debug("model_at_marks degraded: %s", type(exc).__name__)

    return {"ok": True, "verdict": "graded",
            # the FE tier router keys on answer_tier — "graded" is the
            # marking-scheme lane's envelope signal (Contract A additive)
            "answer_tier": "graded",
            "earned": graded.get("earned"),
            "of": graded.get("of"),
            "hit_points": graded.get("hit_points") or [],
            "missed_points": graded.get("missed_points") or [],
            "feedback": graded.get("feedback") or "",
            "model_at_marks": model_variants,
            "source": graded.get("source") or resolved.get("source")}
