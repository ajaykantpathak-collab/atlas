"""
Regression tests for the streak read model (services/streak_state.py).

WHY THESE EXIST
---------------
`ProgressService.update_streak` decays `users.streak_days` LAZILY — only on
the student's next practice. So the stored counter is NOT a current streak, and
every read path that echoed it straight to a dashboard was reporting a live
"20-day streak" to a child who had not practised in a month, then silently
collapsing it to 1 on the day they returned.

The behavioural tests pin the classification. The wiring tests pin that the
live read paths actually USE it (a pure-logic test would stay green while the
dashboard kept serving the raw counter).

The module is loaded by file path on purpose: importing `backend.services.*`
executes the package `__init__` chain, which drags in scipy via the solver
imports and crashes the interpreter before collection on this box (see
pytest.ini).
"""

from __future__ import annotations

import datetime as dt
import importlib.util
import pathlib

import pytest

_TESTS_DIR = pathlib.Path(__file__).resolve().parent
_BACKEND = _TESTS_DIR.parent
_ROOT = _BACKEND.parent

# ---------------------------------------------------------------------------
# Load streak_state.py directly (stdlib-only; no package __init__ side effects)
# ---------------------------------------------------------------------------
_spec = importlib.util.spec_from_file_location(
    "_streak_state_under_test", _BACKEND / "services" / "streak_state.py"
)
assert _spec is not None and _spec.loader is not None
streak_state = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(streak_state)

classify_streak = streak_state.classify_streak
unknown_streak = streak_state.unknown_streak

TODAY = dt.date(2026, 9, 27)


def _read(rel: str) -> str:
    return (_ROOT / rel).read_text(encoding="utf-8")


# ---------------------------------------------------------------------------
# Behaviour: the honest states
# ---------------------------------------------------------------------------
class TestClassifyStreak:
    def test_active_today_keeps_the_counter(self):
        s = classify_streak(5, TODAY, today=TODAY)
        assert s["state"] == streak_state.STREAK_ACTIVE_TODAY
        assert s["current_streak"] == 5
        assert s["recorded_streak"] == 5
        assert s["days_since_last"] == 0

    def test_at_risk_yesterday_still_alive(self):
        s = classify_streak(5, TODAY - dt.timedelta(days=1), today=TODAY)
        assert s["state"] == streak_state.STREAK_AT_RISK
        assert s["current_streak"] == 5
        assert s["days_since_last"] == 1

    def test_lapsed_streak_reads_zero_but_keeps_the_record(self):
        """The core regression: a 20-day streak from a month ago is not 20."""
        stale = TODAY - dt.timedelta(days=30)
        s = classify_streak(20, stale, today=TODAY)
        assert s["state"] == streak_state.STREAK_LAPSED
        assert s["current_streak"] == 0
        # Raw counter preserved so nothing is silently hidden.
        assert s["recorded_streak"] == 20
        assert s["days_since_last"] == 30

    def test_yesterday_is_not_lapsed(self):
        """Off-by-one guard: one missed day is at_risk, not lapsed."""
        s = classify_streak(3, TODAY - dt.timedelta(days=1), today=TODAY)
        assert s["state"] != streak_state.STREAK_LAPSED

    def test_two_missed_days_is_lapsed(self):
        s = classify_streak(3, TODAY - dt.timedelta(days=2), today=TODAY)
        assert s["state"] == streak_state.STREAK_LAPSED
        assert s["current_streak"] == 0

    def test_never_practised_is_none(self):
        s = classify_streak(0, None, today=TODAY)
        assert s["state"] == streak_state.STREAK_NONE
        assert s["current_streak"] == 0
        assert s["days_since_last"] is None

    def test_counter_without_a_date_is_none_not_a_streak(self):
        s = classify_streak(7, None, today=TODAY)
        assert s["state"] == streak_state.STREAK_NONE
        assert s["current_streak"] == 0

    @pytest.mark.parametrize("junk", [None, "", "abc"])
    def test_junk_counter_degrades_to_zero_without_raising(self, junk):
        s = classify_streak(junk, TODAY, today=TODAY)
        assert s["recorded_streak"] == 0
        assert s["state"] == streak_state.STREAK_NONE

    def test_last_activity_date_is_iso_formatted(self):
        s = classify_streak(1, TODAY, today=TODAY)
        assert s["last_activity_date"] == TODAY.isoformat()

    def test_today_defaults_to_the_canonical_student_day(self):
        """The default boundary is the IST student day (owner decision
        2026-10) — the SAME clock the canonical writer
        (services/reward_ledger.update_streak) buckets with."""
        s = classify_streak(4, dt.datetime.now(streak_state.IST).date())
        assert s["state"] == streak_state.STREAK_ACTIVE_TODAY


class TestUnknownStreak:
    def test_failed_read_is_unknown_not_a_real_zero(self):
        u = unknown_streak()
        assert u["state"] == streak_state.STREAK_UNKNOWN
        assert u["current_streak"] == 0
        assert u["last_activity_date"] is None

    def test_unknown_is_distinguishable_from_none(self):
        """A DB blip must not look like 'never practised'."""
        assert unknown_streak()["state"] != classify_streak(0, None)["state"]


# ---------------------------------------------------------------------------
# Wiring: the live read paths must use the shared model
# ---------------------------------------------------------------------------
def _helper_body(src: str, header: str) -> str:
    """Return the source of one function, so assertions stay scoped."""
    return src.split(header, 1)[1].split("\ndef ", 1)[0]


class TestReadPathsAreWired:
    def test_dashboard_streak_helper_classifies(self):
        src = _read("backend/api/dashboard.py")
        body = _helper_body(src, "async def _get_service_streak")
        assert "classify_streak(" in body

    def test_dashboard_does_not_fabricate_a_personal_best(self):
        """`longest_streak: streak_days` reported an invented personal best."""
        src = _read("backend/api/dashboard.py")
        assert '"longest_streak": streak_days' not in src
        assert '"longest_streak": None' in src

    def test_dashboard_failed_read_is_unknown(self):
        src = _read("backend/api/dashboard.py")
        body = _helper_body(src, "async def _get_service_streak")
        assert "unknown_streak()" in body
        assert 'logger.warning("streak query error' in body

    def test_progress_dashboard_serves_the_decayed_value(self):
        src = _read("backend/services/progress_service.py")
        dash = src.split("async def get_dashboard", 1)[1].split("\n    @", 1)[0]
        assert "_streak = streak_read_state(" in dash
        assert '"streak": user.streak_days or 0' not in dash
        assert '"streak": _streak["current_streak"]' in dash
        assert '"streak_days": user.streak_days or 0' not in dash

    def test_engagement_delegates_to_the_same_model(self):
        src = _read("backend/api/engagement.py")
        assert "classify_streak(" in _helper_body(src, "def _streak_state")

    def test_parent_alert_uses_the_writer_day_boundary(self):
        """Server-local date.today() split IST evenings across two server days;
        the alert pass must use the canonical IST student day the writer uses."""
        src = _read("backend/api/dashboard.py")
        alerts = src.split("alerts: list[ParentAlert] = []", 1)[1]
        alerts = alerts.split("severity_order", 1)[0]
        assert "today = _student_today()" in alerts
        assert "today = date.today()" not in alerts
        assert "today = datetime.now(timezone.utc).date()" not in alerts


# ---------------------------------------------------------------------------
# services/streak_service.py (the old parallel engine these tests used to
# pin) was DELETED 2026-10-05 — it was unwired and contradicted the canonical
# reward_ledger streak model. The read model here (streak_state.py) is the
# one boundary every reader shares with the writer.
# ---------------------------------------------------------------------------
