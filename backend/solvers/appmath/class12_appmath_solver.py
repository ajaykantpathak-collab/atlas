"""
ISC Class 12 Applied Mathematics - Complete Solver
solver_appmath_c12.py
"""

import math
import re
import random
from decimal import Decimal, ROUND_HALF_UP
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple, Union

import numpy as np
import pandas as pd
import sympy as sp
from scipy import stats
from scipy.optimize import linprog, minimize_scalar
from scipy.stats import (
    norm, binom, poisson, uniform,
    pearsonr, linregress
)

# ---------------------------------------------------------------------------
# core_calculus_engine import (external module expected alongside this file)
# ---------------------------------------------------------------------------
try:
    from core_calculus_engine import differentiate, integrate as _ce_integrate
    _CORE_CALCULUS_AVAILABLE = True
except ImportError:
    _CORE_CALCULUS_AVAILABLE = False


# ===========================================================================
# DATA STRUCTURES
# ===========================================================================

@dataclass
class SolverResult:
    """Unified result object returned by every solver function."""
    solution: Any = None
    steps: List[str] = field(default_factory=list)
    formula: str = ""
    verification: str = ""
    error: Optional[str] = None
    extra: Dict[str, Any] = field(default_factory=dict)

    def as_dict(self) -> Dict[str, Any]:
        d = {
            "solution": self.solution,
            "steps": self.steps,
            "formula": self.formula,
            "verification": self.verification,
            "error": self.error,
            "extra": self.extra,
        }
        return d


# ===========================================================================
# REGISTRY
# ===========================================================================

SOLVER_REGISTRY: Dict[str, callable] = {}


def _register(name: str, fn: callable):
    SOLVER_REGISTRY[name] = fn


# ===========================================================================
# HELPER UTILITIES
# ===========================================================================

def _step_list(*args) -> List[str]:
    return [str(a) for a in args]


def _safe_decimal(val: Union[float, int, str, Decimal], places: int = 2) -> Decimal:
    d = Decimal(str(val))
    quant = Decimal("1") / (Decimal("10") ** places)
    return d.quantize(quant, rounding=ROUND_HALF_UP)


def _matrix_to_list(mat) -> List[List[float]]:
    return [[float(x) for x in row] for row in mat.tolist()]


def _fmt_num(x: float, dp: int = 4) -> str:
    return f"{x:.{dp}f}"


# ===========================================================================
# 1. PERCENTAGE CALC
# ===========================================================================

def percentage_calc(
    value: Optional[float] = None,
    total: Optional[float] = None,
    percent: Optional[float] = None,
    *,
    operation: str = "find_percent",
) -> SolverResult:
    """
    Percentage calculator.
    operation:
      'find_percent'     -> (value/total)*100
      'find_value'       -> (percent/100)*total
      'find_total'       -> (value*100)/percent
      'percent_change'   -> ((new-old)/old)*100
    """
    steps: List[str] = []
    result: Dict[str, Any] = {}

    try:
        if operation == "find_percent":
            if value is None or total is None:
                raise ValueError("value and total required for find_percent")
            pct = (value / total) * 100
            steps = _step_list(
                f"Given: value = {value}, total = {total}",
                "Formula: Percentage = (value / total) * 100",
                f"Calculation: ({value} / {total}) * 100 = {_fmt_num(pct)}%",
            )
            result = {"percentage": pct}
            formula_used = "Percentage = (Part / Whole) x 100"

        elif operation == "find_value":
            if percent is None or total is None:
                raise ValueError("percent and total required for find_value")
            val = (percent / 100) * total
            steps = _step_list(
                f"Given: percent = {percent}%, total = {total}",
                "Formula: Value = (percent / 100) * total",
                f"Calculation: ({percent} / 100) * {total} = {_fmt_num(val)}",
            )
            result = {"value": val}
            formula_used = "Value = (Percentage / 100) x Total"

        elif operation == "find_total":
            if value is None or percent is None:
                raise ValueError("value and percent required for find_total")
            tot = (value * 100) / percent
            steps = _step_list(
                f"Given: value = {value}, percent = {percent}%",
                "Formula: Total = (value * 100) / percent",
                f"Calculation: ({value} * 100) / {percent} = {_fmt_num(tot)}",
            )
            result = {"total": tot}
            formula_used = "Total = (Part x 100) / Percentage"

        elif operation == "percent_change":
            if value is None or total is None:
                raise ValueError("new and old values required for percent_change")
            # value=new, total=old
            change = ((value - total) / total) * 100
            steps = _step_list(
                f"Given: new value = {value}, old value = {total}",
                "Formula: % Change = ((New - Old) / Old) * 100",
                f"Calculation: (({value} - {total}) / {total}) * 100 = {_fmt_num(change)}%",
            )
            result = {"percent_change": change}
            formula_used = "% Change = ((New Value - Old Value) / Old Value) x 100"

        else:
            raise ValueError(f"Unknown operation: {operation}")

        return SolverResult(solution=result, steps=steps, formula=formula_used)

    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("percentage_calc", percentage_calc)


# ===========================================================================
# 2. RATIO PROPORTION
# ===========================================================================

def ratio_proportion(
    a: float = None,
    b: float = None,
    c: float = None,
    d: float = None,
    *,
    operation: str = "check_proportion",
) -> SolverResult:
    """
    Ratio and proportion problems.
    operation:
      'check_proportion'   -> verify a:b = c:d
      'find_missing'       -> given a,b,c find d in a:b = c:d
      'compound_ratio'     -> compound ratio of two given ratios
      'duplicate_ratio'    -> duplicate ratio (square terms)
    """
    steps: List[str] = []
    try:
        if operation == "check_proportion":
            if None in (a, b, c, d):
                raise ValueError("a, b, c, d all required")
            lhs = a / b
            rhs = c / d
            is_prop = abs(lhs - rhs) < 1e-9
            steps = _step_list(
                f"Check: {a}:{b} = {c}:{d}",
                f"Compute a/b = {_fmt_num(lhs)}, c/d = {_fmt_num(rhs)}",
                f"{'PROPORTIONAL' if is_prop else 'NOT PROPORTIONAL'}: "
                f"{'a*d = b*c' if is_prop else 'a*d != b*c'}",
            )
            return SolverResult(
                solution={"is_proportion": is_prop, "a/b": lhs, "c/d": rhs},
                steps=steps,
                formula="a:b = c:d <=> a*d = b*c",
                verification=f"Cross-check: {a}*{d} = {_fmt_num(a*d)}, {b}*{c} = {_fmt_num(b*c)}",
            )

        elif operation == "find_missing":
            if None in (a, b, c):
                raise ValueError("a, b, c required; d is unknown")
            d_val = (b * c) / a
            steps = _step_list(
                f"Given: {a}:{b} = {c}:d",
                "Using proportion property: a*d = b*c",
                f"d = (b * c) / a = ({b} * {c}) / {a} = {_fmt_num(d_val)}",
            )
            return SolverResult(
                solution={"d": d_val},
                steps=steps,
                formula="d = (b * c) / a",
                verification=f"Verify: {a} * {_fmt_num(d_val)} = {_fmt_num(b*c)}",
            )

        elif operation == "compound_ratio":
            if None in (a, b, c, d):
                raise ValueError("a:b and c:d both required")
            cr_a = a * c
            cr_b = b * d
            steps = _step_list(
                f"Ratios: {a}:{b} and {c}:{d}",
                "Compound ratio = (a*c):(b*d)",
                f"= {a*c}:{b*d}",
            )
            return SolverResult(
                solution={"compound_ratio": f"{cr_a}:{cr_b}"},
                steps=steps,
                formula="Compound Ratio = (a*c):(b*d)",
            )

        elif operation == "duplicate_ratio":
            if None in (a, b):
                raise ValueError("a:b required")
            dup_a = a ** 2
            dup_b = b ** 2
            steps = _step_list(
                f"Given ratio: {a}:{b}",
                "Duplicate ratio = (a^2):(b^2)",
                f"= {a**2}:{b**2}",
            )
            return SolverResult(
                solution={"duplicate_ratio": f"{dup_a}:{dup_b}"},
                steps=steps,
                formula="Duplicate Ratio = a^2 : b^2",
            )

        else:
            raise ValueError(f"Unknown operation: {operation}")

    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("ratio_proportion", ratio_proportion)


# ===========================================================================
# 3. MATRIX OPS
# ===========================================================================

def matrix_ops(
    matrix_a: List[List[float]],
    matrix_b: Optional[List[List[float]]] = None,
    scalar: Optional[float] = None,
    *,
    operation: str = "add",
) -> SolverResult:
    """
    Matrix operations.
    operations: add, subtract, multiply, scalar_mult, transpose, inverse
    """
    steps: List[str] = []
    try:
        A = sp.Matrix(matrix_a)

        if operation == "transpose":
            AT = A.T
            steps = _step_list(
                f"Matrix A = {_matrix_to_list(A)}",
                "Transpose: swap rows and columns",
                f"A^T = {_matrix_to_list(AT)}",
            )
            return SolverResult(
                solution={"transpose": _matrix_to_list(AT)},
                steps=steps,
                formula="A^T[i][j] = A[j][i]",
            )

        if operation == "inverse":
            if A.rows != A.cols:
                raise ValueError("Only square matrices can be inverted")
            det_A = float(A.det())
            if abs(det_A) < 1e-9:
                raise ValueError("Matrix is singular, inverse does not exist")
            A_inv = A.inv()
            steps = _step_list(
                f"Matrix A = {_matrix_to_list(A)}",
                f"Step 1: det(A) = {_fmt_num(det_A)}",
                "Step 2: A_inv = adj(A) / det(A)",
                f"A^-1 = {_matrix_to_list(A_inv)}",
            )
            return SolverResult(
                solution={"inverse": _matrix_to_list(A_inv), "det": det_A},
                steps=steps,
                formula="A^-1 = adj(A) / det(A)",
                verification=f"A * A^-1 should equal Identity",
            )

        if matrix_b is None and operation not in ("scalar_mult",):
            raise ValueError("matrix_b required for this operation")

        B = sp.Matrix(matrix_b) if matrix_b else None

        if operation == "add":
            if A.rows != B.rows or A.cols != B.cols:
                raise ValueError("Matrices must have same dimensions for addition")
            C = A + B
            steps = _step_list(
                f"A = {_matrix_to_list(A)}",
                f"B = {_matrix_to_list(B)}",
                "C = A + B (element-wise addition)",
                f"C = {_matrix_to_list(C)}",
            )
            return SolverResult(
                solution={"result": _matrix_to_list(C)},
                steps=steps,
                formula="C[i][j] = A[i][j] + B[i][j]",
            )

        if operation == "subtract":
            if A.rows != B.rows or A.cols != B.cols:
                raise ValueError("Matrices must have same dimensions")
            C = A - B
            steps = _step_list(
                f"A = {_matrix_to_list(A)}",
                f"B = {_matrix_to_list(B)}",
                "C = A - B (element-wise subtraction)",
                f"C = {_matrix_to_list(C)}",
            )
            return SolverResult(
                solution={"result": _matrix_to_list(C)},
                steps=steps,
                formula="C[i][j] = A[i][j] - B[i][j]",
            )

        if operation == "multiply":
            if A.cols != B.rows:
                raise ValueError("Columns of A must equal rows of B")
            C = A * B
            steps = _step_list(
                f"A ({A.rows}x{A.cols}) = {_matrix_to_list(A)}",
                f"B ({B.rows}x{B.cols}) = {_matrix_to_list(B)}",
                "C = A x B: C[i][j] = sum(A[i][k]*B[k][j])",
                f"C ({C.rows}x{C.cols}) = {_matrix_to_list(C)}",
            )
            return SolverResult(
                solution={"result": _matrix_to_list(C), "shape": f"{C.rows}x{C.cols}"},
                steps=steps,
                formula="C[i][j] = sum_k(A[i][k] * B[k][j])",
            )

        if operation == "scalar_mult":
            if scalar is None:
                raise ValueError("scalar required for scalar_mult")
            C = A * scalar
            steps = _step_list(
                f"Matrix A = {_matrix_to_list(A)}",
                f"Scalar k = {scalar}",
                "Result = k * A (each element multiplied by k)",
                f"Result = {_matrix_to_list(C)}",
            )
            return SolverResult(
                solution={"result": _matrix_to_list(C)},
                steps=steps,
                formula="(kA)[i][j] = k * A[i][j]",
            )

        raise ValueError(f"Unknown operation: {operation}")

    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("matrix_ops", matrix_ops)


# ===========================================================================
# 4. DETERMINANT CALC
# ===========================================================================

def determinant_calc(matrix: List[List[float]]) -> SolverResult:
    steps: List[str] = []
    try:
        A = sp.Matrix(matrix)
        n = A.rows
        det = float(A.det())
        steps = _step_list(
            f"Matrix A ({n}x{n}) = {_matrix_to_list(A)}",
            f"Using cofactor expansion or direct formula for {n}x{n} matrix",
            f"det(A) = {_fmt_num(det)}",
        )
        # verification by laplace
        if n == 2:
            a, b, c, d_val = float(A[0,0]), float(A[0,1]), float(A[1,0]), float(A[1,1])
            manual = a*d_val - b*c
            steps.append(f"Verification (2x2): ad-bc = {a}*{d_val} - {b}*{c} = {_fmt_num(manual)}")
        elif n == 3:
            manual = float(A.det(method="berkowitz"))
            steps.append(f"Verification via Berkowitz: {_fmt_num(manual)}")
        return SolverResult(
            solution={"determinant": det, "order": n},
            steps=steps,
            formula=f"det(A) for {n}x{n} matrix",
            verification=f"det = {_fmt_num(det)}",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("determinant_calc", determinant_calc)


# ===========================================================================
# 5. DIFFERENTIATE  (delegates to core_calculus_engine)
# ===========================================================================

def differentiate(expr_str: str, var: str = "x", order: int = 1) -> SolverResult:
    """
    Differentiate expr_str w.r.t. var.
    Falls back to sympy if core_calculus_engine is unavailable.
    """
    steps: List[str] = []
    try:
        x = sp.Symbol(var)
        expr = sp.sympify(expr_str)
        steps.append(f"Function: f({var}) = {expr}")

        if _CORE_CALCULUS_AVAILABLE:
            steps.append("Using core_calculus_engine.differentiate")
            result = _ce_integrate.__module__  # just confirm import worked
            # Call the imported differentiate from core engine
            from core_calculus_engine import differentiate as ce_diff
            derivative = ce_diff(expr_str, var, order)
        else:
            steps.append("core_calculus_engine not found, using sympy directly")
            derivative = sp.diff(expr, x, order)

        steps.append(f"Rule applied: d/d{var}(f) = {derivative}")
        steps.append(f"Method: Symbolic differentiation (order={order})")
        return SolverResult(
            solution={"derivative": str(derivative)},
            steps=steps,
            formula=f"d^{order}/d{var}^{order}",
            verification=f"Result: {derivative}",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("differentiate", differentiate)


# ===========================================================================
# 6. INTEGRATE  (delegates to core_calculus_engine)
# ===========================================================================

def integrate(expr_str: str, var: str = "x", lower: Optional[float] = None,
              upper: Optional[float] = None) -> SolverResult:
    """
    Integrate expr_str w.r.t. var.
    If lower and upper are given, computes definite integral.
    Falls back to sympy if core_calculus_engine is unavailable.
    """
    steps: List[str] = []
    try:
        x = sp.Symbol(var)
        expr = sp.sympify(expr_str)

        if _CORE_CALCULUS_AVAILABLE:
            steps.append("Using core_calculus_engine.integrate")
            from core_calculus_engine import integrate as ce_int
            if lower is not None and upper is not None:
                result = ce_int(expr_str, var, lower, upper)
                steps.append(f"Definite integral from {lower} to {upper}")
            else:
                result = ce_int(expr_str, var)
                steps.append("Indefinite integral")
        else:
            steps.append("core_calculus_engine not found, using sympy directly")
            if lower is not None and upper is not None:
                result = sp.integrate(expr, (x, lower, upper))
                steps.append(f"Definite integral from {lower} to {upper}")
            else:
                result = sp.integrate(expr, x)
                steps.append("Indefinite integral")

        steps.append(f"Result: {result}")
        return SolverResult(
            solution={"integral": str(result)},
            steps=steps,
            formula="integral(f(x)) dx",
            verification=f"Verify: d/dx(result) = {sp.diff(result, x) if lower is None else 'N/A (definite)'}",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("integrate", integrate)


# ===========================================================================
# 7. RATE OF CHANGE
# ===========================================================================

def rate_of_change(
    x_vals: List[float],
    y_vals: List[float],
    at_x: Optional[float] = None,
    method: str = "average",
) -> SolverResult:
    """
    Compute rate of change.
    method: 'average' or 'instantaneous' (via numerical derivative)
    """
    steps: List[str] = []
    try:
        n = len(x_vals)
        if n != len(y_vals):
            raise ValueError("x and y must have same length")
        if n < 2:
            raise ValueError("Need at least 2 data points")

        x_arr = np.array(x_vals)
        y_arr = np.array(y_vals)

        if method == "average":
            avg_rate = (y_vals[-1] - y_vals[0]) / (x_vals[-1] - x_vals[0])
            steps = _step_list(
                f"Data points: {list(zip(x_vals, y_vals))}",
                "Formula: Average rate of change = (y2 - y1) / (x2 - x1)",
                f"= ({y_vals[-1]} - {y_vals[0]}) / ({x_vals[-1]} - {x_vals[0]})",
                f"= {_fmt_num(avg_rate)}",
            )
            return SolverResult(
                solution={"average_rate_of_change": avg_rate},
                steps=steps,
                formula="AROC = (f(b) - f(a)) / (b - a)",
            )

        elif method == "instantaneous":
            if at_x is None:
                raise ValueError("at_x required for instantaneous rate")
            # Find closest point and compute numerical derivative
            idx = int(np.argmin(np.abs(x_arr - at_x)))
            if idx == 0:
                deriv = (y_arr[1] - y_arr[0]) / (x_arr[1] - x_arr[0])
            elif idx == n - 1:
                deriv = (y_arr[-1] - y_arr[-2]) / (x_arr[-1] - x_arr[-2])
            else:
                deriv = (y_arr[idx + 1] - y_arr[idx - 1]) / (x_arr[idx + 1] - x_arr[idx - 1])
            steps = _step_list(
                f"Approximate IROC at x = {at_x}",
                f"Closest data point index: {idx} (x={x_arr[idx]})",
                "Formula (central difference): (y[i+1] - y[i-1]) / (x[i+1] - x[i-1])",
                f"IROC = {_fmt_num(deriv)}",
            )
            return SolverResult(
                solution={"instantaneous_rate": deriv, "at_x": at_x},
                steps=steps,
                formula="IROC approx = (f(x+h) - f(x-h)) / 2h",
            )
        else:
            raise ValueError(f"Unknown method: {method}")
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("rate_of_change", rate_of_change)


# ===========================================================================
# 8. MAX MIN APPLICATION
# ===========================================================================

def max_min_application(
    expr_str: str,
    var: str = "x",
    domain: Optional[Tuple[float, float]] = None,
) -> SolverResult:
    """
    Find maxima and minima of a function using calculus.
    """
    steps: List[str] = []
    try:
        x = sp.Symbol(var, real=True)
        expr = sp.sympify(expr_str)
        steps.append(f"Function: f({var}) = {expr}")

        # Step 1: find first derivative
        d1 = sp.diff(expr, x)
        steps.append(f"Step 1: f'({var}) = d/d{var}(f) = {d1}")

        # Step 2: find critical points
        critical_points = sp.solve(sp.Eq(d1, 0), x)
        real_cps = [cp for cp in critical_points if cp.is_real]
        steps.append(f"Step 2: Set f'({var}) = 0")
        steps.append(f"Critical points: {real_cps}")

        # Step 3: second derivative test
        d2 = sp.diff(d1, x)
        steps.append(f"Step 3: f''({var}) = {d2}")

        extrema = []
        for cp in real_cps:
            if cp.is_number:
                cp_val = float(cp)
                d2_val = float(d2.subs(x, cp))
                if domain and (cp_val < domain[0] or cp_val > domain[1]):
                    continue
                f_val = float(expr.subs(x, cp))
                if d2_val > 0:
                    etype = "Minimum"
                elif d2_val < 0:
                    etype = "Maximum"
                else:
                    etype = "Indeterminate (check higher derivatives)"
                extrema.append({
                    "type": etype,
                    "x": cp_val,
                    "f(x)": f_val,
                    "f''(x)": d2_val,
                })
                steps.append(f"  At {var}={cp_val}: f({var})={_fmt_num(f_val)}, f''={_fmt_num(d2_val)} -> {etype}")

        return SolverResult(
            solution={"extrema": extrema},
            steps=steps,
            formula="f'(x)=0 gives critical points; f''(x)>0 => min, f''(x)<0 => max",
            verification=f"Number of critical points found: {len(real_cps)}",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("max_min_application", max_min_application)


# ===========================================================================
# 9. PROBABILITY DISTRIBUTION
# ===========================================================================

def probability_dist(
    distribution: str = "binomial",
    n: int = 10,
    p: float = 0.5,
    k: Optional[int] = None,
    mean_val: Optional[float] = None,
    std_val: Optional[float] = None,
    lam: Optional[float] = None,
) -> SolverResult:
    """
    Probability distribution calculator.
    distributions: 'binomial', 'poisson', 'normal', 'uniform'
    """
    steps: List[str] = []
    try:
        if distribution == "binomial":
            if k is None:
                raise ValueError("k (number of successes) required for binomial")
            prob = binom.pmf(k, n, p)
            mean_b = n * p
            var_b = n * p * (1 - p)
            steps = _step_list(
                f"Binomial: n={n}, p={p}, k={k}",
                "Formula: P(X=k) = C(n,k) * p^k * (1-p)^(n-k)",
                f"C({n},{k}) = {math.comb(n,k)}",
                f"P(X={k}) = {math.comb(n,k)} * {p}^{k} * {(1-p)}^{n-k}",
                f"P(X={k}) = {_fmt_num(prob, 6)}",
                f"Mean = np = {mean_b}, Variance = np(1-p) = {_fmt_num(var_b)}",
            )
            return SolverResult(
                solution={
                    "P(X=k)": prob,
                    "mean": mean_b,
                    "variance": var_b,
                    "std_dev": math.sqrt(var_b),
                },
                steps=steps,
                formula="P(X=k) = C(n,k) p^k (1-p)^(n-k)",
                verification=f"Cumulative P(X<={k}) = {_fmt_num(binom.cdf(k,n,p), 6)}",
            )

        elif distribution == "poisson":
            if lam is None and mean_val is not None:
                lam = mean_val
            if lam is None:
                raise ValueError("lam (lambda) required for poisson")
            if k is None:
                raise ValueError("k required for poisson")
            prob = poisson.pmf(k, lam)
            steps = _step_list(
                f"Poisson: lambda={lam}, k={k}",
                "Formula: P(X=k) = (e^-lambda * lambda^k) / k!",
                f"e^-{lam} = {_fmt_num(math.exp(-lam), 6)}",
                f"{lam}^{k} = {lam**k}, {k}! = {math.factorial(k)}",
                f"P(X={k}) = {_fmt_num(prob, 6)}",
                f"Mean = Variance = lambda = {lam}",
            )
            return SolverResult(
                solution={"P(X=k)": prob, "mean": lam, "variance": lam},
                steps=steps,
                formula="P(X=k) = e^-lambda * lambda^k / k!",
            )

        elif distribution == "normal":
            if mean_val is None or std_val is None:
                raise ValueError("mean and std required for normal")
            if k is None:
                raise ValueError("k required for normal")
            z = (k - mean_val) / std_val
            prob = norm.cdf(k, mean_val, std_val)
            steps = _step_list(
                f"Normal: mean={mean_val}, std={std_val}, x={k}",
                f"Z = (x - mean) / std = ({k} - {mean_val}) / {std_val} = {_fmt_num(z)}",
                f"P(X <= {k}) = P(Z <= {_fmt_num(z)}) = {_fmt_num(prob, 6)}",
            )
            return SolverResult(
                solution={"z_score": z, "P(X<=k)": prob, "P(X>k)": 1 - prob},
                steps=steps,
                formula="Z = (X - mu) / sigma; P from standard normal table",
            )

        elif distribution == "uniform":
            a = mean_val if mean_val is not None else 0
            b = std_val if std_val is not None else 1
            if k is None:
                raise ValueError("k required for uniform")
            cdf_val = uniform.cdf(k, loc=a, scale=b - a)
            steps = _step_list(
                f"Uniform: a={a}, b={b}, x={k}",
                f"PDF = 1/(b-a) = {_fmt_num(1/(b-a))}",
                f"P(X <= {k}) = ({k} - {a}) / ({b} - {a}) = {_fmt_num(cdf_val, 6)}",
            )
            return SolverResult(
                solution={"P(X<=k)": cdf_val},
                steps=steps,
                formula="P(X<=x) = (x-a)/(b-a) for Uniform(a,b)",
            )

        else:
            raise ValueError(f"Unknown distribution: {distribution}")

    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("probability_dist", probability_dist)


# ===========================================================================
# 10. BAYES CALC
# ===========================================================================

def bayes_calc(
    priors: List[float],
    likelihoods: List[float],
    event: str = "B",
) -> SolverResult:
    """
    Bayes' theorem calculator.
    P(A_i|B) = P(B|A_i)*P(A_i) / sum_j(P(B|A_j)*P(A_j))
    priors: P(A_i) for each hypothesis
    likelihoods: P(B|A_i) for each hypothesis
    """
    steps: List[str] = []
    try:
        if len(priors) != len(likelihoods):
            raise ValueError("priors and likelihoods must have same length")
        n = len(priors)

        # compute joint probabilities
        joints = [p * l_val for p, l_val in zip(priors, likelihoods)]
        total = sum(joints)

        if abs(total) < 1e-12:
            raise ValueError("Total probability is zero; check inputs")

        posteriors = [j / total for j in joints]
        hypothesis_labels = [f"H{i+1}" for i in range(n)]

        steps = _step_list(
            "Bayes' Theorem: P(H_i|E) = P(E|H_i)*P(H_i) / P(E)",
            f"Priors P(H_i): {[f'P({hypothesis_labels[i]})={_fmt_num(p,4)}' for i,p in enumerate(priors)]}",
            f"Likelihoods P(E|H_i): {[f'P(E|{hypothesis_labels[i]})={_fmt_num(l,4)}' for i,l in enumerate(likelihoods)]}",
            "Step 1: Compute joint probabilities P(E|H_i)*P(H_i)",
        )
        for i, j in enumerate(joints):
            steps.append(f"  Joint for {hypothesis_labels[i]} = {_fmt_num(j, 6)}")
        steps.append(f"Step 2: Total evidence P(E) = sum of joints = {_fmt_num(total, 6)}")
        steps.append("Step 3: Posterior probabilities P(H_i|E)")
        for i, post in enumerate(posteriors):
            steps.append(f"  P({hypothesis_labels[i]}|E) = {_fmt_num(post, 6)}")

        return SolverResult(
            solution={
                "posteriors": dict(zip(hypothesis_labels, posteriors)),
                "joints": dict(zip(hypothesis_labels, joints)),
                "total_evidence": total,
            },
            steps=steps,
            formula="P(H_i|E) = P(E|H_i)*P(H_i) / sum(P(E|H_j)*P(H_j))",
            verification=f"Sum of posteriors = {_fmt_num(sum(posteriors))} (should be 1)",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("bayes_calc", bayes_calc)


# ===========================================================================
# 11. LPP GRAPHICAL
# ===========================================================================

def lpp_graphical(
    objective_coeffs: List[float],
    constraints: List[Dict[str, Any]],
    direction: str = "max",
    constraint_types: Optional[List[str]] = None,
) -> SolverResult:
    """
    Solve 2-variable LPP graphically.
    objective_coeffs: [c1, c2] for Z = c1*x + c2*y
    constraints: list of dicts with 'coeffs'=[a,b], 'rhs'=value
    constraint_types: list of '<=' or '>=' strings
    direction: 'max' or 'min'
    """
    steps: List[str] = []
    try:
        if len(objective_coeffs) != 2:
            raise ValueError("Graphical method requires exactly 2 variables")
        c1, c2 = objective_coeffs
        steps.append(f"Objective: Z = {c1}x + {c2}y ({direction}imize)")

        # build scipy linprog formulation
        c_scipy = [-v for v in objective_coeffs] if direction == "max" else objective_coeffs[:]
        A_ub_list = []
        b_ub_list = []
        A_eq_list = []
        b_eq_list = []

        for i, con in enumerate(constraints):
            ctype = (constraint_types[i] if constraint_types and i < len(constraint_types) else "<=")
            coeffs = con["coeffs"]
            rhs = con["rhs"]
            if ctype == "<=":
                A_ub_list.append(coeffs)
                b_ub_list.append(rhs)
            elif ctype == ">=":
                A_ub_list.append([-v for v in coeffs])
                b_ub_list.append(-rhs)
            else:
                A_eq_list.append(coeffs)
                b_eq_list.append(rhs)
            steps.append(f"Constraint {i+1}: {''.join(f'{coeffs[j]}{['x','y'][j]}' for j in range(2))} {ctype} {rhs}")

        bounds = [(0, None), (0, None)]

        res = linprog(c_scipy,
                      A_ub=A_ub_list if A_ub_list else None,
                      b_ub=b_ub_list if b_ub_list else None,
                      A_eq=A_eq_list if A_eq_list else None,
                      b_eq=b_eq_list if b_eq_list else None,
                      bounds=bounds, method="highs")

        if not res.success:
            return SolverResult(error=f"Optimization failed: {res.message}", steps=steps)

        x_opt, y_opt = res.x
        z_opt = -res.fun if direction == "max" else res.fun

        steps.append(f"Optimal solution: x = {_fmt_num(x_opt)}, y = {_fmt_num(y_opt)}")
        steps.append(f"Optimal Z = {_fmt_num(z_opt)}")

        # corner points analysis
        corner_points = [(0, 0)]
        for con in constraints:
            coeffs = con["coeffs"]
            rhs = con["rhs"]
            # intersection with axes
            if coeffs[0] != 0:
                corner_points.append((rhs / coeffs[0], 0))
            if coeffs[1] != 0:
                corner_points.append((0, rhs / coeffs[1]))
        # pairwise intersections
        for i in range(len(constraints)):
            for j in range(i + 1, len(constraints)):
                A_mat = np.array([constraints[i]["coeffs"], constraints[j]["coeffs"]], dtype=float)
                b_vec = np.array([constraints[i]["rhs"], constraints[j]["rhs"]], dtype=float)
                try:
                    sol = np.linalg.solve(A_mat, b_vec)
                    if all(v >= -1e-9 for v in sol):
                        corner_points.append((max(0, float(sol[0])), max(0, float(sol[1]))))
                except np.linalg.LinAlgError:
                    pass

        corner_points = list(set((round(x, 6), round(y, 6)) for x, y in corner_points))
        feasible_corners = []
        for cp in corner_points:
            feasible = True
            for con in constraints:
                coeffs = con["coeffs"]
                ctype = constraint_types[constraints.index(con)] if constraint_types else "<="
                val = sum(coeffs[i] * cp[i] for i in range(2))
                if ctype == "<=" and val > con["rhs"] + 1e-6:
                    feasible = False
                    break
                if ctype == ">=" and val < con["rhs"] - 1e-6:
                    feasible = False
                    break
            if feasible:
                z_val = sum(objective_coeffs[i] * cp[i] for i in range(2))
                feasible_corners.append((cp[0], cp[1], z_val))

        steps.append("Feasible corner points:")
        for cp in feasible_corners:
            steps.append(f"  ({_fmt_num(cp[0])}, {_fmt_num(cp[1])}) -> Z = {_fmt_num(cp[2])}")

        return SolverResult(
            solution={
                "optimal_x": x_opt,
                "optimal_y": y_opt,
                "optimal_z": z_opt,
                "corner_points": feasible_corners,
            },
            steps=steps,
            formula="Z = c1*x + c2*y; optimal at corner of feasible region",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("lpp_graphical", lpp_graphical)


# ===========================================================================
# 12. LPP FORMULATE
# ===========================================================================

def lpp_formulate(
    description: str,
    n_vars: int = 2,
) -> SolverResult:
    """
    Parse a word problem description and extract LPP components.
    This is a template/skeleton function. For real NLP-based formulation,
    the user would pass structured data or the description in a standard format.

    Expected format in description:
    'OBJECTIVE: maximize/minimize <expression>'
    'CONSTRAINT: <a>x + <b>y <= <rhs>'  (one per line)
    """
    steps: List[str] = []
    try:
        lines = [l.strip() for l in description.strip().split("\n") if l.strip()]
        obj_line = ""
        constraints = []
        non_negativity = True

        for line in lines:
            if line.lower().startswith("objective"):
                obj_line = line
            elif line.lower().startswith("constraint"):
                constraints.append(line)
            elif "non-negativity" in line.lower():
                non_negativity = "non-negativity" in line.lower()

        # Parse objective
        obj_match = re.search(
            r"(maximize|minimize)\s+(.+)", obj_line, re.IGNORECASE
        )
        if not obj_match:
            raise ValueError("Could not parse objective. Use: 'Objective: maximize 3x + 2y'")

        direction = obj_match.group(1).lower()
        obj_expr = obj_match.group(2).strip()

        # Parse constraints
        parsed_constraints = []
        for con in constraints:
            m = re.search(
                r"(\d*\.?\d*)\s*[a-zA-Z]?\s*\+\s*(\d*\.?\d*)\s*[a-zA-Z]?\s*(<=|>=|=)\s*(\d*\.?\d+)",
                con, re.IGNORECASE
            )
            if m:
                parsed_constraints.append({
                    "coeffs": [float(m.group(1)), float(m.group(2))],
                    "type": m.group(3),
                    "rhs": float(m.group(4)),
                })

        steps = _step_list(
            f"Parsed Objective: {direction} Z = {obj_expr}",
            f"Parsed Constraints: {len(parsed_constraints)} found",
            f"Non-negativity: {'x>=0, y>=0' if non_negativity else 'not specified'}",
            "LPP Formulation Complete",
        )
        return SolverResult(
            solution={
                "objective": obj_expr,
                "direction": direction,
                "constraints": parsed_constraints,
                "non_negativity": non_negativity,
            },
            steps=steps,
            formula="LPP = {Objective Function, Constraints, Non-negativity}",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("lpp_formulate", lpp_formulate)


# ===========================================================================
# 13. PERPETUITY
# ===========================================================================

def perpetuity(
    payment: float,
    rate: float,
    growth_rate: float = 0.0,
) -> SolverResult:
    """
    Calculate present value of perpetuity.
    growing_perpetuity: PV = C / (r - g)  (if r > g)
    """
    steps: List[str] = []
    try:
        rate_decimal = rate / 100
        if growth_rate != 0:
            g_decimal = growth_rate / 100
            if rate_decimal <= g_decimal:
                raise ValueError("For growing perpetuity, rate must be > growth rate")
            pv = payment / (rate_decimal - g_decimal)
            steps = _step_list(
                f"Growing Perpetuity: Annual payment C = {payment}, rate r = {rate}%, growth g = {growth_rate}%",
                "Formula: PV = C / (r - g)",
                f"PV = {payment} / ({rate_decimal} - {g_decimal})",
                f"PV = {payment} / {_fmt_num(rate_decimal - g_decimal, 6)}",
                f"PV = {_fmt_num(pv)}",
            )
            formula_used = "PV = C / (r - g)"
        else:
            pv = payment / rate_decimal
            steps = _step_list(
                f"Perpetuity: Annual payment C = {payment}, rate r = {rate}%",
                "Formula: PV = C / r",
                f"PV = {payment} / {_fmt_num(rate_decimal, 4)}",
                f"PV = {_fmt_num(pv)}",
            )
            formula_used = "PV = C / r"

        return SolverResult(
            solution={"present_value": _safe_decimal(pv, 2)},
            steps=steps,
            formula=formula_used,
            verification=f"Annual income from PV: {_safe_decimal(pv * rate_decimal, 2)} (approx equals payment)",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("perpetuity", perpetuity)


# ===========================================================================
# 14. ANNUITY
# ===========================================================================

def annuity(
    payment: float,
    rate: float,
    periods: int,
    annuity_type: str = "ordinary",
) -> SolverResult:
    """
    Calculate present and future value of annuity.
    types: 'ordinary' (end-of-period) or 'due' (beginning-of-period)
    """
    steps: List[str] = []
    try:
        r = rate / 100
        n = periods
        R = (1 + r) ** n

        if annuity_type == "ordinary":
            fv = payment * (R - 1) / r
            pv = payment * (1 - (1 + r) ** (-n)) / r
            steps = _step_list(
                f"Ordinary Annuity: Payment PMT={payment}, r={rate}%, n={n}",
                f"Step 1: (1+r)^n = (1+{r})^{n} = {_fmt_num(R, 6)}",
                "Formula FV: PMT * [(1+r)^n - 1] / r",
                f"FV = {payment} * ({_fmt_num(R,4)} - 1) / {_fmt_num(r,4)} = {_fmt_num(fv)}",
                "Formula PV: PMT * [1 - (1+r)^(-n)] / r",
                f"PV = {payment} * (1 - {_fmt_num((1+r)**(-n),4)}) / {_fmt_num(r,4)} = {_fmt_num(pv)}",
            )
        else:  # due
            fv = payment * (R - 1) / r * (1 + r)
            pv = payment * (1 - (1 + r) ** (-n)) / r * (1 + r)
            steps = _step_list(
                f"Annuity Due: Payment PMT={payment}, r={rate}%, n={n}",
                "Note: Each payment is one period earlier",
                f"FV = FV_ordinary * (1+r) = {_fmt_num(fv)}",
                f"PV = PV_ordinary * (1+r) = {_fmt_num(pv)}",
            )

        return SolverResult(
            solution={
                "future_value": _safe_decimal(fv, 2),
                "present_value": _safe_decimal(pv, 2),
            },
            steps=steps,
            formula="FV = PMT*[(1+r)^n - 1]/r; PV = PMT*[1-(1+r)^(-n)]/r",
            verification=f"Total paid = {payment*n}, FV = {_fmt_num(fv)}",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("annuity", annuity)


# ===========================================================================
# 15. SINKING FUND
# ===========================================================================

def sinking_fund(
    target_amount: float,
    rate: float,
    periods: int,
) -> SolverResult:
    """
    Calculate periodic payment to accumulate target amount.
    Formula: A = FV * r / [(1+r)^n - 1]
    """
    steps: List[str] = []
    try:
        r = rate / 100
        n = periods
        R = (1 + r) ** n
        payment = target_amount * r / (R - 1)

        steps = _step_list(
            f"Target FV = {target_amount}, rate = {rate}%, periods = {n}",
            "Formula: A = FV * r / [(1+r)^n - 1]",
            f"(1+r)^n = {_fmt_num(R, 6)}",
            f"A = {target_amount} * {_fmt_num(r, 6)} / ({_fmt_num(R, 4)} - 1)",
            f"A = {_fmt_num(payment, 4)}",
        )
        return SolverResult(
            solution={"periodic_payment": _safe_decimal(payment, 2)},
            steps=steps,
            formula="A = FV * r / [(1+r)^n - 1]",
            verification=f"Total paid over {n} periods: {_fmt_num(payment * n)}",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("sinking_fund", sinking_fund)


# ===========================================================================
# 16. EMI CALC
# ===========================================================================

def emi_calc(
    principal: float,
    annual_rate: float,
    months: int,
) -> SolverResult:
    """
    Calculate Equated Monthly Installment (EMI).
    Formula: EMI = P * r * (1+r)^n / [(1+r)^n - 1]
    where r = monthly rate, n = number of months
    """
    steps: List[str] = []
    try:
        r = annual_rate / 100 / 12
        n = months
        if abs(r) < 1e-12:
            emi = principal / n
        else:
            R = (1 + r) ** n
            emi = principal * r * R / (R - 1)

        total_payment = emi * n
        total_interest = total_payment - principal

        steps = _step_list(
            f"Principal P = {principal}, Annual Rate = {annual_rate}%, Tenure = {months} months",
            f"Monthly rate r = {annual_rate}% / 12 = {_fmt_num(r*100, 6)}% = {_fmt_num(r, 6)}",
            "Formula: EMI = P * r * (1+r)^n / [(1+r)^n - 1]",
            f"(1+r)^n = {_fmt_num((1+r)**n, 6)}",
            f"EMI = {principal} * {_fmt_num(r,6)} * {_fmt_num((1+r)**n,4)} / {_fmt_num((1+r)**n - 1,4)}",
            f"EMI = {_fmt_num(emi, 2)}",
            f"Total Payment = EMI * n = {_fmt_num(total_payment, 2)}",
            f"Total Interest = {_fmt_num(total_interest, 2)}",
        )
        return SolverResult(
            solution={
                "emi": _safe_decimal(emi, 2),
                "total_payment": _safe_decimal(total_payment, 2),
                "total_interest": _safe_decimal(total_interest, 2),
            },
            steps=steps,
            formula="EMI = P*r*(1+r)^n / [(1+r)^n - 1]",
            verification=f"Sum of EMIs = {_fmt_num(emi * n, 2)}, Principal+Interest = {_fmt_num(total_payment, 2)}",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("emi_calc", emi_calc)


# ===========================================================================
# 17. LOAN AMORTIZATION
# ===========================================================================

def loan_amortization(
    principal: float,
    annual_rate: float,
    months: int,
) -> SolverResult:
    """
    Generate complete loan amortization schedule.
    """
    steps: List[str] = []
    try:
        r = annual_rate / 100 / 12
        n = months
        if abs(r) < 1e-12:
            emi = principal / n
        else:
            R = (1 + r) ** n
            emi = principal * r * R / (R - 1)

        schedule = []
        balance = principal
        total_interest = 0.0
        total_principal = 0.0

        for i in range(1, n + 1):
            interest = balance * r
            principal_paid = emi - interest
            balance -= principal_paid
            balance = max(0, balance)
            total_interest += interest
            total_principal += principal_paid
            schedule.append({
                "month": i,
                "emi": round(emi, 2),
                "interest": round(interest, 2),
                "principal": round(principal_paid, 2),
                "balance": round(balance, 2),
            })

        steps = _step_list(
            f"Loan: P={principal}, rate={annual_rate}%, months={n}",
            f"Monthly EMI = {_fmt_num(emi, 2)}",
            "Amortization schedule generated (first 5 rows):",
        )
        for row in schedule[:5]:
            steps.append(
                f"  Month {row['month']}: EMI={row['emi']}, "
                f"Int={row['interest']}, Prin={row['principal']}, Bal={row['balance']}"
            )
        steps.append(f"  ... ({n} total rows) ...")
        steps.append(f"Total Interest paid = {_fmt_num(total_interest, 2)}")
        steps.append(f"Total Principal paid = {_fmt_num(total_principal, 2)}")

        df = pd.DataFrame(schedule)
        return SolverResult(
            solution={
                "emi": _safe_decimal(emi, 2),
                "total_interest": _safe_decimal(total_interest, 2),
                "schedule": df.to_dict("records"),
                "schedule_df": df,
            },
            steps=steps,
            formula="EMI = P*r*(1+r)^n / [(1+r)^n - 1]; per-month decomposition",
            verification=f"Sum of principal components = {_fmt_num(total_principal)} ~= {principal}",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("loan_amortization", loan_amortization)


# ===========================================================================
# 18. DEPRECIATION CALC
# ===========================================================================

def depreciation_calc(
    cost: float,
    salvage: float,
    life: int,
    method: str = "straight_line",
    *,
    rate: Optional[float] = None,
) -> SolverResult:
    """
    Calculate depreciation.
    methods: 'straight_line', 'reducing_balance', 'sum_of_years'
    """
    steps: List[str] = []
    try:
        depreciable = cost - salvage

        if method == "straight_line":
            annual_dep = depreciable / life
            schedule = []
            book_value = cost
            for year in range(1, life + 1):
                book_value -= annual_dep
                schedule.append({
                    "year": year,
                    "depreciation": round(annual_dep, 2),
                    "book_value": round(max(book_value, salvage), 2),
                })
            steps = _step_list(
                f"Straight Line: Cost={cost}, Salvage={salvage}, Life={life} years",
                f"Depreciable amount = {cost} - {salvage} = {depreciable}",
                f"Annual Depreciation = {depreciable} / {life} = {_fmt_num(annual_dep)}",
            )
            return SolverResult(
                solution={
                    "annual_depreciation": _safe_decimal(annual_dep, 2),
                    "schedule": schedule,
                },
                steps=steps,
                formula="Annual Dep = (Cost - Salvage) / Useful Life",
            )

        elif method == "reducing_balance":
            if rate is None:
                raise ValueError("rate (%) required for reducing_balance method")
            r = rate / 100
            schedule = []
            book_value = cost
            for year in range(1, life + 1):
                dep = book_value * r
                book_value -= dep
                schedule.append({
                    "year": year,
                    "depreciation": round(dep, 2),
                    "book_value": round(max(book_value, salvage), 2),
                })
            steps = _step_list(
                f"Reducing Balance: Cost={cost}, Salvage={salvage}, Rate={rate}%, Life={life}",
                f"Rate r = {rate}% = {r}",
                "Each year: Dep = Book Value * r",
            )
            for s in schedule:
                steps.append(f"  Year {s['year']}: Dep={s['depreciation']}, BV={s['book_value']}")
            return SolverResult(
                solution={"schedule": schedule, "rate": rate},
                steps=steps,
                formula="Dep_t = Book_Value_{t-1} * r",
            )

        elif method == "sum_of_years":
            syd = life * (life + 1) // 2
            schedule = []
            book_value = cost
            for year in range(1, life + 1):
                dep = depreciable * (life - year + 1) / syd
                book_value -= dep
                schedule.append({
                    "year": year,
                    "depreciation": round(dep, 2),
                    "book_value": round(max(book_value, salvage), 2),
                })
            steps = _step_list(
                f"Sum of Years Digits: Cost={cost}, Salvage={salvage}, Life={life}",
                f"SYD = n(n+1)/2 = {life}*{life+1}/2 = {syd}",
                f"Dep Year t = (Depreciable * (n-t+1)) / SYD",
            )
            return SolverResult(
                solution={"schedule": schedule, "syd": syd},
                steps=steps,
                formula="Dep_t = (C-S)*(n-t+1) / SYD",
            )

        else:
            raise ValueError(f"Unknown method: {method}")

    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("depreciation_calc", depreciation_calc)


# ===========================================================================
# 19-24. STATISTICAL MEASURES
# ===========================================================================

def mean(data: List[float], method: str = "direct") -> SolverResult:
    steps = []
    try:
        arr = np.array(data, dtype=float)
        if method == "direct":
            result_val = float(np.mean(arr))
            steps = _step_list(
                f"Data: {data}",
                "Mean = sum of all values / n",
                f"Sum = {_fmt_num(np.sum(arr))}, n = {len(arr)}",
                f"Mean = {_fmt_num(result_val)}",
            )
        elif method == "assumed_mean":
            assumed = data[0]
            deviations = [x - assumed for x in data]
            mean_val = assumed + sum(deviations) / len(data)
            steps = _step_list(
                f"Data: {data}",
                f"Assumed mean A = {assumed}",
                "Mean = A + sum(d_i) / n",
                f"Mean = {_fmt_num(mean_val)}",
            )
            result_val = mean_val
        else:
            raise ValueError(f"Unknown method: {method}")

        return SolverResult(
            solution={"mean": _safe_decimal(result_val, 4)},
            steps=steps,
            formula="Mean = sum(x) / n",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("mean", mean)


def median(data: List[float]) -> SolverResult:
    steps = []
    try:
        arr = sorted(data)
        n = len(arr)
        if n % 2 == 1:
            med = arr[n // 2]
            steps = _step_list(
                f"Sorted data: {arr}",
                f"n = {n} (odd)",
                f"Median = ({n}+1)/2-th term = {n//2+1}-th term = {med}",
            )
        else:
            med = (arr[n // 2 - 1] + arr[n // 2]) / 2
            steps = _step_list(
                f"Sorted data: {arr}",
                f"n = {n} (even)",
                f"Median = ({n}/2-th + {n//2+1}-th) / 2 = ({arr[n//2-1]} + {arr[n//2]}) / 2 = {_fmt_num(med)}",
            )
        return SolverResult(
            solution={"median": _safe_decimal(med, 4)},
            steps=steps,
            formula="Median: middle value (or average of two middle values for even n)",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("median", median)


def mode(data: List[float]) -> SolverResult:
    steps = []
    try:
        from collections import Counter
        freq = Counter(data)
        max_freq = max(freq.values())
        modes = [k for k, v in freq.items() if v == max_freq]
        if len(modes) == 1:
            steps = _step_list(
                f"Data: {data}",
                f"Frequency counts: {dict(freq)}",
                f"Mode = value with highest frequency = {modes[0]} (freq={max_freq})",
            )
        else:
            steps = _step_list(
                f"Data: {data}",
                f"Modes (bimodal/multimodal): {modes}",
                f"Each appears {max_freq} times",
            )
        return SolverResult(
            solution={"mode": modes if len(modes) > 1 else modes[0], "frequency": max_freq},
            steps=steps,
            formula="Mode = most frequently occurring value",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("mode", mode)


def std_dev(data: List[float], method: str = "sample") -> SolverResult:
    steps = []
    try:
        arr = np.array(data, dtype=float)
        n = len(arr)
        m = float(np.mean(arr))
        variance = float(np.sum((arr - m) ** 2) / (n - (1 if method == "sample" else 0)))
        std = math.sqrt(variance)
        steps = _step_list(
            f"Data: {data}",
            f"Mean = {_fmt_num(m)}",
            f"Deviations squared sum = {_fmt_num(np.sum((arr - m)**2))}",
            f"Variance (ddof={1 if method=='sample' else 0}) = {_fmt_num(variance)}",
            f"Std Dev = sqrt({_fmt_num(variance)}) = {_fmt_num(std)}",
        )
        return SolverResult(
            solution={
                "mean": _safe_decimal(m, 4),
                "variance": _safe_decimal(variance, 4),
                "std_dev": _safe_decimal(std, 4),
            },
            steps=steps,
            formula=f"sigma = sqrt(sum(x - mean)^2 / {'n-1' if method=='sample' else 'n'})",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("std_dev", std_dev)


def correlation(x: List[float], y: List[float], method: str = "pearson") -> SolverResult:
    steps = []
    try:
        x_arr = np.array(x, dtype=float)
        y_arr = np.array(y, dtype=float)
        n = len(x_arr)

        if method == "pearson":
            r, p_val = pearsonr(x_arr, y_arr)
            x_mean = np.mean(x_arr)
            y_mean = np.mean(y_arr)
            num = sum((x_arr[i] - x_mean) * (y_arr[i] - y_mean) for i in range(n))
            den_x = math.sqrt(sum((x_arr[i] - x_mean) ** 2 for i in range(n)))
            den_y = math.sqrt(sum((y_arr[i] - y_mean) ** 2 for i in range(n)))
            steps = _step_list(
                f"Data: X={x}, Y={y}",
                "Pearson r = sum[(x_i - x_bar)(y_i - y_bar)] / sqrt(sum(x_i-x_bar)^2 * sum(y_i-y_bar)^2)",
                f"Numerator = {_fmt_num(num, 4)}",
                f"Denominator = sqrt({_fmt_num(den_x**2,4)} * {_fmt_num(den_y**2,4)}) = {_fmt_num(den_x*den_y, 4)}",
                f"r = {_fmt_num(r, 6)}",
            )
            return SolverResult(
                solution={"r": _safe_decimal(r, 6), "p_value": p_val, "n": n},
                steps=steps,
                formula="r = sum((x-x_bar)(y-y_bar)) / sqrt(sum(x-x_bar)^2 * sum(y-y_bar)^2)",
            )
        else:
            raise ValueError(f"Unknown correlation method: {method}")
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("correlation", correlation)


def regression(x: List[float], y: List[float], predict_x: Optional[float] = None) -> SolverResult:
    steps = []
    try:
        x_arr = np.array(x, dtype=float)
        y_arr = np.array(y, dtype=float)
        result = linregress(x_arr, y_arr)
        slope = result.slope
        intercept = result.intercept
        r_sq = result.rvalue ** 2

        steps = _step_list(
            f"Data: X={x}, Y={y}",
            "Least Squares Regression: Y = a + bX",
            f"Slope b = {_fmt_num(slope, 6)}",
            f"Intercept a = {_fmt_num(intercept, 6)}",
            f"R^2 = {_fmt_num(r_sq, 6)}",
            f"Regression Equation: Y = {_fmt_num(intercept, 4)} + {_fmt_num(slope, 4)} * X",
        )
        sol = {
            "slope": _safe_decimal(slope, 6),
            "intercept": _safe_decimal(intercept, 6),
            "r_squared": _safe_decimal(r_sq, 6),
            "equation": f"Y = {_fmt_num(intercept, 4)} + {_fmt_num(slope, 4)}X",
        }
        if predict_x is not None:
            pred = intercept + slope * predict_x
            sol["predicted_y"] = _safe_decimal(pred, 4)
            steps.append(f"Prediction at X={predict_x}: Y = {_fmt_num(pred, 4)}")

        return SolverResult(solution=sol, steps=steps, formula="Y = a + bX (least squares)")
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("regression", regression)


# ===========================================================================
# 25. PRICE INDEX
# ===========================================================================

def price_index(
    base_prices: List[float],
    current_prices: List[float],
    base_quantities: List[float],
    current_quantities: Optional[List[float]] = None,
    index_type: str = "laspeyres",
) -> SolverResult:
    """
    Calculate price index.
    types: 'laspeyres', 'paasche', 'fisher'
    """
    steps: List[str] = []
    try:
        if len(base_prices) != len(current_prices) or len(base_prices) != len(base_quantities):
            raise ValueError("All input lists must have same length")
        n = len(base_prices)

        if current_quantities is None:
            current_quantities = base_quantities[:]

        base_value = sum(base_prices[i] * base_quantities[i] for i in range(n))
        curr_value_base_qty = sum(current_prices[i] * base_quantities[i] for i in range(n))
        curr_value_curr_qty = sum(current_prices[i] * current_quantities[i] for i in range(n))
        base_value_curr_qty = sum(base_prices[i] * current_quantities[i] for i in range(n))

        steps.append(f"Items: {n}")
        steps.append(f"Base period total value: sum(p0*q0) = {_fmt_num(base_value)}")

        if index_type == "laspeyres":
            # LPI = sum(p1*q0) / sum(p0*q0) * 100
            numerator = curr_value_base_qty
            lpi = (numerator / base_value) * 100
            steps.append("Laspeyres Index = sum(p1*q0) / sum(p0*q0) * 100")
            steps.append(f"= {_fmt_num(numerator)} / {_fmt_num(base_value)} * 100")
            steps.append(f"= {_fmt_num(lpi)}")
            return SolverResult(
                solution={"laspeyres_index": _safe_decimal(lpi, 2)},
                steps=steps,
                formula="LPI = sum(p1*q0) / sum(p0*q0) * 100",
            )

        elif index_type == "paasche":
            numerator = curr_value_curr_qty
            ppi = (numerator / base_value_curr_qty) * 100
            steps.append("Paasche Index = sum(p1*q1) / sum(p0*q1) * 100")
            steps.append(f"= {_fmt_num(numerator)} / {_fmt_num(base_value_curr_qty)} * 100")
            steps.append(f"= {_fmt_num(ppi)}")
            return SolverResult(
                solution={"paasche_index": _safe_decimal(ppi, 2)},
                steps=steps,
                formula="PPI = sum(p1*q1) / sum(p0*q1) * 100",
            )

        elif index_type == "fisher":
            lpi = (curr_value_base_qty / base_value) * 100
            ppi = (curr_value_curr_qty / base_value_curr_qty) * 100
            fi = math.sqrt(lpi * ppi)
            steps.append("Fisher Index = sqrt(Laspeyres * Paasche)")
            steps.append(f"LPI = {_fmt_num(lpi)}, PPI = {_fmt_num(ppi)}")
            steps.append(f"FI = sqrt({_fmt_num(lpi, 2)} * {_fmt_num(ppi, 2)}) = {_fmt_num(fi)}")
            return SolverResult(
                solution={
                    "laspeyres": _safe_decimal(lpi, 2),
                    "paasche": _safe_decimal(ppi, 2),
                    "fisher": _safe_decimal(fi, 2),
                },
                steps=steps,
                formula="FI = sqrt(LPI * PPI)",
            )
        else:
            raise ValueError(f"Unknown index type: {index_type}")

    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("price_index", price_index)


# ===========================================================================
# 26. TIME SERIES TREND
# ===========================================================================

def time_series_trend(
    time_periods: List[int],
    values: List[float],
    method: str = "least_squares",
    num_periods: int = 5,
) -> SolverResult:
    """
    Fit a trend line to time series data.
    methods: 'least_squares' (linear), 'moving_average' (period=3)
    num_periods: number of future periods to forecast (for least_squares)
    """
    steps: List[str] = []
    try:
        n = len(time_periods)
        if n != len(values):
            raise ValueError("time_periods and values must have same length")

        t = np.array(time_periods, dtype=float)
        y = np.array(values, dtype=float)

        if method == "least_squares":
            # Fit y = a + bt using normal equations
            t_mean = np.mean(t)
            y_mean = np.mean(y)
            b = sum((t[i] - t_mean) * (y[i] - y_mean) for i in range(n)) / sum((t[i] - t_mean) ** 2 for i in range(n))
            a = y_mean - b * t_mean

            steps = _step_list(
                f"Time series: t={time_periods}, Y={values}",
                f"Mean of t: {_fmt_num(t_mean)}, Mean of Y: {_fmt_num(y_mean)}",
                "Normal equations: sum(Y) = na + b*sum(t); sum(tY) = a*sum(t) + b*sum(t^2)",
                f"Slope b = {_fmt_num(b, 6)}",
                f"Intercept a = {_fmt_num(a, 6)}",
                f"Trend Equation: Y = {_fmt_num(a, 4)} + {_fmt_num(b, 4)} * t",
            )

            # Forecasts
            last_t = int(t[-1])
            forecasts = {}
            for p in range(1, num_periods + 1):
                t_f = last_t + p
                y_f = a + b * t_f
                forecasts[f"t={t_f}"] = _safe_decimal(y_f, 2)
                steps.append(f"Forecast t={t_f}: Y = {_fmt_num(y_f, 4)}")

            return SolverResult(
                solution={
                    "trend_equation": f"Y = {_fmt_num(a, 4)} + {_fmt_num(b, 4)}t",
                    "a": a,
                    "b": b,
                    "forecasts": forecasts,
                },
                steps=steps,
                formula="Y = a + bt (least squares linear trend)",
            )

        elif method == "moving_average":
            period = 3
            ma = []
            for i in range(n):
                if i < period - 1:
                    ma.append(None)
                else:
                    ma.append(sum(y[i - period + 1:i + 1]) / period)
            trend_vals = {f"t={time_periods[i]}": (_safe_decimal(ma[i], 2) if ma[i] is not None else None) for i in range(n)}
            steps = _step_list(
                f"Moving Average (period={period}):",
                "MA at each point = average of current and preceding (period-1) values",
            )
            for i, tv in enumerate(trend_vals.values()):
                steps.append(f"  t={time_periods[i]}: MA = {tv}")

            return SolverResult(
                solution={"moving_average": trend_vals, "period": period},
                steps=steps,
                formula=f"MA(t) = (Y_t + Y_t-1 + ... + Y_t-{period-1}) / {period}",
            )

        else:
            raise ValueError(f"Unknown method: {method}")

    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("time_series_trend", time_series_trend)


# ===========================================================================
# 27. (bonus helper) SOLVE SYSTEM OF LINEAR EQUATIONS
# ===========================================================================

def solve_linear_system(
    coefficients: List[List[float]],
    constants: List[float],
) -> SolverResult:
    """
    Solve a system of linear equations Ax = B.
    """
    steps: List[str] = []
    try:
        A = np.array(coefficients, dtype=float)
        B = np.array(constants, dtype=float)
        steps.append(f"Coefficient matrix A ({A.shape[0]}x{A.shape[1]}):")
        for row in A.tolist():
            steps.append(f"  {row}")
        steps.append(f"Constants B: {B.tolist()}")

        if A.shape[0] != A.shape[1]:
            raise ValueError("Only square systems supported in this function")
        det = np.linalg.det(A)
        steps.append(f"det(A) = {_fmt_num(det)}")
        if abs(det) < 1e-9:
            raise ValueError("System has no unique solution (det=0)")

        x = np.linalg.solve(A, B)
        for i, val in enumerate(x):
            steps.append(f"x{i+1} = {_fmt_num(val)}")

        return SolverResult(
            solution={"variables": {f"x{i+1}": _safe_decimal(v, 4) for i, v in enumerate(x)}},
            steps=steps,
            formula="Ax = B => x = A^-1 * B",
        )
    except Exception as e:
        return SolverResult(error=str(e), steps=[f"Error: {e}"])


_register("solve_linear_system", solve_linear_system)


# ===========================================================================
# QUICK VALIDATION ON LOAD
# ===========================================================================

def _run_self_tests():
    """Smoke-test every registered solver on trivial input."""
    tests = {
        "percentage_calc": lambda: percentage_calc(value=25, total=200, operation="find_percent"),
        "ratio_proportion": lambda: ratio_proportion(a=2, b=3, c=4, operation="find_missing"),
        "matrix_ops": lambda: matrix_ops(matrix_a=[[1,2],[3,4]], operation="transpose"),
        "determinant_calc": lambda: determinant_calc(matrix=[[1,2],[3,4]]),
        "differentiate": lambda: differentiate("x**2", "x"),
        "integrate": lambda: integrate("x**2", "x"),
        "rate_of_change": lambda: rate_of_change([1,2,3,4],[2,4,6,8], method="average"),
        "max_min_application": lambda: max_min_application("-x**2+4*x+1", "x"),
        "probability_dist": lambda: probability_dist("binomial", n=10, p=0.5, k=3),
        "bayes_calc": lambda: bayes_calc(priors=[0.3,0.7], likelihoods=[0.9,0.2]),
        "lpp_graphical": lambda: lpp_graphical(
            objective_coeffs=[3, 2],
            constraints=[
                {"coeffs":[2,1],"rhs":100},
                {"coeffs":[1,1],"rhs":80},
            ],
            constraint_types=["<=", "<="],
            direction="max",
        ),
        "lpp_formulate": lambda: lpp_formulate(
            "Objective: maximize 3x + 2y\nConstraint: 2x + y <= 100\nConstraint: x + y <= 80",
        ),
        "perpetuity": lambda: perpetuity(payment=1000, rate=10),
        "annuity": lambda: annuity(payment=1000, rate=12, periods=60),
        "sinking_fund": lambda: sinking_fund(target_amount=100000, rate=8, periods=10),
        "emi_calc": lambda: emi_calc(principal=100000, annual_rate=10, months=120),
        "loan_amortization": lambda: loan_amortization(principal=10000, annual_rate=10, months=12),
        "depreciation_calc": lambda: depreciation_calc(cost=50000, salvage=5000, life=5, method="straight_line"),
        "mean": lambda: mean([1,2,3,4,5]),
        "median": lambda: median([3,1,4,1,5,9,2]),
        "mode": lambda: mode([1,2,2,3,3,3,4]),
        "std_dev": lambda: std_dev([2,4,4,4,5,5,7,9]),
        "correlation": lambda: correlation([1,2,3,4,5],[2,4,5,4,6]),
        "regression": lambda: regression([1,2,3,4,5],[2,4,5,4,6]),
        "price_index": lambda: price_index(
            base_prices=[10,20,30], current_prices=[12,22,33],
            base_quantities=[5,3,2], index_type="laspeyres",
        ),
        "time_series_trend": lambda: time_series_trend(
            time_periods=[1,2,3,4,5], values=[10,12,15,14,18],
            method="least_squares", num_periods=2,
        ),
        "solve_linear_system": lambda: solve_linear_system(
            coefficients=[[2,1],[1,3]], constants=[5,10]
        ),
    }

    passed = 0
    failed = 0
    for name, fn in tests.items():
        try:
            res = fn()
            if res.error is None:
                passed += 1
            else:
                failed += 1
                print(f"  FAIL [{name}]: {res.error}")
        except Exception as e:
            failed += 1
            print(f"  EXCEPTION [{name}]: {e}")
    print(f"Self-test complete: {passed} passed, {failed} failed out of {len(tests)}")


if __name__ == "__main__":
    _run_self_tests()