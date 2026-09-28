"""
Gate A tests for the other student-visible metrics (ATLAS_10x10_PLAN.md).

Streaks were the first metric audited and they were wrong in three ways. These
cover the next two metrics found with the same lens — "who WRITES this, and
who DECAYS it?" — plus the wiring, so the aggregation cannot be re-inlined as a
flat mean.

Loaded by file path: `backend.services.*` executes the package __init__ chain,
which pulls in scipy and can take the interpreter down before collection on
this box (see pytest.ini).
"""

from __future__ import annotations

import importlib.util
import pathlib

_BACKEND = pathlib.Path(__file__).resolve().parent.parent

_spec = importlib.util.spec_from_file_location(
    "_honesty_metrics_under_test", _BACKEND / "services" / "honesty_metrics.py"
)
assert _spec is not None and _spec.loader is not None
hm = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(hm)

weighted = hm.weighted_overall_mastery
minutes = hm.rounded_minutes


def _read(rel: str) -> str:
    return (_BACKEND / rel).read_text(encoding="utf-8")


class TestWeightedOverallMastery:
    def test_no_records_is_none_not_zero(self):
        """None = unmeasured. 0.0% mastery is a real, alarming measurement."""
        assert weighted([]) == (None, 0)

    def test_one_stray_topic_cannot_dominate(self):
        """The regression: a flat mean scored this child at 50%."""
        topics = [
            {"mastery_score": 0.0, "attempts": 1},   # barely touched
            {"mastery_score": 100.0, "attempts": 9},  # real evidence
        ]
        overall, attempts = weighted(topics)
        assert overall == 90.0
        assert attempts == 10
        # Prove it is genuinely not the old flat mean.
        flat = sum(t["mastery_score"] for t in topics) / len(topics)
        assert flat == 50.0
        assert overall != flat

    def test_heavy_topic_evidence_weighs_more(self):
        weak = [{"mastery_score": 20.0, "attempts": 2}]
        strong = [{"mastery_score": 20.0, "attempts": 50}]
        assert weighted(strong)[0] == 20.0
        assert weighted(strong)[1] == 50
        assert weighted(weak)[1] == 2

    def test_falls_back_to_flat_mean_when_no_attempts_recorded(self):
        topics = [
            {"mastery_score": 40.0, "attempts": 0},
            {"mastery_score": 60.0, "attempts": 0},
        ]
        overall, attempts = weighted(topics)
        assert overall == 50.0
        assert attempts == 0

    def test_records_with_no_attempts_key_do_not_divide_by_zero(self):
        overall, attempts = weighted(
            [{"mastery_score": 80.0}, {"mastery_score": 60.0}]
        )
        assert overall == 70.0
        assert attempts == 0

    def test_junk_values_do_not_raise(self):
        overall, _ = weighted(
            [{"mastery_score": None, "attempts": "x"}, {"mastery_score": 50.0, "attempts": 2}]
        )
        assert overall == 50.0

    def test_single_topic_is_its_own_overall(self):
        assert weighted([{"mastery_score": 73.4, "attempts": 4}])[0] == 73.4

    def test_result_is_rounded_to_one_decimal(self):
        overall, _ = weighted(
            [{"mastery_score": 33.333, "attempts": 3}]
        )
        assert overall == 33.3


class TestRoundedMinutes:
    def test_sub_minute_session_is_not_reported_as_zero(self):
        """The regression: floor(30/60) displayed a real session as none."""
        assert minutes(30) == 1

    def test_rounding_is_half_up_not_bankers(self):
        # round(0.5) == 0 in Python; 30s must not silently become 0 minutes.
        assert minutes(30) == 1
        assert minutes(20) == 0  # under the boundary stays 0
        assert minutes(29) == 0

    def test_ninety_seconds_is_two_minutes(self):
        assert minutes(90) == 2

    def test_zero_stays_zero(self):
        assert minutes(0) == 0

    def test_exact_minutes(self):
        assert minutes(600) == 10

    def test_junk_is_zero_not_an_exception(self):
        for junk in (None, "", "abc", object()):
            assert minutes(junk) == 0


class TestWiring:
    def test_dashboard_uses_the_shared_aggregation(self):
        src = _read("api/dashboard.py")
        assert "weighted_overall_mastery(" in src
        assert "rounded_minutes(" in src

    def test_dashboard_has_no_flat_topic_mean_left(self):
        src = _read("api/dashboard.py")
        assert 'sum(t["mastery_score"] for t in by_topic) / len(by_topic)' not in src
        assert "total_seconds // 60" not in src

    def test_unmeasured_mastery_stays_none(self):
        """Must not be coerced back into 0.0 anywhere."""
        src = _read("api/dashboard.py")
        assert 'mastery_raw.get("overall", 0.0)' not in src
        assert "mastery_overall: Optional[float]" in src

    def test_weekly_minutes_reports_whether_it_was_measured(self):
        src = _read("api/dashboard.py")
        assert "weekly_practice_measured" in src
        assert 'return {"minutes": 0, "measured": False}' in src

    def test_xp_ladder_is_not_hardcoded(self):
        """Hardcoding 100 would drift the day XP_PER_LEVEL changes."""
        src = _read("api/dashboard.py")
        assert "from backend.services.progress_service import XP_PER_LEVEL" in src
        assert "total_xp % 100" not in src
