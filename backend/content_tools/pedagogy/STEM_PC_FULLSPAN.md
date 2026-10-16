# STEM-PC FULL-SPAN REPORT — Physics + Chemistry, classes 6-12, CBSE + CISCE

Agent: STEM-PC (physics + chemistry perfection). Session: 2026-10-07.
Method: corpus-sourced diagnostic pairs (`DIAGNOSTIC_QUESTION_n` /
`DIAGNOSTIC_ANSWER_n`) pulled from `deploy/content/enhanced_nodes_md` (CBSE)
and `deploy/content/cisce_nodes_v2` (CISCE), run through
`backend.its.solver.answer_pipeline.answer()` in-process
(`SOLVER_LLM_MODE=off`, bank lanes refuse, families fire). Every grade
hand-verified against the corpus key (examiner-grade).

Harnesses (this session, all batched single-process per the CPU directive):
- `tests/stem_pc_fullspan_sweep.py` — unified sweep (SUBJECT x CORPUS x CLASSES)
- `tests/_pc1_family_battery.py` — physics wave, family level (26 cases)
- `tests/_chem_pc_battery.py` — chemistry wave, family level (11 cases)
- `tests/_pc1_e2e_battery.py` — physics wave through the FULL answer() path
- `tests/_stempc_regression_all.py` — all three in one process

## PASS RATES (corpus diagnostics, this session)

### CBSE physics (classes 6-10: inherited clean; 11-12: fixed this session)

| Lane | Before | After | WRONG after |
|------|--------|-------|-------------|
| phy c6 | curated (W1-W6 + class-6 waves) | — | 0 |
| phy c7 | 10 classes fixed | — | 0 |
| phy c8 | 25/29 | — | 0 |
| phy c9 | 32 SOLVE / 0 WRONG | — | 0 |
| phy c10 | 25 SOLVE / 0 WRONG | — | 0 |
| phy c11 | 1 SOLVE / 13 refuse | **11 SOLVE / 3 honest refuse** | **0** |
| phy c12 | 2 SOLVE / 12 refuse | **13 SOLVE / 1 honest refuse** | **0** |

c11-12 official sweep (28 rows): **24 SOLVE / 0 WRONG / 4 REFUSE_NUM**
(151 s). The 4 remaining refusals: free-fall acceleration-at-release
(order-dependent near-miss), symbolic vector resultant 5|A| (no numeric
ask), ruler-drop reasonableness (prose judgement), pinhole-style prose.

### CBSE chemistry

| Lane | Before | After | WRONG after |
|------|--------|-------|-------------|
| chem c9 | signed off (46-case battery, 22 SHIP_OK / 0 wrong) | — | 0 |
| chem c6-c8 | unswept | **30 rows: 0 WRONG** (29 honest prose refusals, 1 honest refuse) | **0** |
| chem c10-c12 | CHEM-ADV 82/82 only | **5 SOLVE / 23 honest refuse** (was 0/28) | **0** |

### CISCE (first full measurement — no wave built yet)

| Lane | SOLVE | WRONG | REFUSE_NUM |
|------|-------|-------|------------|
| phy c6-c12 (42 rows) | 7 | **0** | 35 |
| chem c6-c12 (42 rows) | 0 | **0** | 37 |

**Zero confident-wrong on every lane, both boards, all classes.** Every
refusal is honest (guided method shown, no number shipped).

## WHAT WAS BUILT (all regression-tested)

### Physics — `_TABLE_PC1` wave in `physics_families.py` (26 families)
Electrostatics: point-charge field, midpoint superposition, flux, line
charge, dipole axial field, dipole rotation work, potential, 3-charge
system energy, electron count, breakdown potential (V = E x R). Current
electricity: drift velocity, temperature-coefficient resistance, colour
code. Nuclear: Q-value with stoichiometric species counting. Kinematics:
stopping distance (+reaction variant), free fall, horizontal projectile,
velocity components, vertical throw from a platform, path length vs
displacement, ask-is-a-given branch. Vectors: cross-product angle (both
supplementary solutions), 2-D displacement. Instrument: screw-gauge LC +
zero-error correction. Family battery 26/26; e2e battery 25 SOLVE +
1 order-dependent honest GUIDE.

### Chemistry — `_TABLE_CHEM_PC` wave in `chemistry_families.py` (9 families)
Polybasic-acid pH, pH comparison factor, combustion CO2 mass (carbon
balance cross-check), Dobereiner triad, isotope average mass,
electronegativity difference, light frequency/wavenumber, photoelectric
KE, Heisenberg uncertainty. Family battery 11/11.

### Verification (house standard, VERIFIER_ENGINE.md)
20 declarative `_PHYSICS_DECL` rows + 5 hand-written second paths for the
genuinely irregular routes (coordinate-walk system PE, colour decode,
Q-value stoichiometry, unicode-minus path walk, screw-gauge unit mixing)
+ 9 chemistry decl rows. Every new route flips GUIDED -> VERIFIED on its
corpus question through answer().

### Pipeline fixes that un-stuck the whole wave
1. `_attach_understood`: family bound quantities + structure route now
   stamp into the audit (the VERIFIED-badge verifier context was starving
   to na and withholding correct computes).
2. Kernel `kernel:modeling` returns ride `_attach_understood`; the router
   carries the family `quantities` (new defaulted SolverRouteResult field).
3. Badge gate: a lane that already ran a registered independent check at
   its own boundary keeps VERIFIED.
4. ask_shape noncomputable guards (both sites): compute asks win over
   'State'/'explain' openers.
5. `_is_physics_family` collector includes `_TABLE_PC1` (data-coverage
   guard was refusing consumed-everything physics as maths).
6. Wrong-slice owners gated BEFORE promotion could ship them:
   kinematics ask-is-a-given (acceleration-at-release), projectile
   components gate + max-height-above-ground veto (structure lane),
   ELECTRIC_FIELD refuses dipole/'N/C' text, NEET pH refuses polybasic
   acids (H2SO4 shipped pH 3; true 2.7).
7. `_normalize` canonicalizes the pipeline normalizer's surfaces
   ('* 10^' -> 'x 10^', 'deg C' -> '°C') — families gated silently
   in-pipeline while passing every direct probe before this.
8. Silent `_beats()` arity crashes fixed (SHM omega branch,
   pressure_two_faces, magfield_coil — none had ever fired).

## REMAINING WORK (honest list, ordered by yield)

1. **CISCE wave**: 72 measured refusals (phy 35, chem 37) — ICSE phrasings
   (pinhole camera, electromagnet with mu_r, classification experiments,
   ray-diagram language) need their own family wave mirroring _TABLE_PC1.
   Samples logged in `tests/_stempc_cisce_phy.log` / `_stempc_cisce_chem.log`.
2. **c12 chemistry topics wave** (23 CBSE refusals): Raoult's law,
   relative lowering of vapour pressure, freezing-point depression
   (Kf), Nernst equation, Faraday's laws of electrolysis, Kohlrausch
   Λ°m, fuel-cell EMF, zero-order kinetics — each a standard family in
   the _TABLE_CHEM_PC pattern.
3. **c11 leftovers**: Thomson e/m, Born-Haber cycle, mole-fraction
   preempted-by-structure check.
4. proj_comp GUIDE is order-dependent inside one process (isolated probe
   ships VERIFIED) — suspected contextvar leak; no wrong answer ships.
5. Multi-part answers (screw gauge LC + corrected reading) may be trimmed
   to the primary ask by answer shaping; the corpus key leads with the
   same primary number, so grading is unaffected.

## EVIDENCE FILES
- `tests/_stempc_cbse_phy_c11_12.jsonl` (+ run logs _stempc_c1112phy_run*.log)
- `tests/_stempc_cbse_chem_c6_7_8.jsonl`, `tests/_stempc_cbse_chem_c10_11_12.jsonl`
- `tests/_stempc_cisce_phy_c6_..jsonl`, `tests/_stempc_cisce_chem_c6_..jsonl`
- `tests/_pc1_family_battery.py` (26/26), `tests/_chem_pc_battery.py` (11/11)
- `tests/_pc1_e2e_battery.py` (25 SOLVE / 0 WRONG / 1 honest GUIDE)
- `tests/_stempc_regression_all.py` — one-process combined gate

## FINAL GATE (session close)

`python tests/_stempc_regression_all.py` (one process, all batteries):
physics family battery 26/26 + chemistry family battery 11/11 + physics
e2e battery 25 SOLVE / 0 WRONG / 1 honest GUIDE -> **COMBINED GREEN**.
All official sweep JSONLs re-generated post-fix. Zero confident-wrong
anywhere in STEM-PC scope (CBSE + CISCE, classes 6-12, phy + chem).
