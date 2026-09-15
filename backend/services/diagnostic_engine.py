"""
diagnostic_engine.py
====================
Adaptive diagnostic engine for CISCE K-12 learning platform.
Finds the exact learning gap a student has in under 15 questions.

Phases:
  Q 1-3   : Broad coverage at medium difficulty (baseline probing)
  Q 4-10  : Adaptive targeting (IRT-driven, drill into weak areas)
  Q 11-15 : Confirmation phase (verify weak/strong areas)

Integration:
  - knowledge_tracing.py : BKT + IRT + AFM mastery tracking
  - question_selector.py : IRT-based next-question selection
  - llm_client.py        : Misconception classification
  - practice_service.py  : Question retrieval
"""

from __future__ import annotations

import asyncio
import hashlib
import json
import logging
import math
import random
import time
import uuid
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Callable, Coroutine, Dict, List, Optional, Tuple

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Attempted optional imports — degrade gracefully if services are missing
# ---------------------------------------------------------------------------

def _safe_import(module_path: str, class_name: str) -> Optional[type]:
    """Try importing a class from a dotted module path. Return None on failure."""
    try:
        import importlib
        module = importlib.import_module(module_path)
        return getattr(module, class_name, None)
    except (ImportError, AttributeError):
        return None


IRTModel = _safe_import("services.knowledge_tracing", "IRTModel")
QuestionSelector = _safe_import("services.question_selector", "QuestionSelector")
LLMClient = _safe_import("services.llm_client", "LLMClient")
PracticeService = _safe_import("services.practice_service", "PracticeService")

# ---------------------------------------------------------------------------
# Enumerations
# ---------------------------------------------------------------------------

class GapType(Enum):
    """Classification of the root cause of a learning gap."""
    CONCEPT = "concept"          # Student does not understand the underlying idea
    PROCEDURAL = "procedural"    # Student cannot set up / extract variables correctly
    COMPUTATION = "computation"  # Student can set up but makes arithmetic errors
    NONE = "none"                # No gap detected


class PhaseType(Enum):
    """Diagnostic phase identifiers."""
    BASELINE = "baseline"        # Q1-3: Broad coverage
    ADAPTIVE = "adaptive"        # Q4-10: IRT-driven targeting
    CONFIRMATION = "confirmation" # Q11-15: Verify findings
    COMPLETE = "complete"        # Diagnostic finished


class GapSeverity(Enum):
    """How severe a diagnosed gap is."""
    CRITICAL = "critical"        # Blocks all downstream concepts
    MODERATE = "moderate"        # Causes errors but concept is partially understood
    MINOR = "minor"              # Rare / careless errors only


# ---------------------------------------------------------------------------
# Data models
# ---------------------------------------------------------------------------

@dataclass
class Question:
    """Minimal question representation for the diagnostic engine."""
    question_id: str
    node_id: str
    subskill: str
    difficulty: float
    discrimination: float
    guess_prob: float
    slip_prob: float
    text: str = ""
    options: List[str] = field(default_factory=list)
    correct_answer: str = ""
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict:
        return {
            "question_id": self.question_id,
            "node_id": self.node_id,
            "subskill": self.subskill,
            "difficulty": self.difficulty,
            "discrimination": self.discrimination,
            "guess_prob": self.guess_prob,
            "slip_prob": self.slip_prob,
            "text": self.text,
            "options": self.options,
            "correct_answer": self.correct_answer,
            "metadata": self.metadata,
        }


@dataclass
class ResponseRecord:
    """One student response during the diagnostic."""
    question_id: str
    node_id: str
    subskill: str
    is_correct: bool
    time_seconds: float
    difficulty: float
    selected_answer: str = ""
    hint_used: bool = False
    timestamp: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict:
        return {
            "question_id": self.question_id,
            "node_id": self.node_id,
            "subskill": self.subskill,
            "is_correct": self.is_correct,
            "time_seconds": self.time_seconds,
            "difficulty": self.difficulty,
            "selected_answer": self.selected_answer,
            "hint_used": self.hint_used,
            "timestamp": self.timestamp.isoformat(),
            "metadata": self.metadata,
        }


@dataclass
class SubskillResult:
    """Results for a single sub-skill after the diagnostic."""
    subskill: str
    questions_asked: int
    correct_count: int
    mastery_probability: float
    avg_difficulty: float
    avg_response_time: float
    gap_type: GapType
    gap_severity: GapSeverity
    misconception_label: str
    theta_estimate: float

    @property
    def accuracy(self) -> float:
        if self.questions_asked == 0:
            return 0.0
        return self.correct_count / self.questions_asked

    def to_dict(self) -> dict:
        return {
            "subskill": self.subskill,
            "questions_asked": self.questions_asked,
            "correct_count": self.correct_count,
            "accuracy": round(self.accuracy, 4),
            "mastery_probability": round(self.mastery_probability, 4),
            "avg_difficulty": round(self.avg_difficulty, 4),
            "avg_response_time": round(self.avg_response_time, 2),
            "gap_type": self.gap_type.value,
            "gap_severity": self.gap_severity.value,
            "misconception_label": self.misconception_label,
            "theta_estimate": round(self.theta_estimate, 4),
        }


@dataclass
class RemediationStep:
    """One step in a remediation path."""
    step_number: int
    subskill: str
    action_type: str          # "review_prerequisite" | "guided_examples" | "step_solver"
    description: str
    estimated_minutes: int
    resource_url: str = ""
    prerequisite_node: str = ""
    difficulty_level: str = "medium"

    def to_dict(self) -> dict:
        return {
            "step_number": self.step_number,
            "subskill": self.subskill,
            "action_type": self.action_type,
            "description": self.description,
            "estimated_minutes": self.estimated_minutes,
            "resource_url": self.resource_url,
            "prerequisite_node": self.prerequisite_node,
            "difficulty_level": self.difficulty_level,
        }


@dataclass
class RemediationPath:
    """Full remediation plan for a diagnosed gap."""
    gaps: List[SubskillResult]
    steps: List[RemediationStep]
    estimated_total_minutes: int
    priority_order: List[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "gaps": [g.to_dict() for g in self.gaps],
            "steps": [s.to_dict() for s in self.steps],
            "estimated_total_minutes": self.estimated_total_minutes,
            "priority_order": self.priority_order,
        }


@dataclass
class DiagnosticSession:
    """Tracks the state of an in-progress or completed diagnostic."""
    session_id: str
    student_id: str
    subject: str
    class_level: str
    topic: Optional[str]
    phase: PhaseType
    questions_asked: int
    max_questions: int
    responses: List[ResponseRecord] = field(default_factory=list)
    current_theta: float = 0.0
    subskill_coverage: Dict[str, int] = field(default_factory=dict)
    started_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    completed_at: Optional[datetime] = None
    stopped_early: bool = False
    stop_reason: str = ""
    metadata: Dict[str, Any] = field(default_factory=dict)

    @property
    def is_complete(self) -> bool:
        return self.phase == PhaseType.COMPLETE

    @property
    def elapsed_seconds(self) -> float:
        end = self.completed_at or datetime.now(timezone.utc)
        return (end - self.started_at).total_seconds()

    def to_dict(self) -> dict:
        return {
            "session_id": self.session_id,
            "student_id": self.student_id,
            "subject": self.subject,
            "class_level": self.class_level,
            "topic": self.topic,
            "phase": self.phase.value,
            "questions_asked": self.questions_asked,
            "max_questions": self.max_questions,
            "current_theta": round(self.current_theta, 4),
            "subskill_coverage": dict(self.subskill_coverage),
            "started_at": self.started_at.isoformat(),
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "stopped_early": self.stopped_early,
            "stop_reason": self.stop_reason,
            "elapsed_seconds": round(self.elapsed_seconds, 2),
            "metadata": self.metadata,
        }


@dataclass
class DiagnosticReport:
    """Final output of the diagnostic engine."""
    session: DiagnosticSession
    subskill_results: List[SubskillResult]
    remediation: RemediationPath
    strong_areas: List[str]
    weak_areas: List[str]
    overall_mastery: float
    diagnostic_summary: str
    generated_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def to_dict(self) -> dict:
        return {
            "session": self.session.to_dict(),
            "subskill_results": [r.to_dict() for r in self.subskill_results],
            "remediation": self.remediation.to_dict(),
            "strong_areas": self.strong_areas,
            "weak_areas": self.weak_areas,
            "overall_mastery": round(self.overall_mastery, 4),
            "diagnostic_summary": self.diagnostic_summary,
            "generated_at": self.generated_at.isoformat(),
        }

    def to_json(self) -> str:
        return json.dumps(self.to_dict(), default=str)


# ---------------------------------------------------------------------------
# Static data — sub-skills, misconceptions, prerequisite graph
# ---------------------------------------------------------------------------

# Sub-skills ordered so prerequisites appear first
SUBSKILLS_ORDERED: List[str] = [
    "limit_concept",
    "function_composition",
    "power_rule",
    "chain_rule",
    "product_rule",
    "quotient_rule",
    "implicit_diff",
    "trig_derivatives",
    "exponential_log",
    "parametric_derivatives",
]

PHASE1_SUBSKILLS: List[str] = [
    "limit_concept",
    "function_composition",
    "power_rule",
    "chain_rule",
    "product_rule",
]

# Prerequisite graph: key depends on values
PREREQUISITE_MAP: Dict[str, str] = {
    "chain_rule": "function_composition",
    "product_rule": "power_rule",
    "quotient_rule": "power_rule",
    "implicit_diff": "chain_rule",
    "trig_derivatives": "chain_rule",
    "exponential_log": "chain_rule",
    "parametric_derivatives": "chain_rule",
}

# Misconception keyword heuristics (fallback if LLM unavailable)
MISCONCEPTION_PATTERNS: Dict[str, List[dict]] = {
    "limit_concept": [
        {
            "keywords": ["undefined", "0/0", "infinity", "does not exist"],
            "label": "Treats indeterminate form as diverging",
            "severity": "critical",
        },
        {
            "keywords": ["substitute", "plug in"],
            "label": "Relies on direct substitution without factoring",
            "severity": "moderate",
        },
    ],
    "function_composition": [
        {
            "keywords": ["inside first", "outer derivative"],
            "label": "Applies outer derivative before inner derivative",
            "severity": "critical",
        },
        {
            "keywords": ["same variable", "dx/dx"],
            "label": "Confuses f(g(x)) with f(x)*g(x)",
            "severity": "critical",
        },
    ],
    "power_rule": [
        {
            "keywords": ["multiply exponent", "add 1 to coefficient"],
            "label": "Modifies coefficient instead of exponent",
            "severity": "moderate",
        },
    ],
    "chain_rule": [
        {
            "keywords": ["only outer", "forgot inner", "missed"],
            "label": "Applies only outer derivative, omits inner",
            "severity": "critical",
        },
    ],
    "product_rule": [
        {
            "keywords": ["multiply derivatives"],
            "label": "Multiplies derivatives instead of applying product rule",
            "severity": "moderate",
        },
    ],
    "quotient_rule": [
        {
            "keywords": ["inverse", "divide derivatives"],
            "label": "Applies reciprocal rule instead of quotient rule",
            "severity": "moderate",
        },
    ],
    "implicit_diff": [
        {
            "keywords": ["solve for y", "explicit"],
            "label": "Cannot handle implicit differentiation setup",
            "severity": "critical",
        },
    ],
    "trig_derivatives": [
        {
            "keywords": ["chain rule", "forgot derivative of inside"],
            "label": "Misses chain rule on trig argument",
            "severity": "moderate",
        },
    ],
    "exponential_log": [
        {
            "keywords": ["e^u", "log u"],
            "label": "Forgets to apply chain rule on exponential/log argument",
            "severity": "moderate",
        },
    ],
    "parametric_derivatives": [
        {
            "keywords": ["dy/dx", "dt"],
            "label": "Cannot construct dy/dx from parametric equations",
            "severity": "critical",
        },
    ],
}

# Remediation templates keyed by gap type
REMEDIATION_TEMPLATES: Dict[str, Dict[str, str]] = {
    "concept": {
        "review_prerequisite": "Review the foundational concept in the prerequisite node '{prereq}'. Watch the concept walkthrough video.",
        "guided_examples": "Study worked examples that illustrate the concept, then explain the idea in your own words.",
    },
    "procedural": {
        "guided_examples": "Practice extracting variables and setting up the problem with guided step-by-step examples.",
        "step_solver": "Use the step-by-step solver to see exactly how the problem is set up before solving.",
    },
    "computation": {
        "step_solver": "Practice calculations using the step-by-step solver, checking each arithmetic step.",
        "guided_examples": "Work through similar problems with increasing difficulty, focusing on careful arithmetic.",
    },
}

# Estimated minutes per remediation action
REMEDIATION_MINUTES: Dict[str, int] = {
    "review_prerequisite": 15,
    "guided_examples": 20,
    "step_solver": 10,
}


# ---------------------------------------------------------------------------
# Diagnostic Engine
# ---------------------------------------------------------------------------

class DiagnosticEngine:
    """
    Adaptive diagnostic engine that identifies exact learning gaps in
    under 15 questions and produces actionable remediation plans.

    Phases:
      Q 1-3   : Broad coverage at medium difficulty (baseline probing)
      Q 4-10  : Adaptive targeting (IRT-driven, drill into weak areas)
      Q 11-15 : Confirmation phase (verify weak/strong areas)
    """

    def __init__(
        self,
        max_questions: int = 15,
        question_timeout: float = 10.0,
        target_accuracy: float = 0.70,
        irt_model: Optional[Any] = None,
        question_selector: Optional[Any] = None,
        llm_client: Optional[Any] = None,
        practice_service: Optional[Any] = None,
    ) -> None:
        """
        Initialize the diagnostic engine.

        Args:
            max_questions: Maximum questions to ask (default 15).
            question_timeout: Timeout per question in seconds (default 10).
            target_accuracy: Target success rate for Zone of Proximal Development (default 0.70).
            irt_model: Optional IRTModel instance (for BKT integration).
            question_selector: Optional QuestionSelector instance.
            llm_client: Optional LLMClient instance (for misconception classification).
            practice_service: Optional PracticeService instance (for question retrieval).
        """
        self.max_questions = max_questions
        self.question_timeout = question_timeout
        self.target_accuracy = target_accuracy
        self._irt_model = irt_model
        self._question_selector = question_selector
        self._llm_client = llm_client
        self._practice_service = practice_service
        self._question_bank: Dict[str, List[Question]] = {}
        self._all_asked_question_ids: set = set()
        self._analytics_log: List[dict] = []

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    async def run_diagnostic(
        self,
        student_id: str,
        subject: str,
        class_level: str,
        topic: Optional[str] = None,
        db: Optional[Any] = None,
    ) -> DiagnosticReport:
        """
        Run the full adaptive diagnostic flow.

        Args:
            student_id: Unique identifier for the student.
            subject: Subject being diagnosed (e.g., "mathematics").
            class_level: Class level (e.g., "11", "12").
            topic: Optional specific topic to focus on.
            db: Optional database session for persistence.

        Returns:
            DiagnosticReport with full results and remediation.
        """
        session = DiagnosticSession(
            session_id=self._generate_session_id(),
            student_id=student_id,
            subject=subject,
            class_level=class_level,
            topic=topic,
            phase=PhaseType.BASELINE,
            questions_asked=0,
            max_questions=self.max_questions,
        )

        logger.info(
            "Starting diagnostic session %s for student %s (%s %s)",
            session.session_id, student_id, class_level, subject,
        )

        try:
            # Load question bank
            await self._load_question_bank(db, subject, class_level, topic)

            if not self._question_bank:
                raise ValueError(
                    "No questions available for the given subject/class/topic."
                )

            # Initialize question selector if available
            if self._question_selector is None and QuestionSelector is not None:
                self._question_selector = QuestionSelector()

            # Initialize IRT model if available
            if self._irt_model is None and IRTModel is not None:
                self._irt_model = IRTModel()

            # Phase 1: Baseline probing (Q1-3)
            session.phase = PhaseType.BASELINE
            await self._run_baseline_phase(session)

            # Phase 2: Adaptive targeting (Q4-10)
            session.phase = PhaseType.ADAPTIVE
            await self._run_adaptive_phase(session)

            # Phase 3: Confirmation (Q11-15)
            session.phase = PhaseType.CONFIRMATION
            await self._run_confirmation_phase(session)

            # Mark complete
            session.phase = PhaseType.COMPLETE
            session.completed_at = datetime.now(timezone.utc)
            logger.info(
                "Diagnostic session %s complete: %d questions in %.1fs",
                session.session_id,
                session.questions_asked,
                session.elapsed_seconds,
            )

        except Exception as exc:
            logger.error("Diagnostic session %s failed: %s", session.session_id, exc)
            session.phase = PhaseType.COMPLETE
            session.completed_at = datetime.now(timezone.utc)
            session.stopped_early = True
            session.stop_reason = str(exc)

        # Generate the final report
        return await self._generate_report(session)

    # ------------------------------------------------------------------
    # Phase 1: Baseline Probing (Q 1-3)
    # ------------------------------------------------------------------

    async def _run_baseline_phase(self, session: DiagnosticSession) -> None:
        """
        Ask 3 questions covering medium-difficulty items from key
        prerequisite skills to establish a baseline ability estimate.
        """
        logger.info("Phase 1: Baseline probing for session %s", session.session_id)
        target_skills = PHASE1_SUBSKILLS

        for subskill in target_skills:
            if session.questions_asked >= self.max_questions:
                break

            question = await self._select_baseline_question(session, subskill)
            if question is None:
                continue

            response = await self._ask_question(session, question)
            session.responses.append(response)
            session.questions_asked += 1
            session.subskill_coverage[subskill] = (
                session.subskill_coverage.get(subskill, 0) + 1
            )
            self._all_asked_question_ids.add(question.question_id)

            # Update theta estimate
            session.current_theta = await self._update_theta(
                session, response, session.current_theta
            )

            self._log_analytics(session, response)

        logger.info(
            "Phase 1 complete. Theta=%.3f, questions=%d",
            session.current_theta,
            session.questions_asked,
        )

    # ------------------------------------------------------------------
    # Phase 2: Adaptive Targeting (Q 4-10)
    # ------------------------------------------------------------------

    async def _run_adaptive_phase(self, session: DiagnosticSession) -> None:
        """
        Use IRT-driven question selection to drill into weak areas.
        Target the Zone of Proximal Development (~70% success rate).
        """
        logger.info("Phase 2: Adaptive targeting for session %s", session.session_id)

        while session.questions_asked < self.max_questions:
            question = await self._select_adaptive_question(session)
            if question is None:
                # Cannot find more questions; move to confirmation
                break

            response = await self._ask_question(session, question)
            session.responses.append(response)
            session.questions_asked += 1
            session.subskill_coverage[question.subskill] = (
                session.subskill_coverage.get(question.subskill, 0) + 1
            )
            self._all_asked_question_ids.add(question.question_id)

            # Update theta
            session.current_theta = await self._update_theta(
                session, response, session.current_theta
            )

            # Check early stopping conditions
            if self._check_complete_coverage(session):
                session.stopped_early = True
                session.stop_reason = "All sub-skills assessed"
                break

            self._log_analytics(session, response)

        logger.info(
            "Phase 2 complete. Theta=%.3f, questions=%d",
            session.current_theta,
            session.questions_asked,
        )

    # ------------------------------------------------------------------
    # Phase 3: Confirmation (Q 11-15)
    # ------------------------------------------------------------------

    async def _run_confirmation_phase(self, session: DiagnosticSession) -> None:
        """
        Ask follow-up questions to confirm weak and strong areas
        identified in Phase 2.
        """
        logger.info("Phase 3: Confirmation for session %s", session.session_id)

        # Identify weak and strong sub-skills from Phase 2
        subskill_scores = self._compute_subskill_scores(session)
        weak_skills = [
            s for s, score in subskill_scores.items()
            if score < 0.5 and s not in self._dont_revisit(session)
        ]
        strong_skills = [
            s for s, score in subskill_scores.items()
            if score >= 0.7
        ]

        # Ask one confirmation question for each weak skill
        for subskill in weak_skills[:3]:
            if session.questions_asked >= self.max_questions:
                break

            question = await self._select_confirmation_question(
                session, subskill, weak=True
            )
            if question is None:
                continue

            response = await self._ask_question(session, question)
            session.responses.append(response)
            session.questions_asked += 1
            session.subskill_coverage[question.subskill] = (
                session.subskill_coverage.get(question.subskill, 0) + 1
            )
            self._all_asked_question_ids.add(question.question_id)

            session.current_theta = await self._update_theta(
                session, response, session.current_theta
            )
            self._log_analytics(session, response)

        # Confirm one strong area (harder question) if slots remain
        for subskill in strong_skills[:2]:
            if session.questions_asked >= self.max_questions:
                break

            question = await self._select_confirmation_question(
                session, subskill, weak=False
            )
            if question is None:
                continue

            response = await self._ask_question(session, question)
            session.responses.append(response)
            session.questions_asked += 1
            session.subskill_coverage[question.subskill] = (
                session.subskill_coverage.get(question.subskill, 0) + 1
            )
            self._all_asked_question_ids.add(question.question_id)

            session.current_theta = await self._update_theta(
                session, response, session.current_theta
            )
            self._log_analytics(session, response)

        logger.info(
            "Phase 3 complete. Questions=%d", session.questions_asked
        )

    # ------------------------------------------------------------------
    # Question selection strategies
    # ------------------------------------------------------------------

    async def _select_next_question(
        self, session: DiagnosticSession, responses: List[ResponseRecord]
    ) -> Optional[Question]:
        """Select the optimal next question (delegates by phase)."""
        if session.phase == PhaseType.BASELINE:
            return await self._select_baseline_question(session, "")
        elif session.phase == PhaseType.ADAPTIVE:
            return await self._select_adaptive_question(session)
        else:
            return await self._select_confirmation_question(session, "", weak=False)

    async def _select_baseline_question(
        self, session: DiagnosticSession, subskill: str
    ) -> Optional[Question]:
        """
        Select a medium-difficulty question for the given sub-skill.
        During baseline, we cycle through PHASE1_SUBSKILLS.
        """
        candidates = self._get_candidates_for_subskill(
            subskill, difficulty_range=(0.3, 0.7)
        )
        if not candidates and subskill:
            candidates = self._get_any_candidates(difficulty_range=(0.3, 0.7))
        if not candidates:
            candidates = self._get_any_candidates()
        return self._pick_best_information(candidates, session.current_theta)

    async def _select_adaptive_question(
        self, session: DiagnosticSession
    ) -> Optional[Question]:
        """
        Select a question targeting the Zone of Proximal Development.
        Prioritize sub-skills with the lowest mastery scores.
        """
        subskill_scores = self._compute_subskill_scores(session)

        # Sort sub-skills by lowest score (most in need)
        sorted_skills = sorted(subskill_scores.items(), key=lambda x: x[1])

        for subskill, score in sorted_skills:
            if subskill in self._dont_revisit(session):
                continue

            # Target difficulty at the student's current theta but nudged
            # toward the ZPD (target_accuracy).
            # For a 3PL model: target difficulty = theta when accuracy ~ 0.5
            # We want ~0.7 accuracy, so target_difficulty = theta + offset
            if score < 0.4:
                # Very weak: easier questions
                diff_range = (
                    max(0.1, session.current_theta - 0.8),
                    max(0.3, session.current_theta - 0.2),
                )
            elif score < 0.7:
                # Moderate: ZPD
                diff_range = (
                    session.current_theta - 0.3,
                    session.current_theta + 0.2,
                )
            else:
                # Strong: challenge them
                diff_range = (
                    session.current_theta + 0.1,
                    min(1.0, session.current_theta + 0.6),
                )

            candidates = self._get_candidates_for_subskill(
                subskill, difficulty_range=diff_range
            )
            if candidates:
                return self._pick_best_information(
                    candidates, session.current_theta
                )

        # Fallback: any unseen question
        return self._pick_best_information(
            self._get_any_candidates(), session.current_theta
        )

    async def _select_confirmation_question(
        self, session: DiagnosticSession, subskill: str, weak: bool
    ) -> Optional[Question]:
        """
        Select a confirmation question.
        For weak areas: easier question to confirm the gap.
        For strong areas: harder question to confirm strength.
        """
        if weak:
            diff_range = (0.1, session.current_theta - 0.1)
        else:
            diff_range = (session.current_theta + 0.2, 1.0)

        diff_range = (
            max(0.1, diff_range[0]),
            min(1.0, diff_range[1]),
        )

        candidates = self._get_candidates_for_subskill(
            subskill, difficulty_range=diff_range
        )
        if not candidates:
            candidates = self._get_any_candidates(difficulty_range=diff_range)
        return self._pick_best_information(candidates, session.current_theta)

    # ------------------------------------------------------------------
    # Question bank management
    # ------------------------------------------------------------------

    async def _load_question_bank(
        self,
        db: Any,
        subject: str,
        class_level: str,
        topic: Optional[str],
    ) -> None:
        """Load questions from the question bank or practice service."""
        self._question_bank.clear()

        # Try practice service first
        if self._practice_service is not None:
            try:
                questions = await self._practice_service.get_questions(
                    subject=subject, class_level=class_level, topic=topic
                )
                for q in questions:
                    q_data = self._normalize_question(q)
                    sub = q_data.subskill
                    self._question_bank.setdefault(sub, []).append(q_data)
                if self._question_bank:
                    return
            except Exception as exc:
                logger.warning("Practice service unavailable: %s", exc)

        # Try DB session
        if db is not None:
            try:
                from sqlalchemy import select
                from backend.models.enrichment import BoardQuestion  # type: ignore

                stmt = (
                    select(BoardQuestion)
                    .where(
                        BoardQuestion.subject == subject,
                        BoardQuestion.class_level == int(class_level),
                    )
                )
                if topic:
                    stmt = stmt.where(BoardQuestion.topic == topic)
                result = await db.execute(stmt)
                rows = result.scalars().all()
                for row in rows:
                    q_data = self._row_to_question(row)
                    sub = q_data.subskill
                    self._question_bank.setdefault(sub, []).append(q_data)
                if self._question_bank:
                    return
            except Exception as exc:
                logger.warning("DB question load failed: %s", exc)

        # Fallback: generate mock questions for each sub-skill
        self._generate_mock_question_bank(subject, class_level)

    def _normalize_question(self, raw: Any) -> Question:
        """Convert a question from any source into our Question dataclass."""
        if isinstance(raw, Question):
            return raw
        if isinstance(raw, dict):
            return Question(
                question_id=str(raw.get("id", raw.get("question_id", uuid.uuid4().hex))),
                node_id=str(raw.get("node_id", raw.get("subskill", "unknown"))),
                subskill=str(raw.get("subskill", "unknown")),
                difficulty=float(raw.get("difficulty", 0.5)),
                discrimination=float(raw.get("discrimination", 1.0)),
                guess_prob=float(raw.get("guess_prob", 0.25)),
                slip_prob=float(raw.get("slip_prob", 0.1)),
                text=str(raw.get("text", raw.get("question_text", ""))),
                options=raw.get("options", []),
                correct_answer=str(raw.get("correct_answer", raw.get("answer", ""))),
                metadata=raw.get("metadata", {}),
            )
        raise TypeError(f"Cannot normalize question of type {type(raw)}")

    def _row_to_question(self, row: Any) -> Question:
        """Convert a SQLAlchemy model row to Question."""
        metadata = {}
        if hasattr(row, "tags") and row.tags:
            metadata["tags"] = row.tags
        if hasattr(row, "blooms_level") and row.blooms_level:
            metadata["blooms_level"] = row.blooms_level

        return Question(
            question_id=str(row.id),
            node_id=str(getattr(row, "topic", "unknown")),
            subskill=str(getattr(row, "topic", "unknown")),
            difficulty=float(getattr(row, "difficulty", 0.5)),
            discrimination=float(getattr(row, "discrimination", 1.0)),
            guess_prob=0.25,
            slip_prob=0.1,
            text=str(getattr(row, "question_text", "")),
            options=getattr(row, "options", []) or [],
            correct_answer=str(getattr(row, "correct_answer", "")),
            metadata=metadata,
        )

    def _generate_mock_question_bank(self, subject: str, class_level: str) -> None:
        """Generate a diverse mock question bank for demonstration."""
        difficulty_presets = [0.2, 0.35, 0.5, 0.65, 0.8]
        q_id_counter = 0

        for subskill in SUBSKILLS_ORDERED:
            questions = []
            for diff in difficulty_presets:
                q_id = f"mock_{q_id_counter:04d}"
                q_id_counter += 1
                questions.append(Question(
                    question_id=q_id,
                    node_id=subskill,
                    subskill=subskill,
                    difficulty=diff,
                    discrimination=random.uniform(0.8, 1.5),
                    guess_prob=0.25,
                    slip_prob=0.1,
                    text=f"[Mock] {subskill} question (difficulty={diff:.2f})",
                    options=["A", "B", "C", "D"],
                    correct_answer="A",
                    metadata={"mock": True, "subject": subject, "class_level": class_level},
                ))
            self._question_bank[subskill] = questions

    # ------------------------------------------------------------------
    # Candidate filtering helpers
    # ------------------------------------------------------------------

    def _get_candidates_for_subskill(
        self,
        subskill: str,
        difficulty_range: Tuple[float, float] = (0.1, 1.0),
    ) -> List[Question]:
        """Get questions for a sub-skill within a difficulty range, excluding asked."""
        candidates = self._question_bank.get(subskill, [])
        return [
            q for q in candidates
            if q.question_id not in self._all_asked_question_ids
            and difficulty_range[0] <= q.difficulty <= difficulty_range[1]
        ]

    def _get_any_candidates(
        self,
        difficulty_range: Tuple[float, float] = (0.1, 1.0),
    ) -> List[Question]:
        """Get any unseen question across all sub-skills within difficulty range."""
        all_qs = []
        for questions in self._question_bank.values():
            all_qs.extend(questions)
        return [
            q for q in all_qs
            if q.question_id not in self._all_asked_question_ids
            and difficulty_range[0] <= q.difficulty <= difficulty_range[1]
        ]

    def _pick_best_information(
        self, candidates: List[Question], theta: float
    ) -> Optional[Question]:
        """
        Pick the candidate that maximizes Fisher information at theta.
        Falls back to random if no candidates match exactly.
        """
        if not candidates:
            return None

        def information(q: Question) -> float:
            p = self._irt_3pl_probability(theta, q.difficulty, q.discrimination, q.guess_prob)
            if p <= 0.0 or p >= 1.0:
                return 0.0
            d = 1.0 - p
            return (q.discrimination ** 2) * p * d * (
                (1.0 - q.guess_prob) / (1.0 - q.guess_prob * (1.0 - p))
            ) ** 2 if q.guess_prob < 1.0 else (q.discrimination ** 2) * p * d

        best = max(candidates, key=information)
        return best

    # ------------------------------------------------------------------
    # IRT mathematics
    # ------------------------------------------------------------------

    @staticmethod
    def _irt_3pl_probability(
        theta: float,
        difficulty: float,
        discrimination: float,
        guess_prob: float,
        slip_prob: float = 0.0,
    ) -> float:
        """
        3-Parameter Logistic model: P(correct|theta) = c + (1-c) * sigmoid(a*(theta-b))
        Optionally adjusts for slip.
        """
        try:
            exponent = discrimination * (theta - difficulty)
            sigmoid = 1.0 / (1.0 + math.exp(-exponent))
            prob = guess_prob + (1.0 - guess_prob) * sigmoid
            # Adjust for slip: prob = p*(1-slip) + (1-p)*slip_guess_reduction
            prob = prob * (1.0 - slip_prob)
            return max(0.0, min(1.0, prob))
        except (OverflowError, ZeroDivisionError):
            if theta > difficulty:
                return 1.0 - guess_prob
            return guess_prob

    async def _update_theta(
        self,
        session: DiagnosticSession,
        response: ResponseRecord,
        current_theta: float,
    ) -> float:
        """
        Update the student's IRT ability estimate (theta) after a response.
        Uses a simplified E-step update or delegates to IRTModel if available.
        """
        if self._irt_model is not None and hasattr(self._irt_model, "update_theta"):
            try:
                result = self._irt_model.update_theta(
                    user_id=session.student_id,
                    question_id=response.question_id,
                    is_correct=response.is_correct,
                    current_theta=current_theta,
                )
                if isinstance(result, dict):
                    return float(result.get("new_theta", current_theta))
                if isinstance(result, (int, float)):
                    return float(result)
            except Exception as exc:
                logger.warning("IRTModel theta update failed: %s", exc)

        # Fallback: simple Newton-Raphson style update
        new_theta = self._irt_update_simple(
            current_theta, response
        )
        # Clamp to valid range
        return max(-3.0, min(3.0, new_theta))

    def _irt_update_simple(
        self, theta: float, response: ResponseRecord
    ) -> float:
        """
        Simplified IRT theta update using a gradient step.
        For the 2PL model: d(log L)/d(theta) = a * (y - p)
        where y is 1 for correct, 0 for incorrect, and p is P(correct|theta).
        """
        a = 1.0  # discrimination (default)
        b = response.difficulty
        c = 0.25  # guess probability
        y = 1.0 if response.is_correct else 0.0
        p = self._irt_3pl_probability(theta, b, a, c)
        if p <= 0.0 or p >= 1.0:
            return theta
        gradient = a * (y - p)
        lr = 0.3
        return theta + lr * gradient

    # ------------------------------------------------------------------
    # Asking a question (simulated or real)
    # ------------------------------------------------------------------

    async def _ask_question(
        self, session: DiagnosticSession, question: Question
    ) -> ResponseRecord:
        """
        Present a question to the student and record the response.

        In a production system this would return a Future that resolves when
        the student submits an answer. For the engine we support two modes:
          1. If an `answer_callback` is provided in metadata, call it.
          2. Otherwise simulate a response based on IRT probability.
        """
        start_time = time.time()
        callback = session.metadata.get("answer_callback")
        is_correct = False
        selected_answer = ""
        hint_used = False

        if callback is not None:
            try:
                if asyncio.iscoroutinefunction(callback):
                    result = await asyncio.wait_for(
                        callback(question), timeout=self.question_timeout
                    )
                else:
                    loop = asyncio.get_event_loop()
                    result = await asyncio.wait_for(
                        loop.run_in_executor(None, callback, question),
                        timeout=self.question_timeout,
                    )
                if isinstance(result, dict):
                    is_correct = bool(result.get("is_correct", False))
                    selected_answer = str(result.get("selected_answer", ""))
                    hint_used = bool(result.get("hint_used", False))
                elif isinstance(result, bool):
                    is_correct = result
            except asyncio.TimeoutError:
                logger.warning(
                    "Question %s timed out after %.1fs",
                    question.question_id, self.question_timeout,
                )
                is_correct = False
            except Exception as exc:
                logger.error("Answer callback error: %s", exc)
                is_correct = False
        else:
            # Simulate: answer correctly with IRT probability
            prob = self._irt_3pl_probability(
                session.current_theta,
                question.difficulty,
                question.discrimination,
                question.guess_prob,
                question.slip_prob,
            )
            is_correct = random.random() < prob
            selected_answer = question.correct_answer if is_correct else "wrong"

        elapsed = time.time() - start_time
        return ResponseRecord(
            question_id=question.question_id,
            node_id=question.node_id,
            subskill=question.subskill,
            is_correct=is_correct,
            time_seconds=round(elapsed, 2),
            difficulty=question.difficulty,
            selected_answer=selected_answer,
            hint_used=hint_used,
        )

    # ------------------------------------------------------------------
    # Sub-skill scoring
    # ------------------------------------------------------------------

    def _compute_subskill_scores(
        self, session: DiagnosticSession
    ) -> Dict[str, float]:
        """
        Compute a mastery score (0.0 to 1.0) for each sub-skill based on
        the responses collected so far.
        """
        scores: Dict[str, List[Tuple[bool, float]]] = defaultdict(list)
        for r in session.responses:
            scores[r.subskill].append((r.is_correct, r.difficulty))

        result = {}
        for subskill, items in scores.items():
            if not items:
                result[subskill] = 0.5
                continue
            # Weighted accuracy: harder questions count more
            total_weight = sum(d for _, d in items)
            if total_weight > 0:
                weighted_score = sum(
                    (1.0 if correct else 0.0) * (d + 0.5)
                    for correct, d in items
                ) / sum(d + 0.5 for _, d in items)
            else:
                weighted_score = sum(1.0 if c else 0.0 for c, _ in items) / len(items)
            result[subskill] = max(0.0, min(1.0, weighted_score))

        # Include sub-skills not yet tested
        for subskill in SUBSKILLS_ORDERED:
            if subskill not in result:
                result[subskill] = 0.5

        return result

    def _dont_revisit(self, session: DiagnosticSession) -> set:
        """Sub-skills that should not be revisited (already confirmed)."""
        return set()

    def _check_complete_coverage(self, session: DiagnosticSession) -> bool:
        """
        Check if all sub-skills have been assessed enough.
        Early stop when all skills have at least 2 data points.
        """
        subskill_scores = self._compute_subskill_scores(session)
        tested = [s for s in SUBSKILLS_ORDERED if s in subskill_scores]
        if len(tested) < len(SUBSKILLS_ORDERED):
            return False
        return all(
            session.subskill_coverage.get(s, 0) >= 2
            for s in SUBSKILLS_ORDERED
        )

    # ------------------------------------------------------------------
    # Gap classification
    # ------------------------------------------------------------------

    async def _classify_gap(
        self, subskill: str, responses: List[ResponseRecord]
    ) -> Tuple[GapType, GapSeverity, str]:
        """
        Classify the type of gap for a sub-skill based on response patterns.

        Uses a combination of:
          1. Response time analysis (slow => conceptual or procedural)
          2. Keyword heuristics (if response text is available)
          3. LLM classification (if available)
          4. Fallback rule-based classification
        """
        subskill_responses = [r for r in responses if r.subskill == subskill]

        if not subskill_responses:
            return GapType.NONE, GapSeverity.MINOR, "Insufficient data"

        correct_count = sum(1 for r in subskill_responses if r.is_correct)
        total_count = len(subskill_responses)
        accuracy = correct_count / total_count
        avg_time = sum(r.time_seconds for r in subskill_responses) / total_count

        # Try LLM-based classification if available
        if self._llm_client is not None and hasattr(self._llm_client, "classify_gap"):
            try:
                llm_result = await self._llm_classify_gap(
                    subskill, subskill_responses
                )
                if llm_result:
                    return llm_result
            except Exception as exc:
                logger.warning("LLM gap classification failed: %s", exc)

        # Rule-based classification
        return self._rule_based_gap_classification(
            subskill, subskill_responses, accuracy, avg_time
        )

    async def _llm_classify_gap(
        self, subskill: str, responses: List[ResponseRecord]
    ) -> Optional[Tuple[GapType, GapSeverity, str]]:
        """Delegate gap classification to the LLM client."""
        if self._llm_client is None:
            return None
        try:
            if hasattr(self._llm_client, "classify_misconception"):
                result = await self._llm_client.classify_misconception(
                    subskill=subskill,
                    responses=[r.to_dict() for r in responses],
                )
                if isinstance(result, dict):
                    gap_type = GapType(result.get("gap_type", "none"))
                    severity = GapSeverity(result.get("severity", "moderate"))
                    label = str(result.get("label", ""))
                    return (gap_type, severity, label)
        except Exception as exc:
            logger.warning("LLM classification error: %s", exc)
        return None

    def _rule_based_gap_classification(
        self,
        subskill: str,
        responses: List[ResponseRecord],
        accuracy: float,
        avg_time: float,
    ) -> Tuple[GapType, GapSeverity, str]:
        """
        Rule-based gap classification using response patterns.

        Logic:
          - Accuracy < 0.4 AND avg_time > 30s => concept gap (struggling to understand)
          - Accuracy < 0.4 AND avg_time <= 30s => procedural gap (knows concept, bad setup)
          - Accuracy 0.4-0.7 AND avg_time > 20s => procedural gap
          - Accuracy > 0.7 BUT occasional errors => computation gap
          - Accuracy >= 0.8 => no gap
        """
        if accuracy >= 0.8:
            return GapType.NONE, GapSeverity.MINOR, "Mastered"

        if accuracy < 0.4:
            if avg_time > 30.0:
                return (
                    GapType.CONCEPT,
                    GapSeverity.CRITICAL,
                    self._match_misconception(subskill, responses, "concept"),
                )
            return (
                GapType.PROCEDURAL,
                GapSeverity.CRITICAL,
                self._match_misconception(subskill, responses, "procedural"),
            )

        if 0.4 <= accuracy < 0.7:
            if avg_time > 25.0:
                return (
                    GapType.PROCEDURAL,
                    GapSeverity.MODERATE,
                    self._match_misconception(subskill, responses, "procedural"),
                )
            return (
                GapType.COMPUTATION,
                GapSeverity.MODERATE,
                self._match_misconception(subskill, responses, "computation"),
            )

        # accuracy 0.7 - 0.8
        return (
            GapType.COMPUTATION,
            GapSeverity.MINOR,
            self._match_misconception(subskill, responses, "computation"),
        )

    def _match_misconception(
        self, subskill: str, responses: List[ResponseRecord], gap_hint: str
    ) -> str:
        """Match responses against known misconception patterns."""
        patterns = MISCONCEPTION_PATTERNS.get(subskill, [])
        if not patterns:
            return f"Difficulty with {subskill} ({gap_hint} gap)"

        # Build text from response data
        combined_text = " ".join(
            r.selected_answer for r in responses
        ).lower()

        for pattern in patterns:
            keywords = pattern.get("keywords", [])
            if any(kw in combined_text for kw in keywords):
                return pattern["label"]

        # Return the first pattern's label as default
        return patterns[0].get("label", f"Difficulty with {subskill}")

    # ------------------------------------------------------------------
    # Remediation builder
    # ------------------------------------------------------------------

    async def _build_remediation(
        self, gaps: List[SubskillResult], mastery: Dict[str, float]
    ) -> RemediationPath:
        """
        Build a remediation path for the diagnosed gaps.

        Remediation mapping:
          - Concept gap  -> review_prerequisite + guided_examples
          - Procedural gap -> guided_examples + step_solver
          - Computation gap -> step_solver + guided_examples
        """
        steps: List[RemediationStep] = []
        total_minutes = 0
        priority_order: List[str] = []

        # Sort gaps by severity (critical first)
        severity_order = {"critical": 0, "moderate": 1, "minor": 2}
        sorted_gaps = sorted(
            gaps,
            key=lambda g: (
                severity_order.get(g.gap_severity.value, 9),
                g.subskill,
            ),
        )

        for gap in sorted_gaps:
            if gap.gap_type == GapType.NONE:
                continue

            priority_order.append(gap.subskill)
            step_num = len(steps) + 1

            # Get prerequisite if any
            prereq = PREREQUISITE_MAP.get(gap.subskill, "")

            if gap.gap_type == GapType.CONCEPT:
                # Concept gap: start with prerequisite review
                if prereq and mastery.get(prereq, 0.5) < 0.6:
                    minutes = REMEDIATION_MINUTES["review_prerequisite"]
                    steps.append(RemediationStep(
                        step_number=step_num,
                        subskill=gap.subskill,
                        action_type="review_prerequisite",
                        description=REMEDIATION_TEMPLATES["concept"][
                            "review_prerequisite"
                        ].format(prereq=prereq),
                        estimated_minutes=minutes,
                        prerequisite_node=prereq,
                        difficulty_level="easy",
                    ))
                    total_minutes += minutes
                    step_num += 1

                minutes = REMEDIATION_MINUTES["guided_examples"]
                steps.append(RemediationStep(
                    step_number=step_num,
                    subskill=gap.subskill,
                    action_type="guided_examples",
                    description=REMEDIATION_TEMPLATES["concept"][
                        "guided_examples"
                    ],
                    estimated_minutes=minutes,
                    difficulty_level="medium",
                ))
                total_minutes += minutes

            elif gap.gap_type == GapType.PROCEDURAL:
                minutes = REMEDIATION_MINUTES["guided_examples"]
                steps.append(RemediationStep(
                    step_number=step_num,
                    subskill=gap.subskill,
                    action_type="guided_examples",
                    description=REMEDIATION_TEMPLATES["procedural"][
                        "guided_examples"
                    ],
                    estimated_minutes=minutes,
                    difficulty_level="medium",
                ))
                total_minutes += minutes
                step_num += 1

                minutes = REMEDIATION_MINUTES["step_solver"]
                steps.append(RemediationStep(
                    step_number=step_num,
                    subskill=gap.subskill,
                    action_type="step_solver",
                    description=REMEDIATION_TEMPLATES["procedural"][
                        "step_solver"
                    ],
                    estimated_minutes=minutes,
                    difficulty_level="easy",
                ))
                total_minutes += minutes

            elif gap.gap_type == GapType.COMPUTATION:
                minutes = REMEDIATION_MINUTES["step_solver"]
                steps.append(RemediationStep(
                    step_number=step_num,
                    subskill=gap.subskill,
                    action_type="step_solver",
                    description=REMEDIATION_TEMPLATES["computation"][
                        "step_solver"
                    ],
                    estimated_minutes=minutes,
                    difficulty_level="easy",
                ))
                total_minutes += minutes
                step_num += 1

                minutes = REMEDIATION_MINUTES["guided_examples"]
                steps.append(RemediationStep(
                    step_number=step_num,
                    subskill=gap.subskill,
                    action_type="guided_examples",
                    description=REMEDIATION_TEMPLATES["computation"][
                        "guided_examples"
                    ],
                    estimated_minutes=minutes,
                    difficulty_level="medium",
                ))
                total_minutes += minutes

        return RemediationPath(
            gaps=gaps,
            steps=steps,
            estimated_total_minutes=total_minutes,
            priority_order=priority_order,
        )

    # ------------------------------------------------------------------
    # Report generation
    # ------------------------------------------------------------------

    async def _generate_report(
        self, session: DiagnosticSession
    ) -> DiagnosticReport:
        """
        Generate the final diagnostic report from a completed session.
        """
        # Compute per-sub-skill results
        subskill_scores = self._compute_subskill_scores(session)
        subskill_results: List[SubskillResult] = []

        for subskill in SUBSKILLS_ORDERED:
            responses_for = [r for r in session.responses if r.subskill == subskill]
            questions_asked = len(responses_for)
            correct_count = sum(1 for r in responses_for if r.is_correct)
            avg_diff = (
                sum(r.difficulty for r in responses_for) / questions_asked
                if questions_asked > 0
                else 0.0
            )
            avg_time = (
                sum(r.time_seconds for r in responses_for) / questions_asked
                if questions_asked > 0
                else 0.0
            )

            # Mastery from BKT if available
            mastery_prob = subskill_scores.get(subskill, 0.5)
            theta_est = session.current_theta

            gap_type, gap_severity, misconception = (
                await self._classify_gap(subskill, session.responses)
            )

            subskill_results.append(SubskillResult(
                subskill=subskill,
                questions_asked=questions_asked,
                correct_count=correct_count,
                mastery_probability=mastery_prob,
                avg_difficulty=avg_diff,
                avg_response_time=avg_time,
                gap_type=gap_type,
                gap_severity=gap_severity,
                misconception_label=misconception,
                theta_estimate=theta_est,
            ))

        # Identify strong and weak areas
        strong_areas = [
            r.subskill for r in subskill_results
            if r.mastery_probability >= 0.7 and r.gap_type == GapType.NONE
        ]
        weak_areas = [
            r.subskill for r in subskill_results
            if r.gap_type != GapType.NONE and r.gap_severity in (
                GapSeverity.CRITICAL, GapSeverity.MODERATE
            )
        ]

        # Overall mastery
        overall_mastery = (
            sum(r.mastery_probability for r in subskill_results)
            / len(subskill_results)
            if subskill_results
            else 0.0
        )

        # Build remediation
        gaps_for_remediation = [
            r for r in subskill_results if r.gap_type != GapType.NONE
        ]
        remediation = await self._build_remediation(
            gaps_for_remediation, subskill_scores
        )

        # Diagnostic summary
        summary = self._build_summary(
            session, subskill_results, strong_areas, weak_areas, overall_mastery
        )

        return DiagnosticReport(
            session=session,
            subskill_results=subskill_results,
            remediation=remediation,
            strong_areas=strong_areas,
            weak_areas=weak_areas,
            overall_mastery=overall_mastery,
            diagnostic_summary=summary,
        )

    def _build_summary(
        self,
        session: DiagnosticSession,
        results: List[SubskillResult],
        strong: List[str],
        weak: List[str],
        overall: float,
    ) -> str:
        """Build a human-readable diagnostic summary."""
        parts = []
        parts.append(
            f"Diagnostic complete. {session.questions_asked} questions asked "
            f"in {session.elapsed_seconds:.1f}s."
        )
        parts.append(f"Overall mastery: {overall*100:.1f}%.")

        if strong:
            parts.append(
                "Strong areas: " + ", ".join(strong) + "."
            )
        if weak:
            parts.append(
                "Weak areas: " + ", ".join(weak) + "."
            )

        gap_breakdown: Dict[GapType, int] = defaultdict(int)
        for r in results:
            if r.gap_type != GapType.NONE:
                gap_breakdown[r.gap_type] += 1

        if gap_breakdown:
            parts.append(
                "Gap breakdown: " +
                ", ".join(
                    f"{gt.value} ({count})"
                    for gt, count in sorted(gap_breakdown.items())
                )
                + "."
            )

        return " ".join(parts)

    # ------------------------------------------------------------------
    # Analytics logging
    # ------------------------------------------------------------------

    def _log_analytics(self, session: DiagnosticSession, response: ResponseRecord) -> None:
        """Log diagnostic session data for analytics."""
        entry = {
            "session_id": session.session_id,
            "student_id": session.student_id,
            "question_number": session.questions_asked,
            "question_id": response.question_id,
            "subskill": response.subskill,
            "is_correct": response.is_correct,
            "time_seconds": response.time_seconds,
            "difficulty": response.difficulty,
            "theta": round(session.current_theta, 4),
            "phase": session.phase.value,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
        self._analytics_log.append(entry)
        logger.debug("Analytics: %s", json.dumps(entry))

    def get_analytics_log(self) -> List[dict]:
        """Return the analytics log for this engine instance."""
        return list(self._analytics_log)

    def clear_analytics_log(self) -> None:
        """Clear the analytics log."""
        self._analytics_log.clear()

    # ------------------------------------------------------------------
    # Utilities
    # ------------------------------------------------------------------

    @staticmethod
    def _generate_session_id() -> str:
        """Generate a unique session identifier."""
        raw = f"{uuid.uuid4().hex}{time.time()}"
        return hashlib.sha256(raw.encode()).hexdigest()[:16]


# ---------------------------------------------------------------------------
# Demonstration
# ---------------------------------------------------------------------------

async def _mock_answer_callback(question: Question) -> dict:
    """
    Simulate a student answering a question.
    Uses IRT 3PL to determine correctness, then returns a response dict.
    """
    # Random theta between -1.5 and 1.5 (simulating varied student abilities)
    student_theta = -0.8  # below-average student for demo
    engine = DiagnosticEngine()
    prob = engine._irt_3pl_probability(
        student_theta,
        question.difficulty,
        question.discrimination,
        question.guess_prob,
        question.slip_prob,
    )
    is_correct = random.random() < prob
    return {
        "is_correct": is_correct,
        "selected_answer": question.correct_answer if is_correct else "wrong_option",
        "hint_used": False,
    }


async def main() -> None:
    """Demonstrate the diagnostic engine with mock data."""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
    )

    engine = DiagnosticEngine(max_questions=15)

    # Provide a mock answer callback so we don't need a real student interface
    session = DiagnosticSession(
        session_id="demo_" + uuid.uuid4().hex[:8],
        student_id="student_001",
        subject="mathematics",
        class_level="11",
        topic="derivatives",
        phase=PhaseType.BASELINE,
        questions_asked=0,
        max_questions=15,
        metadata={"answer_callback": _mock_answer_callback},
    )

    # Load mock question bank
    engine._generate_mock_question_bank("mathematics", "11")
    engine._question_bank.setdefault("limit_concept", []).append(Question(
        question_id="q_limit_01",
        node_id="limit_concept",
        subskill="limit_concept",
        difficulty=0.35,
        discrimination=1.0,
        guess_prob=0.25,
        slip_prob=0.1,
        text="What is lim(x->2) (x^2 - 4)/(x - 2)?",
        options=["0", "2", "4", "undefined"],
        correct_answer="4",
    ))
    engine._question_bank.setdefault("limit_concept", []).append(Question(
        question_id="q_limit_02",
        node_id="limit_concept",
        subskill="limit_concept",
        difficulty=0.55,
        discrimination=1.0,
        guess_prob=0.25,
        slip_prob=0.1,
        text="Evaluate lim(x->0) sin(x)/x.",
        options=["0", "1", "undefined", "infinity"],
        correct_answer="1",
    ))
    engine._question_bank.setdefault("function_composition", []).append(Question(
        question_id="q_comp_01",
        node_id="function_composition",
        subskill="function_composition",
        difficulty=0.4,
        discrimination=1.0,
        guess_prob=0.25,
        slip_prob=0.1,
        text="Find (f o g)(x) where f(x)=x^2, g(x)=x+1.",
        options=["(x+1)^2", "x^2+1", "x^2+x", "x+1"],
        correct_answer="(x+1)^2",
    ))
    engine._question_bank.setdefault("chain_rule", []).append(Question(
        question_id="q_chain_01",
        node_id="chain_rule",
        subskill="chain_rule",
        difficulty=0.5,
        discrimination=1.0,
        guess_prob=0.25,
        slip_prob=0.1,
        text="d/dx[sin(3x)] = ?",
        options=["3cos(3x)", "cos(3x)", "3sin(3x)", "cos(x)"],
        correct_answer="3cos(3x)",
    ))
    engine._question_bank.setdefault("product_rule", []).append(Question(
        question_id="q_prod_01",
        node_id="product_rule",
        subskill="product_rule",
        difficulty=0.55,
        discrimination=1.0,
        guess_prob=0.25,
        slip_prob=0.1,
        text="d/dx[x*sin(x)] = ?",
        options=["sin(x)+x*cos(x)", "cos(x)", "sin(x)*cos(x)", "x*sin(x)"],
        correct_answer="sin(x)+x*cos(x)",
    ))
    engine._question_bank.setdefault("quotient_rule", []).append(Question(
        question_id="q_quot_01",
        node_id="quotient_rule",
        subskill="quotient_rule",
        difficulty=0.6,
        discrimination=1.0,
        guess_prob=0.25,
        slip_prob=0.1,
        text="d/dx[x/(x+1)] = ?",
        options=["1/(x+1)^2", "(x+1-x)/(x+1)^2", "1/(x+1)", "x/(x+1)^2"],
        correct_answer="1/(x+1)^2",
    ))

    print("=" * 60)
    print("CISCE Adaptive Diagnostic Engine - Demonstration")
    print("=" * 60)
    print()

    # Run the diagnostic
    report = await engine.run_diagnostic(
        student_id="student_001",
        subject="mathematics",
        class_level="11",
        topic="derivatives",
    )

    print(f"Session ID   : {report.session.session_id}")
    print(f"Student ID   : {report.session.student_id}")
    print(f"Subject      : {report.session.subject} (Class {report.session.class_level})")
    print(f"Phase        : {report.session.phase.value}")
    print(f"Questions    : {report.session.questions_asked}")
    print(f"Elapsed      : {report.session.elapsed_seconds:.2f}s")
    print(f"Stopped early: {report.session.stopped_early}")
    if report.session.stop_reason:
        print(f"Stop reason  : {report.session.stop_reason}")
    print()

    print("-" * 60)
    print("SUB-SKILL RESULTS")
    print("-" * 60)
    for result in report.subskill_results:
        status = "MASTERED" if result.gap_type == GapType.NONE else f"GAP: {result.gap_type.value.upper()}"
        print(
            f"  {result.subskill:<25s} | "
            f"acc={result.accuracy:5.1%} | "
            f"mastery={result.mastery_probability:5.1%} | "
            f"theta={result.theta_estimate:+.2f} | "
            f"{status}"
        )
    print()

    print("-" * 60)
    print("STRONG & WEAK AREAS")
    print("-" * 60)
    print(f"  Strong: {', '.join(report.strong_areas) if report.strong_areas else 'None'}")
    print(f"  Weak  : {', '.join(report.weak_areas) if report.weak_areas else 'None'}")
    print(f"  Overall Mastery: {report.overall_mastery:.1%}")
    print()

    print("-" * 60)
    print("REMEDIATION PATH")
    print("-" * 60)
    for step in report.remediation.steps:
        print(
            f"  Step {step.step_number}: [{step.action_type}] {step.subskill}"
        )
        print(f"    {step.description}")
        print(f"    Est. {step.estimated_minutes} min | Level: {step.difficulty_level}")
    print(f"  Total estimated time: {report.remediation.estimated_total_minutes} minutes")
    print()

    print("-" * 60)
    print("DIAGNOSTIC SUMMARY")
    print("-" * 60)
    print(f"  {report.diagnostic_summary}")
    print()

    print("-" * 60)
    print("FULL REPORT (JSON)")
    print("-" * 60)
    print(report.to_json())
    print()

    print("=" * 60)
    print("Analytics log entries:", len(engine.get_analytics_log()))
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())