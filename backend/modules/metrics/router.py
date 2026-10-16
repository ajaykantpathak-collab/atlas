#!/usr/bin/env python3
"""backend/modules/metrics/router.py — GET /metrics (Prometheus text format).

Dependency-free: the body is rendered by
backend/modules/metrics/middleware.py:render_exposition and served as
``text/plain; version=0.0.4; charset=utf-8`` — scrapeable by Prometheus,
VictoriaMetrics, or plain curl.  No prometheus_client requirement.

Install (exact — coordinator applies in backend/main.py, see
deploy/patches/worker_service.md):

    # 1. import (next to the other router imports)
    from backend.modules.metrics.router import router as metrics_router
    from backend.modules.metrics.middleware import install_metrics_middleware

    # 2. mount the route (next to app.include_router(...))
    app.include_router(metrics_router)

    # 3. register the middleware AFTER the two rate limiters so the
    #    metrics middleware sits OUTSIDE them and 429s get counted
    #    (Starlette: last-added middleware runs first)
    install_metrics_middleware(app)

Auth (lane-B audit, 2026-10-15): the endpoint was publicly scrapeable on
:80 through the nginx internal-range allowlist (loopback is allowed, so
any local process — and any SSRF — could read handler names + status
counts: free recon surface).  It is now token-gated:

    METRICS_TOKEN unset or blank  -> 404 (endpoint disabled entirely)
    METRICS_TOKEN set             -> requires "Authorization: Bearer
                                     <token>"; anything else is 401

The env var is read per-request so ops can rotate it without a rebuild.
It is exempt from the rate limiter (_EXEMPT_PREFIXES in observability.py)
so scraping can never trip it.  Scrapers that need it must carry the
token; there is no Prometheus consumer in docker-compose.prod.yml today.
"""
from __future__ import annotations

import os
import secrets

from fastapi import APIRouter, HTTPException, Request, Response

from backend.modules.metrics.middleware import render_exposition

router = APIRouter(tags=["metrics"])

#: Prometheus text format v0.0.4 (the widely-scraped classic format)
METRICS_CONTENT_TYPE = "text/plain; version=0.0.4; charset=utf-8"


def _require_metrics_token(request: Request) -> None:
    """Bearer-token gate for /metrics.  No token configured -> the route
    is disabled (404, indistinguishable from an unmounted path); a
    configured token -> constant-time Bearer match or 401."""
    token = (os.environ.get("METRICS_TOKEN") or "").strip()
    if not token:
        raise HTTPException(status_code=404, detail="Not found")
    auth = request.headers.get("authorization", "")
    expected = f"Bearer {token}"
    if not secrets.compare_digest(auth.encode(), expected.encode()):
        raise HTTPException(
            status_code=401, detail="metrics token required")


@router.get("/metrics", include_in_schema=False)
def metrics(request: Request) -> Response:
    """Serve the exposition.  Everything is wrapped fail-open: a broken
    optional series (psutil, jobs table) degrades to fewer lines, never a
    500 — scrape targets must stay green."""
    _require_metrics_token(request)
    body = render_exposition()
    return Response(content=body, media_type=METRICS_CONTENT_TYPE)
