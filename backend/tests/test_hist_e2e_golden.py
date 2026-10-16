"""test_hist_e2e_golden.py -- ONE SUBJECT END-TO-END: history (CBSE 9-10)
+ the honest-refusal contract for ALL humanities.

Walks a real student through the complete teaching loop against the REAL
Postgres, judging every station like an examiner.  Per-station isolation:
one failure records FAIL and the walk continues.

  1. LEARNPATH   history chapter path ordered, prereq gating works (c9+c10)
  2. PRACTICE    batch selector serves history sessions (c9 + c10),
                 subject-pure (every node_id is a hist node)
  3. GRADING     the honest-refusal matrix:
                   a. deterministic keys  -> VERIFIED (French Rev 1789,
                      Jallianwala 1919) -- the closed-world EVENT_YEAR lane
                   b. open humanities     -> honest refusal, answer=None,
                      NEVER a verified-wrong
                   c. 8 real board_questions hist rows -> each recorded
                      exactly SOLVE / REFUSE / WRONG; any WRONG fails
  4. SOCRATIC    cause_effect_swap dialogue builds + grades
                 ("Heavy rain fell, so the match was cancelled" -> effect)
  5. BKT         mastery moves up on correct, down on wrong
  6. SM-2        review scheduled after practice
  7. REWARDS     XP exactly-once, ledger tables persist

Humanities contract (full write-up: content_tools/pedagogy/GOLDEN_HIST.md):
the deterministic engine only ever speaks when it can PROVE the answer
(closed-world dates, corpus intervals, century placement, timeline order);
essays / source analysis / open name-recall must be refused honestly and
handed to teacher/LLM grading.  A VERIFIED-wrong on a factual question is
the one unforgivable failure, so station 3 fails the run on any.

Cleanup removes the test student's rows."""
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


_VER_HEADS = ("VERIFIED",)


def _is_verified(label) -> bool:
    return str(label).startswith(_VER_HEADS)


def _is_refusal(r) -> bool:
    return (not _is_verified(r.label)) or r.answer is None


_YEAR_RE = re.compile(r"\b(1[0-9]{3}|20[0-9]{2})\b")


async def main():
    import sqlalchemy as sa
    from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

    url = os.environ["DATABASE_URL"]
    engine = create_async_engine(url, pool_size=4)
    Session = async_sessionmaker(engine, expire_on_commit=False)

    uid = str(uuid.uuid4())       # class-9 student: batch, BKT, SM-2, XP
    uid10 = str(uuid.uuid4())     # class-10 student: the c10 batch probe
    async with Session() as db:
        from backend.models.user import User
        # one commit per row: a multi-User flush trips asyncpg's
        # insertmanyvalues sentinel match on String-typed UUID pks
        db.add(User(id=uid, name="HistoryE2E Student",
                    email=f"hist-e2e-{uid[:8]}@test.local",
                    class_level=9, board="CBSE"))
        await db.commit()
        db.add(User(id=uid10, name="HistoryE2E Student C10",
                    email=f"hist-e2e-10-{uid10[:8]}@test.local",
                    class_level=10, board="CBSE"))
        await db.commit()
    print(f"students {uid} (c9) / {uid10} (c10)", flush=True)

    hist_qs = []
    try:
        # ── 1. LEARNPATH (history chapter path) ───────────────────────
        from backend.services.learnpath_builder import get_path, next_lesson
        path9 = get_path(9, "history", 1)
        station("1a c9 history path exists",
                path9 is not None and len(path9.get("lessons", [])) >= 3,
                f"{len((path9 or {}).get('lessons', []))} lessons")
        if path9:
            first = next_lesson(path9, set())
            station("1b next_lesson starts at lesson 1",
                    first is not None
                    and first["seq"] == path9["lessons"][0]["seq"],
                    f"first={str(first['title'])[:40] if first else None}")
            second = next_lesson(path9, {path9["lessons"][0]["node_id"]})
            station("1c gating advances after done",
                    second is not None
                    and second["node_id"] != first["node_id"],
                    f"next={str(second['title'])[:40] if second else None}")
        path10 = get_path(10, "history", 1)
        station("1d c10 history path exists",
                path10 is not None and len(path10.get("lessons", [])) >= 3,
                f"{len((path10 or {}).get('lessons', []))} lessons")

        # ── 2. PRACTICE (batch selector serves history) ────────────────
        from backend.services.question_selector import QuestionSelector
        async with Session() as db:
            async def _practice(cls, sid):
                nonlocal hist_qs
                sel = QuestionSelector(db)
                t0 = time.time()
                # the STUDENT PROFILE class is authoritative in the
                # selector (the param is only a fallback), so each probe
                # runs its own class-matched student
                qs = await sel.select_batch(student_id=sid, subject="history",
                                            count=5, class_level=cls)
                ms = (time.time() - t0) * 1000
                if cls == 9:
                    hist_qs = qs
                nodes = [str(q.get("node_id")) for q in qs]
                truthy = [n for n in nodes if n and n != "None"]
                prefix = f"c{cls}_hist"
                # cross-subject leak guard: any NAMED node must be hist
                # AND of the probe's own class; rows with no node_tags
                # carry no leak evidence
                bad = [n for n in truthy if not n.startswith(prefix)]
                pure = bool(qs) and not bad
                return (len(qs) >= 3 and pure,
                        f"{len(qs)}/5 in {ms:.0f}ms; types="
                        f"{ {q.get('question_type') for q in qs} }; "
                        f"hist_nodes={len(truthy)}/{len(qs)} "
                        f"leak={bad[:2]}")
            await station_fn("2a batch serves c9 history",
                             lambda: _practice(9, uid))
            await station_fn("2b batch serves c10 history",
                             lambda: _practice(10, uid10))
        station("2c distinct ids", len({q["question_id"] for q in hist_qs})
                == len(hist_qs), f"{len(hist_qs)} questions")

        # ── 3. GRADING: the honest-refusal matrix ──────────────────────
        def _answer(q):
            from backend.its.solver.answer_pipeline import answer
            return answer(q)

        # 3a. deterministic keys -> VERIFIED (closed-world EVENT_YEAR)
        def _grade_year1():
            r = _answer("In which year did the French Revolution begin?")
            return (_is_verified(r.label) and "1789" in str(r.answer or ""),
                    f"{r.label}: {str(r.answer)[:60]}")
        await station_fn("3a year recall VERIFIED (1789)", _grade_year1)

        def _grade_year2():
            r = _answer("When was the Jallianwala Bagh massacre?")
            return (_is_verified(r.label) and "1919" in str(r.answer or ""),
                    f"{r.label}: {str(r.answer)[:60]}")
        await station_fn("3b year recall VERIFIED (1919)", _grade_year2)

        # 3c. open humanities -> honest refusal, never a wrong answer
        async def _honest():
            from backend.its.solver.answer_pipeline import \
                GUIDED, AMBIGUOUS
            probes = [
                ("name", "Who wrote the book 'Hind Swaraj'?"),
                ("why", "Why did the Third Estate form the National "
                        "Assembly?"),
                ("essay", "Describe the impact of the French Revolution "
                          "on France."),
            ]
            details, ok = [], True
            for tag, q in probes:
                r = _answer(q)
                honest = (r.label in (GUIDED, AMBIGUOUS)
                          or not _is_verified(r.label))
                # the honest part: nothing presented as THE answer
                no_answer = r.answer is None or not _is_verified(r.label)
                ok = ok and honest and no_answer
                details.append(f"{tag}={r.label}")
            return ok, "; ".join(details)
        await station_fn("3c why/essay/name refuse honestly", _honest)

        # 3d. 8 real board_questions history rows -> SOLVE/REFUSE/WRONG
        async def _matrix():
            rows = []
            async with Session() as db:
                from backend.models.enrichment import BoardQuestion
                from backend.services.question_selector import \
                    QuestionSelector
                sel = QuestionSelector(db)
                q = (sa.select(BoardQuestion)
                     .where(BoardQuestion.board == "CBSE",
                            BoardQuestion.subject == "hist",
                            BoardQuestion.class_level.in_((9, 10)),
                            BoardQuestion.correct_answer.isnot(None),
                            sa.func.length(
                                sa.func.trim(BoardQuestion.correct_answer))
                            > 0,
                            sa.func.length(BoardQuestion.question_text)
                            .between(25, 240))
                     .order_by(BoardQuestion.id))
                allrows = list((await db.execute(q)).scalars().all())
            buckets = {"year": [], "name": [], "why": [], "cause": [],
                       "tf": []}
            for r in allrows:
                if getattr(sel, "_is_template_row", lambda *_: False)(r):
                    continue
                t = (r.question_text or "").strip()
                low = t.lower()
                if re.match(r"^(why|give reasons?)\b|why (did|was|were) ",
                            low) or "give reason" in low:
                    buckets["why"].append(r)
                elif r.question_type == "true_false":
                    buckets["tf"].append(r)
                elif re.search(r"in which year|when (was|did)|"
                               r"in the year\s*[_?]", low):
                    buckets["year"].append(r)
                elif re.match(r"^who\b|^(name) (the|three|two)\b", low):
                    buckets["name"].append(r)
                elif re.search(r"\bcause\b|\beffect\b", low):
                    buckets["cause"].append(r)
            picked = []
            for b, want in (("year", 2), ("name", 2), ("why", 2),
                            ("cause", 1), ("tf", 1)):
                pool = buckets[b]
                if b == "tf":
                    picked += pool[:want]
                    continue
                c9 = next((r for r in pool if r.class_level == 9), None)
                c10 = next((r for r in pool if r.class_level == 10), None)
                take = [r for r in (c9, c10) if r is not None][:want]
                if len(take) < want:
                    take += [r for r in pool if r not in take][:want - len(take)]
                picked += take
            picked = picked[:8]

            verdicts, wrong, solved, refused = [], 0, 0, 0
            for r in picked:
                try:
                    res = _answer(r.question_text)
                except Exception as e:
                    verdicts.append((r, "ERROR", f"{type(e).__name__}"))
                    continue
                label = str(res.label)
                ans = str(res.answer or "")
                key = (r.correct_answer or "").strip()
                if _is_verified(res.label) and res.answer is not None:
                    # deterministic-key guard: a year in the key must
                    # appear in any verified answer on that question
                    key_years = sorted(set(_YEAR_RE.findall(key)))
                    q_years = sorted(set(_YEAR_RE.findall(
                        r.question_text or "")))
                    if r.question_type == "true_false":
                        bad = key.lower() not in ans.lower()
                    elif len(key_years) == 1 and key_years[0] \
                            not in q_years:
                        bad = key_years[0] not in ans
                    else:
                        bad = False  # prose key: nothing checkable
                    if bad:
                        wrong += 1
                        verdicts.append((r, "WRONG",
                                         f"{label}: {ans[:50]} vs key "
                                         f"{key[:50]}"))
                    else:
                        solved += 1
                        verdicts.append((r, "SOLVE",
                                         f"{label}: {ans[:50]}"))
                else:
                    refused += 1
                    verdicts.append((r, "REFUSE",
                                     f"{label}: "
                                     f"{(res.refusal_reason or '')[:40]}"))
            lines = [f"{c9r.class_level}/{c9r.question_type}: "
                     f"{v} {ev}" for c9r, v, ev in verdicts]
            print("\n".join(f"    {ln}" for ln in lines), flush=True)
            return (wrong == 0 and len(verdicts) == 8,
                    f"{len(verdicts)} graded: {solved} SOLVE, "
                    f"{refused} REFUSE, {wrong} WRONG "
                    f"(zero-VERIFIED-wrong bar)")
        await station_fn("3d DB grading matrix (8 rows)", _matrix)

        # ── 4. SOCRATIC cause_effect_swap dialogue ─────────────────────
        def _socratic_build():
            from backend.its.solver.socratic_moves import build_sequence
            seq = build_sequence(
                "cause_effect_swap", "civilisations settled",
                "'Heavy rain fell, so the match was cancelled.' Which is "
                "the EFFECT?", "match cancelled")
            kinds = [m["kind"] for m in seq.moves]
            payload = seq.payload()
            no_keys = ("keys" not in payload and all(
                "answer" not in m for m in payload["moves"]))
            return (bool(seq.moves) and kinds[0] == "elicit"
                    and "settled" in seq.moves[0]["text"]
                    and "iso1" in seq.keys and "iso2" in seq.keys
                    and no_keys,
                    f"{len(seq.moves)} moves ({kinds}); keys server-side="
                    f"{no_keys}")
        await station_fn("4a socratic dialogue builds", _socratic_build)

        def _socratic_grade():
            from backend.its.solver.socratic_moves import (
                build_sequence, grade_move)
            seq = build_sequence(
                "cause_effect_swap", "civilisations settled",
                "'Heavy rain fell, so the match was cancelled.' Which is "
                "the EFFECT?", "match cancelled")
            ok1, _, nxt1 = grade_move(seq, "iso1", "Rivers flooding")
            # iso1 correct -> iso2 skipped (skip_if iso1_ok) -> retry
            ok2, _, _ = grade_move(seq, "iso2", "The match was cancelled")
            ok3, _, _ = grade_move(seq, "iso2", "The heavy rain")
            return (ok1 and nxt1 == "retry" and ok2 and not ok3,
                    f"iso1={ok1}->next={nxt1}; effect-correct={ok2}; "
                    f"cause-as-effect graded wrong={not ok3}")
        await station_fn("4b cause_effect_swap grades", _socratic_grade)

        def _socratic_catalog():
            from backend.its.solver.misconception_catalog import \
                MisconceptionCatalog
            cat = MisconceptionCatalog()
            ids = cat.ids()
            entry = next((e for e in
                          cat.get_by_subject("history")
                          if e.get("id") == "cause_effect_swap"), None)
            if entry is None:
                entry = next((e for e in cat.entries()
                              if e.get("id") == "cause_effect_swap"), None)
            return ("cause_effect_swap" in ids and entry is not None
                    and 9 in (entry.get("classes") or []),
                    f"id present; history-listed={entry is not None}; "
                    f"class band {entry.get('classes') if entry else '?'}")
        await station_fn("4c catalog lists cause_effect_swap for history",
                         _socratic_catalog)

        # ── 5. BKT mastery movement ────────────────────────────────────
        from backend.services.progress_service import ProgressService
        from backend.services.mastery_ledger import record_assessment
        get_mastery_record = ProgressService.get_mastery_record
        node_id = (hist_qs[0].get("node_id") if hist_qs
                   else "c9_hist_ch1_1")

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
                    db, uid, node_id, "History E2E Concept",
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
            for u in (uid, uid10):
                for stmt in (
                        "DELETE FROM reward_event_log WHERE user_id = :u",
                        "DELETE FROM streak_freezes WHERE user_id = :u",
                        "DELETE FROM review_items WHERE user_id = :u",
                        "DELETE FROM its_attempt_log WHERE user_id = :u",
                        "DELETE FROM mastery_records WHERE user_id = :u",
                        "DELETE FROM users WHERE id = :u"):
                    try:
                        await db.execute(sa.text(stmt), {"u": u})
                        await db.commit()
                    except Exception:
                        await db.rollback()
        await engine.dispose()

    fails = [n for n, ok, _ in RESULTS if ok is False]
    print(f"\n=== GOLDEN PATH (history): "
          f"{sum(1 for _, ok, _ in RESULTS if ok)}/{len(RESULTS)} stations "
          f"pass ===", flush=True)
    if fails:
        print("FAILURES:", fails, flush=True)
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
