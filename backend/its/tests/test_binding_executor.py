"""test_binding_executor.py -- Lane C: student-bound execution.

Rock-solid contract: correct role bindings compute verified answers;
mis-bindings and unknown signatures degrade honestly; assumptions are
surfaced; nothing unverified ever carries an answer.
"""

from __future__ import annotations

import pytest

from backend.its.solver.answer_pipeline import (
    AuditTrail, GUIDED, VERIFIED, VERIFIED_ASSUMED)
from backend.its.solver.binding_executor import execute_binding


def _bind(roles: dict, target: str) -> dict:
    return {"question": "test",
            "target_role": target,
            "bindings": [{"value": v, "role": r} for r, v in
                         roles.items()]}


def _run(roles: dict, target: str):
    return execute_binding(_bind(roles, target), AuditTrail(lane="C"))


def test_unitary_total():
    r = _run({"count": 120, "unit_price": 5}, "total")
    assert r.label == "VERIFIED" and r.numeric == 600


def test_percent_of_whole():
    r = _run({"percent": 10, "whole": 250}, "part")
    assert r.numeric == pytest.approx(25)


def test_whole_from_part_and_percent():
    r = _run({"part": 40, "percent": 10}, "base")
    assert r.numeric == pytest.approx(400)


def test_simple_interest():
    r = _run({"principal": 5000, "rate_percent": 8, "time_years": 3},
             "simple_interest")
    assert r.numeric == pytest.approx(1200)


def test_compound_interest_surfaces_assumption():
    r = _run({"principal": 8000, "rate_percent": 10, "time_years": 2},
             "compound_interest")
    assert r.label == VERIFIED_ASSUMED  # VERIFIED_WITH_ASSUMPTIONS
    assert r.numeric == pytest.approx(1680)
    assert any("annual" in a for a in r.audit.assumptions)


def test_circle_area_flags_pi_assumption():
    r = _run({"radius": 7}, "area_circle")
    assert r.label == VERIFIED_ASSUMED  # VERIFIED_WITH_ASSUMPTIONS
    assert r.numeric == pytest.approx(153.938, rel=1e-3)


def test_triangle_area():
    r = _run({"base": 6, "height": 8}, "area_triangle")
    assert r.numeric == pytest.approx(24)


def test_speed_time_distance():
    r = _run({"speed": 60, "time": 5}, "distance")
    assert r.numeric == pytest.approx(300)


def test_unknown_signature_degrades_honestly():
    r = _run({"flavor": 3, "spice": 9}, "curry")
    assert r.label == "GUIDED_PRACTICE"
    assert r.answer is None
    assert "no verified computation" in r.refusal_reason


def test_duplicate_role_rejected():
    r = execute_binding(
        {"question": "t", "target_role": "total",
         "bindings": [{"value": 1, "role": "count"},
                      {"value": 2, "role": "count"},
                      {"value": 3, "role": "unit_price"}]},
        AuditTrail(lane="C"))
    assert r.label == "GUIDED_PRACTICE"


def test_plausibility_gate_blocks_negative_principal():
    r = _run({"principal": -5000, "rate_percent": 8, "time_years": 3},
             "simple_interest")
    assert r.label == "GUIDED_PRACTICE"
    assert "positive" in r.refusal_reason


def test_division_guard_time_zero():
    r = _run({"distance": 100, "time": 0}, "speed")
    assert r.label == "GUIDED_PRACTICE"


def test_audit_records_bindings():
    r = _run({"count": 3, "unit_price": 4}, "total")
    assert r.audit.quantities == [{"role": "count", "value": 3.0},
                                  {"role": "unit_price", "value": 4.0}]
    assert r.audit.route[0].startswith("binding:")
