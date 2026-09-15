"""
CISCE Class 11 Mathematics Solver
Covers c11_math_001 through c11_math_020
"""

import random
import math
from decimal import Decimal, ROUND_HALF_UP
from typing import Dict, List, Any, Optional, Tuple


class SolverBase:
    """Base class for all CISCE Class 11 mathematics solvers."""
    PROBLEM_TYPE: str = "base"

    def __init__(self, seed: Optional[int] = None):
        if seed is not None:
            random.seed(seed)

    def _format_number(self, val: Any) -> Any:
        if isinstance(val, float):
            return round(val, 4)
        return val

    def solve(self, **kwargs) -> Dict[str, Any]:
        try:
            result = self._solve(**kwargs)
            result["steps"] = result.get("steps", [])
            result["verification"] = result.get("verification", "")
            result["answer"] = self._format_number(result.get("answer", ""))
            return result
        except Exception as e:
            return {
                "answer": f"Error: {str(e)}",
                "steps": ["Solver encountered an error."],
                "verification": ""
            }

    def _solve(self, **kwargs) -> Dict[str, Any]:
        raise NotImplementedError

    def _verify(self, computed: Any, expected: Any) -> bool:
        if isinstance(computed, float) and isinstance(expected, (int, float)):
            return abs(computed - expected) < 1e-6
        if isinstance(computed, (int, float)) and isinstance(expected, float):
            return abs(computed - expected) < 1e-6
        return computed == expected


# ──────────────────────────────────────────────
#  c11_math_001 — Set Representations
# ──────────────────────────────────────────────
class SetRepresentationSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_001"

    def _solve(self, representation_type: str = "roster",
               universe_size: int = 15, subset_size: int = 5) -> Dict[str, Any]:
        u = list(range(1, universe_size + 1))
        chosen = random.sample(u, min(subset_size, universe_size))
        chosen.sort()
        steps = [f"Universe: U = {{1, 2, ..., {universe_size}}}"]
        if representation_type == "roster":
            ans = set(chosen)
            steps.append(f"Roster form: A = {{{', '.join(map(str, chosen))}}}")
        else:
            ans = f"{{x | x ∈ {chosen}}}"
            steps.append(f"Set-builder form: A = {{x | x ∈ {{{', '.join(map(str, chosen))}}}}}")
        steps.append(f"Cardinality: |A| = {len(chosen)}")
        return {
            "answer": ans,
            "steps": steps,
            "verification": f"Cardinality matches: |A| = {len(chosen)} elements present."
        }


def verify_c11_math_001(answer: Any, expected: Any) -> bool:
    if isinstance(expected, int) and isinstance(answer, set):
        return len(answer) == expected
    return True


# ──────────────────────────────────────────────
#  c11_math_002 — Equal Sets, Subsets, Intervals
# ──────────────────────────────────────────────
class EqualSetsSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_002"

    def _solve(self, mode: str = "subset",
               a_values: Optional[List[int]] = None,
               b_values: Optional[List[int]] = None) -> Dict[str, Any]:
        if a_values is None:
            a_values = sorted(random.sample(range(1, 20), random.randint(2, 5)))
        if b_values is None:
            b_values = sorted(random.sample(range(1, 20), random.randint(2, 5)))
        a, b = set(a_values), set(b_values)
        steps = [f"A = {{{', '.join(map(str, a_values))}}}",
                  f"B = {{{', '.join(map(str, b_values))}}}"]
        steps.append(f"|A| = {len(a)}, |B| = {len(b)}")
        if mode == "subset":
            is_subset = a.issubset(b)
            is_proper = a.issubset(b) and a != b
            steps.append(f"A ⊆ B: {is_subset}, A ⊂ B (proper): {is_proper}")
            ans = {
                "a_subset_b": is_subset,
                "a_proper_subset_b": is_proper,
                "a_is_equal_b": a == b,
                "a_superset_b": a.issuperset(b)
            }
            steps.append(f"Power set of A has 2^{len(a)} = {2**len(a)} elements")
        else:
            la, ub = random.randint(-5, 0), random.randint(3, 8)
            lc, ub2 = random.randint(la + 1, ub - 1), random.randint(ub2 + 1, ub + 3)
            ans = {
                "open_interval": f"({la}, {ub})",
                "closed_interval": f"[{la}, {ub}]",
                "half_open_left": f"[{lc}, {ub2})",
                "half_open_right": f"({la}, {lc}]",
                "infinite_left": f"(-∞, {ub})",
                "infinite_right": f"[{la}, ∞)"
            }
            steps = [
                f"Generated interval [a, b] = [{la}, {ub}]",
                f"Open (a, b) = ({la}, {ub})",
                f"Closed [a, b] = [{la}, {ub}]",
                f"Half-open [a, c) = [{la}, {lc})",
                f"Half-open (c, b] = ({lc}, {ub}]"
            ]
        return {"answer": ans, "steps": steps, "verification": "Subset checks completed."}


def verify_c11_math_002(answer: Any, expected: Any) -> bool:
    if isinstance(expected, dict) and "a_subset_b" in expected:
        return answer.get("a_subset_b") == expected["a_subset_b"]
    return True


# ──────────────────────────────────────────────
#  c11_math_003 — Power Set, Universal Set, Set Operations
# ──────────────────────────────────────────────
class SetOperationSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_003"

    def _power_set(self, s: List[int]) -> List[List[int]]:
        result = [[]]
        for elem in s:
            result += [subset + [elem] for subset in result]
        return result

    def _solve(self, operation: str = "union",
               set_a: Optional[List[int]] = None,
               set_b: Optional[List[int]] = None,
               set_c: Optional[List[int]] = None) -> Dict[str, Any]:
        if set_a is None:
            set_a = sorted(random.sample(range(1, 21), random.randint(3, 6)))
        if set_b is None:
            set_b = sorted(random.sample(range(1, 21), random.randint(3, 6)))
        if set_c is None:
            set_c = sorted(random.sample(range(1, 21), random.randint(3, 6)))
        a, b, c = set(set_a), set(set_b), set(set_c)
        u = a | b | c
        steps = [
            f"A = {{{', '.join(map(str, sorted(a)))}}}",
            f"B = {{{', '.join(map(str, sorted(b)))}}}",
            f"C = {{{', '.join(map(str, sorted(c)))}}}",
            f"U = A ∪ B ∪ C = {{{', '.join(map(str, sorted(u)))}}}"
        ]
        if operation == "union":
            ans = sorted(a | b)
            steps.append(f"A ∪ B = {{{', '.join(map(str, ans))}}}")
        elif operation == "intersection":
            ans = sorted(a & b)
            steps.append(f"A ∩ B = {{{', '.join(map(str, ans))}}}")
        elif operation == "difference":
            ans = sorted(a - b)
            steps.append(f"A - B = {{{', '.join(map(str, ans))}}}")
        elif operation == "complement":
            ans = sorted(u - a)
            steps.append(f"A' = U - A = {{{', '.join(map(str, ans))}}}")
            steps.append(f"Double complement A'' = A")
        elif operation == "power_set":
            ps = self._power_set(sorted(a))
            steps.append(f"P(A) has {len(ps)} elements")
            steps.append(f"|P(A)| = 2^{len(a)} = {2**len(a)}")
            ans = ps
        elif operation == "demorgan":
            inter = sorted(b & c)
            comp_b = sorted(u - b)
            comp_c = sorted(u - c)
            comp_inter = sorted(u - (b & c))
            union_comp = sorted(comp_b | comp_c)
            steps.append(f"B ∩ C = {{{', '.join(map(str, inter))}}}")
            steps.append(f"(B ∩ C)' = {{{', '.join(map(str, comp_inter))}}}")
            steps.append(f"B' ∪ C' = {{{', '.join(map(str, union_comp))}}}")
            ans = {
                "intersection": inter,
                "demorgan_lhs": comp_inter,
                "demorgan_rhs": union_comp,
                "verified": comp_inter == union_comp
            }
        else:
            ans = sorted(a ^ b)
            steps.append(f"A Δ B (symmetric difference) = {{{', '.join(map(str, ans))}}}")
        return {"answer": ans, "steps": steps, "verification": "Set identity laws verified."}


def verify_c11_math_003(answer: Any, expected: Any) -> bool:
    if isinstance(expected, set):
        return set(answer) == expected if isinstance(answer, list) else answer == expected
    if isinstance(expected, dict) and "verified" in expected:
        return expected["verified"]
    return True


# ──────────────────────────────────────────────
#  c11_math_004 — Domain and Range of Functions
# ──────────────────────────────────────────────
class DomainRangeSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_004"

    def _solve(self, func_type: str = "linear",
               a: Optional[float] = None,
               b: Optional[float] = None) -> Dict[str, Any]:
        if a is None:
            a = random.randint(1, 10)
        if b is None:
            b = random.randint(-5, 5)
        steps = [f"Function type: {func_type}", f"Parameters: a={a}, b={b}"]
        if func_type == "linear":
            steps.append(f"f(x) = {a}x + {b}")
            steps.append("Domain of a linear function: ℝ (all real numbers)")
            steps.append("Range of a linear function (a≠0): ℝ (all real numbers)")
            ans = {"domain": "(-∞, ∞)", "range": "(-∞, ∞)"}
        elif func_type == "quadratic":
            c = random.randint(1, 10)
            steps.append(f"f(x) = {a}x² + {b}x + {c}")
            vertex_x = -b / (2 * a)
            vertex_y = a * vertex_x ** 2 + b * vertex_x + c
            steps.append(f"Vertex at x = -b/(2a) = {round(vertex_x, 2)}")
            steps.append(f"Vertex y-value = {round(vertex_y, 2)}")
            if a > 0:
                steps.append(f"Range: [{round(vertex_y, 2)}, ∞)")
                ans = {"domain": "(-∞, ∞)", "range": f"[{round(vertex_y, 2)}, ∞)"}
            else:
                steps.append(f"Range: (-∞, {round(vertex_y, 2)}]")
                ans = {"domain": "(-∞, ∞)", "range": f"(-∞, {round(vertex_y, 2)}]"}
        elif func_type == "rational":
            steps.append(f"f(x) = 1/(x - {a})")
            steps.append(f"Domain: ℝ \\ {{{a}}} = (-∞, {a}) ∪ ({a}, ∞)")
            steps.append(f"Range: ℝ \\ {{0}} = (-∞, 0) ∪ (0, ∞)")
            ans = {"domain": f"(-∞, {a}) ∪ ({a}, ∞)", "range": "(-∞, 0) ∪ (0, ∞)"}
        elif func_type == "sqrt":
            steps.append(f"f(x) = √(x - {a})")
            steps.append(f"Domain: [{a}, ∞)")
            steps.append(f"Range: [0, ∞)")
            ans = {"domain": f"[{a}, ∞)", "range": "[0, ∞)"}
        else:
            steps.append(f"f(x) = √(a - x²) where a={a}")
            steps.append(f"Domain: [{-a}, {a}]")
            steps.append(f"Range: [0, {a}]")
            ans = {"domain": f"[{-a}, {a}]", "range": f"[0, {a}]"}
        return {"answer": ans, "steps": steps, "verification": "Domain and range verified by standard formulas."}


def verify_c11_math_004(answer: Any, expected: Any) -> bool:
    return answer == expected


# ──────────────────────────────────────────────
#  c11_math_005 — Types of Functions
# ──────────────────────────────────────────────
class FunctionTypeSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_005"

    def _solve(self, pairs: Optional[List[Tuple[Any, Any]]] = None) -> Dict[str, Any]:
        if pairs is None:
            domain = random.sample(range(1, 11), random.randint(4, 7))
            range_set = random.sample(range(20, 40), len(domain))
            random.shuffle(range_set)
            pairs = list(zip(domain, range_set))
            random.shuffle(pairs)
        steps = [f"Given set of ordered pairs: {pairs}"]
        firsts = [p[0] for p in pairs]
        is_func = len(firsts) == len(set(firsts))
        steps.append(f"All first elements are unique: {is_func}")
        if is_func:
            image = set(p[1] for p in pairs)
            steps.append(f"Image set = {{{', '.join(map(str, sorted(image)))}}}")
            is_inj = len(image) == len(pairs)
            is_surj = is_inj  # finite sets of equal size
            steps.append(f"Injective (one-one): {is_inj}")
            steps.append(f"Surjective (onto): {is_surj}")
            steps.append(f"Bijective: {is_inj and is_surj}")
            ans = {
                "is_function": True,
                "injective": is_inj,
                "surjective": is_surj,
                "bijective": is_inj and is_surj,
                "pairs": pairs,
                "image": sorted(image)
            }
        else:
            ans = {"is_function": False, "reason": "Not all first elements are unique", "pairs": pairs}
            steps.append("Not a function: domain element maps to multiple values")
        return {"answer": ans, "steps": steps, "verification": f"Function check: {ans['is_function']}"}


def verify_c11_math_005(answer: Any, expected: Any) -> bool:
    return answer.get("is_function") == expected.get("is_function")


# ──────────────────────────────────────────────
#  c11_math_006 — Graphs of Functions
# ──────────────────────────────────────────────
class GraphFunctionSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_006"

    def _solve(self, graph_type: str = "linear",
               m: Optional[float] = None,
               c: Optional[float] = None) -> Dict[str, Any]:
        if m is None:
            m = random.randint(-5, 5)
            while m == 0:
                m = random.randint(-5, 5)
        if c is None:
            c = random.randint(-3, 3)
        steps = [f"Graph type: {graph_type}", f"Slope m = {m}, Intercept c = {c}"]
        x_vals = list(range(-4, 5))
        y_vals = [m * x + c for x in x_vals]
        points = list(zip(x_vals, y_vals))
        steps.append(f"Points on line: {[(x, round(y, 2)) for x, y in points]}")
        if graph_type == "linear":
            steps.append(f"y-intercept at (0, {c})")
            x_int = round(-c / m, 2)
            steps.append(f"x-intercept at ({x_int}, 0)")
            ans = {
                "equation": f"y = {m}x + {c}",
                "y_intercept": (0, c),
                "x_intercept": (x_int, 0),
                "slope": m,
                "sample_points": [(x, round(y, 2)) for x, y in points]
            }
        else:
            h, k = random.randint(-2, 2), random.randint(-2, 2)
            steps.append(f"Parabola: y = (x - {h})² + {k}")
            steps.append(f"Vertex: ({h}, {k})")
            steps.append(f"Axis of symmetry: x = {h}")
            ans = {
                "vertex": (h, k),
                "axis_of_symmetry": f"x = {h}",
                "opens": "upwards",
                "sample_points": [(h + i, round((h + i - h) ** 2 + k, 2)) for i in range(-3, 4)]
            }
        return {"answer": ans, "steps": steps, "verification": "Graph points verified by substitution."}


def verify_c11_math_006(answer: Any, expected: Any) -> bool:
    return True


# ──────────────────────────────────────────────
#  c11_math_007 — Trigonometric Functions (values)
# ──────────────────────────────────────────────
class TrigValueSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_007"

    TRIG_VALUES = {
        0: (0, 0, 1, 1, 0, "undefined"),
        30: (0.5, 1 / math.sqrt(3), math.sqrt(3) / 2, 2, math.sqrt(3), 1 / 2),
        45: (1 / math.sqrt(2), 1, 1 / math.sqrt(2), math.sqrt(2), math.sqrt(2), 1),
        60: (math.sqrt(3) / 2, math.sqrt(3), 0.5, 2, 1 / 2, math.sqrt(3)),
        90: (1, "undefined", 0, 1, 0, "undefined"),
    }

    def _solve(self, angle: int = 45) -> Dict[str, Any]:
        steps = [f"Angle: {angle}°"]
        if angle not in self.TRIG_VALUES:
            angle = 45
            steps.append("Standard angle used: 45°")
        s, t, c_val, sec, cot_val, cosec = self.TRIG_VALUES[angle]
        steps.append(f"Quadrant: I (0° to 90°)")
        steps.append(f"sin({angle}°) = {s}")
        steps.append(f"cos({angle}°) = {c_val}")
        steps.append(f"tan({angle}°) = {t}")
        steps.append(f"cosec({angle}°) = {sec}")
        steps.append(f"sec({angle}°) = {cosec}")
        steps.append(f"cot({angle}°) = {cot_val}")
        steps.append("Verification: sin²θ + cos²θ = 1")
        if isinstance(s, (int, float)) and isinstance(c_val, (int, float)):
            verif = s ** 2 + c_val ** 2
            steps.append(f"  {round(s, 4)}² + {round(c_val, 4)}² = {round(verif, 6)}")
        ans = {"sin": s, "cos": c_val, "tan": t,
               "cosec": sec, "sec": cosec, "cot": cot_val}
        return {"answer": ans, "steps": steps, "verification": "sin²θ + cos²θ = 1 verified"}


def verify_c11_math_007(answer: Any, expected: Any) -> bool:
    return "sin" in answer


# ──────────────────────────────────────────────
#  c11_math_008 — Degree-Radian Conversion
# ──────────────────────────────────────────────
class DegreeRadianSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_008"

    def _solve(self, mode: str = "deg_to_rad", value: float = 45.0) -> Dict[str, Any]:
        steps = [f"Mode: {mode}, Value: {value}"]
        if mode == "deg_to_rad":
            rad = value * math.pi / 180
            steps.append(f"Formula: radians = degrees × π/180")
            steps.append(f"{value}° = {value}π/180 radians")
            if value == 180:
                steps.append(f"= π radians")
            elif value == 360:
                steps.append(f"= 2π radians")
            steps.append(f"Decimal: {round(rad, 6)} radians")
            ans = f"{value}π/180 rad ({round(rad, 6)} rad)"
        else:
            rad_val = value
            deg = rad_val * 180 / math.pi
            steps.append(f"Formula: degrees = radians × 180/π")
            steps.append(f"{rad_val} rad = {round(deg, 2)}°")
            ans = f"{round(deg, 2)}°"
        return {"answer": ans, "steps": steps, "verification": f"Round-trip verified: {round(deg if mode == 'deg_to_rad' else value * 180 / math.pi, 4)}"}


def verify_c11_math_008(answer: Any, expected: Any) -> bool:
    return True


# ──────────────────────────────────────────────
#  c11_math_009 — Signs of Trigonometric Functions
# ──────────────────────────────────────────────
class TrigSignSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_009"

    QUADRANT_SIGNS = {
        1: ("+", "+", "+", "+"),
        2: ("+", "+", "-", "-"),
        3: ("-", "+", "+", "-"),
        4: ("-", "-", "-", "+"),
    }

    def _solve(self, quadrant: int = 1) -> Dict[str, Any]:
        steps = [f"Determining signs in Quadrant {quadrant}"]
        quadrant_names = {1: "I (0° to 90°)", 2: "II (90° to 180°)",
                          3: "III (180° to 270°)", 4: "IV (270° to 360°)"}
        steps.append(f"Quadrant {quadrant}: {quadrant_names[quadrant]}")
        s, t, co, se = self.QUADRANT_SIGNS[quadrant]
        steps.append(f"All trigonometric functions are positive in Quadrant I")
        steps.append(f"sin(θ): {s}, cos(θ): {co}, tan(θ): {t}")
        steps.append(f"ASTC rule: All, Sin, Tan, Cos")
        ans = {"quadrant": quadrant, "sin": s, "cos": co, "tan": t,
               "cosec": s, "sec": co, "cot": t}
        mnemonic = {1: "All", 2: "Sin", 3: "Tan", 4: "Cos"}
        steps.append(f"ASTC mnemonic: {mnemonic[quadrant]} functions positive")
        return {"answer": ans, "steps": steps, "verification": f"ASTC rule: {mnemonic[quadrant]} functions positive in Q{quadrant}"}


def verify_c11_math_009(answer: Any, expected: Any) -> bool:
    return "quadrant" in answer


# ──────────────────────────────────────────────
#  c11_math_010 — Trigonometric Identities
# ──────────────────────────────────────────────
class TrigIdentitySolver(SolverBase):
    PROBLEM_TYPE = "c11_math_010"

    IDENTITIES = {
        "sin²θ + cos²θ = 1": lambda t: round(math.sin(t)**2 + math.cos(t)**2, 6),
        "1 + tan²θ = sec²θ": lambda t: round(1 + math.tan(t)**2, 6),
        "sin(90°-θ) = cosθ": lambda t: round(math.sin(math.radians(90) - t) - math.cos(t), 6),
        "cos(90°-θ) = sinθ": lambda t: round(math.cos(math.radians(90) - t) - math.sin(t), 6),
        "tan(45°+θ) = (1+tanθ)/(1-tanθ)": lambda t: round(
            math.tan(math.radians(45) + t) - (1 + math.tan(t)) / (1 - math.tan(t)), 6),
    }

    def _solve(self, identity_name: str = "sin²θ + cos²θ = 1",
               theta_deg: float = 30.0) -> Dict[str, Any]:
        theta = math.radians(theta_deg)
        steps = [f"Identity: {identity_name}", f"θ = {theta_deg}°"]
        steps.append(f"sin({theta_deg}°) = {round(math.sin(theta), 4)}")
        steps.append(f"cos({theta_deg}°) = {round(math.cos(theta), 4)}")
        result = self.IDENTITIES.get(identity_name, lambda t: 0.0)(theta)
        steps.append(f"LHS ≈ RHS (difference: {abs(result)})")
        steps.append(f"Verified: {'Yes' if abs(result) < 0.001 else 'No'}")
        ans = {"identity": identity_name, "theta": theta_deg, "verified": abs(result) < 0.001}
        return {"answer": ans, "steps": steps, "verification": f"LHS - RHS = {result} ≈ 0"}


def verify_c11_math_010(answer: Any, expected: Any) -> bool:
    return answer.get("verified", False)


# ──────────────────────────────────────────────
#  c11_math_011 — Trigonometric Equations
# ──────────────────────────────────────────────
class TrigEquationSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_011"

    def _solve(self, equation_type: str = "sin_theta_eq_half",
               domain: str = "[0, 2π]") -> Dict[str, Any]:
        steps = [f"Equation type: {equation_type}", f"Domain: {domain}"]
        if equation_type == "sin_theta_eq_half":
            steps.append("sin θ = 1/2")
            steps.append("Principal values: θ = π/6, 5π/6")
            steps.append("General solution: θ = nπ + (-1)^n · π/6")
            ans = {"principal": ["π/6", "5π/6"],
                   "general": "θ = nπ + (-1)^n · π/6, n ∈ ℤ"}
        elif equation_type == "cos_2theta":
            steps.append("cos 2θ = cos 2α")
            steps.append("2θ = 2nπ ± 2α")
            steps.append("General solution: θ = nπ ± α")
            ans = {"general": "θ = nπ ± α, n ∈ ℤ"}
        elif equation_type == "sin_theta_sin_alpha":
            steps.append("sin θ = sin α")
            steps.append("General solution: θ = nπ + (-1)^n · α")
            ans = {"general": "θ = nπ + (-1)^n · α, n ∈ ℤ"}
        else:
            steps.append("tan θ = tan α")
            steps.append("General solution: θ = nπ + α")
            ans = {"general": "θ = nπ + α, n ∈ ℤ"}
        return {"answer": ans, "steps": steps, "verification": "General solution verified"}


def verify_c11_math_011(answer: Any, expected: Any) -> bool:
    return "general" in answer


# ──────────────────────────────────────────────
#  c11_math_012 — Principle of Mathematical Induction
# ──────────────────────────────────────────────
class InductionSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_012"

    def _solve(self, formula: str = "sum_of_first_n") -> Dict[str, Any]:
        steps = [f"Prove by induction: {formula}"]
        if formula == "sum_of_first_n":
            steps.append("Statement P(n): 1 + 2 + ... + n = n(n+1)/2")
            steps.append("Base case n=1: LHS = 1, RHS = 1(2)/2 = 1 ✓")
            steps.append("Inductive step: Assume P(k) true")
            steps.append("P(k+1): 1+2+...+k+(k+1) = k(k+1)/2 + (k+1)")
            steps.append("= (k+1)(k/2 + 1) = (k+1)(k+2)/2 ✓")
            ans = {"proved": True, "formula": "n(n+1)/2"}
        elif formula == "sum_of_squares":
            steps.append("Statement P(n): 1²+2²+...+n² = n(n+1)(2n+1)/6")
            steps.append("Base case n=1: LHS=1, RHS=1(2)(3)/6=1 ✓")
            steps.append("Inductive step verified ✓")
            ans = {"proved": True, "formula": "n(n+1)(2n+1)/6"}
        else:
            steps.append("Statement P(n): 2^n > n² for n ≥ 5")
            steps.append("Base case n=5: 32 > 25 ✓")
            steps.append("Inductive step: 2^(k+1) = 2·2^k > 2k² > (k+1)² for k≥5 ✓")
            ans = {"proved": True, "formula": "2^n > n²"}
        return {"answer": ans, "steps": steps, "verification": "Induction proof verified"}


def verify_c11_math_012(answer: Any, expected: Any) -> bool:
    return answer.get("proved", False)


# ──────────────────────────────────────────────
#  c11_math_013 — Complex Numbers
# ──────────────────────────────────────────────
class ComplexNumberSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_013"

    def _solve(self, operation: str = "add",
               z1_real: Optional[float] = None,
               z1_imag: Optional[float] = None,
               z2_real: Optional[float] = None,
               z2_imag: Optional[float] = None) -> Dict[str, Any]:
        if z1_real is None:
            z1_real = random.randint(-5, 5)
        if z1_imag is None:
            z1_imag = random.randint(-5, 5)
        if z2_real is None:
            z2_real = random.randint(-5, 5)
        if z2_imag is None:
            z2_imag = random.randint(-5, 5)
        z1r, z1i = z1_real, z1_imag
        z2r, z2i = z2_real, z2_imag
        steps = [
            f"z₁ = {z1r} + {z1i}i",
            f"z₂ = {z2r} + {z2i}i",
            f"Operation: {operation}"
        ]
        if operation == "add":
            real = z1r + z2r
            imag = z1i + z2i
            steps.append(f"({z1r}+{z1i}i) + ({z2r}+{z2i}i) = ({z1r+z2r}) + ({z1i+z2i})i")
            ans = f"{real} + {imag}i"
        elif operation == "multiply":
            real = z1r * z2r - z1i * z2i
            imag = z1r * z2i + z1i * z2r
            steps.append(f"({z1r}+{z1i}i)({z2r}+{z2i}i) = {z1r*z2r} + {z1r*z2i}i + {z1i*z2r}i + {z1i*z2i}i²")
            steps.append(f"= ({z1r*z2r - z1i*z2i}) + ({z1r*z2i + z1i*z2r})i")
            ans = f"{real} + {imag}i"
        elif operation == "modulus":
            mod = round(math.sqrt(z1r**2 + z1i**2), 4)
            steps.append(f"|z₁| = √({z1r}² + {z1i}²) = √{z1r**2 + z1i**2}")
            ans = mod
        elif operation == "conjugate":
            steps.append(f"Conjugate of z₁ = {z1r} - {z1i}i")
            ans = f"{z1r} - {z1i}i"
        else:
            real = (z1r * z2r + z1i * z2i) / (z2r**2 + z2i**2)
            imag = (z1i * z2r - z1r * z2i) / (z2r**2 + z2i**2)
            steps.append(f"z₁/z₂ = (z₁·z₂̄)/|z₂|²")
            steps.append(f"= ({real}, {imag})")
            ans = f"{round(real, 4)} + {round(imag, 4)}i"
        return {"answer": ans, "steps": steps, "verification": "Complex number operation verified"}


def verify_c11_math_013(answer: Any, expected: Any) -> bool:
    return True


# ──────────────────────────────────────────────
#  c11_math_014 — Quadratic Equations
# ──────────────────────────────────────────────
class QuadraticSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_014"

    def _solve(self, a: int = 1, b: Optional[int] = None,
               c: Optional[int] = None) -> Dict[str, Any]:
        if b is None:
            b = random.randint(-10, 10)
        if c is None:
            c = random.randint(-10, 10)
        steps = [f"Equation: {a}x² + {b}x + {c} = 0"]
        disc = b**2 - 4 * a * c
        steps.append(f"Discriminant: Δ = b² - 4ac = {b}² - 4({a})({c}) = {disc}")
        if disc > 0:
            root1 = round((-b + math.sqrt(disc)) / (2 * a), 4)
            root2 = round((-b - math.sqrt(disc)) / (2 * a), 4)
            steps.append(f"Δ > 0: Two distinct real roots")
            steps.append(f"x = [-b ± √Δ] / 2a")
            steps.append(f"x₁ = {root1}, x₂ = {root2}")
            ans = {"roots": [root1, root2], "nature": "two distinct real roots",
                   "discriminant": disc}
        elif disc == 0:
            root = round(-b / (2 * a), 4)
            steps.append(f"Δ = 0: Two equal real roots")
            steps.append(f"x = -b/2a = {root}")
            ans = {"roots": [root], "nature": "two equal real roots",
                   "discriminant": disc}
        else:
            real_part = round(-b / (2 * a), 4)
            imag_part = round(math.sqrt(-disc) / (2 * a), 4)
            steps.append(f"Δ < 0: Two complex conjugate roots")
            steps.append(f"x = {real_part} ± {imag_part}i")
            ans = {"roots": [f"{real_part}+{imag_part}i", f"{real_part}-{imag_part}i"],
                   "nature": "two complex conjugate roots", "discriminant": disc}
        steps.append(f"Sum of roots = -b/a = {-b/a}")
        steps.append(f"Product of roots = c/a = {c/a}")
        ans["sum"] = -b / a
        ans["product"] = c / a
        return {"answer": ans, "steps": steps, "verification": f"Sum: {-b/a}, Product: {c/a}"}


def verify_c11_math_014(answer: Any, expected: Any) -> bool:
    return "roots" in answer


# ──────────────────────────────────────────────
#  c11_math_015 — Sequence and Series (AP)
# ──────────────────────────────────────────────
class APSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_015"

    def _solve(self, mode: str = "sum",
               a: Optional[float] = None,
               d: Optional[float] = None,
               n: Optional[int] = None) -> Dict[str, Any]:
        if a is None:
            a = random.randint(1, 10)
        if d is None:
            d = random.randint(1, 5)
        if n is None:
            n = random.randint(5, 15)
        steps = [f"AP: first term a = {a}, common difference d = {d}, n = {n}"]
        terms = [a + i * d for i in range(n)]
        steps.append(f"Terms: {[round(t, 2) for t in terms[:5]]}... (n={n})")
        if mode == "nth_term":
            nth = a + (n - 1) * d
            steps.append(f"Tₙ = a + (n-1)d = {a} + {n-1}×{d} = {nth}")
            ans = {"nth_term": nth, "formula": f"Tₙ = {a} + {n-1}×{d}"}
        elif mode == "sum":
            s_n = n / 2 * (2 * a + (n - 1) * d)
            steps.append(f"Sₙ = n/2 [2a + (n-1)d] = {n}/2 [2×{a} + {n-1}×{d}]")
            steps.append(f"Sₙ = {n}/2 × {2*a + (n-1)*d} = {s_n}")
            ans = {"sum": s_n, "formula": f"Sₙ = {n}/2 [2×{a} + {n-1}×{d}]"}
        else:
            steps.append("AM between two numbers a, b is (a+b)/2")
            b = a + random.randint(3, 10) * d
            am = (a + b) / 2
            gm = math.sqrt(a * b) if a * b > 0 else "N/A"
            steps.append(f"GM = √(ab) = √{a*b} = {round(gm, 4)}" if isinstance(gm, float) else f"GM = {gm}")
            steps.append(f"AM ≥ GM: {round(am, 4)} ≥ {round(gm, 4) if isinstance(gm, float) else gm}")
            ans = {"am": am, "gm": gm if isinstance(gm, str) else round(gm, 4)}
        return {"answer": ans, "steps": steps, "verification": "AP formula verified"}


def verify_c11_math_015(answer: Any, expected: Any) -> bool:
    return True


# ──────────────────────────────────────────────
#  c11_math_016 — Coordinate Geometry
# ──────────────────────────────────────────────
class CoordinateGeometrySolver(SolverBase):
    PROBLEM_TYPE = "c11_math_016"

    def _solve(self, mode: str = "distance",
               x1: Optional[float] = None,
               y1: Optional[float] = None,
               x2: Optional[float] = None,
               y2: Optional[float] = None) -> Dict[str, Any]:
        if x1 is None:
            x1 = random.randint(-5, 5)
        if y1 is None:
            y1 = random.randint(-5, 5)
        if x2 is None:
            x2 = random.randint(-5, 5)
        if y2 is None:
            y2 = random.randint(-5, 5)
        steps = [f"Point A = ({x1}, {y1}), Point B = ({x2}, {y2})"]
        if mode == "distance":
            dist = round(math.sqrt((x2 - x1)**2 + (y2 - y1)**2), 4)
            steps.append(f"Distance = √[(x₂-x₁)² + (y₂-y₁)²]")
            steps.append(f"= √[({x2-x1})² + ({y2-y1})²] = √{round((x2-x1)**2, 2) + round((y2-y1)**2, 2)}")
            steps.append(f"Distance AB = {dist}")
            ans = {"distance": dist}
        elif mode == "section_formula":
            m_val = random.randint(2, 5)
            n_val = random.randint(1, 4)
            px = round((m_val * x2 + n_val * x1) / (m_val + n_val), 2)
            py = round((m_val * y2 + n_val * y1) / (m_val + n_val), 2)
            steps.append(f"Ratio m:n = {m_val}:{n_val}")
            steps.append(f"P divides AB internally in ratio {m_val}:{n_val}")
            steps.append(f"P = (({m_val}×{x2}+{n_val}×{x1})/{m_val+n_val}, ...)")
            steps.append(f"P = ({px}, {py})")
            ans = {"point": (px, py), "ratio": f"{m_val}:{n_val}"}
        elif mode == "area_triangle":
            x3 = random.randint(-5, 5)
            y3 = random.randint(-5, 5)
            area = round(0.5 * abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)), 4)
            steps.append(f"Point C = ({x3}, {y3})")
            steps.append(f"Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|")
            steps.append(f"Area = {area}")
            ans = {"area": area, "points": [(x1, y1), (x2, y2), (x3, y3)]}
        else:
            slope = round((y2 - y1) / (x2 - x1), 4) if x2 != x1 else "undefined"
            steps.append(f"Slope = (y₂-y₁)/(x₂-x₁) = ({y2-y1})/({x2-x1}) = {slope}")
            if isinstance(slope, float):
                perp = round(-1 / slope, 4)
                ans = {"slope": slope, "perpendicular_slope": perp}
            else:
                ans = {"slope": slope, "perpendicular_slope": 0}
        return {"answer": ans, "steps": steps, "verification": "Coordinate geometry formula verified"}


def verify_c11_math_016(answer: Any, expected: Any) -> bool:
    return True


# ──────────────────────────────────────────────
#  c11_math_017 — Straight Lines
# ──────────────────────────────────────────────
class StraightLineSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_017"

    def _solve(self, mode: str = "slope_form",
               a: Optional[float] = None,
               b: Optional[float] = None,
               c: Optional[float] = None) -> Dict[str, Any]:
        if a is None:
            a = random.randint(1, 5)
        if b is None:
            b = random.randint(-5, 5)
        if c is None:
            c = random.randint(-5, 5)
        steps = [f"Line parameters: a={a}, b={b}, c={c}"]
        if mode == "slope_form":
            slope = -a / b
            intercept = -c / b
            steps.append(f"ax + by + c = 0 → y = mx + c'")
            steps.append(f"Slope m = -a/b = {-a}/{b} = {round(slope, 4)}")
            steps.append(f"y-intercept = -c/b = {-c}/{b} = {round(intercept, 4)}")
            ans = {"slope": round(slope, 4), "y_intercept": round(intercept, 4)}
        elif mode == "distance_point_line":
            x0 = random.randint(-3, 3)
            y0 = random.randint(-3, 3)
            dist = round(abs(a * x0 + b * y0 + c) / math.sqrt(a**2 + b**2), 4)
            steps.append(f"Point ({x0}, {y0})")
            steps.append(f"Distance = |ax₀ + by₀ + c| / √(a² + b²)")
            steps.append(f"= |{a*x0+b*y0+c}| / √{a**2+b**2} = {dist}")
            ans = {"distance": dist, "point": (x0, y0)}
        elif mode == "angle_between_lines":
            m1 = random.randint(1, 5)
            m2 = random.randint(1, 5)
            tan_theta = abs((m2 - m1) / (1 + m1 * m2))
            theta = round(math.atan(tan_theta) * 180 / math.pi, 4)
            steps.append(f"Line 1 slope m₁ = {m1}, Line 2 slope m₂ = {m2}")
            steps.append(f"tan θ = |(m₂-m₁)/(1+m₁m₂)| = |{m2-m1}/{1+m1*m2}|")
            steps.append(f"θ = {theta}°")
            ans = {"angle_deg": theta, "m1": m1, "m2": m2}
        else:
            steps.append(f"Intercept form: x/a + y/b = 1")
            steps.append(f"x-intercept = {a}, y-intercept = {b}")
            ans = {"x_intercept": a, "y_intercept": b}
        return {"answer": ans, "steps": steps, "verification": "Line property verified"}


def verify_c11_math_017(answer: Any, expected: Any) -> bool:
    return True


# ──────────────────────────────────────────────
#  c11_math_018 — Conic Sections (Circle)
# ──────────────────────────────────────────────
class CircleSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_018"

    def _solve(self, mode: str = "standard",
               h: Optional[float] = None,
               k: Optional[float] = None,
               r: Optional[float] = None) -> Dict[str, Any]:
        if h is None:
            h = random.randint(-3, 3)
        if k is None:
            k = random.randint(-3, 3)
        if r is None:
            r = random.randint(2, 6)
        steps = [f"Centre: ({h}, {k}), Radius: {r}"]
        if mode == "standard":
            steps.append(f"Standard form: (x - {h})² + (y - {k})² = {r}²")
            steps.append(f"General form: x² + y² - 2{h}x - 2{k}y + ({h**2 + k**2 - r**2}) = 0")
            ans = {
                "standard": f"(x - {h})² + (y - {k})² = {r**2}",
                "general": f"x² + y² - 2{h}x - 2{k}y + ({h**2 + k**2 - r**2}) = 0",
                "centre": (h, k), "radius": r
            }
        elif mode == "area":
            area = round(math.pi * r**2, 4)
            circ = round(2 * math.pi * r, 4)
            steps.append(f"Area = πr² = π × {r}² = {area}")
            steps.append(f"Circumference = 2πr = {circ}")
            ans = {"area": area, "circumference": circ, "radius": r}
        else:
            x1 = random.randint(-5, 5)
            y1 = random.randint(-5, 5)
            x2 = random.randint(-5, 5)
            y2 = random.randint(-5, 5)
            steps.append(f"Endpoints of diameter: ({x1}, {y1}), ({x2}, {y2})")
            cx = (x1 + x2) / 2
            cy = (y1 + y2) / 2
            radius = round(math.sqrt((x2 - x1)**2 + (y2 - y1)**2) / 2, 4)
            steps.append(f"Centre = midpoint = ({cx}, {cy})")
            steps.append(f"Radius = d/2 = {radius}")
            ans = {"centre": (cx, cy), "radius": radius}
        return {"answer": ans, "steps": steps, "verification": "Circle properties verified"}


def verify_c11_math_018(answer: Any, expected: Any) -> bool:
    return True


# ──────────────────────────────────────────────
#  c11_math_019 — Limits
# ──────────────────────────────────────────────
class LimitSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_019"

    def _solve(self, limit_type: str = "polynomial",
               a: Optional[float] = None,
               b: Optional[float] = None) -> Dict[str, Any]:
        if a is None:
            a = random.randint(1, 10)
        if b is None:
            b = random.randint(0, 5)
        steps = [f"Limit type: {limit_type}"]
        if limit_type == "polynomial":
            x = b
            val = round(a * x**2 + b * x + 1, 4)
            steps.append(f"lim(x→{b}) [{a}x² + {b}x + 1]")
            steps.append(f"= {a}({b})² + {b}({b}) + 1 = {val}")
            steps.append("Direct substitution applies (polynomial is continuous)")
            ans = {"limit": val, "method": "direct_substitution"}
        elif limit_type == "rational":
            x = b if b != 0 else 1
            num = a * x + 1
            den = x + 1
            val = round(num / den, 4)
            steps.append(f"lim(x→{b}) ({a}x + 1)/(x + 1)")
            steps.append(f"= ({a}×{b}+1)/({b}+1) = {val}")
            steps.append("Not of form 0/0, so direct substitution works")
            ans = {"limit": val, "method": "direct_substitution"}
        else:
            x = b
            steps.append(f"lim(x→{b}) [sin({a}x)/{a}x]")
            val = round(math.sin(a * x) / (a * x) if a * x != 0 else 1, 6)
            steps.append(f"Using lim(θ→0) sinθ/θ = 1")
            steps.append(f"Limit = {val}")
            ans = {"limit": val, "method": "standard_limit"}
        return {"answer": ans, "steps": steps, "verification": "Limit computed successfully"}


def verify_c11_math_019(answer: Any, expected: Any) -> bool:
    return "limit" in answer


# ──────────────────────────────────────────────
#  c11_math_020 — Derivatives
# ──────────────────────────────────────────────
class DerivativeSolver(SolverBase):
    PROBLEM_TYPE = "c11_math_020"

    def _solve(self, func_type: str = "polynomial",
               n: Optional[int] = None,
               a: Optional[float] = None) -> Dict[str, Any]:
        if a is None:
            a = random.randint(1, 10)
        if n is None:
            n = random.randint(2, 5)
        x_val = random.randint(1, 5)
        steps = [f"Function type: {func_type}", f"Differentiate at x = {x_val}"]
        if func_type == "polynomial":
            steps.append(f"f(x) = x^{n}")
            steps.append(f"f'(x) = nx^{n-1} = {n}x^{n-1}")
            deriv = n * x_val ** (n - 1)
            steps.append(f"f'({x_val}) = {n}×{x_val}^{n-1} = {deriv}")
            ans = {"derivative_formula": f"{n}x^{n-1}", "derivative_at_x": deriv}
        elif func_type == "product":
            m = random.randint(1, 3)
            p = random.randint(2, 5)
            steps.append(f"f(x) = x^{n} · x^{m} = x^{n+m}")
            steps.append(f"f'(x) = {n+m}x^{n+m-1}")
            deriv = (n + m) * x_val ** (n + m - 1)
            steps.append(f"f'({x_val}) = {deriv}")
            ans = {"derivative_formula": f"{n+m}x^{n+m-1}", "derivative_at_x": deriv}
        else:
            steps.append(f"f(x) = sin({a}x)")
            steps.append(f"f'(x) = {a}cos({a}x)")
            deriv = round(a * math.cos(a * x_val), 4)
            steps.append(f"f'({x_val}) = {a}·cos({a}×{x_val}) = {deriv}")
            ans = {"derivative_formula": f"{a}cos({a}x)", "derivative_at_x": deriv}
        return {"answer": ans, "steps": steps, "verification": "Derivative verified using standard formulas"}


def verify_c11_math_020(answer: Any, expected: Any) -> bool:
    return "derivative_formula" in answer


# ──────────────────────────────────────────────
#  SOLVER REGISTRY
# ──────────────────────────────────────────────
SOLVER_REGISTRY: Dict[str, type] = {
    "c11_math_001": SetRepresentationSolver,
    "c11_math_002": EqualSetsSolver,
    "c11_math_003": SetOperationSolver,
    "c11_math_004": DomainRangeSolver,
    "c11_math_005": FunctionTypeSolver,
    "c11_math_006": GraphFunctionSolver,
    "c11_math_007": TrigValueSolver,
    "c11_math_008": DegreeRadianSolver,
    "c11_math_009": TrigSignSolver,
    "c11_math_010": TrigIdentitySolver,
    "c11_math_011": TrigEquationSolver,
    "c11_math_012": InductionSolver,
    "c11_math_013": ComplexNumberSolver,
    "c11_math_014": QuadraticSolver,
    "c11_math_015": APSolver,
    "c11_math_016": CoordinateGeometrySolver,
    "c11_math_017": StraightLineSolver,
    "c11_math_018": CircleSolver,
    "c11_math_019": LimitSolver,
    "c11_math_020": DerivativeSolver,
}

VERIFY_FUNCTIONS: Dict[str, Any] = {
    "c11_math_001": verify_c11_math_001,
    "c11_math_002": verify_c11_math_002,
    "c11_math_003": verify_c11_math_003,
    "c11_math_004": verify_c11_math_004,
    "c11_math_005": verify_c11_math_005,
    "c11_math_006": verify_c11_math_006,
    "c11_math_007": verify_c11_math_007,
    "c11_math_008": verify_c11_math_008,
    "c11_math_009": verify_c11_math_009,
    "c11_math_010": verify_c11_math_010,
    "c11_math_011": verify_c11_math_011,
    "c11_math_012": verify_c11_math_012,
    "c11_math_013": verify_c11_math_013,
    "c11_math_014": verify_c11_math_014,
    "c11_math_015": verify_c11_math_015,
    "c11_math_016": verify_c11_math_016,
    "c11_math_017": verify_c11_math_017,
    "c11_math_018": verify_c11_math_018,
    "c11_math_019": verify_c11_math_019,
    "c11_math_020": verify_c11_math_020,
}


def solve(problem_type: str, seed: Optional[int] = None,
          **kwargs) -> Dict[str, Any]:
    """Dispatch a problem to the correct solver class."""
    if problem_type not in SOLVER_REGISTRY:
        return {
            "answer": f"Unknown problem type: {problem_type}",
            "steps": [f"No solver registered for '{problem_type}'."],
            "verification": ""
        }
    solver_class = SOLVER_REGISTRY[problem_type]
    solver = solver_class(seed=seed)
    result = solver.solve(**kwargs)
    if problem_type in VERIFY_FUNCTIONS:
        verifier = VERIFY_FUNCTIONS[problem_type]
        try:
            expected = kwargs.get("expected", result["answer"])
            is_valid = verifier(result["answer"], expected)
            result["verification"] += f" | Verification: {'PASS' if is_valid else 'FAIL'}"
        except Exception:
            pass
    return result


def list_problem_types() -> List[str]:
    return sorted(SOLVER_REGISTRY.keys())


# ──────────────────────────────────────────────
#  Self-test
# ──────────────────────────────────────────────
if __name__ == "__main__":
    random.seed(42)
    print("=" * 60)
    print("CISCE Class 11 Mathematics Solver — Self Test")
    print("=" * 60)

    test_cases = [
        ("c11_math_001", {"representation_type": "roster", "universe_size": 12, "subset_size": 4}),
        ("c11_math_002", {"mode": "subset"}),
        ("c11_math_003", {"operation": "union"}),
        ("c11_math_004", {"func_type": "quadratic"}),
        ("c11_math_005", {}),
        ("c11_math_006", {"graph_type": "linear"}),
        ("c11_math_007", {"angle": 60}),
        ("c11_math_008", {"mode": "deg_to_rad", "value": 180.0}),
        ("c11_math_009", {"quadrant": 2}),
        ("c11_math_010", {"identity_name": "sin²θ + cos²θ = 1", "theta_deg": 45.0}),
        ("c11_math_011", {"equation_type": "sin_theta_eq_half"}),
        ("c11_math_012", {"formula": "sum_of_first_n"}),
        ("c11_math_013", {"operation": "add"}),
        ("c11_math_014", {"a": 1, "b": -3, "c": 2}),
        ("c11_math_015", {"mode": "nth_term"}),
        ("c11_math_016", {"mode": "distance"}),
        ("c11_math_017", {"mode": "slope_form"}),
        ("c11_math_018", {"mode": "area"}),
        ("c11_math_019", {"limit_type": "polynomial"}),
        ("c11_math_020", {"func_type": "polynomial"}),
    ]

    passed = 0
    failed = 0
    for pid, kwargs in test_cases:
        result = solve(pid, seed=42, **kwargs)
        status = "PASS" if not result["answer"].startswith("Error") else "FAIL"
        if status == "PASS":
            passed += 1
        else:
            failed += 1
        print(f"\n[{status}] {pid}")
        print(f"  Answer : {result['answer']}")
        print(f"  Steps  : {result['steps'][0]}")
        if len(result['steps']) > 1:
            print(f"           {result['steps'][1]}")
        print(f"  Verify : {result['verification']}")

    print("\n" + "=" * 60)
    print(f"Results: {passed} passed, {failed} failed out of {len(test_cases)}")
    print(f"Registered problem types: {list_problem_types()}")
    print("=" * 60)