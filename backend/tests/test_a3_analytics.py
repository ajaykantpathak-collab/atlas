"""
A3 analytics surface — verification gate (student analytics + engagement).

The backend was already done when A3 started; this gate locks the CONTRACT
the new frontend surfaces (/stats, /misconceptions) were built against:

  1. The committed fixtures (deploy/frontend/data/a3-fixtures) carry the
     exact key contracts of the live endpoints — the .empty.json files were
     captured byte-for-byte from :8001 with the probe student account
     (2026-10-02), the .populated.json files use only the backend SELECT
     aliases (api/analytics.py, api/engagement.py,
     services/misconception_analytics.py).
  2. The frontend hooks reference every endpoint the surface claims to wire.
  3. No raw node/misconception/question id can be rendered as visible text —
     ids are opaque fetch keys; display goes through topicLabel().
  4. The charts' source data fixtures are internally consistent (7-day
     windows, counts add up).

Network-free by design: the LIVE counterpart of this gate is
deploy/frontend/scripts/a3-analytics-integration.mjs (hits :8001) and
scripts/a3-render-check.mjs (headless render).
"""

from __future__ import annotations

import json
import re
from pathlib import Path

import pytest

_FRONTEND = Path(__file__).resolve().parents[2] / "frontend"
_FIXTURES = _FRONTEND / "data" / "a3-fixtures"
_ANALYTICS = _FRONTEND / "components" / "analytics"

# ── Contracts (verbatim from the backend routers / captured responses) ──

STATS_TOP = ["student_id", "stats"]
STATS_ROW = [
    "total_events", "questions_answered", "correct_answers", "lessons_completed",
    "mastery_count", "total_marks", "max_marks_possible", "avg_time_seconds",
]
TIMELINE_ROW = [
    "event_id", "event_type", "timestamp", "subject", "question_id",
    "is_correct", "marks_awarded", "time_spent_seconds", "mastery_after",
]
MISCON_TOP = ["student_id", "trap_count", "traps"]
TRAP_ROW = ["misconception_id", "node_id", "hits", "last_seen"]
DAILY_KEYS = [
    "server_date", "streak", "goal", "today", "completed",
    "due_reviews", "due_items", "suggested_action",
]
DIGEST_KEYS = [
    "student_id", "student_name", "class_level", "week_start", "week_end",
    "has_activity", "questions", "correct", "accuracy", "minutes", "xp",
    "active_days", "streak", "top_topic", "weakest_topic", "by_day",
    "generated_at",
]
NOTIF_KEYS = ["notifications", "unread", "server_date"]


def _load(name: str) -> dict | list:
    return json.loads((_FIXTURES / name).read_text(encoding="utf-8"))


def _keys_equal(got, expected) -> bool:
    return sorted(got) == sorted(expected)


# ── 1. Fixtures carry the live contracts ─────────────────────────────────

def test_fixture_files_exist():
    required = [
        "analytics.stats.empty.json",
        "analytics.stats.populated.json",
        "analytics.timeline.empty.json",
        "analytics.timeline.populated.json",
        "analytics.misconceptions.student.empty.json",
        "analytics.misconceptions.student.populated.json",
        "engagement.daily.empty.json",
        "engagement.daily.populated.json",
        "engagement.weekly-digest.empty.json",
        "engagement.weekly-digest.populated.json",
        "engagement.notifications.empty.json",
        "path.next-best.live.json",
        "path.next-best.populated.json",
        "README.md",
    ]
    for name in required:
        assert (_FIXTURES / name).exists(), f"missing fixture: {name}"


def test_stats_empty_fixture_is_the_captured_live_shape():
    fix = _load("analytics.stats.empty.json")
    assert _keys_equal(list(fix), STATS_TOP + ["message"])
    assert fix["stats"] == {}
    # the honest message the API really returns for a student with no events
    assert fix["message"] == "No events found."


def test_stats_populated_fixture_uses_only_clickhouse_aliases():
    row = _load("analytics.stats.populated.json")["stats"]
    assert sorted(row) == sorted(STATS_ROW)
    assert row["questions_answered"] >= row["correct_answers"] >= 0
    assert row["max_marks_possible"] >= row["total_marks"] >= 0


def test_timeline_fixtures_match_select_columns():
    empty = _load("analytics.timeline.empty.json")
    assert empty == [], "captured empty timeline must be []"
    for row in _load("analytics.timeline.populated.json"):
        assert sorted(row) == sorted(TIMELINE_ROW)
        assert row["is_correct"] in (0, 1)


def test_misconception_profile_fixtures():
    empty = _load("analytics.misconceptions.student.empty.json")
    assert sorted(empty) == sorted(MISCON_TOP)
    assert empty["trap_count"] == 0 and empty["traps"] == []
    populated = _load("analytics.misconceptions.student.populated.json")
    assert populated["trap_count"] == len(populated["traps"])
    for row in populated["traps"]:
        assert sorted(row) == sorted(TRAP_ROW)
        assert row["hits"] >= 1


def test_engagement_daily_fixtures():
    for name in ("engagement.daily.empty.json", "engagement.daily.populated.json"):
        fix = _load(name)
        assert sorted(fix) == sorted(DAILY_KEYS), name
    # empty account: goal is null, streak honestly "none"
    empty = _load("engagement.daily.empty.json")
    assert empty["goal"] is None
    assert empty["streak"]["state"] == "none"
    assert empty["suggested_action"]  # the daily surface always proposes a move


def test_weekly_digest_fixtures_are_seven_day_windows():
    for name in ("engagement.weekly-digest.empty.json", "engagement.weekly-digest.populated.json"):
        fix = _load(name)
        missing = [k for k in DIGEST_KEYS if k not in fix]
        assert not missing, f"{name}: missing {missing}"
        assert len(fix["by_day"]) == 7
        # accuracy is null exactly when there is no activity (honest null)
        assert (fix["accuracy"] is None) == (not fix["has_activity"])
        assert fix["xp"] == fix["correct"] * 10 + (fix["questions"] - fix["correct"]) * 2
    populated = _load("engagement.weekly-digest.populated.json")
    assert populated["questions"] == sum(d["questions"] for d in populated["by_day"])
    assert populated["correct"] == sum(d["correct"] for d in populated["by_day"])


def test_notifications_fixture():
    fix = _load("engagement.notifications.empty.json")
    assert sorted(fix) == sorted(NOTIF_KEYS)
    assert fix["notifications"] == [] and fix["unread"] == 0


def test_next_best_fixtures():
    for name in ("path.next-best.live.json", "path.next-best.populated.json"):
        fix = _load(name)
        for key in ("user_id", "mastered_floor", "ready_to_learn", "repair_first", "graph_size"):
            assert key in fix, f"{name}: missing {key}"
        for entry in fix["ready_to_learn"] + fix["repair_first"]:
            for key in ("node_id", "mastery", "attempts", "reason"):
                assert key in entry, f"{name}: entry missing {key}"


# ── 2. The frontend actually wires the endpoints ──────────────────────────

def test_hooks_wire_every_surface_endpoint():
    hooks = (_ANALYTICS / "useA3Data.ts").read_text(encoding="utf-8")
    for needle in (
        "/api/analytics/student/",                 # stats
        "/timeline?limit=200",                     # timeline
        "/api/analytics/misconceptions/student/",  # misconception profile
        "/api/engagement/daily",
        "/api/engagement/weekly-digest/",
        "/api/path/next-best/me",
    ):
        assert needle in hooks, f"endpoint not wired in useA3Data.ts: {needle}"


def test_pages_exist_and_answer_the_three_questions():
    stats = (_FRONTEND / "app" / "(student)" / "stats" / "page.tsx").read_text(encoding="utf-8")
    assert "Am I improving?" in stats
    assert "Where am I weak?" in stats
    assert "What should I do next?" in stats
    assert (_FRONTEND / "app" / "(student)" / "misconceptions" / "page.tsx").exists()


# ── 3. Raw-id scrub — ids are opaque fetch keys, never visible text ───────

_RAW_ID_RENDER = re.compile(r"\{[^{}]*(node_id|misconception_id|question_id)[^{}]*\}")


def _scrubbed_source(src: str) -> str:
    """Remove the sanctioned id uses before scanning:
    topicLabel(...) display scrubbing, encodeURIComponent(...) hrefs,
    key={...} reconciliation keys, and template-literal interpolations
    (JS values, not rendered text). Mirrors the .mjs gate exactly."""
    src = re.sub(r"topicLabel\([^()]*\)", "topicLabel(SCRUBBED)", src)
    src = re.sub(r"encodeURIComponent\([^()]*\)", "encodeURIComponent(SCRUBBED)", src)
    src = re.sub(r"\$\{[^{}]*\}", "INTERP", src)
    src = re.sub(r"key=\{[^}]*\}", "key=OK", src)
    return src


@pytest.mark.parametrize(
    "relpath",
    [
        "components/analytics/TrapList.tsx",
        "components/analytics/SubjectBars.tsx",
        "components/analytics/NextActionCard.tsx",
        "components/analytics/TotalsStrip.tsx",
        "components/analytics/TrendChart.tsx",
        "components/analytics/TrendVerdict.tsx",
        "components/analytics/WeakTopicCard.tsx",
        "components/analytics/PageShell.tsx",
        "app/(student)/stats/page.tsx",
        "app/(student)/misconceptions/page.tsx",
    ],
)
def test_no_raw_id_rendered_as_visible_text(relpath: str):
    src = (_FRONTEND / relpath).read_text(encoding="utf-8")
    offenders = _RAW_ID_RENDER.findall(_scrubbed_source(src))
    assert not offenders, f"{relpath} renders raw ids: {offenders}"


def test_topic_label_routes_ids_through_friendly_node_title():
    display = (_ANALYTICS / "display.ts").read_text(encoding="utf-8")
    assert "friendlyNodeTitle" in display, "topicLabel must scrub through friendlyNodeTitle"


# ── 4. No stray debug output in the shipped surfaces ──────────────────────

@pytest.mark.parametrize(
    "relpath",
    [
        "components/analytics/TrapList.tsx",
        "components/analytics/SubjectBars.tsx",
        "components/analytics/NextActionCard.tsx",
        "components/analytics/TotalsStrip.tsx",
        "components/analytics/TrendChart.tsx",
        "components/analytics/TrendVerdict.tsx",
        "components/analytics/WeakTopicCard.tsx",
        "components/analytics/PageShell.tsx",
        "components/analytics/useA3Data.ts",
        "components/analytics/fixtures.ts",
        "components/analytics/display.ts",
        "components/analytics/contracts.ts",
        "app/(student)/stats/page.tsx",
        "app/(student)/misconceptions/page.tsx",
    ],
)
def test_no_console_logs_in_owned_files(relpath: str):
    src = (_FRONTEND / relpath).read_text(encoding="utf-8")
    assert not re.search(r"\bconsole\.(log|debug|info)\b", src), relpath
