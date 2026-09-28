"""
Honest aggregation for student-visible metrics (ATLAS_10x10_PLAN.md Gate A).

Dependency-free (stdlib only) so it can be unit tested without the heavy
service/model import graph — see pytest.ini for why that matters here.

Gate A's standing question is "who WRITES this value, and WHO DECAYS it?".
These two helpers exist because two read paths got that wrong:

  * overall mastery was a FLAT mean over topics, so one stray topic at 0%
    dragged down a child with deep work everywhere else — and that number
    gates an URGENT parent alert at < 30%.
  * weekly practice minutes were FLOORED and fail-open to 0, so a real
    30-second session displayed as "0 minutes", and a failed query was
    indistinguishable from a child who did not practise.
"""

from __future__ import annotations

from typing import Any, Iterable, Optional


def weighted_overall_mastery(
    topics: Iterable[dict[str, Any]],
) -> tuple[Optional[float], int]:
    """Attempt-weighted overall mastery.

    A mastery probability is only as trustworthy as the evidence behind it, so
    each topic is weighted by its attempt count. A flat mean let a single
    unstudied topic at 0% dominate the headline number.

    Returns `(overall, total_attempts)`:
      * `(None, 0)` when there is nothing to measure — the caller must render
        "no data", never `0.0`, because 0.0% mastery is a real (and alarming)
        measurement.
      * falls back to the flat mean when records exist but none carry an
        attempt count, so we neither divide by zero nor invent evidence.
    """
    rows = list(topics)
    if not rows:
        return None, 0

    def attempts(row: dict[str, Any]) -> int:
        try:
            return int(row.get("attempts") or 0)
        except (TypeError, ValueError):
            return 0

    def score(row: dict[str, Any]) -> float:
        try:
            return float(row.get("mastery_score") or 0.0)
        except (TypeError, ValueError):
            return 0.0

    total_attempts = sum(attempts(r) for r in rows)
    if total_attempts > 0:
        weighted = sum(score(r) * attempts(r) for r in rows)
        return round(weighted / total_attempts, 1), total_attempts
    return round(sum(score(r) for r in rows) / len(rows), 1), 0


def rounded_minutes(total_seconds: int) -> int:
    """Seconds -> whole minutes, rounded half-up (not floored).

    Flooring reported a child who genuinely practised for 30 seconds as
    "0 minutes this week" — a real session displayed as no session.

    Half-up rather than Python's built-in `round`, whose banker's rounding
    makes `round(0.5) == 0` and would silently report 30 seconds as 0 minutes.
    Sessions under 30 seconds still round to 0, which is honest at minute
    granularity; callers needing finer detail should keep the seconds.
    """
    try:
        seconds = int(total_seconds or 0)
    except (TypeError, ValueError):
        return 0
    return int(seconds / 60 + 0.5) if seconds >= 0 else 0
