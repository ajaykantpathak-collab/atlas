"""Redis service — async Redis client for token management.

Provides a shared async Redis connection used by the auth service for:
  - Refresh token storage and verification
  - Access token blacklisting on logout
  - Token invalidation

Usage:
    from services.redis_service import get_redis
    redis = await get_redis()
    if redis:
        await redis.setex("key", 3600, "value")
"""

from __future__ import annotations

import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)

_REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

_client = None
_pool = None


async def get_redis():
    """Return a shared async Redis client, or None if Redis is unavailable.

    Uses a connection pool for efficiency. The client is created on first
    call and reused across requests.
    """
    global _client, _pool

    if _client is not None:
        return _client

    try:
        import redis.asyncio as aioredis

        if _pool is None:
            _pool = aioredis.ConnectionPool.from_url(
                _REDIS_URL,
                max_connections=20,
                decode_responses=True,
                socket_connect_timeout=3,
                socket_timeout=5,
            )

        _client = aioredis.Redis(connection_pool=_pool)

        # Verify connectivity
        await _client.ping()
        logger.info("Redis connected at %s", _REDIS_URL)
        return _client

    except ImportError:
        logger.warning("redis package not installed - token invalidation disabled")
        return None
    except Exception as exc:
        logger.warning("Redis connection failed: %s - token invalidation disabled", exc)
        _client = None
        return None


async def close_redis():
    """Close the Redis connection pool on shutdown."""
    global _client, _pool
    if _client is not None:
        try:
            await _client.aclose()
        except Exception:
            pass
        _client = None
    if _pool is not None:
        try:
            await _pool.disconnect()
        except Exception:
            pass
        _pool = None
