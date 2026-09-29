"""Teacher API Router — wires frontend services/teacher.service.ts to existing backends.

Contract (response shapes match teacher.service.ts types exactly):

  GET  /api/teacher/classes?teacherId=&page=&pageSize=      -> PaginatedResponse<Class>
  GET  /api/teacher/classes/{class_id}/students             -> Student[]
  GET  /api/teacher/classes/{class_id}/progress             -> ClassProgress
  GET  /api/teacher/assignments?classId=                    -> assignment summaries
  POST /api/teacher/assignments                             -> {assignmentId}
  GET  /api/teacher/worksheets?teacherId=                   -> WorksheetSummary[]
  POST /api/teacher/worksheets                              -> Worksheet
  GET  /api/teacher/worksheets/{worksheet_id}               -> Worksheet
  GET  /api/teacher/worksheets/{worksheet_id}/performance   -> ClassPerformance
  GET  /api/teacher/worksheets/{worksheet_id}/printable     -> {html, css}
  POST /api/teacher/worksheets/{worksheet_id}/send-whatsapp -> SendWorksheetResponse

Storage:
  - classes      -> TeacherClassModel      (services/auth_service.py, table teacher_classes — pre-existing)
  - students     -> UserModel              (models/user.py, table users — pre-existing)
  - enrollment   -> ClassEnrollmentModel   (this module, table class_enrollments — NEW, created on demand)
  - assignments  -> ClassAssignmentModel   (this module, table class_assignments — NEW, created on demand)
  - worksheets   -> WorksheetService       (services/worksheet_service.py, tables worksheets /
                  worksheet_distributions / worksheet_submissions — created on demand)

Demo seeding note: the demo login (demo@dreamapp.in) doubles as the demo teacher;
seed_teacher_parent_demo.py inserts teacher_classes rows owned by that user id.
"""

from __future__ import annotations

import asyncio
import logging
import uuid
from datetime import datetime, timedelta, timezone
from math import ceil
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, Text, func, select
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.ext.asyncio import AsyncSession

# `database` (package) is the Base/engine used by worksheet_service; the
# backend/__init__.py sys.path bootstrap guarantees it is importable.
from database import get_db

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/teacher", tags=["teacher"])

# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
from backend.services.auth_service import TeacherClassModel  # noqa: E402
from backend.models.user import User as UserModel  # noqa: E402
from backend.deps import get_current_user_optional  # noqa: E402


async def _optional_user(user=Depends(get_current_user_optional)):
    return user


async def _require_staff(user=Depends(get_current_user_optional)):
    """Teacher-surface guard (B15): anonymous -> 401, non-teacher roles
    (student/parent) -> 403, teacher/admin -> pass through."""
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    if str(getattr(user, "role", "") or "").strip().lower() not in ("teacher", "admin"):
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail="Teacher or admin role required")
    return user


try:
    import services.worksheet_service as wss  # noqa: E402

    _HAS_WORKSHEETS = True
except Exception as _exc:  # pragma: no cover
    logger.warning("worksheet_service unavailable: %s", _exc)
    wss = None  # type: ignore
    _HAS_WORKSHEETS = False

# Enrollment + assignment tables live on the worksheet_service Base so a single
# create_all covers worksheets + distributions + submissions + enrollments.
if _HAS_WORKSHEETS:
    from database import Base as WorksheetBase

    class ClassEnrollmentModel(WorksheetBase):
        """Student ↔ class roster row (teacher_classes.id ↔ users.id)."""

        __tablename__ = "class_enrollments"

        id: uuid.UUID = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
        class_id: uuid.UUID = Column(
            PG_UUID(as_uuid=True),
            ForeignKey("teacher_classes.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        )
        student_id: uuid.UUID = Column(
            PG_UUID(as_uuid=True),
            ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        )
        roll_number: Optional[int] = Column(Integer, nullable=True)
        created_at: datetime = Column(
            DateTime(timezone=True), server_default=func.now(), nullable=False
        )

    class ClassAssignmentModel(WorksheetBase):
        """A worksheet assigned to a class as homework."""

        __tablename__ = "class_assignments"

        id: uuid.UUID = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
        class_id: uuid.UUID = Column(
            PG_UUID(as_uuid=True),
            ForeignKey("teacher_classes.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        )
        worksheet_id: uuid.UUID = Column(
            PG_UUID(as_uuid=True),
            ForeignKey("worksheets.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        )
        due_date: Optional[datetime] = Column(DateTime(timezone=True), nullable=True)
        allow_late: bool = Column(Boolean, nullable=False, server_default="true")
        note: Optional[str] = Column(Text, nullable=True)
        created_at: datetime = Column(
            DateTime(timezone=True), server_default=func.now(), nullable=False
        )

_tables_ready = False
_ensure_lock = asyncio.Lock()


async def _ensure_tables(db: AsyncSession) -> None:
    """CREATE TABLE IF NOT EXISTS for worksheets + enrollments + assignments."""
    global _tables_ready
    if not _HAS_WORKSHEETS or _tables_ready:
        return
    async with _ensure_lock:
        if _tables_ready:
            return
        from database import engine

        async with engine.begin() as conn:
            await conn.run_sync(WorksheetBase.metadata.create_all)
        _tables_ready = True


# ---------------------------------------------------------------------------
# Response mapping helpers (TS contract shapes)
# ---------------------------------------------------------------------------

DEFAULT_PRINT_CSS = """
body { font-family: Georgia, 'Times New Roman', serif; margin: 24px; color: #111; }
.worksheet-header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 8px; margin-bottom: 16px; }
.question { page-break-inside: avoid; margin-bottom: 14px; }
.options { margin: 6px 0 0 16px; }
@media print { @page { margin: 18mm; } }
"""


def _worksheet_to_ts(
    detail: Any,
    *,
    grade: Optional[int],
    chapter: Optional[str],
    description: Optional[str],
    language: str,
) -> dict[str, Any]:
    """Map worksheet_service WorksheetDetail/CreateWorksheetResponse → TS Worksheet."""
    ws_id = str(detail.worksheet_id)
    questions = []
    for q in detail.questions:
        questions.append(
            {
                "id": f"{ws_id}-q{q.index}",
                "type": "multiple_choice" if q.options else "short_answer",
                "prompt": q.text,
                "options": q.options,
                "correctAnswer": q.answer if q.answer is not None else "",
                "marks": q.marks,
                "hints": [],
            }
        )
    status_map = {
        "draft": "draft",
        "sent": "published",
        "partial": "published",
        "complete": "published",
        "archived": "archived",
    }
    created = detail.created_at.isoformat() if detail.created_at else datetime.now(timezone.utc).isoformat()
    return {
        "id": ws_id,
        "title": detail.title,
        "description": description or "",
        "subject": detail.subject,
        "grade": grade or 0,
        "chapter": chapter,
        "difficulty": detail.difficulty,
        "status": status_map.get(detail.status, "draft"),
        "language": language,
        "questions": questions,
        "totalMarks": detail.total_points,
        "createdBy": str(getattr(detail, "teacher_id", "") or ""),
        "createdAt": created,
        "updatedAt": created,
    }


def _score_pct(score: Optional[float], max_score: float) -> Optional[float]:
    if score is None:
        return None
    if max_score and max_score > 0 and score <= max_score:
        return round(score / max_score * 100, 1)
    return round(score, 1)


async def _resolve_teacher(db: AsyncSession, teacher_id: str, user: Any = None) -> Optional[uuid.UUID]:
    """Resolve the ?teacherId= param. 'me'/empty → current auth user; unknown → None."""
    if teacher_id and teacher_id != "me":
        try:
            return uuid.UUID(teacher_id)
        except ValueError:
            return None
    if user is not None:
        return user.id
    return None


async def _class_grade(db: AsyncSession, class_id: uuid.UUID) -> int:
    """Most-common class_level among enrolled students (0 if unknown)."""
    rows = (
        await db.execute(
            select(UserModel.class_level, func.count())
            .join(ClassEnrollmentModel, ClassEnrollmentModel.student_id == UserModel.id)
            .where(ClassEnrollmentModel.class_id == class_id)
            .group_by(UserModel.class_level)
        )
    ).all()
    if not rows:
        return 0
    rows.sort(key=lambda r: r[1], reverse=True)
    return rows[0][0] or 0


async def _worksheet_grade(topic_ids: Any) -> int:
    """Grade is stored as topic_ids[0] == 'grade:<n>' at creation time."""
    if isinstance(topic_ids, list) and topic_ids:
        first = str(topic_ids[0])
        if first.startswith("grade:"):
            try:
                return int(first[6:])
            except ValueError:
                return 0
    return 0


def _require_worksheets() -> None:
    if not _HAS_WORKSHEETS:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="worksheet_service not importable in this deployment",
        )


# ---------------------------------------------------------------------------
# Classes
# ---------------------------------------------------------------------------

@router.get("/classes")
async def list_classes(
    teacherId: str = Query("me"),
    page: int = Query(1, ge=1),
    pageSize: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    user: Any = Depends(_require_staff),
):
    await _ensure_tables(db)
    tid = await _resolve_teacher(db, teacherId, user)
    if tid is None:
        return {"data": [], "meta": {"page": page, "pageSize": pageSize, "totalItems": 0, "totalPages": 1}}
    rows = (
        await db.execute(
            select(TeacherClassModel)
            .where(TeacherClassModel.teacher_id == tid)
            .order_by(TeacherClassModel.created_at)
        )
    ).scalars().all()

    counts = dict(
        (
            await db.execute(
                select(ClassEnrollmentModel.class_id, func.count()).group_by(ClassEnrollmentModel.class_id)
            )
        ).all()
    )

    data = []
    for c in rows:
        grade = await _class_grade(db, c.id)
        data.append(
            {
                "id": str(c.id),
                "name": c.class_name,
                "grade": grade,
                "section": c.section or "A",
                "subject": c.subject or "",
                "studentCount": int(counts.get(c.id, 0)),
                "academicYear": c.academic_year or "",
                "isActive": True,
            }
        )
    total = len(data)
    start = (page - 1) * pageSize
    return {
        "data": data[start : start + pageSize],
        "meta": {
            "page": page,
            "pageSize": pageSize,
            "totalItems": total,
            "totalPages": max(1, ceil(total / pageSize)) if total else 1,
        },
    }


async def _get_class_or_404(db: AsyncSession, class_id: str) -> TeacherClassModel:
    try:
        cid = uuid.UUID(class_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Class not found")
    row = (
        await db.execute(select(TeacherClassModel).where(TeacherClassModel.id == cid))
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Class not found")
    return row


@router.get("/classes/{class_id}/students")
async def list_students(class_id: str, db: AsyncSession = Depends(get_db), user: Any = Depends(_require_staff)):
    await _ensure_tables(db)
    cls = await _get_class_or_404(db, class_id)
    rows = (
        await db.execute(
            select(ClassEnrollmentModel, UserModel)
            .join(UserModel, UserModel.id == ClassEnrollmentModel.student_id)
            .where(ClassEnrollmentModel.class_id == cls.id)
            .order_by(ClassEnrollmentModel.roll_number, UserModel.name)
        )
    ).all()
    students = []
    for i, (enr, stu) in enumerate(rows, start=1):
        full = (stu.name or "").strip()
        parts = full.split(" ", 1)
        first = parts[0] or full or f"Student {i}"
        last = parts[1] if len(parts) > 1 else ""
        students.append(
            {
                "id": str(stu.id),
                "firstName": first,
                "lastName": last,
                "rollNumber": str(enr.roll_number) if enr.roll_number else str(i),
                "email": stu.email,
                "phoneNumber": stu.phone_number,
                "whatsappNumber": stu.phone_number,
                "parentWhatsAppNumber": None,
                "avatarUrl": stu.avatar_url,
            }
        )
    return students


@router.get("/classes/{class_id}/progress")
async def class_progress(class_id: str, db: AsyncSession = Depends(get_db), user: Any = Depends(_require_staff)):
    await _ensure_tables(db)
    _require_worksheets()
    cls = await _get_class_or_404(db, class_id)

    student_count = (
        await db.execute(
            select(func.count()).select_from(ClassEnrollmentModel).where(
                ClassEnrollmentModel.class_id == cls.id
            )
        )
    ).scalar() or 0

    worksheets = (
        await db.execute(
            select(wss.Worksheet)
            .where(wss.Worksheet.class_id == cls.id)
            .order_by(wss.Worksheet.created_at)
        )
    ).scalars().all()
    ws_ids = [w.id for w in worksheets]

    submissions: list[Any] = []
    if ws_ids:
        submissions = (
            await db.execute(
                select(wss.WorksheetSubmission).where(
                    wss.WorksheetSubmission.worksheet_id.in_(ws_ids)
                )
            )
        ).scalars().all()

    total_assigned = len(worksheets)
    completed = sum(1 for s in submissions if s.submitted_at is not None)
    denom = max(1, total_assigned * max(1, student_count))
    overall_rate = round(completed / denom * 100, 1)

    scored = [
        _score_pct(s.score, s.max_score)
        for s in submissions
        if s.submitted_at is not None and s.max_score
    ]
    scored = [x for x in scored if x is not None]
    avg_score = round(sum(scored) / len(scored), 1) if scored else 0

    # (trend is computed below from REAL practice events only — weeks with no
    # activity are omitted, so the API never emits generated zero-dates.)

    # per-subject breakdown
    sub_map: dict[str, list[Any]] = {}
    for w in worksheets:
        sub_map.setdefault(w.subject, []).append(w.id)
    subject_breakdown = []
    for subject, ids in sub_map.items():
        subs = [s for s in submissions if s.worksheet_id in ids]
        scores = [_score_pct(s.score, s.max_score) for s in subs if s.max_score and s.submitted_at]
        scores = [x for x in scores if x is not None]
        subject_breakdown.append(
            {
                "subject": subject,
                "completionRate": round(len(subs) / max(1, len(ids) * max(1, student_count)) * 100, 1),
                "averageScore": round(sum(scores) / len(scores), 1) if scores else 0,
            }
        )

    # ── Real per-student mastery + practice activity ──
    # Mastery reads the SAME store the student-facing dashboard reads
    # (mastery_records — see api/dashboard.py _get_service_progress), so a
    # teacher's numbers can never contradict what the student sees; the
    # practice→mastery pipeline writes it. Practice activity counts read the
    # real activity_log rows written by practice submissions. A student with
    # no records carries mastery=None — the UI renders an honest "no data
    # yet" state instead of a fabricated zero or a fabricated "struggling"
    # flag.
    enrolled_rows = (
        await db.execute(
            select(ClassEnrollmentModel.student_id, UserModel.name)
            .join(UserModel, UserModel.id == ClassEnrollmentModel.student_id)
            .where(ClassEnrollmentModel.class_id == cls.id)
            .order_by(ClassEnrollmentModel.roll_number, UserModel.name)
        )
    ).all()
    roster = [(str(sid), (name or "").strip()) for sid, name in enrolled_rows]
    student_uuids = [uuid.UUID(sid) for sid, _ in roster]

    mastery_by_student: dict[str, float] = {}
    try:
        from backend.models.progress import MasteryRecord

        if student_uuids:
            mrows = (
                await db.execute(
                    select(
                        MasteryRecord.user_id,
                        func.avg(MasteryRecord.mastery_probability),
                    )
                    .where(MasteryRecord.user_id.in_(student_uuids))
                    .group_by(MasteryRecord.user_id)
                )
            ).all()
            for uid, avg_p in mrows:
                if avg_p is not None:
                    mastery_by_student[str(uid)] = round(float(avg_p) * 100.0, 1)
    except Exception as exc:
        logger.warning("teacher class-progress: mastery read failed: %s", exc)

    activity_by_student: dict[str, dict[str, Any]] = {}
    act_rows: list[Any] = []
    try:
        from backend.models.progress import ActivityLog

        if student_uuids:
            act_rows = (
                await db.execute(
                    select(ActivityLog)
                    .where(
                        ActivityLog.user_id.in_(student_uuids),
                        ActivityLog.activity_type == "quiz",
                    )
                    .order_by(ActivityLog.created_at)
                )
            ).scalars().all()
            for row in act_rows:
                sid = str(row.user_id)
                agg = activity_by_student.setdefault(
                    sid, {"attempts": 0, "correct": 0, "last": None}
                )
                agg["attempts"] += 1
                if str(row.score or "").strip().lower() == "correct":
                    agg["correct"] += 1
                if row.created_at is not None:
                    ts = row.created_at
                    if ts.tzinfo is None:
                        ts = ts.replace(tzinfo=timezone.utc)
                    if agg["last"] is None or ts > agg["last"]:
                        agg["last"] = ts
    except Exception as exc:
        logger.warning("teacher class-progress: activity read failed: %s", exc)

    per_student: list[dict[str, Any]] = []
    mastery_values: list[float] = []
    practice_attempts_total = 0
    practice_correct_total = 0
    for sid, name in roster:
        avg_pct = mastery_by_student.get(sid)
        act = activity_by_student.get(sid, {"attempts": 0, "correct": 0, "last": None})
        if avg_pct is not None:
            mastery_values.append(avg_pct)
        practice_attempts_total += int(act["attempts"])
        practice_correct_total += int(act["correct"])
        per_student.append(
            {
                "studentId": sid,
                "name": name,
                "mastery": avg_pct,  # None = no mastery data yet (honest)
                "practiceAttempts": int(act["attempts"]),
                "practiceCorrect": int(act["correct"]),
                "lastActivityAt": act["last"].isoformat() if act["last"] else None,
            }
        )

    average_mastery = (
        round(sum(mastery_values) / len(mastery_values), 1) if mastery_values else None
    )

    # Weekly trend built ONLY from real practice events. Weeks with no
    # activity are omitted entirely; an empty array means "no data yet" —
    # never a fabricated flat line of generated dates.
    trend: list[dict[str, Any]] = []
    if act_rows:
        buckets: dict[str, dict[str, int]] = {}
        for row in act_rows:
            ts = row.created_at
            if ts.tzinfo is None:
                ts = ts.replace(tzinfo=timezone.utc)
            week_start = (
                (ts - timedelta(days=ts.weekday()))
                .replace(hour=0, minute=0, second=0, microsecond=0)
            )
            key = week_start.date().isoformat()
            b = buckets.setdefault(key, {"attempts": 0, "correct": 0})
            b["attempts"] += 1
            if str(row.score or "").strip().lower() == "correct":
                b["correct"] += 1
        for key in sorted(buckets.keys())[-6:]:
            b = buckets[key]
            trend.append(
                {
                    "date": key,
                    "attempts": b["attempts"],
                    "accuracy": round(b["correct"] / b["attempts"] * 100, 1)
                    if b["attempts"]
                    else 0.0,
                }
            )

    has_data = bool(
        submissions
        or mastery_values
        or practice_attempts_total
        or total_assigned
    )

    return {
        "classId": str(cls.id),
        "className": cls.class_name,
        "totalWorksheetsAssigned": total_assigned,
        "totalWorksheetsCompleted": completed,
        "overallCompletionRate": overall_rate,
        "averageScore": avg_score,
        "hasData": has_data,
        "averageMastery": average_mastery,  # None = no mastery recorded yet
        "practiceAttempts": practice_attempts_total,
        "practiceCorrect": practice_correct_total,
        "students": per_student,
        "trend": trend,
        "subjectBreakdown": subject_breakdown,
    }


# ---------------------------------------------------------------------------
# Assignments
# ---------------------------------------------------------------------------

class AssignHomeworkBody(BaseModel):
    classId: str
    worksheetId: str
    dueDate: Optional[str] = None
    allowLateSubmission: bool = True
    notifyViaWhatsApp: Optional[bool] = False
    note: Optional[str] = None


@router.post("/assignments")
async def assign_homework(body: AssignHomeworkBody, db: AsyncSession = Depends(get_db), user: Any = Depends(_require_staff)):
    await _ensure_tables(db)
    _require_worksheets()
    try:
        cid = uuid.UUID(body.classId)
        wid = uuid.UUID(body.worksheetId)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid classId/worksheetId")
    ws = (await db.execute(select(wss.Worksheet).where(wss.Worksheet.id == wid))).scalar_one_or_none()
    if ws is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Worksheet not found")
    cls = (
        await db.execute(select(TeacherClassModel).where(TeacherClassModel.id == cid))
    ).scalar_one_or_none()
    if cls is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Class not found")
    due = None
    if body.dueDate:
        try:
            due = datetime.fromisoformat(body.dueDate.replace("Z", "+00:00"))
        except ValueError:
            due = None
    row = ClassAssignmentModel(
        class_id=cid,
        worksheet_id=wid,
        due_date=due,
        allow_late=body.allowLateSubmission,
        note=body.note,
    )
    db.add(row)
    await db.flush()
    return {"assignmentId": str(row.id)}


@router.get("/assignments")
async def list_assignments(classId: Optional[str] = Query(None), db: AsyncSession = Depends(get_db), user: Any = Depends(_require_staff)):
    await _ensure_tables(db)
    _require_worksheets()
    stmt = select(ClassAssignmentModel).order_by(ClassAssignmentModel.created_at.desc())
    if classId:
        try:
            stmt = stmt.where(ClassAssignmentModel.class_id == uuid.UUID(classId))
        except ValueError:
            pass
    rows = (await db.execute(stmt.limit(100))).scalars().all()
    return [
        {
            "id": str(r.id),
            "classId": str(r.class_id),
            "worksheetId": str(r.worksheet_id),
            "dueDate": r.due_date.isoformat() if r.due_date else None,
            "allowLateSubmission": r.allow_late,
            "note": r.note,
            "createdAt": r.created_at.isoformat() if r.created_at else None,
        }
        for r in rows
    ]


# ---------------------------------------------------------------------------
# Worksheets (thin wrap of worksheet_service)
# ---------------------------------------------------------------------------

class CreateWorksheetBody(BaseModel):
    title: str
    description: Optional[str] = None
    subject: str
    grade: Optional[int] = None
    chapter: Optional[str] = None
    difficulty: str = "medium"
    language: str = "en"
    questions: list[dict[str, Any]] = []


@router.get("/worksheets")
async def list_worksheets(
    teacherId: str = Query("me"),
    db: AsyncSession = Depends(get_db),
    user: Any = Depends(_require_staff),
):
    await _ensure_tables(db)
    _require_worksheets()
    tid = await _resolve_teacher(db, teacherId, user)
    stmt = select(wss.Worksheet).order_by(wss.Worksheet.created_at.desc()).limit(100)
    if tid is not None:
        stmt = stmt.where(wss.Worksheet.teacher_id == tid)
    rows = (await db.execute(stmt)).scalars().all()
    out = []
    for w in rows:
        assigned = (
            await db.execute(
                select(func.count()).select_from(wss.WorksheetDistribution).where(
                    wss.WorksheetDistribution.worksheet_id == w.id
                )
            )
        ).scalar() or 0
        completed = (
            await db.execute(
                select(func.count()).select_from(wss.WorksheetSubmission).where(
                    wss.WorksheetSubmission.worksheet_id == w.id
                )
            )
        ).scalar() or 0
        out.append(
            {
                "id": str(w.id),
                "title": w.title or w.subject,
                "subject": w.subject,
                "grade": await _worksheet_grade(w.topic_ids),
                "difficulty": w.difficulty,
                "status": "published" if w.status in ("sent", "partial", "complete") else w.status,
                "totalMarks": w.total_points,
                "assignedCount": int(assigned),
                "completedCount": int(completed),
                "averageScore": 0,
                "createdAt": w.created_at.isoformat() if w.created_at else None,
            }
        )
    return out


@router.post("/worksheets")
async def create_worksheet(
    body: CreateWorksheetBody,
    db: AsyncSession = Depends(get_db),
    user: Any = Depends(_require_staff),
):
    await _ensure_tables(db)
    _require_worksheets()
    tid = await _resolve_teacher(db, "me", user)
    if tid is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Teacher identity required")
    # class_id is NOT NULL on the worksheets table; anchor to the teacher's
    # first class (or a nil UUID when the teacher has none yet).
    first_class = (
        await db.execute(
            select(TeacherClassModel).where(TeacherClassModel.teacher_id == tid).limit(1)
        )
    ).scalar_one_or_none()
    cid = first_class.id if first_class else uuid.UUID(int=0)

    difficulty = body.difficulty if body.difficulty in ("easy", "medium", "hard") else "medium"
    try:
        svc = wss.WorksheetService(db)
        resp = await svc.create_worksheet(
            teacher_id=tid,
            class_id=cid,
            subject=body.subject,
            topic_ids=[f"grade:{body.grade or 0}", body.chapter or body.subject],
            num_questions=max(1, min(30, len(body.questions) or 10)),
            difficulty=difficulty,
            title=body.title,
        )
        await db.commit()
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
    except Exception as exc:  # generator fallbacks should prevent this, but stay honest
        logger.exception("worksheet creation failed")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Worksheet creation failed")
    return _worksheet_to_ts(
        resp,
        grade=body.grade,
        chapter=body.chapter,
        description=body.description,
        language=body.language,
    )


async def _get_detail(db: AsyncSession, worksheet_id: str, for_student: bool = False) -> Any:
    _require_worksheets()
    try:
        wid = uuid.UUID(worksheet_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Worksheet not found")
    try:
        return await wss.WorksheetService(db).get_worksheet(wid, for_student=for_student)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Worksheet not found")


@router.get("/worksheets/{worksheet_id}")
async def get_worksheet(worksheet_id: str, db: AsyncSession = Depends(get_db), user: Any = Depends(_require_staff)):
    await _ensure_tables(db)
    detail = await _get_detail(db, worksheet_id)
    ws_row = (
        await db.execute(select(wss.Worksheet).where(wss.Worksheet.id == detail.worksheet_id))
    ).scalar_one_or_none()
    return _worksheet_to_ts(
        detail,
        grade=await _worksheet_grade(ws_row.topic_ids) if ws_row else 0,
        chapter=(
            ws_row.topic_ids[1]
            if ws_row and isinstance(ws_row.topic_ids, list) and len(ws_row.topic_ids) > 1
            else None
        ),
        description=None,
        language="en",
    )


@router.get("/worksheets/{worksheet_id}/performance")
async def worksheet_performance(worksheet_id: str, db: AsyncSession = Depends(get_db), user: Any = Depends(_require_staff)):
    await _ensure_tables(db)
    _require_worksheets()
    try:
        wid = uuid.UUID(worksheet_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Worksheet not found")
    try:
        perf = await wss.WorksheetService(db).get_class_performance(wid)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Worksheet not found")

    pcts = []
    per_student = []
    for s in perf.per_student:
        pct = _score_pct(s.score, s.max_score) if s.max_score else None
        if pct is not None and s.submitted_at is not None:
            pcts.append(pct)
        per_student.append(
            {
                "studentId": str(s.student_id),
                "studentName": s.student_name,
                "score": pct,
                "submittedAt": s.submitted_at.isoformat() if s.submitted_at else None,
                "timeSpentMinutes": None,
            }
        )
    pcts_sorted = sorted(pcts)
    n = len(pcts_sorted)
    median = (
        round(
            pcts_sorted[n // 2] if n % 2 else (pcts_sorted[n // 2 - 1] + pcts_sorted[n // 2]) / 2,
            1,
        )
        if n
        else 0
    )
    buckets = {"0-20": 0, "21-40": 0, "41-60": 0, "61-80": 0, "81-100": 0}
    for p in pcts:
        if p <= 20:
            buckets["0-20"] += 1
        elif p <= 40:
            buckets["21-40"] += 1
        elif p <= 60:
            buckets["41-60"] += 1
        elif p <= 80:
            buckets["61-80"] += 1
        else:
            buckets["81-100"] += 1
    total = max(1, perf.total_students)
    return {
        "worksheetId": str(perf.worksheet_id),
        "totalStudents": perf.total_students,
        "submittedCount": perf.completed_count,
        "pendingCount": perf.pending_count,
        "averageScore": round(perf.average_score, 1) if perf.average_score is not None else 0,
        "medianScore": median,
        "highestScore": round(perf.highest_score, 1) if perf.highest_score is not None else 0,
        "lowestScore": round(perf.lowest_score, 1) if perf.lowest_score is not None else 0,
        "scoreDistribution": buckets,
        "completionRate": round(perf.completed_count / total * 100, 1),
        "perStudent": per_student,
    }


@router.get("/worksheets/{worksheet_id}/printable")
async def worksheet_printable(worksheet_id: str, db: AsyncSession = Depends(get_db), user: Any = Depends(_require_staff)):
    await _ensure_tables(db)
    try:
        wid = uuid.UUID(worksheet_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Worksheet not found")
    try:
        printable = await wss.WorksheetService(db).generate_printable(wid)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Worksheet not found")
    return {"html": printable.combined_html, "css": DEFAULT_PRINT_CSS}


class SendWorksheetBody(BaseModel):
    recipientIds: list[str] = []
    message: Optional[str] = None


@router.post("/worksheets/{worksheet_id}/send-whatsapp")
async def send_worksheet_whatsapp(
    worksheet_id: str,
    body: SendWorksheetBody,
    db: AsyncSession = Depends(get_db),
    user: Any = Depends(_require_staff),
):
    """MOCK delivery — documented honestly.

    No WhatsApp provider is configured in this deployment. The endpoint
    validates the worksheet, records one worksheet_distributions row per
    recipient (real persistence), and returns a mock-queued result. The
    underlying WorksheetService.send_to_class pipeline is intentionally not
    invoked because its _resolve_students_in_class helper is not implemented
    in worksheet_service.py.
    """
    await _ensure_tables(db)
    _require_worksheets()
    try:
        wid = uuid.UUID(worksheet_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Worksheet not found")
    ws = (
        await db.execute(select(wss.Worksheet).where(wss.Worksheet.id == wid))
    ).scalar_one_or_none()
    if ws is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Worksheet not found")

    recipients = list(body.recipientIds)
    if not recipients:
        recipients = [
            str(r[0])
            for r in (
                await db.execute(
                    select(ClassEnrollmentModel.student_id).where(
                        ClassEnrollmentModel.class_id == ws.class_id
                    )
                )
            ).all()
        ]

    already = {
        str(r[0])
        for r in (
            await db.execute(
                select(wss.WorksheetDistribution.student_id).where(
                    wss.WorksheetDistribution.worksheet_id == wid
                )
            )
        ).all()
    }
    new_ids = [r for r in recipients if r not in already]
    for sid in new_ids:
        try:
            sid_uuid = uuid.UUID(sid)
        except ValueError:
            continue
        db.add(
            wss.WorksheetDistribution(
                worksheet_id=wid,
                student_id=sid_uuid,
                sent_via="whatsapp",
                message_sid=f"MOCK-{uuid.uuid4().hex[:24]}",
            )
        )
    await db.flush()
    if ws.status == "draft":
        ws.status = "sent"
        # Worksheet.sent_at is a naive DateTime column — store naive UTC.
        ws.sent_at = datetime.utcnow()

    return {
        "messageId": f"mock-{uuid.uuid4()}",
        "status": "queued",
        "recipientsReached": len(new_ids),
        "recipientsFailed": 0,
        "failedRecipients": [],
    }
