"""
Questions API Router — CISCE K-12 Learning Platform
====================================================

Question generation and grading API with subject, class, and topic filtering.
Integrates with question_selector, answer_evaluator_v2, ner_extractor, and
interpreter_loop services for intelligent question creation and auto-grading.

Endpoints:
  POST  /api/questions/generate              → Generate a single question
  POST  /api/questions/grade                 → Grade a student answer
  GET   /api/questions/types/{subject}/{class_level} → List question types
  POST  /api/questions/batch                 → Generate a batch of questions
  GET   /api/questions/{question_id}         → Retrieve a specific question
  GET   /api/questions/health                → Health check
"""

from __future__ import annotations

import logging
import random
import time
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, field_validator, ConfigDict

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/questions", tags=["questions"])


# ============================================================================
# Optional service imports with graceful degradation
# ============================================================================

try:
    from services.question_selector import QuestionSelector
    HAS_QUESTION_SELECTOR = True
except ImportError:
    HAS_QUESTION_SELECTOR = False
    logger.debug("question_selector service not available")

try:
    from services.answer_evaluator_v2 import AnswerEvaluator
    HAS_ANSWER_EVALUATOR = True
except ImportError:
    HAS_ANSWER_EVALUATOR = False
    logger.debug("answer_evaluator_v2 service not available")

try:
    from services.ner_extractor import NERExtractor
    HAS_NER_EXTRACTOR = True
except ImportError:
    HAS_NER_EXTRACTOR = False
    logger.debug("ner_extractor service not available")

try:
    from services.interpreter_loop import InterpreterLoop
    HAS_INTERPRETER_LOOP = True
except ImportError:
    HAS_INTERPRETER_LOOP = False
    logger.debug("interpreter_loop service not available")


# ============================================================================
# Enums
# ============================================================================


class DifficultyLevel(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class QuestionType(str, Enum):
    MULTIPLE_CHOICE = "multiple_choice"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    TRUE_FALSE = "true_false"
    FILL_BLANKS = "fill_blanks"
    MATCH_COLUMNS = "match_columns"
    NUMERICAL = "numerical"
    EXPLANATION = "explanation"


class GradingMode(str, Enum):
    STRICT = "strict"
    MODERATE = "moderate"
    LENIENT = "lenient"


# ============================================================================
# Pydantic v2 Schemas
# ============================================================================


class GenerateQuestionRequest(BaseModel):
    """Request body for generating a single question."""

    subject: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Subject slug or name (e.g. 'mathematics')",
    )
    class_level: str = Field(
        ...,
        min_length=1,
        max_length=20,
        description="Class level (e.g. '10', '12', 'XI', 'XII')",
    )
    topic: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=200,
        description="Specific topic within the subject",
    )
    count: int = Field(
        default=1,
        ge=1,
        le=10,
        description="Number of questions to generate",
    )
    difficulty: DifficultyLevel = Field(
        default=DifficultyLevel.MEDIUM,
        description="Target difficulty level",
    )
    question_type: Optional[QuestionType] = Field(
        default=None,
        description="Specific question type; if omitted, a mix is returned",
    )
    tags: list[str] = Field(
        default_factory=list,
        description="Optional tags for filtering or annotating questions",
    )
    reference_id: Optional[str] = Field(
        default=None,
        description="Optional reference to a textbook chapter or lesson ID",
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "subject": "mathematics",
                "class_level": "10",
                "topic": "Quadratic Equations",
                "count": 3,
                "difficulty": "medium",
                "question_type": "multiple_choice",
                "tags": ["algebra", "board_exam"],
            }
        }
    }


class AnswerOption(BaseModel):
    """A single answer option for multiple-choice questions."""

    label: str = Field(
        ...,
        min_length=1,
        max_length=10,
        description="Option label (A, B, C, D)",
    )
    text: str = Field(
        ...,
        min_length=1,
        description="The option text",
    )
    is_correct: bool = Field(
        default=False,
        description="Whether this is the correct answer",
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "label": "A",
                "text": "x = 3 or x = -5",
                "is_correct": True,
            }
        }
    }


class QuestionResponse(BaseModel):
    """Response body for a single generated or retrieved question."""

    question_id: str = Field(..., description="Unique question identifier")
    subject: str = Field(..., description="Subject of the question")
    class_level: str = Field(..., description="Target class level")
    topic: str = Field(..., description="Topic of the question")
    difficulty: DifficultyLevel = Field(..., description="Difficulty level")
    question_type: QuestionType = Field(..., description="Type of question")
    question_text: str = Field(..., description="The question text")
    options: list[AnswerOption] | None = Field(
        default=None,
        description="Answer options (for multiple_choice, true_false)",
    )
    correct_answer: str | None = Field(
        default=None,
        description="Model answer or correct option label",
    )
    explanation: str | None = Field(
        default=None,
        description="Explanation of the solution",
    )
    tags: list[str] = Field(default_factory=list, description="Associated tags")
    created_at: datetime = Field(..., description="Creation timestamp")
    metadata: dict[str, Any] = Field(
        default_factory=dict,
        description="Additional metadata (source, bloom_level, etc.)",
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "question_id": "q_001a2b3c",
                "subject": "mathematics",
                "class_level": "10",
                "topic": "Quadratic Equations",
                "difficulty": "medium",
                "question_type": "multiple_choice",
                "question_text": "Solve x^2 + 2x - 15 = 0",
                "options": [
                    {"label": "A", "text": "x = 3 or x = -5", "is_correct": True},
                    {"label": "B", "text": "x = -3 or x = 5", "is_correct": False},
                    {"label": "C", "text": "x = 3 or x = 5", "is_correct": False},
                    {"label": "D", "text": "x = -3 or x = -5", "is_correct": False},
                ],
                "correct_answer": "A",
                "explanation": "Factor as (x+5)(x-3) = 0, so x = -5 or x = 3.",
                "tags": ["algebra", "quadratic"],
                "created_at": "2025-06-15T10:30:00Z",
                "metadata": {"bloom_level": "apply", "source": "board_2024"},
            }
        }
    }


class GenerateBatchRequest(BaseModel):
    """Request body for batch question generation."""

    subject: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Subject slug or name",
    )
    class_level: str = Field(
        ...,
        min_length=1,
        max_length=20,
        description="Class level",
    )
    topics: list[str] = Field(
        ...,
        min_length=1,
        description="List of topics to cover in this batch",
    )
    count_per_topic: int = Field(
        default=2,
        ge=1,
        le=10,
        description="Number of questions per topic",
    )
    difficulty: DifficultyLevel = Field(
        default=DifficultyLevel.MEDIUM,
        description="Target difficulty level",
    )
    question_types: list[QuestionType] = Field(
        default_factory=lambda: [QuestionType.MULTIPLE_CHOICE],
        description="Question types to include",
    )
    tags: list[str] = Field(
        default_factory=list,
        description="Optional tags",
    )
    session_id: Optional[str] = Field(
        default=None,
        description="Optional practice session ID to link this batch",
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "subject": "physics",
                "class_level": "11",
                "topics": ["Laws of Motion", "Work Energy Power"],
                "count_per_topic": 2,
                "difficulty": "medium",
                "question_types": ["multiple_choice", "short_answer"],
                "tags": ["mechanics", "numerical"],
            }
        }
    }


class GradeRequest(BaseModel):
    """Request body for grading a student answer."""

    question_id: str = Field(
        ...,
        min_length=1,
        description="ID of the question being answered",
    )
    student_answer: str = Field(
        ...,
        min_length=1,
        description="Student's submitted answer text",
    )
    grading_mode: GradingMode = Field(
        default=GradingMode.MODERATE,
        description="Strictness of grading",
    )
    subject: Optional[str] = Field(
        default=None,
        description="Override subject (if question_id is not resolvable)",
    )
    class_level: Optional[str] = Field(
        default=None,
        description="Override class level",
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "question_id": "q_001a2b3c",
                "student_answer": "x = -5 and x = 3",
                "grading_mode": "moderate",
            }
        }
    }


class GradingComponent(BaseModel):
    """Individual scoring component from the grading engine."""

    component: str = Field(..., description="Name of the scoring component")
    score: float = Field(..., ge=0.0, description="Score for this component")
    max_score: float = Field(..., gt=0.0, description="Maximum possible score")
    weight: float = Field(..., ge=0.0, description="Weight of this component")
    feedback: str = Field(..., description="Feedback for this component")

    model_config = {
        "json_schema_extra": {
            "example": {
                "component": "correctness",
                "score": 1.0,
                "max_score": 1.0,
                "weight": 0.6,
                "feedback": "Both roots identified correctly.",
            }
        }
    }


class GradeResponse(BaseModel):
    """Response body for a grading result."""

    question_id: str = Field(..., description="Question that was graded")
    student_answer: str = Field(..., description="The submitted answer")
    total_score: float = Field(..., ge=0.0, description="Total score earned")
    max_score: float = Field(..., gt=0.0, description="Maximum possible score")
    percentage: float = Field(..., ge=0.0, le=100.0, description="Percentage score")
    is_correct: bool = Field(..., description="Whether the answer is correct")
    grade: str = Field(..., description="Letter grade or pass/fail label")
    components: list[GradingComponent] = Field(
        ..., description="Breakdown of scoring components"
    )
    overall_feedback: str = Field(..., description="Summary feedback for the student")
    model_answer: str = Field(..., description="The correct/model answer")
    suggestions: list[str] = Field(
        default_factory=list,
        description="Suggestions for improvement",
    )
    graded_at: datetime = Field(..., description="Timestamp of grading")

    model_config = {
        "json_schema_extra": {
            "example": {
                "question_id": "q_001a2b3c",
                "student_answer": "x = -5 and x = 3",
                "total_score": 1.0,
                "max_score": 1.0,
                "percentage": 100.0,
                "is_correct": True,
                "grade": "A",
                "components": [
                    {
                        "component": "correctness",
                        "score": 1.0,
                        "max_score": 1.0,
                        "weight": 0.6,
                        "feedback": "Both roots identified correctly.",
                    }
                ],
                "overall_feedback": "Excellent work! Both roots are correct.",
                "model_answer": "x = -5 or x = 3",
                "suggestions": [],
                "graded_at": "2025-06-15T10:35:00Z",
            }
        }
    }


class QuestionTypeInfo(BaseModel):
    """Metadata about an available question type for a subject/class."""

    type_key: str = Field(..., description="Machine-readable type identifier")
    display_name: str = Field(..., description="Human-readable name")
    description: str = Field(..., description="Brief description of the question type")
    is_available: bool = Field(
        ..., description="Whether this type is supported for the given context"
    )
    max_marks: int | None = Field(
        default=None,
        description="Maximum marks for this question type (if applicable)",
    )
    supports_auto_grading: bool = Field(
        default=False,
        description="Whether auto-grading is supported",
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "type_key": "multiple_choice",
                "display_name": "Multiple Choice",
                "description": "Select the correct answer from given options",
                "is_available": True,
                "max_marks": 1,
                "supports_auto_grading": True,
            }
        }
    }


class QuestionTypesResponse(BaseModel):
    """Response body for listing question types."""

    subject: str = Field(..., description="Subject name")
    class_level: str = Field(..., description="Class level")
    available_types: list[QuestionTypeInfo] = Field(
        ..., description="List of available question types"
    )


class BatchGenerateResponse(BaseModel):
    """Response body for batch question generation."""

    session_id: str = Field(..., description="Batch/session identifier")
    subject: str = Field(..., description="Subject")
    class_level: str = Field(..., description="Class level")
    total_questions: int = Field(..., description="Total number of questions generated")
    questions: list[QuestionResponse] = Field(
        ..., description="The generated questions"
    )
    topics_covered: list[str] = Field(
        ..., description="Topics included in this batch"
    )
    generated_at: datetime = Field(..., description="Timestamp of generation")

    model_config = {
        "json_schema_extra": {
            "example": {
                "session_id": "batch_abc123",
                "subject": "physics",
                "class_level": "11",
                "total_questions": 4,
                "questions": [],
                "topics_covered": ["Laws of Motion", "Work Energy Power"],
                "generated_at": "2025-06-15T10:40:00Z",
            }
        }
    }


class HealthResponse(BaseModel):
    """Health check response."""

    status: str = Field(..., description="Service health status")
    timestamp: datetime = Field(..., description="Check timestamp")
    services: dict[str, bool] = Field(
        ..., description="Availability of dependent services"
    )


# ============================================================================
# Internal helpers
# ============================================================================


def _generate_question_id() -> str:
    """Generate a unique question ID."""
    ts = int(time.time() * 1000)
    rnd = random.randint(1000, 9999)
    return f"q_{ts:x}{rnd:x}"


def _compute_letter_grade(percentage: float, mode: GradingMode) -> str:
    """Map a percentage score to a letter grade."""
    if mode == GradingMode.LENIENT:
        thresholds = [40, 50, 65, 80]
        grades = ["F", "D", "C", "B", "A"]
    elif mode == GradingMode.STRICT:
        thresholds = [60, 70, 80, 90]
        grades = ["F", "C", "B", "A", "A+"]
    else:
        thresholds = [50, 60, 75, 90]
        grades = ["F", "D", "C", "B", "A"]

    grade = grades[0]
    for threshold, g in zip(thresholds, grades[1:], strict=False):
        if percentage >= threshold:
            grade = g
    return grade


def _get_question_selector() -> "QuestionSelector | None":
    """Return a QuestionSelector instance if available, else None."""
    if not HAS_QUESTION_SELECTOR:
        return None
    try:
        return QuestionSelector()
    except Exception as exc:
        logger.warning("Failed to initialise QuestionSelector: %s", exc)
        return None


def _get_answer_evaluator() -> "AnswerEvaluator | None":
    """Return an AnswerEvaluator instance if available, else None."""
    if not HAS_ANSWER_EVALUATOR:
        return None
    try:
        return AnswerEvaluator()
    except Exception as exc:
        logger.warning("Failed to initialise AnswerEvaluator: %s", exc)
        return None


def _get_ner_extractor() -> "NERExtractor | None":
    """Return an NERExtractor instance if available, else None."""
    if not HAS_NER_EXTRACTOR:
        return None
    try:
        return NERExtractor()
    except Exception as exc:
        logger.warning("Failed to initialise NERExtractor: %s", exc)
        return None


def _get_interpreter_loop() -> "InterpreterLoop | None":
    """Return an InterpreterLoop instance if available, else None."""
    if not HAS_INTERPRETER_LOOP:
        return None
    try:
        return InterpreterLoop()
    except Exception as exc:
        logger.warning("Failed to initialise InterpreterLoop: %s", exc)
        return None


# ============================================================================
# Endpoints
# ============================================================================


@router.get("/health", response_model=HealthResponse, summary="Health check")
async def health_check() -> HealthResponse:
    """Return the health status of the questions service and its dependencies."""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now(timezone.utc),
        services={
            "question_selector": HAS_QUESTION_SELECTOR,
            "answer_evaluator": HAS_ANSWER_EVALUATOR,
            "ner_extractor": HAS_NER_EXTRACTOR,
            "interpreter_loop": HAS_INTERPRETER_LOOP,
        },
    )


@router.post(
    "/generate",
    response_model=QuestionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate a question",
)
async def generate_question(request: GenerateQuestionRequest) -> QuestionResponse:
    """Generate a new question based on the provided subject, class, topic, and difficulty.

    Uses the QuestionSelector service to pick an appropriate question template
    and populates it with contextually relevant content. Falls back to a
    built-in generator if the service is unavailable.
    """
    logger.info(
        "Generating question: subject=%s class=%s topic=%s difficulty=%s type=%s",
        request.subject,
        request.class_level,
        request.topic,
        request.difficulty.value,
        request.question_type,
    )

    selector = _get_question_selector()

    if selector is not None:
        try:
            raw = await selector.select_and_generate(
                subject=request.subject,
                class_level=request.class_level,
                topic=request.topic,
                difficulty=request.difficulty.value,
                question_type=(
                    request.question_type.value if request.question_type else None
                ),
                count=request.count,
            )
            if raw:
                q = raw[0] if isinstance(raw, list) else raw
                return QuestionResponse(
                    question_id=q.get("question_id", _generate_question_id()),
                    subject=request.subject,
                    class_level=request.class_level,
                    topic=q.get("topic", request.topic or "General"),
                    difficulty=request.difficulty,
                    question_type=QuestionType(
                        q.get("question_type", "multiple_choice")
                    ),
                    question_text=q.get("question_text", ""),
                    options=[
                        AnswerOption(**opt) for opt in q.get("options", [])
                    ] if q.get("options") else None,
                    correct_answer=q.get("correct_answer"),
                    explanation=q.get("explanation"),
                    tags=q.get("tags", request.tags),
                    created_at=datetime.now(timezone.utc),
                    metadata=q.get("metadata", {}),
                )
        except Exception as exc:
            logger.warning("QuestionSelector failed, using fallback: %s", exc)

    # Fallback: generate a placeholder question
    question_id = _generate_question_id()
    q_type = request.question_type or QuestionType.MULTIPLE_CHOICE

    return QuestionResponse(
        question_id=question_id,
        subject=request.subject,
        class_level=request.class_level,
        topic=request.topic or "General",
        difficulty=request.difficulty,
        question_type=q_type,
        question_text=f"[Generated] Sample {q_type.value} question for {request.subject} (Class {request.class_level}) on topic: {request.topic or 'General'}.",
        options=None,
        correct_answer=None,
        explanation=None,
        tags=request.tags,
        created_at=datetime.now(timezone.utc),
        metadata={"generated_by": "fallback", "count": request.count},
    )


@router.post(
    "/grade",
    response_model=GradeResponse,
    summary="Grade a student answer",
)
async def grade_answer(request: GradeRequest) -> GradeResponse:
    """Grade a student's submitted answer against the model answer.

    Uses the AnswerEvaluator service to compute a detailed score with
    component-wise breakdown. Returns total score, percentage, letter grade,
    and actionable feedback.
    """
    logger.info(
        "Grading answer: question_id=%s mode=%s",
        request.question_id,
        request.grading_mode.value,
    )

    evaluator = _get_answer_evaluator()

    # Resolve question context
    question_id = request.question_id
    subject = request.subject or "general"
    class_level = request.class_level or "unknown"
    model_answer = "N/A"
    question_text = ""

    if evaluator is not None:
        try:
            resolved = await evaluator.resolve_question(
                question_id=question_id,
                subject=subject,
                class_level=class_level,
            )
            model_answer = resolved.get("correct_answer", model_answer)
            question_text = resolved.get("question_text", "")
        except Exception as exc:
            logger.warning("Failed to resolve question context: %s", exc)

    if evaluator is not None:
        try:
            result = await evaluator.evaluate(
                question_id=question_id,
                student_answer=request.student_answer,
                model_answer=model_answer,
                grading_mode=request.grading_mode.value,
                subject=subject,
                class_level=class_level,
            )
            total_score = result.get("score", 0.0)
            max_score = result.get("max_score", 1.0)
            pct = result.get("percentage", 0.0)
            is_correct = result.get("is_correct", False)
            components = [
                GradingComponent(
                    component=c.get("component", "overall"),
                    score=c.get("score", 0.0),
                    max_score=c.get("max_score", 1.0),
                    weight=c.get("weight", 1.0),
                    feedback=c.get("feedback", ""),
                )
                for c in result.get("components", [])
            ]
            overall = result.get("feedback", "Answer graded.")
            suggestions = result.get("suggestions", [])

            return GradeResponse(
                question_id=question_id,
                student_answer=request.student_answer,
                total_score=total_score,
                max_score=max_score,
                percentage=pct,
                is_correct=is_correct,
                grade=_compute_letter_grade(pct, request.grading_mode),
                components=components
                if components
                else [
                    GradingComponent(
                        component="overall",
                        score=total_score,
                        max_score=max_score,
                        weight=1.0,
                        feedback=overall,
                    )
                ],
                overall_feedback=overall,
                model_answer=model_answer,
                suggestions=suggestions,
                graded_at=datetime.now(timezone.utc),
            )
        except Exception as exc:
            logger.warning("AnswerEvaluator failed, using fallback grading: %s", exc)

    # Fallback grading: simple keyword / string matching
    model_answer_clean = (model_answer or "").strip().lower()
    student_clean = request.student_answer.strip().lower()

    if model_answer_clean and model_answer_clean in student_clean:
        total_score = 1.0
        max_score = 1.0
        pct = 100.0
        is_correct = True
        overall = (
            "Correct! The answer matches the model answer."
            if request.grading_mode == GradingMode.LENIENT
            else "Correct! Well done."
        )
    elif student_clean and model_answer_clean and student_clean in model_answer_clean:
        total_score = 0.75
        max_score = 1.0
        pct = 75.0
        is_correct = False
        overall = "Partially correct. The idea is right but detail is missing."
    else:
        total_score = 0.0
        max_score = 1.0
        pct = 0.0
        is_correct = False
        overall = f"Incorrect. The model answer is: {model_answer}"

    return GradeResponse(
        question_id=question_id,
        student_answer=request.student_answer,
        total_score=total_score,
        max_score=max_score,
        percentage=pct,
        is_correct=is_correct,
        grade=_compute_letter_grade(pct, request.grading_mode),
        components=[
            GradingComponent(
                component="correctness",
                score=total_score,
                max_score=max_score,
                weight=1.0,
                feedback=overall,
            )
        ],
        overall_feedback=overall,
        model_answer=model_answer,
        suggestions=(
            ["Review the topic material and try again."]
            if not is_correct
            else []
        ),
        graded_at=datetime.now(timezone.utc),
    )


@router.get(
    "/types/{subject}/{class_level}",
    response_model=QuestionTypesResponse,
    summary="List question types for a subject and class level",
)
async def list_question_types(
    subject: str,
    class_level: str,
) -> QuestionTypesResponse:
    """Return the list of question types available for a given subject and
    class level, including whether auto-grading is supported for each type.

    Optionally enriched by the NERExtractor service if available.
    """
    logger.info(
        "Listing question types: subject=%s class=%s",
        subject,
        class_level,
    )

    ner = _get_ner_extractor()
    enriched_tags: dict[str, Any] = {}

    if ner is not None:
        try:
            enriched_tags = await ner.extract_question_tags(
                subject=subject,
                class_level=class_level,
            )
        except Exception as exc:
            logger.warning("NERExtractor enrichment failed: %s", exc)

    all_types = [
        QuestionTypeInfo(
            type_key=qt.value,
            display_name=_display_name_for(qt),
            description=_description_for(qt),
            is_available=True,
            max_marks=_max_marks_for(qt, class_level),
            supports_auto_grading=_supports_auto_grading(qt),
        )
        for qt in QuestionType
    ]

    # Optionally filter by NER-extracted tags
    if enriched_tags.get("excluded_types"):
        excluded = set(enriched_tags["excluded_types"])
        all_types = [qt for qt in all_types if qt.type_key not in excluded]

    return QuestionTypesResponse(
        subject=subject,
        class_level=class_level,
        available_types=all_types,
    )


@router.post(
    "/batch",
    response_model=BatchGenerateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate a batch of questions for a practice session",
)
async def generate_batch(request: GenerateBatchRequest) -> BatchGenerateResponse:
    """Generate a batch of questions for a practice session.

    Covers all specified topics with the requested number of questions per
    topic, filtered by difficulty and question types. Returns all generated
    questions along with the topics covered and a session/batch identifier.
    """
    logger.info(
        "Batch generation: subject=%s class=%s topics=%s count_per_topic=%d",
        request.subject,
        request.class_level,
        request.topics,
        request.count_per_topic,
    )

    selector = _get_question_selector()
    session_id = request.session_id or f"batch_{int(time.time() * 1000):x}"

    all_questions: list[QuestionResponse] = []
    topics_covered: list[str] = []
    total_generated = 0

    for topic in request.topics:
        count = request.count_per_topic
        if selector is not None:
            try:
                raw_list = await selector.select_and_generate(
                    subject=request.subject,
                    class_level=request.class_level,
                    topic=topic,
                    difficulty=request.difficulty.value,
                    question_type=(
                        qt.value for qt in request.question_types
                    ),
                    count=count,
                )
                for raw in (raw_list or []):
                    q = QuestionResponse(
                        question_id=raw.get(
                            "question_id", _generate_question_id()
                        ),
                        subject=request.subject,
                        class_level=request.class_level,
                        topic=topic,
                        difficulty=request.difficulty,
                        question_type=QuestionType(
                            raw.get("question_type", "multiple_choice")
                        ),
                        question_text=raw.get("question_text", ""),
                        options=[
                            AnswerOption(**opt)
                            for opt in raw.get("options", [])
                        ]
                        if raw.get("options")
                        else None,
                        correct_answer=raw.get("correct_answer"),
                        explanation=raw.get("explanation"),
                        tags=raw.get("tags", request.tags),
                        created_at=datetime.now(timezone.utc),
                        metadata=raw.get("metadata", {}),
                    )
                    all_questions.append(q)
                    total_generated += 1
                topics_covered.append(topic)
                continue
            except Exception as exc:
                logger.warning(
                    "QuestionSelector batch failed for topic '%s': %s", topic, exc
                )

        # Fallback: create placeholder questions for this topic
        for i in range(count):
            q_type = request.question_types[i % len(request.question_types)]
            all_questions.append(
                QuestionResponse(
                    question_id=_generate_question_id(),
                    subject=request.subject,
                    class_level=request.class_level,
                    topic=topic,
                    difficulty=request.difficulty,
                    question_type=q_type,
                    question_text=(
                        f"[Generated] Batch {q_type.value} question #{i+1} "
                        f"on '{topic}' for {request.subject} "
                        f"(Class {request.class_level})."
                    ),
                    options=None,
                    correct_answer=None,
                    explanation=None,
                    tags=request.tags,
                    created_at=datetime.now(timezone.utc),
                    metadata={
                        "generated_by": "fallback",
                        "batch_id": session_id,
                        "topic_index": i,
                    },
                )
            )
            total_generated += 1
        topics_covered.append(topic)

    return BatchGenerateResponse(
        session_id=session_id,
        subject=request.subject,
        class_level=request.class_level,
        total_questions=total_generated,
        questions=all_questions,
        topics_covered=topics_covered,
        generated_at=datetime.now(timezone.utc),
    )


@router.get(
    "/{question_id}",
    response_model=QuestionResponse,
    summary="Get a specific question by ID",
)
async def get_question(question_id: str) -> QuestionResponse:
    """Retrieve a specific question by its unique identifier.

    Looks up the question from the QuestionSelector service or a local
    store. Returns a 404 if the question is not found.
    """
    logger.info("Fetching question: question_id=%s", question_id)

    selector = _get_question_selector()
    if selector is not None:
        try:
            raw = await selector.get_question(question_id=question_id)
            if raw:
                return QuestionResponse(
                    question_id=raw.get("question_id", question_id),
                    subject=raw.get("subject", "unknown"),
                    class_level=raw.get("class_level", "unknown"),
                    topic=raw.get("topic", "General"),
                    difficulty=DifficultyLevel(
                        raw.get("difficulty", "medium")
                    ),
                    question_type=QuestionType(
                        raw.get("question_type", "multiple_choice")
                    ),
                    question_text=raw.get("question_text", ""),
                    options=[
                        AnswerOption(**opt) for opt in raw.get("options", [])
                    ]
                    if raw.get("options")
                    else None,
                    correct_answer=raw.get("correct_answer"),
                    explanation=raw.get("explanation"),
                    tags=raw.get("tags", []),
                    created_at=datetime.fromisoformat(
                        raw.get("created_at", datetime.now(timezone.utc).isoformat())
                    ),
                    metadata=raw.get("metadata", {}),
                )
        except HTTPException:
            raise
        except Exception as exc:
            logger.warning(
                "QuestionSelector lookup failed for '%s': %s", question_id, exc
            )

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Question with ID '{question_id}' not found.",
    )


# ============================================================================
# Private display helpers for question types
# ============================================================================


def _display_name_for(qt: QuestionType) -> str:
    names = {
        QuestionType.MULTIPLE_CHOICE: "Multiple Choice",
        QuestionType.SHORT_ANSWER: "Short Answer",
        QuestionType.LONG_ANSWER: "Long Answer / Essay",
        QuestionType.TRUE_FALSE: "True / False",
        QuestionType.FILL_BLANKS: "Fill in the Blanks",
        QuestionType.MATCH_COLUMNS: "Match the Columns",
        QuestionType.NUMERICAL: "Numerical Problem",
        QuestionType.EXPLANATION: "Explanation / Reasoning",
    }
    return names.get(qt, qt.value)


def _description_for(qt: QuestionType) -> str:
    descs = {
        QuestionType.MULTIPLE_CHOICE: "Select the correct answer from the given options.",
        QuestionType.SHORT_ANSWER: "Write a brief answer in one or two sentences.",
        QuestionType.LONG_ANSWER: "Write a detailed, structured answer with reasoning.",
        QuestionType.TRUE_FALSE: "Determine whether a statement is true or false.",
        QuestionType.FILL_BLANKS: "Fill in the missing words or values in the statement.",
        QuestionType.MATCH_COLUMNS: "Match items from column A with items in column B.",
        QuestionType.NUMERICAL: "Solve a numerical problem and state the answer.",
        QuestionType.EXPLANATION: "Explain a concept or justify a reasoning step.",
    }
    return descs.get(qt, "Standard question format.")


def _max_marks_for(qt: QuestionType, class_level: str) -> int | None:
    """Return typical maximum marks for the question type and class level."""
    try:
        cl = int(class_level)
    except (ValueError, TypeError):
        cl = 10

    if cl <= 8:
        defaults = {QuestionType.MULTIPLE_CHOICE: 1}
    elif cl <= 10:
        defaults = {
            QuestionType.MULTIPLE_CHOICE: 1,
            QuestionType.SHORT_ANSWER: 2,
            QuestionType.TRUE_FALSE: 1,
            QuestionType.FILL_BLANKS: 1,
            QuestionType.NUMERICAL: 2,
        }
    else:
        defaults = {
            QuestionType.MULTIPLE_CHOICE: 1,
            QuestionType.SHORT_ANSWER: 3,
            QuestionType.LONG_ANSWER: 5,
            QuestionType.EXPLANATION: 4,
            QuestionType.NUMERICAL: 3,
            QuestionType.MATCH_COLUMNS: 2,
        }
    return defaults.get(qt)


def _supports_auto_grading(qt: QuestionType) -> bool:
    auto_types = {
        QuestionType.MULTIPLE_CHOICE,
        QuestionType.TRUE_FALSE,
        QuestionType.FILL_BLANKS,
        QuestionType.MATCH_COLUMNS,
        QuestionType.NUMERICAL,
    }
    return qt in auto_types