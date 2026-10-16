"""test_chem_adversarial.py -- CHEM-ADVERSARIAL regression suite (c9-c12).

Every board-standard chemistry question that exposed a bug in the
CHEM-ADVERSARIAL full-class regression becomes a permanent test here.
Contract (mirrors test_gate_failures.py):

  1. A VERIFIED* answer must be CHEMICALLY CORRECT (examiner-verified
     numbers/formulas below).
  2. Where a deterministic family is board-standard, the question must
     SOLVE (a refusal on these is a family gap, not an honest out).
  3. Prose questions may honestly refuse (not asserted here).

Bug classes covered (CHEM_ADVERSARIAL.md):
  CHEM-1  input normalizer caret-mangled chemical formulas
          ("Balance H2 + O2 -> H2O" -> H^2O -> GUIDED)
  CHEM-2  common compound names gated every mole/mass family
          ("moles in 18 g of water" refused; PAL served 0.9991 with DB)
  CHEM-3  particles-from-MASS missing (only mol<->N bridged)
  CHEM-4  kernel solved the stated atomic-mass list "(K = 39, C = 12,
          O = 16)" as equations -> confident "12" for a formula-mass ask
  CHEM-5  chempy_engine mangled hydrate dots (CuSO4.5H2O -> 185.5)
  CHEM-6+ c9/c10 gap families: v/v percent, K<->C, constant
          proportions, conservation of mass, electronic configuration,
          subatomic counts, valency/period/group from Z, Dobereiner
          triads, formula-of-named, hydrate water percent
Runs without a database (bank lane degrades to a miss by design).
"""
import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

import pytest  # noqa: E402

from backend.its.solver.answer_pipeline import answer  # noqa: E402
from backend.its.solver.input_normalizer import normalize_input  # noqa: E402
from backend.its.solver.math_kernel import (  # noqa: E402
    _fix_flattened_exponents,
)
from backend.its.solver.chemistry_families import (  # noqa: E402
    molar_mass,
    parse_formula,
    model_chemistry_families,
)
from backend.its.solver.chempy_engine import (  # noqa: E402
    compute_molar_mass,
    get_formula_composition,
)

AVOGADRO = 6.022e23


def _verified_answer(q):
    r = answer(q)
    assert r.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                       "VERIFIED_OFFICIAL"), (
        f"expected a verified tier, got {r.label}: {r.refusal_reason!r}")
    return r


def _contains_number(ans, want, rel=0.02, tol=0.05):
    nums = []
    for tok in re.findall(
            r"-?\d[\d,]*(?:\.\d+)?(?:\s*[xX*]\s*10\^?|"
            r"[eE][-+]?)\d+|-?\d[\d,]*(?:\.\d+)?", str(ans or "")):
        t = tok.replace(",", "").strip()
        m = re.match(r"(-?\d[\d,]*(?:\.\d+)?)\s*(?:[xX*]\s*10\^?|e|E)([-+]?\d+)$", t)
        if m:
            nums.append(float(m.group(1).replace(",", ""))
                        * 10 ** int(m.group(2)))
        else:
            try:
                nums.append(float(t))
            except ValueError:
                pass
    if not nums:
        return False
    if any(abs(n - want) <= max(tol, rel * abs(want)) for n in nums):
        return True
    return False


# --------------------------------------------------------------------------- #
# CHEM-1: the normalizer must never caret-mangle chemical formulas
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("raw", [
    "Balance the chemical equation: H2 + O2 -> H2O",
    "Balance the chemical equation: Fe + H2O -> Fe3O4 + H2",
    "Balance: Na2SO4 + BaCl2 -> BaSO4 + NaCl",
    "Write the balanced equation: Zn + HCl = ZnCl2 + H2",
    "Calculate the molecular mass of Ca3(PO4)2.",
    "Calculate the molecular mass of (NH4)2SO4.",
    "Balance: Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4",
])
def test_normalizer_preserves_chemical_formulas(raw):
    assert normalize_input(raw) == raw or "^" not in normalize_input(raw), (
        f"formula caret-mangled: {raw!r} -> {normalize_input(raw)!r}")


@pytest.mark.parametrize("raw,expect", [
    ("Solve x2 - 5x + 6 = 0", "x^2 - 5x + 6 = 0"),
    ("The equation y3 - 8 = 0 has how many roots?",
     "y^3 - 8 = 0"),
    ("Solve: (x+2)2 = 25", "(x+2)^2 = 25"),
    ("If x12 = 4096 find x", "x^12 = 4096"),
])
def test_normalizer_maths_repair_untouched(raw, expect):
    assert expect in normalize_input(raw)


def test_flattened_exponent_repair_skips_formula_tokens():
    assert _fix_flattened_exponents("H2 + O2 -> H2O") == "H2 + O2 -> H2O"
    assert _fix_flattened_exponents("Fe3O4 + H2") == "Fe3O4 + H2"
    assert _fix_flattened_exponents("x2 = 4") == "x^2 = 4"


# --------------------------------------------------------------------------- #
# balancing (CHEM-1 end-to-end)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("q,expect", [
    ("Balance the chemical equation: H2 + O2 -> H2O",
     "2 H2 + O2 -> 2 H2O"),
    ("Balance the chemical equation: Fe + H2O -> Fe3O4 + H2",
     "3 Fe + 4 H2O -> Fe3O4 + 4 H2"),
    ("Balance: Na2SO4 + BaCl2 -> BaSO4 + NaCl",
     "Na2SO4 + BaCl2 -> BaSO4 + 2 NaCl"),
    ("Balance the chemical equation: Zn + HCl -> ZnCl2 + H2",
     "Zn + 2 HCl -> ZnCl2 + H2"),
    ("Balance the chemical equation: CH4 + O2 -> CO2 + H2O",
     "CH4 + 2 O2 -> CO2 + 2 H2O"),
    ("Balance: Mg + O2 -> MgO", "2 Mg + O2 -> 2 MgO"),
    ("Balance: Fe2O3 + Al -> Al2O3 + Fe",
     "Fe2O3 + 2 Al -> Al2O3 + 2 Fe"),
    ("Balance: Al + CuCl2 -> AlCl3 + Cu",
     "2 Al + 3 CuCl2 -> 2 AlCl3 + 3 Cu"),
    ("Balance the chemical equation: NaOH + H2SO4 -> Na2SO4 + H2O",
     "2 NaOH + H2SO4 -> Na2SO4 + 2 H2O"),
    ("Balance: Al + N2 -> AlN", "2 Al + N2 -> 2 AlN"),
])
def test_balancing_solves_and_is_correct(q, expect):
    r = _verified_answer(q)
    assert expect.replace(" ", "") in str(r.answer).replace(" ", ""), (
        f"{q!r}: expected {expect!r} in {r.answer!r}")


# --------------------------------------------------------------------------- #
# CHEM-2: named compounds reach the mole/mass families
# --------------------------------------------------------------------------- #

def test_moles_in_18g_water_is_1_mol():
    r = _verified_answer("Calculate the number of moles in 18 g of water.")
    assert _contains_number(r.answer, 1.0, tol=0.005), r.answer


def test_mass_of_half_mole_water_is_9g():
    r = _verified_answer("Calculate the mass of 0.5 mole of water.")
    assert _contains_number(r.answer, 9.0, tol=0.005), r.answer


def test_moles_in_52g_he_is_13():
    r = _verified_answer("Calculate the number of moles in 52 g of He.")
    assert _contains_number(r.answer, 13.0, tol=0.005), r.answer


# --------------------------------------------------------------------------- #
# CHEM-3: particles from mass
# --------------------------------------------------------------------------- #

def test_molecules_in_18g_water_is_avogadro():
    r = _verified_answer(
        "How many molecules of water are there in 18 g of water?")
    assert _contains_number(r.answer, AVOGADRO, rel=0.001), r.answer


def test_s8_molecules_in_16g_sulphur_ncert():
    r = _verified_answer(
        "Calculate the number of molecules of sulphur (S8) present in "
        "16 g of solid sulphur. (Atomic mass S = 32 u)")
    # 16/256 mol x N_A = 3.76 x 10^22
    assert _contains_number(r.answer, 3.76e22, rel=0.02), r.answer


def test_atoms_in_half_mol_co2():
    r = _verified_answer("Calculate the number of atoms in 0.5 mol of CO2.")
    assert _contains_number(r.answer, 0.5 * 3 * AVOGADRO, rel=0.01), r.answer


# --------------------------------------------------------------------------- #
# molecular / formula unit mass (CHEM-4: kernel must not solve the
# stated-mass list as equations; 'formula unit mass' must reach family)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("q,want", [
    ("Calculate the molecular mass of CO2. (Atomic masses: C = 12 u, "
     "O = 16 u)", 44),
    ("Calculate the molecular mass of H2O.", 18),
    ("Calculate the molecular mass of HNO3. (H = 1, N = 14, O = 16)", 63),
    ("Calculate the molecular mass of glucose C6H12O6. "
     "(C = 12, H = 1, O = 16)", 180),
    ("Calculate the formula unit mass of ZnO. (Zn = 65 u, O = 16 u)", 81),
    ("Calculate the formula unit mass of Na2O. (Na = 23 u, O = 16 u)", 62),
    ("Calculate the formula unit mass of K2CO3. (K = 39, C = 12, O = 16)",
     138),
])
def test_formula_masses_are_board_exact(q, want):
    r = _verified_answer(q)
    assert _contains_number(r.answer, want, tol=0.01), (
        f"{q!r}: want {want}, got {r.answer!r}")


# --------------------------------------------------------------------------- #
# CHEM-5: hydrate maths (chempy_engine dot handling)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("f,want", [
    ("CuSO4.5H2O", 249.5),
    ("Na2CO3.10H2O", 286.0),
    ("CaSO4.2H2O", 172.0),
    ("FeSO4.7H2O", 278.0),
])
def test_hydrate_molar_masses(f, want):
    assert molar_mass(f) == want
    assert compute_molar_mass(f) == want
    assert parse_formula(f) is not None


def test_hydrate_composition_counts():
    assert get_formula_composition("CuSO4.5H2O") == \
        {"Cu": 1, "S": 1, "O": 9, "H": 10}


def test_blue_vitriol_water_of_crystallisation_36_percent():
    r = _verified_answer(
        "Calculate the percentage of water of crystallisation in blue "
        "vitriol (CuSO4.5H2O).")
    assert _contains_number(r.answer, 36.07, tol=0.1), r.answer


# --------------------------------------------------------------------------- #
# c9 gap families
# --------------------------------------------------------------------------- #

def test_average_atomic_mass_oxygen_three_isotopes():
    r = _verified_answer(
        "A sample of oxygen contains O-16 (99.76%), O-17 (0.04%) and "
        "O-18 (0.20%). Calculate the average atomic mass of oxygen.")
    assert _contains_number(r.answer, 16.0044, tol=0.01), r.answer


def test_average_atomic_mass_chlorine_is_35_5():
    r = _verified_answer(
        "Chlorine exists as two isotopes: Cl-35 (75 percent) and Cl-37 "
        "(25 percent). Calculate the average atomic mass of chlorine.")
    assert _contains_number(r.answer, 35.5, tol=0.01), r.answer


def test_volume_by_volume_percent():
    r = _verified_answer(
        "20 mL of alcohol is dissolved in enough water to make 100 mL of "
        "solution. Calculate the volume by volume percentage of alcohol.")
    assert _contains_number(r.answer, 20.0, tol=0.01), r.answer


@pytest.mark.parametrize("q,want", [
    ("Convert 300 K to degrees Celsius.", 27),
    ("Convert 273 K to degrees Celsius.", 0),
])
def test_kelvin_to_celsius(q, want):
    r = _verified_answer(q)
    assert _contains_number(r.answer, want, tol=0.01), r.answer


def test_law_of_constant_proportions_scaling():
    r = _verified_answer(
        "In an experiment, 2.0 g of hydrogen combines completely with "
        "16.0 g of oxygen to form water. Using the Law of Constant "
        "Proportions, calculate the mass of oxygen required to combine "
        "completely with 5.0 g of hydrogen.")
    assert _contains_number(r.answer, 40.0, tol=0.01), r.answer


def test_conservation_of_mass_subtraction():
    r = _verified_answer(
        "In Lavoisier's experiment, 92.6 g of mercury(II) oxide was "
        "heated in a sealed retort and 85.4 g of mercury was collected. "
        "Calculate the mass of oxygen gas produced.")
    assert _contains_number(r.answer, 7.2, tol=0.01), r.answer


def test_ion_charge_from_electron_proton_counts():
    r = _verified_answer(
        "An ion has 18 electrons, 16 protons and 16 neutrons. What is "
        "the charge on the ion and which element is it?")
    assert "2-" in str(r.answer) and "sulphur" in str(r.answer).lower(), \
        r.answer


def test_isotope_proton_neutron_electron_counts():
    r = _verified_answer(
        "For the isotope Cl-35 (atomic number 17), state the number of "
        "protons, neutrons and electrons in the neutral atom.")
    a = str(r.answer)
    assert _contains_number(a, 17, tol=0.001), a   # protons = electrons
    assert _contains_number(a, 18, tol=0.001), a   # neutrons = 35 - 17


def test_neutrons_from_mass_and_atomic_number():
    r = _verified_answer(
        "The mass number of an atom is 23 and its atomic number is 11. "
        "How many neutrons does it have?")
    assert _contains_number(r.answer, 12, tol=0.001), r.answer


@pytest.mark.parametrize("z,config,valency", [(11, "2,8,1", 1),
                                              (12, "2,8,2", 2)])
def test_electronic_configuration_and_valency(z, config, valency):
    r = _verified_answer(
        f"Write the electronic configuration of an atom whose atomic "
        f"number is {z}. What is its valency?")
    assert config in str(r.answer), r.answer
    assert f"valency = {valency}" in str(r.answer).replace(" ", " "), r.answer


def test_period_and_group_from_atomic_number():
    r = _verified_answer(
        "An element has atomic number 17. Predict its period and group "
        "in the modern periodic table.")
    assert "period = 3" in str(r.answer), r.answer
    assert "group = 17" in str(r.answer), r.answer


def test_valency_from_atomic_number():
    r = _verified_answer(
        "State the valency of magnesium (atomic number 12) using its "
        "position in the Modern Periodic Table.")
    assert _contains_number(r.answer, 2, tol=0.001), r.answer


def test_dobereiner_triad():
    r = _verified_answer(
        "Lithium (7 u), sodium (23 u) and potassium (39 u) form a "
        "Dobereiner triad. Verify the law of triads.")
    assert _contains_number(r.answer, 23, tol=0.01), r.answer


# --------------------------------------------------------------------------- #
# c10: formula writing, acid-base, stoichiometry
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("q,formula", [
    ("Write the chemical formula of baking soda.", "NaHCO3"),
    ("Write the chemical formula of washing soda.", "Na2CO3"),
    ("Write the chemical formula of quicklime.", "CaO"),
    ("Write the chemical formula of calcium phosphate using the valency "
     "cross method (Ca valency 2, phosphate valency 3).", "Ca3(PO4)2"),
])
def test_formula_writing_asks(q, formula):
    r = _verified_answer(q)
    assert formula.replace(" ", "") in str(r.answer).replace(" ", ""), \
        f"{q!r}: want {formula!r}, got {r.answer!r}"


def test_ph_of_0_001_M_h2so4_is_2_7():
    r = _verified_answer(
        "Calculate the pH of a 0.001 M H2SO4 solution, assuming complete "
        "dissociation. (Given: log10 2 = 0.30)")
    assert _contains_number(r.answer, 2.7, tol=0.02), r.answer


def test_ph_of_0_01_M_hcl_is_2():
    r = _verified_answer("Find the pH of a 0.01 M HCl solution.")
    assert _contains_number(r.answer, 2, tol=0.01), r.answer


def test_precipitate_mass_from_stoichiometry():
    # GAP-A (documented): the reaction is NOT stated in the question, so
    # a deterministic engine must refuse rather than infer products.
    # The honest tier is the contract here.
    r = answer(
        "A student mixes 5.0 g of sodium carbonate with excess calcium "
        "chloride solution. Calculate the mass of calcium carbonate "
        "precipitate formed. (Molar masses: Na2CO3 = 106 g/mol, "
        "CaCO3 = 100 g/mol)")
    assert not r.label.startswith("VERIFIED") or _contains_number(
        r.answer, 4.717, tol=0.01), (
        f"either honest refusal or the correct 4.717 g, got "
        f"{r.label}: {r.answer!r}")


def test_mass_percent_hydrogen_in_water():
    r = _verified_answer(
        "Calculate the mass percentage of hydrogen in water (H2O).")
    assert _contains_number(r.answer, 11.11, tol=0.05), r.answer


def test_mass_percent_solution_salt():
    r = _verified_answer(
        "A student dissolves 15 g of common salt in 85 g of water. "
        "Calculate the mass by mass percentage of the solution.")
    assert _contains_number(r.answer, 15, tol=0.01), r.answer


# --------------------------------------------------------------------------- #
# c10: state-tagged balancing (CHEM-11), pH proticity (CHEM-9)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("q,expect", [
    ("Balance the chemical equation: Fe(s) + H2O(g) -> Fe3O4(s) + H2(g)",
     "3 Fe + 4 H2O -> Fe3O4 + 4 H2"),
    ("Balance the following equation for the thermal decomposition of "
     "lead nitrate: Pb(NO3)2(s) -> PbO(s) + NO2(g) + O2(g)",
     "2 Pb(NO3)2 -> 2 PbO + 4 NO2 + O2"),
    ("Balance: BaCl2(aq) + Na2SO4(aq) -> BaSO4(s) + NaCl(aq)",
     "BaCl2 + Na2SO4 -> BaSO4 + 2 NaCl"),
    ("Balance: Al + N2 -> AlN", "2 Al + N2 -> 2 AlN"),
])
def test_balancing_with_state_symbols(q, expect):
    r = _verified_answer(q)
    assert expect.replace(" ", "") in str(r.answer).replace(" ", ""), r.answer


def test_ph_diprotic_acid_complete_dissociation():
    # H2SO4 gives TWO H+ per formula unit: [H+] = 2 x 0.001 -> pH 2.7
    r = _verified_answer(
        "Calculate the pH of a 0.001 M H2SO4 solution, assuming complete "
        "dissociation. (Given: log10 2 = 0.30)")
    assert _contains_number(r.answer, 2.7, tol=0.02), r.answer


def test_ph_monoprotic_unchanged():
    r = _verified_answer("Find the pH of a 0.01 M HCl solution.")
    assert _contains_number(r.answer, 2, tol=0.01), r.answer


def test_water_of_crystallisation_percent():
    r = _verified_answer(
        "Calculate the percentage of water of crystallisation in blue "
        "vitriol (CuSO4.5H2O).")
    assert _contains_number(r.answer, 36.07, tol=0.1), r.answer


# --------------------------------------------------------------------------- #
# CHEM-10: the concept lane must answer ABOUT the asked term
# --------------------------------------------------------------------------- #

def test_concept_lane_does_not_answer_foreign_nodes():
    # 'catenation' used to ship the CS 'string concatenation' node;
    # 'Formula unit mass' shipped a geography contours node.  The
    # term-relevance guard must push both to the honest lanes.
    for q in ("Define catenation.",
              "What is Formula unit mass? State the definition given in "
              "this lesson."):
        r = answer(q)
        if r.label.startswith("VERIFIED"):
            blob = str(r.answer or "").lower()
            assert "contour" not in blob and "string concatenation" \
                not in blob, f"{q!r} answered by a foreign node: {blob[:80]}"


# --------------------------------------------------------------------------- #
# c12: solutions / colligative / electrochemistry / kinetics
# --------------------------------------------------------------------------- #

def test_molality_from_solute_mass():
    r = _verified_answer(
        "Calculate the molality of a solution containing 18 g of glucose "
        "(molar mass 180 g/mol) dissolved in 500 g of water.")
    assert _contains_number(r.answer, 0.2, tol=0.005), r.answer
    assert "mol" in str(r.answer), r.answer          # not bare moles


def test_molarity_from_solute_mass():
    r = _verified_answer(
        "Calculate the molarity of a solution containing 5.85 g of NaCl "
        "(molar mass 58.5 g/mol) in 500 mL of solution.")
    assert _contains_number(r.answer, 0.2, tol=0.005), r.answer
    assert "M" in str(r.answer) or "mol/L" in str(r.answer), r.answer


def test_mole_fraction_from_masses():
    r = _verified_answer(
        "18 g of glucose is dissolved in 90 g of water. Calculate the "
        "mole fraction of glucose.")
    assert _contains_number(r.answer, 0.0196, tol=0.0005), r.answer


def test_osmotic_pressure():
    r = _verified_answer(
        "Calculate the osmotic pressure of a 0.1 M solution at 300 K. "
        "(R = 0.0821 L atm / K mol)")
    assert _contains_number(r.answer, 2.463, tol=0.01), r.answer


def test_boiling_point_elevation():
    r = _verified_answer(
        "Calculate the elevation in boiling point of a solution with "
        "molality 0.1 mol/kg. (Kb for water = 0.52 K kg/mol)")
    assert _contains_number(r.answer, 0.052, tol=0.002), r.answer


def test_faraday_charge_for_deposition():
    r = _verified_answer(
        "How much charge in coulombs is required to deposit 1 mole of "
        "aluminium from molten Al2O3? (F = 96500 C/mol)")
    assert _contains_number(r.answer, 289500, tol=1), r.answer


def test_faraday_plating_time():
    r = _verified_answer(
        "A current of 1 A is passed through silver nitrate solution. "
        "How long will it take to deposit 1.08 g of silver? (Ag = 108, "
        "F = 96500 C/mol)")
    assert _contains_number(r.answer, 965, tol=1), r.answer


def test_arrhenius_doubling_activation_energy():
    r = _verified_answer(
        "The rate of a reaction doubles when temperature rises from "
        "300 K to 310 K. Calculate the activation energy. "
        "(R = 8.314 J/K/mol)")
    assert _contains_number(r.answer, 53.6, tol=0.2), r.answer


def test_first_order_half_life():
    r = _verified_answer(
        "A first-order reaction has a rate constant k = 0.0693 per "
        "minute. Calculate its half-life.")
    assert _contains_number(r.answer, 10, tol=0.05), r.answer
