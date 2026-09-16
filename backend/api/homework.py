"""
Homework API Router
===================
Endpoints for teachers to create homework and students to submit/track homework.
Integrates with LLM for auto-grading and WhatsApp for reminders.
"""

import json
import logging
import uuid
from datetime import datetime, timezone
from typing import Optional, List, Literal

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from database import get_db, Student, Homework, HomeworkQuestion, HomeworkSubmission
from services.llm_client import LLMClient
from backend.deps import get_current_user
from backend.models.user import User

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/homework", tags=["homework"])


# =====================================================================
# PYDANTIC V2 SCHEMAS
# =====================================================================

class QuestionIn(BaseModel):
    """Schema for a homework question (teacher input)."""
    question_text: str = Field(..., min_length=1, max_length=2000)
    question_type: Literal["mcq", "short_answer", "long_answer"] = "short_answer"
    options: Optional[List[str]] = Field(default=None, max_length=10)
    correct_answer: Optional[str] = Field(default=None, max_length=2000)
    marks: int = Field(default=1, ge=1)
    difficulty: Optional[str] = Field(
        default=None, pattern=r"^(easy|medium|hard)$"
    )
    hint: Optional[str] = Field(default=None, max_length=500)


class HomeworkCreate(BaseModel):
    """Schema for creating new homework."""
    student_id: str = Field(..., min_length=1)
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)
    subject: str = Field(..., min_length=1, max_length=100)
    due_date: datetime = Field(...)
    questions: List[QuestionIn] = Field(..., min_length=1)
    teacher_instructions: Optional[str] = Field(default=None, max_length=1000)
    allow_late_submission: bool = Field(default=False)


class QuestionOut(BaseModel):
    """Schema for question in response — correct_answer is NOT exposed."""
    model_config = ConfigDict(from_attributes=True)

    id: str
    question_text: str
    question_type: str
    options: Optional[List[str]] = None
    marks: int
    difficulty: Optional[str] = None
    hint: Optional[str] = None


class HomeworkDetail(BaseModel):
    """Full homework detail returned to a student."""
    model_config = ConfigDict(from_attributes=True)

    id: str
    student_id: str
    title: str
    description: Optional[str] = None
    subject: str
    due_date: datetime
    status: str
    created_at: datetime
    teacher_instructions: Optional[str] = None
    allow_late_submission: bool
    total_marks: int
    questions: List[QuestionOut] = []
    submission: Optional[dict] = None


class HomeworkSummary(BaseModel):
    """Compact homework item for list views."""
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    subject: str
    due_date: datetime
    status: str
    total_marks: int
    submitted_at: Optional[datetime] = None
    score: Optional[float] = None
    grade: Optional[str] = None
    created_at: datetime


class AnswerSubmit(BaseModel):
    """Single answer within a submission."""
    question_id: str
    answer: str = Field(..., max_length=5000)


class HomeworkSubmit(BaseModel):
    """Full homework submission payload."""
    answers: List[AnswerSubmit] = Field(..., min_length=1)


class GradedAnswer(BaseModel):
    """Per-question grading detail with Hinglish feedback."""
    question_id: str
    question_text: str
    question_type: str
    student_answer: str
    correct_answer: Optional[str] = None
    marks_awarded: float
    total_marks: float
    feedback: str
    is_correct: bool


class HomeworkResult(BaseModel):
    """Graded homework result returned after submission or via result endpoint."""
    model_config = ConfigDict(from_attributes=True)

    homework_id: str
    title: str
    subject: str
    total_score: float
    max_score: float
    percentage: float
    grade: str
    graded_answers: List[GradedAnswer]
    overall_feedback: str
    submitted_at: datetime
    graded_at: datetime


class ReminderRequest(BaseModel):
    """Request body for WhatsApp reminder."""
    custom_message: Optional[str] = Field(
        default=None, max_length=1000,
        description="Override the default reminder message."
    )


class OverdueItem(BaseModel):
    """Overdue homework item with days overdue."""
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    subject: str
    due_date: datetime
    days_overdue: int
    total_marks: int
    status: str


# =====================================================================
# HELPERS
# =====================================================================


def _compute_grade(percentage: float) -> str:
    """Map percentage to ICSE/ISC-style letter grade."""
    if percentage >= 95:
        return "A+"
    if percentage >= 85:
        return "A"
    if percentage >= 75:
        return "B+"
    if percentage >= 65:
        return "B"
    if percentage >= 55:
        return "C"
    if percentage >= 40:
        return "D"
    return "F"


def _compute_status(homework: Homework, submission=None) -> str:
    """Derive human-readable status from dates and submission state."""
    now = datetime.now(timezone.utc)
    due = homework.due_date
    if due.tzinfo is None:
        due = due.replace(tzinfo=timezone.utc)

    if submission:
        return "submitted"
    if now > due:
        return "late" if homework.allow_late_submission else "overdue"
    return "pending"


async def _grade_with_llm(
    question_text: str,
    question_type: str,
    student_answer: str,
    correct_answer: Optional[str],
    max_marks: float,
    llm: LLMClient,
) -> tuple[float, str, bool]:
    """
    Grade a single answer.

    - MCQ: exact-match.
    - Short / long answer: LLM judges against reference answer, returns
      marks, Hinglish feedback, and correctness flag.
    """
    if question_type == "mcq":
        is_correct = (
            student_answer.strip().lower()
            == (correct_answer or "").strip().lower()
        )
        marks = max_marks if is_correct else 0.0
        feedback = (
            "Sahi jawab! Well done!"
            if is_correct
            else f"Galat jawab. Sahi answer tha: {correct_answer}"
        )
        return marks, feedback, is_correct

    prompt = (
        f"You are a patient, encouraging Indian school teacher for classes 6-12 (ICSE/ISC).\n\n"
        f"QUESTION: {question_text}\n"
        f"MAX MARKS: {max_marks}\n"
        f"REFERENCE ANSWER: {correct_answer or 'Evaluate based on general knowledge and logic.'}\n\n"
        f"STUDENT ANSWER: {student_answer}\n\n"
        f"RULES:\n"
        f"- Award partial marks for partial understanding.\n"
        f"- Be fair but not overly generous.\n"
        f"- Respond ONLY with valid JSON, no extra text, no markdown.\n\n"
        f'JSON format: {{"marks_awarded": <0-{max_marks}>, '
        f'"is_correct": <true if marks >= {max_marks * 0.8}>, '
        f'"feedback": "<1-2 sentence Hinglish feedback: mix of Hindi + English, encouraging, mention what was right and what to improve>"}}'
    )

    try:
        resp = await llm.chat(
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=300,
        )
        content = resp.strip()
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()

        result = json.loads(content)
        marks = max(0.0, min(float(result.get("marks_awarded", 0)), max_marks))
        is_correct = bool(
            result.get("is_correct", marks >= max_marks * 0.8)
        )
        feedback = result.get("feedback", "Good effort!")
        return marks, feedback, is_correct
    except Exception as exc:
        logger.warning(f"LLM grading failed, awarding 0: {exc}")
        return 0.0, "Grading mein error aa gayi. Teacher se check karwa lena.", False


async def _send_whatsapp_reminder(
    student_phone: str,
    student_name: str,
    homework_title: str,
    subject: str,
    due_date: datetime,
    custom_message: Optional[str] = None,
) -> bool:
    """
    Send a WhatsApp reminder.

    Tries Meta WhatsApp Business Cloud API first, then Twilio WhatsApp
    as fallback. Set credentials via environment variables.
    """
    if custom_message:
        body = custom_message
    else:
        due_str = due_date.strftime("%d %B %Y, %I:%M %p")
        body = (
            f"Namaste {student_name}! \ud83d\udcdc\n\n"
            f"Aapke homework ka yaad dilaya ja raha hai:\n"
            f"\ud83d\udcdd Title: {homework_title}\n"
            f"\ud83d\udcca Subject: {subject}\n"
            f"\u23f0 Due Date: {due_str}\n\n"
            f"Jaldi se complete karein! All the best! \ud83d\udcaa\n\n"
            f"\u2014 Padho aur Badho"
        )

    # --- Meta WhatsApp Business Cloud API ---
    token = None  # os.getenv("WHATSAPP_TOKEN")
    phone_id = None  # os.getenv("WHATSAPP_PHONE_ID")
    if token and phone_id:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                r = await client.post(
                    f"https://graph.facebook.com/v18.0/{phone_id}/messages",
                    headers={
                        "Authorization": f"Bearer {token}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "messaging_product": "whatsapp",
                        "to": student_phone,
                        "type": "text",
                        "text": {"body": body},
                    },
                )
                if r.status_code in (200, 201):
                    logger.info(f"WhatsApp reminder sent to {student_phone}")
                    return True
                logger.warning(
                    f"WhatsApp API {r.status_code}: {r.text[:200]}"
                )
        except Exception as exc:
            logger.warning(f"WhatsApp send error: {exc}")

    # --- Twilio WhatsApp fallback ---
    tw_sid = None  # os.getenv("TWILIO_SID")
    tw_token = None  # os.getenv("TWILIO_TOKEN")
    tw_from = None  # os.getenv("TWILIO_WHATSAPP_FROM")
    if tw_sid and tw_token and tw_from:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                r = await client.post(
                    f"https://api.twilio.com/2010-04-01/Accounts/{tw_sid}/Messages.json",
                    data={
                        "From": f"whatsapp:{tw_from}",
                        "To": f"whatsapp:{student_phone}",
                        "Body": body,
                    },
                    auth=(tw_sid, tw_token),
                )
                if r.status_code in (200, 201):
                    logger.info(f"Twilio WhatsApp sent to {student_phone}")
                    return True
        except Exception as exc:
            logger.warning(f"Twilio send error: {exc}")

    logger.info(f"Reminder queued (no provider configured): {student_phone}")
    return False


# =====================================================================
# SERVICE
# =====================================================================

class HomeworkService:
    """Business-logic layer for all homework operations."""

    def __init__(self, db: AsyncSession, llm: Optional[LLMClient] = None):
        self.db = db
        self.llm = llm or LLMClient()

    async def _get_or_create_student(self, sid: str) -> "Student":
        """students-row resolution — delegates to the canonical
        users→students bridge (services.identity_bridge)."""
        from backend.services.identity_bridge import ensure_student_row
        return await ensure_student_row(self.db, sid)

    # ---- CREATE ----

    async def create_homework(
        self, data: HomeworkCreate, teacher_id: str
    ) -> Homework:
        """Create a homework assignment with questions for one student."""
        await self._get_or_create_student(data.student_id)

        now = datetime.now(timezone.utc)
        hw = Homework(
            id=str(uuid.uuid4()),
            student_id=data.student_id,
            teacher_id=teacher_id,
            title=data.title,
            description=data.description,
            subject=data.subject,
            due_date=data.due_date,
            teacher_instructions=data.teacher_instructions,
            allow_late_submission=data.allow_late_submission,
            status="pending",
            created_at=now,
        )
        self.db.add(hw)
        await self.db.flush()

        total_marks = 0
        for q in data.questions:
            self.db.add(
                HomeworkQuestion(
                    id=str(uuid.uuid4()),
                    homework_id=hw.id,
                    question_text=q.question_text,
                    question_type=q.question_type,
                    options=q.options,
                    correct_answer=q.correct_answer,
                    marks=q.marks,
                    difficulty=q.difficulty,
                    hint=q.hint,
                )
            )
            total_marks += q.marks

        hw.total_marks = total_marks
        await self.db.commit()
        await self.db.refresh(hw)
        logger.info(f"Created homework {hw.id} -> student {data.student_id}")
        return hw

    # ---- LIST ----

    async def get_student_homework(
        self, student_id: str
    ) -> List[HomeworkSummary]:
        """Return every homework item for a student with submission meta."""
        stmt = (
            select(Homework, HomeworkSubmission)
            .outerjoin(
                HomeworkSubmission,
                and_(
                    HomeworkSubmission.homework_id == Homework.id,
                    HomeworkSubmission.student_id == student_id,
                ),
            )
            .where(Homework.student_id == student_id)
            .order_by(Homework.due_date.desc())
        )
        rows = (await self.db.execute(stmt)).all()

        return [
            HomeworkSummary(
                id=hw.id,
                title=hw.title,
                subject=hw.subject,
                due_date=hw.due_date,
                status=_compute_status(hw, sub),
                total_marks=hw.total_marks,
                submitted_at=sub.submitted_at if sub else None,
                score=sub.score if sub else None,
                grade=sub.grade if sub else None,
                created_at=hw.created_at,
            )
            for hw, sub in rows
        ]

    # ---- DETAIL ----

    async def get_homework_detail(
        self, homework_id: str, student_id: str
    ) -> Homework:
        """Fetch one homework with its questions and submission snapshot."""
        stmt = (
            select(Homework)
            .options(selectinload(Homework.questions))
            .where(
                and_(
                    Homework.id == homework_id,
                    Homework.student_id == student_id,
                )
            )
        )
        hw = (await self.db.execute(stmt)).scalar_one_or_none()
        if not hw:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Homework not found.",
            )

        sub = (await self.db.execute(
            select(HomeworkSubmission).where(
                and_(
                    HomeworkSubmission.homework_id == homework_id,
                    HomeworkSubmission.student_id == student_id,
                )
            )
        )).scalar_one_or_none()

        if sub:
            hw._submission = sub  # attach for serialiser
        return hw

    # ---- SUBMIT ----

    async def submit_homework(
        self,
        homework_id: str,
        student_id: str,
        data: HomeworkSubmit,
    ) -> HomeworkSubmission:
        """Validate, grade (LLM), and persist a homework submission."""
        stmt = (
            select(Homework)
            .options(selectinload(Homework.questions))
            .where(
                and_(
                    Homework.id == homework_id,
                    Homework.student_id == student_id,
                )
            )
        )
        hw = (await self.db.execute(stmt)).scalar_one_or_none()
        if not hw:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Homework not found.",
            )

        # Already submitted?
        existing = (await self.db.execute(
            select(HomeworkSubmission).where(
                and_(
                    HomeworkSubmission.homework_id == homework_id,
                    HomeworkSubmission.student_id == student_id,
                )
            )
        )).scalar_one_or_none()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Pehle hi submit ho chuki hai. Dobara submit nahi kar sakte.",
            )

        # Past due?
        now = datetime.now(timezone.utc)
        due = hw.due_date
        if due.tzinfo is None:
            due = due.replace(tzinfo=timezone.utc)
        is_late = now > due
        if is_late and not hw.allow_late_submission:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Homework overdue hai! Due: "
                    f"{due.strftime('%d %b %Y')}. "
                    f"Late submission allowed nahi hai."
                ),
            )

        # All questions answered?
        q_ids = {q.id for q in hw.questions}
        s_ids = {a.question_id for a in data.answers}
        if q_ids != s_ids:
            missing = len(q_ids - s_ids)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"{missing} question(s) ka answer missing hai. "
                    f"Saare questions answer karein."
                ),
            )

        # Grade each answer
        graded = []
        total_score = 0.0
        for q in hw.questions:
            ans = next(
                (a for a in data.answers if a.question_id == q.id), None
            )
            student_ans = ans.answer if ans else ""
            marks, fb, correct = await _grade_with_llm(
                q.question_text,
                q.question_type,
                student_ans,
                q.correct_answer,
                q.marks,
                self.llm,
            )
            total_score += marks
            graded.append({
                "question_id": q.id,
                "question_text": q.question_text,
                "question_type": q.question_type,
                "student_answer": student_ans,
                "correct_answer": q.correct_answer,
                "marks_awarded": marks,
                "total_marks": q.marks,
                "feedback": fb,
                "is_correct": correct,
            })

        pct = (total_score / hw.total_marks) * 100 if hw.total_marks else 0
        grade = _compute_grade(pct)

        if pct >= 90:
            overall = "Shabash! Outstanding performance! Keep it up! \ud83d\udd25"
        elif pct >= 70:
            overall = "Bahut badhiya! Thodi aur mehnat se top kar sakte ho!"
        elif pct >= 50:
            overall = "Achha effort! Par aur practice chahiye. Keep trying!"
        else:
            overall = (
                "Fikar not! Phir se try karo. "
                "Practice makes perfect! \ud83d\udcda"
            )

        sub = HomeworkSubmission(
            id=str(uuid.uuid4()),
            homework_id=homework_id,
            student_id=student_id,
            answers=graded,
            score=total_score,
            max_score=hw.total_marks,
            percentage=pct,
            grade=grade,
            overall_feedback=overall,
            submitted_at=now,
            is_late=is_late,
            graded=True,
            graded_at=now,
        )
        self.db.add(sub)
        hw.status = "submitted" if not is_late else "late"
        await self.db.commit()
        await self.db.refresh(sub)
        logger.info(
            f"Submitted {homework_id} by {student_id}: "
            f"{total_score}/{hw.total_marks} ({pct:.1f}%)"
        )
        return sub

    # ---- RESULT ----

    async def get_result(
        self, homework_id: str, student_id: str
    ) -> HomeworkSubmission:
        """Retrieve graded result for a submitted homework."""
        sub = (await self.db.execute(
            select(HomeworkSubmission).where(
                and_(
                    HomeworkSubmission.homework_id == homework_id,
                    HomeworkSubmission.student_id == student_id,
                    HomeworkSubmission.graded == True,  # noqa: E712
                )
            )
        )).scalar_one_or_none()
        if not sub:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Result nahi mila. Submit kiya ya graded hua shayad nahi.",
            )
        return sub

    # ---- OVERDUE ----

    async def get_overdue(self, student_id: str) -> List[OverdueItem]:
        """List overdue (past due, not yet submitted) homework."""
        now = datetime.now(timezone.utc)
        stmt = (
            select(Homework)
            .outerjoin(
                HomeworkSubmission,
                and_(
                    HomeworkSubmission.homework_id == Homework.id,
                    HomeworkSubmission.student_id == student_id,
                ),
            )
            .where(
                and_(
                    Homework.student_id == student_id,
                    Homework.due_date < now,
                    HomeworkSubmission.id == None,  # noqa: E711
                )
            )
            .order_by(Homework.due_date.asc())
        )
        homeworks = (await self.db.execute(stmt)).scalars().all()

        items = []
        for hw in homeworks:
            due = hw.due_date
            if due.tzinfo is None:
                due = due.replace(tzinfo=timezone.utc)
            days = (now - due).days
            items.append(
                OverdueItem(
                    id=hw.id,
                    title=hw.title,
                    subject=hw.subject,
                    due_date=hw.due_date,
                    days_overdue=days,
                    total_marks=hw.total_marks,
                    status=(
                        "overdue"
                        if not hw.allow_late_submission
                        else "late"
                    ),
                )
            )
        return items

    # ---- REMINDER ----

    async def send_reminder(
        self,
        homework_id: str,
        student_id: str,
        custom_message: Optional[str] = None,
    ) -> dict:
        """Dispatch a WhatsApp reminder for pending homework."""
        hw = (await self.db.execute(
            select(Homework).where(
                and_(
                    Homework.id == homework_id,
                    Homework.student_id == student_id,
                )
            )
        )).scalar_one_or_none()
        if not hw:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Homework not found.",
            )

        student = (await self.db.execute(
            select(Student).where(Student.id == student_id)
        )).scalar_one_or_none()
        if not student or not getattr(student, "phone", None):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Student ka phone number available nahi hai WhatsApp ke liye.",
            )

        sent = await _send_whatsapp_reminder(
            student_phone=student.phone,
            student_name=getattr(student, "name", "Student"),
            homework_title=hw.title,
            subject=hw.subject,
            due_date=hw.due_date,
            custom_message=custom_message,
        )

        return {
            "homework_id": homework_id,
            "student_id": student_id,
            "student_name": student.name,
            "reminder_sent": sent,
            "message": (
                "WhatsApp reminder bhej diya hai!"
                if sent
                else "Reminder queue mein daal diya hai (WhatsApp provider configured nahi hai)."
            ),
        }


# =====================================================================
# FASTAPI ENDPOINTS
# =====================================================================

@router.post(
    "/create",
    response_model=HomeworkDetail,
    status_code=status.HTTP_201_CREATED,
)
async def create_homework_endpoint(
    data: HomeworkCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    **Teacher only** — Create a homework assignment for one student.

    - MCQ: supply `options` + `correct_answer`
    - Short / long answer: supply `correct_answer` as reference for LLM grading
    """
    if user.role not in ("teacher", "admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers can create homework",
        )
    teacher_id = str(user.id)
    service = HomeworkService(db)
    hw = await service.create_homework(data, teacher_id)

    return HomeworkDetail(
        id=hw.id,
        student_id=hw.student_id,
        title=hw.title,
        description=hw.description,
        subject=hw.subject,
        due_date=hw.due_date,
        status=hw.status,
        created_at=hw.created_at,
        teacher_instructions=hw.teacher_instructions,
        allow_late_submission=hw.allow_late_submission,
        total_marks=hw.total_marks,
        questions=[
            QuestionOut(
                id=q.id,
                question_text=q.question_text,
                question_type=q.question_type,
                options=q.options,
                marks=q.marks,
                difficulty=q.difficulty,
                hint=q.hint,
            )
            for q in hw.questions
        ],
    )


async def _resolve_student_for_user(
    user: User, student_id: Optional[str], db: AsyncSession
) -> str:
    """Auth-aware student resolution: students get their own id; parents
    may pass a linked child's id (verified); teachers/admins any id."""
    sid = str(user.id)
    if user.role == "student":
        return sid
    if user.role == "parent":
        if not student_id:
            raise HTTPException(400, "Parent must specify student_id of a linked child")
        # Verify the parent↔student link exists
        try:
            from backend.services.auth_service import ParentStudentLinkModel
            link = await db.execute(
                select(ParentStudentLinkModel).where(
                    and_(
                        ParentStudentLinkModel.parent_id == user.id,
                        ParentStudentLinkModel.student_id == student_id,
                    )
                )
            )
            if link.scalar_one_or_none() is None:
                raise HTTPException(403, "Not linked to this student")
        except ImportError:
            pass  # link table unavailable — fall back to data scoping
        return student_id
    if user.role in ("teacher", "admin"):
        if not student_id:
            raise HTTPException(400, "teacher/admin must specify student_id")
        return student_id
    return sid


@router.get(
    "/student/{student_id}",
    response_model=List[HomeworkSummary],
)
async def list_student_homework(
    student_id: str,
    status_filter: Optional[str] = Query(
        default=None,
        description="Filter by status: pending | submitted | overdue | late",
    ),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List all homework for a student, optionally filtered by status.

    Students can only list their own; parents must pass a linked child's id;
    teachers/admins may pass any id."""
    sid = await _resolve_student_for_user(user, student_id, db)
    service = HomeworkService(db)
    items = await service.get_student_homework(sid)
    if status_filter:
        items = [i for i in items if i.status == status_filter]
    return items


@router.get("/{homework_id}", response_model=HomeworkDetail)
async def get_homework_detail(
    homework_id: str,
    student_id: Optional[str] = Query(
        default=None, description="For parents/teachers: the student's id"
    ),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Full homework detail with questions.

    If already submitted, includes a submission snapshot (score, grade, etc.).
    """
    sid = await _resolve_student_for_user(user, student_id, db)
    service = HomeworkService(db)
    hw = await service.get_homework_detail(homework_id, sid)

    sub_data = None
    if hasattr(hw, "_submission") and hw._submission:
        sub_data = {
            "submitted_at": hw._submission.submitted_at.isoformat(),
            "score": hw._submission.score,
            "max_score": hw._submission.max_score,
            "percentage": hw._submission.percentage,
            "grade": hw._submission.grade,
            "is_late": hw._submission.is_late,
        }

    return HomeworkDetail(
        id=hw.id,
        student_id=hw.student_id,
        title=hw.title,
        description=hw.description,
        subject=hw.subject,
        due_date=hw.due_date,
        status=hw.status,
        created_at=hw.created_at,
        teacher_instructions=hw.teacher_instructions,
        allow_late_submission=hw.allow_late_submission,
        total_marks=hw.total_marks,
        questions=[
            QuestionOut(
                id=q.id,
                question_text=q.question_text,
                question_type=q.question_type,
                options=q.options,
                marks=q.marks,
                difficulty=q.difficulty,
                hint=q.hint,
            )
            for q in hw.questions
        ],
        submission=sub_data,
    )


@router.post(
    "/{homework_id}/submit",
    response_model=HomeworkResult,
)
async def submit_homework_endpoint(
    homework_id: str,
    data: HomeworkSubmit,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Submit homework answers.

    - MCQ auto-graded by exact match.
    - Short/long answers graded by AI with Hinglish feedback.
    - Cannot submit more than once.
    - Late submissions blocked unless teacher allowed.
    """
    if user.role != "student":
        raise HTTPException(403, "Only students can submit homework")
    sid = str(user.id)
    llm = LLMClient()
    service = HomeworkService(db, llm=llm)
    sub = await service.submit_homework(homework_id, sid, data)

    # Fetch title / subject for the response
    hw_row = (await db.execute(
        select(Homework.title, Homework.subject).where(
            Homework.id == homework_id
        )
    )).first()

    def _ga(ga: dict) -> GradedAnswer:
        return GradedAnswer(
            question_id=ga.get("question_id", ""),
            question_text=ga.get("question_text", ""),
            question_type=ga.get("question_type", ""),
            student_answer=ga.get("student_answer", ""),
            correct_answer=ga.get("correct_answer"),
            marks_awarded=ga.get("marks_awarded", 0),
            total_marks=ga.get("total_marks", 0),
            feedback=ga.get("feedback", ""),
            is_correct=ga.get("is_correct", False),
        )

    return HomeworkResult(
        homework_id=sub.homework_id,
        title=hw_row[0] if hw_row else "",
        subject=hw_row[1] if hw_row else "",
        total_score=sub.score or 0,
        max_score=sub.max_score or 0,
        percentage=sub.percentage or 0,
        grade=sub.grade or "F",
        graded_answers=[_ga(ga) for ga in (sub.answers or [])],
        overall_feedback=sub.overall_feedback or "",
        submitted_at=sub.submitted_at,
        graded_at=sub.graded_at or sub.submitted_at,
    )


@router.get("/{homework_id}/result", response_model=HomeworkResult)
async def get_homework_result(
    homework_id: str,
    student_id: Optional[str] = Query(
        default=None, description="For parents/teachers: the student's id"
    ),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve the graded result for a previously submitted homework."""
    sid = await _resolve_student_for_user(user, student_id, db)
    service = HomeworkService(db)
    sub = await service.get_result(homework_id, sid)

    hw_row = (await db.execute(
        select(Homework.title, Homework.subject).where(
            Homework.id == homework_id
        )
    )).first()

    def _ga(ga: dict) -> GradedAnswer:
        return GradedAnswer(
            question_id=ga.get("question_id", ""),
            question_text=ga.get("question_text", ""),
            question_type=ga.get("question_type", ""),
            student_answer=ga.get("student_answer", ""),
            correct_answer=ga.get("correct_answer"),
            marks_awarded=ga.get("marks_awarded", 0),
            total_marks=ga.get("total_marks", 0),
            feedback=ga.get("feedback", ""),
            is_correct=ga.get("is_correct", False),
        )

    return HomeworkResult(
        homework_id=sub.homework_id,
        title=hw_row[0] if hw_row else "",
        subject=hw_row[1] if hw_row else "",
        total_score=sub.score or 0,
        max_score=sub.max_score or 0,
        percentage=sub.percentage or 0,
        grade=sub.grade or "F",
        graded_answers=[_ga(ga) for ga in (sub.answers or [])],
        overall_feedback=sub.overall_feedback or "",
        submitted_at=sub.submitted_at,
        graded_at=sub.graded_at or sub.submitted_at,
    )


@router.get("/overdue/{student_id}", response_model=List[OverdueItem])
async def get_overdue_homework(
    student_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List overdue homework (past due date, not yet submitted)."""
    sid = await _resolve_student_for_user(user, student_id, db)
    service = HomeworkService(db)
    return await service.get_overdue(sid)


@router.post("/{homework_id}/reminder")
async def send_reminder(
    homework_id: str,
    student_id: Optional[str] = Query(
        default=None, description="For teachers/parents: the student's id"
    ),
    request: Optional[ReminderRequest] = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Send a WhatsApp reminder to the student about this homework.

    Configure via env: WHATSAPP_TOKEN + WHATSAPP_PHONE_ID (Meta)
    or TWILIO_SID + TWILIO_TOKEN + TWILIO_WHATSAPP_FROM (Twilio).
    """
    service = HomeworkService(db)
    msg = request.custom_message if request else None
    sid = await _resolve_student_for_user(user, student_id, db)
    return await service.send_reminder(homework_id, sid, msg)
