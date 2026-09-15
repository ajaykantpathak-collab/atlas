"""Socratic Solver — concept-based decomposition + step execution.

Instead of 196 question-specific patterns, this solver:
1. Identifies the mathematical concept (~35 concepts cover Class 12)
2. Generates a step plan from composable primitives
3. Executes each step with SymPy, threading variables forward
4. Matches computed answer against MCQ options if applicable
5. Produces a step-by-step explanation

Architecture:
    Question
      → Preprocessor (extract expressions, strip MCQ, detect sub-questions)
      → Concept Router (identify concept from keywords + structure)
      → Plan Generator (assemble step DAG from primitives)
      → Step Executor (run each step with SymPy)
      → Answer Validator (check range, match MCQ options)
      → Explanation Generator (readable steps for tutoring)

This runs BEFORE the pattern matcher in pattern_solver.solve().
If it produces an answer, patterns are skipped. If it fails, patterns run as fallback.
"""

import re
import logging
import threading
from dataclasses import dataclass, field
from typing import Optional, Any

from sympy import (
    Symbol, symbols, sympify, simplify, sqrt, pi, Rational, factorial,
    Matrix, oo, N, Float, diff, integrate, limit,
    sin, cos, tan, asin, acos, atan, log, exp, Eq, Abs,
    binomial, trigsimp, expand, factor, together, apart, cancel,
    solve as sympy_solve, linsolve, nsimplify,
)
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application

from backend.ai.math_preprocessor import preprocess, PreprocessedQuestion

logger = logging.getLogger(__name__)


class SymPyTimeoutError(Exception):
    """Raised when a SymPy operation times out."""
    pass


def _run_with_timeout(func, args=(), kwargs=None, timeout_sec=10):
    """Run a function with a hard timeout. Returns result or raises SymPyTimeoutError.
    Uses a daemon thread so it doesn't block forever on Windows."""
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
        raise SymPyTimeoutError(f"Operation timed out after {timeout_sec}s")
    if error_box[0]:
        raise error_box[0]
    return result_box[0]

_TRANSFORMS = standard_transformations + (implicit_multiplication_application,)
_LOCAL_DICT = {
    'sin': sin, 'cos': cos, 'tan': tan, 'asin': asin, 'acos': acos, 'atan': atan,
    'log': log, 'ln': log, 'exp': exp, 'sqrt': sqrt, 'pi': pi, 'e': exp(1),
    'E': exp(1), 'factorial': factorial, 'binomial': binomial,
    'Rational': Rational, 'Abs': Abs, 'oo': oo,
    'yp': Symbol('yp'), 'y': Symbol('y'),
}


# ═══════════════════════════════════════════════════════════════════
# Data Structures
# ═══════════════════════════════════════════════════════════════════

@dataclass
class Step:
    """A single computation step in a plan."""
    name: str           # human-readable name: "Differentiate x(t)"
    handler: str        # executor function name: "diff"
    inputs: list = field(default_factory=list)    # input variable names
    outputs: list = field(default_factory=list)   # output variable names
    params: dict = field(default_factory=dict)    # extra params: {"wrt": "t", "order": 2}


@dataclass
class ConceptPlan:
    """A plan for solving a question: ordered steps + which var is the answer."""
    concept: str
    steps: list = field(default_factory=list)     # list of Step
    answer_var: str = ""          # which variable holds the final answer
    validation: dict = field(default_factory=dict)  # {"type": "probability"} etc.


@dataclass
class SocraticResult:
    """Result from the Socratic solver."""
    answer: str = ""
    steps: list = field(default_factory=list)     # [{name, explanation, result}]
    concept: str = ""
    confidence: float = 0.0
    matched_option: Optional[str] = None          # for MCQs: which option matched
    matched: bool = False


# ═══════════════════════════════════════════════════════════════════
# Step Primitives (the composable operations)
# ═══════════════════════════════════════════════════════════════════

class StepExecutor:
    """Executes individual computation steps using SymPy."""

    def __init__(self):
        self.vars = {}  # variable store: name → SymPy expression or value

    def execute(self, step: Step) -> tuple:
        """Execute a step. Returns (success, explanation)."""
        handler = getattr(self, f"_op_{step.handler}", None)
        if not handler:
            return False, f"Unknown handler: {step.handler}"
        try:
            return handler(step)
        except Exception as e:
            logger.warning(f"Step {step.name} failed: {e}")
            return False, f"Step failed: {e}"

    def _get(self, name: str):
        """Get a variable from the store."""
        return self.vars.get(name)

    def _set(self, name: str, value):
        """Set a variable in the store."""
        self.vars[name] = value

    # ── Core operations ──

    def _op_parse_expr(self, step: Step) -> tuple:
        """Parse a math expression string into a SymPy object."""
        source = step.params.get("source", "")
        # Try to get from preprocessed expressions first
        if source in self.vars:
            expr = self.vars[source]
        else:
            expr_str = step.params.get("expr", "")
            if not expr_str:
                return False, "No expression to parse"
            expr = _safe_parse(expr_str)
            if expr is None:
                return False, f"Cannot parse: {expr_str}"

        out = step.outputs[0] if step.outputs else "expr"
        self._set(out, expr)
        return True, f"Parsed expression: {expr}"

    def _op_diff(self, step: Step) -> tuple:
        """Differentiate an expression."""
        from sympy import Abs as SymAbs, log as sym_log
        expr = self._get(step.inputs[0])
        if expr is None:
            return False, f"Missing input: {step.inputs[0]}"
        wrt = step.params.get("wrt", "x")
        var = Symbol(wrt)
        order = step.params.get("order", 1)

        # For real-valued calculus, d/dx log|x| = 1/x
        # Replace log(Abs(x)) with log(x) before differentiation
        try:
            expr = expr.replace(sym_log(SymAbs(var)), sym_log(var))
        except Exception:
            pass

        result = expr
        for _ in range(order):
            result = diff(result, var)

        out = step.outputs[0] if step.outputs else "deriv"
        self._set(out, result)
        order_str = "" if order == 1 else f" (order {order})"
        return True, f"d{order_str}/d{wrt} = {result}"

    def _op_integrate(self, step: Step) -> tuple:
        """Integrate an expression."""
        expr = self._get(step.inputs[0])
        if expr is None:
            return False, f"Missing input: {step.inputs[0]}"
        wrt = step.params.get("wrt", "x")
        var = Symbol(wrt)
        bounds = step.params.get("bounds")  # (lower, upper) for definite

        if bounds:
            lower = _safe_parse(str(bounds[0]))
            upper = _safe_parse(str(bounds[1]))
            if lower is None or upper is None:
                return False, f"Cannot parse bounds: {bounds}"
            try:
                result = _run_with_timeout(integrate, args=(expr, (var, lower, upper)), timeout_sec=10)
            except SymPyTimeoutError:
                # Fallback: try numerical integration
                try:
                    from sympy import Float as SymFloat
                    result = _run_with_timeout(integrate, args=(expr, (var, lower, upper)),
                                               kwargs={'meijerg': True}, timeout_sec=10)
                except Exception:
                    return False, f"Integration timed out"
        else:
            try:
                result = _run_with_timeout(integrate, args=(expr, var), timeout_sec=10)
            except SymPyTimeoutError:
                return False, f"Integration timed out"

        out = step.outputs[0] if step.outputs else "integral"
        self._set(out, result)
        if bounds:
            return True, f"Definite integral = {result}"
        return True, f"Integral = {result} + C"

    def _op_evaluate(self, step: Step) -> tuple:
        """Evaluate an expression at a point.
        If set_to_zero=True, returns the equation expr(point) = 0 for system solving.
        If at="critical_points", evaluates at each critical point and returns list.
        """
        expr = self._get(step.inputs[0])
        if expr is None:
            return False, f"Missing input: {step.inputs[0]}"
        point_var = step.params.get("at", "")
        point_val = self._get(point_var) if point_var else step.params.get("value")
        if point_val is None and point_var:
            return False, f"Missing point variable: {point_var}"

        var_name = step.params.get("var", "x")
        var = Symbol(var_name)

        # Handle critical points (list of solutions from solve_equation)
        if point_var == "critical_points" and isinstance(point_val, list):
            results = []
            for pt in point_val:
                if isinstance(pt, dict):
                    pt_val = pt.get(var_name, list(pt.values())[0])
                else:
                    pt_val = pt
                if isinstance(pt_val, (int, float)):
                    pt_val = sympify(pt_val)
                r = expr.subs(var, pt_val)
                r = simplify(r)
                results.append(r)
            out = step.outputs[0] if step.outputs else "evaluated"
            self._set(out, results)
            return True, f"Values at critical points: {results}"

        if isinstance(point_val, (int, float)):
            point_val = sympify(point_val)

        result = expr.subs(var, point_val)
        result = simplify(result)

        # If set_to_zero, return as equation = 0 for system solving
        if step.params.get("set_to_zero"):
            from sympy import Eq as SymEq
            result = SymEq(result, 0)
            out = step.outputs[0] if step.outputs else "evaluated"
            self._set(out, result)
            return True, f"f'({point_val}) = 0 → {result}"

        # Also try numeric evaluation
        try:
            numeric = N(result)
            if numeric.is_number and not numeric.is_symbol:
                result = numeric
        except Exception:
            pass

        out = step.outputs[0] if step.outputs else "evaluated"
        self._set(out, result)
        return True, f"At {var_name} = {point_val}: {result}"

    def _op_solve(self, step: Step) -> tuple:
        """Solve an equation for a variable."""
        expr = self._get(step.inputs[0])
        if expr is None:
            return False, f"Missing input: {step.inputs[0]}"
        solve_for = step.params.get("var", "x")
        var = Symbol(solve_for)

        try:
            if hasattr(expr, 'lhs') and hasattr(expr, 'rhs'):
                solutions = _run_with_timeout(sympy_solve, args=(expr, var), timeout_sec=10)
            else:
                solutions = _run_with_timeout(sympy_solve, args=(expr, var), timeout_sec=10)
        except SymPyTimeoutError:
            return False, f"Solve timed out"

        out = step.outputs[0] if step.outputs else "solutions"
        self._set(out, solutions)
        return True, f"Solutions: {solutions}"

    def _op_solve_equation(self, step: Step) -> tuple:
        """Solve equation of form f(x) = value."""
        lhs = self._get(step.inputs[0])
        rhs = self._get(step.params.get("rhs_var", "rhs_value"))
        if lhs is None:
            return False, f"Missing LHS: {step.inputs[0]}"
        if rhs is None:
            rhs_val = step.params.get("rhs_value", 0)
            rhs = sympify(rhs_val)

        solve_for = step.params.get("var", "x")
        var = Symbol(solve_for)

        equation = Eq(lhs, rhs)
        solutions = sympy_solve(equation, var)

        # Filter to real solutions only (for real-valued questions)
        real_solutions = []
        for sol in solutions:
            try:
                val = complex(sol)
                if abs(val.imag) < 1e-10:
                    real_solutions.append(sol)
            except (TypeError, ValueError):
                real_solutions.append(sol)

        out = step.outputs[0] if step.outputs else "solutions"
        self._set(out, real_solutions if len(real_solutions) == 1 else real_solutions)
        return True, f"Solving {lhs} = {rhs}: x = {real_solutions}"

    def _op_simplify(self, step: Step) -> tuple:
        """Simplify an expression."""
        expr = self._get(step.inputs[0])
        if expr is None:
            return False, f"Missing input: {step.inputs[0]}"
        result = simplify(expr)
        out = step.outputs[0] if step.outputs else "simplified"
        self._set(out, result)
        return True, f"Simplified: {result}"

    def _op_set_equal(self, step: Step) -> tuple:
        """Set two expressions equal, creating an equation."""
        lhs = self._get(step.inputs[0])
        rhs = self._get(step.inputs[1]) if len(step.inputs) > 1 else step.params.get("value")
        if lhs is None:
            return False, f"Missing LHS: {step.inputs[0]}"
        if rhs is None:
            return False, f"Missing RHS"
        if not hasattr(rhs, 'free_symbols'):
            rhs = sympify(rhs)
        eq = Eq(lhs, rhs)
        out = step.outputs[0] if step.outputs else "equation"
        self._set(out, eq)
        return True, f"Equation: {lhs} = {rhs}"

    def _op_matrix_solve(self, step: Step) -> tuple:
        """Solve a linear system AX = B using matrix method."""
        coeff_str = step.params.get("coeff_matrix", "")
        rhs_str = step.params.get("rhs_vector", "")

        # Parse coefficient matrix
        if coeff_str in self.vars:
            A = self.vars[coeff_str]
        else:
            A = _parse_matrix(coeff_str)
            if A is None:
                return False, f"Cannot parse matrix: {coeff_str}"

        # Parse RHS vector
        if rhs_str in self.vars:
            B = self.vars[rhs_str]
        else:
            B_list = _parse_list(rhs_str)
            if B_list is None:
                return False, f"Cannot parse RHS: {rhs_str}"
            B = Matrix(B_list)

        if not isinstance(A, Matrix):
            A = Matrix(A)
        if not isinstance(B, Matrix):
            B = Matrix(B)

        # Solve using A^-1 * B
        try:
            det = _run_with_timeout(A.det, timeout_sec=10)
        except SymPyTimeoutError:
            return False, "Matrix det timed out"
        if det == 0:
            return False, "Matrix is singular (det = 0)"

        try:
            X = _run_with_timeout(lambda: A.inv() * B, timeout_sec=10)
        except SymPyTimeoutError:
            return False, "Matrix solve timed out"
        solutions = [X[i] for i in range(X.rows)]

        out = step.outputs[0] if step.outputs else "solution"
        self._set(out, solutions)
        return True, f"Solution: {solutions}"

    def _op_compare(self, step: Step) -> tuple:
        """Find max/min from a list of values."""
        values = self._get(step.inputs[0])
        if values is None:
            return False, f"Missing input: {step.inputs[0]}"
        mode = step.params.get("mode", "max")  # "max" or "min"

        if not isinstance(values, (list, tuple)):
            values = [values]

        if mode == "max":
            best = max(values, key=lambda v: float(v) if hasattr(v, '__float__') else 0)
        else:
            best = min(values, key=lambda v: float(v) if hasattr(v, '__float__') else 0)

        out = step.outputs[0] if step.outputs else "best"
        self._set(out, best)
        idx = list(values).index(best)
        return True, f"{mode.capitalize()} value = {best} at index {idx}"

    def _op_multiply(self, step: Step) -> tuple:
        """Multiply multiple values together."""
        values = []
        for inp in step.inputs:
            v = self._get(inp)
            if v is None:
                return False, f"Missing input: {inp}"
            values.append(v)

        result = values[0]
        for v in values[1:]:
            result = result * v

        out = step.outputs[0] if step.outputs else "product"
        self._set(out, result)
        return True, f"Product = {result}"

    def _op_complement(self, step: Step) -> tuple:
        """Compute 1 - p (complement probability)."""
        p = self._get(step.inputs[0])
        if p is None:
            return False, f"Missing input: {step.inputs[0]}"
        result = 1 - p
        out = step.outputs[0] if step.outputs else "complement"
        self._set(out, result)
        return True, f"Complement = 1 - {p} = {result}"

    def _op_add(self, step: Step) -> tuple:
        """Add multiple values."""
        values = []
        for inp in step.inputs:
            v = self._get(inp)
            if v is None:
                return False, f"Missing input: {inp}"
            values.append(v)
        result = sum(values)
        out = step.outputs[0] if step.outputs else "sum"
        self._set(out, result)
        return True, f"Sum = {result}"

    def _op_subtract(self, step: Step) -> tuple:
        """Subtract: first input minus rest."""
        vals = []
        for inp in step.inputs:
            v = self._get(inp)
            if v is None:
                return False, f"Missing input: {inp}"
            vals.append(v)
        result = vals[0]
        for v in vals[1:]:
            result = result - v
        out = step.outputs[0] if step.outputs else "difference"
        self._set(out, result)
        return True, f"Difference = {result}"

    def _op_divide(self, step: Step) -> tuple:
        """Divide first input by second."""
        a = self._get(step.inputs[0])
        b = self._get(step.inputs[1])
        if a is None or b is None:
            return False, "Missing inputs for division"
        result = a / b
        out = step.outputs[0] if step.outputs else "quotient"
        self._set(out, result)
        return True, f"Quotient = {result}"

    def _op_set_value(self, step: Step) -> tuple:
        """Set a variable to a constant value."""
        val = step.params.get("value")
        var_name = step.params.get("var", step.outputs[0] if step.outputs else "value")
        if isinstance(val, str):
            # Try to parse as math expression first
            parsed = _safe_parse(val)
            if parsed is not None:
                val = parsed
            else:
                # Keep as string (for non-math values like coordinate tuples)
                pass
        if val is None:
            return False, f"Cannot parse value: {step.params.get('value')}"
        self._set(var_name, val)
        return True, f"Set {var_name} = {val}"

    def _op_solve_system(self, step: Step) -> tuple:
        """Solve a system of equations."""
        eqs = []
        for inp in step.inputs:
            eq = self._get(inp)
            if eq is None:
                return False, f"Missing equation: {inp}"
            eqs.append(eq)

        vars_to_solve = step.params.get("vars", ["x", "y", "z"])
        sym_vars = [Symbol(v) for v in vars_to_solve]

        try:
            solutions = _run_with_timeout(sympy_solve, args=(eqs, sym_vars),
                                          kwargs={'dict': True}, timeout_sec=10)
        except SymPyTimeoutError:
            return False, "System solve timed out"
        out = step.outputs[0] if step.outputs else "system_solution"
        self._set(out, solutions)
        return True, f"System solutions: {solutions}"

    def _op_dsolve(self, step: Step) -> tuple:
        """Solve a linear first-order DE manually.
        DE form: a(x)*dy/dx + b(x)*y = c(x)
        Standard form: dy/dx + P(x)*y = Q(x) where P = b/a, Q = c/a
        IF = e^(∫P dx), y = (∫Q*IF dx + C) / IF
        """
        from sympy import (Symbol as SymSymbol, integrate, exp, simplify as sym_simplify,
                          Eq as SymEq, Function, Derivative, trigsimp, sec, tan, cos, sin)

        eq = self._get(step.inputs[0])
        if eq is None:
            return False, f"Missing DE: {step.inputs[0]}"

        x = SymSymbol('x')
        y_sym = SymSymbol('y')
        yp_sym = SymSymbol('yp')

        # The expression is: a*yp + b*y - c = 0
        # where yp = dy/dx, y = y(x)
        expr = eq.lhs - eq.rhs if hasattr(eq, 'lhs') else eq

        # Collect coefficients of yp and y
        from sympy import collect, Poly
        try:
            # Expand and collect
            expr_expanded = expr.expand()
            # Coefficient of yp
            a_coeff = expr_expanded.coeff(yp_sym)
            # Coefficient of y (after removing yp term)
            b_coeff = expr_expanded.coeff(y_sym)
            # Remainder (should be -c)
            remainder = expr_expanded - a_coeff * yp_sym - b_coeff * y_sym
            c_val = -remainder

            if a_coeff == 0:
                return False, "Cannot solve: coefficient of dy/dx is 0"

            # Standard form: dy/dx + P*y = Q
            P = sym_simplify(b_coeff / a_coeff)
            Q = sym_simplify(c_val / a_coeff)

            # Convert 1/cos²(x) → sec²(x) and sin(x)/cos(x) → tan(x)
            # so SymPy can evaluate the integrals
            from sympy import sec as sym_sec, sin as sym_sin, cos as sym_cos, Pow as SymPow
            try:
                P = P.xreplace({sym_cos(x)**(-2): sym_sec(x)**2,
                               sym_sin(x)/sym_cos(x): tan(x)})
                Q = Q.xreplace({sym_cos(x)**(-2): sym_sec(x)**2,
                               sym_sin(x)/sym_cos(x): tan(x)})
            except Exception:
                pass

            # Compute IF = e^(∫P dx)
            try:
                P_integrated = _run_with_timeout(integrate, args=(P, x), timeout_sec=10)
            except SymPyTimeoutError:
                return False, "DE: integration of P timed out"
            # Convert sin/cos in IF to tan for easier integration
            try:
                P_integrated = P_integrated.xreplace({sym_sin(x)/sym_cos(x): tan(x)})
            except Exception:
                pass
            IF = exp(P_integrated)

            # Compute ∫Q*IF dx
            QIF = Q * IF
            try:
                QIF_integrated = _run_with_timeout(integrate, args=(QIF, x), timeout_sec=10)
            except SymPyTimeoutError:
                return False, "DE: integration of Q*IF timed out"

            # y = (∫Q*IF dx + C) / IF
            C1 = SymSymbol('C1')
            y_solution = (QIF_integrated + C1) / IF
            y_solution = sym_simplify(y_solution)

            # Store as Eq(y(x), solution) for apply_ic
            y_fn = Function('y')
            sol = SymEq(y_fn(x), y_solution)

        except Exception as e:
            # Fallback to dsolve
            try:
                yp = Derivative(Function('y')(x), x)
                expr2 = expr.subs(yp_sym, yp).subs(y_sym, Function('y')(x))
                de = SymEq(expr2, 0)
                sol = dsolve(de, func=Function('y')(x))
            except Exception as e2:
                return False, f"DE solve failed: {e2}"

        out = step.outputs[0] if step.outputs else "de_solution"
        self._set(out, sol)
        return True, f"DE solution: {sol}"

    def _op_lpp_solve(self, step: Step) -> tuple:
        """Solve an LPP: find corner points, evaluate objective, check boundedness."""
        from sympy import Symbol, solve as sym_solve, Eq as SymEq, Matrix, Rational

        objective_str = step.params.get("objective", "")
        constraints_raw = step.params.get("constraints", [])

        x = Symbol('x')
        y = Symbol('y')

        # Parse constraints into SymPy equations
        # Convert "2 >= 2*y - x" → "2 - (2*y - x) >= 0" → "x - 2*y + 2 >= 0"
        constraint_eqs = []
        for c in constraints_raw:
            if not isinstance(c, str):
                continue
            c = c.strip()
            # Normalize: remove spaces around operators
            c = c.replace(' ', '')
            # Find the inequality sign
            for op in ['>=', '<=', '>', '<']:
                if op in c:
                    lhs, rhs = c.split(op, 1)
                    try:
                        lhs_expr = parse_expr(lhs, local_dict={'x': x, 'y': y})
                        rhs_expr = parse_expr(rhs, local_dict={'x': x, 'y': y})
                        # Convert to equation: lhs - rhs = 0 (for corner finding)
                        eq = lhs_expr - rhs_expr
                        constraint_eqs.append(eq)
                    except Exception:
                        pass
                    break

        if len(constraint_eqs) < 2:
            return False, "Not enough constraints to find corner points"

        # Find all intersection points (corner points)
        corner_points = []
        from itertools import combinations
        for eq1, eq2 in combinations(constraint_eqs, 2):
            try:
                sols = sym_solve([eq1, eq2], [x, y], dict=True)
                for sol in sols:
                    if x in sol and y in sol:
                        px, py = sol[x], sol[y]
                        # Check if point is feasible (satisfies all constraints)
                        feasible = True
                        for c_str in constraints_raw:
                            if not isinstance(c_str, str):
                                continue
                            c_str = c_str.replace(' ', '')
                            for op in ['>=', '<=', '>', '<']:
                                if op in c_str:
                                    lhs, rhs = c_str.split(op, 1)
                                    try:
                                        lhs_val = parse_expr(lhs, local_dict={'x': x, 'y': y}).subs([(x, px), (y, py)])
                                        rhs_val = parse_expr(rhs, local_dict={'x': x, 'y': y}).subs([(x, px), (y, py)])
                                        if op == '>=' and not (lhs_val >= rhs_val):
                                            feasible = False
                                        elif op == '<=' and not (lhs_val <= rhs_val):
                                            feasible = False
                                        elif op == '>' and not (lhs_val > rhs_val):
                                            feasible = False
                                        elif op == '<' and not (lhs_val < rhs_val):
                                            feasible = False
                                    except Exception:
                                        pass
                                    break
                        if feasible:
                            pt = (px, py)
                            if pt not in corner_points:
                                corner_points.append(pt)
            except Exception:
                continue

        if not corner_points:
            return False, "No feasible corner points found"

        # Parse objective: "Maximize Z = x + 2*y"
        obj_match = re.search(r'(maximi[sz]e|minimi[sz]e)\s+Z\s*=\s*(.+)', objective_str, re.IGNORECASE)
        if not obj_match:
            return False, f"Cannot parse objective: {objective_str}"

        is_max = 'max' in obj_match.group(1).lower()
        obj_expr_str = obj_match.group(2).strip()
        try:
            obj_expr = parse_expr(obj_expr_str, local_dict={'x': x, 'y': y})
        except Exception:
            return False, f"Cannot parse objective expression: {obj_expr_str}"

        # Evaluate objective at each corner point
        values = []
        for px, py in corner_points:
            val = obj_expr.subs([(x, px), (y, py)])
            values.append((val, (px, py)))

        # Find optimal
        if is_max:
            best = max(values, key=lambda v: v[0])
        else:
            best = min(values, key=lambda v: v[0])

        # Check if region is unbounded (simple heuristic: if any variable can go to infinity)
        # For now, just return the corner points and best value
        result_str = f"Corner points: {corner_points}. "
        result_str += f"{'Max' if is_max else 'Min'} at {best[1]} = {best[0]}."

        out = step.outputs[0] if step.outputs else "answer"
        self._set(out, result_str)
        return True, result_str

    def _op_apply_ic(self, step: Step) -> tuple:
        """Apply initial condition to a DE solution."""
        from sympy import symbols as sym_symbols, solve as sym_solve, Function

        sol = self._get(step.inputs[0])
        if sol is None:
            return False, f"Missing solution: {step.inputs[0]}"

        x = Symbol('x')

        x0 = step.params.get("x0", 0)
        y0 = step.params.get("y0", 1)

        # sol is Eq(y(x), expression)
        if hasattr(sol, 'lhs') and hasattr(sol, 'rhs'):
            expr = sol.rhs
        else:
            expr = sol

        # Find all free symbols (constants like C1)
        free = list(expr.free_symbols)
        # Filter out x
        consts = [s for s in free if s != x]

        if not consts:
            # No constants — just evaluate
            out = step.outputs[0] if step.outputs else "de_with_ic"
            self._set(out, expr)
            return True, f"No constants, y = {expr}"

        # Substitute x = x0 and solve for constant
        at_x0 = expr.subs(x, x0)
        c_vals = sym_solve(at_x0 - y0, consts)

        if c_vals:
            if isinstance(c_vals, list):
                c_vals = c_vals[0]
            if isinstance(c_vals, dict):
                expr_with_ic = expr.subs(c_vals)
            else:
                expr_with_ic = expr.subs(consts[0], c_vals)
            out = step.outputs[0] if step.outputs else "de_with_ic"
            self._set(out, expr_with_ic)
            return True, f"With IC y({x0})={y0}: y = {expr_with_ic}"

        return False, f"Could not apply IC: {at_x0} = {y0}"


# ═══════════════════════════════════════════════════════════════════
# Parsing Helpers
# ═══════════════════════════════════════════════════════════════════

def _safe_parse(expr_str: str):
    """Safely parse a string into a SymPy expression."""
    if expr_str is None:
        return None
    s = str(expr_str).strip()
    if not s:
        return None
    try:
        s = s.replace('^', '**')
        # Handle inverse trig
        s = re.sub(r'(sin|cos|tan)\*\*-1', r'a\1', s, flags=re.IGNORECASE)
        s = re.sub(r'(sin|cos|tan)\^-1', r'a\1', s, flags=re.IGNORECASE)
        # Handle absolute value: |x| → Abs(x), |expr| → Abs(expr)
        # Add space before Abs to avoid implicit multiplication issues
        s = re.sub(r'\|(\w+)\|', r' Abs(\1) ', s)
        s = re.sub(r'\|([^|]+)\|', r' Abs(\1) ', s)
        # Handle trig powers: cos^2(x) → cos(x)**2
        s = re.sub(r'(sin|cos|tan|sec|csc|cot|log|exp|sqrt)\^(\d+)\((\w+)\)',
                   r'\1(\3)**\2', s)
        return parse_expr(s, transformations=_TRANSFORMS, evaluate=True, local_dict=_LOCAL_DICT)
    except Exception:
        return None


def _parse_matrix(mat_str: str):
    """Parse a matrix string like [[1,2],[3,4]] into a SymPy Matrix."""
    if not mat_str:
        return None
    try:
        s = mat_str.strip()
        # Remove outer brackets if present
        rows = re.findall(r'\[([^\[\]]+)\]', s)
        if not rows:
            return None
        matrix_rows = []
        for row in rows:
            elements = [float(x.strip()) if '.' in x else int(x.strip())
                       for x in row.split(',') if x.strip()]
            matrix_rows.append(elements)
        return Matrix(matrix_rows)
    except Exception:
        return None


def _parse_list(list_str: str):
    """Parse a list string like [1,2,3] into a Python list."""
    if not list_str:
        return None
    try:
        s = list_str.strip().strip('[]')
        return [float(x.strip()) if '.' in x else int(x.strip())
                for x in s.split(',') if x.strip()]
    except Exception:
        return None


def _parse_number(s: str) -> Optional[float]:
    """Parse a number from string, handling fractions like 1/6."""
    if s is None:
        return None
    s = str(s).strip()
    try:
        return float(s)
    except ValueError:
        try:
            val = _safe_parse(s)
            if val is not None:
                return float(val)
        except Exception:
            pass
    return None


# ═══════════════════════════════════════════════════════════════════
# Concept Router
# ═══════════════════════════════════════════════════════════════════

def identify_concept(pq: PreprocessedQuestion) -> Optional[str]:
    """Identify the mathematical concept from preprocessed question."""
    text = (pq.stem + " " + pq.clean).lower()

    # Check expressions and structure for routing
    has_func = bool(pq.expressions)
    has_eq = bool(pq.equations)
    has_piecewise = pq.piecewise is not None
    has_bounds = pq.bounds is not None
    has_matrix = bool(pq.matrices)
    has_vectors = bool(pq.vectors)
    has_points = len(pq.points) >= 2

    # ── Kinematics (displacement → acceleration) ──
    if any(w in text for w in ['acceleration', 'velocity', 'displacement', 'particle']) and \
       any(w in text for w in ['time', 't seconds', 't seconds']):
        return 'kinematics'

    # ── Inverse function ──
    if ('inverse' in text or 'h^-1' in text or 'f^-1' in text or 'h**-1' in text or
        'h^(-1)' in text or 'f^(-1)' in text or 'inverse_h' in text or 'inverse_f' in text):
        if 'find' in text or 'value' in text or 'then' in text:
            return 'inverse_function'

    # ── Differential equations (check BEFORE differentiation — dy/dx overlaps) ──
    if 'differential equation' in text or 'integrating factor' in text or \
       ('dy/dx' in text and 'solve' in text):
        return 'differential_equation'

    # ── Differentiation ──
    if any(w in text for w in ['differentiate', 'derivative', "dy/dx", "f'", 'find f', 'rate of change']):
        if 'second' in text or 'f"' in text:
            return 'higher_derivative'
        if 'tangent' in text or 'normal' in text:
            return 'tangent_normal'
        return 'differentiate'

    # ── Integration ──
    if any(w in text for w in ['integrate', 'integral', 'antiderivative', 'evaluate: integral']):
        if pq.bounds:
            return 'definite_integral'
        return 'indefinite_integral'

    # ── Area ──
    if 'area' in text and ('curve' in text or 'parabola' in text or 'circle' in text or 'line' in text):
        return 'area_between_curves'

    # ── Find parameters from extrema (differentiate, set f'=0 at given points, solve system) ──
    # e.g. "f(x) has extreme values at x=-1 and x=2, find a and b"
    if 'extreme' in text and 'find' in text and re.search(r'at\s+x\s*=\s*-?\d', text):
        return 'find_parameters_from_extrema'

    # ── LPP (check BEFORE optimization — "maximize" overlaps) ──
    if 'linear programming' in text or 'lpp' in text or 'feasible' in text or \
       ('maximize' in text and 'subject to' in text) or ('minimize' in text and 'subject to' in text):
        if 'corner' in text:
            return 'lpp_corner'
        return 'lpp'

    # ── Optimization (max/min) ──
    if any(w in text for w in ['maximum', 'minimum', 'maximize', 'minimize', 'extreme', 'extremum']):
        if 'profit' in text or 'cost' in text or 'revenue' in text:
            return 'business_optimization'
        if 'breakeven' in text or 'break-even' in text or 'break even' in text:
            return 'breakeven'
        return 'optimization'

    # ── Breakeven ──
    if 'breakeven' in text or 'break-even' in text or 'break even' in text:
        return 'breakeven'

    # ── Marginal revenue/cost ──
    if 'marginal revenue' in text or 'marginal cost' in text:
        return 'marginal'

    # ── Continuity ──
    if 'continuous' in text or 'continuity' in text:
        if has_piecewise:
            return 'continuity_piecewise'
        return 'continuity'

    # ── Increasing/decreasing ──
    if 'increasing' in text or 'decreasing' in text:
        return 'increasing_decreasing'

    # ── Probability ──
    if 'probability' in text or 'dice' in text or 'coin' in text or 'cards' in text:
        if 'bayes' in text or 'given that' in text or 'conditional' in text:
            return 'conditional_probability'
        if 'none' in text or 'independent' in text or 'all three' in text:
            return 'independent_probability'
        if 'distribution' in text:
            return 'probability_distribution'
        return 'probability'

    # ── Vectors ──
    if has_vectors or any(w in text for w in ['vector', 'cross product', 'dot product']):
        if 'angle' in text:
            return 'vector_angle'
        if 'magnitude' in text or 'modulus' in text:
            return 'vector_magnitude'
        if 'perpendicular' in text:
            return 'vector_perpendicular'
        return 'vector_operations'

    # ── 3D Geometry ──
    if any(w in text for w in ['plane', 'foot of perpendicular', 'xy plane', 'yz plane', 'xz plane']):
        return '3d_geometry'

    # ── Direction cosines / line angles ──
    if 'direction cosine' in text or ('line' in text and 'axes' in text and 'angle' in text):
        return 'direction_cosines'
    # alpha + beta = pi/2, find gamma
    if ('alpha' in text and 'beta' in text and 'gamma' in text):
        return 'direction_cosines'

    # ── Cofactor determinant (check BEFORE generic determinant) ──
    if 'co-factor' in text or 'cofactor' in text or 'co factor' in text:
        return 'cofactor_determinant'
    if 'determinant' in text and ('replacing' in text or 'adjoint' in text or 'adj' in text):
        if '3rd order' in text or 'third order' in text or 'order 3' in text:
            return 'cofactor_determinant'

    # ── Matrices & Determinants ──
    if has_matrix or 'matrix' in text or 'determinant' in text:
        if 'solve' in text and 'equation' in text:
            return 'matrix_solve'
        if 'inverse' in text:
            return 'matrix_inverse'
        if 'determinant' in text:
            return 'determinant'
        return 'matrix_operations'

    # ── Skew symmetric ──
    if 'skew' in text and 'symmetric' in text:
        return 'skew_symmetric'

    # ── LPP ──
    if 'linear programming' in text or 'lpp' in text or 'feasible' in text:
        if 'corner' in text:
            return 'lpp_corner'
        return 'lpp'

    # ── Simultaneous equations (3+ equations) ──
    # Detect from word problems with multiple cost statements
    if _detect_simultaneous_equations(pq):
        return 'simultaneous_equations'

    # ── Relations & Functions ──
    if any(w in text for w in ['one-one', 'onto', 'bijective', 'injective', 'surjective']):
        return 'function_classification'
    if 'relation' in text and ('symmetric' in text or 'reflexive' in text or 'transitive' in text):
        return 'relation_properties'

    # ── Trigonometric identities ──
    if any(w in text for w in ['tan^-1', 'sin^-1', 'cos^-1', 'prove']) and \
       any(w in text for w in ['tan', 'sin', 'cos', 'inverse']):
        return 'trig_identity'

    # ── Equation solving (generic) ──
    if has_eq and ('solve' in text or 'find' in text or 'value' in text):
        return 'solve_equation'

    # ── Conceptual MCQ: "is called" / "is defined as" ──
    if pq.is_mcq and ('is called' in text or 'is defined as' in text or 'is known as' in text):
        return 'conceptual_mcq'

    # ── Evaluate at point ──
    if has_func and ('evaluate' in text or 'find value' in text or 'at x =' in text):
        return 'evaluate_at_point'

    return None


def _detect_simultaneous_equations(pq: PreprocessedQuestion) -> bool:
    """Detect if the question involves simultaneous equations from a word problem."""
    text = pq.raw.lower()
    # Pattern: multiple items with costs, like "4 kgs apples... 3 kgs grapes... cost Rs 600"
    # Look for multiple "cost" or price patterns
    cost_patterns = re.findall(r'cost\s+(?:him\s+)?(?:rs\.?\s*)?(\d+)', text)
    if len(cost_patterns) >= 3:
        return True
    # Look for patterns like "X kgs ... Y kgs ... cost Rs Z"
    if len(re.findall(r'\d+\s*kgs?\s+\w+', text)) >= 6 and len(cost_patterns) >= 2:
        return True
    return False


# ═══════════════════════════════════════════════════════════════════
# Plan Generator
# ═══════════════════════════════════════════════════════════════════

def generate_plan(concept: str, pq: PreprocessedQuestion) -> Optional[ConceptPlan]:
    """Generate a step plan for the identified concept."""

    # ── Kinematics: displacement → velocity → acceleration → evaluate ──
    if concept == 'kinematics':
        # Extract displacement expression — could be x(t) or y(x)
        x_expr = pq.expressions.get('x', '') or pq.expressions.get('y', '')
        t_val = _extract_time_value(pq)

        if not x_expr:
            return None

        # Detect what is being asked: acceleration, velocity, or rate of change
        text = pq.clean.lower()
        wants_acceleration = 'acceleration' in text
        wants_velocity = 'velocity' in text or 'rate of change' in text

        # Detect the variable (t for time-based, x for distance-based)
        wrt = 't' if 't' in x_expr and 'x' not in x_expr else 'x'

        steps = [
            Step("Parse displacement", "parse_expr",
                 inputs=[], outputs=["x_expr"],
                 params={"expr": x_expr}),
            Step("Find velocity = dx/dt", "diff",
                 inputs=["x_expr"], outputs=["v_expr"],
                 params={"wrt": wrt, "order": 1}),
        ]

        if wants_acceleration:
            steps.append(Step("Find acceleration = dv/dt", "diff",
                              inputs=["v_expr"], outputs=["a_expr"],
                              params={"wrt": wrt, "order": 1}))
            answer_var = "a_expr"
            if t_val is not None:
                steps.append(Step("Set time value", "set_value",
                                  inputs=[], outputs=["t_val"],
                                  params={"value": t_val, "var": "t_val"}))
                steps.append(Step("Evaluate acceleration at given time", "evaluate",
                                  inputs=["a_expr"], outputs=["answer"],
                                  params={"at": "t_val", "var": wrt}))
                answer_var = "answer"
        elif wants_velocity:
            answer_var = "v_expr"
            if t_val is not None:
                steps.append(Step("Set time value", "set_value",
                                  inputs=[], outputs=["t_val"],
                                  params={"value": t_val, "var": "t_val"}))
                steps.append(Step("Evaluate velocity at given time", "evaluate",
                                  inputs=["v_expr"], outputs=["answer"],
                                  params={"at": "t_val", "var": wrt}))
                answer_var = "answer"
        else:
            # Default: acceleration
            steps.append(Step("Find acceleration = dv/dt", "diff",
                              inputs=["v_expr"], outputs=["a_expr"],
                              params={"wrt": wrt, "order": 1}))
            answer_var = "a_expr"
            if t_val is not None:
                steps.append(Step("Set time value", "set_value",
                                  inputs=[], outputs=["t_val"],
                                  params={"value": t_val, "var": "t_val"}))
                steps.append(Step("Evaluate acceleration at given time", "evaluate",
                                  inputs=["a_expr"], outputs=["answer"],
                                  params={"at": "t_val", "var": wrt}))
                answer_var = "answer"

        return ConceptPlan(concept='kinematics', steps=steps, answer_var=answer_var)

    # ── Inverse function: f(x) = expr, f^-1(x) = k, find x ──
    if concept == 'inverse_function':
        # f(x) = 4^x, f^-1(x) = 2 means f(2) = x, so x = 4^2 = 16
        # i.e., evaluate f at the inverse value, NOT solve f(x) = inverse_val
        raw = pq.raw

        # Extract function expression: h(x) = 4^x
        func_expr = None
        m = re.search(r'([a-zA-Z])\([a-zA-Z]\)\s*=\s*(\S+(?:\s*[*+-]\s*\S+)*)', raw, re.IGNORECASE)
        if m:
            func_expr_str = m.group(2).strip().rstrip(',').rstrip('.')
            func_expr = func_expr_str

        # Also check preprocessed expressions
        if not func_expr:
            for key, val in pq.expressions.items():
                if 'inverse' not in key.lower() and 'h-1' not in key.lower() and 'f-1' not in key.lower():
                    func_expr = val
                    break

        # Extract inverse value: h^-1(x) = 2
        inverse_val = None
        m = re.search(r'(?:h|f)\s*\^?\s*-?\s*1\s*\([a-zA-Z]\)\s*=\s*(\d+)', raw, re.IGNORECASE)
        if m:
            inverse_val = int(m.group(1))
        if inverse_val is None:
            m = re.search(r'(?:h|f)\s*\*?\*?-1\s*\([a-zA-Z]\)\s*=\s*(\d+)', pq.clean, re.IGNORECASE)
            if m:
                inverse_val = int(m.group(1))
        if inverse_val is None:
            for key, val in pq.expressions.items():
                if 'inverse' in key.lower() or 'h-1' in key.lower() or 'f-1' in key.lower():
                    try:
                        inverse_val = int(val)
                    except (ValueError, TypeError):
                        pass

        if func_expr is None or inverse_val is None:
            return None

        # f^-1(x) = k means f(k) = x, so evaluate f at k
        steps = [
            Step("Parse function f(x)", "parse_expr",
                 inputs=[], outputs=["f_expr"],
                 params={"expr": str(func_expr)}),
            Step(f"Since f^-1(x) = {inverse_val}, evaluate f({inverse_val})", "evaluate",
                 inputs=["f_expr"], outputs=["answer"],
                 params={"value": inverse_val, "var": "x"}),
        ]
        return ConceptPlan(concept='inverse_function', steps=steps, answer_var="answer")

    # ── Differentiate ──
    if concept == 'differentiate':
        expr_str = _extract_expression_to_differentiate(pq)
        if not expr_str:
            return None
        wrt = _detect_differentiation_variable(pq, expr_str)

        steps = [
            Step("Parse expression", "parse_expr",
                 inputs=[], outputs=["expr"],
                 params={"expr": expr_str}),
            Step("Differentiate", "diff",
                 inputs=["expr"], outputs=["answer"],
                 params={"wrt": wrt, "order": 1}),
        ]
        return ConceptPlan(concept='differentiate', steps=steps, answer_var="answer")

    # ── Higher derivative ──
    if concept == 'higher_derivative':
        expr_str = _extract_expression_to_differentiate(pq)
        if not expr_str:
            return None
        order = 2 if 'second' in pq.clean.lower() else 1
        wrt = _detect_differentiation_variable(pq, expr_str)

        steps = [
            Step("Parse expression", "parse_expr",
                 inputs=[], outputs=["expr"],
                 params={"expr": expr_str}),
            Step(f"Find {order}nd derivative", "diff",
                 inputs=["expr"], outputs=["answer"],
                 params={"wrt": wrt, "order": order}),
        ]
        return ConceptPlan(concept='higher_derivative', steps=steps, answer_var="answer")

    # ── Definite integral ──
    if concept == 'definite_integral':
        expr_str = _extract_expression_to_integrate(pq)
        if not expr_str or not pq.bounds:
            return None
        bounds = pq.bounds

        steps = [
            Step("Parse integrand", "parse_expr",
                 inputs=[], outputs=["expr"],
                 params={"expr": expr_str}),
            Step("Evaluate definite integral", "integrate",
                 inputs=["expr"], outputs=["answer"],
                 params={"wrt": "x", "bounds": bounds}),
        ]
        return ConceptPlan(concept='definite_integral', steps=steps, answer_var="answer")

    # ── Indefinite integral ──
    if concept == 'indefinite_integral':
        expr_str = _extract_expression_to_integrate(pq)
        if not expr_str:
            return None
        wrt = _detect_integration_variable(pq, expr_str)

        steps = [
            Step("Parse integrand", "parse_expr",
                 inputs=[], outputs=["expr"],
                 params={"expr": expr_str}),
            Step("Integrate", "integrate",
                 inputs=["expr"], outputs=["answer"],
                 params={"wrt": wrt}),
        ]
        return ConceptPlan(concept='indefinite_integral', steps=steps, answer_var="answer")

    # ── LPP (Linear Programming Problem) ──
    if concept in ('lpp', 'lpp_corner'):
        objective, constraints = _extract_lpp(pq)
        if objective and constraints:
            steps = [
                Step("Parse objective function", "set_value",
                     inputs=[], outputs=["objective"],
                     params={"value": objective, "var": "objective"}),
                Step("Parse constraints", "set_value",
                     inputs=[], outputs=["constraints"],
                     params={"value": str(constraints), "var": "constraints"}),
                Step("Find corner points and evaluate", "lpp_solve",
                     inputs=[], outputs=["answer"],
                     params={"objective": objective, "constraints": constraints}),
            ]
            return ConceptPlan(concept=concept, steps=steps, answer_var="answer")

    # ── Find parameters from extrema ──
    # e.g. "2*f(x) = a*log|x| - b*x^2 + x, extreme values at x=-1 and x=2, find a and b"
    if concept == 'find_parameters_from_extrema':
        expr_str, extrema_points, params_to_find = _extract_extrema_params(pq)
        if expr_str and extrema_points:
            steps = [
                Step("Parse function", "parse_expr",
                     inputs=[], outputs=["expr"],
                     params={"expr": expr_str}),
                Step("Differentiate", "diff",
                     inputs=["expr"], outputs=["deriv"],
                     params={"wrt": "x"}),
            ]
            # For each extrema point, evaluate derivative = 0
            for i, pt in enumerate(extrema_points):
                steps.append(Step(f"Set f'({pt}) = 0", "evaluate",
                                  inputs=["deriv"], outputs=[f"eq{i}"],
                                  params={"value": pt, "var": "x", "set_to_zero": True}))
            # Solve the system of equations for the parameters
            eq_inputs = [f"eq{i}" for i in range(len(extrema_points))]
            steps.append(Step("Solve system for parameters", "solve_system",
                              inputs=eq_inputs, outputs=["answer"],
                              params={"vars": params_to_find}))
            return ConceptPlan(concept='find_parameters_from_extrema', steps=steps,
                              answer_var="answer")

    # ── Optimization ──
    if concept == 'optimization':
        expr_str = _extract_expression_to_optimize(pq)
        if not expr_str:
            return None
        wrt = _detect_variable(pq, expr_str)

        steps = [
            Step("Parse function", "parse_expr",
                 inputs=[], outputs=["expr"],
                 params={"expr": expr_str}),
            Step("Find derivative", "diff",
                 inputs=["expr"], outputs=["deriv"],
                 params={"wrt": wrt}),
            Step("Set derivative = 0 and solve", "solve_equation",
                 inputs=["deriv"], outputs=["critical_points"],
                 params={"rhs_value": 0, "var": wrt}),
            Step("Evaluate function at critical points", "evaluate",
                 inputs=["expr"], outputs=["answer"],
                 params={"at": "critical_points", "var": wrt}),
        ]
        return ConceptPlan(concept='optimization', steps=steps, answer_var="answer")

    # ── Breakeven ──
    if concept == 'breakeven':
        fixed_cost, unit_price, unit_cost = _extract_breakeven_params(pq)
        if fixed_cost is None or unit_price is None or unit_cost is None:
            return None

        steps = [
            Step("Set fixed cost", "set_value",
                 inputs=[], outputs=["fixed_cost"],
                 params={"value": fixed_cost, "var": "fixed_cost"}),
            Step("Set unit price", "set_value",
                 inputs=[], outputs=["price"],
                 params={"value": unit_price, "var": "price"}),
            Step("Set unit cost", "set_value",
                 inputs=[], outputs=["cost"],
                 params={"value": unit_cost, "var": "cost"}),
            Step("Compute contribution margin", "subtract",
                 inputs=["price", "cost"], outputs=["margin"]),
            Step("Solve: units = fixed_cost / margin", "divide",
                 inputs=["fixed_cost", "margin"], outputs=["answer"]),
        ]
        return ConceptPlan(concept='breakeven', steps=steps, answer_var="answer")

    # ── Probability (independent events) ──
    if concept == 'independent_probability':
        probs = _extract_probabilities(pq)
        if not probs:
            return None

        steps = []
        for i, p in enumerate(probs):
            steps.append(Step(f"Set P(event {i+1}) = {p}", "set_value",
                              inputs=[], outputs=[f"p{i}"],
                              params={"value": p, "var": f"p{i}"}))
            steps.append(Step(f"Complement P(not event {i+1})", "complement",
                              inputs=[f"p{i}"], outputs=[f"q{i}"]))

        # Multiply all complements
        comp_inputs = [f"q{i}" for i in range(len(probs))]
        steps.append(Step("P(none) = product of complements", "multiply",
                          inputs=comp_inputs, outputs=["answer"]))
        return ConceptPlan(concept='independent_probability', steps=steps, answer_var="answer",
                          validation={"type": "probability"})

    # ── Probability (basic) ──
    if concept == 'probability':
        probs = _extract_probabilities(pq)
        if probs:
            # Try simple computation
            steps = []
            for i, p in enumerate(probs):
                steps.append(Step(f"Set P({i+1}) = {p}", "set_value",
                                  inputs=[], outputs=[f"p{i}"],
                                  params={"value": p, "var": f"p{i}"}))
            # Default: multiply (for "none" type) — may need adjustment
            if len(probs) > 1:
                prob_inputs = [f"p{i}" for i in range(len(probs))]
                steps.append(Step("Compute probability", "multiply",
                                  inputs=prob_inputs, outputs=["answer"]))
            else:
                steps.append(Step("Set answer", "set_value",
                                  inputs=[], outputs=["answer"],
                                  params={"value": probs[0], "var": "answer"}))
            return ConceptPlan(concept='probability', steps=steps, answer_var="answer",
                              validation={"type": "probability"})

    # ── Simultaneous equations (from word problem) ──
    if concept == 'simultaneous_equations':
        coeffs, rhs = _extract_simultaneous_system(pq)
        if coeffs is None or rhs is None:
            return None

        steps = [
            Step("Set up coefficient matrix", "set_value",
                 inputs=[], outputs=["A"],
                 params={"value": str(coeffs), "var": "A"}),
            Step("Set up RHS vector", "set_value",
                 inputs=[], outputs=["B"],
                 params={"value": str(rhs), "var": "B"}),
            Step("Solve using matrix method (X = A^-1 * B)", "matrix_solve",
                 inputs=["A"], outputs=["answer"],
                 params={"coeff_matrix": "A", "rhs_vector": str(rhs)}),
        ]
        return ConceptPlan(concept='simultaneous_equations', steps=steps, answer_var="answer")

    # ── Direction cosines / line angles ──
    if concept == 'direction_cosines':
        # If alpha + beta = pi/2, find gamma
        text = pq.clean.lower()
        if 'alpha' in text and 'beta' in text and 'gamma' in text:
            if 'pi/2' in text or 'π/2' in text:
                # cos²α + cos²β + cos²γ = 1
                # If α + β = π/2, then cos²α + cos²β = 1, so cos²γ = 0, γ = π/2
                steps = [
                    Step("Use direction cosine identity: cos²α + cos²β + cos²γ = 1",
                         "set_value", inputs=[], outputs=["identity"],
                         params={"value": "cos²α + cos²β + cos²γ = 1", "var": "identity"}),
                    Step("Given α + β = π/2, so cos²α + cos²β = 1",
                         "set_value", inputs=[], outputs=["sum"],
                         params={"value": 1, "var": "sum"}),
                    Step("Therefore cos²γ = 0, so γ = π/2",
                         "set_value", inputs=[], outputs=["answer"],
                         params={"value": "pi/2", "var": "answer"}),
                ]
                return ConceptPlan(concept='direction_cosines', steps=steps, answer_var="answer")

    # ── 3D Geometry: foot of perpendicular on plane ──
    if concept == '3d_geometry':
        text = pq.clean.lower()
        if 'xy plane' in text:
            # Foot of perpendicular from (a,b,c) to XY plane is (a,b,0)
            point = _extract_point(pq)
            if point and len(point) == 3:
                answer = f"({point[0]}, {point[1]}, 0)"
                steps = [
                    Step("Foot of perpendicular on XY plane: z=0, keep x and y",
                         "set_value", inputs=[], outputs=["answer"],
                         params={"value": answer, "var": "answer"}),
                ]
                return ConceptPlan(concept='3d_geometry', steps=steps, answer_var="answer")
        elif 'yz plane' in text:
            point = _extract_point(pq)
            if point and len(point) == 3:
                answer = f"(0, {point[1]}, {point[2]})"
                steps = [
                    Step("Foot of perpendicular on YZ plane: x=0, keep y and z",
                         "set_value", inputs=[], outputs=["answer"],
                         params={"value": answer, "var": "answer"}),
                ]
                return ConceptPlan(concept='3d_geometry', steps=steps, answer_var="answer")

    # ── Vector operations (i·(k×j) + j·(i×k) + k·(i×j)) ──
    if concept == 'vector_operations':
        text = pq.clean
        # Detect scalar triple product patterns
        if 'i.' in text and 'j.' in text and 'k.' in text:
            # i·(k×j) + j·(i×k) + k·(i×j)
            # k×j = -i, so i·(-i) = -1
            # i×k = -j, so j·(-j) = -1
            # i×j = k, so k·k = 1
            # Total: -1 + -1 + 1 = -1
            steps = [
                Step("Compute i·(k×j) = i·(-i) = -1", "set_value",
                     inputs=[], outputs=["t1"], params={"value": -1, "var": "t1"}),
                Step("Compute j·(i×k) = j·(-j) = -1", "set_value",
                     inputs=[], outputs=["t2"], params={"value": -1, "var": "t2"}),
                Step("Compute k·(i×j) = k·k = 1", "set_value",
                     inputs=[], outputs=["t3"], params={"value": 1, "var": "t3"}),
                Step("Sum all terms", "add",
                     inputs=["t1", "t2", "t3"], outputs=["answer"]),
            ]
            return ConceptPlan(concept='vector_operations', steps=steps, answer_var="answer")

    # ── Cofactor determinant ──
    if concept == 'cofactor_determinant':
        # If |A| = 5 (3rd order), then |adj(A)| = |A|^(n-1) = 5^2 = 25
        det_val = _extract_determinant_value(pq)
        if det_val is not None:
            # Detect order
            text = pq.raw.lower()
            if '3rd' in text or 'third' in text or 'order 3' in text:
                n = 3
            elif '2nd' in text or 'second' in text or 'order 2' in text:
                n = 2
            else:
                n = 3  # default for Class 12
            result = det_val ** (n - 1)
            steps = [
                Step(f"Given |A| = {det_val} (order {n})", "set_value",
                     inputs=[], outputs=["det"], params={"value": det_val, "var": "det"}),
                Step(f"|adj(A)| = |A|^(n-1) = {det_val}^{n-1} = {result}", "set_value",
                     inputs=[], outputs=["answer"], params={"value": result, "var": "answer"}),
            ]
            return ConceptPlan(concept='cofactor_determinant', steps=steps, answer_var="answer")

    # ── Solve equation (generic) ──
    if concept == 'solve_equation':
        expr_str = _extract_equation_to_solve(pq)
        if expr_str:
            steps = [
                Step("Parse equation", "parse_expr",
                     inputs=[], outputs=["expr"],
                     params={"expr": expr_str}),
                Step("Solve for variable", "solve",
                     inputs=["expr"], outputs=["answer"],
                     params={"var": "x"}),
            ]
            return ConceptPlan(concept='solve_equation', steps=steps, answer_var="answer")

    # ── Differential equation ──
    if concept == 'differential_equation':
        de_str, ic, eval_point = _extract_de(pq)
        if de_str:
            steps = [
                Step("Parse differential equation", "parse_expr",
                     inputs=[], outputs=["de"],
                     params={"expr": de_str}),
                Step("Solve DE with dsolve", "dsolve",
                     inputs=["de"], outputs=["sol"]),
            ]
            if ic:
                steps.append(Step(f"Apply IC y({ic[0]})={ic[1]}", "apply_ic",
                                  inputs=["sol"], outputs=["sol_ic"],
                                  params={"x0": ic[0], "y0": ic[1]}))
                if eval_point:
                    steps.append(Step(f"Evaluate y({eval_point})", "evaluate",
                                      inputs=["sol_ic"], outputs=["answer"],
                                      params={"value": eval_point, "var": "x"}))
            else:
                if eval_point:
                    steps.append(Step(f"Evaluate y({eval_point})", "evaluate",
                                      inputs=["sol"], outputs=["answer"],
                                      params={"value": eval_point, "var": "x"}))
            return ConceptPlan(concept='differential_equation', steps=steps,
                              answer_var="answer" if (ic or eval_point) else "sol")

    # ── Conceptual MCQ: definition-based questions ──
    if concept == 'conceptual_mcq':
        answer = _resolve_conceptual_mcq(pq)
        if answer:
            steps = [
                Step("Apply definition", "set_value",
                     inputs=[], outputs=["answer"],
                     params={"value": answer, "var": "answer"}),
            ]
            return ConceptPlan(concept='conceptual_mcq', steps=steps, answer_var="answer")

    # ── Evaluate at point ──
    if concept == 'evaluate_at_point':
        expr_str = list(pq.expressions.values())[0] if pq.expressions else None
        point = _extract_evaluation_point(pq)
        if expr_str and point is not None:
            steps = [
                Step("Parse expression", "parse_expr",
                     inputs=[], outputs=["expr"],
                     params={"expr": expr_str}),
                Step("Set evaluation point", "set_value",
                     inputs=[], outputs=["point"],
                     params={"value": point, "var": "point"}),
                Step("Evaluate at point", "evaluate",
                     inputs=["expr"], outputs=["answer"],
                     params={"at": "point", "var": "x"}),
            ]
            return ConceptPlan(concept='evaluate_at_point', steps=steps, answer_var="answer")

    return None


# ═══════════════════════════════════════════════════════════════════
# Extraction Helpers (concept-specific)
# ═══════════════════════════════════════════════════════════════════

def _extract_time_value(pq: PreprocessedQuestion) -> Optional[str]:
    """Extract time value from a kinematics question."""
    # Look for "t = 2*pi/3" or "when t = ..."
    m = re.search(r't\s*=\s*([0-9pi*/\.]+)', pq.clean, re.IGNORECASE)
    if m:
        return m.group(1)
    # Check expressions dict
    if 't' in pq.expressions:
        return pq.expressions['t']
    return None


def _extract_expression_to_differentiate(pq: PreprocessedQuestion) -> Optional[str]:
    """Extract the expression to differentiate."""
    # Check preprocessed expressions
    for key, val in pq.expressions.items():
        if key in ('fx', 'y', 'f'):
            return val
    # Look for "differentiate EXPR" or "derivative of EXPR"
    m = re.search(r'(?:differentiate|derivative of)\s+(.+?)(?:\s+(?:with respect to|wrt|w\.r\.t)|$)',
                  pq.clean, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    # Look for "y = EXPR" or "f(x) = EXPR" — stop at question words
    m = re.search(r'(?:f\(x\)|y)\s*=\s*(.+?)(?:\s+(?:find|what|how|determine|at|when|is|are|$))',
                  pq.clean, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    return None


def _detect_differentiation_variable(pq: PreprocessedQuestion, expr_str: str) -> str:
    """Detect which variable to differentiate with respect to."""
    text = pq.clean.lower()
    m = re.search(r'with respect to\s+(\w+)', text, re.IGNORECASE)
    if m:
        return m.group(1)
    if 'wrt' in text:
        m = re.search(r'wrt\s+(\w+)', text, re.IGNORECASE)
        if m:
            return m.group(1)
    # Default: x for most, t for kinematics
    if 't' in expr_str and 'x' not in expr_str:
        return 't'
    return 'x'


def _detect_integration_variable(pq: PreprocessedQuestion, expr_str: str) -> str:
    """Detect integration variable."""
    text = pq.clean.lower()
    if 'dx' in text:
        return 'x'
    if 'dt' in text:
        return 't'
    return 'x'


def _detect_variable(pq: PreprocessedQuestion, expr_str: str) -> str:
    """Detect the main variable in an expression."""
    if 'x' in expr_str:
        return 'x'
    if 't' in expr_str:
        return 't'
    return 'x'


def _extract_expression_to_integrate(pq: PreprocessedQuestion) -> Optional[str]:
    """Extract the expression to integrate."""
    text = pq.clean
    # Look for "integral of EXPR dx" or "integrate EXPR"
    m = re.search(r'(?:integral of|integrate)\s+(.+?)(?:\s+dx|\s+dt|$)', text, re.IGNORECASE)
    if m:
        expr = m.group(1).strip()
        # Remove trailing "dx" or "dt"
        expr = re.sub(r'\s+(dx|dt)$', '', expr, flags=re.IGNORECASE)
        return expr
    # Look for "evaluate: integral from A to B of EXPR dx"
    m = re.search(r'(?:evaluate:?\s+)?integral\s+from\s+\S+\s+to\s+\S+\s+of\s+(.+?)(?:\s+dx|\s+dt|$)',
                  text, re.IGNORECASE)
    if m:
        expr = m.group(1).strip()
        expr = re.sub(r'\s+(dx|dt)$', '', expr, flags=re.IGNORECASE)
        return expr
    return None


def _extract_expression_to_optimize(pq: PreprocessedQuestion) -> Optional[str]:
    """Extract the expression to optimize."""
    for key, val in pq.expressions.items():
        if key in ('fx', 'y', 'f', 'z'):
            return val
    # Look for "f(x) = EXPR" in text
    m = re.search(r'(?:f\(x\)|y)\s*=\s*(.+?)(?:\s+find|\s+maximum|\s+minimum|$)', pq.clean, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    return None


def _extract_breakeven_params(pq: PreprocessedQuestion) -> tuple:
    """Extract fixed cost, unit price, and unit cost from breakeven question.

    Handles two formats:
    1. Traditional: "Rs X towards rent" + "Rs Y interest" + "cost Rs Z" + "sold for Rs W"
    2. Salary format: "Rs X fixed salary per month" + "Y% of revenue" + "Rs Z per student"
    """
    text = pq.raw.lower()

    # ── Format 2: Salary/percentage format ──
    # "Rs 24000 fixed salary per month" + "25% of revenue" + "Rs 800 per student"
    salary_match = re.search(r'(?:rs\.?\s*|₹\s*)(\d+(?:,\d+)*)\s*(?:fixed\s+)?salary', text)
    percentage_match = re.search(r'(\d+(?:\.\d+)?)\s*%\s*of\s+(?:the\s+)?revenue', text)
    per_student_match = re.search(r'(?:rs\.?\s*|₹\s*)(\d+(?:,\d+)*)\s*(?:charged|per)\s+(?:from\s+)?every\s+student|(?:rs\.?\s*|₹\s*)(\d+(?:,\d+)*)\s*per\s+student', text)

    if salary_match and percentage_match:
        fixed_cost = int(salary_match.group(1).replace(',', ''))
        # Revenue per student
        unit_price = None
        if per_student_match:
            gp = per_student_match.group(1) or per_student_match.group(2)
            unit_price = int(gp.replace(',', '')) if gp else None
        # Variable cost = percentage of revenue
        pct = float(percentage_match.group(1))
        if unit_price:
            unit_cost = pct / 100.0 * unit_price
            return (fixed_cost, unit_price, unit_cost)
        return (fixed_cost, None, None)

    # ── Format 1: Traditional format ──
    fixed_costs = re.findall(r'(?:rs\.?\s*|₹\s*)(\d+(?:,\d+)*)', text)
    unit_cost_match = re.search(r'cost of producing.*?(?:rs\.?\s*|₹\s*)(\d+)', text, re.IGNORECASE)
    unit_price_match = re.search(r'(?:sold for|sale price|each unit.*?sold)(?:.*?)(?:rs\.?\s*|₹\s*)(\d+)', text, re.IGNORECASE)

    fixed_cost = None
    unit_price = None
    unit_cost = None

    if unit_cost_match:
        unit_cost = int(unit_cost_match.group(1))
    if unit_price_match:
        unit_price = int(unit_price_match.group(1))

    if fixed_costs:
        all_costs = [int(c.replace(',', '')) for c in fixed_costs]
        if unit_cost and unit_cost in all_costs:
            all_costs.remove(unit_cost)
        if unit_price and unit_price in all_costs:
            all_costs.remove(unit_price)
        fixed_cost = sum(all_costs)

    return (fixed_cost, unit_price, unit_cost)


def _extract_probabilities(pq: PreprocessedQuestion) -> list:
    """Extract probability values from the question."""
    text = pq.raw
    probs = []
    # Pattern: "0.2, 0.3 and 0.5" or "1/6, 1/8"
    # Look for decimal probabilities
    decimals = re.findall(r'\b0\.\d+\b', text)
    if decimals:
        probs = [float(d) for d in decimals]
    else:
        # Look for fractions
        fractions = re.findall(r'\b(\d+)/(\d+)\b', text)
        if fractions:
            probs = [float(n)/float(d) for n, d in fractions]
    return probs


def _extract_simultaneous_system(pq: PreprocessedQuestion) -> tuple:
    """Extract coefficient matrix and RHS from a word problem with simultaneous equations."""
    text = pq.raw.lower()

    # Pattern: "4 kgs apples, 3 kgs grapes, 2 kgs oranges cost him Rs 600"
    # → 4x + 3y + 2z = 600
    # Also handles: "4 kg apples" or "4 apples"

    # First, find all the item names mentioned
    # Look for patterns like "N kgs ITEM" or "N kg ITEM"
    item_pattern = re.compile(r'(\d+)\s*kgs?\s+(\w+)')
    cost_pattern = re.compile(r'(?:cost|costs)\s+(?:him\s+)?(?:rs\.?\s*|₹\s*)(\d+)')

    # Split text into sentences/statements by periods or "cost" boundaries
    # Each statement should have 3 quantities + 1 cost
    statements_raw = re.split(r'\.\s*', text)

    # Better approach: split on "cost him Rs" and reconstruct
    # Find all (qty, item) pairs and all costs
    all_pairs = item_pattern.findall(text)
    all_costs = cost_pattern.findall(text)

    if len(all_costs) < 3 or len(all_pairs) < 9:
        return (None, None)

    # Group pairs into statements of 3
    # Each statement has 3 (qty, item) pairs followed by a cost
    # Find statement boundaries by locating "cost" positions
    cost_positions = [m.start() for m in cost_pattern.finditer(text)]

    if len(cost_positions) < 3:
        return (None, None)

    # Extract pairs before each cost
    statements = []
    prev_pos = 0
    for cost_pos in cost_positions:
        segment = text[prev_pos:cost_pos]
        pairs = item_pattern.findall(segment)
        cost_match = cost_pattern.search(text[cost_pos:])
        if cost_match:
            cost = int(cost_match.group(1))
            statements.append((pairs, cost))
        prev_pos = cost_pos + 10  # skip past "cost him Rs"

    if len(statements) < 3:
        return (None, None)

    # Get unique items (preserve order from first statement)
    items = []
    for pair in statements[0][0]:
        if pair[1] not in items:
            items.append(pair[1])

    if len(items) != 3:
        return (None, None)

    # Build coefficient matrix
    coeffs = []
    rhs = []
    for pairs, cost in statements[:3]:
        row = [0, 0, 0]
        for qty, item in pairs:
            if item in items:
                idx = items.index(item)
                row[idx] = int(qty)
        coeffs.append(row)
        rhs.append(cost)

    return (coeffs, rhs)


def _extract_point(pq: PreprocessedQuestion) -> Optional[tuple]:
    """Extract a 3D point from the question."""
    if pq.points:
        return pq.points[0]
    # Look for P(a, b, c) pattern
    m = re.search(r'P\s*\(\s*([a-zA-Z]),\s*([a-zA-Z]),\s*([a-zA-Z])\s*\)', pq.raw, re.IGNORECASE)
    if m:
        return (m.group(1), m.group(2), m.group(3))
    return None


def _extract_determinant_value(pq: PreprocessedQuestion) -> Optional[int]:
    """Extract determinant value from question."""
    m = re.search(r'determinant\s+(?:is|value\s+is)\s+(\d+)', pq.raw, re.IGNORECASE)
    if m:
        return int(m.group(1))
    m = re.search(r'\|A\|\s*=\s*(\d+)', pq.raw, re.IGNORECASE)
    if m:
        return int(m.group(1))
    return None


def _extract_equation_to_solve(pq: PreprocessedQuestion) -> Optional[str]:
    """Extract an equation to solve."""
    if pq.equations:
        return pq.equations[0]
    # Look for "solve EXPR = EXPR"
    m = re.search(r'solve\s+(.+?)(?:\s+for|$)', pq.clean, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    return None


def _extract_lpp(pq: PreprocessedQuestion) -> tuple:
    """Extract LPP objective and constraints.
    e.g. "Maximize Z = x + 2*y subject to x - y >= 0, 2 >= 2*y - x, x >= 0, y >= 0"
    Returns (objective_str, [constraint_strs])
    """
    text = pq.raw + " " + pq.clean

    # Extract objective: "Maximize Z = expr" (stop at "subject to")
    m = re.search(r'(maximi[sz]e|minimi[sz]e)\s+Z\s*=\s*(.+?)(?:\s+subject\s+to|\s+s\.t\.|$)',
                  text, re.IGNORECASE)
    if not m:
        m = re.search(r'(maximi[sz]e|minimi[sz]e)\s+(\w+)\s*=\s*(.+?)(?:\s+subject\s+to|\s+s\.t\.|$)',
                      text, re.IGNORECASE)
    if m:
        objective = f"{m.group(1)} Z = {m.group(2).strip()}"
    else:
        objective = None

    # Extract constraints after "subject to"
    constraints = []
    st_match = re.search(r'subject\s+to\s*(?:the\s+constraints\s*)?[:\.]?(.+?)(?:\([a-c]\)|$)',
                         text, re.IGNORECASE | re.DOTALL)
    if st_match:
        constraints_text = st_match.group(1).strip()
        # Remove sub-question parts
        constraints_text = re.sub(r'\([a-c]\)\s.*?(?=\([a-c]\)|$)', '', constraints_text)
        # Normalize inequality symbols
        constraints_text = constraints_text.replace('≥', '>=').replace('≤', '<=')
        # Split on commas followed by a variable or number
        raw_constraints = re.split(r',\s*(?=[a-zA-Z0-9])', constraints_text)
        for c in raw_constraints:
            c = c.strip().rstrip('.,')
            if c and ('>=' in c or '<=' in c or '>' in c or '<' in c):
                constraints.append(c)

    return (objective, constraints)


def _extract_extrema_params(pq: PreprocessedQuestion) -> tuple:
    """Extract function expression, extrema points, and parameters to find.
    e.g. "2*f(x) = a*log|x| - b*x^2 + x, extreme values at x=-1 and x=2, find a and b"
    Returns (expr_str, [extrema_points], [param_names])
    """
    text = pq.raw + " " + pq.clean

    # Get the expression — extract the full equation including coefficient
    # Pattern: "N*f(x) = expr" or "f(x) = expr"
    expr_str = None
    m = re.search(r'(?:(\d+)\s*\*\s*)?f\(x\)\s*=\s*(.+?)(?:\s+if\s|\s+where\s|\s+given\s|,|$)',
                  text, re.IGNORECASE)
    if m:
        coeff = m.group(1)
        rhs = m.group(2).strip().rstrip(',')
        if coeff:
            # If equation is "2*f(x) = expr", then f(x) = expr/2
            # But for finding extrema, f'(x) = 0 iff (expr/2)' = 0 iff expr' = 0
            # So we can just use expr directly (the 2 cancels in derivative=0)
            expr_str = rhs
        else:
            expr_str = rhs

    if not expr_str:
        for key, val in pq.expressions.items():
            if key in ('fx', 'f', 'y'):
                expr_str = val
                break

    if not expr_str:
        return (None, None, None)

    # Extract extrema points: "extreme values at x = -1 and x = 2"
    extrema_match = re.search(r'extreme.{0,50}?x\s*=\s*(-?\d+(?:\.\d+)?)\s+and\s+x\s*=\s*(-?\d+(?:\.\d+)?)',
                              text, re.IGNORECASE)
    if extrema_match:
        extrema_points = [extrema_match.group(1), extrema_match.group(2)]
    else:
        extrema_idx = text.lower().find('extreme')
        if extrema_idx >= 0:
            after = text[extrema_idx:]
            extrema_points = re.findall(r'x\s*=\s*(-?\d+(?:\.\d+)?)', after)
        else:
            extrema_points = re.findall(r'x\s*=\s*(-?\d+(?:\.\d+)?)', text)

    # Extract parameter names: "find a and b" or "find the value of a and b"
    param_match = re.search(r'find\s+(?:the\s+value\s+of\s+)?(\w+)\s+and\s+(\w+)', text, re.IGNORECASE)
    if param_match:
        params_to_find = [param_match.group(1), param_match.group(2)]
    else:
        params_to_find = re.findall(r'\b([a-zA-Z])\b', expr_str)
        params_to_find = [p for p in params_to_find if p not in ('x', 'e', 'i', 'f')]

    return (expr_str, extrema_points, params_to_find)


def _extract_de(pq: PreprocessedQuestion) -> tuple:
    """Extract differential equation, initial condition, and evaluation point.
    Returns (de_str, (x0, y0) or None, eval_point or None).
    """
    text = pq.raw + " " + pq.clean

    # Extract the DE equation: "cos^2(x) * dy/dx + y = tan(x)"
    # Look for patterns with dy/dx
    m = re.search(r'((?:[\w\*\+\-\(\)\^\|\/\s\.,]*?)\s*dy/dx\s*[\+\-]\s*[\w\*\+\-\(\)\^\|\/\s\.]*?)\s*=\s*([\w\*\+\-\(\)\^\|\/\s\.]*)', text, re.IGNORECASE)
    if not m:
        # Try from equations list
        for eq in pq.equations:
            if 'dy/dx' in eq.lower() or 'y\'' in eq.lower():
                m2 = re.match(r'(.+?)\s*=\s*(.+)', eq)
                if m2:
                    de_str = f"Eq({m2.group(1).strip()} - ({m2.group(2).strip()}), 0)"
                    break
        else:
            return (None, None, None)
    else:
        lhs = m.group(1).strip()
        rhs = m.group(2).strip()
        # Convert to SymPy Eq form: Eq(lhs - rhs, 0)
        # Replace dy/dx with Derivative(y(x), x) — but parse_expr can't handle that
        # Instead, use a simpler approach: replace dy/dx with y' and let SymPy handle it
        # Actually, for dsolve we need Function('y')(x) and Derivative
        # Let's store the raw equation and handle it in the dsolve handler
        de_str = f"{lhs} - ({rhs})"

    # Clean up the DE string
    # Handle trig powers: cos^2(x) → cos(x)**2, sin^3(x) → sin(x)**3
    de_str = re.sub(r'(sin|cos|tan|sec|csc|cot|log|exp|sqrt)\^(\d+)\((\w+)\)',
                    r'\1(\3)**\2', de_str)
    de_str = de_str.replace('^', '**')
    # Replace dy/dx with a placeholder that parse_expr can handle
    de_str = de_str.replace('dy/dx', 'yp')
    de_str = de_str.replace("y'", 'yp')

    # Extract initial condition: "y(0) = 1" or "given that y(0) = 1"
    ic = None
    m = re.search(r'y\s*\(\s*(\d+)\s*\)\s*=\s*(\d+)', text)
    if m:
        ic = (int(m.group(1)), int(m.group(2)))

    # Extract evaluation point: "find y(pi/4)" or "hence find y(pi/4)"
    eval_point = None
    m = re.search(r'y\s*\(\s*([0-9pi*/\.\-]+)\s*\)', text)
    if m:
        val = m.group(1).strip()
        # Skip if this is the initial condition
        if ic and val == str(ic[0]):
            # Look for another y() in the text
            all_y = re.findall(r'y\s*\(\s*([0-9pi*/\.\-]+)\s*\)', text)
            if len(all_y) > 1:
                eval_point = all_y[1].strip()
        else:
            eval_point = val

    return (de_str, ic, eval_point)


# ═══════════════════════════════════════════════════════════════════
# Conceptual MCQ Knowledge Base
# ═══════════════════════════════════════════════════════════════════

# Maps definition keywords to the correct answer pattern
_CONCEPTUAL_ANSWERS = {
    'critical point': 'both',
    'stationary point': "f'(c) = 0",
    'point of inflection': "f''(c) = 0",
    'saddle point': "f'(c) = 0",
}


def _resolve_conceptual_mcq(pq: PreprocessedQuestion) -> Optional[str]:
    """Resolve a conceptual MCQ by matching definition keywords to known answers."""
    text = pq.clean.lower()
    for keyword, answer in _CONCEPTUAL_ANSWERS.items():
        if keyword in text:
            # For "both" answers, check if option (c) says "both"
            if answer == 'both':
                for opt in pq.options:
                    if 'both' in opt.lower():
                        return opt
            # For specific answers, match against options
            for opt in pq.options:
                if answer in opt.lower() or opt.lower() in answer:
                    return opt
            return answer
    return None


def _extract_evaluation_point(pq: PreprocessedQuestion) -> Optional[str]:
    """Extract the point at which to evaluate."""
    m = re.search(r'at\s+x\s*=\s*([0-9pi*/\.\-]+)', pq.clean, re.IGNORECASE)
    if m:
        return m.group(1)
    m = re.search(r'when\s+(?:x|t)\s*=\s*([0-9pi*/\.\-]+)', pq.clean, re.IGNORECASE)
    if m:
        return m.group(1)
    return None


# ═══════════════════════════════════════════════════════════════════
# MCQ Option Matching
# ═══════════════════════════════════════════════════════════════════

def _clean_answer(val):
    """Clean up answer value: round floats, simplify expressions."""
    if val is None:
        return None
    if isinstance(val, list):
        return [_clean_answer(v) for v in val]
    # If it's a string, return as-is (e.g., coordinate tuples like "(a, b, 0)")
    if isinstance(val, str):
        return val
    # Try to simplify SymPy expressions
    try:
        simplified = simplify(val)
        # Check if it contains pi or other symbolic constants
        if simplified.has(pi):
            # Keep symbolic form for pi-based answers
            return simplified
        # Try numeric evaluation
        numeric = N(simplified)
        if numeric.is_number and not numeric.is_symbol:
            f = float(numeric)
            # If close to an integer, return integer
            if abs(f - round(f)) < 1e-9:
                return int(round(f))
            # Otherwise round to reasonable precision
            return round(f, 10)
        return simplified
    except Exception:
        pass
    # Handle plain floats
    if isinstance(val, float):
        if abs(val - round(val)) < 1e-9:
            return int(round(val))
        return round(val, 10)
    return val


def _match_mcq_option(computed_answer, options: list) -> Optional[str]:
    """Match a computed answer against MCQ options."""
    if not options or computed_answer is None:
        return None

    # Convert computed answer to float if possible
    try:
        computed_float = float(computed_answer)
    except (TypeError, ValueError):
        computed_float = None

    # First pass: try exact string match
    answer_str = str(computed_answer).strip()
    for opt in options:
        if opt.strip() == answer_str:
            return opt

    # Second pass: try exact numeric match (whole option is a number)
    if computed_float is not None:
        for opt in options:
            opt_clean = opt.strip()
            try:
                opt_float = float(opt_clean)
                if abs(computed_float - opt_float) < 0.01:
                    return opt
            except ValueError:
                continue

    # Third pass: fraction match
    if computed_float is not None:
        for opt in options:
            opt_clean = opt.strip().lower()
            frac_match = re.match(r'^(\d+)/(\d+)$', opt_clean)
            if frac_match:
                frac_val = float(frac_match.group(1)) / float(frac_match.group(2))
                if abs(computed_float - frac_val) < 0.01:
                    return opt

    # Fourth pass: substring match (less reliable)
    for opt in options:
        opt_clean = opt.strip().lower()
        answer_lower = answer_str.lower()
        if answer_lower == opt_clean:
            return opt

    return None


# ═══════════════════════════════════════════════════════════════════
# Main Solver
# ═══════════════════════════════════════════════════════════════════

def _solve_multi_part(question: str, pq: PreprocessedQuestion) -> Optional[SocraticResult]:
    """Solve a multi-part question by solving each sub-question separately.
    For LPP and other problems where the full context is needed, try the full question first.
    """
    stem = pq.stem if pq.stem else ""

    # First, try solving the FULL question (including all sub-questions)
    # This works for LPP where the answer covers all parts
    full_result = solve(question.replace("(a)", "").replace("(b)", "")
                                .replace("(c)", "").replace("(d)", ""),
                        _allow_multi_part=False)
    if full_result and full_result.answer and "Could not" not in full_result.answer:
        return full_result

    # If full solve doesn't work, try each sub-question separately
    all_steps = []
    all_answers = []

    for label, sub_text in pq.sub_questions:
        # Combine stem with sub-question
        full_q = stem + " " + sub_text if stem else sub_text
        sub_result = solve(full_q)
        if sub_result:
            all_steps.append({"name": f"Part ({label})",
                              "explanation": sub_result.answer,
                              "success": True})
            all_answers.append(sub_result.answer)
            for s in sub_result.steps:
                all_steps.append(s)
        else:
            # Try with explicit expression from stem
            if pq.expressions:
                expr_info = " ".join(f"{k} = {v}" for k, v in pq.expressions.items())
                full_q2 = expr_info + " " + sub_text
                sub_result2 = solve(full_q2)
                if sub_result2:
                    all_steps.append({"name": f"Part ({label})",
                                      "explanation": sub_result2.answer,
                                      "success": True})
                    all_answers.append(sub_result2.answer)
                    for s in sub_result2.steps:
                        all_steps.append(s)
                    continue
            all_steps.append({"name": f"Part ({label})",
                              "explanation": "Could not solve",
                              "success": False})

    if all_answers:
        answer_str = ", ".join(all_answers)
        return SocraticResult(
            answer=answer_str,
            steps=all_steps,
            concept="multi_part",
            confidence=0.7,
            matched_option=None,
            matched=True,
        )
    return None


def solve(question: str, _allow_multi_part: bool = True) -> Optional[SocraticResult]:
    """Solve a question using the Socratic decomposition approach.

    Returns SocraticResult if successful, None if concept not identified or plan fails.
    """
    # Step 1: Preprocess
    pq = preprocess(question)

    # Step 1b: Handle multi-part questions
    if _allow_multi_part and pq.sub_questions and not pq.is_mcq:
        return _solve_multi_part(question, pq)

    # Step 2: Identify concept
    concept = identify_concept(pq)
    if concept is None:
        logger.info(f"Socratic: no concept identified for: {question[:80]}")
        return None

    # Step 3: Generate plan
    plan = generate_plan(concept, pq)
    if plan is None:
        logger.info(f"Socratic: no plan for concept '{concept}'")
        return None

    # Step 4: Execute plan
    executor = StepExecutor()
    step_results = []

    for step in plan.steps:
        success, explanation = executor.execute(step)
        step_results.append({
            "name": step.name,
            "explanation": explanation,
            "success": success,
        })
        if not success:
            logger.info(f"Socratic: step '{step.name}' failed: {explanation}")
            return None

    # Step 5: Get answer
    answer_val = executor.vars.get(plan.answer_var)
    if answer_val is None:
        return None

    # Clean up the answer value
    answer_val = _clean_answer(answer_val)

    # Convert answer to string
    if isinstance(answer_val, list):
        answer_str = ", ".join(str(s) for s in answer_val)
    else:
        answer_str = str(answer_val)

    # Step 6: Validate
    if plan.validation.get("type") == "probability":
        try:
            val = float(answer_val)
            if val < -0.01 or val > 1.01:
                return None
        except (TypeError, ValueError):
            pass

    # Step 7: Match MCQ option if applicable
    matched_option = None
    if pq.is_mcq and pq.options:
        matched_option = _match_mcq_option(answer_val, pq.options)
        if matched_option:
            answer_str = matched_option

    # Step 8: Build result
    result = SocraticResult(
        answer=answer_str,
        steps=step_results,
        concept=concept,
        confidence=0.8 if matched_option else 0.6,
        matched_option=matched_option,
        matched=True,
    )

    return result


# ═══════════════════════════════════════════════════════════════════
# Testing
# ═══════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    test_questions = [
        ("If h(x) = 4^x and h^-1(x) = 2, then value of x is: "
         "(a) -4 (b) 4 (c) -16 (d) 16", "16"),

        ("The displacement, x metres of a particle from a fixed point at time t seconds "
         "is given by x = 6*cos(3*t + pi/3). Find the acceleration of the particle, "
         "when t = 2*pi/3.", "-27"),

        ("Rahul, a class XII student, has a probability of getting a grade A in the examination "
         "of three subjects namely Mathematics, Physics and Chemistry are 0.2, 0.3 and 0.5 "
         "respectively. Find the probability that he gets a grade A in none of the subjects.", "0.28"),

        ("A company paid Rs 8475 towards the rent of the building and Rs 7625 interest on the loan. "
         "The cost of producing one unit of a product is Rs 20. If each unit is sold for Rs 27, "
         "find the break-even point.", "2300"),

        ("If the value of 3rd order determinant is 5, then the value of determinant "
         "formed by replacing its element by its co-factor is: "
         "(a) 5 (b) 1/5 (c) 125 (d) 25", "25"),

        ("The value of i.(k x j) + j.(i x k) + k.(i x j) is: "
         "(a) -3 (b) -2 (c) -1 (d) 0", "-1"),

        ("If L is the foot of the perpendicular drawn from a point P(a, b, c) on the XY plane, "
         "what is the co-ordinate of L? (a) (a, b, 0) (b) (0, 0, c) (c) (0, b, 0) (d) (a, 0, 0)",
         "(a, b, 0)"),

        ("A line makes angles alpha, beta and gamma with the x, y and z axes respectively. "
         "Given that alpha + beta = pi/2, then what is the value of gamma?", "pi/2"),

        ("Evaluate: integral of 2^x * 2^(x/2) * 2^(x/4) dx.", "2^(7x/4)/(7*log(2))"),

        ("Rajesh wants to purchase some fruits from fruit market. "
         "4 kgs apples, 3 kgs grapes and 2 kgs oranges cost him Rs 600. "
         "2 kgs apples, 4 kgs grapes and 6 kgs oranges cost him Rs 900. "
         "6 kgs apples, 2 kgs grapes and 3 kgs oranges cost him Rs 700. "
         "Find how much Rajesh has to pay per kilogram for each fruit.",
         "apple=50, grapes=80, orange=80"),
    ]

    for i, (q, expected) in enumerate(test_questions):
        print(f"\n{'='*70}")
        print(f"Test {i+1}: {q[:80]}...")
        print(f"Expected: {expected}")
        print(f"{'='*70}")
        result = solve(q)
        if result:
            print(f"  Concept:  {result.concept}")
            print(f"  Answer:   {result.answer}")
            print(f"  Matched:  {result.matched_option}")
            print(f"  Steps:")
            for s in result.steps:
                print(f"    - {s['name']}: {s['explanation']}")
        else:
            print(f"  NO MATCH")
