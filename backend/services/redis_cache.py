r"""Redis-backed shared cache layer for multi-instance scale.

THE PROBLEM: SolutionCache's memory layer is per-process and its disk
layer (JSONL) is per-machine. Run 2+ API instances (or workers on
different boxes) behind a load balancer and each keeps its own warm
cache — repeat solves miss unless they land on the same instance.

THE FIX: A Redis layer in the middle. All instances share one Redis:
  get: memory → redis → disk → solve
  put: memory + redis + disk (write-through)

GRACEFUL DEGRADATION (the theme of this codebase):
  - Redis down → cache still works (memory + disk), zero downtime
  - Redis slow → 50ms timeout per op, then treated as down
  - Redis absent (dev) → skipped entirely, same as before

TTL: solutions are immutable (same inputs → same answer), so a long
TTL is safe. Default 7 days, configurable.

USAGE: set REDIS_URL env var (docker compose already runs Redis on
localhost:6379). The SolutionCache picks up the Redis layer
automatically when it's reachable.
"""

from __future__ import annotations

import json
import os
import time
import threading
from typing import Optional

REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")
REDIS_KEY_PREFIX = "prism:sol:"
REDIS_TTL_S = int(os.environ.get("SOLUTION_CACHE_TTL_S", str(7 * 24 * 3600)))
REDIS_TIMEOUT_S = 0.05  # 50ms — Redis must never stall a solve


class RedisCacheLayer:
    """Best-effort Redis layer. NEVER raises, NEVER stalls.

    All public methods return quickly regardless of Redis state:
      - down/unreachable → behaves as a permanent miss (get) / no-op (put)
      - reconnects lazily every RECHECK_INTERVAL after a failure
    """

    RECHECK_INTERVAL_S = 30.0  # retry Redis after this long being down

    def __init__(self, url: str = REDIS_URL):
        self._url = url
        self._client = None
        self._down_until = 0.0
        self._lock = threading.RLock()
        self.hits = 0
        self.misses = 0
        self.errors = 0

    # ── Connection (lazy, self-healing) ──────────────────────────
    def _get_client(self):
        """Return a live client or None. Never raises, never blocks long."""
        if time.time() < self._down_until:
            return None
        with self._lock:
            if self._client is None:
                try:
                    import redis
                    self._client = redis.Redis.from_url(
                        self._url,
                        socket_timeout=REDIS_TIMEOUT_S,
                        socket_connect_timeout=REDIS_TIMEOUT_S,
                        decode_responses=True,
                    )
                except Exception:
                    self._mark_down()
                    return None
            # Ping to verify (cheap, bounded by socket timeout)
            try:
                self._client.ping()
                return self._client
            except Exception:
                self._mark_down()
                return None

    def _mark_down(self) -> None:
        self.errors += 1
        self._down_until = time.time() + self.RECHECK_INTERVAL_S
        self._client = None  # force fresh connection on recheck

    # ── Public API (drop-in for SolutionCache integration) ───────
    def get(self, key: str) -> Optional[dict]:
        """Get a cached value. None on miss/timeout/down."""
        client = self._get_client()
        if client is None:
            self.misses += 1
            return None
        try:
            raw = client.get(f"{REDIS_KEY_PREFIX}{key}")
            if raw is None:
                self.misses += 1
                return None
            self.hits += 1
            return json.loads(raw)
        except Exception:
            self._mark_down()
            self.misses += 1
            return None

    def put(self, key: str, value: dict) -> bool:
        """Cache a value. Returns True if stored. No-op on down."""
        if not value.get("success"):
            return False  # only cache successful solves (same as disk layer)
        client = self._get_client()
        if client is None:
            return False
        try:
            client.set(
                f"{REDIS_KEY_PREFIX}{key}",
                json.dumps(value, ensure_ascii=False),
                ex=REDIS_TTL_S,
            )
            return True
        except Exception:
            self._mark_down()
            return False

    def status(self) -> dict:
        return {
            "url": self._url,
            "reachable": time.time() >= self._down_until and self._client is not None,
            "hits": self.hits,
            "misses": self.misses,
            "errors": self.errors,
            "ttl_s": REDIS_TTL_S,
        }


# ═══════════════════════════════════════════════════════════════════
# Singleton
# ═══════════════════════════════════════════════════════════════════

_redis_layer: Optional[RedisCacheLayer] = None
_redis_lock = threading.Lock()


def get_redis_layer() -> Optional[RedisCacheLayer]:
    """Get the shared Redis layer, or None if Redis is not configured.

    Returns the layer object regardless of reachability — the layer
    itself handles being down gracefully.
    """
    global _redis_layer
    with _redis_lock:
        if _redis_layer is None:
            if not REDIS_URL:
                return None
            _redis_layer = RedisCacheLayer()
        return _redis_layer
