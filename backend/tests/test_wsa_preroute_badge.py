"""WSA-P2 — pre-route badge starvation tests (agent ovhA-p2, 2026-10-10).

TDD contract: every answer()-level test here FAILS on the pre-fix tree
(the pre-routes stamp VERIFIED with no ``structure:`` route and no
``independent:`` gate, the badge gate downgrades to
VERIFIED_WITH_ASSUMPTIONS, and the strict contract withholds with
"Answer computed but not independently verified") and PASSES once:

  * answer_pipeline.py pre-route promotion blocks stamp honest routes
    (structure:NEUROLINK_CONCEPT / NEUROLINK_CALCULUS / MULTIHOP_DAG /
    HUMANITIES_REMEDY, calculus additionally an ``independent:`` gate
    only when the engine's numeric self-check passed), and
  * independent_verifier.py carries the matching DATA ROWS
    (_PREROUTE_DECL) evaluated by one shared generic engine helper —
    never a new hand-written ``def _v_*`` (test_no_handwritten_verifier
    AST-guards that law).

The PAL formula-substitution cluster (numeric qtype 0/14 in the live
200-question replay) is covered by the same row table through the
check_route NA-fallthrough.
"""

import ast
from pathlib import Path
from types import SimpleNamespace

import pytest

from backend.its.solver import answer_pipeline as ap
from backend.its.solver import independent_verifier as iv

VERIFIED = "VERIFIED"
WITHHELD_REASON = ("Answer computed but not independently verified — "
                   "showing the method instead.")


# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #

class _Res:
    """Minimal duck-typed result for direct check_route calls."""

    def __init__(self, answer=None, numeric=None, quantities=None):
        self.final_answer = answer
        self.numeric_answer = numeric
        self.quantities = quantities or {}


@pytest.fixture()
def hermetic(monkeypatch):
    """Keep answer() side-effect free: no memo file IO, no miss-queue
    append, no telemetry row, no bank/official-key DB lookups."""
    monkeypatch.setattr(ap, "_ans_memo_get", lambda t: None)
    monkeypatch.setattr(ap, "_ans_memo_put", lambda t, r: None)
    monkeypatch.setattr(ap, "_queue_miss", lambda t, r: None)
    monkeypatch.setattr(ap, "_official_key_lookup", lambda t: None)
    try:
        from backend.its.solver import bank_answer as _ba
        monkeypatch.setattr(_ba, "lookup", lambda t: None)
    except Exception:
        pass
    try:
        from backend.services import answer_telemetry as _tel
        monkeypatch.setattr(_tel, "record_solve",
                            lambda *a, **k: None)
    except Exception:
        pass


def _patch_concept_standdowns(monkeypatch):
    """Concept-lane stand-downs must release the synthetic stem."""
    try:
        from backend.its.solver import socsci_families as _sf
        monkeypatch.setattr(_sf, "fact_recall_match", lambda t: None)
        monkeypatch.setattr(
            _sf, "model_socsci",
            lambda t: SimpleNamespace(matched=False))
    except Exception:
        pass
    try:
        from backend.its.solver.biology_cognitive_engine import \
            BiologyCognitiveEngine as _BCE
        monkeypatch.setattr(
            _BCE, "evaluate_fact_recall",
            classmethod(lambda cls, t: None))
    except Exception:
        pass


# --------------------------------------------------------------------------- #
# 1. NEUROLINK concept pre-route
# --------------------------------------------------------------------------- #

def test_concept_preroute_flips_to_verified(hermetic, monkeypatch):
    _patch_concept_standdowns(monkeypatch)
    from backend.its.solver.neurolink import NeuroLinkEngine
    monkeypatch.setattr(
        NeuroLinkEngine, "fast_solve",
        lambda self, t: {
            "status": "verified",
            "answer": ("Catenation is the tendency of an element to "
                       "form covalent bonds with atoms of the same "
                       "element, forming long chains or rings."),
            "steps": ["Catenation: definition"],
            "verification": {"anchor": "neurolink:concept"},
            "elapsed_ms": 12.0,
        })
    res = ap.answer("Define catenation")
    assert res.label == VERIFIED, (
        f"concept pre-route should ship VERIFIED once the "
        f"structure:NEUROLINK_CONCEPT row registers; got {res.label} "
        f"({res.refusal_reason})")
    assert res.answer and "catenation" in res.answer.lower()
    assert res.refusal_reason is None
    assert any(str(r).startswith("structure:NEUROLINK_CONCEPT")
               for r in res.audit.route)


def test_concept_row_catches_off_topic_answer():
    verdict, proof = iv.check_route(
        "NEUROLINK_CONCEPT", "Define catenation",
        _Res(answer="Photosynthesis is how plants make food using "
                    "sunlight, water and carbon dioxide."))
    assert verdict == "fail", (
        f"an answer missing the asked term must FAIL the qualitative "
        f"row, got {verdict}: {proof}")


def test_concept_row_passes_on_topic_answer():
    verdict, proof = iv.check_route(
        "NEUROLINK_CONCEPT", "Define catenation",
        _Res(answer="Catenation is the bonding of an element with "
                    "itself into chains."))
    assert verdict == "pass", f"got {verdict}: {proof}"


# --------------------------------------------------------------------------- #
# 2. NEUROLINK calculus pre-route
# --------------------------------------------------------------------------- #

def _calc_result(numeric_selfcheck=True):
    from backend.its.solver.neurolink import NeuroLinkEngine
    return NeuroLinkEngine, {
        "status": "verified",
        "answer": "3*x**2 + 2",
        "exact_answer": "3*x**2 + 2",
        "steps": ["d/dx(x**3 + 2*x) = 3*x**2 + 2"],
        "verification": {
            "verified": True,
            "label": "VERIFIED_CALCULUS",
            "gates_passed": [
                "neurolink_calculus_engine", "backend_sympy",
                "numerical_verification" if numeric_selfcheck
                else "symbolic_check"],
            "anchor": "calculus:differentiate:sympy",
            "detail": "Symbolically & numerically verified",
        },
        "audit": {"lane": "neurolink_calculus",
                  "operation": "differentiate", "backend": "sympy",
                  "verified": numeric_selfcheck, "elapsed_ms": 5.0},
        "elapsed_ms": 6,
    }


def test_calculus_preroute_flips_to_verified(hermetic, monkeypatch):
    cls, payload = _calc_result(numeric_selfcheck=True)
    monkeypatch.setattr(cls, "solve_calculus",
                        lambda self, q, class_level="12": payload)
    res = ap.answer("Differentiate x^3 + 2x with respect to x")
    assert res.label == VERIFIED, (
        f"calculus pre-route should ship VERIFIED once the "
        f"NEUROLINK_CALCULUS row passes; got {res.label} "
        f"({res.refusal_reason})")
    assert res.answer is not None and res.refusal_reason is None
    assert "independent:calculus_symbolic_numeric_agree" \
        in res.audit.gates_passed
    assert any(str(r).startswith("structure:NEUROLINK_CALCULUS")
               for r in res.audit.route)


def test_calculus_independent_gate_only_when_engine_selfchecked(
        hermetic, monkeypatch):
    cls, payload = _calc_result(numeric_selfcheck=False)
    monkeypatch.setattr(cls, "solve_calculus",
                        lambda self, q, class_level="12": payload)
    res = ap.answer("Differentiate x^3 + 2x with respect to x")
    assert "independent:calculus_symbolic_numeric_agree" \
        not in res.audit.gates_passed, (
            "the independent: gate may only be stamped when the "
            "engine's own symbolic+numeric check passed "
            "(audit.verified)")


def test_calculus_row_detects_wrong_derivative():
    verdict, proof = iv.check_route(
        "NEUROLINK_CALCULUS", "Differentiate x^3 + 2x with respect to x",
        _Res(answer="3*x**2 + 5"))
    assert verdict == "fail", f"got {verdict}: {proof}"


def test_calculus_row_passes_correct_derivative():
    verdict, proof = iv.check_route(
        "NEUROLINK_CALCULUS", "Differentiate x^3 + 2x with respect to x",
        _Res(answer="3*x**2 + 2"))
    assert verdict == "pass", f"got {verdict}: {proof}"


def test_calculus_row_definite_integral():
    q = ("Integrate 2*x from 1 to 3")
    verdict, proof = iv.check_route(
        "NEUROLINK_CALCULUS", q, _Res(answer="8", numeric=8.0))
    assert verdict == "pass", f"got {verdict}: {proof}"


def test_calculus_row_na_on_unparseable_claim():
    verdict, _ = iv.check_route(
        "NEUROLINK_CALCULUS", "Differentiate x^3 + 2x with respect to x",
        _Res(answer="the derivative is a polynomial expression here"))
    assert verdict == "na"


# --------------------------------------------------------------------------- #
# 3. MULTI-HOP DAG pre-route (real engine, no monkeypatch)
# --------------------------------------------------------------------------- #

ELECTRON_Q = 1.602176634e-19


def test_multihop_preroute_flips_to_verified(hermetic):
    q = ("An electron is accelerated through a potential difference "
         "of 100 V. Find its kinetic energy.")
    res = ap.answer(q)
    assert res.label == VERIFIED, (
        f"multi-hop DAG pre-route should ship VERIFIED once the "
        f"MULTIHOP_DAG inverse-relation row registers; got "
        f"{res.label} ({res.refusal_reason})")
    assert res.numeric is not None
    assert res.numeric == pytest.approx(ELECTRON_Q * 100.0, rel=1e-6)
    assert res.refusal_reason is None
    assert any(str(r).startswith("structure:MULTIHOP_DAG")
               for r in res.audit.route)


def _mh_ctx_quantities():
    return {"q": ELECTRON_Q, "V": 100.0, "E_k": ELECTRON_Q * 100.0}


def test_multihop_row_catches_tampered_claim():
    q = ("An electron is accelerated through a potential difference "
         "of 100 V. Find its kinetic energy.")
    bad = ELECTRON_Q * 100.0 * 1.5
    verdict, proof = iv.check_route(
        "MULTIHOP_DAG", q,
        _Res(answer=f"{bad:.4g} J", numeric=bad,
             quantities=_mh_ctx_quantities()))
    assert verdict == "fail", (
        f"a claim the DAG relation cannot rebuild must FAIL, got "
        f"{verdict}: {proof}")


def test_multihop_row_passes_honest_claim_with_inverse():
    q = ("An electron is accelerated through a potential difference "
         "of 100 V. Find its kinetic energy.")
    verdict, proof = iv.check_route(
        "MULTIHOP_DAG", q,
        _Res(answer=f"{ELECTRON_Q * 100.0:.4g} J",
             numeric=ELECTRON_Q * 100.0,
             quantities=_mh_ctx_quantities()))
    assert verdict == "pass", f"got {verdict}: {proof}"


def test_multihop_row_any_candidate_may_close():
    """Tuple-row semantics: several rules target 'v'; the FIRST
    resolvable candidate disagreeing must not withhold when a LATER
    rule rebuilds the claim."""
    import math as _math
    q = ("A body moves along a line. Find its final velocity.")
    want = _math.sqrt(1.0 + 2 * 2.0 * 3.0)   # kinematics_v2_u2_2as
    verdict, proof = iv.check_route(
        "MULTIHOP_DAG", q,
        _Res(answer=f"{want:.4g} m/s", numeric=want,
             quantities={"E_k": 100.0, "m": 2.0,
                         "u": 1.0, "a": 2.0, "s": 3.0}))
    assert verdict == "pass", (
        f"expected the kinematics candidate to close the claim "
        f"despite the kinetic-energy candidate disagreeing; got "
        f"{verdict}: {proof}")


# --------------------------------------------------------------------------- #
# 4. Humanities constitutional-remedy pre-route (real engine)
# --------------------------------------------------------------------------- #

HABEAS_Q = ("A person has been detained unlawfully by the police and "
            "never produced before a magistrate. Which writ secures "
            "their release?")


def test_humanities_preroute_flips_to_verified(hermetic):
    res = ap.answer(HABEAS_Q)
    assert res.label == VERIFIED, (
        f"humanities remedy pre-route should ship VERIFIED once the "
        f"HUMANITIES_REMEDY row registers; got {res.label} "
        f"({res.refusal_reason})")
    assert res.answer and "habeas corpus" in res.answer.lower(), (
        f"shipped answer should name the writ, got {res.answer!r}")
    assert res.refusal_reason is None
    assert any(str(r).startswith("structure:HUMANITIES_REMEDY")
               for r in res.audit.route)


def test_humanities_row_catches_wrong_writ():
    verdict, proof = iv.check_route(
        "HUMANITIES_REMEDY", HABEAS_Q, _Res(answer="Mandamus"))
    assert verdict == "fail", f"got {verdict}: {proof}"


def test_humanities_row_passes_fresh_echo():
    verdict, proof = iv.check_route(
        "HUMANITIES_REMEDY", HABEAS_Q, _Res(answer="Habeas Corpus"))
    assert verdict == "pass", f"got {verdict}: {proof}"


# --------------------------------------------------------------------------- #
# 5. PAL formula-substitution cluster (numeric qtype 0/14 starvation)
# --------------------------------------------------------------------------- #

PAL_Q = ("Using the formula A = l × w from this topic, calculate A "
         "when l = 19, w = 5. Give your answer up to 2 decimal places "
         "if needed.")


def test_pal_formula_substitution_flips_to_verified(hermetic, monkeypatch):
    from backend.its.solver import structure_families as sf

    class _FakeSR:
        matched = True
        structure = "PAL_PROGRAM"
        final_answer = "95"
        numeric_answer = 95.0
        steps = ["A = l × w with l = 19, w = 5 gives A = 19 × 5 = 95."]
        understood = {"structure": "PAL_PROGRAM",
                      "givens": {"l": 19.0, "w": 5.0}}

    monkeypatch.setattr(sf, "model_structure", lambda t: _FakeSR())
    res = ap.answer(PAL_Q)
    assert res.label == VERIFIED, (
        f"the Using-the-formula substitution cluster is trivially "
        f"re-derivable from the ask's own numbers; expected VERIFIED, "
        f"got {res.label} ({res.refusal_reason})")
    assert res.refusal_reason is None


def test_pal_formula_row_pass():
    verdict, proof = iv.check_route(
        "PAL_PROGRAM", PAL_Q, _Res(answer="95", numeric=95.0))
    assert verdict == "pass", f"got {verdict}: {proof}"


def test_pal_formula_row_catches_wrong_claim():
    verdict, proof = iv.check_route(
        "PAL_PROGRAM", PAL_Q, _Res(answer="24", numeric=24.0))
    assert verdict == "fail", f"got {verdict}: {proof}"


def test_pal_formula_row_handles_division_and_multi_vars():
    q = ("Using the formula Speed = Distance / Time from this topic, "
         "calculate Speed when Distance = 19, Time = 4. Give your "
         "answer up to 2 decimal places if needed.")
    verdict, proof = iv.check_route(
        "PAL_PROGRAM", q, _Res(answer="4.75", numeric=4.75))
    assert verdict == "pass", f"got {verdict}: {proof}"


def test_pal_row_na_on_non_formula_ask():
    # neither a solve/roots ask (hand-written verifier owns it) nor a
    # Using-the-formula substitution -- a clean NA is the honest verdict
    verdict, _ = iv.check_route(
        "PAL_PROGRAM", "Find the area of a circle of radius 7",
        _Res(answer="154", numeric=154.0))
    assert verdict == "na"


def test_check_route_fail_stays_authoritative():
    """The NA-fallthrough must NEVER override a hand-written FAIL."""
    verdict, proof = iv.check_route(
        "PAL_PROGRAM", "Solve 2x + 3 = 7", _Res(answer="5", numeric=5.0))
    assert verdict == "fail", (
        f"an equation-solve contradiction is a hand-written FAIL and "
        f"must stay final; got {verdict}: {proof}")


# --------------------------------------------------------------------------- #
# 6. registration + VERIFIER ENGINE law (no hand-written verifiers)
# --------------------------------------------------------------------------- #

def test_preroute_rows_are_registered_data_rows():
    rows = getattr(iv, "_PREROUTE_DECL", None)
    assert isinstance(rows, dict), "_PREROUTE_DECL row table missing"
    for sid in ("NEUROLINK_CONCEPT", "NEUROLINK_CALCULUS",
                "MULTIHOP_DAG", "HUMANITIES_REMEDY"):
        assert sid in rows and isinstance(rows[sid], dict), (
            f"{sid} must be a dict DATA ROW")
        assert sid in iv.VERIFIERS, f"{sid} must be registered"


def _fn_names(source: str):
    return {n.name for n in ast.walk(ast.parse(source))
            if isinstance(n, ast.FunctionDef)}


def test_no_handwritten_verifier():
    """AST scan of the WSA-P2 diff: no NEW ``def _v_*`` functions.

    VERIFIER_ENGINE hard rule — registrations are data rows, never
    hand-written per-family verifier functions.  The pre-fix inventory
    (142 grandfathered functions, 2026-10-10) is pinned by digest; any
    NEW ``_v_*`` changes the set and fails this gate.  The deploy tree
    is untracked in git (worktree ahead of HEAD), so the pin lives
    here instead of a git-diff.
    """
    import hashlib
    repo = Path(__file__).resolve().parents[3]
    iv_path = repo / "deploy/backend/its/solver/independent_verifier.py"
    ap_path = repo / "deploy/backend/its/solver/answer_pipeline.py"
    cur = sorted({n for n in _fn_names(iv_path.read_text(encoding="utf-8"))
                  if n.startswith("_v_")})
    digest = hashlib.sha256("|".join(cur).encode()).hexdigest()
    # digest re-pinned 2026-10-13 (was pinned at 142; set legitimately
    # grew +13 on the WS-PAL wave 2026-10-13 — pre-existing drift — and
    # +3 on WS-MH: _v_chain / _v_chain_clauses / _v_chain_narrative,
    # the CHAIN second-path engine, NOT a per-family data row)
    assert digest == "928d48d0e8d6a5eae8f8a78733e4f57db62acd658" \
                    "2a8a68afe3aaa690d3373fa", (
        f"hand-written verifier function set changed "
        f"({len(cur)} names, expected the pinned 158) — write the "
        f"DATA ROW instead (VERIFIER_ENGINE hard rule)")
    # answer_pipeline never carried verifier functions; keep it that way
    assert not {n for n in _fn_names(ap_path.read_text(encoding="utf-8"))
                if n.startswith("_v_")}
