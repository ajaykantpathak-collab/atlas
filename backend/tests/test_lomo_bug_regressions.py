"""test_lomo_bug_regressions.py -- regressions for the two LOMO-recompute
mismatch bugs (recompute_lomo_baseline.md, 2026-10-05).

BUG 1 -- SPEED_DIST_TIME (model_maths) bound the solve target by the first
of the words "speed"/"distance"/"time" appearing ANYWHERE in the text, so
"A car travels 120 km in 3 hours at a constant speed. How far will it go in
7 hours?" shipped the speed (40) instead of the asked distance (280 km).
Fix contract: the ASKED quantity is read from the question text ("how far"
-> distance, "how long" -> time, "what speed/how fast" -> speed); the
base triangle (any one of speed/distance/time from the other two) and the
extended triangle (reference pair + one more value of another kind) both
bind the target accordingly, with the answer unit carried in final_answer.

BUG 2 -- WEIGHT_MG (model_physics_families) answered a two-pan balance
question with W = m g: "two identical bags (each x kg) and a 2kg weight on
one side of a scale; the other side has a 10kg weight" shipped 19.6 N
instead of the mass equality 2x + 2 = 10 -> x = 4 kg.  Fix contract: a
two-pan balance compares MASSES -- model the balance as mass equality
directly and answer in the asked mass unit (kg/g); refuse (never W = m g)
when the balance parse or the asked unit is ambiguous.  Also un-deadens the
family's mass-from-weight lane (a newton-given mass ask must answer in kg,
not refuse) while keeping every existing W = m g behaviour intact.

Each test asserts BOTH the numeric value and the unit string.  The two
exact LOMO bank rows are pinned verbatim (qid 07e8aaff / 08a98b90).
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

import pytest  # noqa: E402

from backend.its.solver.maths_families import model_maths  # noqa: E402
from backend.its.solver.physics_families import \
    model_physics_families  # noqa: E402


# --------------------------------------------------------------------------- #
# BUG 1 -- SPEED_DIST_TIME: the asked quantity binds the target
# --------------------------------------------------------------------------- #

LOMO_Q1 = ("A car travels 120 km in 3 hours at a constant speed. "
           "How far will it go in 7 hours?")


def test_lomo_speed_dist_time_how_far_is_distance():
    """The exact LOMO row (qid 07e8aaff): asked 'how far' -> 280 km,
    never the intermediate speed 40."""
    r = model_maths(LOMO_Q1)
    assert r.matched and r.structure == "SPEED_DIST_TIME"
    assert r.numeric_answer == pytest.approx(280.0)
    assert "280 km" in r.final_answer
    assert "40" not in r.final_answer.split(".")[0]  # no bare-speed ship


def test_sdt_speed_ask_from_distance_and_time():
    r = model_maths("A car travels 120 km in 3 hours. What is its speed?")
    assert r.matched and r.structure == "SPEED_DIST_TIME"
    assert r.numeric_answer == pytest.approx(40.0)
    assert "km/h" in r.final_answer


def test_sdt_speed_ask_how_fast():
    r = model_maths("A bus covers 240 km in 4 hours. How fast does it move?")
    assert r.matched and r.numeric_answer == pytest.approx(60.0)
    assert "km/h" in r.final_answer


def test_sdt_distance_ask_from_speed_and_time():
    r = model_maths("A car moves at 40 km/h for 3 hours. "
                     "How far does it travel?")
    assert r.matched and r.numeric_answer == pytest.approx(120.0)
    assert "120 km" in r.final_answer


def test_sdt_time_ask_from_speed_and_distance():
    r = model_maths("A train covers 300 km at 60 km/h. "
                     "How long does the journey take?")
    assert r.matched and r.numeric_answer == pytest.approx(5.0)
    assert "5 hours" in r.final_answer


def test_sdt_distance_ask_reference_pair_plus_extra_time():
    """Extended triangle: 90 km in 2 h fixes the speed; 'in 5 hours' is the
    new time -> 225 km."""
    r = model_maths("A bus covers 90 km in 2 hours. How much distance "
                     "will it cover in 5 hours?")
    assert r.matched and r.numeric_answer == pytest.approx(225.0)
    assert "225 km" in r.final_answer


def test_sdt_time_ask_reference_pair_plus_extra_distance():
    """Extended triangle: 120 km in 3 h fixes the speed; 200 km is the new
    distance -> 5 hours (the old code shipped the speed 40 here too)."""
    r = model_maths("A car travels 120 km in 3 hours. How long will it "
                     "take to travel 200 km at the same speed?")
    assert r.matched and r.numeric_answer == pytest.approx(5.0)
    assert "5 hours" in r.final_answer


def test_sdt_m_per_second_system():
    r = model_maths("A cyclist rides 500 m in 100 seconds. "
                     "What is her speed?")
    assert r.matched and r.numeric_answer == pytest.approx(5.0)
    assert "m/s" in r.final_answer


def test_sdt_speed_unit_override_to_ms():
    r = model_maths("A car travels 120 km in 3 hours. "
                     "Find its speed in m/s.")
    assert r.matched
    assert r.numeric_answer == pytest.approx(40.0 * 1000.0 / 3600.0,
                                             rel=1e-3)
    assert "m/s" in r.final_answer


def test_sdt_ambiguous_ask_refuses():
    """Distance asked but the only distance is the given one and no extra
    time exists: nothing to solve -- honest refusal, never a guess."""
    r = model_maths("A car travels 120 km in 3 hours. How far will it go?")
    shipped_sdt = (r.matched and r.structure == "SPEED_DIST_TIME"
                   and r.numeric_answer is not None)
    assert not shipped_sdt


def test_sdt_does_not_hijack_kinematics():
    """Acceleration vocabulary belongs to the kinematics families; the
    constant-speed triangle must not fire on it."""
    r = model_maths("A car accelerates uniformly from rest to a velocity "
                     "of 20 m/s in 5 s. Find the distance covered.")
    assert not (r.matched and r.structure == "SPEED_DIST_TIME")


def test_sdt_multi_leg_is_not_bind_first_pair():
    """Two legs + 'average speed' is the average-speed class, not
    speed = first distance / first time (the 75-instead-of-66.67 trap)."""
    r = model_maths("A car travels 150 km in 2 hours, then 50 km in 1 "
                     "hour. What is its average speed for the whole "
                     "journey?")
    assert not (r.matched and r.structure == "SPEED_DIST_TIME")


# --------------------------------------------------------------------------- #
# BUG 2 -- WEIGHT_MG: balance = mass equality; asked unit decides
# --------------------------------------------------------------------------- #

LOMO_Q2 = ("A shopkeeper puts two identical bags of sugar (each $x$ kg) and "
           "a 2kg weight on one side of a scale. The other side has a 10kg "
           "weight. Find the weight of one bag.")


def test_lomo_weight_balance_two_bags():
    """The exact LOMO row (qid 08a98b90): 2x + 2 = 10 -> 4 kg, never 19.6 N."""
    r = model_physics_families(LOMO_Q2)
    assert r.matched and r.structure == "WEIGHT_MG"
    assert r.numeric_answer == pytest.approx(4.0)
    assert "kg" in r.final_answer
    assert "N" not in r.final_answer


def test_balance_three_watermelons():
    r = model_physics_families("A fruit seller puts three identical "
                               "watermelons (each $y$ kg) on one pan of a "
                               "balance and a 12 kg weight on the other pan. "
                               "Find the weight of one watermelon.")
    assert r.matched and r.numeric_answer == pytest.approx(4.0)
    assert "kg" in r.final_answer
    assert "N" not in r.final_answer


def test_balance_unknown_on_other_side():
    r = model_physics_families("One pan of a balance has a 5 kg weight. "
                               "The other pan has two identical bricks "
                               "(each x kg). Find the weight of one brick.")
    assert r.matched and r.numeric_answer == pytest.approx(2.5)
    assert "kg" in r.final_answer


def test_balance_grams():
    r = model_physics_families("Two identical packets (each m g) and a 100 g "
                               "weight on one side of a scale balance a "
                               "500 g weight on the other side. Find the "
                               "weight of one packet.")
    assert r.matched and r.numeric_answer == pytest.approx(200.0)
    assert "g" in r.final_answer and "kg" not in r.final_answer
    assert "N" not in r.final_answer


def test_balance_four_tins_with_extra_weight():
    r = model_physics_families("A shopkeeper places four identical tins "
                               "(each x kg) together with a 3 kg weight on "
                               "one side of a scale; the other side carries "
                               "a 23 kg weight. Find the weight of one tin.")
    assert r.matched and r.numeric_answer == pytest.approx(5.0)
    assert "kg" in r.final_answer


def test_balance_unparseable_refuses():
    """No unknown variable to solve for: honest refusal, never W = m g."""
    r = model_physics_families("A shopkeeper puts some identical bags of "
                               "sugar on one side of a scale and a 10 kg "
                               "weight on the other side. Find the weight "
                               "of one bag.")
    assert not r.matched or r.numeric_answer is None


def test_balance_unitless_unknown_uses_scale_unit():
    """'two identical bags (each x)' with no unit token: the unknown's unit
    comes from the balance's own masses (all sides kg -> kg) -- derived,
    not guessed; 2x = 10 -> 5 kg."""
    r = model_physics_families(
        "A shopkeeper puts two identical bags (each x) on one side of a "
        "scale and a 10 kg weight on the other side. Find the mass of "
        "one bag.")
    assert r.matched and r.numeric_answer == pytest.approx(5.0)
    assert "5 kg" in r.final_answer
    assert "N" not in r.final_answer


def test_balance_force_side_load_refuses():
    """A newton load on a balance pan: mass equality does not apply and
    the load is not a mass token -- fail closed, never W = m g."""
    r = model_physics_families(
        "Two identical bags (each x kg) are placed on one side of a "
        "scale and a 10 N load pulls the other side down. "
        "Find the mass of one bag.")
    assert not r.matched or r.numeric_answer is None


def test_weight_mg_lane_unchanged():
    r = model_physics_families("The mass of an object is 5 kg. What is its "
                               "weight on the earth? (g = 9.8 m/s^2)")
    assert r.matched and r.structure == "WEIGHT_MG"
    assert r.numeric_answer == pytest.approx(49.0)
    assert "N" in r.final_answer


def test_weight_mass_from_weight_in_kg():
    """A mass ask with a newton given must answer in kg (m = W/g), not
    refuse and never answer in N."""
    r = model_physics_families("The weight of a body is 98 N. What is its "
                               "mass? (g = 9.8 m/s^2)")
    assert r.matched and r.numeric_answer == pytest.approx(10.0)
    assert "kg" in r.final_answer
    assert "N" not in r.final_answer


def test_weight_mass_from_weighs_phrasing():
    r = model_physics_families("An object weighs 98 N on the earth. "
                               "If g = 9.8 m/s^2, find its mass.")
    assert r.matched and r.numeric_answer == pytest.approx(10.0)
    assert "kg" in r.final_answer


def test_weight_implausible_g_still_refuses():
    """The planted gate attack (g = 200 m/s^2) must keep refusing."""
    r = model_physics_families("The moon's gravitational acceleration is "
                               "200 m/s^2. An object weighs 10 kg on the "
                               "moon. What is its weight on the moon?")
    assert not r.matched or r.numeric_answer is None


# --------------------------------------------------------------------------- #
# BUG 2 follow-ups (2026-10-05, third LOMO wave): the gaps that survived the
# first fix -- every test below asserts BOTH the value and the unit.
# --------------------------------------------------------------------------- #

def test_balance_each_of_mass_x_kg_no_parens():
    """'bags each of mass x kg' (no parens): the count window must strip the
    stacked trailing markers (' each of mass '), not just the last one."""
    r = model_physics_families(
        "Two identical bags each of mass x kg and a 2kg weight are placed "
        "on one pan of a scale. The other pan has a 10kg weight. "
        "Find the mass of one bag.")
    assert r.matched and r.structure == "WEIGHT_MG"
    assert r.numeric_answer == pytest.approx(4.0)
    assert "4 kg" in r.final_answer
    assert "N" not in r.final_answer


def test_balance_counted_noun_no_letter_variable():
    """The no-'x' textbook shape: 'two identical bags ... What is the mass
    of one bag?' -- the counted noun itself is the unknown (2x + 2 = 10)."""
    r = model_physics_families(
        "Two identical bags of sugar are placed on one side of a balance "
        "scale along with a 2 kg weight. On the other side of the scale is "
        "a 10 kg weight. What is the mass of one bag?")
    assert r.matched and r.structure == "WEIGHT_MG"
    assert r.numeric_answer == pytest.approx(4.0)
    assert "4 kg" in r.final_answer
    assert "N" not in r.final_answer


def test_balance_counted_noun_digit_count():
    r = model_physics_families(
        "On one side of a scale there are 2 identical bags and a 2 kg "
        "weight. On the other side there is a 10 kg weight. What is the "
        "mass of each bag?")
    assert r.matched and r.numeric_answer == pytest.approx(4.0)
    assert "4 kg" in r.final_answer


def test_balance_counted_noun_four_items():
    r = model_physics_families(
        "Four identical books and a 3 kg weight are placed on one pan of "
        "a balance. The other pan carries a 11 kg weight. "
        "Find the mass of one book.")
    assert r.matched and r.numeric_answer == pytest.approx(2.0)
    assert "2 kg" in r.final_answer


def test_balance_counted_noun_grams():
    """Counted-noun unknown with gram-form side masses: the answer unit
    must follow the scale's mass unit, not silently become kg."""
    r = model_physics_families(
        "Three identical coins are placed on one side of a balance "
        "along with a 100 g weight. On the other side there is a 400 g "
        "weight. Find the mass of one coin.")
    assert r.matched and r.numeric_answer == pytest.approx(100.0)
    assert "100 g" in r.final_answer
    assert "kg" not in r.final_answer
    assert "N" not in r.final_answer


def test_balance_counted_noun_mixed_units_refuses():
    """kg and g side masses mixed: the display unit is ambiguous --
    fail closed, never pick one side's unit and guess."""
    r = model_physics_families(
        "Two identical boxes are placed on one side of a scale along "
        "with a 500 g weight. On the other side there is a 10 kg weight. "
        "Find the mass of one box.")
    assert not r.matched or r.numeric_answer is None


def test_balance_force_ask_newtons():
    """A balance with an explicit newton ask: mass equality first, then
    W = m g -- the shipped unit must be N."""
    r = model_physics_families(
        "A shopkeeper puts two identical bags (each x kg) and a 2kg "
        "weight on one side of a scale. The other side has a 10kg "
        "weight. Find the weight of one bag in newtons. "
        "(g = 9.8 m/s^2)")
    assert r.matched and r.numeric_answer == pytest.approx(39.2)
    assert "39.2 N" in r.final_answer
    assert "kg" not in r.final_answer


def test_weight_mass_ask_in_grams():
    """'find the mass in grams' with a newton given: W/g in kg then x1000
    -- the shipped unit must be g (the old code answered '10 kg')."""
    r = model_physics_families(
        "The weight of a body is 98 N. What is its mass in grams? "
        "(g = 9.8 m/s^2)")
    assert r.matched and r.numeric_answer == pytest.approx(10000.0)
    assert "10000 g" in r.final_answer
    assert "kg" not in r.final_answer


def test_weight_mass_ask_kg_stays_kg():
    """The gram lane must not leak into the plain kg ask."""
    r = model_physics_families(
        "The weight of a body is 98 N. What is its mass? "
        "(g = 9.8 m/s^2)")
    assert r.matched and r.numeric_answer == pytest.approx(10.0)
    assert "10 kg" in r.final_answer


def test_balance_unknown_on_later_side_mass_ask():
    """The unknown may sit on the second-mentioned side; 'mass' ask."""
    r = model_physics_families(
        "One pan of a balance has a 5 kg weight. The other pan has two "
        "identical bricks (each x kg). Find the mass of one brick.")
    assert r.matched and r.numeric_answer == pytest.approx(2.5)
    assert "2.5 kg" in r.final_answer


# --------------------------------------------------------------------------- #
# BUG 1 follow-ups: every ask-direction x unit-system pin (value AND unit)
# --------------------------------------------------------------------------- #

def test_sdt_distance_ask_how_many_km():
    r = model_maths("A bus travels at 30 km/h. "
                     "How many km will it cover in 5 hours?")
    assert r.matched and r.numeric_answer == pytest.approx(150.0)
    assert "150 km" in r.final_answer


def test_sdt_time_ask_how_much_time():
    r = model_maths("A man walks at 5 km/h. How much time will he take "
                     "to cover 20 km?")
    assert r.matched and r.numeric_answer == pytest.approx(4.0)
    assert "4 hours" in r.final_answer


def test_sdt_time_ask_how_many_hours():
    r = model_maths("A jet flies at 900 km/h. How many hours will it "
                     "take to fly 4500 km?")
    assert r.matched and r.numeric_answer == pytest.approx(5.0)
    assert "5 hours" in r.final_answer


def test_sdt_distance_ask_minutes_time_given():
    """A minutes-given distance ask: 40 km/h x 1.5 h = 60 km."""
    r = model_maths("A car travels 120 km in 3 hours at a constant "
                     "speed. How far will it go in 90 minutes?")
    assert r.matched and r.numeric_answer == pytest.approx(60.0)
    assert "60 km" in r.final_answer


def test_sdt_speed_ask_m_system():
    r = model_maths("A swimmer covers 150 m in 30 seconds. "
                     "What is her speed?")
    assert r.matched and r.numeric_answer == pytest.approx(5.0)
    assert "5 m/s" in r.final_answer


def test_sdt_speed_in_ms_conversion_is_true_conversion():
    """120 km in 3 h = 40 km/h = 11.11 m/s (a bare rescale without the
    /3.6 would ship 40 'm/s')."""
    r = model_maths("Find the speed in m/s of a car that travels "
                     "120 km in 3 hours.")
    assert r.matched
    assert r.numeric_answer == pytest.approx(40000.0 / 3600.0, rel=1e-3)
    assert "m/s" in r.final_answer
