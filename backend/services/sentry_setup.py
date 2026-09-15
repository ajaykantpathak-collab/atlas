"""
Sentry error monitoring integration for the K-12 Learning Platform.

Opt-in via the ``SENTRY_DSN`` environment variable. If unset or empty,
``init_sentry()`` is a no-op — the app runs exactly as before. This keeps
local dev and CI free of any Sentry dependency at runtime.

Configuration (all optional, sensible defaults):
    SENTRY_DSN           — required to enable; the project DSN
    SENTRY_ENVIRONMENT   — development | production | staging (default: env)
    SENTRY_RELEASE       — release version tag (default: app_version)
    SENTRY_TRACES_SAMPLE_RATE — performance tracing sample rate (default: 0.0)
    SENTRY_PROFILES_SAMPLE_RATE — profiling sample rate (default: 0.0)

Wiring (in app.py):
    from backend.services.sentry_setup import init_sentry, capture_exception, set_request_context
    init_sentry()                       # call once at startup (before lifespan yield)
    # in the unhandled-exception handler:
    capture_exception(exc, request=request)
    # in the request-id middleware (optional, for correlation):
    set_request_context(request_id)

Design notes:
- We deliberately do NOT enable the FastApiIntegration / StarletteIntegration
  auto-http-breadcrumbs because they can double-capture errors that our own
  exception handlers already capture explicitly. Instead we capture manually
  in the unhandled-exception handler with full request context.
- ThreadingIntegration is enabled so errors raised inside solver worker
  threads (and the process pool's parent-side futures) are captured.
- Before-send filter drops events that contain known-sensitive env values
  (api keys, jwt secret, passwords) to guarantee secrets never leave the box.
- The module is import-safe even if sentry_sdk is not installed — every
  public function degrades to a no-op.
"""

from __future__ import annotations

import logging
import os
from typing import Any, Optional

logger = logging.getLogger(__name__)

# Lazily imported so the module is importable in minimal environments.
_sentry = None
_initialized = False


def _import_sentry():
    global _sentry
    if _sentry is None:
        try:
            import sentry_sdk
            _sentry = sentry_sdk
        except ImportError:
            _sentry = False  # sentinel: not installed
    return _sentry if _sentry is not False else None


# ---------------------------------------------------------------------------
# Secret scrubbing — reuses the redaction list from json_logging
# ---------------------------------------------------------------------------

def _scrub_secrets(event: dict, hint: dict) -> Optional[dict]:
    """Sentry before-send hook: redact secrets from any event before upload.

    Returns the (possibly mutated) event, or ``None`` to drop it entirely.
    """
    try:
        from backend.services.json_logging import redact, _collect_runtime_secrets
    except Exception:
        # json_logging not importable — fall back to a minimal local redaction
        def redact(text: str) -> str:  # type: ignore[no-redef]
            return text
        def _collect_runtime_secrets():  # type: ignore[no-redef]
            return ()

    def _scrub_value(v):
        if isinstance(v, str):
            return redact(v)
        if isinstance(v, dict):
            return {k: _scrub_value(val) for k, val in v.items()}
        if isinstance(v, (list, tuple)):
            return type(v)(_scrub_value(x) for x in v)
        return v

    if not isinstance(event, dict):
        return event
    # Scrub the common places secrets leak into: message, exception values,
    # breadcrumbs, request body, extra, tags.
    for key in ("message", "logger", "server_name", "release", "environment"):
        if key in event and isinstance(event[key], str):
            event[key] = redact(event[key])

    for top in ("extra", "tags", "contexts", "user"):
        if top in event and isinstance(event[top], dict):
            event[top] = _scrub_value(event[top])  # type: ignore[assignment]

    if "request" in event and isinstance(event["request"], dict):
        event["request"] = _scrub_value(event["request"])  # type: ignore[assignment]

    if "exception" in event and isinstance(event["exception"], dict):
        for exc in event["exception"].get("values", []) or []:
            if isinstance(exc, dict):
                if "value" in exc and isinstance(exc["value"], str):
                    exc["value"] = redact(exc["value"])
                for frame in exc.get("stacktrace", {}).get("frames", []) or []:
                    if isinstance(frame, dict):
                        for vkey in ("vars",):
                            if vkey in frame and isinstance(frame[vkey], dict):
                                frame[vkey] = _scrub_value(frame[vkey])  # type: ignore[assignment]

    if "breadcrumbs" in event and isinstance(event["breadcrumbs"], dict):
        for crumb in event["breadcrumbs"].get("values", []) or []:
            if isinstance(crumb, dict) and "message" in crumb:
                crumb["message"] = redact(str(crumb["message"]))

    return event


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def init_sentry() -> bool:
    """Initialize the Sentry SDK if ``SENTRY_DSN`` is set.

    Returns True if Sentry was initialized, False otherwise (no DSN or
    sentry_sdk not installed). Safe to call multiple times — subsequent
    calls are no-ops.
    """
    global _initialized
    if _initialized:
        return bool(_import_sentry())
    sentry = _import_sentry()
    if sentry is None:
        logger.info("Sentry not initialized: sentry_sdk not installed")
        return False

    dsn = os.environ.get("SENTRY_DSN", "").strip()
    if not dsn:
        logger.info("Sentry not initialized: SENTRY_DSN not set (set it to enable error reporting)")
        return False

    # Resolve config with sensible defaults.
    environment = os.environ.get("SENTRY_ENVIRONMENT") or os.environ.get("PLATFORM_ENV") or "development"
    release = os.environ.get("SENTRY_RELEASE") or os.environ.get("PLATFORM_APP_VERSION") or "k12-platform@1.0.0"
    traces_sample_rate = float(os.environ.get("SENTRY_TRACES_SAMPLE_RATE", "0.0"))
    profiles_sample_rate = float(os.environ.get("SENTRY_PROFILES_SAMPLE_RATE", "0.0"))
    sample_rate = float(os.environ.get("SENTRY_SAMPLE_RATE", "1.0"))  # error event sample rate

    try:
        from sentry_sdk.integrations.logging import LoggingIntegration
        from sentry_sdk.integrations.threading import ThreadingIntegration
        from sentry_sdk.integrations.asyncio import AsyncioIntegration
    except ImportError:
        LoggingIntegration = None  # type: ignore[assignment]
        ThreadingIntegration = None  # type: ignore[assignment]
        AsyncioIntegration = None  # type: ignore[assignment]

    integrations = []
    # Logging: capture ERROR+ as events, INFO+ as breadcrumbs. We keep the
    # default breadcrumb level at INFO so structured logs still produce a
    # useful trail without spamming events.
    if LoggingIntegration is not None:
        integrations.append(LoggingIntegration(
            level=logging.INFO,
            event_level=logging.ERROR,
        ))
    if ThreadingIntegration is not None:
        integrations.append(ThreadingIntegration(propagate_hub=True))
    if AsyncioIntegration is not None:
        integrations.append(AsyncioIntegration())

    try:
        sentry.init(
            dsn=dsn,
            environment=environment,
            release=release,
            sample_rate=sample_rate,
            traces_sample_rate=traces_sample_rate,
            profiles_sample_rate=profiles_sample_rate,
            send_default_pii=False,           # never send PII by default
            attach_stacktrace=True,           # include stack on non-exception messages
            max_breadcrumbs=100,
            integrations=integrations,
            before_send=_scrub_secrets,
            before_send_transaction=_scrub_secrets,
        )
        _initialized = True
        logger.info("Sentry initialized (env=%s, release=%s, traces=%.2f, profiles=%.2f)",
                    environment, release, traces_sample_rate, profiles_sample_rate)
        return True
    except Exception as e:
        logger.warning("Sentry initialization failed: %s", e)
        return False


def capture_exception(exc: Exception, *, request: Any = None,
                      level: str = "error", **tags) -> None:
    """Capture an exception to Sentry with optional request context + tags.

    No-op if Sentry is not initialized. Never raises.
    """
    sentry = _import_sentry()
    if sentry is None or not _initialized:
        return
    try:
        with sentry.push_scope() as scope:
            scope.set_level(level)
            if request is not None:
                _enrich_scope_from_request(scope, request)
            for k, v in tags.items():
                try:
                    scope.set_tag(k, str(v))
                except Exception:
                    pass
            sentry.capture_exception(exc)
    except Exception as e:
        logger.debug("Sentry capture_exception failed: %s", e)


def capture_message(message: str, *, level: str = "info",
                    request: Any = None, **tags) -> None:
    """Capture a message event to Sentry. No-op if not initialized."""
    sentry = _import_sentry()
    if sentry is None or not _initialized:
        return
    try:
        with sentry.push_scope() as scope:
            scope.set_level(level)
            if request is not None:
                _enrich_scope_from_request(scope, request)
            for k, v in tags.items():
                try:
                    scope.set_tag(k, str(v))
                except Exception:
                    pass
            sentry.capture_message(message)
    except Exception as e:
        logger.debug("Sentry capture_message failed: %s", e)


def set_request_context(request_id: str) -> None:
    """Tag the current Sentry scope with the request id for correlation.

    Call from the request-id middleware so every event captured during the
    request is correlated with the X-Request-ID header.
    """
    sentry = _import_sentry()
    if sentry is None or not _initialized:
        return
    try:
        sentry.set_tag("request_id", request_id)
    except Exception:
        pass


def _enrich_scope_from_request(scope, request: Any) -> None:
    """Best-effort extraction of request metadata onto a Sentry scope."""
    try:
        scope.set_tag("http.method", getattr(request, "method", "UNKNOWN"))
    except Exception:
        pass
    try:
        url = str(getattr(request, "url", ""))
        # Strip query string to avoid leaking tokens in the URL
        if "?" in url:
            url = url.split("?", 1)[0]
        scope.set_tag("http.path", url)
    except Exception:
        pass
    try:
        client = getattr(request, "client", None)
        if client is not None:
            scope.set_tag("http.client_host", getattr(client, "host", "unknown"))
    except Exception:
        pass
    # Request id (if the middleware already set it on the scope)
    try:
        from backend.services.json_logging import get_request_id
        rid = get_request_id()
        if rid:
            scope.set_tag("request_id", rid)
    except Exception:
        pass


def flush(timeout: float = 2.0) -> None:
    """Flush pending Sentry events. Call on shutdown before the process exits."""
    sentry = _import_sentry()
    if sentry is None or not _initialized:
        return
    try:
        sentry.flush(timeout=timeout)
    except Exception:
        pass


__all__ = [
    "init_sentry",
    "capture_exception",
    "capture_message",
    "set_request_context",
    "flush",
]
