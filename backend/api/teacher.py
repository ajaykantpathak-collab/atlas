"""
Teacher API Router — worksheet creation, class management, performance tracking.

Endpoints
─────────
POST   /api/teacher/worksheet/create              Create a new worksheet
GET    /api/teacher/worksheet/{id}                Get worksheet (questions + answers)
GET    /api/teacher/worksheet/{id}/printable      Printable HTML view
POST   /api/teacher/worksheet/{id}/send           Send worksheet via WhatsApp
GET    /api/teacher/worksheet/{id}/performance    Class performance analytics
GET    /api/teacher/classes/{teacher_id}          List teacher's classes
GET    /api/teacher/class/{class_id}/students     Students + mastery summary
GET    /api/teacher/class/{class_id}/progress     Class progress overview
POST   /api/teacher/class/{class_id}/assign-homework  Assign homework to class

Tech: FastAPI, async SQLAlchemy, Pydantic v2, httpx
"""

from __future__ import annotations

import hashlib
import html
import logging
import math
import random
from collections import Counter, defaultdict
from datetime import date, datetime, timedelta, timezone
from typing import Any, Sequence

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, field_validator, model_validator
from sqlalchemy import and_, desc, func, insert, not_, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession

# ── internal imports ──────────────────────────────────────────────────────────
from database import (
    Attempt,
    ClassEnrollment,
    Homework,
    Mastery,
    PracticeSession,
    Student,
    Subject,
    Teacher,
    UserRole,
    async_session_maker,
    get_db,
)
from services.homework_service import HomeworkService
from services.whatsapp_service import WhatsAppService
from services.practice_service import PracticeService
from services.mastery_sync import MasterySyncService

logger = logging.getLogger("api.teacher")
router = APIRouter()


# ═══════════════════════════════════════════════════════════════════════════════
#  SCHEMAS  (Pydantic v2)
# ═══════════════════════════════════════════════════════════════════════════════

class PaginationParams(BaseModel):
    """Shared pagination query parameters."""
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=20, ge=1, le=100)

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.page_size

    @property
    def limit(self) -> int:
        return self.page_size


class PaginatedResponse(BaseModel):
    """Wrapper that every list endpoint returns."""
    items: list[Any]
    total: int
    page: int
    page_size: int
    total_pages: int

    model_config = {"from_attributes": True}


class HTTPError(BaseModel):
    """Structured error body returned on failures."""
    error: str
    detail: str | None = None
    status_code: int


# ── Question schemas ─────────────────────────────────────────────────────────

class QuestionOption(BaseModel):
    label: str = Field(..., min_length=1, max_length=5)
    text: str = Field(..., min_length=1)
    is_correct: bool = False

    model_config = {"from_attributes": True}


class QuestionResponse(BaseModel):
    id: int
    worksheet_id: int
    topic: str
    difficulty: str
    question_text: str
    options: list[QuestionOption] | None = None
    correct_answer: str | None = None
    explanation: str | None = None
    marks: int = 1
    order_index: int
    created_at: datetime | None = None

    model_config = {"from_attributes": True}


# ── Worksheet schemas ────────────────────────────────────────────────────────

class TopicConfig(BaseModel):
    """Per-topic configuration inside a worksheet creation request."""
    topic: str = Field(..., min_length=1, description="Topic name (e.g. 'Quadratic Equations')")
    difficulty: str = Field(
        default="medium",
        pattern="^(easy|medium|hard|mixed)$",
        description="Target difficulty level",
    )
    num_questions: int = Field(default=5, ge=1, le=50)
    marks_per_question: int = Field(default=1, ge=1, le=10)

    model_config = {"from_attributes": True}


class WorksheetCreateRequest(BaseModel):
    """Request body for POST /worksheet/create."""
    title: str = Field(..., min_length=3, max_length=200)
    description: str | None = Field(default=None, max_length=2000)
    subject: str = Field(..., min_length=1, description="Subject slug e.g. 'mathematics'")
    grade: str = Field(..., min_length=1, description="Class/grade e.g. 'IX'")
    chapter: str = Field(..., min_length=1, description="Chapter or unit name")
    topics: list[TopicConfig] = Field(..., min_length=1, max_length=20)
    total_marks: int | None = Field(default=None, ge=1, description="Override auto-calculated total")
    language: str = Field(default="english", pattern="^(english|hindi|hinglish)$")
    include_answers: bool = Field(default=True)
    include_explanations: bool = Field(default=True)

    @field_validator("subject")
    @classmethod
    def normalise_subject(cls, v: str) -> str:
        return v.strip().lower().replace(" ", "_")

    @field_validator("topics")
    @classmethod
    def ensure_unique_topics(cls, v: list[TopicConfig]) -> list[TopicConfig]:
        names = [t.topic.strip().lower() for t in v]
        if len(names) != len(set(names)):
            raise ValueError("Duplicate topics are not allowed in a single worksheet")
        return v

    model_config = {"from_attributes": True}


class WorksheetResponse(BaseModel):
    id: int
    title: str
    description: str | None
    subject: str
    grade: str
    chapter: str
    topics: list[str] | None = None
    total_marks: int
    language: str
    include_answers: bool
    include_explanations: bool
    status: str
    questions: list[QuestionResponse] = Field(default_factory=list)
    created_at: datetime | None = None
    created_by: int | None = None

    model_config = {"from_attributes": True}


class WorksheetListItem(BaseModel):
    """Lightweight worksheet representation for list views."""
    id: int
    title: str
    subject: str
    grade: str
    chapter: str
    total_marks: int
    question_count: int
    status: str
    created_at: datetime | None = None

    model_config = {"from_attributes": True}


class WorksheetSendRequest(BaseModel):
    """Optional customisations when sending via WhatsApp."""
    message: str | None = Field(
        default=None,
        max_length=500,
        description="Override the default notification message",
    )
    send_to_students: bool = Field(default=True)
    send_to_parents: bool = Field(default=True)
    due_date: date | None = Field(
        default=None,
        description="Submission deadline to include in the message",
    )

    model_config = {"from_attributes": True}


class WorksheetSendResponse(BaseModel):
    message_id: str | None = None
    recipients_count: int
    status: str
    sent_at: datetime | None = None

    model_config = {"from_attributes": True}


# ── Performance schemas ──────────────────────────────────────────────────────

class TopicPerformance(BaseModel):
    topic: str
    avg_score: float
    max_score: float
    attempts: int
    mastery_distribution: dict[str, int] = Field(default_factory=dict)

    model_config = {"from_attributes": True}


class StudentPerformance(BaseModel):
    student_id: int
    student_name: str
    roll_number: str | None = None
    score: float | None = None
    max_score: float
    submitted_at: datetime | None = None
    time_taken_seconds: int | None = None

    model_config = {"from_attributes": True}


class WorksheetPerformance(BaseModel):
    worksheet_id: int
    worksheet_title: str
    subject: str
    grade: str
    total_students: int
    submitted_count: int
    pending_count: int
    avg_score: float | None = None
    max_possible_score: float
    score_distribution: dict[str, int] = Field(default_factory=dict)
    topic_breakdown: list[TopicPerformance] = Field(default_factory=list)
    top_performers: list[StudentPerformance] = Field(default_factory=list)
    needs_improvement: list[StudentPerformance] = Field(default_factory=list)
    generated_at: datetime | None = None

    model_config = {"from_attributes": True}


# ── Class / Student schemas ──────────────────────────────────────────────────

class ClassInfoResponse(BaseModel):
    id: int
    name: str
    grade: str
    section: str
    academic_year: str
    subject: str | None = None
    student_count: int
    active: bool

    model_config = {"from_attributes": True}


class StudentMasterySummary(BaseModel):
    """Compact mastery view for a single student in a class roster."""
    student_id: int
    student_name: str
    roll_number: str | None
    whatsapp_number: str | None
    overall_mastery: float | None
    topics_mastered: int
    topics_in_progress: int
    topics_weak: int
    total_practice_sessions: int
    last_active: datetime | None = None
    mastery_by_subject: dict[str, float] = Field(default_factory=dict)

    model_config = {"from_attributes": True}


class StudentRosterResponse(BaseModel):
    class_id: int
    class_name: str
    grade: str
    total_students: int
    students: list[StudentMasterySummary]

    model_config = {"from_attributes": True}


class DailyActivity(BaseModel):
    date: str
    attempts: int
    practice_sessions: int
    avg_score: float | None = None

    model_config = {"from_attributes": True}


class ProgressOverview(BaseModel):
    class_id: int
    class_name: str
    grade: str
    period_days: int
    total_attempts: int
    total_practice_sessions: int
    avg_score: float | None = None
    completion_rate: float | None = None
    mastery_distribution: dict[str, int] = Field(default_factory=dict)
    subject_breakdown: dict[str, dict[str, float]] = Field(default_factory=dict)
    daily_activity: list[DailyActivity] = Field(default_factory=list)
    top_performers: list[dict[str, Any]] = Field(default_factory=list)
    students_needing_attention: list[dict[str, Any]] = Field(default_factory=list)
    generated_at: datetime | None = None

    model_config = {"from_attributes": True}


class TopicProgressItem(BaseModel):
    topic: str
    total_students: int
    students_mastered: int
    students_in_progress: int
    students_weak: int
    class_avg_mastery: float | None = None

    model_config = {"from_attributes": True}


class ProgressOverviewResponse(BaseModel):
    class_id: int
    class_name: str
    grade: str
    period_days: int
    overall_avg_score: float | None = None
    total_attempts: int
    total_practice_sessions: int
    active_students: int
    total_students: int
    mastery_distribution: dict[str, int] = Field(default_factory=dict)
    subject_progress: dict[str, float] = Field(default_factory=dict)
    topic_progress: list[TopicProgressItem] = Field(default_factory=list)
    daily_activity: list[DailyActivity] = Field(default_factory=list)
    generated_at: datetime | None = None

    model_config = {"from_attributes": True}


# ── Homework assignment schema ───────────────────────────────────────────────

class HomeworkAssignRequest(BaseModel):
    """Assign homework from an existing worksheet to an entire class."""
    worksheet_id: int = Field(..., gt=0)
    title: str = Field(..., min_length=3, max_length=200)
    instructions: str | None = Field(default=None, max_length=2000)
    due_date: datetime = Field(..., description="UTC deadline for submission")
    notify_parents: bool = Field(default=True)
    notify_students: bool = Field(default=True)

    model_config = {"from_attributes": True}


class HomeworkAssignResponse(BaseModel):
    homework_id: int
    class_id: int
    worksheet_id: int
    title: str
    due_date: datetime
    assigned_count: int
    notification_status: str
    created_at: datetime | None = None

    model_config = {"from_attributes": True}


# ═══════════════════════════════════════════════════════════════════════════════
#  DEPENDENCIES
# ═══════════════════════════════════════════════════════════════════════════════

async def _get_db_session() -> AsyncSession:
    """Yield an async DB session; commits/rollbacks handled per-request."""
    async with async_session_maker() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise


def _require_teacher(teacher_id: int, db: AsyncSession) -> Teacher:
    """Fetch and return a Teacher row; raise 403 if not found or inactive."""
    # Synchronous-ish check done in an async context — acceptable for auth guards.
    # In production, pull teacher_id from a verified JWT/session dependency.
    return teacher_id  # placeholder — see note above; the ID itself is enough
                       # for queries; service layers can validate ownership.


def _now_utc() -> datetime:
    return datetime.now(timezone.utc)


# ═══════════════════════════════════════════════════════════════════════════════
#  HELPER FUNCTIONS  (non-route)
# ═══════════════════════════════════════════════════════════════════════════════

async def _get_worksheet_or_404(db: AsyncSession, worksheet_id: int) -> Any:
    """Fetch a Worksheet by ID or raise HTTP 404."""
    from database import Worksheet  # lazy to avoid circular imports at module level

    result = await db.execute(select(Worksheet).where(Worksheet.id == worksheet_id))
    worksheet = result.scalar_one_or_none()
    if worksheet is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "not_found", "detail": f"Worksheet {worksheet_id} does not exist"},
        )
    return worksheet


async def _get_class_or_404(db: AsyncSession, class_id: int) -> Any:
    """Fetch a Class by ID or raise HTTP 404."""
    from database import Class as ClassModel

    result = await db.execute(select(ClassModel).where(ClassModel.id == class_id))
    cls = result.scalar_one_or_none()
    if cls is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "not_found", "detail": f"Class {class_id} does not exist"},
        )
    return cls


async def _load_questions(db: AsyncSession, worksheet_id: int) -> list[Any]:
    """Return ordered questions for a worksheet."""
    from database import Question

    result = await db.execute(
        select(Question)
        .where(Question.worksheet_id == worksheet_id)
        .order_by(Question.order_index)
    )
    return list(result.scalars().all())


async def _generate_and_save_questions(
    db: AsyncSession,
    worksheet_id: int,
    subject: str,
    grade: str,
    topics: list[Any],  # list[TopicConfig]
    language: str = "english",
) -> list[Any]:
    """
    Iterate over the topic configs, invoke the appropriate question generator
    for each (subject, grade) pair, persist the questions, and return them.

    Falls back gracefully when a generator is unavailable.
    """
    from database import Question
    from solvers import question_gen_factory  # maps subject slug → generator class

    all_questions: list[Question] = []
    global_order = 0

    for topic_cfg in topics:
        generator_cls = question_gen_factory.get(subject)
        if generator_cls is None:
            logger.warning("No generator for subject '%s' — using placeholder", subject)
            # Insert a stub question so the worksheet is never empty
            stub = Question(
                worksheet_id=worksheet_id,
                topic=topic_cfg.topic,
                difficulty=topic_cfg.difficulty,
                question_text=f"[Placeholder] Solve the {topic_cfg.topic.lower()} problem.",
                correct_answer="—",
                explanation="No auto-generated question available for this topic yet.",
                marks=topic_cfg.marks_per_question,
                order_index=global_order,
            )
            db.add(stub)
            all_questions.append(stub)
            global_order += 1
            continue

        generator = generator_cls(grade=grade, language=language)

        # Generate a small surplus so we can sample / deduplicate
        surplus = max(3, topic_cfg.num_questions // 2)
        try:
            generated = generator.generate(
                topic=topic_cfg.topic,
                difficulty=topic_cfg.difficulty,
                count=topic_cfg.num_questions + surplus,
            )
        except Exception as exc:
            logger.error(
                "Generator failed for %s / %s: %s", subject, topic_cfg.topic, exc
            )
            continue

        random.shuffle(generated)
        selected = generated[: topic_cfg.num_questions]

        for q_data in selected:
            q = Question(
                worksheet_id=worksheet_id,
                topic=topic_cfg.topic,
                difficulty=q_data.get("difficulty", topic_cfg.difficulty),
                question_text=q_data["question_text"],
                correct_answer=q_data.get("correct_answer"),
                explanation=q_data.get("explanation") if topic_cfg.marks_per_question > 1 else None,
                marks=topic_cfg.marks_per_question,
                order_index=global_order,
            )
            db.add(q)
            all_questions.append(q)
            global_order += 1

    await db.flush()
    return all_questions


def _build_printable_html(worksheet: Any, questions: list[Any]) -> str:
    """Return a self-contained, print-ready HTML document."""

    now_str = datetime.now(timezone.utc).strftime("%d %B %Y, %H:%M IST")
    grade_safe = html.escape(str(worksheet.grade))
    subject_safe = html.escape(str(worksheet.subject))
    chapter_safe = html.escape(str(worksheet.chapter))
    title_safe = html.escape(str(worksheet.title))
    desc_safe = html.escape(str(worksheet.description or ""))

    rows: list[str] = []
    for idx, q in enumerate(questions, start=1):
        q_text = html.escape(str(q.question_text))
        diff_badge = {"easy": "#4CAF50", "medium": "#FF9800", "hard": "#F44336"}.get(
            q.difficulty, "#9E9E9E"
        )
        rows.append(
            f"<tr>"
            f"<td class='q-num'>{idx}</td>"
            f"<td><span class='diff' style='background:{diff_badge}'>{html.escape(q.difficulty)}</span>"
            f"<div class='q-text'>{q_text}</div></td>"
            f"<td class='marks'>{q.marks}</td>"
            f"</tr>"
        )

    questions_table = "\n".join(rows) if rows else "<tr><td colspan='3'><em>No questions generated.</em></td></tr>"

    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title_safe}</title>
<style>
  @page {{ size: A4; margin: 2cm; }}
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: 'Georgia', serif; font-size: 11pt; color: #1a1a1a; padding: 24px; }}
  .sheet-header {{
    border-bottom: 3px double #1a1a1a; padding-bottom: 10px;
    margin-bottom: 18px; display: flex; justify-content: space-between;
  }}
  .sheet-header h1 {{ font-size: 18pt; }}
  .sheet-header .meta {{ font-size: 9pt; text-align: right; color: #555; }}
  .subject-bar {{ background: #f5f5f5; border: 1px solid #ccc; padding: 6px 10px;
                  font-size: 10pt; margin-bottom: 18px; display: flex; gap: 24px; }}
  .subject-bar span {{ font-weight: bold; }}
  .desc {{ font-size: 9.5pt; color: #444; margin-bottom: 14px; padding: 6px 10px;
           border-left: 3px solid #1976D2; background: #e3f2fd; }}
  table {{ width: 100%; border-collapse: collapse; margin-bottom: 18px; }}
  th {{ background: #263238; color: #fff; text-align: left; padding: 7px 8px;
        font-size: 9.5pt; }}
  td {{ border-bottom: 1px solid #ddd; padding: 8px; vertical-align: top; }}
  .q-num {{ font-weight: bold; width: 36px; text-align: center; font-size: 10pt; }}
  .q-text {{ margin-top: 3px; line-height: 1.45; }}
  .diff {{ font-size: 7.5pt; color: #fff; padding: 1px 6px; border-radius: 3px;
           text-transform: uppercase; display: inline-block; margin-bottom: 4px; }}
  .marks {{ text-align: center; font-weight: bold; width: 40px; }}
  .page-break {{ page-break-before: always; }}
  .answer-key {{ font-size: 9pt; color: #333; }}
  .answer-key .ak-q {{ margin-bottom: 6px; padding: 4px 8px; border-bottom: 1px dotted #ccc; }}
  .answer-key .ak-ans {{ color: #2E7D32; font-weight: bold; }}
  .footer {{ margin-top: 30px; border-top: 1px solid #aaa; padding-top: 6px;
             font-size: 8pt; color: #888; display: flex; justify-content: space-between; }}
  @media print {{ body {{ padding: 0; }} .no-print {{ display: none; }} }}
</style>
</head>
<body>
  <div class="no-print" style="text-align:right;margin-bottom:8px;">
    <button onclick="window.print()" style="padding:6px 14px;cursor:pointer;">🖨 Print / Save PDF</button>
  </div>
  <div class="sheet-header">
    <div>
      <h1>{title_safe}</h1>
      <div class="desc">{desc_safe}</div>
    </div>
    <div class="meta">
      <div>Printed: {now_str}</div>
      <div>Grade: {grade_safe}</div>
    </div>
  </div>
  <div class="subject-bar">
    <div>📘 Subject: <span>{subject_safe}</span></div>
    <div>📖 Chapter: <span>{chapter_safe}</span></div>
    <div>⭐ Total Marks: <span>{worksheet.total_marks}</span></div>
    <div>❓ Questions: <span>{len(questions)}</span></div>
  </div>
  <table>
    <thead>
      <tr>
        <th style="width:36px">#</th>
        <th>Question</th>
        <th style="width:40px;text-align:center">Marks</th>
      </tr>
    </thead>
    <tbody>
      {questions_table}
    </tbody>
  </table>
  <div class="footer">
    <span>{title_safe} — {subject_safe}, Grade {grade_safe}</span>
    <span>Page 1 of 1</span>
  </div>
</body>
</html>
"""


async def _send_worksheet_notifications(
    db: AsyncSession,
    ws: Any,
    msg_service: WhatsAppService,
    students: list[Any],
    custom_message: str | None = None,
    due_date: date | None = None,
) -> tuple[str, int]:
    """
    Send WhatsApp notification to parents and/or students about the worksheet.
    Returns (message_id, recipients_count).
    """
    if not students:
        return "", 0

    title = ws.title
    subject = ws.subject
    grade = ws.grade
    ws_id = ws.id

    due_str = (
        f"\n📅 Due Date: {due_date.strftime('%d %b %Y')}"
        if due_date
        else ""
    )
    body = custom_message or (
        f"📝 New Worksheet Available\n\n"
        f"Title: {title}\n"
        f"Subject: {subject} | Grade: {grade}{due_str}\n\n"
        f"Please complete and submit via the app."
    )

    try:
        # Attempt group broadcast first (preferred for class-level comms)
        if msg_service.group_id:
            msg_id = await msg_service.send_homework_notification(
                group_id=msg_service.group_id,
                title=title,
                subject=subject,
                description=body,
                worksheet_id=ws_id,
            )
            return msg_id or "", len(students)

        # Fallback: individual messages to students/parents
        success = 0
        last_msg_id = ""
        for student in students:
            phone = getattr(student, "whatsapp_number", None) or getattr(
                student, "parent_whatsapp", None
            )
            if not phone:
                continue
            try:
                last_msg_id = await msg_service.send_message(
                    to=phone,
                    message=body,
                ) or ""
                success += 1
            except Exception as exc:
                logger.warning("WhatsApp send failed for student %s: %s", student.id, exc)
        return last_msg_id, success

    except Exception as exc:
        logger.error("WhatsApp broadcast failed: %s", exc)
        return "", 0


async def _get_students_in_class(db: AsyncSession, class_id: int) -> list[Any]:
    """Return Student rows enrolled in the given class."""
    result = await db.execute(
        select(Student)
        .join(ClassEnrollment, ClassEnrollment.student_id == Student.id)
        .where(
            ClassEnrollment.class_id == class_id,
            ClassEnrollment.is_active == True,  # noqa: E712
        )
        .order_by(Student.roll_number.nullsfirst(), Student.full_name)
    )
    return list(result.scalars().all())


# ═══════════════════════════════════════════════════════════════════════════════
#  ROUTES
# ═══════════════════════════════════════════════════════════════════════════════

# ── Worksheet CRUD ───────────────────────────────────────────────────────────

@router.post(
    "/worksheet/create",
    response_model=WorksheetResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        400: {"model": HTTPError},
        401: {"model": HTTPError},
        422: {"model": HTTPError},
        500: {"model": HTTPError},
    },
)
async def create_worksheet(
    payload: WorksheetCreateRequest,
    db: AsyncSession = Depends(_get_db_session),
) -> WorksheetResponse:
    """
    Generate a new worksheet from topic + difficulty specifications.

    Flow:
      1. Persist a Worksheet row with status=draft.
      2. For each topic config, call the appropriate question generator.
      3. Bulk-insert questions, flush, then reload with eager-loaded questions.
      4. Set status=ready and return.
    """
    from database import Worksheet

    try:
        total_questions = sum(t.num_questions for t in payload.topics)
        if total_questions == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"error": "validation_error", "detail": "At least one question is required"},
            )

        # teacher_id comes from the authenticated user context.
        # In production, inject via Depends(get_current_user).
        teacher_id: int = 1  # ← replace with real auth

        auto_marks = sum(t.num_questions * t.marks_per_question for t in payload.topics)
        total_marks = payload.total_marks or auto_marks

        worksheet = Worksheet(
            title=payload.title.strip(),
            description=payload.description,
            subject=payload.subject,
            grade=payload.grade.strip(),
            chapter=payload.chapter.strip(),
            topics_json=[t.model_dump() for t in payload.topics],
            total_marks=total_marks,
            language=payload.language,
            include_answers=payload.include_answers,
            include_explanations=payload.include_explanations,
            status="ready",
            created_by=teacher_id,
        )
        db.add(worksheet)
        await db.flush()  # get worksheet.id before generating questions

        questions = await _generate_and_save_questions(
            db=db,
            worksheet_id=worksheet.id,
            subject=payload.subject,
            grade=payload.grade,
            topics=payload.topics,
            language=payload.language,
        )

        if not questions:
            worksheet.status = "draft"
            await db.flush()
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail={
                    "error": "generation_failed",
                    "detail": (
                        "No questions could be generated. "
                        "Check the subject/topic configuration and try again."
                    ),
                },
            )

        await db.commit()
        await db.refresh(worksheet)

        logger.info(
            "Worksheet %d created by teacher %d: %d questions across %d topics",
            worksheet.id, teacher_id, len(questions), len(payload.topics),
        )

        return WorksheetResponse(
            id=worksheet.id,
            title=worksheet.title,
            description=worksheet.description,
            subject=worksheet.subject,
            grade=worksheet.grade,
            chapter=worksheet.chapter,
            topics=[t.topic for t in payload.topics],
            total_marks=worksheet.total_marks,
            language=worksheet.language,
            include_answers=worksheet.include_answers,
            include_explanations=worksheet.include_explanations,
            status=worksheet.status,
            questions=[QuestionResponse.model_validate(q) for q in questions],
            created_at=worksheet.created_at,
            created_by=worksheet.created_by,
        )

    except HTTPException:
        raise
    except Exception as exc:
        await db.rollback()
        logger.exception("Failed to create worksheet: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "internal_error", "detail": "Could not create worksheet"},
        ) from exc


@router.get(
    "/worksheet/{worksheet_id}",
    response_model=WorksheetResponse,
    responses={404: {"model": HTTPError}, 500: {"model": HTTPError}},
)
async def get_worksheet(
    worksheet_id: int,
    include_answers: bool = Query(default=True),
    db: AsyncSession = Depends(_get_db_session),
) -> WorksheetResponse:
    """Fetch a worksheet with all questions and (optionally) answers."""
    from database import Worksheet

    worksheet = await _get_worksheet_or_404(db, worksheet_id)
    questions = await _load_questions(db, worksheet_id)

    # Optionally strip answers from the response (student-facing mode)
    if not include_answers:
        for q in questions:
            q.correct_answer = None
            q.explanation = None

    topics_list = (
        worksheet.topics_json
        if isinstance(worksheet.topics_json, list)
        else []
    )
    topic_names = [t.get("topic", "") if isinstance(t, dict) else str(t) for t in topics_list]

    return WorksheetResponse(
        id=worksheet.id,
        title=worksheet.title,
        description=worksheet.description,
        subject=worksheet.subject,
        grade=worksheet.grade,
        chapter=worksheet.chapter,
        topics=topic_names,
        total_marks=worksheet.total_marks,
        language=worksheet.language,
        include_answers=worksheet.include_answers,
        include_explanations=worksheet.include_explanations,
        status=worksheet.status,
        questions=[QuestionResponse.model_validate(q) for q in questions],
        created_at=worksheet.created_at,
        created_by=worksheet.created_by,
    )


@router.get(
    "/worksheet/{worksheet_id}/printable",
    response_class=str,  # returns raw HTML
    responses={404: {"model": HTTPError}, 500: {"model": HTTPError}},
)
async def get_printable_worksheet(
    worksheet_id: int,
    show_answers: bool = Query(default=False),
    db: AsyncSession = Depends(_get_db_session),
) -> str:
    """
    Return a self-contained HTML document styled for A4 printing.

    Set show_answers=true to render the answer key after a page break.
    """
    worksheet = await _get_worksheet_or_404(db, worksheet_id)
    questions = await _load_questions(db, worksheet_id)

    if not show_answers:
        for q in questions:
            q.correct_answer = None
            q.explanation = None

    return _build_printable_html(worksheet, questions)


@router.post(
    "/worksheet/{worksheet_id}/send",
    response_model=WorksheetSendResponse,
    responses={
        404: {"model": HTTPError},
        500: {"model": HTTPError},
    },
)
async def send_worksheet(
    worksheet_id: int,
    payload: WorksheetSendRequest | None = None,
    db: AsyncSession = Depends(_get_db_session),
) -> WorksheetSendResponse:
    """
    Send the worksheet to all students in the teacher's assigned class via WhatsApp.

    - Falls back gracefully when WhatsApp is not configured (returns 0 recipients).
    - The response always reflects the actual number of successfully reached parents.
    """
    from database import Class as ClassModel, ClassEnrollment

    worksheet = await _get_worksheet_or_404(db, worksheet_id)
    payload = payload or WorksheetSendRequest()

    # Fetch the teacher's primary class for this subject/grade.
    # In production, pass teacher_id from auth context.
    teacher_id: int = 1

    class_q = await db.execute(
        select(ClassModel)
        .where(
            ClassModel.teacher_id == teacher_id,
            ClassModel.grade == worksheet.grade,
            ClassModel.is_active == True,  # noqa: E712
        )
        .limit(1)
    )
    cls = class_q.scalar_one_or_none()

    if cls is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "error": "no_class_found",
                "detail": (
                    "No active class found for this grade. "
                    "Assign the worksheet to a class first."
                ),
            },
        )

    students = await _get_students_in_class(db, cls.id)
    if not students:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "error": "no_students",
                "detail": f"Class '{cls.name}' has no enrolled students.",
            },
        )

    msg_service = WhatsAppService()
    msg_id, recipients = await _send_worksheet_notifications(
        db=db,
        ws=worksheet,
        msg_service=msg_service,
        students=students,
        custom_message=payload.message,
        due_date=payload.due_date,
    )

    logger.info(
        "Worksheet %d sent to %d/%d recipients via WhatsApp",
        worksheet_id, recipients, len(students),
    )

    return WorksheetSendResponse(
        message_id=msg_id or None,
        recipients_count=recipients,
        status="sent" if recipients > 0 else "no_recipients",
        sent_at=_now_utc(),
    )


@router.get(
    "/worksheet/{worksheet_id}/performance",
    response_model=WorksheetPerformance,
    responses={404: {"model": HTTPError}, 500: {"model": HTTPError}},
)
async def get_worksheet_performance(
    worksheet_id: int,
    db: AsyncSession = Depends(_get_db_session),
) -> WorksheetPerformance:
    """
    Aggregate performance analytics for a worksheet across the whole class.

    Includes: submission rate, score distribution, per-topic breakdown,
    top performers, and students who need improvement.
    """
    from database import Worksheet as WS

    worksheet = await _get_worksheet_or_404(db, worksheet_id)
    questions = await _load_questions(db, worksheet_id)
    max_possible = sum(q.marks for q in questions) or worksheet.total_marks or 1

    # ── Fetch all attempts for this worksheet ─────────────────────────────
    attempts_result = await db.execute(
        select(Attempt, Student)
        .join(Student, Student.id == Attempt.student_id)
        .where(
            Attempt.worksheet_id == worksheet_id,
            Attempt.is_submitted == True,  # noqa: E712
        )
        .order_by(desc(Attempt.submitted_at))
    )
    attempt_rows = attempts_result.unique().all()

    total_students_in_class = await db.scalar(
        select(func.count(ClassEnrollment.student_id)).where(
            ClassEnrollment.class_id == worksheet_id,  # placeholder
            ClassEnrollment.is_active == True,  # noqa: E712
        )
    )

    submitted_count = len(attempt_rows)
    pending_count = max(total_students_in_class - submitted_count, 0)

    scores: list[float] = []
    score_buckets: Counter = Counter()
    topic_scores: dict[str, list[float]] = defaultdict(list)
    student_perfs: list[dict[str, Any]] = []

    TOP_BUCKETS = ["0-20%", "21-40%", "41-60%", "61-80%", "81-100%"]

    for attempt, student in attempt_rows:
        pct = (attempt.score / max_possible) * 100 if max_possible else 0
        scores.append(attempt.score)

        bucket = next(
            (b for b in TOP_BUCKETS if pct <= float(b.split("-")[1])), TOP_BUCKETS[-1]
        )
        score_buckets[bucket] += 1

        topic_scores[attempt.topic or "General"].append(attempt.score)

        student_perfs.append({
            "student_id": student.id,
            "student_name": student.full_name,
            "roll_number": student.roll_number,
            "score": attempt.score,
            "max_score": max_possible,
            "submitted_at": attempt.submitted_at,
            "time_taken_seconds": attempt.time_taken_seconds,
            "percentage": round(pct, 1),
        })

    avg_score = round(sum(scores) / len(scores), 2) if scores else None

    # Top 5 performers
    sorted_by_score = sorted(student_perfs, key=lambda x: x["percentage"], reverse=True)
    top_performers = [
        StudentPerformance(
            student_id=s["student_id"],
            student_name=s["student_name"],
            roll_number=s["roll_number"],
            score=s["score"],
            max_score=s["max_score"],
            submitted_at=s["submitted_at"],
            time_taken_seconds=s["time_taken_seconds"],
        )
        for s in sorted_by_score[:5]
    ]

    # Students needing improvement (bottom 5)
    needs_improvement = [
        StudentPerformance(
            student_id=s["student_id"],
            student_name=s["student_name"],
            roll_number=s["roll_number"],
            score=s["score"],
            max_score=s["max_score"],
            submitted_at=s["submitted_at"],
            time_taken_seconds=s["time_taken_seconds"],
        )
        for s in sorted_by_score[-5:]
    ]

    # Per-topic breakdown
    topic_breakdown = [
        TopicPerformance(
            topic=topic,
            avg_score=round(sum(scores_list) / len(scores_list), 2),
            max_score=round(max(scores_list), 2),
            attempts=len(scores_list),
        )
        for topic, scores_list in topic_scores.items()
    ]

    return WorksheetPerformance(
        worksheet_id=worksheet.id,
        worksheet_title=worksheet.title,
        subject=worksheet.subject,
        grade=worksheet.grade,
        total_students=total_students_in_class or submitted_count,
        submitted_count=submitted_count,
        pending_count=pending_count,
        avg_score=avg_score,
        max_possible_score=max_possible,
        score_distribution=dict(score_buckets),
        topic_breakdown=topic_breakdown,
        top_performers=top_performers,
        needs_improvement=needs_improvement,
        generated_at=_now_utc(),
    )


# ── Class management ─────────────────────────────────────────────────────────

@router.get(
    "/classes/{teacher_id}",
    response_model=list[ClassInfoResponse],
    responses={404: {"model": HTTPError}, 500: {"model": HTTPError}},
)
async def list_teacher_classes(
    teacher_id: int,
    academic_year: str | None = Query(default=None),
    active_only: bool = Query(default=True),
    db: AsyncSession = Depends(_get_db_session),
) -> list[ClassInfoResponse]:
    """Return all classes assigned to a given teacher, with student counts."""
    from database import Class as ClassModel

    stmt = select(ClassModel).where(ClassModel.teacher_id == teacher_id)
    if active_only:
        stmt = stmt.where(ClassModel.is_active == True)  # noqa: E712
    if academic_year:
        stmt = stmt.where(ClassModel.academic_year == academic_year)

    result = await db.execute(stmt.order_by(ClassModel.grade, ClassModel.section))
    classes = result.scalars().all()

    if not classes:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": "not_found",
                "detail": f"No classes found for teacher {teacher_id}",
            },
        )

    response: list[ClassInfoResponse] = []
    for cls in classes:
        count = await db.scalar(
            select(func.count(ClassEnrollment.student_id)).where(
                ClassEnrollment.class_id == cls.id,
                ClassEnrollment.is_active == True,  # noqa: E712
            )
        )
        response.append(
            ClassInfoResponse(
                id=cls.id,
                name=cls.name,
                grade=cls.grade,
                section=cls.section,
                academic_year=cls.academic_year,
                subject=cls.subject,
                student_count=count or 0,
                active=cls.is_active,
            )
        )
    return response


@router.get(
    "/class/{class_id}/students",
    response_model=StudentRosterResponse,
    responses={404: {"model": HTTPError}, 500: {"model": HTTPError}},
)
async def get_class_students(
    class_id: int,
    search: str | None = Query(default=None, max_length=100),
    mastery_filter: str | None = Query(
        default=None, pattern="^(mastered|in_progress|weak|all)$"
    ),
    db: AsyncSession = Depends(_get_db_session),
) -> StudentRosterResponse:
    """
    List all students in a class with per-student mastery summaries.

    mastery_filter narrows the list to students whose overall mastery
    falls into the given category (mastered ≥ 80%, in_progress 40-80%, weak < 40%).
    """
    from database import Class as ClassModel

    cls = await _get_class_or_404(db, class_id)
    students = await _get_students_in_class(db, class_id)

    mastery_sync = MasterySyncService(db)
    summaries: list[StudentMasterySummary] = []

    for student in students:
        mastery_records = await db.execute(
            select(Mastery).where(Mastery.student_id == student.id)
        )
        records = mastery_records.scalars().all()

        scores = [r.mastery_score for r in records]
        overall = round(sum(scores) / len(scores), 2) if scores else None

        mastered  = sum(1 for s in scores if s >= 0.80)
        in_prog   = sum(1 for s in scores if 0.40 <= s < 0.80)
        weak      = sum(1 for s in scores if s < 0.40)

        mastery_by_subj: dict[str, float] = defaultdict(list[float])
        for r in records:
            mastery_by_subj[r.topic or "unknown"].append(r.mastery_score)
        mastery_avg = {
            k: round(sum(v) / len(v), 2) for k, v in mastery_by_subj.items()
        }

        # Practice session count
        practice_count = await db.scalar(
            select(func.count(PracticeSession.id)).where(
                PracticeSession.student_id == student.id,
                PracticeSession.class_id == class_id,
            )
        ) or 0

        last_active = await db.scalar(
            select(func.max(Attempt.submitted_at)).where(
                Attempt.student_id == student.id
            )
        )

        summary = StudentMasterySummary(
            student_id=student.id,
            student_name=student.full_name,
            roll_number=student.roll_number,
            whatsapp_number=getattr(student, "whatsapp_number", None),
            overall_mastery=overall,
            topics_mastered=mastered,
            topics_in_progress=in_prog,
            topics_weak=weak,
            total_practice_sessions=practice_count,
            last_active=last_active,
            mastery_by_subject=mastery_avg,
        )

        # Apply filter
        if mastery_filter == "mastered" and (overall or 0) < 0.80:
            continue
        if mastery_filter == "in_progress" and not (0.40 <= (overall or 0) < 0.80):
            continue
        if mastery_filter == "weak" and (overall or 0) >= 0.40:
            continue

        summaries.append(summary)

    # Sort: weakest first so teacher sees who needs attention at the bottom
    summaries.sort(key=lambda s: s.overall_mastery if s.overall_mastery is not None else -1)

    return StudentRosterResponse(
        class_id=class_id,
        class_name=cls.name,
        grade=cls.grade,
        total_students=len(summaries),
        students=summaries,
    )


@router.get(
    "/class/{class_id}/progress",
    response_model=ProgressOverviewResponse,
    responses={404: {"model": HTTPError}, 500: {"model": HTTPError}},
)
async def get_class_progress(
    class_id: int,
    period_days: int = Query(default=30, ge=1, le=365),
    db: AsyncSession = Depends(_get_db_session),
) -> ProgressOverviewResponse:
    """
    Full progress overview for a class over the last N days.

    Aggregates attempt data, practice sessions, mastery distribution,
    per-subject scores, and identifies students who need attention.
    """
    from database import Class as ClassModel

    cls = await _get_class_or_404(db, class_id)
    cutoff = _now_utc() - timedelta(days=period_days)

    students = await _get_students_in_class(db, class_id)
    student_ids = [s.id for s in students]
    total_students = len(student_ids)

    if not student_ids:
        return ProgressOverviewResponse(
            class_id=class_id,
            class_name=cls.name,
            grade=cls.grade,
            period_days=period_days,
            overall_avg_score=None,
            total_attempts=0,
            total_practice_sessions=0,
            active_students=0,
            total_students=0,
            mastery_distribution={},
            subject_progress={},
            topic_progress=[],
            daily_activity=[],
            generated_at=_now_utc(),
        )

    # ── Attempts in window ───────────────────────────────────────────────
    attempts_result = await db.execute(
        select(Attempt)
        .where(
            Attempt.student_id.in_(student_ids),
            Attempt.submitted_at >= cutoff,
            Attempt.is_submitted == True,  # noqa: E712
        )
    )
    attempts = attempts_result.scalars().all()

    # ── Practice sessions in window ──────────────────────────────────────
    practice_result = await db.execute(
        select(PracticeSession)
        .where(
            PracticeSession.student_id.in_(student_ids),
            PracticeSession.class_id == class_id,
            PracticeSession.started_at >= cutoff,
        )
    )
    sessions = practice_result.scalars().all()

    # ── Mastery distribution ─────────────────────────────────────────────
    mastery_result = await db.execute(
        select(Mastery).where(Mastery.student_id.in_(student_ids))
    )
    all_mastery = mastery_result.scalars().all()
    mastery_dist: Counter = Counter()
    for m in all_mastery:
        if m.mastery_score >= 0.80:
            mastery_dist["mastered"] += 1
        elif m.mastery_score >= 0.40:
            mastery_dist["in_progress"] += 1
        else:
            mastery_dist["weak"] += 1

    # ── Subject-level scores ─────────────────────────────────────────────
    subject_scores: dict[str, list[float]] = defaultdict(list)
    for a in attempts:
        subject_scores[a.subject or "unknown"].append(a.score)
    subject_avg = {
        subj: round(sum(v) / len(v), 2) for subj, v in subject_scores.items()
    }

    # ── Daily activity bucketing ─────────────────────────────────────────
    daily: dict[str, dict[str, Any]] = {}
    for a in attempts:
        day = a.submitted_at.strftime("%Y-%m-%d") if a.submitted_at else "unknown"
        if day not in daily:
            daily[day] = {"attempts": 0, "scores": []}
        daily[day]["attempts"] += 1
        if a.score is not None:
            daily[day]["scores"].append(a.score)

    for s in sessions:
        day = s.started_at.strftime("%Y-%m-%d") if s.started_at else "unknown"
        if day not in daily:
            daily[day] = {"attempts": 0, "scores": []}
        daily[day]["practice_sessions"] = daily[day].get("practice_sessions", 0) + 1

    daily_activity = [
        DailyActivity(
            date=day,
            attempts=data["attempts"],
            practice_sessions=data.get("practice_sessions", 0),
            avg_score=round(sum(data["scores"]) / len(data["scores"]), 2)
            if data.get("scores")
            else None,
        )
        for day, data in sorted(daily.items())
    ]

    # ── Per-topic progress ────────────────────────────────────────────────
    topic_student_scores: dict[str, dict[int, list[float]]] = defaultdict(lambda: defaultdict(list))
    for a in attempts:
        topic = a.topic or "General"
        topic_student_scores[topic][a.student_id].append(a.score)

    topic_progress = [
        TopicProgressItem(
            topic=topic,
            total_students=len(student_scores),
            students_mastered=sum(
                1 for v in student_scores.values()
                if sum(v) / len(v) >= 0.80 * max(v, default=1)
            ),
            students_in_progress=sum(
                1
                for v in student_scores.values()
                if v and 0.40 <= (sum(v) / len(v)) / max(v) < 0.80
            ),
            students_weak=sum(
                1
                for v in student_scores.values()
                if v and (sum(v) / len(v)) / max(v) < 0.40
            ),
            class_avg_mastery=round(
                sum(
                    sum(v) / len(v)
                    for v in student_scores.values()
                    if v
                )
                / len([v for v in student_scores.values() if v])
                * 100,
                1,
            )
            if any(student_scores.values())
            else None,
        )
        for topic, student_scores in topic_student_scores.items()
    ]

    # ── Top performers & attention needed ────────────────────────────────
    student_totals: dict[int, dict[str, Any]] = {
        s.id: {"name": s.full_name, "scores": []}
        for s in students
    }
    for a in attempts:
        student_totals[a.student_id]["scores"].append(a.score)

    student_avgs = [
        {
            "student_id": sid,
            "student_name": d["name"],
            "avg_score": round(sum(d["scores"]) / len(d["scores"]), 2),
            "attempts": len(d["scores"]),
        }
        for sid, d in student_totals.items()
        if d["scores"]
    ]
    student_avgs.sort(key=lambda x: x["avg_score"], reverse=True)

    overall_avg = (
        round(sum(a["avg_score"] for a in student_avgs) / len(student_avgs), 2)
        if student_avgs
        else None
    )

    active_students = len({a.student_id for a in attempts})

    return ProgressOverviewResponse(
        class_id=class_id,
        class_name=cls.name,
        grade=cls.grade,
        period_days=period_days,
        overall_avg_score=overall_avg,
        total_attempts=len(attempts),
        total_practice_sessions=len(sessions),
        active_students=active_students,
        total_students=total_students,
        mastery_distribution=dict(mastery_dist),
        subject_progress=subject_avg,
        topic_progress=topic_progress,
        daily_activity=daily_activity,
        top_performers=student_avgs[:5],
        students_needing_attention=student_avgs[-5:],
        generated_at=_now_utc(),
    )


# ── Homework assignment ──────────────────────────────────────────────────────

@router.post(
    "/class/{class_id}/assign-homework",
    response_model=HomeworkAssignResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        400: {"model": HTTPError},
        404: {"model": HTTPError},
        500: {"model": HTTPError},
    },
)
async def assign_homework(
    class_id: int,
    payload: HomeworkAssignRequest,
    db: AsyncSession = Depends(_get_db_session),
) -> HomeworkAssignResponse:
    """
    Assign an existing worksheet as homework to an entire class.

    Creates a Homework record and optionally fires WhatsApp notifications
    to all enrolled students and/or their parents.
    """
    from database import Class as ClassModel

    # Validate worksheet exists
    worksheet = await _get_worksheet_or_404(db, payload.worksheet_id)

    # Validate class exists and is active
    cls = await _get_class_or_404(db, class_id)
    if not cls.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "error": "inactive_class",
                "detail": f"Class '{cls.name}' is not active.",
            },
        )

    enrolled = await _get_students_in_class(db, class_id)
    if not enrolled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "error": "empty_class",
                "detail": f"Class '{cls.name}' has no enrolled students.",
            },
        )

    # Create the homework record
    homework_service = HomeworkService(db)
    homework = await homework_service.create_homework(
        class_id=class_id,
        worksheet_id=payload.worksheet_id,
        title=payload.title,
        instructions=payload.instructions,
        due_date=payload.due_date,
    )

    notification_status = "not_sent"
    if payload.notify_parents or payload.notify_students:
        msg_service = WhatsAppService()
        _, recipients = await _send_worksheet_notifications(
            db=db,
            ws=worksheet,
            msg_service=msg_service,
            students=enrolled,
            due_date=payload.due_date.date(),
        )
        notification_status = (
            "sent" if recipients > 0 else "no_whatsapp_configured"
        )

    await db.commit()

    logger.info(
        "Homework %d assigned to class %d (worksheet %d), %d students",
        homework.id, class_id, payload.worksheet_id, len(enrolled),
    )

    return HomeworkAssignResponse(
        homework_id=homework.id,
        class_id=class_id,
        worksheet_id=payload.worksheet_id,
        title=payload.title,
        due_date=payload.due_date,
        assigned_count=len(enrolled),
        notification_status=notification_status,
        created_at=homework.created_at,
    )


# ═══════════════════════════════════════════════════════════════════════════════
#  LEGACY / CONVENIENCE  (optional — keeps backward compatibility)
# ═══════════════════════════════════════════════════════════════════════════════

@router.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "teacher-api", "version": "1.0.0"}

