"""test_bio_e2e_golden.py -- ONE SUBJECT END-TO-END: biology (CBSE classes 9-12).

Modeled exactly on physics_e2e_golden.py: walks a real student through the
complete teaching loop against the REAL Postgres, judging every station like
an examiner.  Per-station isolation: one failure records FAIL and the walk
continues.

BIOLOGY CONTRACT DIFFERENCE (vs physics): biology is conceptual.  The
deterministic engine cannot grade prose, so the golden path tests a
DIFFERENT contract:

  1. LEARNPATH   biology strand path ordered, prereq gating works
  2. PRACTICE    batch selector serves a biology session (short_answer)
  3. GRADING     the honesty contract, per question type:
                   factual-single-word -> SOLVES (NCERT fact-recall anchor)
                   MCQ-with-options    -> SOLVES when exactly one option
                                          carries the anchored fact
                   why-question        -> REFUSES HONESTLY (GUIDED, never
                                          VERIFIED-wrong)
                   definition          -> REFUSES HONESTLY
                 plus objective-keyed rows grade via the correct_answer
                 field (deterministic, no LLM)
  4. SOCRATIC    genetics_dominance misconception dialogue builds and
                 grades the isolate moves ("cross Aa x Aa" -> 1/4)
  5. BKT         mastery moves up on correct, down on wrong
  6. SM-2        review scheduled after practice
  7. REWARDS     XP exactly-once, ledger tables persist

Honest refusal is a PASS for prose; VERIFIED-wrong is a FAIL for anything.
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

_VERIFIED_LABELS = ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                    "VERIFIED_OFFICIAL", "VERIFIED_SEMANTIC")


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


def _is_honest_refusal(r) -> tuple:
    """The honesty contract for prose: no verified label, no answer
    released, and a human-facing reason the engine declined."""
    label = str(getattr(r, "label", "") or "")
    answer = getattr(r, "answer", None)
    refusal = getattr(r, "refusal_reason", None) or ""
    not_verified = label not in _VERIFIED_LABELS
    return (not_verified and answer is None and len(str(refusal)) > 10,
            f"{label}: answer={answer!r}, refusal={str(refusal)[:60]!r}")


async def main():
    import sqlalchemy as sa
    from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

    url = os.environ["DATABASE_URL"]
    engine = create_async_engine(url, pool_size=4)
    Session = async_sessionmaker(engine, expire_on_commit=False)

    uid = str(uuid.uuid4())
    async with Session() as db:
        from backend.models.user import User
        db.add(User(id=uid, name="BiologyE2E Student",
                    email=f"bio-e2e-{uid[:8]}@test.local",
                    class_level=10, board="CBSE"))
        await db.commit()
    print(f"student {uid}", flush=True)

    try:
        # ── 1. LEARNPATH ──────────────────────────────────────────────
        from backend.services.learnpath_builder import get_path, next_lesson
        path = get_path(10, "biology", "1")
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
        bio_qs = []
        async with Session() as db:
            async def _practice():
                nonlocal bio_qs
                sel = QuestionSelector(db)
                t0 = time.time()
                qs = await sel.select_batch(student_id=uid, subject="biology",
                                            count=5, class_level=10)
                ms = (time.time() - t0) * 1000
                bio_qs = qs
                types = sorted({str(q.get("question_type")) for q in qs})
                keyed = sum(1 for q in qs if q.get("correct_answer"))
                return (len(qs) >= 3 and keyed == len(qs),
                        f"{len(qs)}/5 in {ms:.0f}ms; types={types}; "
                        f"{keyed}/{len(qs)} carry correct_answer")
            await station_fn("2a batch serves biology", _practice)
            station("2b distinct ids", len({q["question_id"] for q in bio_qs})
                    == len(bio_qs), f"{len(bio_qs)} questions")

        # ── 3. GRADING: the biology honesty contract ───────────────────
        def _grade_factual():
            from backend.its.solver.answer_pipeline import answer
            r = answer("Which cell organelle is called the powerhouse of "
                       "the cell?")
            a = str(r.answer or "").lower()
            ok = (str(r.label) in _VERIFIED_LABELS
                  and "mitochondri" in a)
            return ok, f"{r.label}: {str(r.answer)[:60]}"
        await station_fn("3a factual recall SOLVES (powerhouse)",
                         lambda: _grade_factual())

        def _grade_mcq():
            from backend.its.solver.answer_pipeline import answer
            r = answer("Which of the following is called the powerhouse of "
                       "the cell? (a) Ribosome (b) Mitochondria (c) Nucleus "
                       "(d) Golgi apparatus")
            a = str(r.answer or "").lower()
            ok = (str(r.label) in _VERIFIED_LABELS
                  and "mitochondri" in a)
            return ok, f"{r.label}: {str(r.answer)[:60]}"
        await station_fn("3b MCQ-with-options SOLVES (fact+options)",
                         lambda: _grade_mcq())

        def _refuse_why():
            from backend.its.solver.answer_pipeline import answer
            r = answer("Why do plant cells have a cell wall while animal "
                       "cells do not?")
            return _is_honest_refusal(r)
        await station_fn("3c why-question refuses honestly",
                         lambda: _refuse_why())

        def _refuse_definition():
            # "Define osmosis." has TWO honest outcomes depending on
            # whether the enhanced-nodes concept index is warm in this
            # process (neurolink concept lane): VERIFIED with the canonical
            # definition (verified retrieval, no LLM, no computation), or
            # GUIDED_PRACTICE honest refusal.  Both are honest.  What this
            # station FAILS is anything dishonest: a verified answer that
            # is wrong/irrelevant, or a non-verified label that still
            # carries an answer, or neither a released answer nor a
            # human-facing refusal.
            from backend.its.solver.answer_pipeline import answer
            r = answer("Define osmosis.")
            label = str(getattr(r, "label", "") or "")
            a = getattr(r, "answer", None)
            refusal = getattr(r, "refusal_reason", None) or ""
            if label in _VERIFIED_LABELS:
                a_l = str(a or "").lower()
                honest_correct = ("osmosis" in a_l and "water" in a_l)
                return honest_correct, (
                    f"VERIFIED path: {str(a)[:70]!r} "
                    f"({'' if honest_correct else 'NOT '}canonical)")
            honest_refusal = (a is None and len(str(refusal)) > 10)
            return honest_refusal, (
                f"refusal path: {label}, answer={a!r}, "
                f"refusal={str(refusal)[:50]!r}")
        await station_fn("3d definition: verified-correct OR honest refusal",
                         lambda: _refuse_definition())

        def _refuse_why_form_of_fact():
            # The SAME fact in why-form must NOT ship the bare noun as an
            # answer -- that would be a dishonest non-answer.
            from backend.its.solver.answer_pipeline import answer
            r = answer("Why are mitochondria called the powerhouse of the "
                       "cell?")
            return _is_honest_refusal(r)
        await station_fn("3e why-form of a known fact still refuses",
                         lambda: _refuse_why_form_of_fact())

        async def _objective_key():
            # MCQ-style objective rows from the same bank the batch serves:
            # graded deterministically via the correct_answer field.
            from backend.services.practice_service import PracticeService
            async with Session() as db:
                row = (await db.execute(sa.text(
                    "SELECT question_text, correct_answer "
                    "FROM board_questions WHERE subject='bio' "
                    "AND class_level=10 AND question_type='true_false' "
                    "AND correct_answer IS NOT NULL LIMIT 1"))).first()
                fb = (await db.execute(sa.text(
                    "SELECT question_text, correct_answer "
                    "FROM board_questions WHERE subject='bio' "
                    "AND class_level=10 AND question_type='fill_blank' "
                    "AND correct_answer IS NOT NULL LIMIT 1"))).first()
                if row is None or fb is None:
                    return False, "no objective rows in bank"
                svc = PracticeService()
                q_tf = {"question_id": "e2e-tf",
                        "correct_answer": row[1]}
                q_fb = {"question_id": "e2e-fb",
                        "correct_answer": fb[1]}
                ok_tf, _, _ = await svc._check_answer(
                    q_tf, str(row[1]).strip())
                wrong_tf, _, _ = await svc._check_answer(q_tf, "Wrong")
                ok_fb, _, _ = await svc._check_answer(
                    q_fb, str(fb[1]).strip())
                wrong_fb, _, _ = await svc._check_answer(q_fb, "zzz")
                return (ok_tf and not wrong_tf and ok_fb and not wrong_fb,
                        f"tf key={row[1]!r} right={ok_tf} wrong={wrong_tf}; "
                        f"fb key={fb[1]!r} right={ok_fb} wrong={wrong_fb}")
        await station_fn("3f objective rows grade via correct_answer",
                         _objective_key)

        # ── 4. SOCRATIC genetics_dominance ─────────────────────────────
        def _socratic_build():
            from backend.its.solver.socratic_moves import build_sequence
            seq = build_sequence(
                "genetics_dominance", "3/4",
                "In a cross Aa x Aa, what fraction shows the recessive "
                "trait?", "1/4")
            kinds = [m["kind"] for m in seq.moves]
            return (len(seq.moves) >= 4
                    and kinds[0] == "elicit"
                    and "3/4" in seq.moves[0]["text"]
                    and kinds[-1] == "handoff",
                    f"{len(seq.moves)} moves kinds={kinds}; elicit quotes "
                    f"the wrong answer")
        await station_fn("4a socratic genetics dialogue builds",
                         lambda: _socratic_build())

        def _socratic_grade():
            from backend.its.solver.socratic_moves import (
                build_sequence, grade_move)
            seq = build_sequence(
                "genetics_dominance", "3/4",
                "In a cross Aa x Aa, what fraction shows the recessive "
                "trait?", "1/4")
            ok1, _, nxt1 = grade_move(seq, "iso1", "1/4")
            ok_wrong, _, nxt_wrong = grade_move(seq, "iso1", "3/4")
            ok2, _, nxt2 = grade_move(seq, "iso2", "false")
            return (ok1 and nxt1 == "retry"
                    and not ok_wrong and nxt_wrong == "iso2"
                    and ok2,
                    f"iso1 1/4 -> {ok1} ({nxt1}); iso1 3/4 -> {ok_wrong} "
                    f"({nxt_wrong}); iso2 false -> {ok2} ({nxt2})")
        await station_fn("4b socratic grading 1/4 right, 3/4 falls through",
                         lambda: _socratic_grade())

        def _socratic_no_leak():
            from backend.its.solver.socratic_moves import build_sequence
            seq = build_sequence(
                "genetics_dominance", "3/4",
                "In a cross Aa x Aa, what fraction shows the recessive "
                "trait?", "1/4")
            payload = seq.payload()
            key_leak = any("answer" in m for m in payload["moves"])
            # the CORRECT VALUE must never appear in student-facing text
            # ("You answered 3/4" legitimately quotes the STUDENT answer)
            text = str(payload)
            val_leak = [k for k in ("1/4", "0.25", "25%")
                        if k in text]
            return (not key_leak and not val_leak,
                    f"key_leak={key_leak}, value_leaks="
                    f"{val_leak or 'none'}")
        await station_fn("4c socratic payload hides answer keys",
                         lambda: _socratic_no_leak())

        def _catalog_entry():
            from backend.its.solver.misconception_catalog import (
                DEFAULT_MISCONCEPTIONS)
            entry = next((m for m in DEFAULT_MISCONCEPTIONS
                          if m["id"] == "genetics_dominance"), None)
            return (entry is not None
                    and "biology" in entry.get("subjects", [])
                    and 10 in entry.get("classes", []),
                    f"entry={'yes' if entry else 'no'}, "
                    f"subjects={entry.get('subjects') if entry else None}, "
                    f"classes={entry.get('classes') if entry else None}")
        await station_fn("4d catalog maps genetics_dominance to biology",
                         lambda: _catalog_entry())

        # ── 5. BKT mastery movement ────────────────────────────────────
        from backend.services.progress_service import ProgressService
        from backend.services.mastery_ledger import record_assessment
        get_mastery_record = ProgressService.get_mastery_record
        node_id = (bio_qs[0].get("node_id") if bio_qs
                   else "c10_bio_cbse_01_001")

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
                        f"(orm={r_up.get('orm_written')}, "
                        f"asyncpg={r_up.get('asyncpg_written')})" if m2
                        else f"no row; up={r_up}")
        await station_fn("5 BKT moves up+down", _bkt)

        # ── 6. SM-2 review scheduling ──────────────────────────────────
        async def _sm2():
            async with Session() as db:
                from backend.services.progress_service import ProgressService
                from backend.models.progress import ReviewItem
                await ProgressService.schedule_practice_review(
                    db, uid, node_id, "Biology E2E Concept",
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
        async with Session() as db:
            for stmt in ("DELETE FROM reward_event_log WHERE user_id = :u",
                         "DELETE FROM streak_freezes WHERE user_id = :u",
                         "DELETE FROM mastery_event_log WHERE "
                         "student_id = :u",
                         "DELETE FROM mastery_records WHERE user_id = :u",
                         "DELETE FROM review_items WHERE user_id = :u",
                         "DELETE FROM activity_logs WHERE user_id = :u",
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
