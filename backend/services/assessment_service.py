"""Assessment service for the DREAM_APP educational platform.

Handles quiz questions, quiz answer submission (with BKT mastery update,
XP award, and activity logging), exam listing/detail, exam submission
with grading, and exam attempt history.
"""

import random
from datetime import datetime, timezone
from typing import Any, Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.assessment import (
    AnswerSubmission,
    Exam,
    ExamAttempt,
    ExamSection,
    QuizQuestion,
)
from backend.services.progress_service import ProgressService


class AssessmentService:
    """Quiz and exam assessment service."""

    # ------------------------------------------------------------------ #
    # Quiz
    # ------------------------------------------------------------------ #
    @staticmethod
    async def get_quiz_questions(
        db: AsyncSession, node_id: str, count: int = 10
    ) -> list[QuizQuestion]:
        """Return up to ``count`` quiz questions for the given node, shuffled."""
        result = await db.execute(
            select(QuizQuestion).where(QuizQuestion.node_id == node_id)
        )
        questions = list(result.scalars().all())
        random.shuffle(questions)
        return questions[:count]

    @staticmethod
    async def submit_quiz_answer(
        db: AsyncSession, user_id: str, data: dict
    ) -> dict:
        """Check a quiz answer, update mastery via BKT, award XP, and log activity.

        Expected ``data`` keys: ``question_id``, ``answer``,
        ``time_taken_seconds`` (optional), ``node_id``.
        """
        question_id = data.get("question_id")
        user_answer = data.get("answer", "").strip()
        node_id = data.get("node_id", "")

        # Fetch the question
        result = await db.execute(
            select(QuizQuestion).where(QuizQuestion.id == question_id)
        )
        question = result.scalar_one_or_none()
        if question is None:
            raise ValueError("Quiz question not found")

        # Determine correctness
        is_correct = user_answer.lower() == question.correct_answer.strip().lower()
        marks_awarded = float(question.marks) if is_correct else 0.0

        # Update mastery via BKT
        updated_mastery = await ProgressService.update_mastery_bkt(
            db, user_id, question.node_id, is_correct
        )

        # Award XP
        xp_amount = 10 if is_correct else 2
        await ProgressService.award_xp(db, user_id, xp_amount)

        # Update streak
        await ProgressService.update_streak(db, user_id)

        # Log activity
        await ProgressService.log_activity(
            db,
            user_id,
            activity_type="quiz",
            title=f"Quiz: {question.question[:60]}",
            subject=None,
            score="correct" if is_correct else "incorrect",
            metadata={
                "question_id": str(question.id),
                "node_id": question.node_id,
                "is_correct": is_correct,
                "marks_awarded": marks_awarded,
                "time_taken_seconds": data.get("time_taken_seconds"),
            },
        )

        return {
            "is_correct": is_correct,
            "correct_answer": question.correct_answer,
            "explanation": question.explanation,
            "marks_awarded": marks_awarded,
            "updated_mastery": updated_mastery,
        }

    # ------------------------------------------------------------------ #
    # Exams – listing & detail
    # ------------------------------------------------------------------ #
    @staticmethod
    async def get_exams(
        db: AsyncSession,
        board: Optional[str] = None,
        class_level: Optional[int] = None,
    ) -> list[Exam]:
        """Return published exams, optionally filtered by board / class."""
        stmt = select(Exam).where(Exam.is_published == True)  # noqa: E712
        if board is not None:
            stmt = stmt.where(Exam.board == board)
        if class_level is not None:
            stmt = stmt.where(Exam.class_level == class_level)
        stmt = stmt.order_by(Exam.created_at.desc())
        result = await db.execute(stmt)
        return list(result.scalars().all())

    @staticmethod
    async def get_exam(db: AsyncSession, exam_id: str) -> Exam:
        """Return an exam (with sections) by its string ``exam_id``.

        Raises:
            ValueError: If the exam does not exist.
        """
        result = await db.execute(
            select(Exam).where(Exam.exam_id == exam_id)
        )
        exam = result.scalar_one_or_none()
        if exam is None:
            raise ValueError(f"Exam '{exam_id}' not found")

        # Eagerly load sections
        sections_result = await db.execute(
            select(ExamSection).where(ExamSection.exam_id == exam.id)
        )
        _ = list(sections_result.scalars().all())  # populate relationship
        return exam

    # ------------------------------------------------------------------ #
    # Exam submission
    # ------------------------------------------------------------------ #
    @staticmethod
    async def submit_exam(db: AsyncSession, user_id: str, data: dict) -> dict:
        """Create an exam attempt, grade answers, compute scores, update mastery.

        Expected ``data`` keys: ``exam_id``, ``answers`` (list of dicts with
        ``question_id`` and ``answer``).
        """
        exam = await AssessmentService.get_exam(db, data["exam_id"])

        answers: list[dict] = data.get("answers", [])
        now = datetime.now(timezone.utc)

        # Build a lookup of all questions across sections.
        # Query sections explicitly — lazy-loading exam.sections here would
        # raise MissingGreenlet inside the async event loop.
        sections_result = await db.execute(
            select(ExamSection).where(ExamSection.exam_id == exam.id)
        )
        section_rows = list(sections_result.scalars().all())
        section_questions: dict[str, dict] = {}
        for section in section_rows:
            qs = section.questions or []
            if isinstance(qs, str):
                try:
                    import json as _json
                    qs = _json.loads(qs)
                except Exception:
                    qs = []
            for q in qs:
                section_questions[str(q.get("id", ""))] = {
                    "question": q,
                    "section": section,
                }

        total_score = 0.0
        max_score = float(exam.total_marks)
        section_scores: dict[str, dict] = {}
        topic_scores: dict[str, dict] = {}
        weakness_areas: list[dict] = []

        # Create the attempt
        attempt = ExamAttempt(
            exam_id=exam.id,
            user_id=user_id,
            started_at=now,  # approximate
            completed_at=now,
            total_score=0.0,
            max_score=max_score,
            percentage=0.0,
        )
        db.add(attempt)
        await db.flush()

        for ans in answers:
            qid = str(ans.get("question_id", ""))
            user_answer = ans.get("answer", "")
            qinfo = section_questions.get(qid)
            submission = AnswerSubmission(
                attempt_id=attempt.id,
                question_id=qid,
                user_answer=user_answer,
                graded_at=now,
            )

            if qinfo is not None:
                qdata = qinfo["question"]
                section = qinfo["section"]
                correct_answer = str(qdata.get("correct_answer", "")).strip()
                marks = float(qdata.get("marks", 1))
                is_correct = (
                    str(user_answer).strip().lower() == correct_answer.lower()
                )
                submission.is_correct = is_correct
                submission.marks_awarded = marks if is_correct else 0.0
                total_score += submission.marks_awarded

                # Section scores
                sec_key = section.section_id
                if sec_key not in section_scores:
                    section_scores[sec_key] = {
                        "section_id": sec_key,
                        "title": section.title,
                        "score": 0.0,
                        "max": float(section.marks),
                    }
                section_scores[sec_key]["score"] += submission.marks_awarded

                # Topic scores (use question topic or section title)
                topic_key = qdata.get("topic", section.title)
                if topic_key not in topic_scores:
                    topic_scores[topic_key] = {
                        "topic": topic_key,
                        "score": 0.0,
                        "max": 0.0,
                        "correct": 0,
                        "total": 0,
                    }
                topic_scores[topic_key]["score"] += submission.marks_awarded
                topic_scores[topic_key]["max"] += marks
                topic_scores[topic_key]["total"] += 1
                if is_correct:
                    topic_scores[topic_key]["correct"] += 1
                else:
                    weakness_areas.append(
                        {
                            "topic": topic_key,
                            "question_id": qid,
                            "correct_answer": correct_answer,
                        }
                    )

                # Update mastery for the node if available
                node_id = qdata.get("node_id")
                if node_id:
                    await ProgressService.update_mastery_bkt(
                        db, user_id, node_id, is_correct
                    )
            else:
                submission.is_correct = False
                submission.marks_awarded = 0.0

            db.add(submission)

        percentage = (total_score / max_score * 100) if max_score > 0 else 0.0
        attempt.total_score = total_score
        attempt.percentage = percentage
        attempt.time_taken_seconds = data.get("time_taken_seconds", 0)
        attempt.section_scores = list(section_scores.values())
        attempt.topic_scores = list(topic_scores.values())
        attempt.weakness_areas = weakness_areas

        # Award XP based on score
        xp_amount = int(total_score * 5) + (50 if percentage >= 80 else 0)
        await ProgressService.award_xp(db, user_id, xp_amount)
        await ProgressService.update_streak(db, user_id)

        # Log activity
        await ProgressService.log_activity(
            db,
            user_id,
            activity_type="exam",
            title=f"Exam: {exam.title}",
            subject=exam.subject,
            score=f"{percentage:.1f}%",
            metadata={
                "exam_id": exam.exam_id,
                "total_score": total_score,
                "max_score": max_score,
                "percentage": percentage,
            },
        )

        await db.flush()
        await db.refresh(attempt)

        return {
            "attempt_id": str(attempt.id),
            "total_score": total_score,
            "max_score": max_score,
            "percentage": percentage,
            "time_taken": attempt.time_taken_seconds or 0,
            "section_scores": attempt.section_scores or [],
            "topic_scores": attempt.topic_scores or [],
            "weakness_areas": attempt.weakness_areas or [],
        }

    # ------------------------------------------------------------------ #
    # Exam attempts
    # ------------------------------------------------------------------ #
    @staticmethod
    async def get_exam_attempts(
        db: AsyncSession, user_id: str, exam_id: Optional[str] = None
    ) -> list[ExamAttempt]:
        """Return exam attempts for a user, optionally filtered by exam_id."""
        if exam_id is not None:
            exam = await AssessmentService.get_exam(db, exam_id)
            stmt = select(ExamAttempt).where(
                ExamAttempt.user_id == user_id,
                ExamAttempt.exam_id == exam.id,
            )
        else:
            stmt = select(ExamAttempt).where(ExamAttempt.user_id == user_id)
        stmt = stmt.order_by(ExamAttempt.created_at.desc())
        result = await db.execute(stmt)
        return list(result.scalars().all())