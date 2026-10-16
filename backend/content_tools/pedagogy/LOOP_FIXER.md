# LOOP-FIXER — teaching-loop coverage wave (live report)

Agent: LOOP-FIXER. Date started: 2026-10-08. Constraints: FILES ONLY
(no Docker, no restarts, no commits), SOLVER_LLM_MODE=off, no LLM calls,
verifier registrations are DATA ROWS only (owner directive 2026-10-08:
`_eval_decl_row` is the single engine; no `def _v_<family>` functions).

## Baseline (BEFORE) — from INTEGRATION_MATRIX.md @ 2026-10-07 21:16 UTC

Solve station across 63 pairs: 9 SOLVED (VERIFIED-correct), 23
computed-only (badge withheld), 1 slowpath pair, 28 refused / other.
Per-station: learnpath 43 pass / 20 red; solve 9 pass / 51 amber / 3 red;
socratic 37 pass / 26 n/a.

SOLVED pairs (before): maths-c6, maths-c10, physics-c8, physics-c9,
physics-c10, physics-c11, chemistry-c6, chemistry-c7, biology-c10.

learnpath reds (20): english/hindi all 7 classes (14) + maths/chemistry/
biology c11-c12 (6).

socratic n/a (26): english+hindi all classes (14), biology c6-c9 (4),
geography c11-c12 (2), economics c6-c8 (3), chemistry c6-c8 (3).

## Work log

- learnpath_builder.py: SUBJECT_ALIASES + SUBJECT_STEM_VARIANTS extended
  with english (eng/engl/english/eng_f/eng_h/eng_k/eng_s/eng_v/eng_w) and
  hindi (hin/hindi/hin_a/hin_al/hin_ar/hin_ga/hin_kr/hin_ks/hin_sp/hin_v)
  vocabulary; DEFAULT_CLASSES -> (6..12); DEFAULT_SUBJECTS += english,
  hindi. Additive only. Regeneration RAN CLEAN: 640 chapter files
  (maths 96, physics 62, chemistry 36, biology 55, history 55,
  geography 72, civics 20, economics 40, english 97, hindi 107;
  8,203 lessons). Every previously-red pair now has files
  (english/hindi 5-29 chapters per class; maths/chem/bio c11/c12
  10-19 chapters). Walk-clean proof lands with the master test.
- Probe of computed-but-refused pairs launched (one process, streaming
  JSONL) to collect struct ids from `badge:verifier_*` audit routes.
  First pass restart: candidate 1 of maths-c7 (c7_math_icse_04_003,
  tiles word-problem) is a SLOWPATH shape on the contended box — probe
  relaunched with the matrix's 2-consecutive-slowpath walk-stop, a
  known-slowpath skip list, and a 240s budget.
- SOCRATIC (item 3) DONE at unit level: misconception_catalog.py +23
  entries -> `english_tense_shift`, `hindi_sandhi_blend`,
  `hindi_karak_mislabel` (all classes 6-12; anchored to
  structure_families_lang.py's LANG_ENG_TENSE / LANG_HI_SANDHI /
  LANG_HI_KARAK lanes). socratic_moves.py carries their elicitation
  prompts + isolating Q&A. Verified: all 14 english/hindi class bands
  build + grade (elicit/isolate/handoff shape, iso1 keys server-side,
  right key -> retry, wrong key fails); characteristic WRONG forms
  (was/were/writes/play, literal sandhi blends, karak swaps) all FAIL
  honestly. py_compile clean.

## AFTER — measured before/after (master test, ONE pytest run, 14m27s,
62 passed / 1 failed; before-snapshot kept as
INTEGRATION_MATRIX.before_loopfix.md + _integration_results.before_loopfix.jsonl)

| station | before | after |
|---|---|---|
| solve VERIFIED-correct pairs | **9** | **21** (+12) |
| learnpath | 43 pass / 20 red | **63 pass / 0 red** |
| solve | 9 pass / 51 amber / 2 red / 1 FAIL | **21 pass / 42 amber / 0 red / 0 FAIL** |
| socratic | 37 pass / 26 n/a | **51 pass / 12 n/a** |
| coherence | 9 pass / 54 n/a | 20 pass / 42 n/a / 1 FAIL (below) |
| grade / bkt / sm2 / xp | 63 pass | 63 pass |

Solve-VERIFIED pairs (before -> after): biology-c10, chemistry-c6/c7,
maths-c6/c10, physics-c8/c9/c10/c11 UNCHANGED; NEW: **maths-c11
(NPR_NCR_EVAL row), maths-c12 (MATRIX_PRODUCT_2X2 family+row),
physics-c7 (SPEED_DIST_TIME row), physics-c12 (ELC_CHARGE_COUNT row —
landed by a concurrent agent's wave, confirmed flipping during this
session), chemistry-c10, economics-c8/c9/c10, geography-c6/c8/c9/c11**
(MAP_SCALE / TIME_ZONE_LONGITUDE / VITAL_STATS / CHM_DOBEREINER rows
from the concurrent SOCIAL/chem waves — the flipped solve un-wedges
each walk; geography-c6's walk now stops at its first VERIFIED solve
and never reaches the VERIFIED-WRONG freefall mis-match that made it
FAIL before).

 learnpath: every english/hindi pair and every 11/12 maths/chem/bio
pair now serves prereq-ordered walking paths (640 chapter files).

socratic: english_tense_shift + hindi_karak_mislabel/hindi_sandhi_blend
serve all 14 language class bands (was zero).

## The one FAIL: geography-c8 coherence (SOLVER lane, not this wave)

The MAP_SCALE flip released its first verified answer for the pair,
which ACTIVATED the previously n/a coherence station: ask
"How many kilometres will you travel?" classifies as **count**
(`\bhow\s+many\b` in ask_coherence.py:42) while the answer
"Ground distance = 37.5 km" classifies as **length** -> incoherent.
The answer is correct; the classifier misses unit-qualified how-many
asks. Fix (one line class, ask_coherence owner): a how-many ask whose
noun is a unit word (kilometres/metres/seconds/litres/...) should
classify as that quantity kind, not count. Every other flipped
geography pair classifies length/length and passes.

## Foreign regressions observed during this wave (SOLVER lane)

- its/solver/physics_families.py (edited 06:00 by a concurrent agent)
  refuses the classic kinematics question "A car starts from rest and
  accelerates at 2 m/s^2 for 5 s" ("no physics family matched") —
  breaks tests/test_independent_verifier.py
  test_registered_route_positive/tamper_caught[KINEMATICS_V_U_AT].
- tests/test_independent_verifier.py::test_verified_model_problem_end_to_end
  — "Find the kinetic energy of a 3 kg mass moving at 4 m/s" now sweeps
  to PE_TO_KE instead of kinetic_energy (family priority change).
- tests/test_lomo_bug_regressions.py::test_weight_implausible_g_still_refuses
  — an implausible-g weight question now returns numeric 200.0 instead
  of refusing (plausibility gate bypass).
- test_registry_covers_at_least_25_routes: VERIFIERS(299) !=
  registered_routes()(559) — a 260-route gap from a conceptual-invariants
  wave that never mirrored into VERIFIERS (pre-dates this wave; this
  wave's 5 routes grow both sides equally).

## Files touched (this wave)

- deploy/backend/services/learnpath_builder.py (additive vocabulary +
  defaults)
- deploy/backend/_cache/learnpaths/* (regenerated, 640 chapters)
- deploy/backend/its/solver/maths4_families.py (additive: 2 families +
  table rows)
- deploy/backend/its/solver/independent_verifier.py (LOOP-FIXER wave
  block: 5 declarative data rows + the CELL_DIVISION_COUNT
  hand-written->row conversion)
- deploy/backend/its/solver/misconception_catalog.py (+3 families)
- deploy/backend/its/solver/socratic_moves.py (+3 dialogue scripts)
- scratch (repro evidence, _dig* convention): _loopfix_gen_lp.py/.log,
  _loopfix_probe.py/.log/.out.jsonl, _loopfix_scan.py/.log/.out.jsonl,
  _loopfix_master_run.log

All probes batched in single-process loops; no Docker, no restarts, no
commits, SOLVER_LLM_MODE=off throughout, no LLM calls.

## Verifier wave (item 1+4) — measured flips through answer()

Discovery: static structure-scan (content_tools/pedagogy/_loopfix_scan.py)
over the 21 target pairs' ranked diagnostics (126 questions, 30 matched
structs) — no answer() wedges. Struct map drove a DATA-ROWS-ONLY wave
block (`_LOOPFIX_DECL` + setdefault loop) at the tail of
independent_verifier.py:

| row | route | proof (check_route on real family output) |
|---|---|---|
| MATRIX_PRODUCT_2X2 | maths4 MATRIX_PRODUCT_2X2 | rebuild (1,1)=a*p+b*r=10 -- matches; tampered 11 -> fail |
| MATRIX_SCALAR_COMBINE | maths4 MATRIX_SCALAR_COMBINE | rebuild (1,1)=m1*a-m2*p=4 -- matches; tampered 5 -> fail |
| NPR_NCR_EVAL | maths2 NPR_NCR_EVAL | falling product 8*7*6*5*4=6720 (family uses math.perm) -- matches; 5C2=10 via C relation; tampered -> fail |
| SPEED_DIST_TIME | physics SPEED_DIST_TIME | d/t=180/30=6 -- matches; `when` guard keeps inverse/time asks NA (bio mis-parse stays refused) |
| CELL_DIVISION_COUNT | biology CELL_DIVISION_COUNT | converted the hand-written verifier to a data row (owner directive): tn/2=12 (meiosis), c0*2^k=48 (proliferation parity); tampered -> fail |

GUIDED -> VERIFIED flips measured through `answer_pipeline.answer()`:
- maths-c12 cand1 (c12_math_cbse_03_005): VERIFIED `AB = [[10, -3], [-6, 15]]`,
  route `independent_verifier:pass` + `structure:MATRIX_PRODUCT_2X2` (57s cold)
- maths-c11 cand2 (c11_math_isc_06_003 8P5): VERIFIED 6720
- physics-c7 cand4 (c7_physics_ch04_006 cyclist): VERIFIED 6 m/s
- physics-c12 cand1 (c12_phy_cbse_01_001 electrons): VERIFIED `n = 2 electrons`
  (ELC_CHARGE_COUNT row — landed by another agent's wave during this session;
  confirmed flipping)

Suite evidence: tests/test_independent_verifier.py + lomo regressions +
learnpath + socratic + maths4 families in ONE pytest run: 216 passed.
Post-fix rerun of the verifier route contract: 74 passed, 2 failed —
both KINEMATICS_V_U_AT (positive+tamper), family-side: physics_families.py
(edited 06:00 by a concurrent agent) now refuses the test's kinematics
question ("no physics family matched") — foreign regression, SOLVER lane.

## Documented stays-refused (with root cause)

- maths-c12 c12_math_cbse_07_004 (construct an integral problem) and
  c12_math_cbse_03_007 (find A,B with AB=O): construction asks — the
  honesty contract refuses them by design.
- maths-c12 c12_math_cbse_04_003 (determinant "using properties") and
  c12_math_cbse_11_001 (direction cosines tuple): compute-shaped but
  prose/tuple-graded; a determinant family is future family-lane work
  (pair already flips via MATRIX_PRODUCT_2X2 at candidate 1).
- chemistry-c9 MOLECULAR_MASS (342) / chemistry-c11 PERCENT_FROM_FORMULA
  (40%): the family answer text LEADS with the formula ("Al2(SO4)3 = 342",
  "C6H12O6 = 40%") so the badge gate reads claim=2/6, not 342/40 — a
  correct row would FAIL-withhold. CHEMISTRY lane must reformat answers
  to lead with the number before a row can register.
- hindi-c10 ALANKAAR_CLASSIFY, economics-c12 JOURNAL_ENTRY, biology-c7
  PHOTO_RESP_QUIZ: string-answer families — the declarative engine
  requires a numeric claim (`_eval_decl_row` NAs at claim None).
  String-claim row support is an ENGINE extension (owner direction:
  extend the engine, not per-family functions) — parked for the engine
  owner.
- biology-c11 meiosis question: family compute reaches the gate VERIFIED
  via the math-kernel lane with NO structure stamp
  (`badge:verifier_no_route`) — needs a one-line route-stamp in the
  kernel lane (answer_pipeline), SOLVER lane owner. The CELL_DIVISION_COUNT
  row is registered and will verify once the route is named.
- WRONG computes found in the deterministic lane (all correctly withheld
  by the strict gate today; SOLVER lane bugs, not verifier gaps):
  TRIG_STD_EVAL sin3theta (answers 0.052336; exact value 23/27 = 0.852),
  COMPETENCY:c8m7.4.1 SI (answers 12; 10000 @5% x2y = 11000),
  MOLES (answers "1 mol"; 250 mL of 0.020 M x 158.04 g/mol = 0.790 g),
  SPEED_DIST_TIME on the pharynx time ask (answers 0.0005 s; 0.24 s).


