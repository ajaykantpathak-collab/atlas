"""test_matrix_kernel.py -- Lane A matrix battery (cluster 2).

Senior-maths exam forms the kernel must now solve exactly at stage 0:

    T1  [row] x [3x3] x [column] = O        (NCERT Misc / CBSE 2019:
             x^2 - 48 = 0 -> x = +/- 4*sqrt(3))
    T2  the same, flattened to bracket-LINE rows:
            [x -5 -1] [1 0 2] [0 2 1] [2 0 3] [x 4 1] = O
    T3  [row with unknown] x [3x3] = [0 0 0]   (consistent row form)
    T4  [2x2] x [column with unknown] = O      (consistent column form)

Anything not exactly verifiable must REFUSE: inconsistent products,
the PDF-flattened bank string 47840 whose middle-matrix digits were
lost in extraction, ambiguous groupings, non-zero right-hand sides.
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


FOUR_ROOT_THREE = 4 * (3 ** 0.5)     # 6.928203230275509

NCERT_T1 = ("Find x, if [x \u22125 \u22121] [[1, 0, 2], [0, 2, 1], "
            "[2, 0, 3]] [x; 4; 1] = O")
NCERT_T2_FLAT = ("Find x, if [x \u22125 \u22121] [1 0 2] [0 2 1] "
                 "[2 0 3] [x 4 1] = O")
ROW_ZERO_T3 = ("Find the value of x, if [x, -5, -1] "
               "[[0, 1, 0], [1, 2, 2], [-5, 0, -10]] = [0 0 0]")
COL_ZERO_T4 = "Find x, if [[2, 1], [-4, -2]] [x; 1] = O"


# ------------------------------------------------------------------ #
# grid parsing units
# ------------------------------------------------------------------ #

def test_parse_nested_matrix_form():
    from backend.its.solver.math_kernel import _matrix_groups
    groups = _matrix_groups("[[1, 0, 2], [0, 2, 1], [2, 0, 3]]")
    assert groups == [[["1", "0", "2"], ["0", "2", "1"], ["2", "0", "3"]]]


def test_parse_semicolon_and_row_forms():
    from backend.its.solver.math_kernel import _matrix_groups
    assert _matrix_groups("[1 0 2; 0 2 1; 2 0 3]") == \
        [[["1", "0", "2"], ["0", "2", "1"], ["2", "0", "3"]]]
    assert _matrix_groups("[x -5 -1]") == [[["x", "-5", "-1"]]]
    assert _matrix_groups("[x; 4; 1]") == \
        [[["x"], ["4"], ["1"]]]


def test_parse_rejects_malformed_grids():
    from backend.its.solver.math_kernel import _matrix_groups
    assert _matrix_groups("[]") is None                 # empty grid
    assert _matrix_groups("[1 2") is None               # unbalanced
    assert _matrix_groups("[1 a2 3]") is None           # junk token


# ------------------------------------------------------------------ #
# the NCERT / CBSE 2019 triple product: x^2 - 48 = 0
# ------------------------------------------------------------------ #

def test_ncert_triple_product_nested_form():
    r = _solve(NCERT_T1)
    assert r.label == "VERIFIED"
    assert r.audit.route[0] == "kernel:math_kernel"
    assert r.numeric == pytest.approx(FOUR_ROOT_THREE)
    assert any("x**2-48" in s.replace(" ", "") or
               "x^2-48" in s.replace(" ", "") for s in r.steps)
    assert any("governing equation" in s for s in r.steps)


def test_ncert_triple_product_bracket_line_form():
    r = _solve(NCERT_T2_FLAT)
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(FOUR_ROOT_THREE)


def test_triple_product_zero_rhs_digit_and_negative_root_listed():
    r = _solve("Find x, if [x -5 -1] [[1, 0, 2], [0, 2, 1], [2, 0, 3]] "
               "[x; 4; 1] = 0")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(FOUR_ROOT_THREE)
    assert any("-6.9282" in s or "-4*sqrt(3)" in s.replace(" ", "")
               for s in r.steps)


# ------------------------------------------------------------------ #
# row-vector x matrix = zero row (consistent)  ->  x = 10
# ------------------------------------------------------------------ #

def test_row_vector_times_matrix_zero_row_consistent():
    # [x -5 -1] . M = [0 x-10 0]:  x = 10 zeroes every entry
    r = _solve(ROW_ZERO_T3)
    assert r.label == "VERIFIED"
    assert r.audit.route[0] == "kernel:math_kernel"
    assert r.numeric == pytest.approx(10.0)


def test_column_form_2x2_consistent():
    # [[2 1][-4 -2]] . [x 1]^T = [2x+1, -4x-2]^T = O -> x = -1/2
    r = _solve(COL_ZERO_T4)
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(-0.5)


def test_deterministic_repeats():
    a = _solve(NCERT_T1)
    b = _solve(NCERT_T1)
    assert a.numeric == b.numeric and a.steps == b.steps


# ------------------------------------------------------------------ #
# honest refusals -- never ship a number for these
# ------------------------------------------------------------------ #

def test_inconsistent_row_form_refuses():
    """Real bank sample 2: [x -5 -1] . [[0,2,1],[2,0,3],[1,-4,5]] has
    a constant entry -11 = 0: no x exists.  The kernel must refuse,
    not invent."""
    r = _solve("Find x, if [x \u22125 \u22121] [[0, 2, 1], [2, 0, 3], "
               "[1, \u22124, 5]] = [0 0 0]")
    assert r.label == "GUIDED_PRACTICE"
    assert r.answer is None and r.numeric is None


def test_bank_47840_flattened_string_refuses():
    """Real bank text: '[x -5 -1] 0 2 1 4 =O 2 0 3 1'.  The middle
    matrix lost its first row and the column vector lost two entries
    in PDF extraction -- reconstruction is not deterministic, so the
    kernel refuses (the fix belongs upstream, at extraction time)."""
    r = _solve("Find x, if [x \u22125 \u22121] 0 2 1  4 =O 2 0 3 1")
    assert r.label == "GUIDED_PRACTICE"
    assert r.answer is None and r.numeric is None


def test_matrix_multiply_wording_stays_with_families():
    """No '=': the matrix model must not hijack family-lane tasks."""
    r = _solve("Find the determinant of the matrix [[3, 5], [2, 4]].")
    # whatever the lane, the kernel stage must NOT fire with a product
    assert "kernel:math_kernel" not in r.audit.route


def test_kernel_level_refusals():
    """Pinned at the kernel: ambiguous, non-zero-RHS and multi-unknown
    matrix equations return no-match (solve_math -> None)."""
    from backend.its.solver.math_kernel import solve_math
    # non-zero right-hand side
    assert solve_math("Find x, if [[2, 1], [-4, -2]] [x; 1] = [1; 0]") \
        is None
    # two unknowns (infinitely many solutions) -> ambiguous
    assert solve_math("Find x and y, if [[2, 1], [-4, -2]] [x; y] = O") \
        is None
    # ragged grid cannot be a matrix
    assert solve_math("Find x, if [x 1 2] [[1, 2], [3]] = O") is None
    # junk between groups (loose digits) -> ambiguous flattening
    assert solve_math("Find x, if [x -5 -1] 0 2 1 4 = O 2 0 3 1") is None
