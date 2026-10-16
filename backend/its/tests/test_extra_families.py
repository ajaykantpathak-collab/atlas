"""test_extra_families.py -- batteries for extra_families.py, the families
mined from the competency90 dev-split failure clusters (baseline 42.4%).

Each family closes a named refusal cluster; one failing row = one
cluster regression.

Run:
    cd /d/platform && python -m pytest backend/its/tests/test_extra_families.py -q
"""

from __future__ import annotations

import math

import pytest

# WS-B step 1: maths families of the old extra_families moved to
# maths_families; physics/commerce/accountancy families stay here.
from backend.its.solver.maths_families import (
    model_ap_consecutive_x,
    model_composite_solid,
    model_concentric_chord,
    model_ap_which_term,
    model_linear_inequality,
    model_mixture_addition,
    model_perfect_cube,
    model_quadratic_nature,
    model_rational_form,
    model_standard_form,
    model_symmetry_angles,
    model_word_permutations,
)
from backend.its.solver.physics_families import (
    model_barometer_column,
    model_gas_wall_impulse,
    model_kinematics_stop,
    model_potential_zero_point,
    model_resistor_network,
)
from backend.its.solver.commerce_families import model_perpetuity
from backend.its.solver.accountancy_families import (
    model_linear_depreciation,
)
from backend.its.solver.commerce_families import (
    model_commerce_families as model_extra,
)


def _check(model, text: str, want: float, structure: str, rel: float = 1e-3):
    r = model(text)
    assert r.matched, f"not matched: {text[:70]} (note={r.note})"
    assert r.structure == structure, \
        f"got {r.structure}, want {structure}: {text[:70]}"
    assert r.numeric_answer == pytest.approx(want, rel=rel), \
        f"got {r.numeric_answer}, want {want}: {text[:70]}"
    assert r.steps and r.final_answer and r.governing_equation
    return r


def _refused(model, text: str):
    r = model(text)
    assert not r.matched, f"should refuse: {text[:70]} (matched {r.structure})"


# ---- LINEAR_INEQUALITY ----

def test_inequality_bracket_form():
    # 3x - 3 <= 2x - 6  ->  x <= -3
    r = _check(model_linear_inequality, "Solve: 3(x - 1) <= 2(x - 3)",
               -3.0, "LINEAR_INEQUALITY")
    assert "x <=" in r.final_answer


def test_inequality_x_both_sides():
    # 2x > -2  ->  x > -1
    r = _check(model_linear_inequality, "Solve 5x - 3 > 3x - 5",
               -1.0, "LINEAR_INEQUALITY")
    assert "x >" in r.final_answer


def test_inequality_sign_flip():
    # 4 - 2x >= 10  ->  -2x >= 6  ->  x <= -3 (flip on dividing by -2)
    r = _check(model_linear_inequality, "Solve 4 - 2x >= 10",
               -3.0, "LINEAR_INEQUALITY")
    assert "x <=" in r.final_answer


def test_inequality_unicode_le():
    _check(model_linear_inequality, "Solve 3x \u2212 2 < 2x + 1",
           3.0, "LINEAR_INEQUALITY")


def test_inequality_garbage_refused():
    _refused(model_linear_inequality, "The weather is quite pleasant today.")


# ---- SYMMETRY_ANGLES ----

def test_symmetry_number_first():
    r = model_symmetry_angles(
        "In a figure, 60 degrees is the smallest angle of symmetry. "
        "What are the other angles of symmetry of this figure?")
    assert r.matched and r.numeric_answer == pytest.approx(120.0)
    assert "120" in r.final_answer and "300" in r.final_answer


def test_symmetry_angle_first():
    _check(model_symmetry_angles,
           "The smallest angle of symmetry is 72 degrees. Find the other "
           "angles of symmetry.", 144.0, "SYMMETRY_ANGLES")


def test_symmetry_non_divisor_refused():
    _refused(model_symmetry_angles,
             "The smallest angle of symmetry is 50 degrees.")


# ---- PERPETUITY ----

def test_perpetuity_quarterly():
    # i = 7500/250000 = 3% per quarter -> 12% nominal p.a.
    _check(model_perpetuity,
           "Rs 2,50,000 cash is equivalent to a perpetuity of Rs 7,500 "
           "payable at the end of each quarter. What is the rate of "
           "interest convertible quarterly?", 12.0, "PERPETUITY")


def test_perpetuity_annual():
    _check(model_perpetuity,
           "Rs 50,000 cash is equivalent to a perpetuity of Rs 4,000 "
           "payable at the end of each year. Find the rate.", 8.0,
           "PERPETUITY")


# ---- RESISTOR_NETWORK ----

def test_resistors_parallel_with_battery():
    # Req = 2.4 ohm, I = 12/2.4 = 5 A
    _check(model_resistor_network,
           "Two resistors of 4 ohm and 6 ohm are connected in parallel "
           "across a 12 V battery. Find the total current.",
           5.0, "RESISTOR_NETWORK")


def test_resistors_series_no_battery():
    _check(model_resistor_network,
           "Resistors of 10 ohm and 15 ohm are connected in series. "
           "Find the equivalent resistance.", 25.0, "RESISTOR_NETWORK")


def test_resistors_three_parallel():
    # 1/Req = 1/6+1/6+1/3 = 2/3 -> Req = 1.5
    _check(model_resistor_network,
           "Three resistors of 6 ohm, 6 ohm and 3 ohm are connected in "
           "parallel.", 1.5, "RESISTOR_NETWORK")


# ---- MIXTURE_ADDITION ----

def test_mixture_addition_solve():
    # 600(12) + V2(30) = 20 (600 + V2) -> V2 = 480
    _check(model_mixture_addition,
           "A manufacturer has 600 litres of a 12% solution of acid. "
           "How many litres of a 30% acid solution must be added so that "
           "the mixture is 20% acid?", 480.0, "MIXTURE_ADDITION")


def test_mixture_addition_impossible_refused():
    # target above both percents is unachievable
    _refused(model_mixture_addition,
             "A manufacturer has 600 litres of a 12% solution of acid. "
             "How many litres of a 30% acid solution must be added so that "
             "the mixture is 36% acid?")


# ---- COMPOSITE_SOLID ----

def test_composite_solid_volume():
    # r=4, cone h=4: V = (2/3)pi(64) + (1/3)pi(16)(4)
    want = (2.0 / 3.0) * math.pi * 64 + (1.0 / 3.0) * math.pi * 16 * 4
    _check(model_composite_solid,
           "A solid toy is in the form of a hemisphere surmounted by a "
           "cone. The total height is 8 cm and the diameter of the base "
           "is 8 cm. Find the volume of the toy.",
           want, "COMPOSITE_SOLID", rel=1e-6)


def test_composite_solid_surface_area():
    # r=8, cone h=4, l=sqrt(80): TSA = 2 pi 64 + pi 8 sqrt(80)
    want = 2.0 * math.pi * 64 + math.pi * 8 * math.sqrt(80.0)
    _check(model_composite_solid,
           "A solid is in the form of a hemisphere surmounted by a cone. "
           "The total height is 12 cm and the diameter of the base is "
           "16 cm. Find the total surface area.",
           want, "COMPOSITE_SOLID", rel=1e-6)


# ---- LINEAR_DEPRECIATION ----

def test_linear_depreciation_prose():
    _check(model_linear_depreciation,
           "The value V(t) of a machine follows a linear depreciation "
           "model, where the initial value of the machine is Rs 25,000 "
           "and it depreciates at Rs 1,500 per year. Find V(3).",
           20500.0, "LINEAR_DEPRECIATION")


# ---- GAS_WALL_IMPULSE ----

def test_gas_wall_impulse_30_degrees():
    want = 2.0 * 5e-26 * 200.0 * math.cos(math.radians(30.0))
    _check(model_gas_wall_impulse,
           "A molecule of mass 5 x 10^-26 kg hits a horizontal wall with "
           "speed 200 m/s at an angle of 30 degrees with the normal and "
           "rebounds with the same speed. Find the change in momentum.",
           want, "GAS_WALL_IMPULSE", rel=1e-6)


# ---- WORD_PERMUTATIONS ----

def test_word_permutations_repeated_letter():
    # AGAIN: 5 letters, A twice -> 5!/2! = 60
    _check(model_word_permutations,
           "Find the number of words with or without meaning which can "
           "be made using all the letters of the word AGAIN.",
           60.0, "WORD_PERMUTATIONS")


def test_word_permutations_all_distinct():
    _check(model_word_permutations,
           "Find the number of words that can be made using all the "
           "letters of the word EQUATION.", 40320.0, "WORD_PERMUTATIONS")


# ---- AP_WHICH_TERM ----

def test_ap_which_term_ncert():
    # a=3 d=12; 54th term = 639; +132 = 771; n = (771-3)/12 + 1 = 65
    _check(model_ap_which_term,
           "Which term of the AP : 3, 15, 27, 39, . . . will be 132 more "
           "than its 54th term?", 65.0, "AP_WHICH_TERM")


# ---- CONCENTRIC_CHORD ----

def test_concentric_chord_345():
    # half-chord 4, R=5 -> r=3
    _check(model_concentric_chord,
           "In two concentric circles, a chord of length 8 cm of the "
           "larger circle touches the smaller circle. If the radius of "
           "the larger circle is 5 cm, then find the radius of the "
           "smaller circle.", 3.0, "CONCENTRIC_CHORD")


def test_concentric_chord_chord_too_long_refused():
    _refused(model_concentric_chord,
             "In two concentric circles, a chord of length 20 cm of the "
             "larger circle touches the smaller circle. If the radius of "
             "the larger circle is 5 cm, find the radius of the smaller "
             "circle.")


# ---- BAROMETER_COLUMN ----

def test_barometer_wine_column():
    # 101325 / (984 x 9.8) = 10.507... m
    _check(model_barometer_column,
           "Torricelli's barometer used mercury. Pascal duplicated it "
           "using French wine of density 984 kg m-3. Determine the "
           "height of the wine column for normal atmospheric pressure.",
           101325.0 / (984.0 * 9.8), "BAROMETER_COLUMN", rel=1e-4)


def test_barometer_given_pressure():
    _check(model_barometer_column,
           "A barometer column of liquid of density 800 kg/m3 stands "
           "under a pressure of 88000 Pa. Find the column height.",
           88000.0 / (800.0 * 9.8), "BAROMETER_COLUMN", rel=1e-4)


# ---- PERFECT_CUBE ----

def test_perfect_cube_divide():
    # 1188 = 2^2 x 3^3 x 11 -> divide by 2^2 x 11 = 44
    r = model_perfect_cube(
        "Is 1188 a perfect cube? If not, by which smallest natural "
        "number should 1188 be divided so that the quotient is a "
        "perfect cube?")
    assert r.matched and "44" in r.final_answer


def test_perfect_cube_already_cube():
    r = model_perfect_cube("Is 1728 a perfect cube?")
    assert r.matched and "1728 is a perfect cube" in r.final_answer


def test_perfect_cube_multiply():
    # 392 = 2^3 x 7^2 -> multiply by 7
    r = model_perfect_cube(
        "What is the smallest natural number by which 392 must be "
        "multiplied so that the product is a perfect cube?")
    assert r.matched and "7" in r.final_answer


# ---- dispatcher ----

def test_dispatcher_reaches_families():
    # WS-B step 1: the maths families (LINEAR_INEQUALITY among them) moved
    # to maths_families -- the moved family serves via model_maths, the
    # dispatcher still reaches its surviving families.
    from backend.its.solver.maths_families import model_maths
    r = model_maths("Solve 5x - 3 > 3x - 5")
    assert r.matched and r.structure == "LINEAR_INEQUALITY"
    r2 = model_extra(
        "Rs 50,000 cash is equivalent to a perpetuity of Rs 4,000 "
        "payable at the end of each year. Find the rate.")
    assert r2.matched and r2.structure == "PERPETUITY"


def test_dispatcher_garbage_refused():
    r = model_extra("Tell me a joke about resistors and acid.")
    assert not r.matched


# ---- KINEMATICS_STOP ----

def test_kinematics_stop_kmh():
    # 126 km/h = 35 m/s; a = 35^2 / (2 x 200) = 3.0625 m/s^2
    _check(model_kinematics_stop,
           "A car moving along a straight highway with speed of 126 km h-1 "
           "is brought to a stop within a distance of 200 m. What is the "
           "retardation of the car (assuming uniform retardation)?"
           , 1225.0 / 400.0, "KINEMATICS_STOP")


def test_kinematics_stop_ms():
    _check(model_kinematics_stop,
           "A bus moving at 20 m/s is brought to a stop within a distance "
           "of 50 m. Find the retardation.",
           4.0, "KINEMATICS_STOP")

# ---- QUADRATIC_NATURE ----

def test_quadratic_nature_sqrt_form():
    r = model_quadratic_nature(
        "The roots of quadratic equation 3x^2 - 4√3x + 4 = 0 are")
    assert r.matched and r.numeric_answer == pytest.approx(0.0, abs=1e-9)
    assert r.final_answer == "real and equal"


def test_quadratic_nature_flattened_exponent():
    r = model_quadratic_nature(
        "The roots of quadratic equation x2 + 5x + 6 = 0 are")
    assert r.matched and r.numeric_answer == pytest.approx(1.0)
    assert r.final_answer == "real and distinct"


def test_quadratic_nature_not_real():
    r = model_quadratic_nature(
        "The roots of quadratic equation x2 + x + 5 = 0 are")
    assert r.matched and r.numeric_answer < 0
    assert "not real" in r.final_answer


def test_quadratic_nature_equal_roots():
    r = model_quadratic_nature(
        "The roots of quadratic equation x2 + 2x + 1 = 0 are")
    assert r.matched and r.final_answer == "real and equal"

# ---- ELECTRIC_POTENTIAL_ZERO ----

def test_potential_zero_point():
    # x = 15 x 3/(3+2) = 9 cm from the first charge
    _check(model_potential_zero_point,
           "Two charges 3 x 10-8 C and -2 x 10-8 C are located 15 cm "
           "apart. At what point on the line joining the two charges "
           "is the electric potential zero?",
           9.0, "ELECTRIC_POTENTIAL_ZERO")


# ---- AP_CONSECUTIVE_X ----

def test_ap_consecutive_x_ncert():
    _check(model_ap_consecutive_x,
           "The value of x for which 2x, (x + 10) and (3x + 2) are the "
           "three consecutive terms of an AP is",
           6.0, "AP_CONSECUTIVE_X")

# ---- unit-registry conversions (round 3 wiring) ----

def test_potential_zero_microcoulomb():
    # 4 uC vs 2 uC at 20 cm: x = 20 x 4/6 = 13.33 cm from charge 1
    _check(model_potential_zero_point,
           "Two charges 4 uC and -2 uC are located 20 cm apart. At what "
           "point on the line joining the two charges is the electric "
           "potential zero?",
           20.0 * 4.0 / 6.0, "ELECTRIC_POTENTIAL_ZERO")


def test_barometer_density_grams_per_cc():
    # 0.8 g/cm3 = 800 kg/m3
    _check(model_barometer_column,
           "A barometer column of liquid of density 0.8 g/cm3 stands "
           "under a pressure of 88000 Pa. Find the column height.",
           88000.0 / (800.0 * 9.8), "BAROMETER_COLUMN", rel=1e-4)


def test_resistor_kiloohm_si_current():
    # 2k + 6k parallel = 1.5 kohm; 12 V -> 0.008 A
    _check(model_resistor_network,
           "Two resistors of 2 kohm and 6 kohm are connected in "
           "parallel across a 12 V battery. Find the total current.",
           0.008, "RESISTOR_NETWORK")


def test_gas_wall_impulse_grams():
    # 5 x 10-23 g = 5 x 10-26 kg
    import math as _m
    want = 2.0 * 5e-26 * 200.0 * _m.cos(_m.radians(30.0))
    _check(model_gas_wall_impulse,
           "A molecule of mass 5 x 10-23 g hits a horizontal wall with "
           "speed 200 m/s at an angle of 30 degrees with the normal and "
           "rebounds with the same speed. Find the change in momentum.",
           want, "GAS_WALL_IMPULSE", rel=1e-4)

# ---- STANDARD_FORM / RATIONAL_FORM (representational formats) ----

def test_standard_form_large():
    _check(model_standard_form,
           "Express 4500000 in standard form.",
           4500000.0, "STANDARD_FORM")


def test_standard_form_decimal_shifts_down():
    r = model_standard_form("Express 0.00052 in standard form.")
    assert r.matched and "10^-4" in r.final_answer


def test_rational_form_exact():
    r = model_rational_form("Express 0.75 as a rational number.")
    assert r.matched and r.final_answer == "3/4"


def test_rational_form_not_representable_refused():
    _refused(model_rational_form,
             "Express 0.333333 as a rational number.")