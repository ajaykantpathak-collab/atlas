"""
Database configuration, async engine, session management,
and all SQLAlchemy ORM models for the K-12 learning platform.

Path: D:\platform\backend\database.py
"""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any, Optional

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    JSON,
    String,
    Text,
    Uuid,
    UniqueConstraint,
    func,
    text,
)
from sqlalchemy.ext.mutable import MutableList
from backend.db_types import GUID, JSONVariant, StringList
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import (
    AsyncAttrs,
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    relationship,
)

# ---------------------------------------------------------------------------
# Alembic-style version table import (used for migrate_version_table)
# but we do NOT define the alembic_version model here – migrations are
# written separately.  This just needs to be import-safe.
# ---------------------------------------------------------------------------

try:
    from alembic.config import Config  # noqa: F401  – optional at runtime
except ImportError:
    Config = None  # type: ignore[misc,assignment]


# ===================================================================
# 1. BASE + ENGINE + SESSION FACTORY
# ===================================================================

class Base(AsyncAttrs, DeclarativeBase):
    """
    Declarative base for all ORM models.

    All models inherit from this; SQLAlchemy will map the __tablename__
    attribute to create tables.
    """
    pass


# -- Connection URL --------------------------------------------------
# DATABASE_URL should be supplied via the DATABASE_URL env var.
# Example:
#   postgresql+asyncpg://postgres:password@localhost:5432/learning_platform
#
# For offline / dev without Postgres, SQLite async is also possible:
#   sqlite+aiosqlite:///./learning_platform.db
# --------------------------------------------------------------------
import os


def _resolve_database_url() -> str:
    """Resolve the database URL the same way backend.config does.

    Checks every env var name the platform uses (DATABASE_URL,
    POSTGRES_URL, PLATFORM_DATABASE_URL) before falling back to the
    settings object and finally the local default.  Previously this
    module only read DATABASE_URL, so an app launched with only
    PLATFORM_DATABASE_URL (the supported configuration) silently pointed
    the request-path engine at a dead postgres server.
    """
    for _name in ("DATABASE_URL", "POSTGRES_URL", "PLATFORM_DATABASE_URL"):
        _val = os.environ.get(_name, "")
        if _val:
            return _val
    try:
        from backend.config import get_settings
        _url = get_settings().database_url
        if _url:
            return _url
    except Exception:
        pass
    return "postgresql+asyncpg://postgres:postgres@localhost:5432/learning_platform"


DATABASE_URL: str = _resolve_database_url()

# -- Async engine with connection pooling ----------------------------
engine: AsyncEngine = create_async_engine(
    DATABASE_URL,
    echo=os.environ.get("SQL_ECHO", "false").lower() == "true",
    pool_size=int(os.environ.get("DB_POOL_SIZE", "10")),
    max_overflow=int(os.environ.get("DB_MAX_OVERFLOW", "20")),
    pool_timeout=int(os.environ.get("DB_POOL_TIMEOUT", "30")),
    pool_recycle=int(os.environ.get("DB_POOL_RECYCLE", "1800")),
    pool_pre_ping=True,
)

# -- sqlite runtime compatibility ------------------------------------
# Some models / raw-SQL loads reference postgres-only server functions.
# Register sqlite UDFs so inserts don't fail with "unknown function"
# when the platform runs in local sqlite mode.  No-op on postgres.
if DATABASE_URL.startswith("sqlite"):
    from sqlalchemy import event as _sa_event

    @_sa_event.listens_for(engine.sync_engine, "connect")
    def _register_sqlite_udfs(dbapi_conn, _record):
        import uuid as _uuid
        dbapi_conn.create_function("gen_random_uuid", 0, lambda: str(_uuid.uuid4()))

# -- Async session factory -------------------------------------------
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)

# Alias for services that use the older name
async_session_maker = AsyncSessionLocal


# -- Sync engine (lazy, for background writes only) -------------------
# The request path uses the async engine above. A few background
# writers (intelligence event persistence) need a sync Session from
# plain-def threadpool endpoints. Small pool, lazily created, NEVER
# used on the request hot path.
_sync_engine=None

def get_sync_engine():
    """Lazily create a sync engine (asyncpg→psycopg2, aiosqlite→sqlite).

    Best-effort: raises if no sync driver is installed; callers must
    treat failure as degraded mode (in-memory only).
    """
    global _sync_engine
    if _sync_engine is None:
        from sqlalchemy import create_engine as _create_sync_engine
        # Try config settings first (loads .env via pydantic-settings),
        # then env var, then the module-level default
        try:
            from backend.config import get_settings
            _settings = get_settings()
            url = _settings.database_url
        except Exception:
            url = os.environ.get("DATABASE_URL", str(DATABASE_URL))
        if "+asyncpg" in url:
            url = url.replace("postgresql+asyncpg", "postgresql+psycopg2")
        elif "+aiosqlite" in url:
            url = url.replace("sqlite+aiosqlite", "sqlite")
        _sync_engine = _create_sync_engine(
            url, pool_pre_ping=True, pool_size=5, max_overflow=5,
        )
    return _sync_engine


async def dispose_sync_engine():
    """Dispose the sync engine pool at shutdown (best-effort)."""
    global _sync_engine
    if _sync_engine is not None:
        _sync_engine.dispose()
        _sync_engine = None


# ===================================================================
# 2. HELPER MIXIN – timestamps common to every model
# ===================================================================

class TimestampMixin:
    """
    Adds created_at and updated_at columns to any model.
    updated_at is automatically refreshed on INSERT via DB default
    and via application code on UPDATE.
    """

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )


# ===================================================================
# 3. ORM MODELS
# ===================================================================

# ------------------------------------------------------------------ #
#  STUDENT                                                          #
# ------------------------------------------------------------------ #
class Student(Base, TimestampMixin):
    __tablename__ = "students"

    # -- Identity columns --------------------------------------------
    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(200), nullable=False)

    # -- Class / section (e.g. 10, "10-A") ---------------------------
    # Stored as string to support ICSE section naming
    student_class: Mapped[Optional[str]] = mapped_column(
        String(20), nullable=True, index=True,
    )

    # -- Active subjects – Array for quick filtering -----------------
    subjects: Mapped[list[str] | None] = mapped_column(
        StringList(), nullable=True,
    )

    # -- UI language preference ("en", "hi", "hinglish") ---------
    language_pref: Mapped[str] = mapped_column(
        String(10), nullable=False, server_default="en",
    )

    # -- Soft-delete flag --------------------------------------------
    is_active: Mapped[bool] = mapped_column(
        Boolean, nullable=False, server_default="true",
    )

    # -- Relationships -----------------------------------------------
    parents: Mapped[list["Parent"]] = relationship(
        "Parent",
        secondary="student_parents",
        back_populates="students",
        lazy="selectin",
    )
    attempts: Mapped[list["Attempt"]] = relationship(
        "Attempt", back_populates="student", lazy="selectin",
    )
    mastery_records: Mapped[list["Mastery"]] = relationship(
        "Mastery", back_populates="student", lazy="selectin",
    )
    practice_sessions: Mapped[list["PracticeSession"]] = relationship(
        "PracticeSession", back_populates="student", lazy="selectin",
    )
    tutor_sessions: Mapped[list["TutorSession"]] = relationship(
        "TutorSession", back_populates="student", lazy="selectin",
    )
    diagnostic_results: Mapped[list["DiagnosticResult"]] = relationship(
        "DiagnosticResult", back_populates="student", lazy="selectin",
    )
    solver_executions: Mapped[list["SolverExecution"]] = relationship(
        "SolverExecution", back_populates="student", lazy="selectin",
    )

    def __repr__(self) -> str:  # pragma: no cover
        return (
            f"<Student id={self.id} name={self.name!r} "
            f"class={self.student_class!r}>"
        )


# ------------------------------------------------------------------ #
#  PARENT                                                           #
# ------------------------------------------------------------------ #
class Parent(Base, TimestampMixin):
    __tablename__ = "parents"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    whatsapp_number: Mapped[Optional[str]] = mapped_column(
        String(20), nullable=True
    )

    # -- Many-to-many through table ----------------------------------
    students: Mapped[list[Student]] = relationship(
        "Student",
        secondary="student_parents",
        back_populates="parents",
        lazy="selectin",
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Parent id={self.id} name={self.name!r}>"


# Association table: Student <-> Parent (many-to-many)
from sqlalchemy import Table, Column

student_parents = Table(
    "student_parents",
    Base.metadata,
    Column(
        "student_id",
        GUID(),
        ForeignKey("students.id", ondelete="CASCADE"),
        primary_key=True,
    ),
    Column(
        "parent_id",
        GUID(),
        ForeignKey("parents.id", ondelete="CASCADE"),
        primary_key=True,
    ),
)


# ------------------------------------------------------------------ #
#  TEACHER                                                          #
# ------------------------------------------------------------------ #
class Teacher(Base, TimestampMixin):
    __tablename__ = "teachers"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    school: Mapped[Optional[str]] = mapped_column(String(300), nullable=True)

    # -- Subjects taught ---------------------------------------------
    subjects: Mapped[list[str] | None] = mapped_column(
        StringList(), nullable=True,
    )

    # -- Classes taught (e.g. ["9", "10", "11"]) ------------------
    class_ids: Mapped[list[str] | None] = mapped_column(
        StringList(), nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean, nullable=False, server_default="true",
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Teacher id={self.id} name={self.name!r}>"


# ------------------------------------------------------------------ #
#  TOPIC / NODE – CISCE curriculum graph node                       #
# ------------------------------------------------------------------ #
class Topic(Base, TimestampMixin):
    __tablename__ = "topics"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )

    # -- Curriculum identification -----------------------------------
    subject: Mapped[str] = mapped_column(
        String(50), nullable=False, index=True,
    )
    student_class: Mapped[str] = mapped_column(
        String(20), nullable=False, index=True,
    )
    chapter: Mapped[Optional[str]] = mapped_column(
        String(200), nullable=True
    )

    # -- CISCE graph node id (stable across years) -------------------
    node_id_from_cisce: Mapped[Optional[str]] = mapped_column(
        String(100), nullable=True, unique=True,
    )

    # -- Human-readable title ----------------------------------------
    title: Mapped[Optional[str]] = mapped_column(String(300), nullable=True)

    # -- Prerequisite topic IDs (JSON array of UUID strings) ---------
    # Using JSON instead of a self-referential M2M so the schema stays
    # flat and fast to query without recursive CTEs during solving.
    prerequisites: Mapped[list[str] | None] = mapped_column(
        JSONVariant(), nullable=True,
    )

    # -- Optional difficulty weight (set by content team) -------------
    difficulty_weight: Mapped[float | None] = mapped_column(
        Float, nullable=True, server_default="1.0",
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean, nullable=False, server_default="true",
    )

    # -- Relationships -----------------------------------------------
    mastery_records: Mapped[list["Mastery"]] = relationship(
        "Mastery", back_populates="topic", lazy="selectin",
    )
    attempts: Mapped[list["Attempt"]] = relationship(
        "Attempt", back_populates="topic", lazy="selectin",
    )
    practice_sessions: Mapped[list["PracticeSession"]] = relationship(
        "PracticeSession",
        secondary="practice_session_topics",
        back_populates="topics",
        lazy="selectin",
    )
    tutor_sessions: Mapped[list["TutorSession"]] = relationship(
        "TutorSession", back_populates="topic", lazy="selectin",
    )

    __table_args__ = (
        UniqueConstraint(
            "subject",
            "student_class",
            "node_id_from_cisce",
            name="uq_topic_subject_class_cisce_node",
        ),
    )

    def __repr__(self) -> str:  # pragma: no cover
        return (
            f"<Topic id={self.id} subject={self.subject!r} "
            f"class={self.student_class!r} title={self.title!r}>"
        )


# Association table: PracticeSession <-> Topic (many-to-many)
from sqlalchemy import Table as _Table

practice_session_topics = Table(
    "practice_session_topics",
    Base.metadata,
    Column(
        "practice_session_id",
        GUID(),
        ForeignKey("practice_sessions.id", ondelete="CASCADE"),
        primary_key=True,
    ),
    Column(
        "topic_id",
        GUID(),
        ForeignKey("topics.id", ondelete="CASCADE"),
        primary_key=True,
    ),
)


# ------------------------------------------------------------------ #
#  ATTEMPT – single question attempt record                         #
# ------------------------------------------------------------------ #
class Attempt(Base, TimestampMixin):
    __tablename__ = "attempts"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )
    student_id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("students.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    topic_id: Mapped[uuid.UUID | None] = mapped_column(
        GUID(),
        ForeignKey("topics.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    session_id: Mapped[uuid.UUID | None] = mapped_column(
        GUID(),
        ForeignKey("practice_sessions.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )

    # -- Deterministic question seed so the same question can be
    # reconstructed from the seed for review/replay ---------------
    question_seed: Mapped[str | None] = mapped_column(
        String(64), nullable=True,
    )
    # -- Hash of the question seed for anti-repeat lookup ---------
    seed_hash: Mapped[str | None] = mapped_column(
        String(64), nullable=True, index=True,
    )
    # -- Subject for anti-repeat filtering -------------------------
    subject: Mapped[str | None] = mapped_column(
        String(64), nullable=True, index=True,
    )

    # -- Student answer (JSON to support multi-part answers) ---------
    answer: Mapped[dict[str, Any] | None] = mapped_column(
        JSONVariant(), nullable=True,
    )

    # -- Outcome -----------------------------------------------------
    correct: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    time_ms: Mapped[int | None] = mapped_column(
        BigInteger, nullable=True,
    )
    marks_awarded: Mapped[int | None] = mapped_column(
        Integer, nullable=True, server_default="0",
    )

    # -- Relationships -----------------------------------------------
    student: Mapped[Student] = relationship("Student", back_populates="attempts")
    topic: Mapped[Topic] = relationship("Topic", back_populates="attempts")

    def __repr__(self) -> str:  # pragma: no cover
        return (
            f"<Attempt id={self.id} student_id={self.student_id} "
            f"session_id={self.session_id} correct={self.correct}>"
        )


# ------------------------------------------------------------------ #
#  MASTERY – per-student per-topic mastery state                     #
#  Tracks BKT, IRT, and AFM parameters used by knowledge tracing    #
# ------------------------------------------------------------------ #
class Mastery(Base, TimestampMixin):
    __tablename__ = "mastery"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )
    student_id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("students.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    topic_id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("topics.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # -- Bayesian Knowledge Tracing: P(L_n) – probability student knows
    # the topic before the current attempt -------------------------
    bkt_p_know: Mapped[float | None] = mapped_column(
        Float, nullable=True, server_default="0.5",
    )

    # -- Item Response Theory: ability estimate theta -----------------
    irt_theta: Mapped[float | None] = mapped_column(
        Float, nullable=True, server_default="0.0",
    )

    # -- AFM (Accurate Factors Model): per-skill learning rate ---------
    afm_rate: Mapped[float | None] = mapped_column(
        Float, nullable=True, server_default="0.0",
    )

    # -- Spaced-repetition scheduling ---------------------------------
    last_review: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True,
    )
    next_review: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True, index=True,
    )

    # -- Relationships -----------------------------------------------
    student: Mapped[Student] = relationship(
        "Student", back_populates="mastery_records"
    )
    topic: Mapped[Topic] = relationship(
        "Topic", back_populates="mastery_records"
    )

    __table_args__ = (
        UniqueConstraint(
            "student_id", "topic_id", name="uq_mastery_student_topic"
        ),
    )

    def __repr__(self) -> str:  # pragma: no cover
        return (
            f"<Mastery student={self.student_id} topic={self.topic_id} "
            f"bkt={self.bkt_p_know} irt_theta={self.irt_theta}>"
        )


# ------------------------------------------------------------------ #
#  PRACTICE SESSION – a contiguous practice block                    #
# ------------------------------------------------------------------ #
class PracticeSession(Base, TimestampMixin):
    __tablename__ = "practice_sessions"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )
    student_id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("students.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # -- Topics covered (M2M via practice_session_topics) ------------
    # questions_answered kept here as a denormalised counter for speed
    questions_answered: Mapped[int | None] = mapped_column(
        Integer, nullable=True, server_default="0",
    )

    # -- Timing -------------------------------------------------------
    started_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True,
    )
    ended_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True,
    )

    # -- Optional session-level metadata -----------------------------
    session_meta: Mapped[dict[str, Any] | None] = mapped_column(
        JSONVariant(), nullable=True,
    )

    # -- Relationships -----------------------------------------------
    student: Mapped[Student] = relationship(
        "Student", back_populates="practice_sessions"
    )
    topics: Mapped[list[Topic]] = relationship(
        "Topic",
        secondary="practice_session_topics",
        back_populates="practice_sessions",
        lazy="selectin",
    )

    def __repr__(self) -> str:  # pragma: no cover
        return (
            f"<PracticeSession id={self.id} student={self.student_id} "
            f"questions={self.questions_answered}>"
        )


# ------------------------------------------------------------------ #
#  TUTOR SESSION – AI tutor conversation for a topic                #
# ------------------------------------------------------------------ #
class TutorSession(Base, TimestampMixin):
    __tablename__ = "tutor_sessions"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )
    student_id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("students.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    topic_id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("topics.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # -- Full chat history stored as JSONB (list of {role, content, ts})
    messages_json: Mapped[dict[str, Any] | None] = mapped_column(
        JSONVariant(), nullable=True,
    )

    # -- Tutor session status -----------------------------------------
    status: Mapped[str | None] = mapped_column(
        String(30), nullable=True, server_default="active",
    )

    started_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True,
    )
    ended_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True,
    )

    # -- Relationships -----------------------------------------------
    student: Mapped[Student] = relationship(
        "Student", back_populates="tutor_sessions"
    )
    topic: Mapped[Topic] = relationship(
        "Topic", back_populates="tutor_sessions"
    )

    def __repr__(self) -> str:  # pragma: no cover
        return (
            f"<TutorSession id={self.id} student={self.student_id} "
            f"topic={self.topic_id} status={self.status!r}>"
        )


# ------------------------------------------------------------------ #
#  DIAGNOSTIC RESULT – end-of-chapter diagnostic assessment          #
# ------------------------------------------------------------------ #
class DiagnosticResult(Base, TimestampMixin):
    __tablename__ = "diagnostic_results"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )
    student_id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("students.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # -- Subject this diagnostic covers ------------------------------
    subject: Mapped[str] = mapped_column(
        String(50), nullable=False, index=True,
    )

    # -- Full question + answer payload ------------------------------
    questions_json: Mapped[dict[str, Any] | None] = mapped_column(
        JSONVariant(), nullable=True,
    )

    # -- Detected knowledge gaps: [{topic_id, severity, evidence}] ---
    gaps_json: Mapped[dict[str, Any] | None] = mapped_column(
        JSONVariant(), nullable=True,
    )

    # -- Remediation plan: [{topic_id, resources, priority}] ----------
    remediation_json: Mapped[dict[str, Any] | None] = mapped_column(
        JSONVariant(), nullable=True,
    )

    # -- Overall score (0.0 – 1.0) -----------------------------------
    score: Mapped[float | None] = mapped_column(Float, nullable=True)

    # -- Relationships -----------------------------------------------
    student: Mapped[Student] = relationship(
        "Student", back_populates="diagnostic_results"
    )

    def __repr__(self) -> str:  # pragma: no cover
        return (
            f"<DiagnosticResult id={self.id} student={self.student_id} "
            f"subject={self.subject!r} score={self.score}>"
        )


# ------------------------------------------------------------------ #
#  SOLVER EXECUTION – audit log of every deterministic solver run    #
# ------------------------------------------------------------------ #
class SolverExecution(Base, TimestampMixin):
    __tablename__ = "solver_executions"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=uuid.uuid4,
    )
    student_id: Mapped[uuid.UUID | None] = mapped_column(
        GUID(),
        ForeignKey("students.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # -- Which solver handled this problem ---------------------------
    solver_name: Mapped[str] = mapped_column(
        String(100), nullable=False, index=True,
    )
    problem_type: Mapped[str | None] = mapped_column(
        String(100), nullable=True,
    )

    # -- Input / output blobs ----------------------------------------
    input_json: Mapped[dict[str, Any] | None] = mapped_column(
        JSONVariant(), nullable=True,
    )
    result_json: Mapped[dict[str, Any] | None] = mapped_column(
        JSONVariant(), nullable=True,
    )

    # -- Performance metric ------------------------------------------
    time_ms: Mapped[int | None] = mapped_column(
        BigInteger, nullable=True,
    )

    # -- Was this a cache hit? ---------------------------------------
    cache_hit: Mapped[bool | None] = mapped_column(
        Boolean, nullable=True, server_default="false",
    )

    # -- Relationships -----------------------------------------------
    student: Mapped[Student | None] = relationship("Student")

    def __repr__(self) -> str:  # pragma: no cover
        return (
            f"<SolverExecution id={self.id} solver={self.solver_name!r} "
            f"time_ms={self.time_ms}>"
        )


# ===================================================================
# 4. HELPER FUNCTIONS
# ===================================================================

async def get_db() -> AsyncSession:
    """
    FastAPI dependency that provides an async database session.

    Usage in a router:
        @router.get("/endpoint")
        async def handler(db: AsyncSession = Depends(get_db)):
            ...
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_db() -> None:
    """
    Create all tables defined in this module.

    Call this at application startup (e.g. inside a FastAPI lifespan
    event) so the schema exists before any query runs.

    Alembic is the recommended migration tool; this helper is useful
    for tests and local development where the DB is ephemeral.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def drop_all_tables() -> None:
    """
    DROP ALL TABLES.  Use only in tests or dev environments.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


def create_db_sync(database_url: str | None = None) -> None:
    """
    Synchronous helper for pytest fixtures / scripts that run before
    the async event loop is available.

    Pass ``database_url`` to target a non-default database.
    """
    from sqlalchemy import create_engine as _create_sync_engine
    from sqlalchemy.orm import close_all_sessions as _close_sessions

    url = database_url or str(DATABASE_URL)
    sync_engine = _create_sync_engine(url, pool_pre_ping=True)
    _close_sessions()
    Base.metadata.create_all(bind=sync_engine)
    sync_engine.dispose()


async def close_db() -> None:
    """Dispose of the engine pool. Call at application shutdown."""
    await engine.dispose()


# ===================================================================
# 5. RE-EXPORTS CONVENIENCE
# ===================================================================

__all__ = [
    # Engine / session
    "engine",
    "AsyncSessionLocal",
    "AsyncSession",
    "get_db",
    "init_db",
    "drop_all_tables",
    "create_db_sync",
    "close_db",
    # ORM base
    "Base",
    "TimestampMixin",
    # Models
    "Student",
    "Parent",
    "Teacher",
    "Topic",
    "Attempt",
    "Mastery",
    "PracticeSession",
    "TutorSession",
    "DiagnosticResult",
    "SolverExecution",
    # Association tables (used by Alembic autogenerate & services)
    "student_parents",
    "practice_session_topics",
]
