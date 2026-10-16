"""test_class7_physics_families.py -- SOLVER-DIG class-7 physics regressions.

Method (owner standard): REAL board-style questions per chapter pulled
from the corpus (c7_physics_ch02 electricity, ch03 heat, ch04 motion &
time, ch05 light), graded like an examiner.  The pre-fix battery cracked
11/29 with 18 honest refusals and 0 wrong ships; these tests pin the 10
new coverage families (C7_* in physics_families._TABLE_C7) plus the
controls that already worked.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
# deploy root ONLY (backend/ on sys.path forks the its.solver identity)

import pytest

from backend.its.solver.physics_families import model_physics_families


def _ans(q):
    r = model_physics_families(q)
    assert r is not None and r.matched, f"physics families refused: {q[:70]}"
    return r


# ------------------------------------------------------------- ch02 electricity
@pytest.mark.parametrize("q,expected", [
    ("A small electric bulb consumes 10 W of electrical power. How much "
     "electrical energy does it consume in 5 seconds?", "50"),
    ("A torchlight bulb has a resistance of 5 ohm and draws a current of "
     "0.6 A. What is the voltage across the bulb?", "3"),
    ("A small flashlight bulb has a resistance of 5 ohm and draws a "
     "current of 0.6 A. Calculate the electrical power dissipated by the "
     "bulb (P = I^2 x R).", "1.8"),
])
def test_electricity_controls(q, expected):
    r = _ans(q)
    assert expected in str(r.final_answer), (q, r.final_answer)


def test_wood_current_pipeline_anchor():
    # I = V/R = 3/1e6 = 3e-6 A; served outside physics_families — anchor
    # at pipeline level
    from backend.its.solver.answer_pipeline import answer
    r = answer("A dry wooden block has a resistance of 1,000,000 ohm. "
               "Calculate the current flowing through it when connected "
               "across a 3 V battery.")
    if str(r.label).startswith("VERIFIED") and r.numeric is not None:
        assert abs(float(r.numeric) - 3e-6) / 3e-6 < 0.01, r.answer


def test_open_switch_current_zero():
    # trap: naive V/R would answer 0.6 A; an open switch carries nothing
    r = _ans("A circuit contains a 3V battery, an open switch, and a "
             "small electric lamp connected in series. What is the "
             "current flowing through the lamp when the switch is open?")
    assert "0" in str(r.final_answer), r.final_answer


# ------------------------------------------------------------------- ch03 heat
def test_heat_per_degree():
    r = _ans("A metallic rod of mass 2 kg is heated until its temperature "
             "increases by 25 degree C. If the thermal energy supplied is "
             "2200 J, calculate the heat energy added per degree Celsius "
             "rise in temperature.")
    assert "88" in str(r.final_answer), r.final_answer


def test_heat_rate_to_energy():
    r = _ans("Heat flows through a rod at a rate of 50 J per second. "
             "Calculate the total thermal energy transferred in 10 "
             "seconds.")
    assert "500" in str(r.final_answer), r.final_answer


def test_heat_energy_to_rate():
    r = _ans("A stainless steel container absorbs 8400 J of heat in 10 "
             "seconds. Calculate the rate of heat absorption.")
    assert "840" in str(r.final_answer), r.final_answer


def test_heat_rate_small_spoon():
    r = _ans("Heat travels through a spoon at a rate of 0.5 J/s. How much "
             "heat energy is transferred to the handle in 60 seconds?")
    assert "30" in str(r.final_answer), r.final_answer


def test_radiation_distance_control():
    # served by the kernel/unit lanes, not physics_families — anchor at
    # pipeline level: if it ships an answer, it must be the right one
    from backend.its.solver.answer_pipeline import answer
    r = answer("Calculate the distance travelled by thermal radiation "
               "from the Sun in 5 seconds, assuming it travels at "
               "3 x 10^8 m/s.")
    if str(r.label).startswith("VERIFIED") and r.numeric is not None:
        assert abs(float(r.numeric) - 1.5e9) / 1.5e9 < 0.001, r.answer


# --------------------------------------------------------- ch04 motion & time
@pytest.mark.parametrize("q,expected", [
    ("A simple pendulum completes 30 oscillations in 60 seconds. What is "
     "the time period of the pendulum?", "2"),
    ("A student counts 10 oscillations of a pendulum in 20 seconds. What "
     "is the time period?", "2"),
])
def test_motion_controls(q, expected):
    r = _ans(q)
    assert expected in str(r.final_answer), (q, r.final_answer)


@pytest.mark.parametrize("q,expected", [
    # plain d/t speed questions: served by other lanes — pipeline anchors
    ("A cyclist travels a distance of 180 metres in 30 seconds. Calculate "
     "the speed in m/s.", "6"),
    ("A student cycles 600 metres in 120 seconds. Calculate the average "
     "speed in m/s.", "5"),
])
def test_plain_speed_pipeline_anchors(q, expected):
    from backend.its.solver.answer_pipeline import answer
    r = answer(q)
    if str(r.label).startswith("VERIFIED"):
        assert expected in str(r.answer), (q, r.answer)


def test_speed_compare_two_cars():
    r = _ans("Car A travels a distance of 120 kilometres in 2 hours, and "
             "Car B travels 150 kilometres in 3 hours. Calculate the "
             "speed of both cars in km/h.")
    ans = str(r.final_answer)
    assert "60" in ans and "50" in ans and "faster" in ans, ans


def test_speed_segment_first():
    r = _ans("A runner covers the first 200 metres of a race in 25 "
             "seconds and the second 200 metres in 35 seconds. Calculate "
             "her average speed for the first 200 metres in m/s.")
    assert "8" in str(r.final_answer), r.final_answer


def test_speed_whole_race_not_mean_of_speeds():
    # (50m in 5s) + (50m in 7s): v_avg = 100/12 = 8.33, NOT (10+7.14)/2
    r = _ans("A runner covers the first 50 metres of a 100-metre race in "
             "5 seconds and the second 50 metres in 7 seconds. Calculate "
             "her average speed for the whole race in m/s.")
    assert "8.33" in str(r.final_answer), r.final_answer


# ------------------------------------------------------------------- ch05 light
def test_mirror_surface_trap():
    # 30 deg TO THE SURFACE -> 60 deg from the normal (the class-7 trap)
    r = _ans("A light ray strikes a plane mirror at an angle of 30 "
             "degrees to the surface of the mirror. What is the angle of "
             "incidence?")
    assert "60" in str(r.final_answer), r.final_answer


def test_mirror_surface_between_form():
    r = _ans("A student shines a laser at a flat mirror. The angle "
             "between the incident ray and the mirror surface is 40 "
             "degrees. What is the angle of reflection?")
    assert "50" in str(r.final_answer), r.final_answer


def test_incident_reflected_sum():
    r = _ans("A light ray strikes a plane mirror such that the angle "
             "between the incident ray and the reflected ray is 80 "
             "degrees. Calculate the angle of reflection.")
    assert "40" in str(r.final_answer), r.final_answer


def test_normal_form_still_owns_its_case():
    # from-the-normal phrasing must NOT be halved or complemented
    r = _ans("Light strikes the top mirror of a periscope at an angle of "
             "incidence of 30 degrees measured from the normal. What is "
             "the angle of reflection at that mirror?")
    assert "30" in str(r.final_answer), r.final_answer


@pytest.mark.parametrize("theta,expected", [
    ("60 degrees", "5"),
    ("45 degrees", "7"),
    ("90 degrees", "3"),
])
def test_mirror_image_count(theta, expected):
    r = _ans(f"Two plane mirrors are placed at an angle of {theta} to "
             f"each other. Calculate the number of images formed of an "
             f"object placed between them.")
    assert expected in str(r.final_answer), (theta, r.final_answer)


def test_mirror_clock():
    r = _ans("A clock hanging on a wall shows the time as 3:25. What "
             "time will its reflection in a plane mirror display?")
    assert "8:35" in str(r.final_answer), r.final_answer
