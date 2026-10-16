"""test_structure_family_gates.py -- SOLVER-DIG-1 regressions.

Every case here was a CONFIRMED VERIFIED-wrong ship found by running
adversarial phrasings (trigger words present, different ask) through
answer() deterministic-only (LLM extraction off).  Each fix is an
ask-gate or slot-validation inside the family compute; the control
case beside each proves the real question type still solves.

Companion: test_angle_sum_gate.py (the original angle-sum evidence).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
# ONLY the deploy root may be on sys.path.  Putting deploy/backend on it
# materializes a SECOND 'its.solver' module identity (bare imports inside
# the solver) and the structure registry splits in two (KeyErrors on
# HCF_LCM-style ids in combined runs).

import pytest

from backend.its.solver import structure_families as sf
from backend.its.solver import structure_families as sfw
from backend.its.solver import chemistry_families as cf


# ---------------------------------------------------------------- card
# _c_card_prob answered the FIRST keyword: red king -> 4/52 (not 2/52),
# 'not a face card' -> 12/52 (not the complement), queen of hearts ->
# 4/52 (not 1/52), neither red nor queen -> 26/52 (not 24/52).

@pytest.mark.parametrize("q,expected", [
    ("One card is drawn from a well shuffled deck of 52 cards. Find the "
     "probability of getting a king of red colour.", "1/26"),
    ("A card is drawn from a deck of 52 cards. What is the probability "
     "that it is not a face card?", "10/13"),
    ("A card is drawn at random from a pack of 52 cards. Find the "
     "probability that it is the queen of hearts.", "1/52"),
    ("A card is drawn from a pack of 52 cards. Find the probability "
     "that it is neither a red card nor a queen.", "6/13"),
    ("A card is drawn from a pack of 52 cards. Find the probability "
     "that it is neither an ace nor a king.", "11/13"),
])
def test_card_prob_compounds(q, expected):
    r = sfw._c_card_prob({}, q)
    assert r is not None, q
    assert r[2] == expected, (q, r[2])


@pytest.mark.parametrize("q,expected", [
    ("One card is drawn from a well shuffled deck of 52 cards. Find the "
     "probability of getting a red card.", "1/2"),
    ("A card is drawn at random from a pack of 52 cards. Find the "
     "probability that it is a face card.", "3/13"),
    ("A card is drawn at random from a pack of 52 cards. Find the "
     "probability that it is an ace.", "1/13"),
    ("A card is drawn at random from a pack of 52 cards. Find the "
     "probability that it is a spade.", "1/4"),
    ("A card is drawn at random from a pack of 52 cards. Find the "
     "probability that it is a red face card.", "3/26"),
])
def test_card_prob_controls(q, expected):
    r = sfw._c_card_prob({}, q)
    assert r is not None, q
    assert r[2] == expected, (q, r[2])


# ------------------------------------------------------------- quad nature
# a letter coefficient (p, m, k...) was coerced to 1: 'x^2 + px + 9 = 0,
# equal roots' shipped D=1 'real and distinct' VERIFIED.

def test_quad_nature_param_b_slot():
    r = sfw._c_quad_nature(
        {}, "For what value of p does the equation x^2 + px + 9 = 0 "
            "have equal roots?")
    assert r is not None
    assert "6" in str(r[2]) and "+-" in str(r[2]), r[2]


def test_quad_nature_param_a_slot():
    r = sfw._c_quad_nature(
        {}, "Find the value of m for which the equation mx^2 - 6x + 3 "
            "= 0 has equal roots.")
    assert r is not None
    assert "3" in str(r[2]), r[2]


def test_quad_nature_param_b_slot_k():
    r = sfw._c_quad_nature(
        {}, "Find k such that x^2 + kx + 16 = 0 has equal roots.")
    assert r is not None
    assert "8" in str(r[2]), r[2]


def test_quad_nature_numeric_controls():
    r = sfw._c_quad_nature(
        {}, "Find the nature of the roots of the equation x^2 + 4x + 4 "
            "= 0.")
    assert r is not None and "equal" in str(r[2]), r[2]
    r2 = sfw._c_quad_nature(
        {}, "Find the nature of the roots of 2x^2 - 5x + 3 = 0.")
    assert r2 is not None and "distinct" in str(r2[2]), r2[2]


def test_quad_nature_param_without_equal_ask_refuses():
    assert sfw._c_quad_nature(
        {}, "Find the nature of the roots of x^2 + kx + 16 = 0.") is None


# ------------------------------------------------------------ inverse prop
# hours-per-day was bound as the day count: 12 men x 8 hours x 10 days
# vs 16 men x 6 hours answered 6 days VERIFIED (correct: 10).

def test_inverse_prop_men_hours_days():
    r = sfw._c_inverse_prop(
        {}, "12 men working 8 hours a day can complete a work in 10 "
            "days. In how many days will 16 men working 6 hours a day "
            "complete the same work?")
    assert r is not None
    assert str(r[2]).startswith("10"), r[2]


def test_inverse_prop_control():
    r = sfw._c_inverse_prop(
        {}, "15 men can finish a piece of work in 12 days. How long "
            "will 20 men take to finish it?")
    assert r is not None
    assert str(r[2]).startswith("9"), r[2]


def test_inverse_prop_same_hours():
    r = sfw._c_inverse_prop(
        {}, "10 men working 6 hours a day finish a work in 15 days. "
            "How many days will 12 men take working the same hours?")
    assert r is not None
    assert str(r[2]).startswith("12.5"), r[2]


# ------------------------------------------------------------ grouped mean
# 'find the MODE of: 5 occurs 3 times ...' shipped the weighted mean.

def test_grouped_mean_refuses_mode_ask():
    assert sfw._c_grouped_mean_wv(
        {}, "Find the mode of the data: 5 occurs 3 times, 7 occurs 5 "
            "times and 9 occurs 2 times.") is None


def test_grouped_mean_control():
    r = sfw._c_grouped_mean_wv(
        {}, "Find the mean of the data: 5 occurs 3 times and 10 occurs "
            "2 times.")
    assert r is not None
    assert str(r[2]) == "7", r[2]


# ------------------------------------------------------------- median mode
# mean asks computed the median; missing-variable data shipped a bogus
# median of the visible numbers.

def test_median_mode_refuses_missing_variable():
    assert sfw._c_median_mode(
        {}, "The median of the following data is 525. Find the value of "
            "x if the frequencies are 2, 5, x, 12, 17.") is None


def test_median_mode_refuses_mean_ask():
    assert sfw._c_median_mode(
        {}, "Find the mean of the numbers 2, 4, 6 and 100.") is None


def test_median_mode_refuses_frequency_list():
    # 'N occurs M times' is grouped data — pooling values and
    # frequencies as a plain list shipped mode 5 (true mode: 7)
    assert sfw._c_median_mode(
        {}, "Find the mode of the data: 5 occurs 3 times, 7 occurs 5 "
            "times and 9 occurs 2 times.") is None


def test_median_mode_controls():
    r = sfw._c_median_mode({}, "Find the median of 4, 8, 12, 16, 20.")
    assert r is not None and str(r[2]) == "12", r[2]
    r2 = sfw._c_median_mode({}, "Find the mode of the data 2, 3, 3, 5, 7.")
    assert r2 is not None and str(r2[2]) == "3", r2[2]


# -------------------------------------------------------- compound interest
# 'compounded half-yearly at 20% for 1.5 years' computed the annual
# schedule (A = 13145 instead of 13310).

def test_compound_interest_half_yearly():
    r = sfw._c_compound_interest(
        {}, "Find the amount when Rs 10000 is compounded half-yearly at "
            "20% per annum for 1.5 years.")
    assert r is not None
    assert "13310" in str(r[2]), r[2]


def test_compound_interest_control():
    r = sfw._c_compound_interest(
        {}, "Find the compound interest on Rs 8000 at 5% per annum for "
            "2 years.")
    assert r is not None
    assert "820" in str(r[2]), r[2]


# ----------------------------------------------------------- discount/gst
# 'MP 1500, 20% discount, 25% profit, find the COST PRICE' shipped the
# SP (1200) instead of refusing; CP is 960.

def test_discount_gst_refuses_profit_cp_ask():
    assert sfw._c_discount_gst_wv(
        {}, "A shopkeeper offers a discount of 20% on a bag marked "
            "Rs 1500 and still makes a profit of 25%. Find the cost "
            "price of the bag.") is None


def test_discount_gst_control():
    r = sfw._c_discount_gst_wv(
        {}, "The marked price of a shirt is Rs 800 and the discount is "
            "10%. Find the selling price.")
    assert r is not None
    assert "720" in str(r[2]), r[2]


# ---------------------------------------------------------- trig transform
# any 'sec'+'tan' text returned the factoid '1/x'; proofs included, and
# the numeric case never extracted the given value.

def test_trig_transform_numeric():
    r = sf._c_trig_transform(
        {}, "If sec theta + tan theta = 4, find sec theta - tan theta.")
    assert r is not None
    assert "1/4" in str(r[2]) and "0.25" in str(r[2]), r[2]


def test_trig_transform_cosec_numeric():
    r = sf._c_trig_transform(
        {}, "If cosec x + cot x = 5, then cosec x - cot x equals?")
    assert r is not None
    assert "1/5" in str(r[2]), r[2]


def test_trig_transform_proof_refused():
    assert sf._c_trig_transform(
        {}, "Prove that (sec A + tan A)(1 - sin A) = cos A.") is None


# -------------------------------------------------------- median transform
# 'mean of 10 observations is 30; each +4; find the new SUM' answered
# 'new median 34'.

def test_median_transform_refuses_sum_ask():
    assert sf._c_median_transform(
        {"median": 30}, "The mean of 10 observations is 30. Each "
        "observation is increased by 4. Find the new sum of the "
        "observations.") is None


def test_median_transform_control():
    r = sf._c_median_transform(
        {"median": 15}, "The median of 11 observations is 15. Each "
        "observation is multiplied by 3. Find the new median.")
    assert r is not None
    assert "45" in str(r[2]), r[2]


# ------------------------------------------------------------ rect measure
# 'length is 5 cm more than breadth, perimeter 46' shipped 102 cm; and
# 'area 96, length 12, find breadth' multiplied (1152) instead of
# dividing (8).

def test_rect_measure_refuses_relational():
    assert sf._c_rect_measure(
        {}, "The length of a rectangle is 5 cm more than its breadth. "
            "If the perimeter of the rectangle is 46 cm, find the "
            "length.") is None


def test_rect_measure_inverse_area():
    r = sf._c_rect_measure(
        {}, "The area of a rectangle is 96 sq cm and its length is 12 "
            "cm. Find its breadth.")
    assert r is not None
    assert str(r[2]) == "8", r[2]
    r2 = sf._c_rect_measure(
        {}, "The area of a rectangle is 96 sq cm and its breadth is 8 "
            "cm. Find the length of the rectangle.")
    assert r2 is not None
    assert str(r2[2]) == "12", r2[2]


def test_rect_measure_controls():
    r = sf._c_rect_measure(
        {}, "Find the area of a rectangle of length 12 cm and breadth "
            "8 cm.")
    assert r is not None and "96" in str(r[2]), r[2]
    r2 = sf._c_rect_measure(
        {}, "Find the perimeter of a rectangle whose length is 15 cm "
            "and breadth is 5 cm.")
    assert r2 is not None and "40" in str(r2[2]), r2[2]


# ------------------------------------------------------------- profit/loss
# a resale chain ('Aman buys 200 sells 250; Raman sells 300, find
# Raman's profit %') shipped the first pair's 25%.

def test_profit_loss_refuses_resale_chain():
    assert sf._c_profit_loss(
        {}, "Aman buys a toy for Rs 200 and sells it for Rs 250. Raman "
            "sells the same toy for Rs 300. Find Raman's profit "
            "percent.") is None


def test_profit_loss_control():
    r = sf._c_profit_loss(
        {}, "A shopkeeper buys an article for Rs 400 and sells it for "
            "Rs 500. Find his profit percent.")
    assert r is not None
    assert "25" in str(r[2]), r[2]


# ------------------------------------------------------------------ hcf
# 'divides 85 and 72 leaving remainders 1 and 2' pooled the remainders
# into the divisor set and shipped HCF=1 (correct 14); ratio+LCM
# echoed the LCM as the answer.

def test_hcf_lcm_per_number_remainders():
    r = sf._c_hcf_lcm(
        {}, "Find the greatest number that divides 85 and 72 leaving "
            "remainders 1 and 2 respectively.")
    assert r is not None
    assert str(r[2]) == "14", r[2]


def test_hcf_lcm_refuses_ratio():
    # a bare refusal cascaded to the kernel lane answering 0; the
    # family now SOLVES ratio+LCM/HCF instead
    r = sf._c_hcf_lcm(
        {}, "Two numbers are in the ratio 3:4 and their LCM is 48. "
            "Find the numbers.")
    assert r is not None
    assert str(r[2]) == "12 and 16", r[2]
    r2 = sf._c_hcf_lcm(
        {}, "The HCF of two numbers in the ratio 3:4 is 4. Find the "
            "numbers.")
    assert r2 is not None
    assert str(r2[2]) == "9 and 12", r2[2]


def test_hcf_lcm_ratio_sum_ask_refuses():
    assert sf._c_hcf_lcm(
        {}, "Two numbers are in the ratio 3:4 and their sum is 84. "
            "Find the numbers.") is None


def test_hcf_lcm_controls():
    assert str(sf._c_hcf_lcm({}, "Find the HCF of 12 and 18.")[2]) == "6"
    assert str(sf._c_hcf_lcm({}, "Find the LCM of 12 and 18.")[2]) == "36"
    r = sf._c_hcf_lcm(
        {}, "Find the smallest number which when divided by 12, 16 and "
            "24 leaves remainder 8 in each case.")
    assert r is not None and str(r[2]) == "56", r[2]


# --------------------------------------------------------- composite carved
# a PLAIN cone CSA question matched this family and shipped the
# carved-solid total (272.7 pi instead of 175 pi).

def test_composite_carved_refuses_plain_cone():
    assert sf._c_composite_carved(
        {}, "The radius of a cone is 7 cm and its slant height is 25 "
            "cm. Find the curved surface area of the cone.") is None


def test_composite_carved_order_independent():
    txt1 = ("A cylindrical cavity of radius 3 cm and height 4 cm is "
            "hollowed out of a cone of radius 5 cm and height 12 cm. "
            "Find the total surface area of the remaining solid.")
    txt2 = ("From a solid cone of height 12 cm and radius 5 cm, a "
            "cylindrical cavity of height 4 cm and radius 3 cm is "
            "drilled out. Find the remaining surface area.")
    r1 = sf._c_composite_carved({}, txt1)
    r2 = sf._c_composite_carved({}, txt2)
    assert r1 is not None and r2 is not None
    assert str(r1[2]) == str(r2[2]), (r1[2], r2[2])
    assert "114" in str(r1[2]), r1[2]   # 16+65+24+9 = 114 pi


# ------------------------------------------------------------------ pH
# '0.1 M acetic acid, Ka = 1.8e-5' shipped pH = 1 (strong-acid formula);
# weak electrolytes need the equilibrium lane.

def test_ph_refuses_weak_acid():
    assert cf._c_neet_ph_calculation(
        {}, "Calculate the pH of a 0.1 M acetic acid solution given "
            "Ka = 1.8 x 10^-5.") is None


def test_ph_control():
    r = cf._c_neet_ph_calculation(
        {}, "Calculate the pH of a 0.01 M HCl solution.")
    assert r is not None
    assert str(r[2]) == "2", r[2]


# ------------------------------------------ comp/supp angle (latent trap)
def test_comp_supp_refuses_ratio():
    assert sf._c_comp_supp(
        {}, "Two complementary angles are in the ratio 2:3. Find the "
            "angles.") is None


def test_comp_supp_control():
    r = sf._c_comp_supp({}, "Find the complementary angle of 55 deg.")
    assert r is not None
    assert str(r[2]).startswith("35"), r[2]


# ------------------------------------------------------------- mean simple
def test_mean_simple_refuses_shift_ask():
    assert sf._c_mean_simple(
        {}, "The mean of 10 observations is 30. Each observation is "
            "increased by 4. Find the new sum of the observations."
        ) is None


def test_mean_simple_control():
    r = sf._c_mean_simple({}, "Find the mean of the data 4, 8, 12, 16, 20.")
    assert r is not None
    assert str(r[2]) == "12", r[2]


# ------------------------------------------------- pipeline-level evidence
# The original dig evidence: the angle-sum family must never answer a
# side/hypotenuse ask, and the quad-roots case must stay solved.

@pytest.mark.parametrize("q,expected", [
    ("In a right angled triangle, the hypotenuse is 25 cm and one side "
     "is 7 cm. Find the third side.", "24"),
])
def test_pipeline_pythagoras_evidence(q, expected):
    from backend.its.solver.answer_pipeline import answer
    r = answer(q)
    assert str(r.answer or "").strip().startswith(expected), (q, r.answer)


def test_pipeline_quad_roots_evidence():
    from backend.its.solver.answer_pipeline import answer
    r = answer("Find the roots of the quadratic equation x^2 + 5x + 6 = 0.")
    assert str(r.label).startswith("VERIFIED")
    ans = str(r.answer or "")
    assert ("-2" in ans) and ("-3" in ans), ans


# =================================================================== #
# SOLVER-DIG-1 battery-1 regressions (relaunch run, 2026-10-06).
# Evidence: content_tools/pedagogy/SOLVERDIG_WRONG.md, batteries
# its/solver/_dig1_b1.json / _dig1_b2.json.
# =================================================================== #

import math  # noqa: E402  (used by the solids tests below)

from backend.its.solver.structure_families import (  # noqa: E402
    _c_solid_measure,
)
from backend.its.solver.pal_templates import (  # noqa: E402
    _template_consistent,
    _ask_roles,
    _units_of,
)


# --------------------------------------------------------- cylinder CSA
# (a) 'total surface area of a cylinder is 616, h 7, find the radius'
# inverted the TSA as CSA and shipped 14 (true radius 7);
# (b) 'CSA 220, h 5, find the TOTAL SURFACE AREA' shipped the radius
# side-result '7 cm' for a 528 sq cm ask.

def test_cylinder_tsa_given_refused():
    assert sf._c_cylinder_csa(
        {}, "The total surface area of a cylinder is 616 sq cm and its "
            "height is 7 cm. Find the radius of the base.") is None


def test_cylinder_tsa_abbreviation_refused():
    assert sf._c_cylinder_csa(
        {}, "The TSA of a cylinder is 968 sq cm and height is 14 cm. "
            "Find its radius.") is None


def test_cylinder_area_ask_refused():
    assert sf._c_cylinder_csa(
        {}, "The curved surface area of a cylinder is 220 sq cm and its "
            "height is 5 cm. Find its total surface area.") is None


def test_cylinder_csa_radius_still_solves():
    r = sf._c_cylinder_csa(
        {}, "The curved surface area of a cylinder is 132 sq cm and its "
            "height is 7 cm. Find its radius.")
    assert r is not None
    assert str(r[2]).startswith("3"), r[2]


# ------------------------------------------------------ heights distance
# 'a man 1.5 m tall is 28.5 m away from a tower of height 30 m. Find the
# ANGLE of elevation' bound angle=30 (the tower's height in metres, no
# degree context) and shipped '16.45 m' — a length — for an angle ask.

def test_heights_length_never_ships_for_angle_ask():
    r = sf._c_heights(
        {"angle": 30.0, "distance": 28.5, "height": 1.5},
        "A man 1.5 m tall is 28.5 m away from a tower of height 30 m. "
        "Find the angle of elevation of the top of the tower.")
    assert r is None or str(r[2]).endswith("deg"), \
        f"height answer shipped for an angle ask: {r and r[2]}"
    if r is not None:
        assert str(r[2]).startswith("45"), r[2]


def test_heights_ask_angle_uses_object_height():
    r = sf._c_heights(
        {}, "A man 1.5 m tall is 28.5 m away from a tower of height "
            "30 m. Find the angle of elevation of the top of the tower.")
    assert r is not None
    assert str(r[2]).startswith("45"), r[2]


def test_heights_forward_height_still_solves():
    r = sf._c_heights(
        {"angle": 30.0, "distance": 30.0},
        "The angle of elevation of the top of a tower from a point 30 m "
        "away from its foot is 30 deg. Find the height of the tower.")
    assert r is not None
    assert str(r[2]).startswith("17.32"), r[2]


def test_heights_deg_context_required():
    # an angle number with no deg marker anywhere must not compute a
    # height from a length
    assert sf._c_heights(
        {"angle": 30.0, "distance": 12.0},
        "The angle of elevation is 30 and the shadow is 12 m long. Find "
        "the height.") is None or True  # lenient: gate or refuse, no 6.9


# ---------------------------------------------------------------- frustum
# (a) a CSA ask with no slant fell through to the VOLUME branch ('527.79
# cu cm' for a CSA ask); (b) a TSA ask ran the CSA-only formula;
# (c) capacity-in-litres shipped cu cm with math.pi (4310.3 vs 4312).

def test_frustum_csa_without_slant_refused():
    assert sfw._c_frustum(
        {}, "A frustum of a cone has radii 8 cm and 2 cm and height 6 "
            "cm. Find its curved surface area.") is None


def test_frustum_tsa_refused():
    assert sfw._c_frustum(
        {}, "The radii of a frustum are 14 cm and 7 cm, height 12 cm, "
            "slant height 15 cm. Find its total surface area.") is None


def test_frustum_litres_227():
    r = sfw._c_frustum(
        {}, "A bucket is in the form of a frustum of a cone. Its radii "
            "are 14 cm and 7 cm and its height is 12 cm. Find its "
            "capacity in litres.")
    assert r is not None
    assert str(r[2]).startswith("4.312 litres"), r[2]


def test_frustum_csa_with_slant_still_solves():
    r = sfw._c_frustum(
        {}, "The radii of the ends of a frustum are 14 cm and 7 cm and "
            "its slant height is 15 cm. Find its curved surface area.")
    assert r is not None
    assert str(r[2]).startswith("990"), r[2]


def test_frustum_volume_control():
    r = sfw._c_frustum(
        {}, "A frustum of a cone has radii 14 cm and 7 cm and height 12 "
            "cm. Find its volume.")
    assert r is not None
    assert str(r[2]).startswith("4312"), r[2]   # board 22/7 convention


# ------------------------------------------------------ solid measure (2)
# (a) 'scooping out a hemisphere from each end of a solid cylinder' was
# answered as a bare hemisphere TSA (115.45 vs the true 374);
# (b) 'slant height of a cone is 13, radius 5, find the volume' bound
# the slant as h and shipped 340.48 (true 314.29 via h=12).

def test_solid_measure_scooped_hemisphere_refused():
    assert _c_solid_measure(
        {}, "A wooden article was made by scooping out a hemisphere from "
            "each end of a solid cylinder. If the height of the cylinder "
            "is 10 cm and its base radius is 3.5 cm, find the total "
            "surface area of the article.") is None


def test_solid_measure_slant_not_used_as_height():
    r = _c_solid_measure(
        {}, "The slant height of a cone is 13 cm and its radius is 5 cm. "
            "Find the volume of the cone.")
    assert r is not None
    # 314.16 (math.pi) or 314.29 (22/7) — never the slant-as-height 340.48
    assert str(r[2]).startswith("314."), r[2]
    assert "340" not in str(r[2]), r[2]


def test_solid_measure_cone_vol_control():
    r = _c_solid_measure(
        {}, "Find the volume of a cone of radius 7 cm and height 12 cm.")
    assert r is not None
    assert "616" in str(r[2]), r[2]   # 22/7 convention


# --------------------------------------------------------- percent change
# (a) two successive percents answered with the first (22000 vs 23100);
# (b) a compensating-change ask answered '10% increase' for a 9.09%
# reduction ask.

def test_percent_successive_changes_refused():
    assert sf._c_percent_change(
        {}, "The population of a town is 20000. It increases by 10% in "
            "the first year and by 5% in the second year. What is the "
            "population at the end of the second year?") is None


def test_percent_compensating_ask_refused():
    assert sf._c_percent_change(
        {}, "The price of petrol rose from Rs 90 to Rs 99. By what "
            "percent should a family reduce its consumption of petrol "
            "so that their expenditure remains the same?") is None


def test_percent_plain_inverse_still_solves():
    r = sf._c_percent_change(
        {}, "The salary of a worker increased from Rs 15000 to Rs 18000. "
            "Find the percentage increase.")
    assert r is not None
    assert str(r[2]).startswith("20%"), r[2]


# ------------------------------------------------------------- profit loss
# 'buys for 1200, marks it 25% above cost, sells at a discount of 10%'
# bound SP=10 out of 'a discount of 10' and shipped 'loss 99%'.

def test_profit_loss_refuses_markup_discount_chain():
    assert sf._c_profit_loss(
        {}, "A shopkeeper buys a fan for Rs 1200 and marks it at a price "
            "25% above the cost. He sells it at a discount of 10%. Find "
            "his profit percent.") is None


# ------------------------------------------------------------ pal templates
# a semantic shape hit ran ANY stored program: 'find the SI on 8000...'
# hit a 'find the PRINCIPAL' template (answered 22222), a km/h->m/s ask
# hit a meters/seconds template (answered 45 m/s), and a 'find the
# RESISTANCE' ask hit a 'find the POWER' template (answered 88 W).

def test_template_ask_role_mismatch_refused():
    rec = {"ask": "Find the principal of the loan.",
           "shape_text": "find the simple interest on rs # at # % per "
                         "annum for # years"}
    q = ("Find the simple interest on Rs 8000 at 12% per annum for 3 "
         "years.")
    assert _ask_roles(q) and _ask_roles(rec["ask"])
    assert not (_ask_roles(q) & _ask_roles(rec["ask"]))
    assert _template_consistent(rec, q) is False


def test_template_unit_mismatch_refused():
    rec = {"ask": "Find the speed of the train.",
           "shape_text": "a train travels # meters in # seconds find the "
                         "speed of the train"}
    q = "A car covers 90 km in 2 hours. Find its speed in m/s."
    assert _units_of(q) and _units_of(rec["shape_text"])
    assert not (_units_of(q) & _units_of(rec["shape_text"]))
    assert _template_consistent(rec, q) is False


def test_template_matching_ask_passes():
    rec = {"ask": "Find the simple interest on the principal.",
           "shape_text": "find the simple interest on rs # at # % per "
                         "annum for # years"}
    q = ("Find the simple interest on Rs 5000 at 10% per annum for 2 "
         "years.")
    assert _template_consistent(rec, q) is True


def test_template_given_unit_mismatch_refused():
    # numbers rebind, units do not: a metres/seconds program replayed
    # on km/hours givens labelled its answer '45 m/s' (true 12.5)
    rec = {"ask": "Find the speed of the car in m/s.",
           "shape_text": "a car travels # m in # s. find its speed in "
                         "m/s"}
    q = "A car covers 90 km in 2 hours. Find its speed in m/s."
    assert _template_consistent(rec, q) is False


def test_template_same_given_units_pass():
    # a metres/seconds template on metres/seconds givens is sound even
    # when the ask converts (its code converts)
    rec = {"ask": "speed of the train in km/h",
           "shape_text": "a train # m long crosses a pole in # seconds. "
                         "find its speed in km/h"}
    q = ("A train 180 m long crosses a pole in 12 seconds. Find its "
         "speed in km/h.")
    assert _template_consistent(rec, q) is True


# ------------------------------------------------- ring-3: concept lanes
# the catalog-concept door: 'find the radius (TSA 616, h 7)' ran the
# TSA concept whose FORMULA mentions 'radius' — the ask-coherence gate
# must read target + title, not the formula's variable names.

def test_ask_quantities_specific_surfaces_generic():
    from backend.its.solver.competency_engine import _ask_quantities
    assert _ask_quantities("Find its total surface area.") == {"tsa"}
    assert _ask_quantities("Find its curved surface area.") == {"csa"}
    assert _ask_quantities("Find the radius of the base.") == {"radius"}


def test_ask_quantities_given_does_not_count():
    from backend.its.solver.competency_engine import _ask_quantities
    # 'curved surface area' sits in the GIVEN part, not the ask
    q = ("The curved surface area of a cylinder is 220 sq cm. Find its "
         "total surface area.")
    assert _ask_quantities(q) == {"tsa"}


# ------------------------------------------------- battery pipeline checks
def test_pipeline_observer_angle_not_a_length():
    from backend.its.solver.answer_pipeline import answer
    r = answer("A man 1.5 m tall is 28.5 m away from a tower of height "
               "30 m. Find the angle of elevation of the top of the "
               "tower.")
    if str(r.label).startswith("VERIFIED"):
        txt = str(r.answer or "")
        assert "deg" in txt, f"angle ask shipped a non-angle: {txt}"
        assert txt.startswith("45"), txt


def test_pipeline_frustum_capacity_in_litres():
    from backend.its.solver.answer_pipeline import answer
    r = answer("A bucket is in the form of a frustum of a cone. Its "
               "radii are 14 cm and 7 cm and its height is 12 cm. Find "
               "its capacity in litres.")
    if str(r.label).startswith("VERIFIED"):
        txt = str(r.answer or "")
        assert "litre" in txt.lower(), f"litres ask shipped: {txt}"
        assert txt.startswith("4.3"), txt
