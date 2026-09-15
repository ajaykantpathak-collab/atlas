"""
Deterministic Solver – Class 1 Mathematics (CISCE Primary Curriculum)
Handles validation & step-by-step computation for nodes c1_math_001,
c1_math_002, and c1_math_003.
All functions are pure (no I/O) and deterministic.
"""

import random
import math


# ─────────────────────────────────────────────────────────────
#  c1_math_001  |  Numbers and Numerals from 1 to 20
# ─────────────────────────────────────────────────────────────

def solve_count_to_20(objects_count: int) -> dict:
    """Validate that objects_count is in [1, 20] and return its details."""
    if not 1 <= objects_count <= 20:
        raise ValueError("objects_count must be between 1 and 20")
    number_names = {
        1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
        6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten",
        11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen",
        15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen",
        19: "nineteen", 20: "twenty",
    }
    return {
        "numeral": objects_count,
        "number_name": number_names[objects_count],
        "valid": True,
        "message": f"{number_names[objects_count]} ({objects_count}) is the correct count.",
    }


def solve_compare(a: int, b: int) -> dict:
    """Compare two numbers (both in [1, 20]) and return relation."""
    if not (1 <= a <= 20 and 1 <= b <= 20):
        raise ValueError("Both numbers must be between 1 and 20")
    if a == b:
        relation = "equal"
        symbol = "="
        message = f"{a} and {b} are equal (a = b)."
    elif a > b:
        relation = "greater"
        symbol = ">"
        message = f"{a} is greater than {b} (a > b)."
    else:
        relation = "lesser"
        symbol = "<"
        message = f"{a} is less than {b} (a < b)."
    return {"a": a, "b": b, "relation": relation, "symbol": symbol, "message": message}


def solve_numeral_recognition(numeral: int) -> dict:
    """Return number name for a numeral in [1, 20]."""
    if not 1 <= numeral <= 20:
        raise ValueError("numeral must be between 1 and 20")
    names = [
        "one", "two", "three", "four", "five",
        "six", "seven", "eight", "nine", "ten",
        "eleven", "twelve", "thirteen", "fourteen", "fifteen",
        "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
    ]
    return {"numeral": numeral, "number_name": names[numeral - 1]}


# ─────────────────────────────────────────────────────────────
#  c1_math_002  |  Introduction to Zero (Subtraction Pattern)
# ─────────────────────────────────────────────────────────────

def solve_zero_subtraction(a: int) -> dict:
    """Compute a - a and return result + conceptual explanation."""
    if not 1 <= a <= 20:
        raise ValueError("a must be between 1 and 20 for this level")
    result = a - a
    return {
        "minuend": a,
        "subtrahend": a,
        "expression": f"{a} - {a}",
        "result": result,
        "concept": (
            f"When you take away all {a} objects from a group of {a}, "
            f"nothing is left. We call this 'zero', written as {result}."
        ),
    }


def solve_zero_in_pattern(start: int, steps: list) -> dict:
    """
    Given a starting count and a list of step-by-step subtractions,
    verify each step and confirm the final result.
    Example: start=5, steps=[1,1,1,1,1] → 5-1-1-1-1-1 = 0
    """
    current = start
    history = [f"Start with {start}"]
    for i, s in enumerate(steps, 1):
        if not 1 <= s <= current:
            raise ValueError(
                f"Step {i}: cannot subtract {s} from {current}"
            )
        prev = current
        current -= s
        history.append(f"Step {i}: {prev} - {s} = {current}")
    return {
        "start": start,
        "steps": steps,
        "history": history,
        "final_result": current,
        "is_zero": current == 0,
        "message": (
            f"After all subtractions, {current} objects remain."
            + (" This is zero — nothing left!" if current == 0 else "")
        ),
    }


def validate_zero_concept(answer: str) -> dict:
    """Check if a child's conceptual answer about zero is acceptable."""
    acceptable = {
        "zero", "nothing", "none", "empty", "no", "0",
        "nothing left", "none left", "no objects",
    }
    normalized = answer.strip().lower()
    is_correct = normalized in acceptable
    return {
        "answer": answer,
        "is_correct": is_correct,
        "feedback": (
            "Correct! Zero means nothing or none left."
            if is_correct
            else f"'{answer}' is not quite right. Think: when all objects are taken away, "
                 "what remains? Nothing — that is zero."
        ),
    }


# ─────────────────────────────────────────────────────────────
#  c1_math_003  |  Counting 1–99 via Tens & Ones
# ─────────────────────────────────────────────────────────────

def solve_tens_ones(number: int) -> dict:
    """Decompose a number (1–99) into tens and ones."""
    if not 1 <= number <= 99:
        raise ValueError("number must be between 1 and 99")
    tens = number // 10
    ones = number % 10
    bundle_words = {0: "", 1: "one", 2: "two", 3: "three", 4: "four",
                    5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine"}
    ones_words = {0: "no", 1: "one", 2: "two", 3: "three", 4: "four",
                  5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine"}
    description_parts = []
    if tens > 0:
        description_parts.append(f"{bundle_words[tens]} ten{'s' if tens > 1 else ''}")
    if ones > 0:
        description_parts.append(f"{ones_words[ones]} one{'s' if ones > 1 else ''}")
    description = " and ".join(description_parts) if description_parts else "zero (no objects)"

    return {
        "number": number,
        "tens": tens,
        "ones": ones,
        "description": description,
        "expression": f"{tens}×10 + {ones}×1 = {tens*10 + ones}",
        "message": (
            f"{number} is made of {bundle_words[tens]} ten{'s' if tens > 1 else ''}"
            + (f" and {ones_words[ones]} one{'s' if ones > 1 else ''}" if ones > 0 else "")
            + f" → {tens} tens + {ones} ones = {number}."
        ),
    }


def solve_from_bundles(tens: int, ones: int) -> dict:
    """Given bundles-of-ten count and loose-ones count, return total number."""
    if not (0 <= tens <= 9 and 0 <= ones <= 9):
        raise ValueError("tens and ones must each be 0–9")
    if tens == 0 and ones == 0:
        raise ValueError("At least one of tens or ones must be > 0")
    total = tens * 10 + ones
    bundle_words = {0: "", 1: "one", 2: "two", 3: "three", 4: "four",
                    5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine"}
    ones_words = {0: "no", 1: "one", 2: "two", 3: "three", 4: "four",
                  5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine"}
    return {
        "tens": tens,
        "ones": ones,
        "total": total,
        "description": (
            f"{bundle_words[tens]} ten{'s' if tens != 1 else ''} "
            f"and {ones_words[ones]} one{'s' if ones != 1 else ''}"
            if tens > 0 or ones > 0 else "zero"
        ),
        "message": (
            f"{tens} bundle{'s' if tens != 1 else ''} of 10 = {tens*10}, "
            f"{ones} loose one{'s' if ones != 1 else ''} = {ones}. "
            f"Total = {total}."
        ),
    }


# ─────────────────────────────────────────────────────────────
#  Utility
# ─────────────────────────────────────────────────────────────

def seeded_rng(seed: int = 42) -> random.Random:
    """Return a deterministic Random instance for reproducible question generation."""
    return random.Random(seed)