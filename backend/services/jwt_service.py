"""JWT Service — token encoding, decoding, and lifecycle management.

Used by the auth API router for access/refresh token management.
Static methods — no instantiation needed (called as JWTService.method()).
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone, timedelta
from typing import Any, Optional

from jose import JWTError, jwt

from config import settings

logger = logging.getLogger(__name__)


class JWTService:
    """Static JWT utility class for token encoding and decoding.

    All methods are static — no instance state.
    Uses HS256 algorithm with the platform's jwt_secret.
    """

    SECRET_KEY: str = settings.jwt_secret
    ALGORITHM: str = settings.jwt_algorithm
    ACCESS_TOKEN_TYPE: str = "access"
    REFRESH_TOKEN_TYPE: str = "refresh"

    @staticmethod
    def encode(
        payload: dict[str, Any],
        expires_delta: Optional[timedelta] = None,
    ) -> str:
        """Encode a JWT token with optional expiration.

        Args:
            payload: Claims to include in the token.
            expires_delta: Optional expiration time delta.

        Returns:
            Encoded JWT string.
        """
        to_encode = payload.copy()
        now = datetime.now(timezone.utc)

        if expires_delta:
            expire = now + expires_delta
            to_encode.update({"exp": expire})

        if "iat" not in to_encode:
            to_encode["iat"] = now

        return jwt.encode(to_encode, JWTService.SECRET_KEY, algorithm=JWTService.ALGORITHM)

    @staticmethod
    def decode_access_token(token: str) -> dict[str, Any]:
        """Decode and validate an access token.

        Args:
            token: JWT access token string.

        Returns:
            Decoded payload as a dict.

        Raises:
            JWTError: If the token is invalid, expired, or malformed.
        """
        try:
            payload = jwt.decode(token, JWTService.SECRET_KEY, algorithms=[JWTService.ALGORITHM])
            if payload.get("type") == JWTService.REFRESH_TOKEN_TYPE:
                raise JWTError("Expected access token but got refresh token")
            return payload
        except JWTError as e:
            logger.warning(f"Access token decode failed: {e}")
            raise

    @staticmethod
    def decode_refresh_token(token: str) -> dict[str, Any]:
        """Decode and validate a refresh token.

        Args:
            token: JWT refresh token string.

        Returns:
            Decoded payload as a dict.

        Raises:
            JWTError: If the token is invalid, expired, or malformed.
        """
        try:
            payload = jwt.decode(token, JWTService.SECRET_KEY, algorithms=[JWTService.ALGORITHM])
            if payload.get("type") == JWTService.ACCESS_TOKEN_TYPE:
                raise JWTError("Expected refresh token but got access token")
            return payload
        except JWTError as e:
            logger.warning(f"Refresh token decode failed: {e}")
            raise

    @staticmethod
    def get_remaining_ttl(token: str) -> int:
        """Get remaining time-to-live in seconds for a token.

        Args:
            token: JWT token string.

        Returns:
            Remaining seconds until expiration. Returns 0 if expired or invalid.
        """
        try:
            payload = jwt.decode(
                token,
                JWTService.SECRET_KEY,
                algorithms=[JWTService.ALGORITHM],
                options={"verify_exp": False},
            )
            exp = payload.get("exp")
            if exp is None:
                return 0
            now = datetime.now(timezone.utc).timestamp()
            remaining = int(exp - now)
            return max(remaining, 0)
        except JWTError:
            return 0

    @staticmethod
    def create_access_token(
        user_id: str,
        role: str,
        expires_delta: Optional[timedelta] = None,
    ) -> str:
        """Create a standard access token with user claims.

        Args:
            user_id: User identifier.
            role: User role (student/parent/teacher).
            expires_delta: Optional custom expiration.

        Returns:
            Encoded JWT access token.
        """
        if expires_delta is None:
            expires_delta = timedelta(minutes=settings.access_token_expire_minutes)

        payload = {
            "sub": user_id,
            "role": role,
            "type": JWTService.ACCESS_TOKEN_TYPE,
        }
        return JWTService.encode(payload, expires_delta=expires_delta)

    @staticmethod
    def create_refresh_token(
        user_id: str,
        role: str,
        expires_delta: Optional[timedelta] = None,
    ) -> str:
        """Create a standard refresh token with user claims.

        Args:
            user_id: User identifier.
            role: User role (student/parent/teacher).
            expires_delta: Optional custom expiration.

        Returns:
            Encoded JWT refresh token.
        """
        if expires_delta is None:
            expires_delta = timedelta(days=settings.refresh_token_expire_days)

        payload = {
            "sub": user_id,
            "role": role,
            "type": JWTService.REFRESH_TOKEN_TYPE,
        }
        return JWTService.encode(payload, expires_delta=expires_delta)
