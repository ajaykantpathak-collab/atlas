"""
diagnostic_service.py
=====================
15-question adaptive diagnostic for ISC Class 11 Mathematics.
Phases:
  Q 1-3   : Broad coverage at medium difficulty (baseline)
  Q 4-10  : Adaptive targeting (IRT-driven, drill into weak areas)
  Q 11-15 : Confirmation phase (verify weak/strong areas)

Integration:
  - IRTModel  : ability estimation after every response
  - QuestionSelector : IRT-based next-question selection
  - LLMClient : misconception classification & remediation content
  - WorkedExamplesService : fading worked examples in remediation
"""

from __future__ import annotations

import asyncio
import json
import time
import uuid
from collections import defaultdict
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple

from fastapi import HTTPException, status
from sqlalchemy import Column, DateTime, Enum, Float, Integer, String, Text
from backend.db_types import JSONVariant
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func

# ──────────────────────────────────────────────
# Existing-service imports
# (all assumed to be async-compatible)
# ──────────────────────────────────────────────
from services.knowledge_tracing import IRTModel                      # ability updater
from services.llm_client import LLMClient                           # misconception / content gen
from services.practice_service import PracticeService                # question retrieval
from services.question_selector import QuestionSelector              # IRT-based selection
from services.worked_examples import WorkedExamplesService           # fading examples

# ──────────────────────────────────────────────
# SQLAlchemy base — expects declarative_base()
# in database.py
# ──────────────────────────────────────────────
try:
    from backend.database import Base   # type: ignore
    _HAS_BASE = True
except ImportError:
    _HAS_BASE = False

# ──────────────────────────────────────────────
# Pydantic v2
# ──────────────────────────────────────────────
from pydantic import BaseModel, Field, field_validator, model_validator

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 1 – Taxonomy & static data
# ══════════════════════════════════════════════════════════════════════════════

# Ordered: prerequisites first, then chapter concepts
SUBSKILLS: list[str] = [
    "limit_concept",           # prerequisite
    "function_composition",    # prerequisite
    "power_rule",
    "chain_rule",
    "product_rule",
    "quotient_rule",
    "implicit_diff",
    "trig_derivatives",
    "exponential_log",
    "parametric_derivatives",
]

PHASE1_SUBSKILLS: list[str] = ["limit_concept", "function_composition",
                                "power_rule", "chain_rule", "product_rule"]
# medium = 0.0 ability target

# Common misconception signatures per subskill (keyword heuristics + LLM fallback)
MISCONCEPTION_PATTERNS: dict[str, list[dict]] = {
    "limit_concept": [
        {"keywords": ["undefined", "0/0", "infinity", "does not exist"],
         "label": "Treats indeterminate form as diverging",
         "severity": "critical"},
        {"keywords": ["substitute", "plug in"],
         "label": "Relies on direct substitution without factoring",
         "severity": "moderate"},
    ],
    "function_composition": [
        {"keywords": ["inside first", "outer derivative"],
         "label": "Applies outer derivative before inner derivative",
         "severity": "critical"},
        {"keywords": ["same variable", "dx/dx"],
         "label": "Confuses f(g(x)) with f(x)·g(x)",
         "severity": "critical"},
    ],
    "power_rule": [
        {"keywords": ["multiply exponent", "add 1 to coefficient"],
         "label": "Modifies coefficient instead of exponent",
         "severity": "moderate"},
    ],
    "chain_rule": [
        {"keywords": ["only outer", "forgot inner", "missed g'"],
         "label": "Applies only outer derivative, omits inner factor",
         "severity": "critical"},
        {"keywords": ["multiply both", "f'g'"],
         "label": "Multiplies outer and inner derivatives independently",
         "severity": "critical"},
    ],
    "product_rule": [
        {"keywords": ["derivative of product", "f'g'"],
         "label": "Differentiates each factor separately (misses fg' + f'g)",
         "severity": "critical"},
    ],
    "quotient_rule": [
        {"keywords": ["bottom derivative top", "flipped"],
         "label": "Reverses numerator and denominator in quotient rule",
         "severity": "critical"},
    ],
    "implicit_diff": [
        {"keywords": ["solve for y", "explicit"],
         "label": "Tries explicit form instead of implicit differentiation",
         "severity": "critical"},
        {"keywords": ["forgot dy/dx", "missing term"],
         "label": "Omits dy/dx term for y-containing expressions",
         "severity": "critical"},
    ],
    "trig_derivatives": [
        {"keywords": ["cos", "sin sign", "negative"],
         "label": "Sign error in derivative of sin/cos",
         "severity": "moderate"},
    ],
    "exponential_log": [
        {"keywords": ["power rule on e", "bring down exponent"],
         "label": "Applies power rule to e^x (brings exponent down)",
         "severity": "critical"},
    ],
    "parametric_derivatives": [
        {"keywords": ["dy/dx as dy/dt", "forgot dt/dx"],
         "label": "Confuses dy/dt with dy/dx; omits division by dx/dt",
         "severity": "critical"},
    ],
}

# Phase boundary constants
PHASE1_END = 3
PHASE2_END = 10
TOTAL_QUESTIONS = 15

# Default IRT parameters for differentiation chapter
DEFAULT_IRT_DISCRIMINATION = 1.2
DEFAULT_IRT_DIFFICULTY = 0.0
DEFAULT_IRT_GUESS = 0.2

# Initial ability estimate for a new student (ISC Class 11, new chapter)
INITIAL_ABILITY = -0.5


# ══════════════════════════════════════════════════════════════════════════════
# SECTION 2 – Pydantic v2 schemas
# ══════════════════════════════════════════════════════════════════════════════

class QuestionPayload(BaseModel):
    """Single question wrapped for the API response."""
    question_id: str = Field(..., description="Unique question identifier")
    subskill: str = Field(..., description="Subskill tag")
    question_text: str = Field(..., description="LaTeX/markdown rendered text")
    options: List[str] = Field(..., description="Multiple-choice options A–D")
    difficulty: float = Field(..., description="IRT difficulty parameter β")
    question_number: int = Field(..., ge=1, le=15,
                                 description="Position in diagnostic (1-indexed)")
    phase: str = Field(..., description="current | adaptive | confirmation")
    hint_available: bool = Field(default=True)
    model_config = {"json_schema_extra": {
        "example": {
            "question_id": "diff-chain-0042",
            "subskill": "chain_rule",
            "question_text": "If $y = \\sin(x^2)$, find $\\frac{dy}{dx}$",
            "options": ["$2x\\cos(x^2)$", "$\\cos(x^2)$", "$2\\cos(x^2)$",
                        "$-2x\\sin(x^2)$"],
            "difficulty": -0.3,
            "question_number": 4,
            "phase": "adaptive",
            "hint_available": True,
        }
    }}


class AnswerFeedback(BaseModel):
    """Feedback returned after each submitted answer."""
    question_id: str
    is_correct: bool
    correct_answer: str
    explanation: str
    subskill: str
    awarded_points: float = Field(ge=0.0, le=1.0)
    misconception_detected: Optional[str] = Field(default=None)
    mastery_delta: float = Field(description="Change in subskill mastery estimate")
    model_config = {"json_schema_extra": {
        "example": {
            "question_id": "diff-chain-0042",
            "is_correct": True,
            "correct_answer": "$2x\\cos(x^2)$",
            "explanation": "Using chain rule: $\\frac{d}{dx}\\sin(u) = "
                           "\\cos(u) \\cdot \\frac{du}{dx}$ where $u=x^2$, "
                           "so $\\frac{du}{dx}=2x$. Result: $2x\\cos(x^2)$.",
            "subskill": "chain_rule",
            "awarded_points": 1.0,
            "misconception_detected": None,
            "mastery_delta": 0.08,
        }
    }}


class DiagnosticResponse(BaseModel):
    """Standard response envelope from submit_diagnostic_answer."""
    feedback: AnswerFeedback
    next_question: Optional[QuestionPayload] = None
    diagnostic_complete: bool = False
    questions_remaining: int = Field(ge=0, le=15)
    current_ability: float = Field(description="Running IRT ability estimate θ")
    phase: str
    model_config = {"json_schema_extra": {
        "example": {
            "feedback": {"question_id": "q1", "is_correct": True,
                         "correct_answer": "3x²", "explanation": "...",
                         "subskill": "power_rule", "awarded_points": 1.0,
                         "misconception_detected": None, "mastery_delta": 0.10},
            "next_question": {"question_id": "q2", "subskill": "chain_rule",
                              "question_text": "...", "options": ["A","B","C","D"],
                              "difficulty": 0.0, "question_number": 2,
                              "phase": "initial", "hint_available": True},
            "diagnostic_complete": False,
            "questions_remaining": 14,
            "current_ability": -0.42,
            "phase": "initial",
        }
    }}


class StartDiagnosticResponse(BaseModel):
    """Response from start_diagnostic."""
    session_id: str
    first_question: QuestionPayload
    total_questions: int = TOTAL_QUESTIONS
    phase: str = "initial"
    estimated_duration_minutes: int = 20


class DiagnosticResult(BaseModel):
    """Full diagnostic report returned by get_diagnostic_result."""
    session_id: str
    student_id: str
    subject: str
    chapter_id: str
    overall_mastery: float = Field(ge=0.0, le=1.0,
                                  description="Weighted mastery 0–1")
    started_at: str
    completed_at: Optional[str] = None
    total_time_ms: Optional[int] = None
    questions_answered: int = Field(ge=0, le=15)
    correct_answers: int
    final_ability: float
    phase_summary: Dict[str, int] = Field(
        description="Phase → questions in that phase answered")
    subskill_performance: Dict[str, "SubskillPerformance"] = {}
    misconceptions: List["MisconceptionReport"] = []
    remediation_path: Optional["RemediationPath"] = None
    status: str  # in_progress | completed

    # ── Derived areas (consumed by generate_remediation_path) ──────────────
    # Computed from subskill_performance so they survive final_result
    # round-trips without schema changes. Only attempted subskills count —
    # untouched subskills carry mastery 0.0 and must not flood remediation.

    @property
    def weak_areas(self) -> List[str]:
        return sorted(
            (s for s, p in self.subskill_performance.items()
             if p.total > 0 and p.mastery < 0.5),
            key=lambda s: self.subskill_performance[s].mastery,
        )

    @property
    def strong_areas(self) -> List[str]:
        return [s for s, p in self.subskill_performance.items()
                if p.total > 0 and p.mastery >= 0.65]

    @property
    def missing_prerequisites(self) -> List[str]:
        prereqs = ("limit_concept", "function_composition")
        return [
            p for p in prereqs
            if p in self.subskill_performance
            and self.subskill_performance[p].total > 0
            and self.subskill_performance[p].mastery < 0.4
        ]


class SubskillPerformance(BaseModel):
    subskill: str
    mastery: float = Field(ge=0.0, le=1.0)
    correct: int = Field(ge=0)
    total: int = Field(ge=0)
    avg_response_time_ms: Optional[float] = None
    difficulty_attempted: List[float] = Field(default_factory=list)
    trend: str = Field(description="improving | declining | stable | insufficient_data")
    model_config = {"json_schema_extra": {
        "example": {
            "subskill": "chain_rule",
            "mastery": 0.25,
            "correct": 1,
            "total": 4,
            "avg_response_time_ms": 45000.0,
            "difficulty_attempted": [-0.5, 0.0, 0.3, 0.8],
            "trend": "declining",
        }
    }}


class MisconceptionReport(BaseModel):
    misconception_id: str
    subskill: str
    label: str
    severity: str  # critical | moderate | minor
    evidence_questions: List[str]
    description: str
    remediation_focus: str
    model_config = {"json_schema_extra": {
        "example": {
            "misconception_id": "mc-001",
            "subskill": "chain_rule",
            "label": "Applies only outer derivative, omits inner factor",
            "severity": "critical",
            "evidence_questions": ["diff-chain-0042", "diff-chain-0103"],
            "description": "Student differentiates only the outer function "
                           "and forgets to multiply by the derivative of the inner.",
            "remediation_focus": "Practice identifying inner/outer functions "
                                 "and applying chain rule systematically.",
        }
    }}


class RemediationModule(BaseModel):
    module_id: str
    title: str
    subskill: str
    type: str = Field(description="prereview | learn | practice | assess")
    duration_days: int = Field(ge=0)
    description: str
    daily_plan: List[str]
    worked_example_ids: List[str] = Field(default_factory=list)
    practice_question_count: int = Field(ge=0, default=10)
    prerequisite_modules: List[str] = Field(default_factory=list)
    estimated_mastery_after: float = Field(ge=0.0, le=1.0)
    model_config = {"json_schema_extra": {
        "example": {
            "module_id": "mod-001",
            "title": "Review: Limits & Continuity",
            "subskill": "limit_concept",
            "type": "prereview",
            "duration_days": 2,
            "description": "Build foundational understanding of limits "
                           "before tackling differentiation.",
            "daily_plan": [
                "Day 1: Concept of limits, left/right limits, "
                        "limit at a point (20 problems)",
                "Day 2: Indeterminate forms, algebraic manipulation, "
                        "standard limits (15 problems)",
            ],
            "worked_example_ids": ["we-limit-001", "we-limit-002"],
            "practice_question_count": 35,
            "prerequisite_modules": [],
            "estimated_mastery_after": 0.70,
        }
    }}


class RemediationPath(BaseModel):
    path_id: str
    student_id: str
    chapter_id: str
    overall_mastery: float
    strong_areas: List[str]
    weak_areas: List[str]
    missing_prerequisites: List[str]
    modules: List[RemediationModule]
    total_duration_days: int
    expected_mastery_after: float
    generated_at: str
    model_config = {"json_schema_extra": {
        "example": {
            "path_id": "rp-001",
            "student_id": "stu-123",
            "chapter_id": "diff-isc11",
            "overall_mastery": 0.35,
            "strong_areas": ["power_rule"],
            "weak_areas": ["chain_rule", "product_rule", "implicit_diff"],
            "missing_prerequisites": ["limit_concept", "function_composition"],
            "modules": [
                {"module_id": "mod-001", "title": "Review: Limits",
                 "subskill": "limit_concept", "type": "prereview",
                 "duration_days": 2,
                 "description": "Build foundational understanding of limits.",
                 "daily_plan": ["Day 1: ...", "Day 2: ..."],
                 "worked_example_ids": ["we-limit-001"],
                 "practice_question_count": 35, "prerequisite_modules": [],
                 "estimated_mastery_after": 0.70},
                {"module_id": "mod-002", "title": "Learn: Chain Rule",
                 "subskill": "chain_rule", "type": "learn",
                 "duration_days": 3,
                 "description": "Master chain rule through worked examples and practice.",
                 "daily_plan": ["Day 1: ...", "Day 2: ...", "Day 3: ..."],
                 "worked_example_ids": ["we-chain-001"],
                 "practice_question_count": 45, "prerequisite_modules": ["mod-001"],
                 "estimated_mastery_after": 0.65},
            ],
            "total_duration_days": 7,
            "expected_mastery_after": 0.75,
            "generated_at": "2025-01-15T10:30:00Z",
        }
    }}


class MisconceptionsResponse(BaseModel):
    session_id: str
    total_misconceptions: int
    critical_count: int
    moderate_count: int
    misconceptions: List[MisconceptionReport]


# ══════════════════════════════════════════════════════════════════════════════
# SECTION 3 – ORM model
# ══════════════════════════════════════════════════════════════════════════════

if _HAS_BASE:

    class DiagnosticSession(Base):  # type: ignore
        __tablename__ = "diagnostic_sessions"

        id: str = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
        student_id: str = Column(String(64), nullable=False, index=True)
        subject: str = Column(String(64), nullable=False)
        chapter_id: str = Column(String(64), nullable=False)
        status: str = Column(String(20), nullable=False, default="in_progress")
        current_question_index: int = Column(Integer, nullable=False, default=0)
        questions_asked: str = Column(Text, nullable=False, default="[]")
        responses: str = Column(Text, nullable=False, default="[]")
        ability_history: str = Column(Text, nullable=False, default="[]")
        subskill_mastery: str = Column(Text, nullable=False,
                                       default=json.dumps({s: 0.0 for s in SUBSKILLS}))
        misconceptions_list: str = Column(Text, nullable=False, default="[]")
        final_result: str = Column(Text, nullable=True)
        started_at: str = Column(String(40), nullable=False,
                                 default=lambda: datetime.now(timezone.utc).isoformat())
        completed_at: Optional[str] = Column(String(40), nullable=True)
        total_time_ms: Optional[int] = Column(Integer, nullable=True)

        __table_args__ = (
            # Unique ACTIVE session per (student, chapter).  A partial index
            # (in_progress only) — a full (student, chapter, status) unique
            # constraint also forbids a second COMPLETED session, which made
            # every retake of a diagnostic fail with UniqueViolationError.
            __import__("sqlalchemy").Index(
                "uq_active_diagnostic",
                "student_id", "chapter_id",
                unique=True,
                postgresql_where=(status == "in_progress"),
            ),
            # Dual import paths (backend.services.* and services.*) both
            # execute this body on the shared Base — extend instead of raise.
            # MUST live in this tuple: a second __table_args__ assignment
            # above silently discards it.
            {"extend_existing": True},
        )

        @property
        def questions_asked_list(self) -> list[dict]:
            try:
                return json.loads(self.questions_asked)
            except Exception:
                return []

        @questions_asked_list.setter
        def questions_asked_list(self, value: list[dict]) -> None:
            self.questions_asked = json.dumps(value)

        @property
        def responses_list(self) -> list[dict]:
            try:
                return json.loads(self.responses)
            except Exception:
                return []

        @responses_list.setter
        def responses_list(self, value: list[dict]) -> None:
            self.responses = json.dumps(value)

        @property
        def ability_history_list(self) -> list[float]:
            try:
                return json.loads(self.ability_history)
            except Exception:
                return []

        @ability_history_list.setter
        def ability_history_list(self, value: list[float]) -> None:
            self.ability_history = json.dumps(value)

        @property
        def subskill_mastery_dict(self) -> dict[str, float]:
            try:
                return json.loads(self.subskill_mastery)
            except Exception:
                return {s: 0.0 for s in SUBSKILLS}

        @subskill_mastery_dict.setter
        def subskill_mastery_dict(self, value: dict[str, float]) -> None:
            self.subskill_mastery = json.dumps(value)

        @property
        def misconceptions_list_data(self) -> list[dict]:
            try:
                return json.loads(self.misconceptions_list)
            except Exception:
                return []

        @misconceptions_list_data.setter
        def misconceptions_list_data(self, value: list[dict]) -> None:
            self.misconceptions_list = json.dumps(value)


# ══════════════════════════════════════════════════════════════════════════════
# SECTION 4 – Core service
# ══════════════════════════════════════════════════════════════════════════════

class DiagnosticService:
    """
    Orchestrates the full adaptive diagnostic lifecycle.

    Dependencies (injected or imported at module level):
        db             – async DB session factory
        practice_svc   – PracticeService instance
        selector       – QuestionSelector instance
        irt_model      – IRTModel instance
        llm_client     – LLMClient instance
        worked_svc     – WorkedExamplesService instance
    """

    # ── class-level IRT model (shared, stateful per student) ────────────────
    irt_model: IRTModel = IRTModel()

    def __init__(
        self,
        db: AsyncSession,
        practice_svc: PracticeService,
        selector: QuestionSelector,
        llm_client: LLMClient,
        worked_svc: WorkedExamplesService,
    ) -> None:
        self.db = db
        self.practice = practice_svc
        self.selector = selector
        self.llm = llm_client
        self.worked = worked_svc

    # ────────────────────────────────────────────────────────────────────────
    # Public API – start_diagnostic
    # ────────────────────────────────────────────────────────────────────────

    async def start_diagnostic(
        self,
        student_id: str,
        subject: str,
        chapter_id: str,
    ) -> StartDiagnosticResponse:
        """
        Begin (or resume) a 15-question diagnostic session.

        Creates a new session if the student has no active diagnostic for the
        chapter; resumes an existing in-progress session if one exists.

        Returns the session ID and the very first question (Phase 1, broad
        coverage, medium difficulty).
        """
        session = await self._get_or_create_session(student_id, subject, chapter_id)

        # If there's already a next question (resuming), return it
        if session.current_question_index < len(session.questions_asked_list):
            next_q = session.questions_asked_list[session.current_question_index]
            return StartDiagnosticResponse(
                session_id=session.id,
                first_question=QuestionPayload(**next_q),
                phase=self._phase_label(session.current_question_index),
            )

        # Fresh session – pick Phase-1 question (broad subskill coverage)
        q_payload = await self._select_phase1_question(
            student_id, session.current_question_index,
            subject=getattr(session, "subject", None),
        )

        session.questions_asked_list = session.questions_asked_list + [q_payload.model_dump()]
        session.current_question_index += 1
        self.db.add(session)
        await self.db.commit()

        return StartDiagnosticResponse(
            session_id=session.id,
            first_question=q_payload,
            phase="initial",
        )

    # ────────────────────────────────────────────────────────────────────────
    # Public API – submit_diagnostic_answer
    # ────────────────────────────────────────────────────────────────────────

    async def submit_diagnostic_answer(
        self,
        session_id: str,
        question_id: str,
        answer: str,
        time_ms: int,
    ) -> DiagnosticResponse:
        """
        Process one answer and return:
          - Detailed feedback (correctness, explanation, mastery delta)
          - Next question (if diagnostic not yet complete)
          - OR full diagnostic report (if 15 questions answered)

        All DB writes happen in a single transaction for atomicity.
        """
        session = await self._get_session(session_id)

        if session.status == "completed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Diagnostic already completed. "
                       "Call get_diagnostic_result for the report.",
            )

        # ── locate the question that was just answered ─────────────────────
        answered_q_list = session.questions_asked_list
        answered_index = session.current_question_index - 1   # we already incremented
        if answered_index >= len(answered_q_list):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No pending question to answer. "
                       "Call start_diagnostic first.",
            )
        answered_q = answered_q_list[answered_index]

        if answered_q["question_id"] != question_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Question mismatch. Expected {answered_q['question_id']}, "
                       f"got {question_id}.",
            )

        # ── fetch canonical question & evaluate ─────────────────────────────
        canonical_q = await self._fetch_question(question_id)
        subskill = canonical_q.get("subskill", answered_q["subskill"])

        evaluation = await self._evaluate_answer(
            canonical_q, answer, subskill, answered_q["difficulty"],
        )

        # ── update subskill mastery (BKT-style incremental update) ──────────
        current_mastery = session.subskill_mastery_dict.get(subskill, 0.0)
        new_mastery = self._blend_mastery(current_mastery, evaluation["is_correct"],
                                          answered_q["difficulty"])
        session.subskill_mastery_dict = {
            **session.subskill_mastery_dict,
            subskill: new_mastery,
        }

        # ── update global IRT ability estimate ──────────────────────────────
        current_ability = self.irt_model.current_ability(student_id=session.student_id)
        updated_ability = self.irt_model.update(
            student_id=session.student_id,
            question_difficulty=answered_q["difficulty"],
            correct=evaluation["is_correct"],
        )
        ability_history = session.ability_history_list
        ability_history.append(updated_ability)
        session.ability_history_list = ability_history

        # ── record response ─────────────────────────────────────────────────
        response_entry = {
            "question_id": question_id,
            "answer": answer,
            "correct_answer": canonical_q.get("correct_answer", ""),
            "is_correct": evaluation["is_correct"],
            "time_ms": time_ms,
            "subskill": subskill,
            "difficulty": answered_q["difficulty"],
            "phase": answered_q["phase"],
            "subskill_mastery_before": current_mastery,
            "subskill_mastery_after": new_mastery,
            "misconception": evaluation.get("misconception"),
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
        session.responses_list = session.responses_list + [response_entry]

        # ── one-record rule (owner plan 2026-09): diagnostics ARE assessment
        # ── the verdict feeds the SAME server-backed mastery record as
        # practice, via the mastery ledger (same node keying + 0-1 BKT
        # scale). Exactly-once: the session-index guard above already
        # rejects a replayed submit, and the ledger's persistent token
        # (session, question) protects against a crash between grading and
        # commit. Best-effort: a ledger hiccup never fails the diagnostic.
        try:
            from backend.services.mastery_ledger import record_assessment

            _diag_node = (
                canonical_q.get("node_id")
                or (canonical_q.get("node_tags") or [None])[0]
                or f"diag::{subskill}"
            )
            await record_assessment(
                self.db,
                user_id=str(session.student_id),
                node_id=str(_diag_node),
                is_correct=bool(evaluation["is_correct"]),
                source="diagnostic",
                time_ms=float(time_ms or 0),
                difficulty=float(answered_q.get("difficulty") or 0.5),
                client_token=f"diag:{session.id}:{question_id}",
            )
        except Exception as exc:
            logger.warning("diagnostic mastery sync failed: %s", exc)

        # ── persist misconception if detected ───────────────────────────────
        if evaluation.get("misconception"):
            mc_entry = {
                "misconception_id": f"mc-{session.id[:8]}-{len(session.misconceptions_list_data)+1:03d}",
                "subskill": subskill,
                "label": evaluation["misconception"]["label"],
                "severity": evaluation["misconception"]["severity"],
                "evidence_questions": [question_id],
                "description": evaluation["misconception"].get("description", ""),
                "remediation_focus": evaluation["misconception"].get("remediation_focus", ""),
            }
            # merge if same misconception_id already exists
            existing_ids = {m["misconception_id"] for m in session.misconceptions_list_data}
            if mc_entry["misconception_id"] not in existing_ids:
                session.misconceptions_list_data = (
                    session.misconceptions_list_data + [mc_entry]
                )

        # ── build feedback ───────────────────────────────────────────────────
        mastery_delta = new_mastery - current_mastery
        feedback = AnswerFeedback(
            question_id=question_id,
            is_correct=evaluation["is_correct"],
            correct_answer=canonical_q.get("correct_answer", ""),
            explanation=evaluation["explanation"],
            subskill=subskill,
            awarded_points=1.0 if evaluation["is_correct"] else 0.0,
            misconception_detected=(
                evaluation["misconception"]["label"]
                if evaluation.get("misconception") else None
            ),
            mastery_delta=round(mastery_delta, 4),
        )

        # ── decide next question or complete ────────────────────────────────
        total_answered = len(session.responses_list)
        is_complete = total_answered >= TOTAL_QUESTIONS

        if is_complete:
            session.status = "completed"
            session.completed_at = datetime.now(timezone.utc).isoformat()
            # calculate total time from all response timestamps
            session.total_time_ms = sum(
                r["time_ms"] for r in session.responses_list
            )
            session.current_question_index = len(session.questions_asked_list)
            self.db.add(session)
            await self.db.commit()

            report = await self._build_diagnostic_result(session)
            session.final_result = report.model_dump_json()
            self.db.add(session)
            await self.db.commit()

            return DiagnosticResponse(
                feedback=feedback,
                next_question=None,
                diagnostic_complete=True,
                questions_remaining=0,
                current_ability=updated_ability,
                phase=answered_q["phase"],
            )

        # ── select next question ─────────────────────────────────────────────
        next_q = await self._select_next_question(
            student_id=session.student_id,
            ability=updated_ability,
            current_index=session.current_question_index,
            subskill_mastery=session.subskill_mastery_dict,
            answered_responses=session.responses_list,
            asked_questions=session.questions_asked_list,
            subject=getattr(session, "subject", None),
        )

        session.questions_asked_list = (
            session.questions_asked_list + [next_q.model_dump()]
        )
        session.current_question_index += 1
        next_phase = self._phase_label(session.current_question_index - 1)

        self.db.add(session)
        await self.db.commit()

        return DiagnosticResponse(
            feedback=feedback,
            next_question=next_q,
            diagnostic_complete=False,
            questions_remaining=TOTAL_QUESTIONS - total_answered,
            current_ability=round(updated_ability, 4),
            phase=next_phase,
        )

    # ────────────────────────────────────────────────────────────────────────
    # Public API – get_diagnostic_result
    # ────────────────────────────────────────────────────────────────────────

    async def get_diagnostic_result(
        self,
        session_id: str,
    ) -> DiagnosticResult:
        """Return the full diagnostic report; raises 404 if not found."""
        session = await self._get_session(session_id)
        if session.status != "completed" and not session.final_result:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Diagnostic not yet complete.",
            )
        if session.final_result:
            return DiagnosticResult(**json.loads(session.final_result))
        return await self._build_diagnostic_result(session)

    # ────────────────────────────────────────────────────────────────────────
    # Public API – generate_remediation_path
    # ────────────────────────────────────────────────────────────────────────

    async def generate_remediation_path(
        self,
        diagnostic_result: DiagnosticResult,
    ) -> RemediationPath:
        """
        Build a sequenced, daily remediation plan from a completed diagnostic.

        Strategy:
          1. Missing prerequisites → prerequisite review modules (first)
          2. Weak subskills (mastery < 0.5) → learn + practice modules
          3. Moderate subskills (0.5–0.75) → targeted practice modules
          4. Strong subskills → reinforcement (spaced practice)
        """
        student_id = diagnostic_result.student_id
        chapter_id = diagnostic_result.chapter_id
        overall_mastery = diagnostic_result.overall_mastery

        weak = diagnostic_result.weak_areas
        missing_prereqs = diagnostic_result.missing_prerequisites
        strong = diagnostic_result.strong_areas

        # ── phase A: prerequisite review (if any) ───────────────────────────
        prereq_modules: list[RemediationModule] = []
        for prereq in missing_prereqs:
            examples = await self._fetch_worked_examples(prereq)
            prereq_modules.append(RemediationModule(
                module_id=f"mod-pre-{prereq}",
                title=f"Prerequisite Review: {self._humanise(prereq)}",
                subskill=prereq,
                type="prereview",
                duration_days=2,
                description=(
                    f"Build foundational understanding of {self._humanise(prereq)} "
                    f"before tackling differentiation. Required for chain rule "
                    f"and implicit differentiation."
                ),
                daily_plan=self._generate_daily_plan_prereview(prereq),
                worked_example_ids=examples,
                practice_question_count=30,
                prerequisite_modules=[],
                estimated_mastery_after=0.70,
            ))

        # ── phase B: weak subskill modules (LLM-enhanced) ───────────────────
        weak_modules: list[RemediationModule] = []
        for subskill in weak:
            content = await self._generate_module_content_llm(
                subskill, "weak", diagnostic_result.subskill_performance.get(subskill)
            )
            examples = await self._fetch_worked_examples(subskill)
            weak_modules.append(RemediationModule(
                module_id=f"mod-weak-{subskill}",
                title=content["title"],
                subskill=subskill,
                type="learn",
                duration_days=content["days"],
                description=content["description"],
                daily_plan=content["daily_plan"],
                worked_example_ids=examples,
                practice_question_count=content["practice_count"],
                prerequisite_modules=[m.module_id for m in prereq_modules],
                estimated_mastery_after=content["target_mastery"],
            ))

        # ── phase C: moderate subskills (practice only) ─────────────────────
        moderate = [s for s in strong
                    if diagnostic_result.subskill_performance.get(s, SubskillPerformance(
                        subskill=s, mastery=0.0, correct=0, total=0
                    )).mastery < 0.75] if strong else []
        practice_modules: list[RemediationModule] = []
        for subskill in moderate:
            examples = await self._fetch_worked_examples(subskill)
            practice_modules.append(RemediationModule(
                module_id=f"mod-prac-{subskill}",
                title=f"Practice: {self._humanise(subskill)}",
                subskill=subskill,
                type="practice",
                duration_days=1,
                description=f"Consolidate {self._humanise(subskill)} "
                            f"through targeted practice.",
                daily_plan=[
                    f"Day 1: Mixed {self._humanise(subskill)} problems (20 questions)"
                ],
                worked_example_ids=examples,
                practice_question_count=20,
                prerequisite_modules=[],
                estimated_mastery_after=0.80,
            ))

        # ── phase D: strong area reinforcement (spaced) ──────────────────────
        strong_modules: list[RemediationModule] = []
        for subskill in strong:
            strong_modules.append(RemediationModule(
                module_id=f"mod-strong-{subskill}",
                title=f"Reinforce: {self._humanise(subskill)}",
                subskill=subskill,
                type="assess",
                duration_days=0,
                description=f"Quick check to maintain {self._humanise(subskill)} "
                            f"mastery before moving on.",
                daily_plan=[],
                worked_example_ids=[],
                practice_question_count=5,
                prerequisite_modules=[],
                estimated_mastery_after=diagnostic_result.subskill_performance.get(
                    subskill, SubskillPerformance(subskill=subskill, mastery=0.0,
                                                  correct=0, total=0)
                ).mastery,
            ))

        all_modules = prereq_modules + weak_modules + practice_modules + strong_modules
        total_days = sum(m.duration_days for m in all_modules)

        path = RemediationPath(
            path_id=f"rp-{student_id}-{uuid.uuid4().hex[:8]}",
            student_id=student_id,
            chapter_id=chapter_id,
            overall_mastery=overall_mastery,
            strong_areas=strong,
            weak_areas=weak,
            missing_prerequisites=missing_prereqs,
            modules=all_modules,
            total_duration_days=total_days,
            expected_mastery_after=min(overall_mastery + 0.40, 0.90),
            generated_at=datetime.now(timezone.utc).isoformat(),
        )

        # Persist the path on the session
        session = await self._get_session_by_student_chapter(
            student_id, chapter_id, "completed"
        )
        if session:
            session.final_result = json.dumps((
                await self._build_diagnostic_result(session)
            ).model_dump())
            self.db.add(session)
            await self.db.commit()

        return path

    # ────────────────────────────────────────────────────────────────────────
    # Public API – get_misconceptions
    # ────────────────────────────────────────────────────────────────────────

    async def get_misconceptions(
        self,
        session_id: str,
    ) -> MisconceptionsResponse:
        """Return all misconceptions identified during this diagnostic session."""
        session = await self._get_session(session_id)

        mcs = [MisconceptionReport(**m) for m in session.misconceptions_list_data]

        critical = sum(1 for m in mcs if m.severity == "critical")
        moderate = sum(1 for m in mcs if m.severity == "moderate")

        return MisconceptionsResponse(
            session_id=session_id,
            total_misconceptions=len(mcs),
            critical_count=critical,
            moderate_count=moderate,
            misconceptions=mcs,
        )

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 5 – Internal helpers – session management
    # ══════════════════════════════════════════════════════════════════════════

    async def _get_session(self, session_id: str) -> "DiagnosticSession":
        if not _HAS_BASE:
            raise RuntimeError("SQLAlchemy Base not available; "
                               "check database.py import.")
        from sqlalchemy import select
        result = await self.db.execute(
            select(DiagnosticSession).where(DiagnosticSession.id == session_id)
        )
        session = result.scalar_one_or_none()
        if session is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Diagnostic session {session_id} not found.",
            )
        return session

    async def _get_session_by_student_chapter(
        self, student_id: str, chapter_id: str, status_filter: str
    ) -> Optional["DiagnosticSession"]:
        if not _HAS_BASE:
            return None
        from sqlalchemy import select
        result = await self.db.execute(
            select(DiagnosticSession).where(
                DiagnosticSession.student_id == student_id,
                DiagnosticSession.chapter_id == chapter_id,
                DiagnosticSession.status == status_filter,
            )
            # Multiple COMPLETED sessions per (student, chapter) are legal
            # (retakes) — take the most recent instead of exploding with
            # MultipleResultsFound.
            .order_by(DiagnosticSession.started_at.desc()).limit(1)
        )
        return result.scalars().first()

    async def _get_or_create_session(
        self, student_id: str, subject: str, chapter_id: str
    ) -> "DiagnosticSession":
        if not _HAS_BASE:
            raise RuntimeError("SQLAlchemy Base not available.")

        # resume an in-progress session
        existing = await self._get_session_by_student_chapter(
            student_id, chapter_id, "in_progress"
        )
        if existing:
            return existing

        # create fresh session
        session = DiagnosticSession(
            id=str(uuid.uuid4()),
            student_id=student_id,
            subject=subject,
            chapter_id=chapter_id,
            status="in_progress",
            current_question_index=0,
            questions_asked_list=[],
            responses_list=[],
            ability_history_list=[INITIAL_ABILITY],
            subskill_mastery_dict={s: 0.0 for s in SUBSKILLS},
            misconceptions_list_data=[],
            final_result=None,
            started_at=datetime.now(timezone.utc).isoformat(),
            completed_at=None,
            total_time_ms=None,
        )
        self.db.add(session)
        await self.db.commit()
        await self.db.refresh(session)
        return session

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 6 – Question selection strategies
    # ══════════════════════════════════════════════════════════════════════════

    async def _select_phase1_question(
        self, student_id: str, question_number: int,
        subject: Optional[str] = None,
    ) -> QuestionPayload:
        """
        Phase 1 (Q 1–3): Broad coverage across distinct subskills at medium
        difficulty (target ability = 0.0).
        Cycle through PHASE1_SUBSKILLS so each of Q1-Q3 hits a different
        subskill.
        """
        subskill = PHASE1_SUBSKILLS[question_number % len(PHASE1_SUBSKILLS)]
        try:
            raw_q = await self.selector.get_next_question(
                ability_estimate=0.0,
                subskill=subskill,
                exclude_ids=[],
                target_difficulty=0.0,
                subject=subject,
            )
        except AttributeError:
            # fallback: use PracticeService directly
            raw_q = await self.practice.generate_question(
                subskill=subskill, difficulty="medium"
            )

        return self._normalise_question(raw_q, question_number + 1, "initial", subskill)

    async def _select_phase2_question(
        self,
        student_id: str,
        ability: float,
        subskill_mastery: dict[str, float],
        asked_questions: list[dict],
        subject: Optional[str] = None,
    ) -> QuestionPayload:
        """
        Phase 2 (Q 4–10): Adaptive targeting.

        Sort subskills by mastery (ascending). Pick the lowest-mastery subskill
        not yet asked in Phase 2. IRT selector targets difficulty slightly above
        the student's current ability (ability + 0.3) to be appropriately
        challenging.
        """
        ranked = sorted(SUBSKILLS, key=lambda s: subskill_mastery.get(s, 0.0))
        asked_subskills_phase2 = {
            q["subskill"] for q in asked_questions[PHASE1_END:PHASE2_END]
            if q.get("phase") in ("adaptive",)
        }

        # try weakest unanswered subskills
        for subskill in ranked:
            if subskill not in asked_subskills_phase2:
                target_diff = max(-1.5, min(ability + 0.3, 1.5))
                q = await self._irt_select(
                    ability, subskill, target_diff, asked_questions, subject
                )
                return self._normalise_question(
                    q, len(asked_questions) + 1, "adaptive", subskill
                )

        # all subskills hit – pick globally weakest
        target_subskill = ranked[0]
        target_diff = max(-1.5, min(ability + 0.3, 1.5))
        q = await self._irt_select(ability, target_subskill, target_diff, asked_questions, subject)
        return self._normalise_question(
            q, len(asked_questions) + 1, "adaptive", target_subskill
        )

    async def _select_phase3_question(
        self,
        student_id: str,
        ability: float,
        weak_areas: list[str],
        asked_questions: list[dict],
        subject: Optional[str] = None,
    ) -> QuestionPayload:
        """
        Phase 3 (Q 11–15): Confirmation.

        Re-ask the 3 weakest subskills (or fewer if fewer weak areas) with
        slightly harder questions to confirm the diagnosis.
        """
        # identify which weak areas haven't been confirmed yet
        asked_weak = {
            q["subskill"] for q in asked_questions[PHASE2_END:]
            if q.get("phase") == "confirmation"
        }
        targets = [s for s in weak_areas if s not in asked_weak] or weak_areas[:3]

        target_subskill = targets[len(asked_weak) % len(targets)]
        target_diff = min(ability + 0.6, 1.8)   # harder – confirm weakness
        q = await self._irt_select(ability, target_subskill, target_diff, asked_questions, subject)
        return self._normalise_question(
            q, len(asked_questions) + 1, "confirmation", target_subskill
        )

    async def _select_next_question(
        self,
        student_id: str,
        ability: float,
        current_index: int,          # index AFTER this answer (next Q number = index+1)
        subskill_mastery: dict[str, float],
        answered_responses: list[dict],
        asked_questions: list[dict],
        subject: Optional[str] = None,
    ) -> QuestionPayload:
        """
        Dispatch to the correct phase selector.
        current_index == number of questions already asked/answered.
        """
        q_number = current_index + 1  # 1-based question number

        if q_number <= PHASE1_END:
            return await self._select_phase1_question(student_id, current_index, subject)

        if q_number <= PHASE2_END:
            return await self._select_phase2_question(
                student_id, ability, subskill_mastery, asked_questions, subject
            )

        # Phase 3 – need to know weak areas from completed Phase 2
        weak = self._identify_weak_areas(subskill_mastery)
        return await self._select_phase3_question(
            student_id, ability, weak, asked_questions, subject
        )

    async def _irt_select(
        self,
        ability: float,
        subskill: str,
        target_difficulty: float,
        exclude_questions: list[dict],
        subject: Optional[str] = None,
    ) -> dict:
        """Wrapper around QuestionSelector with safe fallback."""
        exclude_ids = [q["question_id"] for q in exclude_questions]
        try:
            return await self.selector.get_next_question(
                ability_estimate=ability,
                subskill=subskill,
                exclude_ids=exclude_ids,
                target_difficulty=target_difficulty,
                subject=subject,
            )
        except (AttributeError, Exception):
            return await self.practice.generate_question(
                subskill=subskill,
                difficulty=self._difficulty_label(target_difficulty),
            )

    @staticmethod
    def _normalise_question(
        raw: dict, question_number: int, phase: str, subskill: str
    ) -> QuestionPayload:
        """Normalise varying question formats into QuestionPayload."""
        return QuestionPayload(
            question_id=raw.get("id") or raw.get("question_id") or str(uuid.uuid4()),
            subskill=raw.get("subskill", subskill),
            question_text=raw.get("text") or raw.get("question_text") or "",
            options=raw.get("options") or raw.get("choices") or [],
            difficulty=float(raw.get("difficulty", raw.get("beta", 0.0))),
            question_number=question_number,
            phase=phase,
            hint_available=raw.get("hint_available", True),
        )

    @staticmethod
    def _phase_label(current_index: int) -> str:
        """Return phase string from the 1-based question number."""
        q_num = current_index  # already 1-based when stored
        if q_num <= PHASE1_END:
            return "initial"
        if q_num <= PHASE2_END:
            return "adaptive"
        return "confirmation"

    @staticmethod
    def _difficulty_label(beta: float) -> str:
        if beta < -0.4:
            return "easy"
        if beta > 0.4:
            return "hard"
        return "medium"

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 7 – Answer evaluation & misconception detection
    # ══════════════════════════════════════════════════════════════════════════

    async def _evaluate_answer(
        self,
        question: dict,
        answer: str,
        subskill: str,
        difficulty: float,
    ) -> dict:
        """
        Evaluate answer correctness and detect misconceptions.

        Pipeline:
          1. Normalise both answer and correct answer for comparison
          2. Compare (supports exact, case-insensitive, and SymPy symbolic)
          3. If incorrect → heuristic misconception check
          4. If still unclear → LLM classification
          5. Generate explanation (cached if available, else LLM)
        """
        correct_raw = question.get("correct_answer", "")
        is_correct = self._answers_match(answer, correct_raw, subskill)

        # Corpus questions carry paragraph model answers that never
        # string-match — grade prose via the rubric LLM grader.
        if not is_correct and len(str(correct_raw)) >= 120 \
                and len(str(answer).strip()) >= 3:
            try:
                from services.llm_grader import LLMGrader
                scheme = question.get("marking_scheme") or ""
                rubric = [
                    {"id": f"c{i+1}", "text": ln.strip()}
                    for i, ln in enumerate(str(scheme).split("\n"))
                    if ln.strip() and len(ln.strip()) > 10
                ][:6] or None
                res = await LLMGrader.grade(
                    student_answer=str(answer),
                    model_answer=str(correct_raw),
                    rubric=rubric,
                    max_marks=3,
                )
                if res.error is None:
                    is_correct = res.marks_awarded >= max(
                        1, res.max_marks // 2)
            except Exception as e:
                logger.warning("diagnostic LLM grade failed: %s", e)

        # LLM offline (no Ollama in deploy): embedding cosine catches
        # correct paraphrases + verbatim answers the string matcher misses
        # (B02: 352-char verbatim correctAnswer still graded false).
        if not is_correct and len(str(correct_raw)) >= 40 \
                and len(str(answer).strip()) >= 3:
            try:
                from backend.services.embedding_service import EmbeddingService
                import asyncio as _aio, math as _m
                svc = await EmbeddingService.get_instance()
                ea, eb = await _aio.gather(
                    svc.encode(str(answer)),
                    svc.encode(str(correct_raw)))
                dot = sum(x * y for x, y in zip(ea, eb))
                sim = dot / ((sum(x * x for x in ea) ** .5 or 1) *
                             (sum(x * x for x in eb) ** .5 or 1))
                if sim >= 0.72:
                    is_correct = True
            except Exception:
                pass

        if is_correct:
            return {
                "is_correct": True,
                "explanation": await self._fetch_explanation(question.get("id")),
                "misconception": None,
            }

        # ── incorrect answer path ────────────────────────────────────────────
        misconception = self._heuristic_misconception(answer, subskill)

        if misconception is None:
            misconception = await self._llm_classify_misconception(
                question, answer, subskill
            )

        if misconception is None:
            # Corpus hint: enhanced-node diagnostics embed "A wrong answer
            # reveals the student X" — surface it so the misconception
            # panel actually populates when heuristics/LLM don't match.
            hint = str(question.get("misconception_hint") or "").strip()
            if hint:
                label = hint.split("reveals the student")[-1].strip(" .")[:80]
                misconception = {
                    "label": label or "Concept gap",
                    "severity": "moderate",
                    "description": hint,
                    "remediation_focus": subskill,
                }

        explanation = await self._generate_explanation(
            question, answer, correct_raw, misconception
        )

        return {
            "is_correct": False,
            "explanation": explanation,
            "misconception": misconception,
        }

    @staticmethod
    def _answers_match(
        student: str, correct: str, subskill: str
    ) -> bool:
        """
        Multi-strategy comparison:
          1. Exact string match (case-insensitive, whitespace-stripped)
          2. SymPy symbolic equivalence (if both parse as expressions)
          3. Numeric closeness within tolerance
        """
        s = student.strip().lower().replace(" ", "")
        c = correct.strip().lower().replace(" ", "")
        if s == c:
            return True

        # Try SymPy symbolic equivalence
        try:
            import sympy as sp
            s_expr = sp.sympify(student, evaluate=False)
            c_expr = sp.sympify(correct, evaluate=False)
            diff = sp.simplify(s_expr - c_expr)
            if diff == 0:
                return True
            # numeric tolerance
            s_val = float(s_expr.evalf())
            c_val = float(c_expr.evalf())
            if abs(s_val - c_val) < 1e-6:
                return True
        except Exception:
            pass

        return False

    def _heuristic_misconception(
        self, answer: str, subskill: str
    ) -> Optional[dict]:
        """Keyword-based misconception detection."""
        patterns = MISCONCEPTION_PATTERNS.get(subskill, [])
        answer_lower = answer.lower()
        for pattern in patterns:
            if any(kw in answer_lower for kw in pattern["keywords"]):
                return {
                    "label": pattern["label"],
                    "severity": pattern["severity"],
                    "description": (
                        f"Student answer '{answer}' matches the signature for: "
                        f"{pattern['label']} (subskill: {subskill})."
                    ),
                    "remediation_focus": pattern["label"],
                }
        return None

    async def _llm_classify_misconception(
        self, question: dict, answer: str, subskill: str
    ) -> Optional[dict]:
        """
        Use the LLM to classify the error when heuristics don't match.
        Returns a structured misconception dict or None.
        """
        prompt = (
            "You are an expert mathematics education analyst. "
            "A Class 11 ISC student answered the following differentiation "
            "question INCORRECTLY.\n\n"
            f"Question: {question.get('text', question.get('question_text', ''))}\n"
            f"Options: {question.get('options', [])}\n"
            f"Correct answer: {question.get('correct_answer', '')}\n"
            f"Student answer: {answer}\n"
            f"Subskill being tested: {subskill}\n\n"
            "Identify if this reveals a specific misconception. "
            "Respond ONLY with a JSON object:\n"
            '{"label": "<short label>", "severity": "critical|moderate|minor", '
            '"description": "<1 sentence>", "remediation_focus": "<focus area>"}\n'
            "If no clear misconception, respond with: null"
        )
        try:
            response = await self.llm.generate(
                prompt=prompt,
                max_tokens=200,
                temperature=0.0,
                response_format="json",
            )
            text = response.strip()
            if text.lower() in ("null", "none", "{}"):
                return None
            import json as _json
            result = _json.loads(text)
            if result and result.get("label"):
                return result
        except Exception:
            pass
        return None

    async def _fetch_explanation(self, question_id: str) -> str:
        """Retrieve a pre-authored explanation or generate via LLM."""
        try:
            explanation = await self.practice.get_explanation(question_id)
            if explanation:
                return explanation
        except (AttributeError, Exception):
            pass
        return (
            "The correct approach involves applying the standard differentiation "
            "rule systematically. Review the worked example for a step-by-step "
            "breakdown."
        )

    async def _generate_explanation(
        self, question: dict, student_answer: str,
        correct_answer: str, misconception: Optional[dict]
    ) -> str:
        """
        Generate a personalised explanation using LLM, incorporating
        detected misconception context.
        """
        q_text = question.get("text", question.get("question_text", ""))
        prompt = (
            "You are a patient ISC Class 11 mathematics tutor. "
            "Explain the correct solution to this differentiation problem "
            "step by step, clearly showing where the student's approach "
            "diverged.\n\n"
            f"Question: {q_text}\n"
            f"Correct answer: {correct_answer}\n"
            f"Student answer: {student_answer}\n"
        )
        if misconception:
            prompt += (
                f"\nNOTE: The student likely has this misconception: "
                f"{misconception['label']}. Address it directly.\n"
            )
        prompt += (
            "\nFormat your explanation in LaTeX where appropriate. "
            "Keep it clear and concise (4–6 steps max)."
        )
        try:
            response = await self.llm.generate(prompt=prompt, max_tokens=500,
                                               temperature=0.2)
            return response.strip()
        except Exception:
            return (
                f"The correct answer is {correct_answer}. "
                "Work through each differentiation rule carefully. "
                "Review the worked examples for this subskill."
            )

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 8 – IRT ability & mastery helpers
    # ══════════════════════════════════════════════════════════════════════════

    @staticmethod
    def _blend_mastery(
        previous: float, correct: bool, difficulty: float
    ) -> float:
        """
        Incremental mastery update (BKT-inspired Bayesian blend).

        Learning rate is higher for harder questions (harder question →
        bigger evidence update). Correct answer boosts mastery; incorrect
        answer reduces it.
        """
        # Learning rate: easier questions give more information when correct,
        # harder questions give more information when incorrect
        difficulty_factor = 0.5 + abs(difficulty) * 0.3   # 0.5 at β=0, 0.8 at β=±1
        learning_rate = 0.08 * difficulty_factor

        if correct:
            updated = previous + learning_rate * (1.0 - previous)
        else:
            updated = previous * (1.0 - learning_rate)

        return max(0.0, min(1.0, round(updated, 4)))

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 9 – Diagnostic result builder
    # ══════════════════════════════════════════════════════════════════════════

    async def _build_diagnostic_result(
        self, session: "DiagnosticSession"
    ) -> DiagnosticResult:
        """Aggregate all session data into a DiagnosticResult."""
        responses = session.responses_list
        questions = session.questions_asked_list
        total = len(responses)
        correct_count = sum(1 for r in responses if r["is_correct"])
        final_ability = (
            session.ability_history_list[-1]
            if session.ability_history_list
            else INITIAL_ABILITY
        )

        # ── per-subskill performance ─────────────────────────────────────────
        subskill_stats: dict[str, dict] = {
            s: {"correct": 0, "total": 0, "times": [], "difficulties": []}
            for s in SUBSKILLS
        }
        for r in responses:
            ss = r.get("subskill", "unknown")
            if ss not in subskill_stats:
                subskill_stats[ss] = {"correct": 0, "total": 0,
                                      "times": [], "difficulties": []}
            subskill_stats[ss]["total"] += 1
            subskill_stats[ss]["times"].append(r.get("time_ms", 0))
            subskill_stats[ss]["difficulties"].append(r.get("difficulty", 0.0))
            if r["is_correct"]:
                subskill_stats[ss]["correct"] += 1

        subskill_performance: dict[str, SubskillPerformance] = {}
        for ss, stats in subskill_stats.items():
            mastery = session.subskill_mastery_dict.get(ss, 0.0)
            avg_time = (
                sum(stats["times"]) / len(stats["times"])
                if stats["times"]
                else None
            )
            trend = self._compute_trend(stats["times"])
            subskill_performance[ss] = SubskillPerformance(
                subskill=ss,
                mastery=round(mastery, 4),
                correct=stats["correct"],
                total=stats["total"],
                avg_response_time_ms=round(avg_time, 1) if avg_time else None,
                difficulty_attempted=[round(d, 2) for d in stats["difficulties"]],
                trend=trend,
            )

        # ── phase summary ────────────────────────────────────────────────────
        phase_counts: dict[str, int] = defaultdict(int)
        for r in responses:
            phase_counts[r.get("phase", "unknown")] += 1

        # ── weak / strong areas ──────────────────────────────────────────────
        weak = self._identify_weak_areas(session.subskill_mastery_dict)
        mastery_items = sorted(
            ((s, session.subskill_mastery_dict.get(s, 0.0)) for s in SUBSKILLS),
            key=lambda x: x[1],
        )
        strong = [s for s, m in mastery_items if m >= 0.65]

        # missing prerequisites: those with < 0.4 mastery
        prereqs = ["limit_concept", "function_composition"]
        missing_prereqs = [p for p in prereqs
                           if session.subskill_mastery_dict.get(p, 0.0) < 0.4]

        # ── overall mastery (weighted by question count per subskill) ─────────
        total_weight = sum(s["total"] for s in subskill_stats.values()) or 1
        overall_mastery = sum(
            session.subskill_mastery_dict.get(ss, 0.0) * stats["total"]
            for ss, stats in subskill_stats.items()
        ) / total_weight

        misconceptions = [MisconceptionReport(**m)
                          for m in session.misconceptions_list_data]

        return DiagnosticResult(
            session_id=session.id,
            student_id=session.student_id,
            subject=session.subject,
            chapter_id=session.chapter_id,
            overall_mastery=round(overall_mastery, 4),
            started_at=session.started_at,
            completed_at=session.completed_at,
            total_time_ms=session.total_time_ms,
            questions_answered=total,
            correct_answers=correct_count,
            final_ability=round(final_ability, 4),
            phase_summary=dict(phase_counts),
            subskill_performance=subskill_performance,
            misconceptions=misconceptions,
            status=session.status,
        )

    @staticmethod
    def _identify_weak_areas(mastery_dict: dict[str, float], threshold: float = 0.5
                             ) -> list[str]:
        """Return subskills below threshold, sorted by mastery ascending."""
        return sorted(
            [s for s, m in mastery_dict.items() if m < threshold],
            key=lambda s: mastery_dict[s],
        )

    @staticmethod
    def _compute_trend(times: list[int]) -> str:
        """
        Rough performance trend from response times.
        Slow responses can signal struggling.
        """
        if len(times) < 2:
            return "insufficient_data"
        mid = len(times) // 2
        first_half_avg = sum(times[:mid]) / mid
        second_half_avg = sum(times[mid:]) / (len(times) - mid)
        ratio = second_half_avg / first_half_avg if first_half_avg else 1.0
        if ratio > 1.3:
            return "declining"
        if ratio < 0.7:
            return "improving"
        return "stable"

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 10 – Remediation path generation
    # ══════════════════════════════════════════════════════════════════════════

    async def _generate_module_content_llm(
        self, subskill: str, severity: str,
        performance: Optional[SubskillPerformance] = None,
    ) -> dict:
        """
        Use LLM to generate personalised module structure.
        Falls back to rule-based content if LLM fails.
        """
        mastery_str = f"{performance.mastery:.0%}" if performance else "unknown"
        prompt = (
            "You are designing a personalised remediation module for an ISC Class 11 "
            "Mathematics student. Respond with valid JSON only.\n\n"
            f"Subskill: {subskill}\n"
            f"Current mastery: {mastery_str}\n"
            f"Severity: {severity}\n\n"
            "Return a JSON object with these fields:\n"
            '{\n'
            f'  "title": "string",\n'
            f'  "description": "string",\n'
            f'  "days": 2-5 integer,\n'
            f'  "practice_count": 20-60 integer,\n'
            f'  "target_mastery": 0.65-0.80 float,\n'
            f'  "daily_plan": ["Day 1: ...", "Day 2: ...", ...]\n'
            '}\n\n'
            f"The daily_plan must have exactly 'days' entries. "
            f"Each entry starts with 'Day N: ' followed by a brief plan for that day. "
            f"Be specific to {subskill} and ISC Class 11 calculus."
        )
        default = self._default_module_content(subskill, severity, performance)
        try:
            response = await self.llm.generate(
                prompt=prompt,
                max_tokens=600,
                temperature=0.3,
                response_format="json",
            )
            import json as _json
            parsed = _json.loads(response.strip())
            # validate & fill defaults
            parsed.setdefault("days", default["days"])
            parsed.setdefault("practice_count", default["practice_count"])
            parsed.setdefault("target_mastery", default["target_mastery"])
            parsed.setdefault("daily_plan", default["daily_plan"])
            parsed.setdefault("title", default["title"])
            parsed.setdefault("description", default["description"])
            return parsed
        except Exception:
            return default

    def _default_module_content(
        self, subskill: str, severity: str,
        performance: Optional[SubskillPerformance] = None,
    ) -> dict:
        """Rule-based fallback for module content."""
        title_map = {
            "limit_concept": "Review: Limits & Continuity",
            "function_composition": "Review: Function Composition",
            "power_rule": "Practice: Power Rule",
            "chain_rule": "Learn: Chain Rule",
            "product_rule": "Practice: Product Rule",
            "quotient_rule": "Practice: Quotient Rule",
            "implicit_diff": "Learn: Implicit Differentiation",
            "trig_derivatives": "Practice: Trigonometric Derivatives",
            "exponential_log": "Practice: Exponential & Log Derivatives",
            "parametric_derivatives": "Learn: Parametric Differentiation",
        }
        base_title = title_map.get(subskill, f"Remediation: {self._humanise(subskill)}")
        days = 3 if severity == "weak" else 2
        practice = 45 if severity == "weak" else 25

        daily_plans = {
            "limit_concept": [
                "Day 1: Concept of limits, algebraic manipulation, "
                        "standard limits (20 problems)",
                "Day 2: Indeterminate forms, L'Hospital intuition, "
                        "limit at infinity (15 problems)",
            ],
            "function_composition": [
                "Day 1: Identify inner/outer functions, "
                        "notation f(g(x)) (15 problems)",
                "Day 2: Apply chain rule to composed functions "
                        "(20 problems)",
            ],
            "chain_rule": [
                "Day 1: Identify inner & outer functions, "
                        "write chain rule formula (20 problems)",
                "Day 2: Chain rule with products/quotients (15 problems)",
                "Day 3: Mixed chain rule & implicit (15 problems)",
            ],
            "product_rule": [
                "Day 1: Product rule formula, basic products (20 problems)",
                "Day 2: Products with chain rule combined (15 problems)",
            ],
            "implicit_diff": [
                "Day 1: Implicit differentiation method, "
                        "differentiate both sides (15 problems)",
                "Day 2: Find dy/dx, find d²y/dx² (15 problems)",
                "Day 3: Tangent/normal via implicit differentiation (10 problems)",
            ],
        }
        plan = daily_plans.get(
            subskill,
            [f"Day {i+1}: {base_title} practice session "
             f"({practice // days} problems)"
             for i in range(days)],
        )

        return {
            "title": base_title,
            "description": (
                f"Targeted remediation for {self._humanise(subskill)} "
                f"based on diagnostic results. Current mastery: "
                f"{performance.mastery:.0%}." if performance
                else f"Targeted remediation for {self._humanise(subskill)}."
            ),
            "days": days,
            "practice_count": practice,
            "target_mastery": 0.70,
            "daily_plan": plan,
        }

    @staticmethod
    def _generate_daily_plan_prereview(subskill: str) -> list[str]:
        """Standard two-day prerequisite review plan."""
        return [
            (f"Day 1: Core concepts of {subskill} — "
             f"definitions, notation, worked examples (20 problems)"),
            (f"Day 2: Application & common pitfalls of {subskill} — "
             f"mixed practice set (20 problems)"),
        ]

    async def _fetch_worked_examples(self, subskill: str) -> list[str]:
        """Retrieve relevant worked example IDs via WorkedExamplesService."""
        try:
            examples = await self.worked.get_examples_for_subskill(subskill)
            return [ex.get("id", "") for ex in examples if ex.get("id")]
        except (AttributeError, Exception):
            # Try alternative interface
            try:
                examples = await self.worked.get_examples(subskill)
                return [ex.get("id", "") for ex in examples if ex.get("id")]
            except Exception:
                return []

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 11 – Question retrieval (PracticeService wrapper)
    # ══════════════════════════════════════════════════════════════════════════

    async def _fetch_question(self, question_id: str) -> dict:
        """
        Retrieve the canonical question data by ID.
        Wraps PracticeService; falls back gracefully.
        """
        try:
            q = await self.practice.get_question(question_id)
            if q:
                return q
        except (AttributeError, Exception):
            pass
        # Corpus-backed questions (corpus:<uuid>) resolve via the selector
        try:
            q = await self.selector.get_question(question_id)
            if q:
                return q
        except (AttributeError, Exception):
            pass
        # Minimal fallback – caller must supply enough via the asked list
        return {"id": question_id, "correct_answer": "", "options": [],
                "subskill": "unknown", "text": "", "difficulty": 0.0}

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 12 – Utilities
    # ══════════════════════════════════════════════════════════════════════════

    @staticmethod
    def _humanise(subskill: str) -> str:
        """Convert snake_case subskill tag to a human-readable label."""
        return subskill.replace("_", " ").title()


# ══════════════════════════════════════════════════════════════════════════════
# SECTION 13 – Convenience factory
# ══════════════════════════════════════════════════════════════════════════════

def create_diagnostic_service(
    db: AsyncSession,
    practice_svc: PracticeService,
    selector: QuestionSelector,
    llm_client: LLMClient,
    worked_svc: WorkedExamplesService,
) -> DiagnosticService:
    """
    Factory function for dependency injection (FastAPI / lifespan).

    Usage in FastAPI router:
        svc = create_diagnostic_service(db, practice_svc, selector, llm, worked)
    """
    return DiagnosticService(
        db=db,
        practice_svc=practice_svc,
        selector=selector,
        llm_client=llm_client,
        worked_svc=worked_svc,
    )