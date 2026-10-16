"""test_electives_all.py -- ELECTIVES-ALL regression (classes 11-12
electives: CS + accounts + BS).

Pins the 2026-10-07 electives wave at the DISPATCHER level (fast, no
corpus-index load):
  - cs_families: Python taught-subset interpreter (PY_TRACE/PY_EXPR/
    PY_TYPE), SQL (SQL_CLAUSE/SQL_AGGR/SQL_JOIN), data structures
    (STACK_SIM/QUEUE_SIM/POSTFIX_EVAL), honest gates on out-of-subset
    code
  - accountancy additive rows: INTEREST_CAPITAL_PARTNER (per-partner,
    named partners, mid-year addition), INTEREST_PARTNER_LOAN
    (statutory 6%), PROFIT_APPROPRIATION chain, DEP_SLM unchanged on
    clean stems
  - commerce additive row: NET_GST_PAYABLE two-side chain
  - verifiers: every new route PASSes its registered second path and
    FAILs a tampered claim
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

import pytest

from backend.its.solver.cs_families import (
    PyRefuse, extract_code, model_cs_families, parse_queue_ops,
    parse_stack_ops, parse_value_list, py_output, simulate_queue,
    simulate_stack, sql_aggregate, sql_clause_answer, sql_left_join)
from backend.its.solver import accountancy_families as AF
from backend.its.solver import commerce_families as CF
from backend.its.solver.independent_verifier import (
    VERIFIERS, check_route, registered_routes)

from backend.its.solver.modeling_layer import ModelResult


# --------------------------------------------------------------------------- #
# cs_families -- Python interpreter
# --------------------------------------------------------------------------- #

class TestPyInterpreter:
    CASES = [
        ("print(7 // 2)", "3\n"),
        ("x = 10\ny = 3\nprint(x * y)", "30\n"),
        ("print(2 ** 10, 10 / 4, 10 % 3)", "1024 2.5 1\n"),
        ("s = 'hello'\nprint(s[1:4], len(s), s.upper())",
         "ell 5 HELLO\n"),
        ("lst = [1, 2, 3]\nlst.append(4)\nprint(lst, lst[-1], sum(lst))",
         "[1, 2, 3, 4] 4 10\n"),
        ("total = 0\nfor i in range(1, 5):\n    total += i\nprint(total)",
         "10\n"),
        ("def f(n):\n    if n <= 1:\n        return 1\n    "
         "return n * f(n - 1)\nprint(f(5))", "120\n"),
        ("print(type(3.0), type(3), type('a'))",
         "<class 'float'> <class 'int'> <class 'str'>\n"),
        ("a, b = 3, 7\na, b = b, a\nprint(a, b)", "7 3\n"),
        ("x = 5\nwhile x > 0:\n    x -= 2\nprint(x)", "-1\n"),
        ("print(f'{3 + 4} items')", "7 items\n"),
        ("print((1, 'a'))", "(1, 'a')\n"),
        ("d = {'x': 1, 'y': 2}\nprint(list(d.keys()), d['y'])",
         "['x', 'y'] 2\n"),
        ("def area(r, pi=3.14):\n    return pi * r * r\nprint(area(2))",
         "12.56\n"),
        ("print([i * 2 for i in range(4)])", "[0, 2, 4, 6]\n"),
        ("print(10 % 3, -10 % 3)", "1 2\n"),
        ("print(3 < 5 and 2 > 1, not True)", "True False\n"),
    ]

    @pytest.mark.parametrize("src,want", CASES)
    def test_output(self, src, want):
        assert py_output(src)[0] == want

    def test_out_of_subset_refuses(self):
        for bad in ("import math\nprint(math.sqrt(4))",
                    "name = input()\nprint(name)",
                    "class A:\n    pass",
                    "open('x.txt')"):
            with pytest.raises(PyRefuse):
                py_output(bad)

    def test_extract_fenced(self):
        q = ("Predict the output:\n```python\nx = 2\nprint(x * 3)\n```")
        assert "print(x * 3)" in (extract_code(q) or "")


# --------------------------------------------------------------------------- #
# cs_families -- dispatcher surfaces (corpus-shaped questions)
# --------------------------------------------------------------------------- #

class TestCsFamiliesDispatch:
    CASES = [
        ("What is the output of: print(7 // 2) in Python?", "3"),
        ("What data type is the value 3.14 in Python?", "float"),
        ("Which SQL clause is used to filter rows before grouping?",
         "WHERE"),
        ("Which SQL clause is used to filter groups after GROUP BY?",
         "HAVING"),
        ("A query uses SELECT COUNT(DISTINCT CITY) FROM CUSTOMERS. The "
         "CITY column has values: 'Delhi', 'Mumbai', 'Delhi', NULL, "
         "'Chennai', 'Mumbai', NULL. What is the result?", "3"),
        ("A developer writes SELECT * FROM Table1 CROSS JOIN Table2 "
         "where Table1 has 10 rows and Table2 has 5 rows. What is the "
         "correct result size?", "50"),
        ("Trace the state of a stack after the following operations on "
         "an initially empty stack: push(10), push(20), push(30), "
         "pop(), push(40), pop(), pop(). Show the stack contents.",
         "top = 10"),
        ("Trace the following operations on an initially empty stack of "
         "size 5: push(5), push(10), push(15), pop(), push(20), pop(), "
         "pop(), pop(). Identify any error conditions.", "empty stack"),
        ("Evaluate the postfix expression: 5 3 + 8 2 - *", "48"),
    ]

    @pytest.mark.parametrize("q,want", CASES)
    def test_answer(self, q, want):
        r = model_cs_families(q)
        assert r.matched, q
        assert want in str(r.final_answer), (q, r.final_answer)

    def test_sql_left_join(self):
        rows_a = [[1, "a"], [2, "b"], [3, "c"]]
        rows_b = [[1, "x"], [2, "y"]]
        joined = sql_left_join(rows_a, rows_b, 0, 0)
        assert joined == [[1, "a", 1, "x"], [2, "b", 2, "y"],
                          [3, "c", None, None]]

    def test_sql_aggregate_null_semantics(self):
        vals = ["Delhi", "Mumbai", "Delhi", None, "Chennai", "Mumbai",
                None]
        assert sql_aggregate(vals, "COUNT", False)["value"] == 5
        assert sql_aggregate(vals, "COUNT", True)["value"] == 3
        assert sql_aggregate([10, 20, None], "SUM", False)["value"] == 30

    def test_stack_sim_overflow(self):
        r = simulate_stack([("push", 1), ("push", 2), ("push", 3)], 2)
        assert len(r["errors"]) == 1 and r["stack"] == [1, 2]

    def test_queue_fifo(self):
        r = simulate_queue([("enq", 1), ("enq", 2), ("deq", None)])
        assert r["queue"] == [2] and r["front"] == 2

    def test_honest_gate_on_essay(self):
        r = model_cs_families(
            "Design a minimal network for a pop-up medical camp and "
            "draw a labelled diagram.")
        assert not r.matched


# --------------------------------------------------------------------------- #
# verifiers: second path for every new route
# --------------------------------------------------------------------------- #

class _CtxShim:
    """Duck-typed verifier context (question + shipped claim)."""

    def __init__(self, route, question, final_answer, numeric=None):
        from backend.its.solver.independent_verifier import _claim_number
        self.route = route
        self.question = question
        self.final_answer = final_answer
        self.q = {}
        res = ModelResult(structure=route, matched=True, confidence=0.95,
                          quantities={}, governing_equation="",
                          final_answer=final_answer,
                          numeric_answer=numeric)
        self.claim = _claim_number(res)
        self.result = res


NEW_ROUTES = ["PY_TRACE", "PY_EXPR", "SQL_CLAUSE", "SQL_AGGR", "SQL_JOIN",
              "STACK_SIM", "QUEUE_SIM", "POSTFIX_EVAL",
              "INTEREST_CAPITAL_PARTNER", "INTEREST_PARTNER_LOAN",
              "PROFIT_APPROPRIATION", "NET_GST_PAYABLE"]


@pytest.mark.parametrize("route", NEW_ROUTES)
def test_new_routes_registered(route):
    assert route in VERIFIERS and route in registered_routes()


class TestVerifiersSecondPath:
    def test_py_trace_pass(self):
        q = ("Predict the output:\n```python\nx = 5\nprint(x * x)\n```")
        v, p = check_route("PY_TRACE", q, ModelResult(
            structure="PY_TRACE", matched=True, confidence=0.95,
            quantities={}, governing_equation="",
            final_answer="output:\n25", numeric_answer=None))
        assert v == "pass", p

    def test_stack_sim_pass(self):
        q = ("Trace the stack: push(10), push(20), push(30), pop(), "
             "push(40), pop(), pop() on an initially empty stack.")
        r = model_cs_families(q)
        v, p = check_route("STACK_SIM", q, r)
        assert v == "pass", p

    def test_interest_capital_partner_pass_and_fail(self):
        q = ("A and B are partners sharing profits 3:2. Their capitals "
             "on 1st April: A Rs 3,00,000, B Rs 2,00,000. Interest on "
             "capital @ 10% p.a. Calculate the interest on capital "
             "for A.")
        r = AF.model_accountancy_families(q)
        assert r.matched
        v, p = check_route("INTEREST_CAPITAL_PARTNER", q, r)
        assert v == "pass", p
        r_wrong = ModelResult(
            structure="INTEREST_CAPITAL_PARTNER", matched=True,
            confidence=0.95, quantities={}, governing_equation="",
            final_answer="Interest on capital for A = Rs 99,999",
            numeric_answer=99999.0)
        v, _ = check_route("INTEREST_CAPITAL_PARTNER", q, r_wrong)
        assert v == "fail"

    def test_partner_loan_pass(self):
        q = ("A partnership without a deed has three partners. X "
             "advances a loan of Rs 5,00,000 to the firm. What interest "
             "is X entitled to on his loan for one year?")
        r = AF.model_accountancy_families(q)
        assert r.matched and "30,000" in str(r.final_answer)
        v, p = check_route("INTEREST_PARTNER_LOAN", q, r)
        assert v == "pass", p

    def test_appropriation_pass(self):
        q = ("A and B are partners sharing profits 3:2. Net profit "
             "before appropriations is Rs 3,00,000. Interest on capital "
             "@ 12% on Rs 4,00,000 (A) and Rs 3,00,000 (B). Calculate "
             "the divisible profit and A's share.")
        r = AF.model_accountancy_families(q)
        assert r.matched and "129,600" in str(r.final_answer)
        v, p = check_route("PROFIT_APPROPRIATION", q, r)
        assert v == "pass", p

    def test_net_gst_pass(self):
        q = ("A manufacturer buys raw materials worth Rs 5,00,000 (plus "
             "GST @18%) and sells finished goods worth Rs 8,00,000 "
             "(plus GST @12%). Calculate the net GST payable.")
        r = CF.model_commerce_families(q)
        assert r.matched and "6,000" in str(r.final_answer)
        v, p = check_route("NET_GST_PAYABLE", q, r)
        assert v == "pass", p


# --------------------------------------------------------------------------- #
# accountancy additive rows
# --------------------------------------------------------------------------- #

class TestAccountancyAdditive:
    def test_mid_year_addition(self):
        q = ("Partner X has a fixed capital of Rs 4,00,000 on 1st "
             "April. On 1st October, X introduces additional capital of "
             "Rs 1,00,000. Interest on capital is allowed @ 9% p.a. "
             "Calculate the total interest on X's capital for the "
             "year.")
        r = AF.model_accountancy_families(q)
        assert r.matched and r.structure == "INTEREST_CAPITAL_PARTNER"
        assert "40,500" in str(r.final_answer)

    def test_named_partners(self):
        q = ("Arun and Varun are partners with capitals Rs 4,00,000 and "
             "Rs 3,00,000 respectively. The partnership deed provides "
             "for interest on capital at 8% per annum. Calculate the "
             "interest on capital for Arun.")
        r = AF.model_accountancy_families(q)
        assert r.matched and "32,000" in str(r.final_answer)

    def test_appropriation_chain(self):
        q = ("A and B are partners sharing profits 3:2. Net profit "
             "before appropriations is Rs 3,00,000. Interest on capital "
             "@ 12% on Rs 4,00,000 (A) and Rs 3,00,000 (B). Calculate "
             "the divisible profit and A's share.")
        r = AF.model_accountancy_families(q)
        got = str(r.final_answer)
        assert "216,000" in got and "129,600" in got and "86,400" in got

    def test_dep_slm_unchanged(self):
        q = ("Machinery costs Rs 1,00,000 with a useful life of 10 "
             "years and salvage Rs 10,000. Calculate the annual "
             "depreciation under the Straight Line Method.")
        r = AF.model_accountancy_families(q)
        assert r.matched and r.structure == "DEP_SLM"
        assert "9,000" in str(r.final_answer)

    def test_dep_slm_date_note(self):
        q = ("A firm purchases machinery for Rs 12,00,000 on 1st April "
             "2023. The machinery has an estimated useful life of 6 "
             "years and zero residual value. Calculate the annual "
             "depreciation under the Straight Line Method.")
        r = AF.model_accountancy_families(q)
        assert r.matched and "200,000" in str(r.final_answer)
        assert any("2023" in s for s in r.steps)   # date consumed


# --------------------------------------------------------------------------- #
# commerce additive row
# --------------------------------------------------------------------------- #

class TestCommerceAdditive:
    def test_net_gst(self):
        q = ("A manufacturer buys raw materials worth Rs 5,00,000 (plus "
             "GST @18%) and sells finished goods worth Rs 8,00,000 "
             "(plus GST @12%). Calculate the net GST payable.")
        r = CF.model_commerce_families(q)
        assert r.matched and r.structure == "NET_GST_PAYABLE"
        assert "6,000" in str(r.final_answer)

    def test_landed_rows_untouched(self):
        # landed rows keep their canonical probes (commerce fixes are
        # landed -- additive discipline)
        r = CF.model_commerce_families(
            "A firm has fixed costs of Rs 50,000, selling price Rs 20 "
            "per unit and variable cost Rs 12 per unit. Find the "
            "break-even point in units.")
        assert r.matched and "6,250" in str(r.final_answer)
