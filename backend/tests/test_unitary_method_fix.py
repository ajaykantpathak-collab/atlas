"""test_unitary_method_fix.py -- regression for the two live unitary-method
failures (owner-reported: oranges/pen cost questions refused) + variants.

Bugs (class6_families.model_unitary_method, fixed 2026-10-05):
  1. trigger required "of|for N ..." — "If 5 pens cost Rs 60" never matched
  2. target-quantity anchor used item.split()[-1] ("oranges") so
     "find the price of 5 kg" was never found
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

import pytest
from backend.its.solver.maths_families import model_unitary_method

CASES = [
    # (question, expected numeric answer) — the two owner-reported first
    ("The price of 2 kg of oranges is Rs 113. Find the price of 5 kg.",
     282.5),
    ("If 5 pens cost Rs 60, what is the cost of 12 pens?", 144.0),
    # variants across phrasings
    ("The cost of 3 kg of apples is Rs 240. What is the cost of 7 kg?",
     560.0),
    ("6 notebooks cost Rs 150. Find the cost of 10 notebooks.", 250.0),
    ("If 4 litres of milk costs Rs 176, find the cost of 9 litres of milk.",
     396.0),
    ("The price of 5 m of ribbon is Rs 45. What is the price of 13 m?",
     117.0),
    ("8 chairs are bought for Rs 5,600. What will 15 chairs cost?", 10500.0),
    ("A dozen bananas cost Rs 48. Find the cost of 30 bananas.", 120.0),
]


@pytest.mark.parametrize("text,expected", CASES)
def test_unitary_method_cracks(text, expected):
    r = model_unitary_method(text)
    assert r.matched, f"family refused: {r.note} — {text!r}"
    assert r.numeric_answer is not None
    assert abs(float(r.numeric_answer) - expected) <= max(0.01, 0.02 * expected), (
        f"got {r.numeric_answer}, want {expected} — {text!r}")


NEGATIVES = [
    # must NOT fire (junk/template/other structures)
    "What must you be able to do to master this topic?",
    "Explain the color of the smell of Tuesday",
    "Divide 60 in the ratio 2:3 between Ram and Shyam.",
]


@pytest.mark.parametrize("text", NEGATIVES)
def test_unitary_method_does_not_fire_on_junk(text):
    r = model_unitary_method(text)
    assert not r.matched, f"fired on junk: {text!r} -> {r.final_answer}"
