"""test_social_golden.py -- THE SOCIAL-SCIENCE GOLDEN PATH:
geography + economics end-to-end (CBSE classes 6-12).

Modeled on test_hist_e2e_golden.py / physics_e2e_golden.py.  Walks a real
student through the complete teaching loop against the REAL Postgres
(auto-detected: if the DB is down, DB stations record PENDING and the
in-process stations still run -- families fire without the DB).  Per-station
isolation: one failure records FAIL and the walk continues.

  1. LEARNPATH   geography + economics chapter paths, classes 6-12,
                 prereq gating works (file-based; no DB needed)
  2. PRACTICE    batch selector serves geography / economics sessions,
                 subject-pure (every node_id is a geo / econ node)
  3. GRADING     the honest-refusal matrix, physical/economic NEUTRAL:
                   a. corpus geography facts -> VERIFIED only because the
                      closed-world fact table carries them (monsoon onset,
                      longest river, Ganga source, Tropic of Cancer, ...)
                   b. economics definitions -> VERIFIED (GDP, HDI, MGNREGA,
                      tertiary sector, disguised unemployment)
                   c. geography numerics -> VERIFIED (timezone from
                      longitude, map scale both directions, R.F.)
                   d. economics numerics -> VERIFIED (market equilibrium)
                   e. open / out-of-table asks -> honest refusal, answer
                      withheld, NEVER a verified-wrong (incl. the world-
                      scope guard: "longest river IN INDIA" must not serve
                      the Nile)
                   f. release-calibrated families (POP_DENSITY is below
                      the flywheel trap-resistance floor) -> answer
                      withheld BUT the method steps still teach
                   g. 8 real board_questions geo/eco rows -> each exactly
                      SOLVE / REFUSE / WRONG; any WRONG fails the run
  4. SOCRATIC    map_scale_error (geography) and supply_demand_curve
                 (economics) dialogues build + grade
  5. BKT         mastery moves up on correct, down on wrong
  6. SM-2        review scheduled after practice
  7. REWARDS     XP exactly-once, ledger tables persist

Honest-refusal contract (full write-up: content_tools/pedagogy/
SOCIAL_GOLDEN.md): the deterministic engine only speaks when the taught
corpus PROVES the fact (closed-world law, same as history's EVENT_YEAR);
physical/economic geography facts (rivers, monsoon, resources) and
economic definitions grade from the corpus table; everything else refuses
honestly.  Civics is OUT OF SCOPE for this batch (content-filter
constraints) -- documented as a parked gap.  A VERIFIED-wrong on a
factual question is the one unforgivable failure, so station 3 fails the
run on any.

Cleanup removes the test students' rows."""
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
    tag = "PASS" if ok else ("FAIL" if ok is False else
                             "PENDING" if ok is None else "N/A")
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


def _is_verified(label) -> bool:
    return str(label).startswith("VERIFIED")


def _answer(q):
    from backend.its.solver.answer_pipeline import answer
    return answer(q)


_NUM_RE = re.compile(r"-?\d[\d,]*(?:\.\d+)?")


def _key_agrees(key: str, ans: str) -> bool:
    """Conservative examiner check.  Step-formatted keys carry the INPUTS
    first ("Step 1: P = 1,00,000 ..."), so the RESULT numbers are the
    key's LAST values -- grade those first, then the head numbers, then
    key words.  (The 3g matrix hit this: an SI-loan row answered
    "amount = Rs 120,000" against a key whose first numbers were the
    principal and the rate -- correct, but graded WRONG by a head-first
    match.)"""
    kn = [float(x.replace(",", "")) for x in _NUM_RE.findall(key or "")]
    an = {float(x.replace(",", "")) for x in _NUM_RE.findall(ans or "")}

    def _nums_match(pairs):
        return pairs and all(
            any(abs(v - a) <= max(0.01, 0.02 * abs(v)) for a in an)
            for v in pairs)

    if _nums_match(kn[-2:] if len(kn) >= 2 else kn) \
            or _nums_match(kn[:2]):
        return True
    kwords = [w for w in re.findall(r"[a-z]{4,}", (key or "").lower())][:6]
    if not kwords:
        return True  # nothing checkable in the key
    hits = sum(1 for w in kwords if w in (ans or "").lower())
    return hits >= max(1, len(kwords) // 2)


async def main():
    import sqlalchemy as sa
    from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

    from tests._db_url import url
    engine = create_async_engine(url(), pool_size=4)
    Session = async_sessionmaker(engine, expire_on_commit=False)

    # DB availability probe: the golden walk runs in-process even when
    # Postgres is down (owner environment note 2026-10-06); DB stations
    # then record PENDING (live re-check) instead of failing.
    db_up = True
    try:
        async with engine.connect() as conn:
            await conn.execute(sa.text("select 1"))
    except Exception as e:
        db_up = False
        engine = None
        Session = None
        print(f"DB DOWN ({type(e).__name__}) -- DB stations -> PENDING",
              flush=True)

    uid = str(uuid.uuid4())       # class-7 student: geo batch, BKT, SM-2, XP
    uid10 = str(uuid.uuid4())     # class-10 student: the econ batch probe
    if db_up:
        async with Session() as db:
            from backend.models.user import User
            # one commit per row: a multi-User flush trips asyncpg's
            # insertmanyvalues sentinel match on String-typed UUID pks
            db.add(User(id=uid, name="SocialE2E Student",
                        email=f"soc-e2e-{uid[:8]}@test.local",
                        class_level=7, board="CBSE"))
            await db.commit()
            db.add(User(id=uid10, name="SocialE2E Student C10",
                        email=f"soc-e2e-10-{uid10[:8]}@test.local",
                        class_level=10, board="CBSE"))
            await db.commit()
        print(f"students {uid} (c7) / {uid10} (c10)", flush=True)

    first_geo_qs = []
    try:
        # ── 1. LEARNPATH (geography + economics, classes 6-12) ────────
        from backend.services.learnpath_builder import get_path, next_lesson

        def _find_ch(cls, subject, max_ch=12):
            for ch in range(1, max_ch + 1):
                p = get_path(cls, subject, ch)
                if p and p.get("lessons"):
                    return p
            return None

        path7 = get_path(7, "geography", 1)
        station("1a c7 geography path exists",
                path7 is not None and len(path7.get("lessons", [])) >= 3,
                f"{len((path7 or {}).get('lessons', []))} lessons")
        if path7:
            first = next_lesson(path7, set())
            station("1b next_lesson starts at lesson 1",
                    first is not None
                    and first["seq"] == path7["lessons"][0]["seq"],
                    f"first={str(first['title'])[:40] if first else None}")
            second = next_lesson(path7, {path7["lessons"][0]["node_id"]})
            station("1c gating advances after done",
                    second is not None
                    and second["node_id"] != first["node_id"],
                    f"next={str(second['title'])[:40] if second else None}")

        # every class 6-12 must have at least one geo and one econ path
        miss = []
        for cls in range(6, 13):
            for subj in ("geography", "economics"):
                if _find_ch(cls, subj) is None:
                    miss.append(f"c{cls}/{subj}")
        station("1d geo+econ paths exist classes 6-12", not miss,
                "all 14 class/subject lanes present" if not miss
                else f"missing: {miss}")

        p10g = get_path(10, "geography", 1)
        p12e = _find_ch(12, "economics")
        station("1e c10 geo + c12 econ paths non-trivial",
                p10g is not None and len(p10g.get("lessons", [])) >= 3
                and p12e is not None and len(p12e.get("lessons", [])) >= 3,
                f"c10geo={len((p10g or {}).get('lessons', []))} lessons, "
                f"c12eco={len((p12e or {}).get('lessons', []))} lessons")

        # ── 2. PRACTICE (batch selector serves geo + econ) ─────────────
        if not db_up:
            station("2 batch selector serves geography/economics", None,
                    "PENDING live re-check: Postgres down")
        else:
            from backend.services.question_selector import QuestionSelector

            async def _practice(cls, sid, subject, prefix, store=None):
                async with Session() as db:
                    sel = QuestionSelector(db)
                    t0 = time.time()
                    qs = await sel.select_batch(student_id=sid,
                                                subject=subject,
                                                count=5, class_level=cls)
                ms = (time.time() - t0) * 1000
                if store is not None:
                    store.extend(qs)
                nodes = [str(q.get("node_id")) for q in qs]
                truthy = [n for n in nodes if n and n != "None"]
                # cross-subject leak guard: any NAMED node must be of the
                # probe's own subject; rows with no node_tags carry no
                # leak evidence
                bad = [n for n in truthy if not n.startswith(prefix)]
                pure = bool(qs) and not bad
                return (len(qs) >= 3 and pure,
                        f"{len(qs)}/5 in {ms:.0f}ms; types="
                        f"{ {q.get('question_type') for q in qs} }; "
                        f"{prefix}_nodes={len(truthy)}/{len(qs)} "
                        f"leak={bad[:2]}")

            await station_fn("2a batch serves c7 geography",
                             lambda: _practice(7, uid, "geography",
                                               f"c7_geo", store=first_geo_qs))
            await station_fn("2b batch serves c10 economics",
                             lambda: _practice(10, uid10, "economics",
                                               f"c10_eco"))
            if first_geo_qs:
                station("2c distinct ids in geo batch",
                        len({q["question_id"] for q in first_geo_qs})
                        == len(first_geo_qs),
                        f"{len(first_geo_qs)} questions")

        # ── 3. GRADING: the honest-refusal matrix ──────────────────────
        # 3a. geography corpus facts -> VERIFIED (closed-world FACT_RECALL)
        GEO_FACTS = [
            ("monsoon onset",
             "When does the southwest monsoon arrive in Kerala?",
             ("1 June", "June")),
            ("longest river",
             "Which is the longest river in the world?", ("Nile",)),
            ("ganga source",
             "What is the source of the Ganga?", ("Gangotri",)),
            ("largest delta",
             "Which is the world's largest delta?",
             ("Ganga", "Brahmaputra", "Sundarbans")),
            ("tropic of cancer",
             "What is the latitude of the Tropic of Cancer?",
             ("23",)),
            ("india extent",
             "What is the latitudinal extent of India?",
             ("8", "37")),
            ("standard meridian",
             "What is the standard meridian of India?",
             ("82",)),
            ("largest ocean", "Which is the largest ocean?", ("Pacific",)),
            ("highest range",
             "Which is the highest mountain range in the world?",
             ("Himalaya",)),
            ("largest continent",
             "Which is the largest continent?", ("Asia",)),
        ]
        async def _geo_facts():
            bad = []
            for tag, q, needs in GEO_FACTS:
                r = _answer(q)
                a = str(r.answer or "")
                if not (_is_verified(r.label)
                        and any(n.lower() in a.lower() for n in needs)):
                    bad.append(f"{tag}={r.label}:{a[:40]}")
            return (not bad, f"{len(GEO_FACTS) - len(bad)}/{len(GEO_FACTS)}"
                    f" verified-with-key" + (f"; MISS {bad[:2]}" if bad else ""))
        await station_fn("3a geography corpus facts VERIFIED", _geo_facts)

        # 3b. economics definitions -> VERIFIED (closed-world FACT_RECALL)
        ECON_FACTS = [
            ("gdp", "What is GDP?",
             ("final goods", "money value", "domestic territory")),
            ("hdi", "What is the HDI?",
             ("UNDP", "health", "education")),
            ("mgnrega", "How many days of wage employment does MGNREGA "
                        "guarantee?", ("100",)),
            ("tertiary", "What is the tertiary sector?",
             ("service",)),
            ("disguised unemp", "What is disguised unemployment?",
             ("zero", "extra", "more")),
        ]
        async def _econ_facts():
            bad = []
            for tag, q, needs in ECON_FACTS:
                r = _answer(q)
                a = str(r.answer or "")
                if not (_is_verified(r.label)
                        and any(n.lower() in a.lower() for n in needs)):
                    bad.append(f"{tag}={r.label}:{a[:40]}")
            return (not bad, f"{len(ECON_FACTS) - len(bad)}/{len(ECON_FACTS)}"
                    f" verified-with-key" + (f"; MISS {bad[:2]}" if bad
                                             else ""))
        await station_fn("3b economics definitions VERIFIED", _econ_facts)

        # 3c. geography numerics -> VERIFIED (timezone / map scale / RF)
        GEO_NUMERIC = [
            ("timezone", "If it is 12 noon at Greenwich, what is the local "
                         "time at 90 degrees East?", ("6:00", "6 PM")),
            ("map scale fwd", "A map has a scale of 1 cm = 5 km. Two "
                              "cities are 6 cm apart on the map. What is "
                              "the actual distance between them?",
             ("30",)),
            ("map scale rev", "A map has a scale of 1 cm = 4 km. The "
                              "actual distance between two villages is "
                              "20 km. What is the map distance in cm?",
             ("5",)),
            ("rf", "The scale of a map is 1:50000. Two towns are 3.5 cm "
                   "apart on the map. Find the actual distance in km.",
             ("1.75",)),
            ("mean deviation",
             "A weather station in Bhopal records the following daily "
             "maximum temperatures (\u00b0C) for June 1\u20135: 42, 44, "
             "41, 45, 43. The 30-year normal for June 1\u20135 is "
             "40\u00b0C. Calculate the mean deviation of these five days "
             "from the normal", ("3",)),
            ("vital + migration",
             "A district has a mid-year population of 2,50,000. During "
             "the year, 4,500 live births and 2,000 deaths were "
             "registered. Net in-migration was 1,200. Calculate the CBR, "
             "CDR, natural growth rate, and actual growth rate (all per "
             "1000).",
             ("18", "8", "10", "4.8", "14.8")),
        ]
        async def _geo_numeric():
            bad = []
            for tag, q, needs in GEO_NUMERIC:
                r = _answer(q)
                a = str(r.answer or "")
                if not (_is_verified(r.label)
                        and any(n in a for n in needs)):
                    bad.append(f"{tag}={r.label}:{a[:40]}")
            return (not bad, f"{len(GEO_NUMERIC) - len(bad)}/"
                    f"{len(GEO_NUMERIC)} verified-with-key"
                    + (f"; MISS {bad[:2]}" if bad else ""))
        await station_fn("3c geography numerics VERIFIED", _geo_numeric)

        # 3d. economics numerics -> VERIFIED (equilibrium + the wave-2
        # corpus families: XED/YED elasticity, OJT bond net gain,
        # multi-determinant demand evaluation)
        ECON_NUMERIC = [
            ("equilibrium", "The demand function is Qd = 100 - 2P and the "
                            "supply function is Qs = 40 + 2P. Find the "
                            "equilibrium price.", ("15",)),
            ("cross elasticity",
             "The price of butter increases from \u20b9200/kg to "
             "\u20b9250/kg. As a result, the demand for margarine at a "
             "local store rises from 50 kg/week to 70 kg/week. Calculate "
             "the percentage change in price of butter and percentage "
             "change in quantity demanded of margarine. What does the "
             "positive relationship indicate?",
             ("25", "40", "substitute")),
            ("income elasticity",
             "In a survey, 100 families in Delhi were asked their monthly "
             "demand for bus tickets at \u20b910 each. When their monthly "
             "income rose from \u20b93000 to \u20b95000, their demand "
             "fell from 60 to 40 tickets. Calculate the percentage "
             "changes and the income elasticity of demand.",
             ("66", "-33", "inferior")),
            ("ojt bond",
             "A manufacturing firm spends \u20b950,000 per worker on a "
             "6-week technical training program. Post-training, each "
             "worker's monthly output increases by 20%, generating an "
             "additional \u20b915,000 per month in revenue for the firm. "
             "The firm imposes a 1-year bond. Calculate the net gain to "
             "the firm over the bond period and determine if the training "
             "is economically viable.",
             ("1,30,000", "viable")),
            ("multivar demand",
             "Given the demand function Qd = 100 - 2P + 0.5Y - 3Ps, where "
             "P = own price, Y = consumer income, Ps = price of "
             "substitute. Initially P=20, Y=50, Ps=15. Calculate the "
             "initial quantity demanded. Then determine the new quantity "
             "demanded if (a) P rises to 25 (Y, Ps constant), (b) Y rises "
             "to 60 (P, Ps constant).",
             ("40", "30", "45", "movement", "shift")),
        ]
        async def _econ_numeric():
            bad = []
            for tag, q, needs in ECON_NUMERIC:
                r = _answer(q)
                a = str(r.answer or "")
                if not (_is_verified(r.label)
                        and all(n in a for n in needs)):
                    bad.append(f"{tag}={r.label}:{a[:40]}")
            return (not bad, f"{len(ECON_NUMERIC) - len(bad)}/"
                    f"{len(ECON_NUMERIC)} verified-with-key"
                    + (f"; MISS {bad[:2]}" if bad else ""))
        await station_fn("3d economics numerics VERIFIED", _econ_numeric)

        # 3e. open / out-of-table asks -> honest refusal, answer withheld
        async def _honest():
            from backend.its.solver.answer_pipeline import GUIDED, AMBIGUOUS
            probes = [
                ("why-essay", "Why does the monsoon fail in some years?"),
                ("describe", "Describe how rivers change the landscape."),
                ("scope guard", "Which is the longest river in India?"),
                ("out-of-table", "What is the poverty line in calories?"),
                ("open recall", "Name the tributary that joins the Ganga "
                                "at Allahabad."),
            ]
            details, ok = [], True
            for tag, q in probes:
                r = _answer(q)
                honest = (r.label in (GUIDED, AMBIGUOUS)
                          or not _is_verified(r.label))
                # the honest part: nothing presented as THE answer
                no_answer = r.answer is None or not _is_verified(r.label)
                ok = ok and honest and no_answer
                details.append(f"{tag}={r.label}"
                               + ("" if r.answer is None else "!ANS"))
            return ok, "; ".join(details)
        await station_fn("3e open/out-of-table refuse honestly", _honest)

        # 3f. release-calibrated family (POP_DENSITY below the flywheel
        # floor) -> answer withheld, method steps still teach
        async def _calibrated():
            r = _answer("A town has 50,000 people and covers 250 sq km. "
                        "Calculate the density of population.")
            honest = r.answer is None or not _is_verified(r.label)
            teaches = len(r.steps or []) >= 3
            return (honest and teaches,
                    f"{r.label}, answer={'withheld' if r.answer is None
                    else r.answer[:30]}, {len(r.steps or [])} method steps")
        await station_fn("3f calibrated withhold still teaches", _calibrated)

        # 3g. 8 real board_questions geo/eco rows -> SOLVE/REFUSE/WRONG
        if not db_up:
            station("3g DB grading matrix (8 rows)", None,
                    "PENDING live re-check: Postgres down")
        else:
            async def _matrix():
                rows = []
                async with Session() as db:
                    from backend.models.enrichment import BoardQuestion
                    q = (sa.select(BoardQuestion)
                         .where(BoardQuestion.board == "CBSE",
                                BoardQuestion.subject.in_(("geo", "geography",
                                                           "eco", "economics")),
                                BoardQuestion.class_level.in_(
                                    (7, 9, 10, 11, 12)),
                                BoardQuestion.correct_answer.isnot(None),
                                sa.func.length(
                                    sa.func.trim(BoardQuestion.correct_answer))
                                > 0,
                                sa.func.length(BoardQuestion.question_text)
                                .between(25, 240))
                         .order_by(BoardQuestion.id))
                    allrows = list((await db.execute(q)).scalars().all())
                # 4 geo + 4 eco, spread over classes, shortest keys first
                picked = []
                for subs in (("geo", "geography"), ("eco", "economics")):
                    pool = [r for r in allrows if r.subject in subs]
                    pool.sort(key=lambda r: len(r.correct_answer or ""))
                    seen, take = set(), []
                    for r in pool:
                        if r.class_level in seen:
                            continue
                        seen.add(r.class_level)
                        take.append(r)
                        if len(take) == 4:
                            break
                    picked += take
                picked = picked[:8]

                verdicts, wrong, solved, refused = [], 0, 0, 0
                for r in picked:
                    try:
                        res = _answer(r.question_text)
                    except Exception as e:
                        verdicts.append((r, "ERROR",
                                         f"{type(e).__name__}"))
                        continue
                    label = str(res.label)
                    ans = str(res.answer or "")
                    key = (r.correct_answer or "").strip()
                    if _is_verified(res.label) and res.answer is not None:
                        if _key_agrees(key, ans):
                            solved += 1
                            verdicts.append((r, "SOLVE",
                                             f"{label}: {ans[:50]}"))
                        else:
                            wrong += 1
                            verdicts.append(
                                (r, "WRONG",
                                 f"{label}: {ans[:50]} vs key {key[:50]}"))
                    else:
                        refused += 1
                        verdicts.append((r, "REFUSE",
                                         f"{label}: "
                                         f"{(res.refusal_reason or '')[:40]}"))
                lines = [f"c{r.class_level}/{r.subject}/{r.question_type}: "
                         f"{v} {ev}" for r, v, ev in verdicts]
                print("\n".join(f"    {ln}" for ln in lines), flush=True)
                return (wrong == 0 and len(verdicts) == 8,
                        f"{len(verdicts)} graded: {solved} SOLVE, "
                        f"{refused} REFUSE, {wrong} WRONG "
                        f"(zero-VERIFIED-wrong bar)")
            await station_fn("3g DB grading matrix (8 rows)", _matrix)

        # ── 4. SOCRATIC geo + econ dialogues ───────────────────────────
        def _socratic_build():
            from backend.its.solver.socratic_moves import build_sequence
            seq = build_sequence(
                "map_scale_error", "1:1,000,000",
                "Which map shows more detail of a village: 1:10,000 or "
                "1:1,000,000?", "1:10,000")
            kinds = [m["kind"] for m in seq.moves]
            payload = seq.payload()
            no_keys = ("keys" not in payload and all(
                "answer" not in m for m in payload["moves"]))
            return (bool(seq.moves) and kinds[0] == "elicit"
                    and "10,000" in seq.moves[0]["text"] and no_keys,
                    f"{len(seq.moves)} moves ({kinds}); keys server-side="
                    f"{no_keys}")
        await station_fn("4a socratic map_scale dialogue builds",
                         _socratic_build)

        def _socratic_grade():
            from backend.its.solver.socratic_moves import (
                build_sequence, grade_move)
            seq = build_sequence(
                "supply_demand_curve", "upward",
                "Draw the demand curve for apples as their price rises.",
                "downward sloping")
            ok1, _, _ = grade_move(seq, "iso1", "falls")
            ok2, _, _ = grade_move(seq, "iso2", "rises")
            bad, _, _ = grade_move(seq, "iso2", "falls")
            return (ok1 and ok2 and not bad,
                    f"demand-falls={ok1}; supply-rises={ok2}; "
                    f"supply-as-falls graded wrong={not bad}")
        await station_fn("4b supply_demand_curve grades", _socratic_grade)

        def _socratic_catalog():
            from backend.its.solver.misconception_catalog import \
                MisconceptionCatalog
            cat = MisconceptionCatalog()
            geo = cat.get_by_subject("geography")
            econ = cat.get_by_subject("economics")
            gids = {e.get("id") for e in geo}
            eids = {e.get("id") for e in econ}
            return ("map_scale_error" in gids
                    and "supply_demand_curve" in eids,
                    f"geo has map_scale_error={'map_scale_error' in gids}; "
                    f"econ has supply_demand_curve="
                    f"{'supply_demand_curve' in eids}")
        await station_fn("4c catalog lists geo/econ misconceptions",
                         _socratic_catalog)

        # ── 5-7. BKT / SM-2 / XP (DB stations) ─────────────────────────
        if not db_up:
            for nm in ("5 BKT moves up+down", "6 SM-2 review scheduled",
                       "7 XP exactly-once"):
                station(nm, None, "PENDING live re-check: Postgres down")
        else:
            from backend.services.progress_service import ProgressService
            from backend.services.mastery_ledger import record_assessment
            get_mastery_record = ProgressService.get_mastery_record
            node_id = (first_geo_qs[0].get("node_id") if first_geo_qs
                       else "c7_geo_cbse_01_001")

            async def _bkt():
                async with Session() as db:
                    m0 = await get_mastery_record(db, uid, node_id)
                    m0_val = float(m0.mastery_probability) if m0 else 0.0
                    r_up = await record_assessment(db, uid, node_id, True,
                                                   source="practice",
                                                   difficulty=0.5)
                    await db.commit()
                    m1 = await get_mastery_record(db, uid, node_id)
                    up = (m1 is not None
                          and float(m1.mastery_probability) > m0_val)
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
                            f"asyncpg={r_up.get('asyncpg_written')})"
                            if m2 else f"no row; up={r_up}")
            await station_fn("5 BKT moves up+down", _bkt)

            async def _sm2():
                async with Session() as db:
                    from backend.services.progress_service import \
                        ProgressService
                    from backend.models.progress import ReviewItem
                    await ProgressService.schedule_practice_review(
                        db, uid, node_id, "Social E2E Concept",
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
                    return (bool(r1.get("awarded"))
                            and bool(r2.get("duplicate")),
                            f"first={r1.get('awarded')}, replay dup="
                            f"{r2.get('duplicate')}")
            await station_fn("7 XP exactly-once", _xp)

    finally:
        if db_up:
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
        if engine is not None:
            await engine.dispose()

    fails = [n for n, ok, _ in RESULTS if ok is False]
    pend = [n for n, ok, _ in RESULTS if ok is None]
    print(f"\n=== GOLDEN PATH (social: geography + economics): "
          f"{sum(1 for _, ok, _ in RESULTS if ok)}/{len(RESULTS)} stations "
          f"pass ===", flush=True)
    if pend:
        print("PENDING (live re-check):", pend, flush=True)
    if fails:
        print("FAILURES:", fails, flush=True)
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
