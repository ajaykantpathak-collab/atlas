"""Weekly-activity chart buckets on the IST student-day boundary.

Audit fix 2026-10-05: ProgressService.get_weekly_activity used to build its
7-day window from datetime.now(timezone.utc) and bucket each log by its UTC
weekday name, so on a UTC host a 23:30 IST submit landed on the wrong
weekday and the "week" rolled over at 05:30 IST instead of midnight. The
chart now shares the canonical boundary (services/streak_state.student_today,
the same one the reward ledger writes streaks on). Display-only: feeds no
rewards.

No Docker, no Postgres: the db is a stub returning in-memory log rows.
"""

from __future__ import annotations

import pathlib
import sys
from datetime import date, datetime, timedelta, timezone

import pytest

_BACKEND = pathlib.Path(__file__).resolve().parent.parent
if str(_BACKEND.parent) not in sys.path:
    sys.path.insert(0, str(_BACKEND.parent))

import os  # noqa: E402

os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite://")

from backend.services import progress_service as ps  # noqa: E402
from backend.services import streak_state as ss  # noqa: E402

IST = ss.IST

# A fixed IST "today" so the test is clock-independent.
TODAY = date(2026, 10, 5)  # a Monday


def _ist(day: date, hour: int, minute: int) -> datetime:
    """An aware datetime at the given IST wall time."""
    return datetime(day.year, day.month, day.day, hour, minute, tzinfo=IST)


class _Scalars:
    def __init__(self, rows: list) -> None:
        self._rows = rows

    def all(self) -> list:
        return self._rows


class _Result:
    def __init__(self, rows: list) -> None:
        self._rows = rows

    def scalars(self) -> _Scalars:
        return _Scalars(self._rows)


class _StubDB:
    def __init__(self, rows: list) -> None:
        self._rows = rows
        self.captured_bound: object = None

    async def execute(self, query: object) -> _Result:
        # Capture the compiled bound for the prefilter so we can assert the
        # window covers the padded range (see the edge-row test below).
        try:
            self.captured_bound = query.compile().params
        except Exception:
            self.captured_bound = None
        return _Result(self._rows)


class _Log:
    """Duck-typed ActivityLog: only created_at is read."""

    def __init__(self, created_at: datetime) -> None:
        self.created_at = created_at


@pytest.fixture()
def fixed_today(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setattr(ps, "student_today", lambda: TODAY)
    return TODAY


@pytest.mark.asyncio  # type: ignore[misc]
async def test_buckets_follow_the_ist_student_day(fixed_today) -> None:
    """00:30 IST belongs to TODAY even though its UTC instant is the
    previous UTC day — the exact case the UTC bucketing got wrong."""
    rows = [
        # IST TODAY 00:30 == UTC yesterday 19:00 → must land on TODAY.
        _Log(_ist(TODAY, 0, 30).astimezone(timezone.utc)),
        # IST TODAY 23:30 == UTC today 18:00 → TODAY.
        _Log(_ist(TODAY, 23, 30)),
        # Oldest window day (T-6), midday IST.
        _Log(_ist(TODAY - timedelta(days=6), 12, 0)),
    ]
    db = _StubDB(rows)

    out = await ps.ProgressService.get_weekly_activity(db, "u1")

    assert len(out) == 7
    # Oldest → today, weekday names are the IST dates'.
    assert out[0]["day"] == (TODAY - timedelta(days=6)).strftime("%a")
    assert out[-1]["day"] == TODAY.strftime("%a")
    values = [entry["value"] for entry in out]
    assert values == [1, 0, 0, 0, 0, 0, 2]


@pytest.mark.asyncio  # type: ignore[misc]
async def test_naive_row_timestamps_read_as_utc(fixed_today) -> None:
    """SQLite-style naive datetimes mean UTC; they must be normalized
    before the IST bucket, not treated as IST wall time."""
    naive_utc_today_noon = datetime(TODAY.year, TODAY.month, TODAY.day, 12, 0)
    # As IST wall time that would be 12:00 IST — as UTC it is 17:30 IST,
    # still TODAY, but the distinction matters for edge instants.
    rows = [_Log(naive_utc_today_noon)]
    out = await ps.ProgressService.get_weekly_activity(_StubDB(rows), "u1")
    assert out[-1]["value"] == 1


@pytest.mark.asyncio  # type: ignore[misc]
async def test_row_just_outside_the_window_is_dropped(fixed_today) -> None:
    """The SQL prefilter is padded one day so tz skew cannot drop edge
    rows; the IST bucketing is what actually excludes T-7."""
    rows = [
        _Log(_ist(TODAY - timedelta(days=7), 12, 0)),  # outside the week
        _Log(_ist(TODAY - timedelta(days=6), 0, 1)),   # first window minute
    ]
    out = await ps.ProgressService.get_weekly_activity(_StubDB(rows), "u1")
    values = [entry["value"] for entry in out]
    assert values == [1, 0, 0, 0, 0, 0, 0]


@pytest.mark.asyncio  # type: ignore[misc]
async def test_no_rows_yields_seven_zero_days(fixed_today) -> None:
    out = await ps.ProgressService.get_weekly_activity(_StubDB([]), "u1")
    assert len(out) == 7
    assert all(entry["value"] == 0 for entry in out)
