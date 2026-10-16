"""
Mastery continuity tests (owner plan 2026-09).

"Lessons, simulations, practice, and junior games all contribute to the SAME
server-backed mastery record, with offline recovery and cross-device
continuity — TESTED."

What these tests pin:

  1. ONE RECORD RULE — every assessing surface routes through the mastery
     ledger (wiring), the ledger dual-writes BOTH server-backed stores
     (behaviour), and both stores compute IDENTICAL BKT trajectories from
     the same evidence (aligned priors + slip/guess/transit).
  2. OFFLINE RECOVERY — /api/sync/answer reconciles offline answers with a
     server-side re-grade, and the apply is exactly-once: a replayed flush
     (same payload token) can never double-count, even across a service
     restart (the dedup token is persisted in mastery_event_log).
  3. CROSS-DEVICE — server state written by one session is visible to a
     SECOND, independent session for the same user (the pytest-level
     equivalent of "device B sees device A's progress after login").
  4. SIMS STAY OUT (owner decision) — the sim-result path must NOT write
     mastery; junior games/lessons MUST.

Style note: like test_streak_read_model.py, this module is careful with
imports — pytest.ini disables faulthandler because importing the whole
backend graph can crash the interpreter on this box. The modules touched
here (mastery_ledger, progress_service, models) import cleanly; the live
mastery_state store is pinned to in-memory mode so no Postgres/Redis is
needed: DATABASE_URL is pointed at a sqlite DSN asyncpg can't dial.
"""

from __future__ import annotations

import asyncio
import importlib
import os
import pathlib
import sys
import uuid

import pytest

def _repo_root() -> pathlib.Path:
    """Locate the repo root from EITHER tree copy. parents[2] is only
    correct for backend/tests; from deploy/backend/tests it yields
    deploy/ and every wiring path below double-inflects. Walk up to the
    first ancestor that holds BOTH trees (byte-identity is asserted
    later, so either copy of the ledger proves the root)."""
    for cand in pathlib.Path(__file__).resolve().parents:
        if (
            (cand / "backend" / "services" / "mastery_ledger.py").exists()
            and (cand / "deploy" / "backend" / "services" / "mastery_ledger.py").exists()
        ):
            return cand
    return pathlib.Path(__file__).resolve().parents[2]


_ROOT = _repo_root()
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

# Hermetic live store: get_shared_service() will try to build an asyncpg
# pool from this DSN, fail fast (asyncpg speaks postgres only), and fall
# back to the in-memory BKT engine — no Postgres, no Redis, no Docker.
os.environ["DATABASE_URL"] = "sqlite+aiosqlite://"

from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine  # noqa: E402
from sqlalchemy.pool import StaticPool  # noqa: E402

from backend.database import Base  # noqa: E402
from backend.database import Attempt, PracticeSession  # noqa: E402
from backend.models.progress import MasteryRecord  # noqa: E402
from backend.services import mastery_ledger  # noqa: E402
from backend.services.mastery_ledger import (  # noqa: E402
    VALID_SOURCES,
    event_token,
    junior_node_key,
    read_unified_mastery,
    record_assessment,
    reset_for_tests,
)
from backend.services.progress_service import ProgressService  # noqa: E402

_BACKEND = _ROOT / "backend"
_DEPLOY_BACKEND = _ROOT / "deploy" / "backend"
_DEPLOY_FRONTEND = _ROOT / "deploy" / "frontend"

USER_ID = str(uuid.uuid4())  # a real user-shaped UUID, like the live API
NODE_A = "c10_bio_cbse_01_001"
NODE_B = "c10_bio_cbse_01_002"


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

def _make_engine():
    # StaticPool: one shared connection so separate AsyncSessions (the
    # "two devices") genuinely see each other's committed rows.
    return create_async_engine(
        "sqlite+aiosqlite://",
        poolclass=StaticPool,
        connect_args={"check_same_thread": False},
    )


@pytest.fixture()
def db_env():
    """Fresh sqlite DB with the ORM mastery table + a pinned in-memory
    live store. Yields an async_sessionmaker bound to that engine."""
    reset_for_tests()

    # Pre-seed the shared live service with no pool / no redis: pure
    # in-memory BKT (get_shared_service would otherwise retry pool creation
    # on every call — this keeps it quiet and deterministic).
    import services.mastery_sync as ms

    ms._default_service = ms.MasterySyncService()

    engine = _make_engine()

    async def _create():
        # practice_sessions carries a selectin-loaded `topics` relationship,
        # so its join tables must exist too or every session load raises and
        # _get_session_any silently reports "not found".
        needed = [
            MasteryRecord.__table__,
            PracticeSession.__table__,
            Attempt.__table__,
        ]
        needed += [
            Base.metadata.tables[t]
            for t in ("topics", "practice_session_topics")
            if t in Base.metadata.tables
        ]
        # the users parent table: mastery_ledger's FK-safe write probes for
        # a users row before writing mastery_records — without it every
        # write honestly skips and the whole continuity suite tests nothing
        users_tbl = Base.metadata.tables.get("users")
        if users_tbl is not None:
            needed.append(users_tbl)

        async with engine.begin() as conn:
            await conn.run_sync(
                lambda sync: Base.metadata.create_all(sync, tables=needed)
            )
        if users_tbl is not None:
            # seed the parent row for the user id the tests practice under
            import sqlalchemy as _sa

            async with engine.begin() as conn:
                ins = users_tbl.insert().values(
                    id=uuid.UUID(USER_ID), name="Continuity Student")
                await conn.execute(ins)

    asyncio.run(_create())
    maker = async_sessionmaker(engine, expire_on_commit=False)
    try:
        yield maker
    finally:
        reset_for_tests()

        async def _dispose():
            await engine.dispose()

        asyncio.run(_dispose())


# ---------------------------------------------------------------------------
# 1. One record rule — behaviour
# ---------------------------------------------------------------------------

class TestOneRecordBehaviour:
    def test_practice_write_lands_in_both_stores(self, db_env):
        """A practice verdict must update mastery_records (galaxy/dashboard)
        AND mastery_state (practice selector/reviews) — same keying, 0-1."""

        async def run():
            async with db_env() as db:
                out = await record_assessment(
                    db, user_id=USER_ID, node_id=NODE_A, is_correct=True,
                    source="practice", time_ms=4200.0, subject="bio",
                    client_token="prac:t1",
                )
                await db.commit()
                assert out["duplicate"] is False
                assert out["mastery"] is not None and 0.0 < out["mastery"] <= 1.0
                unified = await read_unified_mastery(db, USER_ID, NODE_A)
                return out, unified

        out, unified = asyncio.run(run())
        assert unified["orm"] is not None, "ORM store (galaxy/dashboard) missed the write"
        assert unified["orm"]["attempts"] == 1
        assert unified["live"] is not None, "live store (selector/reviews) missed the write"
        assert unified["live"]["attempts"] == 1

    def test_both_stores_compute_identical_bkt_trajectories(self, db_env):
        """Same evidence must produce the SAME probability in both stores —
        one-record rule is a property of the numbers, not just the keying.
        (Priors are aligned: p_known 0.1, guess 0.2, slip 0.1, transit 0.1.)"""

        async def run():
            async with db_env() as db:
                evidence = [True, True, False, True, True]  # mixed, like a real kid
                for i, ok in enumerate(evidence):
                    await record_assessment(
                        db, user_id=USER_ID, node_id=NODE_B, is_correct=ok,
                        source="practice", client_token=f"prac:traj:{i}",
                    )
                await db.commit()
                return await read_unified_mastery(db, USER_ID, NODE_B)

        unified = asyncio.run(run())
        orm_p = unified["orm"]["mastery_probability"]
        live_p = unified["live"]["bkt_p_know"]
        assert abs(orm_p - live_p) < 1e-6, (
            f"stores diverged: mastery_records={orm_p} vs mastery_state={live_p}"
        )
        assert unified["orm"]["attempts"] == unified["live"]["attempts"] == 5

    def test_unknown_source_is_refused(self, db_env):
        """Sims (or any unlisted source) must not sneak mastery writes in."""

        async def run():
            async with db_env() as db:
                return await record_assessment(
                    db, user_id=USER_ID, node_id=NODE_A, is_correct=True,
                    source="simulation",
                )

        out = asyncio.run(run())
        assert "refused" in (out.get("orm_error") or "")


# ---------------------------------------------------------------------------
# 2. Offline recovery — exactly-once replay
# ---------------------------------------------------------------------------

class TestOfflineReplay:
    def test_replayed_token_never_double_counts(self, db_env):
        """The offline queue can flush twice (retry, reconnect storm, two
        tabs). Same token => the observation applies EXACTLY ONCE."""

        async def run():
            token = event_token("offline", USER_ID, "sess-1", "q-1", 2, 1727500000.0)
            async with db_env() as db:
                first = await record_assessment(
                    db, user_id=USER_ID, node_id=NODE_A, is_correct=True,
                    source="practice_offline", client_token=token,
                )
                await db.commit()
                second = await record_assessment(
                    db, user_id=USER_ID, node_id=NODE_A, is_correct=True,
                    source="practice_offline", client_token=token,
                )
                await db.commit()
                rec = await ProgressService.get_mastery_record(db, USER_ID, NODE_A)
                unified = await read_unified_mastery(db, USER_ID, NODE_A)
                return first, second, rec, unified

        first, second, rec, unified = asyncio.run(run())
        assert first["duplicate"] is False
        assert second["duplicate"] is True, "replay was re-applied"
        assert second["mastery"] is None
        assert rec.attempts == 1, f"ORM double-counted: attempts={rec.attempts}"
        assert unified["live"]["attempts"] == 1, "live store double-counted"

    def test_dedup_survives_a_service_restart(self, db_env):
        """The dedup gate is the PERSISTED mastery_event_log row, not
        in-memory state: reset the process-local live service (what a
        backend restart does) and replay the same token — still exactly
        once. (In production mastery_state is a Postgres table, so its
        counters survive too; here the in-memory stand-in restarts by
        design and the assertion is on the gate + ORM store.)"""

        async def run():
            token = event_token("offline", USER_ID, "sess-2", "q-9", 1, 1727500100.0)
            async with db_env() as db:
                first = await record_assessment(
                    db, user_id=USER_ID, node_id=NODE_A, is_correct=False,
                    source="practice_offline", client_token=token,
                )
                await db.commit()
            reset_for_tests()  # simulate process restart (fresh live service)
            async with db_env() as db:
                replay = await record_assessment(
                    db, user_id=USER_ID, node_id=NODE_A, is_correct=False,
                    source="practice_offline", client_token=token,
                )
                await db.commit()
                rec = await ProgressService.get_mastery_record(db, USER_ID, NODE_A)
                return first, replay, rec

        first, replay, rec = asyncio.run(run())
        assert first["duplicate"] is False
        assert replay["duplicate"] is True, "dedup did not survive restart"
        assert rec.attempts == 1

    def test_different_answers_are_different_events(self, db_env):
        """A genuinely new observation (different question/answer/timestamp)
        must still apply — dedup is per-event, not per-node."""

        async def run():
            t1 = event_token("offline", USER_ID, "sess-3", "q-1", 0, 111.0)
            t2 = event_token("offline", USER_ID, "sess-3", "q-2", 3, 112.0)
            async with db_env() as db:
                a = await record_assessment(
                    db, user_id=USER_ID, node_id=NODE_A, is_correct=True,
                    source="practice_offline", client_token=t1,
                )
                b = await record_assessment(
                    db, user_id=USER_ID, node_id=NODE_A, is_correct=False,
                    source="practice_offline", client_token=t2,
                )
                await db.commit()
                rec = await ProgressService.get_mastery_record(db, USER_ID, NODE_A)
                return a, b, rec

        a, b, rec = asyncio.run(run())
        assert a["duplicate"] is False and b["duplicate"] is False
        assert rec.attempts == 2

    def test_sync_answer_endpoint_reconciles(self, db_env, monkeypatch):
        """/api/sync/answer must call the real reconciler — offline answers
        are re-graded and applied, not just logged."""
        import backend.api.student_sync as student_sync

        assert hasattr(student_sync, "sync_action")
        src = pathlib.Path(student_sync.__file__).read_text(encoding="utf-8")
        assert 'action_type == "answer"' in src, "answer actions are not routed"
        assert "apply_offline_answer" in src, "reconciler not wired"

    def test_offline_answer_end_to_end_regrades_server_side(self, db_env, monkeypatch):
        """Full offline path: queued answer (client's local isCorrect is a
        LIE) -> apply_offline_answer -> server re-grades -> mastery applied
        once -> attempt persisted -> replay is a duplicate."""
        import backend.api.practice as practice_api
        # NOTE: backend/api/practice.py uses FLAT imports ("from database
        # import ...") — the bootstrap in backend/__init__.py makes `database`
        # a distinct module object from `backend.database`. The applier reads
        # its session maker from the FLAT module, so that's the one to patch
        # and the one to seed through.
        import database as flat_db

        maker = db_env
        monkeypatch.setattr(flat_db, "async_session_maker", maker)

        qid = "q-offline-1"
        session_id = str(uuid.uuid4())
        question = {
            "id": qid,
            "question_id": qid,
            "text": "What is 7 x 8?",
            "options": ["54", "56", "58", "48"],
            "correct_answer": "56",
            "marks": 1,
            "node_id": NODE_A,
        }

        async def seed():
            async with maker() as db:
                db.add(flat_db.PracticeSession(
                    id=uuid.UUID(session_id),
                    student_id=uuid.UUID(USER_ID),
                    session_meta={
                        "status": "active",
                        "subject": "math",
                        "questions": {qid: question},
                        "current_question_id": qid,
                    },
                ))
                await db.commit()

        asyncio.run(seed())

        # Client answered offline and (no cache key) believed WRONG —
        # the server must grade 7x8=56 (option index 1) as CORRECT.
        payload = {
            "sessionId": session_id,
            "questionId": qid,
            "selectedIndex": 1,
            "isCorrect": False,          # client's local belief — ignored
            "timestamp": 1727500200.0,
        }

        async def run():
            first = await practice_api.apply_offline_answer(payload, USER_ID)
            replay = await practice_api.apply_offline_answer(payload, USER_ID)
            async with maker() as db:
                from sqlalchemy import select

                rec = await ProgressService.get_mastery_record(db, USER_ID, NODE_A)
                attempts = (
                    await db.execute(
                        select(flat_db.Attempt).where(
                            Attempt.session_id == session_id
                        )
                    )
                ).scalars().all()
            return first, replay, rec, attempts

        first, replay, rec, attempts = asyncio.run(run())
        assert first["ok"] is True and first["duplicate"] is False
        assert first["is_correct"] is True, "server did not re-grade the answer"
        assert replay["ok"] is True and replay["duplicate"] is True, "replay re-applied"
        assert rec is not None and rec.attempts == 1
        assert len(attempts) == 1, "attempt row duplicated on replay"


# ---------------------------------------------------------------------------
# 3. Cross-device continuity — server state, two sessions
# ---------------------------------------------------------------------------

class TestCrossDevice:
    def test_progress_visible_to_independent_session(self, db_env):
        """Device A practises; device B (a BRAND NEW session — the login +
        refresh path) must see the exact same server-backed record."""

        async def run():
            async with db_env() as device_a:
                await record_assessment(
                    device_a, user_id=USER_ID, node_id=NODE_A, is_correct=True,
                    source="practice", client_token="prac:xa:1",
                )
                await record_assessment(
                    device_a, user_id=USER_ID, node_id=NODE_A, is_correct=True,
                    source="practice", client_token="prac:xa:2",
                )
                await device_a.commit()

            # Device B: fresh session, fresh login — reads, never writes.
            async with db_env() as device_b:
                rec = await ProgressService.get_mastery_record(
                    device_b, USER_ID, NODE_A
                )
                rows = await ProgressService.get_all_mastery_records(
                    device_b, USER_ID
                )
                unified = await read_unified_mastery(device_b, USER_ID, NODE_A)
            return rec, rows, unified

        rec, rows, unified = asyncio.run(run())
        assert rec is not None, "device B saw no mastery record"
        assert rec.attempts == 2
        assert 0.0 < rec.mastery_probability <= 1.0
        node_rows = {r["node_id"]: r for r in rows}
        assert NODE_A in node_rows, "galaxy feed (mastery/all) missed the node"
        assert node_rows[NODE_A]["attempts"] == 2
        # and the live store agrees — one record, two stores, any device
        assert abs(unified["live"]["bkt_p_know"] - rec.mastery_probability) < 1e-6

    def test_junior_namespacing_keeps_one_record_shape(self, db_env):
        """Junior games key under junior::<game> with the SAME 0-1 BKT
        semantics — same row shape, no corpus-id collision."""

        async def run():
            key = junior_node_key("counting_cats")
            async with db_env() as db:
                out = await record_assessment(
                    db, user_id=USER_ID, node_id=key, is_correct=True,
                    source="junior_game", client_token="jgame:t1",
                )
                await db.commit()
                rec = await ProgressService.get_mastery_record(db, USER_ID, key)
            return out, rec

        out, rec = asyncio.run(run())
        assert out["duplicate"] is False
        assert rec is not None and 0.0 < rec.mastery_probability <= 1.0
        assert rec.node_id.startswith("junior::")


# ---------------------------------------------------------------------------
# 4. Wiring — every assessing surface routes through the ledger
# ---------------------------------------------------------------------------

def _read(p: pathlib.Path) -> str:
    return p.read_text(encoding="utf-8")


class TestWiring:
    def test_practice_submits_through_ledger(self):
        src = _read(_BACKEND / "api" / "practice.py")
        assert 'source="practice"' in src
        assert "client_token=f\"prac:" in src, "practice apply not exactly-once"
        # the real replay guard (the old one queried a non-existent column)
        assert "Attempt.question_seed == qid_requested" in src
        assert "_replay" in src
        # the live path no longer writes mastery_state directly
        assert "await sync.update_on_attempt(" not in src, (
            "practice bypasses the ledger"
        )
        # and deploy is in lockstep (house rule: byte-identical trees)
        assert _read(_DEPLOY_BACKEND / "api" / "practice.py") == src

    def test_offline_applier_uses_ledger(self):
        src = _read(_BACKEND / "api" / "practice.py")
        assert 'source="practice_offline"' in src
        assert _read(_DEPLOY_BACKEND / "api" / "practice.py") == src

    def test_diagnostics_feed_the_record(self):
        src = _read(_BACKEND / "services" / "diagnostic_service.py")
        assert 'source="diagnostic"' in src
        assert 'client_token=f"diag:' in src, "diagnostic apply not exactly-once"
        assert _read(_DEPLOY_BACKEND / "services" / "diagnostic_service.py") == src

    def test_chapter_tests_and_assignments_feed_the_record(self):
        ct = _read(_BACKEND / "api" / "chapter_tests.py")
        assert 'source="chapter_test"' in ct
        assert "await sync.update_on_attempt(" not in ct
        asg = _read(_BACKEND / "api" / "assignments.py")
        assert 'source="assignment"' in asg
        assert "await sync.update_on_attempt(" not in asg
        assert _read(_DEPLOY_BACKEND / "api" / "chapter_tests.py") == ct
        assert _read(_DEPLOY_BACKEND / "api" / "assignments.py") == asg

    def test_junior_games_write_mastery(self):
        src = _read(_BACKEND / "routers" / "progress.py")
        assert 'source="junior_game"' in src
        assert "junior_node_key" in src
        assert _read(_DEPLOY_BACKEND / "routers" / "progress.py") == src

    def test_junior_lessons_bridge_is_alive(self):
        src = _read(_BACKEND / "services" / "junior_service.py")
        assert "self._mastery.increment(" not in src, (
            "junior bridge still calls the non-existent BKTModel.increment"
        )
        assert 'source="junior_lesson"' in src
        assert _read(_DEPLOY_BACKEND / "services" / "junior_service.py") == src

    def test_quiz_and_exam_feeds_the_record(self):
        """Quiz + exam answering surfaces route through the ledger too —
        a bare update_mastery_bkt() there wrote ONLY mastery_records and
        left mastery_state (practice selector/reviews) behind."""
        src = _read(_BACKEND / "services" / "assessment_service.py")
        assert 'source="quiz"' in src
        assert 'source="exam"' in src
        assert "record_assessment(" in src
        assert "update_mastery_bkt(" not in src, (
            "quiz/exam still writes a mastery store directly"
        )
        assert _read(_DEPLOY_BACKEND / "services" / "assessment_service.py") == src

    def test_sims_stay_out_of_mastery(self):
        """OWNER DECISION (2026-09): sims are exploration, not assessment."""
        src = _read(_BACKEND / "routers" / "progress.py")
        sim_block = src[src.index("def record_sim_result"):src.index("class GameResultRequest")]
        assert "update_mastery_bkt(" not in sim_block, (
            "sim-result still writes mastery"
        )
        assert "await record_assessment(" not in sim_block
        assert "EXPLORATION" in sim_block.upper(), "decision not documented in code"
        # and no sim source exists in the ledger's allowlist
        assert not any("sim" in s for s in VALID_SOURCES)
        ledger_doc = mastery_ledger.__doc__ or ""
        assert "SIMULATIONS STAY OUT" in ledger_doc

    def test_sims_wiring_is_not_resurrected_elsewhere(self):
        """The client sims path (masteryStore -> /sim-result) and any other
        sim surface must not gain a back-door mastery write."""
        ledger_src = _read(_BACKEND / "services" / "mastery_ledger.py")
        assert "simulation" not in mastery_ledger.VALID_SOURCES
        assert ledger_src.count("VALID_SOURCES") >= 1

    def test_trees_are_byte_identical(self):
        """House rule: deploy/backend must match backend for every file this
        wave touched (plus the new ledger)."""
        files = [
            "services/mastery_ledger.py",
            "services/mastery_sync.py",
            "services/progress_service.py",
            "services/junior_service.py",
            "services/diagnostic_service.py",
            "services/assessment_service.py",
            "api/practice.py",
            "api/student_sync.py",
            "api/chapter_tests.py",
            "api/assignments.py",
            "routers/progress.py",
        ]
        for rel in files:
            assert _read(_DEPLOY_BACKEND / rel) == _read(_BACKEND / rel), rel

    def test_play_page_sends_client_ts(self):
        src = _read(_DEPLOY_FRONTEND / "app" / "play" / "page.tsx")
        assert "clientTs" in src, (
            "junior game posts without a replay token"
        )


# ---------------------------------------------------------------------------
# 5. Ledger API hygiene
# ---------------------------------------------------------------------------

class TestLedgerHygiene:
    def test_event_token_is_deterministic_and_discriminating(self):
        a = event_token("offline", "u1", "s1", "q1", 2, 1727500000.0)
        b = event_token("offline", "u1", "s1", "q1", 2, 1727500000.0)
        c = event_token("offline", "u1", "s1", "q1", 3, 1727500000.0)
        d = event_token("offline", "u1", "s1", "q1", 2, 1727500001.0)
        assert a == b
        assert a != c and a != d
        assert len(a) <= 64  # fits the mastery_event_log column

    def test_every_assessing_source_is_admitted(self):
        required = {
            "practice", "practice_offline", "diagnostic", "chapter_test",
            "assignment", "quiz", "exam", "review",
            "junior_game", "junior_lesson",
        }
        assert required <= VALID_SOURCES
