"""Progress service v2 — uses unified BKT + IRT + AFM knowledge tracing engine.

Replaces the BKT-only mastery update from dream_app's progress_service.py
with the unified KnowledgeTracingEngine that combines:
  - BKT: per-node mastery probability (preserved)
  - IRT: per-question pass probability + student ability estimation
  - AFM: adaptive learning rate based on student history

Key improvements over v1:
  - Student ability (theta) is tracked per node, not just mastery probability
  - Learning rate adapts to each student (fast learners get higher p_transit)
  - Question difficulty is considered when updating mastery
  - Performance predictions available for adaptive question selection
  - Recommended difficulty for personalized practice

The original progress_service.py is NOT modified. This is a new file in the
platform directory that can be used as a drop-in replacement.

Usage:
    from backend.services.progress_service_v2 import ProgressServiceV2

    # Update mastery after a question (drop-in replacement for v1)
    result = await ProgressServiceV2.update_mastery(
        db=db,
        user_id=user_id,
        node_id=node_id,
        is_correct=True,
        question_id=question_id,  # NEW: optional, enables IRT
    )

    # Predict performance on a question (NEW)
    pred = await ProgressServiceV2.predict_performance(
        db=db, user_id=user_id, question_id=question_id,
    )

    # Get recommended difficulty (NEW)
    diff = await ProgressServiceV2.get_recommended_difficulty(
        db=db, user_id=user_id, node_id=node_id,
    )
"""

from typing import Optional
from datetime import datetime, timezone

from backend.services.knowledge_tracing import (
    KnowledgeTracingEngine,
    MasteryUpdateResult,
    PerformancePrediction,
)


class ProgressServiceV2:
    """Progress tracking v2 — uses unified BKT + IRT + AFM engine.

    This service wraps the KnowledgeTracingEngine and provides the same
    interface as the original ProgressService for mastery updates, plus
    new methods for IRT-based predictions and adaptive difficulty.
    """

    # ================================================================== #
    # Mastery update (drop-in replacement for v1's update_mastery_bkt)
    # ================================================================== #

    @staticmethod
    async def update_mastery(
        db,
        user_id: str,
        node_id: str,
        is_correct: bool,
        question_id: Optional[str] = None,
    ) -> MasteryUpdateResult:
        """Update mastery using unified BKT + IRT + AFM engine.

        Drop-in replacement for ProgressService.update_mastery_bkt() that
        also updates student ability (theta) and adapts learning rate.

        Args:
            db: Database session.
            user_id: User ID.
            node_id: Curriculum node ID.
            is_correct: Whether the answer was correct.
            question_id: Optional question ID. If provided, IRT parameters
                (difficulty, discrimination, guessing) are used to update
                the student's ability estimate more accurately.

        Returns:
            MasteryUpdateResult with mastery_probability, student_theta,
            p_transit, and other updated parameters.
        """
        return await KnowledgeTracingEngine.update_mastery(
            db=db,
            user_id=user_id,
            node_id=node_id,
            is_correct=is_correct,
            question_id=question_id,
        )

    # ================================================================== #
    # IRT-based predictions (NEW in v2)
    # ================================================================== #

    @staticmethod
    async def predict_performance(
        db,
        user_id: str,
        question_id: str,
    ) -> PerformancePrediction:
        """Predict student performance on a specific question.

        Uses the IRT 3PL model with the student's current ability estimate
        (theta) and the question's IRT parameters (difficulty, discrimination,
        guessing).

        Args:
            db: Database session.
            user_id: User ID.
            question_id: Question ID.

        Returns:
            PerformancePrediction with pass_probability and metadata.
        """
        return await KnowledgeTracingEngine.predict_performance(
            db=db,
            user_id=user_id,
            question_id=question_id,
        )

    @staticmethod
    async def get_recommended_difficulty(
        db,
        user_id: str,
        node_id: str,
    ) -> float:
        """Get recommended question difficulty for a student on a node.

        Targets ~70% pass rate (zone of proximal development) based on
        the student's current ability (theta).

        Args:
            db: Database session.
            user_id: User ID.
            node_id: Curriculum node ID.

        Returns:
            Recommended difficulty_b value (-3 easy to +3 hard).
        """
        return await KnowledgeTracingEngine.get_recommended_difficulty(
            db=db,
            user_id=user_id,
            node_id=node_id,
        )

    # ================================================================== #
    # Adaptive question selection (NEW in v2)
    # ================================================================== #

    @staticmethod
    async def select_adaptive_questions(
        db,
        user_id: str,
        node_id: str,
        available_questions: list,
        target_count: int = 5,
    ) -> list:
        """Select questions adapted to the student's ability level.

        Picks questions whose difficulty is closest to the student's
        recommended difficulty (zone of proximal development).

        Args:
            db: Database session.
            user_id: User ID.
            node_id: Curriculum node ID.
            available_questions: List of question objects with id and
                difficulty_b attributes/keys.
            target_count: Number of questions to select.

        Returns:
            List of selected question IDs, sorted by closeness to
            recommended difficulty.
        """
        if not available_questions:
            return []

        recommended_b = await ProgressServiceV2.get_recommended_difficulty(
            db=db, user_id=user_id, node_id=node_id,
        )

        # Score each question by closeness to recommended difficulty
        scored = []
        for q in available_questions:
            # Handle both dict and object access
            if hasattr(q, "difficulty_b"):
                q_b = q.difficulty_b or 0.0
                q_id = q.id
            elif isinstance(q, dict):
                q_b = q.get("difficulty_b", 0.0) or 0.0
                q_id = q.get("id")
            else:
                continue

            # Distance from recommended difficulty (smaller is better)
            distance = abs(q_b - recommended_b)
            scored.append((distance, q_id, q_b))

        # Sort by distance and return top N IDs
        scored.sort(key=lambda x: x[0])
        return [s[1] for s in scored[:target_count]]

    # ================================================================== #
    # Mastery summary (enhanced for v2)
    # ================================================================== #

    @staticmethod
    async def get_mastery_summary(
        db,
        user_id: str,
        node_id: str,
    ) -> dict:
        """Get a comprehensive mastery summary for a user/node pair.

        Includes BKT mastery probability, IRT ability estimate, AFM
        learning rate, and attempt statistics.

        Args:
            db: Database session.
            user_id: User ID.
            node_id: Curriculum node ID.

        Returns:
            Dict with mastery_probability, student_theta, p_transit,
            attempts, success_count, failure_count, and mastery status.
        """
        from sqlalchemy import select
        from backend.models.progress import MasteryRecord

        result = await db.execute(
            select(MasteryRecord).where(
                MasteryRecord.user_id == user_id,
                MasteryRecord.node_id == node_id,
            )
        )
        record = result.scalar_one_or_none()

        if record is None:
            return {
                "node_id": node_id,
                "mastery_probability": 0.0,
                "student_theta": 0.0,
                "p_transit": 0.1,
                "p_known": 0.0,
                "attempts": 0,
                "attempts_per_node": 0,
                "success_count": 0,
                "failure_count": 0,
                "learning_rate_afm": 0.1,
                "status": "not_started",
                "method": "bkt_irt_afm",
            }

        mastery = record.mastery_probability or 0.0
        if mastery >= 0.8:
            status = "mastered"
        elif mastery >= 0.5:
            status = "learning"
        elif mastery > 0.0:
            status = "struggling"
        else:
            status = "not_started"

        return {
            "node_id": node_id,
            "mastery_probability": mastery,
            "student_theta": record.student_theta or 0.0,
            "p_transit": record.p_transit or 0.1,
            "p_known": record.p_known or 0.0,
            "attempts": record.attempts or 0,
            "attempts_per_node": record.attempts_per_node or 0,
            "success_count": record.success_count or 0,
            "failure_count": record.failure_count or 0,
            "learning_rate_afm": record.learning_rate_afm or 0.1,
            "last_attempt_at": record.last_attempt_at.isoformat() if record.last_attempt_at else None,
            "last_irt_update": record.last_irt_update.isoformat() if record.last_irt_update else None,
            "status": status,
            "method": "bkt_irt_afm",
        }
