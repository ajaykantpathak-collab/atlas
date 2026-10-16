"""Drill progression service for the DREAM_APP tutor.

Provides tiered practice questions: [BASIC] → [EXAM] → [CHALLENGE].
Questions are loaded from the board_questions table (source_type='drill_bank'
or 'question_bank') and filtered by difficulty.

Mastery is verified when a student passes 80% at the EXAM tier.

Data used:
  - board_questions (source_type=drill_bank, question_bank, practice)
  - board_questions.difficulty (easy/medium/hard → BASIC/EXAM/CHALLENGE)
  - board_questions.marking_scheme (for grading)
  - board_questions.node_tags (for filtering by node)
"""

import random
from dataclasses import dataclass, field
from typing import Optional

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.enrichment import BoardQuestion
from backend.ai.hybrid_evaluator import evaluate_answer
from backend.services import evaluator_solver_bridge
from backend.utils.question_text import is_merged_record, strip_pipeline_markers


# --------------------------------------------------------------------------- #
# Constants
# --------------------------------------------------------------------------- #

# Map difficulty to tiers
TIER_MAP = {
    "easy": "BASIC",
    "medium": "EXAM",
    "hard": "CHALLENGE",
}

TIER_ORDER = ["BASIC", "EXAM", "CHALLENGE"]
PASS_THRESHOLD = 0.80  # 80% to advance to next tier
QUESTIONS_PER_TIER = 5  # serve 5 questions per tier


# --------------------------------------------------------------------------- #
# Data structures
# --------------------------------------------------------------------------- #

@dataclass
class DrillQuestion:
    """A single drill question."""
    question_id: str
    question_text: str
    tier: str
    marks: int
    correct_answer: str
    model_answer: str
    marking_scheme: str
    node_tags: list


@dataclass
class DrillResult:
    """Result of a single drill answer."""
    correct: bool
    score: float
    feedback: str
    model_answer: str


@dataclass
class DrillSession:
    """State of a drill session for a node."""
    node_id: str
    subject: str
    class_level: int
    current_tier: str          # BASIC, EXAM, CHALLENGE
    current_index: int         # 0-indexed within current tier
    questions: list[DrillQuestion] = field(default_factory=list)
    results: list[DrillResult] = field(default_factory=list)
    tier_scores: dict = field(default_factory=dict)  # {tier: {correct: int, total: int}}
    mastered: bool = False


# --------------------------------------------------------------------------- #
# In-memory drill session store (mirrors tutor session pattern)
# --------------------------------------------------------------------------- #

_DRILL_SESSIONS: dict[str, DrillSession] = {}


# --------------------------------------------------------------------------- #
# Service
# --------------------------------------------------------------------------- #

class DrillService:
    """Tiered drill progression service."""

    @staticmethod
    async def start_drill(
        db: AsyncSession,
        node_id: str,
        subject: str = "",
        class_level: int = 0,
        tier: str = "BASIC",
    ) -> dict:
        """Start a drill session for a node at the given tier.

        Loads questions from drill_banks and question_banks, filtered by
        node_tags (if available) or subject + class_level.
        """
        # Load questions for this node
        questions = await DrillService._load_questions(db, node_id, subject, class_level, tier)

        if not questions:
            return {
                "started": False,
                "message": f"No drill questions available for node {node_id} at {tier} tier. Try a different tier or 'test me' for diagnostic questions.",
            }

        session = DrillSession(
            node_id=node_id,
            subject=subject,
            class_level=class_level,
            current_tier=tier,
            current_index=0,
            questions=questions,
            tier_scores={},
        )
        session_id = f"drill_{node_id}_{tier}_{id(session)}"
        _DRILL_SESSIONS[session_id] = session

        first_q = questions[0]
        return {
            "started": True,
            "session_id": session_id,
            "node_id": node_id,
            "tier": tier,
            "total_questions": len(questions),
            "current_question": 1,
            "question": first_q.question_text,
            "marks": first_q.marks,
            "tier_progress": f"0/{len(questions)}",
        }

    @staticmethod
    async def submit_answer(
        db: AsyncSession,
        session_id: str,
        student_answer: str,
    ) -> dict:
        """Submit an answer to the current drill question."""
        session = _DRILL_SESSIONS.get(session_id)
        if not session:
            return {"error": "Drill session not found"}

        if session.current_index >= len(session.questions):
            return {"error": "No more questions in this tier"}

        question = session.questions[session.current_index]

        # Evaluate the answer
        result = await evaluate_answer(
            student_answer=student_answer,
            model_answer=question.correct_answer or question.model_answer or "",
            question_type="free_text",
            question_text=question.question_text,
            node_id=session.node_id,
            solver_bridge=evaluator_solver_bridge,
        )

        drill_result = DrillResult(
            correct=result.correct,
            score=result.score,
            feedback=result.feedback,
            model_answer=question.correct_answer or question.model_answer or "",
        )
        session.results.append(drill_result)

        # Track tier scores
        tier = session.current_tier
        if tier not in session.tier_scores:
            session.tier_scores[tier] = {"correct": 0, "total": 0}
        session.tier_scores[tier]["total"] += 1
        if result.correct:
            session.tier_scores[tier]["correct"] += 1

        session.current_index += 1

        # Check if tier is complete
        tier_complete = session.current_index >= len(session.questions)
        if tier_complete:
            tier_score = session.tier_scores[tier]
            tier_pct = tier_score["correct"] / tier_score["total"] if tier_score["total"] else 0

            if tier_pct >= PASS_THRESHOLD:
                # Advance to next tier
                current_tier_idx = TIER_ORDER.index(tier)
                if current_tier_idx + 1 < len(TIER_ORDER):
                    next_tier = TIER_ORDER[current_tier_idx + 1]
                    next_questions = await DrillService._load_questions(
                        db, session.node_id, session.subject, session.class_level, next_tier
                    )
                    if next_questions:
                        session.current_tier = next_tier
                        session.current_index = 0
                        session.questions = next_questions
                        return {
                            "correct": result.correct,
                            "score": result.score,
                            "feedback": result.feedback,
                            "model_answer": drill_result.model_answer,
                            "tier_complete": True,
                            "tier_passed": True,
                            "next_tier": next_tier,
                            "next_question": next_questions[0].question_text,
                            "current_question": 1,
                            "total_questions": len(next_questions),
                        }
                    else:
                        # No questions for next tier — mastered
                        session.mastered = True
                        return {
                            "correct": result.correct,
                            "score": result.score,
                            "feedback": result.feedback + "\n\n**Mastery verified!** You've passed the " + tier + " tier and no harder questions are available. You're ready to move on.",
                            "model_answer": drill_result.model_answer,
                            "tier_complete": True,
                            "tier_passed": True,
                            "mastered": True,
                        }
                else:
                    # Already at CHALLENGE tier — mastered
                    session.mastered = True
                    return {
                        "correct": result.correct,
                        "score": result.score,
                        "feedback": result.feedback + "\n\n**Mastery verified!** You've passed the CHALLENGE tier. Excellent work!",
                        "model_answer": drill_result.model_answer,
                        "tier_complete": True,
                        "tier_passed": True,
                        "mastered": True,
                    }
            else:
                # Failed tier — retry
                return {
                    "correct": result.correct,
                    "score": result.score,
                    "feedback": result.feedback + f"\n\n**Tier result:** {tier_score['correct']}/{tier_score['total']} ({tier_pct:.0%}). You need {PASS_THRESHOLD:.0%} to advance. Type 'retry' to try again, or 'review' for remediation.",
                    "model_answer": drill_result.model_answer,
                    "tier_complete": True,
                    "tier_passed": False,
                    "tier_score": f"{tier_score['correct']}/{tier_score['total']}",
                }

        # Serve next question in current tier
        next_q = session.questions[session.current_index]
        return {
            "correct": result.correct,
            "score": result.score,
            "feedback": result.feedback,
            "model_answer": drill_result.model_answer,
            "tier_complete": False,
            "next_question": next_q.question_text,
            "current_question": session.current_index + 1,
            "total_questions": len(session.questions),
            "tier": session.current_tier,
        }

    @staticmethod
    async def _load_questions(
        db: AsyncSession,
        node_id: str,
        subject: str,
        class_level: int,
        tier: str,
    ) -> list[DrillQuestion]:
        """Load drill questions for a node at a specific tier.

        Only returns questions that have a model_answer or correct_answer,
        so that 'show answer' and evaluation always work.
        """
        # Map tier to difficulty
        difficulty_map = {
            "BASIC": ["easy", "medium"],  # include medium as fallback
            "EXAM": ["medium"],
            "CHALLENGE": ["hard", "medium"],  # include medium as fallback
        }
        difficulties = difficulty_map.get(tier, ["medium"])

        # Try to find questions tagged with this node that HAVE answers
        for difficulty in difficulties:
            result = await db.execute(
                select(BoardQuestion)
                .where(BoardQuestion.source_type.in_(["drill_bank", "question_bank", "practice"]))
                .where(BoardQuestion.difficulty == difficulty)
                .where(BoardQuestion.subject == subject)
                .where(BoardQuestion.class_level == class_level)
                .where((BoardQuestion.correct_answer.isnot(None)) | (BoardQuestion.model_answer.isnot(None)))
                .limit(QUESTIONS_PER_TIER * 2)
            )
            questions = list(result.scalars())

            # Filter by node_tags if available
            node_tagged = [q for q in questions if q.node_tags and node_id in (q.node_tags or [])]
            if node_tagged:
                questions = node_tagged

            if questions:
                # Serve-boundary hygiene: merged records (multiple
                # TOPIC_TAG markers) are dropped outright; pipeline
                # markers never reach the student text.
                questions = [
                    q for q in questions if not is_merged_record(q.question_text)
                ]
                if not questions:
                    continue
                # Shuffle and take QUESTIONS_PER_TIER
                random.shuffle(questions)
                questions = questions[:QUESTIONS_PER_TIER]
                return [
                    DrillQuestion(
                        question_id=str(q.id),
                        question_text=strip_pipeline_markers(q.question_text),
                        tier=tier,
                        marks=q.marks or 1,
                        correct_answer=q.correct_answer or "",
                        model_answer=q.model_answer or "",
                        marking_scheme=q.marking_scheme or "",
                        node_tags=q.node_tags or [],
                    )
                    for q in questions
                ]

        # No fallback to any-subject questions — return empty so the
        # tutor service can fall back to enrichment diagnostic questions
        # which are always topic-specific and have answers.
        return []

    @staticmethod
    def get_session_status(session_id: str) -> dict:
        """Get the current status of a drill session."""
        session = _DRILL_SESSIONS.get(session_id)
        if not session:
            return {"error": "Drill session not found"}

        return {
            "node_id": session.node_id,
            "current_tier": session.current_tier,
            "current_index": session.current_index,
            "total_questions": len(session.questions),
            "tier_scores": session.tier_scores,
            "mastered": session.mastered,
        }
