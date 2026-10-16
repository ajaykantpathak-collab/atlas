"""test_maths2_families.py -- one battery per maths2 family (classes 9-12).

Every family in maths2_families.py gets a representative board-style
question with a verified expected answer, plus plausibility-gate
refusals.  Run:

    pytest backend/its/tests/test_maths2_families.py -q
"""

from __future__ import annotations

import math

import pytest

from backend.its.solver.maths_families import model_maths, _dispatch_m2 as model_maths2_table


def _run(text: str, structure: str, dispatcher=model_maths):
    r = dispatcher(text)
    assert r.matched, f"expected match, got refusal ({r.note}): {text[:70]}"
    assert r.structure == structure, \
        f"structure {r.structure} != {structure}: {text[:70]}"
    assert r.confidence >= 0.93, f"confidence {r.confidence} < 0.93"
    assert r.numeric_answer is not None, "numeric_answer must be a float"
    assert isinstance(r.final_answer, str) and r.final_answer
    assert r.governing_equation
    assert r.steps, "steps must explain formula + substitution"
    return r


def _refused(text: str):
    r = model_maths(text)
    assert not r.matched, f"expected refusal but matched: {text[:70]}"
    return r


# --------------------------------------------------------------------------- #
# 1-2. MEDIAN / MODE
# --------------------------------------------------------------------------- #


def test_median_odd_count():
    r = _run("Find the median of 4, 7, 2, 9, 5.", "MEDIAN")
    assert r.numeric_answer == pytest.approx(5.0)
    assert any("2, 4, 5, 7, 9" in s for s in r.steps)


def test_median_even_count_averages_two_middle():
    r = _run("Find the median of 1, 2, 3, 4.", "MEDIAN")
    assert r.numeric_answer == pytest.approx(2.5)
    assert any("average" in s for s in r.steps)


def test_mode_most_frequent():
    r = _run("Find the mode of 2, 3, 3, 5, 7, 3, 3.", "MODE")
    assert r.numeric_answer == pytest.approx(3.0)
    assert r.quantities["frequency"] == 4.0


def test_mode_refused_when_no_repeat():
    _refused("Find the mode of 1, 2, 3, 4.")


# --------------------------------------------------------------------------- #
# 3. MEAN_GROUPED
# --------------------------------------------------------------------------- #


def test_mean_grouped_sum_fx_over_sum_f():
    r = _run("Find the mean of the following frequency distribution: "
             "x=2,3,4, f=5,8,7", "MEAN_GROUPED")
    # sum fx = 10 + 24 + 28 = 62, sum f = 20 -> 3.1
    assert r.numeric_answer == pytest.approx(3.1)
    assert r.quantities["sum_fx"] == pytest.approx(62.0)
    assert r.quantities["sum_f"] == pytest.approx(20.0)


# --------------------------------------------------------------------------- #
# 4. TRIG_IDENTITY_EVAL
# --------------------------------------------------------------------------- #


def test_trig_identity_sin2_plus_cos2_is_one():
    r = _run("Evaluate sin^2(30) + cos^2(30)", "TRIG_IDENTITY_EVAL")
    assert r.numeric_answer == pytest.approx(1.0)


def test_trig_identity_unicode_superscripts():
    # exercises the superscript normalization: sin²30° + cos²30°
    # (pinned on the M2 table itself: globally the syllabus trig_eval row
    # owns "evaluate ... sin/cos/tan" asks at 0.97 > 0.95 -- unchanged
    # from the pre-merge global sweep; WS-B step 1)
    r = _run("Evaluate sin²30° + cos²30°", "TRIG_IDENTITY_EVAL",
             model_maths2_table)
    assert r.numeric_answer == pytest.approx(1.0)


def test_trig_identity_one_plus_tan2_is_sec2():
    # 1 + tan²45° = sec²45° = 2  (M2 table pin -- see note above)
    r = _run("Evaluate 1 + tan²45°", "TRIG_IDENTITY_EVAL",
             model_maths2_table)
    assert r.numeric_answer == pytest.approx(2.0)


def test_trig_identity_refuses_nonstandard_angle():
    _refused("Evaluate 1 + tan^2(50)")


# --------------------------------------------------------------------------- #
# 5. SECTION_FORMULA
# --------------------------------------------------------------------------- #


def test_section_formula_internal_division():
    r = _run("Find the coordinates of the point which divides the line "
             "joining (2,3) and (4,5) internally in the ratio 1:2",
             "SECTION_FORMULA")
    # ((1*4 + 2*2)/3, (1*5 + 2*3)/3) = (8/3, 11/3)
    assert r.quantities["px"] == pytest.approx(8.0 / 3.0)
    assert r.quantities["py"] == pytest.approx(11.0 / 3.0)
    assert "2.66667" in r.final_answer and "3.66667" in r.final_answer


def test_section_formula_external_division():
    r = _run("Find the point that divides the line joining (2,3) and (4,5) "
             "externally in the ratio 1:2", "SECTION_FORMULA_EXTERNAL")
    assert r.quantities["px"] == pytest.approx(0.0)
    assert r.quantities["py"] == pytest.approx(1.0)


# --------------------------------------------------------------------------- #
# 6. AREA_TRIANGLE_COORDS
# --------------------------------------------------------------------------- #


def test_area_triangle_shoelace():
    r = _run("Find the area of the triangle with vertices (0,0), (4,0), "
             "(0,3).", "AREA_TRIANGLE_COORDS")
    assert r.numeric_answer == pytest.approx(6.0)


def test_area_triangle_refuses_collinear_points():
    _refused("Find the area of the triangle with vertices (0,0), (1,1), "
             "(2,2).")


# --------------------------------------------------------------------------- #
# 7. SLOPE_TWO_POINTS
# --------------------------------------------------------------------------- #


def test_slope_two_points():
    r = _run("Find the slope of the line joining (1,2) and (3,6).",
             "SLOPE_TWO_POINTS")
    assert r.numeric_answer == pytest.approx(2.0)


def test_slope_refuses_vertical_line():
    _refused("Find the slope of the line joining (2,1) and (2,5).")


# --------------------------------------------------------------------------- #
# 8. LIMIT_STANDARD
# --------------------------------------------------------------------------- #


def test_limit_sin_x_over_x():
    r = _run("Find lim(x→0) sin(x)/x", "LIMIT_STANDARD")
    assert r.numeric_answer == pytest.approx(1.0)


def test_limit_1_minus_cos_over_x_squared():
    r = _run("Find lim(x→0) (1-cos(x))/x²", "LIMIT_STANDARD")
    assert r.numeric_answer == pytest.approx(0.5)


def test_limit_tan_with_coefficient_ascii_arrow():
    r = _run("Find lim(x->0) tan(3x)/x", "LIMIT_STANDARD")
    assert r.numeric_answer == pytest.approx(3.0)


# --------------------------------------------------------------------------- #
# 9. PROBABILITY_CONDITIONAL
# --------------------------------------------------------------------------- #


def test_probability_conditional_bayes_case_analysis():
    r = _run("A bag contains 5 red and 3 blue balls. Two balls are drawn "
             "one by one without replacement. Given that the second ball "
             "is red, what is the probability that the first was also red?",
             "PROBABILITY_CONDITIONAL")
    # P = (5-1)/(8-1) = 4/7
    assert r.numeric_answer == pytest.approx(4.0 / 7.0)
    assert "4/7" in r.final_answer


# --------------------------------------------------------------------------- #
# 10. PROBABILITY_DEPENDENT
# --------------------------------------------------------------------------- #


def test_probability_dependent_both_red():
    r = _run("A bag has 5 red and 3 blue balls. Two balls are drawn without "
             "replacement. Find P(both red).", "PROBABILITY_DEPENDENT")
    # (5/8) x (4/7) = 20/56 = 5/14
    assert r.numeric_answer == pytest.approx(20.0 / 56.0)
    assert "5/14" in r.final_answer


def test_probability_dependent_both_blue_worded():
    r = _run("A bag contains 3 blue and 5 red balls. Two balls are drawn "
             "without replacement. Find the probability that both are blue.",
             "PROBABILITY_DEPENDENT")
    assert r.numeric_answer == pytest.approx(3.0 / 8.0 * 2.0 / 7.0)


# --------------------------------------------------------------------------- #
# 11. BINOMIAL_COEFFICIENT
# --------------------------------------------------------------------------- #


def test_binomial_coefficient():
    r = _run("Find the coefficient of x³ in the expansion of (x+2)^5.",
             "BINOMIAL_COEFFICIENT")
    # C(5,3) x 2^2 = 10 x 4 = 40
    assert r.numeric_answer == pytest.approx(40.0)
    assert any("C(5, 3)" in s for s in r.steps)


def test_binomial_coefficient_refuses_k_greater_than_n():
    _refused("Find the coefficient of x^7 in the expansion of (x+2)^5.")


# --------------------------------------------------------------------------- #
# 12. MATRIX_MULTIPLY_2X2
# --------------------------------------------------------------------------- #


def test_matrix_multiply_2x2():
    r = _run("Multiply matrix [[1,2],[3,4]] by [[5,6],[7,8]].",
             "MATRIX_MULTIPLY_2X2")
    assert "[[19, 22], [43, 50]]" in r.final_answer
    assert r.numeric_answer == pytest.approx(134.0)  # entry sum


# --------------------------------------------------------------------------- #
# 13. MATRIX_TRANSPOSE
# --------------------------------------------------------------------------- #


def test_matrix_transpose():
    r = _run("Find the transpose of the matrix [[1,2],[3,4]].",
             "MATRIX_TRANSPOSE")
    assert "[[1, 3], [2, 4]]" in r.final_answer
    assert r.numeric_answer == pytest.approx(10.0)


# --------------------------------------------------------------------------- #
# 14-15. SUM_SQUARES / SUM_CUBES
# --------------------------------------------------------------------------- #


def test_sum_squares_formula():
    r = _run("Find the sum of squares of first 5 natural numbers.",
             "SUM_SQUARES")
    assert r.numeric_answer == pytest.approx(55.0)  # 5x6x11/6


def test_sum_cubes_formula():
    r = _run("Find the sum of cubes of first 4 natural numbers.",
             "SUM_CUBES")
    assert r.numeric_answer == pytest.approx(100.0)  # (4x5/2)^2


# --------------------------------------------------------------------------- #
# 16. HARMONIC_MEAN
# --------------------------------------------------------------------------- #


def test_harmonic_mean_two_numbers():
    # M2 table pin -- the syllabus mean_list row owns "mean of" asks
    # globally at 0.97 (pre-merge order unchanged)
    r = _run("Find the harmonic mean of 2 and 4.", "HARMONIC_MEAN",
             model_maths2_table)
    assert r.numeric_answer == pytest.approx(8.0 / 3.0)  # 2x2x4/(2+4)


# --------------------------------------------------------------------------- #
# 17. VECTOR_CROSS_PRODUCT
# --------------------------------------------------------------------------- #


def test_vector_cross_product():
    r = _run("Find the cross product of vectors 2i+3j+4k and 5i+6j+7k.",
             "VECTOR_CROSS_PRODUCT")
    assert r.quantities["cx"] == pytest.approx(-3.0)
    assert r.quantities["cy"] == pytest.approx(6.0)
    assert r.quantities["cz"] == pytest.approx(-3.0)
    assert r.numeric_answer == pytest.approx(math.sqrt(54.0))
    assert "(-3)i + (6)j + (-3)k" in r.final_answer


# --------------------------------------------------------------------------- #
# 18. LINE_EQ_SLOPE_INTERCEPT
# --------------------------------------------------------------------------- #


def test_line_slope_intercept():
    r = _run("Find the slope and y-intercept of the line 2x+3y=12.",
             "LINE_EQ_SLOPE_INTERCEPT")
    assert r.quantities["slope"] == pytest.approx(-2.0 / 3.0)
    assert r.quantities["y_intercept"] == pytest.approx(4.0)
    assert "4" in r.final_answer and "-2/3" in r.final_answer


# --------------------------------------------------------------------------- #
# 19. COMPOUND_ANGLES
# --------------------------------------------------------------------------- #


def test_compound_angles_sin_sum():
    r = _run("Find the value of sin(30°)cos(60°)+cos(30°)sin(60°).",
             "COMPOUND_ANGLES")
    assert r.numeric_answer == pytest.approx(1.0)  # sin(90)


def test_compound_angles_cos_diff():
    r = _run("Evaluate cos(60°)cos(30°) + sin(60°)sin(30°).",
             "COMPOUND_ANGLES")
    assert r.numeric_answer == pytest.approx(math.sqrt(3.0) / 2.0)  # cos(30)


# --------------------------------------------------------------------------- #
# 20. DISTANCE_POINT_LINE
# --------------------------------------------------------------------------- #


def test_distance_point_line():
    r = _run("Find the distance from point (3,4) to the line 2x+3y=6.",
             "DISTANCE_POINT_LINE")
    # |2x3 + 3x4 - 6| / sqrt(4+9) = 12/sqrt(13)
    assert r.numeric_answer == pytest.approx(12.0 / math.sqrt(13.0))


# --------------------------------------------------------------------------- #
# dispatcher behaviour
# --------------------------------------------------------------------------- #


def test_dispatcher_refuses_unrecognized_text():
    r = model_maths("What is the capital of France?")
    assert not r.matched
    assert r.structure == "MATHS"
    assert r.confidence == 0.0
