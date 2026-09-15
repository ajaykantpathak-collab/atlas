"""ledger_solver.py — Read like a human solver: ledger propagation.

The competency-question core. Instead of binding everything upfront
(competency text never names every role next to its number), it keeps
a LEDGER of known quantities and iterates:

    1. Per-equation binding pass: role phrases, unit families, measure
       lexicon attributes, grammar arithmetic, implicit idioms
    2. Solve every equation that is exactly one slot short
    3. Derived values re-enter the ledger - other equations consume
       them (family-matched), unlocking further equations
    4. Repeat to a fixed point. The asked target (variable or FAMILY,
       e.g. 'how long' -> time) surfacing in the ledger ends the loop

Ambiguity never blocks: an under-determined equation is simply skipped
this round and revisited after propagation adds knowledge. Distractor
numbers never bind, so they never propagate. Deterministic end to end.
"""

from __future__ import annotations

import logging
import re
import time
from typing import Dict, List, Optional, Tuple

logger = logging.getLogger(__name__)


def _cos(a, b) -> float:
    import numpy as np

    d = float(np.linalg.norm(a) * np.linalg.norm(b))
    return float(np.dot(a, b) / d) if d else 0.0


# --------------------------------------------------------------------- #
# Grammar arithmetic: constructions that COMPUTE a slot, not name it
# --------------------------------------------------------------------- #

_ARITH_RULES = [
    # "40 shirts at 250 each" -> total = 10000 (cost price side)
    (r"(?:bought|purchas\w+|buy|buys)\s+(\d+)\s+\w+\s+at\s+"
     r"(-?\d+(?:\.\d+)?)\s+each",
     "cp"),
    (r"(?:sold|sell|sells|sold\s+them)\s+(?:\w+\s+){0,2}at\s+"
     r"(-?\d+(?:\.\d+)?)\s+each",
     "sp"),
    (r"(\d+)\s+(?:pens|pencils|shirts|items|units|notebooks|tickets|"
     r"kg|litres|liters)\s+(?:cost|costs|at)\s+(-?\d+(?:\.\d+)?)\s+each",
     "cp"),
]


def _arithmetic_bindings(text: str) -> Dict[str, float]:
    out: Dict[str, float] = {}
    for pattern, var in _ARITH_RULES:
        m = re.search(pattern, text, re.IGNORECASE)
        if not m:
            continue
        groups = [g for g in m.groups() if g is not None]
        if var == "cp" and len(groups) == 2:
            out["cp"] = float(groups[0]) * float(groups[1])
        elif var == "sp":
            out["sp"] = float(groups[0])
    return out


def _word_overlap(text_words: set, desc: str) -> float:
    """Prefix-tolerant word overlap ('cylindrical' matches 'cylinder')."""
    desc_words = set(re.findall(r"[a-z]+", desc.lower()))
    hit = 0
    for dw in desc_words:
        if len(dw) < 4:
            if dw in text_words:
                hit += 1
            continue
        if any(tw.startswith(dw) or dw.startswith(tw)
               for tw in text_words if len(tw) >= 4):
            hit += 1
    return hit / max(1, len(desc_words))


class LedgerSolver:
    """Iterative bind-propagate loop over the canonical graph."""

    def __init__(self) -> None:
        self._graph = None
        self._index = None
        self._desc_vecs = None

    def _ensure(self):
        if self._graph is None:
            from backend.its.solver.graph_loader import build_canonical_graph
            from backend.its.solver.role_index import RoleIndex
            from backend.its.solver.variable_registry import (
                equation_description_vectors)

            self._graph, _ = build_canonical_graph()
            self._index = RoleIndex()
            self._index._ensure()
            self._desc_vecs = equation_description_vectors()
        return self._graph

    # ------------------------------------------------------------------ #
    def solve(self, text: str, quantities,
              time_budget_s: float = 2.5) -> Optional[Dict]:
        import time as _time

        g = self._ensure()
        if not quantities:
            return None
        t0 = _time.perf_counter()

        from backend.its.solver import measure_lexicon as lex
        from backend.its.engagement.implicit_values import get_resolver
        from backend.its.solver.variable_registry import (
            NON_TARGET_SYMBOLS, describe)

        # ---- targets: variable (named) or family (interrogative) ----
        var_target = self._resolve_target(text)
        fam_target = lex.question_family(text)
        target_cands = self._target_candidates(text, var_target)

        # ---- scenario: relevance-pruned equation subset ----
        text_vec = self._text_vec(text)
        if text_vec is None:
            return None
        eq_ids = [e for e, v in self._desc_vecs.items() if v is not None]
        eq_ids.sort(key=lambda e: -_cos(text_vec, self._desc_vecs[e]))
        scenario = eq_ids[:25]
        # prefix-tolerant word overlap catches morphological variants
        # ('cylindrical' vs 'cylinder', 'cuboidal' vs 'cuboid')
        text_words = set(re.findall(r"[a-z]+", text.lower()))
        overlaps = sorted(
            (( _word_overlap(text_words,
                             g.equations[e].description + " " +
                             g.equations[e].subject), e) for e in eq_ids),
            reverse=True)[:15]
        for _ov, e in overlaps:
            if e not in scenario:
                scenario.append(e)
        if var_target:
            with_target = [e for e, eq in g.equations.items()
                           if var_target in eq.variables]
            for e in with_target:
                if e not in scenario:
                    scenario.append(e)
        scenario_set = set(scenario)

        # ---- deterministic global binds ----
        ledger: Dict[str, float] = {"g_": 9.8}  # default gravity
        prov: List[str] = ["default: g_ = 9.8"]

        # ---- deterministic global binds ----
        ledger: Dict[str, float] = {"g_": 9.8}  # default gravity
        prov: List[str] = ["default: g_ = 9.8"]

        for var, val in _arithmetic_bindings(text).items():
            ledger[var] = val
            prov.append(f"grammar arithmetic: {var} = {val:g}")
        try:
            implicit = get_resolver().resolve(text).implicit or {}
            for var, val in implicit.items():
                if var not in ledger and not str(var).startswith("_"):
                    ledger[var] = float(val)
                    prov.append(f"idiom: {var} = {val:g} (implicit)")
        except Exception:
            pass
        # free-fall style idioms not covered by the resolver
        if re.search(r"\b(falls?|drops?|dropped|falls? down)\b", text,
                     re.IGNORECASE) and "u" not in ledger:
            ledger["u"] = 0.0
            prov.append("idiom: falls/drops -> u = 0")

        fam_by_var = self._family_map()

        # ---- propagation to fixed point ----
        derived_log = []
        for round_i in range(5):
            if _time.perf_counter() - t0 > time_budget_s:
                break
            new = self._propagation_pass(text, quantities, scenario,
                                         ledger, fam_by_var)
            if not new:
                break
            for var, (val, eq_id) in new.items():
                if var not in ledger:
                    ledger[var] = val
                    derived_log.append(f"{var} = {val:.6g} via {eq_id}")
                    prov.append(f"propagated {var} = {val:.6g} ({eq_id})")

        # ---- verdict ----
        result = None
        if target_cands:
            hits = [(v, ledger[v]) for v in target_cands if v in ledger]
            if hits:
                # prefer the candidate from the most scenario-relevant
                # equation that is actually in the ledger
                def rel(var: str) -> float:
                    best = 0.0
                    for e in scenario:
                        eq = g.equations[e]
                        if var in eq.variables:
                            best = max(best,
                                       _cos(text_vec, self._desc_vecs[e]))
                    return best
                hits.sort(key=lambda kv: -rel(kv[0]))
                result = hits[0]
        if result is None and fam_target:
            cands = [(v, val) for v, val in ledger.items()
                     if fam_by_var.get(v) == fam_target]
            if cands:
                result = cands[0]
        if result is None:
            return None
        target_var, value = result
        return {
            "target": target_var, "value": value,
            "eq_id": "ledger", "knowns": dict(list(ledger.items())[:12]),
            "score": 1.0, "steps": prov,
        }

    # ------------------------------------------------------------------ #
    def _text_vec(self, text: str):
        from backend.its.solver.variable_registry import embed_texts

        vecs = embed_texts([text])
        return None if vecs is None else vecs[0]

    def _family_map(self) -> Dict[str, str]:
        from backend.its.solver.variable_registry import describe

        out = {}
        for eq_id, eq in self._graph.equations.items():
            for v in eq.variables:
                if v not in out:
                    _d, fam = describe(v, eq_id)
                    out[v] = fam
        return out

    def _resolve_target(self, text: str) -> Optional[str]:
        try:
            from backend.its.solver.role_index import resolve_target
            return resolve_target(text, self._index)
        except Exception:
            return None

    def _target_candidates(self, text: str, var_target) -> set:
        """All variables the question could be asking for (the resolved
        echo plus every slot hit by the question's role phrases)."""
        cands = set()
        if var_target:
            cands.add(var_target)
        from backend.its.solver.quantity_parser import split_intent
        from backend.its.solver.role_index import _content_words

        _g, intent = split_intent(text)
        qwords = _content_words(intent)
        for n in (3, 2, 1):
            for i in range(len(qwords) - n + 1):
                phrase = " ".join(qwords[i:i + n])
                for _eq, var in self._index.index.get(phrase, ()):
                    cands.add(var)
            if cands:
                break
        return cands

    def _propagation_pass(self, text, quantities, scenario, ledger,
                           fam_by_var):
        """One bind+solve sweep over the scenario. Binding evidence is
        applied to every equation; those left with exactly one unknown
        are solved and reported as new derivations."""
        from backend.its.solver.dimensional_analysis import dims_compatible
        from backend.its.solver.measure_lexicon import (
            attribute_family, sentence_of)
        from backend.its.solver.role_index import extract_mentions
        from backend.its.solver.variable_registry import NON_TARGET_SYMBOLS

        g = self._graph
        mentions = extract_mentions(text, quantities)
        new_values: Dict[str, Tuple[float, str]] = {}

        for eq_id in scenario:
            eq = g.equations[eq_id]
            slots = [v for v in eq.variables if v not in NON_TARGET_SYMBOLS]
            if len(slots) < 2:
                continue

            bound: Dict[str, float] = {v: ledger[v] for v in slots
                                       if v in ledger}
            consumed = set(bound.values())
            free = [v for v in slots if v not in bound]

            # ---- evidence-driven binding of free slots ----
            for v in free:
                vfam = fam_by_var.get(v)
                if not vfam:
                    continue
                role_hit, unit_hit, attr_hit = [], [], []
                for ment in mentions:
                    if ment.value in consumed:
                        continue
                    sent = sentence_of(text, ment.start)[0]
                    sent_fams = {
                        attribute_family(w)
                        for w in re.findall(r"[a-z]+", sent.lower())
                    } - {None}
                    if ment.role and (eq.eq_id, v) in \
                            self._index.lookup(ment.role):
                        role_hit.append(ment)
                    qfam = (ment.family if ment.family not in
                            ("", "dimensionless", "other") else None)
                    if qfam is not None and dims_compatible(qfam, vfam):
                        unit_hit.append(ment)
                    if vfam in sent_fams:
                        attr_hit.append(ment)
                # most specific evidence wins; require uniqueness
                for evidence in (role_hit, unit_hit, attr_hit):
                    if len(evidence) == 1:
                        bound[v] = evidence[0].value
                        consumed.add(evidence[0].value)
                        break
                    if len(evidence) > 1:
                        # several mentions of the same family: bind in
                        # text order (e.g. 'radius 7 and height 10')
                        free_slots_same_fam = [
                            w for w in free
                            if fam_by_var.get(w) == vfam
                            and w not in bound]
                        if (len(free_slots_same_fam) == len(evidence)
                                and v == free_slots_same_fam[0]):
                            for w, ment in zip(free_slots_same_fam,
                                               evidence):
                                bound[w] = ment.value
                                consumed.add(ment.value)
                        break

            free = [v for v in slots if v not in bound]
            if len(free) != 1:
                continue
            target = free[0]
            if (eq.solvable_vars is not None
                    and target not in eq.solvable_vars):
                continue

            value = self._solve_fast(eq, target, bound)
            if value is None:
                continue
            if target not in ledger and target not in new_values:
                new_values[target] = (value, eq_id)
        return new_values

    def _solve_fast(self, eq, unknown: str, knowns: Dict[str, float]):
        """Symengine solve + residual verify (~2 ms)."""
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
                    res = float(parsed.subs({**subs, Symbol(unknown): cand}))
                    if _math.isfinite(res) and abs(res) < 1e-6 * max(
                            scale, abs(cand)):
                        return cand
                except Exception:
                    continue
        except Exception:
            return None
        return None


# Singleton
_solver: Optional[LedgerSolver] = None


def get_ledger_solver() -> LedgerSolver:
    global _solver
    if _solver is None:
        _solver = LedgerSolver()
    return _solver
