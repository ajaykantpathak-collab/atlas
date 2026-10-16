"""Class-8 physics corpus regression (2026-10-06 dig, physics-adjacent).

Cases are REAL corpus questions (c8_physics .md DIAGNOSTIC / WORKED
sections, verbatim problem statements) plus NCERT-bank numericals.
Contract under test:

  1. never-wrong-verified: any VERIFIED numeric must match the corpus
     key within 2% (the app-killing class -- see _dig1_battery method).
  2. must-verify set: questions the _TABLE_C8 families exist for must
     come back VERIFIED (refusal = coverage gap = test failure).
  3. diopter regression: focal-length questions that do NOT ask for
     lens power must never answer in dioptres (LENS_POWER guard,
     structure_families.py -- 9 wrong-verified answers across classes
     8-10 before the fix).
"""
import os
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

os.environ.setdefault("SOLVER_LLM_MODE", "off")


def _solve(q):
    from backend.its.solver.answer_pipeline import answer
    return answer(q)


def _first_num(s):
    import re
    m = re.search(r"-?\d[\d,]*(?:\.\d+)?", str(s or "").replace(",", ""))
    return float(m.group(0)) if m else None


def _last_num(s):
    """Final result number: multi-part answers conclude with the asked
    value ('pressures: 1200 Pa and 6000 Pa' -> 6000)."""
    import re
    ms = re.findall(r"-?\d[\d,]*(?:\.\d+)?", str(s or "").replace(",", ""))
    return float(ms[-1]) if ms else None


# (id, question, expected_first_number, tolerance_abs)
MUST_VERIFY = [
    ("final speed from F,m,t",
     "A force of 5 N acts on a 2 kg block initially at rest on a smooth "
     "horizontal surface. If the force acts for 3 seconds, what is the "
     "final speed of the block? (Assume no friction.)", 7.5, 0.05,
     "last"),
    ("friction from ma",
     "A woman pushes a 25 kg wooden crate across a rough floor with a "
     "horizontal force of 60 N. The crate accelerates at 1.2 m/s^2. "
     "Calculate the magnitude of the friction force opposing the motion.",
     30.0, 0.2, "first"),
    ("static friction two surfaces",
     "A wooden block of mass 2 kg rests on a horizontal wooden table. The "
     "coefficient of static friction is 0.4. Calculate the minimum "
     "horizontal force needed to start the block moving. Then, if the same "
     "block is placed on a lubricated surface where mu = 0.08, calculate "
     "the new force needed.", 8.0, 0.2, "first"),
    ("pressure cm conversion",
     "A force of 250 N acts perpendicularly on a rectangular surface of "
     "dimensions 50 cm x 20 cm. Calculate the pressure exerted on the "
     "surface in pascals.", 2500.0, 5.0, "first"),
    ("pressure two faces",
     "A rectangular glass slab of dimensions 50 cm x 20 cm x 10 cm weighs "
     "120 N. It is placed on a table first on its largest face, then on "
     "its smallest face. Calculate the pressure in each case.", 6000.0, 30,
     "last"),
    ("pressure point load",
     "A woman of mass 60 kg stands on one heel of her high-heeled shoe. "
     "The heel is circular with a diameter of 1.0 cm. Calculate the "
     "pressure exerted on the floor. (Take g = 10 m/s^2)", 7.6e6, 2e5, "first"),
    ("pressure vehicle",
     "A tractor of mass 5000 kg has four tyres. Each tyre makes a "
     "rectangular contact patch with the ground of length 40 cm and width "
     "20 cm. Calculate the pressure exerted by the tractor on the ground.",
     156250.0, 3000, "first"),
    ("efficiency percent",
     "An incandescent bulb consumes 100 J of electrical energy and "
     "produces 5 J of light energy. Calculate its efficiency.", 5.0, 0.2, "first"),
    ("saved kwh",
     "A household replaces five 60 W incandescent bulbs with five 12 W "
     "CFLs. If all bulbs are used for 5 hours daily, how much electrical "
     "energy (in kWh) is saved per day?", 1.2, 0.05, "first"),
    ("lens image at infinity",
     "A student holds a convex lens of focal length 10 cm towards the Sun "
     "and projects a sharp image of the Sun on a piece of paper. How far "
     "from the lens should the paper be held?", 10.0, 0.2, "first"),
    ("mirror formula image distance",
     "A student places a 5 cm tall candle 20 cm from a concave mirror of "
     "focal length 15 cm.", 60.0, 1.0, "first"),
    ("magfield wire",
     "A long straight wire carries a current of 5.0 A. Calculate the "
     "magnitude of the magnetic field at a point 2.0 cm from the wire.",
     5e-5, 2e-6, "first"),
    ("magfield coil",
     "A coil of 50 turns and radius 10 cm carries a current of 0.5 A. "
     "Calculate the magnetic field at its centre.", 1.57e-4, 5e-6, "first"),
    ("outlier mean",
     "A student investigates how the angle of a ramp affects the speed of "
     "a toy car. Trials: 2.1 s, 2.3 s, 5.8 s, 2.0 s, 2.2 s. One trial is "
     "an outlier likely caused by a timing error. Find the average of the "
     "reliable trials.", 2.15, 0.1, "first"),
]


@pytest.mark.parametrize("qid,q,expected,tol,mode", MUST_VERIFY, ids=[
    c[0] for c in MUST_VERIFY])
def test_c8_must_verify(qid, q, expected, tol, mode):
    r = _solve(q)
    assert r.label.startswith("VERIFIED"), (qid, r.label, r.refusal_reason)
    got = (r.numeric if r.numeric is not None
           else (_last_num(r.answer) if mode == "last"
                 else _first_num(r.answer)))
    assert got is not None, (qid, r.answer)
    assert abs(got - expected) <= max(tol, abs(expected) * 0.02), (
        qid, r.answer, got, expected)


@pytest.mark.parametrize("qid,q,expected,tol,mode", MUST_VERIFY, ids=[
    c[0] for c in MUST_VERIFY])
def test_c8_never_wrong_verified(qid, q, expected, tol, mode):
    """Same battery, wrong-verified check in the other direction: the
    extracted number must be the asked quantity (guards the
    'intermediate as final answer' and 'wrong unit' bug classes)."""
    r = _solve(q)
    if not r.label.startswith("VERIFIED"):
        return  # honest refusal is acceptable here; must-verify covers it
    got = (r.numeric if r.numeric is not None
           else (_last_num(r.answer) if mode == "last"
                 else _first_num(r.answer)))
    assert got is not None, (qid, r.answer)
    assert abs(got - expected) <= max(tol, abs(expected) * 0.02), (
        qid, "WRONG-VERIFIED", r.answer, got, expected)


@pytest.mark.xfail(reason="catalog_executor.py:2077 concept chain "
                          "misbinds 3-force slots (15/12/4 N) and ships "
                          "1.25 VERIFIED; needs force-role binding",
                   strict=False)
def test_accel_with_resistance_three_forces():
    """KNOWN RESIDUAL (2026-10-06 dig): lane A's catalog concept chain
    answers this before the physics families and misbinds the pedal
    force (15 N) as the driving force.  Passes only when the catalog
    gate refuses OR the physics family wins with (12 - 4) / 18."""
    r = _solve(
        "A cyclist applies a forward push of 15 N on the pedals, which "
        "translates to a 12 N forward force on the bicycle (mass = 18 kg "
        "including rider). The bicycle starts from rest on a level road. "
        "If the resistive forces (friction + air) total 4 N backward, "
        "find the acceleration of the bicycle.")
    if not r.label.startswith("VERIFIED"):
        pytest.fail("honest refusal is now expected to be replaced by a "
                    "correct answer -- un-xfail this test")
    got = r.numeric if r.numeric is not None else _first_num(r.answer)
    assert got is not None and abs(got - 0.44) <= 0.02, (r.answer, got)


DIOPTER_REGRESSION = [
    "A student holds a convex lens of focal length 10 cm towards the Sun "
    "and projects a sharp image of the Sun on a piece of paper. How far "
    "from the lens should the paper be held? (Assume the Sun is "
    "effectively at infinity.)",
    "An object of height 4 cm is placed 30 cm from a convex lens of focal "
    "length 10 cm. Determine the image distance and height. State the "
    "nature of the image.",
    "A concave lens of focal length 15 cm is placed in a beam of parallel "
    "light. Where do the rays appear to diverge from after passing "
    "through the lens?",
]


@pytest.mark.parametrize("q", DIOPTER_REGRESSION)
def test_no_diopters_without_power_ask(q):
    """LENS_POWER guard: no dioptre answer unless power is the ask."""
    r = _solve(q)
    if r.label.startswith("VERIFIED") and r.answer:
        assert "D" not in str(r.answer).replace("m/s", ""), (
            "dioptre answer without a power ask:", r.answer)


def test_lens_power_ask_still_verifies():
    r = _solve("A lens has focal length 20 cm. Find its power in dioptres.")
    assert r.label.startswith("VERIFIED"), (r.label, r.refusal_reason)
    got = r.numeric if r.numeric is not None else _first_num(r.answer)
    assert got is not None and abs(got - 5.0) < 0.05, (r.answer, got)
