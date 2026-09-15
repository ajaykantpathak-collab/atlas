"""
Junior API Router — Voice-first learning for Class 1-5 (CISCE/ICSE aligned)
Mount at: app.include_router(router)
"""

from __future__ import annotations

import enum
import logging
import math
from datetime import date, datetime
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_async_session
from services.llm_client import LLMClient
from services.mastery_sync import MasterySyncService
from services.practice_service import PracticeService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/junior", tags=["junior-learning"])

# ──────────────────────────────────────────────
# Enums
# ──────────────────────────────────────────────
class ClassLevel(int, enum.Enum):
    CLASS_1 = 1
    CLASS_2 = 2
    CLASS_3 = 3
    CLASS_4 = 4
    CLASS_5 = 5


class Subject(str, enum.Enum):
    MATHS = "maths"
    ENGLISH = "english"
    HINDI = "hindi"
    EVS = "evs"
    COMPUTER = "computer"


class VoiceLanguage(str, enum.Enum):
    ENGLISH = "en-IN"
    HINGLISH = "en-IN"
    HINDI = "hi-IN"


class BadgeType(str, enum.Enum):
    FIRST_STEPS = "first_steps"
    STREAK_3 = "streak_3"
    STREAK_7 = "streak_7"
    STREAK_14 = "streak_14"
    STREAK_30 = "streak_30"
    SPEEDY = "speedy"
    STORY_LOVER = "story_lover"
    PERFECT_LESSON = "perfect_lesson"
    HELPER = "helper"


class StoryTheme(str, enum.Enum):
    ANIMALS = "animals"
    MARKET = "market"
    FAIRYTALE = "fairytale"
    SPACE = "space"
    SPORTS = "sports"
    FESTIVAL = "festival"
    NATURE = "nature"


class DifficultyLevel(str, enum.Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


# ──────────────────────────────────────────────
# Pydantic v2 Schemas
# ──────────────────────────────────────────────

class LessonStartRequest(BaseModel):
    """Start a new practice lesson for a junior student."""
    model_config = ConfigDict(str_strip_whitespace=True, json_schema_extra={
        "example": {
            "student_id": "stu_10042",
            "class_level": 3,
            "subject": "maths",
            "topic": "addition",
            "language": "hinglish",
            "difficulty": "easy"
        }
    })

    student_id: str = Field(..., min_length=2, max_length=64, description="Unique student identifier")
    class_level: ClassLevel = Field(..., description="Student's current class (1-5)")
    subject: Subject = Field(..., description="Subject to practice")
    topic: str = Field(..., min_length=1, max_length=120, description="Topic within the subject")
    language: VoiceLanguage | str = Field(
        default=VoiceLanguage.HINGLISH,
        description="Preferred voice/response language"
    )
    difficulty: DifficultyLevel = Field(default=DifficultyLevel.EASY)
    total_questions: int = Field(default=5, ge=1, le=15, description="Number of questions in lesson")


class QuestionPayload(BaseModel):
    """A single question inside a lesson."""
    model_config = ConfigDict(from_attributes=True)

    question_id: str
    text: str
    question_type: str = Field(description="mcq / fill_blank / true_false / number")
    options: list[str] | None = Field(default=None, description="Options for MCQ")
    hint: str | None = None
    voice_prompt: str | None = Field(default=None, description="Cached TTS hint for the question")
    points: int = Field(default=10, ge=1, le=100)


class LessonStartResponse(BaseModel):
    """Returned when a lesson is started."""
    model_config = ConfigDict(from_attributes=True)

    lesson_id: str
    student_id: str
    subject: str
    topic: str
    difficulty: str
    language: str
    total_questions: int
    current_question: QuestionPayload
    encouragement: str = Field(description="Kid-friendly opening message in chosen language")
    progress_summary: dict[str, Any] | None = None


class AnswerSubmitRequest(BaseModel):
    """Submit a voice-transcribed answer."""
    model_config = ConfigDict(str_strip_whitespace=True)

    lesson_id: str = Field(..., min_length=1)
    student_id: str = Field(..., min_length=1)
    transcript: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="Transcribed voice answer from the student"
    )
    confidence: float | None = Field(
        default=None,
        ge=0.0,
        le=1.0,
        description="ASR confidence score (0-1) from the voice engine"
    )
    response_time_sec: float | None = Field(
        default=None,
        ge=0.0,
        description="Time student took to answer, for speed-star tracking"
    )
    question_id: str | None = Field(
        default=None,
        description="Explicit question ID if client can provide it (optional)"
    )

    @field_validator("confidence")
    @classmethod
    def validate_confidence(cls, v: float | None) -> float | None:
        if v is not None and v < 0.0:
            raise ValueError("confidence must be between 0.0 and 1.0")
        return v


class AnswerFeedback(BaseModel):
    """Feedback on a single answer."""
    is_correct: bool
    correct_answer: str | None = None
    explanation: str | None = None
    stars_earned: int = Field(ge=0, le=5)
    encouragement: str
    hint_used: bool = False


class AnswerSubmitResponse(BaseModel):
    """Result after submitting an answer."""
    model_config = ConfigDict(from_attributes=True)

    lesson_id: str
    question_id: str
    feedback: AnswerFeedback
    lesson_complete: bool
    lesson_summary: dict[str, Any] | None = None
    new_badges: list[dict[str, Any]] | None = None
    next_action: str | None = Field(
        default=None,
        description="Suggested next action e.g. 'start_new_lesson', 'continue', 'celebrate'"
    )


class BadgeInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    badge_type: BadgeType
    name: str
    description: str
    emoji: str
    earned_at: datetime | None = None
    is_new: bool = False


class ProgressResponse(BaseModel):
    """Full progress report for a student."""
    model_config = ConfigDict(from_attributes=True)

    student_id: str
    class_level: int
    name: str | None = None
    total_lessons_completed: int
    total_stars: int
    current_streak_days: int
    longest_streak_days: int
    mastery_by_subject: dict[str, float]
    badges: list[BadgeInfo]
    recent_lessons: list[dict[str, Any]] = Field(default_factory=list)
    weekly_goal_progress: float = Field(ge=0.0, le=1.0, description="0.0 to 1.0")
    encouragement: str


class StoryGenerateRequest(BaseModel):
    """Generate a story-based math/EVS problem."""
    model_config = ConfigDict(str_strip_whitespace=True, json_schema_extra={
        "example": {
            "class_level": 3,
            "subject": "maths",
            "topic": "multiplication",
            "theme": "market",
            "difficulty": "easy",
            "language": "hinglish",
            "include_visual_aid": True
        }
    })

    class_level: ClassLevel = Field(..., description="Target class for age-appropriate content")
    subject: Subject = Field(..., description="Subject the story problem covers")
    topic: str = Field(..., min_length=1, max_length=120, description="Specific topic/concept")
    theme: StoryTheme = Field(default=StoryTheme.MARKET, description="Story theme kids can relate to")
    difficulty: DifficultyLevel = Field(default=DifficultyLevel.EASY)
    language: str | VoiceLanguage = Field(
        default=VoiceLanguage.HINGLISH,
        description="Response language"
    )
    include_visual_aid: bool = Field(
        default=True,
        description="Request a Mermaid/ASCII diagram hint"
    )
    student_interests: list[str] = Field(
        default_factory=list,
        max_length=5,
        description="Optional interests e.g. ['cricket', 'cooking'] for personalisation"
    )


class StoryProblemResponse(BaseModel):
    """A generated story problem with solution and hints."""
    model_config = ConfigDict(from_attributes=True)

    story_id: str
    title: str
    story_text: str
    problem_statement: str
    correct_answer: str
    hints: list[str]
    visual_aid: str | None = Field(
        default=None,
        description="ASCII / Mermaid diagram or description for parents/teachers"
    )
    follow_up_questions: list[str] = Field(default_factory=list, description="Extension questions")
    difficulty: str
    subject: str
    topic: str
    voice_narration_hint: str | None = Field(
        default=None,
        description="Markers for TTS engine (pause, emphasis, etc.)"
    )


# ──────────────────────────────────────────────
# Service Dependencies
# ──────────────────────────────────────────────

async def _get_practice_service(
    session: Annotated[AsyncSession, Depends(get_async_session)],
) -> PracticeService:
    return PracticeService(session)


async def _get_mastery_service(
    session: Annotated[AsyncSession, Depends(get_async_session)],
) -> MasterySyncService:
    return MasterySyncService(session)


async def _get_llm_client() -> LLMClient:
    return LLMClient()


# ──────────────────────────────────────────────
# Helpers — Kid-friendly messages
# ──────────────────────────────────────────────

_ENCOURAGEMENT_OPEN: dict[str, list[str]] = {
    "en": [
        "Let's go! You're going to rock this lesson! 🚀",
        "Ready, set, learn! I believe in you! ⭐",
        "A new adventure in learning starts now! 🌟",
    ],
    "hinglish": [
        "Chalo shuru karte hain! Tum bahut tez ho! 🚀",
        "Tayyar ho? Aaj hum kuch mast seekhenge! ⭐",
        "Nayi seekh ki shuruat — come on! 🌟",
    ],
    "hi": [
        "चलो शुरू करते हैं! तुम बहुत तेज हो! 🚀",
        "तैयार हो? आज हम कुछ अद्भुत सीखेंगे! ⭐",
        "नई ज्ञान की शुरुआत — चलो! 🌟",
    ],
}

_ENCOURAGEMENT_CORRECT: dict[str, list[str]] = {
    "en": ["Shabash! Bilkul sahi! 🌟", "Amazing! You nailed it! ⭐", "Perfect! Keep it up! 🎉"],
    "hinglish": ["Shabash! Bilkul sahi jawab! 🌟", "Waah! Tumne kar diya! ⭐", "Bahut badhiya! 🔥"],
    "hi": ["शाबाश! बिल्कुल सही! 🌟", "वाह! तुमने कर दिया! ⭐", "बहुत बढ़िया! 🔥"],
}

_ENCOURAGEMENT_TRY_AGAIN: dict[str, list[str]] = {
    "en": ["Nice try! Let's give it another go! 💪", "Almost there! Try once more! 🤔"],
    "hinglish": ["Achha try tha! Phir se try karo! 💪", "Bas thoda aur! Dobara koshish karo! 🤔"],
    "hi": ["अच्छा प्रयास था! फिर से कोशिश करो! 💪", "बस थोड़ा और! दोबारा प्रयास करो! 🤔"],
}


def _pick(msgs: dict[str, list[str]], lang: str) -> str:
    key = "hinglish" if lang in ("hinglish", "hi-en") else ("hi" if lang == "hi" else "en")
    import random
    return random.choice(msgs.get(key, msgs["en"]))


def _lang_key(language: str | VoiceLanguage) -> str:
    if isinstance(language, VoiceLanguage):
        return language.value
    return language


def _subject_class_map(class_level: int, subject: str) -> dict[str, float]:
    """Return a realistic mastery mock map keyed by subject."""
    seeds = {
        1: {"maths": 0.6, "english": 0.5, "hindi": 0.7, "evs": 0.55, "computer": 0.4},
        2: {"maths": 0.55, "english": 0.5, "hindi": 0.65, "evs": 0.6, "computer": 0.45},
        3: {"maths": 0.5, "english": 0.55, "hindi": 0.6, "evs": 0.5, "computer": 0.5},
        4: {"maths": 0.45, "english": 0.5, "hindi": 0.55, "evs": 0.45, "computer": 0.55},
        5: {"maths": 0.4, "english": 0.5, "hindi": 0.5, "evs": 0.4, "computer": 0.6},
    }
    return seeds.get(class_level, seeds[3])


_BADGE_META: dict[BadgeType, dict[str, str]] = {
    BadgeType.FIRST_STEPS: {
        "name": "Pehla Kadam", "description": "Completed your first lesson!", "emoji": "👣"
    },
    BadgeType.STREAK_3: {
        "name": "3 Din ki Lagaam", "description": "3-day learning streak!", "emoji": "🔥"
    },
    BadgeType.STREAK_7: {
        "name": "Hafta ka Hero", "description": "7-day learning streak!", "emoji": "⭐"
    },
    BadgeType.STREAK_14: {
        "name": "Do Hafta ka Dynamo", "description": "14-day learning streak!", "emoji": "💎"
    },
    BadgeType.STREAK_30: {
        "name": "Mahine ka Master", "description": "30-day learning streak!", "emoji": "🏆"
    },
    BadgeType.SPEEDY: {
        "name": "Tez Tod", "description": "Answered 10 questions super fast!", "emoji": "⚡"
    },
    BadgeType.STORY_LOVER: {
        "name": "Kahani King", "description": "Solved 5 story problems!", "emoji": "📖"
    },
    BadgeType.PERFECT_LESSON: {
        "name": "Sahi Savera", "description": "Aced a full lesson!", "emoji": "🌟"
    },
    BadgeType.HELPER: {
        "name": "Madadgar", "description": "Helped a friend learn!", "emoji": "🤝"
    },
}

_WEEKLY_TARGET_LESSONS = 7


# ──────────────────────────────────────────────
# Helpers — Badge evaluation
# ──────────────────────────────────────────────

def _evaluate_new_badges(
    *,
    total_lessons: int,
    streak: int,
    current_streak: int,
    story_problems_solved: int,
    fast_answers_count: int,
    perfect_lessons: int,
) -> list[BadgeInfo]:
    """Return BadgeInfo for any newly earned badges."""
    new: list[BadgeInfo] = []
    checks: list[tuple[BadgeType, bool]] = [
        (BadgeType.FIRST_STEPS, total_lessons >= 1),
        (BadgeType.STREAK_3, streak >= 3),
        (BadgeType.STREAK_7, streak >= 7),
        (BadgeType.STREAK_14, streak >= 14),
        (BadgeType.STREAK_30, streak >= 30),
        (BadgeType.STORY_LOVER, story_problems_solved >= 5),
        (BadgeType.SPEEDY, fast_answers_count >= 10),
    ]
    for badge_type, earned in checks:
        if earned:
            meta = _BADGE_META[badge_type]
            new.append(
                BadgeInfo(
                    badge_type=badge_type,
                    name=meta["name"],
                    description=meta["description"],
                    emoji=meta["emoji"],
                    earned_at=datetime.utcnow(),
                    is_new=True,
                )
            )
    return new


# ──────────────────────────────────────────────
# ENDPOINT 1 — Start a Lesson
# ──────────────────────────────────────────────

@router.post(
    "/lesson/start",
    response_model=LessonStartResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Start a new voice-first lesson",
    description=(
        "Creates a practice lesson tailored to the student's class level, subject, "
        "and preferred language. Returns the first question along with a voice-friendly "
        "encouragement message (Hinglish/Hindi for junior students)."
    ),
    responses={
        201: {"description": "Lesson created successfully"},
        400: {"description": "Invalid input (e.g., unsupported class level)"},
        404: {"description": "Student not found"},
    },
)
async def start_lesson(
    payload: LessonStartRequest,
    practice: Annotated[PracticeService, Depends(_get_practice_service)] = None,
    mastery: Annotated[MasterySyncService, Depends(_get_mastery_service)] = None,
) -> LessonStartResponse:
    """
    Start a new lesson for a Class 1-5 student.

    **Voice-first design**: The response includes `voice_prompt` on each question
    so the frontend can feed it directly to a TTS engine.
    """
    try:
        lesson = await practice.create_lesson(
            student_id=payload.student_id,
            class_level=int(payload.class_level),
            subject=payload.subject.value,
            topic=payload.topic,
            difficulty=payload.difficulty.value,
            total_questions=payload.total_questions,
            language=_lang_key(payload.language),
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Failed to create lesson for %s: %s", payload.student_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong while creating your lesson. Please try again!",
        ) from exc

    mastery_data = await mastery.get_student_mastery(
        student_id=payload.student_id,
        subject=payload.subject.value,
    )

    first_q = lesson.questions[0] if lesson.questions else None
    if first_q is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Lesson created but has no questions. Please contact support.",
        )

    question_payload = QuestionPayload(
        question_id=first_q.id,
        text=first_q.text,
        question_type=first_q.type,
        options=getattr(first_q, "options", None),
        hint=first_q.hint,
        voice_prompt=getattr(first_q, "voice_prompt", None),
        points=getattr(first_q, "points", 10),
    )

    lang = _lang_key(payload.language)
    encouragement = _pick(_ENCOURAGEMENT_OPEN, lang)

    return LessonStartResponse(
        lesson_id=lesson.id,
        student_id=payload.student_id,
        subject=payload.subject.value,
        topic=payload.topic,
        difficulty=payload.difficulty.value,
        language=lang,
        total_questions=payload.total_questions,
        current_question=question_payload,
        encouragement=encouragement,
        progress_summary={
            "subject_mastery_pct": round(mastery_data.get("mastery_pct", 0.0), 1),
            "completed_in_topic": mastery_data.get("completed_count", 0),
        }
        if mastery_data
        else None,
    )


# ──────────────────────────────────────────────
# ENDPOINT 2 — Submit Voice Answer
# ──────────────────────────────────────────────

@router.post(
    "/lesson/{lesson_id}/answer",
    response_model=AnswerSubmitResponse,
    summary="Submit a transcribed voice answer",
    description=(
        "Takes the transcript from the student's voice answer, evaluates it, "
        "returns Hinglish/Hindi encouragement with stars earned. Handles low-ASR "
        "confidence gracefully by offering the student a chance to re-speak."
    ),
    responses={
        200: {"description": "Answer evaluated"},
        400: {"description": "Empty transcript or invalid lesson"},
        404: {"description": "Lesson or student not found"},
    },
)
async def submit_answer(
    lesson_id: str,
    payload: AnswerSubmitRequest,
    practice: Annotated[PracticeService, Depends(_get_practice_service)] = None,
    mastery: Annotated[MasterySyncService, Depends(_get_mastery_service)] = None,
    llm: Annotated[LLMClient, Depends(_get_llm_client)] = None,
) -> AnswerSubmitResponse:
    """
    Evaluate a voice-transcribed answer.

    **Low-confidence handling**: If the ASR confidence is below 0.5, the API
    still evaluates but flags it in the response so the UI can prompt the
    student: "Kya tumne sahi bola? Ek baar phir bolo!"
    """
    # ---- validate transcript isn't just whitespace (already handled by Pydantic) ----
    if payload.confidence is not None and payload.confidence < 0.3:
        logger.warning(
            "Very low ASR confidence (%.2f) for lesson %s, student %s",
            payload.confidence, lesson_id, payload.student_id,
        )

    try:
        result = await practice.evaluate_answer(
            lesson_id=lesson_id,
            student_id=payload.student_id,
            transcript=payload.transcript,
            confidence=payload.confidence,
            response_time_sec=payload.response_time_sec,
            question_id=payload.question_id,
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Answer evaluation failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not check your answer right now. Try again!",
        ) from exc

    is_correct: bool = result.get("is_correct", False)
    stars: int = result.get("stars", 0)
    correct_answer: str | None = result.get("correct_answer")
    explanation: str | None = result.get("explanation")
    question_id: str = payload.question_id or result.get("question_id", "unknown")
    lesson_complete: bool = result.get("lesson_complete", False)

    # ---- pick language from result or fallback ----
    lang = result.get("language", "hinglish")

    if is_correct:
        encouragement = _pick(_ENCOURAGEMENT_CORRECT, lang)
    else:
        encouragement = _pick(_ENCOURAGEMENT_TRY_AGAIN, lang)

    # If ASR was low-confidence, prepend a gentle prompt
    if payload.confidence is not None and payload.confidence < 0.5:
        low_conf_msg = {
            "en": " (I couldn't hear clearly — is this what you said?)",
            "hinglish": " (Thoda unclear tha — kya tumne yahi bola?)",
            "hi": " (थोड़ा अनस्पष्ट था — क्या तुमने यही कहा?)",
        }
        k = "hi" if lang == "hi" else ("hinglish" if lang in ("hinglish", "hi-en") else "en")
        encouragement += low_conf_msg.get(k, low_conf_msg["en"])

    feedback = AnswerFeedback(
        is_correct=is_correct,
        correct_answer=correct_answer,
        explanation=explanation,
        stars_earned=stars,
        encouragement=encouragement,
        hint_used=result.get("hint_used", False),
    )

    # ---- post-answer housekeeping ----
    lesson_summary: dict[str, Any] | None = None
    new_badges_list: list[dict[str, Any]] | None = None
    next_action: str | None = None

    if lesson_complete:
        try:
            summary = await practice.complete_lesson(lesson_id)
            lesson_summary = summary

            mastery_info = await mastery.record_lesson_completion(
                student_id=payload.student_id,
                lesson_id=lesson_id,
                score_pct=summary.get("score_pct", 0.0),
            )

            badges_raw = _evaluate_new_badges(
                total_lessons=mastery_info.get("total_lessons", 0),
                streak=mastery_info.get("current_streak", 0),
                current_streak=mastery_info.get("current_streak", 0),
                story_problems_solved=mastery_info.get("story_problems_solved", 0),
                fast_answers_count=mastery_info.get("fast_answers_count", 0),
                perfect_lessons=mastery_info.get("perfect_lessons", 0),
            )
            new_badges_list = [b.model_dump(mode="json") for b in badges_raw]

            if summary.get("score_pct", 0) >= 90:
                next_action = "celebrate"
            elif summary.get("score_pct", 0) >= 60:
                next_action = "start_new_lesson"
            else:
                next_action = "review_and_retry"

        except Exception as exc:
            logger.warning("Post-complete hook failed: %s", exc)
    else:
        # Still sync incremental mastery
        try:
            await mastery.record_answer(
                student_id=payload.student_id,
                lesson_id=lesson_id,
                is_correct=is_correct,
                response_time_sec=payload.response_time_sec,
            )
        except Exception:
            pass
        next_action = "continue"

    return AnswerSubmitResponse(
        lesson_id=lesson_id,
        question_id=question_id,
        feedback=feedback,
        lesson_complete=lesson_complete,
        lesson_summary=lesson_summary,
        new_badges=new_badges_list,
        next_action=next_action,
    )


# ──────────────────────────────────────────────
# ENDPOINT 3 — Student Progress
# ──────────────────────────────────────────────

@router.get(
    "/progress/{student_id}",
    response_model=ProgressResponse,
    summary="Get student progress with badges",
    description=(
        "Returns a full progress dashboard: completed lessons, stars, streaks, "
        "subject-wise mastery percentages, earned badges, and a weekly goal tracker. "
        "Kid-friendly, parent-visible."
    ),
    responses={
        200: {"description": "Progress retrieved"},
        404: {"description": "Student not found"},
    },
)
async def get_progress(
    student_id: str,
    mastery: Annotated[MasterySyncService, Depends(_get_mastery_service)] = None,
    practice: Annotated[PracticeService, Depends(_get_practice_service)] = None,
) -> ProgressResponse:
    """Fetch the full progress report for a junior student."""
    try:
        profile = await mastery.get_profile(student_id)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Failed to fetch profile for %s: %s", student_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Couldn't load progress. Try again!",
        ) from exc

    class_level: int = profile.get("class_level", 3)
    name: str | None = profile.get("name")

    # Mastery by subject
    mastery_map = profile.get("mastery_by_subject", {})
    full_map = _subject_class_map(class_level, "maths")
    full_map.update(mastery_map)

    # Badges
    badges_raw = profile.get("badges", [])
    badges: list[BadgeInfo] = []
    for b in badges_raw:
        bt = BadgeType(b["badge_type"]) if isinstance(b["badge_type"], str) else b["badge_type"]
        meta = _BADGE_META.get(bt, {"name": bt.value, "description": "", "emoji": "🏅"})
        badges.append(
            BadgeInfo(
                badge_type=bt,
                name=meta["name"],
                description=meta["description"],
                emoji=meta["emoji"],
                earned_at=b.get("earned_at"),
                is_new=b.get("is_new", False),
            )
        )

    # Recent lessons
    recent = profile.get("recent_lessons", [])

    # Weekly progress
    weekly_done = profile.get("weekly_lessons_completed", 0)
    weekly_pct = min(weekly_done / _WEEKLY_TARGET_LESSONS, 1.0)

    # Encouragement based on progress
    streak = profile.get("current_streak", 0)
    if streak >= 7:
        encouragement = f"🔥 {streak} din ka streak! Tum abhimaan ke layak ho!"
    elif weekly_pct >= 1.0:
        encouragement = "🎉 Saptahik lakshya pura kar diya! Tum shaandaar ho!"
    elif weekly_pct >= 0.5:
        encouragement = "💪 Aadha lakshya pura! Bas chhota sa aur mehnat!"
    else:
        encouragement = "🌟 Naye din, naye seekh! Chalo phir se start karte hain!"

    return ProgressResponse(
        student_id=student_id,
        class_level=class_level,
        name=name,
        total_lessons_completed=profile.get("total_lessons", 0),
        total_stars=profile.get("total_stars", 0),
        current_streak_days=streak,
        longest_streak_days=profile.get("longest_streak", 0),
        mastery_by_subject=full_map,
        badges=badges,
        recent_lessons=recent,
        weekly_goal_progress=round(weekly_pct, 2),
        encouragement=encouragement,
    )


# ──────────────────────────────────────────────
# ENDPOINT 4 — Generate Story Problem
# ──────────────────────────────────────────────

@router.post(
    "/story",
    response_model=StoryProblemResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate a voice-friendly story problem",
    description=(
        "Creates an age-appropriate, story-based learning problem (maths, EVS, etc.) "
        "for Class 1-5 students. The story is narrated in Hinglish/Hindi with themes "
        "kids relate to (market, animals, cricket, festivals). Includes hints, "
        "visual aids (ASCII/Mermaid), and follow-up extension questions."
    ),
    responses={
        201: {"description": "Story problem generated"},
        400: {"description": "Invalid parameters"},
    },
)
async def generate_story_problem(
    payload: StoryGenerateRequest,
    llm: Annotated[LLMClient, Depends(_get_llm_client)] = None,
    practice: Annotated[PracticeService, Depends(_get_practice_service)] = None,
    mastery: Annotated[MasterySyncService, Depends(_get_mastery_service)] = None,
) -> StoryProblemResponse:
    """
    Generate an engaging story problem for a Class 1-5 student.

    The story embeds a learning objective (e.g., addition, subtraction) in a
    narrative the student can relate to. Perfect for voice-first interaction
    where the parent/teacher reads the story and the student solves it aloud.
    """
    try:
        story_data = await llm.generate_story_problem(
            class_level=int(payload.class_level),
            subject=payload.subject.value,
            topic=payload.topic,
            theme=payload.theme.value,
            difficulty=payload.difficulty.value,
            language=str(payload.language),
            interests=payload.student_interests,
        )
    except Exception as exc:
        logger.exception("LLM story generation failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Couldn't create a story right now. Please try again!",
        ) from exc

    if not story_data or not story_data.get("story_text"):
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="The story engine returned an empty story. Try again!",
        )

    hints: list[str] = story_data.get("hints", [])
    if not hints:
        hints = [
            "Socho ki problem mein kya diya gaya hai — numbers aur words dono padho.",
            "Chhote numbers ko pehle solve karo, phir bade numbers par aao.",
            "Ek bar paper pe likh ke dekho — drawing banane se samajh aata hai!",
        ]

    visual_aid = story_data.get("visual_aid") if payload.include_visual_aid else None
    if visual_aid is None and payload.include_visual_aid:
        # Fallback: generate a simple ASCII representation
        visual_aid = _fallback_visual_aid(payload.subject.value, payload.topic)

    follow_ups = story_data.get("follow_up_questions", [])
    if not follow_ups:
        follow_ups = [
            "Agar situation thoda badal jaye, to answer kya hoga?",
            "Apna ek naya sawal banao isi story ke aas paas!",
        ]

    story_id = f"story_{payload.student_id or 'anon'}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"

    response = StoryProblemResponse(
        story_id=story_id,
        title=story_data.get("title", f"{payload.topic.title()} ki Kahani"),
        story_text=story_data["story_text"],
        problem_statement=story_data.get("problem_statement", ""),
        correct_answer=str(story_data.get("correct_answer", "")),
        hints=hints,
        visual_aid=visual_aid,
        follow_up_questions=follow_ups,
        difficulty=payload.difficulty.value,
        subject=payload.subject.value,
        topic=payload.topic,
        voice_narration_hint=story_data.get(
            "voice_narration_hint",
            "<speak>Read the story aloud. Pause briefly after the problem statement.</speak>",
        ),
    )

    # Log story generation for "Story Lover" badge tracking
    try:
        await mastery.record_story_solved(student_id="anonymous_story")
    except Exception:
        pass  # non-critical

    return response


# ──────────────────────────────────────────────
# Internal helpers
# ──────────────────────────────────────────────

def _fallback_visual_aid(subject: str, topic: str) -> str:
    """Generate a simple ASCII visual aid when LLM doesn't provide one."""
    subject = subject.lower()
    if "math" in subject or any(k in topic.lower() for k in ("add", "sub", "mul", "div", "number")):
        return ("🍎 🍎 🍎   🍎 🎒 🍎\n"
                "   2 + 3 = ? → 5 fruits total!\n"
                "\n"
                "[Draw this with your child on paper!]")
    if "evs" in subject or any(k in topic.lower() for k in ("plant", "animal", "tree", "water")):
        return ("☀️ → 🌱\n"
                "   Sun gives energy to plants.\n"
                "   🌱 uses sunlight to make food.\n"
                "   This is called Photosynthesis!")
    return "📝 Ask your child to draw the story on paper — drawing helps understanding!"


# ──────────────────────────────────────────────
# Health check (lightweight)
# ──────────────────────────────────────────────

@router.get(
    "/health",
    summary="Junior service health check",
    description="Lightweight health check for load balancers and monitoring.",
)
async def health_check() -> dict[str, str]:
    return {
        "service": "junior-api",
        "status": "ok",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat(),
    }
