#!/usr/bin/env python3
"""backend/workers/jobs.py — Postgres-backed job queue for the worker tier.

One table, no broker.  Safe with MULTIPLE worker processes: the claim is a
single atomic ``UPDATE ... WHERE id = (SELECT ... FOR UPDATE SKIP LOCKED)``
on Postgres, so two concurrent claimers can never win the same job — the
loser's subselect skips the locked row and (finding nothing else) returns
no job at all.

Schema (table ``jobs``, lives in the MAIN platform database — the same
DATABASE_URL the API uses):
    id           str(36) pk
    kind         str(64)      handler name (see workers/main.py HANDLERS)
    payload      JSON         handler arguments
    status       pending | running | done | failed
    attempts     int          claim count (1-based once claimed)
    max_attempts int          after this many failed attempts -> failed
    claimed_at   ts           last claim time (stale-claim recovery uses it)
    claimed_by   str          worker id that claimed it
    error        text         last failure traceback / timeout note
    run_at       ts           earliest next claim (retry backoff)
    result       JSON         handler return value on success
    created_at / updated_at ts

Retry semantics: ``fail()`` re-queues with exponential backoff
(base * 2**(attempts-1), capped) until ``max_attempts`` is reached, then
marks the row ``failed`` with the error text captured.  Crashed workers
leave ``running`` rows behind; ``requeue_stale()`` puts those back to
``pending`` after WORKER_STALE_AFTER_S.

This module must stay importable WITHOUT FastAPI/the API app: the worker
process imports only sqlalchemy (+ the drivers already in requirements.txt).
URL resolution mirrors backend/database.py (DATABASE_URL ->
POSTGRES_URL -> PLATFORM_DATABASE_URL) with an optional WORKER_DATABASE_URL
override used by the tests; asyncpg/aiosqlite URLs are rewritten to their
sync psycopg2/sqlite drivers.
"""
from __future__ import annotations

import json
import os
import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy import (JSON, DateTime, Integer, String, Text,
                        create_engine, func, select, text)
from sqlalchemy.orm import (DeclarativeBase, Mapped, Session, mapped_column,
                            sessionmaker)

__all__ = ["Job", "init_queue", "enqueue", "claim", "complete", "fail",
           "requeue_stale", "counts", "job_exists", "set_url_override",
           "reset_engine", "DEFAULT_MAX_ATTEMPTS", "STATUSES"]

STATUSES = ("pending", "running", "done", "failed")
DEFAULT_MAX_ATTEMPTS = int(os.environ.get("WORKER_MAX_ATTEMPTS", "3"))
DEFAULT_BACKOFF_S = float(os.environ.get("WORKER_RETRY_BACKOFF_S", "60"))
MAX_BACKOFF_S = 3600.0


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class _Base(DeclarativeBase):
    pass


class Job(_Base):
    """One queued unit of work."""

    __tablename__ = "jobs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True,
                                    default=lambda: str(uuid.uuid4()))
    kind: Mapped[str] = mapped_column(String(64), index=True)
    payload: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    status: Mapped[str] = mapped_column(String(16), default="pending",
                                        index=True)
    attempts: Mapped[int] = mapped_column(Integer, default=0)
    max_attempts: Mapped[int] = mapped_column(Integer, default=DEFAULT_MAX_ATTEMPTS)
    claimed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True)
    claimed_by: Mapped[str | None] = mapped_column(String(128), nullable=True)
    error: Mapped[str | None] = mapped_column(Text, nullable=True)
    run_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, index=True)
    result: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, onupdate=_utcnow,
        server_default=func.now())

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Job {self.id} kind={self.kind} status={self.status} " \
               f"attempts={self.attempts}/{self.max_attempts}>"


# ---------------------------------------------------------------------------
# Engine (lazy singleton; tests override the URL via set_url_override)
# ---------------------------------------------------------------------------
_engine = None
_Session = None
_URL_OVERRIDE: str | None = None


def set_url_override(url: str | None) -> None:
    """Point the queue at a specific DB (tests / CLI tools). Resets engine."""
    global _URL_OVERRIDE
    _URL_OVERRIDE = url
    reset_engine()


def reset_engine() -> None:
    """Drop the cached engine/session so the next call re-resolves."""
    global _engine, _Session
    _engine = None
    _Session = None


def _resolve_url() -> str:
    if _URL_OVERRIDE:
        return _URL_OVERRIDE
    # Same env chain as backend/database.py — the worker shares the main DB.
    for name in ("DATABASE_URL", "POSTGRES_URL", "PLATFORM_DATABASE_URL"):
        val = os.environ.get(name, "")
        if val:
            url = val
            break
    else:
        url = ("postgresql+asyncpg://postgres:postgres@localhost:5432/"
               "learning_platform")
    if "+asyncpg" in url:
        url = url.replace("postgresql+asyncpg", "postgresql+psycopg2")
    elif "+aiosqlite" in url:
        url = url.replace("sqlite+aiosqlite", "sqlite")
    return url


def get_session() -> Session:
    global _engine, _Session
    if _Session is None:
        url = _resolve_url()
        kwargs: dict = {}
        if url.startswith("sqlite"):
            # File sqlite + the multithreaded test/loop access pattern.
            kwargs["connect_args"] = {"check_same_thread": False}
        else:
            # connect_timeout keeps /metrics scrapes fast when the DB is
            # down (counts() degrades to zeros instead of a 20s TCP hang).
            kwargs.update(pool_pre_ping=True, pool_size=2, max_overflow=2,
                          pool_recycle=1800,
                          connect_args={"connect_timeout": 3})
        _engine = create_engine(url, **kwargs)
        _Session = sessionmaker(bind=_engine, expire_on_commit=False)
    return _Session()


def init_queue() -> None:
    """Create the jobs table if absent (idempotent, safe at worker boot)."""
    s = get_session()
    try:
        _Base.metadata.create_all(s.bind)
    finally:
        s.close()


# ---------------------------------------------------------------------------
# Queue operations
# ---------------------------------------------------------------------------
def enqueue(kind: str, payload: dict | None = None,
            max_attempts: int | None = None, run_at: datetime | None = None,
            job_id: str | None = None) -> str:
    """Queue a job; returns its id."""
    s = get_session()
    try:
        job = Job(id=job_id or str(uuid.uuid4()), kind=kind,
                  payload=payload or {},
                  max_attempts=max_attempts or DEFAULT_MAX_ATTEMPTS,
                  run_at=run_at or _utcnow())
        s.add(job)
        s.commit()
        return job.id
    finally:
        s.close()


def claim(worker_id: str, now: datetime | None = None,
          kinds: list[str] | None = None) -> dict | None:
    """Atomically claim the next runnable pending job.

    Returns ``{"id", "kind", "payload", "attempts", "max_attempts"}`` or
    None.  On Postgres this is one statement with FOR UPDATE SKIP LOCKED:
    concurrent claimers never receive the same job.  On other dialects
    (sqlite under test) the same guarantee comes from a transactional
    select + a guarded UPDATE whose rowcount decides the winner.
    """
    now = now or _utcnow()
    s = get_session()
    try:
        if s.bind.dialect.name == "postgresql":
            return _claim_postgres(s, worker_id, now, kinds)
        return _claim_portable(s, worker_id, now, kinds)
    finally:
        s.close()


def _claim_postgres(s: Session, worker_id: str, now: datetime,
                    kinds: list[str] | None) -> dict | None:
    kinds_sql = ""
    params: dict = {"w": worker_id, "now": now}
    if kinds:
        kinds_sql = " AND kind = ANY(:kinds)"
        params["kinds"] = list(kinds)
    sql = text(
        "UPDATE jobs SET status = 'running', claimed_at = :now, "
        "  claimed_by = :w, attempts = attempts + 1, updated_at = :now "
        "WHERE id = ("
        "  SELECT id FROM jobs WHERE status = 'pending' "
        "  AND run_at <= :now" + kinds_sql +
        "  ORDER BY created_at LIMIT 1"
        "  FOR UPDATE SKIP LOCKED"
        ") RETURNING id, kind, payload, attempts, max_attempts"
    )
    row = s.execute(sql, params).mappings().first()
    s.commit()
    if row is None:
        return None
    payload = row["payload"]
    if isinstance(payload, str):  # some drivers return raw JSON text
        try:
            payload = json.loads(payload)
        except ValueError:
            payload = {}
    return {"id": row["id"], "kind": row["kind"],
            "payload": payload or {}, "attempts": row["attempts"],
            "max_attempts": row["max_attempts"]}


def _claim_portable(s: Session, worker_id: str, now: datetime,
                    kinds: list[str] | None) -> dict | None:
    """Select-then-guarded-update.  The ``AND status='pending'`` predicate in
    the UPDATE is the winner check: a racing claimer that already flipped the
    row to 'running' updates 0 rows and we retry with the next candidate.
    RETURNING attempts gives the post-increment value (sqlite >= 3.35 and
    Postgres both support it)."""
    for _ in range(16):  # bounded: skip rows lost to a racing claimer
        q = select(Job).where(Job.status == "pending", Job.run_at <= now)
        if kinds:
            q = q.where(Job.kind.in_(kinds))
        q = q.order_by(Job.created_at).limit(1)
        q = q.with_for_update(skip_locked=True)  # rendered where supported
        job = s.execute(q).scalars().first()
        if job is None:
            s.rollback()
            return None
        updated = s.execute(
            text("UPDATE jobs SET status='running', claimed_at=:now, "
                 "claimed_by=:w, attempts=attempts+1, updated_at=:now "
                 "WHERE id=:id AND status='pending' RETURNING attempts"),
            {"now": now, "w": worker_id, "id": job.id})
        winner = updated.mappings().first()
        s.commit()
        if winner is not None:
            return {"id": job.id, "kind": job.kind,
                    "payload": job.payload or {},
                    "attempts": int(winner["attempts"]),
                    "max_attempts": job.max_attempts}
    return None


def complete(job_id: str, result: dict | None = None) -> bool:
    """Mark a claimed job done.  Returns False if the row vanished or was
    not in 'running' (the ORM keeps JSON binding portable)."""
    s = get_session()
    try:
        job = s.get(Job, job_id)
        if job is None or job.status != "running":
            return False
        job.status = "done"
        job.result = _jsonable(result)
        job.error = None
        s.commit()
        return True
    finally:
        s.close()


def _backoff_s(attempts: int) -> float:
    return min(MAX_BACKOFF_S, DEFAULT_BACKOFF_S * (2 ** max(0, attempts - 1)))


def fail(job_id: str, error: str,
         backoff_s: float | None = None,
         permanent: bool = False) -> str:
    """Record a failure; retry with backoff or park as failed.

    Returns the resulting status: 'pending' (will retry) or 'failed'.
    ``error`` is captured verbatim into the row.  ``permanent=True`` skips
    the retry budget (unknown job kinds, unrecoverable input).
    """
    s = get_session()
    try:
        job = s.get(Job, job_id)
        if job is None:
            return "missing"
        err = (error or "")[:8000]
        if permanent or job.attempts >= job.max_attempts:
            job.status = "failed"
            job.error = err
            s.commit()
            return "failed"
        wait = backoff_s if backoff_s is not None else _backoff_s(job.attempts)
        job.status = "pending"
        job.error = err
        job.run_at = _utcnow() + timedelta(seconds=max(0.0, float(wait)))
        s.commit()
        return "pending"
    finally:
        s.close()


def defer(job_id: str, run_at: datetime,
          note: str = "[deferred]") -> str:
    """Requeue a claimed job for a future run_at (no attempt consumed).

    Used by the heavy-job window guard: a content_reindex enqueued during
    peak hours waits for its window instead of starving the host.
    Returns the resulting status ('pending'), or 'missing' if unknown.
    """
    s = get_session()
    try:
        job = s.get(Job, job_id)
        if job is None:
            return "missing"
        job.status = "pending"
        job.run_at = run_at
        job.claimed_by = None
        job.claimed_at = None
        job.error = ((job.error or "") + note)[:8000]
        s.commit()
        return "pending"
    finally:
        s.close()


def requeue_stale(stale_after_s: float | None = None,
                  now: datetime | None = None) -> int:
    """Put 'running' rows whose claim went stale back to pending.

    A worker that died mid-job leaves its row 'running' forever otherwise.
    Called at worker boot; WORKER_STALE_AFTER_S (default 900) must exceed
    the longest sane job runtime.
    """
    stale_after_s = float(
        stale_after_s if stale_after_s is not None
        else os.environ.get("WORKER_STALE_AFTER_S", "900"))
    cutoff = (now or _utcnow()) - timedelta(seconds=stale_after_s)
    s = get_session()
    try:
        stale = s.execute(
            select(Job).where(Job.status == "running",
                              Job.claimed_at < cutoff)).scalars().all()
        for job in stale:
            job.status = "pending"
            job.claimed_at = None
            job.claimed_by = None
            note = "[requeued: stale claim]"
            job.error = ((job.error or "") + note)[:8000]
        s.commit()
        return len(stale)
    finally:
        s.close()


def job_exists(job_id: str) -> bool:
    """True if a job row with this exact id exists (any status).

    Used by the weekly-digest scheduler (workers/main.py) to keep its
    deterministic per-day job id idempotent: the row IS the
    already-attempted-today marker, so scheduling is a cheap PK probe.
    """
    s = get_session()
    try:
        return s.get(Job, job_id) is not None
    finally:
        s.close()


def counts() -> dict[str, int]:
    """Jobs per status — scraped by /metrics as worker queue gauges."""
    s = get_session()
    try:
        rows = s.execute(select(Job.status, func.count()).group_by(
            Job.status)).all()
        out = {st: 0 for st in STATUSES}
        for status, n in rows:
            out[str(status)] = int(n)
        return out
    except Exception:
        return {st: 0 for st in STATUSES}
    finally:
        s.close()


def _jsonable(result: dict | None) -> dict | None:
    """Coerce handler results to something JSON-safe (the column is JSON)."""
    if result is None:
        return None
    try:
        import json as _json
        _json.dumps(result)
        return result
    except (TypeError, ValueError):
        return {"repr": repr(result)}
