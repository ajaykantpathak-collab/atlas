"""Assessment models for the DREAM_APP educational platform."""

import uuid

from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Boolean,
    DateTime,
    JSON,
    Text,
    ForeignKey,
)
from backend.db_types import GUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.database import Base


class QuizQuestion(Base):
    """A single quiz question associated with a knowledge node."""

    __tablename__ = "quiz_questions"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    node_id = Column(String, nullable=False, index=True)
    question = Column(Text, nullable=False)
    question_type = Column(String, nullable=False)
    options = Column(JSON, nullable=True)
    correct_answer = Column(Text, nullable=False)
    explanation = Column(Text, nullable=True)
    marks = Column(Integer, nullable=False, default=1)
    marking_scheme = Column(Text, nullable=True)
    difficulty = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self) -> str:
        return f"<QuizQuestion(id={self.id}, node_id={self.node_id}, question_type={self.question_type})>"


class Exam(Base):
    """A full exam definition."""

    __tablename__ = "exams"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    exam_id = Column(String, unique=True, nullable=False, index=True)
    title = Column(String, nullable=False)
    board = Column(String, nullable=False)
    class_level = Column(Integer, nullable=False)
    subject = Column(String, nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    total_marks = Column(Integer, nullable=False)
    sections_count = Column(Integer, nullable=False, default=1)
    difficulty = Column(String, nullable=False)
    topics = Column(JSON, nullable=True)
    is_published = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    sections = relationship("ExamSection", back_populates="exam", cascade="all, delete-orphan")
    attempts = relationship("ExamAttempt", back_populates="exam", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Exam(id={self.id}, exam_id={self.exam_id}, title={self.title})>"


class ExamSection(Base):
    """A section within an exam."""

    __tablename__ = "exam_sections"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    exam_id = Column(
        GUID(),
        ForeignKey("exams.id", ondelete="CASCADE"),
        nullable=False,
    )
    section_id = Column(String, nullable=False)
    title = Column(String, nullable=False)
    marks = Column(Integer, nullable=False)
    question_count = Column(Integer, nullable=False)
    question_type = Column(String, nullable=False)
    instructions = Column(Text, nullable=True)
    questions = Column(JSON, nullable=True)

    exam = relationship("Exam", back_populates="sections")

    def __repr__(self) -> str:
        return f"<ExamSection(id={self.id}, section_id={self.section_id}, title={self.title})>"


class ExamAttempt(Base):
    """A user's attempt at an exam."""

    __tablename__ = "exam_attempts"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    exam_id = Column(
        GUID(),
        ForeignKey("exams.id", ondelete="CASCADE"),
        nullable=False,
    )
    user_id = Column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    started_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    time_taken_seconds = Column(Integer, nullable=True)
    total_score = Column(Float, nullable=True)
    max_score = Column(Float, nullable=True)
    percentage = Column(Float, nullable=True)
    section_scores = Column(JSON, nullable=True)
    topic_scores = Column(JSON, nullable=True)
    weakness_areas = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    exam = relationship("Exam", back_populates="attempts")
    user = relationship("User", backref="exam_attempts")
    submissions = relationship(
        "AnswerSubmission", back_populates="attempt", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<ExamAttempt(id={self.id}, exam_id={self.exam_id}, user_id={self.user_id})>"


class AnswerSubmission(Base):
    """A single answer submitted as part of an exam attempt."""

    __tablename__ = "answer_submissions"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    attempt_id = Column(
        GUID(),
        ForeignKey("exam_attempts.id", ondelete="CASCADE"),
        nullable=False,
    )
    question_id = Column(String, nullable=False)
    user_answer = Column(Text, nullable=True)
    is_correct = Column(Boolean, nullable=True)
    marks_awarded = Column(Float, nullable=True, default=0.0)
    ai_feedback = Column(Text, nullable=True)
    graded_at = Column(DateTime(timezone=True), nullable=True)

    attempt = relationship("ExamAttempt", back_populates="submissions")

    def __repr__(self) -> str:
        return f"<AnswerSubmission(id={self.id}, attempt_id={self.attempt_id}, question_id={self.question_id})>"
