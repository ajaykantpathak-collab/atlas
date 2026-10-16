"""
Centralized configuration for the K-12 Learning Platform.

Reads all settings from environment variables with sensible defaults.
Uses pydantic-settings BaseSettings for type-safe env parsing.

Usage:
    from config import settings
    print(settings.database_url)
    print(settings.is_production)

Environment variables (prefix: PLATFORM_):
    PLATFORM_DATABASE_URL=postgresql://user:pass@localhost/db
    PLATFORM_JWT_SECRET=your-secret-key
    PLATFORM_ENV=development
    ...etc
"""

import os
from enum import Enum
from typing import List, Optional, Dict, Any

from pydantic import AliasChoices, Field, field_validator, ConfigDict
from pydantic_settings import BaseSettings, SettingsConfigDict


class Environment(str, Enum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"
    TESTING = "testing"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="PLATFORM_",
        env_file=(".env", ".env.local", ".env.development", ".env.production"),
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    # ------------------------------------------------------------------ #
    # Application
    # ------------------------------------------------------------------ #
    app_name: str = "K12 Learning Platform"
    app_version: str = "1.0.0"
    env: Environment = Field(
        default=Environment.DEVELOPMENT,
        description="Runtime environment: development | production | testing",
    )
    debug: bool = Field(
        default=True,
        description="Enable debug mode (auto-disabled in production)",
    )
    api_prefix: str = Field(default="/api", description="API route prefix")

    # ------------------------------------------------------------------ #
    # Database
    # ------------------------------------------------------------------ #
    database_url: str = Field(
        default="",  # No hardcoded default — must come from env
        description="PostgreSQL async connection URL",
    )
    database_echo: bool = Field(
        default=False,
        description="Echo SQL statements (debug only)",
    )
    database_pool_size: int = Field(default=5, ge=1, le=50)
    database_max_overflow: int = Field(default=10, ge=0)

    # ------------------------------------------------------------------ #
    # Redis
    # ------------------------------------------------------------------ #
    redis_url: str = Field(
        default="redis://localhost:6379/0",
        description="Redis connection URL for caching and rate limiting",
    )

    # ------------------------------------------------------------------ #
    # JWT / Authentication
    # ------------------------------------------------------------------ #
    jwt_secret: str = Field(
        default="change-me-in-production-use-a-real-secret-key-please",
        min_length=32,
        # Without validate_default, pydantic skips validators on the DEFAULT
        # value — the production guard below never fired when the env var was
        # simply unset, silently signing tokens with a public constant.
        validate_default=True,
        description="Secret key for JWT signing (MUST be set in production)",
    )
    jwt_algorithm: str = Field(default="HS256")
    access_token_expire_minutes: int = Field(default=30, ge=5, le=1440)
    refresh_token_expire_days: int = Field(default=7, ge=1, le=90)

    # ------------------------------------------------------------------ #
    # Claude API (tutor only - NOT used in solver path)
    # ------------------------------------------------------------------ #
    claude_api_key: Optional[str] = Field(
        default=None,
        description="Claude API key (tutor endpoints only, not used in solvers)",
    )
    claude_model_tutor: str = Field(default="claude-opus-5")

    # ------------------------------------------------------------------ #
    # LLM lane keys — CL-18: the legacy UPPERCASE properties at the
    # bottom of this class getattr these names, but no Field declared
    # them, so env keys (plain GEMINI_API_KEY in .env, or PLATFORM_-prefixed)
    # could never populate them.  AliasChoices accepts both spellings.
    # ------------------------------------------------------------------ #
    freellm_api_url: Optional[str] = Field(
        default=None,
        validation_alias=AliasChoices(
            "FREELLM_API_URL", "PLATFORM_FREELLM_API_URL"))
    freellm_api_key: Optional[str] = Field(
        default=None,
        validation_alias=AliasChoices(
            "FREELLM_API_KEY", "PLATFORM_FREELLM_API_KEY"))
    freellm_model: str = Field(
        default="auto",
        validation_alias=AliasChoices(
            "FREELLM_MODEL", "PLATFORM_FREELLM_MODEL"))
    gemini_api_key: Optional[str] = Field(
        default=None,
        validation_alias=AliasChoices(
            "GEMINI_API_KEY", "PLATFORM_GEMINI_API_KEY"))
    gemini_model: str = Field(
        default="gemini-flash-latest",
        validation_alias=AliasChoices(
            "GEMINI_MODEL", "PLATFORM_GEMINI_MODEL"))
    groq_api_key: Optional[str] = Field(
        default=None,
        validation_alias=AliasChoices(
            "GROQ_API_KEY", "PLATFORM_GROQ_API_KEY"))

    # ------------------------------------------------------------------ #
    # WhatsApp Bot
    # ------------------------------------------------------------------ #
    whatsapp_bot_token: Optional[str] = Field(
        default=None,
        description="WhatsApp Cloud API bearer token",
    )
    whatsapp_phone_number_id: Optional[str] = Field(
        default=None,
        description="WhatsApp Business Phone Number ID",
    )
    whatsapp_webhook_verify_token: Optional[str] = Field(
        default=None,
        description="Webhook verification token for WhatsApp",
    )

    # ------------------------------------------------------------------ #
    # Qdrant (Vector Store for knowledge tracing)
    # ------------------------------------------------------------------ #
    qdrant_url: str = Field(
        default="http://localhost:6333",
        description="Qdrant vector database URL",
    )
    qdrant_api_key: Optional[str] = Field(
        default=None,
        description="Qdrant API key (if using cloud)",
    )
    qdrant_collection: str = Field(
        default="k12_knowledge",
        description="Default Qdrant collection name",
    )

    # ------------------------------------------------------------------ #
    # Neo4j (Knowledge Graph)
    # ------------------------------------------------------------------ #
    neo4j_uri: str = Field(
        default="bolt://localhost:7687",
        description="Neo4j bolt connection URL (env: PLATFORM_NEO4J_URI)",
    )
    neo4j_user: str = Field(default="neo4j")
    neo4j_password: str = Field(
        default="change-me-in-production",
        description="Neo4j password",
    )
    neo4j_database: str = Field(default="neo4j")

    # ------------------------------------------------------------------ #
    # Solver LLM-usage policy (the central contract knobs — enforced in
    # backend/its/solver/policy.py + backend/its/solver/contract.py)
    # ------------------------------------------------------------------ #
    solver_llm_mode: str = Field(
        default="parse_only",
        description=("Solver LLM policy: off | parse_only | fallback | "
                     "explain_only. parse_only allows slot EXTRACTION "
                     "only (competency canonicalizer); fallback additionally "
                     "enables the LLM fallback handler; answers always stay "
                     "deterministic. Invalid values fail closed to off."),
    )
    solver_require_verification: bool = Field(
        default=True,
        description=("Solver results must pass their verification beat to "
                     "carry an answer; unverified fallback results return "
                     "UNSUPPORTED."),
    )
    solver_allow_unverified_answer: bool = Field(
        default=False,
        description=("Relaxation switch: when false (default), an unverified "
                     "fallback result ships NO answer (UNSUPPORTED). Only "
                     "when true AND verification is not required may an "
                     "unverified answer ride — status still never claims "
                     "VERIFIED."),
    )

    # ------------------------------------------------------------------ #
    # Feature Flags
    # ------------------------------------------------------------------ #
    feature_photo_input: bool = Field(default=True)
    feature_whatsapp_bot: bool = Field(default=False)
    feature_voice_input: bool = Field(default=True)
    feature_offline_mode: bool = Field(default=True)
    feature_socratic_teacher: bool = Field(default=True)
    feature_achievements: bool = Field(default=True)

    @property
    def feature_flags(self) -> Dict[str, bool]:
        return {
            "photo_input": self.feature_photo_input,
            "whatsapp_bot": self.feature_whatsapp_bot,
            "voice_input": self.feature_voice_input,
            "offline_mode": self.feature_offline_mode,
            "socratic_teacher": self.feature_socratic_teacher,
            "achievements": self.feature_achievements,
        }

    # ------------------------------------------------------------------ #
    # Rate Limits (requests per minute)
    # ------------------------------------------------------------------ #
    rate_limit_solver: int = Field(default=500, ge=1, description="Solver requests per minute")
    rate_limit_tutor: int = Field(default=100, ge=1, description="Tutor requests per minute")
    rate_limit_practice: int = Field(default=200, ge=1, description="Practice requests per minute")
    rate_limit_generate: int = Field(default=100, ge=1, description="Question generation requests per minute")

    @property
    def rate_limits(self) -> Dict[str, int]:
        return {
            "solver": self.rate_limit_solver,
            "tutor": self.rate_limit_tutor,
            "practice": self.rate_limit_practice,
            "generate": self.rate_limit_generate,
        }

    # ------------------------------------------------------------------ #
    # CORS
    # ------------------------------------------------------------------ #
    cors_origins: str = Field(
        default="http://localhost:3000,http://localhost:5173",
        description="Comma-separated list of allowed CORS origins",
    )

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    # ------------------------------------------------------------------ #
    # Computed / Convenience Properties
    # ------------------------------------------------------------------ #
    @property
    def is_development(self) -> bool:
        return self.env == Environment.DEVELOPMENT

    @property
    def is_production(self) -> bool:
        return self.env == Environment.PRODUCTION

    @property
    def is_testing(self) -> bool:
        return self.env == Environment.TESTING

    @property
    def database_url_async(self) -> str:
        if "+asyncpg" not in self.database_url:
            return self.database_url.replace("postgresql://", "postgresql+asyncpg://")
        return self.database_url

    # ------------------------------------------------------------------ #
    # Dream_app compatibility aliases
    # dream_app files use UPPER_CASE env names; map them to platform fields
    # ------------------------------------------------------------------ #
    @property
    def POSTGRES_URL(self) -> str:
        return self.database_url_async

    @property
    def ENVIRONMENT(self) -> str:
        return self.env.value

    @property
    def NEO4J_URI(self) -> str:
        return self.neo4j_uri

    @property
    def NEO4J_USER(self) -> str:
        return self.neo4j_user

    @property
    def NEO4J_PASSWORD(self) -> str:
        return self.neo4j_password

    @property
    def REDIS_URL(self) -> str:
        return self.redis_url

    @property
    def QDRANT_URL(self) -> str:
        return self.qdrant_url

    @property
    def FREELLM_API_URL(self) -> str:
        return getattr(self, "freellm_api_url", "")

    @property
    def FREELLM_API_KEY(self) -> str:
        return getattr(self, "freellm_api_key", "")

    @property
    def FREELLM_MODEL(self) -> str:
        return getattr(self, "freellm_model", "auto")

    @property
    def GEMINI_API_KEY(self) -> str:
        return getattr(self, "gemini_api_key", "")

    @property
    def GEMINI_MODEL(self) -> str:
        return getattr(self, "gemini_model", "gemini-flash-latest")

    @property
    def GROQ_API_KEY(self) -> str:
        return getattr(self, "groq_api_key", "")

    @property
    def JWT_SECRET(self) -> str:
        return self.jwt_secret

    @property
    def JWT_ALGORITHM(self) -> str:
        return self.jwt_algorithm

    @property
    def JWT_EXPIRE_MINUTES(self) -> int:
        return self.jwt_expire_minutes

    @property
    def CORS_ORIGINS(self) -> str:
        return self.cors_origins

    @property
    def FRONTEND_URL(self) -> str:
        return self.frontend_url

    # ------------------------------------------------------------------ #
    # Validators
    # ------------------------------------------------------------------ #
    @field_validator("jwt_secret")
    @classmethod
    def validate_jwt_secret(cls, v: str, info) -> str:
        env_val = info.data.get("env")
        _SENTINELS = (
            "change-me-in-production-use-a-real-secret-key-please",
            "changeme",
            "secret",
            "",
        )
        if v not in _SENTINELS:
            return v
        if env_val == Environment.PRODUCTION:
            raise ValueError(
                "PLATFORM_JWT_SECRET must be set to a strong, unique value in production"
            )
        # Non-production with no configured secret: mint a random one and
        # persist it under _cache/ so tokens stay valid across restarts and
        # are shared by forked workers. Never fall back to the public
        # constant — that made every dev/test token forgeable.
        import secrets as _secrets
        from pathlib import Path as _Path
        try:
            cache_dir = _Path(__file__).resolve().parent / "_cache"
            cache_dir.mkdir(parents=True, exist_ok=True)
            secret_file = cache_dir / "dev_jwt_secret"
            if secret_file.exists():
                cached = secret_file.read_text(encoding="utf-8").strip()
                if len(cached) >= 32:
                    return cached
            minted = _secrets.token_urlsafe(48)
            secret_file.write_text(minted, encoding="utf-8")
            return minted
        except OSError:
            # Read-only or sandboxed filesystem — per-process random secret.
            return _secrets.token_urlsafe(48)

    @field_validator("database_url", mode="before")
    @classmethod
    def resolve_database_url(cls, v: Any) -> str:
        """Resolve database URL from multiple env var names."""
        import os
        if v:
            return v
        # Try alternative env var names (dream_app compatibility)
        for name in ("DATABASE_URL", "POSTGRES_URL", "PLATFORM_DATABASE_URL"):
            val = os.environ.get(name, "")
            if val:
                return val
        # Try reading from .env file directly (CWD-relative first, then the
        # repo root / backend dir of THIS checkout -- never a machine-specific
        # absolute path).
        from pathlib import Path
        _here = Path(__file__).resolve()       # backend/config.py
        for env_path in (Path(".env"), Path("../.env"),
                         _here.parent.parent / ".env",   # <repo>/.env
                         _here.parent / ".env"):         # backend/.env
            if env_path.exists():
                try:
                    for line in env_path.read_text(encoding="utf-8").splitlines():
                        line = line.strip()
                        if line.startswith("#") or "=" not in line:
                            continue
                        key, _, val = line.partition("=")
                        key = key.strip()
                        val = val.strip().strip('"').strip("'")
                        if key in ("DATABASE_URL", "POSTGRES_URL", "PLATFORM_DATABASE_URL") and val:
                            return val
                except Exception:
                    pass
        return ""

    @field_validator("solver_llm_mode", mode="before")
    @classmethod
    def normalize_solver_llm_mode(cls, v: Any) -> str:
        """Lowercase/trim.  Invalid values are NOT rejected here —
        policy.llm_mode() fails closed to `off` at read time so a typo
        can never enable an unexpected LLM lane."""
        return str(v or "").strip().lower()

    @field_validator("env", mode="before")
    @classmethod
    def normalize_env(cls, v: Any) -> Environment:
        if isinstance(v, Environment):
            return v
        if isinstance(v, str):
            lower = v.strip().lower()
            mapping = {
                "dev": Environment.DEVELOPMENT,
                "development": Environment.DEVELOPMENT,
                "prod": Environment.PRODUCTION,
                "production": Environment.PRODUCTION,
                "test": Environment.TESTING,
                "testing": Environment.TESTING,
            }
            if lower in mapping:
                return mapping[lower]
        raise ValueError(f"Invalid environment: {v!r}. Use development | production | testing")

    # ------------------------------------------------------------------ #
    # Security: prevent accidental secret logging
    # ------------------------------------------------------------------ #
    def __repr__(self) -> str:
        return (
            f"Settings("
            f"env={self.env.value!r}, "
            f"app_name={self.app_name!r}, "
            f"debug={self.debug}, "
            f"api_prefix={self.api_prefix!r}, "
            f"feature_flags={self.feature_flags}, "
            f"rate_limits={self.rate_limits}, "
            f"cors_origins_list={self.cors_origins_list}, "
            f"database_url=***, "
            f"jwt_secret=***, "
            f"claude_api_key=***, "
            f"whatsapp_bot_token=***, "
            f"qdrant_api_key=***, "
            f"neo4j_password=***, "
            f"redis_url=***"
            f")"
        )

    def model_dump(self, **kwargs) -> Dict[str, Any]:
        kwargs.setdefault("exclude", {
            "jwt_secret",
            "claude_api_key",
            "whatsapp_bot_token",
            "whatsapp_webhook_verify_token",
            "qdrant_api_key",
            "neo4j_password",
        })
        return super().model_dump(**kwargs)


# ---------------------------------------------------------------------- #
# Global settings instance
# ---------------------------------------------------------------------- #
try:
    settings = Settings()
except Exception as exc:
    raise RuntimeError(
        f"Failed to load platform configuration.\n"
        f"Check your environment variables or .env file.\n"
        f"Error: {exc}"
    ) from exc


# ---------------------------------------------------------------------- #
# Compatibility: dream_app files call get_settings() — return same instance
# ---------------------------------------------------------------------- #
from functools import lru_cache

@lru_cache
def get_settings() -> Settings:
    """Return the global Settings instance (dream_app compatibility)."""
    return Settings()


# ---------------------------------------------------------------------- #
# Convenience re-exports
# ---------------------------------------------------------------------- #
__all__ = [
    "settings",
    "Settings",
    "Environment",
    "get_settings",
]
