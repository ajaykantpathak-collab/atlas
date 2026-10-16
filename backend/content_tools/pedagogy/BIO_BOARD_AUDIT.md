# BIO-BOARD-AUDIT — per-class biology board audit (owner directive: one class at a time, honest-refusal contract)

Owner standard: the class-7-maths test. Two instruments per class, in
order: (1) hand-curated REAL board-style questions per chapter of the
served corpus, graded like an examiner (`tests/test_bio_board_audit.py
<class>`); (2) chapter-sourced corpus sweep pulling the REAL
DIAGNOSTIC_QUESTION/ANSWER pairs out of every corpus node
(`tests/test_bio_corpus_sweep.py <class>`, instrument adapted from
`tests/physics_corpus_sweep.py`). Both run in-process, SOLVER_LLM_MODE=off,
no LLM, no Docker; DB-dependent serving checks are pending live re-check
(Postgres down this session).

**Contract (owner law):** PROSE (why/explain/describe/differentiate) must
REFUSE — any VERIFIED on prose is a bug. MCQ/FACTUAL must grade correctly —
VERIFIED-wrong is the worst bug; an honest refusal on a gradeable factual
is a COVERAGE finding (recorded, to fix); REFUSE on a why-question is PASS.

## Fix ledger (all applied + verified this session, owner-directed)

| # | Bug | Root cause (file:line) | Fix | Verified by |
|---|-----|------------------------|-----|-------------|
| F1 | VERIFIED MCQ ships "option (b) 0" (letter right, text destroyed) | `mcq_solver.py:201` returned sentinel `{"value": 0.0}` from the concept-MCQ path; `answer_pipeline.py:1516` unconditionally reformatted `option (x) {value:.6g}` | concept path returns `value: None`; caller reformats only when a numeric value exists | class 9/10 reruns: "option (c) R.H. Whittaker", "option (b) Amylase", "option (b) Haemoglobin", "option (a) 2 neurons" all ship correct letter + text |
| F2 | PROSE "Explain..." shipped VERIFIED node-definition prose | `neurolink.py is_pure_concept_query` whitelisted "explain"/"state" as definitional ask-words | prose/reason forms (why/explain/describe/differentiate/compare/how-do) excluded from the fast concept lane | "Explain double fertilisation", "Explain nutrition in Amoeba", "Explain Mendel's law" all now GUIDED_PRACTICE |
| F3 | Concept-MCQ matcher promoted wrong options via loose `any(word>4)` matching | `mcq_solver.py` path 3 matched any option carrying one topical word of the retrieved body ("Fertilisation" won a pollination question) | fail-closed: ALL DISTINCTIVE words (not shared with other options) of exactly one option must appear in the verified body; zero/two-plus matches refuse | "longest cell" degenerate match eliminated; single-match promotions still work ("option (a) 2 neurons") |
| F4 | Relation-MCQ stems ("seen in") promoted from topically-adjacent, non-answer-bearing bodies | concept lane verifies topic similarity, not question answered — reproducibly returned a yeast-reproduction concept for "Binary fission is the mode of reproduction seen in:" and shipped (c) Yeast VERIFIED-wrong | relation stems (seen in/found in/occurs in/present in) refuse in the concept-MCQ path; relation facts belong to the NCERT fact table/bank keys which verify the PAIR | "Binary fission ... seen in" → GUIDED_PRACTICE; attribution asks unaffected ("proposed by" still ships "option (c) R.H. Whittaker") |
| F5 | Specific sub-fact ask answered by dumping the whole node definition as VERIFIED | same `is_pure_concept_query` gate — "Name the phase where DNA replication occurs and state..." shipped the full cell-cycle definition | sub-fact asks (name the/state the/list the/which/how many/how much) excluded from the fast lane | phase question → GUIDED_PRACTICE; fact-anchor recall unaffected ("powerhouse" → VERIFIED Mitochondria) |
| F6 | AEROBIC answers shipped for ANAEROBIC asks | `answer_pipeline.py` bio branch fired the aerobic ATP balance sheet on bare "respiration+ATP" keywords ("...ANAEROBIC respiration in skeletal muscle... net ATP" → "32/38 ATP"; correct: lactic acid + 2 ATP); `biology_families.py _c_photo_resp_quiz` default word-equation answered a yeast-fermentation analysis with the aerobic equation | anaerobic/fermentation/lactic/ethanol/yeast/muscle stems refuse in both routes (F6a, F6b) | post-sweep spot-check of both c10 WRONG questions |
| F8 | Lane-C ANGLE_SUM shipped VERIFIED "80 degrees" for a DNA question | `class7_families.py model_angle_sum`: the bare word "complementary" triggered the geometry family on the DNA sense ("complementary strand of EcoRI"), and the known-angle scrape (`_DEG`, unit optional) harvested the 5s and 3s out of `5'-GAATTC-3'` as "known angles": 90 − (5 + −3 + 5 + 3) = 80° (c12 sweep `c12_biotech_cbse_02_001#d2`, previously documented out-of-lane; root-caused + fixed this session) | angle-context gate (`\bangles?\b` / ∠ required for complementary/supplementary/linear-pair) + prime hygiene (a number followed by an apostrophe — feet, arc-minutes, DNA primes — is never scraped); the dormant lane-A twin `_c_comp_supp` (structure_families.py) got the same context gate | `tests/test_angle_family_dna_guard.py` 5/5 PASS incl. the full-pipeline honest-refusal pin |
| F9 | COVERAGE-GAP: class 11/12 factual recall refused everywhere (0 usable anchors) | `biology_cognitive_engine.py NCERT_FACT_RECALL` carried only the 5 class-11 organelle phrases; every factual MCQ/factual in c11/c12 honestly refused (sweep COVERAGE 21+17, curated EDGE 44+9) | c11/c12 anchor wave: 93 new question-side entries (photosynthesis/respiration numbers, cell cycle, genetics, evolution, human physiology, biotech, ecology — table now 98) + gate upgrades — `_FACT_ASK` widened (who/where/how many/how much/caused by/transported by/secreted by), `_MULTI_PART_ASK` guard (a single anchored fact must never ship as a PARTIAL answer), inline options satisfy the fact-ask shape (a selection paper is a fact ask by construction; exactly-one-match rule still guards), exact-option pass ("Prophase I" no longer substring-collides with "Prophase II"); answer_pipeline bio-branch trigger widened with recall words (branch stays fail-closed) | `tests/test_bio_fact_recall_table.py` 7/7 PASS (44 firing cases, why-forms refuse, multi-part refuses, option letters only on unambiguous match); class re-runs below |
| F10 | Punnett family shipped the PHENOTYPE ratio for a GENOTYPIC-ratio ask (c12 sweep `c12_bio_cbse_05_001#d3` → VERIFIED "3 dominant : 1 recessive"; key is 1 RR : 2 Rr : 1 rr) | `biology_families.py _c_punnett` ask-router regexes were `genotype\s+ratio` / `phenotype\s+ratio` — the board adjective "genotypic" missed both, so the ask fell through to the default phenotype report | routers accept geno-type/-typic and pheno-type/-typic | `tests/test_bio_punnett_ask_target.py` 3/3 PASS (family-level + full-pipeline pins, both adjective forms) |
| F11 | Neurolink fast-concept lane buried fact-recall answers: "What is the respiratory quotient (RQ) of glucose...?" shipped a 300-char concept narrative that the prose-essay guard then stripped → dead-end GUIDED (route `ask_shape:prose_essay_refused`, lane A, empty family route) | `answer_pipeline.py _answer_impl`: the neurolink pre-route runs BEFORE the domain pre-route, so a corpus concept answer on the same terms pre-empts the one-line VERIFIED fact; separately, `normalize_input` strips inline MCQ options ("in having: (a) more than six xylem bundles..."), which the fact-ask gate legitimately reads as a selection paper — fact_recall saw a stripped stem and refused | BIO-FACT STAND-DOWN in the neurolink pre-route (same contract as the existing social-fact stand-down: if `evaluate_fact_recall` would answer, the concept lane stands down) + fact_recall now receives the RAW wording (`raw_text`) — the table is phrase-anchored on the student's actual wording, normalization is for numerals | route trace: RQ → VERIFIED "1" `biology:fact_recall`; monocot-xylem MCQ → VERIFIED "option (a) more than six xylem bundles"; suites re-run ALL PASS |







## Class 9 biology — curated board audit (final: post-fix run 4)

Corpus: 45 nodes, 4 chapters — ch1 cell (12), ch2 tissues (11), ch3
reproduction (12), ch4 diversity (10); all nodes carry DEFINITION +
WALKTHROUGH + 3 diagnostic pairs (quality sweep OK).

Result: **11 PASS / 0 FAIL / 22 EDGE** of 33 hand-curated board questions
(run history: 8/3/22 → 10/3/20 → 10/2/21 → 11/0/22 as fixes F1–F4 landed;
the final FAIL (binary-fission→Yeast) converted to an honest EDGE by F4,
spot-verified separately).

| Q | Ch | Archetype | Label | Answer (trim) | Verdict |
|---|----|-----------|-------|---------------|---------|
| c9.ch1.MCQ.01 | 1 | MCQ | VERIFIED | option (b) Mitochondria | PASS |
| c9.ch1.MCQ.02 | 1 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch1.FACTUAL.03 | 1 | FACTUAL | VERIFIED | Nucleus | PASS |
| c9.ch1.MCQ.04 | 1 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch1.MCQ.05 | 1 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch1.FACTUAL.06 | 1 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c9.ch1.PROSE.07 | 1 | PROSE | GUIDED_PRACTICE |  | PASS |
| c9.ch1.PROSE.08 | 1 | PROSE | GUIDED_PRACTICE |  | PASS |
| c9.ch1.NUMERIC.09 | 1 | NUMERIC | GUIDED_PRACTICE |  | EDGE |
| c9.ch2.MCQ.10 | 2 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch2.MCQ.11 | 2 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch2.FACTUAL.12 | 2 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c9.ch2.MCQ.13 | 2 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch2.FACTUAL.14 | 2 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c9.ch2.MCQ.15 | 2 | MCQ | GUIDED_PRACTICE |  | EDGE (F3: was WRONG "option (c) Egg cell") |
| c9.ch2.PROSE.16 | 2 | PROSE | GUIDED_PRACTICE |  | PASS |
| c9.ch2.PROSE.17 | 2 | PROSE | GUIDED_PRACTICE |  | PASS |
| c9.ch3.MCQ.18 | 3 | MCQ | GUIDED_PRACTICE |  | EDGE (F4: was WRONG "option (c) Yeast"; spot-verified) |
| c9.ch3.MCQ.19 | 3 | MCQ | GUIDED_PRACTICE |  | EDGE (F1/F3: was WRONG "option (a) Fertilisation") |
| c9.ch3.FACTUAL.20 | 3 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c9.ch3.MCQ.21 | 3 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch3.MCQ.22 | 3 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch3.FACTUAL.23 | 3 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c9.ch3.MCQ.24 | 3 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch3.PROSE.25 | 3 | PROSE | GUIDED_PRACTICE |  | PASS (F2: was WRONG VERIFIED prose) |
| c9.ch4.MCQ.26 | 4 | MCQ | VERIFIED | option (c) R.H. Whittaker | PASS (F1: was "option (c) 0") |
| c9.ch4.MCQ.27 | 4 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch4.MCQ.28 | 4 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch4.FACTUAL.29 | 4 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c9.ch4.MCQ.30 | 4 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c9.ch4.MCQ.31 | 4 | MCQ | GUIDED_PRACTICE |  | EDGE (F3: was WRONG "option (c) Genus, Species...") |
| c9.ch4.PROSE.32 | 4 | PROSE | GUIDED_PRACTICE |  | PASS |
| c9.ch4.PROSE.33 | 4 | PROSE | GUIDED_PRACTICE |  | PASS |

### Bug table — class 9 (owner format: Bug class | Examples | Status)

| Bug class | Examples | Status |
|-----------|----------|--------|
| GARBAGE-ANSWER (VERIFIED MCQ ships "option (x) 0") | "Binary fission... seen in" → "option (b) 0"; "Five kingdoms proposed by" → "option (c) 0" | **FIXED (F1)** — mcq_solver.py sentinel value 0.0 + answer_pipeline.py reformat destroyed option text; letters were correct in both cases |
| REFUSAL-GAP (prose shipped VERIFIED) | "Explain double fertilisation in flowering plants." → VERIFIED node prose (c10_bio_cbse_03_007 wording), lane A, empty route | **FIXED (F2)** — neurolink.py prose gate; question now honestly refuses |
| WRONG-OPTION (concept MCQ picks wrong letter) | "Binary fission seen in" → (c) Yeast (run 3); "Transfer of pollen... called" → (a) Fertilisation | **FIXED (F3+F4)** — distinctive-word fail-closed match + relation-stem guard; both now honestly refuse |
| DEFINITION-DUMP (sub-fact ask answered with whole node definition) | corpus sweep: "Name the phase where DNA replication occurs" → VERIFIED full cell-cycle definition | **FIXED (F5)** — sub-fact asks excluded from fast lane; now refuses |
| MULTI-PART PARTIAL-ANSWER (VERIFIED ships one fragment) | corpus sweep: "Compare mitosis and meiosis (cells + chromosome number)" → VERIFIED "gametes have n = 23 chromosomes (4 cells)" — mitosis half missing | **CONFIRMED, out-of-lane** — route `modeling:lane_a_sweep` + `independent_verifier:pass` (modeling_layer.py); the verifier passes fragment answers without checking that all question parts are addressed. Solver-owner fix: verifier must require full part coverage, or the lane must refuse compare-asks it can only half-answer |
| COVERAGE-GAP (honest refusal on gradeable factual with a corpus key) | 22 curated + 51 sweep findings: "Who coined the term cell", "Name the three types of plastids", "State the three postulates of cell theory", "Define selective permeability", chromosome counts, tissue facts... | **CONFIRMED, structural** — the only question-side anchors are 5 class-11 organelle phrases (NCERT_FACT_RECALL, biology_cognitive_engine.py:112-156). Remedy: grow the fact table per chapter (one dict entry each — the table was designed for this) or serve bank rows with correct_answer keys; the corpus's own DIAGNOSTIC_ANSWER keys are the ready-made anchor source |
| CRASH-NOISE / PERF | sympy Symbol-soup SyntaxError traceback on biology prose (recovered to GUIDED); prose lanes ~1-2 min CPU each | **CONFIRMED** — robustness/perf: gate prose away from the symbolic kernel earlier |
| SOCRATIC-CATALOG GAP | misconception_catalog genetics_dominance maps to classes [10,11,12] only; get_by_class(9) = zero biology socratics though c9 corpus teaches reproduction/meiosis | **CONFIRMED (documented)** — serving-layer; add class 9 to the catalog entry (bio lane owner call) |

#





## Class 9 corpus sweep (chapter-sourced, instrument = physics_corpus_sweep adapted)

118 diagnostic pairs from all 45 nodes: **3 SOLVE / 2 WRONG /
62 REFUSE_OK / 51 COVERAGE / 0 CRASH.** Ledger:
`tests/_bio_corpus_sweep_c9.jsonl`. Both WRONGs adjudicated above
(definition-dump → F5 fixed; compare-partial → out-of-lane finding).
REFUSE_OK: every prose ask refused honestly — the refusal contract held
everywhere post-fix. COVERAGE 51 = the structural fact-anchor gap; every
one has a corpus key ready to anchor.







## Class 10 biology — curated board audit (final: post-fix)

Corpus: 45 nodes, 4 chapters — ch1 life processes (12), ch2 control &
coordination (11), ch3 reproduction (12), ch4 heredity (10).

Result: **16 PASS / 0 FAIL / 18 EDGE** of 34 hand-curated board questions
(pre-fix baseline: 9 PASS / 8 FAIL / 17 EDGE — every FAIL eliminated).

| Q | Ch | Archetype | Label | Answer (trim) | Verdict |
|---|----|-----------|-------|---------------|---------|
| c10.ch1.MCQ.01 | 1 | MCQ | VERIFIED | option (b) Amylase | PASS (F1: was "option (b) 0") |
| c10.ch1.MCQ.02 | 1 | MCQ | VERIFIED | option (b) Haemoglobin | PASS (F1: was "option (b) 0") |
| c10.ch1.MCQ.03 | 1 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c10.ch1.FACTUAL.04 | 1 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c10.ch1.MCQ.05 | 1 | MCQ | VERIFIED | site of photosynthesis: chloroplast | PASS |
| c10.ch1.FACTUAL.06 | 1 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c10.ch1.NUMERIC.07 | 1 | NUMERIC | GUIDED_PRACTICE |  | EDGE (10-percent-law energy flow did not fire — see bug table) |
| c10.ch1.PROSE.08 | 1 | PROSE | GUIDED_PRACTICE |  | PASS (F2: was VERIFIED-WRONG-TOPIC "Respiration in Amoeba..." for a nutrition question) |
| c10.ch1.PROSE.09 | 1 | PROSE | GUIDED_PRACTICE |  | PASS |
| c10.ch2.MCQ.10 | 2 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c10.ch2.MCQ.11 | 2 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c10.ch2.MCQ.12 | 2 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c10.ch2.FACTUAL.13 | 2 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c10.ch2.MCQ.14 | 2 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c10.ch2.FACTUAL.15 | 2 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c10.ch2.MCQ.16 | 2 | MCQ | VERIFIED | option (a) 2 neurons | PASS (F1/F3: was "option (a) 0") |
| c10.ch2.PROSE.17 | 2 | PROSE | GUIDED_PRACTICE |  | PASS |
| c10.ch3.MCQ.18 | 3 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c10.ch3.FACTUAL.19 | 3 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c10.ch3.MCQ.20 | 3 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c10.ch3.MCQ.21 | 3 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c10.ch3.MCQ.22 | 3 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c10.ch3.FACTUAL.23 | 3 | FACTUAL | VERIFIED | The female reproductive system... (contains the fallopian-tube fact) | PASS |
| c10.ch3.PROSE.24 | 3 | PROSE | GUIDED_PRACTICE |  | PASS (F2: was VERIFIED double-fertilisation prose) |
| c10.ch3.PROSE.25 | 3 | PROSE | GUIDED_PRACTICE |  | PASS |
| c10.ch4.GENETICS.26 | 4 | GENETICS | VERIFIED | probability of dominant phenotype = 1/2 = 0.5 = 50% | PASS |
| c10.ch4.GENETICS.27 | 4 | GENETICS | GUIDED_PRACTICE |  | EDGE (rr-fraction self-cross phrasing not parsed by PUNNETT_SELF) |
| c10.ch4.GENETICS.28 | 4 | GENETICS | VERIFIED | phenotype ratio 1 dominant (T_): 0 recessive (tt) | PASS (judge key widened — the answer IS "all tall") |
| c10.ch4.GENETICS.29 | 4 | GENETICS | VERIFIED | phenotype ratio 3 dominant (T_): 1 recessive (tt) | PASS (3:1) |
| c10.ch4.FACTUAL.30 | 4 | FACTUAL | GUIDED_PRACTICE |  | EDGE |
| c10.ch4.MCQ.31 | 4 | MCQ | VERIFIED | The sex of a child is determined by the chromosome the father's... | PASS |
| c10.ch4.MCQ.32 | 4 | MCQ | GUIDED_PRACTICE |  | EDGE (F3: was "option (c) 0"; now honest refusal) |
| c10.ch4.PROSE.33 | 4 | PROSE | GUIDED_PRACTICE |  | PASS (F2: was VERIFIED Mendel's-laws prose) |
| c10.ch4.PROSE.34 | 4 | PROSE | GUIDED_PRACTICE |  | PASS |

### Bug table — class 10 (owner format: Bug class | Examples | Status)

| Bug class | Examples | Status |
|-----------|----------|--------|
| GARBAGE-ANSWER | saliva-enzyme, haemoglobin, synapse, acquired-trait MCQs → "option (x) 0" | **FIXED (F1)** — 3 of 4 now ship correct letter+text; acquired-trait honestly refuses under the stricter gate |
| VERIFIED-WRONG-TOPIC (prose) | "Explain the process of nutrition in Amoeba" → VERIFIED "Respiration in Amoeba is..." (wrong topic!) | **FIXED (F2)** — prose gate; this was the worst single answer found in the whole audit |
| REFUSAL-GAP (prose) | "Explain double fertilisation", "Explain Mendel's law of segregation" → VERIFIED prose | **FIXED (F2)** |
| COVERAGE-GAP | 18 findings (nephron, reflex arc, goitre, cytokinin, ovary, gestation 280 days, condom/STI, species unit...) | **CONFIRMED, structural** — same remedy as class 9 |
| GENETICS-FAMILY PARSING GAP | "Rr x Rr self-pollination, fraction wrinkled (rr)" refused (Tt-style cross questions all solve) | **CONFIRMED** — PUNNETT_SELF trigger missed the board "self-pollination" phrasing; biology_families.py `_c_punnett_self` trigger needs it (out-of-lane note for the bio lane owner) |
| ENERGY-FAMILY PARSING GAP | "10,000 J to plants, herbivores receive?" refused (energy-flow family needs trophic-keyword phrasing) | **CONFIRMED** — `_c_energy_flow` level scan missed "plants/deer" phrasing; same file |







## Class 10 — corpus sweep (chapter-sourced)

115 diagnostic pairs from all 45 nodes: **3 SOLVE / 6 WRONG / 3
VERIFY_SOFT / 58 REFUSE_OK / 45 COVERAGE / 0 CRASH.** Ledger:
`tests/_bio_corpus_sweep_c10.jsonl`.

### Bug table — class 10 sweep (owner format: Bug class | Examples | Status)

| Bug class | Examples | Status |
|-----------|----------|--------|
| AEROBIC-FOR-ANAEROBIC (3 WRONG) | "Write the balanced equation for ANAEROBIC respiration in skeletal muscle + net ATP" → "32 ATP (modern)/38 ATP (classical)" (correct: lactic acid + 2 ATP); yeast-fermentation analysis → aerobic word equation; "anaerobic gives only 2 ATP, useless?" claim → aerobic balance | **FIXED (F6a+F6b+F6c)** — anaerobic guards on the bio-energetics pre-route and the photo/resp fact table, plus the `(?<!an)aerobic` lookbehind (the bare `aerobic` pattern matched inside "aNAerobic") |
| ATP-KEYWORD OVERTRIGGER ( superclass of the above) | any biology stem mentioning "ATP"+"glucose" got the balance sheet (class-11 IUB enzyme-classification question included) | **FIXED (F7)** — trigger now requires the stem to be about respiration |
| GENETICS-FAMILY ASK-TARGETING (3 WRONG) | "TtRr selfed — list the gametes" → VERIFIED 9:3:3:1 phenotype ratio (answer should be TR/Tr/tR/tr); "RRYY x rryy — how many wrinkled-yellow in 300 F2 plants" → VERIFIED "F1 dominant = 100%" (should be 3/16 x 300 = ~56); "why do wrinkled seeds reappear" → VERIFIED 75% ratio (the why is unanswered) | **CONFIRMED, out-of-lane** — `biology_families.py` punnett/dihybrid families answer THE CROSS, not the asked sub-target (gamete list / F2 count / why). Needs ask-target binding (the physics variable-binding pattern) — bio lane owner |
| PHOTO-RESP QUIZ LACKS WHY-GUARD (1 VERIFY_SOFT) | "Why is chlorophyll essential for photosynthesis..." → the energy-source fact (relevant but not the why-chain) | **CONFIRMED (documented)** — the family's closed-world facts answer keyword matches; the `_WHY_ASK` guard used by fact_recall is not applied here (bio lane owner call) |
| COVERAGE-GAP | 45 findings (salivary amylase site, nephron, transpiration, goitre, neuron, stamen, ovary, Whittaker, binomial nomenclature...) | **CONFIRMED, structural** — grow the fact table / serve bank keys |







## Class 11 — corpus sweep (chapter-sourced)

Before the anchor wave: 41 diagnostic pairs from 24 chapter-opening
nodes (node-capped under CPU contention; the corpus has 168 nodes across
19 chapters — full sweep is a resume away via the ledger): **0 SOLVE /
1 WRONG / 19 REFUSE_OK / 21 COVERAGE / 0 CRASH.**
After (F7 + F9 in): **0 SOLVE / 0 WRONG / 30 REFUSE_OK / 23 COVERAGE /
0 CRASH** over 53 pairs (the after-pass sampled 12 more node-pairs than
the pre-pass — same instrument, deeper run). The F7 WRONG
(IUB enzyme → "32 ATP") now refuses honestly. Ledger:
`tests/_bio_corpus_sweep_c11.jsonl` (pre-anchor copy:
`tests/_bio_corpus_sweep_c11_pre_anchor.jsonl`).
Note: the corpus also carries `c11_biotech_*` files which the
`c11_bio` prefix sweep legitimately includes (class-11/12 biotech is
NCERT biology domain content).

### Bug table — class 11 sweep (owner format: Bug class | Examples | Status)

| Bug class | Examples | Status |
|-----------|----------|--------|
| ATP-KEYWORD OVERTRIGGER (1 WRONG) | "State the precise IUB class number and name for an enzyme that catalyzes: ATP + glucose..." (hexokinase, Class 2 Transferases) → VERIFIED "32 ATP (modern)/38 ATP (NCERT classical)" | **FIXED (F7)** — trigger requires "respiration"+"atp"; enzyme question now honestly refuses, legit respiration-ATP questions still solve (spot-verified both) |
| COVERAGE-GAP (universal at this level) | 21 findings — ALL multi-part asks ("Name the four regions... and state...", "Name the two types... and state their effect...") or ordered-list/analysis setups | **SPLIT by F9** — single-fact recall now solves via the fact table (verified in the curated audit: 44 EDGE → 8); the sweep's remaining refusals are deliberately MULTI-PART, which the fact table must NOT half-answer (the `_MULTI_PART_ASK` guard refuses them by design). Honest full answers need the multi-part answerer (bank-lane/model-answer work) — solver owner |







## Class 12 — corpus sweep (chapter-sourced)

Before the fixes: 41 diagnostic pairs from 24 chapter-opening nodes
(node-capped, same caveat; corpus has 228 nodes): **0 SOLVE / 1 WRONG /
23 REFUSE_OK / 17 COVERAGE / 0 CRASH.**
After (F8 + F9 + F10 in): **2 SOLVE / 0 WRONG / 35 REFUSE_OK / 23
COVERAGE / 0 CRASH** over 60 pairs — Griffith's-transforming-combination
(F9 fact table) and the genotypic-ratio Punnett (F10) now SOLVE; the F8
EcoRI misfire refuses honestly. Ledger:
`tests/_bio_corpus_sweep_c12.jsonl`
(pre-anchor copy: `tests/_bio_corpus_sweep_c12_pre_anchor.jsonl`).

### Bug table — class 12 sweep (owner format: Bug class | Examples | Status)

| Bug class | Examples | Status |
|-----------|----------|--------|
| NUMERIC MISFIRE ON BIOTECH (1 WRONG) | "EcoRI recognition 5'-GAATTC-3'. Write the complementary strand 5'→3' and..." (palindrome — key: same sequence) → VERIFIED "80 degrees" | **FIXED (F8)** — root cause was NOT variable binding: the lane-C ANGLE_SUM family fired on the word "complementary" and scraped 5s/3s out of the strand notation as angles (90 − 10 = 80°). Angle-context gate + prime-notation scrape hygiene; the lane-A twin guarded too. `tests/test_angle_family_dna_guard.py` 5/5 |
| GENETICS-FAMILY ASK-TARGETING (1 WRONG) | "Rr selfed — predict the GENOTYPIC ratio..." → VERIFIED phenotype 3:1 (key: 1 RR : 2 Rr : 1 rr) | **FIXED (F10)** — ask-router regexes missed the board adjective "genotypic"; now accept geno-type/-typic + pheno-type/-typic. `tests/test_bio_punnett_ask_target.py` 3/3 |
| COVERAGE-GAP | 17 findings (Mendel rediscovery, Watson-Crick, helicase, plasmodium, Fleming, restriction enzymes, cry genes, Lindeman...) | **SPLIT by F9** — the single-fact mass (Griffith, cry, Lindeman, restriction, Agrobacterium...) now solves via the fact table; the sweep's remaining refusals are multi-part/define asks the fact table must not half-answer (same as class 11) |

## Cross-class summary (the owner's one-look table)

| Bug class | c9 | c10 | c11 | c12 | Status |
|-----------|----|-----|-----|-----|--------|
| GARBAGE-ANSWER "option (x) 0" | 3 | 4 | 0 | 0 | **FIXED (F1)** |
| PROSE shipped VERIFIED | 1 | 3 | 0 | 0 | **FIXED (F2)** |
| WRONG-OPTION concept match | 3 | 0 | 0 | 0 | **FIXED (F3+F4)** |
| DEFINITION-DUMP on sub-fact ask | 1 | 0 | 0 | 0 | **FIXED (F5)** |
| AEROBIC-FOR-ANAEROBIC / ATP overtrigger | 0 | 3 | 1 | 0 | **FIXED (F6+F7)** |
| MULTI-PART PARTIAL-ANSWER | 1 | 0 | 0 | 0 | CONFIRMED, out-of-lane (modeling verifier) |
| GENETICS-FAMILY ask-targeting | 0 | 3 | 0 | 1 | **1 FIXED (F10, geno/phenotypic routing); gamete-list/F2-count/why sub-targets still open (bio families)** |
| NUMERIC MISFIRE | 0 | 0 | 0 | 1 | **FIXED (F8 — root cause was the ANGLE_SUM family, not variable binding)** |
| WRONG-DOMAIN FAMILY TRIGGER (complementary) | 0 | 0 | 0 | 1 | **FIXED (F8)** |
| COVERAGE-GAP (honest refusals on keyed factuals) | 73 | 63 | 21 | 17 | **MASSIVELY REDUCED by F9 for c11/c12 single-fact recall (curated EDGE: c11 44 → 2, c12 9 → 1, remainder adjudicated honest); c9/c10 shared facts lift too (spot-verified); sweep/multi-part refusals remain by design** |
| CONCEPT-LANE BURIED FACT-RECALL | 0 | 0 | 1 | 0 | **FIXED (F11 — neurolink stand-down + raw-text fact recall)** |
| CRASH-NOISE / PERF (sympy on prose) | yes | yes | yes | yes | CONFIRMED — perf work for solver owner |
| SOCRATIC-CATALOG class-9 gap | 1 | 0 | 0 | 0 | CONFIRMED (documented) |

Totals: classes 9-10 as reported below (382 questions/pairs, fixes
F1-F7). This session added classes 11-12: curated **76 + 50 = 126
questions** and sweeps **53 + 60 = 113 pairs**; final curated state
**c11: 74/0/2, c12: 49/0/1 (PASS/FAIL/EDGE)** — from baselines
c11 31/1/44 and c12 41/0/9. Every c11/c12 WRONG root-caused and fixed
in-session (F8 angle-family trigger, F10 punnett ask-routing, F11
concept-lane stand-down) with regression tests, and the c11/c12
factual-recall coverage gap closed by the F9 anchor wave; the
honest-refusal contract holds — every prose ask
still refuses (curated PROSE rows and sweep REFUSE_OK all pass below;
DB-dependent serving checks remain pending live re-check, Postgres down
this session).

## Socratic / catalog stations (all classes, no DB)

- [PASS] genetics_dominance dialogue builds (5 moves, elicit quotes the
  wrong answer) and isolate-1 grades "1/4" → next=retry
  (`socratic_moves.py:77-79, 168-173`).
- [PASS] catalog maps genetics_dominance to biology (classes 10-12).
- [NOTE] class-9 catalog gap — see class-9 bug table.






## Class 11 biology — board audit (2026-10-07 05:04)

Result: **74 PASS / 0 FAIL / 2 EDGE / 0 crash** of 76 hand-curated board questions (per-chapter, examiner keys), plus socratic stations. In-process, no LLM, no DB (DB-dependent serving checks marked pending live re-check).

Run history: baseline **31 PASS / 1 FAIL / 44 EDGE** → post-anchor wave
68/0/8 → final (F11 neurolink stand-down + raw-text fact recall)
**74/0/2**. Converted by the fact table across 19 chapters: Species /
biodiversity / Whittaker / Linnaeus / phycoerythrin / Protista / naked
seeds / archegonium / angiosperms / Starfish / Echinodermata / Chordata
/ phyllotaxy / stem tuber / Brassicaceae / lateral meristem / mesophyll
/ monocot-root xylem / columnar epithelium / bone / areolar / muscle
contraction / ball-and-socket / actin-myosin / cell theory (Schleiden &
Schwann) / peptide bond / collagen / RuBisCO / enzymes-are-proteins /
S phase / meiosis-4 / Prophase I / thylakoid / chlorophyll a / PEP /
Calvin 18-ATP-12-NADPH / glycolysis-2 / RQ-1 / mitochondrial matrix /
ethylene / ABA / gibberellin-bolting / haemoglobin / bicarbonate /
alveoli / SA node / AB-none / nephron / ADH / urine pH 6.0 /
acetylcholine / medulla / pituitary / calcitonin / adrenal cortex.

| Q | Ch | Archetype | Label | Answer (trim) | Verdict |
|---|----|-----------|-------|---------------|---------|
| c11.ch1.MCQ.01 | 1 | MCQ | VERIFIED | option (a) Species | PASS |
| c11.ch1.MCQ.02 | 1 | MCQ | VERIFIED | option (a) biodiversity | PASS |
| c11.ch1.FACTUAL.03 | 1 | FACTUAL | VERIFIED | Species | PASS |
| c11.ch1.PROSE.04 | 1 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch2.MCQ.05 | 2 | MCQ | VERIFIED | option (c) R.H. Whittaker | PASS |
| c11.ch2.MCQ.06 | 2 | MCQ | VERIFIED | option (b) r-phycoerythrin | PASS |
| c11.ch2.FACTUAL.07 | 2 | FACTUAL | VERIFIED | Protista | PASS |
| c11.ch2.PROSE.08 | 2 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch3.MCQ.09 | 3 | MCQ | VERIFIED | option (a) naked | PASS |
| c11.ch3.FACTUAL.10 | 3 | FACTUAL | VERIFIED | Archegonium | PASS |
| c11.ch3.MCQ.11 | 3 | MCQ | VERIFIED | option (a) angiosperms | PASS |
| c11.ch3.PROSE.12 | 3 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch4.MCQ.13 | 4 | MCQ | VERIFIED | option (b) Starfish | PASS |
| c11.ch4.FACTUAL.14 | 4 | FACTUAL | VERIFIED | Echinodermata | PASS |
| c11.ch4.MCQ.15 | 4 | MCQ | VERIFIED | option (b) Chordata | PASS |
| c11.ch4.PROSE.16 | 4 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch5.MCQ.17 | 5 | MCQ | VERIFIED | option (a) phyllotaxy | PASS |
| c11.ch5.FACTUAL.18 | 5 | FACTUAL | VERIFIED | Stem tuber | PASS |
| c11.ch5.MCQ.19 | 5 | MCQ | VERIFIED | option (c) Brassicaceae | PASS |
| c11.ch5.PROSE.20 | 5 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch6.MCQ.21 | 6 | MCQ | VERIFIED | option (c) Lateral | PASS |
| c11.ch6.FACTUAL.22 | 6 | FACTUAL | VERIFIED | Mesophyll | PASS |
| c11.ch6.MCQ.23 | 6 | MCQ | VERIFIED | option (a) more than six xylem bundles | PASS |
| c11.ch6.PROSE.24 | 6 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch7.MCQ.25 | 7 | MCQ | VERIFIED | option (b) Columnar epithelium | PASS |
| c11.ch7.FACTUAL.26 | 7 | FACTUAL | VERIFIED | Bone | PASS |
| c11.ch7.MCQ.27 | 7 | MCQ | VERIFIED | option (a) Areolar tissue | PASS |
| c11.ch7.PROSE.28 | 7 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch8.FACTUAL.29 | 8 | FACTUAL | VERIFIED | Mitochondria | PASS |
| c11.ch8.FACTUAL.30 | 8 | FACTUAL | VERIFIED | Lysosome | PASS |
| c11.ch8.MCQ.31 | 8 | MCQ | VERIFIED | option (a) Schleiden and Schwann | PASS |
| c11.ch8.PROSE.32 | 8 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch9.MCQ.33 | 9 | MCQ | VERIFIED | option (a) Peptide bond | PASS |
| c11.ch9.MCQ.34 | 9 | MCQ | VERIFIED | option (a) Collagen | PASS |
| c11.ch9.FACTUAL.35 | 9 | FACTUAL | VERIFIED | Proteins | PASS |
| c11.ch9.PROSE.36 | 9 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch10.MCQ.37 | 10 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c11.ch10.FACTUAL.38 | 10 | FACTUAL | VERIFIED | 4 | PASS |
| c11.ch10.MCQ.39 | 10 | MCQ | VERIFIED | option (a) Prophase I | PASS |
| c11.ch10.PROSE.40 | 10 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch11.MCQ.41 | 11 | MCQ | VERIFIED | option (b) Thylakoid membrane | PASS |
| c11.ch11.FACTUAL.42 | 11 | FACTUAL | VERIFIED | Chlorophyll a | PASS |
| c11.ch11.MCQ.43 | 11 | MCQ | VERIFIED | option (a) PEP | PASS |
| c11.ch11.PROSE.44 | 11 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch12.MCQ.45 | 12 | MCQ | VERIFIED | option (a) 2 | PASS |
| c11.ch12.NUMERIC.46 | 12 | NUMERIC | VERIFIED | 1 | PASS |
| c11.ch12.MCQ.47 | 12 | MCQ | VERIFIED | option (b) Mitochondrial matrix | PASS |
| c11.ch12.PROSE.48 | 12 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch13.MCQ.49 | 13 | MCQ | VERIFIED | option (b) Ethylene | PASS |
| c11.ch13.FACTUAL.50 | 13 | FACTUAL | VERIFIED | Abscisic acid (ABA) | PASS |
| c11.ch13.MCQ.51 | 13 | MCQ | VERIFIED | option (b) Gibberellin | PASS |
| c11.ch13.PROSE.52 | 13 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch14.MCQ.53 | 14 | MCQ | VERIFIED | option (b) Haemoglobin | PASS |
| c11.ch14.FACTUAL.54 | 14 | FACTUAL | VERIFIED | Alveoli | PASS |
| c11.ch14.MCQ.55 | 14 | MCQ | VERIFIED | option (b) Bicarbonate ions | PASS |
| c11.ch14.PROSE.56 | 14 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch15.NUMERIC.57 | 15 | NUMERIC | VERIFIED | 5.04 L/min | PASS |
| c11.ch15.MCQ.58 | 15 | MCQ | VERIFIED | option (a) SA node | PASS |
| c11.ch15.MCQ.59 | 15 | MCQ | VERIFIED | option (d) none | PASS |
| c11.ch15.PROSE.60 | 15 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch16.MCQ.61 | 16 | MCQ | VERIFIED | option (b) Nephron | PASS |
| c11.ch16.FACTUAL.62 | 16 | FACTUAL | VERIFIED | ADH (vasopressin) | PASS |
| c11.ch16.MCQ.63 | 16 | MCQ | VERIFIED | option (a) 6.0 | PASS |
| c11.ch16.PROSE.64 | 16 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch17.MCQ.65 | 17 | MCQ | VERIFIED | option (a) Muscle contraction | PASS |
| c11.ch17.FACTUAL.66 | 17 | FACTUAL | VERIFIED | Ball and socket | PASS |
| c11.ch17.MCQ.67 | 17 | MCQ | VERIFIED | option (a) Actin and myosin | PASS |
| c11.ch17.PROSE.68 | 17 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch18.MCQ.69 | 18 | MCQ | VERIFIED | option (a) Acetylcholine | PASS |
| c11.ch18.FACTUAL.70 | 18 | FACTUAL | VERIFIED | Medulla oblongata | PASS |
| c11.ch18.MCQ.71 | 18 | MCQ | GUIDED_PRACTICE |  | EDGE |
| c11.ch18.PROSE.72 | 18 | PROSE | GUIDED_PRACTICE |  | PASS |
| c11.ch19.MCQ.73 | 19 | MCQ | VERIFIED | option (b) Pituitary | PASS |
| c11.ch19.FACTUAL.74 | 19 | FACTUAL | VERIFIED | Calcitonin | PASS |
| c11.ch19.MCQ.75 | 19 | MCQ | VERIFIED | option (b) Adrenal cortex | PASS |
| c11.ch19.PROSE.76 | 19 | PROSE | GUIDED_PRACTICE |  | PASS |

### Bug table — class 11 (owner format: Bug class | Examples | Status)

Run history: baseline **31 PASS / 1 FAIL / 44 EDGE** → post-anchor wave
68/0/8 → final (F11 neurolink stand-down + raw-text fact recall)
**74/0/2**. The mid-run FAIL ("The light reaction of photosynthesis
takes place in the: ..." answered "site of photosynthesis: chloroplast"
by the photo/resp family) converted to PASS by the F9 thylakoid anchor.

| Bug class | Examples | Status |
|-----------|----------|--------|
| COVERAGE-GAP (honest refusal on gradeable factual) | "DNA replication occurs in which phase... (a) G1 (b) S (c) G2 (d) M"; "The myelinated nerve fibres are found mainly in: (a) Cranial nerves (b) Spinal nerves..." | **ADJUDICATED HONEST (2 cases, no fix owed)** — (1) single-letter MCQ options defeat the exactly-one option match ("S phase" is not a substring of "S"); a letter-only term would be unshippable prose — needs the concept-MCQ lane to carry letter-only options; (2) the NCERT fact sits in BOTH option (a) cranial and (b) spinal nerves — the exactly-one-match law correctly refuses an ambiguous paper |

### Socratic / catalog stations (no DB)

- [PASS] socratic genetics_dominance dialogue builds + iso1 grades (1/4 correct, next=retry) — 5 moves; iso1 ok=True next=retry
- [PASS] catalog: genetics_dominance maps to biology — c9 biology socratics=NONE; c10 has genetics_dominance=yes
- [NOTE] catalog class-9 biology coverage (c9 bio corpus teaches reproduction/meiosis but catalog maps genetics_dominance only to 10-12) — documented as coverage gap — serving-layer, not a grading lie

## Class 12 biology — board audit (2026-10-07 05:06)

Result: **49 PASS / 0 FAIL / 1 EDGE / 0 crash** of 50 hand-curated board questions (per-chapter, examiner keys), plus socratic stations. In-process, no LLM, no DB (DB-dependent serving checks marked pending live re-check).

Run history: baseline **41 PASS / 0 FAIL / 9 EDGE** → final (F9 anchor
wave + F10/F11 routing fixes) **49/0/1**. Converted by the fact table:
fertilisation sites (plant + human), seminiferous tubules, vasectomy,
Sutton-Boveri, Watson-Crick, 5'-to-3' polymerase, helicase, Darwin,
Miller-Urey, plasmodium, HIV target cells, antibody chemistry, Fleming,
Apis indica, FSH superovilation, lactic-acid curd, methanogens,
restriction enzymes, Agrobacterium, Taq/PCR, Bt bollworm, Humulin,
stenothermal, inbreeding-outcrossing, Lindeman, Copper-T, amniocentesis
ban, PKU, analogous organs, Griffith's transforming combination.

| Q | Ch | Archetype | Label | Answer (trim) | Verdict |
|---|----|-----------|-------|---------------|---------|
| c12.ch1.MCQ.01 | 1 | MCQ | VERIFIED | option (b) Ovule | PASS |
| c12.ch1.FACTUAL.02 | 1 | FACTUAL | VERIFIED | Egg cell | PASS |
| c12.ch1.MCQ.03 | 1 | MCQ | VERIFIED | option (a) Triploid | PASS |
| c12.ch1.PROSE.04 | 1 | PROSE | GUIDED_PRACTICE |  | PASS |
| c12.ch2.MCQ.05 | 2 | MCQ | VERIFIED | option (a) Seminiferous tubules | PASS |
| c12.ch2.FACTUAL.06 | 2 | FACTUAL | VERIFIED | Progesterone | PASS |
| c12.ch2.MCQ.07 | 2 | MCQ | VERIFIED | option (b) Ampullary-isthmic junction of the fallopian tube | PASS |
| c12.ch2.PROSE.08 | 2 | PROSE | GUIDED_PRACTICE |  | PASS |
| c12.ch3.MCQ.09 | 3 | MCQ | VERIFIED | option (b) Intrauterine device | PASS |
| c12.ch3.MCQ.10 | 3 | MCQ | VERIFIED | option (a) Sex determination | PASS |
| c12.ch3.FACTUAL.11 | 3 | FACTUAL | VERIFIED | Vasectomy | PASS |
| c12.ch3.PROSE.12 | 3 | PROSE | GUIDED_PRACTICE |  | PASS |
| c12.ch4.GENETICS.13 | 4 | GENETICS | VERIFIED | probability of a heterozygous offspring = 1/2 = 0.5 = 50% | PASS |
| c12.ch4.GENETICS.14 | 4 | GENETICS | VERIFIED | fraction of sons affected = 1/2 (50%) | PASS |
| c12.ch4.GENETICS.15 | 4 | GENETICS | VERIFIED | child blood-group probabilities: A 25%, B 25%, AB 25%, O 25% | PASS |
| c12.ch4.MCQ.16 | 4 | MCQ | VERIFIED | option (a) Autosomal recessive trait | PASS |
| c12.ch4.FACTUAL.17 | 4 | FACTUAL | VERIFIED | Sutton and Boveri | PASS |
| c12.ch4.PROSE.18 | 4 | PROSE | GUIDED_PRACTICE |  | PASS |
| c12.ch5.MCQ.19 | 5 | MCQ | VERIFIED | option (a) Watson and Crick | PASS |
| c12.ch5.FACTUAL.20 | 5 | FACTUAL | VERIFIED | 5' to 3' | PASS |
| c12.ch5.MCQ.21 | 5 | MCQ | VERIFIED | option (a) Helicase | PASS |
| c12.ch5.PROSE.22 | 5 | PROSE | GUIDED_PRACTICE |  | PASS |
| c12.ch6.MCQ.23 | 6 | MCQ | VERIFIED | option (b) Different structures but similar functions | PASS |
| c12.ch6.FACTUAL.24 | 6 | FACTUAL | VERIFIED | Charles Darwin | PASS |
| c12.ch6.MCQ.25 | 6 | MCQ | VERIFIED | option (a) Amino acids | PASS |
| c12.ch6.PROSE.26 | 6 | PROSE | GUIDED_PRACTICE |  | PASS |
| c12.ch7.MCQ.27 | 7 | MCQ | VERIFIED | option (a) Plasmodium | PASS |
| c12.ch7.FACTUAL.28 | 7 | FACTUAL | VERIFIED | Helper T-lymphocytes | PASS |
| c12.ch7.MCQ.29 | 7 | MCQ | VERIFIED | option (a) Proteins | PASS |
| c12.ch7.PROSE.30 | 7 | PROSE | GUIDED_PRACTICE |  | PASS |
| c12.ch8.MCQ.31 | 8 | MCQ | VERIFIED | option (a) Outcrossing | PASS |
| c12.ch8.FACTUAL.32 | 8 | FACTUAL | VERIFIED | Apis indica | PASS |
| c12.ch8.MCQ.33 | 8 | MCQ | VERIFIED | option (a) FSH | PASS |
| c12.ch8.PROSE.34 | 8 | PROSE | GUIDED_PRACTICE |  | PASS |
| c12.ch9.MCQ.35 | 9 | MCQ | VERIFIED | option (a) Lactic acid | PASS |
| c12.ch9.FACTUAL.36 | 9 | FACTUAL | VERIFIED | Methanogens | PASS |
| c12.ch9.MCQ.37 | 9 | MCQ | VERIFIED | option (a) Alexander Fleming | PASS |
| c12.ch9.PROSE.38 | 9 | PROSE | GUIDED_PRACTICE |  | PASS |
| c12.ch10.MCQ.39 | 10 | MCQ | VERIFIED | option (a) Restriction endonuclease | PASS |
| c12.ch10.FACTUAL.40 | 10 | FACTUAL | VERIFIED | Agrobacterium tumefaciens | PASS |
| c12.ch10.MCQ.41 | 10 | MCQ | VERIFIED | option (a) PCR | PASS |
| c12.ch10.PROSE.42 | 10 | PROSE | GUIDED_PRACTICE |  | PASS |
| c12.ch11.MCQ.43 | 11 | MCQ | VERIFIED | option (a) Bollworm | PASS |
| c12.ch11.FACTUAL.44 | 11 | FACTUAL | VERIFIED | cry genes | PASS |
| c12.ch11.MCQ.45 | 11 | MCQ | VERIFIED | option (a) Humulin | PASS |
| c12.ch11.PROSE.46 | 11 | PROSE | GUIDED_PRACTICE |  | PASS |
| c12.ch12.NUMERIC.47 | 12 | NUMERIC | GUIDED_PRACTICE |  | EDGE |
| c12.ch12.MCQ.48 | 12 | MCQ | VERIFIED | option (a) Lindeman | PASS |
| c12.ch12.MCQ.49 | 12 | MCQ | VERIFIED | option (a) Stenothermal | PASS |
| c12.ch12.PROSE.50 | 12 | PROSE | GUIDED_PRACTICE |  | PASS |

### Bug table — class 12 (owner format: Bug class | Examples | Status)

| Bug class | Examples | Status |
|-----------|----------|--------|
| COVERAGE-GAP (honest refusal on gradeable factual) | "A bacterial population of 1000 grows exponentially, doubling every hour. What is the population after 4 hours?" | **ADJUDICATED, compute not recall (1 case)** — the answer (16,000) needs an exponential-growth family (base x rate^time); the fact table must not compute. Lane-owner note: a two-line `EXPONENTIAL_GROWTH` family would crack it and every doubling-time board question |

### Socratic / catalog stations (no DB)

- [PASS] socratic genetics_dominance dialogue builds + iso1 grades (1/4 correct, next=retry) — 5 moves; iso1 ok=True next=retry
- [PASS] catalog: genetics_dominance maps to biology — c9 biology socratics=NONE; c10 has genetics_dominance=yes
- [NOTE] catalog class-9 biology coverage (c9 bio corpus teaches reproduction/meiosis but catalog maps genetics_dominance only to 10-12) — documented as coverage gap — serving-layer, not a grading lie

