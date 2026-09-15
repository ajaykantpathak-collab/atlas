"""test_chemistry_reader2.py -- numerical chemistry reader batteries.

Covers the numerical chemistry pack in chemistry_reader.py beyond the
original dilution chain:

    molality, molarity (mass + volume), mass percent, mole fraction,
    ideal-gas volume (V = nRT/P), osmotic pressure (pi = nRT/V) and
    Raoult relative lowering of vapour pressure.

Positives push REAL board phrasings through the FULL pipeline
(answer()) and demand label VERIFIED with an expected value computed
independently here from the physics/chemistry constants.  Refusals
demand that no verified answer ever ships: missing slots, out-of-range
parse-slip guards, and ambiguous asks must all refuse.

    pytest backend/its/tests/test_chemistry_reader2.py -q
"""

from __future__ import annotations

import pytest

# constants used ONLY to compute expected values in this file
R_ATM = 0.0821     # L atm / (mol K)
R_BAR = 0.08314    # L bar / (mol K)
R_KPA = 8.314      # L kPa / (mol K)


def _solve(text: str):
    from backend.its.solver.answer_pipeline import answer
    return answer(text)


def _read(text: str):
    """Unit-level: the reader alone (fresh audit trail)."""
    from backend.its.solver.answer_pipeline import AuditTrail
    from backend.its.solver.chemistry_reader import read_chemistry
    return read_chemistry(text, AuditTrail(lane="B"))


def _verified(text, want, rel=0.005):
    r = _solve(text)
    assert r.label == "VERIFIED", \
        f"{r.label} ({r.refusal_reason}): {text[:70]}"
    assert r.numeric == pytest.approx(want, rel=rel), \
        f"got {r.numeric}, want {want}: {text[:70]}"
    assert r.answer, text[:70]
    return r


def _refused(text):
    """Pipeline level: nothing verified may ship for this text."""
    r = _solve(text)
    assert r.label not in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS"), \
        f"unexpected verified answer {r.answer!r}: {text[:70]}"
    assert r.answer is None and r.numeric is None, text[:70]
    return r


def _refused_reader(text):
    """Reader level: read_chemistry must not produce a verified result."""
    r = _read(text)
    if r is None:
        return None
    assert r.label not in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS"), \
        f"reader verified unexpectedly: {text[:70]}"
    assert r.answer is None and r.numeric is None, text[:70]
    return r


# ------------------------------------------------------------------ #
# 1. molality = (mass / molar mass) / kg_solvent
# ------------------------------------------------------------------ #

def test_molality_glucose_grams_solvent():
    _verified(
        "Calculate the molality of a solution containing 18 g of glucose "
        "(molar mass 180) dissolved in 460 g of water.",
        (18.0 / 180.0) / 0.460)


def test_molality_kg_solvent():
    _verified(
        "Find the molality of a solution prepared by dissolving 7.45 g "
        "of KCl (molar mass 74.5) in 0.5 kg of water.",
        (7.45 / 74.5) / 0.5)


def test_molality_molar_mass_stated_after_water():
    _verified(
        "A solution contains 4 g of sodium hydroxide in 250 g of water. "
        "Find the molality of the solution. The molar mass of sodium "
        "hydroxide is 40.",
        (4.0 / 40.0) / 0.250)


def test_molality_missing_molar_mass_refuses():
    _refused(
        "Find the molality of a solution containing 18 g of glucose "
        "dissolved in 460 g of water.")


def test_molality_out_of_range_refuses():
    # 500 g / 2 g/mol in 10 g water -> 25000 mol/kg: a parse slip guard
    _refused_reader(
        "Calculate the molality of a solution containing 500 g of urea "
        "(molar mass 2) dissolved in 10 g of water.")


# ------------------------------------------------------------------ #
# 2. molarity = (mass / molar mass) / litres_of_solution
# ------------------------------------------------------------------ #

def test_molarity_made_up_to_litres():
    _verified(
        "5.85 g of sodium chloride (molar mass 58.5) is dissolved in "
        "water and the solution is made up to 0.5 litre. Calculate the "
        "molarity of the solution.",
        (5.85 / 58.5) / 0.5)


def test_molarity_ml_solution():
    _verified(
        "Calculate the molarity of a solution containing 4 g of sodium "
        "hydroxide (molar mass 40) in 500 mL of solution.",
        (4.0 / 40.0) / 0.5)


def test_molarity_urea_250ml():
    _verified(
        "Find the molarity of a solution obtained by dissolving 7.5 g of "
        "urea (molar mass 60) in enough water to make 250 mL of solution.",
        (7.5 / 60.0) / 0.25)


def test_molarity_missing_volume_refuses():
    _refused(
        "Calculate the molarity of a solution containing 4 g of sodium "
        "hydroxide (molar mass 40).")


def test_molarity_out_of_range_refuses():
    # 0.1 mol in 0.5 mL -> 200 M: outside any CBSE plausibility band
    _refused_reader(
        "Find the molarity of a solution obtained by dissolving 4 g of "
        "sodium hydroxide (molar mass 40) in 0.5 mL of solution.")


# ------------------------------------------------------------------ #
# 3. mass percent = 100 x solute / (solution | solute + solvent)
# ------------------------------------------------------------------ #

def test_mass_percent_solvent_denominator():
    _verified(
        "A solution contains 5 g of sugar in 45 g of water. Calculate "
        "the mass percent of sugar in the solution.",
        100.0 * 5.0 / (5.0 + 45.0))


def test_mass_percent_solution_denominator():
    _verified(
        "A solution contains 10 g of salt in 90 g of solution. Find the "
        "mass percentage of the salt.",
        100.0 * 10.0 / 90.0)


def test_mass_percent_by_mass_phrase():
    _verified(
        "Calculate the percentage by mass of urea in a solution that "
        "contains 6 g of urea in 144 g of water.",
        100.0 * 6.0 / (6.0 + 144.0))


def test_mass_percent_over_hundred_refuses():
    _refused(
        "A solution contains 120 g of sugar in 100 g of solution. "
        "Calculate the mass percent of sugar.")


# ------------------------------------------------------------------ #
# 4. mole fraction = n_ask / (n1 + n2), ask must name a component
# ------------------------------------------------------------------ #

def test_mole_fraction_benzene_toluene():
    _verified(
        "A solution contains 2 moles of benzene and 3 moles of toluene. "
        "Find the mole fraction of benzene.",
        2.0 / 5.0)


def test_mole_fraction_named_second_component():
    _verified(
        "3 mol of water are mixed with 2 mol of ethanol. Calculate the "
        "mole fraction of ethanol.",
        2.0 / 5.0)


def test_mole_fraction_gases():
    _verified(
        "A mixture contains 1 mol of N2 and 4 mol of O2. Find the mole "
        "fraction of N2 in the mixture.",
        1.0 / 5.0)


def test_mole_fraction_ask_component_absent_refuses():
    # must NOT ship the first component's share for a third component
    _refused(
        "A solution contains 2 moles of benzene and 3 moles of toluene. "
        "Find the mole fraction of acetone.")


def test_mole_fraction_single_amount_refuses():
    _refused(
        "Find the mole fraction of the solute in a solution containing "
        "0.5 mol of glucose.")


# ------------------------------------------------------------------ #
# 5. ideal gas: V = nRT/P with R matched to the pressure unit
# ------------------------------------------------------------------ #

def test_ideal_gas_volume_atm():
    _verified(
        "Find the volume occupied by 2.5 mol of an ideal gas at 300 K "
        "and 1 atm pressure.",
        2.5 * R_ATM * 300.0 / 1.0)


def test_ideal_gas_volume_kpa():
    _verified(
        "Calculate the volume occupied by 1.5 mol of an ideal gas at "
        "350 K and 95 kPa.",
        1.5 * R_KPA * 350.0 / 95.0)


def test_ideal_gas_volume_bar_celsius():
    _verified(
        "What is the volume of 0.4 mol of nitrogen gas at 27 C and "
        "2 bar?",
        0.4 * R_BAR * (27.0 + 273.15) / 2.0)


def test_ideal_gas_missing_pressure_refuses():
    _refused(
        "Find the volume occupied by 2 mol of an ideal gas at 300 K.")


def test_ideal_gas_stp_is_not_ours():
    """STP questions belong to the mole-concept registry: the reader
    must step aside (None), not refuse them."""
    assert _read("Find the volume occupied by 1 mol of an ideal gas at "
                 "STP.") is None


def test_ideal_gas_temperature_out_of_range_refuses():
    _refused_reader(
        "Find the volume occupied by 2 mol of an ideal gas at 5000 K "
        "and 1 atm.")


def test_ideal_gas_pressure_unit_mmhg_refuses():
    """mm Hg is not an exact SI pressure: refuse, never convert."""
    _refused_reader(
        "Find the volume of 0.5 mol of an ideal gas at 300 K and "
        "760 mm Hg.")


# ------------------------------------------------------------------ #
# 6. osmotic pressure: pi = (mass/M) RT / V
# ------------------------------------------------------------------ #

def test_osmotic_pressure_glucose_ml():
    r = _verified(
        "Calculate the osmotic pressure of a solution prepared by "
        "dissolving 3 g of glucose (molar mass 180) in 500 mL of water "
        "at 298 K.",
        (3.0 / 180.0) * R_ATM * 298.0 / 0.5)
    assert "atm" in r.answer


def test_osmotic_pressure_litres():
    _verified(
        "Calculate the osmotic pressure of a solution prepared by "
        "dissolving 3.42 g of sugar (molar mass 342) in 2 litre of "
        "solution at 300 K.",
        (3.42 / 342.0) * R_ATM * 300.0 / 2.0)


def test_osmotic_pressure_missing_temperature_refuses():
    _refused(
        "Calculate the osmotic pressure of a solution prepared by "
        "dissolving 3 g of glucose (molar mass 180) in 500 mL of "
        "solution.")


def test_osmotic_pressure_missing_molar_mass_refuses():
    _refused(
        "Calculate the osmotic pressure of a solution prepared by "
        "dissolving 3 g of glucose in 500 mL of water at 298 K.")


def test_osmotic_pressure_out_of_range_refuses():
    # 0 C -> 273.15 K is fine; 3000 K is not a CBSE solution temperature
    _refused_reader(
        "Calculate the osmotic pressure of a solution prepared by "
        "dissolving 3 g of glucose (molar mass 180) in 500 mL of water "
        "at 3000 K.")


# ------------------------------------------------------------------ #
# 7. Raoult relative lowering: (p_pure - p_solution) / p_pure
# ------------------------------------------------------------------ #

def test_relative_lowering_two_pressures_water():
    _verified(
        "The vapour pressure of pure water at 298 K is 23.8 mm Hg and "
        "that of the solution is 22.0 mm Hg. Calculate the relative "
        "lowering of vapour pressure of water.",
        (23.8 - 22.0) / 23.8)


def test_relative_lowering_benzene_mole_fraction_ask():
    _verified(
        "The vapour pressure of pure benzene at 25 C is 640 mm Hg and "
        "that of a solution is 600 mm Hg. Find the mole fraction of the "
        "solute.",
        (640.0 - 600.0) / 640.0)


def test_relative_lowering_from_given_ratio():
    _verified(
        "The relative lowering of vapour pressure of an aqueous solution "
        "is 0.04. Calculate the mole fraction of the solute in the "
        "solution. The vapour pressure of pure water is 50 mm Hg.",
        0.04)


def test_relative_lowering_solution_above_pure_refuses():
    _refused(
        "The vapour pressure of pure benzene is 600 mm Hg and that of "
        "the solution is 640 mm Hg. Calculate the relative lowering of "
        "vapour pressure.")


def test_relative_lowering_single_pressure_no_ratio_refuses():
    _refused(
        "The vapour pressure of pure water is 23.8 mm Hg. Calculate the "
        "relative lowering of vapour pressure.")


def test_relative_lowering_mixed_units_refuses():
    _refused(
        "The vapour pressure of pure water is 23.8 mm Hg and that of "
        "the solution is 22.0 kPa. Calculate the relative lowering of "
        "vapour pressure.")


# ------------------------------------------------------------------ #
# regressions: the reader must never steal non-chemistry questions
# ------------------------------------------------------------------ #

def test_dilution_chain_still_first():
    """The original dilution family keeps priority inside the reader."""
    r = _solve("A student has 0.01 L of 10-2 mol dm-3 sulphuric acid "
               "solution. Reduce its concentration to 2 x 10-4 mol dm-3 "
               "by adding water. What should be the volume of the water "
               "added?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(0.49, abs=0.001)


def test_moles_based_molarity_still_not_ours():
    """moles-given molarity belongs to the syllabus family; the reader
    needs mass + molar mass and must step aside."""
    assert _read("Find the molarity of 0.5 moles of solute dissolved in "
                 "250 ml of solution.") is None


def test_plain_narrative_not_ours():
    assert _read("Ramesh buys 120 mangoes at 5 rupees each. He sells "
                 "the rest at 8 rupees each. Find the profit.") is None
