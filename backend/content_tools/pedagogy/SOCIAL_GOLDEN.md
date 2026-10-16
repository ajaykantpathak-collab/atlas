# SOCIAL_GOLDEN.md — the social-science lanes (geography / economics)

*Owner: SOCIAL-GOLDEN batch, 2026-10-06/07 — geography + economics lanes
complete (civics parked). Model: `GOLDEN_HIST.md` (the humanities
honest-refusal contract); bar: class-7-maths depth (hand-curated REAL board
questions, examiner grading, bug tables in "Bug class | Examples | Status"
format, ~10 bug classes per class).*

**Batch scoreboard:** golden path **21/21 stations** (`tests/
test_social_golden.py`, run8) · corpus sweep **118 REAL pairs, 14 lanes,
WRONG = 0** (`tests/social_corpus_sweep.py`, run5) · family unit pins
**29/29** (`tests/test_social_econ_families.py`) · socsci families
**54/54** · history cross-lane **17/17** · **9 solver bug classes fixed**
(5 of them VERIFIED-wrong, the app-killing class), all corpus-keyed and
pinned by regression.

Scope: **geography + economics**, classes 6-12. Civics is OUT OF SCOPE for this
batch (content-filter constraints — parked gap, §6); the civics facts already
landed in the shared `FACT_RECALL` table (2026-10-06 wave) stay. History is
GOLDEN-HIST's lane (its `EVENT_YEAR` entries in `socsci_families.py` are
shared, read-only to this batch — additive edits only). Maths/physics/chem/bio
are other agents'.

Environment constraints this batch: Docker OFF. **Postgres: reported DOWN in
the brief, found UP during the run — the golden path runs its DB stations live
when reachable and auto-degrades to in-process-only (stations marked
`PENDING live re-check`) when not.** Family/grading stations are in-process
file-based and never needed the DB.

---

## 1. What landed (running log)

### 1.1 Learnpaths (services/learnpath_builder.py — additive)
- `SUBJECT_ALIASES += geo/geography→geography, civ/civics→civics,
  eco/econ/economics→economics`; `SUBJECT_STEM_VARIANTS` extended to match;
  `DEFAULT_SUBJECTS` extended (mirrors `question_selector` vocabulary).
- Deliberately NOT mapped: `soc` (c11_soc/c12_soc is **sociology**, not
  civics), `ps` (c11_ps/c12_ps political science is tagged
  `physical_education` in the selector vocabulary — owner call pending,
  documented in §5 gaps).
- Generated: **132 chapter paths, 1,212 lessons** (geo 72 chapters classes
  6-12; civics 20 chapters classes 6-10; economics 40 chapters classes 6-12;
  c6 economics is a single ch-11 pack). 3 chapters needed cycle-breaks (8).
- `_index.json` merged, not clobbered (existing 48 rows preserved + new).

### 1.2 Solver-side facts (its/solver/socsci_families.py — additive)
- NEW `FACT_RECALL` family (this batch): closed-world fact tables
  (`_GEO_FACTS`, `_CIV_FACTS`, `_ECO_FACTS`) mined from the authored corpus —
  same contract as `EVENT_YEAR`: aliases are specific multi-word phrases;
  an unknown fact is declined (gate), never guessed. Details in §2.
- `EVENT_YEAR` history entries untouched.

### 1.3 Cross-lane perf fix (its/solver/pal_templates.py)
- **Bug:** `match_program`'s paraphrase scan re-embedded BOTH sides of every
  `_sim()` call — with ~220 stored PAL shapes that was ~440 MiniLM encodes
  per question = **20-30 s per served question** (profile: 45 s of 55 s in
  `_E` under two probe questions).
- **Fix (additive):** per-text embedding memo (`_TEXT_EMB`, capped 8192) in
  `_embed`. No similarity value changes — same vectors, computed once.
- Effect (measured, cold process): first question 72 s (model load + one
  embed per stored shape), every later question **~1 s**.

### 1.4 Solver bugs caught and fixed (socsci_families.py)

| Bug | Evidence | Fix | Regression |
|---|---|---|---|
| **VERIFIED-wrong (worst class):** "time at 90°E when it is 12 noon at Greenwich" shipped **12:30 PM** — the mode-2 reference fell back to the IST meridian (82°30'E) because Greenwich was unknown | golden-path probe, first batch sweep of timezone probes | Greenwich / prime meridian recognised as the 0° reference (`gm` guard in `_c_timezone` mode 2); anchor note + assumptions now state the actual anchor | family probes: 90°E noon → **6:00 PM**; all 54 existing socsci family tests pass |
| **Family gate hole:** "A town has 50,000 **people** and covers 250 sq km. Calculate the density" REFUSED — content gate accepted "people" but the population lookup only read "population" | probe (corpus-realistic wording) | `_count_near` over `population|people|persons|inhabitants|residents` | density probes 200 / 3,000 persons per sq km solved; family tests pass |
| **Dead-end refusal:** "What is GDP?" — the neurolink concept pre-route served a correct but 396-char narrative VERIFIED, which the prose-essay guard stripped to GUIDED with "model answer is below" and **no model answer attached** (early return skips the attachment block) | full-pipeline probe, audit route `ask_shape:prose_essay_refused`, lane A | neurolink **stands down** when `socsci_families.fact_recall_match(text)` is not None (new public hook); the deterministic family owns the fact with a <200-char corpus-cited answer | "Define ultrasound" (non-social) unchanged — bio-lane contract accepts verified-or-honest-refusal; hist EVENT_YEAR probes unchanged |

### 1.5 neurolink stand-down mechanics
- `fact_recall_match(text)` (socsci_families, public): the exact gate logic of
  `_c_fact_recall` (compute-ask guard, number-crowding guard, longest-alias
  match, world-scope qualifier override) reduced to `Optional[str]`.
- `answer_pipeline` pre-route: `_nl_res = None if _socsci_fact_owned(text)
  else _nl.fast_solve(text)` — fail-open (any import/regex error → neurolink
  runs as before).

### 1.6 Wave 2 (2026-10-07, this session): solver bugs caught and fixed

| Bug | Evidence | Fix | Regression |
|---|---|---|---|
| **VERIFIED-wrong (worst class):** "A map has a scale of 1 cm = 5 km. Two cities are 6 cm apart…" shipped **"5" VERIFIED** — the kernel's equation models read the statement scale `1 cm = 5 km` as the equation `cm = 5` and served the scale factor instead of the 30 km ground distance | golden-path probe `tests/test_social_golden.py` 3c; step trace `"A - 5 = 0 -> A = 5"` (math_kernel equation model) | **map-scale ownership gate** in `math_kernel.py` (same precedent as the friction / potential-energy gates): `\bmap\b` + a statement-scale or R.F. clause → kernel declines, socsci `MAP_SCALE` (calibration resistance 0.94) answers | map fwd `6 cm → 30 km`, reverse `20 km → 5 cm`, R.F. `3.5 cm @ 1:50000 → 1.75 km` all VERIFIED-correct; `Solve 2x+6=20 → 7` unchanged; 54/54 `its/tests/test_socsci_families.py` pass |
| **Gate hole:** "1 cm **to** 5 km" (bare-word board phrasing of a statement scale) gated `MAP_SCALE` out entirely → dead-end refusal | same probe family | `_c_scale` statement-scale regex accepts `=` / `:` / `represents` / **`to`** | "On a map whose scale is 1 cm to 5 km, two towns are 6 cm apart" → VERIFIED 30 km (was GUIDED-refuse) |
| **Teach-back loss on calibrated withhold:** families below the flywheel trap-resistance floor (e.g. `POP_DENSITY` 0.5 < 0.7) withhold their answer by contract but **keep their steps** ("the family still teaches, guided") — yet Lane A returned the kernel's empty steps, so the student got "method shown" with **no method** | density probe: GUIDED, answer None, **0 steps** (route `kernel:none → competency:guided_method`) | Lane A teach-back (`answer_pipeline._lane_a`): when the registry sweep was withheld (`note` contains "withheld") its method steps attach to the honest refusal; the answer stays withheld | density probe: GUIDED, answer None, **5 method steps** (Method/Given/Computation/Check/Interpretation) |
| **Cross-class bank leak (station 2b):** a class-10 economics practice batch served rows whose `node_tags` are **c6/c7 junior-econ nodes** — bank rows misfiled at ingestion. Census: **eco c10 = 753/1630 rows (46%) mismatched, eco c11 = 329/2095 (16%)**; geo/hist all 0; civ c9 = 157/691 (parked, out of scope) | golden station 2b: `leak=['c6_economics_ch08_006', 'c7_eco_ch04_004']`; SQL census `node_tags->>0 not like 'c'||class_level||'\_%'` | **CLASS-TAG GUARD** in `QuestionSelector._corpus_candidates` (serving gate, additive): when `class_level` is set, a row whose FIRST node_tag names another class is dropped (rows with no node_tags stay — no leak evidence). MCQ blend filtered too | golden 2b rerun: all 5 node_ids start `c10_eco`; pool still ample (877 clean c10 rows) |

Not bugs (documented, owner-owned): `POP_DENSITY` (0.5), `POP_GROWTH` (0.67),
`POP_DOUBLING` (0.67), `PED_TOTAL_OUTLAY` (0.67), `MAJORITY_COUNT` (civics,
0.43), `MPC_DELTA` (0.65), `INVESTMENT_MULTIPLIER` (0.0),
`PRICE_CONTROL_GAP` (0.55) are **release-gated** by
`services/release_calibration.json` (flywheel L4 trap-resistance floors) —
they answer as guided-with-steps, never verified, until recalibrated. The
social lanes' verified surface (`MAP_SCALE` 0.94, `TIME_ZONE_LONGITUDE`,
`VITAL_STATS` 1.0, `SEX_RATIO_LITERACY` 1.0, `CLIMATE_TABLE` 0.86,
`MARKET_EQUILIBRIUM` 1.0, `GDP_DEFLATOR` 1.0, `GDP_EXPENDITURE_ANY_MISSING`
0.92, `PED_PERCENTAGE` 1.0, `UNEMPLOYMENT_RATES` 1.0, `FACT_RECALL`) is
above the floor.

### 1.7 Wave 3 (2026-10-07, corpus-sweep WRONGs → new econ families)

The corpus sweep (`tests/social_corpus_sweep.py`) graded REAL diagnostic
pairs from the geo/eco corpus and found 4 VERIFIED-wrong economics rows —
every one fixed with a new closed-world family in
`its/solver/economics_families.py` (registered FIRST in a `_TABLE_SOCIAL`
block, additive; existing rows untouched):

| Corpus WRONG (verdict evidence) | What fired before | New family | Now |
|---|---|---|---|
| c9_eco_ch2_4: butter/margarine cross-price percentages — served **"25% increase"** (half the answer, wrong quantity) | `PED_PERCENTAGE` (own-price machinery) | `RELATED_ELASTICITY` (XED row): %ΔP + %ΔQ + sign classification | "25%, 40%, cross-price elasticity 1.6 (substitutes)" — the corpus key's exact three beats |
| c9_eco_ch2_6: income elasticity (bus tickets) — served **"99.86% decrease"** | `PED_PERCENTAGE` / percent chain | `RELATED_ELASTICITY` (YED row) | "income 66.67%, demand −33.33%, YED −0.5 (inferior good)" — exact key values |
| c11_eco_cbse_04_006: OJT bond net gain — served **"60000 (net +20%)"** (applied the productivity % to the COST) | Lane B `event_chain:percent_steps` narrative | `TRAINING_NET_GAIN`: months × monthly gain − cost | "Net gain 1,30,000 > 0, viable" — the corpus key's ₹1,80,000 − ₹50,000 |
| c12_eco_cbse_02_009: multivariate demand `Qd = 100 − 2P + 0.5Y − 3Ps` — served **"50"** (read only the leading `100 − 2P` fragment) | `DEMAND_Q_AT_P` (single-variable) | `DEMAND_MULTIVAR`: full linear evaluation + movement-along vs shift classification | "Initial 40; at P=25 → 30 (movement along); at Y=60 → 45 (rightward shift)" — exact key |

Comma-formatted money ("Rs 50,000") was itself a bug vector — the `_NUM`
scan read "50"; the new families parse `50,000` explicitly.

**Why four more ownership guards were needed beyond the new families** (each
family fired correctly standalone; the WRONGs came from *other* lanes
claiming the stems first — found by route-tracing `answer()`):

| Hijack lane | Symptom | Additive guard |
|---|---|---|
| `math_kernel` equation models (Lane A) | `Qd = 100 - 2P + 0.5Y - 3Ps` evaluated as the leading fragment → **50** | kernel gate: `demand function/equation` + a RHS with ≥2 distinct variables → decline (socsci precedent: map-scale / PE gates) |
| `model_structure` fast path — wave spec `PERCENT_CHANGE` (conf 0.96 outranks every registry family) | butter stem answered **"25% increase"** (price leg only) | wave spec compute wrapped: `_c_percent_change_owned` declines when an income/other-good-price from/to change AND a demand from/to change coexist; plain "price rose from 200 to 250" maths still answers |
| Lane classifier (`classify`) | OJT bond stem routed to Lane B (event verbs), whose percent chain applied the 20% to the cost → **60000** | carve-out: training + bond + net-gain/viable ask → Lane A (same pattern as the commerce-intent carve-out) |
| registry data-coverage guard | TRAINING_NET_GAIN's steps consumed 50,000/15,000/12 but not the stem's 20% / 6-week / 1-year context numbers → 2 unconsumed values vetoed the promotion | the family's Interpretation step now states why each context number stays out of the money arithmetic (the corpus key's own implication) |

Format fidelity fixes: percentages print 2-dp ("66.67%", "-33.33%" — the
corpus keys' exact format; integer rounding broke key match) and rupee
amounts print Indian grouping ("₹1,30,000", not "130,000").

All four stems are pinned in the golden path (station 3d) so the families
regression-test on every run. 54/54 socsci family tests + econ verifier
routes pass after the additive block; history golden 17/17 (EVENT_YEAR
shared rows untouched).

### 1.8 Wave 4 (2026-10-07, sweep5 soft rows → two geography families)

| Corpus finding | Was | Fix | Now |
|---|---|---|---|
| c12_geo_cbse_02_005: CBR/CDR ask stated net migration and wanted the ACTUAL growth rate | CBR/CDR/natural served, migration leg silently dropped (verified-incomplete) | `VITAL_STATS_MIGRATION` family (registered before `VITAL_STATS`; gates unless migration is stated AND actual growth is asked) | CBR 18, CDR 8, natural 10, migration 4.8, **actual 14.8 per 1000** — the key's full chain |
| c9_geo_ch2_8: "mean deviation from the 30-year normal" | generic `STATS_MEAN_UNGROUPED` answered the plain mean ("Mean = 43"; the key wants 3) | `MEAN_DEVIATION` family (data run → deviations → mean; strict digit-grouping tokens so "2,50,000" and "June 1–5" never corrupt the data) **+ 0.97 specificity bump** — the generic mean family ties at 0.95 and wins registry-order ties | **Mean deviation = 3**; a plain "calculate the mean marks" ask still serves the mean |

Also: `MU_FROM_TU` trigger widened to the corpus's own "TU schedule"
abbreviation (the inline "Q=1 TU=10" schedule FORMAT still gates the
parser — documented gap §6.7).

---

## 2. The FACT_RECALL contract (geo/econ; civics rows shared, see §6)

Mirror of history's `EVENT_YEAR`: the deterministic engine only speaks when
the taught corpus contains the fact. Verified facts (all corpus-cited):

| Lane | Fact | Corpus anchor |
|---|---|---|
| geo | SW monsoon onset: Kerala ~1 June; season Jun-Sep; withdrawal Sep-Oct | c9_geo climate nodes ("arrives ... around the 1st of June"; "monsoon (June-September)"; "withdrawal (September-October)") |
| geo | India extent 8°4'N-37°6'N / 68°7'E-97°25'E; Tropic of Cancer 23°30'N; area 3.28 million sq km; 7th largest | c7_geo_ch01_001 ("coordinates run from..."; corpus ELI5) |
| geo | Nile = longest river (world); Amazon = largest by volume; Ganga system (Gangotri/Bhagirathi-Alaknanda, world's largest delta) | c6/c7 geo rivers nodes |
| geo | Andes = longest range (~7,000 km); Himalayas = highest (Everest 8,848 m, ~2,400 km) | c7_geo mountain nodes |
| geo | Pacific = largest ocean; Asia = largest continent; Australia = smallest continent | c6_geography realm nodes |
| civ | SIX fundamental rights, Articles 12-35; Art. 32 = constitutional remedies; Art. 19 = freedoms | c9_civ_ch1_4 (explicit) |
| civ | Universal adult franchise: vote at 18+ | c6/c7 civics franchise nodes |
| econ | GDP = money value of all FINAL goods & services produced within domestic territory in a year | c9/c10_eco (explicit definition) |
| econ | HDI = UNDP composite: health + education + income, 0-1 | c10_eco_cbse_01_006 area |
| econ | MGNREGA = 100 days guaranteed wage employment | c10_eco poverty/employment nodes |

Anything outside these tables (longest river of *India* as a ranked claim not
authored in the served nodes, exact HDI ranks, poverty-line calories, Article
numbers not in the table, ...) **refuses honestly** — GUIDED_PRACTICE,
answer withheld. A VERIFIED-wrong fact is the one unforgivable failure, same
bar as history.

### 2.1 What must be REFUSED honestly (the WITHHELD list, geo/econ)

Every probe graded by golden station 3e — each returns `GUIDED_PRACTICE`
with `answer=None` (and, for gated numeric families, the method steps):

| Question type | Example | Why refused | Where it is graded instead |
|---|---|---|---|
| why / process essay | "Why does the monsoon fail in some years?" | causal prose has no deterministic key | teacher rubric / node `DIAGNOSTIC_ANSWER_*` model answers |
| describe / discuss | "Describe how rivers change the landscape." | open-ended; marks depend on argument quality | teacher / model-answer comparison |
| **scope guard** | "Which is the longest river in India?" | the corpus table carries the *world* fact (Nile); an India-scoped ranked claim is not authored in the served nodes — the world fact must not free-associate into the India question | the node's own text (the India rivers node does not state a ranked "longest in India") |
| fact outside the closed table | "What is the poverty line in calories?" / "Name the tributary that joins the Ganga at Allahabad." | not in `_FACTS`; recall-guessing is how wrong facts get taught | bank key match when served from `board_questions` (Lane D, `VERIFIED_OFFICIAL`) |
| numerics below the flywheel trap-resistance floor | "Calculate the density of population" (`POP_DENSITY` 0.5 < 0.7) | release-calibrated: answer withheld **but the 5-beat method still teaches** (station 3f) | same family, guided mode; recalibration is owner-owned |

The refusal ships with `refusal_reason` and guided method steps — the tutor
never dead-ends, it just never pretends to know. **Civics analogues
(fundamental rights, FPTP) already live in the shared table from the
2026-10-06 wave; new civics content work is parked (§6).**

---

## 3. Golden path (tests/test_social_golden.py)

One-subject-pair end-to-end walk, modeled on `test_hist_e2e_golden.py`:
geography + economics, classes 6-12. Final log: `tests/_social_golden_run8.log`.

**Final: 21/21 stations pass** (DB live — dream-postgres reachable; the test
auto-degrades DB stations to `PENDING live re-check` when it is not).

| # | Station | Result | Evidence |
|---|---|---|---|
| 1a | c7 geography path exists | PASS | 11 lessons |
| 1b | next_lesson starts at lesson 1 | PASS | "India sits in the south of Asia between…" |
| 1c | gating advances after done | PASS | next = "The Indian Subcontinent" |
| 1d | geo+econ paths classes 6-12 | PASS | all 14 class/subject lanes present |
| 1e | c10 geo + c12 econ non-trivial | PASS | 9 / 10 lessons |
| 2a | batch serves c7 geography | PASS | 5/5 in ~145 ms, all `c7_geo_*` nodes, leak=[] |
| 2b | batch serves c10 economics | PASS | 5/5 in ~66 ms, all `c10_eco_*` nodes (after CLASS-TAG GUARD) |
| 3a | geography corpus facts VERIFIED | PASS | 10/10 (monsoon onset, Nile, Gangotri, largest delta, Tropic of Cancer, India extent, standard meridian, Pacific, Himalayas, Asia) |
| 3b | economics definitions VERIFIED | PASS | 5/5 (GDP, HDI, MGNREGA 100 days, tertiary, disguised unemployment) |
| 3c | geography numerics VERIFIED | PASS | 4/4 (Greenwich→90°E = 6 PM; scale 1cm=5km, 6 cm→30 km; reverse 20 km→5 cm; R.F. 1:50000, 3.5 cm→1.75 km) |
| 3d | economics numerics VERIFIED | PASS | 5/5 (equilibrium 15/70; XED 25%/40%/substitutes; YED 66.67%/−33.33%/inferior; OJT bond ₹1,30,000 viable; multivar 40/30 movement/45 shift) |
| 3e | open/out-of-table refuse honestly | PASS | why-essay / describe / **"longest river IN INDIA" (world-fact scope guard)** / poverty-line calories / Ganga tributary — all GUIDED_PRACTICE, answer=None |
| 3f | calibrated withhold still teaches | PASS | density ask: GUIDED_PRACTICE, answer withheld, 5 method steps |
| 3g | 8 real board_questions rows | PASS | 7 SOLVE (VERIFIED_OFFICIAL bank keys), 1 REFUSE, **0 WRONG** |
| 4a | socratic map_scale dialogue builds | PASS | 5 moves (elicit→isolate→isolate→retry→handoff), keys server-side |
| 4b | supply_demand_curve grades | PASS | demand-falls ✓, supply-rises ✓, supply-as-falls graded wrong ✓ |
| 4c | catalog lists geo/econ misconceptions | PASS | map_scale_error (geo), supply_demand_curve (econ) |
| 5 | BKT moves up+down | PASS | 0.000 → 0.400 → 0.169 on a c7 geo node |
| 6 | SM-2 review scheduled | PASS | row=yes, interval=1, reps=1 |
| 7 | XP exactly-once | PASS | first awarded, replay duplicate-blocked |

Fast unit layer: `tests/test_social_econ_families.py` (29 tests, no DB, no
model load) pins every wave-2/3/4 family to its corpus key plus the kernel /
percent-family / lane-classifier ownership guards and the
specificity-bump regression (MEAN_DEVIATION 0.97 must outrank
STATS_MEAN_UNGROUPED 0.95 while a plain mean ask still serves the mean).
**29/29 pass.**

### 3.1 Per-class curated grading tables (examiner-judged, corpus-sourced)

Curated probes per class lane: every row is a REAL corpus diagnostic or a
golden-station probe; "served" is the live pipeline's answer at batch end.
Full per-lane verdict counts: §4.2. Verdicts — SOLVE (verified, key agrees),
REFUSE (honest, answer withheld), PARTIAL→FIXED (served incomplete before
this batch's fix, correct after).

| Class/lane | Probe (source) | Served | Verdict |
|---|---|---|---|
| geo c6 | "Which is the largest ocean / largest / smallest continent?" (golden 3a) | Pacific / Asia / Australia — VERIFIED | SOLVE |
| geo c6 | "Describe how rivers change the landscape." (golden 3e) | GUIDED_PRACTICE, answer withheld | REFUSE (essay) |
| geo c7 | "What is the latitudinal extent of India?" / Tropic of Cancer / standard meridian (golden 3a) | 8°4'–37°6'N; 23°30'N; 82°30'E — VERIFIED | SOLVE |
| geo c7 | "Which is the longest river in India?" (golden 3e) | GUIDED_PRACTICE — world-fact scope guard | REFUSE (scope gap, documented) |
| geo c8 | resource-criteria diagnostics (sweep c8_geo_ch1_1) | honest guided method | REFUSE (definition prose — key-grading is the bank lane's job) |
| geo c8 | water-saving / groundwater numerics (sweep REFUSE_NUM) | GUIDED with steps | REFUSE (gap: percent/resource families — §5.2) |
| geo c9 | "Which is the longest river in the world?" / Ganga source / largest delta (golden 3a) | Nile / Gangotri / Ganga-Brahmaputra — VERIFIED | SOLVE |
| geo c9 | Bhopal mean deviation (c9_geo_ch2_8 key) | **Mean deviation = 3** (was "Mean = 43" — wrong quantity) | SOLVE (after MEAN_DEVIATION fix) |
| geo c10 | resources definition diagnostics (sweep c10_geo_cbse_01_001) | honest guided | REFUSE (prose) |
| geo c10 | "If it is 12 noon at Greenwich → 90°E?" (golden 3c) | 6:00 PM — VERIFIED | SOLVE |
| geo c11 | map scale both directions + R.F. (golden 3c) | 30 km / 5 cm / 1.75 km — VERIFIED | SOLVE |
| geo c11 | Hubble redshift / nebula numerics (sweep REFUSE_NUM) | GUIDED with steps | REFUSE (astro-physics gap — owner call) |
| geo c12 | CBR/CDR/natural + migration + actual growth (c12_geo_cbse_02_005 key) | **18 / 8 / 10 / 4.8 / 14.8 per 1000** (was 3 of 5 beats) | SOLVE (after VITAL_STATS_MIGRATION fix) |
| geo c12 | human-earth relationship essays (sweep c12_geo_ch1) | honest guided | REFUSE (essay) |
| eco c7 | barter-system diagnostics (sweep c7_eco_ch01_001) | honest guided | REFUSE (prose) |
| eco c8 | inputs/outputs production diagnostics (sweep c8_eco_ch1_1) | honest guided | REFUSE (prose) |
| eco c9 | butter/margarine XED (c9_eco_ch2_4 key) | **25.00% / 40.00% / XED 1.60 substitutes** (was "25% increase") | SOLVE (after RELATED_ELASTICITY) |
| eco c9 | bus-tickets YED (c9_eco_ch2_6 key) | **66.67% / −33.33% / YED −0.50 inferior** (was "99.86% decrease" VERIFIED-wrong) | SOLVE (after fix) |
| eco c10 | SI loan lump-sum repayment (c10_eco_cbse_03_005 key) | amount ₹1,20,000 (SI ₹20,000) — VERIFIED | SOLVE (was sweep-grader false positive) |
| eco c10 | GDP / HDI / MGNREGA / tertiary / disguised unemployment (golden 3b) | corpus-cited definitions — VERIFIED | SOLVE |
| eco c11 | OJT training bond net gain (c11_eco_cbse_04_006 key) | **₹1,30,000 > 0, viable** (was "60000 (net +20%)" VERIFIED-wrong) | SOLVE (after TRAINING_NET_GAIN) |
| eco c12 | multivar demand Qd = 100−2P+0.5Y−3Ps (c12_eco_cbse_02_009 key) | **40 → 30 (movement along) / 45 (shift)** (was "50" VERIFIED-wrong) | SOLVE (after DEMAND_MULTIVAR) |
| eco c12 | market equilibrium Qd/Qs (golden 3d) | P* = 15, Q* = 70 — VERIFIED | SOLVE |
| econ all | "What is the poverty line in calories?" (golden 3e) | GUIDED_PRACTICE | REFUSE (out-of-table fact — documented gap) |

## 4. Corpus sweep verdicts (tests/social_corpus_sweep.py)

REAL diagnostic pairs mined from the geo/eco corpus (never self-written),
per-lane budget 8/class/lane, chapter-1 nodes first, numeric asks first.
Runs: `_social_sweep_run1..5.log`, JSONL `_social_corpus_sweep.jsonl`,
re-graded copy `_social_sweep_regraded.json`.

### 4.1 The WRONG ledger (every VERIFIED-wrong found, and its fix)

| Sweep | WRONG | Rows | Fate |
|---|---|---|---|
| run1 (2026-10-07 first pass, 58 pairs) | **4** | c9_eco_ch2_4 (butter XED → "25% increase"), c9_eco_ch2_6 (bus YED → "99.86% decrease"), c11_eco_cbse_04_006 (OJT bond → "60000 net +20%"), c12_eco_cbse_02_009 (multivar demand → "50") | all four fixed → `RELATED_ELASTICITY`, `TRAINING_NET_GAIN`, `DEMAND_MULTIVAR` + kernel/percent/lane ownership guards (§1.7). Re-served: exact corpus-key answers |
| run4 (per-lane budget, 120 pairs) | **1** | c10_eco_cbse_03_005 (SI loan: answered "amount = Rs 120,000 (SI Rs 20,000)") | **grader artifact, not a solver bug** — the answer is exactly the corpus key's result (₹1,20,000); the sweep's grader compared against the key's INPUT numbers (P=1,00,000, R=10). Grader fixed to grade step-keys against their result numbers; the golden's `_key_agrees` got the same fix |
| run5 (final, all fixes) | **0** | — | zero-VERIFIED-wrong bar held |

### 4.2 Final per-lane verdicts (run5, 118 REAL corpus pairs, all 14 lanes)

Post-fix serving, corpus keys as the grading standard:

| Lane | SOLVE | VERIFY_SOFT | REFUSE_OK | REFUSE_NUM |
|---|---|---|---|---|
| geo c6 | – | – | 10 | – |
| geo c7 | – | – | 8 | – |
| geo c8 | – | – | 6 | 3 |
| geo c9 | – | 1 (Bhopal row — concurrent-run memo artifact; live pipeline serves 3, see note) | 8 | – |
| geo c10 | – | – | 6 | 2 |
| geo c11 | – | – | 4 | 4 |
| geo c12 | 1 | – | 7 | 1 |
| eco c6 | – | – | 8 | – |
| eco c7 | – | – | 8 | – |
| eco c8 | – | – | 8 | 1 |
| eco c9 | 1 | 1 (XED — all key values present, word-overlap miss) | 3 | 3 |
| eco c10 | 1 | – | 2 | 5 |
| eco c11 | 1 | – | 5 | 2 |
| eco c12 | 1 | – | 8 | 1 |
| **total** | **5** | **2** | **91** | **22** |

**WRONG = 0.** The 2 VERIFY_SOFT rows are examiner-cleared in §4.3 (one is
a SOLVE whose key is symbol-formatted; the eco/c9 row in the sweep log was
a concurrent-run memo artifact — the live pipeline served the correct
66.67/−33.33/−0.50 answer, proven by golden run7/8's 3d station and the
fresh isolated re-serve). Every REFUSE_NUM is a documented content gap
(§5.2), never a guess.

### 4.3 VERIFY_SOFT triage (run4, examiner eyeball class)

| Row | Served | Key | Examiner verdict | Fate |
|---|---|---|---|---|
| c9_eco_ch2_4 butter XED | 25.00% / 40.00% / XED 1.6 substitutes | 25% / 40% / substitutes | **SOLVE** (grader's word-overlap missed on symbol formatting; every key value is in the answer) | pinned in golden 3d |
| c12_geo_cbse_02_005 CBR/CDR | CBR 18, CDR 8, natural 10 | same + migration 4.8 + actual 14.8 | **verified-incomplete** — the ask had 5 quantities, 3 served | **fixed**: `VITAL_STATS_MIGRATION` family; now serves all five beats (18/8/10/4.8/14.8) |
| c9_geo_ch2_8 Bhopal mean deviation | "Mean = 43" | mean deviation from normal = 3 | **wrong quantity** — right arithmetic (43 IS the 5-day mean), wrong target | **fixed**: `MEAN_DEVIATION` family (data run → deviations → mean); serves 3 |

## 5. Bug tables (owner format: Bug class | Examples | Status)

### 5.1 Solver bugs (this batch)

| Bug class | Examples | Status |
|---|---|---|
| VERIFIED-wrong: equation model reads a RATE as an equation | map scale "1 cm = 5 km" answered "5"; multi-var demand "Qd = 100-2P+0.5Y-3Ps" answered "50" | **FIXED** — kernel ownership gates (map-scale, multi-var demand); socsci/econ families answer |
| VERIFIED-wrong: wrong family owns the stem | butter XED → PED family's "25% increase"; YED → "99.86% decrease"; OJT bond → percent chain "60000 (+20%)" | **FIXED** — RELATED_ELASTICITY / TRAINING_NET_GAIN families + PERCENT_CHANGE ownership guard + Lane-A carve-out in `classify` |
| Verified-incomplete: partial answer wearing VERIFIED | multivar demand 3-part ask answered 1 number; CBR/CDR ask dropped migration + actual growth; XED answered only the price leg | **FIXED** — DEMAND_MULTIVAR (all beats + movement/shift), VITAL_STATS_MIGRATION (5 beats), RELATED_ELASTICITY (both %) |
| Wrong quantity, right arithmetic | Bhopal mean-deviation ask answered with the plain mean ("Mean = 43", key 3) | **FIXED** — MEAN_DEVIATION family + 0.97 specificity bump (generic STATS_MEAN_UNGROUPED wins ties at 0.95 by registration order); a plain mean ask still serves the mean |
| Gate hole (phrasing) | "1 cm **to** 5 km" statement scale gated MAP_SCALE out entirely; "TU schedule" abbreviation missed MU_FROM_TU's trigger | **FIXED** (`to` separator; `TU schedule` trigger) — the MU-schedule PARSER still gates the "Q=1 TU=10" inline format (honest refusal; documented gap §6) |
| Teach-back loss on calibrated withhold | POP_DENSITY refusal shipped 0 method steps despite the "steps kept" contract | **FIXED** — Lane A teach-back attaches withheld family's steps |
| Cross-class bank leak (data) | c10 economics batch served c6/c7 junior-econ rows (753/1630 rows misfiled; c11: 329/2095; civ c9 157/691 parked) | **SERVING FIXED** — CLASS-TAG GUARD in `_corpus_candidates`; **bank repair parked** (owner data fix) |
| Sweep-grader false positive | SI-loan correct answer graded WRONG against step-format key | **FIXED** — result-number grading (sweep + golden) |

### 5.2 Content gaps (honest refusals on numeric asks — REFUSE_NUM 22/120)

All verified refusals (never a guess). Curated candidates for future
families, none a correctness risk today:

| Gap class | Examples (corpus rows) | Candidate family |
|---|---|---|
| per-capita income | "NSDP ₹9,50,000 crore, population … calculate PCI" (eco c10) | PCI = NSDP / population |
| sector shares | "primary 74%, secondary 11% … calculate tertiary share / workforce" (eco c10/c11) | share arithmetic |
| MGNREGA wage arithmetic | "45 days worked at notified wage … total earnings" (eco c10); "1,200 demanded, 950 got work …" (eco c11) | wage × days; employment-rate % |
| monopoly revenue | "monopoly faces P = 100 - 0.5Q …" (eco c9) | TR/MR/elasticity chain (micro books) |
| water/resource saving | "50,000 L daily, retrofit saves …%" (geo c8); groundwater recharge (geo c8) | percent arithmetic |
| Earth geometry | equatorial vs polar radius → flattening (geo c8); core radii fractions (geo c11) | (a-b)/a shape |
| densities trio | "crude, physiological, agricultural densities" (geo c12) | density variants |
| astro-geography | Hubble redshift (geo c11), nebula angular velocity (geo c11) | physics lane, arguably out of geo scope — owner call |
| genuinely open multi-part | labour-technique choice (eco c9), "analyse how the choice changes" (eco c9) | correctly REFUSED (essay/analysis) |

## 6. Documented gaps / owner decisions pending

1. **Civics corpus span.** NCERT civics = classes 6-10; classes 11-12
   political science exists (`c11_ps`/`c12_ps`) but is tagged
   `physical_education` in the selector vocabulary. **Civics content work
   is OUT OF SCOPE for this batch (content-filter constraints) — parked.**
   The 2026-10-06 civics facts already in `FACT_RECALL` and the civics
   numeric families (FPTP/seat-share/coalition) stay as landed.
2. **Sociology is not civics.** `c11_soc`/`c12_soc` excluded by design.
3. **`ps` remap** needs an owner call (see §1.1 note).
4. **Cross-class bank repair** (eco c10 753 rows, c11 329, civ c9 157):
   the serving gate now blocks the leak, but the bank rows themselves
   still carry wrong class_level tags — a `bank_norm` repair pass is an
   owner decision (touching 253k-row prod data).
5. **Release-gated families** (POP_DENSITY 0.5, POP_GROWTH 0.67,
   POP_DOUBLING 0.67, PED_TOTAL_OUTLAY 0.67, MPC_DELTA 0.65,
   PRICE_CONTROL_GAP 0.55, MAJORITY_COUNT 0.43, INVESTMENT_MULTIPLIER 0.0)
   serve guided-with-steps until the flywheel recalibrates them — owner-
   owned infra, not bypassed.
6. **New families absent from release_calibration.json**
   (RELATED_ELASTICITY, TRAINING_NET_GAIN, DEMAND_MULTIVAR,
   VITAL_STATS_MIGRATION, MEAN_DEVIATION): the calibration rule is
   "absent → allowed"; they are pinned to corpus keys by
   `tests/test_social_econ_families.py`. A future flywheel probe wave can
   measure them properly.
7. **MU schedule inline format** ("Q=1 TU=10, Q=2 TU=18, …"): trigger
   widened, the parser still gates it — honest refusal, candidate for the
   next econ wave.
8. **Two pre-existing failures outside these lanes** (observed, not
   touched): `test_independent_verifier.py::KINEMATICS_V_U_AT` (2 tests —
   physics dispatcher "no physics family matched"; the failing assertion
   runs `model_physics` directly, nowhere near this batch's files), and
   Lane B narrative sums ("Ravi spends Rs 50 … total?") refuse honestly —
   the competency reader's gap, not a social-lane regression.
