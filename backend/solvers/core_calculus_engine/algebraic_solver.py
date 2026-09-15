"""algebraic_solver.py — Equation root-finding through the FULL cascade.

Completes core_calculus_engine's cascade for ALGEBRAIC EQUATIONS, with a
REAL Giac tier (the engine's old Giac entry was a stub: Backend.GIAC sat
in the enum but no subprocess was ever invoked):

    Tier 1  SymEngine  C++ kernel - fast, float-native, no hang risk
    Tier 2  SymPy      guarded by worker-thread timeout, rational=False
    Tier 3  Giac       Xcas subprocess (C:\\xcas\\giac.exe / PATH / env
                       GIAC_BINARY), `solve(lhs-rhs, var)` - the same
                       CAS that powers HP Prime
    Tier 4  SciPy      numeric bracket scan + brentq - deterministic,
                        cannot hang, always last

Callers pass the equation as strings plus knowns; every tier returns
candidate roots and the backend that produced them. VERIFICATION
(residual/round-trip) stays with the caller via the `verifier` callback.
"""

from __future__ import annotations

import logging
import math
import os
import re
import shutil
import subprocess
import threading
from dataclasses import dataclass, field
from typing import List, Optional

logger = logging.getLogger(__name__)

# --------------------------------------------------------------------------- #
# Backend discovery (done once)
# --------------------------------------------------------------------------- #

_SYMENGINE = None
_SYMENGINE_TRIED = False
_SCIPY_BRENTQ = None
_SCIPY_TRIED = False
_GIAC_BIN: Optional[str] = None
_GIAC_TRIED = False

_GIAC_CANDIDATES = [
    r"C:\xcas\giac.exe",
    r"C:\Program Files (x86)\xcas\giac.exe",
    r"C:\Program Files\xcas\giac.exe",
    "/usr/bin/giac", "/usr/local/bin/giac", "/usr/bin/icas",
]

# symengine's C++ kernel can accumulate memory corruption after many
# subs/solve calls, eventually crashing the process with an access
# violation.  After this many calls we fall through to sympy (pure
# Python, safe) to avoid the crash.
_SYMENGINE_CALL_LIMIT = 80
_symengine_calls = 0


def _get_symengine():
    """(module, solve_fn) - solve lives in the C++ wrapper, not the
    top-level namespace, in symengine 0.14.x."""
    global _SYMENGINE, _SYMENGINE_TRIED
    if not _SYMENGINE_TRIED:
        _SYMENGINE_TRIED = True
        try:
            import symengine
            from symengine.lib.symengine_wrapper import solve as se_solve
            _SYMENGINE = (symengine, se_solve)
        except Exception:
            _SYMENGINE = None
    return _SYMENGINE


def _get_scipy():
    global _SCIPY_BRENTQ, _SCIPY_TRIED
    if not _SCIPY_TRIED:
        _SCIPY_TRIED = True
        try:
            from scipy.optimize import brentq
            _SCIPY_BRENTQ = brentq
        except Exception:
            _SCIPY_BRENTQ = None
    return _SCIPY_BRENTQ


def _get_giac() -> Optional[str]:
    """Locate the giac binary: env GIAC_BINARY, PATH, then known paths."""
    global _GIAC_BIN, _GIAC_TRIED
    if not _GIAC_TRIED:
        _GIAC_TRIED = True
        env = os.environ.get("GIAC_BINARY")
        if env and os.path.isfile(env):
            _GIAC_BIN = env
        else:
            found = shutil.which("giac") or shutil.which("icas")
            if found:
                _GIAC_BIN = found
            else:
                for cand in _GIAC_CANDIDATES:
                    if os.path.isfile(cand):
                        _GIAC_BIN = cand
                        break
        if _GIAC_BIN:
            logger.info("AlgebraicSolver: giac binary at %s", _GIAC_BIN)
        else:
            logger.info("AlgebraicSolver: giac binary not found - "
                        "tier skipped")
    return _GIAC_BIN


# --------------------------------------------------------------------------- #
# Result + thread timeout (Windows has no SIGALRM)
# --------------------------------------------------------------------------- #

@dataclass
class AlgebraicResult:
    solutions: List[float] = field(default_factory=list)
    backend: str = "none"
    timed_out: bool = False
    error: Optional[str] = None

    @property
    def first(self) -> Optional[float]:
        return self.solutions[0] if self.solutions else None


def _run_with_timeout(fn, timeout_s: float):
    """Run fn() in a daemon thread; return (result, timed_out)."""
    box = {}

    def _target():
        try:
            box["result"] = fn()
        except BaseException as exc:  # noqa: BLE001 - isolation boundary
            box["error"] = exc

    th = threading.Thread(target=_target, daemon=True)
    th.start()
    th.join(timeout_s)
    if th.is_alive():
        return None, True
    if "error" in box:
        raise box["error"]
    return box.get("result"), False


# --------------------------------------------------------------------------- #
# Tier implementations (all operate on expression STRINGS)
# --------------------------------------------------------------------------- #

def _tier_symengine(lhs: str, rhs: str, var: str, knowns: dict,
                    timeout_s: float) -> AlgebraicResult:
    """Tier 1: the C++ kernel. Polynomial roots in microseconds.
    Non-polynomial forms (log/exp/trig) raise RuntimeError('Not a
    Polynomial') and fall through to sympy - by design."""
    global _symengine_calls
    _symengine_calls += 1
    if _symengine_calls > _SYMENGINE_CALL_LIMIT:
        return AlgebraicResult(error="symengine call limit reached "
                                     "(memory safety)",
                               backend="symengine")
    bundle = _get_symengine()
    if bundle is None:
        return AlgebraicResult(error="symengine unavailable")
    se, se_solve = bundle

    # Guard: skip symengine for expressions that can crash its C++ kernel.
    # symengine's native code can access-violate on factorials, very
    # large numbers, non-polynomial ops, or extreme knowns values.
    # These crash the entire process (not catchable by try/except).
    _expr_str = f"({lhs}) - ({rhs})"
    if len(_expr_str) > 500:
        return AlgebraicResult(error="expression too long for symengine",
                               backend="symengine")
    # factorial / binomial / gamma crash symengine's C++ kernel
    if re.search(r"\b(factorial|binomial|gamma|C\(|nCr|nPr)\b", _expr_str):
        return AlgebraicResult(error="non-polynomial (combinatorics)",
                               backend="symengine")
    # extreme knowns values can crash symengine subs
    for k, v in knowns.items():
        try:
            fv = float(v)
        except (TypeError, ValueError):
            return AlgebraicResult(error=f"non-numeric known {k}",
                                  backend="symengine")
        if not math.isfinite(fv) or abs(fv) > 1e15:
            return AlgebraicResult(error=f"extreme value {k}={fv}",
                                   backend="symengine")

    try:
        sym = se.Symbol(var)
        expr = se.sympify(f"({lhs}) - ({rhs})")
        for k, v in knowns.items():
            expr = expr.subs(se.Symbol(k), se.Float(repr(float(v))))

        def _solve():
            raw = se_solve(expr, sym)
            # symengine returns a FiniteSet (has .args, not iterable)
            items = list(getattr(raw, "args", None) or [])
            out = []
            for s in items:
                try:
                    out.append(float(s))
                except (TypeError, ValueError):
                    continue
            return out

        sols, timed_out = _run_with_timeout(_solve, timeout_s)
        if timed_out:
            return AlgebraicResult(timed_out=True, backend="symengine")
        return AlgebraicResult(solutions=sols or [], backend="symengine")
    except Exception as exc:
        # 'Not a Polynomial' and friends: clean fall-through to sympy
        return AlgebraicResult(error=str(exc), backend="symengine")


def _tier_sympy(lhs: str, rhs: str, var: str, knowns: dict,
                timeout_s: float) -> AlgebraicResult:
    import sympy

    try:
        sym = sympy.Symbol(var)
        expr = sympy.sympify(f"({lhs}) - ({rhs})")
        for k, v in knowns.items():
            expr = expr.subs(sympy.Symbol(k), sympy.Float(repr(v)))

        def _solve():
            out = []
            for s in sympy.solve(expr, sym, rational=False, check=False)[:8]:
                try:
                    fv = float(s)
                    if not (math.isnan(fv) or math.isinf(fv)):
                        out.append(fv)
                except (TypeError, ValueError):
                    continue
            return out

        sols, timed_out = _run_with_timeout(_solve, timeout_s)
        if timed_out:
            return AlgebraicResult(timed_out=True, backend="sympy")
        return AlgebraicResult(solutions=sols or [], backend="sympy")
    except Exception as exc:
        return AlgebraicResult(error=str(exc), backend="sympy")


def _tier_giac(lhs: str, rhs: str, var: str, knowns: dict,
               timeout_s: float) -> AlgebraicResult:
    """REAL Giac tier: subprocess to the Xcas/giac CAS binary."""
    giac = _get_giac()
    if giac is None:
        return AlgebraicResult(error="giac binary not installed")

    # Substitute knowns textually (values are plain floats)
    expr = f"({lhs}) - ({rhs})"
    for k, v in knowns.items():
        expr = re.sub(rf"\b{re.escape(k)}\b", repr(float(v)), expr)
    command = f"solve({expr},{var})"

    def _call():
        proc = subprocess.run(
            [giac, command], capture_output=True, text=True,
            timeout=max(2.0, timeout_s))
        out = proc.stdout
        m = re.search(r"list\[([^\[\]]*)\]", out)
        if not m:
            # single solution like "3" or symbolic junk
            m2 = re.search(r"^(-?\d+(?:\.\d+)?)\s*$", out.strip(),
                           re.MULTILINE)
            return [float(m2.group(1))] if m2 else []
        parts = [p.strip() for p in m.group(1).split(",") if p.strip()]
        sols = []
        for p in parts:
            try:
                sols.append(float(p))
            except ValueError:
                continue
        return sols

    try:
        sols, timed_out = _run_with_timeout(_call, timeout_s + 2.0)
        if timed_out:
            return AlgebraicResult(timed_out=True, backend="giac")
        return AlgebraicResult(solutions=sols or [], backend="giac")
    except Exception as exc:
        return AlgebraicResult(error=str(exc), backend="giac")


def _tier_scipy(lhs: str, rhs: str, var: str, knowns: dict,
                timeout_s: float, lo: float, hi: float) -> AlgebraicResult:
    brentq = _get_scipy()
    if brentq is None:
        return AlgebraicResult(error="scipy unavailable")
    try:
        import numpy as np
        import sympy

        expr = sympy.sympify(f"({lhs}) - ({rhs})")
        arg_names = list(knowns.keys()) + [var]
        f = sympy.lambdify(arg_names, expr, "math")
        vals_only = [float(v) for v in knowns.values()]

        def residual(x):
            return f(*vals_only, x)

        def _solve():
            xs = np.linspace(lo, hi, 400)
            try:
                fv = np.array([residual(float(x)) for x in xs], dtype=float)
            except (ValueError, ZeroDivisionError, OverflowError):
                return []
            roots: List[float] = []
            for i in range(len(xs) - 1):
                v1, v2 = fv[i], fv[i + 1]
                if not (math.isfinite(v1) and math.isfinite(v2)):
                    continue
                if v1 == 0.0:
                    roots.append(float(xs[i]))
                elif v1 * v2 < 0:
                    try:
                        roots.append(float(brentq(
                            residual, float(xs[i]), float(xs[i + 1]),
                            maxiter=200)))
                    except Exception:
                        continue
                if len(roots) >= 4:
                    break
            return roots

        sols, timed_out = _run_with_timeout(_solve, timeout_s)
        if timed_out:
            return AlgebraicResult(timed_out=True, backend="scipy")
        return AlgebraicResult(solutions=sols or [], backend="scipy")
    except Exception as exc:
        return AlgebraicResult(error=str(exc), backend="scipy")


# --------------------------------------------------------------------------- #
# Public cascade
# --------------------------------------------------------------------------- #

def solve_for(lhs: str, rhs: str, var: str, knowns: Optional[dict] = None,
              verifier=None, timeout_s: float = 4.0,
              scan_lo: float = -1e6, scan_hi: float = 1e6) -> AlgebraicResult:
    """Verified roots of (lhs - rhs) for `var`, cascade order:
    symengine -> sympy -> giac -> scipy.

    verifier: callable(root)->bool; first passing root wins. Without one,
    the first finite root is returned.
    """
    knowns = dict(knowns or {})
    attempts: List[str] = []

    tiers = (
        (_tier_symengine, timeout_s),
        (_tier_sympy, timeout_s),
        (_tier_giac, timeout_s),
    )
    for tier_fn, t in tiers:
        r = tier_fn(lhs, rhs, var, knowns, t)
        if r.solutions:
            for cand in r.solutions:
                if verifier is None or math.isfinite(cand) and verifier(cand):
                    return r
            attempts.append(f"{r.backend}:{len(r.solutions)}unverified")
        elif r.timed_out:
            attempts.append(f"{r.backend}:TIMEOUT")
        else:
            attempts.append(r.error or r.backend)

    # Numeric tier needs every OTHER symbol substituted away
    r = _tier_scipy(lhs, rhs, var, knowns, timeout_s, scan_lo, scan_hi)
    if r.solutions:
        for cand in r.solutions:
            if verifier is None or verifier(cand):
                return r
        attempts.append(f"scipy:{len(r.solutions)}unverified")
    else:
        attempts.append(f"scipy:{r.error or 'timeout' if r.timed_out else 'no bracket'}")

    return AlgebraicResult(error="no verified root ("
                           + ", ".join(attempts) + ")")


def solve_equation(equation: str, variable: str,
                   knowns: Optional[dict] = None, **_) -> AlgebraicResult:
    """Cascade entry point: equation like 'v**2 = u**2 + 2*a*s'.

    Registered into CalculusEngine as the solve_equation operation so the
    whole ITS stack reaches root-finding through one door.
    """
    lhs, _, rhs = equation.partition("=")
    return solve_for(lhs.strip(), rhs.strip() if rhs.strip() else "0",
                     variable, knowns)


def register_with_engine(engine) -> None:
    """Attach solve_equation to a CalculusEngine instance."""
    engine.solve_equation = solve_equation
    op_map = getattr(engine, "_op_map", None)
    if isinstance(op_map, dict):
        op_map["solve_equation"] = engine.solve_equation
