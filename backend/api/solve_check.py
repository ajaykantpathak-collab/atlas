"""solve_check.py — Wave 9.8 Contract A endpoints (L1) + Enhanced Practice Mechanisms.

POST /api/solve/check  {question, answer} -> {ok, verdict, hint, earned_marks?, max_marks?}
    Mechanism 2: Interactive "Check My Answer" / Self-Testing verification.
    Validates student number, MCQ option, symbolic expression, or prose derivation
    against the computed reference and official rubrics.

POST /api/tutor/reveal  {question, board?, class_level?, subject?}
    Mechanism 1: On-Demand Compute / Solution Reveal for Guided Practice.
    Computes and reveals the actual scalar numeric, symbolic answer, and unscrubbed
    steps so students can self-check their work.

POST /api/solve/compute  {question, board?, class_level?, subject?}
    Direct on-demand sandbox calculation endpoint.

POST /api/subjective/grade  {question, answer, marks?, board?, class_level?, subject?}
    Mechanism 3: Rubric Grader Integration for Subjective Derivations.
    Evaluates student prose derivations against CBSE/ISC marking schemes.
"""

from __future__ import annotations

import asyncio as _aio
import logging
import re
from typing import Any, Dict, List, Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field

from backend.services import solver_gateway
from backend.services.subjective_grader import grade_subjective_answer

log = logging.getLogger(__name__)

router = APIRouter(tags=["solve-check"])

_NUM_TOKEN = re.compile(r"-?[\d,]+(?:\.\d+)?")


class SolveCheckRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=4000)
    answer: str = Field(..., min_length=1, max_length=2000)
    board: Optional[str] = None
    class_level: Optional[int] = Field(default=None, ge=1, le=12)
    subject: Optional[str] = None


class SolveCheckResponse(BaseModel):
    ok: bool
    verdict: str          # "match" | "mismatch" | "graded" | "ambiguous" | "unknown"
    hint: str
    earned_marks: Optional[float] = None
    max_marks: Optional[float] = None
    criteria_met: Optional[List[str]] = None
    criteria_missed: Optional[List[str]] = None


class TutorRevealRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=4000)
    board: Optional[str] = None
    class_level: Optional[int] = Field(default=None, ge=1, le=12)
    subject: Optional[str] = None


class SubjectiveGradeRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=4000)
    answer: str = Field(..., min_length=1, max_length=4000)
    marks: Optional[int] = Field(default=None, ge=1, le=20)
    board: Optional[str] = None
    class_level: Optional[int] = Field(default=None, ge=1, le=12)
    subject: Optional[str] = None


@router.post("/api/solve/check", response_model=SolveCheckResponse)
async def solve_check(req: SolveCheckRequest) -> SolveCheckResponse:
    """Mechanism 2: Interactive Check My Answer."""
    ctx = None
    if req.board or req.class_level or req.subject:
        ctx = {
            "board": req.board,
            "class_level": req.class_level,
            "subject": req.subject,
        }

    try:
        res = await solver_gateway.check_student_answer(
            req.question, req.answer, context=ctx)
        return SolveCheckResponse(
            ok=res.get("ok", False),
            verdict=res.get("verdict", "unknown"),
            hint=res.get("hint", ""),
            earned_marks=res.get("earned_marks"),
            max_marks=res.get("max_marks"),
            criteria_met=res.get("criteria_met"),
            criteria_missed=res.get("criteria_missed"),
        )
    except Exception as exc:
        log.debug("solve_check check_student_answer degraded: %s", type(exc).__name__)
        return SolveCheckResponse(
            ok=True,
            verdict="unknown",
            hint="We couldn't verify that automatically — work through the steps and we'll reason about it together.",
        )


@router.post("/api/tutor/reveal")
async def tutor_reveal(req: TutorRevealRequest):
    """Mechanism 1: On-Demand Compute / Solution Reveal for Guided Practice."""
    ctx = None
    if req.board or req.class_level or req.subject:
        ctx = {
            "board": req.board,
            "class_level": req.class_level,
            "subject": req.subject,
        }

    try:
        # Compute exact unscrubbed solution on-demand (lazy gateway
        # access keeps the heavy solver import off the app-boot path)
        computed = await _aio.to_thread(
            solver_gateway.compute_solution, req.question, context=ctx)
        if computed and (computed.get("answer") or computed.get("numeric") is not None or computed.get("steps")):
            return {
                "ok": True,
                "verified": False,
                "answer_tier": "revealed",
                "trust": {
                    "label": "Revealed Solution",
                    "detail": "On-demand calculated solution for self-check practice",
                },
                "answer": computed.get("answer"),
                "numeric": computed.get("numeric"),
                "steps": computed.get("steps") or [],
                "method": computed.get("method"),
                "source": computed.get("source"),
            }
    except Exception as exc:
        log.debug("tutor_reveal compute_solution degraded: %s", type(exc).__name__)

    # Fallback to legacy tiered_response best_available_payload
    try:
        return await _aio.to_thread(
            solver_gateway.best_available_payload, req.question, context=ctx)
    except Exception as exc:
        log.debug("tutor_reveal best_available_payload degraded: %s", type(exc).__name__)
        return {
            "verified": False,
            "answer_tier": "guided",
            "trust": {
                "label": "Let's build it together",
                "detail": "We could not verify this one — let's build it together",
            },
            "method": None,
            "similar": None,
            "check_endpoint": None,
        }


@router.post("/api/solve/compute")
async def solve_compute(req: TutorRevealRequest):
    """Direct on-demand sandbox calculation endpoint."""
    ctx = None
    if req.board or req.class_level or req.subject:
        ctx = {
            "board": req.board,
            "class_level": req.class_level,
            "subject": req.subject,
        }
    return await _aio.to_thread(
        solver_gateway.compute_solution, req.question, context=ctx)


@router.post("/api/subjective/grade")
async def subjective_grade(req: SubjectiveGradeRequest):
    """Mechanism 3: Rubric Grader Integration for Subjective Derivations."""
    ctx = None
    if req.board or req.class_level or req.subject:
        ctx = {
            "board": req.board,
            "class_level": req.class_level,
            "subject": req.subject,
        }
    return await grade_subjective_answer(
        question_text=req.question,
        student_answer=req.answer,
        max_marks=req.marks,
        context=ctx,
    )
