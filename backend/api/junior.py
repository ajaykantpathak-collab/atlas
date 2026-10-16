"""
Junior API Router — /api/v1/junior/*
====================================
Thin adapter that wires backend/services/junior_service.py (voice-first
Class 1-5 activity engine) to the surface frontend/services/junior.service.ts
already calls:

    POST /api/v1/junior/lessons/start          -> StartLessonResponse
    POST /api/v1/junior/lessons/voice-answer   -> SubmitVoiceAnswerResponse
    GET  /api/v1/junior/students/{id}          -> student summary
    GET  /api/v1/junior/students/{id}/progress -> JuniorProgressResponse
    POST /api/v1/junior/stories/generate       -> GenerateStoryResponse

Response shapes match the TS contracts field-for-field (camelCase,
multilingual Record<SupportedLanguage, string>). The engine does all
generation/grading/badge work — this router only adapts shapes and
resolves the effective student id (authenticated user id wins).
"""

from __future__ import annotations

import logging
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field

from backend.deps import get_current_user_optional
from backend.models.user import User
from backend.services.junior_service import (
    AnswerResult,
    JuniorService,
    Subject,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/junior", tags=["junior"])

LANGS = ("en", "hi", "en-hi")

_SUBJECT_ALIASES = {
    "maths": Subject.MATHEMATICS,
    "math": Subject.MATHEMATICS,
    "mathematics": Subject.MATHEMATICS,
    "story_math": Subject.STORY_MATH,
    "hindi": Subject.HINDI,
    "english": Subject.ENGLISH,
    "science": Subject.SCIENCE,
    "environmental_studies": Subject.SCIENCE,
    "gk": Subject.GK,
    "social_studies": Subject.GK,
}

_DEFAULT_TOPICS = {
    Subject.MATHEMATICS: "tables",
    Subject.STORY_MATH: "story",
    Subject.HINDI: "spelling",
    Subject.ENGLISH: "spelling",
    Subject.SCIENCE: "science",
    Subject.GK: "gk",
}

_ACTIVITY_TYPE_TO_TS = {
    "story_problem": "quiz",
    "flash_card": "quiz",
    "fill_in_blank": "fill_blank",
    "listen_repeat": "listening",
    "spelling": "quiz",
    "counting": "quiz",
    "trivia": "quiz",
}

_CELEBRATION_TO_TS = {
    "confetti": "confetti",
    "stars": "star",
    "star": "star",
    "clapping": "confetti",
    "trophy": "trophy",
}

_RESULT_TO_FEEDBACK = {
    AnswerResult.CORRECT: "correct",
    AnswerResult.PARTIAL: "partial",
    AnswerResult.INCORRECT: "incorrect",
    AnswerResult.NEEDS_HINT: "try_again",
    AnswerResult.NEEDS_REPEAT: "try_again",
}

_GRADE_DIFFICULTY = {1: "easy", 2: "easy", 3: "medium", 4: "medium", 5: "hard"}


# ─────────────────────────────────────────────
# Request models (TS contract + extensions)
# ─────────────────────────────────────────────
class StartLessonRequest(BaseModel):
    grade: int = Field(default=3, ge=1, le=5)
    subject: str = "mathematics"
    preferredLanguage: str = "en-hi"
    lessonId: Optional[str] = None
    activityType: Optional[str] = None
    # extensions — used only when the request is unauthenticated
    studentId: Optional[str] = None
    topic: Optional[str] = None


class VoiceAnswerRequest(BaseModel):
    sessionId: str
    stepNumber: int = 1
    audioDataUri: str = ""
    durationMs: int = 0
    language: str = "en-hi"
    autoSubmit: bool = False
    # extension — browser SpeechRecognition transcript (the engine grades text)
    transcript: str = ""
    answer: Optional[str] = None


class StoryGenerateRequest(BaseModel):
    grade: int = Field(default=3, ge=1, le=5)
    subject: str = "mathematics"
    theme: str = "adventure"
    language: str = "en-hi"
    wordCountTarget: int = 120
    difficulty: str = "medium"
    includeVocabularyList: bool = False
    includeComprehensionQuestions: bool = False
    studentId: Optional[str] = None


# ─────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────
def _svc() -> JuniorService:
    return JuniorService()


def _resolve_student_id(user: Optional[User], explicit: Optional[str]) -> str:
    """Bind a request to a junior student id.

    Authenticated callers are ALWAYS their own id (an explicit id is
    ignored — it can never widen access).  Anonymous callers keep the
    device-generated junior ids (e.g. ``kid-tab-7f3a``) BUT may not name
    a UUID: a UUID is a real account's users.id, and reading its mastery
    without a token was an IDOR (WS-D 2026-10-10).
    """
    if user is not None:
        return str(user.id)
    if explicit and str(explicit).strip():
        rid = str(explicit).strip()
        try:
            uuid.UUID(rid)
        except (ValueError, AttributeError, TypeError):
            return rid  # device/local id — the anonymous junior flow
        from fastapi import HTTPException as _HX
        from fastapi import status as _st
        raise _HX(
            _st.HTTP_401_UNAUTHORIZED,
            detail="Sign in to view this student's progress.",
        )
    return "guest_junior"


def _parse_subject(raw: str) -> Subject:
    s = _SUBJECT_ALIASES.get((raw or "").strip().lower())
    if s is None:
        raise HTTPException(status_code=422, detail=f"Unsupported subject: {raw}")
    return s


def _lang_record(hi: Optional[str], en: Optional[str]) -> Dict[str, str]:
    """Multilingual record. The engine speaks Hinglish — 'en-hi' carries it.

    When only the Hinglish slot exists, 'en' gets it (Latin-script text is
    readable for an English-script learner) but _synth marks it so the
    client can badge the content instead of pretending it is authored
    English. 'hi' Devanagari is NOT fabricated — there is no
    transliteration on the box.
    """
    if hi is None and en is not None:
        return {"en": en, "hi": en, "en-hi": en}
    if en is None:
        return {"en": hi or "", "hi": hi or "", "en-hi": hi or "",
                "_synth": "hinglish-only"}
    return {"en": en, "hi": hi, "en-hi": hi}


def _grade_of(student_id: str, user: Optional[User] = None) -> int:
    """Junior grade (1-5). A signed-in student's real class_level wins;
    anonymous device ids fall back to their trailing digit, else 3.
    (2026-10-11 audit: UUID tails are pseudo-random — a real kid's id
    ending in a letter or >5 silently pinned them to grade 3.)"""
    cl = getattr(user, "class_level", None) if user is not None else None
    if isinstance(cl, int) and 1 <= cl <= 5:
        return cl
    try:
        g = int(str(student_id)[-1])
        return g if 1 <= g <= 5 else 3
    except (ValueError, TypeError):
        return 3


def _activity_to_step(act: Any, step_number: int) -> Dict[str, Any]:
    """ActivityOut -> TS LessonStep. expected_answer is NEVER exposed."""
    return {
        "stepNumber": step_number,
        "type": "question",
        "text": _lang_record(act.prompt_hi, act.prompt_en),
        "audioUrl": None,
        "hint": _lang_record(act.hint_hi, act.hint_hi) if act.hint_hi else None,
        "hintAudioUrl": None,
        "options": None,
        "points": act.points,
    }


def _activity_to_lesson_meta(act: Any, subject: Subject, grade: int) -> Dict[str, Any]:
    return {
        "id": act.activity_id,
        "title": _lang_record(act.prompt_hi, act.prompt_en),
        "description": _lang_record(act.prompt_hi, act.prompt_en),
        "subject": subject.value,
        "grade": grade,
        "difficulty": act.difficulty.value,
        "durationMinutes": 5,
        "thumbnailUrl": None,
        "activityType": _ACTIVITY_TYPE_TO_TS.get(act.type.value, "quiz"),
        "prerequisites": [],
        "learningOutcomes": [],
        "isVoiceFirst": True,
        "estimatedQuestions": 5,
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "updatedAt": datetime.now(timezone.utc).isoformat(),
    }


# ─────────────────────────────────────────────
# Endpoints
# ─────────────────────────────────────────────
@router.post("/lessons/start")
async def start_lesson(
    body: StartLessonRequest,
    user: Optional[User] = Depends(get_current_user_optional),
    svc: JuniorService = Depends(_svc),
):
    """Start a generated activity session for a Class 1-5 child."""
    subject = _parse_subject(body.subject)
    student_id = _resolve_student_id(user, body.studentId)
    grade = min(max(body.grade, 1), 5)
    topic = body.topic or _DEFAULT_TOPICS.get(subject, subject.value)

    try:
        lesson = await svc.start_lesson(
            student_id=student_id,
            subject=subject.value,
            topic=topic,
            difficulty=_GRADE_DIFFICULTY.get(grade, "medium"),
            grade=grade,
        )
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    except Exception as exc:  # engine down — fail loudly, no fabricated data
        logger.exception("junior start_lesson failed")
        raise HTTPException(status_code=500, detail="Activity engine error")

    activities = lesson.activities
    if not activities:
        raise HTTPException(status_code=503, detail="NO_LESSONS_AVAILABLE")
    first = activities[lesson.current_index] if lesson.current_index < len(activities) else activities[0]

    return {
        "sessionId": lesson.session_id,
        "lesson": _activity_to_lesson_meta(first, subject, grade),
        "currentStep": _activity_to_step(first, lesson.current_index + 1),
        "totalSteps": lesson.total_activities,
        "scoreSoFar": 0,
        "timeRemainingSeconds": None,
        "availableHints": 3,
        "encouragement": _lang_record(
            f"चलो {lesson.character_name} के साथ सीखते हैं!",
            f"Let's learn with {lesson.character_name}!",
        ),
        # extensions
        "characterName": lesson.character_name,
        "greeting": _lang_record(lesson.greeting_hi, lesson.greeting_en),
    }


@router.post("/lessons/voice-answer")
async def submit_voice_answer(
    body: VoiceAnswerRequest,
    user: Optional[User] = Depends(get_current_user_optional),
    svc: JuniorService = Depends(_svc),
):
    """Grade a spoken/typed answer; returns feedback, stars, badges, next step."""
    transcript = (body.transcript or body.answer or "").strip()
    if not transcript and not body.audioDataUri:
        raise HTTPException(status_code=422, detail="transcript or audioDataUri required")
    if not transcript:
        # Browser speech-to-text is expected; raw audio cannot be graded honestly.
        return {
            "isCorrect": False,
            "feedbackType": "unclear",
            "scoreEarned": 0,
            "totalScore": 0,
            "feedbackText": _lang_record(
                "मुझे आवाज़ समझ नहीं आई — दोबारा बोलो!",
                "I couldn't hear that — please say it again!",
            ),
            "feedbackAudioUrl": None,
            "celebrationType": "none",
            "nextStepAvailable": True,
            "retryAllowed": True,
        }

    try:
        out = await svc.submit_voice_answer(body.sessionId, transcript)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))
    except Exception as exc:
        logger.exception("junior voice-answer failed")
        raise HTTPException(status_code=500, detail="Grading error")

    vr = out.voice_response
    feedback_type = _RESULT_TO_FEEDBACK.get(out.result, "try_again")

    resp: Dict[str, Any] = {
        "isCorrect": out.result == AnswerResult.CORRECT,
        "feedbackType": feedback_type,
        "scoreEarned": out.stars_earned if out.result == AnswerResult.CORRECT else 0,
        "totalScore": out.stars_earned,
        "feedbackText": _lang_record(vr.text_hindi, vr.text_english or vr.speak_text),
        "feedbackAudioUrl": None,
        "celebrationType": (_CELEBRATION_TO_TS.get(vr.celebration or "", "none")
                            if out.result in (AnswerResult.CORRECT, AnswerResult.PARTIAL)
                            else "none"),
        "nextStepAvailable": out.next_activity is not None and not out.is_lesson_complete,
        "hintsRemaining": 3,
        "retryAllowed": out.result not in (AnswerResult.CORRECT, AnswerResult.PARTIAL),
        "recognizedText": transcript,
        "recognizedConfidence": 1.0,
        # extensions
        "masteryDelta": out.mastery_delta,
        "isLessonComplete": out.is_lesson_complete,
        "newBadges": [
            {"id": b, "name": b.replace("_", " ").title()} for b in out.new_badges
        ],
    }
    if out.next_activity is not None:
        resp["nextStep"] = _activity_to_step(out.next_activity, body.stepNumber + 1)
    return resp


@router.get("/students/{student_id}")
async def get_student(
    student_id: str,
    user: Optional[User] = Depends(get_current_user_optional),
    svc: JuniorService = Depends(_svc),
):
    """Lightweight student summary."""
    sid = _resolve_student_id(user, student_id)
    progress = await svc.get_junior_progress(sid)
    return {
        "studentId": progress.student_id,
        "grade": _grade_of(progress.student_id, user),
        "level": progress.level,
        "totalStars": progress.total_stars,
        "totalPoints": progress.total_points,
        "currentStreak": progress.current_streak,
        "badgeCount": len(progress.badges),
        "recommendedNext": progress.recommended_next,
    }


@router.get("/students/{student_id}/progress")
async def get_progress(
    student_id: str,
    days: int = Query(default=7, ge=1, le=30),
    user: Optional[User] = Depends(get_current_user_optional),
    svc: JuniorService = Depends(_svc),
):
    """Full progress dashboard: summary + history (TS JuniorProgressResponse)."""
    sid = _resolve_student_id(user, student_id)
    progress = await svc.get_junior_progress(sid, days=days)

    subject_progress = []
    for subj, pct in (progress.subject_progress or {}).items():
        val = float(pct or 0.0)
        subject_progress.append({
            "subject": subj,
            "lessonsCompleted": 0,
            "lessonsTotal": 5,
            "masteryPercentage": round(val * 100, 1) if val <= 1.0 else round(val, 1),
            "averageScore": round(val, 1),
            "lastPracticed": None,
            "strengths": [],
            "areasToImprove": [],
        })

    weekly = progress.weekly_stars or [0] * 7
    active_days = sum(1 for s in weekly if (s or 0) > 0)

    history_entries = [
        {
            "lessonId": str(i + 1),
            "lessonTitle": _lang_record(
                f"{a.get('subject', 'activity')} — {a.get('date', '')}",
                f"{a.get('subject', 'activity')} — {a.get('date', '')}",
            ),
            "subject": a.get("subject", "mathematics"),
            "score": int(a.get("stars", 0) or 0),
            "maxScore": max(int(a.get("stars", 0) or 0), 5),
            "completedAt": str(a.get("date") or datetime.now(timezone.utc).isoformat()),
            "timeSpentMinutes": 5,
            "starsEarned": int(a.get("stars", 0) or 0),
            "attempts": 1,
        }
        for i, a in enumerate(progress.recent_activities or [])
    ]

    summary = {
        "studentId": progress.student_id,
        "grade": _grade_of(progress.student_id, user),
        "totalLessonsCompleted": len(history_entries),
        "totalLessonsAttempted": len(history_entries),
        "totalPoints": progress.total_points,
        "totalStars": progress.total_stars,
        "currentStreak": progress.current_streak,
        "longestStreak": progress.current_streak,
        "subjectProgress": subject_progress,
        "weeklyGoal": {
            "targetLessons": 5,
            "completedLessons": min(active_days, 5),
            "targetMinutes": 25,
            "completedMinutes": active_days * 5,
            "weekStart": datetime.now(timezone.utc).date().isoformat(),
            "weekEnd": datetime.now(timezone.utc).date().isoformat(),
            "rewardUnlocked": progress.total_stars >= 25,
        },
        "recentBadges": [
            {
                "id": b.id,
                "name": _lang_record(b.name_hi, b.name_en),
                "description": _lang_record(b.description_hi, b.description_en),
                "iconUrl": b.icon,
                "earnedAt": b.earned_at or "",
                "rarity": "common",
            }
            for b in progress.badges
            if getattr(b, "earned_at", None)
        ],
        "level": progress.level,
        "xpToNextLevel": max(0, 100 - (progress.total_stars % 100)),
        "xpCurrentLevel": progress.total_stars % 100,
    }

    return {
        "summary": summary,
        "history": {
            "data": history_entries,
            "meta": {
                "page": 1,
                "limit": max(len(history_entries), 1),
                "total": len(history_entries),
                "totalPages": 1,
                "hasNext": False,
                "hasPrevious": False,
            },
        },
        # extension — engine's Hinglish suggestion for the next activity
        "recommendedNext": progress.recommended_next,
    }


@router.post("/stories/generate")
async def generate_story(
    body: StoryGenerateRequest,
    user: Optional[User] = Depends(get_current_user_optional),
    svc: JuniorService = Depends(_svc),
):
    """Hinglish story-based math problem, generated by the engine's ContentBank."""
    _parse_subject(body.subject)
    try:
        problems = await svc.generate_story_problem(
            topic="multiplication",
            difficulty=body.difficulty,
            n=1,
            style=body.theme,
        )
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    except Exception as exc:
        logger.exception("junior story generation failed")
        raise HTTPException(status_code=500, detail="Story engine error")

    if not problems:
        raise HTTPException(status_code=503, detail="NO_STORY_AVAILABLE")

    p = problems[0]
    story_text = str(p.get("story_hi") or "")
    question_text = str(p.get("question_hi") or "")
    hint = str(p.get("hint_hi") or "")

    story = {
        "id": f"story-{int(datetime.now(timezone.utc).timestamp())}",
        "title": _lang_record("गणित की कहानी", "A Math Story"),
        "paragraphs": [_lang_record(story_text, story_text)],
        "moral": _lang_record("गणित हर जगह काम आता है!", "Math is everywhere!"),
        "vocabulary": [],
        "comprehensionQuestions": (
            []
            if not body.includeComprehensionQuestions
            else [
                {
                    "question": _lang_record(question_text, question_text),
                    "options": [],
                    "correctOptionIndex": -1,
                    "explanation": _lang_record(hint, hint),
                }
            ]
        ),
        "wordCount": len(story_text.split()),
        "readingTimeMinutes": 1,
        "difficulty": body.difficulty,
        "illustrationPrompts": [],
        "createdAt": datetime.now(timezone.utc).isoformat(),
        # extensions
        "question": _lang_record(question_text, question_text),
        "hint": _lang_record(hint, hint),
    }
    return {"story": story, "relatedStories": []}
