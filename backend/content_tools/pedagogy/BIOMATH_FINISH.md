# BIOMATH-FINISH — bio c8 + maths c11/c12 + CISCE repeats (2026-10-08)

Agent: BIOMATH-FINISH. Continues STEM-BM's full-span sweeps from
`STEM_BM_FULLSPAN.md` (read that first for method + incident history).

Owner directives in force:
- SOLVER_LLM_MODE=off always, no LLM calls, Docker closed.
- **Data rows only** (owner directive 2026-10-08): every new verifier
  registration is a DATA ROW through `_eval_decl_row` /
  `DECLARATIVE_INVARIANTS` — no `def _v_<family>` functions. Engine
  extensions are additive only. VERIFIER_ENGINE.md (2026-10-08) is law.
- independent_verifier.py: additive-only, NEW "BIOMATH-FINISH wave"
  block, re-read before every edit.

## Run state (updated continuously)

| Lane | Status | Rows | WRONG | Notes |
|------|--------|------|-------|-------|
| Bio c8 CBSE | **DONE** | 68 | **0** | 36 COVERAGE (curated-factual backlog: single factuals + scenario MCQs, ch1 cell / ch2 disease), 32 REFUSE_OK. 0 SOLVE, 0 SOFT. |
| Maths c11 CBSE | **DONE** | 450 | **0** | 3 SOLVE, 203 REFUSE_OK, 244 COVERAGE, 0 SOFT (after F1+F4 + re-judge). One run died mid-flight (external kill; buffered rows lost) — resumed unbuffered. |
| Maths c12 CBSE | **DONE** | 356 | **0** | 3 SOLVE, 178 REFUSE_OK, 173 COVERAGE, 0 SOFT (after F2/F3+F4 + re-judge). |
| CISCE bio c8 | running | — | — | BIO_SWEEP_CORPUS=../../content/cisce_nodes_v2 BIO_SWEEP_SUFFIX=_icse |
| CISCE maths c11 | running | — | — | MATHS_SWEEP_CORPUS + MATHS_SWEEP_SUFFIX=_isc |
| CISCE maths c12 | queued | — | — | after c11 |

Post-fix offline re-judge (both classes, all VERIFIED-labeled rows re-run
through the fixed modules, ledger rows updated in place, `rejudged: true`):
- c11 02_003#d3 + 02_004#d3: VERIFIED -> GUIDED_PRACTICE (F1 gate) —
  VERIFY_SOFT -> COVERAGE (honest refusal, set-valued ask, no
  deterministic enumerator; documented backlog).
- c11 03_014#d2: VERIFIED '90 deg' -> GUIDED_PRACTICE, WRONG ->
  REFUSE_OK (F4 guard: error-analysis ask).
- c12 03_005#d3: VERIFIED stays, WRONG -> SOLVE (F2/F3 judge artifacts;
  the shipped matrix product was the corpus key's correct answer).
- c12 06_007#d1: VERIFIED '600 sq cm' -> GUIDED_PRACTICE, WRONG ->
  COVERAGE (F4 guard: symbolic-function ask).

c8 corpus fact: 24 node files, max 3 diagnostics each = 72 rows max
(68 qualifying pairs after the length filter). The earlier "126" in the
mission brief counted unfiltered pairs; the instrument's real total is 68.

## FIX LEDGER (this wave)

### F1. STATS list-stats family hijacked by relation-theory "range" — CONFIDENT-WRONG, FIXED
- Surfaced by: maths c11 sweep rows `c11_math_cbse_02_003.md#d3` and
  `c11_math_cbse_02_004.md#d3` (label VERIFIED, judge VERIFY_SOFT —
  hand-judged as WRONG-class).
- Evidence: "Let A = {–2,–1,0,1,2}, B = {0,1,4}. R = {(x,y): y = x²...}.
  Write R in roster form and find its domain and range." shipped
  **"Range = 2"** / **"Range = 4"** VERIFIED. Correct: Range = {0,1,4}.
- Root cause (owning file `its/solver/isc_stats_families.py`):
  `_c_list_stats` fires on ANY "find ... range" ask + a comma-separated
  number run + a compute verb. `_DATA_RUN_RE` matches INSIDE set
  literals and DROPS negative signs (A = {-2, -1, 0, 1, 2} extracts
  [1, 0, 1, 2] -> max-min = 2; B = {0, 1, 2, 3, 4} -> 4). The stats
  range (max-min) answered a set-theory range (image set).
- Fix (minimal, additive): `_SET_THEORY_RE` gate — questions carrying
  domain/codomain/roster-form/relation/ordered-pair/set-builder
  vocabulary refuse; the family scan continues. Word-boundary safe
  ("correlation"/"relationship" do not match).
- Verified: both bug rows now GUIDED_PRACTICE (honest refusal — no
  deterministic set-enumeration family exists; documented COVERAGE);
  "Calculate the range of the data: 8, 9, 7, 10, 6, 12, 5" still
  VERIFIED Range = 7; brace-set stats ask still VERIFIED Range = 8.
- Known edge, out of observed scope (documented, not fixed):
  `_DATA_RUN_RE` drops negative signs, so a TRUE statistics list with
  negative values (e.g. temperatures) would mis-extract. ISC psychology
  practicals use positive scores; no corpus row exercises negatives.

### F2+F3. Maths sweep judge artifacts — CORRECT answer judged WRONG, FIXED (judge only, no engine change)
- Surfaced by: maths c12 sweep row `c12_math_cbse_03_005.md#d3`.
- Evidence: "Compute the product AB where A = [[2,-1],[0,3]] and
  B = [[4,1],[-2,5]]." — the engine shipped `AB = [[10, -3], [-6, 15]]`
  VERIFIED, which IS the corpus key's final result. Judged WRONG.
- Root cause (owning file `tests/test_maths_corpus_sweep.py`): (a) the
  misconception tail begins INLINE (". A wrong answer often ...") and
  the newline-only split left it in the key; the judge's word list then
  saw only misconception words (zero overlap -> WRONG). (b) the
  numeric-first check demands the key's FIRST 6 numbers — for a
  worked key those are the multiplication FACTORS (2, 4, -1, -2, ...),
  never demanded of a product-only answer.
- Fix: (F2) tail split also cuts inline ". A wrong answer"/". Wrong
  answer:"/" . Students who..." forms; (F3) RESULT-TUPLE MATCH — a
  multi-number answer whose number sequence appears contiguously (same
  order, values) inside the key's number sequence is the key's final
  result -> SOLVE.
- Verified offline: the row now judges SOLVE (label unchanged VERIFIED).

### F4. Error-analysis + symbolic-function asks answered by embedded computation — 2 CONFIDENT-WRONGs, FIXED
- Surfaced by: `c11_math_cbse_03_014.md#d2` ("...Is this complete?
  If not, what is missing?" shipped '90 deg' VERIFIED via
  structure:LINEAR_TRIG_EQ solving the embedded equation) and
  `c12_math_cbse_06_007.md#d1` ("Write the volume V(x) as a function
  of x and state its practical domain" shipped '600 sq cm' VERIFIED
  via structure:RECT_AREA_BY — the sheet area, not the box function).
- Root cause (owning file `its/solver/answer_pipeline.py`, the ask-shape
  choke point — both the structure-lane early-return guard and the core
  guard): the mirrored meta-judgement regexes had no alternatives for
  "is this/the ... complete?", "what is missing/wrong?" and
  "as a function of" (symbolic-deliverable ask).
- Fix (additive alternation in BOTH mirrored regexes): error-analysis
  and function-definition asks refuse honestly ("This question asks
  for reasoning, not a number — the model answer is below.").
- Verified: both rows now GUIDED_PRACTICE; positive controls keep
  VERIFIED ("Calculate the range..." Range = 7; "Compute the product
  AB..." full matrix product). Full re-judge of every VERIFIED-labeled
  row in both ledgers: only the intended rows changed — no regression.

### KNOWN GAP (documented, NOT fixed — COVERAGE backlog, pre-existing)
- `LINEAR_TRIG_EQ` ("If 2 sin(5x) = sqrt(3), find the value of x")
  refuses under the strict badge contract: route trail
  `badge:verifier_na:LINEAR_TRIG_EQ -> badge:strict_unverified`. The
  route has no registered second path. This predates this wave (the
  refusal comes from the badge gate, not the F4 guard — that would tag
  `ask_shape:meta_judgement_refused`). Prescription per
  VERIFIER_ENGINE.md (owner law): a DATA ROW (dict row with qvars for
  coef/mult and per-form rhs eqs — raw value, sqrt(v), (a)/(b) as
  alternative eqs). Not built here: the multi-form rhs needs an engine
  extension decision (qvars binds one form per var), and a hasty row
  risks FAIL-withholding correct answers — exactly what the law warns
  against. Classified as COVERAGE, not WRONG.

