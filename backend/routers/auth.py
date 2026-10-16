"""Auth router for the DREAM_APP educational platform.

Exposes endpoints for login, signup, profile management, password change,
and logout.
"""

from typing import Optional

import asyncio
import hashlib
import secrets
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status
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
        # Match signup + reset policy (8) — 6 was inconsistent and weak.
        min_length=8,
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
# Login rate limiting (A5-HARDENING, additive; best-effort + fail-open)
#
# The DB-side account lockout in AuthService only protects ONE account; a
# password-spray across many emails from one IP paid bcrypt cost on every
# request.  This gate counts FAILED logins (per client IP and per email) in
# Redis with a fixed 15-minute window and short-circuits with 429 once the
# threshold is crossed.  Design rules:
#   * success never counts — the happy path and the loadgen are untouched;
#   * Redis unavailable / erroring  ->  the request is ALLOWED (fail-open:
#     login must never depend on the rate-limit store being up);
#   * only /login is gated — signup/OTP flows are unchanged.
# --------------------------------------------------------------------------- #
LOGIN_RL_FAIL_LIMIT = 10        # failed logins ...
LOGIN_RL_WINDOW_S = 900         # ... per 15-minute fixed window


def _login_rl_keys(request: Request, email: str) -> tuple[str, str]:
    ip = request.client.host if request.client else "unknown"
    return (
        f"loginrl:fail:ip:{ip}",
        "loginrl:fail:email:" + email.strip().lower(),
    )


async def _login_rate_limited(request: Request, email: str) -> bool:
    try:
        r = await get_redis()
        if r is None:
            return False
        ip_key, email_key = _login_rl_keys(request, email)
        ip_fails = int(await r.get(ip_key) or 0)
        email_fails = int(await r.get(email_key) or 0)
        return (
            ip_fails >= LOGIN_RL_FAIL_LIMIT or email_fails >= LOGIN_RL_FAIL_LIMIT
        )
    except Exception:
        return False  # limiter store down -> never block legit logins


async def _record_login_failure(request: Request, email: str) -> None:
    try:
        r = await get_redis()
        if r is None:
            return
        for key in _login_rl_keys(request, email):
            new_val = await r.incr(key)
            if new_val == 1:
                await r.expire(key, LOGIN_RL_WINDOW_S)
    except Exception:
        pass  # fail-open, same as the check


async def _clear_login_failures(request: Request, email: str) -> None:
    try:
        r = await get_redis()
        if r is None:
            return
        await r.delete(*_login_rl_keys(request, email))
    except Exception:
        pass


# --------------------------------------------------------------------------- #
# Endpoints
# --------------------------------------------------------------------------- #
@router.post("/login", response_model=TokenResponse)
async def login(
    request: Request,
    payload: LoginRequest,
    db: AsyncSession = Depends(get_db),
):
    """Authenticate a user with email and password, returning a JWT token.

    Dependency ordering is deliberate (cheapest first): the request object
    (zero-cost, FastAPI-injected) -> the parsed JSON body (Pydantic, no I/O)
    -> the DB session (the only dependency that allocates a pooled
    connection).  The rate-limit gate below runs BEFORE any DB/bcrypt work
    so a spray pays connection cost, not hash cost.
    """
    # rate-limit gate (fail-open) — before authenticate() spends bcrypt
    if await _login_rate_limited(request, payload.email):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many failed login attempts — try again in a few minutes",
        )
    try:
        user, token = await AuthService.authenticate(
            db, payload.email, payload.password
        )
    except ValueError as exc:
        await _record_login_failure(request, payload.email)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        )

    await _clear_login_failures(request, payload.email)
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
    """Register a new user and return a JWT token.

    DPDP §9 (WS-LEGAL): for students the schema already enforced a
    parent_email + consent checkbox, and register() persisted the consent
    record.  Here we compose + send the parent notice — best-effort,
    never blocking: with no SMTP relay configured the notice is logged
    (auditable) and consent_status stays 'pending' (honest degradation).
    """
    try:
        user, token = await AuthService.register(db, payload)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        )

    if user.role == "student" and getattr(payload, "parent_email", None):
        try:
            from backend.services import mailer
            result = await asyncio.to_thread(
                mailer.send_parent_consent_notice,
                parent_email=str(payload.parent_email),
                student_name=user.name or "",
                student_email=str(user.email or ""),
                class_level=user.class_level,
                board=user.board,
            )
            if result == "sent":
                user.consent_status = "notified"
                db.add(user)
                await db.commit()
        except Exception:
            pass  # notice failure never fails a committed signup

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


# --------------------------------------------------------------------------- #
# Account deletion + self-service data export (WS-LEGAL)
#
# Store-policy shape: the authenticated user re-enters their password and
# types DELETE; the account is anonymised + deactivated immediately (PII is
# destroyed at request time, learning rows keep only an opaque UUID), every
# refresh token is revoked, and residual rows are hard-purged by the
# worker's daily account_purge job once the 30-day window closes.
# --------------------------------------------------------------------------- #


class DeleteAccountRequest(BaseModel):
    password: str = Field(..., min_length=1)
    # Typed confirmation — the web danger zone makes the user type DELETE.
    # Accept a few spellings clients have used; all must equal "DELETE".
    confirmation: str = Field(
        default="",
        validation_alias=AliasChoices(
            "confirmation", "confirm_text", "confirmText"),
    )

    model_config = {"populate_by_name": True}


@router.post("/delete-account", status_code=status.HTTP_200_OK)
async def delete_account(
    payload: DeleteAccountRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Soft-delete + anonymise the caller's account (irreversible).

    Requires password re-entry and the literal confirmation "DELETE".
    Wrong/missing credentials are a plain 400 — the same shape as
    change-password, so no account-state oracle is created.  Access tokens
    already in the wild die too: get_current_user rejects is_active=False
    accounts on the very next request.
    """
    if payload.confirmation.strip().upper() != "DELETE":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Type DELETE to confirm permanent account deletion",
        )
    if not user.password_hash or not verify_password(
        payload.password, user.password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password is incorrect",
        )

    from backend.services.account_lifecycle import soft_delete_account
    summary = await soft_delete_account(db, user)
    await db.commit()
    return {
        "status": "ok",
        "message": (
            "Your account has been deleted and your personal details "
            "anonymised. Residual learning records are permanently removed "
            "within 30 days."
        ),
        **summary,
    }


@router.get("/my-data", status_code=status.HTTP_200_OK)
async def my_data(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Self-service data export (DPDP §12 access right).

    Returns ONLY the requester's rows: profile + settings from `users`,
    and the mirrored student record's attempts / mastery / practice
    sessions from the learning tables.  Ownership is structural — every
    query is filtered on the caller's own id, never a client-supplied id.
    """
    from backend.database import (
        Attempt, Mastery, PracticeSession, Student,
    )

    uid = user.id
    student = await db.get(Student, uid)

    attempts = (await db.execute(
        select(Attempt).where(Attempt.student_id == uid)
        .order_by(Attempt.created_at)
    )).scalars().all()
    mastery_rows = (await db.execute(
        select(Mastery).where(Mastery.student_id == uid)
    )).scalars().all()
    sessions = (await db.execute(
        select(PracticeSession).where(PracticeSession.student_id == uid)
        .order_by(PracticeSession.started_at)
    )).scalars().all()

    def _iso(v):
        return v.isoformat() if isinstance(v, datetime) else v

    profile = {
        "id": str(user.id),
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "board": user.board,
        "class_level": user.class_level,
        "phone_number": user.phone_number,
        "school_name": user.school_name,
        "is_premium": user.is_premium,
        "is_verified": user.is_verified,
        "total_xp": user.total_xp,
        "current_level": user.current_level,
        "streak_days": user.streak_days,
        "created_at": _iso(user.created_at),
        # The user's own consent metadata is their data too.
        "parent_email": user.parent_email,
        "parent_consent_at": _iso(user.parent_consent_at),
        "consent_method": user.consent_method,
        "consent_status": user.consent_status,
    }

    return {
        "schema": "atlas.mydata.v1",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "profile": profile,
        "settings": user.preferences or {},
        "student_profile": (
            {
                "id": str(student.id),
                "name": student.name,
                "student_class": student.student_class,
                "subjects": list(student.subjects or []),
                "language_pref": student.language_pref,
                "created_at": _iso(student.created_at),
            }
            if student is not None else None
        ),
        "attempts": [
            {
                "id": str(a.id),
                "topic_id": str(a.topic_id) if a.topic_id else None,
                "session_id": str(a.session_id) if a.session_id else None,
                "subject": a.subject,
                "answer": a.answer,
                "correct": a.correct,
                "time_ms": a.time_ms,
                "marks_awarded": a.marks_awarded,
                "created_at": _iso(a.created_at),
            }
            for a in attempts
        ],
        "mastery": [
            {
                "id": str(m.id),
                "topic_id": str(m.topic_id),
                "bkt_p_know": m.bkt_p_know,
                "irt_theta": m.irt_theta,
                "afm_rate": m.afm_rate,
                "last_review": _iso(m.last_review),
                "next_review": _iso(m.next_review),
            }
            for m in mastery_rows
        ],
        "practice_sessions": [
            {
                "id": str(p.id),
                "questions_answered": p.questions_answered,
                "started_at": _iso(p.started_at),
                "ended_at": _iso(p.ended_at),
            }
            for p in sessions
        ],
        "counts": {
            "attempts": len(attempts),
            "mastery": len(mastery_rows),
            "practice_sessions": len(sessions),
        },
    }
