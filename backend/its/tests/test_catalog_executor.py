"""Tests for catalog_executor.py (Stage 4 gap: execute the catalog).

Route-free: every row calls execute_concept (or extract_slots first)
directly with a REAL catalog concept dict.  Every expected value is
hand-computed independently.  One failing row = one regression.
ok=False rows are honest refusals -- never a guessed value.
"""
import json
import math
import os

import pytest

from backend.its.solver.slot_extractor import extract_slots
from backend.its.solver.catalog_executor import (
    execute_concept,
    safe_eval,
    _EvalError,
)

_COMPETENCY_DIR = os.path.normpath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "competency"))

_CH = {
    2: "catalog_class7_maths_ch2_fractions_decimals.json",
    3: "catalog_class7_maths_ch3_data_handling.json",
    4: "catalog_class7_maths_ch4_simple_equations.json",
    5: "catalog_class7_maths_ch5_lines_angles.json",
    6: "catalog_class7_maths_ch6_triangle_properties.json",
    7: "catalog_class7_maths_ch7_comparing_quantities.json",
    9: "catalog_class7_maths_ch9_perimeter_area.json",
    11: "catalog_class7_maths_ch11_exponents_powers.json",
}

_CONCEPT_CACHE = {}


def concept(chapter: int, cid: str) -> dict:
    key = (chapter, cid)
    if key not in _CONCEPT_CACHE:
        with open(os.path.join(_COMPETENCY_DIR, _CH[chapter]),
                  encoding="utf-8") as f:
            cat = json.load(f)
        _CONCEPT_CACHE[key] = {c["id"]: c for c in cat["concepts"]}[cid]
    return _CONCEPT_CACHE[key]


def run(chapter: int, cid: str, text: str, slots=None):
    con = concept(chapter, cid)
    s = slots if slots is not None else extract_slots(text, con)
    return execute_concept(con, s if s is not None else {}, text)


# ------------------------------------------------------------------ #
# Safe evaluator
# ------------------------------------------------------------------ #

class TestSafeEvaluator:
    def test_arithmetic_whitelist(self):
        assert safe_eval("2 ** 10", {}) == 1024.0
        assert safe_eval("(1/2) * 6 * 8", {}) == 24.0
        assert safe_eval("sqrt(16)", {}) == 4.0
        assert safe_eval("max(3, 7) - min(3, 7)", {}) == 4.0
        assert safe_eval("2 * (22/7) * 7", {}) == pytest.approx(44.0)

    def test_rejects_non_arithmetic(self):
        with pytest.raises(_EvalError):
            safe_eval("__import__('os')", {})
        with pytest.raises(_EvalError):
            safe_eval("(lambda: 1)()", {})
        with pytest.raises(_EvalError):
            safe_eval("'a' + 'b'", {})

    def test_division_by_zero_refuses(self):
        with pytest.raises(_EvalError):
            safe_eval("5 / 0", {})

    def test_unknown_symbol_refuses(self):
        with pytest.raises(_EvalError):
            safe_eval("foo * 2", {})


# ------------------------------------------------------------------ #
# Ch11 exponents and powers (kernel)
# ------------------------------------------------------------------ #

class TestExponents:
    def test_exponent_evaluation(self):
        res = run(11, "c7m11.2.1", "What is 2 raised to the power 6?")
        assert res.ok and res.value == 64.0          # 2^6 = 64

    def test_word_exponent(self):
        res = run(11, "c7m11.2.1", "What is 5 cubed?")
        assert res.ok and res.value == 125.0         # 5^3 = 125

    def test_multiplying_powers_same_base(self):
        res = run(11, "c7m11.3.1", "Simplify 2^5 x 2^3")
        assert res.ok and res.value == 256.0         # 2^(5+3) = 256

    def test_dividing_powers_same_base(self):
        res = run(11, "c7m11.3.2", "Simplify 2^9 / 2^3")
        assert res.ok and res.value == 64.0          # 2^(9-3) = 64

    def test_power_of_a_power(self):
        res = run(11, "c7m11.3.3", "Simplify (2^3)^2")
        assert res.ok and res.value == 64.0          # 2^(3*2) = 64

    def test_multiplying_powers_same_exponent(self):
        res = run(11, "c7m11.3.4", "Simplify 2^3 x 3^3")
        assert res.ok and res.value == 216.0         # (2*3)^3 = 216

    def test_dividing_powers_same_exponent(self):
        res = run(11, "c7m11.3.5", "Simplify 10^4 / 5^4")
        assert res.ok and res.value == 16.0          # (10/5)^4 = 16

    def test_zero_exponent(self):
        res = run(11, "c7m11.3.6", "Find the value of 7 to the power 0")
        assert res.ok and res.value == 1.0           # a^0 = 1

    def test_zero_exponent_multibase_refuses(self):
        # 2^0 + 3^0 + 4^0 = 3, not 1 -- the rule is not the answer here
        res = run(11, "c7m11.3.6",
                  "What is 2 to the 0 plus 3 to the 0 plus 4 to the 0?",
                  slots={})
        assert not res.ok and res.value is None

    def test_result_magnitude_guard_refuses(self):
        res = run(11, "c7m11.2.1", "Evaluate 10 raised to the power 50.")
        assert not res.ok and res.value is None


# ------------------------------------------------------------------ #
# Ch9 perimeter and area (kernel + chaining)
# ------------------------------------------------------------------ #

class TestPerimeterArea:
    def test_triangle_area(self):
        res = run(9, "c7m9.2.1",
                  "Find the area of a triangle with base 6 cm and "
                  "height 8 cm.")
        assert res.ok and res.value == 24.0          # 0.5 * 6 * 8

    def test_triangle_find_base(self):
        res = run(9, "c7m9.2.1",
                  "area = 24 cm^2, height = 8 cm. find base.")
        assert res.ok and res.value == 6.0           # 2*24/8

    def test_parallelogram_area_labeled(self):
        res = run(9, "c7m9.1.1",
                  "base = 8 cm, height = 5 cm. Find the area of the "
                  "parallelogram.")
        assert res.ok and res.value == 40.0          # 8 * 5

    def test_circumference_from_radius(self):
        res = run(9, "c7m9.3.1",
                  "Find the circumference of a circle of radius 7 cm.")
        assert res.ok
        assert res.value == pytest.approx(2 * math.pi * 7)

    def test_circle_area_from_diameter(self):
        res = run(9, "c7m9.3.2",
                  "Find the area of a circle of diameter 14 m.")
        assert res.ok
        assert res.value == pytest.approx(math.pi * 49)

    def test_cost_of_polishing_chains_area_times_rate(self):
        # chain: area = b x h = 60, then cost = rate x area = 240
        res = run(9, "c7m9.3.3",
                  "A parallelogram has base 10 cm and height 6 cm. "
                  "Find the cost of polishing it at 4 per sq cm.")
        assert res.ok and res.value == 240.0
        assert any("area" in s for s in res.steps)
        assert any("cost" in s.lower() for s in res.steps)

    def test_cost_of_fencing_chains_circumference_times_rate(self):
        res = run(9, "c7m9.3.3",
                  "A circular garden has radius 7 m. Find the cost of "
                  "fencing it at 5 per metre.")
        assert res.ok
        assert res.value == pytest.approx(2 * math.pi * 7 * 5)


# ------------------------------------------------------------------ #
# Ch7 comparing quantities (kernel dispatch: I / amount / R / P / T)
# ------------------------------------------------------------------ #

class TestComparingQuantities:
    def test_simple_interest(self):
        res = run(7, "c7m7.4.1",
                  "Find the simple interest on 8000 at 5 per cent per "
                  "annum for 2 years.")
        assert res.ok and res.value == 800.0         # 8000*5*2/100

    def test_simple_interest_amount(self):
        res = run(7, "c7m7.4.1",
                  "Find the amount to be paid on a loan of 8000 at 5 "
                  "per cent for 2 years.")
        assert res.ok and res.value == 8800.0        # 8000 + 800

    def test_simple_interest_labeled(self):
        res = run(7, "c7m7.4.1",
                  "principal = 8000, rate = 5, time = 2. Find the "
                  "interest.")
        assert res.ok and res.value == 800.0

    def test_find_rate(self):
        res = run(7, "c7m7.4.1",
                  "pays interest 750 for 2 years on 4500. find the "
                  "rate.")
        # R = 100*I/(P*T) = 75000/9000 = 8.333...
        assert res.ok
        assert res.value == pytest.approx(100.0 * 750 / (4500.0 * 2.0))

    def test_find_principal(self):
        res = run(7, "c7m7.4.1",
                  "interest 45 for one year at 9 per cent. find the "
                  "sum.")
        # P = 100*I/(R*T) = 4500/9 = 500
        assert res.ok and res.value == pytest.approx(500.0)

    def test_decimal_rate(self):
        res = run(7, "c7m7.4.1",
                  "Find the interest on 6050 at 6.5 per cent for 3 "
                  "years.")
        # 6050 * 6.5 * 3 / 100
        assert res.ok and res.value == pytest.approx(1179.75)

    def test_percent_of_a_number(self):
        res = run(7, "c7m7.2.2", "Find 15 per cent of 250.")
        assert res.ok and res.value == 37.5          # 0.15 * 250

    def test_find_whole_from_part(self):
        res = run(7, "c7m7.2.2",
                  "Meeta saves 4000 which is 10 per cent of her "
                  "salary. Find her salary.")
        assert res.ok and res.value == 40000.0       # 4000 * 100 / 10

    def test_profit_amount(self):
        res = run(7, "c7m7.3.1",
                  "A machine bought for 12000 is sold for 13500. Find "
                  "the profit or loss.")
        assert res.ok and res.value == 1500.0        # 13500 - 12000

    def test_loss_percentage(self):
        res = run(7, "c7m7.3.2",
                  "bought for 375 sold for 400 find gain percentage.")
        assert res.ok
        assert res.value == pytest.approx(100.0 * 25 / 375)

    def test_cost_price_from_sp_and_loss(self):
        res = run(7, "c7m7.3.2",
                  "A washing machine was sold for 13500 at a loss of "
                  "20 per cent. Find the cost price.")
        assert res.ok and res.value == pytest.approx(10800.0)  # 13500*0.8

    def test_percentage_increase(self):
        res = run(7, "c7m7.2.4",
                  "A population increased from 550000 to 605000. Find "
                  "the percentage increase.")
        assert res.ok
        assert res.value == pytest.approx(100.0 * 55000 / 550000)


# ------------------------------------------------------------------ #
# Ch2 fractions and decimals (kernel)
# ------------------------------------------------------------------ #

class TestFractionsDecimals:
    def test_fraction_of_whole(self):
        res = run(2, "c7m2.1.1", "Find 3/4 of 21.")
        assert res.ok and res.value == pytest.approx(15.75)  # 3*21/4

    def test_reciprocal(self):
        res = run(2, "c7m2.2.1", "Find the reciprocal of 3/4.")
        assert res.ok and res.value == pytest.approx(4.0 / 3.0)

    def test_divide_fraction_by_fraction(self):
        res = run(2, "c7m2.2.4", "Divide 3/4 by 2/5.")
        assert res.ok and res.value == pytest.approx(15.0 / 8.0)


# ------------------------------------------------------------------ #
# Ch3 data handling (list slots, probability)
# ------------------------------------------------------------------ #

class TestDataHandling:
    def test_mean(self):
        res = run(3, "c7m3.2.1", "Find the mean of 4, 6, 8 and 10.")
        assert res.ok and res.value == 7.0           # 28 / 4

    def test_range(self):
        res = run(3, "c7m3.2.2", "Find the range of 25, 18, 30 and 12.")
        assert res.ok and res.value == 18.0          # 30 - 12

    def test_median_even(self):
        res = run(3, "c7m3.4.1", "Find the median of 7, 3, 9 and 5.")
        assert res.ok and res.value == 6.0           # (5+7)/2

    def test_mode(self):
        res = run(3, "c7m3.3.1",
                  "Find the mode of 2, 3, 3, 5, 7 and 3.")
        assert res.ok and res.value == 3.0

    def test_mode_without_repeat_refuses(self):
        res = run(3, "c7m3.3.1", "Find the mode of 2, 3, 5 and 7.")
        assert not res.ok                            # no unique mode

    def test_probability_die_even(self):
        res = run(3, "c7m3.6.1",
                  "A die is rolled once. Find the probability of "
                  "getting an even number.", slots={})
        assert res.ok and res.value == pytest.approx(3.0 / 6.0)

    def test_probability_labeled(self):
        res = run(3, "c7m3.6.1",
                  "favourable outcomes = 3, total outcomes = 6. find "
                  "the probability.")
        assert res.ok and res.value == pytest.approx(0.5)

    def test_probability_favorable_above_total_refuses(self):
        res = run(3, "c7m3.6.1",
                  "find the probability.", slots={"favorable": 9.0,
                                                 "total": 6.0})
        assert not res.ok and res.value is None


# ------------------------------------------------------------------ #
# Ch5 / ch6 geometry kernels
# ------------------------------------------------------------------ #

class TestGeometry:
    def test_complement(self):
        res = run(5, "c7m5.2.1",
                  "An angle is 35 degrees. Find its complement.")
        assert res.ok and res.value == 55.0          # 90 - 35

    def test_supplement(self):
        res = run(5, "c7m5.2.2",
                  "An angle measures 60 degrees. Find its supplement.")
        assert res.ok and res.value == 120.0         # 180 - 60

    def test_pythagoras_hypotenuse(self):
        res = run(6, "c7m6.8.1",
                  "The legs of a right triangle are 3 cm and 4 cm. "
                  "Find the hypotenuse.")
        assert res.ok and res.value == pytest.approx(5.0)

    def test_exterior_angle(self):
        res = run(6, "c7m6.4.1",
                  "Two interior opposite angles of a triangle are 50 "
                  "and 60. Find the exterior angle.")
        assert res.ok and res.value == 110.0         # 50 + 60

    def test_third_angle(self):
        res = run(6, "c7m6.5.1",
                  "Two angles of a triangle are 60 and 70. Find the "
                  "third angle.")
        assert res.ok and res.value == 50.0          # 180 - 60 - 70


# ------------------------------------------------------------------ #
# Honest refusals: verify_property, no compute path
# ------------------------------------------------------------------ #

class TestHonestRefusals:
    def test_verify_property_refuses_with_exact_reason(self):
        con = concept(5, "c7m5.2.4")   # vertically opposite angles
        res = execute_concept(con, {"angle": 50.0},
                              "Two lines intersect and one angle is 50.")
        assert not res.ok
        assert res.value is None
        assert res.reason == "verify_property concept: method only"

    def test_equation_word_problem_solves(self):
        # solving 3x + 11 = 32: kernel now handles multiplier*x + addend = total
        res = run(4, "c7m4.6.1",
                  "The sum of three times a number and 11 is 32. Find "
                  "the number.")
        assert res.ok and res.value == 7.0

    def test_missing_slots_refuse(self):
        res = run(7, "c7m7.4.1", "Find the simple interest.",
                  slots={})
        assert not res.ok and res.value is None


# ------------------------------------------------------------------ #
# Steps-chain interpreter (catalog's own compute fields)
# ------------------------------------------------------------------ #

class TestStepChain:
    def test_chained_steps_reference_earlier_outputs(self):
        # alias convention: step 2's "rate * area" resolves "area" from
        # step 1's action text "find area"
        con = {
            "id": "stub.chain", "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "find area", "compute": "b * h"},
                {"step": 2, "action": "find cost",
                 "compute": "rate * area"},
            ],
        }
        res = execute_concept(con, {"b": 4.0, "h": 5.0, "rate": 2.0},
                              "find the cost")
        assert res.ok and res.value == 40.0
        assert res.source == "steps"

    def test_intermediate_only_chain_refuses(self):
        # a chain that ends in a non-compute "write the result" step is
        # an intermediate value (e.g. the exponent m+n of a law): never
        # present it as the final answer
        con = {
            "id": "stub.intermediate", "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "add exponents", "compute": "m + n"},
                {"step": 2, "action": "write a^(m+n)"},
            ],
        }
        res = execute_concept(con, {"m": 2.0, "n": 3.0}, "simplify")
        assert not res.ok and res.value is None

    def test_explicit_binding_in_compute(self):
        con = {
            "id": "stub.bind", "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "find area",
                 "compute": "area = b * h"},
                {"step": 2, "action": "find cost",
                 "compute": "rate * area"},
            ],
        }
        res = execute_concept(con, {"b": 3.0, "h": 4.0, "rate": 10.0},
                              "find the cost")
        assert res.ok and res.value == 120.0

    def test_template_ladder_uses_catalog_dsl(self):
        # a concept with no kernel and no solution_steps compute, whose
        # worked example carries the compute expression
        con = {
            "id": "c7mtest", "solution_type": "compute",
            "solution_steps": [{"step": 1, "action": "apply formula"}],
        }
        examples = [{
            "id": "ex1", "concept": "c7mtest",
            "question_pattern":
                "circumference of circle of diameter {d} cm (pi = 3.14)",
            "extracted_variables": {"d": "diameter"},
            "solution_template": [
                {"step": 1, "action": "apply formula",
                 "compute": "3.14 * d"}],
        }]
        res = execute_concept(
            con, {"d": 14.0},
            "circumference of circle of diameter 14 cm (pi = 3.14)",
            worked_examples=examples)
        assert res.ok and res.value == pytest.approx(43.96)
        assert res.source == "template"


# ------------------------------------------------------------------ #
# Formula-field ladder (multi-equation resolution)
# ------------------------------------------------------------------ #

class TestFormulaLadder:
    def test_si_formula_resolves_interest(self):
        con = concept(7, "c7m7.4.1")
        res = execute_concept(
            con, {"principal": 10000.0, "rate": 5.0, "time": 2.0},
            "Find the interest.")
        assert res.ok and res.value == pytest.approx(1000.0)

    def test_si_formula_resolves_amount_via_inter_equation(self):
        con = concept(7, "c7m7.4.1")
        res = execute_concept(
            con, {"principal": 10000.0, "rate": 5.0, "time": 2.0},
            "Find the amount to be paid.")
        assert res.ok and res.value == pytest.approx(11000.0)
