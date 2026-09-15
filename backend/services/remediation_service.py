"""
remediation_service.py
Personalized remediation path generation and progress tracking for K-12 students.
Integrates with PracticeService, WorkedExamplesService, and MasterySync.
"""
from __future__ import annotations

import uuid
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Sequence

from fastapi import HTTPException, status
from pydantic import BaseModel, ConfigDict, Field, field_validator
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum as SQLEnum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from backend.db_types import GUID as PGUUID, JSONVariant
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import Mapped, mapped_column, relationship, DeclarativeBase

# ---------------------------------------------------------------------------
# Helpers – use PG UUID when available, fall back to plain string UUID
# ---------------------------------------------------------------------------


class Base(DeclarativeBase):
    """Shared declarative base for ORM models in this service."""
    pass
try:
    UuidCol: type = PGUUID  # type: ignore[type-arg]
    _UUID_AS_PG = True
except ImportError:
    UuidCol = String        # type: ignore[assignment]
    _UUID_AS_PG = False


def _uuid() -> str:
    return str(uuid.uuid4())


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


# ---------------------------------------------------------------------------
# ORM Models
# ---------------------------------------------------------------------------
class RemediationStatus(str, Enum):
    ACTIVE     = "active"
    COMPLETED  = "completed"
    ABANDONED  = "abandoned"
    PAUSED     = "paused"


class StepStatus(str, Enum):
    PENDING      = "pending"
    IN_PROGRESS  = "in_progress"
    COMPLETED    = "completed"
    SKIPPED      = "skipped"


class ActivityType(str, Enum):
    WALKTHROUGH   = "walkthrough"
    WORKED_EXAMPLE = "worked_example"
    PRACTICE      = "practice"
    MASTERY_CHECK = "mastery_check"
    PREREQUISITE  = "prerequisite"


class RemediationPathDB(Base):
    __tablename__ = "remediation_paths"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    student_id: Mapped[str] = mapped_column(String(36), index=True, nullable=False)
    diagnostic_result_id: Mapped[str | None] = mapped_column(String(36), nullable=True)

    status: Mapped[RemediationStatus] = mapped_column(
        SQLEnum(RemediationStatus), default=RemediationStatus.ACTIVE, index=True
    )
    total_estimated_days: Mapped[int] = mapped_column(Integer, default=0)
    total_steps: Mapped[int] = mapped_column(Integer, default=0)
    completed_steps: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=_utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=_utcnow, onupdate=_utcnow)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    # Flexible metadata: weak_topic_list, adjustment_log, etc.
    metadata_json: Mapped[dict | None] = mapped_column(JSONVariant(), nullable=True)

    steps: Mapped[list["RemediationStepDB"]] = relationship(
        "RemediationStepDB",
        back_populates="path",
        cascade="all, delete-orphan",
        order_by="RemediationStepDB.step_order",
    )


class RemediationStepDB(Base):
    __tablename__ = "remediation_steps"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    path_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("remediation_paths.id", ondelete="CASCADE"), index=True
    )
    step_order: Mapped[int] = mapped_column(Integer, nullable=False)

    topic: Mapped[str] = mapped_column(String(200), nullable=False)
    subject: Mapped[str | None] = mapped_column(String(100), nullable=True)
    learning_objectives: Mapped[list | None] = mapped_column(JSONVariant(), nullable=True)

    # Activity definitions stored as JSON
    activities: Mapped[list] = mapped_column(JSONVariant(), nullable=False, default=list)

    estimated_days: Mapped[int] = mapped_column(Integer, default=1)
    mastery_threshold: Mapped[float] = mapped_column(Float, default=70.0)

    # Prerequisites (topic names)
    prerequisites: Mapped[list | None] = mapped_column(JSONVariant(), nullable=True)

    status: Mapped[StepStatus] = mapped_column(
        SQLEnum(StepStatus), default=StepStatus.PENDING, index=True
    )

    started_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    # Diagnostic baseline mastery before this step
    diagnostic_mastery: Mapped[float | None] = mapped_column(Float, nullable=True)
    # Final mastery achieved at end of step
    final_mastery: Mapped[float | None] = mapped_column(Float, nullable=True)

    # Step-level metadata
    metadata_json: Mapped[dict | None] = mapped_column(JSONVariant(), nullable=True)

    path: Mapped[RemediationPathDB] = relationship("RemediationPathDB", back_populates="steps")


# ---------------------------------------------------------------------------
# Pydantic v2 Schemas
# ---------------------------------------------------------------------------
class ActivityResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    type: ActivityType
    title: str
    description: str
    estimated_minutes: int
    question_count: int | None = None
    completed: bool = False
    completed_at: datetime | None = None


class RemediationStepResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    path_id: str
    step_order: int
    topic: str
    subject: str | None = None
    learning_objectives: list[str] | None = None
    activities: list[ActivityResponse] = []
    estimated_days: int
    mastery_threshold: float
    prerequisites: list[str] | None = None
    status: StepStatus
    started_at: datetime | None = None
    completed_at: datetime | None = None
    diagnostic_mastery: float | None = None
    final_mastery: float | None = None


class RemediationPathResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    student_id: str
    status: RemediationStatus
    total_estimated_days: int
    total_steps: int
    completed_steps: int
    current_step: RemediationStepResponse | None = None
    next_step: RemediationStepResponse | None = None
    steps: list[RemediationStepResponse] = []
    created_at: datetime
    updated_at: datetime


class RemediationSummaryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    student_id: str
    path_id: str
    overall_progress_pct: float
    current_topic: str | None = None
    current_step_order: int | None = None
    total_steps: int
    completed_steps: int
    mastered_steps: int = 0
    struggling_steps: int = 0
    skipped_steps: int = 0
    estimated_days_remaining: int = 0
    total_estimated_days: int = 0
    path_status: RemediationStatus
    topic_progress: list[dict[str, Any]] = []
    adjustment_log: list[dict[str, Any]] = []
    created_at: datetime


class DiagnosticResult(BaseModel):
    """Input schema for diagnostic results – mirrors what a diagnostic engine produces."""
    student_id: str
    diagnostic_id: str
    topics: list[dict[str, Any]] = Field(
        description="Each dict: {topic, subject, mastery, recommended_days, learning_objectives, prerequisites}"
    )
    overall_mastery: float = Field(ge=0, le=100)
    completed_at: datetime | None = None


class StepPerformanceData(BaseModel):
    """Performance data used by adjust_path."""
    step_id: str
    mastery_before: float = Field(ge=0, le=100)
    mastery_after: float = Field(ge=0, le=100)
    questions_attempted: int = Field(ge=0)
    questions_correct: int = Field(ge=0)
    time_spent_minutes: int = Field(ge=0)
    hints_used: int = Field(default=0, ge=0)
    struggling: bool = False


class CreatePathRequest(BaseModel):
    student_id: str
    diagnostic_result: DiagnosticResult


class CompleteStepRequest(BaseModel):
    mastery_achieved: float = Field(ge=0, le=100)


class AdjustPathRequest(BaseModel):
    student_id: str
    performance: StepPerformanceData


# ---------------------------------------------------------------------------
# ActivityBuilder – constructs activity dicts for each step
# ---------------------------------------------------------------------------
class ActivityBuilder:
    """Builds ordered activity definitions for a remediation step."""

    @staticmethod
    def build_walkthrough(
        topic: str,
        subject: str | None,
        learning_objectives: list[str],
        idx: int,
    ) -> dict[str, Any]:
        return {
            "id": _uuid(),
            "type": ActivityType.WALKTHROUGH.value,
            "title": f"📖 Walkthrough: {topic}",
            "description": (
                f"Step-by-step explanation of {topic} covering "
                f"{', '.join(learning_objectives[:3])}"
                + (f" and more." if len(learning_objectives) > 3 else ".")
            ),
            "estimated_minutes": 10,
            "question_count": 0,
            "order": idx,
            "content": {
                "topic": topic,
                "subject": subject,
                "learning_objectives": learning_objectives,
            },
        }

    @staticmethod
    def build_worked_examples(
        topic: str,
        idx: int,
        num_examples: int = 3,
        difficulty_start: str = "easy",
    ) -> dict[str, Any]:
        return {
            "id": _uuid(),
            "type": ActivityType.WORKED_EXAMPLE.value,
            "title": f"💡 Worked Examples: {topic}",
            "description": (
                f"Study {num_examples} worked examples starting at "
                f"'{difficulty_start}' difficulty. Assistance fades as you progress."
            ),
            "estimated_minutes": 15 * num_examples,
            "question_count": num_examples,
            "order": idx,
            "content": {
                "topic": topic,
                "num_examples": num_examples,
                "difficulty_start": difficulty_start,
                "fading": True,
            },
        }

    @staticmethod
    def build_practice(
        topic: str,
        idx: int,
        question_count: int = 5,
        mastery_threshold: float = 70.0,
    ) -> dict[str, Any]:
        return {
            "id": _uuid(),
            "type": ActivityType.PRACTICE.value,
            "title": f"✏️ Practice Problems: {topic}",
            "description": (
                f"Solve {question_count} practice problems. "
                f"Aim for {mastery_threshold:.0f}% accuracy."
            ),
            "estimated_minutes": 5 * question_count,
            "question_count": question_count,
            "order": idx,
            "content": {
                "topic": topic,
                "question_count": question_count,
                "mastery_threshold": mastery_threshold,
            },
        }

    @staticmethod
    def build_mastery_check(
        topic: str,
        idx: int,
        mastery_threshold: float = 70.0,
        question_count: int = 5,
    ) -> dict[str, Any]:
        return {
            "id": _uuid(),
            "type": ActivityType.MASTERY_CHECK.value,
            "title": f"✅ Mastery Check: {topic}",
            "description": (
                f"Final check: {question_count} problems. "
                f"Score ≥ {mastery_threshold:.0f}% to proceed."
            ),
            "estimated_minutes": 8 * question_count,
            "question_count": question_count,
            "order": idx,
            "content": {
                "topic": topic,
                "question_count": question_count,
                "mastery_threshold": mastery_threshold,
            },
        }

    @classmethod
    def build_standard_activities(
        cls,
        topic: str,
        subject: str | None,
        learning_objectives: list[str],
        mastery_threshold: float,
        num_practice: int = 5,
        num_check: int = 5,
    ) -> list[dict[str, Any]]:
        """Build the canonical 4-activity sequence: walkthrough → examples → practice → check."""
        return [
            cls.build_walkthrough(topic, subject, learning_objectives, 0),
            cls.build_worked_examples(topic, 1),
            cls.build_practice(topic, 2, num_practice, mastery_threshold),
            cls.build_mastery_check(topic, 3, mastery_threshold, num_check),
        ]

    @classmethod
    def build_struggling_activities(
        cls,
        topic: str,
        subject: str | None,
        learning_objectives: list[str],
        mastery_threshold: float,
        prerequisites: list[str],
    ) -> list[dict[str, Any]]:
        """Extended sequence for struggling students: add prereq review before walkthrough."""
        prereq_activities: list[dict[str, Any]] = []
        for i, prereq in enumerate(prerequisites):
            prereq_activities.append({
                "id": _uuid(),
                "type": ActivityType.PREREQUISITE.value,
                "title": f"🔗 Prerequisite Review: {prereq}",
                "description": f"Review {prereq} — essential background for {topic}.",
                "estimated_minutes": 10,
                "question_count": 3,
                "order": i,
                "content": {"topic": prereq, "is_prerequisite_for": topic},
            })
        rest = cls.build_standard_activities(topic, subject, learning_objectives, mastery_threshold)
        rest = [{**a, "order": a["order"] + len(prereq_activities)} for a in rest]
        return prereq_activities + rest

    @classmethod
    def build_excel_activities(
        cls,
        topic: str,
        subject: str | None,
        learning_objectives: list[str],
        mastery_threshold: float,
    ) -> list[dict[str, Any]]:
        """Condensed sequence for strong students: skip walkthrough, fewer problems."""
        return [
            cls.build_walkthrough(topic, subject, learning_objectives, 0),
            cls.build_mastery_check(topic, 1, mastery_threshold, 5),
        ]


# ---------------------------------------------------------------------------
# DiagnosticInterpreter – converts raw diagnostic output to step definitions
# ---------------------------------------------------------------------------
class DiagnosticInterpreter:
    """
    Converts raw diagnostic results into ordered remediation steps.
    Sorts by mastery gap (lowest mastery first) and estimates total days.
    """

    MIN_DAYS = 1
    DAYS_PER_MASTERY_POINT_BELOW_50 = 0.1  # 10 pts below 50 → +1 day
    DEFAULT_PRACTICE_COUNT = 5
    DEFAULT_MASTERY_THRESHOLD = 70.0

    @classmethod
    def interpret(cls, diagnostic: DiagnosticResult) -> list[dict[str, Any]]:
        if not diagnostic.topics:
            return []

        # Sort by mastery ascending (weakest first)
        sorted_topics = sorted(diagnostic.topics, key=lambda t: t.get("mastery", 100))

        steps: list[dict[str, Any]] = []
        for i, topic_data in enumerate(sorted_topics):
            mastery = topic_data.get("mastery", 50)
            recommended_days = topic_data.get("recommended_days")

            # Auto-estimate days if not provided: base 1 + deficit below 50
            if recommended_days is None:
                deficit = max(0, 50 - mastery)
                recommended_days = max(
                    cls.MIN_DAYS,
                    round(cls.MIN_DAYS + deficit * cls.DAYS_PER_MASTERY_POINT_BELOW_50),
                )

            # Scale practice count inversely with current mastery
            if mastery < 30:
                practice_count = cls.DEFAULT_PRACTICE_COUNT + 3
            elif mastery < 50:
                practice_count = cls.DEFAULT_PRACTICE_COUNT + 1
            else:
                practice_count = cls.DEFAULT_PRACTICE_COUNT

            step: dict[str, Any] = {
                "step_order": i,
                "topic": topic_data["topic"],
                "subject": topic_data.get("subject"),
                "learning_objectives": topic_data.get("learning_objectives", []),
                "prerequisites": topic_data.get("prerequisites", []),
                "estimated_days": recommended_days,
                "mastery_threshold": cls.DEFAULT_MASTERY_THRESHOLD,
                "diagnostic_mastery": mastery,
                "practice_count": practice_count,
            }
            steps.append(step)

        return steps

    @classmethod
    def total_days(cls, steps: list[dict[str, Any]]) -> int:
        return sum(s.get("estimated_days", 1) for s in steps)


# ---------------------------------------------------------------------------
# PathAdjuster – rules-based dynamic path adjustment
# ---------------------------------------------------------------------------
class PathAdjuster:
    """
    Applies adjustment rules to an active remediation path based on
    per-step performance data.  No external API required.
    """

    STRUGGLE_MASTERY_CUTOFF     = 0.30   # below → add prereqs + more practice
    MODERATE_MASTERY_CUTOFF     = 0.60   # below → add practice
    EXCEL_MASTERY_CUTOFF        = 0.85   # above → skip / reduce
    EXTRA_PRACTICE_COUNT        = 5
    EXTRA_WORKED_EXAMPLES       = 2

    @classmethod
    def should_skip_ahead(cls, mastery_after: float) -> bool:
        return mastery_after >= cls.EXCEL_MASTERY_CUTOFF * 100

    @classmethod
    def needs_more_practice(cls, mastery_after: float) -> bool:
        return mastery_after < cls.MODERATE_MASTERY_CUTOFF * 100

    @classmethod
    def is_struggling(cls, mastery_after: float, mastery_before: float) -> bool:
        """Struggling = low final mastery AND minimal progress."""
        return (
            mastery_after < cls.STRUGGLE_MASTERY_CUTOFF * 100
            and (mastery_after - mastery_before) < 10
        )

    @classmethod
    def build_adjustment(
        cls,
        step: RemediationStepDB,
        perf: StepPerformanceData,
    ) -> dict[str, Any] | None:
        """
        Return an adjustment dict or None if no adjustment needed.
        Adjustment dict: {action, reason, added_activities, metadata_changes}
        """
        if cls.is_struggling(perf.mastery_after, perf.mastery_before):
            return cls._struggling_adjustment(step, perf)
        if cls.needs_more_practice(perf.mastery_after):
            return cls._moderate_adjustment(step, perf)
        if cls.should_skip_ahead(perf.mastery_after):
            return cls._excel_adjustment(step, perf)
        return None

    @classmethod
    def _struggling_adjustment(
        cls, step: RemediationStepDB, perf: StepPerformanceData
    ) -> dict[str, Any]:
        prereqs = (step.metadata_json or {}).get("prerequisites", []) if step.metadata_json else []
        added_activities: list[dict[str, Any]] = []

        if prereqs:
            for i, prereq in enumerate(prereqs):
                added_activities.append({
                    "id": _uuid(),
                    "type": ActivityType.PREREQUISITE.value,
                    "title": f"🔗 Prerequisite Review: {prereq}",
                    "description": f"Reviewing {prereq} — essential background.",
                    "estimated_minutes": 10,
                    "question_count": 3,
                    "order": len(step.activities) + i,
                    "content": {"topic": prereq, "triggered_by": "struggling"},
                })

        added_activities.append({
            "id": _uuid(),
            "type": ActivityType.PRACTICE.value,
            "title": f"✏️ Extra Practice: {step.topic}",
            "description": (
                f"Additional {cls.EXTRA_PRACTICE_COUNT} practice problems "
                f"to reinforce fundamentals."
            ),
            "estimated_minutes": 5 * cls.EXTRA_PRACTICE_COUNT,
            "question_count": cls.EXTRA_PRACTICE_COUNT,
            "order": len(step.activities) + len(added_activities),
            "content": {
                "topic": step.topic,
                "triggered_by": "struggling",
                "mastery_threshold": step.mastery_threshold,
            },
        })

        added_activities.append({
            "id": _uuid(),
            "type": ActivityType.WORKED_EXAMPLE.value,
            "title": f"💡 Additional Worked Examples: {step.topic}",
            "description": (
                f"{cls.EXTRA_WORKED_EXAMPLES} more worked examples at easy difficulty."
            ),
            "estimated_minutes": 15 * cls.EXTRA_WORKED_EXAMPLES,
            "question_count": cls.EXTRA_WORKED_EXAMPLES,
            "order": len(step.activities) + len(added_activities),
            "content": {
                "topic": step.topic,
                "difficulty": "easy",
                "triggered_by": "struggling",
            },
        })

        return {
            "action": "add_remediation",
            "reason": (
                f"Mastery {perf.mastery_after:.1f}% with minimal progress "
                f"(Δ {perf.mastery_after - perf.mastery_before:.1f}%)"
            ),
            "added_activities": added_activities,
            "metadata_changes": {"last_adjustment_reason": "struggling", "adjustment_count": 1},
            "estimated_day_increase": 1,
        }

    @classmethod
    def _moderate_adjustment(
        cls, step: RemediationStepDB, perf: StepPerformanceData
    ) -> dict[str, Any]:
        extra = {
            "id": _uuid(),
            "type": ActivityType.PRACTICE.value,
            "title": f"✏️ More Practice: {step.topic}",
            "description": (
                f"Extra {cls.EXTRA_PRACTICE_COUNT} practice problems "
                f"to reach mastery threshold."
            ),
            "estimated_minutes": 5 * cls.EXTRA_PRACTICE_COUNT,
            "question_count": cls.EXTRA_PRACTICE_COUNT,
            "order": len(step.activities),
            "content": {
                "topic": step.topic,
                "triggered_by": "moderate",
                "mastery_threshold": step.mastery_threshold,
            },
        }
        return {
            "action": "add_practice",
            "reason": f"Mastery {perf.mastery_after:.1f}% below comfortable threshold; more practice needed.",
            "added_activities": [extra],
            "metadata_changes": {"last_adjustment_reason": "moderate"},
            "estimated_day_increase": 0,
        }

    @classmethod
    def _excel_adjustment(
        cls, step: RemediationStepDB, perf: StepPerformanceData
    ) -> dict[str, Any]:
        return {
            "action": "reduce_step",
            "reason": (
                f"Excellent mastery {perf.mastery_after:.1f}% — "
                f"step can be expedited."
            ),
            "added_activities": [],
            "metadata_changes": {"last_adjustment_reason": "excel", "can_skip": True},
            "estimated_day_decrease": 1,
        }


# ---------------------------------------------------------------------------
# RemediationService
# ---------------------------------------------------------------------------
class RemediationService:
    """
    Creates, tracks, and dynamically adjusts personalized remediation paths
    for students based on diagnostic results and live performance data.
    """

    def __init__(
        self,
        db: AsyncSession,
        practice_service: Any,           # PracticeService
        worked_examples_service: Any,    # WorkedExamplesService
        mastery_sync: Any,               # MasterySync (BKT/IRT/AFM)
        llm_client: Any | None = None,   # LLMClient (optional – for walkthroughs)
    ):
        self.db = db
        self.practice_service    = practice_service
        self.worked_examples_svc = worked_examples_service
        self.mastery_sync        = mastery_sync
        self.llm_client          = llm_client

    # ------------------------------------------------------------------
    # CREATE_PATH
    # ------------------------------------------------------------------
    async def create_path(
        self,
        student_id: str,
        diagnostic_result: DiagnosticResult,
    ) -> RemediationPathResponse:
        """
        Build a full remediation path from diagnostic results.

        Steps:
        1. Validate diagnostic data
        2. Interpret diagnostic → ordered list of step definitions
        3. Build activity sequences for each step
        4. Persist path + steps to database
        """
        if not diagnostic_result.topics:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Diagnostic result contains no weak topics.",
            )

        # Cancel any existing active path for this student
        await self._deactivate_existing_paths(student_id)

        # Interpret diagnostic into step definitions
        step_defs = DiagnosticInterpreter.interpret(diagnostic_result)
        total_days = DiagnosticInterpreter.total_days(step_defs)

        # Build ORM objects
        now = _utcnow()
        path_db = RemediationPathDB(
            id=_uuid(),
            student_id=student_id,
            diagnostic_result_id=diagnostic_result.diagnostic_id,
            status=RemediationStatus.ACTIVE,
            total_estimated_days=total_days,
            total_steps=len(step_defs),
            completed_steps=0,
            created_at=now,
            updated_at=now,
            metadata_json={
                "weak_topics": [s["topic"] for s in step_defs],
                "overall_mastery": diagnostic_result.overall_mastery,
                "diagnostic_id": diagnostic_result.diagnostic_id,
                "adjustment_log": [],
            },
        )

        step_dbs: list[RemediationStepDB] = []
        for step_def in step_defs:
            topic      = step_def["topic"]
            subject    = step_def.get("subject")
            objectives = step_def.get("learning_objectives", [])
            prereqs    = step_def.get("prerequisites", [])
            threshold  = step_def.get("mastery_threshold", 70.0)
            practice_n = step_def.get("practice_count", 5)

            # Build activities
            if prereqs:
                activities = ActivityBuilder.build_struggling_activities(
                    topic, subject, objectives, threshold, prereqs
                )
            else:
                activities = ActivityBuilder.build_standard_activities(
                    topic, subject, objectives, threshold, practice_n
                )

            step_db = RemediationStepDB(
                id=_uuid(),
                path_id=path_db.id,
                step_order=step_def["step_order"],
                topic=topic,
                subject=subject,
                learning_objectives=objectives,
                activities=activities,
                estimated_days=step_def["estimated_days"],
                mastery_threshold=threshold,
                prerequisites=prereqs,
                status=StepStatus.PENDING,
                diagnostic_mastery=step_def.get("diagnostic_mastery"),
                metadata_json={
                    "prerequisites": prereqs,
                    "practice_count": practice_n,
                    "activity_completions": {},
                    "adjustment_count": 0,
                },
            )
            step_dbs.append(step_db)

        self.db.add(path_db)
        self.db.add_all(step_dbs)
        await self.db.commit()
        await self.db.refresh(path_db)

        return await self._serialize_path(path_db)

    # ------------------------------------------------------------------
    # GET_PATH
    # ------------------------------------------------------------------
    async def get_path(self, student_id: str) -> RemediationPathResponse | None:
        """Return the active remediation path (with progress) for a student."""
        stmt = (
            select(RemediationPathDB)
            .where(RemediationPathDB.student_id == student_id)
            .where(RemediationPathDB.status == RemediationStatus.ACTIVE)
            .order_by(RemediationPathDB.created_at.desc())
            .limit(1)
        )
        result = await self.db.execute(stmt)
        path_db = result.scalar_one_or_none()
        if path_db is None:
            return None

        # Refresh steps
        step_stmt = select(RemediationStepDB).where(
            RemediationStepDB.path_id == path_db.id
        ).order_by(RemediationStepDB.step_order)
        step_result = await self.db.execute(step_stmt)
        steps = list(step_result.scalars().all())
        path_db.steps = steps

        return await self._serialize_path(path_db)

    # ------------------------------------------------------------------
    # START_STEP
    # ------------------------------------------------------------------
    async def start_step(self, student_id: str, step_id: str) -> RemediationStepResponse:
        """Mark a remediation step as in_progress."""
        step_db = await self._get_step(student_id, step_id)
        if step_db is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Remediation step not found.",
            )
        if step_db.status == StepStatus.COMPLETED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Step already completed.",
            )
        if step_db.status == StepStatus.IN_PROGRESS:
            return await self._serialize_step(step_db)

        step_db.status = StepStatus.IN_PROGRESS
        step_db.started_at = _utcnow()
        await self.db.commit()
        await self.db.refresh(step_db)
        return await self._serialize_step(step_db)

    # ------------------------------------------------------------------
    # COMPLETE_STEP
    # ------------------------------------------------------------------
    async def complete_step(
        self,
        student_id: str,
        step_id: str,
        mastery_achieved: float,
    ) -> RemediationStepResponse:
        """
        Mark a step complete, sync mastery, advance to next step, and
        check for path-wide completion.
        """
        step_db = await self._get_step(student_id, step_id)
        if step_db is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Remediation step not found.",
            )

        path_db = await self._get_path_by_id(step_db.path_id)
        if path_db is None or path_db.student_id != student_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Path does not belong to this student.",
            )

        now = _utcnow()
        step_db.status = StepStatus.COMPLETED
        step_db.completed_at = now
        step_db.final_mastery = mastery_achieved

        # Mark all activities as completed
        for activity in step_db.activities:
            activity["completed"] = True
            activity["completed_at"] = now.isoformat()

        # Update metadata
        meta = step_db.metadata_json or {}
        meta["activity_completions"] = {
            a["id"]: True for a in step_db.activities
        }
        step_db.metadata_json = meta

        # ---- Sync mastery via MasterySync ----
        try:
            sync_result = await self._sync_mastery(student_id, step_db.topic, mastery_achieved)
            step_db.metadata_json = {
                **(step_db.metadata_json or {}),
                "mastery_sync_result": sync_result,
            }
        except Exception as exc:
            step_db.metadata_json = {
                **(step_db.metadata_json or {}),
                "mastery_sync_error": str(exc),
            }

        # ---- Update path counters ----
        path_db.completed_steps += 1
        path_db.updated_at = now

        # ---- Check if path is fully complete ----
        if path_db.completed_steps >= path_db.total_steps:
            path_db.status = RemediationStatus.COMPLETED
            path_db.completed_at = now

        await self.db.commit()
        await self.db.refresh(step_db)
        await self.db.refresh(path_db)

        # Mark next pending step as available
        next_step = await self._get_next_pending_step(path_db.id)
        if next_step:
            # Just update; the student explicitly starts it via start_step
            pass

        return await self._serialize_step(step_db)

    # ------------------------------------------------------------------
    # ADJUST_PATH
    # ------------------------------------------------------------------
    async def adjust_path(
        self,
        student_id: str,
        performance_data: StepPerformanceData,
    ) -> dict[str, Any]:
        """
        Dynamically adjust the active path based on step performance.

        Actions:
        - 'add_remediation': struggling → prereqs + extra practice
        - 'add_practice': moderate struggle → extra practice
        - 'reduce_step': excellent → can skip, reduce est. days
        - None: no adjustment needed
        """
        path_db = await self._get_active_path(student_id)
        if path_db is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No active remediation path found.",
            )

        step_db = await self._get_step_by_id(performance_data.step_id)
        if step_db is None or step_db.path_id != path_db.id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Step not found in student's active path.",
            )

        # Only adjust in-progress or just-completed steps
        if step_db.status not in (StepStatus.IN_PROGRESS, StepStatus.COMPLETED):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Cannot adjust step with status '{step_db.status.value}'.",
            )

        adjustment = PathAdjuster.build_adjustment(step_db, performance_data)

        if adjustment is None:
            return {
                "action": None,
                "reason": "No adjustment needed — student progressing well.",
                "step_id": step_db.id,
                "topic": step_db.topic,
            }

        # Apply adjustment
        action_type = adjustment["action"]

        if action_type in ("add_remediation", "add_practice"):
            new_activities = adjustment.get("added_activities", [])
            step_db.activities.extend(new_activities)

            # Update est. days
            day_increase = adjustment.get("estimated_day_increase", 0)
            if day_increase:
                step_db.estimated_days += day_increase
                path_db.total_estimated_days += day_increase

            adj_meta = (step_db.metadata_json or {}).get("adjustment_count", 0) + 1
            meta_changes = adjustment.get("metadata_changes", {})
            meta_changes["adjustment_count"] = adj_meta
            step_db.metadata_json = {
                **(step_db.metadata_json or {}),
                **meta_changes,
            }

            # If step was already completed but more practice added, reopen it
            if step_db.status == StepStatus.COMPLETED and action_type == "add_practice":
                step_db.status = StepStatus.IN_PROGRESS
                step_db.completed_at = None
                path_db.completed_steps = max(0, path_db.completed_steps - 1)

        elif action_type == "reduce_step":
            day_decrease = adjustment.get("estimated_day_decrease", 0)
            if day_decrease:
                step_db.estimated_days = max(1, step_db.estimated_days - day_decrease)
                path_db.total_estimated_days = max(
                    1, path_db.total_estimated_days - day_decrease
                )
            meta_changes = adjustment.get("metadata_changes", {})
            step_db.metadata_json = {
                **(step_db.metadata_json or {}),
                **meta_changes,
            }

        path_db.updated_at = _utcnow()

        # Append to adjustment log
        path_meta = path_db.metadata_json or {}
        log = path_meta.get("adjustment_log", [])
        log.append({
            "timestamp": _utcnow().isoformat(),
            "step_id": step_db.id,
            "topic": step_db.topic,
            "action": action_type,
            "reason": adjustment.get("reason"),
            "mastery_before": performance_data.mastery_before,
            "mastery_after": performance_data.mastery_after,
        })
        path_meta["adjustment_log"] = log
        path_db.metadata_json = path_meta

        await self.db.commit()

        return {
            "action": action_type,
            "reason": adjustment.get("reason"),
            "step_id": step_db.id,
            "topic": step_db.topic,
            "added_activities_count": len(adjustment.get("added_activities", [])),
            "new_estimated_days": step_db.estimated_days,
            "total_path_estimated_days": path_db.total_estimated_days,
        }

    # ------------------------------------------------------------------
    # GET_REMEDIATION_SUMMARY
    # ------------------------------------------------------------------
    async def get_remediation_summary(
        self, student_id: str
    ) -> RemediationSummaryResponse | None:
        """Summary for parents/teachers: overall progress, per-topic breakdown."""
        path_db = await self._get_active_path(student_id)
        if path_db is None:
            return None

        # Refresh steps
        step_stmt = select(RemediationStepDB).where(
            RemediationStepDB.path_id == path_db.id
        ).order_by(RemediationStepDB.step_order)
        result = await self.db.execute(step_stmt)
        steps = list(result.scalars().all())
        path_db.steps = steps

        total_steps     = path_db.total_steps
        completed_steps = path_db.completed_steps
        overall_pct     = (
            (completed_steps / total_steps * 100) if total_steps > 0 else 0.0
        )

        current_step = next(
            (s for s in steps if s.status == StepStatus.IN_PROGRESS), None
        )
        next_step = next(
            (s for s in steps if s.status == StepStatus.PENDING), None
        )

        # Days remaining
        days_remaining = sum(
            s.estimated_days for s in steps if s.status in (StepStatus.PENDING, StepStatus.IN_PROGRESS)
        )

        # Topic-level progress
        topic_progress: list[dict[str, Any]] = []
        for s in steps:
            topic_progress.append({
                "step_order": s.step_order,
                "topic": s.topic,
                "subject": s.subject,
                "status": s.status.value,
                "diagnostic_mastery": s.diagnostic_mastery,
                "final_mastery": s.final_mastery,
                "estimated_days": s.estimated_days,
                "mastery_threshold": s.mastery_threshold,
                "progress_pct": (
                    round(s.final_mastery, 1) if s.final_mastery is not None
                    else round(s.diagnostic_mastery or 0, 1)
                ),
            })

        adjustment_log = (path_db.metadata_json or {}).get("adjustment_log", [])

        return RemediationSummaryResponse(
            student_id=student_id,
            path_id=path_db.id,
            overall_progress_pct=round(overall_pct, 1),
            current_topic=current_step.topic if current_step else next_step.topic if next_step else None,
            current_step_order=current_step.step_order if current_step else None,
            total_steps=total_steps,
            completed_steps=completed_steps,
            mastered_steps=sum(
                1 for s in steps
                if s.status == StepStatus.COMPLETED
                and (s.final_mastery or 0) >= s.mastery_threshold
            ),
            struggling_steps=sum(
                1 for s in steps if (
                    (s.metadata_json or {}).get("last_adjustment_reason") == "struggling"
                )
            ),
            skipped_steps=sum(1 for s in steps if s.status == StepStatus.SKIPPED),
            estimated_days_remaining=days_remaining,
            total_estimated_days=path_db.total_estimated_days,
            path_status=path_db.status,
            topic_progress=topic_progress,
            adjustment_log=adjustment_log,
            created_at=path_db.created_at,
        )

    # ------------------------------------------------------------------
    # Helper: mark activity complete within a step
    # ------------------------------------------------------------------
    async def complete_activity(
        self,
        student_id: str,
        step_id: str,
        activity_id: str,
    ) -> dict[str, Any]:
        """Mark a single activity as completed within a remediation step."""
        step_db = await self._get_step(student_id, step_id)
        if step_db is None:
            raise HTTPException(status_code=404, detail="Step not found.")

        found = False
        completions: dict[str, Any] = (step_db.metadata_json or {}).get(
            "activity_completions", {}
        )

        for activity in step_db.activities:
            if activity["id"] == activity_id:
                if activity.get("completed"):
                    return {"status": "already_completed", "activity_id": activity_id}
                activity["completed"] = True
                activity["completed_at"] = _utcnow().isoformat()
                completions[activity_id] = _utcnow().isoformat()
                found = True
                break

        if not found:
            raise HTTPException(status_code=404, detail="Activity not found in step.")

        step_db.metadata_json = {
            **(step_db.metadata_json or {}),
            "activity_completions": completions,
        }
        await self.db.commit()
        return {
            "status": "completed",
            "activity_id": activity_id,
            "step_id": step_id,
        }

    # ------------------------------------------------------------------
    # Abandon a path
    # ------------------------------------------------------------------
    async def abandon_path(self, student_id: str, path_id: str) -> None:
        path_db = await self._get_path_by_id(path_id)
        if path_db is None or path_db.student_id != student_id:
            raise HTTPException(status_code=404, detail="Path not found.")
        path_db.status = RemediationStatus.ABANDONED
        path_db.updated_at = _utcnow()
        await self.db.commit()

    # ------------------------------------------------------------------
    # Serializers
    # ------------------------------------------------------------------
    async def _serialize_path(
        self, path_db: RemediationPathDB
    ) -> RemediationPathResponse:
        steps = sorted(path_db.steps, key=lambda s: s.step_order)
        step_responses = [await self._serialize_step(s) for s in steps]

        current = next(
            (s for s in step_responses if s.status == StepStatus.IN_PROGRESS), None
        )
        next_s = next(
            (s for s in step_responses if s.status == StepStatus.PENDING), None
        )

        return RemediationPathResponse(
            id=path_db.id,
            student_id=path_db.student_id,
            status=path_db.status,
            total_estimated_days=path_db.total_estimated_days,
            total_steps=path_db.total_steps,
            completed_steps=path_db.completed_steps,
            current_step=current,
            next_step=next_s,
            steps=step_responses,
            created_at=path_db.created_at,
            updated_at=path_db.updated_at,
        )

    async def _serialize_step(
        self, step_db: RemediationStepDB
    ) -> RemediationStepResponse:
        activity_responses = [
            ActivityResponse(
                id=a["id"],
                type=ActivityType(a["type"]),
                title=a["title"],
                description=a["description"],
                estimated_minutes=a["estimated_minutes"],
                question_count=a.get("question_count"),
                completed=bool(a.get("completed", False)),
                completed_at=(
                    datetime.fromisoformat(a["completed_at"])
                    if a.get("completed_at")
                    else None
                ),
            )
            for a in sorted(step_db.activities, key=lambda x: x.get("order", 0))
        ]
        return RemediationStepResponse(
            id=step_db.id,
            path_id=step_db.path_id,
            step_order=step_db.step_order,
            topic=step_db.topic,
            subject=step_db.subject,
            learning_objectives=step_db.learning_objectives or [],
            activities=activity_responses,
            estimated_days=step_db.estimated_days,
            mastery_threshold=step_db.mastery_threshold,
            prerequisites=step_db.prerequisites,
            status=step_db.status,
            started_at=step_db.started_at,
            completed_at=step_db.completed_at,
            diagnostic_mastery=step_db.diagnostic_mastery,
            final_mastery=step_db.final_mastery,
        )

    # ------------------------------------------------------------------
    # Internal DB helpers
    # ------------------------------------------------------------------
    async def _get_active_path(self, student_id: str) -> RemediationPathDB | None:
        stmt = (
            select(RemediationPathDB)
            .where(RemediationPathDB.student_id == student_id)
            .where(RemediationPathDB.status == RemediationStatus.ACTIVE)
            .order_by(RemediationPathDB.created_at.desc())
            .limit(1)
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def _get_path_by_id(self, path_id: str) -> RemediationPathDB | None:
        stmt = select(RemediationPathDB).where(RemediationPathDB.id == path_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def _get_step(
        self, student_id: str, step_id: str
    ) -> RemediationStepDB | None:
        stmt = (
            select(RemediationStepDB)
            .join(RemediationPathDB, RemediationStepDB.path_id == RemediationPathDB.id)
            .where(RemediationStepDB.id == step_id)
            .where(RemediationPathDB.student_id == student_id)
            .where(RemediationPathDB.status == RemediationStatus.ACTIVE)
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def _get_step_by_id(self, step_id: str) -> RemediationStepDB | None:
        stmt = select(RemediationStepDB).where(RemediationStepDB.id == step_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def _get_next_pending_step(self, path_id: str) -> RemediationStepDB | None:
        stmt = (
            select(RemediationStepDB)
            .where(RemediationStepDB.path_id == path_id)
            .where(RemediationStepDB.status == StepStatus.PENDING)
            .order_by(RemediationStepDB.step_order)
            .limit(1)
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def _deactivate_existing_paths(self, student_id: str) -> None:
        """Cancel any existing active paths before creating a new one."""
        stmt = (
            select(RemediationPathDB)
            .where(RemediationPathDB.student_id == student_id)
            .where(RemediationPathDB.status == RemediationStatus.ACTIVE)
        )
        result = await self.db.execute(stmt)
        existing = result.scalars().all()
        for path in existing:
            path.status = RemediationStatus.ABANDONED
            path.updated_at = _utcnow()

    # ------------------------------------------------------------------
    # Mastery sync (thin wrapper over existing MasterySync)
    # ------------------------------------------------------------------
    async def _sync_mastery(
        self, student_id: str, topic: str, mastery_achieved: float
    ) -> dict[str, Any]:
        """
        Call the existing MasterySync to update the student's mastery model.
        Works with BKTModel, IRTModel, or AFMModel depending on config.
        """
        try:
            result = await self.mastery_sync.update_mastery(
                student_id=student_id,
                topic=topic,
                score=mastery_achieved,
                model_type="bkt",   # default; configurable via mastery_sync
            )
            return {"synced": True, "model": "bkt", "result": result}
        except AttributeError:
            # Fallback: attempt alternate method name used in existing codebase
            result = await self.mastery_sync.sync(
                student_id=student_id,
                topic=topic,
                mastery_score=mastery_achieved,
            )
            return {"synced": True, "model": "unknown", "result": result}

    # ------------------------------------------------------------------
    # Walkthrough content generation (delegates to LLM if available)
    # ------------------------------------------------------------------
    async def get_walkthrough_content(
        self, student_id: str, step_id: str, activity_id: str
    ) -> dict[str, Any]:
        """
        Generate or retrieve walkthrough content.  If an LLM client is
        configured, uses it for personalized generation.  Otherwise,
        returns the cached content from the activity definition.
        """
        step_db = await self._get_step(student_id, step_id)
        if step_db is None:
            raise HTTPException(status_code=404, detail="Step not found.")

        activity = next(
            (a for a in step_db.activities if a["id"] == activity_id), None
        )
        if activity is None:
            raise HTTPException(status_code=404, detail="Activity not found.")

        if activity["type"] != ActivityType.WALKTHROUGH.value:
            raise HTTPException(
                status_code=400,
                detail=f"Activity type '{activity['type']}' does not have walkthrough content.",
            )

        # If LLM is available and content not yet generated, generate it
        content = activity.get("content", {})
        if not content.get("generated") and self.llm_client is not None:
            topic = activity["content"]["topic"]
            objectives = activity["content"].get("learning_objectives", [])
            generated = await self._generate_walkthrough_llm(topic, objectives)
            content = {**content, **generated, "generated": True}
            activity["content"] = content
            await self.db.commit()

        return content or activity.get("content", {})

    async def _generate_walkthrough_llm(
        self, topic: str, learning_objectives: list[str]
    ) -> dict[str, Any]:
        """Generate walkthrough content via the OpenAI-compatible LLM client."""
        if self.llm_client is None:
            return {}

        prompt = (
            f"Generate a step-by-step walkthrough for the topic '{topic}'.\n"
            f"Learning objectives: {', '.join(learning_objectives)}\n\n"
            "Return JSON with keys: "
            "{'explanation': str, 'key_formulas': [str], 'examples': [str], 'summary': str}"
        )
        try:
            response = await self.llm_client.chat(
                messages=[
                    {"role": "system", "content": "You are a math tutor."},
                    {"role": "user", "content": prompt},
                ],
                response_format={"type": "json_object"},
            )
            return response  # type: ignore[return-value]
        except Exception:
            return {}

    # ------------------------------------------------------------------
    # Practice question retrieval (delegates to PracticeService)
    # ------------------------------------------------------------------
    async def get_practice_questions(
        self,
        student_id: str,
        step_id: str,
        activity_id: str,
        count: int = 5,
    ) -> list[dict[str, Any]]:
        """
        Fetch practice questions for a given activity within a step.
        Delegates to the existing PracticeService (IRT-based question selector).
        """
        step_db = await self._get_step(student_id, step_id)
        if step_db is None:
            raise HTTPException(status_code=404, detail="Step not found.")

        activity = next(
            (a for a in step_db.activities if a["id"] == activity_id), None
        )
        if activity is None:
            raise HTTPException(status_code=404, detail="Activity not found.")

        if activity["type"] not in (
            ActivityType.PRACTICE.value,
            ActivityType.MASTERY_CHECK.value,
            ActivityType.WORKED_EXAMPLE.value,
        ):
            raise HTTPException(
                status_code=400,
                detail=f"Activity type '{activity['type']}' does not have practice questions.",
            )

        topic = activity["content"]["topic"]
        try:
            questions = await self.practice_service.get_questions(
                student_id=student_id,
                topic=topic,
                count=count,
                include_explanations=True,
            )
            return questions  # type: ignore[return-value]
        except Exception:
            # Fallback: return empty list if PracticeService is unavailable
            return []