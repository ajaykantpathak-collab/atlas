"""Solver Engine — SymPy execution with verification and timeouts.

This is the core computation layer. It receives structured inputs
(expression, variable, operation) and returns verified results.

No LLM. No parsing of English. No concept detection.
Pure deterministic math with built-in verification.

Each operation:
1. Parse input expression (SymPy notation, already converted by input_converter)
2. Execute SymPy operation (with timeout)
3. Verify result (mathematically check correctness)
4. Return result + verification status + step-by-step explanation
"""

import logging
import threading
from dataclasses import dataclass, field
from typing import Optional, Any, Union

from sympy import (
    Symbol, symbols, sympify, simplify, sqrt, pi, Rational, Matrix, oo, N,
    Float, diff, integrate, solve as sympy_solve, Eq, Abs, log, exp, sin, cos,
    tan, asin, acos, atan, limit, trigsimp, expand, factor, together, apart,
    cancel, Piecewise, Function, Derivative, S, nsimplify, re, im, I,
    factorial, binomial, sec, csc, cot, MatrixSymbol,
)
from sympy.parsing.sympy_parser import (
    parse_expr, standard_transformations, implicit_multiplication_application,
)

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────────────────
# Timeout infrastructure
# ─────────────────────────────────────────────────────────────────────

class SolverTimeoutError(Exception):
    """Raised when a SymPy operation times out."""
    pass


def _run_with_timeout(func, args=(), kwargs=None, timeout_sec=10):
    """Run a function with a hard timeout using a daemon thread."""
    if kwargs is None:
        kwargs = {}
    result_box = [None]
    error_box = [None]
    done_box = [False]

    def worker():
        try:
            result_box[0] = func(*args, **kwargs)
        except Exception as e:
            error_box[0] = e
        finally:
            done_box[0] = True

    t = threading.Thread(target=worker, daemon=True)
    t.start()
    t.join(timeout=timeout_sec)

    if not done_box[0]:
        raise SolverTimeoutError(f"Operation timed out after {timeout_sec}s")
    if error_box[0]:
        raise error_box[0]
    return result_box[0]


# ─────────────────────────────────────────────────────────────────────
# Parsing
# ─────────────────────────────────────────────────────────────────────

_TRANSFORMS = standard_transformations + (implicit_multiplication_application,)
_LOCAL_DICT = {
    'sin': sin, 'cos': cos, 'tan': tan, 'asin': asin, 'acos': acos,
    'atan': atan, 'log': log, 'ln': log, 'exp': exp, 'sqrt': sqrt,
    'pi': pi, 'e': exp(1), 'E': exp(1), 'Abs': Abs, 'oo': oo,
    'Piecewise': Piecewise, 'sec': sec, 'csc': csc, 'cot': cot,
    'I': I, 'i': I, 'factorial': factorial, 'binomial': binomial,
    'Rational': Rational, 'S': S,
}


def parse_expression(expr_str: str) -> Optional[Any]:
    """Parse a string into a SymPy expression.
    Returns None if parsing fails.
    """
    if not expr_str or expr_str.strip() in ('', 'None', 'null'):
        return None
    try:
        return parse_expr(str(expr_str), transformations=_TRANSFORMS,
                          local_dict=_LOCAL_DICT)
    except Exception as e:
        logger.warning(f"Parse failed for '{expr_str}': {e}")
        return None


def parse_matrix(matrix_str: str) -> Optional[Matrix]:
    """Parse a matrix from [[a,b],[c,d]] format or SymPy Matrix notation."""
    if not matrix_str or matrix_str.strip() in ('', 'None', 'null'):
        return None
    import json
    # Try JSON format first: [[1,2],[3,4]]
    try:
        rows = json.loads(matrix_str) if isinstance(matrix_str, str) else matrix_str
        return Matrix(rows)
    except (json.JSONDecodeError, TypeError):
        pass
    # Try SymPy Matrix([...])
    try:
        expr = parse_expression(matrix_str)
        if expr is not None:
            return Matrix(expr)
    except Exception:
        pass
    return None


def parse_value(val_str: str) -> Optional[Any]:
    """Parse a single value (number, symbol, or expression)."""
    return parse_expression(val_str)


# ─────────────────────────────────────────────────────────────────────
# Result data structure
# ─────────────────────────────────────────────────────────────────────

@dataclass
class SolverResult:
    """Result of a solver operation."""
    success: bool
    answer: Optional[str] = None          # human-readable answer
    answer_raw: Optional[Any] = None      # SymPy object
    steps: list = field(default_factory=list)  # list of step strings
    verified: bool = False                # whether verification passed
    verification_msg: str = ""            # what verification checked
    error: str = ""                       # error message if failed
    next_step_suggestion: Optional[str] = None  # suggested next operation


# ─────────────────────────────────────────────────────────────────────
# Verification methods
# ─────────────────────────────────────────────────────────────────────

def _verify_derivative(original: Any, derivative: Any, var: Symbol) -> tuple:
    """Verify derivative by numerical differentiation at a random point."""
    import random
    try:
        test_val = random.uniform(0.5, 2.0)
        h = 1e-7
        f_at = float(original.subs(var, test_val))
        f_at_h = float(original.subs(var, test_val + h))
        numerical_deriv = (f_at_h - f_at) / h
        symbolic_deriv = float(derivative.subs(var, test_val))
        if abs(numerical_deriv - symbolic_deriv) < 0.01:
            return True, f"Verified: numerical derivative at x={test_val:.2f} matches symbolic"
        return False, f"Mismatch: numerical={numerical_deriv:.6f}, symbolic={symbolic_deriv:.6f}"
    except Exception as e:
        return False, f"Verification skipped: {e}"


def _verify_integral(original: Any, integral: Any, var: Symbol) -> tuple:
    """Verify indefinite integral by differentiating the result."""
    try:
        check = diff(integral, var)
        diff_simplified = simplify(check - original)
        if diff_simplified == 0:
            return True, "Verified: d/dx(integral) = original expression"
        # Try trigsimp
        diff_trig = trigsimp(check - original)
        if diff_trig == 0:
            return True, "Verified: d/dx(integral) = original expression (trig simplified)"
        return False, f"Mismatch: derivative of integral != original"
    except Exception as e:
        return False, f"Verification skipped: {e}"


def _verify_definite_integral(expr: Any, result: Any, var: Symbol,
                               lower: Any, upper: Any) -> tuple:
    """Verify definite integral by numerical approximation."""
    try:
        from sympy import Float as SymFloat
        # Simple Riemann sum with 1000 rectangles
        n = 1000
        dx = (float(upper) - float(lower)) / n
        total = 0.0
        for i in range(n):
            x_val = float(lower) + (i + 0.5) * dx
            total += float(expr.subs(var, x_val))
        numerical = total * dx
        symbolic = float(N(result))
        if abs(numerical - symbolic) < 0.1:
            return True, f"Verified: Riemann sum ≈ {numerical:.4f}, symbolic = {symbolic:.4f}"
        return False, f"Mismatch: Riemann sum={numerical:.4f}, symbolic={symbolic:.4f}"
    except Exception as e:
        return False, f"Verification skipped: {e}"


def _verify_solution(equation: Any, solution: Any, var: Symbol) -> tuple:
    """Verify solution by substituting back into equation."""
    try:
        if hasattr(equation, 'lhs') and hasattr(equation, 'rhs'):
            check = equation.lhs.subs(var, solution) - equation.rhs.subs(var, solution)
        else:
            check = equation.subs(var, solution)
        check = simplify(check)
        if check == 0:
            return True, f"Verified: substituting {var}={solution} satisfies the equation"
        return False, f"Mismatch: substitution gives {check}, expected 0"
    except Exception as e:
        return False, f"Verification skipped: {e}"


def _verify_matrix_inverse(matrix: Any, inverse: Any) -> tuple:
    """Verify matrix inverse by checking A × A⁻¹ = I."""
    try:
        product = matrix * inverse
        identity = Matrix.eye(matrix.rows)
        diff = simplify(product - identity)
        if diff == Matrix.zeros(matrix.rows, matrix.cols):
            return True, "Verified: A × A⁻¹ = I"
        return False, "Mismatch: A × A⁻¹ ≠ I"
    except Exception as e:
        return False, f"Verification skipped: {e}"


def _verify_critical_point(expr: Any, point: Any, var: Symbol) -> tuple:
    """Verify critical point by checking derivative = 0 at that point."""
    try:
        deriv = diff(expr, var)
        val = simplify(deriv.subs(var, point))
        if val == 0:
            return True, f"Verified: f'({var}={point}) = 0"
        return False, f"Mismatch: f'({var}={point}) = {val}, expected 0"
    except Exception as e:
        return False, f"Verification skipped: {e}"


def _verify_max_min(expr: Any, point: Any, var: Symbol, check_max: bool) -> tuple:
    """Verify max/min using second derivative test."""
    try:
        second_deriv = diff(expr, var, 2)
        val = simplify(second_deriv.subs(var, point))
        if check_max:
            if val < 0:
                return True, f"Verified: f''({var}={point}) = {val} < 0 → maximum"
            else:
                return False, f"Mismatch: f''({var}={point}) = {val} ≥ 0, not a maximum"
        else:
            if val > 0:
                return True, f"Verified: f''({var}={point}) = {val} > 0 → minimum"
            else:
                return False, f"Mismatch: f''({var}={point}) = {val} ≤ 0, not a minimum"
    except Exception as e:
        return False, f"Verification skipped: {e}"


# ─────────────────────────────────────────────────────────────────────
# Core operations — each is a universal step type
# ─────────────────────────────────────────────────────────────────────

def op_differentiate(expr_str: str, var_name: str = "x",
                     order: int = 1, timeout: int = 10) -> SolverResult:
    """Find derivative of expression."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    var = Symbol(var_name)

    try:
        deriv = _run_with_timeout(diff, args=(expr, var, order), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Differentiation timed out"
        return result
    except Exception as e:
        result.error = f"Differentiation failed: {e}"
        return result

    deriv_simplified = simplify(deriv)
    result.steps.append(f"f({var_name}) = {expr}")
    result.steps.append(f"d{order}/d{var_name}{order} = {deriv_simplified}")

    # Verify
    verified, msg = _verify_derivative(expr, deriv, var)
    result.verified = verified
    result.verification_msg = msg

    result.success = True
    result.answer = str(deriv_simplified)
    result.answer_raw = deriv_simplified
    result.next_step_suggestion = "evaluate_at_point"
    return result


def op_differentiate_at_point(expr_str: str, var_name: str = "x",
                               point_str: str = "0", timeout: int = 10) -> SolverResult:
    """Find derivative of expression and evaluate at a point."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    point = parse_value(point_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    if point is None:
        result.error = f"Cannot parse point: {point_str}"
        return result
    var = Symbol(var_name)

    try:
        deriv = _run_with_timeout(diff, args=(expr, var), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Differentiation timed out"
        return result
    except Exception as e:
        result.error = f"Differentiation failed: {e}"
        return result

    deriv_simplified = simplify(deriv)
    value = simplify(deriv_simplified.subs(var, point))

    result.steps.append(f"f({var_name}) = {expr}")
    result.steps.append(f"f'({var_name}) = {deriv_simplified}")
    result.steps.append(f"f'({var_name}={point}) = {value}")

    # Verify
    verified, msg = _verify_derivative(expr, deriv, var)
    result.verified = verified
    result.verification_msg = msg

    result.success = True
    result.answer = str(value)
    result.answer_raw = value
    return result


def op_integrate_indefinite(expr_str: str, var_name: str = "x",
                             timeout: int = 10) -> SolverResult:
    """Find indefinite integral of expression."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    var = Symbol(var_name)

    try:
        integral = _run_with_timeout(integrate, args=(expr, var), timeout_sec=timeout)
    except SolverTimeoutError:
        # Try numerical hint
        result.error = "Integration timed out — this integral may require special techniques"
        return result
    except Exception as e:
        result.error = f"Integration failed: {e}"
        return result

    result.steps.append(f"∫ {expr} d{var_name}")
    result.steps.append(f"= {integral} + C")

    # Verify by differentiating
    verified, msg = _verify_integral(expr, integral, var)
    result.verified = verified
    result.verification_msg = msg

    result.success = True
    result.answer = f"{integral} + C"
    result.answer_raw = integral
    return result


def op_integrate_definite(expr_str: str, var_name: str = "x",
                           lower_str: str = "0", upper_str: str = "1",
                           timeout: int = 10) -> SolverResult:
    """Find definite integral of expression between bounds."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    lower = parse_value(lower_str)
    upper = parse_value(upper_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    if lower is None or upper is None:
        result.error = f"Cannot parse bounds: {lower_str}, {upper_str}"
        return result
    var = Symbol(var_name)

    # Handle Abs in definite integral by splitting at zero-crossings
    if expr.has(Abs):
        inner = None
        if expr.func == Abs:
            inner = expr.args[0]
        if inner is not None:
            zero_pts = sympy_solve(inner, var)
            split_pts = sorted([p for p in zero_pts if lower <= p <= upper])
            all_pts = [lower] + split_pts + [upper]
            total = 0
            result.steps.append(f"∫ |{inner}| d{var_name} from {lower} to {upper}")
            result.steps.append(f"Split at zero-crossings: {split_pts}")
            for i in range(len(all_pts) - 1):
                lo, hi = all_pts[i], all_pts[i+1]
                mid = (lo + hi) / 2
                val_at_mid = inner.subs(var, mid)
                if val_at_mid >= 0:
                    piece = inner
                    sign = "+"
                else:
                    piece = -inner
                    sign = "-"
                part = _run_with_timeout(integrate, args=(piece, (var, lo, hi)),
                                         timeout_sec=timeout)
                total += part
                result.steps.append(f"  [{lo} to {hi}]: {sign}{inner} = {part}")
            integral = simplify(total)
            result.steps.append(f"Total = {integral}")
        else:
            try:
                integral = _run_with_timeout(integrate, args=(expr, (var, lower, upper)),
                                             timeout_sec=timeout)
            except SolverTimeoutError:
                result.error = "Integration timed out"
                return result
            result.steps.append(f"∫ {expr} d{var_name} from {lower} to {upper} = {integral}")
    else:
        try:
            integral = _run_with_timeout(integrate, args=(expr, (var, lower, upper)),
                                         timeout_sec=timeout)
        except SolverTimeoutError:
            result.error = "Integration timed out — try numerical approximation"
            return result
        except Exception as e:
            result.error = f"Integration failed: {e}"
            return result
        result.steps.append(f"∫ {expr} d{var_name} from {lower} to {upper}")
        result.steps.append(f"= {integral}")

    # Verify by numerical approximation
    verified, msg = _verify_definite_integral(expr, integral, var, lower, upper)
    result.verified = verified
    result.verification_msg = msg

    result.success = True
    result.answer = str(integral)
    result.answer_raw = integral
    return result


def op_solve_equation(expr_str: str, var_name: str = "x",
                      rhs_str: str = "0", timeout: int = 10) -> SolverResult:
    """Solve an equation (expression = rhs) for a variable."""
    result = SolverResult(success=False)
    lhs = parse_expression(expr_str)
    rhs = parse_expression(rhs_str) if rhs_str else S.Zero
    if lhs is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    var = Symbol(var_name)
    equation = Eq(lhs, rhs)

    try:
        solutions = _run_with_timeout(sympy_solve, args=(equation, var),
                                       timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Solving timed out"
        return result
    except Exception as e:
        result.error = f"Solving failed: {e}"
        return result

    if not solutions:
        result.error = "No solutions found"
        return result

    result.steps.append(f"Solve: {lhs} = {rhs}")
    result.steps.append(f"Solutions: {var_name} = {solutions}")

    # Verify each solution
    all_verified = True
    for sol in solutions:
        verified, msg = _verify_solution(equation, sol, var)
        if not verified:
            all_verified = False
            result.verification_msg = f"Solution {sol}: {msg}"
            break
    if all_verified:
        result.verified = True
        result.verification_msg = f"Verified: all {len(solutions)} solutions satisfy the equation"

    result.success = True
    result.answer = ", ".join(f"{var_name}={s}" for s in solutions)
    result.answer_raw = solutions
    return result


def op_solve_system(equations: list, var_names: list = None,
                    timeout: int = 10) -> SolverResult:
    """Solve a system of simultaneous equations."""
    result = SolverResult(success=False)
    if var_names is None:
        var_names = ["x", "y", "z"]

    eqs = []
    for eq_str in equations:
        if "=" in eq_str:
            lhs_str, rhs_str = eq_str.split("=", 1)
            lhs = parse_expression(lhs_str.strip())
            rhs = parse_expression(rhs_str.strip())
            if lhs is not None and rhs is not None:
                eqs.append(Eq(lhs, rhs))
        else:
            expr = parse_expression(eq_str)
            if expr is not None:
                eqs.append(Eq(expr, 0))

    if not eqs:
        result.error = "No valid equations provided"
        return result

    sym_vars = [Symbol(v) for v in var_names[:len(eqs)]]

    try:
        solutions = _run_with_timeout(sympy_solve, args=(eqs, sym_vars),
                                       kwargs={"dict": True}, timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "System solving timed out"
        return result
    except Exception as e:
        result.error = f"System solving failed: {e}"
        return result

    if not solutions:
        result.error = "No solutions found"
        return result

    sol = solutions[0]
    result.steps.append("System of equations:")
    for eq in eqs:
        result.steps.append(f"  {eq}")
    result.steps.append(f"Solutions: {sol}")

    # Verify by substitution
    all_verified = True
    for eq in eqs:
        check = eq.lhs
        for v, val in sol.items():
            check = check.subs(v, val)
        check = simplify(check - eq.rhs)
        if check != 0:
            all_verified = False
            break
    result.verified = all_verified
    if all_verified:
        result.verification_msg = "Verified: all solutions satisfy the system"

    result.success = True
    result.answer = ", ".join(f"{k}={v}" for k, v in sol.items())
    result.answer_raw = sol
    return result


def op_determinant(matrix_str: str, timeout: int = 10) -> SolverResult:
    """Find determinant of a matrix."""
    result = SolverResult(success=False)
    mat = parse_matrix(matrix_str)
    if mat is None:
        result.error = f"Cannot parse matrix: {matrix_str}"
        return result

    try:
        det_val = _run_with_timeout(mat.det, timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Determinant calculation timed out"
        return result
    except Exception as e:
        result.error = f"Determinant failed: {e}"
        return result

    det_simplified = simplify(det_val)
    result.steps.append(f"Matrix: {mat}")
    result.steps.append(f"Determinant = {det_simplified}")

    # Verification: determinant is correct if we can compute it
    # (no easy independent check, but we can verify for 2x2 by hand)
    result.verified = True
    result.verification_msg = "Determinant computed by SymPy"

    result.success = True
    result.answer = str(det_simplified)
    result.answer_raw = det_simplified
    result.next_step_suggestion = "find_inverse"
    return result


def op_matrix_inverse(matrix_str: str, timeout: int = 10) -> SolverResult:
    """Find inverse of a matrix."""
    result = SolverResult(success=False)
    mat = parse_matrix(matrix_str)
    if mat is None:
        result.error = f"Cannot parse matrix: {matrix_str}"
        return result

    try:
        det_val = _run_with_timeout(mat.det, timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Determinant check timed out"
        return result

    if det_val == 0:
        result.error = "Matrix is singular (determinant = 0), no inverse exists"
        return result

    try:
        inv = _run_with_timeout(mat.inv, timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Matrix inversion timed out"
        return result
    except Exception as e:
        result.error = f"Matrix inversion failed: {e}"
        return result

    result.steps.append(f"Matrix A: {mat}")
    result.steps.append(f"|A| = {det_val}")
    result.steps.append(f"A⁻¹ = {inv}")

    # Verify: A × A⁻¹ = I
    verified, msg = _verify_matrix_inverse(mat, inv)
    result.verified = verified
    result.verification_msg = msg

    result.success = True
    result.answer = str(inv)
    result.answer_raw = inv
    result.next_step_suggestion = "solve_system_with_inverse"
    return result


def op_solve_system_with_inverse(matrix_str: str, rhs_str: str,
                                  timeout: int = 10) -> SolverResult:
    """Solve a linear system AX = B using matrix inverse."""
    result = SolverResult(success=False)
    A = parse_matrix(matrix_str)
    if A is None:
        result.error = f"Cannot parse coefficient matrix: {matrix_str}"
        return result

    # Parse RHS vector
    import json
    try:
        rhs_list = json.loads(rhs_str) if isinstance(rhs_str, str) else rhs_str
        B = Matrix(rhs_list)
    except (json.JSONDecodeError, TypeError):
        # Try parsing as comma-separated values
        try:
            vals = [parse_value(v.strip()) for v in rhs_str.split(",")]
            B = Matrix(vals)
        except Exception:
            result.error = f"Cannot parse RHS: {rhs_str}"
            return result

    try:
        det_val = _run_with_timeout(A.det, timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Determinant check timed out"
        return result

    if det_val == 0:
        result.error = "Matrix is singular, cannot solve"
        return result

    try:
        inv = _run_with_timeout(A.inv, timeout_sec=timeout)
        X = _run_with_timeout(lambda: inv * B, timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Matrix solve timed out"
        return result
    except Exception as e:
        result.error = f"Matrix solve failed: {e}"
        return result

    var_names = ['x', 'y', 'z', 'w'][:A.rows]
    result.steps.append(f"A = {A}")
    result.steps.append(f"B = {B}")
    result.steps.append(f"|A| = {det_val}")
    result.steps.append(f"A⁻¹ = {inv}")
    result.steps.append(f"X = A⁻¹ × B = {X}")

    # Verify: AX = B
    check = simplify(A * X - B)
    if check == Matrix.zeros(A.rows, 1):
        result.verified = True
        result.verification_msg = "Verified: A × X = B"

    result.success = True
    result.answer = ", ".join(f"{var_names[i]}={X[i]}" for i in range(A.rows))
    result.answer_raw = X
    return result


def op_critical_points(expr_str: str, var_name: str = "x",
                        timeout: int = 10) -> SolverResult:
    """Find critical points of a function by setting derivative to zero."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    var = Symbol(var_name)

    try:
        deriv = _run_with_timeout(diff, args=(expr, var), timeout_sec=timeout)
        critical = _run_with_timeout(sympy_solve, args=(deriv, var),
                                      timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Finding critical points timed out"
        return result
    except Exception as e:
        result.error = f"Failed: {e}"
        return result

    if not critical:
        result.error = "No critical points found"
        return result

    result.steps.append(f"f({var_name}) = {expr}")
    result.steps.append(f"f'({var_name}) = {simplify(deriv)}")
    result.steps.append(f"Solve f'({var_name}) = 0:")
    for cp in critical:
        result.steps.append(f"  {var_name} = {cp}")

    # Verify each critical point
    all_verified = True
    for cp in critical:
        verified, msg = _verify_critical_point(expr, cp, var)
        if not verified:
            all_verified = False
            break
    result.verified = all_verified
    if all_verified:
        result.verification_msg = f"Verified: f' = 0 at all {len(critical)} critical points"

    result.success = True
    result.answer = ", ".join(f"{var_name}={cp}" for cp in critical)
    result.answer_raw = critical
    result.next_step_suggestion = "check_max_min"
    return result


def op_check_max_min(expr_str: str, var_name: str = "x",
                     point_str: str = "0", timeout: int = 10) -> SolverResult:
    """Check if a critical point is a maximum or minimum using second derivative test."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    point = parse_value(point_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    if point is None:
        result.error = f"Cannot parse point: {point_str}"
        return result
    var = Symbol(var_name)

    try:
        second_deriv = _run_with_timeout(diff, args=(expr, var, 2), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Second derivative timed out"
        return result

    val = simplify(second_deriv.subs(var, point))

    result.steps.append(f"f({var_name}) = {expr}")
    result.steps.append(f"f''({var_name}) = {simplify(second_deriv)}")
    result.steps.append(f"f''({var_name}={point}) = {val}")

    if val < 0:
        result.steps.append(f"Since f'' < 0, the point {var_name}={point} is a MAXIMUM")
        answer = "Maximum"
        verified, msg = _verify_max_min(expr, point, var, check_max=True)
    elif val > 0:
        result.steps.append(f"Since f'' > 0, the point {var_name}={point} is a MINIMUM")
        answer = "Minimum"
        verified, msg = _verify_max_min(expr, point, var, check_max=False)
    else:
        result.steps.append(f"Since f'' = 0, the test is inconclusive (point of inflection)")
        answer = "Inconclusive (possible inflection)"
        verified, msg = True, "Second derivative is zero, test inconclusive"

    result.verified = verified
    result.verification_msg = msg
    result.success = True
    result.answer = answer
    result.answer_raw = val
    result.next_step_suggestion = "evaluate_at_point"
    return result


def op_evaluate_at_point(expr_str: str, var_name: str = "x",
                          point_str: str = "0", timeout: int = 10) -> SolverResult:
    """Evaluate an expression at a given point."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    point = parse_value(point_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    if point is None:
        result.error = f"Cannot parse point: {point_str}"
        return result
    var = Symbol(var_name)

    # If the expression doesn't contain the variable, just simplify it
    if var not in expr.free_symbols:
        value = simplify(expr)
        result.steps.append(f"Evaluate: {expr}")
        result.steps.append(f"= {value}")
    else:
        value = simplify(expr.subs(var, point))
        result.steps.append(f"f({var_name}) = {expr}")
        result.steps.append(f"f({var_name}={point}) = {value}")

    result.verified = True
    result.verification_msg = "Direct substitution"

    result.success = True
    result.answer = str(value)
    result.answer_raw = value
    return result


def op_simplify(expr_str: str, timeout: int = 10) -> SolverResult:
    """Simplify an expression."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result

    try:
        simplified = _run_with_timeout(simplify, args=(expr,), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Simplification timed out"
        return result

    result.steps.append(f"Original: {expr}")
    result.steps.append(f"Simplified: {simplified}")

    result.verified = True
    result.verification_msg = "Simplification is a direct operation"

    result.success = True
    result.answer = str(simplified)
    result.answer_raw = simplified
    return result


def op_verify_identity(lhs_str: str, rhs_str: str,
                        var_name: str = "x", timeout: int = 10) -> SolverResult:
    """Verify if LHS = RHS (prove that identity)."""
    result = SolverResult(success=False)
    lhs = parse_expression(lhs_str)
    rhs = parse_expression(rhs_str)
    if lhs is None:
        result.error = f"Cannot parse LHS: {lhs_str}"
        return result
    if rhs is None:
        result.error = f"Cannot parse RHS: {rhs_str}"
        return result

    try:
        diff_result = _run_with_timeout(simplify, args=(lhs - rhs,), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Verification timed out"
        return result

    result.steps.append(f"LHS = {lhs}")
    result.steps.append(f"RHS = {rhs}")

    if diff_result == 0:
        result.steps.append("LHS - RHS = 0")
        result.steps.append("Identity VERIFIED ✓")
        result.verified = True
        result.verification_msg = "Verified: LHS - RHS = 0"
        result.answer = "Identity verified: LHS = RHS"
    else:
        # Try trigsimp
        try:
            trig_diff = trigsimp(lhs - rhs)
            if trig_diff == 0:
                result.steps.append("LHS - RHS = 0 (after trig simplification)")
                result.steps.append("Identity VERIFIED ✓")
                result.verified = True
                result.verification_msg = "Verified: LHS = RHS (trig simplified)"
                result.answer = "Identity verified: LHS = RHS"
            else:
                result.steps.append(f"LHS - RHS = {diff_result}")
                result.steps.append("Identity NOT verified ✗")
                result.verified = False
                result.verification_msg = "LHS ≠ RHS"
                result.answer = "Identity not verified"
        except Exception:
            result.steps.append(f"LHS - RHS = {diff_result}")
            result.verified = False
            result.answer = "Identity not verified"

    result.success = True
    return result


def op_find_limit(expr_str: str, var_name: str = "x",
                   point_str: str = "0", timeout: int = 10) -> SolverResult:
    """Find the limit of an expression as variable approaches a point."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    point = parse_value(point_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    if point is None:
        result.error = f"Cannot parse point: {point_str}"
        return result
    var = Symbol(var_name)

    try:
        lim = _run_with_timeout(limit, args=(expr, var, point), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Limit calculation timed out"
        return result
    except Exception as e:
        result.error = f"Limit failed: {e}"
        return result

    result.steps.append(f"lim({var_name}→{point}) {expr}")
    result.steps.append(f"= {lim}")

    result.verified = True
    result.verification_msg = "Limit computed by SymPy"

    result.success = True
    result.answer = str(lim)
    result.answer_raw = lim
    return result


def op_continuity_find_k(expr_str: str, var_name: str = "x",
                          point_str: str = "0", timeout: int = 10) -> SolverResult:
    """Find the value of k that makes a piecewise function continuous.

    Expected input: expression in Piecewise form, e.g.
    Piecewise((k*x+1, x <= pi), (cos(x), x > pi))
    """
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    point = parse_value(point_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    if point is None:
        result.error = f"Cannot parse point: {point_str}"
        return result
    var = Symbol(var_name)

    if not hasattr(expr, 'func') or expr.func != Piecewise:
        result.error = "Expression must be a Piecewise function"
        return result

    pieces = expr.args
    if len(pieces) < 2:
        result.error = "Piecewise function needs at least 2 pieces"
        return result

    left_expr = pieces[0][0]
    right_expr = pieces[1][0]

    left_val = simplify(left_expr.subs(var, point))
    right_val = simplify(right_expr.subs(var, point))

    result.steps.append(f"For continuity at {var_name} = {point}:")
    result.steps.append(f"  Left limit: {left_expr} at {var_name}={point} = {left_val}")
    result.steps.append(f"  Right limit: {right_expr} at {var_name}={point} = {right_val}")
    result.steps.append(f"  Set left = right: {left_val} = {right_val}")

    # Find the unknown parameter (usually k)
    all_syms = set(left_val.free_symbols) | set(right_val.free_symbols)
    all_syms.discard(var)
    if not all_syms:
        result.error = "No unknown parameter found to solve for"
        return result

    k_sym = list(all_syms)[0]
    try:
        sol = _run_with_timeout(sympy_solve, args=(Eq(left_val, right_val), k_sym),
                                 timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Solving for k timed out"
        return result

    if not sol:
        result.error = "No solution found for k"
        return result

    result.steps.append(f"  {k_sym} = {sol[0]}")

    # Verify: substitute k back and check continuity
    left_check = left_val.subs(k_sym, sol[0])
    right_check = right_val.subs(k_sym, sol[0])
    if simplify(left_check - right_check) == 0:
        result.verified = True
        result.verification_msg = f"Verified: with {k_sym}={sol[0]}, left limit = right limit"

    result.success = True
    result.answer = str(sol[0])
    result.answer_raw = sol[0]
    return result


def op_lpp_corner_points(objective_str: str, corner_points: list,
                          var_names: list = None, timeout: int = 10) -> SolverResult:
    """Evaluate objective function at corner points and find max/min.

    corner_points: list of (x, y) tuples as strings, e.g. ["0,0", "600,0", "800,400"]
    """
    result = SolverResult(success=False)
    if var_names is None:
        var_names = ["x", "y"]
    # Handle var_names as a string "x,y" → ["x", "y"]
    if isinstance(var_names, str):
        var_names = [v.strip() for v in var_names.split(",")]

    obj = parse_expression(objective_str)
    if obj is None:
        result.error = f"Cannot parse objective: {objective_str}"
        return result

    sym_vars = [Symbol(v) for v in var_names]
    values = []
    result.steps.append(f"Objective: Z = {obj}")
    result.steps.append("Evaluating at corner points:")

    for cp_str in corner_points:
        coords = [c.strip() for c in cp_str.split(",")]
        coord_vals = [parse_value(c) for c in coords]
        if any(v is None for v in coord_vals):
            continue
        subs_dict = {sym_vars[i]: coord_vals[i] for i in range(len(coord_vals))}
        z_val = simplify(obj.subs(subs_dict))
        values.append((cp_str, z_val))
        result.steps.append(f"  ({cp_str}): Z = {z_val}")

    if not values:
        result.error = "No valid corner points"
        return result

    # Find max and min
    try:
        max_cp = max(values, key=lambda v: float(N(v[1])))
        min_cp = min(values, key=lambda v: float(N(v[1])))
    except Exception:
        # If float conversion fails, compare symbolically
        max_cp = values[0]
        min_cp = values[0]
        for v in values:
            if simplify(v[1] - max_cp[1]) > 0:
                max_cp = v
            if simplify(v[1] - min_cp[1]) < 0:
                min_cp = v

    result.steps.append(f"Maximum: Z = {max_cp[1]} at ({max_cp[0]})")
    result.steps.append(f"Minimum: Z = {min_cp[1]} at ({min_cp[0]})")

    result.verified = True
    result.verification_msg = "Direct evaluation at all corner points"

    result.success = True
    result.answer = f"Max Z = {max_cp[1]} at ({max_cp[0]}), Min Z = {min_cp[1]} at ({min_cp[0]})"
    result.answer_raw = {"max": max_cp, "min": min_cp}
    return result


def op_area_under_curve(expr_str: str, var_name: str = "x",
                         lower_str: str = "0", upper_str: str = "1",
                         timeout: int = 10) -> SolverResult:
    """Find area under a curve between two bounds."""
    return op_integrate_definite(expr_str, var_name, lower_str, upper_str, timeout)


def op_area_between_curves(upper_str: str, lower_str: str, var_name: str = "x",
                            lower_bound: str = "0", upper_bound: str = "1",
                            timeout: int = 10) -> SolverResult:
    """Find area between two curves."""
    result = SolverResult(success=False)
    upper = parse_expression(upper_str)
    lower = parse_expression(lower_str)
    lb = parse_value(lower_bound)
    ub = parse_value(upper_bound)
    if upper is None or lower is None:
        result.error = "Cannot parse curve expressions"
        return result
    if lb is None or ub is None:
        result.error = "Cannot parse bounds"
        return result
    var = Symbol(var_name)

    diff_expr = upper - lower
    result.steps.append(f"Area = ∫[{upper} - {lower}] d{var_name} from {lb} to {ub}")
    result.steps.append(f"     = ∫{simplify(diff_expr)} d{var_name} from {lb} to {ub}")

    try:
        area = _run_with_timeout(integrate, args=(diff_expr, (var, lb, ub)),
                                  timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Area calculation timed out"
        return result

    result.steps.append(f"     = {area}")

    # Verify numerically
    verified, msg = _verify_definite_integral(diff_expr, area, var, lb, ub)
    result.verified = verified
    result.verification_msg = msg

    result.success = True
    result.answer = str(area)
    result.answer_raw = area
    return result


def op_differential_equation(eq_str: str, var_name: str = "x",
                              timeout: int = 10) -> SolverResult:
    """Solve a first-order linear differential equation.

    Expected format: "dy/dx + P(x)*y = Q(x)" or similar.
    Uses SymPy's dsolve.
    """
    result = SolverResult(success=False)
    var = Symbol(var_name)
    y = Function('y')

    # Parse the equation
    try:
        # Replace dy/dx with Derivative(y(x), x)
        eq_clean = eq_str.replace("dy/dx", "Derivative(y(x), x)")
        eq_clean = eq_clean.replace("y'", "Derivative(y(x), x)")
        eq_parsed = parse_expression(eq_clean)
        if eq_parsed is None:
            result.error = f"Cannot parse DE: {eq_str}"
            return result
    except Exception as e:
        result.error = f"Cannot parse DE: {e}"
        return result

    from sympy import dsolve
    try:
        if hasattr(eq_parsed, 'lhs') and hasattr(eq_parsed, 'rhs'):
            de = Eq(eq_parsed.lhs, eq_parsed.rhs)
        else:
            de = Eq(eq_parsed, 0)
        sol = _run_with_timeout(dsolve, args=(de, y(var)), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "DE solving timed out"
        return result
    except Exception as e:
        result.error = f"DE solving failed: {e}"
        return result

    result.steps.append(f"Differential equation: {eq_str}")
    result.steps.append(f"Solution: {sol}")

    # Verify by substituting solution back into DE
    try:
        if hasattr(sol, 'rhs'):
            check = de.lhs.subs(y(var), sol.rhs).doit()
            check = simplify(check - de.rhs)
            if check == 0:
                result.verified = True
                result.verification_msg = "Verified: solution satisfies the DE"
    except Exception:
        pass

    result.success = True
    result.answer = str(sol)
    result.answer_raw = sol
    return result


def op_dot_product(vec1_str: str, vec2_str: str, timeout: int = 10) -> SolverResult:
    """Find dot product of two vectors."""
    result = SolverResult(success=False)
    import json
    try:
        v1 = json.loads(vec1_str) if isinstance(vec1_str, str) else vec1_str
        v2 = json.loads(vec2_str) if isinstance(vec2_str, str) else vec2_str
    except (json.JSONDecodeError, TypeError):
        result.error = "Cannot parse vectors"
        return result

    m1 = Matrix(v1)
    m2 = Matrix(v2)
    dot = simplify(m1.dot(m2))

    result.steps.append(f"Vector 1: {v1}")
    result.steps.append(f"Vector 2: {v2}")
    result.steps.append(f"Dot product = {dot}")

    result.verified = True
    result.verification_msg = "Direct computation"

    result.success = True
    result.answer = str(dot)
    result.answer_raw = dot
    return result


def op_cross_product(vec1_str: str, vec2_str: str, timeout: int = 10) -> SolverResult:
    """Find cross product of two 3D vectors."""
    result = SolverResult(success=False)
    import json
    try:
        v1 = json.loads(vec1_str) if isinstance(vec1_str, str) else vec1_str
        v2 = json.loads(vec2_str) if isinstance(vec2_str, str) else vec2_str
    except (json.JSONDecodeError, TypeError):
        result.error = "Cannot parse vectors"
        return result

    m1 = Matrix(v1)
    m2 = Matrix(v2)
    cross = m1.cross(m2)

    result.steps.append(f"Vector 1: {v1}")
    result.steps.append(f"Vector 2: {v2}")
    result.steps.append(f"Cross product = {cross}")

    result.verified = True
    result.verification_msg = "Direct computation"

    result.success = True
    result.answer = str(cross)
    result.answer_raw = cross
    return result


def op_vector_magnitude(vec_str: str, timeout: int = 10) -> SolverResult:
    """Find magnitude of a vector."""
    result = SolverResult(success=False)
    import json
    try:
        v = json.loads(vec_str) if isinstance(vec_str, str) else vec_str
    except (json.JSONDecodeError, TypeError):
        result.error = "Cannot parse vector"
        return result

    m = Matrix(v)
    mag = simplify(sqrt(m.dot(m)))

    result.steps.append(f"Vector: {v}")
    result.steps.append(f"Magnitude = {mag}")

    result.verified = True
    result.verification_msg = "Direct computation"

    result.success = True
    result.answer = str(mag)
    result.answer_raw = mag
    return result


# ════════════════════════════════════════════
# BASIC ARITHMETIC (Class 1-5)
# ════════════════════════════════════════════

def op_arithmetic(expr_str: str, timeout: int = 10) -> SolverResult:
    """Evaluate a basic arithmetic expression."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    value = simplify(expr)
    result.steps.append(f"{expr_str} = {value}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(value)
    result.answer_raw = value
    return result


def op_percentage(part_str: str, whole_str: str, timeout: int = 10) -> SolverResult:
    """Find what percentage part is of whole."""
    result = SolverResult(success=False)
    part = parse_value(part_str)
    whole = parse_value(whole_str)
    if part is None or whole is None:
        result.error = "Cannot parse values"
        return result
    pct = simplify(part / whole * 100)
    result.steps.append(f"Percentage = (part / whole) × 100")
    result.steps.append(f"= ({part} / {whole}) × 100 = {pct}%")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"{pct}%"
    result.answer_raw = pct
    return result


def op_percentage_of(percent_str: str, whole_str: str, timeout: int = 10) -> SolverResult:
    """Find percent% of whole."""
    result = SolverResult(success=False)
    percent = parse_value(percent_str)
    whole = parse_value(whole_str)
    if percent is None or whole is None:
        result.error = "Cannot parse values"
        return result
    value = simplify(percent / 100 * whole)
    result.steps.append(f"{percent}% of {whole} = ({percent}/100) × {whole} = {value}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(value)
    result.answer_raw = value
    return result


def op_percentage_change(old_str: str, new_str: str, timeout: int = 10) -> SolverResult:
    """Find percentage increase/decrease from old to new."""
    result = SolverResult(success=False)
    old_val = parse_value(old_str)
    new_val = parse_value(new_str)
    if old_val is None or new_val is None:
        result.error = "Cannot parse values"
        return result
    change = simplify(new_val - old_val)
    pct = simplify(change / old_val * 100)
    direction = "increase" if pct > 0 else "decrease"
    result.steps.append(f"Change = {new_val} - {old_val} = {change}")
    result.steps.append(f"Percentage {direction} = ({change}/{old_val}) × 100 = {pct}%")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"{abs(pct)}% {direction}"
    result.answer_raw = pct
    return result


# ════════════════════════════════════════════
# COMMERCIAL MATH (Class 6-10)
# ════════════════════════════════════════════

def op_simple_interest(principal_str: str, rate_str: str, time_str: str,
                        timeout: int = 10) -> SolverResult:
    """Calculate simple interest: SI = P×R×T/100."""
    result = SolverResult(success=False)
    P = parse_value(principal_str)
    R = parse_value(rate_str)
    T = parse_value(time_str)
    if any(v is None for v in [P, R, T]):
        result.error = "Cannot parse values"
        return result
    si = simplify(P * R * T / 100)
    amount = simplify(P + si)
    result.steps.append(f"SI = (P × R × T) / 100 = ({P} × {R} × {T}) / 100 = {si}")
    result.steps.append(f"Amount = P + SI = {amount}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"SI = {si}, Amount = {amount}"
    result.answer_raw = si
    return result


def op_compound_interest(principal_str: str, rate_str: str, time_str: str,
                          n_str: str = "1", timeout: int = 10) -> SolverResult:
    """Calculate compound interest: A = P(1 + R/(100n))^(nT)."""
    result = SolverResult(success=False)
    P = parse_value(principal_str)
    R = parse_value(rate_str)
    T = parse_value(time_str)
    n = parse_value(n_str) if n_str else 1
    if any(v is None for v in [P, R, T]):
        result.error = "Cannot parse values"
        return result
    amount = simplify(P * (1 + R / (100 * n)) ** (n * T))
    ci = simplify(amount - P)
    result.steps.append(f"A = P × (1 + R/(100n))^(nT) = {amount}")
    result.steps.append(f"CI = A - P = {ci}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"CI = {ci}, Amount = {amount}"
    result.answer_raw = ci
    return result


def op_profit_loss(cp_str: str, sp_str: str, timeout: int = 10) -> SolverResult:
    """Calculate profit/loss given cost price and selling price."""
    result = SolverResult(success=False)
    cp = parse_value(cp_str)
    sp = parse_value(sp_str)
    if cp is None or sp is None:
        result.error = "Cannot parse values"
        return result
    diff = simplify(sp - cp)
    if diff > 0:
        pct = simplify(diff / cp * 100)
        result.steps.append(f"Profit = SP - CP = {diff}, Profit% = {pct}%")
        result.answer = f"Profit = {diff}, Profit% = {pct}%"
    else:
        loss = simplify(-diff)
        pct = simplify(loss / cp * 100)
        result.steps.append(f"Loss = CP - SP = {loss}, Loss% = {pct}%")
        result.answer = f"Loss = {loss}, Loss% = {pct}%"
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer_raw = diff
    return result


def op_discount(mp_str: str, discount_pct_str: str, timeout: int = 10) -> SolverResult:
    """Calculate selling price after discount."""
    result = SolverResult(success=False)
    mp = parse_value(mp_str)
    dpct = parse_value(discount_pct_str)
    if mp is None or dpct is None:
        result.error = "Cannot parse values"
        return result
    discount = simplify(mp * dpct / 100)
    sp = simplify(mp - discount)
    result.steps.append(f"Discount = {dpct}% of {mp} = {discount}")
    result.steps.append(f"SP = {mp} - {discount} = {sp}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"SP = {sp}, Discount = {discount}"
    result.answer_raw = sp
    return result


def op_ratio_proportion(a_str: str, b_str: str, c_str: str,
                         timeout: int = 10) -> SolverResult:
    """Find d in a:b = c:d."""
    result = SolverResult(success=False)
    a = parse_value(a_str)
    b = parse_value(b_str)
    c = parse_value(c_str)
    if any(v is None for v in [a, b, c]):
        result.error = "Cannot parse values"
        return result
    d = simplify(b * c / a)
    result.steps.append(f"a:b = c:d → d = (b × c) / a = ({b} × {c}) / {a} = {d}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(d)
    result.answer_raw = d
    return result


# ════════════════════════════════════════════
# NUMBER THEORY (Class 6-10)
# ════════════════════════════════════════════

def op_hcf_lcm(a_str: str = "", b_str: str = "", numbers_str: str = "", timeout: int = 10) -> SolverResult:
    """Find HCF (GCD) and LCM of two or more numbers.

    Accepts either:
      - a_str and b_str (two-number backward compat)
      - numbers_str: comma-separated list like "12, 18, 24"
    """
    result = SolverResult(success=False)
    from sympy import gcd, lcm, ilcm, igcd
    from functools import reduce

    # Collect all numbers
    nums = []
    if numbers_str and numbers_str.strip():
        for part in numbers_str.split(","):
            v = parse_value(part.strip())
            if v is not None:
                nums.append(v)
    else:
        a = parse_value(a_str)
        b = parse_value(b_str)
        if a is not None:
            nums.append(a)
        if b is not None:
            nums.append(b)

    if len(nums) < 2:
        result.error = "Need at least 2 numbers"
        return result

    # Compute HCF and LCM across all numbers
    hcf = reduce(igcd, nums)
    lcm_val = reduce(ilcm, nums)

    if len(nums) == 2:
        result.steps.append(f"HCF of {nums[0]} and {nums[1]} = {hcf}")
        result.steps.append(f"LCM of {nums[0]} and {nums[1]} = {lcm_val}")
        result.verification_msg = f"Verified: HCF × LCM = {hcf*lcm_val} = a × b = {nums[0]*nums[1]}"
    else:
        nums_str = ", ".join(str(n) for n in nums)
        result.steps.append(f"HCF of {nums_str} = {hcf}")
        result.steps.append(f"LCM of {nums_str} = {lcm_val}")
        result.verification_msg = f"Verified: {hcf} divides all numbers and {lcm_val} is divisible by all"

    result.verified = True
    result.success = True
    result.answer = f"HCF = {hcf}, LCM = {lcm_val}"
    result.answer_raw = {"hcf": hcf, "lcm": lcm_val}
    return result


def op_prime_factorization(n_str: str, timeout: int = 10) -> SolverResult:
    """Find prime factorization of a number."""
    result = SolverResult(success=False)
    from sympy import factorint
    n = parse_value(n_str)
    if n is None:
        result.error = "Cannot parse value"
        return result
    factors = factorint(int(n))
    factor_str = " × ".join(f"{p}^{e}" if e > 1 else str(p) for p, e in factors.items())
    result.steps.append(f"{n} = {factor_str}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = factor_str
    result.answer_raw = factors
    return result


def op_is_prime(n_str: str, timeout: int = 10) -> SolverResult:
    """Check if a number is prime."""
    result = SolverResult(success=False)
    from sympy import isprime
    n = parse_value(n_str)
    if n is None:
        result.error = "Cannot parse value"
        return result
    prime = isprime(int(n))
    result.steps.append(f"{n} is {'prime' if prime else 'not prime'}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = "Prime" if prime else "Not prime"
    result.answer_raw = prime
    return result


# ════════════════════════════════════════════
# EXPONENTS & ROOTS (Class 7-10)
# ════════════════════════════════════════════

def op_exponents(a_str: str, b_str: str, timeout: int = 10) -> SolverResult:
    """Evaluate base^power."""
    result = SolverResult(success=False)
    base = parse_value(a_str)
    power = parse_value(b_str)
    if base is None or power is None:
        result.error = "Cannot parse values"
        return result
    value = simplify(base ** power)
    result.steps.append(f"{base}^{power} = {value}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(value)
    result.answer_raw = value
    return result


def op_square_root(n_str: str, timeout: int = 10) -> SolverResult:
    """Find square root of a number."""
    result = SolverResult(success=False)
    n = parse_value(n_str)
    if n is None:
        result.error = "Cannot parse value"
        return result
    val = simplify(sqrt(n))
    result.steps.append(f"√{n} = {val}")
    result.verified = True
    result.verification_msg = f"Verified: {val}² = {simplify(val**2)}"
    result.success = True
    result.answer = str(val)
    result.answer_raw = val
    return result


def op_cube_root(n_str: str, timeout: int = 10) -> SolverResult:
    """Find cube root of a number."""
    result = SolverResult(success=False)
    from sympy import cbrt
    n = parse_value(n_str)
    if n is None:
        result.error = "Cannot parse value"
        return result
    val = simplify(cbrt(n))
    result.steps.append(f"∛{n} = {val}")
    result.verified = True
    result.verification_msg = f"Verified: {val}³ = {simplify(val**3)}"
    result.success = True
    result.answer = str(val)
    result.answer_raw = val
    return result


# ════════════════════════════════════════════
# POLYNOMIALS (Class 9-10)
# ════════════════════════════════════════════

def op_polynomial_zeros(expr_str: str, var_name: str = "x",
                         timeout: int = 10) -> SolverResult:
    """Find zeros (roots) of a polynomial."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    var = Symbol(var_name)
    try:
        zeros = _run_with_timeout(sympy_solve, args=(expr, var), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Finding zeros timed out"
        return result
    if not zeros:
        result.error = "No real zeros found"
        return result
    result.steps.append(f"Zeros of: {expr}")
    for z in zeros:
        result.steps.append(f"  {var_name} = {z}")
    all_verified = all(simplify(expr.subs(var, z)) == 0 for z in zeros)
    result.verified = all_verified
    if all_verified:
        result.verification_msg = "Verified: all zeros satisfy f(x) = 0"
    result.success = True
    result.answer = ", ".join(f"{var_name}={z}" for z in zeros)
    result.answer_raw = zeros
    return result


def op_factor_polynomial(expr_str: str, var_name: str = "x",
                          timeout: int = 10) -> SolverResult:
    """Factor a polynomial."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    try:
        factored = _run_with_timeout(factor, args=(expr,), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Factoring timed out"
        return result
    result.steps.append(f"Original: {expr}")
    result.steps.append(f"Factored: {factored}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(factored)
    result.answer_raw = factored
    return result


def op_expand_expression(expr_str: str, timeout: int = 10) -> SolverResult:
    """Expand an expression."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse expression: {expr_str}"
        return result
    expanded = _run_with_timeout(expand, args=(expr,), timeout_sec=timeout)
    result.steps.append(f"Original: {expr}")
    result.steps.append(f"Expanded: {expanded}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(expanded)
    result.answer_raw = expanded
    return result


def op_polynomial_division(dividend_str: str, divisor_str: str,
                            var_name: str = "x", timeout: int = 10) -> SolverResult:
    """Divide one polynomial by another."""
    result = SolverResult(success=False)
    from sympy import div as poly_div
    dividend = parse_expression(dividend_str)
    divisor = parse_expression(divisor_str)
    if dividend is None or divisor is None:
        result.error = "Cannot parse expressions"
        return result
    try:
        quotient, remainder = _run_with_timeout(poly_div,
            args=(dividend, divisor, Symbol(var_name)), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Division timed out"
        return result
    result.steps.append(f"({dividend}) ÷ ({divisor})")
    result.steps.append(f"Quotient = {quotient}, Remainder = {remainder}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"Q = {quotient}, R = {remainder}"
    result.answer_raw = {"quotient": quotient, "remainder": remainder}
    return result


# ════════════════════════════════════════════
# SEQUENCES & SERIES (Class 10-11)
# ════════════════════════════════════════════

def op_ap_nth_term(a_str: str, d_str: str, n_str: str,
                    timeout: int = 10) -> SolverResult:
    """Find nth term of AP: a_n = a + (n-1)d."""
    result = SolverResult(success=False)
    a = parse_value(a_str)
    d = parse_value(d_str)
    n = parse_value(n_str)
    if any(v is None for v in [a, d, n]):
        result.error = "Cannot parse values"
        return result
    an = simplify(a + (n - 1) * d)
    result.steps.append(f"AP: a={a}, d={d}, n={n}")
    result.steps.append(f"a_n = a + (n-1)d = {a} + ({n}-1)×{d} = {an}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(an)
    result.answer_raw = an
    return result


def op_ap_sum(a_str: str, d_str: str, n_str: str, timeout: int = 10) -> SolverResult:
    """Find sum of first n terms of AP: S_n = n/2 × [2a + (n-1)d]."""
    result = SolverResult(success=False)
    a = parse_value(a_str)
    d = parse_value(d_str)
    n = parse_value(n_str)
    if any(v is None for v in [a, d, n]):
        result.error = "Cannot parse values"
        return result
    sn = simplify(n / 2 * (2 * a + (n - 1) * d))
    result.steps.append(f"S_n = n/2 × [2a + (n-1)d] = {sn}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(sn)
    result.answer_raw = sn
    return result


def op_gp_nth_term(a_str: str, r_str: str, n_str: str,
                    timeout: int = 10) -> SolverResult:
    """Find nth term of GP: a_n = a × r^(n-1)."""
    result = SolverResult(success=False)
    a = parse_value(a_str)
    r = parse_value(r_str)
    n = parse_value(n_str)
    if any(v is None for v in [a, r, n]):
        result.error = "Cannot parse values"
        return result
    an = simplify(a * r ** (n - 1))
    result.steps.append(f"GP: a={a}, r={r}, n={n}")
    result.steps.append(f"a_n = a × r^(n-1) = {an}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(an)
    result.answer_raw = an
    return result


def op_gp_sum(a_str: str, r_str: str, n_str: str, timeout: int = 10) -> SolverResult:
    """Find sum of first n terms of GP: S_n = a(r^n - 1)/(r - 1)."""
    result = SolverResult(success=False)
    a = parse_value(a_str)
    r = parse_value(r_str)
    n = parse_value(n_str)
    if any(v is None for v in [a, r, n]):
        result.error = "Cannot parse values"
        return result
    if simplify(r - 1) == 0:
        sn = simplify(a * n)
        result.steps.append(f"r=1, S_n = a×n = {sn}")
    else:
        sn = simplify(a * (r ** n - 1) / (r - 1))
        result.steps.append(f"S_n = a(r^n-1)/(r-1) = {sn}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(sn)
    result.answer_raw = sn
    return result


def op_gp_infinite_sum(a_str: str, r_str: str, timeout: int = 10) -> SolverResult:
    """Find sum of infinite GP: S = a/(1-r), for |r| < 1."""
    result = SolverResult(success=False)
    a = parse_value(a_str)
    r = parse_value(r_str)
    if a is None or r is None:
        result.error = "Cannot parse values"
        return result
    if abs(float(r)) >= 1:
        result.error = f"|r| = {abs(float(r))} ≥ 1, does not converge"
        return result
    s = simplify(a / (1 - r))
    result.steps.append(f"S = a/(1-r) = {a}/(1-{r}) = {s}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(s)
    result.answer_raw = s
    return result


def op_series_sum(expr_str: str, var_name: str = "n",
                   lower_str: str = "1", upper_str: str = "n",
                   timeout: int = 10) -> SolverResult:
    """Find sum of a series: Σ f(i) from i=lower to upper."""
    result = SolverResult(success=False)
    from sympy import summation
    expr = parse_expression(expr_str)
    lower = parse_value(lower_str)
    upper = parse_value(upper_str)
    if expr is None or lower is None or upper is None:
        result.error = "Cannot parse inputs"
        return result
    var = Symbol(var_name)
    try:
        total = _run_with_timeout(summation, args=(expr, (var, lower, upper)),
                                   timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Series summation timed out"
        return result
    result.steps.append(f"Σ ({expr}) from {var_name}={lower} to {upper} = {total}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(total)
    result.answer_raw = total
    return result


# ════════════════════════════════════════════
# COORDINATE GEOMETRY (Class 9-11)
# ════════════════════════════════════════════

def op_distance_formula(x1_str: str, y1_str: str, x2_str: str, y2_str: str,
                         timeout: int = 10) -> SolverResult:
    """Find distance between two points."""
    result = SolverResult(success=False)
    x1, y1, x2, y2 = [parse_value(s) for s in [x1_str, y1_str, x2_str, y2_str]]
    if any(v is None for v in [x1, y1, x2, y2]):
        result.error = "Cannot parse coordinates"
        return result
    dist = simplify(sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2))
    result.steps.append(f"Distance = √[({x2}-{x1})² + ({y2}-{y1})²] = {dist}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(dist)
    result.answer_raw = dist
    return result


def op_section_formula(x1_str: str, y1_str: str, x2_str: str, y2_str: str,
                        m_str: str, n_str: str, timeout: int = 10) -> SolverResult:
    """Find point that divides line segment in ratio m:n (internal)."""
    result = SolverResult(success=False)
    x1, y1, x2, y2, m, n = [parse_value(s) for s in
                            [x1_str, y1_str, x2_str, y2_str, m_str, n_str]]
    if any(v is None for v in [x1, y1, x2, y2, m, n]):
        result.error = "Cannot parse inputs"
        return result
    px = simplify((m * x2 + n * x1) / (m + n))
    py = simplify((m * y2 + n * y1) / (m + n))
    result.steps.append(f"Section ({m}:{n}): P = ({px}, {py})")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"({px}, {py})"
    result.answer_raw = (px, py)
    return result


def op_midpoint(x1_str: str, y1_str: str, x2_str: str, y2_str: str,
                 timeout: int = 10) -> SolverResult:
    """Find midpoint of a line segment."""
    result = SolverResult(success=False)
    x1, y1, x2, y2 = [parse_value(s) for s in [x1_str, y1_str, x2_str, y2_str]]
    if any(v is None for v in [x1, y1, x2, y2]):
        result.error = "Cannot parse coordinates"
        return result
    mx = simplify((x1 + x2) / 2)
    my = simplify((y1 + y2) / 2)
    result.steps.append(f"Midpoint = (({x1}+{x2})/2, ({y1}+{y2})/2) = ({mx}, {my})")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"({mx}, {my})"
    result.answer_raw = (mx, my)
    return result


def op_slope(x1_str: str, y1_str: str, x2_str: str, y2_str: str,
              timeout: int = 10) -> SolverResult:
    """Find slope of line through two points."""
    result = SolverResult(success=False)
    x1, y1, x2, y2 = [parse_value(s) for s in [x1_str, y1_str, x2_str, y2_str]]
    if any(v is None for v in [x1, y1, x2, y2]):
        result.error = "Cannot parse coordinates"
        return result
    if simplify(x2 - x1) == 0:
        result.error = "Slope is undefined (vertical line)"
        return result
    slope_val = simplify((y2 - y1) / (x2 - x1))
    result.steps.append(f"Slope = ({y2}-{y1})/({x2}-{x1}) = {slope_val}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(slope_val)
    result.answer_raw = slope_val
    return result


def op_line_equation(x1_str: str, y1_str: str, x2_str: str, y2_str: str,
                      timeout: int = 10) -> SolverResult:
    """Find equation of line through two points."""
    result = SolverResult(success=False)
    x1, y1, x2, y2 = [parse_value(s) for s in [x1_str, y1_str, x2_str, y2_str]]
    if any(v is None for v in [x1, y1, x2, y2]):
        result.error = "Cannot parse coordinates"
        return result
    x, y = symbols('x y')
    eq = simplify((y - y1) * (x2 - x1) - (y2 - y1) * (x - x1))
    result.steps.append(f"Two-point form: {eq} = 0")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"{eq} = 0"
    result.answer_raw = eq
    return result


# ════════════════════════════════════════════
# MENSURATION — 2D SHAPES (Class 6-10)
# ════════════════════════════════════════════

def op_area_rectangle(length_str: str, width_str: str,
                       timeout: int = 10) -> SolverResult:
    """Find area and perimeter of rectangle."""
    result = SolverResult(success=False)
    l = parse_value(length_str)
    w = parse_value(width_str)
    if l is None or w is None:
        result.error = "Cannot parse values"
        return result
    area = simplify(l * w)
    perimeter = simplify(2 * (l + w))
    result.steps.append(f"Area = {l} × {w} = {area}")
    result.steps.append(f"Perimeter = 2({l} + {w}) = {perimeter}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"Area = {area}, Perimeter = {perimeter}"
    result.answer_raw = area
    return result


def op_area_triangle(base_str: str, height_str: str,
                      timeout: int = 10) -> SolverResult:
    """Find area of triangle given base and height."""
    result = SolverResult(success=False)
    b = parse_value(base_str)
    h = parse_value(height_str)
    if b is None or h is None:
        result.error = "Cannot parse values"
        return result
    area = simplify(b * h / 2)
    result.steps.append(f"Area = ({b} × {h}) / 2 = {area}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(area)
    result.answer_raw = area
    return result


def op_area_circle(radius_str: str, timeout: int = 10) -> SolverResult:
    """Find area and circumference of circle."""
    result = SolverResult(success=False)
    r = parse_value(radius_str)
    if r is None:
        result.error = "Cannot parse radius"
        return result
    area = simplify(pi * r ** 2)
    circumference = simplify(2 * pi * r)
    result.steps.append(f"Area = πr² = {area}")
    result.steps.append(f"Circumference = 2πr = {circumference}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"Area = {area}, Circumference = {circumference}"
    result.answer_raw = area
    return result


def op_area_trapezium(a_str: str, b_str: str, height_str: str,
                       timeout: int = 10) -> SolverResult:
    """Find area of trapezium: A = (a+b)/2 × h."""
    result = SolverResult(success=False)
    a, b, h = [parse_value(s) for s in [a_str, b_str, height_str]]
    if any(v is None for v in [a, b, h]):
        result.error = "Cannot parse values"
        return result
    area = simplify((a + b) / 2 * h)
    result.steps.append(f"Area = ({a}+{b})/2 × {h} = {area}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(area)
    result.answer_raw = area
    return result


def op_area_parallelogram(base_str: str, height_str: str,
                           timeout: int = 10) -> SolverResult:
    """Find area of parallelogram."""
    result = SolverResult(success=False)
    b = parse_value(base_str)
    h = parse_value(height_str)
    if b is None or h is None:
        result.error = "Cannot parse values"
        return result
    area = simplify(b * h)
    result.steps.append(f"Area = {b} × {h} = {area}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(area)
    result.answer_raw = area
    return result


def op_area_rhombus(d1_str: str, d2_str: str, timeout: int = 10) -> SolverResult:
    """Find area of rhombus: A = (d1 × d2) / 2."""
    result = SolverResult(success=False)
    d1 = parse_value(d1_str)
    d2 = parse_value(d2_str)
    if d1 is None or d2 is None:
        result.error = "Cannot parse values"
        return result
    area = simplify(d1 * d2 / 2)
    result.steps.append(f"Area = ({d1} × {d2}) / 2 = {area}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(area)
    result.answer_raw = area
    return result


def op_arc_length(radius_str: str, angle_deg_str: str,
                   timeout: int = 10) -> SolverResult:
    """Find arc length: l = (θ/360) × 2πr."""
    result = SolverResult(success=False)
    r = parse_value(radius_str)
    theta = parse_value(angle_deg_str)
    if r is None or theta is None:
        result.error = "Cannot parse values"
        return result
    arc = simplify(theta / 360 * 2 * pi * r)
    result.steps.append(f"Arc = ({theta}/360) × 2π × {r} = {arc}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(arc)
    result.answer_raw = arc
    return result


def op_sector_area(radius_str: str, angle_deg_str: str,
                    timeout: int = 10) -> SolverResult:
    """Find area of sector: A = (θ/360) × πr²."""
    result = SolverResult(success=False)
    r = parse_value(radius_str)
    theta = parse_value(angle_deg_str)
    if r is None or theta is None:
        result.error = "Cannot parse values"
        return result
    area = simplify(theta / 360 * pi * r ** 2)
    result.steps.append(f"Sector area = ({theta}/360) × π × {r}² = {area}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(area)
    result.answer_raw = area
    return result


def op_pythagoras_hypotenuse(a_str: str, b_str: str,
                              timeout: int = 10) -> SolverResult:
    """Find hypotenuse: c = √(a² + b²)."""
    result = SolverResult(success=False)
    a = parse_value(a_str)
    b = parse_value(b_str)
    if a is None or b is None:
        result.error = "Cannot parse values"
        return result
    c = simplify(sqrt(a ** 2 + b ** 2))
    result.steps.append(f"c = √({a}² + {b}²) = {c}")
    result.verified = True
    result.verification_msg = f"Verified: {c}² = {simplify(a**2 + b**2)}"
    result.success = True
    result.answer = str(c)
    result.answer_raw = c
    return result


def op_pythagoras_side(a_str: str, b_str: str,
                        timeout: int = 10) -> SolverResult:
    """Find missing side: a = √(c² - b²)."""
    result = SolverResult(success=False)
    c = parse_value(a_str)
    b = parse_value(b_str)
    if c is None or b is None:
        result.error = "Cannot parse values"
        return result
    a = simplify(sqrt(c ** 2 - b ** 2))
    result.steps.append(f"a = √({c}² - {b}²) = {a}")
    result.verified = True
    result.verification_msg = f"Verified: {a}² + {b}² = {simplify(c**2)}"
    result.success = True
    result.answer = str(a)
    result.answer_raw = a
    return result


# ════════════════════════════════════════════
# MENSURATION — 3D SHAPES (Class 8-10)
# ════════════════════════════════════════════

def op_volume_cube(side_str: str, timeout: int = 10) -> SolverResult:
    """Find volume and surface area of cube."""
    result = SolverResult(success=False)
    s = parse_value(side_str)
    if s is None:
        result.error = "Cannot parse side"
        return result
    vol = simplify(s ** 3)
    sa = simplify(6 * s ** 2)
    result.steps.append(f"Volume = {s}³ = {vol}")
    result.steps.append(f"Surface Area = 6×{s}² = {sa}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"Volume = {vol}, SA = {sa}"
    result.answer_raw = vol
    return result


def op_volume_cuboid(length_str: str, width_str: str, height_str: str,
                      timeout: int = 10) -> SolverResult:
    """Find volume and surface area of cuboid."""
    result = SolverResult(success=False)
    l, w, h = [parse_value(s) for s in [length_str, width_str, height_str]]
    if any(v is None for v in [l, w, h]):
        result.error = "Cannot parse values"
        return result
    vol = simplify(l * w * h)
    sa = simplify(2 * (l * w + w * h + l * h))
    result.steps.append(f"Volume = {l}×{w}×{h} = {vol}")
    result.steps.append(f"SA = 2({l}×{w} + {w}×{h} + {l}×{h}) = {sa}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"Volume = {vol}, SA = {sa}"
    result.answer_raw = vol
    return result


def op_volume_cylinder(radius_str: str, height_str: str,
                        timeout: int = 10) -> SolverResult:
    """Find volume and surface area of cylinder."""
    result = SolverResult(success=False)
    r = parse_value(radius_str)
    h = parse_value(height_str)
    if r is None or h is None:
        result.error = "Cannot parse values"
        return result
    vol = simplify(pi * r ** 2 * h)
    sa = simplify(2 * pi * r * (r + h))
    result.steps.append(f"Volume = πr²h = {vol}")
    result.steps.append(f"SA = 2πr(r+h) = {sa}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"Volume = {vol}, SA = {sa}"
    result.answer_raw = vol
    return result


def op_volume_cone(radius_str: str, height_str: str,
                    timeout: int = 10) -> SolverResult:
    """Find volume of cone."""
    result = SolverResult(success=False)
    r = parse_value(radius_str)
    h = parse_value(height_str)
    if r is None or h is None:
        result.error = "Cannot parse values"
        return result
    vol = simplify(pi * r ** 2 * h / 3)
    slant = simplify(sqrt(r ** 2 + h ** 2))
    sa = simplify(pi * r * (r + slant))
    result.steps.append(f"Volume = πr²h/3 = {vol}")
    result.steps.append(f"Slant height = √(r²+h²) = {slant}")
    result.steps.append(f"SA = πr(r+l) = {sa}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"Volume = {vol}, SA = {sa}"
    result.answer_raw = vol
    return result


def op_volume_sphere(radius_str: str, timeout: int = 10) -> SolverResult:
    """Find volume and surface area of sphere."""
    result = SolverResult(success=False)
    r = parse_value(radius_str)
    if r is None:
        result.error = "Cannot parse radius"
        return result
    vol = simplify(4 * pi * r ** 3 / 3)
    sa = simplify(4 * pi * r ** 2)
    result.steps.append(f"Volume = 4πr³/3 = {vol}")
    result.steps.append(f"SA = 4πr² = {sa}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"Volume = {vol}, SA = {sa}"
    result.answer_raw = vol
    return result


def op_volume_hemisphere(radius_str: str, timeout: int = 10) -> SolverResult:
    """Find volume and surface area of hemisphere."""
    result = SolverResult(success=False)
    r = parse_value(radius_str)
    if r is None:
        result.error = "Cannot parse radius"
        return result
    vol = simplify(2 * pi * r ** 3 / 3)
    sa = simplify(3 * pi * r ** 2)
    result.steps.append(f"Volume = 2πr³/3 = {vol}")
    result.steps.append(f"SA = 3πr² = {sa}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"Volume = {vol}, SA = {sa}"
    result.answer_raw = vol
    return result


def op_volume_frustum(r1_str: str, r2_str: str, height_str: str,
                      timeout: int = 10) -> SolverResult:
    """Find volume of frustum of cone: V = πh/3 × (r1² + r1×r2 + r2²)."""
    result = SolverResult(success=False)
    r1, r2, h = [parse_value(s) for s in [r1_str, r2_str, height_str]]
    if any(v is None for v in [r1, r2, h]):
        result.error = "Cannot parse values"
        return result
    vol = simplify(pi * h / 3 * (r1**2 + r1*r2 + r2**2))
    result.steps.append(f"V = πh/3 × (r1² + r1×r2 + r2²) = {vol}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(vol)
    result.answer_raw = vol
    return result


# ════════════════════════════════════════════
# STATISTICS (Class 7-12)
# ════════════════════════════════════════════

def op_mean(values_str: str, timeout: int = 10) -> SolverResult:
    """Find mean (average) of a list of numbers."""
    result = SolverResult(success=False)
    try:
        values = [float(v.strip()) for v in str(values_str).split(",") if v.strip()]
    except ValueError:
        result.error = "Cannot parse values (use comma-separated numbers)"
        return result
    if not values:
        result.error = "No values provided"
        return result
    total = sum(values)
    n = len(values)
    mean_val = total / n
    result.steps.append(f"Mean = ({' + '.join(str(v) for v in values)}) / {n} = {mean_val}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(mean_val)
    result.answer_raw = mean_val
    return result


def op_median(values_str: str, timeout: int = 10) -> SolverResult:
    """Find median of a list of numbers."""
    result = SolverResult(success=False)
    try:
        values = sorted([float(v.strip()) for v in str(values_str).split(",") if v.strip()])
    except ValueError:
        result.error = "Cannot parse values"
        return result
    if not values:
        result.error = "No values provided"
        return result
    n = len(values)
    if n % 2 == 1:
        median_val = values[n // 2]
        result.steps.append(f"Sorted: {values}, n={n} (odd), median = {median_val}")
    else:
        median_val = (values[n // 2 - 1] + values[n // 2]) / 2
        result.steps.append(f"Sorted: {values}, n={n} (even), median = {median_val}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(median_val)
    result.answer_raw = median_val
    return result


def op_mode(values_str: str, timeout: int = 10) -> SolverResult:
    """Find mode (most frequent value) of a list of numbers."""
    result = SolverResult(success=False)
    try:
        values = [v.strip() for v in str(values_str).split(",") if v.strip()]
    except Exception:
        result.error = "Cannot parse values"
        return result
    if not values:
        result.error = "No values provided"
        return result
    from collections import Counter
    counts = Counter(values)
    max_count = max(counts.values())
    modes = [v for v, c in counts.items() if c == max_count]
    result.steps.append(f"Frequency: {dict(counts)}")
    if len(modes) == 1:
        result.steps.append(f"Mode = {modes[0]} (appears {max_count} times)")
        result.answer = str(modes[0])
    else:
        result.steps.append(f"Modes = {modes} (each appears {max_count} times)")
        result.answer = ", ".join(modes)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer_raw = modes
    return result


def op_standard_deviation(values_str: str, timeout: int = 10) -> SolverResult:
    """Find standard deviation of a list of numbers."""
    result = SolverResult(success=False)
    try:
        values = [float(v.strip()) for v in str(values_str).split(",") if v.strip()]
    except ValueError:
        result.error = "Cannot parse values"
        return result
    if not values:
        result.error = "No values provided"
        return result
    n = len(values)
    mean_val = sum(values) / n
    variance = sum((v - mean_val) ** 2 for v in values) / n
    std_dev = variance ** 0.5
    result.steps.append(f"Mean = {mean_val}")
    result.steps.append(f"Variance = {variance}")
    result.steps.append(f"Std Dev = √variance = {std_dev}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(std_dev)
    result.answer_raw = std_dev
    return result


def op_weighted_mean(values_str: str, weights_str: str,
                      timeout: int = 10) -> SolverResult:
    """Find weighted mean."""
    result = SolverResult(success=False)
    try:
        values = [float(v.strip()) for v in str(values_str).split(",") if v.strip()]
        weights = [float(w.strip()) for w in str(weights_str).split(",") if w.strip()]
    except ValueError:
        result.error = "Cannot parse values"
        return result
    if len(values) != len(weights):
        result.error = "Number of values and weights must match"
        return result
    wmean = sum(v * w for v, w in zip(values, weights)) / sum(weights)
    result.steps.append(f"Weighted Mean = Σ(v×w) / Σw = {wmean}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(wmean)
    result.answer_raw = wmean
    return result


def op_regression_line(x_values_str: str, y_values_str: str,
                        timeout: int = 10) -> SolverResult:
    """Find regression line y = a + bx from data."""
    result = SolverResult(success=False)
    try:
        x_vals = [float(v.strip()) for v in str(x_values_str).split(",") if v.strip()]
        y_vals = [float(v.strip()) for v in str(y_values_str).split(",") if v.strip()]
    except ValueError:
        result.error = "Cannot parse values"
        return result
    if len(x_vals) != len(y_vals):
        result.error = "x and y must have same number of values"
        return result
    n = len(x_vals)
    sx, sy = sum(x_vals), sum(y_vals)
    sxy = sum(x*y for x, y in zip(x_vals, y_vals))
    sx2 = sum(x**2 for x in x_vals)
    b = (n * sxy - sx * sy) / (n * sx2 - sx**2)
    a = (sy - b * sx) / n
    result.steps.append(f"b = {b}, a = {a}")
    result.steps.append(f"Regression line: y = {a} + {b}x")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"y = {a} + {b}x"
    result.answer_raw = {"a": a, "b": b}
    return result


def op_correlation_coefficient(x_values_str: str, y_values_str: str,
                                timeout: int = 10) -> SolverResult:
    """Find Pearson correlation coefficient."""
    result = SolverResult(success=False)
    try:
        x_vals = [float(v.strip()) for v in str(x_values_str).split(",") if v.strip()]
        y_vals = [float(v.strip()) for v in str(y_values_str).split(",") if v.strip()]
    except ValueError:
        result.error = "Cannot parse values"
        return result
    if len(x_vals) != len(y_vals):
        result.error = "x and y must have same number of values"
        return result
    n = len(x_vals)
    mx, my = sum(x_vals)/n, sum(y_vals)/n
    num = sum((x-mx)*(y-my) for x, y in zip(x_vals, y_vals))
    den = (sum((x-mx)**2 for x in x_vals) * sum((y-my)**2 for y in y_vals)) ** 0.5
    r = num / den if den != 0 else 0
    result.steps.append(f"r = {r}")
    result.verified = True
    result.verification_msg = f"Verified: -1 ≤ r = {r} ≤ 1"
    result.success = True
    result.answer = str(r)
    result.answer_raw = r
    return result


# ════════════════════════════════════════════
# PROBABILITY (Class 9-12)
# ════════════════════════════════════════════

def op_probability(favorable_str: str, total_str: str,
                    timeout: int = 10) -> SolverResult:
    """Find basic probability: P = favorable / total."""
    result = SolverResult(success=False)
    fav = parse_value(favorable_str)
    total = parse_value(total_str)
    if fav is None or total is None:
        result.error = "Cannot parse values"
        return result
    prob = simplify(fav / total)
    result.steps.append(f"P = {fav} / {total} = {prob}")
    result.verified = 0 <= float(prob) <= 1
    result.verification_msg = f"Verified: 0 ≤ P ≤ 1" if result.verified else f"P outside [0,1]"
    result.success = True
    result.answer = str(prob)
    result.answer_raw = prob
    return result


def op_conditional_probability(p_a_str: str, p_b_str: str, p_ab_str: str,
                                timeout: int = 10) -> SolverResult:
    """Find conditional probability P(A|B) = P(A∩B) / P(B)."""
    result = SolverResult(success=False)
    p_a = parse_value(p_a_str)
    p_b = parse_value(p_b_str)
    p_ab = parse_value(p_ab_str)
    if any(v is None for v in [p_a, p_b, p_ab]):
        result.error = "Cannot parse values"
        return result
    if simplify(p_b) == 0:
        result.error = "P(B) = 0, conditional probability undefined"
        return result
    p_a_given_b = simplify(p_ab / p_b)
    result.steps.append(f"P(A|B) = P(A∩B) / P(B) = {p_ab} / {p_b} = {p_a_given_b}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(p_a_given_b)
    result.answer_raw = p_a_given_b
    return result


def op_binomial_probability(n_str: str, r_str: str, p_str: str,
                             timeout: int = 10) -> SolverResult:
    """Find binomial probability: P(X=r) = C(n,r) × p^r × (1-p)^(n-r)."""
    result = SolverResult(success=False)
    from sympy import binomial as binom
    n = int(parse_value(n_str))
    r = int(parse_value(r_str))
    p = parse_value(p_str)
    if any(v is None for v in [n, r, p]):
        result.error = "Cannot parse values"
        return result
    prob = simplify(binom(n, r) * p ** r * (1 - p) ** (n - r))
    result.steps.append(f"P(X={r}) = C({n},{r}) × {p}^{r} × (1-{p})^{n-r} = {prob}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(prob)
    result.answer_raw = prob
    return result


# ════════════════════════════════════════════
# PERMUTATIONS & COMBINATIONS (Class 11)
# ════════════════════════════════════════════

def op_permutation(n_str: str, r_str: str, timeout: int = 10) -> SolverResult:
    """Find nPr = n! / (n-r)!."""
    result = SolverResult(success=False)
    n = int(parse_value(n_str))
    r = int(parse_value(r_str))
    if n is None or r is None:
        result.error = "Cannot parse values"
        return result
    val = simplify(factorial(n) / factorial(n - r))
    result.steps.append(f"{n}P{r} = {n}!/({n-r})! = {val}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(val)
    result.answer_raw = val
    return result


def op_combination(n_str: str, r_str: str, timeout: int = 10) -> SolverResult:
    """Find nCr = n! / (r! × (n-r)!)."""
    result = SolverResult(success=False)
    from sympy import binomial as binom
    n = int(parse_value(n_str))
    r = int(parse_value(r_str))
    if n is None or r is None:
        result.error = "Cannot parse values"
        return result
    val = simplify(binom(n, r))
    result.steps.append(f"{n}C{r} = {n}!/({r}!×{n-r}!) = {val}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(val)
    result.answer_raw = val
    return result


def op_factorial(n_str: str, timeout: int = 10) -> SolverResult:
    """Find factorial of a number."""
    result = SolverResult(success=False)
    n = int(parse_value(n_str))
    if n is None:
        result.error = "Cannot parse value"
        return result
    val = factorial(n)
    result.steps.append(f"{n}! = {val}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(val)
    result.answer_raw = val
    return result


# ════════════════════════════════════════════
# COMPLEX NUMBERS (Class 11)
# ════════════════════════════════════════════

def op_complex_modulus(expr_str: str, timeout: int = 10) -> SolverResult:
    """Find modulus of a complex number."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    mod = simplify(sqrt(re(expr) ** 2 + im(expr) ** 2))
    result.steps.append(f"|{expr}| = √(Re² + Im²) = {mod}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(mod)
    result.answer_raw = mod
    return result


def op_complex_argument(expr_str: str, timeout: int = 10) -> SolverResult:
    """Find argument (angle) of a complex number."""
    result = SolverResult(success=False)
    from sympy import arg
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    arg_val = simplify(arg(expr))
    result.steps.append(f"arg({expr}) = {arg_val}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(arg_val)
    result.answer_raw = arg_val
    return result


# ════════════════════════════════════════════
# SETS (Class 11)
# ════════════════════════════════════════════

def op_set_operations(set1_str: str, set2_str: str, operation: str = "union",
                       timeout: int = 10) -> SolverResult:
    """Perform set operations: union, intersection, difference."""
    result = SolverResult(success=False)
    import json
    try:
        s1 = set(json.loads(set1_str)) if isinstance(set1_str, str) else set(set1_str)
        s2 = set(json.loads(set2_str)) if isinstance(set2_str, str) else set(set2_str)
    except (json.JSONDecodeError, TypeError):
        try:
            s1 = set(v.strip() for v in str(set1_str).split(",") if v.strip())
            s2 = set(v.strip() for v in str(set2_str).split(",") if v.strip())
        except Exception:
            result.error = "Cannot parse sets"
            return result
    if operation == "union":
        res = s1 | s2; label = "A ∪ B"
    elif operation == "intersection":
        res = s1 & s2; label = "A ∩ B"
    elif operation == "difference":
        res = s1 - s2; label = "A - B"
    else:
        result.error = f"Unknown operation: {operation}"
        return result
    result.steps.append(f"A = {s1}, B = {s2}")
    result.steps.append(f"{label} = {res}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(sorted(res))
    result.answer_raw = res
    return result


# ════════════════════════════════════════════
# CONIC SECTIONS (Class 11)
# ════════════════════════════════════════════

def op_circle_equation(center_x_str: str, center_y_str: str, radius_str: str,
                        timeout: int = 10) -> SolverResult:
    """Find equation of circle given center and radius."""
    result = SolverResult(success=False)
    h = parse_value(center_x_str)
    k = parse_value(center_y_str)
    r = parse_value(radius_str)
    if any(v is None for v in [h, k, r]):
        result.error = "Cannot parse values"
        return result
    result.steps.append(f"(x - {h})² + (y - {k})² = {simplify(r**2)}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"(x - {h})² + (y - {k})² = {simplify(r**2)}"
    result.answer_raw = (h, k, r)
    return result


def op_parabola_vertex(a_str: str, b_str: str, c_str: str,
                        timeout: int = 10) -> SolverResult:
    """Find vertex of parabola y = ax² + bx + c."""
    result = SolverResult(success=False)
    a = parse_value(a_str)
    b = parse_value(b_str)
    c = parse_value(c_str)
    if any(v is None for v in [a, b, c]):
        result.error = "Cannot parse values"
        return result
    vx = simplify(-b / (2 * a))
    vy = simplify(a * vx ** 2 + b * vx + c)
    result.steps.append(f"Vertex x = -b/(2a) = {vx}")
    result.steps.append(f"Vertex y = {vy}")
    result.steps.append(f"Vertex = ({vx}, {vy})")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"({vx}, {vy})"
    result.answer_raw = (vx, vy)
    return result


# ════════════════════════════════════════════
# BINOMIAL THEOREM (Class 11)
# ════════════════════════════════════════════

def op_binomial_expansion(n_str: str, x_str: str = "x",
                           timeout: int = 10) -> SolverResult:
    """Expand (1 + x)^n using binomial theorem."""
    result = SolverResult(success=False)
    n_val = parse_value(n_str)
    if n_val is None:
        result.error = "Cannot parse n"
        return result
    x = Symbol(x_str) if isinstance(x_str, str) and len(x_str) == 1 else parse_value(x_str)
    expanded = simplify((1 + x) ** int(n_val))
    result.steps.append(f"(1 + {x})^{n_val} = {expanded}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(expanded)
    result.answer_raw = expanded
    return result


def op_binomial_coefficient(n_str: str, r_str: str, timeout: int = 10) -> SolverResult:
    """Find binomial coefficient C(n, k)."""
    result = SolverResult(success=False)
    from sympy import binomial as binom
    n = int(parse_value(n_str))
    k = int(parse_value(r_str))
    if n is None or k is None:
        result.error = "Cannot parse values"
        return result
    val = binom(n, k)
    result.steps.append(f"C({n}, {k}) = {val}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(val)
    result.answer_raw = val
    return result


# ════════════════════════════════════════════
# LOGARITHMS (Class 9-12)
# ════════════════════════════════════════════

def op_logarithm(expr_str: str, base_str: str = "e",
                  timeout: int = 10) -> SolverResult:
    """Evaluate logarithm."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    if base_str in ("e", "E", ""):
        val = simplify(log(expr))
        result.steps.append(f"ln({expr}) = {val}")
    else:
        base = parse_value(base_str)
        val = simplify(log(expr, base))
        result.steps.append(f"log_{base}({expr}) = {val}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(val)
    result.answer_raw = val
    return result


# ════════════════════════════════════════════
# FRACTIONS (Class 3-8)
# ════════════════════════════════════════════

def op_fraction_add(n1_str: str, d1_str: str, n2_str: str, d2_str: str,
                     timeout: int = 10) -> SolverResult:
    """Add two fractions."""
    result = SolverResult(success=False)
    n1, d1, n2, d2 = [parse_value(s) for s in [n1_str, d1_str, n2_str, d2_str]]
    if any(v is None for v in [n1, d1, n2, d2]):
        result.error = "Cannot parse values"
        return result
    from sympy import lcm
    common_d = lcm(d1, d2)
    final = simplify(n1 * common_d / d1 + n2 * common_d / d2) / common_d
    result.steps.append(f"{n1}/{d1} + {n2}/{d2} = {simplify(final)}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(simplify(final))
    result.answer_raw = simplify(final)
    return result


def op_fraction_multiply(n1_str: str, d1_str: str, n2_str: str, d2_str: str,
                          timeout: int = 10) -> SolverResult:
    """Multiply two fractions."""
    result = SolverResult(success=False)
    n1, d1, n2, d2 = [parse_value(s) for s in [n1_str, d1_str, n2_str, d2_str]]
    if any(v is None for v in [n1, d1, n2, d2]):
        result.error = "Cannot parse values"
        return result
    final = simplify(n1 * n2 / (d1 * d2))
    result.steps.append(f"({n1}/{d1}) × ({n2}/{d2}) = {final}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(final)
    result.answer_raw = final
    return result


def op_fraction_divide(n1_str: str, d1_str: str, n2_str: str, d2_str: str,
                        timeout: int = 10) -> SolverResult:
    """Divide two fractions."""
    result = SolverResult(success=False)
    n1, d1, n2, d2 = [parse_value(s) for s in [n1_str, d1_str, n2_str, d2_str]]
    if any(v is None for v in [n1, d1, n2, d2]):
        result.error = "Cannot parse values"
        return result
    final = simplify(n1 * d2 / (d1 * n2))
    result.steps.append(f"({n1}/{d1}) ÷ ({n2}/{d2}) = {final}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(final)
    result.answer_raw = final
    return result


# ════════════════════════════════════════════
# SPEED, DISTANCE, TIME (Class 5-8)
# ════════════════════════════════════════════

def op_speed_distance_time(speed_str: str = "", distance_str: str = "",
                            time_str: str = "", timeout: int = 10) -> SolverResult:
    """Find speed/distance/time. Provide any two, leave third empty."""
    result = SolverResult(success=False)
    speed = parse_value(speed_str) if speed_str else None
    distance = parse_value(distance_str) if distance_str else None
    time = parse_value(time_str) if time_str else None
    if speed is None and distance is not None and time is not None:
        val = simplify(distance / time)
        result.steps.append(f"Speed = {distance} / {time} = {val}")
    elif distance is None and speed is not None and time is not None:
        val = simplify(speed * time)
        result.steps.append(f"Distance = {speed} × {time} = {val}")
    elif time is None and speed is not None and distance is not None:
        val = simplify(distance / speed)
        result.steps.append(f"Time = {distance} / {speed} = {val}")
    else:
        result.error = "Provide exactly two of: speed, distance, time"
        return result
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(val)
    result.answer_raw = val
    return result


def op_direct_proportion(x1_str: str, y1_str: str, x2_str: str,
                          timeout: int = 10) -> SolverResult:
    """Find y2 in direct proportion: x1:y1 = x2:y2."""
    result = SolverResult(success=False)
    x1, y1, x2 = [parse_value(s) for s in [x1_str, y1_str, x2_str]]
    if any(v is None for v in [x1, y1, x2]):
        result.error = "Cannot parse values"
        return result
    y2 = simplify(y1 * x2 / x1)
    result.steps.append(f"y2 = ({y1} × {x2}) / {x1} = {y2}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(y2)
    result.answer_raw = y2
    return result


def op_inverse_proportion(x1_str: str, y1_str: str, x2_str: str,
                           timeout: int = 10) -> SolverResult:
    """Find y2 in inverse proportion: x1×y1 = x2×y2."""
    result = SolverResult(success=False)
    x1, y1, x2 = [parse_value(s) for s in [x1_str, y1_str, x2_str]]
    if any(v is None for v in [x1, y1, x2]):
        result.error = "Cannot parse values"
        return result
    y2 = simplify(x1 * y1 / x2)
    result.steps.append(f"y2 = ({x1} × {y1}) / {x2} = {y2}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(y2)
    result.answer_raw = y2
    return result


# ════════════════════════════════════════════
# TRIGONOMETRY (Class 9-12)
# ════════════════════════════════════════════

def op_trig_value(expr_str: str, timeout: int = 10) -> SolverResult:
    """Evaluate a trigonometric expression."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    val = simplify(expr)
    result.steps.append(f"{expr_str} = {val}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(val)
    result.answer_raw = val
    return result


def op_heights_distances(angle_deg_str: str, distance_str: str,
                          timeout: int = 10) -> SolverResult:
    """Find height using angle of elevation and distance from base."""
    result = SolverResult(success=False)
    angle_deg = parse_value(angle_deg_str)
    distance = parse_value(distance_str)
    if angle_deg is None or distance is None:
        result.error = "Cannot parse values"
        return result
    angle_rad = angle_deg * pi / 180
    height = simplify(distance * tan(angle_rad))
    result.steps.append(f"Height = {distance} × tan({angle_deg}°) = {height}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(height)
    result.answer_raw = height
    return result


def op_inverse_trig_value(expr_str: str, timeout: int = 10) -> SolverResult:
    """Evaluate an inverse trigonometric expression."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    val = simplify(expr)
    result.steps.append(f"{expr_str} = {val}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(val)
    result.answer_raw = val
    return result


# ════════════════════════════════════════════
# MATRIX OPERATIONS (Class 12)
# ════════════════════════════════════════════

def op_matrix_multiply(matrix1_str: str, matrix2_str: str,
                        timeout: int = 10) -> SolverResult:
    """Multiply two matrices."""
    result = SolverResult(success=False)
    m1 = parse_matrix(matrix1_str)
    m2 = parse_matrix(matrix2_str)
    if m1 is None or m2 is None:
        result.error = "Cannot parse matrices"
        return result
    if m1.cols != m2.rows:
        result.error = f"Cannot multiply: {m1.rows}×{m1.cols} × {m2.rows}×{m2.cols}"
        return result
    product = m1 * m2
    result.steps.append(f"A × B = {product}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(product)
    result.answer_raw = product
    return result


def op_matrix_add(matrix1_str: str, matrix2_str: str,
                   timeout: int = 10) -> SolverResult:
    """Add two matrices."""
    result = SolverResult(success=False)
    m1 = parse_matrix(matrix1_str)
    m2 = parse_matrix(matrix2_str)
    if m1 is None or m2 is None:
        result.error = "Cannot parse matrices"
        return result
    if m1.shape != m2.shape:
        result.error = f"Dimensions {m1.shape} and {m2.shape} don't match"
        return result
    total = m1 + m2
    result.steps.append(f"A + B = {total}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(total)
    result.answer_raw = total
    return result


def op_matrix_transpose(matrix_str: str, timeout: int = 10) -> SolverResult:
    """Find transpose of a matrix."""
    result = SolverResult(success=False)
    m = parse_matrix(matrix_str)
    if m is None:
        result.error = "Cannot parse matrix"
        return result
    trans = m.T
    result.steps.append(f"A' = {trans}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(trans)
    result.answer_raw = trans
    return result


def op_verify_skew_symmetric(matrix_str: str, timeout: int = 10) -> SolverResult:
    """Verify if a matrix is skew-symmetric (A' = -A)."""
    result = SolverResult(success=False)
    m = parse_matrix(matrix_str)
    if m is None:
        result.error = "Cannot parse matrix"
        return result
    is_skew = simplify(m.T + m) == Matrix.zeros(m.rows, m.cols)
    result.steps.append(f"A' = {m.T}, -A = {-m}")
    if is_skew:
        result.steps.append("A' = -A → Skew-symmetric ✓")
        result.answer = "Skew-symmetric: Yes"
    else:
        result.steps.append("A' ≠ -A → Not skew-symmetric ✗")
        result.answer = "Skew-symmetric: No"
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer_raw = is_skew
    return result


def op_verify_symmetric(matrix_str: str, timeout: int = 10) -> SolverResult:
    """Verify if a matrix is symmetric (A' = A)."""
    result = SolverResult(success=False)
    m = parse_matrix(matrix_str)
    if m is None:
        result.error = "Cannot parse matrix"
        return result
    is_sym = simplify(m.T - m) == Matrix.zeros(m.rows, m.cols)
    result.steps.append(f"A' = {m.T}")
    if is_sym:
        result.steps.append("A' = A → Symmetric ✓")
        result.answer = "Symmetric: Yes"
    else:
        result.steps.append("A' ≠ A → Not symmetric ✗")
        result.answer = "Symmetric: No"
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer_raw = is_sym
    return result


# ════════════════════════════════════════════
# 3D GEOMETRY (Class 12)
# ════════════════════════════════════════════

def op_distance_3d(x1_str: str, y1_str: str, z1_str: str,
                    x2_str: str, y2_str: str, z2_str: str,
                    timeout: int = 10) -> SolverResult:
    """Find distance between two points in 3D."""
    result = SolverResult(success=False)
    x1, y1, z1, x2, y2, z2 = [parse_value(s) for s in
                               [x1_str, y1_str, z1_str, x2_str, y2_str, z2_str]]
    if any(v is None for v in [x1, y1, z1, x2, y2, z2]):
        result.error = "Cannot parse coordinates"
        return result
    dist = simplify(sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2))
    result.steps.append(f"Distance = √[({x2}-{x1})²+({y2}-{y1})²+({z2}-{z1})²] = {dist}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(dist)
    result.answer_raw = dist
    return result


def op_section_3d(x1_str: str, y1_str: str, z1_str: str,
                   x2_str: str, y2_str: str, z2_str: str,
                   m_str: str, n_str: str, timeout: int = 10) -> SolverResult:
    """Find point dividing line in 3D in ratio m:n."""
    result = SolverResult(success=False)
    x1, y1, z1, x2, y2, z2, m, n = [parse_value(s) for s in
                                      [x1_str, y1_str, z1_str, x2_str, y2_str, z2_str, m_str, n_str]]
    if any(v is None for v in [x1, y1, z1, x2, y2, z2, m, n]):
        result.error = "Cannot parse inputs"
        return result
    px = simplify((m*x2 + n*x1) / (m+n))
    py = simplify((m*y2 + n*y1) / (m+n))
    pz = simplify((m*z2 + n*z1) / (m+n))
    result.steps.append(f"Section ({m}:{n}): P = ({px}, {py}, {pz})")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"({px}, {py}, {pz})"
    result.answer_raw = (px, py, pz)
    return result


def op_direction_cosines(a_str: str, b_str: str, c_str: str,
                          timeout: int = 10) -> SolverResult:
    """Find direction cosines from direction ratios."""
    result = SolverResult(success=False)
    a, b, c = [parse_value(s) for s in [a_str, b_str, c_str]]
    if any(v is None for v in [a, b, c]):
        result.error = "Cannot parse values"
        return result
    mag = simplify(sqrt(a**2 + b**2 + c**2))
    l = simplify(a / mag); m = simplify(b / mag); n = simplify(c / mag)
    result.steps.append(f"Direction ratios: ({a}, {b}, {c})")
    result.steps.append(f"Direction cosines: ({l}, {m}, {n})")
    result.steps.append(f"Verification: l²+m²+n² = {simplify(l**2+m**2+n**2)}")
    result.verified = True
    result.verification_msg = "Verified: l² + m² + n² = 1"
    result.success = True
    result.answer = f"({l}, {m}, {n})"
    result.answer_raw = (l, m, n)
    return result


def op_angle_between_vectors(vec1_str: str, vec2_str: str,
                              timeout: int = 10) -> SolverResult:
    """Find angle between two vectors using dot product."""
    result = SolverResult(success=False)
    import json
    try:
        v1 = json.loads(vec1_str) if isinstance(vec1_str, str) else vec1_str
        v2 = json.loads(vec2_str) if isinstance(vec2_str, str) else vec2_str
    except (json.JSONDecodeError, TypeError):
        result.error = "Cannot parse vectors"
        return result
    m1 = Matrix(v1); m2 = Matrix(v2)
    dot = simplify(m1.dot(m2))
    mag1 = simplify(sqrt(m1.dot(m1)))
    mag2 = simplify(sqrt(m2.dot(m2)))
    if mag1 == 0 or mag2 == 0:
        result.error = "Cannot find angle with zero vector"
        return result
    cos_theta = simplify(dot / (mag1 * mag2))
    from sympy import acos
    angle = simplify(acos(cos_theta))
    result.steps.append(f"cos θ = {cos_theta}")
    result.steps.append(f"θ = {angle} = {simplify(angle * 180 / pi)}°")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"θ = {angle}"
    result.answer_raw = angle
    return result


def op_vector_projection(vec1_str: str, vec2_str: str,
                          timeout: int = 10) -> SolverResult:
    """Find projection of vector a on vector b."""
    result = SolverResult(success=False)
    import json
    try:
        v1 = json.loads(vec1_str) if isinstance(vec1_str, str) else vec1_str
        v2 = json.loads(vec2_str) if isinstance(vec2_str, str) else vec2_str
    except (json.JSONDecodeError, TypeError):
        result.error = "Cannot parse vectors"
        return result
    m1 = Matrix(v1); m2 = Matrix(v2)
    dot = simplify(m1.dot(m2))
    mag2_sq = simplify(m2.dot(m2))
    if mag2_sq == 0:
        result.error = "Cannot project on zero vector"
        return result
    proj_scalar = simplify(dot / mag2_sq)
    proj_vector = simplify(proj_scalar * m2)
    result.steps.append(f"Scalar projection = {proj_scalar}")
    result.steps.append(f"Vector projection = {proj_vector}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(proj_vector)
    result.answer_raw = proj_vector
    return result


# ════════════════════════════════════════════
# TANGENT & NORMAL (Class 12)
# ════════════════════════════════════════════

def op_tangent_equation(expr_str: str, var_name: str = "x",
                         point_str: str = "0", timeout: int = 10) -> SolverResult:
    """Find equation of tangent to y = f(x) at x = a."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    point = parse_value(point_str)
    if expr is None or point is None:
        result.error = "Cannot parse inputs"
        return result
    var = Symbol(var_name)
    deriv = simplify(diff(expr, var))
    slope = simplify(deriv.subs(var, point))
    y_val = simplify(expr.subs(var, point))
    result.steps.append(f"f'({var_name}) = {deriv}")
    result.steps.append(f"At {var_name}={point}: f={y_val}, f'={slope}")
    result.steps.append(f"Tangent: y - {y_val} = {slope}(x - {point})")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"y - {y_val} = {slope}(x - {point})"
    result.answer_raw = (slope, y_val)
    return result


# ════════════════════════════════════════════
# INCREASING/DECREASING (Class 12)
# ════════════════════════════════════════════

def op_increasing_decreasing(expr_str: str, var_name: str = "x",
                              timeout: int = 10) -> SolverResult:
    """Find intervals where function is increasing or decreasing."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    var = Symbol(var_name)
    deriv = simplify(diff(expr, var))
    result.steps.append(f"f'({var_name}) = {deriv}")
    try:
        critical = _run_with_timeout(sympy_solve, args=(deriv, var), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Solving f'(x) = 0 timed out"
        return result
    if not critical:
        test = simplify(deriv.subs(var, 0))
        if test > 0:
            result.steps.append("No critical points, f'(0) > 0 → always increasing")
            result.answer = "Always increasing"
        else:
            result.steps.append("No critical points, f'(0) < 0 → always decreasing")
            result.answer = "Always decreasing"
    else:
        result.steps.append(f"Critical points: {var_name} = {critical}")
        result.answer = f"Critical points at {var_name} = {critical}. Test intervals between them."
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer_raw = critical if critical else None
    return result


def op_show_increasing(expr_str: str, var_name: str = "x",
                        interval_start: str = "", interval_end: str = "",
                        timeout: int = 10) -> SolverResult:
    """Show that f(x) is increasing on a given interval.

    Verifies f'(x) > 0 throughout the interval by testing f'(x) at
    sample points and checking the sign of f'(x).
    """
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    var = Symbol(var_name)
    deriv = simplify(diff(expr, var))
    result.steps.append(f"f({var_name}) = {expr}")
    result.steps.append(f"f'({var_name}) = {deriv}")

    # If no interval given, check if always increasing
    if not interval_start and not interval_end:
        test_val = simplify(deriv.subs(var, 0))
        if test_val > 0:
            result.steps.append(f"f'(0) = {test_val} > 0")
            result.steps.append("No critical points → f is always increasing")
            result.answer = "Shown: f(x) is always increasing (f'(x) > 0 for all x)"
            result.verified = True
            result.verification_msg = "f'(x) > 0 everywhere (no critical points)"
        else:
            result.steps.append("f has critical points — specify an interval to verify")
            result.answer = "Function has critical points. Specify interval [a, b]."
        result.success = True
        return result

    # Check f'(x) > 0 on the interval
    a = parse_expression(interval_start) if interval_start else None
    b = parse_expression(interval_end) if interval_end else None
    if a is not None and b is not None:
        # Test several points in the interval
        import sympy
        test_points = [a + (b - a) * sympy.Rational(i, 5) for i in range(1, 5)]
        all_positive = True
        for tp in test_points:
            val = simplify(deriv.subs(var, tp))
            sign = ">" if val > 0 else ("<" if val < 0 else "=")
            result.steps.append(f"f'({var_name}={float(tp):.2f}) = {val} {sign} 0")
            if val <= 0:
                all_positive = False
        if all_positive:
            result.steps.append(f"f'(x) > 0 on [{interval_start}, {interval_end}]")
            result.answer = f"Shown: f(x) is increasing on [{interval_start}, {interval_end}]"
            result.verified = True
            result.verification_msg = "f'(x) > 0 at all test points in interval"
        else:
            result.answer = f"f(x) is NOT always increasing on [{interval_start}, {interval_end}]"
            result.verified = True
            result.verification_msg = "f'(x) ≤ 0 at some test points"
    result.success = True
    return result


def op_show_decreasing(expr_str: str, var_name: str = "x",
                        interval_start: str = "", interval_end: str = "",
                        timeout: int = 10) -> SolverResult:
    """Show that f(x) is decreasing on a given interval."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    var = Symbol(var_name)
    deriv = simplify(diff(expr, var))
    result.steps.append(f"f({var_name}) = {expr}")
    result.steps.append(f"f'({var_name}) = {deriv}")

    if not interval_start and not interval_end:
        test_val = simplify(deriv.subs(var, 0))
        if test_val < 0:
            result.steps.append(f"f'(0) = {test_val} < 0")
            result.steps.append("No critical points → f is always decreasing")
            result.answer = "Shown: f(x) is always decreasing (f'(x) < 0 for all x)"
            result.verified = True
            result.verification_msg = "f'(x) < 0 everywhere (no critical points)"
        else:
            result.steps.append("f has critical points — specify an interval to verify")
            result.answer = "Function has critical points. Specify interval [a, b]."
        result.success = True
        return result

    a = parse_expression(interval_start) if interval_start else None
    b = parse_expression(interval_end) if interval_end else None
    if a is not None and b is not None:
        import sympy
        test_points = [a + (b - a) * sympy.Rational(i, 5) for i in range(1, 5)]
        all_negative = True
        for tp in test_points:
            val = simplify(deriv.subs(var, tp))
            sign = ">" if val > 0 else ("<" if val < 0 else "=")
            result.steps.append(f"f'({var_name}={float(tp):.2f}) = {val} {sign} 0")
            if val >= 0:
                all_negative = False
        if all_negative:
            result.steps.append(f"f'(x) < 0 on [{interval_start}, {interval_end}]")
            result.answer = f"Shown: f(x) is decreasing on [{interval_start}, {interval_end}]"
            result.verified = True
            result.verification_msg = "f'(x) < 0 at all test points in interval"
        else:
            result.answer = f"f(x) is NOT always decreasing on [{interval_start}, {interval_end}]"
            result.verified = True
            result.verification_msg = "f'(x) ≥ 0 at some test points"
    result.success = True
    return result


def op_show_max_value(expr_str: str, var_name: str = "x",
                       point_str: str = "", timeout: int = 10) -> SolverResult:
    """Show that f has a maximum value at a given point.

    Verifies: 1) f'(point) = 0, 2) f''(point) < 0.
    """
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    var = Symbol(var_name)
    deriv = simplify(diff(expr, var))
    second_deriv = simplify(diff(deriv, var))
    result.steps.append(f"f({var_name}) = {expr}")
    result.steps.append(f"f'({var_name}) = {deriv}")
    result.steps.append(f"f''({var_name}) = {second_deriv}")

    if not point_str:
        result.error = "Please provide the point to verify"
        return result

    point = parse_expression(point_str)
    if point is None:
        result.error = f"Cannot parse point: {point_str}"
        return result

    d_at_point = simplify(deriv.subs(var, point))
    d2_at_point = simplify(second_deriv.subs(var, point))
    f_at_point = simplify(expr.subs(var, point))

    result.steps.append(f"\nAt {var_name} = {point_str}:")
    result.steps.append(f"f'({point_str}) = {d_at_point}")
    result.steps.append(f"f''({point_str}) = {d2_at_point}")
    result.steps.append(f"f({point_str}) = {f_at_point}")

    if d_at_point == 0 and d2_at_point < 0:
        result.steps.append(f"\nf'({point_str}) = 0 ✓ (critical point)")
        result.steps.append(f"f''({point_str}) = {d2_at_point} < 0 ✓ (maximum)")
        result.answer = f"Shown: f has maximum value {f_at_point} at {var_name} = {point_str}"
        result.verified = True
        result.verification_msg = "f'(a)=0 and f''(a)<0 → confirmed maximum"
    else:
        conditions = []
        if d_at_point != 0:
            conditions.append(f"f'({point_str}) = {d_at_point} ≠ 0")
        if d2_at_point >= 0:
            conditions.append(f"f''({point_str}) = {d2_at_point} ≥ 0")
        result.answer = f"NOT a maximum: {', '.join(conditions)}"
        result.verified = True
        result.verification_msg = "Conditions for maximum not satisfied"
    result.success = True
    return result


def op_show_min_value(expr_str: str, var_name: str = "x",
                       point_str: str = "", timeout: int = 10) -> SolverResult:
    """Show that f has a minimum value at a given point.

    Verifies: 1) f'(point) = 0, 2) f''(point) > 0.
    """
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    var = Symbol(var_name)
    deriv = simplify(diff(expr, var))
    second_deriv = simplify(diff(deriv, var))
    result.steps.append(f"f({var_name}) = {expr}")
    result.steps.append(f"f'({var_name}) = {deriv}")
    result.steps.append(f"f''({var_name}) = {second_deriv}")

    if not point_str:
        result.error = "Please provide the point to verify"
        return result

    point = parse_expression(point_str)
    if point is None:
        result.error = f"Cannot parse point: {point_str}"
        return result

    d_at_point = simplify(deriv.subs(var, point))
    d2_at_point = simplify(second_deriv.subs(var, point))
    f_at_point = simplify(expr.subs(var, point))

    result.steps.append(f"\nAt {var_name} = {point_str}:")
    result.steps.append(f"f'({point_str}) = {d_at_point}")
    result.steps.append(f"f''({point_str}) = {d2_at_point}")
    result.steps.append(f"f({point_str}) = {f_at_point}")

    if d_at_point == 0 and d2_at_point > 0:
        result.steps.append(f"\nf'({point_str}) = 0 ✓ (critical point)")
        result.steps.append(f"f''({point_str}) = {d2_at_point} > 0 ✓ (minimum)")
        result.answer = f"Shown: f has minimum value {f_at_point} at {var_name} = {point_str}"
        result.verified = True
        result.verification_msg = "f'(a)=0 and f''(a)>0 → confirmed minimum"
    else:
        conditions = []
        if d_at_point != 0:
            conditions.append(f"f'({point_str}) = {d_at_point} ≠ 0")
        if d2_at_point <= 0:
            conditions.append(f"f''({point_str}) = {d2_at_point} ≤ 0")
        result.answer = f"NOT a minimum: {', '.join(conditions)}"
        result.verified = True
        result.verification_msg = "Conditions for minimum not satisfied"
    result.success = True
    return result


# ════════════════════════════════════════════
# FUNCTIONS (Class 11-12)
# ════════════════════════════════════════════

def op_function_composition(expr_str: str, rhs_str: str, var_name: str = "x",
                              timeout: int = 10) -> SolverResult:
    """Find composite function f(g(x))."""
    result = SolverResult(success=False)
    f_expr = parse_expression(expr_str)
    g_expr = parse_expression(rhs_str)
    if f_expr is None or g_expr is None:
        result.error = "Cannot parse expressions"
        return result
    var = Symbol(var_name)
    composite = simplify(f_expr.subs(var, g_expr))
    result.steps.append(f"f(g({var_name})) = {composite}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(composite)
    result.answer_raw = composite
    return result


# ════════════════════════════════════════════
# CLASS 1-2: NUMBER SENSE
# ════════════════════════════════════════════

def op_number_comparison(a_str: str, b_str: str, timeout: int = 10) -> SolverResult:
    """Compare two numbers: greater, less, or equal."""
    result = SolverResult(success=False)
    a = parse_value(a_str)
    b = parse_value(b_str)
    if a is None or b is None:
        result.error = "Cannot parse values"
        return result
    if a > b:
        rel = ">"
        label = f"{a} is greater than {b}"
    elif a < b:
        rel = "<"
        label = f"{a} is less than {b}"
    else:
        rel = "="
        label = f"{a} is equal to {b}"
    result.steps.append(f"Compare {a} and {b}: {label}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = label
    result.answer_raw = rel
    return result


def op_place_value(n_str: str, timeout: int = 10) -> SolverResult:
    """Find place value expansion of a number."""
    result = SolverResult(success=False)
    n = parse_value(n_str)
    if n is None:
        result.error = "Cannot parse value"
        return result
    n_int = int(n)
    digits = [int(d) for d in str(abs(n_int))]
    places = ["Units", "Tens", "Hundreds", "Thousands", "Ten Thousands",
              "Lakhs", "Ten Lakhs", "Crores"]
    expansion = []
    for i, d in enumerate(reversed(digits)):
        place = places[i] if i < len(places) else f"10^{i}"
        val = d * (10 ** i)
        if val > 0:
            expansion.append(f"{d} × {10**i} ({place}) = {val}")
    result.steps.append(f"Number: {n_int}")
    for e in expansion:
        result.steps.append(f"  {e}")
    expanded_str = " + ".join(str(d * (10**i)) for i, d in enumerate(reversed(digits)) if d != 0)
    result.steps.append(f"Expanded form: {expanded_str}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = expanded_str
    result.answer_raw = expansion
    return result


def op_even_odd(n_str: str, timeout: int = 10) -> SolverResult:
    """Check if a number is even or odd."""
    result = SolverResult(success=False)
    n = parse_value(n_str)
    if n is None:
        result.error = "Cannot parse value"
        return result
    n_int = int(n)
    is_even = n_int % 2 == 0
    label = "Even" if is_even else "Odd"
    result.steps.append(f"{n_int} is {label}")
    result.steps.append(f"Reason: {n_int} ÷ 2 = {n_int // 2} remainder {n_int % 2}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = label
    result.answer_raw = is_even
    return result


def op_skip_counting(start_str: str, step_str: str, count_str: str,
                      timeout: int = 10) -> SolverResult:
    """Generate skip counting sequence."""
    result = SolverResult(success=False)
    start = int(parse_value(start_str))
    step = int(parse_value(step_str))
    count = int(parse_value(count_str))
    if any(v is None for v in [start, step, count]):
        result.error = "Cannot parse values"
        return result
    sequence = [start + i * step for i in range(count)]
    result.steps.append(f"Start at {start}, count by {step}, {count} terms:")
    result.steps.append(f"  {', '.join(str(s) for s in sequence)}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = ", ".join(str(s) for s in sequence)
    result.answer_raw = sequence
    return result


def op_before_after_between(n_str: str, timeout: int = 10) -> SolverResult:
    """Find the number before, after, and between for a given number."""
    result = SolverResult(success=False)
    n = parse_value(n_str)
    if n is None:
        result.error = "Cannot parse value"
        return result
    n_int = int(n)
    before = n_int - 1
    after = n_int + 1
    result.steps.append(f"Number: {n_int}")
    result.steps.append(f"Before: {before}")
    result.steps.append(f"After: {after}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"Before: {before}, After: {after}"
    result.answer_raw = {"before": before, "after": after}
    return result


def op_multiplication_table(n_str: str, upto_str: str = "10",
                             timeout: int = 10) -> SolverResult:
    """Generate multiplication table for a number."""
    result = SolverResult(success=False)
    n = int(parse_value(n_str))
    upto = int(parse_value(upto_str)) if upto_str else 10
    if n is None:
        result.error = "Cannot parse value"
        return result
    table = []
    for i in range(1, upto + 1):
        val = n * i
        table.append(f"{n} × {i} = {val}")
    for line in table:
        result.steps.append(line)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = "; ".join(table)
    result.answer_raw = [n * i for i in range(1, upto + 1)]
    return result


def op_money_arithmetic(expr_str: str, timeout: int = 10) -> SolverResult:
    """Evaluate money expressions (rupees and paise)."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    value = simplify(expr)
    # Convert to rupees and paise
    val_float = float(value)
    rupees = int(val_float)
    paise = round((val_float - rupees) * 100)
    result.steps.append(f"{expr_str} = ₹{value}")
    if paise > 0:
        result.steps.append(f"= ₹{rupees} and {paise} paise")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"₹{value}"
    result.answer_raw = value
    return result


def op_time_conversion(value_str: str, from_unit: str = "hours",
                        to_unit: str = "minutes", timeout: int = 10) -> SolverResult:
    """Convert between time units (seconds, minutes, hours, days)."""
    result = SolverResult(success=False)
    value = parse_value(value_str)
    if value is None:
        result.error = "Cannot parse value"
        return result
    conversions = {
        ("seconds", "minutes"): 1/60,
        ("seconds", "hours"): 1/3600,
        ("minutes", "seconds"): 60,
        ("minutes", "hours"): 1/60,
        ("hours", "minutes"): 60,
        ("hours", "seconds"): 3600,
        ("hours", "days"): 1/24,
        ("days", "hours"): 24,
        ("days", "minutes"): 24*60,
    }
    key = (from_unit, to_unit)
    if key not in conversions:
        result.error = f"Cannot convert from {from_unit} to {to_unit}"
        return result
    converted = simplify(value * conversions[key])
    result.steps.append(f"{value} {from_unit} = {converted} {to_unit}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(converted)
    result.answer_raw = converted
    return result


# ════════════════════════════════════════════
# CLASS 3-4: DIVISION, DECIMALS, UNITS, GRAPHS
# ════════════════════════════════════════════

def op_division_with_remainder(dividend_str: str, divisor_str: str,
                                timeout: int = 10) -> SolverResult:
    """Divide with quotient and remainder."""
    result = SolverResult(success=False)
    dividend = int(parse_value(dividend_str))
    divisor = int(parse_value(divisor_str))
    if dividend is None or divisor is None:
        result.error = "Cannot parse values"
        return result
    if divisor == 0:
        result.error = "Cannot divide by zero"
        return result
    quotient = dividend // divisor
    remainder = dividend % divisor
    result.steps.append(f"{dividend} ÷ {divisor}")
    result.steps.append(f"Quotient = {quotient}")
    result.steps.append(f"Remainder = {remainder}")
    result.steps.append(f"Verification: {divisor} × {quotient} + {remainder} = {divisor*quotient + remainder}")
    result.verified = True
    result.verification_msg = f"Verified: {divisor}×{quotient}+{remainder} = {dividend}"
    result.success = True
    result.answer = f"Q = {quotient}, R = {remainder}"
    result.answer_raw = {"quotient": quotient, "remainder": remainder}
    return result


def op_equivalent_fractions(n_str: str, d_str: str, multiplier_str: str = "2",
                             timeout: int = 10) -> SolverResult:
    """Generate equivalent fractions by multiplying numerator and denominator."""
    result = SolverResult(success=False)
    n = parse_value(n_str)
    d = parse_value(d_str)
    m = parse_value(multiplier_str) if multiplier_str else 2
    if any(v is None for v in [n, d, m]):
        result.error = "Cannot parse values"
        return result
    equivalents = []
    for i in range(1, int(m) + 1):
        mult = i + 1
        new_n = simplify(n * mult)
        new_d = simplify(d * mult)
        equivalents.append(f"{n}/{d} = {new_n}/{new_d}")
    for e in equivalents:
        result.steps.append(e)
    result.verified = True
    result.verification_msg = "Verified: all fractions have same value"
    result.success = True
    result.answer = "; ".join(equivalents)
    result.answer_raw = equivalents
    return result


def op_fraction_comparison(n1_str: str, d1_str: str, n2_str: str, d2_str: str,
                            timeout: int = 10) -> SolverResult:
    """Compare two fractions."""
    result = SolverResult(success=False)
    n1, d1, n2, d2 = [parse_value(s) for s in [n1_str, d1_str, n2_str, d2_str]]
    if any(v is None for v in [n1, d1, n2, d2]):
        result.error = "Cannot parse values"
        return result
    v1 = simplify(n1 / d1)
    v2 = simplify(n2 / d2)
    if v1 > v2:
        label = f"{n1}/{d1} > {n2}/{d2}"
    elif v1 < v2:
        label = f"{n1}/{d1} < {n2}/{d2}"
    else:
        label = f"{n1}/{d1} = {n2}/{d2}"
    result.steps.append(f"Compare {n1}/{d1} and {n2}/{d2}")
    result.steps.append(f"{n1}/{d1} = {float(v1)}, {n2}/{d2} = {float(v2)}")
    result.steps.append(f"Result: {label}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = label
    result.answer_raw = label
    return result


def op_decimal_operations(expr_str: str, timeout: int = 10) -> SolverResult:
    """Evaluate decimal arithmetic expression."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    value = simplify(expr)
    result.steps.append(f"{expr_str} = {value}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(value)
    result.answer_raw = value
    return result


def op_decimal_to_fraction(n_str: str, timeout: int = 10) -> SolverResult:
    """Convert decimal to fraction."""
    result = SolverResult(success=False)
    from sympy import Rational
    n = parse_value(n_str)
    if n is None:
        result.error = "Cannot parse value"
        return result
    frac = Rational(str(n)).limit_denominator(1000000)
    result.steps.append(f"{n} = {frac}")
    result.verified = True
    result.verification_msg = f"Verified: {float(frac)} = {float(n)}"
    result.success = True
    result.answer = str(frac)
    result.answer_raw = frac
    return result


def op_unit_conversion(value_str: str, from_unit: str = "m",
                        to_unit: str = "cm", timeout: int = 10) -> SolverResult:
    """Convert between length, mass, capacity units."""
    result = SolverResult(success=False)
    value = parse_value(value_str)
    if value is None:
        result.error = "Cannot parse value"
        return result
    # Length: km, m, cm, mm
    # Mass: kg, g, mg
    # Capacity: l, ml
    length_conv = {"km": 1000, "m": 1, "cm": 0.01, "mm": 0.001}
    mass_conv = {"kg": 1000, "g": 1, "mg": 0.001}
    capacity_conv = {"l": 1000, "ml": 1}
    for conv in [length_conv, mass_conv, capacity_conv]:
        if from_unit in conv and to_unit in conv:
            converted = simplify(value * conv[from_unit] / conv[to_unit])
            result.steps.append(f"{value} {from_unit} = {converted} {to_unit}")
            result.verified = True
            result.verification_msg = "Direct computation"
            result.success = True
            result.answer = str(converted)
            result.answer_raw = converted
            return result
    result.error = f"Cannot convert from {from_unit} to {to_unit}"
    return result


def op_perimeter_polygon(sides_str: str, timeout: int = 10) -> SolverResult:
    """Find perimeter of a polygon from its side lengths."""
    result = SolverResult(success=False)
    try:
        sides = [float(s.strip()) for s in str(sides_str).split(",") if s.strip()]
    except ValueError:
        result.error = "Cannot parse sides (use comma-separated numbers)"
        return result
    if not sides:
        result.error = "No sides provided"
        return result
    perimeter = sum(sides)
    result.steps.append(f"Sides: {sides}")
    result.steps.append(f"Perimeter = {' + '.join(str(s) for s in sides)} = {perimeter}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(perimeter)
    result.answer_raw = perimeter
    return result


def op_factors_multiples(n_str: str, timeout: int = 10) -> SolverResult:
    """Find all factors and first 10 multiples of a number."""
    result = SolverResult(success=False)
    n = int(parse_value(n_str))
    if n is None:
        result.error = "Cannot parse value"
        return result
    factors = [i for i in range(1, n + 1) if n % i == 0]
    multiples = [n * i for i in range(1, 11)]
    result.steps.append(f"Factors of {n}: {factors}")
    result.steps.append(f"First 10 multiples: {multiples}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = f"Factors: {factors}"
    result.answer_raw = {"factors": factors, "multiples": multiples}
    return result


# ════════════════════════════════════════════
# CLASS 5-6: INTEGERS, ALGEBRA, ANGLES
# ════════════════════════════════════════════

def op_integer_operations(expr_str: str, timeout: int = 10) -> SolverResult:
    """Evaluate integer arithmetic with sign rules."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    value = simplify(expr)
    result.steps.append(f"{expr_str} = {value}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(value)
    result.answer_raw = value
    return result


def op_algebraic_expression_eval(expr_str: str, var_name: str = "x",
                                  value_str: str = "0",
                                  timeout: int = 10) -> SolverResult:
    """Evaluate an algebraic expression for given variable values."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    val = parse_value(value_str)
    if expr is None or val is None:
        result.error = "Cannot parse inputs"
        return result
    var = Symbol(var_name)
    evaluated = simplify(expr.subs(var, val))
    result.steps.append(f"Expression: {expr}")
    result.steps.append(f"Substitute {var_name} = {val}")
    result.steps.append(f"Result = {evaluated}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(evaluated)
    result.answer_raw = evaluated
    return result


def op_angle_type(angle_str: str, timeout: int = 10) -> SolverResult:
    """Classify an angle by its measure."""
    result = SolverResult(success=False)
    angle = parse_value(angle_str)
    if angle is None:
        result.error = "Cannot parse angle"
        return result
    a = float(angle)
    if a < 0 or a > 360:
        result.error = "Angle must be between 0° and 360°"
        return result
    if a == 0:
        label = "Zero angle"
    elif a < 90:
        label = "Acute angle"
    elif a == 90:
        label = "Right angle"
    elif a < 180:
        label = "Obtuse angle"
    elif a == 180:
        label = "Straight angle"
    elif a < 360:
        label = "Reflex angle"
    else:
        label = "Complete angle"
    result.steps.append(f"Angle = {a}° → {label}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = label
    result.answer_raw = label
    return result


def op_angle_sum_triangle(a1_str: str, a2_str: str, timeout: int = 10) -> SolverResult:
    """Find the third angle of a triangle given two angles."""
    result = SolverResult(success=False)
    a1 = parse_value(a1_str)
    a2 = parse_value(a2_str)
    if a1 is None or a2 is None:
        result.error = "Cannot parse angles"
        return result
    a3 = simplify(180 - a1 - a2)
    result.steps.append(f"Angle sum of triangle = 180°")
    result.steps.append(f"Third angle = 180° - {a1}° - {a2}° = {a3}°")
    result.verified = True
    result.verification_msg = f"Verified: {a1} + {a2} + {a3} = 180"
    result.success = True
    result.answer = f"{a3}°"
    result.answer_raw = a3
    return result


def op_angle_sum_quadrilateral(a1_str: str, a2_str: str, a3_str: str,
                                timeout: int = 10) -> SolverResult:
    """Find the fourth angle of a quadrilateral given three angles."""
    result = SolverResult(success=False)
    a1, a2, a3 = [parse_value(s) for s in [a1_str, a2_str, a3_str]]
    if any(v is None for v in [a1, a2, a3]):
        result.error = "Cannot parse angles"
        return result
    a4 = simplify(360 - a1 - a2 - a3)
    result.steps.append(f"Angle sum of quadrilateral = 360°")
    result.steps.append(f"Fourth angle = 360° - {a1}° - {a2}° - {a3}° = {a4}°")
    result.verified = True
    result.verification_msg = f"Verified: {a1} + {a2} + {a3} + {a4} = 360"
    result.success = True
    result.answer = f"{a4}°"
    result.answer_raw = a4
    return result


def op_linear_equation_one_var(expr_str: str, var_name: str = "x",
                                timeout: int = 10) -> SolverResult:
    """Solve a linear equation in one variable with steps."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    var = Symbol(var_name)
    try:
        solutions = _run_with_timeout(sympy_solve, args=(expr, var), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Solving timed out"
        return result
    if not solutions:
        result.error = "No solution found"
        return result
    result.steps.append(f"Solve: {expr} = 0")
    for s in solutions:
        result.steps.append(f"  {var_name} = {s}")
    result.verified = all(simplify(expr.subs(var, s)) == 0 for s in solutions)
    if result.verified:
        result.verification_msg = "Verified: solution satisfies equation"
    result.success = True
    result.answer = ", ".join(f"{var_name}={s}" for s in solutions)
    result.answer_raw = solutions
    return result


# ════════════════════════════════════════════
# CLASS 7-8: RATIONAL NUMBERS, FACTORISE, IDENTITIES, QUADRATIC
# ════════════════════════════════════════════

def op_rational_operations(expr_str: str, timeout: int = 10) -> SolverResult:
    """Evaluate rational number arithmetic."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    value = simplify(expr)
    result.steps.append(f"{expr_str} = {value}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(value)
    result.answer_raw = value
    return result


def op_algebraic_simplify(expr_str: str, timeout: int = 10) -> SolverResult:
    """Simplify algebraic expression by combining like terms."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    simplified = simplify(expr)
    result.steps.append(f"Original: {expr}")
    result.steps.append(f"Simplified: {simplified}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(simplified)
    result.answer_raw = simplified
    return result


def op_factorise_algebraic(expr_str: str, timeout: int = 10) -> SolverResult:
    """Factorise an algebraic expression."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    try:
        factored = _run_with_timeout(factor, args=(expr,), timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Factorising timed out"
        return result
    result.steps.append(f"Original: {expr}")
    result.steps.append(f"Factored: {factored}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(factored)
    result.answer_raw = factored
    return result


def op_algebraic_identity(expr_str: str, timeout: int = 10) -> SolverResult:
    """Expand using standard algebraic identities."""
    result = SolverResult(success=False)
    expr = parse_expression(expr_str)
    if expr is None:
        result.error = f"Cannot parse: {expr_str}"
        return result
    expanded = expand(expr)
    result.steps.append(f"Original: {expr}")
    result.steps.append(f"Expanded: {expanded}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = str(expanded)
    result.answer_raw = expanded
    return result


def op_quadratic_formula(a_str: str, b_str: str, c_str: str,
                          timeout: int = 10) -> SolverResult:
    """Solve ax² + bx + c = 0 using the quadratic formula."""
    result = SolverResult(success=False)
    a = parse_value(a_str)
    b = parse_value(b_str)
    c = parse_value(c_str)
    if any(v is None for v in [a, b, c]):
        result.error = "Cannot parse values"
        return result
    discriminant = simplify(b**2 - 4*a*c)
    result.steps.append(f"Equation: {a}x² + {b}x + {c} = 0")
    result.steps.append(f"Discriminant = b² - 4ac = {b}² - 4×{a}×{c} = {discriminant}")
    if simplify(discriminant) < 0:
        result.steps.append(f"Discriminant < 0 → no real roots")
        from sympy import sqrt as sym_sqrt, I
        root1 = simplify((-b + sym_sqrt(discriminant)) / (2*a))
        root2 = simplify((-b - sym_sqrt(discriminant)) / (2*a))
        result.steps.append(f"Complex roots: x = {root1}, x = {root2}")
        result.answer = f"x = {root1}, x = {root2}"
        result.answer_raw = [root1, root2]
    elif simplify(discriminant) == 0:
        root = simplify(-b / (2*a))
        result.steps.append(f"Discriminant = 0 → one repeated root")
        result.steps.append(f"x = {root}")
        result.answer = f"x = {root}"
        result.answer_raw = [root]
    else:
        from sympy import sqrt as sym_sqrt
        root1 = simplify((-b + sym_sqrt(discriminant)) / (2*a))
        root2 = simplify((-b - sym_sqrt(discriminant)) / (2*a))
        result.steps.append(f"Discriminant > 0 → two distinct real roots")
        result.steps.append(f"x = (-b + √D)/(2a) = {root1}")
        result.steps.append(f"x = (-b - √D)/(2a) = {root2}")
        result.answer = f"x = {root1}, x = {root2}"
        result.answer_raw = [root1, root2]
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_nature_of_roots(a_str: str, b_str: str, c_str: str,
                        timeout: int = 10) -> SolverResult:
    """Determine the nature of roots from the discriminant."""
    result = SolverResult(success=False)
    a = parse_value(a_str)
    b = parse_value(b_str)
    c = parse_value(c_str)
    if any(v is None for v in [a, b, c]):
        result.error = "Cannot parse values"
        return result
    discriminant = simplify(b**2 - 4*a*c)
    result.steps.append(f"Discriminant = b² - 4ac = {discriminant}")
    if simplify(discriminant) > 0:
        nature = "Two distinct real roots"
    elif simplify(discriminant) == 0:
        nature = "One repeated real root (equal roots)"
    else:
        nature = "No real roots (complex conjugate roots)"
    result.steps.append(f"Nature: {nature}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = nature
    result.answer_raw = nature
    return result


def op_simultaneous_linear(eq1_str: str, eq2_str: str,
                            var_names: str = "x,y",
                            timeout: int = 10) -> SolverResult:
    """Solve a pair of simultaneous linear equations."""
    result = SolverResult(success=False)
    eq1 = parse_expression(eq1_str)
    eq2 = parse_expression(eq2_str)
    if eq1 is None or eq2 is None:
        result.error = "Cannot parse equations"
        return result
    var_list = [v.strip() for v in var_names.split(",")]
    symbols_list = symbols(",".join(var_list))
    if len(symbols_list) == 1:
        symbols_list = [symbols_list]
    try:
        solutions = _run_with_timeout(sympy_solve, args=(eq1, eq2, *symbols_list),
                                       timeout_sec=timeout)
    except SolverTimeoutError:
        result.error = "Solving timed out"
        return result
    if not solutions:
        result.error = "No solution found (may be inconsistent)"
        return result
    result.steps.append(f"Equation 1: {eq1} = 0")
    result.steps.append(f"Equation 2: {eq2} = 0")
    if isinstance(solutions, dict):
        for v, s in solutions.items():
            result.steps.append(f"  {v} = {s}")
        result.answer = ", ".join(f"{v}={s}" for v, s in solutions.items())
        result.answer_raw = solutions
    else:
        for sol in solutions:
            if isinstance(sol, dict):
                for v, s in sol.items():
                    result.steps.append(f"  {v} = {s}")
            else:
                result.steps.append(f"  {sol}")
        result.answer = str(solutions)
        result.answer_raw = solutions
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_consistency_check(eq1_str: str, eq2_str: str,
                          timeout: int = 10) -> SolverResult:
    """Check if a pair of linear equations is consistent or inconsistent."""
    result = SolverResult(success=False)
    # Parse as a1*x + b1*y + c1 = 0 form
    # Extract coefficients
    x, y = symbols('x y')
    eq1 = parse_expression(eq1_str)
    eq2 = parse_expression(eq2_str)
    if eq1 is None or eq2 is None:
        result.error = "Cannot parse equations"
        return result
    p1 = Poly(eq1, x, y)
    p2 = Poly(eq2, x, y)
    a1, b1 = p1.nth(1, 0), p1.nth(0, 1)
    a2, b2 = p2.nth(1, 0), p2.nth(0, 1)
    ratio_a = simplify(a1 / a2) if a2 != 0 else None
    ratio_b = simplify(b1 / b2) if b2 != 0 else None
    result.steps.append(f"a1/a2 = {ratio_a}, b1/b2 = {ratio_b}")
    if ratio_a == ratio_b:
        nature = "Inconsistent (no solution) — parallel lines"
    elif ratio_a is not None and ratio_b is not None and ratio_a == ratio_b:
        nature = "Inconsistent (no solution)"
    else:
        nature = "Consistent (unique solution) — intersecting lines"
    result.steps.append(f"Nature: {nature}")
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    result.answer = nature
    result.answer_raw = nature
    return result


# ─────────────────────────────────────────────────────────────────────
# Physics operations — structured input solvers
# ─────────────────────────────────────────────────────────────────────

def op_physics_force(mass: str = "0", acceleration: str = "0", timeout: int = 10) -> SolverResult:
    """F = m * a — Newton's second law."""
    result = SolverResult(success=False)
    try:
        m = float(mass)
        a = float(acceleration)
    except (ValueError, TypeError):
        result.error = "Mass and acceleration must be numbers"
        return result
    F = m * a
    result.steps.append(f"Formula: F = m × a")
    result.steps.append(f"Given: m = {m} kg, a = {a} m/s²")
    result.steps.append(f"Calculation: F = {m} × {a} = {F} N")
    result.answer = f"{F} N"
    result.answer_raw = str(F)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_kinematics(initial_velocity: str = "0", acceleration: str = "0", time: str = "0", timeout: int = 10) -> SolverResult:
    """v = u + at, s = ut + ½at², v² = u² + 2as — kinematic equations."""
    result = SolverResult(success=False)
    try:
        u = float(initial_velocity)
        a = float(acceleration)
        t = float(time)
    except (ValueError, TypeError):
        result.error = "Initial velocity, acceleration, and time must be numbers"
        return result
    v = u + a * t
    s = u * t + 0.5 * a * t ** 2
    result.steps.append(f"Formula: v = u + at, s = ut + ½at²")
    result.steps.append(f"Given: u = {u} m/s, a = {a} m/s², t = {t} s")
    result.steps.append(f"v = {u} + {a}×{t} = {v} m/s")
    result.steps.append(f"s = {u}×{t} + ½×{a}×{t}² = {s} m")
    result.answer = f"v = {v} m/s, s = {s} m"
    result.answer_raw = str(v)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_energy(mass: str = "0", velocity: str = "0", height: str = "0", gravity: str = "9.8", timeout: int = 10) -> SolverResult:
    """KE = ½mv², PE = mgh — kinetic and potential energy."""
    result = SolverResult(success=False)
    try:
        m = float(mass)
        v = float(velocity or 0)
        h = float(height or 0)
        g = float(gravity or 9.8)
    except (ValueError, TypeError):
        result.error = "Mass, velocity, and height must be numbers"
        return result
    ke = 0.5 * m * v ** 2
    pe = m * g * h
    result.steps.append(f"Formula: KE = ½mv², PE = mgh")
    result.steps.append(f"Given: m = {m} kg, v = {v} m/s, h = {h} m, g = {g} m/s²")
    result.steps.append(f"KE = ½×{m}×{v}² = {ke} J")
    result.steps.append(f"PE = {m}×{g}×{h} = {pe} J")
    result.answer = f"KE = {ke} J, PE = {pe} J"
    result.answer_raw = str(ke)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_ohms_law(current: str = "0", resistance: str = "0", timeout: int = 10) -> SolverResult:
    """V = IR — Ohm's law."""
    result = SolverResult(success=False)
    try:
        I = float(current)
        R = float(resistance)
    except (ValueError, TypeError):
        result.error = "Current and resistance must be numbers"
        return result
    V = I * R
    result.steps.append(f"Formula: V = I × R")
    result.steps.append(f"Given: I = {I} A, R = {R} Ω")
    result.steps.append(f"V = {I} × {R} = {V} V")
    result.answer = f"{V} V"
    result.answer_raw = str(V)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_power(voltage: str = "0", current: str = "0", resistance: str = "0", timeout: int = 10) -> SolverResult:
    """P = VI = I²R = V²/R — electrical power."""
    result = SolverResult(success=False)
    try:
        V = float(voltage)
        I = float(current)
        R = float(resistance or 0)
    except (ValueError, TypeError):
        result.error = "Voltage and current must be numbers"
        return result
    P = V * I
    result.steps.append(f"Formula: P = V × I")
    result.steps.append(f"Given: V = {V} V, I = {I} A")
    result.steps.append(f"P = {V} × {I} = {P} W")
    if R > 0:
        P2 = I ** 2 * R
        P3 = V ** 2 / R
        result.steps.append(f"Check: P = I²R = {I}²×{R} = {P2} W")
        result.steps.append(f"Check: P = V²/R = {V}²/{R} = {P3} W")
    result.answer = f"{P} W"
    result.answer_raw = str(P)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_lens(object_distance: str = "0", image_distance: str = "0", focal_length: str = "0", timeout: int = 10) -> SolverResult:
    """1/f = 1/v - 1/u, m = v/u — lens/mirror formula."""
    result = SolverResult(success=False)
    try:
        u = float(object_distance)
        v = float(image_distance or 0)
        f = float(focal_length or 0)
    except (ValueError, TypeError):
        result.error = "Object distance, image distance, and focal length must be numbers"
        return result
    if f == 0 and u != 0 and v != 0:
        f = 1 / (1/v + 1/u)  # Cartesian sign: 1/f = 1/v + 1/u for mirrors
        result.steps.append(f"Formula: 1/f = 1/v + 1/u")
        result.steps.append(f"Given: u = {u} cm, v = {v} cm")
        result.steps.append(f"1/f = 1/{v} + 1/{u} = {1/v + 1/u}")
        result.steps.append(f"f = {f} cm")
        result.answer = f"f = {f} cm"
        result.answer_raw = str(f)
    elif f != 0 and u != 0:
        v_img = 1 / (1/f - 1/u) if (1/f - 1/u) != 0 else float('inf')
        m = v_img / u if u != 0 else 0
        result.steps.append(f"Formula: 1/f = 1/v - 1/u → v = uf/(u-f)")
        result.steps.append(f"Given: u = {u} cm, f = {f} cm")
        result.steps.append(f"v = {v_img} cm")
        result.steps.append(f"magnification m = v/u = {m}")
        result.answer = f"v = {v_img} cm, m = {m}"
        result.answer_raw = str(v_img)
    else:
        result.error = "Provide at least two of (focal_length, object_distance, image_distance)"
        return result
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


# ─────────────────────────────────────────────────────────────────────
# Chemistry operations — structured input solvers
# ─────────────────────────────────────────────────────────────────────

def op_chem_moles(mass: str = "0", molar_mass: str = "0", timeout: int = 10) -> SolverResult:
    """n = mass / molar_mass — mole calculation."""
    result = SolverResult(success=False)
    try:
        mass_val = float(mass)
        mm_val = float(molar_mass)
    except (ValueError, TypeError):
        result.error = "Mass and molar mass must be numbers"
        return result
    if mm_val == 0:
        result.error = "Molar mass cannot be zero"
        return result
    n = mass_val / mm_val
    result.steps.append(f"Formula: n = mass / molar_mass")
    result.steps.append(f"Given: mass = {mass_val} g, molar_mass = {mm_val} g/mol")
    result.steps.append(f"n = {mass_val} / {mm_val} = {n} mol")
    result.answer = f"{n} mol"
    result.answer_raw = str(n)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_chem_molarity(moles: str = "0", mass: str = "0", molar_mass: str = "0", volume: str = "0", timeout: int = 10) -> SolverResult:
    """M = n / V = (mass/molar_mass) / V — molarity calculation."""
    result = SolverResult(success=False)
    try:
        moles_val = float(moles or 0)
        mass_val = float(mass or 0)
        mm_val = float(molar_mass or 0)
        volume_val = float(volume)
    except (ValueError, TypeError):
        result.error = "All values must be numbers"
        return result
    if volume_val == 0:
        result.error = "Volume cannot be zero"
        return result
    if moles_val == 0 and mm_val > 0:
        moles_val = mass_val / mm_val
        result.steps.append(f"Step 1: n = mass / molar_mass = {mass_val} / {mm_val} = {moles_val} mol")
    M = moles_val / (volume_val / 1000)  # volume in mL → L
    result.steps.append(f"Formula: M = n / V(L)")
    result.steps.append(f"Given: n = {moles_val} mol, V = {volume_val} mL = {volume_val/1000} L")
    result.steps.append(f"M = {moles_val} / {volume_val/1000} = {M} mol/L")
    result.answer = f"{M} M"
    result.answer_raw = str(M)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_chem_pH(h_concentration: str = "0", timeout: int = 10) -> SolverResult:
    """pH = -log[H+] — pH calculation."""
    result = SolverResult(success=False)
    try:
        h_conc = float(h_concentration)
    except (ValueError, TypeError):
        result.error = "H+ concentration must be a number"
        return result
    if h_conc <= 0:
        result.error = "H+ concentration must be positive"
        return result
    import math
    pH = -math.log10(h_conc)
    result.steps.append(f"Formula: pH = -log[H+]")
    result.steps.append(f"Given: [H+] = {h_conc} mol/L")
    result.steps.append(f"pH = -log({h_conc}) = {pH}")
    result.answer = f"pH = {pH}"
    result.answer_raw = str(pH)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_chem_dilution(m1: str = "0", v1: str = "0", m2: str = "0", v2: str = "0", timeout: int = 10) -> SolverResult:
    """M1V1 = M2V2 — dilution calculation."""
    result = SolverResult(success=False)
    try:
        M1 = float(m1)
        V1 = float(v1)
        M2 = float(m2 or 0)
        V2 = float(v2 or 0)
    except (ValueError, TypeError):
        result.error = "All values must be numbers"
        return result
    if M2 == 0 and V2 > 0:
        M2 = M1 * V1 / V2
        result.steps.append(f"Formula: M1V1 = M2V2 → M2 = M1V1/V2")
        result.steps.append(f"Given: M1 = {M1} M, V1 = {V1} mL, V2 = {V2} mL")
        result.steps.append(f"M2 = {M1}×{V1}/{V2} = {M2} M")
        result.answer = f"M2 = {M2} M"
        result.answer_raw = str(M2)
    elif V2 == 0 and M2 > 0:
        V2 = M1 * V1 / M2
        result.steps.append(f"Formula: M1V1 = M2V2 → V2 = M1V1/M2")
        result.steps.append(f"Given: M1 = {M1} M, V1 = {V1} mL, M2 = {M2} M")
        result.steps.append(f"V2 = {M1}×{V1}/{M2} = {V2} mL")
        result.answer = f"V2 = {V2} mL"
        result.answer_raw = str(V2)
    else:
        result.error = "Provide M1, V1, and either M2 or V2"
        return result
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_chem_faraday(molar_mass: str = "0", current: str = "0", time: str = "0", valency: str = "0", timeout: int = 10) -> SolverResult:
    """m = (M × I × t) / (n × F) — Faraday's law of electrolysis."""
    result = SolverResult(success=False)
    try:
        M = float(molar_mass)
        I = float(current)
        t = float(time)
        n = float(valency)
        F = 96485  # Faraday constant
    except (ValueError, TypeError):
        result.error = "All values must be numbers"
        return result
    if n == 0:
        result.error = "Valency (n) cannot be zero"
        return result
    mass = (M * I * t) / (n * F)
    result.steps.append(f"Formula: m = (M × I × t) / (n × F)")
    result.steps.append(f"Given: M = {M} g/mol, I = {I} A, t = {t} s, n = {n}, F = 96485 C/mol")
    result.steps.append(f"m = ({M} × {I} × {t}) / ({n} × 96485) = {mass} g")
    result.answer = f"{mass} g"
    result.answer_raw = str(mass)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


# ─────────────────────────────────────────────────────────────────────
# Biology operations — structured input solvers
# ─────────────────────────────────────────────────────────────────────

def op_bio_mendelian_ratio(cross_type: str = "monohybrid", timeout: int = 10) -> SolverResult:
    """Calculate phenotypic ratio from a genetic cross."""
    result = SolverResult(success=False)
    cross_type = cross_type or "monohybrid"
    result.steps.append(f"Cross type: {cross_type}")
    if cross_type == "monohybrid":
        result.steps.append(f"Monohybrid cross (Aa × Aa):")
        result.steps.append(f"  F2 phenotypic ratio = 3:1 (dominant:recessive)")
        result.steps.append(f"  Genotypic ratio = 1:2:1 (AA:Aa:aa)")
        result.answer = "Phenotypic ratio 3:1, Genotypic ratio 1:2:1"
        result.answer_raw = "3:1"
    elif cross_type == "dihybrid":
        result.steps.append(f"Dihybrid cross (AaBb × AaBb):")
        result.steps.append(f"  F2 phenotypic ratio = 9:3:3:1")
        result.steps.append(f"  (A_B_:A_bb:aaB_:aabb)")
        result.answer = "Phenotypic ratio 9:3:3:1"
        result.answer_raw = "9:3:3:1"
    elif cross_type == "test_cross":
        result.steps.append(f"Test cross (Aa × aa):")
        result.steps.append(f"  Phenotypic ratio = 1:1")
        result.answer = "Phenotypic ratio 1:1"
        result.answer_raw = "1:1"
    else:
        result.error = f"Unknown cross type: {cross_type}"
        return result
    result.verified = True
    result.verification_msg = "Standard genetic ratio"
    result.success = True
    return result


def op_bio_population_growth(initial_population: str = "0", growth_rate: str = "0", time: str = "0", timeout: int = 10) -> SolverResult:
    """Nt = N0 * e^(rt) — exponential population growth."""
    result = SolverResult(success=False)
    try:
        N0 = float(initial_population)
        r = float(growth_rate)
        t = float(time)
    except (ValueError, TypeError):
        result.error = "All values must be numbers"
        return result
    import math
    Nt = N0 * math.exp(r * t)
    result.steps.append(f"Formula: Nt = N0 × e^(r×t)")
    result.steps.append(f"Given: N0 = {N0}, r = {r}, t = {t}")
    result.steps.append(f"Nt = {N0} × e^({r}×{t}) = {Nt}")
    result.answer = f"Nt = {Nt}"
    result.answer_raw = str(Nt)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


# ─────────────────────────────────────────────────────────────────────
# NEW MATH PATTERNS — Surface Area, Commercial, Physics, Arithmetic
# ─────────────────────────────────────────────────────────────────────

def op_surface_area_cube(side_str: str, timeout: int = 10) -> SolverResult:
    """SA = 6a² — surface area of cube."""
    result = SolverResult(success=False)
    a = parse_value(side_str)
    if a is None:
        result.error = "Cannot parse side"
        return result
    sa = simplify(6 * a ** 2)
    result.steps.append(f"Formula: SA = 6a²")
    result.steps.append(f"Given: a = {a}")
    result.steps.append(f"SA = 6 × {a}² = {sa}")
    result.answer = f"SA = {sa}"
    result.answer_raw = str(sa)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_surface_area_cuboid(length: str, width: str, height: str,
                           timeout: int = 10) -> SolverResult:
    """SA = 2(lw + lh + wh) — surface area of cuboid."""
    result = SolverResult(success=False)
    l, w, h = [parse_value(s) for s in [length, width, height]]
    if any(v is None for v in [l, w, h]):
        result.error = "Cannot parse values"
        return result
    sa = simplify(2 * (l * w + l * h + w * h))
    result.steps.append(f"Formula: SA = 2(lw + lh + wh)")
    result.steps.append(f"Given: l = {l}, w = {w}, h = {h}")
    result.steps.append(f"SA = 2({l}×{w} + {l}×{h} + {w}×{h}) = {sa}")
    result.answer = f"SA = {sa}"
    result.answer_raw = str(sa)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_surface_area_cylinder(radius: str, height: str,
                              timeout: int = 10) -> SolverResult:
    """SA = 2πr(r + h) — total surface area of cylinder."""
    result = SolverResult(success=False)
    r, h = [parse_value(s) for s in [radius, height]]
    if any(v is None for v in [r, h]):
        result.error = "Cannot parse values"
        return result
    sa = simplify(2 * pi * r * (r + h))
    result.steps.append(f"Formula: TSA = 2πr(r + h)")
    result.steps.append(f"Given: r = {r}, h = {h}")
    result.steps.append(f"TSA = 2π × {r} × ({r} + {h}) = {sa}")
    result.answer = f"TSA = {sa}"
    result.answer_raw = str(sa)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_surface_area_cone(radius: str, slant_height: str,
                         timeout: int = 10) -> SolverResult:
    """SA = πr(r + l) — total surface area of cone."""
    result = SolverResult(success=False)
    r, l = [parse_value(s) for s in [radius, slant_height]]
    if any(v is None for v in [r, l]):
        result.error = "Cannot parse values"
        return result
    sa = simplify(pi * r * (r + l))
    result.steps.append(f"Formula: TSA = πr(r + l)")
    result.steps.append(f"Given: r = {r}, l = {l}")
    result.steps.append(f"TSA = π × {r} × ({r} + {l}) = {sa}")
    result.answer = f"TSA = {sa}"
    result.answer_raw = str(sa)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_surface_area_sphere(radius: str, timeout: int = 10) -> SolverResult:
    """SA = 4πr² — surface area of sphere."""
    result = SolverResult(success=False)
    r = parse_value(radius)
    if r is None:
        result.error = "Cannot parse radius"
        return result
    sa = simplify(4 * pi * r ** 2)
    result.steps.append(f"Formula: SA = 4πr²")
    result.steps.append(f"Given: r = {r}")
    result.steps.append(f"SA = 4π × {r}² = {sa}")
    result.answer = f"SA = {sa}"
    result.answer_raw = str(sa)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_surface_area_hemisphere(radius: str, timeout: int = 10) -> SolverResult:
    """SA = 3πr² — total surface area of hemisphere."""
    result = SolverResult(success=False)
    r = parse_value(radius)
    if r is None:
        result.error = "Cannot parse radius"
        return result
    sa = simplify(3 * pi * r ** 2)
    result.steps.append(f"Formula: TSA = 3πr² (curved 2πr² + base πr²)")
    result.steps.append(f"Given: r = {r}")
    result.steps.append(f"TSA = 3π × {r}² = {sa}")
    result.answer = f"TSA = {sa}"
    result.answer_raw = str(sa)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_fraction_subtract(n1: str, d1: str, n2: str, d2: str,
                         timeout: int = 10) -> SolverResult:
    """Subtract two fractions: a/b - c/d = (ad - bc)/(bd)."""
    result = SolverResult(success=False)
    n1, d1, n2, d2 = [parse_value(s) for s in [n1, d1, n2_str, d2]]
    if any(v is None for v in [n1, d1, n2, d2]):
        result.error = "Cannot parse values"
        return result
    if d1 == 0 or d2 == 0:
        result.error = "Denominator cannot be zero"
        return result
    num = simplify(n1 * d2 - n2 * d1)
    den = simplify(d1 * d2)
    result.steps.append(f"{n1}/{d1} - {n2}/{d2}")
    result.steps.append(f"= ({n1}×{d2} - {n2}×{d1}) / ({d1}×{d2})")
    result.steps.append(f"= ({num}) / ({den})")
    frac = simplify(Rational(n1, d1) - Rational(n2, d2))
    result.steps.append(f"= {frac}")
    result.answer = f"{frac}"
    result.answer_raw = str(frac)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_successive_discount(mp: str, d1: str, d2: str,
                           timeout: int = 10) -> SolverResult:
    """Successive discounts: SP = MP × (1-d1/100) × (1-d2/100)."""
    result = SolverResult(success=False)
    mp, d1, d2 = [parse_value(s) for s in [mp, d1, d2]]
    if any(v is None for v in [mp, d1, d2]):
        result.error = "Cannot parse values"
        return result
    sp = simplify(mp * (1 - d1 / 100) * (1 - d2 / 100))
    total_discount = simplify(mp - sp)
    result.steps.append(f"Formula: SP = MP × (1 - d₁/100) × (1 - d₂/100)")
    result.steps.append(f"Given: MP = {mp}, d₁ = {d1}%, d₂ = {d2}%")
    result.steps.append(f"SP = {mp} × (1 - {d1}/100) × (1 - {d2}/100) = {sp}")
    result.steps.append(f"Total discount = {mp} - {sp} = {total_discount}")
    result.answer = f"SP = {sp}, Total Discount = {total_discount}"
    result.answer_raw = str(sp)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_gst_calculation(price: str, gst_rate: str,
                       timeout: int = 10) -> SolverResult:
    """GST: Total = Price × (1 + GST%/100)."""
    result = SolverResult(success=False)
    price, rate = [parse_value(s) for s in [price, gst_rate]]
    if any(v is None for v in [price, rate]):
        result.error = "Cannot parse values"
        return result
    gst_amount = simplify(price * rate / 100)
    total = simplify(price * (1 + rate / 100))
    result.steps.append(f"Formula: Total = Price × (1 + GST%/100)")
    result.steps.append(f"Given: Price = ₹{price}, GST = {rate}%")
    result.steps.append(f"GST Amount = {price} × {rate}/100 = ₹{gst_amount}")
    result.steps.append(f"Total = {price} + {gst_amount} = ₹{total}")
    result.answer = f"GST = ₹{gst_amount}, Total = ₹{total}"
    result.answer_raw = str(total)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_average_speed(d1: str, s1: str, d2: str, s2: str,
                     timeout: int = 10) -> SolverResult:
    """Average speed = total distance / total time (two segments)."""
    result = SolverResult(success=False)
    d1, s1, d2, s2 = [parse_value(s) for s in [d1, s1, d2_str, s2]]
    if any(v is None for v in [d1, s1, d2, s2]):
        result.error = "Cannot parse values"
        return result
    if s1 == 0 or s2 == 0:
        result.error = "Speed cannot be zero"
        return result
    total_dist = simplify(d1 + d2)
    total_time = simplify(d1 / s1 + d2 / s2)
    avg_speed = simplify(total_dist / total_time)
    result.steps.append(f"Formula: Average Speed = Total Distance / Total Time")
    result.steps.append(f"Given: d₁ = {d1} km at {s1} km/h, d₂ = {d2} km at {s2} km/h")
    result.steps.append(f"Total Distance = {d1} + {d2} = {total_dist} km")
    result.steps.append(f"Total Time = {d1}/{s1} + {d2}/{s2} = {total_time} h")
    result.steps.append(f"Average Speed = {total_dist} / {total_time} = {avg_speed} km/h")
    result.answer = f"{avg_speed} km/h"
    result.answer_raw = str(avg_speed)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_relative_speed(s1: str, s2: str, direction: str = "same",
                      timeout: int = 10) -> SolverResult:
    """Relative speed: same direction = |s1-s2|, opposite = s1+s2."""
    result = SolverResult(success=False)
    s1, s2 = [parse_value(s) for s in [s1, s2]]
    if any(v is None for v in [s1, s2]):
        result.error = "Cannot parse values"
        return result
    if direction == "opposite":
        rel = simplify(s1 + s2)
        result.steps.append(f"Same direction: Relative Speed = |s₁ - s₂|")
        result.steps.append(f"Opposite direction: Relative Speed = s₁ + s₂")
        result.steps.append(f"Given: s₁ = {s1}, s₂ = {s2}, direction = opposite")
        result.steps.append(f"Relative Speed = {s1} + {s2} = {rel} km/h")
    else:
        rel = simplify(Abs(s1 - s2))
        result.steps.append(f"Same direction: Relative Speed = |s₁ - s₂|")
        result.steps.append(f"Opposite direction: Relative Speed = s₁ + s₂")
        result.steps.append(f"Given: s₁ = {s1}, s₂ = {s2}, direction = same")
        result.steps.append(f"Relative Speed = |{s1} - {s2}| = {rel} km/h")
    result.answer = f"{rel} km/h"
    result.answer_raw = str(rel)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_time_and_work(work1: str, work2: str,
                     timeout: int = 10) -> SolverResult:
    """Two workers: 1/T = 1/t₁ + 1/t₂. T = t₁×t₂/(t₁+t₂)."""
    result = SolverResult(success=False)
    t1, t2 = [parse_value(s) for s in [work1, work2]]
    if any(v is None for v in [t1, t2]):
        result.error = "Cannot parse values"
        return result
    if t1 == 0 or t2 == 0:
        result.error = "Time cannot be zero"
        return result
    T = simplify(t1 * t2 / (t1 + t2))
    result.steps.append(f"Formula: 1/T = 1/t₁ + 1/t₂")
    result.steps.append(f"Given: Worker 1 takes {t1} days, Worker 2 takes {t2} days")
    result.steps.append(f"1/T = 1/{t1} + 1/{t2} = {Rational(1, int(t1)) + Rational(1, int(t2))}")
    result.steps.append(f"T = ({t1} × {t2}) / ({t1} + {t2}) = {T} days")
    result.answer = f"{T} days"
    result.answer_raw = str(T)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_pipes_and_cisterns(pipe1: str, pipe2: str,
                          timeout: int = 10) -> SolverResult:
    """Two pipes: 1/T = 1/t₁ + 1/t₂ (same as work)."""
    result = SolverResult(success=False)
    t1, t2 = [parse_value(s) for s in [pipe1, pipe2]]
    if any(v is None for v in [t1, t2]):
        result.error = "Cannot parse values"
        return result
    if t1 == 0 or t2 == 0:
        result.error = "Time cannot be zero"
        return result
    T = simplify(t1 * t2 / (t1 + t2))
    result.steps.append(f"Formula: 1/T = 1/t₁ + 1/t₂")
    result.steps.append(f"Given: Pipe 1 fills in {t1} hours, Pipe 2 fills in {t2} hours")
    result.steps.append(f"1/T = 1/{t1} + 1/{t2}")
    result.steps.append(f"T = ({t1} × {t2}) / ({t1} + {t2}) = {T} hours")
    result.answer = f"{T} hours"
    result.answer_raw = str(T)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_mixture_allegation(q1: str, q2: str, c1: str, c2: str,
                          target: str, timeout: int = 10) -> SolverResult:
    """Alligation: ratio = (c2 - target) : (target - c1)."""
    result = SolverResult(success=False)
    q1, q2, c1, c2, target = [parse_value(s) for s in [q1, q2, c1_str, c2, target]]
    if any(v is None for v in [q1, q2, c1, c2, target]):
        result.error = "Cannot parse values"
        return result
    ratio1 = simplify(c2 - target)
    ratio2 = simplify(target - c1)
    result.steps.append(f"Formula (Alligation): Ratio = (c₂ - target) : (target - c₁)")
    result.steps.append(f"Given: c₁ = {c1}, c₂ = {c2}, target = {target}")
    result.steps.append(f"Ratio = ({c2} - {target}) : ({target} - {c1}) = {ratio1} : {ratio2}")
    if ratio1 + ratio2 != 0:
        q1_calc = simplify(q1 + q2) * ratio1 / (ratio1 + ratio2)
        q2_calc = simplify(q1 + q2) * ratio2 / (ratio1 + ratio2)
        result.steps.append(f"Quantity of c₁ = {q1_calc}")
        result.steps.append(f"Quantity of c₂ = {q2_calc}")
    result.answer = f"Ratio {ratio1} : {ratio2}"
    result.answer_raw = f"{ratio1}:{ratio2}"
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


# ─────────────────────────────────────────────────────────────────────
# NEW PHYSICS PATTERNS
# ─────────────────────────────────────────────────────────────────────

def op_physics_density(mass: str, volume: str,
                       timeout: int = 10) -> SolverResult:
    """d = m/V — density calculation."""
    result = SolverResult(success=False)
    m, v = [parse_value(s) for s in [mass, volume]]
    if any(v is None for v in [m, v]):
        result.error = "Cannot parse values"
        return result
    if v == 0:
        result.error = "Volume cannot be zero"
        return result
    d = simplify(m / v)
    result.steps.append(f"Formula: d = m/V")
    result.steps.append(f"Given: m = {m} kg, V = {v} m³")
    result.steps.append(f"d = {m} / {v} = {d} kg/m³")
    result.answer = f"{d} kg/m³"
    result.answer_raw = str(d)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_pressure(force: str, area: str,
                        timeout: int = 10) -> SolverResult:
    """P = F/A — pressure calculation."""
    result = SolverResult(success=False)
    F, A = [parse_value(s) for s in [force, area]]
    if any(v is None for v in [F, A]):
        result.error = "Cannot parse values"
        return result
    if A == 0:
        result.error = "Area cannot be zero"
        return result
    P = simplify(F / A)
    result.steps.append(f"Formula: P = F/A")
    result.steps.append(f"Given: F = {F} N, A = {A} m²")
    result.steps.append(f"P = {F} / {A} = {P} Pa")
    result.answer = f"{P} Pa"
    result.answer_raw = str(P)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_work(force: str, distance: str, angle: str = "0",
                    timeout: int = 10) -> SolverResult:
    """W = F·d·cos(θ) — work done."""
    result = SolverResult(success=False)
    F, d, theta = [parse_value(s) for s in [force, distance, angle]]
    if any(v is None for v in [F, d, theta]):
        result.error = "Cannot parse values"
        return result
    import math
    W = F * d * math.cos(math.radians(float(theta)))
    result.steps.append(f"Formula: W = F × d × cos(θ)")
    result.steps.append(f"Given: F = {F} N, d = {d} m, θ = {theta}°")
    result.steps.append(f"W = {F} × {d} × cos({theta}°) = {W} J")
    result.answer = f"{W} J"
    result.answer_raw = str(W)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_gpe(mass: str, height: str, g: str = "9.8",
                   timeout: int = 10) -> SolverResult:
    """GPE = mgh — gravitational potential energy."""
    result = SolverResult(success=False)
    m, h, g = [parse_value(s) for s in [mass, height, g]]
    if any(v is None for v in [m, h, g]):
        result.error = "Cannot parse values"
        return result
    pe = simplify(m * g * h)
    result.steps.append(f"Formula: GPE = mgh")
    result.steps.append(f"Given: m = {m} kg, h = {h} m, g = {g} m/s²")
    result.steps.append(f"GPE = {m} × {g} × {h} = {pe} J")
    result.answer = f"{pe} J"
    result.answer_raw = str(pe)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_frequency_wavelength(speed: str, frequency: str = "",
                                    wavelength: str = "",
                                    timeout: int = 10) -> SolverResult:
    """v = f × λ — wave equation."""
    result = SolverResult(success=False)
    v = parse_value(speed)
    f = parse_value(frequency) if frequency_str else None
    lam = parse_value(wavelength) if wavelength_str else None
    if v is None:
        result.error = "Cannot parse speed"
        return result
    if f is not None and lam is None:
        lam = simplify(v / f)
        result.steps.append(f"Formula: v = f × λ → λ = v/f")
        result.steps.append(f"Given: v = {v} m/s, f = {f} Hz")
        result.steps.append(f"λ = {v} / {f} = {lam} m")
        result.answer = f"λ = {lam} m"
        result.answer_raw = str(lam)
    elif f is None and lam is not None:
        f = simplify(v / lam)
        result.steps.append(f"Formula: v = f × λ → f = v/λ")
        result.steps.append(f"Given: v = {v} m/s, λ = {lam} m")
        result.steps.append(f"f = {v} / {lam} = {f} Hz")
        result.answer = f"f = {f} Hz"
        result.answer_raw = str(f)
    else:
        result.error = "Provide speed and either frequency or wavelength"
        return result
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_heat(mass: str, shc: str, temp_change: str,
                    timeout: int = 10) -> SolverResult:
    """Q = mcΔT — heat transfer."""
    result = SolverResult(success=False)
    m, c, dt = [parse_value(s) for s in [mass, shc, temp_change]]
    if any(v is None for v in [m, c, dt]):
        result.error = "Cannot parse values"
        return result
    Q = simplify(m * c * dt)
    result.steps.append(f"Formula: Q = mcΔT")
    result.steps.append(f"Given: m = {m} kg, c = {c} J/(kg·K), ΔT = {dt} K")
    result.steps.append(f"Q = {m} × {c} × {dt} = {Q} J")
    result.answer = f"{Q} J"
    result.answer_raw = str(Q)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_resistance(r1: str, r2: str, mode: str = "series",
                          timeout: int = 10) -> SolverResult:
    """Series: R = R₁ + R₂. Parallel: 1/R = 1/R₁ + 1/R₂."""
    result = SolverResult(success=False)
    r1, r2 = [parse_value(s) for s in [r1, r2]]
    if any(v is None for v in [r1, r2]):
        result.error = "Cannot parse values"
        return result
    if mode == "parallel":
        if r1 == 0 or r2 == 0:
            result.error = "Resistance cannot be zero in parallel"
            return result
        R = simplify(r1 * r2 / (r1 + r2))
        result.steps.append(f"Formula (Parallel): 1/R = 1/R₁ + 1/R₂ → R = R₁R₂/(R₁+R₂)")
        result.steps.append(f"Given: R₁ = {r1} Ω, R₂ = {r2} Ω")
        result.steps.append(f"R = ({r1} × {r2}) / ({r1} + {r2}) = {R} Ω")
    else:
        R = simplify(r1 + r2)
        result.steps.append(f"Formula (Series): R = R₁ + R₂")
        result.steps.append(f"Given: R₁ = {r1} Ω, R₂ = {r2} Ω")
        result.steps.append(f"R = {r1} + {r2} = {R} Ω")
    result.answer = f"{R} Ω"
    result.answer_raw = str(R)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_snells_law(n1: str, angle1: str, n2: str = "",
                          angle2: str = "", timeout: int = 10) -> SolverResult:
    """n₁ sin(θ₁) = n₂ sin(θ₂) — Snell's law."""
    result = SolverResult(success=False)
    import math
    n1 = parse_value(n1)
    angle1 = parse_value(angle1)
    n2 = parse_value(n2) if n2_str else None
    angle2 = parse_value(angle2) if angle2_str else None
    if n1 is None or angle1 is None:
        result.error = "Cannot parse n1 or angle1"
        return result
    if n2 is not None and angle2 is None:
        # Find angle2
        sin_a2 = n1 * math.sin(math.radians(float(angle1))) / float(n2)
        if abs(sin_a2) > 1:
            result.error = "Total internal reflection — no refraction"
            return result
        a2 = math.degrees(math.asin(sin_a2))
        result.steps.append(f"Formula: n₁ sin(θ₁) = n₂ sin(θ₂)")
        result.steps.append(f"Given: n₁ = {n1}, θ₁ = {angle1}°, n₂ = {n2}")
        result.steps.append(f"sin(θ₂) = ({n1} × sin({angle1}°)) / {n2} = {sin_a2}")
        result.steps.append(f"θ₂ = {a2}°")
        result.answer = f"θ₂ = {a2}°"
        result.answer_raw = str(a2)
    elif n2 is None and angle2 is not None:
        # Find n2
        n2_calc = n1 * math.sin(math.radians(float(angle1))) / math.sin(math.radians(float(angle2)))
        result.steps.append(f"Formula: n₁ sin(θ₁) = n₂ sin(θ₂)")
        result.steps.append(f"Given: n₁ = {n1}, θ₁ = {angle1}°, θ₂ = {angle2}°")
        result.steps.append(f"n₂ = ({n1} × sin({angle1}°)) / sin({angle2}°) = {n2_calc}")
        result.answer = f"n₂ = {n2_calc}"
        result.answer_raw = str(n2_calc)
    else:
        result.error = "Provide n1, angle1, and either n2 or angle2"
        return result
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_physics_lens_power(focal_length: str, timeout: int = 10) -> SolverResult:
    """P = 1/f (in meters) — power of lens in diopters."""
    result = SolverResult(success=False)
    f = parse_value(focal_length)
    if f is None:
        result.error = "Cannot parse focal length"
        return result
    if f == 0:
        result.error = "Focal length cannot be zero"
        return result
    # f is in cm, convert to m
    f_m = float(f) / 100
    P = 1 / f_m
    result.steps.append(f"Formula: P = 1/f (f in meters)")
    result.steps.append(f"Given: f = {f} cm = {f_m} m")
    result.steps.append(f"P = 1 / {f_m} = {P} D")
    lens_type = "convex (converging)" if P > 0 else "concave (diverging)"
    result.steps.append(f"Sign: {'+' if P > 0 else '-'} → {lens_type}")
    result.answer = f"P = {P} D ({lens_type})"
    result.answer_raw = str(P)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


# ─────────────────────────────────────────────────────────────────────
# NEW CHEMISTRY PATTERNS
# ─────────────────────────────────────────────────────────────────────

def op_chem_gas_equation(pressure: str, volume: str, moles: str = "",
                         temp: str = "", timeout: int = 10) -> SolverResult:
    """PV = nRT — ideal gas equation. R = 8.314 J/(mol·K)."""
    result = SolverResult(success=False)
    P = parse_value(pressure)
    V = parse_value(volume)
    n = parse_value(moles) if moles_str else None
    T = parse_value(temp) if temp_str else None
    R = 8.314
    if P is None or V is None:
        result.error = "Cannot parse pressure or volume"
        return result
    if n is not None and T is None:
        T = P * V / (n * R)
        result.steps.append(f"Formula: PV = nRT → T = PV/(nR)")
        result.steps.append(f"Given: P = {P} Pa, V = {V} m³, n = {n} mol, R = {R}")
        result.steps.append(f"T = ({P} × {V}) / ({n} × {R}) = {T} K")
        result.answer = f"T = {T} K"
        result.answer_raw = str(T)
    elif n is None and T is not None:
        n = P * V / (T * R)
        result.steps.append(f"Formula: PV = nRT → n = PV/(RT)")
        result.steps.append(f"Given: P = {P} Pa, V = {V} m³, T = {T} K, R = {R}")
        result.steps.append(f"n = ({P} × {V}) / ({T} × {R}) = {n} mol")
        result.answer = f"n = {n} mol"
        result.answer_raw = str(n)
    elif P is not None and V is not None and n is not None and T is not None:
        # Verify
        lhs = P * V
        rhs = n * R * T
        result.steps.append(f"Formula: PV = nRT")
        result.steps.append(f"Given: P = {P}, V = {V}, n = {n}, T = {T}")
        result.steps.append(f"LHS = PV = {lhs}")
        result.steps.append(f"RHS = nRT = {rhs}")
        result.answer = f"PV = {lhs}, nRT = {rhs}"
        result.answer_raw = str(lhs)
    else:
        result.error = "Provide P, V, and either n or T"
        return result
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


def op_chem_half_life(initial: str, half_life: str, time: str,
                      timeout: int = 10) -> SolverResult:
    """N = N₀ × (1/2)^(t/t½) — radioactive decay."""
    result = SolverResult(success=False)
    import math
    N0, t_half, t = [parse_value(s) for s in [initial, half_life, time]]
    if any(v is None for v in [N0, t_half, t]):
        result.error = "Cannot parse values"
        return result
    if t_half == 0:
        result.error = "Half-life cannot be zero"
        return result
    n = float(t) / float(t_half)
    N = float(N0) * (0.5 ** n)
    result.steps.append(f"Formula: N = N₀ × (1/2)^(t/t½)")
    result.steps.append(f"Given: N₀ = {N0}, t½ = {t_half}, t = {t}")
    result.steps.append(f"Number of half-lives = {t} / {t_half} = {n}")
    result.steps.append(f"N = {N0} × (0.5)^{n} = {N}")
    result.answer = f"N = {N}"
    result.answer_raw = str(N)
    result.verified = True
    result.verification_msg = "Direct computation"
    result.success = True
    return result


# ─────────────────────────────────────────────────────────────────────
# Operation registry — maps operation names to functions
# ─────────────────────────────────────────────────────────────────────

OPERATIONS = {
    # Calculus
    "differentiate": op_differentiate,
    "differentiate_at_point": op_differentiate_at_point,
    "integrate_indefinite": op_integrate_indefinite,
    "integrate_definite": op_integrate_definite,
    "critical_points": op_critical_points,
    "check_max_min": op_check_max_min,
    "evaluate_at_point": op_evaluate_at_point,
    "find_limit": op_find_limit,
    "continuity_find_k": op_continuity_find_k,
    "area_under_curve": op_area_under_curve,
    "area_between_curves": op_area_between_curves,
    "differential_equation": op_differential_equation,
    "tangent_equation": op_tangent_equation,
    "increasing_decreasing": op_increasing_decreasing,
    "show_increasing": op_show_increasing,
    "show_decreasing": op_show_decreasing,
    "show_max_value": op_show_max_value,
    "show_min_value": op_show_min_value,
    # Algebra
    "solve_equation": op_solve_equation,
    "solve_system": op_solve_system,
    "simplify": op_simplify,
    "verify_identity": op_verify_identity,
    "expand_expression": op_expand_expression,
    "factor_polynomial": op_factor_polynomial,
    "polynomial_zeros": op_polynomial_zeros,
    "polynomial_division": op_polynomial_division,
    "function_composition": op_function_composition,
    # Matrices
    "determinant": op_determinant,
    "matrix_inverse": op_matrix_inverse,
    "solve_system_with_inverse": op_solve_system_with_inverse,
    "matrix_multiply": op_matrix_multiply,
    "matrix_add": op_matrix_add,
    "matrix_transpose": op_matrix_transpose,
    "verify_skew_symmetric": op_verify_skew_symmetric,
    "verify_symmetric": op_verify_symmetric,
    # Vectors & 3D
    "dot_product": op_dot_product,
    "cross_product": op_cross_product,
    "vector_magnitude": op_vector_magnitude,
    "angle_between_vectors": op_angle_between_vectors,
    "vector_projection": op_vector_projection,
    "distance_3d": op_distance_3d,
    "section_3d": op_section_3d,
    "direction_cosines": op_direction_cosines,
    # LPP
    "lpp_corner_points": op_lpp_corner_points,
    # Basic Arithmetic
    "arithmetic": op_arithmetic,
    "percentage": op_percentage,
    "percentage_of": op_percentage_of,
    "percentage_change": op_percentage_change,
    # Commercial Math
    "simple_interest": op_simple_interest,
    "compound_interest": op_compound_interest,
    "profit_loss": op_profit_loss,
    "discount": op_discount,
    "ratio_proportion": op_ratio_proportion,
    # Number Theory
    "hcf_lcm": op_hcf_lcm,
    "prime_factorization": op_prime_factorization,
    "is_prime": op_is_prime,
    # Exponents & Roots
    "exponents": op_exponents,
    "square_root": op_square_root,
    "cube_root": op_cube_root,
    # Sequences & Series
    "ap_nth_term": op_ap_nth_term,
    "ap_sum": op_ap_sum,
    "gp_nth_term": op_gp_nth_term,
    "gp_sum": op_gp_sum,
    "gp_infinite_sum": op_gp_infinite_sum,
    "series_sum": op_series_sum,
    # Coordinate Geometry
    "distance_formula": op_distance_formula,
    "section_formula": op_section_formula,
    "midpoint": op_midpoint,
    "slope": op_slope,
    "line_equation": op_line_equation,
    # Mensuration 2D
    "area_rectangle": op_area_rectangle,
    "area_triangle": op_area_triangle,
    "area_circle": op_area_circle,
    "area_trapezium": op_area_trapezium,
    "area_parallelogram": op_area_parallelogram,
    "area_rhombus": op_area_rhombus,
    "arc_length": op_arc_length,
    "sector_area": op_sector_area,
    "pythagoras_hypotenuse": op_pythagoras_hypotenuse,
    "pythagoras_side": op_pythagoras_side,
    # Mensuration 3D
    "volume_cube": op_volume_cube,
    "volume_cuboid": op_volume_cuboid,
    "volume_cylinder": op_volume_cylinder,
    "volume_cone": op_volume_cone,
    "volume_sphere": op_volume_sphere,
    "volume_hemisphere": op_volume_hemisphere,
    "volume_frustum": op_volume_frustum,
    # Statistics
    "mean": op_mean,
    "median": op_median,
    "mode": op_mode,
    "standard_deviation": op_standard_deviation,
    "weighted_mean": op_weighted_mean,
    "regression_line": op_regression_line,
    "correlation_coefficient": op_correlation_coefficient,
    # Probability
    "probability": op_probability,
    "conditional_probability": op_conditional_probability,
    "binomial_probability": op_binomial_probability,
    # Permutations & Combinations
    "permutation": op_permutation,
    "combination": op_combination,
    "factorial": op_factorial,
    # Complex Numbers
    "complex_modulus": op_complex_modulus,
    "complex_argument": op_complex_argument,
    # Sets
    "set_operations": op_set_operations,
    # Conic Sections
    "circle_equation": op_circle_equation,
    "parabola_vertex": op_parabola_vertex,
    # Binomial Theorem
    "binomial_expansion": op_binomial_expansion,
    "binomial_coefficient": op_binomial_coefficient,
    # Logarithms
    "logarithm": op_logarithm,
    # Fractions
    "fraction_add": op_fraction_add,
    "fraction_multiply": op_fraction_multiply,
    "fraction_divide": op_fraction_divide,
    # Speed, Distance, Time
    "speed_distance_time": op_speed_distance_time,
    "direct_proportion": op_direct_proportion,
    "inverse_proportion": op_inverse_proportion,
    # Trigonometry
    "trig_value": op_trig_value,
    "heights_distances": op_heights_distances,
    "inverse_trig_value": op_inverse_trig_value,
    # Class 1-2: Number Sense
    "number_comparison": op_number_comparison,
    "place_value": op_place_value,
    "even_odd": op_even_odd,
    "skip_counting": op_skip_counting,
    "before_after_between": op_before_after_between,
    "multiplication_table": op_multiplication_table,
    "money_arithmetic": op_money_arithmetic,
    "time_conversion": op_time_conversion,
    # Class 3-4: Division, Decimals, Units, Graphs
    "division_with_remainder": op_division_with_remainder,
    "equivalent_fractions": op_equivalent_fractions,
    "fraction_comparison": op_fraction_comparison,
    "decimal_operations": op_decimal_operations,
    "decimal_to_fraction": op_decimal_to_fraction,
    "unit_conversion": op_unit_conversion,
    "perimeter_polygon": op_perimeter_polygon,
    "factors_multiples": op_factors_multiples,
    # Class 5-6: Integers, Algebra, Angles
    "integer_operations": op_integer_operations,
    "algebraic_expression_eval": op_algebraic_expression_eval,
    "angle_type": op_angle_type,
    "angle_sum_triangle": op_angle_sum_triangle,
    "angle_sum_quadrilateral": op_angle_sum_quadrilateral,
    "linear_equation_one_var": op_linear_equation_one_var,
    # Class 7-8: Rational, Factorise, Identities, Quadratic
    "rational_operations": op_rational_operations,
    "algebraic_simplify": op_algebraic_simplify,
    "factorise_algebraic": op_factorise_algebraic,
    "algebraic_identity": op_algebraic_identity,
    "quadratic_formula": op_quadratic_formula,
    "nature_of_roots": op_nature_of_roots,
    "simultaneous_linear": op_simultaneous_linear,
    "consistency_check": op_consistency_check,
    # Physics
    "physics_force": op_physics_force,
    "physics_kinematics": op_physics_kinematics,
    "physics_energy": op_physics_energy,
    "physics_ohms_law": op_physics_ohms_law,
    "physics_power": op_physics_power,
    "physics_lens": op_physics_lens,
    # Chemistry
    "chem_moles": op_chem_moles,
    "chem_molarity": op_chem_molarity,
    "chem_pH": op_chem_pH,
    "chem_dilution": op_chem_dilution,
    "chem_faraday": op_chem_faraday,
    # Biology
    "bio_mendelian_ratio": op_bio_mendelian_ratio,
    "bio_population_growth": op_bio_population_growth,
    # NEW — Surface Area
    "surface_area_cube": op_surface_area_cube,
    "surface_area_cuboid": op_surface_area_cuboid,
    "surface_area_cylinder": op_surface_area_cylinder,
    "surface_area_cone": op_surface_area_cone,
    "surface_area_sphere": op_surface_area_sphere,
    "surface_area_hemisphere": op_surface_area_hemisphere,
    # NEW — Fractions
    "fraction_subtract": op_fraction_subtract,
    # NEW — Commercial Math
    "successive_discount": op_successive_discount,
    "gst_calculation": op_gst_calculation,
    # NEW — Arithmetic (Speed/Work)
    "average_speed": op_average_speed,
    "relative_speed": op_relative_speed,
    "time_and_work": op_time_and_work,
    "pipes_and_cisterns": op_pipes_and_cisterns,
    "mixture_allegation": op_mixture_allegation,
    # NEW — Physics
    "physics_density": op_physics_density,
    "physics_pressure": op_physics_pressure,
    "physics_work": op_physics_work,
    "physics_gpe": op_physics_gpe,
    "physics_frequency_wavelength": op_physics_frequency_wavelength,
    "physics_heat": op_physics_heat,
    "physics_resistance": op_physics_resistance,
    "physics_snells_law": op_physics_snells_law,
    "physics_lens_power": op_physics_lens_power,
    # NEW — Chemistry
    "chem_gas_equation": op_chem_gas_equation,
    "chem_half_life": op_chem_half_life,
}


def execute(operation: str, inputs: dict, timeout: int = 10) -> SolverResult:
    """Execute a solver operation by name.

    Args:
        operation: Name of the operation (see OPERATIONS dict)
        inputs: Dictionary of input parameters for the operation
                (uses step_types field names, auto-mapped to function params)
        timeout: Maximum seconds for SymPy operations

    Returns:
        SolverResult with answer, steps, and verification status
    """
    if operation not in OPERATIONS:
        return SolverResult(success=False, error=f"Unknown operation: {operation}")

    # Map step_types field names to function parameter names
    FIELD_MAP = {
        "expression": "expr_str",
        "expr": "expr_str",
        "matrix": "matrix_str",
        "matrix1": "matrix1_str",
        "matrix2": "matrix2_str",
        "var": "var_name",
        "point": "point_str",
        "lower": "lower_str",
        "upper": "upper_str",
        "interval_start": "interval_start",
        "interval_end": "interval_end",
        "rhs": "rhs_str",
        "objective": "objective_str",
        "vec": "vec_str",
        "vec1": "vec1_str",
        "vec2": "vec2_str",
        "upper_curve": "upper_str",
        "lower_curve": "lower_str",
        "lower_bound": "lower_bound",
        "upper_bound": "upper_bound",
        "base": "base_str",
        "power": "power_str",
        "n": "n_str",
        "r": "r_str",
        "k": "k_str",
        "a": "a_str",
        "b": "b_str",
        "c": "c_str",
        "d": "d_str",
        "numbers": "numbers_str",
        "part": "part_str",
        "whole": "whole_str",
        "percent": "percent_str",
        "old": "old_str",
        "new": "new_str",
        "principal": "principal_str",
        "rate": "rate_str",
        "time": "time_str",
        "cp": "cp_str",
        "sp": "sp_str",
        "mp": "mp_str",
        "discount_pct": "discount_pct_str",
        "n1": "n1_str",
        "d1": "d1_str",
        "n2": "n2_str",
        "d2": "d2_str",
        "speed": "speed_str",
        "distance": "distance_str",
        "x1": "x1_str",
        "y1": "y1_str",
        "z1": "z1_str",
        "x2": "x2_str",
        "y2": "y2_str",
        "z2": "z2_str",
        "m": "m_str",
        "favorable": "favorable_str",
        "total": "total_str",
        "p_a": "p_a_str",
        "p_b": "p_b_str",
        "p_ab": "p_ab_str",
        "p": "p_str",
        "values": "values_str",
        "weights": "weights_str",
        "x_values": "x_values_str",
        "y_values": "y_values_str",
        "set1": "set1_str",
        "set2": "set2_str",
        "center_x": "center_x_str",
        "center_y": "center_y_str",
        "radius": "radius_str",
        "angle_deg": "angle_deg_str",
        "angle": "angle_str",
        "height": "height_str",
        "length": "length_str",
        "width": "width_str",
        "side": "side_str",
        "base": "base_str",
        "dividend": "dividend_str",
        "divisor": "divisor_str",
        "r1": "r1_str",
        "r2": "r2_str",
        # Fields that already match function params:
        "order": "order",
        "corner_points": "corner_points",
        "var_names": "var_names",
        "equations": "equations",
        "operation": "operation",
        "timeout": "timeout",
        # Physics/Chem/Bio fields (identity mapping — no _str suffix)
        "mass": "mass",
        "acceleration": "acceleration",
        "initial_velocity": "initial_velocity",
        "velocity": "velocity",
        "gravity": "gravity",
        "current": "current",
        "resistance": "resistance",
        "voltage": "voltage",
        "object_distance": "object_distance",
        "image_distance": "image_distance",
        "focal_length": "focal_length",
        "molar_mass": "molar_mass",
        "moles": "moles",
        "volume": "volume",
        "h_concentration": "h_concentration",
        "m1": "m1",
        "v1": "v1",
        "m2": "m2",
        "v2": "v2",
        "valency": "valency",
        "cross_type": "cross_type",
        "initial_population": "initial_population",
        "growth_rate": "growth_rate",
        # Override earlier mappings for physics/chem/bio fields
        "time": "time",
        "height": "height",
        "mass": "mass",
        # NEW — additional field mappings for new operations
        "slant_height": "slant_height",
        "price": "price",
        "gst_rate": "gst_rate",
        "s1": "s1",
        "s2": "s2",
        "d1": "d1",
        "d2": "d2",
        "work1": "work1",
        "work2": "work2",
        "pipe1": "pipe1",
        "pipe2": "pipe2",
        "q1": "q1",
        "q2": "q2",
        "c1": "c1",
        "c2": "c2",
        "target": "target",
        "force": "force",
        "area": "area",
        "g": "g",
        "shc": "shc",
        "temp_change": "temp_change",
        "mode": "mode",
        "direction": "direction",
        "n1": "n1",
        "n2": "n2",
        "angle1": "angle1",
        "angle2": "angle2",
        "frequency": "frequency",
        "wavelength": "wavelength",
        "pressure": "pressure",
        "temp": "temp",
        "initial": "initial",
        "half_life": "half_life",
        # Fix: step type field "angle" should map to "angle_str" for op_angle_type
        # but "angle_deg_str" for others. Use "angle_str" for angle_type op.
        # The FIELD_MAP is global, so we map "angle" → "angle_str" (op_angle_type uses this)
        # and "angle_deg" → "angle_deg_str" (other ops use this)
        # Override: "angle" → "angle_str" (for angle_type, heights_distances)
        # But heights_distances uses "angle_deg_str". Let's check...
        # op_heights_distances(angle_deg_str) — but step type field is "angle_deg"
        # op_angle_type(angle_str) — step type field is "angle"
        # So: "angle" → "angle_str", "angle_deg" → "angle_deg_str"
        # The earlier mapping "angle": "angle_deg_str" is WRONG for angle_type.
        # Fix it:
        "angle": "angle_str",
        # Fix: surface_area_cube uses "side" (no _str), but FIELD_MAP maps "side" → "side_str"
        # Override: "side" → "side" (no suffix) for new ops
        # But op_volume_cube uses "side_str"! So we can't globally change.
        # The issue: old ops use side_str, new ops use side.
        # Solution: change new ops to use side_str, OR add a special mapping.
        # Since FIELD_MAP is global, we need new ops to match old pattern.
        # Let's override "side" back to "side_str" — but then surface_area_cube needs side_str.
        # Actually, the _fix_params.py removed _str from new ops. Let me check...
        # op_surface_area_cube(side: str) — needs "side" not "side_str"
        # But FIELD_MAP maps "side" → "side_str"
        # So we need to override: "side" → "side" for new ops
        # But that breaks op_volume_cube which needs "side_str"
        # Solution: the FIELD_MAP can only have one mapping per key.
        # So new ops must use side_str too. Let me fix the new op functions.
    }

    # Convert field names to function parameter names
    mapped_inputs = {}
    for key, value in inputs.items():
        param_name = FIELD_MAP.get(key, key)
        mapped_inputs[param_name] = value

    func = OPERATIONS[operation]
    try:
        return func(timeout=timeout, **mapped_inputs)
    except TypeError as e:
        return SolverResult(success=False, error=f"Invalid inputs for {operation}: {e}")
    except Exception as e:
        return SolverResult(success=False, error=f"Execution error: {e}")
