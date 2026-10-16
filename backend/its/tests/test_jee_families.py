"""Unit tests for canonical JEE Main & Advanced entrance mathematics families."""

import math
import pytest
from backend.its.solver.maths_families import model_maths, _dispatch_jee as model_jee_table
from backend.its.solver.modeling_layer import model_problem


def _run(text: str, expected_family: str, dispatcher=model_maths):
    r = dispatcher(text)
    assert r.matched, f"Expected {expected_family} to match, got note: {r.note}"
    assert r.structure == expected_family
    assert r.confidence >= 0.93
    assert len(r.steps) >= 3
    assert any("Method:" in s for s in r.steps)
    assert any("Verification:" in s for s in r.steps)
    assert any("Interpretation:" in s for s in r.steps)
    return r


# 1. JEE_LHOPITAL_TRIG_ZERO
def test_jee_lhopital_trig_zero():
    r = _run("Evaluate the limit as x approaches 0 of (1 - cos(4x)) / x^2.", "JEE_LHOPITAL_TRIG_ZERO")
    assert r.numeric_answer == pytest.approx(8.0, rel=1e-2, abs=1e-2)


# 2. JEE_LIMIT_POWER_ONE_INF
def test_jee_limit_power_one_inf():
    r = _run("Evaluate the limit as x approaches 0 of (1 + 3x)^(2/x).", "JEE_LIMIT_POWER_ONE_INF")
    assert r.numeric_answer == pytest.approx(math.exp(6.0), rel=1e-2, abs=1e-2)


# 3. JEE_INTEGRAL_LIMIT_SUM
def test_jee_integral_limit_sum():
    r = _run("Evaluate the limit as n approaches infinity of sum from r=1 to n of r^3 / n^4.", "JEE_INTEGRAL_LIMIT_SUM")
    assert r.numeric_answer == pytest.approx(0.25, rel=1e-2, abs=1e-2)


# 4. JEE_LEIBNIZ_INTEGRAL_RULE
def test_jee_leibniz_integral_rule():
    r = _run("Find the derivative with respect to x of integral from 0 to x^2 of sqrt(t) dt at x = 3.", "JEE_LEIBNIZ_INTEGRAL_RULE")
    assert r.numeric_answer == pytest.approx(18.0, rel=1e-2, abs=1e-2)


# 5. JEE_DIFFEQ_INTEGRATING_FACTOR
def test_jee_diffeq_integrating_factor():
    r = _run("Find the integrating factor for the differential equation dy/dx + (3/x)y = x^2.", "JEE_DIFFEQ_INTEGRATING_FACTOR")
    assert r.final_answer == "x^3"


# 6. JEE_TANGENT_SUBTANGENT_SUBNORMAL
def test_jee_subtangent():
    r = _run("Find the length of the subtangent to the curve at point (2, 4) if the slope is 2.", "JEE_TANGENT_SUBTANGENT_SUBNORMAL")
    assert r.numeric_answer == pytest.approx(2.0, rel=1e-2, abs=1e-2)


# 7. JEE_COMMON_ROOT_TWO_QUADRATICS
def test_jee_common_root_quadratics():
    r = _run("Find the common root of equations x^2 - 5x + 6 = 0 and x^2 - 7x + 12 = 0.", "JEE_COMMON_ROOT_TWO_QUADRATICS")
    assert r.numeric_answer == pytest.approx(3.0, rel=1e-2, abs=1e-2)


# 8. JEE_ROOTS_OF_UNITY_OMEGA
def test_jee_roots_of_unity_omega():
    r = _run("Evaluate the expression (1 + omega)^6 where omega is a complex cube root of unity.", "JEE_ROOTS_OF_UNITY_OMEGA")
    assert r.numeric_answer == pytest.approx(1.0, rel=1e-2, abs=1e-2)


# 9. JEE_COMPLEX_LOCUS_CIRCLE
def test_jee_complex_locus_circle():
    r = _run("Find the radius of the Apollonius circle represented by |z - 1| / |z - 4| = 2.", "JEE_COMPLEX_LOCUS_CIRCLE")
    assert r.numeric_answer == pytest.approx(2.0, rel=1e-2, abs=1e-2)


# 10. JEE_COMPLEX_ARGUMENT_PRODUCT
def test_jee_complex_argument_product():
    r = _run("If arg(z1) = 45 degrees and arg(z2) = 30 degrees, find arg(z1 * z2).", "JEE_COMPLEX_ARGUMENT_PRODUCT")
    assert r.numeric_answer == pytest.approx(75.0, rel=1e-2, abs=1e-2)


# 11. JEE_MATRIX_ADJOINT_DETERMINANT_N
def test_jee_matrix_adjoint_det_n():
    r = _run("If A is a 3x3 matrix with determinant 4, find the determinant of adj(A).", "JEE_MATRIX_ADJOINT_DETERMINANT_N")
    assert r.numeric_answer == pytest.approx(16.0, rel=1e-2, abs=1e-2)


# 12. JEE_MATRIX_TRACE_PROPERTIES
def test_jee_matrix_trace():
    r = _run("Find the trace of matrix [[2, 1, 0], [4, 5, 6], [1, 2, 3]].", "JEE_MATRIX_TRACE_PROPERTIES")
    assert r.numeric_answer == pytest.approx(10.0, rel=1e-2, abs=1e-2)


# 13. JEE_BINOMIAL_MULTINOMIAL_COEFFICIENT
def test_jee_multinomial_coeff():
    r = _run("Find the coefficient of x^2 y^3 z^1 in the expansion of (x + y + z)^6.", "JEE_BINOMIAL_MULTINOMIAL_COEFFICIENT")
    assert r.numeric_answer == pytest.approx(60.0, rel=1e-2, abs=1e-2)


# 14. JEE_SERIES_AGP_INFINITE
def test_jee_agp_infinite():
    r = _run("Find the sum of infinite AGP with a = 1, d = 1, r = 1/3.", "JEE_SERIES_AGP_INFINITE")
    assert r.numeric_answer == pytest.approx(2.25, rel=1e-2, abs=1e-2)


# 15. JEE_NEWTON_SUMS_POLYNOMIAL
def test_jee_newton_sums():
    r = _run("For equation x^2 - 6x - 2 = 0 with roots alpha and beta, find (S10 - 2*S8) / (2*S9).", "JEE_NEWTON_SUMS_POLYNOMIAL")
    assert r.numeric_answer == pytest.approx(3.0, rel=1e-2, abs=1e-2)


# 16. JEE_ORTHOCENTER_EULER_LINE
def test_jee_orthocenter_euler_line():
    r = _run("Find the orthocenter H if the circumcenter is O(1, 2) and centroid is G(3, 4).", "JEE_ORTHOCENTER_EULER_LINE")
    assert r.numeric_answer == pytest.approx(7.0, rel=1e-2, abs=1e-2)
    assert r.final_answer == "(7, 8)"


# 17. JEE_CIRCUMCENTER_RIGHT_TRIANGLE
def test_jee_circumradius_right_triangle():
    r = _run("Find the circumradius of a right triangle with hypotenuse of length 10 cm.", "JEE_CIRCUMCENTER_RIGHT_TRIANGLE")
    assert r.numeric_answer == pytest.approx(5.0, rel=1e-2, abs=1e-2)


# 18. JEE_CHORD_OF_CONTACT_CIRCLE
def test_jee_chord_of_contact_circle():
    r = _run("Find the length of chord of contact drawn from point (5, 0) to circle x^2 + y^2 = 9.", "JEE_CHORD_OF_CONTACT_CIRCLE")
    assert r.numeric_answer == pytest.approx(4.8, rel=1e-2, abs=1e-2)


# 19. JEE_COMMON_TANGENT_CIRCLES_LENGTH
def test_jee_common_tangents_length():
    r = _run("Find the length of the direct common tangent to two circles with radii 8 cm and 3 cm and distance between centers 13.", "JEE_COMMON_TANGENT_CIRCLES_LENGTH")
    assert r.numeric_answer == pytest.approx(12.0, rel=1e-2, abs=1e-2)


# 20. JEE_PARABOLA_FOCAL_CHORD_LENGTH
def test_jee_parabola_focal_chord():
    r = _run("Find the length of focal chord of parabola y^2 = 16x with parameter t = 2.", "JEE_PARABOLA_FOCAL_CHORD_LENGTH")
    assert r.numeric_answer == pytest.approx(25.0, rel=1e-2, abs=1e-2)


# 21. JEE_PARABOLA_SUBTANGENT_BISECTED
def test_jee_parabola_subtangent():
    r = _run("Find the subtangent for parabola y^2 = 8x at point (2, 4).", "JEE_PARABOLA_SUBTANGENT_BISECTED")
    assert r.numeric_answer == pytest.approx(4.0, rel=1e-2, abs=1e-2)


# 22. JEE_ELLIPSE_AUXILIARY_CIRCLE
def test_jee_ellipse_auxiliary_circle():
    r = _run("Find the area of the auxiliary circle of ellipse x^2 / 25 + y^2 / 16 = 1.", "JEE_ELLIPSE_AUXILIARY_CIRCLE")
    assert r.numeric_answer == pytest.approx(25.0 * math.pi, rel=1e-2, abs=1e-2)


# 23. JEE_RECTANGULAR_HYPERBOLA_ECCENTRICITY
def test_jee_rectangular_hyperbola_eccentricity():
    # JEE table pin -- the maths3 block precedes JEE in the global
    # order and wins equal-confidence ties (pre-merge registration
    # order unchanged; WS-B step 1)
    r = _run("Find the eccentricity of the rectangular hyperbola xy = 16.", "JEE_RECTANGULAR_HYPERBOLA_ECCENTRICITY",
             model_jee_table)
    assert r.numeric_answer == pytest.approx(math.sqrt(2.0), rel=1e-2, abs=1e-2)


# 24. JEE_VECTOR_TRIPLE_PRODUCT_EXPANSION
def test_jee_vector_triple_product():
    r = _run("Find the vector triple product a x (b x c).", "JEE_VECTOR_TRIPLE_PRODUCT_EXPANSION")
    assert r.final_answer == "(a . c) b - (a . b) c"


# 25. JEE_DISTANCE_POINT_TO_LINE_3D
def test_jee_distance_point_line_3d():
    r = _run("Find distance from origin to line (x - 1)/2 = (y - 2)/3 = (z - 3)/6.", "JEE_DISTANCE_POINT_TO_LINE_3D")
    expected = math.sqrt(10.0) / 7.0
    assert r.numeric_answer == pytest.approx(expected, rel=1e-2, abs=1e-2)


# 26. JEE_COPLANAR_FOUR_POINTS_3D
def test_jee_coplanar_four_points():
    r = _run("Check if points (0, 0, 0), (1, 0, 0), (0, 1, 0), and (1, 1, 0) are coplanar.", "JEE_COPLANAR_FOUR_POINTS_3D")
    assert r.numeric_answer == pytest.approx(1.0, rel=1e-2, abs=1e-2)


# 27. JEE_DERANGEMENTS_COUNT
def test_jee_derangements():
    r = _run("Find the number of derangements of 4 items.", "JEE_DERANGEMENTS_COUNT")
    assert r.numeric_answer == pytest.approx(9.0, rel=1e-2, abs=1e-2)


# 28. JEE_TOTAL_PROBABILITY_LAW
def test_jee_total_probability_law():
    r = _run("Find total probability P(A) if P(E1) = 0.6, P(E2) = 0.4, P(A|E1) = 0.05, and P(A|E2) = 0.10.", "JEE_TOTAL_PROBABILITY_LAW")
    assert r.numeric_answer == pytest.approx(0.07, rel=1e-2, abs=1e-2)


# 29. JEE_TRIGONOMETRIC_PRODUCT_COS
def test_jee_trig_product_cos():
    r = _run("Evaluate cos(20°) * cos(40°) * cos(80°).", "JEE_TRIGONOMETRIC_PRODUCT_COS")
    assert r.numeric_answer == pytest.approx(0.125, rel=1e-2, abs=1e-2)


# 30. JEE_LOGARITHMIC_INEQUALITY_BASE
def test_jee_log_inequality_base():
    r = _run("Solve the inequality log_2(x) > 3.", "JEE_LOGARITHMIC_INEQUALITY_BASE")
    assert r.numeric_answer == pytest.approx(8.0, rel=1e-2, abs=1e-2)


# 31. End-to-end model_problem dispatch test
def test_jee_model_problem_dispatch():
    r = model_problem("Evaluate the limit as x approaches 0 of (1 - cos(4x)) / x^2.")
    assert r.matched
    assert r.structure == "JEE_LHOPITAL_TRIG_ZERO"
    assert r.numeric_answer == pytest.approx(8.0, rel=1e-2, abs=1e-2)


# 32. Refusal test for unrecognized text
def test_refusal_unrecognized():
    r = model_maths("A completely arbitrary non-mathematical sentence that should not match anything.")
    assert not r.matched
    assert r.confidence == 0.0
