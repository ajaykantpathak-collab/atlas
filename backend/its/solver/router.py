"""router.py — The facade that routes raw student text through the solver chain.

This is the single entry point the ant stress test proved missing. Pipeline:

    raw text
      -> 1. modeling layer       (canonical structures: growing domain, ...)
      -> 2. equation graph       (algebraic physics: parse knowns, BFS path)
      -> 3. template library     (PythonLoopSolver on matched template)
      -> 4. calculus bridge      (direct CAS when the equation is given)
      -> refusal                 (structured "cannot solve + why" - NEVER an LLM)

Each stage returns a SolverRouteResult; the first stage that produces a
VERIFIED answer wins. Everything is deterministic and auditable.
"""

from __future__ import annotations

import logging
import re
import time
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)


@dataclass
class SolverRouteResult:
    """Uniform result regardless of which stage solved the problem."""
    text: str
    solved: bool
    stage: str                          # "modeling" | "equation_graph" | ...
    answer: Optional[str] = None
    numeric: Optional[float] = None
    steps: List[str] = field(default_factory=list)
    stage_results: List[Dict[str, Any]] = field(default_factory=list)
    elapsed_ms: float = 0.0
    refusal_reason: str = ""
    verified: bool = False              # shown-answer gate: only True
    # stages whose answers are cascade/anchor-verified may set this
    mode: str = "answer"                # "answer" | "guided_practice"

    def summary(self) -> str:
        if self.solved:
            return f"[{self.stage}] {self.answer}"
        return (f"Cannot solve deterministically. {self.refusal_reason} "
                f"(tried: {', '.join(r['stage'] for r in self.stage_results)})")


def solve_text(text: str) -> SolverRouteResult:
    """Route raw problem text through the deterministic solver chain."""
    import os
    import time as _time
    _t0 = _time.perf_counter()
    # production serves one question in <= 5s; tests and offline tools
    # (model warm-up, loaded machines) raise it via the env override --
    # a skipped stage never ships a WRONG answer, only an honest guided
    _TIME_BUDGET = float(os.environ.get("ROUTER_TIME_BUDGET", "5.0"))
    t0 = time.perf_counter()
    result = SolverRouteResult(text=text, solved=False, stage="none")
    stages: List[Dict[str, Any]] = []

    def _budget_ok(stage: str) -> bool:
        """Global perf gate: checked BEFORE entering each stage, never
        mid-stage.  Over-budget stages are skipped (recorded) so the
        worst case falls through to refusal quickly."""
        if _time.perf_counter() - _t0 <= _TIME_BUDGET:
            return True
        stages.append({"stage": stage, "skipped": "time_budget"})
        return False

    # ---- Stage 0: math language kernel (formal math in the text) ----
    if not result.solved:
        try:
            from backend.its.solver.math_kernel import (SymbolicAnswer,
                                                        solve_math)

            mk = None
            # RED-TEAM GATES (2026-09-12 wave): kernel arithmetic must
            # never be promoted as the answer to a method-only ask.
            # (a) "Verify a - (-b) = a + b for a = 21, b = 18" solved the
            #     identity as an equation and shipped "b = 0";
            # (b) "Who covers less distance?" was answered with
            #     "area = 60 * 45 = 2700".  Both are honest-guided asks.
            _verify_ask = bool(re.search(
                r"\b(verify|prove|show\s+that)\b", text, re.I))
            _who_ask = bool(re.search(r"\bwho\b[^.?!]*\?", text, re.I))
            if _verify_ask or _who_ask:
                stages.append({"stage": "math_kernel",
                               "gated": ("verify/prove ask" if _verify_ask
                                         else "who-comparison ask")})
            else:
                mk = solve_math(text)
            stages.append({"stage": "math_kernel", "fired": mk is not None})
            if mk is not None:
                value, steps = mk
                result.solved = True
                result.stage = "math_kernel"
                result.verified = True
                if isinstance(value, SymbolicAnswer):
                    # symbolic answer channel: the ask was an
                    # EXPRESSION (derivative / indefinite integral);
                    # ship the exact CAS string, numeric stays None.
                    # answer_pipeline lane A copies answer verbatim,
                    # so no pipeline change is needed.
                    result.answer = value.expr
                    result.numeric = None
                else:
                    result.numeric = value
                    result.answer = f"{value:.6g}"
                result.steps = steps
        except Exception as exc:
            logger.warning("math_kernel stage failed: %s", exc)
            stages.append({"stage": "math_kernel", "error": str(exc)})

    # ---- Stage 0b: form transfer (recycled board questions) ----
    # recursion guard: form_transfer sets the flag False while its
    # anchor/transfer solves call back into solve_text; absent-or-True
    # means we are a normal outer call and may run.
    if (not result.solved and globals().get("_FORM_TRANSFER_ACTIVE", True)
            and _budget_ok("form_transfer")):
        try:
            from backend.its.solver.form_transfer import solve_by_form

            ft = solve_by_form(text)
            stages.append({"stage": "form_transfer",
                           "fired": ft is not None})
            if ft is not None:
                result.solved = True
                result.stage = "form_transfer"
                anchor_ok = bool(ft.get("knowns", {}).get("anchor_solved"))
                result.verified = bool(anchor_ok)
                result.mode = ("answer" if anchor_ok
                               else "guided_practice")
                result.numeric = ft["value"]
                result.answer = f"{ft['value']:.6g}"
                result.steps = ft["steps"]
        except Exception as exc:
            logger.warning("form_transfer stage failed: %s", exc)
            stages.append({"stage": "form_transfer", "error": str(exc)})

    # ---- Stage 1: canonical structure models (the ant family, etc.) ----
    # guard: the kernel's verified stage-0 answer wins -- the module
    # contract is "the FIRST stage that produces a VERIFIED answer
    # wins"; stage 1 was overriding it (e.g. shipping "2 - 5 = -3"
    # for 'Solve 3x^2 - 5x - 2 = 0' after the kernel solved it).
    if (not result.solved and _budget_ok("modeling")):
        try:
            # independent second-path verification at this boundary too:
            # a FAILed check downgrades the family result (matched=False)
            # so stage 1 never promotes it -- fail-closed.
            from backend.its.solver.independent_verifier import \
                verified_model_problem
            m = verified_model_problem(text)
            stages.append({"stage": "modeling", "matched": m.matched,
                           "confidence": m.confidence, "note": m.note})
            if m.matched and m.confidence >= 0.6:
                result.solved = True
                result.stage = "modeling"
                # deterministic triggers + symbolic closed form: qualifies
                # as verified under the constitution (no LLM involved)
                result.verified = True
                result.mode = "answer"
                result.answer = m.final_answer
                result.numeric = m.numeric_answer
                result.steps = m.steps
        except Exception as exc:
            logger.warning("modeling stage failed: %s", exc)
            stages.append({"stage": "modeling", "error": str(exc)})

    # ---- Stage 2: deterministic role-index intersection ----
    if not result.solved and _budget_ok("intersection"):
        try:
            from backend.its.solver.quantity_parser import parse_quantities
            from backend.its.solver.role_index import solve_by_intersection

            quantities = parse_quantities(text)
            inter = solve_by_intersection(text, quantities)
            stages.append({"stage": "intersection",
                           "quantities": len(quantities),
                           "solved": inter is not None})
            if inter is not None:
                result.solved = True
                result.stage = "intersection"
                result.verified = False
                result.mode = "guided_practice"
                result.numeric = inter["value"]
                result.answer = f"{inter['target']} = {inter['value']:.6g}"
                result.steps = inter["steps"]
        except Exception as exc:
            logger.warning("intersection stage failed: %s", exc)
            stages.append({"stage": "intersection", "error": str(exc)})

    # ---- Stage 3: constraint generate-and-test (statistical fallback) ----
    if not result.solved and _budget_ok("constraint"):
        try:
            from backend.its.solver.constraint_solver import (
                get_constraint_solver)
            from backend.its.solver.quantity_parser import (parse_quantities,
                                                            split_intent)
            from backend.its.solver.variable_registry import embed_texts

            quantities = parse_quantities(text)
            _given, intent = split_intent(text)
            cand = None
            # competency damping: long case studies demand strong evidence
            is_case_study = len(text) > 400 or bool(re.search(
                r"case\s*study|read\s+the\s+following", text, re.I))
            score_floor = 0.95 if is_case_study else 0.75
            if quantities and embed_texts(["probe"]) is not None:
                cand = get_constraint_solver().solve(text, quantities, intent,
                                                  time_budget_s=1.5)
                if cand is not None and cand.get("score", 0) < score_floor:
                    cand = None
            stages.append({"stage": "constraint", "quantities":
                           len(quantities),
                           "case_study": is_case_study,
                           "solved": cand is not None})
            if cand is not None:
                result.solved = True
                result.stage = "constraint"
                result.verified = False
                result.mode = "guided_practice"
                result.numeric = cand["value"]
                result.answer = (f"{cand['target']} = "
                                 f"{cand['value']:.6g}")
                result.steps = cand["steps"]
        except Exception as exc:
            logger.warning("constraint stage failed: %s", exc)
            stages.append({"stage": "constraint", "error": str(exc)})

    # ---- Stage 3: semantic binding -> canonical equation graph ----
    is_case_study = len(text) > 400 or bool(re.search(
        r"case\s*study|read\s+the\s+following", text, re.I))
    if (not result.solved and not is_case_study
            and _budget_ok("binding")):
        try:
            bound = _bind_and_solve(text)
            stages.append({"stage": "binding", **{k: v for k, v in
                           bound.items() if k != "result"},
                           "solved": bound["result"] is not None})
            r = bound["result"]
            if r is not None and r.solved:
                result = r
        except Exception as exc:
            logger.warning("binding stage failed: %s", exc)
            stages.append({"stage": "binding", "error": str(exc)})

    # ---- Stage 3b: scenario archetype (competency narratives) ----
    if not result.solved and is_case_study and _budget_ok("scenario"):
        try:
            from backend.its.solver.scenario_compiler import find_archetype

            arch = find_archetype(text)
            stages.append({"stage": "scenario", "fired": arch is not None})
            if arch is not None:
                # execute the archetype's chain on this narrative's numbers
                chain_val = None
                if arch.get("chain"):
                    from backend.its.solver.math_kernel import solve_math
                    for step_line in arch["chain"].split("\n"):
                        if "=" in step_line and re.search(r"\d", step_line):
                            mk = solve_math(step_line)
                            # floats only: a chain line is arithmetic,
                            # never an expression ask (SymbolicAnswer
                            # would carry no computable scalar)
                            if mk is not None and isinstance(mk[0], float):
                                chain_val = mk[0]
                if chain_val is not None:
                    result.solved = True
                    result.stage = "scenario"
                    result.verified = True
                    result.numeric = chain_val
                    result.answer = f"{chain_val:.6g}"
                    result.steps = [
                        f"archetype {arch['sig_key']} "
                        f"(score {arch['score']:.2f}, "
                        f"{arch['n_instances']} instances)",
                        f"official chain: "
                        f"{(arch['chain'] or '')[:200]}",
                    ]
                else:
                    stages.append({"stage": "scenario",
                                   "note": "archetype matched but chain "
                                           "not executable yet"})
        except Exception as exc:
            logger.warning("scenario stage failed: %s", exc)
            stages.append({"stage": "scenario", "error": str(exc)})

    # ---- Stage 4: raw BFS with conservative regex extraction ----
    if not result.solved and _budget_ok("equation_graph"):
        try:
            from backend.its.solver.graph_loader import build_canonical_graph
            g, _report = build_canonical_graph()
            knowns, target = _parse_for_graph(text)
            if knowns and target:
                path = g.find_solve_path(knowns, target)
                stages.append({"stage": "equation_graph",
                               "knowns": knowns, "target": target,
                               "matched": path is not None})
                if path is not None:
                    # plausibility gate on BFS results
                    from backend.its.solver.variable_registry import (
                        describe as _vd, plausible as _vp)
                    _dsc, _fam = _vd(target)
                    if not _vp(target, _fam, path.final_value or 0.0):
                        path = None
                if path is not None:
                    result.solved = True
                    result.stage = "equation_graph"
                    result.verified = False
                    result.mode = "guided_practice"
                    result.numeric = path.final_value
                    result.answer = f"{target} = {path.final_value:.6g}"
                    result.steps = [
                        f"step {s['step']}: {s['equation']}  ->  "
                        f"{s['solved_for']} = {s['value']:.6g}"
                        for s in path.steps
                    ]
            else:
                stages.append({"stage": "equation_graph",
                               "note": "could not map text to graph variables"})
        except Exception as exc:
            logger.warning("equation_graph stage failed: %s", exc)
            stages.append({"stage": "equation_graph", "error": str(exc)})

    if not result.solved:
        result.refusal_reason = (
            "No canonical structure matched and no algebraic path exists "
            "from extracted knowns to a target. The modeling layer needs a "
            "new structure rule for this family.")
    result.stage_results = stages
    result.elapsed_ms = (time.perf_counter() - t0) * 1000.0
    return result


# --------------------------------------------------------------------------- #
# Semantic binding: quantities -> equation slots, question -> target
# --------------------------------------------------------------------------- #

_UNIT_ALIASES = {
    # family -> words in the problem that imply that family (used to
    # upgrade bare numbers; NOT a matching vocab for solutions)
    "current": ("current", "ampere"),
    "resistance": ("resistance", "resistor", "ohm"),
    "voltage": ("voltage", "potential difference", "volt"),
    "power": ("power", "watt", "dissipat"),
    "energy": ("energy", "joule", "work"),
    "force": ("force", "newton", "thrust"),
    "mass": ("mass", "weighs", "weight of", "kg"),
    "velocity": ("velocity", "speed", "moves at", "moving at", "travels"),
    "acceleration": ("acceleration", "retardation", "deceleration"),
    "length": ("length", "distance", "radius", "height", "wavelength",
               "long", "far"),
    "time": ("time", "period", "duration", "seconds", "years", "half life"),
    "temperature": ("temperature", "kelvin"),
    "tempdiff": ("temperature difference", "raise the temperature",
                 "by 10 degrees", "increase in temperature"),
    "amount": ("moles", "mole"),
    "volume": ("volume", "litres", "liters"),
    "molarity": ("molarity", "concentration", "molar"),
    "molarmass": ("molar mass", "molecular mass"),
    "percentage": ("percent", "%"),
    "money": ("principal", "cost", "price", "rupees", "interest"),
    "dimensionless": ("number", "count", "terms", "moles are"),
}


def _cos(a, b) -> float:
    import numpy as np

    d = float(np.linalg.norm(a) * np.linalg.norm(b))
    return float(np.dot(a, b) / d) if d else 0.0


def _normalize_symbol_token(tok: str) -> str:
    """'b_' -> 'b', 'T_period' -> 'T_period' (for the echo rule)."""
    return tok.strip().rstrip("_").lower()


def _echo_target(intent: str, bindable: list) -> Optional[str]:
    """'Find b.' / 'find the value of si' / 'what is T_period?' -
    when the question names the symbol directly, bind by echo."""
    import re

    m = re.search(
        r"(?:find|calculate|compute|determine|what\s+is|value\s+of)\s+"
        r"(?:the\s+)?(?:value\s+of\s+)?([A-Za-z][A-Za-z0-9_]*)\s*[?.]?\s*$",
        intent.strip(), re.IGNORECASE)
    if not m:
        return None
    tok = _normalize_symbol_token(m.group(1))
    # Single letters may name any symbol starting with that letter
    for var in bindable:
        if _normalize_symbol_token(var) == tok:
            return var
    if len(tok) == 1:
        for var in bindable:
            if _normalize_symbol_token(var).startswith(tok):
                return var
    return None


# Structural grammar rules moved to quantity_parser (shared with the
# constraint solver) - re-exported here for the binder stage.
from backend.its.solver.quantity_parser import (STRUCTURAL_HINTS as  # noqa: E402,F401
                                                _STRUCTURAL_HINTS)


def _structural_bindings(text: str, bindable: list) -> dict:
    from backend.its.solver.quantity_parser import structural_bindings

    return structural_bindings(text, bindable)


def _bind_and_solve(text: str) -> dict:
    """The root text->solver path (replaces vocab/alias matching):

    1. quantulum3 extracts quantities with units + context spans
       (from the FULL text - problems often lead with 'Find ...')
    2. symbol echo: 'Find b.' names the target variable directly
    3. structural grammar rules bind part/whole constructions
    4. otherwise: MiniLM ranks equations by description similarity;
       the INTENT picks the target variable first (intent-first
       binding), quantities bind to the remaining slots by unit-family
       agreement + cosine(context, variable description)
    5. BFS solve through the cascade-verified graph
    """
    from backend.its.solver.graph_loader import build_canonical_graph
    from backend.its.solver.quantity_parser import parse_quantities
    from backend.its.solver.quantity_parser import split_intent
    from backend.its.solver.variable_registry import (
        NON_TARGET_SYMBOLS, describe, embed_texts,
        equation_description_vectors)

    g, _rep = build_canonical_graph()
    info = {
        "quantities": 0, "equations_ranked": 0, "bindings": {},
        "target": None, "backend": None,
    }

    _given, intent_part = split_intent(text)
    quantities = parse_quantities(text)  # FULL text, not the given part
    info["quantities"] = len(quantities)
    if not quantities:
        return {"result": None, **info}

    qvecs = embed_texts([q.context for q in quantities])
    if qvecs is None:
        return {"result": None, **info}
    intent_vecs = embed_texts([intent_part])
    if intent_vecs is None:
        return {"result": None, **info}

    # Rank equations: problem meaning vs equation description
    desc_vecs = equation_description_vectors()
    if not desc_vecs:
        return {"result": None, **info}
    import numpy as np

    text_vec = embed_texts([text])[0]
    eq_ids = list(desc_vecs.keys())
    sims = np.array([_cos(text_vec, desc_vecs[e]) for e in eq_ids])
    ranked = [e for e, _ in sorted(zip(eq_ids, sims), key=lambda x: -x[1])]
    info["equations_ranked"] = len(ranked)

    best: SolverRouteResult | None = None
    for eq_id in ranked[:18]:
        eq = g.equations[eq_id]
        bindable = [v for v in eq.variables if v not in NON_TARGET_SYMBOLS]
        if not (2 <= len(bindable) <= 7):
            continue

        # --- 1. symbol echo: 'Find b.' -> b_ ---
        echo = _echo_target(intent_part, bindable)

        # --- 2. structural grammar rules ---
        struct = _structural_bindings(text, bindable)

        # --- 3. intent-first similarity binding ---
        target = None
        assignment: dict = {}
        if echo is not None and not struct:
            target = echo
        else:
            # The intent names the target; bind quantities to the rest
            i_sims = []
            for var in bindable:
                tdesc, _f = describe(var, eq_id)
                tvec = embed_texts([tdesc])[0]
                i_sims.append((_cos(intent_vecs[0], tvec), var))
            i_sims.sort(reverse=True)
            if i_sims and i_sims[0][0] >= 0.30:
                target = i_sims[0][1]
            elif struct:
                target = None
            else:
                continue

        if struct:
            missing = [v for v in struct if v not in bindable]
            if missing:
                continue
            knowns = dict(struct)
            unbound = [v for v in bindable if v not in knowns]
            if len(unbound) == 1:
                target = unbound[0]
            else:
                continue
        else:
            # Greedy binding of quantities to NON-target vars
            others = [v for v in bindable if v != target]
            scores = {}
            for vi, var in enumerate(others):
                desc, fam = describe(var, eq_id)
                var_vec = embed_texts([desc])[0]
                for qi, q in enumerate(quantities):
                    s = _cos(qvecs[qi], var_vec)
                    if q.family != "dimensionless" and q.family == fam:
                        s += 0.35  # unit-family agreement
                    scores[(qi, vi)] = s
            taken: set = set()
            assignment = {}
            for (qi, vi), s in sorted(scores.items(), key=lambda kv: -kv[1]):
                if qi in taken or vi in assignment.values() or s < 0.30:
                    continue
                assignment[others[vi]] = qi
                taken.add(qi)
            knowns = {var: float(quantities[qi].value)
                      for var, qi in assignment.items()}
            if len(knowns) != len(others):
                continue  # every non-target slot must be filled

        info["bindings"], info["target"] = knowns, target

        path = g.find_solve_path(dict(knowns), target)
        if path is not None:
            # plausibility gate before accepting a bound solve
            try:
                from backend.its.solver.variable_registry import (
                    describe as _vd, plausible as _vp)
                _dsc, _fam = _vd(target, eq_id)
                if not _vp(target, _fam, path.final_value or 0.0):
                    path = None
            except Exception:
                pass
        if path is not None:
            best = SolverRouteResult(
                text=text, solved=True, stage="equation_graph",
                answer=f"{target} = {path.final_value:.6g}",
                numeric=path.final_value,
                steps=[f"bound {knowns} -> target '{target}' "
                       f"via {eq_id} ({eq.description})",
                       *[f"step {s['step']}: {s['equation']}  ->  "
                         f"{s['solved_for']} = {s['value']:.6g}"
                         for s in path.steps]],
                )
            info["backend"] = "graph"
            break

    return {"result": best, **info}

_GRAPH_VAR_ALIASES = {
    "u": ("initial velocity", "initial speed", "u"),
    "v": ("final velocity", "final speed"),
    "a": ("acceleration", "deceleration"),
    "t": ("time",),
    "s": ("distance", "displacement"),
    "m": ("mass",),
    "F": ("force",),
    "I": ("current",),
    "V": ("voltage", "potential difference"),
    "R": ("resistance",),
}


def _parse_for_graph(text: str) -> tuple[Dict[str, float], Optional[str]]:
    """Very conservative extraction: only fire on explicit value patterns
    like 'acceleration of 2 m/s^2'. Returns ({}, None) when unsure - the
    router then falls through to refusal rather than guessing."""
    import re

    knowns: Dict[str, float] = {}
    for var, phrases in _GRAPH_VAR_ALIASES.items():
        for ph in phrases:
            m = re.search(
                rf"{re.escape(ph)}\s*(?:of|=|:|is)?\s*(-?\d+(?:\.\d+)?)",
                text, re.IGNORECASE)
            if m:
                knowns[var] = float(m.group(1))
                break
    # target detection: "find the distance", "what is the final velocity"
    target: Optional[str] = None
    for var, phrases in _GRAPH_VAR_ALIASES.items():
        for ph in phrases:
            if re.search(rf"(?:find|calculate|what is|determine)\s+(?:the\s+)?"
                         rf"{re.escape(ph)}", text, re.IGNORECASE):
                target = var
                break
        if target:
            break
    return knowns, target
