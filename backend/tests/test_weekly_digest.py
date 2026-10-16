"""
Tests for the weekly WhatsApp parent digest worker job (DIGEST-CRON).

Covers:
  1. the digest_sent_log dedup marker: a second run in the same ISO week
     sends NOTHING (every already-served child is skipped silently and
     counted), while a new ISO week sends again
  2. loop isolation: child A failing (raised exception OR provider
     error result) must not stop child B; failures leave no marker so
     the next daily attempt retries them
  3. worker wiring: `weekly_digest` is registered in HANDLERS, is a
     heavy-window kind (deferred outside 02:00-05:00, runs inside), the
     payload override reaches run_weekly_digest, and the loop scheduler
     enqueues at most one attempt per UTC day (and never for worker
     registries that don't run the handler)

No real WhatsApp, no network: send_fn is faked, the DB is a throwaway
aiosqlite file, the queue is the same sqlite jobs fixture the worker
tests use (test_worker_jobs.py).
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

# The database package (backend/database/__init__.py) builds its async
# engine at IMPORT time from settings; outside the container no
# DATABASE_URL is exported and the cwd-relative .env lookup can miss
# (running pytest from deploy/backend/), which crashes collection with
# "Could not parse SQLAlchemy URL".  A parseable in-memory sqlite URL
# keeps that import side-effect free — these tests never touch that
# engine, they inject their own session factory.
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite://")

from backend.services import whatsapp_digest as wd  # noqa: E402
from backend.workers import jobs  # noqa: E402
from backend.workers import main as worker_main  # noqa: E402

W40 = "2026-W40"
W41 = "2026-W41"


# ---------------------------------------------------------------------------
# Fixtures + fakes
# ---------------------------------------------------------------------------
@pytest.fixture()
def db_factory(tmp_path):
    """Throwaway async sqlite DB with just the three tables the digest
    run touches (users, parent_student_links, digest_sent_log)."""
    from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
    from sqlalchemy.pool import NullPool

    from backend.models.user import User as UserModel
    from backend.services.auth_service import ParentStudentLinkModel

    # NullPool: each asyncio.run() in these tests is a fresh event loop —
    # a pooled aiosqlite connection bound to a dead loop explodes on
    # reuse.  NullPool opens/closes per operation instead.
    engine = create_async_engine(f"sqlite+aiosqlite:///{tmp_path / 'digest.db'}",
                                 poolclass=NullPool)

    def _create(sync_conn):
        for t in (UserModel.__table__, ParentStudentLinkModel.__table__,
                  wd.DigestSentLog.__table__):
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


def _seed_links(factory, links: list[tuple[str, str]]) -> None:
    """Insert user rows (parent + child) and parent_student_links rows."""

    async def _go():
        from backend.models.user import User as UserModel
        from backend.services.auth_service import ParentStudentLinkModel

        async with factory() as db:
            users: dict[str, UserModel] = {}
            for pid, cid in links:
                users.setdefault(pid, UserModel(
                    id=uuid.UUID(pid), name="parent", role="parent",
                    phone_number="9999999999"))
                users.setdefault(cid, UserModel(
                    id=uuid.UUID(cid), name=f"child-{cid[:6]}",
                    role="student", class_level=6))
            for u in users.values():
                db.add(u)
            for pid, cid in links:
                db.add(ParentStudentLinkModel(
                    parent_id=uuid.UUID(pid), student_id=uuid.UUID(cid)))
            await db.commit()

    asyncio.run(_go())


def _fake_send(calls: list, behavior: dict[str, str]):
    """send_fn fake.  behavior: child_id -> 'mock' | 'sent' |
    'fail-result' (provider error, sent=False) | 'fail-raise' (exception
    escapes — the case loop isolation must survive)."""
    async def _send(db, parent_row, child_row):
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


def _markers(factory) -> set[tuple[str, str, str]]:
    async def _go():
        from sqlalchemy import select as _select
        async with factory() as db:
            rows = (await db.execute(
                _select(wd.DigestSentLog))).scalars().all()
            return {(r.child_id, r.iso_week, r.status) for r in rows}
    return asyncio.run(_go())


# ---------------------------------------------------------------------------
# 1. Dedup marker: never double-send within an ISO week
# ---------------------------------------------------------------------------
class TestDedupMarker:
    def test_second_run_same_week_sends_nothing(self, db_factory):
        a, b = str(uuid.uuid4()), str(uuid.uuid4())
        p1, p2 = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p1, a), (p2, b)])
        calls: list = []
        send = _fake_send(calls, {a: "mock", b: "mock"})

        s1 = asyncio.run(wd.run_weekly_digest(
            session_factory=db_factory, send_fn=send, iso_week=W40))
        assert s1["checked"] == 2
        assert s1["mock"] == 2 and s1["sent"] == 0
        assert s1["failed"] == 0 and s1["skipped"] == 0
        assert calls == [a, b]

        # SAME week again: the marker is the source of truth — no sends.
        s2 = asyncio.run(wd.run_weekly_digest(
            session_factory=db_factory, send_fn=send, iso_week=W40))
        assert calls == [a, b], "second same-week run attempted a send"
        assert s2["checked"] == 2
        assert s2["skipped"] == 2
        assert s2["sent"] == 0 and s2["mock"] == 0 and s2["failed"] == 0
        statuses = {d["child_id"]: d["status"] for d in s2["details"]}
        assert statuses == {a: "skipped", b: "skipped"}

        # marker rows: one per (child, week), status mock
        assert _markers(db_factory) == {(a, W40, "mock"), (b, W40, "mock")}

    def test_new_iso_week_sends_again(self, db_factory):
        a = str(uuid.uuid4())
        p = str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        calls: list = []
        send = _fake_send(calls, {a: "mock"})

        asyncio.run(wd.run_weekly_digest(
            session_factory=db_factory, send_fn=send, iso_week=W40))
        s2 = asyncio.run(wd.run_weekly_digest(
            session_factory=db_factory, send_fn=send, iso_week=W41))
        assert s2["mock"] == 1 and s2["skipped"] == 0
        assert calls == [a, a]
        assert _markers(db_factory) == {(a, W40, "mock"), (a, W41, "mock")}

    def test_real_send_marks_sent_and_skips(self, db_factory):
        a = str(uuid.uuid4())
        p = str(uuid.uuid4())
        _seed_links(db_factory, [(p, a)])
        calls: list = []
        send = _fake_send(calls, {a: "sent"})

        s1 = asyncio.run(wd.run_weekly_digest(
            session_factory=db_factory, send_fn=send, iso_week=W40))
        assert s1["sent"] == 1 and s1["mock"] == 0
        s2 = asyncio.run(wd.run_weekly_digest(
            session_factory=db_factory, send_fn=send, iso_week=W40))
        assert s2["skipped"] == 1 and calls == [a]
        assert _markers(db_factory) == {(a, W40, "sent")}

    def test_iso_week_tag_format(self):
        # 2026-10-04 is the Sunday of ISO week 40
        assert wd.iso_week_tag(
            datetime(2026, 10, 4, 12, 0, tzinfo=timezone.utc)) == W40
        assert wd.iso_week_tag(
            datetime(2026, 10, 5, 0, 0, tzinfo=timezone.utc)) == W41


# ---------------------------------------------------------------------------
# 2. Loop isolation
# ---------------------------------------------------------------------------
class TestLoopIsolation:
    def test_raised_exception_does_not_stop_sibling(self, db_factory):
        a, b = str(uuid.uuid4()), str(uuid.uuid4())
        p1, p2 = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p1, a), (p2, b)])
        calls: list = []
        send = _fake_send(calls, {a: "fail-raise", b: "mock"})

        s = asyncio.run(wd.run_weekly_digest(
            session_factory=db_factory, send_fn=send, iso_week=W40))
        assert set(calls) == {a, b}, "child B never attempted"
        assert s["failed"] == 1 and s["mock"] == 1 and s["sent"] == 0
        statuses = {d["child_id"]: d["status"] for d in s["details"]}
        assert statuses[a] == "failed" and statuses[b] == "mock"
        assert "transport exploded" in (
            [d["reason"] for d in s["details"]
             if d["child_id"] == a][0] or "")

        # B has a marker; A does not -> retry hits only A
        s2 = asyncio.run(wd.run_weekly_digest(
            session_factory=db_factory, send_fn=send, iso_week=W40))
        assert calls.count(b) == 1, "B double-processed after A failed"
        assert calls.count(a) == 2, "A should be retried (no marker)"
        assert s2["skipped"] == 1 and s2["failed"] == 1

    def test_provider_error_result_does_not_stop_sibling(self, db_factory):
        a, b = str(uuid.uuid4()), str(uuid.uuid4())
        p1, p2 = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p1, a), (p2, b)])
        calls: list = []
        send = _fake_send(calls, {a: "fail-result", b: "sent"})

        s = asyncio.run(wd.run_weekly_digest(
            session_factory=db_factory, send_fn=send, iso_week=W40))
        assert set(calls) == {a, b}
        assert s["failed"] == 1 and s["sent"] == 1
        statuses = {d["child_id"]: d["status"] for d in s["details"]}
        assert statuses[a] == "failed" and statuses[b] == "sent"
        # failure left NO marker: only B is logged for the week
        assert _markers(db_factory) == {(b, W40, "sent")}

    def test_missing_linked_user_row_is_failed_not_fatal(self, db_factory):
        a, b = str(uuid.uuid4()), str(uuid.uuid4())
        p1, p2 = str(uuid.uuid4()), str(uuid.uuid4())
        _seed_links(db_factory, [(p1, a), (p2, b)])
        # orphan the link to A by deleting its child user row
        async def _orphan():
            from sqlalchemy import delete as _delete

            from backend.models.user import User as UserModel
            async with db_factory() as db:
                await db.execute(_delete(UserModel).where(
                    UserModel.id == uuid.UUID(a)))
                await db.commit()
        asyncio.run(_orphan())

        calls: list = []
        send = _fake_send(calls, {b: "mock"})
        s = asyncio.run(wd.run_weekly_digest(
            session_factory=db_factory, send_fn=send, iso_week=W40))
        assert s["checked"] == 2
        assert s["failed"] == 1 and s["mock"] == 1
        statuses = {d["child_id"]: d["status"] for d in s["details"]}
        assert statuses[a] == "failed" and statuses[b] == "mock"

    def test_details_capped_at_20(self, db_factory):
        pairs = [(str(uuid.uuid4()), str(uuid.uuid4())) for _ in range(25)]
        _seed_links(db_factory, pairs)
        calls: list = []
        send = _fake_send(calls, {})
        s = asyncio.run(wd.run_weekly_digest(
            session_factory=db_factory, send_fn=send, iso_week=W40))
        assert s["checked"] == 25 and s["mock"] == 25
        assert len(s["details"]) == 20
        assert s["details_truncated"] == 5


# ---------------------------------------------------------------------------
# 3. Worker wiring: HANDLERS + heavy window + scheduler
# ---------------------------------------------------------------------------
class TestWorkerWiring:
    def test_handler_registered(self):
        assert "weekly_digest" in worker_main.HANDLERS
        assert worker_main.HANDLERS["weekly_digest"] is worker_main.weekly_digest

    def test_handler_passes_heavy_gate_inside_window(self, queue, monkeypatch):
        """Inside the IST SEND window the guard lets weekly_digest RUN
        (no defer).  (2026-10-05: weekly_digest is a SEND kind now — the
        send window, not the heavy window, decides.)"""
        monkeypatch.delenv("WORKER_ALLOW_HEAVY", raising=False)
        now = datetime.now(timezone.utc).astimezone(
            timezone(timedelta(hours=5, minutes=30)))
        monkeypatch.setattr(worker_main, "_ist_now", lambda: now)
        monkeypatch.setattr(worker_main, "_window_bounds",
                            lambda now_, w: (True, now_))
        jid = queue.enqueue("weekly_digest", {})
        job = queue.claim("w1")
        assert job is not None
        ran: list = []

        w = worker_main.Worker(worker_id="w1",
                               handlers={"weekly_digest": lambda p: ran.append(p) or {"ok": True}})
        w.run_job(job)
        row = self._row(jid)
        assert row["status"] == "done", row
        assert ran == [{}], "handler did not run inside the window"

    def test_handler_deferred_outside_window(self, queue, monkeypatch):
        """Outside the SEND window the guard DEFERS: pending again,
        run_at = next window start, no attempt consumed by the handler.
        (FOOLPROOF-MESSAGING 2026-10-05: weekly_digest moved from
        HEAVY_KINDS to SEND_KINDS — it is a message, not heavy compute.)"""
        monkeypatch.delenv("WORKER_ALLOW_HEAVY", raising=False)
        # clock-independent: defer target always ~1h in the real future
        next_start = datetime.now(timezone.utc) + timedelta(hours=1)
        monkeypatch.setattr(worker_main, "_ist_now", lambda: datetime.now(
            timezone.utc).astimezone(timezone(timedelta(hours=5, minutes=30))))
        monkeypatch.setattr(worker_main, "_window_bounds",
                            lambda now_, w: (False, next_start.astimezone(
                                timezone(timedelta(hours=5, minutes=30)))))
        jid = queue.enqueue("weekly_digest", {})
        job = queue.claim("w1")
        ran: list = []
        w = worker_main.Worker(worker_id="w1",
                               handlers={"weekly_digest": lambda p: ran.append(p)})
        w.run_job(job)
        assert ran == [], "handler ran outside the heavy window"
        row = self._row(jid)
        assert row["status"] == "pending"
        assert "deferred" in (row["error"] or "")
        # runnable again exactly at the next window start
        assert queue.claim("w2") is None
        job2 = queue.claim("w2", now=next_start + timedelta(seconds=1))
        assert job2 is not None and job2["id"] == jid

    def test_payload_iso_week_reaches_run(self, monkeypatch):
        seen: dict = {}

        async def fake_run(*, session_factory=None, iso_week=None,
                           send_fn=None, now=None):
            seen["iso_week"] = iso_week
            return {"iso_week": iso_week, "checked": 0, "sent": 0,
                    "mock": 0, "failed": 0, "skipped": 0, "details": []}

        monkeypatch.setattr(wd, "run_weekly_digest", fake_run)
        # keep the handler's best-effort state copy off the real STATE_DIR
        monkeypatch.setattr(worker_main, "_write_state",
                            lambda name, data: f"<stub:{name}>")
        out = worker_main.weekly_digest({"iso_week": W41})
        assert seen["iso_week"] == W41
        assert out["checked"] == 0

    # -- scheduler -------------------------------------------------------- #
    def test_scheduler_enqueues_once_per_day(self, queue):
        now = datetime(2026, 10, 4, 3, 30, tzinfo=timezone.utc)
        jid = worker_main.maybe_enqueue_weekly_digest(now=now)
        assert jid is not None
        assert jid == f"weekly_digest-{W40}-20261004"
        assert queue.job_exists(jid)
        row = self._row(jid)
        assert row["kind"] == "weekly_digest"
        # same day: deterministic id already exists -> no second enqueue
        later = now + timedelta(hours=5)
        assert worker_main.maybe_enqueue_weekly_digest(now=later) is None
        # next day: a fresh attempt is scheduled (marker table still rules
        # what actually sends)
        tomorrow = now + timedelta(days=1)
        jid2 = worker_main.maybe_enqueue_weekly_digest(now=tomorrow)
        assert jid2 is not None and jid2 != jid

    def test_worker_tick_gated_on_handler_registry(self, queue):
        now = datetime(2026, 10, 4, 3, 30, tzinfo=timezone.utc)
        # a worker whose registry lacks weekly_digest never schedules
        w_nodigest = worker_main.Worker(worker_id="t1",
                                        handlers={"x": lambda p: {}})
        w_nodigest._sched_weekly_digest_tick()
        assert queue.counts()["pending"] == 0
        # a full-registry worker schedules on its first tick (boot)
        w_full = worker_main.Worker(worker_id="t2")  # default HANDLERS
        # pin 'now' for the deterministic daily id
        w_full._last_digest_sched = 0.0
        orig = worker_main.maybe_enqueue_weekly_digest
        monkey_now = {"called": 0}

        def pinned(now=None):
            monkey_now["called"] += 1
            return orig(now=now)

        saved = worker_main.maybe_enqueue_weekly_digest
        worker_main.maybe_enqueue_weekly_digest = pinned
        try:
            w_full._sched_weekly_digest_tick()
            assert monkey_now["called"] == 1
        finally:
            worker_main.maybe_enqueue_weekly_digest = saved
        # hourly gate: an immediate second tick is a no-op
        w_full._sched_weekly_digest_tick()
        assert monkey_now["called"] == 1

    def test_scheduler_never_raises_on_queue_failure(self, monkeypatch):
        def boom(*a, **k):
            raise RuntimeError("db down")
        monkeypatch.setattr(worker_main.jobs, "job_exists", boom)
        # must swallow, not raise
        assert worker_main.maybe_enqueue_weekly_digest() is None

    # -- helpers -------------------------------------------------------- #
    @staticmethod
    def _row(job_id: str) -> dict:
        import sqlalchemy as sa
        s = jobs.get_session()
        try:
            r = s.execute(sa.text(
                "SELECT id, kind, status, error, run_at FROM jobs "
                "WHERE id=:id"), {"id": job_id}).mappings().first()
            return dict(r) if r else {}
        finally:
            s.close()
