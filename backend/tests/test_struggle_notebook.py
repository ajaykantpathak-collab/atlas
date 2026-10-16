"""Tests for the Wave 9.8 L5 noticing layer (Contract B).

Covers the gate list:
  1. 3 consecutive misses on one node -> struggle_flags.mode = "contrast"
  2. 5 consecutive misses             -> "prereq"
  3. a verified success resolves open mistake rows and resets the flag
  4. notebook IDOR: student B cannot read or delete student A's row
     (403 — never a differential 404)
  5. weekly empty-state shape for a user with no data
  6. /api/teacher/students/stuck: 403 for a student token, roster-scoped
     rows for a teacher
  7. the raised flag surfaces as the ``struggle`` payload the next
     response carries (flag_for_response — the same call the practice
     submit + tutor its_input paths use)

DB: throwaway aiosqlite file (same pattern as test_weekly_digest.py) —
never the shared engine.  Async work runs via asyncio.run; each call
opens a fresh session from the test's own factory.
"""

from __future__ import annotations

import asyncio
import os
import sys
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path
from types import SimpleNamespace

import pytest

_BACKEND = Path(__file__).resolve().parent.parent
for _p in (str(_BACKEND.parent), str(_BACKEND)):
    if _p not in sys.path:
        sys.path.insert(0, _p)

# backend.database builds its engine at IMPORT time from settings; a
# parseable sqlite URL keeps that side-effect free (same trick as
# test_weekly_digest.py).
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite://")

from sqlalchemy.ext.asyncio import (  # noqa: E402
    AsyncSession, async_sessionmaker, create_async_engine,
)
from sqlalchemy.pool import NullPool  # noqa: E402
from sqlalchemy import text as _text  # noqa: E402

from backend.services import struggle  # noqa: E402
from backend.models.user import User as UserModel  # noqa: E402


# --------------------------------------------------------------------------- #
# Fixtures
# --------------------------------------------------------------------------- #

@pytest.fixture()
def db_factory(tmp_path):
    """Throwaway sqlite DB with every table the feature touches."""
    engine = create_async_engine(
        f"sqlite+aiosqlite:///{tmp_path / 'struggle.db'}",
        poolclass=NullPool)

    async def _init():
        async with engine.begin() as conn:
            await conn.run_sync(UserModel.__table__.create)
            await conn.run_sync(struggle.StudentMistake.__table__.create)
            await conn.run_sync(struggle.StruggleFlag.__table__.create)
            await conn.run_sync(struggle._TeacherClass.__table__.create)
            await conn.run_sync(struggle._ClassEnrollment.__table__.create)
            await conn.execute(_text(
                "CREATE TABLE IF NOT EXISTS mastery_event_log ("
                "dedup_key VARCHAR(160) PRIMARY KEY, "
                "student_id VARCHAR(64), node_id VARCHAR(190), "
                "source VARCHAR(40), is_correct BOOLEAN, "
                "applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"))
            await conn.execute(_text(
                "CREATE TABLE IF NOT EXISTS mastery_records ("
                "id VARCHAR(36) PRIMARY KEY, user_id VARCHAR(36), "
                "node_id VARCHAR(190), mastery_probability FLOAT, "
                "p_known FLOAT, p_transit FLOAT, p_slip FLOAT, "
                "p_guess FLOAT, attempts INTEGER, "
                "last_attempt_at TIMESTAMP, created_at TIMESTAMP, "
                "updated_at TIMESTAMP)"))

    asyncio.run(_init())

    def factory() -> AsyncSession:
        return AsyncSession(engine, expire_on_commit=False, autoflush=False)

    yield factory
    asyncio.run(engine.dispose())


def _run(coro):
    return asyncio.run(coro)


def _mk_user(factory, user_id: str, name="Test", role="student"):
    async def _go():
        async with factory() as s:
            s.add(UserModel(id=user_id, name=name, role=role,
                            is_active=True, is_premium=False,
                            total_xp=0, current_level=1,
                            streak_days=0))
            await s.commit()
    _run(_go())


USER_A = str(uuid.uuid4())
USER_B = str(uuid.uuid4())
NODE = "c10_sci_cbse_04_001"


# --------------------------------------------------------------------------- #
# 1-3. Flag transitions + reset
# --------------------------------------------------------------------------- #

def _miss(factory, uid, node, n=1):
    async def _go():
        res = None
        for i in range(n):
            async with factory() as s:
                res = await struggle.record_attempt(
                    uid, node,
                    question_text=f"Q{i}: compute 2+2",
                    student_answer="5",
                    verdict_ok=False,
                    diagnosis="sign slip on the final step",
                    correct_path={"steps": ["add", "carry"], "answer": "4"},
                    source="practice", db=s)
                # caller-session contract: the CALLER commits the unit
                await s.commit()
        return res
    return _run(_go())


def test_three_misses_raise_contrast(db_factory):
    _mk_user(db_factory, USER_A)
    res = _miss(db_factory, USER_A, NODE, n=3)
    assert res["recorded"] is True
    assert res["mode_after"] == "contrast"
    assert res["consecutive_misses"] == 3
    assert res["mode_before"] == "probe"  # 3rd miss raises the flag


def test_five_misses_raise_prereq(db_factory):
    _mk_user(db_factory, USER_A)
    res = _miss(db_factory, USER_A, NODE, n=5)
    assert res["mode_after"] == "prereq"
    assert res["consecutive_misses"] == 5


def test_success_resets_flag_and_resolves_mistakes(db_factory):
    _mk_user(db_factory, USER_A)
    _miss(db_factory, USER_A, NODE, n=3)

    async def _go():
        async with db_factory() as s:
            res = await struggle.record_attempt(
                USER_A, NODE, question_text="Q: 2+2", student_answer="4",
                verdict_ok=True, source="practice", db=s)
            await s.commit()
            return res
    res = _run(_go())
    assert res["recorded"] is True
    assert res["mode_before"] == "contrast"  # flag was up when it landed
    assert res["mode_after"] == "probe"
    assert res["consecutive_misses"] == 0

    async def _check():
        async with db_factory() as s:
            flag = await struggle._get_flag(s, USER_A, NODE)
            rows = (await s.execute(
                __import__("sqlalchemy").select(struggle.StudentMistake).where(
                    struggle.StudentMistake.user_id == USER_A)
            )).scalars().all()
            return flag, rows
    flag, rows = _run(_check())
    assert flag.mode == "probe" and flag.consecutive_misses == 0
    assert all(r.resolved_at is not None for r in rows)


def test_guest_ids_skip_cleanly(db_factory):
    async def _go():
        async with db_factory() as s:
            return await struggle.record_attempt(
                "session_guest42", NODE, verdict_ok=False, db=s)
    res = _run(_go())
    assert res["recorded"] is False
    assert res["skipped"] == "guest-or-non-uuid"


# --------------------------------------------------------------------------- #
# 7. Raised flag -> the NEXT response's struggle payload
# --------------------------------------------------------------------------- #

def test_raised_flag_appears_in_next_response(db_factory):
    _mk_user(db_factory, USER_A)
    _miss(db_factory, USER_A, NODE, n=3)

    async def _go():
        async with db_factory() as s:
            return await struggle.struggle_payload(s, USER_A, NODE,
                                                   diagnosis="sign slip")
    payload = _run(_go())
    assert payload is not None
    assert payload["mode"] == "contrast"
    assert payload["misses"] == 3
    # diagnosis rides through for the worked-contrast card
    assert payload["diagnosis"] == "sign slip"


def test_probe_flag_produces_no_payload(db_factory):
    _mk_user(db_factory, USER_A)
    _miss(db_factory, USER_A, NODE, n=2)

    async def _go():
        async with db_factory() as s:
            return await struggle.struggle_payload(s, USER_A, NODE)
    assert _run(_go()) is None


# --------------------------------------------------------------------------- #
# 4. Notebook IDOR
# --------------------------------------------------------------------------- #

def _mini_app(factory, user_id: str, role: str = "student"):
    """Mini FastAPI app: only the L5 routers, deps overridden."""
    from fastapi import FastAPI
    from backend.database import get_db
    from backend.deps import get_current_user
    from backend.routers.notebook import router as notebook_router
    from backend.routers.me_weekly import router as me_weekly_router
    from backend.routers.teacher_stuck import router as teacher_stuck_router

    app = FastAPI()
    app.include_router(notebook_router)
    app.include_router(me_weekly_router)
    app.include_router(teacher_stuck_router)

    async def _db():
        async with factory() as s:
            yield s

    async def _user():
        return SimpleNamespace(id=user_id, role=role, is_active=True)

    app.dependency_overrides[get_db] = _db
    app.dependency_overrides[get_current_user] = _user
    return app


def test_notebook_grouped_and_idor_delete(db_factory):
    from fastapi.testclient import TestClient

    _mk_user(db_factory, USER_A, name="Aarav")
    _mk_user(db_factory, USER_B, name="Diya")
    _miss(db_factory, USER_A, NODE, n=2)

    # A reads own notebook — one group, two open items, titles resolved
    # (never a raw node id in display fields).
    client_a = TestClient(_mini_app(db_factory, USER_A))
    res = client_a.get("/api/me/notebook")
    assert res.status_code == 200
    body = res.json()
    assert body["count"] == 2
    assert len(body["groups"]) == 1
    grp = body["groups"][0]
    assert grp["open"] == 2
    assert NODE not in grp["topic"]           # node id never displayed
    item_id = grp["items"][0]["id"]
    assert grp["items"][0]["correct_path"]["answer"] == "4"

    # B cannot see A's rows…
    client_b = TestClient(_mini_app(db_factory, USER_B))
    res_b = client_b.get("/api/me/notebook")
    assert res_b.status_code == 200
    assert res_b.json()["count"] == 0

    # …and cannot delete A's row either — 403, not a leaking 404
    res_del = client_b.delete(f"/api/me/notebook/{item_id}")
    assert res_del.status_code == 403
    res_gone = client_a.get("/api/me/notebook")
    assert res_gone.json()["count"] == 2  # still there

    # Owner CAN delete own row
    assert client_a.delete(f"/api/me/notebook/{item_id}").status_code == 204
    assert client_a.get("/api/me/notebook").json()["count"] == 1


def test_notebook_requires_auth(db_factory):
    """No token -> 401 (the dep override is absent in this app)."""
    from fastapi import FastAPI
    from fastapi.testclient import TestClient
    from backend.routers.notebook import router as notebook_router

    app = FastAPI()
    app.include_router(notebook_router)
    res = TestClient(app).get("/api/me/notebook")
    assert res.status_code == 401


# --------------------------------------------------------------------------- #
# 5. Weekly card — empty state + real gains
# --------------------------------------------------------------------------- #

def test_weekly_empty_state_shape(db_factory):
    from fastapi.testclient import TestClient

    _mk_user(db_factory, USER_A)
    client = TestClient(_mini_app(db_factory, USER_A))
    res = client.get("/api/me/weekly")
    assert res.status_code == 200
    body = res.json()
    assert body == {"gains": [], "shaky": [], "notebook_count": 0}


def test_weekly_real_gains_and_shaky(db_factory):
    from fastapi.testclient import TestClient

    _mk_user(db_factory, USER_A)
    _miss(db_factory, USER_A, NODE, n=3)
    # a second node climbs this week via the event log: several correct
    # answers inside the window push the replayed BKT posterior up
    node2 = "c9_math_cbse_01_001"
    now = datetime.now(timezone.utc)

    async def _seed():
        async with db_factory() as s:
            for i, ok in enumerate([False, True, True, True, True]):
                await s.execute(_text(
                    "INSERT INTO mastery_event_log "
                    "(dedup_key, student_id, node_id, source, is_correct, "
                    "applied_at) VALUES (:k,:s,:n,'practice',:c,:t)"),
                    {"k": f"t{i}", "s": USER_A, "n": node2, "c": ok,
                     "t": now - timedelta(hours=i)})
            await s.commit()
    _run(_seed())

    client = TestClient(_mini_app(db_factory, USER_A))
    body = client.get("/api/me/weekly").json()
    assert body["notebook_count"] == 3
    assert len(body["shaky"]) == 1
    assert body["shaky"][0]["misses"] == 3
    assert body["shaky"][0]["mode"] == "contrast"
    assert NODE not in body["shaky"][0]["topic"]
    gain = [g for g in body["gains"] if isinstance(g.get("to_pct"), int)]
    assert gain and gain[0]["to_pct"] > gain[0]["from_pct"]


# --------------------------------------------------------------------------- #
# 6. Teacher stuck list — role guard + roster scope
# --------------------------------------------------------------------------- #

def test_teacher_stuck_403_for_student(db_factory):
    from fastapi.testclient import TestClient

    _mk_user(db_factory, USER_A)
    client = TestClient(_mini_app(db_factory, USER_A, role="student"))
    assert client.get("/api/teacher/students/stuck").status_code == 403


def test_teacher_stuck_roster_scoped(db_factory):
    from fastapi.testclient import TestClient

    teacher_id = str(uuid.uuid4())
    class_id = str(uuid.uuid4())
    other_student = str(uuid.uuid4())
    _mk_user(db_factory, teacher_id, name="Mrs Rao", role="teacher")
    _mk_user(db_factory, USER_A, name="Aarav")
    _mk_user(db_factory, other_student, name="NotMyStudent")
    _miss(db_factory, USER_A, NODE, n=4)          # roster student, contrast
    _miss(db_factory, other_student, NODE, n=5)   # NOT on the roster

    async def _seed():
        async with db_factory() as s:
            s.add(struggle._TeacherClass(id=class_id, teacher_id=teacher_id))
            s.add(struggle._ClassEnrollment(
                id=str(uuid.uuid4()), class_id=class_id,
                student_id=USER_A))
            await s.commit()
    _run(_seed())

    client = TestClient(_mini_app(db_factory, teacher_id, role="teacher"))
    res = client.get("/api/teacher/students/stuck")
    assert res.status_code == 200
    body = res.json()
    assert body["teacher_scope"] is True
    names = [s["name"] for s in body["students"]]
    assert names == ["Aarav"]                    # roster only — B excluded
    assert body["students"][0]["misses"] == 4
    assert body["students"][0]["mode"] == "contrast"
    assert NODE not in body["students"][0]["node_title"]


# --------------------------------------------------------------------------- #
# Digest lines
# --------------------------------------------------------------------------- #

def test_digest_lines_plain_language():
    lines = struggle.weekly_digest_lines({
        "gains": [{"topic": "Light — Reflection", "from_pct": 20,
                   "to_pct": 65}],
        "shaky": [{"topic": "Electricity basics"}],
        "notebook_count": 4,
    })
    text = "\n".join(lines)
    assert "Light — Reflection" in text
    assert "20% → 65%" in text
    assert "Electricity basics" in text
    assert struggle.weekly_digest_lines(
        {"gains": [], "shaky": [], "notebook_count": 0}) == []
