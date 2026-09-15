"""Gamification models for the DREAM_APP educational platform."""

import uuid

from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    DateTime,
    Date,
    ForeignKey,
)
from backend.db_types import GUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.database import Base


class Achievement(Base):
    """An achievement definition that users can unlock for XP rewards."""

    __tablename__ = "achievements"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    achievement_id = Column(String, unique=True, nullable=False, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    icon_name = Column(String, nullable=True)
    tier = Column(String, nullable=False, default="bronze")
    xp_reward = Column(Integer, nullable=False, default=0)
    max_progress = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user_achievements = relationship(
        "UserAchievement", back_populates="achievement", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Achievement(id={self.id}, achievement_id={self.achievement_id}, title={self.title})>"


class UserAchievement(Base):
    """A user's progress toward (or unlocking of) an achievement."""

    __tablename__ = "user_achievements"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    achievement_id = Column(
        GUID(),
        ForeignKey("achievements.id", ondelete="CASCADE"),
        nullable=False,
    )
    unlocked = Column(Boolean, nullable=False, default=False)
    progress = Column(Integer, nullable=False, default=0)
    unlocked_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user = relationship("User", backref="user_achievements")
    achievement = relationship("Achievement", back_populates="user_achievements")

    def __repr__(self) -> str:
        return (
            f"<UserAchievement(id={self.id}, user_id={self.user_id}, "
            f"achievement_id={self.achievement_id}, unlocked={self.unlocked})>"
        )


class StreakRecord(Base):
    """A daily streak record tracking whether the user completed activities on a given day."""

    __tablename__ = "streak_records"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    date = Column(Date, nullable=False)
    completed = Column(Boolean, nullable=False, default=False)
    activities_count = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("User", backref="streak_records")

    def __repr__(self) -> str:
        return f"<StreakRecord(id={self.id}, user_id={self.user_id}, date={self.date}, completed={self.completed})>"
