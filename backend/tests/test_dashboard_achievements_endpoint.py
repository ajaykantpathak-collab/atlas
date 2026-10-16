"""In-process tests for GET /api/dashboard/student/{id}/achievements.

Audit fix 2026-10-05: the endpoint's "primary" path called
AchievementService.get_earned_achievements() — a method that never existed —
and its fallback queried columns the achievements table does not have on a
model ``database`` does not export (NameError in production). The endpoint
now has ONE path: AchievementService.get_achievements(db, user_id, filter
="unlocked"), the same static API the /api/achievements router serves.

No Docker, no Postgres, no network: the db is a stub, the service call is
monkeypatched, and the endpoint coroutine is awaited directly.
"""

from __future__ import annotations

import pathlib
import sys
import uuid
from datetime import datetime, timedelta, timezone

import pytest

_BACKEND = pathlib.Path(__file__).resolve().parent.parent
if str(_BACKEND.parent) not in sys.path:
    sys.path.insert(0, str(_BACKEND.parent))

import os  # noqa: E402

os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite://")

from backend.api import dashboard  # noqa: E402


class _Result:
    def __init__(self, row: object) -> None:
        self._row = row

    def scalar_one_or_none(self) -> object:
        return self._row


class _StubDB:
    """Just enough of AsyncSession for this endpoint: one execute() that
    resolves the Student row lookup."""

    def __init__(self, student_row: object) -> None:
        self._student_row = student_row

    async def execute(self, _query: object) -> _Result:
        return _Result(self._student_row)


class _StubUser:
    def __init__(self, user_id: str) -> None:
        self.id = user_id
        self.role = "student"


def _ach(aid: str, title: str, unlocked_at: datetime, xp: int = 50) -> dict:
    return {
        "achievement_id": aid,
        "title": title,
        "description": f"desc {aid}",
        "icon_name": "flame",
        "tier": "silver",
        "xp_reward": xp,
        "unlocked": True,
        "unlocked_at": unlocked_at.isoformat(),
        "progress": 7,
        "max_progress": 7,
    }


@pytest.mark.asyncio  # type: ignore[misc]
async def test_badge_panel_reads_the_real_service(monkeypatch: pytest.MonkeyPatch) -> None:
    """The one path maps the service payload honestly into AchievementItem."""
    sid = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    calls: list[dict] = []

    async def fake_get_achievements(db: object, user_id: str, filter: str | None = None) -> dict:
        calls.append({"user_id": user_id, "filter": filter})
        return {
            "achievements": [
                _ach("streak_7", "Week Warrior", now - timedelta(days=1)),
                _ach("xp_500", "Rising Star", now - timedelta(days=30)),
            ],
            "unlocked_count": 2,
            "total_xp": 150,
            "wallet_xp": 900,
        }

    monkeypatch.setattr(
        dashboard.AchievementService, "get_achievements", fake_get_achievements
    )

    resp = await dashboard.get_student_achievements(
        student_id=sid, db=_StubDB(object()), user=_StubUser(sid)
    )

    assert calls == [{"user_id": sid, "filter": "unlocked"}]
    assert resp.source_readable is True
    assert resp.total_earned == 2
    assert [a.achievement_id for a in resp.achievements] == ["streak_7", "xp_500"]
    first = resp.achievements[0]
    # title -> name, icon_name -> icon, tier -> category, xp_reward -> xp_bonus
    assert first.name == "Week Warrior"
    assert first.icon == "flame"
    assert first.category == "silver"
    assert first.xp_bonus == 50
    assert first.rarity == "common"
    # raw counter 7 of max 7 renders as the 0-100 percentage the schema promises
    assert first.progress == 100.0
    # recent = earned within 7 days only
    assert [a.achievement_id for a in resp.recent_achievements] == ["streak_7"]


@pytest.mark.asyncio  # type: ignore[misc]
async def test_badge_panel_reports_unreadable_when_service_unavailable(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """No service -> source_readable False, never 'this child has no badges'."""
    sid = str(uuid.uuid4())
    monkeypatch.setattr(dashboard, "_HAS_ACHIEVEMENT_SVC", False)

    resp = await dashboard.get_student_achievements(
        student_id=sid, db=_StubDB(object()), user=_StubUser(sid)
    )

    assert resp.source_readable is False
    assert resp.total_earned == 0
    assert resp.achievements == []


@pytest.mark.asyncio  # type: ignore[misc]
async def test_badge_panel_survives_a_service_error(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """A raising service degrades to an unreadable payload, not a 500."""

    async def boom(db: object, user_id: str, filter: str | None = None) -> dict:
        raise RuntimeError("ledger offline")

    sid = str(uuid.uuid4())
    monkeypatch.setattr(dashboard.AchievementService, "get_achievements", boom)

    resp = await dashboard.get_student_achievements(
        student_id=sid, db=_StubDB(object()), user=_StubUser(sid)
    )

    assert resp.source_readable is False
    assert resp.total_earned == 0
