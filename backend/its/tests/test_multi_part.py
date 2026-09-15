"""test_multi_part.py -- batteries for multi-part question splitting.

Board questions routinely carry sub-parts ("(a) ... (b) ...",
"(i) ... (ii) ...", "a) ... b) ..." after a colon-ish lead-in) or an
OR-split between two alternative readings.  The splitter must yield
standalone sub-questions with the numeric setup preserved, never fire
on plain single questions, and never fire on MCQ option lists (those
belong to the MCQ option gate).

Run:
    cd /d/platform && python -m pytest backend/its/tests/test_multi_part.py -q
"""

from __future__ import annotations

from backend.its.solver.multi_part import split_multi_part, try_multi_part


def _solve(text):
    from backend.its.solver.answer_pipeline import _answer_core
    return _answer_core(text)


_PHYSICS = (
    "In an electric circuit shown, a network of resistors is connected "
    "across a cell of emf 2V and internal resistance 0.5 ohm (a) What is "
    "the total current drawn from the battery by the circuit? (b) What is "
    "the power consumed by the circuit from the battery?")

_PROBABILITY = (
    "Out of 100 students, two sections of 40 and 60 are formed. If you "
    "and your friend are among the 100 students, what is the probability "
    "that (a) you both enter the same section? (b) you both enter the "
    "different sections?")

_OR_PRODUCTION = (
    "The production of TV sets in a factory increases uniformly by a "
    "fixed number every year. It produced 7000 sets in the 5th year and "
    "10500 sets in the 8th year. Find the production in the 10th year. "
    "OR Find the total production in the first 10 years.")

_ROMAN = (
    "The zeroes of a quadratic polynomial are 3 and -4. (i) Form the "
    "polynomial. (ii) Find the sum of its zeroes.")

_BARE = (
    "Two friends share marbles in the ratio 3:5: a) Find the share of "
    "the first friend if the total is 80. b) Find the share of the "
    "second friend.")


# ---- splitting: (a)/(b) enumerators ----

def test_split_physics_circuit_two_parts():
    r = split_multi_part(_PHYSICS)
    assert r is not None and r.kind == "ab"
    assert [p.label for p in r.parts] == ["a", "b"]
    # shared numeric setup stays in the context
    assert "emf 2V" in r.context and "0.5 ohm" in r.context
    assert r.parts[0].raw == ("What is the total current drawn from the "
                              "battery by the circuit?")
    assert r.parts[1].raw == ("What is the power consumed by the circuit "
                              "from the battery?")
    for p in r.parts:
        # every part is standalone: context + own text, setup not dropped
        assert p.text.startswith(r.context)
        assert "0.5 ohm" in p.text
        assert "(a)" not in p.text and "(b)" not in p.text


def test_split_probability_two_parts():
    r = split_multi_part(_PROBABILITY)
    assert r is not None and r.kind == "ab"
    assert [p.label for p in r.parts] == ["a", "b"]
    assert "two sections of 40 and 60" in r.context
    assert r.parts[0].raw == "you both enter the same section?"
    assert r.parts[1].raw == "you both enter the different sections?"
    for p in r.parts:
        assert "100 students" in p.text and "40 and 60" in p.text


# ---- splitting: roman enumerators ----

def test_split_roman_two_parts():
    r = split_multi_part(_ROMAN)
    assert r is not None and r.kind == "roman"
    assert [p.label for p in r.parts] == ["i", "ii"]
    assert r.parts[0].raw == "Form the polynomial."
    assert r.parts[1].raw == "Find the sum of its zeroes."
    # the setup sentence is carried into every standalone part
    assert "3 and -4" in r.parts[0].text
    assert "3 and -4" in r.parts[1].text


# ---- splitting: bare letters after a colon-ish lead-in ----

def test_split_bare_letters_after_colon():
    r = split_multi_part(_BARE)
    assert r is not None and r.kind == "ab"
    assert [p.label for p in r.parts] == ["a", "b"]
    assert "ratio 3:5" in r.context
    assert "first friend" in r.parts[0].raw
    assert "second friend" in r.parts[1].raw


# ---- splitting: OR alternatives ----

def test_split_or_production_alternatives():
    r = split_multi_part(_OR_PRODUCTION)
    assert r is not None and r.kind == "or"
    assert [p.label for p in r.parts] == ["1", "2"]
    # the shared preamble (both production figures) travels with BOTH
    # alternative readings -- numeric setup never dropped
    for p in r.parts:
        assert "7000" in p.text and "10500" in p.text
    assert r.parts[0].raw.startswith("Find the production in the 10th year")
    assert "first 10 years" in r.parts[1].raw


def test_split_or_simple_sides():
    r = split_multi_part("Find the value of 15 + 27. OR Find the value "
                         "of 40 - 13.")
    assert r is not None and r.kind == "or"
    assert [p.label for p in r.parts] == ["1", "2"]


# ---- traps: things that must NEVER split ----

def test_mcq_value_options_not_split():
    mcq = ("A manufacturer has 600 litres of a 12% acid solution. How "
           "many litres of a 30% acid solution must be added so that "
           "the mixture is 20% acid? (a) 420 L (b) 480 L (c) 500 L "
           "(d) 560 L")
    assert split_multi_part(mcq) is None


def test_question_mark_before_short_options_not_split():
    mcq = ("What is the speed of the train? (a) 60 km/h (b) 80 km/h "
           "(c) 90 km/h (d) 120 km/h")
    assert split_multi_part(mcq) is None


def test_citation_style_markers_not_split():
    # "(a)" and "(b)" inside one open sentence are mentions, not parts
    q = ("Rakesh (a) and Suresh (b) together have 45 marbles. How many "
         "marbles does Rakesh have if he has 5 more than Suresh?")
    assert split_multi_part(q) is None


def test_single_marker_not_split():
    q = "Solve x + 2 = 5 for the case (a) where x is a positive integer."
    assert split_multi_part(q) is None


def test_plain_single_question_untouched():
    assert split_multi_part("Find the value of 15 + 27.") is None
    assert split_multi_part("A train covers 360 km in 4 hours. Find its "
                            "speed.") is None


def test_nonconsecutive_markers_not_split():
    # (a) then (c): the chain is broken -> honest refusal, no guessing
    q = ("A sum of money doubles in 5 years. (a) Find the rate of "
         "interest. Later work in part (c) uses this rate.")
    assert split_multi_part(q) is None


# ---- try_multi_part end-to-end (injected core solve callable) ----

def test_try_multi_part_all_verified():
    promo = try_multi_part(
        "(a) Find the value of 15 + 27. (b) Find the value of 40 - 13.",
        _solve)
    assert promo is not None and promo["kind"] == "ab"
    assert promo["all_verified"] is True
    assert promo["n_verified"] == 2
    a, b = promo["parts"]
    assert a["label"] == "a" and a["label_full"] == "(a)"
    assert b["label"] == "b" and b["label_full"] == "(b)"
    assert a["verified"] is True and b["verified"] is True
    assert a["numeric"] == 42.0 and b["numeric"] == 27.0
    assert "42" in str(a["answer"]) and "27" in str(b["answer"])
    # no cross-part answer bleed
    assert a["numeric"] != b["numeric"]
    assert a["refusal"] is None and b["refusal"] is None


def test_try_multi_part_or_both_verified():
    promo = try_multi_part(
        "Find the value of 15 + 27. OR Find the value of 40 - 13.", _solve)
    assert promo is not None and promo["kind"] == "or"
    assert promo["all_verified"] is True
    assert [p["label"] for p in promo["parts"]] == ["1", "2"]
    assert [p["numeric"] for p in promo["parts"]] == [42.0, 27.0]


def test_try_multi_part_honest_refusal():
    promo = try_multi_part(
        "(a) Find the value of 15 + 27. (b) What is the meaning of life?",
        _solve)
    assert promo is not None
    # one guided part poisons the whole promotion -- never fabricate
    assert promo["all_verified"] is False
    assert promo["n_verified"] == 1
    a, b = promo["parts"]
    # the verified part is still listed with its answer
    assert a["verified"] is True and a["numeric"] == 42.0
    assert b["verified"] is False
    assert b["answer"] is None and b["numeric"] is None
    assert b["refusal"]


def test_try_multi_part_plain_question_returns_none():
    assert try_multi_part("Find the value of 15 + 27.", _solve) is None


def test_try_multi_part_labels_follow_split_labels():
    promo = try_multi_part(_ROMAN, _solve)
    assert promo is not None and promo["kind"] == "roman"
    assert [p["label"] for p in promo["parts"]] == ["i", "ii"]
    assert [p["label_full"] for p in promo["parts"]] == ["(i)", "(ii)"]
