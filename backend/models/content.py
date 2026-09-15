"""Content models for the DREAM_APP educational platform."""

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


class Subject(Base):
    """A subject offered for a given board and class level."""

    __tablename__ = "subjects"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    board = Column(String, nullable=False)
    class_level = Column(Integer, nullable=False)
    icon_name = Column(String, nullable=True)
    color = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    chapters = relationship("Chapter", back_populates="subject", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Subject(id={self.id}, name={self.name}, board={self.board}, class_level={self.class_level})>"


class Chapter(Base):
    """A chapter within a subject."""

    __tablename__ = "chapters"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    subject_id = Column(GUID(), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    number = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    subject = relationship("Subject", back_populates="chapters")

    def __repr__(self) -> str:
        return f"<Chapter(id={self.id}, number={self.number}, title={self.title})>"


class KnowledgeNodeModel(Base):
    """A knowledge graph node representing a concept/skill.

    Stores metadata about a single concept including its prerequisites,
    forward links, and Bayesian Knowledge Tracing state.
    """

    __tablename__ = "knowledge_nodes"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    node_id = Column(String, unique=True, index=True, nullable=False)
    label = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    subject = Column(String, nullable=False)
    class_level = Column(Integer, nullable=False)
    chapter = Column(String, nullable=True)
    node_type = Column(String, nullable=False)
    simplified_content = Column(Text, nullable=True)
    prerequisites = Column(JSON, nullable=True)
    forward_nodes = Column(JSON, nullable=True)
    mastery_probability = Column(Float, default=0.0, nullable=False)
    difficulty = Column(String, default="medium", nullable=False)
    estimated_time = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    content_bundles = relationship(
        "ContentBundle", back_populates="knowledge_node", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<KnowledgeNodeModel(id={self.id}, node_id={self.node_id}, label={self.label})>"


class ContentBundle(Base):
    """A piece of content (video, document, interactive, audio) attached to a node."""

    __tablename__ = "content_bundles"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    node_id = Column(
        GUID(),
        ForeignKey("knowledge_nodes.id", ondelete="CASCADE"),
        nullable=False,
    )
    content_type = Column(String, nullable=False)
    content_data = Column(JSON, nullable=True)
    is_offline_available = Column(Boolean, default=False, nullable=False)
    file_size_mb = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    knowledge_node = relationship("KnowledgeNodeModel", back_populates="content_bundles")

    def __repr__(self) -> str:
        return f"<ContentBundle(id={self.id}, node_id={self.node_id}, content_type={self.content_type})>"
