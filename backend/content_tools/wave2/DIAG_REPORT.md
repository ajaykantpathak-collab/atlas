# DIAG-FIX Report — legacy diagnostic-slot artifacts, CBSE classes 6–8

**Agent:** DIAG-FIX · **Date:** 2026-10-05 · **Corpus:** `deploy/content/enhanced_nodes_md/`
**Lane:** W1's actionable set — all `c6_*`/`c7_*`/`c8_*` non-`_comp` teaching nodes of the
bio/chem/civ/eco/geo/hist/math/physics families = **1,320 nodes, 13,550 diagnostic pairs**.
Parked families (hin/english/engl/gram) measured only, never touched (owner decision 2026-09-29).
Zero Docker, zero Postgres, zero LLM — every stem authored by hand in NCERT register.

---

## 1. Headline

| Metric | Before | After |
|---|---|---|
| True answer-in-question slots (student-visible) | **30** | **0** |
| True dead-stem slots (no prompt anywhere) | 2 (inside the 30) | **0** |
| Sub-4-word stems | 5 | **0** |
| Empty/placeholder stems | 0 | **0** |
| Answer-key leaks in question text (token-subset candidates) | 30 candidates | 25 candidates, **0 true** after hand adjudication (§3) |
| Files repaired | — | **26 files, 35 slots** |
| W1 8-check rubric (actionable lane) | 1,320/1,320 at 10/10 | **1,320/1,320 at 10/10** (no regression) |
| Below W1 minimum-viable bar | 0 | **0** |

## 2. True counts vs W1's estimates (why the numbers moved)

W1 §6 estimated ≈749 suspect nodes / ≈900 stems / 43 hard swaps / 5 too-short. Exhaustive
scanning (`diag/scan_diag_artifacts.py`, refined `diag/scan_diag_artifacts2.py`) over all
13,550 pairs gives the real picture:

| W1 estimate | Scanner truth | Adjudication |
|---|---|---|
| "43 hard slot-swaps" | **43 flagged → 30 true** | 13 of the 43 are legitimate evaluate-the-student's-work prompts that merely contain the phrase "correct answer" (e.g. "identify the error and give the correct answer") — question-shaped, not artifacts. W1's slop regex fired on the imperative, not on a leak. |
| "833 question slots not shaped as questions" | **10 flagged → 2 true** | W1's Q-word list matched only stem-STARTERS. Extending the prompt check to anywhere-in-stem (group / distinguish / defend / order / critique / mark / propose / draft / trace …) shows the overwhelming majority are valid imperative tasks ("Propose a …", "Order these numbers …", "A student walks 20 m … Calculate the speed."). Only 2 slots were genuinely dead commentary — both inside the swap set. |
| "≈900 empty stems" | **0 empty** | No slot in the actionable lane has an empty/placeholder body. The ~900 figure was the sum of heuristic misses above, not authored-empty slots. |
| "5 too-short slots" | **5 true** | Exact match ("What is wind?"). |
| "answer-token ⊂ question" (brief's P0 detector) | **30 candidates → 0 true** | See §3. |

**Repair set: 35 slots across 26 files** — 24 authored stems (swap, stem unrecoverable),
5 trims (genuine question restored, leaked answer-tail dropped — all in `c6_physics_ch08_034`),
1 coherent re-author (same file #5: surviving stem offered "seconds or hours" while its own key
answers "minutes"), 5 minimal extensions of sub-4-word stems with a second clause the existing
key already answers. **Answer keys untouched everywhere** — every fix rewrote only
`DIAGNOSTIC_QUESTION_n`; every authored stem is matched to its surviving key by hand.

## 3. KEY_LEAK adjudication ledger (the brief's token-subset detector)

The token test (all content tokens of the answer's first line present in the question) is a
candidate generator, not a verdict: it cannot tell a declarative reveal ("…is called
photosynthesis. What is this process called?") from task furniture. A dedicated grep for the
declarative-reveal shape (`is called X … What is this …`) found **0 hits lane-wide**. All 30
v2 candidates were then read individually; the 25 that remain flagged under verify semantics
are:

- **MCQs** — options printed in the stem, key restates the chosen option (`c8_hist_ch2_10`
  #1–6, numbered options; `c8_geo_ch2_9` #1–5, letter options — auto-exempted in verify):
  picking-the-letter is the task; by design.
- **Numericals restating givens** — answer head repeats the stem's given values before
  computing a result the stem does not contain (`c7_physics_ch02_005` #3, `c7_physics_ch04_007`
  #3, `c8_math_ch11_2` #3, `c8_math_ch13_3` #3, `c8_math_ch1_1` #3, `c8_math_ch1_11` #3,
  `c8_math_ch2_2` #3).
- **Property-equality asks** — the tested property makes the answer equal a *differently
  labelled* given (`c7_math_ch05_003` #3, `c7_math_ch05_008` #3: vertically opposite /
  alternate interior angles; knowing ∠AOC = 65° does not hand over ∠BOD).
- **Open construction / evaluation tasks** — stem asks the student to design, construct,
  reorder or judge; the key is one valid response (`c7_chem_ch01_011` #6, `c7_math_ch01_005`
  #3 reorder, `c7_math_ch05_005` #5, `c7_math_ch06_003` #3, `c7_math_ch10_010` #3,
  `c7_math_ch11_002` #6, `c7_math_ch13_010` #6, `c7_physics_ch05_009` #3+#5, `c8_eco_ch2_5` #1).

**Verdict: 0 true answer-in-question leaks.** No student sees an answer inside a question.

## 4. Method

1. **Scan** — `diag/scan_diag_artifacts.py` (v1, 933 hits) → hand-read every class →
   `diag/scan_diag_artifacts2.py` (v2 semantics: prompt-anywhere shape, MCQ exemption;
   86 slots / 67 nodes flagged) → per-slot manual adjudication → 35-slot repair set.
   Declarative-leak grep across all c6–8 files: 0.
2. **Author** — each stem written against the node's DEFINITION/topic and its surviving
   answer key; class-appropriate register; no yes/no-only items (every stem demands reasons,
   steps, construction or evaluation); no stem reveals its key; house banned strings and
   W1 slop phrases avoided in payload text. `diag/build_payload.py` emits the JSON.
3. **Apply** — `wave2/apply_wave2.py` (house digest-guarded applier, `set_diag` op):
   backups to `diag/backups_diag/`, manifest `diag/diag_apply_manifest.jsonl`.
   Dry-run first: `applied=26 failed=0`; real run: `applied=26 failed=0`.
4. **Verify independently** — `diag/verify_diag.py` (does NOT reuse the applier's digest
   code): GATE1 re-splits backup vs current with its own splitter and allows diffs only in
   manifest-named `DIAGNOSTIC_QUESTION_n` bodies → **26/26 files, 0 fails, section structure
   identical**; GATE2 full-lane re-scan → **SLOT_SWAP=0, EMPTY_STEM=0, TOO_SHORT=0,
   NO_PROMPT=0** (KEY_LEAK 25 candidates = adjudicated §3). VERDICT: **GREEN**.
5. **Regression** — W1's own `scan_wave2_rubric.py` re-run: actionable lane **1,320/1,320 at
   8/8 checks, 0 below min-bar**; parked-lane fail counts byte-identical to W1's report
   (WALKTHROUGH 697, DIAGNOSTICS 305, DEFINITION 139, ELI5 57, MISCONCEPTION 6, HYGIENE 3) —
   nothing parked was modified.

## 5. Fix ledger (35 slots)

| File | Slot | New stem (abridged) |
|---|---|---|
| `c6_chemistry_ch06_002` | 1 | What is sedimentation? How is it different from dissolving? *(extend)* |
| `c6_civics_ch12_022` | 3 | Which level of government should residents approach for contaminated water/overflowing drains? Give reasons. |
| `c6_civics_ch14_029` | 3 | How might a Malayalam-speaking family's everyday language use change after moving to Punjab? |
| `c6_civics_ch16_040` | 3 | Which workers' right is violated when machines are operated near exposed wires with no safety equipment? |
| `c6_geography_ch02_011` | 1 | What is wind? Is it a substance present in the air or a movement of the air itself? *(extend)* |
| `c6_geography_ch06_002` | 2 | What are latitudes? Which latitude is fixed at 0°? *(extend)* |
| `c6_geography_ch06_002` | 3 | What are longitudes? Which longitude is fixed at 0°? *(extend)* |
| `c6_history_ch07_021` | 3 | The Sultanate began 1206 CE and ended 1526 CE — for how many years did it last? Show steps. |
| `c6_history_ch09_037` | 3 | What happened to Shah Jahan after the War of Succession, and where did he spend his final years? |
| `c6_math_ch01_001` | 2 | In the height game, what does the label '2' tell you about a student's place in the line? |
| `c6_math_ch01_001` | 3 | Rearrange 200/800/500 so exactly one cell is a supercell — which number, and why not the others? |
| `c6_math_ch01_001` | 4 | Count exactly or estimate a moving crowd of thousands? Justify. |
| `c6_math_ch01_001` | 5 | Can the difference of two 5-digit numbers be a 3-digit number? Construct an example or explain why not. |
| `c6_math_ch05_057` | 2 | Why is dividing by 3 correct when solving 3x = 15, and which balance principle is at work? |
| `c6_math_ch06_062` | 2 | Write red:blue for 10 red and 15 blue balls; why must the order of a ratio match the stated order? |
| `c6_math_ch10_112` | 2 | Explain why a cut through folded paper repeats on the other side of the crease. |
| `c6_physics_ch08_034` | 1 | What is the basic SI unit of time? *(trim)* |
| `c6_physics_ch08_034` | 2 | If you have 120 seconds, how many minutes do you have? *(trim)* |
| `c6_physics_ch08_034` | 3 | A race lasts 3 hours — how many minutes is this? *(trim)* |
| `c6_physics_ch08_034` | 4 | Which is larger: a millennium or a century? *(trim)* |
| `c6_physics_ch08_034` | 5 | Most convenient unit for the walk to school — seconds, minutes or hours? Give a reason. *(re-author; old stem's options contradicted its own key)* |
| `c6_physics_ch08_034` | 6 | Create a scenario where a millisecond would be necessary. *(trim)* |
| `c6_physics_ch11_035` | 3 | A classmate calls a firefly artificial because it glows at night — agree? Give reasons. |
| `c7_chem_ch02_011` | 6 | Heating blue copper sulphate turns it white — classmate calls it a chemical change; accept? Justify with a test. |
| `c7_eco_ch02_005` | 6 | How would paving the weekly market ground and charging fees affect mobile vendors and rural consumers? |
| `c7_geo_ch01_003` | 5 | Compare formation of the Himalayas vs the Northern Plains — endogenic or exogenic force in each? |
| `c7_geo_ch02_004` | 1 | What is humidity? What does the air contain more of when humidity is high? *(extend)* |
| `c7_hist_ch02_009` | 6 | Why does Megasthenes' seven-fold division not match the four-fold varna system exactly? |
| `c7_hist_ch08_004` | 6 | "Jewish communities settled in India only under British rule" — accurate? Support with evidence. |
| `c7_hist_ch08_009` | 5 | What does shared motifs and inter-faith festival participation suggest about medieval Indian society? |
| `c7_math_ch09_009` | 6 | From △ PQR ≅ △ STU a classmate concludes ∠P = ∠U — justified? Explain the vertex correspondence. |
| `c7_math_ch15_006` | 6 | Priya writes −x = 7 and answers x = 7 — error? Identify the faulty step and correct value. |
| `c8_civ_ch4_1` | 5 | A tax-paying foreign national demands voting rights — distinguish resident vs citizen; accept the demand? |
| `c8_civ_ch4_12` | 5 | Ravi votes but does nothing else civic — active citizen in the full sense? Distinguish active vs passive. |
| `c8_eco_ch2_4` | 5 | Same population size, different age/education mix — identical for a planner? Use population structure. |

Every row kept its pre-existing `DIAGNOSTIC_ANSWER_n` byte-identical (proven by GATE1).

## 6. Honest residuals

- **Scanner candidate flags that remain by design:** re-running the v2 candidate generator on
  the repaired corpus still lists 13 "SLOT_SWAP" flags (the evaluate-the-work prompts whose
  imperative legitimately contains the phrase "correct answer"), 8 "NO_PROMPT" flags (valid
  prompts with starters — Group / Distinguish / Defend / Order / Critique / Mark — outside the
  generator's narrower starter list) and 25 "KEY_LEAK" candidates (§3). These are the known
  false-positive classes of the *generator*; the final-semantics gate (`verify_diag.py`,
  prompt-anywhere + true-swap + MCQ-exempt + hand adjudication) reads **0** on all of them.
- **KEY_LEAK candidates (25)** are flagged forever by the token test by design; they are
  adjudicated in §3 and the verify gate treats them as review items, not hard fails. Any
  future content wave should re-run `diag/verify_diag.py` and re-adjudicate new candidates.
- **Parked lanes untouched** — hin/english/engl/gram c6–8 nodes still carry their measured
  defects (W1 §5); relaunching requires an owner go.
- Nothing in this batch required Docker/Postgres: `.md` changes are bind-mounted and the
  learn-page diagnostics render from these files directly.

## 7. Artifacts

| File | Purpose |
|---|---|
| `wave2/diag/scan_diag_artifacts.py` | v1 scanner (raw counts, reconciles W1's estimates) |
| `wave2/diag/scan_diag_artifacts2.py` | v2 scanner (final detection semantics; pre-fix state = `diag/diag_scan2.jsonl`, 86 slots / 67 nodes) |
| `wave2/diag/build_payload.py` | Authored payload generator (35 slots embedded) → `diag_payload.json` |
| `wave2/diag/apply_diag` run via `wave2/apply_wave2.py` | Digest-guarded applier (house pattern; `set_diag` op) |
| `wave2/diag/backups_diag/` | Pre-edit copies of all 26 touched files |
| `wave2/diag/diag_apply_manifest.jsonl` | 26 edit rows with untouched-region digests |
| `wave2/diag/verify_diag.py` | Independent GATE1 backup-diff + GATE2 full-lane re-scan |
| `wave2/diag/rubric_rescan/w1_scores.jsonl` | Post-fix W1 rubric scores (1,320/1,320 at 10/10) |
