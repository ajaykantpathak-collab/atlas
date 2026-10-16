"""Wave 9.8 — asked-quantity x answer-unit intent guard.

Live defect (verified 2026-10-13): the stem

    "A ball is thrown vertically upward with velocity 17.5 m/s.
     How long does it take to reach its highest point? (g=10)"

asks for TIME (~1.75 s) but shipped `VERIFIED 15.3125 m` via
structure:PROJECTILE_HEIGHT — the family computed the HEIGHT of a
question that was never asked; the internal verifier confirmed 15.3125
(internally consistent, wrong answer).  The wave98 subject-domain veto
cannot see it — same domain, wrong intent.

The guard extracts the ASKED quantity from explicit ask phrases
("how long", "find the force", "what percent") and the SERVED quantity
from the answer's unit; on a mismatch it fails closed to GUIDED with
audit marker ``badge:quantity_intent_veto:<asked>:<served>``.
"""

import os
import re
import sys

import pytest

sys.path.insert(0, os.path.join("D:\\", "platform", "deploy"))

from backend.its.solver.answer_pipeline import (
    AuditTrail,
    GUIDED,
    PipelineResult,
    VERIFIED,
    VERIFIED_ASSUMED,
    _asked_quantities,
    _quantity_intent_veto,
    _served_quantities,
)

DEFECT_STEM = (
    "A ball is thrown vertically upward with velocity 17.5 m/s. "
    "How long does it take to reach its highest point? (g=10)")


def _res(answer=None, numeric=None, label=VERIFIED, steps=None):
    return PipelineResult(label=label, answer=answer, numeric=numeric,
                          steps=list(steps or []), audit=AuditTrail("T"))


# --------------------------------------------------------------------------- #
# asked-quantity extraction — explicit ask phrases only
# --------------------------------------------------------------------------- #

class TestAskedQuantities:
    def test_how_long_does_it_take_is_time(self):
        assert _asked_quantities(DEFECT_STEM) == {"time"}

    def test_given_velocity_is_not_an_ask(self):
        # 'with velocity 17.5 m/s' is a GIVEN — the family trigger word
        # must never count as the ask (same trap as domain-gate
        # evidence regexes).
        asked = _asked_quantities(DEFECT_STEM)
        assert "speed" not in asked and "distance" not in asked

    def test_distance_asks(self):
        for stem in (
                "A car moves at 60 km/h for 2 h. How far does it go?",
                "A stone is dropped. Find the distance fallen in 3 s.",
                "Find the maximum height reached by the projectile.",
                "What is the height of the tower?",
                "How high does the ball rise? (g=10)",
        ):
            assert "distance" in _asked_quantities(stem), stem

    def test_speed_asks(self):
        for stem in (
                "A car travels 100 km in 2 hours. Find its speed.",
                "How fast is the train moving?",
                "At what speed does the bus travel?",
                "Find the average speed for the whole journey.",
        ):
            assert "speed" in _asked_quantities(stem), stem

    def test_time_asks(self):
        for stem in (
                "In how many days can B alone finish the work?",
                "How much time does light take to travel 1 m?",
                "When will the two trains meet?",
                "Find the time of flight of the projectile.",
                "In what time will the sum double itself?",
        ):
            assert "time" in _asked_quantities(stem), stem

    def test_force_mass_energy_asks(self):
        assert "force" in _asked_quantities(
            "A 10 kg block. Find the force needed to lift it.")
        assert "mass" in _asked_quantities(
            "Find the mass of the stone.")
        assert "energy" in _asked_quantities(
            "Find the work done by the machine in one cycle.")
        assert "energy" in _asked_quantities(
            "Calculate the kinetic energy of a 2 kg body at 10 m/s.")

    def test_money_asks(self):
        for stem in (
                "Find the simple interest on Rs 5000 at 5% p.a. "
                "for 2 years.",
                "A cycle is bought for Rs 1200. Find the selling price.",
                "How much money does he earn in a month?",
                "Find the profit made on the deal.",
        ):
            assert "money" in _asked_quantities(stem), stem

    def test_percent_and_count_asks(self):
        assert "percent" in _asked_quantities(
            "What percent of 80 is 20?")
        assert "percent" in _asked_quantities(
            "Find the profit percent on the sale.")
        assert "scalar" in _asked_quantities(
            "How many boys are in the class of 40 students?")

    def test_multi_quantity_ask_collects_all(self):
        asked = _asked_quantities(
            "A stone is thrown up at 14 m/s. Find the speed at the "
            "top and the distance it covers.")
        assert {"speed", "distance"} <= asked

    def test_no_ask_phrase_is_empty(self):
        assert _asked_quantities("Evaluate: 3 + 4 x 2.") == set()
        assert _asked_quantities(
            "A pendulum has length 1 m and period 2 s.") == set()

    def test_how_long_is_is_length_not_time(self):
        assert "distance" in _asked_quantities(
            "How long is the bridge?")
        assert "time" not in _asked_quantities(
            "How long is the bridge?")


# --------------------------------------------------------------------------- #
# served-quantity extraction — the unit the answer ships
# --------------------------------------------------------------------------- #

class TestServedQuantities:
    def test_plain_units(self):
        assert "distance" in _served_quantities(_res("15.3125 m", 15.3125))
        assert "time" in _served_quantities(_res("1.75 s", 1.75))
        assert "time" in _served_quantities(_res("2 h", 2.0))
        assert "speed" in _served_quantities(_res("50 km/h", 50.0))
        assert "speed" in _served_quantities(_res("13.89 m/s", 13.89))
        assert "mass" in _served_quantities(_res("2 kg", 2.0))
        assert "force" in _served_quantities(_res("9.8 N", 9.8))
        assert "energy" in _served_quantities(_res("100 J", 100.0))

    def test_kmh_and_ms_are_the_same_quantity(self):
        # unit conversions are valid: km/h == m/s == speed
        assert _served_quantities(_res("50 km/h", 50.0)) == \
            _served_quantities(_res("13.8889 m/s", 13.8889))

    def test_money_and_percent_markers(self):
        assert "money" in _served_quantities(_res("Rs 47,500", 47500.0))
        assert "money" in _served_quantities(_res("\u20b947500", 47500.0))
        assert "percent" in _served_quantities(_res("20%", 20.0))

    def test_dimensionless_is_scalar(self):
        assert _served_quantities(_res("45", 45.0)) == {"scalar"}
        assert _served_quantities(_res("x = 3 or x = -3")) == {"scalar"}
        assert _served_quantities(_res("3:4")) == {"scalar"}

    def test_steps_carry_the_unit_when_answer_is_bare(self):
        r = _res("1.75", 1.75, steps=["t = u/g", "= 1.75 s"])
        assert "time" in _served_quantities(r)


# --------------------------------------------------------------------------- #
# the veto decision
# --------------------------------------------------------------------------- #

class TestQuantityIntentVeto:
    def test_time_ask_served_height_vetoes(self):
        r = _res("15.3125 m", 15.3125)
        out = _quantity_intent_veto(DEFECT_STEM, r)
        assert out is not None
        asked, served, reason = out
        assert asked == "time" and served == "distance"
        assert reason

    def test_time_ask_served_time_passes(self):
        assert _quantity_intent_veto(
            DEFECT_STEM, _res("1.75 s", 1.75)) is None

    def test_bare_number_never_vetoes(self):
        # cannot disprove a unitless serve — honest pass-through
        assert _quantity_intent_veto(
            DEFECT_STEM, _res("1.75", 1.75)) is None

    def test_no_asked_quantity_never_vetoes(self):
        assert _quantity_intent_veto(
            "Evaluate 3x + 4 when x = 5.", _res("19", 19.0)) is None

    def test_multi_ask_one_valid_part_passes(self):
        stem = ("A stone is thrown up. Find the speed at the top and "
                "the distance covered.")
        assert _quantity_intent_veto(stem, _res("20 m", 20.0)) is None
        assert _quantity_intent_veto(stem, _res("5 m/s", 5.0)) is None
        # serving a THIRD quantity matches neither -> veto
        out = _quantity_intent_veto(stem, _res("2.5 s", 2.5))
        assert out is not None and out[1] == "time"

    def test_money_ask_served_kg_vetoes(self):
        out = _quantity_intent_veto(
            "Find the interest on Rs 5000 at 10% for 2 years.",
            _res("2 kg", 2.0))
        assert out is not None and out[0] == "money"

    def test_money_ask_served_rupees_passes(self):
        assert _quantity_intent_veto(
            "Find the interest on Rs 5000 at 10% for 2 years.",
            _res("Rs 1000", 1000.0)) is None

    def test_unclassifiable_unit_passes(self):
        assert _quantity_intent_veto(
            DEFECT_STEM, _res("about 1.75 jiggles", 1.75)) is None

    def test_veto_never_raises_on_garbage(self):
        assert _quantity_intent_veto(None, _res()) is None
        assert _quantity_intent_veto("", _res("5 kg", 5.0)) is None


# --------------------------------------------------------------------------- #
# end-to-end: the live defect stem through answer()
# --------------------------------------------------------------------------- #

class TestEndToEnd:
    def test_time_ask_never_ships_the_height(self):
        from backend.its.solver.answer_pipeline import answer
        r = answer(DEFECT_STEM)
        ans = str(r.answer or "")
        # the wrong-quantity number may never be THE answer
        assert "15.3125 m" not in ans, (r.label, ans)
        if str(r.label).startswith("VERIFIED"):
            # a surviving verified answer must serve the TIME ask
            assert _served_quantities(r) & {"time"}, (r.label, ans)

    def test_veto_marker_reaches_audit_route(self):
        from backend.its.solver.answer_pipeline import answer
        r = answer(DEFECT_STEM)
        route = [str(x) for x in (r.audit.route or [])]
        if not str(r.label).startswith("VERIFIED"):
            assert any(x.startswith("badge:quantity_intent_veto")
                       for x in route) or r.label == GUIDED, route

    def test_matching_quantity_serve_not_vetoed(self):
        from backend.its.solver.answer_pipeline import answer
        r = answer("A car travels 100 km in 2 hours. Find its speed.")
        route = [str(x) for x in (r.audit.route or [])]
        assert not any("quantity_intent_veto" in x for x in route), \
            (r.label, r.answer, route)


if __name__ == "__main__":
    pytest.main([__file__, "-x", "-q"])
