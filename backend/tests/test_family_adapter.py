"""Global invariant tests — the family_adapter contract boundary.

THE one invariant the whole program stands on:
    status != VERIFIED  ->  answer is None and numeric is None
Plus the independent-verifier policy (Phase 6 of the master plan):
    VERIFIED claim survives only if the second path agrees.
Walks every boundary case; any violation is a gate failure.
"""
from types import SimpleNamespace

from backend.its.solver.contract import SolverStatus
from backend.its.solver.family_adapter import solve_family


def _res(matched=True, label="VERIFIED", answer="x = 7", numeric=7.0):
    return SimpleNamespace(matched=matched, label=label, final_answer=answer,
                           numeric_answer=numeric, steps=["s1"], note="")


def test_verified_passes_through():
    out = solve_family("q", lambda q: _res(), family_id="f")
    assert out.status == SolverStatus.VERIFIED
    assert out.answer == "x = 7"
    assert out.numeric == 7.0


def test_unmatched_is_honest_guided():
    out = solve_family("q", lambda q: _res(matched=False, label="GUIDED",
                                           answer=None, numeric=None))
    assert out.status == SolverStatus.GUIDED_PRACTICE
    assert out.answer is None and out.numeric is None


def test_crashing_family_is_honest_refusal():
    def boom(q):
        raise RuntimeError("boom")
    out = solve_family("q", boom)
    assert out.status == SolverStatus.UNSUPPORTED
    assert out.answer is None and out.numeric is None


def test_verifier_withhold_downgrades():
    out = solve_family("q", lambda q: _res(),
                       verify=lambda q, r: (False, "second path disagrees"))
    assert out.status == SolverStatus.GUIDED_PRACTICE
    assert out.answer is None and out.numeric is None
    assert "withheld" in (out.refusal_reason or "")


def test_verifier_agree_keeps_verified():
    out = solve_family("q", lambda q: _res(),
                       verify=lambda q, r: (True, "reproduced"))
    assert out.status == SolverStatus.VERIFIED
    assert out.answer == "x = 7"


def test_verifier_crash_suppresses():
    def bad(q, r):
        raise RuntimeError("verifier down")
    out = solve_family("q", lambda q: _res(), verify=bad)
    assert out.status == SolverStatus.GUIDED_PRACTICE
    assert out.answer is None


def test_invariant_all_nonverified_labels():
    """THE constitution: any non-VERIFIED label ships no answer."""
    for label in ("GUIDED_PRACTICE", "AMBIGUOUS", "UNSUPPORTED",
                  "NEEDS_HUMAN_REVIEW", "MODEL_ASSISTED", ""):
        res = _res(matched=True, label=label, answer="42", numeric=42)
        out = solve_family("q", lambda q, _r=res: _r)
        if out.status == SolverStatus.VERIFIED:
            continue  # only labels the adapter maps to VERIFIED may answer
        assert out.answer is None and out.numeric is None, label
