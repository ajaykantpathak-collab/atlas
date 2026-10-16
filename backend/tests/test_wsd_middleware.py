# -*- coding: utf-8 -*-
"""WS-D middleware hardening tests (rate limits, headers, CORS, 2026-10-10).

Builds a SMALL Starlette app with exactly the middlewares main.py mounts
(no DB, no solver imports) and drives it with TestClient:

  * RateLimiterMiddleware — 429 + Retry-After on the login bucket and the
    expensive buckets; /api/health exempt; 429 carries the CORS echo.
  * SecurityHeadersMiddleware — nosniff / frame-deny / referrer-policy /
    permissions-policy / CSP on API paths, CSP skipped on /docs.
  * CORS — allowed origin echoed on preflight, foreign origin gets no
    allow-origin; wildcard origins are rejected at configuration time.
"""

from __future__ import annotations

import importlib

import pytest
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.testclient import TestClient

from backend.middleware import rate_limiter
from backend.middleware.rate_limiter import RateLimiterMiddleware
from backend.middleware.security_headers import (
    SecurityHeadersMiddleware,
    cors_middleware_kwargs,
)


@pytest.fixture()
def limiter_state_reset():
    rate_limiter._windows.clear()
    rate_limiter._expensive_windows.clear()
    rate_limiter._auth_windows.clear()
    yield
    rate_limiter._windows.clear()
    rate_limiter._expensive_windows.clear()
    rate_limiter._auth_windows.clear()


def _build_app() -> FastAPI:
    rate_limiter.configure_cors_origins(["https://app.example.com"])
    app = FastAPI()
    app.add_middleware(SecurityHeadersMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["https://app.example.com"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(RateLimiterMiddleware)

    @app.get("/api/health")
    async def health():
        return {"ok": True}

    @app.post("/api/auth/login")
    async def login():
        return {"token": "x"}

    @app.post("/api/intelligence/solve")
    async def intel_solve():
        return {"answer": 1}

    @app.get("/api/practice/deterministic/library")
    async def det_lib():
        return {"items": []}

    @app.get("/docs")
    async def docs():
        return {"docs": True}

    return app


# ---------------------------------------------------------------------------
# Rate limiting
# ---------------------------------------------------------------------------


def test_login_bucket_returns_429_with_retry_after(limiter_state_reset):
    client = TestClient(_build_app())
    codes = [client.post("/api/auth/login").status_code for _ in range(12)]
    assert codes[-1] == 429, f"login brute-force bucket did not trip: {codes}"
    assert 200 in codes
    resp = client.post("/api/auth/login")
    assert resp.status_code == 429
    assert "retry-after" in {k.lower() for k in resp.headers}


def test_expensive_bucket_covers_intelligence_solve(limiter_state_reset):
    client = TestClient(_build_app())
    codes = [client.post("/api/intelligence/solve").status_code for _ in range(25)]
    assert codes[-1] == 429, "unauthenticated solver burst was not throttled"


def test_deterministic_family_stays_throttled(limiter_state_reset):
    client = TestClient(_build_app())
    codes = [
        client.get("/api/practice/deterministic/library").status_code
        for _ in range(25)
    ]
    assert codes[-1] == 429


def test_health_is_never_limited(limiter_state_reset):
    client = TestClient(_build_app())
    codes = [client.get("/api/health").status_code for _ in range(300)]
    assert all(c == 200 for c in codes)


def test_429_carries_cors_echo_for_allowed_origin(limiter_state_reset):
    client = TestClient(_build_app())
    for _ in range(12):
        client.post("/api/auth/login",
                    headers={"Origin": "https://app.example.com"})
    resp = client.post("/api/auth/login",
                       headers={"Origin": "https://app.example.com"})
    assert resp.status_code == 429
    assert resp.headers.get("access-control-allow-origin") == "https://app.example.com"


def test_429_no_cors_echo_for_foreign_origin(limiter_state_reset):
    client = TestClient(_build_app())
    for _ in range(12):
        client.post("/api/auth/login", headers={"Origin": "https://evil.example"})
    resp = client.post("/api/auth/login", headers={"Origin": "https://evil.example"})
    assert resp.status_code == 429
    assert resp.headers.get("access-control-allow-origin") is None


def test_rate_limit_headers_on_success(limiter_state_reset):
    client = TestClient(_build_app())
    resp = client.post("/api/auth/login")
    assert resp.status_code == 200
    assert resp.headers.get("x-ratelimit-limit") is not None


# ---------------------------------------------------------------------------
# Security headers
# ---------------------------------------------------------------------------


def test_security_headers_present_on_api_responses():
    client = TestClient(_build_app())
    resp = client.get("/api/health")
    assert resp.headers.get("x-content-type-options") == "nosniff"
    assert resp.headers.get("x-frame-options") == "DENY"
    assert resp.headers.get("referrer-policy") == "strict-origin-when-cross-origin"
    assert resp.headers.get("permissions-policy") is not None
    assert "default-src 'none'" in resp.headers.get("content-security-policy", "")


def test_csp_skipped_for_docs_surface():
    client = TestClient(_build_app())
    resp = client.get("/docs")
    assert resp.headers.get("content-security-policy") is None or \
        "default-src" not in resp.headers.get("content-security-policy", "")
    # the unconditional headers still apply
    assert resp.headers.get("x-content-type-options") == "nosniff"


def test_server_header_does_not_leak_uvicorn():
    client = TestClient(_build_app())
    resp = client.get("/api/health")
    assert "uvicorn" not in (resp.headers.get("server") or "").lower()


def test_existing_headers_not_clobbered():
    app = FastAPI()
    app.add_middleware(SecurityHeadersMiddleware)

    @app.get("/api/thing")
    async def thing():
        from fastapi.responses import JSONResponse
        return JSONResponse({"a": 1}, headers={"X-Frame-Options": "SAMEORIGIN"})

    client = TestClient(app)
    resp = client.get("/api/thing")
    assert resp.headers["x-frame-options"] == "SAMEORIGIN"


# ---------------------------------------------------------------------------
# CORS configuration hardening
# ---------------------------------------------------------------------------


def test_cors_kwargs_reject_wildcard_with_credentials():
    with pytest.raises(ValueError):
        cors_middleware_kwargs(["*"], allow_credentials=True)


def test_cors_kwargs_reject_null_origin():
    with pytest.raises(ValueError):
        cors_middleware_kwargs(["null"], allow_credentials=True)


def test_cors_kwargs_accept_explicit_origins():
    kw = cors_middleware_kwargs(["https://app.example.com"], allow_credentials=True)
    assert kw["allow_origins"] == ["https://app.example.com"]
    assert kw["allow_credentials"] is True


def test_preflight_from_allowed_origin_echoed():
    client = TestClient(_build_app())
    resp = client.options(
        "/api/auth/login",
        headers={
            "Origin": "https://app.example.com",
            "Access-Control-Request-Method": "POST",
        },
    )
    assert resp.headers.get("access-control-allow-origin") == "https://app.example.com"
    assert resp.headers.get("access-control-allow-credentials") == "true"


def test_preflight_from_foreign_origin_gets_no_allow():
    client = TestClient(_build_app())
    resp = client.options(
        "/api/auth/login",
        headers={
            "Origin": "https://evil.example",
            "Access-Control-Request-Method": "POST",
        },
    )
    assert resp.headers.get("access-control-allow-origin") is None
