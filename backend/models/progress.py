"""Progress tracking models for the DREAM_APP educational platform."""

import uuid

from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    DateTime,
    Date,
    JSON,
    ForeignKey,
)
from backend.db_types import GUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.database import Base


class MasteryRecord(Base):
    """Bayesian Knowledge Tracing state for a user on a given node.

    Stores the four BKT parameters (p_known, p_transit, p_slip, p_guess)
    along with the computed mastery probability and attempt count.
    """

    __tablename__ = "mastery_records"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    node_id = Column(String, nullable=False, index=True)
    mastery_probability = Column(Float, nullable=False, default=0.0)
    p_known = Column(Float, nullable=False, default=0.0)
    p_transit = Column(Float, nullable=False, default=0.1)
    p_slip = Column(Float, nullable=False, default=0.1)
    p_guess = Column(Float, nullable=False, default=0.2)
    attempts = Column(Integer, nullable=False, default=0)
    last_attempt_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user = relationship("User", backref="mastery_records")

    def __repr__(self) -> str:
        return f"<MasteryRecord(id={self.id}, user_id={self.user_id}, node_id={self.node_id})>"


class ReviewItem(Base):
    """A spaced-repetition (SM-2) review item for a user.

    Tracks the easiness factor, interval, repetitions, and review history
    so the scheduler can determine the next review date.
    """

    __tablename__ = "review_items"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    node_id = Column(String, nullable=False, index=True)
    concept_name = Column(String, nullable=False)
    easiness_factor = Column(Float, nullable=False, default=2.5)
    interval_days = Column(Integer, nullable=False, default=1)
    repetitions = Column(Integer, nullable=False, default=0)
    last_review_date = Column(Date, nullable=True)
    next_review_date = Column(Date, nullable=True, index=True)
    review_history = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user = relationship("User", backref="review_items")

    def __repr__(self) -> str:
        return f"<ReviewItem(id={self.id}, user_id={self.user_id}, concept_name={self.concept_name})>"


class ActivityLog(Base):
    """A log entry describing a user activity (study, quiz, exam, etc.)."""

    __tablename__ = "activity_logs"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    activity_type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    subject = Column(String, nullable=True)
    score = Column(String, nullable=True)
    extra_data = Column("metadata", JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("User", backref="activity_logs")

    def __repr__(self) -> str:
        return f"<ActivityLog(id={self.id}, user_id={self.user_id}, activity_type={self.activity_type})>"


class StudySession(Base):
    """A single study session for a user."""

    __tablename__ = "study_sessions"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    started_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    ended_at = Column(DateTime(timezone=True), nullable=True)
    duration_seconds = Column(Integer, nullable=True)
    nodes_studied = Column(Integer, nullable=False, default=0)
    questions_answered = Column(Integer, nullable=False, default=0)
    xp_earned = Column(Integer, nullable=False, default=0)

    user = relationship("User", backref="study_sessions")

    def __repr__(self) -> str:
        return f"<StudySession(id={self.id}, user_id={self.user_id}, xp_earned={self.xp_earned})>"
