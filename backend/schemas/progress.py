from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel

from backend.schemas.auth import UserInfo
from backend.schemas.content import RecommendedLessonSchema


class MasteryRecordSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    node_id: str
    mastery_probability: float = 0.0
    p_known: float = 0.0
    attempts: int = 0
    last_attempt_at: Optional[str] = None


class SubjectMasterySchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    subject: str
    total_nodes: int = 0
    mastered_nodes: int = 0
    learning_nodes: int = 0
    not_started_nodes: int = 0
    mastery_percentage: int = 0
    weekly_change: int = 0


class ProgressOverviewSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    total_nodes: int = 0
    mastered_nodes: int = 0
    study_time_hours: int = 0
    avg_mastery: int = 0
    subjects: List[SubjectMasterySchema] = Field(default_factory=list)


class ActivitySchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    id: str
    activity_type: str
    title: str
    subject: Optional[str] = None
    score: Optional[str] = None
    time: str


class ReviewItemSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    id: str
    node_id: str
    concept_name: str
    easiness_factor: float = 2.5
    interval_days: int = 1
    repetitions: int = 0
    next_review_date: str
    question: str
    answer: str
    options: Optional[List[str]] = None
    correct_option: Optional[str] = None


class ReviewQueueResponse(BaseModel):
    items: List[ReviewItemSchema] = Field(default_factory=list)
    total: int = 0


class ReviewAnswerRequest(BaseModel):

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )
    item_id: str
    quality: int = Field(..., ge=0, le=5)
    response_time_seconds: Optional[int] = None


class ReviewAnswerResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )
    updated_interval: int
    updated_easiness: float
    next_review_date: str
    updated_mastery: float


class SimResultRequest(BaseModel):
    """A completed simulation run reported by the frontend sims engine.

    ``node_ids`` are the sims_v2 node ids the sim covers; ``score`` is the
    0-100 result the engine computed. ``correct`` is derived server-side
    (score >= 70) — clients may send it but it is recomputed.
    """

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )
    node_ids: List[str] = Field(..., min_length=1)
    score: float = Field(..., ge=0, le=100)
    sim_id: Optional[str] = None
    session_id: Optional[str] = None
    time_spent_seconds: Optional[int] = Field(default=None, ge=0)
    # Idempotency: client-generated attempt id lets retries be deduped.
    attempt_id: Optional[str] = None


class SimResultResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )
    updated: List[str] = Field(default_factory=list)
    mastery: dict = Field(default_factory=dict)
    correct: bool = False


class DashboardSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    user: UserInfo
    total_xp: int = 0
    level: int = 1
    level_xp: int = 0
    level_max: int = 100
    streak: int = 0
    recommended_lessons: List[RecommendedLessonSchema] = Field(default_factory=list)
    mastery_subjects: List[SubjectMasterySchema] = Field(default_factory=list)
    recent_activity: List[ActivitySchema] = Field(default_factory=list)


class WeeklyActivitySchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    day: str
    value: int = 0
