"""
Authentication API Router — CISCE K-12 Learning Platform
========================================================

Handles user registration, login, JWT token management, profile updates,
and session invalidation for students, parents, and teachers.

Endpoints:
  POST /api/auth/register              → Register a new user (student/parent/teacher)
  POST /api/auth/login                 → Login and receive JWT access + refresh tokens
  POST /api/auth/refresh               → Refresh an expired access token
  GET  /api/auth/me                    → Get current authenticated user profile
  POST /api/auth/logout                → Invalidate refresh token (logout)
  PUT  /api/auth/profile               → Update user profile fields
  GET  /api/auth/health                → Authentication service health check
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone, timedelta
from enum import Enum
from typing import Any, Optional

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    status,
)
from pydantic import BaseModel, Field, ConfigDict, field_validator

from database import get_db, Student, Parent, Teacher
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth", tags=["auth"])


# ---------------------------------------------------------------------------
# Optional imports – services may not be available in all deployments
# ---------------------------------------------------------------------------
try:
    from services.auth_service import AuthService
    HAS_AUTH_SERVICE = True
except ImportError:
    AuthService = None  # type: ignore[misc,assignment]
    HAS_AUTH_SERVICE = False
    logger.warning("auth_service not available - auth endpoints will return 503")

try:
    from services.jwt_service import JWTService
    HAS_JWT_SERVICE = True
except ImportError:
    JWTService = None  # type: ignore[misc,assignment]
    HAS_JWT_SERVICE = False
    logger.warning("jwt_service not available - auth endpoints will return 503")

try:
    from services.redis_service import get_redis
    HAS_REDIS = True
except ImportError:
    async def get_redis():  # type: ignore[misc]
        return None

    HAS_REDIS = False
    logger.warning("redis_service not available - token invalidation disabled")


# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------


class UserRole(str, Enum):
    """User role within the learning platform."""

    STUDENT = "student"
    PARENT = "parent"
    TEACHER = "teacher"


class CISCEBoard(str, Enum):
    """CISCE board or stream."""

    ICSE = "icse"
    ISC = "isc"


class StudentClass(str, Enum):
    """Class levels from 1 to 12 as per CISCE structure."""

    CLASS_1 = "1"
    CLASS_2 = "2"
    CLASS_3 = "3"
    CLASS_4 = "4"
    CLASS_5 = "5"
    CLASS_6 = "6"
    CLASS_7 = "7"
    CLASS_8 = "8"
    CLASS_9 = "9"
    CLASS_10 = "10"
    CLASS_11 = "11"
    CLASS_12 = "12"


# ---------------------------------------------------------------------------
# Pydantic v2 Schemas
# ---------------------------------------------------------------------------


class RegisterRequest(BaseModel):
    """Request body for POST /api/auth/register."""

    email: str = Field(..., description="User email address used as login identifier")
    password: str = Field(
        ..., min_length=8, max_length=128, description="Account password, minimum 8 characters"
    )
    full_name: str = Field(..., min_length=1, max_length=200, description="Full legal name")
    role: UserRole = Field(..., description="Account type: student, parent, or teacher")
    phone_number: Optional[str] = Field(None, max_length=20, description="Optional phone number")

    # Student-specific fields
    class_level: Optional[StudentClass] = Field(
        None, description="Class level, required for student accounts"
    )
    board: Optional[CISCEBoard] = Field(None, description="CISCE board: icse or isc")
    roll_number: Optional[str] = Field(
        None, max_length=50, description="School roll number for students"
    )

    # Parent-specific fields
    children_ids: Optional[list[str]] = Field(
        None, description="List of linked student IDs for parent accounts"
    )

    # Teacher-specific fields
    subjects: Optional[list[str]] = Field(
        None, description="Subjects taught for teacher accounts"
    )
    classes_taught: Optional[list[str]] = Field(
        None, description="Classes taught for teacher accounts"
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "email": "rahul@example.com",
                "password": "SecurePass123!",
                "full_name": "Rahul Sharma",
                "role": "student",
                "class_level": "10",
                "board": "icse",
                "roll_number": "ICSE2024-045",
            }
        }
    )

    @field_validator("email")
    @classmethod
    def email_to_lower(cls, v: str) -> str:
        return v.lower().strip()

    @field_validator("password")
    @classmethod
    def password_min_length(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        return v


class LoginRequest(BaseModel):
    """Request body for POST /api/auth/login."""

    email: str = Field(..., description="Registered email address")
    password: str = Field(..., description="Account password")
    remember_me: bool = Field(
        default=False, description="Extend token lifetime when true"
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "email": "rahul@example.com",
                "password": "SecurePass123!",
                "remember_me": False,
            }
        }
    )

    @field_validator("email")
    @classmethod
    def email_to_lower(cls, v: str) -> str:
        return v.lower().strip()


class TokenResponse(BaseModel):
    """JWT token pair returned on login or refresh."""

    access_token: str = Field(..., description="Short-lived JWT access token")
    refresh_token: str = Field(..., description="Long-lived JWT refresh token")
    token_type: str = Field(default="bearer", description="Token type")
    expires_in: int = Field(..., description="Access token expiry in seconds")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIs...",
                "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
                "token_type": "bearer",
                "expires_in": 900,
            }
        }
    )


class RefreshRequest(BaseModel):
    """Request body for POST /api/auth/refresh."""

    refresh_token: str = Field(..., description="Valid refresh token")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
            }
        }
    )


class RegisterResponse(BaseModel):
    """Response for user registration."""

    student_id: str = Field(..., description="Newly created user identifier")
    email: str = Field(..., description="Registered email address")
    role: str = Field(..., description="Account role")
    message: str = Field(
        default="Registration successful", description="Status message"
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "student_id": "usr_abc123def456",
                "email": "rahul@example.com",
                "role": "student",
                "message": "Registration successful",
            }
        }
    )


class UserInfoResponse(BaseModel):
    """Current user profile information."""

    student_id: str = Field(..., description="Unique user identifier")
    email: str = Field(..., description="Account email")
    full_name: str = Field(..., description="Display name")
    role: str = Field(..., description="Account role")
    phone_number: Optional[str] = Field(None, description="Phone number if set")

    # Student fields
    class_level: Optional[str] = Field(None, description="Class level for students")
    board: Optional[str] = Field(None, description="CISCE board for students")
    roll_number: Optional[str] = Field(None, description="Roll number for students")
    student_subjects: Optional[list[str]] = Field(None, description="Subjects enrolled")

    # Parent fields
    children_ids: Optional[list[str]] = Field(
        None, description="Linked student IDs for parent accounts"
    )

    # Teacher fields
    teacher_subjects: Optional[list[str]] = Field(None, description="Subjects taught")
    classes_taught: Optional[list[str]] = Field(None, description="Classes taught")

    created_at: datetime = Field(..., description="Account creation timestamp")
    last_login: Optional[datetime] = Field(None, description="Last login timestamp")
    is_active: bool = Field(..., description="Whether the account is active")

    model_config = ConfigDict(from_attributes=True)


class ProfileUpdateRequest(BaseModel):
    """Request body for PUT /api/auth/profile."""

    full_name: Optional[str] = Field(
        None, min_length=1, max_length=200, description="Updated full name"
    )
    phone_number: Optional[str] = Field(
        None, max_length=20, description="Updated phone number"
    )

    # Student fields
    class_level: Optional[StudentClass] = Field(
        None, description="Updated class level"
    )
    roll_number: Optional[str] = Field(
        None, max_length=50, description="Updated roll number"
    )
    subjects: Optional[list[str]] = Field(
        None, description="Updated subject list"
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "full_name": "Rahul Kumar Sharma",
                "phone_number": "+919876543210",
                "class_level": "11",
                "subjects": ["Mathematics", "Physics", "Chemistry"],
            }
        }
    )


class LogoutResponse(BaseModel):
    """Response for logout."""

    message: str = Field(
        default="Logged out successfully", description="Status message"
    )
    revoked_tokens: int = Field(
        default=0, description="Number of tokens revoked"
    )


class HealthResponse(BaseModel):
    """Health check response."""

    status: str = Field(..., description="Overall service health status")
    auth_service: str = Field(..., description="Auth service availability")
    jwt_service: str = Field(..., description="JWT service availability")
    redis: str = Field(..., description="Redis availability")
    timestamp: datetime = Field(..., description="Health check timestamp")


# ---------------------------------------------------------------------------
# Dependencies
# ---------------------------------------------------------------------------


async def get_current_student(
    request: Request,
) -> dict[str, Any]:
    """Extract and validate JWT from the request.

    Checks the Authorization header (Bearer token) or cookies.
    Raises HTTPException 401 if no valid token is found.
    """
    if JWTService is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service is not available",
        )

    token: Optional[str] = None

    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header[7:]

    if not token:
        token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = JWTService.decode_access_token(token)
        student_id = payload.get("sub")
        if student_id is None:
            raise ValueError("Token is missing subject claim")
        return payload
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user account",
    description="Create a new account for a student, parent, or teacher. "
                "Email must be unique. Password is hashed before storage.",
)
async def register(
    req: RegisterRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> RegisterResponse:
    """Register a new student, parent, or teacher account.

    - Validates that the email is not already in use
    - Hashes the password before storage
    - Creates role-specific profile data
    - Returns the new user ID on success
    """
    if not HAS_AUTH_SERVICE or AuthService is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service is not available",
        )

    try:
        auth_service = AuthService(db)
        existing = await auth_service.get_user_by_email(req.email)
        if existing is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this email already exists",
            )

        # Role-specific validation
        if req.role == UserRole.STUDENT and req.class_level is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="class_level is required for student accounts",
            )

        if req.role == UserRole.PARENT and (
            req.children_ids is None or len(req.children_ids) == 0
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="children_ids is required for parent accounts",
            )

        if req.role == UserRole.TEACHER and (
            req.subjects is None or len(req.subjects) == 0
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="subjects is required for teacher accounts",
            )

        user_data: dict[str, Any] = {
            "email": req.email,
            "password": req.password,
            "full_name": req.full_name,
            "role": req.role.value,
            "phone_number": req.phone_number,
            "class_level": req.class_level.value if req.class_level else None,
            "board": req.board.value if req.board else None,
            "roll_number": req.roll_number,
            "children_ids": req.children_ids,
            "subjects": req.subjects,
            "classes_taught": req.classes_taught,
        }

        result = await auth_service.create_user(user_data)
        student_id = str(result.id)
        logger.info(
            "New user registered: email=%s role=%s student_id=%s",
            req.email,
            req.role.value,
            student_id,
        )

        # If student role, also create a row in the students table
        # so practice/mastery/diagnostic services can find them
        if req.role.value == "student":
            try:
                from sqlalchemy import text as sa_text
                await db.execute(
                    sa_text(
                        "INSERT INTO students (id, name, student_class, is_active) "
                        "VALUES (:uid, :name, :cls, true) "
                        "ON CONFLICT (id) DO NOTHING"
                    ),
                    {"uid": result.id, "name": req.full_name, "cls": str(req.class_level.value) if req.class_level else None},
                )
                await db.commit()
                logger.info("Created students row for user %s", student_id)
            except Exception as student_err:
                logger.warning("Could not create students row: %s", student_err)
                await db.rollback()

        return RegisterResponse(
            student_id=student_id,
            email=req.email,
            role=req.role.value,
            message="Registration successful",
        )

    except HTTPException:
        raise
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc
    except Exception as exc:
        logger.exception("Registration failed for %s: %s", req.email, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed due to a server error",
        ) from exc


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Login to get JWT tokens",
    description="Authenticate with email and password. "
                "Returns access and refresh tokens.",
)
async def login(
    req: LoginRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> TokenResponse:
    """Authenticate user and return JWT access + refresh tokens.

    - Validates email and password
    - Issues short-lived access token (15 min, 24h if remember_me)
    - Issues long-lived refresh token (7 days)
    - Updates last_login timestamp
    """
    if not HAS_AUTH_SERVICE or AuthService is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service is not available",
        )

    if not HAS_JWT_SERVICE or JWTService is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="JWT service is not available",
        )

    try:
        auth_service = AuthService(db)
        user = await auth_service.get_user_by_email(req.email)

        if user is None:
            logger.warning(
                "Login attempt for non-existent email=%s from %s",
                req.email,
                request.client.host if request.client else "unknown",
            )
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        password_valid = auth_service.verify_password(
            req.password, getattr(user, "password_hash", "")
        )
        if not password_valid:
            logger.warning(
                "Failed login attempt for email=%s from %s",
                req.email,
                request.client.host if request.client else "unknown",
            )
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not getattr(user, "is_active", True):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is deactivated. Please contact support.",
            )

        student_id = str(user.id)
        role = getattr(user, "role", "student")

        access_expiry = (
            timedelta(hours=24) if req.remember_me else timedelta(minutes=15)
        )
        refresh_expiry = timedelta(days=7)

        access_payload: dict[str, Any] = {
            "sub": student_id,
            "email": req.email,
            "role": role,
            "type": "access",
        }
        refresh_payload: dict[str, Any] = {
            "sub": student_id,
            "email": req.email,
            "role": role,
            "type": "refresh",
        }

        access_token = JWTService.encode(access_payload, expires_delta=access_expiry)
        refresh_token = JWTService.encode(refresh_payload, expires_delta=refresh_expiry)

        # Store refresh token for revocation support
        if HAS_REDIS:
            try:
                redis_client = await get_redis()
                if redis_client is not None:
                    await redis_client.setex(
                        f"refresh_token:{student_id}",
                        int(refresh_expiry.total_seconds()),
                        refresh_token,
                    )
            except Exception:
                logger.warning("Could not store refresh token in Redis for user %s", student_id)

        # Update last login timestamp
        try:
            await auth_service.update_last_login(student_id)
        except Exception:
            logger.warning("Could not update last_login for user %s", student_id)

        logger.info(
            "User logged in: email=%s student_id=%s role=%s",
            req.email,
            student_id,
            role,
        )

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            expires_in=int(access_expiry.total_seconds()),
        )

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Login failed for %s: %s", req.email, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed due to a server error",
        ) from exc


@router.post(
    "/refresh",
    response_model=TokenResponse,
    summary="Refresh an access token",
    description="Use a valid refresh token to obtain a new access and refresh token pair.",
)
async def refresh(
    req: RefreshRequest,
    db: AsyncSession = Depends(get_db),
) -> TokenResponse:
    """Refresh the access token using a valid refresh token.

    - Validates the refresh token signature and expiry
    - Verifies the token against the stored token (rotation)
    - Issues a new access + refresh token pair
    """
    if not HAS_JWT_SERVICE or JWTService is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="JWT service is not available",
        )

    if not HAS_AUTH_SERVICE or AuthService is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service is not available",
        )

    try:
        payload = JWTService.decode_refresh_token(req.refresh_token)
        student_id = payload.get("sub")
        email = payload.get("email")
        role = payload.get("role", "student")

        if student_id is None or email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
            )

        # Verify refresh token matches stored token (rotation check)
        if HAS_REDIS:
            try:
                redis_client = await get_redis()
                if redis_client is not None:
                    stored = await redis_client.get(f"refresh_token:{student_id}")
                    if stored is None or stored.decode() != req.refresh_token:
                        raise HTTPException(
                            status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Refresh token has been revoked",
                        )
            except HTTPException:
                raise
            except Exception:
                logger.warning(
                    "Redis unavailable for refresh token verification, user %s",
                    student_id,
                )

        # Verify user still exists and is active
        auth_service = AuthService(db)
        user = await auth_service.get_user_by_email(email)
        if user is None or not getattr(user, "is_active", True):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User account is no longer valid",
            )

        access_expiry = timedelta(minutes=15)
        refresh_expiry = timedelta(days=7)

        new_access = JWTService.encode(
            {"sub": student_id, "email": email, "role": role, "type": "access"},
            expires_delta=access_expiry,
        )
        new_refresh = JWTService.encode(
            {"sub": student_id, "email": email, "role": role, "type": "refresh"},
            expires_delta=refresh_expiry,
        )

        # Store new refresh token
        if HAS_REDIS:
            try:
                redis_client = await get_redis()
                if redis_client is not None:
                    await redis_client.setex(
                        f"refresh_token:{student_id}",
                        int(refresh_expiry.total_seconds()),
                        new_refresh,
                    )
            except Exception:
                logger.warning("Could not store refreshed token for user %s", student_id)

        logger.info("Token refreshed for student_id=%s", student_id)

        return TokenResponse(
            access_token=new_access,
            refresh_token=new_refresh,
            token_type="bearer",
            expires_in=int(access_expiry.total_seconds()),
        )

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Token refresh failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token refresh failed",
        ) from exc


@router.get(
    "/me",
    response_model=UserInfoResponse,
    summary="Get current user profile",
    description="Return the authenticated user profile information.",
)
async def get_me(
    current_student: dict[str, Any] = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
) -> UserInfoResponse:
    """Return the profile of the currently authenticated user.

    Requires a valid Bearer token in the Authorization header.
    """
    if not HAS_AUTH_SERVICE or AuthService is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service is not available",
        )

    try:
        student_id = current_student.get("sub")
        if student_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
            )

        auth_service = AuthService(db)
        user = await auth_service.get_user_by_id(student_id)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        return UserInfoResponse(
            student_id=str(user.id),
            email=getattr(user, "email", ""),
            full_name=getattr(user, "name", ""),
            role=getattr(user, "role", "student"),
            phone_number=getattr(user, "phone_number", None),
            class_level=str(getattr(user, "class_level", "")) if getattr(user, "class_level", None) else None,
            board=getattr(user, "board", None),
            roll_number=None,
            student_subjects=None,
            children_ids=None,
            teacher_subjects=None,
            classes_taught=None,
            created_at=getattr(user, "created_at", datetime.now(timezone.utc)),
            last_login=getattr(user, "last_login_at", None),
            is_active=getattr(user, "is_active", True),
        )

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception(
            "Failed to get user info for %s: %s",
            current_student.get("sub"),
            exc,
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve user profile",
        ) from exc


@router.post(
    "/logout",
    response_model=LogoutResponse,
    summary="Logout and invalidate tokens",
    description="Revoke the current refresh token and optionally "
                "blacklist the access token.",
)
async def logout(
    request: Request,
    current_student: dict[str, Any] = Depends(get_current_student),
) -> LogoutResponse:
    """Logout the current user by invalidating their refresh token.

    - Revokes the stored refresh token
    - Optionally blacklists the access token when Redis is available
    """
    student_id = current_student.get("sub", "")
    revoked_count = 0

    # Revoke refresh token
    if HAS_REDIS:
        try:
            redis_client = await get_redis()
            if redis_client is not None:
                key = f"refresh_token:{student_id}"
                existed = await redis_client.exists(key)
                if existed:
                    await redis_client.delete(key)
                    revoked_count += 1
                logger.info("Refresh token revoked for student_id=%s", student_id)
        except Exception:
            logger.warning("Could not revoke refresh token for user %s", student_id)

    # Blacklist access token
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        raw_token = auth_header[7:]
        if HAS_REDIS and JWTService is not None:
            try:
                redis_client = await get_redis()
                if redis_client is not None:
                    ttl_seconds = JWTService.get_remaining_ttl(raw_token)
                    if ttl_seconds and ttl_seconds > 0:
                        token_key = f"blacklist:{raw_token[:64]}"
                        await redis_client.setex(token_key, ttl_seconds, "revoked")
                        logger.info(
                            "Access token blacklisted for student_id=%s", student_id
                        )
            except Exception:
                logger.warning("Could not blacklist access token for user %s", student_id)

    logger.info("User logged out: student_id=%s", student_id)
    return LogoutResponse(
        message="Logged out successfully",
        revoked_tokens=revoked_count,
    )


@router.put(
    "/profile",
    response_model=UserInfoResponse,
    summary="Update user profile",
    description="Update the authenticated user profile fields such as "
                "name, class, subjects, and phone number.",
)
async def update_profile(
    req: ProfileUpdateRequest,
    current_student: dict[str, Any] = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
) -> UserInfoResponse:
    """Update the authenticated user profile.

    Only the fields that are provided in the request body are updated.
    Omitted fields remain unchanged.
    """
    if not HAS_AUTH_SERVICE or AuthService is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service is not available",
        )

    try:
        student_id = current_student.get("sub")
        if student_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
            )

        auth_service = AuthService(db)
        update_fields: dict[str, Any] = {}

        if req.full_name is not None:
            update_fields["full_name"] = req.full_name
        if req.phone_number is not None:
            update_fields["phone_number"] = req.phone_number
        if req.class_level is not None:
            update_fields["class_level"] = req.class_level.value
        if req.roll_number is not None:
            update_fields["roll_number"] = req.roll_number
        if req.subjects is not None:
            update_fields["subjects"] = req.subjects

        if not update_fields:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No fields provided for update",
            )

        updated_user = await auth_service.update_user(student_id, update_fields)
        logger.info(
            "Profile updated for student_id=%s, fields=%s",
            student_id,
            list(update_fields.keys()),
        )

        if updated_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found after update",
            )

        return UserInfoResponse(
            student_id=str(updated_user.id),
            email=getattr(updated_user, "email", ""),
            full_name=getattr(updated_user, "name", ""),
            role=getattr(updated_user, "role", "student"),
            phone_number=getattr(updated_user, "phone_number", None),
            class_level=str(getattr(updated_user, "class_level", "")) if getattr(updated_user, "class_level", None) else None,
            board=getattr(updated_user, "board", None),
            roll_number=None,
            student_subjects=None,
            children_ids=None,
            teacher_subjects=None,
            classes_taught=None,
            created_at=getattr(updated_user, "created_at", datetime.now(timezone.utc)),
            last_login=getattr(updated_user, "last_login_at", None),
            is_active=getattr(updated_user, "is_active", True),
        )

    except HTTPException:
        raise
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc
    except Exception as exc:
        logger.exception("Profile update failed for %s: %s", student_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Profile update failed",
        ) from exc


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Authentication service health check",
    description="Check the health status of authentication-related services.",
    include_in_schema=True,
)
async def health_check() -> HealthResponse:
    """Health check endpoint for the authentication service.

    Returns the availability status of auth_service, jwt_service, and redis.
    """
    now = datetime.now(timezone.utc)
    auth_status = "available" if HAS_AUTH_SERVICE else "unavailable"
    jwt_status = "available" if HAS_JWT_SERVICE else "unavailable"

    redis_status = "unknown"
    if HAS_REDIS:
        try:
            redis_client = await get_redis()
            if redis_client is not None:
                await redis_client.ping()
                redis_status = "available"
            else:
                redis_status = "unavailable"
        except Exception:
            redis_status = "unavailable"

    overall = "healthy"
    if auth_status == "unavailable" or jwt_status == "unavailable":
        overall = "degraded"

    return HealthResponse(
        status=overall,
        auth_service=auth_status,
        jwt_service=jwt_status,
        redis=redis_status,
        timestamp=now,
    )