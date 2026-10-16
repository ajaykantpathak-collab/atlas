#!/usr/bin/env python3
"""core/ — the concrete shell (Phase F, 2026-10-02).

Thin, purposeful facades over the battle-tested modules. NOTHING here
re-implements: db.py, config.py, observability.py remain the real code;
core re-exports them so new modules (compliance, mobile, workers) import
from ONE stable place instead of reaching across the tree."""
from __future__ import annotations

# stability facades (single import surface for new modules)
from backend.config import get_settings  # noqa: F401
from backend.database import (  # noqa: F401
    get_sync_engine,
    engine,
    AsyncSessionLocal,
)
from backend.observability import setup_logging  # noqa: F401
from backend.services.readiness import mark, snapshot, is_ready  # noqa: F401

__all__ = [
    "get_settings", "get_sync_engine", "engine", "AsyncSessionLocal",
    "setup_logging", "mark", "snapshot", "is_ready",
]
