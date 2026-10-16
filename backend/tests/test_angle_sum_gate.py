"""test_angle_sum_gate.py -- regression for the triangle angle-sum ask-gate.

Evidence (2026-10-06): _c_angle_sum fired on ANY triangle question with
two numbers — "hypotenuse is 25 cm and one side is 7 cm" answered
"148 deg" VERIFIED, and the 3-4-5 Pythagoras gave "173 deg".  The gate
now requires angle context and refuses side-asks; those questions fall
through to the Pythagoras lane and solve correctly.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
# ONLY the deploy root may be on sys.path.  Putting deploy/backend on it
# materializes a SECOND 'its.solver' module identity (bare imports inside
# the solver) and the structure registry splits in two.

import pytest
from backend.its.solver.structure_families import _c_angle_sum


def test_side_ask_refused():
    assert _c_angle_sum({}, "In a right triangle, the hypotenuse is 25 cm "
                             "and one side is 7 cm. Find the third side.") is None


def test_legs_ask_refused():
    assert _c_angle_sum({}, "A right triangle has legs 3 and 4. What is "
                             "the hypotenuse?") is None


def test_area_ask_refused():
    assert _c_angle_sum({}, "The area of a triangle is 60 and the base is "
                            "12. Find the height.") is None


def test_real_angle_case_still_solves():
    r = _c_angle_sum({}, "Two angles of a triangle are 60 deg and 70 deg. "
                         "Find the third angle.")
    assert r is not None
    assert str(r[2]).startswith("50")


def test_angle_word_case_still_solves():
    r = _c_angle_sum({}, "In a triangle, angle A is 55 and angle B is 65. "
                         "Find angle C.")
    assert r is not None
    assert str(r[2]).startswith("60")


def test_non_triangle_untouched():
    assert _c_angle_sum({}, "Two angles of a quadrilateral are 60 and 70.") is None


@pytest.mark.parametrize("q,expected", [
    ("In a right triangle, the hypotenuse is 25 cm and one side is 7 cm. "
     "Find the third side.", "24"),
    ("A right triangle has legs 3 and 4. What is the hypotenuse?", "5"),
])
def test_pipeline_falls_through_to_pythagoras(q, expected):
    from backend.its.solver.answer_pipeline import answer
    r = answer(q)
    assert str(r.label).startswith("VERIFIED"), q
    assert str(r.answer or "").strip().startswith(expected), (q, r.answer)
