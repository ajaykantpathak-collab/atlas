"""Unified knowledge tracing engine — BKT + IRT + AFM.

Combines three models into a single adaptive mastery tracking system:

1. BKT (Bayesian Knowledge Tracing):
   - Per-node mastery probability (existing logic, preserved)
   - Updates p_known after each answer using Bayes' rule
   - Good for: "Has the student learned this concept?"

2. IRT (Item Response Theory):
   - Per-question pass probability given student ability
   - 3-Parameter Logistic model: P(correct|theta) = c + (1-c) * sigmoid(a*(theta-b))
   - Good for: "Will the student get this specific question right?"

3. AFM (Additive Factor Model):
   - Adaptive learning rate based on student history
   - p_transit increases for fast learners, decreases for struggling ones
   - Good for: "How quickly will this student learn the next concept?"

Integration:
   - BKT tracks per-node mastery (existing behavior, preserved)
   - IRT estimates student ability (theta) from question performance
   - AFM adjusts BKT's p_transit based on learning rate
   - Combined: more accurate mastery estimates + personalized learning speed

Usage:
    from backend.its.diagnosis.knowledge_tracing import KnowledgeTracingEngine

    engine = KnowledgeTracingEngine()

    # Update mastery after a question
    result = await engine.update_mastery(
        db=db,
        user_id=user_id,
        node_id=node_id,
        question_id=question_id,
        is_correct=True,
    )
    # result = {
    #     "mastery_probability": 0.75,
    #     "student_theta": 0.5,
    #     "p_transit": 0.15,  # adjusted by AFM
    #     "irt_pass_probability": 0.82,
    #     "method": "bkt_irt_afm",
    # }

    # Predict performance on a question
    pred = await engine.predict_performance(
        db=db,
        user_id=user_id,
        question_id=question_id,
    )
    # pred = {"pass_probability": 0.82, "method": "irt_3pl"}
"""

import math
from dataclasses import dataclass, field
from typing import Optional
from datetime import datetime, timezone


# Lazy imports — these are only needed when the engine is used with a DB session
# This allows the IRT/AFM/BKT models to be tested independently
def _get_db_imports():
    from sqlalchemy import select
    from sqlalchemy.ext.asyncio import AsyncSession
    from backend.models.enrichment import BoardQuestion
    from backend.models.progress import MasteryRecord
    return select, AsyncSession, BoardQuestion, MasteryRecord


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

@dataclass
class MasteryUpdateResult:
    """Result of a mastery update."""
    mastery_probability: float
    student_theta: float
    p_transit: float
    p_known: float
    irt_pass_probability: float
    attempts: int
    success_count: int
    failure_count: int
    method: str


@dataclass
class PerformancePrediction:
    """Prediction of student performance on a question."""
    pass_probability: float
    student_theta: float
    question_difficulty: float
    method: str


# ---------------------------------------------------------------------------
# IRT (Item Response Theory) — 3-Parameter Logistic Model
# ---------------------------------------------------------------------------

class IRTModel:
    """3-Parameter Logistic IRT model.

    P(correct | theta) = c + (1 - c) * 1 / (1 + exp(-a * (theta - b)))

    Where:
      theta: student ability (-3 to +3)
      b: item difficulty (-3 easy to +3 hard)
      a: item discrimination (0 to 2)
      c: guessing parameter (0 to 0.25)
    """

    @staticmethod
    def sigmoid(x: float) -> float:
        """Numerically stable sigmoid function."""
        if x >= 0:
            return 1.0 / (1.0 + math.exp(-x))
        else:
            exp_x = math.exp(x)
            return exp_x / (1.0 + exp_x)

    @staticmethod
    def pass_probability(
        theta: float,
        difficulty_b: float,
        discrimination_a: float,
        guessing_c: float,
    ) -> float:
        """Compute P(correct | theta) using 3PL model."""
        # Clamp parameters to valid ranges
        theta = max(-3.0, min(3.0, theta))
        b = max(-3.0, min(3.0, difficulty_b))
        a = max(0.0, min(2.0, discrimination_a))
        c = max(0.0, min(0.5, guessing_c))

        z = a * (theta - b)
        p = c + (1.0 - c) * IRTModel.sigmoid(z)
        return max(0.0, min(1.0, p))

    @staticmethod
    def update_theta(
        current_theta: float,
        difficulty_b: float,
        discrimination_a: float,
        guessing_c: float,
        is_correct: bool,
        learning_rate: float = 0.1,
    ) -> float:
        """Update student ability (theta) after an observation.

        Uses a simple gradient ascent on the log-likelihood.
        """
        theta = current_theta

        # Compute current prediction
        p_correct = IRTModel.pass_probability(theta, difficulty_b, discrimination_a, guessing_c)

        # Gradient of log-likelihood w.r.t. theta
        # For 3PL: d/dtheta log P(correct) = a * (1 - c) * sigmoid(z) * (1 - sigmoid(z)) * (obs - p) / p
        # Simplified: gradient ∝ a * (obs - p)
        if is_correct:
            gradient = discrimination_a * (1.0 - guessing_c) * (1.0 - p_correct)
        else:
            gradient = -discrimination_a * (1.0 - guessing_c) * p_correct

        # Update theta with learning rate
        new_theta = theta + learning_rate * gradient

        # Clamp to valid range
        return max(-3.0, min(3.0, new_theta))


# ---------------------------------------------------------------------------
# AFM (Additive Factor Model) — Adaptive Learning Rate
# ---------------------------------------------------------------------------

class AFMModel:
    """Additive Factor Model for adaptive learning rates.

    Adjusts BKT's p_transit based on student learning history:
      - Fast learners (high success rate) → higher p_transit (learn faster)
      - Struggling learners (low success rate) → lower p_transit (need more practice)

    The learning rate is updated after each observation:
      - Success: learning_rate *= (1 + alpha)  [increase slightly]
      - Failure: learning_rate *= (1 - alpha)  [decrease slightly]

    Where alpha is a small step size (default 0.05).
    """

    # AFM parameters
    ALPHA = 0.05          # Step size for learning rate adjustment
    MIN_P_TRANSIT = 0.02  # Minimum p_transit (don't give up entirely)
    MAX_P_TRANSIT = 0.30  # Maximum p_transit (don't learn too fast)
    DEFAULT_P_TRANSIT = 0.10  # Default starting p_transit

    @staticmethod
    def update_p_transit(
        current_p_transit: float,
        success_count: int,
        failure_count: int,
        is_correct: bool,
    ) -> float:
        """Update p_transit based on learning history.

        Args:
            current_p_transit: Current p_transit value.
            success_count: Total successes so far.
            failure_count: Total failures so far.
            is_correct: Whether the latest attempt was correct.

        Returns:
            Updated p_transit value.
        """
        p_transit = current_p_transit

        # Adjust based on latest observation
        if is_correct:
            p_transit *= (1.0 + AFMModel.ALPHA)
        else:
            p_transit *= (1.0 - AFMModel.ALPHA)

        # Also adjust based on overall success rate
        total = success_count + failure_count
        if total > 0:
            success_rate = success_count / total
            # Blend individual adjustment with overall rate
            target_transit = AFMModel.DEFAULT_P_TRANSIT * (0.5 + success_rate)
            p_transit = 0.7 * p_transit + 0.3 * target_transit

        # Clamp to valid range
        return max(AFMModel.MIN_P_TRANSIT, min(AFMModel.MAX_P_TRANSIT, p_transit))

    @staticmethod
    def initial_p_transit() -> float:
        """Get initial p_transit for a new student."""
        return AFMModel.DEFAULT_P_TRANSIT


# ---------------------------------------------------------------------------
# BKT (Bayesian Knowledge Tracing) — preserved from existing logic
# ---------------------------------------------------------------------------

class BKTModel:
    """Bayesian Knowledge Tracing model.

    Updates p_known (probability that the student has learned the concept)
    after each observation using Bayes' rule.

    Standard BKT parameters:
      p_known: probability student has learned the concept (0 to 1)
      p_transit: probability of learning per opportunity (default 0.1)
      p_slip: probability of incorrect answer despite knowing (default 0.1)
      p_guess: probability of correct answer despite not knowing (default 0.2)
    """

    DEFAULT_P_TRANSIT = 0.1
    DEFAULT_P_SLIP = 0.1
    DEFAULT_P_GUESS = 0.2

    @staticmethod
    def update_p_known(
        p_known: float,
        p_transit: float,
        p_slip: float,
        p_guess: float,
        is_correct: bool,
    ) -> float:
        """Update p_known after an observation using Bayes' rule.

        Step 1: Posterior given observation
          If correct: p(known|correct) = p(known) * (1 - p_slip) /
                      (p(known) * (1 - p_slip) + (1 - p(known)) * p_guess)
          If wrong:  p(known|wrong) = p(known) * p_slip /
                     (p(known) * p_slip + (1 - p(known)) * (1 - p_guess))

        Step 2: Learning transition
          p(known) = p(known|obs) + (1 - p(known|obs)) * p_transit
        """
        # Step 1: Posterior given observation
        if is_correct:
            p_known_given_obs = (p_known * (1 - p_slip)) / (
                p_known * (1 - p_slip) + (1 - p_known) * p_guess + 1e-10
            )
        else:
            p_known_given_obs = (p_known * p_slip) / (
                p_known * p_slip + (1 - p_known) * (1 - p_guess) + 1e-10
            )

        # Step 2: Learning transition
        new_p_known = p_known_given_obs + (1 - p_known_given_obs) * p_transit

        # Clamp to [0, 1]
        return max(0.0, min(1.0, new_p_known))


# ---------------------------------------------------------------------------
# Unified Knowledge Tracing Engine
# ---------------------------------------------------------------------------

class KnowledgeTracingEngine:
    """Unified knowledge tracing engine combining BKT + IRT + AFM.

    This engine integrates three models:
      1. BKT: tracks per-node mastery probability (existing behavior)
      2. IRT: estimates student ability (theta) from question performance
      3. AFM: adapts p_transit based on student learning rate

    The integration is additive — it enhances BKT with IRT-based ability
    estimation and AFM-based adaptive learning rates, without changing
    the core BKT mastery probability calculation.
    """

    # IRT learning rate for theta updates
    IRT_LEARNING_RATE = 0.1

    @staticmethod
    def bkt_update_offline(
        p_known: float,
        p_transit: float,
        is_correct: bool,
        success_count: int,
        failure_count: int,
        p_slip: float = BKTModel.DEFAULT_P_SLIP,
        p_guess: float = BKTModel.DEFAULT_P_GUESS,
    ) -> tuple:
        """Sync, DB-free BKT+AFM mastery update — the single textbook-
        correct implementation the live tutor path delegates to.

        This is the same model as :meth:`update_mastery` (AFM-adjusted
        p_transit feeding the Bayes-rule BKT update) minus the SQLAlchemy
        session, so callers without a database (the tutor-graph loop in
        backend/its/solver/tutor.py) share ONE mastery model with the
        practice path instead of a private EMA.

        Args:
            p_known: current mastery probability (the student's prior).
            p_transit: this (student, concept)'s current learning rate.
            is_correct: whether the latest attempt was correct.
            success_count: successes INCLUDING the current attempt.
            failure_count: failures INCLUDING the current attempt.
            p_slip / p_guess: standard BKT parameters.

        Returns:
            (new_p_known, new_p_transit) — both clamped to valid ranges.
        """
        new_p_transit = AFMModel.update_p_transit(
            current_p_transit=p_transit,
            success_count=success_count,
            failure_count=failure_count,
            is_correct=is_correct,
        )
        new_p_known = BKTModel.update_p_known(
            p_known=p_known,
            p_transit=new_p_transit,
            p_slip=p_slip,
            p_guess=p_guess,
            is_correct=is_correct,
        )
        return new_p_known, new_p_transit

    @staticmethod
    async def update_mastery(
        db,
        user_id: str,
        node_id: str,
        is_correct: bool,
        question_id: Optional[str] = None,
    ) -> MasteryUpdateResult:
        """Update mastery after a student answers a question.

        Combines BKT (mastery probability), IRT (ability estimation),
        and AFM (adaptive learning rate).

        Args:
            db: Database session.
            user_id: User ID.
            node_id: Curriculum node ID.
            is_correct: Whether the answer was correct.
            question_id: Optional question ID for IRT update.

        Returns:
            MasteryUpdateResult with updated parameters.
        """
        select, AsyncSession, BoardQuestion, MasteryRecord = _get_db_imports()

        # Get or create mastery record
        result = await db.execute(
            select(MasteryRecord).where(
                MasteryRecord.user_id == user_id,
                MasteryRecord.node_id == node_id,
            )
        )
        record = result.scalar_one_or_none()

        if record is None:
            record = MasteryRecord(
                user_id=user_id,
                node_id=node_id,
                mastery_probability=0.0,
                p_known=0.0,
                p_transit=AFMModel.initial_p_transit(),
                p_slip=BKTModel.DEFAULT_P_SLIP,
                p_guess=BKTModel.DEFAULT_P_GUESS,
                attempts=0,
                # New IRT/AFM fields
                student_theta=0.0,
                attempts_per_node=0,
                learning_rate_afm=AFMModel.DEFAULT_P_TRANSIT,
                success_count=0,
                failure_count=0,
            )
            db.add(record)

        # Get IRT parameters for the question (if provided)
        irt_b = 0.0
        irt_a = 1.0
        irt_c = 0.0
        if question_id:
            q_result = await db.execute(
                select(
                    BoardQuestion.difficulty_b,
                    BoardQuestion.discrimination_a,
                    BoardQuestion.guessing_c,
                ).where(BoardQuestion.id == question_id)
            )
            q_row = q_result.first()
            if q_row:
                irt_b = q_row[0] or 0.0
                irt_a = q_row[1] or 1.0
                irt_c = q_row[2] or 0.0

        # ── Step 1: IRT — Update student ability (theta) ──
        current_theta = record.student_theta or 0.0
        new_theta = IRTModel.update_theta(
            current_theta=current_theta,
            difficulty_b=irt_b,
            discrimination_a=irt_a,
            guessing_c=irt_c,
            is_correct=is_correct,
            learning_rate=KnowledgeTracingEngine.IRT_LEARNING_RATE,
        )

        # ── Step 2: AFM — Update p_transit based on learning history ──
        current_p_transit = record.p_transit or AFMModel.initial_p_transit()
        success_count = (record.success_count or 0) + (1 if is_correct else 0)
        failure_count = (record.failure_count or 0) + (0 if is_correct else 1)
        new_p_transit = AFMModel.update_p_transit(
            current_p_transit=current_p_transit,
            success_count=success_count,
            failure_count=failure_count,
            is_correct=is_correct,
        )

        # ── Step 3: BKT — Update mastery probability ──
        current_p_known = record.p_known or 0.0
        p_slip = record.p_slip or BKTModel.DEFAULT_P_SLIP
        p_guess = record.p_guess or BKTModel.DEFAULT_P_GUESS
        new_p_known = BKTModel.update_p_known(
            p_known=current_p_known,
            p_transit=new_p_transit,  # Use AFM-adjusted p_transit
            p_slip=p_slip,
            p_guess=p_guess,
            is_correct=is_correct,
        )

        # ── Step 4: Compute IRT pass probability for reporting ──
        irt_pass_prob = IRTModel.pass_probability(
            theta=new_theta,
            difficulty_b=irt_b,
            discrimination_a=irt_a,
            guessing_c=irt_c,
        )

        # ── Step 5: Update record ──
        record.p_known = new_p_known
        record.mastery_probability = new_p_known
        record.p_transit = new_p_transit
        record.attempts = (record.attempts or 0) + 1
        record.attempts_per_node = (record.attempts_per_node or 0) + 1
        record.student_theta = new_theta
        record.learning_rate_afm = new_p_transit
        record.success_count = success_count
        record.failure_count = failure_count
        record.last_attempt_at = datetime.now(timezone.utc)
        record.last_irt_update = datetime.now(timezone.utc)

        await db.flush()

        return MasteryUpdateResult(
            mastery_probability=new_p_known,
            student_theta=new_theta,
            p_transit=new_p_transit,
            p_known=new_p_known,
            irt_pass_probability=irt_pass_prob,
            attempts=record.attempts,
            success_count=success_count,
            failure_count=failure_count,
            method="bkt_irt_afm",
        )

    @staticmethod
    async def predict_performance(
        db,
        user_id: str,
        question_id: str,
    ) -> PerformancePrediction:
        """Predict student performance on a specific question.

        Uses IRT 3PL model with the student's current ability estimate.

        Args:
            db: Database session.
            user_id: User ID.
            question_id: Question ID.

        Returns:
            PerformancePrediction with pass probability.
        """
        select, AsyncSession, BoardQuestion, MasteryRecord = _get_db_imports()

        # Get question IRT parameters
        q_result = await db.execute(
            select(
                BoardQuestion.difficulty_b,
                BoardQuestion.discrimination_a,
                BoardQuestion.guessing_c,
                BoardQuestion.node_tags,
            ).where(BoardQuestion.id == question_id)
        )
        q_row = q_result.first()
        if not q_row:
            return PerformancePrediction(
                pass_probability=0.5,
                student_theta=0.0,
                question_difficulty=0.0,
                method="irt_3pl_cold_start",
            )

        irt_b = q_row[0] or 0.0
        irt_a = q_row[1] or 1.0
        irt_c = q_row[2] or 0.0
        node_tags = q_row[3] or []

        # Get student's theta from mastery record (use first node tag)
        student_theta = 0.0
        if node_tags and len(node_tags) > 0:
            node_id = node_tags[0]
            m_result = await db.execute(
                select(MasteryRecord.student_theta).where(
                    MasteryRecord.user_id == user_id,
                    MasteryRecord.node_id == node_id,
                )
            )
            m_row = m_result.first()
            if m_row:
                student_theta = m_row[0] or 0.0

        # Compute pass probability
        pass_prob = IRTModel.pass_probability(
            theta=student_theta,
            difficulty_b=irt_b,
            discrimination_a=irt_a,
            guessing_c=irt_c,
        )

        return PerformancePrediction(
            pass_probability=pass_prob,
            student_theta=student_theta,
            question_difficulty=irt_b,
            method="irt_3pl",
        )

    @staticmethod
    async def get_recommended_difficulty(
        db,
        user_id: str,
        node_id: str,
    ) -> float:
        """Get recommended question difficulty for a student on a node.

        Uses the student's current theta to recommend a difficulty level
        that maximizes learning (target ~70% pass rate).

        Args:
            db: Database session.
            user_id: User ID.
            node_id: Curriculum node ID.

        Returns:
            Recommended difficulty_b value (-3 to +3).
        """
        select, AsyncSession, BoardQuestion, MasteryRecord = _get_db_imports()

        # Get student's theta
        result = await db.execute(
            select(MasteryRecord.student_theta).where(
                MasteryRecord.user_id == user_id,
                MasteryRecord.node_id == node_id,
            )
        )
        row = result.first()
        theta = row[0] if row and row[0] is not None else 0.0

        # Target 70% pass rate: P(correct|theta) = 0.70
        # For standard discrimination a=1, c=0:
        # 0.70 = sigmoid(theta - b) → b = theta - logit(0.70) = theta - 0.847
        recommended_b = theta - 0.847

        # Clamp to valid range
        return max(-3.0, min(3.0, recommended_b))
