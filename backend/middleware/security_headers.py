"""security_headers.py -- security-response-header middleware + CORS config
guard (WS-D hardening, 2026-10-10).

Two exports:

  * ``SecurityHeadersMiddleware`` -- adds the standard hardening headers
    to every HTTP response (never clobbering a header the app already
    set): X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
    Permissions-Policy, Cross-Origin-Opener-Policy, a strict CSP for API
    responses, and a scrubbed ``Server`` token.  The interactive docs
    surfaces (/docs, /redoc, /openapi.json -- non-production only) are
    exempted from the CSP because their page legitimately loads scripts.

  * ``cors_middleware_kwargs`` -- builds the CORSMiddleware kwargs and
    FAILS CLOSED on configurations that are dangerous with
    ``allow_credentials=True``: a ``*`` origin (any site reads
    authenticated responses) and the string ``null`` (sandboxed iframe /
    redirect-chain origin forgery).

The API never serves the frontend (nginx does), so the strict CSP is
safe for JSON; nothing here affects the Next.js app's own CSP.
"""

from __future__ import annotations

from typing import Any, Iterable

from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response

#: paths that legitimately execute scripts (FastAPI's built-in docs UI;
#: production disables them entirely in main.py -- belt and braces here).
_CSP_EXEMPT_PREFIXES = ("/docs", "/redoc", "/openapi.json")

_CSP_API = "default-src 'none'; frame-ancestors 'none'; base-uri 'none'"

_PERMISSIONS_POLICY = "camera=(), microphone=(), geolocation=(), payment=()"

#: Hide the server implementation banner.
_SERVER_TOKEN = "atlas"


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Attach security headers to every HTTP response."""

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        response = await call_next(request)
        headers = response.headers

        headers.setdefault("X-Content-Type-Options", "nosniff")
        headers.setdefault("X-Frame-Options", "DENY")
        headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        headers.setdefault("Permissions-Policy", _PERMISSIONS_POLICY)
        headers.setdefault("Cross-Origin-Opener-Policy", "same-origin")
        path = request.url.path
        if not any(path.startswith(p) for p in _CSP_EXEMPT_PREFIXES):
            headers.setdefault("Content-Security-Policy", _CSP_API)
        # uvicorn stamps its own banner when the header is absent; replace
        # it rather than advertise the server stack.
        headers["Server"] = _SERVER_TOKEN
        return response


def cors_middleware_kwargs(
    allow_origins: Iterable[str],
    *,
    allow_credentials: bool = True,
    allow_methods: Iterable[str] = ("*",),
    allow_headers: Iterable[str] = ("*",),
) -> dict[str, Any]:
    """Validate + normalise CORSMiddleware kwargs.

    Raises ``ValueError`` (fail-closed, at boot) when the configuration
    would let arbitrary origins read credentialed responses.
    """
    origins = [str(o).strip() for o in allow_origins if str(o).strip()]
    lowered = {o.lower() for o in origins}
    if "*" in lowered:
        raise ValueError(
            "CORS wildcard origin ('*') is forbidden: allow_credentials=True "
            "would expose authenticated responses to every origin. List the "
            "exact origins in CORS_ORIGINS instead."
        )
    if "null" in lowered:
        raise ValueError(
            "CORS origin 'null' is forbidden: it is forgeable via sandboxed "
            "iframes and redirect chains. List the exact origins instead."
        )
    # An empty list is the most locked-down configuration (same-origin
    # only) -- valid, not an error.
    return {
        "allow_origins": origins,
        "allow_credentials": bool(allow_credentials),
        "allow_methods": list(allow_methods),
        "allow_headers": list(allow_headers),
    }
