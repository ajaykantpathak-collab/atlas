"""test_ovh_legal.py — WS-LEGAL: parental consent, account deletion,
self-service data export, and the 30-day purge.

Runs fully offline: a minimal FastAPI app mounts ONLY routers/auth.py,
with get_db overridden to a throwaway sqlite file per test.  No Docker,
no Postgres, no Redis (the login rate-limiter fails open without it),
no real email (the mailer composes + logs; consent_status stays
'pending' — that honest degradation is itself asserted here).

Covers the brief's test list:
  * happy path: signup w/ consent -> login -> delete-account -> row state
  * wrong password -> 4xx
  * deleted account can't log in (401) and its old access token dies (403)
  * refresh tokens revoked
  * GET /api/auth/my-data returns ONLY the requester's rows
  * DPDP signup validation: student needs parent_email + consent (422);
    teacher doesn't
  * run_account_purge: expired -> all residual rows gone; unexpired ->
    survives
"""
from __future__ import annotations

import os
import sys
import uuid
from datetime import datetime, timedelta, timezone

import pytest
import pytest_asyncio

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import (
    AsyncSession, async_sessionmaker, create_async_engine,
)
from sqlalchemy import select, delete

from fastapi import FastAPI


PASSWORD = "ParentPass123!"


# ---------------------------------------------------------------------------
# Fixture: minimal app + throwaway sqlite
# ---------------------------------------------------------------------------

@pytest_asyncio.fixture
async def stack(tmp_path):
    from backend.database import Base, get_db
    from backend.routers import auth as auth_router
    import backend.models.user  # noqa: F401 — registers User on flat Base
    import backend.services.auth_service  # noqa: F401 — refresh/otp/link models

    engine = create_async_engine(f"sqlite+aiosqlite:///{tmp_path}/legal.db")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    SessionLocal = async_sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False)

    async def _get_db():
        async with SessionLocal() as s:
            try:
                yield s
                await s.commit()
            except Exception:
                await s.rollback()
                raise

    app = FastAPI()
    app.dependency_overrides[get_db] = _get_db
    app.include_router(auth_router.router)

    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        yield client, SessionLocal

    await engine.dispose()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


async def _signup_student(client: AsyncClient, email: str) -> dict:
    res = await client.post("/api/auth/signup", json={
        "name": "Legal Probe", "email": email, "password": PASSWORD,
        "role": "student", "classLevel": 9,
        "parentEmail": "parent.probe@example.com",
        "parentConsent": True,
    })
    assert res.status_code == 201, res.text
    return res.json()


async def _login(client: AsyncClient, email: str, password: str = PASSWORD):
    return await client.post("/api/auth/login",
                             json={"email": email, "password": password})


async def _make_user(SessionLocal, *, email: str, name: str,
                     is_active: bool = True, deletion_purge_at=None,
                     deleted_at=None):
    """Insert a users row directly (for purge tests)."""
    from backend.models.user import User
    from backend.security import hash_password
    u = User(
        email=email, name=name, password_hash=hash_password(PASSWORD),
        role="student", is_active=is_active,
        deletion_purge_at=deletion_purge_at, deleted_at=deleted_at,
    )
    async with SessionLocal() as s:
        s.add(u)
        await s.commit()
        return u.id


async def _make_student_rows(SessionLocal, uid, *, with_attempt=True):
    """Mirror-row (upsert — signup provisions it already) + one attempt +
    one mastery row for a user id."""
    from backend.database import Attempt, Mastery, Student
    from backend.services.auth_service import RefreshTokenModel
    topic_id = uuid.uuid4()
    async with SessionLocal() as s:
        if (await s.get(Student, uid)) is None:
            s.add(Student(id=uid, name="Probe Student", student_class="9"))
        if with_attempt:
            s.add(Attempt(student_id=uid, topic_id=topic_id,
                          subject="phy", answer={"x": 1}, correct=True,
                          time_ms=1200))
            s.add(Mastery(student_id=uid, topic_id=topic_id,
                          bkt_p_know=0.7))
        s.add(RefreshTokenModel(
            user_id=uid, token_jti=uuid.uuid4().hex,
            expires_at=datetime.now(timezone.utc) + timedelta(days=1)))
        await s.commit()


# ---------------------------------------------------------------------------
# DPDP parental consent — signup validation + storage
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_student_signup_requires_parent_email_and_consent(stack):
    client, _ = stack
    # Missing both fields -> 422 (schema validation, never reaches register)
    res = await client.post("/api/auth/signup", json={
        "name": "No Consent", "email": "noconsent@example.com",
        "password": PASSWORD, "role": "student", "classLevel": 8,
    })
    assert res.status_code == 422

    # parent_email present, consent box unticked -> still 422
    res = await client.post("/api/auth/signup", json={
        "name": "No Consent", "email": "noconsent@example.com",
        "password": PASSWORD, "role": "student", "classLevel": 8,
        "parentEmail": "parent@example.com",
    })
    assert res.status_code == 422

    # consent false -> 422
    res = await client.post("/api/auth/signup", json={
        "name": "No Consent", "email": "noconsent@example.com",
        "password": PASSWORD, "role": "student", "classLevel": 8,
        "parentEmail": "parent@example.com", "parentConsent": False,
    })
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_teacher_signup_needs_no_parent_fields(stack):
    client, _ = stack
    res = await client.post("/api/auth/signup", json={
        "name": "Adult Teacher", "email": "teacher.probe@example.com",
        "password": PASSWORD, "role": "teacher",
    })
    assert res.status_code == 201, res.text


@pytest.mark.asyncio
async def test_student_signup_stores_consent_pending(stack):
    """Consent recorded; status 'pending' because no SMTP relay exists
    (honest degradation — the notice is composed + logged, not delivered)."""
    client, SessionLocal = stack
    body = await _signup_student(client, "consent.probe@example.com")

    from backend.models.user import User
    async with SessionLocal() as s:
        user = (await s.execute(
            select(User).where(User.id == uuid.UUID(body["user"]["id"]))
        )).scalar_one()
        assert user.parent_email == "parent.probe@example.com"
        assert user.parent_consent_at is not None
        assert user.consent_method == "signup_checkbox"
        assert user.consent_status == "pending"


# ---------------------------------------------------------------------------
# Account deletion
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_delete_account_happy_path(stack):
    client, SessionLocal = stack
    body = await _signup_student(client, "del.probe@example.com")
    token, refresh, uid = (body["access_token"], body["refresh_token"],
                           body["user"]["id"])
    await _make_student_rows(SessionLocal, uuid.UUID(uid))

    res = await client.post("/api/auth/delete-account",
                            json={"password": PASSWORD,
                                  "confirmation": "DELETE"},
                            headers=_auth(token))
    assert res.status_code == 200, res.text
    out = res.json()
    assert out["status"] == "ok"

    # Row state per the documented choice: PII anonymised, account
    # deactivated, 30-day purge stamp, learning rows still present.
    from backend.database import Attempt, Student
    from backend.models.user import User
    from backend.services.auth_service import RefreshTokenModel
    async with SessionLocal() as s:
        user = (await s.execute(
            select(User).where(User.id == uuid.UUID(uid)))).scalar_one()
        assert user.is_active is False
        assert user.email == f"deleted_{uid}@deleted.local"
        assert user.name is None
        assert user.password_hash is None
        assert user.parent_email is None
        assert user.deleted_at is not None
        assert user.deletion_purge_at is not None
        delta = user.deletion_purge_at - user.deleted_at
        assert 29 <= delta.days <= 30

        student = await s.get(Student, uuid.UUID(uid))
        assert student is not None and student.is_active is False
        assert student.name.startswith("Deleted student")

        # attempts KEPT for the recovery window (documented retention)
        attempts = (await s.execute(
            select(Attempt).where(Attempt.student_id == uuid.UUID(uid))
        )).scalars().all()
        assert len(attempts) == 1

        # every refresh token revoked
        toks = (await s.execute(
            select(RefreshTokenModel).where(
                RefreshTokenModel.user_id == uuid.UUID(uid)))
        ).scalars().all()
        assert toks == []


@pytest.mark.asyncio
async def test_delete_account_wrong_password_4xx(stack):
    client, _ = stack
    body = await _signup_student(client, "wrongpw@example.com")
    res = await client.post("/api/auth/delete-account",
                            json={"password": "not-the-password",
                                  "confirmation": "DELETE"},
                            headers=_auth(body["access_token"]))
    assert 400 <= res.status_code < 500


@pytest.mark.asyncio
async def test_delete_account_requires_delete_confirmation(stack):
    client, _ = stack
    body = await _signup_student(client, "noconfirm@example.com")
    res = await client.post("/api/auth/delete-account",
                            json={"password": PASSWORD},
                            headers=_auth(body["access_token"]))
    assert 400 <= res.status_code < 500


@pytest.mark.asyncio
async def test_deleted_account_cannot_login_and_tokens_die(stack):
    client, _ = stack
    body = await _signup_student(client, "dead.login@example.com")
    token, refresh = body["access_token"], body["refresh_token"]

    res = await client.post("/api/auth/delete-account",
                            json={"password": PASSWORD,
                                  "confirmation": "DELETE"},
                            headers=_auth(token))
    assert res.status_code == 200

    # old access token: get_current_user rejects inactive accounts (403)
    res = await client.get("/api/auth/me", headers=_auth(token))
    assert res.status_code in (401, 403)

    # refresh token: all rows were deleted -> 401
    res = await client.post("/api/auth/refresh",
                            json={"refresh_token": refresh})
    assert res.status_code == 401

    # email was anonymised -> no password path back in (401 either way)
    res = await _login(client, "dead.login@example.com")
    assert res.status_code == 401


# ---------------------------------------------------------------------------
# Self-service data export
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_my_data_returns_only_own_rows(stack):
    client, SessionLocal = stack
    mine = await _signup_student(client, "export.mine@example.com")
    theirs = await _signup_student(client, "export.theirs@example.com")

    my_uid = uuid.UUID(mine["user"]["id"])
    their_uid = uuid.UUID(theirs["user"]["id"])
    await _make_student_rows(SessionLocal, my_uid)
    await _make_student_rows(SessionLocal, their_uid)

    res = await client.get("/api/auth/my-data",
                           headers=_auth(mine["access_token"]))
    assert res.status_code == 200, res.text
    data = res.json()

    assert data["schema"] == "atlas.mydata.v1"
    assert data["profile"]["email"] == "export.mine@example.com"
    assert data["profile"]["parent_email"] == "parent.probe@example.com"
    assert data["student_profile"]["id"] == str(my_uid)

    attempt_ids = {a["id"] for a in data["attempts"]}
    mastery_ids = {m["id"] for m in data["mastery"]}
    assert len(attempt_ids) == 1 and len(mastery_ids) == 1

    # Their rows are absent — verify against the DB directly
    from backend.database import Attempt
    async with SessionLocal() as s:
        their_attempts = (await s.execute(
            select(Attempt.id).where(Attempt.student_id == their_uid)
        )).scalars().all()
    assert their_attempts
    for aid in their_attempts:
        assert str(aid) not in attempt_ids


@pytest.mark.asyncio
async def test_my_data_requires_auth(stack):
    client, _ = stack
    res = await client.get("/api/auth/my-data")
    assert res.status_code == 401


# ---------------------------------------------------------------------------
# 30-day purge (worker job body, exercised directly on the same sqlite)
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_account_purge_removes_expired_and_spares_pending(stack):
    _, SessionLocal = stack
    now = datetime.now(timezone.utc)

    # Expired deletion: past purge date
    expired_id = await _make_user(
        SessionLocal, email="deleted_expired@deleted.local", name=None,
        is_active=False, deleted_at=now - timedelta(days=31),
        deletion_purge_at=now - timedelta(days=1))
    await _make_student_rows(SessionLocal, expired_id)

    # Inside the window: must survive
    pending_id = await _make_user(
        SessionLocal, email="deleted_pending@deleted.local", name=None,
        is_active=False, deleted_at=now - timedelta(days=2),
        deletion_purge_at=now + timedelta(days=28))
    await _make_student_rows(SessionLocal, pending_id)

    # A live account must never be touched
    live_id = await _make_user(
        SessionLocal, email="live.user@example.com", name="Live")
    await _make_student_rows(SessionLocal, live_id)

    from backend.services.account_lifecycle import run_account_purge
    summary = await run_account_purge(session_factory=SessionLocal)
    assert summary["purged"] == 1
    assert summary["purged_ids"] == [str(expired_id)]

    from backend.database import Attempt, Student
    from backend.models.user import User
    from backend.services.auth_service import RefreshTokenModel
    async with SessionLocal() as s:
        for model, col in ((User, User.id), (Student, Student.id),
                           (Attempt, Attempt.student_id),
                           (RefreshTokenModel, RefreshTokenModel.user_id)):
            rows = (await s.execute(
                select(model).where(col == expired_id))).scalars().all()
            assert rows == [], f"{model.__tablename__} rows survived purge"

        # pending + live accounts intact
        assert (await s.get(User, pending_id)) is not None
        assert (await s.get(User, live_id)) is not None
        assert (await s.get(Student, pending_id)) is not None
        assert (await s.get(Student, live_id)) is not None
        live_attempts = (await s.execute(
            select(Attempt).where(Attempt.student_id == live_id)
        )).scalars().all()
        assert len(live_attempts) == 1
