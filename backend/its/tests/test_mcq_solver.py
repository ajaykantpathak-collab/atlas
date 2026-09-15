"""test_mcq_solver.py -- batteries for the MCQ option-verification gate.

The gate promotes a guided numeric MCQ ONLY when the stem computes in the
ordinary pipeline AND exactly one option matches within tolerance.
Zero matches or two-plus matches must stay guided (zero-wrong-answer).

Run:
    cd /d/platform && python -m pytest backend/its/tests/test_mcq_solver.py -q
"""

from __future__ import annotations

import pytest

from backend.its.solver.mcq_solver import (parse_numeric_options,
                                           split_stem, match_options)


def _solve(text: str):
    from backend.its.solver.answer_pipeline import _answer_core
    return _answer_core(text)


# ---- option parsing ----

def test_parse_paren_lower():
    opts = parse_numeric_options(
        "What is x? (a) 3.06 (b) 4.0 (c) 5.5 (d) 6.2")
    assert opts == {"a": 3.06, "b": 4.0, "c": 5.5, "d": 6.2}


def test_parse_indian_rupee_commas():
    opts = parse_numeric_options(
        "Puneet share will be :- a) 1,80,000 b) 1,44,000 c) 2,16,000 "
        "d) 1,60,000")
    assert opts["a"] == 180000.0 and opts["c"] == 216000.0


def test_parse_capital_paren():
    opts = parse_numeric_options(
        "The probability is A) 0.0001 B) 0.001 C) 0.01 D) 0.1")
    assert opts["a"] == 0.0001 and opts["d"] == 0.1


def test_parse_scientific():
    opts = parse_numeric_options(
        "value is (a) 3 x 10^8 (b) 1.5 (c) 9 (d) 12")
    assert opts["a"] == 3e8


def test_parse_fewer_than_three_refused():
    assert parse_numeric_options("either (a) 1 or (b) 2") is None


# ---- stem split ----

def test_split_stem():
    stem, ok = split_stem(
        "Find the retardation. (a) 2 (b) 4 (c) 5 (d) 8")
    assert ok and "retardation" in stem and "(a)" not in stem


# ---- option matching ----

def test_match_single():
    letters, n = match_options(3.0625, {"a": 3.06, "b": 4.0, "c": 5.5})
    assert n == 1 and letters == "a"


def test_match_ambiguous_two_close_options():
    letters, n = match_options(4.005, {"a": 4.0, "b": 4.01, "c": 9.0})
    assert n == 2  # both within 1% -> must NOT promote


def test_match_none():
    letters, n = match_options(123.0, {"a": 1.0, "b": 2.0, "c": 3.0})
    assert n == 0


# ---- full pipeline promotion ----

def test_promotion_when_core_fails_full_text():
    # the trailing options confuse a family trigger, but the clean stem
    # computes: the gate bridges exactly this gap
    full = ("A manufacturer has 600 litres of a 12% acid solution. How "
            "many litres of a 30% acid solution must be added so that "
            "the mixture is 20% acid? (a) 420 L (b) 480 L (c) 500 L "
            "(d) 560 L")
    from backend.its.solver.answer_pipeline import answer
    r = answer(full)
    assert r.label == "VERIFIED"
    assert ("480" in (r.answer or "")) or ("option" in (r.answer or ""))


def test_stem_that_does_not_compute_stays_guided():
    from backend.its.solver.answer_pipeline import answer
    r = answer("Which of the following is true about voting rights in "
               "2019? (a) 1 (b) 2 (c) 3 (d) 4")
    assert r.label == "GUIDED_PRACTICE"
