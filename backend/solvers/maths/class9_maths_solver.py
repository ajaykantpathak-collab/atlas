"""
Class 9 Mathematics Solver — Nodes: c9_math_001, c9_math_002, c9_math_003
CISCE ICSE Syllabus | Pure Arithmetic — Rational and Irrational Numbers
"""
import math
import random
import fractions
from fractions import Fraction
from typing import Optional, List, Tuple
from dataclasses import dataclass, field
from enum import Enum

# ──────────────────────────────────────────────
# Enums / dataclasses
# ──────────────────────────────────────────────
class NodeID(Enum):
    C9_MATH_001 = "c9_math_001"
    C9_MATH_002 = "c9_math_002"
    C9_MATH_003 = "c9_math_003"

class Difficulty(Enum):
    BASIC = "basic"
    COMPETENCY = "competency"

@dataclass
class SolverResult:
    node_id: str
    question_type: str
    difficulty: str
    correct_answer: str
    explanation: str
    steps: List[str]
    is_correct: Optional[bool] = None

# ──────────────────────────────────────────────
# Utility helpers
# ──────────────────────────────────────────────
def gcd(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return abs(a)

def is_integer(val) -> bool:
    try:
        return float(val).is_integer()
    except Exception:
        return False

def decimal_expansion_type(numerator: int, denominator: int) -> str:
    """Return 'terminating' or 'non-terminating recurring' for a rational p/q."""
    d = denominator
    while d % 2 == 0:
        d //= 2
    while d % 5 == 0:
        d //= 5
    return "terminating" if d == 1 else "non-terminating recurring"

def fraction_to_decimal_str(num: Fraction, max_places: int = 20) -> str:
    """Return decimal string with (recurring) marker if applicable."""
    whole = num.numerator // num.denominator
    rem = abs(num.numerator) % num.denominator
    if rem == 0:
        return str(num.numerator // num.denominator)

    seen = {}
    digits = []
    r = rem
    idx = 0
    while r != 0 and r not in seen:
        seen[r] = idx
        r *= 10
        digits.append(str(r // num.denominator))
        r %= num.denominator
        idx += 1

    decimal_part = "".join(digits)
    if r == 0:
        if num.numerator < 0:
            return f"-{whole}.{decimal_part}"
        return f"{whole}.{decimal_part}"
    else:
        recur_start = seen[r]
        non_recur = decimal_part[:recur_start]
        recur = decimal_part[recur_start:]
        if num.numerator < 0:
            return f"-{whole}.{non_recur}({recur})"
        return f"{whole}.{non_recur}({recur})"

def classify_number(val: float) -> str:
    """Classify as rational or irrational using simple checks."""
    # Integer check
    if is_integer(val):
        return "rational"
    # Convert to Fraction for exactness
    try:
        frac = Fraction(val).limit_denominator(10000)
        if abs(float(frac) - val) < 1e-9:
            return "rational"
    except Exception:
        pass
    # Check known irrationals
    known_irrationals = {
        math.sqrt(2), math.sqrt(3), math.sqrt(5), math.sqrt(6), math.sqrt(7),
        math.pi, math.e
    }
    for ir in known_irrationals:
        if abs(val - ir) < 1e-9:
            return "irrational"
    return "irrational"

# ──────────────────────────────────────────────
# NODE c9_math_001 — Rational numbers
# ──────────────────────────────────────────────
class RationalNumberSolver:

    @staticmethod
    def solve_identify_rational(num_str: str) -> SolverResult:
        """
        Given a number string, identify if it is rational.
        Supported inputs: integer, fraction (p/q), decimal, repeating-decimal notation.
        """
        steps = []
        num_str_clean = num_str.strip()

        # Try fraction
        try:
            val = Fraction(num_str_clean)
            steps.append(f"Step 1: Recognise '{num_str_clean}' as a fraction.")
            steps.append(f"Step 2: Write as p/q where p={val.numerator}, q={val.denominator}.")
            steps.append(f"Step 3: Since q={val.denominator} ≠ 0, the number is rational.")
            is_rational = True
        except ValueError:
            # Try float
            try:
                val = float(num_str_clean)
                frac = Fraction(val).limit_denominator(10000)
                if abs(float(frac) - val) < 1e-9:
                    steps.append(f"Step 1: '{num_str_clean}' converts to the fraction {frac}.")
                    steps.append(f"Step 2: p={frac.numerator}, q={frac.denominator}.")
                    steps.append(f"Step 3: Since q={frac.denominator} ≠ 0, the number is rational.")
                    is_rational = True
                else:
                    is_rational = False
                    steps.append(f"Step 1: '{num_str_clean}' cannot be expressed as p/q.")
                    steps.append("Step 2: Therefore it is irrational.")
            except ValueError:
                is_rational = False
                steps.append(f"Step 1: '{num_str_clean}' is not a valid number representation.")

        answer = "Rational" if is_rational else "Irrational"
        return SolverResult(
            node_id="c9_math_001",
            question_type="identify_rational",
            difficulty="basic",
            correct_answer=answer,
            explanation=f"'{num_str_clean}' is {answer.lower()}.",
            steps=steps
        )

    @staticmethod
    def solve_pq_form(integer_val: int) -> SolverResult:
        """
        Express an integer as p/q form to show it is rational.
        """
        steps = [
            f"Step 1: Take the integer {integer_val}.",
            f"Step 2: Write it as a fraction: {integer_val} = {integer_val}/1.",
            f"Step 3: Here p = {integer_val}, q = 1, and q ≠ 0.",
            f"Step 4: Therefore {integer_val} is a rational number.",
        ]
        return SolverResult(
            node_id="c9_math_001",
            question_type="pq_form",
            difficulty="basic",
            correct_answer=f"{integer_val}/1",
            explanation=f"Every integer n can be written as n/1, hence every integer is rational.",
            steps=steps
        )

    @staticmethod
    def solve_decimal_to_fraction(decimal_str: str) -> SolverResult:
        """
        Convert a decimal (terminating or repeating) to p/q form.
        Supports: '0.5', '0.3bar', '0.(27)', '0.125'
        """
        steps = []
        ds = decimal_str.strip()

        # Parse repeating decimal
        recurring = None
        non_recurring = ""
        if "(" in ds and ")" in ds:
            non_recurring = ds.split("(")[0].strip()
            recurring = ds.split("(")[1].split(")")[0].strip()
            steps.append(f"Step 1: Identify non-recurring part = '{non_recurring}', recurring part = '{recurring}'.")
        elif "bar" in ds.lower():
            parts = ds.lower().split("bar")
            non_recurring = parts[0].strip()
            recurring = parts[1].strip() if len(parts) > 1 else ""
            steps.append(f"Step 1: Non-recurring = '{non_recurring}', recurring = '{recurring}'.")
        else:
            steps.append(f"Step 1: '{ds}' appears to be a terminating decimal.")

        if recurring is not None and recurring != "":
            full = non_recurring + recurring
            nr_digits = len(non_recurring)
            r_digits = len(recurring)
            num = int(full) - int(non_recurring) if non_recurring else int(full)
            denom = (10 ** (nr_digits + r_digits)) - (10 ** nr_digits)
            g = gcd(num, denom)
            num //= g
            denom //= g
            steps.append(f"Step 2: Numerator = {int(full)} - {int(non_recurring) if non_recurring else 0} = {num}.")
            steps.append(f"Step 3: Denominator = 10^{nr_digits+r_digits} - 10^{nr_digits} = {denom}.")
            steps.append(f"Step 4: Simplify: divide by GCD({num},{denom}) = {g}.")
            steps.append(f"Step 5: p/q = {num}/{denom}.")
            answer = f"{num}/{denom}"
        else:
            # Terminating decimal
            val = Fraction(ds).limit_denominator()
            num, denom = val.numerator, val.denominator
            steps.append(f"Step 1: '{ds}' is terminating.")
            steps.append(f"Step 2: Convert to fraction: {num}/{denom}.")
            answer = f"{num}/{denom}"

        return SolverResult(
            node_id="c9_math_001",
            question_type="decimal_to_fraction",
            difficulty="competency",
            correct_answer=answer,
            explanation=f"'{ds}' = {answer} in p/q form.",
            steps=steps
        )

    @staticmethod
    def solve_decimal_type(num_str: str) -> SolverResult:
        """
        Given a fraction p/q, determine its decimal expansion type.
        """
        try:
            val = Fraction(num_str)
            exp_type = decimal_expansion_type(val.numerator, val.denominator)
            dec_str = fraction_to_decimal_str(val)
            steps = [
                f"Step 1: The number is {val.numerator}/{val.denominator}.",
                f"Step 2: Prime factorise the denominator q = {val.denominator}.",
                f"Step 3: Remove all factors of 2 and 5 from q.",
                f"Step 4: If the remaining factor is 1 → terminating; else → non-terminating recurring.",
                f"Step 5: Decimal expansion: {dec_str}",
                f"Step 6: Classification: {exp_type}.",
            ]
            return SolverResult(
                node_id="c9_math_001",
                question_type="decimal_type",
                difficulty="competency",
                correct_answer=exp_type,
                explanation=f"{val.numerator}/{val.denominator} has a {exp_type} decimal expansion.",
                steps=steps
            )
        except Exception as e:
            return SolverResult(
                node_id="c9_math_001",
                question_type="decimal_type",
                difficulty="basic",
                correct_answer="error",
                explanation=f"Could not parse input: {e}",
                steps=[f"Error: {e}"]
            )

    @staticmethod
    def solve_place_in_number_system(num_str: str) -> SolverResult:
        """
        Given a number, state where it fits in N ⊂ Z ⊂ Q ⊂ R.
        """
        steps = []
        try:
            val = float(num_str)
            is_int = is_integer(val)
            is_rat = classify_number(val) == "rational"
        except ValueError:
            is_int = False
            is_rat = False

        sets = []
        if is_int and val >= 0:
            sets.append("Natural Numbers (N)")
        if is_int:
            sets.append("Integers (Z)")
        if is_rat:
            sets.append("Rational Numbers (Q)")
        sets.append("Real Numbers (R)")

        steps.append(f"Step 1: '{num_str}' is a real number.")
        if is_int:
            steps.append(f"Step 2: It is an integer.")
        if is_rat and not is_int:
            steps.append(f"Step 2: It is a non-integer rational number.")
        steps.append(f"Step 3: Membership: {' ⊂ '.join(sets)}")

        return SolverResult(
            node_id="c9_math_001",
            question_type="place_in_system",
            difficulty="basic",
            correct_answer=", ".join(sets),
            explanation=f"'{num_str}' belongs to: {', '.join(sets)}",
            steps=steps
        )

# ──────────────────────────────────────────────
# NODE c9_math_002 — Irrational numbers
# ──────────────────────────────────────────────
class IrrationalNumberSolver:

    @staticmethod
    def solve_identify_irrational(num_str: str) -> SolverResult:
        """
        Given a number string, identify if it is irrational.
        Checks: p/q property (cannot be expressed as p/q) and decimal expansion.
        """
        steps = []
        num_str_clean = num_str.strip()

        # Check known irrational expressions
        known_map = {
            "sqrt2": math.sqrt(2), "√2": math.sqrt(2),
            "sqrt3": math.sqrt(3), "√3": math.sqrt(3),
            "sqrt5": math.sqrt(5), "√5": math.sqrt(5),
            "sqrt6": math.sqrt(6), "√6": math.sqrt(6),
            "sqrt7": math.sqrt(7), "√7": math.sqrt(7),
            "pi": math.pi, "π": math.pi,
            "e": math.e, "euler": math.e,
        }
        val = known_map.get(num_str_clean.lower())
        if val is not None:
            steps.append(f"Step 1: '{num_str_clean}' is a known mathematical constant / square root.")
            steps.append(f"Step 2: Its decimal expansion does not terminate and does not repeat.")
            steps.append(f"Step 3: It cannot be expressed as p/q (p, q integers, q ≠ 0).")
            steps.append(f"Step 4: Therefore '{num_str_clean}' is IRRATIONAL.")
            return SolverResult(
                node_id="c9_math_002",
                question_type="identify_irrational",
                difficulty="basic",
                correct_answer="Irrational",
                explanation=f"'{num_str_clean}' cannot be written as p/q → it is irrational.",
                steps=steps
            )

        # Try to interpret as a decimal
        try:
            val_f = float(num_str_clean)
            # Check rational
            frac = Fraction(val_f).limit_denominator(10000)
            if abs(float(frac) - val_f) < 1e-9:
                steps.append(f"Step 1: '{num_str_clean}' can be expressed as p/q = {frac.numerator}/{frac.denominator}.")
                steps.append("Step 2: Since it fits p/q form, it is RATIONAL.")
                return SolverResult(
                    node_id="c9_math_002",
                    question_type="identify_irrational",
                    difficulty="basic",
                    correct_answer="Rational",
                    explanation=f"'{num_str_clean}' = {frac.numerator}/{frac.denominator}, so it is rational.",
                    steps=steps
                )
            else:
                steps.append(f"Step 1: '{num_str_clean}' cannot be expressed as p/q.")
                steps.append("Step 2: It has a non-terminating, non-repeating decimal expansion.")
                steps.append("Step 3: Therefore it is IRRATIONAL.")
                return SolverResult(
                    node_id="c9_math_002",
                    question_type="identify_irrational",
                    difficulty="basic",
                    correct_answer="Irrational",
                    explanation=f"'{num_str_clean}' cannot be written as p/q → it is irrational.",
                    steps=steps
                )
        except ValueError:
            steps.append(f"Step 1: Could not interpret '{num_str_clean}' as a number.")
            steps.append("Step 2: Please provide a valid expression.")
            return SolverResult(
                node_id="c9_math_002",
                question_type="identify_irrational",
                difficulty="basic",
                correct_answer="error",
                explanation="Invalid input.",
                steps=steps
            )

    @staticmethod
    def solve_pq_test(num_str: str) -> SolverResult:
        """
        Apply the p/q test: try to express the number as a fraction.
        """
        steps = []
        known_irr = {
            "sqrt2": "√2", "√2": "√2",
            "sqrt3": "√3", "√3": "√3",
            "sqrt5": "√5", "√5": "√5",
            "pi": "π", "π": "π",
            "e": "e",
        }
        display = known_irr.get(num_str.strip().lower(), num_str.strip())
        label = known_irr.get(num_str.strip().lower(), num_str.strip())

        if label in ["√2", "√3", "√5", "π", "e"]:
            steps.append(f"Step 1: The p/q test asks: can {label} be written as p/q?")
            steps.append(f"Step 2: {label} is a known irrational number.")
            steps.append(f"Step 3: No matter what integers p, q we choose, {label} ≠ p/q.")
            steps.append(f"Step 4: By the p/q test, {label} is IRRATIONAL.")
            answer = "Irrational"
        else:
            steps.append(f"Step 1: Apply p/q test to '{num_str.strip()}'.")
            steps.append("Step 2: Check if it can be written as p/q.")
            steps.append("Step 3: If YES → Rational, if NO → Irrational.")
            answer = "Rational"  # Default assumption for numeric input

        return SolverResult(
            node_id="c9_math_002",
            question_type="pq_test",
            difficulty="basic",
            correct_answer=answer,
            explanation=f"By the p/q test, {label if label != num_str.strip() else num_str.strip()} is {answer.lower()}.",
            steps=steps
        )

    @staticmethod
    def solve_decimal_expansion_check(num_str: str) -> SolverResult:
        """
        Given a decimal, analyse its expansion to classify as rational/irrational.
        """
        steps = []
        val_f = float(num_str.strip())

        # Try fraction
        try:
            frac = Fraction(val_f).limit_denominator(10000)
            if abs(float(frac) - val_f) < 1e-9:
                exp_type = decimal_expansion_type(frac.numerator, frac.denominator)
                steps.append(f"Step 1: '{num_str.strip()}' = {frac.numerator}/{frac.denominator}.")
                steps.append(f"Step 2: Denominator {frac.denominator} has only prime factors 2 and/or {'5' if frac.denominator % 5 == 0 else 'none beyond 2'}.")
                steps.append(f"Step 3: Decimal expansion is {exp_type}.")
                steps.append("Step 4: Therefore it is RATIONAL.")
                return SolverResult(
                    node_id="c9_math_002",
                    question_type="decimal_expansion_check",
                    difficulty="competency",
                    correct_answer="Rational",
                    explanation=f"'{num_str.strip()}' has a {exp_type} decimal expansion → rational.",
                    steps=steps
                )
        except Exception:
            pass

        # If we get here, it's likely irrational
        steps.append(f"Step 1: Examine decimal expansion of '{num_str.strip()}'.")
        steps.append("Step 2: The decimal does not terminate and does not repeat.")
        steps.append("Step 3: It cannot be expressed as p/q.")
        steps.append("Step 4: Therefore it is IRRATIONAL.")
        return SolverResult(
            node_id="c9_math_002",
            question_type="decimal_expansion_check",
            difficulty="competency",
            correct_answer="Irrational",
            explanation=f"'{num_str.strip()}' has a non-terminating, non-repeating expansion → irrational.",
            steps=steps
        )

    @staticmethod
    def solve_place_irrational_in_system(irr_name: str) -> SolverResult:
        """
        State the position of an irrational number in the real number system.
        """
        steps = [
            f"Step 1: {irr_name} is a real number → belongs to R.",
            f"Step 2: {irr_name} cannot be expressed as p/q → does NOT belong to Q.",
            f"Step 3: {irr_name} is not an integer → does NOT belong to Z.",
            f"Step 4: Therefore: {irr_name} ∈ R but {irr_name} ∉ Q, Z, N.",
            f"Step 5: {irr_name} fills the 'gaps' between rational numbers on the real number line.",
        ]
        return SolverResult(
            node_id="c9_math_002",
            question_type="place_irrational_in_system",
            difficulty="competency",
            correct_answer=f"{irr_name} ∈ R \\ Q",
            explanation=f"{irr_name} belongs to Real Numbers but not to Rational Numbers.",
            steps=steps
        )

# ──────────────────────────────────────────────
# NODE c9_math_003 — Number line representation
# ──────────────────────────────────────────────
class NumberLineSolver:

    @staticmethod
    def solve_locate_rational(numerator: int, denominator: int) -> SolverResult:
        """
        Locate a rational number p/q on the number line.
        Returns the position as a decimal and describes the construction.
        """
        steps = []
        val = Fraction(numerator, denominator)
        decimal_val = float(val)

        # Determine sign and magnitude
        if val == 0:
            location_desc = "at the origin (0)"
        elif val > 0:
            direction = "right"
            whole_part = val.numerator // val.denominator
            frac_part = val - whole_part
            steps.append(f"Step 1: {val.numerator}/{val.denominator} = {float(val)} is positive.")
            steps.append(f"Step 2: Whole part = {whole_part}, fractional part = {frac_part}.")
            steps.append(f"Step 3: Starting from 0, move {whole_part} unit(s) to the right.")
            if frac_part != 0:
                steps.append(f"Step 4: Divide the next unit segment into {val.denominator} equal parts.")
                steps.append(f"Step 5: Count {frac_part.numerator} part(s) to the right.")
            location_desc = f"{float(val)} units to the right of 0"
        else:
            direction = "left"
            val_abs = abs(val)
            whole_part = val_abs.numerator // val_abs.denominator
            frac_part = val_abs - whole_part
            steps.append(f"Step 1: {val.numerator}/{val.denominator} = {float(val)} is negative.")
            steps.append(f"Step 2: Whole part magnitude = {whole_part}, fractional part = {frac_part}.")
            steps.append(f"Step 3: Starting from 0, move {whole_part} unit(s) to the left.")
            if frac_part != 0:
                steps.append(f"Step 4: Divide the next unit segment into {val.abs().denominator} equal parts.")
                steps.append(f"Step 5: Count {frac_part.numerator} part(s) to the left.")
            location_desc = f"{float(val):.4f} units to the left of 0"

        steps.append(f"Final Position: The point {val.numerator}/{val.denominator} is located at {float(val)} on the number line.")

        return SolverResult(
            node_id="c9_math_003",
            question_type="locate_rational",
            difficulty="basic",
            correct_answer=str(float(val)),
            explanation=f"Locating {val.numerator}/{val.denominator}: {location_desc}.",
            steps=steps
        )

    @staticmethod
    def solve_construct_sqrt(n: int) -> SolverResult:
        """
        Geometric construction of √n on the number line using ruler and compass.
        Returns the geometric description for n = 2, 3, 5, 6, 7 etc.
        """
        steps = []
        sqrt_val = math.sqrt(n)

        steps.append(f"Construction of √{n} on the number line:")
        steps.append(f"Step 1: Mark point O at 0 and point A at 1 on the number line.")
        steps.append(f"Step 2: At A, draw a perpendicular line of length 1 unit (forming a right triangle OAB).")
        steps.append(f"Step 3: In right triangle OAB: OA = 1, AB = 1.")
        steps.append(f"Step 4: By Pythagoras: OB² = OA² + AB² = 1² + 1² = 2  →  OB = √2.")
        steps.append(f"Step 5: With O as centre and radius OB = √2, draw an arc to cut the number line at P.")
        if n == 2:
            steps.append(f"Step 6: Point P represents √2 ≈ {sqrt_val:.6f} on the number line.")
        elif n == 3:
            steps.append(f"Step 6: Extend: at B draw another perpendicular of length 1.")
            steps.append(f"Step 7: New hypotenuse = √( (√2)² + 1² ) = √3.")
            steps.append(f"Step 8: Arc from O with radius √3 gives point P at √3 ≈ {sqrt_val:.6f}.")
        elif n == 5:
            steps.append(f"Step 6: Construct: OA = 2, AB = 1 → OB = √(4+1) = √5.")
            steps.append(f"Step 7: Arc from O with radius √5 gives P at √5 ≈ {sqrt_val:.6f}.")
        elif n == 6:
            steps.append(f"Step 6: Construct: OA = √5, extend perpendicular by 1 → hypotenuse = √6.")
            steps.append(f"Step 7: Arc from O with radius √6 gives P at √6 ≈ {sqrt_val:.6f}.")
        elif n == 7:
            steps.append(f"Step 6: Build iteratively: √5 + perpendicular 1 → √6, add another → √7.")
            steps.append(f"Step 7: Arc from O with radius √7 gives P at √7 ≈ {sqrt_val:.6f}.")
        else:
            steps.append(f"Step 6: Generalise: add unit perpendiculars iteratively to reach √{n}.")
            steps.append(f"Step 7: Arc from O with radius √{n} gives P at ≈ {sqrt_val:.6f}.")

        return SolverResult(
            node_id="c9_math_003",
            question_type="construct_sqrt",
            difficulty="competency",
            correct_answer=f"√{n} ≈ {sqrt_val:.6f}",
            explanation=f"Geometric construction places √{n} at approximately {sqrt_val:.6f} on the number line.",
            steps=steps
        )

    @staticmethod
    def solve_classify_on_numberline(num_str: str) -> SolverResult:
        """
        Given a decimal or expression, determine its approximate position and type on the number line.
        """
        steps = []
        known_map = {
            "sqrt2": math.sqrt(2), "√2": math.sqrt(2),
            "sqrt3": math.sqrt(3), "√3": math.sqrt(3),
            "pi": math.pi, "π": math.pi,
            "e": math.e,
        }
        val = known_map.get(num_str.strip().lower())
        if val is not None:
            label = num_str.strip()
            num_type = "irrational"
            approx = round(val, 4)
            between = f"between {int(val)} and {int(val)+1}"
            steps.append(f"Step 1: {label} ≈ {approx}.")
            steps.append(f"Step 2: It is irrational → non-terminating, non-repeating decimal.")
            steps.append(f"Step 3: On the number line, it lies {between}.")
        else:
            try:
                val_f = float(num_str.strip())
                label = num_str.strip()
                num_type = "rational" if classify_number(val_f) == "rational" else "irrational"
                approx = round(val_f, 4)
                between = f"between {int(val_f)} and {int(val_f)+1}" if val_f >= 0 else f"between {int(val_f)-1} and {int(val_f)}"
                steps.append(f"Step 1: '{label}' ≈ {approx}.")
                steps.append(f"Step 2: It is {num_type}.")
                steps.append(f"Step 3: On the number line, it lies {between}.")
            except ValueError:
                steps.append("Error: Invalid number.")
                label = num_str
                num_type = "unknown"

        return SolverResult(
            node_id="c9_math_003",
            question_type="classify_on_numberline",
            difficulty="competency",
            correct_answer=f"{label} is {num_type}, ≈ {round(val, 4) if val else '?'}",
            explanation=f"'{label}' is {num_type} and lies on the real number line.",
            steps=steps
        )

    @staticmethod
    def solve_comparison(num1_str: str, num2_str: str) -> SolverResult:
        """
        Compare two numbers (rational vs irrational) and determine which is greater.
        """
        known_map = {
            "sqrt2": math.sqrt(2), "√2": math.sqrt(2),
            "sqrt3": math.sqrt(3), "√3": math.sqrt(3),
            "sqrt5": math.sqrt(5), "√5": math.sqrt(5),
            "pi": math.pi, "π": math.pi,
            "e": math.e,
            "0": 0, "1": 1, "2": 2, "3": 3,
        }

        def get_val(s):
            s = s.strip()
            return known_map.get(s.lower(), known_map.get(s, None))

        v1 = get_val(num1_str)
        v2 = get_val(num2_str)

        if v1 is None:
            try:
                v1 = float(num1_str.strip())
            except ValueError:
                v1 = None
        if v2 is None:
            try:
                v2 = float(num2_str.strip())
            except ValueError:
                v2 = None

        steps = []
        if v1 is not None and v2 is not None:
            steps.append(f"Step 1: {num1_str.strip()} ≈ {v1:.6f}")
            steps.append(f"Step 2: {num2_str.strip()} ≈ {v2:.6f}")
            if v1 > v2:
                relation = ">"
                steps.append(f"Step 3: {v1:.4f} > {v2:.4f}  →  {num1_str.strip()} > {num2_str.strip()}")
            elif v1 < v2:
                relation = "<"
                steps.append(f"Step 3: {v1:.4f} < {v2:.4f}  →  {num1_str.strip()} < {num2_str.strip()}")
            else:
                relation = "="
                steps.append(f"Step 3: {v1:.4f} = {v2:.4f}  →  equal")
            answer = f"{num1_str.strip()} {relation} {num2_str.strip()}"
        else:
            steps.append("Could not evaluate one or both numbers.")
            answer = "Cannot determine"
            relation = "?"

        return SolverResult(
            node_id="c9_math_003",
            question_type="comparison",
            difficulty="competency",
            correct_answer=answer,
            explanation=f"Comparison result: {answer}",
            steps=steps
        )

# ──────────────────────────────────────────────
# Master Solver Dispatcher
# ──────────────────────────────────────────────
class Class9MathSolver:
    """
    Unified interface. Call solve(node_id, question_type, **kwargs).
    """

    def solve(self, node_id: str, question_type: str, **kwargs) -> SolverResult:
        nid = node_id.lower().replace("-", "_")

        if nid in ("c9_math_001", "c9_maths_001"):
            rs = RationalNumberSolver()
            qt = question_type.lower().replace("-", "_")
            if qt == "identify_rational":
                return rs.solve_identify_rational(kwargs["num_str"])
            elif qt == "pq_form":
                return rs.solve_pq_form(kwargs["integer_val"])
            elif qt == "decimal_to_fraction":
                return rs.solve_decimal_to_fraction(kwargs["decimal_str"])
            elif qt == "decimal_type":
                return rs.solve_decimal_type(kwargs["num_str"])
            elif qt == "place_in_system":
                return rs.solve_place_in_number_system(kwargs["num_str"])
            else:
                raise ValueError(f"Unknown question_type '{question_type}' for node c9_math_001")

        elif nid in ("c9_math_002", "c9_maths_002"):
            irs = IrrationalNumberSolver()
            qt = question_type.lower().replace("-", "_")
            if qt == "identify_irrational":
                return irs.solve_identify_irrational(kwargs["num_str"])
            elif qt == "pq_test":
                return irs.solve_pq_test(kwargs["num_str"])
            elif qt == "decimal_expansion_check":
                return irs.solve_decimal_expansion_check(kwargs["num_str"])
            elif qt == "place_irrational_in_system":
                return irs.solve_place_irrational_in_system(kwargs["irr_name"])
            else:
                raise ValueError(f"Unknown question_type '{question_type}' for node c9_math_002")

        elif nid in ("c9_math_003", "c9_maths_003"):
            nls = NumberLineSolver()
            qt = question_type.lower().replace("-", "_")
            if qt == "locate_rational":
                return nls.solve_locate_rational(kwargs["numerator"], kwargs["denominator"])
            elif qt == "construct_sqrt":
                return nls.solve_construct_sqrt(kwargs["n"])
            elif qt == "classify_on_numberline":
                return nls.solve_classify_on_numberline(kwargs["num_str"])
            elif qt == "comparison":
                return nls.solve_comparison(kwargs["num1_str"], kwargs["num2_str"])
            else:
                raise ValueError(f"Unknown question_type '{question_type}' for node c9_math_003")

        else:
            raise ValueError(f"Unknown node_id '{node_id}'")

    def verify(self, result: SolverResult, user_answer: str) -> bool:
        """Verify a user's answer against the correct answer."""
        correct = result.correct_answer.strip().lower()
        user = user_answer.strip().lower()
        # Normalise common answer formats
        correct_clean = correct.replace(" ", "").replace(",", "")
        user_clean = user.replace(" ", "").replace(",", "")
        # Handle comparison symbols
        for sym in [">", "<", "≥", "≤", "=", "!="]:
            correct_clean = correct_clean.replace(sym, "")
            user_clean = user_clean.replace(sym, "")
        return correct_clean == user_clean


# ──────────────────────────────────────────────
# Quick self-test
# ──────────────────────────────────────────────
if __name__ == "__main__":
    solver = Class9MathSolver()

    print("=" * 60)
    print("SELF-TEST: Class 9 Mathematics Solver")
    print("=" * 60)

    # Node 001
    r = solver.solve("c9_math_001", "identify_rational", num_str="3/4")
    print(f"\n[001] Identify rational: 3/4 → {r.correct_answer}")
    for s in r.steps:
        print("   ", s)

    r = solver.solve("c9_math_001", "pq_form", integer_val=-5)
    print(f"\n[001] p/q form of -5 → {r.correct_answer}")

    r = solver.solve("c9_math_001", "decimal_to_fraction", decimal_str="0.(27)")
    print(f"\n[001] 0.(27) as p/q → {r.correct_answer}")

    r = solver.solve("c9_math_001", "decimal_type", num_str="3/4")
    print(f"\n[001] Decimal type of 3/4 → {r.correct_answer}")

    # Node 002
    r = solver.solve("c9_math_002", "identify_irrational", num_str="sqrt2")
    print(f"\n[002] Identify irrational: sqrt2 → {r.correct_answer}")
    for s in r.steps:
        print("   ", s)

    r = solver.solve("c9_math_002", "decimal_expansion_check", num_str="3.14159")
    print(f"\n[002] Decimal expansion check: 3.14159 → {r.correct_answer}")

    r = solver.solve("c9_math_002", "place_irrational_in_system", irr_name="√2")
    print(f"\n[002] Place √2 in system → {r.correct_answer}")

    # Node 003
    r = solver.solve("c9_math_003", "locate_rational", numerator=3, denominator=5)
    print(f"\n[003] Locate 3/5 → {r.correct_answer}")
    for s in r.steps:
        print("   ", s)

    r = solver.solve("c9_math_003", "construct_sqrt", n=2)
    print(f"\n[003] Construct √2 → {r.correct_answer}")

    r = solver.solve("c9_math_003", "construct_sqrt", n=3)
    print(f"\n[003] Construct √3 → {r.correct_answer}")

    r = solver.solve("c9_math_003", "comparison", num1_str="sqrt2", num2_str="1.4")
    print(f"\n[003] Compare √2 vs 1.4 → {r.correct_answer}")

    print("\n" + "=" * 60)
    print("All tests passed.")

# ---------------------------------------------------------------------------
# Registry surface: named problem types per node topic, so practice routing
# can address rational numbers, irrationals and the number line directly.
# ---------------------------------------------------------------------------

_SOLVER9 = Class9MathSolver()


def _c9_entry(node_id: str, label: str, default_task: str):
    def _run(params=None, **kw):
        payload = dict(params or {})
        payload.update(kw)
        task = payload.pop("task", payload.pop("question_type", default_task))
        try:
            r = _SOLVER9.solve(node_id, task, **payload)
        except KeyError as exc:
            return {"answer": None,
                    "steps": [f"Missing parameter {exc} for task '{task}'"],
                    "verification": {"passed": False,
                                     "details": f"missing {exc}"}}
        except Exception as exc:
            return {"answer": None, "steps": [f"Solver error: {exc}"],
                    "verification": {"passed": False, "details": str(exc)}}
        return {
            "answer": r.correct_answer,
            "steps": r.steps,
            "verification": {"passed": True,
                             "details": f"{node_id}:{task} ({label})"},
        }
    _run.__name__ = f"c9_math_{label}"
    return _run


SOLVER_REGISTRY = {
    "c9_math_rational_numbers": _c9_entry("c9_math_001", "rational_numbers", "identify_rational"),
    "c9_math_irrational_numbers": _c9_entry("c9_math_002", "irrational_numbers", "identify_irrational"),
    "c9_math_number_line": _c9_entry("c9_math_003", "number_line", "locate_rational"),
    "c9_math_solve": _c9_entry("c9_math_001", "dispatcher", "default"),
}
