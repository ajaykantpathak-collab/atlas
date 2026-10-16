"""physics_e2e_golden.py -- ONE SUBJECT END-TO-END: physics (CBSE class 10).

Walks a real student through the complete teaching loop against the REAL
Postgres, judging every station like an examiner.  Per-station isolation:
one failure records FAIL and the walk continues.

  1. LEARNPATH   chapter path ordered, prereq gating works
  2. PRACTICE    batch selector serves a physics session
  3. GRADING     the physics solver verifies a board numerical
  4. SOCRATIC    physics misconception dialogue builds
  5. BKT         mastery moves up on correct, down on wrong
  6. SM-2        review scheduled after practice
  7. REWARDS     XP exactly-once, ledger tables persist
Cleanup removes the test student's rows."""
import asyncio
import os
import sys
import time
import traceback
import uuid

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

RESULTS = []


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


async def main():
    import sqlalchemy as sa
    from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

    url = os.environ["DATABASE_URL"]
    engine = create_async_engine(url, pool_size=4)
    Session = async_sessionmaker(engine, expire_on_commit=False)

    uid = str(uuid.uuid4())
    async with Session() as db:
        from backend.models.user import User
        db.add(User(id=uid, name="PhysicsE2E Student",
                    email=f"phy-e2e-{uid[:8]}@test.local",
                    class_level=10, board="CBSE"))
        await db.commit()
    print(f"student {uid}", flush=True)

    try:
        # ── 1. LEARNPATH ──────────────────────────────────────────────
        from backend.services.learnpath_builder import get_path, next_lesson
        path = get_path(10, "physics", "1")
        station("1a learnpath exists",
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
        phys_qs = []
        async with Session() as db:
            async def _practice():
                nonlocal phys_qs
                sel = QuestionSelector(db)
                t0 = time.time()
                qs = await sel.select_batch(student_id=uid, subject="physics",
                                            count=5, class_level=10)
                ms = (time.time() - t0) * 1000
                phys_qs = qs
                return (len(qs) >= 3,
                        f"{len(qs)}/5 in {ms:.0f}ms; types="
                        f"{ {q.get('question_type') for q in qs} }")
            await station_fn("2a batch serves physics", _practice)
            station("2b distinct ids", len({q["question_id"] for q in phys_qs})
                    == len(phys_qs), f"{len(phys_qs)} questions")

        # ── 5. BKT mastery movement ────────────────────────────────────
        from backend.services.progress_service import ProgressService
        from backend.services.mastery_ledger import record_assessment
        get_mastery_record = ProgressService.get_mastery_record
        node_id = (phys_qs[0].get("node_id") if phys_qs
                   else "c10_phy_cbse_01_001")

        async def _bkt():
            async with Session() as db:
                m0 = await get_mastery_record(db, uid, node_id)
                m0_val = float(m0.mastery_probability) if m0 else 0.0
                r_up = await record_assessment(db, uid, node_id, True,
                                               source="practice", difficulty=0.5)
                await db.commit()
                m1 = await get_mastery_record(db, uid, node_id)
                up = m1 is not None and float(m1.mastery_probability) > m0_val
                m_mid = float(m1.mastery_probability) if m1 else 0.0
                r_dn = await record_assessment(db, uid, node_id, False,
                                               source="practice", difficulty=0.5)
                await db.commit()
                m2 = await get_mastery_record(db, uid, node_id)
                down = (m2 is not None
                        and float(m2.mastery_probability) < m_mid)
                return (up and down,
                        f"{m0_val:.3f} -> {m_mid:.3f} -> "
                        f"{float(m2.mastery_probability):.3f} "
                        f"(mastery={r_up.get('mastery')}, "
                        f"duplicate={r_up.get('duplicate')})" if m2
                        else f"no row; up={r_up}")
        await station_fn("5 BKT moves up+down", _bkt)

        # ── 6. SM-2 review scheduling ──────────────────────────────────
        async def _sm2():
            async with Session() as db:
                from backend.services.progress_service import ProgressService
                from backend.models.progress import ReviewItem
                await ProgressService.schedule_practice_review(
                    db, uid, node_id, "Physics E2E Concept",
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

        # ── 3. GRADING (physics solver) ────────────────────────────────
        def _grade():
            from backend.its.solver.answer_pipeline import answer
            r = answer("A 12 V battery drives 2 A through a resistor. Find "
                       "the resistance.")
            ok = (str(r.label).startswith("VERIFIED")
                  and "6" in str(r.answer or ""))
            return ok, f"{r.label}: {str(r.answer)[:40]}"
        await station_fn("3a solver V=IR verified",
                         lambda: _grade())

        def _grade2():
            from backend.its.solver.answer_pipeline import answer
            r = answer("A right triangle has legs 3 and 4. What is the "
                       "hypotenuse?")
            a = str(r.answer or "")
            return ("5" in a and "173" not in a,
                    f"{r.label}: {a[:40]}")
        await station_fn("3b triangle gate fix holds",
                         lambda: _grade2())

        # ── 4. SOCRATIC physics dialogue ───────────────────────────────
        def _socratic():
            from backend.its.solver.socratic_moves import build_sequence
            seq = build_sequence("unit_confusion", "20 m/s",
                                 "A car covers 100 m in 20 s. Find its "
                                 "speed in m/s.", "5")
            return (bool(seq.moves)
                    and seq.moves[0]["kind"] == "elicit"
                    and "20 m/s" in seq.moves[0]["text"],
                    f"{len(seq.moves)} moves; elicit quotes the answer")
        await station_fn("4 socratic dialogue builds",
                         lambda: _socratic())

    finally:
        async with Session() as db:
            for stmt in ("DELETE FROM reward_event_log WHERE user_id = :u",
                         "DELETE FROM streak_freezes WHERE user_id = :u",
                         "DELETE FROM mastery_records WHERE user_id = :u",
                         "DELETE FROM users WHERE id = :u"):
                try:
                    await db.execute(sa.text(stmt), {"u": uid})
                    await db.commit()
                except Exception:
                    await db.rollback()
        await engine.dispose()

    fails = [n for n, ok, _ in RESULTS if ok is False]
    print(f"\n=== GOLDEN PATH: "
          f"{sum(1 for _, ok, _ in RESULTS if ok)}/{len(RESULTS)} stations "
          f"pass ===", flush=True)
    if fails:
        print("FAILURES:", fails, flush=True)
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
