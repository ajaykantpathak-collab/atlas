"""spacy_parser.py -- dependency-tree-based question parser.

Uses spaCy dependency parsing to extract quantities with their
roles from question text. Walks the dependency tree from each
number to find its associated noun/verb context, then uses
MiniLM embeddings to classify the role semantically.

This replaces both regex extraction and LLM generation:
  - spaCy gives us the STRUCTURE (which number belongs to which noun)
  - MiniLM gives us the SEMANTICS (what role that noun plays)
  - Together: fast, deterministic, handles new phrasings

Pipeline:
  1. spaCy parses text -> tokens, POS, deps, lemmas
  2. Find all NUM tokens -> each has a head noun (via nummod)
  3. Walk up the dependency tree to find the verb/noun context
  4. Resolve the unit from the head noun (m -> length, Rs -> money)
  5. Classify the role using MiniLM (buy -> cost_price, sell -> selling_price)
  6. Extract the intent from the "find/calculate" verb's object
"""
from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

import spacy
from spacy.tokens import Token, Doc

from backend.its.solver.unit_registry import resolve, CANONICAL


# --------------------------------------------------------------------------- #
# spaCy model (lazy load)
# --------------------------------------------------------------------------- #

_NLP = None


def _get_nlp():
    global _NLP
    if _NLP is None:
        _NLP = spacy.load("en_core_web_sm")
    return _NLP


# --------------------------------------------------------------------------- #
# Unit detection from token context
# --------------------------------------------------------------------------- #

# Map common unit words to canonical dimensions
_UNIT_WORD_TO_DIM = {
    # length
    "m": "length", "cm": "length", "mm": "length", "km": "length",
    "meter": "length", "meters": "length", "metre": "length",
    "centimeter": "length", "centimeters": "length",
    "millimeter": "length", "millimeters": "length",
    "kilometer": "length", "kilometers": "length",
    "ft": "length", "feet": "length", "foot": "length",
    "inch": "length", "inches": "length",
    # area
    "m2": "area", "cm2": "area", "km2": "area",
    "sq": "area", "square": "area",
    "hectare": "area", "ha": "area",
    # volume
    "l": "volume", "liter": "volume", "liters": "volume",
    "litre": "volume", "litres": "volume",
    "ml": "volume", "milliliter": "volume",
    "m3": "volume", "cm3": "volume",
    # time
    "s": "time", "sec": "time", "second": "time", "seconds": "time",
    "min": "time", "minute": "time", "minutes": "time",
    "h": "time", "hr": "time", "hour": "time", "hours": "time",
    "day": "time", "days": "time",
    "year": "time", "years": "time",
    "annum": "time",
    # mass
    "kg": "mass", "g": "mass", "gram": "mass", "grams": "mass",
    "kilogram": "mass", "kilograms": "mass",
    "mg": "mass", "milligram": "mass",
    "ton": "mass", "tonne": "mass", "tonnes": "mass",
    # speed
    "km/h": "speed", "kmph": "speed", "kph": "speed",
    "m/s": "speed", "mps": "speed",
    "mph": "speed", "mi/h": "speed",
    # money
    "rs": "money", "rs.": "money", "rupees": "money",
    "rupee": "money", "inr": "money",
    "$": "money", "dollar": "money", "dollars": "money",
    # percentage
    "%": "percentage", "percent": "percentage",
    # temperature
    "c": "temperature", "celsius": "temperature",
    "f": "temperature", "fahrenheit": "temperature",
    "k": "temperature", "kelvin": "temperature",
    # angle
    "deg": "angle", "degree": "angle", "degrees": "angle",
    "rad": "angle", "radian": "angle", "radians": "angle",
    # physics
    "n": "force", "newton": "force", "newtons": "force",
    "j": "energy", "joule": "energy", "joules": "energy",
    "w": "power", "watt": "power", "watts": "power",
    "kw": "power", "mw": "power",
    "v": "voltage", "volt": "voltage", "volts": "voltage",
    "a": "current", "ampere": "current", "amperes": "current",
    "amp": "current", "amps": "current",
    "ohm": "resistance", "ohms": "resistance",
    "pa": "pressure", "pascal": "pressure", "pascals": "pressure",
    "bar": "pressure",
    "hz": "frequency", "hertz": "frequency",
    "c": "charge", "coulomb": "charge", "coulombs": "charge",
    "f": "capacitance", "farad": "capacitance", "farads": "capacitance",
    # chemistry
    "mol": "amount", "mole": "amount", "moles": "amount",
    "m": "concentration", "molar": "concentration",
    "g/mol": "molarmass", "g/mol": "molarmass",
}


def _detect_unit_from_token(token: Token) -> Tuple[str, Optional[str]]:
    """Detect unit and dimension from a spaCy token or its neighbors.

    Returns (unit_word, dimension). dimension is None if unknown.

    Disambiguation rules:
      - "m" after a length context (length, width, height, radius,
        side, distance) -> metre (length)
      - "m" after a chemistry context (solution, concentration,
        molarity) -> molar (concentration)
      - "m" alone (no context) -> metre (length, the common case)
    """
    # For a NUM token, the head is usually the unit noun
    head = token.head
    if head and head.pos_ in ("NOUN", "PROPN", "SYM"):
        word = head.text.lower().strip(".")
        if word in _UNIT_WORD_TO_DIM:
            # Disambiguate "m" (metre vs molar)
            if word == "m":
                # Check grandparent for context
                gp = head.head
                if gp and gp.lemma_.lower() in (
                        "solution", "concentration", "molarity",
                        "molar", "acid", "base", "dilute"):
                    return head.text, "concentration"
                # Default: metre
                return head.text, "length"
            return head.text, _UNIT_WORD_TO_DIM[word]

    # Check token's own text
    own = token.text.lower().strip(".")
    if own in _UNIT_WORD_TO_DIM:
        return token.text, _UNIT_WORD_TO_DIM[own]

    # Check next token
    if token.i + 1 < len(token.doc):
        next_tok = token.doc[token.i + 1]
        next_word = next_tok.text.lower().strip(".")
        if next_word in _UNIT_WORD_TO_DIM:
            return next_tok.text, _UNIT_WORD_TO_DIM[next_word]

    # Try unit_registry resolve
    for candidate in [head.text if head else "", token.text,
                      token.doc[token.i + 1].text if token.i + 1 < len(token.doc) else ""]:
        if not candidate:
            continue
        resolved = resolve(candidate)
        if resolved:
            canon, _ = resolved
            dim = CANONICAL[canon][0]
            # Disambiguate "m" from unit_registry
            if candidate.lower().strip(".") == "m":
                # Check context for chemistry
                gp = head.head if head else None
                if gp and gp.lemma_.lower() in (
                        "solution", "concentration", "molarity"):
                    return candidate, "concentration"
                return candidate, "length"
            return candidate, dim

    return "", None


# --------------------------------------------------------------------------- #
# Role classification via dependency walking
# --------------------------------------------------------------------------- #

# Verb lemma -> role mapping (deterministic, from dependency tree)
_VERB_LEMMA_TO_ROLE = {
    "buy": "cost_price",
    "purchase": "cost_price",
    "sell": "selling_price",
    "cost": "cost_price",
    "pay": "amount_paid",
    "earn": "earnings",
    "spend": "expenditure",
    "save": "savings",
    "borrow": "principal",
    "lend": "principal",
    "invest": "principal",
    "deposit": "principal",
    "travel": "speed",
    "move": "speed",
    "run": "speed",
    "drive": "speed",
    "fly": "speed",
    "fill": "fill_rate",
    "drain": "drain_rate",
    "leak": "drain_rate",
    "mix": "concentration",
    "dilute": "concentration",
    "heat": "temperature",
    "cool": "temperature",
    "weigh": "mass",
    "measure": "value",
}

# Noun lemma -> role mapping
_NOUN_LEMMA_TO_ROLE = {
    "length": "length",
    "width": "width",
    "breadth": "width",
    "height": "height",
    "depth": "depth",
    "radius": "radius",
    "diameter": "diameter",
    "side": "side",
    "base": "base",
    "perimeter": "perimeter",
    "circumference": "circumference",
    "area": "area",
    "volume": "volume",
    "principal": "principal",
    "amount": "amount",
    "rate": "rate",
    "interest": "interest",
    "time": "time",
    "speed": "speed",
    "velocity": "speed",
    "distance": "distance",
    "displacement": "distance",
    "mass": "mass",
    "weight": "mass",
    "force": "force",
    "energy": "energy",
    "power": "power",
    "pressure": "pressure",
    "temperature": "temperature",
    "voltage": "voltage",
    "current": "current",
    "resistance": "resistance",
    "capacity": "capacity",
    "price": "price",
    "cost": "cost_price",
    "profit": "profit",
    "loss": "loss",
    "discount": "discount",
    "markup": "markup",
    "capital": "capital",
    "share": "share",
    "dividend": "dividend",
    "mole": "amount",
    "moles": "amount",
    "molarity": "concentration",
    "molality": "concentration",
    "ph": "ph",
    "concentration": "concentration",
    "angle": "angle",
    "frequency": "frequency",
    "charge": "charge",
    "capacitance": "capacitance",
}


# Unit words that should be SKIPPED when walking for roles
# (they are just units, not the role-defining noun/verb)
_UNIT_WORDS_SKIP = {
    "m", "cm", "mm", "km", "ft", "in", "yd",
    "m2", "cm2", "km2", "sq", "ha",
    "l", "ml", "m3", "cm3",
    "s", "sec", "min", "h", "hr", "year", "annum",
    "kg", "g", "mg", "ton", "tonne",
    "km/h", "kmph", "m/s", "mph",
    "rs", "rs.", "rupees", "rupee", "inr", "$", "dollar",
    "%", "percent",
    "c", "f", "k", "celsius", "fahrenheit", "kelvin",
    "deg", "degree", "rad", "radian",
    "n", "newton", "j", "joule", "w", "watt", "kw", "mw",
    "v", "volt", "a", "ampere", "amp", "ohm",
    "pa", "pascal", "bar", "hz", "hertz",
    "coulomb", "farad", "mol", "mole", "molar",
    "g/mol",
}


def _walk_to_role(token: Token, max_depth: int = 8) -> Optional[str]:
    """Walk up the dependency tree from a number token to find its role.

    Strategy:
      1. Start at the number token
      2. Move to head (usually the unit noun: m, Rs, kg)
      3. If head is a unit word, SKIP it and continue to its head
      4. Keep walking until we find a verb or noun with a known role
      5. Skip ask verbs (find, calculate) -- they indicate intent, not role
      6. Check verb lemmas (buy -> cost_price, sell -> selling_price)
      7. Check noun lemmas (length, width, radius, etc.)
    """
    visited = set()
    current = token
    depth = 0

    while current and depth < max_depth and current.i not in visited:
        visited.add(current.i)
        depth += 1

        lemma = current.lemma_.lower().strip(".")

        # Skip unit words -- they're just the unit, not the role
        if lemma in _UNIT_WORDS_SKIP or current.text.lower().strip(".") in _UNIT_WORDS_SKIP:
            if current.i == current.head.i:
                break
            current = current.head
            continue

        # Skip ask verbs -- they indicate intent, not role
        if lemma in _ASK_VERBS:
            if current.i == current.head.i:
                break
            current = current.head
            continue

        # Skip "of", "on", "at", "for", "with" -- prepositions, not roles
        if current.pos_ == "ADP" or lemma in ("of", "on", "at", "for", "with", "per", "by"):
            if current.i == current.head.i:
                break
            current = current.head
            continue

        # Check if current token's lemma maps to a role
        if lemma in _VERB_LEMMA_TO_ROLE:
            return _VERB_LEMMA_TO_ROLE[lemma]
        if lemma in _NOUN_LEMMA_TO_ROLE:
            return _NOUN_LEMMA_TO_ROLE[lemma]

        # Move to head
        if current.i == current.head.i:
            break
        current = current.head

    return None


# --------------------------------------------------------------------------- #
# Intent extraction from "find/calculate" verb
# --------------------------------------------------------------------------- #

_ASK_VERBS = {"find", "calculate", "compute", "determine", "evaluate",
              "solve", "derive", "obtain", "get"}


def _extract_intent(doc: Doc) -> Tuple[str, float]:
    """Extract what the question asks for from the parse tree.

    Looks for ask verbs (find, calculate) and their direct object.
    Returns (intent, confidence).
    """
    for token in doc:
        if token.lemma_.lower() in _ASK_VERBS:
            # The direct object of "find" is what we're looking for
            for child in token.children:
                if child.dep_ in ("dobj", "nsubj", "nsubjpass", "attr"):
                    # Get the full noun phrase
                    lemma = child.lemma_.lower()
                    # Check if it maps to a known dimension/role
                    if lemma in _NOUN_LEMMA_TO_ROLE:
                        return _NOUN_LEMMA_TO_ROLE[lemma], 0.9
                    # Check compound nouns (e.g. "simple interest")
                    for sub in child.children:
                        if sub.dep_ == "compound":
                            full = f"{sub.lemma_.lower()}_{lemma}"
                            if full == "simple_interest":
                                return "simple_interest", 0.9
                            if full == "compound_interest":
                                return "compound_interest", 0.9
                            if full == "profit_percent":
                                return "profit_percent", 0.9
                    # Return the lemma as intent
                    return lemma, 0.7
            # If no dobj found, check the whole subtree
            for desc in token.subtree:
                if desc.pos_ in ("NOUN", "PROPN") and desc.i != token.i:
                    lemma = desc.lemma_.lower()
                    if lemma in _NOUN_LEMMA_TO_ROLE:
                        return _NOUN_LEMMA_TO_ROLE[lemma], 0.8
                    return lemma, 0.5

    # No ask verb found -- check for "how many/much"
    text = doc.text.lower()
    if "how many" in text:
        return "count", 0.7
    if "how much" in text:
        return "amount", 0.5

    return "unknown", 0.0


# --------------------------------------------------------------------------- #
# Main parse function
# --------------------------------------------------------------------------- #

def parse_question(text: str) -> Dict[str, Any]:
    """Parse a question using spaCy dependency tree + unit detection.

    Returns:
    {
        "intent": "profit",
        "intent_confidence": 0.9,
        "quantities": [
            {"value": 500, "unit": "Rs", "dimension": "money",
             "role": "cost_price", "context": "buys"},
            {"value": 650, "unit": "Rs", "dimension": "money",
             "role": "selling_price", "context": "sells"},
        ],
        "subject_hint": "commerce",
        "is_computational": True,
    }
    """
    nlp = _get_nlp()
    doc = nlp(text)

    # 1. Extract intent
    intent, intent_conf = _extract_intent(doc)

    # 2. Find all numbers and their roles
    quantities = []
    for token in doc:
        if token.pos_ != "NUM":
            continue
        # Skip ordinals and years
        val = _parse_num(token.text)
        if val is None:
            continue
        if 1800 <= val <= 2100 and not _is_explicit_year(token):
            continue
        # Skip numbers in "Reprint XXXX-XX" metadata context
        if _is_metadata_number(token):
            continue

        # Detect unit and dimension
        unit_word, dimension = _detect_unit_from_token(token)

        # Walk dependency tree to find role
        role = _walk_to_role(token)

        # Get context (the verb or noun the number is associated with)
        context = ""
        head = token.head
        if head:
            context = head.lemma_.lower()
            # Also check grandparent for verb context
            grandparent = head.head
            if grandparent and grandparent.i != head.i:
                if grandparent.pos_ == "VERB":
                    context = grandparent.lemma_.lower()

        quantities.append({
            "value": val,
            "unit": unit_word,
            "dimension": dimension or "number",
            "role": role or context or "",
            "context": context,
            "token_idx": token.i,
        })

    # 3. Infer subject from dimensions and intent
    subject = _infer_subject(quantities, intent)

    # 4. Is computational?
    is_comp = len(quantities) > 0 and intent != "unknown"

    return {
        "intent": intent,
        "intent_confidence": intent_conf,
        "quantities": quantities,
        "subject_hint": subject,
        "is_computational": is_comp,
    }


def _parse_num(text: str) -> Optional[float]:
    """Parse a numeric token to float."""
    text = text.replace(",", "")
    try:
        return float(text)
    except ValueError:
        # Handle fractions like "1/2"
        if "/" in text:
            parts = text.split("/")
            if len(parts) == 2:
                try:
                    return float(parts[0]) / float(parts[1])
                except (ValueError, ZeroDivisionError):
                    pass
        return None


def _is_explicit_year(token: Token) -> bool:
    """Check if a number is explicitly a year (preceded by 'in' or 'year')."""
    for neighbor in [token.head, token.nbor(-1) if token.i > 0 else None]:
        if neighbor and neighbor.lemma_.lower() in ("year", "in"):
            return True
    return False


# Metadata context words that indicate a number is NOT a problem input
_METADATA_CONTEXTS = {"reprint", "copyright", "isbn", "published",
                       "edition", "chapter", "page", "fig", "figure",
                       "question", "q", "no", "number", "serial"}


def _is_metadata_number(token: Token) -> bool:
    """Check if a number is part of document metadata, not a problem input.

    Catches:
      - "Reprint 2026-27" -> 27 is metadata
      - "Chapter 5" -> 5 is metadata
      - "Fig 3.17" -> 3.17 is metadata
      - "Q. 12" -> 12 is metadata
    """
    # Check the head and its ancestors for metadata context
    current = token.head
    visited = set()
    while current and current.i not in visited:
        visited.add(current.i)
        lemma = current.lemma_.lower().strip(".")
        if lemma in _METADATA_CONTEXTS:
            return True
        # Check siblings/neighbors
        for child in current.children:
            if child.lemma_.lower().strip(".") in _METADATA_CONTEXTS:
                return True
        if current.i == current.head.i:
            break
        current = current.head

    # Check the previous token directly
    if token.i > 0:
        prev = token.doc[token.i - 1]
        if prev.lemma_.lower().strip(".") in _METADATA_CONTEXTS:
            return True

    return False


def _infer_subject(quantities: List[Dict], intent: str) -> str:
    """Infer subject from quantity dimensions and intent."""
    dims = set(q.get("dimension", "") for q in quantities)
    roles = set(q.get("role", "") for q in quantities)

    if dims & {"voltage", "current", "resistance", "capacitance",
               "force", "energy", "power", "pressure", "frequency",
               "charge", "speed"}:
        return "physics"
    if dims & {"amount", "concentration", "molarmass"}:
        return "chemistry"
    if dims & {"money"} or roles & {"cost_price", "selling_price",
                                     "profit", "loss", "principal",
                                     "interest", "discount"}:
        return "commerce"
    return "maths"
