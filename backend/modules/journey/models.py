#!/usr/bin/env python3
"""modules/journey/models.py — per-student-per-topic journey state.

The journey is a STATE MACHINE over six states:
  PROBE -> TEACH -> PRACTICE -> REMEDIATE -> CHALLENGE -> MASTERED
Transitions are driven by mastery signals (BKT via mastery_sync), streak
counters, and misconception events — never by page navigation.
"""
from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import JSON, DateTime, Float, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from backend.database import Base


def _now():
    return datetime.now(timezone.utc)


class JourneyState(Base):
    __tablename__ = "journey_states"
    id: Mapped[int] = mapped_column(Integer, primary_key=True,
                                    autoincrement=True)
    student_id: Mapped[str] = mapped_column(String(64), index=True)
    node_id: Mapped[str] = mapped_column(String(96), index=True)
    subject: Mapped[str] = mapped_column(String(32), index=True)
    state: Mapped[str] = mapped_column(String(16), default="PROBE")
    # PROBE | TEACH | PRACTICE | REMEDIATE | CHALLENGE | MASTERED
    bkt_p: Mapped[float] = mapped_column(Float, default=0.3)
    streak_correct: Mapped[int] = mapped_column(Integer, default=0)
    streak_wrong: Mapped[int] = mapped_column(Integer, default=0)
    remediation_count: Mapped[int] = mapped_column(Integer, default=0)
    last_question_id: Mapped[str | None] = mapped_column(String(96),
                                                         nullable=True)
    history: Mapped[list | None] = mapped_column(JSON, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_now, onupdate=_now,
        server_default=func.now())

    __table_args__ = (
        __import__("sqlalchemy").UniqueConstraint(
            "student_id", "node_id", name="uq_journey_student_node"),
    )
