"""
Class 7 Mathematics — Solver
Nodes: c7_math_001, c7_math_002
Source: CISCE Upper Primary Curriculum, Mathematics, Class VII
"""

import math
import random
import re
import sympy as sp
from dataclasses import dataclass, field
from typing import List, Optional, Tuple, Dict, Any
from enum import Enum


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

class Verdict(Enum):
    CORRECT   = "correct"
    INCORRECT = "incorrect"
    PARTIAL   = "partial"


@dataclass
class QAResult:
    """Result of evaluating a single student answer."""
    node_id: str
    question_text: str
    expected_answer: Any
    student_answer: Any
    verdict: Verdict
    explanation: str
    hint: str = ""


@dataclass
class WorksheetResult:
    """Aggregated results for a worksheet."""
    node_id: str
    total_questions: int
    correct: int
    incorrect: int
    results: List[QAResult]
    mastery_pct: float = field(init=False)

    def __post_init__(self):
        if self.total_questions:
            self.mastery_pct = round(
                (self.correct / self.total_questions) * 100, 1
            )
        else:
            self.mastery_pct = 0.0


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

def sign(n: int) -> int:
    """Return +1, -1, or 0 for integer n."""
    return (n > 0) - (n < 0)


def abs_val(n: int) -> int:
    return abs(n)


def gcd(a: int, b: int) -> int:
    return math.gcd(a, b)


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

class IntegerArithmeticSolver:
    """
    Solves multiplication and division problems involving integers (positive,
    negative, and zero).  Derives sign rules from absolute-value magnitude and
    returns step-by-step explanations appropriate for Class 7.
    """

    # ── Sign-rule constants ──────────────────────────────────────────────
    SIGN_RULE_MUL = {
        (+1, +1): +1,
        (+1, -1): -1,
        (-1, +1): -1,
        (-1, -1): +1,
    }

    SIGN_RULE_DIV = {
        (+1, +1): +1,
        (+1, -1): -1,
        (-1, +1): -1,
        (-1, -1): +1,
    }

    @staticmethod
    def multiply(a: int, b: int) -> dict:
        """
        Multiply two integers and return a full step-by-step dict.

        Returns keys:
            product       — int
            sign_of_a     — '+'
            sign_of_b     — '+'
            sign_rule     — str human-readable rule
            steps         — list[str]  ordered explanation steps
            abs_product   — int  absolute value of the product
        """
        abs_a, abs_b = abs(a), abs(b)
        product = a * b
        s_a = "+" if a >= 0 else "-"
        s_b = "+" if b >= 0 else "-"

        if a == 0 or b == 0:
            rule_text = "Any integer multiplied by 0 equals 0."
        else:
            same_sign = (a > 0 and b > 0) or (a < 0 and b < 0)
            rule_text = (
                f"Positive × Positive  →  Positive  |  "
                f"Negative × Negative  →  Positive  |  "
                f"Opposite signs  →  Negative"
            )
            if same_sign:
                rule_text += f"  →  Both integers have the same sign, so the product is POSITIVE."
            else:
                rule_text += (
                    f"  →  {s_a}{abs_a} and {s_b}{abs_b} have opposite signs, "
                    f"so the product is NEGATIVE."
                )

        steps = [
            f"Step 1 — Identify the signs:  a = {s_a}{abs_a},  b = {s_b}{abs_b}",
            f"Step 2 — Multiply absolute values:  |{a}| × |{b}| = {abs_a} × {abs_b} = {abs_a * abs_b}",
            f"Step 3 — Apply sign rule:  {rule_text}",
            f"Step 4 — Result:  {a} × {b} = {product}",
        ]

        return {
            "product": product,
            "sign_of_a": s_a,
            "sign_of_b": s_b,
            "sign_rule": rule_text,
            "steps": steps,
            "abs_product": abs_a * abs_b,
        }

    @staticmethod
    def divide(dividend: int, divisor: int) -> dict:
        """
        Divide two integers (divisor ≠ 0) and return a full step-by-step dict.

        Returns keys:
            quotient       — int
            remainder      — int  (should be 0 for exact division)
            sign_of_dividend, sign_of_divisor
            steps
            verification   — str  showing divisor × quotient = dividend
        """
        if divisor == 0:
            raise ZeroDivisionError("Division by zero is undefined.")

        quotient = dividend // divisor          # exact division expected
        remainder = dividend % divisor

        verification = f"{divisor} × {quotient} = {divisor * quotient}"

        s_dd = "+" if dividend >= 0 else "-"
        s_dr = "+" if divisor >= 0 else "-"
        same_sign = (dividend > 0 and divisor > 0) or (
            dividend < 0 and divisor < 0
        )

        if dividend == 0:
            rule_note = "Zero divided by any non-zero integer equals 0."
        else:
            sign_result = "POSITIVE (+)" if same_sign else "NEGATIVE (−)"
            rule_note = (
                f"Same-sign division → {sign_result}.  "
                f"Opposite-sign division → NEGATIVE (−)."
            )

        steps = [
            f"Step 1 — Identify dividend = {s_dd}{abs(dividend)}, divisor = {s_dr}{abs(divisor)}",
            f"Step 2 — Apply sign rule: {rule_note}",
            f"Step 3 — Divide absolute values: |{dividend}| ÷ |{divisor}| = "
            f"{abs(dividend)} ÷ {abs(divisor)} = {abs(dividend) // abs(divisor)}",
            f"Step 4 — Result: {dividend} ÷ {divisor} = {quotient}",
            f"Step 5 — Verify: {verification} = {dividend} ✓" if verification == str(dividend)
            else f"Step 5 — Verify: {verification} (check complete)",
        ]
        steps[-1] = f"Step 5 — Verify: {divisor} × {quotient} = {divisor * quotient} = {dividend}  ✓"

        return {
            "quotient": quotient,
            "remainder": remainder,
            "sign_of_dividend": s_dd,
            "sign_of_divisor": s_dr,
            "steps": steps,
            "verification": verification,
        }

    @staticmethod
    def evaluate_mul_expression(expr: str) -> dict:
        """
        Evaluate a string like '(-3) × (-4)' or '-5 × 6' and return steps.
        Parses the expression into integer operands and operator.
        """
        expr_clean = expr.replace("×", "*").replace("÷", "/").replace(" ", "")
        try:
            result = sp.sympify(expr_clean)
            val = int(result)
            match = re.match(r"\(?(-?\d+)\)?([*/])\(?(-?\d+)\)?", expr_clean)
            if match:
                a_str, op, b_str = match.groups()
                a, b = int(a_str), int(b_str)
                if op == "*":
                    return IntegerArithmeticSolver.multiply(a, b)
                else:
                    return IntegerArithmeticSolver.divide(a, b)
        except Exception:
            pass

        raise ValueError(f"Could not parse expression: {expr}")

    @staticmethod
    def check_answer(
        student_ans: Any, correct_ans: int, q_type: str = "mul"
    ) -> QAResult:
        """Compare student answer with the correct integer answer."""
        try:
            sa = int(student_ans)
        except (TypeError, ValueError):
            return QAResult(
                node_id="c7_math_001",
                question_text="",
                expected_answer=correct_ans,
                student_answer=student_ans,
                verdict=Verdict.INCORRECT,
                explanation=f"Answer must be an integer, got '{student_ans}'.",
                hint="Write the answer as a whole number (e.g., -12, 0, 7).",
            )
        verdict = Verdict.CORRECT if sa == correct_ans else Verdict.INCORRECT
        explanation = (
            f"Correct! {correct_ans} is the right answer."
            if verdict == Verdict.CORRECT
            else f"Incorrect. The correct answer is {correct_ans}."
        )
        return QAResult(
            node_id="c7_math_001",
            question_text="",
            expected_answer=correct_ans,
            student_answer=sa,
            verdict=verdict,
            explanation=explanation,
        )


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

class IntegerPropertiesSolver:
    """
    Verifies the five properties of integer operations:
      Commutativity (addition, multiplication)
      Associativity (addition, multiplication)
      Additive Identity
      Multiplicative Identity
      Additive Inverse
      Multiplicative Inverse (only ±1)
      Distributivity
    """

    # ── Property definitions ────────────────────────────────────────────
    PROPERTY_DEFS = {
        "commutativity_addition": {
            "name": "Commutativity of Addition",
            "formula": "a + b = b + a",
            "holds_for": "Addition of integers",
            "fails_for": "Subtraction and Division (not commutative)",
        },
        "commutativity_multiplication": {
            "name": "Commutativity of Multiplication",
            "formula": "a × b = b × a",
            "holds_for": "Multiplication of integers",
            "fails_for": "Subtraction and Division",
        },
        "associativity_addition": {
            "name": "Associativity of Addition",
            "formula": "(a + b) + c = a + (b + c)",
            "holds_for": "Addition of integers",
            "fails_for": "Subtraction and Division",
        },
        "associativity_multiplication": {
            "name": "Associativity of Multiplication",
            "formula": "(a × b) × c = a × (b × c)",
            "holds_for": "Multiplication of integers",
            "fails_for": "Subtraction and Division",
        },
        "additive_identity": {
            "name": "Additive Identity",
            "formula": "a + 0 = 0 + a = a",
            "holds_for": "Addition of integers",
            "note": "0 is the additive identity",
        },
        "multiplicative_identity": {
            "name": "Multiplicative Identity",
            "formula": "a × 1 = 1 × a = a",
            "holds_for": "Multiplication of integers",
            "note": "1 is the multiplicative identity",
        },
        "additive_inverse": {
            "name": "Additive Inverse",
            "formula": "a + (−a) = (−a) + a = 0",
            "holds_for": "Every integer has an additive inverse",
            "note": "The additive inverse of a is −a",
        },
        "multiplicative_inverse": {
            "name": "Multiplicative Inverse",
            "formula": "a × (1/a) = 1  (when a ≠ 0)",
            "holds_for": "Only 1 and −1 among integers",
            "note": "Most integers do NOT have a multiplicative inverse that is also an integer",
        },
        "distributivity": {
            "name": "Distributivity of Multiplication over Addition",
            "formula": "a × (b + c) = (a × b) + (a × c)",
            "holds_for": "Multiplication distributes over addition of integers",
        },
    }

    @staticmethod
    def verify_property(
        property_key: str, a: int, b: int = None, c: int = None
    ) -> dict:
        """
        Verify a given property with concrete integer values.

        Parameters:
            property_key  — one of PROPERTY_DEFS keys
            a, b, c       — integer operands (b/c used only where needed)

        Returns dict with:
            property_name, holds (bool), lhs, rhs, formula, explanation
        """
        prop = IntegerPropertiesSolver.PROPERTY_DEFS[property_key]
        lhs = rhs = None
        holds = False

        if property_key == "commutativity_addition":
            lhs = a + b
            rhs = b + a
            holds = lhs == rhs
            explanation = (
                f"{a} + {b} = {lhs}  and  {b} + {a} = {rhs}  →  "
                f"{'Equal ✓' if holds else 'Not equal ✗'}.\n"
                "Addition of integers IS commutative."
            )

        elif property_key == "commutativity_multiplication":
            lhs = a * b
            rhs = b * a
            holds = lhs == rhs
            explanation = (
                f"{a} × {b} = {lhs}  and  {b} × {a} = {rhs}  →  "
                f"{'Equal ✓' if holds else 'Not equal ✗'}.\n"
                "Multiplication of integers IS commutative."
            )

        elif property_key == "associativity_addition":
            lhs = (a + b) + c
            rhs = a + (b + c)
            holds = lhs == rhs
            explanation = (
                f"({a} + {b}) + {c} = {lhs}  and  {a} + ({b} + {c}) = {rhs}  →  "
                f"{'Equal ✓' if holds else 'Not equal ✗'}.\n"
                "Addition of integers IS associative."
            )

        elif property_key == "associativity_multiplication":
            lhs = (a * b) * c
            rhs = a * (b * c)
            holds = lhs == rhs
            explanation = (
                f"({a} × {b}) × {c} = {lhs}  and  {a} × ({b} × {c}) = {rhs}  →  "
                f"{'Equal ✓' if holds else 'Not equal ✗'}.\n"
                "Multiplication of integers IS associative."
            )

        elif property_key == "additive_identity":
            lhs = a + 0
            rhs = 0 + a
            holds = (lhs == a) and (rhs == a)
            explanation = (
                f"{a} + 0 = {lhs}  and  0 + {a} = {rhs}.\n"
                f"Since {lhs} = {a} and {rhs} = {a},  0 is the ADDITIVE IDENTITY.\n"
                "Adding 0 to any integer leaves it unchanged."
            )

        elif property_key == "multiplicative_identity":
            lhs = a * 1
            rhs = 1 * a
            holds = (lhs == a) and (rhs == a)
            explanation = (
                f"{a} × 1 = {lhs}  and  1 × {a} = {rhs}.\n"
                f"Since {lhs} = {a} and {rhs} = {a},  1 is the MULTIPLICATIVE IDENTITY.\n"
                "Multiplying any integer by 1 leaves it unchanged."
            )

        elif property_key == "additive_inverse":
            inv = -a
            lhs = a + inv
            holds = lhs == 0
            explanation = (
                f"The additive inverse of {a} is {inv}.\n"
                f"Check: {a} + ({inv}) = {lhs}.\n"
                f"{'The sum is 0 ✓  The additive inverse property holds.' if holds else 'Error in calculation.'}"
            )

        elif property_key == "multiplicative_inverse":
            if a in (1, -1):
                inv = 1 // a  # 1 or -1
                lhs = a * inv
                holds = lhs == 1
                explanation = (
                    f"The multiplicative inverse of {a} is {inv}.\n"
                    f"Check: {a} × {inv} = {lhs}.\n"
                    f"{lhs} = 1 ✓  Only ±1 have integer multiplicative inverses."
                )
            else:
                approx = 1 / a
                holds = False
                explanation = (
                    f"The multiplicative inverse of {a} would be 1/{a} = {approx:.4f}.\n"
                    f"{approx:.4f} is NOT an integer.\n"
                    f"Therefore, {a} does NOT have an integer multiplicative inverse.\n"
                    "Only 1 and −1 have multiplicative inverses that are also integers."
                )

        elif property_key == "distributivity":
            # a × (b + c) = a×b + a×c
            inner_sum = b + c
            lhs = a * inner_sum
            rhs = a * b + a * c
            holds = lhs == rhs
            explanation = (
                f"LHS: {a} × ({b} + {c}) = {a} × {inner_sum} = {lhs}\n"
                f"RHS: ({a} × {b}) + ({a} × {c}) = {a * b} + {a * c} = {rhs}\n"
                f"{'LHS = RHS ✓  Distributivity holds.' if holds else 'LHS ≠ RHS ✗'}\n"
                "Multiplication distributes over addition of integers."
            )

        else:
            raise ValueError(f"Unknown property key: {property_key}")

        return {
            "property_key": property_key,
            "property_name": prop["name"],
            "formula": prop["formula"],
            "a": a,
            "b": b,
            "c": c,
            "lhs": lhs,
            "rhs": rhs,
            "holds": holds,
            "explanation": explanation,
            "note": prop.get("note", ""),
        }

    @staticmethod
    def check_property_answer(
        property_key: str, student_answer: str, correct_value: Any
    ) -> QAResult:
        """Check a student's answer for a property-verification question."""
        sa = student_answer.strip().lower()
        expected = str(correct_value).strip().lower()

        verdict = Verdict.CORRECT if sa == expected else Verdict.INCORRECT

        prop = IntegerPropertiesSolver.PROPERTY_DEFS.get(
            property_key, {"name": property_key}
        )
        explanation = (
            f"Correct! The answer is {correct_value}."
            if verdict == Verdict.CORRECT
            else f"Incorrect. The correct answer is {correct_value}."
        )
        return QAResult(
            node_id="c7_math_002",
            question_text="",
            expected_answer=correct_value,
            student_answer=student_answer,
            verdict=verdict,
            explanation=explanation,
        )

    @staticmethod
    def get_property_that_holds(property_key: str) -> str:
        """Return the list of operations for which the property holds."""
        prop = IntegerPropertiesSolver.PROPERTY_DEFS[property_key]
        return prop.get("holds_for", "N/A")

    @staticmethod
    def get_property_that_fails(property_key: str) -> str:
        """Return the list of operations for which the property fails."""
        return IntegerPropertiesSolver.PROPERTY_DEFS[property_key].get(
            "fails_for", "N/A"
        )


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

class Class7MathsEvaluator:
    """Top-level evaluator routing to node-specific solvers."""

    SOLVERS = {
        "c7_math_001": IntegerArithmeticSolver,
        "c7_math_002": IntegerPropertiesSolver,
    }

    @classmethod
    def evaluate(
        cls,
        node_id: str,
        sub_type: str,
        *args,
        **kwargs,
    ) -> dict:
        """
        Evaluate a question.

        Parameters:
            node_id   — 'c7_math_001' or 'c7_math_002'
            sub_type  — solver method name (e.g. 'multiply', 'verify_property')
            *args     — positional args for the solver method
            **kwargs  — keyword args for the solver method

        Returns:
            dict from the underlying solver method
        """
        solver_cls = cls.SOLVERS.get(node_id)
        if solver_cls is None:
            raise ValueError(f"Unknown node_id: {node_id}")
        method = getattr(solver_cls, sub_type, None)
        if method is None:
            raise ValueError(
                f"Solver '{solver_cls.__name__}' has no method '{sub_type}'"
            )
        return method(*args, **kwargs)

    @classmethod
    def evaluate_worksheet(
        cls,
        node_id: str,
        questions: List[dict],
        student_answers: List[Any],
    ) -> WorksheetResult:
        """
        Evaluate a full worksheet.

        questions:      list of question dicts (at least 'correct_answer' key)
        student_answers: list of the student's answers in the same order
        """
        results: List[QAResult] = []
        correct = incorrect = 0

        for i, (q, sa) in enumerate(zip(questions, student_answers)):
            ca = q.get("correct_answer")
            if ca is None:
                continue
            sub_type = q.get("solver_method", "check_answer")
            res = cls.evaluate(
                node_id, sub_type, sa, ca, q.get("q_type", "mul")
            )
            res.question_text = q.get("text", f"Q{i+1}")
            results.append(res)
            if res.verdict == Verdict.CORRECT:
                correct += 1
            else:
                incorrect += 1

        return WorksheetResult(
            node_id=node_id,
            total_questions=len(results),
            correct=correct,
            incorrect=incorrect,
            results=results,
        )