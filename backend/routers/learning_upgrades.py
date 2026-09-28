"""learning_upgrades router — the five platform upgrades in one router:

  /api/analytics/misconceptions/*  — Misconception Analytics (heatmap,
                                     student profile, remediation bundles)
  /api/review/*                    — Spaced Repetition daily driver
                                     (due queue, upcoming, SM-2 grading)
  /api/path/next-best/{user_id}    — Adaptive Next-Best-Lesson engine
  /api/examiner/grade              — Examiner Mode (grade against the
                                     node's authored MARKING_POINTS)
  /api/passport/{user_id}          — Mastery Passport transcript
"""
from typing import List, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.services import (
    misconception_analytics as ma,
    review_scheduler as srs,
    next_best_lesson as nbl,
    mastery_passport as passport,
    examiner_mode as examiner,
)

router = APIRouter(tags=["learning-upgrades"])


# ── 1. Misconception Analytics ────────────────────────────────────────────
@router.get("/api/analytics/misconceptions/heatmap")
async def misconception_heatmap(
    days: int = 30,
    student_id: Optional[str] = None,
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
):
    return await ma.trap_heatmap(db, days=days, student_id=student_id, limit=limit)


@router.get("/api/analytics/misconceptions/student/{student_id}")
async def student_misconception_profile(student_id: str, db: AsyncSession = Depends(get_db)):
    return await ma.student_trap_profile(db, student_id)


class BundleBody(BaseModel):
    student_ids: List[str]
    min_students: int = 2


@router.post("/api/analytics/misconceptions/remediation-bundle")
async def remediation_bundle(body: BundleBody, db: AsyncSession = Depends(get_db)):
    return await ma.class_remediation_bundle(
        db, body.student_ids, min_students=body.min_students)


# ── 2. Spaced Repetition Review Engine ────────────────────────────────────
@router.get("/api/review/queue/{user_id}")
async def review_queue(
    user_id: str, limit: int = 20, include_overdue: bool = True,
    db: AsyncSession = Depends(get_db),
):
    return await srs.due_queue(db, user_id, limit=limit,
                               include_overdue=include_overdue)


@router.get("/api/review/upcoming/{user_id}")
async def review_upcoming(
    user_id: str, days: int = 7, limit: int = 50,
    db: AsyncSession = Depends(get_db),
):
    return await srs.upcoming(db, user_id, days=days, limit=limit)


class GradeBody(BaseModel):
    user_id: str
    node_id: str
    quality: int  # 0-5 SM-2 grade


@router.post("/api/review/grade")
async def review_grade(body: GradeBody, db: AsyncSession = Depends(get_db)):
    return await srs.apply_grade(db, body.user_id, body.node_id, body.quality)


# ── 3. Adaptive Next-Best-Lesson ──────────────────────────────────────────
@router.get("/api/path/next-best/{user_id}")
async def next_best(
    user_id: str, limit: int = 5, mastery_floor: float = 0.85,
    db: AsyncSession = Depends(get_db),
):
    return await nbl.next_best(db, user_id, limit=limit, mastery_floor=mastery_floor)


# ── 4. Examiner Mode ──────────────────────────────────────────────────────
class ExaminerBody(BaseModel):
    node_id: str
    student_text: str = ""
    image_text: str = ""  # OCR/vision-extracted text from the photo, if any


@router.post("/api/examiner/grade")
async def examiner_grade(body: ExaminerBody):
    return examiner.grade_answer(
        body.node_id, body.student_text, image_text=body.image_text or None)


# ── 5. Mastery Passport ───────────────────────────────────────────────────
@router.get("/api/passport/{user_id}")
async def mastery_passport(user_id: str, db: AsyncSession = Depends(get_db)):
    return await passport.build_passport(db, user_id)
