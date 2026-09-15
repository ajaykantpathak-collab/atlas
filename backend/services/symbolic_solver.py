"""
symbolic_solver.py
JEE/NEET multi-concept symbolic solver with physics formula database,
sympy symbolic solving, Newton-Raphson numerical fallback, and basic chemistry.
"""

from __future__ import annotations

import math
import re
from dataclasses import dataclass, field
from typing import Any, Optional

# ── Optional SymPy ──────────────────────────────────────────────────────────
try:
    import sympy as sp
    from sympy import (
        symbols, Symbol, solve, Eq, simplify, Rational,
        sqrt, pi, sin, cos, tan, log, exp, acos, asin, atan,
        integrate, diff, Derivative, Integral, nsolve,
        SympifyError, Mul, Add, Pow, Number, Float, Integer
    )
    from sympy.parsing.sympy_parser import (
        parse_expr, standard_transformations, implicit_multiplication
    )
    SYMPY_AVAILABLE = True
    _tf = standard_transformations + (implicit_multiplication,)
except ImportError:
    SYMPY_AVAILABLE = False
    sp = None  # type: ignore


# ── Dataclass ───────────────────────────────────────────────────────────────

@dataclass
class SolverResult:
    """Result from solving a single sub-problem."""
    sub_problem_id: str = ""
    success: bool = False
    symbolic_result: str = ""
    numerical_result: float | None = None
    steps: list[str] = field(default_factory=list)
    units: str = ""
    error: str = ""

    def __str__(self) -> str:
        lines: list[str] = [f"[{'OK' if self.success else 'FAIL'}] {self.sub_problem_id}"]
        if self.symbolic_result:
            lines.append(f"  Symbolic : {self.symbolic_result}")
        if self.numerical_result is not None:
            unit = f" {self.units}" if self.units else ""
            lines.append(f"  Numeric  : {self.numerical_result}{unit}")
        for s in self.steps:
            lines.append(f"  Step     : {s}")
        if self.error:
            lines.append(f"  Error    : {self.error}")
        return "\n".join(lines)


# ── Helpers ──────────────────────────────────────────────────────────────────

def _sympy_available() -> bool:
    return SYMPY_AVAILABLE


def _safe_eval(expr_str: str, local_vars: dict[str, Any]) -> float | complex | None:
    """Evaluate a string expression numerically with math functions available.

    Security: blocks attribute access (.), dunder (__), imports, and
    statement separators before eval. __builtins__ is set to {}.
    """
    # Reject dangerous patterns before eval
    _DANGER = re.compile(r'__|\.|\b(import|exec|eval|open|getattr|setattr|delattr|globals|locals|vars|dir|type|compile|input|breakpoint|exit|quit|help|license|copyright|credits|classmethod|staticmethod|property|super|memoryview|frozenset)\b')
    if _DANGER.search(expr_str):
        return None
    safe_ns: dict[str, Any] = {
        "sin": math.sin, "cos": math.cos, "tan": math.tan,
        "asin": math.asin, "acos": math.acos, "atan": math.atan,
        "sinh": math.sinh, "cosh": math.cosh, "tanh": math.tanh,
        "sqrt": math.sqrt, "log": math.log, "log10": math.log10,
        "exp": math.exp, "abs": abs, "pow": pow,
        "pi": math.pi, "e": math.e,
        "Rational": lambda n, d=1: n / d,
        "__builtins__": {},
    }
    safe_ns.update(local_vars)
    try:
        val = eval(expr_str, {"__builtins__": {}}, safe_ns)  # noqa: S307
        return float(val)
    except Exception:
        return None


def _preprocess_trig(expr_str: str) -> str:
    """
    Convert degree-argument trig calls like sin(30°) or cos(30 deg)
    into sin(pi/180 * 30) so sympy / eval treat them as degrees.
    """
    deg_pat = re.compile(r"(\d+\.?\d*)\s*°")
    expr_str = deg_pat.sub(r"\1", expr_str)

    trig_pat = re.compile(
        r'\b(sin|cos|tan|asin|acos|atan|sinh|cosh|tanh)\(([^)]+)\)'
    )

    def _replace(m: re.Match) -> str:
        func, arg = m.group(1), m.group(2)
        # Wrap numeric-looking argument in radians conversion
        try:
            float(arg.strip())
            return f"{func}(pi/180*{arg.strip()})"
        except ValueError:
            return m.group(0)

    return trig_pat.sub(_replace, expr_str)


def _split_eq(equation: str) -> tuple[str, str]:
    """Split 'lhs = rhs' into (lhs, rhs).  Defaults to rhs='0'."""
    if "=" in equation:
        parts = equation.split("=", 1)
        return parts[0].strip(), parts[1].strip()
    return equation.strip(), "0"


def _to_num(v: Any) -> Any:
    """Coerce str inputs like '30', '0.5' to float."""
    if isinstance(v, str):
        try:
            return float(v)
        except (ValueError, TypeError):
            return v
    return v


def _round(val: float, decimals: int = 4) -> float:
    return round(val + 1e-12, decimals)


# ── Solver class ─────────────────────────────────────────────────────────────

class SymbolicSolver:
    """
    Multi-concept solver dispatching to:
      physics_formula → solve_physics
      sympy           → solve_equation / solve_system / differentiate / integrate
      numerical       → Newton-Raphson root-finding
      claude_reasoning→ passthrough
      generic         → best-effort fallback
    """

    # ── Physics formula database ────────────────────────────────────────────

    PHYSICS: dict[str, dict[str, dict[str, Any]]] = {
        "mechanics": {
            "F": {
                "formula": sp.sympify("m * a"),
                "vars": ["m", "a"],
                "units": "N",
            },
            "a": {
                "formula": sp.sympify("g * (sin(theta) - mu * cos(theta))"),
                "vars": ["g", "theta", "mu"],
                "units": "m/s²",
            },
            "a_incline": {
                "formula": sp.sympify("g * (sin(theta) - mu * cos(theta))"),
                "vars": ["g", "theta", "mu"],
                "units": "m/s²",
            },
            "F_incline": {
                "formula": sp.sympify("m * g * (sin(theta) - mu * cos(theta))"),
                "vars": ["m", "g", "theta", "mu"],
                "units": "N",
            },
            "v": {
                "formula": sp.sympify("u + a * t"),
                "vars": ["u", "a", "t"],
                "units": "m/s",
            },
            "s": {
                "formula": sp.sympify("u * t + Rational(1,2) * a * t**2"),
                "vars": ["u", "t", "a"],
                "units": "m",
            },
            "s_v": {
                "formula": sp.sympify("(v**2 - u**2) / (2 * a)"),
                "vars": ["v", "u", "a"],
                "units": "m",
            },
            "p": {
                "formula": sp.sympify("m * v"),
                "vars": ["m", "v"],
                "units": "kg·m/s",
            },
            "p_cons": {
                "formula": sp.sympify("m1 * u1 + m2 * u2"),
                "vars": ["m1", "u1", "m2", "u2"],
                "units": "kg·m/s",
            },
        },
        "energy": {
            "KE": {
                "formula": sp.sympify("Rational(1,2) * m * v**2"),
                "vars": ["m", "v"],
                "units": "J",
            },
            "PE": {
                "formula": sp.sympify("m * g * h"),
                "vars": ["m", "g", "h"],
                "units": "J",
            },
            "W": {
                "formula": sp.sympify("F * d"),
                "vars": ["F", "d"],
                "units": "J",
            },
            "E_cons": {
                "formula": sp.sympify("KE + PE"),
                "vars": ["KE", "PE"],
                "units": "J",
            },
            "P": {
                "formula": sp.sympify("m * g * h / t"),
                "vars": ["m", "g", "h", "t"],
                "units": "W",
            },
        },
        "circular": {
            "a": {
                "formula": sp.sympify("v**2 / r"),
                "vars": ["v", "r"],
                "units": "m/s²",
            },
            "F_c": {
                "formula": sp.sympify("m * v**2 / r"),
                "vars": ["m", "v", "r"],
                "units": "N",
            },
            "T": {
                "formula": sp.sympify("2 * pi * r / v"),
                "vars": ["r", "v"],
                "units": "s",
            },
            "v": {
                "formula": sp.sympify("2 * pi * r / T"),
                "vars": ["r", "T"],
                "units": "m/s",
            },
        },
        "gravitation": {
            "F": {
                "formula": sp.sympify("G * m1 * m2 / r**2"),
                "vars": ["G", "m1", "m2", "r"],
                "units": "N",
            },
            "g_planet": {
                "formula": sp.sympify("G * M / r**2"),
                "vars": ["G", "M", "r"],
                "units": "m/s²",
            },
        },
        "electrostatics": {
            "F": {
                "formula": sp.sympify("k * q1 * q2 / r**2"),
                "vars": ["k", "q1", "q2", "r"],
                "units": "N",
            },
            "E": {
                "formula": sp.sympify("k * q / r**2"),
                "vars": ["k", "q", "r"],
                "units": "N/C",
            },
            "V": {
                "formula": sp.sympify("k * q / r"),
                "vars": ["k", "q", "r"],
                "units": "V",
            },
        },
        "current": {
            "V": {
                "formula": sp.sympify("I * R"),
                "vars": ["I", "R"],
                "units": "V",
            },
            "P": {
                "formula": sp.sympify("V * I"),
                "vars": ["V", "I"],
                "units": "W",
            },
            "R_ohm": {
                "formula": sp.sympify("rho * L / A"),
                "vars": ["rho", "L", "A"],
                "units": "Ω",
            },
            "P_R": {
                "formula": sp.sympify("I**2 * R"),
                "vars": ["I", "R"],
                "units": "W",
            },
        },
        "magnetism": {
            "F": {
                "formula": sp.sympify("q * v * B"),
                "vars": ["q", "v", "B"],
                "units": "N",
            },
            "r": {
                "formula": sp.sympify("m * v / (q * B)"),
                "vars": ["m", "v", "q", "B"],
                "units": "m",
            },
            "T": {
                "formula": sp.sympify("2 * pi * m / (q * B)"),
                "vars": ["m", "q", "B"],
                "units": "s",
            },
        },
        "optics": {
            "v": {
                "formula": sp.sympify("f * u / (u - f)"),
                "vars": ["f", "u"],
                "units": "m",
            },
            "m": {
                "formula": sp.sympify("-v / u"),
                "vars": ["v", "u"],
                "units": "",
            },
            "f": {
                "formula": sp.sympify("u * v / (u + v)"),
                "vars": ["u", "v"],
                "units": "m",
            },
        },
        "shm": {
            "T_mass": {
                "formula": sp.sympify("2 * pi * sqrt(m / k)"),
                "vars": ["m", "k"],
                "units": "s",
            },
            "T_pendulum": {
                "formula": sp.sympify("2 * pi * sqrt(L / g)"),
                "vars": ["L", "g"],
                "units": "s",
            },
            "freq": {
                "formula": sp.sympify("1 / (2 * pi) * sqrt(k / m)"),
                "vars": ["k", "m"],
                "units": "Hz",
            },
        },
        "waves": {
            "v": {
                "formula": sp.sympify("f * lam"),
                "vars": ["f", "lam"],
                "units": "m/s",
            },
            "v_string": {
                "formula": sp.sympify("sqrt(T / mu)"),
                "vars": ["T", "mu"],
                "units": "m/s",
            },
            "lam": {
                "formula": sp.sympify("v / f"),
                "vars": ["v", "f"],
                "units": "m",
            },
        },
        "thermodynamics": {
            "P_ideal": {
                "formula": sp.sympify("n * R * T / V"),
                "vars": ["n", "R", "T", "V"],
                "units": "Pa",
            },
            "Q": {
                "formula": sp.sympify("m * C * dT"),
                "vars": ["m", "C", "dT"],
                "units": "J",
            },
            "efficiency": {
                "formula": sp.sympify("1 - T2 / T1"),
                "vars": ["T1", "T2"],
                "units": "",
            },
        },
        "modern": {
            "E": {
                "formula": sp.sympify("h * f"),
                "vars": ["h", "f"],
                "units": "J",
            },
            "lam_p": {
                "formula": sp.sympify("h / p"),
                "vars": ["h", "p"],
                "units": "m",
            },
            "KE_photo": {
                "formula": sp.sympify("h * f - phi"),
                "vars": ["h", "f", "phi"],
                "units": "J",
            },
        },
    }

    # Mapping: output quantity → candidate formula keys per concept category
    FORMULA_KEYS: dict[str, dict[str, list[str]]] = {
        "mechanics": {
            "a": ["a", "a_incline", "F_incline"],
            "F": ["F", "F_incline"],
            "v": ["v"],
            "s": ["s", "s_v"],
            "u": ["s", "s_v"],
            "p": ["p", "p_cons"],
        },
        "energy": {
            "KE": ["KE"],
            "PE": ["PE"],
            "W": ["W"],
            "P": ["P"],
        },
        "circular": {
            "a": ["a"],
            "F_c": ["F_c"],
            "T": ["T"],
            "v": ["v"],
        },
        "gravitation": {
            "F": ["F"],
            "g_planet": ["g_planet"],
        },
        "electrostatics": {
            "F": ["F"],
            "E": ["E"],
            "V": ["V"],
        },
        "current": {
            "V": ["V"],
            "P": ["P", "P_R"],
            "R": ["R_ohm"],
        },
        "magnetism": {
            "F": ["F"],
            "r": ["r"],
            "T": ["T"],
        },
        "optics": {
            "v": ["v"],
            "m": ["m"],
            "f": ["f"],
        },
        "shm": {
            "T": ["T_mass", "T_pendulum"],
            "freq": ["freq"],
        },
        "waves": {
            "v": ["v", "v_string"],
            "lam": ["lam"],
        },
        "thermodynamics": {
            "P": ["P_ideal"],
            "Q": ["Q"],
            "efficiency": ["efficiency"],
        },
        "modern": {
            "E": ["E"],
            "lam_p": ["lam_p"],
            "KE_photo": ["KE_photo"],
        },
    }

    # ── Public dispatch ────────────────────────────────────────────────────

    def solve_sub_problem(self, sub_problem: dict) -> SolverResult:
        """
        Read solver_type and dispatch to the right method.

        Handles both key naming conventions:
        - Decomposition engine: sub_problem_id, output_symbol, solver_type
        - Original format: id, output, solver_type
        """
        sp_id: str = sub_problem.get("sub_problem_id") or sub_problem.get("id", "")
        stype: str = sub_problem.get("solver_type", "generic")

        # Normalize key names — handle both conventions
        inputs = sub_problem.get("inputs", {})
        output_symbol = sub_problem.get("output_symbol") or sub_problem.get("output", "")
        concept = sub_problem.get("concept", "mechanics")
        strategy = sub_problem.get("strategy", "")
        description = sub_problem.get("description", "")

        try:
            if stype == "physics_formula":
                return self.solve_physics(
                    inputs=inputs,
                    output_symbol=output_symbol,
                    concept=concept,
                    sub_problem_id=sp_id,
                )

            if stype == "sympy":
                if "system" in sub_problem:
                    return self.solve_system(
                        equations=sub_problem["system"],
                        variables=sub_problem.get("variables", []),
                        sub_problem_id=sp_id,
                    )
                if "equation" in sub_problem:
                    return self.solve_equation(
                        equation=sub_problem["equation"],
                        variable=sub_problem.get("variable", "x"),
                        sub_problem_id=sp_id,
                    )
                if "diff_expr" in sub_problem:
                    return self.differentiate(
                        expression=sub_problem["diff_expr"],
                        variable=sub_problem.get("diff_var", "x"),
                        sub_problem_id=sp_id,
                    )
                if "int_expr" in sub_problem:
                    return self.integrate(
                        expression=sub_problem["int_expr"],
                        variable=sub_problem.get("int_var", "x"),
                        limits=sub_problem.get("limits"),
                        sub_problem_id=sp_id,
                    )
                if "expression" in sub_problem:
                    return self._eval_expression(
                        sub_problem["expression"],
                        sub_problem.get("variables", {}),
                        sp_id,
                    )
                # Fallback: try to solve from inputs + output_symbol
                if inputs and output_symbol:
                    return self.solve_physics(
                        inputs=inputs,
                        output_symbol=output_symbol,
                        concept=concept,
                        sub_problem_id=sp_id,
                    )
                return SolverResult(
                    sub_problem_id=sp_id,
                    success=False,
                    error="No equation/expression provided for sympy solver.",
                )

            if stype == "numerical":
                eqn = sub_problem.get("equation", sub_problem.get("query", ""))
                var = sub_problem.get("variable", sub_problem.get("variables", ["x"])[0]
                                      if sub_problem.get("variables") else "x")
                return self.solve_numerical(
                    equation=eqn,
                    variable=var,
                    sub_problem_id=sp_id,
                )

            if stype == "claude_reasoning":
                return SolverResult(
                    sub_problem_id=sp_id,
                    success=False,
                    error="Claude reasoning fallback: please solve manually.",
                )

            if stype == "generic":
                # Try physics first if concept looks like physics
                if concept in ["mechanics", "energy", "momentum", "kinematics",
                               "electromagnetism", "optics", "thermodynamics",
                               "modern_physics", "projectile", "equilibrium",
                               "waves", "shm", "gravitation", "rotation"]:
                    return self.solve_physics(
                        inputs=inputs,
                        output_symbol=output_symbol,
                        concept=concept,
                        sub_problem_id=sp_id,
                    )
                return self._generic_solve(sub_problem, sp_id)

            return SolverResult(
                sub_problem_id=sp_id,
                success=False,
                error=f"Unknown solver_type: '{stype}'",
            )

        except Exception as exc:  # noqa: BLE001
            return SolverResult(
                sub_problem_id=sp_id,
                success=False,
                error=f"Unhandled exception: {exc}",
            )

    # ── Physics formula solver ─────────────────────────────────────────────

    # Input key aliases — maps common input names to formula variable names
    INPUT_ALIASES: dict[str, list[str]] = {
        "m": ["mass", "m", "M"],
        "theta": ["angle", "theta", "θ", "inclination", "alpha"],
        "mu": ["friction", "mu", "coefficient_of_friction", "μ", "coeff_friction"],
        "g": ["g", "gravity", "acceleration_due_to_gravity"],
        "v": ["velocity", "v", "final_velocity", "speed"],
        "u": ["initial_velocity", "u", "v0", "v_initial"],
        "a": ["acceleration", "a", "acc"],
        "t": ["time", "t", "duration"],
        "s": ["distance", "displacement", "s", "x"],
        "h": ["height", "h", "altitude"],
        "F": ["force", "F", "net_force"],
        "q": ["charge", "q", "Q"],
        "r": ["radius", "r", "R", "distance_r"],
        "k": ["k", "coulomb_constant", "ke"],
        "E": ["electric_field", "E", "field"],
        "V": ["voltage", "potential", "V", "emf"],
        "I": ["current", "I", "i"],
        "R_ohm": ["resistance", "R", "ohms"],
        "rho": ["resistivity", "rho", "ρ"],
        "L": ["length", "L", "l"],
        "A": ["area", "A", "cross_section"],
        "n": ["moles", "n", "N_moles"],
        "P": ["pressure", "P", "power"],
        "T": ["temperature", "T", "period", "time_period"],
        "f": ["frequency", "f", "freq", "focal_length"],
        "lam": ["wavelength", "lam", "lambda", "λ"],
        "k_spring": ["spring_constant", "k_spring", "k"],
        "phi": ["work_function", "phi", "Φ"],
        "KE": ["kinetic_energy", "KE"],
        "PE": ["potential_energy", "PE"],
        "m1": ["mass1", "m1", "M1"],
        "m2": ["mass2", "m2", "M2"],
        "v1": ["velocity1", "v1", "u1"],
        "v2": ["velocity2", "v2", "u2"],
    }

    def _normalize_inputs(self, inputs: dict, req_vars: list[str]) -> dict:
        """Map input keys to formula variable names using aliases."""
        normalized = {}
        # Build reverse lookup: input_name -> formula_var
        # First pass: exact case matches (higher priority)
        reverse_exact = {}
        reverse_lower = {}
        for formula_var, aliases in self.INPUT_ALIASES.items():
            for alias in aliases:
                # Exact case match gets priority
                reverse_exact[alias] = formula_var
                # Lowercase fallback
                reverse_lower.setdefault(alias.lower(), formula_var)

        for key, val in inputs.items():
            key_str = str(key).strip()
            # Try exact match first
            formula_var = reverse_exact.get(key_str)
            if not formula_var:
                # Try lowercase
                formula_var = reverse_lower.get(key_str.lower())
            if formula_var:
                normalized[formula_var] = val
            else:
                # Keep original key if no alias found
                normalized[key] = val

        return normalized

    def solve_physics(
        self,
        inputs: dict[str, Any],
        output_symbol: str,
        concept: str = "mechanics",
        sub_problem_id: str = "",
    ) -> SolverResult:
        steps: list[str] = [f"Concept: {concept}", f"Output requested: {output_symbol}"]

        cat_key = concept.strip().lower().replace(" ", "").replace("-", "")

        if cat_key not in self.PHYSICS:
            aliases = {
                "motion": "mechanics", "force": "mechanics", "newton": "mechanics",
                "kinematics": "mechanics", "dynamics": "mechanics",
                "em": "electrostatics", "emwaves": "optics",
                "modernphysics": "modern",
            }
            cat_key = aliases.get(cat_key, cat_key)
            if cat_key not in self.PHYSICS:
                return SolverResult(
                    sub_problem_id=sub_problem_id,
                    success=False,
                    error=f"Unknown physics concept: '{concept}'. "
                          f"Available: {list(self.PHYSICS.keys())}",
                    steps=steps,
                )

        cat = self.PHYSICS[cat_key]
        keys_map = self.FORMULA_KEYS.get(cat_key, {})

        # Normalize output symbol
        output_aliases = {
            "acceleration": "a", "acc": "a",
            "velocity": "v", "speed": "v",
            "force": "F", "net_force": "F",
            "time": "t", "period": "T",
            "distance": "s", "displacement": "s",
            "energy": "KE", "kinetic_energy": "KE",
            "wavelength": "lam", "lambda": "lam",
        }
        if output_symbol in output_aliases:
            output_symbol = output_aliases[output_symbol]

        # Normalize input keys BEFORE formula selection
        # Collect all possible formula vars for this category
        all_formula_vars = set()
        for entry in cat.values():
            all_formula_vars.update(entry["vars"])
        inputs = self._normalize_inputs(inputs, list(all_formula_vars))
        steps.append(f"Normalized inputs: {inputs}")

        # Choose formula
        if output_symbol and output_symbol in keys_map:
            candidates = keys_map[output_symbol]
            formula_entry = self._pick_formula(candidates, cat, inputs)
        else:
            formula_entry = self._infer_formula(cat, inputs)
            if formula_entry:
                output_symbol = next(iter(formula_entry))

        if not formula_entry:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error=f"No physics formula found for '{output_symbol}' "
                      f"in '{concept}' with inputs: {list(inputs.keys())}",
                steps=steps,
            )

        formula = formula_entry["formula"]
        req_vars = formula_entry["vars"]
        units = formula_entry["units"]

        steps.append(f"Formula: {output_symbol} = {formula}")

        # Process each input variable
        processed: dict[str, float] = {}
        for var in req_vars:
            if var not in inputs:
                return SolverResult(
                    sub_problem_id=sub_problem_id,
                    success=False,
                    error=f"Missing required input: '{var}'. "
                          f"Got: {list(inputs.keys())}",
                    steps=steps,
                )
            val = _to_num(inputs[var])

            if not isinstance(val, (int, float)):
                return SolverResult(
                    sub_problem_id=sub_problem_id,
                    success=False,
                    error=f"Input '{var}' must be numeric, got: {val!r}",
                    steps=steps,
                )

            # Unit conversions
            if var in ("theta", "angle"):
                val = math.radians(val)
                steps.append(f"  {var} = {inputs[var]}° = {val:.6f} rad")
            if var == "g":
                if val == 0 or val is None:
                    val = 9.8
                    steps.append("  g not provided, using 9.8 m/s²")
                elif isinstance(inputs.get(var), str) and "moon" in inputs[var].lower():
                    val = 1.62
                    steps.append("  Using Moon gravity: g = 1.62 m/s²")
            processed[var] = val

        # Sympy substitution and evaluation
        syms = {sp.Symbol(v): processed[v] for v in req_vars}
        try:
            result_expr = formula.subs(syms)
            result_val = float(result_expr.evalf())
        except Exception as exc:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error=f"Evaluation failed: {exc}",
                steps=steps,
            )

        # Format substitution step
        sub_strs = []
        for var in req_vars:
            v = processed[var]
            if var in ("theta", "angle"):
                sub_strs.append(f"{var}={inputs[var]}°")
            else:
                sub_strs.append(f"{var}={v}")
        steps.append(f"Substituting: {'; '.join(sub_strs)}")

        # Build display strings
        if SYMPY_AVAILABLE:
            display = formula.subs({sp.Symbol(v): sp.Float(processed[v]) for v in req_vars})
            steps.append(f"Expression: {output_symbol} = {display}")
            try:
                steps.append(f"Calculated: {output_symbol} = {float(display.evalf()):.4f}")
            except Exception:
                steps.append(f"Calculated: {output_symbol} ≈ {result_val:.4f}")

        if math.isnan(result_val) or math.isinf(result_val):
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error=f"Result is undefined (NaN/Inf): {result_val}",
                steps=steps,
            )

        steps.append(f"Answer: {output_symbol} = {_round(result_val)} {units}".strip())
        return SolverResult(
            sub_problem_id=sub_problem_id,
            success=True,
            symbolic_result=(
                f"{output_symbol} = {result_expr}" if SYMPY_AVAILABLE
                else f"{output_symbol} = {result_val:.6f}"
            ),
            numerical_result=_round(result_val),
            steps=steps,
            units=units,
        )

    def _pick_formula(
        self, candidates: list[str], cat: dict[str, Any], inputs: dict
    ) -> dict[str, Any] | None:
        """Return first candidate whose vars are all present in inputs."""
        for key in candidates:
            if key in cat and all(v in inputs for v in cat[key]["vars"]):
                return cat[key]
        return None

    def _infer_formula(
        self, cat: dict[str, Any], inputs: dict
    ) -> dict[str, Any] | None:
        """Find any formula whose vars are all in inputs."""
        for entry in cat.values():
            if all(v in inputs for v in entry["vars"]):
                return entry
        return None

    # ── Equation solver ─────────────────────────────────────────────────────

    def solve_equation(
        self,
        equation: str,
        variable: str,
        sub_problem_id: str = "",
    ) -> SolverResult:
        if not SYMPY_AVAILABLE:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error="SymPy is required for symbolic equation solving.",
            )

        steps: list[str] = [f"Equation: {equation}", f"Solving for: {variable}"]
        var = sp.Symbol(variable)

        lhs_str, rhs_str = _split_eq(equation)
        lhs_str = _preprocess_trig(lhs_str)
        rhs_str = _preprocess_trig(rhs_str)

        try:
            lhs = parse_expr(lhs_str, transformations=_tf, evaluate=True)
            rhs = parse_expr(rhs_str, transformations=_tf, evaluate=True)
            eq = sp.Eq(lhs, rhs)
        except Exception as exc:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error=f"Could not parse equation: {exc}",
                steps=steps,
            )

        steps.append(f"Parsed: {lhs} = {rhs}")

        try:
            raw_sols = solve(eq, var, dict=True)
        except Exception as exc:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error=f"SymPy solve failed: {exc}",
                steps=steps,
            )

        if not raw_sols:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error="No solution found.",
                steps=steps,
            )

        # Extract real solutions
        sol_dict = raw_sols[0] if isinstance(raw_sols, list) else raw_sols
        sym_sol = sol_dict.get(var, list(sol_dict.values())[0])
        steps.append(f"Symbolic solution: {var} = {sym_sol}")

        num_sols = [complex(s.evalf()) for s in sp.solve(eq, var)]
        real_sols = sorted(
            {s.real for s in num_sols if abs(s.imag) < 1e-10},
            key=abs,
        )

        if not real_sols:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error="No real solutions.",
                symbolic_result=str(sym_sol),
                steps=steps,
            )

        best = real_sols[0]
        if len(real_sols) > 1:
            # For quadratics prefer positive root
            pos = [s for s in real_sols if s > 0]
            if pos:
                best = pos[0]
            steps.append(f"Multiple real solutions: {real_sols}")

        result = _round(float(best))
        steps.append(f"Numerical: {var} = {result}")
        return SolverResult(
            sub_problem_id=sub_problem_id,
            success=True,
            symbolic_result=str(sym_sol),
            numerical_result=result,
            steps=steps,
        )

    # ── System of equations ─────────────────────────────────────────────────

    def solve_system(
        self,
        equations: list[str],
        variables: list[str],
        sub_problem_id: str = "",
    ) -> SolverResult:
        if not SYMPY_AVAILABLE:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error="SymPy is required for system solving.",
            )

        steps: list[str] = [f"System of {len(equations)} equations, "
                            f"variables: {variables}"]
        syms = sp.symbols(" ".join(variables))

        sym_eqs = []
        for eq_str in equations:
            lhs_s, rhs_s = _split_eq(eq_str)
            lhs_s = _preprocess_trig(lhs_s)
            rhs_s = _preprocess_trig(rhs_s)
            try:
                lhs = parse_expr(lhs_s, transformations=_tf, evaluate=True)
                rhs = parse_expr(rhs_s, transformations=_tf, evaluate=True)
                sym_eqs.append(sp.Eq(lhs, rhs))
                steps.append(f"  {lhs} = {rhs}")
            except Exception as exc:
                return SolverResult(
                    sub_problem_id=sub_problem_id,
                    success=False,
                    error=f"Parse error: {exc}",
                    steps=steps,
                )

        try:
            sol = solve(sym_eqs, syms, dict=True)
        except Exception as exc:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error=f"System solve failed: {exc}",
                steps=steps,
            )

        if not sol:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error="No solution for the system.",
                steps=steps,
            )

        sol_dict = sol[0] if isinstance(sol, list) else sol
        sym_strs = [f"{str(k)} = {v}" for k, v in sol_dict.items()]
        steps.append("Solutions: " + "; ".join(sym_strs))

        nums = {
            str(k): _round(float(v.evalf()))
            for k, v in sol_dict.items()
            if v.is_real
        }
        num_strs = [f"{k} = {v}" for k, v in nums.items()]
        steps.append("Numerical: " + "; ".join(num_strs))

        return SolverResult(
            sub_problem_id=sub_problem_id,
            success=True,
            symbolic_result=", ".join(sym_strs),
            numerical_result=next(iter(nums.values()), None) if nums else None,
            steps=steps,
        )

    # ── Differentiation ─────────────────────────────────────────────────────

    def differentiate(
        self,
        expression: str,
        variable: str,
        sub_problem_id: str = "",
        order: int = 1,
    ) -> SolverResult:
        if not SYMPY_AVAILABLE:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error="SymPy is required for differentiation.",
            )

        steps: list[str] = [f"d/d{order}({expression}) wrt {variable}"]
        var = sp.Symbol(variable)

        try:
            expr = parse_expr(
                _preprocess_trig(expression),
                transformations=_tf,
                evaluate=True,
            )
        except Exception as exc:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error=f"Parse error: {exc}",
                steps=steps,
            )

        steps.append(f"Expression: {expr}")
        deriv = sp.diff(expr, var, order)
        steps.append(f"Derivative: d{order}/d{variable} = {deriv}")

        try:
            num = _round(float(deriv.evalf()))
            steps.append(f"Numerical: {num}")
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=True,
                symbolic_result=str(deriv),
                numerical_result=num,
                steps=steps,
            )
        except Exception:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=True,
                symbolic_result=str(deriv),
                steps=steps,
            )

    # ── Integration ─────────────────────────────────────────────────────────

    def integrate(
        self,
        expression: str,
        variable: str,
        limits: tuple[float, float] | None = None,
        sub_problem_id: str = "",
    ) -> SolverResult:
        if not SYMPY_AVAILABLE:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error="SymPy is required for integration.",
            )

        steps: list[str] = [f"∫ {expression} d{variable}"]
        if limits:
            steps.append(f"Limits: {limits[0]} to {limits[1]}")

        var = sp.Symbol(variable)
        try:
            expr = parse_expr(
                _preprocess_trig(expression),
                transformations=_tf,
                evaluate=True,
            )
        except Exception as exc:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error=f"Parse error: {exc}",
                steps=steps,
            )

        steps.append(f"Integrand: {expr}")

        try:
            if limits:
                result = sp.integrate(expr, (var, limits[0], limits[1]))
                steps.append(f"Integral: {result}")
                num = _round(float(result.evalf()))
                steps.append(f"Value: {num}")
                return SolverResult(
                    sub_problem_id=sub_problem_id,
                    success=True,
                    symbolic_result=str(result),
                    numerical_result=num,
                    steps=steps,
                )
            else:
                result = sp.integrate(expr, var)
                steps.append(f"Antiderivative: {result} + C")
                return SolverResult(
                    sub_problem_id=sub_problem_id,
                    success=True,
                    symbolic_result=f"{result} + C",
                    steps=steps,
                )
        except Exception as exc:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error=f"Integration failed: {exc}",
                steps=steps,
            )

    # ── Chemistry solver ────────────────────────────────────────────────────

    def solve_chemistry(
        self,
        reaction: str,
        known: dict[str, float],
        sub_problem_id: str = "",
    ) -> SolverResult:
        steps: list[str] = [f"Reaction: {reaction}"]
        parts = reaction.split("→")
        if len(parts) != 2:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error="Invalid reaction format. Use: 'reactants → products'",
                steps=steps,
            )

        reactants = [s.strip() for s in parts[0].split("+")]
        products = [s.strip() for s in parts[1].split("+")]
        steps.append(f"Reactants: {reactants}")
        steps.append(f"Products:  {products}")

        # Simple atom-based balancer (skips polyatomics with parens)
        def count_atoms(formula: str) -> dict[str, int]:
            counts: dict[str, int] = {}
            for mol in formula.split("+"):
                mol = mol.strip()
                # Handle parentheses: e.g., Al2(SO4)3
                paren = re.findall(r"\(([A-Za-z0-9]+)\)(\d*)", mol)
                base = re.sub(r"\([^)]+\)\d*", "", mol)
                tokens = re.findall(r"([A-Z][a-z]?)(\d*)", base)
                for elem, n in tokens:
                    counts[elem] = counts.get(elem, 0) + (int(n) if n else 1)
                for grp, mult in paren:
                    n = int(mult) if mult else 1
                    sub = re.findall(r"([A-Z][a-z]?)(\d*)", grp)
                    for elem, s in sub:
                        counts[elem] = counts.get(elem, 0) + n * (int(s) if s else 1)
            return counts

        try:
            r_counts = count_atoms(parts[0])
            p_counts = count_atoms(parts[1])
        except Exception as exc:
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=False,
                error=f"Atom counting failed: {exc}",
                steps=steps,
            )

        if r_counts == p_counts:
            steps.append("Equation is already balanced.")
        else:
            steps.append("Note: Automatic stoichiometric balancing is approximate "
                         "for complex equations.")

        steps.append(f"Atom counts (reactants): {r_counts}")
        steps.append(f"Atom counts (products):  {p_counts}")

        # Basic stoichiometry
        if "mass" in known and "molar_mass" in known:
            moles = known["mass"] / known["molar_mass"]
            steps.append(f"Moles = mass / molar_mass = {known['mass']} / "
                         f"{known['molar_mass']} = {_round(moles)} mol")
        elif "moles" in known:
            moles = known["moles"]
            steps.append(f"Moles given: {moles}")

        if "moles" in known and "volume" in known:
            conc = known["moles"] / known["volume"]
            steps.append(f"Concentration = moles / volume = "
                         f"{known['moles']} / {known['volume']} = "
                         f"{_round(conc)} mol/L")

        return SolverResult(
            sub_problem_id=sub_problem_id,
            success=True,
            steps=steps,
        )

    # ── Numerical (Newton-Raphson) ─────────────────────────────────────────

    def solve_numerical(
        self,
        equation: str,
        variable: str,
        initial_guess: float = 1.0,
        sub_problem_id: str = "",
        tol: float = 1e-9,
        max_iter: int = 200,
    ) -> SolverResult:
        steps: list[str] = [
            f"Newton-Raphson: f({variable}) = {equation} = 0",
            f"Initial guess: {initial_guess}",
        ]

        def f(x: float) -> float:
            try:
                return _safe_eval(  # type: ignore[arg-type]
                    equation.replace(variable, str(x)),
                    {variable: x},
                ) or 0.0
            except Exception:
                return 0.0

        def df(x: float) -> float:
            h = 1e-8
            return (f(x + h) - f(x - h)) / (2 * h)

        xn = initial_guess
        for i in range(max_iter):
            fx = f(xn)
            dfx = df(xn)
            if abs(dfx) < 1e-14:
                return SolverResult(
                    sub_problem_id=sub_problem_id,
                    success=False,
                    error=f"Derivative near zero at x={_round(xn)}. "
                          f"Try a different initial guess.",
                    steps=steps,
                )
            xn1 = xn - fx / dfx
            steps.append(
                f"Iteration {i+1}: x={_round(xn1)}, "
                f"f(x)={_round(f(xn1))}, "
                f"Δ={_round(abs(xn1 - xn))}"
            )
            if abs(xn1 - xn) < tol:
                steps.append(f"Converged in {i+1} iterations.")
                return SolverResult(
                    sub_problem_id=sub_problem_id,
                    success=True,
                    numerical_result=_round(xn1),
                    steps=steps,
                )
            xn = xn1

        return SolverResult(
            sub_problem_id=sub_problem_id,
            success=True,
            numerical_result=_round(xn),
            steps=steps + [f"Stopped at max iterations ({max_iter})."],
        )

    # ── Expression evaluator ────────────────────────────────────────────────

    def _eval_expression(
        self,
        expression: str,
        variables: dict[str, Any],
        sub_problem_id: str = "",
    ) -> SolverResult:
        steps: list[str] = [f"Evaluating: {expression}"]

        if SYMPY_AVAILABLE:
            try:
                expr = parse_expr(
                    _preprocess_trig(expression),
                    transformations=_tf,
                    evaluate=True,
                )
                steps.append(f"Parsed: {expr}")
                val = float(expr.evalf(subs={sp.Symbol(k): _to_num(v)
                                             for k, v in variables.items()}))
                steps.append(f"Result: {_round(val)}")
                return SolverResult(
                    sub_problem_id=sub_problem_id,
                    success=True,
                    symbolic_result=str(expr),
                    numerical_result=_round(val),
                    steps=steps,
                )
            except Exception:
                pass

        result = _safe_eval(expression, {k: _to_num(v) for k, v in variables.items()})
        if result is not None:
            steps.append(f"Result: {_round(result)}")
            return SolverResult(
                sub_problem_id=sub_problem_id,
                success=True,
                numerical_result=_round(result),
                steps=steps,
            )

        return SolverResult(
            sub_problem_id=sub_problem_id,
            success=False,
            error=f"Cannot evaluate: {expression}",
            steps=steps,
        )

    # ── Generic fallback ────────────────────────────────────────────────────

    def _generic_solve(
        self, sub_problem: dict, sub_problem_id: str
    ) -> SolverResult:
        steps: list[str] = ["Generic solver — attempting best-effort parse."]

        if "equation" in sub_problem:
            return self.solve_equation(
                sub_problem["equation"],
                sub_problem.get("variable",
                                sub_problem.get("variables", ["x"])[0]),
                sub_problem_id,
            )
        if "query" in sub_problem:
            return self._eval_expression(
                sub_problem["query"],
                sub_problem.get("variables", {}),
                sub_problem_id,
            )
        if "inputs" in sub_problem and "output" in sub_problem:
            return self.solve_physics(
                inputs=sub_problem["inputs"],
                output_symbol=sub_problem["output"],
                concept=sub_problem.get("concept", "mechanics"),
                sub_problem_id=sub_problem_id,
            )
        if "reaction" in sub_problem:
            return self.solve_chemistry(
                reaction=sub_problem["reaction"],
                known=sub_problem.get("known", {}),
                sub_problem_id=sub_problem_id,
            )
        if "expression" in sub_problem:
            return self._eval_expression(
                sub_problem["expression"],
                sub_problem.get("variables", {}),
                sub_problem_id,
            )

        return SolverResult(
            sub_problem_id=sub_problem_id,
            success=False,
            error="Generic solver has no usable input.",
            steps=steps,
        )

    # ── Capability report ───────────────────────────────────────────────────

    def capabilities(self) -> dict[str, Any]:
        return {
            "sympy_available": SYMPY_AVAILABLE,
            "physics_concepts": list(self.PHYSICS.keys()),
            "supported_solver_types": [
                "physics_formula", "sympy", "numerical",
                "claude_reasoning", "generic",
            ],
            "physics_formula_count": sum(
                len(v) for v in self.PHYSICS.values()
            ),
        }


# ── Quick demonstration ─────────────────────────────────────────────────────

if __name__ == "__main__":
    solver = SymbolicSolver()
    print("=== Capabilities ===")
    for k, v in solver.capabilities().items():
        print(f"  {k}: {v}")

    def run(label: str, sub: dict) -> None:
        print(f"\n--- {label} ---")
        print(solver.solve_sub_problem(sub))

    # 1) Physics – inclined plane
    run("Inclined plane acceleration", {
        "id": "p1",
        "solver_type": "physics_formula",
        "inputs": {"mass": 2, "angle": 30, "friction": 0.5, "g": 10},
        "output": "a",
        "concept": "mechanics",
    })

    # 2) Physics – kinetic energy
    run("Kinetic energy", {
        "id": "p2",
        "solver_type": "physics_formula",
        "inputs": {"m": 5, "v": 10},
        "output": "KE",
        "concept": "energy",
    })

    # 3) Symbolic equation
    run("Linear equation", {
        "id": "e1",
        "solver_type": "sympy",
        "equation": "x + 5 = 10",
        "variable": "x",
    })

    # 4) Trigonometric equation
    run("Trig equation", {
        "id": "e2",
        "solver_type": "sympy",
        "equation": "sin(x) = 0.5",
        "variable": "x",
    })

    # 5) System of equations
    run("Linear system", {
        "id": "s1",
        "solver_type": "sympy",
        "system": ["x + y = 10", "x - y = 2"],
        "variables": ["x", "y"],
    })

    # 6) Differentiation
    run("Differentiation", {
        "id": "d1",
        "solver_type": "sympy",
        "diff_expr": "x**3 + 2*x",
        "diff_var": "x",
    })

    # 7) Definite integration
    run("Definite integral", {
        "id": "i1",
        "solver_type": "sympy",
        "int_expr": "x**2",
        "int_var": "x",
        "limits": (0, 3),
    })

    # 8) Newton-Raphson
    run("Newton-Raphson: x^2 - 4 = 0", {
        "id": "n1",
        "solver_type": "numerical",
        "equation": "x**2 - 4",
        "variable": "x",
    })

    # 9) Chemistry
    run("Chemistry", {
        "id": "c1",
        "solver_type": "generic",
        "reaction": "H2 + O2 → H2O",
        "known": {"mass": 4, "molar_mass": 2},
    })

    # 10) Gravitation
    run("Gravity on Mars", {
        "id": "p3",
        "solver_type": "physics_formula",
        "inputs": {"G": 6.67e-11, "M": 6.42e23, "r": 3.39e6},
        "output": "g_planet",
        "concept": "gravitation",
    })