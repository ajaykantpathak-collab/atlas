# -*- coding: utf-8 -*-
"""tests/test_fixf1_secrets.py — LAUNCH-FIX-F1 (batch fix_2026_10_15).

The audit (lane-B) found a hardcoded Neo4j password literal at
backend/content_parsers/load_to_neo4j.py:23.  These tests pin the closed
state:

  1. the literal exists nowhere in shipping Python source (api/, services/,
     routers/, modules/, content_parsers/, database.py, security.py, ...)
  2. the loader reads its password from the environment chain
     (PLATFORM_NEO4J_PASSWORD / NEO4J_PASSWORD)
  3. with no env var set it refuses to run rather than falling back to any
     default credential (safe default = empty + SystemExit)
"""

from __future__ import annotations

import os
import sys
import uuid
from pathlib import Path

import pytest

_BACKEND = Path(__file__).resolve().parent.parent
for _p in (str(_BACKEND.parent), str(_BACKEND)):
    if _p not in sys.path:
        sys.path.insert(0, _p)

os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite://")

#: the literal named in the audit (lane-B finding, MED severity).
NEO4J_LITERAL = "dream_neo4j_2024"

#: shipping source only — tests may name the literal to pin its absence.
_SCAN_DIRS = [
    _BACKEND / "api",
    _BACKEND / "services",
    _BACKEND / "routers",
    _BACKEND / "modules",
    _BACKEND / "content_parsers",
    _BACKEND / "its" / "solver",
    _BACKEND / "workers",
    _BACKEND / "scripts",
]
_SCAN_FILES = [
    _BACKEND / "database.py",
    _BACKEND / "security.py",
    _BACKEND / "deps.py",
    _BACKEND / "config.py",
    _BACKEND / "main.py",
]


def _shipping_python_sources():
    for d in _SCAN_DIRS:
        if not d.is_dir():
            continue
        for p in sorted(d.rglob("*.py")):
            if "__pycache__" in p.parts or "_trash" in p.parts:
                continue
            yield p
    for p in _SCAN_FILES:
        if p.is_file():
            yield p


def test_neo4j_password_literal_is_gone_from_shipping_source():
    offenders = [
        str(p.relative_to(_BACKEND))
        for p in _shipping_python_sources()
        if NEO4J_LITERAL in p.read_text(encoding="utf-8", errors="replace")
    ]
    assert offenders == [], (
        f"hardcoded credential literal found in: {offenders}")


def test_loader_reads_password_from_env(monkeypatch):
    import importlib
    secret = f"neo4j-pw-{uuid.uuid4().hex[:8]}"
    monkeypatch.setenv("PLATFORM_NEO4J_PASSWORD", secret)
    monkeypatch.delenv("NEO4J_PASSWORD", raising=False)
    import backend.content_parsers.load_to_neo4j as loader
    loader = importlib.reload(loader)
    assert loader.NEO4J_PASSWORD == secret
    importlib.reload(loader)  # leave the module in env-consistent state


def test_loader_falls_back_to_neo4j_password_env(monkeypatch):
    import importlib
    secret = f"neo4j-pw-{uuid.uuid4().hex[:8]}"
    monkeypatch.delenv("PLATFORM_NEO4J_PASSWORD", raising=False)
    monkeypatch.setenv("NEO4J_PASSWORD", secret)
    import backend.content_parsers.load_to_neo4j as loader
    loader = importlib.reload(loader)
    assert loader.NEO4J_PASSWORD == secret
    importlib.reload(loader)


def test_loader_without_env_refuses_to_run(monkeypatch):
    """Safe default: NO credential guess — the loader exits instead of
    silently connecting with a fallback password."""
    import importlib
    monkeypatch.delenv("PLATFORM_NEO4J_PASSWORD", raising=False)
    monkeypatch.delenv("NEO4J_PASSWORD", raising=False)
    import backend.content_parsers.load_to_neo4j as loader
    loader = importlib.reload(loader)
    assert loader.NEO4J_PASSWORD == ""
    with pytest.raises(SystemExit):
        loader._require_password()
    importlib.reload(loader)
