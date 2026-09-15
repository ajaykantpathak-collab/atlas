"""diag_binding.py — Per-case visibility into the binding stage.

For each benchmark case prints: quantities found, top-ranked equations,
best equation's assignment, unbound variables, and why it failed.
Usage: python backend/its/tests/diag_binding.py [case_name_filter]
"""

from __future__ import annotations

import os
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(_HERE, "..", "..", "..")))

from backend.its.tests.test_router_benchmark import CASES  # noqa: E402


def diagnose(name: str, text: str) -> None:
    import logging

    logging.disable(logging.WARNING)
    import numpy as np

    from backend.its.solver.graph_loader import build_canonical_graph
    from backend.its.solver.quantity_parser import (parse_quantities,
                                                    split_intent)
    from backend.its.solver.variable_registry import (
        NON_TARGET_SYMBOLS, describe, embed_texts,
        equation_description_vectors)

    g, _ = build_canonical_graph()
    given, intent = split_intent(text)
    qs = parse_quantities(given)
    print(f"\n=== {name} ===")
    print(f"  intent: {intent.strip()!r}")
    for q in qs:
        print(f"  q: {q.value} [{q.family}] {q.context[:60]!r}")
    if not qs:
        print("  !! no quantities extracted")

    text_vec = embed_texts([text])[0]
    dv = equation_description_vectors()
    sims = sorted(((float(np.dot(text_vec, v)), k) for k, v in dv.items()),
                  reverse=True)[:6]
    print(f"  top eqs: {[k for _s, k in sims]}")

    for _score, eq_id in sims:
        eq = g.equations[eq_id]
        bindable = [v for v in eq.variables if v not in NON_TARGET_SYMBOLS]
        if not (1 <= len(bindable) - 1 <= 6) or len(bindable) < 2:
            continue
        qvecs = embed_texts([q.context for q in qs])
        scores = {}
        for vi, var in enumerate(bindable):
            desc, fam = describe(var, eq_id)
            vvec = embed_texts([desc])[0]
            for qi, q in enumerate(qs):
                s = float(np.dot(qvecs[qi], vvec))
                if q.family != "dimensionless" and q.family == fam:
                    s += 0.35
                scores[(qi, vi)] = s
        taken, assignment = set(), {}
        for (qi, vi), s in sorted(scores.items(), key=lambda kv: -kv[1]):
            if qi in taken or vi in assignment.values() or s < 0.30:
                continue
            assignment[bindable[vi]] = qi
            taken.add(qi)
        unbound = [v for v in bindable if v not in assignment]
        knowns = {v: qs[qi].value for v, qi in assignment.items()}
        print(f"  -> {eq_id}: bound {knowns}, unbound {unbound}")
        if len(unbound) == 1:
            tdesc, _ = describe(unbound[0], eq_id)
            tvec = embed_texts([tdesc])[0]
            ivec = embed_texts([intent])[0]
            print(f"     target {unbound[0]} ({tdesc[:40]}) "
                  f"intent-cos={float(np.dot(ivec[0], tvec)):.3f}")
            path = g.find_solve_path(dict(knowns), unbound[0])
            print(f"     solve: {path.final_value if path else None}")
        break  # only the best candidate for brevity


def main() -> int:
    flt = sys.argv[1] if len(sys.argv) > 1 else ""
    for name, text, _exp, _t in CASES:
        if flt.lower() in name.lower():
            diagnose(name, text)
    return 0


if __name__ == "__main__":
    sys.exit(main())
