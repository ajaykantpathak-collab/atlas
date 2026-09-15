# FABLE PIPELINE TRACKER
## Master log of everything sent to Fable and its status

## ROUND 1: Architecture + STEM Solver Design (DONE)

| # | Job | Status | Output | Tokens |
|---|-----|--------|--------|--------|
| 1 | STEM solver architecture design | DONE | fable_stem_solver_design.md (776 lines) | 1450 in / 13115 out |
| 2 | System architecture (frontend+security+scaling) | DONE | SYSTEM_ARCHITECTURE_RAW.txt (853 lines) | 2042 in / 16000 out |

## ROUND 2: Initial Formula KB (DONE)

| # | Job | Status | Output | Formulas |
|---|-----|--------|--------|----------|
| 3 | Physics initial | DONE | physics_formulas.yaml | 36 |
| 4 | Chemistry initial | DONE | chemistry_formulas.yaml | 146 |
| 5 | Math initial | DONE | math_formulas.yaml | 149 |
| 6 | Biology initial | DONE | biology_formulas.yaml | 112 |

## ROUND 3: Follow-up Formula KB (DONE)

| # | Shell ID | Job | Status | Output | Count |
|---|----------|-----|--------|--------|-------|
| 7 | a750e8 | Physics: Mech/Grav/Osc/Waves | DONE | physics_mech_grav_osc.yaml | 89 formulas |
| 8 | 9c54d4 | Physics: EM/Thermo/Optics | DONE | physics_em_thermo_optics.yaml | 231 entries (id: format) |
| 9 | 88381f | Physics: Modern/Quantum/Relativity | DONE | physics_modern_quantum_relativity.yaml | 187 entries (id: format) |
| 10 | 702547 | Chem: Kinetics/Solutions/Surface/Coord | DONE | chem_kinetics_solutions_surface.yaml | 101 formulas |
| 11 | dc166d | Chem: Organic reactions | DONE | chem_organic_reactions.yaml | 151 reactions |
| 12 | 841023 | Chem: Inorganic/Analytical | DONE | chem_inorganic_analytical.yaml | 104 formulas |
| 13 | f85347 | Math: Geometry/Trig/Coord | FAILED (0 bytes) | RE-RUNNING a7fdc5 | ? |
| 14 | 0dda1a | Math: Prob/Stats/Discrete | DONE | math_prob_stats_discrete.yaml | 394 formulas |
| 15 | 6be77b | Math: Advanced (PhD) | DONE | math_advanced.yaml | 126 formulas |
| 16 | b2b7ac | Bio: Ecology/Cell/Molecular | DONE | bio_ecology_cell_molecular.yaml | 258 formulas |
| 17 | cca118 | Bio: Evolution/Epi/Pharma | DONE | bio_evolution_epidemiology_pharma.yaml | 139 formulas + 47 models |

### FORMULA KB TOTALS (FINAL)
- Fable-generated: 2,406 formulas + 151 reactions + 47 models
- Dream_app extracted: 129 formulas (stem_solvers, math_solvers, reasoning_rules, solution_patterns, step_types)
- CISCE formula banks: 1,247 formulas (physics 639, maths 462, bio 47, CS 41, EVS 40, chem 18)
- **GRAND TOTAL: 3,782 formulas + 151 reactions + 47 models = 3,980 entries** (target was 1,200+)

NOTE: Physics EM/Thermo and Modern/Quantum files use `id:` instead of `formula_id:` — needs field name normalization during cleanup.
NOTE: CISCE Chemistry formula bank is thin (18 formulas) — needs expansion.

## ROUND 4: C8 History Generation (RUNNING)

| # | Shell ID | Job | Status | Output |
|---|----------|-----|--------|--------|
| 18 | f369d5 | C8 History: 3 enrichment batches (12 chapters) | RUNNING | cbse_data\c8_history_full\enrichment\ |
| 19 | f369d5 | C8 History: 6 supporting files | RUNNING | cbse_data\c8_history_full\supporting_files\ |

## ROUND 5: REMAINING WORK TO SEND TO FABLE

### 4A. Missing CBSE Node Files — CORRECTED after full audit
Raw nodes exist in cbse_data/nodes/by_subject/ for most "missing" combos.
They're in split files (chemistry_c6_c10_split.json, biology_c6_c10_split.json, etc.)
The "fixed" files in cbse_coverage_output_fixed just weren't generated from split files.

GENUINELY MISSING (only 1 gap after full audit):
| # | Subject | Class | Status | Notes |
|---|---------|-------|--------|-------|
| 18 | History | C9 | PENDING | French Rev, Russian Rev, Nazism, Forest Society, Pastoralists — ~80-100 nodes needed |

NOT MISSING (was wrong about these):
- Science C6: covered as combined Science (Physics+Chem+Bio) — 270+ nodes
- Geography C6: covered in history_civics.json as Social_Science — 93 nodes
- Geography C10: covered in history_civics.json (Resources, Forests, Agriculture, Minerals) — 134 nodes
- Science C11/C12: NOT NEEDED — CBSE Science is C6-C10 only, C11/C12 has separate PCM/Bio
- Chemistry C6-C9: 183 nodes in chemistry_c6_c10_split.json
- Biology C7-C10: 312 nodes in biology_c6_c10_split.json
- Physics C6-C10: 342 nodes in physics_c6_c10_split.json

### 4B. Thin Node Files — CORRECTED
Only genuinely thin (rest are split-file naming issues):
| # | File | Real count | Status |
|---|------|-----------|--------|
| 22 | Chemistry C8 (split) | 19 nodes | PENDING - genuinely thin |
| 23 | Chemistry C9 (split) | 19 nodes | PENDING - genuinely thin |
| 24 | Chemistry C10 (split) | 17 nodes | PENDING - genuinely thin |
| 25 | Biology C8 (split) | 17 nodes | PENDING - genuinely thin |

### 4C. CISCE Content (1,886 missing topics)
| # | Subject | Missing topics | Status |
|---|--------|---------------|--------|
| 47 | Geography | 236 | PENDING |
| 48 | Environmental Science | 180 | PENDING |
| 49 | Chemistry | 169 | PENDING |
| 50 | Biology | 160 | PENDING |
| 51 | Political Science | 119 | PENDING |
| 52 | Accountancy | 110 | PENDING |
| 53 | Sociology | 108 | PENDING |
| 54 | Economics | 98 | PENDING |
| 55 | Computer Science | 93 | PENDING |
| 56 | Business Studies | 92 | PENDING |
| 57 | Physics | 91 | PENDING |
| 58 | Mathematics | 90 | PENDING |
| 59 | History | 77 | PENDING |
| 60 | Artificial Intelligence | 66 | PENDING |
| 61 | History Civics | 61 | PENDING |
| 62 | Psychology | 59 | PENDING |
| 63 | Applied Mathematics | 31 | PENDING |
| 64 | Biotechnology | 28 | PENDING |
| 65 | Robotics | 18 | PENDING |

### 4D. Implicit Value Rules YAML (~200 rules)
| # | Job | Status |
|---|-----|--------|
| 66 | Physics implicit rules (motion, mechanics, electricity, optics, thermo) | PENDING |
| 67 | Chemistry implicit rules (standard conditions, ideal assumptions, equilibrium) | PENDING |

### 4E. Test Files
| # | Job | Status |
|---|-----|--------|
| 68 | test_notorious_problems.py (Irodov, double pendulum, brachistochrone) | PENDING |
| 69 | test_jee_advanced.py (Real JEE Advanced 2023-2025) | PENDING |
| 70 | test_neet.py (Real NEET 2024-2025) | PENDING |
| 71 | test_breaking.py (100 agents breaking system) | PENDING |

## SUMMARY
- Round 1: 2/2 DONE
- Round 2: 4/4 DONE (443 formulas)
- Round 3: 2/11 DONE, 9 RUNNING
- Round 4: 0/54 PENDING
- Total formulas so far: 443 + 126 (math_advanced) + pending from 9 running jobs
