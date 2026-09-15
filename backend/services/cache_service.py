"""
Multi-tier caching service (Memory LRU → Redis → SQLite Disk).

Tiers (checked top-down, write to all tiers):
  Tier 1  In-memory LRU  — fastest, per-process, bounded size, no expiry
  Tier 2  Redis           — shared across workers, full TTL support
  Tier 3  SQLite disk     — persistent, survives restarts, shared across workers

Graceful degradation: any tier that raises is silently skipped; the
platform keeps running as long as at least one tier is healthy.
"""
from __future__ import annotations

import asyncio
import functools
import hashlib
import hmac
import json
import logging
import os
import time
from collections import OrderedDict
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Awaitable, Callable, Optional, TypeVar

import aiosqlite
from cachetools import LRUCache

logger = logging.getLogger(__name__)

F = TypeVar("F", bound=Callable[..., Awaitable[Any]])


# ─── Data models ───────────────────────────────────────────────────────────────


@dataclass
class CacheEntry:
    """A single cached value with metadata.

    Attributes:
        value:     The Python object to cache.
        created_at: UTC timestamp of when the entry was written.
        ttl:       Seconds until the entry is considered stale (None = immortal).
        access_count: Number of times the entry has been served (for eviction hints).
    """

    value: Any
    created_at: float = field(default_factory=lambda: datetime.now(timezone.utc).timestamp())
    ttl: Optional[float] = None
    access_count: int = 0

    @property
    def is_expired(self) -> bool:
        if self.ttl is None:
            return False
        return (datetime.now(timezone.utc).timestamp() - self.created_at) > self.ttl

    @property
    def ttl_remaining(self) -> Optional[float]:
        if self.ttl is None:
            return None
        remaining = (self.created_at + self.ttl) - datetime.now(timezone.utc).timestamp()
        return max(remaining, 0.0)


@dataclass
class CacheStats:
    """Per-tier and aggregate cache performance statistics."""

    memory_hits: int = 0
    redis_hits: int = 0
    disk_hits: int = 0
    misses: int = 0
    sets: int = 0
    invalidations: int = 0
    errors: int = 0

    @property
    def total_hits(self) -> int:
        return self.memory_hits + self.redis_hits + self.disk_hits

    @property
    def total_requests(self) -> int:
        return self.total_hits + self.misses

    @property
    def hit_rate(self) -> float:
        total = self.total_requests
        return self.total_hits / total if total > 0 else 0.0

    @property
    def miss_rate(self) -> float:
        return 1.0 - self.hit_rate

    def as_dict(self) -> dict[str, Any]:
        return {
            "memory_hits": self.memory_hits,
            "redis_hits": self.redis_hits,
            "disk_hits": self.disk_hits,
            "total_hits": self.total_hits,
            "misses": self.misses,
            "sets": self.sets,
            "invalidations": self.invalidations,
            "errors": self.errors,
            "total_requests": self.total_requests,
            "hit_rate": round(self.hit_rate, 4),
            "miss_rate": round(self.miss_rate, 4),
        }

    def __repr__(self) -> str:
        d = self.as_dict()
        return (
            f"CacheStats(hits={d['total_hits']}, misses={d['misses']}, "
            f"hit_rate={d['hit_rate']:.1%}, sets={d['sets']}, errors={d['errors']})"
        )


# ─── Helpers ───────────────────────────────────────────────────────────────────


def _now() -> float:
    return datetime.now(timezone.utc).timestamp()


def make_key(*args: Any, **kwargs: Any) -> str:
    """Build a deterministic, collision-resistant cache key from positional and
    keyword arguments.

    Uses HMAC-SHA256 so that the output is always a fixed-length hex string
    regardless of input size, and never accidentally varies between Python
    runs (unlike plain ``hash()`` which is randomised per process).

    Args:
        *args:   Positional arguments — each is JSON-serialised in order.
        **kwargs: Keyword arguments — each is JSON-serialised in sorted key order.

    Returns:
        A 64-character hex string suitable as a cache key.
    """
    parts: list[str] = []
    for a in args:
        try:
            parts.append(json.dumps(a, sort_keys=True, default=str))
        except (TypeError, ValueError):
            parts.append(repr(a))
    for k in sorted(kwargs):
        try:
            parts.append(f"{k}={json.dumps(kwargs[k], sort_keys=True, default=str)}")
        except (TypeError, ValueError):
            parts.append(f"{k}={repr(kwargs[k])}")
    raw = "\x1f".join(parts)
    digest = hashlib.sha256(raw.encode()).hexdigest()[:64]
    return digest


def make_function_key(func: Callable[..., Any], *args: Any, **kwargs: Any) -> str:
    """Build a cache key that incorporates the calling function's qualified name.

    The key is ``<qualname>:<arg_hash>`` so that calls to different functions
    with the same arguments never collide.
    """
    arg_hash = make_key(*args, **kwargs)
    qualname = getattr(func, "__qualname__", None) or getattr(func, "__name__", str(func))
    return f"fn:{qualname}:{arg_hash}"


# ─── Disk cache (SQLite via aiosqlite) ────────────────────────────────────────


class DiskCache:
    """SQLite-backed on-disk cache with automatic expiry enforcement.

    Uses WAL mode for concurrent reads and a single writer.  Expired rows are
    removed lazily during reads and periodically during a background task.

    Attributes:
        db_path:    Filesystem path to the SQLite database file.
        max_entries: Soft upper bound — old rows are evicted when exceeded.
        cleanup_interval: Seconds between background cleanup sweeps.
    """

    def __init__(
        self,
        db_path: str | Path = "cache.sqlite3",
        max_entries: int = 100_000,
        cleanup_interval: int = 300,
    ) -> None:
        self.db_path = Path(db_path)
        self.max_entries = max_entries
        self.cleanup_interval = cleanup_interval
        self._lock = asyncio.Lock()
        self._conn: Optional[aiosqlite.Connection] = None
        self._cleanup_task: Optional[asyncio.Task[None]] = None
        self._closed = False

    async def _init(self) -> None:
        if self._conn is not None:
            return
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._conn = await aiosqlite.connect(
            str(self.db_path),
            timeout=30,
            check_same_thread=False,
        )
        self._conn.row_factory = aiosqlite.Row
        await self._conn.execute("PRAGMA journal_mode=WAL")
        await self._conn.execute("PRAGMA synchronous=NORMAL")
        await self._conn.execute("PRAGMA cache_size=-64000")
        await self._conn.execute("PRAGMA busy_timeout=5000")
        await self._conn.execute(
            """
            CREATE TABLE IF NOT EXISTS cache_entries (
                key          TEXT PRIMARY KEY,
                value        BLOB NOT NULL,
                created_at   REAL NOT NULL,
                ttl          REAL,
                access_count INTEGER DEFAULT 0
            )
            """
        )
        await self._conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_created ON cache_entries(created_at)"
        )
        await self._conn.commit()
        self._cleanup_task = asyncio.ensure_future(self._periodic_cleanup())

    async def get(self, key: str) -> Optional[Any]:
        """Return the cached value or ``None`` if missing/expired.

        Expired rows are deleted synchronously so the caller never sees stale data.
        """
        if self._conn is None or self._closed:
            return None
        try:
            async with self._lock:
                row = await self._conn.execute(
                    "SELECT value, created_at, ttl FROM cache_entries WHERE key = ?",
                    (key,),
                )
                result = await row.fetchone()
                if result is None:
                    return None

                created_at = result["created_at"]
                ttl = result["ttl"]
                if ttl is not None and (_now() - created_at) > ttl:
                    await self._conn.execute(
                        "DELETE FROM cache_entries WHERE key = ?", (key,)
                    )
                    await self._conn.commit()
                    return None

                await self._conn.execute(
                    "UPDATE cache_entries SET access_count = access_count + 1 WHERE key = ?",
                    (key,),
                )
                await self._conn.commit()
                return json.loads(result["value"])
        except Exception as exc:
            logger.debug("DiskCache.get error for %r: %s", key, exc)
            return None

    async def set(self, key: str, value: Any, ttl: Optional[float] = None) -> None:
        """Persist *value* to disk.

        If the total row count exceeds ``max_entries`` the oldest 10 % of rows
        are evicted to keep database size bounded.
        """
        if self._conn is None or self._closed:
            return
        try:
            async with self._lock:
                payload = json.dumps(value, default=str)
                await self._conn.execute(
                    """
                    INSERT OR REPLACE INTO cache_entries (key, value, created_at, ttl, access_count)
                    VALUES (?, ?, ?, ?, COALESCE(
                        (SELECT access_count FROM cache_entries WHERE key = ?), 0))
                    """,
                    (key, payload, _now(), ttl, key),
                )
                await self._conn.commit()
                await self._enforce_max_entries()
        except Exception as exc:
            logger.debug("DiskCache.set error for %r: %s", key, exc)

    async def invalidate(self, key: str) -> bool:
        """Remove a single entry.  Returns True if it existed."""
        if self._conn is None or self._closed:
            return False
        try:
            async with self._lock:
                row = await self._conn.execute(
                    "SELECT 1 FROM cache_entries WHERE key = ?", (key,)
                )
                exists = await row.fetchone() is not None
                if exists:
                    await self._conn.execute(
                        "DELETE FROM cache_entries WHERE key = ?", (key,)
                    )
                    await self._conn.commit()
                return exists
        except Exception as exc:
            logger.debug("DiskCache.invalidate error for %r: %s", key, exc)
            return False

    async def invalidate_prefix(self, prefix: str) -> int:
        """Remove all entries whose key starts with *prefix*.  Returns count removed."""
        if self._conn is None or self._closed:
            return 0
        try:
            async with self._lock:
                row = await self._conn.execute(
                    "SELECT key FROM cache_entries WHERE key LIKE ?", (f"{prefix}%",)
                )
                keys = [r["key"] for r in await row.fetchall()]
                if keys:
                    placeholders = ",".join("?" for _ in keys)
                    await self._conn.execute(
                        f"DELETE FROM cache_entries WHERE key IN ({placeholders})",
                        keys,
                    )
                    await self._conn.commit()
                return len(keys)
        except Exception as exc:
            logger.debug("DiskCache.invalidate_prefix error: %s", exc)
            return 0

    async def clear(self) -> None:
        """Remove all entries from the disk cache."""
        if self._conn is None or self._closed:
            return
        try:
            async with self._lock:
                await self._conn.execute("DELETE FROM cache_entries")
                await self._conn.execute("VACUUM")
                await self._conn.commit()
        except Exception as exc:
            logger.debug("DiskCache.clear error: %s", exc)

    async def _enforce_max_entries(self) -> None:
        """Evict the oldest rows if the table exceeds ``max_entries``."""
        if self._conn is None:
            return
        try:
            row = await self._conn.execute(
                "SELECT COUNT(*) as cnt FROM cache_entries"
            )
            count = (await row.fetchone())["cnt"]
            if count > self.max_entries:
                evict = int(count * 0.1) + 1
                await self._conn.execute(
                    """
                    DELETE FROM cache_entries
                    WHERE key IN (
                        SELECT key FROM cache_entries
                        ORDER BY created_at ASC
                        LIMIT ?
                    )
                    """,
                    (evict,),
                )
                await self._conn.commit()
        except Exception as exc:
            logger.debug("DiskCache._enforce_max_entries error: %s", exc)

    async def _run_cleanup(self) -> None:
        """Delete expired rows in a single SQL statement."""
        if self._conn is None or self._closed:
            return
        try:
            now = _now()
            async with self._lock:
                cur = await self._conn.execute(
                    "DELETE FROM cache_entries WHERE ttl IS NOT NULL AND (? - created_at) > ttl",
                    (now,),
                )
                deleted = cur.rowcount
                await self._conn.commit()
                if deleted:
                    logger.debug("DiskCache cleanup: removed %d expired entries", deleted)
        except Exception as exc:
            logger.debug("DiskCache._run_cleanup error: %s", exc)

    async def _periodic_cleanup(self) -> None:
        """Background task that calls ``_run_cleanup`` at ``cleanup_interval`` seconds."""
        while not self._closed:
            await asyncio.sleep(self.cleanup_interval)
            if not self._closed:
                await self._run_cleanup()

    async def get_stats(self) -> dict[str, Any]:
        """Return basic SQLite statistics for monitoring dashboards."""
        if self._conn is None or self._closed:
            return {"status": "unavailable", "entries": 0, "size_bytes": 0}
        try:
            row = await self._conn.execute(
                "SELECT COUNT(*) as cnt, SUM(LENGTH(value)) as size FROM cache_entries"
            )
            r = await row.fetchone()
            return {
                "status": "ok",
                "entries": r["cnt"] or 0,
                "size_bytes": r["size"] or 0,
            }
        except Exception:
            return {"status": "error", "entries": 0, "size_bytes": 0}

    async def close(self) -> None:
        """Flush pending work, cancel the cleanup task, and close the DB connection."""
        self._closed = True
        if self._cleanup_task:
            self._cleanup_task.cancel()
            try:
                await self._cleanup_task
            except asyncio.CancelledError:
                pass
        if self._conn is not None:
            try:
                await self._run_cleanup()
                await self._conn.close()
            except Exception:
                pass
            finally:
                self._conn = None


# ─── Redis cache ───────────────────────────────────────────────────────────────


class RedisCache:
    """Thin async wrapper around ``redis.asyncio`` for the Tier-2 cache layer.

    Gracefully disables itself when the Redis server is unreachable at
    construction time, or when a runtime error occurs — every public method
    is wrapped in ``_safe`` which catches and logs exceptions instead of
    propagating them.
    """

    def __init__(self, config: RedisCacheConfig | None = None) -> None:
        self.config = config or RedisCacheConfig()
        self._client: Any = None
        self._available = False
        self._lock = asyncio.Lock()
        self._connection_tested = False

    async def _ensure_client(self) -> bool:
        """Lazy initialise the Redis client on first use.  Returns True on success."""
        if self._client is not None and self._available:
            return True
        if self._connection_tested and not self._available:
            return False

        try:
            import redis.asyncio as aioredis

            self._client = aioredis.from_url(
                self.config.url,
                decode_responses=True,
                socket_connect_timeout=self.config.socket_timeout,
                socket_timeout=self.config.socket_timeout,
                retry_on_timeout=True,
                health_check_interval=30,
                max_connections=self.config.max_connections,
            )
            await self._client.ping()
            self._available = True
            logger.info("RedisCache connected: %s", self.config.url)
        except ImportError:
            logger.info("redis-py not installed — Redis cache disabled")
            self._connection_tested = True
        except Exception as exc:
            logger.warning("RedisCache unavailable: %s — Tier-2 disabled", exc)
            self._connection_tested = True
            self._available = False
            self._client = None
        return self._available

    async def get(self, key: str) -> Optional[Any]:
        """Return the cached value or ``None``."""
        if not await self._ensure_client():
            return None
        try:
            async with self._lock:
                raw = await self._client.get(key)
                return json.loads(raw) if raw is not None else None
        except Exception as exc:
            logger.debug("RedisCache.get(%r) failed: %s", key, exc)
            self._available = False
            return None

    async def set(self, key: str, value: Any, ttl: Optional[float] = None) -> None:
        """Store *value* with optional TTL in seconds."""
        if not await self._ensure_client():
            return
        try:
            payload = json.dumps(value, default=str)
            effective_ttl = int(ttl) if ttl is not None else self.config.default_ttl
            async with self._lock:
                if effective_ttl > 0:
                    await self._client.setex(key, effective_ttl, payload)
                else:
                    await self._client.set(key, payload)
        except Exception as exc:
            logger.debug("RedisCache.set(%r) failed: %s", key, exc)
            self._available = False

    async def invalidate(self, key: str) -> bool:
        """Delete a single key.  Returns True if the key existed."""
        if not await self._ensure_client():
            return False
        try:
            async with self._lock:
                result = await self._client.delete(key)
                return result > 0
        except Exception as exc:
            logger.debug("RedisCache.invalidate(%r) failed: %s", key, exc)
            self._available = False
            return False

    async def invalidate_prefix(self, prefix: str) -> int:
        """Delete all keys matching *prefix* (Redis SCAN).  Returns count removed."""
        if not await self._ensure_client():
            return 0
        try:
            count = 0
            async with self._lock:
                cursor: int = 0
                pattern = f"{prefix}*"
                while True:
                    cursor, keys = await self._client.scan(
                        cursor, match=pattern, count=1000
                    )
                    if keys:
                        await self._client.delete(*keys)
                        count += len(keys)
                    if cursor == 0:
                        break
            return count
        except Exception as exc:
            logger.debug("RedisCache.invalidate_prefix(%r) failed: %s", prefix, exc)
            self._available = False
            return 0

    async def clear(self) -> None:
        """Flush the entire Redis database (FLUSHDB)."""
        if not await self._ensure_client():
            return
        try:
            async with self._lock:
                await self._client.flushdb()
        except Exception as exc:
            logger.debug("RedisCache.clear failed: %s", exc)

    async def close(self) -> None:
        """Close the Redis connection pool."""
        if self._client is not None:
            try:
                await self._client.aclose()
            except Exception:
                pass
            finally:
                self._client = None
                self._available = False


@dataclass
class RedisCacheConfig:
    """Configuration for the Redis cache tier."""

    url: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    default_ttl: int = int(os.getenv("REDIS_DEFAULT_TTL", "3600"))
    socket_timeout: int = 5
    max_connections: int = 50


# ─── Multi-tier cache service ──────────────────────────────────────────────────


class CacheService:
    """Three-tier async cache with graceful degradation.

    **Read path**  (highest-priority tier first):
      Tier 1  In-memory LRU  → Tier 2 Redis  → Tier 3 SQLite disk
    **Write path**  (all healthy tiers in parallel):
      Tier 1  ← Tier 2  ← Tier 3  (fan-out write; tier failure is silent)

    Usage examples::

        cache = await create_cache_service()

        # Manual API
        val = await cache.get("question:abc123")
        if val is None:
            val = await generate_question()
            await cache.set("question:abc123", val, ttl=3600)

        # Decorator API
        @cache.cached(ttl=1800)
        async def get_question(topic_id: str, difficulty: int) -> dict:
            ...

        stats = cache.get_stats()
        await cache.invalidate("question:abc123")
        await cache.shutdown()
    """

    def __init__(
        self,
        memory_maxsize: int = 10_000,
        redis_config: RedisCacheConfig | None = None,
        disk_cache: DiskCache | None = None,
    ) -> None:
        # Tier 1 — bounded LRU; operations are thread-safe in CPython (GIL)
        self._memory_cache: LRUCache[str, CacheEntry] = LRUCache(
            maxsize=memory_maxsize
        )
        self._memory_lock = asyncio.Lock()

        # Tier 2 — Redis (optional)
        self._redis = RedisCache(redis_config)

        # Tier 3 — SQLite disk (optional)
        self._disk = disk_cache

        # Statistics
        self._stats = CacheStats()
        self._stats_lock = asyncio.Lock()

        # Liveness flags
        self._memory_healthy = True
        self._disk_initialized = False
        self._shutdown = False

    # ── Core CRUD ─────────────────────────────────────────────────────────────

    async def get(self, key: str) -> Optional[Any]:
        """Return the value for *key*, or ``None`` if not in any tier / expired."""
        if self._shutdown:
            return None

        # ── Tier 1: memory ────────────────────────────────────────────────────
        if self._memory_healthy:
            try:
                async with self._memory_lock:
                    entry = self._memory_cache.get(key)
                if entry is not None:
                    if not entry.is_expired:
                        entry.access_count += 1
                        async with self._stats_lock:
                            self._stats.memory_hits += 1
                        return entry.value
                    # Expired — evict so a fresh value is fetched
                    async with self._memory_lock:
                        self._memory_cache.pop(key, None)
            except Exception as exc:
                logger.debug("CacheService memory-tier get error: %s", exc)
                self._memory_healthy = False

        # ── Tier 2: Redis ─────────────────────────────────────────────────────
        if self._redis._available:
            try:
                val = await self._redis.get(key)
                if val is not None:
                    # Backfill memory on Redis hit (silent, no stats bump)
                    try:
                        entry = CacheEntry(value=val, access_count=0)
                        async with self._memory_lock:
                            self._memory_cache[key] = entry
                    except Exception:
                        pass
                    async with self._stats_lock:
                        self._stats.redis_hits += 1
                    return val
            except Exception as exc:
                logger.debug("CacheService Redis-tier get error: %s", exc)

        # ── Tier 3: disk ──────────────────────────────────────────────────────
        if self._disk is not None:
            try:
                if not self._disk_initialized:
                    await self._disk._init()
                    self._disk_initialized = True
                val = await self._disk.get(key)
                if val is not None:
                    try:
                        entry = CacheEntry(value=val, access_count=0)
                        async with self._memory_lock:
                            self._memory_cache[key] = entry
                    except Exception:
                        pass
                    async with self._stats_lock:
                        self._stats.disk_hits += 1
                    return val
            except Exception as exc:
                logger.debug("CacheService disk-tier get error: %s", exc)

        async with self._stats_lock:
            self._stats.misses += 1
        return None

    async def set(self, key: str, value: Any, ttl: Optional[float] = None) -> None:
        """Write *value* to all healthy tiers (fan-out).

        Args:
            key:    Cache key (use :func:`make_key` or :func:`make_function_key`).
            value:  Python object to cache.  Must be JSON-serialisable.
            ttl:    Seconds until the entry is considered stale.
                    ``None`` = immortal (no automatic expiry).
        """
        if self._shutdown:
            return

        if ttl is not None and ttl <= 0:
            return

        async with self._stats_lock:
            self._stats.sets += 1

        # ── Tier 1: memory ────────────────────────────────────────────────────
        if self._memory_healthy:
            try:
                entry = CacheEntry(value=value, ttl=ttl)
                async with self._memory_lock:
                    self._memory_cache[key] = entry
            except Exception as exc:
                logger.debug("CacheService memory-tier set error: %s", exc)
                self._memory_healthy = False

        # ── Tier 2: Redis ─────────────────────────────────────────────────────
        if self._redis._available:
            try:
                await self._redis.set(key, value, ttl)
            except Exception as exc:
                logger.debug("CacheService Redis-tier set error: %s", exc)

        # ── Tier 3: disk ──────────────────────────────────────────────────────
        if self._disk is not None:
            try:
                if not self._disk_initialized:
                    await self._disk._init()
                    self._disk_initialized = True
                await self._disk.set(key, value, ttl)
            except Exception as exc:
                logger.debug("CacheService disk-tier set error: %s", exc)

    async def invalidate(self, key: str) -> bool:
        """Remove *key* from all tiers.  Returns True if it was found anywhere."""
        if self._shutdown:
            return False

        async with self._stats_lock:
            self._stats.invalidations += 1

        found = False

        if self._memory_healthy:
            try:
                async with self._memory_lock:
                    if key in self._memory_cache:
                        del self._memory_cache[key]
                        found = True
            except Exception as exc:
                logger.debug("CacheService memory-tier invalidate error: %s", exc)

        if self._redis._available:
            try:
                if await self._redis.invalidate(key):
                    found = True
            except Exception as exc:
                logger.debug("CacheService Redis-tier invalidate error: %s", exc)

        if self._disk is not None:
            try:
                if await self._disk.invalidate(key):
                    found = True
            except Exception as exc:
                logger.debug("CacheService disk-tier invalidate error: %s", exc)

        return found

    async def invalidate_prefix(self, prefix: str) -> int:
        """Remove all entries whose key starts with *prefix*.  Returns count removed."""
        if self._shutdown:
            return 0

        async with self._stats_lock:
            self._stats.invalidations += 1

        total = 0

        if self._memory_healthy:
            try:
                async with self._memory_lock:
                    victims = [k for k in self._memory_cache if k.startswith(prefix)]
                for k in victims:
                    async with self._memory_lock:
                        self._memory_cache.pop(k, None)
                total += len(victims)
            except Exception as exc:
                logger.debug("CacheService memory-tier invalidate_prefix error: %s", exc)

        if self._redis._available:
            try:
                total += await self._redis.invalidate_prefix(prefix)
            except Exception as exc:
                logger.debug("CacheService Redis-tier invalidate_prefix error: %s", exc)

        if self._disk is not None:
            try:
                total += await self._disk.invalidate_prefix(prefix)
            except Exception as exc:
                logger.debug("CacheService disk-tier invalidate_prefix error: %s", exc)

        return total

    async def clear(self) -> None:
        """Wipe every tier.  Use with caution in production."""
        if self._memory_healthy:
            try:
                async with self._memory_lock:
                    self._memory_cache.clear()
            except Exception as exc:
                logger.debug("CacheService memory-tier clear error: %s", exc)
        try:
            await self._redis.clear()
        except Exception as exc:
            logger.debug("CacheService Redis clear error: %s", exc)
        if self._disk is not None:
            try:
                await self._disk.clear()
            except Exception as exc:
                logger.debug("CacheService disk clear error: %s", exc)

    async def warm_up(self, entries: dict[str, tuple[Any, Optional[float]]]) -> None:
        """Bulk-load entries at startup.

        Args:
            entries:  Mapping of ``key → (value, ttl_seconds)``.
                      TTL of ``None`` means immortal.
        """
        for key, (value, ttl) in entries.items():
            await self.set(key, value, ttl)

    # ── Statistics ────────────────────────────────────────────────────────────

    def get_stats(self) -> CacheStats:
        """Return a snapshot of current cache statistics."""
        return self._stats

    def get_health(self) -> dict[str, Any]:
        """Return the health status of each cache tier for health-check endpoints."""
        disk_stats: dict[str, Any] = {"status": "unavailable"}
        if self._disk is not None and self._disk_initialized:
            try:
                loop = asyncio.get_event_loop()
                disk_stats = loop.run_until_complete(self._disk.get_stats())
            except Exception:
                disk_stats = {"status": "error"}
        return {
            "memory": {"status": "ok" if self._memory_healthy else "error",
                         "maxsize": self._memory_cache.maxsize,
                         "currsize": self._memory_cache.currsize},
            "redis": {
                "status": "ok" if self._redis._available else "unavailable",
                "url": self._redis.config.url if self._redis._available else None,
            },
            "disk": disk_stats,
        }

    # ── Decorator ─────────────────────────────────────────────────────────────

    def cached(
        self,
        ttl: Optional[float] = 3600,
        key_fn: Optional[Callable[..., str]] = None,
    ) -> Callable[[F], F]:
        """Async decorator that caches the return value of the wrapped function.

        On each call the decorator:
          1. Builds the cache key (via *key_fn* or :func:`make_function_key`).
          2. Looks up all three tiers.
          3. Calls the function only on a miss.
          4. Writes the result to all healthy tiers.

        Args:
            ttl:     Cache lifetime in seconds.  ``None`` = immortal.
            key_fn:  Optional ``(func, *args, **kwargs) -> str`` override for the
                     default key generated by :func:`make_function_key`.

        Example::

            @cache.cached(ttl=1800)
            async def solve_math(topic_id: str, difficulty: int) -> dict:
                return await llm.generate(...)

            @cache.cached(ttl=7200, key_fn=lambda fn, t, d: f"math:{t}:{d}")
            async def get_curriculum_content(topic_id: str, grade: int) -> list[dict]:
                return await db.fetch_lessons(topic_id, grade)
        """
        def decorator(func: F) -> F:
            @functools.wraps(func)
            async def wrapper(*args: Any, **kwargs: Any) -> Any:
                if key_fn is not None:
                    key = key_fn(func, *args, **kwargs)
                else:
                    key = make_function_key(func, *args, **kwargs)
                cached_value = await self.get(key)
                if cached_value is not None:
                    return cached_value
                result = await func(*args, **kwargs)
                await self.set(key, result, ttl)
                return result

            wrapper.cache_service = self  # type: ignore[attr-defined]
            wrapper.cache_ttl = ttl  # type: ignore[attr-defined]
            return wrapper  # type: ignore[return-value]

        return decorator

    # ── Lifecycle ─────────────────────────────────────────────────────────────

    async def shutdown(self) -> None:
        """Close all cache tiers.  Call during application shutdown."""
        self._shutdown = True
        try:
            await self._redis.close()
        except Exception as exc:
            logger.debug("CacheService Redis shutdown error: %s", exc)
        if self._disk is not None:
            try:
                await self._disk.close()
            except Exception as exc:
                logger.debug("CacheService disk shutdown error: %s", exc)
        logger.info("CacheService shut down: %s", self._stats)


# ─── Factory ───────────────────────────────────────────────────────────────────


async def create_cache_service(
    memory_maxsize: int = 10_000,
    redis_url: Optional[str] = None,
    disk_db_path: Optional[str | Path] = None,
    disk_max_entries: int = 100_000,
) -> CacheService:
    """Create and initialise a :class:`CacheService`.

    All three tiers are attempted; if any fails the platform continues
    with the remaining tiers.  This is the preferred constructor over
    calling :class:`CacheService` directly.

    Args:
        memory_maxsize:  Max entries in the in-memory LRU cache.
        redis_url:       Redis connection URL.  ``None`` / empty → skip tier.
        disk_db_path:    SQLite file path.  ``None`` → ``./cache.sqlite3``.
        disk_max_entries: Max rows in the SQLite cache table.

    Returns:
        A fully initialised :class:`CacheService` ready for use.
    """
    redis_config = None
    if redis_url:
        redis_config = RedisCacheConfig(url=redis_url)

    disk_cache = None
    if disk_db_path is not None:
        disk_cache = DiskCache(
            db_path=disk_db_path,
            max_entries=disk_max_entries,
        )

    service = CacheService(
        memory_maxsize=memory_maxsize,
        redis_config=redis_config,
        disk_cache=disk_cache,
    )

    # Warm up the disk tier's DB connection eagerly so the first real request
    # doesn't pay the SQLite open cost.
    if disk_cache is not None and not service._disk_initialized:
        try:
            await disk_cache._init()
            service._disk_initialized = True
        except Exception as exc:
            logger.warning("Disk cache init failed at startup: %s — Tier-3 disabled", exc)

    return service
