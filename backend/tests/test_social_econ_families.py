"""test_social_econ_families.py -- SOCIAL_GOLDEN wave regression:
the wave-2/3 geography + economics families, pinned to their corpus keys.

Fast unit layer under the golden path (tests/test_social_golden.py walks
the full pipeline; this file pins each family's deterministic contract
directly, no model load, no DB):

  - RELATED_ELASTICITY  c9_eco_ch2_4 (XED 25%/40%/substitutes)
                        c9_eco_ch2_6 (YED 66.67%/-33.33%/-0.5/inferior)
  - TRAINING_NET_GAIN   c11_eco_cbse_04_006 (12 x 15,000 - 50,000 = 1,30,000)
  - DEMAND_MULTIVAR     c12_eco_cbse_02_009 (40 / 30 movement / 45 shift)
  - socsci numerics     timezone Greenwich->90E, map scale both ways,
                        R.F. conversion (corpus c11_geo anchors)
  - honest refusals     world-scope guard, out-of-table facts, why/essay
  - calibrated withhold POP_DENSITY guided-with-steps (flywheel floor)

Additive contract: every probe here was a live WRONG or a dead-end refusal
in the 2026-10-07 sweep before its fix; if this file fails, a verified-wrong
is one regression away."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

import pytest


# --------------------------------------------------------------------------- #
# economics families (direct dispatcher)
# --------------------------------------------------------------------------- #

def _econ(text):
    from backend.its.solver.economics_families import \
        model_economics_families
    return model_economics_families(text)


XED_Q = ("The price of butter increases from \u20b9200/kg to \u20b9250/kg. "
         "As a result, the demand for margarine at a local store rises "
         "from 50 kg/week to 70 kg/week. Calculate the percentage change "
         "in price of butter and percentage change in quantity demanded "
         "of margarine. What does the positive relationship indicate?")

YED_Q = ("In a survey, 100 families in Delhi were asked their monthly "
         "demand for bus tickets at \u20b910 each. When their monthly "
         "income rose from \u20b93000 to \u20b95000, their demand fell "
         "from 60 to 40 tickets. Calculate the percentage changes and "
         "the income elasticity of demand.")

OJT_Q = ("A manufacturing firm spends \u20b950,000 per worker on a 6-week "
         "technical training program. Post-training, each worker's "
         "monthly output increases by 20%, generating an additional "
         "\u20b915,000 per month in revenue for the firm. The firm "
         "imposes a 1-year bond. Calculate the net gain to the firm over "
         "the bond period and determine if the training is economically "
         "viable. (Assume no discounting for simplicity.)")

MULTIVAR_Q = ("Given the demand function Qd = 100 - 2P + 0.5Y - 3Ps, "
              "where P = own price, Y = consumer income, Ps = price of "
              "substitute. Initially P=20, Y=50, Ps=15. Calculate the "
              "initial quantity demanded. Then determine the new "
              "quantity demanded if (a) P rises to 25 (Y, Ps constant), "
              "(b) Y rises to 60 (P, Ps constant). Identify which is "
              "movement along and which is shift.")


def test_xed_butter_margarine():
    r = _econ(XED_Q)
    assert r.matched and r.structure == "RELATED_ELASTICITY"
    a = str(r.final_answer)
    assert "25.00%" in a and "40.00%" in a
    assert "1.60" in a and "substitute" in a.lower()


def test_yed_bus_tickets_inferior():
    r = _econ(YED_Q)
    assert r.matched and r.structure == "RELATED_ELASTICITY"
    a = str(r.final_answer)
    assert "66.67%" in a and "-33.33%" in a
    assert "-0.50" in a and "inferior" in a.lower()


def test_ojt_bond_net_gain_indian_format():
    r = _econ(OJT_Q)
    assert r.matched and r.structure == "TRAINING_NET_GAIN"
    a = str(r.final_answer)
    assert "1,30,000" in a and "viable" in a.lower()
    # data-coverage teach-back: the context numbers are addressed
    steps_text = " ".join(str(s) for s in (r.steps or []))
    assert "20%" in steps_text and "6-week" in steps_text


def test_multivar_demand_evaluation_and_classification():
    r = _econ(MULTIVAR_Q)
    assert r.matched and r.structure == "DEMAND_MULTIVAR"
    a = str(r.final_answer)
    for token in ("40", "30", "45", "movement", "shift"):
        assert token in a.lower() or token in a


def test_multivar_single_variable_stays_with_demand_q_at_p():
    # the multivar family must NOT steal the plain single-var shape
    r = _econ("The demand function is Qd = 100 - 2P. At price 10, find "
              "the quantity demanded.")
    assert not (r.matched and r.structure == "DEMAND_MULTIVAR")


# --------------------------------------------------------------------------- #
# socsci geography numerics (direct dispatcher)
# --------------------------------------------------------------------------- #

def _soc(text):
    from backend.its.solver.socsci_families import model_socsci
    return model_socsci(text)


def test_timezone_greenwich_reference():
    r = _soc("If it is 12 noon at Greenwich, what is the local time at "
             "90 degrees East?")
    assert r.matched and "6:00 PM" in str(r.final_answer)


def test_map_scale_forward():
    r = _soc("A map has a scale of 1 cm = 5 km. Two cities are 6 cm "
             "apart on the map. What is the actual distance between "
             "them?")
    assert r.matched and "30" in str(r.final_answer)


def test_map_scale_reverse():
    r = _soc("A map has a scale of 1 cm = 4 km. The actual distance "
             "between two villages is 20 km. What is the map distance "
             "in cm?")
    assert r.matched and "5" in str(r.final_answer)


def test_map_scale_to_phrasing():
    r = _soc("On a map whose scale is 1 cm to 5 km, two towns are 6 cm "
             "apart. Find the actual distance.")
    assert r.matched and "30" in str(r.final_answer)


def test_rf_conversion():
    r = _soc("The scale of a map is 1:50000. Two towns are 3.5 cm apart "
             "on the map. Find the actual distance in km.")
    assert r.matched and "1.75" in str(r.final_answer)


BHOPAL_Q = ("A weather station in Bhopal records the following daily "
            "maximum temperatures (°C) for June 1–5: 42, 44, "
            "41, 45, 43. The 30-year normal for June 1–5 is "
            "40°C. Calculate the mean deviation of these five days "
            "from the normal")

VITAL_MIG_Q = ("A district has a mid-year population of 2,50,000. "
               "During the year, 4,500 live births and 2,000 deaths "
               "were registered. Net in-migration was 1,200. Calculate "
               "the CBR, CDR, natural growth rate, and actual growth "
               "rate (all per 1000).")


def test_mean_deviation_from_normal():
    r = _soc(BHOPAL_Q)
    assert r.matched and r.structure == "MEAN_DEVIATION"
    assert "3" in str(r.final_answer)


def test_mean_deviation_outranks_generic_mean_in_pipeline():
    # the 0.97 specificity bump: STATS_MEAN_UNGROUPED (0.95, earlier in
    # the registry) answered the plain mean (43) to this ask
    r = _answer(BHOPAL_Q)
    assert str(r.label).startswith("VERIFIED")
    assert "3" in str(r.answer or "")


def test_mean_deviation_verifier_fails_a_wrong_claim():
    """SOCIAL-ALL: the registered second-path verifier must recompute the
    deviations from the question text and FAIL a wrong claim (the strict
    law withholds instead of shipping)."""
    from backend.its.solver.independent_verifier import _Ctx, \
        _v_mean_deviation
    q = ("A weather station records daily maximum temperatures (C) for "
         "June 1-5: 42, 44, 41, 45, 43. The 30-year normal for June 1-5 "
         "is 40 C. Calculate the mean deviation of these five days from "
         "the normal")
    result = type("R", (), {"quantities": {"mean_deviation": 7.0,
                                           "normal": 40.0},
                            "numeric_answer": 7.0,
                            "final_answer": "Mean deviation = 7"})()
    verdict = _v_mean_deviation(_Ctx("MEAN_DEVIATION", q, result))
    assert str(verdict[0]).lower() == "fail", verdict
    result_ok = type("R", (), {"quantities": {"mean_deviation": 3.0,
                                              "normal": 40.0},
                               "numeric_answer": 3.0,
                               "final_answer": "Mean deviation = 3"})()
    verdict_ok = _v_mean_deviation(_Ctx("MEAN_DEVIATION", q, result_ok))
    assert str(verdict_ok[0]).lower() == "pass", verdict_ok


def test_plain_mean_ask_still_serves_mean():
    r = _answer("The marks of 5 students are 42, 44, 41, 45, 43. "
                "Calculate the mean marks.")
    assert str(r.label).startswith("VERIFIED")
    assert "43" in str(r.answer or "")


def test_vital_stats_with_migration_actual_growth():
    r = _soc(VITAL_MIG_Q)
    assert r.matched and r.structure == "VITAL_STATS_MIGRATION"
    a = str(r.final_answer)
    for token in ("18", "8", "10", "4.8", "14.8"):
        assert token in a


def test_plain_vital_stats_still_routes_to_vital_stats():
    r = _soc("A town has 4,500 births and 2,000 deaths and a population "
             "of 2,50,000. Calculate the CBR and CDR.")
    assert r.matched and r.structure == "VITAL_STATS"


# --------------------------------------------------------------------------- #
# the kernel must not own map-scale stems (the 2026-10-07 WRONG)
# --------------------------------------------------------------------------- #

def test_kernel_declines_map_scale():
    from backend.its.solver.math_kernel import solve_math
    r = solve_math("A map has a scale of 1 cm = 5 km. Two cities are 6 cm "
              "apart on the map. What is the actual distance between "
              "them?")
    assert r is None or getattr(r, "verified", True) is not True \
        or "30" in str(getattr(r, "answer", ""))


def test_kernel_declines_multivar_demand():
    from backend.its.solver.math_kernel import solve_math
    r = solve_math(MULTIVAR_Q)
    assert r is None or getattr(r, "verified", True) is not True \
        or "45" in str(getattr(r, "answer", ""))


def test_kernel_still_solves_linear():
    from backend.its.solver.unit_shape import solve_linear_exact
    lin = solve_linear_exact("Solve for x: 2x + 6 = 20")
    assert lin is not None and "7" in str(lin.get("answer"))


# --------------------------------------------------------------------------- #
# the percent family must not own elasticity stems (the 0.96 fast path)
# --------------------------------------------------------------------------- #

def test_percent_change_yields_to_elasticity():
    from backend.its.solver.structure_families import \
        _c_percent_change_owned
    assert _c_percent_change_owned({}, XED_Q) is None
    assert _c_percent_change_owned({}, YED_Q) is None
    # plain maths percent ask still belongs to PERCENT_CHANGE
    out = _c_percent_change_owned(
        {}, "A price increased from 200 to 250. Find the percentage "
            "increase.")
    assert out is not None


def test_lane_classifier_routes_ojt_to_a():
    from backend.its.solver.answer_pipeline import classify
    assert classify(OJT_Q) == "A"


# --------------------------------------------------------------------------- #
# FACT_RECALL contract (geo/econ corpus facts)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("q,need", [
    ("When does the southwest monsoon arrive in Kerala?", "1 June"),
    ("Which is the longest river in the world?", "Nile"),
    ("What is the source of the Ganga?", "Gangotri"),
    ("What is GDP?", "final"),
    ("What is the HDI?", "UNDP"),
    ("How many days of wage employment does MGNREGA guarantee?", "100"),
])
def test_fact_recall_verified(q, need):
    from backend.its.solver.socsci_families import fact_recall_match
    canon = fact_recall_match(q)
    assert canon is not None and need.lower() in canon.lower()


def test_fact_recall_world_scope_guard():
    # the world fact (Nile) must NOT answer the India-scoped question
    from backend.its.solver.socsci_families import fact_recall_match
    assert fact_recall_match("Which is the longest river in India?") \
        is None


# --------------------------------------------------------------------------- #
# the honest full-pipeline contract (labels, not wording)
# --------------------------------------------------------------------------- #

def _answer(q):
    from backend.its.solver.answer_pipeline import answer
    return answer(q)


def test_pipeline_honest_on_open_and_out_of_table():
    for q in ("Why does the monsoon fail in some years?",
              "Which is the longest river in India?",
              "What is the poverty line in calories?"):
        r = _answer(q)
        assert r.answer is None or not str(r.label).startswith("VERIFIED")


# --------------------------------------------------------------------------- #
# SOCIAL-ALL wave 3 (2026-10-07): the CISCE econ sweep's deterministic
# REFUSE_NUM rows, each family pinned to its corpus key
# --------------------------------------------------------------------------- #

def test_mu_schedule_tu_pairs_threshold():
    r = _econ("Given the TU schedule for good A: Q=1 TU=30, Q=2 TU=55, "
              "Q=3 TU=75, Q=4 TU=90. Compute MU for each unit and "
              "identify the unit where MU first becomes less than 10 "
              "utils.")
    assert r.matched and r.structure == "MU_SCHEDULE"
    a = str(r.final_answer)
    for token in ("25", "20", "15"):
        assert token in a
    assert "never falls below" in a  # min MU shown is 15


def test_mu_schedule_mangoes_diminishing():
    r = _econ("A consumer's total utility from eating mangoes is: "
              "1 mango = 40 utils, 2 mangoes = 70 utils, 3 mangoes = 90 "
              "utils. Calculate the marginal utility of the 2nd and 3rd "
              "mangoes and state whether diminishing marginal utility "
              "holds.")
    assert r.matched and r.structure == "MU_SCHEDULE"
    assert "MU2 = 30" in str(r.final_answer)
    assert "MU3 = 20" in str(r.final_answer)
    assert "HOLDS" in str(r.final_answer)


def test_mu_schedule_price_stop_rule():
    r = _econ("If the price of a samosa is Rs 15 and a student's "
              "marginal utilities (in rupee equivalent) for successive "
              "samosas are 25, 20, 15, 10, 5, how many samosas will the "
              "student buy to maximise utility?")
    assert r.matched and r.structure == "MU_SCHEDULE"
    # slop-safe wording: no "the student" voice, pronoun-free
    assert "buying 3 unit(s)" in str(r.final_answer)


def test_share_percent_gva_share():
    r = _econ("Given Agriculture GVA = Rs 28 lakh crore and Total GVA = "
              "Rs 180 lakh crore, calculate agriculture's share in GVA.")
    assert r.matched and r.structure == "SHARE_PERCENT"
    assert "15.56%" in str(r.final_answer)


def test_share_percent_sector_output():
    r = _econ("In a hypothetical mixed economy, the public sector "
              "contributes 30 % of GDP and the private sector 70 %. If "
              "total GDP is Rs 200 lakh crore, calculate the public "
              "sector's output.")
    assert r.matched and r.structure == "SHARE_PERCENT"
    assert "60" in str(r.final_answer)


def test_productivity_ratio_capital():
    r = _econ("A small engineering unit in Coimbatore has capital stock "
              "worth Rs 2 crore and produces output worth Rs 8 crore "
              "per year. Calculate the capital productivity.")
    assert r.matched and r.structure == "PRODUCTIVITY_RATIO"
    assert "4" in str(r.final_answer)


def test_depreciation_sl_looms():
    r = _econ("A small textile unit in Surat purchases 10 power looms "
              "for Rs 5 lakh each. The looms have an estimated useful "
              "life of 10 years and zero scrap value. Calculate the "
              "annual straight-line depreciation charge for the whole "
              "set of looms.")
    assert r.matched and r.structure == "DEPRECIATION_SL"
    assert "5,00,000" in str(r.final_answer)


def test_capital_formation_and_rate():
    r = _econ("In a CISCE board-style question, the data for a "
              "hypothetical economy are: GFCF = Rs 8,000 crore and "
              "change in stocks = -Rs 500 crore, GDP = Rs 40,000 crore. "
              "Calculate capital formation and the capital formation "
              "rate.")
    assert r.matched and r.structure == "CAPITAL_FORMATION"
    a = str(r.final_answer)
    assert "7,500" in a and "18.75%" in a


def test_multivar_evaluation_only_with_point_ped():
    r = _econ("A firm sells a normal good with demand function "
              "Qd = 800 - 4P + 0.02Y. If the current price is Rs 100 "
              "and disposable income is Rs 40,000, calculate the "
              "quantity demanded and the price elasticity of demand at "
              "this point.")
    assert r.matched and r.structure == "DEMAND_MULTIVAR"
    a = str(r.final_answer)
    assert "1,200" in a and "-0.33" in a and "inelastic" in a


# --------------------------------------------------------------------------- #
# SOCIAL-ALL wave 3: ISC geography numerics (socsci dispatcher)
# --------------------------------------------------------------------------- #

def test_net_slip_pythagoras():
    r = _soc("A cross-section shows a marker bed offset vertically by "
             "120 m and horizontally by 80 m across a fault. Calculate "
             "the net slip.")
    assert r.matched and r.structure == "NET_SLIP"
    assert "144.2" in str(r.final_answer)


def test_nautical_distance_meridian():
    r = _soc("ICSE 2023 Paper: Calculate the distance in nautical miles "
             "between two points on the same meridian separated by 10 "
             "degrees of latitude.")
    assert r.matched and r.structure == "NAUTICAL_DISTANCE"
    assert "600" in str(r.final_answer)


def test_pipeline_calibrated_withhold_still_teaches():
    r = _answer("A town has 50,000 people and covers 250 sq km. "
                "Calculate the density of population.")
    assert r.answer is None or not str(r.label).startswith("VERIFIED")
    assert len(r.steps or []) >= 3  # the method still teaches


def test_density_withhold_survives_a_warm_concept_lane():
    """SOCIAL-ALL: with the concept/PAL lane warm, a physics-'density'
    concept narrative must NOT hijack the calibrated-withhold ask and
    die at the prose-essay guard as a 0-step dead-end.  The socsci
    numeric stand-down keeps Lane A's teach-back on the stem."""
    _answer("What is density?")  # warm the concept lane first
    r = _answer("A town has 40,000 people and covers 200 sq km. "
                "Calculate the density of population.")
    assert r.answer is None or not str(r.label).startswith("VERIFIED")
    assert len(r.steps or []) >= 3  # the method still teaches


if __name__ == "__main__":
    sys.exit(pytest.main([__file__, "-q"]))
