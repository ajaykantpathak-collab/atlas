"""
Comprehensive 23-Test Regression Battery across Accountancy, Physics, Chemistry,
Mathematics, and English Grammar.
Ensures zero false-guided-practice demotions and verifies dual-path badges.
"""

import pytest
import math
from backend.its.solver.answer_pipeline import answer

BATTERY = [
    # ---- ACCOUNTANCY ----
    ("acc_super_profit",
     "Average profit of a firm is ₹80,000. Total assets are ₹5,00,000 and outside liabilities are ₹1,00,000. Normal rate of return is 10%. Calculate goodwill at 3 years' purchase of super profit.",
     120000.0, None),
    ("acc_sacrificing_ratio",
     "A and B are partners sharing profits in the ratio 3:2. C is admitted as a partner with 1/5th share. Find the new profit sharing ratio and sacrificing ratio.",
     None, ["0.6", "0.4"]),
    ("acc_capital_reserve_prorata",
     "A company forfeited 200 shares of ₹10 each, ₹8 called up, on which application and allotment money of ₹5 per share was paid. Out of these, 150 shares were reissued at ₹7 per share as ₹8 paid up. Calculate the amount to be transferred to Capital Reserve.",
     600.0, None),
    ("acc_current_ratio",
     "Current Assets of a company are ₹3,00,000 and Current Liabilities are ₹1,50,000. Calculate the Current Ratio.",
     None, ["2: 1"]),
    ("acc_operating_ratio",
     "Cost of Revenue from Operations (Cost of Goods Sold) is ₹6,00,000. Opening Inventory is ₹50,000 and Closing Inventory is ₹70,000. Calculate Inventory Turnover Ratio.",
     10.0, None),

    # ---- PHYSICS ----
    ("phy_work_done",
     "A force of 50 N acts on a body and displaces it through a distance of 10 m along a direction making an angle of 60 degrees with the force. Calculate the work done.",
     250.0, None),
    ("phy_kinetic_energy",
     "Calculate the kinetic energy of a body of mass 4 kg moving with a velocity of 5 m/s.",
     50.0, None),
    ("phy_escape_velocity",
     "Calculate the escape velocity from the surface of the Earth given radius R = 6.4e6 m and g = 9.8 m/s^2.",
     11200.0, None),
    ("phy_ohm_series",
     "Three resistors of resistances 2 ohm, 3 ohm and 5 ohm are connected in series. Find the equivalent resistance.",
     10.0, None),
    ("phy_ohm_parallel",
     "Two resistors of resistances 6 ohm and 3 ohm are connected in parallel. Find the equivalent resistance.",
     2.0, None),
    ("phy_snell_law",
     "A ray of light traveling in air enters water. The speed of light in air is 3e8 m/s and in water is 2.25e8 m/s. Calculate the refractive index of water.",
     1.3333333333, None),

    # ---- CHEMISTRY ----
    ("chem_molarity",
     "Calculate the molarity of a solution containing 4 g of NaOH dissolved in 250 mL of water. (Molar mass of NaOH = 40 g/mol)",
     0.4, None),
    ("chem_half_life_first_order",
     "A first order reaction has a rate constant of 0.00231 s^-1. Calculate the half-life of the reaction.",
     300.0, None),
    ("chem_ideal_gas_pv_nrt",
     "Calculate the volume occupied by 2 moles of an ideal gas at a pressure of 1 atm and temperature of 273 K. (R = 0.0821 L atm / mol K)",
     44.8266, None),
    ("chem_nernst_standard",
     "For the cell reaction Zn + Cu^2+ -> Zn^2+ + Cu, given E°(Zn^2+/Zn) = -0.76 V and E°(Cu^2+/Cu) = +0.34 V, calculate the standard cell potential E°cell.",
     1.1, None),

    # ---- MATHEMATICS ----
    ("math_ap_nth_term",
     "Find the 10th term of the AP: 2, 7, 12, ...",
     47.0, None),
    ("math_ap_sum",
     "Find the sum of the first 20 terms of the AP: 1, 4, 7, 10, ...",
     590.0, None),
    ("math_gp_infinite_sum",
     "Find the sum of the infinite geometric series: 1 + 1/2 + 1/4 + 1/8 + ...",
     2.0, None),
    ("math_quadratic_roots",
     "Find the roots of the quadratic equation: x^2 - 5x + 6 = 0.",
     None, ["2", "3"]),
    ("math_matrix_determinant",
     "Evaluate the determinant of the matrix [[3, 5], [2, 4]].",
     2.0, None),

    # ---- ENGLISH GRAMMAR ----
    ("eng_passive_voice",
     "Change into passive voice: The chef cooked a delicious meal.",
     None, ["delicious meal was cooked by the chef"]),
    ("eng_indirect_speech_interrogative",
     "Change into indirect speech: She asked me, \"Where do you live?\"",
     None, ["she asked me where i lived"]),
    ("eng_correlative_not_only",
     "Combine using not only...but also: He is intelligent. He is hardworking.",
     None, ["not only intelligent but also hardworking"]),
]


@pytest.mark.parametrize("case_id,question,expected_num,expected_text_cues", BATTERY)
def test_multi_domain_battery_item(case_id, question, expected_num, expected_text_cues):
    res = answer(question)
    assert res.label == "VERIFIED", f"[{case_id}] expected VERIFIED but got {res.label}: {res.refusal_reason}"
    if expected_num is not None:
        assert res.numeric is not None, f"[{case_id}] expected numeric {expected_num} but got None"
        tol = 1e-2 * max(1.0, abs(expected_num))
        assert abs(res.numeric - expected_num) <= tol, f"[{case_id}] numeric mismatch: got {res.numeric} vs {expected_num}"
    if expected_text_cues is not None:
        ans_text = (res.answer or "").lower()
        for cue in expected_text_cues:
            assert cue.lower() in ans_text, f"[{case_id}] expected '{cue}' in answer: '{res.answer}'"
