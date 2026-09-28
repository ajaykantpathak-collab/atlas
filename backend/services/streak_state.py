"""
Streak read model — the single source of truth for "is this streak alive?"
============================================================================

WHY THIS EXISTS
---------------
`ProgressService.update_streak` (services/progress_service.py) only ever
*writes* a stored counter (`users.streak_days`), and it decays that counter
LAZILY — on the student's next practice:

    last is None or last < yesterday  -> streak_days = 1
    last == yesterday                 -> streak_days += 1
    last == today                     -> no change

So the stored number on its own is NOT a current streak. A child who practised
20 days and then left for a month still has `20` in the column, which any naive
read path renders as a live 20-day streak; on the day they return, the first
practice silently rewrites it to `1` and the streak collapses with no
explanation.

Every read path must therefore classify the streak off `last_activity_date`,
using the SAME day boundary the writer uses (server-local `date.today()`).
Mixing in a UTC clock here silently disagrees with the writer for part of every
day and flips alerts on/off at the wrong hour.

Consumers (all three must stay in step):
  - services/progress_service.py  -> GET /api/progress/dashboard
  - api/dashboard.py              -> student + parent dashboards
  - api/engagement.py             -> GET /api/engagement/... streak state

This module is deliberately dependency-free (stdlib only) so routers can import
it without pulling in the heavy service/model graph.
"""

from __future__ import annotations

from datetime import date, timedelta
from typing import Any, Optional

#: Practised today — the streak is counted today.
STREAK_ACTIVE_TODAY = "active_today"
#: Last practice was yesterday — a session TODAY still saves it.
STREAK_AT_RISK = "at_risk"
#: Missed more than a day — the streak already broke; today starts a NEW one.
STREAK_LAPSED = "lapsed"
#: No streak has ever been recorded.
STREAK_NONE = "none"
#: The row could not be read — never report this as a real zero.
STREAK_UNKNOWN = "unknown"


def classify_streak(
    streak_days: Any,
    last_activity_date: Optional[date],
    today: Optional[date] = None,
) -> dict[str, Any]:
    """Classify a stored streak counter against the last-activity date.

    Returns a dict with:
      recorded_streak   the raw counter, unmodified (so nothing is hidden)
      current_streak    the counter ONLY while the streak is alive, else 0
      state             one of the STREAK_* constants above
      last_activity_date  ISO string or None
      days_since_last   integer gap in days, or None when never practised
    """
    day = today or date.today()
    try:
        recorded = int(streak_days or 0)
    except (TypeError, ValueError):
        recorded = 0

    if recorded <= 0 or last_activity_date is None:
        state = STREAK_NONE
    elif last_activity_date == day:
        state = STREAK_ACTIVE_TODAY
    elif last_activity_date == day - timedelta(days=1):
        state = STREAK_AT_RISK
    else:
        state = STREAK_LAPSED

    alive = state in (STREAK_ACTIVE_TODAY, STREAK_AT_RISK)
    return {
        "recorded_streak": recorded,
        "current_streak": recorded if alive else 0,
        "state": state,
        "last_activity_date": (
            last_activity_date.isoformat() if last_activity_date else None
        ),
        "days_since_last": (
            None
            if last_activity_date is None
            else (day - last_activity_date).days
        ),
    }


def unknown_streak() -> dict[str, Any]:
    """A failed read is NOT a zero streak.

    Surfaces that receive this must show "unknown"/no-streak rather than
    telling a student their streak is 0 because of a transient DB error.
    """
    return {
        "recorded_streak": 0,
        "current_streak": 0,
        "state": STREAK_UNKNOWN,
        "last_activity_date": None,
        "days_since_last": None,
    }
