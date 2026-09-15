"""llm_key_router.py — Unified LLM key routing with round-robin rotation.

Reads all Gemini key files and provides a single ``get_key()`` call that
returns the next available key. Handles rate-limit cooldowns automatically.

Supported key sources (checked in order):
  1. GEMINI_KEYS_FILE env var (path to a key file)
  2. frontend/scripts/gemini-keys-39.env (39 keys, production)
  3. frontend/scripts/gemini-keys-all.env (37 keys, deduplicated)
  4. GEMINI_API_KEY env var (single key fallback)

Usage::

    from backend.ai.llm_key_router import get_gemini_key, mark_rate_limited

    key = get_gemini_key()
    try:
        result = call_gemini(key, prompt)
        mark_ok(key)
    except RateLimitError:
        mark_rate_limited(key)
        key = get_gemini_key()  # automatically gets the next one
"""

from __future__ import annotations

import logging
import os
from pathlib import Path
from typing import Optional

from backend.ai.key_pool import KeyPool

logger = logging.getLogger(__name__)

_pool: Optional[KeyPool] = None
_repo_root = Path(__file__).parent.parent.parent

# Candidate key files (checked in order, first found wins unless load_multi)
_KEY_FILE_CANDIDATES = [
    str(_repo_root / "frontend" / "scripts" / "gemini-keys-39.env"),
    str(_repo_root / "frontend" / "scripts" / "gemini-keys-all.env"),
    str(_repo_root / "frontend" / "scripts" / "gemini-keys.env"),
]


def _init_pool() -> KeyPool:
    """Build the key pool from all available sources."""
    env_file = os.environ.get("GEMINI_KEYS_FILE")
    if env_file and Path(env_file).exists():
        pool = KeyPool.load(env_file)
        logger.info("KeyPool: loaded %d keys from %s (GEMINI_KEYS_FILE)",
                    pool.size, env_file)
        return pool

    existing = [p for p in _KEY_FILE_CANDIDATES if Path(p).exists()]
    if existing:
        pool = KeyPool.load_multi(*existing)
        logger.info("KeyPool: loaded %d unique keys from %d files",
                    pool.size, len(existing))
        return pool

    # Fallback: single key from env
    single = os.environ.get("GEMINI_API_KEY", "")
    if single and len(single) > 20:
        pool = KeyPool(keys=[single], source="GEMINI_API_KEY env")
        logger.info("KeyPool: loaded 1 key from GEMINI_API_KEY env")
        return pool

    logger.warning("KeyPool: no keys found. LLM calls will fail.")
    return KeyPool(keys=[""], source="empty")


def get_pool() -> KeyPool:
    """Get or create the global key pool (lazy singleton)."""
    global _pool
    if _pool is None:
        _pool = _init_pool()
    return _pool


def get_gemini_key() -> str:
    """Get the next available Gemini API key (round-robin with cooldown)."""
    return get_pool().next_key()


def mark_rate_limited(key: str, cooldown: float = 60.0) -> None:
    """Mark a key as rate-limited after a 429 response."""
    get_pool().mark_rate_limited(key, cooldown)


def mark_ok(key: str) -> None:
    """Mark a key as working (clears any cooldown)."""
    get_pool().mark_ok(key)


def pool_status() -> dict:
    """Current pool stats for health checks."""
    pool = get_pool()
    return {
        "total_keys": pool.size,
        "available": pool.available_count,
        "source": pool.source,
    }
