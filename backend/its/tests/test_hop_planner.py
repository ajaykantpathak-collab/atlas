"""Multi-hop / cross-subject chain tests.

A hop chain is one question whose clauses feed each other; each clause
must be solved and verified independently, verified values carry
forward as Given sentences, and the chain promotes only when EVERY hop
verified.  Cross-subject means hop 1 and hop 2 may land in different
families -- the mechanism is subject-agnostic by construction.
"""
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

from backend.its.solver.hop_planner import (split_hop_clauses,
                                            try_multi_hop)
from backend.its.solver.answer_pipeline import answer

# --------------------------------------------------------------------- #
# splitting
# --------------------------------------------------------------------- #

TWO_HOP = ("A bus covers 300 m in 10 seconds. Using this speed, "
           "how far will it travel in 20 seconds?")


def test_two_hop_split():
    parts = split_hop_clauses(TWO_HOP)
    assert parts is not None and len(parts) == 2
    assert "300 m" in parts[0]
    assert "20 seconds" in parts[1]


def test_three_hop_split_with_then():
    q = ("A car travels 150 km in 3 hours; then it continues at the "
         "same speed for 2 more hours. Find the distance covered in "
         "those 2 hours. Then find the total distance.")
    parts = split_hop_clauses(q)
    assert parts is not None and len(parts) == 3


def test_single_sentence_never_split():
    assert split_hop_clauses(
        "Find the speed of a bus covering 300 m in 10 seconds.") is None


def test_enumeration_not_stolen_from_multi_part():
    q = ("Solve: (a) 15 + 27 (b) 40 - 13")
    assert split_hop_clauses(q) is None


def test_mcq_never_split():
    q = ("Which of the following is the speed? A bus covers 300 m "
         "in 10 s; then it stops.")
    assert split_hop_clauses(q) is None


def test_nonvalue_clause_refuses():
    q = ("A train whistles loudly. Then how far does it go in 2 hours "
         "at 60 km/h?")
    # first clause carries no number -> honest refusal
    assert split_hop_clauses(q) is None


# --------------------------------------------------------------------- #
# end-to-end chains through the real solver
# --------------------------------------------------------------------- #

def _promo_of(res):
    return getattr(res, "socratic", None) or {}


def test_two_hop_speed_distance_verified():
    """Speed-carry asks: hop 1 (speed) verifies; hop 2 (distance) has
    no unit-aware binder yet, so the pipeline must REFUSE honestly --
    never ship the carried value or a circular echo as the answer."""
    res = answer(TWO_HOP)
    assert res.label != "VERIFIED" or (
        res.numeric is not None and abs(res.numeric - 600.0) < 1e-6)
    promo = _promo_of(res)
    if promo.get("multi_hop"):
        hops = promo["multi_hop"]["hops"]
        assert hops[0]["verified"]
        assert abs(hops[0]["numeric"] - 30.0) < 1e-6
        assert not hops[1]["verified"]
        assert hops[1].get("refusal")


def test_three_hop_chain_total():
    """The 2-of-3-asks incomplete reading must never ship as VERIFIED
    (the chain lane's old behaviour); the answer is either fully
    verified at 40 s or honestly refused."""
    q = ("A bus covers 300 m in 10 s. Then find its speed. Using this "
         "speed, how far will it travel in 20 s? Then how much time "
         "will it take to cover 1200 m?")
    res = answer(q)
    if res.label == "VERIFIED":
        assert res.numeric is not None and abs(res.numeric - 40.0) < 1e-6
    else:
        assert res.label != "VERIFIED" and res.answer is None


def test_broken_chain_refuses_honestly():
    # hop 2 has no verifiable family output ("mumbles") -> chain must
    # not promote, and hop 2 must be recorded as the break
    q = ("A bus covers 300 m in 10 seconds. Using this speed, "
         "mumble the frobnostication over 20 seconds?")
    res = answer(q)
    promo = _promo_of(res)
    if promo.get("multi_hop"):
        mh = promo["multi_hop"]
        assert not mh["all_verified"]
        assert any(h.get("skipped") for h in mh["hops"]) or \
            not mh["hops"][-1]["verified"]
        assert res.label != "VERIFIED"


def test_unit_carry_forward_cross_schema():
    """Stated-speed + chained ask must not produce circular echoes
    (the old wrong behaviour verified 30 for a distance ask)."""
    q = ("A train covers 900 m in 60 seconds. Using this speed, how "
         "far does it go in 30 seconds?")
    res = answer(q)
    if res.label == "VERIFIED":
        assert res.numeric is not None and abs(res.numeric - 450.0) < 1e-6
    else:
        assert res.answer is None


def test_try_multi_hop_dict_shape():
    seen = {"calls": []}

    def fake_solve(sub):
        seen["calls"].append(sub)
        from backend.its.solver.answer_pipeline import (PipelineResult,
                                                        VERIFIED)
        r = PipelineResult(label=VERIFIED, answer="42", numeric=42.0,
                           steps=[], audit=None)
        return r

    out = try_multi_hop(TWO_HOP, fake_solve)
    assert out is not None and out["kind"] == "chain"
    assert out["all_verified"] and out["n_verified"] == 2
    # carry-forward visible in the second call's text
    assert "Given: from the previous steps" in seen["calls"][1]
    assert "42" in seen["calls"][1]
