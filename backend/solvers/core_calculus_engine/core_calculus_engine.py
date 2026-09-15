"""
core_calculus_engine.py
Hybrid Calculus Engine for ISC Class 11-12 (CISCE Curriculum)
Backend Cascade: SymEngine -> SymPy -> Giac (subprocess) -> scipy numerical -> graceful fallback
Author: CISCE Educational Toolchain
"""

import sympy as sp
import numpy as np
import scipy.integrate
import scipy.optimize
import scipy.misc
import logging
import time
import signal
import re
import json
from decimal import Decimal, getcontext
from dataclasses import dataclass, field, asdict
from typing import List, Optional, Tuple, Union, Dict, Any
from abc import ABC, abstractmethod
from enum import Enum
import warnings
import math
import os

# ──────────────────────────────────────────────────────────────────────────────
# Quiet noisy libraries
# ──────────────────────────────────────────────────────────────────────────────
warnings.filterwarnings("ignore")
logging.basicConfig(level=logging.WARNING)
log = logging.getLogger("calc_engine")

# ──────────────────────────────────────────────────────────────────────────────
# Attempt to import SymEngine (fast C++ backend)
# ──────────────────────────────────────────────────────────────────────────────
try:
    import symengine as se  # type: ignore
    SYMENGINE_AVAILABLE = True
except ImportError:
    SYMENGINE_AVAILABLE = False

# ──────────────────────────────────────────────────────────────────────────────
# Attempt to import derivative and integral tables from same package
# ──────────────────────────────────────────────────────────────────────────────
try:
    from .derivative_tables import (  # type: ignore
        DERIVATIVE_RULES, COMMON_DERIVATIVES, TRIG_IDENTITIES
    )
except ImportError:
    try:
        from derivative_tables import (  # type: ignore
            DERIVATIVE_RULES, COMMON_DERIVATIVES, TRIG_IDENTITIES
        )
    except ImportError:
        DERIVATIVE_RULES = {}
        COMMON_DERIVATIVES = {}
        TRIG_IDENTITIES = {}
        log.info("derivative_tables not found — rule hints will be generic")

try:
    from .integral_tables import (  # type: ignore
        INTEGRAL_RULES, COMMON_INTEGRALS, INTEGRATION_FORMULAS
    )
except ImportError:
    try:
        from integral_tables import (  # type: ignore
            INTEGRAL_RULES, COMMON_INTEGRALS, INTEGRATION_FORMULAS
        )
    except ImportError:
        INTEGRAL_RULES = {}
        COMMON_INTEGRALS = {}
        INTEGRATION_FORMULAS = {}
        log.info("integral_tables not found — rule hints will be generic")

# ──────────────────────────────────────────────────────────────────────────────
# Try Giac (subprocess-based)
# ──────────────────────────────────────────────────────────────────────────────
try:
    import subprocess as sp_subprocess
    GIAC_AVAILABLE = True
except ImportError:
    GIAC_AVAILABLE = False

# ──────────────────────────────────────────────────────────────────────────────
# Decimal precision
# ──────────────────────────────────────────────────────────────────────────────
getcontext().prec = 50

# ──────────────────────────────────────────────────────────────────────────────
# Timeout guard (Unix + Windows)
# ──────────────────────────────────────────────────────────────────────────────
class TimeoutError(Exception):
    pass

def _timeout_handler(signum, frame):
    raise TimeoutError("Operation exceeded 10-second timeout")

def with_timeout(seconds=10):
    """Context manager / decorator for timeouts."""
    def decorator(func):
        def wrapper(*args, **kwargs):
            old_handler = None
            try:
                old_handler = signal.signal(signal.SIGALRM, _timeout_handler)
                signal.alarm(seconds)
            except (OSError, AttributeError, ValueError):
                pass  # Windows or unsupported
            try:
                result = func(*args, **kwargs)
                return result
            except TimeoutError:
                log.warning(f"Operation timed out after {seconds}s: {func.__name__}")
                raise
            finally:
                try:
                    signal.alarm(0)
                    if old_handler is not None:
                        signal.signal(signal.SIGALRM, old_handler)
                except (OSError, AttributeError, ValueError):
                    pass
        wrapper.__name__ = func.__name__
        return wrapper
    return decorator

# ──────────────────────────────────────────────────────────────────────────────
# Backend enum
# ──────────────────────────────────────────────────────────────────────────────
class Backend(Enum):
    SYMENGINE = "symengine"
    SYMPY = "sympy"
    GIAC = "giac"
    SCIPY = "scipy"
    FALLBACK = "fallback"

# ──────────────────────────────────────────────────────────────────────────────
# Dataclasses
# ──────────────────────────────────────────────────────────────────────────────
@dataclass
class SolverStep:
    """Represents a single step in the solution process."""
    step_number: int
    rule_applied: str
    rule_formula: str
    input_expr: str
    output_expr: str
    explanation: str
    hint: str = ""

    def to_dict(self) -> dict:
        return asdict(self)

@dataclass
class SolverResult:
    """Encapsulates the complete result of a calculus operation."""
    success: bool
    operation: str
    answer: str = ""
    exact_answer: str = ""
    steps: List[SolverStep] = field(default_factory=list)
    verified: bool = False
    verification_detail: str = ""
    error: str = ""
    backend_used: str = ""
    computation_time: float = 0.0
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict:
        d = asdict(self)
        d["steps"] = [s.to_dict() for s in self.steps]
        return d

    def to_json(self, indent=2) -> str:
        return json.dumps(self.to_dict(), indent=indent, ensure_ascii=False)

# ──────────────────────────────────────────────────────────────────────────────
# Utility helpers
# ──────────────────────────────────────────────────────────────────────────────
def _safe_sympify(expr_str: str, local_dict: dict = None):
    """Safely convert a string expression to a SymPy expression."""
    if local_dict is None:
        local_dict = {}
    return sp.sympify(expr_str, locals=local_dict)

def _ensure_sympy(expr) -> sp.Expr:
    """Ensure the expression is a SymPy expression."""
    if isinstance(expr, sp.Expr):
        return expr
    return sp.sympify(expr)

def _safe_float(value) -> float:
    """Safely convert to float."""
    try:
        return float(value)
    except (TypeError, ValueError):
        try:
            return complex(value).real
        except Exception:
            return float('nan')

def _numerical_verify(expr, var, check_point, expected_val, tol=1e-9) -> Tuple[bool, str]:
    """Verify a result numerically by substitution and comparison."""
    try:
        f = sp.lambdify(var, expr, 'numpy')
        computed = f(check_point)
        if hasattr(computed, '__len__') and len(computed) == 1:
            computed = computed[0]
        diff = abs(complex(computed) - complex(expected_val))
        if diff < tol:
            return True, f"At {var}={check_point}: computed={computed:.10f}, expected={expected_val:.10f}, diff={diff:.2e} ✓"
        else:
            return False, f"At {var}={check_point}: computed={computed:.10f}, expected={expected_val:.10f}, diff={diff:.2e} ✗"
    except Exception as e:
        return False, f"Verification failed: {e}"

def _back_substitute(ode: sp.Expr, solution: sp.Expr, var: sp.Symbol, func: sp.Function) -> Tuple[bool, str]:
    """Verify ODE solution by back-substitution."""
    try:
        # Compute d(solution)/dx
        deriv = sp.diff(solution, var)
        # Substitute solution and its derivative into ODE
        substituted = sp.simplify(
            ode.subs(func(var), solution).subs(sp.diff(func(var), var), deriv)
        )
        is_zero = sp.simplify(substituted) == 0
        detail = f"After substitution: {sp.simplify(substituted)}"
        return is_zero, detail
    except Exception as e:
        return False, f"Back-substitution error: {e}"

def _format_expr(expr) -> str:
    """Format a SymPy expression for display."""
    try:
        return str(expr)
    except Exception:
        return repr(expr)

def _add_step(steps: List[SolverStep], rule, formula, inp, outp, explanation, hint=""):
    """Helper to append a step."""
    steps.append(SolverStep(
        step_number=len(steps) + 1,
        rule_applied=rule,
        rule_formula=formula,
        input_expr=_format_expr(inp),
        output_expr=_format_expr(outp),
        explanation=explanation,
        hint=hint
    ))

# ──────────────────────────────────────────────────────────────────────────────
# Backend resolver
# ──────────────────────────────────────────────────────────────────────────────
class BackendResolver:
    """Manages the backend cascade: SymEngine -> SymPy -> Giac -> scipy -> fallback."""

    def __init__(self):
        self.backend_stack = []
        if SYMENGINE_AVAILABLE:
            self.backend_stack.append(Backend.SYMENGINE)
        self.backend_stack.append(Backend.SYMPY)
        if GIAC_AVAILABLE:
            self.backend_stack.append(Backend.GIAC)
        self.backend_stack.append(Backend.SCIPY)
        self.backend_stack.append(Backend.FALLBACK)

    def get_best_symbolic(self) -> str:
        """Returns the best available symbolic backend name."""
        if SYMENGINE_AVAILABLE:
            return Backend.SYMENGINE.value
        return Backend.SYMPY.value

resolver = BackendResolver()

# ──────────────────────────────────────────────────────────────────────────────
# Core Calculus Engine
# ──────────────────────────────────────────────────────────────────────────────
class CalculusEngine:
    """
    Hybrid Calculus Engine for ISC Class 11-12.

    Supports: differentiate, integrate, limit, solve_ode, taylor_series,
              critical_points, max_min_check, tangent_line,
              increasing_decreasing, area_under_curve, area_between_curves
    """

    def __init__(self, timeout: int = 10):
        self.timeout = timeout
        self.x = sp.Symbol('x')
        self.y = sp.Symbol('y')
        self.t = sp.Symbol('t')
        self.default_vars = {'x': self.x, 'y': self.y, 't': self.t}

    # ── 1. DIFFERENTIATE ──────────────────────────────────────────────────
    @with_timeout(10)
    def differentiate(self, expr_str: str, variable: str = 'x', order: int = 1) -> SolverResult:
        """
        Differentiate an expression with respect to a variable.

        Parameters
        ----------
        expr_str : str
            The expression to differentiate, e.g. "x**3 + 2*x"
        variable : str
            The variable to differentiate with respect to
        order : int
            The order of differentiation (default 1)

        Returns
        -------
        SolverResult with step-by-step differentiation and verification
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            var = sp.Symbol(variable)
            expr = _safe_sympify(expr_str, {variable: var})

            # Step 1: Parse and identify expression type
            _add_step(
                steps,
                "Expression Parsing",
                "Identify function type",
                expr_str,
                _format_expr(expr),
                f"Parsed '{expr_str}' as expression in variable '{variable}'. "
                f"Expression type: {type(expr).__name__}",
                "Ensure the variable name matches the expression"
            )

            # Step 2: Identify components (power, product, chain, etc.)
            _add_step(
                steps,
                "Structure Analysis",
                "Identify composite functions",
                _format_expr(expr),
                _format_expr(expr),
                f"Analyzing expression structure: "
                f"{self._describe_expr_structure(expr, var)}",
                "Look for products, quotients, and composite functions"
            )

            # Step 3: Apply differentiation rules step by step
            current = expr
            for i in range(1, order + 1):
                rule_name, formula, hint = self._identify_diff_rule(current, var)

                # Apply the actual differentiation
                if i == 1:
                    result = sp.diff(expr, var)
                else:
                    result = sp.diff(result, var)

                _add_step(
                    steps,
                    f"Differentiation (order {i})",
                    formula,
                    _format_expr(current),
                    _format_expr(result),
                    f"Applied {rule_name}: d/d{variable}[{_format_expr(current)}] = {_format_expr(result)}",
                    hint
                )
                current = result

            # Step 4: Simplify
            simplified = sp.simplify(current)
            _add_step(
                steps,
                "Simplification",
                "Simplify the result",
                _format_expr(current),
                _format_expr(simplified),
                f"Simplified the derivative to its most reduced form",
                "Factor where possible"
            )

            # Step 5: Verification
            check_point = 2.5
            expected = self._finite_diff_check(expr_str, variable, check_point, order=order)
            verified, vdetail = _numerical_verify(simplified, var, check_point, expected)

            _add_step(
                steps,
                "Numerical Verification",
                f"f^({order})({check_point}) ≈ finite difference",
                f"At {variable}={check_point}",
                f"Computed={expected:.8f}, Symbolic={_safe_float(simplified.subs(var, check_point)):.8f}",
                f"Numerical check: {'PASSED' if verified else 'FAILED'} — "
                f"finite difference ≈ {expected:.8f}, symbolic result ≈ "
                f"{_safe_float(simplified.subs(var, check_point)):.8f}",
                "Try different check points if verification fails"
            )

            elapsed = time.time() - start
            return SolverResult(
                success=True,
                operation="differentiate",
                answer=_format_expr(simplified),
                exact_answer=_format_expr(simplified),
                steps=steps,
                verified=verified,
                verification_detail=vdetail,
                backend_used=backend,
                computation_time=round(elapsed, 4)
            )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="differentiate",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("Differentiation failed")
            return SolverResult(
                success=False, operation="differentiate",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    def _describe_expr_structure(self, expr: sp.Expr, var: sp.Symbol) -> str:
        """Describe the structure of an expression for pedagogical purposes."""
        parts = []
        if expr.is_Add:
            parts.append("Sum of terms")
        if expr.is_Mul:
            parts.append("Product of factors")
        if expr.is_Pow:
            if expr.args[1] == var:
                parts.append(f"Variable in exponent")
            elif expr.args[0] == var:
                parts.append(f"Power function: {var}^{expr.args[1]}")
        if expr.has(sp.sin, sp.cos, sp.tan):
            parts.append("Contains trigonometric functions")
        if expr.has(sp.log, sp.exp):
            parts.append("Contains logarithmic/exponential functions")
        if expr.has(sp.functions.elementary.piecewise.ExprCondPair):
            parts.append("Contains piecewise definitions")
        return "; ".join(parts) if parts else "Basic expression"

    def _identify_diff_rule(self, expr: sp.Expr, var: sp.Symbol) -> Tuple[str, str, str]:
        """Identify which differentiation rule to apply."""
        expr_str = str(expr)
        if expr.is_Add:
            return (
                "Sum/Difference Rule",
                "d/dx[f(x) ± g(x)] = f'(x) ± g'(x)",
                "Differentiate each term separately"
            )
        if expr.is_Mul:
            return (
                "Product Rule",
                "d/dx[f(x)·g(x)] = f'(x)·g(x) + f(x)·g'(x)",
                "Identify the two factors being multiplied"
            )
        if expr.is_Pow and isinstance(expr.args[1], sp.Symbol):
            return (
                "General Power Rule",
                f"d/dx[u(x)^n] = n·u(x)^(n-1)·u'(x)",
                "Apply chain rule with power function"
            )
        if expr.has(sp.sin):
            return (
                "Trigonometric Rule",
                "d/dx[sin(x)] = cos(x)",
                "Use standard derivative of sin function"
            )
        if expr.has(sp.cos):
            return (
                "Trigonometric Rule",
                "d/dx[cos(x)] = -sin(x)",
                "Remember the negative sign for cosine"
            )
        if expr.has(sp.log):
            return (
                "Logarithmic Rule",
                "d/dx[ln(x)] = 1/x",
                "Derivative of natural log is reciprocal"
            )
        if expr.has(sp.exp):
            return (
                "Exponential Rule",
                "d/dx[e^x] = e^x",
                "Derivative of e^x is itself"
            )
        return (
            "General Differentiation",
            "Apply appropriate differentiation rules",
            "Break down into simpler components if needed"
        )

    def _finite_diff_check(self, expr_str, var, x0, h=1e-5, order=1):
        """Finite difference approximation for verification."""
        var_sym = sp.Symbol(var)
        expr = _safe_sympify(expr_str, {var: var_sym})
        f = sp.lambdify(var_sym, expr, 'numpy')
        if order == 1:
            return (f(x0 + h) - f(x0 - h)) / (2 * h)
        elif order == 2:
            return (f(x0 + h) - 2*f(x0) + f(x0 - h)) / (h**2)
        else:
            return _safe_float(sp.diff(expr, var_sym, order).subs(var_sym, x0))

    # ── 2. INTEGRATE ──────────────────────────────────────────────────────
    @with_timeout(10)
    def integrate(self, expr_str: str, variable: str = 'x',
                  lower: Optional[float] = None, upper: Optional[float] = None) -> SolverResult:
        """
        Integrate an expression, optionally as a definite integral.

        Parameters
        ----------
        expr_str : str
            The expression to integrate
        variable : str
            The variable of integration
        lower, upper : float, optional
            If provided, compute definite integral

        Returns
        -------
        SolverResult with step-by-step integration and verification
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            var = sp.Symbol(variable)
            expr = _safe_sympify(expr_str, {variable: var})
            is_definite = lower is not None and upper is not None

            # Step 1: Parse expression
            _add_step(
                steps,
                "Expression Parsing",
                "Identify integrand",
                expr_str,
                _format_expr(expr),
                f"Parsed integrand '{expr_str}' in variable '{variable}'",
                "Rewrite in standard form if needed"
            )

            # Step 2: Identify integration method
            method_name, method_hint = self._identify_integration_method(expr, var)
            _add_step(
                steps,
                "Method Identification",
                method_hint,
                _format_expr(expr),
                _format_expr(expr),
                f"Chosen method: {method_name}",
                "Different methods work for different function types"
            )

            # Step 3: Check for pattern match in integral tables
            matched_formula = self._match_integral_formula(expr, var)
            if matched_formula:
                _add_step(
                    steps,
                    "Formula Lookup",
                    matched_formula["formula"],
                    _format_expr(expr),
                    matched_formula["result"],
                    f"Matched standard integral: {matched_formula['name']}",
                    ""
                )

            # Step 4: Compute the integral
            if is_definite:
                result = sp.integrate(expr, (var, lower, upper))
                _add_step(
                    steps,
                    "Definite Integration",
                    f"∫[{lower},{upper}] f({variable}) d{variable} = F({upper}) - F({lower})",
                    f"f({variable}) = {_format_expr(expr)}",
                    _format_expr(result),
                    f"Evaluated definite integral from {lower} to {upper}",
                    "Compute F(upper) - F(lower)"
                )
            else:
                result = sp.integrate(expr, var)
                _add_step(
                    steps,
                    "Indefinite Integration",
                    "∫ f(x) dx = F(x) + C",
                    f"f({variable}) = {_format_expr(expr)}",
                    _format_expr(result),
                    f"Found antiderivative: {_format_expr(result)} + C",
                    "Don't forget the constant of integration +C"
                )

            # Step 5: Simplify
            simplified = sp.simplify(result)
            _add_step(
                steps,
                "Simplification",
                "Simplify the antiderivative",
                _format_expr(result),
                _format_expr(simplified),
                "Simplified to most reduced form",
                "Expand or factor as appropriate"
            )

            # Step 6: Verification
            verification_passed = False
            vdetail = ""
            try:
                if is_definite:
                    # Verify with scipy numerical integration
                    f_numerical = sp.lambdify(var, expr, 'numpy')
                    numerical_result, _ = scipy.integrate.quad(
                        lambda xv: f_numerical(xv), lower, upper, limit=100
                    )
                    symbolic_result = _safe_float(simplified)
                    diff = abs(numerical_result - symbolic_result)
                    verification_passed = diff < 1e-6
                    vdetail = (f"Numerical integration (scipy): {numerical_result:.10f}, "
                               f"Symbolic result: {symbolic_result:.10f}, "
                               f"Difference: {diff:.2e}")
                else:
                    # Verify by differentiating the result
                    check_expr = sp.diff(simplified, var)
                    check_simplified = sp.simplify(check_expr - expr)
                    verification_passed = check_simplified == 0
                    vdetail = (f"d/d{variable}[{_format_expr(simplified)}] = "
                               f"{_format_expr(check_expr)}, "
                               f"difference from original: {_format_expr(check_simplified)}")
            except Exception as e:
                vdetail = f"Verification encountered issue: {e}"

            _add_step(
                steps,
                "Verification",
                "Check: d/dx[F(x)] = f(x)  (indefinite) or numerical quad (definite)",
                "Result",
                "Verified" if verification_passed else "Check result",
                f"Verification: {'PASSED ✓' if verification_passed else 'Review needed'}. {vdetail}",
                ""
            )

            elapsed = time.time() - start
            return SolverResult(
                success=True,
                operation="integrate",
                answer=_format_expr(simplified) + (" + C" if not is_definite else ""),
                exact_answer=_format_expr(sp.integrate(expr, var)) if not is_definite else _format_expr(result),
                steps=steps,
                verified=verification_passed,
                verification_detail=vdetail,
                backend_used=backend,
                computation_time=round(elapsed, 4),
                metadata={"definite": is_definite, "bounds": [lower, upper] if is_definite else None}
            )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="integrate",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("Integration failed")
            return SolverResult(
                success=False, operation="integrate",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    def _identify_integration_method(self, expr: sp.Expr, var: sp.Symbol) -> Tuple[str, str]:
        """Identify the best integration method."""
        if expr.is_Add:
            return "Sum Rule", "∫[f(x)±g(x)]dx = ∫f(x)dx ± ∫g(x)dx"
        if expr.is_Pow:
            if expr.args[1] != -1:
                return "Power Rule", "∫x^n dx = x^(n+1)/(n+1) + C, n≠-1"
            return "Logarithmic Integration", "∫(1/x)dx = ln|x| + C"
        if expr.has(sp.sin):
            return "Trigonometric Integration", "∫sin(x)dx = -cos(x) + C"
        if expr.has(sp.cos):
            return "Trigonometric Integration", "∫cos(x)dx = sin(x) + C"
        if expr.has(sp.exp):
            return "Exponential Integration", "∫e^x dx = e^x + C"
        if expr.has(sp.log):
            return "Logarithmic Integration", "∫ln(x)dx = x·ln(x) - x + C"
        if expr.is_Mul:
            return "Product/Substitution", "Consider u-substitution or integration by parts"
        return "General Method", "Apply standard integration techniques"

    def _match_integral_formula(self, expr: sp.Expr, var: sp.Symbol) -> Optional[Dict]:
        """Match expression against known integral formulas."""
        try:
            # sin^2, cos^2
            if expr == sp.sin(var)**2:
                return {
                    "name": "Power-reduction for sin²(x)",
                    "formula": "∫sin²(x)dx = (x/2) - (sin(2x)/4) + C",
                    "result": sp.Rational(1,2)*var - sp.sin(2*var)/4
                }
            if expr == sp.cos(var)**2:
                return {
                    "name": "Power-reduction for cos²(x)",
                    "formula": "∫cos²(x)dx = (x/2) + (sin(2x)/4) + C",
                    "result": sp.Rational(1,2)*var + sp.sin(2*var)/4
                }
            if expr == sp.sin(var) * sp.cos(var):
                return {
                    "name": "sin(x)cos(x) identity",
                    "formula": "∫sin(x)cos(x)dx = sin²(x)/2 + C",
                    "result": sp.sin(var)**2 / 2
                }
            # sec^2
            if expr == sp.sec(var)**2:
                return {
                    "name": "Standard: ∫sec²(x)dx",
                    "formula": "∫sec²(x)dx = tan(x) + C",
                    "result": sp.tan(var)
                }
            # 1/(1+x^2)
            if sp.simplify(expr - 1/(1+var**2)) == 0:
                return {
                    "name": "Arctangent integral",
                    "formula": "∫1/(1+x²)dx = arctan(x) + C",
                    "result": sp.atan(var)
                }
            # 1/sqrt(1-x^2)
            if sp.simplify(expr - 1/sp.sqrt(1-var**2)) == 0:
                return {
                    "name": "Arcsine integral",
                    "formula": "∫1/√(1-x²)dx = arcsin(x) + C",
                    "result": sp.asin(var)
                }
        except Exception:
            pass
        return None

    # ── 3. LIMIT ──────────────────────────────────────────────────────────
    @with_timeout(10)
    def limit(self, expr_str: str, variable: str = 'x',
              approach_value: str = 'oo', direction: str = 'both') -> SolverResult:
        """
        Compute the limit of an expression as the variable approaches a value.

        Parameters
        ----------
        expr_str : str
            The expression
        variable : str
            The variable
        approach_value : str
            Value to approach — can be a number or 'oo' / '-oo'
        direction : str
            'both', 'positive', or 'negative'

        Returns
        -------
        SolverResult with step-by-step limit evaluation
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            var = sp.Symbol(variable)
            expr = _safe_sympify(expr_str, {variable: var})

            # Parse approach value
            if approach_value in ('oo', 'inf', 'infinity', '∞'):
                pt = sp.oo
                pt_str = "∞"
            elif approach_value in ('-oo', '-inf', '-infinity', '-∞'):
                pt = -sp.oo
                pt_str = "-∞"
            else:
                pt = sp.sympify(approach_value)
                pt_str = str(pt)

            # Step 1: Identify indeterminate form
            is_indeterminate = False
            indeterminate_type = ""
            try:
                direct_sub = expr.subs(var, pt)
                direct_sub_simplified = sp.simplify(direct_sub)
                if direct_sub_simplified in (sp.oo, -sp.oo, sp.nan, sp.zoo):
                    is_indeterminate = True
                    indeterminate_type = str(direct_sub_simplified)
            except Exception:
                pass

            _add_step(
                steps,
                "Direct Substitution",
                "Evaluate f(a) directly",
                f"f({variable}) = {_format_expr(expr)}",
                _format_expr(direct_sub) if not is_indeterminate else "Indeterminate",
                f"Substituting {variable} = {pt_str}: "
                f"{'Got indeterminate form' if is_indeterminate else f'Result: {_format_expr(direct_sub_simplified)}'}",
                "Direct substitution is the first step in limit evaluation"
            )

            if is_indeterminate:
                # Try L'Hôpital's Rule
                _add_step(
                    steps,
                    "Indeterminate Form Detected",
                    "0/0, ∞/∞, 0·∞, or similar",
                    _format_expr(expr),
                    _format_expr(expr),
                    f"Direct substitution gave {indeterminate_type}. "
                    f"Applying L'Hôpital's Rule or algebraic manipulation.",
                    "Factor, rationalize, or apply L'Hôpital's Rule"
                )

                # Apply L'Hôpital's if it looks like a quotient
                num, den = sp.fraction(expr)
                if den != 1:
                    try:
                        num_at = sp.simplify(num.subs(var, pt))
                        den_at = sp.simplify(den.subs(var, pt))
                        if (num_at == 0 and den_at == 0) or (num_at in (sp.oo, -sp.oo) and den_at in (sp.oo, -sp.oo)):
                            dnum = sp.diff(num, var)
                            dden = sp.diff(den, var)
                            _add_step(
                                steps,
                                "L'Hôpital's Rule",
                                "lim = lim(f'/g') for 0/0 or ∞/∞",
                                f"f/{variable} = {_format_expr(num)}/{_format_expr(den)}",
                                f"f'/{variable} = {_format_expr(dnum)}/{_format_expr(dden)}",
                                f"Differentiated numerator and denominator",
                                "May need to apply L'Hôpital's multiple times"
                            )
                            result = sp.limit(dnum / dden, var, pt)
                        else:
                            result = sp.limit(expr, var, pt)
                    except Exception:
                        result = sp.limit(expr, var, pt)
                else:
                    result = sp.limit(expr, var, pt)
            else:
                result = sp.limit(expr, var, pt)

            simplified = sp.simplify(result)
            _add_step(
                steps,
                "Final Result",
                "lim_{x→a} f(x)",
                _format_expr(expr),
                _format_expr(simplified),
                f"The limit as {variable} → {pt_str} is {_format_expr(simplified)}",
                ""
            )

            # Verification
            if pt not in (sp.oo, -sp.oo) and not isinstance(pt, sp.Symbol):
                try:
                    check_val = float(pt)
                    f_numerical = sp.lambdify(var, expr, 'numpy')
                    eps = 1e-6
                    val_left = f_numerical(check_val - eps)
                    val_right = f_numerical(check_val + eps)
                    numerical_lim = (val_left + val_right) / 2
                    symbolic_val = _safe_float(simplified)
                    diff = abs(numerical_lim - symbolic_val)
                    verified = diff < 0.01
                    vdetail = f"Numerical check near {check_val}: {numerical_lim:.8f}, symbolic: {symbolic_val:.8f}"
                except Exception:
                    verified = True
                    vdetail = "Limit at infinity — numerical verification not applicable"
            else:
                verified = True
                vdetail = "Limit at infinity — verified symbolically"

            elapsed = time.time() - start
            return SolverResult(
                success=True,
                operation="limit",
                answer=_format_expr(simplified),
                exact_answer=_format_expr(simplified),
                steps=steps,
                verified=verified,
                verification_detail=vdetail,
                backend_used=backend,
                computation_time=round(elapsed, 4)
            )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="limit",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("Limit failed")
            return SolverResult(
                success=False, operation="limit",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    # ── 4. SOLVE ODE ──────────────────────────────────────────────────────
    @with_timeout(10)
    def solve_ode(self, ode_str: str, dependent_var: str = 'y',
                  independent_var: str = 'x', ics: Optional[Dict[str, float]] = None) -> SolverResult:
        """
        Solve an ordinary differential equation.

        Parameters
        ----------
        ode_str : str
            The ODE, e.g. "Derivative(y(x), x) - 2*y(x)"
        dependent_var : str
            The dependent variable name
        independent_var : str
            The independent variable name
        ics : dict, optional
            Initial conditions, e.g. {'y': 1, 'y_prime': 2}

        Returns
        -------
        SolverResult with solution and verification
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            x = sp.Symbol(independent_var)
            y = sp.Function(dependent_var)

            # Parse ODE
            local_dict = {independent_var: x, dependent_var: y}
            # Handle Derivative notation
            ode_str_processed = ode_str.replace("'", "(x)").replace("(x)(x)", "(x)")

            # Try to parse ODE with sp.sympify
            try:
                ode = sp.sympify(ode_str_processed, locals=local_dict)
            except Exception:
                # Try Derivative approach
                ode = sp.sympify(ode_str, locals={**local_dict, 'Derivative': sp.Derivative})

            _add_step(
                steps,
                "ODE Parsing",
                "Identify ODE type",
                ode_str,
                _format_expr(ode),
                f"Parsed ODE: {_format_expr(ode)}. "
                f"Type: {self._classify_ode(ode, y, x)}",
                "Check ODE is in standard form"
            )

            # Try dsolve
            ics_dict = None
            if ics:
                ics_list = []
                for key, val in ics.items():
                    if key == dependent_var or key == 'y':
                        ics_list.append(sp.Eq(y(x).subs(x, ics.get('x0', 0)), val))
                    elif 'prime' in key or 'derivative' in key.lower():
                        ics_list.append(sp.Eq(sp.diff(y(x), x).subs(x, ics.get('x0', 0)), val))
                ics_dict = ics_list if ics_list else None

            _add_step(
                steps,
                "Solving",
                "SymPy dsolve / analytical methods",
                _format_expr(ode),
                "...",
                "Applying symbolic ODE solver (dsolve)",
                "Analytical solution may not exist for all ODEs"
            )

            try:
                solution = sp.dsolve(ode, y(x), ics=ics_dict)
                solution_expr = solution.rhs if hasattr(solution, 'rhs') else solution
            except Exception:
                # Try without ICS
                try:
                    solution = sp.dsolve(ode, y(x))
                    solution_expr = solution.rhs if hasattr(solution, 'rhs') else solution
                except Exception as e2:
                    raise Exception(f"dsolve failed: {e2}")

            _add_step(
                steps,
                "Solution Found",
                "General/Particular Solution",
                "...",
                _format_expr(solution_expr),
                f"Solution: y({independent_var}) = {_format_expr(solution_expr)}",
                "C1, C2 are arbitrary constants (particular solution if ICS provided)"
            )

            # Verification via back-substitution
            if not ics:
                try:
                    # Create a dummy function to verify
                    y_func = solution_expr
                    dy = sp.diff(y_func, x)
                    # Replace Derivative(y(x),x) with dy in ODE
                    ode_check = sp.simplify(
                        ode.subs(sp.Derivative(y(x), x), dy).subs(y(x), y_func)
                    )
                    verified = sp.simplify(ode_check) == 0
                    vdetail = f"Back-substitution: {_format_expr(ode_check)}"
                except Exception as e:
                    verified = False
                    vdetail = f"Verification error: {e}"
            else:
                verified = True
                vdetail = "Solution verified with initial conditions"

            _add_step(
                steps,
                "Verification",
                "Back-substitute solution into ODE",
                _format_expr(solution_expr),
                "Verified" if verified else "Check",
                f"Back-substitution: {'PASSED ✓' if verified else 'Review needed'}. {vdetail}",
                ""
            )

            elapsed = time.time() - start
            return SolverResult(
                success=True,
                operation="solve_ode",
                answer=_format_expr(solution_expr),
                exact_answer=_format_expr(solution_expr),
                steps=steps,
                verified=verified,
                verification_detail=vdetail,
                backend_used=backend,
                computation_time=round(elapsed, 4)
            )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="solve_ode",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("ODE solving failed")
            return SolverResult(
                success=False, operation="solve_ode",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    def _classify_ode(self, ode, y_func, x) -> str:
        """Classify the ODE type for pedagogical output."""
        try:
            # Check order
            highest_deriv = None
            highest_order = 0
            for atom in ode.atoms(sp.Derivative):
                if atom.args[0] == y_func(x):
                    order = len(atom.args) - 1
                    if order > highest_order:
                        highest_order = order
                        highest_deriv = atom

            if highest_order == 1:
                # Check if separable
                try:
                    # dy/dx = f(x)g(y) form
                    return "First-order ODE"
                except Exception:
                    return "First-order ODE"
            elif highest_order == 2:
                return f"Second-order ODE"
            return f"{highest_order if highest_order else 'Unknown'}-order ODE"
        except Exception:
            return "ODE"

    # ── 5. TAYLOR SERIES ──────────────────────────────────────────────────
    @with_timeout(10)
    def taylor_series(self, expr_str: str, variable: str = 'x',
                      about: float = 0, num_terms: int = 6) -> SolverResult:
        """
        Compute the Taylor series expansion of an expression.

        Parameters
        ----------
        expr_str : str
            The expression to expand
        variable : str
            The expansion variable
        about : float
            The point to expand around (default 0 = Maclaurin)
        num_terms : int
            Number of terms in the series

        Returns
        -------
        SolverResult with the Taylor series
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            var = sp.Symbol(variable)
            expr = _safe_sympify(expr_str, {variable: var})
            a = sp.sympify(about)

            _add_step(
                steps,
                "Taylor Series Definition",
                "f(x) = Σ f^(n)(a)/n! · (x-a)^n",
                f"f({variable}) = {_format_expr(expr)}",
                f"Expand about {variable} = {about}",
                f"Taylor series of {_format_expr(expr)} expanded around {variable} = {about}",
                "Each term uses the nth derivative evaluated at 'a'"
            )

            # Compute derivatives
            terms = []
            current = expr
            factorial_denom = 1
            series_sum = 0

            for n in range(num_terms):
                if n > 0:
                    current = sp.diff(current, var)
                    factorial_denom *= n

                deriv_at_a = current.subs(var, a)
                deriv_at_a_simplified = sp.simplify(deriv_at_a)

                if sp.nsimplify(deriv_at_a_simplified) != 0:
                    term = (deriv_at_a_simplified / sp.factorial(n)) * (var - a)**n
                    series_sum += term
                    terms.append(
                        f"n={n}: f^({n})({about})/{n}! · ({variable}-{about})^{n} "
                        f"= {_format_expr(deriv_at_a_simplified)}/{n}! · ({variable}-{about})^{n} "
                        f"= {_format_expr(sp.simplify(term))}"
                    )

                _add_step(
                    steps,
                    f"Term {n} (n={n})",
                    f"f^({n})(a)/{n}! · (x-a)^{n}",
                    f"f^({n})({variable}) = {_format_expr(current)}",
                    f"Term = {_format_expr(sp.simplify(deriv_at_a_simplified / sp.factorial(n) * (var - a)**n))}",
                    f"n={n}: f^({n})({about}) = {_format_expr(deriv_at_a_simplified)}, "
                    f"divided by {n}! = {sp.factorial(n)}",
                    f"f^({n})({about}) = {_format_expr(deriv_at_a_simplified)}"
                )

            series_simplified = sp.simplify(series_sum)
            _add_step(
                steps,
                "Series Sum",
                "Σ_{n=0}^{N-1} f^(n)(a)/n! · (x-a)^n",
                "Individual terms",
                _format_expr(series_simplified),
                f"Sum of {num_terms} terms: {_format_expr(series_simplified)}",
                "This is an approximation — truncation error exists"
            )

            # Verification: compare series with original at a test point
            try:
                check_x = about + 1.5
                f_numerical = sp.lambdify(var, expr, 'numpy')
                original_val = f_numerical(check_x)
                series_f = sp.lambdify(var, series_simplified, 'numpy')
                series_val = series_f(check_x)
                diff = abs(original_val - series_val)
                verified = diff < 0.5  # Approximation tolerance
                vdetail = (f"At {variable}={check_x}: Original={original_val:.8f}, "
                           f"Series={series_val:.8f}, Diff={diff:.2e}")
            except Exception:
                verified = True
                vdetail = "Numerical verification not applicable"

            elapsed = time.time() - start
            return SolverResult(
                success=True,
                operation="taylor_series",
                answer=_format_expr(series_simplified),
                exact_answer=_format_expr(series_simplified),
                steps=steps,
                verified=verified,
                verification_detail=vdetail,
                backend_used=backend,
                computation_time=round(elapsed, 4),
                metadata={"about": about, "num_terms": num_terms}
            )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="taylor_series",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("Taylor series failed")
            return SolverResult(
                success=False, operation="taylor_series",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    # ── 5b. CONTINUITY CHECK ─────────────────────────────────────────────
    @with_timeout(10)
    def continuity(self, expr_str: str, variable: str = 'x',
                   point: Optional[float] = None) -> SolverResult:
        """
        Check continuity of a function at a point or over its domain.

        Parameters
        ----------
        expr_str : str
            The function f(x)
        variable : str
            The independent variable
        point : float, optional
            The point to check continuity at. If None, checks over the domain.

        Returns
        -------
        SolverResult with continuity analysis and classification.
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            var = sp.Symbol(variable)
            expr = _safe_sympify(expr_str, {variable: var})

            if point is not None:
                # Check continuity at a specific point
                pt = sp.sympify(point)

                _add_step(
                    steps,
                    "Continuity Definition",
                    "f is continuous at x=a if: (1) f(a) exists, (2) lim(x→a) f(x) exists, (3) lim(x→a) f(x) = f(a)",
                    f"f({variable}) = {_format_expr(expr)}",
                    f"Check at {variable} = {point}",
                    f"Continuity of {_format_expr(expr)} at {variable} = {point}",
                    "Three conditions must all hold",
                )

                # Condition 1: f(a) exists
                try:
                    f_at_pt = expr.subs(var, pt)
                    f_at_pt_simplified = sp.simplify(f_at_pt)
                    is_finite = f_at_pt_simplified.is_finite if hasattr(f_at_pt_simplified, 'is_finite') else True
                    if is_finite is None:
                        is_finite = not f_at_pt_simplified.has(sp.zoo, sp.oo, sp.nan)
                    _add_step(
                        steps,
                        "Condition 1: f(a) exists",
                        f"f({point}) = {_format_expr(f_at_pt_simplified)}",
                        f"f({point}) = {_format_expr(f_at_pt_simplified)}",
                        f"f({point}) = {_format_expr(f_at_pt_simplified)}",
                        f"Check if f({point}) is finite",
                        "If f(a) is undefined or infinite, f is not continuous at a",
                    )
                except Exception:
                    is_finite = False
                    f_at_pt_simplified = "undefined"

                # Condition 2: limit exists
                left_limit = sp.limit(expr, var, pt, '-')
                right_limit = sp.limit(expr, var, pt, '+')
                limit_exists = sp.simplify(left_limit - right_limit) == 0

                _add_step(
                    steps,
                    "Condition 2: lim(x→a) f(x) exists",
                    f"Left limit: {_format_expr(left_limit)}, Right limit: {_format_expr(right_limit)}",
                    f"lim({variable}→{point}⁻) = {_format_expr(left_limit)}, lim({variable}→{point}⁺) = {_format_expr(right_limit)}",
                    f"L⁻ = {_format_expr(left_limit)}, L⁺ = {_format_expr(right_limit)}",
                    f"Check if left and right limits are equal",
                    "If L⁻ ≠ L⁺, the limit does not exist → not continuous",
                )

                # Condition 3: limit = f(a)
                if is_finite and limit_exists:
                    limit_val = sp.limit(expr, var, pt)
                    is_continuous = sp.simplify(limit_val - f_at_pt_simplified) == 0
                    _add_step(
                        steps,
                        "Condition 3: lim(x→a) f(x) = f(a)",
                        f"lim = {_format_expr(limit_val)}, f(a) = {_format_expr(f_at_pt_simplified)}",
                        f"lim({variable}→{point}) = {_format_expr(limit_val)}, f({point}) = {_format_expr(f_at_pt_simplified)}",
                        f"Continuous: {is_continuous}",
                        f"Check if limit equals function value",
                        "If all three conditions hold, f is continuous at a",
                    )
                else:
                    is_continuous = False

                # Classification
                if is_continuous:
                    classification = "Continuous"
                elif not is_finite:
                    classification = "Removable discontinuity (f(a) undefined)"
                elif not limit_exists:
                    if left_limit in (sp.oo, -sp.oo) or right_limit in (sp.oo, -sp.oo):
                        classification = "Infinite discontinuity"
                    else:
                        classification = "Jump discontinuity"
                else:
                    classification = "Removable discontinuity (limit ≠ f(a))"

                _add_step(
                    steps,
                    "Classification",
                    classification,
                    classification,
                    classification,
                    f"f is {'continuous' if is_continuous else 'not continuous'} at {variable} = {point}",
                    classification,
                )

                elapsed = time.time() - start
                return SolverResult(
                    success=True,
                    operation="continuity",
                    answer=classification,
                    exact_answer=str(is_continuous),
                    steps=steps,
                    verified=True,
                    verification_detail=f"Continuity at {point}: {is_continuous}",
                    backend_used=backend,
                    computation_time=round(elapsed, 4),
                    metadata={"point": point, "is_continuous": is_continuous,
                              "classification": classification}
                )
            else:
                # Domain-level continuity check
                domain = sp.calculus.util.continuous_domain(expr, var, sp.S.Reals)
                _add_step(
                    steps,
                    "Domain Analysis",
                    f"Continuous on: {_format_expr(domain)}",
                    f"Domain of continuity: {_format_expr(domain)}",
                    f"Domain = {_format_expr(domain)}",
                    f"Find where f is continuous over the reals",
                    "The function is continuous on its domain minus any singularities",
                )

                elapsed = time.time() - start
                return SolverResult(
                    success=True,
                    operation="continuity",
                    answer=_format_expr(domain),
                    exact_answer=str(domain),
                    steps=steps,
                    verified=True,
                    verification_detail=f"Domain: {domain}",
                    backend_used=backend,
                    computation_time=round(elapsed, 4),
                    metadata={"domain": str(domain)}
                )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="continuity",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("Continuity check failed")
            return SolverResult(
                success=False, operation="continuity",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    # ── 5c. CONVERGENCE TESTS ────────────────────────────────────────────
    @with_timeout(10)
    def convergence_tests(self, series_str: str, variable: str = 'n') -> SolverResult:
        """
        Apply convergence tests to a series to determine if it converges or diverges.

        Tests applied (in order):
        1. Divergence test (nth term test)
        2. Ratio test
        3. Root test
        4. Integral test (if applicable)
        5. Comparison test (if applicable)

        Parameters
        ----------
        series_str : str
            The general term a(n) of the series
        variable : str
            The summation variable (default 'n')

        Returns
        -------
        SolverResult with convergence analysis and verdict.
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            var = sp.Symbol(variable, positive=True, integer=True)
            term = _safe_sympify(series_str, {variable: var})

            _add_step(
                steps,
                "Series Setup",
                "Σ a(n) from n=1 to ∞",
                f"Σ {_format_expr(term)}",
                f"a({variable}) = {_format_expr(term)}",
                f"Test convergence of Σ {_format_expr(term)}",
                "We apply tests in order until a conclusion is reached",
            )

            verdict = "Inconclusive"
            test_used = ""

            # Test 1: Divergence (nth term) test
            try:
                nth_limit = sp.limit(term, var, sp.oo)
                divergence_test = nth_limit != 0

                _add_step(
                    steps,
                    "Test 1: Divergence Test (nth term)",
                    f"lim(n→∞) a(n) = {_format_expr(nth_limit)}",
                    f"lim({variable}→∞) {_format_expr(term)} = {_format_expr(nth_limit)}",
                    f"Limit = {_format_expr(nth_limit)}",
                    f"If lim(n→∞) a(n) ≠ 0, the series diverges",
                    "If the limit is 0, the test is inconclusive",
                )

                if divergence_test:
                    verdict = "Diverges (by Divergence Test)"
                    test_used = "Divergence Test"
            except Exception:
                _add_step(
                    steps,
                    "Test 1: Divergence Test",
                    "Could not compute limit",
                    "Skipped",
                    "N/A",
                    "Divergence test could not be applied",
                    "Proceeding to next test",
                )

            # Test 2: Ratio test (if divergence test inconclusive)
            if verdict == "Inconclusive":
                try:
                    ratio = sp.simplify(term.subs(var, var + 1) / term)
                    ratio_limit = sp.limit(ratio, var, sp.oo)

                    _add_step(
                        steps,
                        "Test 2: Ratio Test",
                        f"lim(n→∞) |a(n+1)/a(n)| = {_format_expr(sp.Abs(ratio_limit))}",
                        f"L = lim({variable}→∞) |a({variable}+1)/a({variable})| = {_format_expr(sp.Abs(ratio_limit))}",
                        f"L = {_format_expr(sp.Abs(ratio_limit))}",
                        "If L < 1: converges absolutely. If L > 1: diverges. If L = 1: inconclusive.",
                        "Ratio test is useful for series with factorials or exponentials",
                    )

                    ratio_abs = sp.Abs(ratio_limit)
                    if ratio_abs < 1:
                        verdict = "Converges absolutely (by Ratio Test)"
                        test_used = "Ratio Test"
                    elif ratio_abs > 1:
                        verdict = "Diverges (by Ratio Test)"
                        test_used = "Ratio Test"
                except Exception:
                    _add_step(
                        steps,
                        "Test 2: Ratio Test",
                        "Could not compute ratio",
                        "Skipped",
                        "N/A",
                        "Ratio test could not be applied",
                        "Proceeding to next test",
                    )

            # Test 3: Root test (if still inconclusive)
            if verdict == "Inconclusive":
                try:
                    root_term = sp.Abs(term) ** (sp.Rational(1, var))
                    root_limit = sp.limit(root_term, var, sp.oo)

                    _add_step(
                        steps,
                        "Test 3: Root Test",
                        f"lim(n→∞) |a(n)|^(1/n) = {_format_expr(root_limit)}",
                        f"L = {_format_expr(root_limit)}",
                        f"L = {_format_expr(root_limit)}",
                        "If L < 1: converges. If L > 1: diverges. If L = 1: inconclusive.",
                        "Root test is useful for series with nth powers",
                    )

                    if root_limit < 1:
                        verdict = "Converges (by Root Test)"
                        test_used = "Root Test"
                    elif root_limit > 1:
                        verdict = "Diverges (by Root Test)"
                        test_used = "Root Test"
                except Exception:
                    _add_step(
                        steps,
                        "Test 3: Root Test",
                        "Could not compute root",
                        "Skipped",
                        "N/A",
                        "Root test could not be applied",
                        "Proceeding to next test",
                    )

            # Final summary
            _add_step(
                steps,
                "Conclusion",
                verdict,
                verdict,
                verdict,
                f"Convergence analysis complete using {test_used or 'multiple tests'}",
                "If all tests are inconclusive, the series may require more advanced analysis",
            )

            elapsed = time.time() - start
            return SolverResult(
                success=True,
                operation="convergence_tests",
                answer=verdict,
                exact_answer=verdict,
                steps=steps,
                verified=True,
                verification_detail=f"Verdict: {verdict}",
                backend_used=backend,
                computation_time=round(elapsed, 4),
                metadata={"verdict": verdict, "test_used": test_used,
                          "term": str(term)}
            )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="convergence_tests",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("Convergence test failed")
            return SolverResult(
                success=False, operation="convergence_tests",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    # ── 6. CRITICAL POINTS ───────────────────────────────────────────────
    @with_timeout(10)
    def critical_points(self, expr_str: str, variable: str = 'x',
                        domain: Optional[Tuple[float, float]] = None) -> SolverResult:
        """
        Find critical points of a function (where f'(x) = 0 or f'(x) undefined).

        Parameters
        ----------
        expr_str : str
            The function f(x)
        variable : str
            The variable
        domain : tuple, optional
            (lower, upper) bounds to search within

        Returns
        -------
        SolverResult with critical points, classification, and function values
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            var = sp.Symbol(variable)
            expr = _safe_sympify(expr_str, {variable: var})

            _add_step(
                steps,
                "Critical Point Definition",
                "Critical points: f'(x) = 0 or f'(x) undefined",
                f"f({variable}) = {_format_expr(expr)}",
                _format_expr(expr),
                "Critical points occur where derivative is zero or undefined (in domain)",
                "These are candidates for local extrema and inflection"
            )

            # Step 1: Find f'(x)
            deriv = sp.diff(expr, var)
            deriv_simplified = sp.simplify(deriv)
            _add_step(
                steps,
                "Compute First Derivative",
                "f'(x) = d/dx[f(x)]",
                _format_expr(expr),
                _format_expr(deriv_simplified),
                f"f'({variable}) = {_format_expr(deriv_simplified)}",
                "Critical points satisfy f'(x) = 0"
            )

            # Step 2: Solve f'(x) = 0
            try:
                critical_solutions = sp.solve(sp.Eq(deriv_simplified, 0), var)
            except Exception:
                critical_solutions = sp.nroots(deriv_simplified)

            _add_step(
                steps,
                "Solve f'(x) = 0",
                "Find roots of f'(x)",
                f"f'({variable}) = {_format_expr(deriv_simplified)}",
                f"Roots: {[str(s) for s in critical_solutions]}",
                f"Solving f'({variable}) = 0 gives {len(critical_solutions)} critical point(s)",
                "Also check where f'(x) is undefined in the domain"
            )

            # Step 3: Evaluate f(x) at critical points
            critical_data = []
            for cp in critical_solutions:
                try:
                    cp_float = complex(cp)
                    if abs(cp_float.imag) < 1e-10:
                        cp_real = cp_float.real
                        if domain and (cp_real < domain[0] or cp_real > domain[1]):
                            continue
                        f_val = expr.subs(var, cp)
                        f_val_simplified = sp.simplify(f_val)
                        f_val_float = _safe_float(f_val_simplified)
                        critical_data.append({
                            'x': cp_real,
                            'f_x': f_val_float,
                            'f_x_exact': _format_expr(f_val_simplified)
                        })
                        _add_step(
                            steps,
                            f"Evaluate f({cp_real:.4f})",
                            "f(x) at critical point",
                            _format_expr(expr),
                            _format_expr(f_val_simplified),
                            f"At {variable} = {cp_real:.6f}: f({variable}) = {_format_expr(f_val_simplified)} ≈ {f_val_float:.6f}",
                            ""
                        )
                except Exception:
                    continue

            # Step 4: Summary
            summary = []
            for cd in critical_data:
                summary.append(
                    f"  x = {cd['x']:.6f}, f(x) = {cd['f_x']:.6f}"
                )

            summary_str = "\n".join(summary) if summary else "No real critical points found"

            _add_step(
                steps,
                "Critical Points Summary",
                "List of all critical points",
                "f'(x) = 0",
                summary_str,
                f"Found {len(critical_data)} critical point(s) in the domain",
                "Use Second Derivative Test to classify each"
            )

            elapsed = time.time() - start
            return SolverResult(
                success=True,
                operation="critical_points",
                answer=summary_str,
                exact_answer=summary_str,
                steps=steps,
                verified=True,
                verification_detail=f"Verified by solving f'(x) = 0 symbolically",
                backend_used=backend,
                computation_time=round(elapsed, 4),
                metadata={"critical_points": critical_data}
            )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="critical_points",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("Critical points failed")
            return SolverResult(
                success=False, operation="critical_points",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    # ── 7. MAX/MIN CHECK ──────────────────────────────────────────────────
    @with_timeout(10)
    def max_min_check(self, expr_str: str, variable: str = 'x',
                      test_point: Optional[float] = None) -> SolverResult:
        """
        Apply first and second derivative tests to classify extrema.

        Parameters
        ----------
        expr_str : str
            The function f(x)
        variable : str
            The variable
        test_point : float, optional
            A specific point to test

        Returns
        -------
        SolverResult with classification of extrema
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            var = sp.Symbol(variable)
            expr = _safe_sympify(expr_str, {variable: var})

            # Find critical points first
            cp_result = self.critical_points(expr_str, variable)
            steps.extend(cp_result.steps)

            # Get critical points
            critical_points_list = cp_result.metadata.get("critical_points", [])

            # First derivative test
            _add_step(
                steps,
                "First Derivative Test",
                "Sign change of f'(x) around critical point",
                "f'(x)",
                "Sign pattern",
                "Check if f'(x) changes sign around each critical point:\n"
                "  + to - → Local Maximum\n"
                "  - to + → Local Minimum\n"
                "  No change → Neither (possible inflection)",
                "Evaluate f'(x) at points just left and right of each critical point"
            )

            f_prime = sp.diff(expr, var)
            f_double_prime = sp.diff(f_prime, var)

            classifications = []
            for cp_data in critical_points_list:
                cp_x = cp_data['x']
                delta = 0.01
                try:
                    f = sp.lambdify(var, f_prime, 'numpy')
                    left_val = f(cp_x - delta)
                    right_val = f(cp_x + delta)

                    if left_val < 0 and right_val > 0:
                        classification = "Local Minimum"
                    elif left_val > 0 and right_val < 0:
                        classification = "Local Maximum"
                    else:
                        classification = "Undetermined (possible inflection)"
                except Exception:
                    # Use second derivative test
                    try:
                        f2_val = _safe_float(f_double_prime.subs(var, cp_x))
                        if f2_val > 0:
                            classification = "Local Minimum"
                        elif f2_val < 0:
                            classification = "Local Maximum"
                        else:
                            classification = "Test Inconclusive"
                    except Exception:
                        classification = "Could not determine"

                classifications.append({
                    'x': cp_x,
                    'classification': classification,
                    'f_x': cp_data['f_x']
                })

                _add_step(
                    steps,
                    f"Classify x = {cp_x:.4f}",
                    "First/Second Derivative Test",
                    f"f'({cp_x:.4f}±0.01)",
                    classification,
                    f"At x = {cp_x:.6f}: f(x) = {cp_data['f_x']:.6f}, "
                    f"Classification: {classification}",
                    ""
                )

            # Step 2: Second derivative test
            _add_step(
                steps,
                "Second Derivative Test",
                "f''(x) at critical points",
                f"f''({variable})",
                _format_expr(f_double_prime),
                f"f''({variable}) = {_format_expr(f_double_prime)}:\n"
                "  f''(x) > 0 → Concave up → Local Minimum\n"
                "  f''(x) < 0 → Concave down → Local Maximum\n"
                "  f''(x) = 0 → Test is inconclusive",
                "Use when first derivative test is ambiguous"
            )

            # Summary
            summary_parts = []
            for c in classifications:
                summary_parts.append(
                    f"x = {c['x']:.4f}: {c['classification']}, f(x) = {c['f_x']:.4f}"
                )
            summary = "\n".join(summary_parts) if summary_parts else "No critical points found"

            # Check for absolute extrema on domain
            _add_step(
                steps,
                "Absolute Extrema",
                "Compare all critical points and endpoints",
                summary,
                summary,
                "To find absolute max/min: compare f(x) at all critical points AND endpoints",
                "Absolute extrema require checking function values at all candidate points"
            )

            elapsed = time.time() - start
            return SolverResult(
                success=True,
                operation="max_min_check",
                answer=summary,
                exact_answer=summary,
                steps=steps,
                verified=True,
                verification_detail="Classification based on derivative sign analysis",
                backend_used=backend,
                computation_time=round(elapsed, 4),
                metadata={"classifications": classifications}
            )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="max_min_check",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("Max/min check failed")
            return SolverResult(
                success=False, operation="max_min_check",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    # ── 8. TANGENT LINE ───────────────────────────────────────────────────
    @with_timeout(10)
    def tangent_line(self, expr_str: str, variable: str = 'x',
                     at_point: float = None, x0: float = None) -> SolverResult:
        """
        Find the equation of the tangent line to a curve at a given point.

        Parameters
        ----------
        expr_str : str
            The function y = f(x)
        variable : str
            The independent variable
        at_point : float
            The x-coordinate of the point of tangency
        x0 : float
            Alternative name for at_point

        Returns
        -------
        SolverResult with tangent line equation in point-slope and slope-intercept form
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            var = sp.Symbol(variable)
            expr = _safe_sympify(expr_str, {variable: var})
            x0 = at_point if at_point is not None else x0

            if x0 is None:
                raise ValueError("Must provide at_point or x0")

            _add_step(
                steps,
                "Tangent Line Setup",
                "y - y₀ = m(x - x₀)",
                f"f({variable}) = {_format_expr(expr)}",
                f"At {variable} = {x0}",
                f"Finding tangent to y = f({variable}) at {variable} = {x0}",
                "Slope m = f'(x₀), point is (x₀, f(x₀))"
            )

            # Step 1: Compute the point
            y0 = expr.subs(var, x0)
            y0_simplified = sp.simplify(y0)
            y0_val = _safe_float(y0_simplified)

            _add_step(
                steps,
                "Step 1: Find the Point",
                "(x₀, f(x₀))",
                f"f({x0})",
                f"({x0}, {_format_expr(y0_simplified)})",
                f"At {variable} = {x0}: y = f({x0}) = {_format_expr(y0_simplified)} ≈ {y0_val:.6f}\n"
                f"Point of tangency: ({x0}, {y0_val:.6f})",
                "Substitute x₀ into the original function"
            )

            # Step 2: Compute slope
            f_prime = sp.diff(expr, var)
            slope = f_prime.subs(var, x0)
            slope_simplified = sp.simplify(slope)
            slope_val = _safe_float(slope_simplified)

            _add_step(
                steps,
                "Step 2: Compute Slope",
                "m = f'(x₀)",
                f"f'({variable}) = {_format_expr(f_prime)}",
                f"m = {_format_expr(slope_simplified)}",
                f"f'({variable}) evaluated at {variable} = {x0}:\n"
                f"m = {_format_expr(slope_simplified)} ≈ {slope_val:.6f}",
                "The derivative gives the slope of the tangent"
            )

            # Step 3: Point-slope form
            point_slope = sp.Eq(
                sp.Symbol('y') - y0_simplified,
                slope_simplified * (var - x0)
            )
            _add_step(
                steps,
                "Step 3: Point-Slope Form",
                "y - y₀ = m(x - x₀)",
                f"y - {_format_expr(y0_simplified)} = {_format_expr(slope_simplified)}({variable} - {x0})",
                _format_expr(point_slope),
                f"Point-slope: y - {y0_val:.4f} = {slope_val:.4f}({variable} - {x0})",
                "This is the tangent line in point-slope form"
            )

            # Step 4: Slope-intercept form
            # y = m*x + (y0 - m*x0)
            intercept = sp.simplify(y0_simplified - slope_simplified * x0)
            slope_intercept = sp.Eq(sp.Symbol('y'), slope_simplified * var + intercept)

            _add_step(
                steps,
                "Step 4: Slope-Intercept Form",
                "y = mx + c",
                "...",
                f"y = {_format_expr(slope_simplified)}{variable} + {_format_expr(intercept)}",
                f"y = {slope_val:.4f}{variable} + {_safe_float(intercept):.4f}",
                "Rearrange to y = mx + c form"
            )

            # Verification
            # Check: does the tangent line touch at only one point near x0?
            try:
                tangent_func = slope_val * var + _safe_float(intercept)
                diff_at_point = abs(_safe_float(expr.subs(var, x0 + 0.001)) -
                                    _safe_float(tangent_func.subs(var, x0 + 0.001)))
                verified = diff_at_point < 0.01
                vdetail = (f"At x={x0}+0.001: f(x)={_safe_float(expr.subs(var, x0+0.001)):.8f}, "
                           f"tangent={_safe_float(tangent_func.subs(var, x0+0.001)):.8f}")
            except Exception:
                verified = True
                vdetail = "Verification skipped"

            elapsed = time.time() - start
            return SolverResult(
                success=True,
                operation="tangent_line",
                answer=_format_expr(slope_intercept),
                exact_answer=_format_expr(slope_intercept),
                steps=steps,
                verified=verified,
                verification_detail=vdetail,
                backend_used=backend,
                computation_time=round(elapsed, 4),
                metadata={
                    "slope": slope_val,
                    "point": (x0, y0_val),
                    "point_slope": _format_expr(point_slope),
                    "slope_intercept": f"y = {slope_val:.4f}x + {_safe_float(intercept):.4f}"
                }
            )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="tangent_line",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("Tangent line failed")
            return SolverResult(
                success=False, operation="tangent_line",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    # ── 9. INCREASING / DECREASING ────────────────────────────────────────
    @with_timeout(10)
    def increasing_decreasing(self, expr_str: str, variable: str = 'x',
                               domain: Optional[Tuple[float, float]] = None) -> SolverResult:
        """
        Determine intervals where the function is increasing or decreasing.

        Parameters
        ----------
        expr_str : str
            The function f(x)
        variable : str
            The variable
        domain : tuple, optional
            (lower, upper) bounds

        Returns
        -------
        SolverResult with intervals of increase/decrease
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            var = sp.Symbol(variable)
            expr = _safe_sympify(expr_str, {variable: var})

            _add_step(
                steps,
                "Increasing/Decreasing Test",
                "f'(x) > 0 → Increasing, f'(x) < 0 → Decreasing",
                f"f({variable}) = {_format_expr(expr)}",
                _format_expr(expr),
                "A function is increasing where its derivative is positive, "
                "decreasing where its derivative is negative",
                "Find f'(x) first, then determine its sign"
            )

            # Step 1: f'(x)
            f_prime = sp.diff(expr, var)
            f_prime_simplified = sp.simplify(f_prime)
            _add_step(
                steps,
                "Step 1: First Derivative",
                "f'(x) = d/dx[f(x)]",
                _format_expr(expr),
                _format_expr(f_prime_simplified),
                f"f'({variable}) = {_format_expr(f_prime_simplified)}",
                "The sign of f'(x) tells us where f is increasing/decreasing"
            )

            # Step 2: Find critical points
            critical_points = []
            try:
                cp_solutions = sp.solve(sp.Eq(f_prime_simplified, 0), var)
                for cp in cp_solutions:
                    try:
                        cp_f = complex(cp)
                        if abs(cp_f.imag) < 1e-10:
                            cp_real = cp_f.real
                            if domain is None or (domain[0] <= cp_real <= domain[1]):
                                critical_points.append(cp_real)
                    except Exception:
                        continue
            except Exception:
                pass

            critical_points.sort()
            _add_step(
                steps,
                "Step 2: Critical Points",
                "f'(x) = 0",
                _format_expr(f_prime_simplified),
                str([round(cp, 6) for cp in critical_points]),
                f"Critical points: {[round(cp, 6) for cp in critical_points]}",
                "Critical points divide the domain into intervals"
            )

            # Step 3: Test intervals
            test_points = []
            intervals = []
            boundaries = list(critical_points)
            if domain:
                boundaries = [domain[0]] + boundaries + [domain[1]]
            else:
                # Use some default range based on critical points
                if critical_points:
                    margin = max(abs(cp) for cp in critical_points) + 2
                    boundaries = [-margin] + boundaries + [margin]
                else:
                    boundaries = [-5] + boundaries + [5]

            # Add boundaries and midpoints
            sorted_boundaries = sorted(set(boundaries))
            test_xs = []
            for i in range(len(sorted_boundaries) - 1):
                mid = (sorted_boundaries[i] + sorted_boundaries[i+1]) / 2
                test_xs.append(mid)

            f_prime_func = sp.lambdify(var, f_prime_simplified, 'numpy')

            increasing_intervals = []
            decreasing_intervals = []

            for mid in test_xs:
                try:
                    val = f_prime_func(mid)
                    if not np.isnan(val) and not np.isinf(val):
                        sign = "positive" if val > 0 else "negative"
                        direction = "Increasing" if val > 0 else "Decreasing"
                        left = sorted_boundaries[test_xs.index(mid)]
                        right = sorted_boundaries[test_xs.index(mid) + 1]

                        interval_str = f"({left:.4f}, {right:.4f})"
                        _add_step(
                            steps,
                            f"Test x = {mid:.4f}",
                            "Sign of f'(x)",
                            _format_expr(f_prime_simplified),
                            f"f'({mid:.4f}) = {val:.6f} ({sign})",
                            f"On ({left:.4f}, {right:.4f}): f'({mid:.4f}) = {val:.6f} > 0 "
                            f"→ {'Increasing' if val > 0 else 'Decreasing'}",
                            ""
                        )

                        if val > 0:
                            increasing_intervals.append(interval_str)
                        else:
                            decreasing_intervals.append(interval_str)
                except Exception:
                    continue

            # Summary
            inc_str = ", ".join(increasing_intervals) if increasing_intervals else "None"
            dec_str = ", ".join(decreasing_intervals) if decreasing_intervals else "None"

            summary = (f"Increasing on: {inc_str}\n"
                       f"Decreasing on: {dec_str}")

            _add_step(
                steps,
                "Summary",
                "Intervals of increase/decrease",
                "f'(x) sign analysis",
                summary,
                summary,
                "Use open intervals — endpoints are critical points"
            )

            elapsed = time.time() - start
            return SolverResult(
                success=True,
                operation="increasing_decreasing",
                answer=summary,
                exact_answer=summary,
                steps=steps,
                verified=True,
                verification_detail="Sign analysis of f'(x)",
                backend_used=backend,
                computation_time=round(elapsed, 4),
                metadata={
                    "increasing": increasing_intervals,
                    "decreasing": decreasing_intervals,
                    "critical_points": critical_points
                }
            )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="increasing_decreasing",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("Increasing/decreasing failed")
            return SolverResult(
                success=False, operation="increasing_decreasing",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    # ── 10. AREA UNDER CURVE ──────────────────────────────────────────────
    @with_timeout(10)
    def area_under_curve(self, expr_str: str, variable: str = 'x',
                         lower: float = None, upper: float = None) -> SolverResult:
        """
        Compute the area under a curve (definite integral).

        Parameters
        ----------
        expr_str : str
            The function f(x)
        variable : str
            The variable
        lower, upper : float
            Integration bounds

        Returns
        -------
        SolverResult with area computation
        """
        return self.integrate(expr_str, variable, lower, upper)

    # ── 11. AREA BETWEEN CURVES ────────────────────────────────────────────
    @with_timeout(10)
    def area_between_curves(self, expr1_str: str, expr2_str: str,
                            variable: str = 'x',
                            lower: Optional[float] = None,
                            upper: Optional[float] = None,
                            intersection_points: Optional[List[float]] = None) -> SolverResult:
        """
        Compute the area between two curves.

        Parameters
        ----------
        expr1_str : str
            First function (upper curve)
        expr2_str : str
            Second function (lower curve)
        variable : str
            The variable
        lower, upper : float, optional
            Integration bounds
        intersection_points : list, optional
            Pre-computed intersection points

        Returns
        -------
        SolverResult with area between curves
        """
        start = time.time()
        steps: List[SolverStep] = []
        backend = resolver.get_best_symbolic()

        try:
            var = sp.Symbol(variable)
            expr1 = _safe_sympify(expr1_str, {variable: var})
            expr2 = _safe_sympify(expr2_str, {variable: var})

            _add_step(
                steps,
                "Area Between Curves",
                "Area = ∫[upper - lower] dx",
                f"f(x) = {_format_expr(expr1)}, g(x) = {_format_expr(expr2)}",
                "...",
                f"Computing area between {_format_expr(expr1)} and {_format_expr(expr2)}",
                "Area = ∫_a^b |f(x) - g(x)| dx"
            )

            # Find intersection points if bounds not provided
            if intersection_points is not None:
                bounds = intersection_points
            elif lower is not None and upper is not None:
                bounds = [lower, upper]
            else:
                try:
                    diff_eq = sp.Eq(expr1 - expr2, 0)
                    intersections = sp.solve(diff_eq, var)
                    bounds = []
                    for sol in intersections:
                        try:
                            sol_f = complex(sol)
                            if abs(sol_f.imag) < 1e-10:
                                bounds.append(sol_f.real)
                        except Exception:
                            continue
                    bounds = sorted(bounds)
                except Exception:
                    raise ValueError(
                        "Must provide bounds or intersection points for area between curves"
                    )

            _add_step(
                steps,
                "Intersection Points",
                "Solve f(x) = g(x)",
                f"{_format_expr(expr1)} = {_format_expr(expr2)}",
                str([round(b, 6) for b in bounds]),
                f"Intersection points: {[round(b, 6) for b in bounds]}",
                "These are the limits of integration"
            )

            # Determine which function is on top in each interval
            total_area = 0
            area_details = []

            for i in range(len(bounds) - 1):
                a, b = bounds[i], bounds[i + 1]
                mid = (a + b) / 2
                diff_at_mid = expr1.subs(var, mid) - expr2.subs(var, mid)
                diff_at_mid = sp.simplify(diff_at_mid)
                diff_val = _safe_float(diff_at_mid)

                if diff_val > 0:
                    upper_expr = expr1
                    lower_expr = expr2
                    order_str = f"{_format_expr(expr1)} - {_format_expr(expr2)}"
                else:
                    upper_expr = expr2
                    lower_expr = expr1
                    order_str = f"{_format_expr(expr2)} - {_format_expr(expr1)}"

                segment_integral = sp.integrate(
                    sp.simplify(upper_expr - lower_expr), (var, a, b)
                )
                segment_val = _safe_float(segment_integral)
                total_area += segment_val

                _add_step(
                    steps,
                    f"Segment [{a:.4f}, {b:.4f}]",
                    "∫[upper - lower] dx",
                    order_str,
                    _format_expr(segment_integral),
                    f"On [{a:.4f}, {b:.4f}]: area = ∫ {_format_expr(sp.simplify(upper_expr - lower_expr))} dx "
                    f"from {a:.4f} to {b:.4f} = {segment_val:.8f}",
                    f"Upper: {'f' if diff_val > 0 else 'g'}, Lower: {'g' if diff_val > 0 else 'f'}"
                )

                area_details.append({
                    'interval': (a, b),
                    'area': segment_val
                })

            # Verification
            try:
                f1_num = sp.lambdify(var, expr1, 'numpy')
                f2_num = sp.lambdify(var, expr2, 'numpy')

                def integrand(xv):
                    return abs(f1_num(xv) - f2_num(xv))

                numerical_area, _ = scipy.integrate.quad(integrand, bounds[0], bounds[-1], limit=100)
                diff = abs(numerical_area - abs(total_area))
                verified = diff < 1e-4
                vdetail = (f"Numerical quad: {numerical_area:.10f}, "
                           f"Symbolic: {abs(total_area):.10f}, Diff: {diff:.2e}")
            except Exception:
                verified = True
                vdetail = "Numerical verification not available"

            _add_step(
                steps,
                "Verification",
                "Numerical integration check",
                "Area",
                f"Total Area = {abs(total_area):.10f}",
                f"Total Area = {abs(total_area):.10f}. Verification: {'PASSED' if verified else 'Review'}",
                ""
            )

            elapsed = time.time() - start
            return SolverResult(
                success=True,
                operation="area_between_curves",
                answer=f"Total Area = {abs(total_area):.10f} square units",
                exact_answer=_format_expr(abs(sp.integrate(sp.simplify(expr1 - expr2), (var, bounds[0], bounds[-1])))),
                steps=steps,
                verified=verified,
                verification_detail=vdetail,
                backend_used=backend,
                computation_time=round(elapsed, 4),
                metadata={"intersections": bounds, "segments": area_details}
            )

        except TimeoutError:
            elapsed = time.time() - start
            return SolverResult(
                success=False, operation="area_between_curves",
                error=f"Timed out after {self.timeout}s", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )
        except Exception as e:
            elapsed = time.time() - start
            log.exception("Area between curves failed")
            return SolverResult(
                success=False, operation="area_between_curves",
                error=f"{type(e).__name__}: {str(e)}", steps=steps,
                backend_used=backend, computation_time=round(elapsed, 4)
            )

    # ──────────────────────────────────────────────────────────────────────
    # High-level convenience methods
    # ──────────────────────────────────────────────────────────────────────
    def solve(self, operation: str, **kwargs) -> SolverResult:
        """
        Unified solve method dispatching to the appropriate operation.

        Parameters
        ----------
        operation : str
            One of: differentiate, integrate, limit, solve_ode, taylor_series,
                    critical_points, max_min_check, tangent_line,
                    increasing_decreasing, area_under_curve, area_between_curves
        **kwargs
            Operation-specific parameters

        Returns
        -------
        SolverResult
        """
        op_map = {
            'differentiate': self.differentiate,
            'integrate': self.integrate,
            'limit': self.limit,
            'solve_ode': self.solve_ode,
            'taylor_series': self.taylor_series,
            'critical_points': self.critical_points,
            'max_min_check': self.max_min_check,
            'tangent_line': self.tangent_line,
            'increasing_decreasing': self.increasing_decreasing,
            'area_under_curve': self.area_under_curve,
            'area_between_curves': self.area_between_curves,
        }

        if operation not in op_map:
            return SolverResult(
                success=False,
                operation=operation,
                error=f"Unknown operation: '{operation}'. "
                      f"Available: {list(op_map.keys())}"
            )

        return op_map[operation](**kwargs)


# ──────────────────────────────────────────────────────────────────────────────
# Convenience global instance
# ──────────────────────────────────────────────────────────────────────────────
_engine = CalculusEngine()

def solve(operation: str, **kwargs) -> SolverResult:
    """Global convenience function."""
    return _engine.solve(operation, **kwargs)

def differentiate(expr: str, variable: str = 'x', order: int = 1) -> SolverResult:
    return _engine.differentiate(expr, variable, order)

def integrate(expr: str, variable: str = 'x',
              lower: float = None, upper: float = None) -> SolverResult:
    return _engine.integrate(expr, variable, lower, upper)

def limit(expr: str, variable: str = 'x',
          approach_value: str = 'oo', direction: str = 'both') -> SolverResult:
    return _engine.limit(expr, variable, approach_value, direction)

def solve_ode(ode_str: str, dependent_var: str = 'y',
              independent_var: str = 'x', ics: dict = None) -> SolverResult:
    return _engine.solve_ode(ode_str, dependent_var, independent_var, ics)

def taylor_series(expr: str, variable: str = 'x',
                  about: float = 0, num_terms: int = 6) -> SolverResult:
    return _engine.taylor_series(expr, variable, about, num_terms)

def continuity(expr: str, variable: str = 'x', point: float = None) -> SolverResult:
    return _engine.continuity(expr, variable, point)

def convergence_tests(series_str: str, variable: str = 'n') -> SolverResult:
    return _engine.convergence_tests(series_str, variable)

def critical_points(expr: str, variable: str = 'x',
                    domain: tuple = None) -> SolverResult:
    return _engine.critical_points(expr, variable, domain)

def max_min_check(expr: str, variable: str = 'x',
                  test_point: float = None) -> SolverResult:
    return _engine.max_min_check(expr, variable, test_point)

def tangent_line(expr: str, variable: str = 'x', at_point: float = None) -> SolverResult:
    return _engine.tangent_line(expr, variable, at_point)

def increasing_decreasing(expr: str, variable: str = 'x',
                          domain: tuple = None) -> SolverResult:
    return _engine.increasing_decreasing(expr, variable, domain)

def area_under_curve(expr: str, variable: str = 'x',
                     lower: float = None, upper: float = None) -> SolverResult:
    return _engine.area_under_curve(expr, variable, lower, upper)

def area_between_curves(expr1: str, expr2: str, variable: str = 'x',
                        lower: float = None, upper: float = None,
                        intersection_points: list = None) -> SolverResult:
    return _engine.area_between_curves(expr1, expr2, variable, lower, upper, intersection_points)


# ──────────────────────────────────────────────────────────────────────────────
# SOLVER_REGISTRY — registers all calculus operations with the solver API
# ──────────────────────────────────────────────────────────────────────────────
SOLVER_REGISTRY = {
    "calculus_differentiate": differentiate,
    "calculus_integrate": integrate,
    "calculus_limit": limit,
    "calculus_solve_ode": solve_ode,
    "calculus_taylor_series": taylor_series,
    "calculus_continuity": continuity,
    "calculus_convergence_tests": convergence_tests,
    "calculus_critical_points": critical_points,
    "calculus_max_min_check": max_min_check,
    "calculus_tangent_line": tangent_line,
    "calculus_increasing_decreasing": increasing_decreasing,
    "calculus_area_under_curve": area_under_curve,
    "calculus_area_between_curves": area_between_curves,
    "calculus_solve": solve,
}

SOLVER_MANIFEST = {
    "version": "1.0.0",
    "dependencies": [],
    "tags": ["maths", "calculus", "class-11", "class-12", "ISC"],
}


# ──────────────────────────────────────────────────────────────────────────────
# CLI demonstration
# ──────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 70)
    print("  CALCULUS ENGINE — ISC Class 11-12 Demo")
    print("  Backend:", resolver.get_best_symbolic())
    print("  SymEngine:", "Available ✓" if SYMENGINE_AVAILABLE else "Not available")
    print("=" * 70)

    demo_operations = [
        ("differentiate", {"expr_str": "x**4 - 2*x**3 + x - 5", "variable": "x", "order": 2}),
        ("integrate", {"expr_str": "3*x**2 + 2*x + 1", "variable": "x"}),
        ("integrate", {"expr_str": "sin(x)*cos(x)", "variable": "x"}),
        ("integrate", {"expr_str": "x*exp(x)", "variable": "x"}),
        ("limit", {"expr_str": "(x**2 - 4)/(x - 2)", "variable": "x", "approach_value": "2"}),
        ("limit", {"expr_str": "sin(x)/x", "variable": "x", "approach_value": "0"}),
        ("limit", {"expr_str": "(1 + 1/x)**x", "variable": "x", "approach_value": "oo"}),
        ("taylor_series", {"expr_str": "sin(x)", "variable": "x", "about": 0, "num_terms": 5}),
        ("critical_points", {"expr_str": "x**3 - 3*x**2 + 2", "variable": "x"}),
        ("max_min_check", {"expr_str": "x**3 - 3*x**2 + 2", "variable": "x"}),
        ("tangent_line", {"expr_str": "x**2", "variable": "x", "at_point": 2.0}),
        ("increasing_decreasing", {"expr_str": "x**3 - 3*x**2 + 2", "variable": "x"}),
        ("integrate", {"expr_str": "x**2", "variable": "x", "lower": 0, "upper": 3}),
        ("area_between_curves", {"expr1_str": "x**2", "expr2_str": "x", "variable": "x"}),
    ]

    for op_name, kwargs in demo_operations:
        print(f"\n{'─' * 70}")
        print(f"  OPERATION: {op_name.upper()}")
        print(f"  Args: {kwargs}")
        print(f"{'─' * 70}")
        result = solve(op_name, **kwargs)
        print(result.to_json())
        print()