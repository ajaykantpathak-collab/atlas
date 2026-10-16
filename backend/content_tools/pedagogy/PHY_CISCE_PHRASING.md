# PHY-CISCE-PHRASING REPORT — CISCE physics + chemistry phrasing-refusal wave

Agent: PHY-CISCE-PHRASING. Session: 2026-10-08.
Mission: convert the 72 measured CISCE physics (35) + chemistry (37)
refusals from STEM_PC_FULLSPAN.md "Remaining work" #1 into deterministic
solves — ICSE ray language, pinhole camera, electromagnet mu_r, and the
CISCE chemistry phrasings. PHRASING gaps: deterministic compute exists
for some, but ICSE wording never triggers the family.

House law: `its/solver/VERIFIER_ENGINE.md` (2026-10-08 owner rewrite) —
**every verifier is a DATA ROW** in `_PHYSICS_DECL` (chem rows live in
the same dict, in the STEM-PC chemistry section). No hand-written
verifier functions. Route id == family id == decl key; registration is
automatic via the `VERIFIERS.setdefault` loop.

CPU law: every measurement below is ONE process. Probe harness:
`tests/_pcisce_probe.py` (re-extracts full questions from
`deploy/content/cisce_nodes_v2`, runs `answer()` with SOLVER_LLM_MODE=off,
grades with the sweep's own examiner).

## BEFORE (measured, this session's probe — baseline reproduction)

Sweep baseline (STEM-PC session, `tests/_stempc_cisce_phy.log` /
`_stempc_cisce_chem.log`):

| Lane | SOLVE | WRONG | REFUSE_NUM |
|------|-------|-------|------------|
| phy c6-c12 (42 rows) | 7 | 0 | 35 |
| chem c6-c12 (42 rows) | 0 | 0 | 37 |

Probe baseline run 1 (`tests/_pcisce_probe_run1.log`,
72 fix-queue rows re-probed through answer()): PENDING.

## WORK LOG

### Physics wave (its/solver/physics_families.py, additive)

New block `_TABLE_PCISCE` (23 families, scanned between `_TABLE_PC1`
and `_TABLE_BOOKS2`): PCISCE_PINHOLE, PCISCE_ELECTROMAGNET_B,
PCISCE_INCIDENCE_ANGLE (ray-to-normal vs ray-to-surface),
PCISCE_PLANE_MIRROR_IMG, PCISCE_DISP_DENSITY, PCISCE_HEAT_CAL_TIME,
PCISCE_MAGNET_COUNT (count + average branches), PCISCE_FIELD_LINES,
PCISCE_DIPOLE_TORQUE, PCISCE_DIPOLE_AXIAL_P (moment given directly),
PCISCE_CAPACITOR, PCISCE_MOMENT_MIDPOINT, PCISCE_MOMENT_LINE_ANGLE,
PCISCE_MOMENT_COMPARE, PCISCE_NET_MOMENT_ROD, PCISCE_KNIFE_EDGES,
PCISCE_AVG_ACCEL, PCISCE_TRIP_SPEED, PCISCE_BRAKE_PHASES,
PCISCE_RESULTANT_ANGLE, PCISCE_COMPONENTS_2D, PCISCE_POSVEC_KIN,
PCISCE_SIGFIG_GRAMS.  Plus additive gate-broadening in existing
handlers: `_pc_screw_lc` (ICSE division zero error + MSR/CSR observed
reading), `_pc_vert_throw` (m s^-1 unit surface).

Intentional non-fix: **knife-edge reactions** (phy c10, rod on two
supports with the load OUTSIDE them) — correct statics gives
R_B = -2.5 N (a hold-down force a knife edge cannot supply; the rod
tips about A).  The corpus key's own derivation uses contradictory
signs ("R_B x 1.0 - 15 x 0.5 + 10 x 0.5 = 0").  The family computes
the true statics but REFUSES when any reaction is negative, so this
repro stays an honest refusal rather than shipping either a negative
reaction (contradicting the key) or the key's sign-error arithmetic.

### Chemistry wave (its/solver/chemistry_families.py, additive)

New block `_TABLE_CISCE_CHM` (27 rows, scanned directly behind
`_TABLE_CHEM_PC`): CHM_PC_VOL_CONSERVED, CHM_PC_PCT_INCREASE,
CHM_PC_POWER_TIME, CHM_PC_MASS_PERCENT, CHM_PC_ALLIGATION,
CHM_PC_DENSITY_MASS, CHM_PC_YIELD_GYPSUM, CHM_PC_MASS_CONSERVED,
CHM_PC_CHARGE_ELECTRONS, CHM_PC_PROTON_ELECTRON, CHM_PC_MASS_NUMBER,
CHM_PC_VALENCY_FORMULA (subscripted formulas), CHM_PC_ISOTOPE_INVERSE,
CHM_PC_BALANCE_MASS (balance_equation + mole bridge, stated atomic
masses win), CHM_PC_RFM_NAMED, CHM_PC_PRECIPITATE, CHM_PC_GAS_EXCESS,
CHM_PC_VAPOUR_DENSITY, CHM_PC_O2_BURN_C, CHM_PC_PCT_ERROR,
CHM_PC_DM3_CM3, CHM_PC_MOLAR_MASS_GIVEN, CHM_PC_MOLECULES,
CHM_PC_HENRY, CHM_PC_RAOULT, CHM_PC_OSMOTIC_I, CHM_PC_VANTHOFF.
Plus additive extensions: `_pc_isotope_avg` (relative-atomic-mass /
atomic-weight asks; '(mass 19.99 u, 90 % abundance)' and
'(19.9 %, 10.0129 u)' bracket orders; N-isotope count; caret-trigger
without the word 'isotope') and `_pc_en_diff` (plural
'electronegativities' trigger; compound-form asks 'delta-chi for HCl
and Na2O' via parse_formula), and their _TABLE_CHEM_PC trigger
regexes widened to match.  One shared-helper reuse note: the
balance-mass family calls the existing `balance_equation` house API
(ChemPy + exact-rational nullspace) rather than re-deriving.

### Verification (house standard, VERIFIER_ENGINE.md — data rows only)

44 new `_PHYSICS_DECL` data rows (17 physics PCISCE_* + 27 chemistry
CHM_PC_*; the PCISCE_KNIFE_EDGES route deliberately has none — the
family refuses rather than ships on this corpus).  Route id == family
id == row key; registration automatic via the existing
`VERIFIERS.setdefault` loop.  One pre-existing hand-written verifier
(`_v_mech_screw_lc`, justified at creation for unit mixing) had its
INPUT SHAPES extended for the ICSE division/MSR/CSR phrasing — no new
hand-written verifier was created; the relation is unchanged.

### Handler-level smoke (one process each, no pipeline load)

- physics: `tests/_pcis_smoke.py` — 30/31 hit (knife edges gates by
  design).
- chemistry: `tests/_pcisce_chem_smoke.py` — 36/36 hit with correct
  values (Al2O3 = 51 g, Ca(OH)2 = 74 g).

## AFTER

(final section, measured evidence only)
