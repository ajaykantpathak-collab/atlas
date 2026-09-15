"""
Class 8 Mathematics — Seeded Question Generator
Nodes: c8_math_001 | c8_math_002
"""

from __future__ import annotations

import random
import textwrap
from dataclasses import dataclass, field
from fractions import Fraction
from typing import List, Optional

from maths.class8_maths_solver import (
    format_fraction,
    fraction_to_float,
    random_rational,
    verify_commutative_addition,
    verify_commutative_multiplication,
    verify_associative_addition,
    verify_associative_multiplication,
    verify_distributive,
    verify_closure_addition,
    verify_closure_multiplication,
    verify_additive_identity,
    verify_multiplicative_identity,
    additive_inverse,
    multiplicative_inverse,
    represent_on_number_line,
    compare_on_number_line,
    generate_number_line_ascii,
)

# ═════════════════════════════════════════════════════════════════════════════
# ═════════════════════════════════════════════════════════════════════════════

@dataclass
class Question:
    node_id: str
    question_text: str
    difficulty: str
    cognitive_level: str
    answer: dict
    hint: str = ""
    steps: List[str] = field(default_factory=list)
    competency: str = "Board"


# ═════════════════════════════════════════════════════════════════════════════
# ═════════════════════════════════════════════════════════════════════════════

def _wrap(text: str, width: int = 72, indent: str = "    ") -> str:
    return textwrap.fill(text, width=width,
                         initial_indent="", subsequent_indent=indent)


# ═════════════════════════════════════════════════════════════════════════════
# ═════════════════════════════════════════════════════════════════════════════

def q_verify_commutative_addition(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Verify the commutative property of addition for two rational numbers.
    Easy: small numerators/denominators; Hard: larger, mixed sign.
    """
    mn, mx = (-5, 5) if easy else (-15, 15)
    md, Md = (2, 8)  if easy else (2, 15)
    a = random_rational(rng, mn, mx, md, Md)
    b = random_rational(rng, mn, mx, md, Md)

    result = verify_commutative_addition(a, b)

    question_text = (
        f"Verify that addition of rational numbers is commutative\n"
        f"using a = {format_fraction(a)} and b = {format_fraction(b)}.\n"
        f"\nShow that a + b = b + a."
    )

    steps = [
        f"Step 1: Compute a + b = ({format_fraction(a)}) + ({format_fraction(b)}) "
        f"= {format_fraction(result['lhs'])}",
        f"Step 2: Compute b + a = ({format_fraction(b)}) + ({format_fraction(a)}) "
        f"= {format_fraction(result['rhs'])}",
        f"Step 3: Compare — {format_fraction(result['lhs'])} = "
        f"{format_fraction(result['rhs'])} ⇒ Commutative property holds.",
    ]

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Easy" if easy else "Medium",
        cognitive_level="Analyze",
        answer=result,
        hint="Use a common denominator (LCM) to add the two fractions.",
        steps=steps,
    )


def q_verify_commutative_multiplication(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Verify commutative property of multiplication for two rational numbers.
    """
    mn, mx = (-8, 8) if easy else (-15, 15)
    md, Md = (2, 8)  if easy else (2, 12)
    a = random_rational(rng, mn, mx, md, Md)
    b = random_rational(rng, mn, mx, md, Md)

    result = verify_commutative_multiplication(a, b)

    question_text = (
        f"Verify that multiplication of rational numbers is commutative\n"
        f"using a = {format_fraction(a)} and b = {format_fraction(b)}.\n"
        f"\nShow that a × b = b × a."
    )

    steps = [
        f"Step 1: a × b = ({format_fraction(a)}) × ({format_fraction(b)}) "
        f"= {format_fraction(result['lhs'])}",
        f"Step 2: b × a = ({format_fraction(b)}) × ({format_fraction(a)}) "
        f"= {format_fraction(result['rhs'])}",
        f"Step 3: {format_fraction(result['lhs'])} = "
        f"{format_fraction(result['rhs'])} ⇒ Property verified.",
    ]

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Easy" if easy else "Medium",
        cognitive_level="Analyze",
        answer=result,
        hint="Multiply numerators together and denominators together.",
        steps=steps,
    )


def q_verify_associative_addition(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Verify (a+b)+c = a+(b+c) for three rational numbers.
    """
    mn, mx = (-6, 6) if easy else (-12, 12)
    md, Md = (2, 8)  if easy else (2, 10)
    a = random_rational(rng, mn, mx, md, Md)
    b = random_rational(rng, mn, mx, md, Md)
    c = random_rational(rng, mn, mx, md, Md)

    result = verify_associative_addition(a, b, c)

    question_text = (
        f"Verify the associative property of addition for rational numbers\n"
        f"using a = {format_fraction(a)}, b = {format_fraction(b)}, "
        f"c = {format_fraction(c)}.\n"
        f"\nShow that (a + b) + c = a + (b + c)."
    )

    steps = [
        f"Step 1: (a + b) + c = ({format_fraction(a)} + {format_fraction(b)}) + {format_fraction(c)} "
        f"= {format_fraction(a + b)} + {format_fraction(c)} = {format_fraction(result['lhs'])}",
        f"Step 2: a + (b + c) = {format_fraction(a)} + ({format_fraction(b)} + {format_fraction(c)}) "
        f"= {format_fraction(a)} + {format_fraction(b + c)} = {format_fraction(result['rhs'])}",
        f"Step 3: {format_fraction(result['lhs'])} = {format_fraction(result['rhs'])} ⇒ Verified.",
    ]

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Medium" if not easy else "Easy",
        cognitive_level="Analyze",
        answer=result,
        hint="First add a and b, then add c; separately, first add b and c, then add a.",
        steps=steps,
    )


def q_verify_associative_multiplication(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Verify (a×b)×c = a×(b×c) for three rational numbers.
    """
    mn, mx = (-6, 6) if easy else (-12, 12)
    md, Md = (2, 8)  if easy else (2, 10)
    a = random_rational(rng, mn, mx, md, Md)
    b = random_rational(rng, mn, mx, md, Md)
    c = random_rational(rng, mn, mx, md, Md)

    result = verify_associative_multiplication(a, b, c)

    question_text = (
        f"Verify the associative property of multiplication for rational numbers\n"
        f"using a = {format_fraction(a)}, b = {format_fraction(b)}, "
        f"c = {format_fraction(c)}.\n"
        f"\nShow that (a × b) × c = a × (b × c)."
    )

    steps = [
        f"Step 1: (a × b) × c = ({format_fraction(a)} × {format_fraction(b)}) × {format_fraction(c)} "
        f"= {format_fraction(a * b)} × {format_fraction(c)} = {format_fraction(result['lhs'])}",
        f"Step 2: a × (b × c) = {format_fraction(a)} × ({format_fraction(b)} × {format_fraction(c)}) "
        f"= {format_fraction(a)} × {format_fraction(b * c)} = {format_fraction(result['rhs'])}",
        f"Step 3: {format_fraction(result['lhs'])} = {format_fraction(result['rhs'])} ⇒ Verified.",
    ]

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Medium" if not easy else "Easy",
        cognitive_level="Analyze",
        answer=result,
        hint="Multiply numerators and denominators separately for each product.",
        steps=steps,
    )


def q_verify_distributive(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Verify a×(b+c) = a×b + a×c (distributive property).
    """
    mn, mx = (-6, 6) if easy else (-12, 12)
    md, Md = (2, 8)  if easy else (2, 10)
    a = random_rational(rng, mn, mx, md, Md)
    b = random_rational(rng, mn, mx, md, Md)
    c = random_rational(rng, mn, mx, md, Md)

    result = verify_distributive(a, b, c)

    question_text = (
        f"Verify the distributive property of multiplication over addition\n"
        f"using a = {format_fraction(a)}, b = {format_fraction(b)}, "
        f"c = {format_fraction(c)}.\n"
        f"\nShow that a × (b + c) = a × b + a × c."
    )

    steps = [
        f"Step 1: b + c = {format_fraction(b)} + {format_fraction(c)} = {format_fraction(b + c)}",
        f"Step 2: a × (b + c) = {format_fraction(a)} × {format_fraction(b + c)} "
        f"= {format_fraction(result['lhs'])}",
        f"Step 3: a × b = {format_fraction(a * b)},  a × c = {format_fraction(a * c)}",
        f"Step 4: a × b + a × c = {format_fraction(a*b)} + {format_fraction(a*c)} "
        f"= {format_fraction(result['rhs'])}",
        f"Step 5: LHS = RHS = {format_fraction(result['lhs'])} ⇒ Property verified.",
    ]

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Medium" if not easy else "Easy",
        cognitive_level="Analyze",
        answer=result,
        hint="First compute b + c using LCM, then multiply by a.",
        steps=steps,
    )


def q_verify_closure_addition(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Show that the sum of two rational numbers is always a rational number.
    """
    mn, mx = (-10, 10) if easy else (-20, 20)
    md, Md = (2, 8)    if easy else (2, 12)
    a = random_rational(rng, mn, mx, md, Md)
    b = random_rational(rng, mn, mx, md, Md)

    result = verify_closure_addition(a, b)

    question_text = (
        f"Show that the sum of two rational numbers is always a rational number\n"
        f"(closure property under addition) by taking:\n"
        f"   a = {format_fraction(a)},   b = {format_fraction(b)}"
    )

    steps = [
        f"Step 1: a + b = {format_fraction(a)} + {format_fraction(b)} "
        f"= ({(a*b.denominator + b*a.denominator)}) / {a.denominator * b.denominator}",
        f"Step 2: The result simplifies to {format_fraction(result['result'])}.",
        f"Step 3: Since {format_fraction(result['result'])} is of the form p/q "
        f"(p, q integers, q ≠ 0), it IS a rational number.",
        f"Step 4: Closure under addition is verified.",
    ]

    lcm = a.denominator * b.denominator  # simplified display
    sum_raw = Fraction(a.numerator * b.denominator + b.numerator * a.denominator,
                       a.denominator * b.denominator)
    steps[0] = (
        f"Step 1: a + b = {format_fraction(a)} + {format_fraction(b)} "
        f"= {a.numerator}×{b.denominator}/{a.denominator}×{b.denominator} + "
        f"{b.numerator}×{a.denominator}/{a.denominator}×{b.denominator} "
        f"= {format_fraction(sum_raw)}"
    )

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Easy" if easy else "Medium",
        cognitive_level="Analyze",
        answer=result,
        hint="Express both with a common denominator (LCM of denominators) and add.",
        steps=steps,
    )


def q_verify_closure_multiplication(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Show that the product of two rational numbers is always a rational number.
    """
    mn, mx = (-10, 10) if easy else (-20, 20)
    md, Md = (2, 8)    if easy else (2, 12)
    a = random_rational(rng, mn, mx, md, Md)
    b = random_rational(rng, mn, mx, md, Md)

    result = verify_closure_multiplication(a, b)

    question_text = (
        f"Show that the product of two rational numbers is always a rational number\n"
        f"(closure property under multiplication) by taking:\n"
        f"   a = {format_fraction(a)},   b = {format_fraction(b)}"
    )

    prod_raw = Fraction(a.numerator * b.numerator, a.denominator * b.denominator)
    steps = [
        f"Step 1: a × b = ({a.numerator}/{a.denominator}) × ({b.numerator}/{b.denominator})",
        f"Step 2: Multiply numerators: {a.numerator} × {b.numerator} = {a.numerator * b.numerator}",
        f"Step 3: Multiply denominators: {a.denominator} × {b.denominator} = {a.denominator * b.denominator}",
        f"Step 4: a × b = {format_fraction(prod_raw)} = {format_fraction(result['result'])}",
        f"Step 5: Since the result is of the form p/q, it is a rational number.",
        f"Step 6: Closure under multiplication is verified.",
    ]

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Easy" if easy else "Medium",
        cognitive_level="Analyze",
        answer=result,
        hint="Multiply numerators together and denominators together.",
        steps=steps,
    )


def q_verify_additive_identity(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Verify that 0 is the additive identity by taking a specific rational number.
    """
    mn, mx = (-12, 12) if easy else (-20, 20)
    md, Md = (2, 8)    if easy else (2, 12)
    x = random_rational(rng, mn, mx, md, Md)

    result = verify_additive_identity(x)

    question_text = (
        f"Show that the additive identity for rational numbers is 0\n"
        f"by taking x = {format_fraction(x)}.\n"
        f"\nVerify that x + 0 = x."
    )

    steps = [
        f"Step 1: x = {format_fraction(x)}",
        f"Step 2: x + 0 = {format_fraction(x)} + 0 = {format_fraction(x)}",
        f"Step 3: Since {format_fraction(x)} + 0 = {format_fraction(x)}, "
        f"the number is unchanged.",
        f"Step 4: Hence, 0 is the additive identity for rational numbers.",
    ]

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Easy",
        cognitive_level="Analyze",
        answer=result,
        hint="Add 0 to x — any number plus 0 equals itself.",
        steps=steps,
    )


def q_verify_multiplicative_identity(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Verify that 1 is the multiplicative identity by taking a specific rational number.
    """
    mn, mx = (-12, 12) if easy else (-20, 20)
    md, Md = (2, 8)    if easy else (2, 12)
    x = random_rational(rng, mn, mx, md, Md)

    result = verify_multiplicative_identity(x)

    question_text = (
        f"Show that the multiplicative identity for rational numbers is 1\n"
        f"by taking x = {format_fraction(x)}.\n"
        f"\nVerify that x × 1 = x."
    )

    steps = [
        f"Step 1: x = {format_fraction(x)}",
        f"Step 2: x × 1 = {format_fraction(x)} × 1 = {format_fraction(x)}",
        f"Step 3: Since {format_fraction(x)} × 1 = {format_fraction(x)}, "
        f"the number is unchanged.",
        f"Step 4: Hence, 1 is the multiplicative identity for rational numbers.",
    ]

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Easy",
        cognitive_level="Analyze",
        answer=result,
        hint="Multiply x by 1 — any number times 1 equals itself.",
        steps=steps,
    )


def q_find_additive_inverse(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Find the additive inverse of a given rational number and verify their sum is 0.
    """
    mn, mx = (-15, 15) if easy else (-30, 30)
    md, Md = (2, 8)    if easy else (2, 15)
    x = random_rational(rng, mn, mx, md, Md)

    result = additive_inverse(x)

    question_text = (
        f"Find the additive inverse of the rational number {format_fraction(x)}\n"
        f"and verify that their sum is the additive identity (0)."
    )

    steps = [
        f"Step 1: The given rational number is {format_fraction(x)}.",
        f"Step 2: The additive inverse of {format_fraction(x)} is "
        f"its negative: {format_fraction(result['inverse'])}.",
        f"Step 3: Sum = {format_fraction(x)} + ({format_fraction(result['inverse'])}) "
        f"= {format_fraction(result['sum'])}.",
        f"Step 4: Since the sum is 0 (the additive identity), the additive inverse is verified.",
    ]

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Easy" if easy else "Medium",
        cognitive_level="Analyze",
        answer=result,
        hint="The additive inverse of p/q is simply -p/q.",
        steps=steps,
    )


def q_find_multiplicative_inverse(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Find the multiplicative inverse of a rational number (≠ 0) and verify product = 1.
    """
    mn, mx = (1, 12) if easy else (1, 20)
    md, Md = (2, 8)  if easy else (2, 12)
    x = random_rational(rng, mn, mx, md, Md, exclude_zero=True)

    result = multiplicative_inverse(x)

    question_text = (
        f"Find the multiplicative inverse of the rational number {format_fraction(x)}\n"
        f"and verify that their product is the multiplicative identity (1)."
    )

    steps = [
        f"Step 1: The given rational number is {format_fraction(x)}.",
        f"Step 2: The multiplicative inverse of {format_fraction(x)} is "
        f"the reciprocal: {format_fraction(result['inverse'])}.",
        f"Step 3: Product = {format_fraction(x)} × {format_fraction(result['inverse'])} "
        f"= {format_fraction(result['product'])}.",
        f"Step 4: Since the product is 1 (the multiplicative identity), "
        f"the multiplicative inverse is verified.",
    ]

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Easy" if easy else "Medium",
        cognitive_level="Analyze",
        answer=result,
        hint="The multiplicative inverse of p/q is q/p (swap numerator and denominator).",
        steps=steps,
    )


def q_distributivity_numerical(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Numerical form of distributive property — verify a × (b + c) = a×b + a×c.
    """
    mn, mx = (-5, 5) if easy else (-10, 10)
    md, Md = (2, 7)  if easy else (2, 10)
    a = random_rational(rng, mn, mx, md, Md)
    b = random_rational(rng, mn, mx, md, Md)
    c = random_rational(rng, mn, mx, md, Md)

    result = verify_distributive(a, b, c)

    question_text = (
        f"Verify the distributive property of multiplication over addition\n"
        f"for rational numbers using general form:\n"
        f"  a = {format_fraction(a)},  b = {format_fraction(b)},  c = {format_fraction(c)}\n"
        f"\nShow that a × (b + c) = a × b + a × c."
    )

    steps = [
        f"Step 1: b + c = {format_fraction(b)} + {format_fraction(c)} "
        f"= {format_fraction(b + c)}",
        f"Step 2: LHS = a × (b + c) = {format_fraction(a)} × {format_fraction(b + c)} "
        f"= {format_fraction(result['lhs'])}",
        f"Step 3: a × b = {format_fraction(a * b)},   a × c = {format_fraction(a * c)}",
        f"Step 4: RHS = a×b + a×c = {format_fraction(a*b)} + {format_fraction(a*c)} "
        f"= {format_fraction(result['rhs'])}",
        f"Step 5: LHS = RHS = {format_fraction(result['lhs'])}  ⇒ Verified.",
    ]

    return Question(
        node_id="c8_math_001",
        question_text=question_text,
        difficulty="Medium" if not easy else "Easy",
        cognitive_level="Analyze",
        answer=result,
        hint="Use LCM to add b and c first, then multiply by a.",
        steps=steps,
    )


# ═════════════════════════════════════════════════════════════════════════════
# ═════════════════════════════════════════════════════════════════════════════

def q_represent_positive_rational(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Represent a positive rational number on the number line.
    """
    md, Md = (2, 4) if easy else (2, 8)
    den = rng.randint(md, Md)
    num = rng.randint(1, den * 3)
    r = Fraction(num, den)

    result = represent_on_number_line(r)

    question_text = (
        f"Represent the rational number {format_fraction(r)} on the number line.\n"
        f"\nDescribe step by step how you would locate this point."
    )

    steps = [
        f"Step 1: {format_fraction(r)} = {fraction_to_float(r)} (decimal value).",
        f"Step 2: Locate the segment {result.segment_label} on the number line.",
        f"Step 3: Divide that segment into {den} equal parts.",
        f"Step 4: From {result.lower_int}, count {num}/{den} of the segment toward {result.upper_int}.",
        f"Step 5: Mark the point — it represents {format_fraction(r)}.",
    ]

    return Question(
        node_id="c8_math_002",
        question_text=question_text,
        difficulty="Easy" if easy else "Medium",
        cognitive_level="Understand",
        answer=result.to_dict(),
        hint="Divide the unit segment into equal parts based on the denominator.",
        steps=steps,
    )


def q_represent_negative_rational(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Represent a negative rational number on the number line.
    """
    md, Md = (2, 5) if easy else (2, 8)
    den = rng.randint(md, Md)
    num = rng.randint(1, den * 3)
    r = Fraction(-num, den)

    result = represent_on_number_line(r)

    question_text = (
        f"Represent the rational number {format_fraction(r)} on the number line.\n"
        f"\nDescribe step by step how you would locate this point."
    )

    steps = [
        f"Step 1: {format_fraction(r)} = {fraction_to_float(r)} (decimal value).",
        f"Step 2: Locate the segment {result.segment_label} on the number line (negative side).",
        f"Step 3: Divide that segment into {den} equal parts.",
        f"Step 4: From {result.lower_int}, move {num}/{den} of the segment toward {result.upper_int}.",
        f"Step 5: Mark the point — it represents {format_fraction(r)}.",
    ]

    return Question(
        node_id="c8_math_002",
        question_text=question_text,
        difficulty="Easy" if easy else "Medium",
        cognitive_level="Understand",
        answer=result.to_dict(),
        hint="Work on the negative side of the origin (left of 0).",
        steps=steps,
    )


def q_compare_two_rationals(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Compare two rational numbers using the number line concept.
    """
    md, Md = (2, 5)  if easy else (2, 8)
    mn, mx = (-8, 8) if easy else (-15, 15)
    a = random_rational(rng, mn, mx, md, Md)
    while True:
        b = random_rational(rng, mn, mx, md, Md)
        if b != a:
            break

    result = compare_on_number_line(a, b)

    relation_sym = {"equal": "=", ">": ">", "<": "<"}[result["relation"]]

    question_text = (
        f"Compare the rational numbers {format_fraction(a)} and {format_fraction(b)}\n"
        f"using the number line.\n"
        f"\nWhich is greater? Fill in the blank with >, <, or =:\n"
        f"   {format_fraction(a)}  ___  {format_fraction(b)}"
    )

    steps = [
        f"Step 1: Convert to decimals: {format_fraction(a)} = {fraction_to_float(a)}, "
        f"{format_fraction(b)} = {fraction_to_float(b)}.",
        f"Step 2: On the number line, the number with the larger decimal is farther to the right.",
        f"Step 3: {fraction_to_float(a)} {'>' if a > b else '<'} {fraction_to_float(b)}",
        f"Step 4: Therefore, {format_fraction(a)} {relation_sym} {format_fraction(b)}.",
        f"Step 5: The greater number is {format_fraction(result['greater'])}.",
    ]

    return Question(
        node_id="c8_math_002",
        question_text=question_text,
        difficulty="Easy" if easy else "Medium",
        cognitive_level="Understand",
        answer=result,
        hint="A number farther to the right on the number line is always greater.",
        steps=steps,
    )


def q_identify_segment(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Identify between which two consecutive integers a rational number lies,
       and how many equal parts the segment must be divided into.
    """
    md, Md = (3, 6)  if easy else (3, 10)
    den = rng.randint(md, Md)
    mn_num, mx_num = (1, den * 2) if easy else (1, den * 3)
    num = rng.randint(mn_num, mx_num)
    r = Fraction(num, den)
    if rng.random() < 0.4:
        r = Fraction(-num, den)

    result = represent_on_number_line(r)
    lower = result.lower_int
    upper = result.upper_int

    question_text = (
        f"The rational number {format_fraction(r)} is to be represented on the number line.\n"
        f"\nAnswer the following:\n"
        f"  (a) Between which two consecutive integers does it lie?\n"
        f"  (b) Into how many equal parts must that segment be divided?\n"
        f"  (c) From {lower}, how many parts must you count to reach {format_fraction(r)}?"
    )

    steps = [
        f"Step 1: Decimal value of {format_fraction(r)} = {fraction_to_float(r)}.",
        f"Step 2: Floor({fraction_to_float(r)}) = {lower},  "
        f"Ceil({fraction_to_float(r)}) = {upper}.",
        f"Step 3: It lies {result.segment_label}.",
        f"Step 4: Divide the segment into {den} equal parts (denominator = {den}).",
        f"Step 5: Count {num}/{den} of the parts from {lower} toward {upper}.",
    ]

    return Question(
        node_id="c8_math_002",
        question_text=question_text,
        difficulty="Easy" if easy else "Medium",
        cognitive_level="Understand",
        answer=result.to_dict(),
        hint="The denominator tells you how many equal parts to divide the segment into.",
        steps=steps,
    )


def q_order_rationals(
    rng: random.Random,
    easy: bool = True,
) -> Question:
    """
    Q: Order a set of 3–4 rational numbers in ascending order using number line concept.
    """
    count = 3 if easy else 4
    md, Md = (2, 5)  if easy else (2, 8)
    mn, mx = (-10, 10) if easy else (-15, 15)
    rationals: List[Fraction] = []
    for _ in range(count):
        rationals.append(random_rational(rng, mn, mx, md, Md))

    sorted_rationals = sorted(rationals)
    sorted_str = " < ".join(format_fraction(r) for r in sorted_rationals)

    ascii_line = generate_number_line_ascii(rationals, width=50)

    question_text = (
        f"Arrange the following rational numbers in ascending order:\n"
        + "\n".join(f"   {i+1}. {format_fraction(r)}" for i, r in enumerate(rationals))
        + "\n\nUse the concept of the number line to justify your answer."
    )

    steps = [
        f"Step 1: Convert each to decimal: " +
        ", ".join(f"{format_fraction(r)} = {fraction_to_float(r)}" for r in rationals),
        f"Step 2: Arrange from smallest (leftmost on number line) to largest (rightmost).",
        f"Step 3: Ascending order: {sorted_str}",
    ]

    answer = {
        "ordered": [format_fraction(r) for r in sorted_rationals],
        "ascii_number_line": ascii_line,
        "rationals": [format_fraction(r) for r in rationals],
    }

    return Question(
        node_id="c8_math_002",
        question_text=question_text,
        difficulty="Medium" if not easy else "Easy",
        cognitive_level="Understand",
        answer=answer,
        hint="Convert to decimals or find a common denominator to compare easily.",
        steps=steps,
    )


# ═════════════════════════════════════════════════════════════════════════════
# ═════════════════════════════════════════════════════════════════════════════

NODE_001_GENERATORS = {
    "commutative_addition":  q_verify_commutative_addition,
    "commutative_multiplication": q_verify_commutative_multiplication,
    "associative_addition":  q_verify_associative_addition,
    "associative_multiplication": q_verify_associative_multiplication,
    "distributive":          q_verify_distributive,
    "distributive_numerical": q_distributivity_numerical,
    "closure_addition":      q_verify_closure_addition,
    "closure_multiplication": q_verify_closure_multiplication,
    "additive_identity":     q_verify_additive_identity,
    "multiplicative_identity": q_verify_multiplicative_identity,
    "additive_inverse":      q_find_additive_inverse,
    "multiplicative_inverse": q_find_multiplicative_inverse,
}

NODE_002_GENERATORS = {
    "represent_positive":    q_represent_positive_rational,
    "represent_negative":    q_represent_negative_rational,
    "compare_two":           q_compare_two_rationals,
    "identify_segment":      q_identify_segment,
    "order_rationals":       q_order_rationals,
}

ALL_GENERATORS = {**NODE_001_GENERATORS, **NODE_002_GENERATORS}


def generate_question(
    node_id: str,
    subtopic: Optional[str] = None,
    seed: int = 0,
    easy: bool = True,
) -> Question:
    """
    Generate a single question for the specified node.

    Parameters
    ----------
    node_id    : "c8_math_001" or "c8_math_002"
    subtopic   : specific property/topic (optional); if None, chosen randomly
    seed       : random seed for reproducibility
    easy       : True → easier number ranges; False → harder

    Returns
    -------
    Question dataclass instance.
    """
    rng = random.Random(seed)

    if node_id == "c8_math_001":
        pool = NODE_001_GENERATORS
    elif node_id == "c8_math_002":
        pool = NODE_002_GENERATORS
    else:
        raise ValueError(f"Unknown node_id: {node_id}. Choose from {list(ALL_GENERATORS.keys())}")

    if subtopic is None:
        subtopic = rng.choice(list(pool.keys()))

    if subtopic not in pool:
        raise ValueError(
            f"Unknown subtopic '{subtopic}' for {node_id}. "
            f"Valid: {list(pool.keys())}"
        )

    generator_fn = pool[subtopic]
    return generator_fn(rng, easy=easy)


def generate_question_set(
    node_id: str,
    count: int = 5,
    seed: int = 0,
    easy: bool = True,
    subtopics: Optional[List[str]] = None,
) -> List[Question]:
    """
    Generate a set of *count* questions for the given node.
    Cycles through subtopics (or uses the provided list) in a seeded order.
    """
    rng = random.Random(seed)
    pool = NODE_001_GENERATORS if node_id == "c8_math_001" else NODE_002_GENERATORS
    topics = subtopics if subtopics else list(pool.keys())

    questions: List[Question] = []
    for i in range(count):
        topic = topics[rng.randint(0, len(topics) - 1)]
        q = generate_question(node_id, subtopic=topic, seed=rng.randint(0, 9999), easy=easy)
        questions.append(q)

    return questions


# ═════════════════════════════════════════════════════════════════════════════
# ═════════════════════════════════════════════════════════════════════════════

def print_question(q: Question, show_answer: bool = True) -> None:
    """Pretty-print a single Question to stdout."""
    print("=" * 70)
    print(f"  Node  : {q.node_id}")
    print(f"  Level : {q.cognitive_level}  |  Difficulty: {q.difficulty}")
    print("-" * 70)
    print(_wrap(q.question_text))
    if q.hint:
        print(f"\n  💡 Hint: {q.hint}")
    if q.steps:
        print("\n  📝 Steps:")
        for step in q.steps:
            print(f"     {step}")
    if show_answer:
        print("\n  ✅ Answer:")
        if isinstance(q.answer, dict):
            for k, v in q.answer.items():
                if k == "ascii_number_line":
                    print(f"     [{k}]:")
                    for line in v.split("\n"):
                        print(f"       {line}")
                elif k in ("tick_marks",):
                    print(f"     {k}: {v}")
                else:
                    print(f"     {k}: {v}")
        else:
            print(f"     {q.answer}")
    print()


def print_question_set(
    questions: List[Question],
    show_answers: bool = True,
) -> None:
    """Pretty-print a list of Questions."""
    for i, q in enumerate(questions, 1):
        print(f"\n{'─'*70}")
        print(f"  QUESTION {i} of {len(questions)}")
        print_question(q, show_answer=show_answers)


# ═════════════════════════════════════════════════════════════════════════════
# ═════════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Class 8 Mathematics — Question Generator"
    )
    parser.add_argument(
        "--node", default="c8_math_001",
        choices=["c8_math_001", "c8_math_002", "both"],
        help="Which node to generate questions for",
    )
    parser.add_argument(
        "--count", type=int, default=3,
        help="Number of questions per node",
    )
    parser.add_argument(
        "--seed", type=int, default=42,
        help="Random seed for reproducibility",
    )
    parser.add_argument(
        "--hard", action="store_true",
        help="Generate harder questions",
    )
    parser.add_argument(
        "--no-answers", action="store_true",
        help="Hide answers",
    )
    parser.add_argument(
        "--subtopic", default=None,
        help="Specific subtopic (optional)",
    )

    args = parser.parse_args()
    easy = not args.hard

    nodes = ["c8_math_001", "c8_math_002"] if args.node == "both" else [args.node]

    for node in nodes:
        print(f"\n{'█'*70}")
        print(f"  NODE: {node}")
        print(f"{'█'*70}")

        qs = generate_question_set(
            node_id=node,
            count=args.count,
            seed=args.seed,
            easy=easy,
            subtopics=[args.subtopic] if args.subtopic else None,
        )
        print_question_set(qs, show_answers=not args.no_answers)