"""intent_extractor.py -- extract what dimension is being asked.

Looks at the question text to determine what the student needs to
find. This is NOT regex pattern matching on the full question --
it looks at the "ask" portion (usually the last sentence or the
phrase after "find/calculate/determine").

The intent is expressed as a physical dimension (speed, area,
volume, current, etc.) or a special type (number, equation,
expression, matrix).
"""
from __future__ import annotations

import re
from typing import List, Optional, Tuple

from backend.its.solver.unit_registry import dimensions_of, resolve


# --------------------------------------------------------------------------- #
# Ask signal extraction
# --------------------------------------------------------------------------- #

_ASK_RE = re.compile(
    r"(?:find|calculate|compute|determine|evaluate|solve|"
    r"how\s+(?:much|many|far|long|fast|tall)|"
    r"what\s+(?:is|are|will|would|was|were)|"
    r"at\s+what\s+rate|"
    r"in\s+how\s+many|"
    r"express|"
    r"the\s+value\s+of|"
    r"value\s+of)\s+(.+)",
    re.I)


def extract_ask_phrase(text: str) -> str:
    """Extract the phrase after the ask signal.

    "Find the speed of the car" -> "the speed of the car"
    "Calculate the area of the triangle" -> "the area of the triangle"
    "What is the current through the resistor?" ->
        "the current through the resistor?"
    "What would be the cost of fencing a rectangular park whose
        length is 150 m..." -> "the cost of fencing a rectangular park"
    """
    if not text:
        return ""
    # Try the last sentence (ask is usually at the end)
    sentences = re.split(r"[.!?]+", text)
    last = sentences[-1].strip() if sentences else text.strip()
    # Try full text first, then last sentence
    for candidate in [text, last]:
        m = _ASK_RE.search(candidate)
        if m:
            phrase = m.group(1).strip().rstrip(".?!")
            # truncate at the first subordinate clause boundary —
            # 'whose length is 150', 'where the rate is', 'at the rate
            # of', 'if the side', 'when the car' introduce GIVENS,
            # not the ask.  Keep only the asked noun phrase.
            phrase = re.split(
                r"\s+(?:whose|where|that|which|given\s+that|"
                r"if|when|while|although|though|"
                r"at\s+the\s+rate|with\s+the|having)\b",
                phrase, maxsplit=1, flags=re.I)[0].strip()
            return phrase
    return ""


# --------------------------------------------------------------------------- #
# Dimension from ask phrase
# --------------------------------------------------------------------------- #

# Maps ask-phrase keywords to physical dimensions
_ASK_DIM_MAP = {
    # physics
    "speed": "speed", "velocity": "speed",
    "distance": "length", "displacement": "length",
    "length": "length", "height": "length",
    "width": "length", "depth": "length",
    "time": "time", "duration": "time",
    "mass": "mass", "weight": "mass",
    "area": "area",
    "volume": "volume",
    "force": "force",
    "energy": "energy", "work": "energy",
    "power": "power",
    "pressure": "pressure",
    "density": "density",
    "current": "current",
    "voltage": "voltage", "potential": "voltage",
    "resistance": "resistance",
    "capacitance": "capacitance",
    "charge": "charge",
    "frequency": "frequency",
    "angle": "angle",
    "temperature": "temperature",
    # chemistry
    "concentration": "concentration", "molarity": "concentration",
    "molality": "concentration",
    "moles": "amount", "mole": "amount",
    "molar mass": "molarmass",
    "ph": "dimensionless", "poh": "dimensionless",
    # commerce
    "profit": "money", "loss": "money",
    "interest": "money", "amount": "money",
    "price": "money", "cost": "money",
    "discount": "money", "markup": "money",
    "depreciation": "money",
    "capital": "money",
    # maths (special types, not dimensions)
    "number": "number",
    "count": "number",
    "ways": "number",
    "value": "number",
    "x": "number",
    "y": "number",
    "n": "number",
    "ratio": "dimensionless",
    "probability": "dimensionless",
    "percentage": "percentage",
    "percent": "percentage",
    "fraction": "dimensionless",
    "lcm": "number",
    "hcf": "number",
    "gcd": "number",
    "gcf": "number",
    # special types
    "equation": "equation",
    "expression": "expression",
    "derivative": "expression",
    "integral": "expression",
    "matrix": "matrix",
    "determinant": "number",
    "roots": "number",
    "solutions": "number",
}


def extract_asked_dimension(text: str) -> Tuple[str, float]:
    """Determine what dimension the question is asking for.

    Returns (dimension, confidence).
    dimension is a string like "speed", "area", "current", "number",
    "money", "equation", "expression", "matrix", or "unknown".
    confidence is 0..1.
    """
    ask_phrase = extract_ask_phrase(text)
    if not ask_phrase:
        return "unknown", 0.0

    ask_lower = ask_phrase.lower().strip()

    # 1. Direct keyword match in the ask phrase
    for keyword, dim in sorted(_ASK_DIM_MAP.items(),
                                key=lambda x: -len(x[0])):
        if keyword in ask_lower:
            return dim, 0.9

    # 2. Check for units in the ask phrase
    # "Find the speed in km/h" -> "km/h" resolves to "speed"
    ask_dims = dimensions_of(ask_phrase)
    if len(ask_dims) == 1:
        return ask_dims.pop(), 0.85
    if len(ask_dims) > 1:
        # Multiple dimensions in ask -- ambiguous
        return "unknown", 0.3

    # 3. Check for "find X" where X is a variable
    var_match = re.search(r"\bfind\s+(?:the\s+)?(?:value\s+of\s+)?"
                          r"([a-z])\b", ask_lower)
    if var_match:
        return "number", 0.7

    # 4. Check for "how many" / "how much" -> count or amount
    if re.search(r"\bhow\s+(?:many|much)\b", ask_lower):
        # "how many" -> number/count
        # "how much" -> could be money or amount
        if "how many" in ask_lower:
            return "number", 0.8
        # "how much" with money context
        if re.search(r"\b(rupees?|rs\.?|inr|cost|price|pay)\b",
                     ask_lower):
            return "money", 0.7
        return "number", 0.5

    # 5. Check for "ratio" / "ratio of"
    if "ratio" in ask_lower:
        return "dimensionless", 0.8

    # 6. Check for "probability"
    if "probability" in ask_lower:
        return "dimensionless", 0.9

    # 7. Check for "perimeter" / "circumference"
    if "perimeter" in ask_lower or "circumference" in ask_lower:
        return "length", 0.85

    # 8. Check for "area"
    if "area" in ask_lower:
        return "area", 0.85

    # 9. Check for "volume"
    if "volume" in ask_lower:
        return "volume", 0.85

    return "unknown", 0.2


# --------------------------------------------------------------------------- #
# Quantity extraction (unit-based, no bare numbers)
# --------------------------------------------------------------------------- #

def extract_quantities(text: str) -> List[Tuple[float, str, str]]:
    """Extract quantities with their units from the text.

    Returns [(value, dimension, unit_word), ...].

    This is UNIT-BASED extraction -- it only extracts numbers that
    are followed by (or preceded by, for money) a recognized unit
    word. Bare numbers without units are NOT extracted here.

    Values are kept in their ORIGINAL unit (no canonical conversion).
    The formula compute functions work with raw values. Unit
    conversion happens only when a formula explicitly needs it
    (e.g. physics formulas that require SI consistency).
    """
    from backend.its.solver.unit_registry import (
        CANONICAL, _parse_number, _SYNONYMS,
    )

    if not text:
        return []

    quantities = []

    # Money units come BEFORE the number: "Rs 500", "rupees 100"
    _MONEY_BEFORE_RE = re.compile(
        r"\b(?P<unit>Rs\.?|INR|rupees?|Rs)\s*(?P<val>\d+(?:\.\d+)?)\b",
        re.I)
    for m in _MONEY_BEFORE_RE.finditer(text):
        val = _parse_number(m.group("val"))
        if val is None:
            continue
        unit_str = m.group("unit")
        resolved = resolve(unit_str)
        if resolved is None:
            continue
        canon, _factor = resolved
        dim = CANONICAL[canon][0]
        quantities.append((val, dim, unit_str))

    # Standard units come AFTER the number: "10 m", "5 cm", "2 kg"
    # Build a pattern from the synonym keys
    _UNIT_WORDS = sorted(_SYNONYMS.keys(), key=lambda k: -len(k))
    # Skip money units (already handled above) and very short ones
    # that cause false positives
    _UNIT_WORDS = [u for u in _UNIT_WORDS
                   if u.lower() not in ("rs", "inr", "rupees", "rupee")
                   and len(u) >= 1]
    _unit_alt = "|".join(re.escape(u) for u in _UNIT_WORDS)
    _NUM_UNIT_RE = re.compile(
        r"(?P<val>\d+(?:\.\d+)?)\s*(?P<unit>" + _unit_alt + r")\b",
        re.I)

    for m in _NUM_UNIT_RE.finditer(text):
        val_str = m.group("val")
        unit_str = m.group("unit")

        # Skip if this was already captured as money (overlap)
        # by checking if the match start is inside a money match
        resolved = resolve(unit_str)
        if resolved is None:
            continue

        canon, _factor = resolved
        dim = CANONICAL[canon][0]

        val = _parse_number(val_str)
        if val is None:
            continue

        # Keep raw value -- NO canonical conversion
        quantities.append((val, dim, unit_str))

    return quantities


def extract_bare_numbers(text: str) -> List[Tuple[float, str, str]]:
    """Extract bare numbers (no units) for pure math problems.

    Only called when subject is maths and no unit-based quantities
    were found. Returns [(value, 'number', ''), ...].

    Filters out:
      - Years (1800-2100)
      - Numbers that are part of metadata
    """
    from backend.its.solver.metadata_stripper import is_year_like

    if not text:
        return []

    # Strip metadata first
    from backend.its.solver.metadata_stripper import strip_metadata
    clean = strip_metadata(text)

    quantities = []
    _BARE_NUM_RE = re.compile(r"\b(\d+(?:\.\d+)?)\b")

    for m in _BARE_NUM_RE.finditer(clean):
        val = float(m.group(1))
        # Skip years
        if is_year_like(val):
            continue
        quantities.append((val, "number", ""))

    return quantities
