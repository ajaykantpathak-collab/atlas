"""
Diagnostics API Router — thin FastAPI adapter over the EXISTING
`services.diagnostic_service.DiagnosticService` engine (IRT adaptive
diagnostic with BKT mastery, misconception detection, remediation paths).

Contract source of truth: `frontend/services/diagnostic.service.ts`
(+ `app/(student)/diagnostic/page.tsx`).  Endpoints:

  POST /api/diagnostics/start                                    → DiagnosticSession
  POST /api/diagnostics/{session_id}/submit                      → DiagnosticResult
  GET  /api/diagnostics/{session_id}/result                      → DiagnosticResult
  GET  /api/diagnostics/history                                  → DiagnosticHistoryResponse
  POST /api/diagnostics/mutations/replay                         → replay ack
  GET  /api/diagnostics/{session_id}/remediation                 → RemediationPath
  POST /api/diagnostics/{session_id}/remediation/steps/{sid}/start    → RemediationPath
  POST /api/diagnostics/{session_id}/remediation/steps/{sid}/complete → RemediationPath
  GET  /api/diagnostics/{session_id}/misconceptions              → MisconceptionsResponse

Design notes
------------
* The frontend page answers the whole question set locally and batch-submits
  once, so POST /start plans the full question set up-front (real questions
  from the same QuestionSelector generators the working /practice flow uses)
  while POST /submit still drives the engine ONE ANSWER AT A TIME
  (submit_diagnostic_answer) — BKT mastery, IRT ability curve, misconception
  detection and persistence all run through the real engine.
* Everything is DB-persisted: sessions in the engine's `diagnostic_sessions`
  table; the question plan + remediation step progress in a side table
  `diagnostic_plans`.  Reload-safe: /start resumes, /result re-reads.
* No fabricated content: if the generator bank yields no questions the
  endpoint returns 503 rather than inventing items.
"""

from __future__ import annotations

import asyncio
import json
import logging
import math
import re
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import Column, String, Text, select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import Base, engine, get_db
from backend.deps import get_current_user
from backend.models.user import User

# ── The existing engine (NOT rewritten — only wrapped) ──────────────────────
from backend.services.diagnostic_service import (
    DiagnosticService,
    DiagnosticSession as DiagnosticSessionORM,
    MisconceptionsResponse,
)
from backend.services.question_selector import QuestionSelector

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/diagnostics", tags=["diagnostics"])

TOTAL_QUESTIONS = 15
INITIAL_ABILITY = -0.5
DEFAULT_IRT_DISCRIMINATION = 1.2
DEFAULT_IRT_GUESS = 0.2

# ══════════════════════════════════════════════════════════════════════════════
#  Plan persistence (question plan + remediation step progress)
# ══════════════════════════════════════════════════════════════════════════════


class DiagnosticPlanRow(Base):
    __tablename__ = "diagnostic_plans"

    session_id = Column(String(36), primary_key=True)
    plan_json = Column(Text, nullable=False, default="{}")
    updated_at = Column(String(40), nullable=True)

    def to_data(self) -> dict:
        try:
            return json.loads(self.plan_json or "{}")
        except Exception:
            return {}

    def set_data(self, data: dict) -> None:
        self.plan_json = json.dumps(data)
        self.updated_at = datetime.now(timezone.utc).isoformat()


_TABLES_READY = False
_TABLES_LOCK = asyncio.Lock()


async def _ensure_tables() -> None:
    """Idempotently create the diagnostic tables (engine table + plan table)."""
    global _TABLES_READY
    if _TABLES_READY:
        return
    async with _TABLES_LOCK:
        if _TABLES_READY:
            return
        async with engine.begin() as conn:
            await conn.run_sync(
                lambda sync_conn: Base.metadata.create_all(
                    sync_conn,
                    tables=[
                        DiagnosticSessionORM.__table__,
                        DiagnosticPlanRow.__table__,
                    ],
                )
            )
        _TABLES_READY = True


# ══════════════════════════════════════════════════════════════════════════════
#  Request schemas (shape the frontend sends)
# ══════════════════════════════════════════════════════════════════════════════


class DiagnosticConfigIn(BaseModel):
    subjects: List[str] = Field(default_factory=lambda: ["Mathematics"])
    gradeLevel: int = Field(default=10, ge=1, le=12)
    board: str = "CBSE"
    language: str = "en"
    questionCountPerSubject: int = Field(default=15, ge=1, le=30)
    timeLimitMinutes: Optional[int] = None
    adaptiveEnabled: bool = True


class StartDiagnosticIn(BaseModel):
    studentId: Optional[str] = None  # advisory only; token identity wins
    config: DiagnosticConfigIn = Field(default_factory=DiagnosticConfigIn)


class AnswerRecordIn(BaseModel):
    questionId: str
    selectedOptionId: str  # option index (MCQ, as string) or raw text
    isCorrect: Optional[bool] = None  # client hint; server re-grades
    timeSpentSeconds: float = 60
    submittedAt: Optional[str] = None


class SubmitDiagnosticIn(BaseModel):
    answers: List[AnswerRecordIn] = Field(min_length=1)
    completedAt: Optional[str] = None


class CompleteStepIn(BaseModel):
    stepId: str
    score: float = 0
    timeSpentSeconds: float = 0


class ReplayMutationIn(BaseModel):
    id: Optional[str] = None
    type: Optional[str] = None
    payload: Optional[Dict[str, Any]] = None
    timestamp: Optional[int] = None
    retryCount: Optional[int] = None


# ══════════════════════════════════════════════════════════════════════════════
#  Engine dependency adapters (satisfy the interfaces the engine expects)
# ══════════════════════════════════════════════════════════════════════════════


def _slug(tag: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", (tag or "").lower()).strip("_")
    return slug or "general"


def _humanise(tag: str) -> str:
    return (tag or "").replace("_", " ").strip().title() or "General"


class _PlanQuestionBank:
    """Canonical view over the persisted plan — one source of truth."""

    def __init__(self, plan: List[dict]):
        self.plan = plan
        self.by_id: Dict[str, dict] = {q["question_id"]: q for q in plan}

    def raw(self, q: dict) -> dict:
        """Engine 'raw question' shape (what _normalise_question expects).
        Carries both `id` and `question_id` because the engine also stores
        this dict verbatim in questions_asked_list and indexes it by
        `question_id` during submit."""
        return {
            "id": q["question_id"],
            "question_id": q["question_id"],
            "subskill": q.get("subskill", "general"),
            "text": q.get("question_text", ""),
            "options": q.get("options") or [],
            "difficulty": float(q.get("difficulty_beta", 0.0)),
            "phase": q.get("phase", "initial"),
            "hint_available": True,
        }

    def canonical(self, question_id: str) -> Optional[dict]:
        q = self.by_id.get(question_id)
        if q is None:
            return None
        raw = self.raw(q)
        raw["correct_answer"] = q.get("correct_answer", "")
        raw["explanation"] = q.get("explanation", "")
        return raw


class PlanReplaySelector:
    """Engine calls selector.get_next_question(...) after each answer.
    Replays the pre-planned question at the next unanswered index so the
    batch-submit contract still flows through the engine one answer at a
    time (order preserved, no duplicates)."""

    def __init__(self, bank: _PlanQuestionBank, session: "DiagnosticSessionORM"):
        self.bank = bank
        self.session = session

    async def get_next_question(self, **_: Any) -> dict:
        idx = len(self.session.responses_list)
        if idx < len(self.bank.plan):
            return self.bank.raw(self.bank.plan[idx])
        raise AttributeError("plan exhausted")


class PlanPracticeSource:
    """Engine calls practice.generate_question / get_question /
    get_explanation.  All served from the persisted plan (the questions the
    session actually issued) — deterministic and reload-safe."""

    def __init__(self, bank: _PlanQuestionBank, selector: PlanReplaySelector):
        self.bank = bank
        self._selector = selector

    async def generate_question(self, subskill: str = "", difficulty: str = "") -> dict:
        return await self._selector.get_next_question()

    async def get_question(self, question_id: str) -> Optional[dict]:
        return self.bank.canonical(question_id)

    async def get_explanation(self, question_id: str) -> str:
        q = self.bank.by_id.get(question_id)
        return (q or {}).get("explanation", "")


class HeuristicLLM:
    """No LLM key is configured; the engine treats a 'null' response as
    'no misconception classification' and falls back to its rule-based
    explanations and module content.  Honest heuristic mode."""

    async def generate(self, **_: Any) -> str:
        return "null"


class _NoWorkedExamples:
    async def get_examples_for_subskill(self, subskill: str) -> list:
        return []

    async def get_examples(self, subskill: str) -> list:
        return []


class SessionIRT:
    """Engine calls irt_model.current_ability(student_id) and
    irt_model.update(student_id, question_difficulty, correct).
    Backed by the session's persisted ability_history (reload-safe),
    using the real 3PL update from backend.its IRTModel."""

    def __init__(self, session: "DiagnosticSessionORM"):
        self.session = session
        from its.diagnosis.knowledge_tracing import IRTModel

        self._irt = IRTModel

    def current_ability(self, student_id: str = "") -> float:
        hist = self.session.ability_history_list
        return hist[-1] if hist else INITIAL_ABILITY

    def update(self, student_id: str = "", question_difficulty: float = 0.0,
               correct: bool = False) -> float:
        new_theta = self._irt.update_theta(
            current_theta=self.current_ability(),
            difficulty_b=float(question_difficulty),
            discrimination_a=DEFAULT_IRT_DISCRIMINATION,
            guessing_c=DEFAULT_IRT_GUESS,
            is_correct=bool(correct),
        )
        hist = self.session.ability_history_list
        hist.append(round(float(new_theta), 4))
        self.session.ability_history_list = hist
        return float(new_theta)


def _build_engine(db: AsyncSession, session: "DiagnosticSessionORM",
                  bank: _PlanQuestionBank) -> DiagnosticService:
    replay = PlanReplaySelector(bank, session)
    svc = DiagnosticService(
        db=db,
        practice_svc=PlanPracticeSource(bank, replay),
        selector=replay,
        llm_client=HeuristicLLM(),
        worked_svc=_NoWorkedExamples(),
    )
    svc.irt_model = SessionIRT(session)  # instance attr shadows class attr
    return svc


# ══════════════════════════════════════════════════════════════════════════════
#  Question plan generation (real questions via the /practice selector)
# ══════════════════════════════════════════════════════════════════════════════

_PHASE_LABELS = ("initial", "initial", "initial") + ("adaptive",) * 7 + ("confirmation",) * 5


def _answerable(q: dict) -> bool:
    """A question is servable when it has a correct answer we can grade.
    Dict/list-repr answers (parametric multi-part generators) can't be
    typed by a student, so they are excluded."""
    ans = str(q.get("correct_answer") or "").strip()
    if not ans:
        return False
    if ans[0] in "{[(" and ans[-1] in "}])":
        return False
    return True


def _has_options(q: dict) -> bool:
    return isinstance(q.get("options"), list) and len(q["options"]) >= 2


def _norm_candidate(q: dict, topic_fallback: str) -> Optional[dict]:
    text = str(q.get("question_text") or q.get("text") or "").strip()
    if not text or not _answerable(q):
        return None
    options = q.get("options")
    if not isinstance(options, list):
        options = []
    qid = str(q.get("question_id") or "").strip()
    if not qid:
        return None
    topic_label = str(q.get("topic") or topic_fallback or "general")
    try:
        beta = float(q.get("difficulty") or 0.0)
    except (TypeError, ValueError):
        beta = 0.0
    return {
        "question_id": qid,
        "subskill": _slug(topic_label),
        "topic_label": topic_label,
        "question_text": text,
        "options": [str(o) for o in options],
        "correct_answer": str(q.get("correct_answer") or "").strip(),
        "explanation": str(q.get("explanation") or ""),
        "difficulty_beta": beta,
        "question_type": str(q.get("question_type") or "mcq"),
        "phase": "initial",
    }


async def _build_plan(db: AsyncSession, student_id: str, subject: str,
                      grade: int, count: int) -> List[dict]:
    """Collect `count` unique REAL questions for the plan.

    Strategies, best-quality first (all real platform content — nothing
    fabricated; if the pool is empty we 503):
      1. QuestionSelector.select_for_diagnostic — grade-matched generators
         across the subject, varied difficulty (the platform's own
         diagnostic-selection API).
      2. Direct adapter seed sweep across every generator qtype matched to
         the subject (same call the selector's _get_candidates makes).
      3. select_next loop with difficulty jitter (adaptive context).
    Pool is deduped by question_id; questions with MCQ options are placed
    first, then fill-in/text questions, easier ones earlier.
    """
    selector = QuestionSelector(db)
    pool: Dict[str, dict] = {}

    def _absorb(raw: Any, topic_fallback: str) -> None:
        norm = _norm_candidate(raw, topic_fallback)
        if norm is not None and norm["question_id"] not in pool:
            pool[norm["question_id"]] = norm

    # 1) grade-matched diagnostic selection
    for topic in dict.fromkeys([subject, f"{subject} basics", subject.lower()]):
        try:
            qs = await selector.select_for_diagnostic(
                subject=subject, topic=topic, grade=grade,
                count=max(count, 10),
            )
        except Exception as e:
            logger.warning("[diagnostics] select_for_diagnostic failed: %s", e)
            continue
        for q in qs or []:
            _absorb(q, topic)
        if len(pool) >= count * 3:
            break

    # 2) adapter seed sweep across subject generators
    if len(pool) < count * 2:
        try:
            qtypes = selector._get_generators_for_subject(subject) or []
        except Exception:
            qtypes = []
        date_str = datetime.now(timezone.utc).strftime("%Y%m%d")
        for qt in qtypes:
            for offset in range(8):
                try:
                    qs = selector._adapters.generate(
                        qt, seed=selector._compute_seed(qt, 0.0, offset, date_str),
                        count=1, difficulty=0.3 + 0.05 * (offset % 10),
                    )
                except Exception:
                    continue
                for q in qs or []:
                    _absorb(q, subject)
            if len(pool) >= count * 3:
                break

    # 3) select_next with jitter (adaptive-context variety)
    if len(pool) < count:
        uid = student_id
        for attempts in range(1, 26):
            if len(pool) >= count * 2:
                break
            try:
                q = await selector.select_next(
                    session_id=f"diag-{uid[:8]}",
                    student_id=uid,
                    subject=subject,
                    previous_correct=(attempts % 2 == 0),
                    previous_difficulty=-0.6 + 0.18 * attempts,
                )
            except Exception:
                continue
            _absorb(q, subject)

    # Order: MCQs first (better UX + exact grading), easier before harder
    ordered = sorted(
        pool.values(),
        key=lambda q: (0 if _has_options(q) else 1, q["difficulty_beta"]),
    )
    items = ordered[:count]
    for idx, q in enumerate(items):
        q["phase"] = _PHASE_LABELS[idx] if idx < len(_PHASE_LABELS) else "confirmation"
    return items


# ══════════════════════════════════════════════════════════════════════════════
#  TS-shape mappers (response = exactly what diagnostic.service.ts parses)
# ══════════════════════════════════════════════════════════════════════════════


def _difficulty_label(beta: float) -> str:
    if beta < -0.4:
        return "easy"
    if beta > 0.4:
        return "hard"
    return "medium"


def _mastery_level(score: float) -> str:
    if score >= 80:
        return "advanced"
    if score >= 60:
        return "proficient"
    if score >= 40:
        return "developing"
    return "emerging"


def _priority(mastery: float) -> str:
    if mastery < 0.5:
        return "high"
    if mastery < 0.75:
        return "medium"
    return "low"


def _percentile(theta: float) -> float:
    """Psychometric convention: percentile = Φ(θ) under N(0,1)."""
    p = 0.5 * (1.0 + math.erf(float(theta) / math.sqrt(2.0)))
    return round(min(99.0, max(1.0, p * 100.0)), 1)


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _map_question(q: dict, subject: str) -> dict:
    options = q.get("options") or []
    letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    mapped = []
    correct_option_id = ""
    correct_answer = (q.get("correct_answer") or "").strip()
    for i, opt in enumerate(options):
        oid = letters[i] if i < len(letters) else f"opt{i}"
        if not correct_option_id and correct_answer and str(opt).strip() == correct_answer:
            correct_option_id = oid
        mapped.append({"optionId": oid, "text": str(opt)})
    if not correct_option_id and correct_answer:
        correct_option_id = correct_answer  # free-text answer carried verbatim
    return {
        "questionId": q["question_id"],
        "subject": subject,
        "topic": q.get("topic_label") or _humanise(q.get("subskill", "general")),
        "difficulty": _difficulty_label(float(q.get("difficulty_beta", 0.0))),
        "questionText": q.get("question_text", ""),
        "options": mapped,
        "correctOptionId": correct_option_id,
        "explanation": q.get("explanation", ""),
    }


def _map_session(orm: DiagnosticSessionORM, plan: List[dict],
                 config: dict) -> dict:
    answered = len(orm.responses_list or [])
    tlr = None
    if config.get("timeLimitMinutes"):
        try:
            started = datetime.fromisoformat(orm.started_at)
            elapsed = (datetime.now(timezone.utc) - started).total_seconds()
            tlr = max(0, int(config["timeLimitMinutes"] * 60 - elapsed))
        except Exception:
            tlr = None
    return {
        "sessionId": orm.id,
        "studentId": orm.student_id,
        "config": config,
        "status": "completed" if orm.status == "completed" else "in_progress",
        "questions": [_map_question(q, orm.subject) for q in plan],
        "currentQuestionIndex": min(answered, len(plan)),
        "answersSubmitted": [
            {
                "questionId": r.get("question_id", ""),
                "selectedOptionId": str(r.get("answer", "")),
                "isCorrect": bool(r.get("is_correct")),
                "timeSpentSeconds": round((r.get("time_ms") or 0) / 1000.0, 1),
                "submittedAt": r.get("timestamp", orm.started_at),
            }
            for r in (orm.responses_list or [])
        ],
        "startedAt": orm.started_at,
        "completedAt": orm.completed_at,
        "timeRemainingSeconds": tlr,
    }


def _map_result(result) -> dict:  # result: engine DiagnosticResult pydantic
    perf = result.subskill_performance or {}
    attempted = {s: p for s, p in perf.items() if p.total > 0}
    skills = []
    recommendations = []
    for s, p in sorted(attempted.items(), key=lambda kv: kv[1].mastery):
        score = round(p.mastery * 100, 1)
        skills.append({
            "skillId": s,
            "skillName": _humanise(s),
            "subject": result.subject,
            "masteryLevel": _mastery_level(score),
            "masteryScore": score,
            "questionsCorrect": p.correct,
            "questionsTotal": p.total,
            "recommendedPriority": _priority(p.mastery),
        })
        if p.mastery < 0.6:
            recommendations.append({
                "recommendationId": f"rec-{result.session_id[:8]}-{s}",
                "skillId": s,
                "skillName": _humanise(s),
                "reason": (
                    f"Mastery at {score:.0f}% over {p.total} question(s) "
                    f"({p.correct} correct) — targeted practice recommended."
                ),
                "priority": _priority(p.mastery),
                "suggestedRemediationId": f"mod-weak-{s}",
            })
    strengths = [_humanise(s) for s, p in attempted.items() if p.mastery >= 0.65]
    weaknesses = [_humanise(s) for s, p in attempted.items() if p.mastery < 0.5]
    misconceptions = [
        {
            "misconceptionId": m.misconception_id,
            "subskill": m.subskill,
            "label": m.label,
            "severity": m.severity,
            "evidenceQuestions": m.evidence_questions,
            "description": m.description,
            "remediationFocus": m.remediation_focus,
        }
        for m in (result.misconceptions or [])
    ]
    return {
        "sessionId": result.session_id,
        "studentId": result.student_id,
        "overallScore": round(result.overall_mastery * 100, 1),
        "percentile": _percentile(result.final_ability),
        "skillAssessments": skills,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "totalTimeSpentSeconds": round((result.total_time_ms or 0) / 1000.0),
        "completedAt": result.completed_at or _now_iso(),
        "recommendations": recommendations,
        # extra (TS parses named fields; unknown extras are ignored)
        "misconceptions": misconceptions,
        "finalAbility": round(result.final_ability, 3),
        "questionsAnswered": result.questions_answered,
        "correctAnswers": result.correct_answers,
    }


_STEP_TYPE_MAP = {"prereview": "lesson", "learn": "lesson",
                  "practice": "practice", "assess": "quiz"}


def _map_remediation(path, session: DiagnosticSessionORM,
                     step_states: Dict[str, dict]) -> dict:
    steps_out = []
    completed_count = 0
    current_idx = 0
    for i, m in enumerate(path.modules):
        st = step_states.get(m.module_id, {})
        st_status = st.get("status", "")
        if st_status == "completed":
            completed_count += 1
            step_status = "completed"
        elif st_status == "in_progress":
            step_status = "in_progress"
        else:
            step_status = "available" if i == 0 or completed_count == i else "locked"
        if step_status in ("available", "in_progress") and completed_count == i:
            current_idx = i
        steps_out.append({
            "stepId": m.module_id,
            "stepNumber": i + 1,
            "type": _STEP_TYPE_MAP.get(m.type, "practice"),
            "title": m.title,
            "description": m.description,
            "contentUrl": None,
            "estimatedDurationMinutes": max(15, m.duration_days * 30),
            "status": step_status,
            "completedAt": st.get("completed_at"),
            "score": st.get("score"),
            "attempts": int(st.get("attempts", 0)),
        })
    total = len(steps_out)
    if total and completed_count == total:
        path_status = "completed"
        current_idx = total - 1
    elif completed_count > 0 or any(
            s.get("status") == "in_progress" for s in step_states.values()):
        path_status = "in_progress"
    else:
        path_status = "not_started"
    primary = path.weak_areas[0] if path.weak_areas else (
        path.strong_areas[0] if path.strong_areas else session.subject)
    return {
        "remediationId": path.path_id,
        "sessionId": session.id,  # IndexedDB store uses keyPath "sessionId"
        "studentId": path.student_id,
        "diagnosticSessionId": session.id,
        "skillId": _slug(primary),
        "skillName": _humanise(primary),
        "subject": session.subject,
        "status": path_status,
        "overallProgress": round((completed_count / total) * 100) if total else 0,
        "steps": steps_out,
        "currentStepIndex": current_idx,
        "estimatedDurationMinutes": max(15, path.total_duration_days * 30),
        "completedAt": None,
        "masteryAfterScore": round(path.expected_mastery_after * 100, 1),
    }


# ══════════════════════════════════════════════════════════════════════════════
#  Shared helpers
# ══════════════════════════════════════════════════════════════════════════════


async def _load_plan_row(db: AsyncSession, session_id: str) -> Optional[DiagnosticPlanRow]:
    res = await db.execute(
        select(DiagnosticPlanRow).where(DiagnosticPlanRow.session_id == session_id)
    )
    return res.scalar_one_or_none()


async def _load_owned_session(db: AsyncSession, session_id: str,
                              user: User) -> DiagnosticSessionORM:
    await _ensure_tables()
    res = await db.execute(
        select(DiagnosticSessionORM).where(DiagnosticSessionORM.id == session_id)
    )
    orm = res.scalar_one_or_none()
    if orm is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail=f"Diagnostic session {session_id} not found.")
    if orm.student_id != str(user.id) and user.role != "admin":
        raise HTTPException(status.HTTP_403_FORBIDDEN,
                            detail="Not your diagnostic session.")
    return orm


async def _plan_for(db: AsyncSession, orm: DiagnosticSessionORM) -> List[dict]:
    """Plan from the plan row; fall back to the questions recorded on the
    session (the engine-normalised payloads already stored there)."""
    row = await _load_plan_row(db, orm.id)
    if row:
        data = row.to_data()
        plan = data.get("questions") or []
        if plan:
            return plan
    asked = orm.questions_asked_list or []
    return [
        {
            "question_id": q.get("question_id", ""),
            "subskill": q.get("subskill", "general"),
            "topic_label": q.get("subskill", "general"),
            "question_text": q.get("question_text", ""),
            "options": q.get("options") or [],
            "correct_answer": "",
            "explanation": "",
            "difficulty_beta": float(q.get("difficulty", 0.0)),
            "question_type": "mcq",
            "phase": q.get("phase", "initial"),
        }
        for q in asked
    ]


def _resolve_answer_text(rec: AnswerRecordIn, q: Optional[dict]) -> str:
    """Page submits option INDEX (as string) for MCQ, raw text otherwise."""
    raw = str(rec.selectedOptionId if rec.selectedOptionId is not None else "").strip()
    options = (q or {}).get("options") or []
    if options:
        if raw.isdigit():
            idx = int(raw)
            if 0 <= idx < len(options):
                return str(options[idx])
        letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
        if raw.lower() in letters:
            idx = letters.index(raw.lower())
            if idx < len(options):
                return str(options[idx])
        for opt in options:  # already the option text
            if str(opt).strip() == raw:
                return raw
    return raw


async def _result_response(db: AsyncSession, orm: DiagnosticSessionORM) -> dict:
    bank = _PlanQuestionBank(await _plan_for(db, orm))
    svc = _build_engine(db, orm, bank)
    result = await svc.get_diagnostic_result(orm.id)
    return _map_result(result)


def _config_dict(cfg: DiagnosticConfigIn) -> dict:
    return {
        "subjects": cfg.subjects or ["Mathematics"],
        "gradeLevel": cfg.gradeLevel,
        "board": cfg.board,
        "language": cfg.language,
        "questionCountPerSubject": cfg.questionCountPerSubject,
        "timeLimitMinutes": cfg.timeLimitMinutes,
        "adaptiveEnabled": cfg.adaptiveEnabled,
    }


# ══════════════════════════════════════════════════════════════════════════════
#  Endpoints
# ══════════════════════════════════════════════════════════════════════════════


@router.post("/start")
async def start_diagnostic(
    payload: StartDiagnosticIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    await _ensure_tables()
    student_id = str(user.id)
    cfg = _config_dict(payload.config)
    subject = (payload.config.subjects or ["Mathematics"])[0] or "Mathematics"
    chapter_id = f"{_slug(subject)}-g{payload.config.gradeLevel}"
    want = max(5, min(payload.config.questionCountPerSubject, TOTAL_QUESTIONS))

    # Resume an in-progress session for the same chapter (unique constraint
    # uq_active_diagnostic) — reload-safe.
    res = await db.execute(
        select(DiagnosticSessionORM).where(
            DiagnosticSessionORM.student_id == student_id,
            DiagnosticSessionORM.chapter_id == chapter_id,
            DiagnosticSessionORM.status == "in_progress",
        )
    )
    orm = res.scalar_one_or_none()
    if orm is not None:
        plan = await _plan_for(db, orm)
        if plan:
            return _map_session(orm, plan, cfg)

    plan = await _build_plan(db, student_id, subject, payload.config.gradeLevel, want)
    if not plan:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Question bank returned no questions for this subject; "
                   "diagnostic cannot start.",
        )

    orm = DiagnosticSessionORM(
        id=str(uuid.uuid4()),
        student_id=student_id,
        subject=subject,
        chapter_id=chapter_id,
        status="in_progress",
        current_question_index=1,  # first question handed out
        questions_asked_list=[],   # engine-normalised payload of plan[0]
        responses_list=[],
        ability_history_list=[INITIAL_ABILITY],
        subskill_mastery_dict={},
        misconceptions_list_data=[],
        final_result=None,
        started_at=_now_iso(),
        completed_at=None,
        total_time_ms=None,
    )
    orm.questions_asked_list = [_PlanQuestionBank(plan).raw(plan[0])]
    db.add(orm)

    row = DiagnosticPlanRow(
        session_id=orm.id,
        plan_json=json.dumps({"questions": plan, "steps": {}}),
        updated_at=_now_iso(),
    )
    db.add(row)
    await db.commit()
    await db.refresh(orm)

    logger.info("[diagnostics] started session %s student=%s subject=%s questions=%d",
                orm.id, student_id, subject, len(plan))
    return _map_session(orm, plan, cfg)


@router.post("/mutations/replay")
async def replay_mutations(
    mutation: ReplayMutationIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Offline queue replay: if the queued mutation is a submit, re-drive it;
    otherwise acknowledge so the queue drops it."""
    payload = mutation.payload or {}
    if mutation.type in (None, "submit", "diagnostic_submit") and payload.get("answers"):
        session_id = payload.get("sessionId") or payload.get("session_id")
        if session_id:
            try:
                orm = await _load_owned_session(db, str(session_id), user)
                if orm.status != "completed":
                    submit_in = SubmitDiagnosticIn(
                        answers=[AnswerRecordIn(**a) for a in payload["answers"]],
                        completedAt=payload.get("completedAt"),
                    )
                    await _drive_submit(db, orm, submit_in)
                return {"status": "ok", "id": mutation.id, "applied": True}
            except HTTPException as exc:
                return {"status": "ok", "id": mutation.id,
                        "applied": False, "reason": exc.detail}
    return {"status": "ok", "id": mutation.id, "applied": False}


async def _drive_submit(db: AsyncSession, orm: DiagnosticSessionORM,
                        payload: SubmitDiagnosticIn) -> dict:
    plan = await _plan_for(db, orm)
    bank = _PlanQuestionBank(plan)
    svc = _build_engine(db, orm, bank)
    already = {r.get("question_id") for r in (orm.responses_list or [])}

    for rec in payload.answers:
        if rec.questionId in already:
            continue  # idempotent retry
        if len(orm.responses_list) >= len(plan):
            break  # more answers than planned questions — ignore extras
        if bank.by_id.get(rec.questionId) is None:
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST,
                detail=f"Unknown question {rec.questionId} for this session.",
            )
        answer_text = _resolve_answer_text(rec, bank.by_id.get(rec.questionId))
        time_ms = max(0, min(int(float(rec.timeSpentSeconds or 0) * 1000),
                             30 * 60 * 1000))
        # one answer at a time through the REAL engine (IRT + BKT + persistence)
        await svc.submit_diagnostic_answer(
            session_id=orm.id,
            question_id=rec.questionId,
            answer=answer_text,
            time_ms=time_ms,
        )

    # Short plans (bank thinner than 15): force-complete when all answered.
    if orm.status != "completed" and len(orm.responses_list) >= len(plan):
        report = await svc._build_diagnostic_result(orm)
        orm.status = "completed"
        orm.completed_at = payload.completedAt or _now_iso()
        orm.total_time_ms = sum((r.get("time_ms") or 0)
                                for r in orm.responses_list)
        orm.current_question_index = len(orm.questions_asked_list)
        orm.final_result = report.model_dump_json()
        db.add(orm)
        await db.commit()
        await db.refresh(orm)

    if orm.status != "completed":
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail=f"Diagnostic incomplete: {len(orm.responses_list)}/"
                   f"{len(plan)} answers submitted.",
        )
    return await _result_response(db, orm)


@router.post("/{session_id}/submit")
async def submit_diagnostic(
    session_id: str,
    payload: SubmitDiagnosticIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    orm = await _load_owned_session(db, session_id, user)
    if orm.status == "completed" and orm.final_result:
        # idempotent: page may double-submit; return the stored report
        return await _result_response(db, orm)
    return await _drive_submit(db, orm, payload)


@router.get("/history")
async def diagnostic_history(
    studentId: Optional[str] = Query(default=None),  # advisory; token wins
    page: int = Query(default=1, ge=1),
    pageSize: int = Query(default=20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    await _ensure_tables()
    student_id = str(user.id)
    res = await db.execute(
        select(DiagnosticSessionORM)
        .where(DiagnosticSessionORM.student_id == student_id,
               DiagnosticSessionORM.status == "completed")
        .order_by(DiagnosticSessionORM.completed_at.desc())
    )
    rows = list(res.scalars().all())
    total = len(rows)
    start = (page - 1) * pageSize
    page_rows = rows[start:start + pageSize]

    items = []
    for orm in page_rows:
        report: dict = {}
        if orm.final_result:
            try:
                report = json.loads(orm.final_result)
            except Exception:
                report = {}
        perf = report.get("subskill_performance") or {}
        attempted = {s: p for s, p in perf.items() if (p or {}).get("total", 0) > 0}
        answered = report.get("questions_answered") or len(orm.responses_list or [])
        correct = report.get("correct_answers") or 0
        score = round((report.get("overall_mastery") or
                       (correct / answered if answered else 0.0)) * 100, 1)
        improved = sum(
            1 for p in attempted.values()
            if (p.get("mastery") or 0) >= 0.5
            or p.get("trend") == "improving"
        )
        subjects = [orm.subject] if orm.subject else []
        items.append({
            "sessionId": orm.id,
            "completedAt": orm.completed_at or orm.started_at,
            "subjects": subjects,
            "overallScore": score,
            "durationMinutes": round((orm.total_time_ms or 0) / 60000.0, 1),
            "skillsAssessed": len(attempted),
            "skillsImproved": improved,
        })

    average = round(sum(i["overallScore"] for i in items) / len(items), 1) if items else 0
    trend = "stable"
    if len(items) >= 2:
        half = len(items) // 2
        recent = items[:half] or items[:1]     # ordered newest-first
        older = items[half:]
        r_avg = sum(i["overallScore"] for i in recent) / len(recent)
        o_avg = sum(i["overallScore"] for i in older) / len(older)
        if r_avg - o_avg > 5:
            trend = "improving"
        elif o_avg - r_avg > 5:
            trend = "declining"

    return {
        "history": items,
        "totalCount": total,
        "averageScore": average,
        "improvementTrend": trend,
    }


@router.get("/{session_id}/result")
async def diagnostic_result(
    session_id: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    orm = await _load_owned_session(db, session_id, user)
    if orm.status != "completed" and not orm.final_result:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail="Diagnostic not yet complete.")
    return await _result_response(db, orm)


@router.get("/{session_id}/misconceptions")
async def diagnostic_misconceptions(
    session_id: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    orm = await _load_owned_session(db, session_id, user)
    bank = _PlanQuestionBank(await _plan_for(db, orm))
    svc = _build_engine(db, orm, bank)
    resp: MisconceptionsResponse = await svc.get_misconceptions(orm.id)
    return {
        "sessionId": resp.session_id,
        "totalMisconceptions": resp.total_misconceptions,
        "criticalCount": resp.critical_count,
        "moderateCount": resp.moderate_count,
        "misconceptions": [m.model_dump() for m in resp.misconceptions],
    }


async def _remediation_response(db: AsyncSession, orm: DiagnosticSessionORM) -> dict:
    plan_row = await _load_plan_row(db, orm.id)
    step_states = ((plan_row.to_data() if plan_row else {}).get("steps")) or {}
    bank = _PlanQuestionBank(await _plan_for(db, orm))
    svc = _build_engine(db, orm, bank)
    result = await svc.get_diagnostic_result(orm.id)
    path = await svc.generate_remediation_path(result)
    return _map_remediation(path, orm, step_states)


@router.get("/{session_id}/remediation")
async def remediation_path(
    session_id: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    orm = await _load_owned_session(db, session_id, user)
    if orm.status != "completed" and not orm.final_result:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail="Diagnostic not yet complete — no remediation path.")
    return await _remediation_response(db, orm)


async def _update_step(db: AsyncSession, orm: DiagnosticSessionORM,
                       step_id: str, complete: bool,
                       score: float = 0) -> dict:
    if orm.status != "completed" and not orm.final_result:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail="Diagnostic not yet complete — no remediation path.")
    row = await _load_plan_row(db, orm.id)
    data = row.to_data() if row else {"questions": [], "steps": {}}
    steps = data.setdefault("steps", {})
    st = steps.setdefault(step_id, {"attempts": 0})
    if complete:
        st["status"] = "completed"
        st["score"] = round(float(score), 1)
        st["completed_at"] = _now_iso()
    else:
        if st.get("status") != "completed":
            st["status"] = "in_progress"
        st["attempts"] = int(st.get("attempts", 0)) + 1
        st["started_at"] = _now_iso()
    if row is None:
        row = DiagnosticPlanRow(session_id=orm.id, updated_at=_now_iso())
        db.add(row)
    row.set_data(data)
    db.add(row)
    await db.commit()
    return await _remediation_response(db, orm)


@router.post("/{session_id}/remediation/steps/{step_id}/start")
async def remediation_step_start(
    session_id: str,
    step_id: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    orm = await _load_owned_session(db, session_id, user)
    return await _update_step(db, orm, step_id, complete=False)


@router.post("/{session_id}/remediation/steps/{step_id}/complete")
async def remediation_step_complete(
    session_id: str,
    step_id: str,
    payload: CompleteStepIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    orm = await _load_owned_session(db, session_id, user)
    return await _update_step(db, orm, step_id, complete=True,
                              score=payload.score)
