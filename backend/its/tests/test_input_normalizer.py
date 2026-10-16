"""test_input_normalizer.py -- Stage 0 shared input normalizer battery.

Batteries FIRST (per module contract), three motivating regressions
included:  the interest family must match the NORMALIZED "SI ...
percent" question, the exponent family must match the NORMALIZED
"raised to the power" question, and "Rs 1,50,000" must canonicalize to
"Rs 150000".  Every rule carries positives, a must-NOT-change
negative, and an idempotence check; a combined sentence proves
whole-pipeline idempotence.

Zero-wrong framing: each negative case is a lane the owning family
already answers in word form -- converting it there would flip a
VERIFIED answer into a refusal (probed before these guards were
chosen).
"""

from __future__ import annotations

import pytest

from backend.its.solver.input_normalizer import normalize_input


# --------------------------------------------------------------------------- #
# Regressions that motivated the module
# --------------------------------------------------------------------------- #

def test_regression_interest_family_matches_normalized_text():
    from backend.its.solver.maths_families import model_interest
    raw = "Find the SI on Rs 5000 at 4 percent per annum for 3 years"
    norm = normalize_input(raw)
    assert norm == ("Find the simple interest on Rs 5000 at 4 % "
                    "per annum for 3 years")
    r = model_interest(norm)
    assert r.matched is True
    assert r.numeric_answer == 600.0


def test_regression_exponent_family_matches_normalized_text():
    from backend.its.solver.maths_families import model_exponent_eval
    raw = "Evaluate 2 raised to the power 6."
    norm = normalize_input(raw)
    assert norm == "Evaluate 2 ^ 6"
    r = model_exponent_eval(norm)
    assert r.matched is True
    assert r.numeric_answer == 64.0


def test_regression_indian_comma_grouping():
    assert normalize_input("Rs 1,50,000") == "Rs 150000"


# --------------------------------------------------------------------------- #
# Rule batteries: (input, exact expected output)
# --------------------------------------------------------------------------- #

POSITIVES = [
    # -- power phrases -> ^ --
    ("Evaluate 2 raised to the power 6.", "Evaluate 2 ^ 6"),
    ("Find 2 raised to the power of 10", "Find 2 ^ 10"),
    ("What is 3 to the power 4", "What is 3 ^ 4"),
    ("What is 10 to the power of 65", "What is 10 ^ 65"),
    # -- Indian number groups -> plain digits --
    ("The cost is Rs 12,34,567", "The cost is Rs 1234567"),
    ("1,000 books were sold", "1000 books were sold"),
    ("India has 1,23,45,678 voters", "India has 12345678 voters"),
    # -- lakh / crore -> absolute value --
    ("Population is 2.5 lakh", "Population is 250000"),
    ("Rs 1.5 crore was sanctioned", "Rs 15000000 was sanctioned"),
    ("12.5 lakh tourists visited", "1250000 tourists visited"),
    # -- dozen -> count --
    ("half a dozen eggs cost Rs 30", "6 eggs cost Rs 30"),
    ("2 dozen pencils", "24 pencils"),
    ("He bought a dozen oranges", "He bought 12 oranges"),
    # -- spelled quantity words (guarded frames) --
    ("Take twice 8 marbles", "Take 2 times 8 marbles"),
    ("Add thrice 9 stamps", "Add 3 times 9 stamps"),
    ("Find a quarter of 40", "Find 0.25 x 40"),
    ("half 30 metres remain", "0.5 30 metres remain"),
    # -- percent words -> % (digit-adjacent only) --
    ("50 percent of 200 is what", "50 % of 200 is what"),
    ("5 percentage of 40 marks", "5 % of 40 marks"),
    ("20 per cent of 90 litres", "20 % of 90 litres"),
    # -- interest abbreviations (uppercase standalone) --
    ("Find the SI on Rs 5000", "Find the simple interest on Rs 5000"),
    ("Difference between CI and SI",
     "Difference between compound interest and simple interest"),
    # -- currency -> Rs --
    ("INR 2500 was paid", "Rs 2500 was paid"),
    ("The price is Rs.5000", "The price is Rs 5000"),
    ("The fee is \u20b9750", "The fee is Rs 750"),
    # -- rate periods -> per annum --
    ("at 5 % p.a. for 2 years", "at 5 % per annum for 2 years"),
    ("6%p.a. compounded quarterly", "6% per annum compounded quarterly"),
    ("rate 7 p.a", "rate 7 per annum"),
    # -- speed units --
    ("A car moves at 60 kmph", "A car moves at 60 km/h"),
    ("speed of 90 km/hr", "speed of 90 km/h"),
    ("A car at 60 kilometres per hour", "A car at 60 km/h"),
    ("A ball rolls at 5 mps", "A ball rolls at 5 m/s"),
    # -- whitespace / punctuation (LAST) --
    ("Find  the  value   of 2+2.", "Find the value of 2+2"),
    ("What is 2+2?", "What is 2+2?"),          # ? is kept
    # -- rule 1 reuse: unicode math via math_kernel --
    ("x\u00b2 + 1", "x^2 + 1"),
    ("5 \u2212 3 = 2", "5 - 3 = 2"),           # unicode minus -> -
]

# Must-NOT-change cases: the owning lane answers the word form, or the
# phrase is not the intended quantity wording.  Zero-wrong bias.
NEGATIVES = [
    # power: decimal neighbours re-parse wrong in caret form
    "2 raised to the power 0.5",
    "0.5 raised to the power 2",
    "prices raised to the power of demand",
    # Indian groups: a 2-digit final group is a list, not a number
    "the marks 12,34 and 56 total 102",
    # lakh: no attached number
    "lakhs of people attended",
    # dozen: bare plural noun
    "dozens of stars were visible",
    # fraction words: riddle + fraction-of lanes own the word forms
    "The sum of twice a number and 5 is 15",
    "half of 18",
    "thrice of 10",
    "the half-yearly exam",
    "a quarter of an hour",
    # percent: interrogative frame, non-quantity frame, points frame
    "What percentage of 250 is 40?",
    "What percent of 250 is 40?",
    "profit percent of 500",
    "the rate rose by 3 percentage points",
    # SI: physics unit frame keeps the abbreviation
    "Convert 10 m/s into SI units",
    "The formula SiO2 is silica",
    # currency: already canonical
    "The Rs 5000 note",
    # p.a.: no digit/% adjacent
    "the p.a. system",
    "per annum is the canonical form",
    # speed: already canonical, and 'mps' inside words must not move
    "A car at 60 km/h",
    "The champs won by 5",
]

# Combined sentence: every rule fires once; proves whole-pipeline
# idempotence and the canonical working form.
COMBINED = ("Find the SI on Rs 1,50,000 at 4 percent per annum for "
            "2.5 years, and evaluate 2 raised to the power 6; a car "
            "at 60 kmph meets a ball at 5 mps; twice 8, half 30, a "
            "quarter of 40, half a dozen eggs at Rs.20 each, at 5 % "
            "p.a.")
COMBINED_EXPECTED = (
    "Find the simple interest on Rs 150000 at 4 % per annum for 2.5 "
    "years, and evaluate 2 ^ 6; a car at 60 km/h meets a ball at 5 "
    "m/s; 2 times 8, 0.5 30, 0.25 x 40, 6 eggs at Rs 20 each, at 5 % "
    "per annum")


@pytest.mark.parametrize("raw, expected", POSITIVES,
                         ids=lambda v: str(v)[:40] if v else "")
def test_positive(raw, expected):
    assert normalize_input(raw) == expected


@pytest.mark.parametrize("raw", NEGATIVES, ids=lambda v: str(v)[:40])
def test_negative_must_not_change(raw):
    assert normalize_input(raw) == raw


# --------------------------------------------------------------------------- #
# Idempotence
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize(
    "raw", [p[0] for p in POSITIVES] + NEGATIVES,
    ids=lambda v: str(v)[:40])
def test_idempotent_per_case(raw):
    once = normalize_input(raw)
    assert normalize_input(once) == once


def test_idempotent_combined_sentence():
    once = normalize_input(COMBINED)
    assert once == COMBINED_EXPECTED
    assert normalize_input(once) == once


# --------------------------------------------------------------------------- #
# Value preservation
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("raw, value", [
    ("Rs 1,50,000", 150000),
    ("Rs 12,34,567", 1234567),
    ("2.5 lakh", 250000),
    ("1.5 crore", 15000000),
    ("2 dozen", 24),
    ("half a dozen", 6),
])
def test_numeric_value_preserved(raw, value):
    norm = normalize_input(raw)
    found = [int(tok) for tok in norm.split() if tok.isdigit()]
    assert found == [value]


# --------------------------------------------------------------------------- #
# API contract: never raises, unknown input unchanged
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("weird", [
    "", "....", "   ", "\x08", "bad\x08text", "\u2212", "=+^", 12.5, None,
])
def test_never_raises(weird):
    out = normalize_input(weird)
    assert out == weird or isinstance(out, str)


def test_plain_prose_unchanged():
    assert normalize_input("hello world") == "hello world"


def test_backspace_byte_input_returned_unchanged():
    # corruption self-check: never ship or raise on mangled transport
    raw = "find the value\x08of x"
    assert normalize_input(raw) == raw
