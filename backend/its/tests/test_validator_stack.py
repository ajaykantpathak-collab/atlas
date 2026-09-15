"""test_validator_stack.py -- batteries for the section-5 gate stack.

One failing row = one gate regression.

Run:
    cd /d/platform && python -m pytest backend/its/tests/test_validator_stack.py -q
"""

from __future__ import annotations

import pytest

from backend.its.solver.validator_stack import (
    Reading,
    SpanValue,
    audit_verbatim,
    plausible,
    relation_whitelisted,
    resolve_readings,
    socratic_payload,
    validate_reading,
)


# ---- gate 1: verbatim audit ----

def test_verbatim_ok():
    ok, v = audit_verbatim([SpanValue(1200, "Rs 1,200"),
                            SpanValue(5, "5%")],
                           "A shopkeeper buys goods for Rs 1,200 and "
                           "marks them up by 5%.")
    assert ok and not v


def test_verbatim_invented_number_dies():
    ok, v = audit_verbatim([SpanValue(999, "Rs 999")],
                           "A shopkeeper buys goods for Rs 1,200.")
    assert not ok and "not found" in v[0]


def test_verbatim_indian_grouping_tolerated():
    ok, v = audit_verbatim([SpanValue(150000, "1,50,000")],
                           "The project cost is 1,50,000 rupees.")
    assert ok and not v


def test_verbatim_empty_span_dies():
    ok, v = audit_verbatim([SpanValue(5, "")], "text 5 text")
    assert not ok


# ---- gate 2: whitelist ----

def test_whitelist_known_relations():
    for rel in ("profit_percent_of_cost", "compound_interest",
                "speed_equals_distance_over_time", "percent_of"):
        assert relation_whitelisted(rel)


def test_whitelist_unknown_flagged():
    assert not relation_whitelisted("vibranium_flux")


# ---- gate 3: plausibility ----

def test_plausibility_probability_range():
    assert plausible("probability", 0.25)
    assert not plausible("probability", 45.0)


def test_plausibility_temperature_floor():
    assert not plausible("temperature", -300.0)
    assert plausible("temperature", 25.0)


def test_plausibility_unknown_dimension_no_opinion():
    assert plausible("teleportation", 99.0)


# ---- gate 4: uniqueness ----

def test_uniqueness_one_reading_answers():
    verdict, r = resolve_readings([Reading("on cost", "24", 24.0)])
    assert verdict == "answer" and r.label == "on cost"


def test_uniqueness_two_readings_socratic():
    verdict, rs = resolve_readings([Reading("profit on cost", "24"),
                                    Reading("profit on selling price",
                                            "20")])
    assert verdict == "socratic" and len(rs) == 2
    payload = socratic_payload(rs)
    assert payload["type"] == "confirm_reading"
    assert len(payload["options"]) == 2


def test_uniqueness_zero_and_many_guided():
    verdict0, why0 = resolve_readings([])
    assert verdict0 == "guided"
    verdict3, why3 = resolve_readings([Reading("a", "1"),
                                       Reading("b", "2"),
                                       Reading("c", "3")])
    assert verdict3 == "guided" and "3" in why3


# ---- combined stack ----

def test_combined_stack_clean_reading():
    ok, problems = validate_reading(
        "simple interest", "simple_interest",
        [SpanValue(5000, "Rs 5000"), SpanValue(4, "4 percent"),
         SpanValue(3, "3 years")],
        "Find the simple interest on Rs 5000 at 4 percent per annum "
        "for 3 years.",
        [("money", 5000.0), ("percent", 4.0), ("time", 3.0)])
    assert ok and not problems


def test_combined_stack_flags_invented_and_implausible():
    ok, problems = validate_reading(
        "compound interest", "compound_interest",
        [SpanValue(5000, "Rs 5000"), SpanValue(4, "invented")],
        "Find the compound interest on Rs 5000.",
        [("percent", 400.0)])
    assert not ok
    assert any("not found" in p for p in problems)
    assert any("implausible" in p for p in problems)
