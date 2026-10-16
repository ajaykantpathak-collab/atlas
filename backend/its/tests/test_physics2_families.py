"""test_physics2_families.py -- class 11-12 advanced physics batteries.

One representative board-style question per family in
physics2_families.py, with the expected numeric answer verified
independently.  One failing row = one family regression.

Run:
    cd /d/platform && python -m pytest backend/its/tests/test_physics2_families.py -q
"""

from __future__ import annotations

import math

import pytest

from backend.its.solver.physics_families import TABLE_P2 as TABLE, model_physics2


def _check(text: str, want: float, rel: float = 1e-3,
           structure: str = None):
    r = model_physics2(text)
    assert r.matched, f"not matched: {text[:70]} (note={r.note})"
    if structure is not None:
        assert r.structure == structure, \
            f"got {r.structure}, want {structure}: {text[:70]}"
    assert r.numeric_answer is not None, f"no numeric answer: {text[:70]}"
    assert r.numeric_answer == pytest.approx(want, rel=rel), \
        f"got {r.numeric_answer}, want {want}: {text[:70]}"
    assert r.steps, "steps must not be empty"
    assert r.final_answer, "final_answer must not be empty"
    assert r.governing_equation, "governing_equation must not be empty"
    return r


# --------------------------------------------------------------------------- #
# Optics
# --------------------------------------------------------------------------- #

def test_lens_formula():
    _check("Find the image distance for a lens of focal length 10 cm "
           "when the object is at 15 cm.",
           10.0 * 15.0 / (15.0 + 10.0), structure="LENS_FORMULA")


def test_mirror_formula():
    _check("Find the image distance for a mirror of focal length -10 cm "
           "when the object is at 20 cm.",
           (-10.0 * 20.0) / (20.0 - (-10.0)), structure="MIRROR_FORMULA")


def test_magnification_mirror():
    _check("Find the magnification when image distance is 30 cm and "
           "object distance is 10 cm.",
           -30.0 / 10.0, structure="MAGNIFICATION_MIRROR")


# --------------------------------------------------------------------------- #
# Electrostatics
# --------------------------------------------------------------------------- #

def test_coulombs_law():
    _check("Find the force between two charges of 2 microcoulomb and "
           "3 microcoulomb at distance 0.1 m.",
           9e9 * (2e-6) * (3e-6) / (0.1 ** 2), structure="COULOMBS_LAW")


def test_electric_field():
    _check("Find the electric field when force on charge is 0.02 N and "
           "charge is 4 microcoulomb.",
           0.02 / (4e-6), structure="ELECTRIC_FIELD")


# --------------------------------------------------------------------------- #
# Current electricity
# --------------------------------------------------------------------------- #

def test_series_resistance():
    _check("Find the total resistance of 5 ohm, 10 ohm and 15 ohm "
           "resistors connected in series.",
           5.0 + 10.0 + 15.0, structure="SERIES_RESISTANCE")


def test_series_resistance_four_resistors():
    _check("Find the total resistance of 1 ohm, 2 ohm, 3 ohm and 4 ohm "
           "resistors connected in series.",
           10.0, structure="SERIES_RESISTANCE")


def test_parallel_resistance_2():
    _check("Find the total resistance of 6 ohm and 3 ohm resistors in "
           "parallel.",
           6.0 * 3.0 / (6.0 + 3.0), structure="PARALLEL_RESISTANCE_2")


def test_parallel_resistance_variant():
    _check("Find the total resistance of 12 ohm and 4 ohm resistors in "
           "parallel.",
           12.0 * 4.0 / (12.0 + 4.0), structure="PARALLEL_RESISTANCE_2")


# --------------------------------------------------------------------------- #
# Thermodynamics
# --------------------------------------------------------------------------- #

def test_thermo_first_law():
    _check("Find the internal energy change when 500 J of heat is added "
           "and 200 J of work is done by the system.",
           500.0 - 200.0, structure="THERMO_FIRST_LAW")


def test_heat_engine_efficiency():
    _check("Find the efficiency of a heat engine that produces 300 J of "
           "work from 1000 J of heat input.",
           300.0 / 1000.0 * 100.0, structure="HEAT_ENGINE_EFFICIENCY")


# --------------------------------------------------------------------------- #
# SHM / rotation
# --------------------------------------------------------------------------- #

def test_shm_period_spring():
    _check("Find the period of oscillation of a 2 kg mass on a spring "
           "with spring constant 200 N/m.",
           2.0 * math.pi * math.sqrt(2.0 / 200.0),
           structure="SHM_PERIOD_SPRING")


def test_spring_energy():
    _check("Find the energy stored in a spring with spring constant "
           "500 N/m compressed by 0.1 m.",
           0.5 * 500.0 * (0.1 ** 2), structure="SPRING_ENERGY")


def test_angular_velocity():
    _check("Find the angular velocity of a body moving at 10 m/s in a "
           "circle of radius 5 m.",
           10.0 / 5.0, structure="ANGULAR_VELOCITY")


# --------------------------------------------------------------------------- #
# Electromagnetic induction
# --------------------------------------------------------------------------- #

def test_faraday_emf():
    _check("Find the EMF induced in a coil of 100 turns when magnetic "
           "flux changes by 0.5 weber in 0.2 seconds.",
           100.0 * 0.5 / 0.2, structure="FARADAY_EMF")


# --------------------------------------------------------------------------- #
# Modern physics
# --------------------------------------------------------------------------- #

def test_photoelectric():
    _check("Find the kinetic energy of ejected electron when light of "
           "frequency 6x10^14 Hz hits a metal with work function 2 eV.",
           6.63e-34 * 6e14 - 2.0 * 1.6e-19, structure="PHOTOELECTRIC")


def test_photoelectric_unicode_multiplication_sign():
    # the multiplication sign (U+00D7 escape) must also be accepted
    _check("Find the kinetic energy of ejected electron when light of "
           "frequency 6\u00d710^14 Hz hits a metal with work function 2 eV.",
           6.63e-34 * 6e14 - 2.0 * 1.6e-19, structure="PHOTOELECTRIC")


def test_photoelectric_e_notation():
    _check("Find the kinetic energy of ejected electron when light of "
           "frequency 6e14 Hz hits a metal with work function 2 eV.",
           6.63e-34 * 6e14 - 2.0 * 1.6e-19, structure="PHOTOELECTRIC")


def test_bohr_energy_third_orbit():
    _check("Find the energy of an electron in the 3rd orbit of a "
           "hydrogen atom.",
           -13.6 / 9.0, structure="BOHR_ENERGY")


def test_bohr_energy_ground_state():
    _check("Find the energy of an electron in the 1st orbit of a "
           "hydrogen atom.",
           -13.6, structure="BOHR_ENERGY")


def test_half_life():
    _check("Find the remaining amount after 3 half-lives from an initial "
           "amount of 80 g.",
           80.0 / 2.0 ** 3, structure="HALF_LIFE")


def test_half_life_kg_converted_to_grams():
    _check("Find the remaining amount after 2 half-lives from an initial "
           "amount of 4 kg.",
           4000.0 / 2.0 ** 2, structure="HALF_LIFE")


# --------------------------------------------------------------------------- #
# Mechanics
# --------------------------------------------------------------------------- #

def test_momentum():
    _check("Find the momentum of a 5 kg object moving at 10 m/s.",
           5.0 * 10.0, structure="MOMENTUM")


def test_impulse():
    _check("Find the impulse when a force of 20 N acts for 0.5 seconds.",
           20.0 * 0.5, structure="IMPULSE")


def test_pressure():
    _check("Find the pressure when a force of 100 N acts on an area of "
           "2 square metres.",
           100.0 / 2.0, structure="PRESSURE")


def test_universal_gravitation():
    _check("Find the gravitational force between two masses of 5 kg and "
           "10 kg at distance 2 m.",
           6.67e-11 * 5.0 * 10.0 / (2.0 ** 2),
           structure="UNIVERSAL_GRAVITATION")


# --------------------------------------------------------------------------- #
# Dispatcher contract / table hygiene
# --------------------------------------------------------------------------- #

def test_table_has_20_unique_families():
    ids = [row[0] for row in TABLE]
    assert len(ids) == 20
    assert len(set(ids)) == 20


def test_all_patterns_compile_with_ignorecase():
    import re
    for fid, pattern, _, _ in TABLE:
        assert isinstance(pattern, str)
        # must compile; raw-string discipline keeps backslashes literal
        re.compile(pattern, re.I)


def test_matched_contract_confidence_and_fields():
    r = model_physics2("Find the momentum of a 5 kg object moving at "
                       "10 m/s.")
    assert r.matched is True
    assert r.confidence == pytest.approx(0.93)
    assert isinstance(r.quantities, dict) and r.quantities
    assert r.quantities["result"] == pytest.approx(50.0)
    assert any("ANSWER" in s for s in r.steps)


def test_dispatcher_unmatched_returns_refusal():
    r = model_physics2("Who wrote the play Macbeth?")
    assert r.matched is False
    assert r.structure == "PHYSICS2"
    assert r.numeric_answer is None
    assert r.note


def test_photoelectric_gate_no_emission_below_work_function():
    # photon energy 6.63e-34 * 3e14 = 1.989e-19 J < 2 eV -> no match
    r = model_physics2("Find the kinetic energy of ejected electron when "
                       "light of frequency 3e14 Hz hits a metal with work "
                       "function 2 eV.")
    assert r.matched is False


def test_division_by_zero_gate_mirror():
    # object at 10 cm with f = 10 cm gives u - f = 0 -> refused
    r = model_physics2("Find the image distance for a mirror of focal "
                       "length 10 cm when the object is at 10 cm.")
    assert r.matched is False
