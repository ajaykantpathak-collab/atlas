"""Tests for the Wave 9.8 L6 offline chapter set (GET /api/offline-set/{id}).

Gate list:
  1. a node with tagged board rows returns ~10 practice-shaped questions
  2. an unknown / untagged node -> 404
  3. a malformed node id -> 404 (no existence oracle)
  4. no auth required — a guest (no overrides, no token) gets the set,
     never a crash or a 401
  5. answer-bearing bank fields NEVER ship (correct_answer / model_answer /
     explanation / marking_scheme absent from every item)
  6. flagged (quarantined) bank rows are excluded from the set

DB: throwaway aiosqlite file — same pattern as test_struggle_notebook.py.
"""

from __future__ import annotations

import asyncio
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

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine  # noqa: E402
from sqlalchemy.pool import NullPool  # noqa: E402

from backend.models.enrichment import (  # noqa: E402
    BoardQuestion, BoardQuestionFlag,
)


NODE = "c10_sci_cbse_04_001"
OTHER_NODE = "c10_sci_cbse_05_002"


@pytest.fixture()
def db_factory(tmp_path):
    engine = create_async_engine(
        f"sqlite+aiosqlite:///{tmp_path / 'offline_set.db'}",
        poolclass=NullPool)

    async def _init():
        async with engine.begin() as conn:
            await conn.run_sync(BoardQuestion.__table__.create)
            await conn.run_sync(BoardQuestionFlag.__table__.create)

    asyncio.run(_init())

    def factory() -> AsyncSession:
        return AsyncSession(engine, expire_on_commit=False, autoflush=False)

    yield factory
    asyncio.run(engine.dispose())


def _run(coro):
    return asyncio.run(coro)


def _mk_question(factory, node_id=NODE, i=0, **kw):
    async def _go():
        async with factory() as s:
            row = BoardQuestion(
                id=uuid.uuid4(),
                question_number=i + 1,
                node_tags=[node_id] if node_id else [],
                subject="sci",
                class_level=10,
                chapter="ch4",
                question_type=kw.get("question_type", "short_answer"),
                question_text=kw.get("question_text",
                                     f"Define term {i} and give an example."),
                options=kw.get("options"),
                correct_answer="the key that must never ship",
                model_answer="a model answer that must never ship",
                explanation="an explanation that must never ship",
                marks=3,
                marking_scheme="1 mark definition + 2 marks example",
                difficulty="medium",
                source_type="question_bank",
                board="CBSE",
                year="2024",
            )
            s.add(row)
            await s.commit()
            return row.id
    return _run(_go())


def _app(factory):
    """Mini FastAPI app: ONLY the offline-set router, get_db overridden.

    get_current_user is deliberately NOT overridden — the route takes no
    auth dependency, so a guest exercises the real dependency graph."""
    from fastapi import FastAPI
    from backend.database import get_db
    from backend.routers.offline_set import router

    app = FastAPI()
    app.include_router(router)

    async def _db():
        async with factory() as s:
            yield s

    app.dependency_overrides[get_db] = _db
    return app


# --------------------------------------------------------------------------- #
# 1 + 5. rows for a node, stripped of keys
# --------------------------------------------------------------------------- #

def test_set_returns_practice_shaped_rows(db_factory):
    from fastapi.testclient import TestClient

    for i in range(12):                       # more than the 10-row cap
        _mk_question(db_factory, NODE, i)
    _mk_question(db_factory, OTHER_NODE, 0)   # a different chapter's row

    res = TestClient(_app(db_factory)).get(f"/api/offline-set/{NODE}")
    assert res.status_code == 200, res.text
    body = res.json()
    assert body["count"] == 10                # capped, not 12
    assert len(body["questions"]) == 10

    q = body["questions"][0]
    assert q["id"].startswith("corpus:")      # resolvable by _get_question
    assert q["question_id"] == q["id"]
    assert q["text"]
    assert q["marks"] == 3
    assert q["year"] == "2024"
    assert q["topic"] == "Chapter 4"          # display label, never raw ch4
    assert q["has_marking_scheme"] is True

    # no answer-bearing field anywhere in the payload (exact key match so
    # the honest has_marking_scheme flag doesn't trip the assertion)
    blob = res.text.lower()
    for forbidden in ('"correct_answer":', '"model_answer":', '"explanation":',
                      '"marking_scheme":', "must never ship"):
        assert forbidden not in blob, forbidden


def test_mcq_options_flattened(db_factory):
    from fastapi.testclient import TestClient

    async def _go():
        async with db_factory() as s:
            s.add(BoardQuestion(
                id=uuid.uuid4(), question_number=1, node_tags=[NODE],
                subject="sci", class_level=10, chapter="ch4",
                question_type="mcq",
                question_text="Pick the odd one out.",
                options=[["alpha", "beta", "gamma", "delta"]],
                correct_answer="beta", marks=1,
                source_type="question_bank", board="CBSE"))
            await s.commit()
    _run(_go())

    res = TestClient(_app(db_factory)).get(f"/api/offline-set/{NODE}")
    assert res.status_code == 200
    q = res.json()["questions"][0]
    assert q["options"] == ["alpha", "beta", "gamma", "delta"]


# --------------------------------------------------------------------------- #
# 2 + 3. 404s
# --------------------------------------------------------------------------- #

def test_unknown_node_404(db_factory):
    from fastapi.testclient import TestClient

    _mk_question(db_factory, NODE, 0)
    res = TestClient(_app(db_factory)).get(
        "/api/offline-set/c99_zzz_cbse_99_999")
    assert res.status_code == 404


def test_malformed_node_404(db_factory):
    from fastapi.testclient import TestClient

    res = TestClient(_app(db_factory)).get(
        "/api/offline-set/not-a-node-id")
    assert res.status_code == 404


# --------------------------------------------------------------------------- #
# 4. guest (no auth wiring at all) — no crash, no 401
# --------------------------------------------------------------------------- #

def test_guest_gets_set_without_auth(db_factory):
    from fastapi.testclient import TestClient

    _mk_question(db_factory, NODE, 0)
    res = TestClient(_app(db_factory)).get(f"/api/offline-set/{NODE}")
    assert res.status_code == 200
    assert res.json()["count"] == 1


# --------------------------------------------------------------------------- #
# 6. flagged rows excluded
# --------------------------------------------------------------------------- #

def test_flagged_rows_excluded(db_factory):
    from fastapi.testclient import TestClient

    good = _mk_question(db_factory, NODE, 0)
    bad = _mk_question(db_factory, NODE, 1,
                       question_text="A template row that was quarantined.")

    async def _go():
        async with db_factory() as s:
            s.add(BoardQuestionFlag(question_id=bad, reason="template_row"))
            await s.commit()
    _run(_go())

    res = TestClient(_app(db_factory)).get(f"/api/offline-set/{NODE}")
    assert res.status_code == 200
    body = res.json()
    assert body["count"] == 1
    assert "quarantined" not in body["questions"][0]["text"]
