"""test_physics3_chemistry3.py -- batteries for the physics3 + chemistry3
gap families (classes 11-12 CBSE).

One representative board-style question per family in
physics3_families.py (15 families) and chemistry3_families.py (12
families), with the expected numeric answer verified independently.
Plus gate/variant tests: one failing row = one family regression.

Run:
    cd /d/platform && python -m pytest backend/its/tests/test_physics3_chemistry3.py -q
"""

from __future__ import annotations

import math

import pytest

from backend.its.solver.chemistry_families import model_chemistry3
from backend.its.solver.physics_families import model_physics3


def _check(model, text: str, want: float, rel: float = 1e-3,
           structure: str = None):
    r = model(text)
    assert r.matched, f"not matched: {text[:70]} (note={r.note})"
    if structure is not None:
        assert r.structure == structure, \
            f"got {r.structure}, want {structure}: {text[:70]}"
    assert r.confidence >= 0.93, f"confidence too low: {r.confidence}"
    assert r.numeric_answer is not None, f"no numeric answer: {text[:70]}"
    assert r.numeric_answer == pytest.approx(want, rel=rel), \
        f"got {r.numeric_answer}, want {want}: {text[:70]}"
    assert r.steps, "steps must not be empty"
    assert r.final_answer, "final_answer must not be empty"
    assert r.governing_equation, "governing_equation must not be empty"
    return r


def _refused(model, text: str):
    r = model(text)
    assert not r.matched, \
        f"should refuse: {text[:70]} (matched {r.structure} instead)"


# =========================================================================== #
# PHYSICS3 -- one test per family (15) plus variants/gates
# =========================================================================== #

# ---- optics ----

def test_snells_law():
    want = math.degrees(math.asin(1.0 * math.sin(math.radians(30.0)) / 1.5))
    _check(model_physics3,
           "Light goes from air (n=1) to glass (n=1.5) with angle of "
           "incidence 30 degrees.",
           want, structure="SNELLS_LAW")


def test_snells_law_medium_table():
    # media named without explicit n: air=1.0 -> water=1.33 table values
    want = math.degrees(math.asin(1.0 * math.sin(math.radians(40.0)) / 1.33))
    _check(model_physics3,
           "Light travels from air to water with angle of incidence 40 "
           "degrees. Find the angle of refraction.",
           want, structure="SNELLS_LAW")


def test_snells_law_tir_refused():
    # n1 sin(i) / n2 > 1: total internal reflection, no refracted ray
    _refused(model_physics3,
             "Light goes from glass (n=1.5) to air (n=1) with angle of "
             "incidence 60 degrees.")


def test_critical_angle():
    want = math.degrees(math.asin(1.33 / 1.5))
    _check(model_physics3,
           "Find the critical angle for glass-water interface where "
           "n(glass)=1.5 and n(water)=1.33.",
           want, structure="CRITICAL_ANGLE")


def test_prism_deviation():
    want = 2.0 * math.degrees(math.asin(1.5 * math.sin(math.radians(30.0)))) \
        - 60.0
    _check(model_physics3,
           "Find the angle of deviation for a prism with angle 60 degrees "
           "and refractive index 1.5 at minimum deviation.",
           want, structure="PRISM_DEVIATION")


def test_power_lens():
    _check(model_physics3,
           "Find the power of a lens with focal length 25 cm.",
           1.0 / 0.25, structure="POWER_LENS")


def test_power_lens_concave_negative():
    _check(model_physics3,
           "Find the power of a concave lens with focal length 20 cm.",
           1.0 / (-0.20), structure="POWER_LENS")


# ---- modern physics ----

def test_de_broglie_electron():
    _check(model_physics3,
           "Find the de Broglie wavelength of an electron moving at 10^6 "
           "m/s.",
           6.63e-34 / (9.11e-31 * 1e6), structure="DE_BROGLIE")


def test_de_broglie_proton_sci_pair():
    _check(model_physics3,
           "Find the de Broglie wavelength of a proton moving at "
           "2 x 10^6 m/s.",
           6.63e-34 / (1.67e-27 * 2e6), structure="DE_BROGLIE")


def test_radioactive_decay():
    _check(model_physics3,
           "Find the remaining mass of a radioactive substance with initial "
           "mass 100 g and half-life 5 years after 15 years.",
           100.0 * 0.5 ** (15.0 / 5.0), structure="RADIOACTIVE_DECAY")


# ---- electrostatics / capacitance ----

def test_electric_potential():
    _check(model_physics3,
           "Find the electric potential at distance 0.3 m from a charge of "
           "2 x 10^-6 C.",
           9e9 * 2e-6 / 0.3, structure="ELECTRIC_POTENTIAL")


def test_electric_potential_micro_variant():
    _check(model_physics3,
           "Find the electric potential at a distance of 30 cm from a "
           "charge of 2 microcoulomb.",
           9e9 * 2e-6 / 0.3, structure="ELECTRIC_POTENTIAL")


def test_capacitance():
    _check(model_physics3,
           "Find the capacitance of a capacitor with charge 2 x 10^-6 C at "
           "potential 100 V.",
           2e-6 / 100.0, structure="CAPACITANCE")


def test_capacitors_series():
    _check(model_physics3,
           "Find the total capacitance of 2 uF and 3 uF in series.",
           (2.0 * 3.0) / (2.0 + 3.0) * 1e-6, structure="CAPACITORS_SERIES")


def test_capacitors_parallel():
    _check(model_physics3,
           "Find the total capacitance of 2 uF and 3 uF in parallel.",
           (2.0 + 3.0) * 1e-6, structure="CAPACITORS_PARALLEL")


# ---- circuits ----

def test_kirchhoff_current():
    _check(model_physics3,
           "At a junction, 3 A enters and 1 A leaves through one branch. "
           "Find the current through the other branch.",
           3.0 - 1.0, structure="KIRCHHOFF_CURRENT")


def test_kirchhoff_current_gate_refused():
    # more current leaving than entering: physically impossible, must refuse
    _refused(model_physics3,
             "At a junction, 2 A enters and 5 A leaves through one branch. "
             "Find the current through the other branch.")


def test_wheatstone_balanced():
    _check(model_physics3,
           "Find the unknown resistance X in a balanced Wheatstone bridge "
           "with P=10, Q=15, R=5 ohms.",
           15.0 * 5.0 / 10.0, structure="WHEATSTONE_BALANCED")


def test_wheatstone_unbalanced_refused():
    _refused(model_physics3,
             "Find X for an unbalanced Wheatstone bridge with P=10, Q=15, "
             "R=5 ohms.")


def test_resistivity():
    _check(model_physics3,
           "Find the resistance of a wire of length 2 m, area 1 x 10^-6 "
           "m^2, and resistivity 1.5 x 10^-8 ohm m.",
           1.5e-8 * 2.0 / 1e-6, structure="RESISTIVITY")


# ---- magnetism ----

def test_magnetic_field_solenoid():
    want = 4.0 * math.pi * 1e-7 * (500.0 / 0.5) * 2.0
    _check(model_physics3,
           "Find the magnetic field inside a solenoid with 500 turns, "
           "0.5 m long, carrying 2 A current.",
           want, structure="MAGNETIC_FIELD")


def test_force_on_conductor():
    _check(model_physics3,
           "Find the force on a wire of length 0.2 m carrying 5 A current "
           "perpendicular to a magnetic field of 0.5 T.",
           0.5 * 5.0 * 0.2, structure="FORCE_ON_CONDUCTOR")


def test_physics3_garbage_refused():
    _refused(model_physics3, "What is the capital of France?")


# =========================================================================== #
# CHEMISTRY3 -- one test per family (12) plus variants/gates
# =========================================================================== #

# ---- thermo ----

def test_gibbs_energy():
    _check(model_chemistry3,
           "Find \u0394G when \u0394H = -500 kJ/mol, temperature is 300 K, "
           "and \u0394S = 0.2 kJ/K-mol.",
           -500.0 - 300.0 * 0.2, structure="GIBBS_ENERGY")


def test_entropy_change():
    _check(model_chemistry3,
           "Find the entropy change when 100 J of heat is added reversibly "
           "at 300 K.",
           100.0 / 300.0, structure="ENTROPY_CHANGE")


# ---- equilibrium ----

def test_le_chatelier_pressure_increase():
    # value convention: n(gas, right) - n(gas, left) = 2 - 4 = -2
    r = _check(model_chemistry3,
               "For the reaction N2 + 3H2 <=> 2NH3 + heat, what happens if "
               "pressure increases?",
               2.0 - 4.0, structure="LE_CHATELIER")
    assert "forward" in (r.final_answer or "").lower()
    assert str(4) in r.final_answer and str(2) in r.final_answer


def test_le_chatelier_pressure_decrease():
    r = _check(model_chemistry3,
               "For the reaction N2 + 3H2 <=> 2NH3 + heat, what happens if "
               "pressure decreases?",
               2.0 - 4.0, structure="LE_CHATELIER")
    assert "backward" in (r.final_answer or "").lower()


# ---- electrochemistry ----

def test_electrolysis_mass():
    _check(model_chemistry3,
           "Find the mass deposited when 2 A current flows through CuSO4 "
           "solution for 30 minutes.",
           0.0003294 * 2.0 * (30.0 * 60.0), structure="ELECTROLYSIS_MASS")


def test_faraday_electrolysis():
    _check(model_chemistry3,
           "Find the charge required to deposit 1 mole of Al from Al3+.",
           1.0 * 3.0 * 96500.0, structure="FARADAY_ELECTROLYSIS")


# ---- stoichiometry ----

def test_stoichiometry_mass_mass():
    _check(model_chemistry3,
           "Find the mass of CO2 produced when 10 g of CaCO3 decomposes "
           "completely.",
           10.0 / 100.0 * 44.0, structure="STOICHIOMETRY_MASS_MASS")


# ---- ionic ----

def test_ph_poh():
    _check(model_chemistry3,
           "Find the pOH of a solution with pH 3.",
           14.0 - 3.0, structure="PH_POH")


def test_ph_from_poh():
    _check(model_chemistry3,
           "Find the pH of a solution with pOH 4.",
           14.0 - 4.0, structure="PH_POH")


def test_ph_out_of_range_refused():
    _refused(model_chemistry3, "Find the pOH of a solution with pH 15.")


# ---- kinetics ----

def test_second_order_kinetics():
    _check(model_chemistry3,
           "Find the time for a second-order reaction with k = 0.1 L/mol s, "
           "[A]0 = 1 M, to reach [A] = 0.5 M.",
           (1.0 / 0.5 - 1.0 / 1.0) / 0.1, structure="SECOND_ORDER_KINETICS")


def test_second_order_growth_refused():
    # [A] rising above [A]0 is impossible for a second-order decay: refuse
    _refused(model_chemistry3,
             "Find the time for a second-order reaction with k = 0.1 L/mol "
             "s, [A]0 = 0.5 M, to reach [A] = 1 M.")


def test_arrhenius_activation():
    want = 8.314 * math.log(0.1 / 0.01) / (1.0 / 300.0 - 1.0 / 310.0)
    _check(model_chemistry3,
           "Find the activation energy given rate constants k1 = 0.01 at "
           "T1 = 300 K and k2 = 0.1 at T2 = 310 K.",
           want, structure="ARRHENIUS_ACTIVATION")


# ---- solutions ----

def test_concentration_after_mixing():
    _check(model_chemistry3,
           "Find the concentration when 100 ml of 2 M solution is mixed "
           "with 200 ml of 1 M solution.",
           (2.0 * 0.1 + 1.0 * 0.2) / 0.3,
           structure="CONCENTRATION_AFTER_MIXING")


def test_dilution_m1v1():
    _check(model_chemistry3,
           "What volume of 12 M HCl is needed to make 500 ml of 0.5 M HCl?",
           0.5 * 500.0 / 12.0, structure="DILUTION_M1V1")


# ---- redox ----

def test_oxidation_number():
    _check(model_chemistry3,
           "Find the oxidation number of S in H2SO4.",
           +6.0, structure="OXIDATION_NUMBER")


def test_oxidation_number_permanganate():
    _check(model_chemistry3,
           "Find the oxidation number of Mn in KMnO4.",
           +7.0, structure="OXIDATION_NUMBER")


def test_oxidation_number_chloride():
    _check(model_chemistry3,
           "Find the oxidation number of Cl in NaCl.",
           -1.0, structure="OXIDATION_NUMBER")


def test_chemistry3_garbage_refused():
    _refused(model_chemistry3, "Tell me a joke about integers.")


# =========================================================================== #
# BATCH-9 ADDITIONS: wave speed, photon energy, snell prose narrations,
# pH from [H+], moles at STP, pH/pOH direct narrations
# =========================================================================== #

def test_wave_speed():
    _check(model_physics3,
           "A wave has frequency 50 Hz and wavelength 3.4 m. Find its speed.",
           170.0, structure="WAVE_SPEED")


def test_wave_speed_variant():
    _check(model_physics3,
           "A sound wave of frequency 340 Hz has a wavelength of 1 m. "
           "Find the speed of the wave.",
           340.0, structure="WAVE_SPEED")


def test_photon_energy_nm():
    # family constants: h=6.63e-34, c=3.0e8, 1 eV=1.6e-19 J
    want = 6.63e-34 * 3.0e8 / (400e-9) / 1.6e-19
    _check(model_physics3,
           "Light of wavelength 400 nm falls on a metal. Find the energy "
           "of a photon in eV.",
           want, structure="PHOTON_ENERGY")


def test_photon_energy_wavelength_first():
    _check(model_physics3,
           "Wavelength of the incident light is 620 nm. Find the energy of "
           "a photon in eV.",
           6.63e-34 * 3.0e8 / (620e-9) / 1.6e-19, structure="PHOTON_ENERGY")


def test_snells_law_prose_index():
    # prose refractive index between the media, decimal in the gap
    want = math.degrees(math.asin(1.0 * math.sin(math.radians(30.0)) / 1.5))
    _check(model_physics3,
           "A light ray travels from air into glass of refractive index 1.5 "
           "with angle of incidence 30 degrees. Find the angle of refraction.",
           want, structure="SNELLS_LAW")


def test_ph_from_h_concentration():
    _check(model_chemistry3,
           "Find the pH of a solution whose hydrogen ion concentration is "
           "0.001 mol per litre.",
           3.0, structure="PH_FROM_H")


def test_ph_from_h_scientific():
    _check(model_chemistry3,
           "The hydrogen ion concentration of a solution is 2 x 10^-3 M. "
           "Find its pH.",
           -math.log10(2e-3), structure="PH_FROM_H")


def test_moles_at_stp_litres():
    _check(model_chemistry3,
           "Find the number of moles in 5.6 litres of a gas at STP.",
           0.25, structure="MOLES_AT_STP")


def test_moles_at_stp_millilitres():
    _check(model_chemistry3,
           "Find the number of moles in 560 millilitres of a gas at STP.",
           0.025, structure="MOLES_AT_STP")


def test_poh_given_find_ph():
    _check(model_chemistry3,
           "The pOH of a solution is 3.5. Find its pH.",
           10.5, structure="PH_POH")


def test_ph_given_find_poh():
    _check(model_chemistry3,
           "The pH of a solution is 2.8. Find the pOH.",
           11.2, structure="PH_POH")


def test_wave_speed_garbage_refused():
    _refused(model_physics3, "What is the capital of France?")