"""
Class 5 Mathematics Solver
Nodes: c5_math_001 (Indian/International numeration), c5_math_002 (Place/Face value)
"""

import random
import re
from typing import Tuple, Optional


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

def _make_rng(seed: int) -> random.Random:
    """Return a seeded Random instance so callers stay deterministic."""
    return random.Random(seed)


def _verify(expected, actual, tol=0) -> bool:
    if tol == 0:
        return expected == actual
    return abs(expected - actual) <= tol


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

INDIAN_PERIODS = [
    ("Crore",       2),   # digits 8-9 (leftmost)
    ("Lakh",        2),   # digits 6-7
    ("Thousand",    2),   # digits 4-5
    ("Hundred",     1),   # digit 3
    ("Ten",         1),   # digit 2
    ("One",         1),   # digit 1
]

INDIAN_PERIOD_NAMES = {
    "Crore": 10**7,
    "Lakh":  10**5,
    "Thousand": 10**3,
    "Hundred": 10**2,
    "Ten":    10**1,
    "One":    10**0,
}

INTER_PERIODS = [
    ("Hundred Million", 3),  # digits 7-9
    ("Million",         3),  # digits 4-6
    ("Thousand",        3),  # digits 2-4   (misleading label, holds hundreds tens ones)
    ("Hundred",         1),  # digit 2
    ("Ten",             1),  # digit 1
    ("One",             1),  # digit 0
]

INTER_PERIOD_NAMES = {
    "Hundred Million": 10**8,
    "Ten Million":     10**7,
    "Million":         10**6,
    "Hundred Thousand":10**5,
    "Ten Thousand":    10**4,
    "Thousand":        10**3,
    "Hundred":         10**2,
    "Ten":             10**1,
    "One":             10**0,
}


def number_to_indian_format(n: int) -> str:
    """Return a string like '45,67,89,012' for the given integer."""
    n = abs(n)
    s = str(n)
    s = s.zfill(9)
    groups = [s[0:3], s[3:5], s[5:7], s[7:9]]
    return ",".join(groups)


def number_to_international_format(n: int) -> str:
    """Return a string like '123,456,789' for the given integer."""
    n = abs(n)
    s = str(n)
    s = s[::-1]
    groups = [s[i:i+3] for i in range(0, len(s), 3)]
    return ",".join(g[::-1] for g in groups[::-1])


def indian_format_to_number(formatted: str) -> int:
    """Convert '45,67,89,012' → integer 456789012."""
    return int(formatted.replace(",", ""))


def international_format_to_number(formatted: str) -> int:
    """Convert '123,456,789' → integer 123456789."""
    return int(formatted.replace(",", ""))


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

_UNITS = ["", "One", "Two", "Three", "Four", "Five",
          "Six", "Seven", "Eight", "Nine", "Ten",
          "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
          "Sixteen", "Seventeen", "Eighteen", "Nineteen"]
_TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty",
         "Sixty", "Seventy", "Eighty", "Ninety"]


def _two_digit_words(n: int) -> str:
    if n < 20:
        return _UNITS[n]
    tens, units = divmod(n, 10)
    if units == 0:
        return _TENS[tens]
    return f"{_TENS[tens]}-{_UNITS[units]}"


def _three_digit_words(n: int) -> str:
    hundreds, rest = divmod(n, 100)
    parts = []
    if hundreds:
        parts.append(f"{_UNITS[hundreds]} Hundred")
    if rest:
        if parts:
            parts.append(_two_digit_words(rest) if rest < 20 else _two_digit_words(rest))
        else:
            parts.append(_two_digit_words(rest))
    return " ".join(parts)


def number_to_indian_words(n: int) -> str:
    """Convert an integer (up to 9 digits) to Indian-system words."""
    if n == 0:
        return "Zero"

    n = abs(n)
    s = str(n).zfill(9)

    crores  = int(s[0:2])
    lakhs   = int(s[2:4])
    thousands = int(s[4:6])
    hundreds  = int(s[6:9])

    parts = []
    if crores:
        parts.append(f"{_two_digit_words(crores)} Crore")
    if lakhs:
        parts.append(f"{_two_digit_words(lakhs)} Lakh")
    if thousands:
        parts.append(f"{_three_digit_words(thousands)} Thousand")
    if hundreds:
        parts.append(_three_digit_words(hundreds))

    return " ".join(parts)


def number_to_international_words(n: int) -> str:
    """Convert an integer (up to 9 digits) to International-system words."""
    if n == 0:
        return "Zero"

    n = abs(n)
    millions = n // 1_000_000
    remainder = n % 1_000_000

    parts = []
    if millions:
        parts.append(f"{_three_digit_words(millions)} Million")
    if remainder:
        thousands = remainder // 1_000
        rest = remainder % 1_000
        if thousands:
            parts.append(f"{_three_digit_words(thousands)} Thousand")
        if rest:
            parts.append(_three_digit_words(rest))

    return " ".join(parts)


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

INDIAN_PLACE_NAMES = [
    "Crores Place",       # index 0  → 10^8
    "Ten Crores Place",   # index 0  → actually combined below
    "Lakhs Place",        # index 2  → 10^5
    "Ten Lakhs Place",    # index 2
    "Thousands Place",    # index 4  → 10^3
    "Ten Thousands Place",
    "Hundreds Place",     # index 6  → 10^2
    "Tens Place",         # index 7  → 10^1
    "Ones Place",         # index 8  → 10^0
]

INTER_PLACE_NAMES = [
    "Hundred Millions Place",  # 10^8
    "Ten Millions Place",      # 10^7
    "Millions Place",          # 10^6
    "Hundred Thousands Place", # 10^5
    "Ten Thousands Place",     # 10^4
    "Thousands Place",         # 10^3
    "Hundreds Place",          # 10^2
    "Tens Place",              # 10^1
    "Ones Place",              # 10^0
]

PLACE_VALUE_POWERS = [10**i for i in range(8, -1, -1)]   # 10^8 … 10^0

INDIAN_LABELS = [
    "Ten Crores", "Crores",
    "Ten Lakhs",  "Lakhs",
    "Ten Thousands", "Thousands",
    "Hundreds",   "Tens", "Ones",
]

INTER_LABELS = [
    "Hundred Millions", "Ten Millions", "Millions",
    "Hundred Thousands", "Ten Thousands", "Thousands",
    "Hundreds", "Tens", "Ones",
]


def digit_place_value(digit: int, position: int) -> int:
    """digit × 10^(8-position) for a 9-digit number (position 0..8)."""
    return digit * (10 ** (8 - position))


def digit_face_value(digit: int) -> int:
    return digit


def analyse_number(n: int) -> dict:
    """Return full breakdown of a 9-digit number."""
    s = str(abs(n)).zfill(9)
    digits = [int(ch) for ch in s]
    inter_places = dict(zip(INTER_LABELS, digits))
    indian_places = dict(zip(INDIAN_LABELS, digits))
    breakdown = []
    for i, d in enumerate(digits):
        breakdown.append({
            "position_from_left": i + 1,
            "digit": d,
            "face_value": d,
            "place_value_in_international": d * PLACE_VALUE_POWERS[i],
            "place_value_label_international": INTER_LABELS[i],
            "place_value_in_indian": d * PLACE_VALUE_POWERS[i],
            "place_value_label_indian": INDIAN_LABELS[i],
        })
    return {
        "number": n,
        "digits": digits,
        "indian_format": number_to_indian_format(n),
        "international_format": number_to_international_format(n),
        "indian_words": number_to_indian_words(n),
        "international_words": number_to_international_words(n),
        "inter_place_mapping": inter_places,
        "indian_place_mapping": indian_places,
        "detailed_breakdown": breakdown,
    }


# ══════════════════════════════════════════════
# ══════════════════════════════════════════════

class C5Math001Solver:
    """
    Indian and International system of numbers – 9 digit numbers
    """

    @staticmethod
    def read_indian(n: int) -> dict:
        words = number_to_indian_words(n)
        formatted = number_to_indian_format(n)
        return {
            "number": n,
            "indian_format": formatted,
            "indian_words": words,
            "step_by_step": [
                f"Step 1: Write the 9-digit number with Indian grouping: {formatted}",
                f"Step 2: Identify periods: Crores ({formatted.split(',')[0]}), "
                f"Lakhs ({formatted.split(',')[1]}), "
                f"Thousands ({formatted.split(',')[2]}), "
                f"Ones ({formatted.split(',')[3]})",
                f"Step 3: Read each period: {words}",
            ],
        }

    @staticmethod
    def read_international(n: int) -> dict:
        words = number_to_international_words(n)
        formatted = number_to_international_format(n)
        return {
            "number": n,
            "international_format": formatted,
            "international_words": words,
            "step_by_step": [
                f"Step 1: Write the 9-digit number with International grouping: {formatted}",
                f"Step 2: Identify periods: Millions ({formatted.split(',')[0]}), "
                f"Thousands ({formatted.split(',')[1]}), "
                f"Ones ({formatted.split(',')[2]})",
                f"Step 3: Read each period: {words}",
            ],
        }

    @staticmethod
    def convert_indian_to_international(indian_formatted: str) -> dict:
        n = indian_format_to_number(indian_formatted)
        inter = number_to_international_format(n)
        return {
            "original_indian": indian_formatted,
            "plain_number": n,
            "international_format": inter,
            "step_by_step": [
                f"Step 1: Remove commas from Indian format: {indian_formatted} → {n}",
                f"Step 2: Apply International grouping (groups of 3 from right): {inter}",
            ],
        }

    @staticmethod
    def convert_international_to_indian(inter_formatted: str) -> dict:
        n = international_format_to_number(inter_formatted)
        indian = number_to_indian_format(n)
        return {
            "original_international": inter_formatted,
            "plain_number": n,
            "indian_format": indian,
            "step_by_step": [
                f"Step 1: Remove commas from International format: {inter_formatted} → {n}",
                f"Step 2: Apply Indian grouping (3, 2, 2, 2 from left after padding to 9 digits): {indian}",
            ],
        }

    @staticmethod
    def compare_systems(n: int) -> dict:
        ind_fmt = number_to_indian_format(n)
        int_fmt = number_to_international_format(n)
        return {
            "number": n,
            "indian_format": ind_fmt,
            "international_format": int_fmt,
            "comparison": [
                f"Indian system groups: {ind_fmt}  (periods: Crores | Lakhs | Thousands | Ones)",
                f"International system groups: {int_fmt}  (periods: Millions | Thousands | Ones)",
                f"Both represent the same value: {n}",
            ],
        }


# ══════════════════════════════════════════════
# ══════════════════════════════════════════════

class C5Math002Solver:
    """
    Place value and face value of digits in 9-digit numbers
    """

    @staticmethod
    def get_face_value(digit: int) -> dict:
        return {
            "digit": digit,
            "face_value": digit,
            "explanation": (
                f"The face value of a digit is the digit itself. "
                f"Face value of {digit} is {digit}."
            ),
        }

    @staticmethod
    def get_place_value(digit: int, position: int) -> dict:
        """
        position: 1-based from the left (1..9)
        """
        power = 8 - (position - 1)          # 8,7,6,5,4,3,2,1,0
        place_val = digit * (10 ** power)
        label_inter = INTER_LABELS[position - 1]
        label_indian = INDIAN_LABELS[position - 1]
        return {
            "digit": digit,
            "position_from_left": position,
            "face_value": digit,
            "place_value": place_val,
            "international_label": label_inter,
            "indian_label": label_indian,
            "step_by_step": [
                f"Step 1: The digit is {digit}",
                f"Step 2: Position from left = {position}, so the place is 10^{power}",
                f"Step 3: Place value = {digit} × 10^{power} = {place_val}",
                f"Step 4 (International): {label_inter}",
                f"Step 4 (Indian): {label_indian}",
            ],
        }

    @staticmethod
    def full_analysis(n: int) -> dict:
        return analyse_number(n)

    @staticmethod
    def find_digit_by_place_value(n: int, place_value: int) -> dict:
        """Given a number and a target place value, find the digit."""
        power = 0
        temp = place_value
        while temp % 10 == 0 and temp > 0:
            temp //= 10
            power += 1
        # power gives us the index from right
        s = str(abs(n)).zfill(9)
        pos_from_right = power  # 0=ones, 1=tens, ...
        idx = 8 - pos_from_right  # index from left
        if idx < 0 or idx >= 9:
            return {"error": "Place value out of range for 9-digit number"}
        digit = int(s[idx])
        return {
            "number": n,
            "target_place_value": place_value,
            "digit_at_that_place": digit,
            "position_from_left": idx + 1,
            "explanation": (
                f"In {str(n).zfill(9)}, the place value {place_value} "
                f"is at position {idx+1} from the left. "
                f"The digit there is {digit}, so face value = {digit}."
            ),
        }

    @staticmethod
    def compare_face_and_place(n: int) -> dict:
        """Show difference between face value and place value for each digit."""
        s = str(abs(n)).zfill(9)
        rows = []
        for i, ch in enumerate(s):
            d = int(ch)
            pv = d * PLACE_VALUE_POWERS[i]
            rows.append({
                "position": i + 1,
                "digit": d,
                "face_value": d,
                "place_value": pv,
                "difference": pv - d,
            })
        return {
            "number": n,
            "note": "Face value is the digit itself. Place value = digit × positional value.",
            "rows": rows,
        }


# ══════════════════════════════════════════════
# ══════════════════════════════════════════════

def solve(node_id: str, question_type: str, **kwargs):
    """
    Unified solver entry point.

    Usage examples
    --------------
    solve("c5_math_001", "read_indian",           n=456789012)
    solve("c5_math_001", "read_international",    n=456789012)
    solve("c5_math_001", "convert_indian_to_international",
            indian_formatted="12,34,56,789")
    solve("c5_math_001", "convert_international_to_indian",
            inter_formatted="123,456,789")
    solve("c5_math_001", "compare_systems",       n=456789012)

    solve("c5_math_002", "get_face_value",        digit=5)
    solve("c5_math_002", "get_place_value",       digit=5, position=1)
    solve("c5_math_002", "full_analysis",         n=543210987)
    solve("c5_math_002", "find_digit_by_place_value", n=543210987, place_value=10000000)
    solve("c5_math_002", "compare_face_and_place", n=543210987)
    """
    solvers = {
        "c5_math_001": {
            "read_indian":                        C5Math001Solver.read_indian,
            "read_international":                 C5Math001Solver.read_international,
            "convert_indian_to_international":    C5Math001Solver.convert_indian_to_international,
            "convert_international_to_indian":    C5Math001Solver.convert_international_to_indian,
            "compare_systems":                    C5Math001Solver.compare_systems,
        },
        "c5_math_002": {
            "get_face_value":                     C5Math002Solver.get_face_value,
            "get_place_value":                    C5Math002Solver.get_place_value,
            "full_analysis":                      C5Math002Solver.full_analysis,
            "find_digit_by_place_value":          C5Math002Solver.find_digit_by_place_value,
            "compare_face_and_place":             C5Math002Solver.compare_face_and_place,
        },
    }
    try:
        fn = solvers[node_id][question_type]
    except KeyError:
        raise ValueError(
            f"Unknown node/question_type: {node_id}/{question_type}. "
            f"Available: {list(solvers.keys())}"
        )
    result = fn(**kwargs)
    result["node_id"] = node_id
    result["question_type"] = question_type
    return result


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

def _run_tests():
    failures = []

    def check(label, got, expected):
        if got != expected:
            failures.append(f"FAIL  {label}: got {got!r}, expected {expected!r}")

    # --- c5_math_001 ---
    s001 = C5Math001Solver()
    r = s001.read_indian(456789012)
    check("indian_format",    r["indian_format"],    "45,67,89,012")
    check("indian_words_1",   r["indian_words"],
          "Forty-Five Crore Sixty-Seven Lakh Eighty-Nine Thousand Twelve")

    r2 = s001.read_international(456789012)
    check("inter_format",     r2["international_format"], "456,789,012")
    check("inter_words",      r2["international_words"],
          "Four Hundred Fifty-Six Million Seven Hundred Eighty-Nine Thousand Twelve")

    r3 = s001.convert_indian_to_international("12,34,56,789")
    check("indian→inter number",  r3["plain_number"],        123456789)
    check("indian→inter format",  r3["international_format"], "123,456,789")

    r4 = s001.convert_international_to_indian("987,654,321")
    check("inter→indian number",  r4["plain_number"],        987654321)
    check("inter→indian format",  r4["indian_format"],       "98,76,54,321")

    # --- c5_math_002 ---
    s002 = C5Math002Solver()
    r5 = s002.get_place_value(digit=5, position=1)
    check("place_value pos1", r5["place_value"], 500000000)

    r6 = s002.get_place_value(digit=3, position=5)
    check("place_value pos5", r6["place_value"], 3000)

    r7 = s002.find_digit_by_place_value(n=543210987, place_value=10000000)
    check("find_digit_1cr",   r7["digit_at_that_place"], 4)

    r8 = s002.full_analysis(543210987)
    check("analysis digits",  r8["digits"], [5,4,3,2,1,0,9,8,7])

    if failures:
        print("\n".join(failures))
    else:
        print("All tests passed ✓")
    return len(failures)


if __name__ == "__main__":
    _run_tests()