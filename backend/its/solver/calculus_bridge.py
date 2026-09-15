"""calculus_bridge.py — Wires the core_calculus_engine into the ITS solver chain.

This is the bridge between the ITS PythonLoopSolver and the
core_calculus_engine. It allows calculus operations (differentiate,
integrate, limit, ODE, etc.) to be used as solver steps within
the Python loop's generated code.

The cascade inside core_calculus_engine is:
    SymEngine (C++ fast) -> SymPy (symbolic) -> Giac (CAS subprocess) -> SciPy (numerical)

Usage in a ProblemTemplate's code_lines:
    Instead of hardcoding "result = sp.diff(expr, x)",
    the template generates code that calls the bridge:
        from backend.its.solver.calculus_bridge import calc
        result = calc("differentiate", expr_str="x**2 + 3*x", variable="x")
"""

from __future__ import annotations

import logging
import os
import sys
from dataclasses import asdict
from typing import Any, Dict, Optional

logger = logging.getLogger(__name__)

_engine = None
_engine_loaded = False


def _get_engine():
    """Lazy-load the calculus engine (heavy import)."""
    global _engine, _engine_loaded
    if _engine_loaded:
        return _engine
    _engine_loaded = True
    try:
        # Add backend dir to path for the solvers package
        backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        if backend_dir not in sys.path:
            sys.path.insert(0, backend_dir)
        from solvers.core_calculus_engine.core_calculus_engine import CalculusEngine
        _engine = CalculusEngine(timeout=10)
        logger.info("Calculus engine loaded (cascade: SymEngine->SymPy->Giac->SciPy)")
    except Exception as exc:
        logger.warning("Calculus engine load failed: %s", exc)
        _engine = None
    return _engine


def calc(operation: str, **kwargs) -> Dict[str, Any]:
    """Unified calculus operation. Returns a dict (never raises).

    Operations: differentiate, integrate, limit, solve_ode, critical_points,
                max_min_check, tangent_line, area_under_curve, etc.

    Returns:
        {"success": bool, "result": ..., "steps": [...], "error": str|None,
         "backend": str, "verification": dict}
    """
    engine = _get_engine()
    if engine is None:
        return {"success": False, "error": "Calculus engine not available"}

    try:
        result = engine.solve(operation, **kwargs)
        return {
            "success": result.success if hasattr(result, "success") else bool(result),
            "result": result.final_answer if hasattr(result, "final_answer") else str(result),
            "steps": [asdict(s) for s in result.steps] if hasattr(result, "steps") else [],
            "error": result.error if hasattr(result, "error") else None,
            "backend": getattr(result, "backend_used", "unknown"),
            "verification": getattr(result, "verification", {}),
            "confidence": getattr(result, "confidence", 0.0),
        }
    except Exception as exc:
        logger.warning("Calculus operation '%s' failed: %s", operation, exc)
        return {"success": False, "error": str(exc), "operation": operation}


def differentiate(expr_str: str, variable: str = "x", order: int = 1) -> Dict[str, Any]:
    """d/dx(expr_str) using the cascade."""
    return calc("differentiate", expr_str=expr_str, variable=variable, order=order)


def integrate(expr_str: str, variable: str = "x",
              lower: Optional[float] = None, upper: Optional[float] = None) -> Dict[str, Any]:
    """Integral of expr_str (definite if lower+upper given)."""
    kwargs: Dict[str, Any] = {"expr_str": expr_str, "variable": variable}
    if lower is not None and upper is not None:
        kwargs["lower_limit"] = lower
        kwargs["upper_limit"] = upper
    return calc("integrate", **kwargs)


def solve_equation(equation: str, variable: str = "x") -> Dict[str, Any]:
    """Solve equation for variable (e.g. 'x**2 - 5*x + 6 = 0')."""
    # Parse the equation into lhs = rhs form
    if "=" in equation:
        lhs, rhs = equation.split("=", 1)
        equation = f"({lhs.strip()}) - ({rhs.strip()})"
    return calc("limit", expr_str=equation, variable=variable)
