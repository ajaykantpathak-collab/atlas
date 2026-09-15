"""constraint_solver.py — The professor's method: generate and TEST.

Instead of predicting which quantity plays which role (fragile), every
plausible assignment is SOLVED and reality rejects the wrong ones:

    1. For each canonical equation whose slot count fits the extracted
       quantities, try every assignment of quantities to slots
       (deduplicated permutations - typically <= 6)
    2. DIMENSIONAL FILTER: an assignment dies if any quantity's base
       dimensions contradict its slot's family (2 A can fill a current
       slot, never a resistance slot)
    3. Each survivor is SOLVED - wrong assignments produce wrong or
       unsolvable math
    4. The QUESTION selects among verified candidates: "Find the
       voltage" matches the slot whose meaning is voltage

Latency contract (a student is waiting):
    - SEARCH uses the symengine tier only (~2 ms per test)
    - the single winner is re-solved through the full cascade once
    - decisive candidates stop the search immediately
    - variable-description embeddings are batch-computed once
"""

from __future__ import annotations

import itertools
import logging
from typing import Dict, List, Optional, Tuple

logger = logging.getLogger(__name__)


def _cos(a, b) -> float:
    import numpy as np

    d = float(np.linalg.norm(a) * np.linalg.norm(b))
    return float(np.dot(a, b) / d) if d else 0.0


def _unique_permutations(items: list, count: int):
    """Permutations with duplicate value-tuples collapsed (4 ohm, 4 ohm
    are symmetric - one ordering suffices)."""
    seen = set()
    for perm in itertools.permutations(items, count):
        vkey = tuple((round(q.value, 12), q.family) for q in perm)
        if vkey in seen:
            continue
        seen.add(vkey)
        yield perm


class ConstraintSolver:
    """Generate-and-test solver over the canonical equation graph."""

    def __init__(self) -> None:
        self._graph = None
        self._desc_vecs = None
        self._var_vecs: Dict[Tuple[str, str], object] = {}

    def _ensure(self):
        if self._graph is None:
            from backend.its.solver.graph_loader import build_canonical_graph
            from backend.its.solver.variable_registry import (
                describe, embed_texts, equation_description_vectors)

            self._graph, _ = build_canonical_graph()
            self._desc_vecs = equation_description_vectors()

            # Batch-embed every (equation, variable) description ONCE -
            # one encode call instead of hundreds of lazy ones.
            pairs: List[Tuple[str, str]] = []
            descs: List[str] = []
            for eq_id, eq in self._graph.equations.items():
                for var in eq.variables:
                    desc, _f = describe(var, eq_id)
                    pairs.append((eq_id, var))
                    descs.append(desc)
            vecs = embed_texts(descs)
            if vecs is not None:
                self._var_vecs = dict(zip(pairs, vecs))
        return self._graph

    def _solve_fast(self, eq, unknown: str, knowns: Dict[str, float]):
        """Symengine-only solve with residual verification (~2 ms)."""
        import math as _math

        from backend.solvers.core_calculus_engine.algebraic_solver import (
            _tier_symengine)

        try:
            from sympy import Symbol

            parsed = self._graph._parsed_expr(eq)
            if parsed is None:
                return None
            if "=" in eq.expression:
                lhs, rhs = eq.expression.split("=", 1)
            else:
                lhs, rhs = eq.expression, "0"
            subs = {Symbol(v): float(val) for v, val in knowns.items()
                    if v in eq.variables}
            scale = max([1.0] + [abs(float(v)) for v in knowns.values()])
            r = _tier_symengine(lhs.strip(), rhs.strip() or "0",
                                unknown, knowns, 0.8)
            for cand in r.solutions:
                if not _math.isfinite(cand):
                    continue
                try:
                    res = float(parsed.subs(
                        {**subs, Symbol(unknown): cand}))
                    if _math.isfinite(res) and abs(res) < 1e-6 * max(
                            scale, abs(cand)):
                        return cand
                except Exception:
                    continue
        except Exception:
            return None
        return None

    def solve(self, text: str, quantities, intent: str,
              time_budget_s: float = 3.0) -> Optional[Dict]:
        """Returns {'target','value','eq_id','knowns','score','steps'} or
        None when no dimensionally sound verified candidate exists."""
        import re as _re
        import time as _time

        g = self._ensure()
        if not quantities or self._desc_vecs is None:
            return None

        from backend.its.solver.dimensional_analysis import dims_compatible
        from backend.its.solver.quantity_parser import STRUCTURAL_HINTS
        from backend.its.solver.variable_registry import (
            NON_TARGET_SYMBOLS, describe, embed_texts)

        text_vec = embed_texts([text])[0]
        intent_vec = embed_texts([intent])[0]
        q_ctx_vecs = embed_texts([q.context for q in quantities])

        grammar_facts: list = []
        for pattern, roles in STRUCTURAL_HINTS:
            m = _re.search(pattern, text, _re.IGNORECASE)
            if m:
                grammar_facts.extend(
                    (var, float(m.group(g))) for var, g in roles.items())

        eq_ids = [e for e, v in self._desc_vecs.items() if v is not None]
        eq_ids.sort(key=lambda e: -_cos(text_vec, self._desc_vecs[e]))

        candidates = []
        decisive = None
        n_slots_needed = len(quantities) + 1
        t0 = _time.perf_counter()

        for eq_id in eq_ids:
            if decisive is not None:
                break
            if _time.perf_counter() - t0 > time_budget_s:
                break
            eq_rel = _cos(text_vec, self._desc_vecs[eq_id])
            if eq_rel < 0.15:
                break  # relevance-sorted: nothing further will help
            eq = g.equations[eq_id]
            slots = [v for v in eq.variables if v not in NON_TARGET_SYMBOLS]
            if len(slots) != n_slots_needed or len(slots) < 2:
                continue

            for unknown in slots:
                if (eq.solvable_vars is not None
                        and unknown not in eq.solvable_vars):
                    continue
                rest = [s for s in slots if s != unknown]
                if not (1 <= len(rest) <= 6):
                    continue

                perm_budget = 400
                for perm in _unique_permutations(quantities, len(rest)):
                    perm_budget -= 1
                    if perm_budget <= 0:
                        break   # combinatorial blow-up guard
                    knowns = {var: float(q.value)
                              for var, q in zip(rest, perm)}

                    # dimensional filter (cheap, first)
                    ok = True
                    for var, q in zip(rest, perm):
                        _desc, fam = describe(var, eq_id)
                        if not dims_compatible(q.family, fam):
                            ok = False
                            break
                    if not ok:
                        continue

                    # fast symengine-only solve
                    value = self._solve_fast(eq, unknown, knowns)
                    if value is None:
                        continue

                    # plausibility gate: impossible values die here
                    _d, ufam_gate = describe(unknown, eq_id)
                    from backend.its.solver.variable_registry import plausible
                    if not plausible(unknown, ufam_gate, value):
                        continue

                    # question-directed selection score
                    q_score = _cos(intent_vec,
                                   self._var_vecs.get((eq_id, unknown)))
                    # assignment fit: does each quantity's context actually
                    # describe its slot? ("current of 5" must not sit in a
                    # resistance slot even when units are absent)
                    fits = []
                    fam_bonus = 0.0
                    for qi, (var, q) in enumerate(zip(rest, perm)):
                        vvec = self._var_vecs.get((eq_id, var))
                        if vvec is not None:
                            fits.append(_cos(q_ctx_vecs[qi], vvec))
                        _d, vfam = describe(var, eq_id)
                        if (q.family != "dimensionless"
                                and q.family == vfam):
                            fam_bonus += 0.1
                    assign_fit = (sum(fits) / len(fits)) if fits else 0.0
                    grammar = 0.0
                    for gvar, gval in grammar_facts:
                        if gvar not in knowns:
                            continue
                        grammar += 0.25 if knowns[gvar] == gval else -0.25
                    score = (1.6 * q_score + 1.4 * assign_fit
                             + 0.6 * eq_rel + fam_bonus + grammar)
                    cand = {
                        "target": unknown, "value": value, "eq_id": eq_id,
                        "knowns": knowns, "score": score,
                        "steps": [f"assignment {knowns}; unknown "
                                  f"'{unknown}' via {eq_id} "
                                  f"({eq.description})"],
                    }
                    candidates.append(cand)

                    # Commit early when evidence is decisive
                    if (q_score >= 0.72 and eq_rel >= 0.45
                            and grammar >= 0 and assign_fit >= 0.30):
                        decisive = cand
                        break

                if decisive is not None:
                    break
            if decisive is not None:
                break

        if decisive is not None:
            best = decisive
        else:
            if not candidates:
                return None
            candidates.sort(key=lambda c: -c["score"])
            best = candidates[0]
            if best["score"] < 0.45:
                return None

        # Full-cascade verification of the single winner (slow path x1)
        verified = g._solve_equation(g.equations[best["eq_id"]],
                                     best["target"], best["knowns"])
        if verified is not None:
            best["value"] = verified
        # For diagnostics: what else competed?
        candidates.sort(key=lambda c: -c["score"])
        best["alternatives"] = [
            {k: c[k] for k in ("target", "value", "eq_id", "score",
                               "knowns")}
            for c in candidates[:6]]
        return best


# Singleton
_solver: Optional[ConstraintSolver] = None


def get_constraint_solver() -> ConstraintSolver:
    global _solver
    if _solver is None:
        _solver = ConstraintSolver()
    return _solver
