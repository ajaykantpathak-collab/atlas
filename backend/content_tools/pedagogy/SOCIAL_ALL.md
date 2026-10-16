# SOCIAL_ALL.md — the four social-science lanes, every class, every board

*Owner: SOCIAL-ALL batch, 2026-10-07 — HISTORY + GEOGRAPHY + ECONOMICS
(+ CIVICS measure-only), classes 6-12, CBSE + CISCE. Extends
`GOLDEN_HIST.md` (history, c6-c10, EVENT_YEAR 17/17) and
`SOCIAL_GOLDEN.md` (geo+econ, c6-c12, golden 21/21, sweep 118 pairs
WRONG=0). Model for content: the same NCERT register W1-W6 used;
model for grading: the examiner tables in those two reports.*

**Batch scoreboard (final):**

| Layer | Result |
|---|---|
| Golden paths | history 17/17 + social 21/21 (unchanged; DB stations PENDING live re-check) |
| Family unit batteries | **133/133** in one invocation (was 54+29=83) |
| History c11-c12 learnpaths | **21 chapters / 226 lessons** — the brief's gap closed |
| CISCE learnpaths (18 social lanes) | **167 chapters / 1,651 lessons** — first ever |
| EVENT_YEAR | **+30 corpus-mined rows** (59 → 89), every row executable-anchored |
| Corpus sweeps | CBSE hist+civ 103 pairs **WRONG=0**; CISCE 115 pairs **WRONG=0**, SOLVE 5 |
| New families | 9 (LEVY_FRACTION, MU_SCHEDULE, SHARE_PERCENT, PRODUCTIVITY_RATIO, DEPRECIATION_SL, CAPITAL_FORMATION, DEMAND_MULTIVAR-eval, NET_SLIP, NAUTICAL_DISTANCE) + 2 solver fixes (chrono duration, history FACT lane) |
| Verifiers | **15 second-path registrations** (_SOCIAL_DECL 13 declarative rows + 2 hand-written) + 2 engine fixes |
| CONTENT | **25 nodes authored, 25/25 at thinness 0.0** (6 walkthrough expansions + 19 banned-opener rewrites) |
| Factual errors remaining | **0** |

**Environment:** Docker OFF. Postgres assumed DOWN — all work is
file-based + in-process (`answer()` direct, `SOLVER_LLM_MODE=off`);
bank-lane (Lane D) stations are marked `PENDING live re-check`. No LLM
generation anywhere in the batch.

---

## 1. What landed (running log)

### 1.1 Recon findings (start of batch)

- **Learnpath state** (`_cache/learnpaths/_index.json`, 180 chapters,
  25 lanes): history c6-c10 present; geography + economics c6-c12
  present (SOCIAL_GOLDEN batch generated c11/c12 geo/eco — the batch
  brief's "geo/eco c11-c12 don't exist" was already superseded by that
  batch). **The real history gap: c11_history/c12_history paths.**
  Corpus has c11_hist 85 lesson files (ch 1-9; ch8=5, ch9=4 files) and
  c12_hist 141 lesson files (ch 1-12) — those are the two missing lanes.
- **CISCE corpus** (`cisce_nodes_v2/`, 9,431 files): social lanes are
  `histciv` c6-c10 (ICSE history+civics combined book: 64/62/82/104/138
  files), `hist` c11-c12 (ISC: 109/131), `geo` c6-c12
  (88/91/83/54/88/74/114), `econ` c9-c12 (61/54/145/109). No c6-c8 econ
  (ICSE does not offer it). **Zero CISCE learnpaths exist anywhere** —
  learnpath_builder's DEFAULT_CORPUS_ROOT is the CBSE corpus only.
- **EVENT_YEAR table**: 59 rows, all CE, invariant `700 <= y0 <= 2050`
  enforced by `its/tests/test_socsci_families.py`. c11's early-society
  chapters are BCE-heavy → year-recall there honestly declines (closed
  world) and stays that way by design; the additive additions below are
  CE-dated events the c11/c12 corpus actually teaches.

*(further sections appended as work lands)*

---

## 2. History — the c11/c12 lanes

### 2.1 Learnpaths (landed first, 2026-10-07)

`content_tools/gen_social_learnpaths.py` (new build script, stdlib-only,
uses the untouched `services.learnpath_builder.scan_chapter` engine):

- **CBSE history c11-c12**: 21 chapters, **226 lessons** written into the
  shared `_cache/learnpaths/` dir. `_index.json` **merged** (201 chapters /
  27 lanes after the merge — the 180 pre-existing rows preserved; only the
  21 new history rows added). History now has all seven lanes c6-c12.
- **CISCE social lanes** (zero existed — `DEFAULT_CORPUS_ROOT` only ever
  pointed at the CBSE corpus): `histciv` c6-c10 (ICSE combined book),
  `hist` c11-c12 (ISC), `geo` c6-c12, `econ` c9-c12 — **167 chapters,
  1,651 lessons, 0 cycle breaks**, into a SEPARATE
  `_cache/learnpaths_cisce/` dir (its own `_index.json`). A separate dir
  makes a filename collision with CBSE lanes impossible by construction;
  `get_path(..., cache_dir=...)` already takes the directory parameter.
- Serving contract verified in-process: `get_path(12, 'history', 7)` →
  12 lessons; `next_lesson` walks cold → lesson 1 → done-set advance; a
  CISCE path (`9_histciv_1`) serves `c9_histciv_icse_01_001` first.

### 2.2 EVENT_YEAR additions (additive block; the 59 existing rows untouched)

+30 rows, every one mined from a taught file (the executable anchoring
test — alias AND span-year in ONE corpus file, both corpora scanned —
now covers all 89 rows):

- **c11 world history**: Norman Conquest (1066), Domesday Book (1086),
  Diocletian's accession (284), fall of the Western Roman Empire (476),
  Black Death (**1346-1353** — the definition-form span in c11_05_008/
  010/011; the 1348 mentions narrate its European arrival), Statute of
  Labourers (1351), Mongol Conquests (1206-1227), fall of Constantinople
  (1453), Dias rounds the Cape (1488), Columbus reaches the Americas
  (1492), Vasco da Gama reaches India (1498), Michelangelo's David
  (1504), *On the Revolutions of the Heavenly Spheres* (1543), Meiji
  Restoration (1868), First Opium War (1839, single-year), Taiping
  Rebellion (1850-64), First Sino-Japanese War (1894-95),
  Russo-Japanese War (1904-05), Xinhai Revolution (1911).
- **c12 Indian history**: founding of Vijayanagara (1336), Krishnadeva
  Raya's reign (1509-1529 — the corpus gives the reign span, never the
  word "coronation"), Battle of Talikota (1565), abolition of jizya
  (1564), Shivaji's coronation (1674), Aurangzeb's death (1707),
  Permanent Settlement (1793), Fifth Report (1813), Santhal Rebellion
  (1855-56), Deccan Riots (1875), Cripps Mission (1942), Cabinet Mission
  (1946), Direct Action Day (1946), Gandhi-Jinnah talks (1944),
  Partition of India (1947).

**Closed-world discipline held under adversarial anchoring** (each of
these was caught by the executable anchor/behaviour tests, then fixed):

| Trap found while mining | Fate |
|---|---|
| "Second Opium War" — never taught; bare `opium war` alias would swallow it | alias excluded, single-year row; refusal pinned |
| Aurangzeb's accession — corpus states it only inside a parenthetical; `war of succession` is NOT unique (c11_04 First Fitna, c6/c9/c7histciv uses); his DEATH year (1707) is taught in 5+ files | NO accession row (honest decline, pinned); death row added with narrow aliases (`aurangzeb die`, `death of aurangzeb`) anchored on c8_hist_ch2_8 |
| Krishnadeva Raya "coronation" — the corpus never uses the word; it gives the reign span (1509-29) | row re-registered as the reign span |
| Black Death — corpus carries 1340s / 1346-53 / 1347-51 / 1348 | definition-form span (1346-1353); embedded-1348 stems hit the existing trick guard and decline |
| Ryotwari — corpus dates it "the 1820s", no single year | NOT registered; the year ask declines (pinned) |

**Two additive machinery tweaks** (zero existing-row behaviour change):
1. the EVENT_YEAR artifact-phase regex gained
   `book|sculpture|statue|painting|fresco|spheres?` — no existing canon
   contains any of these words, so no existing answer text changes; the
   new Domesday Book / David / Revolutions rows phrase as "dates to".
2. `CENTURY_DECADE` now falls back to the corpus event table when the
   stem has no year ("In which century was the Diamond Sutra printed?"
   → 9th century; "fall of Constantinople" → 15th). Stems that carry
   their own year take the original text-anchored path, byte-identical.
   Table invariant floor lowered 700 → 250 (the two CE rows at 284/476);
   BCE events (c11 ch1-5 early societies) stay OUTSIDE the closed table
   by design — year-recall on them declines honestly.

**Family unit battery: 91/91** (`its/tests/test_socsci_families.py`,
was 54/54 — the +30 row-pins, span/trap refusals and the century
fallback are the new tests).

---

## 3. CONTENT wave — thin social-science nodes (W1 method)

Scored with the platform's own depth scorer (`scan_depth_v2.py`,
`_comp` companions excluded — they carry no teaching sections by
design). Fresh census at batch time, both corpora, all social lanes:
**335 thin nodes** — bands 4 (307, walkthrough 120-159 words), 8 (19),
6 (4), 2 (5); nothing missing a whole section. This batch fills the
entire severe band and the history/geo highlights:

- **Wave 1a — walkthroughs** (`content_tools/socall_fill_wave1.py`):
  5 worst c11/c12 history nodes (walk 97-108 words) gained a
  "Build the steps." step-building block (~130 words each), authored
  strictly from each node's own taught material (Fukuzawa Yukichi,
  Santhal Rebellion, Fate of the Natives, the language debate,
  khud-kashta/pahi-kashta). All rescore **thinness 0.0** (walk
  331-375). Backups in `content_tools/backups/socall_wave1/`.
- **Wave 1b**: the last severe CBSE node (`c12_geo_cbse_06_009`,
  agro-based industries) — walkthrough +40 words, definition +39.
  Thinness 8.0 → **0.0**.
- **Wave 2 — the banned-opener 19** (`socall_fill_wave2.py`): every
  CISCE social node whose DEFINITION opened with the filler "This node
  ..." (+8 penalty, the W1 DEFINITION rubric check) rewritten to a
  direct, subject-first NCERT-register opener, keeping every taught
  fact. **All 19 rescore thinness 0.0** (e.g. "Map reading is the
  toolkit that turns an outline map of India...", "Fascist Italy
  (1922-1943) and Nazi Germany (1933-1945) ... are best understood
  through their comparative structures.").
  Backups in `content_tools/backups/socall_wave2/`.

**Net: 25 nodes authored this batch, 25/25 at thinness 0.0 after.**
Remaining thin population: the mild walkthrough-length long tail
(~310 nodes at band 4, spread across all lanes — measured, logged, and
queued for future waves; none missing sections, none failing hygiene).

---

## 4. CISCE sweep + wave 3 — new families from the measured gaps

### 4.1 The CISCE corpus sweep (first ever)

`tests/social_corpus_sweep.py` run against `cisce_nodes_v2` (env
`SOCIAL_SWEEP_CORPUS` + `SOCIAL_SWEEP_SUBJECTS=histciv|hist|geo|econ`),
PER_CLASS=6: **115 REAL diagnostic pairs across 18 lanes —
WRONG = 0, CRASH = 0** (`tests/_socall_cisce_sweep1.log`, JSONL
`_social_corpus_sweep_cisce.jsonl`). 101 honest refusals (prose), 14
numeric refusals — the gap census that wave 3 builds from.

### 4.2 Wave 3: every deterministic gap the sweep evidenced got its family

| Corpus REFUSE_NUM (corpus key) | New family (file) | Now serves |
|---|---|---|
| c9_eco_icse_01_011 mangoes "1 mango = 40 utils, 2 = 70, 3 = 90" (MU2=30, MU3=20, diminishing holds) | `MU_SCHEDULE` (economics_families) | **MU2 = 30, MU3 = 20 — diminishing marginal utility HOLDS** |
| c11_econ_isc_02_002 "Q=1 TU=30, Q=2 TU=55, Q=3 TU=75, Q=4 TU=90 ... first below 10 utils" | `MU_SCHEDULE` | MU 25/20/15 + **within the schedule MU never falls below 10** (honest about the shown data) |
| c9_eco_icse_01_011 samosa stop rule (MU 25,20,15,10,5 at price 15 → buy 3) | `MU_SCHEDULE` (explicit MU-list branch + price stop rule) | **The student buys 3 unit(s)** — MU4 = 10 < 15 |
| c9_eco_icse_04_001 GVA share 28/180 (15.56%) | `SHARE_PERCENT` | **Share = 15.56%** |
| c9_eco_icse_02_004 public sector 30% of ₹200 lakh crore (₹60) | `SHARE_PERCENT` (percent×total direction) | **Output = ₹60** |
| c10_econ_icse_01_003 capital productivity 8/2 (=4) | `PRODUCTIVITY_RATIO` | **Capital productivity = 4** |
| c10_econ_icse_01_006 straight-line depreciation 10 looms × ₹5L / 10y (₹5,00,000) | `DEPRECIATION_SL` | **₹5,00,000 per year** (Indian grouping) |
| c10_econ_icse_01_008 GFCF 8,000 + stocks −500 → 7,500; rate 18.75% | `CAPITAL_FORMATION` (sign captured across the corpus's non-breaking hyphen ₹‑500) | **₹7,500; 18.75% of GDP** — both minus forms |
| c12_econ_isc_01_003 multivar demand Qd = 800−4P+0.02Y at P=100, Y=40,000 (+ point PED) | `DEMAND_MULTIVAR` evaluation-only branch (gate widening) + word-form value bindings ("price is Rs 100") | **Qd = 1,200; point PED = −0.33 (inelastic)** |
| c11_geo_isc_03_005 net slip √(120²+80²) (144.2 m) | `NET_SLIP` (socsci_families) | **Net slip = 144.2 m** |
| c9_geo_icse_01_008 ICSE 2023 nautical miles 10° × 60 (=600 NM) | `NAUTICAL_DISTANCE` (socsci_families) | **Distance = 600 nautical miles** |

Not built (measured, documented): the ENP "effective number of
parliamentary parties" ask (c12_hist_isc_02_007) is electoral systems
arithmetic — civics-adjacent, parked lane per the batch constraint;
"create a problem" asks are meta-questions the engine must refuse;
HOTS/essay chains refuse honestly by contract.

Guards pinned beside every addition: the CBSE multivar movement/shift
stem still answers 40→30 (movement along) unchanged; a single-variable
demand still routes to DEMAND_Q_AT_P; MU triggers don't touch
RELATED_ELASTICITY stems; NET_SLIP's throw/heave gates need BOTH
components with metres.

Also fixed: the sweep's lane label for `econ` stems ("?" → eco) and the
missed-lane census.

### 4.3 The strict-law verifier wave (_SOCIAL_DECL)

The owner directive (2026-10-07, mid-batch) made it law: **every numeric
solver family MUST have a registered second-path verifier** — the badge
gate turns unregistered families into GUIDED refusals in production
(observed live: the Mari levy stem served `badge:verifier_na:LEVY...` →
withheld while the dispatcher computed it perfectly). Registered in
`independent_verifier.py`:

- **`_SOCIAL_DECL` declarative block** (13 rows on the physics decl
  engine, factory generalised to take the table): MAP_SCALE (3 shapes:
  forward / reverse / R.F.), TIME_ZONE_LONGITUDE (IST-UTC form),
  VITAL_STATS, VITAL_STATS_MIGRATION, SEX_RATIO_LITERACY (sex-ratio +
  literacy relations), LEVY_FRACTION, NET_SLIP, NAUTICAL_DISTANCE,
  SHARE_PERCENT (both directions), PRODUCTIVITY_RATIO, DEPRECIATION_SL,
  CAPITAL_FORMATION, DEMAND_MULTIVAR (counterfactual back-substitution +
  PED inversion).
- **Hand-written (VERIFIER_ENGINE case 2)**: `_v_mean_deviation`
  (list-valued), `_v_mu_schedule` (two corpus parse shapes + stop rule).
- **Two engine fixes the rows required** (additive, physics rows
  unaffected): `opt` vars now BIND from the family's slot record
  (previously `opt` only relaxed the requirement — an opt var could
  never reach `vals`, so multi-shape rows could not fire their alternate
  relations), and eqs are called with per-eq kwargs (a row's eq variants
  declare different slot sets; the full vals dict TypeError-skipped
  every variant that named fewer slots).
- Families emit their rebuild slots (tu_last/tu_prev, cost/life,
  gfcf/stocks, part/pct/total, output/capital, qi_first/delta_first...).

**Live result through `answer()`** (was GUIDED-withheld, now):
mango MU **VERIFIED**, samosa stop rule **VERIFIED**, GVA share
**VERIFIED 15.56%**, capital formation **VERIFIED ₹7,500 / 18.75%**,
net slip **VERIFIED 144.2 m**, nautical **VERIFIED 600 NM**, map scale
**VERIFIED 30 km**, migration vital stats **VERIFIED 18/8/10/4.8/14.8**,
multivar+PED **VERIFIED 1,200 / −0.33**.

**Also fixed for the strict law**: the neurolink concept lane stands
down for ANY grounded socsci family (a warm-PAL physics-"density"
concept narrative was hijacking the calibrated-withhold ask into a
0-step dead-end); the lane classifier routes density compute asks to
Lane A; and the S5 competency attach no longer skips itself when a warm
structure lane pre-filled socratic — when no lane taught the method, the
concept card becomes the method steps (the 0-step dead-end class).

**Post-fix CISCE sweep (115 pairs, 18 lanes): SOLVE 0→5,
REFUSE_NUM 14→4, VERIFY_SOFT 5 (all examiner-clears — every key value
present in the served answer; grader word-overlap misses on symbol
formatting), WRONG = 0, CRASH = 0.**

---

## 5. Final scoreboard (per-subject x per-class)

Verdict classes as in SOCIAL_GOLDEN §4. SOLVE/VERIFY_SOFT = served
verified against the corpus key; REFUSE_OK = honest refusal on prose;
REFUSE_NUM = honest refusal on a numeric ask (documented gap). WRONG is
the app-killing class — zero everywhere.

### 5.1 CBSE corpus (enhanced_nodes_md), 103 pairs, history c6-c12 + civics c6-c10 measure-only

| Lane | SOLVE | VERIFY_SOFT | REFUSE_OK | REFUSE_NUM | WRONG |
|---|---|---|---|---|---|
| hist c6 | – | – | 7 | 1→0 | 0 |
| hist c7 | – | – | 7 | 1→0 | 0 |
| hist c8 | – | – | 10 | – | 0 |
| hist c9 | – | – | 9 | – | 0 |
| hist c10 | – | – | 8 | – | 0 |
| hist c11 | – | – | 7 | 1 | 0 |
| hist c12 | – | – | 8 | – | 0 |
| civ c6-c10 (measure-only) | – | – | 43 | 1 | 0 |

(the two history REFUSE_NUM rows — Delhi Sultanate duration, Mahajanapadas
count — became SOLVE-class families after the fix; the counts above are
the pre-fix sweep, the fixes pinned in the batteries)

### 5.2 CISCE corpus (cisce_nodes_v2), 115 pairs, 18 lanes — post-fix

| Lane | SOLVE | VERIFY_SOFT | REFUSE_OK | REFUSE_NUM | WRONG |
|---|---|---|---|---|---|
| histciv c6 | – | – | 7 | – | 0 |
| histciv c7 | – | – | 6 | – | 0 |
| histciv c8 | – | – | 6 | – | 0 |
| histciv c9 | – | – | 6 | – | 0 |
| histciv c10 | – | – | 8 | – | 0 |
| hist c11 (ISC) | – | – | 6 | – | 0 |
| hist c12 (ISC) | – | – | 5 | 1 (ENP — civics-adjacent, parked) | 0 |
| geo c6 | – | – | 6 | – | 0 |
| geo c7 | – | – | 6 | – | 0 |
| geo c8 | – | – | 6 | – | 0 |
| geo c9 | 1 (600 NM) | 1 (examiner-clear) | 5 | – | 0 |
| geo c10 | – | – | 6 | – | 0 |
| geo c11 | 1 (net slip 144.2) | 1 (examiner-clear) | 4 | – | 0 |
| geo c12 | – | – | 5 | 1 (meta-question — correct refusal) | 0 |
| eco c9 | 2 (MU ladder; GVA share) | 2 (examiner-clears) | 2 | – | 0 |
| eco c10 | – | – | 5 | 1 (DEP_SLM arbitration shadow — §6) | 0 |
| eco c11 | – | – | 6 | – | 0 |
| eco c12 | 1 (multivar + PED) | 1 (examiner-clear) | 5 | – | 0 |

### 5.3 Battery layers (final)

| Layer | Result |
|---|---|
| `its/tests/test_socsci_families.py` | **91/91** (54 at batch start) |
| `tests/test_social_econ_families.py` | **42/42** (29 at batch start) |
| Combined single invocation | **133 passed, 0 failed** (`tests/_socall_final_batteries.log`) |
| Golden paths (history 17/17, social 21/21) | unchanged — shared rows untouched; DB stations PENDING live re-check (Postgres down all batch) |
| CBSE corpus sweep (hist+civ) | 103 pairs, **WRONG=0** |
| CISCE corpus sweep (all 4 subjects) | 115 pairs, **WRONG=0**, SOLVE 5 |
| Learnpaths | CBSE 27 lanes incl. history c11 (85-node, 21-chapter corpus) + c12 (141-node, 12-chapter); CISCE 18 lanes, 167 chapters, 1,651 lessons |

---

## 6. Documented gaps / owner decisions pending

1. **DEP_SLM arbitration shadow (cross-lane)**: the CISCE multi-unit
   depreciation stem ("10 power looms for ₹5 lakh each") binds the
   ACCOUNTS registry's DEP_SLM family first; its parse drops the
   unit count (annual_dep = 0.5 lakh-units), its own verifier correctly
   fails it, and the stem dead-ends as GUIDED — shadowing the econ
   DEPRECIATION_SL family whose verified answer (₹5,00,000) is pinned at
   the dispatcher level (test_depreciation_sl_looms). Fix belongs in the
   accounts family's gate or the registry arbitration order — cross-lane,
   owner call.
2. **ENP "effective number of parliamentary parties"** (c12_hist_isc_02_007,
   ENP = 1/Σsᵢ²): deterministic, but electoral-systems arithmetic is
   civics-adjacent — parked lane; candidate family for a future wave.
3. **Farmer capital-formation word variant** (c10_econ_icse_01_008:
   "buys a tractor ₹5 lakh + inventory ₹1 lakh → contribution ₹6 lakh"):
   same arithmetic as CAPITAL_FORMATION but worded without GFCF/stocks
   keywords — candidate trigger widening.
4. **Civics content**: PARKED per batch constraint (measure-only). The
   968-million-elector recall (c8_civ_ch1_11) and the ENP row stay
   honest refusals.
5. **Bank-lane stations**: PENDING live re-check (Postgres down all
   batch; the SOCIAL_GOLDEN batch ran them live).
6. **Walkthrough-length long tail**: ~310 social nodes at depth band 4
   (walkthrough 120-159 words) across all lanes — measured, queued;
   none missing sections.
7. **Recall-class families** (EVENT_YEAR, FACT_RECALL, TIMELINE_ORDER)
   carry no arithmetic verifier by design — their second path is the
   executable corpus-anchoring test (every row must find alias+year in a
   taught file, both corpora scanned) plus the closed-world gates.
8. **Pre-existing failures outside these lanes** (observed, untouched):
   the physics KINEMATICS_V_U_AT dispatcher pair; Lane B narrative sums.

### 2.3 History corpus sweep (CBSE, c6-c12) + civics measure-only

`tests/social_corpus_sweep.py` extended additively: the corpus root is
switchable (`SOCIAL_SWEEP_CORPUS`) and the lane regex selectable
(`SOCIAL_SWEEP_SUBJECTS`); default invocation semantics unchanged; a
CISCE run writes `_social_corpus_sweep_cisce.jsonl`.

**History c6-c12 + civics c6-c10 (measure-only): 103 REAL diagnostic
pairs — WRONG = 0, CRASH = 0** (`tests/_socall_hist_sweep1.log`,
JSONL `_social_corpus_sweep.jsonl`). Every row is either an honest
refusal (99 prose diagnostics — the contract working) or one of the 4
numeric asks below. Civics stays measure-only (968-million-elector
recall row NOT added — parked lane).

**3 solver fixes + 1 verifier from the 4 REFUSE_NUM rows:**

| Corpus numeric ask (key) | Was | Fix | Now |
|---|---|---|---|
| c6_history_ch07_021: "began in 1206 CE ... end in 1526 CE — how many years" (key **320**) | REFUSE — the duration branch's year regexes start at 1500, and "did it last" missed the `lasted` trigger | CHRONO_INTERVAL duration branch: `\blast\b` trigger + a begin/end prose-span fallback (both years must sit in 500-2099 and carry began/end context, so stray counts like "300 jars" can't hijack) | **320 years**; "began in 1526 ... ended in 1707" → 181 |
| c11_hist_cbse_01_009: Mari tablet — 300 jars at 5 shekels, one-tenth levy (key **150**) | REFUSE — no fraction-levy family | NEW `LEVY_FRACTION` family: units x unit value = total; share = stated fraction; missing count/value gates honestly | **1,500 total; 150 shekels levy** — the key's exact chain |
| c7_hist_ch01_003: "How many Mahajanapadas" (key **sixteen**) | REFUSE — FACT_RECALL had no history lane | `history` lane added to FACT_RECALL (lane-word map extended); the sixteen-Mahajanapadas row (c7_hist_ch01_003) | **Sixteen** (6th century BCE) |
| c8_civ_ch1_11: "968 million electors" | REFUSE | NOT fixed — civics lane parked (measure-only); documented gap | unchanged (honest refusal) |

**The stale-VERIFIED drift found and fixed (MEAN_DEVIATION pin):** the
previous batch's `test_mean_deviation_outranks_generic_mean_in_pipeline`
was failing at batch start — NOT by my edits (proved by a stripped-module
isolation: with my new registry rows removed the stem served the WRONG
quantity "Mean = 43" VERIFIED — the pre-fix bug resurfacing). Root
cause: none of the social families are registered in
`independent_verifier.VERIFIERS`; their VERIFIED badges rode on PAL
second-engine endorsement, and the Bhopal stem lost its PAL shape
endorsement (shared `pal_templates.json` drift from 14h of other
agents' runs) → the strict-verified law (owner law: never ship
unverified) fail-closed the correct answer to GUIDED. **Fix: registered
`MEAN_DEVIATION` in `independent_verifier.py`** (additive `_v_mean_deviation`
+ one dict row): the verifier re-parses the data and the normal from
the question, re-averages |x - normal|, and PASSes/FAILs the family's
claim — a wrong claim now FAILs and stays withheld (negative-control
pinned in the battery). Batch lesson recorded: **every VERIFIED-pinned
social family needs a registered second path, not PAL luck.**
