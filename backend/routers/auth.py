"""Auth router for the DREAM_APP educational platform.

Exposes endpoints for login, signup, profile management, password change,
and logout.
"""

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import AliasChoices, BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.user import User
from backend.schemas.auth import LoginRequest, SignupRequest, TokenResponse, UserInfo
from backend.security import hash_password, verify_password
from backend.services.auth_service import AuthService

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

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserInfo.model_validate(user),
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

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserInfo.model_validate(user),
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


@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(user: User = Depends(get_current_user)):
    """Logout the currently authenticated user.

    The JWT is stateless so the server does not track sessions; the client
    is expected to discard the token.  This endpoint exists for API
    completeness and logging purposes.
    """
    return {"message": "Logged out successfully"}
