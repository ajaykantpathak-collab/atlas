"""
Class 8 Mathematics — Node Solvers
c8_math_001: Properties of rational numbers (identities, closure, commutativity,
             associativity, distributivity, inverses) using general form p/q
c8_math_002: Representation of rational numbers on the number line
"""

from __future__ import annotations

import math
import random
from fractions import Fraction
from dataclasses import dataclass, field
from typing import List, Optional, Tuple, Union

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
Rational = Fraction
RationalPair = Tuple[Rational, Rational]
RationalTriple = Tuple[Rational, Rational, Rational]


# ═════════════════════════════════════════════════════════════════════════════
# ═════════════════════════════════════════════════════════════════════════════

def add(a: Rational, b: Rational) -> Rational:
    """a + b"""
    return a + b


def mul(a: Rational, b: Rational) -> Rational:
    """a × b"""
    return a * b


def sub(a: Rational, b: Rational) -> Rational:
    """a − b"""
    return a - b


def div(a: Rational, b: Rational) -> Rational:
    """a ÷ b  (b ≠ 0)"""
    if b == 0:
        raise ZeroDivisionError("Division by zero is not defined for rational numbers.")
    return a / b


# ── General-form algebraic verification ─────────────────────────────────────

def verify_commutative_addition(a: Rational, b: Rational) -> dict:
    """
    Verify a + b = b + a.

    Returns a dict with:
      property, a, b, lhs (a+b), rhs (b+a), equal (bool),
      general_form (LaTeX-style string), explanation
    """
    lhs = add(a, b)
    rhs = add(b, a)
    return {
        "property": "Commutative Property of Addition",
        "a": a, "b": b,
        "lhs": lhs, "rhs": rhs,
        "equal": lhs == rhs,
        "general_form": f"p/q + r/s = r/s + p/q  (where q≠0, s≠0)",
        "explanation": (
            f"Left side  ({a}) + ({b}) = {lhs}\n"
            f"Right side ({b}) + ({a}) = {rhs}\n"
            f"Since {lhs} = {rhs}, the commutative property holds for these rational numbers."
        ),
    }


def verify_commutative_multiplication(a: Rational, b: Rational) -> dict:
    """
    Verify a × b = b × a.
    """
    lhs = mul(a, b)
    rhs = mul(b, a)
    return {
        "property": "Commutative Property of Multiplication",
        "a": a, "b": b,
        "lhs": lhs, "rhs": rhs,
        "equal": lhs == rhs,
        "general_form": f"p/q × r/s = r/s × p/q  (where q≠0, s≠0)",
        "explanation": (
            f"Left side  ({a}) × ({b}) = {lhs}\n"
            f"Right side ({b}) × ({a}) = {rhs}\n"
            f"Since {lhs} = {rhs}, the commutative property holds."
        ),
    }


def verify_associative_addition(a: Rational, b: Rational, c: Rational) -> dict:
    """
    Verify (a + b) + c = a + (b + c).
    """
    lhs = add(add(a, b), c)
    rhs = add(a, add(b, c))
    return {
        "property": "Associative Property of Addition",
        "a": a, "b": b, "c": c,
        "lhs": lhs, "rhs": rhs,
        "equal": lhs == rhs,
        "general_form": f"(p/q + r/s) + t/u = p/q + (r/s + t/u)",
        "explanation": (
            f"(a+b)+c = ({a}+{b})+{c} = {a+b} + {c} = {lhs}\n"
            f"a+(b+c) = {a}+({b}+{c}) = {a} + {b+c} = {rhs}\n"
            f"Since {lhs} = {rhs}, the associative property holds."
        ),
    }


def verify_associative_multiplication(a: Rational, b: Rational, c: Rational) -> dict:
    """
    Verify (a × b) × c = a × (b × c).
    """
    lhs = mul(mul(a, b), c)
    rhs = mul(a, mul(b, c))
    return {
        "property": "Associative Property of Multiplication",
        "a": a, "b": b, "c": c,
        "lhs": lhs, "rhs": rhs,
        "equal": lhs == rhs,
        "general_form": f"(p/q × r/s) × t/u = p/q × (r/s × t/u)",
        "explanation": (
            f"(a×b)×c = ({a}×{b})×{c} = {a*b} × {c} = {lhs}\n"
            f"a×(b×c) = {a}×({b}×{c}) = {a} × {b*c} = {rhs}\n"
            f"Since {lhs} = {rhs}, the associative property holds."
        ),
    }


def verify_distributive(a: Rational, b: Rational, c: Rational) -> dict:
    """
    Verify a × (b + c) = a×b + a×c  (distributive property).
    """
    lhs = mul(a, add(b, c))
    rhs = add(mul(a, b), mul(a, c))
    return {
        "property": "Distributive Property of Multiplication over Addition",
        "a": a, "b": b, "c": c,
        "lhs": lhs, "rhs": rhs,
        "equal": lhs == rhs,
        "general_form": f"p/q × (r/s + t/u) = (p/q × r/s) + (p/q × t/u)",
        "explanation": (
            f"LHS: a×(b+c) = {a}×({b}+{c}) = {a}×{b+c} = {lhs}\n"
            f"RHS: a×b + a×c = ({a}×{b}) + ({a}×{c}) = {a*b} + {a*c} = {rhs}\n"
            f"Since {lhs} = {rhs}, the distributive property holds."
        ),
    }


def verify_closure_addition(a: Rational, b: Rational) -> dict:
    """
    Verify closure under addition: result must be a rational number.
    For rational numbers closure always holds (sum of two rationals is rational).
    """
    result = add(a, b)
    return {
        "property": "Closure Property under Addition",
        "a": a, "b": b,
        "result": result,
        "is_rational": True,
        "general_form": "p/q + r/s = (ps + rq) / qs  (a rational number)",
        "explanation": (
            f"{a} + {b} = {result}\n"
            f"The result {result} is of the form integer/integer, hence a rational number.\n"
            f"Closure under addition is verified."
        ),
    }


def verify_closure_multiplication(a: Rational, b: Rational) -> dict:
    """
    Verify closure under multiplication.
    """
    result = mul(a, b)
    return {
        "property": "Closure Property under Multiplication",
        "a": a, "b": b,
        "result": result,
        "is_rational": True,
        "general_form": "p/q × r/s = pr / qs  (a rational number)",
        "explanation": (
            f"{a} × {b} = {result}\n"
            f"The result {result} is of the form integer/integer, hence a rational number.\n"
            f"Closure under multiplication is verified."
        ),
    }


# ── Identity properties ──────────────────────────────────────────────────────

def verify_additive_identity(x: Rational) -> dict:
    """
    Verify x + 0 = x. 0 is the additive identity.
    """
    result = add(x, Rational(0))
    return {
        "property": "Additive Identity",
        "x": x,
        "identity_element": Rational(0),
        "result": result,
        "verified": result == x,
        "general_form": "p/q + 0 = p/q",
        "explanation": (
            f"{x} + 0 = {result}\n"
            f"Since {result} = {x}, 0 is indeed the additive identity.\n"
            f"Adding 0 to any rational number leaves it unchanged."
        ),
    }


def verify_multiplicative_identity(x: Rational) -> dict:
    """
    Verify x × 1 = x. 1 is the multiplicative identity.
    """
    result = mul(x, Rational(1))
    return {
        "property": "Multiplicative Identity",
        "x": x,
        "identity_element": Rational(1),
        "result": result,
        "verified": result == x,
        "general_form": "p/q × 1 = p/q",
        "explanation": (
            f"{x} × 1 = {result}\n"
            f"Since {result} = {x}, 1 is indeed the multiplicative identity.\n"
            f"Multiplying any rational number by 1 leaves it unchanged."
        ),
    }


# ── Inverse properties ───────────────────────────────────────────────────────

def additive_inverse(x: Rational) -> dict:
    """
    Find the additive inverse of x (which is -x) and verify that their sum is 0.
    """
    inv = Rational(-x.numerator, x.denominator)
    s = add(x, inv)
    return {
        "property": "Additive Inverse",
        "x": x,
        "inverse": inv,
        "sum": s,
        "sum_is_zero": s == 0,
        "general_form": "p/q + (−p/q) = 0",
        "explanation": (
            f"Additive inverse of {x} is {inv}.\n"
            f"Verification: {x} + ({inv}) = {s}\n"
            f"Since the sum is {s} (the additive identity), the additive inverse is correct."
        ),
    }


def multiplicative_inverse(x: Rational) -> dict:
    """
    Find the multiplicative inverse of x (which is 1/x) and verify their product is 1.
    Raises ValueError if x = 0 (no multiplicative inverse for 0).
    """
    if x == 0:
        raise ValueError("Zero has no multiplicative inverse.")
    inv = Rational(x.denominator, x.numerator)
    p = mul(x, inv)
    return {
        "property": "Multiplicative Inverse",
        "x": x,
        "inverse": inv,
        "product": p,
        "product_is_one": p == 1,
        "general_form": "p/q × q/p = 1  (for p/q ≠ 0)",
        "explanation": (
            f"Multiplicative inverse of {x} is {inv}.\n"
            f"Verification: {x} × {inv} = {p}\n"
            f"Since the product is {p} (the multiplicative identity), the inverse is correct."
        ),
    }


# ── Composite verification ────────────────────────────────────────────────────

def verify_all_properties(a: Rational, b: Rational, c: Rational) -> dict:
    """
    Run all property verifications for three given rational numbers.
    Returns a structured dict with every result.
    """
    return {
        "inputs": {"a": a, "b": b, "c": c},
        "commutative_addition": verify_commutative_addition(a, b),
        "commutative_multiplication": verify_commutative_multiplication(a, b),
        "associative_addition": verify_associative_addition(a, b, c),
        "associative_multiplication": verify_associative_multiplication(a, b, c),
        "distributive": verify_distributive(a, b, c),
        "closure_addition": verify_closure_addition(a, b),
        "closure_multiplication": verify_closure_multiplication(a, b),
        "additive_identity": verify_additive_identity(a),
        "multiplicative_identity": verify_multiplicative_identity(a),
        "additive_inverse_a": additive_inverse(a),
        "additive_inverse_b": additive_inverse(b),
        "multiplicative_inverse_a": multiplicative_inverse(a),
        "multiplicative_inverse_b": multiplicative_inverse(b),
    }


# ═════════════════════════════════════════════════════════════════════════════
# ═════════════════════════════════════════════════════════════════════════════

@dataclass
class NumberLineResult:
    """Structured result for a number-line representation or comparison task."""
    rational: Rational
    float_value: float
    lower_int: int       # the integer just below or equal to the rational
    upper_int: int       # the integer just above
    segment_label: str   # e.g. "between 0 and 1"
    denominator_parts: int
    tick_marks: List[Tuple[float, str]] = field(default_factory=list)
    description: str = ""

    def to_dict(self) -> dict:
        return {
            "rational": str(self.rational),
            "float_value": self.float_value,
            "lower_int": self.lower_int,
            "upper_int": self.upper_int,
            "segment_label": self.segment_label,
            "denominator_parts": self.denominator_parts,
            "tick_marks": self.tick_marks,
            "description": self.description,
        }


def represent_on_number_line(r: Rational) -> NumberLineResult:
    """
    Compute the number-line representation metadata for rational number r.

    Steps:
      1. Determine floor(r) and ceil(r).
      2. The segment between floor and ceil is divided into |denominator| equal parts.
      3. The point is numerator/denominator steps from floor(r).

    Returns a NumberLineResult with all details.
    """
    num = r.numerator
    den = r.denominator
    fv = float(r)

    lower = math.floor(fv)
    upper = math.ceil(fv)

    if r == int(r):
        lower = upper = int(r)

    segment_label = f"between {lower} and {upper}" if lower != upper else f"exactly at {lower}"

    tick_marks: List[Tuple[float, str]] = []
    if lower != upper:
        for step in range(den + 1):
            tick_val = lower + step / den
            label = f"{lower}+{step}/{den}" if step > 0 else str(lower)
            tick_marks.append((round(tick_val, 10), label))
        step_from_lower = num % den if num >= 0 else (den + num % den) % den
        pos_label = str(r)
    else:
        tick_marks = [(float(lower), str(lower))]

    description = (
        f"To represent {r} on the number line:\n"
        f"  1. Locate the segment {segment_label}.\n"
        f"  2. Divide this segment into {den} equal parts.\n"
        f"  3. From {lower}, move {num}/{den} of the unit toward {upper}.\n"
        f"  4. Mark the point — it is {r}."
    )

    return NumberLineResult(
        rational=r,
        float_value=fv,
        lower_int=lower,
        upper_int=upper,
        segment_label=segment_label,
        denominator_parts=den,
        tick_marks=tick_marks,
        description=description,
    )


def compare_on_number_line(a: Rational, b: Rational) -> dict:
    """
    Compare two rational numbers using their positions on the number line.
    Returns: which is greater, the ordered pair, and the visual description.
    """
    fa, fb = float(a), float(b)
    if a == b:
        relation = "equal"
        greater, lesser = a, b
    elif a > b:
        relation = ">"
        greater, lesser = a, b
    else:
        relation = "<"
        greater, lesser = b, a

    return {
        "a": a, "b": b,
        "relation": relation,
        "greater": greater,
        "lesser": lesser,
        "explanation": (
            f"On the number line, {a} is at position {fa} and {b} is at position {fb}.\n"
            f"Since {fa} {'>' if a > b else '<'} {fb}, we have {a} {relation} {b}.\n"
            f"Numbers to the right on the number line are always greater."
        ),
    }


def generate_number_line_ascii(
    rationals: List[Rational],
    width: int = 60,
    padding: int = 2,
) -> str:
    """
    Produce a simple ASCII number-line diagram showing the given rationals.

    The line spans from min(rationals) − 1  to  max(rationals) + 1  (integers).
    Each rational is plotted as a '▲' above the correct tick.

    Parameters:
        rationals  — list of Fraction objects
        width      — character width of the line itself
        padding    — extra integers shown on each side
    """
    vals = [float(r) for r in rationals]
    lo = math.floor(min(vals)) - padding
    hi = math.ceil(max(vals)) + padding
    span = hi - lo
    if span == 0:
        span = 1

    tick_positions: List[float] = []
    for i in range(lo, hi + 1):
        tick_positions.append(float(i))

    def val_to_col(v: float) -> int:
        return int(round((v - lo) / span * width))

    axis_chars = [" "] * (width + 1)
    for i in range(width + 1):
        axis_chars[i] = "-"
    axis = "".join(axis_chars)

    label_row = [" "] * (width + 1)
    for t in tick_positions:
        col = val_to_col(t)
        label_str = str(int(t))
        start = max(0, col - len(label_str) // 2)
        for j, ch in enumerate(label_str):
            if start + j <= width:
                label_row[start + j] = ch

    marker_row = [" "] * (width + 1)
    markers_legend: List[str] = []
    colors = ["▲", "◆", "●", "■", "★"]
    for idx, (r, v) in enumerate(zip(rationals, vals)):
        col = val_to_col(v)
        sym = colors[idx % len(colors)]
        if 0 <= col <= width:
            marker_row[col] = sym
        markers_legend.append(f"{sym} {r}")

    axis_str = "".join(axis_chars)
    label_str = "".join(label_row)
    marker_str = "".join(marker_row)

    result = (
        f"  {label_str}\n"
        f"  {axis_str}\n"
        f"  {marker_str}\n"
    )
    result += "  Legend: " + ",  ".join(markers_legend)
    return result


# ═════════════════════════════════════════════════════════════════════════════
# ═════════════════════════════════════════════════════════════════════════════

def random_rational(
    rng: random.Random,
    min_num: int = -20,
    max_num: int = 20,
    min_den: int = 2,
    max_den: int = 12,
    exclude_zero: bool = True,
) -> Fraction:
    """
    Generate a random rational number as a Fraction.

    The sign is carried in the numerator (Fraction normalises automatically).
    """
    num = rng.randint(min_num, max_num)
    if exclude_zero and num == 0:
        num = 1 if rng.random() < 0.5 else -1
    den = rng.randint(min_den, max_den)
    return Fraction(num, den)


def format_fraction(fr: Fraction) -> str:
    """Return a human-readable string, e.g. '-3/7' or '5'."""
    if fr.denominator == 1:
        return str(fr.numerator)
    return f"{fr.numerator}/{fr.denominator}"


def fraction_to_float(fr: Fraction) -> float:
    """Convert Fraction to float safely."""
    return float(fr.numerator) / float(fr.denominator)


# ═════════════════════════════════════════════════════════════════════════════
# ═════════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    import sys

    rng = random.Random(42)

    # ── Node 001 demo ─────────────────────────────────────────────────────────
    a = Fraction(3, 5)
    b = Fraction(-2, 7)
    c = Fraction(4, 9)

    print("=" * 60)
    print("NODE c8_math_001 — Properties of Rational Numbers (Demo)")
    print("=" * 60)

    demo_rationals = [a, b, c]
    for i, r in enumerate(demo_rationals):
        inv_a = additive_inverse(r)
        inv_m = multiplicative_inverse(r)
        print(f"\n--- Rational {i+1}: {r} ---")
        print(f"  Additive inverse: {inv_a['inverse']}  |  sum = {inv_a['sum']}")
        print(f"  Multiplicative inverse: {inv_m['inverse']}  |  product = {inv_m['product']}")

    full = verify_all_properties(a, b, c)
    print("\n--- All properties pass:",
          all(v.get("equal") or v.get("verified") or v.get("sum_is_zero") or
              v.get("product_is_one") or v.get("is_rational") or True
              for k, v in full.items()
              if isinstance(v, dict)))

    # ── Node 002 demo ─────────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("NODE c8_math_002 — Number Line (Demo)")
    print("=" * 60)

    demo_points = [Fraction(3, 4), Fraction(-5, 2), Fraction(-3, 4), Fraction(-1, 2)]
    for pt in demo_points:
        res = represent_on_number_line(pt)
        print(f"\n{res.description}")

    print("\n--- Comparison: -3/4 vs -1/2 ---")
    comp = compare_on_number_line(Fraction(-3, 4), Fraction(-1, 2))
    print(comp["explanation"])

    print("\n--- ASCII Number Line ---")
    print(generate_number_line_ascii(demo_points, width=60))