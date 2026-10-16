# SOLVER-DIG-1 — Confident-Wrong Hunt (2026-10-06, relaunch)

Sweep of `its/solver/structure_families.py` + `structure_families_waves.py`
(+ the PAL-template and fallback lanes that ship through the same
`answer()` choke point). Method: per family — read trigger/slot/compute,
write 2-3 adversarial board phrasings (trigger keywords present, different
ask), run in-process through `backend.its.solver.answer_pipeline.answer`
(deterministic-only: LLM slot extractor + PAL program writer monkeypatched
off — the network-down reality). VERIFIED + wrong = CRITICAL.

Runner: `its/solver/_dig1_battery.py`, battery JSONs `_dig1_b*.json`,
raw outputs `_dig1_b*_out.json` in `its/solver/`.

Scope: mensuration, SI/CI, profit-loss/percent, speed, trigonometry
(heights/distances), coordinate geometry, statistics, electricity, and the
PAL-template lane. (ANGLE_SUM / quadratics / work-time / trig identities
= SOLVER-DIG-2.)

## Battery 1 results (34 cases) — 14 CONFIRMED WRONG

Legend: shipped = what the pipeline labelled VERIFIED; correct = the real
board answer.

| # | id | question (abbrev) | shipped | correct | root cause |
|---|----|-------------------|---------|---------|------------|
| 1 | cyl_tsa_find_radius | TSA of cylinder 616, h=7, find radius | `14 cm` | 7 cm | CYLINDER_CSA: `_c_cylinder_csa` treats ANY "surface area" number as CSA. `616/(2π·7)=14`. |
| 2 | cyl_csa_find_tsa | CSA 220, h=5, find TOTAL surface area | `7 cm` | 528 sq cm | CYLINDER_CSA: ask-gate absent — answered the radius when the ask was TSA. |
| 3 | scoop_hemi_ends_tsa | hemisphere scooped out of each end of a cylinder, TSA (NCERT classic) | `115.45 sq cm` | 374 sq cm | SOLID_MEASURE_DIG2 composite gate lacks "scoop(ing)" — treated the article as a bare hemisphere, `3πr²`. |
| 4 | cone_vol_from_slant | cone slant 13, r=5, find volume | `340.48 cu cm` | 314.29 (100π) | SOLID_MEASURE_DIG2 h-harvest `(?:height|depth)[\w\s]{0,20}?(\d+)` binds the SLANT height as h. `V = ⅓πr²·l` shipped. |
| 5 | frustum_csa_no_slant | frustum R=8, r=2, h=6, find CSA (no slant given) | `527.79 cu cm` | refuse (or 266.6 after computing l) | waves `_c_frustum`: CSA branch requires slant; without it FALLS THROUGH to the VOLUME branch and ships volume `cu cm` for a CSA ask. |
| 6 | frustum_capacity_litres | frustum capacity in litres | `4310.3 cu cm` | 4312 cm³ = 4.312 L | waves `_c_frustum` always math.pi (board 22/7 gives exactly 4312); no litre conversion on a litres ask. |
| 7 | gst_inclusive_find_mp | price INCLUSIVE of 12% GST is 6720, find marked price | `7526.4` | 6000 | fallback lane (`modeling:fallback_all` concept steps) added GST on top of an already-inclusive price. |
| 8 | pop_two_year | population 20000, +10% year 1, +5% year 2 | `22000` | 23100 | PERCENT_CHANGE picks the FIRST percent and ignores the rest — successive changes need compounding. |
| 9 | petrol_reduce_consumption | petrol rose 90→99, by what % REDUCE consumption to keep expenditure equal | `10% increase` | 9.09% (100/11) | PERCENT_CHANGE inverse branch answers "rose" % change; ask is the compensating reduction. |
| 10 | markup_discount_profit | buys 1200, marks +25%, sells at 10% discount, find profit % | `loss = Rs 1190 (99%)` | 12.5% profit | PROFIT_LOSS: `sells ... at a discount of 10` binds SP=10; loss vs 1200 = 99%. Multi-step commerce chain not gated. |
| 11 | simple_interest | SI on 8000, 12% pa, 3 yr | `22222.2222` | 2880 | PAL TEMPLATE semantic hit of a "find the PRINCIPAL given SI" template — same literal order [8000,12,3], rebinding "works", wrong ask. |
| 12 | speed_mps | car covers 90 km in 2 h, find speed in m/s | `45.0` | 12.5 m/s | PAL TEMPLATE learned on "90 METERS in 2 SECONDS" — answers 45 m/s ignoring the km/h→m/s conversion the ask demands. |
| 13 | elev_observer_tower | man 1.5 m tall, 28.5 m from tower of height 30 m, find ANGLE of elevation | `16.4545 m` | 45 deg | HEIGHTS_DISTANCE: angle slot binds "30" — the tower HEIGHT (no deg context required); then computes `h = 28.5·tan30`. Ask was the angle. |
| 14 | electric_ohm | bulb draws 0.4 A at 220 V, find RESISTANCE | `88.0` | 550 Ω | PAL TEMPLATE of a "find the POWER" question (P=V·I); ask-role never checked against the stored template ask. |

### Confirmed-correct in battery 1 (regression anchors)

sphere_dia_vol 1437.33; hemi_tsa_r7 462; cone_csa_from_dia 220;
ci_half_yearly 5367.5 (half-yearly schedule honoured); money_total 92;
speed_two_leg 42; trig_ratio sin A=3/5 → cos 4/5, tan 3/4; median 15.5;
mode 7; mean primes 5.6; grouped mean 11; dist of (−6,8) from y-axis 6.
Good refusals (GUIDED, no wrong ship): avg_speed_round_trip,
train_platform, depression_dist, elev_two_positions, weighted_avg_class,
cyl_tank_litres.

## Fixes applied

### Ring 1 (battery 1 wrongs — all fixed, re-verified in battery 2)

1. **`_c_cylinder_csa`** (`structure_families.py`): refuse when the text
   gives a TOTAL surface area (TSA ≠ CSA, TSA 616/h 7 answered 14 not 7)
   and refuse when the ASK is an area/volume (CSA 220/h 5 answered the
   radius "7 cm" for a 528 sq cm ask).
2. **`_c_heights`** (`structure_families.py`): an angle value must carry
   deg/degree context (a bare "30" was the tower's height in metres);
   the ask-angle branch now uses the VIEWED object's height
   ("tower of height 30") minus the observer's "X m tall" as eye level,
   with a negative-effective-height guard; height branch refuses
   angle-asks. Observer-tower case now ships 45 deg (was 16.45 m).
3. **`_c_percent_change`** (`structure_families.py`): refuse on 2+
   distinct percent tokens (successive changes) and on
   reduce/consumption/expenditure compensating asks.
4. **`_c_profit_loss`** (`structure_families.py`): refuse markup/
   discount/margin chains ("sells it at a discount of 10" bound SP=10 →
   "loss 99%").
5. **`_c_frustum`** (`structure_families_waves.py`): surface ask without
   slant REFUSES (was falling through to the volume branch and shipping
   cu cm for a CSA ask); TSA ask refuses; 22/7 board-convention snap
   (4312 not 4310.3); litres conversion on capacity asks (4.312 L).
6. **`_c_solid_measure`** (`structure_families_dig2.py`): composite gate
   extended with scoop/hollowed/mounted/embedded/cut-out (the NCERT
   hemisphere-scooped-ends question is NOT a bare hemisphere); slant
   height no longer fills the h slot (slant masked out of the harvest);
   cone volume from slant solves h = sqrt(l²−r²) (314.29, was 340.48);
   `\bhemisphere\b` → `hemispher\w*` (a "hemispherical bowl" used to
   miss the family entirely); capacity asks answered in litres with
   correct cm³/m³ handling; diameter/radius possessive phrasing
   ("diameter of a hemispherical bowl is 14") harvests.
7. **PAL templates** (`pal_templates.py`): `_template_consistent` — a
   saved program may only run when its stored ask-role agrees with the
   question's ask clause (SI vs principal; resistance vs power) and its
   unit surface matches (km/h vs meters/seconds), plus a
   conversion-ask check (a target unit the template never produced →
   refuse).
8. **catalog_executor**: an inclusive-price ask never runs an add-tax
   concept chain (6720 inclusive of 12% → marked price 6000, not
   6720×1.12 = 7526).

### Ring 2 (battery 2 exposed the same wrongs shipping through OTHER lanes)

9. **competency_engine** — ASK-COHERENCE gate: the catalog chain
   computes the CONCEPT's target, whatever was asked ("find the radius"
   ran a TSA chain → 615.75; "find the TSA" ran a CSA chain → 157.08,
   both VERIFIED). Refuse when the ask clause's quantity tag (radius/
   height/tsa/csa/volume/...) is disjoint from the concept's target
   tags. Plus SHAPE-COHERENCE: a hemispherical question never routes to
   a cylinder concept (hemispherical bowl capacity was answered by a
   cylinder-volume chain: 8620.53 for a 0.719 L ask).
10. **competency_reader** `read_percent_chain` — elided second step
    ("increases by 10% ... and by 5%") was DROPPED, shipping 22000
    "net +10%" for a 23100 compound ask. The regex now accepts
    ", and by N%" continuation steps that inherit the previous
    direction.
11. **maths2_families `_c_percent_change`** (the `modeling:lane_c_sweep`
    door) — same two gates as fix 3 (reduce-consumption shipped "10"
    through this family after the structure family refused).
12. **`_c_distance_axis`** (`structure_families.py`): refuses 2+ point
    texts — the one-point-vs-axis family answered "|y| = 3" for a
    section-ratio ask and "|y| = 5" for an equidistant ask.
13. **`_c_section_ratio`**: new axis-divides branch (k = a1/(a1−a2),
    ratio k:(1−k)) — "ratio in which the x-axis divides (2,3)-(6,−9)"
    now ships "1 : 3".
14. **`_c_equidistant_axis`**: anonymous-coordinate support — "point on
    the x-axis equidistant from (2,−5) and (−2,9)" now ships (−7, 0).
15. **maths2_families `_c_median`**: refuses find-x-in-data asks (the
    kernel lane computed the median of the two VISIBLE numbers and
    shipped 5.5 for a "median is 8, find x" ask).
16. **`_c_mean_simple`**: weighted-average shape ("average of 10 boys
    is 45 kg and of 5 girls is 40 kg") refuses — the plain-list mean
    pooled [10, 45, 5, 40] and shipped 11.25.

## Battery 2 (re-run + new fronts, 39 cases)

Verified fixed: elev_observer_tower 45 deg; electric 550 ohm;
simple_interest 2880 (PAL gated, interest-narrative lane solved);
markup/discount refused; frustum 4.312 L / CSA refused; scoop refused;
plus every control (g_* cases) kept solving — no over-refusal.

New confident-wrongs found (ring 2, all fixed above):
- cyl_tsa_find_radius → 615.752 (concept chain, fix 9)
- cyl_csa_find_tsa → 157.08 (concept chain, fix 9)
- gst_inclusive → 7526.4 via the concept-steps site 2 (fix 8 extended)
- pop_two_year → 22000 via event_chain (fix 10)
- petrol_reduce → 10 via lane_c_sweep/maths2 (fix 11)
- section_xaxis → "3", equidistant → "5" (fix 12-14)
- median_find_x → 5.5 via kernel (fix 15)
- mean_two_groups → 11.25 via MEAN_SIMPLE (fix 16)
- hemi_capacity → 8620.53 via cylinder concept chain (fixes 6+9)

Coordinate-geometry adversarials otherwise clean: distance from
origin/axis correct, midpoint, point-line distance 0.4, circle centre/
radius, line equation, parallelogram-square classification all good.

## Battery 3 (45 cases) + ring 3 (the concept-lane doors)

Battery 3 verified: percent-chain compounding (23100, net +15.5%),
explicit chain control 864, section 1:3 / 5:1, equidistant (−7,0),
cone-from-slant 314.29, frustum 4312 / 4.312 L / 990 sq cm, pct inverse
20%, observer angle 45 deg, elevation 51.96 m, and every stats/money/
trig control. (15 transient `ValueError: compiled pattern` crashes were
a concurrent-edit artifact of the shared fleet tree — all 16 erroring
cases re-ran clean in a retry battery.)

Ring 3 — three wrongs survived battery 3 through yet other doors:

17. **competency_engine target tags** — the ask-coherence gate's target
    surface included the concept FORMULA, whose variable names
    ("area = 2*pi*radius*(radius+height)") satisfy a "radius" ask →
    `tgt_q` now reads target + title only; and a specific surface tag
    (tsa/csa) suppresses the generic `area` tag so a TSA ask never
    shares a tag with a CSA concept.
18. **catalog_executor formula ladder** — the GST leak was layer 4
    (`_formula_ladder`, `source: formula`): the gate now refuses the
    whole concept when an inclusive-price ask meets an add-tax concept
    (steps OR formula).
19. **catalog_executor compensating-change gate** — the class-7 percent
    concept (c7m7.2.4, `|b−a|/a·100`) shipped 10% for the petrol ask
    after every other lane refused; a compensating-change ask now
    refuses concept execution.
20. **pal_templates given-unit replay soundness** — the m/s template's
    ASK also said m/s so the earlier unit gates passed; the
    discriminator is the GIVEN units (metres/seconds vs km/hours). A
    template whose given units disagree with the question's given units
    is refused (numbers rebind positionally; units do not — the
    train-crosses-pole template legitimately converts m/seconds givens
    to a km/h ask because ITS givens were m/seconds too).

## Battery 4 + 5 (final stubborn-case sweeps) — CLEAN

Battery 4 (8 cases): speed m/s **12.5 m/s** (was 45 m/s); speed km/h
45 km/h; train-crosses-pole 54 km/h (the legitimate m/s→km/h conversion
template still replays — the given-unit gate did not over-refuse);
"price before GST" inversion **Rs 1000**; cyl_csa_find_tsa / gst /
petrol honest refusals. One survivor: cyl_tsa_find_radius still shipped
615.752 — the ask-coherence gate lived in `model_competency`, but the
sweep reached `execute_concept` through a multipart/sibling caller that
bypasses it.

Ring 4 (last fix):
21. **ask-coherence moved INTO `execute_concept`** (every caller goes
    through it), and the generic `area` tag added to `_ASK_QTY_RES`
    (the concept target "area / Surface Area of a Cylinder" previously
    produced NO tag, silently disabling the gate; with the tag, the
    {radius}-ask vs {area}-concept mismatch refuses).

Battery 5 (4 cases, final tree): cyl_tsa_find_radius → honest GUIDED
refusal (was 615.752); "price before GST" 1000; money control 92;
mean control 5.6.

## Final tally

- 20 fixes across 9 files: `structure_families.py` (6 computes),
  `structure_families_waves.py` (2), `structure_families_dig2.py` (1),
  `pal_templates.py`, `catalog_executor.py` (3 gates),
  `competency_engine.py` (2 gates + tags), `competency_reader.py`,
  `maths2_families.py` (2 computes).
- Every fix pinned by a regression + its control in
  `backend/tests/test_structure_family_gates.py` — **89/89 green**
  (incl. `test_angle_sum_gate.py` and the pipeline-level pins).
- Batteries: `its/solver/_dig1_b1..b5.json` (+ `_out.json` evidence).
- Confident-wrong ships eliminated: 14 (battery 1) + 9 (battery 2) +
  3 (battery 3 survivors) = 26 distinct wrong-ship classes, each now
  either solved correctly or honestly refused; zero confirmed wrongs
  remain in the swept families.

Remaining coverage notes (refusals, not wrongs): successive-percent
compound asks refuse at the structure lane (the event-chain lane owns
the compounding shape); "N m tall"-only depression scenarios refuse;
two-train crossing and average-speed round-trips refuse; mode/median of
a frequency TABLE refuses. These are coverage items for a future wave,
not wrong-answer risks.




---

# APPENDIX A — structure-family adversarial sweep (SOLVER-DIG-1, maths lane)

Second sweep of the same files, complementary lanes to Battery 1 above:
CARD_PROB, QUAD_NATURE, INVERSE_PROP, RECT_MEASURE, HCF_LCM, TRIG_TRANSFORM,
MEDIAN_TRANSFORM/MEDIAN_MODE/GROUPED_MEAN/MEAN_SIMPLE, COMPOUND_INTEREST,
DISCOUNT_GST, PROFIT_LOSS, COMPOSITE_CARVED, NEET_PH. Runner:
`its/solver/_dig_cases.py`, battery `its/solver/_dig_battery1.json`
(40 controls + 40 adversarials), outputs `_dig_b1_out*.json`.
NOTE: maths is now owner-fixed — the fixes below are already in the tree,
pinned by tests; no further maths work from this dig.

## Confirmed wrong-ships fixed (family → adversarial → before → after)

| Family | Adversarial (trigger words, different ask) | BEFORE (VERIFIED) | AFTER | Fix |
|--------|--------------------------------------------|-------------------|-------|-----|
| CARD_PROB | "probability of a king of red colour" | 1/13 | 1/26 | rank+colour intersection (elif chain answered first keyword) |
| CARD_PROB | "probability it is not a face card" | 3/13 | 10/13 | complement |
| CARD_PROB | "the queen of hearts" | 1/13 | 1/52 | rank+suit = one card |
| CARD_PROB | "neither a red card nor a queen" | 1/2 | 6/13 | union + complement |
| QUAD_NATURE | "for what p does x^2 + px + 9 = 0 have equal roots?" | D=1 "real and distinct" | p = +-6 | letter coefficient solved (b-slot) instead of coerced to 1 |
| QUAD_NATURE | "value of m: mx^2 - 6x + 3 = 0 equal roots" | D=24 | m = 3 | same, a-slot |
| INVERSE_PROP | "12 men x 8 h/day x 10 days vs 16 men x 6 h/day" | 6 days | 10 days | hours/day in the work constant |
| RECT_MEASURE | "length 5 cm more than breadth, perimeter 46, find length" | 102 cm | honest GUIDED refusal | relational phrasing gate |
| RECT_MEASURE | "area 96, length 12, find breadth" | 1152 (multiplied) | 8 | inverse-area divides |
| HCF_LCM | "divides 85 and 72 leaving remainders 1 and 2" | HCF 1 | 14 | per-number remainder subtraction |
| HCF_LCM | "ratio 3:4, LCM 48, find the numbers" | 48 (echoed the ask) | "12 and 16" | ratio+LCM solver |
| TRIG_TRANSFORM | "Prove (sec A + tan A)(1 - sin A) = cos A" | "1/x" factoid | honest refusal | requires given-value + conjugate ask |
| TRIG_TRANSFORM | "sec th + tan th = 4, find sec th - tan th" | "1/x" | 1/4 = 0.25 | extracts the given k |
| MEDIAN_TRANSFORM | "mean of 10 obs is 30, each +4, new SUM?" | "new median 34" | refusal | sum/mean ask gate |
| MEDIAN_MODE | "median is 525, find x" (missing freq) | 12 bogus | refusal | missing-variable gate |
| MEDIAN_MODE | "mode of: 5 occurs 3 times, 7 occurs 5 times" | 5 (pooled plain list) | refusal | frequency-list gate |
| GROUPED_MEAN | "find the MODE of: 5 occurs 3 times ..." | 6.8 mean | refusal | mean-only gate |
| COMPOUND_INTEREST | "Rs 10000, half-yearly, 20% p.a., 1.5 yr" | CI 3145.3 (annual) | CI 3310 (A 13310) | compounding frequency k |
| DISCOUNT_GST | "20% off MRP 1500, profit 25%, find CP" | Rs 1200 (the SP) | refusal | profit/CP ask-gate |
| PROFIT_LOSS | "Aman buys 200 sells 250; Raman sells 300; Raman's profit %?" | 25% (first pair) | refusal | resale-chain gate |
| COMPOSITE_CARVED | "cone r=7, slant 25, find CSA" (no cavity) | 272.7 pi | refusal -> mensuration | cavity gate |
| NEET_PH | "pH of 0.1 M acetic acid, Ka = 1.8e-5" | pH 1 | refusal | Ka -> weak-acid lane |
| COMP_SUPP | "complementary angles in ratio 2:3" | (x=2 bound) | refusal | ratio gate |
| MEAN_SIMPLE | "mean 10 obs is 30, each +4, new sum" | 14.67 | refusal (family level) | shift-ask gate |

Tests: `backend/tests/test_structure_family_gates.py` (all pins + controls;
25/25+ green in final run), `test_angle_sum_gate.py` (8, incl. the original
hypotenuse/3-4-5 evidence). Module-identity bridge:
`backend/its/solver/__init__.py` force-aliases bare `its.solver*` names onto
`backend.its.solver*` (the dual registry produced 9 KeyErrors in combined
pytest runs; test files that put `deploy/backend` on sys.path were corrected).

Open maths items (NOT family-lane; overlap Battery-1 PAL/fallback lanes):
- "increased 10% then decreased 10%" -> hop_overrun_family ships 0 (true -1%)
- "mean 10 obs, each +4, new sum" -> modeling:fallback_all ships 10 (true 340)
- "two dice, product 12" -> modeling:fallback_all ships 24 (true 1/9)
- Pythagoras evidence trio: family lane honest; final VERIFIED depends on
  PAL/bank lanes — pending live re-check (DB down during this dig).

---

# APPENDIX B — CLASS 7 PHYSICS (owner method: corpus questions, examiner-graded)

Per owner directive: one class at a time, no maths. Real board-style questions
hand-curated from `content/enhanced_nodes_md/c7_physics_ch02..05` (Electricity,
Heat, Motion & Time, Light — diagnostic + competency sections). Battery:
`its/solver/_dig_c7phy.json` (29 cases), pipeline run deterministic-only.

## Bug class table (owner format)

| Bug class | Examples (real corpus phrasings) | Status |
|-----------|----------------------------------|--------|
| P1 heat-rate asks refuse | "rate of 50 J per second ... transferred in 10 s"; "absorbs 8400 J in 10 s, rate?"; "0.5 J/s ... in 60 s" | FIXED `C7_HEAT_RATE` (Q=R·t and rate=Q/t) |
| P2 energy-per-degree refuses | "2200 J, delta-T 25 C, heat per degree" | FIXED `C7_HEAT_PER_DEGREE` -> 88 J/C |
| P3 oscillation-count period flaky | "30 osc in 60 s" OK but "counts 10 oscillations of a pendulum in 20 s" refused | FIXED `C7_OSCILLATION_PERIOD` (T=t/N, gap-tolerant) |
| P4 two-entity speed compare refuses | "Car A 120 km in 2 h, Car B 150 km in 3 h, speed of both" | FIXED `C7_SPEED_COMPARE` -> 60 vs 50 km/h + verdict |
| P5 segment/average speed refuses | "first 50 m in 5 s, second in 7 s, whole race avg" (8.33, not 8.57); "avg speed for the FIRST 200 m" (8) | FIXED `C7_SPEED_SEGMENTS` (segment vs whole ask) |
| P6 mirror SURFACE-form angles refuse (class-7 trap) | "30 deg to the surface, angle of incidence?" -> 60; "incident ray and mirror surface 40 deg, reflection?" -> 50 | FIXED `C7_MIRROR_SURFACE_ANGLE` (i=r=90-surface); from-normal case pinned at 30 |
| P7 incident+reflected sum refuses | "angle between incident and reflected ray is 80 deg" -> 40 | FIXED `C7_INC_REF_SUM` |
| P8 mirror-image count refuses | 60 deg -> 5; 45 -> 7; 90 -> 3 | FIXED `C7_MIRROR_IMAGES` (n=360/theta - 1) |
| P9 mirror clock refuses | "clock shows 3:25, mirror shows?" -> 8:35 | FIXED `C7_MIRROR_CLOCK` |
| P10 open-circuit trap | "3V battery, open switch, current?" -> 0 A (naive V/R would ship 0.6) | FIXED `C7_OPEN_CIRCUIT` (deterministic 0 A) |

Wrong-ships in class 7 physics: 0 (all refusals honest — the bug class was
coverage, mirroring the class-7-maths 4/21-cracked baseline). Battery cracked
11/29 before the fixes; the 10 families above are the fixes. Descriptive/
conceptual asks (cell arrangement, mixing-water prediction, ant-speed
evaluation, uniform-vs-non-uniform judgement) correctly stay refusals.

Code: `physics_families.py` `_TABLE_C7` (10 families, 5-beat steps, hard
GATEs, dispatcher scan order TABLE -> _TABLE_BOOKS2 -> _TABLE_C7 so the
existing normal-angle/periscope family keeps its cases).
Tests: `backend/tests/test_class7_physics_families.py` — 25/25 green
(2026-10-06; every P1-P10 + controls + trap pins).

Post-fix pipeline re-run (DB down): 21/29 VERIFIED (was 11/29), 8 honest
refusals, 0 wrong ships. Family-level computes verified correct for all 10
bug classes; one OPEN routing finding remains:

| P11 (OPEN) heat/segment asks never reach the physics scan in-pipeline | "heat added per degree" -> route `chain:2hops` intercepts and degrades; "absorbs 8400 J in 10 s, rate?" / "first 200 m avg speed" -> route `kernel:none` (modeling scan never invokes model_physics_families for these texts) | dispatcher-level answers verified correct (88 J/C, 840 W, 30 J, 8 m/s in tests); pipeline routing gap — needs a modeling_layer trigger/similarity fix, next session |

Pending live re-check (Postgres down during this dig): bank/GUIDED-lane
outcomes for the refusal cases; full 29-case pipeline re-run
(`_dig_c7phy2.log`) was still draining when DB went away.

---

# APPENDIX C — CLASS 8 PHYSICS + pinned kinematics flip (SOLVER-DIG class-8 pass)

Method: same owner standard — REAL diagnostic questions pulled from
`c8_physics_ch2..6` (electric current & heating effect, force & friction,
pressure, spherical mirrors) via the `tests/physics_corpus_sweep.py` parser,
examiner-graded. Battery: `its/solver/_dig_c8phy.json` (29 cases).

## Pinned kinematics flip (coordinator escalation — fixed first)

"A car accelerates from rest to 20 m/s in 8 s. Find the acceleration."
served VERIFIED -1.5 nondeterministically (time token bound as final
velocity) against +2.5.  Fixed in `physics_families._kin_handle`:
(1) "from rest" pins u = 0 — a mis-pin refuses the family outright;
(2) sign guard: 'accelerates ... from rest' with negative a, or
'decelerates/retards' with positive a, refuses the family;
(3) bare "to rest / decelerates ... to rest" now pins v = 0, so the
deceleration mirror case solves in-family (-2.5, previously refused).
Tests: `tests/test_kinematics_uv_swap.py` (7 pass, flip-question run 3x).
`tests/physics_fullspan_golden.py`: B1 **PASS, zero confident-wrong**
(was 1 WRONG), full run 12/12.

## Class 8 bug class table (owner format)

| Bug class | Examples (real corpus phrasings) | Status |
|-----------|----------------------------------|--------|
| C8-J1 Joule heat hijack (CRITICAL) | "R=25 ohm, I=8 A, 3 min, heat produced?" -> "voltage = 200 V"; "I=4 A, R=55 ohm, 2 min" -> "voltage = 220 V"; fuse melt time -> "voltage = 1 V"; VIt form -> "resistance = 55 ohm" | FIXED `C8B_JOULE_HEAT` (H=I^2Rt and H=VIt, any-variable incl. fuse time) + Ohm-family heat-ask gate |
| C8-J2 CFL/LED multi-bulb energy | "five 60 W -> five 12 W, 5 h/day, kWh saved" | covered by the parallel C8 wave (`_c8_saved_kwh` -> 1.2 kWh) |
| C8-F1 net-force ask answered as acceleration | "20 N pull, 8 N friction, net force?" -> a = 6.67 m/s^2 (friction ignored) | FIXED `C8B_NET_FORCE` -> "12 N forward" (their gate + this handler) |
| C8-F2 static friction refuse | "m=2 kg, mu=0.4, minimum force to start"; lubricated 0.08 variant | covered by parallel wave (`_c8_static_friction` -> 8 N; 8 N/1.6 N) |
| C8-P1 pressure from cm dimensions | "250 N on 50 cm x 20 cm" (unit conversion) | covered by parallel wave (`_c8_pressure_area_cm` -> 2500 Pa) |
| C8-P2 dimensions-form in metres | "250 N on 2 m x 1.5 m" | FIXED `C8B_PRESSURE_DIMS` -> 83.33 Pa |
| C8-P3 brick-face word problem | "30 N brick 20x10x5 cm, largest face" -> 1500 Pa; smallest face -> 6000 Pa | FIXED `C8B_PRESSURE_BRICK` |
| C8-P4 per-tyre division | "12,000 N on two tyres each 0.15 m^2" | FIXED `C8B_PRESSURE_VEHICLE` -> 40000 Pa |
| C8-P5 sci-notation drop (CRITICAL) | "atmospheric pressure 1.01 x 10^5 Pa on 0.015 m^2" -> 0.01515 N (10^5 vanished) | FIXED structure-lane `_c_pressure` sci-notation parse -> 1515 N |
| C8-M1 focal length from R | "R = 40 cm concave, focal length in m" -> -0.2 m; convex R=2 m -> +1 m; R=30 cm -> 15 cm | FIXED `C8B_MIRROR_FOCAL` (f = R/2, sign-aware; radius number must FOLLOW the curvature phrase — a given focal length is no longer misread as R) |
| C8-M2 mirror type + R hijacked by dioptres | "focal length 20 cm, always erect diminished, type + R?" -> "5 D" then f/2=10 cm | FIXED `C8B_MIRROR_TYPE` -> "convex, R = 0.4 m (40 cm)" |

Wrong-ships before: 6/29 (2 CRITICAL classes: Joule-heat hijack,
sci-notation drop).  After: **25/29 VERIFIED, 0 wrong, 4 honest
refusals** (heater P=VI current ask; mercury-column P = h*rho*g — no
family yet; two brick cases intercepted by the chain lane in-pipeline
while the dispatcher computes them correctly — the P11 routing class
from Appendix B).

Tests: `backend/tests/test_class8_physics_families.py` — 19/19 green.
Code: `physics_families.py` `_TABLE_C8B` (7 families: joule-heat,
mirror-focal, mirror-type, pressure-brick, pressure-vehicle,
pressure-dims, net-force) + Ohm heat-gate + structure-lane PRESSURE
sci-notation fix.  Coordination: the parallel class-8 holder's `_c8_`
wave (efficiency, saved-kWh, static friction, pressure-cm) was already
landing in the same file; this dig took only the unclaimed classes and
named its wave `_c8b_` to stay disjoint.

Validation: dispatcher-level probes all green; class-8 battery rerun
`_dig_c8phy_out2.json` 25/29 VERIFIED 0 wrong; fullspan golden 12/12
with zero confident-wrong; class-7 suite still 25/25.

---

# APPENDIX D — P11 routing closure + CLASS 9 PHYSICS (SKEPTIC-1-RESUME, 2026-10-07)

Continuation of the class-by-class perfection from where DIG-1 landed
(class 7, class 8, kinematics flip done).  Work files-only, Postgres
down: bank-lane answers stay "pending live re-check".

## D1. P11 CLOSED — the routing gap had THREE stacked root causes

The class-8 signature ("dispatcher solves it, the pipeline buries it")
decomposed as follows.  All fixes deterministic, files-only.

| # | Root cause | Live evidence | Fix |
|---|-----------|---------------|-----|
| P11-a | **Circular-import registry drop (the deepest one).** `physics_families` imports `ModelResult` from `modeling_layer` at module level. When physics_families is imported FIRST (every pytest process, any bare-import entry point), modeling_layer initialises while physics_families is mid-build; the registration block's `from ... import model_physics_families` hits a half-built module, raises ImportError, and is silently swallowed — **the entire physics dispatcher is missing from the registry sweep** (observed: 59 structures, no `model_physics_families`).  modelling-first processes register it fine — which is why dev probes passed and pytest/battery runs buried every physics family under PAL/kernel lanes. | mini-batch repro: qv-energy SOLVED fresh, REFUSED after a vernier case in the same process order; `_STRUCTURES` membership check False | `modeling_layer._repair_registry()` — one-time late re-registration at the top of `model_problem()` (all modules fully loaded by then) + idempotent self-registration at the bottom of `physics_families.py`.  Registry membership is now import-order-independent (pinned by `test_pipeline_registry_present_regardless_of_import_order`). |
| P11-b | **Unit-blind data-coverage guards.** `_coverage_refuse` and the lane-B guard compared raw stated numbers against used numbers: a family that correctly converts cm→m "dropped" the original values (C8 brick: 20/10/5 cm consumed as 0.2/0.1/0.05 m → "3 of 4 stated values never used" → honest 1500 Pa downgraded to a refusal). | both brick cases refused in-pipeline while the dispatcher computed 1500/6000 Pa | `_value_consumed()` — a stated value counts as consumed when a used value equals it exactly OR through a standard unit factor (1e-6…1e6, 60, 3600, 1/60, 1/3600, 3.6, 1/3.6, inch/cm).  Plus the **physics distractor exemption**: board physics stems pad every question with irrelevant givens (heat-rate ask carrying mass 500 g and delta-T 40 C) — a physics-family result that still consumed 2+ stated values is exempt (C7H03 840 W now ships). |
| P11-c | **Chain-lane interception without rescue.** A 2-hop chain that degraded (heat-per-degree text parsed as heat→per-degree hops and lost its operand) shipped GUIDED and never consulted the registry sweep holding C7_HEAT_PER_DEGREE at 0.95. | "…thermal energy supplied is 2200 J, calculate the heat energy added per degree" → route `chain:2hops, chain_degraded` | `chain_degraded:registry_rescue` in `_lane_b`: after the auto-binder miss, the sweep gets one turn under the standard promotion gates (confidence ≥ 0.85, ask-shape, energy-kind, coverage) before the degraded result ships. |

Subsidiary routing fixes landed in the same pass:

- **SDT sci-notation drop** (same class as C8-P5): `_SDT_SPEED_RX` harvested
  the EXPONENT of "3 x 10^8 m/s" as the speed → "40 m" VERIFIED for the
  solar-radiation ask (true 1.5e9 m).  `_c_sdt` now expands every a×10^e
  to its plain decimal before any harvest regex runs.
- **Kinematics PAL sign gate** (`semantic_check.verify_pal_consistency`):
  disk-cached LLM programs can bake in the u/v role swap; the pinned flip
  question served −1.5 VERIFIED through `structure:PAL_PROGRAM`,
  outranking the dispatcher's verified +2.5 (the structure lane runs
  first).  The dispatcher's sign invariant (accelerates-from-rest ⇒ a>0;
  decelerates-to-rest ⇒ a<0) now applies to every PAL answer.
- **Single-segment speed ask** (`_c_speed_segments`): "covers the FIRST
  200 metres … average speed for the FIRST 200 metres" states one segment
  and asks its own speed — v = d/t fires when the stated distance clause
  carries the same ordinal the ask names (C7M06 corpus, 8 m/s).
- **OHMS_LAW_ANY multi-resistor gate**: binding the LAST stated resistor
  shipped I = 18/9 = 2 A for a 3+6+9 series bank on 18 V (true 1 A);
  two or more distinct resistance values now refuse the single-R family.
- **`_c_work` friction gate**: W = F·d on the applied force alone shipped
  50 J where the net work is 30 J (10 N − 4 N friction over 5 m);
  friction-with-direction contexts refuse so C9_WORK_NET_FRICTION owns them.
- **KINEMATICS energy co-ask veto + `_c_kwh` dual-unit veto + `_c_work`
  theta regex**: "calculate its kinetic energy AND speed" / "in joules
  AND in kWh" are TWO-part asks — the single-quantity families answered
  their half and shipped it as the whole answer (20 m/s without the
  400 J; 3 kWh without the 1.08e7 J); the energy/power C9 families own
  the co-asks.  "acts at 60 degrees to the horizontal" now binds as
  theta in `_c_work` (was read as theta=None → 50 J instead of 25 J).
- **META-JUDGEMENT guard** (`_answer_core`): "two students solve the
  same problem … who is correct?" / "a student calculates X … why is
  this reasoning incorrect?" ask for a JUDGEMENT of a quoted method.
  Compute lanes answered the EMBEDDED problem: 800 m (= u·t ignoring
  the braking; true stopping distance 400 m) and a fall-time instead of
  judging the student's KE claim.  Verified numerics on meta-framed
  asks downgrade to the honest guided refusal.

Determinism note for future digs (no code change, owner's call):
`structure_extract_cache.json` + `pal_templates.json` in runtime_data
serve LLM-written programs even with SOLVER_LLM_MODE=off (the mode check
guards NEW `_chat` calls, not disk-cache hits).  The template gates
(ask-role, unit surface, given units, declared flows) and the new PAL
sign gate keep these sound, but "off" is not literally LLM-free — it is
LLM-free-plus-cached-artifacts.

## D2. CLASS 9 bug class table (owner format)

Corpus: 64 `c9_physics_*` files, 61 numeric diagnostics extracted
(`_dig_c9phy.json`, builder `_dig_c9phy_build.py`, runner
`_dig_c9phy_run.py`).  Pre-fix pipeline: 15 SOLVE / 45 REFUSE / 1 WRONG.
Post-fix: **32 SOLVE / 0 WRONG / 29 honest refusals** (graph-reading,
insolation estimation, and judgement asks stay refusals by design).

| Bug class | Examples (real corpus phrasings) | Status |
|-----------|----------------------------------|--------|
| C9-W1 zero-work refuses | "holds a 20 N bag stationary … work done?"; "coolie carries 50 kg on his head, walks horizontally … work done by upward force?" | FIXED `C9_WORK_ZERO` (0 J: no displacement / cos 90 = 0) |
| C9-W2 angled force ships F·d | "force of 10 N acts at 60 degrees to the horizontal, moves 5 m" → 50 J (theta unread) | FIXED `_c_work` theta regex → 25 J |
| C9-W3 friction net-work | "applied 10 N forward, kinetic friction 4 N backward, moves 5 m, net work?" → 50 J | FIXED `C9_WORK_NET_FRICTION` → 30 J + `_c_work` gate |
| C9-W4 work-energy theorem | "2 kg accelerates 4→8 m/s, net work?" → 48 J served by the core WORK_ENERGY_THEOREM; reverse read "net force 10 N over 5 m from rest, final velocity?" → 7.07 m/s | FIXED `C9_WORK_KE_THM` (both reads) |
| C9-E1 drop KE + speed half-answered | "2 kg stone dropped from 20 m, KE and speed just before impact?" → "20 m/s" only | FIXED `C9_DROP_KE` (KE = mgh = 400 J AND v = sqrt(2gh) = 20 m/s) + kinematics energy co-ask veto |
| C9-E2 spring energy | "500 g car, spring k = 200 N/m compressed 5 cm, EPE?" → 0.25 J (+ launch speed 1 m/s co-ask) | FIXED `C9_SPRING_LAUNCH` |
| C9-E3 power→energy dual unit | "1.5 kW pump runs 2 h daily, energy in joules and kWh?" → "3 units" only | FIXED `C9_POWER_ENERGY` → 1.08e7 J = 3 kWh + `_c_kwh` dual-unit veto |
| C9-S1 v = f lambda | "tuning fork 256 Hz, speed of sound 340 m/s, wavelength?" → 1.33 m | FIXED `C9_WAVE_VFL` (any-variable) |
| C9-S2 echo half-path | "ultrasonic pulse … reflected returns after 40 microseconds, distance of crack?" (microsecond givens broke ECHO_SONAR) | FIXED `C9_PULSE_ECHO` (d = v t / 2 → 0.1192 m) |
| C9-L1 W = V Q | "9 V battery does 9 J per coulomb, 3 C passes, energy?" → 27 J | FIXED `C9_QV_ENERGY` |
| C9-L2 series bank hijacked | "resistors 3, 6, 9 ohms in series with 18 V … current and V(6 ohm)?" → 2 A (last resistor bound) | FIXED `C9_SERIES_BANK` → 1 A, 6 V + OHMS_LAW_ANY gate |
| C9-M1 distance vs displacement | "50 m east then 30 m west, distance and displacement?" → 80 m + 20 m east | FIXED `C9_DIST_DISP` (signed legs) |
| C9-M2 avg speed vs velocity | "100 m east in 10 s, 50 m west in 5 s, average speed and velocity?" → 10 m/s + 3.33 m/s east | FIXED `C9_AVG_VELOCITY` |
| C9-M3 momentum (collision) | "1500 kg car at 20 m/s hits stationary 1000 kg truck, car moves at 5 m/s after, truck velocity?" → 22.5 m/s | FIXED `C9_MOMENTUM` |
| C9-M4 recoil | "60 kg boy jumps off 40 kg trolley at 2 m/s, recoil?" → 3 m/s opposite | FIXED `C9_MOMENTUM` recoil read |
| C9-M5 centripetal | "cyclist+bike 70 kg, r = 20 m, v = 5 m/s, centripetal force?" → 87.5 N | FIXED `C9_CENTRIPETAL` |
| C9-I1 vernier least count | "1 mm MSD, 10 vernier divisions coincide with 9 MSD, least count?" → 0.1 mm | FIXED `C9_LEAST_COUNT` |
| C9-X1 meta-judgement wrong-ship | "two students solve … who is correct?" → 800 m (u·t ignoring braking); "student solves … KE at 4 m" → fall time instead of judging | FIXED (meta-judgement guard → honest refusal) |

Dispatcher order is now TABLE → _TABLE_BOOKS2 → **_TABLE_C9** → _TABLE_C7
→ _TABLE_C8 → _TABLE_C8B (the C9 rows carry distinct triggers; the
earlier slot keeps priority for the average-velocity co-ask over the
speed-only class-7 family).

Tests: `backend/tests/test_class9_physics_families.py` — 26/26 green
(16 family pins + 8 pipeline-level routing pins + meta/SDT/PAL pins).
Suites: class-7 25/25, kinematics 7/7, structure gates 81/81 +
pipeline-level pass.  One known failure NOT this dig's lane:
`test_pressure_word_forms[tractor]` in test_class8_physics_families —
the parallel class-8 holder's `_c8b_pressure_vehicle` rewrite was
mid-flight in the shared tree at hand-off (function still carries its
DBG-PV probes and refuses the tractor case).  Battery evidence:
`_dig_c9phy_out.jsonl`.

Pending live re-check (Postgres down): bank/GUIDED-lane outcomes for
the remaining 29 refusals; answer_memo.json in runtime_data keeps
being rewritten by fleet processes — order-dependent flakes in
combined pytest runs trace to it, re-run singles before blaming code.

## D3. CLASS 10 (42 `c10_phy_cbse` files, 41 numeric diagnostics)

Baseline pipeline: 18 SOLVE / 0 WRONG / 23 REFUSE.  Post-fix:
**25 SOLVE / 0 WRONG / 16 honest refusals** (multi-step energy-plant
chains and design-experiment asks stay refusals — no-maths-families
owner rule).  Battery: `_dig_c10phy.json` / `_dig_c10phy_out.jsonl`.

| Bug class | Examples (real corpus phrasings) | Status |
|-----------|----------------------------------|--------|
| C10-E1 I = Q/t refuses | "charge of 300 coulombs passes … in 5 minutes, current?" → 1 A (minutes converted) | FIXED `C10_QT_CURRENT` |
| C10-E2 V = W/Q refuses | "charge of 50 C … work done is 600 J, potential difference?" → 12 V | FIXED `C9_QV_ENERGY` reverse read |
| C10-E3 resistivity refuses | "wire L = 2 m, A = 1×10⁻⁶ m², R = 3.4 Ω, resistivity?" → 1.7×10⁻⁶ Ω·m | FIXED `C10_RESISTIVITY` (rho = RA/L) |
| C10-E4 stretched wire | "R = 10 Ω stretched to double its length (volume constant)" → 40 Ω (n² scaling) | FIXED `C10_RESISTIVITY` |
| C10-E5 parallel bank | "2 Ω, 4 Ω, 4 Ω in parallel across 12 V" → 1 Ω, 12 A | FIXED `C10_PARALLEL_BANK` (1/R = Σ1/Ri, per-branch I) |
| C10-E6 mains current trigger gap | "1500 W geyser connected to the 220 V mains. Calculate the current drawn" — the C8 trigger could not cross the sentence boundary | FIXED (trigger alternative W…V across sentences → 6.82 A) |
| C10-M1 peak emf | "coil 100 turns, 0.1 m², 60 rpm, B = 0.5 T, maximum induced emf?" → 31.4 V (rpm→ω = 2πf) | FIXED `C10_PEAK_EMF` |
| C10-O1 lens power | "power −2.0 D, focal length?" → −0.5 m diverging; "+3.5 D and −1.5 D in contact" → +2.0 D, 0.5 m converging | FIXED `C10_LENS_POWER` (P = 1/f; contact pair P = P1+P2) |

Tests: the class-10 block in `test_class9_physics_families.py`
(9 pins) — suite now **38/38 green**.

## D4. c11/c12 SPOT-CHECK (chapter-stratified sample; 0 wrong-ships)

Sample: 1 file per chapter prefix per class (seeded), numeric
diagnostics only → 5 cases: 2 SOLVE / 0 WRONG / 3 REFUSE.  Two of the
refusals were real gaps and landed; one (nuclear Q-value, class-12
mass-defect arithmetic) stays open — needs reaction-equation parsing,
flagged for the next dig.

| Fix | Evidence | Status |
|-----|----------|--------|
| SHM veto on the kinematics family | "0.5 kg on a 50 N/m spring … time period of the oscillation?" was answered **0.14 s** by KINEMATICS_S_UT_AT2 (constant-acceleration misread of position-dependent a = kx/m) — a wrong-ship class, not a gap | FIXED (kinematics veto) + `C11_SHM_PERIOD` (T = 2π√(m/k) → 0.628 s) |
| Thermal-expansion "gap" phrasing | "steel rail 12 m … coefficient 1.20×10⁻⁵ per K … calculate the gap to leave so the rail just touches at 45 °C" refused (ask-phrase list had no "gap" form) | FIXED (`ask_dl_calc` extended → 3.6 mm) |

c11/c12 deeper sweep (180/244 files) remains for the next session
together with the Q-value family.
