"""measure_lexicon.py — Grammar of measurement attributes.

A small CLOSED class in English: measure adjectives/verbs map to unit
families ("tall" -> height, "weighs" -> mass, "costs" -> money,
"takes" -> time). This is attribute grammar, not topic vocabulary -
it lets the ledger bind "the tank is 3 m tall" without the word
"height" ever appearing.
"""

from __future__ import annotations

import re
from typing import Dict, List, Optional, Tuple

# attribute word (stem-matched) -> unit family
ATTRIBUTE_FAMILY: Dict[str, str] = {
    "tall": "length", "height": "length", "high": "length",
    "long": "length", "length": "length", "wide": "length",
    "width": "length", "breadth": "length", "deep": "length",
    "depth": "length", "radius": "length", "diameter": "length",
    "away": "length", "distant": "length",
    "heavy": "mass", "weigh": "mass", "mass": "mass",
    "fast": "velocity", "speed": "velocity", "velocity": "velocity",
    "accelerat": "acceleration",
    "take": "time", "last": "time", "duration": "time",
    "journey": "time",
    "hot": "temperature", "temperatur": "temperature",
    "hold": "volume", "capacit": "volume", "fill": "volume",
    "contain": "volume", "discharge": "flow",
    "cost": "money", "price": "money", "purchas": "money",
    "earn": "money", "pay": "money", "spend": "money",
    "deposit": "money", "invest": "money", "save": "money",
    "power": "power", "dissipat": "power", "rate": "rate",
    "current": "current", "resist": "resistance",
    "voltage": "voltage", "potential": "voltage",
    "heat": "energy", "energy": "energy", "work": "energy",
    "moles": "amount", "mole": "amount",
    "concentrat": "molarity", "molar": "molarity",
    "dissolv": "amount",
    "water": "volume", "petrol": "volume", "milk": "volume",
    "oil": "volume",
}

# interrogative constructions -> the FAMILY being asked about
QUESTION_FAMILY: List[Tuple[str, str]] = [
    (r"how\s+(long|much\s+time)", "time"),
    (r"how\s+far", "length"),
    (r"how\s+(fast|speed)", "velocity"),
    (r"how\s+heavy|what\s+weight|how\s+much\s+.{0,12}weigh", "mass"),
    (r"how\s+much\s+(water|petrol|milk|oil|space)|what\s+(volume|capacity)",
     "volume"),
    (r"how\s+much\s+(interest|money|cost|profit)|what\s+(interest|cost|"
     r"price|profit)", "money"),
    (r"how\s+many\s+(litres|liters|moles)", "volume"),
    (r"how\s+much\s+heat|what\s+(heat|energy)", "energy"),
    (r"how\s+many\s+(moles)", "amount"),
    (r"what\s+(percentage|percent)", "percentage"),
    (r"what\s+(average)", "dimensionless"),
]


def attribute_family(word: str) -> Optional[str]:
    """Family for a (stemmed) attribute word, or None."""
    w = word.lower()
    for stem, fam in ATTRIBUTE_FAMILY.items():
        if w.startswith(stem) or stem.startswith(w):
            return fam
    return None


def question_family(text: str) -> Optional[str]:
    """The family the question asks about ('how long' -> time)."""
    low = text.lower()
    for pattern, fam in QUESTION_FAMILY:
        if re.search(pattern, low):
            return fam
    return None


def sentence_split(text: str) -> List[str]:
    import re as _re

    return [s.strip() for s in _re.split(r"(?<=[.!?])\s+", text) if s.strip()]


def sentence_of(text: str, pos: int) -> Tuple[str, int]:
    """(sentence_text, sentence_index) containing character position."""
    idx = 0
    for i, s in enumerate(sentence_split(text)):
        start = text.find(s, idx)
        end = start + len(s)
        if start <= pos < end:
            return s, i
        idx = start + 1
        if idx > pos:
            break
    return text, 0
