"""Class assignments API — the teacher -> student -> teacher loop (TIER3).

A teacher creates an assignment for a class: (class + curriculum node +
question count + due date).  Students enrolled in that class see it on
/homework, complete it, and the teacher sees real completion status.

Everything rides EXISTING real pipelines — no mock data anywhere:

  questions      board_questions (node-tagged CBSE question bank; the same
                 store the practice selector and drill service pull from)
  grading        backend.api.practice._check_answer (deterministic numeric/
                 symbolic/unit folding) with the practice prose grader as
                 fallback for long answers
  completion     assignment_completions rows (this module)
  activity       activity_log rows + XP + streak via ProgressService (the
                 SAME writes the practice submit path performs)
  practice       a real practice_sessions row per completed assignment
  mastery        MasterySyncService.update_on_attempt (BKT), best-effort

Node ids never leave the API: student/teacher surfaces receive
``topicLabel`` (the human node title) only.

Endpoints (all under /api/assignments):
  POST /api/assignments               teacher: create assignment
  GET  /api/assignments/teacher       teacher: list mine + completion status
  GET  /api/assignments/student       student: assignments for my classes
  GET  /api/assignments/{id}/questions student: questions (answers withheld)
  POST /api/assignments/{id}/submit   student: submit -> grade -> real rows
"""

from __future__ import annotations

import asyncio
import logging
import random
import uuid
from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Float,
    Text,
    func,
    or_,
    select,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.asyncio import AsyncSession

from backend.db_types import GUID
from backend.database import Base as CoreBase
from database import get_db
from backend.deps import get_current_user, get_current_user_optional
from backend.models.user import User as UserModel
from backend.models.enrichment import BoardQuestion
from backend.services.auth_service import TeacherClassModel
from backend.services.feedback_scrub import (
    scrub_answer_key, scrub_explanation)
from backend.api.teacher import ClassEnrollmentModel, _require_staff

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/assignments", tags=["assignments"])

# ---------------------------------------------------------------------------
# Models (core Base; created on demand — see _ensure_tables)
# ---------------------------------------------------------------------------


class AssignmentModel(CoreBase):
    """A teacher-created assignment for a class, scoped to one curriculum node."""

    __tablename__ = "assignments"

    id: uuid.UUID = Column(GUID(), primary_key=True, default=uuid.uuid4)
    class_id: uuid.UUID = Column(
        GUID(),
        ForeignKey("teacher_classes.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    created_by: uuid.UUID = Column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    node_id: str = Column(Text, nullable=False, index=True)  # internal only
    topic_label: str = Column(Text, nullable=False)  # human title for UI
    subject: str = Column(Text, nullable=False, default="")
    class_level: int = Column(Integer, nullable=False, default=0)
    question_count: int = Column(Integer, nullable=False, default=5)
    due_date: Optional[datetime] = Column(DateTime(timezone=True), nullable=True)
    note: Optional[str] = Column(Text, nullable=True)
    created_at: datetime = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class AssignmentCompletionModel(CoreBase):
    """One student's completed attempt at an assignment (source of truth for
    the teacher's completion view)."""

    __tablename__ = "assignment_completions"

    id: uuid.UUID = Column(GUID(), primary_key=True, default=uuid.uuid4)
    assignment_id: uuid.UUID = Column(
        GUID(),
        ForeignKey("assignments.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    student_id: uuid.UUID = Column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    practice_session_id: Optional[str] = Column(Text, nullable=True)
    correct_count: int = Column(Integer, nullable=False, default=0)
    question_count: int = Column(Integer, nullable=False, default=0)
    score_pct: float = Column(Float, nullable=False, default=0.0)
    detail: Optional[dict] = Column(JSONB, nullable=True)
    completed_at: datetime = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

_tables_ready = False
_ensure_lock = asyncio.Lock()


async def _ensure_tables(db: AsyncSession) -> None:
    """CREATE TABLE IF NOT EXISTS for assignments + completions."""
    global _tables_ready
    if _tables_ready:
        return
    async with _ensure_lock:
        if _tables_ready:
            return
        from backend.database import engine

        async with engine.begin() as conn:
            await conn.run_sync(
                lambda sync_conn: CoreBase.metadata.create_all(
                    sync_conn,
                    tables=[AssignmentModel.__table__, AssignmentCompletionModel.__table__],
                )
            )
        _tables_ready = True


# ---------------------------------------------------------------------------
# Question sampling — deterministic per (assignment, student)
# ---------------------------------------------------------------------------

# Seeded RNG string: same assignment + same student always re-derives the
# same question set, so GET questions and POST submit agree without the
# server storing per-student state (and without answers ever being shipped).
def _sample_seed(assignment_id: str, student_id: str) -> str:
    return f"assignment:{assignment_id}:student:{student_id}"


def _is_answerable(q: BoardQuestion) -> bool:
    return bool((q.correct_answer or "").strip() or (q.model_answer or "").strip())


async def _node_question_pool(db: AsyncSession, node_id: str) -> list[BoardQuestion]:
    """Node-tagged answerable questions from the real board_questions bank."""
    rows = (
        await db.execute(
            select(BoardQuestion)
            .where(BoardQuestion.node_tags.cast(JSONB).contains([node_id]))
            .where(
                or_(
                    BoardQuestion.correct_answer.isnot(None),
                    BoardQuestion.model_answer.isnot(None),
                )
            )
            .order_by(BoardQuestion.created_at, BoardQuestion.id)
            .limit(80)
        )
    ).scalars().all()
    # Serve-boundary hygiene (same rule the drill service applies): merged
    # records never reach the student.
    from backend.utils.question_text import is_merged_record

    return [q for q in rows if not is_merged_record(q.question_text)]


def _sample_questions(
    pool: list[BoardQuestion], count: int, seed: str
) -> list[BoardQuestion]:
    rng = random.Random(seed)
    ordered = list(pool)
    rng.shuffle(ordered)
    return ordered[: max(1, count)]


def _question_payload(q: BoardQuestion, idx: int) -> dict[str, Any]:
    """Client-facing question — NEVER includes correct_answer/model_answer."""
    qtype = "mcq" if (q.question_type == "mcq" and q.options) else (
        "long" if q.question_type in ("long_answer", "essay") else "short"
    )
    from backend.utils.question_text import strip_pipeline_markers

    return {
        "id": str(q.id),
        "index": idx + 1,
        "type": qtype,
        "text": strip_pipeline_markers(q.question_text or ""),
        "options": list(q.options) if (qtype == "mcq" and q.options) else None,
        "marks": q.marks or 1,
    }


def _expected_ids(pool: list[BoardQuestion], count: int, seed: str) -> set[str]:
    return {str(q.id) for q in _sample_questions(pool, count, seed)}


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------


class AssignmentCreateBody(BaseModel):
    classId: str
    nodeId: str = Field(min_length=3, max_length=64)
    topicLabel: str = Field(min_length=1, max_length=200)
    subject: str = Field(default="", max_length=60)
    classLevel: int = Field(default=0, ge=0, le=14)
    questionCount: int = Field(default=5, ge=1, le=20)
    dueDate: Optional[str] = None  # ISO date/datetime
    note: Optional[str] = Field(default=None, max_length=1000)


class AssignmentSubmitBody(BaseModel):
    answers: list[dict[str, Any]] = Field(min_length=1)  # [{questionId, answer}]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


async def _get_assignment_or_404(db: AsyncSession, assignment_id: str) -> AssignmentModel:
    try:
        aid = uuid.UUID(assignment_id)
    except (ValueError, AttributeError, TypeError):
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Assignment not found")
    row = (
        await db.execute(select(AssignmentModel).where(AssignmentModel.id == aid))
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Assignment not found")
    return row


async def _require_enrollment(db: AsyncSession, class_id: Any, user_id: Any) -> None:
    row = (
        await db.execute(
            select(ClassEnrollmentModel.id).where(
                ClassEnrollmentModel.class_id == class_id,
                ClassEnrollmentModel.student_id == user_id,
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            detail="You are not enrolled in this assignment's class",
        )


def _status_for(asgmt: AssignmentModel, completion: Optional[Any], now: datetime) -> str:
    if completion is not None:
        return "completed"
    if asgmt.due_date is not None:
        due = asgmt.due_date
        if due.tzinfo is None:
            due = due.replace(tzinfo=timezone.utc)
        if now > due:
            return "overdue"
    return "pending"


# ---------------------------------------------------------------------------
# Teacher endpoints
# ---------------------------------------------------------------------------


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_assignment(
    body: AssignmentCreateBody,
    db: AsyncSession = Depends(get_db),
    user: Any = Depends(_require_staff),
):
    """Teacher creates an assignment: class + curriculum topic + question
    count + due date. Questions are served from the node-tagged board
    question bank at start time (per-student, deterministic)."""
    await _ensure_tables(db)
    try:
        cid = uuid.UUID(body.classId)
    except (ValueError, AttributeError, TypeError):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Invalid classId")

    cls = (
        await db.execute(select(TeacherClassModel).where(TeacherClassModel.id == cid))
    ).scalar_one_or_none()
    if cls is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Class not found")
    if str(cls.teacher_id) != str(user.id) and str(getattr(user, "role", "")).lower() != "admin":
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail="This class belongs to another teacher")

    # Question availability is verified at creation so a teacher never
    # assigns homework the bank cannot serve.
    pool = await _node_question_pool(db, body.nodeId.strip())
    if not pool:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="No answerable questions are tagged to this topic yet — pick another topic",
        )

    due: Optional[datetime] = None
    if body.dueDate:
        try:
            due = datetime.fromisoformat(body.dueDate.replace("Z", "+00:00"))
        except ValueError:
            try:
                due = datetime.strptime(body.dueDate, "%Y-%m-%d").replace(tzinfo=timezone.utc)
            except ValueError:
                raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Invalid dueDate")

    row = AssignmentModel(
        class_id=cid,
        created_by=user.id,
        node_id=body.nodeId.strip(),
        topic_label=body.topicLabel.strip(),
        subject=body.subject.strip() or (cls.subject or ""),
        class_level=body.classLevel,
        question_count=max(1, min(20, body.questionCount)),
        due_date=due,
        note=(body.note or "").strip() or None,
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {
        "assignmentId": str(row.id),
        "questionsAvailable": len(pool),
        "topicLabel": row.topic_label,
        "className": cls.class_name,
    }


@router.get("/teacher")
async def teacher_assignments(
    classId: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    user: Any = Depends(_require_staff),
):
    """Teacher's assignments with REAL completion status per student."""
    await _ensure_tables(db)
    stmt = select(AssignmentModel).order_by(AssignmentModel.created_at.desc()).limit(50)
    if classId:
        try:
            stmt = stmt.where(AssignmentModel.class_id == uuid.UUID(classId))
        except (ValueError, AttributeError, TypeError):
            pass
    if str(getattr(user, "role", "")).lower() != "admin":
        stmt = stmt.where(AssignmentModel.created_by == user.id)
    rows = (await db.execute(stmt)).scalars().all()
    if not rows:
        return []

    ids = [r.id for r in rows]
    completions = (
        await db.execute(
            select(AssignmentCompletionModel).where(
                AssignmentCompletionModel.assignment_id.in_(ids)
            )
        )
    ).scalars().all()
    comp_by: dict[str, dict[str, Any]] = {}
    for c in completions:
        comp_by.setdefault(str(c.assignment_id), {})[str(c.student_id)] = c

    class_ids = {r.class_id for r in rows}
    classes = {
        str(c.id): c
        for c in (
            await db.execute(
                select(TeacherClassModel).where(TeacherClassModel.id.in_(class_ids))
            )
        ).scalars().all()
    }

    roster_rows = (
        await db.execute(
            select(
                ClassEnrollmentModel.class_id,
                ClassEnrollmentModel.student_id,
                UserModel.name,
            )
            .join(UserModel, UserModel.id == ClassEnrollmentModel.student_id)
            .where(ClassEnrollmentModel.class_id.in_(class_ids))
            .order_by(ClassEnrollmentModel.roll_number, UserModel.name)
        )
    ).all()
    roster_by: dict[str, list[tuple[str, str]]] = {}
    for cid_, sid_, name in roster_rows:
        roster_by.setdefault(str(cid_), []).append((str(sid_), (name or "").strip()))

    now = datetime.now(timezone.utc)
    out = []
    for r in rows:
        roster = roster_by.get(str(r.class_id), [])
        comp_map = comp_by.get(str(r.id), {})
        students = []
        for sid, name in roster:
            c = comp_map.get(sid)
            students.append(
                {
                    "studentId": sid,
                    "name": name,
                    "completed": c is not None,
                    "scorePct": round(float(c.score_pct), 1) if c else None,
                    "correctCount": c.correct_count if c else None,
                    "questionCount": c.question_count if c else None,
                    "completedAt": c.completed_at.isoformat() if c else None,
                }
            )
        cls = classes.get(str(r.class_id))
        out.append(
            {
                "id": str(r.id),
                "classId": str(r.class_id),
                "className": cls.class_name if cls else "",
                "topicLabel": r.topic_label,
                "subject": r.subject,
                "questionCount": r.question_count,
                "dueDate": r.due_date.isoformat() if r.due_date else None,
                "note": r.note,
                "createdAt": r.created_at.isoformat() if r.created_at else None,
                "rosterCount": len(roster),
                "completedCount": sum(1 for s in students if s["completed"]),
                "students": students,
            }
        )
    return out


# ---------------------------------------------------------------------------
# Student endpoints
# ---------------------------------------------------------------------------


@router.get("/student")
async def student_assignments(
    db: AsyncSession = Depends(get_db),
    user: Any = Depends(get_current_user),
):
    """Assignments for the classes the signed-in student is enrolled in."""
    await _ensure_tables(db)
    enrolled = (
        await db.execute(
            select(ClassEnrollmentModel.class_id).where(
                ClassEnrollmentModel.student_id == user.id
            )
        )
    ).scalars().all()
    if not enrolled:
        return []

    rows = (
        await db.execute(
            select(AssignmentModel)
            .where(AssignmentModel.class_id.in_(enrolled))
            .order_by(AssignmentModel.created_at.desc())
            .limit(60)
        )
    ).scalars().all()
    if not rows:
        return []

    completions = {
        str(c.assignment_id): c
        for c in (
            await db.execute(
                select(AssignmentCompletionModel).where(
                    AssignmentCompletionModel.assignment_id.in_([r.id for r in rows]),
                    AssignmentCompletionModel.student_id == user.id,
                )
            )
        ).scalars().all()
    }

    classes = {
        str(c.id): c
        for c in (
            await db.execute(
                select(TeacherClassModel).where(
                    TeacherClassModel.id.in_({r.class_id for r in rows})
                )
            )
        ).scalars().all()
    }
    teachers = {
        str(t.id): t
        for t in (
            await db.execute(
                select(UserModel).where(
                    UserModel.id.in_({r.created_by for r in rows})
                )
            )
        ).scalars().all()
    }

    now = datetime.now(timezone.utc)
    out = []
    for r in rows:
        c = completions.get(str(r.id))
        cls = classes.get(str(r.class_id))
        teacher = teachers.get(str(r.created_by))
        out.append(
            {
                "id": str(r.id),
                "className": cls.class_name if cls else "",
                "teacherName": (teacher.name if teacher else "") or "",
                "topicLabel": r.topic_label,
                "subject": r.subject,
                "questionCount": r.question_count,
                "dueDate": r.due_date.isoformat() if r.due_date else None,
                "note": r.note,
                "createdAt": r.created_at.isoformat() if r.created_at else None,
                "status": _status_for(r, c, now),
                "completedAt": c.completed_at.isoformat() if c else None,
                "scorePct": round(float(c.score_pct), 1) if c else None,
                "correctCount": c.correct_count if c else None,
            }
        )
    return out


async def _assignment_questions_for_student(
    db: AsyncSession, assignment_id: str, user: Any
) -> tuple[AssignmentModel, list[BoardQuestion], str]:
    asgmt = await _get_assignment_or_404(db, assignment_id)
    # Students must be enrolled; teachers/admins may preview.
    if str(getattr(user, "role", "")).lower() not in ("teacher", "admin"):
        await _require_enrollment(db, asgmt.class_id, user.id)
    seed = _sample_seed(str(asgmt.id), str(user.id))
    pool = await _node_question_pool(db, asgmt.node_id)
    return asgmt, pool, seed


@router.get("/{assignment_id}/questions")
async def assignment_questions(
    assignment_id: str,
    db: AsyncSession = Depends(get_db),
    user: Any = Depends(get_current_user),
):
    """The student's question set for this assignment (answers withheld;
    server-side grading). Deterministic per student — reload-safe."""
    asgmt, pool, seed = await _assignment_questions_for_student(db, assignment_id, user)
    if not pool:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Questions for this assignment are temporarily unavailable",
        )
    sampled = _sample_questions(pool, asgmt.question_count, seed)
    return {
        "assignmentId": str(asgmt.id),
        "topicLabel": asgmt.topic_label,
        "subject": asgmt.subject,
        "note": asgmt.note,
        "dueDate": asgmt.due_date.isoformat() if asgmt.due_date else None,
        "questions": [_question_payload(q, i) for i, q in enumerate(sampled)],
    }


@router.post("/{assignment_id}/submit")
async def assignment_submit(
    assignment_id: str,
    body: AssignmentSubmitBody,
    db: AsyncSession = Depends(get_db),
    user: Any = Depends(get_current_user),
):
    """Grade a completed assignment and write the REAL downstream rows:
    activity_log entries + XP + streak (ProgressService, identical to the
    practice submit path), a practice_sessions row, mastery (best-effort),
    and the assignment_completions row the teacher's status view reads."""
    if str(getattr(user, "role", "")).lower() != "student":
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail="Only students submit assignments")

    asgmt, pool, seed = await _assignment_questions_for_student(db, assignment_id, user)
    uid = str(user.id)

    existing = (
        await db.execute(
            select(AssignmentCompletionModel).where(
                AssignmentCompletionModel.assignment_id == asgmt.id,
                AssignmentCompletionModel.student_id == user.id,
            )
        )
    ).scalar_one_or_none()
    if existing is not None:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            detail={
                "message": "This assignment was already submitted.",
                "scorePct": round(float(existing.score_pct), 1),
                "correctCount": existing.correct_count,
                "questionCount": existing.question_count,
                "completedAt": existing.completed_at.isoformat(),
            },
        )

    expected = _expected_ids(pool, asgmt.question_count, seed)
    pool_by_id = {str(q.id): q for q in pool}
    answers_by_q: dict[str, str] = {}
    for a in body.answers:
        qid = str(a.get("questionId") or a.get("question_id") or "").strip()
        if qid in expected:
            answers_by_q[qid] = str(a.get("answer") if a.get("answer") is not None else "")

    from backend.api.practice import _evaluate_answer
    from backend.utils.question_text import strip_pipeline_markers

    sampled = _sample_questions(pool, asgmt.question_count, seed)
    results: list[dict[str, Any]] = []
    correct_count = 0
    for i, q in enumerate(sampled):
        qid = str(q.id)
        student_answer = (answers_by_q.get(qid) or "").strip()
        model_answer = (q.correct_answer or q.model_answer or "").strip()
        try:
            is_correct = bool(
                student_answer
                and await _evaluate_answer(
                    {
                        "correct_answer": model_answer,
                        "marking_scheme": q.marking_scheme or "",
                        "marks": q.marks or 1,
                    },
                    student_answer,
                )
            )
        except Exception as exc:
            logger.warning("assignment grading fallback for %s/%s: %s", asgmt.id, qid, exc)
            is_correct = False
        if is_correct:
            correct_count += 1
        results.append(
            {
                "questionId": qid,
                "index": i + 1,
                "questionText": strip_pipeline_markers(q.question_text or ""),
                "studentAnswer": student_answer,
                "isCorrect": is_correct,
                # bank fields can hold GRADER prose — scrub at serving.
                "correctAnswer": scrub_answer_key(model_answer)[:400],
                "explanation": scrub_explanation(
                    q.explanation, is_correct)[:400],
            }
        )

    total = len(sampled)
    score_pct = round(correct_count / total * 100.0, 1) if total else 0.0

    # ── Real pipeline writes (best-effort per block, mirroring practice) ──
    now = datetime.now(timezone.utc)
    xp_earned = 0
    activity_written = 0
    try:
        from backend.services.progress_service import ProgressService

        for r in results:
            try:
                await ProgressService.log_activity(
                    db,
                    uid,
                    activity_type="quiz",
                    title=f"Assignment: {asgmt.topic_label}",
                    subject=asgmt.subject or None,
                    score="correct" if r["isCorrect"] else "incorrect",
                    metadata={
                        "source": "class_assignment",
                        "assignment_id": str(asgmt.id),
                        "class_id": str(asgmt.class_id),
                        "question_ref": r["questionId"],
                        "is_correct": r["isCorrect"],
                    },
                )
                activity_written += 1
                # XP via the canonical service, keyed by (assignment, student,
                # question) so a retried submit can never double-pay even if
                # the completion-row guard above were to miss. The receipt's
                # `awarded` flag keeps the reported xp_earned honest.
                from backend.services.reward_ledger import (
                    RewardLedger as _Ledger,
                    xp_for_answer as _xp_for,
                )
                _amount = _xp_for(bool(r["isCorrect"]))
                _receipt = await _Ledger.award_xp(
                    db, uid, _amount,
                    event="assignment",
                    event_ref=f"{asgmt.id}:{uid}:{r.get('questionId', '')}",
                )
                if _receipt.get("awarded"):
                    xp_earned += _amount
            except Exception as exc:
                logger.warning("assignment progress write failed: %s", exc)
        try:
            await ProgressService.update_streak(db, uid)
        except Exception as exc:
            logger.warning("assignment streak update failed: %s", exc)
    except ImportError as exc:  # pragma: no cover
        logger.warning("ProgressService unavailable: %s", exc)

    # A real practice_sessions row for the completed assignment (bridged to
    # the students table via the canonical users→students identity bridge).
    practice_session_id: Optional[str] = None
    students_row_id: Optional[str] = None
    try:
        from backend.services.identity_bridge import ensure_student_row
        from database import PracticeSession

        stu = await ensure_student_row(db, uid)
        students_row_id = str(stu.id)
        ps = PracticeSession(
            student_id=stu.id,
            questions_answered=total,
            started_at=now,
            ended_at=now,
            session_meta={
                "source": "class_assignment",
                "assignment_id": str(asgmt.id),
                "node_id": asgmt.node_id,  # internal only, never served
                "correct_count": correct_count,
            },
        )
        db.add(ps)
        await db.flush()
        practice_session_id = str(ps.id)
    except Exception as exc:
        logger.warning("assignment practice-session row failed: %s", exc)

    # Mastery via the ONE ledger (one-record rule, owner plan 2026-09):
    # keyed on the students-table id exactly like practice, dual-writes
    # mastery_records + mastery_state, exactly-once per (assignment, item).
    try:
        if students_row_id:
            from backend.services.mastery_ledger import record_assessment

            for r in results:
                try:
                    await record_assessment(
                        db,
                        user_id=str(students_row_id),
                        node_id=str(asgmt.node_id),
                        is_correct=bool(r["isCorrect"]),
                        source="assignment",
                        time_ms=0,
                        subject=asgmt.subject or "general",
                        client_token=f"assign:{asgmt.id}:{user.id}:{r.get('questionId', '')}",
                    )
                except Exception:
                    break
    except Exception as exc:
        logger.debug("assignment mastery sync skipped: %s", exc)

    completion = AssignmentCompletionModel(
        assignment_id=asgmt.id,
        student_id=user.id,
        practice_session_id=practice_session_id,
        correct_count=correct_count,
        question_count=total,
        score_pct=score_pct,
        detail={
            "results": results,
            "topicLabel": asgmt.topic_label,
            "xpEarned": xp_earned,
            "activityRows": activity_written,
        },
    )
    db.add(completion)
    await db.commit()
    await db.refresh(completion)

    return {
        "assignmentId": str(asgmt.id),
        "topicLabel": asgmt.topic_label,
        "scorePct": score_pct,
        "correctCount": correct_count,
        "questionCount": total,
        "xpEarned": xp_earned,
        "completedAt": completion.completed_at.isoformat(),
        "results": results,
    }


@router.get("/{assignment_id}/result")
async def assignment_result(
    assignment_id: str,
    db: AsyncSession = Depends(get_db),
    user: Any = Depends(get_current_user),
):
    """A student's own graded result (or a teacher/admin preview)."""
    asgmt = await _get_assignment_or_404(db, assignment_id)
    row = (
        await db.execute(
            select(AssignmentCompletionModel).where(
                AssignmentCompletionModel.assignment_id == asgmt.id,
                AssignmentCompletionModel.student_id == user.id,
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Not submitted yet")
    return {
        "assignmentId": str(asgmt.id),
        "topicLabel": asgmt.topic_label,
        "scorePct": round(float(row.score_pct), 1),
        "correctCount": row.correct_count,
        "questionCount": row.question_count,
        "completedAt": row.completed_at.isoformat(),
        "results": (row.detail or {}).get("results", []),
    }
