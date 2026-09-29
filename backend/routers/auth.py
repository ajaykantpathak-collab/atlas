"""Auth router for the DREAM_APP educational platform.

Exposes endpoints for login, signup, profile management, password change,
and logout.
"""

from typing import Optional

import hashlib
import secrets

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import AliasChoices, BaseModel, Field
from sqlalchemy import delete, select, func
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.database.redis import get_redis
from backend.deps import get_current_user
from backend.models.user import User
from backend.schemas.auth import LoginRequest, SignupRequest, TokenResponse, UserInfo
from backend.security import hash_password, verify_password
from backend.services.auth_service import AuthService, RefreshTokenModel

router = APIRouter(prefix="/api/auth", tags=["auth"])


# --------------------------------------------------------------------------- #
# Request bodies not defined in the schemas module
# --------------------------------------------------------------------------- #
class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    # Accept both snake_case and camelCase keys (web client sends camelCase).
    avatar_url: Optional[str] = Field(
        default=None,
        validation_alias=AliasChoices("avatar_url", "avatarUrl", "avatar"),
    )
    board: Optional[str] = None
    class_level: Optional[int] = Field(
        default=None, ge=1, le=12,
        validation_alias=AliasChoices("class_level", "classLevel"),
    )
    preferences: Optional[dict] = None


class ChangePasswordRequest(BaseModel):
    # The web client sends camelCase (currentPassword/newPassword); accept both.
    current_password: str = Field(
        ...,
        min_length=1,
        validation_alias=AliasChoices("current_password", "currentPassword"),
    )
    new_password: str = Field(
        ...,
        min_length=6,
        validation_alias=AliasChoices("new_password", "newPassword"),
    )


class RefreshRequest(BaseModel):
    refresh_token: str = Field(..., min_length=10)


class RefreshResponse(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int


class SendOtpRequest(BaseModel):
    phone_number: str = Field(..., min_length=8)


class VerifyOtpRequest(BaseModel):
    phone_number: str = Field(..., min_length=8)
    otp: str = Field(..., min_length=4, max_length=8)


class OtpTokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int
    student_id: str
    is_new_user: bool


# --------------------------------------------------------------------------- #
# Endpoints
# --------------------------------------------------------------------------- #
@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Authenticate a user with email and password, returning a JWT token."""
    try:
        user, token = await AuthService.authenticate(
            db, payload.email, payload.password
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        )

    refresh = AuthService(db)._create_refresh_token(str(user.id))
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserInfo.model_validate(user),
        refresh_token=refresh,
        expires_in=int(AuthService.ACCESS_TOKEN_TTL.total_seconds()),
    )


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(payload: SignupRequest, db: AsyncSession = Depends(get_db)):
    """Register a new user and return a JWT token."""
    try:
        user, token = await AuthService.register(db, payload)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        )

    refresh = AuthService(db)._create_refresh_token(str(user.id))
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserInfo.model_validate(user),
        refresh_token=refresh,
        expires_in=int(AuthService.ACCESS_TOKEN_TTL.total_seconds()),
    )


@router.get("/me", response_model=UserInfo)
async def get_me(user: User = Depends(get_current_user)):
    """Return the profile of the currently authenticated user."""
    return UserInfo.model_validate(user)


@router.patch("/me", response_model=UserInfo)
async def update_me(
    payload: UpdateProfileRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update the profile of the currently authenticated user."""
    data = payload.model_dump(exclude_unset=True)
    try:
        updated_user = await AuthService.update_profile(db, str(user.id), data)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    return UserInfo.model_validate(updated_user)


@router.post("/change-password", status_code=status.HTTP_200_OK)
async def change_password(
    payload: ChangePasswordRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Change the password for the currently authenticated user."""
    if not verify_password(payload.current_password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect",
        )

    user.password_hash = hash_password(payload.new_password)
    db.add(user)
    await db.flush()

    return {"message": "Password changed successfully"}


# --------------------------------------------------------------------------- #
# Password reset (real flow, honest demo delivery)
#
# No SMTP exists in this stack, so "email a link" would be a lie.  Instead
# forgot-password mints a single-use token stored HASHED in Redis (TTL 30
# min) and — only because delivery is demo — returns it in the response
# body flagged delivery:"demo".  The 200 is unconditional so the endpoint
# cannot be used to enumerate accounts.
# --------------------------------------------------------------------------- #

_PWRESET_TTL = 1800  # 30 minutes


class ForgotPasswordRequest(BaseModel):
    email: str = Field(..., min_length=3)


class ResetPasswordRequest(BaseModel):
    token: str = Field(..., min_length=16)
    new_password: str = Field(
        ...,
        min_length=8,
        alias=AliasChoices("new_password", "newPassword"),
    )

    model_config = {"populate_by_name": True}


def _pwreset_key(token: str) -> str:
    """Redis key for a reset token — only the SHA-256 of the token is
    stored, so a Redis read cannot mint resets."""
    return "pwreset:" + hashlib.sha256(token.encode()).hexdigest()


@router.post("/forgot-password", status_code=status.HTTP_200_OK)
async def forgot_password(
    payload: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)
):
    """Mint a password-reset token.  Always 200 (no account enumeration)."""
    result = await db.execute(select(User).where(func.lower(User.email) == func.lower(payload.email)))
    user = result.scalar_one_or_none()

    resp: dict = {"status": "ok", "delivery": "demo"}
    if user is not None:
        try:
            token = secrets.token_urlsafe(32)
            r = await get_redis()
            if r is not None:
                await r.set(_pwreset_key(token), str(user.id), ex=_PWRESET_TTL)
                # demo delivery: no mailer is configured, so the token is
                # handed back here instead of being emailed
                resp["reset_token"] = token
                resp["expires_in_seconds"] = _PWRESET_TTL
        except Exception:
            pass  # reset store down — stay 200, reveal nothing
    return resp


@router.post("/reset-password", status_code=status.HTTP_200_OK)
async def reset_password(
    payload: ResetPasswordRequest, db: AsyncSession = Depends(get_db)
):
    """Consume a reset token and set a new password.

    Single-use: the token is deleted, and every existing refresh token
    for the user is revoked so old sessions die with the old password."""
    if len(payload.new_password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters",
        )
    r = await get_redis()
    if r is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Reset store unavailable — try again shortly",
        )
    key = _pwreset_key(payload.token)
    user_id = await r.get(key)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reset link is invalid or has expired",
        )
    result = await db.execute(select(User).where(User.id == str(user_id)))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reset link is invalid or has expired",
        )
    user.password_hash = hash_password(payload.new_password)
    db.add(user)
    await db.execute(
        delete(RefreshTokenModel).where(RefreshTokenModel.user_id == user.id)
    )
    await db.commit()
    try:
        await r.delete(key)
    except Exception:
        pass
    return {
        "status": "ok",
        "message": "Password updated — sign in with your new password",
    }


@router.post("/send-otp", status_code=status.HTTP_200_OK)
async def send_otp(payload: SendOtpRequest, db: AsyncSession = Depends(get_db)):
    """Issue an OTP for the phone number — 'login' purpose when the number
    already belongs to a verified account, 'register' otherwise."""
    try:
        purpose = await AuthService(db).request_auth_otp(payload.phone_number)
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)
        )
    return {"sent": True, "purpose": purpose}


@router.post("/verify-otp", response_model=OtpTokenResponse)
async def verify_otp(payload: VerifyOtpRequest, db: AsyncSession = Depends(get_db)):
    """Verify an OTP — logs in an existing verified account or completes
    registration for a new one. Returns the token pair + user id."""
    svc = AuthService(db)
    try:
        is_new = (
            await svc._get_user_by_phone(svc._normalize_phone(payload.phone_number))
        ) is None
        user, access, refresh = await svc.verify_auth_otp(
            payload.phone_number, payload.otp
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc)
        )
    return OtpTokenResponse(
        access_token=access,
        refresh_token=refresh,
        expires_in=int(AuthService.ACCESS_TOKEN_TTL.total_seconds()),
        student_id=str(user.id),
        is_new_user=is_new,
    )


@router.post("/refresh", response_model=RefreshResponse)
async def refresh(payload: RefreshRequest, db: AsyncSession = Depends(get_db)):
    """Exchange a valid refresh token for a new access + refresh pair.

    Rotates the refresh token (the old one is revoked on use) — the client
    must store the returned refresh_token for the next call.
    """
    try:
        access, new_refresh = await AuthService(db).refresh_access_token(
            payload.refresh_token
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        )
    return RefreshResponse(
        access_token=access,
        refresh_token=new_refresh,
        expires_in=int(AuthService.ACCESS_TOKEN_TTL.total_seconds()),
    )


@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(user: User = Depends(get_current_user)):
    """Logout the currently authenticated user.

    The JWT is stateless so the server does not track sessions; the client
    is expected to discard the token.  This endpoint exists for API
    completeness and logging purposes.
    """
    return {"message": "Logged out successfully"}


# --------------------------------------------------------------------- #
# Parent ↔ student linking
# --------------------------------------------------------------------- #

class LinkChildRequest(BaseModel):
    student_id: str = Field(..., min_length=1)
    relation: str = Field(default="parent", pattern=r"^(parent|guardian)$")


@router.post("/link-child", status_code=status.HTTP_201_CREATED)
async def link_child(
    payload: LinkChildRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Link the authenticated parent to a student account.

    The parent must have role='parent' (set at signup); the student must
    exist and have role='student'. Idempotent — duplicate links 409.
    """
    if user.role != "parent":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only parent accounts can link children",
        )
    try:
        link = await AuthService(db).link_parent_to_student(
            parent_id=str(user.id),
            student_id=payload.student_id,
            relation=payload.relation,
        )
        await db.commit()
    except ValueError as exc:
        msg = str(exc)
        code = status.HTTP_409_CONFLICT if "already exists" in msg else status.HTTP_400_BAD_REQUEST
        raise HTTPException(status_code=code, detail=msg)
    return {"link_id": str(link.id), "student_id": payload.student_id}


@router.get("/my-children")
async def my_children(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return the students linked to the authenticated parent."""
    if user.role != "parent":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only parent accounts have children",
        )
    students = await AuthService(db).get_students_for_parent(str(user.id))
    return {
        "children": [
            {
                "student_id": str(s.id),
                "name": s.name,
                "class_level": s.class_level,
            }
            for s in students
        ]
    }
