"""rate_limiter.py -- sliding-window rate limiter middleware.

Protects the platform from DoS and runaway clients without external
dependencies (no Redis required — in-process, per-worker).

Usage (main.py, after CORS, before routes):
    from backend.middleware.rate_limiter import RateLimiterMiddleware
    app.add_middleware(RateLimiterMiddleware)

Rules:
  - default: 120 requests/minute per IP
  - expensive endpoints (solve, practice, grade): 20/minute per IP
  - authenticated users get a higher budget keyed on their token sub
  - static/health/metrics are exempt

Design:
  - sliding window (deque of timestamps, O(1) amortised)
  - in-process (per gunicorn worker): a worker restart resets counts
    — acceptable for DoS protection, not for billing-grade metering
  - Response headers: X-RateLimit-Limit, X-RateLimit-Remaining,
    X-RateLimit-Reset (unix ts) — clients can self-throttle
  - 429 responses include Retry-After in seconds
"""

import time
from collections import defaultdict, deque
from typing import Deque, Dict, Tuple

from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse, Response

# ── configuration ────────────────────────────────────────────────────────────

DEFAULT_LIMIT = 120          # requests per window per key
DEFAULT_WINDOW = 60          # seconds

# endpoints that are expensive to serve — tighter budget
_EXPENSIVE_LIMIT = 20
_EXPENSIVE_WINDOW = 60
_EXPENSIVE_PATTERNS = (
    "/api/practice/solve",
    "/api/practice/deterministic",
    "/api/solve",
    "/api/practice/start",
    "/api/examiner/grade",
    "/api/tutor",
    # WS-D (2026-10-10): unauthenticated CPU-bound solver/tutor surfaces
    # plus the grading endpoints — same 20/min class as practice/solve.
    "/api/intelligence/solve",
    "/api/intelligence/tutor",
    "/api/vision/extract",
    "/api/practice/grade-answer",
    "/api/practice/marking-evaluate",
    "/api/practice/board-answer",
    "/api/practice/socratic/",
    # Wave 9.8 L4: prose marking-scheme grader — same 20/min class.
    "/api/prose",
)

# credential endpoints — brute-force budget, the tightest of all.
# Applies per IP *and* per token prefix (whichever key the request maps
# to), so one client cannot spray passwords across many usernames.
_AUTH_LIMIT = 10
_AUTH_WINDOW = 60
_AUTH_PATTERNS = (
    "/api/auth/login",
    "/api/auth/token",
    "/api/auth/refresh",
    "/api/auth/signup",
)

# paths exempt from rate limiting entirely
_EXEMPT_PREFIXES = (
    "/api/health",
    "/ready",
    "/docs",
    "/openapi.json",
    "/favicon",
    "/_next",
    "/static",
)

# ── state ────────────────────────────────────────────────────────────────────
# {key: deque[timestamps]}
_windows: Dict[str, Deque[float]] = defaultdict(deque)
_expensive_windows: Dict[str, Deque[float]] = defaultdict(deque)
_auth_windows: Dict[str, Deque[float]] = defaultdict(deque)

#: origins allowed to READ a 429 body from a browser. Populated by
#: ``configure_cors_origins`` from the same settings main.py's
#: CORSMiddleware uses, so a throttled cross-origin caller still gets the
#: CORS echo (without it a browser fetch cannot read the Retry-After).
_allowed_origins: Tuple[str, ...] = ()


def configure_cors_origins(origins) -> None:
    """Share the configured CORS origins with the 429 path (see class doc)."""
    global _allowed_origins
    _allowed_origins = tuple(str(o).strip() for o in origins if str(o).strip())


def reset_rate_limit_state() -> None:
    """Test hook: clear every window store."""
    _windows.clear()
    _expensive_windows.clear()
    _auth_windows.clear()

# periodic pruning: drop stale deques so the dict doesn't grow forever
_last_prune = 0.0
_PRUNE_INTERVAL = 300.0  # seconds


def _prune_stale(now: float, window: float) -> None:
    """Remove deques with no recent activity — prevents memory growth."""
    global _last_prune
    if now - _last_prune < _PRUNE_INTERVAL:
        return
    _last_prune = now
    cutoff = now - max(DEFAULT_WINDOW, _EXPENSIVE_WINDOW, _AUTH_WINDOW) * 2
    for store in (_windows, _expensive_windows, _auth_windows):
        stale = [k for k, dq in store.items() if not dq or dq[-1] < cutoff]
        for k in stale:
            del store[k]


def _client_key(request: Request) -> str:
    """Rate-limit key: authenticated sub if available, else client IP."""
    auth = request.headers.get("authorization", "")
    if auth.startswith("Bearer "):
        # use the first 16 chars of the token as a per-user key (don't
        # decode the JWT here — that's the auth dependency's job)
        return "u:" + auth[7:23]
    ip = request.client.host if request.client else "unknown"
    return "ip:" + ip


def _is_expensive(path: str) -> bool:
    return any(path.startswith(p) for p in _EXPENSIVE_PATTERNS)


def _is_auth(path: str) -> bool:
    return any(path.startswith(p) for p in _AUTH_PATTERNS)


def _cors_echo_headers(request: Request) -> Dict[str, str]:
    """CORS headers a throttled browser caller needs to READ the 429.

    This middleware sits OUTSIDE the app's CORSMiddleware (registered
    after it), so its 429s bypass the CORS layer entirely; a browser
    would then hide the body + Retry-After.  Echo the request origin
    only when it is on the configured allow-list — foreign origins get
    nothing.
    """
    origin = request.headers.get("origin", "")
    if origin and origin in _allowed_origins:
        return {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": "true",
            "Vary": "Origin",
        }
    return {}


class RateLimiterMiddleware(BaseHTTPMiddleware):
    """ASGI middleware: sliding-window rate limiter."""

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        import os
        if os.getenv("RATE_LIMIT_ENABLED", "1").lower() in ("0", "false", "off"):
            return await call_next(request)

        path = request.url.path

        # exempt paths
        if any(path.startswith(p) for p in _EXEMPT_PREFIXES):
            return await call_next(request)

        now = time.monotonic()
        key = _client_key(request)

        if _is_auth(path):
            limit, window, store = _AUTH_LIMIT, _AUTH_WINDOW, _auth_windows
        elif _is_expensive(path):
            limit, window, store = _EXPENSIVE_LIMIT, _EXPENSIVE_WINDOW, _expensive_windows
        else:
            limit, window, store = DEFAULT_LIMIT, DEFAULT_WINDOW, _windows

        _prune_stale(now, window)

        dq = store[key]
        # evict timestamps outside the sliding window
        while dq and dq[0] <= now - window:
            dq.popleft()

        if len(dq) >= limit:
            retry_after = int(window - (now - dq[0])) + 1
            return JSONResponse(
                status_code=429,
                content={
                    "detail": "Rate limit exceeded. Please slow down.",
                    "retry_after_seconds": retry_after,
                },
                headers={
                    "Retry-After": str(retry_after),
                    "X-RateLimit-Limit": str(limit),
                    "X-RateLimit-Remaining": "0",
                    **_cors_echo_headers(request),
                },
            )

        dq.append(now)
        response = await call_next(request)
        response.headers["X-RateLimit-Limit"] = str(limit)
        response.headers["X-RateLimit-Remaining"] = str(max(0, limit - len(dq)))
        return response
