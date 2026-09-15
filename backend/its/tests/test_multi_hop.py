"""test_multi_hop.py -- 5-hop chain system + pipeline wiring.

Contract under test:
    - multi_hop extends case_builder's FORMULAS registry (additive,
      idempotent) with arithmetic / geometry / physics chain formulas;
    - compose_chain_multi executes 2-5 hop chains while the base
      module's own 3-hop contract stays untouched;
    - repeated operations get deterministic variant keys so each hop
      reads ITS OWN operand from the shared pool;
    - linking quantities propagate by exact name through every hop;
    - any failed hop degrades to guided practice with all completed
      steps shown;
    - parse_chain_text reads multi-step narratives into chain specs;
    - chain_pipeline.try_chain returns VERIFIED / GUIDED results, and
      answer() routes 2-5 step narratives through the chain lane;
    - build_case keeps working on the extended registry.
"""

from __future__ import annotations

import pytest

from backend.its.solver import case_builder
from backend.its.solver.answer_pipeline import AuditTrail, classify
from backend.its.solver.case_builder import build_case, compose_chain
from backend.its.solver.chain_pipeline import try_chain
from backend.its.solver.multi_hop import (
    CHAIN_FORMULAS, MULTI_HOP_MAX, compose_chain_multi,
    ensure_chain_variant, parse_chain_text, solve_chain_text)

TWO_STEP = ("Ravi has Rs 800 in his savings account. He adds 200 to it. "
            "He then spends 250 on books. How much money is left with "
            "him?")
FIVE_STEP = ("A tank holds 800 litres of water. 200 litres are added to "
             "it. 250 litres leak out. The remaining water is "
             "multiplied by 4. Then the water is divided by 6. Find 10% "
             "of the result.")
COMPOUND_TEXT = ("Meera took a loan of Rs. 50,000 at 10% per annum "
                 "compounded annually. Find the amount after 2 years. "
                 "Find the compound interest. Find 10% of the compound "
                 "interest.")
PHYSICS_TEXT = ("A car covers 120 m in 60 s. Find its speed. It then "
                "travels for 30 s at the same speed. How far does it go "
                "in total? Find 50% of the distance covered in the "
                "second part.")
DENSITY_TEXT = ("A block has mass 8 kg and volume 4 litres. Find its "
                "density. Find 25% of the density.")
FAILING_TEXT = ("Ravi has Rs 800 in cash. He spends 120 on pens. Then he "
                "divides the remaining money by 0. What amount is he "
                "left with?")


# --------------------------------------------------------------------------- #
# Registry extension
# --------------------------------------------------------------------------- #


def test_registry_extension_adds_all_chain_formulas():
    expected = {"addition", "subtraction", "multiplication", "division",
                "compound_interest", "simple_interest", "area_rectangle",
                "area_circle", "speed", "distance", "density",
                "percent_of"}
    for key in expected:
        assert key in case_builder.FORMULAS
    assert set(CHAIN_FORMULAS) <= set(case_builder.FORMULAS)
    # new formulas are typed data with the same shape as the base ones
    for key, spec in CHAIN_FORMULAS.items():
        for field in ("expr", "subject", "produces", "inputs", "fn"):
            assert field in spec


def test_extend_registry_is_idempotent():
    from backend.its.solver.multi_hop import extend_registry
    n_formulas = len(case_builder.FORMULAS)
    whole_aliases = list(
        case_builder.FORMULAS["percent_of"]["aliases"]["whole"])
    minuend_aliases = list(
        case_builder.FORMULAS["subtraction"]["aliases"]["minuend"])
    mixes = list(case_builder._SUBJECT_MIXES)
    extend_registry()
    extend_registry()
    assert len(case_builder.FORMULAS) == n_formulas
    assert case_builder.FORMULAS["percent_of"]["aliases"]["whole"] == \
        whole_aliases
    assert case_builder.FORMULAS["subtraction"]["aliases"]["minuend"] == \
        minuend_aliases
    assert case_builder._SUBJECT_MIXES == mixes


# --------------------------------------------------------------------------- #
# Compose: 2 / 3 / 4 / 5 hops
# --------------------------------------------------------------------------- #


def test_compose_two_hop_chain():
    r = compose_chain_multi(["compound_interest", "subtraction"],
                            ["amount"],
                            {"principal": 50000, "rate": 10, "time": 2})
    assert r["answer"] == 10500
    assert r["degradation"] is None
    assert r["hops"][0]["produces"] == "ci"
    assert r["hops"][1]["consumes"] == "amount"


def test_compose_three_hop_chain():
    r = compose_chain_multi(
        ["compound_amount", "subtraction", "percent_of"],
        ["amount", "difference"],
        {"principal": 50000, "rate": 10, "time": 2, "percent": 10})
    assert r["answer"] == 1050
    assert len(r["hops"]) == 3
    assert r["hops"][1]["consumes"] == "amount"
    assert r["hops"][2]["consumes"] == "difference"


def _four_hop_keys():
    return ["area_rectangle",
            ensure_chain_variant("percent_of", "area", 2),
            ensure_chain_variant("addition", "part", 3),
            ensure_chain_variant("subtraction", "sum", 4)]


def test_compose_four_hop_chain():
    r = compose_chain_multi(
        _four_hop_keys(), ["area", "part", "sum"],
        {"l": 10, "w": 4, "percent_2": 10, "b_3": 6, "subtrahend_4": 3})
    # 10*4=40 -> 10% = 4 -> +6 = 10 -> -3 = 7
    assert r["answer"] == 7
    assert len(r["hops"]) == 4
    assert r["degradation"] is None


def test_compose_five_hop_chain():
    keys = _four_hop_keys() + \
        [ensure_chain_variant("division", "difference", 5)]
    r = compose_chain_multi(
        keys, ["area", "part", "sum", "difference"],
        {"l": 10, "w": 4, "percent_2": 10, "b_3": 6, "subtrahend_4": 3,
         "b_5": 2})
    # 40 -> 4 -> 10 -> 7 -> 3.5
    assert r["answer"] == 3.5
    assert len(r["hops"]) == 5
    assert r["hops"][-1]["produces"] == "quotient"


def test_linking_quantity_propagation_through_all_hops():
    keys = _four_hop_keys() + \
        [ensure_chain_variant("division", "difference", 5)]
    linking = ["area", "part", "sum", "difference"]
    r = compose_chain_multi(
        keys, linking,
        {"l": 10, "w": 4, "percent_2": 10, "b_3": 6, "subtrahend_4": 3,
         "b_5": 2})
    # each hop consumes exactly the previous hop's output, by name
    for i in range(1, 5):
        assert r["hops"][i]["consumes"] == r["hops"][i - 1]["produces"]
        assert r["hops"][i]["consumes"] in r["linking_quantities"]
    # every intermediate linking quantity landed in the value pool
    for name in linking:
        assert name in r["values"]
    assert r["answer"] == r["values"]["quotient"]


def test_six_hops_raise_and_base_contracts_hold():
    keys = _four_hop_keys() + \
        [ensure_chain_variant("division", "difference", 5), "addition"]
    with pytest.raises(ValueError):
        compose_chain_multi(keys, [], {})          # 6 hops
    with pytest.raises(ValueError):
        compose_chain_multi([], [], {})
    with pytest.raises(ValueError):
        compose_chain_multi(["warp_drive"], [], {})
    with pytest.raises(ValueError):
        ensure_chain_variant("addition", "sum", 6)  # position cap
    # the raise paths must not leave the base module's cap mutated
    assert case_builder.MAX_HOPS == 3


def test_base_module_three_hop_contract_untouched():
    compose_chain_multi(["addition"], [], {"a": 1, "b": 2})
    assert case_builder.MAX_HOPS == 3
    keys4 = ["compound_amount", "subtraction", "percent_of", "subtraction"]
    with pytest.raises(ValueError):
        compose_chain(keys4, [], {})


def test_middle_hop_failure_degrades_with_completed_steps():
    keys = ["addition",
            ensure_chain_variant("division", "sum", 2),
            ensure_chain_variant("multiplication", "quotient", 3)]
    r = compose_chain_multi(keys, ["sum"],
                            {"a": 800, "b": 200, "b_2": 0, "b_3": 4})
    assert r["answer"] is None
    assert r["degradation"] == "guided_practice"
    assert r["completed_hops"] == 1            # only hop 1 completed
    assert len(r["steps"]) == 1                # completed step shown
    assert "hop 1" in r["steps"][0]
    assert "hop 2" in r["refusal_reason"]


def test_variant_registration_deterministic_and_idempotent():
    k1 = ensure_chain_variant("addition", "sum", 2)
    entry = case_builder.FORMULAS[k1]
    k2 = ensure_chain_variant("addition", "sum", 2)
    assert k1 == k2
    assert case_builder.FORMULAS[k1] is entry   # not rebuilt
    assert entry["inputs"] == ["sum", "b_2"]
    assert entry["produces"] == "sum"
    assert entry["fn"](sum=10, b_2=5) == 15     # a=10, b=5
    with pytest.raises(ValueError):
        ensure_chain_variant("area_rectangle", "sum", 2)
    with pytest.raises(ValueError):
        ensure_chain_variant("addition", "sum", 1)


# --------------------------------------------------------------------------- #
# parse_chain_text -> execute -> verify
# --------------------------------------------------------------------------- #


def test_parse_two_step_narrative_and_execute():
    spec = parse_chain_text(TWO_STEP)
    assert spec is not None
    assert spec["keys"] == ["addition", "subtraction_from_sum_o2"]
    assert spec["seed"] == 800
    assert spec["values"]["a"] == 800
    assert spec["values"]["b"] == 200
    assert spec["values"]["subtrahend_2"] == 250
    r = compose_chain_multi(spec["keys"], spec["linking_quantities"],
                            spec["values"])
    assert r["answer"] == 750                   # 800 + 200 - 250
    assert r["hops"][1]["consumes"] == "sum"


def test_parse_five_step_narrative_and_execute():
    spec = parse_chain_text(FIVE_STEP)
    assert spec is not None
    assert len(spec["keys"]) == 5
    assert spec["keys"] == ["addition", "subtraction_from_sum_o2",
                            "multiplication_from_difference_o3",
                            "division_from_product_o4",
                            "percent_of_from_quotient_o5"]
    r = solve_chain_text(FIVE_STEP)
    assert r is not None
    # 800 + 200 - 250 = 750; *4 = 3000; /6 = 500; 10% = 50
    assert r["answer"] == 50
    for i in range(1, 5):
        assert r["hops"][i]["consumes"] == r["hops"][i - 1]["produces"]


def test_parse_compound_narrative_and_execute():
    spec = parse_chain_text(COMPOUND_TEXT)
    assert spec is not None
    assert spec["keys"] == ["compound_amount", "compound_interest",
                            "percent_of_from_ci_o3"]
    assert spec["values"]["principal"] == 50000
    assert spec["values"]["rate"] == 10
    assert spec["values"]["percent_3"] == 10
    r = solve_chain_text(COMPOUND_TEXT)
    assert r is not None
    assert r["answer"] == 1050                  # 60500 -> 10500 -> 1050


def test_parse_repeated_operation_uses_distinct_operands():
    text = ("Ravi has Rs 800 in his wallet. He adds 200 to it. Then he "
            "adds 150 more. How much money does he have now?")
    spec = parse_chain_text(text)
    assert spec is not None
    assert spec["keys"] == ["addition", "addition_from_sum_o2"]
    assert spec["values"]["b"] == 200           # hop 1 operand
    assert spec["values"]["b_2"] == 150         # hop 2 operand, isolated
    r = solve_chain_text(text)
    assert r is not None
    assert r["answer"] == 1150                  # 800 + 200 + 150


def test_parse_physics_chain_math_link():
    spec = parse_chain_text(PHYSICS_TEXT)
    assert spec is not None
    # the distance hop grounds its own "time" (30 s) via a slot variant
    # so the speed hop's 60 s is not overwritten in the shared pool
    assert spec["keys"] == ["speed", "distance_x2_time",
                            "percent_of_from_distance_o3"]
    assert spec["values"]["time"] == 60
    assert spec["values"]["time_2"] == 30
    r = solve_chain_text(PHYSICS_TEXT)
    assert r is not None
    # 120 m / 60 s = 2 m/s; 2 * 30 s = 60 m; 50% = 30
    assert r["answer"] == 30
    assert r["hops"][1]["consumes"] == "speed"
    assert r["hops"][2]["consumes"] == "distance"


def test_parse_density_chain_math_link():
    spec = parse_chain_text(DENSITY_TEXT)
    assert spec is not None
    assert spec["keys"] == ["density", "percent_of_from_density_o2"]
    r = solve_chain_text(DENSITY_TEXT)
    assert r is not None
    # 8 kg / 4 litres = 2; 25% of 2 = 0.5
    assert r["answer"] == 0.5


def test_parse_rejects_non_chains():
    assert parse_chain_text("") is None
    assert parse_chain_text(None) is None
    assert parse_chain_text("The zorblaxian flux gate problem.") is None
    # single operation: other readers own it
    assert parse_chain_text(
        "Find the area of a circle of radius 7 cm.") is None
    # more than 5 operations: not this family
    assert parse_chain_text(FIVE_STEP +
                            " Then the amount is doubled.") is None
    # classifier still sends chain narratives to Lane B
    assert classify(TWO_STEP) == "B"
    assert classify(FIVE_STEP) == "B"


# --------------------------------------------------------------------------- #
# chain_pipeline.try_chain and answer() wiring
# --------------------------------------------------------------------------- #


def test_try_chain_returns_verified_with_per_step_audit():
    audit = AuditTrail(lane="B")
    result = try_chain(TWO_STEP, audit)
    assert result is not None
    assert result.label == "VERIFIED"
    assert result.numeric == 750.0
    assert result.answer == "750"
    assert len(result.steps) >= 2
    assert any("hop 1" in s for s in result.steps)
    assert any("hop 2" in s for s in result.steps)
    assert "chain:2hops" in result.audit.route
    assert "multi_hop_chain" in result.audit.route
    assert "chain_compose" in result.audit.gates_passed
    assert len(result.audit.quantities) == 2
    assert result.audit.quantities[0]["produces"] == "sum"
    assert result.audit.quantities[1]["consumes"] == "sum"


def test_try_chain_returns_none_for_non_chains():
    assert try_chain("Find the area of a circle of radius 7 cm.",
                     AuditTrail(lane="B")) is None
    assert try_chain("The sky is blue today.",
                     AuditTrail(lane="B")) is None


def test_answer_routes_chain_narrative_to_verified():
    from backend.its.solver.answer_pipeline import answer
    r = answer(TWO_STEP)
    assert r.label == "VERIFIED"
    assert r.numeric == 750.0
    assert r.audit.lane == "B"
    assert any("chain" in s for s in r.audit.route)


def test_answer_guided_when_a_hop_fails():
    from backend.its.solver.answer_pipeline import answer
    r = answer(FAILING_TEXT)
    assert r.label == "GUIDED_PRACTICE"
    assert r.answer is None and r.numeric is None
    assert r.steps                              # completed step 1 shown
    assert any("hop 1" in s for s in r.steps)
    assert "hop 2" in r.refusal_reason


def test_answer_keeps_existing_reader_lanes_first():
    from backend.its.solver.answer_pipeline import answer
    r = answer("Ramesh buys 120 mangoes at 5 rupees each. 15 of them "
               "rot. He sells the rest at 8 rupees each. How much "
               "profit does he make?")
    assert r.label == "VERIFIED"
    assert r.numeric == 240
    assert not any(str(s).startswith("chain:") for s in r.audit.route)


# --------------------------------------------------------------------------- #
# Case builder wiring on the extended registry
# --------------------------------------------------------------------------- #


def test_build_case_unchanged_on_extended_registry():
    passage = ("Meera took a loan of Rs. 50,000 at 10% per annum "
               "compounded annually.")
    subs = [
        {"question": "Find the amount after 2 years.",
         "computation": "compound_amount", "values": {"time": 2}},
        {"question": "Find the compound interest.",
         "computation": "compound_interest"},
        {"question": "Find 10% of the compound interest.",
         "computation": "percent_of", "values": {"percent": 10}},
    ]
    case = build_case(passage, subs)
    assert case["chain"] is True
    assert [c["answer"] for c in case["children"]] == [60500, 10500, 1050]
    assert case["children"][1]["uses_previous"] == ["amount"]


def test_build_case_five_children_with_new_formulas():
    passage = ("Meera took a loan of Rs. 50,000 at 10% per annum "
               "compounded annually.")
    subs = [
        {"question": "Find the amount after 2 years.",
         "computation": "compound_amount", "values": {"time": 2}},
        {"question": "Find the compound interest.",
         "computation": "compound_interest"},
        {"question": "Find 10% of the compound interest.",
         "computation": "percent_of", "values": {"percent": 10}},
        {"question": "Add the fee of 450 to it.",
         "computation": "addition", "values": {"a": 1050, "b": 450}},
        {"question": "Divide the total by 3.",
         "computation": "division", "values": {"a": 1500, "b": 3}},
    ]
    case = build_case(passage, subs)
    assert len(case["children"]) == 5
    answers = [c["answer"] for c in case["children"]]
    assert answers == [60500, 10500, 1050, 1500, 500]
    assert case["chain"] is True
    assert all(c.get("refusal_reason") is None for c in case["children"])


# --------------------------------------------------------------------------- #
# Determinism
# --------------------------------------------------------------------------- #


def test_parse_and_compose_deterministic():
    s1 = parse_chain_text(FIVE_STEP)
    s2 = parse_chain_text(FIVE_STEP)
    assert s1["keys"] == s2["keys"]
    assert s1["values"] == s2["values"]
    assert s1["linking_quantities"] == s2["linking_quantities"]
    r1 = solve_chain_text(FIVE_STEP)
    r2 = solve_chain_text(FIVE_STEP)
    assert r1["answer"] == r2["answer"] == 50
    assert r1["chain_id"] == r2["chain_id"]
