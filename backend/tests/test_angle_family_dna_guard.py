"""test_angle_family_dna_guard.py -- P0 regression, c12 corpus sweep
(c12_biotech_cbse_02_001#d2, 2026-10-06).

THE BUG: "The recognition sequence for EcoRI is 5'-GAATTC-3'. Write the
complementary strand in the 5'->3' direction and explain why this
sequence is called a palindrome..." shipped VERIFIED "80 degrees".

Root cause (two defects in the ANGLE_SUM geometry family,
its/solver/class7_families.py model_angle_sum):
  1. the bare word "complementary" triggered the family on the DNA
     sense -- no angle-context gate;
  2. the known-angle scrape (regex _DEG) harvested every bare number,
     so the 5s and 3s inside the strand notation 5'-GAATTC-3' became
     "known angles": 90 - (5 + -3 + 5 + 3) = 80 degrees.

Fix: angle-context gate (\\bangles?\\b / angle sign required) + prime
hygiene (a number directly followed by an apostrophe -- feet, arc-
minutes, DNA primes -- is never scraped).  The dormant lane-A twin
_c_comp_supp in structure_families.py gets the same context gate.

The last test pins the FULL pipeline: the question must now refuse
honestly (GUIDED), never ship a VERIFIED number.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

DNA_Q = ("The recognition sequence for EcoRI is 5'-GAATTC-3'. Write the "
         "complementary strand in the 5'\u21923' direction and explain why "
         "this sequence is called a palindrome in the context of DNA.")


def test_angle_sum_refuses_dna_strand():
    from backend.its.solver.maths_families import model_angle_sum
    r = model_angle_sum(DNA_Q)
    assert not r.matched, (
        "ANGLE_SUM fired on the DNA 'complementary strand' sense: "
        f"{r.final_answer!r} ({r.note})")


def test_angle_sum_still_solves_legit_questions():
    from backend.its.solver.maths_families import model_angle_sum
    r = model_angle_sum("Two angles are complementary. One angle measures "
                        "35 degrees. Find the other angle.")
    assert r.matched and abs(r.numeric_answer - 55.0) < 1e-9, (
        f"legit complementary ask broke: {r.note}")
    r = model_angle_sum("Two angles of a triangle measure 60 degrees and "
                        "70 degrees. Find the third angle.")
    assert r.matched and abs(r.numeric_answer - 50.0) < 1e-9, (
        f"triangle angle sum broke: {r.note}")


def test_prime_numbers_never_scraped_as_angles():
    from backend.its.solver.maths_families import model_angle_sum
    # the 5' / 3' primes must not join the known-angle scrape even when
    # an angle context is genuinely present
    r = model_angle_sum("Two angles are complementary. A strand notation "
                        "in the stem reads 5'-GAATTC-3'; one angle measures "
                        "40 degrees. Find the other angle.")
    assert r.matched and abs(r.numeric_answer - 50.0) < 1e-9, (
        f"prime notation leaked into the angle scrape: "
        f"{r.numeric_answer} ({r.note})")


def test_comp_supp_lane_a_twin_refuses_dna():
    from backend.its.solver.structure_families import _c_comp_supp
    assert _c_comp_supp({}, DNA_Q) is None, (
        "lane-A twin _c_comp_supp still answers the DNA strand question")
    out = _c_comp_supp({}, "Find the complementary angle of 35 degrees.")
    assert out is not None and abs(out[0] - 55.0) < 1e-9, (
        f"legit complement ask broke: {out}")


def test_full_pipeline_refuses_ecori_palindrome():
    """The P0 shipped through answer(); pin the honest refusal."""
    from backend.its.solver.answer_pipeline import answer
    r = answer(DNA_Q)
    assert not str(r.label or "").startswith("VERIFIED"), (
        f"pipeline still ships VERIFIED on the EcoRI palindrome ask: "
        f"{r.label} / {str(r.answer)[:80]!r}")
    assert "degrees" not in str(r.answer or "").lower(), (
        "pipeline answer still carries a degree value")


if __name__ == "__main__":
    fails = 0
    for name, fn in sorted(globals().items()):
        if name.startswith("test_") and callable(fn):
            try:
                fn()
                print(f"[PASS] {name}", flush=True)
            except AssertionError as e:
                fails += 1
                print(f"[FAIL] {name}: {e}", flush=True)
    print("ALL PASS" if not fails else f"{fails} FAIL")
    sys.exit(1 if fails else 0)
