"""test_extra_families2.py -- batteries for extra_families2.py, the round-3
families mined from the competency90 guided (refusal) clusters.

Each family closes a named failure cluster; one failing row = one cluster
regression.  Expected values are computed inline from first principles so
they are independent of the implementation.

Run:
    cd /d/platform && python -m pytest backend/its/tests/test_extra_families2.py -q
"""

from __future__ import annotations

import math

import pytest

# WS-B step 1: maths families of the old extra_families2 moved to
# maths_families; physics/chemistry/accountancy families stay here.
# INVERSE_PROPORTION was DROPPED per map §4a (core spec + maths2 row own
# the id; its two positive stems resolve via PAL_PROGRAM with the same
# answers, its refusal pins were refusal-class already) -- the four tests
# pinning the deleted fn were removed with it.
from backend.its.solver.maths_families import (
    model_ap_equal_terms,
    model_basic_proportionality,
    model_chord_from_distance,
    model_dice_product_prob,
    model_discount_marked,
    model_equilateral_altitude,
    model_mean_variance_missing,
    model_not_perfect_cube_list,
    model_section_formula,
    model_tangent_quadrilateral,
    model_three_digit_multiples,
    model_two_point_line,
)
from backend.its.solver.physics_families import (
    model_bernoulli_lift,
    model_coil_magnetic_moment,
    model_kelvin_convert,
    model_lens_power_real,
    model_projectile_ceiling,
    model_rotating_cylinder,
)
from backend.its.solver.chemistry_families import model_carbon_dating
from backend.its.solver.accountancy_families import (
    model_geometric_depreciation,
)
from backend.its.solver.physics_families import (
    model_physics_families as model_extra2,
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


# ---- DICE_PRODUCT_PROB (rows 16904, 17590, 33290) ----

def test_dice_product_odd_custom_faces():
    # odd product needs both faces odd: 3 odd faces of 6 -> (3/6)^2 = 1/4
    _check(model_dice_product_prob,
           "(A) Two dice are rolled together bearing numbers 4, 6, 7, 9, "
           "11, 12. Find the probability that the product of numbers "
           "obtained is an odd number.",
           0.25, "DICE_PRODUCT_PROB")


def test_dice_product_target_standard_dice():
    # product 12 on standard dice: (2,6)(3,4)(4,3)(6,2) -> 4/36 = 1/9
    _check(model_dice_product_prob,
           "Two identical fair dice have numbers 1 to 6 written on their "
           "faces. Both are tossed simultaneously. What is the probability "
           "that the product of the numbers that turn up is 12?",
           1.0 / 9.0, "DICE_PRODUCT_PROB")


def test_dice_product_target_all_pairs():
    # product 6 on standard dice: (1,6)(2,3)(3,2)(6,1) -> 4/36
    _check(model_dice_product_prob,
           "Two fair dice have numbers 1 to 6 on their faces. Find the "
           "probability that the product of the numbers that turn up is 6.",
           4.0 / 36.0, "DICE_PRODUCT_PROB")


def test_dice_product_no_product_ask_refused():
    _refused(model_dice_product_prob,
             "Two dice are rolled together bearing numbers 4, 6, 7, 9, 11, "
             "12. Find the probability that the sum of the numbers is 20.")


def test_dice_product_unknown_mode_refused():
    _refused(model_dice_product_prob,
             "Two dice are rolled together. Find the probability that the "
             "product of numbers obtained is a perfect square.")


# ---- TWO_POINT_LINE (rows 8101, 7612) ----

def test_two_point_line_determinants_with_k():
    # A(1,3), B(0,0): 3x - y = 0; area of ABD with D(k,0) = |3k|/2 = 3 -> k = +-2
    r = _check(model_two_point_line,
               "Find the equation of the line joining A(1, 3) and B (0, 0) "
               "using determinants and find k if D(k, 0) is a point such "
               "that area of triangle ABD is 3sq units.",
               3.0, "TWO_POINT_LINE")
    assert "3x - y = 0" in r.final_answer
    assert "2" in r.final_answer  # k = 2 or k = -2


def test_two_point_line_median_through_vertex():
    # midpoint of P(2,1),Q(-2,3) = (0,2); line R(4,5)-(0,2): 3x - 4y + 8 = 0
    r = _check(model_two_point_line,
               "The vertices of triangle PQR are P (2, 1), Q (-2, 3) and "
               "R (4, 5). Find equation of the median through the vertex R.",
               0.75, "TWO_POINT_LINE")
    assert "3x - 4y + 8 = 0" in r.final_answer


def test_two_point_line_vertical():
    r = _check(model_two_point_line,
               "Find the equation of the line joining A(2, 1) and B(2, 5).",
               2.0, "TWO_POINT_LINE")
    assert "x = 2" in r.final_answer


def test_two_point_line_missing_point_refused():
    _refused(model_two_point_line,
             "Find the equation of the line joining A(1, 3) and B using "
             "determinants.")


def test_two_point_line_degenerate_area_refused():
    # A and B on the x-axis: area of ABD is 0 for every k -> refuse
    _refused(model_two_point_line,
             "Find the equation of the line joining A(0, 0) and B(5, 0) "
             "and find k if D(k, 0) is a point such that area of triangle "
             "ABD is 3 sq units.")


# ---- THREE_DIGIT_MULTIPLES (rows 6854, 43701) ----

def test_three_digit_multiples_7():
    # floor(999/7)=142, ceil(100/7)=15 -> 142-15+1 = 128
    _check(model_three_digit_multiples,
           "How many three-digit numbers are divisible by 7?",
           128.0, "THREE_DIGIT_MULTIPLES")


def test_three_digit_multiples_5():
    # floor(999/5)=199, ceil(100/5)=20 -> 180
    _check(model_three_digit_multiples,
           "How many three digit numbers are divisible by 5?",
           180.0, "THREE_DIGIT_MULTIPLES")


def test_three_digit_multiples_two_digit_refused():
    _refused(model_three_digit_multiples,
             "How many two-digit numbers are divisible by 7?")


def test_three_digit_multiples_non_integer_divisor_refused():
    _refused(model_three_digit_multiples,
             "How many three-digit numbers are divisible by 7.5?")


# ---- NOT_PERFECT_CUBE_LIST (rows 4293, 43189) ----

def test_not_perfect_cubes_ncert_list():
    # 216=6^3, 1000=10^3, 46656=36^3 are cubes; 128=2^7 and 100 are not
    r = _check(model_not_perfect_cube_list,
               "Which of the following numbers are not perfect cubes? "
               "(i) 216 (ii) 128 (iii) 1000 (iv) 100 (v) 46656",
               2.0, "NOT_PERFECT_CUBE_LIST")
    assert "128" in r.final_answer and "100" in r.final_answer


def test_not_perfect_cubes_all_cubes():
    r = _check(model_not_perfect_cube_list,
               "Which of the following numbers are not perfect cubes? "
               "(i) 216 (ii) 1000",
               0.0, "NOT_PERFECT_CUBE_LIST")
    assert "perfect cube" in r.final_answer


def test_not_perfect_cubes_empty_list_refused():
    _refused(model_not_perfect_cube_list,
             "Which of the following numbers are not perfect cubes?")


def test_not_perfect_cubes_opposite_ask_refused():
    _refused(model_not_perfect_cube_list,
             "Which of the following numbers are perfect cubes? "
             "(i) 216 (ii) 128")


# ---- LENS_POWER_REAL (row 33458) ----

def test_lens_power_real_converging_only():
    # real image of a real object needs a converging lens: P > 0 -> 4 D
    r = _check(model_lens_power_real,
               "Which of the two lenses can form a real image? A. only the "
               "lens with power -3 D B. only the lens with power 4 D "
               "C. both the lenses D. neither of the lenses",
               4.0, "LENS_POWER_REAL")
    assert "only" in r.final_answer and "4 D" in r.final_answer


def test_lens_power_real_both_diverging():
    r = model_lens_power_real(
        "Which of the two lenses can form a real image? One has power "
        "-5 D and the other -2 D.")
    assert r.matched and r.numeric_answer == pytest.approx(0.0)
    assert "neither" in r.final_answer


def test_lens_power_real_single_power_refused():
    _refused(model_lens_power_real,
             "Which of the two lenses can form a real image if one of them "
             "has power -3 D?")


def test_lens_power_real_absurd_power_refused():
    _refused(model_lens_power_real,
             "Which of the two lenses can form a real image? Lens A has "
             "power 60 D and lens B has power -3 D.")


# ---- COIL_MAGNETIC_MOMENT (row 11493) ----

def test_coil_magnetic_moment_max_at_single_turn():
    # m = N I A, r = L/(2 pi N) -> m = I L^2/(4 pi N): decreasing in N
    _check(model_coil_magnetic_moment,
           "A wire of length L carrying a current I can be turned into a "
           "circular coil of N turns. For what turned value of N, will the "
           "magnetic moment of this current carrying coil be maximum?",
           1.0, "COIL_MAGNETIC_MOMENT")


def test_coil_magnetic_moment_variant_wording():
    _check(model_coil_magnetic_moment,
           "A wire of length L carrying current I is turned into a circular "
           "coil of N turns. For what value of N will the magnetic moment "
           "of the coil be maximum?", 1.0, "COIL_MAGNETIC_MOMENT")


def test_coil_magnetic_moment_no_maximum_refused():
    _refused(model_coil_magnetic_moment,
             "A wire of length L carrying a current I can be turned into a "
             "circular coil of N turns. Find the magnetic moment of the "
             "coil.")


def test_coil_magnetic_moment_minimum_refused():
    _refused(model_coil_magnetic_moment,
             "A wire of length L carrying a current I can be turned into a "
             "circular coil of N turns. For what value of N will the "
             "magnetic moment be minimum?")


# ---- PROJECTILE_CEILING (row 46319) ----

def test_projectile_ceiling_constrained():
    # u=40, H=25: sin t = sqrt(2*9.8*25)/40; R = u^2 sin(2t)/9.8 = 150.5 m
    s = math.sqrt(2.0 * 9.8 * 25.0) / 40.0
    want = (1600.0 / 9.8) * 2.0 * s * math.sqrt(1.0 - s * s)
    _check(model_projectile_ceiling,
           "The ceiling of a long hall is 25 m high. What is the maximum "
           "horizontal distance that a ball thrown with a speed of "
           "40 m s-1 can go without hitting the ceiling of the hall?",
           want, "PROJECTILE_CEILING", rel=1e-4)


def test_projectile_ceiling_unconstrained():
    # u=20, H=60: 45 deg height u^2/4g = 10.2 < 60 -> plain max range u^2/g
    _check(model_projectile_ceiling,
           "The ceiling of a long hall is 60 m high. What is the maximum "
           "horizontal distance that a ball thrown with a speed of 20 m/s "
           "can go without hitting the ceiling of the hall?",
           400.0 / 9.8, "PROJECTILE_CEILING", rel=1e-4)


def test_projectile_ceiling_constrained_small_hall():
    # u=20, H=5: s = sqrt(2*9.8*5)/20
    s = math.sqrt(2.0 * 9.8 * 5.0) / 20.0
    want = (400.0 / 9.8) * 2.0 * s * math.sqrt(1.0 - s * s)
    _check(model_projectile_ceiling,
           "The ceiling of a hall is 5 m high. What is the maximum "
           "horizontal distance that a ball thrown with a speed of "
           "20 m s-1 can go without hitting the ceiling?",
           want, "PROJECTILE_CEILING", rel=1e-4)


def test_projectile_ceiling_no_ceiling_refused():
    _refused(model_projectile_ceiling,
             "What is the maximum horizontal distance that a ball thrown "
             "with a speed of 40 m s-1 can go?")


def test_projectile_ceiling_out_of_range_refused():
    _refused(model_projectile_ceiling,
             "The ceiling of a hall is 900 m high. What is the maximum "
             "horizontal distance that a ball thrown with a speed of "
             "900 m s-1 can go without hitting the ceiling?")


# ---- BERNOULLI_LIFT (row 46531) ----

def test_bernoulli_lift_ncert_wing():
    # L = 1/2 rho (v1^2 - v2^2) A = 0.5*1.3*(70^2-63^2)*2.5 = 1512.875 N
    _check(model_bernoulli_lift,
           "In a test experiment on a model aeroplane in a wind tunnel, the "
           "flow speeds on the upper and lower surfaces of the wing are "
           "70 m s-1 and 63 m s-1 respectively. What is the lift on the "
           "wing if its area is 2.5 m2? Take the density of air to be "
           "1.3 kg m-3.",
           0.5 * 1.3 * (70.0 ** 2 - 63.0 ** 2) * 2.5, "BERNOULLI_LIFT")


def test_bernoulli_lift_second_case():
    _check(model_bernoulli_lift,
           "The flow speeds on the upper and lower surfaces of a wing are "
           "80 m s-1 and 60 m s-1 respectively. What is the lift on the "
           "wing if its area is 2 m2? Take the density of air to be "
           "1.2 kg m-3.",
           0.5 * 1.2 * (6400.0 - 3600.0) * 2.0, "BERNOULLI_LIFT")


def test_bernoulli_lift_no_density_refused():
    _refused(model_bernoulli_lift,
             "The flow speeds on the upper and lower surfaces of the wing "
             "are 70 m s-1 and 63 m s-1 respectively. What is the lift on "
             "the wing if its area is 2.5 m2?")


def test_bernoulli_lift_inverted_speeds_refused():
    _refused(model_bernoulli_lift,
             "The flow speeds on the upper and lower surfaces of the wing "
             "are 63 m s-1 and 70 m s-1 respectively. What is the lift on "
             "the wing if its area is 2.5 m2? Take the density of air to "
             "be 1.3 kg m-3.")


# ---- ROTATING_CYLINDER (row 46443) ----

def test_rotating_cylinder_ncert():
    # KE = (1/4) M R^2 w^2 = 3125 J; L = (1/2) M R^2 w = 62.5 kg m^2/s
    r = _check(model_rotating_cylinder,
               "A solid cylinder of mass 20 kg rotates about its axis with "
               "angular speed 100 rad s-1. The radius of the cylinder is "
               "0.25 m. What is the kinetic energy associated with the "
               "rotation of the cylinder? What is the magnitude of angular "
               "momentum of the cylinder about its axis?",
               0.25 * 20.0 * 0.0625 * 10000.0, "ROTATING_CYLINDER")
    assert "62.5" in r.final_answer


def test_rotating_cylinder_ke_only():
    _check(model_rotating_cylinder,
           "A solid cylinder of mass 10 kg rotates about its axis with "
           "angular speed 20 rad/s. The radius of the cylinder is 0.5 m. "
           "What is the kinetic energy associated with the rotation?",
           0.25 * 10.0 * 0.25 * 400.0, "ROTATING_CYLINDER")


def test_rotating_cylinder_angular_momentum_only():
    _check(model_rotating_cylinder,
           "A solid cylinder of mass 10 kg rotates about its axis with "
           "angular speed 20 rad/s. The radius of the cylinder is 0.5 m. "
           "What is the magnitude of angular momentum about its axis?",
           0.5 * 10.0 * 0.25 * 20.0, "ROTATING_CYLINDER")


def test_rotating_cylinder_hollow_refused():
    _refused(model_rotating_cylinder,
             "A hollow cylinder of mass 20 kg rotates about its axis with "
             "angular speed 100 rad s-1. The radius of the cylinder is "
             "0.25 m. What is the kinetic energy of rotation?")


def test_rotating_cylinder_no_radius_refused():
    _refused(model_rotating_cylinder,
             "A solid cylinder of mass 20 kg rotates about its axis with "
             "angular speed 100 rad s-1. What is the kinetic energy "
             "associated with the rotation?")


# ---- KELVIN_CONVERT (row 46554) ----

def test_kelvin_convert_triple_points():
    r = _check(model_kelvin_convert,
               "The triple points of neon and carbon dioxide are 24.57 K "
               "and 216.55 K respectively. Express these temperatures on "
               "the Celsius and Fahrenheit scales.",
               24.57 - 273.15, "KELVIN_CONVERT")
    assert "-415.44" in r.final_answer   # 1.8*(24.57-273.15)+32
    assert "-69.88" in r.final_answer    # 1.8*(216.55-273.15)+32


def test_kelvin_convert_single_value():
    r = _check(model_kelvin_convert,
               "The temperature of a furnace is 1200 K. Express this "
               "temperature on the Celsius and Fahrenheit scales.",
               926.85, "KELVIN_CONVERT")
    assert "1700.33" in r.final_answer


def test_kelvin_convert_no_fahrenheit_refused():
    _refused(model_kelvin_convert,
             "The triple points of neon and carbon dioxide are 24.57 K and "
             "216.55 K respectively. Express these temperatures on the "
             "Celsius scale.")


def test_kelvin_convert_nonphysical_refused():
    _refused(model_kelvin_convert,
             "A body is at -50 K. Express this temperature on the Celsius "
             "and Fahrenheit scales.")


# ---- CARBON_DATING (row 10301) ----

def test_carbon_dating_ten_percent():
    # age = 5730 * log2(10) = 19034.6 years
    _check(model_carbon_dating,
           "Carbon dating is used by archaeologists to date trees, plants, "
           "and animal remains. If an archaeologist found that the "
           "percentage of carbon-14 in the remains of an animal was 10% of "
           "what carbon-14 was in the animal's body when the animal died, "
           "find the age of this sample. (Given the half-life of "
           "carbon-14= 5730 years)",
           5730.0 * math.log(10.0) / math.log(2.0), "CARBON_DATING",
           rel=1e-4)


def test_carbon_dating_quarter():
    # two half-lives: 25% left -> 5730 * 2 = 11460 years
    _check(model_carbon_dating,
           "The percentage of carbon-14 in a wooden artefact was 25% of "
           "what it was when the tree died. Find the age of the artefact "
           "if the half-life of carbon-14 = 5730 years.",
           11460.0, "CARBON_DATING")


def test_carbon_dating_no_half_life_refused():
    _refused(model_carbon_dating,
             "The percentage of carbon-14 in the remains of an animal was "
             "10% of what carbon-14 was when the animal died. Find the age "
             "of this sample.")


def test_carbon_dating_unitless_half_life_refused():
    _refused(model_carbon_dating,
             "The percentage of carbon-14 in a sample was 10% of what it "
             "was originally. Find the age if the half-life of carbon-14 "
             "is 5730.")


# ---- SECTION_FORMULA (row 4731) ----

def test_section_formula_ncert():
    # ((2*4 + 3*-1)/5, (2*-3 + 3*7)/5) = (1, 3)
    r = _check(model_section_formula,
               "Find the coordinates of the point which divides the join "
               "of (-1, 7) and (4, -3) in the ratio 2 : 3.",
               1.0, "SECTION_FORMULA")
    assert "(1, 3)" in r.final_answer


def test_section_formula_midpoint():
    # ratio 1:1 -> midpoint of (2,3) and (6,7) = (4, 5)
    _check(model_section_formula,
           "Find the coordinates of the point which divides the join of "
           "(2, 3) and (6, 7) in the ratio 1 : 1.",
           4.0, "SECTION_FORMULA")


def test_section_formula_external_refused():
    _refused(model_section_formula,
             "Find the coordinates of the point which divides the join of "
             "(-1, 7) and (4, -3) externally in the ratio 2 : 3.")


def test_section_formula_no_ratio_refused():
    _refused(model_section_formula,
             "Find the coordinates of the point which divides the join of "
             "(-1, 7) and (4, -3).")


# ---- CHORD_FROM_DISTANCE (row 43598) ----

def test_chord_from_distance_ncert():
    # 2 sqrt(7^2 - 6^2) = 2 sqrt(13)
    _check(model_chord_from_distance,
           "Find the length of the chord of a circle where the radius is "
           "7 cm and perpendicular distance is 6 cm.",
           2.0 * math.sqrt(13.0), "CHORD_FROM_DISTANCE", rel=1e-4)


def test_chord_from_distance_345():
    _check(model_chord_from_distance,
           "Find the length of the chord of a circle where the radius is "
           "5 cm and perpendicular distance is 3 cm.",
           8.0, "CHORD_FROM_DISTANCE")


def test_chord_distance_exceeds_radius_refused():
    _refused(model_chord_from_distance,
             "Find the length of the chord of a circle where the radius is "
             "3 cm and perpendicular distance is 6 cm.")


def test_chord_no_distance_refused():
    _refused(model_chord_from_distance,
             "Find the length of the chord of a circle where the radius is "
             "7 cm.")


# ---- TANGENT_QUADRILATERAL (row 17391) ----

def test_tangent_quadrilateral_find_sp():
    # PQ + RS = QR + SP -> 12 + 14 = 15 + SP -> SP = 11
    _check(model_tangent_quadrilateral,
           "A quadrilateral PQRS is drawn to circumscribe a circle. If "
           "PQ = 12 cm, QR = 15 cm and RS = 14 cm, then find the length "
           "of SP.",
           11.0, "TANGENT_QUADRILATERAL")


def test_tangent_quadrilateral_find_rs():
    # PQ + RS = QR + SP -> RS = 8 + 7 - 6 = 9
    _check(model_tangent_quadrilateral,
           "A quadrilateral PQRS is drawn to circumscribe a circle. If "
           "PQ = 6 cm, QR = 8 cm and SP = 7 cm, find RS.",
           9.0, "TANGENT_QUADRILATERAL")


def test_tangent_quadrilateral_all_sides_refused():
    _refused(model_tangent_quadrilateral,
             "A quadrilateral PQRS is drawn to circumscribe a circle. If "
             "PQ = 12 cm, QR = 15 cm, RS = 14 cm and SP = 11 cm, find the "
             "perimeter.")


def test_tangent_quadrilateral_negative_side_refused():
    _refused(model_tangent_quadrilateral,
             "A quadrilateral PQRS is drawn to circumscribe a circle. If "
             "PQ = 2 cm, QR = 15 cm and RS = 3 cm, find the length of SP.")


# ---- EQUILATERAL_ALTITUDE (row 37635) ----

def test_equilateral_altitude_side_8():
    # h = (sqrt3/2)*8 = 4 sqrt3 = 6.9282
    _check(model_equilateral_altitude,
           "What is the length of an altitude of an equilateral triangle "
           "of side 8cm?",
           4.0 * math.sqrt(3.0), "EQUILATERAL_ALTITUDE", rel=1e-4)


def test_equilateral_altitude_side_10():
    _check(model_equilateral_altitude,
           "Find the length of an altitude of an equilateral triangle of "
           "side 10 cm.",
           5.0 * math.sqrt(3.0), "EQUILATERAL_ALTITUDE", rel=1e-4)


def test_equilateral_altitude_isosceles_refused():
    _refused(model_equilateral_altitude,
             "What is the length of an altitude of an isosceles triangle "
             "of side 8cm?")


def test_equilateral_altitude_perimeter_refused():
    _refused(model_equilateral_altitude,
             "What is the length of an altitude of an equilateral triangle "
             "of perimeter 24 cm?")


# ---- BASIC_PROPORTIONALITY (row 17108) ----

def test_basic_proportionality_ncert():
    # AD=3, BD=4.5 -> AB=7.5; AC = 7.5*2/3 = 5 -> CE = 3
    _check(model_basic_proportionality,
           "In the triangle ABC, D and E are points on side AB and AC "
           "respectively such that DE II BC. If AE=2cm, AD=3cm and "
           "BD=4.5cm, then find CE.",
           3.0, "BASIC_PROPORTIONALITY")


def test_basic_proportionality_second_case():
    # AD=2, BD=4 -> AB=6; AC = 6*1.5/2 = 4.5 -> CE = 3
    _check(model_basic_proportionality,
           "In the triangle ABC, D and E are points on side AB and AC "
           "respectively such that DE II BC. If AE=1.5cm, AD=2cm and "
           "BD=4cm, then find CE.",
           3.0, "BASIC_PROPORTIONALITY")


def test_basic_proportionality_not_parallel_refused():
    _refused(model_basic_proportionality,
             "In the triangle ABC, D and E are points on side AB and AC "
             "respectively such that DE is not parallel to BC. If AE=2cm, "
             "AD=3cm and BD=4.5cm, then find CE.")


def test_basic_proportionality_missing_bd_refused():
    _refused(model_basic_proportionality,
             "In the triangle ABC, D and E are points on side AB and AC "
             "respectively such that DE II BC. If AE=2cm and AD=3cm, then "
             "find CE.")


# ---- AP_EQUAL_TERMS (row 6856) ----

def test_ap_equal_terms_ncert():
    # 63 + 2(n-1) = 3 + 7(n-1) -> n = 13
    _check(model_ap_equal_terms,
           "For what value of n, are the nth terms of two APs: 63, 65, "
           "67, . . . and 3, 10, 17, . . . equal?",
           13.0, "AP_EQUAL_TERMS")


def test_ap_equal_terms_second_case():
    # 7 + 6(n-1) = 79 - 3(n-1) -> 9(n-1) = 72 -> n = 9
    _check(model_ap_equal_terms,
           "For what value of n, are the nth terms of two APs: 7, 13, "
           "19, . . . and 79, 76, 73, . . . equal?",
           9.0, "AP_EQUAL_TERMS")


def test_ap_equal_terms_same_difference_refused():
    _refused(model_ap_equal_terms,
             "For what value of n, are the nth terms of two APs: 5, 10, "
             "15, . . . and 1, 6, 11, . . . equal?")


def test_ap_equal_terms_non_integral_refused():
    _refused(model_ap_equal_terms,
             "For what value of n, are the nth terms of two APs: 10, 8, "
             "6, . . . and 2, 5, 8, . . . equal?")


# ---- GEOMETRIC_DEPRECIATION (row 5333) ----

def test_geometric_depreciation_ncert():
    # 15625 * 0.8^5 = 5120
    _check(model_geometric_depreciation,
           "A manufacturer reckons that the value of a machine, which "
           "costs him Rs. 15625, will depreciate each year by 20%. Find "
           "the estimated value at the end of 5 years.",
           15625.0 * 0.8 ** 5, "GEOMETRIC_DEPRECIATION")


def test_geometric_depreciation_two_years():
    _check(model_geometric_depreciation,
           "The value of a machine, which costs Rs. 10,000, will "
           "depreciate each year by 10%. Find the value at the end of "
           "2 years.",
           8100.0, "GEOMETRIC_DEPRECIATION")


def test_geometric_depreciation_full_rate_refused():
    _refused(model_geometric_depreciation,
             "The value of a machine, which costs Rs. 10,000, will "
             "depreciate each year by 100%. Find the value at the end of "
             "2 years.")


def test_geometric_depreciation_no_horizon_refused():
    _refused(model_geometric_depreciation,
             "The value of a machine, which costs Rs. 10,000, will "
             "depreciate each year by 10%. Find the estimated value.")


# ---- DISCOUNT_MARKED (rows 43209, 6543) ----

def test_discount_find_marked_price():
    # paid = 80% of marked -> marked = 1600 / 0.8 = 2000
    _check(model_discount_marked,
           "Arun bought a pair of skates at a sale where the discount "
           "given was 20%. If the amount he pays is 1,600, find the "
           "marked price.",
           2000.0, "DISCOUNT_MARKED")


def test_discount_find_sale_prices():
    r = _check(model_discount_marked,
               "A shop gives 20% discount. What would the sale price of "
               "each of these be? (a) A dress marked at 120 (b) A pair of "
               "shoes marked at 750 (c) A bag marked at 250",
               96.0, "DISCOUNT_MARKED")
    assert "600" in r.final_answer and "200" in r.final_answer


def test_discount_full_discount_refused():
    _refused(model_discount_marked,
             "Arun bought a pair of skates at a sale where the discount "
             "given was 100%. If the amount he pays is 0, find the marked "
             "price.")


def test_discount_no_marked_ask_refused():
    _refused(model_discount_marked,
             "A shop gives 20% discount. The amount he pays is 1,600. "
             "Find the profit he makes.")


# ---- MEAN_VARIANCE_MISSING (row 7820) ----

def test_mean_variance_missing_ncert():
    # sum = 56, sum sq = 7*(16+64) = 560; given 42 and 460 -> x+y = 14,
    # x^2+y^2 = 100 -> xy = 48 -> 6 and 8
    r = _check(model_mean_variance_missing,
               "The mean and variance of 7 observations are 8 and 16, "
               "respectively. If five of the observations are 2, 4, 10, "
               "12, 14. Find the remaining two observations.",
               6.0, "MEAN_VARIANCE_MISSING")
    assert "8" in r.final_answer


def test_mean_variance_missing_irrational_pair():
    # n=5 mean=6 var=16: sum=30, sumsq=260; given 2,3,10 -> x+y=15,
    # x^2+y^2=147 -> xy=39 -> roots (15 +- sqrt(69))/2
    s, q = 15.0, 260.0 - (4.0 + 9.0 + 100.0)
    prod = (s * s - q) / 2.0
    want = (s - math.sqrt(s * s - 4.0 * prod)) / 2.0
    _check(model_mean_variance_missing,
           "The mean and variance of 5 observations are 6 and 16, "
           "respectively. If three of the observations are 2, 3, 10. Find "
           "the remaining two observations.",
           want, "MEAN_VARIANCE_MISSING", rel=1e-4)


def test_mean_variance_missing_count_mismatch_refused():
    _refused(model_mean_variance_missing,
             "The mean and variance of 7 observations are 8 and 16, "
             "respectively. If four of the observations are 2, 4, 10, "
             "12. Find the remaining two observations.")


def test_mean_variance_missing_inconsistent_refused():
    # given values make sum of squares of the rest negative -> refuse
    _refused(model_mean_variance_missing,
             "The mean and variance of 5 observations are 6 and 4, "
             "respectively. If three of the observations are 20, 24, 30. "
             "Find the remaining two observations.")




# ---- dispatcher ----

def test_dispatcher_reaches_families():
    # WS-B step 1: the maths families (THREE_DIGIT_MULTIPLES among them)
    # moved to maths_families -- the moved family serves via model_maths,
    # the dispatcher still reaches its surviving families.
    from backend.its.solver.maths_families import model_maths
    r = model_maths("How many three-digit numbers are divisible by 7?")
    assert r.matched and r.structure == "THREE_DIGIT_MULTIPLES"
    r2 = model_extra2("Convert 300 K to Celsius and Fahrenheit.")
    assert r2.matched and r2.structure == "KELVIN_CONVERT"


def test_dispatcher_garbage_refused():
    r = model_extra2("Tell me a joke about dice, lenses and tarpaulins.")
    assert not r.matched
    assert r.structure == "PHYSICS_FAMILIES"
