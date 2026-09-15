"""test_ask_lane_regressions.py -- student-review ask-lane regressions.

The harsh student review flagged the ask lane on three asks.  Each is
pinned here so the behaviour cannot silently regress:

1. "Solve 2x + 5 = 17"  must be VERIFIED x = 6 (a broken parse once
   dropped the coefficient and verified x = -5);
2. "Solve x^2 + (x+1)^2 = 365" must be VERIFIED with the meaningful
   root 13 (consecutive integers squaring to 365);
3. "accelerates from rest at 2 m/s2 for 5 s -> final velocity" must
   compute v = u + a*t = 0 + 2*5 = 10.  Two parse bugs are pinned:
   - the unit-exponent digit in "m/s2" is not a standalone number
     (the phantom used to bind u = 2 by positional residue), and
   - "from rest" reads as u = 0 (deterministic state-phrase bind).
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


# --------------------------------------------------------------------------- #
# 1. linear equation: coefficient must survive (2x + 5 = 17 -> x = 6)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("ask", [
    "Solve 2x + 5 = 17",
    "Solve: 2x + 5 = 17",
    "solve 2x+5=17",
    "2x + 5 = 17",
])
def test_linear_equation_coefficient_kept(ask):
    r = _solve(ask)
    assert r.label == "VERIFIED", (ask, r.label, r.refusal_reason)
    assert r.numeric is not None and abs(r.numeric - 6.0) < 1e-9, (
        ask, r.label, r.answer, r.numeric)


# --------------------------------------------------------------------------- #
# 2. quadratic word-problem equation: x^2 + (x+1)^2 = 365 -> x = 13
# --------------------------------------------------------------------------- #

def test_consecutive_squares_quadratic():
    r = _solve("Solve x^2 + (x+1)^2 = 365")
    assert r.label == "VERIFIED", (r.label, r.refusal_reason)
    assert r.numeric is not None and abs(r.numeric - 13.0) < 1e-9, (
        r.label, r.answer, r.numeric)


# --------------------------------------------------------------------------- #
# 3. kinematics: from rest at 2 m/s2 for 5 s -> v = 10
# --------------------------------------------------------------------------- #

def _intersection(text: str):
    from backend.its.solver.quantity_parser import parse_quantities
    from backend.its.solver.role_index import solve_by_intersection
    return solve_by_intersection(text, parse_quantities(text))


def test_unit_exponent_digit_is_not_a_mention():
    from backend.its.solver.role_index import extract_mentions
    text = "A car accelerates from rest at 2 m/s2 for 5 s."
    mentions = extract_mentions(text, None)
    values = sorted(m.value for m in mentions)
    # exactly the two real values (2 and 5); the unit digit in "m/s2"
    # must not appear as a phantom 2.0 duplicate
    assert values == [2.0, 5.0], values


def test_from_rest_binds_u_zero_and_computes_v_ten():
    text = ("A car accelerates from rest at 2 m/s2 for 5 s. "
            "Find its final velocity.")
    r = _intersection(text)
    assert r is not None, "role-index intersection must resolve the ask"
    assert r["target"] == "v"
    assert r["knowns"] == {"u": 0.0, "a": 2.0, "t": 5.0}, r["knowns"]
    assert abs(r["value"] - 10.0) < 1e-9, r["value"]


def test_pipeline_compute_is_ten_not_twelve():
    text = ("A car accelerates from rest at 2 m/s2 for 5 s. "
            "Find its final velocity.")
    r = _solve(text)
    joined = "\n".join(str(s) for s in (r.steps or []))
    assert "10" in joined, (r.label, joined)
    assert "12" not in joined.replace("m/s2", ""), (
        "wrong v = u + a*t with u = a must not resurface", joined)
