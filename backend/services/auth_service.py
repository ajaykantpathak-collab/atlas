"""
JWT Authentication Service for K-12 Learning Platform

Handles guest mode, phone-based auth with OTP, JWT tokens,
parent-student linking, and teacher-class management.

WhatsApp OTP integration is PLUGGABLE – see OTPSender interface.
"""

from __future__ import annotations

import secrets
import hashlib
import bcrypt
import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional, Protocol, Any

from jose import JWTError, jwt
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy import (
    Boolean, Column, DateTime, Enum, ForeignKey, Integer,
    String, JSON, select, update, delete, insert, func, and_, or_, text
)
from sqlalchemy.dialects.postgresql import UUID as _PG_UUID  # noqa: F401 – kept for external importers
from backend.db_types import GUID as UUID
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, relationship  # noqa: F401

from config import settings
# Auth models must register on the app's real metadata — a private
# declarative_base() leaves their tables out of Base.metadata.create_all,
# so otp_codes/refresh_tokens/parent_student_links were never created and
# 'users' was built from the thin models.user.User without OTP columns.
from backend.database import Base
from backend.models.user import User as UserModel

# ──────────────────────────────────────────────────────────────
# PROTOCOLS (Pluggable Interfaces)
# ──────────────────────────────────────────────────────────────

class OTPSender(Protocol):
    """Pluggable interface for OTP delivery.

    Implement this for WhatsApp / SMS / Email.
    Separate task – keep this interface clean.
    """

    async def send_otp(self, phone_number: str, otp_code: str) -> bool:
        """Send OTP to user. Returns True on success.

        Args:
            phone_number: E.164 format (e.g. +919876543210)
            otp_code: 6-digit OTP string

        Returns:
            True if dispatched successfully
        """
        ...


class MockWhatsAppSender:
    """Development stub – prints OTP to console.

    TODO: Replace with real WhatsApp Business API client.
    See: https://developers.facebook.com/docs/whatsapp
    """

    async def send_otp(self, phone_number: str, otp_code: str) -> bool:
        print(f"[MOCK WHATSAPP] To: {phone_number} | OTP: {otp_code}")
        return True


# ──────────────────────────────────────────────────────────────
# PYDANTIC SCHEMAS
# ──────────────────────────────────────────────────────────────

class GuestSessionRequest(BaseModel):
    """Empty body – device fingerprint from X-Device-ID header."""
    pass


class RegisterRequest(BaseModel):
    model_config = ConfigDict(strict=True)

    phone_number: str = Field(
        ...,
        min_length=10,
        max_length=15,
        description="E.164 format: +919876543210"
    )
    password: str = Field(
        ...,
        min_length=8,
        max_length=128,
        description="Min 8 chars with letter + digit"
    )
    full_name: str = Field(
        ...,
        min_length=2,
        max_length=200,
        description="Student / Parent / Teacher display name"
    )
    role: str = Field(
        ...,
        pattern="^(student|parent|teacher|admin)$",
        description="One of: student, parent, teacher, admin"
    )


class VerifyOTPRequest(BaseModel):
    model_config = ConfigDict(strict=True)

    phone_number: str = Field(..., min_length=10, max_length=15)
    otp_code: str = Field(..., min_length=6, max_length=6, pattern=r"^\d{6}$")


class LoginRequest(BaseModel):
    model_config = ConfigDict(strict=True)

    phone_number: str = Field(..., min_length=10, max_length=15)
    otp_code: str = Field(..., min_length=6, max_length=6, pattern=r"^\d{6}$")


class RefreshRequest(BaseModel):
    model_config = ConfigDict(strict=True)

    refresh_token: str = Field(..., min_length=20)


class TokenResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = Field(
        ...,
        description="Access token TTL in seconds"
    )


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    phone_number: str
    full_name: str
    role: str
    is_verified: bool
    grade: Optional[str] = None
    board: Optional[str] = None
    school_name: Optional[str] = None
    created_at: Optional[str] = None


class GuestResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    session_id: str
    uses_remaining: int
    max_uses: int
    upgrade_prompt: bool


class UpgradePromptResponse(BaseModel):
    """Returned when guest hits the usage limit (3rd/4th use)."""

    show_prompt: bool = True
    message: str = "Create a free account to save progress and access all features"
    uses_remaining: int = 0


class ErrorResponse(BaseModel):
    detail: str


# ──────────────────────────────────────────────────────────────
# SQLAlchemy MODELS (Internal – not exposed via API)
# ──────────────────────────────────────────────────────────────

# UserModel is an alias for the canonical models.user.User (imported above).
# The previous in-file class mapped 'users' onto a private declarative_base,
# which collided with the real table definition and was never created by
# create_all — replaced by the unified model in backend/models/user.py.


class GuestSessionModel(Base):
    __tablename__ = "guest_sessions"

    id = Column(UUID(), primary_key=True, default=uuid.uuid4)
    session_id = Column(String(64), unique=True, nullable=False, index=True)

    device_fingerprint = Column(String(255), nullable=True)
    ip_address = Column(String(45), nullable=True)

    use_count = Column(Integer, nullable=False, server_default=text("0"))
    max_uses = Column(Integer, nullable=False, server_default=text("3"))

    upgraded_to_user_id = Column(
        UUID(),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True
    )

    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now()
    )
    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now()
    )
    last_used_at = Column(DateTime(timezone=True), nullable=True)


class OTPModel(Base):
    __tablename__ = "otp_codes"

    id = Column(UUID(), primary_key=True, default=uuid.uuid4)
    phone_number = Column(String(15), nullable=False, index=True)
    session_id = Column(String(64), nullable=True, index=True)

    otp_code_hash = Column(String(255), nullable=False)
    purpose = Column(
        String(20),
        nullable=False,
        server_default=text("'login'")  # login | register | reset
    )

    is_used = Column(Boolean, nullable=False, server_default=text("false"))
    attempts = Column(Integer, nullable=False, server_default=text("0"))
    max_attempts = Column(Integer, nullable=False, server_default=text("5"))

    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now()
    )


class ParentStudentLinkModel(Base):
    __tablename__ = "parent_student_links"

    id = Column(UUID(), primary_key=True, default=uuid.uuid4)
    parent_id = Column(
        UUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    student_id = Column(
        UUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    relation = Column(String(20), nullable=False, server_default=text("'parent'"))

    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now()
    )

    parent = relationship("User", foreign_keys=[parent_id])
    student = relationship("User", foreign_keys=[student_id])


class TeacherClassModel(Base):
    __tablename__ = "teacher_classes"

    id = Column(UUID(), primary_key=True, default=uuid.uuid4)
    teacher_id = Column(
        UUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    class_name = Column(String(100), nullable=False)
    section = Column(String(20), nullable=False, server_default=text("'A'"))
    subject = Column(String(100), nullable=True)
    academic_year = Column(String(10), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now()
    )

    teacher = relationship("User")


class RefreshTokenModel(Base):
    __tablename__ = "refresh_tokens"

    id = Column(UUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        UUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    token_jti = Column(String(64), unique=True, nullable=False, index=True)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    is_revoked = Column(Boolean, nullable=False, server_default=text("false"))
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now()
    )


# ──────────────────────────────────────────────────────────────
# AUTH SERVICE
# ──────────────────────────────────────────────────────────────

class AuthService:
    """Core authentication service – async, no LLM, offline-safe.

    Usage:
        service = AuthService(session, otp_sender)
        guest = await service.create_guest_session(device_id)
        tokens  = await service.register_and_verify(req)
        profile = await service.get_current_user(access_token)

    All DB writes go through the caller's session (unit-of-work pattern).
    Caller is responsible for commit/rollback.
    """

    GUEST_MAX_USES: int = 3
    OTP_TTL_MINUTES: int = 10
    OTP_LENGTH: int = 6
    MAX_OTP_ATTEMPTS: int = 5
    MAX_FAILED_LOGINS: int = 5
    LOCKOUT_MINUTES: int = 15

    ACCESS_TOKEN_TTL = timedelta(minutes=30)
    REFRESH_TOKEN_TTL = timedelta(days=30)

    def __init__(
        self,
        db: AsyncSession,
        otp_sender: Optional[OTPSender] = None,
    ) -> None:
        self.db = db
        self.otp_sender: OTPSender = otp_sender or MockWhatsAppSender()
        self._secret_key: str = settings.jwt_secret
        self._algorithm: str = settings.jwt_algorithm

    # ── Email/Password Auth ───────────────────────────────────

    async def get_user_by_email(self, email: str) -> Optional[UserModel]:
        """Fetch a user by email address."""
        if not email:
            return None
        result = await self.db.execute(
            select(UserModel).where(UserModel.email == email)
        )
        return result.scalar_one_or_none()

    async def get_user_by_id(self, user_id: str) -> Optional[UserModel]:
        """Fetch a user by ID."""
        try:
            uid = uuid.UUID(str(user_id)) if not isinstance(user_id, uuid.UUID) else user_id
        except (ValueError, AttributeError):
            return None
        result = await self.db.execute(
            select(UserModel).where(UserModel.id == uid)
        )
        return result.scalar_one_or_none()

    async def create_user(self, user_data: dict) -> UserModel:
        """Create a new user with hashed password.
        Maps API field names to DB column names.
        """
        password = user_data.pop("password", None)
        # Map API field names to actual DB column names
        field_map = {
            "full_name": "name",          # API uses full_name, DB uses name
            "class_level": "class_level",  # same in both
        }
        # Fields that are NOT in the users table
        skip_fields = {"roll_number", "children_ids", "subjects", "classes_taught"}

        mapped = {}
        for k, v in user_data.items():
            if k in skip_fields:
                continue
            mapped_key = field_map.get(k, k)
            if v is not None:
                # Convert class_level string to int for the DB column
                if mapped_key == "class_level" and isinstance(v, str):
                    try:
                        v = int(v)
                    except ValueError:
                        pass
                mapped[mapped_key] = v

        # Hash password and store in password_hash column
        if password:
            mapped["password_hash"] = self._hash_password(password)

        # Set required defaults that DB doesn't have defaults for
        mapped.setdefault("is_premium", False)
        mapped.setdefault("is_active", True)
        mapped.setdefault("total_xp", 0)
        mapped.setdefault("current_level", 1)
        mapped.setdefault("streak_days", 0)

        user = UserModel(**mapped)
        self.db.add(user)
        await self.db.flush()
        return user

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a plaintext password against the stored hash.
        The hashed_password argument should be user.password_hash from the DB.
        """
        if not hashed_password:
            return False
        try:
            return bcrypt.checkpw(
                plain_password.encode("utf-8"),
                hashed_password.encode("utf-8"),
            )
        except Exception:
            return False

    async def update_last_login(self, user_id: str) -> None:
        """Update the last_login_at timestamp for a user."""
        try:
            uid = uuid.UUID(str(user_id)) if not isinstance(user_id, uuid.UUID) else user_id
        except (ValueError, AttributeError):
            return
        await self.db.execute(
            update(UserModel)
            .where(UserModel.id == uid)
            .values(last_login_at=datetime.now(timezone.utc))
        )

    async def update_user(self, user_id: str, update_fields: dict) -> Optional[UserModel]:
        """Update user fields. Returns the updated user or None."""
        try:
            uid = uuid.UUID(str(user_id)) if not isinstance(user_id, uuid.UUID) else user_id
        except (ValueError, AttributeError):
            return None
        if not update_fields:
            return await self.get_user_by_id(user_id)
        await self.db.execute(
            update(UserModel)
            .where(UserModel.id == uid)
            .values(**update_fields)
        )
        await self.db.flush()
        return await self.get_user_by_id(user_id)

    @staticmethod
    def _hash_password(password: str) -> str:
        """Hash a password using bcrypt."""
        return bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt(),
        ).decode("utf-8")

    # ── Guest ────────────────────────────────────────────────

    async def create_guest_session(
        self,
        session_id: str,
        device_fingerprint: Optional[str] = None,
        ip_address: Optional[str] = None,
    ) -> GuestSessionModel:
        """Create a new guest session or return the existing one.

        Guest users get GUEST_MAX_USES (3) free interactions before
        being prompted to register via phone number.
        """
        result = await self.db.execute(
            select(GuestSessionModel).where(
                GuestSessionModel.session_id == session_id
            )
        )
        guest = result.scalar_one_or_none()

        if guest is None:
            guest = GuestSessionModel(
                session_id=session_id,
                device_fingerprint=device_fingerprint,
                ip_address=ip_address,
                use_count=0,
                max_uses=self.GUEST_MAX_USES,
            )
            self.db.add(guest)
        else:
            guest.updated_at = datetime.now(timezone.utc)
            guest.last_used_at = datetime.now(timezone.utc)

        await self.db.flush()
        return guest

    async def increment_guest_use(self, session_id: str) -> GuestSessionModel:
        """Call after every guest interaction to track usage."""
        result = await self.db.execute(
            select(GuestSessionModel).where(
                GuestSessionModel.session_id == session_id
            )
        )
        guest = result.scalar_one_or_none()

        if guest is None:
            raise ValueError(f"Guest session not found: {session_id}")

        guest.use_count += 1
        guest.last_used_at = datetime.now(timezone.utc)
        await self.db.flush()
        return guest

    def uses_remaining(self, guest: GuestSessionModel) -> int:
        """Return how many free uses the guest has left."""
        return max(0, guest.max_uses - guest.use_count)

    def should_prompt_upgrade(self, guest: GuestSessionModel) -> bool:
        """True when the guest has exhausted free uses (>= 3 uses)."""
        return guest.use_count >= guest.max_uses

    # ── Registration ─────────────────────────────────────────

    async def request_registration(
        self,
        phone_number: str,
        password: str,
        full_name: str,
        role: str,
    ) -> tuple[OTPModel, str]:
        """Step 1 of registration: validate, create user, generate OTP.

        Returns:
            (otp_record, raw_otp_code)
            raw_otp_code is returned so the caller (or test suite)
            can read it. In production, ONLY the OTP sender sees it.
        """
        phone_number = self._normalize_phone(phone_number)

        # Enforce one account per phone number
        existing = await self._get_user_by_phone(phone_number)
        if existing is not None and not existing.is_guest:
            raise ValueError(
                "An account with this phone number already exists"
            )

        # Revoke any prior unused OTPs for this phone
        await self.db.execute(
            update(OTPModel)
            .where(
                and_(
                    OTPModel.phone_number == phone_number,
                    OTPModel.is_used == False,  # noqa: E712
                    OTPModel.expires_at > datetime.now(timezone.utc),
                )
            )
            .values(is_used=True)
        )

        # Generate OTP
        raw_otp = self._generate_otp()
        otp_hash = self._hash_otp(raw_otp)
        expires_at = datetime.now(timezone.utc) + timedelta(
            minutes=self.OTP_TTL_MINUTES
        )

        otp_record = OTPModel(
            phone_number=phone_number,
            otp_code_hash=otp_hash,
            purpose="register",
            expires_at=expires_at,
            max_attempts=self.MAX_OTP_ATTEMPTS,
        )
        self.db.add(otp_record)
        await self.db.flush()

        # Dispatch OTP
        sent = await self.otp_sender.send_otp(phone_number, raw_otp)
        if not sent:
            raise RuntimeError("Failed to send OTP. Please try again.")

        return otp_record, raw_otp

    async def request_auth_otp(self, phone_number: str) -> str:
        """Unified OTP request for the /auth/send-otp endpoint.

        Picks the purpose from account state: 'login' when the phone already
        belongs to a verified, non-guest user, else 'register'. Returns the
        purpose so the caller can respond appropriately; never returns the
        raw OTP (only the configured sender sees it).
        """
        phone_number = self._normalize_phone(phone_number)
        user = await self._get_user_by_phone(phone_number)
        purpose = (
            "login"
            if user is not None and user.is_verified and not user.is_guest
            else "register"
        )

        # Revoke any prior unused OTPs for this phone
        await self.db.execute(
            update(OTPModel)
            .where(
                and_(
                    OTPModel.phone_number == phone_number,
                    OTPModel.is_used == False,  # noqa: E712
                    OTPModel.expires_at > datetime.now(timezone.utc),
                )
            )
            .values(is_used=True)
        )

        raw_otp = self._generate_otp()
        self.db.add(
            OTPModel(
                phone_number=phone_number,
                otp_code_hash=self._hash_otp(raw_otp),
                purpose=purpose,
                expires_at=datetime.now(timezone.utc)
                + timedelta(minutes=self.OTP_TTL_MINUTES),
                max_attempts=self.MAX_OTP_ATTEMPTS,
            )
        )
        await self.db.flush()

        sent = await self.otp_sender.send_otp(phone_number, raw_otp)
        if not sent:
            raise RuntimeError("Failed to send OTP. Please try again.")
        return purpose

    async def verify_auth_otp(
        self, phone_number: str, otp_code: str
    ) -> tuple[UserModel, str, str]:
        """Unified verify for /auth/verify-otp: dispatches to
        verify_registration_otp or login_with_otp by account state,
        matching the purpose request_auth_otp issued."""
        phone_number = self._normalize_phone(phone_number)
        user = await self._get_user_by_phone(phone_number)
        if user is not None and user.is_verified and not user.is_guest:
            return await self.login_with_otp(phone_number, otp_code)
        return await self.verify_registration_otp(phone_number, otp_code)

    async def verify_registration_otp(
        self,
        phone_number: str,
        otp_code: str,
    ) -> tuple[UserModel, str, str]:
        """Step 2: verify OTP, create (or recover) user, issue tokens.

        Returns:
            (user, access_token, refresh_token)
        """
        phone_number = self._normalize_phone(phone_number)
        user = await self._get_user_by_phone(phone_number)

        if user is not None and user.is_verified and not user.is_guest:
            raise ValueError(
                "Phone number already verified. Please log in."
            )

        otp = await self._get_valid_otp(phone_number, otp_code, "register")
        if otp is None:
            raise ValueError(
                "Invalid or expired OTP. Request a new one."
            )

        otp.is_used = True
        now = datetime.now(timezone.utc)

        if user is None:
            # New user — OTP registration: no password/email/name yet,
            # onboarding collects the profile.  password_hash holds a
            # placeholder hash (never matches a real password).
            user = UserModel(
                phone_number=phone_number,
                password_hash=self._hash_password(otp_code),
                role="student",
                is_verified=True,
                created_at=now,
            )
            self.db.add(user)
            await self.db.flush()
        else:
            user.is_verified = True
            user.is_guest = False

        await self.db.flush()

        access_token = self._create_access_token(str(user.id), user.role)
        refresh_token = self._create_refresh_token(str(user.id))

        return user, access_token, refresh_token

    # ── Login (OTP-based, no password) ───────────────────────

    async def login_with_otp(
        self,
        phone_number: str,
        otp_code: str,
    ) -> tuple[UserModel, str, str]:
        """Login via phone + OTP.

        If the user is rate-limited, raises ValueError.
        If the user doesn't exist, prompts registration.
        """
        phone_number = self._normalize_phone(phone_number)
        user = await self._get_user_by_phone(phone_number)

        if user is None:
            raise ValueError(
                "No account found with this phone number. Please register first."
            )

        if not user.is_active:
            raise ValueError("Account is deactivated. Contact support.")

        self._check_rate_limit(user)

        otp = await self._get_valid_otp(phone_number, otp_code, "login")
        if otp is None:
            await self._record_failed_login(user)
            remaining = self.MAX_OTP_ATTEMPTS - (user.failed_login_attempts or 0)
            raise ValueError(
                f"Invalid or expired OTP. {remaining} attempts left."
            )

        otp.is_used = True
        user.last_login_at = datetime.now(timezone.utc)
        user.failed_login_attempts = 0
        user.locked_until = None

        await self.db.flush()

        access_token = self._create_access_token(str(user.id), user.role)
        refresh_token = self._create_refresh_token(str(user.id))

        return user, access_token, refresh_token

    # ── Refresh ──────────────────────────────────────────────

    async def refresh_access_token(
        self, refresh_token: str
    ) -> tuple[str, str]:
        """Validate refresh token, issue new access + refresh pair.

        Uses rotation: the old refresh token is revoked on use.
        """
        try:
            payload = jwt.decode(
                refresh_token,
                self._secret_key,
                algorithms=[self._algorithm],
            )
        except JWTError:
            raise ValueError("Invalid refresh token")

        if payload.get("type") != "refresh":
            raise ValueError("Not a refresh token")

        user_id = payload.get("sub")
        jti = payload.get("jti")
        if not user_id or not jti:
            raise ValueError("Malformed refresh token")

        token_row = (
            await self.db.execute(
                select(RefreshTokenModel).where(RefreshTokenModel.token_jti == jti)
            )
        ).scalar_one_or_none()
        if (
            token_row is None
            or str(token_row.user_id) != user_id
            or token_row.is_revoked
            or token_row.expires_at < datetime.now(timezone.utc)
        ):
            raise ValueError("Refresh token expired or revoked")

        # Rotate
        token_row.is_revoked = True

        result = await self.db.execute(
            select(UserModel).where(UserModel.id == user_id)
        )
        user = result.scalar_one_or_none()
        if user is None or not user.is_active:
            raise ValueError("User not found or inactive")

        new_access = self._create_access_token(str(user.id), user.role)
        new_refresh = self._create_refresh_token(str(user.id))

        return new_access, new_refresh

    # ── Profile ──────────────────────────────────────────────

    async def get_user_profile(
        self, user_id: str
    ) -> UserModel:
        """Return the UserModel for the given ID."""
        user = await self.db.get(UserModel, user_id)
        if user is None:
            raise ValueError("User not found")
        return user

    async def link_parent_to_student(
        self, parent_id: str, student_id: str, relation: str = "parent"
    ) -> ParentStudentLinkModel:
        """Link a parent user to a student user.

        Prevents duplicate links and self-linking.
        """
        if parent_id == student_id:
            raise ValueError("Parent and student must be different users")

        # Validate both users exist and have correct roles
        parent = await self.db.get(UserModel, parent_id)
        student = await self.db.get(UserModel, student_id)
        if parent is None:
            raise ValueError("Parent not found")
        if student is None:
            raise ValueError("Student not found")
        if parent.role != "parent":
            raise ValueError("User is not a parent")
        if student.role != "student":
            raise ValueError("User is not a student")

        # Prevent duplicate
        existing = await self.db.execute(
            select(ParentStudentLinkModel).where(
                and_(
                    ParentStudentLinkModel.parent_id == parent_id,
                    ParentStudentLinkModel.student_id == student_id,
                )
            )
        )
        if existing.scalar_one_or_none() is not None:
            raise ValueError("Link already exists")

        link = ParentStudentLinkModel(
            parent_id=parent_id,
            student_id=student_id,
            relation=relation,
        )
        self.db.add(link)
        await self.db.flush()
        return link

    async def get_students_for_parent(self, parent_id: str) -> list[UserModel]:
        """Return all students linked to a parent."""
        result = await self.db.execute(
            select(UserModel)
            .join(
                ParentStudentLinkModel,
                ParentStudentLinkModel.student_id == UserModel.id,
            )
            .where(ParentStudentLinkModel.parent_id == parent_id)
        )
        return list(result.scalars().all())

    async def link_teacher_to_class(
        self,
        teacher_id: str,
        class_name: str,
        section: str = "A",
        subject: Optional[str] = None,
        academic_year: Optional[str] = None,
    ) -> TeacherClassModel:
        """Link a teacher to a class section."""
        teacher = await self.db.get(UserModel, teacher_id)
        if teacher is None:
            raise ValueError("Teacher not found")
        if teacher.role != "teacher":
            raise ValueError("User is not a teacher")

        link = TeacherClassModel(
            teacher_id=teacher_id,
            class_name=class_name,
            section=section,
            subject=subject,
            academic_year=academic_year,
        )
        self.db.add(link)
        await self.db.flush()
        return link

    async def get_classes_for_teacher(self, teacher_id: str) -> list[TeacherClassModel]:
        """Return all class assignments for a teacher."""
        result = await self.db.execute(
            select(TeacherClassModel).where(
                TeacherClassModel.teacher_id == teacher_id
            )
        )
        return list(result.scalars().all())

    async def get_children_for_parent(
        self, parent_id: str
    ) -> list[dict[str, Any]]:
        """Return linked students with basic info for the parent dashboard.

        Returns list of {student_id, full_name, grade, board, school_name}.
        """
        result = await self.db.execute(
            select(
                UserModel.id,
                UserModel.name,
                UserModel.class_level,
                UserModel.board,
                UserModel.school_name,
                ParentStudentLinkModel.relation,
            )
            .join(
                ParentStudentLinkModel,
                ParentStudentLinkModel.student_id == UserModel.id,
            )
            .where(ParentStudentLinkModel.parent_id == parent_id)
        )
        rows = result.all()
        return [
            {
                "student_id": str(r.id),
                # API contract keeps `full_name`/`grade`; the users table stores
                # them as `name`/`class_level` (see _create_user field_map).
                # Selecting UserModel.full_name / UserModel.grade raised
                # AttributeError — neither attribute exists on the model.
                "full_name": r.name,
                "grade": str(r.class_level) if r.class_level is not None else None,
                "board": r.board,
                "school_name": r.school_name,
                "relation": r.relation,
            }
            for r in rows
        ]

    async def upgrade_guest_to_user(
        self,
        guest_session_id: str,
        user_id: str,
    ) -> GuestSessionModel:
        """Mark guest session as upgraded to a registered user.

        Call after successful OTP verification from a guest flow.
        """
        result = await self.db.execute(
            select(GuestSessionModel).where(
                GuestSessionModel.session_id == guest_session_id
            )
        )
        guest = result.scalar_one_or_none()
        if guest is None:
            raise ValueError("Guest session not found")

        guest.upgraded_to_user_id = user_id
        guest.updated_at = datetime.now(timezone.utc)
        await self.db.flush()
        return guest

    # ── Internal helpers ─────────────────────────────────────

    async def _get_user_by_phone(
        self, phone_number: str
    ) -> Optional[UserModel]:
        result = await self.db.execute(
            select(UserModel).where(
                UserModel.phone_number == phone_number
            )
        )
        return result.scalar_one_or_none()

    async def _get_valid_otp(
        self,
        phone_number: str,
        otp_code: str,
        purpose: str,
    ) -> Optional[OTPModel]:
        """Fetch the latest valid OTP for this phone + purpose."""
        now = datetime.now(timezone.utc)
        result = await self.db.execute(
            select(OTPModel)
            .where(
                and_(
                    OTPModel.phone_number == phone_number,
                    OTPModel.purpose == purpose,
                    OTPModel.is_used == False,  # noqa: E712
                    OTPModel.expires_at > now,
                    OTPModel.attempts < OTPModel.max_attempts,
                )
            )
            .order_by(OTPModel.created_at.desc())
        )
        otp = result.scalar_one_or_none()
        if otp is None:
            return None

        if not self._verify_otp_hash(otp_code, otp.otp_code_hash):
            otp.attempts += 1
            await self.db.flush()
            return None

        return otp

    def _check_rate_limit(self, user: UserModel) -> None:
        """Raise if user is locked out from too many failed attempts."""
        if user.locked_until and user.locked_until > datetime.now(timezone.utc):
            remaining = int(
                (user.locked_until - datetime.now(timezone.utc)).total_seconds()
            )
            raise ValueError(
                f"Account locked. Try again in {remaining // 60} minutes."
            )

    async def _record_failed_login(self, user: UserModel) -> None:
        user.failed_login_attempts = (user.failed_login_attempts or 0) + 1

        if user.failed_login_attempts >= self.MAX_FAILED_LOGINS:
            user.locked_until = datetime.now(timezone.utc) + timedelta(
                minutes=self.LOCKOUT_MINUTES
            )

        await self.db.flush()

    # ── Token helpers ────────────────────────────────────────

    def _create_access_token(
        self, user_id: str, role: str
    ) -> str:
        now = datetime.now(timezone.utc)
        payload: dict[str, Any] = {
            "sub": user_id,
            "role": role,
            "type": "access",
            "iat": int(now.timestamp()),
            "exp": int((now + self.ACCESS_TOKEN_TTL).timestamp()),
            "jti": secrets.token_urlsafe(16),
        }
        return jwt.encode(payload, self._secret_key, algorithm=self._algorithm)

    def _create_refresh_token(self, user_id: str) -> str:
        now = datetime.now(timezone.utc)
        jti = secrets.token_urlsafe(24)
        payload: dict[str, Any] = {
            "sub": user_id,
            "type": "refresh",
            "iat": int(now.timestamp()),
            "exp": int((now + self.REFRESH_TOKEN_TTL).timestamp()),
            "jti": jti,
        }

        token_str = jwt.encode(payload, self._secret_key, algorithm=self._algorithm)

        # Persist refresh token for revocation support
        rt = RefreshTokenModel(
            token_jti=jti,
            user_id=user_id,
            expires_at=now + self.REFRESH_TOKEN_TTL,
        )
        self.db.add(rt)
        return token_str

    def verify_access_token(self, token: str) -> dict[str, Any]:
        """Decode and validate an access JWT. Returns payload dict.

        Raises ValueError on invalid / expired / wrong-type token.
        """
        try:
            payload = jwt.decode(
                token,
                self._secret_key,
                algorithms=[self._algorithm],
            )
        except jwt.ExpiredSignatureError:
            raise ValueError("Token expired")
        except JWTError:
            raise ValueError("Invalid token")

        if payload.get("type") != "access":
            raise ValueError("Not an access token")

        return payload

    # ── Password / OTP crypto ────────────────────────────────

    @staticmethod
    def _hash_password(password: str) -> str:
        return bcrypt.hashpw(
            password.encode(), bcrypt.gensalt(rounds=12)
        ).decode()

    @staticmethod
    def _verify_password(plain: str, hashed: str) -> bool:
        return bcrypt.checkpw(plain.encode(), hashed.encode())

    @staticmethod
    def _hash_otp(otp: str) -> str:
        return hashlib.sha256(otp.encode()).hexdigest()

    @staticmethod
    def _verify_otp_hash(plain: str, hashed: str) -> bool:
        return hashlib.sha256(plain.encode()).hexdigest() == hashed

    # ── Utility ──────────────────────────────────────────────

    @staticmethod
    def _generate_otp(length: int = OTP_LENGTH) -> str:
        """Cryptographically secure 6-digit OTP."""
        return f"{secrets.randbelow(10 ** length):0{length}d}"

    @staticmethod
    def _normalize_phone(phone: str) -> str:
        """Strip whitespace and ensure + prefix for E.164."""
        phone = phone.strip().replace(" ", "")
        if not phone.startswith("+"):
            phone = "+" + phone
        return phone

    @staticmethod
    def get_token_expiry() -> int:
        """Return access token TTL in seconds (for response field)."""
        return int(AuthService.ACCESS_TOKEN_TTL.total_seconds())

    # ── Email/password facade used by routers/auth.py ────────
    # Defined as staticmethods so the router can call
    # AuthService.method(db, ...) without constructing the service.
    #
    # NOTE: these intentionally use the canonical backend.models.user.User
    # model (the one the real `users` table is created from) — NOT the
    # OTP-flavoured UserModel above, whose extra columns (last_login_at,
    # failed_login_attempts, …) do not exist in the actual schema.

    @staticmethod
    async def register(db: AsyncSession, payload: Any) -> tuple[Any, str]:
        """Create a new user from a SignupRequest and return (user, access_token).

        Raises ValueError when the email is already registered.
        """
        from backend.models.user import User as RealUser
        from backend.security import hash_password

        result = await db.execute(
            select(RealUser).where(RealUser.email == payload.email)
        )
        if result.scalar_one_or_none() is not None:
            raise ValueError("An account with this email already exists")

        user = RealUser(
            email=payload.email,
            name=payload.name,
            password_hash=hash_password(payload.password),
            role=payload.role or "student",
            board=payload.board,
            class_level=payload.class_level,
        )
        db.add(user)
        await db.flush()

        # Provision the dashboard-side student row (students.id mirrors
        # users.id): signup used to create ONLY the users row, so
        # GET /api/dashboard/student/{uid} 404ed on first run.
        if (payload.role or "student") == "student":
            try:
                from database import Student
                db.add(Student(
                    id=user.id,
                    name=payload.name,
                    student_class=(str(payload.class_level)
                                   if payload.class_level else None),
                ))
                await db.flush()
            except Exception:
                pass  # dashboard store unavailable — signup still succeeds

        token = AuthService(db)._create_access_token(str(user.id), user.role)
        return user, token

    @staticmethod
    async def authenticate(
        db: AsyncSession, email: str, password: str
    ) -> tuple[Any, str]:
        """Verify an email + password pair, returning (user, access_token).

        Raises ValueError on invalid credentials or a disabled account.
        """
        from backend.models.user import User as RealUser
        from backend.security import verify_password

        result = await db.execute(select(RealUser).where(RealUser.email == email))
        user = result.scalar_one_or_none()
        if user is None:
            raise ValueError("Invalid email or password")
        if not verify_password(password, user.password_hash or ""):
            raise ValueError("Invalid email or password")
        if not user.is_active:
            raise ValueError("Account is disabled")

        await db.flush()

        token = AuthService(db)._create_access_token(str(user.id), user.role)
        return user, token

    @staticmethod
    async def update_profile(
        db: AsyncSession, user_id: str, data: dict
    ) -> Any:
        """Update allowed profile fields. Raises ValueError if user missing."""
        from backend.models.user import User as RealUser

        try:
            uid = uuid.UUID(str(user_id))
        except (ValueError, AttributeError):
            raise ValueError("User not found")
        result = await db.execute(select(RealUser).where(RealUser.id == uid))
        user = result.scalar_one_or_none()
        if user is None:
            raise ValueError("User not found")

        allowed = {"name", "avatar_url", "board", "class_level", "preferences"}
        for key, value in (data or {}).items():
            if key in allowed:
                setattr(user, key, value)
        await db.flush()
        return user


# ──────────────────────────────────────────────────────────────
# FASTAPI DEPENDENCY
# ──────────────────────────────────────────────────────────────

async def get_auth_service(
    db: AsyncSession,
) -> AuthService:
    """FastAPI dependency – yields an AuthService per request.

    Example router usage:

        router = APIRouter(prefix="/api/auth", tags=["auth"])

        @router.post("/guest")
        async def guest(
            req: GuestSessionRequest,
            auth: AuthService = Depends(get_auth_service),
        ):
            guest = await auth.create_guest_session(session_id=...)
            return GuestResponse(...)

    The otp_sender is injected from config / DI container.
    """
    from api.dependencies import get_otp_sender  # noqa: E402 – lazy import
    otp_sender = get_otp_sender()
    return AuthService(db=db, otp_sender=otp_sender)
