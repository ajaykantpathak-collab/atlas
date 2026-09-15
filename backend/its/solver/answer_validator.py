"""answer_validator.py -- validate solver answers against expected
units, ranges, and question type.

This is the FINAL gate before an answer is returned as VERIFIED.
It prevents wrong answers from being promoted (the "1999" bug,
negative counts, year values for math questions, etc.).

Rules:
  1. Answer dimension must match asked dimension
  2. Answer must be in a plausible range for the dimension
  3. Answer must not be a year (1800-2100) unless asked for a year
  4. Answer must be positive for count-based questions
  5. Answer must be finite (not NaN, not infinity)
"""
from __future__ import annotations

import math
from typing import Optional, Tuple

from backend.its.solver.metadata_stripper import is_year_like


# --------------------------------------------------------------------------- #
# Dimension-based range validation
# --------------------------------------------------------------------------- #

# Plausible ranges for physical dimensions (min, max) in SI units
_DIM_RANGES = {
    "speed": (0.0, 3e8),          # 0 to speed of light (m/s)
    "length": (0.0, 1e12),        # 0 to astronomical (m)
    "time": (0.0, 1e15),          # 0 to geological (s)
    "mass": (0.0, 1e30),           # 0 to stellar (kg)
    "area": (0.0, 1e20),          # 0 to continental (m^2)
    "volume": (0.0, 1e30),        # 0 to oceanic (m^3)
    "force": (-1e15, 1e15),       # signed (N)
    "energy": (-1e15, 1e15),      # signed (J)
    "power": (0.0, 1e15),         # 0 to power-plant (W)
    "pressure": (0.0, 1e12),      # 0 to core-of-earth (Pa)
    "density": (0.0, 1e10),       # 0 to white-dwarf (kg/m^3)
    "current": (-1e6, 1e6),       # signed (A)
    "voltage": (-1e9, 1e9),       # signed (V)
    "resistance": (0.0, 1e12),    # 0 to insulator (ohm)
    "capacitance": (0.0, 1e6),    # 0 to supercapacitor (F)
    "charge": (-1e6, 1e6),        # signed (C)
    "frequency": (0.0, 1e15),     # 0 to gamma-ray (Hz)
    "angle": (-720.0, 720.0),     # -2 to +2 full turns (degrees)
    "temperature": (-300.0, 1e6), # -273C to plasma (C)
    "money": (-1e15, 1e15),       # signed (INR)
    "amount": (0.0, 1e9),         # 0 to industrial (mol)
    "concentration": (0.0, 1e6),  # 0 to pure (mol/L)
    "molarmass": (0.0, 1e6),      # 0 to polymer (g/mol)
    "percentage": (-1e6, 1e6),    # signed (%)
    "dimensionless": (-1e15, 1e15),
    "number": (-1e15, 1e15),
}


# --------------------------------------------------------------------------- #
# Validation
# --------------------------------------------------------------------------- #

def validate_answer(
    answer: float,
    asked_dim: str,
    question_text: str = "",
) -> Tuple[bool, str]:
    """Validate a computed answer.

    Returns (is_valid, reason).
    is_valid=True means the answer passes all checks.
    is_valid=False means the answer should be rejected; reason
    explains why.
    """
    if answer is None:
        return False, "answer is None"

    # 1. Must be finite
    if not isinstance(answer, (int, float)):
        return False, f"answer is not numeric: {type(answer)}"
    try:
        val = float(answer)
    except (TypeError, ValueError):
        return False, f"cannot convert to float: {answer}"
    if not math.isfinite(val):
        return False, f"answer is not finite: {val}"

    # 2. Must not be a year (unless explicitly asked for a year)
    if is_year_like(val) and "year" not in (asked_dim or "").lower():
        # Check if the question explicitly asks for a year
        if "year" not in (question_text or "").lower():
            return False, f"answer {val} looks like a year, not a " \
                         f"problem answer"

    # 3. Range check for the dimension
    if asked_dim in _DIM_RANGES:
        lo, hi = _DIM_RANGES[asked_dim]
        if val < lo or val > hi:
            return False, f"answer {val} out of range for " \
                         f"{asked_dim} ({lo}, {hi})"

    # 4. Count-based questions must be positive
    count_words = ["how many", "number of", "count", "ways",
                   "selections", "arrangements", "permutations",
                   "combinations"]
    if any(w in (question_text or "").lower() for w in count_words):
        if val < 0:
            return False, f"answer {val} is negative for a count " \
                         f"question"
        if val != int(val):
            return False, f"answer {val} is not an integer for a " \
                         f"count question"

    # 5. Probability must be 0..1
    if "probability" in (question_text or "").lower() and \
            asked_dim == "dimensionless":
        if val < 0 or val > 1:
            return False, f"probability {val} out of [0, 1]"

    return True, "valid"
