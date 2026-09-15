"""test_chemistry2_families.py -- classes 11-12 advanced chemistry batteries.

Every family in chemistry2_families.py gets a representative board-style
question with a verified expected answer, plus gate tests (implausible
inputs must be refused) and scientific-notation slot tests.

    pytest backend/its/tests/test_chemistry2_families.py -q
"""

from __future__ import annotations

import math

import pytest


def _model(text: str):
    from backend.its.solver.chemistry2_families import model_chemistry2
    return model_chemistry2(text)


def _check(text, want, structure=None, rel=0.005):
    r = _model(text)
    assert r.matched, f"refused ({r.note}): {text[:70]}"
    assert r.confidence >= 0.93, f"confidence {r.confidence} too low"
    assert r.numeric_answer == pytest.approx(want, rel=rel), \
        f"got {r.numeric_answer} want {want}: {text[:70]}"
    assert r.steps, "steps must be present"
    if structure is not None:
        assert r.structure == structure
    return r


# ------------------------------------------------------------------ #
# 1. limiting reagent
# ------------------------------------------------------------------ #

def test_limiting_reagent_basic():
    r = _check(
        "4 g of H2 reacts with 32 g of O2. Molar mass of H2 is 2 and of O2 "
        "is 32. Find the limiting reagent and the moles of product formed.",
        1.0, structure="limiting_reagent")
    assert any("O2" in s and "limiting" in s.lower() for s in r.steps)


def test_limiting_reagent_mg():
    _check("2.0 g of Mg reacts with 4.0 g of O2 and the molar mass of Mg "
           "is 24 and of O2 is 32. Find the limiting reagent.",
           2.0 / 24.0, structure="limiting_reagent")


# ------------------------------------------------------------------ #
# 2. equilibrium Kc
# ------------------------------------------------------------------ #

def test_equilibrium_kc_basic():
    _check("At equilibrium the concentrations are [A] = 0.2 M, [B] = 0.1 M "
           "and [C] = 0.3 M for the reaction 2A + B <=> 3C. Find Kc.",
           6.75, structure="equilibrium_kc")


def test_equilibrium_kc_scientific_notation():
    _check("At equilibrium the concentrations are [A] = 2 x 10-2 M, "
           "[B] = 1 x 10^-1 M and [C] = 4 x 10-2 M for the reaction "
           "A + B <=> C. Calculate Kc.",
           20.0, structure="equilibrium_kc")


# ------------------------------------------------------------------ #
# 3-4. pH
# ------------------------------------------------------------------ #

def test_ph_from_h_concentration():
    _check("Find the pH of a solution with [H+] = 1 x 10^-5.", 5.0,
           structure="ph_calc")


def test_ph_pow10_notation():
    _check("Find the pH of a solution with [H+] = 10^-3.", 3.0,
           structure="ph_calc")


def test_ph_strong_acid_hcl():
    _check("Find the pH of 0.01 M HCl.", 2.0, structure="ph_strong_acid")


def test_ph_strong_acid_diprotic_and_sci():
    _check("Find the pH of 1 x 10-4 M HNO3.", 4.0, structure="ph_strong_acid")
    _check("Find the pH of 0.005 M H2SO4.", 2.0, structure="ph_strong_acid")


# ------------------------------------------------------------------ #
# 5. buffer pH
# ------------------------------------------------------------------ #

def test_buffer_ph_henderson():
    _check("Find the pH of a buffer with [acid] = 0.05 M and "
           "[salt] = 0.15 M, pKa = 4.74.",
           4.74 + math.log10(3), structure="buffer_ph", rel=1e-4)


# ------------------------------------------------------------------ #
# 6-7. thermochemistry and Hess's law
# ------------------------------------------------------------------ #

def test_thermochemistry_heat_released():
    r = _check("Calculate the heat released when 2 mol of methane reacts "
               "with dH = -890 kJ/mol.", -1780.0,
               structure="thermochemistry")
    assert "1780" in r.final_answer


def test_hess_law_sum():
    _check("Using Hess's law, find dH for the target reaction: step 1 has "
           "dH = -110.5 kJ and step 2 has dH = -283.0 kJ.", -393.5,
           structure="hess_law")


# ------------------------------------------------------------------ #
# 8-9. electrochemistry
# ------------------------------------------------------------------ #

def test_emf_cell():
    _check("Find the EMF of the cell if E cathode = 0.34 V and "
           "E anode = -0.76 V.", 1.10, structure="emf_cell")


def test_nernst_with_q():
    _check("Use the Nernst equation to find the cell potential when "
           "E = 0.34 V, n = 2 and Q = 0.01.", 0.3991,
           structure="nernst_eq")


def test_nernst_with_concentrations():
    _check("Use the Nernst equation: E = 0.34 V, n = 2, [Zn2+] = 0.1 M and "
           "[Cu2+] = 0.01 M. Find the cell potential.", 0.31045,
           structure="nernst_eq")


# ------------------------------------------------------------------ #
# 10. first-order kinetics
# ------------------------------------------------------------------ #

def test_kinetics_first_order_half_life():
    _check("Calculate the rate constant for a first order reaction whose "
           "half-life is 10 minutes.", 0.0693,
           structure="kinetics_first_order")


# ------------------------------------------------------------------ #
# 11-13. solutions
# ------------------------------------------------------------------ #

def test_mole_fraction():
    _check("Find the mole fraction of N2 in a mixture of 2 moles of N2 and "
           "3 moles of O2.", 0.4, structure="mole_fraction")


def test_molality_kg_solvent():
    _check("Find the molality of 18 g of glucose (molar mass 180) dissolved "
           "in 0.5 kg of water.", 0.2, structure="molality")


def test_molality_grams_solvent():
    _check("Find the molality of 7.45 g of KCl (molar mass 74.5) in 250 g "
           "of water.", 0.4, structure="molality")


def test_concentration_ppm():
    _check("Find the concentration in ppm when 5 mg of solute is dissolved "
           "in 2 L of solution.", 2.5, structure="concentration_ppm")


# ------------------------------------------------------------------ #
# 14-15. composition
# ------------------------------------------------------------------ #

def test_percent_composition():
    _check("Calculate the percent composition of nitrogen in a compound "
           "containing 2 atoms of nitrogen, given atomic mass of N = 14 and "
           "molar mass of the compound = 60.", 100.0 * 28.0 / 60.0,
           structure="percent_composition")


def test_empirical_formula():
    r = _model("A compound has percentage composition: C = 40%, H = 6.7% and "
               "O = 53.3%. Find the empirical formula.")
    assert r.matched, r.note
    assert r.structure == "empirical_formula"
    assert "CH2O" in (r.final_answer or "")
    assert r.confidence >= 0.93
    assert r.numeric_answer is None


# ------------------------------------------------------------------ #
# plausibility gates and refusals
# ------------------------------------------------------------------ #

def test_ph_gate_refuses_out_of_range():
    """[H+] = 100 M gives pH = -2, outside the 0-14 gate -> refuse."""
    r = _model("Find the pH of a solution with [H+] = 100 M.")
    assert not r.matched


def test_no_match_refusal():
    r = _model("Find the speed of a car that travels 120 km in 2 hours.")
    assert not r.matched
    assert "no chemistry2 family matched" in r.note


def test_dispatcher_first_grounded_hit_wins():
    """A strong-acid question must not be swallowed by the [H+] family."""
    r = _model("Find the pH of 0.001 M HCl.")
    assert r.structure == "ph_strong_acid"
    assert r.numeric_answer == pytest.approx(3.0)
