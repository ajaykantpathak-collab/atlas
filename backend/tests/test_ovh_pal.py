"""test_ovh_pal.py — WS-PAL (ovh-pal): PAL_PROGRAM independent-verifier
widening, the route-level registry entries that back the new lanes, and
the CL-23 givens-rebind contract.

Every kind is exercised three ways through check_route (the same engine
the strict badge gate calls):

    correct   -> PASS   (the independent rebuild agrees)
    tampered  -> FAIL   (the rebuild contradicts the claim)
    out-scope -> NA     (typed not-applicable, never a guess)

plus:
  * CL-23 — stored template givens rebind to the CURRENT literals by
    value; unproven givens are dropped, never displayed stale.
  * no-LLM — monkeypatching httpx.Client.post to raise cannot break the
    deterministic answer path.

Offline only: no DB, no network, no LLM.
"""
import os
import sys

import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

os.environ.setdefault("SOLVER_OFFLINE", "1")
os.environ.pop("GROQ_API_KEY", None)
os.environ.pop("GEMINI_API_KEY", None)

from backend.its.solver import independent_verifier as iv   # noqa: E402
from backend.its.solver.independent_verifier import (       # noqa: E402
    check_route, NA, PASS, FAIL)


# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #

class _Res:
    """Minimal ModelResult-shaped claim carrier for check_route."""

    def __init__(self, numeric=None, answer="", quantities=None,
                 structure="PAL_PROGRAM"):
        self.numeric_answer = numeric
        self.final_answer = answer
        self.quantities = quantities or {}
        self.steps = []
        self.note = ""
        self.structure = structure
        self.matched = True
        self.confidence = 0.95
        self.governing_equation = ""


def verdict(route, question, numeric=None, answer="", quantities=None):
    return check_route(route, question,
                       _Res(numeric=numeric, answer=answer,
                            quantities=quantities))


# --------------------------------------------------------------------------- #
# (route, question, good claim, bad claim) — every WS-PAL kind
# --------------------------------------------------------------------------- #

CASES = [
    # PAL row: order a stated list
    ("PAL_PROGRAM",
     "Arrange the following numbers in ascending order: 58,493, 32,198, "
     "45,302.",
     dict(answer="32198 < 45302 < 58493", numeric=32198.0),
     dict(answer="32198 < 58493 < 45302", numeric=32198.0)),
    # PAL row: place value / digit in a place
    ("PAL_PROGRAM",
     "What is the digit in the lakhs place in the number 85,00,486? "
     "Also, what is its place value?",
     dict(answer="digit = 5, place value = 5,00,000", numeric=500000.0),
     dict(answer="digit = 4, place value = 4,00,000", numeric=400000.0)),
    # PAL row: mean of a stated list
    ("PAL_PROGRAM",
     "Calculate the average elevation given three spot heights: "
     "4,800 m, 5,200 m, and 3,800 m.",
     dict(answer="average = 4,600 m", numeric=4600.0),
     dict(answer="average = 4,500 m", numeric=4500.0)),
    # PAL row: sphere volume (diameter asked in mm^3)
    ("PAL_PROGRAM",
     "A patient passes a roughly spherical kidney stone of diameter "
     "8 mm. Calculate its volume in mm3.",
     dict(answer="volume = 268 mm3", numeric=268.08),
     dict(answer="volume = 120 mm3", numeric=120.0)),
    # PAL row / route: speed = distance/time
    ("PAL_PROGRAM",
     "A person travels a distance of 90 km in 2 hours. Calculate the "
     "speed in km/h.",
     dict(answer="speed = 45 km/h", numeric=45.0),
     dict(answer="speed = 50 km/h", numeric=50.0)),
    ("SPEED_DIST_TIME",
     "A car covers 120 km in 3 hours. Find the speed.",
     dict(answer="40 km/h", numeric=40.0),
     dict(answer="44 km/h", numeric=44.0)),
    # PAL row / route: unit conversion
    ("PAL_PROGRAM",
     "Convert 5 km into metres.",
     dict(answer="5000 metres", numeric=5000.0),
     dict(answer="500 metres", numeric=500.0)),
    ("UNIT_CONVERSION",
     "Convert 2.5 kg into grams.",
     dict(answer="2500 g", numeric=2500.0),
     dict(answer="250 g", numeric=250.0)),
    # PAL row / route: simultaneous linear pair
    ("PAL_PROGRAM",
     "Solve the pair of linear equations 2x + 3y = 12 and x - y = 1 "
     "for x and y.",
     dict(answer="x = 3, y = 2", numeric=5.0),
     dict(answer="x = 4, y = 1", numeric=5.0)),
    ("LINEAR_EQ_2VAR",
     "Solve the pair of linear equations 2x + 3y = 12 and x - y = 1 "
     "for x and y.",
     dict(answer="x = 3, y = 2", numeric=5.0),
     dict(answer="x = 4, y = 1", numeric=5.0)),
    # PAL row: one-variable linear solve (kernel residual)
    ("PAL_PROGRAM",
     "Solve for x: 3x + 7 = 28.",
     dict(answer="x = 7", numeric=7.0),
     dict(answer="x = 6", numeric=6.0)),
    ("MATH_KERNEL",
     "Find the value of x: 5x - 3 = 22.",
     dict(answer="x = 5", numeric=5.0),
     dict(answer="x = 6", numeric=6.0)),
    ("MATH_KERNEL",
     "Find the roots of x^2 - 5x + 6 = 0.",
     dict(answer="x = 2 or x = 3", numeric=2.0),
     dict(answer="x = 1 or x = 5", numeric=1.0)),
    # PAL row: latent heat Q = m L (J/g unit parse)
    ("PAL_PROGRAM",
     "How much heat is required to melt 50 g of ice at 0 deg C? "
     "Latent heat of fusion L_f = 336 J g-1.",
     dict(answer="heat = 16800 J", numeric=16800.0),
     dict(answer="heat = 17000 J", numeric=17000.0)),
    ("LATENT_HEAT",
     "How much heat is required to melt 50 g of ice at 0 deg C? "
     "Latent heat of fusion L_f = 336 J g-1.",
     dict(answer="heat = 16800 J", numeric=16800.0,
          quantities={"m": 0.05, "L": 336000.0}),
     dict(answer="heat = 9000 J", numeric=9000.0,
          quantities={"m": 0.05, "L": 336000.0})),
    # PAL row: capillary rise h = 2g cos0 / (r rho g)
    ("PAL_PROGRAM",
     "Calculate the capillary rise of water in a clean glass tube of "
     "radius 0.50 mm. Use gamma = 0.0728 N/m, rho = 1000 kg/m3, "
     "g = 9.8 m/s2, cos(theta) = 1.",
     dict(answer="h = 0.0297 m", numeric=0.0297),
     dict(answer="h = 0.060 m", numeric=0.060)),
    # PAL row / route: marginal-cost schedule re-diff
    ("PAL_PROGRAM",
     "A firm's total cost schedule is: Q=0 TC=100; Q=1 TC=130; "
     "Q=2 TC=155; Q=3 TC=185. Calculate MC for each unit of output.",
     dict(answer="MC = [30, 25, 30]", numeric=30.0),
     dict(answer="MC = [30, 25, 35]", numeric=35.0)),
    ("MC_SCHEDULE",
     "A firm's total cost schedule is: Q=0 TC=100; Q=1 TC=130; "
     "Q=2 TC=155; Q=3 TC=185. Calculate MC for each unit of output.",
     dict(answer="MC = [30, 25, 30]", numeric=30.0),
     dict(answer="MC = [30, 25, 35]", numeric=35.0)),
    # PAL row / route: percent application (discount)
    ("PAL_PROGRAM",
     "A store sells a jacket for Rs 250 with a 10% discount for "
     "members. What is the new price?",
     dict(answer="new price = Rs 225", numeric=225.0),
     dict(answer="new price = Rs 235", numeric=235.0)),
    ("PERCENT_APPLY",
     "A store sells a jacket for Rs 250 with a 10% discount for "
     "members. What is the new price?",
     dict(answer="new price = Rs 225", numeric=225.0),
     dict(answer="new price = Rs 235", numeric=235.0)),
    # PAL row / route: equal-intercept line through a point
    ("PAL_PROGRAM",
     "Find the equation of a line passing through the point (1, 1) "
     "that has equal intercepts on the axes.",
     dict(answer="x/2 + y/2 = 1", numeric=2.0),
     dict(answer="x/3 + y/3 = 1", numeric=3.0)),
    ("LINE_EQUAL_INTERCEPTS",
     "A line passes through (4, -2) and has equal intercepts on the "
     "axes. Find its equation in intercept form.",
     dict(answer="x/2 + y/2 = 1", numeric=2.0),
     dict(answer="x/4 + y/4 = 1", numeric=4.0)),
    # PAL row / route: division algorithm
    ("PAL_PROGRAM",
     "Find the quotient and remainder when 845 is divided by 12.",
     dict(answer="quotient = 70, remainder = 5", numeric=5.0),
     dict(answer="quotient = 70, remainder = 6", numeric=6.0)),
    ("QUOTIENT_REMAINDER",
     "Find the quotient and remainder when 845 is divided by 12.",
     dict(answer="quotient = 70, remainder = 5", numeric=5.0),
     dict(answer="quotient = 71, remainder = 5", numeric=5.0)),
    # PAL row / route: ratio division
    ("PAL_PROGRAM",
     "Divide Rs 1200 in the ratio 3:5 between two people.",
     dict(answer="Rs 450 and Rs 750", numeric=750.0),
     dict(answer="Rs 450 and Rs 760", numeric=760.0)),
    ("RATIO_DIVISION",
     "Divide Rs 1200 in the ratio 3:5 between two people.",
     dict(answer="Rs 450 and Rs 750", numeric=750.0),
     dict(answer="Rs 450 and Rs 760", numeric=760.0)),
    # PAL row / route: repeated add/subtract of the same amount
    ("PAL_PROGRAM",
     "A person gains 7 kg each month for 5 months. What is his total "
     "weight gain?",
     dict(answer="total gain = 35 kg", numeric=35.0),
     dict(answer="total gain = 40 kg", numeric=40.0)),
    ("REPEATED_CHANGE",
     "A person gains 7 kg each month for 5 months. What is his total "
     "weight gain?",
     dict(answer="total gain = 35 kg", numeric=35.0),
     dict(answer="total gain = 40 kg", numeric=40.0)),
    # PAL row: stated-formula substitution (the 12-stem replay cluster)
    ("PAL_PROGRAM",
     "Using the formula A = l * w from this topic, calculate A when "
     "l = 19, w = 5. Give your answer up to 2 decimal places.",
     dict(answer="95", numeric=95.0),
     dict(answer="94", numeric=94.0)),
    ("PAL_PROGRAM",
     "Using the formula T = t / N from this topic, calculate T when "
     "N = 2, t = 7.",
     dict(answer="3.5", numeric=3.5),
     dict(answer="4.0", numeric=4.0)),
    # PAL row: from->to change
    ("PAL_PROGRAM",
     "The temperature changed from -5 deg C to +12 deg C overnight. "
     "Find the increase in temperature.",
     dict(answer="increase = 17 deg C", numeric=17.0),
     dict(answer="increase = 15 deg C", numeric=15.0)),
    # PAL row: unit rate x quantity
    ("PAL_PROGRAM",
     "The FRP is 315 rupees per quintal. A mill purchases 50000 "
     "quintals. Find the total cost.",
     dict(answer="Rs 15,750,000", numeric=15750000.0),
     dict(answer="Rs 15,000,000", numeric=15000000.0)),
    # PAL row / route: simple + compound interest narrative
    ("PAL_PROGRAM",
     "Find the simple interest on Rs 5000 at 8% per annum for 3 years.",
     dict(answer="SI = Rs 1200", numeric=1200.0),
     dict(answer="SI = Rs 1250", numeric=1250.0)),
    ("INTEREST_NARRATIVE",
     "Find the compound interest on Rs 10000 at 10% per annum for "
     "2 years, compounded annually.",
     dict(answer="CI = Rs 2100", numeric=2100.0),
     dict(answer="CI = Rs 2000", numeric=2000.0)),
    # PAL row / route: profit-loss (absolute + percent consistency)
    ("PAL_PROGRAM",
     "A trader buys a chair for Rs 400 and sells it for Rs 460. Find "
     "the profit percent.",
     dict(answer="profit = 15%", numeric=15.0),
     dict(answer="profit = 20%", numeric=20.0)),
    ("PROFIT_LOSS",
     "A trader buys a chair for Rs 400 and sells it for Rs 460. Find "
     "the profit.",
     dict(answer="profit = Rs 60 (15%)", numeric=60.0),
     dict(answer="profit = Rs 70", numeric=70.0)),
    ("TRADING",
     "A trader buys a chair for Rs 400 and sells it for Rs 460. Find "
     "the profit.",
     dict(answer="profit = Rs 60", numeric=60.0),
     dict(answer="profit = Rs 70", numeric=70.0)),
    # route: word arithmetic dispatch (multiply/divide/add/subtract)
    ("WORD_ARITHMETIC",
     "Multiply 48 by 6.",
     dict(answer="288", numeric=288.0),
     dict(answer="280", numeric=280.0)),
    # route: order family
    ("ORDER_NUMBERS",
     "Arrange the following integers in ascending order: 5, -3, 0, "
     "-8, 12.",
     dict(answer="-8 < -3 < 0 < 5 < 12", numeric=-8.0),
     dict(answer="-3 < -8 < 0 < 5 < 12", numeric=-3.0)),
    # route: place-value family
    ("PLACE_VALUE_DIGIT",
     "What is the digit in the lakhs place in the number 85,00,486?",
     dict(answer="digit = 5", numeric=5.0),
     dict(answer="digit = 4", numeric=4.0)),
    # route: circle measure (existing family, tightened row)
    ("CIRCLE_MEASURE",
     "Find the area of a circle of radius 7 cm (take pi = 22/7).",
     dict(answer="area = 154 cm2", numeric=154.0),
     dict(answer="area = 150 cm2", numeric=150.0)),
    # route: solid measure dig2 (sphere volume)
    ("SOLID_MEASURE_DIG2",
     "Calculate the volume of a sphere of radius 14 mm "
     "(use pi = 3.14).",
     dict(answer="volume = 11488 mm3", numeric=11488.0),
     dict(answer="volume = 1149 mm3", numeric=1149.0)),
    # route: sequential percent steps (hop chain re-sim)
    ("PERCENT_STEPS",
     "The price is 800 rupees. It increases by 20% and then decreases "
     "by 10%. What is the final price?",
     dict(answer="864", numeric=864.0),
     dict(answer="880", numeric=880.0)),
    ("HOP_CHAIN",
     "The price is 800 rupees. It increases by 20% and then decreases "
     "by 10%. What is the final price?",
     dict(answer="step 1: 960; step 2: 864", numeric=864.0),
     dict(answer="step 1: 960; step 2: 880", numeric=880.0)),
    # route: mixture blend (weighted solute reconstruction)
    ("MIXTURE_BLEND",
     "A chemist mixes 200 ml of a 10% salt solution with 300 ml of a "
     "20% salt solution. Find the concentration of the mixture.",
     dict(answer="16%", numeric=16.0),
     dict(answer="15%", numeric=15.0)),
    # route: projectile apex height
    ("PROJECTILE_HEIGHT",
     "A ball is thrown straight up at 15 m/s. How high does it go? "
     "Take g = 10 m/s2.",
     dict(answer="11.25 m", numeric=11.25),
     dict(answer="15 m", numeric=15.0)),
]

NA_CASES = [
    # none of the new shapes -- every row must abstain
    ("PAL_PROGRAM", "Explain the process of photosynthesis."),
    ("PAL_PROGRAM", "Why is the sky blue?"),
    ("MATH_KERNEL", "Describe the water cycle."),
    ("PERCENT_STEPS", "What is the capital of France?"),
    ("MIXTURE_BLEND", "Define osmosis."),
    ("SPEED_DIST_TIME", "Explain Newton's first law."),
]


@pytest.mark.parametrize("route,q,good,bad", CASES)
def test_pal_row_pass(route, q, good, bad):
    st, proof = verdict(route, q, **good)
    assert st == PASS, f"{route} PASS expected, got {st}: {proof}"


@pytest.mark.parametrize("route,q,good,bad", CASES)
def test_pal_row_fail(route, q, good, bad):
    st, proof = verdict(route, q, **bad)
    assert st == FAIL, f"{route} FAIL expected, got {st}: {proof}"


@pytest.mark.parametrize("route,q", NA_CASES)
def test_pal_na(route, q):
    st, proof = verdict(route, q, numeric=42.0, answer="42")
    assert st == NA, f"{route} NA expected, got {st}: {proof}"


# --------------------------------------------------------------------------- #
# CL-23: givens rebind to CURRENT literals; unproven givens dropped
# --------------------------------------------------------------------------- #

def test_rebind_givens_value_match():
    from backend.its.solver import pal_templates as pt
    givens = {"coeff_x": "5", "constant_add": "4", "target": "22"}
    out = pt._rebind_givens(givens, ["5", "4", "22"], ["7", "4", "39"])
    assert out == {"coeff_x": "7", "constant_add": "4", "target": "39"}


def test_rebind_givens_drops_unproven():
    from backend.its.solver import pal_templates as pt
    # '99' matches no old literal -> the given is dropped, not guessed
    givens = {"coeff_x": "5", "hint": "99"}
    out = pt._rebind_givens(givens, ["5"], ["7"])
    assert out == {"coeff_x": "7"}


def test_rebind_givens_ambiguous_same_value():
    from backend.its.solver import pal_templates as pt
    # '5' appears twice in old literals and the new literals disagree
    # -> ambiguous, the given is dropped
    givens = {"first": "5"}
    out = pt._rebind_givens(givens, ["5", "5"], ["7", "9"])
    assert out == {}


def test_filter_stale_lines():
    from backend.its.solver import pal_templates as pt
    plan = ["coeff_x = 5", "constant_add = 4", "solve for x"]
    out = pt._filter_stale_lines(plan, ["5", "4", "22"], ["7", "4", "39"])
    # 'coeff_x = 5' embeds a literal the current question lacks ->
    # dropped, never shown stale (the code path rebinds numerals in
    # code separately; TEXT lines are dropped, not rewritten)
    assert "coeff_x = 5" not in out
    assert "solve for x" in out
    # '4' is a literal the current question also carries -> kept
    assert "constant_add = 4" in out


def test_pal_understood_givens_current_literals():
    """End-to-end CL-23: a PAL answer's understood.givens shows THIS
    question's literals, not the template's stale defaults -- and when
    nothing can be proven, givens are omitted (not fabricated)."""
    from backend.its.solver.answer_pipeline import answer
    r = answer("Evaluate 3x + 4 when x = 5.")
    u = (r.socratic or {}).get("understood") or {}
    givens = u.get("givens") or {}
    # whatever the givens map shows, every numeric token must appear in
    # the question text -- nothing may be fabricated
    import re as _re
    qnums = set(_re.findall(r"\d+(?:\.\d+)?", "3x + 4 x = 5"))
    for name, val in givens.items():
        for tok in _re.findall(r"\d+(?:\.\d+)?", str(val)):
            assert tok in qnums, (
                f"givens[{name}] shows {tok} which the question "
                f"never states")


# --------------------------------------------------------------------------- #
# no-LLM: the deterministic path never dials out
# --------------------------------------------------------------------------- #

def test_no_llm_dial_on_pal_paths(monkeypatch):
    """Patch every network surface the extractor could reach; the
    deterministic solve must still answer."""
    import httpx

    def _boom(*a, **k):
        raise AssertionError("LLM/HTTP dial attempted in PAL path")

    monkeypatch.setattr(httpx.Client, "post", _boom)
    monkeypatch.setattr(httpx, "post", _boom, raising=False)
    monkeypatch.setenv("SOLVER_OFFLINE", "1")
    monkeypatch.delenv("GROQ_API_KEY", raising=False)
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)

    from backend.its.solver.answer_pipeline import (
        answer, VERIFIED, VERIFIED_ASSUMED)

    for q in (
        "Evaluate 3x + 4 when x = 5.",
        "Find the simple interest on Rs 5000 at 8% per annum for "
        "3 years.",
        "A person travels a distance of 90 km in 2 hours. Calculate "
        "the speed.",
    ):
        r = answer(q)
        assert r.label in (VERIFIED, VERIFIED_ASSUMED), (
            f"{q!r} -> {r.label} (route={r.audit.route})")
