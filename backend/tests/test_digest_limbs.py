"""
Tests for the two BUILD_ORDER 2.5.4 digest limbs: DAILY NUDGE and
RENEWAL NOTICE (services/whatsapp_digest.py + workers/main.py wiring).

Covers:
  1. daily nudge eligibility: fires ONLY for a child silent today who
     was active in the last 7 days; a child active today or dormant
     beyond 7 days is never nudged; the real sender under
     WHATSAPP_MOCK=1 composes + logs and marks mock
  2. nudge anti-spam: the silent-day streak stops nudging after 3
     consecutive silent days and only resumes once real activity
     happened; idempotent per UTC day per child (nudge_sent_log);
     failed sends leave no marker so the next day retries
  3. renewal notice: fires for a linked child's parent whose PAID
     entitlement expires inside the window; idempotent per
     (parent, entitlement_id); silent outside the window; honest no-op
     when payments are unconfigured or have no entitlement rows
  4. worker wiring: `daily_nudge` + `renewal_notice` registered in
     HANDLERS and HEAVY_KINDS (deferred outside 02:00-05:00, run
     inside), payload override reaches the run, and the loop scheduler
     enqueues at most one deterministic-id attempt per UTC day per limb

No real WhatsApp, no network, no Docker: send_fn is faked, the DB is a
throwaway aiosqlite file, the queue is the same sqlite jobs fixture the
worker tests use (test_worker_jobs.py / test_weekly_digest.py).
"""

from __future__ import annotations

import asyncio
import os
import sys
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pytest

_BACKEND = Path(__file__).resolve().parent.parent
if str(_BACKEND.parent) not in sys.path:
    sys.path.insert(0, str(_BACKEND.parent))

# Same import-side-effect guard as test_weekly_digest.py: backend.database
# builds its engine at import time, so a parseable URL must exist even
# though these tests inject their own session factory.
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite://")

from backend.services import whatsapp_digest as wd  # noqa: E402
from backend.workers import jobs  # noqa: E402
from backend.workers import main as worker_main  # noqa: E402

T0 = datetime(2026, 10, 4, 3, 0, tzinfo=timezone.utc)
DAY_TAG = "2026-10-04"


def _d(days: float) -> datetime:
    return T0 + timedelta(days=days)


# ---------------------------------------------------------------------------
# Fixtures + fakes
# ---------------------------------------------------------------------------
@pytest.fixture()
def db_factory(tmp_path):
    """Throwaway async sqlite DB with just the tables the limbs touch
    (users, parent_student_links, nudge_sent_log, payment_entitlements,
    renewal_notice_log)."""
    from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
    from sqlalchemy.pool import NullPool

    from backend.models.progress import ActivityLog
    from backend.models.user import User as UserModel
    from backend.modules.payments.models import Entitlement
    from backend.services.auth_service import ParentStudentLinkModel

    # NullPool: each asyncio.run() is a fresh event loop — a pooled
    # aiosqlite connection bound to a dead loop explodes on reuse.
    engine = create_async_engine(f"sqlite+aiosqlite:///{tmp_path / 'limbs.db'}",
                                 poolclass=NullPool)

    def _create(sync_conn):
        for t in (UserModel.__table__, ParentStudentLinkModel.__table__,
                  ActivityLog.__table__, wd.NudgeSentLog.__table__,
                  Entitlement.__table__, wd.RenewalNoticeLog.__table__):
            t.create(sync_conn, checkfirst=True)

    async def _init():
        async with engine.begin() as conn:
            await conn.run_sync(_create)

    asyncio.run(_init())
    factory = async_sessionmaker(engine, expire_on_commit=False)
    yield factory
    engine.sync_engine.dispose()


@pytest.fixture()
def queue(tmp_path):
    """Fresh sqlite-backed job queue per test (same as test_worker_jobs)."""
    jobs.set_url_override(f"sqlite:///{tmp_path / 'jobs.db'}")
    jobs.init_queue()
    yield jobs
    jobs.set_url_override(None)


def _seed_links(factory, links: list[tuple[str, str]],
                names: dict[str, str] | None = None) -> None:
    """Insert user rows (parent + child) and parent_student_links rows."""
    names = names or {}

    async def _go():
        from backend.models.user import User as UserModel
        from backend.services.auth_service import ParentStudentLinkModel

        async with factory() as db:
            users: dict[str, UserModel] = {}
            for pid, cid in links:
                users.setdefault(pid, UserModel(
                    id=uuid.UUID(pid), role="parent",
                    name=names.get(pid, "parent"),
                    phone_number="9999999999"))
                users.setdefault(cid, UserModel(
                    id=uuid.UUID(cid), role="student",
                    name=names.get(cid, f"child-{cid[:6]}"),
                    class_level=6))
            for u in users.values():
                db.add(u)
            for pid, cid in links:
                db.add(ParentStudentLinkModel(
                    parent_id=uuid.UUID(pid), student_id=uuid.UUID(cid)))
            await db.commit()

    asyncio.run(_go())


def _seed_activity(factory, child_id: str, whens: list[datetime],
                   streak_days: int | None = None,
                   last_activity_date=None) -> None:
    """Insert ActivityLog quiz rows (the digest's 'questions answered'
    source) and optionally a stored streak on the user row."""

    async def _go():
        from backend.models.progress import ActivityLog as _AL
        from backend.models.user import User as UserModel
        from sqlalchemy import update as _update

        async with factory() as db:
            for w in whens:
                db.add(_AL(user_id=uuid.UUID(child_id),
                           activity_type="quiz", title="quiz",
                           subject="science", score="correct", created_at=w))
            if streak_days is not None or last_activity_date is not None:
                await db.execute(
                    _update(UserModel)
                    .where(UserModel.id == uuid.UUID(child_id))
                    .values(streak_days=streak_days or 0,
                            last_activity_date=last_activity_date))
            await db.commit()

    asyncio.run(_go())


def _seed_entitlement(factory, user_id: str, tier: str,
                      valid_until: datetime) -> int:
    """Insert a payment_entitlements row; returns its autoincrement id."""

    async def _go():
        from backend.modules.payments.models import Entitlement

        async with factory() as db:
            ent = Entitlement(user_id=uuid.UUID(user_id), tier=tier,
                              valid_until=valid_until)
            db.add(ent)
            await db.commit()
            return int(ent.id)

    return asyncio.run(_go())


def _fake_nudge_send(calls: list, behavior: dict[str, str]):
    """Nudge send_fn fake: (db, parent, child, activity).  behavior:
    child_id -> 'mock' | 'sent' | 'fail-result' | 'fail-raise'."""
    async def _send(db, parent_row, child_row, activity):
        cid = str(child_row.id)
        calls.append(cid)
        act = behavior.get(cid, "mock")
        if act == "fail-raise":
            raise RuntimeError(f"transport exploded for {cid}")
        if act == "fail-result":
            return {"child_id": cid, "sent": False, "mock": False,
                    "reason": "provider 500"}
        if act == "sent":
            return {"child_id": cid, "sent": True, "mock": False,
                    "reason": None}
        return {"child_id": cid, "sent": False, "mock": True,
                "reason": "WHATSAPP_MOCK=1"}
    return _send


def _fake_renewal_send(calls: list, behavior: dict[str, str]):
    """Renewal send_fn fake: (db, parent, ent, child_names, now)."""
    async def _send(db, parent_row, ent, child_names, now):
        pid = str(parent_row.id)
        calls.append((pid, int(ent.id)))
        act = behavior.get(pid, "mock")
        if act == "fail-raise":
            raise RuntimeError(f"transport exploded for {pid}")
        if act == "fail-result":
            return {"parent_id": pid, "entitlement_id": int(ent.id),
                    "sent": False, "mock": False, "reason": "provider 500"}
        if act == "sent":
            return {"parent_id": pid, "entitlement_id": int(ent.id),
                    "sent": True, "mock": False, "reason": None}
        return {"parent_id": pid, "entitlement_id": int(ent.id),
                "sent": False, "mock": True, "reason": "WHATSAPP_MOCK=1"}
    return _send


def _nudge_markers(factory) -> set[tuple[str, str, str, int]]:
    async def _go():
        from sqlalchemy import select as _select
        async with factory() as db:
            rows = (await db.execute(
                _select(wd.NudgeSentLog))).scalars().all()
            return {(r.child_id, r.nudge_date, r.status, r.silent_streak)
                    for r in rows}
    return asyncio.run(_go())


def _renewal_markers(factory) -> set[tuple[str, int, str, int]]:
    async def _go():
        from sqlalchemy import select as _select
        async with factory() as db:
            rows = (await db.execute(
                _select(wd.RenewalNoticeLog))).scalars().all()
            return {(r.parent_id, r.entitlement_id, r.status, r.window_days)
                    for r in rows}
    return asyncio.run(_go())


def _job_row(job_id: str) -> dict:
    import sqlalchemy as sa
    s = jobs.get_session()
    try:
        r = s.execute(sa.text(
            "SELECT id, kind, status, error, run_at FROM jobs "
            "WHERE id=:id"), {"id": job_id}).mappings().first()
        return dict(r) if r else {}
    finally:
        s.close()


@pytest.fixture()
def razorpay_keys(monkeypatch):
    """Pretend the Razorpay order-credential pair is configured."""
    monkeypatch.setenv("RAZORPAY_KEY_ID", "rzp_test_limbs")
    monkeypatch.setenv("RAZORPAY_KEY_SECRET", "limbs-secret")


@pytest.fixture()
def payments_off(monkeypatch):
    """Pretend payments were never configured."""
    monkeypatch.delenv("RAZORPAY_KEY_ID", raising=False)
    monkeypatch.delenv("RAZORPAY_KEY_SECRET", raising=False)


# ---------------------------------------------------------------------------
# 1. Nudge eligibility
# ---------------------------------------------------------------------------
class TestNudgeEligibility:
    def test_fires_when_silent_today_and_active_7d(self, db_factory):
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        _seed_activity(db_factory, a, [_d(-3)])  # active 3 days ago
        calls: list = []

        s = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=T0,
            send_fn=_fake_nudge_send(calls, {})))

        assert s["nudge_date"] == DAY_TAG
        assert s["checked"] == 1
        assert s["mock"] == 1 and s["sent"] == 0
        assert s["failed"] == 0 and s["skipped"] == 0
        assert s["active_today"] == 0 and s["not_eligible"] == 0
        assert s["stopped"] == 0
        assert calls == [a]
        assert _nudge_markers(db_factory) == {(a, DAY_TAG, "mock", 1)}

    def test_no_nudge_when_active_today(self, db_factory):
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        _seed_activity(db_factory, a, [T0 - timedelta(hours=1)])
        calls: list = []

        s = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=T0,
            send_fn=_fake_nudge_send(calls, {})))

        assert s["active_today"] == 1 and s["mock"] == 0
        assert calls == [], "nudged a child who practised today"
        assert _nudge_markers(db_factory) == set()

    def test_no_nudge_when_dormant_beyond_7d(self, db_factory):
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        _seed_activity(db_factory, a, [_d(-10)])  # last seen 10 days ago
        calls: list = []

        s = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=T0,
            send_fn=_fake_nudge_send(calls, {})))

        assert s["not_eligible"] == 1 and s["mock"] == 0
        assert calls == [], "dormant accounts must not be nudged daily"
        assert _nudge_markers(db_factory) == set()

    def test_real_sender_mock_mode_composes_message(self, db_factory,
                                                    monkeypatch):
        """The DEFAULT send path (send_child_nudge) under WHATSAPP_MOCK=1:
        compose + log, send nothing, marker written as mock."""
        monkeypatch.setenv("WHATSAPP_MOCK", "1")
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)],
                    names={a: "Aarav Kumar", p: "Rahul Verma"})
        _seed_activity(db_factory, a, [_d(-3)], streak_days=4,
                       last_activity_date=(T0 - timedelta(days=1)).date())

        s = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=T0))

        assert s["mock"] == 1 and s["sent"] == 0
        markers = _nudge_markers(db_factory)
        assert markers == {(a, DAY_TAG, "mock", 1)}
        # the composed message is logged; verify its content via compose
        # (the send path is mock — nothing left the process)
        msg = wd.compose_nudge(child_name="Aarav Kumar", streak_days=4,
                               streak_state="at_risk")
        assert "Aarav Kumar" in msg and "Streak: 4" in msg
        assert "practice record nahi hui" in msg

    def test_failed_send_leaves_no_marker_and_retries_next_day(
            self, db_factory):
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        _seed_activity(db_factory, a, [_d(-3)])
        calls: list = []
        behavior = {a: "fail-result"}

        s1 = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=T0,
            send_fn=_fake_nudge_send(calls, behavior)))
        assert s1["failed"] == 1 and s1["mock"] == 0
        assert _nudge_markers(db_factory) == set(), \
            "failed send must not mark the day"

        behavior[a] = "mock"
        s2 = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=_d(1),
            send_fn=_fake_nudge_send(calls, behavior)))
        assert calls == [a, a], "child must be retried the next day"
        assert s2["mock"] == 1
        assert _nudge_markers(db_factory) == {(a, "2026-10-05", "mock", 1)}


# ---------------------------------------------------------------------------
# 2. Nudge anti-spam: silent-day streak
# ---------------------------------------------------------------------------
class TestNudgeAntiSpam:
    def test_streak_stops_after_three_silent_days(self, db_factory):
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        # 1 day before the first run: still inside the 7-day eligibility
        # window for EVERY run below (through day 6)
        _seed_activity(db_factory, a, [_d(-1)])
        calls: list = []
        send = _fake_nudge_send(calls, {})

        summaries = [
            asyncio.run(wd.run_daily_nudges(
                session_factory=db_factory, now=_d(n), send_fn=send))
            for n in range(4)
        ]
        assert [s["mock"] for s in summaries] == [1, 1, 1, 0]
        assert summaries[3]["stopped"] == 1, "4th silent day must be stopped"
        assert calls == [a, a, a], "stop after exactly 3 nudges"
        assert _nudge_markers(db_factory) == {
            (a, "2026-10-04", "mock", 1),
            (a, "2026-10-05", "mock", 2),
            (a, "2026-10-06", "mock", 3),
        }

        # day 5 AND day 6 stay stopped while the silence continues
        s5 = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=_d(4), send_fn=send))
        s6 = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=_d(5), send_fn=send))
        assert s5["stopped"] == 1 and s6["stopped"] == 1
        assert calls == [a, a, a], "no further nudges while dormant"

    def test_activity_resumes_the_streak(self, db_factory):
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        _seed_activity(db_factory, a, [_d(-1)])
        calls: list = []
        send = _fake_nudge_send(calls, {})

        for n in range(4):  # days 1-3 fire, day 4 stopped
            asyncio.run(wd.run_daily_nudges(
                session_factory=db_factory, now=_d(n), send_fn=send))
        assert calls == [a, a, a]

        # the child practises on day 5 (after the stopped run) -> the
        # same-day run sees active_today, no nudge, no marker
        _seed_activity(db_factory, a, [_d(4) - timedelta(hours=1)])
        s5 = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=_d(4), send_fn=send))
        assert s5["active_today"] == 1 and calls == [a, a, a]

        # day 6 silent again: activity resumed since the last nudge, so
        # the streak reset and ONE fresh nudge goes out
        s6 = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=_d(5), send_fn=send))
        assert s6["mock"] == 1 and s6["stopped"] == 0
        assert calls == [a, a, a, a]
        assert _nudge_markers(db_factory) == {
            (a, "2026-10-04", "mock", 1),
            (a, "2026-10-05", "mock", 2),
            (a, "2026-10-06", "mock", 3),
            (a, "2026-10-09", "mock", 1),  # streak reset to 1
        }

    def test_idempotent_per_day(self, db_factory):
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        _seed_activity(db_factory, a, [_d(-3)])
        calls: list = []
        send = _fake_nudge_send(calls, {})

        s1 = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=T0, send_fn=send))
        s2 = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=T0 + timedelta(hours=1),
            send_fn=send))

        assert calls == [a], "second same-day run attempted a send"
        assert s1["mock"] == 1 and s2["skipped"] == 1 and s2["mock"] == 0
        assert _nudge_markers(db_factory) == {(a, DAY_TAG, "mock", 1)}

    def test_details_capped_at_20(self, db_factory):
        pairs = [(str(uuid.uuid4()), str(uuid.uuid4())) for _ in range(25)]
        _seed_links(db_factory, pairs)
        for _pid, cid in pairs:
            _seed_activity(db_factory, cid, [_d(-3)])
        calls: list = []

        s = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=T0,
            send_fn=_fake_nudge_send(calls, {})))

        assert s["checked"] == 25 and s["mock"] == 25
        assert len(s["details"]) == 20
        assert s["details_truncated"] == 5

    def test_loop_isolation_child_a_failure_does_not_stop_b(self, db_factory):
        a, b = str(uuid.uuid4()), str(uuid.uuid4())
        p1, p2 = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p1, a), (p2, b)])
        _seed_activity(db_factory, a, [_d(-3)])
        _seed_activity(db_factory, b, [_d(-3)])
        calls: list = []
        send = _fake_nudge_send(calls, {a: "fail-raise"})

        s = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=T0, send_fn=send))

        assert set(calls) == {a, b}, "child B never attempted"
        assert s["failed"] == 1 and s["mock"] == 1
        statuses = {d["child_id"]: d["status"] for d in s["details"]}
        assert statuses[a] == "failed" and statuses[b] == "mock"
        # B has a day-1 marker; A does not.  Day 2: A is retried (the
        # failed send left no marker) while B is legitimately nudged
        # again — the nudge is a DAILY limb, so one processing per day
        # per child is correct, unlike the weekly digest's week-long skip.
        s2 = asyncio.run(wd.run_daily_nudges(
            session_factory=db_factory, now=_d(1), send_fn=send))
        assert calls.count(a) == 2, "A should be retried (no marker)"
        assert calls.count(b) == 2, "B must be processed once per day only"
        assert s2["skipped"] == 0
        assert s2["failed"] == 1 and s2["mock"] == 1
        statuses2 = {d["child_id"]: d["status"] for d in s2["details"]}
        assert statuses2[a] == "failed" and statuses2[b] == "mock"
        assert _nudge_markers(db_factory) == {
            (b, "2026-10-04", "mock", 1),
            (b, "2026-10-05", "mock", 2),
        }


# ---------------------------------------------------------------------------
# 3. Renewal notice
# ---------------------------------------------------------------------------
class TestRenewalNotice:
    def test_noop_when_payments_unconfigured(self, db_factory, payments_off):
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        _seed_entitlement(db_factory, p, "scholar", _d(3))

        s = asyncio.run(wd.run_renewal_notices(
            session_factory=db_factory, now=T0,
            send_fn=_fake_renewal_send([], {})))

        assert s["checked"] == 0
        assert s["reason"] == "payments unconfigured"
        assert s["details"] == []
        assert _renewal_markers(db_factory) == set()

    def test_noop_when_no_entitlement_rows(self, db_factory, razorpay_keys):
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])

        s = asyncio.run(wd.run_renewal_notices(
            session_factory=db_factory, now=T0,
            send_fn=_fake_renewal_send([], {})))

        assert s["checked"] == 0
        assert s["reason"] == "no entitlement rows"

    def test_fires_in_window_and_idempotent_per_entitlement(
            self, db_factory, razorpay_keys):
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        eid = _seed_entitlement(db_factory, p, "scholar", _d(3))
        calls: list = []
        send = _fake_renewal_send(calls, {})

        s1 = asyncio.run(wd.run_renewal_notices(
            session_factory=db_factory, now=T0, send_fn=send))
        assert s1["checked"] == 1 and s1["mock"] == 1 and s1["failed"] == 0
        assert calls == [(p, eid)]
        assert _renewal_markers(db_factory) == {(p, eid, "mock", 7)}

        # same entitlement again: never resent
        s2 = asyncio.run(wd.run_renewal_notices(
            session_factory=db_factory, now=T0, send_fn=send))
        assert calls == [(p, eid)], "resent for the same entitlement"
        assert s2["skipped"] == 1 and s2["mock"] == 0

    def test_silent_outside_window(self, db_factory, razorpay_keys):
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        _seed_entitlement(db_factory, p, "scholar", _d(10))  # 10 days out
        calls: list = []

        s = asyncio.run(wd.run_renewal_notices(
            session_factory=db_factory, now=T0,
            send_fn=_fake_renewal_send(calls, {})))

        assert s["checked"] == 0 and s["reason"] is None
        assert calls == []

    def test_free_tier_and_past_expiry_not_noticed(self, db_factory,
                                                   razorpay_keys):
        a, p1 = str(uuid.uuid4()), str(uuid.uuid4())
        _b, p2 = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p1, a), (p2, _b)])
        _seed_entitlement(db_factory, p1, "free", _d(3))     # not paid
        _seed_entitlement(db_factory, p2, "topper", _d(-1))  # already lapsed
        calls: list = []

        s = asyncio.run(wd.run_renewal_notices(
            session_factory=db_factory, now=T0,
            send_fn=_fake_renewal_send(calls, {})))

        assert s["checked"] == 0 and calls == []
        assert _renewal_markers(db_factory) == set()

    def test_unlinked_parent_entitlement_not_noticed(self, db_factory,
                                                     razorpay_keys):
        loner = str(uuid.uuid4())  # an entitlement with no linked child
        _seed_entitlement(db_factory, loner, "scholar", _d(2))
        calls: list = []

        s = asyncio.run(wd.run_renewal_notices(
            session_factory=db_factory, now=T0,
            send_fn=_fake_renewal_send(calls, {})))

        assert s["checked"] == 0 and calls == []

    def test_window_days_override(self, db_factory, razorpay_keys):
        # one entitlement row per user (user_id UNIQUE), so the two
        # window checks use two parents
        a, p1 = str(uuid.uuid4()), str(uuid.uuid4())
        b, p2 = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p1, a), (p2, b)])
        _seed_entitlement(db_factory, p1, "scholar", _d(5))    # 5 days out
        e2 = _seed_entitlement(db_factory, p2, "topper", _d(2))  # 2 days out
        calls: list = []
        send = _fake_renewal_send(calls, {})

        out = asyncio.run(wd.run_renewal_notices(
            session_factory=db_factory, now=T0, send_fn=send, window_days=3))
        assert out["checked"] == 1 and out["window_days"] == 3
        assert calls == [(p2, e2)], \
            "5 days out must not fire inside a 3-day window"
        assert _renewal_markers(db_factory) == {(p2, e2, "mock", 3)}

    def test_real_compose_mock_mode(self, db_factory, razorpay_keys,
                                    monkeypatch):
        """The DEFAULT send path (send_renewal_notice) under
        WHATSAPP_MOCK=1: compose + log, send nothing, marker written."""
        monkeypatch.setenv("WHATSAPP_MOCK", "1")
        a, p = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)],
                    names={a: "Priya Sharma", p: "Rahul Verma"})
        eid = _seed_entitlement(db_factory, p, "scholar", _d(3))

        s = asyncio.run(wd.run_renewal_notices(
            session_factory=db_factory, now=T0))

        assert s["mock"] == 1 and s["sent"] == 0 and s["failed"] == 0
        assert _renewal_markers(db_factory) == {(p, eid, "mock", 7)}
        msg = wd.compose_renewal(
            parent_name="Rahul Verma", tier="scholar",
            valid_until=_d(3), days_left=3, child_names=["Priya"])
        assert "Scholar" in msg and "Namaste Rahul" in msg
        assert "Priya" in msg and "renew" in msg

    def test_loop_isolation_parent_failure_does_not_stop_sibling(
            self, db_factory, razorpay_keys):
        a, b = str(uuid.uuid4()), str(uuid.uuid4())
        p1, p2 = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p1, a), (p2, b)])
        e1 = _seed_entitlement(db_factory, p1, "scholar", _d(3))
        e2 = _seed_entitlement(db_factory, p2, "topper", _d(4))
        calls: list = []
        send = _fake_renewal_send(calls, {p1: "fail-raise"})

        s = asyncio.run(wd.run_renewal_notices(
            session_factory=db_factory, now=T0, send_fn=send))

        assert set(calls) == {(p1, e1), (p2, e2)}, "parent 2 never attempted"
        assert s["failed"] == 1 and s["mock"] == 1
        assert _renewal_markers(db_factory) == {(p2, e2, "mock", 7)}, \
            "failed send left no marker"

        s2 = asyncio.run(wd.run_renewal_notices(
            session_factory=db_factory, now=T0, send_fn=send))
        assert calls.count((p2, e2)) == 1, "p2 double-processed"
        assert calls.count((p1, e1)) == 2, "p1 should be retried"
        assert s2["skipped"] == 1 and s2["failed"] == 1


# ---------------------------------------------------------------------------
# 4. Worker wiring: HANDLERS + heavy window + scheduler
# ---------------------------------------------------------------------------
class TestWorkerWiring:
    def test_handlers_registered(self):
        for kind in ("daily_nudge", "renewal_notice"):
            assert kind in worker_main.HANDLERS
            # FOOLPROOF-MESSAGING 2026-10-05: limbs are SEND kinds now —
            # message sends live in SEND_KINDS, not HEAVY_KINDS
            assert kind in worker_main.SEND_KINDS
            assert kind not in worker_main.HEAVY_KINDS
        assert worker_main.HANDLERS["daily_nudge"] is worker_main.daily_nudge
        assert (worker_main.HANDLERS["renewal_notice"]
                is worker_main.renewal_notice)

    @pytest.mark.parametrize("kind", ["daily_nudge", "renewal_notice"])
    def test_limb_runs_inside_heavy_window(self, queue, monkeypatch, kind):
        # 2026-10-05: limbs are SEND kinds — the IST send window governs
        monkeypatch.delenv("WORKER_ALLOW_HEAVY", raising=False)
        now = datetime.now(timezone.utc).astimezone(
            timezone(timedelta(hours=5, minutes=30)))
        monkeypatch.setattr(worker_main, "_ist_now", lambda: now)
        monkeypatch.setattr(worker_main, "_window_bounds",
                            lambda now_, w: (True, now_))
        jid = queue.enqueue(kind, {})
        job = queue.claim("w1")
        assert job is not None
        ran: list = []
        w = worker_main.Worker(
            worker_id="w1",
            handlers={kind: lambda p: ran.append(p) or {"ok": True}})
        w.run_job(job)
        assert _job_row(jid)["status"] == "done", _job_row(jid)
        assert ran == [{}], f"{kind} did not run inside the window"

    @pytest.mark.parametrize("kind", ["daily_nudge", "renewal_notice"])
    def test_limb_deferred_outside_heavy_window(self, queue, monkeypatch,
                                                kind):
        monkeypatch.delenv("WORKER_ALLOW_HEAVY", raising=False)
        # Clock-relative, deliberately NOT a hardcoded date: the guard
        # defers to whatever next_start _heavy_window_bounds returns, so
        # it must be in the future relative to the REAL clock for the
        # run_at gate to hold (a fixed date date-bombs the suite).
        next_start = datetime.now(timezone.utc) + timedelta(days=1)
        monkeypatch.setattr(worker_main, "_ist_now", lambda: datetime.now(
            timezone.utc).astimezone(timezone(timedelta(hours=5, minutes=30))))
        monkeypatch.setattr(worker_main, "_window_bounds",
                            lambda now_, w: (False, next_start.astimezone(
                                timezone(timedelta(hours=5, minutes=30)))))
        jid = queue.enqueue(kind, {})
        job = queue.claim("w1")
        ran: list = []
        w = worker_main.Worker(worker_id="w1", handlers={kind: lambda p: ran.append(p)})
        w.run_job(job)
        assert ran == [], f"{kind} ran outside the heavy window"
        row = _job_row(jid)
        assert row["status"] == "pending"
        assert "deferred" in (row["error"] or "")
        assert queue.claim("w2") is None
        job2 = queue.claim("w2", now=next_start + timedelta(seconds=1))
        assert job2 is not None and job2["id"] == jid

    def test_daily_nudge_handler_calls_run(self, monkeypatch):
        async def fake_run(*, session_factory=None, send_fn=None, now=None):
            return {"nudge_date": DAY_TAG, "checked": 0, "sent": 0,
                    "mock": 0, "failed": 0, "skipped": 0, "active_today": 0,
                    "not_eligible": 0, "stopped": 0, "details": []}

        monkeypatch.setattr(wd, "run_daily_nudges", fake_run)
        monkeypatch.setattr(worker_main, "_write_state",
                            lambda name, data: f"<stub:{name}>")
        out = worker_main.daily_nudge({})
        assert out["nudge_date"] == DAY_TAG

    def test_renewal_payload_window_days_reaches_run(self, monkeypatch):
        seen: dict = {}

        async def fake_run(*, session_factory=None, send_fn=None, now=None,
                           window_days=None):
            seen["window_days"] = window_days
            return {"window_days": window_days, "checked": 0, "sent": 0,
                    "mock": 0, "failed": 0, "skipped": 0, "reason": None,
                    "details": []}

        monkeypatch.setattr(wd, "run_renewal_notices", fake_run)
        monkeypatch.setattr(worker_main, "_write_state",
                            lambda name, data: f"<stub:{name}>")
        out = worker_main.renewal_notice({"window_days": 5})
        assert seen["window_days"] == 5
        assert out["checked"] == 0

    # -- scheduler -------------------------------------------------------- #
    def test_scheduler_deterministic_ids_once_per_day(self, queue):
        jid = worker_main.maybe_enqueue_daily_limb("daily_nudge", now=T0)
        assert jid == "daily_nudge-20261004"
        assert queue.job_exists(jid)
        assert _job_row(jid)["kind"] == "daily_nudge"
        # same day: the deterministic id already exists -> no second enqueue
        assert worker_main.maybe_enqueue_daily_limb(
            "daily_nudge", now=T0 + timedelta(hours=5)) is None
        # next day: a fresh attempt (marker tables still rule the sends)
        jid2 = worker_main.maybe_enqueue_daily_limb(
            "daily_nudge", now=_d(1))
        assert jid2 == "daily_nudge-20261005" and jid2 != jid

        jid3 = worker_main.maybe_enqueue_daily_limb("renewal_notice", now=T0)
        assert jid3 == "renewal_notice-20261004"
        assert _job_row(jid3)["kind"] == "renewal_notice"
        assert worker_main.maybe_enqueue_daily_limb(
            "renewal_notice", now=T0 + timedelta(hours=5)) is None

    def test_worker_tick_gated_on_handler_registry(self, queue):
        # a worker whose registry lacks the limbs never schedules them
        w_none = worker_main.Worker(worker_id="t1", handlers={"x": lambda p: {}})
        w_none._sched_digest_limbs_tick()
        assert queue.counts()["pending"] == 0

        # a single-limb worker schedules exactly that limb (ids come from
        # the REAL clock via daily_limb_job_id — asserted, not hardcoded)
        w_a = worker_main.Worker(worker_id="t2",
                                 handlers={"daily_nudge": lambda p: {}})
        w_a._sched_digest_limbs_tick()
        assert queue.counts()["pending"] == 1

        w_b = worker_main.Worker(worker_id="t3",
                                 handlers={"renewal_notice": lambda p: {}})
        w_b._sched_digest_limbs_tick()
        assert queue.counts()["pending"] == 2
        assert queue.job_exists(worker_main.daily_limb_job_id("daily_nudge"))
        assert queue.job_exists(
            worker_main.daily_limb_job_id("renewal_notice"))

        # hourly gate: immediate second ticks enqueue nothing new
        w_a._sched_digest_limbs_tick()
        w_b._sched_digest_limbs_tick()
        assert queue.counts()["pending"] == 2

    def test_scheduler_never_raises_on_queue_failure(self, monkeypatch):
        def boom(*a, **k):
            raise RuntimeError("db down")
        monkeypatch.setattr(worker_main.jobs, "job_exists", boom)
        assert worker_main.maybe_enqueue_daily_limb("daily_nudge") is None
        assert worker_main.maybe_enqueue_daily_limb("renewal_notice") is None


# ---------------------------------------------------------------------------
# 5. Compose units (honesty: only real numbers make it into a message)
# ---------------------------------------------------------------------------
class TestCompose:
    def test_nudge_shows_streak_only_when_at_risk(self):
        at_risk = wd.compose_nudge("Aarav", 4, "at_risk")
        assert "Streak: 4" in at_risk
        lapsed = wd.compose_nudge("Aarav", 9, "lapsed")
        assert "Streak:" not in lapsed, "a lapsed streak shown as alive"
        none_state = wd.compose_nudge("Aarav", 0, "none")
        assert "Streak:" not in none_state

    def test_renewal_wording(self):
        msg = wd.compose_renewal(
            parent_name="Rahul", tier="topper", valid_until=_d(3),
            days_left=3, child_names=["Priya", "Aarav"])
        assert "Topper" in msg and "3 din baad" in msg
        assert "cancel" not in msg
        soon = wd.compose_renewal(
            parent_name="Rahul", tier="scholar", valid_until=_d(0.5),
            days_left=0, child_names=[])
        assert "aaj/kal" in soon
        cancelled = wd.compose_renewal(
            parent_name="Rahul", tier="scholar", valid_until=_d(2),
            days_left=2, child_names=[], cancelled=True)
        assert "cancel kiya hai" in cancelled
