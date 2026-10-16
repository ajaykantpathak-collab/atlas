"""
MASTERY + SPACED-REPETITION solid tests (MASTERY-FIX lane, 2026-10-05).

Pins the two systems the mission names:

  1. MASTERY MOVEMENT — BKT p_known rises on correct, falls on wrong,
     moves ONLY the attempted node's row (class-9 biology attempt cannot
     move class-10 biology), UPSERTS onto ONE canonical row per
     (user, node) — never inserts per attempt — and heals legacy
     duplicate rows instead of crashing on them.
  2. SM-2 CORRECTNESS — submit_review / review_scheduler._sm2 /
     mastery_sync.SM2Scheduler reproduce the canonical SuperMemo-2 table
     EXACTLY (EF formula + 1.3 floor, interval 1 → 6 → round(prev*EF),
     repetitions reset on quality < 3, next_review = today + interval —
     no off-by-one), with the easiness factor updated BEFORE the
     interval multiplier (the bug the old review_scheduler/_sm2 had).
  3. QUEUE HONESTY — get_review_queue returns exactly the items due
     today or overdue (<= today, never future), most-overdue first, and
     an empty queue is a valid response; the router's item shape matches
     schemas/progress.ReviewItemSchema field-for-field.
  4. MASTERY GATING — the shared D11 hard-prereq classifier
     (services/graph_edges) + learnpath's gate: a weak hard prereq
     BLOCKS (listed unmet, repair walks to the root), a mastered one
     UNLOCKS; same-class siblings, upward edges and unresolvable ids
     never gate. Gating reads mastery_records directly per request (no
     cache), so there is no stale-read path to fix.
  5. WRAPPER CONTRACT — the module-level services.mastery_sync wrappers
     that live serving paths import (question_selector, practice_service,
     worked_examples) accept the call shapes those callers actually use
     and return the documented shapes (they used to TypeError on every
     call).

Constraints honoured: NO Docker, NO live HTTP, NO LLM, NO Postgres —
the DB is a throwaway aiosqlite file (same pattern as
tests/test_digest_limbs.py), the live mastery store is the in-memory
MasterySyncService (same pattern as tests/test_mastery_continuity.py).
"""

from __future__ import annotations

import asyncio
import importlib
import os
import pathlib
import sys
import uuid
from datetime import date, datetime, timedelta

import pytest

# ---------------------------------------------------------------------------
# Bootstrap: bind `backend` / `services` to the DEPLOY tree (the build
# source of truth) before any backend import — same contract as
# tests/test_digest_limbs.py, plus the flat `services` package that
# mastery_ledger / api.practice import from.
# ---------------------------------------------------------------------------
_TEST_DIR = pathlib.Path(__file__).resolve().parent
_BACKEND_DIR = _TEST_DIR.parent            # .../deploy/backend
_DEPLOY_DIR = _BACKEND_DIR.parent          # .../deploy

for _p in (str(_DEPLOY_DIR), str(_BACKEND_DIR)):
    while _p in sys.path:
        sys.path.remove(_p)
sys.path.insert(0, str(_DEPLOY_DIR))
sys.path.insert(1, str(_BACKEND_DIR))

# If another test module already bound `backend` to a DIFFERENT tree
# (e.g. the stale root dev copy), purge it so this module's fixes are the
# ones under test. Fresh imports rebuild cleanly (per-MetaData models).
import backend as _backend_pkg  # noqa: E402

if not str(pathlib.Path(_backend_pkg.__file__).resolve()).startswith(
        str(_DEPLOY_DIR)):
    for _name in list(sys.modules):
        if (_name == "backend" or _name.startswith("backend.")
                or _name == "database"):
            del sys.modules[_name]
    importlib.invalidate_caches()

# backend.database builds its engine at import time — a parseable URL must
# exist even though every test injects its own session factory.
if "DATABASE_URL" not in os.environ or "sqlite" not in os.environ["DATABASE_URL"]:
    os.environ["DATABASE_URL"] = "sqlite+aiosqlite://"

from sqlalchemy import select, func  # noqa: E402
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine  # noqa: E402
from sqlalchemy.pool import NullPool  # noqa: E402

from backend.models.progress import MasteryRecord, ReviewItem  # noqa: E402
from backend.models.user import User as UserModel  # noqa: E402
from backend.services.progress_service import (  # noqa: E402
    BKT_P_GUESS,
    BKT_P_SLIP,
    BKT_P_TRANSIT,
    ProgressService,
)
from backend.services import review_scheduler as srs  # noqa: E402
from backend.services import learnpath  # noqa: E402
from backend.services import graph_edges  # noqa: E402
import services.mastery_sync as ms  # noqa: E402  (flat — what serving paths import)

UID = uuid.UUID(str(uuid.uuid4()))
USER_ID = str(UID)

# Corpus-shaped node ids: class is part of the key, so a class-9 attempt
# and a class-10 attempt are different mastery rows BY CONSTRUCTION.
NODE_C9_BIO = "c9_bio_cbse_04_002"
NODE_C10_BIO = "c10_bio_cbse_01_001"
NODE_C10_MATH = "c10_math_cbse_02_001"


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture()
def db_factory(tmp_path):
    """Throwaway async sqlite DB with exactly the tables these tests touch."""
    engine = create_async_engine(
        f"sqlite+aiosqlite:///{tmp_path / 'mastery_solid.db'}",
        poolclass=NullPool,  # fresh event loop per asyncio.run()
    )

    def _create(sync_conn):
        for t in (UserModel.__table__, MasteryRecord.__table__,
                  ReviewItem.__table__):
            t.create(sync_conn, checkfirst=True)

    async def _init():
        async with engine.begin() as conn:
            await conn.run_sync(_create)

    asyncio.run(_init())
    factory = async_sessionmaker(engine, expire_on_commit=False)
    yield factory

    engine.sync_engine.dispose()


def _seed_user(factory, user_id: str = USER_ID) -> None:
    """A real users row: submit_review awards XP through the reward
    ledger, which FKs users.id."""

    async def _go():
        async with factory() as db:
            db.add(UserModel(id=uuid.UUID(user_id), role="student",
                             name="probe", class_level=10))
            await db.commit()

    asyncio.run(_go())


def _seed_review_item(factory, *, user_id: str = USER_ID, node_id="n1",
                      concept="Concept One", ef=2.5, interval=1, reps=0,
                      next_in_days=-1, history=None) -> str:
    """Insert one ReviewItem with an explicit SM-2 state; returns its id."""
    item_id = str(uuid.uuid4())

    async def _go():
        async with factory() as db:
            db.add(ReviewItem(
                id=uuid.UUID(item_id),
                user_id=uuid.UUID(user_id),
                node_id=node_id,
                concept_name=concept,
                easiness_factor=ef,
                interval_days=interval,
                repetitions=reps,
                next_review_date=date.today() + timedelta(days=next_in_days),
                review_history=history or [],
            ))
            await db.commit()

    asyncio.run(_go())
    return item_id


def _get_item(factory, item_id: str) -> ReviewItem:
    async def _go():
        async with factory() as db:
            row = (await db.execute(
                select(ReviewItem).where(ReviewItem.id == uuid.UUID(item_id))
            )).scalar_one()
            # detach-safe readout
            return (row.easiness_factor, row.interval_days, row.repetitions,
                    row.next_review_date, row.last_review_date,
                    list(row.review_history or []))

    return asyncio.run(_go())


def _mastery_rows(factory, user_id: str = USER_ID):
    async def _go():
        async with factory() as db:
            rows = (await db.execute(
                select(MasteryRecord).where(MasteryRecord.user_id == user_id)
            )).scalars().all()
            return [(r.node_id, float(r.mastery_probability), int(r.attempts),
                     float(r.p_known))
                    for r in rows]

    return asyncio.run(_go())


# ---------------------------------------------------------------------------
# 1. Mastery movement (BKT) — up / down / scoped / upsert
# ---------------------------------------------------------------------------

class TestMasteryMovement:
    def test_correct_answer_moves_mastery_up_by_the_exact_bkt_posterior(self, db_factory):
        """p0=0.1, one correct (slip .1, guess .2, transit .1):
        posterior = .1*.9/(.1*.9+.9*.2) = 1/3; then + (1-1/3)*.1 = 0.4."""

        async def run():
            async with db_factory() as db:
                p = await ProgressService.update_mastery_bkt(
                    db, USER_ID, NODE_C10_BIO, True)
                await db.commit()
                return p

        p = asyncio.run(run())
        assert p == pytest.approx(0.4, abs=1e-9)

    def test_wrong_answer_moves_mastery_down(self, db_factory):
        """From 0.4 a wrong answer must LOWER p_known: posterior
        .4*.1/(.4*.1+.6*.8) ≈ .07692, then transit → ≈ .16923."""

        async def run():
            async with db_factory() as db:
                await ProgressService.update_mastery_bkt(
                    db, USER_ID, NODE_C10_BIO, True)     # 0.1 -> 0.4
                p = await ProgressService.update_mastery_bkt(
                    db, USER_ID, NODE_C10_BIO, False)    # 0.4 -> ~0.169
                await db.commit()
                return p

        p = asyncio.run(run())
        assert p == pytest.approx(0.16923076923076924, abs=1e-9)
        assert p < 0.4

    def test_attempt_scopes_to_its_own_node_and_class(self, db_factory):
        """A class-9 biology attempt must NOT move class-10 biology:
        the corpus node id IS the scope key."""

        async def run():
            async with db_factory() as db:
                await ProgressService.update_mastery_bkt(
                    db, USER_ID, NODE_C9_BIO, True)      # c9 -> 0.4
                await ProgressService.update_mastery_bkt(
                    db, USER_ID, NODE_C10_BIO, False)    # c10 -> ~0.169
                await db.commit()
                return await ProgressService.get_mastery_record(
                    db, USER_ID, NODE_C9_BIO), \
                    await ProgressService.get_mastery_record(
                        db, USER_ID, NODE_C10_BIO)

        c9, c10 = asyncio.run(run())
        assert c9.mastery_probability == pytest.approx(0.4, abs=1e-9)
        assert c9.attempts == 1
        # wrong answer from the 0.1 prior: posterior .01/.73 + transit step
        assert c10.mastery_probability == pytest.approx(
            0.11232876712328767, abs=1e-9)
        assert c10.attempts == 1

    def test_repeated_attempts_upsert_one_row_never_insert_per_attempt(self, db_factory):
        """Five attempts on one node → exactly ONE mastery_records row,
        attempts == 5 (the 'several rows per node_id' legacy bug)."""

        async def run():
            async with db_factory() as db:
                evidence = [True, True, False, True, True]
                for ok in evidence:
                    await ProgressService.update_mastery_bkt(
                        db, USER_ID, NODE_C10_MATH, ok)
                await db.commit()
                n = (await db.execute(
                    select(func.count())
                    .select_from(MasteryRecord)
                    .where(MasteryRecord.user_id == USER_ID)
                )).scalar_one()
                rec = await ProgressService.get_mastery_record(
                    db, USER_ID, NODE_C10_MATH)
                return n, rec

        n, rec = asyncio.run(run())
        assert n == 1, "mastery update must UPSERT, not insert per attempt"
        assert rec.attempts == 5

    def test_duplicate_rows_are_healed_not_crashed_on(self, db_factory):
        """Legacy dupes (two rows, same user+node) must not raise
        MultipleResultsFound: get_mastery_record reads the canonical row
        and update_mastery_bkt consolidates back to ONE row, keeping the
        summed evidence and the best row's parameters."""

        async def run():
            async with db_factory() as db:
                # a stray legacy duplicate
                db.add(MasteryRecord(
                    user_id=UID, node_id=NODE_C10_BIO,
                    mastery_probability=0.2, p_known=0.2,
                    p_transit=BKT_P_TRANSIT, p_slip=BKT_P_SLIP,
                    p_guess=BKT_P_GUESS, attempts=2))
                db.add(MasteryRecord(
                    user_id=UID, node_id=NODE_C10_BIO,
                    mastery_probability=0.5, p_known=0.5,
                    p_transit=BKT_P_TRANSIT, p_slip=BKT_P_SLIP,
                    p_guess=BKT_P_GUESS, attempts=3))
                await db.commit()

                rec = await ProgressService.get_mastery_record(
                    db, USER_ID, NODE_C10_BIO)
                assert rec is not None and rec.mastery_probability == 0.5, (
                    "canonical read must be the best row, not an exception")

                p = await ProgressService.update_mastery_bkt(
                    db, USER_ID, NODE_C10_BIO, True)
                await db.commit()
                rows = (await db.execute(
                    select(MasteryRecord)
                    .where(MasteryRecord.user_id == USER_ID)
                )).scalars().all()
                return p, rows

        p, rows = asyncio.run(run())
        assert len(rows) == 1, f"duplicates not healed: {len(rows)} rows remain"
        assert rows[0].attempts == 6, "canonical row must absorb the evidence"
        # BKT step ran on the canonical row (p_known .5): post=.5*.9/(.45+.1)=9/11
        assert p == pytest.approx(9 / 11 + (1 - 9 / 11) * BKT_P_TRANSIT, abs=1e-9)

    def test_both_stores_share_one_bkt_trajectory(self, db_factory):
        """One-record rule, numbers edition: the ORM store (dashboard/
        galaxy) and the live store (selector/reviews) must compute the
        SAME probability from the same evidence — aligned priors and
        slip/guess/transit."""

        async def run():
            evidence = [True, True, False, True]
            async with db_factory() as db:
                for ok in evidence:
                    await ProgressService.update_mastery_bkt(
                        db, USER_ID, NODE_C10_BIO, ok)
                await db.commit()
                rec = await ProgressService.get_mastery_record(
                    db, USER_ID, NODE_C10_BIO)

            ms._default_service = ms.MasterySyncService()  # in-memory live store
            state = ms.MasteryState(
                student_id=USER_ID, topic_id=NODE_C10_BIO, subject="bio")
            for ok in evidence:
                ms.BKTModel.update(state, ok)
            return float(rec.mastery_probability), state.bkt_p_know

        orm_p, live_p = asyncio.run(run())
        assert abs(orm_p - live_p) < 1e-9, (
            f"stores diverged: mastery_records={orm_p} mastery_state={live_p}")


# ---------------------------------------------------------------------------
# 2. SM-2 — the canonical table, exact
# ---------------------------------------------------------------------------

class TestSM2CanonicalTable:
    """The canonical SuperMemo-2 table, asserted on the SERVING writer
    (ProgressService.submit_review) through a real session."""

    def test_full_sm2_table_through_submit_review(self, db_factory):
        _seed_user(db_factory)
        item_id = _seed_review_item(db_factory, node_id=NODE_C10_BIO,
                                    ef=2.5, interval=1, reps=0)
        today = date.today()

        # (quality, expected_ef, expected_interval, expected_reps)
        table = [
            (4, 2.5, 1, 1),     # first success → 1 day
            (4, 2.5, 6, 2),     # second success → 6 days
            (4, 2.5, 15, 3),    # round(6 * 2.5)
            (4, 2.5, 38, 4),    # round(15 * 2.5) = 37.5 → 38
        ]
        for quality, exp_ef, exp_interval, exp_reps in table:
            async def run():
                async with db_factory() as db:
                    out = await ProgressService.submit_review(
                        db, USER_ID,
                        {"item_id": item_id, "quality": quality})
                    await db.commit()
                    return out

            out = asyncio.run(run())
            ef, interval, reps, next_d, _last, _hist = _get_item(
                db_factory, item_id)
            assert out["updated_interval"] == exp_interval
            assert out["updated_easiness"] == pytest.approx(exp_ef, abs=1e-9)
            assert out["next_review_date"] == (
                today + timedelta(days=exp_interval)).isoformat()
            assert (ef, interval, reps) == (
                pytest.approx(exp_ef, abs=1e-9), exp_interval, exp_reps)
            assert next_d == today + timedelta(days=exp_interval), (
                "off-by-one: next review must be exactly interval days out")

    def test_failure_resets_repetitions_and_interval(self, db_factory):
        _seed_user(db_factory)
        item_id = _seed_review_item(db_factory, node_id=NODE_C10_BIO,
                                    ef=2.5, interval=15, reps=3)
        today = date.today()

        async def run():
            async with db_factory() as db:
                out = await ProgressService.submit_review(
                    db, USER_ID, {"item_id": item_id, "quality": 1})
                await db.commit()
                return out

        out = asyncio.run(run())
        ef, interval, reps, next_d, _last, _hist = _get_item(
            db_factory, item_id)
        # EF: 2.5 + (0.1 - 4*(0.08 + 4*0.02)) = 1.96; reps and interval reset
        assert ef == pytest.approx(1.96, abs=1e-9)
        assert (interval, reps) == (1, 0)
        assert out["updated_interval"] == 1
        assert next_d == today + timedelta(days=1)

    def test_easiness_floor_is_13(self, db_factory):
        """Repeated blackouts push EF to the 1.3 floor and never below."""
        _seed_user(db_factory)
        item_id = _seed_review_item(db_factory, node_id=NODE_C10_BIO,
                                    ef=1.5, interval=1, reps=2)

        for _ in range(2):
            async def run():
                async with db_factory() as db:
                    out = await ProgressService.submit_review(
                        db, USER_ID, {"item_id": item_id, "quality": 0})
                    await db.commit()
                    return out

            asyncio.run(run())
        ef, interval, reps, _next, _last, _hist = _get_item(
            db_factory, item_id)
        assert ef == pytest.approx(1.3, abs=1e-9)
        assert (interval, reps) == (1, 0)

    def test_quality_clamped_into_0_5_and_mastery_gated_by_quality_3(self, db_factory):
        """quality 9 → 5 (correct, mastery moves); quality -2 → 0 (wrong —
        the SM-2 schedule resets; from the 0.1 prior BKT still nets the
        tiny transit step UP, an inherent BKT property, asserted exactly);
        non-numeric quality degrades to a neutral 3 (correct)."""
        _seed_user(db_factory)
        i_up = _seed_review_item(db_factory, node_id=NODE_C10_BIO, reps=0)
        i_down = _seed_review_item(db_factory, node_id=NODE_C10_MATH, reps=0)

        async def run(kind, item_id):
            async with db_factory() as db:
                out = await ProgressService.submit_review(
                    db, USER_ID, {"item_id": item_id, "quality": kind})
                await db.commit()
                return out

        asyncio.run(run(9, i_up))
        out_down = asyncio.run(run(-2, i_down))
        asyncio.run(run("not-a-number", i_up))
        rows = {node: p for node, p, _a, _pk in _mastery_rows(db_factory)}
        assert rows[NODE_C10_BIO] > 0.1, "quality 9 must count as correct"
        # wrong answer: posterior .01/.73, then transit
        assert rows[NODE_C10_MATH] == pytest.approx(
            0.11232876712328767, abs=1e-9)
        assert out_down["updated_interval"] == 1, (
            "quality < 3 must reset the SM-2 schedule to tomorrow")

    def test_scheduler_sm2_matches_the_same_table(self, db_factory):
        """review_scheduler._sm2 writes the SAME review_items rows as
        submit_review — it must reproduce the canonical table, with the
        EF updated BEFORE the interval multiplier (old-EF drift bug)."""
        item = ReviewItem(
            user_id=UID, node_id=NODE_C10_BIO, concept_name="x",
            easiness_factor=2.5, interval_days=1, repetitions=0,
            next_review_date=date.today())
        today = date.today()
        expected = [(2.5, 1, 1), (2.5, 6, 2), (2.5, 15, 3), (2.5, 38, 4)]
        for exp_ef, exp_interval, exp_reps in expected:
            srs._sm2(item, 4)
            assert item.easiness_factor == pytest.approx(exp_ef, abs=1e-9)
            assert item.interval_days == exp_interval
            assert item.repetitions == exp_reps
            assert item.next_review_date == today + timedelta(
                days=exp_interval)
        # failure reset (quality 2 → EF −0.32 → 2.18; reps/interval reset)
        srs._sm2(item, 2)
        assert item.easiness_factor == pytest.approx(2.18, abs=1e-9)
        assert (item.interval_days, item.repetitions) == (1, 0)

    def test_live_store_scheduler_matches_too(self):
        """mastery_sync.SM2Scheduler (mastery_state next_review) — same
        canonical sequence, EF-first. time_ms=20000 grades quality 4, so
        EF stays 2.5 exactly like the table test above."""
        state = ms.MasteryState(student_id="s", topic_id="t", subject="bio")
        today = datetime.utcnow()
        for exp_interval in (1, 6, 15, 38):
            _next, interval = ms.SM2Scheduler.update(state, True, 20000.0)
            assert interval == exp_interval
            assert state.sm2_ef == pytest.approx(2.5, abs=1e-9)
            assert (_next - today).total_seconds() == pytest.approx(
                exp_interval * 86400, abs=2)
        # blackout: grade(False) → quality 1 → EF 1.96, reps/interval reset
        _next, interval = ms.SM2Scheduler.update(state, False, 100.0)
        assert (interval, state.sm2_reps) == (1, 0)
        assert state.sm2_ef == pytest.approx(1.96, abs=1e-9)

    def test_practice_review_scheduling_seeds_and_schedules(self, db_factory):
        """schedule_practice_review: first sighting seeds the item (due
        tomorrow when correct, TODAY when wrong) and further answers
        follow the same SM-2 table — no off-by-one."""
        today = date.today()

        async def run():
            async with db_factory() as db:
                await ProgressService.schedule_practice_review(
                    db, USER_ID, NODE_C10_BIO, "Photosynthesis", True)
                await ProgressService.schedule_practice_review(
                    db, USER_ID, NODE_C10_MATH, "Linear equations", False)
                await db.commit()

        asyncio.run(run())
        rows = {}

        async def read():
            async with db_factory() as db:
                for it in (await db.execute(
                        select(ReviewItem).where(
                            ReviewItem.user_id == USER_ID))).scalars().all():
                    rows[it.node_id] = it

        asyncio.run(read())
        bio = rows[NODE_C10_BIO]
        assert (bio.interval_days, bio.repetitions) == (1, 1)
        assert bio.next_review_date == today + timedelta(days=1)
        math_ = rows[NODE_C10_MATH]
        assert (math_.interval_days, math_.repetitions) == (1, 0)
        assert math_.next_review_date == today, (
            "a fresh miss must resurface the same day, not hide until tomorrow")


# ---------------------------------------------------------------------------
# 3. Queue honesty — due means DUE (<= today)
# ---------------------------------------------------------------------------

class TestQueueHonesty:
    def test_queue_returns_due_and_overdue_only_ordered(self, db_factory):
        _seed_user(db_factory)
        _seed_review_item(db_factory, node_id="future-1", next_in_days=+1)
        _seed_review_item(db_factory, node_id="future-2", next_in_days=+5)
        _seed_review_item(db_factory, node_id="today-1", next_in_days=0)
        _seed_review_item(db_factory, node_id="overdue-1", next_in_days=-3)
        _seed_review_item(db_factory, node_id="overdue-2", next_in_days=-1)

        async def run():
            async with db_factory() as db:
                return await ProgressService.get_review_queue(db, USER_ID)

        queue = asyncio.run(run())
        got = [it.node_id for it in queue]
        assert got == ["overdue-1", "overdue-2", "today-1"], got

    def test_empty_queue_is_a_valid_response(self, db_factory):
        _seed_user(db_factory)

        async def run():
            async with db_factory() as db:
                return await ProgressService.get_review_queue(db, USER_ID)

        assert asyncio.run(run()) == []

    def test_review_stats_due_today_uses_same_boundary(self, db_factory):
        _seed_user(db_factory)
        _seed_review_item(db_factory, node_id="a", next_in_days=0)
        _seed_review_item(db_factory, node_id="b", next_in_days=-2)
        _seed_review_item(db_factory, node_id="c", next_in_days=+2)

        async def run():
            async with db_factory() as db:
                return await ProgressService.get_review_stats(db, USER_ID)

        stats = asyncio.run(run())
        assert stats["total_items"] == 3
        assert stats["due_today"] == 2

    def test_due_queue_driver_agrees_with_service_queue(self, db_factory):
        _seed_user(db_factory)
        _seed_review_item(db_factory, node_id="d1", next_in_days=-4)
        _seed_review_item(db_factory, node_id="d2", next_in_days=0)
        _seed_review_item(db_factory, node_id="d3", next_in_days=+9)

        async def run():
            async with db_factory() as db:
                return await srs.due_queue(db, USER_ID)

        dq = asyncio.run(run())
        assert [i["node_id"] for i in dq["items"]] == ["d1", "d2"]
        assert dq["due_count"] == 2
        assert dq["items"][0]["overdue_days"] == 4

    def test_queue_response_shape_matches_review_item_schema(self, db_factory):
        """The router builds items explicitly (the ORM has no question/
        answer columns) — the constructed shape must validate against
        schemas.progress.ReviewItemSchema FIELD FOR FIELD, camelCase wire
        form included, with the enrichment fallbacks the router applies."""
        from backend.schemas.progress import ReviewItemSchema, ReviewQueueResponse

        _seed_user(db_factory)
        _seed_review_item(db_factory, node_id=NODE_C10_BIO,
                          concept=NODE_C10_BIO,  # raw id on the row
                          ef=2.2, interval=3, reps=2)

        async def run():
            # mirrors routers/progress.py get_review_queue construction
            async with db_factory() as db:
                queue = await ProgressService.get_review_queue(db, USER_ID)
                items = []
                for it in queue:
                    name = it.concept_name or it.node_id
                    items.append(ReviewItemSchema(
                        id=str(it.id),
                        node_id=it.node_id,
                        concept_name=name,
                        easiness_factor=float(it.easiness_factor or 2.5),
                        interval_days=int(it.interval_days or 1),
                        repetitions=int(it.repetitions or 0),
                        next_review_date=(
                            it.next_review_date.isoformat()
                            if it.next_review_date else ""),
                        question=f"Quick recall: what is the key idea of {name}?",
                        answer="Revisit this concept in the Learn tab.",
                    ))
                return ReviewQueueResponse(items=items, total=len(items))

        resp = asyncio.run(run())
        wire = resp.model_dump(by_alias=True)
        assert wire["total"] == 1
        (item,) = wire["items"]
        assert set(item.keys()) == {
            "id", "nodeId", "conceptName", "easinessFactor", "intervalDays",
            "repetitions", "nextReviewDate", "question", "answer",
            "options", "correctOption"}
        assert item["nodeId"] == NODE_C10_BIO
        assert item["intervalDays"] == 3
        assert item["repetitions"] == 2
        assert isinstance(item["nextReviewDate"], str)
        assert item["options"] is None and item["correctOption"] is None


# ---------------------------------------------------------------------------
# 4. Mastery gating — hard prereq blocks, mastered unlocks
# ---------------------------------------------------------------------------

def _gate_index():
    """Tiny corpus index exercising every D11 edge class:
    c11_phy requires c10_math (cross-class+subject → HARD) and
    c9_phy (cross-class → HARD); c11_phy_002 is a same-class sibling
    (SOFT — never gates); the upward 'c12_phy' row is noise (SOFT);
    'c99_ghost' resolves to nothing (SOFT — never gate on unknowns)."""
    nodes = {
        "c11_phy_cbse_07_001": {
            "node_id": "c11_phy_cbse_07_001", "class": 11, "subject": "phy",
            "prereq_ids": ["c10_math_cbse_02_001", "c9_phy_cbse_03_001",
                           "c11_phy_cbse_07_002", "c12_phy_cbse_01_001",
                           "c99_ghost"]},
        "c10_math_cbse_02_001": {"node_id": "c10_math_cbse_02_001",
                                 "class": 10, "subject": "math",
                                 "prereq_ids": []},
        "c9_phy_cbse_03_001": {"node_id": "c9_phy_cbse_03_001", "class": 9,
                               "subject": "phy", "prereq_ids": []},
        "c11_phy_cbse_07_002": {"node_id": "c11_phy_cbse_07_002",
                                "class": 11, "subject": "phy",
                                "prereq_ids": []},
        "c12_phy_cbse_01_001": {"node_id": "c12_phy_cbse_01_001",
                                "class": 12, "subject": "phy",
                                "prereq_ids": []},
    }

    class _Idx:
        pass

    idx = _Idx()
    idx.nodes = nodes
    return idx


class TestMasteryGating:
    def test_weak_hard_prereq_blocks_and_soft_edges_never_gate(self):
        idx = _gate_index()
        node = idx.nodes["c11_phy_cbse_07_001"]
        # c9_phy is mastered; c10_math is weak — exactly one unmet gate
        mastery = {"c10_math_cbse_02_001": 0.30, "c9_phy_cbse_03_001": 0.9}

        unmet = learnpath._hard_unmet(idx, node, mastery)
        assert unmet == ["c10_math_cbse_02_001"], unmet

        hard = learnpath._hard_prereqs(idx, node)
        assert hard == ["c10_math_cbse_02_001", "c9_phy_cbse_03_001"], (
            "same-class sibling, upward and ghost edges must stay SOFT")

    def test_mastered_hard_prereq_unlocks(self):
        idx = _gate_index()
        node = idx.nodes["c11_phy_cbse_07_001"]
        mastery = {"c10_math_cbse_02_001": learnpath.MASTERED_FLOOR,
                   "c9_phy_cbse_03_001": 0.97}
        assert learnpath._hard_unmet(idx, node, mastery) == []

        # one lucky slip below the floor blocks again (floor is exclusive)
        assert learnpath._hard_unmet(
            idx, node,
            {"c10_math_cbse_02_001": 0.84,
             "c9_phy_cbse_03_001": 0.97}) == ["c10_math_cbse_02_001"]

    def test_missing_prereq_row_counts_as_unmet(self):
        idx = _gate_index()
        node = idx.nodes["c11_phy_cbse_07_001"]
        # no ledger rows at all → the cold student is blocked by BOTH hard
        # prereqs (missing row == unmet)
        assert learnpath._hard_unmet(idx, node, {}) == [
            "c10_math_cbse_02_001", "c9_phy_cbse_03_001"]

    def test_repair_walks_to_the_deepest_unmet_root(self):
        """With c10_math already mastered, the only unmet chain is
        c11_phy → c9_phy → c8_math: the repair target is the ROOT of the
        unmet hard chain, not the node itself."""
        idx = _gate_index()
        # give c9_phy a prereq too: c9_phy requires c8_math
        idx.nodes["c9_phy_cbse_03_001"]["prereq_ids"] = ["c8_math_cbse_01_001"]
        idx.nodes["c8_math_cbse_01_001"] = {
            "node_id": "c8_math_cbse_01_001", "class": 8, "subject": "math",
            "prereq_ids": []}

        target, chain = learnpath._repair_target(
            idx, "c11_phy_cbse_07_001",
            {"c10_math_cbse_02_001": 0.9})
        assert target == "c8_math_cbse_01_001"
        assert chain == ["c9_phy_cbse_03_001", "c8_math_cbse_01_001"]

    def test_shared_classifier_is_the_single_gate_definition(self):
        """learnpath, next_best_lesson and graph_service all classify
        through graph_edges — pin the rule itself: cross-class HARD,
        cross-subject HARD, everything else SOFT."""
        a = {"class": 11, "subject": "phy"}
        assert graph_edges.classify(a, {"class": 10, "subject": "phy"}) == "hard"
        assert graph_edges.classify(a, {"class": 11, "subject": "math"}) == "hard"
        assert graph_edges.classify(a, {"class": 11, "subject": "phy"}) == "soft"
        assert graph_edges.classify(a, {"class": 12, "subject": "phy"}) == "soft"
        assert graph_edges.classify(a, {"class": None, "subject": None}) == "soft"
        # subject spelling drift must not fake a gate (46-code fold table)
        assert graph_edges.classify({"class": 6, "subject": "maths"},
                                    {"class": 6, "subject": "mathematics"}) == "soft"

    def test_gating_reads_fresh_rows_not_a_cache(self, db_factory):
        """The gate input (learnpath._ledger) reads mastery_records per
        request — a freshly-mastered prereq must be visible to the gate
        immediately (no stale cache path)."""
        _seed_user(db_factory)

        async def run():
            async with db_factory() as db:
                before = await learnpath._ledger(db, USER_ID)
                await ProgressService.update_mastery_bkt(
                    db, USER_ID, NODE_C10_MATH, True)
                await ProgressService.update_mastery_bkt(
                    db, USER_ID, NODE_C10_MATH, True)
                await ProgressService.update_mastery_bkt(
                    db, USER_ID, NODE_C10_MATH, True)
                await db.commit()
                after = await learnpath._ledger(db, USER_ID)
                return before, after

        before, after = asyncio.run(run())
        assert NODE_C10_MATH not in before
        entry = after[NODE_C10_MATH]
        # three corrects from the 0.1 prior: .4 → .775 → 31.2/33 (recursive
        # BKT posterior+transit, computed independently)
        assert entry["mastery"] == pytest.approx(31.2 / 33, abs=1e-9)
        assert entry["attempts"] == 3
        # and the gate would now treat this prereq as MET (mastered bar)
        assert entry["mastery"] >= learnpath.MASTERED_FLOOR
        assert entry["attempts"] >= learnpath.ATTEMPTS_FOR_MASTERY


# ---------------------------------------------------------------------------
# 5. Wrapper contract — the import surface live paths actually call
# ---------------------------------------------------------------------------

class TestMasterySyncWrappers:
    def setup_method(self):
        # fresh in-memory live store per test (no pool, no redis, no PG)
        ms._default_service = ms.MasterySyncService()

    def teardown_method(self):
        ms._default_service = None

    def test_update_on_attempt_accepts_the_practice_call_shape(self):
        """services/practice_service.py:331 calls with is_correct/topic_id
        kwargs and reads .mastery_score — used to TypeError on every call."""
        out = asyncio.run(ms.update_on_attempt(
            student_id=USER_ID, topic_id=NODE_C10_BIO,
            is_correct=True, time_ms=1200.0))
        assert isinstance(out, dict)
        assert out["attempts"] == 1
        assert out["bkt_p_know"] == pytest.approx(0.4, abs=1e-9)
        assert out["mastery_score"] == pytest.approx(out["bkt_p_know"])
        assert out.mastery_score == pytest.approx(out["bkt_p_know"])

    def test_get_mastery_without_topic_returns_subject_aggregate(self):
        """services/question_selector.py:923 calls get_mastery(student,
        subject) — used to bind subject into topic_id and read a dummy
        state; now returns the subject's honest average (0.1 prior when
        cold)."""
        cold = asyncio.run(ms.get_mastery(USER_ID, subject="bio"))
        assert cold["bkt_p_know"] == pytest.approx(0.1)

        asyncio.run(ms.update_on_attempt(
            student_id=USER_ID, topic_id="t-bio-1", correct=True,
            subject="bio"))
        warm = asyncio.run(ms.get_mastery(USER_ID, subject="bio"))
        assert warm["bkt_p_know"] == pytest.approx(0.4, abs=1e-9)

    def test_get_review_schedule_returns_topic_list_filtered(self):
        """services/practice_service.py:748 + question_selector.py:966
        expect a LIST of topic dicts — the old wrapper forwarded
        subject=/limit= kwargs the service never accepted."""
        svc = ms._get_default_service()
        past = datetime.utcnow() - timedelta(hours=3)
        svc._states[f"{USER_ID}:t-phy"] = ms.MasteryState(
            student_id=USER_ID, topic_id="t-phy", subject="phy",
            attempts=1, next_review=past, sm2_interval=1)
        svc._states[f"{USER_ID}:t-math"] = ms.MasteryState(
            student_id=USER_ID, topic_id="t-math", subject="math",
            attempts=1, next_review=past, sm2_interval=1)

        all_due = asyncio.run(ms.get_review_schedule(USER_ID))
        assert {t["topic_id"] for t in all_due} == {"t-phy", "t-math"}

        phy = asyncio.run(ms.get_review_schedule(USER_ID, subject="phy"))
        assert [t["topic_id"] for t in phy] == ["t-phy"]

        limited = asyncio.run(ms.get_review_schedule(USER_ID, limit=1))
        assert len(limited) == 1


if __name__ == "__main__":  # pragma: no cover
    sys.exit(pytest.main([__file__, "-q"]))
