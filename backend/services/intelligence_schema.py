from datetime import datetime, timezone
from enum import Enum
import uuid

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum as SAEnum,
    Float,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    func,
    text,
)
from backend.db_types import GUID, JSONVariant, StringList
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

# Use the real Base from database.py so tables are created by init_db.py
# Fall back to a local Base if imported standalone (for testing)
try:
    from backend.database import Base as _RealBase
    Base = _RealBase
except ImportError:
    try:
        from database import Base as _RealBase
        Base = _RealBase
    except ImportError:
        class Base(DeclarativeBase):
            pass


# ---------------------------------------------------------------------------
# 1. EnrichmentNode
# ---------------------------------------------------------------------------
class EnrichmentNode(Base):
    __tablename__ = "enrichment_node"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    node_id: Mapped[str] = mapped_column(
        String(100), unique=True, index=True, nullable=False
    )
    subject: Mapped[str] = mapped_column(String(50), index=True, nullable=False)
    class_level: Mapped[int] = mapped_column(Integer, index=True, nullable=False)
    board: Mapped[str] = mapped_column(String(10), nullable=False)
    chapter: Mapped[str] = mapped_column(Text, nullable=False)
    topic: Mapped[str] = mapped_column(Text, nullable=False)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    definition: Mapped[str] = mapped_column(Text, nullable=False)
    text_walkthrough: Mapped[str] = mapped_column(Text, nullable=False)
    cognitive_level: Mapped[str] = mapped_column(
        String(50), nullable=False
    )  # remember|understand|apply|analyze|evaluate|create
    mastery_criteria: Mapped[str] = mapped_column(Text, nullable=False)
    scope_boundary: Mapped[str] = mapped_column(Text, nullable=False)
    common_misconceptions: Mapped[list | None] = mapped_column(
        JSONVariant(), nullable=True
    )  # [{"misconception":..,"explanation":..,"correction":..}]
    diagnostic_question: Mapped[dict | None] = mapped_column(
        JSONVariant(), nullable=True
    )  # {"question":..,"answer":..,"level":..}
    on_failure: Mapped[str | None] = mapped_column(Text, nullable=True)
    prerequisite_node_ids: Mapped[list | None] = mapped_column(
        StringList(), nullable=True
    )
    prerequisite_reasons: Mapped[dict | None] = mapped_column(JSONVariant(), nullable=True)
    forward_node_ids: Mapped[list | None] = mapped_column(StringList(), nullable=True)
    cross_subject_prereqs: Mapped[list | None] = mapped_column(
        StringList(), nullable=True
    )
    cross_subject_reasons: Mapped[dict | None] = mapped_column(JSONVariant(), nullable=True)
    concept_tags: Mapped[list] = mapped_column(StringList(), default=list)
    difficulty: Mapped[str] = mapped_column(String(20), nullable=False)
    estimated_time: Mapped[int] = mapped_column(Integer, nullable=False)
    source_marker: Mapped[str] = mapped_column(String(200), nullable=False)
    parsed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=datetime.now(timezone.utc),
    )

    __table_args__ = (
        Index(
            "ix_enrichment_node_subject_class_level",
            "subject",
            "class_level",
        ),
        Index(
            "ix_enrichment_node_node_id_subject",
            "node_id",
            "subject",
        ),
    )


# ---------------------------------------------------------------------------
# 2. InteractionOutcome
# ---------------------------------------------------------------------------
class InteractionOutcome(Base):
    __tablename__ = "interaction_outcome"

    id: Mapped[str] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )
    student_id: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False
    )
    session_id: Mapped[str] = mapped_column(
        GUID(), index=True, nullable=False
    )
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        index=True,
        nullable=False,
        server_default=func.now(),
    )
    subject: Mapped[str] = mapped_column(String(50), index=True, nullable=False)
    chapter: Mapped[str | None] = mapped_column(Text, nullable=True)
    concept: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False
    )  # node_id
    grade_level: Mapped[int] = mapped_column(Integer, nullable=False)
    interaction_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )  # question_attempt|hint_request|simulation|socratic_turn|navigation
    question_id: Mapped[str | None] = mapped_column(
        String(100), nullable=True
    )
    response: Mapped[dict | None] = mapped_column(JSONVariant(), nullable=True)
    is_correct: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    partial_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    time_to_respond_ms: Mapped[int | None] = mapped_column(
        Integer, nullable=True
    )
    hints_used: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    hint_sequence: Mapped[list] = mapped_column(
        StringList(), default=list, nullable=False
    )
    error_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    teaching_strategy: Mapped[str | None] = mapped_column(
        String(100), nullable=True
    )
    strategy_sequence: Mapped[list] = mapped_column(
        StringList(), default=list, nullable=False
    )
    misconceptions_detected: Mapped[list] = mapped_column(
        StringList(), default=list, nullable=False
    )
    knowledge_state_before: Mapped[dict | None] = mapped_column(
        JSONVariant(), nullable=True
    )
    knowledge_state_after: Mapped[dict | None] = mapped_column(
        JSONVariant(), nullable=True
    )
    language: Mapped[str] = mapped_column(
        String(10), default="en", nullable=False
    )
    device_type: Mapped[str | None] = mapped_column(String(20), nullable=True)
    engagement_score: Mapped[float | None] = mapped_column(
        Float, nullable=True
    )  # 0-1
    frustration_signals: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    mastery_achieved: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    confidence_rating: Mapped[int | None] = mapped_column(
        Integer, nullable=True
    )  # 1-5
    next_item_correct: Mapped[bool | None] = mapped_column(
        Boolean, nullable=True
    )
    orchestrator_rule_used: Mapped[str | None] = mapped_column(
        String(200), nullable=True
    )
    agent_used: Mapped[str | None] = mapped_column(String(100), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    __table_args__ = (
        Index(
            "ix_interaction_outcome_student_timestamp",
            "student_id",
            "timestamp",
        ),
        Index(
            "ix_interaction_outcome_subject_concept",
            "subject",
            "concept",
        ),
        Index(
            "ix_interaction_outcome_session_timestamp",
            "session_id",
            "timestamp",
        ),
        Index(
            "ix_interaction_outcome_concept_timestamp",
            "concept",
            "timestamp",
        ),
    )


# ---------------------------------------------------------------------------
# 3. Misconception
# ---------------------------------------------------------------------------
class Misconception(Base):
    __tablename__ = "misconception"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    misconception_key: Mapped[str] = mapped_column(
        String(200), unique=True, nullable=False
    )  # concept:error_pattern_hash
    subject: Mapped[str] = mapped_column(String(50), index=True, nullable=False)
    concept: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False
    )  # node_id
    grade_level: Mapped[int] = mapped_column(Integer, nullable=False)
    name_en: Mapped[str] = mapped_column(Text, nullable=False)
    description_en: Mapped[str] = mapped_column(Text, nullable=False)
    remediation_approach_en: Mapped[str] = mapped_column(Text, nullable=False)
    name_hi: Mapped[str | None] = mapped_column(Text, nullable=True)
    description_hi: Mapped[str | None] = mapped_column(Text, nullable=True)
    remediation_approach_hi: Mapped[str | None] = mapped_column(
        Text, nullable=True
    )
    occurrence_count: Mapped[int] = mapped_column(
        Integer, default=1, nullable=False
    )
    student_count: Mapped[int] = mapped_column(
        Integer, default=1, nullable=False
    )
    confidence_score: Mapped[float] = mapped_column(
        Float, nullable=False
    )  # 0-1
    recommended_strategy: Mapped[str | None] = mapped_column(
        String(100), nullable=True
    )
    first_discovered: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    last_seen: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    is_verified: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    source: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )  # enrichment|discovered|cisce_pupil_data

    __table_args__ = (
        Index("ix_misconception_subject_concept", "subject", "concept"),
    )


# ---------------------------------------------------------------------------
# 4. ConceptDependency
# ---------------------------------------------------------------------------
class ConceptDependency(Base):
    __tablename__ = "concept_dependency"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    source_concept: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False
    )  # prerequisite
    target_concept: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False
    )  # depends on source
    subject: Mapped[str] = mapped_column(String(50), nullable=False)
    grade_level: Mapped[int] = mapped_column(Integer, nullable=False)
    strength: Mapped[float] = mapped_column(Float, nullable=False)  # 0-1
    confidence: Mapped[float] = mapped_column(Float, nullable=False)  # 0-1
    support_count: Mapped[int] = mapped_column(
        Integer, default=0, nullable=False
    )
    dependency_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )  # prerequisite|cross_subject|learned
    reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    discovery_method: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )  # specified|mined|claude_discovered
    discovered_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    last_validated: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    is_verified: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )

    __table_args__ = (
        Index("ix_concept_dependency_target_subject", "target_concept", "subject"),
        Index(
            "ix_concept_dependency_source_target",
            "source_concept",
            "target_concept",
        ),
    )


# ---------------------------------------------------------------------------
# 5. TeachingStrategyOutcome
# ---------------------------------------------------------------------------
class TeachingStrategyOutcome(Base):
    __tablename__ = "teaching_strategy_outcome"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    strategy_name: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False
    )
    subject: Mapped[str] = mapped_column(String(50), index=True, nullable=False)
    concept: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False
    )  # node_id
    grade_level: Mapped[int] = mapped_column(Integer, nullable=False)
    student_count: Mapped[int] = mapped_column(Integer, nullable=False)
    total_interactions: Mapped[int] = mapped_column(Integer, nullable=False)
    observation_window_days: Mapped[int] = mapped_column(Integer, nullable=False)
    avg_knowledge_gain: Mapped[float] = mapped_column(Float, nullable=False)
    avg_time_to_mastery: Mapped[float | None] = mapped_column(
        Float, nullable=True
    )
    mastery_rate: Mapped[float] = mapped_column(
        Float, nullable=False
    )  # 0-1
    retention_rate: Mapped[float | None] = mapped_column(Float, nullable=True)
    engagement_score: Mapped[float] = mapped_column(
        Float, nullable=False
    )  # 0-1
    error_reduction_rate: Mapped[float | None] = mapped_column(
        Float, nullable=True
    )
    next_item_correctness_rate: Mapped[float | None] = mapped_column(
        Float, nullable=True
    )
    baseline_strategy: Mapped[str | None] = mapped_column(
        String(100), nullable=True
    )
    lift_vs_baseline: Mapped[float | None] = mapped_column(Float, nullable=True)
    confidence_interval: Mapped[float | None] = mapped_column(
        Float, nullable=True
    )
    is_significant: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    observation_start: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )
    observation_end: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )
    last_updated: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    __table_args__ = (
        Index(
            "ix_teaching_strategy_name_subject_concept",
            "strategy_name",
            "subject",
            "concept",
        ),
        Index(
            "ix_teaching_strategy_subject_grade",
            "subject",
            "grade_level",
        ),
    )


# ---------------------------------------------------------------------------
# 6. ContentGapFlag
# ---------------------------------------------------------------------------
class ContentGapFlag(Base):
    __tablename__ = "content_gap_flag"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    subject: Mapped[str] = mapped_column(String(50), index=True, nullable=False)
    concept: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False
    )  # node_id
    grade_level: Mapped[int] = mapped_column(Integer, nullable=False)
    avg_error_rate: Mapped[float] = mapped_column(Float, nullable=False)
    remediation_attempts: Mapped[int] = mapped_column(
        Integer, default=0, nullable=False
    )
    affected_student_count: Mapped[int] = mapped_column(Integer, nullable=False)
    evidence_snapshot: Mapped[dict | None] = mapped_column(
        JSONVariant(), nullable=True
    )
    severity: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )  # low|medium|high|critical
    gap_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )  # missing_content|insufficient_practice|prerequisite_gap|poor_explanation
    recommended_action: Mapped[str | None] = mapped_column(
        Text, nullable=True
    )
    flagged_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    resolved: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    resolved_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    __table_args__ = (
        Index(
            "ix_content_gap_flag_subject_concept",
            "subject",
            "concept",
        ),
        Index(
            "ix_content_gap_flag_resolved_severity",
            "resolved",
            "severity",
        ),
    )


# ---------------------------------------------------------------------------
# 7. LearningStyleProfile
# ---------------------------------------------------------------------------
class LearningStyleProfile(Base):
    __tablename__ = "learning_style_profile"

    student_id: Mapped[str] = mapped_column(
        String(100), primary_key=True, nullable=False
    )
    visual_preference: Mapped[float] = mapped_column(
        Float, default=0.5, nullable=False
    )
    auditory_preference: Mapped[float] = mapped_column(
        Float, default=0.5, nullable=False
    )
    kinesthetic_preference: Mapped[float] = mapped_column(
        Float, default=0.5, nullable=False
    )
    reading_preference: Mapped[float] = mapped_column(
        Float, default=0.5, nullable=False
    )
    working_memory_capacity: Mapped[float] = mapped_column(
        Float, default=0.5, nullable=False
    )
    processing_speed: Mapped[float] = mapped_column(
        Float, default=0.5, nullable=False
    )
    attention_span_minutes: Mapped[float] = mapped_column(
        Float, default=15.0, nullable=False
    )
    error_recovery_speed: Mapped[float] = mapped_column(
        Float, default=0.5, nullable=False
    )
    strategy_effectiveness: Mapped[dict] = mapped_column(
        JSONVariant(), default=dict, nullable=False
    )  # {strategy_name: effectiveness_score}
    best_performing_strategies: Mapped[list] = mapped_column(
        StringList(), default=list, nullable=False
    )
    worst_performing_strategies: Mapped[list] = mapped_column(
        StringList(), default=list, nullable=False
    )
    optimal_session_length_minutes: Mapped[float] = mapped_column(
        Float, default=20.0, nullable=False
    )
    preferred_difficulty: Mapped[float] = mapped_column(
        Float, default=0.5, nullable=False
    )
    preferred_pace: Mapped[str] = mapped_column(
        String(20), default="medium", nullable=False
    )
    optimal_hint_timing: Mapped[str] = mapped_column(
        String(30), default="after_first_error", nullable=False
    )
    avg_session_duration_minutes: Mapped[float] = mapped_column(
        Float, default=20.0, nullable=False
    )
    dropout_rate: Mapped[float] = mapped_column(
        Float, default=0.0, nullable=False
    )
    repeat_visit_rate: Mapped[float] = mapped_column(
        Float, default=0.0, nullable=False
    )
    total_interactions: Mapped[int] = mapped_column(
        Integer, default=0, nullable=False
    )
    profile_confidence: Mapped[float] = mapped_column(
        Float, default=0.0, nullable=False
    )  # 0-1
    last_updated: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )


# ---------------------------------------------------------------------------
# 8. SocraticSession
# ---------------------------------------------------------------------------
class SocraticSession(Base):
    __tablename__ = "socratic_session"

    session_id: Mapped[str] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )
    student_id: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False
    )
    started_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    ended_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    concept: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False
    )  # node_id
    subject: Mapped[str] = mapped_column(String(50), nullable=False)
    grade_level: Mapped[int] = mapped_column(Integer, nullable=False)
    language: Mapped[str] = mapped_column(
        String(10), default="en", nullable=False
    )
    turns: Mapped[list] = mapped_column(
        JSONVariant(), default=list, nullable=False
    )  # [{"role":..,"content":..,"timestamp":..,"metadata":..}]
    turn_count: Mapped[int] = mapped_column(
        Integer, default=0, nullable=False
    )
    mastery_achieved: Mapped[bool | None] = mapped_column(
        Boolean, nullable=True
    )
    misconceptions_identified: Mapped[list] = mapped_column(
        StringList(), default=list, nullable=False
    )
    hints_used: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    session_effectiveness: Mapped[float | None] = mapped_column(
        Float, nullable=True
    )
    orchestrator_rules_used: Mapped[list] = mapped_column(
        StringList(), default=list, nullable=False
    )
    agents_used: Mapped[list] = mapped_column(
        StringList(), default=list, nullable=False
    )

    __table_args__ = (
        Index(
            "ix_socratic_session_student_started",
            "student_id",
            "started_at",
        ),
        Index(
            "ix_socratic_session_concept_started",
            "concept",
            "started_at",
        ),
    )


# ---------------------------------------------------------------------------
# 9. OrchestratorRule
# ---------------------------------------------------------------------------
class OrchestratorRule(Base):
    __tablename__ = "orchestrator_rule"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    rule_name: Mapped[str] = mapped_column(
        String(200), unique=True, nullable=False
    )
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    condition: Mapped[dict] = mapped_column(
        JSONVariant(), nullable=False
    )  # {"field":..,"operator":..,"value":..}
    action: Mapped[dict] = mapped_column(
        JSONVariant(), nullable=False
    )  # {"agent":..,"parameters":..}
    priority: Mapped[int] = mapped_column(
        Integer, default=100, nullable=False
    )  # lower = higher priority
    is_active: Mapped[bool] = mapped_column(
        Boolean, default=True, nullable=False
    )
    source: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )  # initial|meta_brain|ab_test_winner
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    last_updated: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    effectiveness_score: Mapped[float] = mapped_column(
        Float, default=0.5, nullable=False
    )
    times_triggered: Mapped[int] = mapped_column(
        Integer, default=0, nullable=False
    )
    ab_test_variant: Mapped[str | None] = mapped_column(
        String(20), nullable=True
    )  # control|variant_a|variant_b

    __table_args__ = (
        Index("ix_orchestrator_rule_active_priority", "is_active", "priority"),
    )


# ---------------------------------------------------------------------------
# 10. ClaudeReasoningCache
# ---------------------------------------------------------------------------
class ClaudeReasoningCache(Base):
    __tablename__ = "claude_reasoning_cache"

    cache_key: Mapped[str] = mapped_column(
        String(200), primary_key=True, nullable=False
    )
    prompt_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    response: Mapped[dict] = mapped_column(JSONVariant(), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    hit_count: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    last_used: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    language: Mapped[str | None] = mapped_column(String(10), nullable=True)
    model: Mapped[str] = mapped_column(
        String(50), default="fable", nullable=False
    )


# ---------------------------------------------------------------------------
# 11. AgentParameter
# ---------------------------------------------------------------------------
class AgentParameter(Base):
    __tablename__ = "agent_parameter"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    agent_name: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False
    )
    parameter_name: Mapped[str] = mapped_column(String(100), nullable=False)
    parameter_value: Mapped[float] = mapped_column(Float, nullable=False)
    subject: Mapped[str | None] = mapped_column(
        String(50), nullable=True
    )  # null = all subjects
    concept: Mapped[str | None] = mapped_column(
        String(100), nullable=True
    )  # null = all concepts
    last_calibrated: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    calibration_count: Mapped[int] = mapped_column(
        Integer, default=0, nullable=False
    )
    effectiveness_score: Mapped[float] = mapped_column(
        Float, default=0.5, nullable=False
    )
    # NOTE: agent_name already declares index=True above; do not add a
    # duplicate explicit Index (same auto-generated name would fail DDL).