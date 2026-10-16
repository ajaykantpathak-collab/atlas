"""learning_upgrades router — the five platform upgrades in one router:

  /api/analytics/misconceptions/*  — Misconception Analytics (heatmap,
                                     student profile, remediation bundles)
  /api/review/*                    — Spaced Repetition daily driver
                                     (due queue, upcoming, SM-2 grading)
  /api/path/next-best/{user_id}    — Adaptive Next-Best-Lesson engine
  /api/examiner/grade              — Examiner Mode (grade against the
                                     node's authored MARKING_POINTS)
  /api/passport/{user_id}          — Mastery Passport transcript

Pillar-6 contract fixes:
  * The token-derived ``/me`` variants are registered BEFORE the
    ``/{user_id}`` variants.  FastAPI matches routes in registration order,
    so ``GET /api/review/queue/me`` previously matched ``/{user_id}`` with
    ``user_id="me"``, crashed the UUID bind (ValueError → 500) and the
    ``/me`` handlers were dead code.
  * Per-user routes now carry the B16 ownership guard
    (``require_self_or_staff``): a student token can only read its own
    review queue / passport / next-best path; teacher/admin any.
  * ``POST /api/review/grade`` is authenticated and rejects grading for a
    foreign user_id (inline body check, same pattern as
    api.intelligence.record_confidence).
"""
import re as _re
import uuid
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user, is_staff, require_self_or_staff
from backend.models.user import User
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
    user: User = Depends(get_current_user),
):
    """Whole-school trap heatmap — staff-only (aggregates across students)."""
    if not is_staff(user):
        raise HTTPException(status_code=403, detail="Teacher or admin role required")
    return await ma.trap_heatmap(db, days=days, student_id=student_id, limit=limit)


@router.get("/api/analytics/misconceptions/student/{student_id}")
async def student_misconception_profile(
    student_id: str,
    scoped_student_id: str = Depends(require_self_or_staff),
    db: AsyncSession = Depends(get_db),
):
    return await ma.student_trap_profile(db, scoped_student_id)


class BundleBody(BaseModel):
    student_ids: List[str]
    min_students: int = 2


@router.post("/api/analytics/misconceptions/remediation-bundle")
async def remediation_bundle(
    body: BundleBody,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Class-level remediation bundles — staff-only."""
    if not is_staff(user):
        raise HTTPException(status_code=403, detail="Teacher or admin role required")
    return await ma.class_remediation_bundle(
        db, body.student_ids, min_students=body.min_students)


# ── 2. Spaced Repetition Review Engine ────────────────────────────────────
# NOTE: the ``/me`` routes MUST be declared before the ``/{user_id}`` routes —
# FastAPI resolves in registration order and a literal after a path parameter
# is unreachable (the parameter swallows "me").

@router.get("/api/review/queue/me")
async def review_queue_me(
    limit: int = 20, include_overdue: bool = True,
    db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user),
):
    uid = str(user.id)
    out = await srs.due_queue(db, uid, limit=limit, include_overdue=include_overdue)
    out["user_id"] = uid
    return out


@router.get("/api/review/upcoming/me")
async def review_upcoming_me(
    days: int = 7, limit: int = 50,
    db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user),
):
    return await srs.upcoming(db, str(user.id), days=days, limit=limit)


@router.get("/api/review/queue/{student_id}")
async def review_queue(
    student_id: str,
    limit: int = 20, include_overdue: bool = True,
    scoped_user_id: str = Depends(require_self_or_staff),
    db: AsyncSession = Depends(get_db),
):
    return await srs.due_queue(db, scoped_user_id, limit=limit,
                               include_overdue=include_overdue)


@router.get("/api/review/upcoming/{student_id}")
async def review_upcoming(
    student_id: str,
    days: int = 7, limit: int = 50,
    scoped_user_id: str = Depends(require_self_or_staff),
    db: AsyncSession = Depends(get_db),
):
    return await srs.upcoming(db, scoped_user_id, days=days, limit=limit)


class GradeBody(BaseModel):
    # UUID-typed on purpose: apply_grade() seeds a ReviewItem row under this
    # id, so a malformed user_id must be rejected at validation time (422),
    # not crash the GUID bind (500) or reach an INSERT.
    user_id: uuid.UUID
    node_id: str
    quality: int  # 0-5 SM-2 grade


@router.post("/api/review/grade")
async def review_grade(
    body: GradeBody,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Apply an SM-2 grade. The body carries user_id, so the ownership check
    is inline: self or staff only."""
    if not is_staff(user) and str(body.user_id) != str(user.id):
        raise HTTPException(status_code=403, detail="Not authorized for this student record")
    return await srs.apply_grade(db, body.user_id, body.node_id, body.quality)


# ── 3. Adaptive Next-Best-Lesson ──────────────────────────────────────────
@router.get("/api/path/next-best/me")
async def next_best_me(
    limit: int = 5, mastery_floor: float = 0.85,
    db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user),
):
    return await nbl.next_best(db, str(user.id), limit=limit, mastery_floor=mastery_floor)


@router.get("/api/path/next-best/{student_id}")
async def next_best(
    student_id: str,
    limit: int = 5, mastery_floor: float = 0.85,
    scoped_user_id: str = Depends(require_self_or_staff),
    db: AsyncSession = Depends(get_db),
):
    return await nbl.next_best(db, scoped_user_id, limit=limit, mastery_floor=mastery_floor)


# ── 4. Examiner Mode ──────────────────────────────────────────────────────
class ExaminerBody(BaseModel):
    node_id: str
    student_text: str = ""
    image_text: str = ""  # OCR/vision-extracted text from the photo, if any


@router.post("/api/examiner/grade")
async def examiner_grade(
    body: ExaminerBody, user: User = Depends(get_current_user),
):
    return examiner.grade_answer(
        body.node_id, body.student_text, image_text=body.image_text or None)


# ── 5. Mastery Passport ───────────────────────────────────────────────────
@router.get("/api/passport/me")
async def passport_me(db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    return await passport.build_passport(db, str(user.id))


@router.get("/api/passport/{student_id}")
async def mastery_passport(
    student_id: str,
    scoped_user_id: str = Depends(require_self_or_staff),
    db: AsyncSession = Depends(get_db),
):
    return await passport.build_passport(db, scoped_user_id)

# ── 4b. Examiner Mode — photo input (vision extraction → grade) ──────────
class ExaminerImageBody(BaseModel):
    node_id: str
    image: str  # base64 or data-url photo of the handwritten answer


@router.post("/api/examiner/grade-image")
async def examiner_grade_image(
    body: ExaminerImageBody, user: User = Depends(get_current_user),
):
    """Photo of handwritten answer → OCR/vision extraction → graded against
    the node's authored MARKING_POINTS. One round trip; falls back honestly
    when the vision key/config is missing."""
    extracted_text = ""
    source = "none"
    try:
        from backend.services.vision_extract import (
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
    db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user),
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
            label = _node_title(item.get("node_id")) or item.get("concept_name")
            # Stored concept_name can be a raw corpus code ("ch08") or the
            # node id itself (first-review seed stores node_id verbatim) —
            # never student-facing. Bare chapter codes become "Chapter N";
            # full node ids parse to their chapter; anything else drops.
            if label:
                lab = str(label).strip()
                if _re.fullmatch(r"ch\d{1,3}", lab):
                    label = f"Chapter {int(lab[2:])}"
                elif _re.fullmatch(r"c\d{1,2}_[a-z_]+_(cbse|icse|isc)_\d{2}_\d{3}", lab):
                    label = f"Chapter {int(lab.rsplit('_', 2)[-2])}"
                elif _re.fullmatch(r"c\d{1,2}_[a-z_0-9]+", lab):
                    label = None  # id-shaped label — better the reason line
            item["title"] = label
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
