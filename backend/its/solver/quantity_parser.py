"""quantity_parser.py — Quantity extraction from raw problem text.

Tool-backed (quantulum3) with a graceful regex fallback. Output is a
list of Quantity objects:

    value        numeric value
    unit_name    quantulum3 unit name ('ampere', 'kilogram', ...) or None
    family       coarse unit family for slot binding (UNIT_FAMILIES)
    surface      the text span the quantity came from
    context      ~60 chars of surrounding text (the binding signal)

Bare numbers (no unit) are kept with their context - the semantic
binder in the router matches their context against variable
descriptions, which is how "principal of 5000" binds to p_ even though
no unit exists for money-in-text.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import List, Optional

# quantulum3 unit name -> coarse family (aligned with variable_registry)
UNIT_FAMILY_MAP = {
    "ampere": "current", "ohm": "resistance", "volt": "voltage",
    "watt": "power", "joule": "energy", "kilojoule": "energy",
    "electronvolt": "energy", "newton": "force", "kilogram": "mass",
    "gram": "mass", "tonne": "mass", "metre per second": "velocity",
    "kilometre per second": "velocity", "kilometre per hour": "velocity",
    "mile per hour": "velocity", "centimetre per second": "velocity",
    "metre per second squared": "acceleration",
    "metre": "length", "kilometre": "length", "centimetre": "length",
    "millimetre": "length", "second": "time", "year": "time",
    "minute": "time", "hour": "time", "day": "time",
    "degree Celsius": "temperature", "kelvin": "temperature",
    "mole": "amount", "litre": "volume", "millilitre": "volume",
    "cubic metre": "volume", "cubic centimetre": "volume",
    "pascal": "pressure", "kilopascal": "pressure",
    "atmosphere": "pressure", "bar": "pressure",
    "coulomb": "charge", "farad": "capacitance", "tesla": "field_b",
    "hertz": "frequency", "square metre": "area",
    "square centimetre": "area", "percentage": "percentage",
    "per year": "rate", "dimensionless": "dimensionless",
    "kilogram per cubic metre": "density",
    "newton metre": "torque", "metre squared": "area",
    "kilogram per metre": "lineardensity", "pascal second": "viscosity",
    "newton per metre": "stiffness", "mole per litre": "molarity",
    "gram per mole": "molarmass", "volt second": "flux",
    "weber": "flux", "diopter": "dioptricpower", "rupee": "money",
    "celer": "velocity",
    "percentage per year": "percentage",
    "per year": "rate", "per second": "rate", "per cent": "percentage",
    "percent": "percentage", "year": "time", "years": "time",
}


@dataclass
class Quantity:
    value: float
    unit_name: Optional[str]
    family: str
    surface: str
    context: str


def _family_for(unit_name: Optional[str]) -> str:
    if not unit_name:
        return "dimensionless"
    return UNIT_FAMILY_MAP.get(unit_name, "other")


def _context_of(text: str, start: int, end: int, pad: int = 45) -> str:
    lo = max(0, start - pad)
    hi = min(len(text), end + pad)
    return " ".join(text[lo:hi].split())


def parse_quantities(text: str) -> List[Quantity]:
    """Extract quantities with units using quantulum3; regex fallback
    for the speed/length patterns when the library is unavailable.
    Also extracts ORDINALS ("the 10th term" -> 10) which carry slot
    information no other signal provides."""
    quants: List[Quantity] = []
    try:
        from quantulum3 import parser as q3parser

        for q in q3parser.parse(text):
            span = getattr(q, "surface", "") or ""
            # Skip pure-unit false positives with no credible number
            if span and not re.search(r"\d", span):
                continue
            quants.append(Quantity(
                value=float(q.value),
                unit_name=q.unit.name,
                family=_family_for(q.unit.name),
                surface=span,
                context=_context_of(text, q.span[0], q.span[1]),
            ))
    except Exception:
        pass

    if not quants:
        # Regex fallback: length/speed patterns from the modeling layer
        speed_re = re.compile(
            r"(\d+(?:\.\d+)?)\s*(km|cm|mm|m)\s*(?:/\s*|\s+per\s+)"
            r"(ms|s|sec|second|seconds|min|minute|minutes|h|hr|hour|hours)\b",
            re.IGNORECASE)
        length_re = re.compile(r"(\d+(?:\.\d+)?)\s*(km|cm|mm|m)\b(?!\s*/)",
                               re.IGNORECASE)
        consumed: List = []
        for m in speed_re.finditer(text):
            consumed.append((m.start(), m.end()))
            quants.append(Quantity(
                float(m.group(1)), "metre per second", "velocity",
                m.group(0), _context_of(text, m.start(), m.end())))
        for m in length_re.finditer(text):
            if any(s <= m.start() < e for s, e in consumed):
                continue
            quants.append(Quantity(
                float(m.group(1)), m.group(2).lower(), "length",
                m.group(0), _context_of(text, m.start(), m.end())))

    # Ordinals: "the 10th term", "the 5th observation" (skip ordinals
    # already captured as part of a quantity span)
    for m in re.finditer(r"\b(\d+)(?:st|nd|rd|th)\b", text,
                         re.IGNORECASE):
        token = m.group(0)
        if any(token in q.surface for q in quants):
            continue
        quants.append(Quantity(
            float(m.group(1)), None, "ordinal",
            token, _context_of(text, m.start(), m.end())))

    # Bare numbers only when nothing else was found at all
    if not quants:
        for m in re.finditer(r"\b(\d+(?:\.\d+)?)\b", text):
            quants.append(Quantity(
                float(m.group(1)), None, "dimensionless",
                m.group(0), _context_of(text, m.start(), m.end())))
            if len(quants) >= 8:
                break
    return quants


def split_intent(text: str):
    """Split the problem into (given_part, intent_part).

    Intent spans start at find/calculate/what is/how much/how many/
    determine/derive/compute; the given part is everything before.
    Falls back to (text, text) when no question phrase exists.
    """
    m = re.search(
        r"\b(find|calculate|compute|determine|derive|what is|what will|"
        r"how much|how many|when will|when does|at what)\b",
        text, re.IGNORECASE)
    if not m:
        return text, text
    return text[:m.start()], text[m.start():]


# --------------------------------------------------------------------------- #
# Structural grammar rules: constructions where similarity cannot
# distinguish part from whole ("percentage of A is B" - A is the whole,
# B is the part). These encode TEXTBOOK SENTENCE GRAMMAR, not vocabulary,
# and are used both for direct binding and as candidate-ranking bonuses.
# --------------------------------------------------------------------------- #

STRUCTURAL_HINTS = [
    (r"percentage\s+of\s+(-?[\d.]+)\s+is\s+(-?[\d.]+)",
     {"y": 1, "x": 2}),
    (r"(-?[\d.]+)\s+is\s+what\s+percentage\s+of\s+(-?[\d.]+)",
     {"x": 1, "y": 2}),
    (r"average\s+of\s+([\d.]+)\s+(?:numbers?|values?|items?|observations?)"
     r"\s+is\s+(-?[\d.]+)",
     {"n": 1, "avg": 2}),
    (r"principal\s+of\s+(-?[\d.]+)",
     {"p_": 1}),
    (r"rate\s+of\s+(-?[\d.]+)",
     {"r": 1}),
    (r"for\s+([\d.]+)\s+years",
     {"t": 1}),
    (r"first\s+term\s+is\s+(-?[\d.]+)",
     {"a_": 1}),
    (r"common\s+difference\s+is\s+(-?[\d.]+)",
     {"d_": 1}),
]


def structural_bindings(text: str, allowed_vars) -> dict:
    """Direct bindings from grammar patterns; var names must be in
    allowed_vars. Returns {var: value}."""
    for pattern, roles in STRUCTURAL_HINTS:
        m = re.search(pattern, text, re.IGNORECASE)
        if not m:
            continue
        proposed = {var: float(m.group(g)) for var, g in roles.items()
                    if var in allowed_vars}
        if len(proposed) == len(roles):
            return proposed
    return {}
