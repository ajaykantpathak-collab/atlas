"""test_applied_maths.py -- classes 11-12 Applied Mathematics batteries.

One representative board-style question per family in
applied_maths_families.py, plus gate tests (singular matrix, invalid
probability, reversed interval).  Deterministic: calls the dispatcher
directly, no LLM.

    cd /d/platform && python -m pytest backend/its/tests/test_applied_maths.py -q
"""

from __future__ import annotations

import math

import pytest

from backend.its.solver.applied_maths_families import model_applied_maths


def _match(text: str, structure: str):
    r = model_applied_maths(text)
    assert r.matched, f"not matched: {text!r} ({r.note})"
    assert r.structure == structure, \
        f"got {r.structure}, want {structure}: {text!r}"
    assert r.confidence >= 0.93, r.confidence
    assert r.steps, "family must show its steps"
    return r


def _no_match(text: str):
    r = model_applied_maths(text)
    assert not r.matched, f"unexpectedly matched: {text!r} -> {r.final_answer}"


# --------------------------------------------------------------------------- #
# 1-2 logs
# --------------------------------------------------------------------------- #

def test_log_solve():
    r = _match("Solve log x = 3.", "LOG_SOLVE")
    assert r.numeric_answer == pytest.approx(1000.0)


def test_log_solve_find_x_if():
    r = _match("Find x if log(x) = 3.", "LOG_SOLVE")
    assert r.numeric_answer == pytest.approx(1000.0)


def test_log_properties_product():
    r = _match("Evaluate log 8 + log 2.", "LOG_PROPERTIES")
    assert r.numeric_answer == pytest.approx(math.log10(16))
    assert "log 16" in " ".join(r.steps)


def test_log_properties_quotient():
    r = _match("Evaluate log 100 - log 10.", "LOG_PROPERTIES")
    assert r.numeric_answer == pytest.approx(math.log10(10))


# --------------------------------------------------------------------------- #
# 3-5 matrices
# --------------------------------------------------------------------------- #

def test_matrix_add():
    r = _match("Add matrix [[1, 2], [3, 4]] and [[5, 6], [7, 8]].",
               "MATRIX_ADD")
    assert r.final_answer == "[[6, 8], [10, 12]]"


def test_matrix_scalar_multiply():
    r = _match("Multiply matrix [[1, 2], [3, 4]] by scalar 3.",
               "MATRIX_MULTIPLY")
    assert r.final_answer == "[[3, 6], [9, 12]]"


def test_matrix_inverse_2x2():
    r = _match("Find the inverse of matrix [[4, 7], [2, 6]].",
               "MATRIX_INVERSE_2X2")
    assert r.final_answer == "[[0.6, -0.7], [-0.2, 0.4]]"
    assert "det = (4)(6) - (7)(2) = 10" in " ".join(r.steps)


def test_matrix_inverse_singular_refused():
    # det([[1,2],[2,4]]) = 0 -> gate must refuse the match
    _no_match("Find the inverse of matrix [[1, 2], [2, 4]].")


# --------------------------------------------------------------------------- #
# 6 limits
# --------------------------------------------------------------------------- #

def test_limit_factor():
    r = _match("Find the limit of (x^2 - 4)/(x - 2) as x approaches 2.",
               "LIMIT_FACTOR")
    assert r.numeric_answer == pytest.approx(4.0)
    assert "factorise" in " ".join(r.steps)


def test_limit_factor_superscript():
    r = _match("Evaluate the limit of (x\u00b2 - 9)/(x - 3) as x "
               "approaches 3.", "LIMIT_FACTOR")
    assert r.numeric_answer == pytest.approx(6.0)


# --------------------------------------------------------------------------- #
# 7-8 derivatives
# --------------------------------------------------------------------------- #

def test_derivative_power():
    r = _match("Find the derivative of x^3.", "DERIVATIVE_POWER")
    assert r.final_answer == "3x^2"


def test_derivative_eval():
    r = _match("Find f'(2) where f(x) = 3x^2 + 2x.", "DERIVATIVE_EVAL")
    assert r.numeric_answer == pytest.approx(14.0)


# --------------------------------------------------------------------------- #
# 9-10 integrals and area
# --------------------------------------------------------------------------- #

def test_integral_indefinite():
    r = _match("Integrate 3x^2 dx.", "INTEGRAL_BASIC")
    assert r.final_answer == "x^3 + C"


def test_integral_definite():
    r = _match("Integrate 3x^2 dx from 0 to 2.", "INTEGRAL_BASIC")
    assert r.numeric_answer == pytest.approx(8.0)


def test_area_under_curve():
    r = _match("Find the area under y = x^2 from x = 0 to x = 3.",
               "AREA_UNDER_CURVE")
    assert r.numeric_answer == pytest.approx(9.0)


def test_area_under_curve_reversed_interval_refused():
    _no_match("Find the area under y = x^2 from x = 3 to x = 0.")


# --------------------------------------------------------------------------- #
# 11 binomial
# --------------------------------------------------------------------------- #

def test_binomial_general_term():
    r = _match("Find the general term in the expansion of (x + y)^8.",
               "BINOMIAL_TERM")
    assert "C(8, r)" in r.final_answer
    assert "x^(8-r)" in r.final_answer
    assert "y^r" in r.final_answer


def test_binomial_specific_term():
    r = _match("Find the 5th term in the expansion of (x + y)^8.",
               "BINOMIAL_TERM")
    assert r.numeric_answer == pytest.approx(70.0)
    assert "70 x^4 y^4" == r.final_answer


# --------------------------------------------------------------------------- #
# 12-14 finance
# --------------------------------------------------------------------------- #

def test_emi():
    r = _match("Find the EMI on a loan of 100000 at 12% per annum for "
               "12 months.", "EMI")
    # i = 0.01, (1.01)^12 = 1.12682503 -> EMI = 8884.88
    assert r.numeric_answer == pytest.approx(8884.88, abs=0.05)
    assert "EMI = 8884.88 per month" == r.final_answer


def test_annuity():
    r = _match("Find the future value of an annuity of 10000 per year "
               "for 5 years at 8%.", "ANNUITY")
    # 1.08^5 = 1.46932808 -> FV = 10000 x 0.46932808/0.08 = 58666.01
    assert r.numeric_answer == pytest.approx(58666.01, abs=0.05)


def test_cagr():
    r = _match("Find the CAGR if the value grows from 100 to 121 in "
               "2 years.", "CAGR")
    assert r.numeric_answer == pytest.approx(0.10)
    assert "10%" in r.final_answer


# --------------------------------------------------------------------------- #
# 15-16 statistics / time series
# --------------------------------------------------------------------------- #

def test_index_number():
    r = _match("Find the price index number by the simple aggregative "
               "method if the base year prices are 8, 10, 12 and current "
               "year prices are 10, 12, 14.", "INDEX_NUMBER")
    assert r.numeric_answer == pytest.approx(120.0)


def test_time_series_trend():
    r = _match("Calculate the 3-yearly moving averages for "
               "10, 12, 14, 11, 15.", "TIME_SERIES_TREND")
    assert "12, 12.3333, 13.3333" in r.final_answer


# --------------------------------------------------------------------------- #
# 17 probability
# --------------------------------------------------------------------------- #

def test_probability_binomial():
    r = _match("Find the probability of getting exactly 2 successes in "
               "5 trials when the probability of success is 0.5.",
               "PROBABILITY_BINOMIAL")
    assert r.numeric_answer == pytest.approx(0.3125)


def test_probability_binomial_p_out_of_range_refused():
    _no_match("Find the probability of exactly 2 successes in 5 trials "
              "when the probability of success is 1.5.")


# --------------------------------------------------------------------------- #
# 18 rate of change
# --------------------------------------------------------------------------- #

def test_rate_of_change():
    r = _match("The side of a square is increasing at the rate of 2 cm/s. "
               "How fast is the area increasing when side = 3 cm?",
               "RATE_OF_CHANGE")
    assert r.numeric_answer == pytest.approx(12.0)
    assert r.final_answer == "dA/dt = 12 cm^2/s"


# --------------------------------------------------------------------------- #
# dispatcher refusals
# --------------------------------------------------------------------------- #

def test_dispatcher_refuses_unrelated_text():
    r = model_applied_maths("What is the capital of France?")
    assert not r.matched
    assert r.structure == "APPLIED_MATHS"
