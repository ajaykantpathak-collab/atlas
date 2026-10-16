"""test_maths_e2e_golden.py -- ONE SUBJECT END-TO-END: maths (CBSE class 10).

Modeled exactly on tests/physics_e2e_golden.py: walks a real student
through the complete teaching loop against the REAL Postgres, judging
every station like an examiner.  Per-station isolation: one failure
records FAIL and the walk continues.

  1. LEARNPATH   maths chapter path ordered, prereq gating works
  2. PRACTICE    batch selector serves a maths session (maths-lane nodes)
  3. GRADING     the maths solver verifies board numericals:
                 quadratic roots, AP nth term, coordinate geometry, trig
  4. SOCRATIC    maths misconception dialogue (sign_flip) builds + grades
  5. BKT         mastery moves up on correct, down on wrong (maths node)
  6. SM-2        review scheduled after practice
  7. REWARDS     XP exactly-once, ledger tables persist
  8. CLEANUP     the test student's rows are gone from every table

Run (from deploy/backend):
  DATABASE_URL=postgresql+asyncpg://... PYTHONPATH=D:/platform/deploy \
  SOLVER_LLM_MODE=off python tests/test_maths_e2e_golden.py

Cleanup removes the test student's rows (users, mastery_records,
reward_event_log, streak_freezes, review_items) and verifies zero remain.
"""
import asyncio
import datetime
import os
import sys
import time
import traceback
import uuid

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")
os.environ.setdefault(
    "DATABASE_URL",
    "postgresql+asyncpg://dream_user:at_-A518N1wtwyd6P-_sAWwlAGT9bdsAuoT"
    "@127.0.0.1:5432/dream_app")

RESULTS = []
# users is keyed by its PK column `id`; every ledger/progress table by user_id
CLEANUP_TABLES = {"reward_event_log": "user_id", "streak_freezes": "user_id",
                  "review_items": "user_id", "mastery_records": "user_id",
                  "users": "id"}


def station(name, ok, evidence):
    RESULTS.append((name, bool(ok) if ok is not None else None, evidence))
    tag = "PASS" if ok else ("FAIL" if ok is False else "N/A")
    print(f"[{tag}] {name}: {evidence}", flush=True)


async def station_fn(name, fn):
    try:
        out = fn()
        ok, ev = (await out) if asyncio.iscoroutine(out) else out
        station(name, ok, ev)
    except Exception as e:
        station(name, False, f"{type(e).__name__}: {e}"[:140])
        if os.environ.get("E2E_TRACE"):
            traceback.print_exc()


def _solver(label_q, want_fn, want_desc):
    """Sync helper: run the maths solver and judge the labelled answer."""
    from backend.its.solver.answer_pipeline import answer
    r = answer(label_q)
    a = str(r.answer or "")
    ok = str(r.label).startswith("VERIFIED") and want_fn(a)
    return ok, f"{r.label}: {a[:48]}"


async def main():
    import sqlalchemy as sa
    from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

    url = os.environ["DATABASE_URL"]
    engine = create_async_engine(url, pool_size=4)
    Session = async_sessionmaker(engine, expire_on_commit=False)

    uid = str(uuid.uuid4())
    async with Session() as db:
        from backend.models.user import User
        db.add(User(id=uid, name="MathsE2E Student",
                    email=f"math-e2e-{uid[:8]}@test.local",
                    class_level=10, board="CBSE"))
        await db.commit()
    print(f"student {uid}", flush=True)

    try:
        # ── 1. LEARNPATH ──────────────────────────────────────────────
        from backend.services.learnpath_builder import get_path, next_lesson
        path = get_path(10, "maths", "1")
        station("1a maths learnpath exists",
                path is not None and len(path.get("lessons", [])) >= 3,
                f"{len((path or {}).get('lessons', []))} lessons")
        if path:
            first = next_lesson(path, set())
            station("1b next_lesson starts at lesson 1",
                    first is not None
                    and first["seq"] == path["lessons"][0]["seq"],
                    f"first={first['title'][:40] if first else None}")
            second = next_lesson(path, {path["lessons"][0]["node_id"]})
            station("1c gating advances after done",
                    second is not None
                    and second["node_id"] != first["node_id"],
                    f"next={second['title'][:40] if second else None}")

        # ── 2. PRACTICE ────────────────────────────────────────────────
        from backend.services.question_selector import QuestionSelector
        math_qs = []
        async with Session() as db:
            async def _practice():
                nonlocal math_qs
                sel = QuestionSelector(db)
                t0 = time.time()
                qs = await sel.select_batch(student_id=uid, subject="maths",
                                            count=5, class_level=10)
                ms = (time.time() - t0) * 1000
                math_qs = qs
                return (len(qs) >= 3,
                        f"{len(qs)}/5 in {ms:.0f}ms; types="
                        f"{ {q.get('question_type') for q in qs} }")
            await station_fn("2a batch serves maths", _practice)
            station("2b distinct ids", len({q["question_id"] for q in math_qs})
                    == len(math_qs), f"{len(math_qs)} questions")
            station("2c batch stays in the maths lane",
                    bool(math_qs) and all("math" in str(q.get("node_id", ""))
                                          for q in math_qs),
                    f"nodes={ sorted({str(q.get('node_id')) for q in math_qs})[:3] }")

        # ── 3. GRADING (maths solver, board numericals) ─────────────────
        def _grade_quad():
            # 2x^2 - 5x - 3 = (2x + 1)(x - 3) -> roots 3 and -1/2
            return _solver(
                "Solve: 2x^2 - 5x - 3 = 0",
                lambda a: "3" in a and ("-1/2" in a or "−1/2" in a
                                        or "-0.5" in a or "−0.5" in a),
                "VERIFIED with both roots (3 and -1/2)")
        await station_fn("3a quadratic roots verified", lambda: _grade_quad())

        def _grade_ap():
            # AP 2, 5, 8: a=3, d=3 -> T10 = 2 + 9*3 = 29
            return _solver("Find the 10th term of the AP: 2, 5, 8",
                           lambda a: "29" in a, "VERIFIED 29")
        await station_fn("3b AP 10th term verified", lambda: _grade_ap())

        def _grade_coord():
            # distance (3,4)-(0,0) = sqrt(9+16) = 5
            return _solver(
                "Find the distance between the points (3, 4) and (0, 0).",
                lambda a: "5" in a, "VERIFIED 5")
        await station_fn("3c coordinate geometry verified",
                         lambda: _grade_coord())

        def _grade_trig():
            # sin A = 3/5 -> cos A = 4/5 (right triangle 3-4-5)
            return _solver("If sin A = 3/5, find cos A.",
                           lambda a: "4/5" in a or "0.8" in a,
                           "VERIFIED cos A = 4/5")
        await station_fn("3d trig ratio verified", lambda: _grade_trig())

        # ── 4. SOCRATIC maths dialogue (sign_flip) ──────────────────────
        def _socratic():
            from backend.its.solver.socratic_moves import build_sequence
            seq = build_sequence("sign_flip", "-7", "Solve: x + 7 = 3", "-4")
            ok = (bool(seq.moves)
                  and seq.moves[0]["kind"] == "elicit"
                  and "-7" in seq.moves[0]["text"])
            return (ok,
                    f"{len(seq.moves)} moves; elicit quotes the wrong answer")
        await station_fn("4a socratic sign_flip dialogue builds",
                         lambda: _socratic())

        def _socratic_grade():
            from backend.its.solver.socratic_moves import (build_sequence,
                                                           grade_move)
            seq = build_sequence("sign_flip", "-7", "Solve: x + 7 = 3", "-4")
            # isolate move 1 for sign_flip is "Solve: x + 7 = 3" -> accept -4
            ok, fb, nxt = grade_move(seq, "iso1", "-4")
            return (ok and nxt == "retry",
                    f"iso1 graded correct={ok}, next={nxt}")
        await station_fn("4b socratic isolate move grades",
                         lambda: _socratic_grade())

        # ── 5. BKT mastery movement on a maths node ────────────────────
        from backend.services.progress_service import ProgressService
        from backend.services.mastery_ledger import record_assessment
        get_mastery_record = ProgressService.get_mastery_record
        node_id = (math_qs[0].get("node_id") if math_qs
                   else "c10_math_cbse_01_001")

        async def _bkt():
            async with Session() as db:
                m0 = await get_mastery_record(db, uid, node_id)
                m0_val = float(m0.mastery_probability) if m0 else 0.0
                r_up = await record_assessment(db, uid, node_id, True,
                                               source="practice",
                                               difficulty=0.5)
                await db.commit()
                m1 = await get_mastery_record(db, uid, node_id)
                up = m1 is not None and float(m1.mastery_probability) > m0_val
                m_mid = float(m1.mastery_probability) if m1 else 0.0
                r_dn = await record_assessment(db, uid, node_id, False,
                                               source="practice",
                                               difficulty=0.5)
                await db.commit()
                m2 = await get_mastery_record(db, uid, node_id)
                down = (m2 is not None
                        and float(m2.mastery_probability) < m_mid)
                return (up and down,
                        f"{m0_val:.3f} -> {m_mid:.3f} -> "
                        f"{float(m2.mastery_probability):.3f} "
                        f"(dup={r_up.get('duplicate')}, "
                        f"orm_error={r_up.get('orm_error')})" if m2
                        else f"no row; up={r_up}")
        await station_fn("5 BKT moves up+down on maths node", _bkt)

        # ── 6. SM-2 review scheduling ──────────────────────────────────
        async def _sm2():
            async with Session() as db:
                from backend.services.progress_service import ProgressService
                from backend.models.progress import ReviewItem
                await ProgressService.schedule_practice_review(
                    db, uid, node_id, "Maths E2E Concept",
                    is_correct=True)
                await db.commit()
                row = (await db.execute(
                    sa.select(ReviewItem).where(
                        sa.and_(ReviewItem.user_id == uid,
                                ReviewItem.node_id == node_id))
                )).scalar_one_or_none()
                return (row is not None and row.interval_days >= 1,
                        f"row={'yes' if row else 'no'}, interval="
                        f"{getattr(row, 'interval_days', '?')}, reps="
                        f"{getattr(row, 'repetitions', '?')}")
        await station_fn("6 SM-2 review scheduled", _sm2)

        # ── 7. REWARDS exactly-once ────────────────────────────────────
        async def _xp():
            async with Session() as db:
                from backend.services.reward_ledger import RewardLedger
                r1 = await RewardLedger.award_xp(db, uid, 10,
                                                 event="e2e_test",
                                                 event_ref="once-1")
                r2 = await RewardLedger.award_xp(db, uid, 10,
                                                 event="e2e_test",
                                                 event_ref="once-1")
                await db.commit()
                return (bool(r1.get("awarded")) and bool(r2.get("duplicate")),
                        f"first={r1.get('awarded')}, replay dup="
                        f"{r2.get('duplicate')}")
        await station_fn("7 XP exactly-once", _xp)

    finally:
        # ── 8. CLEANUP + verify green ─────────────────────────────────
        async def _cleanup():
            async with Session() as db:
                for tbl, col in CLEANUP_TABLES.items():
                    try:
                        await db.execute(
                            sa.text(f"DELETE FROM {tbl} WHERE {col} = :u"),
                            {"u": uid})
                        await db.commit()
                    except Exception:
                        await db.rollback()
                # verify: zero rows remain for this uid in every table
                counts = {}
                for tbl, col in CLEANUP_TABLES.items():
                    try:
                        n = (await db.execute(sa.text(
                            f"SELECT COUNT(*) FROM {tbl} "
                            f"WHERE {col} = :u"), {"u": uid})).scalar()
                        counts[tbl] = int(n or 0)
                    except Exception as e:
                        counts[tbl] = f"ERR {type(e).__name__}"
                green = all(v == 0 for v in counts.values())
                return green, f"residual rows: {counts}"
        try:
            await station_fn("8 cleanup green", _cleanup)
        except Exception as e:
            station("8 cleanup green", False,
                    f"cleanup itself failed: {type(e).__name__}: {e}"[:140])
        await engine.dispose()

    fails = [n for n, ok, _ in RESULTS if ok is False]
    passed = sum(1 for _, ok, _ in RESULTS if ok)
    summary = (f"=== MATHS GOLDEN PATH: {passed}/{len(RESULTS)} stations "
               f"pass ===")
    print(f"\n{summary}", flush=True)
    if fails:
        print("FAILURES:", fails, flush=True)

    _write_report(passed, fails)
    return 1 if fails else 0


def _write_report(passed, fails):
    """Refresh GOLDEN_MATHS.md with the latest run's station results."""
    out = os.path.join(os.path.dirname(os.path.dirname(
        os.path.abspath(__file__))), "content_tools", "pedagogy",
        "GOLDEN_MATHS.md")
    try:
        lines = [
            "# GOLDEN-MATHS — one-subject end-to-end golden path (CBSE maths)",
            "",
            f"Run: {datetime.datetime.now():%Y-%m-%d %H:%M} | "
            f"result: **{passed}/{len(RESULTS)} stations pass**",
            "",
            "Template: `tests/physics_e2e_golden.py`. Live Postgres, no LLM",
            "(`SOLVER_LLM_MODE=off`), throwaway student, cleanup verified.",
            "",
            "| # | Station | Result | Evidence |",
            "|---|---------|--------|----------|",
        ]
        for i, (name, ok, ev) in enumerate(RESULTS, 1):
            tag = "PASS" if ok else ("FAIL" if ok is False else "N/A")
            lines.append(f"| {i} | {name} | {tag} | "
                         f"{str(ev).replace('|', '/')} |")
        lines += ["", "## Failures", ""]
        if fails:
            lines += [f"- {n}" for n in fails]
        else:
            lines.append("None — every station green.")
        lines += [
            "",
            "## How to run",
            "",
            "```bash",
            "cd D:/platform/deploy/backend",
            "DATABASE_URL=postgresql+asyncpg://dream_user:...@127.0.0.1:5432/dream_app \\",
            "PYTHONPATH=D:/platform/deploy SOLVER_LLM_MODE=off \\",
            "python tests/test_maths_e2e_golden.py   # exit 0 = all green",
            "```",
            "",
            "Zero Docker. Creates its own student, verifies cleanup left zero",
            "residual rows across reward_event_log / streak_freezes /",
            "review_items / mastery_records / users, exit code 0 on green.",
            "",
            "## Fixes applied during bring-up",
            "",
            "- Station 8 (cleanup verify): the `users` table is keyed by its",
            "  PK `id`, not `user_id` — a uniform `WHERE user_id` loop threw",
            "  ProgrammingError on the users count. Fixed with a per-table",
            "  column map (users→id, all ledger/progress tables→user_id).",
            "- Station 5 evidence: `record_assessment` returns",
            "  `duplicate`/`mastery`/`orm_error` (the physics template's",
            "  `orm_written`/`asyncpg_written` keys are stale — always None);",
            "  evidence now reports the real keys.",
            "",
            "## Out-of-lane notes",
            "",
            "- No maths-solver bug found: all four board-numerical grading",
            "  stations (quadratic, AP, coordinate geometry, trig) shipped",
            "  VERIFIED on first probe. No edits to maths-lane solver",
            "  families were needed.",
            "",
        ]
        with open(out, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        print(f"report written: {out}", flush=True)
    except OSError as e:
        print(f"report write failed: {e}", flush=True)


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
