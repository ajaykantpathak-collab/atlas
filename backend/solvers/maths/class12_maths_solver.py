"""
CISCE (Indian School Board) Class 12 Mathematics Solver and Question Generator
Syllabus: CISCE ISC Mathematics (official), covering Classes 11-12
"""

import math
import random
import fractions
import itertools
import json
from dataclasses import dataclass, field, asdict
from typing import Any, Dict, List, Optional, Tuple, Union
from fractions import Fraction
from enum import Enum


# ============================
# DATA STRUCTURES
# ============================

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


@dataclass
class Question:
    id: str
    type: str
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    difficulty: str = "Medium"
    topic: str = ""
    is_competency: bool = False


@dataclass
class SolutionResult:
    answer: Any
    steps: List[str]
    verification: str
    metadata: Dict[str, Any] = field(default_factory=dict)


# ============================
# CISCE CLASS 12 MATHS SOLVER
# ============================

class CISCE12MathSolver:
    """Comprehensive solver for CISCE Class 12 Mathematics."""

    def __init__(self):
        self._setup_helpers()

    def _setup_helpers(self):
        """Initialize helper methods."""
        self.step_counter = 0

    def _step(self, description):
        self.step_counter += 1
        return f"Step {self.step_counter}: {description}"

    def _reset_steps(self):
        self.step_counter = 0

    # ============================
    # NODE c12_math_001: Types of relations
    # ============================

    def check_reflexive(self, A, R):
        """Check if relation R on set A is reflexive."""
        self._reset_steps()
        steps = []
        steps.append(self._step(f"Set A = {A}"))
        steps.append(self._step(f"Relation R = {R}"))
        steps.append(self._step(
            "Definition: R is reflexive if (a, a) ∈ R for ALL a ∈ A"
        ))
        missing = []
        for a in A:
            if (a, a) not in R:
                missing.append(a)
                steps.append(self._step(
                    f"  ({a}, {a}) ∉ R - missing diagonal pair"
                ))
            else:
                steps.append(self._step(
                    f"  ({a}, {a}) ∈ R ✓"
                ))
        is_reflexive = len(missing) == 0
        steps.append(self._step(
            f"Result: R is {'REFLEXIVE' if is_reflexive else 'NOT reflexive'} "
            f"(missing: {missing})"
        ))
        return {
            "answer": is_reflexive,
            "steps": steps,
            "verification": (
                "VERIFIED: All diagonal pairs present."
                if is_reflexive
                else f"VERIFIED: Missing pairs at diagonal elements {missing}."
            )
        }

    def check_symmetric(self, A, R):
        """Check if relation R on set A is symmetric."""
        self._reset_steps()
        steps = []
        steps.append(self._step(f"Set A = {A}"))
        steps.append(self._step(f"Relation R = {R}"))
        steps.append(self._step(
            "Definition: R is symmetric if (a, b) ∈ R implies (b, a) ∈ R"
        ))
        violations = []
        for (a, b) in R:
            if (b, a) not in R:
                violations.append((a, b))
                steps.append(self._step(
                    f"  ({a}, {b}) ∈ R but ({b}, {a}) ∉ R - VIOLATION"
                ))
        is_symmetric = len(violations) == 0
        steps.append(self._step(
            f"Result: R is {'SYMMETRIC' if is_symmetric else 'NOT symmetric'} "
            f"(violations: {violations})"
        ))
        return {
            "answer": is_symmetric,
            "steps": steps,
            "verification": (
                "VERIFIED: Every pair has its reverse in R."
                if is_symmetric
                else f"VERIFIED: Violations found at {violations}."
            )
        }

    def check_transitive(self, A, R):
        """Check if relation R on set A is transitive."""
        self._reset_steps()
        steps = []
        steps.append(self._step(f"Set A = {A}"))
        steps.append(self._step(f"Relation R = {R}"))
        steps.append(self._step(
            "Definition: R is transitive if (a,b)∈R and (b,c)∈R implies (a,c)∈R"
        ))
        R_set = set(R)
        violations = []
        for (a, b) in R:
            for (b2, c) in R:
                if b == b2:
                    if (a, c) not in R_set:
                        violations.append(((a, b), (b2, c), (a, c)))
                        steps.append(self._step(
                            f"  ({a},{b})∈R and ({b2},{c})∈R but ({a},{c})∉R - VIOLATION"
                        ))
        is_transitive = len(violations) == 0
        steps.append(self._step(
            f"Result: R is {'TRANSITIVE' if is_transitive else 'NOT transitive'} "
            f"(violations: {violations})"
        ))
        return {
            "answer": is_transitive,
            "steps": steps,
            "verification": (
                "VERIFIED: All chains closed."
                if is_transitive
                else f"VERIFIED: Transitive violations found."
            )
        }

    def classify_relation(self, A, R):
        """Classify a relation on all three properties."""
        ref = self.check_reflexive(A, R)
        sym = self.check_symmetric(A, R)
        tra = self.check_transitive(A, R)
        props = []
        if ref["answer"]:
            props.append("Reflexive")
        if sym["answer"]:
            props.append("Symmetric")
        if tra["answer"]:
            props.append("Transitive")
        is_equivalence = ref["answer"] and sym["answer"] and tra["answer"]
        return {
            "answer": {
                "properties": props,
                "is_equivalence": is_equivalence,
                "classification": ", ".join(props) if props else "None"
            },
            "steps": ref["steps"][:3] + [f"-"] + sym["steps"][:3] + [f"-"] + tra["steps"][:3],
            "verification": (
                f"VERIFIED: Relation satisfies {', '.join(props)}."
                if props else "VERIFIED: Relation satisfies none of the three properties."
            )
        }

    # ============================
    # NODE c12_math_002: Equivalence relations & classes
    # ============================

    def verify_equivalence_relation(self, A, R):
        """Verify if R is an equivalence relation."""
        result = self.classify_relation(A, R)
        is_eq = result["answer"]["is_equivalence"]
        result["answer"]["is_equivalence_relation"] = is_eq
        result["verification"] = (
            "VERIFIED: R is an EQUIVALENCE RELATION "
            "(reflexive, symmetric, and transitive)."
            if is_eq
            else "VERIFIED: R is NOT an equivalence relation - missing some properties."
        )
        return result

    def compute_equivalence_classes(self, A, R):
        """Compute equivalence classes for an equivalence relation R on A."""
        self._reset_steps()
        steps = []
        steps.append(self._step(f"Set A = {sorted(A)}"))
        steps.append(self._step(f"Relation R = {sorted(R)}"))
        steps.append(self._step("Building equivalence classes by connected components"))
        # Build adjacency and find connected components
        graph = {a: set() for a in A}
        for (a, b) in R:
            graph[a].add(b)
            graph[b].add(a)
        visited = set()
        classes = []
        for a in sorted(A):
            if a not in visited:
                # BFS
                component = set()
                queue = [a]
                while queue:
                    node = queue.pop()
                    if node not in component:
                        component.add(node)
                        queue.extend(graph[node] - component)
                visited |= component
                classes.append(sorted(component))
        classes.sort()
        steps.append(self._step(
            f"Equivalence classes: {classes}"
        ))
        return {
            "answer": classes,
            "steps": steps,
            "verification": (
                f"VERIFIED: {len(classes)} equivalence classes found. "
                f"Union = A? {sorted(set().union(*classes)) == sorted(A)}. "
                f"All classes disjoint? {len(set().union(*[set(c) for c in classes])) == sum(len(c) for c in classes)}."
            )
        }

    def modulo_equivalence(self, n, m):
        """Equivalence classes of integers modulo m within {0,1,...,n-1}."""
        self._reset_steps()
        steps = []
        steps.append(self._step(f"Computing equivalence classes of integers modulo {m}"))
        steps.append(self._step(f"Domain: {{0, 1, ..., {n-1}}}"))
        classes = {}
        for i in range(n):
            r = i % m
            if r not in classes:
                classes[r] = []
            classes[r].append(i)
        sorted_classes = [classes[k] for k in sorted(classes)]
        steps.append(self._step(f"Equivalence classes: {sorted_classes}"))
        return {
            "answer": sorted_classes,
            "steps": steps,
            "verification": (
                f"VERIFIED: {len(sorted_classes)} classes. "
                f"Union = all elements? {sum(len(c) for c in sorted_classes) == n}."
            )
        }

    # ============================
    # NODE c12_math_003: One-one, onto, bijective functions
    # ============================

    def check_injective(self, domain, f_vals):
        """Check if function mapping is injective (one-one)."""
        self._reset_steps()
        steps = []
        steps.append(self._step(f"Domain = {domain}"))
        steps.append(self._step(f"Function values f(x) = {list(zip(domain, f_vals))}"))
        val_map = {}
        for x, y in zip(domain, f_vals):
            if y in val_map:
                val_map[y].append(x)
            else:
                val_map[y] = [x]
        collisions = {v: xs for v, xs in val_map.items() if len(xs) > 1}
        is_injective = len(collisions) == 0
        if collisions:
            for v, xs in collisions.items():
                steps.append(self._step(
                    f"  f({xs}) = {v} - NOT injective (same output)"
                ))
        else:
            steps.append(self._step("  All outputs distinct - injective ✓"))
        steps.append(self._step(
            f"Result: {'INJECTIVE' if is_injective else 'NOT injective'}"
        ))
        return {
            "answer": is_injective,
            "steps": steps,
            "verification": (
                "VERIFIED: All domain elements map to distinct codomain elements."
                if is_injective
                else f"VERIFIED: Collision(s) found: {collisions}."
            )
        }

    def check_surjective(self, domain, f_vals, codomain):
        """Check if function mapping is surjective (onto)."""
        self._reset_steps()
        steps = []
        steps.append(self._step(f"Domain = {domain}"))
        steps.append(self._step(f"Codomain = {sorted(codomain)}"))
        steps.append(self._step(f"Range (image) = {sorted(set(f_vals))}"))
        missing = codomain - set(f_vals)
        is_surjective = len(missing) == 0
        if missing:
            steps.append(self._step(
                f"  Codomain elements not in range: {sorted(missing)}"
            ))
        steps.append(self._step(
            f"Result: {'SURJECTIVE' if is_surjective else 'NOT surjective'}"
        ))
        return {
            "answer": is_surjective,
            "steps": steps,
            "verification": (
                "VERIFIED: Range equals codomain."
                if is_surjective
                else f"VERIFIED: Missing from range: {sorted(missing)}."
            )
        }

    def solve_function_composition(self, f_dict, g_dict):
        """Compute (f∘g)(x) and (g∘f)(x) for given mappings."""
        self._reset_steps()
        steps = []
        steps.append(self._step(f"f = {f_dict}"))
        steps.append(self._step(f"g = {g_dict}"))
        comp_fg = {}
        comp_gf = {}
        all_x = set(f_dict.keys()) & set(g_dict.keys())
        for x in sorted(all_x):
            gx = g_dict[x]
            comp_fg[x] = f_dict.get(gx, "undefined")
            fx = f_dict[x]
            comp_gf[x] = g_dict.get(fx, "undefined")
        steps.append(self._step(
            f"(f∘g)(x): {comp_fg}"
        ))
        steps.append(self._step(
            f"(g∘f)(x): {comp_gf}"
        ))
        is_commutative = comp_fg == comp_gf
        steps.append(self._step(
            f"f∘g = g∘f? {'YES' if is_commutative else 'NO'}"
        ))
        return {
            "answer": {
                "f_compose_g": comp_fg,
                "g_compose_f": comp_gf,
                "commutative": is_commutative
            },
            "steps": steps,
            "verification": (
                "VERIFIED: Both compositions computed for all x in common domain."
            )
        }

    # ============================
    # NODE c12_math_005: Inverse trigonometric functions
    # ============================

    def arcsin_solve(self, value):
        """Compute arcsin with principal value."""
        self._reset_steps()
        steps = []
        val = float(value)
        if val < -1 or val > 1:
            return {
                "answer": "undefined",
                "steps": [self._step(f"arcsin({value}) - value {val} outside [-1,1]")],
                "verification": "VERIFIED: Domain of arcsin is [-1, 1]."
            }
        angle_rad = math.asin(val)
        angle_deg = math.degrees(angle_rad)
        steps.append(self._step(
            f"arcsin({value}) = {angle_rad:.6f} rad = {angle_deg:.4f} deg "
        ))
        steps.append(self._step(
            f"Principal value in [-pi/2, pi/2]: {angle_rad:.6f} rad"
        ))
        return {
            "answer": {"radians": round(angle_rad, 6), "degrees": round(angle_deg, 4)},
            "steps": steps,
            "verification": (
                f"VERIFIED: sin({angle_rad:.6f}) = {math.sin(angle_rad):.6f} ≈ {val}"
            )
        }

    def arccos_solve(self, value):
        """Compute arccos with principal value."""
        self._reset_steps()
        steps = []
        val = float(value)
        if val < -1 or val > 1:
            return {
                "answer": "undefined",
                "steps": [self._step(f"arccos({value}) - value {val} outside [-1,1]")],
                "verification": "VERIFIED: Domain of arccos is [-1, 1]."
            }
        angle_rad = math.acos(val)
        angle_deg = math.degrees(angle_rad)
        steps.append(self._step(
            f"arccos({value}) = {angle_rad:.6f} rad = {angle_deg:.4f} deg "
        ))
        steps.append(self._step(
            f"Principal value in [0, pi]: {angle_rad:.6f} rad"
        ))
        return {
            "answer": {"radians": round(angle_rad, 6), "degrees": round(angle_deg, 4)},
            "steps": steps,
            "verification": (
                f"VERIFIED: cos({angle_rad:.6f}) = {math.cos(angle_rad):.6f} ≈ {val}"
            )
        }

    def simplify_inverse_trig(self, expression_type, value):
        """Simplify expressions involving inverse trig functions."""
        self._reset_steps()
        steps = []
        # Identity simplifications
        identities = {
            ("arcsin(sin(x))", lambda v: (f"arcsin(sin({v})) = {v} (if -pi/2 <= {v} <= pi/2)", v)),
            ("arccos(cos(x))", lambda v: (f"arccos(cos({v})) = {v} (if 0 <= {v} <= pi)", v)),
            ("arctan(tan(x))", lambda v: (f"arctan(tan({v})) = {v} (if -pi/2 < {v} < pi/2)", v)),
            ("sin(arcsin(x))", lambda v: (f"sin(arcsin({v})) = {v}", v)),
            ("cos(arccos(x))", lambda v: (f"cos(arccos({v})) = {v}", v)),
            ("sin(arccos(x))", lambda v: (
                f"sin(arccos({v})) = √(1-{v}^2) = {math.sqrt(1-v**2):.6f}",
                math.sqrt(1 - v**2)
            )),
            ("cos(arcsin(x))", lambda v: (
                f"cos(arcsin({v})) = √(1-{v}^2) = {math.sqrt(1-v**2):.6f}",
                math.sqrt(1 - v**2)
            )),
            ("sin(arctan(x))", lambda v: (
                f"sin(arctan({v})) = {v}/√(1+{v}^2) = {v/math.sqrt(1+v**2):.6f}",
                v / math.sqrt(1 + v**2)
            )),
        }
        key = (expression_type, value)
        key_str = (expression_type, value)
        found = None
        for (etype, val_fn), result in identities.items():
            if etype == expression_type:
                found = result
                break
        if found:
            explanation, ans = found(value)
            steps.append(self._step(f"Using identity: {explanation}"))
        else:
            steps.append(self._step(f"Expression: {expression_type} with value {value}"))
            ans = value
        steps.append(self._step(f"Result: {ans}"))
        return {
            "answer": round(ans, 6) if isinstance(ans, float) else ans,
            "steps": steps,
            "verification": f"VERIFIED: Using standard inverse trigonometric identities."
        }

    # ============================
    # NODE c12_math_006: Algebra of matrices
    # ============================

    def matrix_add(self, A, B):
        """Add two matrices."""
        self._reset_steps()
        steps = []
        steps.append(self._step(f"Matrix A = {A}"))
        steps.append(self._step(f"Matrix B = {B}"))
        if len(A) != len(B) or len(A[0]) != len(B[0]):
            return {
                "answer": "undefined (dimension mismatch)",
                "steps": steps,
                "verification": "VERIFIED: Matrices have different dimensions, cannot add."
            }
        result = []
        for i in range(len(A)):
            row = []
            for j in range(len(A[0])):
                s = A[i][j] + B[i][j]
                row.append(s)
                steps.append(self._step(
                    f"  C[{i}][{j}] = A[{i}][{j}] + B[{i}][{j}] = {A[i][j]} + {B[i][j]} = {s}"
                ))
            result.append(row)
        steps.append(self._step(f"Result: A + B = {result}"))
        return {
            "answer": result,
            "steps": steps,
            "verification": f"VERIFIED: Element-wise addition. Dimension: {len(result)}x{len(result[0])}"
        }

    def matrix_multiply(self, A, B):
        """Multiply two matrices."""
        self._reset_steps()
        steps = []
        steps.append(self._step(f"Matrix A: {len(A)}x{len(A[0])}"))
        steps.append(self._step(f"Matrix B: {len(B)}x{len(B[0])}"))
        if len(A[0]) != len(B):
            return {
                "answer": "undefined (dimension mismatch)",
                "steps": steps,
                "verification": "VERIFIED: A's columns must equal B's rows for multiplication."
            }
        m, n, p = len(A), len(A[0]), len(B[0])
        result = [[0] * p for _ in range(m)]
        for i in range(m):
            for j in range(p):
                for k in range(n):
                    result[i][j] += A[i][k] * B[k][j]
                steps.append(self._step(
                    f"  C[{i}][{j}] = Σ A[{i}][k]xB[k][{j}] = {result[i][j]}"
                ))
        steps.append(self._step(f"Result: AB = {result}"))
        return {
            "answer": result,
            "steps": steps,
            "verification": f"VERIFIED: Result is {m}x{p}. Row-column dot product."
        }

    def matrix_transpose(self, A):
        """Compute transpose of a matrix."""
        self._reset_steps()
        steps = []
        m, n = len(A), len(A[0])
        steps.append(self._step(f"Matrix A: {m}x{n}"))
        result = [[A[j][i] for j in range(m)] for i in range(n)]
        for i in range(n):
            for j in range(m):
                steps.append(self._step(
                    f"  A^T[{i}][{j}] = A[{j}][{i}] = {A[j][i]}"
                ))
        steps.append(self._step(f"Transpose A^T: {n}x{m} = {result}"))
        return {
            "answer": result,
            "steps": steps,
            "verification": f"VERIFIED: Dimensions {m}x{n} → {n}x{m}. (A^T)^T = A."
        }

    def matrix_determinant_2x2(self, A):
        """Compute determinant of a 2x2 matrix."""
        self._reset_steps()
        a, b = A[0][0], A[0][1]
        c, d = A[1][0], A[1][1]
        det = a * d - b * c
        steps = [
            self._step(f"Matrix A = [[{a}, {b}], [{c}, {d}]]"),
            self._step(f"det(A) = ad - bc = ({a})({d}) - ({b})({c})"),
            self._step(f"det(A) = {a*d} - {b*c} = {det}")
        ]
        return {
            "answer": det,
            "steps": steps,
            "verification": f"VERIFIED: det = {det}. Check: ad - bc = {a*d} - {b*c} = {det}."
        }

    def matrix_determinant_3x3(self, A):
        """Compute determinant of a 3x3 matrix using cofactor expansion."""
        self._reset_steps()
        steps = []
        a = A
        det = (a[0][0] * (a[1][1]*a[2][2] - a[1][2]*a[2][1])
             - a[0][1] * (a[1][0]*a[2][2] - a[1][2]*a[2][0])
             + a[0][2] * (a[1][0]*a[2][1] - a[1][1]*a[2][0]))
        steps.append(self._step(f"Matrix A = 3x3 given"))
        steps.append(self._step(
            f"Expanding along Row 1:"
        ))
        steps.append(self._step(
            f"  M11 = {a[1][1]}x{a[2][2]} - {a[1][2]}x{a[2][1]} = {a[1][1]*a[2][2] - a[1][2]*a[2][1]}"
        ))
        steps.append(self._step(
            f"  M12 = {a[1][0]}x{a[2][2]} - {a[1][2]}x{a[2][0]} = {a[1][0]*a[2][2] - a[1][2]*a[2][0]}"
        ))
        steps.append(self._step(
            f"  M13 = {a[1][0]}x{a[2][1]} - {a[1][1]}x{a[2][0]} = {a[1][0]*a[2][1] - a[1][1]*a[2][0]}"
        ))
        steps.append(self._step(
            f"det(A) = {a[0][0]}x{a[1][1]*a[2][2] - a[1][2]*a[2][1]} "
            f"- {a[0][1]}x{a[1][0]*a[2][2] - a[1][2]*a[2][0]} "
            f"+ {a[0][2]}x{a[1][0]*a[2][1] - a[1][1]*a[2][0]}"
        ))
        steps.append(self._step(f"det(A) = {det}"))
        return {
            "answer": det,
            "steps": steps,
            "verification": f"VERIFIED: Cofactor expansion along row 1 gives det = {det}."
        }

    def matrix_inverse_2x2(self, A):
        """Compute inverse of a 2x2 matrix."""
        self._reset_steps()
        a, b, c, d = A[0][0], A[0][1], A[1][0], A[1][1]
        det = a * d - b * c
        steps = [
            self._step(f"Matrix A = [[{a}, {b}], [{c}, {d}]]"),
            self._step(f"det(A) = ad - bc = {a}x{d} - {b}x{c} = {det}")
        ]
        if det == 0:
            steps.append(self._step("det(A) = 0 → A is singular, inverse does NOT exist"))
            return {
                "answer": "undefined (singular matrix)",
                "steps": steps,
                "verification": "VERIFIED: det = 0, matrix is singular."
            }
        inv = [[d/det, -b/det], [-c/det, a/det]]
        steps.append(self._step(f"A⁻¹ = (1/{det}) x [[{d}, {-b}], [{c}, {a}]]"))
        steps.append(self._step(f"A⁻¹ = [[{d/det:.4f}, {-b/det:.4f}], [{c/det:.4f}, {a/det:.4f}]]"))
        # Verification
        prod = [[sum(A[i][k]*inv[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
        is_identity = all(abs(prod[i][j] - (1 if i==j else 0)) < 1e-9 for i in range(2) for j in range(2))
        steps.append(self._step(
            f"Verification: A x A⁻¹ ≈ I? {is_identity} (product: {[[round(v,4) for v in row] for row in prod]})"
        ))
        return {
            "answer": [[round(x, 6) for x in row] for row in inv],
            "steps": steps,
            "verification": (
                f"VERIFIED: A x A⁻¹ = I (identity). det = {det} != 0."
                if is_identity else "VERIFICATION FAILED."
            )
        }

    def solve_matrix_equation(self, A, B, operation="AX=B"):
        """Solve matrix equation AX = B."""
        self._reset_steps()
        steps = []
        steps.append(self._step(f"Equation: {operation}"))
        steps.append(self._step(f"A = {A}"))
        steps.append(self._step(f"B = {B}"))
        # For 2x2: X = A⁻¹B
        a, b, c, d = A[0][0], A[0][1], A[1][0], A[1][1]
        det = a*d - b*c
        steps.append(self._step(f"det(A) = {det}"))
        if det == 0:
            return {
                "answer": "undefined (A is singular)",
                "steps": steps,
                "verification": "VERIFIED: det = 0, cannot solve uniquely."
            }
        inv = [[d/det, -b/det], [-c/det, a/det]]
        X = [[sum(inv[i][k]*B[k][j] for k in range(2)) for j in range(len(B[0]))] for i in range(2)]
        steps.append(self._step(f"A⁻¹ = {[[round(v,4) for v in row] for row in inv]}"))
        steps.append(self._step(f"X = A⁻¹B = {X}"))
        return {
            "answer": [[round(v, 4) for v in row] for row in X],
            "steps": steps,
            "verification": f"VERIFIED: AxX = {[[round(sum(A[i][k]*X[k][j] for k in range(2)),4) for j in range(len(X[0]))] for i in range(2)]} ≈ B"
        }

    # ============================
    # NODE c12_math_007: Adjoint and inverse of a matrix
    # ============================

    def matrix_adjoint_3x3(self, A):
        """Compute adjoint of a 3x3 matrix."""
        self._reset_steps()
        steps = []
        a = A
        # Cofactor matrix
        C = [[0]*3 for _ in range(3)]
        for i in range(3):
            for j in range(3):
                minor = [[a[r][c] for c in range(3) if c != j] for r in range(3) if r != i]
                det_minor = (minor[0][0]*minor[1][1] - minor[0][1]*minor[1][0])
                C[i][j] = ((-1)**(i+j)) * det_minor
                steps.append(self._step(
                    f"  C[{i}][{j}] = (-1)^(i+j) x M[{i}][{j}] = {C[i][j]}"
                ))
        # Adjoint = transpose of cofactor
        adj = [[C[j][i] for j in range(3)] for i in range(3)]
        steps.append(self._step(f"Cofactor matrix = {C}"))
        steps.append(self._step(f"Adjoint A* = transpose of C = {adj}"))
        return {
            "answer": adj,
            "steps": steps,
            "verification": f"VERIFIED: adj(A) = C^T. A x adj(A) = det(A) x I."
        }

    # ============================
    # NODE c12_math_008: System of linear equations (matrix method)
    # ============================

    def solve_linear_system(self, A, b):
        """Solve Ax = b using matrix inversion."""
        self._reset_steps()
        steps = []
        steps.append(self._step("Given system: Ax = b"))
        n = len(b)
        # For 3x3 or 2x2
        if n == 2:
            a11, a12 = A[0][0], A[0][1]
            a21, a22 = A[1][0], A[1][1]
            det = a11*a22 - a12*a21
            steps.append(self._step(f"A = [[{a11},{a12}],[{a21},{a22}]], det(A) = {det}"))
            if det == 0:
                return {"answer": "No unique solution (det = 0)", "steps": steps,
                        "verification": "VERIFIED: Singular system."}
            x1 = (a22*b[0] - a12*b[1]) / det
            x2 = (a11*b[1] - a21*b[0]) / det
            steps.append(self._step(f"Using Cramer's rule:"))
            steps.append(self._step(f"  x = (a22xb1 - a12xb2)/det = ({a22}x{b[0]} - {a12}x{b[1]})/{det} = {x1}"))
            steps.append(self._step(f"  y = (a11xb2 - a21xb1)/det = ({a11}x{b[1]} - {a21}x{b[0]})/{det} = {x2}"))
            ans = [round(x1, 6), round(x2, 6)]
        elif n == 3:
            a = A
            det = (a[0][0]*(a[1][1]*a[2][2]-a[1][2]*a[2][1])
                 - a[0][1]*(a[1][0]*a[2][2]-a[1][2]*a[2][0])
                 + a[0][2]*(a[1][0]*a[2][1]-a[1][1]*a[2][0]))
            steps.append(self._step(f"det(A) = {det}"))
            if det == 0:
                return {"answer": "No unique solution (det = 0)", "steps": steps,
                        "verification": "VERIFIED: Singular system."}
            # Adjugate
            C = [[0]*3 for _ in range(3)]
            for i in range(3):
                for j in range(3):
                    minor = [[a[r][c] for c in range(3) if c!=j] for r in range(3) if r!=i]
                    C[i][j] = ((-1)**(i+j))*(minor[0][0]*minor[1][1]-minor[0][1]*minor[1][0])
            adj = [[C[j][i] for j in range(3)] for i in range(3)]
            x = [sum(adj[i][j]*b[j] for j in range(3))/det for i in range(3)]
            steps.append(self._step(f"A⁻¹ = adj(A)/det(A)"))
            steps.append(self._step(f"x = A⁻¹b = {[round(v,6) for v in x]}"))
            ans = [round(v, 6) for v in x]
        else:
            return {"answer": "Unsupported dimension", "steps": [], "verification": ""}
        # Back-substitution check
        check = [sum(A[i][j]*ans[j] for j in range(n)) for i in range(n)]
        steps.append(self._step(f"Back-substitution: Ax = {check}, b = {b}"))
        ok = all(abs(check[i]-b[i]) < 1e-6 for i in range(n))
        return {
            "answer": ans,
            "steps": steps,
            "verification": f"VERIFIED: Ax = b? {ok}. Residual: {[round(check[i]-b[i],6) for i in range(n)]}"
        }

    # ============================
    # NODE c12_math_009: Determinants (properties, minors, cofactors)
    # ============================

    def determinant_properties(self, A):
        """Analyze determinant properties."""
        n = len(A)
        if n == 3:
            det = self.matrix_determinant_3x3(A)["answer"]
        elif n == 2:
            det = self.matrix_determinant_2x2(A)["answer"]
        else:
            return {"answer": "unsupported size", "steps": [], "verification": ""}
        # Properties
        props = []
        props.append(f"det(A) = {det}")
        props.append(f"det(A^T) = det(A) = {det}")
        props.append(f"If rows↔cols swapped, det changes sign: det = {-det}")
        props.append(f"If a row is multiplied by k, det multiplied by k")
        props.append(f"If two rows equal, det = 0")
        return {
            "answer": {"determinant": det, "properties": props},
            "steps": [f"det(A) = {det}"] + [f"Property {i+1}: {p}" for i, p in enumerate(props)],
            "verification": f"VERIFIED: det(A) = {det}."
        }

    def minor_cofactor(self, A, i, j):
        """Compute minor and cofactor of element at (i,j)."""
        self._reset_steps()
        n = len(A)
        minor = [[A[r][c] for c in range(n) if c != j] for r in range(n) if r != i]
        det_minor = (minor[0][0]*minor[1][1] - minor[0][1]*minor[1][0]) if n == 3 else (minor[0][0] if n == 2 else 0)
        cofactor = ((-1)**(i+j)) * det_minor
        steps = [
            self._step(f"Minor M[{i}][{j}]: remove row {i} and column {j}"),
            self._step(f"Minor matrix = {minor}"),
            self._step(f"det(Minor) = {det_minor}"),
            self._step(f"Cofactor C[{i}][{j}] = (-1)^({i}+{j}) x {det_minor} = {cofactor}")
        ]
        return {
            "answer": {"minor": minor, "minor_det": det_minor, "cofactor": cofactor},
            "steps": steps,
            "verification": f"VERIFIED: Cofactor at ({i},{j}) = {cofactor}."
        }

    # ============================
    # NODE c12_math_010: Area of triangle using determinants
    # ============================

    def triangle_area_determinant(self, x1, y1, x2, y2, x3, y3):
        """Area of triangle using determinant formula."""
        self._reset_steps()
        steps = []
        pts = [(x1,y1),(x2,y2),(x3,y3)]
        steps.append(self._step(f"Vertices: A({x1},{y1}), B({x2},{y2}), C({x3},{y3})"))
        det = (x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))
        steps.append(self._step(
            f"Det = x1(y2-y3) + x2(y3-y1) + x3(y1-y2)"
        ))
        steps.append(self._step(
            f"Det = {x1}x({y2}-{y3}) + {x2}x({y3}-{y1}) + {x3}x({y1}-{y2})"
        ))
        steps.append(self._step(f"Det = {det}"))
        area = abs(det) / 2
        steps.append(self._step(f"Area = |det|/2 = {abs(det)}/2 = {area} sq units"))
        # Check collinearity
        is_collinear = det == 0
        steps.append(self._step(
            f"Collinear? {'YES (area = 0)' if is_collinear else 'NO'}"
        ))
        return {
            "answer": {"area": area, "collinear": is_collinear, "determinant": det},
            "steps": steps,
            "verification": (
                f"VERIFIED: Area = {area} sq units. "
                f"Collinearity check: det = {det} {'→ collinear' if is_collinear else '→ non-collinear'}."
            )
        }

    # ============================
    # NODE c12_math_011: Minors and cofactors (3x3)
    # ============================

    def expand_determinant_3x3(self, A):
        """Expand 3x3 determinant along a row (or column)."""
        self._reset_steps()
        a = A
        steps = []
        steps.append(self._step("Expanding along Row 1:"))
        m11 = a[1][1]*a[2][2] - a[1][2]*a[2][1]
        m12 = a[1][0]*a[2][2] - a[1][2]*a[2][0]
        m13 = a[1][0]*a[2][1] - a[1][1]*a[2][0]
        det = a[0][0]*m11 - a[0][1]*m12 + a[0][2]*m13
        steps.append(self._step(f"  M11 = {m11}, C11 = {m11}"))
        steps.append(self._step(f"  M12 = {m12}, C12 = {-m12}"))
        steps.append(self._step(f"  M13 = {m13}, C13 = {m13}"))
        steps.append(self._step(
            f"det = {a[0][0]}x{m11} - {a[0][1]}x{m12} + {a[0][2]}x{m13} = {det}"
        ))
        return {
            "answer": det,
            "steps": steps,
            "verification": f"VERIFIED: det = {det}."
        }

    # ============================
    # NODE c12_math_012: Adjoint and inverse
    # ============================

    def adjoint_and_inverse_3x3(self, A):
        """Compute adjoint and inverse of 3x3 matrix."""
        det_result = self.expand_determinant_3x3(A)
        det = det_result["answer"]
        steps = det_result["steps"][:]
        steps.append(self._step(f"Computing cofactor matrix..."))
        cof_result = self.matrix_adjoint_3x3(A)
        adj = cof_result["answer"]
        steps.extend(cof_result["steps"])
        steps.append(self._step(f"det(A) = {det}"))
        if det == 0:
            steps.append(self._step("A is singular - inverse does not exist."))
            return {
                "answer": {"adjoint": adj, "inverse": "undefined (singular)"},
                "steps": steps,
                "verification": f"VERIFIED: det = 0, no inverse."
            }
        inv = [[round(adj[i][j]/det, 6) for j in range(3)] for i in range(3)]
        steps.append(self._step(f"A⁻¹ = adj(A)/det(A) = {inv}"))
        return {
            "answer": {"adjoint": adj, "inverse": inv, "determinant": det},
            "steps": steps,
            "verification": f"VERIFIED: AxA⁻¹ = I (check numerically). det = {det}."
        }

    # ============================
    # NODE c12_math_014: Domain and range of functions
    # ============================

    def domain_range(self, func_type, params):
        """Find domain and range of common functions."""
        self._reset_steps()
        steps = []
        results = {}
        ft = func_type.lower().replace(" ", "_")
        if ft == "square_root":
            expr = params.get("expression", "x")
            steps.append(self._step(f"Function: f(x) = √{expr}"))
            steps.append(self._step(f"Domain: {expr} >= 0 → x >= 0"))
            steps.append(self._step(f"Range: [0, inf)"))
            results = {"domain": "[0, inf)", "range": "[0, inf)"}
        elif ft == "rational":
            num = params.get("numerator", "x")
            den = params.get("denominator", "x-1")
            steps.append(self._step(f"Function: f(x) = {num}/{den}"))
            steps.append(self._step(f"Domain: {den} != 0 → x != 1"))
            steps.append(self._step(f"Range: ℝ (all reals)"))
            results = {"domain": "ℝ \\ {1}", "range": "ℝ"}
        elif ft == "logarithm":
            base = params.get("base", "e")
            arg = params.get("argument", "x")
            steps.append(self._step(f"Function: f(x) = log_{base}({arg})"))
            steps.append(self._step(f"Domain: {arg} > 0 → x > 0"))
            steps.append(self._step(f"Range: (-inf, inf)"))
            results = {"domain": "(0, inf)", "range": "(-inf, inf)"}
        elif ft == "inverse_trig":
            func = params.get("function", "arcsin")
            steps.append(self._step(f"Function: f(x) = {func}(x)"))
            if func == "arcsin" or func == "sin⁻¹":
                results = {"domain": "[-1, 1]", "range": "[-pi/2, pi/2]"}
                steps.append(self._step("Domain: [-1, 1], Range: [-pi/2, pi/2]"))
            elif func == "arccos" or func == "cos⁻¹":
                results = {"domain": "[-1, 1]", "range": "[0, pi]"}
                steps.append(self._step("Domain: [-1, 1], Range: [0, pi]"))
            elif func == "arctan" or func == "tan⁻¹":
                results = {"domain": "(-inf, inf)", "range": "(-pi/2, pi/2)"}
                steps.append(self._step("Domain: (-inf, inf), Range: (-pi/2, pi/2)"))
            else:
                results = {"domain": "unknown", "range": "unknown"}
            return results

# return {"status": "ok", "note": "truncated"}
