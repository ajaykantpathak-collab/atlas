"""test_symbolic_channel.py -- the SYMBOLIC ANSWER CHANNEL battery.

The single-float contract used to force honest refusals on asks whose
correct answer is an EXPRESSION ("Compute the derivative of 6x^100 -
x^55 + x").  math_kernel now returns a SymbolicAnswer for those; the
router ships it as the answer string with numeric=None, and
answer_pipeline lane A promotes it verbatim (no pipeline change).

ZERO-WRONG invariants under test here:
  - a symbolic answer ships only when the CAS reading is provably
    clean (no prose slip, no unevaluated/assumption-dependent residue),
  - "at x = k" derivative asks and definite integrals stay NUMERIC
    (byte-identical behaviour),
  - the PDF-mangled twin ("6x100 - x55 + x") is repaired by the
    normalizer and NEVER returns the old wrong 600/546 readings,
  - numeric regression pins are unchanged.

    cd /d/platform && python -m pytest backend/its/tests/test_symbolic_channel.py -q
"""

from __future__ import annotations

import pytest

from backend.its.solver.math_kernel import (
    SymbolicAnswer, normalize_unicode_math, parse_expression, solve_math)

DERIV_ANSWER = "600*x**99 - 55*x**54 + 1"


def _route(text: str):
    from backend.its.solver.router import solve_text
    return solve_text(text)


def _answer(text: str):
    from backend.its.solver.answer_pipeline import answer
    return answer(text)


# ------------------------------------------------------------------ #
# Kernel level: solve_math returns SymbolicAnswer for expression asks
# ------------------------------------------------------------------ #

def test_kernel_derivative_is_symbolic():
    v, steps = solve_math("Compute the derivative of 6x^100 - x^55 + x.")
    assert isinstance(v, SymbolicAnswer)
    assert v.expr == DERIV_ANSWER
    # the steps show the derivative symbolically
    assert any("600*x**99" in s for s in steps)


def test_kernel_differentiate_symbolic():
    v, steps = solve_math("Differentiate 3x^2 - 5x - 2.")
    assert isinstance(v, SymbolicAnswer)
    assert v.expr == "6*x - 5"
    assert any("6*x - 5" in s for s in steps)


def test_kernel_derivative_at_point_stays_numeric():
    v, steps = solve_math("derivative of 6x^100 - x^55 + x at x = 2")
    assert isinstance(v, float)
    assert v == pytest.approx(float(600 * 2**99 - 55 * 2**54 + 1))
    assert any("at x = 2" in s for s in steps)


def test_kernel_constant_derivative_stays_numeric():
    # d/dx of a constant-free linear term is a number: old path
    v, _steps = solve_math("derivative of 2x")
    assert isinstance(v, float)
    assert v == pytest.approx(2.0)


def test_kernel_definite_integral_stays_numeric():
    v, steps = solve_math("Find the integral of x^2 from 0 to 3.")
    assert isinstance(v, float)
    assert v == pytest.approx(9.0)
    assert any("from 0 to 3" in s for s in steps)


def test_kernel_indefinite_integral_is_symbolic_with_constant():
    v, steps = solve_math("Integrate 2x + 3 dx.")
    assert isinstance(v, SymbolicAnswer)
    assert v.expr == "x**2 + 3*x + C"
    assert any("constant of integration" in s for s in steps)


def test_kernel_indefinite_integral_with_respect_to():
    v, _steps = solve_math("Integrate 3x^2 with respect to x.")
    assert isinstance(v, SymbolicAnswer)
    assert v.expr == "x**3 + C"


def test_kernel_indefinite_integral_without_dx_marker():
    v, _steps = solve_math("integral of x^3 + 2x")
    assert isinstance(v, SymbolicAnswer)
    assert v.expr == "x**4/4 + x**2 + C"


def test_kernel_symbolic_answer_string_is_round_trippable_ascii():
    import sympy

    v, _steps = solve_math("Compute the derivative of 6x^100 - x^55 + x.")
    assert v.expr.isascii()
    assert "derivative" not in v.expr and "Compute" not in v.expr
    back = parse_expression(v.expr)
    src = parse_expression("6x^100 - x^55 + x")
    assert sympy.expand(back - src.diff()) == 0


# ------------------------------------------------------------------ #
# ZERO-WRONG guards: symbolic answers refuse dirty readings
# ------------------------------------------------------------------ #

def test_guard_prose_inside_expression_refuses():
    # "from a to b" would parse into a symbol product -- a wrong
    # reading; the symbolic channel must refuse instead
    assert solve_math("derivative of x from a to b") is None


def test_guard_unevaluated_integral_refuses():
    # sympy leaves Integral(x**x, x) unevaluated -> no answer ships
    assert solve_math("integral of x^x") is None


def test_guard_nonschool_derivative_refuses():
    # d/dx abs(x) = sign(x): generalised derivative, honest refusal
    assert solve_math("derivative of abs(x)") is None


# ------------------------------------------------------------------ #
# Normalizer: the mangled twin must reach the SAME symbolic answer
# ------------------------------------------------------------------ #

def test_normalizer_repairs_coefficient_glued_exponent():
    assert normalize_unicode_math(
        "Compute the derivative of 6x100 - x55 + x.") == \
        "Compute the derivative of 6x^100 - x^55 + x."


def test_normalizer_does_not_mangle_scientific_e_or_functions():
    # 'e' is excluded from the coefficient-glued rule: scientific
    # notation "2e10" must stay intact; function names too
    assert normalize_unicode_math("differentiate 2e10") == \
        "differentiate 2e10"
    assert normalize_unicode_math("solve log100 = 2") == \
        "solve log100 = 2"


def test_mangled_twin_kernel_same_symbolic_answer():
    v, _steps = solve_math("Compute the derivative of 6x100 - x55 + x.")
    assert isinstance(v, SymbolicAnswer)
    assert v.expr == DERIV_ANSWER


def test_mangled_twin_never_wrong_numeric_readings():
    # the historical wrong readings were numeric 600 / 546 class
    r = _route("Compute the derivative of 6x100 - x55 + x.")
    assert r.numeric is None
    if r.answer is not None:
        assert r.answer == DERIV_ANSWER


# ------------------------------------------------------------------ #
# Router level: symbolic result propagates (solved, answer, None)
# ------------------------------------------------------------------ #

def test_router_symbolic_derivative_propagates():
    r = _route("Compute the derivative of 6x^100 - x^55 + x.")
    assert r.solved and r.verified and r.stage == "math_kernel"
    assert r.answer == DERIV_ANSWER
    assert r.numeric is None


def test_router_symbolic_route_numeric_untouched():
    r = _route("derivative of 6x^100 - x^55 + x at x = 2")
    assert r.solved and r.verified
    assert r.numeric == pytest.approx(
        float(600 * 2**99 - 55 * 2**54 + 1))
    assert r.answer == "3.80295e+32"       # byte-identical numeric path
    r2 = _route("Find the integral of x^2 from 0 to 3.")
    assert r2.solved and r2.verified
    assert r2.numeric == pytest.approx(9.0)
    assert r2.answer == "9"


# ------------------------------------------------------------------ #
# Pipeline level (answer_pipeline.answer): labels + answer strings
# ------------------------------------------------------------------ #

def test_pipeline_lane_a_symbolic_verified():
    # lane-A-classified formal ask: symbolic answer promoted VERIFIED
    r = _answer("Differentiate 3x^2 - 5x - 2.")
    assert r.label == "VERIFIED"
    assert r.answer == "6*x - 5"
    assert r.numeric is None


def test_pipeline_symbolic_ask_never_numerically_wrong():
    # "Compute the derivative of ..." is classified Lane C by
    # answer_pipeline.classify (its _FORMAL_RE lacks "derivative"), so
    # the pipeline honestly refuses it today; whatever the lane
    # outcome, it must NEVER ship a numeric 600/546-class reading and
    # any shown answer must be the exact CAS expression.
    for q in ("Compute the derivative of 6x^100 - x^55 + x.",
              "Compute the derivative of 6x100 - x55 + x."):
        r = _answer(q)
        assert r.numeric is None
        assert r.numeric != 600 and r.numeric != 546
        assert r.answer in (None, DERIV_ANSWER)
        if r.answer is not None:
            assert r.label == "VERIFIED"


def test_pipeline_numeric_regressions_unchanged():
    r = _answer("Solve 3x^2 - 5x - 2 = 0")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(2.0)
    assert r.answer == "2"
    r2 = _answer("Evaluate 12 * (4 + 5).")
    assert r2.label == "VERIFIED"
    assert r2.numeric == pytest.approx(108.0)
    assert r2.answer == "108"
    r3 = _answer("Find the integral of x^2 from 0 to 3.")
    assert r3.label == "VERIFIED"
    assert r3.numeric == pytest.approx(9.0)
    assert r3.answer == "9"


def test_pipeline_second_lane_a_symbolic_verified():
    # a second lane-A-classified derivative ask verifies symbolically
    r = _answer("Find the derivative of x^2 - 9x.")
    assert r.label == "VERIFIED"
    assert r.answer == "2*x - 9"
    assert r.numeric is None


def test_pipeline_indefinite_integral_never_numeric():
    # "Integrate 3x^2 dx." is answered by the registry family (Lane C
    # sweep); whichever tier answers it, an INDEFINITE integral must
    # never ship as a bare number
    r = _answer("Integrate 3x^2 dx.")
    assert r.numeric is None
    if r.answer is not None:
        assert r.label == "VERIFIED"
