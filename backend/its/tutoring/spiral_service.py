"""Spiral review scheduler for the DREAM_APP tutor.

Combines two data sources:
1. class_level_content (content_type='spiral_review'): pre-written 8-week
   spaced repetition plans with daily questions covering all topics.
2. ReviewItem table (SM-2 algorithm): individual items scheduled for review
   based on student performance.

The scheduler:
- Serves daily spiral review questions from the pre-written plans.
- Adds failed diagnostic/drill questions to the SM-2 review queue.
- Returns due items from both sources each day.
- Tracks which spiral review week/day the student is on.

Data used:
  - class_level_content (content_type='spiral_review')
  - ReviewItem (SM-2 spaced repetition)
  - enrichment_content (for linking review items back to nodes)

Persistence:
  - The lightweight SM-2 queue (``_SM2_QUEUE``) and the per-student
    plan start dates persist as JSON under ``backend/_cache/``
    (``spiral_review.json``), the same cache pattern the enhanced-nodes
    index uses, so review plans survive backend restarts.
  - Spiral review weeks are tracked for real: the plan starts the day a
    student first requests a review and each 7-day block advances the
    week (clamped to the plan's last week).
  - The tutor engine's mistake book (backend/its/solver/tutor.py) feeds
    this queue through :func:`schedule_tutor_mistake` so every graded
    wrong answer gets a spaced review (REVIEW_GAP logic).
"""

import json
import os
import re
import asyncio
from datetime import date, timedelta
from dataclasses import dataclass, field
from typing import Optional

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.enrichment import ClassLevelContent, EnrichmentContent
from backend.models.progress import ReviewItem
from backend.services.progress_service import ProgressService


# --------------------------------------------------------------------------- #
# Data structures
# --------------------------------------------------------------------------- #

@dataclass
class SpiralQuestion:
    """A single question from the spiral review plan."""
    week: int
    day: int
    topic: str
    question: str
    answer: str
    difficulty: str  # increases each week


@dataclass
class SpiralDaySession:
    """A single day's spiral review session."""
    subject: str
    class_level: int
    week: int
    day: int
    questions: list[SpiralQuestion] = field(default_factory=list)
    current_index: int = 0
    results: list[dict] = field(default_factory=list)


# In-memory session store
_SPIRAL_SESSIONS: dict[str, SpiralDaySession] = {}


# --------------------------------------------------------------------------- #
# Parser — extracts questions from spiral review .marker content
# --------------------------------------------------------------------------- #

# Pattern: "WEEK N DAY M" or "Week N, Day M" followed by questions
_WEEK_DAY_RE = re.compile(r'(?:WEEK|Week)\s+(\d+)\s*[,;]?\s*(?:DAY|Day)\s+(\d+)', re.IGNORECASE)
# Pattern: "Q: ..." or "Question: ..." followed by "A: ..." or "Answer: ..."
_QA_RE = re.compile(r'(?:Q|Question)\s*\d*\s*[:.\)]\s*(.*?)(?=\n\s*(?:A|Answer)\s*[:.\)])', re.DOTALL)
_A_RE = re.compile(r'(?:A|Answer)\s*[:.\)]\s*(.*?)(?=\n\s*(?:Q|Question|WEEK|Week|\Z))', re.DOTALL)
# Topic pattern: "TOPIC: ..." or "Topic: ..."
_TOPIC_RE = re.compile(r'(?:TOPIC|Topic)\s*[:.\)]\s*(.*?)(?=\n)', re.IGNORECASE)


def _parse_spiral_content(content: str) -> list[SpiralQuestion]:
    """Parse spiral review .marker content into individual questions."""
    questions = []

    # Split by week/day sections
    sections = re.split(r'(?=(?:WEEK|Week)\s+\d+\s*[,;]?\s*(?:DAY|Day)\s+\d+)', content)

    for section in sections:
        if not section.strip():
            continue

        # Extract week and day
        wd_match = _WEEK_DAY_RE.search(section)
        if not wd_match:
            continue

        week = int(wd_match.group(1))
        day = int(wd_match.group(2))

        # Extract topic
        topic_match = _TOPIC_RE.search(section)
        topic = topic_match.group(1).strip() if topic_match else "General"

        # Extract Q&A pairs
        qa_matches = list(_QA_RE.finditer(section))
        a_matches = list(_A_RE.finditer(section))

        for i, q_match in enumerate(qa_matches):
            q_text = q_match.group(1).strip()
            a_text = ""
            if i < len(a_matches):
                a_text = a_matches[i].group(1).strip()

            if q_text and len(q_text) > 5:
                # Difficulty increases each week
                difficulty = "easy" if week <= 2 else ("medium" if week <= 5 else "hard")
                questions.append(SpiralQuestion(
                    week=week,
                    day=day,
                    topic=topic,
                    question=q_text,
                    answer=a_text,
                    difficulty=difficulty,
                ))

    return questions


# --------------------------------------------------------------------------- #
# Cache
# --------------------------------------------------------------------------- #

_spiral_cache: dict[str, list[SpiralQuestion]] = {}  # {subject_class: questions}


async def _load_spiral_questions(
    db: AsyncSession, subject: str, class_level: int
) -> list[SpiralQuestion]:
    """Load and cache spiral review questions for a subject/class."""
    cache_key = f"{subject}_{class_level}"
    if cache_key in _spiral_cache:
        return _spiral_cache[cache_key]

    result = await db.execute(
        select(ClassLevelContent)
        .where(ClassLevelContent.content_type == "spiral_review")
        .where(ClassLevelContent.target_subject == subject)
    )

    all_questions = []
    for clc in result.scalars():
        if class_level in (clc.target_class or []):
            questions = _parse_spiral_content(clc.content or "")
            all_questions.extend(questions)

    _spiral_cache[cache_key] = all_questions
    return all_questions


# --------------------------------------------------------------------------- #
# Service
# --------------------------------------------------------------------------- #

# Persistent SM-2 review queue + plan start dates (backend/_cache/, the
# same JSON-cache pattern the enhanced-nodes index uses).  The review
# dict survives backend restarts; writes are atomic (tmp + os.replace)
# and best-effort — a failed write never blocks a request.
_CACHE_DIR = os.path.normpath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", "_cache"))
_REVIEW_STORE_PATH = os.path.join(_CACHE_DIR, "spiral_review.json")

_SM2_QUEUE: dict[str, dict] = {}     # "<user>:<item_type>:<item_id>" -> item
_PLAN_STARTS: dict[str, str] = {}    # "<user>:<subject>:<class>" -> iso date


def _load_review_store() -> None:
    """Best-effort restore of the review queue and plan starts."""
    try:
        with open(_REVIEW_STORE_PATH, encoding="utf-8") as fh:
            data = json.load(fh)
    except (OSError, ValueError):
        return
    if not isinstance(data, dict):
        return
    queue = data.get("sm2_queue")
    if isinstance(queue, dict):
        _SM2_QUEUE.clear()
        _SM2_QUEUE.update({str(k): v for k, v in queue.items()
                           if isinstance(v, dict)})
    starts = data.get("plan_starts")
    if isinstance(starts, dict):
        _PLAN_STARTS.clear()
        _PLAN_STARTS.update({str(k): str(v) for k, v in starts.items()})


def _save_review_store() -> None:
    """Atomic write of the review queue + plan starts.  Best-effort."""
    try:
        os.makedirs(_CACHE_DIR, exist_ok=True)
        tmp = _REVIEW_STORE_PATH + ".tmp"
        with open(tmp, "w", encoding="utf-8") as fh:
            json.dump({
                "version": 1,
                "sm2_queue": _SM2_QUEUE,
                "plan_starts": _PLAN_STARTS,
            }, fh)
        os.replace(tmp, _REVIEW_STORE_PATH)
    except Exception:
        pass


_load_review_store()


class SpiralService:
    """Spiral review scheduler — combines pre-written plans with SM-2."""

    @staticmethod
    async def get_daily_review(
        db: AsyncSession,
        user_id: str,
        subject: str = "",
        class_level: int = 0,
    ) -> dict:
        """Get today's spiral review session.

        Returns questions from:
        1. The pre-written spiral review plan (week/day based on student progress)
        2. SM-2 due items (questions the student failed before)
        """
        # 1. Get SM-2 due items
        sm2_items = await ProgressService.get_review_queue(db, user_id)

        # 2. Get spiral review questions for today
        spiral_questions = await _load_spiral_questions(db, subject, class_level)

        # Determine which week/day the student is on.
        # Day: calendar weekday (Mon-Fri; the weekend serves Friday's
        # review).  Week: tracked for real from the plan start date --
        # the first day the student requested a review for this
        # (user, subject, class) -- with each 7-day block advancing the
        # week, clamped to the plan's last written week.  The start
        # date persists in backend/_cache/spiral_review.json so the
        # plan position survives restarts (was hardcoded to 1).
        today = date.today()
        day_of_week = today.weekday() + 1  # Monday=1, Sunday=7
        if day_of_week > 5:
            day_of_week = 5  # Weekend → Friday's review

        plan_key = f"{user_id}:{subject}:{class_level}"
        start: Optional[date] = None
        raw_start = _PLAN_STARTS.get(plan_key)
        if raw_start:
            try:
                start = date.fromisoformat(str(raw_start))
            except ValueError:
                start = None
        if start is None or start > today:
            start = today
            _PLAN_STARTS[plan_key] = start.isoformat()
            _save_review_store()
        max_week = max((q.week for q in spiral_questions), default=1)
        week = min(((today - start).days // 7) + 1, max(1, max_week))

        # Filter questions for this week/day
        today_questions = [
            q for q in spiral_questions
            if q.week == week and q.day == day_of_week
        ]

        # Start a session
        session = SpiralDaySession(
            subject=subject,
            class_level=class_level,
            week=week,
            day=day_of_week,
            questions=today_questions,
        )
        session_id = f"spiral_{user_id}_{today.isoformat()}"
        _SPIRAL_SESSIONS[session_id] = session

        # Build response
        sm2_count = len(sm2_items)
        spiral_count = len(today_questions)

        if spiral_count == 0 and sm2_count == 0:
            return {
                "session_id": session_id,
                "has_review": False,
                "message": "No spiral review questions due today. Great job staying on top of your reviews!",
            }

        # Serve first question
        first_q = today_questions[0] if today_questions else None
        content = (
            f"**Spiral Review — Week {week}, Day {day_of_week}**\n"
            f"Subject: {subject.title()} | Class: {class_level}\n\n"
        )
        if sm2_count > 0:
            content += f"📋 You also have {sm2_count} SM-2 review items due.\n\n"
        content += f"**Questions today:** {spiral_count} (15-minute session)\n\n"

        if first_q:
            content += (
                f"---\n\n"
                f"**Q1** (Topic: {first_q.topic}, Difficulty: {first_q.difficulty})\n\n"
                f"{first_q.question}\n\n"
                f"Type your answer:"
            )

        return {
            "session_id": session_id,
            "has_review": True,
            "week": week,
            "day": day_of_week,
            "spiral_questions": spiral_count,
            "sm2_due": sm2_count,
            "current_question": 1,
            "content": content,
            "first_question": first_q.question if first_q else None,
        }

    @staticmethod
    async def submit_answer(
        db: AsyncSession,
        session_id: str,
        student_answer: str,
        user_id: str = "",
    ) -> dict:
        """Submit an answer to the current spiral review question."""
        session = _SPIRAL_SESSIONS.get(session_id)
        if not session:
            return {"error": "Spiral session not found"}

        if session.current_index >= len(session.questions):
            return {
                "complete": True,
                "message": "All spiral review questions completed for today!",
                "results": session.results,
            }

        question = session.questions[session.current_index]

        # Simple evaluation — check if answer matches
        from backend.ai.answer_evaluator import evaluate_answer
        result = await evaluate_answer(
            student_answer=student_answer,
            model_answer=question.answer,
            question_type="free_text",
            question_text=question.question,
        )

        session.results.append({
            "question": question.question[:200],
            "student_answer": student_answer[:200],
            "correct": result.correct,
            "score": result.score,
            "topic": question.topic,
        })

        session.current_index += 1

        # If wrong, add to SM-2 review queue
        if not result.correct and user_id:
            await SpiralService._add_to_sm2_queue(
                db, user_id, question, session.subject, session.class_level
            )

        # Check if session is complete
        if session.current_index >= len(session.questions):
            correct_count = sum(1 for r in session.results if r["correct"])
            total = len(session.results)
            return {
                "correct": result.correct,
                "score": result.score,
                "feedback": result.feedback,
                "complete": True,
                "summary": f"Spiral review complete! {correct_count}/{total} correct.",
                "results": session.results,
            }

        # Serve next question
        next_q = session.questions[session.current_index]
        return {
            "correct": result.correct,
            "score": result.score,
            "feedback": result.feedback,
            "complete": False,
            "next_question": next_q.question,
            "next_topic": next_q.topic,
            "next_difficulty": next_q.difficulty,
            "current_question": session.current_index + 1,
            "total_questions": len(session.questions),
        }

    @staticmethod
    async def _add_to_sm2_queue(
        db: AsyncSession,
        user_id: str,
        question: SpiralQuestion,
        subject: str,
        class_level: int,
    ) -> None:
        """Add a failed spiral review question to the SM-2 review queue."""
        today = date.today()
        # Due tomorrow (initial review)
        next_review = today + timedelta(days=1)

        item = ReviewItem(
            user_id=user_id,
            node_id=f"spiral_{subject}_{class_level}_w{question.week}_d{question.day}",
            question_text=question.question,
            answer_text=question.answer,
            repetitions=0,
            easiness_factor=2.5,
            interval_days=1,
            next_review_date=next_review,
            review_history=[],
        )
        db.add(item)
        await db.flush()

    @staticmethod
    async def add_review_item(
        user_id: str,
        node_id: str,
        item_type: str = "flashcard",
        item_id: str = "",
        quality: int = 3,
    ) -> None:
        """Add a review item to the persistent SM-2 queue.

        This is a lightweight version that doesn't require a DB session.
        Used by flashcard quiz to schedule future reviews; the queue
        persists in backend/_cache/spiral_review.json.
        """
        # SM-2 algorithm: quality 0-5, easiness factor starts at 2.5
        if quality >= 3:
            # Correct — schedule further out
            interval = 1 if quality == 3 else (3 if quality == 4 else 7)
        else:
            # Wrong — schedule for tomorrow
            interval = 1

        today = date.today()
        next_review = today + timedelta(days=interval)

        # Store in the persistent review queue (survives restarts),
        # keyed by user+item
        key = f"{user_id}:{item_type}:{item_id}"
        _SM2_QUEUE[key] = {
            "node_id": node_id,
            "item_type": item_type,
            "item_id": item_id,
            "quality": quality,
            "interval_days": interval,
            "next_review_date": next_review.isoformat(),
            "last_reviewed": today.isoformat(),
        }
        _save_review_store()

    @staticmethod
    async def get_review_plan(
        db: AsyncSession, user_id: str, subject: str = ""
    ) -> dict:
        """Get the review plan — items due for review from the SM-2 queue."""
        today = date.today()
        items = []
        for key, item in _SM2_QUEUE.items():
            if user_id and not key.startswith(user_id):
                continue
            try:
                due_date = date.fromisoformat(item.get("next_review_date", ""))
                if due_date <= today:
                    items.append({
                        "title": item.get("item_id", "Review item"),
                        "due": "now" if due_date == today else "overdue",
                        "node_id": item.get("node_id", ""),
                        "item_type": item.get("item_type", ""),
                    })
            except Exception:
                continue

        # Sort by due date
        items.sort(key=lambda x: x.get("due", ""))
        return {"items": items[:10], "total_due": len(items)}

    @staticmethod
    async def get_sm2_review_items(
        db: AsyncSession, user_id: str
    ) -> list[dict]:
        """Get all SM-2 review items due today."""
        items = await ProgressService.get_review_queue(db, user_id)
        return [
            {
                "item_id": str(item.id),
                "node_id": item.node_id,
                "question": item.question_text,
                "answer": item.answer_text,
                "repetitions": item.repetitions,
                "easiness_factor": item.easiness_factor,
                "interval_days": item.interval_days,
                "next_review": item.next_review_date.isoformat() if item.next_review_date else None,
            }
            for item in items
        ]


# --------------------------------------------------------------------------- #
# Tutor mistake-book feed (module-level, sync, no DB session)
# --------------------------------------------------------------------------- #

def schedule_tutor_mistake(
    student_id: str,
    concept_id: str,
    question: str,
    expected: str,
    gap_days: Optional[int] = None,
) -> None:
    """Feed a TutorEngine mistake-book entry into the review queue.

    This is the review hook the tutor engine
    (backend/its/solver/tutor.py) invokes whenever a graded wrong
    answer is booked into its mistake book.  The review becomes due
    after REVIEW_GAP days — the day-based twin of the tutor's
    REVIEW_GAP serve counter — so the same spaced-repetition rhythm
    governs both the serve loop and the spiral review plan.  The entry
    persists in backend/_cache/spiral_review.json.
    """
    if gap_days is None:
        try:
            from backend.its.solver.tutor import REVIEW_GAP
            gap_days = int(REVIEW_GAP)
        except Exception:
            gap_days = 2
    gap_days = max(1, int(gap_days))
    sid = str(student_id or "guest")
    today = date.today()
    key = f"{sid}:mistake:{concept_id}"
    _SM2_QUEUE[key] = {
        "node_id": str(concept_id or ""),
        "item_type": "mistake_review",
        "item_id": str(concept_id or ""),
        "question_text": str(question or "")[:500],
        "answer_text": str(expected or "")[:500],
        "quality": 0,
        "interval_days": gap_days,
        "next_review_date": (today + timedelta(days=gap_days)).isoformat(),
        "last_reviewed": today.isoformat(),
        "source": "tutor_mistake_book",
    }
    _save_review_store()
