# -*- coding: utf-8 -*-
"""Regression tests for the B16 student-data access guards (batch 1).

Closes out the three IDORs and one anonymous write:
  * GET  /api/analytics/student/{id}/stats
  * GET  /api/analytics/student/{id}/timeline
  * GET  /api/intelligence/confidence/{id}
  * POST /api/intelligence/confidence        (anonymous write)

Two kinds of assertion, on purpose:

1. Wiring -- the guard must actually be attached to the route. A test that
   only exercises ``require_self_or_staff`` in isolation stays green after
   someone deletes the ``Depends(...)`` from the endpoint, which is exactly
   the regression that opened these holes. These tests read the endpoint
   signature and fail if the dependency is gone.
2. Behaviour -- the ownership rule itself (self ok, other student 403) and
   the injection guard that protects the ClickHouse f-string SQL.

No DB, no network: per-student endpoints are never allowed to reach the
database in these tests, because every one of them raises before that point.
"""

from __future__ import annotations

import asyncio
import inspect
from types import SimpleNamespace

import pytest
from fastapi import HTTPException

from backend.api import accessibility, analytics, intelligence
from backend.routers import learning_upgrades
from backend.deps import is_staff, require_self_or_staff

STUDENT_ID = "3f2a1b4c-5d6e-7f80-91a2-b3c4d5e6f701"
OTHER_STUDENT_ID = "9a8b7c6d-5e4f-3021-8765-4321fedcba09"
TEACHER_ID = "11111111-2222-3333-4444-555555555555"


def _user(user_id: str, role: str) -> SimpleNamespace:
    """A stand-in for backend.models.user.User -- the guard only reads id/role."""
    return SimpleNamespace(id=user_id, role=role, full_name=f"{role.title} Test")


def _dependencies_of(func) -> list:
    """The callables attached to ``func`` via ``Depends(...)`` parameter defaults.

    FastAPI keeps decorator-level dependencies on ``route.dependencies`` but
    parameter-default ones inside the endpoint signature, so the signature is
    what has to be inspected here.
    """
    from fastapi.params import Depends as DependsClass

    found = []
    for param in inspect.signature(func).parameters.values():
        default = param.default
        if isinstance(default, DependsClass):
            found.append(default.dependency)
    return found


# ---------------------------------------------------------------------------
# 1. Wiring: the per-student routes must carry the ownership guard
# ---------------------------------------------------------------------------

#: endpoint name -> the guard it must depend on
GUARDED_ENDPOINTS = [
    (analytics, "student_stats", "require_self_or_staff"),
    (analytics, "student_timeline", "require_self_or_staff"),
    (intelligence, "get_calibration", "require_self_or_staff"),
    (intelligence, "record_confidence", "get_current_user"),
    # pillar-6 batch: per-user learning-upgrades + accessibility routes
    (learning_upgrades, "review_queue", "require_self_or_staff"),
    (learning_upgrades, "review_upcoming", "require_self_or_staff"),
    (learning_upgrades, "next_best", "require_self_or_staff"),
    (learning_upgrades, "mastery_passport", "require_self_or_staff"),
    (learning_upgrades, "student_misconception_profile", "require_self_or_staff"),
    (learning_upgrades, "review_grade", "get_current_user"),
    (accessibility, "get_accessibility", "require_self_or_staff"),
    (accessibility, "update_accessibility", "require_self_or_staff"),
]


def test_me_routes_are_registered_before_the_parameterized_ones():
    """FastAPI matches in registration order: a literal route declared AFTER
    ``/{user_id}`` is unreachable (the parameter swallows "me"), which is how
    /api/passport/me and friends 500'd with ``uuid.UUID('me')``."""
    from backend.routers import learning_upgrades as lu

    order = {}
    for i, route in enumerate(lu.router.routes):
        order[route.path] = i
    for me_path, param_path in [
        ("/api/review/queue/me", "/api/review/queue/{student_id}"),
        ("/api/review/upcoming/me", "/api/review/upcoming/{student_id}"),
        ("/api/path/next-best/me", "/api/path/next-best/{student_id}"),
        ("/api/passport/me", "/api/passport/{student_id}"),
    ]:
        assert me_path in order, f"{me_path} missing from the router"
        assert param_path in order, f"{param_path} missing from the router"
        assert order[me_path] < order[param_path], (
            f"{me_path} must be registered BEFORE {param_path} "
            "(the parameterized route shadows the literal otherwise)"
        )


def test_accessibility_uses_the_real_database_layer():
    """Regression: the module imported ``services.database`` /
    ``services.models`` — packages that do not exist — so every DB-backed
    call on /api/accessibility/* raised ModuleNotFoundError (500)."""
    from backend.database import Base
    from backend.models.accessibility import AccessibilityPreferencesModel

    assert "accessibility_preferences" in Base.metadata.tables
    import backend.api.accessibility as acc

    src = inspect.getsource(acc)
    assert "from services." not in src, (
        "accessibility.py regressed to the phantom 'services' package"
    )


@pytest.mark.parametrize("module,func_name,guard_name", GUARDED_ENDPOINTS)
def test_guard_is_attached_to_endpoint(module, func_name, guard_name):
    func = getattr(module, func_name)
    attached = [getattr(dep, "__name__", repr(dep)) for dep in _dependencies_of(func)]
    assert guard_name in attached, (
        f"{module.__name__}.{func_name} lost its {guard_name} dependency "
        f"(found {attached}). This re-opens a B16 IDOR."
    )


#: every analytics route that returns data about students other than the caller
STAFF_ONLY_ENDPOINTS = [
    "analytics_overview",
    "analytics_events",
    "analytics_mastery_distribution",
    "analytics_difficulty_summary",
    "analytics_llm_costs",
    "analytics_misconceptions",
    "analytics_socratic_stats",
    "analytics_weekly_engagement",
    "subject_summary",
    "irt_sync",
    "irt_report",
]


@pytest.mark.parametrize("func_name", STAFF_ONLY_ENDPOINTS)
def test_aggregate_endpoints_are_staff_only(func_name):
    func = getattr(analytics, func_name)
    attached = [getattr(dep, "__name__", repr(dep)) for dep in _dependencies_of(func)]
    assert "_require_staff" in attached, (
        f"analytics.{func_name} became anonymous (found {attached}). "
        "Whole-school performance data must not be readable without a token."
    )


# ---------------------------------------------------------------------------
# 2. Behaviour: the ownership rule itself
# ---------------------------------------------------------------------------


def test_student_can_read_own_record():
    resolved = asyncio.run(
        require_self_or_staff(STUDENT_ID, _user(STUDENT_ID, "student"))
    )
    assert resolved == STUDENT_ID


def test_student_cannot_read_another_students_record():
    with pytest.raises(HTTPException) as exc:
        asyncio.run(
            require_self_or_staff(OTHER_STUDENT_ID, _user(STUDENT_ID, "student"))
        )
    # 403 not 404: a differing 404 would confirm which student ids exist.
    assert exc.value.status_code == 403


@pytest.mark.parametrize("role", ["teacher", "admin"])
def test_staff_may_read_any_record(role):
    resolved = asyncio.run(
        require_self_or_staff(OTHER_STUDENT_ID, _user(TEACHER_ID, role))
    )
    assert resolved == OTHER_STUDENT_ID


def test_is_staff_accepts_inconsistent_casing_and_whitespace():
    assert is_staff(_user(TEACHER_ID, " Teacher ")) is True
    assert is_staff(_user(STUDENT_ID, "student")) is False


def test_post_confidence_rejects_foreign_student_id():
    """The body carries student_id, so the check is inline -- verify it bites."""
    request = intelligence.ConfidenceRequest(
        student_id=OTHER_STUDENT_ID,
        concept="photosynthesis",
        confidence_rating=5,
        is_correct=True,
    )
    with pytest.raises(HTTPException) as exc:
        asyncio.run(
            intelligence.record_confidence(request, _user(STUDENT_ID, "student"))
        )
    assert exc.value.status_code == 403


def test_guard_returns_the_scoped_id_not_the_raw_path_value():
    """Endpoints must use the RETURNED id. If one ever goes back to using the
    raw path parameter, the check and the data access can disagree."""
    resolved = asyncio.run(
        require_self_or_staff(STUDENT_ID, _user(STUDENT_ID, "student"))
    )
    assert resolved == STUDENT_ID
    assert isinstance(resolved, str)


# ---------------------------------------------------------------------------
# 3. The injection guard protecting ClickHouse's f-string SQL
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    "value",
    [STUDENT_ID, "q_1", "c10_bio_icse_01_001", "A" * 64, "math-7"],
)
def test_safe_id_accepts_id_shapes(value):
    assert analytics._safe_id(value, "student_id") == value


@pytest.mark.parametrize(
    "value",
    [
        "x' OR '1'='1",
        "1; DROP TABLE learning_events",
        "*/ OR 1=1 --",
        "",
        "a" * 65,
        "user/../admin",
    ],
)
def test_safe_id_rejects_injection_and_malformed(value):
    with pytest.raises(HTTPException) as exc:
        analytics._safe_id(value, "student_id")
    assert exc.value.status_code == 400


def test_safe_id_pattern_is_the_one_exported_from_analytics():
    assert analytics._SAFE_ID.pattern == r"^[A-Za-z0-9_-]{1,64}$"
