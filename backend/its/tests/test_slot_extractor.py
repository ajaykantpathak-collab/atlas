"""Tests for slot_extractor.py (Stage 2: text -> structured slots).

One failing row = one regression.  Every expected value below is
hand-computed: slots must come from numbers VERBATIM in the text, the
k-th number fills the k-th template role, labeled bindings beat
positional, and every absurd reading must honestly refuse (None).
"""
import json
import os

import pytest

from backend.its.solver.slot_extractor import (
    extract_slots,
    extract_slots_detailed,
    extract_list_slots,
    strip_answer_tail,
)

_COMPETENCY_DIR = os.path.normpath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "competency"))


def concept(chapter_file: str, cid: str) -> dict:
    with open(os.path.join(_COMPETENCY_DIR, chapter_file),
              encoding="utf-8") as f:
        cat = json.load(f)
    return {c["id"]: c for c in cat["concepts"]}[cid]


PARALLELOGRAM = concept(
    "catalog_class7_maths_ch9_perimeter_area.json", "c7m9.1.1")
TRIANGLE = concept(
    "catalog_class7_maths_ch9_perimeter_area.json", "c7m9.2.1")
EXPONENTS = concept(
    "catalog_class7_maths_ch11_exponents_powers.json", "c7m11.2.1")
SIMPLE_INTEREST = concept(
    "catalog_class7_maths_ch7_comparing_quantities.json", "c7m7.4.1")
FRACTION_WHOLE = concept(
    "catalog_class7_maths_ch2_fractions_decimals.json", "c7m2.1.1")
EQUATION_WORD = concept(
    "catalog_class7_maths_ch4_simple_equations.json", "c7m4.6.1")
PROBABILITY = concept(
    "catalog_class7_maths_ch3_data_handling.json", "c7m3.6.1")
DECIMAL_MULT = concept(
    "catalog_class7_maths_ch2_fractions_decimals.json", "c7m2.3.1")
PROFIT_LOSS = concept(
    "catalog_class7_maths_ch7_comparing_quantities.json", "c7m7.3.1")
FENCING = concept(
    "catalog_class7_maths_ch9_perimeter_area.json", "c7m9.3.3")
CIRCUMFERENCE = concept(
    "catalog_class7_maths_ch9_perimeter_area.json", "c7m9.3.1")


# ------------------------------------------------------------------ #
# Successful extractions (roles come from the concept, values from text)
# ------------------------------------------------------------------ #

class TestExtractionSuccess:
    def test_labeled_beats_positional_parallelogram(self):
        slots = extract_slots(
            "base = 8 cm, height = 5 cm. Find the area of the "
            "parallelogram.", PARALLELOGRAM)
        assert slots == {"b": 8.0, "h": 5.0}

    def test_exponent_positional_roles(self):
        # roles a (base) and m (exponent) from the catalog's own
        # extracted_variables; 2 -> base, 6 -> exponent
        slots = extract_slots("Evaluate 2 raised to the power 6.",
                              EXPONENTS)
        assert slots == {"a": 2.0, "m": 6.0}

    def test_word_exponent_cubed(self):
        slots = extract_slots("What is 5 cubed?", EXPONENTS)
        assert slots == {"a": 5.0, "m": 3.0}

    def test_simple_interest_labeled(self):
        slots = extract_slots(
            "principal = 8000, rate = 5, time = 2. Find the interest.",
            SIMPLE_INTEREST)
        assert slots == {"principal": 8000.0, "rate": 5.0, "time": 2.0}

    def test_simple_interest_positional_canonical_order(self):
        # canonical order from "I = (P x R x T) / 100":
        # principal, rate, time
        slots = extract_slots(
            "Find the simple interest on 8000 at 5 per cent per annum "
            "for 2 years.", SIMPLE_INTEREST)
        assert slots == {"principal": 8000.0, "rate": 5.0, "time": 2.0}

    def test_fraction_by_whole_number(self):
        # n x (a/b): 3/4 of 21 -> a=3, b=4, n=21
        slots = extract_slots("Find 3/4 of 21.", FRACTION_WHOLE)
        assert slots == {"a": 3.0, "b": 4.0, "n": 21.0}

    def test_simple_equation_word_problem(self):
        # catalog example: multiplier=3, addend=11, total=32
        slots = extract_slots(
            "The sum of three times a number and 11 is 32. Find the "
            "number.", EQUATION_WORD)
        assert slots == {"multiplier": 3.0, "addend": 11.0, "total": 32.0}

    def test_probability_labeled_outcomes(self):
        slots = extract_slots(
            "favourable outcomes = 3, total outcomes = 6. find the "
            "probability.", PROBABILITY)
        assert slots == {"favorable": 3.0, "total": 6.0}

    def test_triangle_area_from_phrasing(self):
        slots = extract_slots(
            "Find the area of a triangle with base 6 cm and height 8 "
            "cm.", TRIANGLE)
        assert slots == {"b": 6.0, "h": 8.0}

    def test_spans_are_verbatim(self):
        det = extract_slots_detailed(
            "base = 8 cm, height = 5 cm. Find the area of the "
            "parallelogram.", PARALLELOGRAM)
        text = "base = 8 cm, height = 5 cm. Find the area of the " \
               "parallelogram."
        assert det is not None and det.labeled
        for name, (start, end) in det.spans.items():
            token = text[start:end]
            assert float(token) == det.values[name]

    def test_list_slots_for_mean(self):
        data = extract_list_slots(
            "Find the mean of 4, 6, 8 and 10.",
            concept("catalog_class7_maths_ch3_data_handling.json",
                    "c7m3.2.1"))
        assert data == {"values": [4.0, 6.0, 8.0, 10.0]}


# ------------------------------------------------------------------ #
# Honest refusals (guards + ambiguity)
# ------------------------------------------------------------------ #

class TestExtractionRefusals:
    def test_too_few_numbers_refuses(self):
        assert extract_slots(
            "Find the area of the parallelogram.", PARALLELOGRAM) is None

    def test_negative_length_refuses(self):
        assert extract_slots(
            "Find the area of a triangle with base -6 cm and height 8 "
            "cm.", TRIANGLE) is None

    def test_fractional_exponent_refuses(self):
        assert extract_slots(
            "Evaluate 2 raised to the power 1.5.", EXPONENTS) is None

    def test_exponent_out_of_range_refuses(self):
        assert extract_slots(
            "Evaluate 10 raised to the power 500.", EXPONENTS) is None

    def test_more_numbers_than_roles_refuses(self):
        # template order undefined: 2 numbers for 1 role
        assert extract_slots(
            "Find the area of a circle of radius 7 and also 3.",
            concept("catalog_class7_maths_ch9_perimeter_area.json",
                    "c7m9.3.2")) is None

    def test_absurd_rate_refuses(self):
        assert extract_slots(
            "Find the simple interest on 5000 at 5000 per cent for 2 "
            "years.", SIMPLE_INTEREST) is None

    def test_probability_favorable_above_total_refuses(self):
        assert extract_slots(
            "favourable outcomes = 9, total outcomes = 6. find the "
            "probability.", PROBABILITY) is None

    def test_negative_money_refuses(self):
        assert extract_slots(
            "Find the simple interest on -4000 at 5 per cent for 2 "
            "years.", SIMPLE_INTEREST) is None


# ------------------------------------------------------------------ #
# Embedded answer-key tails (root-cause fix: mined texts that carry
# their own answer).  The tail's numbers must never become slot values,
# and "Ans" must never act as a label -- in extraction AND in the miner
# (strip_answer_tail is the shared implementation).
# ------------------------------------------------------------------ #

class TestAnswerTailGuard:
    def test_strip_removes_simple_tail(self):
        assert strip_answer_tail(
            "A car runs 16 km using 1 litre of petrol. How far will it "
            "go using 2 litres? Ans: 44 km.") == \
            "A car runs 16 km using 1 litre of petrol. How far will it " \
            "go using 2 litres?"

    def test_strip_is_idempotent(self):
        t = "Find the total weight of 0.75 kg tomatoes and 0.05 kg " \
            "ginger. Ans: 1.3 kg"
        once = strip_answer_tail(t)
        assert strip_answer_tail(once) == once

    def test_strip_refuses_interleaved_multi_part(self):
        # answers between sub-questions: nothing is a tail
        t = ("Write in form (a) One crore one lakh one thousand Ten "
             "Ans: 1,01,01,010 (b) One billion one million one thousand "
             "one Ans: 1,00,10,01,001")
        assert strip_answer_tail(t) == t

    def test_strip_keeps_answer_the_following(self):
        # "Ans" starting the word "Answer" is task text, not a key
        t = "Fill in the blanks below. Answer the following questions."
        assert strip_answer_tail(t) == t

    def test_tail_numbers_are_not_slot_values(self):
        slots = extract_slots("Evaluate 3.5 x 1.2. Ans: 4.2",
                              DECIMAL_MULT)
        assert slots == {"a": 3.5, "b": 1.2}

    def test_tail_label_does_not_poison_extraction(self):
        slots = extract_slots(
            "A park has radius 7 m. Ans: 44", CIRCUMFERENCE)
        assert slots == {"r": 7.0}

    def test_extraction_without_tail_still_refuses_on_surplus(self):
        # the guard must not manufacture an extraction: 3 numbers, no
        # tail, 2 roles stays ambiguous
        det = extract_slots_detailed("Evaluate 3.5 x 1.2 and 9.",
                                     DECIMAL_MULT)
        assert det is not None and not det.values


# ------------------------------------------------------------------ #
# Unit-aware disambiguation (root-cause fix: too-many-numbers guard
# firing when surplus numbers carry no unit).  Fires ONLY when exactly
# role-count numbers carry role-consistent units; every other shape
# keeps the honest refusal.
# ------------------------------------------------------------------ #

class TestUnitAwareDisambiguation:
    def test_unit_bearing_subset_rescues_ambiguity(self):
        # 35 m (length) + Rs 20 (money) are the values; 8 rounds (no
        # unit) is a distractor
        slots = extract_slots(
            "Find the cost of fencing a circular park of radius 35 m "
            "at the rate of Rs 20 per metre. A gardener takes 8 rounds "
            "every day.", FENCING)
        assert slots == {"r": 35.0, "rate": 20.0}

    def test_too_many_unit_numbers_still_refuse(self):
        assert extract_slots(
            "Find the cost of fencing a circular park of radius 35 m "
            "and a second park of radius 12 m at the rate of Rs 20 per "
            "metre.", FENCING) is None

    def test_unitless_surplus_still_refuses(self):
        assert extract_slots(
            "Find the cost of fencing a circular park of radius 35 at "
            "the rate of 20. A gardener takes 8 rounds every day.",
            FENCING) is None

    def test_flattened_mixed_fractions_refuse(self):
        # "3 3 4 ft" means 3-3/4 ft (fraction-deck shorthand): parsing
        # is unsafe, so the reading refuses even though unit tags would
        # nominally isolate two numbers
        det = extract_slots_detailed(
            "Find the area of a parallelogram with base 3 3 4 cm and "
            "height 9 3 5 cm.", PARALLELOGRAM)
        assert det is not None and not det.values
        assert det.reason.startswith("ambiguous")


# ------------------------------------------------------------------ #
# Synonym expansion (root-cause fix: labeled slots synonym-missed).
# Bindings stay template-gated: a synonym only binds when the routed
# concept's roles actually contain the target slot.
# ------------------------------------------------------------------ #

class TestSynonymExpansion:
    def test_cost_binds_cp(self):
        slots = extract_slots(
            "cost = 40, selling price = 50. Find the profit per cent.",
            PROFIT_LOSS)
        assert slots == {"cp": 40.0, "sp": 50.0}

    def test_parallel_side_binds_base(self):
        slots = extract_slots(
            "parallel side = 12, height = 8. Find the area of the "
            "parallelogram.", PARALLELOGRAM)
        assert slots == {"b": 12.0, "h": 8.0}

    def test_sum_of_money_binds_principal(self):
        slots = extract_slots(
            "A sum of money = 5000 is lent at rate = 5 for time = 2 "
            "years. Find the interest.", SIMPLE_INTEREST)
        assert slots == {"principal": 5000.0, "rate": 5.0, "time": 2.0}

    def test_cost_does_not_bind_without_cp_role(self):
        assert extract_slots(
            "cost = 5. Find the area of the parallelogram.",
            PARALLELOGRAM) is None
