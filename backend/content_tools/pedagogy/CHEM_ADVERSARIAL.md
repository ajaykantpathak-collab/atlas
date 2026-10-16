# CHEM-ADVERSARIAL — full-class chemistry regression (c9-c12)

Agent: CHEM-ADVERSARIAL, 2026-10-06. Method mirrors the owner's class-7-maths
hand-test: REAL board-style questions curated per chapter from the corpus
(diagnostics + NCERT numericals), run through `answer_pipeline.answer` in-process
(SOLVER_LLM_MODE=off), graded by an examiner (every answer's chemistry verified
independently — VERIFIED does not mean correct).

Classes done one at a time: 9 -> 10 -> 11 -> 12 (+ c6-8 spot check + generator audit).
NOTE: Postgres went down mid-session (owner closing Docker). Bank/DB-lane
verifications are marked PENDING-LIVE-RECHECK; family-lane work is file-based.

Environment: PYTHONPATH=D:/platform/deploy, SOLVER_LLM_MODE=off.

## BUG TABLE (owner format: Bug class | Examples | Status)

### CLASS 9 CHEMISTRY (ch1 Matter & its states + separation, ch2 Atomic structure, ch3 Atoms and Molecules)

| # | Bug class | Examples (verbatim) | Status |
|---|-----------|---------------------|--------|
| CHEM-1 | Input normalizer mangles chemical formulas into exponents (app-killing) | "Balance the chemical equation: H2 + O2 -> H2O" -> GUIDED (normalizer: H2O -> "H^2O"); "Balance the chemical equation: Fe + H2O -> Fe3O4 + H2" -> GUIDED ("Fe^3O4") | REAL BUG. Root cause: `math_kernel._fix_flattened_exponents` — `_POLY_CONTEXT_RE` fires on the word "equation" (and "="), then `_FLAT_EXP_WORD_RE = [A-Za-z]+[23](?![0-9.^])` rewrites H2->H^2, O2->O^2, H2O->H^2O, Fe3->Fe^3. Chemistry families then gate (no formula token parses) -> the most standard board question on the platform refuses. Fix: formula-token guard in the flattened-exponent repair (chem-shaped tokens are skipped); maths "ax2"/"x2" behavior untouched (lowercase). |
| CHEM-2 | Common compound NAMES not resolved to formulas (families gate on formula tokens) | "Calculate the number of moles in 18 g of water." -> GUIDED (families need a formula token; "water" isn't scanned); "Calculate the mass of 0.5 mole of water." -> GUIDED; NCERT intext 3.2/3.5 phrasings use names constantly | REAL BUG. Root cause: chemistry_families scanners extract `_F_TOKEN` formulas only; no name->formula alias layer. Fix: add `COMPOUND_ALIASES` (water, common salt, quicklime, limestone, marble, baking soda, washing soda, glucose, ammonia, dry ice, etc.) and rewrite names to formulas at family entry. |
| CHEM-3 | Particles-from-MASS not handled (only moles<->particles) | "How many molecules of water are there in 18 g of water?" -> GUIDED (regex requires the count word followed by "moles"); NCERT exercise 3.5.4 "molecules of S8 in 16 g of solid sulphur" | REAL BUG. Root cause: `_PARTICLES_RX` only bridges mol<->N; mass->n->N bridge missing. Fix: extend the family with a mass variant (n = m/M, then N = n x 6.022e23). |
| CHEM-4 | PAL lane serves precision-corrupted molar masses when DB/learned templates hit (PENDING-LIVE-RECHECK, DB down) | "Calculate the number of moles in 18 g of water." with DB up -> VERIFIED **0.9991** via structure:PAL_PROGRAM (program computed 18/18.015); "mass of 0.5 mole of water" -> **9.008** g (0.5 x 18.015). Board answer: 1 mol / 9 g | REAL BUG (mechanism confirmed in code + smoke1 outputs). The LLM-written PAL program picks IUPAC masses (18.015) while the chemistry registry's ATOMIC_MASS is board-standard (H=1, O=16 -> 18). Learned template store also holds hardcoded-literal programs. Fix direction: chemistry families (with name aliases) win the sweep tie (they run first in `model_problem._model_problem_uncached` first_pass; best-kept-first tie-break). Live-path re-check pending DB. |
| CHEM-5 | Balance-by-name ("Write the balanced equation for zinc + sodium hydroxide ...") refuses | "Write the balanced chemical equation for: Zinc + sodium hydroxide -> sodium zincate + hydrogen" -> GUIDED | REAL GAP (word-equation balancing, no formulas given). Board-standard c10 phrasing. Fix: name->formula alias layer + skeleton parser tolerance (lowercase species words) where deterministic. |

### CLASS 9 BEFORE/AFTER NUMBERS (37-question battery, DB-down family-lane mode)

BEFORE fixes: 9 VERIFIED-correct, 1 WRONG-ANSWER (K2CO3 -> "12"), 1 pipeline
CRASH (glucose AttributeError), 27 refusals of which ~15 were standard
board numericals/procedures that must solve (balance x2, mole-from-mass x2,
particles-from-mass x2, formula-unit-mass x2, avg-mass 3-isotope, mass% H,
constant proportions, conservation mass, K->C x2, v/v percent, e-config,
write-formula downgrade). Verdict per question held in
chem_adv/c9_before.jsonl.

## FIXES APPLIED (file:line)

| Fix | File | What |
|-----|------|------|
| FIX-1 CHEM-1 | its/solver/math_kernel.py (~L131-230) | `_is_chem_formula_token` / `_paren_group_is_formula` guards in `_fix_flattened_exponents`: formula-shaped tokens (H2, H2O, Fe3O4, Na2SO4, Ca3(PO4)2 groups) are never caret-repaired. Lowercase maths ("x2", "ax2") unchanged — verified both directions. |
| FIX-2 CHEM-2 | its/solver/chemistry_families.py ALIAS_MAP + `_apply_compound_aliases` | 70+ board compound names -> formulas at family entry. Guards: formula-writing asks skipped; protected phrases (water of crystallisation/hydration, heavy/rose/mineral/soda water) masked out. |
| FIX-3 CHEM-3 | chemistry_families.py `_PARTICLES_MASS_RX` + `_c_particles_mass` (row PARTICLES_FROM_MASS) | mass -> moles -> N bridge ("molecules in 18 g of water", NCERT "S8 in 16 g of sulphur" with named-species tolerance). |
| FIX-4 CHEM-6/7 | chemistry_families.py `_MOLMASS_RX` + answer_pipeline.py `_kernel_formula_mass_mismatch` | "formula unit mass" now triggers the family AND the kernel-mismatch guard (kernel was solving the stated-mass list "(K = 39, C = 12, O = 16)" as equations -> confident "12"). |
| FIX-5 | chemistry_families.py `_c_avg_mass` | "(99.76%)" paren form + decimal abundances + dedupe; oxygen 3-isotope average now 16.0044 u. |
| FIX-6 | chemistry_families.py rows ELECTRONIC_CONFIG / SUBATOMIC_COUNTS / CONC_VOLUME_PERCENT / KELVIN_CELSIUS / CONSTANT_PROPORTIONS / CONSERVATION_MASS | c9 board gap families: Bohr-Bury config + valency (Z<=20), ion charge = Z - electrons, v/v + mass/volume percent, K<->C, fixed-ratio scaling, conservation subtraction. |
| FIX-7 | answer_pipeline.py M16 guard | chemistry deliverable exemption: write/state chemical-formula, electronic-configuration, balanced-equation asks keep their VERIFIED formula answer (formula-shaped strings only). |

### FIX-8 (found in class-9 pass, c10-scoped impact): chempy_engine hydrate-dot corruption

`chempy_engine.compute_molar_mass` / `get_formula_composition` delegate to
ChemPy `Substance.from_formula`, which silently mangles hydrate dots:
CuSO4.5H2O parsed as {Cu:1, S:1, O:5, H:10} -> mass **185.5** (should be
249.5; the anhydrous O4 is dropped). Every hydrate numerical served through
`chemistry_families.molar_mass` inherited the wrong mass. Fix: hydrate split
`_split_hydrate` + `_composition_single` in chempy_engine.py — parts parsed
separately, scaled, merged; verified 249.5 / 286 (Na2CO3.10H2O) / 172
(CaSO4.2H2O) / 278 (FeSO4.7H2O); non-hydrate formulas unchanged (CO2 = 44).

### Generator instrument (sampling plan)

solvers/chem/class11_chem_questions.py exposes `generate_batch(seed, n)`
(20 topic generators, deterministic). class10/class12 expose per-topic
`gen_*_problem(VarGen(seed), competency=...)`. Generator audit = sample 30
(class11 batch + class12 topics + class10 topics), verify each carried
answer independently (recompute from the template numbers), report defect
rate. Pending CPU window (batches own the machine now).

## ROUND 2 (class-10 battery + c9 sweep cross-check)

| # | Bug class | Examples (verbatim) | Status |
|---|-----------|---------------------|--------|
| CHEM-9 | pH spec ignores acid PROTICITY | "Calculate the pH of a 0.001 M H2SO4 solution, assuming complete dissociation." -> VERIFIED **3** (mono-protic). Board: 2 x 0.001 -> 2.7 (log 2 = 0.30 given) | REAL WRONG-ANSWER. Fix: `structure_families._c_neet_ph_calculation` multiplies [H+] by the leading-H count when "complete dissociation" is stated. |
| CHEM-10 | neurolink concept lane answers chemistry terms with FOREIGN nodes | "Define catenation." -> VERIFIED **"String concatenation joins two or more strings..."** (c11_cs_cbse_06_004 — 'catenation' substring-matches 'conCATENATION'); "What is Formula unit mass? State the definition given in this lesson." -> VERIFIED **geography CONTOUR-LINE node** (c7_geo_icse_07_001) | REAL WRONG-ANSWER (app-killing). Fix: term-relevance guard at the answer() choke point — every content term of the ask must appear at a word boundary in the answer or node title; else the pre-route is skipped and computed lanes run. |
| CHEM-11 | balancer rejects STATE-TAGGED equations | "Balance: BaCl2(aq) + Na2SO4(aq) -> BaSO4(s) + NaCl(aq)" -> GUIDED (board c10 always writes states) | REAL GAP. Fix: strip (s)/(l)/(g)/(aq) in chemistry_families._parse_equation before species split. Verified: -> "BaCl2 + Na2SO4 -> BaSO4 + 2 NaCl". |
| CHEM-12 | M16 guard downgraded chemistry deliverables (2nd form) | "Write the balanced chemical equation ... Al + N2 -> AlN" swept VERIFIED then downgraded (answer contains ':' not in the deliverable charclass); "State the valency of magnesium (atomic number 12)" downgraded (no valency ask in the exemption) | REAL. Fix: charclass adds ":.?" and the ask regex adds valency. |
| CHEM-13 | answer-shape guard vetoed numeric verify-asks | "Lithium (7 u), sodium (23 u), potassium (39 u)... Verify the law of triads." -> vetoed by `verify\s` guard though the triad's deliverable IS a number | REAL. Fix: DOBEREINER_TRIAD exempt in modeling_layer answer-shape guard. |
| CHEM-14 | homolog family blind to ALCOHOL series | "Name the next homologous member of ethanol (C2H5OH)." -> GUIDED (regex needed CnHm boundary; OH tail blocked it) | REAL GAP. Fix: CnH(2n+1)OH branch -> propanol C3H7OH. |
| CHEM-15 | registry string-constant .search crash + nested-group findall unpack | _c_conservation/_c_constant_proportions called `.search` on plain strings (AttributeError -> silent row gate); _c_avg_mass tuple unpack broke when _PCT gained a nested capture (iso entries silently dropped -> gate) | REAL (self-inflicted during this session, caught by the battery). Both fixed; documented because the pattern (silent per-row except) hides them. |
| GAP-A | precipitate stoichiometry from NAMES only | "5.0 g of sodium carbonate with excess calcium chloride... mass of calcium carbonate precipitate" (molar masses given, reaction NOT stated) -> honest refuse | DOCUMENTED GAP: deterministic product prediction needs a reaction database; refusing is the honest tier. |
| GAP-B | unicode isotope notation | "O-16 (99.76%)" solves; "¹⁶₈O (99.76%)" refuses (superscript+subscript flatten to '168O') | DOCUMENTED GAP (pending normalizer nuclear-notation rule). |

## FINAL PER-CHAPTER PASS RATES (hand batteries, examiner-graded; DB-down family-lane mode)

VERIFIED = pipeline served a verified answer AND the chemistry independently
checks out. Refusals are honest tiers (prose questions; the bank/corpus lanes
that serve prose are PENDING-LIVE-RECHECK with DB).

### Class 9 (37 questions: ch1 x9, ch2 x8, ch3 x20) — before -> final
| chapter | before VERIFIED | final VERIFIED | honest refusals | WRONG |
|---------|-----------------|----------------|-----------------|-------|
| ch1 Matter/states/separations | 3 | 5/9 | 4 prose | 0 |
| ch2 Atomic structure | 2 | 6/8 | 2 prose | 0 |
| ch3 Atoms and Molecules | 4 | 19/20 | 1 prose | 0 (was 1 WRONG: K2CO3->"12", fixed) |
| TOTAL | 9 (1 WRONG, 1 CRASH) | **30/37** | 7 | **0** |

### Class 10 (40 questions: ch1 x10, ch2 x10, ch3 x6, ch4 x8, ch5 x6)
| chapter | final VERIFIED | honest refusals | WRONG |
|---------|----------------|-----------------|-------|
| ch1 Chemical Reactions | 7/10 | 3 (prose + GAP-A precipitate) | 0 |
| ch2 Acids Bases Salts | 5/10 | 5 (prose + reaction-writing gap) | 0 (was 1 WRONG: pH H2SO4, fixed) |
| ch3 Metals | 4/6 | 2 prose | 0 |
| ch4 Carbon | 3/8 | 5 (prose/naming) | 0 (was 1 WRONG: catenation->string-concat, fixed) |
| ch5 Periodic Table | 3/6 | 3 prose | 0 |
| TOTAL | **22/40** | 18 | **0** |

### Class 11 (27 questions) and Class 12 (25 questions): see FINAL RUN below.

## GENERATOR AUDIT (solvers/chem/*)

Sample: 310 generator calls across every gen_*_problem in classes 10/11/12
(10 seeds each) + 60 via class11 generate_batch. BEFORE: 188/310 OK (39%
sample-loss), 13/24 generators crashing. ROOT CAUSES + FIXES:
- GEN-1 (c12 kinetics): topic pool offered kinetics_first_order /
  kinetics_arrhenius; SOLVER_REGISTRY had neither key -> KeyError 2/3 of
  kinetics draws. Fix: implemented both solvers (t1/2/t80/rate; Ea from
  k1,k2,T1,T2) + registered.
- GEN-2 (c11 atomic structure + equilibrium): vg.float(1e-12, 5e-12, dp=4)
  rounds sub-nano values to 0.0 -> ZeroDivisionError. Fix: raw uniform +
  significant-digit rounding (6 sites).
- GEN-3 (c11 redox/bonding/periodic/hydrogen): solver-signature drift —
  variables dicts not matching solver params (NameError: place; vsepr
  hybridization-only branches; IE-only branch; empty hydride variables).
  Fix: bound every call site to its solver signature.
- GEN-4 (c12 7 generators): 12 topic-pool keys with no registered solver.
  Fix: pools pruned to registered keys (missing solvers documented as
  feature gaps).
AFTER: **310/310 OK, 0 crashing generators.** Defect rate by the owner
definition (wrong/unusable samples): 0 crash-class; chemical verification
of generated Q/A pairs: constructed values are self-consistent by design
(solver round-trip), spot-checked (Ea=60.0 kJ template, t1/2=ln2/k).

## ROUND 3 (class-11/12 finals + generator completion)

| # | Bug class | Examples | Status |
|---|-----------|----------|--------|
| CHEM-16 | kernel solves stated atomic-mass LISTS as equations on mole/molarity asks | "Calculate the number of moles in 5.85 g of NaCl. (Na = 23, Cl = 35.5)" -> VERIFIED **3.93162**; "molarity of 4 g of NaOH in 500 mL (Na=23,O=16,H=1)" -> VERIFIED **23** | REAL WRONG-ANSWER. Fix: `_kernel_chem_stated_mass_mismatch` guard in answer_pipeline (sibling of the formula-mass guard): mole/molarity/molality asks carrying a stated mass list whose kernel value != n = m/M drop the kernel verdict; chemistry registry answers. Verified: 0.1 / 0.2 / 13 (He control). |
| CHEM-17 | MOLES structure spec shipped n=m/M for molality/molarity/mole-fraction asks | "molality ... 18 g glucose (molar mass 180) in 500 g water" -> VERIFIED "0.1 mol"; same for molarity, mole fraction | REAL WRONG-ANSWER. Fix: concentration-ask refuse in `_c_moles` + `_c_mole_mass`; MOLALITY/MOLARITY_MASS/MOLE_FRACTION families now solve them (0.2 m / 0.2 M / 0.0196). |
| GAP-C | de Broglie constant binding (cross-lane, physics owners) | "wavelength of an electron, v = 2.05e7 m/s, m = 9.11e-31 kg" -> VERIFIED **3.2322e-11** (= m treated as 1.0e-30); true 3.548e-11 | PHYSICS-LANE FINDING (kernel used a rounded default electron mass instead of the stated one). P1 for the physics owners; not fixed in the chemistry lane. |
| GAP-D | reaction-prediction asks | "Write the balanced equation for sodium hydrogencarbonate + dilute HCl" -> honest refuse | DOCUMENTED GAP: product prediction needs the reaction database (REACTION_DB exists for verification but not synthesis); honest tier stands. |
| MAINT | heredoc-authored `\b` bytes repeatedly corrupted to backspace chars during this session (regex silently dead) | MOLES guard, Kb/Kf filler, molality solvent regex | All scrubbed repo-wide (chr(8) scan = 0 across its/solver). Lesson recorded: patch content with regex `\b` must go through the Write tool, never bash heredocs. |

### Class 11/12 FINAL RATES (updating after CHEM-16/17 fixes — see FINAL2 below)

### Class 11 (27 questions) FINAL2
| chapter | VERIFIED-correct | honest refusals | wrong |
|---------|------------------|-----------------|-------|
| ch1 Some Basic Concepts | 5/7 (180, 0.1, CH2O, C6H12O6, 9.033e23) | sig-figs gap | 0 (was 2 WRONG: kernel stated-mass hijacks, fixed) |
| ch2 Atomic Structure | 1/4 (pH) | 3 | 1 cross-lane: de Broglie constant binding (GAP-C, physics owners) |
| ch3 Periodicity | 0/2 | 2 prose | 0 |
| ch5 Thermodynamics | 0/2 | 2 (Gibbs/entropy formats) | 0 |
| ch6 Equilibrium | 1/4 (pH) | 3 (Kc-table, Le Chatelier prose, Ka-acid format) | 0 |
| ch7 Redox | 2/4 (+7, +6) | 2 (ion-charge oxnum, agents prose) | 0 |
| ch9 Hydrocarbons | 1/4 (combustion balance) | 3 | 0 |
| TOTAL | **10/27** | 17 | 0 in-lane (1 cross-lane documented) |

### Class 12 (25 questions) FINAL2
| chapter | VERIFIED-correct | honest refusals | wrong |
|---------|------------------|-----------------|-------|
| ch1 Solutions | 5/5 (molality, molarity, mole fraction, pi, dTb) | 0 | 0 (was 3 WRONG: MOLES hijack, fixed) |
| ch2 Electrochemistry | 2/3 (289500 C, 965 s) | 1 (Nernst cell notation) | 0 |
| ch3 Kinetics | 2/4 (t1/2, Ea) | 2 | 0 |
| ch5-ch10 (coordination/organic/biomolecules) | 1/13 (glucose formula) | 12 concept/prose | 0 |
| TOTAL | **10/25** | 15 | **0** |

## COMPLETION STATUS

- Zero WRONG-ANSWER remaining in the chemistry lanes across c9-c12 finals
  (before: 5 confident-wrong classes: K2CO3->12, pH diprotic, catenation/
  contour foreign nodes, MOLES hijack x3, kernel stated-mass x2 — all fixed
  and regression-tested).
- Honest-refusal remainder is prose/concept territory (bank + corpus lanes
  serve it in production; DB-down here) + documented gaps GAP-A..D.
- Regression suite: backend/tests/test_chem_adversarial.py (70+ cases).
- Corpus sweep instrument: backend/tests/chem_corpus_sweep.py (per-chapter,
  numeric-priority, c9 run committed at _chem_corpus_sweep_c9.jsonl).
- PENDING-LIVE-RECHECK (Postgres down this session): bank-lane prose
  coverage, PAL-lane live behaviour (CHEM-4), corpus model_answer lanes.

## ROUND 4 (import-cycle discovery — pytest-full-suite failure root-caused)

The first full pytest run failed 56/82 while every batch run passed. Bisected
to an IMPORT-CYCLE: `chemistry_families.py` line 49 imports `ModelResult`
from `modeling_layer`, which itself imports `model_chemistry_families`
(batch-15b). When chemistry_families is imported FIRST (any test module
importing it at module level), modeling_layer's batch-15b import hits the
partially-initialized module, ImportErrors, is silently swallowed — and the
entire chemistry registry never registers into `_STRUCTURES` for that
process. Every chemistry question then fell to PAL/competency lanes.

Fixes:
- chemistry_families: `ModelResult` lazy re-resolution (`_ensure_model_result_cls`)
  + module-end SELF-REGISTRATION into `modeling_layer._STRUCTURES`,
  inserted BEFORE `model_structure` (PAL must not win 0.96 ties).
- chemistry_families `_res`: verified computes promote to confidence 0.96
  (same rationale as model_structure's own promotion).
- answer_pipeline structure-shortcut: CHEMISTRY OWNERSHIP — when a
  PAL_PROGRAM result answers a chemistry-parseable numeric the registry
  also solves, the shortcut declines (registry = board atomic-mass table;
  learned PAL programs used IUPAC masses: "18 g water" -> 0.9991 mol).
- Runtime data hygiene: purged 77 mis-learned chemistry PAL templates
  (IUPAC-mass mole/molecule programs) from cbse_data/pal_templates.json
  (.bak_chemadv kept) and the poisoned answer_memo entries.

VERIFIED after all four: balancing, moles-in-18g-water = 1 mol, mass = 9 g,
molecules = 6.022e23, CO2 = 44, pH — all PASS in BOTH import orders.

## REGRESSION SUITE — GREEN

`python -m pytest backend/tests/test_chem_adversarial.py -q`
-> **82 passed** (2026-10-06, DB-down mode). Covers: normalizer chem-guard
(formulas preserved + maths repair intact, both directions), 10 balancing
cases incl. state symbols, named-compound moles/mass/particles, molecular &
formula-unit masses (incl. the kernel stated-mass-list hijack), hydrate
masses + water-of-crystallisation, avg atomic mass (2- and 3-isotope),
K<->C, v/v percent, constant proportions, conservation of mass, ion charge,
isotope p/n/e, neutrons, electronic configuration + valency, period/group,
Dobereiner triad, formula-writing (4 named compounds), pH (mono- + di-protic),
mass percent, concept-lane foreign-node guard, molality/molarity/mole
fraction/osmotic/ΔTb, faraday charge + plating time, Arrhenius doubling,
half-life, and the GAP-A honest-refusal contract.

## FILES TOUCHED

- its/solver/math_kernel.py — chem-token guards in flattened-exponent repair
- its/solver/chemistry_families.py — ALIAS_MAP + 14 new/extended families,
  particles-from-mass, hydrate percent, formula-of-named, mole-fraction mass
  branch, faraday branches, Kb/Kf fillers, confidence 0.96, self-registration
  + ModelResult cycle guard
- its/solver/answer_pipeline.py — formula-unit-mass in kernel guard,
  M16 chem-deliverable exemption, kernel stated-mass-list guard, neurolink
  term-relevance guard, structure-shortcut chemistry ownership
- its/solver/structure_families.py — pH proticity; MOLES concentration refuse
- its/solver/chempy_engine.py — hydrate-dot split (mass + composition)
- its/solver/modeling_layer.py — DOBEREINER_TRIAD answer-shape exemption
- solvers/chem/class11_chem_questions.py — sci-range VarGen rounding,
  redox place, ore-site variables, vsepr/IE/hydride signature bindings
- solvers/chem/class12_chem_questions.py — topic pools pruned to registry
- solvers/solver_chem_c12.py — kinetics_first_order + kinetics_arrhenius
- tests/test_chem_adversarial.py — the permanent suite (82 cases)
- tests/chem_corpus_sweep.py — reusable per-chapter instrument
- runtime data (cache, .bak kept): pal_templates.json (-77 chem templates),
  answer_memo.json (poisoned entries)
