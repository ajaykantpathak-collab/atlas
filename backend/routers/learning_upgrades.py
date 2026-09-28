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

# ── 4b. Examiner Mode — photo input (vision extraction → grade) ──────────
class ExaminerImageBody(BaseModel):
    node_id: str
    image: str  # base64 or data-url photo of the handwritten answer


@router.post("/api/examiner/grade-image")
async def examiner_grade_image(body: ExaminerImageBody):
    """Photo of handwritten answer → OCR/vision extraction → graded against
    the node's authored MARKING_POINTS. One round trip; falls back honestly
    when the vision key/config is missing."""
    extracted_text = ""
    source = "none"
    try:
        from backend.api.vision import (
            _call_parse, _call_vision, _nvidia_key, _to_data_url,
        )
        key = _nvidia_key()
        if key:
            data_url = _to_data_url(body.image, None)
            text, regions = await _call_parse(data_url, key)
            if not text or len(text) < 20:
                text = await _call_vision(data_url, key)
                source = "vision"
            else:
                source = "parse"
            extracted_text = text or ""
    except Exception:
        extracted_text = ""
    result = examiner.grade_answer(
        body.node_id, extracted_text) if extracted_text else {
        "graded": False,
        "error": "could not extract text from the photo — retake in better light, or type the answer",
    }
    return {"extracted_text": extracted_text[:2000], "extraction_source": source,
            **result}

# ── token-derived "me" variants (platform convention: user from auth) ────
from backend.deps import get_current_user as _gcu
from backend.models.user import User as _User


@router.get("/api/review/queue/me")
async def review_queue_me(
    limit: int = 20, include_overdue: bool = True,
    db: AsyncSession = Depends(get_db), user: _User = Depends(_gcu),
):
    uid = str(user.id)
    out = await srs.due_queue(db, uid, limit=limit, include_overdue=include_overdue)
    out["user_id"] = uid
    return out


@router.get("/api/review/upcoming/me")
async def review_upcoming_me(
    days: int = 7, limit: int = 50,
    db: AsyncSession = Depends(get_db), user: _User = Depends(_gcu),
):
    return await srs.upcoming(db, str(user.id), days=days, limit=limit)


@router.get("/api/path/next-best/me")
async def next_best_me(
    limit: int = 5, mastery_floor: float = 0.85,
    db: AsyncSession = Depends(get_db), user: _User = Depends(_gcu),
):
    return await nbl.next_best(db, str(user.id), limit=limit, mastery_floor=mastery_floor)


@router.get("/api/passport/me")
async def passport_me(db: AsyncSession = Depends(get_db), user: _User = Depends(_gcu)):
    return await passport.build_passport(db, str(user.id))


# ── 6. Today feed — the pedagogy assembler ────────────────────────────────
# One composed daily unit per the content-layer design: 1 prereq-gated
# lesson + the review dose (target 10) + streak + caps.  Every section
# degrades independently — a section that fails is simply absent, never
# faked.  Visual placement (doodle card, sim, diagram) is resolved by the
# today surface from static assets; this endpoint stays data-only.
import logging as _logging
from datetime import date as _date
from typing import Any as _Any, Dict as _Dict

_feed_log = _logging.getLogger(__name__)


def _node_title(node_id: str | None) -> str | None:
    """Best-effort title from the in-memory corpus index; None when the
    node is unknown (the surface then shows the reason line instead)."""
    if not node_id:
        return None
    try:
        from backend.services.enhanced_nodes import load_index

        nodes = getattr(load_index(), "nodes", None) or {}
        node = nodes.get(node_id)
        if isinstance(node, dict):
            return node.get("title") or None
    except Exception:  # index not warm yet — honest absence
        return None
    return None


@router.get("/api/feed/today")
async def feed_today(
    db: AsyncSession = Depends(get_db), user: _User = Depends(_gcu),
):
    uid = str(user.id)
    out: _Dict[str, _Any] = {"date": _date.today().isoformat()}

    try:
        nb = await nbl.next_best(db, uid, limit=3, mastery_floor=0.85)
        lesson = (nb.get("ready_to_learn") or [None])[0]
        if lesson:
            lesson["title"] = _node_title(lesson.get("node_id"))
        repair = (nb.get("repair_first") or [])[:2]
        for entry in repair:
            entry["title"] = _node_title(entry.get("node_id"))
        out["lesson"] = lesson
        out["repair_first"] = repair
    except Exception as exc:
        _feed_log.warning("feed lesson section skipped: %s", exc)

    try:
        dq = await srs.due_queue(db, uid, limit=10)
        items = dq.get("items", [])
        for item in items:
            item["title"] = _node_title(item.get("node_id")) or item.get("concept_name")
        out["review"] = {"due_count": dq.get("due_count", 0),
                         "items": items, "target": 10}
    except Exception as exc:
        _feed_log.warning("feed review section skipped: %s", exc)

    try:
        from backend.services.streak_state import classify_streak

        out["streak"] = classify_streak(
            getattr(user, "streak_days", None),
            getattr(user, "last_activity_date", None),
        )
    except Exception as exc:
        _feed_log.warning("feed streak section skipped: %s", exc)

    out["caps"] = {"lesson": 1, "review": 10, "sandbox": 1}
    return out
