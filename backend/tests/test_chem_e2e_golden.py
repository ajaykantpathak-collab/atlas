"""test_chem_e2e_golden.py -- ONE SUBJECT END-TO-END: chemistry (CBSE class 10).

Modeled exactly on physics_e2e_golden.py: walks a real student through the
complete teaching loop against the REAL Postgres, judging every station like
an examiner.  Per-station isolation: one failure records FAIL and the walk
continues.

  1. LEARNPATH   chapter path ordered, prereq gating works
  2. PRACTICE    batch selector serves a chemistry session
  3. GRADING     the chemistry solver verifies the PROBE-verified mole
                 numerical and the H2 + O2 -> H2O balance
  4. SOCRATIC    mole_concept_error misconception dialogue builds
  5. BKT         mastery moves up on correct, down on wrong (chem node)
  6. SM-2        review scheduled after practice
  7. REWARDS     XP exactly-once, ledger tables persist
Cleanup removes the test student's rows (incl. review_items).

GRADING NOTE -- balance station (2026-10-06): the solver answers
"Balance: H2 + O2 -> H2O" with "balanced equation: 2 H2 + O2 -> 2 H2O".
That IS correct chemistry (4 H, 2 O on each side; smallest whole-number
coefficients), so the original needle that flagged it WRONG was the bug.
This test does not repeat that mistake: it (a) normalizes and matches the
canonical balanced form, and (b) re-derives the atom tally from the solver's
own output with parse_formula and asserts LHS = RHS per element -- an
examiner check independent of string needles.
"""
import asyncio
import os
import re
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


def _norm(s):
    return re.sub(r"[\s,.]+", "", str(s or "")).lower()


# user-keyed tables (user_id column) + live-store tables (student_id column)
_CLEANUP_SQL = (
    ("DELETE FROM reward_event_log WHERE user_id = :u",
     "DELETE FROM streak_freezes WHERE user_id = :u",
     "DELETE FROM review_items WHERE user_id = :u",
     "DELETE FROM mastery_records WHERE user_id = :u",
     "DELETE FROM users WHERE id = :u")
    + tuple("DELETE FROM " + t + " WHERE student_id = :u"
            for t in ("mastery_state", "mastery_event_log"))
)


async def _cleanup(db, uid):
    import sqlalchemy as sa
    n = 0
    for stmt in _CLEANUP_SQL:
        try:
            r = await db.execute(sa.text(stmt), {"u": uid})
            n += r.rowcount or 0
            await db.commit()
        except Exception:
            await db.rollback()
    return n


def _atom_tally(side_str):
    """Atom tally for one side of a balanced equation like '2 H2 + O2'."""
    from backend.its.solver.chemistry_families import parse_formula
    tally = {}
    for term in str(side_str).split("+"):
        term = term.strip()
        if not term:
            continue
        m = re.match(r"^(\d+)\s+(.+)$", term)
        n, formula = (int(m.group(1)), m.group(2)) if m else (1, term)
        counts = parse_formula(formula)
        if not counts:
            return None
        for el, c in counts.items():
            tally[el] = tally.get(el, 0) + n * c
    return tally or None


async def main():
    import sqlalchemy as sa
    from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

    url = os.environ["DATABASE_URL"]
    engine = create_async_engine(url, pool_size=4)
    Session = async_sessionmaker(engine, expire_on_commit=False)

    uid = str(uuid.uuid4())
    async with Session() as db:
        from backend.models.user import User
        db.add(User(id=uid, name="ChemE2E Student",
                    email=f"chem-e2e-{uid[:8]}@test.local",
                    class_level=10, board="CBSE"))
        await db.commit()
    # Prove the parent row is visible to a FRESH session before walking:
    # the fleet shares this Postgres and one run saw the row invisible to
    # every later station (all DB writes FK-skip).  Retry once, then abort
    # honestly instead of fail-walking five stations on a phantom student.
    for attempt in (1, 2):
        async with Session() as db:
            from backend.models.user import User
            got = (await db.execute(
                sa.select(User.id).where(User.id == uid)
            )).scalar_one_or_none()
        if got is not None:
            break
        if attempt == 1:
            print("user row invisible after commit — retrying", flush=True)
            async with Session() as db:
                from backend.models.user import User
                db.add(User(id=uid, name="ChemE2E Student",
                            email=f"chem-e2e-{uid[:8]}b@test.local",
                            class_level=10, board="CBSE"))
                await db.commit()
    if got is None:
        print("FATAL: test student not visible after 2 attempts; aborting",
              flush=True)
        async with Session() as db:
            await _cleanup(db, uid)
        await engine.dispose()
        return 1
    print(f"student {uid}", flush=True)

    try:
        # ── 1. LEARNPATH ──────────────────────────────────────────────
        from backend.services.learnpath_builder import get_path, next_lesson
        path = get_path(10, "chemistry", 1)
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
        chem_qs = []
        async with Session() as db:
            async def _practice():
                nonlocal chem_qs
                sel = QuestionSelector(db)
                t0 = time.time()
                qs = await sel.select_batch(student_id=uid, subject="chemistry",
                                            count=5, class_level=10)
                ms = (time.time() - t0) * 1000
                chem_qs = qs
                return (len(qs) >= 3,
                        f"{len(qs)}/5 in {ms:.0f}ms; types="
                        f"{ {q.get('question_type') for q in qs} }")
            await station_fn("2a batch serves chemistry", _practice)
            station("2b distinct ids", len({q["question_id"] for q in chem_qs})
                    == len(chem_qs), f"{len(chem_qs)} questions")

        # ── 5. BKT mastery movement (chemistry node) ───────────────────
        from backend.services.progress_service import ProgressService
        from backend.services.mastery_ledger import record_assessment
        get_mastery_record = ProgressService.get_mastery_record
        node_id = (chem_qs[0].get("node_id") if chem_qs
                   else "c10_chem_cbse_01_001")

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
                        f"(orm_error={r_up.get('orm_error')}, "
                        f"duplicate={r_up.get('duplicate')})" if m2
                        else f"no row; up={r_up}")
        await station_fn("5 BKT moves up+down", _bkt)

        # ── 6. SM-2 review scheduling ──────────────────────────────────
        async def _sm2():
            async with Session() as db:
                from backend.services.progress_service import ProgressService
                from backend.models.progress import ReviewItem
                await ProgressService.schedule_practice_review(
                    db, uid, node_id, "Chemistry E2E Concept",
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

        # ── 3. GRADING (chemistry solver) ──────────────────────────────
        MOLE_Q = ("How many moles are in 98 g of H2SO4 (molar mass "
                  "98 g/mol)?")

        def _grade_mole():
            from backend.its.solver.answer_pipeline import answer
            r = answer(MOLE_Q)
            a = _norm(r.answer)
            # 98 g / 98 g/mol = 1 mol
            ok = str(r.label).startswith("VERIFIED") and "1mol" in a
            return ok, f"{r.label}: {str(r.answer)[:40]}"
        await station_fn("3a solver n=m/M mole verified", lambda: _grade_mole())

        def _grade_balance():
            from backend.its.solver.answer_pipeline import answer
            r = answer("Balance: H2 + O2 -> H2O")
            raw = str(r.answer or "")
            # (a) canonical smallest-whole-number form, normalized needle.
            needle = "2h2+o2->2h2o"
            # (b) examiner check: re-derive the atom tally from the solver's
            # own output and require LHS = RHS for every element.  Strip any
            # prose prefix ("balanced equation: ...") before parsing -- the
            # chemistry lives after the last colon on the LHS.
            lhs, _, rhs = raw.partition("->")
            tl = _atom_tally(lhs.split(":")[-1])
            tr = _atom_tally(rhs)
            atoms_ok = (tl is not None and tr is not None and tl == tr
                        and tl.get("H") == 4 and tl.get("O") == 2)
            ok = (str(r.label).startswith("VERIFIED") and needle in _norm(raw)
                  and atoms_ok)
            return ok, (f"{r.label}: {raw[:60]}; tally LHS={tl} RHS={tr}")
        await station_fn("3b solver balances H2+O2->H2O",
                         lambda: _grade_balance())

        # ── 4. SOCRATIC mole_concept_error dialogue ────────────────────
        def _socratic():
            from backend.its.solver.socratic_moves import build_sequence
            seq = build_sequence("mole_concept_error", "2",
                                 MOLE_Q, "1 mol")
            kinds = [m["kind"] for m in seq.moves]
            iso = [m for m in seq.moves if m["kind"] == "isolate"]
            elicit = seq.moves[0] if seq.moves else {}
            ok = (bool(seq.moves)
                  and elicit.get("kind") == "elicit"
                  and "2" in elicit.get("text", "")
                  and len(iso) == 2
                  and set(seq.keys) == {"iso1", "iso2"}
                  and "retry" in kinds and "handoff" in kinds)
            return ok, (f"{len(seq.moves)} moves {kinds}; elicit quotes the "
                        f"wrong answer; {len(seq.keys)} server-side keys")
        await station_fn("4 socratic mole_concept_error builds",
                         lambda: _socratic())

    finally:
        async with Session() as db:
            n = await _cleanup(db, uid)
        print(f"cleanup: removed {n} rows for {uid}", flush=True)
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
