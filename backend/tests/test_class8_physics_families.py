"""test_class8_physics_families.py -- SOLVER-DIG class-8 physics regressions.

Method: REAL diagnostic questions pulled from the class-8 corpus
(c8_physics_ch2 electric current/heating effect, ch3 force & friction,
ch4 pressure, ch6 spherical mirrors) and examiner-graded.  Pre-fix
battery: 29 cases, 7 solved, 6 CONFIRMED wrong (Joule-heat asks answered
as V = I R by the Ohm family; net-force asks answered as a = F/m with
friction ignored; atmospheric-force sci-notation dropped 10^5), rest
honest refusals.  Fixes: C8B_* wave in physics_families.py + Ohm
heat-ask gate + structure-lane PRESSURE sci-notation parse.

NOTE: sibling classes C8_* (efficiency, static friction, pressure-cm...)
belong to the parallel class-8 holder's wave and are tested upstream;
this file pins only the C8B families this dig landed.
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
    assert r is not None and r.matched, f"refused: {q[:70]}"
    return r


# ------------------------------------------- ch2: Joule heating (H = I^2 R t)
@pytest.mark.parametrize("q,expected", [
    ("An electric kettle has a heating coil of resistance 25 ohm. If a "
     "current of 8 A flows through it for 3 minutes, calculate the heat "
     "produced in joules.", "288000 J"),
    ("An electric iron draws a current of 4 A. Its heating element has "
     "a resistance of 55 ohm. Calculate the heat produced in joules if "
     "it is used for 2 minutes.", "105600 J"),
    ("An electric iron draws a current of 4 A from a 220 V supply. "
     "Calculate the heat produced in 1 minute.", "52800 J"),
])
def test_joule_heat(q, expected):
    r = _ans(q)
    assert expected in str(r.final_answer), (q, r.final_answer)


def test_fuse_melt_time():
    r = _ans("A fuse wire has a resistance of 0.2 ohm. It melts when the "
             "heat produced reaches 10 J. If a current of 5 A flows "
             "through it, calculate the time taken for the fuse to melt.")
    assert "time = 2 s" in str(r.final_answer), r.final_answer


def test_ohm_family_refuses_heat_ask():
    # the CRITICAL hijack: V = I R shipped as the answer to a heat ask
    r = model_physics_families(
        "An electric kettle has a heating coil of resistance 25 ohm. If "
        "a current of 8 A flows through it for 3 minutes, calculate the "
        "heat produced in joules.")
    assert r.matched and "voltage" not in str(r.final_answer).lower(), \
        r.final_answer


def test_ohm_control_still_solves():
    r = _ans("An electric lamp draws a current of 0.5 A from a 220 V "
             "supply. Calculate the resistance of its filament.")
    assert "440" in str(r.final_answer), r.final_answer


# ------------------------------------------------ ch3: net force (F1 - F2)
@pytest.mark.parametrize("q,expected", [
    ("A 3 kg block is pulled horizontally on a rough floor with a force "
     "of 20 N. The friction force opposing the motion is 8 N. Calculate "
     "the net force acting on the block.", "12 N"),
    ("A 15 kg box is pushed horizontally with a force of 60 N. The "
     "kinetic friction opposing the motion is 20 N. Calculate the net "
     "horizontal force on the box.", "40 N"),
])
def test_net_force(q, expected):
    r = _ans(q)
    assert expected in str(r.final_answer), (q, r.final_answer)


# ------------------------------------------------- ch4: word-form pressure
@pytest.mark.parametrize("q,expected", [
    ("A force of 250 N acts perpendicularly on a rectangular surface of "
     "dimensions 50 cm by 20 cm. Calculate the pressure exerted on the "
     "surface in pascals.", "2500 Pa"),
    ("A force of 250 N acts uniformly on a rectangular surface of "
     "dimensions 2 m by 1.5 m. Calculate the pressure in pascals.",
     "83.3"),
    ("A rectangular brick of weight 30 N rests on a table. Its "
     "dimensions are 20 cm by 10 cm by 5 cm. Calculate the pressure "
     "exerted when the brick lies on its largest face.", "1500 Pa"),
    ("A rectangular brick of weight 30 N rests on a table. Its "
     "dimensions are 20 cm by 10 cm by 5 cm. Calculate the pressure "
     "exerted when the brick stands on its smallest face.", "6000 Pa"),
    ("A tractor has two rear tyres, each with a contact area of 0.15 "
     "m^2. The total weight of the tractor is 12,000 N. Calculate the "
     "pressure exerted by each rear tyre on the ground.", "40000 Pa"),
])
def test_pressure_word_forms(q, expected):
    r = _ans(q)
    assert expected in str(r.final_answer), (q, r.final_answer)


def test_atm_force_scientific_notation():
    # pipeline anchor: 1.01 x 10^5 Pa x 0.015 m^2 = 1515 N -- the 10^5
    # used to be dropped and the ship was 0.01515 N
    from backend.its.solver.answer_pipeline import answer
    r = answer("Calculate the force exerted by atmospheric pressure on "
               "the top of a student's head if the cross-sectional area "
               "is 0.015 m^2. Use atmospheric pressure of 1.01 x 10^5 "
               "Pa.")
    if str(r.label).startswith("VERIFIED") and r.numeric is not None:
        assert abs(float(r.numeric) - 1515.0) < 1.0, r.answer


def test_pressure_structure_sci_notation():
    from backend.its.solver.structure_families import _c_pressure
    r = _c_pressure(
        {}, "Use atmospheric pressure of 1.01 x 10^5 Pa on an area of "
            "0.015 m^2 to find the force.")
    assert r is not None, "structure PRESSURE refused"
    assert abs(float(r[0]) - 1515.0) < 1.0, r[2]


# ------------------------------------------------- ch6: spherical mirrors
@pytest.mark.parametrize("q,expected", [
    ("A concave mirror used in a solar cooker has a radius of curvature "
     "of 40 cm. Calculate its focal length in metres.", "0.2 m"),
    ("The radius of curvature of a convex mirror used as a rear-view "
     "mirror in a car is 2.0 m. Calculate its focal length.", "+1 m"),
    ("A concave mirror has a radius of curvature of 30 cm. Find its "
     "focal length.", "15 cm"),
])
def test_mirror_focal_length(q, expected):
    r = _ans(q)
    assert expected in str(r.final_answer), (q, r.final_answer)


def test_mirror_type_erect_diminished():
    # LENS_POWER hijack shipped "5 D"; the ask is type + radius
    r = _ans("A mirror has a focal length of 20 cm and always forms an "
             "erect, diminished image. What type of mirror is it and "
             "what is its radius of curvature?")
    ans = str(r.final_answer)
    assert "convex" in ans.lower() and "40" in ans, ans
