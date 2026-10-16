# -*- coding: utf-8 -*-
"""tests/test_fixf1_unauth_401.py — LAUNCH-FIX-F1 (batch fix_2026_10_15).

The audit (laneB/unauth_probe.json) found five routes returning 200 with
NO Authorization header — guest/empty fallbacks on personal records:

    /api/exams/history
    /api/tutor-graph/progress
    /api/student/onboarding
    /api/student/a11y-prefs
    /api/students/{id}/exams/history

Each must now return 401 to an unauthenticated caller.  These tests hit
the REAL route handlers in-process (mini FastAPI app + TestClient); the
auth dependency chain is the real one — no token simply means
``get_current_user`` raises, exactly as in production.
"""

from __future__ import annotations

import os
import sys
import uuid
from pathlib import Path

import pytest

_BACKEND = Path(__file__).resolve().parent.parent
for _p in (str(_BACKEND.parent), str(_BACKEND)):
    if _p not in sys.path:
        sys.path.insert(0, _p)

os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite://")

from fastapi import FastAPI  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from backend.database import get_db as _backend_get_db  # noqa: E402

_ANY_UUID = str(uuid.uuid4())


@pytest.fixture(scope="module")
def client():
    """Mini app with the four real routers carrying the fixed routes."""
    from backend.api import competency_tutor, exams_adapter, student_sync

    app = FastAPI()
    app.include_router(exams_adapter.router)
    app.include_router(student_sync.router)
    app.include_router(competency_tutor.router)

    # the real get_db would open the module engine; a no-op stub is enough
    # because every tested request must be refused BEFORE any DB work.
    async def _db():
        yield None

    app.dependency_overrides[_backend_get_db] = _db
    return TestClient(app)


UNAUTH_CASES = [
    ("GET", "/api/exams/history"),
    ("GET", f"/api/students/{_ANY_UUID}/exams/history"),
    ("GET", "/api/tutor-graph/progress"),
    ("GET", "/api/tutor-graph/progress?student_id=guest"),
    ("GET", "/api/student/onboarding"),
    ("GET", "/api/student/a11y-prefs"),
]


@pytest.mark.parametrize("method,path", UNAUTH_CASES)
def test_personal_routes_refuse_guests(client, method, path):
    res = client.request(method, path)  # NO Authorization header
    assert res.status_code == 401, (
        f"{method} {path} served a guest (got {res.status_code}); "
        "personal records must 401 unauthenticated"
    )


def test_a11y_prefs_post_refuses_guests(client):
    """sendBeacon posts carry no token — they must not persist either."""
    res = client.post(
        "/api/student/a11y-prefs",
        content=b'{"accessibility": {"font_size": "large"}}',
        headers={"Content-Type": "text/plain"})
    assert res.status_code == 401


def test_onboarding_post_refuses_guests(client):
    res = client.post(
        "/api/student/onboarding", json={"classLevel": 10})
    assert res.status_code == 401


def test_bad_token_is_401_not_200(client):
    """A garbage token must not fall back to a guest profile either."""
    res = client.get(
        "/api/exams/history", headers={"Authorization": "Bearer not.a.jwt"})
    assert res.status_code == 401
