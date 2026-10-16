# CHEM_CLASS9_BOARD.md — class 9 chemistry, chapter-sourced + board-curated deep test

**Date:** 2026-10-06 · **Owner:** GOLDEN-CHEM · **Method:** one class at a time
(owner directive), class-7-maths depth bar. Companion to `GOLDEN_CHEM.md`
(golden-path deliverable, 11/11).

**Instrument:** `deploy/backend/tests/chem_class9_board_battery.py` — 46
hand-curated REAL NCERT/board-style questions across the four class-9
chemistry chapters (Matter in Our Surroundings; Is Matter Around Us Pure;
Atoms and Molecules; Structure of the Atom), every expected answer
independently verified, each run in-process through
`backend.its.solver.answer_pipeline.answer` with the LLM lanes off
(network-down reality). Raw output: `tests/_chem_c9_out.json`.
FILES ONLY: no Docker, no Postgres (down since 21:0x — DB-lane items marked
pending live re-check).

## Final tally (after fixes; battery run 4)

```
SHIP_OK=22   CONFIDENT_WRONG=0   NON_ANSWER_SHIP=0
HONEST_REFUSAL=4 (why/explain questions — correct contract)
CAPABILITY_GAP=20 (honest GUIDED refusals — content/bank coverage, see below)
```

Before the fixes (run 1): 6 SHIP_OK, **3 CONFIDENT_WRONG**, 32 gaps.
Every confident-wrong class below was reproduced, root-caused, fixed, and
re-verified end-to-end. Regression anchors all green: 98 g H2SO4 → 1 mol;
0.5 mol H2SO4 atoms → 2.108e24; balance H2+O2 → 2 H2 + O2 -> 2 H2O; physics
V=IR → 6 Ω; 0.5 mol water → 9 g.

## Bug table (owner format: Bug class | Examples | Status)

| # | Bug class | Examples | Status |
|---|-----------|----------|--------|
| 1 | **PAL template cross-ask rebind** — an offline saved template for a DIFFERENT ask semantically matches and rebinds literals; unit vocabulary had no temperature scales and the target-scale was never compared | "Convert 25 °C into Kelvin" → VERIFIED **77.0** (a C→F template: 25×9/5+32; true 298 K) | **FIXED** `its/solver/pal_templates.py`: kelvin/celsius/fahrenheit added to `_UNIT_TOKEN_RE`; `_template_consistent` now compares question TARGET scale vs template TARGET scale (target-vs-target; fails closed when the template has no explicit target). Legit C→F rebinds still match; Kelvin/Celsius asks refuse the F template |
| 2 | **Molar-mass regex bites the formula tail** — `molar mass[\w\s]{0,15}?(\d+)` captured the 2 out of "CO2" | "number of molecules in 22 g of CO2 (molar mass of CO2 = 44)" → VERIFIED **11 mol** (22/2; true 3.011e23 molecules) | **FIXED** `its/solver/structure_families.py` `_c_moles`: `(?<![A-Za-z])` lookbehind (no formula-tail digits) + `=` admitted in the skip set; plus a particles-ask gate — n=m/M alone refuses "number of molecules" asks instead of shipping the intermediate |
| 3 | **Formula-token split via ignorecase "name" group** — `PARTICLES_FROM_MASS`'s optional name group (`[a-z-]…` under re.I, `\s*` tail) swallowed the leading capital of the formula | same question via the other lane → VERIFIED **N = 4.14e+23 molecules** (bound f="O2", M=32; true 3.011e23) | **FIXED** `its/solver/chemistry_families.py` `_PARTICLES_MASS_RX`: name group must end at whitespace, so "of CO2" binds f="CO2" (M=44). NCERT S8 case re-verified (16 g S8 → 3.764e22) |
| 4 | **Particles ask-precision** — "moles of hydrogen atoms in 0.5 mole of water" answered with a TOTAL-atom count | → VERIFIED **N = 9.033e+23 atoms** (0.5×N_A×3 all atoms; true 1 mol H atoms) | **FIXED** `_c_particles`: element-subset + moles-ask branch — answers n(compound)×atoms-of-that-element in MOLES (ships "moles of hydrogen atoms = 1 mol"); refuses if the named element is absent from the formula |
| 5 | **Latent-heat unit set missing J/g** — family gated on J/kg / kJ/kg / cal/g only | "heat needed to melt 20 g of ice (L = 334 J/g)" → honest refusal (capability gap on a board-standard numerical) | **FIXED** `its/solver/physics_families.py` `_c_latent_heat`: J/g admitted (×1000). Ships **6680 J**; cal/g case unchanged (22604.4 J for 10 g→steam, 540 cal/g) |
| 6 | **Value-ask narrative mis-ship** — the neurolink concept pre-route shipped a 300-char apparatus narrative ("the material inside the flask () on the mount ()…", broken entity bindings) as VERIFIED for a value ask | "What is the boiling point of water at normal atmospheric pressure, in degrees Celsius?" → VERIFIED waffle (no 100 °C stated) | **FIXED** `its/solver/answer_pipeline.py`: value-ask guard — long (>220 char) answers on value-shaped asks are not promoted; fall through to graded lanes. Now honest GUIDED offline (bank lane pending live re-check may answer VERIFIED_OFFICIAL when Postgres returns) |
| 7 | **Integer percent display law** — every float percent renders integer | mass percent 40/360 = 11.1% ships as **"11% by mass"** | **BY DESIGN — owner law** (`services/display_scrub.py _fmt_percent_float`: "a float percent is always shown as an integer percent"), applied by the slop gate to all student strings. Method and value correct; NOT changed (platform-wide display law, outside chemistry lane). Flagged for owner if solution strings should keep one decimal |
| 8 | **Fleet flake: test student invisible post-commit** — during the shared-Postgres window, all DB writes FK-skipped | one mid-build golden run: BKT/SM-2/XP all failed with "no users row" | **HARDENED** in `tests/test_chem_e2e_golden.py`: fresh-session visibility check + one retry + honest abort (no fail-walk on a phantom student) |

## Honest-refusal contract check (chemistry analog of the history rule)

Why/explain questions correctly REFUSE instead of faking:
"Why does evaporation cause cooling?", "Why are solids incompressible?",
"Why is it not possible to see an atom with the naked eye?", "Why is the
nucleus positively charged?" — all GUIDED_PRACTICE, none shipped a fake
VERIFIED. The one former violation (boiling point, bug class 6) is fixed.

## Remaining coverage gaps (20 honest refusals — next wave's candidates)

- **Bank-lane material (pending live re-check when Postgres returns):**
  discovery attributions (Rutherford/Thomson/Chadwick — c4), physical state
  of water at 250 °C (c1). These are factual one-liners the
  board_questions bank likely covers with VERIFIED_OFFICIAL.
- **Solver-family candidates (content gaps, no family yet):** separation
  techniques (centrifugation/filtration/sublimation/chromatography/
  separating funnel — c2), Tyndall effect, brass=mixture, melting/boiling
  point facts, "molecules in 22 g" phrasings already fixed but the 1:8
  constant-proportion burn question gated (7c family exists — phrasing
  "completely burn" not covered), Na+/Cl- electron counting, mass number,
  C-14 neutrons, mass-by-volume percent (7c family exists — "mass by volume
  percentage of sugar in the solution" phrasing gated), latent fusion
  phrasing now fixed.
- Each is a refusal, never a wrong ship: safe to serve today.

## Ship notes for the coordinator

- All fixes are in `deploy/backend/its/solver/` (pal_templates.py,
  structure_families.py, chemistry_families.py, physics_families.py,
  answer_pipeline.py) — plain .py, so the normal docker-cp batch path
  applies when Docker returns; no rebuild needed. Zero Docker touched.
- DB-dependent stations of the golden test (batch serving, BKT/SM-2/XP,
  bank-lane factuals) — **pending live re-check**; solver stations were
  re-verified in-process post-fix (8/8 anchors green).

## How to run

```
cd D:\platform\deploy\backend
PYTHONPATH=D:/platform/deploy SOLVER_LLM_MODE=off python tests/chem_class9_board_battery.py
```

Exit 0; prints per-case verdicts + tally; writes `tests/_chem_c9_out.json`.
Class 10 chemistry is next per the one-class-at-a-time directive — not
started until class 9 signed off.
