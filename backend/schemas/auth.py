from typing import Optional

from pydantic import AliasChoices, BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


class SignupRequest(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: str = Field(default="student")
    board: Optional[str] = None
    # Web signup form sends camelCase classLevel; accept both spellings.
    class_level: Optional[int] = Field(
        default=None, ge=1, le=12,
        validation_alias=AliasChoices("class_level", "classLevel"),
    )


class UserInfo(BaseModel):
    model_config = {"from_attributes": True}

    id: str
    name: str
    email: str
    role: str
    board: Optional[str] = None
    class_level: Optional[int] = None
    avatar_url: Optional[str] = None
    is_premium: bool = False

    @classmethod
    def model_validate(cls, obj, *args, **kwargs):
        # Convert UUID id to string if needed
        if hasattr(obj, 'id') and not isinstance(obj.id, str):
            # Create a dict copy with string id
            data = {k: getattr(obj, k) for k in cls.model_fields}
            data['id'] = str(data['id'])
            return cls(**data)
        return super().model_validate(obj, *args, **kwargs)
    total_xp: int = 0
    current_level: int = 1
    streak_days: int = 0


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = Field(default="bearer")
    user: UserInfo
    # optional so older callers/tests that build TokenResponse without a
    # refresh token keep validating
    refresh_token: Optional[str] = None
    expires_in: Optional[int] = None
