# D:\platform\backend\api\diagnostic.py
"""
Diagnostic API Router
=====================
IRT-powered 15-question diagnostic + personalised remediation path generation
for K-12 students (CISCE/ICSE/ISC).

Endpoints
---------
POST   /api/diagnostic/start                        Start a new diagnostic
POST   /api/diagnostic/{session_id}/submit          Submit answer → next Q or finish
GET    /api/diagnostic/{session_id}/result           Full diagnostic report
GET    /api/diagnostic/{session_id}/remediation      Build / view remediation path
POST   /api/diagnostic/{session_id}/remediation/start   Begin first remediation step
POST   /api/diagnostic/{session_id}/remediation/complete Mark step done → next
GET    /api/diagnostic/history/{student_id}          Past diagnostics

Assumed interfaces on existing services
---------------------------------------
QuestionSelector.select_for_diagnostic(subject, topic, grade, stream, count) -> list[dict]
QuestionSelector.select_practice_questions(subject, topic, grade, stream, target_difficulty, count)
PracticeService.get_topics_for_diagnostic(subject, grade, stream) -> list[str]
WorkedExamplesService.get_next_worked_example(student_id, topic, current_mastery) -> dict
LLMClient.chat(messages, temperature, max_tokens, response_format?) -> {"content": str, ...}
BKTModel.update(prior, correct) -> float          (Bayesian update)
IRTModel.estimate_ability(responses) -> float      (list of (difficulty, is_correct))
MasterySyncService.update_topic_mastery(student_id, topic, attempts, subject, grade) -> float
"""

from __future__ import annotations

import json
import logging
import random
import uuid
from collections import defaultdict
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import and_, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db, Student, Attempt, Mastery
from services.knowledge_tracing import BKTModel, IRTModel, AFMModel
from services.llm_client import LLMClient
from services.mastery_sync import MasterySyncService
from services.practice_service import PracticeService
from services.question_selector import QuestionSelector
from services.worked_examples import WorkedExamplesService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/diagnostic", tags=["diagnostic"])

# ──────────────────────────────────────────────────────────────────
#  Constants
# ──────────────────────────────────────────────────────────────────
Q_COUNT = 15
WEAK_THRESHOLD = 0.45          # mastery < this  → weak
STRONG_THRESHOLD = 0.75        # mastery ≥ this → strong
SESSION_TTL = timedelta(hours=4)
REMEDIA_PASS_SCORE = 0.60      # remediation step score ≥ this counts as "passed"

# ──────────────────────────────────────────────────────────────────
#  Pydantic v2 Schemas
# ──────────────────────────────────────────────────────────────────

class DiagnosticStartReq(BaseModel):
    """Kick off a diagnostic for a student."""
    model_config = ConfigDict(str_strip_whitespace=True)
    student_id: str = Field(..., min_length=1, description="Student UUID")
    subject: str = Field(..., min_length=1, max_length=80)
    grade: int = Field(..., ge=1, le=12)
    stream: Optional[str] = Field(None, max_length=30,
                                  description="ISC stream: Science / Commerce / Arts")
    focus_topics: Optional[List[str]] = Field(None,
        description="Limit to specific topics; auto-detect from grade+stream if omitted")


class QuestionView(BaseModel):
    """A single question as the student sees it."""
    model_config = ConfigDict(from_attributes=True)
    question_id: str
    topic: str
    subtopic: str = ""
    difficulty: float
    question_text: str
    options: Optional[List[str]] = None
    question_type: str = "mcq_single"      # mcq_single | mcq_multi | fill_blank | numerical | proof
    marks: int = 1
    hint_available: bool = False


class DiagnosticStartResp(BaseModel):
    session_id: str
    question: QuestionView
    display_order: int
    total_questions: int
    topics_covered: List[str]
    estimated_minutes: int
    message: str


class AnswerSubmitReq(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    question_id: str = Field(..., min_length=1)
    answer: Any
    time_taken_seconds: Optional[int] = Field(None, ge=0)
    used_hint: bool = False


class AnswerSubmitResp(BaseModel):
    is_correct: bool
    correct_answer: Any
    explanation: Optional[str] = None
    topic: str
    mastery_before: float
    mastery_after: float
    mastery_delta: float
    score_so_far: tuple[int, int]           # (correct, total_answered)
    progress: str                            # in_progress | completed
    next_question: Optional[QuestionView] = None


class TopicReport(BaseModel):
    topic: str
    mastery_before: float
    mastery_after: float
    delta: float
    attempted: int
    correct: int
    accuracy: float


class DiagnosticReport(BaseModel):
    """Full diagnostic result — frontend uses this for the report screen."""
    session_id: str
    student_id: str
    subject: str
    grade: int
    stream: Optional[str] = None
    started_at: datetime
    completed_at: datetime
    duration_seconds: int
    total_questions: int
    total_correct: int
    accuracy_percent: float
    overall_mastery_before: float
    overall_mastery_after: float
    mastery_delta: float
    topics: List[TopicReport]
    strengths: List[str]
    weaknesses: List[str]
    irt_ability: Optional[float] = None
    verdict: str                             # strong | proficient | developing | needs_support
    recommendation: str


class RemediationStepOut(BaseModel):
    step_number: int
    topic: str
    subtopic: str
    step_type: str                           # concept_review | worked_example | guided_practice | independent_practice | mastery_check
    title: str
    description: str
    est_minutes: int
    prerequisites: List[int]
    status: str                              # pending | in_progress | completed
    content: Optional[Dict[str, Any]] = None


class RemediationPathOut(BaseModel):
    session_id: str
    weak_topics: List[str]
    total_steps: int
    est_total_minutes: int
    current_step: int
    steps: List[RemediationStepOut]
    generated_at: datetime


class RemediationStartOut(BaseModel):
    session_id: str
    step: RemediationStepOut
    current_step: int
    total_steps: int


class RemediationCompleteReq(BaseModel):
    step_number: int = Field(..., ge=1)
    score: float = Field(..., ge=0.0, le=1.0,
                         description="Performance score 0–1 (1 = perfect)")
    time_seconds: Optional[int] = Field(None, ge=0)
    feedback: Optional[str] = None


class RemediationCompleteOut(BaseModel):
    session_id: str
    step: RemediationStepOut
    mastery_after: float
    next_step: Optional[RemediationStepOut] = None
    complete: bool
    completion_pct: float


class HistoryItem(BaseModel):
    session_id: str
    subject: str
    grade: int
    date: datetime
    accuracy: Optional[float] = None
    mastery_change: Optional[float] = None
    verdict: Optional[str] = None


class HistoryOut(BaseModel):
    student_id: str
    count: int
    items: List[HistoryItem]
    avg_accuracy: Optional[float] = None


# ──────────────────────────────────────────────────────────────────
#  Session Store  (in-memory + TTL; production → Redis / DB table)
# ──────────────────────────────────────────────────────────────────

class SessionStore:
    """Holds active diagnostic sessions & remediation plans in memory."""

    def __init__(self) -> None:
        self._s: Dict[str, Dict[str, Any]] = {}
        self._r: Dict[str, Dict[str, Any]] = {}

    # ── diagnostic sessions ────────────────────────────────────────

    def create(self, **kw: Any) -> Dict[str, Any]:
        sid = uuid.uuid4().hex
        rec: Dict[str, Any] = {
            "session_id": sid,
            "status": "active",
            "created_at": datetime.utcnow(),
            "expires_at": datetime.utcnow() + SESSION_TTL,
            **kw,
        }
        self._s[sid] = rec
        logger.info("Diagnostic session %s created — student=%d subject=%s grade=%d",
                     sid, kw["student_id"], kw["subject"], kw["grade"])
        return rec

    def get(self, sid: str) -> Optional[Dict[str, Any]]:
        r = self._s.get(sid)
        if r and r["expires_at"] < datetime.utcnow():
            self._s.pop(sid, None)
            self._r.pop(sid, None)
            return None
        return r

    def mark_done(self, sid: str) -> None:
        r = self._s.get(sid)
        if r:
            r["status"] = "completed"
            r["completed_at"] = datetime.utcnow()

    # ── remediation ────────────────────────────────────────────────

    def put_remediation(self, sid: str, rem: Dict[str, Any]) -> None:
        self._r[sid] = rem

    def get_remediation(self, sid: str) -> Optional[Dict[str, Any]]:
        return self._r.get(sid)

    def advance(self, sid: str, step_idx: int) -> Optional[Dict[str, Any]]:
        rem = self._r.get(sid)
        if rem:
            rem["current_step_index"] = step_idx
            if step_idx >= len(rem["steps"]):
                rem["status"] = "completed"
                rem["completed_at"] = datetime.utcnow()
        return rem


store = SessionStore()


# ──────────────────────────────────────────────────────────────────
#  Helper utilities
# ──────────────────────────────────────────────────────────────────

async def _student_or_404(db: AsyncSession, sid: str) -> Student:
    r = await db.execute(select(Student).where(Student.id == sid))
    s = r.scalar_one_or_none()
    if not s:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Student {sid} not found")
    return s


async def _load_masteries(
    db: AsyncSession, sid: str, topics: List[str]
) -> Dict[str, float]:
    """Load mastery scores for a student's topics.
    Since topics table may be empty, returns default 0.1 for all topics.
    """
    if not topics:
        return {}
    try:
        r = await db.execute(
            select(Mastery).where(Mastery.student_id == sid)
        )
        rows = {str(m.topic_id): (m.bkt_p_know or 0.1) for m in r.scalars()}
        return {t: rows.get(t, 0.1) for t in topics}
    except Exception:
        return {t: 0.1 for t in topics}


def _avg_mastery(d: Dict[str, float]) -> float:
    return sum(d.values()) / len(d) if d else 0.1


def _grade(q: Dict[str, Any], ans: Any) -> tuple[bool, Any]:
    """Compare student answer to correct answer across question types."""
    correct = q.get("correct_answer")
    qt = q.get("question_type", "mcq_single")

    if qt == "mcq_single":
        return str(ans).strip().lower() == str(correct).strip().lower(), correct

    if qt == "mcq_multi":
        if isinstance(ans, list):
            return set(str(x) for x in ans) == set(str(x) for x in (correct or [])), correct
        return False, correct

    if qt in ("fill_blank", "text"):
        s_clean = str(ans).strip().lower().replace(" ", "")
        c_clean = str(correct).strip().lower().replace(" ", "")
        return s_clean == c_clean, correct

    if qt == "numerical":
        try:
            return abs(float(ans) - float(correct)) < 1e-4, correct
        except Exception:
            return False, correct

    # proof / open-ended → string match (LLM-based grading is future scope)
    return str(ans).strip().lower() == str(correct).strip().lower(), correct


def _verdict(accuracy: float) -> str:
    if accuracy >= 0.85:
        return "strong"
    if accuracy >= 0.65:
        return "proficient"
    if accuracy >= 0.40:
        return "developing"
    return "needs_support"


def _topic_accuracy(sess: Dict[str, Any], topic: str) -> float:
    att, cor = 0, 0
    for i_str, a in sess["answers"].items():
        if sess["questions"][int(i_str)].get("topic") == topic:
            att += 1
            if a["is_correct"]:
                cor += 1
    return cor / att if att else 0.0


# ──────────────────────────────────────────────────────────────────
#  Question selection
# ──────────────────────────────────────────────────────────────────

def _default_topics_for_subject(subject: str, grade: int) -> List[str]:
    """Return default topic list for a subject when DB topics table is empty."""
    s = subject.lower().strip()
    topic_map = {
        "mathematics": ["algebra", "geometry", "trigonometry", "statistics", "probability"],
        "maths": ["algebra", "geometry", "trigonometry", "statistics", "probability"],
        "physics": ["mechanics", "electricity", "optics", "thermodynamics", "waves"],
        "chemistry": ["organic_chemistry", "physical_chemistry", "inorganic_chemistry"],
        "biology": ["cell_biology", "genetics", "ecology", "human_physiology"],
        "english": ["grammar", "comprehension", "writing", "literature"],
        "hindi": ["grammar", "comprehension", "writing", "literature"],
        "history": ["ancient_history", "medieval_history", "modern_history"],
        "geography": ["physical_geography", "human_geography", "indian_geography"],
        "civics": ["constitution", "democracy", "governance"],
        "economics": ["microeconomics", "macroeconomics", "indian_economy"],
        "computer_science": ["programming", "data_structures", "algorithms"],
        "cs": ["programming", "data_structures", "algorithms"],
    }
    return topic_map.get(s, [subject])


async def _select_diagnostic_questions(
    db: AsyncSession,
    student_id: str,
    subject: str,
    grade: int,
    stream: Optional[str],
    focus: Optional[List[str]],
) -> tuple[List[Dict[str, Any]], List[str]]:
    """
    Pick Q_COUNT questions spread across topics using IRT-based selector.
    Returns (questions_list, topic_list).
    """
    if focus:
        topics = list(dict.fromkeys(focus))            # deduplicate, preserve order
    else:
        # Default topics by subject — since topics table may be empty
        topics = _default_topics_for_subject(subject, grade)
        topics = topics or [subject]

    # Evenly distribute Q_COUNT questions across topics
    n = len(topics)
    base, extra = divmod(Q_COUNT, n)
    dist = {t: base + (1 if i < extra else 0) for i, t in enumerate(topics)}
    dist = {t: max(1, c) for t, c in dist.items()}     # ≥1 per topic
    total = sum(dist.values())
    while total > Q_COUNT:
        mx = max(dist, key=dist.get)
        dist[mx] -= 1
        total -= 1
    while total < Q_COUNT:
        mn = min(dist, key=dist.get)
        dist[mn] += 1
        total += 1

    selector = QuestionSelector(db)
    questions: List[Dict[str, Any]] = []
    for topic, count in dist.items():
        try:
            qs = await selector.select_for_diagnostic(
                subject=subject, topic=topic, grade=grade, stream=stream, count=count,
            )
            questions.extend(qs)
        except Exception as exc:
            logger.warning("Question selection failed for topic %s: %s", topic, exc)

    if not questions:
        raise ValueError("No questions available")

    random.shuffle(questions)
    for i, q in enumerate(questions):
        q["display_order"] = i + 1

    return questions, list(dist.keys())


# ──────────────────────────────────────────────────────────────────
#  Remediation path builder
# ──────────────────────────────────────────────────────────────────

def _mk_step(
    num: int, topic: str, sub: str, stype: str,
    title: str, desc: str, mins: int,
    prereqs: List[int], status: str,
    content: Optional[Dict[str, Any]], m_before: float,
) -> Dict[str, Any]:
    return dict(
        step_number=num, topic=topic, subtopic=sub, step_type=stype,
        title=title, description=desc, est_minutes=mins,
        prerequisites=prereqs, status=status,
        content=content, mastery_before=m_before, mastery_after=None,
    )


async def _concept_review(llm: LLMClient, topic: str, grade: int) -> Dict[str, Any]:
    """Generate a concise concept review via LLM; fall back to template."""
    prompt = (
        f"Create a concise concept review for the topic '{topic}' for a grade {grade} "
        f"student (ICSE/CBSE curriculum). "
        "Return JSON with keys: title, description, key_points (list of strings), "
        "common_mistake (string). Keep it short and student-friendly."
    )
    try:
        r = await llm.chat(
            messages=[{"role": "user", "content": prompt}],
            temperature=0.4, max_tokens=400,
            response_format={"type": "json_object"},
        )
        d = json.loads(r["content"])
        return {
            "title": d.get("title", f"{topic} — Quick Revision"),
            "description": d.get("description",
                                  f"Revise key concepts of {topic}."),
            "content": d,
        }
    except Exception as exc:
        logger.warning("LLM concept review failed for %s: %s", topic, exc)
        return {
            "title": f"{topic} — Quick Revision",
            "description": (
                f"Revise the core concepts of {topic}. "
                f"Read your textbook chapter, note formulas & definitions."
            ),
            "content": {
                "title": f"{topic} — Quick Revision",
                "description": f"Key concepts of {topic} for grade {grade}.",
                "key_points": [
                    f"Definition & fundamentals of {topic}",
                    f"Important formulas / rules for {topic}",
                    f"Common problem patterns in {topic}",
                ],
                "common_mistake": (
                    f"Students often confuse {topic} with similar topics — "
                    "always read the question carefully before solving."
                ),
            },
        }


async def _build_remediation(
    db: AsyncSession,
    student_id: str,
    session: Dict[str, Any],
    mastery_after: Dict[str, float],
) -> List[Dict[str, Any]]:
    """Build a 5-step-per-topic remediation plan (concept review → mastery check)."""
    we_svc = None
    try:
        we_svc = WorkedExamplesService(db)
    except Exception as exc:
        logger.warning("WorkedExamplesService init failed: %s", exc)
    llm = LLMClient()
    selector = QuestionSelector(db)

    all_topics = list(set(q.get("topic", "general") for q in session["questions"]))
    # Pick weakest topics first
    weak = sorted(all_topics, key=lambda t: mastery_after.get(t, 0.1))
    weak = weak[: max(1, len(all_topics) // 2)] or all_topics

    steps: List[Dict[str, Any]] = []
    sn = 1

    for topic in weak:
        m = mastery_after.get(topic, 0.1)

        # ① Concept review
        review = await _concept_review(llm, topic, session["grade"])
        steps.append(_mk_step(sn, topic, topic, "concept_review",
                              review["title"], review["description"],
                              max(3, int(5 * (1 - m))), [], "pending",
                              review["content"], m))
        p1 = [sn]; sn += 1

        # ② Worked example (fading)
        try:
            if we_svc is not None:
                we = await we_svc.get_next_worked_example(
                    student_id=student_id, topic=topic, current_mastery=m,
                )
            else:
                raise RuntimeError("WorkedExamplesService not available")
        except Exception:
            we = {"title": topic, "steps": ["Review the problem", "Apply formula", "Verify answer"],
                  "fading_level": 1}
        steps.append(_mk_step(sn, topic, we.get("subtopic", topic), "worked_example",
                              f"Example: {we.get('title', topic)}",
                              "Study the worked solution carefully.", 5, p1,
                              "pending", {"type": "worked_example", "data": we}, m))
        p2 = [sn]; sn += 1

        # ③ Guided practice
        gqs = []
        try:
            gqs = await selector.select_practice_questions(
                session["subject"], topic, session["grade"], session.get("stream"),
                max(0.1, m - 0.1), 2,
            )
        except Exception:
            pass
        steps.append(_mk_step(sn, topic, topic, "guided_practice",
                              f"Guided Practice: {topic}",
                              f"Solve {len(gqs)} problems. Hints available on tap.",
                              5 + len(gqs) * 3, p2, "pending",
                              {"type": "practice_set", "questions": gqs}, m))
        p3 = [sn]; sn += 1

        # ④ Independent practice
        iqs = []
        try:
            iqs = await selector.select_practice_questions(
                session["subject"], topic, session["grade"], session.get("stream"), m, 3,
            )
        except Exception:
            pass
        steps.append(_mk_step(sn, topic, topic, "independent_practice",
                              f"Test Yourself: {topic}",
                              f"Solve {len(iqs)} problems without hints.",
                              5 + len(iqs) * 4, p3, "pending",
                              {"type": "practice_set", "questions": iqs}, m))
        p4 = [sn]; sn += 1

        # ⑤ Mastery check
        cqs = []
        try:
            cqs = await selector.select_for_diagnostic(
                subject=session["subject"], topic=topic,
                grade=session["grade"], stream=session.get("stream"), count=2,
            )
        except Exception:
            pass
        steps.append(_mk_step(sn, topic, topic, "mastery_check",
                              f"Mastery Check: {topic}",
                              f"Answer {len(cqs)} questions to confirm mastery.",
                              5 + len(cqs) * 3, p4, "pending",
                              {"type": "mastery_check", "questions": cqs,
                               "pass_score": REMEDIA_PASS_SCORE}, m))
        sn += 1

    return steps


# ──────────────────────────────────────────────────────────────────
#  Endpoints
# ──────────────────────────────────────────────────────────────────

@router.post("/start", response_model=DiagnosticStartResp,
             status_code=status.HTTP_201_CREATED,
             summary="Start a diagnostic test")
async def start_diagnostic(
    req: DiagnosticStartReq,
    db: AsyncSession = Depends(get_db),
) -> DiagnosticStartResp:
    """Start a 15-question adaptive diagnostic for a student."""
    student = await _student_or_404(db, req.student_id)

    questions, topics = await _select_diagnostic_questions(
        db, req.student_id, req.subject, req.grade, req.stream, req.focus_topics,
    )

    mastery_before = await _load_masteries(db, req.student_id, topics)

    sess = store.create(
        student_id=req.student_id,
        subject=req.subject,
        grade=req.grade,
        stream=req.stream,
        questions={str(i): q for i, q in enumerate(questions)},
        answers={},
        mastery_before=mastery_before,
        mastery_after={},
        topics=topics,
    )

    first_q = questions[0]
    return DiagnosticStartResp(
        session_id=sess["session_id"],
        question=QuestionView(
            question_id=str(first_q.get("question_id", "")),
            topic=first_q.get("topic", req.subject),
            subtopic=first_q.get("subtopic", ""),
            difficulty=float(first_q.get("difficulty", 0.5)),
            question_text=first_q.get("text", first_q.get("question_text", "")),
            options=first_q.get("options"),
            question_type=first_q.get("question_type", "mcq_single"),
        ),
        display_order=1,
        total_questions=len(questions),
        topics_covered=topics,
        estimated_minutes=len(questions) * 2,
        message="Diagnostic started. Answer all questions for a complete report.",
    )


@router.post("/{session_id}/submit", response_model=AnswerSubmitResp,
             summary="Submit answer and get next question")
async def submit_diagnostic_answer(
    session_id: str,
    req: AnswerSubmitReq,
    db: AsyncSession = Depends(get_db),
) -> AnswerSubmitResp:
    """Submit an answer for a diagnostic question."""
    sess = store.get(session_id)
    if not sess:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Diagnostic session not found or expired.")

    q_idx = None
    for i_str, q in sess["questions"].items():
        if str(q.get("question_id", "")) == str(req.question_id):
            q_idx = i_str
            break
    if q_idx is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Question {req.question_id} not in this diagnostic.")

    question = sess["questions"][q_idx]
    is_correct, correct_answer = _grade(question, req.answer)

    sess["answers"][q_idx] = {
        "is_correct": is_correct,
        "answer": req.answer,
        "time_seconds": req.time_taken_seconds or 0,
        "used_hint": req.used_hint,
    }

    answered = len(sess["answers"])
    total = len(sess["questions"])
    correct_count = sum(1 for a in sess["answers"].values() if a["is_correct"])

    mastery_before = sess["mastery_before"].get(question.get("topic", ""), 0.1)
    mastery_after = mastery_before + (0.1 if is_correct else -0.05)
    mastery_after = max(0.0, min(1.0, mastery_after))

    is_complete = answered >= total
    next_q_view: Optional[QuestionView] = None

    if not is_complete:
        next_idx = str(answered)
        if next_idx in sess["questions"]:
            nq = sess["questions"][next_idx]
            next_q_view = QuestionView(
                question_id=str(nq.get("question_id", "")),
                topic=nq.get("topic", sess["subject"]),
                subtopic=nq.get("subtopic", ""),
                difficulty=float(nq.get("difficulty", 0.5)),
                question_text=nq.get("text", nq.get("question_text", "")),
                options=nq.get("options"),
                question_type=nq.get("question_type", "mcq_single"),
            )
    else:
        store.mark_done(session_id)
        sess["mastery_after"] = {t: sess["mastery_before"].get(t, 0.1) for t in sess["topics"]}
        for i_str, a in sess["answers"].items():
            t = sess["questions"][i_str].get("topic", "")
            if t in sess["mastery_after"]:
                delta = 0.1 if a["is_correct"] else -0.05
                sess["mastery_after"][t] = max(0.0, min(1.0, sess["mastery_after"][t] + delta))

    return AnswerSubmitResp(
        is_correct=is_correct,
        correct_answer=correct_answer,
        explanation=question.get("explanation", ""),
        topic=question.get("topic", ""),
        mastery_before=round(mastery_before, 3),
        mastery_after=round(mastery_after, 3),
        mastery_delta=round(mastery_after - mastery_before, 3),
        score_so_far=(correct_count, answered),
        progress="completed" if is_complete else "in_progress",
        next_question=next_q_view,
    )


@router.get("/{session_id}/result", response_model=DiagnosticReport,
            summary="Get full diagnostic report")
async def get_diagnostic_result(
    session_id: str,
    db: AsyncSession = Depends(get_db),
) -> DiagnosticReport:
    """Get the full diagnostic report for a completed session."""
    sess = store.get(session_id)
    if not sess:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Diagnostic session not found.")
    if sess["status"] != "completed":
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Diagnostic not yet completed.")

    answers = sess["answers"]
    questions = sess["questions"]
    total = len(questions)
    correct = sum(1 for a in answers.values() if a["is_correct"])
    accuracy = correct / total if total else 0.0

    topics = sess["topics"]
    mastery_before = sess["mastery_before"]
    mastery_after = sess.get("mastery_after", mastery_before)

    topic_reports = []
    for t in topics:
        att = sum(1 for i, q in questions.items() if q.get("topic") == t and i in answers)
        cor = sum(1 for i, q in questions.items() if q.get("topic") == t and i in answers and answers[i]["is_correct"])
        topic_reports.append(TopicReport(
            topic=t,
            mastery_before=round(mastery_before.get(t, 0.1), 3),
            mastery_after=round(mastery_after.get(t, 0.1), 3),
            delta=round(mastery_after.get(t, 0.1) - mastery_before.get(t, 0.1), 3),
            attempted=att,
            correct=cor,
            accuracy=round(cor / att, 3) if att else 0.0,
        ))

    strengths = [t.topic for t in topic_reports if t.accuracy >= STRONG_THRESHOLD]
    weaknesses = [t.topic for t in topic_reports if t.accuracy < WEAK_THRESHOLD]

    overall_before = _avg_mastery(mastery_before)
    overall_after = _avg_mastery(mastery_after)

    started = sess["created_at"]
    completed = sess.get("completed_at", datetime.utcnow())
    duration = int((completed - started).total_seconds()) if completed else 0

    return DiagnosticReport(
        session_id=session_id,
        student_id=sess["student_id"],
        subject=sess["subject"],
        grade=sess["grade"],
        stream=sess.get("stream"),
        started_at=started,
        completed_at=completed,
        duration_seconds=duration,
        total_questions=total,
        total_correct=correct,
        accuracy_percent=round(accuracy * 100, 1),
        overall_mastery_before=round(overall_before, 3),
        overall_mastery_after=round(overall_after, 3),
        mastery_delta=round(overall_after - overall_before, 3),
        topics=topic_reports,
        strengths=strengths,
        weaknesses=weaknesses,
        irt_ability=None,
        verdict=_verdict(accuracy),
        recommendation=(
            f"Focus on: {', '.join(weaknesses[:3])}" if weaknesses
            else "Performance is strong across all topics."
        ),
    )


@router.get("/{session_id}/remediation", response_model=RemediationPathOut,
            summary="Build or view remediation path")
async def get_remediation(
    session_id: str,
    db: AsyncSession = Depends(get_db),
) -> RemediationPathOut:
    """Build a remediation path for weak topics identified in the diagnostic."""
    sess = store.get(session_id)
    if not sess:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Diagnostic session not found.")
    if sess["status"] != "completed":
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Complete the diagnostic first.")

    existing = store.get_remediation(session_id)
    if existing:
        return RemediationPathOut(
            session_id=session_id,
            weak_topics=existing.get("weak_topics", []),
            total_steps=len(existing["steps"]),
            est_total_minutes=sum(s["est_minutes"] for s in existing["steps"]),
            current_step=existing.get("current_step_index", 0),
            steps=[RemediationStepOut(**{k: v for k, v in s.items() if k in RemediationStepOut.model_fields})
                   for s in existing["steps"]],
        )

    mastery_after = sess.get("mastery_after", sess["mastery_before"])
    steps = await _build_remediation(db, sess["student_id"], sess, mastery_after)

    weak_topics = sorted(
        sess["topics"],
        key=lambda t: mastery_after.get(t, 0.1),
    )[:max(1, len(sess["topics"]) // 2)]

    rem = {
        "weak_topics": weak_topics,
        "steps": steps,
        "current_step_index": 0,
        "status": "active",
    }
    store.put_remediation(session_id, rem)

    return RemediationPathOut(
        session_id=session_id,
        weak_topics=weak_topics,
        total_steps=len(steps),
        est_total_minutes=sum(s["est_minutes"] for s in steps),
        current_step=0,
        steps=[RemediationStepOut(**{k: v for k, v in s.items() if k in RemediationStepOut.model_fields})
               for s in steps],
    )


@router.post("/{session_id}/remediation/complete", response_model=RemediationCompleteOut,
             summary="Complete a remediation step")
async def complete_remediation_step(
    session_id: str,
    req: RemediationCompleteReq,
    db: AsyncSession = Depends(get_db),
) -> RemediationCompleteOut:
    """Mark a remediation step as complete and advance to the next."""
    rem = store.get_remediation(session_id)
    if not rem:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No remediation path found.")

    step_idx = req.step_number - 1
    if step_idx < 0 or step_idx >= len(rem["steps"]):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, f"Invalid step number: {req.step_number}")

    rem["steps"][step_idx]["status"] = "completed"
    next_idx = step_idx + 1
    store.advance(session_id, next_idx)

    current_step = rem["steps"][step_idx]
    next_step = None
    is_complete = next_idx >= len(rem["steps"])
    if not is_complete:
        next_step_data = rem["steps"][next_idx]
        next_step = RemediationStepOut(
            **{k: v for k, v in next_step_data.items() if k in RemediationStepOut.model_fields}
        )

    completion_pct = round((next_idx / len(rem["steps"])) * 100, 1)

    return RemediationCompleteOut(
        session_id=session_id,
        step=RemediationStepOut(**{k: v for k, v in current_step.items() if k in RemediationStepOut.model_fields}),
        mastery_after=min(1.0, (rem["steps"][step_idx].get("mastery_before", 0.1) + req.score * 0.2)),
        next_step=next_step,
        complete=is_complete,
        completion_pct=completion_pct,
    )


@router.get("/history/{student_id}", response_model=HistoryOut,
            summary="Get diagnostic history for a student")
async def get_history(
    student_id: str,
    db: AsyncSession = Depends(get_db),
) -> HistoryOut:
    """Get past diagnostic sessions for a student (from in-memory store)."""
    await _student_or_404(db, student_id)

    items = []
    for sid, sess in store._s.items():
        if sess.get("student_id") == student_id and sess["status"] == "completed":
            total = len(sess["questions"])
            correct = sum(1 for a in sess["answers"].values() if a["is_correct"])
            acc = correct / total if total else None
            items.append(HistoryItem(
                session_id=sid,
                subject=sess["subject"],
                grade=sess["grade"],
                date=sess.get("completed_at", sess["created_at"]),
                accuracy=round(acc, 3) if acc else None,
                mastery_change=None,
                verdict=_verdict(acc) if acc else None,
            ))

    items.sort(key=lambda x: x.date, reverse=True)
    avg_acc = sum(i.accuracy for i in items if i.accuracy) / len(items) if items else None

    return HistoryOut(
        student_id=student_id,
        count=len(items),
        items=items,
        avg_accuracy=round(avg_acc, 3) if avg_acc else None,
    )