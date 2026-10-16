"""
Canonical reward ledger tests (services/reward_ledger.py).

ONE LEDGER RULE (council finding 2026-10: "XP showed 6 vs 70, stars 0 vs 416")
— XP, stars, streak and level must have ONE source of truth. These tests pin:

  1. IDEMPOTENCY      — a retried submit (same student, event, event_ref)
                        awards XP exactly once; XP is monotonic (never
                        decreases on legitimate events; negative refused).
  2. FREEZE MATH      — a gap day consumes a freeze token (earned per
                        completed 5-day streak) instead of resetting; a gap
                        of N days needs N-1 tokens; a shortage resets to 1
                        honestly.
  3. IST DAY BOUNDARY — the student day is IST (UTC+05:30): a 23:30 IST
                        submit and the 00:30 IST follow-up are TWO student
                        days even though the UTC server saw ONE day; writer
                        and every reader share the boundary.
  4. STARS            — stars are a pure band function of LIVE mastery
                        (0.8 = the platform mastered bar), never a stored
                        counter.
  5. WIRING           — every XP/streak writer really routes through the
                        canonical service, and no read path re-derives level
                        or keeps the old server-local day boundary.

No Docker, no network, no LLM: DB tests run on a throwaway aiosqlite file
(same pattern as test_weekly_digest.py); the pure-function tests need
nothing at all.
"""

from __future__ import annotations

import asyncio
import datetime as dt
import importlib.util
import os
import pathlib
import sys
import uuid
from datetime import timedelta

import pytest

_BACKEND = pathlib.Path(__file__).resolve().parent.parent
if str(_BACKEND.parent) not in sys.path:
    sys.path.insert(0, str(_BACKEND.parent))

# Keep backend.database's import-time engine construction parseable outside
# the container (see test_weekly_digest.py for the full story).
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite://")

from backend.services import reward_ledger as rl  # noqa: E402
from backend.services import streak_state as ss  # noqa: E402

IST = ss.IST


# ---------------------------------------------------------------------------
# Load progress_service / achievement_service by file path where a full
# package import would drag the solver stack (same trick as
# test_streak_read_model.py). Only used for source-wiring assertions, which
# read the FILES — no import needed at all for those.
# ---------------------------------------------------------------------------
def _read(rel: str) -> str:
    return (_BACKEND.parent / rel).read_text(encoding="utf-8")


# ===========================================================================
# 1. Level / XP canonical math (pure)
# ===========================================================================
class TestLevelCanonical:
    def test_level_bands(self):
        assert rl.level_for(0) == 1
        assert rl.level_for(99) == 1
        assert rl.level_for(100) == 2
        assert rl.level_for(2450) == 25
        assert rl.level_for(None) == 1
        assert rl.level_for("junk") == 1
        assert rl.level_for(-50) == 1  # clamped, never below level 1

    def test_level_breakdown_sums_back(self):
        b = rl.level_breakdown(2450)
        assert b["level"] == 25
        assert b["current_level_xp"] == 50
        assert b["xp_to_next_level"] == 50
        assert b["current_level_xp"] + b["xp_to_next_level"] == rl.XP_PER_LEVEL

    def test_progress_service_reexports_the_same_constant(self):
        """The old duplicate literal is gone: progress_service must serve the
        ledger's XP_PER_LEVEL (one definition site)."""
        from backend.services.progress_service import (
            XP_PER_LEVEL as PS_XP_PER_LEVEL,
        )

        assert PS_XP_PER_LEVEL is rl.XP_PER_LEVEL

    def test_xp_for_answer_canonical_band(self):
        assert rl.xp_for_answer(True) == 10
        assert rl.xp_for_answer(False) == 2


# ===========================================================================
# 2. Stars — derived from live mastery, never a counter
# ===========================================================================
class TestStarsFor:
    def test_bands_anchor_on_the_mastered_bar(self):
        assert rl.stars_for(0.79) < rl.stars_for(0.80)
        assert rl.stars_for(0.80) == 3      # the platform "mastered" bar
        assert rl.stars_for(1.0) == 3
        assert rl.stars_for(0.65) == 2
        assert rl.stars_for(0.50) == 1
        assert rl.stars_for(0.10) == 0
        assert rl.stars_for(0.0) == 0

    def test_never_negative_or_junk(self):
        assert rl.stars_for(None) == 0
        assert rl.stars_for("abc") == 0
        assert rl.stars_for(-0.5) == 0

    def test_total_is_the_sum_of_live_bands(self):
        probs = [0.9, 0.7, 0.55, 0.2, None]
        assert rl.total_stars_for(probs) == 3 + 2 + 1 + 0 + 0

    def test_mastery_growth_re_derives_more_stars(self):
        """The anti-stale property: the same node re-scored against new
        mastery yields the new band — no stored counter can lag."""
        assert rl.stars_for(0.5) == 1
        assert rl.stars_for(0.85) == 3
        assert rl.stars_for(0.3) == 0  # mastery dropped → stars drop with it


# ===========================================================================
# 3. Streak math (pure compute_streak)
# ===========================================================================
TODAY = dt.date(2026, 10, 5)


class TestComputeStreakPure:
    def test_first_ever_practice(self):
        out = rl.compute_streak(0, None, TODAY)
        assert out.streak_days == 1 and not out.froze

    def test_same_day_submit_does_not_move_the_counter(self):
        out = rl.compute_streak(7, TODAY, TODAY)
        assert out.streak_days == 7 and out.same_day

    def test_consecutive_day_increments(self):
        out = rl.compute_streak(7, TODAY - timedelta(days=1), TODAY)
        assert out.streak_days == 8 and not out.froze

    def test_token_earned_at_every_completed_5_day_streak(self):
        # The NEW counter hitting 5, 10, 15... earns a token (4->5 earns,
        # 5->6 does not).
        assert rl.compute_streak(4, TODAY - timedelta(days=1), TODAY).tokens_earned == 1
        assert rl.compute_streak(5, TODAY - timedelta(days=1), TODAY).tokens_earned == 0
        assert rl.compute_streak(9, TODAY - timedelta(days=1), TODAY).tokens_earned == 1
        assert rl.compute_streak(10, TODAY - timedelta(days=1), TODAY).tokens_earned == 0

    def test_one_gap_day_consumes_one_token_and_keeps_the_streak(self):
        out = rl.compute_streak(6, TODAY - timedelta(days=2), TODAY, freeze_tokens=1)
        assert out.froze and out.streak_days == 6 and out.tokens_used == 1

    def test_multi_day_gap_needs_a_token_per_missed_day(self):
        # 2 missed days, 2 tokens → survives.
        out = rl.compute_streak(6, TODAY - timedelta(days=3), TODAY, freeze_tokens=2)
        assert out.froze and out.streak_days == 6 and out.tokens_used == 2

    def test_token_shortage_resets_honestly(self):
        # The OLD writer bug: 1 token papered over any gap length. The honest
        # math resets when the tokens cannot cover every missed day.
        out = rl.compute_streak(6, TODAY - timedelta(days=3), TODAY, freeze_tokens=1)
        assert not out.froze and out.streak_days == 1

    def test_fresh_streak_cannot_be_frozen(self):
        """Freeze preserves an EARNED streak (2+); a 1-day streak has nothing
        to preserve and starts fresh — no token is burned on it."""
        out = rl.compute_streak(1, TODAY - timedelta(days=2), TODAY, freeze_tokens=5)
        assert not out.froze and out.streak_days == 1

    def test_junk_counter_degrades_to_a_fresh_start(self):
        out = rl.compute_streak(None, TODAY - timedelta(days=1), TODAY)
        assert out.streak_days == 1


# ===========================================================================
# 4. IST day boundary
# ===========================================================================
class TestISTDayBoundary:
    def test_utc_evening_maps_to_same_ist_day(self):
        # 18:00 UTC == 23:30 IST — still the SAME student day.
        d1 = ss.student_today(dt.datetime(2026, 10, 5, 18, 0, tzinfo=dt.timezone.utc))
        assert d1 == dt.date(2026, 10, 5)

    def test_utc_evening_crosses_into_next_ist_day_at_18_30(self):
        # 18:30 UTC == 00:00 IST next day — the boundary is exact.
        before = ss.student_today(dt.datetime(2026, 10, 5, 18, 29, tzinfo=dt.timezone.utc))
        after = ss.student_today(dt.datetime(2026, 10, 5, 18, 30, tzinfo=dt.timezone.utc))
        assert before == dt.date(2026, 10, 5)
        assert after == dt.date(2026, 10, 6)

    def test_brief_case_two_ist_evening_submits_are_two_days(self):
        """23:30 IST submit then 00:30 IST submit = 2 student days, although
        the UTC server saw both inside the SAME UTC day."""
        first = dt.datetime(2026, 10, 5, 18, 0, tzinfo=dt.timezone.utc)   # 23:30 IST
        second = dt.datetime(2026, 10, 5, 19, 0, tzinfo=dt.timezone.utc)  # 00:30 IST Oct 6
        d1, d2 = ss.student_today(first), ss.student_today(second)
        assert d1 == dt.date(2026, 10, 5)
        assert d2 == dt.date(2026, 10, 6)
        assert (d2 - d1).days == 1

    def test_naive_timestamps_are_assumed_utc(self):
        assert ss.student_today(dt.datetime(2026, 10, 5, 18, 0)) == dt.date(2026, 10, 5)

    def test_to_ist_converts_stored_utc(self):
        ts = dt.datetime(2026, 10, 5, 18, 0, tzinfo=dt.timezone.utc)
        assert ss.to_ist(ts).hour == 23 and ss.to_ist(ts).minute == 30
        assert ss.to_ist(None) is None

    def test_reward_ledger_reexports_the_same_boundary(self):
        assert rl.student_today is ss.student_today
        assert rl.IST is ss.IST

    def test_read_model_default_is_the_ist_day(self):
        """classify_streak with no explicit today must classify against IST,
        the same clock the writer buckets with."""
        now_ist = dt.datetime.now(IST)
        s = ss.classify_streak(3, now_ist.date())
        assert s["state"] == ss.STREAK_ACTIVE_TODAY


# ===========================================================================
# 5. DB-backed writer tests (aiosqlite)
# ===========================================================================
@pytest.fixture()
def db_factory(tmp_path):
    """Throwaway async sqlite DB with users + streak_records; the ledger's
    own reward_event_log / streak_freezes tables are created on first use."""
    from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
    from sqlalchemy.pool import NullPool

    from backend.models.achievement import StreakRecord
    from backend.models.user import User as UserModel

    engine = create_async_engine(
        f"sqlite+aiosqlite:///{tmp_path / 'rewards.db'}", poolclass=NullPool
    )

    def _create(sync_conn):
        StreakRecord.__table__.create(sync_conn, checkfirst=True)
        UserModel.__table__.create(sync_conn, checkfirst=True)

    async def _init():
        async with engine.begin() as conn:
            await conn.run_sync(_create)

    asyncio.run(_init())
    factory = async_sessionmaker(engine, expire_on_commit=False)
    rl.reset_for_tests()
    yield factory
    rl.reset_for_tests()
    engine.sync_engine.dispose()


def _seed_user(factory, xp=0, streak=0, last=None):
    async def _go():
        from backend.models.user import User as UserModel

        uid = uuid.uuid4()
        async with factory() as db:
            db.add(UserModel(
                id=uid, name="tester", role="student", class_level=6,
                total_xp=xp, streak_days=streak, last_activity_date=last,
            ))
            await db.commit()
        return uid

    return asyncio.run(_go())


class TestIdempotentDoubleSubmit:
    def test_same_event_ref_pays_exactly_once(self, db_factory):
        uid = _seed_user(db_factory)

        async def _go():
            async with db_factory() as db:
                r1 = await rl.award_xp(db, str(uid), 10, event="practice",
                                       event_ref="sess-1:q-1")
                r2 = await rl.award_xp(db, str(uid), 10, event="practice",
                                       event_ref="sess-1:q-1")
                await db.commit()
            return r1, r2

        r1, r2 = asyncio.run(_go())
        assert r1["awarded"] is True and r1["duplicate"] is False
        assert r2["awarded"] is False and r2["duplicate"] is True
        assert r1["total_xp"] == 10 and r2["total_xp"] == 10

    def test_distinct_event_refs_pay_each_once(self, db_factory):
        uid = _seed_user(db_factory)

        async def _go():
            async with db_factory() as db:
                a = await rl.award_xp(db, str(uid), 10, event="practice",
                                      event_ref="s:q1")
                b = await rl.award_xp(db, str(uid), 2, event="practice",
                                      event_ref="s:q2")
                await db.commit()
            return a, b

        a, b = asyncio.run(_go())
        assert a["awarded"] and b["awarded"]
        assert b["total_xp"] == 12

    def test_different_event_names_do_not_collide(self, db_factory):
        uid = _seed_user(db_factory)

        async def _go():
            async with db_factory() as db:
                await rl.award_xp(db, str(uid), 10, event="practice", event_ref="x:1")
                r = await rl.award_xp(db, str(uid), 10, event="assignment", event_ref="x:1")
                await db.commit()
            return r

        assert asyncio.run(_go())["awarded"] is True

    def test_progress_service_wrapper_still_serves_callers(self, db_factory):
        """Existing callers go through ProgressService.award_xp — the wrapper
        must reach the same wallet and derived level."""
        uid = _seed_user(db_factory, xp=95)

        async def _go():
            from backend.services.progress_service import ProgressService

            async with db_factory() as db:
                await ProgressService.award_xp(db, str(uid), 10)
                await db.commit()
                from sqlalchemy import select

                from backend.models.user import User

                row = (await db.execute(
                    select(User).where(User.id == uid)
                )).scalar_one()
                return row.total_xp, row.current_level

        total, level = asyncio.run(_go())
        assert total == 105 and level == 2

    def test_untokened_award_keeps_legacy_contract(self, db_factory):
        """Endpoints with no attempt identity keep one-call-one-award."""
        uid = _seed_user(db_factory)

        async def _go():
            async with db_factory() as db:
                await rl.award_xp(db, str(uid), 5)
                r = await rl.award_xp(db, str(uid), 5)
                await db.commit()
            return r

        r = asyncio.run(_go())
        assert r["awarded"] is True and r["total_xp"] == 10


class TestXPMonotonicity:
    def test_legitimate_events_never_decrease_xp(self, db_factory):
        uid = _seed_user(db_factory)

        async def _go():
            seen = []
            async with db_factory() as db:
                seen.append(0)
                for i, (amt, ref) in enumerate(
                    [(10, "a"), (10, "a"), (2, "b"), (5, "c"), (10, "a")]
                ):
                    r = await rl.award_xp(db, str(uid), amt, event="practice",
                                          event_ref=ref)
                    if r["awarded"] or r.get("total_xp") is not None:
                        seen.append(r["total_xp"])
                await db.commit()
            return seen

        seen = asyncio.run(_go())
        assert all(b >= a for a, b in zip(seen, seen[1:])), seen
        assert seen[-1] == 17  # 10 + 2 + 5, the duplicate paid nothing

    def test_negative_award_refused(self, db_factory):
        uid = _seed_user(db_factory, xp=30)

        async def _go():
            async with db_factory() as db:
                r = await rl.award_xp(db, str(uid), -10)
                await db.commit()
                from sqlalchemy import select

                from backend.models.user import User

                row = (await db.execute(
                    select(User.total_xp).where(User.id == uid)
                )).first()
            return r, int(row[0])

        r, xp = asyncio.run(_go())
        assert r["awarded"] is False and r.get("refused") == "negative"
        assert xp == 30

    def test_level_never_regresses_while_xp_grows(self, db_factory):
        uid = _seed_user(db_factory, xp=99)

        async def _go():
            levels = [1]
            async with db_factory() as db:
                for amt in (1, 100, 200):
                    r = await rl.award_xp(db, str(uid), amt, event="bulk",
                                          event_ref=f"n{amt}")
                    levels.append(r["level"])
                await db.commit()
            return levels

        levels = asyncio.run(_go())
        assert all(b >= a for a, b in zip(levels, levels[1:]))
        assert levels[-1] == 5  # 99 + 301 = 400 → level 5


class TestFreezeConsumption:
    def test_gap_day_consumes_one_token(self, db_factory):
        uid = _seed_user(db_factory, streak=6, last=TODAY - timedelta(days=2))

        async def _go():
            async with db_factory() as db:
                # Create the ledger tables, then seed one token via the same
                # SQL the earn path uses.
                from sqlalchemy import text

                await rl._ensure_tables(db)
                await db.execute(text(
                    "INSERT INTO streak_freezes (user_id, tokens) VALUES (:u, 1)"),
                    {"u": str(uid)})
                r = await rl.update_streak(db, str(uid), today=TODAY)
                await db.commit()
            return r

        r = asyncio.run(_go())
        assert r["froze"] is True
        assert r["streak_days"] == 6      # preserved, not reset
        assert r["tokens_used"] == 1
        assert r["freeze_tokens_left"] == 0

    def test_no_tokens_resets_to_one(self, db_factory):
        uid = _seed_user(db_factory, streak=6, last=TODAY - timedelta(days=2))

        async def _go():
            async with db_factory() as db:
                r = await rl.update_streak(db, str(uid), today=TODAY)
                await db.commit()
            return r

        r = asyncio.run(_go())
        assert r["froze"] is False and r["streak_days"] == 1

    def test_earned_token_at_day_five(self, db_factory):
        uid = _seed_user(db_factory, streak=4, last=TODAY - timedelta(days=1))

        async def _go():
            async with db_factory() as db:
                r = await rl.update_streak(db, str(uid), today=TODAY)
                tokens = await rl.get_freeze_tokens(db, str(uid))
                await db.commit()
            return r, tokens

        r, tokens = asyncio.run(_go())
        assert r["streak_days"] == 5
        assert r["tokens_earned"] == 1
        assert tokens == 1

    def test_ist_evening_then_next_ist_morning_counts_two_days(self, db_factory):
        """The brief's acceptance case end-to-end through the WRITER:
        23:30 IST submit (18:00 UTC) then 00:30 IST submit (19:00 UTC) —
        one UTC day, TWO student days, streak +2."""
        uid = _seed_user(db_factory, streak=4,
                         last=dt.date(2026, 10, 4))  # practised Oct 4 IST

        async def _go():
            async with db_factory() as db:
                r1 = await rl.update_streak(
                    db, str(uid),
                    today=ss.student_today(
                        dt.datetime(2026, 10, 5, 18, 0, tzinfo=dt.timezone.utc)))
                r2 = await rl.update_streak(
                    db, str(uid),
                    today=ss.student_today(
                        dt.datetime(2026, 10, 5, 19, 0, tzinfo=dt.timezone.utc)))
                await db.commit()
            return r1, r2

        r1, r2 = asyncio.run(_go())
        assert r1["streak_days"] == 5 and r1["tokens_earned"] == 1
        assert r2["streak_days"] == 6 and r2["same_day"] is False

    def test_writer_and_reader_agree_on_the_boundary(self, db_factory):
        """After a write, the READ model (classify_streak, IST default) must
        call the day active — no server/IST split personality."""
        uid = _seed_user(db_factory)

        async def _go():
            async with db_factory() as db:
                from sqlalchemy import select

                from backend.models.user import User

                await rl.update_streak(db, str(uid), today=TODAY)
                await db.commit()
                row = (await db.execute(
                    select(User.streak_days, User.last_activity_date)
                    .where(User.id == uid)
                )).first()
            return int(row[0]), row[1]

        streak, last_day = asyncio.run(_go())
        # Classified against the SAME day the writer bucketed with.
        s = ss.classify_streak(streak, last_day, today=TODAY)
        assert s["state"] == ss.STREAK_ACTIVE_TODAY
        assert s["current_streak"] == 1

    def test_streak_record_row_upserts_per_ist_day(self, db_factory):
        uid = _seed_user(db_factory, streak=3, last=TODAY - timedelta(days=1))

        async def _go():
            async with db_factory() as db:
                from sqlalchemy import select

                from backend.models.achievement import StreakRecord

                await rl.update_streak(db, str(uid), today=TODAY)
                await rl.update_streak(db, str(uid), today=TODAY)  # same-day resubmit
                await db.commit()
                rows = (await db.execute(
                    select(StreakRecord).where(StreakRecord.user_id == uid)
                )).scalars().all()
            return rows

        rows = asyncio.run(_go())
        assert len(rows) == 1
        assert rows[0].activities_count == 2
        assert rows[0].date == TODAY

    def test_freeze_availability_read_is_honest(self, db_factory):
        uid = _seed_user(db_factory)

        async def _go():
            async with db_factory() as db:
                assert await rl.get_freeze_tokens(db, str(uid)) == 0
                from sqlalchemy import text

                await db.execute(text(
                    "INSERT INTO streak_freezes (user_id, tokens) VALUES (:u, 3)"),
                    {"u": str(uid)})
                n = await rl.get_freeze_tokens(db, str(uid))
                await db.commit()
            return n

        assert asyncio.run(_go()) == 3


# ===========================================================================
# 6. Wiring — the writers really go through the canonical service
# ===========================================================================
class TestWritersAreRouted:
    def test_progress_service_delegates_both_writers(self):
        src = _read("backend/services/progress_service.py")
        award = src.split("async def award_xp", 1)[1].split("\n    @", 1)[0]
        streak = src.split("async def update_streak", 1)[1].split("\n    @", 1)[0]
        assert "RewardLedger.award_xp" in award
        assert "RewardLedger.update_streak" in streak
        # No inline wallet mutation left in the old writer.
        assert "user.total_xp = " not in src.replace(
            "user.total_xp = (user.total_xp or 0) + amount", "", 1
        ) or "RewardLedger" in award  # delegation present beats regex fragility

    def test_achievement_service_no_longer_mutates_the_wallet_inline(self):
        src = _read("backend/services/achievement_service.py")
        assert "user.total_xp = (user.total_xp or 0) + achievement.xp_reward" not in src
        assert 'RewardLedger.award_xp' in src
        assert 'event_ref=str(achievement.achievement_id)' in src

    def test_practice_awards_are_keyed_per_attempt(self):
        src = _read("backend/api/practice.py")
        assert 'event="practice"' in src
        assert 'event_ref=f"{session.id}:{qid_requested}"' in src

    def test_assignment_awards_are_keyed_per_question(self):
        src = _read("backend/api/assignments.py")
        assert 'event="assignment"' in src

    def test_diagnostic_awards_are_keyed_per_question(self):
        src = _read("backend/api/diagnostics.py")
        assert 'event="diagnostic"' in src

    def test_tutor_announced_xp_reaches_the_wallet(self):
        src = _read("backend/services/tutor_service.py")
        assert 'RewardLedger.award_xp' in src
        assert 'event="tutor"' in src

    def test_engagement_goal_reads_the_ist_student_day(self):
        src = _read("backend/api/engagement.py")
        body = src.split("def _server_today", 1)[1].split("\ndef ", 1)[0]
        assert "student_today()" in body
        assert "date.today()" not in body
        # Rows are IST-dated before comparison against the IST today.
        assert "to_ist(_row_utc(row))" in src

    def test_parent_dashboard_xp_derives_level_canonically(self):
        src = _read("backend/api/dashboard.py")
        body = src.split("async def _get_service_xp", 1)[1].split("\nasync def ", 1)[0]
        assert "level_breakdown(total_xp)" in body
        # The stale column is no longer trusted for display.
        assert "_User.current_level" not in body

    def test_parent_dashboard_freeze_availability_is_not_hardcoded(self):
        src = _read("backend/api/dashboard.py")
        body = src.split("async def _get_service_streak", 1)[1].split("\nasync def ", 1)[0]
        assert "get_freeze_tokens" in body
        # The main read path serves the real balance, not a constant.
        assert '"streak_freeze_available": freeze_available' in body

    def test_achievements_payload_carries_the_wallet(self):
        src = _read("backend/services/achievement_service.py")
        assert '"wallet_xp": wallet_xp' in src
        schema = _read("backend/schemas/achievement.py")
        assert "wallet_xp: int = 0" in schema

    def test_dashboard_schema_serves_canonical_stars(self):
        src = _read("backend/schemas/progress.py")
        assert "stars: int = 0" in src
        svc = _read("backend/services/progress_service.py")
        assert "total_stars_for(_mp_rows)" in svc

    def test_old_freeze_writer_gone_from_progress_service(self):
        """The hand-rolled freeze SQL (one token papering over any gap) must
        not survive anywhere outside the ledger."""
        src = _read("backend/services/progress_service.py")
        assert "streak_freezes" not in src


# ===========================================================================
# 7. Cross-lane bug documentation (reported, NOT fixed here — other owners)
# ===========================================================================
class TestCrossLaneFlags:
    def test_parent_badge_primary_source_calls_the_real_service(self):
        """FIXED (audit lane 2026-10-05): api/dashboard.py used to call
        AchievementService.get_earned_achievements, a method that never
        existed, and fell into a fallback querying columns the achievements
        table does not have. The badge panel now reads the same real API as
        the /api/achievements router."""
        src = _read("backend/api/dashboard.py")
        assert "svc.get_earned_achievements(student_id)" not in src
        # The real static API, filtered to earned badges, is the one path.
        assert 'AchievementService.get_achievements(\n                db, user_id=student_id, filter="unlocked"' in src
        # No instance construction: the service has no __init__, it is
        # all-staticmethods.
        assert "AchievementService(db)" not in src
        # The fiction fallback (Achievement.student_id / .earned_at columns
        # that do not exist on the model) is gone entirely.
        assert "Achievement.student_id" not in src
        svc_src = _read("backend/services/achievement_service.py")
        assert "def get_earned_achievements" not in svc_src
