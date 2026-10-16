"""
Mastery Sync Service
Real-time BKT/IRT/AFM mastery updates with SM-2 review scheduling.
"""

import asyncio
import hashlib
import json
import logging
import os
import time
import uuid
from collections import defaultdict
from dataclasses import dataclass, field, asdict
from datetime import datetime, timedelta
from decimal import Decimal
from typing import Any, Optional

logger = logging.getLogger(__name__)

# ── optional Redis ──────────────────────────────────────────────────────────
try:
    import redis.asyncio as aioredis
    _REDIS_AVAILABLE = True
except ImportError:
    _REDIS_AVAILABLE = False
    aioredis = None  # type: ignore[assignment]

# ── dataclasses ─────────────────────────────────────────────────────────────

@dataclass
class MasteryState:
    student_id: str
    topic_id: str
    subject: str
    bkt_p_know: float = 0.1
    bkt_p_learn: float = 0.3
    # P(guess) aligned with ProgressService.BKT_P_GUESS (0.2) so the ORM
    # mastery_records store and this live store compute IDENTICAL BKT
    # trajectories from the same evidence — one-record rule (2026-09).
    bkt_p_guess: float = 0.2
    bkt_p_slip: float = 0.1
    bkt_p_transit: float = 0.1
    irt_theta: float = 0.0
    irt_se: float = 1.0
    afm_rate: float = 0.0
    afm_intercept: float = 0.0
    attempts: int = 0
    correct_count: int = 0
    streak: int = 0
    best_streak: int = 0
    last_result: Optional[bool] = None
    last_review: Optional[datetime] = None
    next_review: Optional[datetime] = None
    sm2_interval: int = 0
    sm2_ef: float = 2.5
    sm2_reps: int = 0
    difficulty: float = 0.5
    updated_at: datetime = field(default_factory=datetime.utcnow)


@dataclass
class AttemptRecord:
    student_id: str
    topic_id: str
    subject: str
    correct: bool
    time_ms: float
    timestamp: datetime = field(default_factory=datetime.utcnow)
    id: str = field(default_factory=lambda: str(uuid.uuid4()))


@dataclass
class QueuedUpdate:
    id: str
    student_id: str
    records: list[dict[str, Any]]
    created_at: datetime = field(default_factory=datetime.utcnow)
    synced: bool = False
    retries: int = 0


# ── helpers ─────────────────────────────────────────────────────────────────

def _sig(x: float) -> float:
    return 1.0 / (1.0 + pow(2.718281828, -x))


def _norm_cdf(x: float) -> float:
    """Approximate standard normal CDF via Abramowitz & Stegun."""
    if x >= 6.0:
        return 1.0
    if x <= -6.0:
        return 0.0
    a1, a2, a3, a4, a5 = 0.319381530, -0.356563782, 1.781477937, -1.821255978, 1.330274429
    t = 1.0 / (1.0 + 0.2316419 * abs(x))
    poly = t * (a1 + t * (a2 + t * (a3 + t * (a4 + t * a5))))
    phi = 1.0 - (1.0 / (2.50662827463 * abs(x))) * poly * pow(2.718281828, -x * x / 2.0)
    return 1.0 - phi if x >= 0 else phi


def _dedup_key(student_id: str, topic_id: str, timestamp: datetime, correct: bool) -> str:
    raw = f"{student_id}:{topic_id}:{timestamp.isoformat()}:{correct}"
    return hashlib.sha256(raw.encode()).hexdigest()[:32]


# ── BKT Model ───────────────────────────────────────────────────────────────

class BKTModel:
    """Bayesian Knowledge Tracing."""

    @staticmethod
    def update(state: MasteryState, correct: bool) -> float:
        p = state.bkt_p_know
        g = state.bkt_p_guess
        s = state.bkt_p_slip
        t = state.bkt_p_transit

        if correct:
            p = p * (1.0 - s) / (p * (1.0 - s) + (1.0 - p) * g)
        else:
            p = p * s / (p * s + (1.0 - p) * (1.0 - g))

        p = p + (1.0 - p) * t
        state.bkt_p_know = max(0.0, min(1.0, p))
        return state.bkt_p_know


# ── IRT Model (1PL logistic) ────────────────────────────────────────────────

class IRTModel:
    """Item Response Theory — 1-parameter logistic."""

    @staticmethod
    def probability(theta: float, difficulty: float) -> float:
        return _sig(theta - difficulty)

    @staticmethod
    def update(state: MasteryState, correct: bool, difficulty: float) -> tuple[float, float]:
        theta = state.irt_theta
        se = state.irt_se

        for _ in range(10):
            p = _sig(theta - difficulty)
            if p <= 1e-10:
                p = 1e-10
            if p >= 1.0 - 1e-10:
                p = 1.0 - 1e-10
            d = (1.0 if correct else 0.0) - p
            info = p * (1.0 - p)
            if info < 1e-10:
                info = 1e-10
            se_sq = 1.0 / info + se * se
            new_se = max(0.01, se_sq ** 0.5)
            lr = 1.0 / max(se_sq, 1e-10)
            theta = theta + lr * d
            se = new_se
            if abs(lr * d) < 1e-6:
                break

        theta = max(-4.0, min(4.0, theta))
        state.irt_theta = theta
        state.irt_se = se
        state.difficulty = difficulty
        return theta, se


# ── AFM Model ───────────────────────────────────────────────────────────────

class AFMModel:
    """Additive Factors Model — estimates learning rate per practice opportunity."""

    MAX_PRACTICE = 100

    @staticmethod
    def update(state: MasteryState) -> float:
        n = min(state.attempts, AFMModel.MAX_PRACTICE)
        if n == 0:
            return 0.0
        rate = state.correct_count / n
        decay = 1.0 / (1.0 + 0.05 * n)
        effective = rate * decay
        state.afm_rate = 0.85 * state.afm_rate + 0.15 * effective
        return state.afm_rate


# ── SM-2 Scheduler ──────────────────────────────────────────────────────────

class SM2Scheduler:
    """SuperMemo-2 for spaced repetition review scheduling."""

    @staticmethod
    def grade(correct: bool, time_ms: float) -> int:
        if not correct:
            return 1
        if time_ms > 30000:
            return 3
        if time_ms > 15000:
            return 4
        return 5

    @staticmethod
    def update(state: MasteryState, correct: bool, time_ms: float) -> tuple[datetime, int]:
        g = SM2Scheduler.grade(correct, time_ms)

        # Canonical SM-2 order: easiness factor updates FIRST, so the
        # reps>=3 interval multiplies by the NEW EF (same math as
        # ProgressService.submit_review — both writers schedule the same
        # student honestly).
        state.sm2_ef = max(1.3, state.sm2_ef + (0.1 - (5.0 - g) * (0.08 + (5.0 - g) * 0.02)))

        if g >= 3:
            if state.sm2_reps == 0:
                state.sm2_interval = 1
            elif state.sm2_reps == 1:
                state.sm2_interval = 6
            else:
                state.sm2_interval = max(1, round(state.sm2_interval * state.sm2_ef))
            state.sm2_reps += 1
        else:
            state.sm2_reps = 0
            state.sm2_interval = 1

        now = datetime.utcnow()
        state.last_review = now
        state.next_review = now + timedelta(days=state.sm2_interval)
        return state.next_review, state.sm2_interval


# ── IRT Feedback Loop Service ───────────────────────────────────────────────

class IRTSyncService:
    """Stub — mirrors the existing services/irt_feedback_loop interface."""

    def __init__(self, db_pool=None, redis_client=None):
        self.db_pool = db_pool
        self.redis_client = redis_client

    async def on_attempt(self, student_id: str, topic_id: str,
                         correct: bool, difficulty: float):
        pass

    async def get_theta(self, student_id: str) -> float:
        return 0.0


# ── Mastery Sync Service ────────────────────────────────────────────────────

class MasterySyncService:
    """
    Central mastery synchronization service.

    Usage:
        svc = MasterySyncService(redis_url="redis://localhost:6379")
        await svc.start()
        await svc.update_on_attempt("s1", "t1", True, 4200.0)
        m = await svc.get_mastery("s1", "t1")
        await svc.shutdown()
    """

    UPSERT_SQL = """
        INSERT INTO mastery_state
            (student_id, topic_id, subject, bkt_p_know, bkt_p_learn, bkt_p_guess,
             bkt_p_slip, bkt_p_transit, irt_theta, irt_se, afm_rate, afm_intercept,
             attempts, correct_count, streak, best_streak, last_result,
             last_review, next_review, sm2_interval, sm2_ef, sm2_reps,
             difficulty, updated_at)
        VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
             $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
        ON CONFLICT (student_id, topic_id) DO UPDATE SET
            bkt_p_know      = EXCLUDED.bkt_p_know,
            bkt_p_learn     = EXCLUDED.bkt_p_learn,
            bkt_p_guess     = EXCLUDED.bkt_p_guess,
            bkt_p_slip      = EXCLUDED.bkt_p_slip,
            bkt_p_transit   = EXCLUDED.bkt_p_transit,
            irt_theta       = EXCLUDED.irt_theta,
            irt_se          = EXCLUDED.irt_se,
            afm_rate        = EXCLUDED.afm_rate,
            afm_intercept   = EXCLUDED.afm_intercept,
            attempts        = EXCLUDED.attempts,
            correct_count   = EXCLUDED.correct_count,
            streak          = EXCLUDED.streak,
            best_streak     = EXCLUDED.best_streak,
            last_result     = EXCLUDED.last_result,
            last_review     = EXCLUDED.last_review,
            next_review     = EXCLUDED.next_review,
            sm2_interval    = EXCLUDED.sm2_interval,
            sm2_ef          = EXCLUDED.sm2_ef,
            sm2_reps        = EXCLUDED.sm2_reps,
            difficulty      = EXCLUDED.difficulty,
            updated_at      = EXCLUDED.updated_at
    """

    SELECT_MASTERY = """
        SELECT student_id, topic_id, subject,
               bkt_p_know, irt_theta, afm_rate,
               last_review, next_review
        FROM mastery_state
        WHERE student_id = $1 AND topic_id = $2
    """

    SELECT_BY_SUBJECT = """
        SELECT topic_id, bkt_p_know, irt_theta, afm_rate,
               last_review, next_review, attempts, correct_count
        FROM mastery_state
        WHERE student_id = $1 AND subject = $2
    """

    SELECT_REVIEWS = """
        SELECT topic_id, subject, next_review, bkt_p_know, sm2_ef
        FROM mastery_state
        WHERE student_id = $1
          AND next_review IS NOT NULL
          AND next_review <= $2
        ORDER BY bkt_p_know ASC
    """

    SELECT_REVIEWS_OVERDUE = """
        SELECT topic_id, subject, next_review, bkt_p_know
        FROM mastery_state
        WHERE student_id = $1
          AND next_review IS NOT NULL
          AND next_review <= $2
    """

    CREATE_TABLE = """
        CREATE TABLE IF NOT EXISTS mastery_state (
            student_id      TEXT    NOT NULL,
            topic_id        TEXT    NOT NULL,
            subject         TEXT    NOT NULL,
            bkt_p_know      FLOAT   NOT NULL DEFAULT 0.1,
            bkt_p_learn     FLOAT   NOT NULL DEFAULT 0.3,
            bkt_p_guess     FLOAT   NOT NULL DEFAULT 0.2,
            bkt_p_slip      FLOAT   NOT NULL DEFAULT 0.1,
            bkt_p_transit   FLOAT   NOT NULL DEFAULT 0.1,
            irt_theta       FLOAT   NOT NULL DEFAULT 0.0,
            irt_se          FLOAT   NOT NULL DEFAULT 1.0,
            afm_rate        FLOAT   NOT NULL DEFAULT 0.0,
            afm_intercept   FLOAT   NOT NULL DEFAULT 0.0,
            attempts        INTEGER NOT NULL DEFAULT 0,
            correct_count   INTEGER NOT NULL DEFAULT 0,
            streak          INTEGER NOT NULL DEFAULT 0,
            best_streak     INTEGER NOT NULL DEFAULT 0,
            last_result     BOOLEAN,
            last_review     TIMESTAMP,
            next_review     TIMESTAMP,
            sm2_interval    INTEGER NOT NULL DEFAULT 0,
            sm2_ef          FLOAT   NOT NULL DEFAULT 2.5,
            sm2_reps        INTEGER NOT NULL DEFAULT 0,
            difficulty      FLOAT   NOT NULL DEFAULT 0.5,
            updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
            PRIMARY KEY (student_id, topic_id)
        );
        CREATE INDEX IF NOT EXISTS idx_ms_student ON mastery_state (student_id);
        CREATE INDEX IF NOT EXISTS idx_ms_review ON mastery_state (student_id, next_review);
        CREATE INDEX IF NOT EXISTS idx_ms_subject ON mastery_state (student_id, subject);
    """

    CREATE_QUEUE = """
        CREATE TABLE IF NOT EXISTS mastery_offline_queue (
            id          TEXT        NOT NULL PRIMARY KEY,
            student_id  TEXT        NOT NULL,
            records     JSONB       NOT NULL,
            created_at  TIMESTAMP   NOT NULL DEFAULT NOW(),
            synced      BOOLEAN     NOT NULL DEFAULT FALSE,
            retries     INTEGER     NOT NULL DEFAULT 0
        );
        CREATE INDEX IF NOT EXISTS idx_moq_student ON mastery_offline_queue (student_id, synced);
    """

    # ── lifecycle ───────────────────────────────────────────────────────────

    def __init__(
        self,
        db_pool=None,
        redis_url: Optional[str] = None,
        cache_ttl: int = 60,
        max_queue_size: int = 5000,
        offline: bool = False,
    ):
        self._pool = db_pool
        self._redis_url = redis_url
        self._cache_ttl = cache_ttl
        self._max_queue_size = max_queue_size
        self._offline = offline

        self._locks: dict[str, asyncio.Lock] = defaultdict(asyncio.Lock)
        self._states: dict[str, MasteryState] = {}
        self._subject_idx: dict[str, set[str]] = defaultdict(set)
        self._redis: Any = None
        self._online = not offline
        self._queue: list[QueuedUpdate] = []
        self._seen: set[str] = set()
        self._running = False
        self._sync_task: Optional[asyncio.Task] = None
        self._irt = IRTSyncService(db_pool=db_pool)

    async def start(self) -> None:
        if self._redis_url and _REDIS_AVAILABLE:
            try:
                self._redis = aioredis.from_url(
                    self._redis_url,
                    decode_responses=True,
                    socket_connect_timeout=3,
                    socket_timeout=3,
                )
                await self._redis.ping()
                logger.info("Redis connected for mastery cache")
            except Exception as exc:
                logger.warning("Redis unavailable, using in-memory only: %s", exc)
                self._redis = None

        if self._pool is not None:
            async with self._pool.acquire() as conn:
                # asyncpg execute() runs ONE statement — split the DDL
                # strings on ';' so each CREATE runs separately.
                for ddl in (self.CREATE_TABLE, self.CREATE_QUEUE):
                    for stmt in ddl.split(";"):
                        stmt = stmt.strip()
                        if stmt:
                            await conn.execute(stmt)

        if self._offline:
            logger.info("MasterySync running in OFFLINE mode")
        else:
            self._running = True
            self._sync_task = asyncio.create_task(self._background_sync())
            logger.info("MasterySync started")

    async def shutdown(self) -> None:
        self._running = False
        if self._sync_task:
            self._sync_task.cancel()
            try:
                await self._sync_task
            except asyncio.CancelledError:
                pass
        if self._redis:
            try:
                await self._redis.close()
            except Exception:
                pass
        logger.info("MasterySync shutdown")

    # ── internal ────────────────────────────────────────────────────────────

    def _state_key(self, student_id: str, topic_id: str) -> str:
        return f"{student_id}:{topic_id}"

    async def _get_state(self, student_id: str, topic_id: str, subject: str) -> MasteryState:
        key = self._state_key(student_id, topic_id)
        if key not in self._states:
            cached = await self._cache_get(key)
            if cached is not None:
                try:
                    data = json.loads(cached)
                    data.setdefault("subject", subject)
                    data.setdefault("last_review", None)
                    data.setdefault("next_review", None)
                    ms = MasteryState(**data)
                    self._states[key] = ms
                    self._subject_idx[student_id].add(topic_id)
                except Exception:
                    pass

            if key not in self._states and self._pool is not None:
                async with self._pool.acquire() as conn:
                    row = await conn.fetchrow(self.SELECT_MASTERY, student_id, topic_id)
                if row:
                    ms = MasteryState(
                        student_id=row["student_id"],
                        topic_id=row["topic_id"],
                        subject=row["subject"],
                        bkt_p_know=row["bkt_p_know"],
                        irt_theta=row["irt_theta"],
                        afm_rate=row["afm_rate"],
                        last_review=row["last_review"],
                        next_review=row["next_review"],
                    )
                    self._states[key] = ms
                    self._subject_idx[student_id].add(topic_id)

            if key not in self._states:
                ms = MasteryState(
                    student_id=student_id,
                    topic_id=topic_id,
                    subject=subject,
                )
                self._states[key] = ms
                self._subject_idx[student_id].add(topic_id)

        return self._states[key]

    async def _persist(self, state: MasteryState) -> None:
        if self._pool is None:
            return
        async with self._pool.acquire() as conn:
            await conn.execute(
                self.UPSERT_SQL,
                state.student_id, state.topic_id, state.subject,
                float(state.bkt_p_know), float(state.bkt_p_learn), float(state.bkt_p_guess),
                float(state.bkt_p_slip), float(state.bkt_p_transit),
                float(state.irt_theta), float(state.irt_se),
                float(state.afm_rate), float(state.afm_intercept),
                int(state.attempts), int(state.correct_count),
                int(state.streak), int(state.best_streak),
                state.last_result,
                state.last_review, state.next_review,
                int(state.sm2_interval), float(state.sm2_ef), int(state.sm2_reps),
                float(state.difficulty),
                state.updated_at,
            )
        await self._cache_set(
            self._state_key(state.student_id, state.topic_id),
            json.dumps({
                "student_id": state.student_id,
                "topic_id": state.topic_id,
                "subject": state.subject,
                "bkt_p_know": state.bkt_p_know,
                "bkt_p_learn": state.bkt_p_learn,
                "bkt_p_guess": state.bkt_p_guess,
                "bkt_p_slip": state.bkt_p_slip,
                "bkt_p_transit": state.bkt_p_transit,
                "irt_theta": state.irt_theta,
                "irt_se": state.irt_se,
                "afm_rate": state.afm_rate,
                "afm_intercept": state.afm_intercept,
                "attempts": state.attempts,
                "correct_count": state.correct_count,
                "streak": state.streak,
                "best_streak": state.best_streak,
                "last_result": state.last_result,
                "sm2_interval": state.sm2_interval,
                "sm2_ef": state.sm2_ef,
                "sm2_reps": state.sm2_reps,
                "difficulty": state.difficulty,
            }),
        )

    async def _cache_get(self, key: str) -> Optional[str]:
        if self._redis is None:
            return None
        try:
            return await self._redis.get(key)
        except Exception:
            return None

    async def _cache_set(self, key: str, value: str) -> None:
        if self._redis is None:
            return
        try:
            await self._redis.setex(key, self._cache_ttl, value)
        except Exception:
            pass

    async def _cache_delete(self, key: str) -> None:
        if self._redis is None:
            return
        try:
            await self._redis.delete(key)
        except Exception:
            pass

    async def _background_sync(self) -> None:
        while self._running:
            try:
                await asyncio.sleep(5)
                if self._queue and self._online:
                    await self._flush_queue()
            except asyncio.CancelledError:
                break
            except Exception as exc:
                logger.error("Background sync error: %s", exc)

    async def _flush_queue(self) -> None:
        if not self._queue:
            return
        batch = self._queue[:50]
        self._queue = self._queue[50:]
        for qu in batch:
            try:
                await self._process_queued_update(qu)
                qu.synced = True
            except Exception as exc:
                qu.retries += 1
                if qu.retries < 5:
                    self._queue.insert(0, qu)
                logger.error("Failed to flush queued update %s: %s", qu.id, exc)

    async def _process_queued_update(self, qu: QueuedUpdate) -> None:
        for rec in qu.records:
            dedup = _dedup_key(rec["student_id"], rec["topic_id"],
                               rec["timestamp"], rec["correct"])
            if dedup in self._seen:
                continue
            self._seen.add(dedup)
            await self._apply_record(
                rec["student_id"], rec["topic_id"], rec["subject"],
                rec["correct"], rec["time_ms"], rec["timestamp"],
                rec.get("difficulty", 0.5), persist=True,
            )

    async def _apply_record(
        self,
        student_id: str,
        topic_id: str,
        subject: str,
        correct: bool,
        time_ms: float,
        timestamp: datetime,
        difficulty: float = 0.5,
        persist: bool = True,
    ) -> MasteryState:
        state = await self._get_state(student_id, topic_id, subject)
        state.attempts += 1
        state.last_result = correct
        state.updated_at = timestamp
        if correct:
            state.correct_count += 1
            state.streak += 1
            if state.streak > state.best_streak:
                state.best_streak = state.streak
        else:
            state.streak = 0

        BKTModel.update(state, correct)
        IRTModel.update(state, correct, difficulty)
        AFMModel.update(state)
        SM2Scheduler.update(state, correct, time_ms)

        if persist and self._pool is not None:
            try:
                await self._persist(state)
            except Exception as exc:
                logger.warning("mastery persist failed for %s/%s: %s",
                               student_id, topic_id, exc)
        elif persist:
            logger.info("mastery persist skipped — no pool for %s/%s",
                        student_id, topic_id)

        return state

    # ── public API ──────────────────────────────────────────────────────────

    async def update_on_attempt(
        self,
        student_id: str,
        topic_id: str,
        correct: bool,
        time_ms: float,
        subject: str = "general",
        difficulty: float = 0.5,
        timestamp: Optional[datetime] = None,
    ) -> dict[str, Any]:
        """
        Update all models on a single learning action.
        Target: <100ms per call.
        """
        ts = timestamp or datetime.utcnow()
        lock = self._locks[student_id]
        t0 = time.monotonic()

        async with lock:
            if not self._online:
                qu = QueuedUpdate(
                    id=str(uuid.uuid4()),
                    student_id=student_id,
                    records=[{
                        "student_id": student_id,
                        "topic_id": topic_id,
                        "subject": subject,
                        "correct": correct,
                        "time_ms": time_ms,
                        "timestamp": ts.isoformat(),
                        "difficulty": difficulty,
                    }],
                )
                if len(self._queue) < self._max_queue_size:
                    self._queue.append(qu)
                return {"status": "queued", "queue_size": len(self._queue)}

            dedup = _dedup_key(student_id, topic_id, ts, correct)
            if dedup in self._seen:
                state = await self._get_state(student_id, topic_id, subject)
                elapsed = (time.monotonic() - t0) * 1000
                logger.debug("Duplicate attempt deduped in %.1fms", elapsed)
                return self._state_to_dict(state)

            self._seen.add(dedup)

            state = await self._apply_record(
                student_id, topic_id, subject,
                correct, time_ms, ts, difficulty, persist=True,
            )

            if self._redis:
                asyncio.ensure_future(
                    self._cache_invalidate_related(student_id, subject, topic_id)
                )

            asyncio.ensure_future(
                self._irt.on_attempt(student_id, topic_id, correct, difficulty)
            )

            elapsed = (time.monotonic() - t0) * 1000
            if elapsed > 50:
                logger.warning("update_on_attempt slow: %.1fms for %s/%s",
                               elapsed, student_id, topic_id)

            return self._state_to_dict(state)

    async def _cache_invalidate_related(
        self, student_id: str, subject: str, topic_id: str
    ) -> None:
        patterns = [
            f"mastery:{student_id}:{topic_id}",
            f"mastery_subject:{student_id}:{subject}",
            f"review_schedule:{student_id}",
        ]
        for pat in patterns:
            await self._cache_delete(pat)

    async def get_mastery(self, student_id: str, topic_id: str,
                          subject: str = "general") -> dict[str, Any]:
        state = await self._get_state(student_id, topic_id, subject)
        if state.attempts == 0:
            return {
                "student_id": student_id,
                "topic_id": topic_id,
                "subject": subject,
                "bkt_p_know": 0.1,
                "irt_theta": 0.0,
                "afm_rate": 0.0,
                "attempts": 0,
                "accuracy": 0.0,
                "streak": 0,
                "last_result": None,
                "last_review": None,
                "next_review": None,
                "sm2_interval": 0,
                "sm2_ef": 2.5,
                "sm2_reps": 0,
                "difficulty": 0.5,
            }
        return {
            "student_id": state.student_id,
            "topic_id": state.topic_id,
            "subject": state.subject,
            "bkt_p_know": round(state.bkt_p_know, 6),
            "irt_theta": round(state.irt_theta, 6),
            "irt_se": round(state.irt_se, 6),
            "afm_rate": round(state.afm_rate, 6),
            "attempts": state.attempts,
            "correct_count": state.correct_count,
            "accuracy": round(state.correct_count / state.attempts, 6) if state.attempts else 0.0,
            "streak": state.streak,
            "best_streak": state.best_streak,
            "last_result": state.last_result,
            "last_review": state.last_review.isoformat() if state.last_review else None,
            "next_review": state.next_review.isoformat() if state.next_review else None,
            "sm2_interval": state.sm2_interval,
            "sm2_ef": round(state.sm2_ef, 4),
            "sm2_reps": state.sm2_reps,
            "difficulty": round(state.difficulty, 4),
        }

    async def get_mastery_by_subject(
        self, student_id: str, subject: str
    ) -> dict[str, Any]:
        cache_key = f"mastery_subject:{student_id}:{subject}"
        cached = await self._cache_get(cache_key)
        if cached:
            try:
                return json.loads(cached)
            except Exception:
                pass

        topics: list[dict[str, Any]] = []
        if self._pool is not None:
            async with self._pool.acquire() as conn:
                rows = await conn.fetch(self.SELECT_BY_SUBJECT, student_id, subject)
            for row in rows:
                topics.append({
                    "topic_id": row["topic_id"],
                    "bkt_p_know": row["bkt_p_know"],
                    "irt_theta": row["irt_theta"],
                    "afm_rate": row["afm_rate"],
                    "last_review": row["last_review"].isoformat() if row["last_review"] else None,
                    "next_review": row["next_review"].isoformat() if row["next_review"] else None,
                    "attempts": row["attempts"],
                    "accuracy": round(row["correct_count"] / row["attempts"], 4)
                    if row["attempts"] else 0.0,
                })
        else:
            tid_set = self._subject_idx.get(student_id, set())
            for tid in tid_set:
                ms = self._states.get(self._state_key(student_id, tid))
                if ms and ms.subject == subject:
                    topics.append({
                        "topic_id": tid,
                        "bkt_p_know": ms.bkt_p_know,
                        "irt_theta": ms.irt_theta,
                        "afm_rate": ms.afm_rate,
                        "last_review": ms.last_review.isoformat() if ms.last_review else None,
                        "next_review": ms.next_review.isoformat() if ms.next_review else None,
                        "attempts": ms.attempts,
                        "accuracy": round(ms.correct_count / ms.attempts, 4) if ms.attempts else 0.0,
                    })

        bkt_values = [t["bkt_p_know"] for t in topics]
        avg_bkt = sum(bkt_values) / len(bkt_values) if bkt_values else 0.0

        result = {
            "student_id": student_id,
            "subject": subject,
            "topic_count": len(topics),
            "avg_bkt_p_know": round(avg_bkt, 6),
            "avg_irt_theta": round(
                sum(t["irt_theta"] for t in topics) / len(topics), 6
            ) if topics else 0.0,
            "topics": topics,
        }

        if self._redis:
            asyncio.ensure_future(
                self._cache_set(cache_key, json.dumps(result))
            )

        return result

    async def get_review_schedule(
        self, student_id: str, include_overdue: bool = True
    ) -> dict[str, Any]:
        now = datetime.utcnow()
        cache_key = f"review_schedule:{student_id}:{int(now.timestamp() / 60)}"
        cached = await self._cache_get(cache_key)
        if cached:
            try:
                return json.loads(cached)
            except Exception:
                pass

        due: list[dict[str, Any]] = []
        if self._pool is not None:
            async with self._pool.acquire() as conn:
                rows = await conn.fetch(self.SELECT_REVIEWS, student_id, now)
            for row in rows:
                days_until = (row["next_review"] - now).total_seconds() / 86400.0
                due.append({
                    "topic_id": row["topic_id"],
                    "subject": row["subject"],
                    "next_review": row["next_review"].isoformat(),
                    "bkt_p_know": row["bkt_p_know"],
                    "days_until": round(days_until, 2),
                    "priority": "overdue" if days_until < 0 else ("urgent" if days_until < 1 else "normal"),
                    "sm2_ef": row["sm2_ef"],
                })
        else:
            for key, ms in self._states.items():
                if ms.student_id != student_id:
                    continue
                if ms.next_review and ms.next_review <= now:
                    days_until = (ms.next_review - now).total_seconds() / 86400.0
                    due.append({
                        "topic_id": ms.topic_id,
                        "subject": ms.subject,
                        "next_review": ms.next_review.isoformat(),
                        "bkt_p_know": ms.bkt_p_know,
                        "days_until": round(days_until, 2),
                        "priority": "overdue" if days_until < 0 else ("urgent" if days_until < 1 else "normal"),
                        "sm2_ef": ms.sm2_ef,
                    })

        due.sort(key=lambda x: x["days_until"])
        result = {
            "student_id": student_id,
            "due_count": len(due),
            "scheduled_at": now.isoformat(),
            "topics": due,
        }

        if self._redis:
            asyncio.ensure_future(
                self._cache_set(cache_key, json.dumps(result), self._cache_ttl)
            )

        return result

    async def sync_offline_queue(
        self, student_id: str, queued_updates: list[dict[str, Any]]
    ) -> dict[str, Any]:
        """
        Process a batch of queued updates from an offline client.
        Handles deduplication across sessions.
        """
        if not queued_updates:
            return {"processed": 0, "duplicates": 0, "errors": 0}

        processed = 0
        duplicates = 0
        errors = 0

        if not self._online:
            qu = QueuedUpdate(
                id=str(uuid.uuid4()),
                student_id=student_id,
                records=queued_updates,
            )
            if len(self._queue) < self._max_queue_size:
                self._queue.append(qu)
            return {
                "processed": 0,
                "duplicates": 0,
                "errors": 0,
                "queued": len(queued_updates),
                "queue_size": len(self._queue),
            }

        lock = self._locks[student_id]
        async with lock:
            for rec in queued_updates:
                try:
                    ts = rec.get("timestamp")
                    if isinstance(ts, str):
                        ts = datetime.fromisoformat(ts)
                    elif ts is None:
                        ts = datetime.utcnow()

                    dedup = _dedup_key(
                        student_id, rec["topic_id"], ts, rec["correct"]
                    )
                    if dedup in self._seen:
                        duplicates += 1
                        continue

                    self._seen.add(dedup)
                    await self._apply_record(
                        student_id=student_id,
                        topic_id=rec["topic_id"],
                        subject=rec.get("subject", "general"),
                        correct=rec["correct"],
                        time_ms=rec.get("time_ms", 0.0),
                        timestamp=ts,
                        difficulty=rec.get("difficulty", 0.5),
                        persist=True,
                    )
                    processed += 1
                except Exception as exc:
                    errors += 1
                    logger.error(
                        "Failed to process offline record for %s/%s: %s",
                        student_id, rec.get("topic_id"), exc,
                    )

        return {"processed": processed, "duplicates": duplicates, "errors": errors}

    async def set_online(self, online: bool) -> None:
        self._online = online
        if online and self._queue:
            logger.info("Back online — flushing %d queued updates", len(self._queue))
            asyncio.ensure_future(self._flush_queue())

    def is_online(self) -> bool:
        return self._online

    def get_queue_depth(self) -> int:
        return len(self._queue)

    # ── internal helpers ────────────────────────────────────────────────────

    def _state_to_dict(self, state: MasteryState) -> dict[str, Any]:
        return {
            "student_id": state.student_id,
            "topic_id": state.topic_id,
            "subject": state.subject,
            "bkt_p_know": round(state.bkt_p_know, 6),
            "irt_theta": round(state.irt_theta, 6),
            "irt_se": round(state.irt_se, 6),
            "afm_rate": round(state.afm_rate, 6),
            "attempts": state.attempts,
            "correct_count": state.correct_count,
            "accuracy": round(state.correct_count / state.attempts, 6) if state.attempts else 0.0,
            "streak": state.streak,
            "best_streak": state.best_streak,
            "last_result": state.last_result,
            "last_review": state.last_review.isoformat() if state.last_review else None,
            "next_review": state.next_review.isoformat() if state.next_review else None,
            "sm2_interval": state.sm2_interval,
            "sm2_ef": round(state.sm2_ef, 4),
            "sm2_reps": state.sm2_reps,
            "difficulty": round(state.difficulty, 4),
        }

# ---------------------------------------------------------------------------
# Module-level convenience wrappers (for services that import functions directly)
# ---------------------------------------------------------------------------
_default_service = None

def _get_default_service():
    global _default_service
    if _default_service is None:
        _default_service = MasterySyncService()
    return _default_service


async def get_shared_service() -> "MasterySyncService":
    """Shared service wired to a real asyncpg pool + Redis cache.

    Lazily builds the pool from DATABASE_URL and calls start(), which
    self-provisions the mastery_state / mastery_offline_queue tables and
    launches the background sync. Falls back to in-memory mode when the
    pool can't be created — callers never break.
    """
    global _default_service
    if _default_service is None:
        svc = MasterySyncService(
            redis_url=(os.environ.get("PLATFORM_REDIS_URL")
                       or os.environ.get("REDIS_URL")
                       or "redis://localhost:6379/0"))
        _default_service = svc
    svc = _default_service
    if svc._pool is None:
        # Self-heal: retry pool creation on every call until it succeeds —
        # a worker that lost the race at startup isn't stuck in-memory
        # forever.
        try:
            import asyncpg
            from backend.config import get_settings
            url = get_settings().database_url.replace(
                "postgresql+asyncpg://", "postgresql://")
            svc._pool = await asyncpg.create_pool(
                url, min_size=1, max_size=4, command_timeout=10)
        except Exception as exc:
            logger.warning("mastery asyncpg pool unavailable — in-memory mode: %s", exc)
        if svc._pool is not None and not getattr(svc, "_tables_created", False):
            try:
                async with svc._pool.acquire() as conn:
                    for ddl in (svc.CREATE_TABLE, svc.CREATE_QUEUE):
                        for stmt in ddl.split(";"):
                            stmt = stmt.strip()
                            if stmt:
                                await conn.execute(stmt)
                svc._tables_created = True
            except Exception as exc:
                logger.warning("mastery table provisioning failed: %s", exc)
    if not svc._running:
        try:
            await svc.start()
        except Exception as exc:
            logger.warning("mastery start failed — in-memory mode: %s", exc)
    return svc

# ---------------------------------------------------------------------------
# Module-level convenience wrappers (for services that import functions
# directly).
#
# MASTERY-SOLID fix: these wrappers are the import surface for live serving
# paths (question_selector, practice_service, worked_examples) and EVERY one
# of them raised TypeError on every call — they forwarded kwargs the service
# methods never accepted (problem_type/competency on update_on_attempt;
# subject/limit on get_review_schedule) or bound the wrong positional
# (subject into topic_id on get_mastery), so adaptive question selection
# silently lost its mastery signal. They now match the MasterySyncService
# signatures AND the call shapes the importers actually use (verified against
# services/practice_service.py:331,748,1147; services/question_selector.py:923,966;
# services/worked_examples.py:537).
# ---------------------------------------------------------------------------

class _AttemptResult(dict):
    """Service state dict with attribute access — legacy callers read
    ``result.mastery_score``; the canonical scalar is ``bkt_p_know``."""

    def __getattr__(self, name: str) -> Any:
        try:
            return self[name]
        except KeyError:
            raise AttributeError(name) from None


async def update_on_attempt(student_id, topic_id=None, correct=None,
                            time_ms=0.0, subject="general", difficulty=0.5,
                            timestamp=None, is_correct=None,
                            problem_type=None, competency=None):
    """Apply one attempt. ``correct``/``is_correct`` both accepted;
    ``problem_type``/``competency`` are accepted and ignored (legacy
    signatures — the live store has no column for them)."""
    svc = _get_default_service()
    verdict = correct if correct is not None else is_correct
    result = await svc.update_on_attempt(
        student_id=str(student_id),
        topic_id=str(topic_id) if topic_id is not None else "",
        correct=bool(verdict),
        time_ms=float(time_ms or 0.0),
        subject=str(subject or "general"),
        difficulty=float(0.5 if difficulty is None else difficulty),
        timestamp=timestamp,
    )
    result = _AttemptResult(result)
    # alias so attribute-style callers (.mastery_score) get the real signal
    result.setdefault("mastery_score", result.get("bkt_p_know"))
    return result

async def get_mastery(student_id, subject=None, topic_id=None):
    """Topic mastery for (student, topic); subject-level aggregate when no
    topic is given (cold start returns the 0.1 store prior)."""
    svc = _get_default_service()
    if topic_id:
        return await svc.get_mastery(
            student_id=str(student_id), topic_id=str(topic_id),
            subject=str(subject or "general"),
        )
    out = await svc.get_mastery_by_subject(str(student_id), str(subject or "general"))
    topics = out.get("topics") or []
    if not topics:
        return {"student_id": str(student_id), "subject": subject,
                "bkt_p_know": 0.1, "attempts": 0, "topic_count": 0,
                "topics": []}
    out["bkt_p_know"] = float(out.get("avg_bkt_p_know") or 0.0)
    return out

async def get_review_schedule(student_id, subject=None, limit=20):
    """Due review topics for the student — list of topic dicts, most
    overdue first, filtered to ``subject`` when given."""
    svc = _get_default_service()
    out = await svc.get_review_schedule(student_id=str(student_id))
    topics = list(out.get("topics") or [])
    if subject:
        s = str(subject).lower()
        topics = [t for t in topics
                  if str(t.get("subject", "")).lower() == s]
    return topics[:max(0, int(limit))]
