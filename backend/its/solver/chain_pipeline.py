"""chain_pipeline.py -- Lane B hook: multi-hop narrative chains.

Wires multi_hop (case_builder's chain composer at 5-hop reach) into the
answer pipeline.  try_chain runs AFTER every Lane B reader and BEFORE
the modeling_layer fallback:

    parse_chain_text(text)   2-5 step narrative -> chain spec
    compose_chain_multi(...) execute; hop N consumes hop N-1's output

Two honest exits, nothing else:

    VERIFIED          every hop computed; per-hop steps + audit
    GUIDED_PRACTICE   a hop failed (or the chain was refused): all
                      completed steps are shown, the answer is withheld

None is returned when the text is not a recognizable chain, so every
other reader keeps its chance first.  Deterministic; no LLM anywhere.
"""

from __future__ import annotations

from typing import Optional

from backend.its.solver.answer_pipeline import (
    AuditTrail, GUIDED, PipelineResult, VERIFIED)
# WSA-P3: never-raising lane-exception logger — a crashed guard must
# at least be measured even where fail-open stays the contract.
from backend.its.solver.contract import log_lane_exception
from backend.its.solver.multi_hop import (
    MIN_CHAIN_HOPS, MULTI_HOP_MAX, compose_chain_multi, parse_chain_text,
)


def try_chain(text: str, audit: AuditTrail) -> Optional[PipelineResult]:
    """Try to parse and solve a multi-step narrative as a chain.

    Returns a PipelineResult (VERIFIED with per-step audit, or GUIDED
    with the completed steps shown) when the text parses as a 2-5 hop
    chain; None when it does not, leaving the decision to the caller.
    """
    spec = parse_chain_text(text)
    if spec is None:
        return None
    keys = spec["keys"]
    if not (MIN_CHAIN_HOPS <= len(keys) <= MULTI_HOP_MAX):
        return None
    # INCOMPLETE-READING GUARD: if the text splits into MORE hop
    # clauses than the chain grammar parsed, some ask would go
    # unanswered while the chain ships VERIFIED.  Decline instead --
    # the hop_planner fallback answers every clause or nothing.
    try:
        from backend.its.solver.hop_planner import split_hop_clauses
        clauses = split_hop_clauses(text)
        if clauses is not None and len(clauses) > len(keys):
            return None
    except Exception as _exc:
        # WSA-P3: this guard crashing silently disabled the
        # incomplete-reading protection (a partial chain could ship) —
        # fail-open stays the contract, the crash is now measured.
        log_lane_exception(
            stage="chain_pipeline.try_chain.hop_clause_guard", exc=_exc)
    audit.route.append(f"chain:{len(keys)}hops")

    chain = compose_chain_multi(keys, spec["linking_quantities"],
                                spec["values"])

    # per-step audit: what each hop consumes and produces, by name
    for i, hop in enumerate(chain["hops"]):
        audit.quantities.append({
            "hop": i + 1,
            "key": hop["key"],
            "produces": hop.get("produces"),
            "consumes": hop.get("consumes"),
        })

    if chain["degradation"] is None:
        # ECHO GUARD: the answer must never merely echo a number that
        # only the final ask sentence stated -- that signature means
        # the parser lifted an ask parameter in as an operand and
        # "verified" a wrong reading
        if any(abs(float(chain["answer"]) - p) < 1e-9
               for p in spec.get("ask_param_numbers") or []):
            return None
        audit.gates_passed.append("chain_compose")
        audit.route.append("multi_hop_chain")
        # WS-MH: name the structure so the strict badge gate can run the
        # registered CHAIN second path (fresh spec parse + own-binding
        # recompute + inverse-relation anchor) instead of downgrading
        # every chain as verifier_no_route.
        audit.route.append("structure:CHAIN")
        value = chain["answer"]
        return PipelineResult(
            label=VERIFIED, answer=str(value), numeric=float(value),
            steps=list(chain["steps"]), audit=audit)

    # honest degradation: completed steps shown, answer withheld
    audit.route.append("chain_degraded")
    return PipelineResult(
        label=GUIDED, answer=None, numeric=None,
        steps=list(chain["steps"]), audit=audit,
        refusal_reason=chain["refusal_reason"])


__all__ = ["try_chain"]
