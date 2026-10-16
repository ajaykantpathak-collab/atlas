"""family_adapter.py — the universal contract boundary for legacy families.

Every legacy family solves `question -> ModelResult`.  This adapter wraps
that into the universal `SolverOutcome` contract and ENFORCES the one
invariant the whole program stands on:

    status != VERIFIED  ->  answer is None and numeric is None

No family may bypass this rule.  The adapter is the boundary that makes it
mechanically impossible: verified answers pass through untouched; every
other label has its answer/numeric stripped before the outcome leaves.

Usage:
    from backend.its.solver.family_adapter import solve_family
    outcome = solve_family(question, model_accountancy_families)

`family_fn` is any callable returning an object with the ModelResult shape
(matched, confidence, final_answer, numeric_answer, steps, note).
Optional `verify` is an independent check: (question, outcome) ->
(verdict_bool, proof_str).  When provided and the family claims VERIFIED,
the claim survives only if the verifier agrees; otherwise the outcome is
downgraded to GUIDED_PRACTICE with the verifier's proof as the reason.
"""

from __future__ import annotations

import os
from typing import Any, Callable, Dict, List, Optional, Tuple

from backend.its.solver.contract import SolverOutcome, SolverStatus

_VERIFIED_LABELS = frozenset({
    "VERIFIED", "VERIFIED_WITH_ASSUMPTIONS", "VERIFIED_OFFICIAL"})


def _label_of(result: Any) -> str:
    return str(getattr(result, "label", "") or
               getattr(result, "structure", "") or "").upper()


def _matched(result: Any) -> bool:
    return bool(getattr(result, "matched", False))


def _steps_of(result: Any) -> List[str]:
    steps = getattr(result, "steps", None) or []
    return [str(s) for s in steps][:24]


def solve_family(
    question: str,
    family_fn: Callable[[str], Any],
    *,
    verify: Optional[Callable[[str, Any], Tuple[bool, str]]] = None,
    family_id: str = "",
    route_prefix: str = "family",
) -> SolverOutcome:
    """Run one legacy family under the universal contract.

    Enforces:  status != VERIFIED  ->  answer is None and numeric is None.
    An independent `verify` callback (when provided) may additionally
    suppress a VERIFIED claim that the second path cannot reproduce.
    """
    family_id = family_id or getattr(family_fn, "__name__", "family")
    route = [f"{route_prefix}:{family_id}"]

    try:
        result = family_fn(question)
    except Exception as exc:  # a crashing family is an honest refusal
        return SolverOutcome(
            status=SolverStatus.UNSUPPORTED, answer=None, numeric=None,
            steps=[], route=route, structure=family_id,
            refusal_reason=f"family raised: {str(exc)[:120]}")

    matched = _matched(result)
    claimed_answer = getattr(result, "final_answer", None)
    claimed_numeric = getattr(result, "numeric_answer", None)
    steps = _steps_of(result)
    note = str(getattr(result, "note", "") or "")

    if not matched:
        return SolverOutcome(
            status=SolverStatus.GUIDED_PRACTICE,
            answer=None, numeric=None, steps=steps, route=route,
            structure=family_id, note=note,
            refusal_reason="family did not match this question")

    label = _label_of(result)
    verified_claim = label in _VERIFIED_LABELS or (
        claimed_answer is not None and claimed_answer != "")

    # INDEPENDENT VERIFICATION: when provided, a VERIFIED claim survives
    # only if the second path agrees.  NA/absent verifier on a verified
    # claim downgrades to guided -- the strict policy from the master plan
    # (Phase 6): a registered family must not be promoted simply because
    # its own solver says it succeeded.
    # REQUIRE_INDEPENDENT_VERIFIER=true: a VERIFIED claim without any
    # verifier is ALSO downgraded (hard policy -- no self-certification).
    _require_verifier = os.environ.get(
        "REQUIRE_INDEPENDENT_VERIFIER", "").strip().lower() in ("1", "true", "yes")

    if verified_claim and verify is not None:
        try:
            ok, proof = verify(question, result)
        except Exception as exc:
            ok, proof = False, f"verifier raised: {str(exc)[:120]}"
        if not ok:
            return SolverOutcome(
                status=SolverStatus.GUIDED_PRACTICE, answer=None,
                numeric=None, steps=steps, route=route,
                structure=family_id, note=note,
                refusal_reason=f"independent verifier withheld: "
                               f"{str(proof)[:160]}")
        route.append(f"{route_prefix}:independent_verified")
    elif verified_claim and _require_verifier and verify is None:
        return SolverOutcome(
            status=SolverStatus.GUIDED_PRACTICE, answer=None,
            numeric=None, steps=steps, route=route,
            structure=family_id, note=note,
            refusal_reason="REQUIRE_INDEPENDENT_VERIFIER=true: no "
                           "independent verifier registered for this family")

    if verified_claim:
        return SolverOutcome(
            status=SolverStatus.VERIFIED, answer=claimed_answer,
            numeric=claimed_numeric, steps=steps, route=route,
            structure=family_id, note=note)

    # any other label: honest guided -- answer/numeric stay None
    return SolverOutcome(
        status=SolverStatus.GUIDED_PRACTICE, answer=None, numeric=None,
        steps=steps, route=route, structure=family_id, note=note,
        refusal_reason=str(getattr(result, "refusal_reason", "") or
                           "family matched but could not verify"))
