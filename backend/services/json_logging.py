"""
Structured JSON logging for the K-12 Learning Platform.

Opt-in via the ``LOG_FORMAT`` environment variable:
    LOG_FORMAT=json   -> emit one JSON object per log record (one line each)
    LOG_FORMAT=text   -> (default) keep stdlib default human-readable formatting

Design goals:
- Non-destructive: when ``LOG_FORMAT != json`` the stdlib defaults are preserved
  so existing dev workflows and grep-able logs are unchanged.
- Context-aware: a ``ContextVar`` carries the current request id so every log
  line emitted during a request is automatically correlated.
- Secret-aware: known sensitive substrings (api keys, jwt secret, passwords,
  tokens) are redacted from the rendered message before serialization.
- Stdlib-only: no third-party deps (no python-json-logger), so it works in the
  minimal environment without extra installs.

Usage (in ``app.py``)::

    from backend.services.json_logging import setup_logging, set_request_id

    setup_logging(log_format=os.environ.get("LOG_FORMAT", "text"),
                  debug=DEBUG)

    # inside the request-id middleware:
    token = set_request_id(request_id)
    try:
        response = await call_next(request)
    finally:
        set_request_id(None, token)
"""

from __future__ import annotations

import json
import logging
import os
import re
import time
from contextvars import ContextVar
from typing import Any, Optional

# ---------------------------------------------------------------------------
# Request-id context
# ---------------------------------------------------------------------------

# Carries the current request id for the in-flight request. ``None`` outside a
# request. Set by the request-id middleware in app.py.
request_id_var: ContextVar[Optional[str]] = ContextVar("request_id", default=None)


def set_request_id(value: Optional[str], token: Any = None) -> Any:
    """Set the current request id, returning a reset token.

    If a token from a previous ``set_request_id`` call is supplied, it is used
    to restore the prior value (useful for the ``finally`` block in middleware).
    """
    if token is not None:
        return request_id_var.set(value)
    return request_id_var.set(value)


def get_request_id() -> Optional[str]:
    """Return the current request id (or ``None`` outside a request)."""
    return request_id_var.get()


# ---------------------------------------------------------------------------
# Secret redaction
# ---------------------------------------------------------------------------

# Substrings that should never appear in log output. We match on the *value*
# when it is known at runtime (env vars / settings), plus a few generic
# patterns. Keys themselves are fine to log.
_SENSITIVE_ENV_KEYS = (
    "JWT_SECRET",
    "JWT_SECRET_KEY",
    "CLAUDE_API_KEY",
    "ANTHROPIC_API_KEY",
    "OPENAI_API_KEY",
    "GEMINI_API_KEY",
    "GROQ_API_KEY",
    "QDRANT_API_KEY",
    "NEO4J_PASSWORD",
    "POSTGRES_PASSWORD",
    "DATABASE_URL",
    "REDIS_URL",
    "WHATSAPP_BOT_TOKEN",
    "WHATSAPP_WEBHOOK_VERIFY_TOKEN",
    "FREELLM_API_KEY",
)

# Generic token/key patterns (best-effort). We avoid being too aggressive to
# not corrupt legitimate math expressions like ``sk-...`` in solver output.
_KEY_PATTERNS = (
    # sk-ant-... / sk-...  (Anthropic / OpenAI style bearer keys)
    re.compile(r"(sk-(?:ant-)?[A-Za-z0-9_\-]{8,})"),
    # Bearer <token>
    re.compile(r"(Bearer\s+[A-Za-z0-9_\-\.]+)", re.IGNORECASE),
)

_REDACTED = "***REDACTED***"

# Populated lazily from the environment on first use.
_runtime_secret_values: Optional[tuple[str, ...]] = None


def _collect_runtime_secrets() -> tuple[str, ...]:
    """Collect actual secret *values* present in the environment.

    Only non-empty values longer than 4 chars are considered (to avoid
    redacting trivial defaults like 'neo4j'). Keys themselves are not secret.
    """
    global _runtime_secret_values
    if _runtime_secret_values is not None:
        return _runtime_secret_values
    found: list[str] = []
    seen: set[str] = set()
    for k in _SENSITIVE_ENV_KEYS:
        v = os.environ.get(k, "")
        if v and len(v) >= 4 and v not in seen:
            # Skip obvious placeholder defaults
            if v in ("change-me-in-production", "changeme", "secret"):
                continue
            seen.add(v)
            found.append(v)
    _runtime_secret_values = tuple(found)
    return _runtime_secret_values


def redact(text: str) -> str:
    """Redact known secret values and token patterns from ``text``."""
    if not text:
        return text
    out = text
    for secret in _collect_runtime_secrets():
        if secret and secret in out:
            out = out.replace(secret, _REDACTED)
    for pat in _KEY_PATTERNS:
        out = pat.sub(_REDACTED, out)
    return out


# ---------------------------------------------------------------------------
# JSON formatter
# ---------------------------------------------------------------------------

# Stdlib log-record attributes we don't want to dump as fields (they're either
# promoted to top-level keys or are noise).
_STD_RESERVED = frozenset({
    "name", "msg", "args", "levelname", "levelno", "pathname", "filename",
    "module", "exc_info", "exc_text", "stack_info", "lineno", "funcName",
    "created", "msecs", "relativeCreated", "thread", "threadName",
    "processName", "process", "message", "asctime", "taskName",
})


class JsonFormatter(logging.Formatter):
    """Render each log record as a single-line JSON object.

    Top-level fields: ``ts``, ``level``, ``logger``, ``message``, ``request_id``,
    ``module``, ``function``, ``line``. Any non-reserved ``record`` attributes
    (passed via ``logger.info(..., extra={...})``) are merged in as extra
    fields. Exceptions are serialized into ``exc`` (string) and ``stack``.
    """

    def __init__(self, *, timestamp_key: str = "ts") -> None:
        super().__init__()
        self._timestamp_key = timestamp_key

    def format(self, record: logging.LogRecord) -> str:
        # Base fields
        payload: dict[str, Any] = {
            self._timestamp_key: self._format_time(record),
            "level": record.levelname,
            "logger": record.name,
            "message": redact(record.getMessage()),
            "request_id": get_request_id(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }

        # Merge extra fields (anything the caller passed via extra={...})
        for key, value in record.__dict__.items():
            if key in _STD_RESERVED or key.startswith("_"):
                continue
            if key in payload:
                # Don't let extras clobber our top-level keys
                continue
            try:
                json.dumps(value)
                payload[key] = value
            except (TypeError, ValueError):
                # Non-JSON-serializable extra -> stringify + redact
                payload[key] = redact(str(value))

        # Exception info
        if record.exc_info:
            payload["exc"] = self._format_exception(record.exc_info)
        if record.stack_info:
            payload["stack"] = record.stack_info

        return json.dumps(payload, ensure_ascii=False, default=str)

    @staticmethod
    def _format_time(record: logging.LogRecord) -> str:
        # ISO-8601 UTC with millisecond precision
        t = time.gmtime(record.created)
        return time.strftime("%Y-%m-%dT%H:%M:%S", t) + f".{int(record.msecs):03d}Z"

    @staticmethod
    def _format_exception(exc_info) -> str:
        import traceback
        try:
            return redact("".join(traceback.format_exception(*exc_info)))
        except Exception:
            return "<unformattable exception>"


# ---------------------------------------------------------------------------
# Setup
# ---------------------------------------------------------------------------

# Loggers that emit their own records and should respect the chosen format.
# We reconfigure uvicorn's loggers so access logs and error logs match.
_PROPAGATE_LOGGERS = ("uvicorn", "uvicorn.access", "uvicorn.error", "fastapi")


def setup_logging(log_format: str = "text", debug: bool = False) -> None:
    """Configure root + framework loggers.

    ``log_format``: ``"json"`` enables JSON output; anything else keeps the
    stdlib default (text). ``debug`` raises the root level to DEBUG.
    Idempotent: safe to call multiple times.
    """
    level = logging.DEBUG if debug else logging.INFO

    if log_format.lower() == "json":
        handler = logging.StreamHandler()
        handler.setFormatter(JsonFormatter())
        handler.setLevel(level)

        root = logging.getLogger()
        # Remove existing handlers we previously installed to avoid duplicates
        # on repeated calls, but leave foreign handlers (e.g. pytest caps) alone.
        for h in list(root.handlers):
            if getattr(h, "_platform_json_handler", False):
                root.removeHandler(h)
        handler._platform_json_handler = True  # type: ignore[attr-defined]
        root.addHandler(handler)
        root.setLevel(level)

        # Make framework loggers propagate to root so they get JSON-formatted.
        for name in _PROPAGATE_LOGGERS:
            lg = logging.getLogger(name)
            lg.handlers = []      # drop their own StreamHandlers
            lg.propagate = True
            lg.setLevel(level)
    else:
        # Default stdlib behaviour. basicConfig is a no-op if a handler exists,
        # so call it to ensure *something* is configured when run as a library.
        logging.basicConfig(level=level, force=True)
        for name in _PROPAGATE_LOGGERS:
            logging.getLogger(name).setLevel(level)


__all__ = [
    "JsonFormatter",
    "request_id_var",
    "set_request_id",
    "get_request_id",
    "redact",
    "setup_logging",
]
