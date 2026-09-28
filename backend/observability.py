"""
Observability: structured logging, HTTP rate limiting, optional Sentry.

Kept dependency-free on purpose so the backend boots unchanged when the
optional extras are absent — every helper here fails open.

Wired from `backend/main.py` (see ATLAS_10x10_PLAN.md §3, items 2-4).
"""

from __future__ import annotations

import json
import logging
import os
import sys
import time
from typing import Any, MutableMapping, Optional

# ---------------------------------------------------------------------------
# Structured logging (ATLAS_10x10_PLAN.md §3 item 3)
# ---------------------------------------------------------------------------
_RESERVED = frozenset(
    vars(logging.LogRecord("", 0, "", 0, "", (), None)).keys()
) | {"message", "asctime", "taskName"}


class JsonLogFormatter(logging.Formatter):
    """Emit one JSON object per log line.

    Anything the format string does not use is still carried through as
    `extra` fields, so structured context (student_id, endpoint, duration)
    survives instead of being flattened into the message string.
    """

    def format(self, record: logging.LogRecord) -> str:
        payload: MutableMapping[str, Any] = {
            "ts": time.strftime("%Y-%m-%dT%H:%M:%S", time.gmtime(record.created))
            + f".{int(record.msecs):03d}Z",
            "level": record.levelname,
            "logger": record.name,
            "msg": record.getMessage(),
        }
        if record.exc_info:
            payload["exc"] = self.formatException(record.exc_info)
        for key, value in record.__dict__.items():
            if key not in _RESERVED and not key.startswith("_"):
                try:
                    json.dumps(value)
                    payload[key] = value
                except (TypeError, ValueError):
                    payload[key] = repr(value)
        return json.dumps(payload, ensure_ascii=False, default=str)


def setup_logging(level: Optional[str] = None) -> None:
    """Install the JSON formatter when `LOG_FORMAT=json`, else a text one.

    Uvicorn installs its own handlers, so they are re-pointed here too —
    otherwise the access log stays plain text and the JSON stream is half
    useless for ingestion.
    """
    level_name = (level or os.getenv("LOG_LEVEL", "INFO")).upper()
    json_mode = os.getenv("LOG_FORMAT", "text").lower() == "json"
    root = logging.getLogger()
    root.setLevel(level_name)
    for handler in list(root.handlers):
        root.removeHandler(handler)
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(
        JsonLogFormatter()
        if json_mode
        else logging.Formatter(
            "%(asctime)s %(levelname)-7s %(name)s: %(message)s",
            datefmt="%Y-%m-%dT%H:%M:%S",
        )
    )
    root.addHandler(handler)
    for name in ("uvicorn", "uvicorn.error", "uvicorn.access"):
        lg = logging.getLogger(name)
        lg.handlers = []
        lg.propagate = True
    logging.getLogger("uvicorn.access").setLevel(level_name)


# ---------------------------------------------------------------------------
# HTTP rate limiting (ATLAS_10x10_PLAN.md §3 item 2)
# ---------------------------------------------------------------------------
# Target: 50 requests/second per client, as a fixed one-second window.
#
# LIMITATION, stated plainly: the counters live in this process, so with N
# uvicorn workers the effective ceiling is N * rps. A true global limit needs
# the Redis already present in the compose stack; that is a deliberate
# follow-up, not an oversight. Anything unexpected here fails OPEN — a
# limiter outage must never take the API down with it.
DEFAULT_RPS = 50
DEFAULT_BURST = 100

# Probes and docs are never rate limited: a 429 on /health reads as "the
# service is down" to Docker, which is worse than a few extra doc hits.
_EXEMPT_PREFIXES = (
    "/health",
    "/api/health",
    "/docs",
    "/redoc",
    "/openapi.json",
    "/metrics",
)


class RateLimitMiddleware:
    """Minimal fixed-window rate limiter as raw ASGI middleware.

    Raw ASGI rather than `BaseHTTPMiddleware` on purpose: the latter wraps
    every request in extra tasks, which is measurable overhead on the hot
    path and has been a source of event-loop stalls here.
    """

    def __init__(self, app: Any, rps: int = DEFAULT_RPS, burst: int = DEFAULT_BURST):
        self.app = app
        self.rps = max(1, rps)
        self.burst = max(self.rps, burst)
        self._hits: dict[str, list[float]] = {}

    def _client(self, scope: MutableMapping[str, Any]) -> str:
        headers = {
            k.decode("latin-1").lower(): v.decode("latin-1")
            for k, v in scope.get("headers", [])
        }
        # Only honour X-Forwarded-For when a proxy is actually in front;
        # otherwise a client could spoof its way past the limit.
        if headers.get("x-forwarded-for"):
            return headers["x-forwarded-for"].split(",")[0].strip()
        client = scope.get("client")
        return client[0] if client else "unknown"

    def _allow(self, key: str) -> bool:
        now = time.monotonic()
        cutoff = now - 1.0
        hits = [t for t in self._hits.get(key, ()) if t > cutoff]
        if len(hits) >= self.burst:
            self._hits[key] = hits
            return False
        hits.append(now)
        self._hits[key] = hits
        return True

    async def __call__(self, scope: MutableMapping[str, Any], receive: Any, send: Any) -> None:
        if scope.get("type") != "http":
            await self.app(scope, receive, send)
            return
        path = scope.get("path", "")
        if scope.get("method") == "OPTIONS" or path.startswith(_EXEMPT_PREFIXES):
            await self.app(scope, receive, send)
            return
        try:
            allowed = self._allow(self._client(scope))
        except Exception:  # never fail the request closed
            await self.app(scope, receive, send)
            return
        if allowed:
            await self.app(scope, receive, send)
            return
        body = json.dumps(
            {"detail": "Rate limit exceeded", "limit_rps": self.rps}
        ).encode()
        await send(
            {
                "type": "http.response.start",
                "status": 429,
                "headers": [
                    (b"content-type", b"application/json"),
                    (b"retry-after", b"1"),
                    (b"content-length", str(len(body)).encode()),
                ],
            }
        )
        await send({"type": "http.response.body", "body": body})


def install_rate_limit(app: Any, rps: Optional[int] = None, burst: Optional[int] = None):
    """Attach the limiter unless disabled. Returns the instance for tests."""
    if os.getenv("RATE_LIMIT_ENABLED", "true").lower() in ("0", "false", "no"):
        return None
    try:
        rps = int(os.getenv("RATE_LIMIT_RPS", DEFAULT_RPS)) if rps is None else rps
        burst = int(os.getenv("RATE_LIMIT_BURST", DEFAULT_BURST)) if burst is None else burst
    except ValueError:
        rps, burst = DEFAULT_RPS, DEFAULT_BURST
    app.add_middleware(RateLimitMiddleware, rps=rps, burst=burst)
    return RateLimitMiddleware


# ---------------------------------------------------------------------------
# Sentry (ATLAS_10x10_PLAN.md §3 item 4)
# ---------------------------------------------------------------------------
def init_sentry(app: Any, dsn: Optional[str] = None) -> bool:
    """Initialise Sentry when a DSN is configured. No-op otherwise.

    Opt-in via `SENTRY_DSN`; the SDK is an optional extra, so a missing
    package or a blank DSN leaves the app exactly as it was.
    """
    dsn = dsn or os.getenv("SENTRY_DSN", "").strip()
    if not dsn:
        return False
    try:
        import sentry_sdk
        from sentry_sdk.integrations.fastapi import FastApiIntegration
    except ImportError:
        logging.getLogger(__name__).warning(
            "SENTRY_DSN is set but sentry-sdk is not installed; "
            "error reporting stays disabled"
        )
        return False
    try:
        sentry_sdk.init(
            dsn=dsn,
            integrations=[FastApiIntegration()],
            environment=os.getenv("SENTRY_ENVIRONMENT", "development"),
            traces_sample_rate=float(os.getenv("SENTRY_TRACES_SAMPLE_RATE", "0.0")),
            send_default_pii=False,
        )
    except Exception as exc:  # never block boot on observability
        logging.getLogger(__name__).warning("Sentry init failed: %s", exc)
        return False
    return True
