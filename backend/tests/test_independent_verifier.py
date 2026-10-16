"""Independent second-path verifier: contract + tamper-proof sweep.

For EVERY registered route this file proves two properties:

  1. POSITIVE  -- the real family answer, run through the verifier,
     PASSES the independent relation, gains the proof step, and earns
     the confidence bump.
  2. TAMPER    -- a corrupted answer (numeric claim / recorded
     quantities scaled by 1.5) is CAUGHT: the result is downgraded
     (matched=False), the final and numeric answers are suppressed,
     and the note says the answer is withheld.  Fail-closed.

Plus seam tests: unregistered routes pass through unchanged, "na"
incapacity never fakes a pass, and verify_independent's (ok, proof)
contract holds.
"""

import pytest

from backend.its.solver import independent_verifier as iv
from backend.its.solver.modeling_layer import ModelResult
from backend.its.solver.maths_families import model_maths, _dispatch_m2 as model_maths2_table
from backend.its.solver.physics_families import model_physics_families
from backend.its.solver.chemistry_families import model_chemistry_families
from backend.its.solver.biology_families import model_biology
from backend.its.solver.economics_families import model_economics_families
from backend.its.solver.commerce_families import model_commerce_families
from backend.its.solver.accountancy_families import \
    model_accountancy_families

# (route, dispatcher, question, tampered quantity keys)
CASES = [
    # ---- maths ---------------------------------------------------------- #
    ("QUADRATIC_ROOTS", model_maths,
     "Find the roots of 2x^2 - 5x + 3 = 0", ("r1",)),
    ("LINEAR_SOLVE", model_maths,
     "Solve: 3x + 7 = 22", ()),
    # AP_SUM/AP_NTH: the syllabus rows own these shapes globally at
    # 0.97 > 0.95 (pre-merge order unchanged) -- the route pins the M2
    # table + its verifier row, so they ride the M2 sub-dispatcher.
    ("AP_SUM", model_maths2_table,
     "Find the sum of the first 20 terms of the AP with first term 5 "
     "and common difference 3", ()),
    ("AP_NTH", model_maths2_table,
     "Find the 10th term of the AP with first term 5 and common "
     "difference 3", ()),
    ("GP_SUM", model_maths,
     "Find the sum of the first 6 terms of the GP with first term 4 "
     "and common ratio 2", ()),
    ("GP_SUM_INFINITE", model_maths2_table,
     "Find the sum of the infinite GP with first term 9 and common "
     "ratio 0.3", ()),
    ("CIRCLE_AREA", model_maths,
     "Find the area of a circle of radius 7", ()),
    ("CIRCLE_CIRCUMFERENCE", model_maths,
     "Find the circumference of a circle of radius 7", ()),
    ("CIRCLE_SECTOR_AREA", model_maths,
     "Find the area of a sector of a circle with radius 6 and central "
     "angle 90", ()),
    ("PYTHAGORAS", model_maths,
     "Find the hypotenuse of a right angled triangle with legs of 3 cm "
     "and 4 cm", ()),
    ("SIMPLE_INTEREST", model_maths,
     "Find the simple interest on Rs 8000 at 5% for 3 years", ()),
    ("COMPOUND_INTEREST", model_maths,
     "Find the compound interest on Rs 10000 at 10% for 2 years", ()),
    ("PROFIT_LOSS_PERCENT", model_maths,
     "A shopkeeper buys an article for Rs 400 and sells it for Rs 500. "
     "Find the profit percent", ()),
    ("HCF_TWO_NUMBERS", model_maths,
     "Find the HCF of 48 and 36", ()),
    ("LCM_TWO_NUMBERS", model_maths,
     "Find the LCM of 12 and 18", ()),
    ("TIME_WORK_TOGETHER", model_maths,
     "A can do a work in 12 days and B can do it in 24 days. How long "
     "will they take working together?", ()),
    ("RATIO_SHARE", model_maths,
     "Divide Rs 500 in the ratio 2:3 and find the first share",
     ("s1",)),
    # ---- physics --------------------------------------------------------- #
    ("KINEMATICS_V_U_AT", model_physics_families,
     "A car starts from rest and accelerates at 2 m/s^2 for 5 s. Find "
     "its final velocity", ("v",)),
    ("KINEMATICS_S_UT_AT2", model_physics_families,
     "A body moving with an initial velocity of 5 m/s accelerates at "
     "2 m/s^2. Find the distance travelled in 4 s", ("s",)),
    ("KINEMATICS_V2_U2_2AS", model_physics_families,
     "A train moving at 20 m/s accelerates at 1 m/s^2 over a distance "
     "of 300 m. Find its final velocity", ("v",)),
    ("KINETIC_ENERGY", model_physics_families,
     "Find the kinetic energy of a mass of 2 kg moving with velocity "
     "3 m/s", ("result",)),
    ("OHMS_LAW_ANY", model_physics_families,
     "The voltage is 12 V and the current is 3 A. Find the resistance",
     ("result",)),
    ("ELECTRICAL_ENERGY_KWH", model_physics_families,
     "A 100 W bulb is used for 10 hours a day for 30 days. If the rate "
     "is Rs 5 per unit, find the electricity bill", ()),
    ("HOOKE_LAW", model_physics_families,
     "A spring of spring constant 200 N/m is stretched by 0.1 m. Find "
     "the force", ("result",)),
    # ---- chemistry -------------------------------------------------------- #
    ("HALF_LIFE_FIRST_ORDER", model_chemistry_families,
     "The half-life is 10 minutes for a first order reaction. Find the "
     "rate constant", ()),
    ("REMAINING_AFTER_HALFLIVES", model_chemistry_families,
     "A substance with half-life 5 minutes: after 15 minutes how much "
     "of 8 g of the substance remains?", ()),
    ("AVG_ATOMIC_MASS", model_chemistry_families,
     "Chlorine has Cl-35 is 75% and Cl-37 is 25%. Find the average "
     "atomic mass", ()),
    # ---- biology ----------------------------------------------------------- #
    ("ENERGY_FLOW_10_PERCENT", model_biology,
     "In a food chain 10000 kJ of energy is available at the producer "
     "level. Using the 10% law, find the energy at the tertiary "
     "consumer level", ()),
    ("POP_DOUBLING", model_biology,
     "500 bacteria double every 20 minutes. Find the population after "
     "2 hours", ()),
    ("CELL_DIVISION_COUNT", model_biology,
     "A cell culture starting with 4 cells undergoes 5 mitotic "
     "divisions. Find the number of cells", ()),
    # ---- economics ---------------------------------------------------------- #
    ("FISHER_REAL_RATE", model_economics_families,
     "The nominal interest rate is 8% and inflation is 5%. Find the "
     "real interest rate", ()),
    ("MONEY_MULTIPLIER", model_economics_families,
     "Find the money multiplier when the reserve ratio is 25%", ()),
    ("DEPOSIT_CREATION_CHAIN", model_economics_families,
     "An initial deposit of Rs 1000 with a reserve ratio of 20% leads "
     "to credit creation. Find the total deposit creation", ()),
    ("INVESTMENT_MULTIPLIER", model_economics_families,
     "With MPC = 0.8, find the investment multiplier", ()),
    ("APC_APS_IDENTITIES", model_economics_families,
     "Income is Rs 500 and consumption is Rs 400. Find APC and APS",
     ()),
    # ---- commerce / accountancy ---------------------------------------------- #
    ("BEP_UNITS", model_commerce_families,
     "Fixed costs are Rs 20000, selling price is Rs 50 per unit and "
     "variable cost is Rs 30 per unit. Find the break even point in "
     "units", ()),
    ("BEP_SALES", model_commerce_families,
     "Fixed costs are Rs 20000, selling price is Rs 50 per unit, "
     "variable cost is Rs 30 per unit. Find the break even sales in "
     "rupees", ()),
    ("TRIAL_BALANCE_DIFF", model_accountancy_families,
     "In a trial balance the debit total is Rs 56000 and the credit "
     "total is Rs 54000. Find the suspense difference", ()),
]

TAMPER = 1.5  # corruption factor: 50% off -- no real tolerance hides it


def _solve(dispatcher, question):
    r = dispatcher(question)
    assert r is not None and r.matched, \
        f"family refused: {question!r} -> {getattr(r, 'note', '')!r}"
    return r


def _tamper(result, qty_keys):
    result.numeric_answer = result.numeric_answer * TAMPER
    for key in qty_keys:
        assert key in result.quantities, \
            f"{result.structure}: quantity '{key}' missing for tampering"
        result.quantities[key] = result.quantities[key] * TAMPER
    return result


@pytest.mark.parametrize("route,dispatcher,question,tamper_keys", CASES,
                         ids=[c[0] for c in CASES])
def test_registered_route_positive(route, dispatcher, question,
                                   tamper_keys):
    """The family's real answer passes its independent relation: proof
    step appended, confidence bumped, answers intact."""
    assert route in iv.VERIFIERS
    r = _solve(dispatcher, question)
    assert r.structure == route
    assert r.numeric_answer is not None
    before_conf = r.confidence
    before_answer = r.final_answer
    verified = iv.apply_to_model_result(r, question)
    assert verified.matched, verified.note
    assert verified.confidence > before_conf
    assert any("Independent check" in s for s in verified.steps)
    assert "second path" in verified.note
    assert verified.final_answer == before_answer
    assert verified.numeric_answer == pytest.approx(r.numeric_answer)


@pytest.mark.parametrize("route,dispatcher,question,tamper_keys", CASES,
                         ids=[c[0] for c in CASES])
def test_registered_route_tamper_caught(route, dispatcher, question,
                                        tamper_keys):
    """A tampered answer contradicts the independent relation and is
    WITHHELD: matched=False, no answers, fail-closed note."""
    r = _tamper(_solve(dispatcher, question), tamper_keys)
    verified = iv.apply_to_model_result(r, question)
    assert not verified.matched
    assert verified.final_answer is None
    assert verified.numeric_answer is None
    assert verified.confidence == 0.0
    assert "withheld" in verified.note
    assert "independent check failed" in verified.note


def test_registry_covers_at_least_25_routes():
    assert len(iv.VERIFIERS) >= 25
    assert set(iv.VERIFIERS) <= set(iv.registered_routes())
    assert set(iv.registered_routes()) == (
        set(iv.VERIFIERS) | set(iv.DECLARATIVE_INVARIANTS)
        | set(iv.CONCEPTUAL_INVARIANTS)
        | {"LINES_PARALLEL", "VECTOR_RELATION", "QUAD_NATURE", "CONSISTENCY"})


def test_verify_independent_seam_contract():
    """(ok, proof) contract: ok=True only on PASS; FAIL and NA both
    carry their status in the proof string."""
    r = model_maths("Solve: 3x + 7 = 22")
    ok, proof = iv.verify_independent("LINEAR_SOLVE",
                                      "Solve: 3x + 7 = 22", r)
    assert ok and "substitution" in proof
    r.numeric_answer = r.numeric_answer * TAMPER
    ok, proof = iv.verify_independent("LINEAR_SOLVE",
                                      "Solve: 3x + 7 = 22", r)
    assert not ok and "[fail]" in proof
    # NA on an unregistered route and on a missing claim
    ok, proof = iv.verify_independent(
        "NOT_A_REAL_ROUTE", "Solve: 3x + 7 = 22", r)
    assert not ok and "[na]" in proof
    empty = ModelResult(structure="LINEAR_SOLVE", matched=True,
                        confidence=0.9, quantities={},
                        governing_equation="", final_answer=None,
                        numeric_answer=None, steps=[])
    ok, proof = iv.verify_independent("LINEAR_SOLVE",
                                      "Solve: 3x + 7 = 22", empty)
    assert not ok and "[na]" in proof


def test_unregistered_route_passes_through_unchanged():
    """Honest rollout: an unregistered family answer is untouched (no
    bump, no note, same object back)."""
    r = model_maths("Find the area of a rectangle of length 8 cm and "
                     "breadth 5 cm")
    assert r.matched and r.structure not in iv.VERIFIERS
    out = iv.apply_to_model_result(r, "area of a rectangle")
    assert out is r
    assert out.confidence == r.confidence
    assert "second path" not in (out.note or "")
    assert "not applicable" not in (out.note or "")


def test_na_incapacity_never_downgrades_and_never_bumps():
    """A registered verifier that cannot run (question without the
    needed givens -> parse miss) is NA: pass-through, honest note, no
    bump, and certainly no withholding."""
    r = model_maths("Find the sum of the first 20 terms of the AP "
                     "with first term 5 and common difference 3")
    before_conf = r.confidence
    out = iv.apply_to_model_result(r, "question with no givens at all")
    assert out.matched
    assert out.confidence == before_conf  # no bump on incapacity
    assert "not applicable" in out.note


def test_verifier_exception_is_na_not_fail():
    """A crash inside OUR verifier is incapacity, not evidence: the
    route resolves to NA (pass-through), never to a downgrade."""

    def _boom(_ctx):
        raise RuntimeError("boom")

    iv.VERIFIERS["_BOOM_ROUTE"] = _boom
    try:
        r = ModelResult(structure="_BOOM_ROUTE", matched=True,
                        confidence=0.9, quantities={},
                        governing_equation="", final_answer="42",
                        numeric_answer=42.0, steps=[])
        status, proof = iv.check_route("_BOOM_ROUTE", "q", r)
        assert status == iv.NA
        out = iv.apply_to_model_result(r, "q")
        assert out.matched
    finally:
        iv.VERIFIERS.pop("_BOOM_ROUTE", None)


def test_verified_model_problem_end_to_end():
    """The solve-boundary wrapper: a registered family answer comes back
    matched with the proof step already in its steps.

    (2026-10-05 note: originally used the AP-sum question; the Oct-01
    release calibration (services/release_calibration.json) measured the
    lowercase `ap_sum` syllabus alias at resistance 0.50 < floor 0.70,
    so its verified answer is now deliberately withheld at the release
    gate -- that behaviour is pinned by tests/test_release_calibration.py.
    AP_NTH (resistance 0.86) stands in here to keep exercising the
    verifier PASS path.)"""
    from backend.its.solver.independent_verifier import \
        verified_model_problem
    r = verified_model_problem(
        "Find the 10th term of the AP with first term "
        "5 and common difference 3")
    assert r.matched and r.structure in ("AP_NTH", "ap_nth")
    assert any("Independent check" in s for s in r.steps)
    assert "second path" in r.note
    # syllabus-alias coverage: the lowercase twins verify through the
    # same relations (their quantities coerce to zeros, so the
    # question-text parsers carry the check)
    for q, route in (
        ("Find the kinetic energy of a 3 kg mass moving at 4 m/s",
         ("kinetic_energy",)),
        ("The voltage is 12 V and the current is 3 A. Find the "
         "resistance", ("ohm_resistance", "OHMS_LAW_ANY")),
    ):
        rr = verified_model_problem(q)
        assert rr.matched and rr.structure in route,             f"{q!r} -> {rr.structure}"
        assert any("Independent check" in s for s in rr.steps), q
    # REAL-BUG CATCH (regression guard, updated 2026-10-05): the syllabus
    # gp_infinite_sum trigger USED to grab r="0" out of "ratio 0.3"
    # (unanchored number alternation) and ship a/(1-0) = a; the
    # independent partial-sum check contradicted it and the answer was
    # WITHHELD.  The trigger regex was fixed on 2026-09-30 (anchored
    # decimal group), so the family now computes the TRUE sum and the
    # second path CONFIRMS it.  If the regex ever re-breaks, the
    # partial-sum check contradicts again and matched flips False.
    rr = verified_model_problem(
        "Find the sum of the infinite GP with first term 9 and common "
        "ratio 0.3")
    assert rr.matched
    assert rr.numeric_answer is not None
    assert abs(rr.numeric_answer - 9 / (1 - 0.3)) < 1e-3, rr.numeric_answer
    assert "second path" in rr.note
    assert "partial sum" in " ".join(rr.steps)


def test_withheld_answer_never_promotes_in_answer_pipeline():
    """End-to-end fail-closed behaviour: tampering is not directly
    reachable from the pipeline, but a family whose check FAILs must
    lose its promotion.  Simulated by pushing a tampered result through
    the same gates the pipeline uses (confidence + matched)."""
    r = _tamper(_solve(model_maths,
                       "Find the HCF of 48 and 36"), ())
    verified = iv.apply_to_model_result(r, "Find the HCF of 48 and 36")
    # the pipeline promotion gate requires matched AND an answer
    promotable = bool(verified.matched and verified.confidence >= 0.85
                      and (verified.numeric_answer is not None
                           or verified.final_answer))
    assert not promotable


def test_pipeline_sweep_appends_audit_route_on_pass():
    """The answer_pipeline sweep wrapper records the second-path pass in
    the audit trail for a registered route.

    (2026-10-05: AP-sum swapped for AP-nth — the lowercase `ap_sum` alias
    is release-gated by the Oct-01 calibration, see
    test_verified_model_problem_end_to_end.)"""
    from backend.its.solver.answer_pipeline import AuditTrail, \
        _independent_sweep
    audit = AuditTrail(lane="B")
    syll = _independent_sweep(
        "Find the 10th term of the AP with first term "
        "5 and common difference 3", audit)
    assert syll.matched
    assert "independent_verifier:pass" in audit.route
