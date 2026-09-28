"""Assessment router for the DREAM_APP educational platform.

Exposes endpoints for quizzes, exams, and exam attempts.
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.user import User
from backend.schemas.assessment import (
    ExamDetailSchema,
    ExamListResponse,
    ExamResultSchema,
    ExamSchema,
    ExamSubmissionRequest,
    QuizAnswerRequest,
    QuizAnswerResponse,
    QuizQuestionSchema,
)
from backend.services.assessment_service import AssessmentService

router = APIRouter(prefix="/api/assessment", tags=["assessment"])


# --------------------------------------------------------------------------- #
# Helper
# --------------------------------------------------------------------------- #
def _quiz_question_to_schema(q) -> QuizQuestionSchema:
    """Convert a ``QuizQuestion`` ORM instance to its schema."""
    return QuizQuestionSchema(
        id=str(q.id),
        node_id=q.node_id,
        question=q.question,
        question_type=q.question_type,
        options=q.options,
        correct_answer=q.correct_answer,
        explanation=q.explanation,
        marks=q.marks,
        marking_scheme=q.marking_scheme,
        difficulty=q.difficulty,
    )


def _exam_to_list_dict(exam) -> dict:
    """Convert an ``Exam`` ORM instance to the dict ExamSchema expects.

    The model stores ``duration_minutes`` / ``sections_count`` while the
    schema exposes ``duration`` / ``sections``.
    """
    topics = exam.topics
    if isinstance(topics, str):
        # some seeds store JSON-encoded strings
        import json as _json

        try:
            topics = _json.loads(topics)
        except (ValueError, TypeError):
            topics = [t.strip() for t in topics.split(",") if t.strip()]
    if not isinstance(topics, list):
        topics = []
    return {
        "exam_id": exam.exam_id,
        "title": exam.title,
        "board": exam.board,
        "class_level": exam.class_level,
        "subject": exam.subject,
        "duration": exam.duration_minutes,
        "total_marks": exam.total_marks,
        "sections": exam.sections_count,
        "difficulty": exam.difficulty or "medium",
        "topics": topics,
    }


def _exam_to_detail_dict(exam, sections=None) -> dict:
    """Convert an ``Exam`` plus its section rows to ExamDetailSchema input.

    ``sections`` must be preloaded by the caller (querying ExamSection
    directly) — accessing the lazy ``exam.sections`` relationship inside an
    async handler raises MissingGreenlet.
    """
    data = _exam_to_list_dict(exam)
    section_items = []
    for sec in (sections or []):
        raw_questions = sec.questions or []
        if isinstance(raw_questions, str):
            try:
                import json as _json
                raw_questions = _json.loads(raw_questions)
            except Exception:
                raw_questions = []
        section_items.append(
            {
                "section_id": sec.section_id,
                "title": sec.title,
                "marks": sec.marks,
                "question_count": sec.question_count or len(raw_questions),
                "question_type": sec.question_type or "mcq",
                "instructions": sec.instructions or "",
                "questions": [
                    {
                        "id": str(q.get("id", "")),
                        "question": q.get("question", ""),
                        "options": q.get("options"),
                        "marks": q.get("marks", 1),
                        "type": q.get("type", sec.question_type or "mcq"),
                    }
                    for q in raw_questions
                ],
            }
        )
    section_items.sort(key=lambda s: s.get("section_id") or "")
    data["sections"] = section_items
    return data


# --------------------------------------------------------------------------- #
# Quiz endpoints
# --------------------------------------------------------------------------- #
@router.get("/quiz/{node_id}", response_model=List[QuizQuestionSchema])
async def get_quiz_questions(
    node_id: str,
    count: int = Query(default=5, ge=1, le=50),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return quiz questions for the given knowledge node."""
    try:
        questions = await AssessmentService.get_quiz_questions(
            db, node_id, count=count
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
    return [_quiz_question_to_schema(q) for q in questions]


@router.post("/quiz/answer", response_model=QuizAnswerResponse)
async def submit_quiz_answer(
    payload: QuizAnswerRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Submit a single quiz answer and receive correctness + mastery update."""
    try:
        result = await AssessmentService.submit_quiz_answer(
            db,
            user_id=str(user.id),
            data={
                "question_id": payload.question_id,
                "answer": payload.answer,
                "time_taken_seconds": payload.time_taken_seconds,
            },
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    if isinstance(result, QuizAnswerResponse):
        return result
    return QuizAnswerResponse(**result)


# --------------------------------------------------------------------------- #
# Exam endpoints
# --------------------------------------------------------------------------- #
@router.get("/exams", response_model=ExamListResponse)
async def get_exams(
    board: Optional[str] = Query(default=None),
    class_level: Optional[int] = Query(default=None, ge=1, le=12),
    # Web client sends camelCase classLevel — accept both spellings.
    classLevel: Optional[int] = Query(default=None, ge=1, le=12, include_in_schema=False),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return a list of available exams, optionally filtered."""
    class_level = class_level if class_level is not None else classLevel
    exams = await AssessmentService.get_exams(
        db, board=board, class_level=class_level
    )
    if isinstance(exams, ExamListResponse):
        return exams
    return ExamListResponse(
        exams=[ExamSchema(**_exam_to_list_dict(e)) for e in exams]
    )


@router.get("/exams/{exam_id}", response_model=ExamDetailSchema)
async def get_exam(
    exam_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return the full detail of a single exam including sections."""
    try:
        exam = await AssessmentService.get_exam(db, exam_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    if isinstance(exam, ExamDetailSchema):
        return exam
    if isinstance(exam, dict):
        return ExamDetailSchema(**exam)
    # ORM Exam — query section rows explicitly (lazy relationship access
    # is not allowed inside the async event loop).
    from sqlalchemy import select as _select
    from backend.models.assessment import ExamSection as _ExamSection

    section_rows = list((await db.execute(
        _select(_ExamSection).where(_ExamSection.exam_id == exam.id)
    )).scalars().all())
    return ExamDetailSchema(**_exam_to_detail_dict(exam, section_rows))


@router.post("/exams/{exam_id}/submit", response_model=ExamResultSchema)
async def submit_exam(
    exam_id: str,
    payload: ExamSubmissionRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Submit answers for an exam and receive the graded result."""
    # Web client sends camelCase answer items ({questionId, answer,
    # timeTakenSeconds}) — normalize to the snake_case keys the grader reads.
    normalized: list = []
    for ans in payload.answers or []:
        if isinstance(ans, dict):
            ans = dict(ans)
            if "question_id" not in ans and "questionId" in ans:
                ans["question_id"] = ans["questionId"]
            if "time_taken_seconds" not in ans and "timeTakenSeconds" in ans:
                ans["time_taken_seconds"] = ans["timeTakenSeconds"]
        normalized.append(ans)
    submission = payload.model_copy(
        update={"exam_id": exam_id, "answers": normalized}
    )

    try:
        result = await AssessmentService.submit_exam(
            db,
            user_id=str(user.id),
            data={
                "exam_id": exam_id,
                "answers": submission.answers,
                "time_taken_seconds": getattr(submission, "time_taken_seconds", 0) or 0,
            },
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    if isinstance(result, ExamResultSchema):
        return result
    return ExamResultSchema(**result)


# --------------------------------------------------------------------------- #
# Attempt endpoints
# --------------------------------------------------------------------------- #
@router.get("/attempts", response_model=List[ExamResultSchema])
async def get_exam_attempts(
    examId: Optional[str] = Query(default=None, alias="examId"),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return the authenticated user's exam attempts, optionally for one exam."""
    attempts = await AssessmentService.get_exam_attempts(
        db, user_id=str(user.id), exam_id=examId
    )

    results: List[ExamResultSchema] = []
    for attempt in attempts:
        if isinstance(attempt, ExamResultSchema):
            results.append(attempt)
        elif isinstance(attempt, dict):
            results.append(ExamResultSchema(**attempt))
        else:
            # ORM ExamAttempt object
            results.append(
                ExamResultSchema(
                    total_score=int(attempt.total_score or 0),
                    max_score=int(attempt.max_score or 0),
                    percentage=attempt.percentage or 0.0,
                    time_taken=attempt.time_taken_seconds or 0,
                    section_scores=attempt.section_scores or [],
                    topic_scores=attempt.topic_scores or [],
                    weakness_areas=attempt.weakness_areas or [],
                )
            )
    return results


# --------------------------------------------------------------------------- #
# Timed exam simulation endpoints (ExamService)
# --------------------------------------------------------------------------- #
from backend.services.exam_service import ExamService


@router.post("/exam-sim/start")
async def start_exam_simulation(
    subject: str = Query(..., description="physics, chemistry, biology, or mathematics"),
    class_level: int = Query(..., ge=9, le=12),
    paper_type: str = Query(default="mock_paper", description="mock_paper, past_paper, or board_style"),
    num_questions: int = Query(default=10, ge=1, le=40),
    duration_minutes: int = Query(default=120, ge=10, le=240),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Start a timed exam simulation.

    Generates a paper from board questions and serves questions one at a time.
    The timer starts immediately. Submit answers via /exam-sim/{session_id}/answer.
    """
    result = await ExamService.start_exam(
        db,
        user_id=str(user.id),
        subject=subject,
        class_level=class_level,
        paper_type=paper_type,
        num_questions=num_questions,
        duration_minutes=duration_minutes,
    )
    if not result.get("started") and not result.get("generated"):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=result.get("message", "No exam questions available."),
        )
    return result


@router.post("/exam-sim/{session_id}/answer")
async def submit_exam_answer(
    session_id: str,
    answer: str = Query(..., description="Student's answer text"),
    skip: bool = Query(default=False, description="Skip this question"),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Submit an answer to the current exam question.

    Returns feedback for the current question and serves the next question.
    When all questions are answered, returns the final scorecard with grade.
    """
    result = await ExamService.submit_answer(
        db, session_id=session_id, student_answer=answer, skip=skip
    )
    if "error" in result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=result["error"],
        )
    return result


@router.get("/exam-sim/{session_id}/status")
async def get_exam_status(
    session_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the current status of an exam session — time remaining, current question."""
    from backend.services.exam_service import _exam_load
    from datetime import datetime, timezone

    session = await _exam_load(session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Exam session not found",
        )
    _started = session.started_at
    if _started is not None and _started.tzinfo is None:
        _started = _started.replace(tzinfo=timezone.utc)  # legacy naive stamp
    elapsed = (datetime.now(timezone.utc) - _started).total_seconds()
    remaining = max(0, session.duration_minutes * 60 - elapsed)
    return {
        "session_id": session_id,
        "paper_title": session.paper.title,
        "current_question": session.current_question + 1 if session.current_question < len(session.paper.questions) else len(session.paper.questions),
        "total_questions": len(session.paper.questions),
        "time_remaining_seconds": int(remaining),
        "completed": session.completed,
        "questions_answered": len(session.answers),
    }


@router.post("/exam-sim/{session_id}/finish")
async def finish_exam(
    session_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Finish the exam early and get the scorecard.

    Any unanswered questions are marked as skipped.
    """
    from backend.services.exam_service import _exam_load, ExamService

    session = await _exam_load(session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Exam session not found",
        )
    # Skip remaining questions
    while session.current_question < len(session.paper.questions):
        await ExamService.submit_answer(db, session_id, "", skip=True)
    # Return final scorecard
    return ExamService._finish_exam(session_id, session)


@router.get("/attempts/{attempt_id}", response_model=ExamResultSchema)
async def get_attempt_detail(
    attempt_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return the result of a specific exam attempt."""
    try:
        attempts = await AssessmentService.get_exam_attempts(
            db, user_id=str(user.id), exam_id=None
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    # The service lists attempts; select the requested one by id.
    result = None
    for attempt in attempts:
        if str(getattr(attempt, "id", "")) == str(attempt_id):
            result = attempt
            break
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Attempt not found",
        )

    if isinstance(result, ExamResultSchema):
        return result
    if isinstance(result, dict):
        return ExamResultSchema(**result)
    # ORM ExamAttempt object
    return ExamResultSchema(
        total_score=int(result.total_score or 0),
        max_score=int(result.max_score or 0),
        percentage=result.percentage or 0.0,
        time_taken=result.time_taken_seconds or 0,
        section_scores=result.section_scores or [],
        topic_scores=result.topic_scores or [],
        weakness_areas=result.weakness_areas or [],
    )
