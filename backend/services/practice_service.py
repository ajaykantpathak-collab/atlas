# services/practice_service.py
import asyncio
import hashlib
import json
import logging
import random
import time
import uuid
from collections import deque
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional, Tuple

from pydantic import BaseModel, Field, ConfigDict

from sqlalchemy import select, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession

from database import PracticeSession, Attempt, Mastery, Student, async_session_maker
from services.knowledge_tracing import BKTModel, IRTModel, AFMModel
from services.mastery_sync import update_on_attempt, get_mastery, get_review_schedule
from solvers.registry import get_question_gen
from solvers.base import SolverResult

logger = logging.getLogger(__name__)


# ============================================================================
# Pydantic v2 Schemas - Request/Response DTOs
# ============================================================================

class SessionStartRequest(BaseModel):
    """Request to start a new practice session."""
    student_id: str
    subject: str
    topic_ids: Optional[List[str]] = None
    num_questions: int = Field(default=5, ge=1, le=20)


class AnswerSubmitRequest(BaseModel):
    """Request to submit an answer."""
    session_id: str
    question_id: str
    answer: Any
    time_ms: int = Field(ge=0)


class QuestionResponse(BaseModel):
    """Question data sent to frontend."""
    model_config = ConfigDict(from_attributes=True)

    question_id: str
    problem_type: str
    prompt: str
    options: Optional[List[str]] = None
    difficulty: float
    topic_id: str
    topic_name: str
    latex: Optional[str] = None
    image_url: Optional[str] = None


class FeedbackResponse(BaseModel):
    """Feedback after submitting an answer."""
    model_config = ConfigDict(from_attributes=True)

    is_correct: bool
    correct_answer: Any
    explanation: str
    mastery_before: float
    mastery_after: float
    topic_id: str
    next_question: Optional[QuestionResponse] = None
    session_progress: Dict[str, Any]


class SessionStateResponse(BaseModel):
    """Current session state."""
    model_config = ConfigDict(from_attributes=True)

    session_id: str
    status: str
    subject: str
    topic_ids: List[str]
    total_questions: int
    current_index: int
    correct_count: int
    streak: int
    current_question: Optional[QuestionResponse]
    started_at: datetime
    last_activity_at: datetime


class SessionSummaryResponse(BaseModel):
    """Session summary after completion."""
    model_config = ConfigDict(from_attributes=True)

    session_id: str
    total_questions: int
    correct_count: int
    accuracy: float
    mastery_changes: List[Dict[str, Any]]
    streak: int
    review_due: List[Dict[str, Any]]
    message: str


class BatchSubmitRequest(BaseModel):
    """Batch submit for offline sync."""
    session_id: str
    answers: List[Dict[str, Any]]  # [{question_id, answer, time_ms}, ...]


# ============================================================================
# Practice Service - Core Learning Loop
# ============================================================================

class PracticeService:
    """
    Core learning loop service for adaptive practice sessions.

    Designed for Indian Class 11 ISC students:
    - 16 saal ka student, Android 11, 2GB RAM, 3G network
    - 15-20 min practice sessions
    - 5 questions by default (configurable)
    - Adaptive difficulty: 3 sahi -> harder, 2 galat -> easier
    - Offline-capable with sync support

    Performance targets:
    - Question selection: <100ms
    - Session start: <200ms
    """

    def __init__(self):
        # In-memory cache for active sessions - fast access ke liye
        self._active_sessions: Dict[str, Dict[str, Any]] = {}
        # Offline queue for batch sync (Android app handles local queue)
        self._offline_queue: Dict[str, deque] = {}
        # Async lock for thread safety
        self._lock = asyncio.Lock()
        # Adaptive difficulty thresholds
        self.HARDER_THRESHOLD = 3  # 3 consecutive correct -> increase difficulty
        self.EASIER_THRESHOLD = 2  # 2 consecutive wrong -> decrease difficulty
        # Session composition ratios
        self.COMPETENCY_RATIO = 0.5  # 50% competency questions (low mastery topics)
        self.STANDARD_RATIO = 0.5    # 50% standard questions (practice)
        # SM-2 review schedule integration
        self.REVIEW_RATIO = 0.3      # Up to 30% can be reviews if due

    # ========================================================================
    # Public API - Main methods
    # ========================================================================

    async def start_session(
        self,
        student_id: str,
        subject: str,
        topic_ids: Optional[List[str]] = None,
        num_questions: int = 5
    ) -> Dict[str, Any]:
        """
        Start a new practice session.

        Args:
            student_id: Student identifier
            subject: Subject name (e.g., "Mathematics")
            topic_ids: Optional list of specific topics to practice
            num_questions: Number of questions (default 5, max 20)

        Returns:
            Session state with first question ready to answer

        Performance: <200ms target
        """
        async with self._lock:
            # Validate student exists
            student = await self._get_student(student_id)
            if not student:
                raise ValueError(f"Student {student_id} not found")

            # Get student's mastery profile for this subject
            masteries = await self._get_student_masteries(student_id, subject)

            # Plan session composition (competency vs standard vs reviews)
            composition = await self._plan_session(
                student_id, subject, topic_ids, masteries, num_questions
            )

            # Generate first question
            first_question = await self._generate_question(
                student_id, composition, masteries, 0
            )

            # Create session record
            session_id = str(uuid.uuid4())
            now = datetime.utcnow()

            session = PracticeSession(
                session_id=session_id,
                student_id=student_id,
                subject=subject,
                topic_ids=json.dumps(composition["topic_ids"]),
                status="active",
                total_questions=num_questions,
                current_index=0,
                correct_count=0,
                streak=0,
                consecutive_wrong=0,  # Track consecutive wrong for difficulty
                difficulty_level=self._get_initial_difficulty(masteries, composition),
                started_at=now,
                last_activity_at=now,
                questions=json.dumps(composition["questions"]),
                metadata=json.dumps({
                    "composition": composition,
                    "masteries_at_start": {
                        t: m.mastery_score for t, m in masteries.items()
                    },
                    "device_info": {
                        "platform": "android",
                        "ram_mb": 2048  # 2GB RAM
                    }
                })
            )

            # Save to DB (async, non-blocking)
            async with async_session_maker() as db:
                db.add(session)
                await db.commit()
                await db.refresh(session)

            # Cache in memory for fast access (<100ms question selection)
            self._active_sessions[session_id] = {
                "session": session,
                "masteries": masteries,
                "composition": composition,
                "question_history": [],
                "started_at": now
            }

            logger.info(
                f"Started session {session_id} for student {student_id} "
                f"subject={subject} questions={num_questions}"
            )

            return {
                "session_id": session_id,
                "status": "active",
                "subject": subject,
                "topic_ids": composition["topic_ids"],
                "total_questions": num_questions,
                "current_index": 0,
                "correct_count": 0,
                "streak": 0,
                "current_question": first_question,
                "started_at": now.isoformat(),
                "last_activity_at": now.isoformat()
            }

    async def submit_answer(
        self,
        session_id: str,
        question_id: str,
        answer: Any,
        time_ms: int
    ) -> Dict[str, Any]:
        """
        Submit answer for current question and get feedback + next question.

        This is the core feedback loop - must be instant (<100ms).

        Args:
            session_id: Session identifier
            question_id: Question identifier
            answer: Student's answer (string, number, or list)
            time_ms: Time taken in milliseconds

        Returns:
            Feedback with correctness, explanation, mastery change,
            and next question (or session end)
        """
        # Check if online or offline
        is_online = await self._check_online_status()

        if not is_online:
            # Queue answer for later sync
            await self._queue_answer(session_id, question_id, answer, time_ms)
            return {
                "status": "queued",
                "message": "Answer saved locally. Will sync when online.",
                "session_id": session_id
            }

        async with self._lock:
            # Get session from cache or DB
            session_data = await self._get_session_data(session_id)
            if not session_data:
                raise ValueError(f"Session {session_id} not found")

            session = session_data["session"]
            masteries = session_data["masteries"]
            composition = session_data["composition"]

            if session.status != "active":
                raise ValueError(
                    f"Session {session_id} is {session.status}. "
                    f"Start a new session or resume this one."
                )

            # Get the current question
            if session.current_index >= len(composition["questions"]):
                raise ValueError("No more questions in session")

            question = composition["questions"][session.current_index]

            # Verify question_id matches (security check)
            if question["question_id"] != question_id:
                logger.warning(
                    f"Question ID mismatch: expected {question['question_id']}, "
                    f"got {question_id}"
                )

            # Check answer (deterministic, no LLM)
            is_correct, correct_answer, explanation = await self._check_answer(
                question, answer
            )

            # Get mastery before update
            mastery_before = masteries.get(question["topic_id"])
            mastery_score_before = mastery_before.mastery_score if mastery_before else 0.0

            # Update mastery using knowledge tracing (BKT/IRT/AFM)
            mastery_after = await update_on_attempt(
                student_id=session.student_id,
                topic_id=question["topic_id"],
                is_correct=is_correct,
                time_ms=time_ms
            )
            mastery_score_after = mastery_after.mastery_score if mastery_after else mastery_score_before

            # Update streak and consecutive wrong
            if is_correct:
                session.streak += 1
                session.consecutive_wrong = 0
                session.correct_count += 1
            else:
                session.streak = 0
                session.consecutive_wrong += 1

            # Create attempt record
            attempt = Attempt(
                attempt_id=str(uuid.uuid4()),
                session_id=session_id,
                question_id=question_id,
                student_answer=json.dumps(answer),
                is_correct=is_correct,
                time_ms=time_ms,
                created_at=datetime.utcnow()
            )

            # Save to DB
            async with async_session_maker() as db:
                db.add(attempt)

                # Update session state
                session.current_index += 1
                session.last_activity_at = datetime.utcnow()

                # Adaptive difficulty adjustment
                # 3 correct -> harder, 2 wrong -> easier
                if session.streak >= self.HARDER_THRESHOLD:
                    session.difficulty_level = min(
                        2.0, session.difficulty_level + 0.2
                    )
                    logger.debug(
                        f"Session {session_id}: Increasing difficulty to "
                        f"{session.difficulty_level} (streak={session.streak})"
                    )
                elif session.consecutive_wrong >= self.EASIER_THRESHOLD:
                    session.difficulty_level = max(
                        0.5, session.difficulty_level - 0.2
                    )
                    logger.debug(
                        f"Session {session_id}: Decreasing difficulty to "
                        f"{session.difficulty_level} (wrong={session.consecutive_wrong})"
                    )

                await db.commit()
                await db.refresh(session)

            # Update cache
            session_data["session"] = session
            session_data["question_history"].append({
                "question_id": question_id,
                "is_correct": is_correct,
                "time_ms": time_ms,
                "timestamp": datetime.utcnow().isoformat()
            })
            self._active_sessions[session_id] = session_data

            # Check if session is complete
            is_complete = session.current_index >= session.total_questions

            if is_complete:
                # End session and get summary
                summary = await self._end_session_internal(session_id)
                return {
                    "is_correct": is_correct,
                    "correct_answer": correct_answer,
                    "explanation": explanation,
                    "mastery_before": round(mastery_score_before, 2),
                    "mastery_after": round(mastery_score_after, 2),
                    "topic_id": question["topic_id"],
                    "next_question": None,
                    "session_progress": {
                        "current_index": session.current_index,
                        "total_questions": session.total_questions,
                        "correct_count": session.correct_count,
                        "streak": session.streak,
                        "is_complete": True,
                        "summary": summary
                    }
                }
            else:
                # Generate next question with adaptive difficulty
                next_question = await self._generate_question(
                    session.student_id,
                    composition,
                    masteries,
                    session.current_index,
                    difficulty_override=session.difficulty_level
                )

                return {
                    "is_correct": is_correct,
                    "correct_answer": correct_answer,
                    "explanation": explanation,
                    "mastery_before": round(mastery_score_before, 2),
                    "mastery_after": round(mastery_score_after, 2),
                    "topic_id": question["topic_id"],
                    "next_question": next_question,
                    "session_progress": {
                        "current_index": session.current_index,
                        "total_questions": session.total_questions,
                        "correct_count": session.correct_count,
                        "streak": session.streak,
                        "is_complete": False
                    }
                }

    async def get_session(self, session_id: str) -> Dict[str, Any]:
        """
        Get current session state.

        Args:
            session_id: Session identifier

        Returns:
            Current session state with current question (if active)
        """
        session_data = await self._get_session_data(session_id)
        if not session_data:
            raise ValueError(f"Session {session_id} not found")

        session = session_data["session"]
        composition = session_data["composition"]

        # Get current question if session is active
        current_question = None
        if session.status == "active" and session.current_index < session.total_questions:
            q = composition["questions"][session.current_index]
            current_question = {
                "question_id": q["question_id"],
                "problem_type": q["problem_type"],
                "prompt": q["prompt"],
                "options": q.get("options"),
                "difficulty": q["difficulty"],
                "topic_id": q["topic_id"],
                "topic_name": q.get("topic_name", q["topic_id"])
            }

        return {
            "session_id": session_id,
            "status": session.status,
            "subject": session.subject,
            "topic_ids": json.loads(session.topic_ids) if session.topic_ids else [],
            "total_questions": session.total_questions,
            "current_index": session.current_index,
            "correct_count": session.correct_count,
            "streak": session.streak,
            "current_question": current_question,
            "started_at": session.started_at.isoformat(),
            "last_activity_at": session.last_activity_at.isoformat()
        }

    async def end_session(self, session_id: str) -> Dict[str, Any]:
        """
        End session early and get summary.

        Args:
            session_id: Session identifier

        Returns:
            Session summary with mastery changes and review schedule
        """
        return await self._end_session_internal(session_id)

    async def resume_session(self, session_id: str) -> Dict[str, Any]:
        """
        Resume an interrupted session (student ne app close kar diya).

        Args:
            session_id: Session identifier

        Returns:
            Current session state with next question
        """
        session_data = await self._get_session_data(session_id)
        if not session_data:
            raise ValueError(f"Session {session_id} not found")

        session = session_data["session"]

        if session.status == "completed":
            raise ValueError(
                f"Session {session_id} is already completed. "
                f"Start a new session."
            )

        # Resume the session
        session.status = "active"
        session.last_activity_at = datetime.utcnow()

        async with async_session_maker() as db:
            db.add(session)
            await db.commit()
            await db.refresh(session)

        # Update cache
        session_data["session"] = session
        self._active_sessions[session_id] = session_data

        # Get next question
        composition = session_data["composition"]
        current_question = None
        if session.current_index < session.total_questions:
            q = composition["questions"][session.current_index]
            current_question = {
                "question_id": q["question_id"],
                "problem_type": q["problem_type"],
                "prompt": q["prompt"],
                "options": q.get("options"),
                "difficulty": q["difficulty"],
                "topic_id": q["topic_id"],
                "topic_name": q.get("topic_name", "")
            }

        logger.info(f"Resumed session {session_id} at index {session.current_index}")

        return {
            "session_id": session_id,
            "status": "active",
            "subject": session.subject,
            "topic_ids": json.loads(session.topic_ids) if session.topic_ids else [],
            "total_questions": session.total_questions,
            "current_index": session.current_index,
            "correct_count": session.correct_count,
            "streak": session.streak,
            "current_question": current_question,
            "started_at": session.started_at.isoformat(),
            "last_activity_at": session.last_activity_at.isoformat(),
            "message": "Session resumed! Keep going! 💪"
        }

    async def batch_submit(
        self, session_id: str, answers: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Batch submit answers for offline sync.

        Args:
            session_id: Session identifier
            answers: List of {question_id, answer, time_ms}

        Returns:
            Sync result with processed count
        """
        results = []
        errors = []

        for i, ans in enumerate(answers):
            try:
                result = await self.submit_answer(
                    session_id=session_id,
                    question_id=ans["question_id"],
                    answer=ans["answer"],
                    time_ms=ans["time_ms"]
                )
                results.append({
                    "index": i,
                    "question_id": ans["question_id"],
                    "status": "ok",
                    "is_correct": result.get("is_correct")
                })
            except Exception as e:
                errors.append({
                    "index": i,
                    "question_id": ans["question_id"],
                    "error": str(e)
                })

        return {
            "status": "synced" if not errors else "partial",
            "processed": len(results),
            "errors": len(errors),
            "results": results,
            "errors_detail": errors
        }

    async def sync_offline_queue(self, session_id: str) -> Dict[str, Any]:
        """
        Sync queued answers when back online.

        Args:
            session_id: Session identifier

        Returns:
            Sync result
        """
        if session_id not in self._offline_queue:
            return {"status": "nothing_to_sync", "session_id": session_id}

        queue = self._offline_queue[session_id]
        if not queue:
            return {"status": "nothing_to_sync", "session_id": session_id}

        synced = []
        failed = []

        while queue:
            item = queue.popleft()
            try:
                await self.submit_answer(
                    session_id=session_id,
                    question_id=item["question_id"],
                    answer=item["answer"],
                    time_ms=item["time_ms"]
                )
                synced.append(item["question_id"])
            except Exception as e:
                logger.error(f"Failed to sync answer: {e}")
                failed.append({
                    "question_id": item["question_id"],
                    "error": str(e)
                })
                # Put back in queue for retry
                queue.appendleft(item)
                break

        if not queue:
            del self._offline_queue[session_id]

        return {
            "status": "synced" if not failed else "partial",
            "session_id": session_id,
            "synced_count": len(synced),
            "failed_count": len(failed),
            "synced_ids": synced,
            "failed": failed
        }

    # ========================================================================
    # Private methods - Internal implementation
    # ========================================================================

    async def _get_student(self, student_id: str) -> Optional[Student]:
        """Get student from DB."""
        async with async_session_maker() as db:
            result = await db.execute(
                select(Student).where(Student.student_id == student_id)
            )
            return result.scalar_one_or_none()

    async def _get_student_masteries(
        self, student_id: str, subject: str
    ) -> Dict[str, Mastery]:
        """Get all masteries for a student in a subject."""
        async with async_session_maker() as db:
            result = await db.execute(
                select(Mastery).where(
                    and_(
                        Mastery.student_id == student_id,
                        Mastery.subject == subject
                    )
                )
            )
            masteries = result.scalars().all()
            return {m.topic_id: m for m in masteries}

    def _get_initial_difficulty(
        self, masteries: Dict[str, Mastery], composition: Dict[str, Any]
    ) -> float:
        """Calculate initial difficulty based on average mastery."""
        if not masteries:
            return 0.7  # New student, start easy

        avg_mastery = sum(m.mastery_score for m in masteries.values()) / len(masteries)

        # Map mastery to difficulty: 0.0 -> 0.5, 0.5 -> 1.0, 1.0 -> 1.8
        return 0.5 + (avg_mastery * 1.3)

    async def _plan_session(
        self,
        student_id: str,
        subject: str,
        topic_ids: Optional[List[str]],
        masteries: Dict[str, Mastery],
        num_questions: int
    ) -> Dict[str, Any]:
        """
        Plan session composition.

        Composition:
        - 50% competency questions (low mastery topics) - naye topics seekhne ke liye
        - 50% standard questions (practice on mastered topics) - practice ke liye
        - Plus due reviews from SM-2 schedule (replace standard if due)

        Args:
            student_id: Student identifier
            subject: Subject name
            topic_ids: Optional specific topics
            masteries: Student's mastery profile
            num_questions: Total questions needed

        Returns:
            Dict with topic_ids and questions list
        """
        # Resolve student's class once for corpus filtering
        class_level: Optional[int] = None
        try:
            student = await self._get_student(student_id)
            if student and student.student_class:
                import re as _re
                m = _re.search(r"\d+", str(student.student_class))
                class_level = int(m.group()) if m else None
        except Exception:
            pass

        # Get review schedule (SM-2 due reviews)
        review_items = await get_review_schedule(student_id, subject)
        review_topic_ids = [item["topic_id"] for item in review_items]

        # Determine available topics
        if topic_ids:
            available_topics = topic_ids
        elif masteries:
            available_topics = list(masteries.keys())
        else:
            # New student - use default topics for subject
            available_topics = await self._get_default_topics(subject)

        if not available_topics:
            available_topics = ["default"]

        # Separate topics by mastery level
        low_mastery_topics = []  # < 0.5 mastery -> competency
        high_mastery_topics = []  # >= 0.5 mastery -> standard

        for topic_id, mastery in masteries.items():
            if mastery.mastery_score < 0.5:
                low_mastery_topics.append(topic_id)
            else:
                high_mastery_topics.append(topic_id)

        # If no low mastery topics, use all as competency (new topics)
        if not low_mastery_topics:
            low_mastery_topics = available_topics.copy()

        # If no high mastery topics, use all as standard
        if not high_mastery_topics:
            high_mastery_topics = available_topics.copy()

        # Calculate question counts
        num_competency = int(num_questions * self.COMPETENCY_RATIO)
        num_standard = num_questions - num_competency

        # Replace some standard questions with reviews if due
        review_slots = min(len(review_topic_ids), int(num_standard * self.REVIEW_RATIO))
        num_standard -= review_slots

        # Select topics (with randomization for variety)
        seed = int(time.time() * 1000) % 100000
        rng = random.Random(seed)

        competency_topics = rng.sample(
            low_mastery_topics,
            min(num_competency, len(low_mastery_topics))
        ) if low_mastery_topics else []

        standard_topics = rng.sample(
            high_mastery_topics,
            min(num_standard, len(high_mastery_topics))
        ) if high_mastery_topics else []

        review_topics = review_topic_ids[:review_slots]

        # Generate questions
        questions = []
        q_index = 0

        # Competency questions (naye topics, easy se start)
        for topic_id in competency_topics:
            mastery_score = masteries.get(topic_id).mastery_score if topic_id in masteries else 0.3
            difficulty = self._map_mastery_to_difficulty(mastery_score)
            q_seed = self._compute_seed(student_id, q_index)

            question = await self._generate_question_from_topic(
                topic_id, subject, difficulty, q_seed, class_level
            )
            if question:
                questions.append(question)
                q_index += 1

        # Review questions (SM-2 schedule ke according)
        for topic_id in review_topics:
            mastery_score = masteries.get(topic_id).mastery_score if topic_id in masteries else 0.5
            difficulty = self._map_mastery_to_difficulty(mastery_score)
            q_seed = self._compute_seed(student_id, q_index)

            question = await self._generate_question_from_topic(
                topic_id, subject, difficulty, q_seed, class_level
            )
            if question:
                question["is_review"] = True
                questions.append(question)
                q_index += 1

        # Standard questions (practice, moderate difficulty)
        for topic_id in standard_topics:
            mastery_score = masteries.get(topic_id).mastery_score if topic_id in masteries else 0.7
            difficulty = self._map_mastery_to_difficulty(mastery_score)
            q_seed = self._compute_seed(student_id, q_index)

            question = await self._generate_question_from_topic(
                topic_id, subject, difficulty, q_seed, class_level
            )
            if question:
                questions.append(question)
                q_index += 1

        # Fill remaining slots if needed
        while len(questions) < num_questions:
            topic_id = rng.choice(available_topics)
            q_seed = self._compute_seed(student_id, q_index)
            question = await self._generate_question_from_topic(
                topic_id, subject, 1.0, q_seed, class_level
            )
            if question:
                questions.append(question)
                q_index += 1
            else:
                break  # No more questions available

        # Collect all unique topic IDs
        all_topic_ids = list(set(q["topic_id"] for q in questions))

        return {
            "topic_ids": all_topic_ids,
            "questions": questions[:num_questions],
            "review_items": review_items
        }

    def _compute_seed(self, student_id: str, question_index: int) -> int:
        """
        Compute deterministic seed for question generation.

        Same session_id + index -> same question (for resume)
        Different session -> different question
        """
        # Use hash to get deterministic but unique seed
        seed_str = f"{student_id}:{question_index}:{int(time.time() / 86400)}"
        return abs(hash(seed_str)) % 100000

    async def _generate_question(
        self,
        student_id: str,
        composition: Dict[str, Any],
        masteries: Dict[str, Mastery],
        index: int,
        difficulty_override: Optional[float] = None
    ) -> Optional[Dict[str, Any]]:
        """
        Get question at given index from session composition.

        Performance: <100ms (just dict lookup + optional difficulty adjustment)
        """
        if index >= len(composition["questions"]):
            return None

        question = composition["questions"][index].copy()

        # Apply difficulty override from adaptive system
        if difficulty_override is not None:
            question["difficulty"] = difficulty_override

        return question

    _SUBJECT_ALIASES = {
        "mathematics": ["math", "maths"], "maths": ["math", "maths"],
        "math": ["math", "maths"], "biology": ["bio", "biology"],
        "bio": ["bio", "biology"], "physics": ["phy", "physics"],
        "phy": ["phy", "physics"], "chemistry": ["chem", "chemistry"],
        "chem": ["chem", "chemistry"], "english": ["engl", "english",
        "eng_k", "eng_w", "eng_f", "eng_v", "eng_s", "eng_h", "gram", "comp"],
        "computer_science": ["cs"], "economics": ["eco", "economics"],
        "eco": ["eco", "economics"], "history": ["hist", "history"],
        "hist": ["hist", "history"], "geography": ["geo", "geography"],
        "geo": ["geo", "geography"], "accountancy": ["acc"],
        "acc": ["acc"], "business_studies": ["bs"], "bs": ["bs"],
        "civics": ["civ", "civics"], "civ": ["civ", "civics"],
        "hindi": ["hin_ar", "hin_a", "hin_v", "hin_al"],
    }

    async def _db_question_for_topic(
        self,
        topic_id: str,
        subject: str,
        class_level: Optional[int],
        difficulty: float,
        seed: int,
    ) -> Optional[Dict[str, Any]]:
        """Fetch a real question from the node corpus (board_questions).

        All rows are extracted from enhanced_nodes_md — node-tagged,
        answered, CBSE. Returns generator-shaped dict or None.
        """
        import re
        from backend.models.enrichment import BoardQuestion
        from sqlalchemy.dialects.postgresql import JSONB
        from sqlalchemy import cast, func as sa_func

        db = async_session_maker()
        try:
            q = select(BoardQuestion).where(
                BoardQuestion.board == "CBSE",
                BoardQuestion.correct_answer.isnot(None),
            )
            if re.match(r"^c\d+_", topic_id or ""):
                q = q.where(cast(BoardQuestion.node_tags, JSONB)
                            .contains([topic_id]))
            else:
                subs = self._SUBJECT_ALIASES.get(
                    subject.lower(), [subject.lower()])
                q = q.where(BoardQuestion.subject.in_(subs))
                if class_level:
                    q = q.where(BoardQuestion.class_level == class_level)
            diff_label = ("easy" if difficulty < 0.9
                          else "medium" if difficulty < 1.4 else "hard")
            q = q.order_by(
                sa_func.case(
                    (BoardQuestion.difficulty == diff_label, 0), else_=1),
                sa_func.random(),
            ).limit(1)
            row = (await db.execute(q)).scalars().first()
            if not row:
                return None

            node = row.node_tags[0] if row.node_tags else topic_id
            return {
                "question_id": f"corpus:{row.id}",
                "problem_type": row.source_type or "corpus",
                "prompt": row.question_text,
                "options": row.options,
                "difficulty": row.difficulty,
                "topic_id": node,
                "topic_name": self._get_topic_display_name(node),
                "latex": None,
                "image_url": None,
                "correct_answer": row.correct_answer,
                "explanation": row.explanation or row.model_answer or "",
            }
        except Exception as e:
            logger.error(f"DB question fetch failed: {e}")
            return None
        finally:
            await db.close()

    async def _generate_question_from_topic(
        self,
        topic_id: str,
        subject: str,
        difficulty: float,
        seed: int,
        class_level: Optional[int] = None,
    ) -> Optional[Dict[str, Any]]:
        """
        Generate a question from a specific topic using the question registry.

        Args:
            topic_id: Topic identifier
            subject: Subject name
            difficulty: Difficulty level (0.5-2.0)
            seed: Random seed for determinism

        Returns:
            Question dict or None if generator not found
        """
        # Corpus-first: real node-derived question if one exists
        corpus_q = await self._db_question_for_topic(
            topic_id, subject, class_level, difficulty, seed)
        if corpus_q:
            return corpus_q

        # Map topic to problem type for the registry
        problem_type = self._topic_to_problem_type(topic_id, subject)

        # Get question generator from registry (auto-discovered)
        generator = get_question_gen(problem_type)
        if not generator:
            # Try fallback generators
            for fallback in ["math_arithmetic", "math_algebra", "default"]:
                generator = get_question_gen(fallback)
                if generator:
                    break

        if not generator:
            logger.warning(f"No question generator found for {problem_type}")
            return None

        try:
            # Generate question (deterministic with seed)
            result: SolverResult = generator.generate(
                problem_type=problem_type,
                seed=seed,
                difficulty=difficulty
            )

            return {
                "question_id": result.question_id or f"q_{seed}_{uuid.uuid4().hex[:8]}",
                "problem_type": problem_type,
                "prompt": result.prompt,
                "options": result.options,
                "difficulty": round(difficulty, 1),
                "topic_id": topic_id,
                "topic_name": result.topic_name or self._get_topic_display_name(topic_id),
                "latex": result.latex,
                "image_url": result.image_url,
                "correct_answer": result.correct_answer,
                "explanation": result.explanation or "No explanation available."
            }
        except Exception as e:
            logger.error(f"Failed to generate question: {e}")
            return None

    async def _check_answer(
        self, question: Dict[str, Any], answer: Any
    ) -> Tuple[bool, Any, str]:
        """
        Check if answer is correct (deterministic, no LLM).

        Handles different answer types:
        - Numeric (with tolerance for floating point)
        - String (case-insensitive)
        - List (order-independent for multiple choice)
        - Dict (for complex answers)
        """
        correct = question.get("correct_answer")

        if correct is None:
            logger.warning(f"Question {question['question_id']} has no correct_answer")
            return False, None, "Answer not available."

        # Numeric comparison with tolerance
        if isinstance(correct, (int, float)) and not isinstance(correct, bool):
            try:
                is_correct = abs(float(answer) - float(correct)) < 0.01
            except (ValueError, TypeError):
                is_correct = False
        # List comparison (order-independent for multiple select)
        elif isinstance(correct, list):
            try:
                is_correct = sorted(str(a) for a in answer) == sorted(str(c) for c in correct)
            except (TypeError, ValueError):
                is_correct = False
        # String comparison (case-insensitive)
        elif isinstance(correct, str):
            is_correct = str(answer).strip().lower() == correct.strip().lower()
        # Dict comparison
        elif isinstance(correct, dict):
            try:
                is_correct = json.loads(json.dumps(answer)) == correct
            except (TypeError, ValueError):
                is_correct = False
        # Default equality
        else:
            is_correct = answer == correct

        explanation = question.get("explanation", "No explanation available.")

        return is_correct, correct, explanation

    async def _end_session_internal(self, session_id: str) -> Dict[str, Any]:
        """
        Internal method to end session and generate summary.

        Called when session completes or student ends early.
        """
        session_data = await self._get_session_data(session_id)
        if not session_data:
            raise ValueError(f"Session {session_id} not found")

        session = session_data["session"]
        masteries = session_data["masteries"]
        composition = session_data["composition"]

        # Calculate mastery changes
        mastery_changes = []
        topic_ids = json.loads(session.topic_ids) if session.topic_ids else []

        for topic_id in topic_ids:
            mastery = masteries.get(topic_id)
            if mastery:
                # Get mastery at start from metadata
                masteries_at_start = {}
                if session.metadata:
                    try:
                        meta = json.loads(session.metadata)
                        masteries_at_start = meta.get("masteries_at_start", {})
                    except json.JSONDecodeError:
                        pass

                mastery_before = masteries_at_start.get(topic_id, mastery.mastery_score)
                mastery_after = mastery.mastery_score
                change = mastery_after - mastery_before

                mastery_changes.append({
                    "topic_id": topic_id,
                    "topic_name": mastery.topic_name or self._get_topic_display_name(topic_id),
                    "mastery_before": round(mastery_before, 2),
                    "mastery_after": round(mastery_after, 2),
                    "change": round(change, 2)
                })

        # Get review schedule (SM-2)
        review_due = await get_review_schedule(session.student_id, session.subject)

        # Calculate accuracy
        accuracy = (
            session.correct_count / session.total_questions
            if session.total_questions > 0 else 0.0
        )

        # Generate summary message (Hinglish friendly)
        message = self._generate_summary_message(
            session.correct_count,
            session.total_questions,
            accuracy,
            mastery_changes,
            review_due
        )

        # Update session in DB
        session.status = "completed"
        session.ended_at = datetime.utcnow()

        async with async_session_maker() as db:
            db.add(session)
            await db.commit()

        # Remove from active sessions cache
        if session_id in self._active_sessions:
            del self._active_sessions[session_id]

        logger.info(
            f"Ended session {session_id}: "
            f"{session.correct_count}/{session.total_questions} ({accuracy:.0%})"
        )

        return {
            "total_questions": session.total_questions,
            "correct_count": session.correct_count,
            "accuracy": round(accuracy, 2),
            "mastery_changes": mastery_changes,
            "streak": session.streak,
            "review_due": review_due[:5],  # Show top 5
            "message": message
        }

    def _generate_summary_message(
        self,
        correct: int,
        total: int,
        accuracy: float,
        mastery_changes: List[Dict[str, Any]],
        review_due: List[Dict[str, Any]]
    ) -> str:
        """
        Generate personalized summary message.

        Hinglish friendly, encouraging tone for Indian students.
        """
        # Accuracy-based opening
        if accuracy == 1.0:
            msg = f"Perfect! {correct}/{total} sahi! 🎉 Wah!"
        elif accuracy >= 0.8:
            msg = f"Bahut badhiya! {correct}/{total} sahi! 👏"
        elif accuracy >= 0.6:
            msg = f"Good work! {correct}/{total} sahi. Keep it up! 💪"
        elif accuracy >= 0.4:
            msg = f"{correct}/{total} sahi. Thoda aur practice karo! 📚"
        else:
            msg = f"{correct}/{total} sahi. Mat chhodo, practice makes perfect! 🔥"

        # Mastery changes
        improved = [m for m in mastery_changes if m["change"] > 0]
        if improved:
            changes_str = ", ".join(
                f"{m['topic_name']} {int(m['mastery_before']*100)}%→{int(m['mastery_after']*100)}%"
                for m in improved[:3]
            )
            msg += f"\nMastery: {changes_str}."

        # Review schedule
        if review_due:
            next_review = min(review_due, key=lambda x: x.get("due_in_days", 999))
            due_in = next_review.get("due_in_days", 1)
            if due_in == 0:
                msg += "\nAaj hi review karo! 📝"
            elif due_in == 1:
                msg += "\nKal review ka din hai! 📅"
            else:
                msg += f"\n{next_review.get('topic_name', 'Topic')} ka review {due_in} din mein."

        # Streak bonus
        if correct == total and total >= 3:
            msg += "\nStreak bonus! Agle session mein bonus question! 🔥"

        return msg

    def _map_mastery_to_difficulty(self, mastery_score: float) -> float:
        """
        Map mastery score (0-1) to difficulty level (0.5-2.0).

        - Mastery < 0.3: Easy (0.5-0.7) - naye concepts
        - Mastery 0.3-0.5: Medium-Easy (0.7-1.0)
        - Mastery 0.5-0.7: Medium (1.0-1.3)
        - Mastery 0.7-0.9: Medium-Hard (1.3-1.6)
        - Mastery > 0.9: Hard (1.6-2.0)
        """
        if mastery_score < 0.3:
            return 0.5
        elif mastery_score < 0.5:
            return 0.7
        elif mastery_score < 0.7:
            return 1.0
        elif mastery_score < 0.9:
            return 1.3
        else:
            return 1.6

    def _topic_to_problem_type(self, topic_id: str, subject: str) -> str:
        """
        Map topic ID to problem type for question generator registry.

        This is the bridge between curriculum topics and question generators.
        """
        # Normalize topic_id
        topic_lower = topic_id.lower().replace(" ", "_").replace("-", "_")

        # Direct mappings for common math topics (ISC Class 11)
        math_topic_map = {
            # Limits
            "limits": "limits",
            "limit": "limits",
            "limits_and_continuity": "limits",
            # Derivatives
            "derivatives": "derivatives",
            "derivative": "derivatives",
            "differentiation": "derivatives",
            # Integrals
            "integrals": "integrals",
            "integral": "integrals",
            "integration": "integrals",
            # Algebra
            "algebra": "algebra",
            "quadratic_equations": "algebra",
            "complex_numbers": "algebra",
            "binomial_theorem": "algebra",
            "permutations_combinations": "algebra",
            # Trigonometry
            "trigonometry": "trigonometry",
            "trigonometric_equations": "trigonometry",
            "inverse_trigonometric": "trigonometry",
            # Coordinate Geometry
            "coordinate_geometry": "coordinate_geometry",
            "straight_lines": "coordinate_geometry",
            "conic_sections": "coordinate_geometry",
            # Statistics
            "statistics": "statistics",
            "probability": "probability",
            # Sets
            "sets": "sets_relations",
            "relations": "sets_relations",
            "functions": "functions",
        }

        # Check direct mapping
        if topic_lower in math_topic_map:
            return math_topic_map[topic_lower]

        # Check partial match
        for key, value in math_topic_map.items():
            if key in topic_lower or topic_lower in key:
                return value

        # Default fallback
        if subject.lower() in ["mathematics", "maths", "math"]:
            return "math_arithmetic"

        return topic_lower

    def _get_topic_display_name(self, topic_id: str) -> str:
        """Convert topic_id to human-readable display name."""
        display_names = {
            "limits": "Limits",
            "derivatives": "Derivatives",
            "integrals": "Integrals",
            "algebra": "Algebra",
            "trigonometry": "Trigonometry",
            "coordinate_geometry": "Coordinate Geometry",
            "statistics": "Statistics",
            "probability": "Probability",
            "sets_relations": "Sets & Relations",
            "functions": "Functions"
        }
        return display_names.get(topic_id, topic_id.replace("_", " ").title())

    async def _get_default_topics(self, subject: str) -> List[str]:
        """Get default topics for a subject (for new students)."""
        # ISC Class 11 Mathematics default topics
        if subject.lower() in ["mathematics", "maths", "math"]:
            return [
                "limits",
                "derivatives",
                "algebra",
                "trigonometry",
                "coordinate_geometry"
            ]
        return ["general"]

    async def _get_session_data(
        self, session_id: str
    ) -> Optional[Dict[str, Any]]:
        """
        Get session data from cache or DB.

        Cache hit -> instant (<1ms)
        Cache miss -> DB query (~10-50ms)
        """
        # Check cache first (fast path)
        if session_id in self._active_sessions:
            return self._active_sessions[session_id]

        # Load from DB (slow path)
        try:
            async with async_session_maker() as db:
                result = await db.execute(
                    select(PracticeSession).where(
                        PracticeSession.session_id == session_id
                    )
                )
                session = result.scalar_one_or_none()

                if not session:
                    return None

                # Reconstruct session data
                masteries = await self._get_student_masteries(
                    session.student_id, session.subject
                )

                composition = {"questions": [], "topic_ids": []}
                if session.questions:
                    try:
                        composition["questions"] = json.loads(session.questions)
                    except json.JSONDecodeError:
                        pass
                if session.topic_ids:
                    try:
                        composition["topic_ids"] = json.loads(session.topic_ids)
                    except json.JSONDecodeError:
                        pass

                return {
                    "session": session,
                    "masteries": masteries,
                    "composition": composition,
                    "question_history": [],
                    "started_at": session.started_at
                }
        except Exception as e:
            logger.error(f"Failed to load session {session_id}: {e}")
            return None

    async def _check_online_status(self) -> bool:
        """
        Check if device is online.

        In production, this would check network connectivity.
        For now, assume online (Android app handles offline detection).
        """
        # TODO: In production, check actual network status
        # Could use: socket.create_connection(('8.8.8.8', 53), timeout=1)
        return True

    async def _queue_answer(
        self, session_id: str, question_id: str, answer: Any, time_ms: int
    ):
        """Queue answer for later sync when back online."""
        if session_id not in self._offline_queue:
            self._offline_queue[session_id] = deque()

        self._offline_queue[session_id].append({
            "question_id": question_id,
            "answer": answer,
            "time_ms": time_ms,
            "timestamp": datetime.utcnow().isoformat()
        })

        logger.debug(f"Queued answer for session {session_id}")

    # ========================================================================
    # Cleanup and maintenance
    # ========================================================================

    async def cleanup_stale_sessions(self, max_age_hours: int = 24):
        """
        Clean up stale active sessions from cache.

        Args:
            max_age_hours: Max age before cleanup (default 24 hours)
        """
        now = datetime.utcnow()
        to_remove = []

        for session_id, data in self._active_sessions.items():
            started_at = data.get("started_at", now)
            age_hours = (now - started_at).total_seconds() / 3600

            if age_hours > max_age_hours:
                session = data.get("session")
                if session and session.status == "active":
                    # Mark as abandoned
                    session.status = "abandoned"
                    session.ended_at = now

                    async with async_session_maker() as db:
                        db.add(session)
                        await db.commit()

                to_remove.append(session_id)

        for session_id in to_remove:
            del self._active_sessions[session_id]
            logger.info(f"Cleaned up stale session {session_id}")

        return {"cleaned_up": len(to_remove)}

    def get_stats(self) -> Dict[str, Any]:
        """Get service statistics (for monitoring)."""
        return {
            "active_sessions": len(self._active_sessions),
            "offline_queues": len(self._offline_queue),
            "queued_answers": sum(len(q) for q in self._offline_queue.values())
        }


# ============================================================================
# Singleton instance - ek baar banega, poori app mein use hoga
# ============================================================================

practice_service = PracticeService()


# ============================================================================
# Convenience functions (thin wrappers for backward compatibility)
# ============================================================================

async def start_practice_session(
    student_id: str,
    subject: str,
    topic_ids: Optional[List[str]] = None,
    num_questions: int = 5
) -> Dict[str, Any]:
    """Start a practice session."""
    return await practice_service.start_session(
        student_id, subject, topic_ids, num_questions
    )


async def submit_answer(
    session_id: str,
    question_id: str,
    answer: Any,
    time_ms: int
) -> Dict[str, Any]:
    """Submit answer and get feedback."""
    return await practice_service.submit_answer(session_id, question_id, answer, time_ms)


async def get_practice_session(session_id: str) -> Dict[str, Any]:
    """Get session state."""
    return await practice_service.get_session(session_id)


async def end_practice_session(session_id: str) -> Dict[str, Any]:
    """End session and get summary."""
    return await practice_service.end_session(session_id)


async def resume_practice_session(session_id: str) -> Dict[str, Any]:
    """Resume interrupted session."""
    return await practice_service.resume_session(session_id)
