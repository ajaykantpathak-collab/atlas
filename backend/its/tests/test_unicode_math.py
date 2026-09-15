"""test_unicode_math.py -- Lane A math-kernel unicode battery.

Cluster 1: PDF-extracted bank questions carry Mathematical Italic
letters (U+1D400 block), superscript digits, unicode operators and
"flattened" exponents ("ax2" meaning ax^2).  normalize_unicode_math()
must translate them losslessly BEFORE the kernel routes; the pipeline
must then answer the real bank items it refused ("kernel:none").

Each failing row is one regression:  the mangled question and its
clean twin must produce the SAME verified answer.
"""

from __future__ import annotations

import contextlib
import io

import pytest


def _solve(text: str):
    from backend.its.solver.answer_pipeline import answer
    buf = io.StringIO()
    with contextlib.redirect_stderr(buf):
        return answer(text)


def _norm(text: str) -> str:
    from backend.its.solver.math_kernel import normalize_unicode_math
    return normalize_unicode_math(text)


BANK_S1 = (
    "The equation of the path traversed by the ball headed by the "
    "footballer is \U0001d466= \U0001d44e\U0001d4652 + \U0001d44f"
    "\U0001d465+ \U0001d450; (\U0001d466\U0001d465\U0001d466"
    "\U0001d452\U0001d45f\U0001d452 0 \u2264\U0001d465\u226414 "
    "\U0001d44e\U0001d45b\U0001d451 \U0001d44e, \U0001d44f, "
    "\U0001d450 \u2208\U0001d445 \U0001d44e\U0001d45b\U0001d451 "
    "\U0001d44e \u22600) with respect to a XY-coordinate system in "
    "the vertical plane. The ball passes through the points     "
    "2,15 ,  4,25 and 14,15 . Determine the values of a, b and c by "
    "solving the system of linear equations in a, b and c, using "
    "matrix method. Also find the equation of the path traversed by "
    "the ball.")


# ------------------------------------------------------------------ #
# normalize_unicode_math: Mathematical Alphanumeric Symbols block
# ------------------------------------------------------------------ #

def test_math_italic_letters_map_to_ascii():
    # U+1D4F0 is sans-serif ITALIC small g (block order a b c d e f g)
    assert _norm("\U0001d466 = \U0001d44e\U0001d465 + \U0001d4f0") \
        == "y = ax + g"


def test_math_italic_words_and_operators_bank_prefix():
    # the bank prints "(where" with italic w, letterlike h, italic e r e
    out = _norm("(\U0001d464\u210e\U0001d452\U0001d45f\U0001d452 0 "
                "\u2264\U0001d465\u226414")
    assert out == "(where 0 <=x<=14"


def test_fullwidth_and_double_struck_via_nfkc():
    out = _norm("\U0001d538 \uff0b \uff11\uff12")
    assert out == "A + 12"


def test_italic_h_letterlike_and_set_letters():
    out = _norm("\u210e, \u211d, \u2124")
    assert out == "h, R, Z"


# ------------------------------------------------------------------ #
# superscripts -> ^ notation (before NFKC would flatten them away)
# ------------------------------------------------------------------ #

def test_superscript_two_and_three():
    assert _norm("x\u00b2 - 5x + 6 = 0") == "x^2 - 5x + 6 = 0"
    assert _norm("10\u00b3") == "10^3"


def test_superscript_negative_exponent():
    assert _norm("2 \u00d7 10\u207b\u00b3") == "2 * 10^-3"


def test_superscript_run_multi_digit_and_symbolic():
    assert _norm("x\u00b2\u00b3") == "x^23"
    assert _norm("2\u207f\u207a\u00b9") == "2^(n+1)"


# ------------------------------------------------------------------ #
# operators
# ------------------------------------------------------------------ #

def test_unicode_operators_map_to_ascii():
    assert _norm("6 \u2212 4 \u00d7 2 \u00f7 8") == "6 - 4 * 2 / 8"
    assert _norm("\u221a16") == "sqrt16"


def test_membership_and_neq():
    out = _norm("\U0001d44e \u2208\U0001d445, \U0001d44e \u22600")
    assert out == "a  in R, a !=0"


# ------------------------------------------------------------------ #
# flattened exponents -- conservative repair
# ------------------------------------------------------------------ #

def test_flattened_exponent_in_equation():
    assert _norm("Solve 3x2 - 5x - 2 = 0") == "Solve 3x^2 - 5x - 2 = 0"
    assert _norm("y = ax2 + bx + c") == "y = ax^2 + bx + c"
    assert _norm("x2 - 5x + 6 = 0") == "x^2 - 5x + 6 = 0"


def test_flattened_exponent_requires_polynomial_context():
    # no equation, no solve-intent: prose stays untouched
    assert _norm("the room is 20 m2 wide") == "the room is 20 m2 wide"


def test_flattened_exponent_needs_second_occurrence_for_coefficient():
    # "10x3" with a single x is "10 x 3" multiplication, not 10x^3
    assert _norm("10x3 = 30") == "10x3 = 30"
    # ...but a real polynomial (the letter appears in another term) fires
    assert _norm("6x2 + 5x = 72") == "6x^2 + 5x = 72"


def test_plain_coefficients_and_scientific_notation_untouched():
    assert _norm("Solve 2x + 3 = 11") == "Solve 2x + 3 = 11"
    assert _norm("2 x 10^-3") == "2 x 10^-3"
    assert _norm("mass 2 x 10-3 kg") == "mass 2 x 10-3 kg"


def test_function_names_are_not_exponents():
    assert _norm("log2(32) = 5") == "log2(32) = 5"
    assert _norm("max2 of the set") == "max2 of the set"


def test_idempotent_normalization():
    for t in (BANK_S1, "Solve 3\U0001d4652 \u2212 5\U0001d465 \u2212 2 = 0",
              "x\u00b2 \u2212 5x + 6 = 0", "plain prose 10 x 10-3"):
        once = _norm(t)
        assert _norm(once) == once


def test_no_backspace_corruption():
    for t in (BANK_S1, "x\u00b2", "\U0001d44e\U0001d4652 = 0", ""):
        assert chr(8) not in _norm(t)


def test_normalization_is_meaning_preserving():
    """The normalized equation must define the same curve as the
    hand-written clean twin (evaluate both sides symbolically)."""
    import sympy
    from backend.its.solver.math_kernel import parse_expression

    def _exprs(eq):
        lhs, _, rhs = eq.partition("=")
        return parse_expression(lhs), parse_expression(rhs)

    a, b, c, x, y = sympy.symbols("a b c x y")
    m_lhs, m_rhs = _exprs(_norm(
        "\U0001d466 = \U0001d44e\U0001d4652 + \U0001d44f\U0001d465+ "
        "\U0001d450"))
    c_lhs, c_rhs = _exprs("y = a*x^2 + b*x + c")
    diff = ((m_lhs - m_rhs) - (c_lhs - c_rhs)).subs(
        {a: 3, b: -2, c: 5, x: sympy.Rational(3, 2),
         y: sympy.Rational(7, 10)})
    assert sympy.simplify(diff) == 0


# ------------------------------------------------------------------ #
# pipeline: mangled and clean twins must give the SAME verified answer
# ------------------------------------------------------------------ #

def test_bank_s3_unicode_matches_clean_quadratic():
    """'Solve 3x^2 - 5x - 2 = 0' has roots 2 and -1/3; the kernel now
    claims it at stage 0 instead of letting a downstream stage compute
    a wrong single number."""
    uni = _solve("Solve 3\U0001d4652 \u2212 5\U0001d465 \u2212 2 = 0")
    clean = _solve("Solve 3x^2 - 5x - 2 = 0")
    for r in (uni, clean):
        assert r.label == "VERIFIED"
        assert r.audit.route[0] == "kernel:math_kernel"
        assert r.numeric == pytest.approx(2.0)      # larger root
    assert uni.numeric == clean.numeric
    assert any("roots" in s for s in clean.steps)


def test_superscript_quadratic_matches_flattened_twin():
    sup = _solve("Solve x\u00b2 \u2212 5x + 6 = 0")
    flat = _solve("Solve x2 - 5x + 6 = 0")
    for r in (sup, flat):
        assert r.label == "VERIFIED"
        assert r.numeric == pytest.approx(3.0)      # larger of 2, 3
    assert sup.numeric == flat.numeric


def test_bank_s1_footballer_parabola_answered():
    """Real bank item 19352: y = ax^2 + bx + c through (2,15), (4,25),
    (14,15) -> a = -1/2, b = 8, c = 1 (verified independently by
    substituting all three points)."""
    r = _solve(BANK_S1)
    assert r.label == "VERIFIED"
    assert r.audit.route[0] == "kernel:math_kernel"
    assert r.numeric == pytest.approx(-0.5)            # a
    assert any("b = 8" in s for s in r.steps)
    assert any("c = 1" in s for s in r.steps)
    assert any("governing equation" in s for s in r.steps)
    # independent check: the reported path really passes through
    # all three points
    path = [s for s in r.steps if s.startswith("path:")][0]
    assert "-x**2/2+8*x+1" in path.replace(" ", "")


def test_bank_s1_clean_twin_same_answer():
    clean = ("The path of a ball is y = ax^2 + bx + c where a is not "
             "0. The ball passes through the points (2, 15), (4, 25) "
             "and (14, 15). Determine the values of a, b and c by "
             "solving the system of equations.")
    r = _solve(clean)
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(-0.5)
    assert any("b = 8" in s for s in r.steps)


def test_clean_linear_equation_unaffected():
    """Coefficient guard: '2x' must stay 2*x (never 2^x)."""
    r = _solve("Solve 2x + 3 = 11")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(4.0)
