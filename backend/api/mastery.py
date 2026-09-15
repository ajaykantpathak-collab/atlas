"""
Mastery Tracking Dashboard API Router — K-12 Learning Platform (CISCE/ICSE/ISC)
==============================================================================

Endpoints for tracking student mastery across subjects, skill trees,
spaced-repetition review schedules (SM-2 algorithm), and mastery trends.

Integrates with:
  - services/knowledge_tracing.py (BKT + IRT + AFM)
  - services/mastery_sync.py
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, field_validator
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db, Student, Topic, Attempt, Mastery
from services.knowledge_tracing import KnowledgeTracingEngine
from services.mastery_sync import MasterySyncService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/mastery", tags=["mastery"])


# ============================================================================
# Optional service imports with graceful degradation
# ============================================================================

try:
    from services.knowledge_tracing import KnowledgeTracingEngine
    _HAS_KT = True
except ImportError:
    _HAS_KT = False
    KnowledgeTracingEngine = None  # type: ignore

try:
    from services.mastery_sync import MasterySyncService
    _HAS_MS = True
except ImportError:
    _HAS_MS = False
    MasterySyncService = None  # type: ignore

try:
    from services.spaced_repetition import SpacedRepetitionService
    _HAS_SR = True
except ImportError:
    _HAS_SR = False
    SpacedRepetitionService = None  # type: ignore


# ============================================================================
# Pydantic v2 Schemas
# ============================================================================


class MasteryLevelResponse(BaseModel):
    """Mastery level for a single concept or skill."""

    concept_id: str = Field(..., description="Unique concept/skill identifier")
    concept_name: str = Field(..., description="Human-readable concept name")
    mastery_score: float = Field(
        ..., ge=0.0, le=1.0, description="Mastery probability [0.0, 1.0]"
    )
    mastery_level: str = Field(
        ..., description="Label: novice / developing / proficient / mastered"
    )
    last_practiced: Optional[datetime] = Field(
        None, description="ISO-8601 timestamp of last practice"
    )
    attempts_count: int = Field(..., ge=0, description="Total attempts on this concept")
    correct_count: int = Field(..., ge=0, description="Number of correct attempts")

    model_config = {"json_schema_extra": {
        "example": {
            "concept_id": "math-algebra-linear-equations",
            "concept_name": "Linear Equations",
            "mastery_score": 0.72,
            "mastery_level": "proficient",
            "last_practiced": "2026-03-15T10:30:00Z",
            "attempts_count": 24,
            "correct_count": 18,
        }
    }}


class TopicMasteryResponse(BaseModel):
    """Mastery summary for a single subject."""

    subject_id: str = Field(..., description="Topic slug identifier")
    subject_name: str = Field(..., description="Display name of the subject")
    overall_mastery: float = Field(
        ..., ge=0.0, le=1.0, description="Aggregate mastery across all topics"
    )
    mastery_level: str = Field(
        ..., description="Overall label: novice / developing / proficient / mastered"
    )
    topic_count: int = Field(..., ge=0, description="Number of topics in this subject")
    mastered_topics: int = Field(..., ge=0, description="Topics at 'mastered' level")
    concepts: list[MasteryLevelResponse] = Field(
        ..., description="Per-concept mastery breakdown"
    )
    last_updated: datetime = Field(
        ..., description="When this mastery data was last recomputed"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "subject_id": "mathematics",
            "subject_name": "Mathematics",
            "overall_mastery": 0.65,
            "mastery_level": "proficient",
            "topic_count": 8,
            "mastered_topics": 3,
            "concepts": [],
            "last_updated": "2026-03-15T10:30:00Z",
        }
    }}


class StudentMasteryResponse(BaseModel):
    """Full mastery overview for a student across all subjects."""

    student_id: str = Field(..., description="Student unique identifier")
    generated_at: datetime = Field(
        ..., description="When this response was generated"
    )
    overall_mastery: float = Field(
        ..., ge=0.0, le=1.0, description="Cross-subject aggregate mastery"
    )
    subjects: list[TopicMasteryResponse] = Field(
        ..., description="Per-subject mastery details"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-10042",
            "generated_at": "2026-03-15T10:30:00Z",
            "overall_mastery": 0.68,
            "subjects": [],
        }
    }}


class UpdateMasteryRequest(BaseModel):
    """Request body for updating mastery after a practice/solve event."""

    subject: str = Field(..., min_length=1, description="Topic slug")
    topic_id: str = Field(..., min_length=1, description="Topic identifier")
    concept_id: str = Field(..., min_length=1, description="Concept/skill identifier")
    is_correct: bool = Field(..., description="Whether the student answered correctly")
    response_time_ms: Optional[int] = Field(
        default=None,
        ge=0,
        description="Time taken to answer in milliseconds",
    )
    difficulty: Optional[str] = Field(
        default=None,
        description="Question difficulty: easy / medium / hard",
    )
    hints_used: int = Field(default=0, ge=0, description="Number of hints consumed")
    attempt_id: Optional[str] = Field(
        default=None, description="Associated attempt record ID"
    )

    @field_validator("difficulty")
    @classmethod
    def validate_difficulty(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in ("easy", "medium", "hard"):
            raise ValueError("difficulty must be one of: easy, medium, hard")
        return v

    model_config = {"json_schema_extra": {
        "example": {
            "subject": "mathematics",
            "topic_id": "algebra",
            "concept_id": "math-algebra-linear-equations",
            "is_correct": True,
            "response_time_ms": 4500,
            "difficulty": "medium",
            "hints_used": 0,
            "attempt_id": "att-90021",
        }
    }}


class UpdateMasteryResponse(BaseModel):
    """Response after updating mastery for a concept."""

    concept_id: str = Field(..., description="Concept identifier")
    previous_mastery: float = Field(
        ..., ge=0.0, le=1.0, description="Mastery score before update"
    )
    updated_mastery: float = Field(
        ..., ge=0.0, le=1.0, description="Mastery score after update"
    )
    mastery_level: str = Field(..., description="New mastery label")
    bkt_params_updated: bool = Field(
        ..., description="Whether BKT parameters were recalculated"
    )
    next_review_date: Optional[datetime] = Field(
        None, description="SM-2 recommended next review date"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "concept_id": "math-algebra-linear-equations",
            "previous_mastery": 0.72,
            "updated_mastery": 0.78,
            "mastery_level": "proficient",
            "bkt_params_updated": True,
            "next_review_date": "2026-03-17T10:00:00Z",
        }
    }}


class ReviewItemResponse(BaseModel):
    """A single item in the spaced-repetition review schedule."""

    concept_id: str = Field(..., description="Concept/skill identifier")
    concept_name: str = Field(..., description="Human-readable concept name")
    subject: str = Field(..., description="Topic slug")
    topic_id: str = Field(..., description="Topic identifier")
    mastery_score: float = Field(
        ..., ge=0.0, le=1.0, description="Current mastery probability"
    )
    review_date: datetime = Field(..., description="Scheduled review date (ISO-8601)")
    days_until_review: int = Field(
        ..., ge=0, description="Days remaining until scheduled review"
    )
    ease_factor: float = Field(
        ..., description="SM-2 ease factor (default 2.5)"
    )
    interval_days: int = Field(
        ..., ge=0, description="Current SM-2 interval in days"
    )
    repetitions: int = Field(..., ge=0, description="Consecutive successful reviews")
    priority: str = Field(
        ...,
        description="Review priority: low / medium / high / overdue",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "concept_id": "math-algebra-linear-equations",
            "concept_name": "Linear Equations",
            "subject": "mathematics",
            "topic_id": "algebra",
            "mastery_score": 0.65,
            "review_date": "2026-03-17T10:00:00Z",
            "days_until_review": 2,
            "ease_factor": 2.5,
            "interval_days": 2,
            "repetitions": 2,
            "priority": "medium",
        }
    }}


class ReviewScheduleResponse(BaseModel):
    """SM-2 spaced review schedule for a student."""

    student_id: str = Field(..., description="Student identifier")
    generated_at: datetime = Field(..., description="Schedule generation timestamp")
    total_items: int = Field(..., ge=0, description="Total items due for review")
    overdue_count: int = Field(..., ge=0, description="Items past their review date")
    today_count: int = Field(..., ge=0, description="Items due today")
    upcoming_count: int = Field(
        ..., ge=0, description="Items due in the next 7 days"
    )
    items: list[ReviewItemResponse] = Field(
        ..., description="Ordered review items by priority"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-10042",
            "generated_at": "2026-03-15T10:00:00Z",
            "total_items": 12,
            "overdue_count": 3,
            "today_count": 4,
            "upcoming_count": 5,
            "items": [],
        }
    }}


class SkillTreeNodeResponse(BaseModel):
    """A single node in the skill tree visualization."""

    node_id: str = Field(..., description="Unique node identifier")
    node_type: str = Field(
        ...,
        description="Node type: subject / topic / concept / leaf",
    )
    label: str = Field(..., description="Display label for the node")
    mastery: float = Field(
        ..., ge=0.0, le=1.0, description="Mastery score for this node"
    )
    mastery_label: str = Field(
        ..., description="Human-readable mastery label"
    )
    parent_id: Optional[str] = Field(
        None, description="Parent node ID (None for root nodes)"
    )
    children: list[str] = Field(
        default_factory=list,
        description="Child node IDs",
    )
    metadata: dict[str, Any] = Field(
        default_factory=dict,
        description="Arbitrary node metadata",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "node_id": "node-math-algebra",
            "node_type": "topic",
            "label": "Algebra",
            "mastery": 0.72,
            "mastery_label": "proficient",
            "parent_id": "node-math",
            "children": ["node-math-algebra-linear", "node-math-algebra-quadratic"],
            "metadata": {"grade_level": 8},
        }
    }}


class SkillTreeEdgeResponse(BaseModel):
    """An edge in the skill tree graph."""

    source: str = Field(..., description="Source node ID")
    target: str = Field(..., description="Target node ID")
    label: Optional[str] = Field(
        None, description="Optional edge label (e.g. prerequisite)"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "source": "node-math",
            "target": "node-math-algebra",
            "label": "contains",
        }
    }}


class SkillTreeResponse(BaseModel):
    """Full skill tree data for front-end visualization."""

    student_id: str = Field(..., description="Student identifier")
    generated_at: datetime = Field(..., description="Generation timestamp")
    nodes: list[SkillTreeNodeResponse] = Field(
        ..., description="All nodes in the skill tree"
    )
    edges: list[SkillTreeEdgeResponse] = Field(
        ..., description="Edges connecting nodes"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-10042",
            "generated_at": "2026-03-15T10:00:00Z",
            "nodes": [],
            "edges": [],
        }
    }}


class MasteryTrendPoint(BaseModel):
    """A single data point in the mastery trend series."""

    date: datetime = Field(..., description="Date of this measurement")
    mastery_score: float = Field(
        ..., ge=0.0, le=1.0, description="Mastery score at this point"
    )
    attempts: int = Field(..., ge=0, description="Total attempts up to this date")
    correct: int = Field(..., ge=0, description="Total correct up to this date")

    model_config = {"json_schema_extra": {
        "example": {
            "date": "2026-03-01T00:00:00Z",
            "mastery_score": 0.45,
            "attempts": 15,
            "correct": 8,
        }
    }}


class MasteryTrendsResponse(BaseModel):
    """Mastery trends over time for a student."""

    student_id: str = Field(..., description="Student identifier")
    subject: Optional[str] = Field(
        default=None,
        description="Topic slug (None for all subjects)",
    )
    generated_at: datetime = Field(..., description="Response generation timestamp")
    trend_points: list[MasteryTrendPoint] = Field(
        ..., description="Ordered list of mastery snapshots over time"
    )
    current_mastery: float = Field(
        ..., ge=0.0, le=1.0, description="Latest mastery score"
    )
    improvement_rate: float = Field(
        ...,
        description="Improvement rate (score change per week). "
                    "Positive means improving.",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-10042",
            "subject": "mathematics",
            "generated_at": "2026-03-15T10:00:00Z",
            "trend_points": [],
            "current_mastery": 0.68,
            "improvement_rate": 0.04,
        }
    }}


class HealthResponse(BaseModel):
    """Health check response."""

    status: str = Field(..., description="Service health status")
    services: dict[str, str] = Field(
        ..., description="Availability of dependent services"
    )
    timestamp: datetime = Field(..., description="Check timestamp")


# ============================================================================
# Helper functions
# ============================================================================


def _mastery_to_label(score: float) -> str:
    """Map a mastery score [0.0, 1.0] to a human-readable label."""
    if score < 0.25:
        return "novice"
    elif score < 0.50:
        return "developing"
    elif score < 0.75:
        return "proficient"
    else:
        return "mastered"


def _priority_label(days_until: int, is_overdue: bool) -> str:
    """Determine review priority label from days until review."""
    if is_overdue:
        return "overdue"
    if days_until == 0:
        return "high"
    elif days_until <= 2:
        return "medium"
    else:
        return "low"


# ============================================================================
# Endpoints
# ============================================================================


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check for the mastery service",
    description="Returns the operational status of the mastery service and its "
                "dependent modules.",
)
async def health_check() -> HealthResponse:
    """Return health status of the mastery service and its dependencies."""
    services: dict[str, str] = {}
    services["knowledge_tracing"] = "available" if _HAS_KT else "unavailable"
    services["mastery_sync"] = "available" if _HAS_MS else "unavailable"
    services["spaced_repetition"] = "available" if _HAS_SR else "unavailable"

    all_healthy = all(v == "available" for v in services.values())
    return HealthResponse(
        status="healthy" if all_healthy else "degraded",
        services=services,
        timestamp=datetime.now(timezone.utc),
    )


@router.get(
    "/{student_id}",
    response_model=StudentMasteryResponse,
    summary="Get mastery across all subjects for a student",
    description=(
        "Returns a comprehensive mastery overview for the given student, "
        "including per-subject breakdowns with concept-level mastery scores."
    ),
)
async def get_student_mastery(
    student_id: str,
    db: AsyncSession = Depends(get_db),
) -> StudentMasteryResponse:
    """Get mastery scores across all subjects for a student."""
    logger.info("Fetching mastery overview for student %s", student_id)

    # Verify student exists
    student_result = await db.execute(
        select(Student).where(Student.id == student_id)
    )
    student = student_result.scalar_one_or_none()
    if student is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student '{student_id}' not found",
        )

    # Fetch all subjects the student has interacted with
    subjects_result = await db.execute(select(Topic))
    all_subjects = subjects_result.scalars().all()

    # Fetch mastery records for this student
    mastery_result = await db.execute(
        select(Mastery).where(Mastery.student_id == student_id)
    )
    mastery_records = mastery_result.scalars().all()

    # Index mastery records by subject -> concept
    mastery_by_subject: dict[str, dict[str, Mastery]] = {}
    for record in mastery_records:
        subj = record.subject
        if subj not in mastery_by_subject:
            mastery_by_subject[subj] = {}
        mastery_by_subject[subj][record.concept_id] = record

    # Fetch attempt counts per concept
    attempt_stats_result = await db.execute(
        select(
            Attempt.concept_id,
            func.count(Attempt.id).label("total"),
            func.sum(func.cast(Attempt.is_correct, int)).label("correct"),
        )
        .where(Attempt.student_id == student_id)
        .group_by(Attempt.concept_id)
    )
    attempt_stats = {
        row.concept_id: {"total": row.total, "correct": row.correct}
        for row in attempt_stats_result.all()
    }

    subject_responses: list[TopicMasteryResponse] = []
    for subj in all_subjects:
        subject_concepts = mastery_by_subject.get(subj.id, {})
        if not subject_concepts:
            continue

        concept_responses: list[MasteryLevelResponse] = []
        concept_scores: list[float] = []

        for concept_id, record in subject_concepts.items():
            stats = attempt_stats.get(concept_id, {"total": 0, "correct": 0})
            score = float(record.mastery_score)
            concept_responses.append(
                MasteryLevelResponse(
                    concept_id=concept_id,
                    concept_name=record.concept_name or concept_id,
                    mastery_score=score,
                    mastery_level=_mastery_to_label(score),
                    last_practiced=record.last_practiced,
                    attempts_count=stats["total"],
                    correct_count=stats["correct"],
                )
            )
            concept_scores.append(score)

        overall = sum(concept_scores) / len(concept_scores) if concept_scores else 0.0

        # Count mastered topics
        topic_result = await db.execute(
            select(func.count(Topic.id)).where(Topic.subject_id == subj.id)
        )
        topic_count = topic_result.scalar_one()

        mastered_count = sum(
            1 for c in concept_responses if c.mastery_level == "mastered"
        )

        subject_responses.append(
            TopicMasteryResponse(
                subject_id=subj.id,
                subject_name=subj.name,
                overall_mastery=round(overall, 4),
                mastery_level=_mastery_to_label(overall),
                topic_count=topic_count,
                mastered_topics=mastered_count,
                concepts=concept_responses,
                last_updated=datetime.now(timezone.utc),
            )
        )

    overall_scores = [s.overall_mastery for s in subject_responses]
    total_overall = sum(overall_scores) / len(overall_scores) if overall_scores else 0.0

    return StudentMasteryResponse(
        student_id=student_id,
        generated_at=datetime.now(timezone.utc),
        overall_mastery=round(total_overall, 4),
        subjects=subject_responses,
    )


@router.get(
    "/{student_id}/{subject}",
    response_model=TopicMasteryResponse,
    summary="Get mastery for a specific subject",
    description="Returns detailed mastery data for the given student and subject "
                "including concept-level breakdown.",
)
async def get_subject_mastery(
    student_id: str,
    subject: str,
    db: AsyncSession = Depends(get_db),
) -> TopicMasteryResponse:
    """Get mastery scores for a specific subject."""
    logger.info(
        "Fetching mastery for student %s, subject %s", student_id, subject
    )

    # Verify student exists
    student_result = await db.execute(
        select(Student).where(Student.id == student_id)
    )
    if student_result.scalar_one_or_none() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student '{student_id}' not found",
        )

    # Fetch subject
    subj_result = await db.execute(
        select(Topic).where(Topic.id == subject)
    )
    subj = subj_result.scalar_one_or_none()
    if subj is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Topic '{subject}' not found",
        )

    # Fetch mastery records for this student+subject
    mastery_result = await db.execute(
        select(Mastery)
        .where(
            Mastery.student_id == student_id,
            Mastery.subject == subject,
        )
    )
    records = mastery_result.scalars().all()

    # Fetch attempt stats
    concept_ids = [r.concept_id for r in records]
    attempt_stats: dict[str, dict[str, int]] = {}
    if concept_ids:
        att_result = await db.execute(
            select(
                Attempt.concept_id,
                func.count(Attempt.id).label("total"),
                func.sum(func.cast(Attempt.is_correct, int)).label("correct"),
            )
            .where(
                Attempt.student_id == student_id,
                Attempt.concept_id.in_(concept_ids),
            )
            .group_by(Attempt.concept_id)
        )
        for row in att_result.all():
            attempt_stats[row.concept_id] = {
                "total": row.total,
                "correct": row.correct,
            }

    concept_responses: list[MasteryLevelResponse] = []
    concept_scores: list[float] = []

    for record in records:
        stats = attempt_stats.get(record.concept_id, {"total": 0, "correct": 0})
        score = float(record.mastery_score)
        concept_responses.append(
            MasteryLevelResponse(
                concept_id=record.concept_id,
                concept_name=record.concept_name or record.concept_id,
                mastery_score=score,
                mastery_level=_mastery_to_label(score),
                last_practiced=record.last_practiced,
                attempts_count=stats["total"],
                correct_count=stats["correct"],
            )
        )
        concept_scores.append(score)

    overall = sum(concept_scores) / len(concept_scores) if concept_scores else 0.0

    topic_result = await db.execute(
        select(func.count(Topic.id)).where(Topic.subject_id == subject)
    )
    topic_count = topic_result.scalar_one()
    mastered_count = sum(
        1 for c in concept_responses if c.mastery_level == "mastered"
    )

    return TopicMasteryResponse(
        subject_id=subj.id,
        subject_name=subj.name,
        overall_mastery=round(overall, 4),
        mastery_level=_mastery_to_label(overall),
        topic_count=topic_count,
        mastered_topics=mastered_count,
        concepts=concept_responses,
        last_updated=datetime.now(timezone.utc),
    )


@router.get(
    "/{student_id}/review-schedule",
    response_model=ReviewScheduleResponse,
    summary="Get SM-2 spaced review schedule",
    description=(
        "Returns a prioritized list of concepts that are due for review, "
        "ordered by the SM-2 spaced-repetition algorithm. Includes overdue "
        "items and upcoming reviews within the next 7 days."
    ),
)
async def get_review_schedule(
    student_id: str,
    days_ahead: int = Query(
        default=7,
        ge=1,
        le=30,
        description="How many days ahead to include in the schedule",
    ),
    db: AsyncSession = Depends(get_db),
) -> ReviewScheduleResponse:
    """Get the SM-2 spaced repetition review schedule for a student."""
    logger.info(
        "Fetching review schedule for student %s (days_ahead=%d)",
        student_id,
        days_ahead,
    )

    # Verify student exists
    student_result = await db.execute(
        select(Student).where(Student.id == student_id)
    )
    if student_result.scalar_one_or_none() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student '{student_id}' not found",
        )

    now = datetime.now(timezone.utc)
    horizon = datetime.now(timezone.utc)

    # Fetch mastery records with SM-2 fields
    mastery_result = await db.execute(
        select(Mastery).where(Mastery.student_id == student_id)
    )
    records = mastery_result.scalars().all()

    # If SM-2 service is available, use it for scheduling logic
    review_items: list[ReviewItemResponse] = []
    total_items = 0
    overdue_count = 0
    today_count = 0
    upcoming_count = 0

    if _HAS_SR and SpacedRepetitionService is not None:
        try:
            sr_service = SpacedRepetitionService(db)
            scheduled = await sr_service.get_review_queue(
                student_id=student_id,
                days_ahead=days_ahead,
            )
            for item in scheduled:
                review_items.append(
                    ReviewItemResponse(
                        concept_id=item["concept_id"],
                        concept_name=item["concept_name"],
                        subject=item["subject"],
                        topic_id=item["topic_id"],
                        mastery_score=item["mastery_score"],
                        review_date=item["review_date"],
                        days_until_review=item["days_until_review"],
                        ease_factor=item.get("ease_factor", 2.5),
                        interval_days=item.get("interval_days", 0),
                        repetitions=item.get("repetitions", 0),
                        priority=item.get("priority", "medium"),
                    )
                )
            total_items = len(review_items)
            overdue_count = sum(1 for r in review_items if r.priority == "overdue")
            today_count = sum(1 for r in review_items if r.days_until_review == 0)
            upcoming_count = sum(
                1 for r in review_items if 0 < r.days_until_review <= 7
            )
        except Exception:
            logger.warning(
                "SpacedRepetitionService failed, falling back to basic schedule",
                exc_info=True,
            )

    # Fallback: compute basic review schedule from mastery records
    if not review_items:
        for record in records:
            if record.next_review_date is None:
                review_date = now
            else:
                review_date = record.next_review_date

            days_until = (review_date.date() - now.date()).days
            is_overdue = days_until < 0
            effective_days = max(days_until, 0)

            if is_overdue or effective_days <= days_ahead:
                priority = _priority_label(effective_days, is_overdue)
                review_items.append(
                    ReviewItemResponse(
                        concept_id=record.concept_id,
                        concept_name=record.concept_name or record.concept_id,
                        subject=record.subject,
                        topic_id=record.topic_id or "",
                        mastery_score=float(record.mastery_score),
                        review_date=review_date,
                        days_until_review=effective_days,
                        ease_factor=2.5,
                        interval_days=0,
                        repetitions=0,
                        priority=priority,
                    )
                )

        review_items.sort(key=lambda r: (r.days_until_review, -r.mastery_score))
        total_items = len(review_items)
        overdue_count = sum(1 for r in review_items if r.priority == "overdue")
        today_count = sum(1 for r in review_items if r.days_until_review == 0)
        upcoming_count = sum(
            1 for r in review_items if 0 < r.days_until_review <= 7
        )

    return ReviewScheduleResponse(
        student_id=student_id,
        generated_at=now,
        total_items=total_items,
        overdue_count=overdue_count,
        today_count=today_count,
        upcoming_count=upcoming_count,
        items=review_items,
    )


@router.post(
    "/{student_id}/update",
    response_model=UpdateMasteryResponse,
    summary="Update mastery after a practice/solve event",
    description=(
        "Records the outcome of a practice or solve attempt and updates "
        "the mastery model (BKT) for the given concept. Also computes the "
        "SM-2 next review date."
    ),
    status_code=status.HTTP_200_OK,
)
async def update_mastery(
    student_id: str,
    payload: UpdateMasteryRequest,
    db: AsyncSession = Depends(get_db),
) -> UpdateMasteryResponse:
    """Update mastery score after a student practice or solve attempt."""
    logger.info(
        "Updating mastery for student %s, concept %s (correct=%s)",
        student_id,
        payload.concept_id,
        payload.is_correct,
    )

    # Verify student exists
    student_result = await db.execute(
        select(Student).where(Student.id == student_id)
    )
    if student_result.scalar_one_or_none() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student '{student_id}' not found",
        )

    now = datetime.now(timezone.utc)

    # Fetch existing mastery record
    mastery_result = await db.execute(
        select(Mastery).where(
            Mastery.student_id == student_id,
            Mastery.concept_id == payload.concept_id,
        )
    )
    record = mastery_result.scalar_one_or_none()

    previous_score = float(record.mastery_score) if record else 0.5
    updated_score = previous_score

    bkt_updated = False

    # Use knowledge tracing service if available
    if _HAS_KT and KnowledgeTracingEngine is not None:
        try:
            kt_service = KnowledgeTracingEngine(db)
            updated_score = await kt_service.update_concept_mastery(
                student_id=student_id,
                concept_id=payload.concept_id,
                is_correct=payload.is_correct,
                subject=payload.subject,
                topic_id=payload.topic_id,
            )
            bkt_updated = True
        except Exception:
            logger.warning(
                "KnowledgeTracingEngine update failed, using fallback",
                exc_info=True,
            )
            bkt_updated = False

    # Fallback: simple Bayesian update
    if not bkt_updated:
        learning_rate = 0.15
        if payload.is_correct:
            updated_score = previous_score + learning_rate * (1.0 - previous_score)
        else:
            slip_rate = 0.1
            updated_score = previous_score * (1.0 - slip_rate)
        updated_score = max(0.0, min(1.0, updated_score))

    # SM-2 next review date calculation
    next_review_date: Optional[datetime] = None
    if _HAS_SR and SpacedRepetitionService is not None:
        try:
            sr_service = SpacedRepetitionService(db)
            next_review_date = await sr_service.compute_next_review(
                student_id=student_id,
                concept_id=payload.concept_id,
                quality=5 if payload.is_correct else 2,
            )
        except Exception:
            logger.warning(
                "SpacedRepetitionService compute_next_review failed",
                exc_info=True,
            )

    # Fallback SM-2: simple daily review for mastered concepts
    if next_review_date is None:
        if updated_score >= 0.75:
            next_review_date = datetime.now(timezone.utc)
        else:
            next_review_date = datetime.now(timezone.utc)

    # Update or create the mastery record
    if record is None:
        record = Mastery(
            student_id=student_id,
            concept_id=payload.concept_id,
            concept_name=payload.concept_id,
            subject=payload.subject,
            topic_id=payload.topic_id,
            mastery_score=updated_score,
            last_practiced=now,
            next_review_date=next_review_date,
        )
        db.add(record)
    else:
        record.mastery_score = updated_score
        record.last_practiced = now
        record.next_review_date = next_review_date
        if not record.concept_name:
            record.concept_name = payload.concept_id

    # Persist the attempt record
    attempt = Attempt(
        student_id=student_id,
        concept_id=payload.concept_id,
        subject=payload.subject,
        topic_id=payload.topic_id,
        is_correct=payload.is_correct,
        response_time_ms=payload.response_time_ms,
        difficulty=payload.difficulty,
        hints_used=payload.hints_used,
        attempt_id=payload.attempt_id,
        created_at=now,
    )
    db.add(attempt)

    await db.commit()
    await db.refresh(record)

    # Sync mastery to external services if available
    if _HAS_MS and MasterySyncService is not None:
        try:
            ms_service = MasterySyncService(db)
            await ms_service.sync_concept_mastery(
                student_id=student_id,
                concept_id=payload.concept_id,
                mastery_score=updated_score,
            )
        except Exception:
            logger.warning(
                "MasterySyncService sync failed", exc_info=True
            )

    updated_label = _mastery_to_label(updated_score)

    return UpdateMasteryResponse(
        concept_id=payload.concept_id,
        previous_mastery=round(previous_score, 4),
        updated_mastery=round(updated_score, 4),
        mastery_level=updated_label,
        bkt_params_updated=bkt_updated,
        next_review_date=next_review_date,
    )


@router.get(
    "/{student_id}/skill-tree",
    response_model=SkillTreeResponse,
    summary="Get skill tree data for visualization",
    description=(
        "Returns a graph representation (nodes + edges) of the student's "
        "skill tree, annotated with current mastery scores for each node. "
        "Suitable for D3.js or similar visualization libraries."
    ),
)
async def get_skill_tree(
    student_id: str,
    db: AsyncSession = Depends(get_db),
) -> SkillTreeResponse:
    """Get skill tree data for front-end visualization."""
    logger.info("Fetching skill tree for student %s", student_id)

    # Verify student exists
    student_result = await db.execute(
        select(Student).where(Student.id == student_id)
    )
    if student_result.scalar_one_or_none() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student '{student_id}' not found",
        )

    # Fetch all skill nodes for the student's subjects
    # We include all registered skill nodes regardless of student interaction
    nodes_result = await db.execute(select(Topic))
    all_nodes = nodes_result.scalars().all()

    # Fetch mastery records for this student
    mastery_result = await db.execute(
        select(Mastery).where(Mastery.student_id == student_id)
    )
    mastery_records = mastery_result.scalars().all()
    mastery_map: dict[str, float] = {
        r.concept_id: float(r.mastery_score) for r in mastery_records
    }

    # Build node name map for resolving names from mastery records
    name_map: dict[str, str] = {
        r.concept_id: (r.concept_name or r.concept_id)
        for r in mastery_records
    }

    nodes: list[SkillTreeNodeResponse] = []
    edges: list[SkillTreeEdgeResponse] = []
    node_ids: set[str] = set()

    for node in all_nodes:
        score = mastery_map.get(node.node_id, 0.0)
        label = name_map.get(node.node_id, node.label or node.node_id)

        nodes.append(
            SkillTreeNodeResponse(
                node_id=node.node_id,
                node_type=node.node_type or "concept",
                label=label,
                mastery=round(score, 4),
                mastery_label=_mastery_to_label(score),
                parent_id=node.parent_id,
                children=node.children or [],
                metadata=node.node_metadata or {},
            )
        )
        node_ids.add(node.node_id)

        if node.parent_id and node.parent_id in node_ids or True:
            # Check if parent is in our node set or will be added
            parent_node = next(
                (n for n in all_nodes if n.node_id == node.parent_id), None
            )
            if parent_node or node.parent_id is None:
                edges.append(
                    SkillTreeEdgeResponse(
                        source=node.parent_id or "",
                        target=node.node_id,
                        label="contains",
                    )
                )

    # Build edges from parent-child relationships in the node list
    node_map = {n.node_id: n for n in all_nodes}
    edges = []
    for node in all_nodes:
        if node.parent_id and node.parent_id in node_map:
            edges.append(
                SkillTreeEdgeResponse(
                    source=node.parent_id,
                    target=node.node_id,
                    label="contains",
                )
            )

    return SkillTreeResponse(
        student_id=student_id,
        generated_at=datetime.now(timezone.utc),
        nodes=nodes,
        edges=edges,
    )


@router.get(
    "/{student_id}/trends",
    response_model=MasteryTrendsResponse,
    summary="Get mastery trends over time",
    description=(
        "Returns time-series mastery data for a student, optionally filtered "
        "by subject. Includes trend points, current mastery, and improvement rate."
    ),
)
async def get_mastery_trends(
    student_id: str,
    subject: Optional[str] = Query(
        default=None,
        description="Filter to a specific subject slug (omit for all subjects)",
    ),
    db: AsyncSession = Depends(get_db),
) -> MasteryTrendsResponse:
    """Get mastery trends over time for a student."""
    logger.info(
        "Fetching mastery trends for student %s (subject=%s)",
        student_id,
        subject,
    )

    # Verify student exists
    student_result = await db.execute(
        select(Student).where(Student.id == student_id)
    )
    if student_result.scalar_one_or_none() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student '{student_id}' not found",
        )

    # Build query for attempts
    attempt_query = (
        select(
            func.date(Attempt.created_at).label("attempt_date"),
            func.count(Attempt.id).label("total"),
            func.sum(func.cast(Attempt.is_correct, int)).label("correct"),
        )
        .where(Attempt.student_id == student_id)
        .group_by(func.date(Attempt.created_at))
        .order_by(func.date(Attempt.created_at))
    )

    if subject:
        attempt_query = attempt_query.where(Attempt.subject == subject)

    attempts_result = await db.execute(attempt_query)
    attempt_rows = attempts_result.all()

    # Build mastery records query for trend
    mastery_query = select(Mastery).where(
        Mastery.student_id == student_id
    )
    if subject:
        mastery_query = mastery_query.where(Mastery.subject == subject)

    mastery_result = await db.execute(mastery_query)
    mastery_records = mastery_result.scalars().all()

    # Aggregate mastery per day from attempt data
    daily_correct: dict[str, int] = {}
    daily_total: dict[str, int] = {}
    cumulative_correct = 0
    cumulative_total = 0

    trend_points: list[MasteryTrendPoint] = []

    for row in attempt_rows:
        date_str = row.attempt_date.isoformat()
        daily_total[date_str] = row.total
        daily_correct[date_str] = row.correct or 0

        cumulative_total += row.total
        cumulative_correct += row.correct or 0

        score = (
            cumulative_correct / cumulative_total
            if cumulative_total > 0
            else 0.0
        )
        trend_points.append(
            MasteryTrendPoint(
                date=datetime.combine(
                    row.attempt_date, datetime.min.time(), tzinfo=timezone.utc
                ),
                mastery_score=round(score, 4),
                attempts=cumulative_total,
                correct=cumulative_correct,
            )
        )

    # If no attempt data, provide baseline from mastery records
    if not trend_points:
        now = datetime.now(timezone.utc)
        current_score = (
            sum(r.mastery_score for r in mastery_records) / len(mastery_records)
            if mastery_records
            else 0.0
        )
        trend_points.append(
            MasteryTrendPoint(
                date=now,
                mastery_score=round(current_score, 4),
                attempts=0,
                correct=0,
            )
        )

    current_mastery = trend_points[-1].mastery_score if trend_points else 0.0

    # Compute improvement rate: change in mastery per week
    improvement_rate = 0.0
    if len(trend_points) >= 2:
        first_score = trend_points[0].mastery_score
        last_score = trend_points[-1].mastery_score
        first_date = trend_points[0].date
        last_date = trend_points[-1].date
        days_elapsed = (last_date - first_date).total_seconds() / 86400.0
        if days_elapsed > 0:
            weeks = days_elapsed / 7.0
            improvement_rate = round((last_score - first_score) / weeks, 4)
        else:
            improvement_rate = 0.0

    return MasteryTrendsResponse(
        student_id=student_id,
        subject=subject,
        generated_at=datetime.now(timezone.utc),
        trend_points=trend_points,
        current_mastery=round(current_mastery, 4),
        improvement_rate=improvement_rate,
    )


# ============================================================================
# Router instance is exported at module level
# ============================================================================

# router is defined at the top of the file:
#   router = APIRouter(prefix="/api/mastery", tags=["mastery"])