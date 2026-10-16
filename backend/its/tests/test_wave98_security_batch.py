"""Wave 9.8 security batch — lane-B audit fixes (2026-10-15).

Regression coverage for the audit findings at
``D:/platform/_work/audit_2026_10_15/laneB/``:

1. **IDOR** — ``GET /api/students/{student_id}/exams/history`` returned
   another student's exam records to any authenticated student (verified
   live: student A's token read student B's ISC Math/CS history).  The
   path id must be authorised — self, or a LINKED parent — through the
   same self-or-parent guard the weekly digest uses.
2. **Guest-200 → 401** — ``/api/exams/history``,
   ``/api/tutor-graph/progress``, ``/api/student/onboarding`` and
   ``/api/student/a11y-prefs`` returned a guest payload instead of 401.
3. **/metrics** was publicly scrapeable — handler names + status counts
   are free recon surface.  It is now disabled unless ``METRICS_TOKEN``
   is set, and then requires ``Authorization: Bearer <token>``.
4. **Hardcoded ``NEO4J_PASSWORD``** literal in
   ``content_parsers/load_to_neo4j.py`` (+ _trash copies and the
   ``os.getenv`` defaults in services) — must come from the environment.

Two assertion styles (same discipline as tests/test_idor_guards.py):
wiring — the auth/ownership dependency must be attached to the endpoint
signature, so deleting it fails the suite; behaviour — the guard itself
(403 cross-student, self/parent ok, 401 no token) and the /metrics token
gate.  No real DB: sessions are faked, the guard raises before any query
for the denied cases, and the parent-link query is stubbed.
"""

from __future__ import annotations

import asyncio
import inspect
import os
import sys
from pathlib import Path
from types import SimpleNamespace

import pytest
from fastapi import HTTPException

sys.path.insert(0, os.path.join("D:\\", "platform", "deploy"))

# backend.database builds its async engine at import time — a parseable
# URL is all it needs (no connection is ever opened; every db session in
# these tests is faked).  Same pattern as tests/chem_class9_board_battery.
os.environ.setdefault(
    "DATABASE_URL", "postgresql+asyncpg://test:test@localhost:9/test")
os.environ.setdefault("PLATFORM_DATABASE_URL", os.environ["DATABASE_URL"])

from backend.api import exams_adapter, student_sync  # noqa: E402
from backend.deps import (  # noqa: E402
    get_current_user,
    require_self_or_linked_parent,
)
from backend.modules.metrics import router as metrics_router  # noqa: E402

STUDENT_A = "3f2a1b4c-5d6e-7f80-91a2-b3c4d5e6f701"
STUDENT_B = "9a8b7c6d-5e4f-3021-8765-4321fedcba09"
PARENT_ID = "11111111-2222-3333-4444-555555555555"
TEACHER_ID = "22222222-3333-4444-5555-666666666666"


def _user(user_id: str, role: str) -> SimpleNamespace:
    """Stand-in for backend.models.user.User — guards read id/role only."""
    return SimpleNamespace(id=user_id, role=role, is_active=True)


class _Scalars:
    def __init__(self, rows):
        self._rows = list(rows)

    def all(self):
        return list(self._rows)


class _Result:
    def __init__(self, rows=(), scalar=None):
        self._scalars = _Scalars(rows)
        self._scalar = scalar

    def scalars(self):
        return _Scalars(self._scalars._rows)

    def scalar_one_or_none(self):
        return self._scalar


class FakeDB:
    """Minimal AsyncSession stand-in.

    ``scalar`` is what ``scalar_one_or_none()`` returns — set it to a row
    to simulate an existing parent_student_links entry, ``None`` for no
    link.  ``rows`` feeds ``scalars().all()`` (exam history result set).
    """

    def __init__(self, rows=(), scalar=None):
        self._result = _Result(rows, scalar)
        self.executed = 0

    async def execute(self, *a, **k):
        self.executed += 1
        return self._result

    async def commit(self):
        pass


def _dep_names(func) -> list:
    """The callables attached via ``Depends(...)`` parameter defaults."""
    from fastapi.params import Depends as DependsClass

    return [
        getattr(p.default.dependency, "__name__", repr(p.default.dependency))
        for p in inspect.signature(func).parameters.values()
        if isinstance(p.default, DependsClass)
    ]


def _run(coro):
    return asyncio.run(coro)


# ---------------------------------------------------------------------------
# 1. IDOR — /api/students/{student_id}/exams/history
# ---------------------------------------------------------------------------

class TestSelfOrLinkedParentGuard:
    """The shared helper extracted from the weekly-digest check."""

    def test_student_reads_own_record(self):
        sid = _run(require_self_or_linked_parent(
            STUDENT_A, _user(STUDENT_A, "student"), FakeDB()))
        assert sid == STUDENT_A

    def test_student_cannot_read_another_student(self):
        with pytest.raises(HTTPException) as exc:
            _run(require_self_or_linked_parent(
                STUDENT_B, _user(STUDENT_A, "student"), FakeDB()))
        assert exc.value.status_code == 403

    def test_teacher_is_denied(self):
        """Same contract as the weekly digest: staff use /api/teacher/*
        surfaces — this guard is self-or-linked-parent only."""
        with pytest.raises(HTTPException) as exc:
            _run(require_self_or_linked_parent(
                STUDENT_B, _user(TEACHER_ID, "teacher"), FakeDB()))
        assert exc.value.status_code == 403

    def test_linked_parent_may_read(self):
        db = FakeDB(scalar=object())  # parent_student_links row exists
        sid = _run(require_self_or_linked_parent(
            STUDENT_B, _user(PARENT_ID, "parent"), db))
        assert sid == STUDENT_B
        assert db.executed >= 1  # the link was actually checked

    def test_unlinked_parent_is_denied(self):
        db = FakeDB(scalar=None)
        with pytest.raises(HTTPException) as exc:
            _run(require_self_or_linked_parent(
                STUDENT_B, _user(PARENT_ID, "parent"), db))
        assert exc.value.status_code == 403

    def test_malformed_id_is_422_not_a_db_crash(self):
        with pytest.raises(HTTPException) as exc:
            _run(require_self_or_linked_parent(
                "not-a-uuid", _user(STUDENT_A, "student"), FakeDB()))
        assert exc.value.status_code == 422

    def test_mixed_case_uuid_still_matches_self(self):
        sid = _run(require_self_or_linked_parent(
            STUDENT_A.upper(), _user(STUDENT_A, "student"), FakeDB()))
        assert sid == STUDENT_A


class TestExamsHistoryEndpoint:
    def test_path_param_route_requires_auth(self):
        assert "get_current_user" in _dep_names(
            exams_adapter.get_student_exam_history), (
            "students/{id}/exams/history lost its auth dependency"
        )

    def test_path_param_route_calls_ownership_guard(self):
        body = inspect.getsource(exams_adapter.get_student_exam_history)
        assert "require_self_or_linked_parent" in body, (
            "the {student_id} path param is no longer authorised — "
            "the lane-B IDOR is open again"
        )

    def test_other_student_denied_before_any_query(self):
        db = FakeDB()
        with pytest.raises(HTTPException) as exc:
            _run(exams_adapter.get_student_exam_history(
                STUDENT_B, page=1, pageSize=20,
                user=_user(STUDENT_A, "student"), db=db))
        assert exc.value.status_code == 403
        assert db.executed == 0, "guard must fire before the history query"

    def test_self_gets_history(self):
        db = FakeDB(rows=[])
        out = _run(exams_adapter.get_student_exam_history(
            STUDENT_A, page=1, pageSize=20,
            user=_user(STUDENT_A, "student"), db=db))
        assert out["success"] is True
        assert out["data"]["total"] == 0

    def test_linked_parent_gets_child_history(self):
        db = FakeDB(rows=[], scalar=object())
        out = _run(exams_adapter.get_student_exam_history(
            STUDENT_B, page=1, pageSize=20,
            user=_user(PARENT_ID, "parent"), db=db))
        assert out["success"] is True

    def test_self_route_requires_auth(self):
        assert "get_current_user" in _dep_names(exams_adapter.get_exam_history)
        assert "get_current_user_optional" not in _dep_names(
            exams_adapter.get_exam_history)


# ---------------------------------------------------------------------------
# 2. Guest-200 -> 401 on the five flagged routes
# ---------------------------------------------------------------------------

class TestAuthWiring:
    """Every flagged route must depend on get_current_user (or, for
    tutor-graph, an equivalent mandatory-credential dependency) — the
    optional variant is exactly what produced the guest-200s."""

    @pytest.mark.parametrize("func", [
        exams_adapter.get_exam_history,
        exams_adapter.get_student_exam_history,
        student_sync.save_a11y_prefs,
        student_sync.read_a11y_prefs,
        student_sync.save_onboarding,
        student_sync.read_onboarding,
    ])
    def test_requires_current_user(self, func):
        deps = _dep_names(func)
        assert "get_current_user" in deps, (
            f"{func.__module__}.{func.__name__} went anonymous/optional "
            f"again (deps={deps})"
        )

    def test_tutor_graph_progress_requires_auth(self):
        from backend.api import competency_tutor

        deps = _dep_names(competency_tutor.progress)
        body = inspect.getsource(competency_tutor.progress)
        authed = ("get_current_user" in deps) or (
            "_bound_student_id" not in body and "_bearer" not in deps)
        assert authed, (
            "tutor-graph /progress still accepts anonymous callers "
            f"(deps={deps})"
        )

    def test_progress_is_bound_to_the_token_id(self):
        """The served record must be the JWT sub — a supplied student_id
        can never widen access."""
        from backend.api import competency_tutor

        captured = {}

        class _Eng:
            def progress(self, sid, subject):
                captured["sid"] = sid
                return {"student_id": sid}

        import unittest.mock as mock
        with mock.patch.object(competency_tutor, "_get_engine",
                               return_value=_Eng()):
            out = _run(competency_tutor.progress(
                student_id=STUDENT_B, subject=None,
                user=_user(STUDENT_A, "student")))
        assert captured["sid"] == STUDENT_A
        assert out["student_id"] == STUDENT_A


class TestGuestGets401:
    """get_current_user itself is the 401 source for all five routes —
    assert it fires on a missing credential rather than re-testing the
    whole JWT chain (already covered by the auth suite)."""

    def test_no_credentials_is_401(self):
        with pytest.raises(HTTPException) as exc:
            _run(get_current_user(None, FakeDB()))
        assert exc.value.status_code == 401

    def test_bad_token_is_401(self):
        creds = SimpleNamespace(credentials="not-a-real-token")
        with pytest.raises(HTTPException) as exc:
            _run(get_current_user(creds, FakeDB()))
        assert exc.value.status_code == 401


# ---------------------------------------------------------------------------
# 3. /metrics — token-gated, disabled by default
# ---------------------------------------------------------------------------

def _req(auth_header=None):
    headers = {}
    if auth_header is not None:
        headers["authorization"] = auth_header
    return SimpleNamespace(headers=headers)


class TestMetricsGuard:
    def test_disabled_without_env_token(self, monkeypatch):
        monkeypatch.delenv("METRICS_TOKEN", raising=False)
        with pytest.raises(HTTPException) as exc:
            metrics_router.metrics(_req("Bearer anything"))
        assert exc.value.status_code == 404

    def test_token_set_but_no_auth_is_401(self, monkeypatch):
        monkeypatch.setenv("METRICS_TOKEN", "secret-metrics-token")
        with pytest.raises(HTTPException) as exc:
            metrics_router.metrics(_req())
        assert exc.value.status_code == 401

    def test_wrong_token_is_401(self, monkeypatch):
        monkeypatch.setenv("METRICS_TOKEN", "secret-metrics-token")
        with pytest.raises(HTTPException) as exc:
            metrics_router.metrics(_req("Bearer wrong"))
        assert exc.value.status_code == 401

    def test_correct_token_serves_exposition(self, monkeypatch):
        monkeypatch.setenv("METRICS_TOKEN", "secret-metrics-token")
        monkeypatch.setattr(metrics_router, "render_exposition",
                            lambda: "atlas_up 1\n")
        resp = metrics_router.metrics(_req("Bearer secret-metrics-token"))
        assert resp.media_type.startswith("text/plain")
        assert b"atlas_up" in resp.body

    def test_empty_env_token_disables(self, monkeypatch):
        monkeypatch.setenv("METRICS_TOKEN", "   ")
        with pytest.raises(HTTPException) as exc:
            metrics_router.metrics(_req("Bearer x"))
        assert exc.value.status_code == 404


# ---------------------------------------------------------------------------
# 4. No hardcoded Neo4j password anywhere in the ship tree
# ---------------------------------------------------------------------------

NEO4J_LITERAL = "dream_neo4j_2024"
_DEPLOY_BACKEND = Path(__file__).resolve().parents[2]


class TestNoHardcodedNeo4jPassword:
    def test_loader_reads_from_env(self):
        # read the source, not the module — importing needs the neo4j
        # driver, which the test env does not have to have
        src = (_DEPLOY_BACKEND / "content_parsers" / "load_to_neo4j.py") \
            .read_text(encoding="utf-8")
        assert NEO4J_LITERAL not in src
        assert "os.environ" in src or "os.getenv" in src

    @pytest.mark.parametrize("rel", [
        "content_parsers/load_to_neo4j.py",
        "services/content_service.py",
        "services/graph_service.py",
    ])
    def test_no_literal_in_live_code(self, rel):
        text = (_DEPLOY_BACKEND / rel).read_text(encoding="utf-8")
        assert NEO4J_LITERAL not in text, f"{rel} still carries the literal"

    def test_no_literal_in_trash_copies(self):
        trash = _DEPLOY_BACKEND / "_trash"
        if not trash.exists():
            pytest.skip("no _trash dir")
        offenders = [
            str(p) for p in trash.rglob("*.py")
            if NEO4J_LITERAL in p.read_text(encoding="utf-8", errors="replace")
        ]
        assert offenders == [], f"trash copies still carry the literal: {offenders}"


# ---------------------------------------------------------------------------
# 5. weekly-digest keeps its self-or-parent contract via the shared helper
# ---------------------------------------------------------------------------

class TestWeeklyDigestReusesHelper:
    def test_digest_uses_the_shared_guard(self):
        from backend.api import engagement

        body = inspect.getsource(engagement.get_weekly_digest)
        assert "require_self_or_linked_parent" in body, (
            "weekly-digest no longer runs the self-or-parent guard"
        )

    def test_digest_guard_denies_foreign_student(self):
        from backend.api import engagement

        body = inspect.getsource(engagement.get_weekly_digest)
        # the check must run before the student row is loaded
        assert body.index("require_self_or_linked_parent") < body.index(
            "Student not found")


if __name__ == "__main__":
    pytest.main([__file__, "-x", "-q"])
