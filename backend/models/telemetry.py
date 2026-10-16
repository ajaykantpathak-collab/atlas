"""telemetry.py — AttemptLog model: one row per student attempt.

Written by backend.its.telemetry.TelemetryWriter; mined nightly by
backend.its.agents.meta_brain (strategy effectiveness, misconception
discovery, content gaps). This is the feedback loop's data spine.
"""

from __future__ import annotations

from sqlalchemy import (Boolean, Column, DateTime, Index, Integer,
                        JSON, String, Text)

from backend.database import Base


class AttemptLog(Base):
    __tablename__ = "its_attempt_log"

    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String(64), nullable=False)
    node_id = Column(String(128), nullable=False)
    question_id = Column(String(128), nullable=True)
    is_correct = Column(Boolean, nullable=False, default=False)
    modality = Column(String(32), nullable=True)          # practice|sim|review|...
    step_index = Column(Integer, nullable=True)           # which solver step failed
    hint_level = Column(Integer, nullable=True)           # 1-4, None = no hint
    response_ms = Column(Integer, nullable=True)
    misconception_id = Column(String(128), nullable=True)
    session_id = Column(String(64), nullable=True)
    # CL-06: solver route chain (JSON list, capped at 32 entries by the
    # writer) + the winning stage (route[0]) — the telemetry helpers in
    # services/answer_telemetry.py compute these for the JSONL plane; the
    # persisted row was missing them.
    route = Column(JSON, nullable=True)
    stage = Column(String(64), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False)

    __table_args__ = (
        Index("ix_attempt_log_student_node", "student_id", "node_id"),
        Index("ix_attempt_log_created", "created_at"),
        Index("ix_attempt_log_misconception", "misconception_id"),
    )

    def __repr__(self) -> str:  # pragma: no cover
        return (f"<AttemptLog student={self.student_id} node={self.node_id} "
                f"correct={self.is_correct}>")
