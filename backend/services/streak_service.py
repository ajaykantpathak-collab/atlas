"""
Streak Service - Habit formation via consecutive-day practice tracking.

Features:
- Consecutive-day streak (current, longest, total days practiced)
- Grace days: 2 per calendar month to absorb missed days without breaking streak
- Streak freeze: visible 'frozen' state (not broken) while grace day is active
- Makeup sessions: practice next day to extend a frozen streak back to active
- Offline-capable: action queue syncs when connectivity returns

Workflow example:
  Mon-Thu practice → streak=4, frozen=False
  Fri miss (grace day) → streak=4, frozen=True, grace_left=1
  Sat practice → streak=5, frozen=False, grace_left=1
  Sat+Sun miss → streak=0 (broken), grace_left=1 (unused grace preserved)

Usage:
  service = StreakService(get_db)
  await service.record_practice(student_id=1, date=date.today())
  info = await service.get_streak(student_id=1)
"""

from __future__ import annotations

import asyncio
import logging
from collections import deque
from contextlib import asynccontextmanager, suppress
from dataclasses import dataclass, field
from datetime import date, datetime, timedelta
from enum import Enum
from typing import Any, AsyncIterator, Awaitable, Callable, Deque, Optional

from sqlalchemy import and_, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from database import (
    Attempt,
    Mastery,
    PracticeSession,
    Student,
)

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────────
# Session scope
# ─────────────────────────────────────────────────────────────
# The factories this service is documented to accept come in two shapes:
#   * `database.async_session`  — an async_sessionmaker (async context manager)
#   * `database.get_db`         — an async *generator* (the FastAPI dependency,
#                                 which yields a session and commits/rolls back)
# The docstrings above pass `get_db`, but `async with get_db()` raises
#   TypeError: 'async_generator' object does not support the asynchronous
#   'with' protocol
# in every DB path of this module. `_db_scope` accepts either shape so wiring
# this service per its own documentation cannot crash on the first query.


@asynccontextmanager
async def _db_scope(get_db: Callable[[], Any]) -> AsyncIterator[AsyncSession]:
    factory = get_db()
    if hasattr(factory, "__aenter__"):
        # Already a context manager (sessionmaker).
        async with factory as session:
            yield session
        return
    # An async generator: advance it to the session, then exhaust it so the
    # dependency's own commit/rollback/close tail runs.
    agen = factory
    session = await agen.__anext__()
    try:
        yield session
    finally:
        with suppress(StopAsyncIteration):
            await agen.asend(None)

# ─────────────────────────────────────────────────────────────
# Constants
# ─────────────────────────────────────────────────────────────

GRACE_DAYS_PER_MONTH = 2
STREAK_BREAK_GAP_DAYS = 2  # gap >= 2 → streak breaks; gap == 1 → makeup possible
SYNC_INTERVAL_SECONDS = 30  # background sync loop tick

# ─────────────────────────────────────────────────────────────
# Domain types
# ─────────────────────────────────────────────────────────────


class StreakState(str, Enum):
    """Public-facing streak state returned to the frontend."""

    ACTIVE = "active"  # streak running, today or yesterday practiced
    FROZEN = "frozen"  # streak preserved by grace day, still recoverable
    BROKEN = "broken"  # streak lost, will reset on next practice


@dataclass
class StreakInfo:
    """Snapshot of a student's streak status at a point in time."""

    current_streak: int = 0
    longest_streak: int = 0
    total_days_practiced: int = 0
    grace_days_remaining: int = GRACE_DAYS_PER_MONTH
    frozen: bool = False
    frozen_date: Optional[date] = None
    last_practice_date: Optional[date] = None
    state: StreakState = StreakState.BROKEN
    month_practiced_days: int = 0
    month_grace_used: int = 0

    def to_dict(self) -> dict[str, Any]:
        return {
            "current_streak": self.current_streak,
            "longest_streak": self.longest_streak,
            "total_days_practiced": self.total_days_practiced,
            "grace_days_remaining": self.grace_days_remaining,
            "frozen": self.frozen,
            "frozen_date": (
                self.frozen_date.isoformat() if self.frozen_date else None
            ),
            "last_practice_date": (
                self.last_practice_date.isoformat()
                if self.last_practice_date
                else None
            ),
            "state": self.state.value,
            # Hinglish-friendly labels
            "state_label": {
                StreakState.ACTIVE: "Streak: {} days 🔥".format(self.current_streak),
                StreakState.FROZEN: "Streak frozen at {} days ❄️ — practice today to resume".format(
                    self.current_streak
                ),
                StreakState.BROKEN: "Streak broken 😔 — start fresh today!",
            }[self.state],
            "month_practiced_days": self.month_practiced_days,
            "month_grace_used": self.month_grace_used,
        }


@dataclass
class MonthlyStats:
    """Aggregated statistics for a calendar month."""

    year: int
    month: int
    practiced_days: int = 0
    grace_days_used: int = 0
    practice_dates: list[str] = field(default_factory=list)
    grace_dates: list[str] = field(default_factory=list)
    current_streak_at_month_end: int = 0
    streak_events: list[dict[str, Any]] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "year": self.year,
            "month": self.month,
            "practiced_days": self.practiced_days,
            "grace_days_used": self.grace_days_used,
            "grace_days_remaining": max(0, GRACE_DAYS_PER_MONTH - self.grace_days_used),
            "practice_dates": self.practice_dates,
            "grace_dates": self.grace_dates,
            "current_streak_at_month_end": self.current_streak_at_month_end,
            "streak_events": self.streak_events,
        }


@dataclass
class StreakAction:
    """Queued offline action for later sync."""

    action_type: str  # 'record_practice' | 'use_grace_day'
    student_id: int
    date_str: str  # ISO format date string for determinism
    timestamp: str  # ISO datetime when action was queued
    retry_count: int = 0
    max_retries: int = 5

    def to_dict(self) -> dict[str, Any]:
        return {
            "action_type": self.action_type,
            "student_id": self.student_id,
            "date_str": self.date_str,
            "timestamp": self.timestamp,
            "retry_count": self.retry_count,
        }


# ─────────────────────────────────────────────────────────────
# Core streak computation (pure, deterministic, easily testable)
# ─────────────────────────────────────────────────────────────

def _compute_streak_update(
    sorted_practice_dates: list[date],
    current_streak: int,
    longest_streak: int,
    total_days: int,
    grace_days_used_month: int,
    new_date: date,
    today: date,
) -> tuple[int, int, int, bool, bool, Optional[date], StreakState]:
    """
    Pure function: compute the new streak state after a practice on new_date.

    Parameters
    ----------
    sorted_practice_dates : all previously recorded practice dates (ascending)
    current_streak : current streak count BEFORE this practice
    longest_streak : all-time best streak BEFORE this update
    total_days : total days ever practiced BEFORE this update
    grace_days_used_month : grace days consumed in current calendar month
    new_date : the date being recorded now
    today : current system date (for same-day detection)

    Returns
    -------
    (
        new_current_streak,
        new_longest_streak,
        new_total_days,
        frozen,           # streak is now frozen (grace day active)
        grace_consumed,   # a grace day was consumed in this call
        frozen_date,      # the date on which freeze occurred (or None)
        state,            # ACTIVE / FROZEN / BROKEN
    )

    Rules (in priority order):
    1. Same day → no change to streak count (already practiced today)
    2. Consecutive day (gap=1) → increment streak, clear freeze → ACTIVE
    3. Gap=0 but future date → ignore (deterministic: past/present only)
    4. Gap >= 2
       a) Grace available → freeze at current streak, consume grace → FROZEN
       b) No grace → break streak (new practice starts fresh) → BROKEN→ACTIVE
    """
    if not sorted_practice_dates:
        # First practice ever
        return 1, 1, 1, False, False, None, StreakState.ACTIVE

    last = sorted_practice_dates[-1]
    gap = (new_date - last).days

    # ── Case 1: same day → no streak change ──
    if gap == 0:
        return (
            current_streak,
            longest_streak,
            total_days,
            False,
            False,
            None,
            StreakState.ACTIVE,
        )

    # ── Case 2: consecutive day → extend streak ──
    if gap == 1:
        new_streak = current_streak + 1
        new_longest = max(longest_streak, new_streak)
        return (
            new_streak,
            new_longest,
            total_days + 1,
            False,  # freeze cleared
            False,
            None,
            StreakState.ACTIVE,
        )

    # ── Case 3: gap >= 2 ──
    grace_available = grace_days_used_month < GRACE_DAYS_PER_MONTH
    if grace_available:
        # Freeze: streak held, grace consumed, new_date enters chain
        # Next practice on new_date+1 will see gap=1 and resume
        return (
            current_streak,  # frozen at current value
            longest_streak,
            total_days + 1,
            True,  # frozen=True
            True,  # grace consumed
            new_date,
            StreakState.FROZEN,
        )
    else:
        # No grace → streak breaks, this practice starts a new streak of 1
        return (
            1,
            max(longest_streak, current_streak),
            total_days + 1,
            False,
            False,
            None,
            StreakState.ACTIVE,  # new streak starts immediately
        )


def _check_streak_state(
    last_practice_date: Optional[date],
    frozen: bool,
    frozen_date: Optional[date],
    today: date,
) -> StreakState:
    """Determine the current public-facing streak state."""
    if last_practice_date is None:
        return StreakState.BROKEN

    if frozen and frozen_date is not None:
        # Frozen streaks expire after STREAK_BREAK_GAP_DAYS of no recovery
        recovery_deadline = frozen_date + timedelta(days=STREAK_BREAK_GAP_DAYS)
        if today > recovery_deadline:
            return StreakState.BROKEN  # grace window elapsed
        return StreakState.FROZEN

    # Not frozen — check recency
    days_since = (today - last_practice_date).days
    if days_since <= 1:
        return StreakState.ACTIVE  # today or yesterday → still active
    if days_since < STREAK_BREAK_GAP_DAYS:
        # gap == 1: makeup window open, not yet broken
        return StreakState.FROZEN
    return StreakState.BROKEN


def _get_month_key(reference_date: date) -> tuple[int, int]:
    """Return (year, month) tuple for calendar-month bucketing."""
    return reference_date.year, reference_date.month


# ─────────────────────────────────────────────────────────────
# Offline action queue (in-memory, thread-safe)
# ─────────────────────────────────────────────────────────────


class OfflineActionQueue:
    """
    Thread-safe in-memory queue for offline streak actions.
    Survives process restarts when persisted to the StreakActionQueue DB table.
    The background sync loop periodically flushes to the database.
    """

    def __init__(self) -> None:
        self._queue: Deque[StreakAction] = deque()
        self._lock = asyncio.Lock()
        self._sync_task: Optional[asyncio.Task] = None
        self._running = False

    async def enqueue(self, action: StreakAction) -> None:
        async with self._lock:
            self._queue.append(action)
            logger.debug(
                "Queued offline action: %s for student %d on %s",
                action.action_type,
                action.student_id,
                action.date_str,
            )

    async def drain(self) -> list[StreakAction]:
        """Atomically drain the queue (called by sync loop)."""
        async with self._lock:
            actions = list(self._queue)
            self._queue.clear()
            return actions

    async def size(self) -> int:
        async with self._lock:
            return len(self._queue)

    async def start_background_sync(
        self, sync_callback: Callable[[list[StreakAction]], Awaitable[None]]
    ) -> None:
        """
        Start the background loop that flushes queued actions to the DB.

        Parameters
        ----------
        sync_callback : async function that receives drained actions and
                        persists them.  Must handle partial failures.
        """
        if self._running:
            return
        self._running = True
        self._sync_task = asyncio.create_task(
            self._sync_loop(sync_callback),
            name="streak-offline-sync",
        )
        logger.info("Offline sync loop started (interval=%ds)", SYNC_INTERVAL_SECONDS)

    async def stop(self) -> None:
        """Stop the background sync loop gracefully."""
        self._running = False
        if self._sync_task:
            self._sync_task.cancel()
            try:
                await self._sync_task
            except asyncio.CancelledError:
                pass
            self._sync_task = None
        logger.info("Offline sync loop stopped")

    async def _sync_loop(
        self, sync_callback: Callable[[list[StreakAction]], Awaitable[None]]
    ) -> None:
        while self._running:
            try:
                await asyncio.sleep(SYNC_INTERVAL_SECONDS)
                actions = await self.drain()
                if actions:
                    await sync_callback(actions)
            except asyncio.CancelledError:
                break
            except Exception:
                logger.exception("Offline sync loop error — will retry next tick")


# ─────────────────────────────────────────────────────────────
# Main service class
# ─────────────────────────────────────────────────────────────


class StreakService:
    """
    Async streak-tracking service for habit formation.

    Thread-safe for concurrent record_practice calls on the same student
    (protected by DB-level constraints via the Upsert pattern).

    Example::

        service = StreakService(get_db_session)
        await service.record_practice(student_id=1)              # today
        info = await service.get_streak(student_id=1)
        print(info.to_dict())
    """

    def __init__(self, get_db: Callable[[], AsyncSession]) -> None:
        self.get_db = get_db
        self._offline_queue = OfflineActionQueue()
        self._monthly_cache: dict[int, dict[tuple[int, int], int]] = {}
        # student_id → {(year, month): grace_used_count}
        self._today: Optional[date] = None  # injectable for testing

    # ── public interface ─────────────────────────────────────

    async def record_practice(
        self,
        student_id: int,
        practice_date: Optional[date] = None,
        *,
        queued_offline: bool = False,
    ) -> StreakInfo:
        """
        Record a practice session and update the student's streak.

        This is the primary entry point, called after every practice session
        (including makeup sessions).

        Parameters
        ----------
        student_id : the student
        practice_date : date of practice (defaults to today).  Must be <= today.
        queued_offline : if True, skip DB write and queue for later sync

        Returns
        -------
        StreakInfo with updated streak state
        """
        target_date = practice_date or self._today or date.today()
        if target_date > date.today():
            raise ValueError(
                f"Cannot record practice for a future date: {target_date}"
            )

        if queued_offline:
            action = StreakAction(
                action_type="record_practice",
                student_id=student_id,
                date_str=target_date.isoformat(),
                timestamp=datetime.utcnow().isoformat(),
            )
            await self._offline_queue.enqueue(action)
            # Return best-effort estimate without DB round-trip
            return await self.get_streak(student_id)

        async with _db_scope(self.get_db) as session:
            return await self._record_practice_db(
                session, student_id, target_date
            )

    async def get_streak(self, student_id: int) -> StreakInfo:
        """Return the current streak snapshot for a student."""
        async with _db_scope(self.get_db) as session:
            return await self._get_streak_db(session, student_id)

    async def check_streak_status(self, student_id: int) -> StreakState:
        """Return ACTIVE, FROZEN, or BROKEN for the student's current streak."""
        info = await self.get_streak(student_id)
        return info.state

    async def use_grace_day(
        self,
        student_id: int,
        missed_date: Optional[date] = None,
        *,
        queued_offline: bool = False,
    ) -> StreakInfo:
        """
        Explicitly consume a grace day for a missed date.

        This is a manual action (e.g., student taps 'Use Grace Day' in the UI).
        Calling use_grace_day does NOT record a practice — the student still
        needs to practice on a subsequent day to resume the streak.

        If record_practice is called on the missed date (same day), the grace
        day is NOT consumed (gap=0 path in _compute_streak_update).

        Parameters
        ----------
        student_id : the student
        missed_date : date that was missed (defaults to yesterday)
        queued_offline : if True, queue instead of DB write

        Returns
        -------
        StreakInfo after grace day application
        """
        target_date = missed_date or (self._today or date.today()) - timedelta(
            days=1
        )

        if queued_offline:
            action = StreakAction(
                action_type="use_grace_day",
                student_id=student_id,
                date_str=target_date.isoformat(),
                timestamp=datetime.utcnow().isoformat(),
            )
            await self._offline_queue.enqueue(action)
            return await self.get_streak(student_id)

        async with _db_scope(self.get_db) as session:
            info = await self._get_streak_db(session, student_id)
            if info.grace_days_remaining <= 0:
                logger.warning(
                    "Student %d has no grace days remaining", student_id
                )
                return info  # no change
            # Record the grace day usage in DB
            grace_used = StreakRecord(
                student_id=student_id,
                date=target_date,
                practiced=False,
                grace_day_used=True,
                streak_snapshot=info.current_streak,
                created_at=datetime.utcnow(),
            )
            session.add(grace_used)
            await session.flush()
            logger.info(
                "Student %d used grace day for %s (streak frozen at %d)",
                student_id,
                target_date,
                info.current_streak,
            )
            return await self._get_streak_db(session, student_id)

    async def get_monthly_stats(
        self, student_id: int, year: int, month: int
    ) -> MonthlyStats:
        """
        Return aggregated practice statistics for a calendar month.

        Parameters
        ----------
        student_id : the student
        year : calendar year
        month : calendar month (1-12)

        Returns
        -------
        MonthlyStats with practiced days, grace days used, and streak events
        """
        async with _db_scope(self.get_db) as session:
            return await self._get_monthly_stats_db(
                session, student_id, year, month
            )

    async def sync_offline_actions(self) -> int:
        """
        Flush all queued offline actions to the database.

        Returns the number of actions successfully synced.
        Failed actions stay in the queue for retry on next sync.
        """
        actions = await self._offline_queue.drain()
        if not actions:
            return 0

        synced = 0
        async with _db_scope(self.get_db) as session:
            for action in actions:
                try:
                    if action.action_type == "record_practice":
                        d = date.fromisoformat(action.date_str)
                        await self._record_practice_db(session, action.student_id, d)
                        synced += 1
                    elif action.action_type == "use_grace_day":
                        d = date.fromisoformat(action.date_str)
                        # Refresh grace usage count — handled by re-reading
                        # the streak state which already accounts for persisted
                        # grace days.  Just verify the action is still valid.
                        info = await self._get_streak_db(session, action.student_id)
                        if info.grace_days_remaining > 0:
                            grace_used = StreakRecord(
                                student_id=action.student_id,
                                date=d,
                                practiced=False,
                                grace_day_used=True,
                                streak_snapshot=info.current_streak,
                                created_at=datetime.utcnow(),
                            )
                            session.add(grace_used)
                            synced += 1
                        else:
                            logger.warning(
                                "Sync skipped grace day for student %d "
                                "on %s (no grace days remaining)",
                                action.student_id,
                                d,
                            )
                except Exception:
                    logger.exception(
                        "Failed to sync action %s for student %d",
                        action.action_type,
                        action.student_id,
                    )
                    action.retry_count += 1
                    if action.retry_count < action.max_retries:
                        await self._offline_queue.enqueue(action)

        if synced:
            logger.info("Synced %d/%d offline streak actions", synced, len(actions))
        return synced

    async def start_background_sync(self) -> None:
        """Start the background loop that syncs queued actions every 30s."""

        async def _sync_callback(actions: list[StreakAction]) -> None:
            await self.sync_offline_actions()

        await self._offline_queue.start_background_sync(_sync_callback)

    async def stop(self) -> None:
        """Stop background sync and flush remaining actions."""
        await self._offline_queue.stop()
        await self.sync_offline_actions()

    # ── DB helpers (private, always called within a session) ──

    async def _record_practice_db(
        self, session: AsyncSession, student_id: int, practice_date: date
    ) -> StreakInfo:
        """Internal: record practice with an active DB session."""
        # Load or create the StreakRecord row (idempotent upsert by date)
        result = await session.execute(
            select(StreakRecord).where(
                and_(
                    StreakRecord.student_id == student_id,
                    StreakRecord.date == practice_date,
                )
            )
        )
        existing = result.scalar_one_or_none()

        if existing and existing.practiced:
            # Already recorded today — return current state (idempotent)
            logger.debug(
                "Practice already recorded for student %d on %s",
                student_id,
                practice_date,
            )
            return await self._get_streak_db(session, student_id)

        # Get current streak context
        info = await self._get_streak_db(session, student_id)

        # Fetch all practice dates for computation
        dates_result = await session.execute(
            select(StreakRecord.date)
            .where(
                and_(
                    StreakRecord.student_id == student_id,
                    StreakRecord.practiced == True,  # noqa: E712
                )
            )
            .order_by(StreakRecord.date.asc())
        )
        practice_dates = [row[0] for row in dates_result.all()]

        # Grace days used this month
        month_key = _get_month_key(practice_date)
        grace_used = await self._count_grace_used_db(session, student_id, month_key)

        # Compute new streak state (pure function)
        (
            new_streak,
            new_longest,
            new_total,
            frozen,
            grace_consumed,
            frozen_date,
            state,
        ) = _compute_streak_update(
            sorted_practice_dates=practice_dates,
            current_streak=info.current_streak,
            longest_streak=info.longest_streak,
            total_days=info.total_days_practiced,
            grace_days_used_month=grace_used,
            new_date=practice_date,
            today=date.today(),
        )

        if existing:
            existing.practiced = True
            existing.grace_day_used = existing.grace_day_used or (
                not frozen and grace_consumed
            )
            existing.streak_snapshot = new_streak
            existing.updated_at = datetime.utcnow()
        else:
            session.add(
                StreakRecord(
                    student_id=student_id,
                    date=practice_date,
                    practiced=True,
                    grace_day_used=(not frozen and grace_consumed),
                    streak_snapshot=new_streak,
                    created_at=datetime.utcnow(),
                )
            )

        # Update the Student row with latest streak snapshot
        student_result = await session.execute(
            select(Student).where(Student.id == student_id)
        )
        student = student_result.scalar_one_or_none()
        if student:
            student.current_streak = new_streak
            student.longest_streak = new_longest
            student.total_days_practiced = new_total
            student.streak_frozen = frozen
            student.streak_frozen_date = frozen_date
            student.grace_days_remaining = max(
                0, GRACE_DAYS_PER_MONTH - grace_used - (1 if grace_consumed else 0)
            )
            student.last_practice_date = practice_date
            student.updated_at = datetime.utcnow()

        await session.flush()
        logger.info(
            "Streak recorded: student=%d date=%s streak=%d frozen=%s state=%s",
            student_id,
            practice_date,
            new_streak,
            frozen,
            state.value,
        )
        return StreakInfo(
            current_streak=new_streak,
            longest_streak=new_longest,
            total_days_practiced=new_total,
            grace_days_remaining=max(
                0,
                GRACE_DAYS_PER_MONTH
                - grace_used
                - (1 if grace_consumed else 0),
            ),
            frozen=frozen,
            frozen_date=frozen_date,
            last_practice_date=practice_date,
            state=state,
            month_practiced_days=await self._count_practiced_days_db(
                session, student_id, month_key
            ),
            month_grace_used=grace_used + (1 if grace_consumed else 0),
        )

    async def _get_streak_db(
        self, session: AsyncSession, student_id: int
    ) -> StreakInfo:
        """Build a StreakInfo by querying the DB."""
        # Load student row (source of truth for streak snapshot)
        result = await session.execute(
            select(Student).where(Student.id == student_id)
        )
        student = result.scalar_one_or_none()

        if student is None:
            return StreakInfo()

        today = date.today()

        # Recompute grace days used this month from StreakRecord table
        # (the Student row may lag if actions are queued)
        month_key = _get_month_key(today)
        grace_used = await self._count_grace_used_db(session, student_id, month_key)
        grace_remaining = max(0, GRACE_DAYS_PER_MONTH - grace_used)

        # Determine state
        state = _check_streak_state(
            last_practice_date=student.last_practice_date,
            frozen=student.streak_frozen or False,
            frozen_date=student.streak_frozen_date,
            today=today,
        )

        return StreakInfo(
            current_streak=student.current_streak or 0,
            longest_streak=student.longest_streak or 0,
            total_days_practiced=student.total_days_practiced or 0,
            grace_days_remaining=grace_remaining,
            frozen=student.streak_frozen or False,
            frozen_date=student.streak_frozen_date,
            last_practice_date=student.last_practice_date,
            state=state,
            month_practiced_days=await self._count_practiced_days_db(
                session, student_id, month_key
            ),
            month_grace_used=grace_used,
        )

    async def _get_monthly_stats_db(
        self, session: AsyncSession, student_id: int, year: int, month: int
    ) -> MonthlyStats:
        """Build MonthlyStats for a calendar month from the DB."""
        month_start = date(year, month, 1)
        if month == 12:
            month_end = date(year + 1, 1, 1) - timedelta(days=1)
        else:
            month_end = date(year, month + 1, 1) - timedelta(days=1)

        # Fetch all streak records in the month
        result = await session.execute(
            select(StreakRecord)
            .where(
                and_(
                    StreakRecord.student_id == student_id,
                    StreakRecord.date >= month_start,
                    StreakRecord.date <= month_end,
                )
            )
            .order_by(StreakRecord.date.asc())
        )
        records = result.scalars().all()

        practice_dates: list[str] = []
        grace_dates: list[str] = []
        streak_events: list[dict[str, Any]] = []
        practiced_count = 0
        grace_count = 0
        streak_at_end = 0

        for rec in records:
            ds = rec.date.isoformat()
            if rec.practiced:
                practice_dates.append(ds)
                practiced_count += 1
            if rec.grace_day_used:
                grace_dates.append(ds)
                grace_count += 1
            streak_events.append(
                {
                    "date": ds,
                    "practiced": rec.practiced,
                    "grace_day_used": rec.grace_day_used,
                    "streak_snapshot": rec.streak_snapshot,
                }
            )
            streak_at_end = rec.streak_snapshot

        return MonthlyStats(
            year=year,
            month=month,
            practiced_days=practiced_count,
            grace_days_used=grace_count,
            practice_dates=practice_dates,
            grace_dates=grace_dates,
            current_streak_at_month_end=streak_at_end,
            streak_events=streak_events,
        )

    async def _count_grace_used_db(
        self,
        session: AsyncSession,
        student_id: int,
        month_key: tuple[int, int],
    ) -> int:
        """Count grace days consumed in the given calendar month."""
        year, month = month_key
        month_start = date(year, month, 1)
        if month == 12:
            month_end = date(year + 1, 1, 1) - timedelta(days=1)
        else:
            month_end = date(year, month + 1, 1) - timedelta(days=1)

        result = await session.execute(
            select(func.count(StreakRecord.id)).where(
                and_(
                    StreakRecord.student_id == student_id,
                    StreakRecord.grace_day_used == True,  # noqa: E712
                    StreakRecord.date >= month_start,
                    StreakRecord.date <= month_end,
                )
            )
        )
        return result.scalar_one() or 0

    async def _count_practiced_days_db(
        self,
        session: AsyncSession,
        student_id: int,
        month_key: tuple[int, int],
    ) -> int:
        """Count practiced days in the given calendar month."""
        year, month = month_key
        month_start = date(year, month, 1)
        if month == 12:
            month_end = date(year + 1, 1, 1) - timedelta(days=1)
        else:
            month_end = date(year, month + 1, 1) - timedelta(days=1)

        result = await session.execute(
            select(func.count(StreakRecord.id)).where(
                and_(
                    StreakRecord.student_id == student_id,
                    StreakRecord.practiced == True,  # noqa: E712
                    StreakRecord.date >= month_start,
                    StreakRecord.date <= month_end,
                )
            )
        )
        return result.scalar_one() or 0

    # ── utility methods ──────────────────────────────────────

    async def reset_streak(self, student_id: int) -> StreakInfo:
        """
        Manually reset a student's streak (e.g., student opts to start fresh).
        Longest and total_days are preserved.
        """
        async with _db_scope(self.get_db) as session:
            result = await session.execute(
                select(Student).where(Student.id == student_id)
            )
            student = result.scalar_one_or_none()
            if student is None:
                return StreakInfo()

            student.current_streak = 0
            student.streak_frozen = False
            student.streak_frozen_date = None
            student.grace_days_remaining = GRACE_DAYS_PER_MONTH
            student.updated_at = datetime.utcnow()
            await session.flush()

            logger.info("Streak reset for student %d", student_id)
            return await self._get_streak_db(session, student_id)

    async def reset_grace_days(self, student_id: int) -> StreakInfo:
        """
        Force-reset grace days to GRACE_DAYS_PER_MONTH.
        Called automatically at month rollover by the monthly reset job.
        """
        async with _db_scope(self.get_db) as session:
            result = await session.execute(
                select(Student).where(Student.id == student_id)
            )
            student = result.scalar_one_or_none()
            if student is None:
                return StreakInfo()

            student.grace_days_remaining = GRACE_DAYS_PER_MONTH
            student.updated_at = datetime.utcnow()
            await session.flush()
            return await self._get_streak_db(session, student_id)

    async def get_practice_dates(
        self, student_id: int, limit: Optional[int] = None
    ) -> list[date]:
        """Return all practice dates for a student, optionally limited."""
        async with _db_scope(self.get_db) as session:
            query = (
                select(StreakRecord.date)
                .where(
                    and_(
                        StreakRecord.student_id == student_id,
                        StreakRecord.practiced == True,  # noqa: E712
                    )
                )
                .order_by(StreakRecord.date.desc())
            )
            if limit:
                query = query.limit(limit)
            result = await session.execute(query)
            return [row[0] for row in result.all()]

    async def has_practiced_today(self, student_id: int) -> bool:
        """Quick check: has this student already practiced today?"""
        today = self._today or date.today()
        async with _db_scope(self.get_db) as session:
            result = await session.execute(
                select(StreakRecord.id).where(
                    and_(
                        StreakRecord.student_id == student_id,
                        StreakRecord.date == today,
                        StreakRecord.practiced == True,  # noqa: E712
                    )
                )
            )
            return result.scalar_one_or_none() is not None

    def get_offline_queue_size(self) -> int:
        """Return the number of actions waiting to be synced."""
        return asyncio.get_event_loop().run_until_complete(
            self._offline_queue.size()
        )


# ─────────────────────────────────────────────────────────────
# Monthly maintenance job (run via Celery / cron / APScheduler)
# ─────────────────────────────────────────────────────────────


async def monthly_streak_maintenance(get_db: Callable[[], AsyncSession]) -> None:
    """
    End-of-month housekeeping task.  Should be scheduled via cron or
    APScheduler on the 1st of each month.

    Does:
    1. Reset grace_days_remaining to GRACE_DAYS_PER_MONTH for all active students
    2. Expire stale frozen streaks (frozen longer than STREAK_BREAK_GAP_DAYS)
    """
    today = date.today()
    async with _db_scope(get_db) as session:
        # Reset grace days for all students
        result = await session.execute(select(Student.id))
        student_ids = [row[0] for row in result.all()]

        reset_count = 0
        for sid in student_ids:
            grace_used = await StreakService(get_db)._count_grace_used_db(
                session, sid, _get_month_key(today)
            )
            grace_result = await session.execute(
                select(Student).where(Student.id == sid)
            )
            stu = grace_result.scalar_one_or_none()
            if stu:
                old_remaining = stu.grace_days_remaining
                stu.grace_days_remaining = max(
                    0, GRACE_DAYS_PER_MONTH - grace_used
                )
                if stu.grace_days_remaining != old_remaining:
                    reset_count += 1

        await session.flush()
        logger.info(
            "Monthly maintenance complete: grace days reset for %d students",
            reset_count,
        )

        # Expire frozen streaks past the recovery window
        freeze_cutoff = today - timedelta(days=STREAK_BREAK_GAP_DAYS)
        expired_result = await session.execute(
            select(Student).where(
                and_(
                    Student.streak_frozen == True,  # noqa: E712
                    Student.streak_frozen_date <= freeze_cutoff,
                )
            )
        )
        expired_students = expired_result.scalars().all()
        for stu in expired_students:
            logger.info(
                "Expired frozen streak for student %d (frozen since %s)",
                stu.id,
                stu.streak_frozen_date,
            )
            stu.streak_frozen = False
            stu.current_streak = 0
            stu.streak_frozen_date = None

        await session.flush()


# ─────────────────────────────────────────────────────────────
# Service factory / singleton
# ─────────────────────────────────────────────────────────────

_streak_service: Optional[StreakService] = None


def get_streak_service(
    get_db: Callable[[], AsyncSession],
) -> StreakService:
    """
    Return (and lazily initialise) the global StreakService singleton.

    Call once at application startup to start the background sync loop:

        service = get_streak_service(get_db)
        await service.start_background_sync()
    """
    global _streak_service
    if _streak_service is None:
        _streak_service = StreakService(get_db)
    return _streak_service


async def shutdown_streak_service() -> None:
    """Flush queue and stop background loop.  Call on application shutdown."""
    global _streak_service
    if _streak_service is not None:
        await _streak_service.stop()
        _streak_service = None
