"""
services/sync_service.py
========================
Offline sync service for the K-12 learning platform.

Lifecycle:
  1. Queue  →  2. Batch Upload  →  3. Conflict Resolution  →  4. Confirm
               ↺ retry with exponential backoff on transient failure

Supported action types:
  - homework_submission  → last-write-wins conflict resolution
  - practice_answer      → merge conflict resolution (preserves mastery data)
  - tutor_message        → last-write-wins conflict resolution
"""

from __future__ import annotations

import asyncio
import hashlib
import json
import logging
import random
import time
import uuid
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from enum import Enum
from typing import Any, Callable, Sequence

import httpx
from pydantic import BaseModel, ConfigDict, Field, field_validator
from sqlalchemy import Column, DateTime, Enum as SAEnum, Index, Integer, String, Text, func, select
from backend.db_types import JSONVariant
from sqlalchemy.exc import SQLAlchemyError

from database import Base, async_session_maker

logger = logging.getLogger(__name__)

# ──────────────────────────── Constants ────────────────────────────

MAX_RETRIES_DEFAULT: int = 5
INITIAL_BACKOFF_S: float = 1.0
MAX_BACKOFF_S: float = 60.0
BATCH_SIZE_DEFAULT: int = 50
CONCURRENCY_DEFAULT: int = 5
REQUEST_TIMEOUT_S: float = 30.0
JITTER_FACTOR: float = 0.1

ACTION_ENDPOINTS: dict[str, str] = {
    "homework_submission": "/api/v1/sync/homework",
    "practice_answer":     "/api/v1/sync/practice",
    "tutor_message":       "/api/v1/sync/tutor-messages",
}

CONFLICT_STRATEGIES: dict[str, str] = {
    "homework_submission": "last_write_wins",
    "practice_answer":     "merge",
    "tutor_message":       "last_write_wins",
}

MASTERY_MERGE_FIELDS: tuple[str, ...] = (
    "mastery_level",
    "streak",
    "confidence_score",
    "accuracy",
)

MASTERY_SUM_FIELDS: tuple[str, ...] = (
    "total_attempts",
    "correct_attempts",
    "questions_answered",
    "time_spent_seconds",
)

MASTERY_TIMESTAMP_FIELDS: tuple[str, ...] = (
    "last_practiced_at",
    "completed_at",
)


# ──────────────────────────── Enums ────────────────────────────────

class ActionType(str, Enum):
    HOMEWORK_SUBMISSION = "homework_submission"
    PRACTICE_ANSWER     = "practice_answer"
    TUTOR_MESSAGE       = "tutor_message"


class SyncStatus(str, Enum):
    PENDING  = "pending"
    SYNCING  = "syncing"
    SYNCED   = "synced"
    FAILED   = "failed"


# ──────────────────────── Pydantic Schemas (v2) ────────────────────

class SyncActionRead(BaseModel):
    """Read schema for a queued sync action (ORM-compatible)."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    student_id: str
    action_type: str = Field(serialization_alias="action_type")
    data: dict[str, Any] = Field(default_factory=dict)
    status: str
    retry_count: int = 0
    max_retries: int = 5
    created_at: datetime
    updated_at: datetime
    synced_at: datetime | None = None
    error_message: str | None = None
    idempotency_key: str
    next_retry_at: datetime | None = None


class SyncResult(BaseModel):
    """Aggregate result of a sync_pending run."""

    model_config = ConfigDict(from_attributes=True)

    student_id: str
    total_pending: int = 0
    synced: int = 0
    failed: int = 0
    conflicts_resolved: int = 0
    errors: list[dict[str, Any]] = Field(default_factory=list)
    started_at: datetime
    completed_at: datetime

    @property
    def duration_seconds(self) -> float:
        return (self.completed_at - self.started_at).total_seconds()

    @property
    def success(self) -> bool:
        return self.failed == 0 and self.total_pending > 0

    def model_dump(self, **kwargs: Any) -> dict[str, Any]:
        d = super().model_dump(**kwargs)
        d["duration_seconds"] = round(self.duration_seconds, 3)
        return d


class SyncStatusInfo(BaseModel):
    """Current sync health snapshot for a student."""

    model_config = ConfigDict(from_attributes=True)

    student_id: str
    pending_count: int = 0
    syncing_count: int = 0
    synced_count: int = 0
    failed_count: int = 0
    last_sync_at: datetime | None = None
    has_active_sync: bool = False

    @property
    def total_actions(self) -> int:
        return self.pending_count + self.syncing_count + self.synced_count + self.failed_count


# ──────────────────────── SQLAlchemy Model ─────────────────────────

class SyncAction(Base):
    """ORM model for the sync_actions queue table."""

    __tablename__ = "sync_actions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id   = Column(String(64), nullable=False, index=True)
    action_type  = Column(String(32), nullable=False, index=True)
    data         = Column(JSONVariant(), nullable=False)
    status       = Column(String(16), nullable=False, default="pending", index=True)
    retry_count  = Column(Integer, nullable=False, default=0)
    max_retries  = Column(Integer, nullable=False, default=5)
    created_at   = Column(DateTime(timezone=True), server_default=func.now())
    updated_at   = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    synced_at    = Column(DateTime(timezone=True), nullable=True)
    error_message = Column(Text, nullable=True)
    idempotency_key = Column(String(64), nullable=False, unique=True, index=True)
    next_retry_at = Column(DateTime(timezone=True), nullable=True, index=True)

    __table_args__ = (
        Index("ix_sync_student_status", "student_id", "status"),
        Index("ix_sync_next_retry", "next_retry_at"),
    )

    def __repr__(self) -> str:
        return (
            f"<SyncAction {self.id[:8]} student={self.student_id} "
            f"type={self.action_type} status={self.status} retries={self.retry_count}>"
        )


# ──────────────────────────── Service ──────────────────────────────

class SyncService:
    """
    Core offline-sync engine.

    Lifecycle:
        await service.queue_action(student_id, action_type, data)
        result = await service.sync_pending(student_id)
        status = await service.get_sync_status(student_id)

    The service is an async context manager – use ``async with`` or call
    ``close()`` explicitly when done to release the HTTP connection pool.
    """

    def __init__(
        self,
        base_url: str = "http://localhost:8000",
        max_retries: int = MAX_RETRIES_DEFAULT,
        initial_backoff: float = INITIAL_BACKOFF_S,
        max_backoff: float = MAX_BACKOFF_S,
        batch_size: int = BATCH_SIZE_DEFAULT,
        concurrency: int = CONCURRENCY_DEFAULT,
        request_timeout: float = REQUEST_TIMEOUT_S,
    ) -> None:
        self.base_url = base_url.rstrip("/")
        self.max_retries = max_retries
        self.initial_backoff = initial_backoff
        self.max_backoff = max_backoff
        self.batch_size = batch_size
        self.concurrency = concurrency
        self.request_timeout = request_timeout

        self._http_client: httpx.AsyncClient | None = None

    # ── Lifecycle ───────────────────────────────────────────────

    async def __aenter__(self) -> SyncService:
        return self

    async def __aexit__(self, *exc: Any) -> None:
        await self.close()

    async def close(self) -> None:
        """Release HTTP resources."""
        if self._http_client and not self._http_client.is_closed:
            await self._http_client.aclose()
            self._http_client = None

    # ── Public API ──────────────────────────────────────────────

    async def queue_action(
        self,
        student_id: str,
        action_type: str,
        data: dict[str, Any],
        *,
        idempotency_key: str | None = None,
    ) -> SyncActionRead:
        """
        Queue an offline action for later sync.

        Deduplicates by ``idempotency_key`` – re-submitting the same key
        while the action is still pending is a no-op.

        Returns the queued (or pre-existing) action record.
        """
        self._validate_action_type(action_type)

        if not idempotency_key:
            idempotency_key = self._generate_idempotency_key(student_id, action_type, data)

        async with async_session_maker() as session:
            # Dedup check
            existing = (
                await session.execute(
                    select(SyncAction).where(
                        SyncAction.idempotency_key == idempotency_key,
                        SyncAction.status.in_([SyncStatus.PENDING, SyncStatus.SYNCING]),
                    )
                )
            ).scalar_one_or_none()

            if existing:
                logger.debug(
                    "Duplicate action ignored  idempotency_key=%s  action_id=%s",
                    idempotency_key,
                    existing.id,
                )
                return SyncActionRead.model_validate(existing)

            action = SyncAction(
                id=str(uuid.uuid4()),
                student_id=student_id,
                action_type=action_type,
                data=data,
                idempotency_key=idempotency_key,
                status=SyncStatus.PENDING,
            )
            session.add(action)
            try:
                await session.commit()
            except SQLAlchemyError:
                await session.rollback()
                # Second chance: race condition – the duplicate might have been committed
                existing = (
                    await session.execute(
                        select(SyncAction).where(
                            SyncAction.idempotency_key == idempotency_key,
                        )
                    )
                ).scalar_one_or_none()
                if existing:
                    return SyncActionRead.model_validate(existing)
                raise

            await session.refresh(action)
            logger.info(
                "Queued action  id=%s  student=%s  type=%s",
                action.id[:8],
                student_id,
                action_type,
            )
            return SyncActionRead.model_validate(action)

    async def sync_pending(
        self,
        student_id: str,
        *,
        batch_size: int | None = None,
        on_progress: Callable[[int, int], None] | None = None,
    ) -> SyncResult:
        """
        Sync all pending actions for ``student_id``.

        Processes up to ``batch_size`` actions with ``concurrency`` parallel
        uploads.  Individual failures are retried with exponential backoff;
        the run continues for the remaining actions.

        Returns a :class:`SyncResult` summarising the outcome.
        """
        batch_size = batch_size or self.batch_size
        started_at = datetime.now(timezone.utc)

        actions = await self._get_pending_actions(student_id, limit=batch_size)
        total = len(actions)

        if total == 0:
            return SyncResult(
                student_id=student_id,
                total_pending=0,
                synced=0,
                failed=0,
                conflicts_resolved=0,
                errors=[],
                started_at=started_at,
                completed_at=datetime.now(timezone.utc),
            )

        logger.info("Starting sync for %s  actions=%d  batch=%d", student_id, total, batch_size)

        # Mark all fetched actions as syncing atomically
        action_ids = [a.id for a in actions]
        await self._mark_actions_syncing(action_ids)

        semaphore = asyncio.Semaphore(self.concurrency)

        async def _process_one(action: SyncAction) -> dict[str, Any]:
            async with semaphore:
                if on_progress:
                    on_progress(actions.index(action) + 1, total)
                try:
                    return await self._process_single_action(action)
                except Exception as exc:
                    logger.exception("Unexpected error on action %s", action.id)
                    await self._mark_as_failed(action, str(exc))
                    return {"status": "error", "action_id": action.id, "error": str(exc)}

        results = await asyncio.gather(*[_process_one(a) for a in actions])

        synced = sum(1 for r in results if r["status"] in ("synced", "synced_after_conflict"))
        conflicts = sum(1 for r in results if r["status"] == "synced_after_conflict")
        failed = sum(1 for r in results if r["status"] in ("failed", "error", "max_retries"))
        errors = [r for r in results if r.get("error")]

        logger.info(
            "Sync complete  student=%s  synced=%d  conflicts=%d  failed=%d  elapsed=%.2fs",
            student_id,
            synced,
            conflicts,
            failed,
            (datetime.now(timezone.utc) - started_at).total_seconds(),
        )

        return SyncResult(
            student_id=student_id,
            total_pending=total,
            synced=synced,
            failed=failed,
            conflicts_resolved=conflicts,
            errors=errors,
            started_at=started_at,
            completed_at=datetime.now(timezone.utc),
        )

    async def retry_failed(self, student_id: str, *, batch_size: int | None = None) -> SyncResult:
        """
        Reset all FAILED actions back to PENDING and sync them.

        Useful as a manual retry button or a periodic recovery job.
        """
        async with async_session_maker() as session:
            failed_actions = (
                await session.execute(
                    select(SyncAction).where(
                        SyncAction.student_id == student_id,
                        SyncAction.status == SyncStatus.FAILED,
                    )
                )
            ).scalars().all()

            if not failed_actions:
                return SyncResult(
                    student_id=student_id,
                    total_pending=0,
                    started_at=datetime.now(timezone.utc),
                    completed_at=datetime.now(timezone.utc),
                    synced=0,
                    failed=0,
                    conflicts_resolved=0,
                    errors=[],
                )

            for action in failed_actions:
                action.status = SyncStatus.PENDING
                action.retry_count = 0
                action.error_message = None
                action.next_retry_at = None

            await session.commit()
            logger.info("Reset %d failed actions for student %s", len(failed_actions), student_id)

        return await self.sync_pending(student_id, batch_size=batch_size)

    async def get_sync_status(self, student_id: str) -> SyncStatusInfo:
        """
        Return a :class:`SyncStatusInfo` snapshot for the student.
        """
        async with async_session_maker() as session:
            rows = (
                await session.execute(
                    select(SyncAction.status, func.count(SyncAction.id)).where(
                        SyncAction.student_id == student_id
                    ).group_by(SyncAction.status)
                )
            ).all()

            counts: dict[str, int] = {row[0]: row[1] for row in rows}

            last_sync = (
                await session.execute(
                    select(func.max(SyncAction.synced_at)).where(
                        SyncAction.student_id == student_id,
                        SyncAction.status == SyncStatus.SYNCED,
                    )
                )
            ).scalar_one_or_none()

            active = (
                await session.execute(
                    select(SyncAction.id).where(
                        SyncAction.student_id == student_id,
                        SyncAction.status == SyncStatus.SYNCING,
                    ).limit(1)
                )
            ).scalar_one_or_none() is not None

        return SyncStatusInfo(
            student_id=student_id,
            pending_count=counts.get(SyncStatus.PENDING, 0),
            syncing_count=counts.get(SyncStatus.SYNCING, 0),
            synced_count=counts.get(SyncStatus.SYNCED, 0),
            failed_count=counts.get(SyncStatus.FAILED, 0),
            last_sync_at=last_sync,
            has_active_sync=active,
        )

    async def resolve_conflict(
        self,
        local_data: dict[str, Any],
        remote_data: dict[str, Any],
        action_type: str,
    ) -> dict[str, Any]:
        """
        Resolve a conflict between local (offline) and remote (server) data.

        Strategy per action type:
          - ``homework_submission``, ``tutor_message``  →  last-write-wins
          - ``practice_answer``  →  merge (preserves both sessions' mastery gains)

        Returns the resolved payload dict.
        """
        if not local_data and not remote_data:
            return {}
        if not local_data:
            return dict(remote_data)
        if not remote_data:
            return dict(local_data)

        strategy = CONFLICT_STRATEGIES.get(action_type, "last_write_wins")

        if strategy == "merge":
            resolved = self._merge_mastery_data(local_data, remote_data)
        else:
            resolved = self._last_write_wins(local_data, remote_data)

        logger.info(
            "Conflict resolved  type=%s  strategy=%s  local_ts=%s  remote_ts=%s",
            action_type,
            strategy,
            self._first_ts(local_data),
            self._first_ts(remote_data),
        )
        return resolved

    async def cleanup_synced(self, older_than: timedelta = timedelta(days=30)) -> int:
        """
        Permanently delete SYNCED records older than ``older_than``.

        Returns the number of rows deleted.
        """
        cutoff = datetime.now(timezone.utc) - older_than
        async with async_session_maker() as session:
            rows = (
                await session.execute(
                    select(SyncAction).where(
                        SyncAction.status == SyncStatus.SYNCED,
                        SyncAction.synced_at < cutoff,
                    )
                )
            ).scalars().all()

            for row in rows:
                await session.delete(row)

            await session.commit()
            logger.info("Cleaned up %d old synced actions", len(rows))
            return len(rows)

    # ── Private: HTTP / upload ───────────────────────────────────

    async def _process_single_action(self, action: SyncAction) -> dict[str, Any]:
        """
        Upload one action to its target endpoint.

        Handles 409 conflict resolution, 5xx retry, and 4xx permanent failure.
        """
        endpoint = ACTION_ENDPOINTS.get(action.action_type)
        if not endpoint:
            raise ValueError(f"No endpoint configured for action type '{action.action_type}'")

        url = f"{self.base_url}{endpoint}"
        client = await self._http_client()

        headers = {
            "X-Idempotency-Key": action.idempotency_key,
            "X-Sync-Strategy":   CONFLICT_STRATEGIES.get(action.action_type, "last_write_wins"),
        }

        payload = {
            "student_id":  action.student_id,
            "action_type": action.action_type,
            "payload":     action.data,
            "queued_at":   action.created_at.isoformat(),
        }

        response = await client.post(url, json=payload, headers=headers)

        # ── 200 OK ──
        if response.status_code == 200:
            await self._mark_as_synced(action)
            return {"status": "synced", "action_id": action.id}

        # ── 409 Conflict ──
        if response.status_code == 409:
            return await self._handle_conflict(action, response, client)

        # ── 422 Validation ──
        if response.status_code == 422:
            detail = _safe_json(response, "detail", response.text)
            error_msg = f"Validation error: {detail}"
            await self._mark_as_failed(action, error_msg, response.status_code)
            return {"status": "failed", "action_id": action.id, "error": error_msg}

        # ── 5xx → retry ──
        if response.status_code >= 500:
            raise httpx.HTTPStatusError(
                f"Server error {response.status_code}",
                request=response.request,
                response=response,
            )

        # ── Other 4xx → permanent failure ──
        error_msg = f"HTTP {response.status_code}: {response.text[:500]}"
        await self._mark_as_failed(action, error_msg, response.status_code)
        return {"status": "failed", "action_id": action.id, "error": error_msg}

    async def _handle_conflict(
        self,
        action: SyncAction,
        response: httpx.Response,
        client: httpx.AsyncClient,
    ) -> dict[str, Any]:
        """Resolve a 409 conflict and retry once."""
        remote_data: dict[str, Any] = _safe_json(response, "remote_data", {})

        # Re-read fresh action data
        async with async_session_maker() as session:
            db_action = (
                await session.execute(
                    select(SyncAction).where(SyncAction.id == action.id)
                )
            ).scalar_one_or_none()

            if db_action is None:
                return {"status": "error", "error": "Action disappeared during conflict resolution"}

            resolved = self.resolve_conflict(db_action.data, remote_data, db_action.action_type)

            # Update action data with resolved payload and bump retry count
            db_action.data = resolved
            db_action.retry_count += 1
            await session.commit()
            await session.refresh(db_action)
            action = db_action

        endpoint = ACTION_ENDPOINTS[action.action_type]
        url = f"{self.base_url}{endpoint}"
        headers = {
            "X-Idempotency-Key": action.idempotency_key,
            "X-Sync-Strategy":   "resolved",
        }
        payload = {
            "student_id":  action.student_id,
            "action_type": action.action_type,
            "payload":     action.data,
            "queued_at":   action.created_at.isoformat(),
            "conflict_resolved": True,
        }

        retry_response = await client.post(url, json=payload, headers=headers)

        if retry_response.status_code == 200:
            await self._mark_as_synced(action)
            return {"status": "synced_after_conflict", "action_id": action.id}

        # Retry itself failed – fall through to normal failure handling
        error_msg = f"Retry after conflict failed: HTTP {retry_response.status_code}"
        await self._mark_as_failed(action, error_msg, retry_response.status_code)
        return {
            "status": "failed",
            "action_id": action.id,
            "error": error_msg,
            "conflict_was_resolved": True,
        }

    # ── Private: DB helpers ──────────────────────────────────────

    async def _get_pending_actions(
        self, student_id: str, *, limit: int
    ) -> list[SyncAction]:
        """Fetch pending actions ordered by creation time (FIFO)."""
        async with async_session_maker() as session:
            result = await session.execute(
                select(SyncAction)
                .where(
                    SyncAction.student_id == student_id,
                    SyncAction.status == SyncStatus.PENDING,
                    # Only actions whose next retry window has passed (or never set)
                    (SyncAction.next_retry_at == None)  # noqa: E711
                    | (SyncAction.next_retry_at <= func.now()),
                )
                .order_by(SyncAction.created_at.asc())
                .limit(limit)
            )
            return list(result.scalars().all())

    async def _mark_actions_syncing(self, action_ids: Sequence[str]) -> None:
        """Bulk-update status from pending → syncing."""
        async with async_session_maker() as session:
            actions = (
                await session.execute(
                    select(SyncAction).where(SyncAction.id.in_(list(action_ids)))
                )
            ).scalars().all()
            for action in actions:
                if action.status == SyncStatus.PENDING:
                    action.status = SyncStatus.SYNCING
            try:
                await session.commit()
            except SQLAlchemyError:
                await session.rollback()
                raise

    async def _mark_as_synced(self, action: SyncAction) -> None:
        async with async_session_maker() as session:
            db = (
                await session.execute(
                    select(SyncAction).where(SyncAction.id == action.id)
                )
            ).scalar_one_or_none()
            if db:
                db.status = SyncStatus.SYNCED
                db.synced_at = datetime.now(timezone.utc)
                db.error_message = None
                try:
                    await session.commit()
                except SQLAlchemyError:
                    await session.rollback()

    async def _mark_as_failed(
        self,
        action: SyncAction,
        error: str,
        http_status: int | None = None,
    ) -> None:
        async with async_session_maker() as session:
            db = (
                await session.execute(
                    select(SyncAction).where(SyncAction.id == action.id)
                )
            ).scalar_one_or_none()
            if db:
                db.status = SyncStatus.FAILED
                db.error_message = f"[HTTP {http_status}] {error}" if http_status else error
                try:
                    await session.commit()
                except SQLAlchemyError:
                    await session.rollback()

    # ── Private: HTTP client ─────────────────────────────────────

    async def _http_client(self) -> httpx.AsyncClient:
        if self._http_client is None or self._http_client.is_closed:
            self._http_client = httpx.AsyncClient(
                timeout=httpx.Timeout(self.request_timeout),
                limits=httpx.Limits(max_connections=self.concurrency * 2),
            )
        return self._http_client

    # ── Private: backoff ─────────────────────────────────────────

    def _calculate_backoff(self, attempt: int) -> float:
        """Exponential backoff (1 s → 2 s → 4 s …) capped at max_backoff, with jitter."""
        backoff = self.initial_backoff * (2 ** attempt)
        backoff = min(backoff, self.max_backoff)
        jitter = random.uniform(0, backoff * JITTER_FACTOR)
        return round(backoff + jitter, 3)

    # ── Private: conflict resolution ─────────────────────────────

    def _last_write_wins(self, local: dict[str, Any], remote: dict[str, Any]) -> dict[str, Any]:
        """Pick whichever payload carries the most recent timestamp."""
        local_ts = self._first_ts(local)
        remote_ts = self._first_ts(remote)
        winner_is_local = (local_ts or datetime.min.replace(tzinfo=timezone.utc)) >= (
            remote_ts or datetime.min.replace(tzinfo=timezone.utc)
        )

        result = dict(local if winner_is_local else remote)
        result["conflict_resolved"] = True
        result["resolution"] = "last_write_wins"
        result["resolved_at"] = datetime.now(timezone.utc).isoformat()
        result["local_timestamp"] = local_ts.isoformat() if local_ts else None
        result["remote_timestamp"] = remote_ts.isoformat() if remote_ts else None
        result["winner"] = "local" if winner_is_local else "remote"
        return result

    def _merge_mastery_data(self, local: dict[str, Any], remote: dict[str, Any]) -> dict[str, Any]:
        """
        Merge two practice_answer payloads so that both sessions' mastery gains
        are preserved (max levels, summed attempts, deduplicated answers).
        """
        merged: dict[str, Any] = {
            "student_id":      local.get("student_id") or remote.get("student_id"),
            "practice_set_id": local.get("practice_set_id") or remote.get("practice_set_id"),
            "session_id":      local.get("session_id") or remote.get("session_id"),
            "merged": True,
            "merge_source": "sync_resolution",
            "conflict_resolved": True,
            "resolution": "merge",
            "resolved_at": datetime.now(timezone.utc).isoformat(),
        }

        # Numeric fields → maximum
        for field in MASTERY_MERGE_FIELDS:
            lv = local.get(field)
            rv = remote.get(field)
            if isinstance(lv, (int, float)) and isinstance(rv, (int, float)):
                merged[field] = max(lv, rv)
            else:
                merged[field] = lv if lv is not None else (rv if rv is not None else 0)

        # Counters → sum
        for field in MASTERY_SUM_FIELDS:
            merged[field] = (local.get(field) or 0) + (remote.get(field) or 0)

        # Timestamps → most recent
        for field in MASTERY_TIMESTAMP_FIELDS:
            lt = self._parse_dt(local.get(field))
            rt = self._parse_dt(remote.get(field))
            if lt and rt:
                merged[field] = max(lt, rt).isoformat()
            elif lt:
                merged[field] = lt.isoformat()
            elif rt:
                merged[field] = rt.isoformat()

        # Topic mastery dicts → max per topic
        local_topics  = local.get("topic_mastery", {})
        remote_topics = remote.get("topic_mastery", {})
        all_topics = set(local_topics.keys()) | set(remote_topics.keys())
        merged_topics: dict[str, Any] = {}
        for topic_id in all_topics:
            lt = local_topics.get(topic_id, {}) if isinstance(local_topics, dict) else {}
            rt = remote_topics.get(topic_id, {}) if isinstance(remote_topics, dict) else {}
            topic: dict[str, Any] = {"topic_id": topic_id}
            for f in MASTERY_MERGE_FIELDS:
                topic[f] = max(
                    lt.get(f, 0) if isinstance(lt, dict) else 0,
                    rt.get(f, 0) if isinstance(rt, dict) else 0,
                )
            for f in MASTERY_SUM_FIELDS:
                topic[f] = (
                    (lt.get(f, 0) if isinstance(lt, dict) else 0)
                    + (rt.get(f, 0) if isinstance(rt, dict) else 0)
                )
            merged_topics[topic_id] = topic
        merged["topic_mastery"] = merged_topics

        # Answers list → deduplicate by question_id, keep most recent attempt
        local_answers  = {a["question_id"]: a for a in local.get("answers", []) if isinstance(a, dict) and "question_id" in a}
        remote_answers = {a["question_id"]: a for a in remote.get("answers", []) if isinstance(a, dict) and "question_id" in a}
        merged_answers: dict[str, Any] = {}
        for qid in set(local_answers) | set(remote_answers):
            la = local_answers.get(qid, {})
            ra = remote_answers.get(qid, {})
            la_ts = self._parse_dt(la.get("answered_at"))
            ra_ts = self._parse_dt(ra.get("answered_at"))
            if la_ts and ra_ts:
                merged_answers[qid] = la if la_ts >= ra_ts else ra
            elif la_ts:
                merged_answers[qid] = la
            else:
                merged_answers[qid] = ra
        merged["answers"] = list(merged_answers.values())

        # Provenance
        merged["local_timestamp"]  = (self._first_ts(local) or datetime.min.replace(tzinfo=timezone.utc)).isoformat()
        merged["remote_timestamp"] = (self._first_ts(remote) or datetime.min.replace(tzinfo=timezone.utc)).isoformat()

        return merged

    # ── Private: misc helpers ─────────────────────────────────────

    def _validate_action_type(self, action_type: str) -> None:
        if action_type not in ACTION_ENDPOINTS:
            raise ValueError(
                f"Unknown action type '{action_type}'. "
                f"Valid types: {', '.join(ACTION_ENDPOINTS)}"
            )

    @staticmethod
    def _generate_idempotency_key(student_id: str, action_type: str, data: dict[str, Any]) -> str:
        """SHA-256 of a canonical representation for deduplication."""
        canonical = json.dumps(
            {"s": student_id, "t": action_type, "d": data},
            sort_keys=True,
            default=str,
        )
        return hashlib.sha256(canonical.encode()).hexdigest()

    @staticmethod
    def _parse_dt(value: Any) -> datetime | None:
        """Best-effort parse of an ISO-8601 timestamp string."""
        if value is None:
            return None
        if isinstance(value, datetime):
            dt = value if value.tzinfo else value.replace(tzinfo=timezone.utc)
            return dt
        if not isinstance(value, str):
            return None
        for fmt in ("%Y-%m-%dT%H:%M:%S.%fZ", "%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%dT%H:%M:%SZ"):
            try:
                dt = datetime.strptime(value, fmt)
                return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
            except ValueError:
                continue
        try:
            dt = datetime.fromisoformat(value)
            return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
        except (ValueError, TypeError):
            return None

    @staticmethod
    def _first_ts(data: dict[str, Any]) -> datetime | None:
        """Return the first parseable timestamp from a payload."""
        for key in (
            "updated_at", "submitted_at", "completed_at",
            "last_practiced_at", "sent_at", "created_at",
        ):
            ts = SyncService._parse_dt(data.get(key))
            if ts:
                return ts
        return None


# ──────────────────────── Module-level helpers ─────────────────────

def _safe_json(response: httpx.Response, key: str, default: Any = None) -> Any:
    """Best-effort extraction of a JSON key from an HTTP response."""
    try:
        body = response.json()
        return body.get(key, default)
    except (httpx.HTTPError, ValueError, AttributeError):
        return default


# ───────────────────────────── Factory ──────────────────────────────

def create_sync_service(**kwargs: Any) -> SyncService:
    """
    Convenience factory so callers don't need to import SyncService directly.

    Reads ``SYNC_BASE_URL``, ``SYNC_MAX_RETRIES``, etc. from the FastAPI
    ``app.state.settings`` object when available, falling back to defaults.
    """
    try:
        from app import settings as app_settings  # type: ignore

        return SyncService(
            base_url=getattr(app_settings, "SYNC_BASE_URL", "http://localhost:8000"),
            max_retries=getattr(app_settings, "SYNC_MAX_RETRIES", MAX_RETRIES_DEFAULT),
            initial_backoff=getattr(app_settings, "SYNC_INITIAL_BACKOFF", INITIAL_BACKOFF_S),
            max_backoff=getattr(app_settings, "SYNC_MAX_BACKOFF", MAX_BACKOFF_S),
            batch_size=getattr(app_settings, "SYNC_BATCH_SIZE", BATCH_SIZE_DEFAULT),
            concurrency=getattr(app_settings, "SYNC_CONCURRENCY", CONCURRENCY_DEFAULT),
            request_timeout=getattr(app_settings, "SYNC_REQUEST_TIMEOUT", REQUEST_TIMEOUT_S),
        )
    except (ImportError, AttributeError):
        return SyncService(**kwargs)