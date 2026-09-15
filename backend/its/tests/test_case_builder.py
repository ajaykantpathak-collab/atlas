"""test_case_builder.py -- Case-Based builder + chain composer.

Contract under test:
    - build_case solves 3-5 sub-questions against shared passage data,
      detects chains (child (ii) using child (i)'s answer), degrades
      honestly on unknown computations / missing values;
    - compose_chain propagates LINKING quantities across max 3 hops,
      refuses cross-subject chains, and on any failed hop returns all
      completed steps plus an honest refusal (guided practice);
    - generate_case_from_bank detects shared numbers and chains in
      bank questions and cross-checks official answers.
"""

from __future__ import annotations

import pytest

from backend.its.solver.case_builder import (
    DEGRADATION_POLICY, build_case, compose_chain,
    generate_case_from_bank)

PASSAGE = ("Meera took a loan of Rs. 50,000 at 10% per annum "
           "compounded annually.")


def _case_subs():
    return [
        {"question": "Find the amount after 2 years.",
         "computation": "compound_amount", "values": {"time": 2}},
        {"question": "Find the compound interest.",
         "computation": "compound_interest"},
        {"question": "Find 10% of the compound interest.",
         "computation": "percent_of", "values": {"percent": 10}},
    ]


# --------------------------------------------------------------------------- #
# TASK 1: case building from passage + sub-questions
# --------------------------------------------------------------------------- #


def test_build_case_compound_case():
    case = build_case(PASSAGE, _case_subs())
    assert case["passage"] == PASSAGE
    assert case["case_id"].startswith("case_")
    assert case["chain"] is True
    ids = [c["child_id"] for c in case["children"]]
    assert ids == [f"{case['case_id']}_i", f"{case['case_id']}_ii",
                   f"{case['case_id']}_iii"]
    answers = [c["answer"] for c in case["children"]]
    assert answers == [60500, 10500, 1050]
    # child (ii) uses child (i)'s answer; child (iii) uses child (ii)'s
    assert case["children"][1]["uses_previous"] == ["amount"]
    assert case["children"][2]["uses_previous"] == ["ci"]
    assert case["children"][0]["uses_previous"] == []
    assert case["children"][0]["steps"]


def test_build_case_requires_three_to_five_sub_questions():
    two = _case_subs()[:2]
    six = _case_subs() + _case_subs()[:3]
    for bad in ([], two, six, "not-a-list"):
        with pytest.raises(ValueError):
            build_case(PASSAGE, bad)


def test_build_case_unknown_computation_degrades():
    subs = [
        {"question": "Q1?", "computation": "percent_of",
         "values": {"percent": 10, "whole": 200}},
        {"question": "Q2?", "computation": "astrology"},
        {"question": "Q3?", "computation": "subtraction",
         "values": {"minuend": 9, "subtrahend": 4}},
    ]
    case = build_case("A short context.", subs)
    assert case["children"][0]["answer"] == 20
    bad = case["children"][1]
    assert bad["answer"] is None
    assert "unknown computation" in bad["refusal_reason"]
    assert case["children"][2]["answer"] == 5
    assert case["chain"] is False   # the failing child chains nothing


def test_build_case_missing_values_refuse():
    subs = [
        {"question": "Find the amount.", "computation": "compound_amount"},
        {"question": "Q2?", "computation": "percent_of",
         "values": {"percent": 5, "whole": 100}},
        {"question": "Q3?", "computation": "percent_of",
         "values": {"percent": 6, "whole": 100}},
    ]
    case = build_case("Solve the following.", subs)
    first = case["children"][0]
    assert first["answer"] is None
    assert "missing input" in first["refusal_reason"]
    assert "principal" in first["refusal_reason"]
    assert case["children"][1]["answer"] == 5


def test_build_case_independent_children_not_chained():
    subs = [
        {"question": "Find 10% of 200.", "computation": "percent_of",
         "values": {"percent": 10, "whole": 200}},
        {"question": "Find 15% of 300.", "computation": "percent_of",
         "values": {"percent": 15, "whole": 300}},
        {"question": "Find 20% of 250.", "computation": "percent_of",
         "values": {"percent": 20, "whole": 250}},
    ]
    case = build_case("Three unrelated percent tasks.", subs)
    assert [c["answer"] for c in case["children"]] == [20, 45, 50]
    assert case["chain"] is False
    assert all(c["uses_previous"] == [] for c in case["children"])


def test_build_case_rupee_symbol_passage():
    passage = ("Meera took a loan of " + chr(8377) +
               "50,000 at 10% per annum compounded annually.")
    case = build_case(passage, _case_subs())
    assert [c["answer"] for c in case["children"]] == [60500, 10500, 1050]
    assert case["chain"] is True


# --------------------------------------------------------------------------- #
# TASK 2: chain composition
# --------------------------------------------------------------------------- #


def test_compose_chain_two_hops():
    r = compose_chain(["compound_interest", "subtraction"], ["amount"],
                      {"principal": 50000, "rate": 10, "time": 2})
    assert r["answer"] == 10500
    assert r["degradation"] is None
    assert r["refusal_reason"] is None
    assert r["degradation_policy"] == DEGRADATION_POLICY
    assert r["hops"][0]["produces"] == "ci"
    assert r["hops"][1]["consumes"] == "amount"
    assert len(r["steps"]) >= 2
    assert any("hop 1" in s for s in r["steps"])
    assert any("hop 2" in s for s in r["steps"])


def test_compose_chain_three_hops():
    r = compose_chain(["compound_amount", "subtraction", "percent_of"],
                      ["amount", "difference"],
                      {"principal": 50000, "rate": 10, "time": 2,
                       "percent": 10})
    assert r["answer"] == 1050
    assert r["degradation"] is None
    assert r["hops"][1]["consumes"] == "amount"
    assert r["hops"][2]["consumes"] == "difference"
    assert len(r["hops"]) == 3


def test_linking_quantity_propagation():
    r = compose_chain(["compound_amount", "subtraction"], ["amount"],
                      {"principal": 50000, "rate": 10, "time": 2})
    # hop 1's output amount feeds hop 2 by name
    assert r["values"]["amount"] == 60500
    assert r["values"]["difference"] == 10500
    assert r["produces"] == "difference"
    assert r["answer"] == r["values"]["difference"]
    assert r["linking_quantities"] == ["amount"]
    # the 3-hop variant propagates one link further
    r3 = compose_chain(["compound_amount", "subtraction", "percent_of"],
                       ["amount", "difference"],
                       {"principal": 50000, "rate": 10, "time": 2,
                        "percent": 10})
    assert r3["values"]["part"] == 1050
    assert r3["hops"][2]["consumes"] in r3["linking_quantities"]


def test_compose_chain_middle_hop_failure_degrades():
    r = compose_chain(
        ["compound_amount", "total_from_interest", "subtraction"],
        ["amount"], {"principal": 50000, "rate": 10, "time": 2})
    assert r["answer"] is None
    assert r["degradation"] == "guided_practice"
    assert r["completed_hops"] == 1          # only hop 1 completed
    assert len(r["steps"]) == 1              # all previous steps shown
    assert "hop 2" in r["refusal_reason"]
    assert "si" in r["refusal_reason"]


def test_compose_chain_cross_subject_refused():
    r = compose_chain(["compound_interest", "distance"], ["amount"],
                      {"principal": 50000, "rate": 10, "time": 2,
                       "speed": 60})
    assert r["answer"] is None
    assert r["steps"] == []
    assert "cross-subject" in r["refusal_reason"]
    assert r["degradation"] == "guided_practice"
    assert len(r["hops"]) == 2


def test_compose_chain_contract_errors():
    keys4 = ["compound_amount", "subtraction", "percent_of", "subtraction"]
    with pytest.raises(ValueError):
        compose_chain(keys4, [], {})
    with pytest.raises(ValueError):
        compose_chain([], [], {})
    with pytest.raises(ValueError):
        compose_chain(["warp_drive"], [], {})


# --------------------------------------------------------------------------- #
# TASK 3: case generation from the bank
# --------------------------------------------------------------------------- #


def test_generate_case_from_bank_shared_data_and_chain():
    questions = [
        {"text": "Find the amount of Rs. 50,000 after 2 years.",
         "answer": 60500},
        {"text": "Find the compound interest.", "answer": "Rs. 10,500"},
        {"text": "Find 10% of the compound interest.", "answer": 9999},
    ]
    case = generate_case_from_bank(PASSAGE, questions)
    assert case["case_id"].startswith("case_")
    assert case["shared_data"] is True
    assert case["chain"] is True
    comps = [c["computation"] for c in case["children"]]
    assert comps == ["compound_amount", "compound_interest", "percent_of"]
    assert [c["answer"] for c in case["children"]] == [60500, 10500, 1050]
    # chain: later questions consume earlier answers
    assert case["children"][1]["uses_previous"] == ["amount"]
    assert case["children"][2]["uses_previous"] == ["ci"]
    # shared numbers: q1 restates 50,000 from the passage
    assert case["children"][0]["shared_numbers"] == [50000.0]
    assert case["children"][0]["shares_data"] is True
    assert case["children"][1]["shares_data"] is True   # chained
    # official-answer cross-check
    assert case["children"][0]["matches_bank_answer"] is True
    assert case["children"][1]["matches_bank_answer"] is True
    assert case["children"][2]["matches_bank_answer"] is False


def test_generate_case_from_bank_requires_three_to_five():
    questions = [{"text": "Find the amount after 2 years."},
                 {"text": "Find the compound interest."}]
    with pytest.raises(ValueError):
        generate_case_from_bank(PASSAGE, questions)


def test_case_and_chain_ids_deterministic():
    c1 = build_case(PASSAGE, _case_subs())
    c2 = build_case(PASSAGE, _case_subs())
    assert c1["case_id"] == c2["case_id"]
    assert [c["child_id"] for c in c1["children"]] == \
        [c["child_id"] for c in c2["children"]]
    r1 = compose_chain(["compound_interest", "subtraction"], ["amount"],
                       {"principal": 50000, "rate": 10, "time": 2})
    r2 = compose_chain(["compound_interest", "subtraction"], ["amount"],
                       {"principal": 50000, "rate": 10, "time": 2})
    assert r1["chain_id"] == r2["chain_id"]
