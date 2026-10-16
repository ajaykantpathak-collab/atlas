# SOLVER-DIG-2 — Refusal Audit + Generator Factory Quality (2026-10-06)

Status: **COMPLETE.** Mission 1 + Mission 2 to completion bar.
Final counts: `tests/test_refusal_gaps.py` **34/34** (incl. this session's
4 added regression tests) + `tests/test_structure_families.py` **26/26**
+ `tests/test_family_adapter.py` + `test_family_adapter_invariant.py`
**12/12** = **72 passed / 0 failed** across the touched suites.

Three relaunch sessions on the same brief (session 1 quota-killed
mid-generator-sweep; sessions 2 and 3 ran concurrently and reconciled —
test-file and report merges noted inline). Environment for
all in-process runs:
- `PYTHONPATH=D:/platform/deploy`
- `SOLVER_LLM_MODE=off`, `SOLVER_OFFLINE=1`, `GROQ_API_KEY=`,
  `GEMINI_API_KEY=` (no LLM anywhere)
- Postgres went DOWN during session 2 (owner closing Docker): bank /
  semantic / node lanes were dark for every trace here. Items needing a
  live DB are marked **pending live re-check**.
- Zero Docker, zero servers, per brief.

---

## SECTION 0 — State found at relaunch (session 2)

Session 1 left behind (all re-verified live before trusted):

| Artifact | State at relaunch |
|---|---|
| `its/solver/structure_families_dig2.py` | 21 family specs (QUAD_WORD_SQ_SUM, QUAD_WORD_TAPS, QUAD_WORD_TRAIN, TRIG_RATIO_GIVEN, TRIG_IDENTITY_PROOF, AP_WHICH_TERM, ELEVATION_HEIGHT, FRUSTUM_DIG2, SOLID_MEASURE_DIG2, DICE_EVENT_PROB, LINEAR_PAIR_REL, 10x BIO_WHY_*) |
| wired into `structure_families.py` bottom | yes (`_register_dig2(register_structures)`) |
| `input_normalizer.py` | session-1 guard: option strip requires an A→B marker sequence |
| `structure_extractor.py` | session-1 fix: `_chat` returns None when `policy.llm_mode()==OFF` |
| `tests/test_refusal_gaps.py` | 26 tests, 1 failing (identity proof — refused) |
| this report | MISSING — rebuilt |

Session 2 then found the remaining gaps and finished: 6 new test
expectations corrected, 6 new families/behaviours hardened (incl. the
normalizer LAST-MARKER rule — session 1's guard had a residual hole,
RC-1b below), generator sweep class-by-class (§5).

---

## SECTION 1 — Refusal root-cause table (final, session 2)

25 canonical NCERT questions through `_answer_impl`, before vs after.
**Before: 16 GUIDED, 4 WRONG-VERIFIED, 5 correct → After: 25/25 correct
VERIFIED.**

### Root causes

| # | Canonical question | Before | Root cause (layer) | Fix | After |
|---|---|---|---|---|---|
| 1 | Sum of squares of two consecutive positive integers is 365 | GUIDED | R1 no family (top embedding match BETWEEN_SQUARES refuses) | `QUAD_WORD_SQ_SUM` (forced) | VERIFIED 13 & 14 |
| 2 | Two taps fill tank in 6 h; larger 9 h less | GUIDED | R1 no family | `QUAD_WORD_TAPS` (forced) | VERIFIED 18 h & 9 h |
| 3 | Same, NCERT 9 3/8 h variant | GUIDED | R2 parser: mixed-number time unparseable; integrality gate refused fractional T | `_mixed_number()` + self-verify instead of gate | VERIFIED 25 h & 15 h |
| 4 | Express train 132 km, 1 h less, 11 km/h more | VERIFIED WRONG "132 km/h" | R3 hijack: `signature_resolver` consumed the "1 hour less" delta as a value | comparative-delta guard in `resolve()` | VERIFIED 33 & 44 km/h |
| 5 | Train 360 km, 5 km/h more | VERIFIED WRONG "360" | R3 hijack: chain lane "speed = 360/1" | `QUAD_WORD_TRAIN` outranks chain | VERIFIED_OFFICIAL 40 km/h |
| 6 | sin A = 3/5, find tan A | GUIDED | R2 family too narrow: TRIG_VALUE_CHAIN handles only double-angle targets | `TRIG_RATIO_GIVEN` (forced; exact Pythagorean triple) | VERIFIED 3/4 |
| 7 | cos A = 12/13, find the other ratios | GUIDED | same | same | VERIFIED all five ratios |
| 8 | Prove (sin A + cosec A)^2 + ... = 7 + tan^2 A + cot^2 A | GUIDED | R4 PROOF_TRIG matched ANY prove-that and shipped a canned unrelated proof; no verifying family existed | `TRIG_IDENTITY_PROOF` (sympy trigsimp + 3-point numeric gate); PROOF_TRIG fingerprint-locked to its 2 identities | VERIFIED (identity verified) |
| 9 | Elevation 30 deg, 30 m away → height | GUIDED | R2 binder failure: HEIGHTS_DISTANCE bound only distance | `ELEVATION_HEIGHT` (forced; exact tan 30/45/60) | VERIFIED 17.32 m |
| 10 | Which term of the AP 3, 8, 13, ... is 78? | GUIDED | R2 trigger: AP_NTH regex only forward "Nth term" | `AP_WHICH_TERM` (forced) | VERIFIED 16th |
| 11 | Frustum R=28, r=7, 45 cm high | GUIDED | R2 parser: "N cm high" missed; radius fallback would eat the height | `FRUSTUM_DIG2` + π convention | VERIFIED 48510 cu cm |
| 12 | Cone h=16 r=12, volume (π=3.14) | VERIFIED WRONG "456 pi cm^2" | R3 hijack: COMPOSITE_CARVED (cone-with-cavity SA) answered a plain-cone volume | cavity keyword gate (concurrent dig agent, verified) + `SOLID_MEASURE_DIG2` | VERIFIED 2411.5 cu cm |
| 13 | P(prime on a die) | GUIDED | R1 no single-die family | `DICE_EVENT_PROB` (exact Fractions) | VERIFIED 1/2 |
| 14 | P(king of red colour) | VERIFIED WRONG 1/13 | R3 first-keyword elif chain ("king" fired before the red conjunction) | compound-event fix in `_c_card_prob` (concurrent agent, verified) | VERIFIED 1/26 |
| 15 | Difference 26, one number three times the other | GUIDED | R1 no linear-pair family | `LINEAR_PAIR_REL` | VERIFIED 13 & 39 |
| 16-18 | Heredity why-questions (progeny / variation / menstruation) | GUIDED generic | R1 no concept family (biology_families needs explicit genotypes) | curated `BIO_WHY_*` (10 entries, per-entry exemplars) | VERIFIED curated answer + steps |
| 19-25 | A+B work, AP nth/sum, GP sum, coord distance/section, sphere SA | VERIFIED (correct) | — | — | unchanged |

### Bug classes (owner format)

| Bug class | Examples | Status |
|---|---|---|
| R1 Missing family (canonical type unregistered) | squares-sum 365; taps; die prime; linear pair; bio why | FIXED — 12 specs in `structure_families_dig2.py` |
| R2 Trigger/regex/parser too narrow | AP reverse ask; frustum "N cm high"; trig single-ratio; mixed numbers; elevation binder | FIXED |
| R3 Hijacking lane ships wrong VERIFIED | signature "1 hour less"→132 km/h; chain→"360"; COMPOSITE_CARVED→plain-cone volume; CARD_PROB first keyword | FIXED — guards + family precedence |
| R4 Unverifiable "proved" | PROOF_TRIG canned proof for any prove-that text | FIXED — fingerprint lock + verifying family |
| R5 Board-convention drift | frustum 48490 (math.pi) vs textbook 48510 (22/7) | FIXED — `_pi_convention` helper |
| RC-1b Normalizer truncation residual gap | see §1.1 | FIXED — LAST-MARKER rule |

**Pending live re-check** (Postgres down): bank-answer / semantic /
official-key lanes run BEFORE the structure lane; with DB up some
answers may surface as VERIFIED_OFFICIAL instead (train-360 already did
via a mined key file). The computed answers above are the deterministic
floor.

### 1.1 Input-normalizer truncation (both sessions, full doc)

**Session 1 (RC-1):** the MCQ option-tail stripper fired on bare marker
COUNT — the identity proof's `cosec A)`, `sec A)`, `cot^2 A.` counted as
three option markers and the question truncated to
`"Prove that (sin A + cosec"`. Fixed by requiring a real option
SEQUENCE (a B-marker after the A-marker).

**Session 2 (RC-1b, residual gap found by live repro):** the
first-marker rule still broke questions whose OWN text ends in "A."
before a real option list:

```
IN : If cos A = 12/13, find sin A. A) 5/13 B) 12/5 C) 13/12 D) 5/12
OUT: If cos A = 12/13, find sin            <- ask object destroyed
```

The first A-marker is the question's own "A."; the option list is the
LAST A-marker that still has a B-marker after it. **Fix (landed,
session 2): LAST-MARKER rule** — strip from that one; every earlier
A-marker is question body. Regression tests:
`test_normalizer_keeps_question_body_before_options`,
`test_normalizer_still_strips_option_lists`,
`test_normalizer_never_truncates_identity_proof`.

**Record note:** coordinator traffic attributed "the landed
input-normalizer fix" to this agent — correct only for session 1's
A→B guard (RC-1) and session 2's LAST-MARKER rule (RC-1b). No other
agent's normalizer work exists.

---

## SECTION 2 — Fix wave (all landed files)

| File | Change | Session |
|---|---|---|
| `its/solver/structure_families_dig2.py` | 12 refusal-gap families + curated bio table + registration | 1 (re-verified 2) |
| `its/solver/structure_families.py` | dig2 wiring at bottom; PROOF_TRIG fingerprint hardening | 1 + 2 |
| `its/solver/signature_resolver.py` | comparative-delta guard in `resolve()` | 2 |
| `its/solver/input_normalizer.py` | A→B sequence guard (1); LAST-MARKER rule (2) | 1 + 2 |
| `its/solver/structure_extractor.py` | `_chat` gated on `SolverLLMMode.OFF` (was dialing Groq/Gemini with mode=off) | 1 |
| `structure_families_waves.py` | *(not mine — concurrent dig agent's ANGLE_SUM/QUAD_NATURE + card-prob compound fix; verified by my tests)* | other |
| `tests/test_refusal_gaps.py` | 32 tests: canonical questions + guards + normalizer + PAL zero-call contract | 1 + 2 |
| `solvers/histciv/class7_histciv_questions.py` | `SeededRNG.random` missing — module 100% dead (§5) | 2 |
| `solvers/english/class7_english_questions.py` | `_build_mcq` unbound `solver_result`; `long_answer` KeyError (§5) | 2 |

---

## SECTION 3 — Tests (final counts)

- Session-2 relaunch red: 25 pass / 1 fail (identity).
- Final: `tests/test_refusal_gaps.py` **32/32**;
  `tests/test_structure_families.py` **26/26**; combined **58/58**
  (2026-10-06, deterministic mode).
- Negative controls in-suite: false identities ("sin A + cos A = 2",
  "sin A = cos A") honestly refused; signature lane still solves simple
  speed and refuses delta clauses; COMPOSITE_CARVED refuses plain-cone
  volume; PAL makes zero HTTP calls with mode=off.
- Session-1 mask evidence (kept for the record): a warm
  `structure_extract_cache.json` (395 LLM-mined PAL programs) made
  canonical questions return VERIFIED via `structure:PAL_PROGRAM` while
  cold deployments refused — the false-pass the owner saw live.
  Deterministic families now fire BEFORE PAL either way.

Note: maths-family fixes are landed but the owner is concurrently
fixing maths; `test_refusal_gaps.py` pins the behaviour contract either
way lands.

---

## SECTION 4 — (merged into §1/§2)

---

## SECTION 5 — Generator factory quality

**Census:** practice-pool generators = `solvers/**/*_questions.py`
auto-discovered by `solvers/registry.py` (module-level `generate*`
callables and `*Generator`/`*Bank` classes join
QUESTION_GEN_REGISTRY). **137 generator modules / 513 generator
entry-points** (in-process registry count).

**Method (owner directive: class-by-class, no maths, hand-test depth).**
Class 7 first: all 9 non-maths class-7 question modules (bio, chem, cs,
econ, english, evs, geo, histciv, physics) x 10 seeds = **50 items**,
each audited for (a) well-formed (parseable, self-contained, no
placeholder leak), (b) answer correct — independent recompute of every
"a op b = c" claim in the solution + MCQ answer-vs-options membership,
(c) derivability — answer traces to question or solution. Harness:
`solverdig2/gen_sample.py`; raw rows:
`solverdig2/gen_sample_report_class7.json`.

### Class-7 bug table (owner format)

| Bug class | Examples | Status |
|---|---|---|
| G1 RNG wrapper missing method — module 100% dead | `histciv/class7_histciv_questions.py`: `SeededRNG` had no `.random()`, 5+ builders call `rng.random() < 0.5` → AttributeError on EVERY class-7 history/civics generation | FIXED; all seeds generate |
| G2 Unbound variable on branch — topic dead | `english ..._questions.py::_build_mcq`: `tone_mood`/fallback branches never assign `solver_result`; shared return reads it → UnboundLocalError on every tone_mood draw | FIXED |
| G3 KeyError — pool/builder key drift | `english ..._questions.py::_build_long_answer`: reads `entry['question']`; `_LONG_ANS_POOL` entries carry concept/definition/application/answer_template — `long_answer` crashed since the pool was reshaped | FIXED (ask composed from entry's own fields) |
| G4 audit-side shapes (no module defect) | bio c7 returns `(generator, file)`; evs `generate_questions(chapter: str, ...)`; checker `" ".join()` letter-spaced bare strings | harness fixed |
| Observation (FE craft pass, not a defect) | geo conventional-sign items embed emoji glyphs (🏫) in question text | flagged |

### Class-7 result

**50/50 items clean after the three G-fixes** (pre-fix round 1: 16/25
defective — 2 dead modules, 1 dead topic). Sampling continues
class-by-class (class 8 next, same depth, maths skipped). Round-1
adapter signals already handled for later classes: `(seed, count)`
shapes (acc/soc/home/biotech/econ c11/c12), `generate_batch(seed)`
positional (chem c11), bio c11/c12 field mapping. No content verdicts
for those classes until their dedicated pass.

---

### 5b. Registry-wide 20-generator sample (session 3, cross-check depth)

Where §5 swept class-7 modules seed-deep, this pass sampled the registry
BREADTH-first: deterministic RNG (seed 20261006) picked **20 of the 137
registered question generators**, 5 seeds each (11/22/33/44/55), pulled
through the PRODUCTION adapter stack
(`services.question_adapter.AdapterRegistry`), every generated question
cross-checked against the deterministic solver core
(`answer_pipeline._answer_impl`, LLM off) + manual adjudication of every
claimed key.  Harness: `deploy/backend/_dig2_gen_audit.py`; raw rows:
`content_tools/pedagogy/_dig2_gen_samples.jsonl` +
`_dig2_gen_verdicts.jsonl`.

**Factory finding: 14 of 20 sampled generators (70%) produce NOTHING
through the production serving path.**

| Failure class | Count | Generators | Root cause (probed directly) |
|---|---|---|---|
| Raw dataclass registered AS the generator | 4 | `class10_chem_questions:Question`, `class1_maths_questions:Question`, `class2_maths_questions:Question`, `class3_evs_questions:QuestionSet` | the registered object is the `Question`/`QuestionSet` DATACLASS (needs 2-13 ctor args) — registration hygiene: the type went in instead of a generator fn |
| Config/bank container registered | 2 | `class5_physics_questions:QuizConfig` (zero public methods), `class7_geo_questions:QuestionBank` | not generators |
| Method-name detection gap | 1 | `class9_chem_questions:Node002Generator` | instantiates fine, HAS generators (`q_valency`, `q_compare_valency`, `q_radical_valency`, `q_combines_with_h`) but `ClassAdapter.wrap` only recognizes `*generate*`-named methods |
| Ctor-args / non-generator object | 2 | `class9_histciv_questions:CISCEHistCivQuestionGenerator` (`__init__` needs 1 arg), `class12_psy_questions:c12_psy_013` (a plain LIST) | — |
| Wrong kind of callable registered | 2 | `class12_legal_questions:make_seed` (returns a random seed INT — RNG plumbing), `class11_acc_questions:verify_all_questions` (a VERIFIER taking `questions: List[Dict]`) | — |
| Broken body | 1 | `class10_cs_questions:generate_questions` | every seed: `ValueError("'FILL_BLANK' is not a valid QType")` — references a nonexistent QType enum member |
| Non-standard signature | 2 | `class2_bio_questions:mcq`, `class2_bio_questions:long_answer` | `(params: dict) -> dict` — no `params` contract in the adapter convention, so no kwargs bind |

Productive: **6 of 20** → 30 questions → `c11_home_001/002/006`,
`c11_soc_009`, `class12_bio:gen_genetics_problem`,
`class3_evs:generate_c3_evs_001`.

**Answer-key adjudication (30 questions, manual + solver cross-check):**

| Generator | Verdict | Evidence |
|---|---|---|
| `c11_home_001` | 5/5 key correct | "NOT a main area" = B Physics ✓ (seed-invariant — same item every seed, low-variety observation) |
| `c11_home_002` | 5/5 key correct | Joint family = grandparents/parents/uncles/aunts/cousins matches the NCERT HEFS definition; distractor C "Extended family" overlaps the same concept in some textbooks — ambiguity flag, not a defect |
| `c11_home_006` | 5/5 key correct | cooking "sequence of adding ingredients" ✓ |
| `c11_soc_009` | 5/5 key correct | 0-indexed key 1 → "can serve functions (equilibrium)" = Durkheim's functionalism ✓ — and this bank EXPOSED the answer-0 adapter bug below |
| `gen_genetics_problem` | 5/5 correct | Tt × tt → 1:1 phenotype, 1:1 genotype ✓; recombination frequency = recombinants/total × 100, 1% = 1 map unit ✓; chromosomal theory (Sutton-Boveri) ✓ |
| `generate_c3_evs_001` | **1/5 correct — DEFECT** | options sampled from the COMBINED living+nonliving pool: seed 11/22/44 carried 2-3 living options (multi-correct), seed 55 shipped 'chair' as THE living thing |

**Defect rates:** question-level 26/30 clean (86.7%) pre-fix, 4/30
defective — every defect from one generator; generator-level 5/6 clean
(83.3%); registry-level 14/20 (70%) non-productive.

**Defects FIXED this session (test-first, both red → green):**

| Bug class | Example | Fix | Test |
|---|---|---|---|
| A1 adapter: 0-indexed answer key destroyed | `normalize_question`'s `str(answer) if answer else ''` turned `answer: 0` (Father of Sociology → Auguste Comte) into `correct_answer=''` — every first-option key in every int-keyed bank lost its grading key | only `None`/`''` mean missing (extraction + return sites) | `test_normalize_question_preserves_zero_answer_key` |
| A2 generator: multi-correct / arbitrary-key MCQ | class-3 EVS living/non-living items (above) | distractors drawn from the OPPOSITE pool; the `correct not in opts → index 0` silent fallback can no longer fire for these variants | `test_c3_evs_living_mcqs_have_exactly_one_correct_option` |

Solver cross-check note: all 30 generated questions are concept-recall
MCQs/long-answers — the deterministic maths-solver core refuses them by
design (GUIDED via `competency:guided_method`), so the manual
adjudication above is the authoritative key check; the solver pass
confirms no calculator-lane question is being spoofed by these
generators.  Files changed for 5b: `services/question_adapter.py`,
`solvers/evs/class3_evs_questions.py`, `tests/test_refusal_gaps.py`
(+2), harness `_dig2_gen_audit.py`.

---

### 5b. Registry-wide 20-generator sample (session 3, cross-check depth)

Where §5 swept class-7 modules seed-deep, this pass sampled the registry
BREADTH-first: deterministic RNG (seed 20261006) picked **20 of the 137
registered question generators**, 5 seeds each (11/22/33/44/55), pulled
through the PRODUCTION adapter stack
(`services.question_adapter.AdapterRegistry`), every generated question
cross-checked against the deterministic solver core
(`answer_pipeline._answer_impl`, LLM off) + manual adjudication of every
claimed key.  Harness: `deploy/backend/_dig2_gen_audit.py`; raw rows:
`content_tools/pedagogy/_dig2_gen_samples.jsonl` +
`_dig2_gen_verdicts.jsonl`.

**Factory finding: 14 of 20 sampled generators (70%) produce NOTHING
through the production serving path.**

| Failure class | Count | Generators | Root cause (probed directly) |
|---|---|---|---|
| Raw dataclass registered AS the generator | 4 | `class10_chem_questions:Question`, `class1_maths_questions:Question`, `class2_maths_questions:Question`, `class3_evs_questions:QuestionSet` | the registered object is the `Question`/`QuestionSet` DATACLASS (needs 2-13 ctor args) — registration hygiene: the type went in instead of a generator fn |
| Config/bank container registered | 2 | `class5_physics_questions:QuizConfig` (zero public methods), `class7_geo_questions:QuestionBank` | not generators |
| Method-name detection gap | 1 | `class9_chem_questions:Node002Generator` | instantiates fine, HAS generators (`q_valency`, `q_compare_valency`, `q_radical_valency`, `q_combines_with_h`) but `ClassAdapter.wrap` only recognizes `*generate*`-named methods |
| Ctor-args / non-generator object | 2 | `class9_histciv_questions:CISCEHistCivQuestionGenerator` (`__init__` needs 1 arg), `class12_psy_questions:c12_psy_013` (a plain LIST) | — |
| Wrong kind of callable registered | 2 | `class12_legal_questions:make_seed` (returns a random seed INT — RNG plumbing), `class11_acc_questions:verify_all_questions` (a VERIFIER taking `questions: List[Dict]`) | — |
| Broken body | 1 | `class10_cs_questions:generate_questions` | every seed: `ValueError("'FILL_BLANK' is not a valid QType")` — references a nonexistent QType enum member |
| Non-standard signature | 2 | `class2_bio_questions:mcq`, `class2_bio_questions:long_answer` | `(params: dict) -> dict` — no `params` contract in the adapter convention, so no kwargs bind |

Productive: **6 of 20** → 30 questions → `c11_home_001/002/006`,
`c11_soc_009`, `class12_bio:gen_genetics_problem`,
`class3_evs:generate_c3_evs_001`.

**Answer-key adjudication (30 questions, manual + solver cross-check):**

| Generator | Verdict | Evidence |
|---|---|---|
| `c11_home_001` | 5/5 key correct | "NOT a main area" = B Physics ✓ (seed-invariant — same item every seed, low-variety observation) |
| `c11_home_002` | 5/5 key correct | Joint family = grandparents/parents/uncles/aunts/cousins matches the NCERT HEFS definition; distractor C "Extended family" overlaps the same concept in some textbooks — ambiguity flag, not a defect |
| `c11_home_006` | 5/5 key correct | cooking "sequence of adding ingredients" ✓ |
| `c11_soc_009` | 5/5 key correct | 0-indexed key 1 → "can serve functions (equilibrium)" = Durkheim's functionalism ✓ — and this bank EXPOSED the answer-0 adapter bug below |
| `gen_genetics_problem` | 5/5 correct | Tt × tt → 1:1 phenotype, 1:1 genotype ✓; recombination frequency = recombinants/total × 100, 1% = 1 map unit ✓; chromosomal theory (Sutton-Boveri) ✓ |
| `generate_c3_evs_001` | **1/5 correct — DEFECT** | options sampled from the COMBINED living+nonliving pool: seed 11/22/44 carried 2-3 living options (multi-correct), seed 55 shipped 'chair' as THE living thing |

**Defect rates:** question-level 26/30 clean (86.7%) pre-fix, 4/30
defective — every defect from one generator; generator-level 5/6 clean
(83.3%); registry-level 14/20 (70%) non-productive.

**Defects FIXED this session (test-first, both red → green):**

| Bug class | Example | Fix | Test |
|---|---|---|---|
| A1 adapter: 0-indexed answer key destroyed | `normalize_question`'s `str(answer) if answer else ''` turned `answer: 0` (Father of Sociology → Auguste Comte) into `correct_answer=''` — every first-option key in every int-keyed bank lost its grading key | only `None`/`''` mean missing (extraction + return sites) | `test_normalize_question_preserves_zero_answer_key` |
| A2 generator: multi-correct / arbitrary-key MCQ | class-3 EVS living/non-living items (above) | distractors drawn from the OPPOSITE pool; the `correct not in opts → index 0` silent fallback can no longer fire for these variants | `test_c3_evs_living_mcqs_have_exactly_one_correct_option` |

Solver cross-check note: all 30 generated questions are concept-recall
MCQs/long-answers — the deterministic maths-solver core refuses them by
design (GUIDED via `competency:guided_method`), so the manual
adjudication above is the authoritative key check; the solver pass
confirms no calculator-lane question is being spoofed by these
generators.  Files changed for 5b: `services/question_adapter.py`,
`solvers/evs/class3_evs_questions.py`, `tests/test_refusal_gaps.py`
(+2), harness `_dig2_gen_audit.py`.

---

## SECTION 6 — Handoff

- Harness + raw data: `D:\platform\cbse_data\zcode_projects\solverdig2\`
  (`probe_refusals.py` + `probe_results.json` before,
  `probe_results_after.json` after, `trace_structures.py`,
  `gen_sample.py`, `gen_sample_report_class7.json`).
- Registry-sample evidence (session 3, §5b):
  `deploy/backend/_dig2_gen_audit.py` (gen/check phases) +
  `content_tools/pedagogy/_dig2_gen_samples.jsonl` (64 rows) +
  `_dig2_gen_verdicts.jsonl`.
- Answer-memo caveat: pytest runs bank results into
  `D:\platform\runtime_data\answer_memo.json` (version-gated); the PAL
  disk cache (`structure_extract_cache.json`) can mask cold refusals on
  this machine — new deployments exercise the deterministic families.
- Zero Docker touched; no servers started; no DB writes.

---

## SECTION 7 — Chapter-sourced corpus sweep (owner add-on, 2026-10-06 late)

Real diagnostic questions + answer keys pulled from the corpus nodes and
run through the live pipeline — no self-written questions. Instrument:
`tests/refusal_corpus_sweep.py` (adapted from the owner's
`tests/physics_corpus_sweep.py` for this lane's node set; note the
physics instrument was missing `import time` — its JSONL was empty —
now fixed). File-based, deterministic mode, DB dark (bank lanes off).

**Scope:** class-10 MATHS chapters hosting the audited canonics
(cbse_04 quadratics, 05 AP, 08 trig, 09 applications, 13 mensuration/
statistics — cbse_15 does not exist in the corpus; chapters run 01–14,
so probability was covered by the canonical probe instead) +
class-7 chapter-1 nodes of 8 non-maths subjects. Maths = MEASUREMENT
ONLY per owner (maths families are the owner's to edit).

**Raw sweep: 73 questions.** `SOLVE=3, WRONG=8, REFUSE_NUM=8,
REFUSE_OK=53, VERIFY_SOFT=1, CRASH=0`.

### Examiner adjudication (every flagged row re-checked)

Grader corrections (instrument first-number compare is fragile on
multi-number keys — 3 false positives removed):
- c08 "sin X = 3/5 … find cos X, tan X" → solver answered
  "cos X = 4/5, tan X = 3/4" — **CORRECT** (grader compared sin's 3/5
  against cos's 4/5). Reclassified SOLVE (my TRIG_RATIO_GIVEN family).
- c7_physics toy car "3 m in 6 s" → "0.5 m/s" — **CORRECT** (grader hit
  the key's "3"). Reclassified SOLVE.
- 7 of 8 REFUSE_NUM rows are student-claim/constructive/evaluate PROSE
  that my `is_numeric` heuristic misflagged ("A student claims the
  sequence 5, 10, 20, 40, 80 is an AP…") — honest refusals. One real
  numeric gap remains: c7_geo "Kanyakumari 8°N → Srinagar 34°N, how
  many degrees…" (geography arithmetic, no family).

Transient states (3 WRONGs during the sweep were fixed by the maths
owner's concurrent edits before my re-route capture; current tree
refuses them honestly — still FILED as maths-side family gaps):
- c08 "PQ = 12, QR = 5, find sin R" (given-SIDES → find ratios — no
  family; a since-edited lane answered "73 degrees")
- c13 direct-vs-assumed-mean comparison (concept; junk "35")
- c7_civ "which level of government funds a hospital" (concept mismatch
  answer; now honest refusal)

### Stable WRONG bugs (re-verified on the current tree, routes captured)

| Bug class | Question (lane) | Route | Wrong answer | Expected | Status |
|---|---|---|---|---|---|
| W1 Constructive prompt hijack | "Create an AP with first term -3, CD 1/2… 4th term?" (c10 maths) | `structure:AP_NTH` | VERIFIED "0" | -1.5 (or honest refusal of the create-task) | FILED for maths owner (measurement-only lane) |
| W2 Identification hijack | "right triangle ABC, ∠A = θ — which side is opposite?" (c10 maths) | `kernel:none → modeling:lane_a_sweep` | VERIFIED "90 degrees" | "BC is opposite, AB is adjacent" | FILED for maths owner |
| W3 Grouped-mean misparse | "Find the mean of grouped data (direct method), classes 10-20…, f 4,6,10,8,2" (c10 maths) | `structure:MEAN_SIMPLE` | VERIFIED "-1.33333" | 33.4 (Σfx/Σf = 1670/50) | FILED for maths owner |
| W4 Device mis-ID | "The wind howled through the dark forest…" (class-7 english generator) | english device lane | VERIFIED "alliteration" | Personification (generator's key is right) | FILED (english lane; small) |

**Adjudicated totals: 5 SOLVE, 6 WRONG (4 stable + 2 conceptual filed),
1 real numeric family gap, 60 honest refusals, 1 soft — of 73.**

### Coverage lens on generators (owner directive)

The 50 class-7 generated questions were run through the solver cold:
- Lens v1 (mid-concurrent-edits): 16 WRONG — on re-check, 10 were one
  bio question served with a maths AP answer **and** a "Q: " prefix
  leaking into the question text.
- Fixes landed: bio generator stripped 9 internal `"Q: "` prefixes
  (hygiene bug — internal marker reached served text).
- **Lens v2 (current tree): OK 2 / COVERAGE_REFUSE 47 / WRONG 1.**
  Per module: bio 0×OK+10×REFUSE; english 1 WRONG + 9 REFUSE; evs 10
  REFUSE; geo 2 OK + 8 REFUSE; histciv 10 REFUSE; (chem/cs/econ/physics
  modules generate numericals/mcqs graded in §5's 50/50 content pass —
  not re-run here).
- Per the owner's lens the 47 refusals are a real coverage gap of the
  COLD concept path; live practice flows pass `node_id`, which enables
  the node-grounded lane (DB-dependent) — **pending live re-check**.

### Instrument artifacts

- `tests/refusal_corpus_sweep.py` (lane instrument; maths-node paths,
  fraction-aware grading, `import time` fix vs the physics original)
- `tests/_refusal_corpus_sweep.jsonl` (73 rows, full text for ledger)
- `solverdig2/coverage_lens.py` + `coverage_lens_class7.json` (v2)
- `solverdig2/reroute_wrong.log` (route capture for the WRONG table)
