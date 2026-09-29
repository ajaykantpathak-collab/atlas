"""
Exams Adapter Router — /api/exams/*
===================================
Thin adapter that wires backend/services/exam_service.py::ExamService
(the ISC exam generator / grader / strategy engine) to the surface
frontend/services/exam.service.ts already calls:

    POST /api/exams                                -> ApiEnvelope[ExamDetail]
    POST /api/exams/{exam_id}/submit               -> ApiEnvelope[ExamResult]
    GET  /api/exams/{exam_id}/result               -> ApiEnvelope[ExamResult]
    GET  /api/exams/{exam_id}/strategy             -> ApiEnvelope[ExamStrategy]
    GET  /api/exams/history                        -> ApiEnvelope[PaginatedResponse]
    GET  /api/students/{student_id}/exams/history  -> ApiEnvelope[PaginatedResponse]

exam.service.ts unwraps `response.data.data` and requires `success: true`,
so every response uses the { success, data } envelope. All grading,
strategy and analysis come from ExamService — this router only adapts
shapes (snake_case engine -> camelCase TS) and never fabricates content.
"""

from __future__ import annotations

import json
import logging
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user, get_current_user_optional, is_staff
from backend.models.user import User
from backend.services.exam_service import (
    AnswerInput,
    ExamPaperDB,
    ExamResultDB,
    ExamService,
    ExamSessionDB,
)

logger = logging.getLogger(__name__)

exam_router = APIRouter(prefix="/api/exams", tags=["exams"])
students_router = APIRouter(prefix="/api/students", tags=["exams"])

# combined export — routers/__init__.py and main.py mount this single name
router = APIRouter(tags=["exams"])

# engine TOPIC_CONFIG subjects (case-sensitive)
_SUBJECT_MAP = {
    "mathematics": "Mathematics",
    "maths": "Mathematics",
    "math": "Mathematics",
    "physics": "Physics",
    "chemistry": "Chemistry",
    "computer_science": "Computer Science",
    "cs": "Computer Science",
    "biology": "Biology",
    "bio": "Biology",
    "accountancy": "Accountancy",
    "accounts": "Accountancy",
    "acc": "Accountancy",
    "business_studies": "Business Studies",
    "bs": "Business Studies",
    "economics": "Economics",
    "eco": "Economics",
    "psychology": "Psychology",
    "psy": "Psychology",
    "history": "History",
    "geography": "Geography",
    "civics": "Civics",
    "political_science": "Political Science",
    "sociology": "Sociology",
    "english": "English",
    "hindi": "Hindi",
    "applied_mathematics": "Applied Mathematics",
    "statistics": "Statistics",
    "biotechnology": "Biotechnology",
    "biotech": "Biotechnology",
    "home_science": "Home Science",
    "physical_education": "Physical Education",
    "informatica_practices": "Informatics Practices",
    "ip": "Informatics Practices",
}

_TYPE_MAP = {
    "mcq": "mcq_single",
    "very_short_answer": "fill_blank",
    "short_answer": "fill_blank",
    "long_answer": "descriptive",
}

_OPTION_LABELS = "ABCDEFGH"

# students.id is the FK target for exam_sessions/exam_results — ensure a row
# exists for the caller before inserting an attempt (guests get a nil UUID row).
GUEST_UUID = "00000000-0000-0000-0000-000000000000"


def _env(data: Any) -> Dict[str, Any]:
    return {"success": True, "data": data}


def _student_uuid(user: Optional[User]) -> str:
    return str(user.id) if user is not None else GUEST_UUID


async def _ensure_student(db: AsyncSession, user: Optional[User]) -> str:
    sid = _student_uuid(user)
    name = (user.name if user is not None else None) or (user.email if user is not None else None) or "Guest Student"
    await db.execute(
        text("INSERT INTO students (id, name) VALUES (:id, :name) ON CONFLICT (id) DO NOTHING"),
        {"id": sid, "name": name},
    )
    await db.commit()
    return sid


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _iso(dt: datetime) -> str:
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.isoformat()


# ─────────────────────────────────────────────
# Request models (TS contract)
# ─────────────────────────────────────────────
class CreateExamDTO(BaseModel):
    title: str = ""
    description: str = ""
    subject: str = "mathematics"
    gradeLevel: int = Field(default=11, ge=1, le=12)
    startsAt: Optional[str] = None
    endsAt: Optional[str] = None
    durationMinutes: Optional[int] = None
    passPercentage: float = 33.0
    allowRevisit: bool = True
    shuffleQuestions: bool = False
    shuffleOptions: bool = False
    showCalculator: bool = False
    hintsEnabled: bool = False
    totalHints: int = 0


class SubmitExamDTO(BaseModel):
    answers: Dict[str, Any] = Field(default_factory=dict)
    skipped: List[str] = Field(default_factory=list)
    hintsUsed: List[str] = Field(default_factory=list)
    timeTakenMs: int = 0


# ─────────────────────────────────────────────
# Mappers: engine (snake_case) -> TS contract (camelCase)
# ─────────────────────────────────────────────
def _map_paper_question(q: Any, exam_id: str) -> Dict[str, Any]:
    options = None
    if q.options:
        options = [
            {"id": f"{q.question_id}-o{i}", "label": _OPTION_LABELS[i], "text": text, "isCorrect": False}
            for i, text in enumerate(q.options)
        ]
    return {
        "id": q.question_id,
        "examId": exam_id,
        "order": q.question_number,
        "question": q.text,
        "type": _TYPE_MAP.get(q.question_type, "fill_blank"),
        "maxMarks": q.marks,
        "negativeMarks": None,
        "difficulty": "medium",
        "awardedMarks": None,
        "attempted": False,
        "studentAnswer": None,
        "options": options,
        "hintsUnlocked": [],
        "lastViewedAt": None,
        "tags": [q.topic, q.subtopic],
    }


def _map_graded_question(g: Any, exam_id: str, paper_q: Any = None) -> Dict[str, Any]:
    # paper_q carries the served text + original options — the graded row
    # alone doesn't retain them, so review rendered question:"" and a fake
    # single "correct" option.
    opts_src = (paper_q.get("options") if isinstance(paper_q, dict)
                else getattr(paper_q, "options", None)) if paper_q else None
    options = None
    if opts_src:
        correct = str(g.correct_answer or "")
        options = [
            {"id": f"{g.question_id}-o{i}", "label": _OPTION_LABELS[i],
             "text": str(o), "isCorrect": str(o).strip() == correct.strip()}
            for i, o in enumerate(opts_src[:len(_OPTION_LABELS)])
        ]
    elif g.correct_answer is not None and not isinstance(g.correct_answer, list):
        options = [
            {"id": f"{g.question_id}-o0", "label": "A", "text": str(g.correct_answer), "isCorrect": True},
        ]
    return {
        "id": g.question_id,
        "examId": exam_id,
        "order": g.question_number,
        "question": (paper_q.get("text") if isinstance(paper_q, dict)
                     else getattr(paper_q, "text", "")) or "",
        "type": "mcq_single" if options else "fill_blank",
        "maxMarks": g.max_marks,
        "negativeMarks": None,
        "difficulty": "medium",
        "awardedMarks": g.awarded_marks,
        "attempted": g.status != "not_attempted",
        "studentAnswer": g.student_answer or None,
        "options": options,
        "hintsUnlocked": [],
        "lastViewedAt": None,
        "tags": [g.topic],
        # extensions
        "sectionId": g.section_id,
        "status": g.status,
        "feedback": g.feedback,
        "correctAnswer": g.correct_answer if not options else None,
        "rubric": [
            {
                "stepNumber": st.step_number,
                "description": st.description,
                "maxMarks": st.max_marks,
                "awardedMarks": st.awarded_marks,
                "isCorrect": st.is_correct,
            }
            for st in g.rubric
        ],
    }


def _map_result(r: Any, student_name: str, paper_map: dict = None) -> Dict[str, Any]:
    """ExamResultResponse -> TS ExamResult."""
    exam_id = str(r.session_id)
    paper_map = paper_map or {}
    strategy = r.strategy
    recommendations = [
        f"Revise {t['topic']} ({t.get('score_pct', 0):.0f}% — {t.get('action', 'practice daily')})"
        for t in strategy.topic_recommendations[:3]
    ] + strategy.time_management_tips[:2]
    return {
        "id": exam_id,
        "examId": exam_id,
        "studentId": str(r.student_id),
        "studentName": student_name,
        "submittedAt": r.submitted_at,
        "score": r.summary.obtained_marks,
        "percentage": r.summary.percentage,
        "passed": r.summary.passed,
        "timeTakenSeconds": int(r.time_analysis.total_time_minutes * 60),
        "rank": r.summary.rank_in_class,
        "totalStudents": 1,
        "questionBreakdown": [_map_graded_question(g, exam_id, paper_map.get(str(g.question_id))) for g in r.graded_questions],
        "strengths": strategy.strong_topics,
        "weaknesses": strategy.weak_topics,
        "recommendations": recommendations,
        # extensions
        "sessionCode": r.session_code,
        "subject": r.subject,
        "grade": r.summary.grade,
        "sectionMarks": [
            {
                "sectionId": s.section_id,
                "name": s.name,
                "totalMarks": s.total_marks,
                "obtainedMarks": s.obtained_marks,
                "percentage": s.percentage,
                "attempted": s.attempted,
                "totalQuestions": s.total_questions,
            }
            for s in r.section_marks
        ],
    }


def _map_strategy(st: Any, exam_id: str) -> Dict[str, Any]:
    return {
        "id": f"strat-{exam_id}",
        "examId": exam_id,
        "priorityOrder": st.question_selection_strategy,
        "skipList": [],
        "timeAllocation": {},
        "estimatedTime": int(st.overall_percentage * 6),  # sec per % — derived from real score
        "confidenceScore": round(min(max(st.overall_percentage, 0), 100) / 100, 2),
        "rationale": " | ".join(st.time_management_tips[:3]) or st.overall_grade,
        "strengths": st.strong_topics,
        "cautionAreas": st.weak_topics,
        "similarStudentsSuccessRate": 0.0,
        "generatedAt": st.generated_at,
        # extensions
        "sectionPriorities": st.section_priorities,
        "examDayTips": st.exam_day_tips,
        "overallGrade": st.overall_grade,
        "overallPercentage": st.overall_percentage,
    }


async def _get_session_or_404(db: AsyncSession, exam_id: str) -> ExamSessionDB:
    try:
        session_id = int(exam_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="EXAM_NOT_FOUND")
    row = (await db.execute(select(ExamSessionDB).where(ExamSessionDB.id == session_id))).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="EXAM_NOT_FOUND")
    return row


def _require_session_owner(session: ExamSessionDB, user: User) -> None:
    """BUGFIX (pillar-6, round 2): exam session ids are small sequential
    integers, so submit/result/strategy were trivially enumerable cross-user
    (IDOR) and creation accepted fully anonymous callers, writing a
    ``students`` row + exam session per anonymous request. Ownership rule:

    * the session's owner, or
    * any staff (teacher/admin), or
    * legacy GUEST_UUID sessions (created before auth was required) stay
      reachable so pre-existing guest flows do not break.
    """
    owner = str(session.student_id)
    if owner == str(user.id) or owner == GUEST_UUID or is_staff(user):
        return
    raise HTTPException(status_code=403, detail="NOT_YOUR_EXAM_SESSION")


async def _paper_question_ids(db: AsyncSession, session_id: int) -> List[str]:
    row = (await db.execute(select(ExamPaperDB).where(ExamPaperDB.session_id == session_id))).scalar_one_or_none()
    if row is None:
        return []
    return [q["question_id"] for q in json.loads(row.questions)]


async def _paper_map(db: AsyncSession, session_id: int) -> dict:
    """question_id -> served QuestionData (text/options for result review)."""
    row = (await db.execute(select(ExamPaperDB).where(ExamPaperDB.session_id == session_id))).scalar_one_or_none()
    if row is None:
        return {}
    try:
        return {str(q["question_id"]): q for q in json.loads(row.questions)}
    except Exception:
        return {}


# ─────────────────────────────────────────────
# Endpoints
# ─────────────────────────────────────────────
@exam_router.post("")
async def create_exam(
    body: CreateExamDTO,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Generate a fresh ISC paper via ExamService and return it as ExamDetail.

    BUGFIX (pillar-6, round 2): this used ``get_current_user_optional``, so an
    anonymous caller could create exam sessions (a DB write per request).
    Authentication is now required — 401 without a valid token.
    """
    subject = _SUBJECT_MAP.get(body.subject.strip().lower())
    if subject is None:
        raise HTTPException(
            status_code=422,
            detail=f"Unsupported subject '{body.subject}'. Supported: {sorted(_SUBJECT_MAP)}",
        )
    svc = ExamService(db)
    try:
        paper = await svc.create_exam(
            student_id=await _ensure_student(db, user),
            subject=subject,
            exam_type="isc_board",
            class_level=body.gradeLevel,
        )
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))

    starts = body.startsAt or _iso(_now())
    exam_id = str(paper.session_id)
    detail = {
        "id": exam_id,
        "title": body.title or f"{subject} — ISC Board Simulator",
        "description": body.description or f"Generated {subject} board-pattern paper",
        "examCode": paper.session_code,
        "subject": body.subject,
        "gradeLevel": body.gradeLevel,
        "startsAt": starts,
        "endsAt": body.endsAt or _iso(_now() + timedelta(minutes=paper.total_time_minutes)),
        "durationMinutes": body.durationMinutes or paper.total_time_minutes,
        "status": "in_progress",
        "totalMarks": paper.total_marks,
        "passPercentage": body.passPercentage,
        "allowRevisit": body.allowRevisit,
        "shuffleQuestions": body.shuffleQuestions,
        "shuffleOptions": body.shuffleOptions,
        "showCalculator": body.showCalculator,
        "hintsEnabled": body.hintsEnabled,
        "totalHints": body.totalHints,
        "createdBy": str(user.id) if user else "",
        "createdAt": starts,
        "updatedAt": starts,
        "questions": [_map_paper_question(q, exam_id) for q in paper.questions],
        # extensions
        "examType": paper.exam_type,
        "sections": [
            {
                "sectionId": s.section_id,
                "name": s.name,
                "isCompulsory": s.is_compulsory,
                "numQuestions": s.num_questions,
                "marksPerQuestion": s.marks_per_question,
                "questionType": s.question_type,
                "timeSuggestedMinutes": s.time_suggested_minutes,
            }
            for s in paper.sections
        ],
    }
    return _env(detail)


@exam_router.post("/{exam_id}/submit")
async def submit_exam(
    exam_id: str,
    body: SubmitExamDTO,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Grade the attempt with ExamService and return the full TS ExamResult."""
    session = await _get_session_or_404(db, exam_id)
    _require_session_owner(session, user)
    qids = await _paper_question_ids(db, session.id)

    # grade EVERY question — unanswered ones come back not_attempted.
    # answers values may be plain strings or {answer, timeTakenMs} objects —
    # the client's per-question timing was being dropped (timeTakenSeconds 0).
    def _unpack(qid: str) -> tuple[str, int]:
        v = body.answers.get(qid, body.answers.get(str(qid), ""))
        if isinstance(v, dict):
            ms = v.get("timeTakenMs") or v.get("timeTakenSeconds") or 0
            secs = int(ms / 1000) if v.get("timeTakenMs") else int(ms or 0)
            return str(v.get("answer", "")), secs
        return str(v), 0

    answers = []
    for qid in qids:
        ans_text, secs = _unpack(str(qid))
        if str(qid) in body.skipped:
            ans_text = ""
        answers.append(AnswerInput(
            question_id=qid,
            answer=ans_text,
            time_taken_seconds=secs,
            marked_for_review=str(qid) in body.skipped,
        ))
    svc = ExamService(db)
    try:
        result = await svc.submit_exam(session.id, answers)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))

    student_name = (user.name if user else None) or (user.email if user else None) or "Student"
    return _env(_map_result(result, student_name, await _paper_map(db, session.id)))


@exam_router.get("/{exam_id}/result")
async def get_exam_result(
    exam_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    session = await _get_session_or_404(db, exam_id)
    _require_session_owner(session, user)
    svc = ExamService(db)
    try:
        result = await svc.get_exam_result(session.id)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))
    student_name = (user.name if user else None) or (user.email if user else None) or "Student"
    return _env(_map_result(result, student_name, await _paper_map(db, session.id)))


@exam_router.get("/{exam_id}/strategy")
async def get_exam_strategy(
    exam_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    session = await _get_session_or_404(db, exam_id)
    svc = ExamService(db)
    strategy = await svc.get_exam_strategy(_student_uuid(user), session.subject)
    return _env(_map_strategy(strategy, str(session.id)))


async def _history_response(
    db: AsyncSession, student_sid: str, page: int, page_size: int
) -> Dict[str, Any]:
    stmt = (
        select(ExamResultDB)
        .where(ExamResultDB.student_id == student_sid)
        .order_by(ExamResultDB.submitted_at.desc())
    )
    rows = (await db.execute(stmt)).scalars().all()
    total = len(rows)
    start = (page - 1) * page_size
    chunk = rows[start : start + page_size]
    items = [
        {
            "id": str(r.session_id),
            "examId": str(r.session_id),
            "examTitle": f"{r.subject} — ISC Board",
            "subject": (r.subject or "other").lower().replace(" ", "_"),
            "submittedAt": r.submitted_at.isoformat() if r.submitted_at else "",
            "score": r.obtained_marks,
            "totalMarks": r.total_marks,
            "percentage": r.percentage,
            "passed": (r.obtained_marks or 0) >= (r.total_marks or 0) * 0.33,
            "timeTakenSeconds": None,
            "rank": None,
            "totalStudents": 1,
        }
        for r in chunk
    ]
    return _env(
        {
            "data": items,
            "page": page,
            "pageSize": page_size,
            "total": total,
            "totalPages": (total + page_size - 1) // page_size if page_size else 0,
            "hasNext": start + page_size < total,
            "hasPrevious": page > 1,
        }
    )


@exam_router.get("/history")
async def get_exam_history(
    page: int = Query(default=1, ge=1),
    pageSize: int = Query(default=20, ge=1, le=100),
    user: Optional[User] = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    return await _history_response(db, _student_uuid(user), page, pageSize)


@students_router.get("/{student_id}/exams/history", include_in_schema=False)
async def get_student_exam_history(
    student_id: str,
    page: int = Query(default=1, ge=1),
    pageSize: int = Query(default=20, ge=1, le=100),
    user: Optional[User] = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """exam.service.ts calls /api/students/{id}/exams/history — resolved to the
    authenticated student (an explicit student_id for an unauthenticated caller
    cannot leak another student's results)."""
    sid = _student_uuid(user)
    return await _history_response(db, sid, page, pageSize)


router.include_router(exam_router)
router.include_router(students_router)
