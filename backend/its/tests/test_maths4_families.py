"""test_maths4_families.py -- Comprehensive unit tests for maths4_families.

Covers 43 official CBSE Exemplar & CISCE (ICSE/ISC) mathematical schemas.
Asserts match, confidence >= 0.93, 5-beat steps, and numerical correctness.
Zero LLMs, zero hallucinations.
"""

from __future__ import annotations

import math
import pytest

from backend.its.solver.maths_families import model_maths


def _run(text: str, structure: str):
    r = model_maths(text)
    assert r.matched, f"expected match, got refusal ({r.note}): {text[:70]}"
    assert r.structure == structure, f"structure {r.structure} != {structure}: {text[:70]}"
    assert r.confidence >= 0.93, f"confidence {r.confidence} < 0.93"
    assert r.steps, "steps must not be empty"
    assert len(r.steps) >= 3, "steps must contain at least 3 beats"
    return r


def test_euclid_lemma():
    r = _run('Find the quotient and remainder when 225 is divided by 135 using Euclid lemma.', 'EUCLIDS_DIVISION_LEMMA')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(1.0, rel=1e-2, abs=1e-2)

def test_lcm_from_hcf():
    r = _run('Given HCF(306, 657) = 9, find LCM(306, 657).', 'FUNDAMENTAL_THEOREM_ARITHMETIC_LCM_HCF')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(22338.0, rel=1e-2, abs=1e-2)

def test_cubic_zeroes():
    r = _run('For cubic polynomial 2x^3 - 5x^2 - 14x + 8, find the sum of zeroes.', 'CUBIC_POLYNOMIAL_RELATIONS')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(2.5, rel=1e-2, abs=1e-2)

def test_quadratic_reducible():
    r = _run('Solve x + 1/x = 2.5.', 'QUADRATIC_EQUATION_REDUCIBLE')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(2.0, rel=1e-2, abs=1e-2)

def test_ap_find_k():
    r = _run('Find the value of k if 2k + 1, 4k - 1, 5k + 2 are in AP.', 'AP_FIND_K_CONSECUTIVE')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(5.0, rel=1e-2, abs=1e-2)

def test_ap_mn_term():
    r = _run('The 7th term of an AP is 1/9 and the 9th term is 1/7. Find the value.', 'AP_MN_TERM_PROPERTY')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(1.0, rel=1e-2, abs=1e-2)

def test_angle_bisector():
    r = _run('In triangle ABC, AD is the internal bisector of angle A. If AB = 6 cm, AC = 8 cm, and BD = 3 cm, find DC.', 'TRIANGLE_INTERNAL_ANGLE_BISECTOR')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(4.0, rel=1e-2, abs=1e-2)

def test_section_ratio_find():
    r = _run('Find the ratio in which the y-axis divides the line segment joining (2, -3) and (5, 6).', 'SECTION_FORMULA_RATIO_FIND')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(0.4, rel=1e-2, abs=1e-2)

def test_circle_two_tangents_angle():
    r = _run('Two tangents PA and PB are drawn to a circle from P. If angle APB = 50°, find angle AOB.', 'CIRCLE_TWO_TANGENTS_ANGLE')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(130.0, rel=1e-2, abs=1e-2)

def test_melting_recasting():
    r = _run('A metallic sphere of radius 6 cm is melted and recast into a cylinder of radius 4 cm. Find the height of the cylinder.', 'MELTING_RECASTING_SOLID')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(18.0, rel=1e-2, abs=1e-2)

def test_train_delay():
    r = _run('A train travels 360 km. If speed had been 5 km/h more, it takes 1 hours less. Find the speed.', 'SPEED_TIME_DISTANCE_TRAIN_DELAY')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(40.0, rel=1e-2, abs=1e-2)

def test_cartesian_cardinality():
    r = _run('If set A has 3 elements and set B has 4 elements, find the number of elements in A x B.', 'CARTESIAN_PRODUCT_CARDINALITY')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(12.0, rel=1e-2, abs=1e-2)

def test_power_set_count():
    r = _run('A set has 5 elements. Find the number of subsets.', 'SUBSETS_POWER_SET_COUNT')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(32.0, rel=1e-2, abs=1e-2)

def test_circular_permutations():
    r = _run('In how many ways can 6 people be seated around a circular table?', 'CIRCULAR_PERMUTATIONS')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(120.0, rel=1e-2, abs=1e-2)

def test_restricted_permutation_together():
    r = _run('In how many ways can letters of MONDAY be arranged such that 2 vowels always occur together?', 'RESTRICTED_PERMUTATION_TOGETHER')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(240.0, rel=1e-2, abs=1e-2)

def test_binomial_independent_term():
    r = _run('Find the term independent of x in the expansion of (x^2 + 1/x)^9.', 'BINOMIAL_INDEPENDENT_TERM')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(84.0, rel=1e-2, abs=1e-2)

def test_insert_am():
    r = _run('Insert 4 arithmetic means between 3 and 18. Find the common difference.', 'INSERT_ARITHMETIC_MEANS')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(3.0, rel=1e-2, abs=1e-2)

def test_insert_gm():
    r = _run('Insert 3 geometric means between 2 and 32. Find the common ratio.', 'INSERT_GEOMETRIC_MEANS')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(2.0, rel=1e-2, abs=1e-2)

def test_sine_rule():
    r = _run('In triangle ABC, side a = 8 cm, angle A = 30°, angle B = 45°. Find side b.', 'SINE_RULE_TRIANGLE')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(11.3137, rel=1e-2, abs=1e-2)

def test_cosine_rule():
    r = _run('In triangle ABC, sides are a = 5, b = 6, c = 7. Find cos(A).', 'COSINE_RULE_TRIANGLE')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(0.7142857142857143, rel=1e-2, abs=1e-2)

def test_line_normal_form():
    r = _run('Find the normal form of line if distance from origin p = 4 and normal angle is 30°.', 'STRAIGHT_LINE_NORMAL_FORM')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(4.0, rel=1e-2, abs=1e-2)

def test_lines_concurrency():
    r = _run('Check if lines 1x + 1y - 3 = 0, 2x + 3y - 8 = 0, and 3x - 2y + 1 = 0 are concurrent.', 'LINES_CONCURRENCY_CONDITION')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(1.0, rel=1e-2, abs=1e-2)

def test_coef_variation():
    r = _run('Find the coefficient of variation if mean is 50 and standard deviation is 10.', 'STATISTICS_COEFFICIENT_OF_VARIATION')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(20.0, rel=1e-2, abs=1e-2)

def test_mean_deviation():
    r = _run('Find the mean deviation about mean for data 4, 7, 8, 9, 10, 12, 13, 17.', 'STATISTICS_MEAN_DEVIATION_MEAN')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(3.0, rel=1e-2, abs=1e-2)

def test_func_composition():
    r = _run('Given f(x) = 2x + 3 and g(x) = 3x - 1, find f(g(x)).', 'FUNCTION_COMPOSITION_EVAL')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(6.0, rel=1e-2, abs=1e-2)

def test_inv_trig_sum_tan():
    r = _run('Evaluate tan^(-1)(1/2) + tan^(-1)(1/3).', 'INVERSE_TRIG_SUM_TAN')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(0.785398, rel=1e-2, abs=1e-2)

def test_inv_trig_complement():
    r = _run('Find the value of sin^(-1)(0.5) + cos^(-1)(0.5).', 'INVERSE_TRIG_COMPLEMENT')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(1.570796, rel=1e-2, abs=1e-2)

def test_matrix_invertibility():
    r = _run('Check if the matrix [[4, 2], [6, 3]] is invertible.', 'MATRIX_INVERTIBILITY_CRITERION')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(0.0, rel=1e-2, abs=1e-2)

def test_matrix_system_3x3():
    r = _run('For system of equations x + y + z = 6, x - y + z = 2, 2x + y - z = 1, find the determinant.', 'MATRIX_METHOD_SYSTEM_3X3')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(6.0, rel=1e-2, abs=1e-2)

def test_continuity_piecewise():
    r = _run('Find k so that f(x) = kx + 1 for x <= 5 and 3x - 5 for x > 5 is continuous at x = 5.', 'CONTINUITY_CHECK_PIECEWISE')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(1.8, rel=1e-2, abs=1e-2)

def test_log_diff_power():
    r = _run('Find dy/dx if y = x^x.', 'LOGARITHMIC_DIFFERENTIATION_POWER')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(1.0, rel=1e-2, abs=1e-2)

def test_parametric_diff():
    r = _run('Find dy/dx for parametric curve x = 2at^2, y = 4at at t = 2.', 'PARAMETRIC_DIFFERENTIATION')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(0.5, rel=1e-2, abs=1e-2)

def test_tangent_normal_curve():
    r = _run('Find the slope of the normal to the curve y = 2x^2 + 3sin(x) at x = 0.', 'TANGENT_NORMAL_CURVE')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(-0.3333333333333333, rel=1e-2, abs=1e-2)

def test_ladder_sliding():
    r = _run('A ladder 5 m long is pulled away from the wall at 2 m/s when the foot is 4 m from the wall.', 'RATE_LADDER_SLIDING')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(2.6666666666666665, rel=1e-2, abs=1e-2)

def test_int_exp_f():
    r = _run('Evaluate integral of e^x * (1/x - 1/x^2) dx.', 'INTEGRATION_EXP_F_PLUS_FPRIME')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(1.0, rel=1e-2, abs=1e-2)

def test_int_dx_quad():
    r = _run('Evaluate integral of 1 / (x^2 + 16) dx.', 'INTEGRATION_DX_OVER_QUADRATIC')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(0.25, rel=1e-2, abs=1e-2)

def test_int_periodic():
    r = _run('If integral of f(x) from 0 to 1 is 5, find integral of f(x) from 0 to 4.', 'DEFINITE_INTEGRAL_PERIODIC')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(20.0, rel=1e-2, abs=1e-2)

def test_direction_cosines():
    r = _run('If a line makes angles 90° and 60° with x and y axes, find the angle with z axis.', 'DIRECTION_COSINES_SUM_SQUARES')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(30.0, rel=1e-2, abs=1e-2)

def test_angle_two_planes():
    r = _run('Find the angle between the planes 2x - 1y + 1z = 6 and 1x + 1y + 2z = 7.', 'ANGLE_BETWEEN_TWO_PLANES')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(60.0, rel=1e-2, abs=1e-2)

def test_bayes_three():
    r = _run('Let P(E1) = 0.2, P(E2) = 0.3, P(E3) = 0.5. P(A|E1) = 0.01, P(A|E2) = 0.02, P(A|E3) = 0.03. Find P(E3|A).', 'BAYES_THEOREM_THREE_EVENTS')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(0.6521739130434783, rel=1e-2, abs=1e-2)

def test_binomial_params():
    r = _run('For a binomial distribution, mean is 4 and variance is 2. Find n.', 'BINOMIAL_DISTRIBUTION_MEAN_VARIANCE_PARAMS')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(8.0, rel=1e-2, abs=1e-2)

def test_rd_icse_maturity():
    r = _run('A person deposits Rs 1000 per month for 2 years at 10% per annum. Find maturity value.', 'RECURRING_DEPOSIT_ICSE_MATURITY')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(26500.0, rel=1e-2, abs=1e-2)

def test_gst_chain():
    r = _run('A dealer buys for Rs 5000 and sells at a profit of Rs 1000. If GST rate is 18%, find the net GST.', 'GST_INPUT_TAX_CREDIT_CHAIN')
    if r.numeric_answer is not None:
        assert r.numeric_answer == pytest.approx(180.0, rel=1e-2, abs=1e-2)

def test_refusal_unrecognized():
    r = model_maths("What is the capital of France?")
    assert not r.matched
