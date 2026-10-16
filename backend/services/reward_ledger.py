"""
reward_ledger.py — THE canonical reward service (XP / stars / level / streak).
==============================================================================

ONE LEDGER RULE (council finding 2026-10: "XP showed 6 vs 70, stars 0 vs 416")
-----------------------------------------------------------------------------
Every surface that MOVES or READS a reward number must go through this module.
The historical bug class this kills: several endpoints each computed their own
XP/stars inline (achievements summed badge rewards and labelled it "XP",
dashboards re-derived level from a possibly-stale column, the tutor session
announced XP it never persisted), so two surfaces disagreed about the same
child on the same day.

WHAT LIVES HERE (pure, deterministic, testable without a DB)
-----------------------------------------------------------
* DAY BOUNDARY   — ``student_today()``: the student's LOCAL day is IST
  (Asia/Kolkata, UTC+05:30, no DST). The student population is IST and the
  production hosts run UTC; bucketing reward days on the server clock split
  one IST evening of practice across two UTC days (a 23:30 IST submit and the
  00:30 IST follow-up are ONE UTC day but TWO student days). Every reward
  day-bucket — streak writer, streak read model, engagement goal, parent
  alerts — uses THIS boundary, and timestamps are converted to IST before
  their date is compared against it.
* LEVEL          — ``level_for`` / ``level_breakdown``: level = floor(xp/100)+1,
  derived from total XP every time it is displayed. The users.current_level
  column is a WRITE CACHE maintained by ``award_xp``; no reader may trust it
  over a fresh derivation (a stale cache was one of the divergent numbers).
* STARS          — ``stars_for`` / ``total_stars_for``: stars are a BAND
  function of live mastery probability (the 0.8 platform "mastered" bar used
  by /api/progress/overview and the galaxy's lit-star threshold). Stars are
  NEVER a stored counter — there is nothing to go stale.
* STREAK MATH    — ``compute_streak``: the freeze-token contract
  (LEARNING_DESIGN anti-scariness contract): a gap day consumes one freeze
  token (earned at every completed 5-day streak) instead of resetting the
  streak to zero. A gap of N days needs N-1 tokens; fewer tokens than missed
  days → honest reset to 1.
* XP AMOUNTS     — ``xp_for_answer``: the canonical per-answer band
  (10 correct / 2 incorrect) used by practice, quizzes, diagnostics and
  assignments. Surfaces with a reviewed product curve (reviews 5/1, tutor
  10-20/5) pass their own amount; the ledger still owns storage, level and
  idempotency for them.

WHAT LIVES HERE (DB-backed, one writer each)
--------------------------------------------
* ``award_xp`` — the ONLY code path that mutates ``users.total_xp``.
  When ``event_ref`` is supplied the award is keyed by
  (student, event, event_ref) uniqueness in ``reward_event_log`` and applies
  EXACTLY ONCE — a retried submit, an offline-replay flush or a double-tap
  cannot pay twice. Without an ``event_ref`` one call = one award (the
  legacy POST-per-award contract for endpoints with no attempt identity).
* ``update_streak`` — the ONLY writer of ``users.streak_days`` /
  ``users.last_activity_date`` / ``streak_records``. Freeze tokens live in
  the ``streak_freezes`` table (schema carried over unchanged from the
  previous writer so existing token balances survive).
* ``get_freeze_tokens`` — the read side, so a dashboard can honestly say
  whether a freeze is available instead of hardcoding False.

Import-light at module scope (stdlib only) so tests can load it by file
path without dragging the solver stack — same rule as mastery_ledger.py.
"""

from __future__ import annotations

import hashlib
import logging
import math
from dataclasses import dataclass
from datetime import date, datetime, timezone
from typing import Any, Iterable, Optional

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Day boundary — imported from streak_state (the dependency-free owner).
# ---------------------------------------------------------------------------
#: Asia/Kolkata fixed offset (India has no DST). Every reward day-bucket in
#: the platform is computed in services/streak_state.py; the re-exports below
#: keep this module the single import surface for reward writers.
from backend.services.streak_state import (  # noqa: E402
    IST,
    student_today,
    to_ist,
)


# ---------------------------------------------------------------------------
# XP / level / stars — pure reward math
# ---------------------------------------------------------------------------
XP_PER_LEVEL = 100  # single source: level = floor(xp / 100) + 1

#: Canonical per-answer XP band (practice, quizzes, diagnostics, assignments).
XP_CORRECT = 10
XP_INCORRECT = 2

#: Mastery bands → stars. 0.8 is the platform's "mastered" bar
#: (/api/progress/overview, achievements, galaxy lit threshold = 80%).
STAR_BANDS: tuple[tuple[float, int], ...] = (
    (0.8, 3),   # mastered
    (0.65, 2),  # nearly there
    (0.5, 1),   # learning
)


def level_for(total_xp: Any) -> int:
    """Level derived from lifetime XP — never read from a stored column."""
    try:
        xp = int(total_xp or 0)
    except (TypeError, ValueError):
        xp = 0
    return max(1, math.floor(max(0, xp) / XP_PER_LEVEL) + 1)


def level_breakdown(total_xp: Any) -> dict[str, int]:
    """Full level display tuple derived from XP: level / current_level_xp /
    xp_to_next_level. Every XP widget builds its numbers from here."""
    try:
        xp = max(0, int(total_xp or 0))
    except (TypeError, ValueError):
        xp = 0
    current_level_xp = xp % XP_PER_LEVEL
    return {
        "level": level_for(xp),
        "current_level_xp": current_level_xp,
        "xp_to_next_level": XP_PER_LEVEL - current_level_xp,
    }


def xp_for_answer(is_correct: bool) -> int:
    """Canonical per-answer award for assess surfaces (practice/quiz/diag/assignment)."""
    return XP_CORRECT if is_correct else XP_INCORRECT


def stars_for(mastery_probability: Any) -> int:
    """Stars for ONE node, derived from its LIVE mastery probability.

    Deliberately NOT a counter: any surface asking "how many stars does this
    node have" recomputes the band, so a stale row can never show stars the
    current mastery does not support.
    """
    try:
        m = float(mastery_probability or 0.0)
    except (TypeError, ValueError):
        return 0
    for threshold, stars in STAR_BANDS:
        if m >= threshold:
            return stars
    return 0


def total_stars_for(mastery_probabilities: Iterable[Any]) -> int:
    """Total stars across nodes — the sum of per-node live bands."""
    return sum(stars_for(m) for m in mastery_probabilities)


# ---------------------------------------------------------------------------
# Streak math — pure (mirrors services/streak_state.py's read classification)
# ---------------------------------------------------------------------------
FREEZE_TOKEN_EVERY_DAYS = 5  # a token is earned at each completed 5-day streak


@dataclass
class StreakOutcome:
    """Result of one practice day applied to the streak counter."""

    streak_days: int
    tokens_used: int = 0
    tokens_earned: int = 0
    froze: bool = False       # a gap was covered by freeze tokens
    same_day: bool = False    # practice already counted today — no counter move


def compute_streak(
    streak_days: Any,
    last_day: Optional[date],
    today: date,
    freeze_tokens: int = 0,
) -> StreakOutcome:
    """One practice on ``today`` applied to the stored streak counter.

    Day math (IST boundary — the caller passes student_today()):
      last_day == today          → same-day re-submit: counter unchanged.
      last_day == today - 1      → consecutive day: streak + 1; a token is
                                    earned at every completed 5-day streak.
      last_day is None           → first ever practice: streak = 1.
      gap >= 2 days              → each MISSED day consumes one freeze token;
                                    enough tokens (and a streak of 2+) keep
                                    the counter alive (froze=True); any
                                    shortage resets honestly to 1.
    """
    try:
        streak = max(0, int(streak_days or 0))
    except (TypeError, ValueError):
        streak = 0

    if last_day is None:
        return StreakOutcome(streak_days=1)

    gap = (today - last_day).days
    if gap <= 0:
        # Same IST day (or a defensively-ordered write): nothing moves.
        return StreakOutcome(streak_days=streak or 1, same_day=True)
    if gap == 1:
        new_streak = streak + 1
        earned = 1 if new_streak % FREEZE_TOKEN_EVERY_DAYS == 0 else 0
        return StreakOutcome(streak_days=new_streak, tokens_earned=earned)

    # Gap >= 2: N-1 missed days need N-1 tokens.
    missed = gap - 1
    if freeze_tokens >= missed and streak >= 2:
        return StreakOutcome(
            streak_days=streak, tokens_used=missed, froze=True
        )
    return StreakOutcome(streak_days=1)


def event_key(user_id: Any, event: str, event_ref: str) -> str:
    """Deterministic (student, event, event_ref) idempotency key.

    Pure function — a retried submit derives the same key and hits the
    UNIQUE constraint in reward_event_log instead of paying XP twice.
    """
    raw = f"{user_id}:{event}:{event_ref}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:64]


# ---------------------------------------------------------------------------
# DB-backed writers — the ONE path to users.total_xp / streak columns
# ---------------------------------------------------------------------------
_EVENT_TABLE_DDL = """
CREATE TABLE IF NOT EXISTS reward_event_log (
    event_key VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    event VARCHAR(40) NOT NULL,
    event_ref VARCHAR(190),
    amount INT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
"""

_FREEZE_TABLE_DDL = """
CREATE TABLE IF NOT EXISTS streak_freezes (
    user_id VARCHAR(64) PRIMARY KEY,
    tokens INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
"""

# CREATE TABLE IF NOT EXISTS makes this cheap after the first call in a
# process (mirrors mastery_ledger's _table_ready pattern).
_tables_ready = False


async def _ensure_tables(db: Any) -> None:
    global _tables_ready
    if _tables_ready:
        return
    from sqlalchemy import text

    await db.execute(text(_EVENT_TABLE_DDL))
    await db.execute(text(_FREEZE_TABLE_DDL))
    _tables_ready = True


def reset_for_tests() -> None:
    """Reset the process-local DDL flag (tests only)."""
    global _tables_ready
    _tables_ready = False


async def get_freeze_tokens(db: Any, user_id: str) -> int:
    """Current streak-freeze token balance (0 on any read failure — the
    balance gates a PRESERVATION benefit, so a failed read must never
    invent a freebie)."""
    try:
        from sqlalchemy import text

        await _ensure_tables(db)
        row = (
            await db.execute(
                text("SELECT tokens FROM streak_freezes WHERE user_id = :u"),
                {"u": str(user_id)},
            )
        ).first()
        return int(row[0] or 0) if row else 0
    except Exception as exc:  # pragma: no cover - depends on store health
        logger.warning("freeze token read failed for %s: %s", user_id, exc)
        return 0


async def award_xp(
    db: Any,
    user_id: str,
    amount: int,
    *,
    event: str = "generic",
    event_ref: Optional[str] = None,
) -> dict[str, Any]:
    """Add XP through the ONE wallet path, exactly once per (event, event_ref).

    Returns an honest receipt:
        {"awarded": bool, "duplicate": bool, "total_xp": int, "level": int}

    Idempotency: with ``event_ref`` set, the award is keyed by
    (student, event, event_ref) in ``reward_event_log``; a replay of the same
    logical attempt (retry, offline flush, double-tap) is a no-op. Without an
    ``event_ref`` one call = one award — reserved for endpoints whose POST is
    itself the unit of work (no attempt identity exists to key).

    Monotonicity: negative amounts are refused (XP is never decremented by a
    legitimate event); amount 0 is a valid no-op bookkeeping call.
    """
    from sqlalchemy import select
    from sqlalchemy.exc import DBAPIError, SQLAlchemyError

    from backend.models.user import User

    amount = int(amount)
    if amount < 0:
        return {"awarded": False, "duplicate": False, "refused": "negative",
                "total_xp": None, "level": None}

    result = await db.execute(select(User).where(User.id == str(user_id)))
    user = result.scalar_one_or_none()
    if user is None:
        raise ValueError("User not found")

    # ── exactly-once gate (persistent, mirrors mastery_event_log) ──────
    if event_ref is not None:
        key = event_key(user_id, event, str(event_ref))
        try:
            from sqlalchemy import text

            await _ensure_tables(db)
            try:
                async with db.begin_nested():
                    await db.execute(
                        text(
                            "INSERT INTO reward_event_log "
                            "(event_key, user_id, event, event_ref, amount) "
                            "VALUES (:k, :u, :e, :r, :a)"
                        ),
                        {"k": key, "u": str(user_id)[:64], "e": event[:40],
                         "r": str(event_ref)[:190], "a": amount},
                    )
            except (DBAPIError, SQLAlchemyError) as exc:
                if any(sig in str(exc).upper() for sig in
                       ("UNIQUE", "DUPLICATE", "ON CONFLICT")):
                    return {"awarded": False, "duplicate": True,
                            "total_xp": int(user.total_xp or 0),
                            "level": level_for(user.total_xp)}
                raise
        except (DBAPIError, SQLAlchemyError):
            # The gate table itself is unavailable — availability over
            # exactly-once (same trade-off as the mastery ledger), said out loud.
            logger.warning("reward_event_log unavailable — award applied "
                           "without dedup for %s/%s", user_id, event)

    user.total_xp = (user.total_xp or 0) + amount
    user.current_level = level_for(user.total_xp)
    user.updated_at = datetime.now(timezone.utc)
    await db.flush()
    return {
        "awarded": True,
        "duplicate": False,
        "total_xp": int(user.total_xp or 0),
        "level": level_for(user.total_xp),
    }


async def update_streak(
    db: Any,
    user_id: str,
    *,
    today: Optional[date] = None,
) -> dict[str, Any]:
    """The ONLY writer of the streak columns (moved verbatim-in-spirit from
    ProgressService.update_streak, which now delegates here).

    Applies :func:`compute_streak` on the IST day boundary, moves freeze
    tokens (earn on each completed 5-day streak, spend on gap days), and
    upserts the ``streak_records`` row for the day. Returns a receipt with
    the new counter and what happened to the tokens.
    """
    from sqlalchemy import and_, select, text

    from backend.models.achievement import StreakRecord
    from backend.models.user import User

    day = today or student_today()

    result = await db.execute(select(User).where(User.id == str(user_id)))
    user = result.scalar_one_or_none()
    if user is None:
        raise ValueError("User not found")

    tokens = await get_freeze_tokens(db, user_id)
    outcome = compute_streak(
        user.streak_days, getattr(user, "last_activity_date", None), day,
        freeze_tokens=tokens,
    )

    # ── freeze token bookkeeping (best-effort: never break a submit) ──
    if outcome.tokens_used:
        try:
            await _ensure_tables(db)
            await db.execute(
                text(
                    "UPDATE streak_freezes SET tokens = CASE WHEN tokens >= :n "
                    "THEN tokens - :n ELSE 0 END, "
                    "updated_at = CURRENT_TIMESTAMP WHERE user_id = :u"
                ),
                {"n": outcome.tokens_used, "u": str(user_id)},
            )
        except Exception as exc:  # pragma: no cover - depends on store health
            logger.warning("freeze token spend failed for %s: %s", user_id, exc)
    if outcome.tokens_earned:
        try:
            await _ensure_tables(db)
            await db.execute(
                text(
                    "INSERT INTO streak_freezes (user_id, tokens) VALUES (:u, :n) "
                    "ON CONFLICT (user_id) DO UPDATE SET "
                    "tokens = streak_freezes.tokens + :n, "
                    "updated_at = CURRENT_TIMESTAMP"
                ),
                {"u": str(user_id), "n": outcome.tokens_earned},
            )
        except Exception as exc:  # pragma: no cover - depends on store health
            logger.warning("freeze token earn failed for %s: %s", user_id, exc)

    user.streak_days = outcome.streak_days
    user.last_activity_date = day

    # ── upsert the streak_records row for this IST day ──
    streak_result = await db.execute(
        select(StreakRecord).where(
            and_(
                StreakRecord.user_id == user_id,
                StreakRecord.date == day,
            )
        )
    )
    streak_rec = streak_result.scalar_one_or_none()
    if streak_rec is None:
        streak_rec = StreakRecord(
            user_id=user_id,
            date=day,
            completed=True,
            activities_count=1,
        )
        db.add(streak_rec)
    else:
        streak_rec.completed = True
        streak_rec.activities_count = (streak_rec.activities_count or 0) + 1

    await db.flush()
    return {
        "streak_days": outcome.streak_days,
        "froze": outcome.froze,
        "tokens_used": outcome.tokens_used,
        "tokens_earned": outcome.tokens_earned,
        "same_day": outcome.same_day,
        "day": day.isoformat(),
        "freeze_tokens_left": max(0, tokens - outcome.tokens_used),
    }


# ---------------------------------------------------------------------------
# Class facade — the import surface every caller uses
# ---------------------------------------------------------------------------
# progress_service (and every writer routed through it), tutor_service, the
# assignment/diagnostic surfaces and the dashboards import RewardLedger and
# call the class; the module-level functions above remain the direct, pure
# test surface. Both names are THE canonical service — one implementation.
class RewardLedger:
    """Canonical reward service facade (see module docstring)."""

    # day boundary + pure reward math
    IST = staticmethod(IST)
    student_today = staticmethod(student_today)
    to_ist = staticmethod(to_ist)
    XP_PER_LEVEL = XP_PER_LEVEL
    XP_CORRECT = XP_CORRECT
    XP_INCORRECT = XP_INCORRECT
    level_for = staticmethod(level_for)
    level_breakdown = staticmethod(level_breakdown)
    xp_for_answer = staticmethod(xp_for_answer)
    stars_for = staticmethod(stars_for)
    total_stars_for = staticmethod(total_stars_for)
    compute_streak = staticmethod(compute_streak)
    event_key = staticmethod(event_key)

    # DB-backed writers / reads
    award_xp = staticmethod(award_xp)
    update_streak = staticmethod(update_streak)
    get_freeze_tokens = staticmethod(get_freeze_tokens)
    _ensure_tables = staticmethod(_ensure_tables)
    reset_for_tests = staticmethod(reset_for_tests)
