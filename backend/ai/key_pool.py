"""key_pool.py — Round-robin key rotation for LLM API calls.

Loads a pool of API keys from a file (one key per line, or KEY_N=value format)
and cycles through them. When a key hits a rate limit (429), it is marked
"cooling" and skipped for a cooldown period. This lets 39 free-tier keys act
as one high-throughput key.

Usage::

    from backend.ai.key_pool import KeyPool

    pool = KeyPool.load("frontend/scripts/gemini-keys-39.env")
    key = pool.next_key()                # round-robin
    pool.mark_rate_limited(key)          # after a 429
    pool.mark_ok(key)                    # reset on success
"""

from __future__ import annotations

import hashlib
import os
import threading
import time
from pathlib import Path
from typing import Dict, List, Optional, Tuple


class KeyPool:
    """Thread-safe round-robin key pool with cooldown on rate limits."""

    COOLDOWN_SECONDS = 60

    def __init__(self, keys: List[str], source: str = "") -> None:
        if not keys:
            raise ValueError("KeyPool requires at least one key")
        self._keys: List[str] = keys
        self._source = source
        self._index = 0
        self._cooldowns: Dict[str, float] = {}  # key_hash -> cooldown_until_ts
        self._lock = threading.Lock()

    @classmethod
    def load(cls, path: str) -> "KeyPool":
        """Load keys from a file. Supports:
        - One key per line (plain text)
        - KEY_N=value format (.env style)
        - # comments and blank lines skipped
        """
        p = Path(path)
        if not p.exists():
            raise FileNotFoundError(f"Key file not found: {path}")
        keys: List[str] = []
        for line in p.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key = line.split("=", 1)[1].strip()
            else:
                key = line
            if len(key) > 20:  # minimum viable key length
                keys.append(key)
        return cls(keys=keys, source=str(p))

    @classmethod
    def load_multi(cls, *paths: str) -> "KeyPool":
        """Load and merge keys from multiple files (deduplicates)."""
        seen = set()
        keys: List[str] = []
        for path in paths:
            p = Path(path)
            if not p.exists():
                continue
            for line in p.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    key = line.split("=", 1)[1].strip()
                else:
                    key = line
                if len(key) > 20 and key not in seen:
                    seen.add(key)
                    keys.append(key)
        return cls(keys=keys, source=",".join(paths))

    @property
    def size(self) -> int:
        return len(self._keys)

    @property
    def available_count(self) -> int:
        """How many keys are NOT in cooldown right now."""
        now = time.time()
        with self._lock:
            return sum(1 for k in self._keys
                       if self._cooldowns.get(self._hash(k), 0) < now)

    def next_key(self) -> str:
        """Get the next available key (round-robin, skipping cooldowns)."""
        now = time.time()
        with self._lock:
            for _ in range(len(self._keys)):
                key = self._keys[self._index % len(self._keys)]
                self._index += 1
                key_hash = self._hash(key)
                if self._cooldowns.get(key_hash, 0) < now:
                    return key
            # All keys in cooldown — return the one with earliest cooldown end
            earliest = min(self._cooldowns.get(self._hash(k), 0) for k in self._keys)
            raise RuntimeError(
                f"All {len(self._keys)} keys are rate-limited. "
                f"Next available in {earliest - now:.0f}s."
            )

    def mark_rate_limited(self, key: str, cooldown: Optional[float] = None) -> None:
        """Mark a key as rate-limited (skip it for cooldown seconds)."""
        cooldown = cooldown or self.COOLDOWN_SECONDS
        with self._lock:
            self._cooldowns[self._hash(key)] = time.time() + cooldown

    def mark_ok(self, key: str) -> None:
        """Clear any cooldown on a key (it worked)."""
        with self._lock:
            self._cooldowns.pop(self._hash(key), None)

    def reset(self) -> None:
        """Clear all cooldowns (all keys available)."""
        with self._lock:
            self._cooldowns.clear()

    @property
    def source(self) -> str:
        return self._source

    @staticmethod
    def _hash(key: str) -> str:
        """Short hash to avoid storing raw keys in memory dicts."""
        return hashlib.sha256(key.encode()).hexdigest()[:16]
