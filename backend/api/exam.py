"""
Exam API Router — K-12 Learning Platform (ICSE/ISC aligned)
==========================================================
Exam lifecycle: create → submit → result → strategy → history.
Integrates: QuestionSelector, PracticeService, MasterySyncService.

Endpoints:
  POST   /api/exam/create              ← नया exam session बनाएं
  POST   /api/exam/{id}/submit         ← answers जमा करें
  GET    /api/exam/{id}/result         ← full result with topic breakdown
  GET    /api/exam/{id}/strategy       ← personalized study strategy (Hinglish)
  GET    /api/exam/history/{student_id} ← past exams with pagination
"""

from __future__ import annotations

import logging
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from typing import Optional
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, ConfigDict, Field, field_validator
from sqlalchemy import and_, desc, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from services.mastery_sync import MasterySyncService
from services.practice_service import PracticeService
from services.question_selector import QuestionSelector

# ── Required ORM models (models/exam.py) ───────────────────────────────────
# from models.exam import ExamSession, ExamQuestion, ExamAnswer
# ExamSession fields: id, student_id, subject, chapter, topics(list[str]),
#   difficulty, num_questions, status(str), duration_minutes(int),
#   score(float?), correct_answers(int?), total_questions, grade(str?),
#   submitted_at(datetime?), total_time_seconds(int?), created_at, expires_at
# ExamQuestion fields: id, exam_id, question_id, sequence(int), topic, marks
# ExamAnswer fields: id, exam_id, question_id, selected_option, is_correct(bool),
#   correct_answer, created_at
# ──────────────────────────────────────────────────────────────────────────

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/exam", tags=["Exam"])

# ──────────────────────────────────────────────────────────────────────────
#  Pydantic v2 Schemas
# ──────────────────────────────────────────────────────────────────────────


class ExamCreateRequest(BaseModel):
    """Body for creating a new exam session."""

    model_config = ConfigDict(str_strip_whitespace=True)

    student_id: str = Field(..., min_length=1, description="Unique student identifier")
    subject: str = Field(..., min_length=1, description="Subject (e.g. 'Mathematics')")
    chapter: Optional[str] = Field(None, description="Chapter to focus on")
    topics: Optional[list[str]] = Field(
        None, description="Specific topics (provide this or chapter)"
    )
    difficulty: str = Field(
        "medium", pattern=r"^(easy|medium|hard)$", description="Difficulty level"
    )
    num_questions: int = Field(default=10, ge=5, le=50, description="Questions (5-50)")
    duration_minutes: int = Field(
        default=30, ge=5, le=180, description="Duration in minutes (5-180)"
    )

    @field_validator("topics")
    @classmethod
    def _need_chapter_or_topics(cls, v, info):
        if not v and not info.data.get("chapter"):
            raise ValueError("Either 'chapter' or 'topics' must be provided")
        return v


class QuestionLiteOut(BaseModel):
    """Lightweight question (no correct answer leaked)."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    text: str = Field(alias="question_text")
    options: list[str]
    difficulty: str
    topic: str
    marks: int = 1


class ExamCreateResponse(BaseModel):
    """Returned after successfully creating an exam."""

    model_config = ConfigDict(from_attributes=True)

    exam_id: str
    student_id: str
    subject: str
    chapter: Optional[str] = None
    difficulty: str
    num_questions: int
    duration_minutes: int
    status: str
    questions: list[QuestionLiteOut]
    created_at: datetime


class AnswerItem(BaseModel):
    """Single answer inside the submit payload."""

    model_config = ConfigDict(str_strip_whitespace=True)

    question_id: str
    selected_option: Optional[str] = None
    time_spent_seconds: Optional[int] = Field(None, ge=0)


class ExamSubmitRequest(BaseModel):
    """Full exam submission payload."""

    model_config = ConfigDict(str_strip_whitespace=True)

    answers: list[AnswerItem] = Field(..., min_length=1)
    total_time_seconds: Optional[int] = Field(None, ge=0)


class TopicBreakdownOut(BaseModel):
    """Per-topic accuracy snapshot."""

    topic: str
    total: int
    correct: int
    accuracy: float
    status: str  # strong | average | weak


class ExamSubmitResponse(BaseModel):
    """Returned immediately after submission (grading done inline)."""

    exam_id: str
    student_id: str
    subject: str
    score: float
    total_questions: int
    correct_answers: int
    percentage: float
    grade: str
    time_taken_seconds: Optional[int] = None
    topic_breakdown: list[TopicBreakdownOut] = []
    submitted_at: datetime


class ExamResultResponse(BaseModel):
    """Detailed result view (same as submit + meta)."""

    exam_id: str
    student_id: str
    subject: str
    chapter: Optional[str] = None
    difficulty: str
    score: float
    total_questions: int
    correct_answers: int
    percentage: float
    grade: str
    time_taken_seconds: Optional[int] = None
    topic_breakdown: list[TopicBreakdownOut] = []
    weak_areas: list[str] = []
    strong_areas: list[str] = []
    submitted_at: datetime
    created_at: datetime
    duration_minutes: int


class PriorityTopic(BaseModel):
    topic: str
    accuracy: float
    status: str
    priority: str  # high | medium


class ExamStrategyResponse(BaseModel):
    """Personalized study strategy (Hinglish, ICSE/ISC-friendly)."""

    exam_id: str
    subject: str
    overall_assessment: str
    overall_score: float
    priority_topics: list[PriorityTopic] = []
    recommended_actions: list[str] = []
    next_exam_focus: str
    mastery_snapshot: dict = {}


class ExamHistoryItem(BaseModel):
    """One row in the exam history list."""

    exam_id: str
    subject: str
    chapter: Optional[str] = None
    difficulty: str
    score: float
    percentage: float
    grade: str
    num_questions: int
    correct_answers: int
    submitted_at: datetime
    duration_minutes: int


class ExamHistoryResponse(BaseModel):
    """Paginated exam history."""

    student_id: str
    total_exams: int
    page: int
    page_size: int
    exams: list[ExamHistoryItem]


# ──────────────────────────────────────────────────────────────────────────
#  Internal helpers
# ──────────────────────────────────────────────────────────────────────────


def _grade(pct: float) -> str:
    """ICSE-style letter grade from percentage."""
    if pct >= 90:
        return "A+"
    if pct >= 75:
        return "A"
    if pct >= 60:
        return "B"
    if pct >= 40:
        return "C"
    if pct >= 30:
        return "D"
    return "F"


def _label(accuracy: float) -> str:
    if accuracy >= 75:
        return "strong"
    if accuracy >= 40:
        return "average"
    return "weak"


async def _grade_answers(
    questions: list[dict],
    answers: list[dict],
    practice: PracticeService,
) -> tuple[list[dict], int]:
    """
    Cross-check every student answer with the correct answer via PracticeService.
    Returns (graded_list, correct_count).
    """
    graded: list[dict] = []
    correct = 0
    answer_map = {a["question_id"]: a for a in answers}

    for q in questions:
        qid = q["id"]
        ans = answer_map.get(qid)
        if ans is None:
            # Student skipped — treat as incorrect
            graded.append(
                {
                    "question_id": qid,
                    "selected_option": None,
                    "is_correct": False,
                    "correct_answer": q.get("correct_answer"),
                    "explanation": q.get("explanation"),
                    "topic": q.get("topic", "General"),
                }
            )
            continue

        is_right = await practice.check_answer(
            question_id=qid,
            student_answer=ans.get("selected_option"),
            correct_answer=q.get("correct_answer"),
        )
        if is_right:
            correct += 1

        graded.append(
            {
                "question_id": qid,
                "selected_option": ans.get("selected_option"),
                "is_correct": is_right,
                "correct_answer": q.get("correct_answer"),
                "explanation": q.get("explanation"),
                "topic": q.get("topic", "General"),
            }
        )
    return graded, correct


def _topic_breakdown(
    questions: list[dict], graded: list[dict]
) -> list[TopicBreakdownOut]:
    """Aggregate per-topic accuracy from graded answers."""
    stats: dict[str, dict] = defaultdict(lambda: {"total": 0, "correct": 0})
    grad_map = {g["question_id"]: g for g in graded}

    for q in questions:
        t = q.get("topic", "General")
        stats[t]["total"] += 1
        g = grad_map.get(q["id"])
        if g and g["is_correct"]:
            stats[t]["correct"] += 1

    out: list[TopicBreakdownOut] = []
    for topic, s in stats.items():
        acc = round((s["correct"] / s["total"] * 100), 2) if s["total"] else 0.0
        out.append(
            TopicBreakdownOut(
                topic=topic,
                total=s["total"],
                correct=s["correct"],
                accuracy=acc,
                status=_label(acc),
            )
        )
    return sorted(out, key=lambda x: x.accuracy)


def _build_strategy(
    pct: float,
    breakdown: list[TopicBreakdownOut],
    subject: str,
) -> dict:
    """Generate a Hinglish study strategy based on exam performance."""
    weak = [t for t in breakdown if t.status == "weak"]
    avg = [t for t in breakdown if t.status == "average"]
    strong = [t for t in breakdown if t.status == "strong"]

    if pct >= 80:
        assessment = (
            f"🎉 Bahut badhiya! Aapne {subject} mein {pct:.0f}% kiya. "
            f"Topic-wise command sabse achha hai. Ab agle level ki taiyaari karo!"
        )
        actions = [
            "✅ Current level ke advanced problems solve karo",
            "Timed mock papers attempt karo (full length)",
            f"Next chapter/topic start karo: {weak[0].topic if weak else 'advanced level'}",
            "Quick revision of formulas aur theorems karo",
        ]
        focus = weak[0].topic if weak else "Advanced problems & next chapter"
    elif pct >= 60:
        assessment = (
            f"🙂 Accha effort! {subject} mein {pct:.0f}% aaya. "
            f"Kuch topics aur practice ki zaroorat hai — thoda mehnat karo agle baar aur achha karenge!"
        )
        actions = [
            f"📚 Weak topics pe focus karo: {', '.join(t.topic for t in weak[:3])}",
            "NCERT solved examples phir se solve karo",
            "Har weak topic ke 25+ questions practice karo",
            "Mistakes wale questions ek notebook mein note karo",
        ]
        focus = weak[0].topic if weak else f"Average topics: {', '.join(t.topic for t in avg[:2])}"
    elif pct >= 40:
        assessment = (
            f"💪 Thoda aur mehnat chahiye — {subject} mein {pct:.0f}% hai. "
            f"Pehle concepts clear karo, phir practice. Roz thoda thoda karo, results dikhenge!"
        )
        actions = [
            f"🔑 Basic concepts clear karo: {', '.join(t.topic for t in weak[:3])}",
            "Chapter ke theory part ko thoroughly padho (NCERT ya textbook)",
            "Teacher / peer se doubt clear karo — confusion mat rakho",
            "Roz 30-40 min dedicated practice — consistency is key!",
        ]
        focus = weak[0].topic if weak else f"{subject} ke fundamentals"
    else:
        assessment = (
            f"🌱 Chinta mat karo — har shuruaat tough hoti hai! {subject} mein {pct:.0f}% hai. "
            f"Pehle basics strong karo, formulas yaad karo, automatically confidence aayega."
        )
        actions = [
            "📖 Chapter ke beginning se padho — har definition aur example samjho",
            "Solved examples dekho step by step, phir khud try karo",
            "Tough topics ko break karke chhote-chhote parts mein seekho",
            "Regular practice + doubt clearing session zaroori hai",
        ]
        focus = weak[0].topic if weak else f"{subject} - basic concepts & fundamentals"

    priority = [
        {
            "topic": t.topic,
            "accuracy": t.accuracy,
            "status": t.status,
            "priority": "high" if t.accuracy < 30 else "medium",
        }
        for t in weak[:5]
    ]

    return {
        "overall_assessment": assessment,
        "recommended_actions": actions,
        "priority_topics": priority,
        "next_exam_focus": focus,
    }


# ──────────────────────────────────────────────────────────────────────────
#  Lazy model import helper (avoids circular deps at module load)
# ──────────────────────────────────────────────────────────────────────────


def _get_models():
    """Import ORM models on first use."""
    from models.exam import ExamAnswer, ExamQuestion, ExamSession  # noqa: F401

    return ExamSession, ExamQuestion, ExamAnswer


# ──────────────────────────────────────────────────────────────────────────
#  Endpoints
# ──────────────────────────────────────────────────────────────────────────


@router.post(
    "/create",
    response_model=ExamCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new exam session",
)
async def create_exam(
    request: ExamCreateRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Naya exam session banata hai — QuestionSelector se appropriate
    questions pick karke database mein save karta hai.

    **Flow:**
    1. QuestionSelector → adaptive question selection
    2. ExamSession record + ExamQuestion rows created
    3. Questions returned (without correct answers)
    """
    logger.info(
        "Creating exam | student=%s subject=%s difficulty=%s n=%d",
        request.student_id,
        request.subject,
        request.difficulty,
        request.num_questions,
    )

    try:
        # ── 1. Pick questions ──────────────────────────────────────
        selector = QuestionSelector(db)
        raw_questions = await selector.select_questions(
            subject=request.subject,
            chapter=request.chapter,
            topics=request.topics,
            difficulty=request.difficulty,
            count=request.num_questions,
            student_id=request.student_id,
        )

        if not raw_questions:
            raise HTTPException(
                status.HTTP_404_NOT_FOUND,
                detail=(
                    f"Questions not available for subject='{request.subject}', "
                    f"difficulty='{request.difficulty}'. Try different filters."
                ),
            )

        if len(raw_questions) < request.num_questions:
            logger.warning(
                "Requested %d but only %d questions available for %s/%s",
                request.num_questions,
                len(raw_questions),
                request.subject,
                request.difficulty,
            )

        # ── 2. Persist exam session ────────────────────────────────
        ExamSession, ExamQuestion, _ = _get_models()

        exam_id = str(uuid4())
        now = datetime.now(timezone.utc)

        exam = ExamSession(
            id=exam_id,
            student_id=request.student_id,
            subject=request.subject,
            chapter=request.chapter,
            topics=request.topics or [],
            difficulty=request.difficulty,
            num_questions=len(raw_questions),
            status="created",
            duration_minutes=request.duration_minutes,
            created_at=now,
            expires_at=now + timedelta(minutes=request.duration_minutes * 2),
        )
        db.add(exam)

        for idx, q in enumerate(raw_questions):
            db.add(
                ExamQuestion(
                    exam_id=exam_id,
                    question_id=q["id"],
                    sequence=idx + 1,
                    topic=q.get("topic", "General"),
                    marks=q.get("marks", 1),
                )
            )

        await db.commit()
        await db.refresh(exam)

        logger.info("Exam created | exam_id=%s | questions=%d", exam_id, len(raw_questions))

        # ── 3. Build response (strip correct answers!) ─────────────
        question_out = [
            QuestionLiteOut(
                id=q["id"],
                question_text=q.get("text") or q.get("question_text", ""),
                options=list(q.get("options", [])),
                difficulty=q.get("difficulty", "medium"),
                topic=q.get("topic", "General"),
                marks=q.get("marks", 1),
            )
            for q in raw_questions
        ]

        return ExamCreateResponse(
            exam_id=exam_id,
            student_id=request.student_id,
            subject=request.subject,
            chapter=request.chapter,
            difficulty=request.difficulty,
            num_questions=len(raw_questions),
            duration_minutes=request.duration_minutes,
            status="created",
            questions=question_out,
            created_at=exam.created_at,
        )

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Exam creation failed: %s", exc)
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Exam create karne mein problem hui. Thodi der baad try karo.",
        )


@router.post(
    "/{exam_id}/submit",
    response_model=ExamSubmitResponse,
    summary="Submit exam answers and get instant score",
)
async def submit_exam(
    exam_id: str,
    request: ExamSubmitRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Exam ke answers submit karo — har answer check hoga,
    score calculate hoga, aur mastery profile update hoga.

    **Flow:**
    1. Load exam (reject if already submitted / expired)
    2. Load questions for the exam
    3. Grade each answer via PracticeService.check_answer
    4. Save ExamAnswer rows + update ExamSession
    5. Update mastery via MasterySyncService (non-critical)
    6. Return graded result
    """
    logger.info("Submitting exam | exam_id=%s | answers=%d", exam_id, len(request.answers))

    try:
        ExamSession, ExamQuestion, ExamAnswer = _get_models()

        # ── 1. Load & validate exam ────────────────────────────────
        res = await db.execute(select(ExamSession).where(ExamSession.id == exam_id))
        exam = res.scalar_one_or_none()

        if exam is None:
            raise HTTPException(
                status.HTTP_404_NOT_FOUND,
                detail=f"Exam '{exam_id}' not found. ID check karo aur phir try karo.",
            )

        if exam.status == "submitted":
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Ye exam pehle se submit ho chuka hai "
                    f"({exam.submitted_at.strftime('%d %b %Y, %I:%M %p')})."
                ),
            )

        if exam.status == "expired":
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST,
                detail="Exam ka time expire ho gaya hai. Ab submit nahi kar sakte.",
            )

        # ── 2. Load exam questions + full details ──────────────────
        eq_res = await db.execute(
            select(ExamQuestion).where(ExamQuestion.exam_id == exam_id)
        )
        exam_questions = eq_res.scalars().all()

        selector = QuestionSelector(db)
        question_map: dict[str, dict] = {}
        for eq in exam_questions:
            detail = await selector.get_question_by_id(eq.question_id)
            if detail:
                question_map[eq.question_id] = detail

        if not question_map:
            raise HTTPException(
                status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Questions load nahi ho paaye. Admin se contact karo.",
            )

        # ── 3. Grade answers ───────────────────────────────────────
        answer_dicts = [a.model_dump() for a in request.answers]
        graded, correct_count = await _grade_answers(
            list(question_map.values()), answer_dicts, PracticeService(db)
        )

        total = len(exam_questions)
        pct = round((correct_count / total * 100), 2) if total else 0.0
        letter_grade = _grade(pct)
        breakdown = _topic_breakdown(list(question_map.values()), graded)

        now = datetime.now(timezone.utc)

        # ── 4. Persist answers ─────────────────────────────────────
        for g in graded:
            db.add(
                ExamAnswer(
                    exam_id=exam_id,
                    question_id=g["question_id"],
                    selected_option=g["selected_option"],
                    is_correct=g["is_correct"],
                    correct_answer=g["correct_answer"],
                )
            )

        # ── 5. Update exam session ─────────────────────────────────
        exam.status = "submitted"
        exam.score = pct
        exam.correct_answers = correct_count
        exam.total_questions = total
        exam.grade = letter_grade
        exam.submitted_at = now
        exam.total_time_seconds = request.total_time_seconds

        await db.commit()
        await db.refresh(exam)

        # ── 6. Sync mastery (non-critical, don't block response) ───
        try:
            mastery_svc = MasterySyncService(db)
            await mastery_svc.record_exam_performance(
                student_id=exam.student_id,
                subject=exam.subject,
                topic_results=[
                    {"topic": t.topic, "accuracy": t.accuracy, "status": t.status}
                    for t in breakdown
                ],
                exam_id=exam_id,
            )
            logger.info("Mastery synced | student=%s | exam=%s", exam.student_id, exam_id)
        except Exception as exc:
            logger.warning("Mastery sync skipped (non-critical): %s", exc)

        logger.info(
            "Exam submitted | exam_id=%s | %.1f%% | %d/%d | grade=%s",
            exam_id, pct, correct_count, total, letter_grade,
        )

        return ExamSubmitResponse(
            exam_id=exam_id,
            student_id=exam.student_id,
            subject=exam.subject,
            score=pct,
            total_questions=total,
            correct_answers=correct_count,
            percentage=pct,
            grade=letter_grade,
            time_taken_seconds=request.total_time_seconds,
            topic_breakdown=breakdown,
            submitted_at=now,
        )

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Submit failed for exam %s", exam_id)
        await db.rollback()
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Exam submit karne mein problem. Phir try karo.",
        )


@router.get(
    "/{exam_id}/result",
    response_model=ExamResultResponse,
    summary="View full exam result with topic breakdown",
)
async def get_exam_result(
    exam_id: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Exam ka complete result — topic-wise accuracy, weak/strong areas,
    grade, time taken — sab kuch yahan milega.
    """
    try:
        ExamSession, ExamQuestion, ExamAnswer = _get_models()

        # ── Load exam ──────────────────────────────────────────────
        res = await db.execute(select(ExamSession).where(ExamSession.id == exam_id))
        exam = res.scalar_one_or_none()

        if exam is None:
            raise HTTPException(
                status.HTTP_404_NOT_FOUND,
                detail=f"Exam '{exam_id}' not found.",
            )

        if exam.status not in ("submitted", "graded"):
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST,
                detail="Ye exam abhi tak submit nahi hua hai.",
            )

        # ── Load answers + question details ────────────────────────
        ans_res = await db.execute(
            select(ExamAnswer).where(ExamAnswer.exam_id == exam_id)
        )
        answers = ans_res.scalars().all()

        selector = QuestionSelector(db)
        q_map: dict[str, dict] = {}
        for a in answers:
            detail = await selector.get_question_by_id(a.question_id)
            if detail:
                q_map[a.question_id] = detail

        graded_lookup = [
            {"question_id": a.question_id, "is_correct": a.is_correct} for a in answers
        ]
        breakdown = _topic_breakdown(list(q_map.values()), graded_lookup)

        weak = [t.topic for t in breakdown if t.status == "weak"]
        strong = [t.topic for t in breakdown if t.status == "strong"]

        return ExamResultResponse(
            exam_id=exam_id,
            student_id=exam.student_id,
            subject=exam.subject,
            chapter=exam.chapter,
            difficulty=exam.difficulty,
            score=exam.score or 0.0,
            total_questions=exam.total_questions,
            correct_answers=exam.correct_answers or 0,
            percentage=exam.score or 0.0,
            grade=exam.grade or "N/A",
            time_taken_seconds=exam.total_time_seconds,
            topic_breakdown=breakdown,
            weak_areas=weak,
            strong_areas=strong,
            submitted_at=exam.submitted_at or datetime.now(timezone.utc),
            created_at=exam.created_at,
            duration_minutes=exam.duration_minutes,
        )

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Result fetch failed for exam %s", exam_id)
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Result load nahi ho paaya. Phir try karo.",
        )


@router.get(
    "/{exam_id}/strategy",
    response_model=ExamStrategyResponse,
    summary="Get personalized study strategy based on exam performance",
)
async def get_exam_strategy(
    exam_id: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Exam result ke aadhar par personalized study strategy banata hai.
    Weak topics pe focus karne ka plan, recommended actions,
    aur next exam focus area batata hai.

    Response Hinglish mein hota hai taaki Indian students ke liye easy ho.
    """
    try:
        ExamSession, _, ExamAnswer = _get_models()

        # ── Load exam ──────────────────────────────────────────────
        res = await db.execute(select(ExamSession).where(ExamSession.id == exam_id))
        exam = res.scalar_one_or_none()

        if exam is None:
            raise HTTPException(
                status.HTTP_404_NOT_FOUND,
                detail=f"Exam '{exam_id}' not found.",
            )

        if exam.status not in ("submitted", "graded"):
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST,
                detail="Pehle exam submit karo, phir strategy dekho.",
            )

        # ── Compute topic breakdown for strategy ───────────────────
        ans_res = await db.execute(
            select(ExamAnswer).where(ExamAnswer.exam_id == exam_id)
        )
        answers = ans_res.scalars().all()

        selector = QuestionSelector(db)
        q_map: dict[str, dict] = {}
        for a in answers:
            detail = await selector.get_question_by_id(a.question_id)
            if detail:
                q_map[a.question_id] = detail

        graded_lookup = [
            {"question_id": a.question_id, "is_correct": a.is_correct} for a in answers
        ]
        breakdown = _topic_breakdown(list(q_map.values()), graded_lookup)

        # ── Build strategy text ────────────────────────────────────
        strategy = _build_strategy(
            pct=exam.score or 0.0,
            breakdown=breakdown,
            subject=exam.subject,
        )

        # ── Fetch mastery snapshot ─────────────────────────────────
        mastery_snapshot: dict = {}
        try:
            mastery_svc = MasterySyncService(db)
            raw = await mastery_svc.get_mastery(
                student_id=exam.student_id,
                subject=exam.subject,
            )
            mastery_snapshot = raw if isinstance(raw, dict) else {}
        except Exception as exc:
            logger.warning("Mastery snapshot fetch failed (non-critical): %s", exc)

        return ExamStrategyResponse(
            exam_id=exam_id,
            subject=exam.subject,
            overall_assessment=strategy["overall_assessment"],
            overall_score=exam.score or 0.0,
            priority_topics=[
                PriorityTopic(**pt) for pt in strategy["priority_topics"]
            ],
            recommended_actions=strategy["recommended_actions"],
            next_exam_focus=strategy["next_exam_focus"],
            mastery_snapshot=mastery_snapshot,
        )

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Strategy generation failed for exam %s", exam_id)
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Strategy generate nahi ho paayi. Phir try karo.",
        )


@router.get(
    "/history/{student_id}",
    response_model=ExamHistoryResponse,
    summary="Get past exam history for a student (paginated)",
)
async def get_exam_history(
    student_id: str,
    page: int = Query(default=1, ge=1, description="Page number (1-indexed)"),
    page_size: int = Query(
        default=10, ge=1, le=50, description="Results per page (1-50)"
    ),
    subject: Optional[str] = Query(None, description="Filter by subject name"),
    db: AsyncSession = Depends(get_db),
):
    """
    Student ke submitted exams ka history.
    Optional `subject` filter. Pagination via `page` + `page_size`.
    """
    try:
        ExamSession, _, _ = _get_models()

        base_query = select(ExamSession).where(ExamSession.student_id == student_id)

        if subject:
            base_query = base_query.where(ExamSession.subject == subject)

        # Count total (only submitted exams counted)
        submitted_filter = ExamSession.status.in_(["submitted", "graded"])
        count_stmt = (
            select(func.count())
            .select_from(
                select(ExamSession)
                .where(
                    and_(
                        ExamSession.student_id == student_id,
                        submitted_filter,
                        *( [ExamSession.subject == subject] if subject else [] ),
                    )
                )
                .subquery()
            )
        )
        total_res = await db.execute(count_stmt)
        total: int = total_res.scalar() or 0

        # Paginated fetch
        offset = (page - 1) * page_size
        stmt = (
            base_query.where(submitted_filter)
            .order_by(desc(ExamSession.submitted_at))
            .offset(offset)
            .limit(page_size)
        )
        result = await db.execute(stmt)
        exams = result.scalars().all()

        items = [
            ExamHistoryItem(
                exam_id=e.id,
                subject=e.subject,
                chapter=e.chapter,
                difficulty=e.difficulty,
                score=e.score or 0.0,
                percentage=e.score or 0.0,
                grade=e.grade or "N/A",
                num_questions=e.num_questions,
                correct_answers=e.correct_answers or 0,
                submitted_at=e.submitted_at or e.created_at,
                duration_minutes=e.duration_minutes,
            )
            for e in exams
        ]

        logger.info(
            "History | student=%s | page=%d/%d | returned=%d | total=%d",
            student_id,
            page,
            (total + page_size - 1) // page_size,
            len(items),
            total,
        )

        return ExamHistoryResponse(
            student_id=student_id,
            total_exams=total,
            page=page,
            page_size=page_size,
            exams=items,
        )

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("History fetch failed for student %s", student_id)
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Exam history load nahi ho paaya.",
        )