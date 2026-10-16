"""Global invariant test — walks every non-VERIFIED label and proves
the family_adapter never ships an answer.  THE constitution test."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))
from backend.its.solver.family_adapter import solve_family
from backend.its.solver.contract import SolverStatus
from types import SimpleNamespace

def _res(label, answer="42", numeric=42):
    return SimpleNamespace(matched=True, label=label, final_answer=answer,
                           numeric_answer=numeric, steps=["s"], note="")

def test_invariant_non_verified_never_ships_answer():
    for label in ("GUIDED_PRACTICE", "AMBIGUOUS", "UNSUPPORTED",
                  "NEEDS_HUMAN_REVIEW", "MODEL_ASSISTED", "", "unknown"):
        out = solve_family("q", lambda q, _l=label: _res(_l))
        if out.status == SolverStatus.VERIFIED:
            continue
        assert out.answer is None and out.numeric is None, \
            f"INVARIANT VIOLATION: {label} shipped answer={out.answer}"

def test_require_independent_verifier_suppresses_unverified():
    os.environ["REQUIRE_INDEPENDENT_VERIFIER"] = "true"
    try:
        out = solve_family("q", lambda q: _res("VERIFIED"), verify=None)
        assert out.status == SolverStatus.GUIDED_PRACTICE
        assert out.answer is None
    finally:
        os.environ.pop("REQUIRE_INDEPENDENT_VERIFIER", None)

def test_verifier_agree_keeps_verified():
    out = solve_family("q", lambda q: _res("VERIFIED"),
                       verify=lambda q, r: (True, "ok"))
    assert out.status == SolverStatus.VERIFIED

def test_verifier_disagree_suppresses():
    out = solve_family("q", lambda q: _res("VERIFIED"),
                       verify=lambda q, r: (False, "mismatch"))
    assert out.status == SolverStatus.GUIDED_PRACTICE

def test_crashing_family_is_unsupported():
    def boom(q): raise RuntimeError("test")
    out = solve_family("q", boom)
    assert out.status == SolverStatus.UNSUPPORTED
    assert out.answer is None
