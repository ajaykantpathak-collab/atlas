# -*- coding: utf-8 -*-
"""tests/test_fixf1_idor_matrix.py — LAUNCH-FIX-F1 (batch fix_2026_10_15).

Port of the audit's two-account IDOR matrix (laneB/idor.py) onto the REAL
route handlers.  The audit verified live on :80 that student A could read
student B's exam history (CRITICAL IDOR); these tests pin the closed state.

Two students (A, B), one parent, one teacher — REAL JWTs signed by
``backend.security.create_access_token`` and decoded by the REAL
``backend.deps.get_current_user`` chain (no auth dependency is mocked).
Only ``get_db`` is overridden, to a throwaway aiosqlite file — the same
hermetic pattern as tests/test_struggle_notebook.py.

Matrix (mirrors _work/audit_2026_10_15/laneB/idor.py):
  * A token + B id  on /api/students/{id}/exams/history  -> 403   (the IDOR)
  * A token + A id / /api/exams/history                  -> 200, own rows only
  * B token + B id                                      -> 200 (self keeps working)
  * linked parent on B                                   -> 200 (relationship keeps working)
  * unlinked parent / teacher / other student            -> 403
  * malformed id                                         -> 422 (never a GUID-bind 500)
  * weekly-digest cross-id                               -> 403 (held before; must not break)
  * tutor-graph/progress?student_id=B with A token        -> 200 but BOUND to A
  * a11y-prefs / onboarding                              -> self-scoped payload
  * student token on teacher routes                      -> 403; teacher token -> 200
"""

from __future__ import annotations

import asyncio
import os
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

import pytest

_BACKEND = Path(__file__).resolve().parent.parent
for _p in (str(_BACKEND.parent), str(_BACKEND)):
    if _p not in sys.path:
        sys.path.insert(0, _p)

# backend.database (and its top-level `database` alias) build engines at
# IMPORT time from settings; a parseable sqlite URL keeps that side-effect
# free and guarantees no test path can reach the production postgres.
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite://")

from sqlalchemy.ext.asyncio import (  # noqa: E402
    async_sessionmaker, create_async_engine,
)
from sqlalchemy.pool import NullPool  # noqa: E402

from backend.database import Student as StudentRow  # noqa: E402
from backend.database import get_db as _backend_get_db  # noqa: E402
from backend.models.progress import ActivityLog  # noqa: E402
from backend.models.user import User as UserModel  # noqa: E402
from backend.security import create_access_token  # noqa: E402
from backend.services.auth_service import (  # noqa: E402
    ParentStudentLinkModel, TeacherClassModel,
)
from backend.services.exam_service import (  # noqa: E402
    ExamResultDB, ExamSessionDB,
)
from backend.services.struggle import _ClassEnrollment  # noqa: E402

A_ID = str(uuid.uuid4())
B_ID = str(uuid.uuid4())
PARENT_ID = str(uuid.uuid4())
TEACHER_ID = str(uuid.uuid4())


def _run(coro):
    return asyncio.run(coro)


@pytest.fixture(scope="module")
def matrix(tmp_path_factory):
    """One throwaway DB + one mini app carrying the real routers."""
    from fastapi import FastAPI
    from fastapi.testclient import TestClient

    from backend.api import exams_adapter, engagement, student_sync, teacher
    from backend.api import competency_tutor as ct
    import database as _topdb  # teacher.py's `from database import get_db`

    tmp = tmp_path_factory.mktemp("fixf1_idor")
    engine = create_async_engine(
        f"sqlite+aiosqlite:///{tmp / 'matrix.db'}", poolclass=NullPool)

    async def _init():
        async with engine.begin() as conn:
            for table in (
                UserModel.__table__,          # users
                StudentRow.__table__,          # students
                ParentStudentLinkModel.__table__,
                ActivityLog.__table__,         # activity_logs
                ExamSessionDB.__table__,       # exam_sessions
                ExamResultDB.__table__,        # exam_results
                TeacherClassModel.__table__,   # teacher_classes
                # teacher.py's class list counts class_enrollments; its own
                # table lives on a separate on-demand metadata — struggle's
                # identical table name serves the read side here.
                _ClassEnrollment.__table__,
            ):
                await conn.run_sync(table.create)

        # -- actors (one flush per row — see students note below) ----------
        async with async_sessionmaker(engine, expire_on_commit=False)() as s:
            for uid, name, email, role in (
                (A_ID, "Student A", "a@fixf1.test", "student"),
                (B_ID, "Student B", "b@fixf1.test", "student"),
                (PARENT_ID, "Parent P", "p@fixf1.test", "parent"),
                (TEACHER_ID, "Teacher T", "t@fixf1.test", "teacher"),
            ):
                s.add(UserModel(id=uid, name=name, email=email, role=role,
                                is_active=True, is_premium=False,
                                total_xp=0, current_level=1, streak_days=0))
                await s.flush()
            # parent P is linked to child B ONLY
            s.add(ParentStudentLinkModel(
                id=uuid.uuid4(), parent_id=PARENT_ID, student_id=B_ID,
                relation="parent"))
            await s.flush()
            # students rows (FK target for exam tables) — one flush per row:
            # batched UUID inserts trip SQLAlchemy's insertmanyvalues
            # sentinel matching on sqlite.
            s.add(StudentRow(id=A_ID, name="Student A"))
            await s.flush()
            s.add(StudentRow(id=B_ID, name="Student B"))
            await s.flush()
            # B has ONE graded exam; A has none
            s.add(ExamSessionDB(
                id=1, session_code="fixf1-1", student_id=B_ID,
                subject="Mathematics", status="graded"))
            await s.flush()
            s.add(ExamResultDB(
                session_id=1, student_id=B_ID, subject="Mathematics",
                total_marks=80, obtained_marks=64.0, percentage=80.0,
                grade="A", submitted_at=datetime(2026, 10, 14, tzinfo=timezone.utc)))
            await s.commit()

    _run(_init())

    # -- hermetic store redirects (data layer only; auth untouched) -------
    saved = {
        "a11y": student_sync._A11Y_STORE,
        "onboarding": student_sync._ONBOARDING_STORE,
        "try_db": student_sync._try_db_upsert,
        "tutor_store": ct._TUTOR_STORE,
        "engine": ct._engine,
        "build_store": None,
    }
    from backend.services import tutor_store as _ts
    saved["build_store"] = _ts.build_store
    student_sync._A11Y_STORE = tmp / "a11y.json"
    student_sync._ONBOARDING_STORE = tmp / "onboarding.json"
    async def _no_db_upsert(prefs, sid):  # keep every write on tmp files
        return False
    student_sync._try_db_upsert = _no_db_upsert
    ct._TUTOR_STORE = str(tmp / "tutor_students.json")
    ct._engine = None  # force a rebuild bound to the tmp store
    _ts.build_store = lambda path=None: _ts.FileTutorStore(path or ct._TUTOR_STORE)

    # -- mini app: the real routers, only get_db overridden ---------------
    app = FastAPI()
    app.include_router(exams_adapter.router)
    app.include_router(engagement.router)
    app.include_router(student_sync.router)
    app.include_router(ct.router)
    app.include_router(teacher.router)

    factory = async_sessionmaker(engine, expire_on_commit=False,
                                 autoflush=False, autocommit=False)

    async def _db():
        async with factory() as s:
            yield s

    app.dependency_overrides[_backend_get_db] = _db
    app.dependency_overrides[_topdb.get_db] = _db  # teacher.py's import style

    client = TestClient(app)

    def _token(uid: str) -> dict:
        return {"Authorization": "Bearer " + create_access_token({"sub": uid})}

    out = {
        "client": client,
        "token": _token,
        "a": A_ID, "b": B_ID, "parent": PARENT_ID, "teacher": TEACHER_ID,
    }
    yield out

    # -- restore module state for any suite that runs afterwards ----------
    student_sync._A11Y_STORE = saved["a11y"]
    student_sync._ONBOARDING_STORE = saved["onboarding"]
    student_sync._try_db_upsert = saved["try_db"]
    ct._TUTOR_STORE = saved["tutor_store"]
    ct._engine = None  # rebuild with the real store on next use
    _ts.build_store = saved["build_store"]
    _run(engine.dispose())


# ──────────────────────────────────────────────────────────────────────────
# 1. THE IDOR: /api/students/{id}/exams/history
# ──────────────────────────────────────────────────────────────────────────

def test_student_a_cannot_read_student_b_exam_history(matrix):
    """CRITICAL (audit lane-B): A-reads-B returned 200 with B's records."""
    res = matrix["client"].get(
        f"/api/students/{matrix['b']}/exams/history",
        headers=matrix["token"](matrix["a"]))
    assert res.status_code == 403, res.text[:200]


def test_self_exam_history_still_works(matrix):
    res = matrix["client"].get(
        f"/api/students/{matrix['b']}/exams/history",
        headers=matrix["token"](matrix["b"]))
    assert res.status_code == 200
    body = res.json()["data"]
    assert body["total"] == 1
    assert body["data"][0]["subject"] == "mathematics"


def test_own_history_route_never_leaks_b_rows(matrix):
    """/api/exams/history (no path id) must scope to the caller even though
    B has a graded row and A does not."""
    res = matrix["client"].get(
        "/api/exams/history", headers=matrix["token"](matrix["a"]))
    assert res.status_code == 200
    assert res.json()["data"]["total"] == 0


def test_linked_parent_reads_child_history(matrix):
    res = matrix["client"].get(
        f"/api/students/{matrix['b']}/exams/history",
        headers=matrix["token"](matrix["parent"]))
    assert res.status_code == 200
    assert res.json()["data"]["total"] == 1


def test_unlinked_parent_is_denied(matrix):
    """P is linked to B only — reading A must 403."""
    res = matrix["client"].get(
        f"/api/students/{matrix['a']}/exams/history",
        headers=matrix["token"](matrix["parent"]))
    assert res.status_code == 403


def test_teacher_is_denied_on_student_history(matrix):
    """require_self_or_linked_parent deliberately excludes staff — teacher
    views go through /api/teacher/*.  Pin the contract so a 'fix' that
    widens it to all staff gets reviewed."""
    res = matrix["client"].get(
        f"/api/students/{matrix['b']}/exams/history",
        headers=matrix["token"](matrix["teacher"]))
    assert res.status_code == 403


def test_malformed_student_id_is_422_not_500(matrix):
    res = matrix["client"].get(
        "/api/students/not-a-uuid/exams/history",
        headers=matrix["token"](matrix["a"]))
    assert res.status_code == 422


# ──────────────────────────────────────────────────────────────────────────
# 2. weekly-digest — the guard that already held (must keep holding)
# ──────────────────────────────────────────────────────────────────────────

def test_weekly_digest_cross_id_403(matrix):
    res = matrix["client"].get(
        f"/api/engagement/weekly-digest/{matrix['b']}",
        headers=matrix["token"](matrix["a"]))
    assert res.status_code == 403


def test_weekly_digest_self_200(matrix):
    res = matrix["client"].get(
        f"/api/engagement/weekly-digest/{matrix['a']}",
        headers=matrix["token"](matrix["a"]))
    assert res.status_code == 200
    assert res.json()["student_id"] == matrix["a"]


def test_weekly_digest_linked_parent_200(matrix):
    res = matrix["client"].get(
        f"/api/engagement/weekly-digest/{matrix['b']}",
        headers=matrix["token"](matrix["parent"]))
    assert res.status_code == 200
    assert res.json()["student_id"] == matrix["b"]


# ──────────────────────────────────────────────────────────────────────────
# 3. tutor-graph — a supplied student_id can never widen access
# ──────────────────────────────────────────────────────────────────────────

def _seed_b_attempts(matrix, attempts: int):
    from backend.api import competency_tutor as ct
    eng = ct._get_engine()
    eng.students[matrix["b"]] = {
        "mastery": {}, "attempts": {"c": attempts}, "served": {},
        "last_serve": None, "mistakes": [],
    }
    return eng


def test_tutor_graph_progress_binds_to_token_owner(matrix):
    """A supplies B's student_id — the served record must still be A's."""
    _seed_b_attempts(matrix, 7)
    res = matrix["client"].get(
        "/api/tutor-graph/progress",
        params={"student_id": matrix["b"]},
        headers=matrix["token"](matrix["a"]))
    assert res.status_code == 200
    body = res.json()
    assert body["total_attempts"] == 0, "A must not see B's attempt count"


def test_tutor_graph_progress_returns_own_record_to_b(matrix):
    _seed_b_attempts(matrix, 7)
    res = matrix["client"].get(
        "/api/tutor-graph/progress",
        params={"student_id": matrix["b"]},
        headers=matrix["token"](matrix["b"]))
    assert res.status_code == 200
    assert res.json()["total_attempts"] == 7


# ──────────────────────────────────────────────────────────────────────────
# 4. student/* — self-scoped payloads for a signed-in caller
# ──────────────────────────────────────────────────────────────────────────

def test_a11y_prefs_post_is_self_scoped(matrix):
    res = matrix["client"].post(
        "/api/student/a11y-prefs",
        content=b'{"accessibility": {"font_size": "large"}}',
        headers={**matrix["token"](matrix["a"]),
                 "Content-Type": "text/plain"})  # sendBeacon shape
    assert res.status_code == 200
    body = res.json()
    assert body["ok"] is True
    assert body["student_id"] == matrix["a"]


def test_onboarding_get_is_self_scoped(matrix):
    res = matrix["client"].get(
        "/api/student/onboarding", headers=matrix["token"](matrix["a"]))
    assert res.status_code == 200
    assert res.json()["student_id"] == matrix["a"]


# ──────────────────────────────────────────────────────────────────────────
# 5. teacher-route role walls (student 403 / teacher 200)
# ──────────────────────────────────────────────────────────────────────────

# The audit matrix also probes /api/assignments/teacher and
# /api/teacher/students — not mounted on this mini app; their role walls
# are re-verified by the live :8020 probe (_work/fix_2026_10_15).
@pytest.mark.parametrize("path", [
    "/api/teacher/classes",
    "/api/teacher/classes/x/students",
    "/api/teacher/assignments",
    "/api/teacher/worksheets",
])
def test_student_cannot_reach_teacher_surfaces(matrix, path):
    res = matrix["client"].get(path, headers=matrix["token"](matrix["a"]))
    assert res.status_code == 403, (
        f"{path} must refuse a student token (got {res.status_code})")


def test_teacher_reaches_own_class_list(matrix):
    res = matrix["client"].get(
        "/api/teacher/classes", headers=matrix["token"](matrix["teacher"]))
    assert res.status_code == 200
    assert res.json()["meta"]["totalItems"] == 0  # empty but authorized
