"""graph_loader.py — Loads the 5,520-formula YAML library INTO the equation graph.

The hand-built EquationGraph (51 equations) is the seed; the real library
lives in formula_graph/graph.json (built from 6,062 YAML formula files).
This module converts those formulas into solvable PhysicsEquation nodes:

    latex "(1 - q)^2 \\cdot N"  ->  sympy-able "(1 - q)**2 * N"

Formulas whose expressions cannot be parsed stay available for retrieval
(concept search, symbol disambiguation, prerequisite chains) but are not
used for algebraic solving - we never guess.

Usage::

    from backend.its.solver.graph_loader import get_expanded_graph
    g = get_expanded_graph()          # EquationGraph with 5,000+ equations
    g.find_solve_path({"m": 2, "g": 9.8}, "W")
"""

from __future__ import annotations

import functools
import json
import logging
import os
import re
import threading
from typing import Dict, List, Optional, Set

logger = logging.getLogger(__name__)

_lock = threading.Lock()

_GRAPH_JSON = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "formula_graph", "graph.json")


# --------------------------------------------------------------------------- #
# LaTeX -> python/sympy expression sanitizer
# --------------------------------------------------------------------------- #

_GREEK = {
    "alpha": "alpha", "beta": "beta", "gamma": "gamma", "delta": "delta",
    "epsilon": "epsilon", "zeta": "zeta", "eta": "eta", "theta": "theta",
    "iota": "iota", "kappa": "kappa", "lambda": "lam", "mu": "mu",
    "nu": "nu", "xi": "xi", "rho": "rho", "sigma": "sigma", "tau": "tau",
    "phi": "phi", "chi": "chi", "psi": "psi", "omega": "omega",
    "pi": "pi",
}

_FUNC_MAP = {
    "sin": "sin", "cos": "cos", "tan": "tan", "log": "log", "ln": "log",
    "exp": "exp", "sqrt": "sqrt", "arcsin": "asin", "arccos": "acos",
    "arctan": "atan", "sinh": "sinh", "cosh": "cosh", "tanh": "tanh",
}


_UNICODE_MAP = {
    # Greek letters (literal) -> sympy-safe names
    "α": "alpha", "β": "beta", "γ": "gamma", "δ": "delta", "ε": "epsilon",
    "ζ": "zeta", "η": "eta", "θ": "theta", "ι": "iota", "κ": "kappa",
    "λ": "lmbda", "μ": "mu", "ν": "nu", "ξ": "xi", "π": "pi", "ρ": "rho",
    "σ": "sigma", "τ": "tau", "υ": "upsilon", "φ": "phi", "ϕ": "phi",
    "χ": "chi", "ψ": "psi", "ω": "omega", "Δ": "Delta", "Σ": "Sigma",
    "Ω": "Omega", "Γ": "Gamma", "Φ": "Phi", "Ψ": "Psi", "Θ": "Theta",
    "Λ": "Lmbda", "Π": "Pi",
    # Operators
    "×": "*", "·": "*", "⋅": "*", "÷": "/", "−": "-", "–": "-",
    "⁄": "/", "≤": "<=", "≥": ">=", "≠": "!=", "≈": "~",
    # Superscript digits
    "⁰": "**0", "¹": "**1", "²": "**2", "³": "**3", "⁴": "**4",
    "⁵": "**5", "⁶": "**6", "⁷": "**7", "⁸": "**8", "⁹": "**9",
}

# Formulas that are chemical reactions / qualitative notes, never algebra
_NON_ALGEBRA_MARKERS = ("->", "→", "⇌", " ⇒ ", "predominant", "yellow",
                        "lilac", "colour", "color", "smell", "flame")


def latex_to_python(latex: str) -> Optional[str]:
    """Best-effort LaTeX/Unicode -> sympy-parseable python. None when hopeless."""
    if not latex:
        return None
    s = latex.strip()
    if len(s) > 200:
        return None

    # Chemical reactions & qualitative notes are knowledge, not computation
    low = s.lower()
    if any(m in s or m in low for m in _NON_ALGEBRA_MARKERS):
        return None

    # Unicode normalization (Greek, operators, superscripts)
    for uni, ascii_form in _UNICODE_MAP.items():
        s = s.replace(uni, ascii_form)
    # sqrt radicals: √(x), √x, √[n](x)
    s = re.sub(r"√\s*\[([^\]]*)\]\s*\(([^()]*)\)", r"((\2)**(1/(\1)))", s)
    s = re.sub(r"√\s*\[([^\]]*)\]\s*([A-Za-z0-9_]+)", r"((\2)**(1/(\1)))", s)
    s = re.sub(r"√\s*\(([^()]*)\)", r"sqrt(\1)", s)
    s = re.sub(r"√\s*\{([^{}]*)\}", r"sqrt(\1)", s)
    s = re.sub(r"√\s*([A-Za-z0-9_]+)", r"sqrt(\1)", s)
    # degree sign and trailing annotation units
    s = s.replace("°", "").replace("∘", "")
    s = re.sub(r"\bBM\b", "", s)  # Bohr magneton annotation

    # Strip modes and wrappers
    s = s.replace("$", "").replace(r"\displaystyle", "")
    s = s.replace(r"\left", "").replace(r"\right", "")
    s = s.replace(r"\,", " ").replace(r"\;", " ").replace(r"\!", "")
    s = s.replace(r"\cdot", "*").replace(r"\times", "*").replace(r"\div", "/")
    s = s.replace(r"\,", " ")

    # \frac{a}{b} -> ((a)/(b))  (repeat for nested)
    for _ in range(6):
        m = re.search(r"\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}", s)
        if not m:
            break
        s = s[:m.start()] + f"(({m.group(1)})/({m.group(2)}))" + s[m.end():]
    s = re.sub(r"\\d?frac", "", s)  # unresolved fracs -> drop formula

    # \sqrt{a} -> sqrt(a)
    s = re.sub(r"\\sqrt\s*\{([^{}]*)\}", r"sqrt(\1)", s)
    # \sqrt[N]{a} -> ((a)**(1/N))
    s = re.sub(r"\\sqrt\s*\[([^\]]*)\]\s*\{([^{}]*)\}", r"((\2)**(1/(\1)))", s)

    # ^ -> ** (but keep digits in names like x2 intact - we convert after ^)
    s = s.replace("^", "**")

    # Functions with backslash: \sin -> sin
    for name in _FUNC_MAP:
        s = re.sub(r"\\" + name + r"\b", _FUNC_MAP[name], s)

    # Greek letters: \theta -> theta (avoid clash with sympy 'lambda')
    for g in _GREEK:
        s = re.sub(r"\\" + g + r"\b", _GREEK[g], s)

    # Remaining backslash commands -> fail (we don't understand them)
    if "\\" in s:
        return None
    # Text remnants, subscripts handled by sympify if valid identifiers
    if re.search(r"[;=?@#]|\\|\{|\}", s):
        return None
    # Absolute bars |x| are ambiguous -> fail
    if "|" in s:
        return None
    return s


def _extract_lhs_rhs(expr: str) -> tuple[Optional[str], str]:
    """Split 'lhs = rhs' into (lhs, rhs); 'expr' -> (None, expr)."""
    parts = expr.split("=", 1)
    if len(parts) == 2:
        return parts[0].strip(), parts[1].strip()
    return None, expr.strip()


# --------------------------------------------------------------------------- #
# Loading
# --------------------------------------------------------------------------- #

_GREEK_NAMES = {"alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta",
                "theta", "iota", "kappa", "lmbda", "mu", "nu", "xi", "pi",
                "rho", "sigma", "tau", "upsilon", "phi", "chi", "psi",
                "omega", "Delta", "Sigma", "Omega", "Gamma", "Phi", "Psi",
                "Theta", "Lmbda", "Pi"}
_VAR_RE = re.compile(r"^[A-Za-z]{1,4}(_[A-Za-z0-9]{1,10})?$")


def _is_plausible_var(name: str) -> bool:
    """Physics/math variables: x, v_max, KE, sin_theta, theta... not
    English words like 'maximum', 'body', 'lungs'."""
    return name in _GREEK_NAMES or bool(_VAR_RE.match(name))


def _mk_equations_from_graph(max_formulas: int = 100000):
    """Yield PhysicsEquation objects for every parseable formula in graph.json."""
    import sympy
    from backend.its.solver.equation_graph import PhysicsEquation

    if not os.path.exists(_GRAPH_JSON):
        logger.warning("graph.json not found at %s - library not loaded",
                       _GRAPH_JSON)
        return

    with open(_GRAPH_JSON, encoding="utf-8") as fh:
        g = json.load(fh)

    seen_names: Set[str] = set()
    added = skipped_parse = skipped_vars = 0

    for f in g.get("formulas", []):
        if added >= max_formulas:
            break
        fid = f.get("formula_id") or f.get("name")
        name = f.get("name") or fid
        if not fid or name in seen_names:
            continue
        seen_names.add(name)

        py = latex_to_python(f.get("latex", ""))
        if not py:
            skipped_parse += 1
            continue
        lhs, rhs = _extract_lhs_rhs(py)

        # Discover variables via sympy free symbols (the truth, not YAML)
        try:
            probe = sympy.sympify(f"({lhs}) - ({rhs})" if lhs else f"({rhs})")
            free = {str(x) for x in probe.free_symbols}
        except Exception:
            skipped_parse += 1
            continue

        # Skip degenerate: nothing to solve, or absurd variable counts
        if not free or len(free) > 8:
            skipped_vars += 1
            continue
        if not all(_is_plausible_var(v) for v in free):
            skipped_vars += 1
            continue

        classes = [int(c) for c in (f.get("class_levels") or [])
                   if isinstance(c, (int, float)) and 1 <= c <= 14]

        yield PhysicsEquation(
            eq_id=f"lib_{fid}",
            expression=(f"{lhs} = {rhs}" if lhs else rhs),
            subject=f.get("domain") or "general",
            variables=sorted(free),
            description=name.replace("_", " ")[:80],
            class_levels=classes or [10, 11, 12],
        )
        added += 1

    logger.info("graph_loader: +%d equations (%d unparseable skipped, "
                "%d degenerate skipped)", added, skipped_parse, skipped_vars)


@functools.lru_cache(maxsize=1)
def get_expanded_graph():
    """EquationGraph = 51 seed equations + every parseable library formula.

    RETRIEVAL-ORIENTED: the YAML library contains qualitative facts, so
    formulas here are NOT round-trip validated. The SOLVER graph is
    build_canonical_graph() below - hand-written, verified equations.
    """
    from backend.its.solver.equation_graph import EquationGraph

    with _lock:
        g = EquationGraph()
        n0 = g.get_equation_count()
        for eq in _mk_equations_from_graph():
            # Seed equations win on id conflicts (lib_ prefix prevents them)
            g.add_equation(eq)
        logger.info("Expanded retrieval graph: %d -> %d equations",
                    n0, g.get_equation_count())
        return g


# --------------------------------------------------------------------------- #
# Canonical (hand-written) graph with round-trip validation - THE SOLVER
# --------------------------------------------------------------------------- #

# Deterministic probe-value SETS used to validate solvability. Multiple
# sets per check: set A avoids zero/one, set B keeps sqrt/log arguments
# positive and fractions sane, set C uses primes. An equation is
# validated for a variable if ANY set yields a verified root.
_PROBE_SETS = [
    [2.5, 3.5, 5.5, 7.5, 11.5, 13.5, 17.5, 19.5],
    [0.6, 0.8, 1.5, 2.0, 3.0, 4.0, 6.0, 9.0],
    [5.0, 7.0, 11.0, 17.0, 23.0, 29.0, 37.0, 43.0],
    [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.2],   # unit interval: trig/sqrt-safe
    [9.0, 6.0, 4.0, 3.0, 2.5, 2.0, 1.5, 1.2],   # descending: inequality-safe
]


def _round_trip_validate(eq) -> List[str]:
    """Return the list of variables the equation truly solves for.

    Validation proves a root EXISTS for probe values - numeric is
    sufficient. So the validator uses ONLY the two bounded tiers:
      1. symengine (microseconds, polynomials - the common case)
      2. scipy numeric bracket scan (~tens of ms, everything else)
    The full cascade (sympy symbolic, giac) is for runtime solving,
    not for build-time validation. This keeps the graph build in
    seconds instead of minutes.
    """
    import math as _math

    from backend.solvers.core_calculus_engine.algebraic_solver import (
        _tier_scipy, _tier_symengine)

    parsed = eq._parsed
    if parsed is None or (isinstance(parsed, str) and parsed == "BAD"):
        return []

    solvable: List[str] = []
    for i, target in enumerate(eq.variables):
        validated = False
        for probe_set in _PROBE_SETS:
            if validated:
                break
            subs = {}
            for j, other in enumerate(eq.variables):
                if other == target:
                    continue
                subs[other] = probe_set[(i + j * 3) % len(probe_set)]
            scale = max([1.0] + [abs(v) for v in subs.values()])

        def _verifier(cand: float, _subs=subs, _target=target,
                      _scale=scale, _parsed=parsed) -> bool:
            try:
                if not _math.isfinite(cand):
                    return False
                import sympy
                subs_syms = {sympy.Symbol(k): v for k, v in _subs.items()}
                res = float(_parsed.subs({**subs_syms,
                                          sympy.Symbol(_target): cand}))
                return (_math.isfinite(res)
                        and abs(res) < 1e-6 * max(_scale, abs(cand)))
            except Exception:
                return False

        try:
            lhs, _, rhs = eq.expression.partition("=")
            # Tier 1: symengine (fast path)
            r = _tier_symengine(lhs.strip(),
                                rhs.strip() if rhs.strip() else "0",
                                target, subs, 1.0)
            if any(_verifier(c) for c in r.solutions):
                solvable.append(target)
                validated = True
                continue
            # Tier 2: bounded numeric scan around the probe-value scale
            hi = max(1e4, max(abs(v) for v in subs.values()) * 100)
            r = _tier_scipy(lhs.strip(),
                            rhs.strip() if rhs.strip() else "0",
                            target, subs, 1.0, -hi, hi)
            if any(_verifier(c) for c in r.solutions):
                solvable.append(target)
                validated = True
        except Exception:
            continue
    return solvable


@functools.lru_cache(maxsize=1)
def build_canonical_graph(include_seed: bool = True):
    """The SOLVER graph: seed equations + hand-written canonical library.

    Every canonical equation is parsed and round-trip validated; only
    variables that pass validation are registered as solvable targets.
    Returns (graph, report_dict).
    """
    from backend.its.solver.canonical_equations import EQUATIONS
    from backend.its.solver.equation_graph import (EquationGraph,
                                                   PhysicsEquation)
    import sympy

    with _lock:
        g = EquationGraph() if include_seed else EquationGraph.__new__(
            EquationGraph)
        if not include_seed:
            g.equations, g._var_index = {}, {}

        report = {"canonical": 0, "parse_fail": [], "unvalidated": [],
                  "solvable_vars": 0}
        for eq_id, expr, subject, desc, classes in EQUATIONS:
            eq = PhysicsEquation(
                eq_id=eq_id, expression=expr, subject=subject,
                variables=[], description=desc, class_levels=classes,
            )
            parsed = g._parsed_expr(eq)
            if parsed is None:
                report["parse_fail"].append(eq_id)
                continue
            try:
                free = sorted(str(s) for s in sympy.sympify(parsed).free_symbols)
            except Exception:
                report["parse_fail"].append(eq_id)
                continue
            eq.variables = free
            solvable = _round_trip_validate(eq)
            if not solvable:
                report["unvalidated"].append(eq_id)
                continue
            eq.solvable_vars = solvable
            report["solvable_vars"] += len(solvable)
            g.add_equation(eq)
            report["canonical"] += 1

        logger.info("Canonical solver graph: %d equations, "
                    "%d parse failures, %d unvalidated",
                    g.get_equation_count(), len(report["parse_fail"]),
                    len(report["unvalidated"]))
        return g, report
