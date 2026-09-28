"""slot_extractor.py -- Stage 2 of the competency pipeline.

Turns the question text of a MATCHED concept into structured numeric
slots ({base: 2, exponent: 6}, {principal: 8000, rate: 5, time: 2}).

Design principle: ALIGNMENT BEATS EXTRACTION.  The concept (its worked
examples' question_pattern + extracted_variables, plus a small
per-concept canonical role table transcribed from the catalog's own
formulas) tells us WHICH roles the numbers play; the text only supplies
the values.  The k-th number in the text fills the k-th template
variable -- unless the text NAMES the variables ("base = 8, height =
5"), in which case labeled binding always wins over position.

Zero-wrong-answer constraints honoured here:
  - every slot value appears VERBATIM in the text (span recorded for a
    future verbatim audit; see extract_slots_detailed);
  - fewer numbers than roles -> honest refusal, never a guess;
  - more numbers than roles (and no list role) -> ambiguous -> refusal;
  - guards reject absurd values (negative lengths, fractional or
    out-of-range exponents, probabilities outside [0,1], negative
    money, percentages outside [0, 1000]);
  - fully deterministic: regex + tables, NO LLM, no generation.

Public API
----------
  extract_slots(text, concept)          -> Optional[Dict[str, float]]
  extract_slots_detailed(text, concept) -> Optional[SlotExtraction]
      (.values, .spans, .template, .labeled, .reason)
  extract_list_slots(text, concept)     -> Optional[Dict[str, List[float]]]
      for the list-role concepts (mean/range/median/mode data sets)
  strip_answer_tail(text)               -> str
      removes a trailing embedded answer-key tail ("Ans: 8 kg") -- the
      single implementation shared by the miner, the DB cleanup and the
      scoreboard pool; its span is also blocked inside extraction
  catalog_worked_examples(concept)      -> List[dict]
      lazy, read-only loader for the concept's catalog worked examples

All regexes in this module are RAW strings (a plain string with a
backslash sequence silently becomes control characters).
"""
from __future__ import annotations

import glob
import json
import os
import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

_COMPETENCY_DIR = os.path.normpath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "competency"))

# ------------------------------------------------------------------ #
# Token scanning (verbatim numbers + spans)
# ------------------------------------------------------------------ #

_NUM_TOKEN_RE = re.compile(r"\(?(-?\d+(?:\.\d+)?)\)?")
_WORD_NUM_RE = re.compile(
    r"\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b",
    re.IGNORECASE)
_WORD_NUMS = {
    "one": 1.0, "two": 2.0, "three": 3.0, "four": 4.0, "five": 5.0,
    "six": 6.0, "seven": 7.0, "eight": 8.0, "nine": 9.0, "ten": 10.0,
    "eleven": 11.0, "twelve": 12.0,
}

# "pi = 22/7", "use pi = 3.14", "take pi as 3.14": the approximation
# constant is NOT a question value -- exclude its span from the pool.
_PI_HINT_RE = re.compile(
    r"\bpi\s*(?:=|:|is|as)\s*\(?\s*(?:22\s*/\s*7|3\.14\d*|355\s*/\s*113)\b",
    re.IGNORECASE)

# "name = 5" / "name: 5" (label words may be multi-word: "total outcomes = 6")
_LABELED_RE = re.compile(
    r"([A-Za-z][A-Za-z_0-9 ]{0,28}?)\s*[:=]\s*\(?(-?\d+(?:\.\d+)?)\)?")

# {variable} placeholders; "{a^m}" contributes TWO roles in order (a, m)
_PLACEHOLDER_RE = re.compile(
    r"\{([A-Za-z_][A-Za-z_0-9]*(?:\s*\^\s*[A-Za-z_][A-Za-z_0-9]*)*)\}")

# ------------------------------------------------------------------ #
# Embedded answer-key tails ("Ans: 8 kg", "Ans. He has lost weight.")
#
# Some mined question texts carry their own answer at the end.  The
# tail's numbers poison slot extraction (they are answers, not values)
# and its "Ans" token can even act as a fake slot label.  The tail is
# identified ONCE here and used two ways:
#   - _excluded_spans() blocks its spans for every extraction strategy;
#   - strip_answer_tail() removes it from mined texts (miner + DB
#     cleanup + scoreboard pool use this one implementation).
# Conservative by construction: only the LAST standalone "Ans" token
# (never "Ans" inside "Answer"/"ANSWERS") can open a tail, and a tail
# that re-opens the question list ("... Ans: 12 Q.4 Solve these:")
# is NOT a tail -- multi-part items interleave answers and questions.
# ------------------------------------------------------------------ #

_ANS_TAIL_TOKEN_RE = re.compile(r"Ans\s*\.?\s*:?")
# a question restart after the token disqualifies the tail
_ANS_TAIL_Q_RESTART_RE = re.compile(r"\bQ\s*\.?\s*\d")
# more than one standalone Ans token means answers and questions
# INTERLEAVE somewhere in the text (multi-part item or a mined mashup
# of several items): no tail may be stripped at all
_ANS_TAIL_MIN_HEAD = 20


def _ans_tail_span(text: str) -> Optional[Tuple[int, int]]:
    """Span of a trailing answer-key tail, or None.

    Deterministic and conservative: a single standalone "Ans" token in
    the text can open a tail -- but only when what follows does not
    itself restart the question list.  Texts with two or more Ans
    tokens are interleaved multi-part items; nothing is a tail there.
    """
    tokens = []
    for m in _ANS_TAIL_TOKEN_RE.finditer(text):
        s = m.start()
        if s > 0 and text[s - 1].isalnum():
            continue  # mid-word ("Ganesha" lowercase never matches)
        e = m.end()
        if e < len(text) and text[e].isalnum():
            continue  # "Ans" starting a word: "Answer the following"
        tokens.append(s)
    if len(tokens) != 1:
        return None
    start = tokens[0]
    if start < _ANS_TAIL_MIN_HEAD:
        return None
    if _ANS_TAIL_Q_RESTART_RE.search(text[start:]):
        return None
    return (start, len(text))


def strip_answer_tail(text: str) -> str:
    """Remove a trailing answer-key tail ("Ans: 8 kg") from a question.

    Single source of truth for the miner (mine_ncert.py), the one-time
    DB cleanup and the scoreboard pool.  Returns the text unchanged
    when no clean tail exists.
    """
    text = str(text or "")
    span = _ans_tail_span(text)
    if span is None:
        return text
    stripped = text[:span[0]].rstrip()
    return stripped if len(stripped) >= _ANS_TAIL_MIN_HEAD else text


# A word-number ("one", "two", ...) counts as a VALUE only when the
# preceding word is a connector ("interest 45 for one year"); at the
# start of a sentence or after an arbitrary word it is an English
# determiner ("Two angles of a triangle are 60 and 70") and is skipped.
_WORDNUM_PREV_OK = {"for", "of", "in", "by", "to", "than", "and", "is",
                    "was", "are", "were", "lasts", "takes", "every",
                    "each", "about", "only"}

# Word numbers followed by these nouns/verbs are DETERMINERS, not
# values: "two numbers", "one exceeds", "three times a number".
# The next word is checked AFTER the prev-word gate passes; a word
# number is only counted as a value when the next word is a unit/time
# noun ("one year", "two hours") or absent (end of phrase).
_WORDNUM_NEXT_DETERMINER = {
    "numbers", "number", "exceeds", "exceeded", "exceed", "angles",
    "sides", "digits", "trees", "runs", "marbles", "coins", "balls",
    "cards", "students", "children", "men", "women", "boys", "girls",
    "terms", "expressions", "polygons", "triangles", "circles",
    "fractions", "decimals", "integers", "multiples", "factors", "coins",
    "sides", "lines", "points", "faces", "edges", "vertices", "shapes",
    "figures", "solids", "cubes", "cuboids", "cylinders", "cones",
    "spheres", "hemispheres", "prisms", "pyramids", "ratios", "percents",
    "percentages", "amounts", "prices", "costs", "notes", "coins",
    "notes", "bills", "rupees", "dollars", "metres", "metres",
}


def _scan_numbers(text: str) -> List[Tuple[float, int, int, str]]:
    """All numeric mentions in order of appearance.

    Returns (value, start, end, raw_token) tuples.  Digit tokens always
    count; English words one..twelve count only in value position
    (common NCERT phrasing: "for one year").
    """
    out: List[Tuple[float, int, int, str]] = []
    for m in _NUM_TOKEN_RE.finditer(text):
        out.append((float(m.group(1)), m.start(1), m.end(1), m.group(1)))
    for m in _WORD_NUM_RE.finditer(text):
        prev = text[:m.start()].rstrip()
        if not prev:
            continue  # sentence start -> determiner
        if prev[-1].isalpha():
            tail = re.split(r"[^A-Za-z]+", prev)[-1].lower()
            if tail not in _WORDNUM_PREV_OK:
                continue  # "Two angles ..." -> determiner
        # next-word gate: if the word after the word number is a
        # common noun/verb, the word number is a determiner ("two
        # numbers", "one exceeds"), not a value to compute with
        rest = text[m.end():].lstrip()
        if rest:
            nxt = re.split(r"[^A-Za-z]+", rest)[0].lower()
            if nxt in _WORDNUM_NEXT_DETERMINER:
                continue  # "two numbers" -> determiner
        out.append((float(_WORD_NUMS[m.group(1).lower()]),
                    m.start(1), m.end(1), m.group(1)))
    out.sort(key=lambda t: t[1])
    return out


def _excluded_spans(text: str) -> List[Tuple[int, int]]:
    """Spans whose numbers are constants or answers, not question
    values: the pi approximation hint plus a trailing answer-key tail."""
    spans = [m.span() for m in _PI_HINT_RE.finditer(text)]
    tail = _ans_tail_span(text)
    if tail is not None:
        spans.append(tail)
    # digits glued to letters are unit notation, not values:
    # '3 m3' -> the '3' in 'm3' is cubic-metre notation, not a
    # number to bind positionally ('m/s2', 'cm2', 'km2' likewise).
    # '^' and superscript variants too: 'm/s^2', 'm/s²' carry the same
    # unit exponent that must never reach the positional pool.
    for m in re.finditer(r"[A-Za-z][\^²³⁴]?\d", text):
        spans.append((m.start() + 1, m.end()))
    return spans


# ------------------------------------------------------------------ #
# Role tables (transcribed from the catalog's own templates/formulas)
# ------------------------------------------------------------------ #

# Variable-name synonyms: label phrase -> candidate slot names.  A
# candidate only binds when the concept's template actually has that
# slot, so "r" can mean radius (ch9) or rate (ch7) per concept.
_SYNONYMS: Dict[str, Tuple[str, ...]] = {
    "base": ("b", "base"),
    "height": ("h", "height"),
    "area": ("area",),
    "radius": ("r",),
    "diameter": ("d",),
    "side": ("side",),
    "length": ("length",),
    "breadth": ("breadth",),
    "angle": ("angle",),
    "principal": ("principal",),
    "sum": ("principal",),
    "rate": ("rate",),
    "time": ("time",),
    "years": ("time",),
    "interest": ("interest",),
    "cost price": ("cp",),
    "cp": ("cp",),
    "selling price": ("sp",),
    "sp": ("sp",),
    "percent": ("percent",),
    "percentage": ("percent",),
    "per cent": ("percent",),
    "profit percent": ("profit_pct",),
    "profit percentage": ("profit_pct",),
    "gain percent": ("profit_pct",),
    "loss percent": ("loss_pct",),
    "loss percentage": ("loss_pct",),
    "favourable outcomes": ("favorable", "favourable"),
    "favorable outcomes": ("favorable",),
    "favourable": ("favorable", "favourable"),
    "favorable": ("favorable",),
    "total outcomes": ("total",),
    "outcomes": ("total",),
    "total": ("total",),
    "part": ("part",),
    "amount": ("amount",),
    # grounding from a Class 7 bank label scan: these exact label
    # phrases occur on real mined questions and previously missed
    "cost": ("cp",),
    "parallel side": ("b", "base", "side"),
    "parallel sides": ("b", "base", "side"),
    "sum of money": ("principal",),
    # STEM label aliases: natural-language labels -> formula varnames
    "voltage": ("v", "V", "voltage", "potential", "emf", "v_emf"),
    "potential difference": ("v", "V", "voltage", "potential"),
    "current": ("i", "I", "current"),
    "resistance": ("r", "R", "resistance"),
    "power": ("p", "P", "power"),
    "mass": ("m", "mass"),
    "weight": ("w", "weight", "f", "force"),
    "force": ("f", "F", "force", "thrust"),
    "velocity": ("v", "velocity", "speed"),
    "speed": ("v", "speed", "velocity"),
    "initial velocity": ("u", "v_0", "v0"),
    "final velocity": ("v", "v_final"),
    "acceleration": ("a", "accel", "acceleration"),
    "deceleration": ("a", "accel"),
    "distance": ("s", "d", "distance", "displacement"),
    "displacement": ("s", "displacement", "distance", "d"),
    "moles": ("n", "moles", "mole"),
    "number of moles": ("n", "moles"),
    "charge": ("q", "Q", "charge"),
    "energy": ("e", "E", "energy", "ke", "pe"),
    "kinetic energy": ("ke", "energy"),
    "potential energy": ("pe", "energy"),
    "work": ("w", "work", "energy"),
    "temperature": ("t", "T", "temperature", "temp"),
    "pressure": ("p", "P", "pressure"),
    "volume": ("volume", "vol", "V"),
    "density": ("density", "rho"),
    "frequency": ("f", "frequency", "freq", "nu"),
    "wavelength": ("wavelength", "lam", "lambda_"),
    "concentration": ("concentration", "molarity", "molality"),
    "molarity": ("molarity", "concentration"),
    "efficiency": ("efficiency", "eta"),
    "friction": ("f_k", "friction", "mu"),
}

# Canonical role ORDER per concept (from the catalog formulas:
# "I = (P x R x T) / 100" -> principal, rate, time; "n x (a/b)" ->
# a, b, n; laws of exponents -> a, m, n).  Used when no worked-example
# template aligns.  Entries: list of (condition, role_names) tried in
# order.  The condition is a flat string DSL: groups joined by " & "
# (every group needs at least one hit), alternatives inside a group
# joined by " | "; "" matches everything.  Example:
#   "loss|lose & cost price|find cost" -> ("sp", "loss_pct")
_CANONICAL_SETS: Dict[str, List[Tuple[str, Tuple[str, ...]]]] = {
    # ---- ch11 exponents and powers ----
    "c7m11.2.1": [("", ("a", "m"))],
    "c7m11.3.1": [("", ("a", "m", "n"))],
    "c7m11.3.2": [("", ("a", "m", "n"))],
    "c7m11.3.3": [("", ("a", "m", "n"))],
    "c7m11.3.4": [("", ("a", "b", "m"))],
    "c7m11.3.5": [("", ("a", "b", "m"))],
    "c7m11.3.6": [("", ("a",))],
    # ---- ch2 fractions and decimals ----
    "c7m2.1.1": [("", ("a", "b", "n"))],        # n x (a/b)
    "c7m2.1.2": [("", ("a", "b", "n"))],        # (a/b) of n
    "c7m2.1.3": [("", ("a", "b", "c", "d"))],   # (a/b) x (c/d)
    "c7m2.2.1": [("", ("a", "b"))],             # reciprocal of a/b
    "c7m2.2.2": [("", ("n", "a", "b"))],        # n / (a/b)
    "c7m2.2.3": [("", ("a", "b", "n"))],        # (a/b) / n
    "c7m2.2.4": [("", ("a", "b", "c", "d"))],   # (a/b) / (c/d)
    "c7m2.3.1": [("", ("a", "b"))],             # decimal x decimal
    "c7m2.3.2": [("", ("d", "k"))],             # d x 10^k
    "c7m2.4.1": [("", ("d", "k"))],             # d / 10^k
    "c7m2.4.2": [("", ("d", "w"))],             # decimal / whole
    "c7m2.4.3": [("", ("d1", "d2"))],           # decimal / decimal
    # ---- ch3 data handling (scalar roles; lists via extract_list_slots)
    "c7m3.6.1": [("", ("favorable", "total"))],
    # ---- ch4 simple equations (word-problem SLOT roles only; solving
    # stays an honest refusal in the executor)
    "c7m4.6.1": [
        # "sum of two numbers is 20, one exceeds by 4" -> 2 numbers
        ("sum of two|sum is|exceeds|exceeded by|more than",
         ("total", "difference")),
        # "three times a number plus 11 is 32" -> 3 numbers
        ("", ("multiplier", "addend", "total")),
    ],
    # ---- ch5 lines and angles ----
    "c7m5.2.1": [("", ("angle",))],             # complement
    "c7m5.2.2": [("", ("angle",))],             # supplement
    # ---- ch6 triangle properties ----
    "c7m6.4.1": [("", ("a", "b"))],             # exterior = a + b
    "c7m6.5.1": [("", ("a", "b"))],             # third = 180 - a - b
    "c7m6.8.1": [("", ("a", "b"))],             # legs of right triangle
    # ---- ch7 comparing quantities ----
    "c7m7.1.1": [("", ("part", "total"))],
    "c7m7.1.2": [("", ("fraction",))],
    "c7m7.1.3": [("", ("decimal",))],
    "c7m7.1.4": [("", ("percent",))],
    "c7m7.2.2": [
        # "9 is 25% of what number" / saved 4000 at discount 25% / salary
        ("what number|original|salary|saved|saves|discount",
         ("part", "percent")),
        # "25% of 40 children ... how many" -> count = pct/100 x total
        ("how many|find 15|find 50|per cent of", ("percent", "total")),
        # "find the whole quantity if 5 per cent is 600"
        ("whole quantity|find the whole", ("percent", "part")),
    ],
    "c7m7.2.4": [("", ("old", "new"))],
    "c7m7.3.1": [("", ("cp", "sp"))],
    "c7m7.3.2": [
        # find cost price given SP + loss%
        ("loss|lose & cost price|find cost|find the cost",
         ("sp", "loss_pct")),
        # find cost price given SP + profit%
        ("profit|gain & cost price|find cost|find the cost",
         ("sp", "profit_pct")),
        # find selling price given CP + loss%
        ("loss|lose & find selling|selling price find",
         ("cp", "loss_pct")),
        # find selling price given CP + profit%
        ("profit|gain & find selling|selling price find",
         ("cp", "profit_pct")),
        # find the profit/loss PERCENTAGE from CP and SP
        ("gain percentage|gain per cent|profit percentage|"
         "profit per cent|find loss per cent|find the loss per cent|"
         "loss percentage", ("cp", "sp")),
        # SP/CP + a loss percent
        ("loss|lose & sold|selling price|sell|sells|bought|buy|brought",
         ("cp", "loss_pct")),
        # SP/CP + a profit percent
        ("profit|gain & sold|selling price|sell|sells|bought|buy|brought",
         ("cp", "profit_pct")),
        # default: CP and SP
        ("", ("cp", "sp")),
    ],
    "c7m7.4.1": [
        # find rate: "pays interest 750 for 2 years on 4500, find rate"
        ("find rate|find the rate|rate of interest|what rate",
         ("interest", "time", "principal")),
        # find principal: "interest 45 for one year at 9 per cent, find sum"
        ("find the sum|find sum|find the principal",
         ("interest", "time", "rate")),
        # find time: "after how many years"
        ("how many years|after how many",
         ("interest", "principal", "rate")),
        # default: find the interest (or amount; executor dispatches)
        ("", ("principal", "rate", "time")),
    ],
    # ---- ch9 perimeter and area ----
    "c7m9.1.1": [
        ("find height|find the height", ("area", "b")),
        ("", ("b", "h")),
    ],
    "c7m9.2.1": [
        ("find base|find the base|bc", ("area", "h")),
        ("find height|find the height|qm|ad", ("area", "b")),
        ("", ("b", "h")),
    ],
    "c7m9.3.1": [
        ("diameter", ("d",)),
        ("find radius|radius of the circle is", ("circumference",)),
        ("find diameter", ("circumference",)),
        ("", ("r",)),
    ],
    "c7m9.3.2": [
        ("diameter", ("d",)),
        ("find radius", ("area",)),
        ("", ("r",)),
    ],
    "c7m9.3.3": [
        # cost of fencing a circle: radius/diameter + rate
        ("fencing|fence|rope|tape|lace|perimeter & radius",
         ("r", "rate")),
        ("fencing|fence|rope|tape|lace|perimeter & diameter",
         ("d", "rate")),
        # cost of polishing/plastering/painting a shape
        ("polishing|painting|plastering|cost of & parallelogram",
         ("b", "h", "rate")),
        ("polishing|painting|plastering|cost of & triangl",
         ("b", "h", "rate")),
        ("polishing|painting|plastering|cost of & circle|circular",
         ("r", "rate")),
    ],
    # ---- ch4 simple equations ----
    "c7m4.4.2": [("", ("a", "b"))],              # x + a = b
    "c7m4.5.1": [("", ("a", "b"))],              # x + a = b (transpose)
    "c7m4.5.2": [("", ("a", "b", "c"))],         # a(x + b) = c
    "c7m4.6.1": [
        # "sum of two numbers is 20, one exceeds by 4" -> 2 numbers
        ("sum of two|sum is|exceeds|exceeded by|more than",
         ("total", "difference")),
        # "three times a number plus 11 is 32" -> 3 numbers
        ("", ("multiplier", "addend", "total")),
    ],
    # ---- ch8 rational numbers ----
    "c7m8.6.1": [("", ("p", "q"))],              # standard form of p/q
    "c7m8.7.1": [("", ("a", "b", "c", "d"))],    # compare a/b and c/d
    "c7m8.8.1": [("", ("a", "b", "c", "d", "n"))],  # n rationals between
    "c7m8.9.1": [("", ("a", "b", "c", "d"))],    # a/b + c/d
    "c7m8.9.2": [("", ("a", "b", "c", "d"))],    # a/b - c/d
    "c7m8.9.3": [("", ("a", "b", "c", "d"))],    # a/b x c/d
    "c7m8.9.4": [("", ("a", "b", "c", "d"))],    # a/b / c/d
    # ---- ch10 algebraic expressions ----
    "c7m10.6.1": [("", ("x", "a", "b"))],         # eval a*x + b
    # ---- ch5 transversal of parallel lines ----
    "c7m5.3.4": [("", ("angle",))],
    # ---- ch6 triangle ----
    "c7m6.6.2": [("", ("angle",))],               # isosceles angle
    "c7m6.7.1": [("", ("a", "b", "c"))],          # triangle inequality
    # ---- ch7 ratio to percent ----
    "c7m7.2.3": [("", ("a", "b"))],               # ratio a:b to percent
    # ---- ch11 decimal number system + standard form ----
    "c7m11.5.1": [("", ("number", "base"))],  # expand number (base absorbs "10")
    "c7m11.6.1": [("", ("number",))],          # standard form
    # ---- ch13 visualising solid objects ----
    "c7m13.4.3": [("", ("faces", "edges", "vertices"))],
    # ---- ch1 integer operations ----
    "c7m1.2.1": [("", ("a", "b"))],              # pos x neg
    "c7m1.2.2": [("", ("a", "b"))],              # neg x neg
    "c7m1.3.3": [("", ("a", "b"))],              # a x 0 (b absorbs the 0)
    "c7m1.3.4": [("", ("a", "b"))],              # a x 1 (b absorbs the 1)
    "c7m1.4": [("", ("a", "b"))],                 # a / b
    # ---- ch8 equivalent rational numbers ----
    "c7m8.3.2": [("", ("p", "q", "n"))],          # p/q = (pn)/(qn)
}

# Concepts whose numeric roles form ONE list (data-handling sets).
_LIST_ROLE_CONCEPTS: Dict[str, str] = {
    "c7m3.2.1": "values",   # mean
    "c7m3.2.2": "values",   # range
    "c7m3.3.1": "values",   # mode
    "c7m3.3.2": "values",   # mode of large data
    "c7m3.4.1": "values",   # median
    "c7m7.2.3": "parts",    # ratio parts
}

# ------------------------------------------------------------------ #
# Value guards
# ------------------------------------------------------------------ #

_EXPONENT_VARS = {"m", "n", "exp", "exponent", "power", "k"}
_LENGTH_VARS = {"b", "h", "r", "d", "a", "side", "length", "breadth",
                "base", "height", "radius", "diameter", "distance",
                "pr", "qr", "pl", "w", "l"}
_MONEY_VARS = {"principal", "amount", "interest", "cp", "sp", "cost",
               "price"}
_PCT_VARS = {"rate", "percent", "percentage", "loss_pct", "profit_pct"}
_FRACTION_VARS = {"fraction", "fraction1", "fraction2",
                  "fraction_per_hour", "decimal"}
_TIME_VARS = {"time", "years", "hours", "t", "time_taken", "duration",
              "period", "elapsed_time", "time_elapsed"}


# concept-id prefixes whose catalogs carry the maths-domain var
# conventions (k/m/n exponents, l/r/h lengths, etc.).  STEM concept
# ids (keph/kech/jesc/...) reuse those names for physical quantities,
# so the domain guards must not fire for them.
_MATHS_ID_RE = re.compile(
    r"^(?:am|c7m|c8m|fegp|gegp|hegp|hemh|iemh|jemh|kemh|lemh)")


def _guard_value(cid: str, var: str, value: float) -> Optional[str]:
    """Return a refusal reason, or None when the value is sane."""
    v = float(value)
    if not _MATHS_ID_RE.match(cid):
        return None  # non-maths catalogs: no domain assumptions on names
    is_ch11 = cid.startswith("c7m11")
    if var in _EXPONENT_VARS:
        if v != int(v):
            return "exponent %s must be a whole number" % var
        if is_ch11 and not (-20 <= v <= 50):
            return "exponent %s out of range (-20..50)" % var
        if abs(v) > 1_000_000:
            return "value out of range"
        return None
    if is_ch11 and var in ("a", "b"):
        if abs(v) > 1_000_000:
            return "base magnitude out of range"
        return None
    # ch1 integers: "a" and "b" are operands, not lengths -- allow
    # negative values (the whole point of integer multiplication/div)
    if cid.startswith("c7m1") and var in ("a", "b"):
        if abs(v) > 1_000_000:
            return "operand out of range"
        return None
    if var in _LENGTH_VARS:
        if not (0 < v <= 1_000_000):
            return "length %s must be positive" % var
        return None
    if var in _MONEY_VARS:
        if not (0 <= v <= 1_000_000_000):
            return "money %s cannot be negative" % var
        return None
    if var in _PCT_VARS:
        if not (0 <= v <= 1000):
            return "percentage %s out of range" % var
        return None
    if var in _FRACTION_VARS:
        if not (0 <= v <= 1):
            return "fraction %s must lie in [0, 1]" % var
        return None
    if var in _TIME_VARS:
        if not (0 < v <= 10_000):
            return "time %s must be positive" % var
        return None
    if var in ("angle",):
        if not (0 < v < 360):
            return "angle out of range"
        return None
    if var in ("favorable", "favourable"):
        if not (0 <= v <= 1_000_000) or v != int(v):
            return "favourable count must be a non-negative whole number"
        return None
    if var == "total":
        if not (0 <= v <= 1_000_000_000):
            return "total out of range"
        return None
    if var == "part":
        if not (0 <= v <= 1_000_000_000):
            return "part out of range"
        return None
    if var == "circumference":
        if not (0 < v <= 1_000_000_000):
            return "circumference must be positive"
        return None
    if abs(v) > 1_000_000_000:
        return "value out of range"
    return None


def _cross_guards(values: Dict[str, float]) -> Optional[str]:
    fav = None
    tot = None
    for k, v in values.items():
        if k in ("favorable", "favourable"):
            fav = v
        if k == "total":
            tot = v
    if fav is not None and tot is not None and fav > tot:
        return "favourable outcomes cannot exceed total outcomes"
    if "new" in values and "old" in values:
        if values["old"] == 0:
            return "original value cannot be 0 for a percentage change"
    return None


# ------------------------------------------------------------------ #
# Unit-aware disambiguation (the too-many-numbers rescue)
#
# When the text carries MORE numbers than the concept has roles, the
# positional reading is ambiguous and refuses.  One honest rescue
# exists: if EXACTLY len(roles) of the numbers carry a unit the
# concept's roles imply (a length for a length role, money for a money
# role, ...) and every surplus number carries no unit at all (table
# indices, page artifacts, part counts), the unit-tagged subset is the
# reading.  Any other shape (too few, too many unit-bearing numbers)
# keeps the refusal: conflicting readings -> None (zero-wrong).
# ------------------------------------------------------------------ #

_UNIT_AFTER_RE = re.compile(
    r"\s*(?P<u>m/s\^?2|m/s²|m\s*s-2|m/s|m\s*s-1|km/hr?|kmph|"
    r"mm|cm|km|ft|feet|foot|inches|inch|metres?|meters?|"
    r"centimetres?|kilometres?|grams?|kg|kilograms?|litres?|liters?|"
    r"ml|hours?|hrs?|minutes?|mins?|seconds?|secs?|days?|weeks?|"
    r"months?|years?|degrees?|percent|per\s+cent|rupees?|paise|"
    r"s|"
    r"\u00b0|m)\.?(?![A-Za-z])(?!\s*\^?\s*2\b)", re.IGNORECASE)
_UNIT_BEFORE_MONEY_RE = re.compile(
    r"(?:\brs\.?|\binr|\u20b9|\$)\s*$", re.IGNORECASE)

# physics roles that carry units -- used both to tag question numbers
# and to keep the positional fill honest ('3 s' must land on the time
# slot, never on acceleration)
_VELOCITY_VARS = {"u", "v", "v_0", "v0", "v_f", "vf", "u_i",
                  "initial_velocity", "final_velocity", "velocity",
                  "speed", "initial_speed", "final_speed"}
_ACCEL_VARS = {"a", "acceleration", "accel", "deceleration",
               "retardation", "g"}

_UNIT_TAGS = {
    "mm": "len", "cm": "len", "km": "len", "m": "len", "ft": "len",
    "feet": "len", "foot": "len", "inch": "len", "inches": "len",
    "metre": "len", "metres": "len", "meter": "len", "meters": "len",
    "centimetre": "len", "centimetres": "len", "kilometre": "len",
    "kilometres": "len",
    "gram": "mass", "grams": "mass", "kg": "mass", "kilogram": "mass",
    "kilograms": "mass",
    "litre": "vol", "litres": "vol", "liter": "vol", "liters": "vol",
    "ml": "vol",
    "hour": "time", "hours": "time", "hr": "time", "hrs": "time",
    "minute": "time", "minutes": "time", "min": "time", "mins": "time",
    "second": "time", "seconds": "time", "sec": "time", "secs": "time",
    "day": "time", "days": "time", "week": "time", "weeks": "time",
    "month": "time", "months": "time", "year": "time", "years": "time",
    "s": "time",
    "percent": "pct", "per cent": "pct",
    "rupee": "money", "rupees": "money", "paise": "money",
    "m/s": "vel", "m s-1": "vel", "km/h": "vel", "km/hr": "vel",
    "kmph": "vel",
    "m/s^2": "acc", "m/s2": "acc", "m/s²": "acc", "m s-2": "acc",
    "degree": "deg", "degrees": "deg", "\u00b0": "deg",
}


def _role_unit_tags(names: List[str]) -> set:
    """Unit tags the concept's roles can carry, from the same var
    tables the value guards use."""
    tags: set = set()
    for n in names:
        if n in _LENGTH_VARS:
            tags.add("len")
        elif n in _MONEY_VARS:
            tags.add("money")
        elif n in _PCT_VARS:
            # "rate" is percent in ch7 but Rs-per-metre in ch9 fencing
            tags |= {"pct", "money"}
        elif n in _TIME_VARS:
            tags.add("time")
        elif n == "angle":
            tags.add("deg")
        elif n in _VELOCITY_VARS:
            tags.add("vel")
        elif n in _ACCEL_VARS:
            tags.add("acc")
    return tags


def _unit_tag(text: str, start: int, end: int) -> Optional[str]:
    """The unit a number carries in the text, or None.

    Money is detected by a currency prefix ("Rs 20"); everything else
    by a unit token glued to the number ("35 m", "20 per cent").
    Unit-suffixed squares ("96 cm2", "area in sq m") never tag as a
    length -- they are computed answers, not question values.
    """
    before = text[max(0, start - 8):start]
    if _UNIT_BEFORE_MONEY_RE.search(before):
        return "money"
    m = _UNIT_AFTER_RE.match(text, end)
    if m:
        return _UNIT_TAGS.get(" ".join(m.group("u").lower().split()))
    return None


# flattened mixed fractions ("5 1 6 hours" meaning 5-1/6): PDF
# fraction-deck shorthand.  DECISION (measured on the scoreboard: only
# 2-3 rows): parse NOTHING here -- a triple is indistinguishable from
# a damaged list, and unit tags latch onto the wrong member ("3 3 4 ft"
# would tag the 4, not 3-3/4).  Any triple disables the unit-aware
# rescue; the ambiguous reading honestly refuses.
_MIXED_TRIPLE_RE = re.compile(r"\b\d{1,4}\s+\d{1,2}\s+\d{1,2}\b")


def _unit_aware_pool(names: List[str],
                     nums: List[Tuple[float, int, int, str]],
                     text: str) -> Optional[List[Tuple[float, int, int,
                                                        str]]]:
    """The unit-bearing subset of the number pool, or None.

    Accepts only the exact role count: fewer unit-bearing numbers than
    roles means the unit filter did not isolate the values; more means
    two readings survive -- both are refusals, never a guess.
    """
    tags = _role_unit_tags(names)
    if not tags:
        return None
    if _MIXED_TRIPLE_RE.search(text):
        return None  # flattened mixed fractions: unusable shorthand
    tagged = [num for num in nums
              if (_unit_tag(text, num[1], num[2]) or "") in tags]
    if len(tagged) != len(names):
        return None
    return tagged


# ------------------------------------------------------------------ #
# Worked-example access (read-only, lazy, cached)
# ------------------------------------------------------------------ #

_CAT_CACHE: Dict[str, Dict] = {}


def catalog_worked_examples(concept: Dict,
                            catalog_dir: Optional[str] = None) -> List[Dict]:
    """The worked examples of THIS concept, read from its catalog file.

    Read-only convenience so extract_slots(text, concept) is fully
    self-contained; a caller may pass its own example list instead.
    """
    cid = str((concept or {}).get("id", ""))
    if not cid.startswith("c7m"):
        return []
    d = catalog_dir or _COMPETENCY_DIR
    chapter = cid.split(".")[0][3:]
    pattern = os.path.join(
        d, "catalog_class7_maths_ch%s_*.json" % chapter)
    files = sorted(glob.glob(pattern))
    if not files:
        return []
    path = files[0]
    cat = _CAT_CACHE.get(path)
    if cat is None:
        try:
            with open(path, encoding="utf-8") as f:
                cat = json.load(f)
        except Exception:
            cat = {}
        _CAT_CACHE[path] = cat
    cid_prefix = cid  # examples reference the concept id
    return [ex for ex in cat.get("worked_examples", [])
            if ex.get("concept") == cid_prefix]


# ------------------------------------------------------------------ #
# Template construction
# ------------------------------------------------------------------ #

def _placeholder_names(qpat: str) -> List[str]:
    names: List[str] = []
    for m in _PLACEHOLDER_RE.finditer(qpat or ""):
        for part in re.split(r"\s*\^\s*", m.group(1)):
            if part and part not in names:
                names.append(part)
    return names


def _pattern_literals(qpat: str) -> List[str]:
    """Literal number tokens inside a template (pi = 3.14, 22/7, ...)."""
    without = _PLACEHOLDER_RE.sub(" ", qpat or "")
    return [m.group(1) for m in _NUM_TOKEN_RE.finditer(without)]


def _template_regex(qpat: str) -> Optional[re.Pattern]:
    """Anchor a question_pattern: {var} -> number capture, rest literal."""
    pieces = ["^\\s*"]
    pos = 0
    found = False
    for m in _PLACEHOLDER_RE.finditer(qpat or ""):
        found = True
        literal = qpat[pos:m.start()]
        pieces.append(_escape_literal(literal))
        names = re.split(r"\s*\^\s*", m.group(1))
        for i, name in enumerate(names):
            if i:
                pieces.append("\\s*\\^?\\s*")
            pieces.append("(?P<%s>[-+]?\\d+(?:\\.\\d+)?)" % name)
        pos = m.end()
    if not found:
        return None
    pieces.append(_escape_literal(qpat[pos:]))
    # trailing sentence punctuation ('?', '.') is optional -- questions
    # authored without it must still match
    pieces.append("[?.!]*\\s*$")
    try:
        return re.compile("".join(pieces), re.IGNORECASE | re.DOTALL)
    except re.error:
        return None


def _escape_literal(literal: str) -> str:
    esc = re.escape(literal)
    esc = re.sub(r"\\\s+", r"\\s+", esc)          # whitespace-flexible
    esc = esc.replace("\\ ", "\\s+")
    return esc


def _template_entries(concept: Dict,
                      examples: List[Dict]) -> List[Dict[str, Any]]:
    cid = str(concept.get("id", ""))
    entries: List[Dict[str, Any]] = []
    for ex in examples:
        if ex.get("concept") != cid:
            continue
        qpat = str(ex.get("question_pattern", "") or "")
        names = _placeholder_names(qpat)
        literals = _pattern_literals(qpat)
        if not names:
            ev = ex.get("extracted_variables") or {}
            if len(ev) == 1:
                only = next(iter(ev.keys()))
                desc = str(ev.get(only, ""))
                if "list" in desc.lower() or only in _LIST_ROLE_CONCEPTS.values():
                    continue  # list roles handled by extract_list_slots
                names = [only]
        if names:
            entries.append({"pattern": qpat, "vars": names,
                            "literals": literals,
                            "rx": _template_regex(qpat)})
    return entries


# ------------------------------------------------------------------ #
# Labeled binding (always beats positional)
# ------------------------------------------------------------------ #

def _label_to_var(label: str, varnames: List[str]) -> Optional[str]:
    raw = " ".join(label.split())
    t = raw.lower()
    if not t:
        return None
    # exact case-sensitive match first: physics reuses case for
    # distinct roles (R external vs r internal resistance)
    if raw in varnames:
        return raw
    lowered = {v.lower(): v for v in varnames}
    if t in lowered:
        return lowered[t]
    words = t.split()
    if words and words[-1] in lowered:
        return lowered[words[-1]]
    if t in _SYNONYMS:
        for cand in _SYNONYMS[t]:
            if cand in varnames:
                return cand
    if words and words[-1] in _SYNONYMS:
        for cand in _SYNONYMS[words[-1]]:
            if cand in varnames:
                return cand
    for v in varnames:
        if t.endswith(" " + v.lower()):
            return v
    return None


def _labeled_bindings(
        text: str, varnames: List[str],
        blocked: List[Tuple[int, int]],
) -> Tuple[Dict[str, Tuple[float, int, int]], List[Tuple[int, int]]]:
    """Bind 'label = number' mentions to slots.  Returns (bindings,
    number spans consumed by labels)."""
    bindings: Dict[str, Tuple[float, int, int]] = {}
    consumed: List[Tuple[int, int]] = []
    for m in _LABELED_RE.finditer(text):
        span = m.span(2)
        if any(s <= span[0] and span[1] <= e for s, e in blocked):
            continue
        var = _label_to_var(m.group(1), varnames)
        if var is None:
            continue
        val = float(m.group(2))
        prev = bindings.get(var)
        if prev is not None and prev[0] != val:
            # same role named twice with different values: ambiguous
            return {}, []
        bindings[var] = (val, span[0], span[1])
        consumed.append(span)
    return bindings, consumed


# ------------------------------------------------------------------ #
# Exponent-law alignment (catalog structure: "a^m x a^n")
# ------------------------------------------------------------------ #

_LAW_SAME_BASE = {"c7m11.3.1", "c7m11.3.2", "c7m11.3.3"}   # a, m, n
_LAW_SAME_EXP = {"c7m11.3.4", "c7m11.3.5"}                 # a, b, m


def _align_law_numbers(
        cid: str, nums: List[Tuple[float, int, int, str]],
        text: str = "",
) -> Optional[Dict[str, Tuple[float, int, int]]]:
    vals = [n[0] for n in nums]
    out: Dict[str, Tuple[float, int, int]] = {}
    if cid in _LAW_SAME_BASE:
        # "2^5 x 2^3" -> [2, 5, 2, 3]: base repeated, skip the repeat
        if len(vals) == 4 and vals[0] == vals[2]:
            out["a"] = nums[0][:3]
            out["m"] = nums[1][:3]
            out["n"] = nums[3][:3]
            return out
        if len(vals) == 3:
            for name, num in zip(("a", "m", "n"), nums):
                out[name] = num[:3]
            return out
        return None
    if cid in _LAW_SAME_EXP:
        # "2^3 x 3^3" -> [2, 3, 3, 3]: exponent repeated, skip the repeat
        if len(vals) == 4 and vals[1] == vals[3]:
            out["a"] = nums[0][:3]
            out["b"] = nums[2][:3]
            out["m"] = nums[1][:3]
            return out
        if len(vals) == 3:
            for name, num in zip(("a", "b", "m"), nums):
                out[name] = num[:3]
            return out
        return None
    if cid == "c7m11.2.1":
        if len(vals) == 2:
            out["a"] = nums[0][:3]
            out["m"] = nums[1][:3]
            return out
        # "what is 5 cubed": the exponent is carried by the word
        if len(vals) == 1:
            we = _word_exponent(text)
            if we is not None:
                out["a"] = nums[0][:3]
                out["m"] = we
                return out
        return None
    if cid == "c7m11.3.6":
        # "value of 7 to the power 0": base + the zero exponent
        if len(vals) == 2 and vals[1] == 0 and vals[0] != 0:
            out["a"] = nums[0][:3]
            return out
        return None
    return None


def _word_exponent(text: str) -> Optional[Tuple[float, int, int]]:
    """'squared' -> (2.0, start, end); 'cubed' -> (3.0, ...).

    Deterministic keyword map for NCERT's word exponents.
    """
    m = re.search(r"\bsquared\b", text.lower())
    if m:
        return 2.0, m.start(), m.end()
    m = re.search(r"\bcubed\b", text.lower())
    if m:
        return 3.0, m.start(), m.end()
    return None


# ------------------------------------------------------------------ #
# Core extraction
# ------------------------------------------------------------------ #

@dataclass
class SlotExtraction:
    """Values plus parallel verbatim spans (audit-ready)."""
    values: Dict[str, float] = field(default_factory=dict)
    spans: Dict[str, Tuple[int, int]] = field(default_factory=dict)
    template: str = ""
    labeled: bool = False
    reason: str = ""


def _in_blocked(span: Tuple[int, int],
                blocked: List[Tuple[int, int]]) -> bool:
    return any(s <= span[0] and span[1] <= e for s, e in blocked)


def _try_templates(entries: List[Dict[str, Any]], text: str, cid: str,
                   blocked: List[Tuple[int, int]], mode: str = "both"
                   ) -> Tuple[Optional[SlotExtraction], List[Dict[str, Any]]]:
    """Template alignment.  mode='regex': strict pattern match only
    (high precision); mode='positional': k-th number fills the k-th
    template variable; mode='both' (legacy order)."""
    if mode in ("regex", "both"):
        # strict regex alignment (placeholders map to number groups)
        for entry in entries:
            rx = entry.get("rx")
            if rx is None:
                continue
            m = rx.match(text)
            if not m:
                continue
            values: Dict[str, float] = {}
            spans: Dict[str, Tuple[int, int]] = {}
            ok = True
            for name in entry["vars"]:
                try:
                    gs, ge = m.span(name)
                except IndexError:  # pragma: no cover - defensive
                    ok = False
                    break
                if gs < 0:
                    ok = False
                    break
                val = float(m.group(name))
                reason = _guard_value(cid, name, val)
                if reason:
                    ok = False
                    break
                values[name] = val
                spans[name] = (gs, ge)
            if ok and values:
                return SlotExtraction(values, spans, entry["pattern"],
                                      False, ""), []
    if mode in ("positional", "both"):
        nums = [(v, s, e, tok) for (v, s, e, tok) in _scan_numbers(text)
                if not _in_blocked((s, e), blocked)]
        for entry in entries:
            lits = set(entry.get("literals", []))
            pool = [n for n in nums if n[3] not in lits]
            names = entry["vars"]
            if len(pool) != len(names):
                if len(pool) > len(names):
                    # ambiguous: try the unit-aware subset (exactly
                    # role-count numbers carrying role-consistent
                    # units) before refusing
                    tagged = _unit_aware_pool(names, pool, text)
                    if tagged is None:
                        continue
                    pool = tagged
                else:
                    continue  # too few = misaligned
            values = {}
            spans = {}
            ok = True
            for name, num in zip(names, pool):
                reason = _guard_value(cid, name, num[0])
                if reason:
                    ok = False
                    break
                values[name] = num[0]
                spans[name] = (num[1], num[2])
            if ok:
                return SlotExtraction(values, spans, entry["pattern"],
                                      False, ""), []
    return None, entries


def _cond_matches(cond: str, text_lower: str) -> bool:
    """Flat condition DSL: groups joined by '&', alternatives by '|'."""
    cond = (cond or "").strip()
    if not cond:
        return True
    for group in cond.split("&"):
        alts = [a.strip() for a in group.split("|") if a.strip()]
        if alts and not any(a in text_lower for a in alts):
            return False
    return True


def _canonical_set_vars(cid: str, text_lower: str) -> Optional[List[str]]:
    sets = _CANONICAL_SETS.get(cid)
    if not sets:
        return None
    for cond, names in sets:
        if _cond_matches(cond, text_lower):
            return list(names)
    return None


# ------------------------------------------------------------------ #
# Formula-based role inference (fallback for concepts without an
# explicit _CANONICAL_SETS entry -- handles the 812 auto-generated
# catalog concepts across all classes/subjects)
# ------------------------------------------------------------------ #

# Constants and built-ins that are NOT slot variables
_FORMULA_CONSTANTS = {
    "pi", "e", "100", "180", "360", "90", "2", "10", "1000", "12",
    "60", "sqrt", "abs", "max", "min", "sum", "len", "g", "c",
    "sin", "cos", "tan", "asin", "acos", "atan", "log", "log10",
    "exp", "floor", "ceil",
    "true", "false", "none", "nil",
}

# Target variable names (LHS of "target = expr") that are NOT input slots
_TARGET_NAMES = {
    "result", "answer", "value", "output", "area", "perimeter",
    "volume", "circumference", "percentage", "percent", "interest",
    "amount", "profit", "loss", "discount", "cost", "price",
    "theta", "omega", "ratio", "diff", "sum", "product",
    "percentage_value", "interest_value", "profit_value",
    "final", "total", "num", "denom", "numerator_value",
    "denominator_value", "step1", "step2", "step3", "step4",
    "step1_value", "step2_value", "step3_value", "step4_value",
    "r_sq", "sqrt_ratio", "fraction", "decimal",
}


def _extract_formula_vars(formula: str) -> List[str]:
    """Parse an ASCII formula and return the input variable names.

    For "area = base * height" -> ["base", "height"]
    For "percentage = (part / whole) * 100" -> ["part", "whole"]
    For "I = (P * R * T) / 100" -> ["P", "R", "T"]
    """
    if not formula or "=" not in formula:
        return []
    parts = formula.split("=", 1)
    # The LHS is the target (output); the RHS contains the inputs
    lhs = parts[0].strip()
    rhs = parts[1].strip() if len(parts) > 1 else ""
    if not rhs:
        return []
    # The target name is the LHS variable
    import re as _re
    lhs_tokens = _re.findall(r"[A-Za-z_][A-Za-z_0-9]*", lhs)
    target = lhs_tokens[0].lower() if lhs_tokens else ""
    # Find all identifier tokens on the RHS
    tokens = _re.findall(r"[A-Za-z_][A-Za-z_0-9]*", rhs)
    seen = []
    for t in tokens:
        t_lower = t.lower()
        if t_lower in _FORMULA_CONSTANTS:
            continue
        if t_lower == target:
            continue  # don't include the target as an input
        if t in seen:
            continue
        seen.append(t)
    return seen


def _extract_compute_vars(concept: Dict) -> List[str]:
    """Extract input variable names from compute fields in solution_steps.

    A name on the LHS of a compute expression is an intermediate or
    output; a name on the RHS that hasn't been assigned is an input.
    """
    import re as _re
    assigned = set()
    # First pass: collect all assigned names (LHS)
    for s in (concept.get("compute_steps") or concept.get("solution_steps") or []):
        expr = s.get("compute", "")
        if not expr or "=" not in expr:
            continue
        lhs = expr.split("=", 1)[0].strip()
        lhs_tokens = _re.findall(r"[A-Za-z_][A-Za-z_0-9]*", lhs)
        for t in lhs_tokens:
            assigned.add(t.lower())
    # Second pass: collect RHS names that aren't assigned or constants
    seen = []
    for s in (concept.get("compute_steps") or concept.get("solution_steps") or []):
        expr = s.get("compute", "")
        if not expr:
            continue
        if "=" in expr:
            rhs = expr.split("=", 1)[1].strip()
        else:
            rhs = expr
        tokens = _re.findall(r"[A-Za-z_][A-Za-z_0-9]*", rhs)
        for t in tokens:
            t_lower = t.lower()
            if t_lower in _FORMULA_CONSTANTS:
                continue
            if t_lower in assigned:
                continue
            if t in seen:
                continue
            seen.append(t)
    return seen


def _infer_roles_from_concept(concept: Dict) -> Optional[List[str]]:
    """Infer slot role names from the concept's own formula and compute
    fields.  This is the fallback for auto-generated catalogs that
    don't have an explicit _CANONICAL_SETS entry.

    Returns the variable names in order, or None if no roles found.

    Conservative: requires compute fields in solution_steps (not just a
    formula) to avoid false slot extraction on conceptual questions
    that happen to contain numbers matching the formula's variables.
    """
    cid = str(concept.get("id", ""))

    # Skip list-role concepts -- they use extract_list_slots, not
    # extract_slots.  Inferring scalar roles here would hijack the
    # list extraction path.
    if cid in _LIST_ROLE_CONCEPTS:
        return None

    # Try the compute fields in solution_steps first (most reliable --
    # these are the actual expressions the executor will evaluate)
    roles = _extract_compute_vars(concept)
    if roles:
        return roles

    # Try the formula field only if the concept also has compute steps
    # (a formula alone is too generic -- "area = base * height" would
    # match any question with two numbers)
    has_compute_steps = any("compute" in s
                            for s in (concept.get("compute_steps") or
                                      concept.get("solution_steps") or []))
    if has_compute_steps:
        formula = concept.get("formula", "")
        roles = _extract_formula_vars(formula)
        if roles:
            return roles

    # Try the extracted_variables from worked examples
    examples = concept.get("worked_examples", [])
    if not examples:
        examples = catalog_worked_examples(concept)
    for ex in examples:
        ev = ex.get("extracted_variables", {})
        if ev:
            roles = list(ev.keys())
            roles = [r for r in roles
                     if r.lower() not in _FORMULA_CONSTANTS]
            if roles:
                return roles

    return None


def _assign_positional(cid: str, names: List[str],
                       nums: List[Tuple[float, int, int, str]]
                       ) -> Tuple[Optional[SlotExtraction], str]:
    if len(nums) < len(names):
        return None, "too few numbers in text for %d required values" \
            % len(names)
    if len(nums) > len(names):
        return None, ("ambiguous: %d numbers for %d roles and template "
                      "order undefined" % (len(nums), len(names)))
    values: Dict[str, float] = {}
    spans: Dict[str, Tuple[int, int]] = {}
    for name, num in zip(names, nums):
        reason = _guard_value(cid, name, num[0])
        if reason:
            return None, reason
        values[name] = num[0]
        spans[name] = (num[1], num[2])
    return SlotExtraction(values, spans, "canonical-order", False, ""), ""


def extract_slots_detailed(
    text: str,
    concept: Dict,
    worked_examples: Optional[List[Dict]] = None,
) -> Optional[SlotExtraction]:
    """Full extraction result: values + verbatim spans + provenance."""
    text = str(text or "")
    cid = str((concept or {}).get("id", ""))
    examples = (worked_examples if worked_examples is not None
                else catalog_worked_examples(concept))
    # concept-embedded templates (generated STEM catalogs carry their
    # own {var}-placeholder worked_examples) merge with catalog ones
    embedded = concept.get("worked_examples") or []
    if embedded:
        examples = list(examples) + [
            dict(e, concept=cid) for e in embedded
            if isinstance(e, dict)]
    entries = _template_entries(concept, examples)

    varnames: List[str] = []
    for entry in entries:
        for n in entry["vars"]:
            if n not in varnames:
                varnames.append(n)
    canon = _canonical_set_vars(cid, text.lower())
    canon_from_fallback = False
    if not canon and cid not in _CANONICAL_SETS:
        # Fallback: infer roles from the concept's own formula/compute
        # fields.  Only for concepts with NO _CANONICAL_SETS entry at
        # all -- if the concept HAS an entry but the conditions didn't
        # match this question, the honest refusal must stand.
        canon = _infer_roles_from_concept(concept)
        canon_from_fallback = canon is not None
    if canon:
        for n in canon:
            if n not in varnames:
                varnames.append(n)
    # LHS/output vars are legitimate labeled bind targets: 'density = 2'
    # gives the formula's OUTPUT while the question asks an input --
    # without this the label fails to match and its number gets
    # positionally rebound to the wrong var
    try:
        for eq in re.split(r"[;\n]", str(concept.get("formula") or "")):
            if "=" in eq:
                lhs = eq.split("=", 1)[0].strip()
                if re.fullmatch(r"[A-Za-z_][A-Za-z_0-9]*", lhs) \
                        and lhs not in varnames:
                    varnames.append(lhs)
    except Exception:
        pass

    blocked = _excluded_spans(text)
    labeled, consumed = _labeled_bindings(text, varnames, blocked)
    blocked = blocked + consumed

    # --- implicit state-phrase binds -------------------------------- #
    # "accelerates from rest" / "dropped" carry a REAL value (u = 0)
    # with no digits to bind -- synthesize it as a labeled bind so
    # inferred-role concepts (which refuse positional fills) still get
    # the honest binding instead of falling through to the LLM
    # canonicalizer for a phrase a rule can read.
    _INIT_VEL_NAMES = {"u", "u_i", "v_0", "v0", "initial_velocity",
                       "initial_speed", "initial_vel"}
    _FINAL_VEL_NAMES = {"v", "v_f", "vf", "final_velocity",
                        "final_speed"}
    _rest = re.search(
        r"\b(?:starts?\s+from|from|at)\s+rest\b|\bdropped\b", text, re.I)
    _stop = re.search(
        r"\b(?:comes?\s+to|slows?\s+to|finally)\s+rest\b|"
        r"\bcomes?\s+to\s+(?:a\s+)?stop\b|\bstops?\b|\bhalts?\b",
        text, re.I)
    if _rest:
        for v in varnames:
            if v in _INIT_VEL_NAMES and v not in labeled:
                labeled[v] = (0.0, _rest.start(), _rest.end())
                break
    if _stop:
        for v in varnames:
            if v in _FINAL_VEL_NAMES and v not in labeled:
                labeled[v] = (0.0, _stop.start(), _stop.end())
                break

    # --- labeled-first assembly ------------------------------------- #
    if labeled:
        required = canon or (entries[0]["vars"] if entries else [])
        missing = [n for n in required if n not in labeled]
        if not missing:
            values = {k: v[0] for k, v in labeled.items()}
            spans = {k: (v[1], v[2]) for k, v in labeled.items()}
            for k in list(values):
                reason = _guard_value(cid, k, values[k])
                if reason:
                    return SlotExtraction(reason=reason)
            cross = _cross_guards(values)
            if cross:
                return SlotExtraction(reason=cross)
            return SlotExtraction(values, spans, "labeled", True, "")
        # partial labels: fill the rest positionally from free numbers
        nums = [(v, s, e, tok) for (v, s, e, tok) in _scan_numbers(text)
                if not _in_blocked((s, e), blocked)]
        rest = [n for n in missing]
        if len(nums) >= len(rest):
            values = {k: v[0] for k, v in labeled.items()}
            spans = {k: (v[1], v[2]) for k, v in labeled.items()}
            # unit-consistent fill first: a number carrying 's' belongs
            # to a time role, 'm/s^2' to acceleration -- positional zip
            # of a unit-bearing number onto a mismatched role produced
            # 'acceleration=3 (the 3 s!)' scrambles.  Numbers with no
            # tag and names with no role tag fall back to order.
            pool = list(nums)
            ordered_rest: List[Tuple[str, tuple]] = []
            for name in list(rest):
                want = _role_unit_tags([name])
                hit = next(
                    (n for n in pool
                     if (_unit_tag(text, n[1], n[2]) or "") in want
                     and want),
                    None)
                if hit is not None:
                    pool.remove(hit)
                    ordered_rest.append((name, hit))
                    rest.remove(name)
            for name, num in zip(rest, pool):
                ordered_rest.append((name, num))
            for name, num in ordered_rest:
                reason = _guard_value(cid, name, num[0])
                if reason:
                    return SlotExtraction(reason=reason)
                values[name] = num[0]
                spans[name] = (num[1], num[2])
            cross = _cross_guards(values)
            if cross:
                return SlotExtraction(reason=cross)
            return SlotExtraction(values, spans, "labeled+positional", True,
                                  "")
        # fall through: labels alone were not enough

    # --- exponent-law structural alignment -------------------------- #
    law = _align_law_numbers(cid, [(v, s, e, t)
                                   for (v, s, e, t) in _scan_numbers(text)
                                   if not _in_blocked((s, e), blocked)],
                             text)
    if law is not None:
        values = {k: v[0] for k, v in law.items()}
        spans = {k: (v[1], v[2]) for k, v in law.items()}
        for k in values:
            reason = _guard_value(cid, k, values[k])
            if reason:
                return SlotExtraction(reason=reason)
        cross = _cross_guards(values)
        if cross:
            return SlotExtraction(reason=cross)
        return SlotExtraction(values, spans, "exponent-law", False, "")

    # --- strict worked-example pattern match ------------------------ #
    hit, _entries = _try_templates(entries, text, cid, blocked, "regex")
    if hit is not None:
        cross = _cross_guards(hit.values)
        if cross:
            return SlotExtraction(reason=cross)
        return hit

    # --- canonical role order (target-aware, from the catalog) ------ #
    nums = [(v, s, e, tok) for (v, s, e, tok) in _scan_numbers(text)
            if not _in_blocked((s, e), blocked)]
    if canon:
        if cid == "c7m11.2.1" and len(nums) == 1 and canon == ["a", "m"]:
            we = _word_exponent(text)
            if we is not None:
                reason = _guard_value(cid, "a", nums[0][0])
                if reason:
                    return SlotExtraction(reason=reason)
                return SlotExtraction(
                    {"a": nums[0][0], "m": we[0]},
                    {"a": (nums[0][1], nums[0][2]), "m": (we[1], we[2])},
                    "canonical-order+word-exponent", False, "")
        # Fallback-inferred roles: positional binding is guessing the
        # order without a real role table -- only labeled binding is
        # honest.  Skip positional and fall through to refusal.
        if not canon_from_fallback:
            hit, reason = _assign_positional(cid, canon, nums)
        if not canon_from_fallback:
            if hit is None and len(nums) > len(canon):
                # ambiguous positional reading: the unit-aware subset is the
                # only honest rescue (exactly role-count numbers carrying
                # role-consistent units, surplus numbers carrying none)
                tagged = _unit_aware_pool(canon, nums, text)
                if tagged is not None:
                    hit, reason = _assign_positional(cid, canon, tagged)
                    if hit is not None:
                        cross = _cross_guards(hit.values)
                        if cross:
                            return SlotExtraction(reason=cross)
                        return SlotExtraction(
                            hit.values, hit.spans,
                            "canonical-order+unit-aware", False, "")
            if hit is not None:
                cross = _cross_guards(hit.values)
                if cross:
                    return SlotExtraction(reason=cross)
                return hit
            return SlotExtraction(reason=reason)
        # fallback roles: positional guessing is dishonest, BUT a
        # unit-consistent bind is not a guess -- '15 m/s' to a velocity
        # role, '3 m/s^2' to acceleration, '4 s' to time is a labeled
        # read in disguise.  Accept only when every inferred role gets
        # exactly one unit-consistent number; ambiguity refuses.
        pool = [(v, s2, e, tok) for (v, s2, e, tok)
                in _scan_numbers(text)
                if not _in_blocked((s2, e), blocked)]
        assigned: Dict[str, tuple] = {}
        ambiguous = False
        for name in canon:
            want = _role_unit_tags([name])
            if not want:
                ambiguous = True
                break
            cands = [n for n in pool
                     if (_unit_tag(text, n[1], n[2]) or "") in want]
            if len(cands) == 1:
                assigned[name] = cands[0]
            elif len(cands) == 0:
                # role with no unit-bearing number -- an implicit bind
                # may already have covered it (rest/stop phrases)
                if name in labeled:
                    continue
                ambiguous = True
                break
            else:
                ambiguous = True
                break
        if not ambiguous and len(assigned) == len(canon):
            values = {k: n[0] for k, n in assigned.items()}
            spans = {k: (n[1], n[2]) for k, n in assigned.items()}
            for k in values:
                reason = _guard_value(cid, k, values[k])
                if reason:
                    return SlotExtraction(reason=reason)
            cross = _cross_guards(values)
            if cross:
                return SlotExtraction(reason=cross)
            return SlotExtraction(values, spans, "unit-consistent",
                                  False, "")
        return SlotExtraction(reason="inferred roles require labeled "
                                     "binding; positional not available "
                                     "for auto-inferred concept")

    # --- loose positional alignment on worked-example templates ----- #
    hit, _entries = _try_templates(entries, text, cid, blocked,
                                   "positional")
    if hit is not None:
        cross = _cross_guards(hit.values)
        if cross:
            return SlotExtraction(reason=cross)
        return hit

    if entries:
        return SlotExtraction(reason="no template aligned the numbers")
    return SlotExtraction(reason="concept has no numeric template")


def extract_slots(
    text: str,
    concept: Dict,
    worked_examples: Optional[List[Dict]] = None,
) -> Optional[Dict[str, float]]:
    """Stage 2 API: text + matched concept -> numeric slots, or None.

    Scalar slots only (the pipeline stores them in ModelResult
    quantities); list-valued data sets go through extract_list_slots.
    """
    det = extract_slots_detailed(text, concept, worked_examples)
    if det is None or not det.values:
        return None
    return dict(det.values)


def extract_list_slots(
    text: str,
    concept: Dict,
) -> Optional[Dict[str, List[float]]]:
    """List-role extraction (mean/range/median/mode data, ratio parts).

    Every number in the text becomes one observation -- the concept
    guarantees the roles ("find the mean of 4, 6, 8 and 10").
    """
    cid = str((concept or {}).get("id", ""))
    role = _LIST_ROLE_CONCEPTS.get(cid)
    if role is None:
        return None
    text = str(text or "")
    blocked = _excluded_spans(text)
    nums = [(v, s, e, tok) for (v, s, e, tok) in _scan_numbers(text)
            if not _in_blocked((s, e), blocked)]
    if len(nums) < 2:
        return None
    for v, _s, _e, _tok in nums:
        if abs(v) > 1_000_000_000:
            return None
    return {role: [n[0] for n in nums]}
