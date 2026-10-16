"""User model for the DREAM_APP educational platform."""

import uuid

from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    DateTime,
    Date,
    JSON,
)
from backend.db_types import GUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.database import Base


class User(Base):
    """Represents a platform user (student, teacher, parent, or admin)."""

    __tablename__ = "users"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    # nullable: OTP-only users have no email/password/name until onboarding
    email = Column(String, unique=True, index=True, nullable=True)
    name = Column(String, nullable=True)
    password_hash = Column(String, nullable=True)
    role = Column(String, default="student", nullable=False)
    board = Column(String, nullable=True)
    class_level = Column(Integer, nullable=True)
    avatar_url = Column(String, nullable=True)
    phone_number = Column(String(15), nullable=True, index=True)
    school_name = Column(String(200), nullable=True)
    is_premium = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=True)
    is_guest = Column(Boolean, default=False, nullable=True)
    total_xp = Column(Integer, default=0, nullable=False)
    current_level = Column(Integer, default=1, nullable=False)
    streak_days = Column(Integer, default=0, nullable=False)
    last_activity_date = Column(Date, nullable=True)
    last_login_at = Column(DateTime(timezone=True), nullable=True)
    failed_login_attempts = Column(Integer, default=0, nullable=True)
    locked_until = Column(DateTime(timezone=True), nullable=True)
    preferences = Column(JSON, nullable=True)

    # ── DPDP parental consent (WS-LEGAL, migration 0003) ──────────────
    # All nullable → zero-lock metadata-only ALTER on postgres; legacy
    # rows simply read NULL ("consent not recorded on this form").
    parent_email = Column(String(255), nullable=True)
    # When the signup-time parental-consent checkbox was recorded.
    parent_consent_at = Column(DateTime(timezone=True), nullable=True)
    # How consent was captured, e.g. "signup_checkbox".
    consent_method = Column(String(40), nullable=True)
    # pending   — consent recorded, parent notice NOT yet delivered
    #             (always the case while SMTP is unconfigured)
    # notified  — consent-recorded notice dispatched to the parent
    consent_status = Column(String(24), nullable=True)

    # ── Account deletion lifecycle (WS-LEGAL, migration 0003) ─────────
    # Soft-delete audit trail: is_active=False locks the account at
    # request time; deletion_purge_at is when the worker's account_purge
    # job hard-deletes residual rows (30-day recovery window).
    deleted_at = Column(DateTime(timezone=True), nullable=True)
    deletion_purge_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # NOTE: no ORM relationships to parent_student_links/teacher_classes
    # here — those live in services/auth_service.py which init_db never
    # imports, so name-resolved relationships would fail mapper config.
    # The link/class models relate TO User one-directionally instead.

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"
