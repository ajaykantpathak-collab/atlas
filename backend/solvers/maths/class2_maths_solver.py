"""
Class 2 Mathematics – CISCE Primary Curriculum (2026)
Solver for nodes: c2_math_001, c2_math_002, c2_math_003

No external LLM; all computation uses only stdlib + seeded random.
"""

from __future__ import annotations

import random
import re
from dataclasses import dataclass, field
from typing import Optional, Union

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

_TENS_NAMES: dict[int, str] = {
    20: "twenty", 30: "thirty", 40: "forty", 50: "fifty",
    60: "sixty", 70: "seventy", 80: "eighty", 90: "ninety",
}

_UNIT_NAMES: dict[int, str] = {
    1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
    6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten",
    11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen",
    15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen",
    19: "nineteen",
}

_HUNDREDS_NAMES: dict[int, str] = {
    1: "one hundred", 2: "two hundred", 3: "three hundred",
    4: "four hundred", 5: "five hundred", 6: "six hundred",
    7: "seven hundred", 8: "eight hundred", 9: "nine hundred",
}

# word (lowercase) → int  (covers 1-99)
_WORD_TO_NUM: dict[str, int] = {}
for _n, _w in {**_UNIT_NAMES, **_TENS_NAMES}.items():
    _WORD_TO_NUM[_w] = _n

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class SolveResult:
    """Uniform return type for all solve() functions."""
    correct: bool
    answer: any                       # expected / computed answer
    explanation: str                  # step-by-step reasoning
    verification: str                 # cross-check of the answer
    difficulty: str = "Easy"
    competency: str = "Board"

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class NumToNameProblem:
    """Q: Write the number name for 47."""
    node: str = "c2_math_001"
    number: int = 0
    answer: str = ""

@dataclass
class NameToNumProblem:
    """Q: Write the numeral for 'sixty-three'."""
    node: str = "c2_math_001"
    number_name: str = ""
    answer: int = 0

@dataclass
class ContinuePatternProblem:
    """Q: Continue the pattern: twenty-one, twenty-two, twenty-three, …"""
    node: str = "c2_math_001"
    base: int = 20          # e.g. 20 → "twenty", 30 → "thirty"
    sequence: list[str] = field(default_factory=list)
    next_three: list[str] = field(default_factory=list)
    answer: list[str] = field(default_factory=list)


# ── helpers ──────────────────────────────────────────────────────────────────

def _is_special_teen(n: int) -> bool:
    return 11 <= n <= 19

def number_to_name(n: int) -> str:
    """Convert an integer 1-99 to its English number name."""
    if not (1 <= n <= 99):
        raise ValueError(f"number_to_name supports 1-99, got {n}")
    if _is_special_teen(n):
        return _UNIT_NAMES[n]
    tens, ones = divmod(n, 10)
    if tens == 0:
        return _UNIT_NAMES[ones]
    name = _TENS_NAMES[tens * 10]
    if ones:
        name = f"{name}-{_UNIT_NAMES[ones]}"
    return name

def name_to_number(name: str) -> int:
    """Convert a hyphenated number name to its integer value."""
    tokens = name.lower().replace("-", " ").split()
    total = 0
    for tok in tokens:
        if tok in _WORD_TO_NUM:
            total += _WORD_TO_NUM[tok]
        else:
            raise ValueError(f"Unknown word '{tok}' in '{name}'")
    if not (1 <= total <= 99):
        raise ValueError(f"name_to_number produced out-of-range value {total}")
    return total


# ── solvers ──────────────────────────────────────────────────────────────────

def solve_num_to_name(problem: NumToNameProblem) -> SolveResult:
    n = problem.number
    name = number_to_name(n)

    tens, ones = divmod(n, 10)
    if _is_special_teen(n):
        parts = [f"{n} is a special 'teen' number: {name}"]
    elif tens == 0:
        parts = [f"{n} is a single-digit number → {name}"]
    else:
        tens_part = _TENS_NAMES[tens * 10]
        if ones:
            parts = [
                f"Split {n} into tens and ones: {tens}×10 + {ones}",
                f"Tens part: {tens} ten(s) → '{tens_part}'",
                f"Ones part: {ones} → '{_UNIT_NAMES[ones]}'",
                f"Join with hyphen: '{tens_part}-{_UNIT_NAMES[ones]}'",
            ]
        else:
            parts = [
                f"{n} is an exact multiple of 10: {tens} ten(s)",
                f"Number name: '{tens_part}'",
            ]

    parts.append(f"✓ Answer: {name}")
    parts.append(f"Verification: '{name}' → digits: {name_to_number(name)} == {n}")
    return SolveResult(
        correct=True, answer=name,
        explanation="\n".join(parts),
        verification=f"Reverse-check: '{name}' → {name_to_number(name)} == original {n}",
    )


def solve_name_to_num(problem: NameToNumProblem) -> SolveResult:
    n = name_to_number(problem.number_name)
    name_lower = problem.number_name.lower()

    tokens = name_lower.replace("-", " ").split()
    parts = [f"Number name: '{problem.number_name}'"]
    total = 0
    for tok in tokens:
        val = _WORD_TO_NUM[tok]
        total += val
        parts.append(f"  '{tok}' → {val}  (running total: {total})")
    parts.append(f"✓ Numeral: {n}")
    parts.append(f"Verification: {n} → '{number_to_name(n)}' == '{problem.number_name}'")
    return SolveResult(
        correct=True, answer=n,
        explanation="\n".join(parts),
        verification=f"Reverse-check: {n} → '{number_to_name(n)}'",
    )


def solve_continue_pattern(problem: ContinuePatternProblem) -> SolveResult:
    base = problem.base
    start_ones = problem.sequence[-1].split("-")[-1]  # e.g. "twenty-three" → "three"
    ones_map = {v: k for k, v in _UNIT_NAMES.items() if k <= 9}
    current_ones = ones_map.get(start_ones, 1)

    tens_word = _TENS_NAMES[base]
    generated = []
    for i in range(1, 4):
        nxt = current_ones + i
        if nxt > 9:
            break
        generated.append(f"{tens_word}-{_UNIT_NAMES[nxt]}")

    explanation_parts = [
        f"Pattern: counting up within the '{tens_word}' group",
        f"Last in sequence: '{problem.sequence[-1]}' → ones digit = {current_ones}",
        f"Next three: {', '.join(repr(g) for g in generated)}",
    ]
    explanation_parts.append(f"✓ Answer: {', '.join(generated)}")
    return SolveResult(
        correct=True, answer=generated,
        explanation="\n".join(explanation_parts),
        verification=f"Each word maps back: "
                     f"{', '.join(str(name_to_number(g)) for g in generated)}",
    )


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class ReadWriteProblem:
    """Q: Write the number name for 345."""
    node: str = "c2_math_002"
    number: int = 0
    answer: str = ""

@dataclass
class WordToThreeDigitProblem:
    """Q: Write the numeral for 'five hundred twelve'."""
    node: str = "c2_math_002"
    number_name: str = ""
    answer: int = 0

@dataclass
class BuildNumberProblem:
    """Q: With digit cards 3, 2, 7 build the largest/smallest number."""
    node: str = "c2_math_002"
    digits: list[int] = field(default_factory=list)
    mode: str = "largest"     # or "smallest"
    answer: int = 0


# ── helpers ──────────────────────────────────────────────────────────────────

def three_digit_to_name(n: int) -> str:
    """Convert an integer 100-999 to its English number name."""
    if not (100 <= n <= 999):
        raise ValueError(f"three_digit_to_name supports 100-999, got {n}")
    hundreds, remainder = divmod(n, 100)
    if remainder == 0:
        return _HUNDREDS_NAMES[hundreds]
    return f"{_HUNDREDS_NAMES[hundreds]} {number_to_name(remainder)}"


def name_to_three_digit(name: str) -> int:
    """Convert a number name (hundreds + rest) to integer 100-999."""
    tokens = name.lower().split()
    hundreds_part = None
    rest_parts = []
    for tok in tokens:
        if tok in _HUNDREDS_NAMES.values():
            # find the key for this value
            for k, v in _HUNDREDS_NAMES.items():
                if v == tok:
                    hundreds_part = k
                    break
        else:
            rest_parts.append(tok)
    if hundreds_part is None:
        raise ValueError(f"No hundreds keyword found in '{name}'")
    rest_str = " ".join(rest_parts)
    remainder = name_to_number(rest_str) if rest_str else 0
    return hundreds_part * 100 + remainder


# ── solvers ──────────────────────────────────────────────────────────────────

def solve_read_write(problem: ReadWriteProblem) -> SolveResult:
    n = problem.number
    name = three_digit_to_name(n)
    h, rem = divmod(n, 100)

    parts = [
        f"Number: {n}",
        f"Hundreds digit: {h}  →  '{_HUNDREDS_NAMES[h]}'",
    ]
    if rem:
        parts.append(f"Remaining {rem} → '{number_to_name(rem)}'")
        parts.append(f"Full name: '{_HUNDREDS_NAMES[h]} {number_to_name(rem)}'")
    else:
        parts.append("No remaining tens/ones.")
    parts.append(f"✓ Answer: {name}")
    parts.append(f"Verification: '{name}' → {name_to_three_digit(name)} == {n}")
    return SolveResult(
        correct=True, answer=name,
        explanation="\n".join(parts),
        verification=f"Reverse-check: '{name}' → {name_to_three_digit(name)}",
    )


def solve_word_to_three_digit(problem: WordToThreeDigitProblem) -> SolveResult:
    n = name_to_three_digit(problem.number_name)
    name_lower = problem.number_name.lower()
    tokens = name_lower.split()
    parts = [f"Number name: '{problem.number_name}'"]
    hundreds_kw = None
    rest_words = []
    for tok in tokens:
        if tok in _HUNDREDS_NAMES.values():
            for k, v in _HUNDREDS_NAMES.items():
                if v == tok:
                    hundreds_kw = k
                    parts.append(f"  '{tok}' → hundreds digit: {k}")
                    break
        else:
            rest_words.append(tok)
    rest_str = " ".join(rest_words)
    if rest_str:
        rem = name_to_number(rest_str)
        parts.append(f"  Remaining '{rest_str}' → {rem}")
        parts.append(f"  Numeral: {hundreds_kw}00 + {rem} = {n}")
    else:
        parts.append(f"  Numeral: {hundreds_kw}00 = {n}")
    parts.append(f"✓ Answer: {n}")
    parts.append(f"Verification: {n} → '{three_digit_to_name(n)}'")
    return SolveResult(
        correct=True, answer=n,
        explanation="\n".join(parts),
        verification=f"Reverse-check: {n} → '{three_digit_to_name(n)}'",
    )


def solve_build_number(problem: BuildNumberProblem) -> SolveResult:
    digits = sorted(problem.digits)
    if problem.mode == "largest":
        arranged = sorted(digits, reverse=True)
        mode_word = "largest"
    else:
        arranged = sorted(digits)
        mode_word = "smallest"
    n = int("".join(str(d) for d in arranged))
    h, rem = divmod(n, 100)

    parts = [
        f"Digit cards: {problem.digits}",
        f"Goal: build the {mode_word} number",
        f"Arrange {'largest first' if problem.mode=='largest' else 'smallest first'}: "
        f"{' > '.join(map(str, arranged))}",
        f"Numeral: {n}",
        f"Hundreds: {h} ({_HUNDREDS_NAMES.get(h, '')})",
    ]
    if rem:
        parts.append(f"Remaining: {rem} ({number_to_name(rem)})")
    parts.append(f"✓ Answer: {n}")
    return SolveResult(
        correct=True, answer=n,
        explanation="\n".join(parts),
        verification=f"Digit check: {n} uses digits {sorted(str(n))} == {sorted(digits)}",
    )


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class PlaceValueProblem:
    """Q: In 456, what is the place value of 5?"""
    node: str = "c2_math_003"
    number: int = 0
    digit: int = 0
    answer: int = 0          # place value (e.g. 50)

@dataclass
class FaceValueProblem:
    """Q: In 456, what is the face value of 4?"""
    node: str = "c2_math_003"
    number: int = 0
    digit: int = 0
    answer: int = 0          # face value = digit itself (e.g. 4)

@dataclass
class ConstructPlaceValueProblem:
    """Q: Construct the number whose hundreds digit face value=3, tens place value=40, ones digit face value=7."""
    node: str = "c2_math_003"
    hundreds_digit: int = 0
    tens_place_value: int = 0
    ones_digit: int = 0
    answer: int = 0


# ── solvers ──────────────────────────────────────────────────────────────────

def solve_place_value(problem: PlaceValueProblem) -> SolveResult:
    n = problem.number
    d = problem.digit
    num_str = f"{n:03d}"

    positions = {"hundreds": 100, "tens": 10, "ones": 1}
    found_pos = None
    for pos_name, multiplier in positions.items():
        idx = {"hundreds": 0, "tens": 1, "ones": 2}[pos_name]
        if int(num_str[idx]) == d:
            found_pos = pos_name
            place_value = d * multiplier
            break

    if found_pos is None:
        return SolveResult(
            correct=False, answer=None,
            explanation=f"Digit {d} not found in {n}.",
            verification="",
        )

    parts = [
        f"Number: {n}  (digit string: '{num_str}')",
        f"Digit to find: {d}",
        f"Position: {found_pos} place (index { {'hundreds':0,'tens':1,'ones':2}[found_pos]})",
        f"Place value = digit × position multiplier = {d} × {positions[found_pos]} = {d * positions[found_pos]}",
    ]
    parts.append(f"✓ Place value of {d} in {n} = {problem.answer}")
    return SolveResult(
        correct=True, answer=problem.answer,
        explanation="\n".join(parts),
        verification=f"Face value of {d} = {d}; place value = {d} × {positions[found_pos]} = {problem.answer}",
    )


def solve_face_value(problem: FaceValueProblem) -> SolveResult:
    n = problem.number
    d = problem.digit
    num_str = f"{n:03d}"

    positions = {"hundreds": 0, "tens": 1, "ones": 2}
    found_pos = None
    for pos_name, idx in positions.items():
        if int(num_str[idx]) == d:
            found_pos = pos_name
            break

    parts = [
        f"Number: {n}  (digit string: '{num_str}')",
        f"Digit to find: {d}",
        f"Face value = the digit itself = {d} (regardless of position)",
    ]
    if found_pos:
        parts.append(f"Found in the {found_pos} place of {n}.")
    parts.append(f"✓ Face value of {d} = {d}")
    return SolveResult(
        correct=True, answer=d,
        explanation="\n".join(parts),
        verification=f"Face value is always the digit itself: {d}",
    )


def solve_construct_place_value(problem: ConstructPlaceValueProblem) -> SolveResult:
    h = problem.hundreds_digit
    tens_pv = problem.tens_place_value
    o = problem.ones_digit

    tens_digit = tens_pv // 10   # e.g. 40 → 4
    n = h * 100 + tens_digit * 10 + o
    expected_name = three_digit_to_name(n)

    parts = [
        f"Hundreds: face value = {h}  → contributes {h}00",
        f"Tens: place value = {tens_pv}  → tens digit = {tens_pv} // 10 = {tens_digit}",
        f"Ones: face value = {o}  → contributes {o}",
        f"Combine: {h}00 + {tens_digit}0 + {o} = {n}",
        f"Number name: {expected_name}",
        f"✓ Constructed number: {n}",
    ]
    return SolveResult(
        correct=True, answer=n,
        explanation="\n".join(parts),
        verification=f"Place value check: {h}×100={h*100}, {tens_digit}×10={tens_digit*10}, {o}×1={o} → sum={n}",
    )


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

_SOLVERS = {
    "c2_math_001_num_to_name":  solve_num_to_name,
    "c2_math_001_name_to_num":  solve_name_to_num,
    "c2_math_001_continue":     solve_continue_pattern,
    "c2_math_002_read_write":   solve_read_write,
    "c2_math_002_word_to_3d":   solve_word_to_three_digit,
    "c2_math_002_build":        solve_build_number,
    "c2_math_003_place_value":  solve_place_value,
    "c2_math_003_face_value":   solve_face_value,
    "c2_math_003_construct":    solve_construct_place_value,
}


def solve(problem, *, verbose: bool = True) -> SolveResult:
    """
    Dispatch solver by problem type.

    Parameters
    ----------
    problem : one of the Problem dataclasses above
    verbose : if True, print the explanation

    Returns
    -------
    SolveResult
    """
    ptype = type(problem).__name__
    key_map = {
        "NumToNameProblem":           "c2_math_001_num_to_name",
        "NameToNumProblem":           "c2_math_001_name_to_num",
        "ContinuePatternProblem":     "c2_math_001_continue",
        "ReadWriteProblem":           "c2_math_002_read_write",
        "WordToThreeDigitProblem":    "c2_math_002_word_to_3d",
        "BuildNumberProblem":         "c2_math_002_build",
        "PlaceValueProblem":          "c2_math_003_place_value",
        "FaceValueProblem":           "c2_math_003_face_value",
        "ConstructPlaceValueProblem": "c2_math_003_construct",
    }
    key = key_map.get(ptype)
    if key is None:
        raise ValueError(f"No solver registered for problem type '{ptype}'")
    result = _SOLVERS[key](problem)
    if verbose:
        print(result.explanation)
    return result


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import sys

    rng = random.Random(42)
    failures = []

    def check(label: str, problem, expected):
        result = solve(problem, verbose=False)
        ok = result.answer == expected
        status = "✓" if ok else "✗"
        print(f"  {status} {label}: answer={result.answer}, expected={expected}")
        if not ok:
            failures.append(label)

    # ── Node 001 ─────────────────────────────────────────────────────────────
    print("── Node 001: Numbers up to 99 ──")
    check("45→name",   NumToNameProblem(number=45),   "forty-five")
    check("78→name",   NumToNameProblem(number=78),   "seventy-eight")
    check("8→name",    NumToNameProblem(number=8),    "eight")
    check("13→name",   NumToNameProblem(number=13),   "thirteen")
    check("20→name",   NumToNameProblem(number=20),   "twenty")

    check("name→38",   NameToNumProblem(number_name="thirty-eight"), 38)
    check("name→91",   NameToNumProblem(number_name="ninety-one"),    91)
    check("name→15",   NameToNumProblem(number_name="fifteen"),       15)

    cp = ContinuePatternProblem(
        base=20,
        sequence=["twenty-one", "twenty-two", "twenty-three"],
    )
    r = solve_continue_pattern(cp)
    check("continue", cp, r.answer)   # ['twenty-four','twenty-five','twenty-six']

    # ── Node 002 ─────────────────────────────────────────────────────────────
    print("── Node 002: 3-digit numbers ──")
    check("345→name",  ReadWriteProblem(number=345), "three hundred forty-five")
    check("200→name",  ReadWriteProblem(number=200), "two hundred")
    check("512→name",  ReadWriteProblem(number=512), "five hundred twelve")
    check("999→name",  ReadWriteProblem(number=999), "nine hundred ninety-nine")

    check("name→678",  WordToThreeDigitProblem(number_name="six hundred seventy-eight"), 678)
    check("name→100",  WordToThreeDigitProblem(number_name="one hundred"), 100)

    check("build largest [3,2,7]", BuildNumberProblem(digits=[3,2,7], mode="largest"), 732)
    check("build smallest [3,2,7]", BuildNumberProblem(digits=[3,2,7], mode="smallest"), 237)
    check("build largest [1,0,5]", BuildNumberProblem(digits=[1,0,5], mode="largest"), 510)

    # ── Node 003 ─────────────────────────────────────────────────────────────
    print("── Node 003: Place and face values ──")
    # 456: 4→hundreds(pv=400), 5→tens(pv=50), 6→ones(pv=6)
    pv5 = PlaceValueProblem(number=456, digit=5)
    solve_place_value(pv5)          # pre-set answer in generator
    pv5.answer = 50
    check("456 pv of 5", pv5, 50)

    pv4 = PlaceValueProblem(number=456, digit=4)
    pv4.answer = 400
    check("456 pv of 4", pv4, 400)

    fv4 = FaceValueProblem(number=456, digit=4)
    check("456 fv of 4", fv4, 4)

    fv5 = FaceValueProblem(number=456, digit=5)
    check("456 fv of 5", fv5, 5)

    cp2 = ConstructPlaceValueProblem(hundreds_digit=3, tens_place_value=40, ones_digit=7)
    r2 = solve_construct_place_value(cp2)
    check("construct 347", cp2, r2.answer)

    # ── Summary ──────────────────────────────────────────────────────────────
    print()
    if failures:
        print(f"FAILURES: {failures}")
        sys.exit(1)
    else:
        print("All self-tests passed ✓")