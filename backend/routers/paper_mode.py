"""paper_mode.py -- Board Paper Mode: real past papers, graded live.

A student picks a class/subject paper assembled ONLY from the real
``board_questions`` bank (251k CBSE rows), attempts it question-by-
question, and gets per attempt: an instant verified grade (marks-aware),
the solver's step-contract solution (through the isolation boundary), and
the misconception link when the row's node carries diagnostic schema.

Endpoints
---------
  GET  /api/paper/subjects?class_level=&board=
       -> the paper catalog: every class/subject combination the bank
          actually holds, with counts and year metadata.  Honest: a
          combination absent from the bank is absent from this list.
  GET  /api/paper/{class_level}/{subject}?year=&board=&limit=
       -> the ordered paper.  Answers are NEVER exposed here (ids travel
          as opaque fetch keys only).
  POST /api/paper/attempt {question_id, student_answer}
       -> verdict (CORRECT / PARTIAL / WRONG / UNGRADEABLE), marks-aware
          award, solver solution (label/answer/steps + verification line
          of the step contract), misconception link (honest nulls).
          Requires a signed-in caller; the attempt is recorded for THEM.
  GET  /api/paper/attempts/{student_id}
       -> the attempt ledger summary.  Guarded by ``require_self_or_staff``
          (the B16 ownership pattern) — never widened.

QUARANTINED bank rows are excluded from both catalog and papers unless
that board is requested explicitly.
"""
from __future__ import annotations

import logging
import uuid
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import distinct as sa_distinct
from sqlalchemy import select as sa_select, func as sa_func
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user, require_self_or_staff
from backend.models.enrichment import BoardQuestion
from backend.models.user import User
from backend.services import paper_mode_service as pms
from backend.services.feedback_scrub import (
    _scrub_ids, scrub_answer_key, scrub_explanation)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/paper", tags=["paper-mode"])

_DEFAULT_PAPER_SIZE = 50
_MAX_PAPER_SIZE = 200


# ── 1. catalog ────────────────────────────────────────────────────────────
@router.get("/subjects")
async def paper_subjects(
    class_level: Optional[int] = Query(None, ge=1, le=12),
    board: str = Query("CBSE", min_length=1, max_length=32),
    db: AsyncSession = Depends(get_db),
):
    """Every class/subject/year combination the bank honestly holds."""
    q = (sa_select(BoardQuestion.subject,
                   BoardQuestion.class_level,
                   sa_func.count(),
                   sa_func.array_agg(sa_distinct(BoardQuestion.year)))
         .where(BoardQuestion.board == board)
         .group_by(BoardQuestion.subject, BoardQuestion.class_level))
    if class_level is not None:
        q = q.where(BoardQuestion.class_level == class_level)
    rows = (await db.execute(q)).all()
    return {"board": board, "combos": pms.build_catalog(rows)}


# ── 3. attempt ledger — MUST be declared before the /{class_level}/
#    {subject} paper route: registration order is match order, and a
#    parameterized route declared first swallows "attempts" as a subject
#    (the exact bug class the /api/passport/me fix documents).
# ──────────────────────────────────────────────────────────────────────────
@router.get("/attempts/{student_id}")
async def paper_attempts(
    student_id: str = Depends(require_self_or_staff),
    db: AsyncSession = Depends(get_db),
):
    """Attempt ledger for one student (self or staff only)."""
    store = pms.new_store()
    record = await store.load(student_id)
    attempts: List[Dict[str, Any]] = list((record or {}).get("attempts") or [])
    return {"student_id": student_id, "attempts": attempts,
            "summary": pms.summarize(attempts)}


# ── 2. the paper ──────────────────────────────────────────────────────────
@router.get("/{class_level}/{subject}")
async def paper_questions(
    class_level: int,
    subject: str,
    year: Optional[str] = Query(None, max_length=16),
    board: str = Query("CBSE", min_length=1, max_length=32),
    limit: int = Query(_DEFAULT_PAPER_SIZE, ge=1, le=_MAX_PAPER_SIZE),
    db: AsyncSession = Depends(get_db),
):
    """The ordered paper.  Answer keys never leave the backend."""
    subj = pms.canonical_subject(subject)
    q = (sa_select(BoardQuestion)
         .where(BoardQuestion.board == board)
         .where(BoardQuestion.class_level == class_level)
         .where(sa_func.lower(BoardQuestion.subject) == subj.lower())
         .limit(limit))
    if year:
        q = q.where(BoardQuestion.year == year)
    q = q.order_by(BoardQuestion.question_number.is_(None),
                   BoardQuestion.question_number,
                   BoardQuestion.created_at)
    rows = (await db.execute(q)).scalars().all()
    return pms.build_paper(class_level, subj, rows,
                           requested_year=year, board=board)


# ── 3. attempt ────────────────────────────────────────────────────────────
class AttemptRequest(BaseModel):
    question_id: str = Field(..., min_length=1, max_length=64)
    student_answer: str = Field(..., max_length=8000)


@router.post("/attempt")
async def paper_attempt(
    body: AttemptRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Grade one attempt + solver solution + misconception link.

    The solve runs through ``services/solve_isolation`` (dedicated bounded
    pool, hard budget, background-finish-and-cache) — never inline on the
    event loop.  A 30-question paper cannot wedge a worker."""
    try:
        qid = str(uuid.UUID(body.question_id.strip()))
    except (ValueError, AttributeError, TypeError):
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail="question_id must be a uuid")
    row = (await db.execute(
        sa_select(BoardQuestion).where(BoardQuestion.id == qid)
    )).scalar_one_or_none()
    if row is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="question not found in the bank")

    grade = pms.grade_attempt(row, body.student_answer)

    solution = await pms.solve_solution(row.question_text or "")
    misconception = await pms.misconception_link(row)

    student_id = str(user.id)
    record = {
        "question_id": qid,
        "subject": row.subject,
        "class_level": row.class_level,
        "verdict": grade["verdict"],
        "correct": grade["correct"],
        "marks": grade["marks"],
        "marks_awarded": grade["marks_awarded"],
        "lane": grade["lane"],
    }
    try:
        store = pms.new_store()
        existing = await store.load(student_id)
        attempts: List[Dict[str, Any]] = list((existing or {}).get("attempts")
                                              or [])
        attempts.append(record)
        await store.save({"session_id": student_id,
                          "attempts": attempts[-pms.MAX_RECORDED_ATTEMPTS:]})
    except Exception as exc:            # ledger is best-effort, never blocks
        logger.warning("paper_mode attempt ledger write failed: %s", exc)

    # Post-attempt review: with the attempt submitted, the stored key and
    # model answer may be shown (same honesty rule as the pre-board
    # simulator's review step).  Before an attempt, /paper/... exposes none.
    review = {
        # bank fields can hold GRADER prose AND embedded corpus node ids —
        # scrub both at serving (902 marking_scheme rows embed ids).
        "correct_answer": scrub_answer_key(row.correct_answer),
        "model_answer": _scrub_ids(row.model_answer or ""),
        "explanation": scrub_explanation(
            row.explanation, bool(grade["correct"])),
        "marking_scheme": _scrub_ids(row.marking_scheme or ""),
    }
    return {
        "question_id": qid,
        "grade": grade,
        "solution": solution,
        "misconception": misconception,
        "review": review,
    }
