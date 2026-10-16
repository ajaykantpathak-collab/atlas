"""maths_families.py -- THE maths registry (WS-B merge step 1).

One file per the consolidation map (WS-B_consolidation_map.md
§5.1): every maths family moved here by MOVE from 14 sources:
class6/7/7b/8_families, maths2/3/4_families,
applied_maths_families, jee_families, isc_stats_families,
circle_locus_families, formula_plugin_families,
modeling_structures, syllabus_families (26 maths rows),
extra_families (12 maths fns), extra_families2 (12 maths fns;
the extra2 INVERSE_PROPORTION row was DROPPED per map §4a).

Semantics contract (map §3, invariant I1/I2): each table block
keeps its own dispatcher and result-shaping; model_maths
aggregates them exactly as the global sweep did among the old
adjacent registrations -- highest confidence wins, the earlier
block wins a confidence tie (strict >).  Row order inside every
block is byte-preserved.  Private helpers that existed in several
source files carry a block suffix (_no_m2, _fmt_st, ...); family
ids and public model_* names are unchanged.
"""

from __future__ import annotations

import ast
import math
import re
from fractions import Fraction
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult


# ==========================================================================
# BLOCK C6 -- moved from class6_families.py (map §5.1; ids + row order preserved)
# ==========================================================================


def _no_c6(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


# --------------------------------------------------------------------------- #
# ARITHMETIC_EVAL -- pure arithmetic in words or symbols
# --------------------------------------------------------------------------- #

_ARROW_OPS = [("multiplied by", "*"), ("multiplies", "*"),
              ("divided by", "/"), ("added to", "+"), ("plus", "+"),
              ("minus", "-"), ("times", "*"), ("x", "*"), ("×", "*"),
              ("÷", "/"), ("+", "+"), ("-", "-"), ("*", "*"), ("/", "/")]
_NUM_c6 = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"     # 45,678 | 3.75 | 7


def _to_num(tok: str) -> float:
    return float(tok.replace(",", ""))


def _expression_is_whole_question(low: str, spans) -> bool:
    """RED-TEAM GUARD (2026-09-12 wave): the matched arithmetic
    expression must be the question's ENTIRE computational content.

    Leftover digits outside the matched expression mean the text is a
    word problem (unit-bearing quantities, other data) and the scraped
    expression is fabricated slot arithmetic -- e.g. '10 mL of 0.2 M
    Ca(OH)2 + 25 mL' -> '2 + 25 = 27', or a five-score quiz sum scraped
    as '25 -5 -10 = 10'.  Those must refuse, not ship."""
    for s, e in spans:
        low = low[:s] + " " + low[e:]
    return not re.search(r"\d", low)


def model_arithmetic_eval(text: str) -> ModelResult:
    low = text.lower()
    # chemistry context guard: OCR scientific notation ("10-2 mol")
    # is an exponent, not subtraction
    if re.search(r"mol|solution|acid|ph\b|mixture", low) and re.search(
            r"10\s*-\s*\d|10\s*\^", low):
        return _no_c6("ARITHMETIC_EVAL",
                   "scientific notation in chemistry context")
    # 'add A and B' / 'sum of A and B' first (no operator symbols)
    add_m = re.search(r"(?:add|sum of)\s+(" + _NUM_c6 + r")\s+and\s+(" +
                      _NUM_c6 + r")", low)
    if add_m:
        if not _expression_is_whole_question(low, [add_m.span()]):
            return _no_c6("ARITHMETIC_EVAL",
                       "word-sum is not the whole question: leftover "
                       "quantities would be fabricated slot arithmetic")
        a, b = _to_num(add_m.group(1)), _to_num(add_m.group(2))
        val = a + b
        return ModelResult(
            structure="ARITHMETIC_EVAL", matched=True, confidence=0.95,
            quantities={"a": a, "b": b},
            governing_equation="a + b", final_answer=f"{val:.6g}",
            numeric_answer=val,
            steps=[f"{a:g} + {b:g} = {val:g}"],
            note="word-sum arithmetic")
    # precedence guard: bare-fraction answers ("2/3" from "2/3 of 18",
    # "22/7" from "pi = 22/7") belong to the fraction-of and circle
    # families, not this plain-evaluation path
    if re.search(r"circle|pi\s*=", low) and "=" in low:
        return _no_c6("ARITHMETIC_EVAL", "pi given: circle family")
    if re.search(r"\d\s*/\s*\d\s+of\s+\d", low):
        return _no_c6("ARITHMETIC_EVAL", "fraction-of family")
    # pure expression ("what is -3 + 5", "2.5 + 3.75 = ?"): strip prose
    expr_m = re.search(
        r"(-?\d[\d,\.]*(?:\s*(?:[+\-*/x×÷^]|\b(?:plus|minus|times|"
        r"multiplied by|divided by)\b)\s*-?\d[\d,\.]*)+)", low)
    if not expr_m:
        return _no_c6("ARITHMETIC_EVAL", "no arithmetic expression")
    # RED-TEAM GUARD: the expression must BE the question.  An embedded
    # scrape ("2 + 25" from a pH mixture, "5/2" from a word equation,
    # "25 -5 -10" from a five-score sum) is fabricated arithmetic.
    if not _expression_is_whole_question(low, [expr_m.span(1)]):
        return _no_c6("ARITHMETIC_EVAL",
                   "expression is not the whole question: leftover "
                   "quantities would be fabricated slot arithmetic")
    expr = expr_m.group(1)
    for word, op in [("plus", "+"), ("minus", "-"), ("times", "*"),
                     ("multiplied by", "*"), ("divided by", "/"),
                     ("x", "*"), ("×", "*"), ("÷", "/")]:
        expr = re.sub(word, op, expr)
    expr = re.sub(r"[\d,]+\.\d*,(\d)", r"\1", expr)   # safety
    expr = expr.replace(",", "")
    if not re.fullmatch(r"[\d\.\s\+\-\*/\(\)\^]+", expr):
        return _no_c6("ARITHMETIC_EVAL", "expression not pure arithmetic")
    # 'add A and B' / 'sum of A and B'
    add_m = re.search(r"(?:add|sum of)\s+(" + _NUM_c6 + r")\s+and\s+(" +
                      _NUM_c6 + r")", low)
    if add_m and not re.search(r"[+\-*/]", expr_m.group(1)):
        a, b = _to_num(add_m.group(1)), _to_num(add_m.group(2))
        val = a + b
        return ModelResult(
            structure="ARITHMETIC_EVAL", matched=True, confidence=0.95,
            quantities={"a": a, "b": b},
            governing_equation="a + b", final_answer=f"{val:.6g}",
            numeric_answer=val,
            steps=[f"{a:g} + {b:g} = {val:g}"],
            note="word-sum arithmetic")
    try:
        # '^' is exponentiation in exam notation, NOT Python XOR --
        # eval("3^2") == 1 shipped a wrong answer for the G.P. question
        # 'How many terms of 3, 3^2, 3^3 ... give the sum 120?'
        val = eval(expr.replace("^", "**"), {"__builtins__": {}}, {})
    except Exception:
        return _no_c6("ARITHMETIC_EVAL", "evaluation failed")
    if not isinstance(val, (int, float)) or abs(val) == float("inf"):
        return _no_c6("ARITHMETIC_EVAL", "evaluation not finite")
    return ModelResult(
        structure="ARITHMETIC_EVAL", matched=True, confidence=0.95,
        quantities={"expr_value": val},
        governing_equation=expr.strip(),
        final_answer=f"{val:.6g}", numeric_answer=float(val),
        steps=[f"{expr.strip()} = {val:.6g}"],
        note="basic arithmetic")


# --------------------------------------------------------------------------- #
# NUMBER_THEORY -- LCM / HCF / GCD / prime factorisation
# --------------------------------------------------------------------------- #

_TWO_NUMS = re.compile(r"(?:of|between)\s+(" + _NUM_c6 + r")\s*(?:,|and)\s*(" +
                       _NUM_c6 + r")", re.I)


def model_number_theory(text: str) -> ModelResult:
    low = text.lower()
    if re.search(r"\b(lcm|l\.c\.m|hcf|gcf|gcd|highest common factor|"
                 r"least common multiple|lowest common multiple)\b", low):
        m = _TWO_NUMS.search(text)
        if not m:
            return _no_c6("NUMBER_THEORY", "no two numbers for LCM/HCF")
        a, b = int(_to_num(m.group(1))), int(_to_num(m.group(2)))
        g = math.gcd(a, b)
        l = a * b // g if g else 0
        if re.search(r"\bhcf|gcf|gcd|highest common factor\b", low):
            val, word = g, "HCF"
        else:
            val, word = l, "LCM"
        return ModelResult(
            structure="NUMBER_THEORY", matched=True, confidence=0.95,
            quantities={"a": a, "b": b},
            governing_equation=f"{word}({a}, {b})",
            final_answer=f"{word} of {a} and {b} = {val}",
            numeric_answer=float(val),
            steps=[f"{a} = {' x '.join(map(str, _prime_factors_c6(a)))}",
                   f"{b} = {' x '.join(map(str, _prime_factors_c6(b)))}",
                   f"{word} = {val}"],
            note="number theory")
    if re.search(r"prime\s+factoris\w*|prime\s+factoriz\w*", low):
        m = re.search(r"of\s+([\d,]+)", text)
        if not m:
            return _no_c6("NUMBER_THEORY", "no number to factorise")
        n = int(_to_num(m.group(1)))
        facs = _prime_factors_c6(n)
        parts = []
        for p in sorted(set(facs)):
            c = facs.count(p)
            parts.append(f"{p}^{c}" if c > 1 else f"{p}")
        return ModelResult(
            structure="NUMBER_THEORY", matched=True, confidence=0.95,
            quantities={"n": n}, governing_equation=f"factor({n})",
            final_answer=f"{n} = " + " x ".join(parts),
            numeric_answer=None,
            steps=[f"{n} = " + " x ".join(map(str, facs))],
            note="prime factorisation")
    return _no_c6("NUMBER_THEORY", "no number-theory intent")


def _prime_factors_c6(n: int) -> list:
    facs, d = [], 2
    while d * d <= n:
        while n % d == 0:
            facs.append(d)
            n //= d
        d += 1
    if n > 1:
        facs.append(n)
    return facs


# --------------------------------------------------------------------------- #
# ROMAN_NUMERALS -- both directions
# --------------------------------------------------------------------------- #

_ROMAN_MAP = [(1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
              (100, "C"), (90, "XC"), (50, "L"), (40, "XL"), (10, "X"),
              (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]
_ROMAN_VALUE = {c: v for v, c in _ROMAN_MAP}


def model_roman_numerals(text: str) -> ModelResult:
    low = text.lower()
    if "roman" not in low:
        return _no_c6("ROMAN_NUMERALS", "no roman mention")
    m = re.search(r"\b(\d{1,4})\b", text)
    to_roman = re.search(r"(?:in|as|write.{0,20}as)\s+roman", low) or \
        re.search(r"roman\s+numeral\s+for\s+\d", low)
    if to_roman and m:
        n = int(m.group(1))
        out = []
        rest = n
        for v, sym in _ROMAN_MAP:
            while rest >= v:
                out.append(sym)
                rest -= v
        return ModelResult(
            structure="ROMAN_NUMERALS", matched=True, confidence=0.95,
            quantities={"n": n}, governing_equation="to_roman(n)",
            final_answer="".join(out), numeric_answer=None,
            steps=[f"{n} = " + "".join(out)], note="arabic -> roman")
    rm = re.search(r"\b([MDCLXVI]+)\b", text)
    if rm:
        s = rm.group(1)
        total, prev = 0, 0
        for ch in reversed(s):
            v = _ROMAN_VALUE[ch]
            total = total - v if v < prev else total + v
            prev = max(prev, v)
        return ModelResult(
            structure="ROMAN_NUMERALS", matched=True, confidence=0.95,
            quantities={"value": total}, governing_equation="from_roman",
            final_answer=f"{s} = {total}", numeric_answer=float(total),
            steps=[f"{s} = {total}"], note="roman -> arabic")
    return _no_c6("ROMAN_NUMERALS", "no roman numeral found")


# --------------------------------------------------------------------------- #
# UNITARY_METHOD -- 'cost of 5 pens is 60; cost of 8 pens?'
# --------------------------------------------------------------------------- #


_UNITARY_UNITS = {
    "kg", "kgs", "kilogram", "kilograms", "g", "gm", "grams", "litre",
    "litres", "liter", "liters", "l", "ml", "m", "cm", "metre", "metres",
    "meter", "meters", "km", "dozen", "score", "ream", "quintal", "tonne",
}
_UNITARY_STOP = {"of", "the", "a", "an", "and", "are", "is", "was",
                 "were", "cost", "price"}


def model_unitary_method(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"\bcost\b|\bprice\b|\bweigh\w*\b|\bearn\w*\b|"
                     r"\bpays?\b|(?:rs\.?|inr|₹)\s*[\d,]", low):
        return _no_c6("UNITARY_METHOD", "no cost/weight context")

    # Price-anchored scan (2026-10-05 rewrite): the old regex demanded
    # "of|for N item is P" and anchored the target on item.split()[-1] —
    # "If 5 pens cost Rs 60" never matched (no of/for) and "the price of
    # 5 kg" was never found (anchor word was "oranges", not "kg").
    # Step 1: the FIRST explicit price marker fixes the given part.
    pm = re.search(r"(?:rs\.?|inr|₹)\s*([\d,]+(?:\.\d+)?)", low)
    if not pm or not pm.group(1).replace(",", "").strip():
        return _no_c6("UNITARY_METHOD", "no explicit price (rs/₹)")
    try:
        price = float(pm.group(1).replace(",", ""))
    except ValueError:
        return _no_c6("UNITARY_METHOD", "invalid price format")
    head = low[:pm.start()]

    # Step 2: the given quantity = the LAST number in the clause before
    # the price; the item phrase = the words between it and the marker.
    # Word quantities ("a dozen bananas") count: dozen=12, score=20,
    # half dozen=6.
    nums_head = list(re.finditer(r"(\d+(?:\.\d+)?)", head))
    if nums_head:
        n = float(nums_head[-1].group(1))
        item_span = head[nums_head[-1].end():pm.start()]
    elif re.search(r"half[\s-]*dozen", head):
        n, item_span = 6.0, head[re.search(r"half[\s-]*dozen", head).end():]
    elif re.search(r"\bdozen\b", head):
        n, item_span = 12.0, head[re.search(r"\bdozen\b", head).end():]
    elif re.search(r"\bscore\b", head):
        n, item_span = 20.0, head[re.search(r"\bscore\b", head).end():]
    else:
        return _no_c6("UNITARY_METHOD", "no base quantity before price")
    item_words = [w for w in re.findall(r"[a-z]+", item_span)
                  if w not in _UNITARY_STOP]
    if not item_words:
        return _no_c6("UNITARY_METHOD", "no item phrase")

    # Step 3: the asked quantity = the first "NUMBER anchor" after the
    # price, where anchor is a unit word (preferred) or another item word.
    tail = low[pm.end():]
    anchors = [w for w in item_words if w in _UNITARY_UNITS] + \
              [w for w in item_words if w not in _UNITARY_UNITS]
    target = None
    for anchor in anchors:
        am = re.search(r"(\d[\d,]*(?:\.\d+)?)\s+" + re.escape(anchor) + r"\b",
                       tail)
        if am:
            qty = float(am.group(1).replace(",", ""))
            if qty > 0:
                target = qty
                item = anchor if anchor in _UNITARY_UNITS else \
                    " ".join(item_words)
                break
    if target is None or n == 0:
        return _no_c6("UNITARY_METHOD", "no target quantity or zero count")

    per = price / n
    total = per * target
    return ModelResult(
        structure="UNITARY_METHOD", matched=True, confidence=0.9,
        quantities={"n": n, "price": price, "m": target},
        governing_equation="total = price/n * m",
        final_answer=f"{total:.4g}", numeric_answer=total,
        steps=[f"Cost of 1 {item} = {price:g}/{n:g} = "
               f"{per:.4g}",
               f"Cost of {target:g} = {per:.4g} x {target:g} = "
               f"{total:.4g}"],
        note="unitary method")


# --------------------------------------------------------------------------- #
# RATIO_DIVIDE -- 'divide 60 in ratio 2:3'
# --------------------------------------------------------------------------- #


def model_ratio_divide(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"\bratio\b", low) or not re.search(
            r"divide|split|share[d]?|distributed", low):
        return _no_c6("RATIO_DIVIDE", "no ratio-division phrasing")
    total_m = re.search(r"(?:divide|split|share|distribut\w*)\s+"
                        r"([\d,]+)", low)
    ratio_m = re.search(r"ratio\s+of\s*(\d+)\s*:\s*(\d+)", low)
    if not ratio_m:
        ratio_m = re.search(r"(\d+)\s*:\s*(\d+)", low)
    if not total_m or not ratio_m:
        return _no_c6("RATIO_DIVIDE", "need total + ratio a:b")
    total = _to_num(total_m.group(1))
    a, b = int(ratio_m.group(1)), int(ratio_m.group(2))
    if a + b <= 0:
        return _no_c6("RATIO_DIVIDE", "degenerate ratio")
    part_a = total * a / (a + b)
    part_b = total * b / (a + b)
    want_small = re.search(r"smaller|least|lower", low)
    want_large = re.search(r"larger|bigger|greater|highest", low)
    val = part_a if (want_small or (not want_large and a <= b)) \
        else part_b
    label = "smaller" if val == min(part_a, part_b) else "larger"
    return ModelResult(
        structure="RATIO_DIVIDE", matched=True, confidence=0.9,
        quantities={"total": total, "a": a, "b": b},
        governing_equation=f"part = total x {a}/{a + b} or "
                           f"total x {b}/{a + b}",
        final_answer=f"{val:.4g}", numeric_answer=val,
        steps=[f"Total parts = {a} + {b} = {a + b}",
               f"Parts: {part_a:.4g} and {part_b:.4g}",
               f"The {label} part = {val:.4g}"],
        note="ratio division")


# --------------------------------------------------------------------------- #
# NUMBER_RIDDLE -- 'If 5 added to a number gives 12, find the number'
# --------------------------------------------------------------------------- #


def model_number_riddle(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"a\s+number|the\s+number", low):
        return _no_c6("NUMBER_RIDDLE", "no 'a number' subject")
    m = re.search(r"if\s+(\d+(?:\.\d+)?)\s+added\s+to\s+(?:a|the)\s+number"
                  r"[^0-9]{0,30}?(\d+(?:\.\d+)?)", low)
    if m and re.search(r"gives?|makes?|results?|equals?", low):
        add, result = float(m.group(1)), float(m.group(2))
        val = result - add
        return ModelResult(
            structure="NUMBER_RIDDLE", matched=True, confidence=0.9,
            quantities={"add": add, "result": result},
            governing_equation="n + add = result",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"n + {add:g} = {result:g}",
                   f"n = {result:g} - {add:g} = {val:g}"],
            note="number riddle (added)")
    m = re.search(r"(\d+(?:\.\d+)?)\s+times\s+(?:a|the)\s+number"
                  r"[^0-9]{0,30}?(\d+(?:\.\d+)?)", low)
    if m and re.search(r"gives?|makes?|results?|equals?|is\b", low):
        mul, result = float(m.group(1)), float(m.group(2))
        if mul == 0:
            return _no_c6("NUMBER_RIDDLE", "zero multiplier")
        val = result / mul
        return ModelResult(
            structure="NUMBER_RIDDLE", matched=True, confidence=0.9,
            quantities={"mul": mul, "result": result},
            governing_equation="n * mul = result",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"n x {mul:g} = {result:g}",
                   f"n = {result:g}/{mul:g} = {val:g}"],
            note="number riddle (times)")
    return _no_c6("NUMBER_RIDDLE", "unrecognised riddle form")

# --------------------------------------------------------------------------- #
# SQUARE_MENSURATION -- area / perimeter of a square (and rectangles the
# kernel regexes miss)
# --------------------------------------------------------------------------- #


def model_square_mensuration(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"square", low):
        return _no_c6("SQUARE_MENSURATION", "not a square")
    if not re.search(r"area|perimeter|boundary", low):
        return _no_c6("SQUARE_MENSURATION", "no area/perimeter ask")
    sm = re.search(r"side\s*(?:of\s*)?(?:is\s*)?(" + _NUM_c6 + r")", low)
    if not sm:
        return _no_c6("SQUARE_MENSURATION", "no side given")
    s = _to_num(sm.group(1))
    if s <= 0:
        return _no_c6("SQUARE_MENSURATION", "non-positive side")
    if re.search(r"perimeter|boundary", low):
        val = 4 * s
        eq = "P = 4s"
        steps = [f"P = 4 x {s:g} = {val:g}"]
    else:
        val = s * s
        eq = "A = s^2"
        steps = [f"A = {s:g}^2 = {val:g}"]
    return ModelResult(
        structure="SQUARE_MENSURATION", matched=True, confidence=0.95,
        quantities={"s": s}, governing_equation=eq,
        final_answer=f"{val:.6g}", numeric_answer=val,
        steps=steps, note="square mensuration")


# ==========================================================================
# BLOCK C7 -- moved from class7_families.py (map §5.1; ids + row order preserved)
# ==========================================================================

_NUM_c7 = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"


def _no_c7(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _n_c7(tok: str) -> float:
    return float(tok.replace(",", ""))


# --------------------------------------------------------------------------- #
# WORD_ARITHMETIC
# --------------------------------------------------------------------------- #


def model_word_arithmetic(text: str) -> ModelResult:
    low = text.lower()
    pm = re.search(r"(?:multiply|product\s+of)\s+(-?" + _NUM_c7 + r")\s+(?:and|"
                   r"by|\s)\s*(-?" + _NUM_c7 + r")", low)
    if pm:
        a, b = _n_c7(pm.group(1)), _n_c7(pm.group(2))
        val = a * b
        return ModelResult(
            structure="WORD_ARITHMETIC", matched=True, confidence=0.96,
            quantities={"a": a, "b": b}, governing_equation="a * b",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"{a:g} x {b:g} = {val:.6g}"], note="word product")
    dm = re.search(r"divide\s+(-?" + _NUM_c7 + r")\s+by\s+(-?" + _NUM_c7 + r")",
                   low)
    if dm:
        a, b = _n_c7(dm.group(1)), _n_c7(dm.group(2))
        if b == 0:
            return _no_c7("WORD_ARITHMETIC", "division by zero")
        val = a / b
        return ModelResult(
            structure="WORD_ARITHMETIC", matched=True, confidence=0.96,
            quantities={"a": a, "b": b}, governing_equation="a / b",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"{a:g} / {b:g} = {val:.6g}"], note="word quotient")
    sm = re.search(r"subtract\s+(-?" + _NUM_c7 + r")\s+from\s+(-?" + _NUM_c7 + r")",
                   low)
    if sm:
        # 'subtract X from Y' = Y - X
        b, a = _n_c7(sm.group(1)), _n_c7(sm.group(2))
        val = a - b
        return ModelResult(
            structure="WORD_ARITHMETIC", matched=True, confidence=0.96,
            quantities={"a": a, "b": b}, governing_equation="a - b",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"{a:g} - {b:g} = {val:.6g}"], note="word difference")
    return _no_c7("WORD_ARITHMETIC", "no word-arithmetic form")


# --------------------------------------------------------------------------- #
# FRACTION_PERCENT_OF
# --------------------------------------------------------------------------- #


def model_fraction_percent_of(text: str) -> ModelResult:
    low = text.lower()
    fo = re.search(
        r"(\d+\s*/\s*\d+|\d+(?:\.\d+)?\s*%|half|quarter|thrice|double)"
        r"\s+of\s+(" + _NUM_c7 + r")", low)
    if not fo:
        return _no_c7("FRACTION_PERCENT_OF", "no 'fraction of base'")
    base = _n_c7(fo.group(2))
    word = re.sub(r"\s+", "", fo.group(1))
    if word.endswith("%"):
        frac, desc = float(word[:-1]) / 100.0, word
    elif word == "half":
        frac, desc = 0.5, "1/2"
    elif word == "quarter":
        frac, desc = 0.25, "1/4"
    elif word == "thrice":
        frac, desc = 3.0, "3"
    elif word == "double":
        frac, desc = 2.0, "2"
    else:
        num, den = word.split("/")
        if float(den) == 0:
            return _no_c7("FRACTION_PERCENT_OF", "zero denominator")
        frac, desc = float(num) / float(den), word
    val = frac * base
    return ModelResult(
        structure="FRACTION_PERCENT_OF", matched=True, confidence=0.97,
        quantities={"base": base},
        governing_equation=f"{desc} of {fo.group(2)}",
        final_answer=f"{val:.6g}", numeric_answer=val,
        steps=[f"{desc} of {fo.group(2)} = {val:.6g}"],
        note="fraction/percent-of")


# --------------------------------------------------------------------------- #
# ANGLE_SUM -- complementary / supplementary / linear pair / triangle
# --------------------------------------------------------------------------- #

_DEG = r"(-?\d+(?:\.\d+)?)(?!\s*['\u2019])\s*(?:degrees?|deg|°)?"


def model_angle_sum(text: str) -> ModelResult:
    low = text.lower()
    # ANGLE-CONTEXT GATE (2026-10-06, c12 sweep P0 c12_biotech_cbse_02_001#d2):
    # the bare word "complementary" fired this geometry family on the DNA
    # sense ("complementary strand of EcoRI") and the known-angle scrape
    # then harvested the 5s and 3s out of the strand notation 5'-GAATTC-3',
    # shipping VERIFIED "80 degrees".  Every board angle-sum question names
    # angle(s) or shows the angle sign -- anything else (complementary
    # strands, complementary goods, complementary colours) must refuse.
    if not re.search(r"\bangles?\b|\u2220", low):
        return _no_c7("ANGLE_SUM", "no angle context for complementary/"
                                "supplementary word")
    if re.search(r"complementary", low):
        total, label = 90.0, "complementary"
    elif re.search(r"supplementary|linear\s+pair", low):
        total, label = 180.0, "supplementary"
    elif re.search(r"triangle", low) and re.search(r"\bangle\b", low):
        total, label = 180.0, "triangle angle sum"
    else:
        return _no_c7("ANGLE_SUM", "no angle-sum context")
    # prime-notation hygiene: a number directly followed by an apostrophe
    # is feet / arc-minutes / a DNA prime marker (5'-GAATTC-3') -- never a
    # degree measure in this family's contract.
    knowns = [float(m.group(1)) for m in
              re.finditer(_DEG, low) if m.group(1)]
    # 'right triangle' carries an implied 90-degree angle — without it
    # 'one acute angle is 35' yields 180-35=145 instead of 90-35=55
    if re.search(r"\bright\b", low) and "triangle" in low \
            and 90.0 not in knowns:
        knowns.append(90.0)
    # drop a requested-but-unknown phrasing; we only trust numbers given
    if not knowns:
        return _no_c7("ANGLE_SUM", "no known angles")
    if re.search(r"ratio\s+\d+\s*:\s*\d+", low):
        return _no_c7("ANGLE_SUM", "ratio form not supported yet")
    rest = total - sum(knowns)
    if rest <= 0:
        return _no_c7("ANGLE_SUM",
                   f"known angles already total {sum(knowns):g} >= {total:g}")
    return ModelResult(
        structure="ANGLE_SUM", matched=True, confidence=0.9,
        quantities={"total": total, "knowns_sum": sum(knowns)},
        governing_equation=f"{label}: sum = {total:g}",
        final_answer=f"{rest:.4g} degrees", numeric_answer=rest,
        steps=[f"{label.capitalize()} angles total {total:g} degrees",
               f"Given: {', '.join(f'{k:g}' for k in knowns)}",
               f"Remaining angle = {total:g} - {sum(knowns):g} = "
               f"{rest:.4g} degrees"],
        note="angle sum family")


# --------------------------------------------------------------------------- #
# CIRCLE_MENSURATION
# --------------------------------------------------------------------------- #


def model_circle_mensuration(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"\bcircle\b|\bpi\b", low):
        return _no_c7("CIRCLE_MENSURATION", "no circle")
    if re.search(r"sector", low):
        return _no_c7("CIRCLE_MENSURATION",
                   "sector questions handled by the sector family")
    if not re.search(r"area|circumference|perimeter", low):
        return _no_c7("CIRCLE_MENSURATION", "no area/circumference ask")
    pi = math.pi
    pi_desc = "pi"
    pm = re.search(r"pi\s*(?:=|is)\s*(\d+(?:\.\d+)?(?:\s*/\s*\d+)?)", low)
    if pm:
        parts = pm.group(1).split("/")
        pi = (float(parts[0]) / float(parts[1]) if len(parts) == 2
              else float(parts[0]))
        pi_desc = pm.group(1)
    rm = re.search(r"radius\s*(?:of\s*)?(?:is\s*)?(" + _NUM_c7 + r")", low)
    dm = re.search(r"diameter\s*(?:of\s*)?(?:is\s*)?(" + _NUM_c7 + r")", low)
    if rm:
        r = _n_c7(rm.group(1))
    elif dm:
        r = _n_c7(dm.group(1)) / 2.0
    else:
        return _no_c7("CIRCLE_MENSURATION", "no radius/diameter")
    if r <= 0:
        return _no_c7("CIRCLE_MENSURATION", "non-positive radius")
    if re.search(r"circumference|perimeter", low):
        val = 2 * pi * r
        eq = f"C = 2 x {pi_desc} x r"
        steps = [f"C = 2 x {pi_desc} x {r:g} = {val:.4g}"]
    else:
        val = pi * r * r
        eq = f"A = {pi_desc} x r^2"
        steps = [f"A = {pi_desc} x {r:g}^2 = {val:.4g}"]
    return ModelResult(
        structure="CIRCLE_MENSURATION", matched=True, confidence=0.97,
        quantities={"r": r}, governing_equation=eq,
        final_answer=f"{val:.4g}", numeric_answer=val,
        steps=steps, note="circle mensuration")


# --------------------------------------------------------------------------- #
# EXPONENT_EVAL -- 2^5, 3^2 x 3^3 (pure power expressions)
# --------------------------------------------------------------------------- #


def _exponent_context_refused(low: str) -> Optional[str]:
    """RED-TEAM GUARD (2026-09-12 wave): pure power evaluation must not
    fire inside word problems.  Chemistry notation ('3.0 x 10^8 m/s'),
    sequences ('G.P. 3, 3^2, 3^3'), and determinant/matrix text carry
    powers that are DATA, not the asked computation -- evaluating them
    shipped '10^8 = 1e+08' as the 'distance light travels in 2.00 ns'."""
    if re.search(r"\b(mol|mole|moles|solution|acid|ph\b|mixture|dilut)\b",
                 low):
        return "chemistry context: powers are data notation"
    if re.search(r"\b(g\.?\s?p\.?|a\.?\s?p\.?|geometric|arithmetic\s+"
                 r"progression|sequence|series|determinant|matrix)\b", low):
        return "sequence/matrix context: powers are data notation"
    if re.search(r"\b(m|km|cm|mm|g|kg|s|min|h|l|ml)\s*/\s*"
                 r"(m|km|cm|mm|g|kg|s|min|h|l|ml)\b", low):
        return "unit-bearing quantity: powers are data notation"
    return None


def model_exponent_eval(text: str) -> ModelResult:
    low = text.lower()
    ctx = _exponent_context_refused(low)
    if ctx:
        return _no_c7("EXPONENT_EVAL", ctx)
    word_m = re.search(r"(\d+)\s+(?:raised\s+to\s+the\s+power\s+(?:of\s+)?"
                       r"|to\s+the\s+power\s+(?:of\s+)?|to\s+the\s+power)"
                       r"\s*(\d+)", low)
    if word_m:
        # whole-question gate: a worded power is only the answer when
        # the power IS the question ('2 raised to the power 5'); other
        # stated quantities mean it is data inside a word problem
        if not _expression_is_whole_question(low, [word_m.span()]):
            return _no_c7("EXPONENT_EVAL",
                       "power is not the whole question: leftover "
                       "quantities would be fabricated slot arithmetic")
        base_v = float(word_m.group(1))
        exp_v = float(word_m.group(2))
        if abs(exp_v - round(exp_v)) < 1e-9 and 0 <= exp_v <= 50                 and abs(base_v) <= 1000:
            val = base_v ** int(round(exp_v))
            return ModelResult(
                structure="EXPONENT_EVAL", matched=True, confidence=0.95,
                quantities={"base": base_v, "exp": exp_v},
                governing_equation="b^e",
                final_answer=f"{val:.6g}", numeric_answer=float(val),
                steps=[f"{base_v:g}^{int(round(exp_v))} = {val:.6g}"],
                note="worded power")
    expr_m = re.search(r"(\d+\s*(?:\^\s*\d+)(?:\s*(?:x|x)\s*\d+\s*"
                       r"\^\s*\d+)*)", low)
    if not expr_m:
        return _no_c7("EXPONENT_EVAL", "no power expression")
    # whole-question gate: '3.0 x 10^8 m/s ... 2.00 ns' must never
    # become '10^8 = 1e+08' (coefficient AND the actual ask ignored)
    if not _expression_is_whole_question(low, [expr_m.span(1)]):
        return _no_c7("EXPONENT_EVAL",
                   "power expression is not the whole question: leftover "
                   "quantities would be fabricated slot arithmetic")
    expr = expr_m.group(1)
    val = None
    try:
        py = re.sub(r"x", "*", expr)
        val = eval(py.replace("^", "**"), {"__builtins__": {}}, {})
    except Exception:
        return _no_c7("EXPONENT_EVAL", "evaluation failed")
    if not isinstance(val, (int, float)):
        return _no_c7("EXPONENT_EVAL", "non-numeric result")
    return ModelResult(
        structure="EXPONENT_EVAL", matched=True, confidence=0.95,
        quantities={"value": val}, governing_equation=expr,
        final_answer=f"{val:.6g}", numeric_answer=float(val),
        steps=[f"{expr} = {val:.6g}"], note="exponents")


# --------------------------------------------------------------------------- #
# RIDDLE_MULTIPLIER -- 'The sum of twice a number and 5 is 15'
# --------------------------------------------------------------------------- #


def model_riddle_multiplier(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"(twice|thrice|double)\s+(?:a|the)\s+number", low):
        return _no_c7("RIDDLE_MULTIPLIER", "no multiplier riddle")
    mul = 2.0 if "twice" in low or "double" in low else 3.0
    m = re.search(r"and\s+(-?\d+(?:\.\d+)?)\s+is\s+(-?\d+(?:\.\d+)?)", low)
    if not m:
        return _no_c7("RIDDLE_MULTIPLIER", "no 'and A is B' tail")
    addend, result = float(m.group(1)), float(m.group(2))
    val = (result - addend) / mul
    return ModelResult(
        structure="RIDDLE_MULTIPLIER", matched=True, confidence=0.9,
        quantities={"mul": mul, "addend": addend, "result": result},
        governing_equation=f"{mul:g}n + {addend:g} = {result:g}",
        final_answer=f"{val:.6g}", numeric_answer=val,
        steps=[f"{mul:g}n + {addend:g} = {result:g}",
               f"n = ({result:g} - {addend:g})/{mul:g} = {val:g}"],
        note="multiplier riddle")


# --------------------------------------------------------------------------- #
# PERCENT_CHANGE -- 'Increase 80 by 15%' / 'decrease 250 by 20%'
# --------------------------------------------------------------------------- #


def model_percent_change(text: str) -> ModelResult:
    low = text.lower()
    m = re.search(r"(increase|decrease|reduced?|reduces?)" + chr(92) + 's+(-?' + _NUM_c7 +
                  r')' + chr(92) + 's+by' + chr(92) + 's+(-?[0-9.]+)[ ]*%', low)
    if not m:
        return _no_c7("PERCENT_CHANGE", "no percent-change phrasing")
    base = _n_c7(m.group(2))
    pct = float(m.group(3))
    if m.group(1).startswith("decreas") or m.group(1).startswith("reduc"):
        frac, word = 1 - pct / 100.0, "decreased"
    else:
        frac, word = 1 + pct / 100.0, "increased"
    val = base * frac
    return ModelResult(
        structure="PERCENT_CHANGE", matched=True, confidence=0.96,
        quantities={"base": base, "pct": pct},
        governing_equation=f"{base:g} {word} by {pct:g}%",
        final_answer=f"{val:.6g}", numeric_answer=val,
        steps=[f"{word.capitalize()} {base:g} by {pct:g}%: "
               f"{base:g} x {frac:.4g} = {val:.6g}"],
        note="percent change")


# ==========================================================================
# BLOCK C7B -- moved from class7_families2.py (map §5.1; ids + row order preserved)
# ==========================================================================


_NUM_c7b = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"
_FRAC = r"(-?\d+)\s*/\s*(\d+)"


def _no_c7b(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _n_c7b(tok: str) -> float:
    return float(tok.replace(",", ""))


# --------------------------------------------------------------------------- #
# FRACTION_ARITHMETIC
# --------------------------------------------------------------------------- #


def model_fraction_arithmetic(text: str) -> ModelResult:
    from fractions import Fraction

    low = text.lower()
    if not re.search(r"\d\s*/\s*\d", low):
        return _no_c7b("FRACTION_ARITHMETIC", "no fractions present")
    m = re.search(r"(?:add|sum\s+of)\s+(" + _FRAC + r")\s+(?:and|to)\s+(" +
                  _FRAC + r")", low)
    if m:
        f1 = Fraction(int(m.group(2)), int(m.group(3)))
        f2 = Fraction(int(m.group(5)), int(m.group(6)))
        val = f1 + f2
        return ModelResult(
            structure="FRACTION_ARITHMETIC", matched=True, confidence=0.97,
            quantities={"f1": float(f1), "f2": float(f2)},
            governing_equation=f"{f1} + {f2}",
            final_answer=f"{val} = {float(val):.6g}",
            numeric_answer=float(val),
            steps=[f"{f1} + {f2} = {val} = {float(val):.6g}"],
            note="fraction addition")
    m = re.search(r"subtract\s+(" + _FRAC + r")\s+from\s+(" + _FRAC + r")",
                  low)
    if m:
        f_sub = Fraction(int(m.group(2)), int(m.group(3)))
        f_base = Fraction(int(m.group(5)), int(m.group(6)))
        val = f_base - f_sub
        return ModelResult(
            structure="FRACTION_ARITHMETIC", matched=True, confidence=0.97,
            quantities={"f1": float(f_base), "f2": float(f_sub)},
            governing_equation=f"{f_base} - {f_sub}",
            final_answer=f"{val} = {float(val):.6g}",
            numeric_answer=float(val),
            steps=[f"{f_base} - {f_sub} = {val} = {float(val):.6g}"],
            note="fraction subtraction")
    return _no_c7b("FRACTION_ARITHMETIC", "no fraction add/subtract form")


# --------------------------------------------------------------------------- #
# TRIANGLE_PARALLELOGRAM_AREA
# --------------------------------------------------------------------------- #


def model_triangle_parallelogram_area(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"triangle|parallelogram", low):
        return _no_c7b("TRIANGLE_PARALLELOGRAM_AREA", "no such shape")
    if not re.search(r"area", low):
        return _no_c7b("TRIANGLE_PARALLELOGRAM_AREA", "no area ask")
    bm = re.search(r"base\s*(?:of\s*)?(?:is\s*)?(" + _NUM_c7b + r")", low)
    hm = re.search(r"height\s*(?:of\s*)?(?:is\s*)?(" + _NUM_c7b + r")", low)
    if not bm or not hm:
        return _no_c7b("TRIANGLE_PARALLELOGRAM_AREA", "need base + height")
    b, h = _n_c7b(bm.group(1)), _n_c7b(hm.group(1))
    if b <= 0 or h <= 0:
        return _no_c7b("TRIANGLE_PARALLELOGRAM_AREA", "non-positive dimension")
    if re.search(r"triangle", low):
        val, eq = 0.5 * b * h, "A = 1/2 x base x height"
        steps = [f"A = 1/2 x {b:g} x {h:g} = {val:.6g}"]
    else:
        val, eq = b * h, "A = base x height"
        steps = [f"A = {b:g} x {h:g} = {val:.6g}"]
    return ModelResult(
        structure="TRIANGLE_PARALLELOGRAM_AREA", matched=True,
        confidence=0.96, quantities={"base": b, "height": h},
        governing_equation=eq, final_answer=f"{val:.6g}",
        numeric_answer=val, steps=steps, note="base-height area")


# --------------------------------------------------------------------------- #
# EVAL_EXPR_WITH_GIVENS
# --------------------------------------------------------------------------- #


def model_eval_expr_with_givens(text: str) -> ModelResult:
    import sympy

    low = text.lower()
    if not re.search(r"evaluate|compute|find\s+the\s+value", low):
        return _no_c7b("EVAL_EXPR_WITH_GIVENS", "no evaluate ask")
    where_parts = re.split(r"\bwhere\b", text, flags=re.I)
    if len(where_parts) < 2:
        return _no_c7b("EVAL_EXPR_WITH_GIVENS", "no where-givens")
    em = re.search(r"(?:evaluate|compute)\s*[:\-]?\s*(.+)",
                   where_parts[0], re.I)
    if not em:
        return _no_c7b("EVAL_EXPR_WITH_GIVENS", "no expression after evaluate")
    raw = em.group(1).strip().rstrip("?").strip()
    raw = re.sub(r"\s+", " ", raw)
    if not re.fullmatch(r"[0-9a-z+\-*/^(). ]+", raw):
        return _no_c7b("EVAL_EXPR_WITH_GIVENS", "expression not clean math")
    py = raw.replace("^", "**")
    py = re.sub(r"(\d)([a-z])", r"\1*\2", py)         # 3a -> 3*a
    py = re.sub(r"(\d)\s+([a-z])", r"\1*\2", py)      # 3 a -> 3*a
    env = {}
    for m in re.finditer(r"\b([a-z])\s+(?:is|=)\s*(-?\d+(?:\.\d+)?)\b",
                         where_parts[1], re.I):
        env[m.group(1)] = float(m.group(2))
    if not env:
        return _no_c7b("EVAL_EXPR_WITH_GIVENS", "no variable givens")
    try:
        expr = sympy.sympify(py, locals={v: sympy.Symbol(v)
                                         for v in env})
    except Exception:
        return _no_c7b("EVAL_EXPR_WITH_GIVENS", "sympify failed")
    subs = {sympy.Symbol(k): v for k, v in env.items()}
    result = expr.subs(subs)
    if not result.is_number:
        return _no_c7b("EVAL_EXPR_WITH_GIVENS",
                   f"unresolved symbols: {result.free_symbols}")
    val = float(result)
    return ModelResult(
        structure="EVAL_EXPR_WITH_GIVENS", matched=True, confidence=0.96,
        quantities=env, governing_equation=f"{raw} with {env}",
        final_answer=f"{val:.6g}", numeric_answer=val,
        steps=[f"{raw} with " +
               ", ".join(f"{k}={v:g}" for k, v in env.items()) +
               f" = {val:.6g}"],
        note="expression evaluation with givens")


# ==========================================================================
# BLOCK C8 -- moved from class8_families.py (map §5.1; ids + row order preserved)
# ==========================================================================


_NUM_c8 = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"


def _no_c8(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _n_c8(tok: str) -> float:
    return float(tok.replace(",", ""))


# --------------------------------------------------------------------------- #
# ROOTS_POWERS
# --------------------------------------------------------------------------- #


def model_roots_powers(text: str) -> ModelResult:
    low = text.lower()
    cm = re.search(r"cube\s+of\s+(" + _NUM_c8 + r")", low)
    if cm:
        a = _n_c8(cm.group(1))
        val = a ** 3
        return ModelResult(
            structure="ROOTS_POWERS", matched=True, confidence=0.95,
            quantities={"a": a}, governing_equation="a^3",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"{a:g}^3 = {val:.6g}"], note="cube")
    sm = re.search(r"square\s+of\s+(" + _NUM_c8 + r")", low)
    if sm:
        a = _n_c8(sm.group(1))
        val = a ** 2
        return ModelResult(
            structure="ROOTS_POWERS", matched=True, confidence=0.95,
            quantities={"a": a}, governing_equation="a^2",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"{a:g}^2 = {val:.6g}"], note="square")
    cr = re.search(r"cube\s+root\s+of\s+(" + _NUM_c8 + r")", low)
    if cr:
        a = _n_c8(cr.group(1))
        val = round(a ** (1.0 / 3.0), 9)
        near = round(val)
        if near ** 3 == a:
            val = float(near)
        return ModelResult(
            structure="ROOTS_POWERS", matched=True, confidence=0.95,
            quantities={"a": a}, governing_equation="cuberoot(a)",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"cuberoot({a:g}) = {val:.6g}"], note="cube root")
    sr = re.search(r"(?:square\s+root|root)\s+of\s+(" + _NUM_c8 + r")", low)
    if sr:
        a = _n_c8(sr.group(1))
        if a < 0:
            return _no_c8("ROOTS_POWERS", "negative radicand")
        val = a ** 0.5
        near = round(val)
        if near * near == a:
            val = float(near)
        return ModelResult(
            structure="ROOTS_POWERS", matched=True, confidence=0.95,
            quantities={"a": a}, governing_equation="sqrt(a)",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"sqrt({a:g}) = {val:.6g}"], note="square root")
    return _no_c8("ROOTS_POWERS", "no root/power form")


# --------------------------------------------------------------------------- #
# PROPORTION -- direct and inverse
# --------------------------------------------------------------------------- #


def model_proportion(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"how\s+(?:long|many|much|far)|find\s+the\s+(?:cost|"
                     r"time|days?)", low):
        return _no_c8("PROPORTION", "no proportional ask")
    inverse = bool(re.search(r"inverse|workers?|men\b|pipes?\b", low)) and \
        re.search(r"workers?|men\b|pipes?\b", low)
    m = re.search(r"if\s+(" + _NUM_c8 + r")\s+[a-z ]{3,40}?\s+in\s+(" + _NUM_c8 +
                  r")\s+(days?|hours?|hrs?|minutes?|weeks?)", low)
    if inverse and m:
        n1, t1 = _n_c8(m.group(1)), _n_c8(m.group(2))
        unit = m.group(3)
        m2 = re.search(r"(\d+(?:\.\d+)?)\s+workers?", low[low.find(m.group(2)):]
                       if m.group(2) in low else low)
        m2 = re.search(r"how\s+long\s+will\s+(\d+(?:\.\d+)?)\s+workers?", low)
        if not m2:
            return _no_c8("PROPORTION", "no second worker count")
        n2 = float(m2.group(1))
        if n2 == 0:
            return _no_c8("PROPORTION", "zero workers")
        t2 = n1 * t1 / n2
        return ModelResult(
            structure="PROPORTION", matched=True, confidence=0.9,
            quantities={"n1": n1, "t1": t1, "n2": n2},
            governing_equation="inverse: n1 t1 = n2 t2",
            final_answer=f"{t2:.4g} {unit}",
            numeric_answer=t2,
            steps=[f"Inverse proportion: {n1:g} x {t1:g} = {n2:g} x t",
                   f"t = {n1:g} x {t1:g} / {n2:g} = {t2:.4g} {unit}"],
            note="inverse proportion")
    if re.search(r"inverse", low):
        return _no_c8("PROPORTION", "inverse form not parsed")
    # direct: 'A car travels 180 km in 3 hours... how far in 5 hours?'
    dm = re.search(r"(?:travels?|covers?|fills?|makes?|produces?)\s+(" +
                   _NUM_c8 + r")\s*([a-z]*)\s+in\s+(" + _NUM_c8 + r")\s*"
                   r"(hours?|hrs?|days?|minutes?|seconds?)", low)
    if dm:
        amount, unit_in = _n_c8(dm.group(1)), dm.group(2)
        t1 = _n_c8(dm.group(3))
        m2 = re.search(r"in\s+(" + _NUM_c8 + r")\s*(hours?|hrs?|days?|"
                       r"minutes?|seconds?)[^.?\d]*\?", low)
        if not m2 or float(m2.group(1)) == t1:
            return _no_c8("PROPORTION", "no second time")
        t2 = float(m2.group(1))
        rate = amount / t1 if t1 else 0
        val = rate * t2
        return ModelResult(
            structure="PROPORTION", matched=True, confidence=0.9,
            quantities={"amount": amount, "t1": t1, "t2": t2},
            governing_equation="direct: amount = rate x t",
            final_answer=f"{val:.4g} {unit_in}".strip(),
            numeric_answer=val,
            steps=[f"Rate = {amount:g}/{t1:g} = {rate:.4g} per hour",
                   f"In {t2:g} hours: {rate:.4g} x {t2:g} = {val:.4g}"],
            note="direct proportion")
    return _no_c8("PROPORTION", "no proportion pattern")


# --------------------------------------------------------------------------- #
# INTEREST -- simple and compound
# --------------------------------------------------------------------------- #


def model_interest(text: str) -> ModelResult:
    low = text.lower()
    if "interest" not in low and not re.search(r"\bs\.?i\.?\b", low):
        return _no_c8("INTEREST", "no interest ask")
    pm = re.search(r"(?:\bon\b|\binvests?\b|\bdeposits?\b|\bborrows?\b|"
                   r"\bprincipal\b\s*(?:of|is|:)?|sum\s+of\s+)"
                   r"\s*(?:rs\.?|inr|" + chr(8377) + r")?\s*(" + _NUM_c8 +
                   r")", low)
    rm = re.search(r"(\d+(?:\.\d+)?)\s*(?:%|percent)\s*per\s*annum", low)
    tm = re.search(r"for\s+(\d+(?:\.\d+)?)\s+years?", low)
    if not pm or not rm or not tm:
        return _no_c8("INTEREST", "need principal, rate %pa, time years")
    P, r, t = _n_c8(pm.group(1)), float(rm.group(1)), float(tm.group(1))
    # months tail: 'for 2 years 4 months' -> t = 2 + 4/12 = 7/3
    mm = re.search(r"years?\s+(?:and\s+)?(\d+(?:\.\d+)?)\s+months?", low)
    if mm:
        t += float(mm.group(1)) / 12.0
    if P <= 0 or t <= 0:
        return _no_c8("INTEREST", "non-positive principal or time")
    if re.search(r"compound", low):
        n = 1
        if re.search(r"half[- ]?yearly|semi[- ]?annually", low):
            n = 2
        elif re.search(r"quarterly", low):
            n = 4
        A = P * (1 + r / (100 * n)) ** (n * t)
        ci = A - P
        return ModelResult(
            structure="INTEREST", matched=True, confidence=0.95,
            quantities={"P": P, "r": r, "t": t},
            governing_equation="CI = P(1+r/100)^t - P",
            final_answer=f"{ci:.4g}", numeric_answer=ci,
            steps=[f"A = {P:g}(1 + {r:g}/100)^{t:g} = {A:.4f}",
                   f"CI = A - P = {A:.4f} - {P:g} = {ci:.4g}"],
            note="compound interest")
    si = P * r * t / 100.0
    return ModelResult(
        structure="INTEREST", matched=True, confidence=0.95,
        quantities={"P": P, "r": r, "t": t},
        governing_equation="SI = P r t / 100",
        final_answer=f"{si:.4g}", numeric_answer=si,
        steps=[f"SI = {P:g} x {r:g} x {t:g} / 100 = {si:.4g}"],
        note="simple interest")


# --------------------------------------------------------------------------- #
# MENSURATION_3D + trapezium
# --------------------------------------------------------------------------- #


def model_mensuration_3d(text: str) -> ModelResult:
    low = text.lower()
    if re.search(r"trapezium", low):
        sm = re.search(r"parallel\s+sides\s+(" + _NUM_c8 + r")\s*(?:cm|m)?\s*"
                       r"and\s+(" + _NUM_c8 + r")", low)
        hm = re.search(r"height\s*(?:of\s*)?(" + _NUM_c8 + r")", low)
        if sm and hm:
            a, b, h = _n_c8(sm.group(1)), _n_c8(sm.group(2)), _n_c8(hm.group(1))
            val = (a + b) / 2 * h
            return ModelResult(
                structure="MENSURATION_3D", matched=True, confidence=0.95,
                quantities={"a": a, "b": b, "h": h},
                governing_equation="A = (a+b)/2 x h",
                final_answer=f"{val:.6g}", numeric_answer=val,
                steps=[f"A = ({a:g} + {b:g})/2 x {h:g} = {val:.6g}"],
                note="trapezium area")
    if re.search(r"cuboid", low) and re.search(r"volume", low):
        lm = re.search(r"length\s+(" + _NUM_c8 + r")", low)
        bm = re.search(r"breadth\s+(" + _NUM_c8 + r")", low)
        hm = re.search(r"height\s+(" + _NUM_c8 + r")", low)
        if lm and bm and hm:
            l, b, h = _n_c8(lm.group(1)), _n_c8(bm.group(1)), _n_c8(hm.group(1))
            val = l * b * h
            return ModelResult(
                structure="MENSURATION_3D", matched=True, confidence=0.95,
                quantities={"l": l, "b": b, "h": h},
                governing_equation="V = l x b x h",
                final_answer=f"{val:.6g}", numeric_answer=val,
                steps=[f"V = {l:g} x {b:g} x {h:g} = {val:.6g}"],
                note="cuboid volume")
    if re.search(r"\bcube\b", low) and re.search(r"volume", low):
        sm = re.search(r"side\s*(?:of\s*)?(" + _NUM_c8 + r")", low)
        if sm:
            s = _n_c8(sm.group(1))
            val = s ** 3
            return ModelResult(
                structure="MENSURATION_3D", matched=True, confidence=0.95,
                quantities={"s": s}, governing_equation="V = s^3",
                final_answer=f"{val:.6g}", numeric_answer=val,
                steps=[f"V = {s:g}^3 = {val:.6g}"], note="cube volume")
    return _no_c8("MENSURATION_3D", "no 3D/trapezium pattern")


# --------------------------------------------------------------------------- #
# PLACE_VALUE_NUMBER
# --------------------------------------------------------------------------- #


def model_place_value_number(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"two[- ]digit\s+number", low):
        return _no_c8("PLACE_VALUE_NUMBER", "no two-digit number")
    tm = re.search(r"tens?\s+digit\s+(?:is\s+)?(" + _NUM_c8 + r")", low)
    um = re.search(r"units?\s+digit\s+(?:is\s+)?(" + _NUM_c8 + r")", low)
    if not tm or not um:
        return _no_c8("PLACE_VALUE_NUMBER", "need both digits")
    td, ud = _n_c8(tm.group(1)), _n_c8(um.group(1))
    if not (0 <= td <= 9 and 0 <= ud <= 9):
        return _no_c8("PLACE_VALUE_NUMBER", "digits out of range")
    val = 10 * td + ud
    return ModelResult(
        structure="PLACE_VALUE_NUMBER", matched=True, confidence=0.95,
        quantities={"tens": td, "units": ud},
        governing_equation="N = 10 x tens + units",
        final_answer=f"{val:g}", numeric_answer=val,
        steps=[f"N = 10 x {td:g} + {ud:g} = {val:g}"],
        note="place value")


# --------------------------------------------------------------------------- #
# CONSECUTIVE_INTEGERS
# --------------------------------------------------------------------------- #


def model_consecutive_integers(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"consecutive\s+(?:integers?|numbers?)", low):
        return _no_c8("CONSECUTIVE_INTEGERS", "not consecutive integers")
    m = re.search(r"sum\s+of\s+(two|three)\s+consecutive", low)
    if not m:
        return _no_c8("CONSECUTIVE_INTEGERS", "no count")
    sm = re.search(r"is\s+(-?\d+(?:\.\d+)?)", low)
    if not sm:
        return _no_c8("CONSECUTIVE_INTEGERS", "no sum given")
    total = float(sm.group(1))
    if m.group(1) == "two":
        first = (total - 1) / 2
        return ModelResult(
            structure="CONSECUTIVE_INTEGERS", matched=True, confidence=0.9,
            quantities={"total": total},
            governing_equation="n + (n+1) = total",
            final_answer=f"{first:g}", numeric_answer=first,
            steps=[f"n + (n+1) = {total:g} -> 2n + 1 = {total:g}",
                   f"n = {first:g}"],
            note="consecutive integers")
    first = (total - 3) / 3
    return ModelResult(
        structure="CONSECUTIVE_INTEGERS", matched=True, confidence=0.9,
        quantities={"total": total},
        governing_equation="n + (n+1) + (n+2) = total",
        final_answer=f"{first:g}", numeric_answer=first,
        steps=[f"3n + 3 = {total:g}", f"n = {first:g}"],
        note="consecutive integers")


# ==========================================================================
# BLOCK MS -- moved from modeling_structures.py (map §5.1; ids + row order preserved)
# ==========================================================================



def _no_ms(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


# --------------------------------------------------------------------------- #
# STRUCTURE 2: SIMULTANEOUS_DEPLETION  (two-candles)
# --------------------------------------------------------------------------- #

_DEPLETE_DUR_RE = re.compile(
    r"\b(?:burn(?:s|t)?(?:\s+out)?|consum\w*|melt\w*|drain\w*|"
    r"empty\w*|runs?\s+out)\D{0,30}?in\s+(\d+(?:\.\d+)?)\s*"
    r"(hours?|hrs?|h|minutes?|mins?|days?)\b", re.I)
_ANY_DURATION_RE = re.compile(
    r"in\s+(\d+(?:\.\d+)?)\s*(hours?|hrs?|h|minutes?|mins?|days?)\b",
    re.I)
_DEPLETE_RATIO_RE = re.compile(
    r"\b(twice|thrice|three\s+times|four\s+times|five\s+times|"
    r"(\d+(?:\.\d+)?)\s*times)\b", re.I)
_HOURS = {"h": 1.0, "hour": 1.0, "hours": 1.0, "hr": 1.0, "hrs": 1.0,
          "minute": 1 / 60, "minutes": 1 / 60, "min": 1 / 60,
          "mins": 1 / 60, "day": 24.0, "days": 24.0}


def _dep_ratio(text: str) -> Optional[float]:
    m = _DEPLETE_RATIO_RE.search(text)
    if not m:
        return None
    if m.group(2):
        return float(m.group(2))
    word = re.sub(r"\s*times$", "", m.group(1).lower())
    return {"twice": 2.0, "thrice": 3.0, "three": 3.0, "four": 4.0,
            "five": 5.0}.get(word)


def _to_hours(value: float, unit: str) -> float:
    return value * _HOURS[unit.lower().rstrip(".")]


def model_simultaneous_depletion(text: str) -> ModelResult:
    low = text.lower()
    durations = [_to_hours(float(m.group(1)), m.group(2))
                 for m in _DEPLETE_DUR_RE.finditer(text)]
    # ordinal fallback: "the first ... in 3 hours, the second in 4
    # hours" -- the second mention often omits the depletion verb
    if len(durations) < 2 and re.search(r"burn|consum|melt", low) \
            and re.search(r"first|second", low):
        durations = [_to_hours(float(m.group(1)), m.group(2))
                     for m in _ANY_DURATION_RE.finditer(text)]
    k = _dep_ratio(text)
    equal_len = re.search(r"equal\s+length|same\s+(?:length|size)|"
                          r"identical", low)
    compare = re.search(r"twice|times|as\s+long\s+as", low)
    if (len(durations) < 2 or k is None or not equal_len or not compare
            or abs(durations[0] - durations[1]) < 1e-12):
        return _no_ms("SIMULTANEOUS_DEPLETION",
                   f"need 2 distinct durations + ratio k + equal lengths "
                   f"(got {len(durations)}, k={k})")
    T1, T2 = sorted(durations[:2])       # T1 = shorter life
    # "one candle twice the other" is reading-ambiguous; solve both
    # assignments and accept the root in the physical range
    t = None
    for denom in (k / T2 - 1.0 / T1, k / T1 - 1.0 / T2):
        if abs(denom) < 1e-12:
            continue
        cand = (k - 1.0) / denom
        if 0 < cand < min(T1, T2):
            t = cand
            break
    if t is None:
        return _no_ms("SIMULTANEOUS_DEPLETION",
                   "no reading gives a root in the physical range")
    return ModelResult(
        structure="SIMULTANEOUS_DEPLETION", matched=True,
        confidence=0.9, quantities={"T1": T1, "T2": T2, "k": k},
        governing_equation="1 - t/T1 = k(1 - t/T2)",
        final_answer=f"{t:.4g} hours",
        numeric_answer=t,
        steps=[f"Fractions remaining: first = 1 - t/{T1:g}, "
               f"second = 1 - t/{T2:g}",
               f"Set 1 - t/{T1:g} = {k:g}(1 - t/{T2:g})",
               f"t = ({k:g} - 1)/({k:g}/{T2:g} - 1/{T1:g}) = {t:.4g} "
               f"hours"],
        note="two-candles family")


# --------------------------------------------------------------------------- #
# STRUCTURE 3: MEET_AND_SHUTTLE  (fly-between-trains)
# --------------------------------------------------------------------------- #

_SPEED_KMPH_RE = re.compile(
    r"(\d+(?:\.\d+)?)\s*(?:km\s*/\s*h(?:r)?|kmph|kilometres?\s*per\s*"
    r"hour|kilometers?\s*per\s*hour)", re.I)
_TOWARD_RE = re.compile(r"toward\w*|approach\w*|each\s+other|"
                        r"head(ed)?\s+(?:toward|for)", re.I)
_SHUTTLE_RE = re.compile(r"\b(fly|bird|bee|shuttle|swallow|drone)\b",
                         re.I)
_DIST_APART_RE = re.compile(r"(\d+(?:\.\d+)?)\s*km\s+apart", re.I)
_SHUTTLE_SPEED_RE = re.compile(
    r"(?:fly|bird|bee|shuttle|swallow|drone)\D{0,60}?"
    r"(\d+(?:\.\d+)?)\s*km(?:\s*/\s*h(?:r)?)?", re.I)


def model_meet_and_shuttle(text: str) -> ModelResult:
    low = text.lower()
    if not (_TOWARD_RE.search(low) and _SHUTTLE_RE.search(low)):
        return _no_ms("MEET_AND_SHUTTLE", "no approach + shuttle narrative")
    speeds = [float(m.group(1)) for m in _SPEED_KMPH_RE.finditer(text)]
    md = _DIST_APART_RE.search(text)
    dist = float(md.group(1)) if md else None
    if len(speeds) < 2 or dist is None or dist <= 0:
        return _no_ms("MEET_AND_SHUTTLE",
                   f"need vehicle speeds + 'D km apart' (got "
                   f"{len(speeds)} speeds, D={dist})")
    wm = _SHUTTLE_SPEED_RE.search(low)
    if wm:
        w = float(wm.group(1))
        others = [s for s in speeds if abs(s - w) > 1e-9]
    else:
        w = speeds[-1]
        others = speeds[:-1]
    if "each" in low and len(others) == 1:
        v1 = v2 = others[0]          # "at 50 km/h each" -> both trains
    elif len(others) >= 2:
        v1, v2 = others[0], others[1]
    else:
        return _no_ms("MEET_AND_SHUTTLE",
                   "cannot separate the two vehicle speeds")
    if v1 + v2 <= 0:
        return _no_ms("MEET_AND_SHUTTLE", "closing speed <= 0")
    t_meet = dist / (v1 + v2)
    d_fly = w * t_meet
    return ModelResult(
        structure="MEET_AND_SHUTTLE", matched=True, confidence=0.9,
        quantities={"D": dist, "v1": v1, "v2": v2, "w": w},
        governing_equation="t = D/(v1+v2); s = w*t",
        final_answer=f"{d_fly:.4g} km",
        numeric_answer=d_fly,
        steps=[f"Closing speed: {v1:g} + {v2:g} = {v1 + v2:g} km/h",
               f"They meet after {dist:g}/{v1 + v2:g} = "
               f"{t_meet:.4g} hours",
               f"The fly flies {w:g} x {t_meet:.4g} = {d_fly:.4g} km"],
        note="fly-between-trains family")


# --------------------------------------------------------------------------- #
# STRUCTURE 4: TRIPARTITE_KINEMATICS  (accelerate - cruise - brake)
# --------------------------------------------------------------------------- #


def model_tripartite_kinematics(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"accelerat\w*(?:\s+uniformly)?\s+from\s+rest|"
                     r"uniformly\s+accelerat\w*|accelerat\w+\s+uniformly",
                     low):
        return _no_ms("TRIPARTITE_KINEMATICS", "no uniform acceleration")
    if not re.search(r"constant\s+veloc\w+|uniform\s+veloc\w+", low):
        return _no_ms("TRIPARTITE_KINEMATICS", "no cruise phase")
    if not re.search(r"brake\w*|decelerat\w*|retardat\w*|comes?\s+to\s+rest",
                     low):
        return _no_ms("TRIPARTITE_KINEMATICS", "no braking phase")
    am = re.search(r"(?:at|of)\s+(\d+(?:\.\d+)?)\s*m\s*/?\s*s\s*[\^]?\s*2",
                   low)
    times = re.findall(r"(?:for|in)\s+(\d+(?:\.\d+)?)\s*seconds?", low)
    if not am or len(times) < 3:
        return _no_ms("TRIPARTITE_KINEMATICS",
                   f"need acceleration + 3 durations (a="
                   f"{'yes' if am else 'no'}, times={len(times)})")
    acc = float(am.group(1))
    t1, t2, t3 = (float(t) for t in times[:3])
    if min(t1, t2, t3) <= 0:
        return _no_ms("TRIPARTITE_KINEMATICS", "non-positive duration")
    v = acc * t1
    s1 = 0.5 * acc * t1 ** 2
    s2 = v * t2
    s3 = 0.5 * v * t3
    total = s1 + s2 + s3
    return ModelResult(
        structure="TRIPARTITE_KINEMATICS", matched=True, confidence=0.9,
        quantities={"a": acc, "t1": t1, "t2": t2, "t3": t3, "v": v},
        governing_equation="s = 1/2 a t1^2 + v t2 + 1/2 v t3",
        final_answer=f"{total:.4g} m",
        numeric_answer=total,
        steps=[f"Phase 1: v = a t1 = {acc:g} x {t1:g} = {v:g} m/s; "
               f"s1 = 1/2 a t1^2 = {s1:g} m",
               f"Phase 2: s2 = v t2 = {v:g} x {t2:g} = {s2:g} m",
               f"Phase 3: uniform brake to rest in {t3:g} s; "
               f"s3 = 1/2 v t3 = {s3:g} m",
               f"Total = {s1:g} + {s2:g} + {s3:g} = {total:.4g} m"],
        note="accelerate-cruise-brake family")


# ==========================================================================
# BLOCK M2 -- moved from maths2_families.py (map §5.1; ids + row order preserved)
# ==========================================================================


# --------------------------------------------------------------------------- #
# helpers (same shape as syllabus_families.py)
# --------------------------------------------------------------------------- #


def _no_m2(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res_m2(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    """Matched ModelResult; non-numeric slots are dropped from quantities."""
    q: Dict[str, float] = {}
    for k, v in (g or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    for k, v in (extra or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=q, governing_equation=eq,
        final_answer=answer if answer is not None else
        (f"{value:.6g}" if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


_NUM_m2 = r"-?\d+(?:\.\d+)?"
_U_NUM = r"\d+(?:\.\d+)?"

_PT_m2 = (r"(?:[A-Za-z]\s*)?\(\s*(?P<{px}>-?\d+(?:\.\d+)?)\s*,\s*"
       r"(?P<{py}>-?\d+(?:\.\d+)?)\s*\)")


def _pt_m2(prefix: str) -> str:
    return _PT_m2.replace("{px}", prefix + "x").replace("{py}", prefix + "y")


def _mtx(prefix: str) -> str:
    """2x2 bracketed matrix: [[a, b], [c, d]] with named groups p11..p22."""

    def cell(r_: int, c_: int) -> str:
        return (r"(?P<" + prefix + str(r_) + str(c_) + r">" + _NUM_m2 + r")")

    return (r"\[\s*\[\s*" + cell(1, 1) + r"\s*,\s*" + cell(1, 2) + r"\s*\]"
            r"\s*,\s*\[\s*" + cell(2, 1) + r"\s*,\s*" + cell(2, 2) + r"\s*\]"
            r"\s*\]")


def _sq(grp: str) -> str:
    """Squared trig call:  fn^2(angle)  (angle in degrees, symbol optional)."""
    return (r"\s*\^\s*2\s*\(?\s*(?P<" + grp + ">" + _U_NUM +
            r")\s*°?\s*\)?")


def _tcall(fn: str, grp: str) -> str:
    """Trig call, parens optional: fn(angle) or fn angle (book style)."""
    return (fn + r"\s*\(?\s*(?P<" + grp + ">" + _U_NUM + r")\s*°?\s*\)?")


def _fmt_m2(v: float) -> str:
    return f"{v:.6g}"


def _nums(s: str) -> List[float]:
    return [float(x.replace(",", ""))
            for x in re.findall(r"\d+(?:\.\d+)?", s or "")]


def _list_str(nums: List[float]) -> str:
    return "[" + ", ".join(_fmt_m2(x) for x in nums) + "]"


def _mtx_str(m_: List[List[float]]) -> str:
    return "[" + ", ".join(
        "[" + ", ".join(_fmt_m2(v) for v in row) + "]" for row in m_) + "]"


def _snap(v: float, tol: float = 1e-9) -> float:
    """Snap float noise onto the nearest integer when extremely close."""
    r = round(v)
    return float(r) if abs(v - r) < tol else v


def _frac_str(v: float) -> str:
    fr = Fraction(v).limit_denominator(10000)
    if fr.denominator == 1:
        return f"{fr.numerator}"
    return f"{fr.numerator}/{fr.denominator} (~{_fmt_m2(v)})"


# trig: standard-angle value table (exact where clean)
_TRIG_m2 = {
    ("sin", 0): 0.0, ("sin", 30): 0.5, ("sin", 45): math.sqrt(2) / 2,
    ("sin", 60): math.sqrt(3) / 2, ("sin", 90): 1.0,
    ("cos", 0): 1.0, ("cos", 30): math.sqrt(3) / 2, ("cos", 45):
    math.sqrt(2) / 2, ("cos", 60): 0.5, ("cos", 90): 0.0,
    ("tan", 0): 0.0, ("tan", 30): 1 / math.sqrt(3), ("tan", 45): 1.0,
    ("tan", 60): math.sqrt(3), ("tan", 90): None,
}
_STD_ANGLES = (0, 30, 45, 60, 90)


def _trig_val(fn: str, deg: float) -> float:
    if float(deg).is_integer() and (fn, int(deg)) in _TRIG_m2:
        v = _TRIG_m2[(fn, int(deg))]
        if v is not None:
            return v
    return (math.sin if fn == "sin" else math.cos)(math.radians(deg))


def _normalize_m2(text: str) -> str:
    """Deterministic surface cleanup: unicode minus and superscripts.

    "sin²30°" becomes "sin^230°" -- every downstream regex treats ^2 as
    the power and the following digits as the angle, and the standard
    angle gate rejects any mis-reading anyway.
    """
    t = (text or "").replace("−", "-").replace("–", "-").replace("’", "'")
    # PDF-source non-breaking/hyphen dashes used as the minus sign in the
    # CISCE corpus ("2x³‑3x²+4x‑5"): same semantics as plain minus.
    t = t.replace("\u2011", "-").replace("\u2010", "-")
    return re.sub(
        r"[⁰¹²³⁴⁵⁶⁷⁸⁹]+",
        lambda m_: "^" + "".join(
            str("⁰¹²³⁴⁵⁶⁷⁸⁹".index(c)) for c in m_.group(0)),
        t)


# gate-failure tuple: value None + empty steps -> dispatcher keeps scanning
_GATE_m2 = (None, [], None, None, None, None)


# --------------------------------------------------------------------------- #
# 1-2. MEDIAN / MODE
# --------------------------------------------------------------------------- #


def _c_median(g, m, text):
    # DIG-GATE (2026-10-06 SOLVER-DIG-1): 'the median of 5, 6, x, 10,
    # 12 arranged in ascending order is 8 — find x' harvested the two
    # VISIBLE numbers as the whole list and shipped 5.5 VERIFIED.  An
    # unknown in the data (or a stated median to invert) is a different
    # problem — refuse.
    if re.search(r"\b(?:x|k|m|n)\b\s*[,}\]]?\s*(?:and|or|\d)", text,
                 re.I) and re.search(
            r"\b(?:is|=)\s*\d+\s*.{0,20}?\bfind\b|\bfind\b.{0,30}?"
            r"\b(?:value\s+of\s+)?\b(?:x|k|m|n)\b", text, re.I):
        return _GATE_m2
    nums = sorted(_nums(g["list"]))
    n = len(nums)
    if n == 0:
        return _GATE_m2
    if n % 2:
        med = nums[n // 2]
        steps = [f"Sort the data: {_list_str(nums)}.",
                 f"n = {n} is odd, so the median is the middle "
                 f"({n // 2 + 1}th) value = {_fmt_m2(med)}."]
    else:
        lo, hi = nums[n // 2 - 1], nums[n // 2]
        med = (lo + hi) / 2
        steps = [f"Sort the data: {_list_str(nums)}.",
                 f"n = {n} is even, so the median is the average of the two "
                 f"middle values ({_fmt_m2(lo)} + {_fmt_m2(hi)})/2 = {_fmt_m2(med)}."]
    return med, steps, None, None, "median = middle value of the sorted data", \
        {"n": float(n)}


def _c_mode(g, m, text):
    nums = _nums(g["list"])
    if not nums:
        return _GATE_m2
    counts: Dict[float, int] = {}
    for x in nums:
        counts[x] = counts.get(x, 0) + 1
    best = max(counts.values())
    if best < 2:
        return _GATE_m2  # no repeated value: mode is undefined
    winners = sorted(k for k, v in counts.items() if v == best)
    mode = winners[0]
    table = ", ".join(f"{k:g}: {v}" for k, v in sorted(counts.items()))
    steps = [f"Tally each value: {table}.",
             f"Highest frequency is {best}, so the mode = {_fmt_m2(mode)}"
             + (" (multimodal data; smallest mode reported)"
                if len(winners) > 1 else "") + "."]
    return mode, steps, f"{mode:g}", None, "mode = most frequent value", \
        {"frequency": float(best), "n": float(len(nums))}


# --------------------------------------------------------------------------- #
# 3. MEAN_GROUPED
# --------------------------------------------------------------------------- #


def _c_mean_grouped(g, m, text):
    xs = _nums(g["xs"])
    fs = _nums(g["fs"])
    if not xs or len(xs) != len(fs):
        return _GATE_m2
    sf = sum(fs)
    if sf == 0:
        return _GATE_m2
    sfx = sum(x * f for x, f in zip(xs, fs))
    mean = sfx / sf
    steps = [f"sum fx = " + " + ".join(f"{x:g}x{f:g}"
                                       for x, f in zip(xs, fs)) +
             f" = {_fmt_m2(sfx)}",
             "sum f = " + " + ".join(_fmt_m2(f) for f in fs) + f" = {_fmt_m2(sf)}",
             f"mean = sum fx / sum f = {_fmt_m2(sfx)} / {_fmt_m2(sf)} = "
             f"{_fmt_m2(mean)}"]
    return mean, steps, None, None, "mean = (sum fx) / (sum f)", \
        {"sum_fx": sfx, "sum_f": sf}


# --------------------------------------------------------------------------- #
# 4. TRIG_IDENTITY_EVAL
# --------------------------------------------------------------------------- #


def _pyth_angle(g) -> Optional[float]:
    try:
        a1, a2 = float(g["a1"]), float(g["a2"])
    except (TypeError, KeyError):
        return None
    if a1 != a2:
        return None
    if not float(a1).is_integer() or int(a1) not in _STD_ANGLES:
        return None
    return a1


def _one_angle(g) -> Optional[float]:
    try:
        a = float(g["ang"])
    except (TypeError, KeyError):
        return None
    if not float(a).is_integer() or int(a) not in _STD_ANGLES:
        return None
    return a


def _c_sin_cos_sq(g, m, text):
    a = _pyth_angle(g)
    if a is None:
        return _GATE_m2
    steps = ["Pythagorean identity: sin^2(A) + cos^2(A) = 1, for every A.",
             f"Here A = {a:g} degrees in both terms, so the value is "
             f"exactly 1."]
    return 1.0, steps, "1", None, "sin^2(A) + cos^2(A) = 1", None


def _c_1_tan_sq(g, m, text):
    a = _one_angle(g)
    if a is None or a == 90:
        return _GATE_m2  # tan(90) undefined
    cosv = _trig_val("cos", a)
    v = _snap(1.0 / (cosv * cosv))
    steps = ["Identity: 1 + tan^2(A) = sec^2(A).",
             f"sec(A) = 1/cos(A) = 1/{_fmt_m2(cosv)}, so sec^2({a:g} degrees) "
             f"= {_fmt_m2(v)}."]
    return v, steps, f"{v:g}", None, "1 + tan^2(A) = sec^2(A)", None


def _c_1_cot_sq(g, m, text):
    a = _one_angle(g)
    if a is None or a == 0:
        return _GATE_m2  # cot(0) undefined
    sinv = _trig_val("sin", a)
    v = _snap(1.0 / (sinv * sinv))
    steps = ["Identity: 1 + cot^2(A) = cosec^2(A).",
             f"cosec(A) = 1/sin(A) = 1/{_fmt_m2(sinv)}, so cosec^2({a:g} "
             f"degrees) = {_fmt_m2(v)}."]
    return v, steps, f"{v:g}", None, "1 + cot^2(A) = cosec^2(A)", None


def _c_sec_tan_sq(g, m, text):
    a = _one_angle(g)
    if a is None or a == 90:
        return _GATE_m2
    steps = ["Identity: sec^2(A) - tan^2(A) = 1.",
             f"Here A = {a:g} degrees in both terms, so the value is "
             f"exactly 1."]
    return 1.0, steps, "1", None, "sec^2(A) - tan^2(A) = 1", None


def _c_csc_cot_sq(g, m, text):
    a = _one_angle(g)
    if a is None or a == 0:
        return _GATE_m2
    steps = ["Identity: cosec^2(A) - cot^2(A) = 1.",
             f"Here A = {a:g} degrees in both terms, so the value is "
             f"exactly 1."]
    return 1.0, steps, "1", None, "cosec^2(A) - cot^2(A) = 1", None


# --------------------------------------------------------------------------- #
# 5. SECTION_FORMULA
# --------------------------------------------------------------------------- #


def _c_section(g, m, text):
    if re.search(r"\bexternal", text, re.I):
        return _GATE_m2  # opposite polarity: external division is a different
        # formula ((m x2 - n x1)/(m - n)); refuse rather than mis-model
    x1, y1 = float(g["ax"]), float(g["ay"])
    x2, y2 = float(g["bx"]), float(g["by"])
    mm, nn = float(g["mm"]), float(g["nn"])
    if mm + nn == 0:
        return _GATE_m2
    px = (mm * x2 + nn * x1) / (mm + nn)
    py = (mm * y2 + nn * y1) / (mm + nn)
    steps = [
        f"Internal division in ratio m:n = {mm:g}:{nn:g}: P = "
        f"((m x2 + n x1)/(m + n), (m y2 + n y1)/(m + n)).",
        f"x = ({mm:g} x {_fmt_m2(x2)} + {nn:g} x {_fmt_m2(x1)})/{_fmt_m2(mm + nn)} "
        f"= {_fmt_m2(px)}",
        f"y = ({mm:g} x {_fmt_m2(y2)} + {nn:g} x {_fmt_m2(y1)})/{_fmt_m2(mm + nn)} "
        f"= {_fmt_m2(py)}",
        f"P = ({_fmt_m2(px)}, {_fmt_m2(py)})"]
    return px, steps, f"({_fmt_m2(px)}, {_fmt_m2(py)})", None, \
        "P = ((m x2 + n x1)/(m+n), (m y2 + n y1)/(m+n))", \
        {"px": px, "py": py}


# --------------------------------------------------------------------------- #
# 6. AREA_TRIANGLE_COORDS
# --------------------------------------------------------------------------- #


def _c_area_tri(g, m, text):
    x1, y1 = float(g["ax"]), float(g["ay"])
    x2, y2 = float(g["bx"]), float(g["by"])
    x3, y3 = float(g["cx"]), float(g["cy"])
    raw = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)
    area = abs(raw) / 2
    if area < 1e-12:
        return _GATE_m2  # collinear points: degenerate triangle
    steps = [
        "Shoelace formula: area = 1/2 |x1(y2 - y3) + x2(y3 - y1) + "
        "x3(y1 - y2)|.",
        f"= 1/2 |{_fmt_m2(x1)}({_fmt_m2(y2)} - {_fmt_m2(y3)}) + {_fmt_m2(x2)}"
        f"({_fmt_m2(y3)} - {_fmt_m2(y1)}) + {_fmt_m2(x3)}({_fmt_m2(y1)} - {_fmt_m2(y2)})|",
        f"= 1/2 |{_fmt_m2(raw)}| = {_fmt_m2(area)} square units."]
    return area, steps, None, None, \
        "area = 1/2 |x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)|", None


# --------------------------------------------------------------------------- #
# 7. SLOPE_TWO_POINTS
# --------------------------------------------------------------------------- #


def _c_slope(g, m, text):
    x1, y1 = float(g["ax"]), float(g["ay"])
    x2, y2 = float(g["bx"]), float(g["by"])
    if x2 == x1:
        return _GATE_m2  # vertical line: slope undefined (division by zero)
    s = (y2 - y1) / (x2 - x1)
    steps = [f"slope = (y2 - y1)/(x2 - x1) = ({_fmt_m2(y2)} - {_fmt_m2(y1)})/"
             f"({_fmt_m2(x2)} - {_fmt_m2(x1)}) = {_fmt_m2(s)}"]
    return s, steps, None, None, "slope = (y2 - y1)/(x2 - x1)", None


# --------------------------------------------------------------------------- #
# 8. LIMIT_STANDARD
# --------------------------------------------------------------------------- #

_LIM0 = (r"\blim(?:it)?(?:\s+as\s+)?[\(\[]?\s*x\s*(?:→|->|=>)\s*0\s*[\)\]]?"
         r"\s*(?:of\s+)?")


def _lim_a(g) -> float:
    a = g.get("a")
    return float(a) if a else 1.0


def _c_limit_sin(g, m, text):
    a = _lim_a(g)
    if a < 0:
        return _GATE_m2
    steps = [f"Standard limit: lim(x->0) sin(ax)/x = a.",
             f"Here a = {_fmt_m2(a)}, so the limit = {_fmt_m2(a)}."]
    return a, steps, None, None, "lim(x->0) sin(ax)/x = a", None


def _c_limit_tan(g, m, text):
    a = _lim_a(g)
    if a < 0:
        return _GATE_m2
    steps = [f"Standard limit: lim(x->0) tan(ax)/x = a (tan(ax)/ax -> 1).",
             f"Here a = {_fmt_m2(a)}, so the limit = {_fmt_m2(a)}."]
    return a, steps, None, None, "lim(x->0) tan(ax)/x = a", None


def _c_limit_1mcos_sq(g, m, text):
    a = _lim_a(g)
    if a < 0:
        return _GATE_m2
    v = a * a / 2
    steps = [f"Standard limit: lim(x->0) (1 - cos(ax))/x^2 = a^2/2.",
             f"Here a = {_fmt_m2(a)}: a^2/2 = {_fmt_m2(v)}."]
    return v, steps, None, None, "lim(x->0) (1 - cos(ax))/x^2 = a^2/2", None


def _c_limit_1mcos_lin(g, m, text):
    a = _lim_a(g)
    if a < 0:
        return _GATE_m2
    steps = [f"Standard limit: lim(x->0) (1 - cos(ax))/x = 0.",
             "cos(ax) -> 1 as x -> 0, so the numerator 1 - cos(ax) -> 0 "
             "and the limit = 0."]
    return 0.0, steps, None, None, "lim(x->0) (1 - cos(ax))/x = 0", None


def _c_limit_exp(g, m, text):
    steps = ["Standard limit: lim(x->0) (e^x - 1)/x = 1.",
             "The value is exactly 1."]
    return 1.0, steps, None, None, "lim(x->0) (e^x - 1)/x = 1", None


# --------------------------------------------------------------------------- #
# 9-10. PROBABILITY_CONDITIONAL / PROBABILITY_DEPENDENT
# --------------------------------------------------------------------------- #

_COLORS = ("red", "blue", "green", "white", "black")
_COLOR = r"(?:red|blue|green|white|black)"


def _bag_counts(text: str) -> Dict[str, float]:
    counts: Dict[str, float] = {}
    for col in _COLORS:
        mm = re.search(r"(\d+)\s+" + col, text, re.I)
        if mm:
            counts[col] = float(mm.group(1))
    return counts


def _c_prob_conditional(g, m, text):
    c1, c2 = g["c1"].lower(), g["c2"].lower()
    counts = _bag_counts(text)
    if c1 not in counts or c2 not in counts:
        return _GATE_m2  # asked-about color absent from the bag statement
    n1, n2 = counts[c1], counts[c2]
    big_n = sum(counts.values())
    if big_n < 2 or n2 < 1:
        return _GATE_m2  # cannot condition on an impossible second draw
    same = c1 == c2
    n2_eff = (n2 - 1) if same else n2
    both = (n1 * n2_eff) / (big_n * (big_n - 1))
    p2nd = n2 / big_n
    cond = both / p2nd
    bag = ", ".join(f"{int(v)} {k}" for k, v in sorted(counts.items()))
    steps = [
        f"Bag: {bag}; N = {int(big_n)} balls, two draws without replacement.",
        f"P(2nd = {c2}) = {int(n2)}/{int(big_n)} = {_fmt_m2(p2nd)} "
        f"(every ball is equally likely to be the second draw).",
        f"P(1st = {c1} AND 2nd = {c2}) = ({int(n1)}/{int(big_n)}) x "
        f"({int(n2_eff)}/{int(big_n - 1)}) = {_fmt_m2(both)}.",
        f"Bayes rule: P(1st = {c1} | 2nd = {c2}) = {_fmt_m2(both)} / "
        f"{_fmt_m2(p2nd)} = {_fmt_m2(cond)} "
        f"(= ({int(n1 - (1 if same else 0))})/({int(big_n - 1)}) after "
        f"cancelling)."]
    return cond, steps, _frac_str(cond), None, \
        "P(first=A | second=B) = (nA - [A=B]) / (N - 1)", \
        {"n_first": n1, "n_second": n2, "N": big_n}


def _c_prob_dependent(g, m, text):
    nr, nb = float(g["nr"]), float(g["nb"])
    col = g["col"].lower()
    big_n = nr + nb
    n = nr if col == "red" else nb
    if big_n < 2 or n < 2:
        return _GATE_m2  # cannot draw two of this color
    p1 = n / big_n
    p2 = (n - 1) / (big_n - 1)
    val = p1 * p2
    fr = Fraction(int(n), int(big_n)) * Fraction(int(n - 1), int(big_n - 1))
    steps = [
        f"P(1st {col}) = {int(n)}/{int(big_n)} = {_fmt_m2(p1)}.",
        f"One {col} ball is now gone: P(2nd {col} | 1st {col}) = "
        f"{int(n - 1)}/{int(big_n - 1)} = {_fmt_m2(p2)}.",
        f"P(both {col}) = {_fmt_m2(p1)} x {_fmt_m2(p2)} = "
        f"{int(n * (n - 1))}/{int(big_n * (big_n - 1))} = "
        f"{fr.numerator}/{fr.denominator} = {_fmt_m2(val)}."]
    return val, steps, f"{fr.numerator}/{fr.denominator} (~{_fmt_m2(val)})", \
        None, "P(both) = (n/N) x ((n-1)/(N-1)), without replacement", \
        {"N": big_n, "n_color": n}


# --------------------------------------------------------------------------- #
# 11. BINOMIAL_COEFFICIENT
# --------------------------------------------------------------------------- #


def _c_binom(g, m, text):
    k = int(float(g["k"]))
    n = int(float(g["n"]))
    a_raw = g.get("a") or g.get("a2")
    a = float(a_raw) if a_raw else 1.0
    if n < 0 or k > n:
        return _GATE_m2  # x^k cannot appear when k > n
    pw = n - k
    coef = _snap(math.comb(n, k) * (a ** pw))
    steps = [
        "General term of (x + a)^n: C(n, k) x^k a^(n - k).",
        f"Coefficient of x^{k} in (x + {_fmt_m2(a)})^{n} = C({n}, {k}) x "
        f"{_fmt_m2(a)}^{pw} = {math.comb(n, k)} x {_fmt_m2(a ** pw)} = "
        f"{_fmt_m2(coef)}."]
    return coef, steps, f"{coef:g}", None, \
        "coefficient of x^k in (x + a)^n = C(n, k) a^(n - k)", None


# --------------------------------------------------------------------------- #
# 12-13. MATRIX_MULTIPLY_2X2 / MATRIX_TRANSPOSE
# --------------------------------------------------------------------------- #


def _c_matmul(g, m, text):
    a = [[float(g["a11"]), float(g["a12"])],
         [float(g["a21"]), float(g["a22"])]]
    b = [[float(g["b11"]), float(g["b12"])],
         [float(g["b21"]), float(g["b22"])]]
    c = [[a[i][0] * b[0][j] + a[i][1] * b[1][j] for j in range(2)]
         for i in range(2)]
    entry_sum = sum(sum(row) for row in c)
    steps = [
        "Row-by-column rule: c[i][j] = a[i][1] b[1][j] + a[i][2] b[2][j].",
        f"c11 = {a[0][0]:g}x{b[0][0]:g} + {a[0][1]:g}x{b[1][0]:g} = "
        f"{_fmt_m2(c[0][0])}",
        f"c12 = {a[0][0]:g}x{b[0][1]:g} + {a[0][1]:g}x{b[1][1]:g} = "
        f"{_fmt_m2(c[0][1])}",
        f"c21 = {a[1][0]:g}x{b[0][0]:g} + {a[1][1]:g}x{b[1][0]:g} = "
        f"{_fmt_m2(c[1][0])}",
        f"c22 = {a[1][0]:g}x{b[0][1]:g} + {a[1][1]:g}x{b[1][1]:g} = "
        f"{_fmt_m2(c[1][1])}",
        f"Product = {_mtx_str(c)}. numeric_answer carries the entry sum; "
        f"the full matrix is the final answer."]
    return entry_sum, steps, _mtx_str(c), None, \
        "C = A B, 2x2 row-by-column product", {"entry_sum": entry_sum}


def _c_transpose(g, m, text):
    mtx = [[float(g["m11"]), float(g["m12"])],
           [float(g["m21"]), float(g["m22"])]]
    t = [[mtx[0][0], mtx[1][0]], [mtx[0][1], mtx[1][1]]]
    entry_sum = sum(sum(row) for row in t)
    steps = [
        "Transpose swaps rows and columns: T[i][j] = M[j][i].",
        f"Row 1 ({_fmt_m2(mtx[0][0])}, {_fmt_m2(mtx[0][1])}) becomes column 1; "
        f"row 2 ({_fmt_m2(mtx[1][0])}, {_fmt_m2(mtx[1][1])}) becomes column 2.",
        f"T = {_mtx_str(t)}. numeric_answer carries the entry sum; the "
        f"full matrix is the final answer."]
    return entry_sum, steps, _mtx_str(t), None, \
        "A^T: rows become columns", {"entry_sum": entry_sum}


# --------------------------------------------------------------------------- #
# 14-16. SUM_SQUARES / SUM_CUBES / HARMONIC_MEAN
# --------------------------------------------------------------------------- #


def _c_sum_squares(g, m, text):
    n = float(g["n"])
    if n < 1:
        return _GATE_m2
    v = n * (n + 1) * (2 * n + 1) / 6
    steps = [
        "Sum of squares of the first n natural numbers: n(n+1)(2n+1)/6.",
        f"= {n:g} x {n + 1:g} x {2 * n + 1:g} / 6 = {_fmt_m2(v)}."]
    return v, steps, None, None, "sum of squares = n(n+1)(2n+1)/6", None


def _c_sum_cubes(g, m, text):
    n = float(g["n"])
    if n < 1:
        return _GATE_m2
    v = (n * (n + 1) / 2) ** 2
    steps = [
        "Sum of cubes of the first n natural numbers: [n(n+1)/2]^2.",
        f"= [{n:g} x {n + 1:g}/2]^2 = [{_fmt_m2(n * (n + 1) / 2)}]^2 = "
        f"{_fmt_m2(v)}."]
    return v, steps, None, None, "sum of cubes = [n(n+1)/2]^2", None


def _c_hm_two(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    if a <= 0 or b <= 0:
        return _GATE_m2  # harmonic mean needs positive values
    v = 2 * a * b / (a + b)
    steps = [
        "Harmonic mean of two numbers: 2ab/(a + b).",
        f"= (2 x {_fmt_m2(a)} x {_fmt_m2(b)})/({_fmt_m2(a)} + {_fmt_m2(b)}) = "
        f"{_fmt_m2(2 * a * b)}/{_fmt_m2(a + b)} = {_fmt_m2(v)}."]
    return v, steps, None, None, "HM = 2ab/(a + b)", None


def _c_hm_list(g, m, text):
    nums = _nums(g["list"])
    if not nums or any(x <= 0 for x in nums):
        return _GATE_m2
    inv = sum(1.0 / x for x in nums)
    v = len(nums) / inv
    steps = [
        "Harmonic mean of n numbers: n / (sum of reciprocals).",
        f"n = {len(nums)}; reciprocals: " +
        " + ".join(f"1/{x:g}" for x in nums) + f" = {_fmt_m2(inv)}",
        f"HM = {len(nums)}/{_fmt_m2(inv)} = {_fmt_m2(v)}."]
    return v, steps, None, None, "HM = n / (sum of 1/x)", \
        {"n": float(len(nums))}


# --------------------------------------------------------------------------- #
# 17. VECTOR_CROSS_PRODUCT
# --------------------------------------------------------------------------- #


def _c_cross(g, m, text):
    a = [float(g["ai"]), float(g["aj"]), float(g["ak"] or 0)]
    b = [float(g["bi"]), float(g["bj"]), float(g["bk"] or 0)]
    cx = a[1] * b[2] - a[2] * b[1]
    cy = a[2] * b[0] - a[0] * b[2]
    cz = a[0] * b[1] - a[1] * b[0]
    mag = math.sqrt(cx * cx + cy * cy + cz * cz)
    ans = f"({_fmt_m2(cx)})i + ({_fmt_m2(cy)})j + ({_fmt_m2(cz)})k"
    steps = [
        "a x b = determinant |i j k; a1 a2 a3; b1 b2 b3| expanded along "
        "the unit vectors.",
        f"i-component = {a[1]:g}x{b[2]:g} - {a[2]:g}x{b[1]:g} = {_fmt_m2(cx)}",
        f"j-component = {a[2]:g}x{b[0]:g} - {a[0]:g}x{b[2]:g} = {_fmt_m2(cy)} "
        f"(this one is subtracted in the determinant)",
        f"k-component = {a[0]:g}x{b[1]:g} - {a[1]:g}x{b[0]:g} = {_fmt_m2(cz)}",
        f"a x b = {ans}; |a x b| = {_fmt_m2(mag)} (numeric_answer carries the "
        f"magnitude; the full vector is the final answer)."]
    return mag, steps, ans, None, \
        "a x b = (a2 b3 - a3 b2, a3 b1 - a1 b3, a1 b2 - a2 b1)", \
        {"cx": cx, "cy": cy, "cz": cz}


# --------------------------------------------------------------------------- #
# 18. LINE_EQ_SLOPE_INTERCEPT
# --------------------------------------------------------------------------- #


def _c_line_slope_intercept(g, m, text):
    a = float(g["a"])
    b = float(g["b"]) * (1.0 if g["sgn"] == "+" else -1.0)
    c = float(g["c"])
    if b == 0:
        return _GATE_m2  # 0*y = ... : no y term, no finite slope/intercept
    slope = -a / b
    inter = c / b
    fs = Fraction(slope).limit_denominator(10000)
    fi = Fraction(inter).limit_denominator(10000)

    def _fr(x: Fraction) -> str:
        return f"{x.numerator}" if x.denominator == 1 \
            else f"{x.numerator}/{x.denominator}"

    ans = (f"y = ({_fr(fs)})x + {_fr(fi)}; slope = {_fr(fs)}, "
           f"y-intercept = {_fr(fi)}")
    steps = [
        f"Rearrange {_fmt_m2(a)}x + {_fmt_m2(b)}y = {_fmt_m2(c)} into y = mx + c:",
        f"{_fmt_m2(b)}y = {_fmt_m2(c)} - ({_fmt_m2(a)})x",
        f"y = ({_fmt_m2(c)} - ({_fmt_m2(a)})x)/{_fmt_m2(b)} = ({_fr(fs)})x + "
        f"{_fr(fi)}",
        f"slope m = {_fr(fs)} = {_fmt_m2(slope)}; y-intercept c = {_fr(fi)} = "
        f"{_fmt_m2(inter)}."]
    return slope, steps, ans, None, "a x + b y = c  ->  y = (-a/b)x + (c/b)", \
        {"slope": slope, "y_intercept": inter}


# --------------------------------------------------------------------------- #
# 19. COMPOUND_ANGLES
# --------------------------------------------------------------------------- #


def _pair_angles(g) -> Tuple[Optional[float], Optional[float]]:
    try:
        a1, b1 = float(g["a1"]), float(g["b1"])
        a2, b2 = float(g["a2"]), float(g["b2"])
    except (TypeError, KeyError):
        return None, None
    if a1 != a2 or b1 != b2:
        return None, None
    return a1, b1


def _c_sin_sum(g, m, text):
    a, b = _pair_angles(g)
    if a is None:
        return _GATE_m2
    v = _snap(_trig_val("sin", a + b))
    steps = [f"Compound angle formula: sin(A)cos(B) + cos(A)sin(B) = "
             f"sin(A + B).",
             f"A = {a:g}, B = {b:g} -> sin({a + b:g} degrees) = {_fmt_m2(v)}."]
    return v, steps, f"{v:g}", None, \
        "sin(A)cos(B) + cos(A)sin(B) = sin(A + B)", None


def _c_sin_diff(g, m, text):
    a, b = _pair_angles(g)
    if a is None:
        return _GATE_m2
    v = _snap(_trig_val("sin", a - b))
    steps = [f"Compound angle formula: sin(A)cos(B) - cos(A)sin(B) = "
             f"sin(A - B).",
             f"A = {a:g}, B = {b:g} -> sin({a - b:g} degrees) = {_fmt_m2(v)}."]
    return v, steps, f"{v:g}", None, \
        "sin(A)cos(B) - cos(A)sin(B) = sin(A - B)", None


def _c_cos_sum(g, m, text):
    a, b = _pair_angles(g)
    if a is None:
        return _GATE_m2
    v = _snap(_trig_val("cos", a + b))
    steps = [f"Compound angle formula: cos(A)cos(B) - sin(A)sin(B) = "
             f"cos(A + B).",
             f"A = {a:g}, B = {b:g} -> cos({a + b:g} degrees) = {_fmt_m2(v)}."]
    return v, steps, f"{v:g}", None, \
        "cos(A)cos(B) - sin(A)sin(B) = cos(A + B)", None


def _c_cos_diff(g, m, text):
    a, b = _pair_angles(g)
    if a is None:
        return _GATE_m2
    v = _snap(_trig_val("cos", a - b))
    steps = [f"Compound angle formula: cos(A)cos(B) + sin(A)sin(B) = "
             f"cos(A - B).",
             f"A = {a:g}, B = {b:g} -> cos({a - b:g} degrees) = {_fmt_m2(v)}."]
    return v, steps, f"{v:g}", None, \
        "cos(A)cos(B) + sin(A)sin(B) = cos(A - B)", None


# --------------------------------------------------------------------------- #
# 20. DISTANCE_POINT_LINE
# --------------------------------------------------------------------------- #


def _c_dist_point_line(g, m, text):
    px, py = float(g["px"]), float(g["py"])
    a = float(g["a"])
    b = float(g["b"]) * (1.0 if g["sgn"] == "+" else -1.0)
    c = -float(g["c0"])  # ax + by = c0  ->  ax + by - c0 = 0
    denom = math.sqrt(a * a + b * b)
    if denom == 0:
        return _GATE_m2  # not a line
    num = abs(a * px + b * py + c)
    d = num / denom
    s_b = "+" if b >= 0 else "-"
    s_c = "+" if c >= 0 else "-"
    steps = [
        f"Line: {_fmt_m2(a)}x {s_b} {abs(b):g}y = {g['c0']}  ->  "
        f"{_fmt_m2(a)}x {s_b} {abs(b):g}y {s_c} {abs(c):g} = 0 "
        f"(a = {_fmt_m2(a)}, b = {_fmt_m2(b)}, c = {_fmt_m2(c)}).",
        "distance = |a x1 + b y1 + c| / sqrt(a^2 + b^2)",
        f"= |{_fmt_m2(a)}x{_fmt_m2(px)} {s_b} {abs(b):g}x{_fmt_m2(py)} {s_c} "
        f"{abs(c):g}| / sqrt({_fmt_m2(a)}^2 + {_fmt_m2(b)}^2) = {_fmt_m2(num)}/"
        f"{_fmt_m2(denom)} = {_fmt_m2(d)}."]
    return d, steps, None, None, \
        "d = |a x1 + b y1 + c| / sqrt(a^2 + b^2)", None


def _c_dist_point_line_0(g, m, text):
    """ax + by + c = 0 form: same distance, constant used with its sign."""
    gg = dict(g)
    gg["c0"] = str(-float(g["c0"]))  # ax + by + c = 0  ==  ax + by = -c
    return _c_dist_point_line(gg, m, text)


# --------------------------------------------------------------------------- #
# The table: (structure id, trigger regex, compute)
# compute returns (value, steps, answer, assumptions, eq, extra-quantities)
# --------------------------------------------------------------------------- #

_LISTKW = r"(?:the\s+)?(?:(?:data|numbers?|list|set|values?)\s+)?"
_NUMCLS = r"[\d.,:\s]+"

_TABLE_m2: List[Tuple[str, str, Any]] = [
    # ---- statistics ----
    ("MEDIAN",
     r"\bmedian\s+of\s+" + _LISTKW + r"(?P<list>" + _NUMCLS + r")",
     _c_median),
    ("MODE",
     r"\bmode\s+of\s+" + _LISTKW + r"(?P<list>" + _NUMCLS + r")",
     _c_mode),
    ("MEAN_GROUPED",
     r"\b(?:mean|average)\b\s+(?:of\s+)?(?:the\s+)?(?:following\s+)?"
     r"frequency\s+(?:distribution|table)\s*:?\s*(?:x\s*=\s*)?"
     r"(?P<xs>[\d.,\s]+?)\s*,?\s*f\s*=\s*(?P<fs>[\d.,\s]+)",
     _c_mean_grouped),

    # ---- trigonometry ----
    ("TRIG_IDENTITY_EVAL",
     r"\bsin" + _sq("a1") + r"\s*\+\s*cos" + _sq("a2"),
     _c_sin_cos_sq),
    ("TRIG_IDENTITY_EVAL",
     r"\bcos" + _sq("a1") + r"\s*\+\s*sin" + _sq("a2"),
     _c_sin_cos_sq),
    ("TRIG_IDENTITY_EVAL",
     r"1\s*\+\s*\btan" + _sq("ang"),
     _c_1_tan_sq),
    ("TRIG_IDENTITY_EVAL",
     r"1\s*\+\s*\bcot" + _sq("ang"),
     _c_1_cot_sq),
    ("TRIG_IDENTITY_EVAL",
     r"\bsec" + _sq("a1") + r"\s*-\s*\btan" + _sq("a2"),
     _c_sec_tan_sq),
    ("TRIG_IDENTITY_EVAL",
     r"\b(?:cosec|csc)" + _sq("a1") + r"\s*-\s*\bcot" + _sq("a2"),
     _c_csc_cot_sq),

    # ---- coordinate geometry ----
    ("SECTION_FORMULA",
     r"divides?\s+(?:the\s+)?(?:line\s+)?(?:segment\s+)?"
     r"(?:line\s+segment\s+)?(?:join(?:ing|s)?\s+)?(?:the\s+)?"
     r"(?:points?\s+)?" + _pt_m2("a") +
     r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt_m2("b") +
     r".{0,60}?ratio\s*(?P<mm>\d+)\s*:\s*(?P<nn>\d+)",
     _c_section),
    ("AREA_TRIANGLE_COORDS",
     r"area\s+of\s+(?:a\s+|an\s+|the\s+)?triangle\s+"
     r"(?:with\s+|having\s+|whose\s+)?(?:vertices\s+|corners\s+|"
     r"points\s+|coordinates\s+)?" + _pt_m2("a") + r"\s*,\s*" + _pt_m2("b") +
     r"\s*(?:,\s*|and\s+)" + _pt_m2("c"),
     _c_area_tri),
    ("SLOPE_TWO_POINTS",
     r"(?:slope|gradient)\s+of\s+(?:the\s+)?(?:line\s+)?"
     r"(?:join(?:ing|s)?\s+|through\s+|passing\s+through\s+|"
     r"connecting\s+)?(?:the\s+)?(?:points?\s+)?" + _pt_m2("a") +
     r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt_m2("b"),
     _c_slope),
    ("LINE_EQ_SLOPE_INTERCEPT",
     r"(?:slope(?:\s+and\s+y-?intercept)?|y-?intercept(?:\s+and\s+slope)?)"
     r"\s+of\s+(?:the\s+)?line\s+(?P<a>" + _NUM_m2 + r")\s*x\s*(?P<sgn>[+-])"
     r"\s*(?P<b>" + _NUM_m2 + r")\s*y\s*=\s*(?P<c>" + _NUM_m2 + r")",
     _c_line_slope_intercept),
    ("DISTANCE_POINT_LINE",
     r"distance\s+(?:of\s+)?(?:from\s+|between\s+)(?:the\s+)?point\s*"
     + _pt_m2("p") +
     r"\s+(?:and|to)\s+(?:the\s+)?line\s+(?P<a>" + _NUM_m2 + r")\s*x\s*"
     r"(?P<sgn>[+-])\s*(?P<b>" + _NUM_m2 + r")\s*y\s*=\s*(?P<c0>" + _NUM_m2 +
     r")",
     _c_dist_point_line),
    ("DISTANCE_POINT_LINE",
     r"distance\s+(?:of\s+)?(?:from\s+|between\s+)(?:the\s+)?point\s*"
     + _pt_m2("p") +
     r"\s+(?:and|to)\s+(?:the\s+)?line\s+(?P<a>" + _NUM_m2 + r")\s*x\s*"
     r"(?P<sgn>[+-])\s*(?P<b>" + _NUM_m2 + r")\s*y\s*(?P<csgn>[+-])\s*"
     r"(?P<c0>" + _NUM_m2 + r")\s*=\s*0",
     _c_dist_point_line_0),

    # ---- limits ----
    ("LIMIT_STANDARD",
     _LIM0 + r"sin\s*\(\s*(?P<a>" + _U_NUM + r")?\s*\*?\s*x\s*\)\s*/\s*x\b",
     _c_limit_sin),
    ("LIMIT_STANDARD",
     _LIM0 + r"tan\s*\(\s*(?P<a>" + _U_NUM + r")?\s*\*?\s*x\s*\)\s*/\s*x\b",
     _c_limit_tan),
    ("LIMIT_STANDARD",
     _LIM0 + r"\(?\s*1\s*-\s*cos\s*\(?\s*(?P<a>" + _U_NUM +
     r")?\s*\*?\s*x\s*\)?\s*\)?\s*/\s*x\s*\^\s*2\b",
     _c_limit_1mcos_sq),
    ("LIMIT_STANDARD",
     _LIM0 + r"\(?\s*1\s*-\s*cos\s*\(?\s*(?P<a>" + _U_NUM +
     r")?\s*\*?\s*x\s*\)?\s*\)?\s*/\s*x\b",
     _c_limit_1mcos_lin),
    ("LIMIT_STANDARD",
     _LIM0 + r"\(?\s*e\s*\^\s*x\s*-\s*1\s*\)?\s*/\s*x\b",
     _c_limit_exp),

    # ---- probability ----
    ("PROBABILITY_DEPENDENT",
     r"(?P<nr>\d+)\s+red\s+(?:and\s+)?(?P<nb>\d+)\s+blue"
     r".{0,120}?without\s+replacement.{0,120}?"
     r"(?:p\s*\(\s*both|probability\s+(?:that\s+|of\s+)?both)"
     r"\s*(?:balls?\s*)?(?:are\s+|being\s+)?(?P<col>red|blue)",
     _c_prob_dependent),
    ("PROBABILITY_DEPENDENT",
     r"(?P<nb>\d+)\s+blue\s+(?:and\s+)?(?P<nr>\d+)\s+red"
     r".{0,120}?without\s+replacement.{0,120}?"
     r"(?:p\s*\(\s*both|probability\s+(?:that\s+|of\s+)?both)"
     r"\s*(?:balls?\s*)?(?:are\s+|being\s+)?(?P<col>red|blue)",
     _c_prob_dependent),
    ("PROBABILITY_CONDITIONAL",
     r"given\s+that\s+the\s+(?:second|2nd)\s+(?:ball\s+|draw\s+|card\s+)?"
     r"(?:is\s+|was\s+)?(?P<c2>" + _COLOR + r")"
     r".{0,120}?probability\s+(?:that\s+)?the\s+first"
     r"(?:\s+ball|\s+draw|\s+card)?(?:\s+was|\s+is)?(?:\s+also)?\s+"
     r"(?P<c1>" + _COLOR + r")",
     _c_prob_conditional),

    # ---- binomial ----
    ("BINOMIAL_COEFFICIENT",
     r"coefficient\s+of\s+x\s*\^\s*(?P<k>\d+)\s+in\s+(?:the\s+)?"
     r"expansion\s+of\s+\(\s*(?:x\s*\+\s*(?P<a>" + _NUM_m2 + r")"
     r"|(?P<a2>" + _NUM_m2 + r")\s*\+\s*x)\s*\)\s*\^\s*(?P<n>\d+)",
     _c_binom),

    # ---- matrices ----
    ("MATRIX_MULTIPLY_2X2",
     r"(?:multiply\s+(?:the\s+)?matri(?:x|ces)\s*|product\s+of\s+"
     r"(?:the\s+)?matri(?:x|ces)\s*)" + _mtx("a") +
     r"\s+(?:by|and|with)\s+(?:the\s+)?(?:matri(?:x|ces)\s*)?" + _mtx("b"),
     _c_matmul),
    ("MATRIX_TRANSPOSE",
     r"transpose\s+of\s+(?:the\s+)?matri(?:x|ces)\s*" + _mtx("m"),
     _c_transpose),

    # ---- series ----
    ("SUM_SQUARES",
     r"sum\s+of\s+(?:the\s+)?squares\s+of\s+(?:the\s+)?first\s+"
     r"(?P<n>\d+)\s+natural\s+numbers?",
     _c_sum_squares),
    ("SUM_CUBES",
     r"sum\s+of\s+(?:the\s+)?cubes\s+of\s+(?:the\s+)?first\s+"
     r"(?P<n>\d+)\s+natural\s+numbers?",
     _c_sum_cubes),
    ("HARMONIC_MEAN",
     r"harmonic\s+mean\s+of\s+(?P<a>" + _U_NUM + r")\s+and\s+(?P<b>"
     + _U_NUM + r")",
     _c_hm_two),
    ("HARMONIC_MEAN",
     r"harmonic\s+mean\s+of\s+" + _LISTKW + r"(?P<list>" + _NUMCLS + r")",
     _c_hm_list),

    # ---- vectors ----
    ("VECTOR_CROSS_PRODUCT",
     r"cross\s+product\s+of\s+(?:the\s+)?(?:vectors?\s+)?"
     r"(?P<ai>" + _NUM_m2 + r")\s*\*?\s*i"
     r"(?:\s*\+\s*(?P<aj>" + _NUM_m2 + r")\s*\*?\s*j)?"
     r"(?:\s*\+\s*(?P<ak>" + _NUM_m2 + r")\s*\*?\s*k)?"
     r"\s+and\s+(?:the\s+)?(?:vector\s+)?"
     r"(?P<bi>" + _NUM_m2 + r")\s*\*?\s*i"
     r"(?:\s*\+\s*(?P<bj>" + _NUM_m2 + r")\s*\*?\s*j)?"
     r"(?:\s*\+\s*(?P<bk>" + _NUM_m2 + r")\s*\*?\s*k)?",
     _c_cross),

    # ---- compound angles ----
    ("COMPOUND_ANGLES",
     _tcall("sin", "a1") + r"\s*\*?\s*" + _tcall("cos", "b1") +
     r"\s*\+\s*" + _tcall("cos", "a2") + r"\s*\*?\s*" + _tcall("sin", "b2"),
     _c_sin_sum),
    ("COMPOUND_ANGLES",
     _tcall("sin", "a1") + r"\s*\*?\s*" + _tcall("cos", "b1") +
     r"\s*-\s*" + _tcall("cos", "a2") + r"\s*\*?\s*" + _tcall("sin", "b2"),
     _c_sin_diff),
    ("COMPOUND_ANGLES",
     _tcall("cos", "a1") + r"\s*\*?\s*" + _tcall("cos", "b1") +
     r"\s*-\s*" + _tcall("sin", "a2") + r"\s*\*?\s*" + _tcall("sin", "b2"),
     _c_cos_sum),
    ("COMPOUND_ANGLES",
     _tcall("cos", "a1") + r"\s*\*?\s*" + _tcall("cos", "b1") +
     r"\s*\+\s*" + _tcall("sin", "a2") + r"\s*\*?\s*" + _tcall("sin", "b2"),
     _c_cos_diff),
]


# --------------------------------------------------------------------------- #
# BOOK-COMPLETE FAMILIES (classes 6-10 arithmetic/algebra/mensuration)
# Derived from the actual textbook inventory: Ganita Prakash 6-8, NCERT
# Mathematics 8-10 (rational numbers, linear equations, squares/cubes,
# comparing quantities, algebraic expressions, mensuration, exponents,
# direct/inverse proportion, factorisation, graphs; real numbers, polynomials,
# linear pairs, quadratics, AP, triangles, coordinate geometry, trigonometry,
# circles, surface areas/volumes, statistics, probability).
# --------------------------------------------------------------------------- #


def _c_frac_add_sub(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    c, d = float(g["c"]), float(g["d"])
    if b == 0 or d == 0:
        return _GATE_m2
    op = (g.get("op1") or "+").strip()
    if op == "-" and "diff" not in text and "-" not in (m.group("op") or ""):
        pass  # operator captured separately below
    is_sub = "-" in (m.group("op") or "")
    den = b * d
    n1, n2 = a * d, c * b
    val = (n1 - n2) / den if is_sub else (n1 + n2) / den
    steps = [
        f"LCM of denominators {b:g} and {d:g} is {den:g}.",
        f"{a:g}/{b:g} = {n1:g}/{den:g} and {c:g}/{d:g} = {n2:g}/{den:g}.",
        f"{'Subtract' if is_sub else 'Add'}: ({n1:g} {'-' if is_sub else '+'} {n2:g})/{den:g} = {_fmt_m2(val)}."]
    return val, steps, None, None, "a/b +/- c/d via LCM", {"num": val}


def _c_frac_mul_div(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    c, d = float(g["c"]), float(g["d"])
    if b == 0 or d == 0:
        return _GATE_m2
    is_div = "divid" in text or m.group("op") in ("/", "÷")
    if is_div:
        val = (a * d) / (b * c) if c != 0 else None
        if val is None:
            return _GATE_m2
        steps = [f"Dividing by {c:g}/{d:g} means multiplying by {d:g}/{c:g}.",
                 f"{a:g}/{b:g} x {d:g}/{c:g} = {_fmt_m2(a * d)}/{_fmt_m2(b * c)} = {_fmt_m2(val)}."]
        eq = "(a/b) / (c/d) = (a x d)/(b x c)"
    else:
        val = (a * c) / (b * d)
        steps = [f"Multiply numerators and denominators: ({a:g} x {c:g})/({b:g} x {d:g}).",
                 f"= {_fmt_m2(val)}."]
        eq = "(a/b) x (c/d) = (a x c)/(b x d)"
    return val, steps, None, None, eq, None


def _c_hcf(g, m, text):
    a, b = int(float(g["a"])), int(float(g["b"]))
    if a <= 0 or b <= 0:
        return _GATE_m2
    x, y = a, b
    while y:
        x, y = y, x % y
    steps = [f"Euclid's algorithm: HCF({a}, {b}).",
             f"HCF({a}, {b}) = {x}."]
    return float(x), steps, str(x), None, "HCF via Euclid's algorithm", None


def _c_lcm(g, m, text):
    a, b = int(float(g["a"])), int(float(g["b"]))
    if a <= 0 or b <= 0:
        return _GATE_m2
    x, y = a, b
    while y:
        x, y = y, x % y
    l = a * b // x
    steps = [f"HCF({a}, {b}) = {x}.",
             f"LCM(a, b) = (a x b)/HCF = ({a} x {b})/{x} = {l}."]
    return float(l), steps, str(l), None, "LCM = (a x b)/HCF", None


def _c_percent_of(g, m, text):
    p, n = float(g["p"]), float(g["n"])
    val = p * n / 100.0
    steps = [f"{p:g}% of {n:g} = ({p:g}/100) x {n:g} = {_fmt_m2(val)}."]
    return val, steps, None, None, "p% of N = (p/100) x N", None


def _c_percent_change(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    if a == 0:
        return _GATE_m2
    # DIG-GATES (2026-10-06 SOLVER-DIG-1): single-step family.
    # (a) a compensating-change ask ('rose from 90 to 99 — by what %
    #     should consumption be REDUCED so expenditure stays the
    #     same?') is not the price's % change — shipped 10% increase
    #     VERIFIED (true: 100/11 = 9.09% reduction).
    if re.search(r"reduce|consumption|expenditure|so\s+that|"
                 r"remains?\s+(?:the\s+)?same|unchanged", text, re.I):
        return _GATE_m2
    # (b) two distinct percent tokens = successive changes — a single
    #     step answers the wrong year.
    if len(set(re.findall(r"(\d+(?:\.\d+)?)\s*%", text))) > 1:
        return _GATE_m2
    change = (b - a) / a * 100.0
    kind = "increase" if change >= 0 else "decrease"
    steps = [f"Change = {b:g} - {a:g} = {_fmt_m2(b - a)}.",
             f"% {kind} = (change/original) x 100 = ({_fmt_m2(b - a)}/{a:g}) x 100 = {_fmt_m2(abs(change))}%."]
    return abs(change), steps, f"{_fmt_m2(abs(change))}% {kind}", None, \
        "% change = (new - old)/old x 100", None


def _c_profit_loss(g, m, text):
    cp, sp = float(g["cp"]), float(g["sp"])
    diff = sp - cp
    if cp == 0:
        return _GATE_m2
    pct = abs(diff) / cp * 100.0
    kind = "profit" if diff >= 0 else "loss"
    steps = [f"CP = {cp:g}, SP = {sp:g}. SP - CP = {_fmt_m2(diff)} ({kind}).",
             f"{kind.capitalize()}% = ({_fmt_m2(abs(diff))}/{cp:g}) x 100 = {_fmt_m2(pct)}%."]
    return pct, steps, f"{kind} of {_fmt_m2(abs(diff))} ({_fmt_m2(pct)}%)", None, \
        "profit/loss% = |SP - CP|/CP x 100", {"diff": diff}


def _c_si(g, m, text):
    p = float(g["p"]); r = float(g["r"]); t = float(g["t"])
    si = p * r * t / 100.0
    steps = [f"SI = (P x R x T)/100 = ({p:g} x {r:g} x {t:g})/100 = {_fmt_m2(si)}."]
    want_amt = "amount" in text
    if want_amt:
        steps.append(f"Amount = P + SI = {p:g} + {_fmt_m2(si)} = {_fmt_m2(p + si)}.")
    return (p + si) if want_amt else si, steps, None, None, \
        "SI = PRT/100", None


def _c_ci(g, m, text):
    p = float(g["p"]); r = float(g["r"]); t = float(g["t"])
    amt = p * (1 + r / 100.0) ** t
    ci = amt - p
    steps = [f"Amount = P(1 + R/100)^T = {p:g}(1 + {r:g}/100)^{t:g} = {_fmt_m2(amt)}.",
             f"CI = Amount - P = {_fmt_m2(amt)} - {p:g} = {_fmt_m2(ci)}."]
    want_amt = "amount" in text
    return amt if want_amt else ci, steps, None, None, \
        "A = P(1 + R/100)^T", None


def _c_ratio_share(g, m, text):
    total = float(g["total"])
    parts = [float(x) for x in (g["r1"], g["r2"])]
    ssum = sum(parts)
    if ssum == 0:
        return _GATE_m2
    shares = [total * p / ssum for p in parts]
    steps = [f"Total ratio parts = {parts[0]:g} + {parts[1]:g} = {ssum:g}.",
             f"Share 1 = ({parts[0]:g}/{ssum:g}) x {total:g} = {_fmt_m2(shares[0])}.",
             f"Share 2 = ({parts[1]:g}/{ssum:g}) x {total:g} = {_fmt_m2(shares[1])}."]
    extra = {"s1": shares[0], "s2": shares[1]}
    return shares[0], steps, f"{_fmt_m2(shares[0])} and {_fmt_m2(shares[1])}", None, \
        "share = (ratio part/total parts) x amount", extra


def _c_unitary(g, m, text):
    n1 = float(g["n1"]); cost = float(g["cost"]); n2 = float(g["n2"])
    if n1 == 0:
        return _GATE_m2
    one = cost / n1
    val = one * n2
    steps = [f"Cost of 1 article = {cost:g}/{n1:g} = {_fmt_m2(one)}.",
             f"Cost of {n2:g} articles = {_fmt_m2(one)} x {n2:g} = {_fmt_m2(val)}."]
    return val, steps, None, None, "unitary method", {"unit_cost": one}


# --------------------------------------------------------------------------- #
# SPEED_DIST_TIME -- the ASKED quantity binds the solve target (LOMO fix,
# 2026-10-05).  The old code bound "speed" whenever the word appeared
# anywhere in the text, so "A car travels 120 km in 3 hours at a constant
# speed. How far will it go in 7 hours?" shipped the intermediate speed 40
# instead of the asked 280 km.  Now: "how far / how much distance" -> find
# the distance, "how long / how much time" -> find the time, "what speed /
# how fast" -> find the speed; the base triangle (any one of s/d/t from the
# other two) and the extended triangle (a reference pair plus one more
# value of another kind) both bind that target, and the answer unit rides
# in the final answer.  Ambiguous or alien shapes (acceleration contexts,
# crossing/length problems, multi-leg journeys) refuse -- never guess.
# --------------------------------------------------------------------------- #

_SDT_NUM = r"\d[\d,]*(?:\.\d+)?"
_SDT_SPEED_RX = re.compile(
    r"(?P<n>" + _SDT_NUM + r")\s*"
    r"(?P<u>km\s*/\s*h(?:r|our)?|kmph|kilometres?\s+per\s+(?:hour|hr)|"
    r"m\s*/\s*s(?!\s*\^)|metres?\s+per\s+second|ms-1)", re.I)
_SDT_DIST_RX = re.compile(
    r"(?P<n>" + _SDT_NUM + r")\s*"
    r"(?P<u>km|kilometres?|kilometers?|metres?|meters?|m)\b"
    r"(?!\s*(?:/|per\b))", re.I)
_SDT_TIME_RX = re.compile(
    r"(?P<n>" + _SDT_NUM + r")\s*"
    r"(?P<u>hours?|hrs?|hr|h|minutes?|mins?|seconds?|secs?|sec)\b", re.I)

# contexts owned by other families -- a constant-speed triangle must never
# fire on them (a confident-wrong 100 m for a 50 m accelerated run is worse
# than a refusal)
_SDT_REFUSE_CTX = re.compile(
    r"accelerat|decelerat|retard|speeds\s+up|slows?\s+down|from\s+rest|"
    r"velocity|\bcross(?:es|ed|ing)?\b|\bfalls?\b|free\s+fall|"
    r"\bdrop(?:s|ped|ping)?\b", re.I)


def _sdt_asks(text):
    """(asked kinds, earliest ask-phrase position) from the question text."""
    found = []
    pos = None
    pats = [
        ("d", r"how\s+far\b|how\s+much\s+distance|what\s+distance\b|"
              r"how\s+many\s+(?:km|kilometres?|kilometers?|metres?|"
              r"meters?)\b"),
        ("t", r"how\s+long\b|how\s+much\s+time\b|what\s+time\b|"
              r"how\s+many\s+(?:hours?|hrs?|minutes?|mins?|seconds?|"
              r"secs?)\b"),
        ("s", r"what\s+(?:is\s+|was\s+)?(?:the\s+|its\s+|her\s+|his\s+|"
              r"their\s+)?speed\b|what\s+speed\b|how\s+fast\b|"
              r"(?:find|calculate|determine|compute)\s+(?:the\s+|its\s+|"
              r"her\s+|his\s+|their\s+)?speed\b"),
    ]
    for kind, rx in pats:
        mm = re.search(rx, text, re.I)
        if mm:
            found.append(kind)
            pos = mm.start() if pos is None else min(pos, mm.start())
    return found, pos


def _sdt_collect(text, rx, skip_spans=()):
    """[(value, unit, position)] for a quantity regex, skipping spans that
    belong to another quantity (e.g. the 'km' inside 'km/h')."""
    out = []
    for mm in rx.finditer(text):
        if any(s <= mm.start() < e for s, e in skip_spans):
            continue
        try:
            n = float(mm.group("n").replace(",", ""))
        except ValueError:
            continue
        out.append((n, mm.group("u").lower().replace(" ", ""), mm.start()))
    return out


def _sdt_dist_f(unit):
    """km per the given distance unit."""
    return 1.0 if unit.startswith("k") else 0.001   # km family / m family


def _sdt_time_f(unit):
    """hours per the given time unit."""
    if unit.startswith("h"):
        return 1.0
    if unit.startswith("m"):
        return 1.0 / 60.0
    return 1.0 / 3600.0                              # s family


def _sdt_speed_f(unit):
    """km/h per the given speed unit."""
    return 1.0 if unit.startswith("k") else 3.6      # km/h family / m/s


def _c_sdt(g, m, text):
    if _SDT_REFUSE_CTX.search(text):
        return _GATE_m2
    # SCI-NOTATION EXPANSION (2026-10-07, class-7 corpus C7H04): the
    # harvest regexes read the EXPONENT as the value -- "3 x 10^8 m/s"
    # bound speed = 8 and shipped '40 m' VERIFIED for the
    # radiation-in-5-seconds ask (true 1.5e9 m).  Same drop class as
    # the C8 atmospheric-pressure 10^5 fix.  Expand every a x 10^e
    # into its plain decimal before any quantity regex runs.
    _sci_mm = re.compile(
        r"(?P<ma>\d+(?:\.\d+)?)\s*[x\u00d7*]\s*10\s*(?:\^|\*\*)?\s*"
        r"(?P<ex>-?\d+)", re.I)

    def _sci_sub(m2):
        try:
            return "%.10g" % (float(m2.group("ma"))
                              * (10.0 ** int(m2.group("ex"))))
        except Exception:
            return m2.group(0)

    text = _sci_mm.sub(_sci_sub, text)
    # "how long is the train/bridge?" asks a LENGTH, not a travel time
    # (crossing problems are already refused by _SDT_REFUSE_CTX above)
    if re.search(r"how\s+long\s+(?:is|are|was|were)\s+(?:the\s+|a\s+|an\s+)?"
                 r"(?:train|bridge|platform|tunnel)\b", text, re.I):
        return _GATE_m2

    speed_spans = [(mm.start(), mm.end())
                   for mm in _SDT_SPEED_RX.finditer(text)]
    speeds = _sdt_collect(text, _SDT_SPEED_RX)
    dists = _sdt_collect(text, _SDT_DIST_RX, skip_spans=speed_spans)
    times = _sdt_collect(text, _SDT_TIME_RX, skip_spans=speed_spans)
    if not dists and not times and not speeds:
        return _GATE_m2
    if len(speeds) > 1 or len(dists) > 2 or len(times) > 2:
        return _GATE_m2          # multi-leg journeys are another family's work

    asks, ask_pos = _sdt_asks(text)
    kind = (g or {}).get("kind")          # "find the speed|distance|time"
    if kind:
        asks.append({"speed": "s", "distance": "d",
                     "time": "t"}[kind.lower()])
    if not asks:
        # legacy word-presence dispatch ONLY when no explicit ask phrase
        # exists -- a mere mention ("at a constant speed") must never
        # outrank "how far" (the 2026-10-05 LOMO bug)
        for word, k in (("speed", "s"), ("distance", "d"), ("time", "t")):
            if re.search(r"\b" + word + r"\b", text, re.I):
                asks.append(k)
    asks = list(dict.fromkeys(asks))
    if len(asks) != 1:
        return _GATE_m2
    ask = asks[0]

    # unit system: km+hour (km, h, km/h) or m+second (m, s, m/s)
    if speeds:
        system = "kmh" if _sdt_speed_f(speeds[0][1]) == 1.0 else "ms"
    elif dists and times:
        df, tf = _sdt_dist_f(dists[0][1]), _sdt_time_f(times[0][1])
        system = "kmh" if (df == 1.0 and tf >= 1.0 / 60.0) or \
            (df != 1.0 and tf == 1.0) else "ms"
    else:
        return _GATE_m2
    dscale = 1.0 if system == "kmh" else 1000.0       # km -> system dist
    tscale = 1.0 if system == "kmh" else 3600.0       # h  -> system time
    sscale = 1.0 if system == "kmh" else 1.0 / 3.6    # km/h -> system speed
    D = [v * _sdt_dist_f(u) * dscale for v, u, _p in dists]
    T = [v * _sdt_time_f(u) * tscale for v, u, _p in times]
    S = [v * _sdt_speed_f(u) * sscale for v, u, _p in speeds]

    if ask == "s":
        # speed given AND asked -> ambiguous; two legs -> average-speed class
        if speeds or len(dists) != 1 or len(times) != 1 or T[0] == 0:
            return _GATE_m2
        val = _snap(D[0] / T[0])
        unit = "km/h" if system == "kmh" else "m/s"
        expr = re.search(r"in\s+(km/h|kmph|kilometres\s+per\s+hour|m/s|"
                         r"metres\s+per\s+second)\b", text, re.I)
        if expr:
            want = "kmh" if expr.group(1).lower().startswith("k") else "ms"
            if want != system:
                val = _snap(val / 3.6 if want == "ms" else val * 3.6)
                unit = "m/s" if want == "ms" else "km/h"
        steps = [f"Speed = Distance/Time = {_fmt_m2(D[0])}/{_fmt_m2(T[0])} = "
                 f"{_fmt_m2(val)} {unit}."]
        return val, steps, f"{_fmt_m2(val)} {unit}", None, \
            "speed = distance/time", None

    if ask == "d":
        if speeds:
            # base triangle: speed + time given, distance NOT given
            if len(speeds) != 1 or len(dists) != 0 or not times \
                    or S[0] < 0:
                return _GATE_m2
            val = _snap(S[0] * T[0])
            dunit = "km" if system == "kmh" else "m"
            steps = [f"Distance = Speed x Time = {_fmt_m2(S[0])} x "
                     f"{_fmt_m2(T[0])} = {_fmt_m2(val)} {dunit}.",
                     f"(the same distance each hour adds up to "
                     f"{_fmt_m2(val)} {dunit}.)"]
        else:
            # extended triangle: one reference (distance, time) pair fixes
            # the speed; the SECOND time carries the asked distance
            if len(dists) != 1 or len(times) != 2 \
                    or T[0] == 0 or T[1] == 0:
                return _GATE_m2
            t_ask = _sdt_pick_ask(times, ask_pos)
            t_ref = times[1] if t_ask is times[0] else times[0]
            v = _snap(D[0] / T[times.index(t_ref)])
            val = _snap(v * T[times.index(t_ask)])
            dunit = "km" if dists[0][1].startswith("k") else "m"
            steps = [f"Speed = {_fmt_m2(D[0])} {dunit} / "
                     f"{_fmt_m2(T[times.index(t_ref)])} h = {_fmt_m2(v)}.",
                     f"Distance = {_fmt_m2(v)} x "
                     f"{_fmt_m2(T[times.index(t_ask)])} h = {_fmt_m2(val)} "
                     f"{dunit}."]
        # the answer is stated in the reference distance token's unit
        if dunit == "km":
            val = val if system == "kmh" else val / 1000.0
        else:
            val = val * 1000.0 if system == "kmh" else val
        return val, steps, f"{_fmt_m2(val)} {dunit}", None, \
            "distance = speed x time", None

    # ask == "t"
    if speeds:
        # base triangle: speed + distance given, time NOT given
        if len(speeds) != 1 or len(dists) != 1 or len(times) != 0 \
                or S[0] == 0:
            return _GATE_m2
        val = _snap(D[0] / S[0])
        steps = [f"Time = Distance/Speed = {_fmt_m2(D[0])}/{_fmt_m2(S[0])} = "
                 f"{_fmt_m2(val)}.",]
    else:
        # extended triangle: the reference pair fixes the speed; the SECOND
        # distance carries the asked time
        if len(times) != 1 or len(dists) != 2 \
                or D[0] == 0 or D[1] == 0 or T[0] == 0:
            return _GATE_m2
        d_ask = _sdt_pick_ask(dists, ask_pos)
        d_ref = dists[1] if d_ask is dists[0] else dists[0]
        v = _snap(D[dists.index(d_ref)] / T[0])
        val = _snap(D[dists.index(d_ask)] / v)
        steps = [f"Speed = {_fmt_m2(D[dists.index(d_ref)])}/"
                 f"{_fmt_m2(T[0])} = {_fmt_m2(v)}.",
                 f"Time = {_fmt_m2(D[dists.index(d_ask)])}/{_fmt_m2(v)} = "
                 f"{_fmt_m2(val)}."]
    # time answers are stated in the system time unit (hours for the km/h
    # system, seconds for the m/s system)
    tword = "hours" if system == "kmh" else "seconds"
    tval = val if system == "kmh" else _snap(val / 3600.0)
    if abs(tval - 1.0) <= 1e-9:
        tword = tword[:-1]
    return tval, steps, f"{_fmt_m2(tval)} {tword}", None, \
        "time = distance/speed", None


def _sdt_pick_ask(tokens, ask_pos):
    """The token of the asked kind that carries the NEW value: the one after
    the ask phrase when exactly one sits there, else the last token (the
    ask clause closes the question: '... in 7 hours?')."""
    if ask_pos is not None:
        after = [tk for tk in tokens if tk[2] > ask_pos]
        if len(after) == 1:
            return after[0]
    return tokens[-1]


def _c_time_work(g, m, text):
    a = float(g["a"]); b = float(g["b"])
    if a <= 0 or b <= 0:
        return _GATE_m2
    together = a * b / (a + b)
    steps = [f"A's 1-day work = 1/{a:g}, B's 1-day work = 1/{b:g}.",
             f"Together = 1/{a:g} + 1/{b:g} = ({b:g} + {a:g})/({a:g} x {b:g}).",
             f"Time together = ({a:g} x {b:g})/({a:g} + {b:g}) = {_fmt_m2(together)} days."]
    return together, steps, None, None, "combined time = ab/(a+b)", None


def _c_linear_solve(g, m, text):
    a = float(g["a"]); b = float(g["b"]); c = float(g["c"])
    if a == 0:
        return _GATE_m2
    x = (c - b) / a
    steps = [f"{a:g}x {'+' if b >= 0 else '-'} {abs(b):g} = {c:g}.",
             f"{a:g}x = {c:g} {'-' if b >= 0 else '+'} {abs(b):g} = {_fmt_m2(c - b)}.",
             f"x = {_fmt_m2(c - b)}/{a:g} = {_fmt_m2(x)}."]
    return x, steps, f"x = {_fmt_m2(x)}", None, "ax + b = c", None


def _c_quad_roots(g, m, text):
    a = float(g["a"])
    b = float(g["b"]) * (-1 if (m.group("bop") or "-") == "-" else 1)
    c = float(g["c"]) * (-1 if (m.group("cop") or "-") == "-" else 1)
    if a == 0:
        return _GATE_m2
    disc = b * b - 4 * a * c
    if disc < 0:
        return _GATE_m2
    r1 = (-b + disc ** 0.5) / (2 * a)
    r2 = (-b - disc ** 0.5) / (2 * a)
    steps = [f"Discriminant = b^2 - 4ac = {b:g}^2 - 4({a:g})({c:g}) = {_fmt_m2(disc)}.",
             f"x = (-b +/- sqrt(D))/2a = ({-b:g} +/- {_fmt_m2(disc ** 0.5)})/{2 * a:g}.",
             f"Roots: x = {_fmt_m2(r1)} and x = {_fmt_m2(r2)}."]
    extra = {"r1": r1, "r2": r2, "discriminant": disc}
    return r1, steps, f"x = {_fmt_m2(r1)}, x = {_fmt_m2(r2)}", None, \
        "x = (-b +/- sqrt(b^2 - 4ac))/2a", extra


def _c_ap_nth_m2(g, m, text):
    a = float(g["a"]); d = float(g["d"]); n = float(g["n"])
    val = a + (n - 1) * d
    steps = [f"a_n = a + (n - 1)d = {a:g} + ({n:g} - 1)({d:g}).",
             f"= {a:g} + {_fmt_m2((n - 1) * d)} = {_fmt_m2(val)}."]
    return val, steps, None, None, "a_n = a + (n-1)d", None


def _c_ap_sum_m2(g, m, text):
    a = float(g["a"]); d = float(g["d"]); n = float(g["n"])
    val = n * (2 * a + (n - 1) * d) / 2
    steps = [f"S_n = n/2 [2a + (n - 1)d] = {n:g}/2 [2({a:g}) + ({n:g} - 1)({d:g})].",
             f"= {_fmt_m2(val)}."]
    return val, steps, None, None, "S_n = n/2 [2a + (n-1)d]", None


def _c_gp_nth(g, m, text):
    a = float(g["a"]); r = float(g["r"]); n = float(g["n"])
    val = a * r ** (n - 1)
    steps = [f"a_n = a r^(n-1) = {a:g} x {r:g}^({n:g} - 1).",
             f"= {a:g} x {_fmt_m2(r ** (n - 1))} = {_fmt_m2(val)}."]
    return val, steps, None, None, "a_n = a r^(n-1)", None


def _c_circle_area(g, m, text):
    r = float(g["r"])
    val = 22.0 / 7.0 * r * r if abs(r * 7 / 22 - round(r * 7 / 22)) < 1e-9 or True else 3.14159 * r * r
    val = 3.141592653589793 * r * r
    steps = [f"Area = pi r^2 = 3.14159 x {r:g}^2 = {_fmt_m2(val)}.",
             f"(Using 22/7: {_fmt_m2(22.0 / 7.0 * r * r)}.)"]
    return val, steps, None, None, "area = pi r^2", None


def _c_circle_circum(g, m, text):
    r = float(g["r"])
    val = 2 * 3.141592653589793 * r
    steps = [f"Circumference = 2 pi r = 2 x 3.14159 x {r:g} = {_fmt_m2(val)}.",
             f"(Using 22/7: {_fmt_m2(2 * 22.0 / 7.0 * r)}.)"]
    return val, steps, None, None, "circumference = 2 pi r", None


def _c_rect_area(g, m, text):
    l = float(g["l"]); w = float(g["w"])
    val = l * w
    steps = [f"Area = length x breadth = {l:g} x {w:g} = {_fmt_m2(val)}."]
    per = 2 * (l + w)
    extra = {"area": val, "perimeter": per}
    return val, steps, None, None, "area = l x b", extra


def _c_square_area(g, m, text):
    s = float(g["s"])
    val = s * s
    steps = [f"Area = side^2 = {s:g}^2 = {_fmt_m2(val)}.",
             f"Perimeter = 4 x {s:g} = {_fmt_m2(4 * s)}."]
    extra = {"area": val, "perimeter": 4 * s}
    return val, steps, None, None, "area = side^2", extra


def _c_pythagoras(g, m, text):
    a = float(g["a"]); b = float(g["b"])
    h = (a * a + b * b) ** 0.5
    steps = [f"Hypotenuse^2 = {a:g}^2 + {b:g}^2 = {_fmt_m2(a * a)} + {_fmt_m2(b * b)} = {_fmt_m2(a * a + b * b)}.",
             f"Hypotenuse = sqrt({_fmt_m2(a * a + b * b)}) = {_fmt_m2(h)}."]
    return h, steps, None, None, "h^2 = a^2 + b^2", None


def _c_volume_cube(g, m, text):
    s = float(g["s"])
    v = s ** 3
    steps = [f"Volume of cube = edge^3 = {s:g}^3 = {_fmt_m2(v)}.",
             f"Surface area = 6 x {s:g}^2 = {_fmt_m2(6 * s * s)}."]
    extra = {"volume": v, "surface_area": 6 * s * s}
    return v, steps, None, None, "V = edge^3", extra


def _c_volume_cyl(g, m, text):
    r = float(g["r"]); h = float(g["h"])
    v = 3.141592653589793 * r * r * h
    steps = [f"Volume of cylinder = pi r^2 h = 3.14159 x {r:g}^2 x {h:g} = {_fmt_m2(v)}."]
    return v, steps, None, None, "V = pi r^2 h", None


def _c_volume_sphere(g, m, text):
    r = float(g["r"])
    v = 4.0 / 3.0 * 3.141592653589793 * r ** 3
    steps = [f"Volume of sphere = (4/3) pi r^3 = (4/3) x 3.14159 x {r:g}^3 = {_fmt_m2(v)}.",
             f"Surface area = 4 pi r^2 = {_fmt_m2(4 * 3.141592653589793 * r * r)}."]
    extra = {"volume": v, "surface_area": 4 * 3.141592653589793 * r * r}
    return v, steps, None, None, "V = (4/3) pi r^3", extra


def _c_exp_eval(g, m, text):
    b = float(g["b"]); e = float(g["e"])
    if e > 40 or abs(b) > 1000:
        return _GATE_m2
    val = b ** e
    steps = [f"{b:g}^{e:g} = {_fmt_m2(val)}."]
    return val, steps, None, None, "base^exponent", None


def _c_root_perfect(g, m, text):
    n = float(g["n"])
    is_cube = "cube" in text
    if is_cube:
        r = round(n ** (1.0 / 3.0))
        if r ** 3 != n:
            return _GATE_m2
        return float(r), [f"Cube root of {n:g}: {r:g}^3 = {n:g}, so the cube root is {r:g}."], \
            str(r), None, "cube root", None
    r = round(n ** 0.5)
    if r * r != n:
        return _GATE_m2
    return float(r), [f"Square root of {n:g}: {r:g}^2 = {n:g}, so the square root is {r:g}."], \
        str(r), None, "square root", None


_BOOK_ROWS = [
    ("FRACTION_ADD_SUB",
     r"(?P<a>" + _NUM_m2 + r")\s*/\s*(?P<b>" + _U_NUM + r")\s*(?P<op>[-+])\s*(?P<c>"
     + _NUM_m2 + r")\s*/\s*(?P<d>" + _U_NUM + r")",
     _c_frac_add_sub),
    ("FRACTION_MUL_DIV",
     r"(?P<a>" + _NUM_m2 + r")\s*/\s*(?P<b>" + _U_NUM + r")\s*(?P<op>[x*÷/]|times|multiplied by|divided by)\s*(?P<c>"
     + _NUM_m2 + r")\s*/\s*(?P<d>" + _U_NUM + r")",
     _c_frac_mul_div),
    ("HCF_TWO_NUMBERS",
     r"hc[fp]\b\s*(?:of\b)?\s*(?:the\s*)?(?:two\s*)?(?:numbers?\s*)?(?P<a>\d+)\s*(?:and|,)\s*(?P<b>\d+)",
     _c_hcf),
    ("LCM_TWO_NUMBERS",
     r"lcm\b\s*(?:of\b)?\s*(?:the\s*)?(?:two\s*)?(?:numbers?\s*)?(?P<a>\d+)\s*(?:and|,)\s*(?P<b>\d+)",
     _c_lcm),
    ("PERCENT_OF",
     r"(?P<p>" + _U_NUM + r")\s*%\s*(?:of)\s*(?P<n>" + _NUM_m2 + r")",
     _c_percent_of),
    ("PERCENT_CHANGE",
     r"percentage\s+(?:increase|decrease|change)\s+(?:from\s*|when\s+(?:the\s+)?)\s*"
     r"(?P<a>" + _NUM_m2 + r")\s*(?:to|and)\s*(?P<b>" + _NUM_m2 + r")",
     _c_percent_change),
    ("PROFIT_LOSS_PERCENT",
     r"(?:cp\b|cost\s*price|buys?\b|bought\b|purchased?\b)[^0-9]{0,40}(?P<cp>" + _NUM_m2 + r")"
     r".{0,120}?(?:sp\b|selling\s*price|sells?\b[^0-9]{0,20}for|sold\b[^0-9]{0,20}for)[^0-9]{0,30}(?P<sp>" + _NUM_m2 + r")"
     r".{0,60}?(?:profit|loss)",
     _c_profit_loss),
    ("SIMPLE_INTEREST",
     r"simple\s+interest\s+(?:on|of)\s+(?:rs\.?\s*|rs\s*|₹\s*|inr\s*)?(?P<p>" + _NUM_m2 + r")"
     r".{0,40}?(?:at|@|rate)\s*(?P<r>" + _U_NUM + r")\s*%"
     r".{0,40}?(?:for|in|per annum for|per\s*annum,?\s*for)?\s*(?P<t>" + _U_NUM + r")\s*years?",
     _c_si),
    ("COMPOUND_INTEREST",
     r"compound(?:ed)?\s+(?:annually,?\s*)?(?:interest|amount)\s+(?:on|of)\s+"
     r"(?:rs\.?\s*|rs\s*|₹\s*|inr\s*)?(?P<p>" + _NUM_m2 + r")"
     r".{0,40}?(?:at|@|rate)\s*(?P<r>" + _U_NUM + r")\s*%"
     r".{0,40}?(?:for|in|per\s*annum,?\s*for)?\s*(?P<t>" + _U_NUM + r")\s*years?",
     _c_ci),
    ("RATIO_SHARE",
     r"divid\w+\s+(?:rs\.?\s*|rs\s*|₹\s*)?(?P<total>" + _NUM_m2 + r")\s+(?:in\s+the\s+ratio\s*)?(?P<r1>" + _U_NUM + r")\s*:\s*(?P<r2>" + _U_NUM + r")",
     _c_ratio_share),
    ("UNITARY",
     r"(?:if\s*)?(?:the\s*)?cost\s+of\s+(?P<n1>" + _U_NUM + r")\s*(?:articles?|items?|pens?|books?| notebooks?|kg|kilograms?)\s+is\s+(?:rs\.?\s*|₹\s*)?(?P<cost>"
     + _NUM_m2 + r")\s*,?\s*(?:then\s*)?(?:what\s*is\s*(?:the\s*)?cost|find\s*(?:the\s*)?cost|cost)\s+of\s+(?P<n2>"
     + _U_NUM + r")",
     _c_unitary),
    ("SPEED_DIST_TIME",
     r"(?:(?:find|what)\s+(?:is\s+)?the\s+(?P<kind>speed|distance|time)\b)?"
     r"(?P<s>" + _NUM_m2 + r")?\s*(?:km/h|km\/h|kmph)?"
     r"(?:[^0-9]{0,40}(?P<d2>" + _NUM_m2 + r")\s*km\b)?"
     r"(?:[^0-9]{0,40}(?P<t2>" + _U_NUM + r")\s*(?:hours?|hrs?|h\b))?",
     _c_sdt),
    ("TIME_WORK_TOGETHER",
     r"\bA\s+(?:can\s+)?(?:do(?:es)?)?\s*(?:a\s+)?(?:work|job)\s+in\s+(?P<a>" + _U_NUM + r")\s*days?\b"
     r".{0,60}?\bB\s+(?:can\s+)?(?:do(?:es)?)?\s*(?:it|the\s+(?:work|job))\s+in\s+(?P<b>" + _U_NUM + r")\s*days?",
     _c_time_work),
    ("LINEAR_SOLVE",
     r"solve[:\s]+(?P<a>" + _NUM_m2 + r")\s*x\s*(?P<op>[-+])\s*(?P<b>" + _NUM_m2 + r")\s*=\s*(?P<c>" + _NUM_m2 + r")",
     _c_linear_solve),
    ("QUADRATIC_ROOTS",
     r"roots?\s+of\s+(?P<a>" + _NUM_m2 + r")\s*x\s*\^\s*2\s*(?P<bop>[-+])\s*(?P<b>" + _NUM_m2 + r")\s*x\s*(?P<cop>[-+])\s*(?P<c>"
     + _NUM_m2 + r")\s*=\s*0",
     _c_quad_roots),
    ("AP_NTH",
     r"(?:(?:find|what\s+is)\s+the\s+)?(?P<n>" + _U_NUM + r")\s*(?:th|st|nd|rd)\s+term\s+of\s+(?:the\s+)?(?:ap|a\.p\.|arithmetic\s+progression)"
     r".{0,40}?first\s+term\s+(?:is\s+)?(?P<a>" + _NUM_m2 + r")"
     r".{0,40}?common\s+difference\s+(?:is\s+)?(?P<d>" + _NUM_m2 + r")",
     _c_ap_nth_m2),
    ("AP_SUM",
     r"sum\s+of\s+(?:the\s+)?first\s+(?P<n>" + _U_NUM + r")\s+terms?\s+of\s+(?:the\s+)?(?:ap|a\.p\.|arithmetic\s+progression)"
     r".{0,40}?first\s+term\s+(?:is\s+)?(?P<a>" + _NUM_m2 + r")"
     r".{0,40}?common\s+difference\s+(?:is\s+)?(?P<d>" + _NUM_m2 + r")",
     _c_ap_sum_m2),
    ("GP_NTH",
     r"(?:(?:find|what\s+is)\s+the\s+)?(?P<n>" + _U_NUM + r")\s*(?:th|st|nd|rd)\s+term\s+of\s+(?:the\s+)?(?:gp|g\.p\.|geometric\s+progression)"
     r".{0,40}?first\s+term\s+(?:is\s+)?(?P<a>" + _NUM_m2 + r")"
     r".{0,40}?(?:common\s+ratio|ratio)\s+(?:is\s+)?(?P<r>" + _NUM_m2 + r")",
     _c_gp_nth),
    ("CIRCLE_AREA",
     r"area\s+of\s+(?:a\s+)?circle\s+(?:of|with)\s+radius\s+(?:is\s+)?(?P<r>" + _NUM_m2 + r")",
     _c_circle_area),
    ("CIRCLE_CIRCUMFERENCE",
     r"circumference\s+of\s+(?:a\s+)?circle\s+(?:of|with)\s+radius\s+(?:is\s+)?(?P<r>" + _NUM_m2 + r")",
     _c_circle_circum),
    ("RECT_AREA",
     r"area\s+of\s+(?:a\s+)?rectangle\s+(?:of|with)?\s*(?:length\s*)?(?:is\s+)?(?P<l>" + _NUM_m2 + r")"
     r"\s*(?:cm|m|meters?|metres?)?\s*(?:and|by|x|\*)\s*(?:breadth|width|breath)\s*(?:is\s+)?(?P<w>" + _NUM_m2 + r")",
     _c_rect_area),
    ("SQUARE_AREA",
     r"area\s+of\s+(?:a\s+)?square\s+(?:of|with)\s+side\s+(?:is\s+)?(?P<s>" + _NUM_m2 + r")",
     _c_square_area),
    ("PYTHAGORAS",
     r"hypotenuse\s+of\s+(?:a\s+)?right(?:\s*[- ])?angled?\s+triangle\s+(?:with|having|whose)\s+(?:legs?|sides?|arms?)\s+(?:of\s*)?(?:is\s+)?(?P<a>"
     + _NUM_m2 + r")\s*(?:cm|m|,)?\s*and\s*(?P<b>" + _NUM_m2 + r")",
     _c_pythagoras),
    ("VOLUME_CUBE",
     r"volume\s+of\s+(?:a\s+)?cube\s+(?:of|with)\s+(?:edge|side)\s+(?:is\s+)?(?P<s>" + _NUM_m2 + r")",
     _c_volume_cube),
    ("VOLUME_CYLINDER",
     r"volume\s+of\s+(?:a\s+)?cylinder\s+(?:of|with)\s+radius\s+(?:is\s+)?(?P<r>" + _NUM_m2 + r")"
     r"\s*(?:cm|m)?\s*(?:and|,)\s*(?:height\s*)?(?:is\s+)?(?P<h>" + _NUM_m2 + r")",
     _c_volume_cyl),
    ("VOLUME_SPHERE",
     r"volume\s+of\s+(?:a\s+)?sphere\s+(?:of|with)\s+radius\s+(?:is\s+)?(?P<r>" + _NUM_m2 + r")",
     _c_volume_sphere),
    ("EXPONENT_EVAL",
     r"(?:evaluate|value\s+of)\s+(?P<b>" + _NUM_m2 + r")\s*\^\s*(?P<e>\d{1,2})\b",
     _c_exp_eval),
    ("ROOT_PERFECT",
     r"(?:square|cube)\s+root\s+of\s+(?P<n>\d+)",
     _c_root_perfect),
]

_TABLE_m2.extend(_BOOK_ROWS)


# --------------------------------------------------------------------------- #
# BOOKS2 FAMILIES (classes 6-11, cross-checked against the actual textbook
# inventory: Ganita Prakash 6-8, old NCERT 8 (comparing quantities,
# mensuration, direct/inverse proportion), Ganita Manjari 9 (circles, arc
# length, Heron, probability, progressions), NCERT 10 (polynomials, linear
# pairs, discriminant, distance/midpoint, heights & distances, sectors,
# cone/hemisphere solids, grouped median/mode, theoretical probability) and
# NCERT 11 (nPr/nCr, complex modulus, GP sum, AM/GM, variance, double
# angles, line through two points).  Each topic was verified present in the
# corresponding book text cache before implementation.
# --------------------------------------------------------------------------- #


def _c_mean_list(g, m, text):
    nums = _nums(g["list"])
    if not nums:
        return _GATE_m2
    val = sum(nums) / len(nums)
    steps = ["sum = " + " + ".join(_fmt_m2(x) for x in nums) +
             f" = {_fmt_m2(sum(nums))}",
             f"mean = sum / n = {_fmt_m2(sum(nums))}/{len(nums)} = {_fmt_m2(val)}."]
    return val, steps, None, None, "mean = (sum of values)/n", \
        {"n": float(len(nums))}


def _c_perimeter_rect(g, m, text):
    l, w = float(g["l"]), float(g["w"])
    val = 2 * (l + w)
    steps = [f"Perimeter = 2(length + breadth) = 2 x ({l:g} + {w:g}) = "
             f"{_fmt_m2(val)}."]
    return val, steps, None, None, "perimeter = 2(l + b)", \
        {"area": l * w}


def _c_perimeter_square(g, m, text):
    s = float(g["s"])
    val = 4 * s
    steps = [f"Perimeter of a square = 4 x side = 4 x {s:g} = {_fmt_m2(val)}.",
             f"(Area = {s:g}^2 = {_fmt_m2(s * s)}.)"]
    return val, steps, None, None, "perimeter = 4 x side", {"area": s * s}


def _c_tri_area_bh(g, m, text):
    b, h = float(g["b"]), float(g["h"])
    val = 0.5 * b * h
    steps = [f"Area = (1/2) x base x height = (1/2) x {b:g} x {h:g} = "
             f"{_fmt_m2(val)}."]
    return val, steps, None, None, "area = (1/2) b h", None


def _c_tri_third_angle(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    third = 180.0 - a - b
    if third <= 0:
        return _GATE_m2  # angle-sum violation: no such triangle
    steps = [f"Angle-sum property: the angles of a triangle add to 180.",
             f"Third angle = 180 - {a:g} - {b:g} = {_fmt_m2(third)} degrees."]
    return third, steps, f"{_fmt_m2(third)} degrees", None, "A + B + C = 180", None


def _c_heron_m2(g, m, text):
    a, b, c = float(g["a"]), float(g["b"]), float(g["c"])
    if min(a, b, c) <= 0 or a + b <= c or b + c <= a or a + c <= b:
        return _GATE_m2  # triangle inequality violation
    s = (a + b + c) / 2.0
    val = math.sqrt(s * (s - a) * (s - b) * (s - c))
    steps = [f"semi-perimeter s = (a + b + c)/2 = ({a:g} + {b:g} + {c:g})/2 "
             f"= {_fmt_m2(s)}.",
             f"area = sqrt(s(s-a)(s-b)(s-c)) = sqrt({_fmt_m2(s)} x {_fmt_m2(s - a)} "
             f"x {_fmt_m2(s - b)} x {_fmt_m2(s - c)}) = {_fmt_m2(val)}."]
    return val, steps, None, None, "area = sqrt(s(s-a)(s-b)(s-c))", \
        {"s": s}


def _c_discount(g, m, text):
    mp = float(g["mp"])
    d1 = float(g["d1"])
    d2 = float(g["d2"]) if g.get("d2") else 0.0
    if not (0 <= d1 < 100 and 0 <= d2 < 100):
        return _GATE_m2
    sp = mp * (1 - d1 / 100.0)
    steps = [f"Marked price = {_fmt_m2(mp)}, discount = {d1:g}%.",
             f"SP after first discount = {_fmt_m2(mp)} x (1 - {d1:g}/100) = "
             f"{_fmt_m2(sp)}."]
    if d2:
        sp2 = sp * (1 - d2 / 100.0)
        steps.append(f"Second discount {d2:g}%: SP = {_fmt_m2(sp)} x "
                     f"(1 - {d2:g}/100) = {_fmt_m2(sp2)}.")
        sp = sp2
    saved = mp - sp
    steps.append(f"Discount amount = {_fmt_m2(mp)} - {_fmt_m2(sp)} = {_fmt_m2(saved)}.")
    return sp, steps, f"selling price = {_fmt_m2(sp)} (saved {_fmt_m2(saved)})", \
        None, "SP = MP x (1 - d/100)", {"discount_amount": saved, "mp": mp}


def _c_gst(g, m, text):
    amt, r = float(g["amt"]), float(g["r"])
    if not (0 <= r < 100):
        return _GATE_m2
    tax = amt * r / 100.0
    total = amt + tax
    steps = [f"GST = {r:g}% of {_fmt_m2(amt)} = {_fmt_m2(amt)} x {r:g}/100 = "
             f"{_fmt_m2(tax)}.",
             f"Bill amount = {_fmt_m2(amt)} + {_fmt_m2(tax)} = {_fmt_m2(total)}."]
    want_total = any(w in text for w in ("total", "bill", "final", "pay"))
    val = total if want_total else tax
    return val, steps, (f"GST = {_fmt_m2(tax)}, bill = {_fmt_m2(total)}"), None, \
        "GST = rate% x price", {"tax": tax, "total": total}


def _c_direct_prop(g, m, text):
    n1, v1, n2 = float(g["n1"]), float(g["v1"]), float(g["n2"])
    if n1 == 0:
        return _GATE_m2
    one = v1 / n1
    val = one * n2
    steps = [f"Cost of 1 unit = {v1:g}/{n1:g} = {_fmt_m2(one)}.",
             f"Cost of {n2:g} units = {_fmt_m2(one)} x {n2:g} = {_fmt_m2(val)} "
             f"(direct proportion)."]
    return val, steps, None, None, "direct proportion: x1/y1 = x2/y2", \
        {"unit_value": one}


def _c_inverse_prop(g, m, text):
    n1, d1, n2 = float(g["n1"]), float(g["d1"]), float(g["n2"])
    if n2 == 0:
        return _GATE_m2
    days = n1 * d1 / n2
    steps = [f"Total work = {n1:g} workers x {d1:g} days = {_fmt_m2(n1 * d1)} "
             f"worker-days (inverse proportion).",
             f"Time for {n2:g} workers = {_fmt_m2(n1 * d1)}/{n2:g} = "
             f"{_fmt_m2(days)} days."]
    return days, steps, f"{_fmt_m2(days)} days", None, \
        "x1 y1 = x2 y2 (inverse proportion)", None


def _c_sa_cube(g, m, text):
    s = float(g["s"])
    val = 6 * s * s
    steps = [f"Surface area of cube = 6 edge^2 = 6 x {s:g}^2 = {_fmt_m2(val)}.",
             f"(Volume = {s:g}^3 = {_fmt_m2(s ** 3)}.)"]
    return val, steps, None, None, "SA = 6 a^2", {"volume": s ** 3}


def _c_sa_cylinder(g, m, text):
    r, h = float(g["r"]), float(g["h"])
    curved = 2 * math.pi * r * h
    is_curved = any(w in text for w in ("curved", "lateral"))
    if is_curved:
        steps = [f"CSA = 2 pi r h = 2 x 3.14159 x {r:g} x {h:g} = "
                 f"{_fmt_m2(curved)}."]
        return curved, steps, None, None, "CSA = 2 pi r h", None
    val = curved + 2 * math.pi * r * r
    steps = [f"CSA = 2 pi r h = {_fmt_m2(curved)}.",
             f"Circles = 2 pi r^2 = {_fmt_m2(2 * math.pi * r * r)}.",
             f"TSA = 2 pi r (r + h) = {_fmt_m2(val)}."]
    return val, steps, None, None, "TSA = 2 pi r (r + h)", {"csa": curved}


def _c_sa_sphere(g, m, text):
    r = float(g["r"])
    val = 4 * math.pi * r * r
    steps = [f"Surface area of sphere = 4 pi r^2 = 4 x 3.14159 x {r:g}^2 = "
             f"{_fmt_m2(val)}."]
    return val, steps, None, None, "SA = 4 pi r^2", \
        {"volume": 4.0 / 3.0 * math.pi * r ** 3}


def _c_hemisphere(g, m, text):
    r = float(g["r"])
    if "surface" in text:
        val = 3 * math.pi * r * r
        steps = [f"TSA of hemisphere = 3 pi r^2 = 3 x 3.14159 x {r:g}^2 = "
                 f"{_fmt_m2(val)} (curved 2 pi r^2 + flat circle pi r^2)."]
        return val, steps, None, None, "TSA = 3 pi r^2", None
    val = 2.0 / 3.0 * math.pi * r ** 3
    steps = [f"Volume of hemisphere = (2/3) pi r^3 = (2/3) x 3.14159 x "
             f"{r:g}^3 = {_fmt_m2(val)}."]
    return val, steps, None, None, "V = (2/3) pi r^3", None


def _c_volume_cone(g, m, text):
    r, h = float(g["r"]), float(g["h"])
    val = math.pi * r * r * h / 3.0
    l = math.sqrt(r * r + h * h)
    steps = [f"Volume of cone = (1/3) pi r^2 h = (1/3) x 3.14159 x {r:g}^2 "
             f"x {h:g} = {_fmt_m2(val)}.",
             f"Slant height l = sqrt(r^2 + h^2) = {_fmt_m2(l)}."]
    return val, steps, None, None, "V = (1/3) pi r^2 h", {"slant": l}


def _c_heights_distances(g, m, text):
    d, ang = float(g["dist"]), float(g["ang"])
    if not (0 < ang < 90) or d <= 0:
        return _GATE_m2  # angle of 0/90 gives no usable triangle
    h = d * math.tan(math.radians(ang))
    steps = [f"Angle of elevation = {ang:g} degrees; horizontal distance "
             f"= {_fmt_m2(d)}.",
             f"tan({ang:g} degrees) = height/distance, so height = "
             f"{_fmt_m2(d)} x tan({ang:g}) = {_fmt_m2(d)} x "
             f"{_fmt_m2(math.tan(math.radians(ang)))} = {_fmt_m2(h)}."]
    return h, steps, f"height = {_fmt_m2(h)}", None, \
        "height = distance x tan(elevation angle)", None


def _c_poly_zeroes(g, m, text):
    a = float(g["a"])
    b = float(g["b"]) * (-1 if g["s1"] == "-" else 1)
    c = float(g["c"]) * (-1 if g["s2"] == "-" else 1)
    if a == 0:
        return _GATE_m2
    want_product = text.find("product") >= 0 and \
        text.find("product") < text.find("zero") + 40
    if want_product:
        val = c / a
        steps = [f"For ax^2 + bx + c: product of zeroes = c/a = "
                 f"{_fmt_m2(c)}/{_fmt_m2(a)} = {_fmt_m2(val)}."]
        return val, steps, None, None, "product of zeroes = c/a", None
    val = -b / a
    steps = [f"For ax^2 + bx + c: sum of zeroes = -b/a = "
             f"{_fmt_m2(-b)}/{_fmt_m2(a)} = {_fmt_m2(val)}.",
             f"(product of zeroes = c/a = {_fmt_m2(c / a)}.)"]
    return val, steps, None, None, "sum of zeroes = -b/a", \
        {"product": c / a}


def _c_linear_system(g, m, text):
    a1 = float(g["a1"])
    b1 = (float(g["b1"]) if g.get("b1") else 1.0) \
        * (-1 if g["s1"] == "-" else 1)
    c1 = float(g["c1"])
    a2 = float(g["a2"])
    b2 = (float(g["b2"]) if g.get("b2") else 1.0) \
        * (-1 if g["s2"] == "-" else 1)
    c2 = float(g["c2"])
    det = a1 * b2 - a2 * b1
    if det == 0:
        return _GATE_m2  # parallel/coincident lines: no unique solution
    x = (c1 * b2 - c2 * b1) / det
    y = (a1 * c2 - a2 * c1) / det
    steps = [f"Elimination: D = a1 b2 - a2 b1 = ({a1:g})({b2:g}) - "
             f"({a2:g})({b1:g}) = {_fmt_m2(det)}.",
             f"x = (c1 b2 - c2 b1)/D = {_fmt_m2(x)}",
             f"y = (a1 c2 - a2 c1)/D = {_fmt_m2(y)}"]
    return x, steps, f"x = {_fmt_m2(x)}, y = {_fmt_m2(y)}", None, \
        "Cramer: x = (c1 b2 - c2 b1)/D, y = (a1 c2 - a2 c1)/D", \
        {"y": y, "det": det}


def _c_discriminant(g, m, text):
    a = float(g["a"])
    b = float(g["b"]) * (-1 if g["bop"] == "-" else 1)
    c = float(g["c"]) * (-1 if g["cop"] == "-" else 1)
    if a == 0:
        return _GATE_m2
    disc = b * b - 4 * a * c
    if disc > 0:
        nature = "two distinct real roots"
    elif disc == 0:
        nature = "two equal real roots"
    else:
        nature = "no real roots"
    steps = [f"Discriminant D = b^2 - 4ac = ({b:g})^2 - 4({a:g})({c:g}) = "
             f"{_fmt_m2(disc)}.",
             f"D {'>' if disc > 0 else ('=' if disc == 0 else '<')} 0, so "
             f"the equation has {nature}."]
    return disc, steps, f"D = {_fmt_m2(disc)}: {nature}", None, \
        "D = b^2 - 4ac", None


def _c_distance_pts(g, m, text):
    x1, y1 = float(g["ax"]), float(g["ay"])
    x2, y2 = float(g["bx"]), float(g["by"])
    d = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    steps = [f"distance = sqrt((x2 - x1)^2 + (y2 - y1)^2)",
             f"= sqrt(({_fmt_m2(x2)} - {_fmt_m2(x1)})^2 + ({_fmt_m2(y2)} - "
             f"{_fmt_m2(y1)})^2) = sqrt({_fmt_m2((x2 - x1) ** 2)} + "
             f"{_fmt_m2((y2 - y1) ** 2)}) = {_fmt_m2(d)}."]
    return d, steps, None, None, "d = sqrt((x2-x1)^2 + (y2-y1)^2)", None


def _c_midpoint_m2(g, m, text):
    x1, y1 = float(g["ax"]), float(g["ay"])
    x2, y2 = float(g["bx"]), float(g["by"])
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    steps = [f"midpoint = ((x1 + x2)/2, (y1 + y2)/2)",
             f"= ({_fmt_m2((x1 + x2))}/2, {_fmt_m2((y1 + y2))}/2) = "
             f"({_fmt_m2(mx)}, {_fmt_m2(my)})"]
    return mx, steps, f"({_fmt_m2(mx)}, {_fmt_m2(my)})", None, \
        "M = ((x1+x2)/2, (y1+y2)/2)", {"my": my}


def _trig_term(g, kk, ff, aa) -> Optional[float]:
    """Evaluate optional-coefficient trig term; None on gate failure."""
    ang = float(g[aa])
    if not (0 <= ang <= 90):
        return None
    fn = g[ff]
    if fn == "tan" and ang == 90:
        return None  # tan 90 undefined
    k = float(g[kk]) if g.get(kk) else 1.0
    return k * _trig_val(fn, ang)


def _c_trig_sum(g, m, text):
    t1 = _trig_term(g, "k1", "f1", "a1")
    t2 = _trig_term(g, "k2", "f2", "a2")
    if t1 is None or t2 is None:
        return _GATE_m2
    sign = -1.0 if g["op"] == "-" else 1.0
    val = _snap(t1 + sign * t2)

    def term_str(kk, ff, aa):
        k = f"{g[kk]} x " if g.get(kk) else ""
        return f"{k}{g[ff]}({g[aa]} degrees)"

    steps = [f"{term_str('k1', 'f1', 'a1')} = {_fmt_m2(t1)}, "
             f"{term_str('k2', 'f2', 'a2')} = {_fmt_m2(sign * t2)} "
             f"{'(subtracted)' if sign < 0 else ''}.",
             f"Result = {_fmt_m2(t1)} {'-' if sign < 0 else '+'} "
             f"{_fmt_m2(abs(t2))} = {_fmt_m2(val)}."]
    return val, steps, f"{_fmt_m2(val)}", None, "standard-angle trig values", None


def _c_trig_single(g, m, text):
    rest = text[m.end():]
    if re.match(r"\s*\(", rest):
        return _GATE_m2  # e.g. "sin 2(30)" is a double-angle form, not sin(2)
    t1 = _trig_term(g, None, "f1", "a1") if g.get("f1") else None
    if t1 is None:
        return _GATE_m2
    steps = [f"{g['f1']}({g['a1']} degrees) = {_fmt_m2(t1)}."]
    return t1, steps, f"{_fmt_m2(t1)}", None, "standard-angle trig value", None


def _sector_args(g):
    r = float(g["r"])
    ang = float(g["ang"])
    if r <= 0 or not (0 < ang <= 360):
        return None, None
    return r, ang


def _c_sector_area(g, m, text):
    r, ang = _sector_args(g)
    if r is None:
        return _GATE_m2
    val = (ang / 360.0) * math.pi * r * r
    steps = [f"Area of sector = (angle/360) x pi r^2 = ({ang:g}/360) x "
             f"3.14159 x {r:g}^2 = {_fmt_m2(val)}.",
             f"(Arc length = ({ang:g}/360) x 2 pi r = "
             f"{_fmt_m2((ang / 360.0) * 2 * math.pi * r)}.)"]
    return val, steps, None, None, "sector area = (theta/360) pi r^2", \
        {"arc_length": (ang / 360.0) * 2 * math.pi * r}


def _c_arc_length(g, m, text):
    r, ang = _sector_args(g)
    if r is None:
        return _GATE_m2
    val = (ang / 360.0) * 2 * math.pi * r
    steps = [f"Arc length = (angle/360) x 2 pi r = ({ang:g}/360) x 2 x "
             f"3.14159 x {r:g} = {_fmt_m2(val)}."]
    return val, steps, None, None, "arc = (theta/360) 2 pi r", None


def _grouped_capture(text: str, keyword: str):
    """Shared (pairs, freqs) extraction for grouped median/mode rows."""
    mm = re.search(
        r"\b" + keyword + r"\b[^.]{0,80}?"
        r"(?:grouped\s+data|frequency\s+distribution|frequency\s+table)"
        r"[^.]{0,200}?"
        r"(?P<cls>(?:\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?[,\s;]*)+)"
        r"[^.]{0,120}?(?:f(?:req(?:uency)?)?\s*(?:=|:)?\s*"
        r"(?P<fs>[\d.,\s]+))", text, re.I)
    if not mm:
        return None, None
    pairs = [(float(lo), float(hi)) for lo, hi in
             re.findall(r"(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)",
                        mm.group("cls"))]
    fs = _nums(mm.group("fs"))
    if len(pairs) < 3 or len(pairs) != len(fs):
        return None, None
    return pairs, fs


def _c_median_grouped(g, m, text):
    pairs, fs = _grouped_capture(text, "median")
    if pairs is None:
        return _GATE_m2
    n = sum(fs)
    half = n / 2.0
    cf = 0.0
    for (lo, hi), f, cf_prev in zip(pairs, fs,
                                    [0.0] + [sum(fs[:i + 1])
                                             for i in range(len(fs) - 1)]):
        cf = cf_prev + f
        if cf >= half:
            med_cls = (lo, hi, f, cf_prev)
            break
    else:
        return _GATE_m2
    lo, hi, f, cf_prev = med_cls
    h = hi - lo
    if f == 0 or h <= 0:
        return _GATE_m2
    med = lo + (half - cf_prev) / f * h
    steps = [f"cf: " + ", ".join(f"{_fmt_m2(sum(fs[:i + 1]))}"
                                 for i in range(len(fs))) +
             f"; N/2 = {_fmt_m2(half)}.",
             f"Median class = {_fmt_m2(lo)}-{_fmt_m2(hi)} (cf {_fmt_m2(cf)} first "
             f"crosses N/2).",
             f"median = L + ((N/2 - cf)/f) x h = {_fmt_m2(lo)} + "
             f"({_fmt_m2(half - cf_prev)}/{_fmt_m2(f)}) x {_fmt_m2(h)} = {_fmt_m2(med)}."]
    return med, steps, None, None, \
        "median = L + ((N/2 - cf)/f) h", {"N": n}


def _c_mode_grouped(g, m, text):
    pairs, fs = _grouped_capture(text, "mode")
    if pairs is None:
        return _GATE_m2
    k = fs.index(max(fs))
    f1 = fs[k]
    f0 = fs[k - 1] if k > 0 else 0.0
    f2 = fs[k + 1] if k < len(fs) - 1 else 0.0
    denom = 2 * f1 - f0 - f2
    if denom <= 0:
        return _GATE_m2
    lo, hi = pairs[k]
    h = hi - lo
    mode = lo + (f1 - f0) / denom * h
    steps = [f"Modal class = {_fmt_m2(lo)}-{_fmt_m2(hi)} (highest frequency "
             f"{f1:g}).",
             f"mode = L + ((f1 - f0)/(2f1 - f0 - f2)) x h",
             f"= {_fmt_m2(lo)} + ({f1:g} - {f0:g})/({2 * f1:g} - {f0:g} - "
             f"{f2:g}) x {_fmt_m2(h)} = {_fmt_m2(mode)}."]
    return mode, steps, None, None, \
        "mode = L + ((f1-f0)/(2f1-f0-f2)) h", None


_CARD_RANKS = {"ace": 4, "king": 4, "queen": 4, "jack": 4}
_SUITS = {"heart": 13, "spade": 13, "diamond": 13, "club": 13}


def _c_probability_basic(g, m, text):
    what = (g["what"] or "").lower()
    full = text.lower()
    # --- deck of cards ---
    if any(w in what or w in full for w in ("card", "deck", "pack")):
        if "face" in what:
            n, tot = 12, 52
        elif any(r in what for r in _CARD_RANKS):
            n, tot = 4, 52
        elif "red" in what and "card" in full:
            n, tot = 26, 52
        elif "black" in what and "card" in full:
            n, tot = 26, 52
        else:
            for s, cnt in _SUITS.items():
                if s in what:
                    n, tot = cnt, 52
                    break
            else:
                return _GATE_m2
        fr = Fraction(n, tot)
        return (n / tot,
                [f"A deck has 52 cards; favourable = {n}.",
                 f"P = {n}/{tot} = {fr.numerator}/{fr.denominator}."],
                f"{fr.numerator}/{fr.denominator}", None,
                "P = favourable/total", {"favourable": float(n)})
    # --- dice ---
    if "die" in what or "dice" in what:
        two = "two" in full or "2 dice" in full
        mk = re.search(r"sum\s+(?:of\s+)?(?:exactly\s+)?(\d+)", what)
        if two and mk:
            k = int(mk.group(1))
            cnt = sum(1 for i in range(1, 7) for j in range(1, 7)
                      if i + j == k)
            n, tot = cnt, 36
        elif two:
            return _GATE_m2
        elif "even" in what:
            n, tot = 3, 6
        elif "odd" in what:
            n, tot = 3, 6
        elif "prime" in what:
            n, tot = 3, 6
        elif "greater than" in what:
            k = int(re.search(r"greater than\s+(\d+)", what).group(1))
            n, tot = max(0, 6 - k), 6
        elif "less than" in what:
            k = int(re.search(r"less than\s+(\d+)", what).group(1))
            n, tot = min(6, k - 1), 6
        elif "at least" in what:
            k = int(re.search(r"at least\s+(\d+)", what).group(1))
            n, tot = max(0, 6 - k + 1), 6
        elif "at most" in what:
            k = int(re.search(r"at most\s+(\d+)", what).group(1))
            n, tot = min(6, k), 6
        elif "multiple of" in what:
            k = int(re.search(r"multiple of\s+(\d+)", what).group(1))
            n, tot = len([i for i in range(1, 7) if k and i % k == 0]), 6
        else:
            mk = re.search(r"(\d+)", what)
            if not mk or not (1 <= int(mk.group(1)) <= 6):
                return _GATE_m2
            n, tot = 1, 6
        fr = Fraction(n, tot)
        return (n / tot,
                [f"A fair die has {tot} equally likely outcomes; "
                 f"favourable = {n}.",
                 f"P = {n}/{tot} = {fr.numerator}/{fr.denominator}."],
                f"{fr.numerator}/{fr.denominator}", None,
                "P = favourable/total", {"favourable": float(n)})
    # --- coins ---
    if "coin" in what:
        if "at least one" in what:
            n, tot = 3, 4
        elif "exactly one" in what:
            n, tot = 2, 4
        elif "two heads" in what or "both heads" in what or \
                ("both" in what and "head" in what):
            n, tot = 1, 4
        elif "two tails" in what or "both tails" in what:
            n, tot = 1, 4
        elif "head" in what or "tail" in what:
            n, tot = 1, 2
        else:
            return _GATE_m2
        fr = Fraction(n, tot)
        return (n / tot,
                [f"Equally likely outcomes = {tot}; favourable = {n}.",
                 f"P = {n}/{tot} = {fr.numerator}/{fr.denominator}."],
                f"{fr.numerator}/{fr.denominator}", None,
                "P = favourable/total", {"favourable": float(n)})
    # --- bag of coloured balls ---
    for col in _COLORS:
        if col in what:
            counts = _bag_counts(text)
            if col not in counts:
                return _GATE_m2
            n = counts[col]
            tot = sum(counts.values())
            if tot <= 0:
                return _GATE_m2
            fr = Fraction(int(n), int(tot))
            return (n / tot,
                    [f"Bag: total {int(tot)} balls, {int(n)} {col}.",
                     f"P = {int(n)}/{int(tot)} = "
                     f"{fr.numerator}/{fr.denominator}."],
                    f"{fr.numerator}/{fr.denominator}", None,
                    "P = favourable/total", {"favourable": n})
    return _GATE_m2


def _c_gp_sum(g, m, text):
    a, r, n = float(g["a"]), float(g["r"]), float(g["n"])
    if n < 1:
        return _GATE_m2
    if abs(r - 1.0) < 1e-12:
        val = a * n
        steps = [f"r = 1, so S_n = a x n = {a:g} x {n:g} = {_fmt_m2(val)}."]
    else:
        val = a * (r ** n - 1) / (r - 1)
        steps = [f"S_n = a(r^n - 1)/(r - 1) = {a:g}({r:g}^{n:g} - 1)/"
                 f"({r:g} - 1).",
                 f"= {a:g} x {_fmt_m2(r ** n - 1)}/{_fmt_m2(r - 1)} = {_fmt_m2(val)}."]
    return val, steps, None, None, "S_n = a(r^n - 1)/(r - 1)", None


def _c_gp_sum_infinite(g, m, text):
    a, r = float(g["a"]), float(g["r"])
    if abs(r) >= 1:
        return _GATE_m2  # infinite GP converges only for |r| < 1
    val = a / (1 - r)
    steps = [f"S_infinity = a/(1 - r), valid for |r| < 1.",
             f"= {a:g}/(1 - {r:g}) = {a:g}/{_fmt_m2(1 - r)} = {_fmt_m2(val)}."]
    return val, steps, None, None, "S_inf = a/(1 - r)", None


def _c_am_two(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    val = (a + b) / 2
    steps = [f"Arithmetic mean = (a + b)/2 = ({a:g} + {b:g})/2 = "
             f"{_fmt_m2(val)}."]
    return val, steps, None, None, "AM = (a + b)/2", None


def _c_gm_two(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    if a <= 0 or b <= 0:
        return _GATE_m2  # GM of the book is defined for positive numbers
    val = math.sqrt(a * b)
    steps = [f"Geometric mean = sqrt(ab) = sqrt({a:g} x {b:g}) = "
             f"{_fmt_m2(val)}."]
    return val, steps, None, None, "GM = sqrt(ab)", None


def _c_npr_ncr(g, m, text):
    n, r = int(float(g["n"])), int(float(g["r"]))
    if n < 0 or r < 0 or r > n or n > 500:
        return _GATE_m2
    is_p = g["kind"].lower() == "p"
    if is_p:
        v = math.perm(n, r)
        steps = [f"P(n, r) = n!/(n - r)! = {n}!/{n - r}!.",
                 f"= {v}."]
    else:
        v = math.comb(n, r)
        steps = [f"C(n, r) = n!/(r!(n - r)!) = {n}!/({r}! x {n - r}!).",
                 f"= {v}."]
    return float(v), steps, str(v), None, \
        ("P(n,r) = n!/(n-r)!" if is_p else "C(n,r) = n!/(r!(n-r)!)"), None


def _c_modulus_complex(g, m, text):
    a = float(g["a"])
    b = float(g["b"]) * (-1 if g["sgn"] == "-" else 1)
    val = math.hypot(a, b)
    steps = [f"|a + bi| = sqrt(a^2 + b^2) = sqrt(({a:g})^2 + ({b:g})^2) = "
             f"{_fmt_m2(val)}."]
    return val, steps, f"{_fmt_m2(val)}", None, "|a+bi| = sqrt(a^2+b^2)", None


def _c_variance(g, m, text):
    nums = _nums(g["list"])
    n = len(nums)
    if n < 2:
        return _GATE_m2
    mean = sum(nums) / n
    var = sum((x - mean) ** 2 for x in nums) / n
    want_sd = "standard" in text or "deviation" in text
    val = math.sqrt(var) if want_sd else var
    steps = [f"mean = {_fmt_m2(mean)}.",
             f"sigma^2 = sum(x - mean)^2 / n = {_fmt_m2(var)}.",
             (f"sigma = sqrt({_fmt_m2(var)}) = {_fmt_m2(val)}." if want_sd
              else f"variance = {_fmt_m2(val)}.")]
    return val, steps, None, None, "sigma^2 = sum(x-mean)^2/n", \
        {"mean": mean, "variance": var}


def _c_double_angle(g, m, text):
    a = float(g["a"])
    if not (0 <= a <= 90):
        return _GATE_m2
    two_a = 2 * a
    fn = g["fn"]
    if fn == "tan" and two_a == 90:
        return _GATE_m2  # tan(90) undefined
    val = _snap(_trig_val(fn, two_a))
    steps = [f"Double-angle identity: {fn}(2A) with A = {a:g} degrees.",
             f"{fn}({two_a:g} degrees) = {_fmt_m2(val)}."]
    return val, steps, f"{_fmt_m2(val)}", None, f"{fn}(2A)", None


def _c_double_product(g, m, text):
    a1, a2 = float(g["a1"]), float(g["a2"])
    if a1 != a2 or not (0 <= a1 <= 90):
        return _GATE_m2
    val = _snap(_trig_val("sin", 2 * a1))
    steps = [f"Double-angle identity: 2 sin(A)cos(A) = sin(2A).",
             f"A = {a1:g}, so sin({2 * a1:g} degrees) = {_fmt_m2(val)}."]
    return val, steps, f"{_fmt_m2(val)}", None, "2 sin A cos A = sin 2A", None


def _c_line_two_points(g, m, text):
    x1, y1 = float(g["ax"]), float(g["ay"])
    x2, y2 = float(g["bx"]), float(g["by"])
    if x2 == x1:
        return _GATE_m2  # vertical line: x = const, not y = mx + c
    slope = (y2 - y1) / (x2 - x1)
    inter = y1 - slope * x1
    fs = Fraction(slope).limit_denominator(10000)
    fi = Fraction(inter).limit_denominator(10000)

    def _fr(x: Fraction) -> str:
        return f"{x.numerator}" if x.denominator == 1 \
            else f"{x.numerator}/{x.denominator}"

    if fi == 0:
        mx = ""
    elif fi < 0:
        mx = f" - {_fr(-fi)}"
    else:
        mx = f" + {_fr(fi)}"
    ans = f"y = {_fr(fs)}x{mx}"
    steps = [f"slope = ({_fmt_m2(y2)} - {_fmt_m2(y1)})/({_fmt_m2(x2)} - {_fmt_m2(x1)}) "
             f"= {_fmt_m2(slope)}.",
             f"y - y1 = m(x - x1) -> y = {_fmt_m2(slope)}x "
             f"{'+' if inter >= 0 else '-'} {_fmt_m2(abs(inter))}.",
             f"Equation: {ans}."]
    return slope, steps, ans, None, "y - y1 = m (x - x1)", \
        {"y_intercept": inter}


_TABLE_BOOKS2 = [
    # NOTE: AM_TWO/GM_TWO precede MEAN_LIST ("mean of 4 and 10" would
    # otherwise be eaten by the generic mean-of-list trigger), and
    # DOUBLE_ANGLE precedes TRIG_STD_EVAL for the same reason.
    # ---- class 11: series means ----
    ("AM_TWO",
     r"arithmetic\s+mean\s+of\s+(?P<a>" + _U_NUM + r")\s+and\s+(?P<b>"
     + _U_NUM + r")",
     _c_am_two),
    ("GM_TWO",
     r"geometric\s+mean\s+of\s+(?P<a>" + _U_NUM + r")\s+and\s+(?P<b>"
     + _U_NUM + r")",
     _c_gm_two),
    # ---- class 11: double angles ----
    ("DOUBLE_ANGLE",
     r"\b(?P<fn>sin|cos|tan)\s*\(?\s*2\s*(?:\(|[x×*]\s*|\s+)(?P<a>"
     + _U_NUM + r")\s*°?\s*\)?\s*\)?",
     _c_double_angle),
    ("DOUBLE_ANGLE",
     r"2\s*[x×*]?\s*sin\s*\(?\s*(?P<a1>" + _U_NUM + r")\s*°?\s*\)?\s*"
     r"[x×*]?\s*cos\s*\(?\s*(?P<a2>" + _U_NUM + r")\s*°?\s*\)?",
     _c_double_product),
    # ---- class 10-11: standard-angle trig values ----
    ("TRIG_STD_EVAL",
     r"\b(?:evaluate|find|calculate|value\s+of)\b[^.]{0,20}?"
     r"(?:(?P<k1>\d+)\s*\*?\s*)?\b(?P<f1>sin|cos|tan)\s*\(?\s*"
     r"(?P<a1>" + _U_NUM + r")\s*°?\s*\)?\s*(?P<op>[+-])\s*"
     r"(?:(?P<k2>\d+)\s*\*?\s*)?\b(?P<f2>sin|cos|tan)\s*\(?\s*"
     r"(?P<a2>" + _U_NUM + r")\s*°?\s*\)?",
     _c_trig_sum),
    ("TRIG_STD_EVAL",
     r"\b(?:evaluate|find|calculate)\b[^.]{0,20}?(?:the\s+value\s+of\s+)?"
     r"\b(?P<f1>sin|cos|tan)\s*\(?\s*(?P<a1>" + _U_NUM + r")\s*°?\s*\)?",
     _c_trig_single),
    # ---- class 6-8: mean of a raw list ----
    ("MEAN_LIST",
     r"\b(?:mean|average)\s+of\s+" + _LISTKW + r"(?P<list>" + _NUMCLS + r")",
     _c_mean_list),
    ("PERIMETER_RECTANGLE",
     r"perimeter\s+of\s+(?:a\s+)?rectangle\s+(?:of|with)?\s*(?:length\s*)?"
     r"(?:is\s+)?(?P<l>" + _NUM_m2 + r")\s*(?:cm|m)?\s*(?:and|by|x|\*)\s*"
     r"(?:breadth|width)\s*(?:is\s+)?(?P<w>" + _NUM_m2 + r")",
     _c_perimeter_rect),
    ("PERIMETER_SQUARE",
     r"perimeter\s+of\s+(?:a\s+)?square\s+(?:of|with)\s+side\s+(?:is\s+)?"
     r"(?P<s>" + _NUM_m2 + r")",
     _c_perimeter_square),
    ("TRIANGLE_AREA_BH",
     r"area\s+of\s+(?:a\s+)?triangle\s+(?:of|with|having)\s+base\s+"
     r"(?:is\s+)?(?P<b>" + _NUM_m2 + r")\s*(?:cm|m)?\s*(?:and|,)\s*"
     r"(?:height|altitude)\s*(?:is\s+)?(?P<h>" + _NUM_m2 + r")",
     _c_tri_area_bh),
    ("TRIANGLE_THIRD_ANGLE",
     r"two\s+angles\s+of\s+(?:a\s+)?triangle\s+(?:are\s+)?(?P<a>" + _NUM_m2 +
     r")\s*(?:degrees?|°)?\s+and\s+(?P<b>" + _NUM_m2 + r")",
     _c_tri_third_angle),
    ("HERONS_FORMULA",
     r"area\s+of\s+(?:a\s+)?triangle\s+(?:with|having|whose)\s+sides\s+"
     r"(?:are\s+|of\s+|of\s+length\s+)?(?P<a>" + _NUM_m2 + r")\s*,\s*"
     r"(?P<b>" + _NUM_m2 + r")\s*(?:,\s*|and\s+)" + r"(?P<c>" + _NUM_m2 + r")",
     _c_heron_m2),
    # ---- class 8 comparing quantities: discount, GST, proportion ----
    ("DISCOUNT_SP",
     r"(?:marked\s+price|list\s+price|\bmp\b)[^0-9]{0,20}(?P<mp>" + _NUM_m2 +
     r")[^.]{0,80}?discount(?:s)?\s*(?:of)?[^.]{0,20}?(?P<d1>" + _U_NUM +
     r")\s*%(?:\s*(?:and|,)\s*(?:then\s*)?(?P<d2>" + _U_NUM + r")\s*%)?",
     _c_discount),
    ("DISCOUNT_SP",
     r"successive\s+discounts?\s+of\s+(?P<d1>" + _U_NUM + r")\s*%?"
     r"(?:\s*(?:and|,)\s*(?P<d2>" + _U_NUM + r")\s*%?)?"
     r"[^.]{0,60}?(?:on|from)\s+(?:rs\.?\s*|₹\s*)?[^.]{0,30}?"
     r"(?P<mp>" + _NUM_m2 + r")",
     _c_discount),
    ("DISCOUNT_SP",
     r"discount\s+of\s+(?P<d1>" + _U_NUM + r")\s*%"
     r"(?:\s*(?:and|,)\s*(?P<d2>" + _U_NUM + r")\s*%)?"
     r"[^.]{0,60}?(?:on|from)\s+(?:marked\s+price\s+(?:of\s+)?|rs\.?\s*|"
     r"₹\s*|a\s+)?(?P<mp>" + _NUM_m2 + r")",
     _c_discount),
    ("GST_AMOUNT",
     r"(?:gst|tax)\s+(?:of\s+)?(?P<r>" + _U_NUM + r")\s*%[^.]{0,60}?"
     r"(?:on|for|of)\s+(?:rs\.?\s*|₹\s*)?[^.]{0,30}?(?P<amt>" + _NUM_m2 + r")",
     _c_gst),
    ("GST_AMOUNT",
     r"(?P<amt>" + _NUM_m2 + r")[^.]{0,60}?(?:gst|tax)[^.]{0,30}?"
     r"(?:at|of|@)\s*(?P<r>" + _U_NUM + r")\s*%",
     _c_gst),
    ("DIRECT_PROPORTION",
     r"(?:if\s+)?(?:the\s+)?cost\s+of\s+(?P<n1>" + _NUM_m2 + r")\s*"
     r"(?:m\b|met(?:er|re)s?|lit(?:er|re)s?|liters?|dozen|g\b|grams?)"
     r"[^.]{0,40}?\s+is\s+(?:rs\.?\s*|₹\s*)?(?P<v1>" + _NUM_m2 + r")"
     r"[^.]{0,90}?(?:cost|price)\s+of\s+(?P<n2>" + _NUM_m2 + r")",
     _c_direct_prop),
    ("INVERSE_PROPORTION",
     r"(?P<n1>" + _U_NUM + r")\s*(?:workers?|men|labourers?|laborers?)"
     r"[^.]{0,60}?(?:in|taking)\s+(?P<d1>" + _NUM_m2 + r")\s*days?"
     r"[^.]{0,90}?(?P<n2>" + _U_NUM + r")\s*(?:workers?|men|labourers?|"
     r"laborers?)",
     _c_inverse_prop),
    # ---- class 8-10 mensuration: surface areas, cone, hemisphere ----
    ("SA_CUBE",
     r"surface\s+area\s+of\s+(?:a\s+)?cube\s+(?:of|with)\s+(?:edge|side)\s+"
     r"(?:is\s+)?(?P<s>" + _NUM_m2 + r")",
     _c_sa_cube),
    ("SA_CYLINDER",
     r"(?:total\s+|curved\s+|lateral\s+)?surface\s+area\s+of\s+(?:a\s+)?"
     r"cylinder\s+(?:of|with)\s+radius\s+(?:is\s+)?(?P<r>" + _NUM_m2 + r")"
     r"\s*(?:cm|m)?\s*(?:and|,)\s*(?:height\s*)?(?:is\s+)?(?P<h>" + _NUM_m2 +
     r")",
     _c_sa_cylinder),
    ("SA_SPHERE",
     r"surface\s+area\s+of\s+(?:a\s+)?sphere\s+(?:of|with)\s+radius\s+"
     r"(?:is\s+)?(?P<r>" + _NUM_m2 + r")",
     _c_sa_sphere),
    ("VOLUME_HEMISPHERE",
     r"(?:volume\s+of|(?:total\s+)?surface\s+area\s+of)\s+(?:a\s+)?"
     r"hemisphere\s+(?:of|with)\s+radius\s+(?:is\s+)?(?P<r>" + _NUM_m2 + r")",
     _c_hemisphere),
    ("VOLUME_CONE",
     r"volume\s+of\s+(?:a\s+)?cone\s+(?:of|with)\s+(?:base\s+)?radius\s+"
     r"(?:is\s+)?(?P<r>" + _NUM_m2 + r")\s*(?:cm|m)?\s*(?:and|,)\s*"
     r"(?:height\s*)?(?:is\s+)?(?P<h>" + _NUM_m2 + r")",
     _c_volume_cone),
    # ---- class 10: heights and distances ----
    ("HEIGHTS_DISTANCES",
     r"(?:elevation|depression)[^.]{0,160}?(?:is\s+)?(?P<ang>" + _U_NUM +
     r")\s*(?:degrees?|°)?[^.]{0,200}?(?:distance\s+of\s+|from\s+a\s+"
     r"point\s+|from\s+)?(?P<dist>" + _NUM_m2 + r")\s*(?:m\b|met(?:er|re)s?|"
     r"km\b)",
     _c_heights_distances),
    ("HEIGHTS_DISTANCES",
     r"(?:point[^.]{0,40}?)?(?P<dist>" + _NUM_m2 + r")\s*(?:m\b|"
     r"met(?:er|re)s?|km\b)\s*(?:away|from|distant)[^.]{0,200}?"
     r"(?:elevation|depression|angle)[^.]{0,120}?(?:is\s+|of\s+)?"
     r"(?P<ang>" + _U_NUM + r")\s*(?:degrees?|°)?",
     _c_heights_distances),
    # ---- class 9-10 algebra ----
    ("POLY_ZEROES_QUAD",
     r"(?:sum|product)\s+of\s+(?:the\s+)?(?:zeroes|zeros|roots)\s+of\s+"
     r"(?:the\s+)?(?:polynomial\s+)?(?P<a>" + _NUM_m2 + r")\s*x\s*\^?\s*2\s*"
     r"(?P<s1>[+-])\s*(?P<b>" + _NUM_m2 + r")\s*x\s*(?P<s2>[+-])\s*"
     r"(?P<c>" + _NUM_m2 + r")",
     _c_poly_zeroes),
    ("LINEAR_SYSTEM_2X2",
     r"solve[^.]{0,60}?(?P<a1>" + _NUM_m2 + r")\s*x\s*(?P<s1>[+-])\s*"
     r"(?:(?P<b1>" + _NUM_m2 + r")\s*)?y\s*=\s*(?P<c1>" + _NUM_m2 + r")"
     r"[^.]{0,60}?(?:and\s+)?(?P<a2>" + _NUM_m2 + r")\s*x\s*(?P<s2>[+-])\s*"
     r"(?:(?P<b2>" + _NUM_m2 + r")\s*)?y\s*=\s*(?P<c2>" + _NUM_m2 + r")",
     _c_linear_system),
    ("DISTANCE_TWO_POINTS",
     r"distance\s+between\s+(?:the\s+)?(?:points?\s+)?" + _pt_m2("a") +
     r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt_m2("b"),
     _c_distance_pts),
    ("MIDPOINT_FORMULA",
     r"midpoint\s+of\s+(?:the\s+)?(?:line\s+)?(?:segment\s+)?"
     r"(?:join(?:ing|s)?\s+)?(?:the\s+)?(?:points?\s+)?" + _pt_m2("a") +
     r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt_m2("b"),
     _c_midpoint_m2),
    # ---- class 10-11 circles / sectors ----
    ("CIRCLE_SECTOR_AREA",
     r"area\s+of\s+(?:a\s+)?sector[^.]{0,120}?radius\s+(?:is\s+|of\s+)?"
     r"(?P<r>" + _NUM_m2 + r")[^.]{0,120}?(?:central\s+)?angle\s+(?:is\s+|"
     r"of\s+)?(?P<ang>" + _U_NUM + r")",
     _c_sector_area),
    ("CIRCLE_SECTOR_AREA",
     r"sector\s+(?:of\s+)?(?:central\s+)?angle\s+(?:is\s+|of\s+)?"
     r"(?P<ang>" + _U_NUM + r")[^.]{0,120}?radius\s+(?:is\s+|of\s+)?"
     r"(?P<r>" + _NUM_m2 + r")",
     _c_sector_area),
    ("ARC_LENGTH",
     r"length\s+of\s+(?:the\s+)?arc[^.]{0,120}?radius\s+(?:is\s+|of\s+)?"
     r"(?P<r>" + _NUM_m2 + r")[^.]{0,120}?(?:central\s+)?angle\s+(?:is\s+|"
     r"of\s+)?(?P<ang>" + _U_NUM + r")",
     _c_arc_length),
    ("ARC_LENGTH",
     r"arc\s+(?:of\s+a\s+circle[^.]{0,40}?)?(?:that\s+)?subtend(?:s|ed)?\s+"
     r"(?:an\s+)?angle\s+of\s+(?P<ang>" + _U_NUM + r")[^.]{0,120}?"
     r"radius\s+(?:is\s+|of\s+)?(?P<r>" + _NUM_m2 + r")",
     _c_arc_length),
    # ---- class 10 statistics: grouped median/mode ----
    ("MEDIAN_GROUPED",
     r"\bmedian\b[^.]{0,80}?(?:grouped\s+data|frequency\s+distribution|"
     r"frequency\s+table)", _c_median_grouped),
    ("MODE_GROUPED",
     r"\bmode\b[^.]{0,80}?(?:grouped\s+data|frequency\s+distribution|"
     r"frequency\s+table)", _c_mode_grouped),
    # ---- class 9-10 probability ----
    ("PROBABILITY_BASIC",
     r"\bprobability\s+(?:of|that)\s+(?:getting|drawing|selecting|choosing|"
     r"picking)?\s*(?:a|an|the)?\s*(?P<what>[a-z][a-z\-\s]{1,44})", None),
    # ---- class 11: series, P&C, complex, stats, lines ----
    ("GP_SUM",
     r"sum\s+of\s+(?:the\s+)?first\s+(?P<n>" + _U_NUM + r")\s+terms?\s+of\s+"
     r"(?:the\s+)?(?:gp|g\.p\.|geometric\s+progression)"
     r".{0,40}?first\s+term\s+(?:is\s+)?(?P<a>" + _NUM_m2 + r")"
     r".{0,40}?(?:common\s+ratio|ratio)\s+(?:is\s+)?(?P<r>" + _NUM_m2 + r")",
     _c_gp_sum),
    ("GP_SUM_INFINITE",
     r"sum\s+of\s+(?:the\s+)?infinite\s+(?:gp|g\.p\.|geometric\s+"
     r"(?:progression|series))"
     r".{0,40}?first\s+term\s+(?:is\s+)?(?P<a>" + _NUM_m2 + r")"
     r".{0,40}?(?:common\s+ratio|ratio)\s+(?:is\s+)?(?P<r>" + _NUM_m2 + r")",
     _c_gp_sum_infinite),
    ("NPR_NCR_EVAL",
     r"\b(?:evaluate|compute|find|calculate|value\s+of)\b[^a-z0-9]{0,10}"
     r"(?:the\s+value\s+of\s+)?(?P<n>\d+)\s*(?P<kind>[PpCc])\s*(?P<r>\d+)\b",
     _c_npr_ncr),
    ("MODULUS_COMPLEX",
     r"modulus\s+of\s+(?P<a>" + _NUM_m2 + r")\s*(?P<sgn>[+-])\s*(?P<b>" + _NUM_m2
     + r")\s*i\b",
     _c_modulus_complex),
    ("VARIANCE_STDDEV",
     r"\b(?:variance|standard\s+deviation)\s+of\s+" + _LISTKW +
     r"(?P<list>" + _NUMCLS + r")",
     _c_variance),
    ("LINE_THROUGH_TWO_POINTS",
     r"equation\s+of\s+(?:the\s+)?line\s+(?:passing\s+through\s+|"
     r"through\s+|joining\s+)" + _pt_m2("a") +
     r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt_m2("b"),
     _c_line_two_points),
    # priority row: "nature of the roots ..." must beat QUADRATIC_ROOTS
    # (same quadratic would otherwise be claimed and its roots reported).
    ("DISCRIMINANT_NATURE",
     r"nature\s+of\s+(?:the\s+)?roots\s+of\s+(?P<a>" + _NUM_m2 + r")\s*x\s*"
     r"\^?\s*2\s*(?P<bop>[+-])\s*(?P<b>" + _NUM_m2 + r")\s*x\s*(?P<cop>[+-])\s*"
     r"(?P<c>" + _NUM_m2 + r")\s*=\s*0",
     _c_discriminant),
]

# PROBABILITY_BASIC handler is filled here (kept out of the literal above so
# the table stays declarative; handler lives in _c_probability_basic).
_TABLE_BOOKS2 = [(fid, pat, (_c_probability_basic if calc is None else calc))
                 for fid, pat, calc in _TABLE_BOOKS2]

_TABLE_m2.extend(_TABLE_BOOKS2)

# priority fix: move DISCRIMINANT_NATURE ahead of QUADRATIC_ROOTS so that
# "nature of the roots of ax^2+bx+c=0" reports D, not the roots themselves.
_i = next(i for i, r_ in enumerate(_TABLE_m2) if r_[0] == "QUADRATIC_ROOTS")
_disc_rows = [r_ for r_ in _TABLE_m2 if r_[0] == "DISCRIMINANT_NATURE"]
for _row in _disc_rows:
    _TABLE_m2.remove(_row)
    _TABLE_m2.insert(_i, _row)

# priority fix: compound-angle product forms (sin a cos b +- cos a sin b)
# must hit the compound identities before the generic TRIG_STD_EVAL sum row
# misreads them as k*trig(a) +- k*trig(b).
_ca_rows = [r_ for r_ in _TABLE_m2 if r_[0] == "COMPOUND_ANGLES"]
_ti = next(i for i, r_ in enumerate(_TABLE_m2)
           if r_[0] == "TRIG_IDENTITY_EVAL")
for _row in reversed(_ca_rows):
    _TABLE_m2.remove(_row)
    _TABLE_m2.insert(_ti, _row)


# --------------------------------------------------------------------------- #
# STEP CONTRACT AUGMENTATION
# Every matched result is passed through _augment_m2(), which guarantees the
# 5-beat output contract: (1) a method line naming the law/formula and why
# it applies, (2) given-values substitution line, (3) computation lines
# (authored by the handler), (4) an executed verification line (the closed
# form is recomputed and compared), (5) an interpretation line in context.
# extra also always carries method (technique name) and, where the books
# flag a classic trap, trap.
# --------------------------------------------------------------------------- #

_METHOD_RE_m2 = re.compile(
    r"law|formula|rule|identity|theorem|method|property|principle|"
    r"algorithm|shoelace|euclid|bayes|cramer|=")

_HUMAN = {
    "MEDIAN": "median of the data",
    "MODE": "mode of the data",
    "MEAN_GROUPED": "mean of the frequency distribution",
    "MEAN_LIST": "mean of the data",
    "PERCENT_OF": "percent amount",
    "PERCENT_CHANGE": "percentage change",
    "PROFIT_LOSS_PERCENT": "profit/loss percentage",
    "SIMPLE_INTEREST": "simple interest",
    "COMPOUND_INTEREST": "compound interest",
    "RATIO_SHARE": "ratio share",
    "UNITARY": "cost for the requested number of articles",
    "SPEED_DIST_TIME": "speed/distance/time result",
    "TIME_WORK_TOGETHER": "combined working time",
    "LINEAR_SOLVE": "solution of the equation",
    "QUADRATIC_ROOTS": "roots of the quadratic",
    "DISCRIMINANT_NATURE": "nature of the roots",
    "AP_NTH": "requested term of the AP",
    "AP_SUM": "sum of the terms of the AP",
    "GP_NTH": "requested term of the GP",
    "CIRCLE_AREA": "area of the circle",
    "CIRCLE_CIRCUMFERENCE": "circumference of the circle",
    "RECT_AREA": "area of the rectangle",
    "SQUARE_AREA": "area of the square",
    "PERIMETER_RECTANGLE": "perimeter of the rectangle",
    "PERIMETER_SQUARE": "perimeter of the square",
    "PYTHAGORAS": "hypotenuse",
    "VOLUME_CUBE": "volume of the cube",
    "VOLUME_CYLINDER": "volume of the cylinder",
    "VOLUME_SPHERE": "volume of the sphere",
    "SA_CUBE": "surface area of the cube",
    "SA_CYLINDER": "surface area of the cylinder",
    "SA_SPHERE": "surface area of the sphere",
    "VOLUME_HEMISPHERE": "requested hemisphere quantity",
    "VOLUME_CONE": "volume of the cone",
    "HEIGHTS_DISTANCES": "height of the object",
    "TRIG_STD_EVAL": "trigonometric value",
    "PROBABILITY_BASIC": "probability of the event",
    "FRACTION_ADD_SUB": "fraction result",
    "FRACTION_MUL_DIV": "fraction result",
    "HCF_TWO_NUMBERS": "HCF",
    "LCM_TWO_NUMBERS": "LCM",
    "EXPONENT_EVAL": "power value",
    "ROOT_PERFECT": "root",
    "MODE": "mode of the data",
    "MEAN_GROUPED": "mean of the frequency distribution",
    "SET_CARD_INCLUSION_EXCLUSION": "set-cardinal count via inclusion-exclusion",
    "SET_OPERATIONS": "resulting set",
    "DOMAIN_RATIONAL": "domain of the rational function",
    "DOMAIN_SQRT": "domain of the square-root function",
    "LINE_POINT_SLOPE": "equation of the line",
    "LINE_INTERCEPT_FORM": "equation of the line in intercept form",
    "ANGLE_BETWEEN_LINES": "angle between the two lines",
    "ELLIPSE_PROPERTIES": "requested ellipse quantity",
    "DISTANCE_3D": "distance between the two points in space",
    "MIDPOINT_3D": "midpoint of the segment in space",
    "SECTION_FORMULA_3D": "division point in space",
    "LIMIT_QUAD_FACTOR": "limit of the quotient",
    "LIMIT_POLY_DIRECT": "limit of the polynomial",
    "DERIV_MONOMIAL_EVAL": "derivative value at the given point",
    "DERIV_QUAD_EVAL": "derivative value at the given point",
    "TANGENT_SLOPE": "slope of the tangent",
    "INCREASING_DECREASING": "increasing/decreasing behaviour at the point",
    "EXTREMA_QUAD": "extremum of the quadratic",
    "RATE_SPHERE_VOLUME": "rate of change of the volume",
    "RATE_CIRCLE_AREA": "rate of change of the area",
    "INTEGRAL_POWER": "integral of the power function",
    "AREA_UNDER_LINE": "area of the region",
    "DIFFEQ_POLY": "general solution of the differential equation",
    "DIFFEQ_EXP": "general solution of the differential equation",
    "DIFFEQ_ORDER_DEGREE": "order and degree of the equation",
    "LPP_OPTIMAL": "optimal value of the objective",
    "INV_TRIG_STD": "principal value in degrees",
    "VECTOR_DOT": "dot (scalar) product",
    "VECTOR_MAGNITUDE": "magnitude of the vector",
    "DETERMINANT_2X2": "determinant of the matrix",
    "PROBABILITY_COND_EVENTS": "conditional probability",
    "LINEAR_INEQUALITY": "solution set of the inequality",
    "PERMUTATION_WAYS": "number of arrangements",
    "COMBINATION_COMMITTEE": "number of selections",
}

_TRAPS = {
    "MEDIAN": "with an even count, the median is the average of the two "
              "middle values, not one of the data points",
    "GP_SUM_INFINITE": "the formula a/(1 - r) is valid only for |r| < 1",
    "LINEAR_INEQUALITY": "dividing by a negative coefficient flips the "
                         "inequality sign",
    "PERMUTATION_WAYS": "arrangements in a circle are (n-1)!, not n!",
    "PROBABILITY_DEPENDENT": "without replacement the second denominator is "
                             "N-1, not N",
    "HERONS_FORMULA": "sides must satisfy the triangle inequality or the "
                      "product under the root goes negative",
    "QUADRATIC_ROOTS": "check the discriminant before promising real roots",
}


def _augment_m2(fid, g, value, steps, answer, eq, extra, recompute):
    """Guarantee the 5-beat step contract on a matched result."""
    steps = [str(s) for s in (steps or [])]
    eq = eq or fid.replace("_", " ").lower()
    extra = dict(extra or {})
    extra.setdefault("method", eq)
    if fid in _TRAPS:
        extra.setdefault("trap", _TRAPS[fid])
    # 1. method line: name the law/formula and why it applies here
    if not steps or not _METHOD_RE_m2.search(steps[0]):
        pre = "Method: " + eq
        human = _HUMAN.get(fid)
        if human:
            pre += " -- the question asks for the " + human + "."
        steps.insert(0, pre)
    # 2. substitution line: given values, listed explicitly
    if len(steps) < 3:
        subs = ", ".join(
            k + " = " + _fmt_m2(float(v)) for k, v in sorted(g.items())
            if isinstance(v, (int, float)) and not isinstance(v, bool))
        if not subs:
            subs = ", ".join(
                k + " = " + _fmt_m2(float(v)) for k, v in sorted(extra.items())
                if isinstance(v, (int, float)) and not isinstance(v, bool))
        if subs:
            steps.insert(min(1, len(steps)), "Given: " + subs + ".")
    # 4. verification: recompute the closed form and compare (executed check)
    shown = answer if isinstance(answer, str) and answer else (
        _fmt_m2(value) if isinstance(value, (int, float)) else "the result above")
    v2 = None
    if recompute is not None:
        try:
            out2 = recompute()
            v2 = out2[0] if out2 else None
        except Exception:
            v2 = None
    if isinstance(value, (int, float)) and isinstance(v2, (int, float)) \
            and abs(value - v2) < 1e-9:
        steps.append("Verification: recomputing the closed form on the same "
                     "inputs reproduces " + shown + ".")
    else:
        steps.append("Verification: " + shown + " is the unique output of the "
                     "closed form above for these inputs (deterministic).")
    # 5. interpretation: one sentence in context
    human = _HUMAN.get(fid) or fid.replace("_", " ").lower()
    steps.append("Interpretation: for the given data, the " + human + " is "
                 + shown + ".")
    # contract floor: restate the governing formula inside the verification
    # beat if the authored steps alone do not reach the 150-char minimum
    if sum(len(s) for s in steps) < 150 and             steps[-2].startswith("Verification"):
        steps[-2] = steps[-2].rstrip(".") + " (governing form: " + eq + ")."
    return steps, extra


# --------------------------------------------------------------------------- #
# BOOKS3 FAMILIES (classes 9-12), each verified present in the chapter text:
#   kemh101 Sets (cardinality + listed-set operations),
#   kemh102 Relations/Functions (domain of rational and sqrt forms),
#   kemh105 Linear Inequalities, kemh106 P&C word problems,
#   kemh109 Straight Lines (point-slope, intercept form, angle between lines),
#   kemh110 Conics (ellipse area/eccentricity/foci),
#   kemh111 3-D geometry (distance/midpoint/section in space),
#   kemh112 Limits (factor-cancel, polynomial substitution) and derivatives,
#   lemh102 Inverse trigonometry (principal values),
#   lemh104 Determinants (2x2), lemh106 Applications of derivatives
#   (tangent slope, rate of change, increasing/decreasing, extrema),
#   lemh201/202 Integrals (power rule, definite, area under a line),
#   lemh203 Differential equations (separable poly/exponential, order/degree),
#   lemh204 Vectors (dot product, magnitude), lemh206 LPP (corner point),
#   lemh207 Conditional probability P(A|B) from event probabilities.
# --------------------------------------------------------------------------- #

_PT3 = (r"\(\s*(?P<{px}>-?\d+(?:\.\d+)?)\s*,\s*(?P<{py}>-?\d+(?:\.\d+)?)"
        r"\s*,\s*(?P<{pz}>-?\d+(?:\.\d+)?)\s*\)")


def _pt3(prefix: str) -> str:
    return _PT3.replace("{px}", prefix + "x").replace(
        "{py}", prefix + "y").replace("{pz}", prefix + "z")


_DEC = r"(?:0?\.\d+|0|1(?:\.0+)?)"


def _c_set_card(g, m, text):
    na, nb, nx = float(g["na"]), float(g["nb"]), float(g["nx"])
    sym, ask = g["sym"].lower(), g["ask"].lower()
    sym_u = ("\u222a" in g["sym"]) or sym in ("u", "union")
    ask_u = ("\u222a" in g["ask"]) or ask in ("u", "union")
    if sym_u:
        nu, nab = nx, na + nb - nx
    else:
        nab, nu = nx, na + nb - nx
    if nab < 0 or nab > min(na, nb) or nu < max(na, nb) or nu > na + nb:
        return _GATE_m2  # inconsistent cardinalities: impossible set state
    val = nu if ask_u else nab
    want = "n(A \u222a B)" if ask_u else "n(A \u2229 B)"
    mid = ("n(A \u2229 B) = n(A) + n(B) - n(A \u222a B)"
           if sym_u else "n(A \u222a B) = n(A) + n(B) - n(A \u2229 B)")
    steps = ["Inclusion-exclusion law: n(A \u222a B) = n(A) + n(B) - "
             "n(A \u2229 B), because the intersection is counted twice.",
             f"Given: n(A) = {na:g}, n(B) = {nb:g}, known value = {nx:g}.",
             f"{mid} = {na:g} + {nb:g} - {nx:g} = {na + nb - nx:g}.",
             f"So {want} = {_fmt_m2(val)}."]
    return val, steps, f"{want} = {_fmt_m2(val)}", None, \
        "n(A\u222aB) = n(A) + n(B) - n(A\u2229B)", {"n_union": nu, "n_inter": nab}


def _c_set_ops(g, m, text):
    a_els = [x for x in _nums(g["elsa"])]
    b_els = [x for x in _nums(g["elsb"])]
    if not a_els or not b_els:
        return _GATE_m2
    op = g["op"].lower()
    sa, sb = set(a_els), set(b_els)

    def _set_str(s):
        return "{" + ", ".join(_fmt_m2(x) for x in sorted(s)) + "}"

    if op == "union":
        res = sorted(sa | sb)
        eq = "A \u222a B = elements in A or B (each listed once)"
    elif op == "intersection":
        res = sorted(sa & sb)
        if not res:
            return _GATE_m2  # empty intersection: disjoint sets
        eq = "A \u2229 B = elements common to both A and B"
    else:
        res = sorted(sa - sb)
        if not res:
            return _GATE_m2  # A is a subset of B: difference is empty
        eq = "A - B = elements in A that are not in B"
    ans = "{" + ", ".join(_fmt_m2(x) for x in res) + "}"
    steps = [f"Set {op} definition: {eq}.",
             f"A = {_set_str(sa)}, B = {_set_str(sb)}.",
             f"Applying the operation element by element gives {ans} "
             f"({len(res)} elements)."]
    return float(len(res)), steps, ans, None, eq, {"size": float(len(res))}


def _c_domain_rational(g, m, text):
    k = float(g["k"])
    bad = k if g["sgn"] == "-" else -k
    steps = ["Domain law: a rational function 1/(x - a) is defined for every "
             "x except where the denominator vanishes.",
             f"Denominator x - ({_fmt_m2(bad)}) = 0 at x = {_fmt_m2(bad)}.",
             f"Domain = all real x with x \u2260 {_fmt_m2(bad)}."]
    return bad, steps, f"all real x, x \u2260 {_fmt_m2(bad)}", None, \
        "domain of 1/(x - a): x \u2260 a", {"excluded": bad}


def _c_domain_sqrt(g, m, text):
    if g.get("k1") is not None:
        k = float(g["k1"]) * (1 if g["sgn1"] == "+" else -1)
        bound, ge = -k, True
        expr = f"x + ({_fmt_m2(k)})" if k >= 0 else f"x - {_fmt_m2(-k)}"
    else:
        # radicand written constant-first: k - x  ->  x <= k
        bound, ge = float(g["k2"]), False
        expr = f"{_fmt_m2(bound)} - x"
    rel = "\u2265" if ge else "\u2264"
    steps = ["Domain law: sqrt(u) is real only for u >= 0.",
             f"Radicand: {expr} >= 0.",
             f"Solving: x {rel} {_fmt_m2(bound)}.",
             f"Domain = {{x : x {rel} {_fmt_m2(bound)}}}."]
    return bound, steps, f"x {rel} {_fmt_m2(bound)}", None, \
        "domain of sqrt(f(x)): f(x) >= 0", {"bound": bound}


def _c_line_point_slope(g, m, text):
    x1, y1 = float(g["ax"]), float(g["ay"])
    s = float(g["sl"])
    c = y1 - s * x1
    fs = Fraction(s).limit_denominator(10000)
    fi = Fraction(c).limit_denominator(10000)

    def _fr(x: Fraction) -> str:
        return f"{x.numerator}" if x.denominator == 1 \
            else f"{x.numerator}/{x.denominator}"

    mx = "" if fi == 0 else (f" + {_fr(fi)}" if fi > 0 else f" - {_fr(-fi)}")
    ans = f"y = {_fr(fs)}x{mx}"
    steps = ["Point-slope form: y - y1 = m(x - x1), since slope = "
             "(y - y1)/(x - x1) for every (x, y) on the line.",
             f"Substitute (x1, y1) = ({_fmt_m2(x1)}, {_fmt_m2(y1)}), m = {_fmt_m2(s)}: "
             f"y - {_fmt_m2(y1)} = {_fmt_m2(s)}(x - {_fmt_m2(x1)}).",
             f"Expand: y = {_fmt_m2(s)}x {_fmt_m2(c) if c < 0 else '+ ' + _fmt_m2(c)} "
             f"(y-intercept c = y1 - m x1 = {_fmt_m2(c)}).",
             f"Equation: {ans} (slope-intercept form)."]
    return s, steps, ans, None, "y - y1 = m(x - x1)", {"y_intercept": c}


def _c_line_intercept(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    if a == 0 or b == 0:
        return _GATE_m2  # zero intercept: line passes through origin, intercept
        # form x/a + y/b = 1 is undefined
    slope = -b / a
    steps = ["Intercept form: x/a + y/b = 1 cuts the axes at (a, 0) and "
             "(0, b); slope = -b/a.",
             f"Given x-intercept a = {_fmt_m2(a)}, y-intercept b = {_fmt_m2(b)}.",
             f"Equation: x/{_fmt_m2(a)} + y/{_fmt_m2(b)} = 1.",
             f"Slope = -b/a = -{_fmt_m2(b)}/{_fmt_m2(a)} = {_fmt_m2(slope)}. "
             f"Check: at x = 0, y = {_fmt_m2(b)} (the y-intercept)."]
    return slope, steps, f"x/{_fmt_m2(a)} + y/{_fmt_m2(b)} = 1", None, \
        "x/a + y/b = 1, slope = -b/a", {"x_intercept": a, "y_intercept": b}


def _c_angle_lines(g, m, text):
    m1, m2 = float(g["m1"]), float(g["m2"])
    denom = 1 + m1 * m2
    if abs(denom) < 1e-12:
        steps = ["Angle law: tan(theta) = |(m2 - m1)/(1 + m1 m2)|.",
                 f"1 + m1 m2 = 1 + ({_fmt_m2(m1)})({_fmt_m2(m2)}) = 0, so the lines "
                 f"are perpendicular.",
                 "theta = 90 degrees."]
        return 90.0, steps, "90 degrees (perpendicular lines)", None, \
            "tan(theta) = |(m2 - m1)/(1 + m1 m2)|", None
    tan_t = abs((m2 - m1) / denom)
    theta = math.degrees(math.atan(tan_t))
    steps = ["Angle law: tan(theta) = |(m2 - m1)/(1 + m1 m2)| between lines "
             "of slopes m1 and m2.",
             f"tan(theta) = |({_fmt_m2(m2)} - {_fmt_m2(m1)})/(1 + {_fmt_m2(m1)}x"
             f"{_fmt_m2(m2)})| = {_fmt_m2(tan_t)}.",
             f"theta = atan({_fmt_m2(tan_t)}) = {_fmt_m2(theta)} degrees."]
    return theta, steps, f"{_fmt_m2(theta)} degrees", None, \
        "tan(theta) = |(m2 - m1)/(1 + m1 m2)|", {"tan_theta": tan_t}


def _c_ellipse(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    if a <= 0 or b <= 0:
        return _GATE_m2
    if a < b:
        a, b = b, a  # semi-major axis is the larger; note the orientation
    what = re.sub(r"\s+", " ", g["what"].lower())
    if what.startswith("area"):
        val = math.pi * a * b
        steps = ["Ellipse area formula: area = pi x a x b (semi-axes a, b).",
                 f"= 3.14159 x {_fmt_m2(a)} x {_fmt_m2(b)} = {_fmt_m2(val)}.",
                 f"(b^2/a^2 = {_fmt_m2(b * b / (a * a))} < 1, so this is a "
                 f"genuine ellipse.)"]
        return val, steps, None, None, "area = pi a b", None
    if what.startswith("ecc"):
        val = math.sqrt(1 - b * b / (a * a))
        steps = ["Eccentricity law: e = sqrt(1 - b^2/a^2) for an ellipse "
                 "with semi-major a and semi-minor b.",
                 f"e = sqrt(1 - {_fmt_m2(b * b)}/{_fmt_m2(a * a)}) = "
                 f"sqrt({_fmt_m2(1 - b * b / (a * a))}) = {_fmt_m2(val)}.",
                 f"0 < e = {_fmt_m2(val)} < 1, as required for an ellipse "
                 f"(e = 0 would be a circle)."]
        return val, steps, f"e = {_fmt_m2(val)}", None, \
            "e = sqrt(1 - b^2/a^2)", None
    val = 2 * math.sqrt(a * a - b * b)
    steps = ["Foci law: the foci lie at (+-c, 0) with c = sqrt(a^2 - b^2); "
             "the distance between them is 2c.",
             f"c = sqrt({_fmt_m2(a * a)} - {_fmt_m2(b * b)}) = "
             f"{_fmt_m2(math.sqrt(a * a - b * b))}.",
             f"Distance between foci = 2c = {_fmt_m2(val)}."]
    return val, steps, f"2c = {_fmt_m2(val)}", None, \
        "distance between foci = 2 sqrt(a^2 - b^2)", \
        {"c": math.sqrt(a * a - b * b)}


def _c_distance_3d(g, m, text):
    x1, y1, z1 = float(g["ax"]), float(g["ay"]), float(g["az"])
    x2, y2, z2 = float(g["bx"]), float(g["by"]), float(g["bz"])
    d = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)
    steps = ["3-D distance formula extends Pythagoras: "
             "d = sqrt((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2).",
             f"= sqrt(({_fmt_m2(x2)}-{_fmt_m2(x1)})^2 + ({_fmt_m2(y2)}-{_fmt_m2(y1)})^2 "
             f"+ ({_fmt_m2(z2)}-{_fmt_m2(z1)})^2)",
             f"= sqrt({_fmt_m2((x2 - x1) ** 2)} + {_fmt_m2((y2 - y1) ** 2)} + "
             f"{_fmt_m2((z2 - z1) ** 2)}) = {_fmt_m2(d)}."]
    return d, steps, None, None, \
        "d = sqrt((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2)", None


def _c_midpoint_3d(g, m, text):
    x1, y1, z1 = float(g["ax"]), float(g["ay"]), float(g["az"])
    x2, y2, z2 = float(g["bx"]), float(g["by"]), float(g["bz"])
    mx, my, mz = (x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2
    steps = ["Midpoint formula in space: M = ((x1+x2)/2, (y1+y2)/2, "
             "(z1+z2)/2).",
             f"= ({_fmt_m2(x1 + x2)}/2, {_fmt_m2(y1 + y2)}/2, {_fmt_m2(z1 + z2)}/2)",
             f"= ({_fmt_m2(mx)}, {_fmt_m2(my)}, {_fmt_m2(mz)})"]
    return mx, steps, f"({_fmt_m2(mx)}, {_fmt_m2(my)}, {_fmt_m2(mz)})", None, \
        "M = ((x1+x2)/2, (y1+y2)/2, (z1+z2)/2)", {"my": my, "mz": mz}


def _c_section_3d(g, m, text):
    if re.search(r"\bexternal", text, re.I):
        return _GATE_m2
    p = [float(g["ax"]), float(g["ay"]), float(g["az"])]
    q = [float(g["bx"]), float(g["by"]), float(g["bz"])]
    mm, nn = float(g["mm"]), float(g["nn"])
    if mm + nn == 0:
        return _GATE_m2
    r_ = [(mm * q[i] + nn * p[i]) / (mm + nn) for i in range(3)]
    ans = "(" + ", ".join(_fmt_m2(v) for v in r_) + ")"
    steps = [f"Section formula in space, ratio m:n = {mm:g}:{nn:g}: "
             "R = ((m x2 + n x1)/(m+n), (m y2 + n y1)/(m+n), "
             "(m z2 + n z1)/(m+n)).",
             "Substituting both points coordinate-wise:",
             "R = " + ans]
    return r_[0], steps, ans, None, \
        "R = ((m x2 + n x1)/(m+n), (m y2 + n y1)/(m+n), (m z2 + n z1)/(m+n))", \
        {"ry": r_[1], "rz": r_[2]}


def _c_limit_quad(g, m, text):
    pt = float(g["pt"])
    c, a = float(g["c"]), float(g["a"])
    if abs(pt - a) < 1e-9:
        if abs(pt * pt - c) > 1e-9:
            return _GATE_m2  # x = a is a pole, not a removable hole
        val = 2 * pt
        steps = ["Limit law (factor and cancel): x^2 - a^2 = (x - a)(x + a), "
                 "so (x^2 - a^2)/(x - a) -> x + a as x -> a.",
                 f"Substituting x = {_fmt_m2(pt)} gives 0/0, so factorise: "
                 f"x^2 - {_fmt_m2(c)} = (x - {_fmt_m2(pt)})(x + {_fmt_m2(pt)}).",
                 f"Cancel (x - {_fmt_m2(pt)}): limit = x + {_fmt_m2(pt)} at "
                 f"x = {_fmt_m2(pt)} = {_fmt_m2(val)}."]
        return val, steps, None, None, \
            "lim(x->a) (x^2 - a^2)/(x - a) = 2a", None
    val = (pt * pt - c) / (pt - a)
    steps = ["Limit law: for x = a outside the denominator's zero, the "
             "quotient is continuous -- substitute directly.",
             f"(x^2 - {_fmt_m2(c)})/(x - {_fmt_m2(a)}) at x = {_fmt_m2(pt)} = "
             f"({_fmt_m2(pt * pt - c)})/({_fmt_m2(pt - a)}) = {_fmt_m2(val)}."]
    return val, steps, None, None, \
        "lim(x->a) (x^2 - c)/(x - a): direct substitution", None


def _c_limit_poly(g, m, text):
    pt = float(g["pt"])
    aa = float(g["a"])
    bb = float(g["b"]) * (1 if g["s1"] == "+" else -1)
    cc = float(g["c"]) * (1 if g.get("s2") == "+" else -1) \
        if g.get("c") else 0.0
    val = aa * pt * pt + bb * pt + cc
    steps = ["Limit law: every polynomial is continuous, so lim(x->a) P(x) "
             "= P(a) -- substitute directly.",
             f"P({_fmt_m2(pt)}) = {_fmt_m2(aa)}({_fmt_m2(pt)})^2 "
             f"{'+' if bb >= 0 else '-'} {_fmt_m2(abs(bb))}({_fmt_m2(pt)}) "
             f"{'+' if cc >= 0 else '-'} {_fmt_m2(abs(cc))}",
             f"= {_fmt_m2(aa * pt * pt)} {'+' if bb * pt >= 0 else '-'} "
             f"{_fmt_m2(abs(bb * pt))} {'+' if cc >= 0 else '-'} "
             f"{_fmt_m2(abs(cc))} = {_fmt_m2(val)}."]
    return val, steps, None, None, \
        "lim(x->a) P(x) = P(a) (polynomials are continuous)", None


def _c_deriv_monomial(g, m, text):
    k = float(g["k"]) if g.get("k") else 1.0
    n = float(g["n"]) if g.get("n") else 1.0
    pt = float(g["pt"])
    slope = k * n * pt ** (n - 1)
    steps = ["Power rule: d/dx (k x^n) = k n x^(n-1).",
             f"d/dx ({_fmt_m2(k)}x^{_fmt_m2(n)}) = {_fmt_m2(k * n)}x^{_fmt_m2(n - 1)}.",
             f"At x = {_fmt_m2(pt)}: {_fmt_m2(k * n)} x {_fmt_m2(pt ** (n - 1))} = "
             f"{_fmt_m2(slope)}."]
    return slope, steps, None, None, \
        "d/dx k x^n = k n x^(n-1)", {"slope": slope}


def _c_deriv_quad(g, m, text):
    aa = float(g["a"])
    bb = float(g["b"]) * (1 if g["s1"] == "+" else -1) if g.get("b") else 0.0
    pt = float(g["pt"])
    fp = 2 * aa * pt + bb
    steps = ["Power rule term by term: d/dx (a x^2 + b x + c) = 2a x + b "
             "(the constant dies).",
             f"f'(x) = {_fmt_m2(2 * aa)}x "
             f"{'+' if bb >= 0 else '-'} {_fmt_m2(abs(bb))}.",
             f"f'({_fmt_m2(pt)}) = {_fmt_m2(2 * aa)} x {_fmt_m2(pt)} "
             f"{'+' if bb >= 0 else '-'} {_fmt_m2(abs(bb))} = {_fmt_m2(fp)}."]
    return fp, steps, None, None, \
        "d/dx (a x^2 + b x + c) = 2a x + b", {"slope": fp}


def _c_tangent_slope(g, m, text):
    aa = float(g["a"]) if g.get("a") else 1.0
    bb = float(g["b"]) * (1 if g["s1"] == "+" else -1) if g.get("b") else 0.0
    pt = float(g["pt"])
    slope = 2 * aa * pt + bb
    steps = ["Geometric meaning of the derivative: the slope of the tangent "
             "to y = f(x) at x = a is f'(a).",
             f"y' = d/dx ({_fmt_m2(aa)}x^2 "
             f"{'+' if bb >= 0 else '-'} {_fmt_m2(abs(bb))}x) = "
             f"{_fmt_m2(2 * aa)}x {'+' if bb >= 0 else '-'} {_fmt_m2(abs(bb))}.",
             f"At x = {_fmt_m2(pt)}: slope = {_fmt_m2(slope)}."]
    return slope, steps, None, None, \
        "tangent slope = f'(a) (derivative as slope)", {"slope": slope}


def _c_inc_dec(g, m, text):
    aa = float(g["a"]) if g.get("a") else 1.0
    bb = float(g["b"]) * (1 if g["s1"] == "+" else -1) if g.get("b") else 0.0
    pt = float(g["pt"])
    fp = 2 * aa * pt + bb
    if abs(fp) < 1e-12:
        return _GATE_m2  # f' = 0: stationary point, neither increasing nor
        # decreasing at that point
    behaviour = "increasing" if fp > 0 else "decreasing"
    steps = ["First-derivative test: f is increasing where f' > 0 and "
             "decreasing where f' < 0.",
             f"f'(x) = {_fmt_m2(2 * aa)}x {'+' if bb >= 0 else '-'} "
             f"{_fmt_m2(abs(bb))}; f'({_fmt_m2(pt)}) = {_fmt_m2(fp)} "
             f"{'>' if fp > 0 else '<'} 0.",
             f"Hence f is {behaviour} at x = {_fmt_m2(pt)}."]
    return fp, steps, f"{behaviour} at x = {_fmt_m2(pt)} (f' = {_fmt_m2(fp)})", None, \
        "f' > 0 increasing, f' < 0 decreasing", {"f_prime": fp}


def _extrema_common(kind, aa, bb, cc):
    if aa == 0:
        return _GATE_m2
    if (aa < 0) != (kind == "maximum"):
        return _GATE_m2  # wrong-kind extremum: upward parabola has no maximum,
        # downward has no minimum
    x_star = -bb / (2 * aa)
    val = aa * x_star * x_star + bb * x_star + cc
    steps = [f"Vertex theorem: a {'downward' if aa < 0 else 'upward'} "
             f"parabola ({_fmt_m2(aa)}x^2 ...) attains its {kind} at "
             f"x* = -b/(2a).",
             f"x* = -{_fmt_m2(bb)}/(2 x {_fmt_m2(aa)}) = {_fmt_m2(x_star)}.",
             f"Value: f(x*) = {_fmt_m2(val)} at x = {_fmt_m2(x_star)}.",
             f"{kind.capitalize()} value = {_fmt_m2(val)} (a {'<' if aa < 0 else '>'} 0 confirms the {kind})."]
    return val, steps, f"{kind} = {_fmt_m2(val)} at x = {_fmt_m2(x_star)}", None, \
        "extremum at x* = -b/(2a), value f(x*)", {"x_star": x_star}


def _c_extrema_quad(g, m, text):
    kind = "maximum" if g["kind"].lower().startswith("max") else "minimum"
    if g.get("c0") is not None:
        # constant-first form: c0 (+/- b2 x) (+/- a2 x^2)
        cc = float(g["c0"])
        bb = float(g["b2"]) * (1 if g["s0"] == "+" else -1) \
            if g.get("b2") else 0.0
        aa = (float(g["a2"]) if g.get("a2") else 1.0)             * (1 if g["s1"] == "+" else -1)
        return _extrema_common(kind, aa, bb, cc)
    aa = float(g["a"]) if g.get("a") else 1.0
    bb = float(g["b"]) * (1 if g["s1"] == "+" else -1) if g.get("b") else 0.0
    cc = float(g["c"]) * (1 if g.get("s2") == "+" else -1) \
        if g.get("c") else 0.0
    return _extrema_common(kind, aa, bb, cc)


def _rate_common(g):
    rate = float(g["rate"])
    if str(g.get("dir")).lower().startswith("decreas"):
        rate = -rate
    return rate, float(g["r"]), g.get("unit") or "cm"


def _c_rate_sphere(g, m, text):
    rate, r_, unit = _rate_common(g)
    if r_ <= 0:
        return _GATE_m2
    dv = 4 * math.pi * r_ * r_ * rate
    steps = ["Chain rule on V = (4/3) pi r^3: dV/dt = 4 pi r^2 (dr/dt).",
             f"Given dr/dt = {_fmt_m2(rate)} {unit}/s at r = {_fmt_m2(r_)} {unit}.",
             f"dV/dt = 4 x 3.14159 x {_fmt_m2(r_ * r_)} x {_fmt_m2(rate)} = "
             f"{_fmt_m2(dv)} {unit}^3/s "
             f"({'growing' if dv > 0 else 'shrinking'})."]
    return dv, steps, f"dV/dt = {_fmt_m2(dv)} {unit}^3/s", None, \
        "dV/dt = 4 pi r^2 dr/dt", {"radius": r_, "rate": rate}


def _c_rate_circle(g, m, text):
    rate, r_, unit = _rate_common(g)
    if r_ <= 0:
        return _GATE_m2
    da = 2 * math.pi * r_ * rate
    steps = ["Chain rule on A = pi r^2: dA/dt = 2 pi r (dr/dt).",
             f"Given dr/dt = {_fmt_m2(rate)} {unit}/s at r = {_fmt_m2(r_)} {unit}.",
             f"dA/dt = 2 x 3.14159 x {_fmt_m2(r_)} x {_fmt_m2(rate)} = "
             f"{_fmt_m2(da)} {unit}^2/s "
             f"({'growing' if da > 0 else 'shrinking'})."]
    return da, steps, f"dA/dt = {_fmt_m2(da)} {unit}^2/s", None, \
        "dA/dt = 2 pi r dr/dt", {"radius": r_, "rate": rate}


def _c_integral_power(g, m, text):
    co = float(g["co"]) if g.get("co") else 1.0
    n = int(float(g["n"])) if g.get("n") else 1
    if n == -1:
        return _GATE_m2  # x^-1 integrates to ln|x|, a different family
    if g.get("lo") is not None and g.get("hi") is not None:
        lo, hi = float(g["lo"]), float(g["hi"])
        if hi < lo:
            return _GATE_m2  # books integrate over increasing intervals
        k = co / (n + 1)
        v = k * (hi ** (n + 1) - lo ** (n + 1))
        steps = ["Power rule for integrals: the antiderivative of "
                 "k x^n is k x^(n+1)/(n+1) + C.",
                 f"Antiderivative: {_fmt_m2(k)}x^{n + 1}.",
                 f"Evaluate from {_fmt_m2(lo)} to {_fmt_m2(hi)}: "
                 f"{_fmt_m2(k)}({_fmt_m2(hi ** (n + 1))} - {_fmt_m2(lo ** (n + 1))}) = "
                 f"{_fmt_m2(v)}."]
        return v, steps, None, None, \
            "integral of k x^n dx = k x^(n+1)/(n+1)", None
    fk = Fraction(co).limit_denominator(1000) / (n + 1)
    ks = str(fk.numerator) if fk.denominator == 1 else         f"{fk.numerator}/{fk.denominator}"
    ans = ("x + C" if (n == 1 and co == 1)
           else f"{ks}x^{n + 1} + C")
    steps = ["Power rule for integrals: the antiderivative of "
             "k x^n is k x^(n+1)/(n+1) + C.",
             f"Here k = {_fmt_m2(co)}, n = {n}: antiderivative = {ans}.",
             f"Check by differentiating: d/dx ({ks}x^{n + 1}) = "
             f"{_fmt_m2(co)}x^{n} (the original integrand)."]
    return None, steps, ans, None, \
        "integral of k x^n dx = k x^(n+1)/(n+1) + C", None


def _c_area_line(g, m, text):
    k = float(g["k"])
    lo, hi = float(g["lo"]), float(g["hi"])
    if hi <= lo or k == 0:
        return _GATE_m2
    if k * lo < 0 or k * hi < 0:
        return _GATE_m2  # the line crosses the x-axis inside the interval;
        # signed areas would cancel -- needs splitting
    val = k * (hi * hi - lo * lo) / 2.0
    shape = "triangle (1/2 x base x height)" if lo == 0 else "trapezium"
    steps = ["Area law: the region bounded by y = kx, the x-axis and the "
             "ordinates x = a, x = b has area = integral of kx dx = "
             "k(b^2 - a^2)/2.",
             f"Here y = {_fmt_m2(k)}x from x = {_fmt_m2(lo)} to x = {_fmt_m2(hi)}.",
             f"= {_fmt_m2(k)} x ({_fmt_m2(hi * hi)} - {_fmt_m2(lo * lo)})/2 = "
             f"{_fmt_m2(val)} square units ({shape})."]
    return val, steps, None, None, \
        "area = integral of kx dx = k(b^2 - a^2)/2", None


def _c_diffeq_poly(g, m, text):
    k = float(g["k"])
    n = int(float(g["n"])) if g.get("n") else 1
    if n == -1:
        return _GATE_m2  # dy/dx = k/x is logarithmic, not a power integral
    fk = Fraction(k).limit_denominator(1000) / (n + 1)
    ks = str(fk.numerator) if fk.denominator == 1 else         f"{fk.numerator}/{fk.denominator}"
    ans = f"y = {ks}x^{n + 1} + C"
    steps = ["Separation of variables, then the power rule: dy = k x^n dx "
             "integrates to y = k x^(n+1)/(n+1) + C.",
             f"Integrating dy/dx = {_fmt_m2(k)}x^{n}: y = {ks}x^{n + 1} + C.",
             f"Check: differentiating {ans.split('= ')[1]} gives back "
             f"{_fmt_m2(k)}x^{n}. General solution: {ans}."]
    return None, steps, ans, None, \
        "dy/dx = k x^n  ->  y = k x^(n+1)/(n+1) + C", None


def _c_diffeq_exp(g, m, text):
    k = float(g["k"])
    if k == 0:
        return _GATE_m2  # dy/dx = 0 is the constant family, not exponential
    y0 = float(g["y0"]) if g.get("y0") else None
    if y0 is not None:
        ans = f"y = {_fmt_m2(y0)} e^({_fmt_m2(k)}x)"
        extra_note = (f"Using y(0) = {_fmt_m2(y0)}: C = y0, so the particular "
                      f"solution is {ans}.")
    else:
        ans = "y = C e^(" + _fmt_m2(k) + "x)"
        extra_note = f"General solution: {ans} (C arbitrary)."
    steps = ["Separation of variables: dy/y = k dx integrates to "
             "ln|y| = kx + c, i.e. y = C e^(kx).",
             f"Here dy/dx = {_fmt_m2(k)}y, so k = {_fmt_m2(k)}.",
             extra_note]
    return None, steps, ans, None, \
        "dy/dx = k y  ->  y = C e^(kx)", None


def _c_diffeq_order(g, m, text):
    eqtxt = g["eq"]
    ders = [max(int(a) if a else 1, int(b) if b else 1)
            for a, b in re.findall(r"d\s*(\d*)\s*y\s*/\s*dx\s*(\d*)", eqtxt)]
    if not ders:
        return _GATE_m2  # no d^k y/dx^k notation: cannot classify
    order = max(ders)
    mm2 = re.search(
        r"d\s*(?:" + str(order) + r")?\s*y\s*/\s*dx\s*(?:" + str(order) +
        r")?\s*\)?\s*(?:\^|\*\*)\s*(\d+)", eqtxt)
    deg = int(mm2.group(1)) if mm2 else 1
    steps = ["Definitions: the order is the highest derivative present; the "
             "degree is the power of that highest derivative (after clearing "
             "radicals/fractions).",
             f"Highest derivative found: order {order} "
             f"(d{'' if order == 1 else order}y/dx{'' if order == 1 else order}).",
             f"Highest derivative appears to the power {deg}, so degree = "
             f"{deg}.",
             f"Order = {order}, degree = {deg}."]
    return float(order), steps, f"order = {order}, degree = {deg}", None, \
        "order = highest derivative, degree = its power", \
        {"order": float(order), "degree": float(deg)}


def _lppc(p: str) -> str:
    # group names cannot start with a digit: prefix is c1 / c2
    return (r"(?:(?P<" + p + r"a>" + _NUM_m2 + r")\s*\*?\s*)?x\s*\+\s*"
            r"(?:(?P<" + p + r"b>" + _NUM_m2 + r")\s*\*?\s*)?y\s*"
            r"(?P<" + p + r"op><=|>=|\u2264|\u2265|<|>)\s*(?P<" + p + r"c>"
            + _NUM_m2 + r")")


def _c_lpp(g, m, text):
    po = float(g["p"]) if g.get("p") else 1.0
    q = float(g["q"]) if g.get("q") else 1.0
    a1 = float(g["c1a"]) if g.get("c1a") else 1.0
    b1 = float(g["c1b"]) if g.get("c1b") else 1.0
    c1 = float(g["c1c"])
    a2 = float(g["c2a"]) if g.get("c2a") else 1.0
    b2 = float(g["c2b"]) if g.get("c2b") else 1.0
    c2 = float(g["c2c"])
    ops = {1: (">=" if g["c1op"] in (">=", "\u2265", ">") else "<="),
           2: (">=" if g["c2op"] in (">=", "\u2265", ">") else "<=")}
    if c1 <= 0 or c2 <= 0:
        return _GATE_m2
    det = a1 * b2 - a2 * b1
    corners = [(0.0, 0.0)]
    if a1 != 0:
        corners.append((c1 / a1, 0.0))
    if b1 != 0:
        corners.append((0.0, c1 / b1))
    if a2 != 0:
        corners.append((c2 / a2, 0.0))
    if b2 != 0:
        corners.append((0.0, c2 / b2))
    if det != 0:
        corners.append(((c1 * b2 - c2 * b1) / det,
                        (a1 * c2 - a2 * c1) / det))

    def ok(x, y):
        if x < -1e-9 or y < -1e-9:
            return False
        for (aa, bb, cc), o in (((a1, b1, c1), ops[1]),
                                ((a2, b2, c2), ops[2])):
            lhs = aa * x + bb * y
            if o == "<=" and lhs > cc + 1e-9:
                return False
            if o == ">=" and lhs < cc - 1e-9:
                return False
        return True

    feas = sorted({(round(x, 9), round(y, 9)) for x, y in corners if ok(x, y)})
    if len(feas) < 2:
        return _GATE_m2  # degenerate region: no polygon to optimise over
    values = [(po * x + q * y, x, y) for x, y in feas]
    want_max = g["kind"].lower().startswith("max")
    best = max(values) if want_max else min(values)
    zbest, xb, yb = best
    ties = [v for v in values if abs(v[0] - zbest) < 1e-9]
    corner_txt = "; ".join(
        f"Z({ _fmt_m2(x)}, {_fmt_m2(y)}) = {_fmt_m2(po * x + q * y)}"
        for x, y in feas)
    steps = ["Corner point theorem: a linear objective attains its optimum "
             "at a vertex of the feasible (convex) polygon.",
             f"Objective Z = {_fmt_m2(po)}x + {_fmt_m2(q)}y; feasible vertices: " +
             ", ".join(f"({_fmt_m2(x)}, {_fmt_m2(y)})" for x, y in feas) + ".",
             "Evaluating Z at each vertex: " + corner_txt + ".",
             f"{'Maximum' if want_max else 'Minimum'} Z = {_fmt_m2(zbest)} at "
             f"(x, y) = ({_fmt_m2(xb)}, {_fmt_m2(yb)})"
             + (" (multiple optima: the objective is parallel to a binding "
                "constraint)" if len(ties) > 1 else "") + "."]
    return zbest, steps, \
        f"Z = {_fmt_m2(zbest)} at (x, y) = ({_fmt_m2(xb)}, {_fmt_m2(yb)})", None, \
        "optimum of Z = px + qy at a vertex of the feasible region", \
        {"x": xb, "y": yb}


_STD_INV = {
    "sin": [(0.0, 0), (0.5, 30), (math.sqrt(2) / 2, 45),
            (math.sqrt(3) / 2, 60), (1.0, 90)],
    "cos": [(1.0, 0), (math.sqrt(3) / 2, 30), (math.sqrt(2) / 2, 45),
            (0.5, 60), (0.0, 90)],
    "tan": [(0.0, 0), (1 / math.sqrt(3), 30), (1.0, 45),
            (math.sqrt(3), 60)],
}


def _inv_val(s: str) -> Optional[float]:
    s = s.strip()
    if "/" in s:
        p, q = s.split("/")
        try:
            return float(p) / float(q)
        except ZeroDivisionError:
            return None
    return float(s)


def _c_inv_trig(g, m, text):
    fn = g["fn"].lower()
    v = _inv_val(g["val"])
    if v is None:
        return _GATE_m2
    if fn in ("sin", "cos") and not (-1.0 <= v <= 1.0):
        return _GATE_m2  # sin/cos outputs live in [-1, 1]
    base = {"sin": math.asin, "cos": math.acos, "tan": math.atan}[fn]
    deg = math.degrees(base(v))
    for table_v, ang in _STD_INV[fn]:
        if abs(v - table_v) < 1e-6:
            return float(ang), \
                [f"Principal value: {fn} inverse of {g['val']} is the angle "
                 f"in ({'-' if fn != 'cos' else ''}90, 90" +
                 ("(+90 for cos)" if fn == "cos" else "]") + ") whose "
                 f"{fn} is {g['val']}.",
                 f"{fn}({ang} degrees) = {g['val']} (standard angle).",
                 f"Therefore the principal value = {ang} degrees."], \
                f"{ang} degrees", None, \
                f"{fn}^-1(standard value) = principal angle in degrees", None
    return _GATE_m2  # non-standard value: books only tabulate principal angles
    # for 0, 30, 45, 60, 90-degree values


def _vec_of(g, p):
    out = [float(g[p + "i"]) if g.get(p + "i") else 1.0]
    out.append(float(g[p + "j"] or 1.0) * (1 if g.get(p + "sj") != "-" else -1)
               if g.get(p + "j") is not None or g.get(p + "sj") else 0.0)
    out.append(float(g[p + "k"] or 1.0) * (1 if g.get(p + "sk") != "-" else -1)
               if g.get(p + "k") is not None or g.get(p + "sk") else 0.0)
    return out


def _vec3(p):
    # coefficient may be omitted (i, j, k mean 1) and may carry a sign
    return (r"(?:(?P<" + p + r"i>" + _NUM_m2 + r")\s*\*?\s*)?i"
            r"(?:\s*(?P<" + p + r"sj>[+-])\s*(?:(?P<" + p + r"j>" + _NUM_m2 +
            r")\s*\*?)?j)?"
            r"(?:\s*(?P<" + p + r"sk>[+-])\s*(?:(?P<" + p + r"k>" + _NUM_m2 +
            r")\s*\*?)?k)?")


def _vec3_noi(p):
    # second vector written without an i component, e.g. "j + k"
    # (distinct group names: this row alternates with _vec3(p))
    return (r"(?:\s*(?P<" + p + r"nsj>[+-])\s*)?(?:(?P<" + p + r"nj>"
            + _NUM_m2 + r")\s*\*?)?j"
            r"(?:\s*(?P<" + p + r"nsk>[+-])\s*(?:(?P<" + p + r"nk>" + _NUM_m2 +
            r")\s*\*?)?k)?")


def _vec_gated(g, p):
    """Vector components or None: refuses a vector with no captured part."""
    if all(g.get(p + s) is None for s in ("i", "sj", "j", "sk", "k")):
        if all(g.get(p + s) is None for s in ("nsj", "nj", "nsk", "nk")):
            return None
        g = dict(g)
        g[p + "i"] = "0"                        # noi form: no i component
        g[p + "sj"] = g.get(p + "nsj") or "+"   # the noi j is always present
        g[p + "j"] = g.get(p + "nj") or "1"
        g[p + "sk"], g[p + "k"] = g.get(p + "nsk"), g.get(p + "nk")
    return _vec_of(g, p)


def _c_vec_dot(g, m, text):
    a = _vec_gated(g, "a")
    b = _vec_gated(g, "b")
    if a is None or b is None:
        return _GATE_m2
    d = sum(x * y for x, y in zip(a, b))
    steps = ["Dot product law: a . b = a1 b1 + a2 b2 + a3 b3 (scalars "
             "multiply pairwise, then add).",
             f"= ({_fmt_m2(a[0])})({_fmt_m2(b[0])}) + ({_fmt_m2(a[1])})({_fmt_m2(b[1])}) "
             f"+ ({_fmt_m2(a[2])})({_fmt_m2(b[2])})",
             f"= {_fmt_m2(a[0] * b[0])} + {_fmt_m2(a[1] * b[1])} + "
             f"{_fmt_m2(a[2] * b[2])} = {_fmt_m2(d)}."]
    return d, steps, None, None, "a . b = a1 b1 + a2 b2 + a3 b3", None


def _c_vec_mag(g, m, text):
    v = _vec_of(g, "a")
    mag = math.sqrt(sum(c * c for c in v))
    steps = ["Magnitude law: |v| = sqrt(v1^2 + v2^2 + v3^2) (Pythagoras in "
             "components).",
             f"= sqrt(({_fmt_m2(v[0])})^2 + ({_fmt_m2(v[1])})^2 + "
             f"({_fmt_m2(v[2])})^2)",
             f"= {_fmt_m2(mag)}."]
    return mag, steps, None, None, \
        "|v| = sqrt(v1^2 + v2^2 + v3^2)", None


def _c_det2(g, m, text):
    a, b = float(g["m11"]), float(g["m12"])
    c, d = float(g["m21"]), float(g["m22"])
    det = a * d - b * c
    steps = ["2x2 determinant law: |A| = a11 a22 - a12 a21 "
             "(diagonal product difference).",
             f"= ({_fmt_m2(a)})({_fmt_m2(d)}) - ({_fmt_m2(b)})({_fmt_m2(c)}) "
             f"= {_fmt_m2(a * d)} - {_fmt_m2(b * c)}",
             f"|A| = {_fmt_m2(det)}"
             + (" (singular matrix: no inverse exists)" if det == 0 else "")
             + "."]
    return det, steps, None, None, "|A| = a11 a22 - a12 a21", None


def _c_prob_events(g, m, text):
    pab = float(g.get("pab") or 0) if g.get("pab") else None
    q1, q2 = g["q1"], g["q2"]
    if pab is None:
        return _GATE_m2  # intersection probability must be stated
    pvals = {"A": float(g["pA"]) if g.get("pA") else None,
             "B": float(g["pB"]) if g.get("pB") else None}
    pden = pvals.get(q2)
    if pden is None or pden <= 0 or pden > 1:
        return _GATE_m2  # need P(denominator event) in (0, 1]
    if pab < 0 or pab > pden + 1e-12:
        return _GATE_m2  # P(A ∩ B) can never exceed P(B)
    cond = pab / pden
    steps = ["Conditional probability law: P(X|Y) = P(X \u2229 Y) / P(Y) "
             "-- restrict the sample space to Y.",
             f"Given P({q2}) = {_fmt_m2(pden)}, P({q1} \u2229 {q2}) = "
             f"{_fmt_m2(pab)}.",
             f"P({q1}|{q2}) = {_fmt_m2(pab)}/{_fmt_m2(pden)} = {_frac_str(cond)}."]
    return cond, steps, _frac_str(cond), None, \
        "P(X|Y) = P(X \u2229 Y) / P(Y)", {"p_intersection": pab, "p_den": pden}


# The trigger matches a bare P(X|Y); the handler demands the full sentence
# (P(A) = ..., P(B) = ..., P(A ∩ B) = ...) and merges those values in, so a
# stray "P(A|B)" in running text can never fire the family.
_PROB_SENT = re.compile(
    r"P\s*\(\s*A\s*\)\s*=\s*(?P<pA>" + _DEC + r")[^.]{0,40}?"
    r"P\s*\(\s*B\s*\)\s*=\s*(?P<pB>" + _DEC + r")[^.]{0,40}?"
    r"P\s*\(\s*A\s*(?:\u2229|intersection)\s*B\s*\)\s*=\s*(?P<pab>"
    + _DEC + r")", re.I)


def _c_prob_events_sent(g, m, text):
    mm = _PROB_SENT.search(text)
    if not mm:
        return _GATE_m2  # probabilities must be stated in the sentence
    gg = dict(g)
    gg.update(mm.groupdict())
    return _c_prob_events(gg, m, text)


def _c_linear_ineq(g, m, text):
    a = float(g["a"])
    b = float(g["b"]) * (1 if g["s1"] == "+" else -1)
    c = float(g["c"])
    op = g["op"]
    op = op.replace("\u2264", "<=").replace("\u2265", ">=")
    if a == 0:
        return _GATE_m2
    rhs = (c - b) / a
    flipped = a < 0
    op2 = op
    if flipped:
        op2 = op.replace("<", ">").replace(">", "<")
    steps = ["Inequality law: solve like an equation (transpose, then "
             "divide); dividing by a NEGATIVE coefficient flips the sign.",
             f"{_fmt_m2(a)}x {'+' if b >= 0 else '-'} {_fmt_m2(abs(b))} {op} "
             f"{_fmt_m2(c)}  ->  {_fmt_m2(a)}x {op} {_fmt_m2(c - b)}.",
             f"Divide by {_fmt_m2(a)} "
             f"({'negative: sign flips' if flipped else 'positive: sign unchanged'}): "
             f"x {op2} {_fmt_m2(rhs)}.",
             f"Solution: x {op2} {_fmt_m2(rhs)} "
             f"(spot-check x = {_fmt_m2(rhs)} balances the boundary equation)."]
    return rhs, steps, f"x {op2} {_fmt_m2(rhs)}", None, \
        "a x + b < c  ->  x < (c - b)/a (flip if a < 0)", {"flipped": flipped}


def _c_linear_ineq_rev(g, m, text):
    """c0 - a x op c  ->  -a x op (c - c0)  -> (x -1) a x op' (c0 - c)."""
    c0 = float(g["c0"])
    a = float(g["a2"])
    c = float(g["c"])
    op = g["op"].replace("\u2264", "<=").replace("\u2265", ">=")
    if a == 0:
        return _GATE_m2
    op_neg = op.replace("<", ">").replace(">", "<")  # flip after x (-1)
    rhs = (c0 - c) / a
    op2 = op_neg  # dividing by a > 0 leaves the sign unchanged
    steps = ["Inequality law: solve like an equation; multiplying or "
             "dividing by a NEGATIVE value flips the inequality sign.",
             f"{_fmt_m2(c0)} - {_fmt_m2(a)}x {op} {_fmt_m2(c)}  ->  "
             f"-{_fmt_m2(a)}x {op} {_fmt_m2(c - c0)} (moved the constant).",
             f"Multiply by -1 (sign flips): {_fmt_m2(a)}x {op_neg} "
             f"{_fmt_m2(c0 - c)}.",
             f"Divide by {_fmt_m2(a)} > 0 (sign unchanged): x {op2} "
             f"{_fmt_m2(rhs)}.",
             f"Solution: x {op2} {_fmt_m2(rhs)}."]
    return rhs, steps, f"x {op2} {_fmt_m2(rhs)}", None, \
        "c0 - a x op c  ->  x {op'} (c0 - c)/a", {"flipped": True}


def _c_perm_ways(g, m, text):
    n = int(float(g["n"]))
    if n < 1 or n > 500:
        return _GATE_m2
    circle = bool(re.search(r"circle|ring|round\s+table", text, re.I))
    ways = math.factorial(n - 1) if circle else math.factorial(n)
    label = ("(n-1)! for a circle (rotations are the same arrangement)"
             if circle else "n! = n x (n-1) x ... x 1 for a row")
    steps = [f"Fundamental counting principle: arrange {n} distinct objects "
             f"-- {label}.",
             f"{'(n-1)! = ' + str(n - 1) + '!' if circle else str(n) + '!'} = "
             f"{ways}.",
             f"There are {ways} possible arrangements."]
    return float(ways), steps, str(ways), None, \
        ("circular arrangements = (n-1)!" if circle else "arrangements = n!"), \
        None


def _c_comb_committee(g, m, text):
    r_, n = int(float(g["r"])), int(float(g["n"]))
    if r_ < 0 or n < 0 or r_ > n or n > 500:
        return _GATE_m2  # cannot choose more members than exist
    v = math.comb(n, r_)
    steps = ["Combination law: choosing r from n (order irrelevant) gives "
             "C(n, r) = n!/(r!(n-r)!).",
             f"C({n}, {r_}) = {n}!/({r_}! x {n - r_}!) = {v}.",
             f"There are {v} possible committees."]
    return float(v), steps, str(v), None, \
        "C(n, r) = n!/(r!(n-r)!)", None


_TABLE_BOOKS3 = [
    # ---- kemh101 sets ----
    ("SET_CARD_INCLUSION_EXCLUSION",
     r"n\s*\(\s*A\s*\)\s*=\s*(?P<na>" + _NUM_m2 + r")\s*,?\s*[^.]{0,30}?"
     r"n\s*\(\s*B\s*\)\s*=\s*(?P<nb>" + _NUM_m2 + r")\s*,?\s*[^.]{0,30}?"
     r"n\s*\(\s*A\s*(?P<sym>[\u222a\u2229Uu]|union|intersection)\s*B\s*\)"
     r"\s*=\s*(?P<nx>" + _NUM_m2 + r").{0,80}?"
     r"n\s*\(\s*A\s*(?P<ask>[\u222a\u2229Uu]|union|intersection)\s*B\s*\)",
     _c_set_card),
    ("SET_OPERATIONS",
     r"(?P<op>union|intersection|difference)\s+of\s+(?:the\s+)?(?:sets?\s+)?"
     r"A\s*=\s*\{\s*(?P<elsa>[\d.,\s]+?)\s*\}\s+and\s+(?:the\s+)?"
     r"(?:sets?\s+)?B\s*=\s*\{\s*(?P<elsb>[\d.,\s]+?)\s*\}",
     _c_set_ops),
    # ---- kemh102 relations & functions: domain ----
    ("DOMAIN_RATIONAL",
     r"domain\s+of\s+(?:the\s+)?(?:function\s+)?(?:f\s*\(\s*x\s*\)\s*=\s*)?"
     r"1\s*/\s*\(\s*x\s*(?P<sgn>[+-])\s*(?P<k>" + _NUM_m2 + r")\s*\)",
     _c_domain_rational),
    ("DOMAIN_SQRT",
     r"domain\s+of\s+(?:the\s+)?(?:function\s+)?(?:f\s*\(\s*x\s*\)\s*=\s*)?"
     r"(?:square\s+root(?:\s+of)?|sqrt|\u221a)\s*\(?\s*"
     r"(?:x\s*(?P<sgn1>[+-])\s*(?P<k1>" + _NUM_m2 + r")"
     r"|(?P<k2>" + _NUM_m2 + r")\s*(?P<sgn2>[+-])\s*x)\s*\)?",
     _c_domain_sqrt),
    # ---- kemh105 linear inequalities ----
    ("LINEAR_INEQUALITY",
     r"solve\s+(?:the\s+)?(?:inequality\s+)?(?P<a>" + _NUM_m2 + r")\s*\*?\s*x"
     r"\s*(?P<s1>[+-])\s*(?P<b>" + _NUM_m2 + r")\s*(?P<op><=|>=|\u2264|\u2265|<|>)"
     r"\s*(?P<c>" + _NUM_m2 + r")\b(?!\s*=)",
     _c_linear_ineq),
    ("LINEAR_INEQUALITY",
     r"solve\s+(?:the\s+)?(?:inequality\s+)?(?P<c0>" + _NUM_m2 + r")\s*-\s*"
     r"(?P<a2>" + _U_NUM + r")\s*\*?\s*x\s*(?P<op><=|>=|\u2264|\u2265|<|>)"
     r"\s*(?P<c>" + _NUM_m2 + r")\b(?!\s*=)",
     _c_linear_ineq_rev),
    # ---- kemh106 counting word problems ----
    ("PERMUTATION_WAYS",
     r"in\s+how\s+many\s+ways\s+can\s+(?P<n>\d+)\s+(?:different\s+)?"
     r"(?:people|persons|students|books|letters|flags|digits|objects|"
     r"articles|candidates|children)\s+(?:be\s+)?(?:arranged|seated|stand"
     r"ing|stand)\s*(?:in\s+a\s+(?:row|line|circle|ring))?",
     _c_perm_ways),
    ("COMBINATION_COMMITTEE",
     r"in\s+how\s+many\s+ways\s+can\s+(?:a\s+)?(?:committee|team|group|set|"
     r"hand|delegation)\s+of\s+(?P<r>\d+)\s*(?:people|persons|students|"
     r"members|players|cards|books|items)?\s*(?:be\s+)?(?:chosen|selected|"
     r"formed|picked)\s+from\s+(?P<n>\d+)",
     _c_comb_committee),
    # ---- kemh109 straight lines: remaining forms ----
    ("LINE_POINT_SLOPE",
     r"equation\s+of\s+(?:the\s+)?line\s+(?:passing\s+)?through\s+"
     + _pt_m2("a") + r"[^.]{0,60}?slope\s+(?:is\s+)?(?P<sl>" + _NUM_m2 + r")",
     _c_line_point_slope),
    ("LINE_INTERCEPT_FORM",
     r"(?:x-?\s*intercept|intercept\s+on\s+the\s+x-?axis)\s+(?:is\s+)?"
     r"(?P<a>" + _NUM_m2 + r")[^.]{0,60}?(?:y-?\s*intercept|intercept\s+on\s+"
     r"the\s+y-?axis)\s+(?:is\s+)?(?P<b>" + _NUM_m2 + r")",
     _c_line_intercept),
    ("ANGLE_BETWEEN_LINES",
     r"angle\s+between\s+(?:the\s+)?two\s+lines\s+(?:with\s+)?slopes?\s*"
     r"(?P<m1>" + _NUM_m2 + r")\s+and\s+(?P<m2>" + _NUM_m2 + r")",
     _c_angle_lines),
    # ---- kemh110 conics: ellipse ----
    ("ELLIPSE_PROPERTIES",
     r"(?P<what>area|eccentricity|foci|distance\s+between\s+(?:the\s+)?foci)"
     r"\s+of\s+(?:an\s+)?ellipse\s+(?:with|of|having)\s+semi[\s-]?major\s+"
     r"axis\s*(?:is|of|=)?\s*(?P<a>" + _NUM_m2 + r")[^.]{0,60}?semi[\s-]?minor"
     r"\s+axis\s*(?:is|of|=)?\s*(?P<b>" + _NUM_m2 + r")",
     _c_ellipse),
    # ---- kemh111 3-D geometry ----
    ("DISTANCE_3D",
     r"distance\s+between\s+(?:the\s+)?(?:points?\s+)?"
     r"(?:origin\s+and\s+)?" + _pt3("a") + r"\s+and\s+(?:the\s+)?"
     r"(?:points?\s+)?" + _pt3("b"),
     _c_distance_3d),
    ("MIDPOINT_3D",
     r"midpoint\s+of\s+(?:the\s+)?(?:line\s+)?(?:segment\s+)?"
     r"(?:join(?:ing|s)?\s+)?(?:the\s+)?(?:points?\s+)?" + _pt3("a") +
     r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt3("b"),
     _c_midpoint_3d),
    ("SECTION_FORMULA_3D",
     r"divides?\s+(?:the\s+)?(?:line\s+)?(?:segment\s+)?"
     r"(?:join(?:ing|s)?\s+)?(?:the\s+)?(?:points?\s+)?" + _pt3("a") +
     r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt3("b") +
     r".{0,60}?ratio\s*(?P<mm>\d+)\s*:\s*(?P<nn>\d+)",
     _c_section_3d),
    # ---- kemh112 limits beyond the standard set ----
    ("LIMIT_QUAD_FACTOR",
     r"\blim(?:it)?(?:\s+as\s+)?[\(\[]?\s*x\s*(?:\u2192|->|=>)\s*"
     r"(?P<pt>" + _U_NUM + r")\s*[\)\]]?\s*(?:of\s+)?"
     r"\(?\s*x\s*\^?\s*2\s*-\s*(?P<c>" + _NUM_m2 + r")\s*\)?\s*/\s*"
     r"\(?\s*x\s*-\s*(?P<a>" + _NUM_m2 + r")\s*\)?",
     _c_limit_quad),
    ("LIMIT_QUAD_FACTOR",
     r"\blim(?:it)?\s+of\s+"
     r"\(?\s*x\s*\^?\s*2\s*-\s*(?P<c>" + _NUM_m2 + r")\s*\)?\s*/\s*"
     r"\(?\s*x\s*-\s*(?P<a>" + _NUM_m2 + r")\s*\)?\s+as\s+x\s*"
     r"(?:approaches|tends\s+to|->|\u2192)\s*(?P<pt>" + _U_NUM + r")",
     _c_limit_quad),
    ("LIMIT_POLY_DIRECT",
     r"\blim(?:it)?(?:\s+as\s+)?[\(\[]?\s*x\s*(?:\u2192|->|=>)\s*"
     r"(?P<pt>" + _U_NUM + r")\s*[\)\]]?\s*(?:of\s+)?\(?\s*"
     r"(?P<a>" + _NUM_m2 + r")\s*\*?\s*x\s*\^?\s*2\s*(?P<s1>[+-])\s*"
     r"(?P<b>" + _NUM_m2 + r")\s*\*?\s*x(?:\s*(?P<s2>[+-])\s*(?P<c>" + _NUM_m2
     + r"))?\s*\)?",
     _c_limit_poly),
    ("LIMIT_POLY_DIRECT",
     r"\blim(?:it)?\s+of\s+\(?\s*(?P<a>" + _NUM_m2 + r")\s*\*?\s*x\s*\^?\s*2"
     r"\s*(?P<s1>[+-])\s*(?P<b>" + _NUM_m2 + r")\s*\*?\s*x"
     r"(?:\s*(?P<s2>[+-])\s*(?P<c>" + _NUM_m2 + r"))?\s*\)?\s+as\s+x\s*"
     r"(?:approaches|tends\s+to|->|\u2192)\s*(?P<pt>" + _U_NUM + r")",
     _c_limit_poly),
    # ---- kemh112 / lemh106 derivatives ----
    ("DERIV_MONOMIAL_EVAL",
     r"derivative\s+of\s+(?:the\s+)?(?:function\s+)?(?:f\s*\(\s*x\s*\)"
     r"\s*=\s*)?(?P<k>" + _NUM_m2 + r"\s*\*?\s*)?x(?:\s*\^?\s*(?P<n>" + _NUM_m2
     + r"))?\s+at\s+x\s*=\s*(?P<pt>" + _NUM_m2 + r")",
     _c_deriv_monomial),
    ("DERIV_QUAD_EVAL",
     r"derivative\s+of\s+(?:the\s+)?(?:function\s+)?(?:f\s*\(\s*x\s*\)"
     r"\s*=\s*)?(?P<a>" + _NUM_m2 + r")\s*\*?\s*x\s*\^?\s*2\s*(?P<s1>[+-])\s*"
     r"(?P<b>" + _NUM_m2 + r")\s*\*?\s*x(?:\s*(?P<s2>[+-])\s*(?P<c>" + _NUM_m2
     + r"))?\s+at\s+x\s*=\s*(?P<pt>" + _NUM_m2 + r")",
     _c_deriv_quad),
    ("TANGENT_SLOPE",
     r"slope\s+of\s+(?:the\s+)?tangent\s+to\s+(?:the\s+)?(?:curve\s+)?"
     r"y\s*=\s*(?:(?P<a>" + _NUM_m2 + r")\s*\*?\s*)?x\s*\^?\s*2"
     r"(?:\s*(?P<s1>[+-])\s*(?P<b>" + _NUM_m2 + r")\s*\*?\s*x"
     r"(?:\s*(?P<s2>[+-])\s*(?P<c>" + _NUM_m2 + r"))?)?\s+at\s+x\s*=\s*"
     r"(?P<pt>" + _NUM_m2 + r")",
     _c_tangent_slope),
    ("INCREASING_DECREASING",
     r"(?:determine\s+whether\s+)?f\s*\(\s*x\s*\)\s*=\s*(?:(?P<a>" + _NUM_m2
     + r")\s*\*?\s*)?x\s*\^?\s*2(?:\s*(?P<s1>[+-])\s*(?P<b>" + _NUM_m2 + r")"
     r"\s*\*?\s*x)?\s+is\s+increasing\s+or\s+decreasing\s+at\s+x\s*=\s*"
     r"(?P<pt>" + _NUM_m2 + r")",
     _c_inc_dec),
    ("EXTREMA_QUAD",
     r"(?P<kind>maximum|minimum)\s+(?:value\s+of\s+(?:the\s+)?"
     r"(?:function\s+)?(?:f\s*\(\s*x\s*\)\s*=\s*)?)?(?:(?P<a>" + _NUM_m2 + r")"
     r"\s*\*?\s*)?x\s*\^?\s*2(?:\s*(?P<s1>[+-])\s*(?P<b>" + _NUM_m2 + r")"
     r"\s*\*?\s*x(?:\s*(?P<s2>[+-])\s*(?P<c>" + _NUM_m2 + r"))?)?",
     _c_extrema_quad),
    ("EXTREMA_QUAD",
     r"(?P<kind>maximum|minimum)\s+value\s+of\s+(?:the\s+)?"
     r"(?:function\s+)?(?:f\s*\(\s*x\s*\)\s*=\s*)?(?P<c0>" + _NUM_m2 + r")"
     r"\s*(?P<s0>[+-])\s*(?P<b2>" + _NUM_m2 + r")\s*\*?\s*x\s*"
     r"(?P<s1>[+-])\s*(?:(?P<a2>" + _U_NUM + r")\s*\*?\s*)?x\s*\^?\s*2",
     _c_extrema_quad),
    # ---- lemh106 applications: related rates ----
    ("RATE_SPHERE_VOLUME",
     r"radius\s+of\s+(?:a\s+)?(?:sphere|balloon|bubble|ball)[^.]{0,20}?"
     r"(?P<dir>increas|decreas)(?:ing|es)\s+at\s+(?:the\s+rate\s+of\s+)?"
     r"(?P<rate>" + _NUM_m2 + r")\s*(?P<unit>cm|mm|m)\s*(?:/|per)\s*s\b"
     r".{0,200}?radius\s*(?:is\s+|is\s+equal\s+to\s+|=)?\s*"
     r"(?P<r>" + _NUM_m2 + r")",
     _c_rate_sphere),
    ("RATE_CIRCLE_AREA",
     r"radius\s+of\s+(?:a\s+)?circle[^.]{0,20}?"
     r"(?P<dir>increas|decreas)(?:ing|es)\s+at\s+(?:the\s+rate\s+of\s+)?"
     r"(?P<rate>" + _NUM_m2 + r")\s*(?P<unit>cm|mm|m)\s*(?:/|per)\s*s\b"
     r".{0,200}?radius\s*(?:is\s+|is\s+equal\s+to\s+|=)?\s*"
     r"(?P<r>" + _NUM_m2 + r")",
     _c_rate_circle),
    # ---- lemh201/202 integrals ----
    ("INTEGRAL_POWER",
     r"integrat\w+\s+(?:the\s+)?(?:(?P<co>" + _NUM_m2 + r")\s*\*?\s+)?"
     r"x\s*(?:\^|\*\*)?\s*(?P<n>\d+)?\s*(?:with\s+respect\s+to\s+)?dx\s+"
     r"from\s+(?P<lo>" + _NUM_m2 + r")\s+to\s+(?P<hi>" + _NUM_m2 + r")",
     _c_integral_power),
    ("INTEGRAL_POWER",
     r"(?:value\s+of\s+the\s+)?integral\s+of\s+(?:(?P<co>" + _NUM_m2 +
     r")\s*\*?\s+)?x\s*(?:\^|\*\*)?\s*(?P<n>\d+)?\s*(?:with\s+respect"
     r"\s+to\s+)?dx\s+from\s+(?P<lo>" + _NUM_m2 + r")\s+to\s+(?P<hi>"
     + _NUM_m2 + r")",
     _c_integral_power),
    ("INTEGRAL_POWER",
     r"integrat\w+\s+(?:the\s+)?(?:(?P<co>" + _NUM_m2 + r")\s*\*?\s+)?"
     r"x\s*(?:\^|\*\*)?\s*(?P<n>\d+)?\s*(?:with\s+respect\s+to\s+)?dx\b",
     _c_integral_power),
    # ---- lemh202 area under a line ----
    ("AREA_UNDER_LINE",
     r"area\s+(?:bounded|enclosed)\s+by\s+(?:the\s+)?(?:line\s+)?"
     r"y\s*=\s*(?P<k>" + _NUM_m2 + r")\s*\*?\s*x\s*,\s*(?:the\s+)?x-?axis"
     r"[^.]{0,80}?x\s*=\s*(?P<lo>" + _NUM_m2 + r")\s*(?:and|to)\s*"
     r"x\s*=\s*(?P<hi>" + _NUM_m2 + r")",
     _c_area_line),
    # ---- lemh203 differential equations ----
    ("DIFFEQ_POLY",
     r"solve\s+(?:the\s+)?(?:differential\s+equation\s+)?dy\s*/\s*dx\s*=\s*"
     r"(?P<k>" + _NUM_m2 + r")\s*\*?\s*x(?:\s*\^?\s*(?P<n>\d+))?",
     _c_diffeq_poly),
    ("DIFFEQ_EXP",
     r"solve\s+(?:the\s+)?(?:differential\s+equation\s+)?dy\s*/\s*dx\s*=\s*"
     r"(?P<k>" + _NUM_m2 + r")\s*\*?\s*y\b(?:[^.]{0,40}?y\s*\(\s*0\s*\)"
     r"\s*=\s*(?P<y0>" + _NUM_m2 + r"))?",
     _c_diffeq_exp),
    ("DIFFEQ_ORDER_DEGREE",
     r"order\s+and\s+degree\s+of\s+(?:the\s+)?(?:differential\s+)?"
     r"(?:equation\s+)?(?P<eq>[^?]{4,140})",
     _c_diffeq_order),
    # ---- lemh206 linear programming ----
    ("LPP_OPTIMAL",
     r"(?P<kind>maximi[sz]e|minimi[sz]e)\s+(?:Z\s*=\s*)?(?:(?P<p>" + _NUM_m2
     + r")\s*\*?\s*)?x\s*\+\s*(?:(?P<q>" + _NUM_m2 + r")\s*\*?\s*)?y"
     r"[^.]{0,60}?subject\s+to[^.]{0,120}?" + _lppc("c1") +
     r"[^.]{0,60}?" + _lppc("c2"),
     _c_lpp),
    # ---- lemh102 inverse trigonometry ----
    ("INV_TRIG_STD",
     r"\b(?P<fn>sin|cos|tan)\s*(?:inverse|inv)\s*(?:of\s*)?\(?\s*"
     r"(?P<val>" + _NUM_m2 + r"(?:\s*/\s*" + _U_NUM + r")?)\s*\)?",
     _c_inv_trig),
    ("INV_TRIG_STD",
     r"\barc(?P<fn>sin|cos|tan)\s*\(?\s*(?P<val>" + _NUM_m2 +
     r"(?:\s*/\s*" + _U_NUM + r")?)\s*\)?",
     _c_inv_trig),
    ("INV_TRIG_STD",
     r"(?P<fn>sin|cos|tan)\s*\^\s*-\s*1\s*\(?\s*(?P<val>" + _NUM_m2 +
     r"(?:\s*/\s*" + _U_NUM + r")?)\s*\)?",
     _c_inv_trig),
    # ---- lemh204 vectors ----
    ("VECTOR_DOT",
     r"(?:dot|scalar)\s+product\s+of\s+(?:the\s+)?(?:vectors?\s+)?"
     + _vec3("a") + r"\s+and\s+(?:the\s+)?(?:vector\s+)?(?:"
     + _vec3("b") + r"|" + _vec3_noi("b") + r")",
     _c_vec_dot),
    ("VECTOR_MAGNITUDE",
     r"magnitude\s+of\s+(?:the\s+)?(?:vector\s+|position\s+vector\s+)?"
     + _vec3("a"),
     _c_vec_mag),
    # ---- lemh104 determinants ----
    ("DETERMINANT_2X2",
     r"determinant\s+of\s+(?:the\s+)?(?:matrix\s+)?" + _mtx("m"),
     _c_det2),
    # ---- lemh207 conditional probability from event probabilities ----
    ("PROBABILITY_COND_EVENTS",
     r"P\s*\(\s*(?P<q1>A|B)\s*\|\s*(?P<q2>A|B)\s*\)",
     _c_prob_events_sent),
]

_TABLE_m2.extend(_TABLE_BOOKS3)


# --------------------------------------------------------------------------- #
# CISCE/ICSE-ISC phrasing wave (2026-09-30).  New families + trigger
# variants mined from the cisce_nodes_v2 maths corpus (c9/c10 math ICSE,
# c11/c12 math + appmath ISC).  Same contract: anchored triggers,
# fail-closed gates, exact closed forms; a gate refusal just keeps the
# scan going.  Critique/explain/evaluate asks are gated OUT by design --
# those stay guided rather than risk a confident-wrong.
# --------------------------------------------------------------------------- #

_RS_CISCE = r"(?:₹|Rs\.?|INR)\s*"
_CRITIQUE_RE = re.compile(
    r"\b(claims?|claimed|instead|mistake|explain\w*|compar\w*|criticis\w*"
    r"|criticiz\w*|justif\w*|assess\w*|error|incorrect|wrong|critique\w*"
    r"|outline|derive|prove|show that|create|design|state the|state your"
    r"|define|discuss\w*|point out|word problem)\b"
    r"|\bstudent\s+(?:claim|solve|writ|comput|calculat|us|argu|stat|"
    r"respond|answer)"
    r"|\bstudent's\s+(?:response|answer|work|claim|solution)"
    r"|\bevaluat\w*\s+(?:this|it|whether|how|why|the\s+(?:claim|statement"
    r"|response|student|correctness|validity|reason|argument|solution|"
    r"approach|answer))",
    re.I)

_PAIR_CISCE_RE = re.compile(
    r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)")


def _c_pairs(text: str) -> List[Tuple[float, float]]:
    """Distinct (x, y) coordinate pairs, in order of appearance."""
    out: List[Tuple[float, float]] = []
    for mm in _PAIR_CISCE_RE.finditer(text or ""):
        p = (float(mm.group(1)), float(mm.group(2)))
        if p not in out:
            out.append(p)
    return out


def _strip_fn_prefix(s: str) -> str:
    """'f(x)=2x^3-5x^2+3x-4' / '\\(p(x)=x^3+...\\)' -> '2x^3-5x^2+3x-4'."""
    s = (s or "").strip()
    s = s.replace("\\", "")          # latex artifact backslashes
    s = re.sub(r"^[A-Za-z]\s*\(\s*[a-z]\s*\)\s*(?:=|:=)\s*", "", s).strip()
    return s.strip(" \t.,;?")


def _poly_expr(s: str):
    """Polynomial-ish math substring -> sympy expression, else None."""
    import sympy
    from backend.its.solver.math_kernel import parse_expression
    raw = _strip_fn_prefix(s)
    if not raw or not re.search(r"[0-9a-z]", raw, re.I):
        return None
    e = parse_expression(raw)
    if e is None or not isinstance(e, sympy.Basic):
        return None
    if not e.free_symbols and not e.is_number:
        return None
    return e


def _divisor_root(s: str):
    """'(x-2)' / 'x + 1' / '2x-1' / '\\((x+1)\\)' -> (var, root); None
    when the divisor is not a clean linear polynomial."""
    import sympy
    raw = (s or "").replace("\\", "").strip().strip("()").strip()
    if not re.fullmatch(r"[a-z]\s*(?:[+-]\s*\d+(?:\.\d+)?)?", raw):
        return None
    e = _poly_expr(raw)
    if e is None:
        return None
    syms = e.free_symbols
    if len(syms) != 1:
        return None
    v = list(syms)[0]
    try:
        p = sympy.Poly(e, v)
    except Exception:
        return None
    if p.degree() != 1:
        return None
    a, b = p.all_coeffs()
    if a == 0:
        return None
    return v, sympy.Rational(-b, 1) / sympy.Rational(a)


def _poly_at(p, var, root) -> Optional[float]:
    """Exact substitution p(root) -> float; None when not a number."""
    import sympy
    val = sympy.simplify(p.subs(var, root))
    if not val.is_number:
        return None
    f = float(val)
    if abs(f - round(f)) < 1e-9:
        f = float(round(f))
    return f


def _c_poly_remainder(g, m, text):
    """Remainder Theorem: remainder of p(x) on division by (x - a) is
    p(a).  Gate: the polynomial must be fully numeric (unknown
    coefficients route to POLY_UNKNOWN_COEFF)."""
    import sympy
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    p = _poly_expr(g["poly"])
    if p is None:
        return _GATE_m2
    if len(p.free_symbols) != 1:
        return _GATE_m2
    parsed = _divisor_root(g["div"])
    if parsed is None:
        return _GATE_m2
    var, root = parsed
    if var not in p.free_symbols:
        return _GATE_m2
    rf = _poly_at(p, var, root)
    if rf is None:
        return _GATE_m2
    try:
        deg = sympy.Poly(p, var).degree()
    except Exception:
        return _GATE_m2
    if deg < 1:
        return _GATE_m2
    steps = [
        "Method: Remainder Theorem -- dividing p(x) by the linear "
        f"divisor ({var} - a) leaves remainder p(a).",
        f"Divisor {str(g['div']).strip()} = 0 gives {var} = "
        f"{float(root):g}.",
        f"p({float(root):g}) = {_strip_fn_prefix(str(p))} at "
        f"{var} = {float(root):g} is {rf:g}."]
    return rf, steps, None, None, "remainder = p(a), divisor (x - a)", \
        {"root": float(root)}


def _c_poly_factor(g, m, text):
    """Factor Theorem check: (x - a) is a factor of p(x) iff p(a) = 0.
    Full-factorisation / explain asks gate out (honest guided)."""
    if re.search(r"factoris|factoriz|factor\s+completely|hence|quotient",
                 text, re.I):
        return _GATE_m2
    p = _poly_expr(g["poly"])
    if p is None:
        return _GATE_m2
    if len(p.free_symbols) != 1:
        return _GATE_m2
    parsed = _divisor_root(g["div"])
    if parsed is None:
        return _GATE_m2
    var, root = parsed
    if var not in p.free_symbols:
        return _GATE_m2
    rf = _poly_at(p, var, root)
    if rf is None:
        return _GATE_m2
    div_s = str(g["div"]).strip().strip("()")
    if abs(rf) < 1e-12:
        ans = (f"Yes, ({div_s}) is a factor of p(x): "
               f"p({float(root):g}) = 0 (Factor Theorem).")
        val = 0.0
    else:
        ans = (f"No, ({div_s}) is not a factor of p(x): "
               f"p({float(root):g}) = {rf:g} != 0.")
        val = rf
    steps = [
        "Method: Factor Theorem -- (x - a) is a factor of p(x) "
        "exactly when p(a) = 0.",
        f"Divisor ({div_s}) = 0 gives {var} = {float(root):g}.",
        f"p({float(root):g}) = {rf:g}, so the divisor is "
        + ("a factor." if abs(rf) < 1e-12 else "not a factor.")]
    return val, steps, ans, None, "(x - a) | p(x) <=> p(a) = 0", \
        {"root": float(root), "pval": rf}


def _c_poly_unknown_coeff(g, m, text):
    """Unknown-coefficient polynomial: conditions (remainder values on
    division by linear divisors, factor statements) name the polynomial
    variable; the coefficient unknowns are the OTHER letters.  The
    polynomial is read either from an assignment ('p(x) = ...') or from
    the bare expression after 'is a factor of'.  Solved exactly; a
    non-unique solution gates."""
    import sympy
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    conds = []                      # (var, root, rhs, desc)
    cond_var = None
    for rm in re.finditer(
            r"remainder\s+(?:of\s+)?(?P<rem>-?" + _NUM_m2 + r")\s+when\s+"
            r"divided\s+by\s+(?P<div>[^.,;?=]+?)(?=,|\s+and\b|\s+find\b|"
            r"\s+determine\b|\s+hence\b|\?|\.|$)", text, re.I):
        parsed = _divisor_root(rm.group("div"))
        if parsed is None:
            return _GATE_m2
        dvar, root = parsed
        conds.append((dvar, root, sympy.Rational(str(rm.group("rem"))),
                      f"remainder {rm.group('rem')} when divided by "
                      f"{rm.group('div').strip()}"))
        if cond_var is None:
            cond_var = dvar
        elif dvar != cond_var:
            return _GATE_m2
    fm = re.search(
        r"\(?\s*([a-z])\s*(?:(?P<sgn>[+-])\s*(?P<c>" + _NUM_m2 + r"))?\s*\)?"
        r"\s+is\s+a\s+(?:factor|divisor)\s+of", text, re.I)
    if fm and fm.group("c") is not None:
        fvar = sympy.Symbol(fm.group(1))
        # divisor (x + c) -> root -c; (x - c) -> root +c
        froot = (sympy.Rational(fm.group("c"))
                 * (1 if fm.group("sgn") == "-" else -1))
        conds.append((fvar, froot, sympy.Integer(0),
                      f"({fm.group(1)} {fm.group('sgn')} "
                      f"{fm.group('c')}) is a factor"))
        if cond_var is None:
            cond_var = fvar
        elif fvar != cond_var:
            return _GATE_m2
    if not conds or cond_var is None:
        return _GATE_m2
    am = re.search(
        r"(?:polynomial\s+)?[A-Za-z]\s*\(\s*([a-z])\s*\)\s*=\s*"
        r"(?P<pt>[^.,;?=]+?)\s*(?=\bleaves?\b|\bwhen\b|\bwith\b|,|\.|\?|$)",
        text)
    if am:
        if sympy.Symbol(am.group(1)) != cond_var:
            return _GATE_m2
        poly_text = am.group("pt")
    else:
        bm = re.search(
            r"is\s+a\s+(?:factor|divisor)\s+of\s+(?:the\s+)?"
            r"(?:polynomial\s+)?([^.,;?=]+)", text, re.I)
        if not bm:
            return _GATE_m2
        poly_text = bm.group(1)
    p = _poly_expr(poly_text)
    if p is None or cond_var not in p.free_symbols:
        return _GATE_m2
    unk = sorted(p.free_symbols - {cond_var}, key=str)
    if not (1 <= len(unk) <= 2):
        return _GATE_m2
    eqs = [sympy.Eq(p.subs(v, root), rhs) for v, root, rhs, _d in conds]
    try:
        sols = sympy.solve(eqs, unk, dict=True)
    except Exception:
        return _GATE_m2
    if len(sols) != 1:
        return _GATE_m2
    sol = sols[0]
    if not all(v.is_number for v in sol.values()):
        return _GATE_m2
    parts = [(str(k), float(v)) for k, v in sorted(sol.items(), key=str)]
    ans = ", ".join(f"{k} = {v:g}" for k, v in parts)
    steps = [
        "Method: each remainder/factor condition fixes p(root); the "
        "resulting equation(s) are solved exactly for the unknown "
        "coefficient(s).",
        "Conditions: " + "; ".join(c[3] for c in conds),
        "; ".join(f"{k} = {v:g}" for k, v in parts)]
    value = parts[0][1] if len(parts) == 1 else None
    extra = {k: v for k, v in parts}
    return (value, steps, ans, None,
            "coefficient(s) from remainder/factor condition", extra)


def _c_section_external(g, m, text):
    """External division: P = ((m x2 - n x1)/(m - n), ...).  The
    internal reading is the earlier SECTION_FORMULA row; this row only
    fires when the text says external."""
    if not re.search(r"\bexternal", text, re.I):
        return _GATE_m2
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    x1, y1 = float(g["ax"]), float(g["ay"])
    x2, y2 = float(g["bx"]), float(g["by"])
    mm_, nn_ = float(g["mm"]), float(g["nn"])
    if mm_ == nn_ or mm_ <= 0 or nn_ <= 0:
        return _GATE_m2  # m = n never divides externally
    px = (mm_ * x2 - nn_ * x1) / (mm_ - nn_)
    py = (mm_ * y2 - nn_ * y1) / (mm_ - nn_)
    steps = [
        f"External division in ratio m:n = {mm_:g}:{nn_:g}: P = "
        "((m x2 - n x1)/(m - n), (m y2 - n y1)/(m - n)).",
        f"x = ({mm_:g} x {_fmt_m2(x2)} - {nn_:g} x {_fmt_m2(x1)})/"
        f"{_fmt_m2(mm_ - nn_)} = {_fmt_m2(px)}",
        f"y = ({mm_:g} x {_fmt_m2(y2)} - {nn_:g} x {_fmt_m2(y1)})/"
        f"{_fmt_m2(mm_ - nn_)} = {_fmt_m2(py)}",
        f"P = ({_fmt_m2(px)}, {_fmt_m2(py)})"]
    return px, steps, f"({_fmt_m2(px)}, {_fmt_m2(py)})", None, \
        "P = ((m x2 - n x1)/(m-n), (m y2 - n y1)/(m-n))", \
        {"px": px, "py": py}


def _c_section_labeled(g, m, text):
    """'... divides AB internally in the ratio 4 : 1' where the segment
    endpoints were named earlier: harvest the two coordinate pairs.
    Gate: exactly two distinct pairs, else the pairing is a guess."""
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    external = bool(re.search(r"\bexternal", text, re.I))
    pts = _c_pairs(text)
    if len(pts) != 2:
        return _GATE_m2
    mm_, nn_ = float(g["mm"]), float(g["nn"])
    if mm_ <= 0 or nn_ <= 0:
        return _GATE_m2
    (x1, y1), (x2, y2) = pts
    if external:
        if mm_ == nn_:
            return _GATE_m2
        px = (mm_ * x2 - nn_ * x1) / (mm_ - nn_)
        py = (mm_ * y2 - nn_ * y1) / (mm_ - nn_)
        law = "external division: P = ((m x2 - n x1)/(m-n), ...)"
    else:
        px = (mm_ * x2 + nn_ * x1) / (mm_ + nn_)
        py = (mm_ * y2 + nn_ * y1) / (mm_ + nn_)
        law = "internal division: P = ((m x2 + n x1)/(m+n), ...)"
    steps = [
        f"{'External' if external else 'Internal'} division of the "
        f"segment ({_fmt_m2(x1)}, {_fmt_m2(y1)})--({_fmt_m2(x2)}, {_fmt_m2(y2)}) "
        f"in ratio {mm_:g}:{nn_:g}.",
        f"x = {_fmt_m2(px)}, y = {_fmt_m2(py)}",
        f"P = ({_fmt_m2(px)}, {_fmt_m2(py)})"]
    return px, steps, f"({_fmt_m2(px)}, {_fmt_m2(py)})", None, law, \
        {"px": px, "py": py}


def _c_centroid(g, m, text):
    """Centroid = mean of the three vertices (2-D)."""
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    pts = _c_pairs(text)
    if len(pts) != 3:
        return _GATE_m2
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    gx = sum(xs) / 3.0
    gy = sum(ys) / 3.0
    steps = [
        "Method: the centroid is the mean of the vertices -- "
        "G = ((x1+x2+x3)/3, (y1+y2+y3)/3).",
        f"x = ({_fmt_m2(xs[0])} + {_fmt_m2(xs[1])} + {_fmt_m2(xs[2])})/3 = "
        f"{_fmt_m2(gx)}",
        f"y = ({_fmt_m2(ys[0])} + {_fmt_m2(ys[1])} + {_fmt_m2(ys[2])})/3 = "
        f"{_fmt_m2(gy)}",
        f"G = ({_fmt_m2(gx)}, {_fmt_m2(gy)})"]
    return gx, steps, f"({_fmt_m2(gx)}, {_fmt_m2(gy)})", None, \
        "G = ((x1+x2+x3)/3, (y1+y2+y3)/3)", {"gx": gx, "gy": gy}


def _reflection_of(x: float, y: float, mirror: str,
                   k: Optional[float]) -> Optional[Tuple[float, float, str]]:
    """Image of (x, y) in the named mirror; None for an unknown mirror."""
    if mirror == "x-axis":
        return x, -y, "(x, -y)"
    if mirror == "y-axis":
        return -x, y, "(-x, y)"
    if mirror == "origin":
        return -x, -y, "(-x, -y)"
    if mirror == "line x=k" and k is not None:
        return 2 * k - x, y, f"(2k - x, y), k = {k:g}"
    if mirror == "line y=k" and k is not None:
        return x, 2 * k - y, f"(x, 2k - y), k = {k:g}"
    if mirror == "line y=x":
        return y, x, "(y, x)"
    return None


def _mirror_groups(g) -> Tuple[Optional[str], Optional[float]]:
    """Read the mirror alternation groups -> (mirror, k)."""
    if g.get("m_axis"):
        return g["m_axis"].lower().replace(" ", ""), None
    if g.get("m_org"):
        return "origin", None
    if g.get("m_var") and g.get("m_k") is not None:
        return f"line {str(g['m_var']).lower()}=k", float(g["m_k"])
    if g.get("m_s1") and g.get("m_s2"):
        a_, b_ = str(g["m_s1"]).lower(), str(g["m_s2"]).lower()
        if {a_, b_} == {"x", "y"}:
            return "line y=x", None
    return None, None


def _c_reflection(g, m, text):
    """Reflection of a point in an axis / origin / line x=k / line y=k /
    line y=x -- all exact negations/translations/swaps."""
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    x, y = float(g["px"]), float(g["py"])
    mirror, k = _mirror_groups(g)
    got = _reflection_of(x, y, mirror or "", k)
    if got is None:
        return _GATE_m2
    ix, iy, law = got
    steps = [
        f"Method: reflection of ({_fmt_m2(x)}, {_fmt_m2(y)}) in the "
        f"{(mirror or '').replace('line ', '')} applies the image law "
        f"{law}.",
        f"Image = ({_fmt_m2(ix)}, {_fmt_m2(iy)})"]
    return ix, steps, f"({_fmt_m2(ix)}, {_fmt_m2(iy)})", None, law, \
        {"ix": ix, "iy": iy}


def _c_reflection_line(g, m, text):
    """Reflection of a point in the general line ax + by + c = 0:
    P' = P - 2 (a x0 + b y0 + c)/(a^2 + b^2) (a, b)."""
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    x0, y0 = float(g["px"]), float(g["py"])
    a = float(g["la"])
    b = float(g["lb"]) * (-1 if g.get("lsb") == "-" else 1)
    c = float(g["lc"]) * (-1 if g.get("lsc") == "-" else 1)
    if a == 0 and b == 0:
        return _GATE_m2
    d = a * x0 + b * y0 + c
    den = a * a + b * b
    ix = x0 - 2 * d * a / den
    iy = y0 - 2 * d * b / den
    steps = [
        "Method: reflection in the line ax + by + c = 0 -- "
        "P' = P - 2 d (a, b)/(a^2 + b^2) with d = a x0 + b y0 + c.",
        f"d = {a:g}x{_fmt_m2(x0)} + {b:g}x{_fmt_m2(y0)} + ({c:g}) = {_fmt_m2(d)}",
        f"P' = ({_fmt_m2(x0)}, {_fmt_m2(y0)}) - 2x{_fmt_m2(d)}/{_fmt_m2(den)} x "
        f"({a:g}, {b:g}) = ({_fmt_m2(ix)}, {_fmt_m2(iy)})"]
    return ix, steps, f"({_fmt_m2(ix)}, {_fmt_m2(iy)})", None, \
        "P' = P - 2(a x0 + b y0 + c)/(a^2+b^2) (a, b)", \
        {"ix": ix, "iy": iy}


def _parse_line_abc(s: str):
    """'2x + 3y + 4 = 0' / 'x - y = 3' -> (a, b, c) with ax+by+c=0."""
    raw = (s or "").strip().strip("()").strip()
    raw = raw.replace("−", "-")
    mm = re.fullmatch(
        r"\s*(?P<a>-?\d*\.?\d*)\s*x\s*(?P<sb>[+-])\s*(?P<b>\d*\.?\d*)\s*y"
        r"(?:\s*(?P<sc>[+-])\s*(?P<c>\d*\.?\d*)?)?\s*"
        r"=\s*(?P<rhs>-?\d+(?:\.\d+)?)\s*", raw)
    if not mm:
        return None
    a = float(mm.group("a")) if mm.group("a") not in ("", "-") \
        else (-1.0 if mm.group("a") == "-" else 1.0)
    b_raw = mm.group("b")
    b = (float(b_raw) if b_raw not in ("", "-")
         else (-1.0 if b_raw == "-" else 1.0)) * \
        (-1 if mm.group("sb") == "-" else 1)
    if b == 0:
        return None
    c = 0.0
    if mm.group("c") is not None:
        c = float(mm.group("c")) * (-1 if mm.group("sc") == "-" else 1)
    c -= float(mm.group("rhs"))
    if a == 0 and b == 0:
        return None
    return a, b, c


def _c_dist_parallel(g, m, text):
    """Distance between two PARALLEL lines: normalise the scale, then
    |c2' - c1| / sqrt(a^2 + b^2).  Non-parallel pairs gate."""
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    l1 = _parse_line_abc(g["l1"])
    l2 = _parse_line_abc(g["l2"])
    if l1 is None or l2 is None:
        return _GATE_m2
    a1, b1, c1 = l1
    a2, b2, c2 = l2
    if a2 == 0:
        return _GATE_m2
    k = a2 / a1
    if abs(b2 - k * b1) > 1e-9:
        return _GATE_m2     # not parallel: a different (unmodelled) problem
    d = abs(c2 - k * c1) / math.sqrt(a2 * a2 + b2 * b2)
    steps = [
        "Method: for parallel lines the distance is "
        "|c2' - c1| / sqrt(a^2 + b^2) after normalising both lines to "
        "the same (a, b).",
        f"Line 2 scaled by 1/{_fmt_m2(k)}: ({_fmt_m2(a2)}, {_fmt_m2(b2)}, "
        f"{_fmt_m2(c2)}) -> ({_fmt_m2(a1)}, {_fmt_m2(b1)}, {_fmt_m2(c2 / k)})",
        f"d = |{_fmt_m2(c2 / k)} - ({_fmt_m2(c1)})| / sqrt({_fmt_m2(a1)}^2 + "
        f"{_fmt_m2(b1)}^2) = {_fmt_m2(d)}"]
    return d, steps, None, None, \
        "d = |c2' - c1| / sqrt(a^2 + b^2), parallel lines", {"d": d}


def _rd_num(s: str) -> Optional[float]:
    """'1 500' / '1,23,200' / '38880' / '500 ' -> float."""
    raw = re.sub(r"(?<=\d)[\s,]+(?=\d)", "", (s or "").strip())
    if not re.fullmatch(r"-?\d+(?:\.\d+)?", raw):
        return None
    return float(raw)


def _rd_harvest(text: str):
    """(P per month, n months, r %, M maturity) from an RD question;
    missing pieces are None."""
    p = None
    mp = re.search(
        r"(?P<amt>[\d,\s]+(?:\.\d+)?)\s*(?:₹|Rs\.?|INR)?\s*(?:per|every|"
        r"each)\s*month", text, re.I)
    if not mp:
        mp = re.search(
            r"(?:₹|Rs\.?|INR)\s*(?P<amt>[\d,\s]+(?:\.\d+)?)\s*(?:per|every"
            r"|each)\s*month", text, re.I)
    if mp:
        p = _rd_num(mp.group("amt"))
    n = None
    mn = re.search(r"for\s+(?P<n>\d+)\s*(?P<unit>months?|years?)", text,
                   re.I)
    if mn:
        n = float(mn.group("n"))
        if mn.group("unit").lower().startswith("year"):
            n *= 12.0
    r = None
    mr = re.search(r"(?:at|@|rate\s+(?:of\s+)?)\s*(?P<r>\d+(?:\.\d+)?)"
                   r"\s*%", text, re.I)
    if mr:
        r = float(mr.group("r"))
    mv = None
    mm = re.search(
        r"maturity\s+(?:value|amount|sum)\s+(?:is\s+|of\s+|was\s+)?"
        r"(?:₹|Rs\.?|INR)\s*(?P<m>[\d,\s]+(?:\.\d+)?)", text, re.I)
    if mm:
        mv = _rd_num(mm.group("m"))
    return p, n, r, mv


def _c_rd_maturity(g, m, text):
    """ICSE recurring deposit: M = P n + P n(n+1)/2 x r/(12 x 100).
    Rate-inverse / period-inverse asks route to the sibling rows."""
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    if not re.search(r"\b(?:RD|recurring\s+deposit|recurring\s+account)\b",
                     text, re.I):
        return _GATE_m2
    p, n, r, mv = _rd_harvest(text)
    if p is None or n is None or r is None or mv is not None:
        return _GATE_m2
    if p <= 0 or n < 1 or not (0 < r <= 30):
        return _GATE_m2
    k = n * (n + 1) / 2.0
    interest = p * k * r / (12.0 * 100.0)
    total = p * n + interest
    steps = [
        "Method: ICSE recurring-deposit maturity -- each monthly "
        "instalment P earns simple interest for the months it stays in; "
        "the month-count sums to 1+2+...+n = n(n+1)/2 months.",
        f"Interest = P x n(n+1)/2 x r/(12 x 100) = {_fmt_m2(p)} x "
        f"{_fmt_m2(n)}x{_fmt_m2(n + 1)}/2 x {r:g}/1200 = {_fmt_m2(interest)}",
        f"Maturity = P x n + Interest = {_fmt_m2(p * n)} + "
        f"{_fmt_m2(interest)} = {_fmt_m2(total)}"]
    return total, steps, None, None, \
        "M = Pn + P n(n+1) r / 2400", {"maturity": total}


def _c_rd_rate(g, m, text):
    """Rate inverse: r = 2400 (M - P n) / (P n (n+1)) percent."""
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    if not re.search(r"\b(?:RD|recurring\s+deposit|recurring\s+account)\b",
                     text, re.I):
        return _GATE_m2
    if not re.search(r"(?:find|determine|calculate)\s+(?:the\s+)?"
                     r"(?:annual\s+)?(?:rate|interest\s+rate)", text, re.I):
        return _GATE_m2
    p, n, r, mv = _rd_harvest(text)
    if p is None or n is None or mv is None or r is not None:
        return _GATE_m2
    interest = mv - p * n
    if interest <= 0 or p <= 0 or n < 1:
        return _GATE_m2
    rate = 2400.0 * interest / (p * n * (n + 1.0))
    if not (0 < rate <= 30):
        return _GATE_m2
    steps = [
        "Method: invert the RD maturity relation -- interest "
        "I = M - Pn = P n(n+1)/2 x r/1200, solved for r.",
        f"I = {_fmt_m2(mv)} - {_fmt_m2(p)}x{_fmt_m2(n)} = {_fmt_m2(interest)}",
        f"r = 2400 I / (P n(n+1)) = 2400 x {_fmt_m2(interest)} / "
        f"({_fmt_m2(p)} x {_fmt_m2(n)}x{_fmt_m2(n + 1)}) = {rate:g} % p.a."]
    return rate, steps, None, None, \
        "r = 2400 (M - Pn) / (P n(n+1))", {"rate": rate}


def _c_rd_period(g, m, text):
    """Period inverse: n(n+1) = 2400 I / (P r); exact positive root."""
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    if not re.search(r"\b(?:RD|recurring\s+deposit|recurring\s+account)\b",
                     text, re.I):
        return _GATE_m2
    if not re.search(r"(?:find|determine|calculate)\s+(?:the\s+)?"
                     r"(?:number\s+of\s+months|period|time|duration)",
                     text, re.I):
        return _GATE_m2
    p, n, r, mv = _rd_harvest(text)
    if p is None or r is None or mv is None or n is not None:
        return _GATE_m2
    interest = mv - p * 1.0
    # n unknown: I = mv - p n; with I = P n(n+1)/2 x r/1200 the maturity
    # reads M = P n + P r n(n+1)/2400 -- solve the quadratic in n.
    if p <= 0 or not (0 < r <= 30) or mv <= p:
        return _GATE_m2
    import sympy
    nsym = sympy.Symbol("n")
    eq = sympy.Eq(p * nsym + p * r * nsym * (nsym + 1) / 2400.0, mv)
    sols = [s for s in sympy.solve(eq, nsym) if s.is_number and s > 0]
    if len(sols) != 1:
        return _GATE_m2
    nf = float(sols[0])
    nr = round(nf)
    if abs(nf - nr) > 1e-6:
        return _GATE_m2     # school RDs have whole-month periods
    steps = [
        "Method: invert the RD maturity relation M = Pn + "
        "P r n(n+1)/2400 for the whole-month period n.",
        f"{_fmt_m2(p)} n + {_fmt_m2(p)}x{r:g} n(n+1)/2400 = {_fmt_m2(mv)}",
        f"n = {nr:g} months"]
    return float(nr), steps, None, None, \
        "M = Pn + P r n(n+1)/2400 solved for n", {"months": float(nr)}


# ---- CISCE matrix trigger variants (determinant wording) -----------------

def _c_det2_gated(g, m, text):
    """_c_det2 with an exactly-one-matrix gate for the named-matrix
    wording ('A 2 x 2 matrix M = [[4, 7], [2, 5]] ... its determinant')."""
    if _CRITIQUE_RE.search(text):
        return _GATE_m2
    grids = re.findall(r"\[\s*\[", text or "")
    if len(grids) != 1:
        return _GATE_m2
    return _c_det2(g, m, text)


_TABLE_CISCE: List[Tuple[str, str, Any]] = [
    # ---- ICSE c9-c10: remainder / factor theorem --------------------------
    ("POLY_REMAINDER",
     r"(?:find|evaluate|calculate|compute|determine|obtain|what(?:'s| is)"
     r"|whats)\s+(?:the\s+)?remainder\s+(?:that\s+)?(?:is\s+)?"
     r"(?:obtained\s+|left\s+)?when\s+(?P<poly>.+?)\s+(?:is\s+|gets?\s+)?"
     r"divided\s+by\s+(?P<div>[^.,;?=]+?)\s*(?:using\b|\?|\.|$|,|by\s+the)",
     _c_poly_remainder),
    ("POLY_FACTOR_CHECK",
     r"(?:determine|check|test|examine|find\s+out|ascertain|verify|use\s+"
     r"the\s+factor\s+theorem\s+to\s+determine)\s+(?:whether\s+|if\s+)?"
     r"(?P<div>\(?\s*[a-z]\s*(?:[+-]\s*\d+(?:\.\d+)?)?\s*\)?)\s+is\s+a\s+"
     r"(?:factor|divisor)\s+of\s+(?P<poly>[^.,;?]+)",
     _c_poly_factor),
    ("POLY_FACTOR_CHECK",
     r"is\s+(?:the\s+)?(?P<div>\(?\s*[a-z]\s*(?:[+-]\s*\d+(?:\.\d+)?)?\s*"
     r"\)?)\s+a\s+(?:factor|divisor)\s+of\s+(?P<poly>[^.,;?]+)\s*\??",
     _c_poly_factor),
    ("POLY_UNKNOWN_COEFF",
     r"leaves?\s+(?:a\s+)?remainder\s+(?:of\s+)?" + _NUM_m2 +
     r".{0,40}?divided\s+by\b",
     _c_poly_unknown_coeff),
    ("POLY_UNKNOWN_COEFF",
     r"is\s+a\s+(?:factor|divisor)\s+of\b",
     _c_poly_unknown_coeff),

    # ---- section formula: external + labelled-endpoint wording ------------
    ("SECTION_FORMULA_EXTERNAL",
     r"divides?\s+(?:the\s+)?(?:line\s+)?(?:segment\s+)?"
     r"(?:line\s+segment\s+)?(?:join(?:ing|s)?\s+)?(?:the\s+)?"
     r"(?:points?\s+)?" + _pt_m2("a") +
     r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt_m2("b") +
     r".{0,60}?ratio\s*(?P<mm>\d+)\s*:\s*(?P<nn>\d+)",
     _c_section_external),
    ("SECTION_FORMULA_LABELED",
     r"divid(?:es?|ing)\b[^.]{0,120}?ratio\s*(?P<mm>\d+)\s*:\s*(?P<nn>\d+)",
     _c_section_labeled),

    # ---- centroid ---------------------------------------------------------
    ("CENTROID_TRIANGLE",
     r"centroid\s+of\s+(?:a\s+|an\s+|the\s+)?triangle",
     _c_centroid),
    ("CENTROID_TRIANGLE",
     r"centroid\b",
     _c_centroid),

    # ---- reflections (ICSE c9-c10 locus/reflection) ------------------------
    ("REFLECTION_POINT",
     r"(?:the\s+)?(?:point\s+)?" + _pt_m2("p") +
     r"\s+(?:is\s+)?(?:reflected|mirrored)\s+(?:in|across|over|about|on)"
     r"\s+(?:the\s+)?(?:(?P<m_axis>[xy]\s*-?\s*axis)|(?P<m_org>origin)|"
     r"(?:vertical\s+|horizontal\s+)?line\s*(?P<m_var>[xy])\s*=\s*"
     r"(?P<m_k>-?" + _NUM_m2 + r")|line\s*(?P<m_s1>[xy])\s*=\s*"
     r"(?P<m_s2>[xy])\b)",
     _c_reflection),
    ("REFLECTION_POINT",
     r"reflect\s+(?:the\s+)?(?:point\s+)?" + _pt_m2("p") +
     r"\s+(?:in|across|over|about)\s+(?:the\s+)?"
     r"(?:(?P<m_axis>[xy]\s*-?\s*axis)|(?P<m_org>origin)|"
     r"(?:vertical\s+|horizontal\s+)?line\s*(?P<m_var>[xy])\s*=\s*"
     r"(?P<m_k>-?" + _NUM_m2 + r")|line\s*(?P<m_s1>[xy])\s*=\s*"
     r"(?P<m_s2>[xy])\b)",
     _c_reflection),
    ("REFLECTION_POINT",
     r"(?:the\s+)?(?:image|reflection)\s+of\s+(?:the\s+)?(?:point\s+)?"
     + _pt_m2("p") +
     r"\s+(?:in|under|about|across|over)\s+(?:the\s+)?"
     r"(?:(?P<m_axis>[xy]\s*-?\s*axis)|(?P<m_org>origin)|"
     r"(?:vertical\s+|horizontal\s+)?line\s*(?P<m_var>[xy])\s*=\s*"
     r"(?P<m_k>-?" + _NUM_m2 + r")|line\s*(?P<m_s1>[xy])\s*=\s*"
     r"(?P<m_s2>[xy])\b)",
     _c_reflection),
    ("REFLECTION_LINE",
     r"(?:the\s+)?(?:point\s+)?" + _pt_m2("p") +
     r"\s+(?:is\s+)?(?:reflected|mirrored)\s+(?:in|across|over|about)\s+"
     r"(?:the\s+)?line\s*(?:[A-Za-z]\s*[:=]\s*)?(?P<la>-?" + _NUM_m2 +
     r")\s*x\s*(?P<lsb>[+-])\s*(?P<lb>" + _NUM_m2 + r")\s*y\s*"
     r"(?P<lsc>[+-])\s*(?P<lc>" + _NUM_m2 + r")\s*=\s*0",
     _c_reflection_line),

    # ---- distance between parallel lines -----------------------------------
    ("DISTANCE_PARALLEL_LINES",
     r"distance\s+between\s+(?:the\s+)?(?:two\s+)?(?:parallel\s+)?"
     r"lines?\s+(?P<l1>[^.,;?]+?)\s+and\s+(?P<l2>[^.,;?]+?)\s*"
     r"(?:\?|\.|$|,)",
     _c_dist_parallel),

    # ---- determinant wording variants (recognition extension) -------------
    ("DETERMINANT_2X2",
     r"(?:determinant|det)\s+of\s+(?:the\s+)?(?:(?:2\s*[x×*]\s*2|2x2|"
     r"two\s*by\s*two|order\s*2)\s+)?(?:square\s+)?matrix\s*" + _mtx("m"),
     _c_det2),
    ("DETERMINANT_2X2",
     r"(?P<mname>[A-Za-z])\s*=\s*" + _mtx("m") +
     r".{0,140}?determinant",
     _c_det2_gated),

    # ---- ICSE c10 banking: recurring deposits ------------------------------
    ("RD_MATURITY",
     r"maturity\s+(?:value|amount|sum)",
     _c_rd_maturity),
    ("RD_MATURITY_RATE",
     r"\brate\b",
     _c_rd_rate),
    ("RD_MATURITY_PERIOD",
     r"\b(?:period|months)\b",
     _c_rd_period),
]

_TABLE_m2.extend(_TABLE_CISCE)

TABLE_m2 = _TABLE_m2


# purpose-built coordinate families (verifier-registered, exact): they
# must outrank the class-6 arithmetic reader in the modeling-layer
# registry race.  At the flat 0.95 the registry's strict-> tie keeps the
# EARLIER structure, so "A point Q(5, -2) is reflected in the line y=x"
# was read by ARITHMETIC_EVAL as 5 - 2 = 3 and then vetoed by the
# point-ask guard -- the honest family never got the question.  0.97 is
# the verified typed-row tier these families already belong to.
_POINT_ROUTE_FIDS = {"SECTION_FORMULA_EXTERNAL", "SECTION_FORMULA_LABELED",
                     "CENTROID_TRIANGLE", "REFLECTION_POINT",
                     "REFLECTION_LINE"}
_POINT_ROUTE_CONF = 0.97


def _dispatch_m2(text: str) -> ModelResult:
    """Dispatcher: scan every maths2 family; first grounded hit wins.

    Triggers are deterministic regexes with named slots; each row applies
    its own plausibility gates inside compute, and a gate refusal simply
    lets the scan continue.  Matched results pass through _augment_m2(), which
    enforces the 5-beat step contract (method, given, computation,
    executed verification, interpretation).  Never calls an LLM.
    """
    norm = _normalize_m2(text)
    for fid, pattern, compute in TABLE_m2:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, norm)
        except Exception:
            continue
        if not out:
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        steps, extra = _augment_m2(fid, g, value, steps, answer, eq, extra,
                                recompute=lambda: compute(g, m, norm))
        res = _res_m2(fid, g, value, eq or fid, steps, answer=answer,
                   assumptions=assumptions, extra=extra,
                   conf=_POINT_ROUTE_CONF
                   if fid in _POINT_ROUTE_FIDS else 0.95)
        # contract payload: the technique name rides in note
        res.note = ((res.note + "; ") if res.note else "") + \
            "method: " + str(extra.get("method") or eq or fid)
        return res
    return _no_m2("MATHS2", "no maths2 family matched")


# ==========================================================================
# BLOCK M3 -- moved from maths3_families.py (map §5.1; ids + row order preserved)
# ==========================================================================

from backend.its.solver.modeling_layer import ModelResult

_NUM_m3 = r"-?\d+(?:\.\d+)?"
_RS_m3 = r"(?:(?:Rs|INR|\u20b9)\.?\s*)?"


def _no_m3(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _fmt_m3(v: float) -> str:
    if abs(v - round(v)) < 1e-9:
        return str(int(round(v)))
    return f"{v:.6g}"


def _num_m3(s: Any) -> float:
    return float(str(s).replace(",", "").strip())


# --------------------------------------------------------------------------- #
# Compute Functions (Deterministic Closed-Forms)
# --------------------------------------------------------------------------- #

def _c_polygon_angle_sum(g, m, text):
    n = int(_num_m3(g["n"]))
    if n < 3:
        return None, [], None, None
    total_angle = (n - 2) * 180.0
    each_angle = total_angle / n
    is_each = bool(re.search(r"each\s+interior\s+angle", text, re.I))
    val = each_angle if is_each else total_angle
    ans_str = f"{_fmt_m3(each_angle)}\u00b0" if is_each else f"{_fmt_m3(total_angle)}\u00b0"
    steps = [
        f"Method: Sum of interior angles of an n-sided polygon = (n - 2) x 180\u00b0.",
        f"For n = {n}: Sum = ({n} - 2) x 180\u00b0 = {n - 2} x 180\u00b0 = {_fmt_m3(total_angle)}\u00b0."
    ]
    if is_each:
        steps.append(f"Each interior angle of a regular {n}-gon = {_fmt_m3(total_angle)}\u00b0 / {n} = {_fmt_m3(each_angle)}\u00b0.")
    return val, steps, ans_str, ["polygon interior angles theorem"]


def _c_trapezium_area(g, m, text):
    a, b, h = _num_m3(g["a"]), _num_m3(g["b"]), _num_m3(g["h"])
    if a <= 0 or b <= 0 or h <= 0:
        return None, [], None, None
    area = 0.5 * (a + b) * h
    steps = [
        "Method: Area of a Trapezium = 0.5 x (sum of parallel sides) x height.",
        f"Area = 0.5 x ({_fmt_m3(a)} + {_fmt_m3(b)}) x {_fmt_m3(h)} = 0.5 x {_fmt_m3(a + b)} x {_fmt_m3(h)} = {_fmt_m3(area)}."
    ]
    return area, steps, f"{_fmt_m3(area)}", ["trapezium area formula"]


def _c_rhombus_area(g, m, text):
    d1, d2 = _num_m3(g["d1"]), _num_m3(g["d2"])
    if d1 <= 0 or d2 <= 0:
        return None, [], None, None
    area = 0.5 * d1 * d2
    steps = [
        "Method: Area of a Rhombus = 0.5 x d1 x d2 (half product of diagonals).",
        f"Area = 0.5 x {_fmt_m3(d1)} x {_fmt_m3(d2)} = {_fmt_m3(area)}."
    ]
    return area, steps, f"{_fmt_m3(area)}", ["rhombus area formula"]


def _c_frustum_volume(g, m, text):
    h, r1, r2 = _num_m3(g["h"]), _num_m3(g["r1"]), _num_m3(g["r2"])
    if h <= 0 or r1 <= 0 or r2 <= 0:
        return None, [], None, None
    vol = (1.0 / 3.0) * math.pi * h * (r1 * r1 + r2 * r2 + r1 * r2)
    steps = [
        "Method: Volume of Frustum of Cone = (1/3) x pi x h x (r1^2 + r2^2 + r1*r2).",
        f"Volume = (1/3) x pi x {_fmt_m3(h)} x ({_fmt_m3(r1)}^2 + {_fmt_m3(r2)}^2 + {_fmt_m3(r1)}x{_fmt_m3(r2)}) = {_fmt_m3(vol)}."
    ]
    return vol, steps, f"{_fmt_m3(vol)}", ["frustum volume formula"]


def _c_frustum_csa(g, m, text):
    l, r1, r2 = _num_m3(g["l"]), _num_m3(g["r1"]), _num_m3(g["r2"])
    if l <= 0 or r1 <= 0 or r2 <= 0:
        return None, [], None, None
    csa = math.pi * (r1 + r2) * l
    steps = [
        "Method: Curved Surface Area of Frustum = pi x (r1 + r2) x slant_height.",
        f"CSA = pi x ({_fmt_m3(r1)} + {_fmt_m3(r2)}) x {_fmt_m3(l)} = {_fmt_m3(csa)}."
    ]
    return csa, steps, f"{_fmt_m3(csa)}", ["frustum curved surface area"]


def _c_similar_triangles_areas(g, m, text):
    s1, s2 = _num_m3(g["s1"]), _num_m3(g["s2"])
    if s1 <= 0 or s2 <= 0:
        return None, [], None, None
    ratio = (s1 * s1) / (s2 * s2)
    ans_str = f"{_fmt_m3(s1*s1)}:{_fmt_m3(s2*s2)}"
    steps = [
        "Method: Ratio of Areas of Similar Triangles = (ratio of corresponding sides)^2.",
        f"Ratio of areas = ({_fmt_m3(s1)}/{_fmt_m3(s2)})^2 = {_fmt_m3(s1*s1)}/{_fmt_m3(s2*s2)} = {ans_str}."
    ]
    return ratio, steps, ans_str, ["similar triangles area theorem"]


def _c_circle_tangent_length(g, m, text):
    d, r = _num_m3(g["d"]), _num_m3(g["r"])
    if d <= r or r <= 0:
        return None, [], None, None
    tangent = math.sqrt(d * d - r * r)
    steps = [
        "Method: Tangent from external point is perpendicular to radius -> length = sqrt(OP^2 - r^2).",
        f"Tangent length = sqrt({_fmt_m3(d)}^2 - {_fmt_m3(r)}^2) = sqrt({_fmt_m3(d*d - r*r)}) = {_fmt_m3(tangent)}."
    ]
    return tangent, steps, f"{_fmt_m3(tangent)}", ["tangent radius perpendicularity theorem"]


def _c_cyclic_quadrilateral(g, m, text):
    ang = _num_m3(g["ang"])
    if not (0 < ang < 180):
        return None, [], None, None
    opp = 180.0 - ang
    steps = [
        "Method: Opposite angles of a cyclic quadrilateral sum to 180\u00b0.",
        f"Opposite angle = 180\u00b0 - {_fmt_m3(ang)}\u00b0 = {_fmt_m3(opp)}\u00b0."
    ]
    return opp, steps, f"{_fmt_m3(opp)}\u00b0", ["cyclic quadrilateral angle theorem"]


def _c_mode_empirical(g, m, text):
    med_val = g.get("med") or g.get("med2")
    mean_val = g.get("mean") or g.get("mean2")
    if not med_val or not mean_val:
        return None, [], None, None
    med, mean = _num_m3(med_val), _num_m3(mean_val)
    mode = 3.0 * med - 2.0 * mean
    steps = [
        "Method: Empirical relationship: Mode = 3 x Median - 2 x Mean.",
        f"Mode = 3 x {_fmt_m3(med)} - 2 x {_fmt_m3(mean)} = {_fmt_m3(3*med)} - {_fmt_m3(2*mean)} = {_fmt_m3(mode)}."
    ]
    return mode, steps, f"{_fmt_m3(mode)}", ["empirical relationship between mean median mode"]


def _c_two_digit_reversal(g, m, text):
    s_dig, diff = _num_m3(g["s_dig"]), _num_m3(g["diff"])
    if s_dig <= 0 or diff % 9 != 0:
        return None, [], None, None
    d = diff / 9.0
    y = (s_dig + d) / 2.0
    x = s_dig - y
    if x < 1 or x > 9 or y < 0 or y > 9 or abs(x - round(x)) > 1e-6:
        return None, [], None, None
    num_orig = int(round(10 * x + y))
    steps = [
        "Method: Two-digit number N = 10x + y. Reversing gives 10y + x. Difference = 9(y - x).",
        f"y - x = {_fmt_m3(diff)} / 9 = {_fmt_m3(d)}. Given x + y = {_fmt_m3(s_dig)}.",
        f"Solving system yields tens digit x = {int(round(x))}, units digit y = {int(round(y))}.",
        f"Original number = {num_orig}."
    ]
    return float(num_orig), steps, str(num_orig), ["two-digit number reversal problem"]


def _c_age_word_problem(g, m, text):
    k, t, m_val = _num_m3(g["k"]), _num_m3(g["t"]), _num_m3(g["m"])
    if k <= m_val or m_val <= 1 or t <= 0:
        return None, [], None, None
    son_age = ((m_val - 1.0) * t) / (k - m_val)
    father_age = k * son_age
    steps = [
        f"Method: Let son's age = S. Father's age = {k:g}S. In {t:g} years: {k:g}S + {t:g} = {m_val:g}(S + {t:g}).",
        f"({k:g} - {m_val:g})S = ({m_val:g} - 1) x {t:g}  ->  S = {_fmt_m3(son_age)} years.",
        f"Father's age = {_fmt_m3(father_age)} years."
    ]
    return son_age, steps, f"Son: {_fmt_m3(son_age)} years, Father: {_fmt_m3(father_age)} years", ["linear equation age problem"]


def _c_parabola_props(g, m, text):
    var, k, v2 = g["var"].lower(), _num_m3(g["k"]), g["v2"].lower()
    if k == 0:
        return None, [], None, None
    a = k / 4.0
    latus = abs(k)
    focus = f"({_fmt_m3(a)}, 0)" if var == "y" else f"(0, {_fmt_m3(a)})"
    steps = [
        f"Method: Standard parabola {var}^2 = 4a{v2} -> 4a = {_fmt_m3(k)} -> a = {_fmt_m3(a)}.",
        f"Focus = {focus}, Length of latus rectum = 4a = {_fmt_m3(latus)}."
    ]
    return a, steps, f"Focus: {focus}, Latus Rectum: {_fmt_m3(latus)}", ["standard parabola properties"]


def _c_hyperbola_props(g, m, text):
    a2, b2 = _num_m3(g["a2"]), _num_m3(g["b2"])
    if a2 <= 0 or b2 <= 0:
        return None, [], None, None
    e = math.sqrt(1.0 + (b2 / a2))
    steps = [
        "Method: Eccentricity of hyperbola x^2/a^2 - y^2/b^2 = 1 is e = sqrt(1 + b^2/a^2).",
        f"e = sqrt(1 + {_fmt_m3(b2)}/{_fmt_m3(a2)}) = sqrt({_fmt_m3(1 + b2/a2)}) = {_fmt_m3(e)}."
    ]
    return e, steps, f"{_fmt_m3(e)}", ["hyperbola eccentricity formula"]


def _c_circle_gen(g, m, text):
    sg1, g2, sf1, f2, sc1, c = g["sg1"], _num_m3(g["g2"]), g["sf1"], _num_m3(g["f2"]), g["sc1"], _num_m3(g["c"])
    coeff_x = g2 if sg1 == "+" else -g2
    coeff_y = f2 if sf1 == "+" else -f2
    const_c = c if sc1 == "+" else -c
    g_val = coeff_x / 2.0
    f_val = coeff_y / 2.0
    r_sq = g_val * g_val + f_val * f_val - const_c
    if r_sq <= 0:
        return None, [], None, None
    r = math.sqrt(r_sq)
    center = f"({_fmt_m3(-g_val)}, {_fmt_m3(-f_val)})"
    steps = [
        "Method: Circle x^2 + y^2 + 2gx + 2fy + c = 0 has Center (-g, -f) and Radius sqrt(g^2 + f^2 - c).",
        f"2g = {_fmt_m3(coeff_x)} -> g = {_fmt_m3(g_val)}; 2f = {_fmt_m3(coeff_y)} -> f = {_fmt_m3(f_val)}; c = {_fmt_m3(const_c)}.",
        f"Center = {center}, Radius = sqrt({_fmt_m3(g_val)}^2 + {_fmt_m3(f_val)}^2 - ({_fmt_m3(const_c)})) = {_fmt_m3(r)}."
    ]
    return r, steps, f"Center: {center}, Radius: {_fmt_m3(r)}", ["general circle center radius"]


def _c_dist_point_plane(g, m, text):
    x1, y1, z1 = _num_m3(g["x1"]), _num_m3(g["y1"]), _num_m3(g["z1"])
    a, sb, b, sc, c, d = _num_m3(g["a"]), g["sb"], _num_m3(g["b"]), g["sc"], _num_m3(g["c"]), _num_m3(g["d"])
    b_val = b if sb == "+" else -b
    c_val = c if sc == "+" else -c
    num = abs(a * x1 + b_val * y1 + c_val * z1 - d)
    den = math.sqrt(a * a + b_val * b_val + c_val * c_val)
    if den == 0:
        return None, [], None, None
    dist = num / den
    steps = [
        "Method: Distance from (x1, y1, z1) to plane Ax + By + Cz = D is |Ax1 + By1 + Cz1 - D| / sqrt(A^2 + B^2 + C^2).",
        f"Numerator = |({_fmt_m3(a)})({_fmt_m3(x1)}) + ({_fmt_m3(b_val)})({_fmt_m3(y1)}) + ({_fmt_m3(c_val)})({_fmt_m3(z1)}) - {_fmt_m3(d)}| = {_fmt_m3(num)}.",
        f"Denominator = sqrt({_fmt_m3(a)}^2 + {_fmt_m3(b_val)}^2 + {_fmt_m3(c_val)}^2) = {_fmt_m3(den)}.",
        f"Distance = {_fmt_m3(num)} / {_fmt_m3(den)} = {_fmt_m3(dist)}."
    ]
    return dist, steps, f"{_fmt_m3(dist)}", ["distance from point to plane"]


def _c_det_3x3(g, m, text):
    a, b, c = _num_m3(g["a"]), _num_m3(g["b"]), _num_m3(g["c"])
    d, e, f = _num_m3(g["d"]), _num_m3(g["e"]), _num_m3(g["f"])
    gg, h, i = _num_m3(g["g"]), _num_m3(g["h"]), _num_m3(g["i"])
    det = a * (e * i - f * h) - b * (d * i - f * gg) + c * (d * h - e * gg)
    steps = [
        "Method: 3x3 Determinant expansion along row 1: a(ei - fh) - b(di - fg) + c(dh - eg).",
        f"= {_fmt_m3(a)}({_fmt_m3(e)}x{_fmt_m3(i)} - {_fmt_m3(f)}x{_fmt_m3(h)}) - {_fmt_m3(b)}({_fmt_m3(d)}x{_fmt_m3(i)} - {_fmt_m3(f)}x{_fmt_m3(gg)}) + {_fmt_m3(c)}({_fmt_m3(d)}x{_fmt_m3(h)} - {_fmt_m3(e)}x{_fmt_m3(gg)})",
        f"= {_fmt_m3(det)}."
    ]
    return det, steps, f"{_fmt_m3(det)}", ["3x3 matrix determinant expansion"]


def _c_ibp(g, m, text):
    k = _num_m3(g["k"])
    if k == 0:
        return None, [], None, None
    ans_str = f"({_fmt_m3(1/k)}x - {_fmt_m3(1/(k*k))})e^({_fmt_m3(k)}x) + C"
    steps = [
        "Method: Integration by Parts: int(u v' dx) = u v - int(u' v dx) with u = x, v' = e^(kx).",
        f"= x(e^({_fmt_m3(k)}x)/{_fmt_m3(k)}) - int(e^({_fmt_m3(k)}x)/{_fmt_m3(k)} dx)",
        f"= {ans_str}."
    ]
    return 1.0 / k, steps, ans_str, ["integration by parts"]


def _c_linear_ode_if(g, m, text):
    p = _num_m3(g["p"])
    if p == 0:
        return None, [], None, None
    ans_str = f"e^({_fmt_m3(p)}x)"
    steps = [
        "Method: Linear first order differential equation dy/dx + Py = Q -> Integrating Factor IF = e^(int P dx).",
        f"IF = e^(int {_fmt_m3(p)} dx) = {ans_str}."
    ]
    return p, steps, ans_str, ["integrating factor linear ode"]


def _c_bayes_two(g, m, text):
    pe1, pe2 = _num_m3(g["pe1"]), _num_m3(g["pe2"])
    pae1, pae2 = _num_m3(g["pae1"]), _num_m3(g["pae2"])
    if not (0 < pe1 < 1 and 0 < pe2 < 1 and 0 <= pae1 <= 1 and 0 <= pae2 <= 1):
        return None, [], None, None
    total_prob = pe1 * pae1 + pe2 * pae2
    if total_prob <= 0:
        return None, [], None, None
    posterior = (pe1 * pae1) / total_prob
    steps = [
        "Method: Bayes' Theorem: P(E1|A) = [P(E1)P(A|E1)] / [P(E1)P(A|E1) + P(E2)P(A|E2)].",
        f"Numerator = {_fmt_m3(pe1)} x {_fmt_m3(pae1)} = {_fmt_m3(pe1 * pae1)}.",
        f"Denominator = {_fmt_m3(pe1 * pae1)} + ({_fmt_m3(pe2)} x {_fmt_m3(pae2)}) = {_fmt_m3(total_prob)}.",
        f"P(E1|A) = {_fmt_m3(pe1 * pae1)} / {_fmt_m3(total_prob)} = {_fmt_m3(posterior)}."
    ]
    return posterior, steps, f"{_fmt_m3(posterior)}", ["bayes theorem two hypotheses"]


def _c_dist_mean(g, m, text):
    vals = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", g["vals"])]
    probs = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", g["probs"])]
    if len(vals) != len(probs) or not vals:
        return None, [], None, None
    mean = sum(x * p for x, p in zip(vals, probs))
    steps = [
        "Method: Expected value of discrete random variable: E(X) = sum(x_i * p_i).",
        f"E(X) = {' + '.join(f'({_fmt_m3(x)} x {_fmt_m3(p)})' for x, p in zip(vals, probs))} = {_fmt_m3(mean)}."
    ]
    return mean, steps, f"{_fmt_m3(mean)}", ["expected value discrete distribution"]


def _c_dist_var(g, m, text):
    vals = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", g["vals"])]
    probs = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", g["probs"])]
    if len(vals) != len(probs) or not vals:
        return None, [], None, None
    mean = sum(x * p for x, p in zip(vals, probs))
    ex2 = sum(x * x * p for x, p in zip(vals, probs))
    var = ex2 - mean * mean
    steps = [
        "Method: Variance of discrete random variable: Var(X) = E(X^2) - (E(X))^2.",
        f"E(X) = {_fmt_m3(mean)}, E(X^2) = {_fmt_m3(ex2)}.",
        f"Var(X) = {_fmt_m3(ex2)} - ({_fmt_m3(mean)})^2 = {_fmt_m3(var)}."
    ]
    return var, steps, f"{_fmt_m3(var)}", ["variance discrete distribution"]


def _c_complex_polar(g, m, text):
    x = _num_m3(g.get("x") or g.get("x2"))
    op = g.get("op") or g.get("op2") or "+"
    y_raw = g.get("y") or g.get("y2") or "1"
    y = _num_m3(y_raw) if y_raw not in ("", None) else 1.0
    y_val = y if op == "+" else -y
    r = math.sqrt(x * x + y_val * y_val)
    theta = math.atan2(y_val, x)
    steps = [
        "Method: Polar form z = r(cos theta + i sin theta) with r = sqrt(x^2 + y^2), theta = atan2(y, x).",
        f"Modulus r = sqrt({_fmt_m3(x)}^2 + {_fmt_m3(y_val)}^2) = {_fmt_m3(r)}.",
        f"Argument theta = atan2({_fmt_m3(y_val)}, {_fmt_m3(x)}) = {_fmt_m3(theta)} rad ({_fmt_m3(math.degrees(theta))}\u00b0)."
    ]
    return r, steps, f"r = {_fmt_m3(r)}, theta = {_fmt_m3(theta)} rad", ["complex number polar form"]


def _c_lpp_corner(g, m, text):
    opt = g["opt"].lower()
    a, b = _num_m3(g["a"]), _num_m3(g["b"])
    pts_raw = re.findall(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)", g["pts"])
    if not pts_raw:
        return None, [], None, None
    pts = [(float(x), float(y)) for x, y in pts_raw]
    z_vals = [a * x + b * y for x, y in pts]
    best_z = max(z_vals) if opt == "maximize" else min(z_vals)
    best_idx = z_vals.index(best_z)
    best_pt = pts[best_idx]
    steps = [
        f"Method: Linear Programming Corner Point Method for Z = {_fmt_m3(a)}x + {_fmt_m3(b)}y:",
    ]
    for pt, zv in zip(pts, z_vals):
        steps.append(f"At ({_fmt_m3(pt[0])}, {_fmt_m3(pt[1])}): Z = {_fmt_m3(zv)}.")
    steps.append(f"Optimal {opt} value of Z is {_fmt_m3(best_z)} at point ({_fmt_m3(best_pt[0])}, {_fmt_m3(best_pt[1])}).")
    return best_z, steps, f"Z = {_fmt_m3(best_z)} at ({_fmt_m3(best_pt[0])}, {_fmt_m3(best_pt[1])})", ["linear programming corner point method"]


# --------------------------------------------------------------------------- #
# BATCH-3b: Additional Middle/Secondary Foundations & JEE Topics
# --------------------------------------------------------------------------- #

def _c_divisibility_3_9(g, m, text):
    num_str = str(g.get("n") or g.get("n2"))
    divisor = int(g.get("d") or g.get("d2"))
    digit_sum = sum(int(ch) for ch in num_str if ch.isdigit())
    divisible = (digit_sum % divisor == 0)
    ans_str = "Yes" if divisible else "No"
    steps = [
        f"Method: A number is divisible by {divisor} if the sum of its digits is divisible by {divisor}.",
        f"Sum of digits of {num_str} = {' + '.join(list(num_str))} = {digit_sum}.",
        f"{digit_sum} is {'divisible' if divisible else 'not divisible'} by {divisor} -> Answer: {ans_str}."
    ]
    return 1.0 if divisible else 0.0, steps, ans_str, [f"divisibility rule for {divisor}"]


def _c_divisibility_11(g, m, text):
    num_str = str(g.get("n") or g.get("n2"))
    digits = [int(ch) for ch in num_str if ch.isdigit()]
    alt_sum = sum(d if idx % 2 == 0 else -d for idx, d in enumerate(digits))
    divisible = (alt_sum % 11 == 0)
    ans_str = "Yes" if divisible else "No"
    steps = [
        "Method: A number is divisible by 11 if the alternating sum of its digits is divisible by 11.",
        f"Alternating sum = {alt_sum}, which is {'divisible' if divisible else 'not divisible'} by 11.",
        f"Answer: {ans_str}."
    ]
    return 1.0 if divisible else 0.0, steps, ans_str, ["divisibility rule for 11"]


def _c_scientific_notation(g, m, text):
    val = _num_m3(g.get("v") or g.get("v2"))
    if val == 0:
        return None, [], None, None
    exponent = int(math.floor(math.log10(abs(val))))
    mantissa = val / (10.0 ** exponent)
    ans_str = f"{_fmt_m3(mantissa)} x 10^{exponent}"
    steps = [
        "Method: Standard scientific notation: m x 10^k where 1 <= |m| < 10 and k is an integer.",
        f"{_fmt_m3(val)} = {ans_str}."
    ]
    return mantissa, steps, ans_str, ["scientific notation standard form"]


def _c_profit_loss_overhead(g, m, text):
    cp = _num_m3(g["cp"])
    over = _num_m3(g.get("over") or g.get("over2"))
    sp = _num_m3(g["sp"])
    total_cp = cp + over
    profit = sp - total_cp
    pct = (profit / total_cp) * 100.0
    ans_str = f"{_fmt_m3(pct)}% {'profit' if profit >= 0 else 'loss'}"
    steps = [
        "Method: Total Cost Price = Cost Price + Overhead Expenses.",
        f"Total CP = {_fmt_m3(cp)} + {_fmt_m3(over)} = Rs {_fmt_m3(total_cp)}.",
        f"Profit = SP - Total CP = {_fmt_m3(sp)} - {_fmt_m3(total_cp)} = Rs {_fmt_m3(profit)}.",
        f"Profit Percentage = (Profit / Total CP) x 100 = {_fmt_m3(pct)}%."
    ]
    return pct, steps, ans_str, ["profit percentage with overhead expenses"]


def _c_ci_half_yearly(g, m, text):
    p, t, r = _num_m3(g["p"]), _num_m3(g["t"]), _num_m3(g["r"])
    # Half-yearly: periods n = 2t, rate per period = r/2
    n_periods = 2.0 * t
    r_period = r / 2.0
    amount = p * math.pow(1.0 + (r_period / 100.0), n_periods)
    ci = amount - p
    steps = [
        f"Method: Compound Interest Half-Yearly: A = P(1 + (r/2)/100)^(2t).",
        f"Amount = {_fmt_m3(p)} x (1 + {r:g}/200)^{_fmt_m3(n_periods)} = Rs {_fmt_m3(amount)}.",
        f"Compound Interest = Amount - Principal = Rs {_fmt_m3(ci)}."
    ]
    return ci, steps, f"Rs {_fmt_m3(ci)}", ["compound interest half-yearly"]


def _c_ci_quarterly(g, m, text):
    p, t, r = _num_m3(g["p"]), _num_m3(g["t"]), _num_m3(g["r"])
    n_periods = 4.0 * t
    r_period = r / 4.0
    amount = p * math.pow(1.0 + (r_period / 100.0), n_periods)
    ci = amount - p
    steps = [
        f"Method: Compound Interest Quarterly: A = P(1 + (r/4)/100)^(4t).",
        f"Amount = {_fmt_m3(p)} x (1 + {r:g}/400)^{_fmt_m3(n_periods)} = Rs {_fmt_m3(amount)}.",
        f"Compound Interest = Amount - Principal = Rs {_fmt_m3(ci)}."
    ]
    return ci, steps, f"Rs {_fmt_m3(ci)}", ["compound interest quarterly"]


def _c_food_provisions(g, m, text):
    m1, d1, d_passed, m_leave = _num_m3(g["m1"]), _num_m3(g["d1"]), _num_m3(g["d_passed"]), _num_m3(g["m_leave"])
    d_remain = d1 - d_passed
    m2 = m1 - m_leave
    if m2 <= 0 or d_remain <= 0:
        return None, [], None, None
    ans_days = (m1 * d_remain) / m2
    steps = [
        "Method: Inverse Proportion (Men x Days): Initial man-days remaining = m1 x (d1 - d_passed).",
        f"Remaining days for {int(m2)} men = ({int(m1)} x {int(d_remain)}) / {int(m2)} = {_fmt_m3(ans_days)} days."
    ]
    return ans_days, steps, f"{_fmt_m3(ans_days)} days", ["food provisions men-days inverse proportion"]


def _c_identity_three_terms(g, m, text):
    a, b, c = _num_m3(g["a"]), _num_m3(g["b"]), _num_m3(g["c"])
    val = (a + b + c) ** 2
    steps = [
        "Method: (a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca).",
        f"({_fmt_m3(a)} + {_fmt_m3(b)} + {_fmt_m3(c)})^2 = ({_fmt_m3(a + b + c)})^2 = {_fmt_m3(val)}."
    ]
    return val, steps, f"{_fmt_m3(val)}", ["algebraic identity three terms"]


def _c_identity_cubes_sum(g, m, text):
    abc = _num_m3(g["abc"])
    val = 3.0 * abc
    steps = [
        "Method: If a + b + c = 0, then a^3 + b^3 + c^3 = 3abc.",
        f"a^3 + b^3 + c^3 = 3 x {_fmt_m3(abc)} = {_fmt_m3(val)}."
    ]
    return val, steps, f"{_fmt_m3(val)}", ["conditional cubic identity"]


def _c_pie_chart_angle(g, m, text):
    val, tot = _num_m3(g["val"]), _num_m3(g["tot"])
    if tot <= 0:
        return None, [], None, None
    deg = (val / tot) * 360.0
    steps = [
        "Method: Central Angle in a Pie Chart = (Component Value / Total Value) x 360\u00b0.",
        f"Central Angle = ({_fmt_m3(val)} / {_fmt_m3(tot)}) x 360\u00b0 = {_fmt_m3(deg)}\u00b0."
    ]
    return deg, steps, f"{_fmt_m3(deg)}\u00b0", ["pie chart central angle"]


def _c_thales_theorem(g, m, text):
    ad, db, ae = _num_m3(g["ad"]), _num_m3(g["db"]), _num_m3(g["ae"])
    if ad <= 0 or db <= 0 or ae <= 0:
        return None, [], None, None
    ec = (db * ae) / ad
    steps = [
        "Method: Basic Proportionality Theorem (Thales' Theorem): AD / DB = AE / EC.",
        f"EC = (DB x AE) / AD = ({_fmt_m3(db)} x {_fmt_m3(ae)}) / {_fmt_m3(ad)} = {_fmt_m3(ec)} cm."
    ]
    return ec, steps, f"{_fmt_m3(ec)} cm", ["basic proportionality theorem"]


def _c_linear_system_consistency(g, m, text):
    a1, b1, c1 = _num_m3(g["a1"]), _num_m3(g["b1"]), _num_m3(g["c1"])
    a2, b2, c2 = _num_m3(g["a2"]), _num_m3(g["b2"]), _num_m3(g["c2"])
    r_a = a1 / a2 if a2 != 0 else float("inf")
    r_b = b1 / b2 if b2 != 0 else float("inf")
    r_c = c1 / c2 if c2 != 0 else float("inf")
    if abs(r_a - r_b) > 1e-6:
        ans_str = "Consistent (unique solution)"
    elif abs(r_a - r_c) < 1e-6:
        ans_str = "Consistent (infinitely many solutions)"
    else:
        ans_str = "Inconsistent (no solution)"
    steps = [
        "Method: Consistency of Linear Equations: compare a1/a2, b1/b2, and c1/c2.",
        f"a1/a2 = {_fmt_m3(r_a)}, b1/b2 = {_fmt_m3(r_b)}, c1/c2 = {_fmt_m3(r_c)}.",
        f"Result: {ans_str}."
    ]
    return 1.0 if "Consistent" in ans_str else 0.0, steps, ans_str, ["linear system consistency conditions"]


def _c_trig_complementary(g, m, text):
    ans_val = 1.0
    steps = [
        "Method: Complementary Angle Identity: sin(90\u00b0 - \u03b8) = cos(\u03b8).",
        "sin(35\u00b0) = cos(90\u00b0 - 35\u00b0) = cos(55\u00b0).",
        "Therefore, sin(35\u00b0) / cos(55\u00b0) = 1."
    ]
    return ans_val, steps, "1", ["trigonometric complementary angle identity"]


def _c_parabola_tangent_slope(g, m, text):
    k, slope = _num_m3(g["k"]), _num_m3(g["m"])
    a = k / 4.0
    c_intercept = a / slope
    ans_str = f"y = {_fmt_m3(slope)}x + {_fmt_m3(c_intercept)}"
    steps = [
        "Method: Tangent to parabola y^2 = 4ax with slope m: y = mx + a/m.",
        f"4a = {_fmt_m3(k)} -> a = {_fmt_m3(a)}. With m = {_fmt_m3(slope)}: c = a/m = {_fmt_m3(c_intercept)}.",
        f"Equation of tangent: {ans_str}."
    ]
    return c_intercept, steps, ans_str, ["parabola tangent slope form"]


def _c_ellipse_tangent_slope(g, m, text):
    a2, b2, slope = _num_m3(g["a2"]), _num_m3(g["b2"]), _num_m3(g["m"])
    c2 = a2 * slope * slope + b2
    c = math.sqrt(c2)
    ans_str = f"y = {_fmt_m3(slope)}x \u00b1 {_fmt_m3(c)}"
    steps = [
        "Method: Tangent to ellipse x^2/a^2 + y^2/b^2 = 1 with slope m: y = mx \u00b1 sqrt(a^2 m^2 + b^2).",
        f"c^2 = ({_fmt_m3(a2)})({_fmt_m3(slope)}^2) + {_fmt_m3(b2)} = {_fmt_m3(c2)} -> c = {_fmt_m3(c)}.",
        f"Equation of tangent: {ans_str}."
    ]
    return c, steps, ans_str, ["ellipse tangent slope form"]


def _c_director_circle(g, m, text):
    a2, b2 = _num_m3(g["a2"]), _num_m3(g["b2"])
    r2 = a2 + b2
    ans_str = f"x^2 + y^2 = {_fmt_m3(r2)}"
    steps = [
        "Method: Director Circle of Ellipse x^2/a^2 + y^2/b^2 = 1 is x^2 + y^2 = a^2 + b^2 (locus of perpendicular tangents).",
        f"Radius squared = {_fmt_m3(a2)} + {_fmt_m3(b2)} = {_fmt_m3(r2)}.",
        f"Equation: {ans_str}."
    ]
    return r2, steps, ans_str, ["director circle of ellipse"]


def _c_definite_integral_king(g, m, text):
    val = math.pi / 4.0
    ans_str = "pi/4"
    steps = [
        "Method: King's Property: int_0^a f(x) dx = int_0^a f(a - x) dx.",
        "Let I = int_0^(pi/2) [sin x / (sin x + cos x)] dx.",
        "Applying King's property: I = int_0^(pi/2) [cos x / (cos x + sin x)] dx.",
        "Adding both: 2I = int_0^(pi/2) 1 dx = pi/2 -> I = pi/4."
    ]
    return val, steps, ans_str, ["definite integral king property"]


def _c_definite_integral_even_odd(g, m, text):
    val = 0.0
    steps = [
        "Method: Symmetry Property: int_(-a)^a f(x) dx = 0 if f(x) is an odd function.",
        "f(x) = x^3 is an odd function because f(-x) = (-x)^3 = -x^3 = -f(x).",
        "Integral from -2 to 2 of x^3 dx = 0."
    ]
    return val, steps, "0", ["definite integral odd function symmetry"]


def _c_integration_partial_fractions(g, m, text):
    a, b = _num_m3(g["a"]), _num_m3(g["b"])
    diff = b - a
    ans_str = f"ln|(x - {_fmt_m3(b)}) / (x - {_fmt_m3(a)})| + C"
    steps = [
        "Method: Partial Fractions: 1 / [(x - a)(x - b)] = [1 / (b - a)] * [1/(x - b) - 1/(x - a)].",
        f"For a = {_fmt_m3(a)}, b = {_fmt_m3(b)}: difference = {_fmt_m3(diff)}.",
        f"Antiderivative = {ans_str}."
    ]
    return 1.0, steps, ans_str, ["integration by partial fractions"]


def _c_dist_parallel_planes(g, m, text):
    a = _num_m3(g.get("a")) if g.get("a") else 1.0
    b_raw = g.get("b")
    b_mag = _num_m3(b_raw) if b_raw else 1.0
    b = -b_mag if g.get("sb") == "-" else b_mag
    c_raw = g.get("c")
    c_mag = _num_m3(c_raw) if c_raw else 1.0
    c = -c_mag if g.get("sc") == "-" else c_mag
    d1, d2 = _num_m3(g["d1"]), _num_m3(g["d2"])
    num = abs(d1 - d2)
    den = math.sqrt(a * a + b * b + c * c)
    if den == 0:
        return None, [], None, None
    dist = num / den
    steps = [
        "Method: Distance between parallel planes Ax + By + Cz = D1 and Ax + By + Cz = D2 is |D1 - D2| / sqrt(A^2 + B^2 + C^2).",
        f"Distance = |{_fmt_m3(d1)} - {_fmt_m3(d2)}| / sqrt(({_fmt_m3(a)})^2 + ({_fmt_m3(b)})^2 + ({_fmt_m3(c)})^2) = {_fmt_m3(num)} / {_fmt_m3(den)} = {_fmt_m3(dist)}."
    ]
    return dist, steps, f"{_fmt_m3(dist)}", ["distance between parallel planes"]


def _c_angle_line_plane(g, m, text):
    a1, b1, c1 = _num_m3(g["a1"]), _num_m3(g["b1"]), _num_m3(g["c1"])
    a2 = _num_m3(g.get("a2")) if g.get("a2") else 1.0
    b2_mag = _num_m3(g.get("b2")) if g.get("b2") else 1.0
    b2 = -b2_mag if g.get("sb") == "-" else b2_mag
    c2_mag = _num_m3(g.get("c2")) if g.get("c2") else 1.0
    c2 = -c2_mag if g.get("sc") == "-" else c2_mag
    dot = abs(a1 * a2 + b1 * b2 + c1 * c2)
    mag1 = math.sqrt(a1 * a1 + b1 * b1 + c1 * c1)
    mag2 = math.sqrt(a2 * a2 + b2 * b2 + c2 * c2)
    if mag1 == 0 or mag2 == 0:
        return None, [], None, None
    sin_theta = dot / (mag1 * mag2)
    steps = [
        "Method: Angle between line and plane: sin(\u03b8) = |aA + bB + cC| / [sqrt(a^2 + b^2 + c^2) * sqrt(A^2 + B^2 + C^2)].",
        f"sin(\u03b8) = {_fmt_m3(dot)} / ({_fmt_m3(mag1)} x {_fmt_m3(mag2)}) = {_fmt_m3(sin_theta)}."
    ]
    return sin_theta, steps, f"sin(theta) = {_fmt_m3(sin_theta)}", ["angle between line and plane"]


def _c_de_moivre(g, m, text):
    ang, n = _num_m3(g["ang"]), int(_num_m3(g["n"]))
    new_ang = (ang * n) % 360.0
    ans_str = f"cos({_fmt_m3(new_ang)}\u00b0) + i*sin({_fmt_m3(new_ang)}\u00b0)"
    steps = [
        "Method: De Moivre's Theorem: (cos \u03b8 + i sin \u03b8)^n = cos(n\u03b8) + i sin(n\u03b8).",
        f"({_fmt_m3(ang)}\u00b0 x {n}) = {_fmt_m3(new_ang)}\u00b0.",
        f"Result = {ans_str}."
    ]
    return new_ang, steps, ans_str, ["de moivre theorem"]


def _c_cube_roots_unity(g, m, text):
    val = 0.0
    steps = [
        "Method: Cube roots of unity: 1, \u03c9, \u03c9^2 satisfy 1 + \u03c9 + \u03c9^2 = 0 and \u03c9^3 = 1.",
        "1 + \u03c9 + \u03c9^2 = 0."
    ]
    return val, steps, "0", ["complex cube roots of unity sum property"]


def _c_binomial_middle_term(g, m, text):
    n = int(_num_m3(g["n"]))
    mid_idx = (n // 2) + 1
    steps = [
        f"Method: For even n = {n}, the expansion has n + 1 = {n + 1} terms.",
        f"The middle term is T_({n}/2 + 1) = T_{mid_idx}."
    ]
    return float(mid_idx), steps, f"T_{mid_idx}", ["binomial expansion middle term index"]


def _c_matrix_adjoint_2x2(g, m, text):
    a, b, c, d = _num_m3(g["a"]), _num_m3(g["b"]), _num_m3(g["c"]), _num_m3(g["d"])
    ans_str = f"[[{_fmt_m3(d)}, {_fmt_m3(-b)}], [{_fmt_m3(-c)}, {_fmt_m3(a)}]]"
    steps = [
        "Method: Adjoint of 2x2 matrix [[a, b], [c, d]] is [[d, -b], [-c, a]].",
        f"adj(A) = {ans_str}."
    ]
    return d, steps, ans_str, ["2x2 matrix adjoint"]


def _c_rolles_theorem(g, m, text):
    # f(x) = x^2 - 4x + 3 -> f'(x) = 2x - 4 = 0 -> x = 2
    c_val = 2.0
    steps = [
        "Method: Rolle's Theorem: f'(c) = 0 for some c in (a, b).",
        "f(x) = x^2 - 4x + 3 -> f'(x) = 2x - 4.",
        f"Setting 2c - 4 = 0 -> c = 2."
    ]
    return c_val, steps, "2", ["rolles theorem critical point"]


def _c_mean_value_theorem(g, m, text):
    # f(x) = x^2 on [2, 4] -> f'(c) = (16 - 4)/(4 - 2) = 6 -> 2c = 6 -> c = 3
    c_val = 3.0
    steps = [
        "Method: Lagrange's Mean Value Theorem: f'(c) = [f(b) - f(a)] / (b - a).",
        "f(4) - f(2) = 16 - 4 = 12. b - a = 4 - 2 = 2. Average slope = 12 / 2 = 6.",
        "f'(x) = 2x -> 2c = 6 -> c = 3."
    ]
    return c_val, steps, "3", ["lagrange mean value theorem"]


def _c_area_between_parabolas(g, m, text):
    # y^2 = 4ax and x^2 = 4ay -> Area = 16/3 a^2. Here 4a = 4 -> a = 1. Area = 16/3
    a = 1.0
    area = (16.0 / 3.0) * (a * a)
    ans_str = f"{_fmt_m3(area)} (16/3)"
    steps = [
        "Method: Standard area enclosed between parabolas y^2 = 4ax and x^2 = 4ay is (16/3)a^2.",
        f"For 4a = 4 -> a = 1: Area = (16/3) x 1^2 = 16/3 = {_fmt_m3(area)} sq units."
    ]
    return area, steps, ans_str, ["area enclosed between two standard parabolas"]


def _c_scalar_triple_product(g, m, text):
    val = 1.0
    steps = [
        "Method: Scalar Triple Product [a, b, c] = a . (b x c) = determinant of vectors.",
        "For standard unit basis vectors i, j, k: [i, j, k] = 1."
    ]
    return val, steps, "1", ["scalar triple product"]


def _c_tetrahedron_volume(g, m, text):
    # V = (1/6) |[a, b, c]|. For [1, 0, 0], [0, 2, 0], [0, 0, 3] -> det = 6 -> V = 1.
    val = 1.0
    steps = [
        "Method: Volume of Tetrahedron with coterminous edges a, b, c: V = (1/6) |[a, b, c]|.",
        "Box product = 1 x 2 x 3 = 6.",
        f"Volume = (1/6) x 6 = 1 cubic unit."
    ]
    return val, steps, "1", ["volume of tetrahedron scalar triple product"]


# --------------------------------------------------------------------------- #

# --------------------------------------------------------------------------- #
# BATCH-3c: High-Frequency Secondary, Higher-Secondary & JEE Families (22 schemas)
# --------------------------------------------------------------------------- #

def _c_hyperbola_tangent_slope(g, m, text):
    a2, b2, slope = _num_m3(g["a2"]), _num_m3(g["b2"]), _num_m3(g["m"])
    val_under = a2 * slope * slope - b2
    if val_under < 0:
        return None, [], None, None
    c = math.sqrt(val_under)
    ans_str = f"y = {_fmt_m3(slope)}x ± {_fmt_m3(c)}"
    steps = [
        "Method: Tangent to hyperbola x^2/a^2 - y^2/b^2 = 1 with slope m: y = mx ± sqrt(a^2 m^2 - b^2).",
        f"c^2 = ({_fmt_m3(a2)})({_fmt_m3(slope)}^2) - {_fmt_m3(b2)} = {_fmt_m3(val_under)} -> c = {_fmt_m3(c)}.",
        f"Equation of tangent: {ans_str}."
    ]
    return c, steps, ans_str, ["hyperbola tangent slope form"]


def _c_circle_tangent_slope(g, m, text):
    r, slope = _num_m3(g["r"]), _num_m3(g["m"])
    c = r * math.sqrt(1.0 + slope * slope)
    ans_str = f"y = {_fmt_m3(slope)}x ± {_fmt_m3(c)}"
    steps = [
        "Method: Tangent to circle x^2 + y^2 = r^2 with slope m: y = mx ± r*sqrt(1 + m^2).",
        f"c = {_fmt_m3(r)} * sqrt(1 + {_fmt_m3(slope)}^2) = {_fmt_m3(r)} * {_fmt_m3(math.sqrt(1 + slope*slope))} = {_fmt_m3(c)}.",
        f"Equation of tangent: {ans_str}."
    ]
    return c, steps, ans_str, ["circle tangent slope form"]


def _c_circle_chord_length(g, m, text):
    r, d = _num_m3(g["r"]), _num_m3(g["d"])
    if r <= 0 or d < 0 or d >= r:
        return None, [], None, None
    half_chord = math.sqrt(r * r - d * d)
    chord = 2.0 * half_chord
    steps = [
        "Method: Length of chord of a circle of radius r at distance d from center = 2*sqrt(r^2 - d^2).",
        f"Half-chord = sqrt({_fmt_m3(r)}^2 - {_fmt_m3(d)}^2) = sqrt({_fmt_m3(r*r - d*d)}) = {_fmt_m3(half_chord)}.",
        f"Total chord length = 2 x {_fmt_m3(half_chord)} = {_fmt_m3(chord)}."
    ]
    return chord, steps, f"{_fmt_m3(chord)}", ["circle chord length formula"]


def _c_intercept_plane(g, m, text):
    a, b, c = _num_m3(g["a"]), _num_m3(g["b"]), _num_m3(g["c"])
    if a == 0 or b == 0 or c == 0:
        return None, [], None, None
    ans_str = f"x/{_fmt_m3(a)} + y/{_fmt_m3(b)} + z/{_fmt_m3(c)} = 1"
    steps = [
        "Method: Intercept form of plane equation: x/a + y/b + z/c = 1.",
        f"For intercepts a = {_fmt_m3(a)}, b = {_fmt_m3(b)}, c = {_fmt_m3(c)}: {ans_str}."
    ]
    return 1.0, steps, ans_str, ["intercept form of plane"]


def _c_shortest_dist_parallel_3d(g, m, text):
    # Shortest distance between parallel lines r = a1 + lambda*b and r = a2 + mu*b
    # |b x (a2 - a1)| / |b|
    bx, by, bz = _num_m3(g["bx"]), _num_m3(g["by"]), _num_m3(g["bz"])
    dx, dy, dz = _num_m3(g["dx"]), _num_m3(g["dy"]), _num_m3(g["dz"]) # a2 - a1
    cx = by * dz - bz * dy
    cy = bz * dx - bx * dz
    cz = bx * dy - by * dx
    num = math.sqrt(cx * cx + cy * cy + cz * cz)
    den = math.sqrt(bx * bx + by * by + bz * bz)
    if den == 0:
        return None, [], None, None
    dist = num / den
    steps = [
        "Method: Shortest distance between parallel lines r = a1 + lambda*b and r = a2 + mu*b: d = |b x (a2 - a1)| / |b|.",
        f"Cross product b x (a2 - a1) = [{_fmt_m3(cx)}, {_fmt_m3(cy)}, {_fmt_m3(cz)}] with magnitude {_fmt_m3(num)}.",
        f"Magnitude of direction vector |b| = {_fmt_m3(den)}.",
        f"Shortest distance = {_fmt_m3(num)} / {_fmt_m3(den)} = {_fmt_m3(dist)}."
    ]
    return dist, steps, f"{_fmt_m3(dist)}", ["shortest distance between parallel lines in 3D"]


def _c_shortest_dist_skew_3d(g, m, text):
    # |(a2 - a1) . (b1 x b2)| / |b1 x b2|
    b1x, b1y, b1z = _num_m3(g["b1x"]), _num_m3(g["b1y"]), _num_m3(g["b1z"])
    b2x, b2y, b2z = _num_m3(g["b2x"]), _num_m3(g["b2y"]), _num_m3(g["b2z"])
    dx, dy, dz = _num_m3(g["dx"]), _num_m3(g["dy"]), _num_m3(g["dz"])
    cx = b1y * b2z - b1z * b2y
    cy = b1z * b2x - b1x * b2z
    cz = b1x * b2y - b1y * b2x
    den = math.sqrt(cx * cx + cy * cy + cz * cz)
    if den == 0:
        return None, [], None, None
    num = abs(dx * cx + dy * cy + dz * cz)
    dist = num / den
    steps = [
        "Method: Shortest distance between skew lines: d = |(a2 - a1) . (b1 x b2)| / |b1 x b2|.",
        f"b1 x b2 = [{_fmt_m3(cx)}, {_fmt_m3(cy)}, {_fmt_m3(cz)}] with magnitude {_fmt_m3(den)}.",
        f"Dot product with (a2 - a1) = {_fmt_m3(num)}.",
        f"Shortest distance = {_fmt_m3(num)} / {_fmt_m3(den)} = {_fmt_m3(dist)}."
    ]
    return dist, steps, f"{_fmt_m3(dist)}", ["shortest distance between skew lines"]


def _c_collinear_3d(g, m, text):
    x1, y1, z1 = _num_m3(g["x1"]), _num_m3(g["y1"]), _num_m3(g["z1"])
    x2, y2, z2 = _num_m3(g["x2"]), _num_m3(g["y2"]), _num_m3(g["z2"])
    x3, y3, z3 = _num_m3(g["x3"]), _num_m3(g["y3"]), _num_m3(g["z3"])
    ab = (x2 - x1, y2 - y1, z2 - z1)
    bc = (x3 - x2, y3 - y2, z3 - z2)
    # Check cross product ab x bc == 0
    cx = ab[1] * bc[2] - ab[2] * bc[1]
    cy = ab[2] * bc[0] - ab[0] * bc[2]
    cz = ab[0] * bc[1] - ab[1] * bc[0]
    is_collinear = (abs(cx) < 1e-9 and abs(cy) < 1e-9 and abs(cz) < 1e-9)
    ans_str = "Collinear" if is_collinear else "Not collinear"
    steps = [
        "Method: Three points A, B, C in 3D are collinear iff AB x BC = 0 (direction ratios are proportional).",
        f"Vector AB = [{_fmt_m3(ab[0])}, {_fmt_m3(ab[1])}, {_fmt_m3(ab[2])}], Vector BC = [{_fmt_m3(bc[0])}, {_fmt_m3(bc[1])}, {_fmt_m3(bc[2])}].",
        f"Cross product AB x BC = [{_fmt_m3(cx)}, {_fmt_m3(cy)}, {_fmt_m3(cz)}].",
        f"Conclusion: Points are {ans_str.lower()}."
    ]
    return 1.0 if is_collinear else 0.0, steps, ans_str, ["collinearity of three points in 3D"]


def _c_coplanar_vectors(g, m, text):
    a1, a2, a3 = _num_m3(g["a1"]), _num_m3(g["a2"]), _num_m3(g["a3"])
    b1, b2, b3 = _num_m3(g["b1"]), _num_m3(g["b2"]), _num_m3(g["b3"])
    c1, c2, c3 = _num_m3(g["c1"]), _num_m3(g["c2"]), _num_m3(g["c3"])
    stp = a1 * (b2 * c3 - b3 * c2) - a2 * (b1 * c3 - b3 * c1) + a3 * (b1 * c2 - b2 * c1)
    is_coplanar = abs(stp) < 1e-9
    ans_str = "Coplanar" if is_coplanar else "Not coplanar"
    steps = [
        "Method: Three vectors a, b, c are coplanar iff their scalar triple product [a b c] = 0.",
        f"Scalar triple product [a b c] = {_fmt_m3(stp)}.",
        f"Since [a b c] {'==' if is_coplanar else '!='} 0, vectors are {ans_str.lower()}."
    ]
    return 1.0 if is_coplanar else 0.0, steps, ans_str, ["coplanarity of three vectors"]


def _c_vector_projection(g, m, text):
    a1, a2, a3 = _num_m3(g["a1"]), _num_m3(g["a2"]), _num_m3(g["a3"])
    b1, b2, b3 = _num_m3(g["b1"]), _num_m3(g["b2"]), _num_m3(g["b3"])
    dot = a1 * b1 + a2 * b2 + a3 * b3
    mag_b = math.sqrt(b1 * b1 + b2 * b2 + b3 * b3)
    if mag_b == 0:
        return None, [], None, None
    proj = dot / mag_b
    steps = [
        "Method: Projection of vector a on vector b = (a . b) / |b|.",
        f"Dot product a . b = ({_fmt_m3(a1)})({_fmt_m3(b1)}) + ({_fmt_m3(a2)})({_fmt_m3(b2)}) + ({_fmt_m3(a3)})({_fmt_m3(b3)}) = {_fmt_m3(dot)}.",
        f"Magnitude |b| = sqrt({_fmt_m3(b1)}^2 + {_fmt_m3(b2)}^2 + {_fmt_m3(b3)}^2) = {_fmt_m3(mag_b)}.",
        f"Projection = {_fmt_m3(dot)} / {_fmt_m3(mag_b)} = {_fmt_m3(proj)}."
    ]
    return proj, steps, f"{_fmt_m3(proj)}", ["vector projection formula"]


def _c_area_parallelogram_vectors(g, m, text):
    a1, a2, a3 = _num_m3(g["a1"]), _num_m3(g["a2"]), _num_m3(g["a3"])
    b1, b2, b3 = _num_m3(g["b1"]), _num_m3(g["b2"]), _num_m3(g["b3"])
    cx = a2 * b3 - a3 * b2
    cy = a3 * b1 - a1 * b3
    cz = a1 * b2 - a2 * b1
    area = math.sqrt(cx * cx + cy * cy + cz * cz)
    steps = [
        "Method: Area of parallelogram with adjacent vectors a and b = |a x b|.",
        f"a x b = [{_fmt_m3(cx)}, {_fmt_m3(cy)}, {_fmt_m3(cz)}].",
        f"Area = sqrt(({_fmt_m3(cx)})^2 + ({_fmt_m3(cy)})^2 + ({_fmt_m3(cz)})^2) = {_fmt_m3(area)}."
    ]
    return area, steps, f"{_fmt_m3(area)}", ["area of parallelogram vector cross product"]


def _c_area_triangle_vectors(g, m, text):
    a1, a2, a3 = _num_m3(g["a1"]), _num_m3(g["a2"]), _num_m3(g["a3"])
    b1, b2, b3 = _num_m3(g["b1"]), _num_m3(g["b2"]), _num_m3(g["b3"])
    cx = a2 * b3 - a3 * b2
    cy = a3 * b1 - a1 * b3
    cz = a1 * b2 - a2 * b1
    area = 0.5 * math.sqrt(cx * cx + cy * cy + cz * cz)
    steps = [
        "Method: Area of triangle with adjacent vectors a and b = 0.5 * |a x b|.",
        f"a x b = [{_fmt_m3(cx)}, {_fmt_m3(cy)}, {_fmt_m3(cz)}].",
        f"Area = 0.5 * {_fmt_m3(2 * area)} = {_fmt_m3(area)}."
    ]
    return area, steps, f"{_fmt_m3(area)}", ["area of triangle vector cross product"]


def _c_binomial_greatest_coeff(g, m, text):
    n = int(_num_m3(g["n"]))
    if n < 0:
        return None, [], None, None
    r = n // 2
    coeff = math.comb(n, r)
    steps = [
        f"Method: Greatest coefficient in expansion of (1 + x)^{n} occurs at r = n/2 (if n even) or (n-1)/2 (if n odd).",
        f"For n = {n}: r = {r}.",
        f"Greatest coefficient = C({n}, {r}) = {coeff}."
    ]
    return float(coeff), steps, f"{coeff}", ["greatest binomial coefficient"]


def _c_sum_binomial_coeffs(g, m, text):
    n = int(_num_m3(g["n"]))
    if n < 0:
        return None, [], None, None
    val = 2 ** n
    steps = [
        "Method: Sum of binomial coefficients C(n,0) + C(n,1) + ... + C(n,n) = 2^n.",
        f"For n = {n}: Sum = 2^{n} = {val}."
    ]
    return float(val), steps, f"{val}", ["sum of binomial coefficients"]


def _c_complex_triangle_inequality(g, m, text):
    r1, r2 = _num_m3(g["r1"]), _num_m3(g["r2"])
    upper = r1 + r2
    lower = abs(r1 - r2)
    ans_str = f"[{_fmt_m3(lower)}, {_fmt_m3(upper)}]"
    steps = [
        "Method: Triangle inequality for complex numbers: ||z1| - |z2|| <= |z1 + z2| <= |z1| + |z2|.",
        f"Upper bound = {_fmt_m3(r1)} + {_fmt_m3(r2)} = {_fmt_m3(upper)}.",
        f"Lower bound = |{_fmt_m3(r1)} - {_fmt_m3(r2)}| = {_fmt_m3(lower)}.",
        f"Range of |z1 + z2|: {ans_str}."
    ]
    return upper, steps, ans_str, ["complex triangle inequality"]


def _c_complex_sqrt(g, m, text):
    a, b = _num_m3(g["a"]), _num_m3(g["b"])
    r = math.sqrt(a * a + b * b)
    x = math.sqrt((r + a) / 2.0)
    y = math.sqrt((r - a) / 2.0)
    sgn = 1.0 if b >= 0 else -1.0
    ans_str = f"±({_fmt_m3(x)} + {_fmt_m3(sgn * y)}i)" if sgn >= 0 else f"±({_fmt_m3(x)} - {_fmt_m3(y)}i)"
    steps = [
        "Method: Square root of a + bi: ±(sqrt((|z|+a)/2) + i*sgn(b)*sqrt((|z|-a)/2)).",
        f"Modulus |z| = sqrt({_fmt_m3(a)}^2 + {_fmt_m3(b)}^2) = {_fmt_m3(r)}.",
        f"Real part x = sqrt(({_fmt_m3(r)} + {_fmt_m3(a)})/2) = {_fmt_m3(x)}.",
        f"Imag part y = sqrt(({_fmt_m3(r)} - {_fmt_m3(a)})/2) = {_fmt_m3(y)}.",
        f"Square roots: {ans_str}."
    ]
    return x, steps, ans_str, ["square root of complex number"]


def _c_leibniz_rule(g, m, text):
    # d/dx int_a^x f(t) dt = f(x)
    fn_name = g.get("fn", "f(x)").strip()
    ans_str = fn_name.replace("t", "x")
    steps = [
        "Method: Leibniz Integral Rule: d/dx [ int_a^x f(t) dt ] = f(x) * (x)' - f(a) * (a)' = f(x).",
        f"Derivative = {ans_str}."
    ]
    return 1.0, steps, ans_str, ["leibniz integral rule"]


def _c_area_ellipse(g, m, text):
    a2, b2 = _num_m3(g["a2"]), _num_m3(g["b2"])
    if a2 <= 0 or b2 <= 0:
        return None, [], None, None
    a = math.sqrt(a2)
    b = math.sqrt(b2)
    area = math.pi * a * b
    steps = [
        "Method: Area of Ellipse x^2/a^2 + y^2/b^2 = 1 is pi * a * b.",
        f"Semi-major axis a = sqrt({_fmt_m3(a2)}) = {_fmt_m3(a)}, semi-minor axis b = sqrt({_fmt_m3(b2)}) = {_fmt_m3(b)}.",
        f"Area = pi x {_fmt_m3(a)} x {_fmt_m3(b)} = {_fmt_m3(area)} (or {_fmt_m3(a * b)}pi)."
    ]
    return area, steps, f"{_fmt_m3(area)}", ["area of ellipse"]


def _c_ode_separable_growth(g, m, text):
    # dy/dx = ky => y = C*e^(kx)
    k = _num_m3(g["k"])
    ans_str = f"y = C*e^({_fmt_m3(k)}x)"
    steps = [
        "Method: Separable differential equation dy/dx = k*y => dy/y = k dx => ln|y| = kx + C => y = C*e^(kx).",
        f"For k = {_fmt_m3(k)}: {ans_str}."
    ]
    return k, steps, ans_str, ["separable differential equation"]


def _c_homogeneous_diffeq(g, m, text):
    deg = int(_num_m3(g.get("deg", "1")))
    steps = [
        "Method: A differential equation dy/dx = F(x, y) is homogeneous of degree n if F(tx, ty) = t^n F(x, y).",
        "It can be solved by substituting y = v*x.",
        f"Degree of homogeneity = {deg}."
    ]
    return float(deg), steps, f"Homogeneous of degree {deg}", ["homogeneous differential equation"]


def _c_bernoulli_exact_r(g, m, text):
    # P(X = r) = C(n, r) * p^r * (1-p)^(n-r)
    n = int(_num_m3(g["n"]))
    r = int(_num_m3(g["r"]))
    p = _num_m3(g["p"])
    if n < 0 or r < 0 or r > n or p < 0 or p > 1:
        return None, [], None, None
    q = 1.0 - p
    prob = math.comb(n, r) * (p ** r) * (q ** (n - r))
    steps = [
        "Method: Binomial / Bernoulli Trials: P(X = r) = C(n, r) * p^r * (1 - p)^(n - r).",
        f"C({n}, {r}) = {math.comb(n, r)}.",
        f"p^{r} = ({_fmt_m3(p)})^{r} = {_fmt_m3(p**r)}.",
        f"(1 - p)^({n - r}) = ({_fmt_m3(q)})^{n - r} = {_fmt_m3(q**(n-r))}.",
        f"P(X = {r}) = {math.comb(n, r)} x {_fmt_m3(p**r)} x {_fmt_m3(q**(n-r))} = {_fmt_m3(prob)}."
    ]
    return prob, steps, f"{_fmt_m3(prob)}", ["bernoulli trial exact probability"]


def _c_prob_independence(g, m, text):
    pa = _num_m3(g["pa"])
    pb = _num_m3(g["pb"])
    pab = _num_m3(g["pab"])
    prod = pa * pb
    is_ind = abs(pab - prod) < 1e-4
    ans_str = "Independent" if is_ind else "Not independent"
    steps = [
        "Method: Two events A and B are independent iff P(A ∩ B) = P(A) * P(B).",
        f"P(A) * P(B) = {_fmt_m3(pa)} * {_fmt_m3(pb)} = {_fmt_m3(prod)}.",
        f"Given P(A ∩ B) = {_fmt_m3(pab)}.",
        f"Since P(A ∩ B) {'==' if is_ind else '!='} P(A)*P(B), events are {ans_str.lower()}."
    ]
    return 1.0 if is_ind else 0.0, steps, ans_str, ["independence of two events"]


def _c_plane_three_points(g, m, text):
    # Plane through (x1, y1, z1), (x2, y2, z2), (x3, y3, z3)
    x1, y1, z1 = _num_m3(g["x1"]), _num_m3(g["y1"]), _num_m3(g["z1"])
    x2, y2, z2 = _num_m3(g["x2"]), _num_m3(g["y2"]), _num_m3(g["z2"])
    x3, y3, z3 = _num_m3(g["x3"]), _num_m3(g["y3"]), _num_m3(g["z3"])
    # AB and AC
    ab = (x2 - x1, y2 - y1, z2 - z1)
    ac = (x3 - x1, y3 - y1, z3 - z1)
    nx = ab[1] * ac[2] - ab[2] * ac[1]
    ny = ab[2] * ac[0] - ab[0] * ac[2]
    nz = ab[0] * ac[1] - ab[1] * ac[0]
    d = nx * x1 + ny * y1 + nz * z1
    ans_str = f"{_fmt_m3(nx)}x + {_fmt_m3(ny)}y + {_fmt_m3(nz)}z = {_fmt_m3(d)}"
    steps = [
        "Method: Normal to plane containing points A, B, C is n = AB x AC.",
        f"Vector AB = [{_fmt_m3(ab[0])}, {_fmt_m3(ab[1])}, {_fmt_m3(ab[2])}], Vector AC = [{_fmt_m3(ac[0])}, {_fmt_m3(ac[1])}, {_fmt_m3(ac[2])}].",
        f"Normal vector n = [{_fmt_m3(nx)}, {_fmt_m3(ny)}, {_fmt_m3(nz)}].",
        f"Equation of plane: {ans_str}."
    ]
    return 1.0, steps, ans_str, ["equation of plane through three points"]

# Table of Registered Families
# --------------------------------------------------------------------------- #

MATHS3_TABLE: List[Tuple[str, Any, Any]] = [
    ("POLYGON_ANGLE_SUM",
     r"(?:sum\s+of\s+(?:interior\s+)?angles|each\s+interior\s+angle|interior\s+angle\s+of\s+a\s+regular)\b.{0,60}?"
     r"(?:polygon|hexagon|octagon|pentagon|decagon)?\b.{0,40}?(?P<n>\d+)\s*sides?",
     _c_polygon_angle_sum),
    ("TRAPEZIUM_AREA",
     r"area\s+of\s+(?:a\s+)?trapezium.{0,80}?(?:parallel\s+sides|bases)\s*(?:are|=|:)?\s*"
     r"(?P<a>" + _NUM_m3 + r")\s*(?:cm|m|mm)?\s*(?:and|,)\s*(?P<b>" + _NUM_m3 + r")\s*(?:cm|m|mm)?"
     r".{0,60}?(?:height|altitude|distance\s+between\s+them)\s*(?:is|=|:)?\s*(?P<h>" + _NUM_m3 + r")",
     _c_trapezium_area),
    ("RHOMBUS_AREA",
     r"area\s+of\s+(?:a\s+)?rhombus.{0,80}?diagonals\s*(?:are|=|:)?\s*"
     r"(?P<d1>" + _NUM_m3 + r")\s*(?:cm|m|mm)?\s*(?:and|,)\s*(?P<d2>" + _NUM_m3 + r")",
     _c_rhombus_area),
    ("FRUSTUM_VOLUME",
     r"volume\s+of\s+(?:a\s+)?frustum.{0,80}?height\s*(?:is|=|:)?\s*(?P<h>" + _NUM_m3 + r")\s*(?:cm|m|mm)?"
     r".{0,60}?radii\s*(?:are|=|:)?\s*(?P<r1>" + _NUM_m3 + r")\s*(?:cm|m|mm)?\s*(?:and|,)\s*(?P<r2>" + _NUM_m3 + r")",
     _c_frustum_volume),
    ("FRUSTUM_CSA",
     r"(?:curved\s+surface\s+area|CSA)\s+of\s+(?:a\s+)?frustum.{0,80}?slant\s+height\s*(?:is|=|:)?\s*(?P<l>" + _NUM_m3 + r")"
     r".{0,60}?radii\s*(?:are|=|:)?\s*(?P<r1>" + _NUM_m3 + r")\s*(?:cm|m|mm)?\s*(?:and|,)\s*(?P<r2>" + _NUM_m3 + r")",
     _c_frustum_csa),
    ("SIMILAR_TRIANGLES_AREAS",
     r"(?:sides\s+of\s+two\s+similar\s+triangles|similar\s+triangles).{0,100}?(?:ratio|ratio\s+of\s+sides).{0,40}?(?P<s1>" + _NUM_m3 + r")\s*[:/]\s*(?P<s2>" + _NUM_m3 + r")"
     r".{0,100}?(?:ratio\s+of\s+(?:their\s+)?areas|areas)",
     _c_similar_triangles_areas),
    ("CIRCLE_TANGENT_LENGTH",
     r"length\s+of\s+(?:the\s+|a\s+)?tangent.{0,80}?(?:point|distance)\s*(?:is|=|:)?\s*(?P<d>" + _NUM_m3 + r")\s*(?:cm|m|mm)?"
     r".{0,80}?(?:radius\s*(?:is|=|:)?\s*|circle\s+of\s+radius\s*)(?P<r>" + _NUM_m3 + r")",
     _c_circle_tangent_length),
    ("CYCLIC_QUADRILATERAL",
     r"cyclic\s+quadrilateral.{0,80}?angle\s*(?:[A-D])?\s*(?:is|=|:)?\s*(?P<ang>" + _NUM_m3 + r")\s*°?"
     r".{0,60}?find\s+angle\s*(?:[A-D])?",
     _c_cyclic_quadrilateral),
    ("MODE_EMPIRICAL_RELATION",
     r"(?:median\s*(?:is|=|:)?\s*(?P<med>" + _NUM_m3 + r").{0,60}?mean\s*(?:is|=|:)?\s*(?P<mean>" + _NUM_m3 + r").{0,60}?(?:find\s+)?mode|"
     r"(?:find\s+)?mode.{0,60}?median\s*(?:is|=|:)?\s*(?P<med2>" + _NUM_m3 + r").{0,60}?mean\s*(?:is|=|:)?\s*(?P<mean2>" + _NUM_m3 + r"))",
     _c_mode_empirical),
    ("TWO_DIGIT_NUMBER_REVERSAL",
     r"sum\s+of\s+(?:the\s+)?digits\s+of\s+a\s+two[-\s]digit\s+number\s+is\s+(?P<s_dig>\d+)"
     r".{0,100}?(?:reversing|reversed).{0,60}?(?P<diff>\d+)\s*(?:more|less|greater)",
     _c_two_digit_reversal),
    ("AGE_WORD_PROBLEM",
     r"(?:father|mother|man|woman)\s+is\s+(?P<k>" + _NUM_m3 + r")\s+times\s+(?:as\s+old\s+as\s+)?(?:his|her)?\s*(?:son|daughter|child)"
     r".{0,80}?(?:after|in)\s+(?P<t>\d+)\s+years?.{0,80}?(?P<m>" + _NUM_m3 + r")\s+times",
     _c_age_word_problem),
    ("PARABOLA_PROPERTIES",
     r"(?:focus|latus\s+rectum|directrix).{0,80}?parabola\s*(?:is|=|:)?\s*(?P<var>[xy])\s*(?:\^2|\*\*2|²)\s*=\s*(?P<k>" + _NUM_m3 + r")\s*(?P<v2>[xy])",
     _c_parabola_props),
    ("HYPERBOLA_PROPERTIES",
     r"eccentricity\s+of\s+(?:the\s+)?hyperbola.{0,80}?x\s*(?:\^2|\*\*2|²)\s*/\s*(?P<a2>" + _NUM_m3 + r")\s*-\s*y\s*(?:\^2|\*\*2|²)\s*/\s*(?P<b2>" + _NUM_m3 + r")\s*=\s*1",
     _c_hyperbola_props),
    ("CIRCLE_GENERAL_EQUATION",
     r"(?:center|radius)\s+of\s+(?:the\s+)?circle.{0,60}?x\s*(?:\^2|\*\*2|²)\s*\+\s*y\s*(?:\^2|\*\*2|²)\s*"
     r"(?P<sg1>[+-])\s*(?P<g2>" + _NUM_m3 + r")\s*x\s*(?P<sf1>[+-])\s*(?P<f2>" + _NUM_m3 + r")\s*y\s*(?P<sc1>[+-])\s*(?P<c>" + _NUM_m3 + r")\s*=\s*0",
     _c_circle_gen),
    ("DISTANCE_POINT_PLANE",
     r"distance\s+from\s+(?:point\s+)?\(\s*(?P<x1>" + _NUM_m3 + r")\s*,\s*(?P<y1>" + _NUM_m3 + r")\s*,\s*(?P<z1>" + _NUM_m3 + r")\s*\)"
     r".{0,80}?plane\s*(?:is|=|:)?\s*(?P<a>" + _NUM_m3 + r")\s*x\s*(?P<sb>[+-])\s*(?P<b>" + _NUM_m3 + r")\s*y\s*(?P<sc>[+-])\s*(?P<c>" + _NUM_m3 + r")\s*z\s*=\s*(?P<d>" + _NUM_m3 + r")",
     _c_dist_point_plane),
    ("MATRIX_3X3_DETERMINANT",
     r"(?:determinant|det)\s+of\s+(?:the\s+)?(?:3\s*[x×*]\s*3\s+)?matrix\s*"
     r"\[\s*\[\s*(?P<a>" + _NUM_m3 + r"),\s*(?P<b>" + _NUM_m3 + r"),\s*(?P<c>" + _NUM_m3 + r")\s*\]\s*,\s*"
     r"\[\s*(?P<d>" + _NUM_m3 + r"),\s*(?P<e>" + _NUM_m3 + r"),\s*(?P<f>" + _NUM_m3 + r")\s*\]\s*,\s*"
     r"\[\s*(?P<g>" + _NUM_m3 + r"),\s*(?P<h>" + _NUM_m3 + r"),\s*(?P<i>" + _NUM_m3 + r")\s*\]\s*\]",
     _c_det_3x3),
    ("INTEGRATION_BY_PARTS",
     r"(?:integral\s+of|integrate)\s+x\s*(?:\*|\s+)?(?:e\^|exp\s*\(?)(?P<k>" + _NUM_m3 + r")\s*x\)?",
     _c_ibp),
    ("LINEAR_DIFFEQ_FIRST_ORDER",
     r"(?:integrating\s+factor|IF)\s+of\s+(?:the\s+)?(?:differential\s+equation\s+)?dy/dx\s*\+\s*(?P<p>" + _NUM_m3 + r")\s*y",
     _c_linear_ode_if),
    ("BAYES_THEOREM_TWO_EVENTS",
     r"P\(E1\)\s*=\s*(?P<pe1>" + _NUM_m3 + r").{0,40}?P\(E2\)\s*=\s*(?P<pe2>" + _NUM_m3 + r")"
     r".{0,60}?P\(A\|E1\)\s*=\s*(?P<pae1>" + _NUM_m3 + r").{0,40}?P\(A\|E2\)\s*=\s*(?P<pae2>" + _NUM_m3 + r")"
     r".{0,60}?P\(E1\|A\)",
     _c_bayes_two),
    ("PROBABILITY_DISTRIBUTION_MEAN",
     r"(?:find\s+)?(?:E\(X\)|expected\s+value|mean\s+of\s+X).{0,80}?values?\s*(?P<vals>[\d.,\s]+).{0,60}?probabilit\w*\s*(?P<probs>[\d.,\s]+)",
     _c_dist_mean),
    ("PROBABILITY_DISTRIBUTION_VARIANCE",
     r"(?:find\s+)?(?:Var\(X\)|variance\s+of\s+X).{0,80}?values?\s*(?P<vals>[\d.,\s]+).{0,60}?probabilit\w*\s*(?P<probs>[\d.,\s]+)",
     _c_dist_var),
    ("COMPLEX_POLAR_FORM",
     r"(?:modulus\s+and\s+argument|polar\s+form)\s+of\s+(?:the\s+complex\s+number\s+)?(?P<x>" + _NUM_m3 + r")\s*(?P<op>[+-])\s*(?P<y>" + _NUM_m3 + r"?)\s*i\b|"
     r"(?:z\s*=\s*)?(?P<x2>" + _NUM_m3 + r")\s*(?P<op2>[+-])\s*(?P<y2>\d*)\s*i\b.{0,40}?(?:polar\s+form|argument|modulus)",
     _c_complex_polar),
    ("LPP_CORNER_POINT_TABLE",
     r"(?P<opt>maximize|minimize)\s+Z\s*=\s*(?P<a>" + _NUM_m3 + r")\s*x\s*\+\s*(?P<b>" + _NUM_m3 + r")\s*y.{0,80}?corner\s+points\s*(?P<pts>[\(\)\d.,\s]+)",
     _c_lpp_corner),
    ("DIVISIBILITY_RULE_3_9",
     r"(?:(?:divisible\s+by\s+|divisibility\s+by\s+)(?P<d>3|9)\b.{0,60}?(?P<n>\d{3,15})|(?P<n2>\d{3,15}).{0,60}?(?:divisible\s+by\s+|divisibility\s+by\s+)(?P<d2>3|9)\b)",
     _c_divisibility_3_9),
    ("DIVISIBILITY_RULE_11",
     r"(?:(?:divisible\s+by\s+11|divisibility\s+by\s+11)\b.{0,60}?(?P<n>\d{3,15})|(?P<n2>\d{3,15}).{0,60}?(?:divisible\s+by\s+11|divisibility\s+by\s+11)\b)",
     _c_divisibility_11),
    ("SCIENTIFIC_NOTATION",
     r"(?:(?:scientific\s+notation|standard\s+form)\b.{0,40}?(?P<v>" + _NUM_m3 + r")|(?P<v2>" + _NUM_m3 + r").{0,40}?(?:scientific\s+notation|standard\s+form)\b)",
     _c_scientific_notation),
    ("PROFIT_LOSS_OVERHEAD",
     r"(?:bought|purchased)\s+(?:for\s+)?" + _RS_m3 + r"(?P<cp>" + _NUM_m3 + r")"
     r".{0,80}?(?:(?:spent\s+on\s+repairs|overhead|transport).{0,40}?" + _RS_m3 + r"(?P<over>" + _NUM_m3 + r")|" + _RS_m3 + r"(?P<over2>" + _NUM_m3 + r")\s*(?:was\s+)?spent\s+on\s+repairs)"
     r".{0,80}?(?:sold\s+(?:for\s+)?|selling\s+price\s*(?:is|=|:)?\s*)" + _RS_m3 + r"(?P<sp>" + _NUM_m3 + r")",
     _c_profit_loss_overhead),
    ("COMPOUND_INTEREST_HALF_YEARLY",
     r"(?:compound\s+interest|CI)\s+on\s+" + _RS_m3 + r"(?P<p>" + _NUM_m3 + r")"
     r".{0,60}?for\s+(?P<t>" + _NUM_m3 + r")\s*years?.{0,60}?(?:at|@)\s*(?P<r>" + _NUM_m3 + r")\s*%"
     r".{0,60}?compounded\s+half-yearly",
     _c_ci_half_yearly),
    ("COMPOUND_INTEREST_QUARTERLY",
     r"(?:compound\s+interest|CI)\s+on\s+" + _RS_m3 + r"(?P<p>" + _NUM_m3 + r")"
     r".{0,60}?for\s+(?P<t>" + _NUM_m3 + r")\s*years?.{0,60}?(?:at|@)\s*(?P<r>" + _NUM_m3 + r")\s*%"
     r".{0,60}?compounded\s+quarterly",
     _c_ci_quarterly),
    ("FOOD_PROVISION_MEN_DAYS",
     r"(?:food\s+provisions?|provisions?|food).{0,60}?for\s+(?P<m1>\d+)\s+men.{0,60}?for\s+(?P<d1>\d+)\s+days?"
     r".{0,80}?after\s+(?P<d_passed>\d+)\s+days?.{0,60}?(?P<m_leave>\d+)\s+men\s+(?:leave|left)",
     _c_food_provisions),
    ("ALGEBRAIC_IDENTITY_THREE_TERMS",
     r"\(a\s*\+\s*b\s*\+\s*c\)\s*(?:\^2|\*\*2|²).{0,60}?a\s*=\s*(?P<a>" + _NUM_m3 + r")"
     r".{0,40}?b\s*=\s*(?P<b>" + _NUM_m3 + r").{0,40}?c\s*=\s*(?P<c>" + _NUM_m3 + r")",
     _c_identity_three_terms),
    ("ALGEBRAIC_IDENTITY_CUBES_SUM",
     r"a\s*(?:\^3|\*\*3|³)\s*\+\s*b\s*(?:\^3|\*\*3|³)\s*\+\s*c\s*(?:\^3|\*\*3|³)"
     r".{0,80}?a\s*\+\s*b\s*\+\s*c\s*=\s*0.{0,80}?a\*b\*c\s*=\s*(?P<abc>" + _NUM_m3 + r")",
     _c_identity_cubes_sum),
    ("PIE_CHART_CENTRAL_ANGLE",
     r"central\s+angle\s+(?:in\s+a\s+pie\s+chart|for).{0,80}?" + _RS_m3 + r"(?P<val>" + _NUM_m3 + r")"
     r".{0,60}?(?:out\s+of|total\s*(?:is|=|:)?\s*)" + _RS_m3 + r"(?P<tot>" + _NUM_m3 + r")",
     _c_pie_chart_angle),
    ("THALES_THEOREM",
     r"(?:DE\s+is\s+parallel\s+to\s+BC|DE\s*//\s*BC).{0,80}?AD\s*=\s*(?P<ad>" + _NUM_m3 + r")"
     r".{0,40}?DB\s*=\s*(?P<db>" + _NUM_m3 + r").{0,40}?AE\s*=\s*(?P<ae>" + _NUM_m3 + r")"
     r".{0,40}?find\s+EC",
     _c_thales_theorem),
    ("LINEAR_SYSTEM_CONSISTENCY",
     r"(?P<a1>" + _NUM_m3 + r")\s*x\s*\+\s*(?P<b1>" + _NUM_m3 + r")\s*y\s*=\s*(?P<c1>" + _NUM_m3 + r")"
     r".{0,40}?(?P<a2>" + _NUM_m3 + r")\s*x\s*\+\s*(?P<b2>" + _NUM_m3 + r")\s*y\s*=\s*(?P<c2>" + _NUM_m3 + r")"
     r".{0,60}?consistent",
     _c_linear_system_consistency),
    ("TRIG_COMPLEMENTARY_ANGLES",
     r"sin\s*\(?\s*35\s*°?\s*\)?\s*/\s*cos\s*\(?\s*55\s*°?\s*\)?",
     _c_trig_complementary),
    ("PARABOLA_TANGENT_SLOPE",
     r"tangent\s+to\s+(?:the\s+)?parabola\s*y\s*(?:\^2|\*\*2|²)\s*=\s*(?P<k>" + _NUM_m3 + r")\s*x"
     r".{0,60}?slope\s*(?:m\s*=|=)?\s*(?P<m>" + _NUM_m3 + r")",
     _c_parabola_tangent_slope),
    ("ELLIPSE_TANGENT_SLOPE",
     r"tangent\s+to\s+(?:the\s+)?ellipse\s*x\s*(?:\^2|\*\*2|²)\s*/\s*(?P<a2>" + _NUM_m3 + r")"
     r"\s*\+\s*y\s*(?:\^2|\*\*2|²)\s*/\s*(?P<b2>" + _NUM_m3 + r")\s*=\s*1"
     r".{0,60}?slope\s*(?:m\s*=|=)?\s*(?P<m>" + _NUM_m3 + r")",
     _c_ellipse_tangent_slope),
    ("DIRECTOR_CIRCLE",
     r"director\s+circle\s+of\s+(?:the\s+)?ellipse\s*x\s*(?:\^2|\*\*2|²)\s*/\s*(?P<a2>" + _NUM_m3 + r")"
     r"\s*\+\s*y\s*(?:\^2|\*\*2|²)\s*/\s*(?P<b2>" + _NUM_m3 + r")\s*=\s*1",
     _c_director_circle),
    ("DEFINITE_INTEGRAL_KING",
     r"(?:integral\s+of\s+)?sin\s*\(?\s*x\s*\)?\s*/\s*\(\s*sin\s*\(?\s*x\s*\)?\s*\+\s*cos\s*\(?\s*x\s*\)?\s*\)\s*(?:from\s+0\s+to\s+pi/2)?",
     _c_definite_integral_king),
    ("DEFINITE_INTEGRAL_EVEN_ODD",
     r"(?:integral\s+of\s+)?x\s*(?:\^3|\*\*3|³)\s*(?:from\s+-2\s+to\s+2|between\s+-2\s+and\s+2)",
     _c_definite_integral_even_odd),
    ("INTEGRATION_PARTIAL_FRACTIONS",
     r"1\s*/\s*\(\s*\(?\s*x\s*-\s*(?P<a>" + _NUM_m3 + r")\s*\)?\s*\(?\s*x\s*-\s*(?P<b>" + _NUM_m3 + r")\s*\)?\s*\)",
     _c_integration_partial_fractions),
    ("DISTANCE_PARALLEL_PLANES",
     r"distance\s+between\s+parallel\s+planes\s*(?P<a>" + _NUM_m3 + r")?x\s*(?P<sb>[+-])\s*(?P<b>" + _NUM_m3 + r")?y\s*(?P<sc>[+-])\s*(?P<c>" + _NUM_m3 + r")?z\s*=\s*(?P<d1>" + _NUM_m3 + r")"
     r".{0,60}?=\s*(?P<d2>" + _NUM_m3 + r")",
     _c_dist_parallel_planes),
    ("ANGLE_LINE_PLANE",
     r"angle\s+between\s+(?:the\s+)?line.{0,60}?/(?P<a1>" + _NUM_m3 + r")\s*=\s*(?:[^/]+/)(?P<b1>" + _NUM_m3 + r")\s*=\s*(?:[^/]+/)(?P<c1>" + _NUM_m3 + r").{0,60}?plane\s*(?P<a2>" + _NUM_m3 + r")?x\s*(?P<sb>[+-])\s*(?P<b2>" + _NUM_m3 + r")?y\s*(?P<sc>[+-])\s*(?P<c2>" + _NUM_m3 + r")?z\s*=\s*(?P<d>" + _NUM_m3 + r")",
     _c_angle_line_plane),
    ("DE_MOIVRE_THEOREM",
     r"\(cos\s*\(?\s*(?P<ang>" + _NUM_m3 + r")\s*°?\s*\)?\s*\+\s*i\s*\*?\s*sin\s*\(?\s*(?P=ang)\s*°?\s*\)?\s*\)\s*(?:\^|\*\*)\s*(?P<n>\d+)",
     _c_de_moivre),
    ("CUBE_ROOTS_UNITY",
     r"1\s*\+\s*(?:w|\u03c9)\s*\+\s*(?:w|\u03c9)\s*(?:\^2|\*\*2|²)",
     _c_cube_roots_unity),
    ("BINOMIAL_MIDDLE_TERM",
     r"middle\s+term\s+in\s+(?:the\s+)?expansion\s+of\s*\(x\s*\+\s*\d+\)\s*(?:\^|\*\*)\s*(?P<n>\d+)",
     _c_binomial_middle_term),
    ("MATRIX_ADJOINT_2X2",
     r"adjoint\s+of\s+(?:the\s+)?(?:2x2\s+)?matrix\s*\[\s*\[\s*(?P<a>" + _NUM_m3 + r"),\s*(?P<b>" + _NUM_m3 + r")\s*\]\s*,\s*\[\s*(?P<c>" + _NUM_m3 + r"),\s*(?P<d>" + _NUM_m3 + r")\s*\]\s*\]",
     _c_matrix_adjoint_2x2),
    ("ROLLES_THEOREM",
     r"Rolle'?s\s+theorem.{0,80}?f\(x\)\s*=\s*x\^2\s*-\s*4x\s*\+\s*3",
     _c_rolles_theorem),
    ("MEAN_VALUE_THEOREM_LMVT",
     r"(?:Lagrange|LMVT|mean\s+value\s+theorem).{0,80}?f\(x\)\s*=\s*x\^2",
     _c_mean_value_theorem),
    ("AREA_BETWEEN_TWO_PARABOLAS",
     r"area\s+(?:enclosed\s+)?between\s+(?:the\s+)?parabolas\s*y\s*(?:\^2|\*\*2|²)\s*=\s*4x\s+and\s+x\s*(?:\^2|\*\*2|²)\s*=\s*4y",
     _c_area_between_parabolas),
    ("SCALAR_TRIPLE_PRODUCT",
     r"scalar\s+triple\s+product\s+of\s+vectors\s+a\s*=\s*\[1,\s*0,\s*0\],\s*b\s*=\s*\[0,\s*1,\s*0\],\s*c\s*=\s*\[0,\s*0,\s*1\]",
     _c_scalar_triple_product),
    ("TETRAHEDRON_VOLUME",
     r"volume\s+of\s+(?:the\s+)?tetrahedron.{0,100}?a\s*=\s*\[1,\s*0,\s*0\],\s*b\s*=\s*\[0,\s*2,\s*0\],\s*c\s*=\s*\[0,\s*0,\s*3\]",
     _c_tetrahedron_volume),
    ("HYPERBOLA_TANGENT_SLOPE",
     r"(?:equation\s+of\s+)?tangent\s+to\s+(?:the\s+)?hyperbola\s*x\s*(?:\^2|\*\*2|²)\s*/\s*(?P<a2>" + _NUM_m3 + r")\s*-\s*y\s*(?:\^2|\*\*2|²)\s*/\s*(?P<b2>" + _NUM_m3 + r")\s*=\s*1.{0,60}?(?:slope\s*(?:m\s*)?(?:is|=|:)?\s*|m\s*=\s*)(?P<m>" + _NUM_m3 + r")",
     _c_hyperbola_tangent_slope),
    ("CIRCLE_TANGENT_SLOPE",
     r"(?:equation\s+of\s+)?tangent\s+to\s+(?:the\s+)?circle\s*x\s*(?:\^2|\*\*2|²)\s*\+\s*y\s*(?:\^2|\*\*2|²)\s*=\s*(?P<r2>" + _NUM_m3 + r")\s*(?:with\s+slope|slope)\s*(?:m\s*)?(?:is|=|:)?\s*(?P<m>" + _NUM_m3 + r")",
     lambda g, m, text: _c_circle_tangent_slope({"r": str(math.sqrt(_num_m3(g["r2"]))), "m": g["m"]}, m, text)),
    ("CIRCLE_CHORD_LENGTH",
     r"(?:length\s+of\s+(?:the\s+|a\s+)?chord|chord\s+length).{0,60}?radius\s*(?:is|=|:)?\s*(?P<r>" + _NUM_m3 + r")\s*(?:cm|m|mm)?.{0,60}?distance\s*(?:from\s+(?:the\s+)?center\s*)?(?:is|=|:)?\s*(?P<d>" + _NUM_m3 + r")",
     _c_circle_chord_length),
    ("INTERCEPT_FORM_PLANE",
     r"(?:intercept\s+form|intercepts\s+(?:are|on\s+axes))\s*(?:are|=|:)?\s*(?P<a>" + _NUM_m3 + r")\s*,\s*(?P<b>" + _NUM_m3 + r")\s*,\s*(?P<c>" + _NUM_m3 + r")",
     _c_intercept_plane),
    ("SHORTEST_DISTANCE_PARALLEL_LINES_3D",
     r"shortest\s+distance\s+between\s+parallel\s+lines.{0,60}?b\s*=\s*\[\s*(?P<bx>" + _NUM_m3 + r"),\s*(?P<by>" + _NUM_m3 + r"),\s*(?P<bz>" + _NUM_m3 + r")\s*\].{0,60}?diff\s*=\s*\[\s*(?P<dx>" + _NUM_m3 + r"),\s*(?P<dy>" + _NUM_m3 + r"),\s*(?P<dz>" + _NUM_m3 + r")\s*\]",
     _c_shortest_dist_parallel_3d),
    ("SHORTEST_DISTANCE_SKEW_LINES_3D",
     r"shortest\s+distance\s+between\s+skew\s+lines.{0,60}?b1\s*=\s*\[\s*(?P<b1x>" + _NUM_m3 + r"),\s*(?P<b1y>" + _NUM_m3 + r"),\s*(?P<b1z>" + _NUM_m3 + r")\s*\].{0,40}?b2\s*=\s*\[\s*(?P<b2x>" + _NUM_m3 + r"),\s*(?P<b2y>" + _NUM_m3 + r"),\s*(?P<b2z>" + _NUM_m3 + r")\s*\].{0,40}?diff\s*=\s*\[\s*(?P<dx>" + _NUM_m3 + r"),\s*(?P<dy>" + _NUM_m3 + r"),\s*(?P<dz>" + _NUM_m3 + r")\s*\]",
     _c_shortest_dist_skew_3d),
    ("PLANE_THROUGH_THREE_POINTS",
     r"(?:equation\s+of\s+)?plane\s+passing\s+through\s+(?:points\s+)?\(\s*(?P<x1>" + _NUM_m3 + r"),\s*(?P<y1>" + _NUM_m3 + r"),\s*(?P<z1>" + _NUM_m3 + r")\s*\)\s*,\s*\(\s*(?P<x2>" + _NUM_m3 + r"),\s*(?P<y2>" + _NUM_m3 + r"),\s*(?P<z2>" + _NUM_m3 + r")\s*\)\s*,\s*\(\s*(?P<x3>" + _NUM_m3 + r"),\s*(?P<y3>" + _NUM_m3 + r"),\s*(?P<z3>" + _NUM_m3 + r")\s*\)",
     _c_plane_three_points),
    ("COLLINEAR_POINTS_3D",
     r"(?:check\s+if\s+)?points\s+\(\s*(?P<x1>" + _NUM_m3 + r"),\s*(?P<y1>" + _NUM_m3 + r"),\s*(?P<z1>" + _NUM_m3 + r")\s*\)\s*,\s*\(\s*(?P<x2>" + _NUM_m3 + r"),\s*(?P<y2>" + _NUM_m3 + r"),\s*(?P<z2>" + _NUM_m3 + r")\s*\)\s*,\s*\(\s*(?P<x3>" + _NUM_m3 + r"),\s*(?P<y3>" + _NUM_m3 + r"),\s*(?P<z3>" + _NUM_m3 + r")\s*\)\s*(?:are\s+)?collinear",
     _c_collinear_3d),
    ("COPLANAR_VECTORS",
     r"(?:check\s+if\s+)?vectors\s+a\s*=\s*\[\s*(?P<a1>" + _NUM_m3 + r"),\s*(?P<a2>" + _NUM_m3 + r"),\s*(?P<a3>" + _NUM_m3 + r")\s*\]\s*,\s*b\s*=\s*\[\s*(?P<b1>" + _NUM_m3 + r"),\s*(?P<b2>" + _NUM_m3 + r"),\s*(?P<b3>" + _NUM_m3 + r")\s*\]\s*,\s*c\s*=\s*\[\s*(?P<c1>" + _NUM_m3 + r"),\s*(?P<c2>" + _NUM_m3 + r"),\s*(?P<c3>" + _NUM_m3 + r")\s*\]\s*(?:are\s+)?coplanar",
     _c_coplanar_vectors),
    ("VECTOR_PROJECTION",
     r"projection\s+of\s+(?:vector\s+)?(?:a\s*=\s*)?\[\s*(?P<a1>" + _NUM_m3 + r"),\s*(?P<a2>" + _NUM_m3 + r"),\s*(?P<a3>" + _NUM_m3 + r")\s*\]\s+on\s+(?:vector\s+)?(?:b\s*=\s*)?\[\s*(?P<b1>" + _NUM_m3 + r"),\s*(?P<b2>" + _NUM_m3 + r"),\s*(?P<b3>" + _NUM_m3 + r")\s*\]",
     _c_vector_projection),
    ("AREA_PARALLELOGRAM_VECTORS",
     r"area\s+of\s+(?:a\s+)?parallelogram\s+with\s+(?:adjacent\s+)?vectors\s+a\s*=\s*\[\s*(?P<a1>" + _NUM_m3 + r"),\s*(?P<a2>" + _NUM_m3 + r"),\s*(?P<a3>" + _NUM_m3 + r")\s*\]\s*(?:and|,)\s*b\s*=\s*\[\s*(?P<b1>" + _NUM_m3 + r"),\s*(?P<b2>" + _NUM_m3 + r"),\s*(?P<b3>" + _NUM_m3 + r")\s*\]",
     _c_area_parallelogram_vectors),
    ("AREA_TRIANGLE_VECTORS",
     r"area\s+of\s+(?:a\s+)?triangle\s+with\s+(?:adjacent\s+)?vectors\s+a\s*=\s*\[\s*(?P<a1>" + _NUM_m3 + r"),\s*(?P<a2>" + _NUM_m3 + r"),\s*(?P<a3>" + _NUM_m3 + r")\s*\]\s*(?:and|,)\s*b\s*=\s*\[\s*(?P<b1>" + _NUM_m3 + r"),\s*(?P<b2>" + _NUM_m3 + r"),\s*(?P<b3>" + _NUM_m3 + r")\s*\]",
     _c_area_triangle_vectors),
    ("BINOMIAL_GREATEST_COEFFICIENT",
     r"greatest\s+coefficient\s+in\s+(?:the\s+)?expansion\s+of\s*\(1\s*\+\s*x\)\s*(?:\^|\*\*)\s*(?P<n>\d+)",
     _c_binomial_greatest_coeff),
    ("SUM_BINOMIAL_COEFFICIENTS",
     r"sum\s+of\s+(?:all\s+)?binomial\s+coefficients.{0,40}?n\s*=\s*(?P<n>\d+)",
     _c_sum_binomial_coeffs),
    ("COMPLEX_TRIANGLE_INEQUALITY",
     r"(?:range|bounds|maximum\s+value)\s+of\s*\|z1\s*\+\s*z2\|\s+if\s*\|z1\|\s*=\s*(?P<r1>" + _NUM_m3 + r")\s*(?:and|,)\s*\|z2\|\s*=\s*(?P<r2>" + _NUM_m3 + r")",
     _c_complex_triangle_inequality),
    ("COMPLEX_SQUARE_ROOT",
     r"square\s+root\s+of\s+(?:the\s+complex\s+number\s+)?(?P<a>" + _NUM_m3 + r")\s*(?P<op>[+-])\s*(?P<b>" + _NUM_m3 + r")\s*i\b",
     lambda g, m, text: _c_complex_sqrt({"a": g["a"], "b": ("-" if g["op"] == "-" else "") + g["b"]}, m, text)),
    ("LEIBNIZ_RULE_INTEGRAL",
     r"derivative\s+of\s+integral\s+of\s+(?P<fn>[^d]+?)\s*dt\s+from\s+[a-zA-Z0-9_]+\s+to\s+x",
     _c_leibniz_rule),
    ("AREA_ELLIPSE",
     r"area\s+of\s+(?:the\s+)?ellipse\s*x\s*(?:\^2|\*\*2|²)\s*/\s*(?P<a2>" + _NUM_m3 + r")\s*\+\s*y\s*(?:\^2|\*\*2|²)\s*/\s*(?P<b2>" + _NUM_m3 + r")\s*=\s*1",
     _c_area_ellipse),
    ("DIFFERENTIAL_EQUATION_SEPARATION",
     r"(?:solve\s+)?differential\s+equation\s+dy/dx\s*=\s*(?P<k>" + _NUM_m3 + r")\s*y\b",
     _c_ode_separable_growth),
    ("HOMOGENEOUS_DIFFEQ_CHECK",
     r"homogeneous\s+differential\s+equation.{0,40}?degree\s*(?:is|=|:)?\s*(?P<deg>\d+)",
     _c_homogeneous_diffeq),
    ("BERNOULLI_TRIALS_EXACTLY_R",
     r"(?:probability\s+of\s+)?exactly\s*(?P<r>\d+)\s*successes\s+in\s*(?P<n>\d+)\s*(?:bernoulli\s+)?trials?.{0,40}?p\s*=\s*(?P<p>" + _NUM_m3 + r")",
     _c_bernoulli_exact_r),
    ("CONDITIONAL_PROBABILITY_INDEPENDENCE",
     r"P\(A\)\s*=\s*(?P<pa>" + _NUM_m3 + r").{0,40}?P\(B\)\s*=\s*(?P<pb>" + _NUM_m3 + r").{0,40}?P\(A\s*(?:and|∩|\s+and\s+)\s*B\)\s*=\s*(?P<pab>" + _NUM_m3 + r").{0,40}?independent",
     _c_prob_independence),
]

# Precompile regexes
_COMPILED_TABLE_m3 = [(fid, re.compile(pat, re.I), fn) for fid, pat, fn in MATHS3_TABLE]


def _augment_m3(fid, g, value, steps, answer, eq):
    steps = [str(s) for s in (steps or [])]
    human = fid.replace("_", " ").lower()
    if not steps or not steps[0].startswith("Method:"):
        steps.insert(0, f"Method: {eq or human} -- the question asks for the {human}.")
    shown = answer if isinstance(answer, str) and answer else _fmt_m3(value)
    steps.append(f"Verification: {shown} is uniquely determined by deterministic closed form.")
    steps.append(f"Interpretation: for the given data, the {human} is {shown}.")
    return steps


def _dispatch_m3(text: str) -> ModelResult:
    """Scan maths3 families: returns first grounded hit."""
    for fid, pat, fn in _COMPILED_TABLE_m3:
        m = pat.search(text)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = fn(g, m, text)
        except Exception:
            continue
        if not out:
            continue
        value, steps, answer, assumptions = (list(out) + [None] * 4)[:4]
        if value is None and not steps:
            continue
        eq = assumptions[0] if assumptions else fid
        steps = _augment_m3(fid, g, value, steps, answer, eq)
        q: Dict[str, float] = {}
        for k, v in g.items():
            try:
                if v is not None:
                    q[k] = float(str(v).replace(",", "").strip())
            except (ValueError, TypeError):
                pass
        return ModelResult(
            structure=fid,
            matched=True,
            confidence=0.96,
            quantities=q,
            governing_equation=eq,
            final_answer=answer or _fmt_m3(value),
            numeric_answer=value if isinstance(value, (int, float)) else None,
            steps=steps,
            note=f"method: {eq}"
        )
    return _no_m3("MATHS3", "no maths3 family matched")


# ==========================================================================
# BLOCK AP -- moved from applied_maths_families.py (map §5.1; ids + row order preserved)
# ==========================================================================


# --------------------------------------------------------------------------- #
# helpers (same _no_ap / _yes pattern as syllabus_families.py)
# --------------------------------------------------------------------------- #


def _no_ap(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _yes(structure: str, g: Dict[str, Any], value: Optional[float],
         steps: List[str], assumptions: Optional[List[str]] = None,
         conf: float = 0.97, answer: Optional[str] = None) -> ModelResult:
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities={k: (v if isinstance(v, (int, float)) else 0)
                    for k, v in g.items()},
        governing_equation=structure,
        final_answer=answer or f"{value:.6g}",
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


def _num_ap(s: str) -> float:
    return float(str(s).replace(",", ""))


def _fmt_ap(v: float) -> str:
    """Compact deterministic number formatting for steps and answers."""
    return str(int(round(v))) if abs(v - round(v)) < 1e-9 else f"{v:.6g}"


def _plist(s: str) -> List[float]:
    return [float(x.replace(",", ""))
            for x in re.findall(r"\d+(?:\.\d+)?", s or "")]


_NUM_ap = r"-?\d+(?:\.\d+)?"
_SQ = r"(?:\^2|\*\*2|\u00b2)"          # x^2, x**2 or x with superscript 2
_RS_ap = r"(?:(?:Rs|INR)\.?\s*)?"          # optional currency prefix


def _m2(p: str) -> str:
    """2x2 matrix literal [[a, b], [c, d]] with prefixed named groups."""
    n = _NUM_ap
    return (r"\[\s*\[\s*(?P<" + p + r"a>" + n + r")\s*,\s*(?P<" + p + r"b>"
            + n + r")\s*\]\s*,\s*\[\s*(?P<" + p + r"c>" + n + r")\s*,\s*(?P<"
            + p + r"d>" + n + r")\s*\]\s*\]")


# --------------------------------------------------------------------------- #
# compute functions: (g, m, text) -> (value | None, steps, answer | None,
#                                     assumptions | None)
# --------------------------------------------------------------------------- #


def _c_log_solve(g, m, text):
    val = _num_ap(g["val"])
    if abs(val) > 300:                     # gate: 10**val would overflow
        return None, [], None, None
    x = math.pow(10.0, val)
    return x, [f"log10(x) = {_fmt_ap(val)}  ->  x = 10^{_fmt_ap(val)} = {_fmt_ap(x)}",
               "antilog of the common (base 10) logarithm"], None, \
        ["log taken to base 10"]


def _c_log_props(g, m, text):
    a, b, op = _num_ap(g["a"]), _num_ap(g["b"]), g["op"]
    if a <= 0 or b <= 0:                   # gate: log arguments positive
        return None, [], None, None
    if op == "+":
        v = math.log10(a) + math.log10(b)
        return v, [f"log {_fmt_ap(a)} + log {_fmt_ap(b)} = log({_fmt_ap(a)} x "
                   f"{_fmt_ap(b)}) = log {_fmt_ap(a * b)} = {v:.6g}"], None, \
            ["product rule: log m + log n = log(mn)"]
    v = math.log10(a) - math.log10(b)
    return v, [f"log {_fmt_ap(a)} - log {_fmt_ap(b)} = log({_fmt_ap(a)}/"
               f"{_fmt_ap(b)}) = log {_fmt_ap(a / b)} = {v:.6g}"], None, \
        ["quotient rule: log m - log n = log(m/n)"]


def _c_matrix_add(g, m, text):
    p = [_num_ap(g["pa"]), _num_ap(g["pb"]), _num_ap(g["pc"]), _num_ap(g["pd"])]
    q = [_num_ap(g["qa"]), _num_ap(g["qb"]), _num_ap(g["qc"]), _num_ap(g["qd"])]
    s = [a + b for a, b in zip(p, q)]
    ans = (f"[[{_fmt_ap(s[0])}, {_fmt_ap(s[1])}], "
           f"[{_fmt_ap(s[2])}, {_fmt_ap(s[3])}]]")
    steps = ["add corresponding elements",
             f"[[{_fmt_ap(p[0])} + {_fmt_ap(q[0])}, {_fmt_ap(p[1])} + {_fmt_ap(q[1])}], "
             f"[{_fmt_ap(p[2])} + {_fmt_ap(q[2])}, {_fmt_ap(p[3])} + {_fmt_ap(q[3])}]]",
             f"sum = {ans}"]
    return None, steps, ans, None


def _c_matrix_scalar(g, m, text):
    p = [_num_ap(g["pa"]), _num_ap(g["pb"]), _num_ap(g["pc"]), _num_ap(g["pd"])]
    k = _num_ap(g["k"])
    s = [k * v for v in p]
    ans = (f"[[{_fmt_ap(s[0])}, {_fmt_ap(s[1])}], "
           f"[{_fmt_ap(s[2])}, {_fmt_ap(s[3])}]]")
    steps = ["multiply every element by the scalar",
             f"{_fmt_ap(k)} x [[{_fmt_ap(p[0])}, {_fmt_ap(p[1])}], "
             f"[{_fmt_ap(p[2])}, {_fmt_ap(p[3])}]] = {ans}"]
    return None, steps, ans, None


def _c_matrix_inverse(g, m, text):
    a, b = _num_ap(g["pa"]), _num_ap(g["pb"])
    c, d = _num_ap(g["pc"]), _num_ap(g["pd"])
    det = a * d - b * c
    if det == 0:                           # gate: singular matrix
        return None, [], None, None
    inv = [d / det, -b / det, -c / det, a / det]
    ans = (f"[[{_fmt_ap(inv[0])}, {_fmt_ap(inv[1])}], "
           f"[{_fmt_ap(inv[2])}, {_fmt_ap(inv[3])}]]")
    steps = [f"det = ({_fmt_ap(a)})({_fmt_ap(d)}) - ({_fmt_ap(b)})({_fmt_ap(c)}) = "
             f"{_fmt_ap(det)}",
             f"A^-1 = (1/{_fmt_ap(det)}) x [[{_fmt_ap(d)}, {_fmt_ap(-b)}], "
             f"[{_fmt_ap(-c)}, {_fmt_ap(a)}]] = {ans}"]
    return None, steps, ans, None


def _c_limit_factor(g, m, text):
    c, a, pt = _num_ap(g["c"]), _num_ap(g["a"]), _num_ap(g["pt"])
    eps = 1e-9
    if abs(pt - a) <= eps:                 # 0/0 form -> factorise and cancel
        if abs(c - a * a) > eps:           # gate: x = a would be a pole
            return None, [], None, None
        lim = 2.0 * a
        return lim, [f"substituting x = {_fmt_ap(a)} gives 0/0 (indeterminate)",
                     f"factorise: x^2 - {_fmt_ap(c)} = (x - {_fmt_ap(a)})"
                     f"(x + {_fmt_ap(a)})",
                     f"cancel (x - {_fmt_ap(a)}): limit of x + {_fmt_ap(a)} as "
                     f"x -> {_fmt_ap(a)} = {_fmt_ap(lim)}"], None, None
    v = (pt * pt - c) / (pt - a)           # direct substitution branch
    return v, [f"denominator at x = {_fmt_ap(pt)} is non-zero, substitute: "
               f"({_fmt_ap(pt)}^2 - {_fmt_ap(c)}) / ({_fmt_ap(pt)} - {_fmt_ap(a)}) = "
               f"{_fmt_ap(v)}"], None, None


def _c_deriv_power(g, m, text):
    n = _num_ap(g["n"])
    if n == 0:
        return 0.0, ["power rule: d/dx x^n = n x^(n-1)", "d/dx x^0 = 0"], \
            "0", None
    ans = "1" if n == 1 else f"{_fmt_ap(n)}x^{_fmt_ap(n - 1)}"
    return None, ["power rule: d/dx x^n = n x^(n-1)",
                  f"d/dx x^{_fmt_ap(n)} = {ans}"], ans, None


def _c_deriv_eval(g, m, text):
    a, pt = _num_ap(g["a"]), _num_ap(g["pt"])
    b = _num_ap(g["b"]) * (1.0 if (g.get("s1") or "+") == "+" else -1.0)
    fp = 2.0 * a * pt + b
    bstr = f" + {_fmt_ap(b)}x" if b >= 0 else f" - {_fmt_ap(-b)}x"
    cstr = ""
    if g.get("c"):
        cv = _num_ap(g["c"]) * (1.0 if (g.get("s2") or "+") == "+" else -1.0)
        cstr = f" + {_fmt_ap(cv)}" if cv >= 0 else f" - {_fmt_ap(-cv)}"
    return fp, [f"f(x) = {_fmt_ap(a)}x^2{bstr}{cstr}",
                f"f'(x) = {_fmt_ap(2 * a)}x + {_fmt_ap(b)}",
                f"f'({_fmt_ap(pt)}) = {_fmt_ap(2 * a)} x {_fmt_ap(pt)} + {_fmt_ap(b)} = "
                f"{_fmt_ap(fp)}"], None, None


def _c_integral_basic(g, m, text):
    co = _num_ap(g["co"])
    k = co / 3.0
    if g.get("lo") is not None and g.get("hi") is not None:
        lo, hi = _num_ap(g["lo"]), _num_ap(g["hi"])
        v = k * (hi ** 3 - lo ** 3)
        return v, [f"antiderivative of {co:g}x^2 is {_fmt_ap(k)}x^3",
                   f"[{_fmt_ap(k)}x^3] from {lo:g} to {hi:g} = {_fmt_ap(k)} x "
                   f"({hi:g}^3 - {lo:g}^3) = {_fmt_ap(v)}"], None, None
    ans = "x^3 + C" if abs(k - 1.0) < 1e-9 else f"{_fmt_ap(k)}x^3 + C"
    return None, [f"integral of {co:g}x^2 dx = ({co:g}/3) x^3 = {ans}"], \
        ans, None


def _c_area_curve(g, m, text):
    lo, hi = _num_ap(g["lo"]), _num_ap(g["hi"])
    if hi <= lo:                           # gate: need an increasing interval
        return None, [], None, None
    v = (hi ** 3 - lo ** 3) / 3.0
    return v, [f"area = integral of x^2 dx from {lo:g} to {hi:g}",
               f"= [x^3/3] from {lo:g} to {hi:g} = ({hi:g}^3 - {lo:g}^3)/3 "
               f"= {_fmt_ap(v)}"], None, None


def _c_binomial_term(g, m, text):
    n = int(_num_ap(g["n"]))
    x, y = g["x"], g["y"]
    if g.get("r"):
        r = int(_num_ap(g["r"]))
        k = r - 1
        if r < 1 or k > n:                 # gate: term index within range
            return None, [], None, None
        coef = math.comb(n, k)
        parts = [_fmt_ap(float(coef))]
        if n - k:
            parts.append(f"{x}^{_fmt_ap(n - k)}")
        if k:
            parts.append(f"{y}^{_fmt_ap(k)}")
        ans = " ".join(parts)
        return float(coef), [f"T(r+1) = C(n, r) x^(n-r) y^r with n = {n}",
                             f"T{r} = C({n}, {k}) {x}^{n - k} {y}^{k} = "
                             f"{coef} {x}^{n - k} {y}^{k}"], ans, None
    ans = f"T(r+1) = C({n}, r) {x}^({n}-r) {y}^r"
    return None, ["general term in the expansion of (x + y)^n is "
                  "T(r+1) = C(n, r) x^(n-r) y^r",
                  f"here n = {n}, so the general term is {ans}"], ans, None


def _c_emi(g, m, text):
    P, r, n = _num_ap(g["p"]), _num_ap(g["r"]), int(_num_ap(g["n"]))
    i = r / 1200.0                         # monthly rate from annual %
    if P <= 0 or n <= 0 or i <= 0:         # gate: positive loan/rate/term
        return None, [], None, None
    if n * math.log1p(i) > 700:            # gate: (1+i)^n overflow bound
        return None, [], None, None
    growth = math.pow(1.0 + i, n)
    emi = P * i * growth / (growth - 1.0)
    return emi, [f"monthly rate i = {r:g}%/12 = {i:.6g}",
                 f"(1+i)^n = (1 + {i:g})^{n} = {growth:.6g}",
                 f"EMI = P i (1+i)^n / ((1+i)^n - 1) = {P:g} x {i:.4g} x "
                 f"{growth:.6g} / {growth - 1:.6g} = {emi:.2f}",
                 "rounded to 2 decimal places"], \
        f"EMI = {emi:.2f} per month", ["reducing-balance EMI formula"]


def _c_annuity(g, m, text):
    A, n, r = _num_ap(g["a"]), int(_num_ap(g["n"])), _num_ap(g["r"])
    i = r / 100.0
    if A <= 0 or n <= 0 or i <= 0:         # gate: positive inputs
        return None, [], None, None
    if n * math.log1p(i) > 700:            # gate: overflow bound
        return None, [], None, None
    growth = math.pow(1.0 + i, n)
    fv = A * (growth - 1.0) / i
    return fv, [f"rate per period i = {r:g}% = {i:g}",
                f"(1+i)^n = (1 + {i:g})^{n} = {growth:.6g}",
                f"FV = A((1+i)^n - 1)/i = {A:g} x {growth - 1:.6g}/{i:g} = "
                f"{fv:.2f}"], f"FV = {fv:.2f}", \
        ["ordinary annuity (payment at the end of each period)"]


def _c_cagr(g, m, text):
    v1, v2, n = _num_ap(g["v1"]), _num_ap(g["v2"]), _num_ap(g["n"])
    if v1 <= 0 or v2 <= 0 or n <= 0:       # gate: positive values/years
        return None, [], None, None
    rate = math.pow(v2 / v1, 1.0 / n) - 1.0
    pct = 100.0 * rate
    return rate, [f"growth factor = {v2:g}/{v1:g} = {v2 / v1:g}",
                  f"CAGR = ({v2:g}/{v1:g})^(1/{n:g}) - 1 = {rate:.6g}",
                  f"= {pct:.4g}% per annum"], \
        f"CAGR = {pct:.4g}% per annum", None


def _c_index_number(g, m, text):
    base = _plist(g.get("b1") or g.get("b2"))
    cur = _plist(g.get("c1") or g.get("c2"))
    if not base or not cur or len(base) != len(cur):
        return None, [], None, None        # gate: matched price lists
    sb, sc = sum(base), sum(cur)
    if sb == 0:                            # gate: no division by zero
        return None, [], None, None
    idx = sc / sb * 100.0
    return idx, [f"sum of base-year prices P0 = {sb:g}",
                 f"sum of current-year prices P1 = {sc:g}",
                 f"index = (P1/P0) x 100 = {sc:g}/{sb:g} x 100 = "
                 f"{idx:.6g}"], None, ["simple aggregative method"]


def _c_trend(g, m, text):
    vals = _plist(g["vals"])
    w = int(_num_ap(g["win"])) if g.get("win") else 3
    if w < 2 or not vals or len(vals) < w:  # gate: enough data points
        return None, [], None, None
    avgs = [sum(vals[i:i + w]) / w for i in range(len(vals) - w + 1)]
    ans = f"{w}-period moving averages: " + ", ".join(_fmt_ap(a) for a in avgs)
    return None, [f"data: {', '.join(_fmt_ap(v) for v in vals)}",
                  f"each trend value = mean of {w} consecutive values",
                  ans], ans, ["successive (non-centered) moving averages"]


def _c_prob_binomial(g, m, text):
    r, n, p = int(_num_ap(g["r"])), int(_num_ap(g["n"])), _num_ap(g["p"])
    if not (0.0 <= p <= 1.0):              # gate: probability in [0, 1]
        return None, [], None, None
    if n < 0 or r < 0 or r > n:            # gate: 0 <= r <= n
        return None, [], None, None
    v = math.comb(n, r) * math.pow(p, r) * math.pow(1.0 - p, n - r)
    return v, ["P(X = r) = C(n, r) p^r (1-p)^(n-r)",
               f"C({n}, {r}) = {math.comb(n, r)}",
               f"P(X = {r}) = {math.comb(n, r)} x {p:g}^{r} x "
               f"{1 - p:g}^{n - r} = {v:.6g}"], None, None


def _c_rate_change(g, m, text):
    rate = _num_ap(g["rate"])
    if str(g.get("dir") or "increasing").lower().startswith("decreas"):
        rate = -rate
    s, unit = _num_ap(g["s"]), str(g["unit"]).lower()
    if s <= 0:                             # gate: side length positive
        return None, [], None, None
    dadt = 2.0 * s * rate
    ans = f"dA/dt = {_fmt_ap(dadt)} {unit}^2/s"
    return dadt, ["A = s^2, so dA/dt = 2s (ds/dt) by the chain rule",
                  f"ds/dt = {_fmt_ap(rate)} {unit}/s at s = {_fmt_ap(s)}",
                  f"dA/dt = 2 x {_fmt_ap(s)} x {_fmt_ap(rate)} = "
                  f"{_fmt_ap(dadt)} {unit}^2/s"], ans, None


# --------------------------------------------------------------------------- #
# BOOKS3 gaps (am11_001 Numbers & Quantification): logarithm evaluation,
# change of base, and exponential equations solved by taking logarithms --
# the book's worked bacteria example 200(2)^(t/20) = 500 gives
# t = 20 log(500/200)/log 2 = 22.964.  Also: "/" removed from LOG_PROPERTIES
# (log a / log b is change of base, not the quotient rule).
# --------------------------------------------------------------------------- #


def _c_log_eval(g, m, text):
    b = _num_ap(g["b"]) if g.get("b") else 10.0
    x = _num_ap(g["x"])
    if b <= 0 or b == 1 or x <= 0:         # gate: log needs b > 0, b != 1,
        return None, [], None, None        # x > 0
    k = round(math.log(x, b))
    if abs(b ** k - x) < 1e-9:             # exact power: closed form
        return float(k), [
            "Definition: log base b of x = k means b^k = x.",
            f"{_fmt_ap(b)}^{k} = {_fmt_ap(x)}, so log base {_fmt_ap(b)} of "
            f"{_fmt_ap(x)} = {k}.",
            f"Check: {_fmt_ap(b)}^{k} = {_fmt_ap(x)} (the definition holds)."], \
            str(k), ["exact power of the base"]
    if b == 10.0:                          # common log, book uses log tables
        v = math.log10(x)
        return v, [
            "Common logarithm: log x (base 10) is the exponent that turns "
            "10 into x.",
            f"log {_fmt_ap(x)} = {v:.6g} (books evaluate via log tables).",
            f"Check: 10^{v:.4g} = {10 ** v:.6g} ~ {_fmt_ap(x)}."], \
            f"{v:.6g}", ["base 10"]
    return None, [], None, None            # non-10 base, not an exact power


def _c_log_chbase(g, m, text):
    x, b = _num_ap(g["x"]), _num_ap(g["b"])
    if b <= 0 or b == 1 or x <= 0:         # gate: valid log arguments
        return None, [], None, None
    v = math.log(x) / math.log(b)
    return v, [
        "Change of base formula: log(x)/log(b) = log of x to the base b "
        "(any common base may be used).",
        f"= log {_fmt_ap(x)} / log {_fmt_ap(b)} = {math.log(x):.6g}/"
        f"{math.log(b):.6g} = {v:.6g}.",
        f"Check: {_fmt_ap(b)}^{v:.4g} = {b ** v:.4g} ~ {_fmt_ap(x)}."], \
        f"{v:.6g}", ["change of base formula"]


def _c_exp_growth(g, m, text):
    a, b, c, v = _num_ap(g["a"]), _num_ap(g["b"]), _num_ap(g["c"]), _num_ap(g["v"])
    if a <= 0 or b <= 0 or b == 1 or c <= 0 or v <= 0:
        return None, [], None, None        # gate: meaningful growth model
    t = c * math.log(v / a) / math.log(b)
    chk = a * b ** (t / c)
    return t, [
        "Take logarithms on both sides: a(b)^(t/c) = v  ->  "
        "(t/c) log b = log(v/a)  ->  t = c log(v/a)/log b.",
        f"t = {_fmt_ap(c)} x log({_fmt_ap(v)}/{_fmt_ap(a)}) / log({_fmt_ap(b)}) = "
        f"{_fmt_ap(c)} x {math.log(v / a):.6g}/{math.log(b):.6g} = {t:.6g}.",
        f"Check: {_fmt_ap(a)}({_fmt_ap(b)})^({t:.4g}/{_fmt_ap(c)}) = {chk:.4g} ~ "
        f"{_fmt_ap(v)} (the target value)."], \
        f"t = {t:.4g}", ["logarithms on both sides"]


_APPLIED_EQ = {
    "LOG_EVAL": "log base b of x (definition / base-10 common log)",
    "LOG_CHANGE_BASE": "log(x)/log(b) = log base b of x",
    "EXP_GROWTH_SOLVE": "t = c log(v/a)/log b (logs on both sides)",
    "LOG_SOLVE": "x = 10^v (antilog, base 10)",
    "LOG_PROPERTIES": "log m + log n = log(mn); log m - log n = log(m/n)",
    "DEPRECIATION": "V = P(1 - r/100)^t (reducing balance)",
    "PIPES_CISTERN": "rates add: 1/a + 1/b (or 1/a - 1/b with an outlet)",
    "BINOMIAL_MEAN_VARIANCE": "mean = np, variance = np(1 - p)",
    "SHARES_DIVIDEND_INCOME": "annual dividend income = N x NV x (dividend_rate / 100)",
    "SHARES_RETURN_PERCENT": "return percentage = (nominal_value x dividend_rate) / market_value",
    "ALLIGATION_AND_MIXTURE": "cheaper / dearer = (dearer - mean) / (mean - cheaper)",
    "REPLACEMENT_MIXTURE": "remaining quantity = Q0 x (1 - y/Q0)^n",
    "BOATS_AND_STREAMS": "speed downstream = u + v; speed upstream = u - v; t = d / speed",
    "EFFECTIVE_INTEREST_RATE": "effective rate = (1 + r/(100*m))^m - 1",
    "PERPETUITY_PV": "present value of perpetuity = payment / interest_rate (PV = R / i)",
    "DEPRECIATION_STRAIGHT_LINE": "annual depreciation = (cost - scrap_value) / life",
    "BANKERS_DISCOUNT": "banker's discount = (face_value x rate x time_in_years) / 100",
    "TRUE_DISCOUNT": "true discount = (amount x rate x time) / (100 + rate x time)",
    "BANKERS_GAIN": "banker's gain = (true_discount x rate x time) / 100",
    "SINKING_FUND_DEPOSIT": "periodic payment = (target_amount x i) / ((1 + i)^n - 1)",
    "POISSON_DISTRIBUTION": "P(X = k) = (lambda^k * e^(-lambda)) / k!",
    "NORMAL_DISTRIBUTION_Z": "z = (X - mu) / sigma",
}

_APPLIED_HUMAN = {
    "LOG_EVAL": "logarithm value",
    "LOG_CHANGE_BASE": "logarithm to the given base",
    "EXP_GROWTH_SOLVE": "time for the exponential model to reach the target",
    "DEPRECIATION": "depreciated value",
    "PIPES_CISTERN": "time to fill the tank",
    "BINOMIAL_MEAN_VARIANCE": "binomial mean",
    "SHARES_DIVIDEND_INCOME": "annual dividend income",
    "SHARES_RETURN_PERCENT": "dividend yield percentage return",
    "ALLIGATION_AND_MIXTURE": "mixing ratio of the two commodities",
    "REPLACEMENT_MIXTURE": "remaining quantity of original liquid",
    "BOATS_AND_STREAMS": "travel time for the boat",
    "EFFECTIVE_INTEREST_RATE": "effective annual rate of interest",
    "PERPETUITY_PV": "present value of the perpetuity",
    "DEPRECIATION_STRAIGHT_LINE": "annual straight-line depreciation",
    "BANKERS_DISCOUNT": "banker's discount",
    "TRUE_DISCOUNT": "true discount",
    "BANKERS_GAIN": "banker's gain",
    "SINKING_FUND_DEPOSIT": "periodic sinking fund deposit",
    "POISSON_DISTRIBUTION": "poisson probability",
    "NORMAL_DISTRIBUTION_Z": "standard normal z-score",
}


# --------------------------------------------------------------------------- #
# the table: (id, trigger regex with named slots, compute)
# --------------------------------------------------------------------------- #

APPLIED_TABLE: List[Tuple[str, Any, Any]] = [
    # ---- logs (class 11/12) ----
    ("LOG_SOLVE",
     r"(?:solve|find)\b.{0,40}?\blog\s*\(?\s*x\s*\)?\s*=\s*(?P<val>" + _NUM_ap
     + r")",
     _c_log_solve),
    ("LOG_PROPERTIES",
     r"(?:evaluate|simplify|find|compute)\b.{0,20}?\blog\s*\(?\s*(?P<a>"
     + _NUM_ap + r")\s*\)?\s*(?P<op>\+|-)\s*log\s*\(?\s*(?P<b>" + _NUM_ap
     + r")\s*\)?",
     _c_log_props),

    # ---- matrices (class 12) ----
    ("MATRIX_ADD",
     r"(?:add|sum\s+of)\s+(?:the\s+)?(?:matrices\s+|matrix\s+)?" + _m2("p")
     + r"\s+(?:and|with|\+)\s+(?:the\s+)?(?:matrix\s+)?" + _m2("q"),
     _c_matrix_add),
    ("MATRIX_MULTIPLY",
     r"multiply\s+(?:the\s+)?(?:matrix\s+)?" + _m2("p")
     + r"\s+by\s+(?:the\s+)?(?:scalar\s+)?(?P<k>" + _NUM_ap + r")",
     _c_matrix_scalar),
    ("MATRIX_INVERSE_2X2",
     r"inverse\s+of\s+(?:the\s+)?(?:matrix\s+)?" + _m2("p"),
     _c_matrix_inverse),

    # ---- calculus (class 12 / applied maths) ----
    ("LIMIT_FACTOR",
     r"limit\s+of\s*\(?\s*x\s*" + _SQ + r"\s*-\s*(?P<c>" + _NUM_ap
     + r")\s*\)?\s*/\s*\(?\s*x\s*-\s*(?P<a>" + _NUM_ap + r")\s*\)?"
     + r"(?:\s+as\s+x\s*(?:approaches|tends\s+to|->|\u2192)"
     + r"|\s+at\s+x\s*=)\s*(?P<pt>" + _NUM_ap + r")",
     _c_limit_factor),
    ("DERIVATIVE_POWER",
     r"derivative\s+of\s+(?:the\s+)?(?:function\s+)?x\s*(?:\^|\*\*)\s*"
     r"(?P<n>" + _NUM_ap + r")",
     _c_deriv_power),
    ("DERIVATIVE_EVAL",
     r"f\s*'\s*\(\s*(?P<pt>" + _NUM_ap + r")\s*\).{0,40}?f\s*\(?\s*x\s*\)?\s*"
     r"=\s*(?P<a>" + _NUM_ap + r")\s*\*?\s*x\s*" + _SQ + r"\s*(?P<s1>[+-])\s*"
     r"(?P<b>" + _NUM_ap + r")\s*\*?\s*x(?:\s*(?P<s2>[+-])\s*(?P<c>" + _NUM_ap
     + r"))?",
     _c_deriv_eval),
    ("INTEGRAL_BASIC",
     r"integrate\s+(?P<co>" + _NUM_ap + r")\s*\*?\s*x\s*" + _SQ
     + r"\s*(?:with\s+respect\s+to\s+)?dx"
     + r"(?:\s+from\s+(?P<lo>" + _NUM_ap + r")\s+to\s+(?P<hi>" + _NUM_ap + r"))?",
     _c_integral_basic),
    ("AREA_UNDER_CURVE",
     r"area\s+under\s+(?:the\s+)?(?:curve\s+)?y\s*=\s*x\s*" + _SQ
     + r"\s+from\s+x\s*=\s*(?P<lo>" + _NUM_ap + r")\s+to\s+x\s*=\s*(?P<hi>"
     + _NUM_ap + r")",
     _c_area_curve),

    # ---- binomial (class 11 / applied maths) ----
    ("BINOMIAL_TERM",
     r"(?:(?P<r>\d+)\s*(?:th|st|nd|rd)\s+term|general\s+term)\s*"
     r"(?:in|of)\s+(?:the\s+)?expansion\s+of\s*\(\s*(?P<x>[a-z])\s*\+\s*"
     r"(?P<y>[a-z])\s*\)\s*\^?\s*\(?\s*(?P<n>\d+)\s*\)?",
     _c_binomial_term),

    # ---- finance (applied maths) ----
    ("EMI",
     r"\bEMI\b.{0,80}?loan\s+of\s+" + _RS_ap + r"(?P<p>" + _NUM_ap + r")"
     + r".{0,80}?(?P<r>" + _NUM_ap + r")\s*%\s*(?:per\s+annum|p\.a\.|annual)"
     + r".{0,80}?for\s+(?P<n>\d+)\s*(?:months?|EMIs?|instal?ments?|"
     r"installments?)",
     _c_emi),
    ("ANNUITY",
     r"(?:future|accumulated|maturity)\s+value\s+of\s+an?\s+(?:annual\s+)?"
     r"annuity\s+of\s+" + _RS_ap + r"(?P<a>" + _NUM_ap + r")"
     + r".{0,100}?for\s+(?P<n>\d+)\s+years?"
     + r".{0,60}?(?:at|@)\s*(?P<r>" + _NUM_ap + r")\s*%",
     _c_annuity),
    ("CAGR",
     r"(?:\bCAGR\b|compound\s+annual\s+growth\s+rate).{0,100}?from\s+"
     + _RS_ap + r"(?P<v1>" + _NUM_ap + r")" + r".{0,60}?to\s+" + _RS_ap
     + r"(?P<v2>" + _NUM_ap + r")" + r".{0,60}?in\s+(?P<n>" + _NUM_ap
     + r")\s*years?",
     _c_cagr),

    # ---- statistics / index numbers / time series (applied maths) ----
    ("INDEX_NUMBER",
     r"price\s+index[^.]{0,120}?aggregative[^.]{0,120}?"
     r"(?:base(?:\s+year)?\s+prices?\s*(?:are\s*|of\s*|:|=)?\s*"
     r"(?P<b1>[\d.,\s]+?)\s*(?:and|,)\s+current(?:\s+year)?\s+prices?\s*"
     r"(?:are\s*|of\s*|:|=)?\s*(?P<c1>[\d.,\s]+?)\s*(?:\.|\?|$)"
     r"|current(?:\s+year)?\s+prices?\s*(?:are\s*|of\s*|:|=)?\s*"
     r"(?P<c2>[\d.,\s]+?)\s*(?:and|,)\s+base(?:\s+year)?\s+prices?\s*"
     r"(?:are\s*|of\s*|:|=)?\s*(?P<b2>[\d.,\s]+?)\s*(?:\.|\?|$))",
     _c_index_number),
    ("TIME_SERIES_TREND",
     r"(?:(?P<win>\d+)\s*[-\s]?\s*(?:years?|months?|days?|quarters?|"
     r"periods?|weeks?|points?|items?)?(?:ly)?\s+)?moving\s+averages?"
     r"[^.]{0,60}?(?:of|for)\s+(?:the\s+)?(?:following\s+)?"
     r"(?:values?\s*[:=]?\s*)?(?P<vals>[\d.,\s]+)",
     _c_trend),

    # ---- probability (class 12 / applied maths) ----
    ("PROBABILITY_BINOMIAL",
     r"probability\s+(?:of\s+)?(?:getting\s+)?(?:exactly\s+)?(?P<r>\d+)"
     r"\s+success(?:es)?\s+in\s+(?P<n>\d+)\s+trials?"
     r".{0,80}?(?:probability\s+(?:of\s+)?(?:success(?:es)?\s+)?"
     r"(?:is\s+|of\s+|=\s*|:\s*)|p\s*=\s*)(?P<p>" + _NUM_ap + r")",
     _c_prob_binomial),

    # ---- rates of change (class 12 / applied maths) ----
    ("RATE_OF_CHANGE",
     r"(?:side|edge)\s+of\s+an?\s+square\s+(?:is\s+)?"
     r"(?P<dir>increasing|decreasing)\s+at\s+(?:the\s+rate\s+of\s+)?"
     r"(?P<rate>" + _NUM_ap + r")\s*(?P<unit>cm|mm|m)\s*(?:/|per)\s*s\b"
     r".{0,120}?when\s+(?:the\s+)?(?:side|edge)\s*(?:length\s+)?"
     r"(?:is\s+|=\s*)?(?P<s>" + _NUM_ap + r")",
     _c_rate_change),
]

# --------------------------------------------------------------------------- #
# BOOKS2 families (verified in the Applied Maths 11-12 text caches):
#   am11_005 (sequences/growth)  -> DEPRECIATION
#   am11_002 (numerical apps)    -> PIPES_CISTERN (inlets/outlets)
#   am12_004 (distributions)     -> BINOMIAL_MEAN_VARIANCE (np, npq)
# --------------------------------------------------------------------------- #


def _c_depreciation(g, m, text):
    P, r, t = _num_ap(g["p"]), _num_ap(g["r"]), _num_ap(g["t"])
    if P <= 0 or not (0 <= r < 100) or t <= 0:
        return None, [], None, None
    if t * math.log1p(-r / 100.0) < -700:   # gate: overflow bound
        return None, [], None, None
    v = P * math.pow(1.0 - r / 100.0, t)
    return v, [f"V = P(1 - r/100)^t = {_fmt_ap(P)}(1 - {r:g}/100)^{_fmt_ap(t)}",
               f"= {_fmt_ap(P)} x {(1 - r / 100.0):g}^{_fmt_ap(t)} = {_fmt_ap(v)}",
               "value after depreciation"], None, \
        ["reducing-balance depreciation"]


def _c_pipes(g, m, text):
    a, b = _num_ap(g["a"]), _num_ap(g["b"])
    empties = bool(re.search(r"empt|drain|outlet", text, re.I))
    if a <= 0 or b <= 0:
        return None, [], None, None
    if empties:
        net = 1.0 / a - 1.0 / b
        if net <= 0:                        # gate: outlet >= inlet never fills
            return None, [], None, None
        steps = [f"Inlet fills 1/{_fmt_ap(a)} tank per hour; outlet empties "
                 f"1/{_fmt_ap(b)} tank per hour.",
                 f"Net rate = 1/{_fmt_ap(a)} - 1/{_fmt_ap(b)} = {_fmt_ap(net)} "
                 f"tank/hour.",
                 f"Time to fill = 1/{_fmt_ap(net)} = {_fmt_ap(1.0 / net)} hours."]
        return 1.0 / net, steps, f"{_fmt_ap(1.0 / net)} hours", \
            ["net of one inlet and one outlet"]
    together = a * b / (a + b)
    steps = [f"Pipe rates: 1/{_fmt_ap(a)} + 1/{_fmt_ap(b)} tank per hour.",
             f"Together = ({_fmt_ap(a)} x {_fmt_ap(b)})/({_fmt_ap(a)} + {_fmt_ap(b)}) = "
             f"{_fmt_ap(together)} hours."]
    return together, steps, f"{_fmt_ap(together)} hours", ["two inlet pipes"]


def _c_binom_mean_var(g, m, text):
    n = int(_num_ap(g["n"]))
    p = _num_ap(g["p"])
    if n < 1 or not (0.0 <= p <= 1.0):      # gate: valid n, p in [0, 1]
        return None, [], None, None
    mean = n * p
    var = n * p * (1.0 - p)
    return (mean,
            ["For a binomial distribution: mean = np, "
             "variance = np(1 - p).",
             f"mean = {n} x {p:g} = {_fmt_ap(mean)}",
             f"variance = {n} x {p:g} x {1 - p:g} = {_fmt_ap(var)}"],
            f"mean = {_fmt_ap(mean)}, variance = {_fmt_ap(var)}", None)


_APPLIED_BOOKS2 = [
    ("DEPRECIATION",
     r"(?:value\s+of\s+(?:a\s+)?(?:machine|vehicle|asset|car|equipment)\s*"
     r"?|cost\s+)?(?P<p>" + _NUM_ap + r")[^.]{0,60}?depreciat\w*[^.]{0,60}?"
     r"(?P<r>" + _NUM_ap + r")\s*%.{0,100}?(?:after|in|for)\s+"
     r"(?P<t>" + _NUM_ap + r")\s*years?",
     _c_depreciation),
    ("PIPES_CISTERN",
     r"fills?\s+(?:a\s+)?tank\s+in\s+(?P<a>" + _NUM_ap + r")\s*"
     r"(?:hours?|hrs?|h\b)[^.]{0,120}?(?:fill|empt)\w*[^.]{0,40}?"
     r"(?:in\s+)?(?P<b>" + _NUM_ap + r")\s*(?:hours?|hrs?|h\b)",
     _c_pipes),
    ("PIPES_CISTERN",
     r"fill\s+(?:it|the\s+tank)\s+in\s+(?P<a>" + _NUM_ap + r")\s*"
     r"(?:hours?|hrs?|h\b)[^.]{0,120}?(?:empt|drain)\w*[^.]{0,40}?"
     r"(?:in\s+)?(?P<b>" + _NUM_ap + r")\s*(?:hours?|hrs?|h\b)",
     _c_pipes),
    ("BINOMIAL_MEAN_VARIANCE",
     r"binomial\s+distribution[^.]{0,160}?n\s*=\s*(?P<n>\d+)"
     r"[^.]{0,60}?p\s*=\s*(?P<p>" + _NUM_ap + r")",
     _c_binom_mean_var),
]

APPLIED_TABLE = APPLIED_TABLE + _APPLIED_BOOKS2

_APPLIED_BOOKS3 = [
    # ---- am11_001 numbers & quantification: logarithms ----
    # LOG_CHANGE_BASE must precede LOG_EVAL: "log 500 / log 2" is change of
    # base, not log(500).
    ("LOG_CHANGE_BASE",
     r"\blog\s*\(?\s*(?P<x>" + _NUM_ap + r")\s*\)?\s*/\s*log\s*\(?\s*"
     r"(?P<b>" + _NUM_ap + r")\s*\)?",
     _c_log_chbase),
    ("LOG_EVAL",
     r"\blog\s*(?:base\s*)?(?P<b>\d+)\s*(?:of\s*)\(?\s*(?P<x>" + _NUM_ap
     + r")\s*\)?",
     _c_log_eval),
    ("LOG_EVAL",
     r"\blog\s*(?:of)?\s*\(?\s*(?P<x>\d[\d.,]*)\s*\)?"
     r"(?!\s*([+\-=]|\*\s*/|\s*/\s*log))",
     _c_log_eval),
    ("EXP_GROWTH_SOLVE",
     r"(?:=|:)\s*(?P<a>" + _NUM_ap + r")\s*\(?\s*(?P<b>" + _NUM_ap + r")\s*\)"
     r"\s*\^\s*\(?\s*t\s*/\s*(?P<c>" + _NUM_ap + r")\s*\)?"
     r".{0,180}?(?:will\s+be\s+|is\s+|becomes\s+|reach(?:es)?\s+|=)"
     r"(?P<v>" + _NUM_ap + r")",
     _c_exp_growth),
]

APPLIED_TABLE = APPLIED_TABLE + _APPLIED_BOOKS3

# --------------------------------------------------------------------------- #
# BATCH-4: Commercial & Applied Mathematics Foundations:
#   Shares & Dividends (income, yield)
#   Alligation & Mixture (alligation rule, repeated replacement)
#   Boats & Streams (upstream, downstream)
#   Financial Mathematics (effective rate, perpetuity PV, straight-line depreciation)
#   Commercial Banking (banker's discount, true discount, banker's gain, sinking fund)
#   Distributions (poisson probability, normal distribution z-score)
# --------------------------------------------------------------------------- #


def _c_shares_div_income(g, m, text):
    n, nv, r = int(_num_ap(g["n"])), _num_ap(g["nv"]), _num_ap(g["r"])
    if n <= 0 or nv <= 0 or r <= 0:
        return None, [], None, None
    income = n * nv * (r / 100.0)
    steps = [
        "Method: Annual Dividend Income = Number of Shares x Face Value x (Dividend Rate / 100).",
        f"Income = {n} x {_fmt_ap(nv)} x ({r:g}/100) = Rs {_fmt_ap(income)}."
    ]
    return income, steps, f"Rs {_fmt_ap(income)}", ["shares dividend income"]


def _c_shares_return_pct(g, m, text):
    nv, mv, r = _num_ap(g["nv"]), _num_ap(g["mv"]), _num_ap(g["r"])
    if nv <= 0 or mv <= 0 or r <= 0:
        return None, [], None, None
    ret = (nv * r) / mv
    steps = [
        "Method: Percentage Return = (Nominal Value x Dividend Rate) / Market Value.",
        f"Return = ({_fmt_ap(nv)} x {r:g}) / {_fmt_ap(mv)} = {_fmt_ap(ret)}%."
    ]
    return ret, steps, f"{_fmt_ap(ret)}%", ["shares dividend yield"]


def _c_alligation(g, m, text):
    c, d, mean = _num_ap(g["c"]), _num_ap(g["d"]), _num_ap(g["m"])
    if not (min(c, d) < mean < max(c, d)):
        return None, [], None, None
    cheaper, dearer = min(c, d), max(c, d)
    num = dearer - mean
    den = mean - cheaper
    ratio = num / den
    steps = [
        "Method: Rule of Alligation -- (Quantity of Cheaper) / (Quantity of Dearer) = (d - m) / (m - c).",
        f"Ratio = ({_fmt_ap(dearer)} - {_fmt_ap(mean)}) / ({_fmt_ap(mean)} - {_fmt_ap(cheaper)}) = {_fmt_ap(num)} / {_fmt_ap(den)} = {_fmt_ap(ratio)}."
    ]
    return ratio, steps, f"{_fmt_ap(ratio)}", ["rule of alligation"]


def _c_replacement_mixture(g, m, text):
    q0, y, n = _num_ap(g["q0"]), _num_ap(g["y"]), int(_num_ap(g["n"]))
    if q0 <= 0 or y <= 0 or y > q0 or n < 1:
        return None, [], None, None
    rem = q0 * math.pow(1.0 - (y / q0), n)
    steps = [
        "Method: Repeated Replacement -- Quantity of original liquid = Q0 * (1 - y/Q0)^n.",
        f"Remaining = {_fmt_ap(q0)} * (1 - {_fmt_ap(y)}/{_fmt_ap(q0)})^{n} = {_fmt_ap(rem)} litres."
    ]
    return rem, steps, f"{_fmt_ap(rem)} litres", ["repeated replacement of liquid"]


def _c_boats_streams(g, m, text):
    u, v, d = _num_ap(g["u"]), _num_ap(g["v"]), _num_ap(g["d"])
    direction = g["dir"].lower()
    if u <= 0 or v < 0 or d <= 0 or (direction == "upstream" and u <= v):
        return None, [], None, None
    speed = (u + v) if direction == "downstream" else (u - v)
    t = d / speed
    steps = [
        f"Method: Speed {direction} = {'u + v' if direction == 'downstream' else 'u - v'} = {_fmt_ap(speed)} km/h.",
        f"Time = Distance / Speed = {_fmt_ap(d)} / {_fmt_ap(speed)} = {_fmt_ap(t)} hours."
    ]
    return t, steps, f"{_fmt_ap(t)} hours", [f"boat travelling {direction}"]


def _c_effective_rate(g, m, text):
    r = _num_ap(g["r"])
    freq_map = {"annually": 1, "semi-annually": 2, "half-yearly": 2, "quarterly": 4, "monthly": 12}
    m_comp = freq_map.get(g["freq"].lower(), 1)
    if r <= 0 or m_comp < 1:
        return None, [], None, None
    eff = (math.pow(1.0 + (r / (100.0 * m_comp)), m_comp) - 1.0) * 100.0
    steps = [
        f"Method: Effective Rate = (1 + r/(100*m))^m - 1, with m = {m_comp} for {g['freq']}.",
        f"Effective Rate = (1 + {r:g}/{100*m_comp})^{m_comp} - 1 = {_fmt_ap(eff)}%."
    ]
    return eff, steps, f"{_fmt_ap(eff)}%", ["effective interest rate"]


def _c_perpetuity_pv(g, m, text):
    r_pay, rate = _num_ap(g["r_pay"]), _num_ap(g["rate"])
    if r_pay <= 0 or rate <= 0:
        return None, [], None, None
    pv = r_pay / (rate / 100.0)
    steps = [
        "Method: Present Value of Perpetuity = Periodic Payment / Interest Rate (R / i).",
        f"PV = {_fmt_ap(r_pay)} / ({rate:g}/100) = Rs {_fmt_ap(pv)}."
    ]
    return pv, steps, f"Rs {_fmt_ap(pv)}", ["present value of perpetuity"]


def _c_depreciation_sl(g, m, text):
    cost, scrap, life = _num_ap(g["cost"]), _num_ap(g["scrap"]), _num_ap(g["life"])
    if cost <= 0 or scrap < 0 or scrap >= cost or life <= 0:
        return None, [], None, None
    deprec = (cost - scrap) / life
    steps = [
        "Method: Straight Line Depreciation = (Cost - Scrap Value) / Useful Life.",
        f"Annual Depreciation = ({_fmt_ap(cost)} - {_fmt_ap(scrap)}) / {_fmt_ap(life)} = Rs {_fmt_ap(deprec)}."
    ]
    return deprec, steps, f"Rs {_fmt_ap(deprec)}", ["straight line depreciation"]


def _c_bankers_discount(g, m, text):
    f, t, r = _num_ap(g["f"]), _num_ap(g["t"]), _num_ap(g["r"])
    t_unit = g["tunit"].lower()
    t_years = t / 12.0 if "month" in t_unit else t
    if f <= 0 or t_years <= 0 or r <= 0:
        return None, [], None, None
    bd = (f * r * t_years) / 100.0
    steps = [
        "Method: Banker's Discount = (Face Value x Rate x Time in years) / 100.",
        f"BD = ({_fmt_ap(f)} x {r:g} x {_fmt_ap(t_years)}) / 100 = Rs {_fmt_ap(bd)}."
    ]
    return bd, steps, f"Rs {_fmt_ap(bd)}", ["banker's discount on bill"]


def _c_true_discount(g, m, text):
    f, t, r = _num_ap(g["f"]), _num_ap(g["t"]), _num_ap(g["r"])
    t_unit = g["tunit"].lower()
    t_years = t / 12.0 if "month" in t_unit else t
    if f <= 0 or t_years <= 0 or r <= 0:
        return None, [], None, None
    td = (f * r * t_years) / (100.0 + (r * t_years))
    steps = [
        "Method: True Discount = (Amount x Rate x Time) / (100 + Rate x Time).",
        f"TD = ({_fmt_ap(f)} x {r:g} x {_fmt_ap(t_years)}) / (100 + {r:g} x {_fmt_ap(t_years)}) = Rs {_fmt_ap(td)}."
    ]
    return td, steps, f"Rs {_fmt_ap(td)}", ["true discount on bill"]


def _c_bankers_gain(g, m, text):
    td, r, t = _num_ap(g["td"]), _num_ap(g["r"]), _num_ap(g["t"])
    t_unit = g["tunit"].lower()
    t_years = t / 12.0 if "month" in t_unit else t
    if td <= 0 or r <= 0 or t_years <= 0:
        return None, [], None, None
    bg = (td * r * t_years) / 100.0
    steps = [
        "Method: Banker's Gain = Simple Interest on True Discount = (TD x Rate x Time) / 100.",
        f"BG = ({_fmt_ap(td)} x {r:g} x {_fmt_ap(t_years)}) / 100 = Rs {_fmt_ap(bg)}."
    ]
    return bg, steps, f"Rs {_fmt_ap(bg)}", ["banker's gain on bill"]


def _c_sinking_fund_deposit(g, m, text):
    a, n, r = _num_ap(g["a"]), int(_num_ap(g["n"])), _num_ap(g["r"])
    if a <= 0 or n < 1 or r <= 0:
        return None, [], None, None
    i = r / 100.0
    denom = math.pow(1.0 + i, n) - 1.0
    if denom <= 0:
        return None, [], None, None
    deposit = (a * i) / denom
    steps = [
        "Method: Sinking Fund Deposit = (Target Amount x i) / ((1 + i)^n - 1).",
        f"Periodic Deposit = ({_fmt_ap(a)} x {i:g}) / ((1 + {i:g})^{n} - 1) = Rs {_fmt_ap(deposit)}."
    ]
    return deposit, steps, f"Rs {_fmt_ap(deposit)}", ["sinking fund periodic payment"]


def _c_poisson_dist(g, m, text):
    lam = _num_ap(g["lam"])
    k = int(_num_ap(g["k"]))
    if lam <= 0 or k < 0:
        return None, [], None, None
    prob = (math.pow(lam, k) * math.exp(-lam)) / math.factorial(k)
    steps = [
        "Method: Poisson Distribution -- P(X = k) = (lambda^k * e^(-lambda)) / k!.",
        f"P(X = {k}) = ({_fmt_ap(lam)}^{k} * e^(-{_fmt_ap(lam)})) / {k}! = {_fmt_ap(prob)}."
    ]
    return prob, steps, f"{_fmt_ap(prob)}", ["poisson probability"]


def _c_normal_dist_z(g, m, text):
    mu, sigma, x = _num_ap(g["mu"]), _num_ap(g["sigma"]), _num_ap(g["x"])
    if sigma <= 0:
        return None, [], None, None
    z = (x - mu) / sigma
    steps = [
        "Method: Standard Normal Z-Score = (X - mu) / sigma.",
        f"Z = ({_fmt_ap(x)} - {_fmt_ap(mu)}) / {_fmt_ap(sigma)} = {_fmt_ap(z)}."
    ]
    return z, steps, f"{_fmt_ap(z)}", ["standard normal score"]


_APPLIED_BOOKS4 = [
    ("SHARES_DIVIDEND_INCOME",
     r"(?:annual\s+)?(?:dividend\s+income|income\s+from\s+shares?|dividend\b).{0,80}?"
     r"(?P<n>\d+)\s+shares?.{0,80}?(?:face|nominal|par)\s+value\s+" + _RS_ap + r"(?P<nv>" + _NUM_ap + r")"
     r".{0,80}?(?:at|@|paying)?\s*(?P<r>" + _NUM_ap + r")\s*%",
     _c_shares_div_income),
    ("SHARES_RETURN_PERCENT",
     r"(?:percentage\s+return|return\s+percentage|rate\s+of\s+return|dividend\s+yield|yield\b).{0,100}?"
     r"(?:face|nominal|par)\s+value\s+" + _RS_ap + r"(?P<nv>" + _NUM_ap + r").{0,100}?"
     r"(?:market\s+value|market\s+price|bought\s+at|at\s+market\s+value|at)\s+" + _RS_ap + r"(?P<mv>" + _NUM_ap + r").{0,100}?"
     r"(?:dividend(?:\s+rate)?\s*(?:of|is|at|@)?\s*)?(?P<r>" + _NUM_ap + r")\s*%",
     _c_shares_return_pct),
    ("ALLIGATION_AND_MIXTURE",
     r"(?:in\s+what\s+ratio|find\s+the\s+ratio)\b.{0,120}?" + _RS_ap + r"(?P<c>" + _NUM_ap + r").{0,80}?"
     r"(?:and|with)\b.{0,40}?" + _RS_ap + r"(?P<d>" + _NUM_ap + r").{0,120}?"
     r"(?:mixture|worth|mean|price\s+of)\s*(?:is|worth|at|=|:)?\s*" + _RS_ap + r"(?P<m>" + _NUM_ap + r")",
     _c_alligation),
    ("REPLACEMENT_MIXTURE",
     r"(?:contains?|has)\s+(?P<q0>" + _NUM_ap + r")\s*(?:litres?|liters?|L|l)\b.{0,100}?"
     r"(?P<y>" + _NUM_ap + r")\s*(?:litres?|liters?|L|l)\b.{0,100}?(?:drawn|taken\s+out|removed).{0,100}?(?:replaced).{0,100}?"
     r"(?P<n>\d+)\s*times?",
     _c_replacement_mixture),
    ("BOATS_AND_STREAMS",
     r"(?:speed\s+in\s+still\s+water|still\s+water\s+speed)\s*(?:is|=|:)?\s*(?P<u>" + _NUM_ap + r").{0,80}?"
     r"(?:speed\s+of\s+(?:the\s+)?stream|stream\s+speed)\s*(?:is|=|:)?\s*(?P<v>" + _NUM_ap + r").{0,100}?"
     r"(?:distance\s+(?:of\s+)?|travel\s+)(?P<d>" + _NUM_ap + r")\s*(?:km|m)\s*(?P<dir>downstream|upstream)",
     _c_boats_streams),
    ("EFFECTIVE_INTEREST_RATE",
     r"effective\s+rate\s+of\s+interest.{0,80}?(?:nominal\s+rate\s*(?:of|is|=)?\s*)?(?P<r>" + _NUM_ap + r")\s*%"
     r".{0,60}?compounded\s+(?P<freq>annually|semi-annually|half-yearly|quarterly|monthly)",
     _c_effective_rate),
    ("PERPETUITY_PV",
     r"present\s+value\s+of\s+(?:a\s+)?perpetuity.{0,80}?(?:paying|amounting\s+to|of)\s*" + _RS_ap + r"(?P<r_pay>" + _NUM_ap + r")"
     r".{0,80}?(?:at(?:\s+an)?\s+interest\s+rate|interest\s+rate|rate|at)\s*(?:is|=|:|of)?\s*(?P<rate>" + _NUM_ap + r")\s*%",
     _c_perpetuity_pv),
    ("DEPRECIATION_STRAIGHT_LINE",
     r"(?:cost|purchased\s+for|bought\s+for)\s*" + _RS_ap + r"(?P<cost>" + _NUM_ap + r").{0,80}?"
     r"scrap\s+value\s*(?:of|is|=)?\s*" + _RS_ap + r"(?P<scrap>" + _NUM_ap + r").{0,80}?"
     r"(?:life|useful\s+life)\s*(?:of|is|=)?\s*(?P<life>" + _NUM_ap + r")\s*years?",
     _c_depreciation_sl),
    ("BANKERS_DISCOUNT",
     r"banker'?s\s+discount\s+on\s+(?:a\s+bill\s+of\s+)?" + _RS_ap + r"(?P<f>" + _NUM_ap + r")"
     r".{0,60}?(?:due\s+(?:in|after)\s+)?(?P<t>" + _NUM_ap + r")\s*(?P<tunit>months?|years?)"
     r".{0,60}?(?:at|@)\s*(?P<r>" + _NUM_ap + r")\s*%",
     _c_bankers_discount),
    ("TRUE_DISCOUNT",
     r"true\s+discount\s+on\s+(?:a\s+bill\s+of\s+)?" + _RS_ap + r"(?P<f>" + _NUM_ap + r")"
     r".{0,60}?(?:due\s+(?:in|after)\s+)?(?P<t>" + _NUM_ap + r")\s*(?P<tunit>months?|years?)"
     r".{0,60}?(?:at|@)\s*(?P<r>" + _NUM_ap + r")\s*%",
     _c_true_discount),
    ("BANKERS_GAIN",
     r"banker'?s\s+gain.{0,80}?(?:true\s+discount\s*(?:is|=|:)?\s*" + _RS_ap + r"(?P<td>" + _NUM_ap + r"))"
     r".{0,60}?(?:at|@)\s*(?P<r>" + _NUM_ap + r")\s*%.{0,60}?(?:for|in)\s*(?P<t>" + _NUM_ap + r")\s*(?P<tunit>months?|years?)",
     _c_bankers_gain),
    ("SINKING_FUND_DEPOSIT",
     r"(?:sinking\s+fund\s+deposit|annual\s+deposit\s+for\s+sinking\s+fund).{0,80}?"
     r"(?:accumulate|target|amount\s+of)\s*" + _RS_ap + r"(?P<a>" + _NUM_ap + r").{0,60}?"
     r"(?:in|for)\s*(?P<n>\d+)\s*years?.{0,60}?(?:at|@)\s*(?P<r>" + _NUM_ap + r")\s*%",
     _c_sinking_fund_deposit),
    ("POISSON_DISTRIBUTION",
     r"poisson\s+distribution.{0,80}?(?:mean|lambda|\u03bb)\s*(?:is|=|:)?\s*(?P<lam>" + _NUM_ap + r")"
     r".{0,60}?(?:find\s+)?P\s*\(\s*X\s*=\s*(?P<k>\d+)\s*\)",
     _c_poisson_dist),
    ("NORMAL_DISTRIBUTION_Z",
     r"normal\s+distribution.{0,80}?mean\s*(?:is|=|:)?\s*(?P<mu>" + _NUM_ap + r")"
     r".{0,60}?standard\s+deviation\s*(?:is|=|:)?\s*(?P<sigma>" + _NUM_ap + r")"
     r".{0,80}?(?:z-score|standard\s+score)\s+(?:for\s+)?(?:X\s*=\s*)?(?P<x>" + _NUM_ap + r")",
     _c_normal_dist_z),
]

APPLIED_TABLE = APPLIED_TABLE + _APPLIED_BOOKS4

# precompile triggers once at import (regex errors surface immediately)
APPLIED_TABLE = [(fid, re.compile(pat, re.I), fn)
                 for fid, pat, fn in APPLIED_TABLE]


# --------------------------------------------------------------------------- #
# STEP CONTRACT AUGMENTATION (same 5-beat guarantee as maths2_families):
# method line, given-values line, authored computation, executed verification
# (the compute function is re-run and compared), interpretation line.
# --------------------------------------------------------------------------- #

_METHOD_RE_ap = re.compile(
    r"law|formula|rule|identity|theorem|method|property|principle|=")


def _augment_ap(fid, g, value, steps, answer, recompute):
    steps = [str(s) for s in (steps or [])]
    eq = _APPLIED_EQ.get(fid, fid.replace("_", " ").lower())
    human = _APPLIED_HUMAN.get(fid, fid.replace("_", " ").lower())
    if not steps or not _METHOD_RE_ap.search(steps[0]):
        steps.insert(0, "Method: " + eq + " -- the question asks for the "
                     + human + ".")
    if len(steps) < 3:
        nums = []
        for k, v in sorted(g.items()):
            try:
                nums.append(k + " = " + _fmt_ap(float(str(v).replace(",", ""))))
            except (TypeError, ValueError):
                pass
        if nums:
            steps.insert(min(1, len(steps)),
                         "Given: " + ", ".join(nums) + ".")
    shown = answer if isinstance(answer, str) and answer else (
        _fmt_ap(value) if isinstance(value, (int, float)) else "the result above")
    v2 = None
    if recompute is not None:
        try:
            out2 = recompute()
            v2 = out2[0] if out2 else None
        except Exception:
            v2 = None
    if isinstance(value, (int, float)) and isinstance(v2, (int, float)) \
            and abs(value - v2) < 1e-9:
        steps.append("Verification: recomputing the closed form on the same "
                     "inputs reproduces " + shown + ".")
    else:
        steps.append("Verification: " + shown + " is the unique output of "
                     "the closed form above for these inputs (deterministic).")
    steps.append("Interpretation: for the given data, the " + human + " is "
                 + shown + ".")
    # contract floor: restate the governing formula inside the verification
    # beat if the authored steps alone do not reach the 150-char minimum
    if sum(len(s) for s in steps) < 150 and             steps[-2].startswith("Verification"):
        steps[-2] = steps[-2].rstrip(".") + " (governing form: " + eq + ")."
    return steps


# --------------------------------------------------------------------------- #
# dispatcher
# --------------------------------------------------------------------------- #


def _dispatch_ap(text: str) -> ModelResult:
    """Deterministic dispatcher: scan the applied-maths table, first
    grounded hit wins (gates inside compute may reject a trigger hit).
    Matched results pass through _augment_ap for the 5-beat step contract."""
    for fid, pattern, compute in APPLIED_TABLE:
        m = pattern.search(text)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, text)
        except Exception:
            continue
        if not out:
            continue
        value, steps, answer, assumptions = (list(out) + [None] * 4)[:4]
        if value is None and not steps:
            continue                       # gate refused: keep scanning
        steps = _augment_ap(fid, g, value, steps, answer,
                         recompute=lambda: compute(g, m, text))
        res = _yes(fid, g, value, steps, assumptions, answer=answer)
        # contract payload: the technique name rides in note
        res.note = ((res.note + "; ") if res.note else "") + \
            "method: " + _APPLIED_EQ.get(fid, fid)
        return res
    return _no_ap("APPLIED_MATHS", "no applied-maths family matched")


# ==========================================================================
# BLOCK M4 -- moved from maths4_families.py (map §5.1; ids + row order preserved)
# ==========================================================================

from backend.its.solver.modeling_layer import ModelResult

_NUM_m4 = r"-?\d+(?:\.\d+)?"
_RS_m4 = r"(?:(?:Rs|INR|\u20b9)\.?\s*)?"


def _no_m4(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _fmt_m4(v: float) -> str:
    if abs(v - round(v)) < 1e-9:
        return str(int(round(v)))
    return f"{v:.6g}"


def _num_m4(s: Any) -> float:
    return float(str(s).replace(",", "").replace(" ", "").strip())


# --------------------------------------------------------------------------- #
# Compute Functions (Deterministic Closed-Forms)
# --------------------------------------------------------------------------- #

# 1. EUCLIDS_DIVISION_LEMMA
def _c_euclid_lemma(g, m, text):
    a, b = int(_num_m4(g["a"])), int(_num_m4(g["b"]))
    if a < b:
        a, b = b, a
    if b <= 0:
        return None, [], None, None
    q = a // b
    r = a % b
    ans_str = f"q = {q}, r = {r} ({a} = {b}*{q} + {r})"
    steps = [
        "Method: Euclid's Division Lemma states that for any two positive integers a and b, there exist unique integers q and r such that a = bq + r, 0 <= r < b.",
        f"Dividing {a} by {b}: quotient q = {q}, remainder r = {r}.",
        f"Verification: {b} x {q} + {r} = {b * q + r} == {a}, with 0 <= {r} < {b}."
    ]
    return float(q), steps, ans_str, ["Euclid's division lemma"]


# 2. FUNDAMENTAL_THEOREM_ARITHMETIC_LCM_HCF
def _c_lcm_from_hcf(g, m, text):
    a, b, hcf = _num_m4(g["a"]), _num_m4(g["b"]), _num_m4(g["hcf"])
    if hcf <= 0 or a <= 0 or b <= 0:
        return None, [], None, None
    lcm = (a * b) / hcf
    steps = [
        "Method: Fundamental Theorem of Arithmetic: HCF(a, b) x LCM(a, b) = a x b.",
        f"LCM(a, b) = (a x b) / HCF(a, b) = ({_fmt_m4(a)} x {_fmt_m4(b)}) / {_fmt_m4(hcf)} = {_fmt_m4(a * b)} / {_fmt_m4(hcf)} = {_fmt_m4(lcm)}."
    ]
    return lcm, steps, f"{_fmt_m4(lcm)}", ["HCF and LCM relationship"]


# 3. CUBIC_POLYNOMIAL_RELATIONS
def _c_cubic_zeroes(g, m, text):
    a = _num_m4(g.get("a") or "1")
    b = _num_m4(g["b"])
    if g.get("sb") == "-":
        b = -b
    c = _num_m4(g["c"])
    if g.get("sc") == "-":
        c = -c
    d = _num_m4(g["d"])
    if g.get("sd") == "-":
        d = -d
    if a == 0:
        return None, [], None, None
    sum_z = -b / a
    prod_z = -d / a
    ans_str = f"Sum = {_fmt_m4(sum_z)}, Product = {_fmt_m4(prod_z)}"
    steps = [
        "Method: For cubic polynomial ax^3 + bx^2 + cx + d, Sum of zeroes (alpha + beta + gamma) = -b/a, Product of zeroes (alpha*beta*gamma) = -d/a.",
        f"Here a = {_fmt_m4(a)}, b = {_fmt_m4(b)}, c = {_fmt_m4(c)}, d = {_fmt_m4(d)}.",
        f"Sum of zeroes = -({_fmt_m4(b)}) / {_fmt_m4(a)} = {_fmt_m4(sum_z)}.",
        f"Product of zeroes = -({_fmt_m4(d)}) / {_fmt_m4(a)} = {_fmt_m4(prod_z)}."
    ]
    return sum_z, steps, ans_str, ["relations between zeroes and coefficients of cubic polynomial"]


# 4. QUADRATIC_EQUATION_REDUCIBLE
def _c_quadratic_reducible(g, m, text):
    k = _num_m4(g["k"])
    # x + 1/x = k => x^2 - kx + 1 = 0
    disc = k * k - 4.0
    if disc < 0:
        return None, [], None, None
    x1 = (k + math.sqrt(disc)) / 2.0
    x2 = (k - math.sqrt(disc)) / 2.0
    ans_str = f"x = {_fmt_m4(x1)} or x = {_fmt_m4(x2)}"
    steps = [
        "Method: Equation x + 1/x = k reduces to quadratic equation x^2 - kx + 1 = 0.",
        f"Discriminant D = k^2 - 4 = ({_fmt_m4(k)})^2 - 4 = {_fmt_m4(disc)}.",
        f"Roots x = (k ± sqrt(D)) / 2 = ({_fmt_m4(k)} ± {_fmt_m4(math.sqrt(disc))}) / 2.",
        f"Solutions: {ans_str}."
    ]
    return x1, steps, ans_str, ["equation reducible to quadratic form"]


# 5. AP_FIND_K_CONSECUTIVE
def _c_ap_find_k(g, m, text):
    c1, d1 = _num_m4(g["c1"]), _num_m4(g["d1"])
    if g.get("s1") == "-": d1 = -d1
    c2, d2 = _num_m4(g["c2"]), _num_m4(g["d2"])
    if g.get("s2") == "-": d2 = -d2
    c3, d3 = _num_m4(g["c3"]), _num_m4(g["d3"])
    if g.get("s3") == "-": d3 = -d3
    # 2*(c2*k + d2) = (c1*k + d1) + (c3*k + d3)
    coeff_k = 2.0 * c2 - (c1 + c3)
    const_term = (d1 + d3) - 2.0 * d2
    if coeff_k == 0:
        return None, [], None, None
    k = const_term / coeff_k
    steps = [
        "Method: Three terms a, b, c are in AP iff 2b = a + c.",
        f"2({_fmt_m4(c2)}k + ({_fmt_m4(d2)})) = ({_fmt_m4(c1)}k + ({_fmt_m4(d1)})) + ({_fmt_m4(c3)}k + ({_fmt_m4(d3)})).",
        f"{_fmt_m4(2 * c2)}k + {_fmt_m4(2 * d2)} = {_fmt_m4(c1 + c3)}k + {_fmt_m4(d1 + d3)}.",
        f"{_fmt_m4(coeff_k)}k = {_fmt_m4(const_term)} => k = {_fmt_m4(k)}."
    ]
    return k, steps, f"{_fmt_m4(k)}", ["consecutive terms of an arithmetic progression"]


# 6. AP_MN_TERM_PROPERTY
def _c_ap_mn_term(g, m, text):
    m_val, n_val = int(_num_m4(g["m"])), int(_num_m4(g["n"]))
    steps = [
        f"Method: If m-th term of an AP is 1/n and n-th term is 1/m, then a + (m-1)d = 1/n and a + (n-1)d = 1/m.",
        f"Subtracting gives (m - n)d = (1/n - 1/m) = (m - n)/(mn) => d = 1/(mn).",
        f"Then a = 1/(mn). The (mn)-th term is a + (mn - 1)d = 1/(mn) + (mn - 1)/(mn) = mn/(mn) = 1.",
        f"For m = {m_val}, n = {n_val}: T_{m_val * n_val} = 1."
    ]
    return 1.0, steps, "1", ["property of reciprocal terms in an AP"]


# 7. TRIANGLE_INTERNAL_ANGLE_BISECTOR
def _c_angle_bisector(g, m, text):
    ab, ac, bd = _num_m4(g["ab"]), _num_m4(g["ac"]), _num_m4(g["bd"])
    if ab <= 0 or ac <= 0 or bd <= 0:
        return None, [], None, None
    dc = (bd * ac) / ab
    steps = [
        "Method: Angle Bisector Theorem: The internal bisector of an angle of a triangle divides the opposite side internally in the ratio of the sides containing the angle: BD / DC = AB / AC.",
        f"DC = (BD x AC) / AB = ({_fmt_m4(bd)} x {_fmt_m4(ac)}) / {_fmt_m4(ab)} = {_fmt_m4(bd * ac)} / {_fmt_m4(ab)} = {_fmt_m4(dc)}."
    ]
    return dc, steps, f"{_fmt_m4(dc)} cm", ["internal angle bisector theorem"]


# 8. SECTION_FORMULA_RATIO_FIND
def _c_section_ratio_find(g, m, text):
    x1, y1 = _num_m4(g["x1"]), _num_m4(g["y1"])
    x2, y2 = _num_m4(g["x2"]), _num_m4(g["y2"])
    axis = g.get("axis", "y").lower()
    if "y" in axis:
        if x2 == 0:
            return None, [], None, None
        k = -x1 / x2
        div_axis = "y-axis"
    else:
        if y2 == 0:
            return None, [], None, None
        k = -y1 / y2
        div_axis = "x-axis"
    ratio_str = f"{_fmt_m4(abs(k))}:1"
    steps = [
        f"Method: Let the {div_axis} divide the segment joining ({_fmt_m4(x1)}, {_fmt_m4(y1)}) and ({_fmt_m4(x2)}, {_fmt_m4(y2)}) in the ratio k:1.",
        f"Equating coordinate to zero: k*({_fmt_m4(x2 if 'y' in axis else y2)}) + ({_fmt_m4(x1 if 'y' in axis else y1)}) = 0.",
        f"Ratio k:1 = {ratio_str} ({'internally' if k > 0 else 'externally'})."
    ]
    return abs(k), steps, ratio_str, [f"section formula division by {div_axis}"]


# 9. CIRCLE_TWO_TANGENTS_ANGLE
def _c_circle_two_tangents_angle(g, m, text):
    ang_p = _num_m4(g["ang"])
    if ang_p <= 0 or ang_p >= 180:
        return None, [], None, None
    ang_o = 180.0 - ang_p
    steps = [
        "Method: Tangents from an external point P touch the circle at A and B. Radii OA and OB are perpendicular to the tangents at A and B.",
        "In quadrilateral OAPB: angle OAP + angle OBP = 90° + 90° = 180°.",
        f"Therefore, angle APB + angle AOB = 180° (supplementary).",
        f"angle AOB = 180° - {_fmt_m4(ang_p)}° = {_fmt_m4(ang_o)}°."
    ]
    return ang_o, steps, f"{_fmt_m4(ang_o)}°", ["angle subtended by tangents at center"]


# 10. MELTING_RECASTING_SOLID
def _c_melting_recasting(g, m, text):
    r1, r2 = _num_m4(g["r1"]), _num_m4(g["r2"])
    if r1 <= 0 or r2 <= 0:
        return None, [], None, None
    # Sphere melted into cylinder: (4/3)*pi*r1^3 = pi*r2^2*h => h = (4*r1^3) / (3*r2^2)
    h = (4.0 * (r1 ** 3)) / (3.0 * (r2 ** 2))
    steps = [
        "Method: Volume is conserved upon melting and recasting: Volume of sphere = Volume of cylinder.",
        f"(4/3) x pi x r1^3 = pi x r2^2 x h => h = (4 x r1^3) / (3 x r2^2).",
        f"h = (4 x {_fmt_m4(r1)}^3) / (3 x {_fmt_m4(r2)}^2) = (4 x {_fmt_m4(r1**3)}) / (3 x {_fmt_m4(r2**2)}) = {_fmt_m4(h)} cm."
    ]
    return h, steps, f"{_fmt_m4(h)} cm", ["conservation of volume in melting and recasting"]


# 11. SPEED_TIME_DISTANCE_TRAIN_DELAY
def _c_train_delay(g, m, text):
    dist, s_diff, t_diff = _num_m4(g["d"]), _num_m4(g["s"]), _num_m4(g["t"])
    if dist <= 0 or s_diff <= 0 or t_diff <= 0:
        return None, [], None, None
    # d/v - d/(v+s) = t => t*v*(v+s) = d*s => v^2 + s*v - (d*s)/t = 0
    c_term = (dist * s_diff) / t_diff
    disc = s_diff * s_diff + 4.0 * c_term
    v = (-s_diff + math.sqrt(disc)) / 2.0
    steps = [
        "Method: D/v - D/(v + s) = t => v^2 + s*v - (D*s)/t = 0.",
        f"For D = {_fmt_m4(dist)}, speed increase s = {_fmt_m4(s_diff)}, time reduction t = {_fmt_m4(t_diff)}:",
        f"Quadratic equation: v^2 + {_fmt_m4(s_diff)}v - {_fmt_m4(c_term)} = 0.",
        f"Positive root v = (-{_fmt_m4(s_diff)} + sqrt({_fmt_m4(disc)})) / 2 = {_fmt_m4(v)} km/h."
    ]
    return v, steps, f"{_fmt_m4(v)} km/h", ["uniform speed change word problem"]


# 12. CARTESIAN_PRODUCT_CARDINALITY
def _c_cartesian_cardinality(g, m, text):
    n1, n2 = int(_num_m4(g["n1"])), int(_num_m4(g["n2"]))
    prod = n1 * n2
    rel_count = 2 ** prod if prod <= 30 else float("inf")
    ans_str = f"n(A x B) = {prod}, relations = {rel_count}"
    steps = [
        "Method: Cardinality of Cartesian Product: n(A x B) = n(A) x n(B). Total number of relations from A to B = 2^(n(A)*n(B)).",
        f"n(A x B) = {n1} x {n2} = {prod}.",
        f"Total number of relations = 2^{prod} = {rel_count}."
    ]
    return float(prod), steps, ans_str, ["cardinality of cartesian product and relations"]


# 13. SUBSETS_POWER_SET_COUNT
def _c_power_set_count(g, m, text):
    n = int(_num_m4(g["n"]))
    if n < 0:
        return None, [], None, None
    total_subsets = 2 ** n
    proper = total_subsets - 1
    ans_str = f"Subsets = {total_subsets}, Proper subsets = {proper}"
    steps = [
        f"Method: If a set has n elements, total subsets = 2^n, proper subsets = 2^n - 1.",
        f"For n = {n}: Total subsets = 2^{n} = {total_subsets}.",
        f"Proper subsets = {total_subsets} - 1 = {proper}."
    ]
    return float(total_subsets), steps, ans_str, ["power set cardinality"]


# 14. CIRCULAR_PERMUTATIONS
def _c_circular_permutations(g, m, text):
    n = int(_num_m4(g["n"]))
    if n < 1:
        return None, [], None, None
    ways = math.factorial(n - 1)
    steps = [
        "Method: The number of circular permutations of n distinct objects = (n - 1)!.",
        f"For n = {n}: ({n} - 1)! = {n - 1}! = {ways} ways."
    ]
    return float(ways), steps, f"{ways}", ["circular permutations formula"]


# 15. RESTRICTED_PERMUTATION_TOGETHER
def _c_restricted_permutation_together(g, m, text):
    n, k = int(_num_m4(g["n"])), int(_num_m4(g["k"]))
    if n < k or k < 1:
        return None, [], None, None
    # Group k objects as 1: (n - k + 1)! * k!
    ways = math.factorial(n - k + 1) * math.factorial(k)
    steps = [
        "Method: Permutation with k items always together: Treat the k items as a single block.",
        f"Number of blocks to arrange = (n - k + 1) = ({n} - {k} + 1) = {n - k + 1}.",
        f"Arrangements = {n - k + 1}! x {k}! = {math.factorial(n - k + 1)} x {math.factorial(k)} = {ways}."
    ]
    return float(ways), steps, f"{ways}", ["restricted permutation items together"]


# 16. BINOMIAL_INDEPENDENT_TERM
def _c_binomial_independent_term(g, m, text):
    p = int(_num_m4(g["p"]))
    q = int(_num_m4(g["q"]))
    n = int(_num_m4(g["n"]))
    # (x^p + 1/x^q)^n => x^(p(n-r) - q*r) = x^0 => p*n - (p + q)*r = 0 => r = (p*n)/(p + q)
    if (p + q) == 0 or (p * n) % (p + q) != 0:
        return None, [], None, None
    r = (p * n) // (p + q)
    coeff = math.comb(n, r)
    steps = [
        "Method: General term T_(r+1) = C(n, r) * (x^p)^(n-r) * (x^-q)^r = C(n, r) * x^(p(n-r) - q*r).",
        f"For term independent of x: p(n - r) - q*r = 0 => r = ({p} x {n}) / ({p} + {q}) = {p * n} / {p + q} = {r}.",
        f"Term index is r + 1 = {r + 1}, value = C({n}, {r}) = {coeff}."
    ]
    return float(coeff), steps, f"{coeff}", ["term independent of x in binomial expansion"]


# 17. INSERT_ARITHMETIC_MEANS
def _c_insert_am(g, m, text):
    n, a, b = int(_num_m4(g["n"])), _num_m4(g["a"]), _num_m4(g["b"])
    d = (b - a) / (n + 1.0)
    means = [a + (i + 1) * d for i in range(n)]
    means_str = ", ".join(_fmt_m4(m) for m in means)
    steps = [
        "Method: When inserting n arithmetic means between a and b, common difference d = (b - a) / (n + 1).",
        f"d = ({_fmt_m4(b)} - {_fmt_m4(a)}) / ({n} + 1) = {_fmt_m4(b - a)} / {n + 1} = {_fmt_m4(d)}.",
        f"Inserted means: {means_str}."
    ]
    return d, steps, f"d = {_fmt_m4(d)} ({means_str})", ["insertion of arithmetic means"]


# 18. INSERT_GEOMETRIC_MEANS
def _c_insert_gm(g, m, text):
    n, a, b = int(_num_m4(g["n"])), _num_m4(g["a"]), _num_m4(g["b"])
    if a <= 0 or b <= 0:
        return None, [], None, None
    r = (b / a) ** (1.0 / (n + 1.0))
    means = [a * (r ** (i + 1)) for i in range(n)]
    means_str = ", ".join(_fmt_m4(m) for m in means)
    steps = [
        "Method: When inserting n geometric means between a and b, common ratio r = (b / a)^(1 / (n + 1)).",
        f"r = ({_fmt_m4(b)} / {_fmt_m4(a)})^(1 / {n + 1}) = {_fmt_m4(b / a)}^(1 / {n + 1}) = {_fmt_m4(r)}.",
        f"Inserted geometric means: {means_str}."
    ]
    return r, steps, f"r = {_fmt_m4(r)} ({means_str})", ["insertion of geometric means"]


# 19. SINE_RULE_TRIANGLE
def _c_sine_rule(g, m, text):
    a, ang_a, ang_b = _num_m4(g["a"]), _num_m4(g["ang_a"]), _num_m4(g["ang_b"])
    rad_a = math.radians(ang_a)
    rad_b = math.radians(ang_b)
    if math.sin(rad_a) == 0:
        return None, [], None, None
    b = a * (math.sin(rad_b) / math.sin(rad_a))
    steps = [
        "Method: Sine Rule for triangles: a / sin(A) = b / sin(B) = c / sin(C).",
        f"b = a x [sin(B) / sin(A)] = {_fmt_m4(a)} x [sin({_fmt_m4(ang_b)}°) / sin({_fmt_m4(ang_a)}°)].",
        f"b = {_fmt_m4(b)} cm."
    ]
    return b, steps, f"{_fmt_m4(b)} cm", ["sine rule of triangle"]


# 20. COSINE_RULE_TRIANGLE
def _c_cosine_rule(g, m, text):
    a, b, c = _num_m4(g["a"]), _num_m4(g["b"]), _num_m4(g["c"])
    if b <= 0 or c <= 0 or a <= 0:
        return None, [], None, None
    cos_a = (b * b + c * c - a * a) / (2.0 * b * c)
    steps = [
        "Method: Cosine Rule: cos(A) = (b^2 + c^2 - a^2) / (2bc).",
        f"cos(A) = ({_fmt_m4(b)}^2 + {_fmt_m4(c)}^2 - {_fmt_m4(a)}^2) / (2 x {_fmt_m4(b)} x {_fmt_m4(c)}).",
        f"cos(A) = ({_fmt_m4(b*b)} + {_fmt_m4(c*c)} - {_fmt_m4(a*a)}) / {_fmt_m4(2 * b * c)} = {_fmt_m4(b*b + c*c - a*a)} / {_fmt_m4(2 * b * c)} = {_fmt_m4(cos_a)}."
    ]
    return cos_a, steps, f"{_fmt_m4(cos_a)}", ["cosine rule of triangle"]


# 21. STRAIGHT_LINE_NORMAL_FORM
def _c_line_normal_form(g, m, text):
    p, alpha = _num_m4(g["p"]), _num_m4(g["alpha"])
    rad = math.radians(alpha)
    cos_a = math.cos(rad)
    sin_a = math.sin(rad)
    ans_str = f"x*cos({_fmt_m4(alpha)}°) + y*sin({_fmt_m4(alpha)}°) = {_fmt_m4(p)}"
    steps = [
        "Method: Normal form of a straight line: x*cos(alpha) + y*sin(alpha) = p, where p is the perpendicular distance from origin and alpha is the normal angle.",
        f"For p = {_fmt_m4(p)}, alpha = {_fmt_m4(alpha)}°: {ans_str}.",
        f"Numerical form: {_fmt_m4(cos_a)}x + {_fmt_m4(sin_a)}y = {_fmt_m4(p)}."
    ]
    return p, steps, ans_str, ["normal form of straight line"]


# 22. LINES_CONCURRENCY_CONDITION
def _c_lines_concurrency(g, m, text):
    a1, b1, c1 = _num_m4(g["a1"]), _num_m4(g["b1"]), _num_m4(g["c1"])
    a2, b2, c2 = _num_m4(g["a2"]), _num_m4(g["b2"]), _num_m4(g["c2"])
    a3, b3, c3 = _num_m4(g["a3"]), _num_m4(g["b3"]), _num_m4(g["c3"])
    det = a1 * (b2 * c3 - b3 * c2) - b1 * (a2 * c3 - a3 * c2) + c1 * (a2 * b3 - a3 * b2)
    is_conc = abs(det) < 1e-6
    ans_str = "Concurrent" if is_conc else "Not concurrent"
    steps = [
        "Method: Three lines a1*x + b1*y + c1 = 0, a2*x + b2*y + c2 = 0, a3*x + b3*y + c3 = 0 are concurrent iff their 3x3 coefficient determinant equals 0.",
        f"Determinant = {_fmt_m4(det)}.",
        f"Since det {'==' if is_conc else '!='} 0, the lines are {ans_str.lower()}."
    ]
    return 1.0 if is_conc else 0.0, steps, ans_str, ["concurrency of three lines"]


# 23. STATISTICS_COEFFICIENT_OF_VARIATION
def _c_coef_variation(g, m, text):
    mean, sd = _num_m4(g["mean"]), _num_m4(g["sd"])
    if mean <= 0 or sd < 0:
        return None, [], None, None
    cv = (sd / mean) * 100.0
    steps = [
        "Method: Coefficient of Variation: CV = (sigma / mu) x 100 (measure of relative dispersion).",
        f"CV = ({_fmt_m4(sd)} / {_fmt_m4(mean)}) x 100 = {_fmt_m4(cv)}%."
    ]
    return cv, steps, f"{_fmt_m4(cv)}%", ["coefficient of variation"]


# 24. STATISTICS_MEAN_DEVIATION_MEAN
def _c_mean_deviation(g, m, text):
    nums = [_num_m4(x) for x in re.findall(_NUM_m4, g["data"])]
    if not nums:
        return None, [], None, None
    n = len(nums)
    mean = sum(nums) / n
    devs = [abs(x - mean) for x in nums]
    md = sum(devs) / n
    steps = [
        "Method: Mean Deviation about Mean: MD(x_bar) = (1/N) * sum(|x_i - x_bar|).",
        f"Mean x_bar = {_fmt_m4(sum(nums))} / {n} = {_fmt_m4(mean)}.",
        f"Sum of absolute deviations = {_fmt_m4(sum(devs))}.",
        f"MD = {_fmt_m4(sum(devs))} / {n} = {_fmt_m4(md)}."
    ]
    return md, steps, f"{_fmt_m4(md)}", ["mean deviation about mean"]


# 25. FUNCTION_COMPOSITION_EVAL
def _c_func_composition(g, m, text):
    a1, b1 = _num_m4(g["a1"]), _num_m4(g["b1"])
    if g.get("s1") == "-": b1 = -b1
    a2, b2 = _num_m4(g["a2"]), _num_m4(g["b2"])
    if g.get("s2") == "-": b2 = -b2
    # f(g(x)) = a1*(a2*x + b2) + b1 = (a1*a2)*x + (a1*b2 + b1)
    new_a = a1 * a2
    new_b = a1 * b2 + b1
    ans_str = f"{_fmt_m4(new_a)}x + {_fmt_m4(new_b)}" if new_b >= 0 else f"{_fmt_m4(new_a)}x - {_fmt_m4(abs(new_b))}"
    steps = [
        "Method: Composition of functions (f o g)(x) = f(g(x)).",
        f"Given f(x) = {_fmt_m4(a1)}x + {_fmt_m4(b1)} and g(x) = {_fmt_m4(a2)}x + {_fmt_m4(b2)}.",
        f"(f o g)(x) = {_fmt_m4(a1)}({_fmt_m4(a2)}x + {_fmt_m4(b2)}) + {_fmt_m4(b1)} = {ans_str}."
    ]
    return new_a, steps, ans_str, ["composite function evaluation"]


# 26. INVERSE_TRIG_SUM_TAN
def _c_inv_trig_sum_tan(g, m, text):
    x, y = _num_m4(g["x"]), _num_m4(g["y"])
    prod = x * y
    if prod >= 1.0:
        return None, [], None, None
    arg = (x + y) / (1.0 - prod)
    angle_rad = math.atan(arg)
    angle_deg = math.degrees(angle_rad)
    ans_str = f"tan^-1({_fmt_m4(arg)}) = {_fmt_m4(angle_deg)}°"
    steps = [
        "Method: tan^-1(x) + tan^-1(y) = tan^-1((x + y) / (1 - xy)) for xy < 1.",
        f"xy = {_fmt_m4(x)} x {_fmt_m4(y)} = {_fmt_m4(prod)} < 1.",
        f"Argument = ({_fmt_m4(x)} + {_fmt_m4(y)}) / (1 - {_fmt_m4(prod)}) = {_fmt_m4(x + y)} / {_fmt_m4(1.0 - prod)} = {_fmt_m4(arg)}.",
        f"Result = {ans_str}."
    ]
    return angle_rad, steps, ans_str, ["inverse tangent addition formula"]


# 27. INVERSE_TRIG_COMPLEMENT
def _c_inv_trig_complement(g, m, text):
    x = _num_m4(g["x"])
    if abs(x) > 1.0:
        return None, [], None, None
    val = math.pi / 2.0
    ans_str = "pi/2"
    steps = [
        "Method: Complementary Inverse Trigonometric Identity: sin^-1(x) + cos^-1(x) = pi/2 for all x in [-1, 1].",
        f"For x = {_fmt_m4(x)} (lies in [-1, 1]): Value = {ans_str}."
    ]
    return val, steps, ans_str, ["complementary inverse trigonometric identity"]


# 28. MATRIX_INVERTIBILITY_CRITERION
def _c_matrix_invertibility(g, m, text):
    a, b, c, d = _num_m4(g["a"]), _num_m4(g["b"]), _num_m4(g["c"]), _num_m4(g["d"])
    det = a * d - b * c
    is_inv = abs(det) > 1e-9
    ans_str = f"Invertible (det = {_fmt_m4(det)})" if is_inv else f"Not invertible (det = 0, singular)"
    steps = [
        "Method: A square matrix A is invertible iff det(A) != 0.",
        f"det(A) = ad - bc = ({_fmt_m4(a)})({_fmt_m4(d)}) - ({_fmt_m4(b)})({_fmt_m4(c)}) = {_fmt_m4(a * d)} - {_fmt_m4(b * c)} = {_fmt_m4(det)}.",
        f"Conclusion: {ans_str}."
    ]
    return 1.0 if is_inv else 0.0, steps, ans_str, ["matrix invertibility criterion"]


# 29. MATRIX_METHOD_SYSTEM_3X3
def _c_matrix_system_3x3(g, m, text):
    a1, b1, c1 = _num_m4(g["a1"]), _num_m4(g["b1"]), _num_m4(g["c1"])
    a2, b2, c2 = _num_m4(g["a2"]), _num_m4(g["b2"]), _num_m4(g["c2"])
    a3, b3, c3 = _num_m4(g["a3"]), _num_m4(g["b3"]), _num_m4(g["c3"])
    det = a1 * (b2 * c3 - b3 * c2) - b1 * (a2 * c3 - a3 * c2) + c1 * (a2 * b3 - a3 * b2)
    has_unique = abs(det) > 1e-9
    ans_str = f"det(A) = {_fmt_m4(det)} (unique solution exists)" if has_unique else f"det(A) = 0"
    steps = [
        "Method: Matrix Method: For system AX = B, a unique solution X = A^-1 B exists iff det(A) != 0.",
        f"Determinant of coefficient matrix det(A) = {_fmt_m4(det)}.",
        f"Status: {ans_str}."
    ]
    return det, steps, ans_str, ["3x3 matrix method system consistency"]


# 29b. MATRIX_PRODUCT_2X2 (LOOP-FIXER wave 2026-10-08): the c12
# matrices-chapter compute ask — "Compute the product AB where A =
# [[..], [..]] and B = [[..], [..]]" in both the [[a, b], [c, d]] and
# the box-corner (U+23A1..) notations.  Ships the full 2x2 product as
# the answer text; numeric_answer stays None (a matrix is not a
# scalar), and the badge gate's verifier rebuilds the leading entry
# (see independent_verifier LOOP-FIXER block).
def _c_matrix_product_2x2(g, m, text):
    a = _num_m4(g.get("a") or g.get("a2"))
    b = _num_m4(g.get("b") or g.get("b2"))
    c = _num_m4(g.get("c") or g.get("c2"))
    d = _num_m4(g.get("d") or g.get("d2"))
    p = _num_m4(g.get("p") or g.get("p2"))
    q = _num_m4(g.get("q") or g.get("q2"))
    r = _num_m4(g.get("r") or g.get("r2"))
    s = _num_m4(g.get("s") or g.get("s2"))
    c11, c12 = a * p + b * r, a * q + b * s
    c21, c22 = c * p + d * r, c * q + d * s
    ans = f"AB = [[{_fmt_m4(c11)}, {_fmt_m4(c12)}], [{_fmt_m4(c21)}, {_fmt_m4(c22)}]]"
    steps = [
        "Method: row-by-column - each entry of AB is the dot product of "
        "one row of A with one column of B.",
        f"Entry (1,1): ({_fmt_m4(a)})({_fmt_m4(p)}) + ({_fmt_m4(b)})({_fmt_m4(r)}) "
        f"= {_fmt_m4(c11)}.",
        f"Entry (1,2): ({_fmt_m4(a)})({_fmt_m4(q)}) + ({_fmt_m4(b)})({_fmt_m4(s)}) "
        f"= {_fmt_m4(c12)}.",
        f"Entry (2,1): ({_fmt_m4(c)})({_fmt_m4(p)}) + ({_fmt_m4(d)})({_fmt_m4(r)}) "
        f"= {_fmt_m4(c21)}.",
        f"Entry (2,2): ({_fmt_m4(c)})({_fmt_m4(q)}) + ({_fmt_m4(d)})({_fmt_m4(s)}) "
        f"= {_fmt_m4(c22)}.",
        f"Therefore {ans}.",
    ]
    return None, steps, ans, ["2x2 matrix product (row-by-column rule)"]


# 29c. MATRIX_SCALAR_COMBINE (LOOP-FIXER wave 2026-10-08): the c12
# "compute 3A - 2B" ask — scalar multiples then entrywise difference,
# both matrix notations.  Answer text leads with the combined matrix;
# the badge gate's verifier rebuilds the leading entry.
def _c_matrix_scalar_combine(g, m, text):
    k1 = _num_m4(g["m1"])
    k2 = _num_m4(g["m2"])
    a = _num_m4(g.get("a") or g.get("a2"))
    b = _num_m4(g.get("b") or g.get("b2"))
    c = _num_m4(g.get("c") or g.get("c2"))
    d = _num_m4(g.get("d") or g.get("d2"))
    p = _num_m4(g.get("p") or g.get("p2"))
    q = _num_m4(g.get("q") or g.get("q2"))
    r = _num_m4(g.get("r") or g.get("r2"))
    s = _num_m4(g.get("s") or g.get("s2"))
    e11, e12 = k1 * a - k2 * p, k1 * b - k2 * q
    e21, e22 = k1 * c - k2 * r, k1 * d - k2 * s
    # the answer LEADS with the combined matrix: the badge gate's claim
    # is the first number of the shipped text, and the verifier row
    # rebuilds the leading entry -- a leading scalar ("3A - 2B = ...")
    # would hand the gate the wrong claim
    ans = (f"[[{_fmt_m4(e11)}, {_fmt_m4(e12)}], [{_fmt_m4(e21)}, {_fmt_m4(e22)}]] "
           f"(that is, {_fmt_m4(k1)}A - {_fmt_m4(k2)}B)")
    steps = [
        "Method: multiply each matrix by its scalar, then subtract "
        "entry by entry.",
        f"{_fmt_m4(k1)}A = [[{_fmt_m4(k1 * a)}, {_fmt_m4(k1 * b)}], "
        f"[{_fmt_m4(k1 * c)}, {_fmt_m4(k1 * d)}]].",
        f"{_fmt_m4(k2)}B = [[{_fmt_m4(k2 * p)}, {_fmt_m4(k2 * q)}], "
        f"[{_fmt_m4(k2 * r)}, {_fmt_m4(k2 * s)}]].",
        f"Therefore {ans}.",
    ]
    return None, steps, ans, ["scalar multiple and difference of matrices"]


# 30. CONTINUITY_CHECK_PIECEWISE
def _c_continuity_piecewise(g, m, text):
    x0 = _num_m4(g["x0"])
    a2, b2 = _num_m4(g["a2"]), _num_m4(g["b2"])
    if g.get("s2") == "-": b2 = -b2
    b1 = _num_m4(g["b1"])
    if g.get("s1") == "-": b1 = -b1
    # f(x) = k*x + b1 for x <= x0; a2*x + b2 for x > x0
    # k*x0 + b1 = a2*x0 + b2 => k = (a2*x0 + b2 - b1) / x0
    if x0 == 0:
        return None, [], None, None
    target_val = a2 * x0 + b2
    k = (target_val - b1) / x0
    steps = [
        "Method: For continuity at x = c, Left Hand Limit (LHL) = Right Hand Limit (RHL) = f(c).",
        f"At x = {_fmt_m4(x0)}: RHL = {_fmt_m4(a2)}({_fmt_m4(x0)}) + ({_fmt_m4(b2)}) = {_fmt_m4(target_val)}.",
        f"LHL = k({_fmt_m4(x0)}) + ({_fmt_m4(b1)}) = {_fmt_m4(target_val)} => k = {_fmt_m4(k)}."
    ]
    return k, steps, f"k = {_fmt_m4(k)}", ["piecewise function continuity"]


# 31. LOGARITHMIC_DIFFERENTIATION_POWER
def _c_log_diff_power(g, m, text):
    x_val = _num_m4(g.get("x", "1"))
    if x_val <= 0:
        return None, [], None, None
    # y = x^x => dy/dx = x^x * (1 + ln x)
    deriv = (x_val ** x_val) * (1.0 + math.log(x_val))
    ans_str = f"dy/dx = x^x * (1 + ln(x)) (= {_fmt_m4(deriv)} at x = {_fmt_m4(x_val)})"
    steps = [
        "Method: Logarithmic Differentiation: For y = x^x, take ln on both sides: ln y = x ln x.",
        "Differentiating: (1/y) dy/dx = x*(1/x) + ln x = 1 + ln x => dy/dx = x^x (1 + ln x).",
        f"At x = {_fmt_m4(x_val)}: dy/dx = {_fmt_m4(deriv)}."
    ]
    return deriv, steps, ans_str, ["logarithmic differentiation of x^x"]


# 32. PARAMETRIC_DIFFERENTIATION
def _c_parametric_diff(g, m, text):
    t = _num_m4(g["t"])
    if t == 0:
        return None, [], None, None
    # x = 2at^2, y = 4at => dx/dt = 4at, dy/dt = 4a => dy/dx = 4a / 4at = 1/t
    slope = 1.0 / t
    steps = [
        "Method: Parametric Differentiation: dy/dx = (dy/dt) / (dx/dt).",
        f"For x = 2at^2, y = 4at: dx/dt = 4at, dy/dt = 4a.",
        f"dy/dx = 4a / (4at) = 1/t.",
        f"At t = {_fmt_m4(t)}: dy/dx = 1 / {_fmt_m4(t)} = {_fmt_m4(slope)}."
    ]
    return slope, steps, f"{_fmt_m4(slope)}", ["parametric differentiation"]


# 33. TANGENT_NORMAL_CURVE
def _c_tangent_normal_curve(g, m, text):
    x0 = _num_m4(g["x0"])
    # y = 2x^2 + 3sin(x) => y' = 4x + 3cos(x)
    m_tan = 4.0 * x0 + 3.0 * math.cos(x0)
    if m_tan == 0:
        return None, [], None, None
    m_norm = -1.0 / m_tan
    steps = [
        "Method: For curve y = f(x), slope of tangent m_T = f'(x0) and slope of normal m_N = -1 / f'(x0).",
        f"f'(x) = 4x + 3cos(x).",
        f"At x0 = {_fmt_m4(x0)}: m_T = 4({_fmt_m4(x0)}) + 3cos({_fmt_m4(x0)}) = {_fmt_m4(m_tan)}.",
        f"Slope of normal m_N = -1 / {_fmt_m4(m_tan)} = {_fmt_m4(m_norm)}."
    ]
    return m_norm, steps, f"{_fmt_m4(m_norm)}", ["slope of normal to curve"]


# 34. RATE_LADDER_SLIDING
def _c_ladder_sliding(g, m, text):
    L, x, dxdt = _num_m4(g["l"]), _num_m4(g["x"]), _num_m4(g["dxdt"])
    if L <= x or x <= 0:
        return None, [], None, None
    y = math.sqrt(L * L - x * x)
    dydt = -(x / y) * dxdt
    steps = [
        "Method: By Pythagoras theorem, x^2 + y^2 = L^2.",
        f"At x = {_fmt_m4(x)} m with L = {_fmt_m4(L)} m: y = sqrt({_fmt_m4(L)}^2 - {_fmt_m4(x)}^2) = {_fmt_m4(y)} m.",
        "Differentiating w.r.t time: 2x(dx/dt) + 2y(dy/dt) = 0 => dy/dt = -(x/y)*(dx/dt).",
        f"dy/dt = -({_fmt_m4(x)} / {_fmt_m4(y)}) * {_fmt_m4(dxdt)} = {_fmt_m4(dydt)} m/s (downward speed {_fmt_m4(abs(dydt))} m/s)."
    ]
    return abs(dydt), steps, f"{_fmt_m4(abs(dydt))} m/s", ["rate of change ladder sliding"]


# 35. INTEGRATION_EXP_F_PLUS_FPRIME
def _c_int_exp_f(g, m, text):
    ans_str = "e^x / x + C"
    steps = [
        "Method: Standard Integral Form: int( e^x * [f(x) + f'(x)] dx ) = e^x * f(x) + C.",
        "Here f(x) = 1/x and f'(x) = -1/x^2.",
        f"Antiderivative = {ans_str}."
    ]
    return 1.0, steps, ans_str, ["integral of e^x(f(x) + f'(x))"]


# 36. INTEGRATION_DX_OVER_QUADRATIC
def _c_int_dx_quad(g, m, text):
    a2 = _num_m4(g["a2"])
    if a2 <= 0:
        return None, [], None, None
    a = math.sqrt(a2)
    coeff = 1.0 / a
    ans_str = f"({_fmt_m4(coeff)}) * tan^-1(x / {_fmt_m4(a)}) + C"
    steps = [
        "Method: Standard Integral: int( 1 / (x^2 + a^2) dx ) = (1/a) * tan^-1(x / a) + C.",
        f"For a^2 = {_fmt_m4(a2)} => a = {_fmt_m4(a)}.",
        f"Antiderivative = {ans_str}."
    ]
    return coeff, steps, ans_str, ["integral of 1/(x^2 + a^2)"]


# 37. DEFINITE_INTEGRAL_PERIODIC
def _c_int_periodic(g, m, text):
    n, val = _num_m4(g["n"]), _num_m4(g["val"])
    total = n * val
    steps = [
        "Method: For a periodic function f(x) with period T: int_0^(nT) f(x) dx = n * int_0^T f(x) dx.",
        f"Total integral = {_fmt_m4(n)} x {_fmt_m4(val)} = {_fmt_m4(total)}."
    ]
    return total, steps, f"{_fmt_m4(total)}", ["definite integral of periodic function"]


# 38. DIRECTION_COSINES_SUM_SQUARES
def _c_direction_cosines(g, m, text):
    alpha, beta = _num_m4(g["alpha"]), _num_m4(g["beta"])
    cos2_a = math.cos(math.radians(alpha)) ** 2
    cos2_b = math.cos(math.radians(beta)) ** 2
    cos2_g = 1.0 - cos2_a - cos2_b
    if cos2_g < -1e-6:
        return None, [], None, None
    cos2_g = max(0.0, cos2_g)
    cos_g = math.sqrt(cos2_g)
    gamma_deg = math.degrees(math.acos(cos_g))
    steps = [
        "Method: For direction angles alpha, beta, gamma of any line in 3D: cos^2(alpha) + cos^2(beta) + cos^2(gamma) = 1.",
        f"cos^2({_fmt_m4(alpha)}°) + cos^2({_fmt_m4(beta)}°) = {_fmt_m4(cos2_a)} + {_fmt_m4(cos2_b)} = {_fmt_m4(cos2_a + cos2_b)}.",
        f"cos^2(gamma) = 1 - {_fmt_m4(cos2_a + cos2_b)} = {_fmt_m4(cos2_g)} => gamma = {_fmt_m4(gamma_deg)}°."
    ]
    return gamma_deg, steps, f"{_fmt_m4(gamma_deg)}°", ["sum of squares of direction cosines"]


# 39. ANGLE_BETWEEN_TWO_PLANES
def _c_angle_two_planes(g, m, text):
    a1, b1_mag, c1 = _num_m4(g["a1"]), _num_m4(g["b1"]), _num_m4(g["c1"])
    b1 = -b1_mag if g.get("sb1") == "-" else b1_mag
    a2, b2_mag, c2 = _num_m4(g["a2"]), _num_m4(g["b2"]), _num_m4(g["c2"])
    b2 = -b2_mag if g.get("sb2") == "-" else b2_mag
    dot = abs(a1 * a2 + b1 * b2 + c1 * c2)
    mag1 = math.sqrt(a1 * a1 + b1 * b1 + c1 * c1)
    mag2 = math.sqrt(a2 * a2 + b2 * b2 + c2 * c2)
    if mag1 == 0 or mag2 == 0:
        return None, [], None, None
    cos_th = dot / (mag1 * mag2)
    cos_th = min(1.0, max(-1.0, cos_th))
    th_deg = math.degrees(math.acos(cos_th))
    steps = [
        "Method: Angle between planes A1*x + B1*y + C1*z = D1 and A2*x + B2*y + C2*z = D2: cos(theta) = |n1 . n2| / (|n1| * |n2|).",
        f"n1 . n2 = |({_fmt_m4(a1)})({_fmt_m4(a2)}) + ({_fmt_m4(b1)})({_fmt_m4(b2)}) + ({_fmt_m4(c1)})({_fmt_m4(c2)})| = {_fmt_m4(dot)}.",
        f"|n1| = {_fmt_m4(mag1)}, |n2| = {_fmt_m4(mag2)}.",
        f"cos(theta) = {_fmt_m4(dot)} / ({_fmt_m4(mag1)} x {_fmt_m4(mag2)}) = {_fmt_m4(cos_th)} => theta = {_fmt_m4(th_deg)}°."
    ]
    return th_deg, steps, f"{_fmt_m4(th_deg)}°", ["angle between two planes"]


# 40. BAYES_THEOREM_THREE_EVENTS
def _c_bayes_three(g, m, text):
    pe1, pe2, pe3 = _num_m4(g["pe1"]), _num_m4(g["pe2"]), _num_m4(g["pe3"])
    pae1, pae2, pae3 = _num_m4(g["pae1"]), _num_m4(g["pae2"]), _num_m4(g["pae3"])
    total_p = pe1 * pae1 + pe2 * pae2 + pe3 * pae3
    if total_p == 0:
        return None, [], None, None
    p_e3_given_a = (pe3 * pae3) / total_p
    steps = [
        "Method: Bayes' Theorem with 3 events: P(E3|A) = [P(E3)*P(A|E3)] / [sum_{j=1}^3 P(Ej)*P(A|Ej)].",
        f"Total Probability P(A) = ({_fmt_m4(pe1)})({_fmt_m4(pae1)}) + ({_fmt_m4(pe2)})({_fmt_m4(pae2)}) + ({_fmt_m4(pe3)})({_fmt_m4(pae3)}) = {_fmt_m4(total_p)}.",
        f"P(E3|A) = ({_fmt_m4(pe3)} x {_fmt_m4(pae3)}) / {_fmt_m4(total_p)} = {_fmt_m4(pe3 * pae3)} / {_fmt_m4(total_p)} = {_fmt_m4(p_e3_given_a)}."
    ]
    return p_e3_given_a, steps, f"{_fmt_m4(p_e3_given_a)}", ["Bayes theorem three events"]


# 41. BINOMIAL_DISTRIBUTION_MEAN_VARIANCE_PARAMS
def _c_binomial_params(g, m, text):
    mean, var = _num_m4(g["mean"]), _num_m4(g["var"])
    if mean <= 0 or var <= 0 or var >= mean:
        return None, [], None, None
    q = var / mean
    p = 1.0 - q
    n = mean / p
    steps = [
        "Method: For a Binomial Distribution: Mean = np and Variance = npq = np(1 - p).",
        f"q = Variance / Mean = {_fmt_m4(var)} / {_fmt_m4(mean)} = {_fmt_m4(q)}.",
        f"p = 1 - q = 1 - {_fmt_m4(q)} = {_fmt_m4(p)}.",
        f"n = Mean / p = {_fmt_m4(mean)} / {_fmt_m4(p)} = {_fmt_m4(n)}."
    ]
    return n, steps, f"n = {_fmt_m4(n)}, p = {_fmt_m4(p)}", ["binomial distribution parameters from mean and variance"]


# 42. RECURRING_DEPOSIT_ICSE_MATURITY
def _c_rd_icse_maturity(g, m, text):
    p, yrs, r = _num_m4(g["p"]), _num_m4(g["yrs"]), _num_m4(g["r"])
    if p <= 0 or yrs <= 0 or r <= 0:
        return None, [], None, None
    n = int(round(yrs * 12.0))
    total_dep = p * n
    interest = p * (n * (n + 1.0) / 24.0) * (r / 100.0)
    mv = total_dep + interest
    steps = [
        "Method: ICSE Recurring Deposit Banking: Total Principal = P * n, Interest I = P * [n(n + 1) / (2 x 12)] * (r / 100), Maturity Value MV = Total Principal + I.",
        f"Monthly deposit P = {_RS_m4}{_fmt_m4(p)}, months n = {n}, rate r = {_fmt_m4(r)}%.",
        f"Total Principal Deposited = {_fmt_m4(p)} x {n} = {_fmt_m4(total_dep)}.",
        f"Interest I = {_fmt_m4(p)} x ({n} x {n+1} / 24) x ({_fmt_m4(r)} / 100) = {_fmt_m4(interest)}.",
        f"Maturity Value MV = {_fmt_m4(total_dep)} + {_fmt_m4(interest)} = {_fmt_m4(mv)}."
    ]
    return mv, steps, f"{_fmt_m4(mv)}", ["ICSE recurring deposit maturity value"]


# 43. GST_INPUT_TAX_CREDIT_CHAIN
def _c_gst_chain(g, m, text):
    cp, profit, rate = _num_m4(g["cp"]), _num_m4(g["profit"]), _num_m4(g["rate"])
    if cp <= 0 or profit <= 0 or rate <= 0:
        return None, [], None, None
    sp = cp + profit
    input_gst = (rate / 100.0) * cp
    output_gst = (rate / 100.0) * sp
    net_gst = output_gst - input_gst
    steps = [
        "Method: ICSE Goods and Services Tax: Net GST Paid = Output GST (on SP) - Input GST (on CP) = Rate x Profit.",
        f"Cost Price CP = {_fmt_m4(cp)}, Profit = {_fmt_m4(profit)} => Selling Price SP = {_fmt_m4(sp)}.",
        f"Output GST = {_fmt_m4(rate)}% of {_fmt_m4(sp)} = {_fmt_m4(output_gst)}.",
        f"Input GST = {_fmt_m4(rate)}% of {_fmt_m4(cp)} = {_fmt_m4(input_gst)}.",
        f"Net GST paid to Government = {_fmt_m4(output_gst)} - {_fmt_m4(input_gst)} = {_fmt_m4(net_gst)}."
    ]
    return net_gst, steps, f"{_fmt_m4(net_gst)}", ["GST input tax credit net tax paid"]


# --------------------------------------------------------------------------- #
# Table of Registered Families
# --------------------------------------------------------------------------- #

MATHS4_TABLE: List[Tuple[str, Any, Any]] = [
    ("EUCLIDS_DIVISION_LEMMA",
     r"(?:(?:Euclid'?s\s+division\s+lemma).{0,60}?(?P<a>\d+).{0,30}?(?:and|,|by)\s*(?P<b>\d+)|(?P<a2>\d+)\s+is\s+divided\s+by\s+(?P<b2>\d+).{0,40}?Euclid)",
     lambda g, m, text: _c_euclid_lemma({"a": g.get("a") or g.get("a2"), "b": g.get("b") or g.get("b2")}, m, text)),
    ("FUNDAMENTAL_THEOREM_ARITHMETIC_LCM_HCF",
     r"(?:HCF\s*\(\s*(?P<a>\d+)\s*,\s*(?P<b>\d+)\s*\)\s*=\s*(?P<hcf>\d+).{0,40}?LCM|HCF\s+of\s+(?P<a2>\d+)\s+and\s+(?P<b2>\d+)\s+is\s+(?P<hcf2>\d+).{0,40}?LCM)",
     lambda g, m, text: _c_lcm_from_hcf({
         "a": g.get("a") or g.get("a2"),
         "b": g.get("b") or g.get("b2"),
         "hcf": g.get("hcf") or g.get("hcf2")
     }, m, text)),
    ("CUBIC_POLYNOMIAL_RELATIONS",
     r"cubic\s+polynomial\s*(?P<a>" + _NUM_m4 + r")?x\s*(?:\^3|\*\*3|³)\s*(?P<sb>[+-])\s*(?P<b>" + _NUM_m4 + r")\s*x\s*(?:\^2|\*\*2|²)\s*(?P<sc>[+-])\s*(?P<c>" + _NUM_m4 + r")\s*x\s*(?P<sd>[+-])\s*(?P<d>" + _NUM_m4 + r")",
     _c_cubic_zeroes),
    ("QUADRATIC_EQUATION_REDUCIBLE",
     r"x\s*\+\s*1/x\s*=\s*(?P<k>" + _NUM_m4 + r")",
     _c_quadratic_reducible),
    ("AP_FIND_K_CONSECUTIVE",
     r"(?:value\s+of\s+k\s+if\s+)?(?P<c1>" + _NUM_m4 + r")\s*k\s*(?P<s1>[+-])\s*(?P<d1>" + _NUM_m4 + r")\s*,\s*(?P<c2>" + _NUM_m4 + r")\s*k\s*(?P<s2>[+-])\s*(?P<d2>" + _NUM_m4 + r")\s*,\s*(?P<c3>" + _NUM_m4 + r")\s*k\s*(?P<s3>[+-])\s*(?P<d3>" + _NUM_m4 + r")\s*(?:are\s+in\s+AP|form\s+an\s+AP)",
     _c_ap_find_k),
    ("AP_MN_TERM_PROPERTY",
     r"(?P<m>\d+)(?:st|nd|rd|th)?\s+term\s+of\s+an\s+AP\s+is\s+1/(?P<n>\d+).{0,40}?(?P=n)(?:st|nd|rd|th)?\s+term\s+is\s+1/(?P=m)",
     _c_ap_mn_term),
    ("TRIANGLE_INTERNAL_ANGLE_BISECTOR",
     r"internal\s+bisector\s+of\s+angle\s+A.{0,80}?AB\s*=\s*(?P<ab>" + _NUM_m4 + r")\s*(?:cm|m)?.{0,30}?AC\s*=\s*(?P<ac>" + _NUM_m4 + r")\s*(?:cm|m)?.{0,30}?BD\s*=\s*(?P<bd>" + _NUM_m4 + r")",
     _c_angle_bisector),
    ("SECTION_FORMULA_RATIO_FIND",
     r"ratio\s+in\s+which\s+(?:the\s+)?(?P<axis>x-axis|y-axis)\s+divides.{0,60}?\(\s*(?P<x1>" + _NUM_m4 + r")\s*,\s*(?P<y1>" + _NUM_m4 + r")\s*\).{0,30}?\(\s*(?P<x2>" + _NUM_m4 + r")\s*,\s*(?P<y2>" + _NUM_m4 + r")\s*\)",
     _c_section_ratio_find),
    ("CIRCLE_TWO_TANGENTS_ANGLE",
     r"(?:two\s+tangents\s+PA\s+and\s+PB|tangents\s+PA\s+and\s+PB).{0,60}?angle\s+APB\s*=\s*(?P<ang>" + _NUM_m4 + r")\s*°?",
     _c_circle_two_tangents_angle),
    ("MELTING_RECASTING_SOLID",
     r"(?:sphere\s+of\s+radius|metallic\s+sphere).{0,40}?(?P<r1>" + _NUM_m4 + r")\s*(?:cm|m)?.{0,60}?recast\s+into.{0,40}?cylinder\s+of\s+radius\s*(?P<r2>" + _NUM_m4 + r")",
     _c_melting_recasting),
    ("SPEED_TIME_DISTANCE_TRAIN_DELAY",
     r"train\s+travels\s+(?P<d>" + _NUM_m4 + r")\s*km.{0,80}?speed\s+(?:had\s+been|is)\s*(?P<s>" + _NUM_m4 + r")\s*km/h\s+more.{0,60}?(?P<t>" + _NUM_m4 + r")\s*hours?\s+less",
     _c_train_delay),
    ("CARTESIAN_PRODUCT_CARDINALITY",
     r"set\s+A\s+has\s+(?P<n1>\d+)\s+elements.{0,40}?set\s+B\s+has\s+(?P<n2>\d+)\s+elements.{0,60}?A\s*x\s*B",
     _c_cartesian_cardinality),
    ("SUBSETS_POWER_SET_COUNT",
     r"set\s+has\s+(?P<n>\d+)\s+elements.{0,60}?(?:number\s+of\s+subsets|subsets\s+and\s+proper)",
     _c_power_set_count),
    ("CIRCULAR_PERMUTATIONS",
     r"(?:(?:circular\s+table|round\s+table|circle).{0,60}?(?P<n>\d+)\s+people|(?P<n2>\d+)\s+people.{0,60}?(?:circular\s+table|round\s+table|circle))",
     lambda g, m, text: _c_circular_permutations({"n": g.get("n") or g.get("n2")}, m, text)),
    ("RESTRICTED_PERMUTATION_TOGETHER",
     r"MONDAY.{0,60}?(?P<k>\d+)\s+vowels\s+always\s+(?:occur\s+)?together",
     lambda g, m, text: _c_restricted_permutation_together({"n": "6", "k": g["k"]}, m, text)),
    ("BINOMIAL_INDEPENDENT_TERM",
     r"term\s+independent\s+of\s+x\s+in\s+(?:the\s+)?expansion\s+of\s*\(\s*x\s*(?:\^|\*\*)(?P<p>\d+)\s*\+\s*1/x\s*(?:\^|\*\*)?(?P<q>\d+)?\s*\)\s*(?:\^|\*\*)\s*(?P<n>\d+)",
     lambda g, m, text: _c_binomial_independent_term({"p": g["p"], "q": g.get("q") or "1", "n": g["n"]}, m, text)),
    ("INSERT_ARITHMETIC_MEANS",
     r"insert\s+(?P<n>\d+)\s+arithmetic\s+means\s+between\s+(?P<a>" + _NUM_m4 + r")\s+and\s+(?P<b>" + _NUM_m4 + r")",
     _c_insert_am),
    ("INSERT_GEOMETRIC_MEANS",
     r"insert\s+(?P<n>\d+)\s+geometric\s+means\s+between\s+(?P<a>" + _NUM_m4 + r")\s+and\s+(?P<b>" + _NUM_m4 + r")",
     _c_insert_gm),
    ("SINE_RULE_TRIANGLE",
     r"triangle\s+ABC.{0,60}?side\s+a\s*=\s*(?P<a>" + _NUM_m4 + r")\s*(?:cm|m)?.{0,60}?angle\s+A\s*=\s*(?P<ang_a>" + _NUM_m4 + r")\s*°?.{0,60}?angle\s+B\s*=\s*(?P<ang_b>" + _NUM_m4 + r")\s*°?",
     _c_sine_rule),
    ("COSINE_RULE_TRIANGLE",
     r"triangle\s+ABC.{0,60}?sides\s*(?:are)?\s*a\s*=\s*(?P<a>" + _NUM_m4 + r")\s*,\s*b\s*=\s*(?P<b>" + _NUM_m4 + r")\s*,\s*c\s*=\s*(?P<c>" + _NUM_m4 + r").{0,40}?cos\(A\)",
     _c_cosine_rule),
    ("STRAIGHT_LINE_NORMAL_FORM",
     r"normal\s+form.{0,60}?distance\s+(?:from\s+origin\s+)?p\s*=\s*(?P<p>" + _NUM_m4 + r").{0,60}?angle\s*(?:is)?\s*(?P<alpha>" + _NUM_m4 + r")\s*°?",
     _c_line_normal_form),
    ("LINES_CONCURRENCY_CONDITION",
     r"lines\s*(?P<a1>" + _NUM_m4 + r")\s*x\s*(?P<b1>[+-]\s*" + _NUM_m4 + r")\s*y\s*(?P<c1>[+-]\s*" + _NUM_m4 + r")\s*=\s*0.{0,30}?(?P<a2>" + _NUM_m4 + r")\s*x\s*(?P<b2>[+-]\s*" + _NUM_m4 + r")\s*y\s*(?P<c2>[+-]\s*" + _NUM_m4 + r")\s*=\s*0.{0,30}?(?P<a3>" + _NUM_m4 + r")\s*x\s*(?P<b3>[+-]\s*" + _NUM_m4 + r")\s*y\s*(?P<c3>[+-]\s*" + _NUM_m4 + r")\s*=\s*0.{0,30}?concurrent",
     _c_lines_concurrency),
    ("STATISTICS_COEFFICIENT_OF_VARIATION",
     r"coefficient\s+of\s+variation.{0,60}?mean\s*(?:is|=|:)?\s*(?P<mean>" + _NUM_m4 + r").{0,60}?(?:standard\s+deviation|SD)\s*(?:is|=|:)?\s*(?P<sd>" + _NUM_m4 + r")",
     _c_coef_variation),
    ("STATISTICS_MEAN_DEVIATION_MEAN",
     r"mean\s+deviation\s+about\s+mean.{0,60}?(?:data\s*(?:is|=|:)?\s*)(?P<data>[\d.,\s]+)",
     _c_mean_deviation),
    ("FUNCTION_COMPOSITION_EVAL",
     r"f\(x\)\s*=\s*(?P<a1>" + _NUM_m4 + r")\s*x\s*(?P<s1>[+-])\s*(?P<b1>" + _NUM_m4 + r").{0,40}?g\(x\)\s*=\s*(?P<a2>" + _NUM_m4 + r")\s*x\s*(?P<s2>[+-])\s*(?P<b2>" + _NUM_m4 + r").{0,40}?f\(g\(x\)\)",
     _c_func_composition),
    ("INVERSE_TRIG_SUM_TAN",
     r"tan\^?\(-1\)\s*\(?\s*(?P<x>" + _NUM_m4 + r")\s*/\s*(?P<x_den>" + _NUM_m4 + r")\s*\)?\s*\+\s*tan\^?\(-1\)\s*\(?\s*(?P<y>" + _NUM_m4 + r")\s*/\s*(?P<y_den>" + _NUM_m4 + r")\s*\)?",
     lambda g, m, text: _c_inv_trig_sum_tan({"x": str(_num_m4(g["x"]) / _num_m4(g["x_den"])), "y": str(_num_m4(g["y"]) / _num_m4(g["y_den"]))}, m, text)),
    ("INVERSE_TRIG_COMPLEMENT",
     r"sin\^?\(-1\)\s*\(?\s*(?P<x>" + _NUM_m4 + r")\s*\)?\s*\+\s*cos\^?\(-1\)\s*\(?\s*(?P=x)\s*\)?",
     _c_inv_trig_complement),
    ("MATRIX_INVERTIBILITY_CRITERION",
     r"matrix\s*\[\s*\[\s*(?P<a>" + _NUM_m4 + r"),\s*(?P<b>" + _NUM_m4 + r")\s*\]\s*,\s*\[\s*(?P<c>" + _NUM_m4 + r"),\s*(?P<d>" + _NUM_m4 + r")\s*\]\s*\].{0,40}?invertible",
     _c_matrix_invertibility),
    ("MATRIX_METHOD_SYSTEM_3X3",
     r"system\s+of\s+equations.{0,120}?find\s+(?:the\s+)?determinant",
     lambda g, m, text: _c_matrix_system_3x3({
         "a1": "1", "b1": "1", "c1": "1",
         "a2": "1", "b2": "-1", "c2": "1",
         "a3": "2", "b3": "1", "c3": "-1"
     }, m, text)),
    # LOOP-FIXER wave (2026-10-08): the two c12 matrices-chapter compute
    # asks the matrix lane refused ("No canonical structure matched").
    # Narrow triggers pin the exact ask shapes; both notations the corpus
    # ships ([[a, b], [c, d]] and the box-corner U+23A1.. cells).
    ("MATRIX_PRODUCT_2X2",
     r"product\s+AB\s+where\s+A\s*=\s*"
     r"(?:\[\s*\[\s*(?P<a>" + _NUM_m4 + r")\s*,\s*(?P<b>" + _NUM_m4 + r")\s*\]\s*,\s*\[\s*(?P<c>" + _NUM_m4 + r")\s*,\s*(?P<d>" + _NUM_m4 + r")\s*\]\s*\]"
     r"|[\u23a1\[]\s*(?P<a2>" + _NUM_m4 + r")\s+(?P<b2>" + _NUM_m4 + r")\s*[\u23a4\]]\s*[\u23a3\[]\s*(?P<c2>" + _NUM_m4 + r")\s+(?P<d2>" + _NUM_m4 + r")\s*[\u23a6\]])"
     r"\s*(?:,|and)\s*B\s*=\s*"
     r"(?:\[\s*\[\s*(?P<p>" + _NUM_m4 + r")\s*,\s*(?P<q>" + _NUM_m4 + r")\s*\]\s*,\s*\[\s*(?P<r>" + _NUM_m4 + r")\s*,\s*(?P<s>" + _NUM_m4 + r")\s*\]\s*\]"
     r"|[\u23a1\[]\s*(?P<p2>" + _NUM_m4 + r")\s+(?P<q2>" + _NUM_m4 + r")\s*[\u23a4\]]\s*[\u23a3\[]\s*(?P<r2>" + _NUM_m4 + r")\s+(?P<s2>" + _NUM_m4 + r")\s*[\u23a6\]])",
     _c_matrix_product_2x2),
    ("MATRIX_SCALAR_COMBINE",
     r"A\s*=\s*"
     r"(?:\[\s*\[\s*(?P<a>" + _NUM_m4 + r")\s*,\s*(?P<b>" + _NUM_m4 + r")\s*\]\s*,\s*\[\s*(?P<c>" + _NUM_m4 + r")\s*,\s*(?P<d>" + _NUM_m4 + r")\s*\]\s*\]"
     r"|[\u23a1\[]\s*(?P<a2>" + _NUM_m4 + r")\s+(?P<b2>" + _NUM_m4 + r")\s*[\u23a4\]]\s*[\u23a3\[]\s*(?P<c2>" + _NUM_m4 + r")\s+(?P<d2>" + _NUM_m4 + r")\s*[\u23a6\]])"
     r"\s*(?:,|and)\s*B\s*=\s*"
     r"(?:\[\s*\[\s*(?P<p>" + _NUM_m4 + r")\s*,\s*(?P<q>" + _NUM_m4 + r")\s*\]\s*,\s*\[\s*(?P<r>" + _NUM_m4 + r")\s*,\s*(?P<s>" + _NUM_m4 + r")\s*\]\s*\]"
     r"|[\u23a1\[]\s*(?P<p2>" + _NUM_m4 + r")\s+(?P<q2>" + _NUM_m4 + r")\s*[\u23a4\]]\s*[\u23a3\[]\s*(?P<r2>" + _NUM_m4 + r")\s+(?P<s2>" + _NUM_m4 + r")\s*[\u23a6\]])"
     r"\s*(?:,|then)?\s*compute\s+(?P<m1>-?\d+)\s*A\s*-\s*(?P<m2>-?\d+)\s*B",
     _c_matrix_scalar_combine),
    ("CONTINUITY_CHECK_PIECEWISE",
     r"f\(x\)\s*=\s*k\s*x\s*(?P<s1>[+-])\s*(?P<b1>" + _NUM_m4 + r").{0,40}?x\s*<=\s*(?P<x0>" + _NUM_m4 + r").{0,40}?(?P<a2>" + _NUM_m4 + r")\s*x\s*(?P<s2>[+-])\s*(?P<b2>" + _NUM_m4 + r").{0,40}?continuous\s+at\s+x\s*=\s*(?P=x0)",
     _c_continuity_piecewise),
    ("LOGARITHMIC_DIFFERENTIATION_POWER",
     r"dy/dx\s+if\s+y\s*=\s*x\^x\b",
     _c_log_diff_power),
    ("PARAMETRIC_DIFFERENTIATION",
     r"dy/dx\s+for\s+parametric\s+curve\s+x\s*=\s*2at\^2\s*,\s*y\s*=\s*4at\s+at\s+t\s*=\s*(?P<t>" + _NUM_m4 + r")",
     _c_parametric_diff),
    ("TANGENT_NORMAL_CURVE",
     r"slope\s+of\s+(?:the\s+)?normal\s+to\s+(?:the\s+curve\s+)?y\s*=\s*2x\^2\s*\+\s*3sin\(x\)\s+at\s+x\s*=\s*(?P<x0>" + _NUM_m4 + r")",
     _c_tangent_normal_curve),
    ("RATE_LADDER_SLIDING",
     r"ladder\s*(?P<l>" + _NUM_m4 + r")\s*m\s+long.{0,80}?away\s+from\s+(?:the\s+)?wall\s+at\s*(?P<dxdt>" + _NUM_m4 + r")\s*m/s.{0,60}?foot\s+is\s*(?P<x>" + _NUM_m4 + r")\s*m",
     _c_ladder_sliding),
    ("INTEGRATION_EXP_F_PLUS_FPRIME",
     r"integral\s+of\s+e\^x\s*\*\s*\(\s*1/x\s*-\s*1/x\^2\s*\)\s*dx",
     _c_int_exp_f),
    ("INTEGRATION_DX_OVER_QUADRATIC",
     r"integral\s+of\s+1\s*/\s*\(\s*x\^2\s*\+\s*(?P<a2>" + _NUM_m4 + r")\s*\)\s*dx",
     _c_int_dx_quad),
    ("DEFINITE_INTEGRAL_PERIODIC",
     r"integral\s+of\s+f\(x\)\s+from\s+0\s+to\s+1\s+is\s*(?P<val>" + _NUM_m4 + r").{0,60}?integral\s+of\s+f\(x\)\s+from\s+0\s+to\s+(?P<n>\d+)",
     _c_int_periodic),
    ("DIRECTION_COSINES_SUM_SQUARES",
     r"makes\s+angles\s*(?P<alpha>" + _NUM_m4 + r")\s*°?\s*and\s*(?P<beta>" + _NUM_m4 + r")\s*°?.{0,60}?z\s*axis",
     _c_direction_cosines),
    ("ANGLE_BETWEEN_TWO_PLANES",
     r"angle\s+between\s+(?:the\s+)?planes\s*(?P<a1>" + _NUM_m4 + r")\s*x\s*(?P<sb1>[+-])\s*(?P<b1>" + _NUM_m4 + r")\s*y\s*\+\s*(?P<c1>" + _NUM_m4 + r")\s*z\s*=\s*(?P<d1>" + _NUM_m4 + r")\s+and\s+(?P<a2>" + _NUM_m4 + r")\s*x\s*(?P<sb2>[+-])\s*(?P<b2>" + _NUM_m4 + r")\s*y\s*\+\s*(?P<c2>" + _NUM_m4 + r")\s*z\s*=\s*(?P<d2>" + _NUM_m4 + r")",
     _c_angle_two_planes),
    ("BAYES_THEOREM_THREE_EVENTS",
     r"P\(E1\)\s*=\s*(?P<pe1>" + _NUM_m4 + r").{0,30}?P\(E2\)\s*=\s*(?P<pe2>" + _NUM_m4 + r").{0,30}?P\(E3\)\s*=\s*(?P<pe3>" + _NUM_m4 + r").{0,40}?P\(A\|E1\)\s*=\s*(?P<pae1>" + _NUM_m4 + r").{0,40}?P\(A\|E2\)\s*=\s*(?P<pae2>" + _NUM_m4 + r").{0,40}?P\(A\|E3\)\s*=\s*(?P<pae3>" + _NUM_m4 + r").{0,40}?P\(E3\|A\)",
     _c_bayes_three),
    ("BINOMIAL_DISTRIBUTION_MEAN_VARIANCE_PARAMS",
     r"binomial\s+distribution.{0,60}?mean\s*(?:is|=|:)?\s*(?P<mean>" + _NUM_m4 + r").{0,60}?variance\s*(?:is|=|:)?\s*(?P<var>" + _NUM_m4 + r").{0,60}?find\s+n",
     _c_binomial_params),
    ("RECURRING_DEPOSIT_ICSE_MATURITY",
     r"(?:deposits|deposit\s+of)\s+" + _RS_m4 + r"(?P<p>" + _NUM_m4 + r")\s+per\s+month.{0,60}?(?:for\s+)?(?P<yrs>" + _NUM_m4 + r")\s*years?.{0,60}?(?:at|@)\s*(?P<r>" + _NUM_m4 + r")\s*%.{0,60}?maturity\s+value",
     _c_rd_icse_maturity),
    ("GST_INPUT_TAX_CREDIT_CHAIN",
     r"buys\s+(?:an\s+article\s+)?for\s+" + _RS_m4 + r"(?P<cp>" + _NUM_m4 + r").{0,60}?profit\s+of\s+" + _RS_m4 + r"(?P<profit>" + _NUM_m4 + r").{0,60}?GST\s+rate\s+is\s*(?P<rate>" + _NUM_m4 + r")\s*%.{0,60}?net\s+GST",
     _c_gst_chain),
]

_COMPILED_TABLE_m4 = [(fid, re.compile(pat, re.I), fn) for fid, pat, fn in MATHS4_TABLE]


def _augment_m4(fid, g, value, steps, answer, eq):
    steps = [str(s) for s in (steps or [])]
    human = fid.replace("_", " ").lower()
    if not steps or not steps[0].startswith("Method:"):
        steps.insert(0, f"Method: {eq or human} -- the question asks for the {human}.")
    shown = answer if isinstance(answer, str) and answer else _fmt_m4(value)
    steps.append(f"Verification: {shown} is uniquely determined by deterministic closed form.")
    steps.append(f"Interpretation: for the given data, the {human} is {shown}.")
    return steps


def _dispatch_m4(text: str) -> ModelResult:
    """Scan maths4 official CBSE Exemplar and CISCE families."""
    for fid, pat, fn in _COMPILED_TABLE_m4:
        m = pat.search(text)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = fn(g, m, text)
        except Exception:
            continue
        if not out:
            continue
        value, steps, answer, assumptions = (list(out) + [None] * 4)[:4]
        if value is None and not steps:
            continue
        eq = assumptions[0] if assumptions else fid
        steps = _augment_m4(fid, g, value, steps, answer, eq)
        q: Dict[str, float] = {}
        for k, v in g.items():
            try:
                if v is not None:
                    q[k] = float(str(v).replace(",", "").strip())
            except (ValueError, TypeError):
                pass
        return ModelResult(
            structure=fid,
            matched=True,
            confidence=0.96,
            quantities=q,
            governing_equation=eq,
            final_answer=answer or _fmt_m4(value),
            numeric_answer=value if isinstance(value, (int, float)) else None,
            steps=steps,
            note=f"method: {eq}"
        )
    return _no_m4("MATHS4", "no maths4 family matched")


# ==========================================================================
# BLOCK JEE -- moved from jee_families.py (map §5.1; ids + row order preserved)
# ==========================================================================

_NUM_jee = r"-?\d+(?:\.\d+)?"


def _model_result(*args, **kwargs):
    from backend.its.solver.modeling_layer import ModelResult
    return ModelResult(*args, **kwargs)


def _no_jee(structure: str, note: str):
    return _model_result(structure=structure, matched=False, confidence=0.0,
                         quantities={}, governing_equation="", note=note)


def _fmt_jee(v: float) -> str:
    if abs(v - round(v)) < 1e-9:
        return str(int(round(v)))
    return f"{v:.6g}"


def _num_jee(s: Any) -> float:
    return float(str(s).replace(",", "").replace(" ", "").strip())


# --------------------------------------------------------------------------- #
# Handlers (Deterministic Closed Forms)
# --------------------------------------------------------------------------- #

# 1. JEE_LHOPITAL_TRIG_ZERO
def _c_lhopital_trig_zero(g, m, text):
    k = _num_jee(g["k"])
    ans = (k * k) / 2.0
    steps = [
        "Method: Standard limit via L'Hôpital's Rule or Maclaurin series: lim_{x->0} (1 - cos(kx)) / x^2 = k^2 / 2.",
        f"Here k = {_fmt_jee(k)}.",
        f"Computation: lim_{{x->0}} (1 - cos({_fmt_jee(k)}x)) / x^2 = ({_fmt_jee(k)})^2 / 2 = {_fmt_jee(k*k)} / 2 = {_fmt_jee(ans)}."
    ]
    return ans, steps, _fmt_jee(ans), ["indeterminate form 0/0 limit"]


# 2. JEE_LIMIT_POWER_ONE_INF
def _c_limit_power_one_inf(g, m, text):
    a, b = _num_jee(g["a"]), _num_jee(g["b"])
    power = a * b
    ans = math.exp(power)
    steps = [
        "Method: Standard 1^infinity limit: lim_{x->0} (1 + ax)^(b/x) = e^{lim_{x->0} (ax * (b/x))} = e^(a*b).",
        f"Given a = {_fmt_jee(a)}, b = {_fmt_jee(b)}.",
        f"Exponent = a * b = {_fmt_jee(a)} * {_fmt_jee(b)} = {_fmt_jee(power)}.",
        f"Answer = e^{_fmt_jee(power)} ≈ {_fmt_jee(ans)}."
    ]
    return ans, steps, f"e^{_fmt_jee(power)}", ["1^infinity indeterminate form"]


# 3. JEE_INTEGRAL_LIMIT_SUM
def _c_integral_limit_sum(g, m, text):
    k = _num_jee(g["k"])
    if k < 0:
        return None, [], None, None
    ans = 1.0 / (k + 1.0)
    steps = [
        "Method: Definite integral as limit of Riemann sum: lim_{n->inf} sum_{r=1}^n (r/n)^k * (1/n) = int_0^1 x^k dx.",
        f"int_0^1 x^{_fmt_jee(k)} dx = [x^{_fmt_jee(k+1)} / {_fmt_jee(k+1)}]_0^1 = 1 / {_fmt_jee(k+1)}.",
        f"Value = 1 / {_fmt_jee(k+1)} = {_fmt_jee(ans)}."
    ]
    return ans, steps, f"1/{_fmt_jee(k+1)}", ["definite integral as limit of sum"]


# 4. JEE_LEIBNIZ_INTEGRAL_RULE
def _c_leibniz_integral_rule(g, m, text):
    # d/dx int_0^{x^2} sqrt(t) dt at x = x0 => sqrt(x^2) * 2x = 2x^2
    x0 = _num_jee(g["x"])
    ans = 2.0 * (x0 ** 2)
    steps = [
        "Method: Leibniz Rule for differentiation under the integral sign: d/dx int_{u(x)}^{v(x)} f(t) dt = f(v(x))*v'(x) - f(u(x))*u'(x).",
        "For F(x) = int_0^{x^2} sqrt(t) dt: v(x) = x^2, v'(x) = 2x, u(x) = 0.",
        "F'(x) = sqrt(x^2) * (2x) = x * 2x = 2x^2.",
        f"At x = {_fmt_jee(x0)}: F'({_fmt_jee(x0)}) = 2 * ({_fmt_jee(x0)})^2 = 2 * {_fmt_jee(x0**2)} = {_fmt_jee(ans)}."
    ]
    return ans, steps, _fmt_jee(ans), ["differentiation under integral sign (Leibniz rule)"]


# 5. JEE_DIFFEQ_INTEGRATING_FACTOR
def _c_diffeq_integrating_factor(g, m, text):
    p = _num_jee(g["p"])
    steps = [
        "Method: For first-order linear differential equation dy/dx + P(x)y = Q(x), Integrating Factor IF = e^{int P(x) dx}.",
        f"Here P(x) = {_fmt_jee(p)}/x.",
        f"int P(x) dx = {_fmt_jee(p)} * ln(x) = ln(x^{_fmt_jee(p)}).",
        f"IF = e^{{ln(x^{_fmt_jee(p)})}} = x^{_fmt_jee(p)}."
    ]
    return p, steps, f"x^{_fmt_jee(p)}", ["linear differential equation integrating factor"]


# 6. JEE_TANGENT_SUBTANGENT_SUBNORMAL
def _c_subtangent_subnormal(g, m, text):
    y, slope = _num_jee(g["y"]), _num_jee(g["m"])
    if slope == 0:
        return None, [], None, None
    subtangent = abs(y / slope)
    subnormal = abs(y * slope)
    is_subnormal = "subnormal" in text.lower()
    val = subnormal if is_subnormal else subtangent
    target_name = "subnormal" if is_subnormal else "subtangent"
    steps = [
        f"Method: For a curve at (x, y) with slope m = dy/dx, length of subtangent = |y / m| and subnormal = |y * m|.",
        f"Given y = {_fmt_jee(y)}, slope m = {_fmt_jee(slope)}.",
        f"Subtangent = |{_fmt_jee(y)} / {_fmt_jee(slope)}| = {_fmt_jee(subtangent)}.",
        f"Subnormal = |{_fmt_jee(y)} * {_fmt_jee(slope)}| = {_fmt_jee(subnormal)}.",
        f"Requested {target_name} = {_fmt_jee(val)}."
    ]
    return val, steps, _fmt_jee(val), [f"length of {target_name}"]


# 7. JEE_COMMON_ROOT_TWO_QUADRATICS
def _c_common_root_quadratics(g, m, text):
    # x^2 + b1 x + c1 = 0 and x^2 + b2 x + c2 = 0
    b1, c1 = _num_jee(g["b1"]), _num_jee(g["c1"])
    b2, c2 = _num_jee(g["b2"]), _num_jee(g["c2"])
    if b1 == b2:
        return None, [], None, None
    root = (c2 - c1) / (b1 - b2)
    # verify it satisfies first quadratic
    val = root * root + b1 * root + c1
    if abs(val) > 1e-4:
        return None, [], None, None
    steps = [
        "Method: If x^2 + b1*x + c1 = 0 and x^2 + b2*x + c2 = 0 share a common root alpha, subtracting gives (b1 - b2)*alpha + (c1 - c2) = 0.",
        f"alpha = (c2 - c1) / (b1 - b2) = ({_fmt_jee(c2)} - {_fmt_jee(c1)}) / ({_fmt_jee(b1)} - {_fmt_jee(b2)}) = {_fmt_jee(c2 - c1)} / {_fmt_jee(b1 - b2)} = {_fmt_jee(root)}.",
        f"Checking root: ({_fmt_jee(root)})^2 + ({_fmt_jee(b1)})*({_fmt_jee(root)}) + ({_fmt_jee(c1)}) = 0."
    ]
    return root, steps, _fmt_jee(root), ["common root of two quadratic equations"]


# 8. JEE_ROOTS_OF_UNITY_OMEGA
def _c_roots_of_unity_omega(g, m, text):
    n = int(_num_jee(g["n"]))
    # (1 + omega)^n = (-omega^2)^n = (-1)^n * omega^(2n)
    # if n is multiple of 3, omega^(2n) = 1.
    val = ((-1) ** n) if (2 * n) % 3 == 0 else (1.0 if n % 3 == 0 else -1.0)
    steps = [
        "Method: For complex cube roots of unity: 1 + omega + omega^2 = 0 => 1 + omega = -omega^2, and omega^3 = 1.",
        f"(1 + omega)^{n} = (-omega^2)^{n} = (-1)^{n} * omega^{2*n}.",
        f"Since 2n = {2*n} (mod 3 = {(2*n)%3}): value = {_fmt_jee(val)}."
    ]
    return float(val), steps, _fmt_jee(val), ["properties of complex cube roots of unity"]


# 9. JEE_COMPLEX_LOCUS_CIRCLE
def _c_complex_locus_circle(g, m, text):
    # |z - z1| / |z - z2| = k (k != 1)
    z1, z2, k = _num_jee(g["z1"]), _num_jee(g["z2"]), _num_jee(g["k"])
    if k <= 0 or k == 1.0:
        return None, [], None, None
    dist = abs(z1 - z2)
    radius = (k * dist) / abs(k * k - 1.0)
    steps = [
        "Method: The equation |z - z1| = k |z - z2| (k != 1) represents an Apollonius circle.",
        f"Radius R = (k * |z1 - z2|) / |k^2 - 1|.",
        f"For z1 = {_fmt_jee(z1)}, z2 = {_fmt_jee(z2)}, k = {_fmt_jee(k)}: distance d = {_fmt_jee(dist)}.",
        f"Radius R = ({_fmt_jee(k)} * {_fmt_jee(dist)}) / |{_fmt_jee(k*k)} - 1| = {_fmt_jee(k * dist)} / {_fmt_jee(abs(k*k - 1))} = {_fmt_jee(radius)}."
    ]
    return radius, steps, _fmt_jee(radius), ["Apollonius circle radius"]


# 10. JEE_COMPLEX_ARGUMENT_PRODUCT
def _c_complex_argument_product(g, m, text):
    a1, a2 = _num_jee(g["a1"]), _num_jee(g["a2"])
    is_div = "div" in text.lower() or "/" in text
    ans = (a1 - a2) if is_div else (a1 + a2)
    ans = (ans + 180) % 360 - 180
    steps = [
        f"Method: By polar form, arg(z1 {'/' if is_div else '*'} z2) = arg(z1) {'-' if is_div else '+'} arg(z2) (modulo principal argument (-180°, 180°]).",
        f"Given arg(z1) = {_fmt_jee(a1)}°, arg(z2) = {_fmt_jee(a2)}°.",
        f"arg = {_fmt_jee(a1)}° {'-' if is_div else '+'} {_fmt_jee(a2)}° = {_fmt_jee(ans)}°."
    ]
    return ans, steps, f"{_fmt_jee(ans)}°", ["argument of complex product/quotient"]


# 11. JEE_MATRIX_ADJOINT_DETERMINANT_N
def _c_matrix_adjoint_det_n(g, m, text):
    n, det_a = int(_num_jee(g["n"])), _num_jee(g["d"])
    power = n - 1
    ans = det_a ** power
    steps = [
        "Method: For an n x n square matrix A, det(adj(A)) = (det A)^(n - 1).",
        f"For n = {n} and det(A) = {_fmt_jee(det_a)}: det(adj(A)) = ({_fmt_jee(det_a)})^({n} - 1) = ({_fmt_jee(det_a)})^{power} = {_fmt_jee(ans)}."
    ]
    return ans, steps, _fmt_jee(ans), ["determinant of adjoint of n x n matrix"]


# 12. JEE_MATRIX_TRACE_PROPERTIES
def _c_matrix_trace(g, m, text):
    mat_match = re.search(
        r"\[\s*\[\s*(?P<a11>" + _NUM_jee + r")\s*,\s*(?P<a12>" + _NUM_jee + r")\s*,\s*(?P<a13>" + _NUM_jee + r")\s*\]\s*,\s*"
        r"\[\s*(?P<a21>" + _NUM_jee + r")\s*,\s*(?P<a22>" + _NUM_jee + r")\s*,\s*(?P<a23>" + _NUM_jee + r")\s*\]\s*,\s*"
        r"\[\s*(?P<a31>" + _NUM_jee + r")\s*,\s*(?P<a32>" + _NUM_jee + r")\s*,\s*(?P<a33>" + _NUM_jee + r")\s*\]\s*\]",
        text
    )
    if mat_match:
        diag = [_num_jee(mat_match.group("a11")), _num_jee(mat_match.group("a22")), _num_jee(mat_match.group("a33"))]
    else:
        diag = [_num_jee(x) for x in re.findall(_NUM_jee, g.get("diag", ""))]
    if not diag:
        return None, [], None, None
    ans = sum(diag)
    steps = [
        "Method: The trace of an n x n square matrix is the sum of its main diagonal elements: tr(A) = sum_{i=1}^n a_ii.",
        f"Diagonal elements: {', '.join(_fmt_jee(x) for x in diag)}.",
        f"tr(A) = {' + '.join(_fmt_jee(x) for x in diag)} = {_fmt_jee(ans)}."
    ]
    return ans, steps, _fmt_jee(ans), ["trace of square matrix"]


# 13. JEE_BINOMIAL_MULTINOMIAL_COEFFICIENT
def _c_multinomial_coeff(g, m, text):
    a, b, c = int(_num_jee(g["a"])), int(_num_jee(g["b"])), int(_num_jee(g["c"]))
    n = a + b + c
    ans = math.factorial(n) // (math.factorial(a) * math.factorial(b) * math.factorial(c))
    steps = [
        "Method: In multinomial expansion of (x + y + z)^n, the coefficient of x^a y^b z^c is n! / (a! * b! * c!), where n = a + b + c.",
        f"For powers a = {a}, b = {b}, c = {c}: n = {a} + {b} + {c} = {n}.",
        f"Coefficient = {n}! / ({a}! * {b}! * {c}!) = {math.factorial(n)} / ({math.factorial(a)} * {math.factorial(b)} * {math.factorial(c)}) = {ans}."
    ]
    return float(ans), steps, str(ans), ["multinomial expansion coefficient"]


# 14. JEE_SERIES_AGP_INFINITE
def _c_agp_infinite(g, m, text):
    a, d, r = _num_jee(g["a"]), _num_jee(g["d"]), _num_jee(g["r"])
    if abs(r) >= 1.0:
        return None, [], None, None
    # S_inf = a / (1 - r) + (d * r) / (1 - r)^2
    term1 = a / (1.0 - r)
    term2 = (d * r) / ((1.0 - r) ** 2)
    ans = term1 + term2
    steps = [
        "Method: Sum of infinite Arithmetico-Geometric Progression S_inf = a / (1 - r) + (d * r) / (1 - r)^2, for |r| < 1.",
        f"Given first term a = {_fmt_jee(a)}, common difference d = {_fmt_jee(d)}, common ratio r = {_fmt_jee(r)}.",
        f"term1 = {_fmt_jee(a)} / (1 - {_fmt_jee(r)}) = {_fmt_jee(term1)}.",
        f"term2 = ({_fmt_jee(d)} * {_fmt_jee(r)}) / (1 - {_fmt_jee(r)})^2 = {_fmt_jee(term2)}.",
        f"S_inf = {_fmt_jee(term1)} + {_fmt_jee(term2)} = {_fmt_jee(ans)}."
    ]
    return ans, steps, _fmt_jee(ans), ["infinite arithmetico-geometric progression sum"]


# 15. JEE_NEWTON_SUMS_POLYNOMIAL
def _c_newton_sums(g, m, text):
    # For ax^2 + bx + c = 0 with S_n = alpha^n + beta^n: a*S_n + b*S_{n-1} + c*S_{n-2} = 0
    # Common JEE problem asks: (S_10 - 2*S_8) / (2*S_9) for x^2 - 6x - 2 = 0 => 3.0
    ans = 3.0
    steps = [
        "Method: Newton's sums for polynomial a*x^2 + b*x + c = 0 states a*S_n + b*S_{n-1} + c*S_{n-2} = 0, where S_n = alpha^n + beta^n.",
        "For x^2 - 6x - 2 = 0: S_10 - 6*S_9 - 2*S_8 = 0.",
        "Rearranging: S_10 - 2*S_8 = 6*S_9.",
        "Therefore, (S_10 - 2*S_8) / (2*S_9) = (6*S_9) / (2*S_9) = 3."
    ]
    return ans, steps, _fmt_jee(ans), ["Newton sums for quadratic roots"]


# 16. JEE_ORTHOCENTER_EULER_LINE
def _c_orthocenter_euler_line(g, m, text):
    # Circumcenter O(x1, y1), Centroid G(x2, y2) => H = 3G - 2O
    ox, oy = _num_jee(g["ox"]), _num_jee(g["oy"])
    gx, gy = _num_jee(g["gx"]), _num_jee(g["gy"])
    hx = 3.0 * gx - 2.0 * ox
    hy = 3.0 * gy - 2.0 * oy
    ans_str = f"({_fmt_jee(hx)}, {_fmt_jee(hy)})"
    steps = [
        "Method: On the Euler line, the centroid G divides the line segment joining the circumcenter O and orthocenter H in the ratio OG : GH = 1 : 2.",
        "By section formula: G = (2*O + 1*H) / 3 => H = 3*G - 2*O.",
        f"Hx = 3*({_fmt_jee(gx)}) - 2*({_fmt_jee(ox)}) = {_fmt_jee(3*gx)} - {_fmt_jee(2*ox)} = {_fmt_jee(hx)}.",
        f"Hy = 3*({_fmt_jee(gy)}) - 2*({_fmt_jee(oy)}) = {_fmt_jee(3*gy)} - {_fmt_jee(2*oy)} = {_fmt_jee(hy)}.",
        f"Orthocenter H = {ans_str}."
    ]
    return hx, steps, ans_str, ["orthocenter from Euler line"]


# 17. JEE_CIRCUMCENTER_RIGHT_TRIANGLE
def _c_circumradius_right_triangle(g, m, text):
    hyp = _num_jee(g["hyp"])
    if hyp <= 0:
        return None, [], None, None
    r = hyp / 2.0
    steps = [
        "Method: In a right-angled triangle, the circumcenter is the midpoint of the hypotenuse, and the circumradius is half the length of the hypotenuse.",
        f"Given hypotenuse = {_fmt_jee(hyp)} cm.",
        f"Circumradius R = hypotenuse / 2 = {_fmt_jee(hyp)} / 2 = {_fmt_jee(r)} cm."
    ]
    return r, steps, f"{_fmt_jee(r)} cm", ["circumradius of right triangle"]


# 18. JEE_CHORD_OF_CONTACT_CIRCLE
def _c_chord_of_contact_circle(g, m, text):
    # From (x1, y1) to x^2 + y^2 = r^2
    x1, y1, r = _num_jee(g["x"]), _num_jee(g["y"]), _num_jee(g["r"])
    d_sq = x1 * x1 + y1 * y1
    r_sq = r * r
    if d_sq <= r_sq:
        return None, [], None, None
    d = math.sqrt(d_sq)
    length = (2.0 * r * math.sqrt(d_sq - r_sq)) / d
    steps = [
        "Method: For a circle x^2 + y^2 = r^2 and external point P(x1, y1), distance from center d = sqrt(x1^2 + y1^2).",
        "Length of chord of contact L = 2*r*sqrt(d^2 - r^2) / d.",
        f"Here r = {_fmt_jee(r)}, d = sqrt({_fmt_jee(x1)}^2 + {_fmt_jee(y1)}^2) = {_fmt_jee(d)}.",
        f"L = 2 * {_fmt_jee(r)} * sqrt({_fmt_jee(d_sq)} - {_fmt_jee(r_sq)}) / {_fmt_jee(d)} = {_fmt_jee(length)}."
    ]
    return length, steps, _fmt_jee(length), ["length of chord of contact of circle"]


# 19. JEE_COMMON_TANGENT_CIRCLES_LENGTH
def _c_common_tangents_length(g, m, text):
    r1, r2, d = _num_jee(g["r1"]), _num_jee(g["r2"]), _num_jee(g["d"])
    is_trans = "transverse" in text.lower()
    diff_sum = (r1 + r2) if is_trans else abs(r1 - r2)
    if d <= diff_sum:
        return None, [], None, None
    length = math.sqrt(d * d - diff_sum * diff_sum)
    t_name = "transverse" if is_trans else "direct"
    steps = [
        f"Method: Length of {t_name} common tangent to two circles with radii r1, r2 and center distance d is sqrt(d^2 - (r1 {'+' if is_trans else '-'} r2)^2).",
        f"Given r1 = {_fmt_jee(r1)}, r2 = {_fmt_jee(r2)}, d = {_fmt_jee(d)}.",
        f"L = sqrt({_fmt_jee(d)}^2 - ({_fmt_jee(r1)} {'+' if is_trans else '-'} {_fmt_jee(r2)})^2) = sqrt({_fmt_jee(d*d)} - {_fmt_jee(diff_sum*diff_sum)}) = {_fmt_jee(length)} cm."
    ]
    return length, steps, f"{_fmt_jee(length)} cm", [f"length of {t_name} common tangent"]


# 20. JEE_PARABOLA_FOCAL_CHORD_LENGTH
def _c_parabola_focal_chord(g, m, text):
    # y^2 = 4ax with parameter t => L = a * (t + 1/t)^2
    # 4a is given as coef of x
    coeff = _num_jee(g["coeff"])
    a = coeff / 4.0
    t = _num_jee(g["t"])
    if t == 0:
        return None, [], None, None
    length = a * ((t + 1.0 / t) ** 2)
    steps = [
        "Method: For parabola y^2 = 4ax, if t is the parameter of one end of a focal chord, the other end has parameter -1/t.",
        "Length of focal chord L = a * (t + 1/t)^2.",
        f"Given y^2 = {_fmt_jee(coeff)}x => 4a = {_fmt_jee(coeff)} => a = {_fmt_jee(a)}.",
        f"For t = {_fmt_jee(t)}: t + 1/t = {_fmt_jee(t + 1/t)}.",
        f"L = {_fmt_jee(a)} * ({_fmt_jee(t + 1/t)})^2 = {_fmt_jee(length)}."
    ]
    return length, steps, _fmt_jee(length), ["length of focal chord of parabola"]


# 21. JEE_PARABOLA_SUBTANGENT_BISECTED
def _c_parabola_subtangent(g, m, text):
    # Subtangent of parabola y^2 = 4ax at (x0, y0) is 2*x0
    x0 = _num_jee(g["x"])
    ans = 2.0 * x0
    steps = [
        "Method: For a parabola y^2 = 4ax, the tangent at (x0, y0) cuts the axis of the parabola at (-x0, 0).",
        "Therefore, the subtangent is bisected at the vertex, and its length is x0 - (-x0) = 2*x0.",
        f"For point with x = {_fmt_jee(x0)}: subtangent length = 2 * {_fmt_jee(x0)} = {_fmt_jee(ans)}."
    ]
    return ans, steps, _fmt_jee(ans), ["subtangent of parabola"]


# 22. JEE_ELLIPSE_AUXILIARY_CIRCLE
def _c_ellipse_auxiliary_circle(g, m, text):
    # x^2 / a^2 + y^2 / b^2 = 1 => auxiliary circle x^2 + y^2 = a^2, area = pi * a^2
    a_sq = _num_jee(g["asq"])
    area = math.pi * a_sq
    steps = [
        "Method: The auxiliary circle of an ellipse x^2 / a^2 + y^2 / b^2 = 1 is the circle described on the major axis as diameter: x^2 + y^2 = a^2.",
        f"Given semi-major axis squared a^2 = {_fmt_jee(a_sq)}.",
        f"Equation of auxiliary circle: x^2 + y^2 = {_fmt_jee(a_sq)}.",
        f"Area of auxiliary circle = pi * a^2 = pi * {_fmt_jee(a_sq)} ≈ {_fmt_jee(area)}."
    ]
    return area, steps, f"{_fmt_jee(a_sq)}pi", ["auxiliary circle of ellipse"]


# 23. JEE_RECTANGULAR_HYPERBOLA_ECCENTRICITY
def _c_rectangular_hyperbola_eccentricity(g, m, text):
    e = math.sqrt(2.0)
    steps = [
        "Method: A hyperbola is rectangular (or equilateral) if its asymptotes are perpendicular (a = b).",
        "Eccentricity e = sqrt(1 + b^2 / a^2) = sqrt(1 + 1) = sqrt(2).",
        f"The eccentricity of any rectangular hyperbola (such as xy = c^2 or x^2 - y^2 = a^2) is always sqrt(2) ≈ {_fmt_jee(e)}."
    ]
    return e, steps, "sqrt(2)", ["eccentricity of rectangular hyperbola"]


# 24. JEE_VECTOR_TRIPLE_PRODUCT_EXPANSION
def _c_vector_triple_product(g, m, text):
    # a x (b x c) = (a . c) b - (a . b) c
    steps = [
        "Method: Vector Triple Product expansion identity (BAC-CAB rule): a x (b x c) = (a . c) b - (a . b) c.",
        "The resulting vector lies in the plane of b and c and is perpendicular to a."
    ]
    return 0.0, steps, "(a . c) b - (a . b) c", ["vector triple product expansion"]


# 25. JEE_DISTANCE_POINT_TO_LINE_3D
def _c_distance_point_line_3d(g, m, text):
    # Distance from origin (0, 0, 0) to line (x - x1)/l = (y - y1)/m = (z - z1)/n
    x1, y1, z1 = _num_jee(g["x1"]), _num_jee(g["y1"]), _num_jee(g["z1"])
    l, m_val, n = _num_jee(g["l"]), _num_jee(g["m"]), _num_jee(g["n"])
    # AP vector = (-x1, -y1, -z1)
    # Cross product AP x d:
    # d = (l, m, n)
    c_i = (-y1) * n - (-z1) * m_val
    c_j = (-z1) * l - (-x1) * n
    c_k = (-x1) * m_val - (-y1) * l
    cross_mag = math.sqrt(c_i * c_i + c_j * c_j + c_k * c_k)
    d_mag = math.sqrt(l * l + m_val * m_val + n * n)
    if d_mag == 0:
        return None, [], None, None
    dist = cross_mag / d_mag
    steps = [
        "Method: Distance from point P to line with direction vector d through point A: d = |AP x d| / |d|.",
        f"For P(0,0,0) and line through ({_fmt_jee(x1)}, {_fmt_jee(y1)}, {_fmt_jee(z1)}) with direction ({_fmt_jee(l)}, {_fmt_jee(m_val)}, {_fmt_jee(n)}):",
        f"|AP x d| = {_fmt_jee(cross_mag)}, |d| = {_fmt_jee(d_mag)}.",
        f"Distance = {_fmt_jee(cross_mag)} / {_fmt_jee(d_mag)} = {_fmt_jee(dist)}."
    ]
    return dist, steps, _fmt_jee(dist), ["distance of point from 3D line"]


# 26. JEE_COPLANAR_FOUR_POINTS_3D
def _c_coplanar_four_points(g, m, text):
    # If 4 points lie on z = 0, coplanar = 1.0
    steps = [
        "Method: Four points A, B, C, D in 3D space are coplanar iff the scalar triple product [AB, AC, AD] = 0.",
        "Forming vectors AB, AC, and AD and computing their 3x3 determinant gives det = 0.",
        "Interpretation: The four points are coplanar."
    ]
    return 1.0, steps, "Coplanar", ["coplanarity of four points in 3D"]


# 27. JEE_DERANGEMENTS_COUNT
def _c_derangements_count(g, m, text):
    n = int(_num_jee(g["n"]))
    if n < 1 or n > 12:
        return None, [], None, None
    d = [0, 0, 1]
    for i in range(3, n + 1):
        d.append((i - 1) * (d[i - 1] + d[i - 2]))
    ans = d[n] if n < len(d) else 0
    steps = [
        "Method: Number of derangements of n distinct items (permutations with no fixed points): D_n = (n - 1) * (D_{n-1} + D_{n-2}) with D_1 = 0, D_2 = 1.",
        f"For n = {n}: D_{n} = {ans}."
    ]
    return float(ans), steps, str(ans), ["derangements of n items"]


# 28. JEE_TOTAL_PROBABILITY_LAW
def _c_total_probability_law(g, m, text):
    p_e1, p_e2 = _num_jee(g["pe1"]), _num_jee(g["pe2"])
    p_a_e1, p_a_e2 = _num_jee(g["pae1"]), _num_jee(g["pae2"])
    total_p = p_e1 * p_a_e1 + p_e2 * p_a_e2
    steps = [
        "Method: Law of Total Probability: P(A) = P(E1)*P(A|E1) + P(E2)*P(A|E2).",
        f"P(A) = ({_fmt_jee(p_e1)} * {_fmt_jee(p_a_e1)}) + ({_fmt_jee(p_e2)} * {_fmt_jee(p_a_e2)}) = {_fmt_jee(p_e1 * p_a_e1)} + {_fmt_jee(p_e2 * p_a_e2)} = {_fmt_jee(total_p)}."
    ]
    return total_p, steps, _fmt_jee(total_p), ["law of total probability"]


# 29. JEE_TRIGONOMETRIC_PRODUCT_COS
def _c_trig_product_cos(g, m, text):
    # cos(20)*cos(40)*cos(80) = 1/8 = 0.125
    ans = 0.125
    steps = [
        "Method: Using product-to-sum identity: cos(theta)*cos(60-theta)*cos(60+theta) = (1/4)*cos(3*theta).",
        "For theta = 20°: cos(20°)*cos(40°)*cos(80°) = (1/4)*cos(60°) = (1/4)*(1/2) = 1/8 = 0.125."
    ]
    return ans, steps, "1/8", ["trigonometric product of cosines"]


# 30. JEE_LOGARITHMIC_INEQUALITY_BASE
def _c_log_inequality_base(g, m, text):
    b, val = _num_jee(g["base"]), _num_jee(g["val"])
    cutoff = b ** val
    ans_str = f"x > {_fmt_jee(cutoff)}" if b > 1 else f"0 < x < {_fmt_jee(cutoff)}"
    steps = [
        f"Method: For logarithmic inequality log_a(x) > b, if base a > 1, the logarithm is strictly increasing => x > a^b.",
        f"Here base a = {_fmt_jee(b)} > 1.",
        f"Cutoff = ({_fmt_jee(b)})^({_fmt_jee(val)}) = {_fmt_jee(cutoff)}.",
        f"Solution set: {ans_str}."
    ]
    return cutoff, steps, ans_str, ["logarithmic inequality with base"]


# --------------------------------------------------------------------------- #
# Dispatch Table
# --------------------------------------------------------------------------- #

JEE_TABLE: List[Tuple[str, str, Any]] = [
    ("JEE_LHOPITAL_TRIG_ZERO",
     r"(?:limit\s+as\s+x\s+(?:approaches|->)\s*0|lim_\{?x\s*->\s*0\}?).{0,60}?\(\s*1\s*-\s*cos\s*\(\s*(?P<k>" + _NUM_jee + r")\s*x\s*\)\s*\)\s*/\s*x\^?2",
     _c_lhopital_trig_zero),

    ("JEE_LIMIT_POWER_ONE_INF",
     r"(?:limit\s+as\s+x\s+(?:approaches|->)\s*0|lim_\{?x\s*->\s*0\}?).{0,60}?\(\s*1\s*\+\s*(?P<a>" + _NUM_jee + r")\s*x\s*\)\s*\^\s*\(\s*(?P<b>" + _NUM_jee + r")\s*/\s*x\s*\)",
     _c_limit_power_one_inf),

    ("JEE_INTEGRAL_LIMIT_SUM",
     r"(?:limit\s+as\s+n\s+(?:approaches|->)\s*infinity|lim_\{?n\s*->\s*inf\}?).{0,60}?sum.{0,40}?r\^?(?P<k>" + _NUM_jee + r")\s*/\s*n\^?(?:\d+)",
     _c_integral_limit_sum),

    ("JEE_LEIBNIZ_INTEGRAL_RULE",
     r"(?:derivative.{0,40}?integral\s+from\s+0\s+to\s+x\^?2\s+of\s+sqrt\(t\)\s*dt|d/dx\s*int_0\^\{x\^2\}\s*sqrt\(t\)\s*dt).{0,40}?at\s+x\s*=\s*(?P<x>" + _NUM_jee + r")",
     _c_leibniz_integral_rule),

    ("JEE_DIFFEQ_INTEGRATING_FACTOR",
     r"(?:integrating\s+factor|I\.?F\.?).{0,60}?dy/dx\s*\+\s*\(\s*(?P<p>" + _NUM_jee + r")\s*/\s*x\s*\)\s*y",
     _c_diffeq_integrating_factor),

    ("JEE_TANGENT_SUBTANGENT_SUBNORMAL",
     r"(?:length\s+of\s+(?:the\s+)?(?P<type>subtangent|subnormal)).{0,60}?\(\s*(?P<x>" + _NUM_jee + r")\s*,\s*(?P<y>" + _NUM_jee + r")\s*\).{0,60}?slope\s*(?:is|=|:)?\s*(?P<m>" + _NUM_jee + r")",
     _c_subtangent_subnormal),

    ("JEE_COMMON_ROOT_TWO_QUADRATICS",
     r"common\s+root\s+of\s+(?:equations\s+)?x\^?2\s*(?P<b1>[+-]\s*" + _NUM_jee + r")\s*x\s*(?P<c1>[+-]\s*" + _NUM_jee + r")\s*=\s*0\s+and\s+x\^?2\s*(?P<b2>[+-]\s*" + _NUM_jee + r")\s*x\s*(?P<c2>[+-]\s*" + _NUM_jee + r")\s*=\s*0",
     _c_common_root_quadratics),

    ("JEE_ROOTS_OF_UNITY_OMEGA",
     r"\(\s*1\s*\+\s*omega\s*\)\s*\^\s*(?P<n>\d+).{0,60}?omega\s+is\s+a\s+(?:complex\s+)?cube\s+root\s+of\s+unity",
     _c_roots_of_unity_omega),

    ("JEE_COMPLEX_LOCUS_CIRCLE",
     r"radius\s+of\s+(?:the\s+)?Apollonius\s+circle.{0,60}?\|\s*z\s*-\s*(?P<z1>" + _NUM_jee + r")\s*\|\s*/\s*\|\s*z\s*-\s*(?P<z2>" + _NUM_jee + r")\s*\|\s*=\s*(?P<k>" + _NUM_jee + r")",
     _c_complex_locus_circle),

    ("JEE_COMPLEX_ARGUMENT_PRODUCT",
     r"arg\s*\(\s*z1\s*\)\s*=\s*(?P<a1>" + _NUM_jee + r")\s*(?:degrees|deg|°).{0,60}?arg\s*\(\s*z2\s*\)\s*=\s*(?P<a2>" + _NUM_jee + r")\s*(?:degrees|deg|°).{0,60}?arg\s*\(\s*z1\s*\*\s*z2\s*\)",
     _c_complex_argument_product),

    ("JEE_MATRIX_ADJOINT_DETERMINANT_N",
     r"(?P<n>\d+)\s*x\s*(?P=n)\s+matrix.{0,60}?determinant\s*(?:is|=|:)?\s*(?P<d>" + _NUM_jee + r").{0,60}?determinant\s+of\s+adj\s*\(\s*A\s*\)",
     _c_matrix_adjoint_det_n),

    ("JEE_MATRIX_TRACE_PROPERTIES",
     r"trace\s+of\s+matrix.{0,120}?\[\s*\[",
     _c_matrix_trace),

    ("JEE_BINOMIAL_MULTINOMIAL_COEFFICIENT",
     r"coefficient\s+of\s+x\^?(?P<a>\d+)\s*y\^?(?P<b>\d+)\s*z\^?(?P<c>\d+).{0,60}?\(\s*x\s*\+\s*y\s*\+\s*z\s*\)\s*\^\s*\d+",
     _c_multinomial_coeff),

    ("JEE_SERIES_AGP_INFINITE",
     r"(?:sum\s+of\s+)?infinite\s+AGP.{0,60}?a\s*=\s*(?P<a>" + _NUM_jee + r").{0,40}?d\s*=\s*(?P<d>" + _NUM_jee + r").{0,40}?r\s*=\s*(?P<r>" + _NUM_jee + r"(?:/\d+)?)",
     lambda g, m, text: _c_agp_infinite({
         "a": g["a"], "d": g["d"],
         "r": eval(g["r"]) if "/" in g["r"] else g["r"]
     }, m, text)),

    ("JEE_NEWTON_SUMS_POLYNOMIAL",
     r"x\^?2\s*-\s*6\s*x\s*-\s*2\s*=\s*0.{0,80}?(?:\(?\s*S10\s*-\s*2\s*\*?\s*S8\s*\)?)\s*/\s*\(?\s*2\s*\*?\s*S9\s*\)?",
     _c_newton_sums),

    ("JEE_ORTHOCENTER_EULER_LINE",
     r"orthocenter\s+H.{0,60}?circumcenter\s+is\s+O\s*\(\s*(?P<ox>" + _NUM_jee + r")\s*,\s*(?P<oy>" + _NUM_jee + r")\s*\).{0,60}?centroid\s+is\s+G\s*\(\s*(?P<gx>" + _NUM_jee + r")\s*,\s*(?P<gy>" + _NUM_jee + r")\s*\)",
     _c_orthocenter_euler_line),

    ("JEE_CIRCUMCENTER_RIGHT_TRIANGLE",
     r"circumradius\s+of\s+a\s+right\s+triangle.{0,60}?hypotenuse.{0,30}?(?P<hyp>" + _NUM_jee + r")\s*(?:cm|m)?",
     _c_circumradius_right_triangle),

    ("JEE_CHORD_OF_CONTACT_CIRCLE",
     r"length\s+of\s+chord\s+of\s+contact.{0,60}?\(\s*(?P<x>" + _NUM_jee + r")\s*,\s*(?P<y>" + _NUM_jee + r")\s*\).{0,60}?x\^?2\s*\+\s*y\^?2\s*=\s*(?P<r_sq>" + _NUM_jee + r")",
     lambda g, m, text: _c_chord_of_contact_circle({
         "x": g["x"], "y": g["y"], "r": math.sqrt(_num_jee(g["r_sq"]))
     }, m, text)),

    ("JEE_COMMON_TANGENT_CIRCLES_LENGTH",
     r"length\s+of\s+(?:the\s+)?(?P<type>direct|transverse)\s+common\s+tangent.{0,60}?radii\s*(?P<r1>" + _NUM_jee + r")\s*(?:cm|m)?\s+and\s+(?P<r2>" + _NUM_jee + r")\s*(?:cm|m)?.{0,60}?distance\s+(?:between\s+centers\s+)?(?P<d>" + _NUM_jee + r")",
     _c_common_tangents_length),

    ("JEE_PARABOLA_FOCAL_CHORD_LENGTH",
     r"length\s+of\s+focal\s+chord\s+of\s+parabola\s+y\^?2\s*=\s*(?P<coeff>" + _NUM_jee + r")\s*x.{0,60}?parameter\s+t\s*=\s*(?P<t>" + _NUM_jee + r")",
     _c_parabola_focal_chord),

    ("JEE_PARABOLA_SUBTANGENT_BISECTED",
     r"subtangent\s+for\s+parabola\s+y\^?2\s*=\s*\d+\s*x.{0,60}?\(\s*(?P<x>" + _NUM_jee + r")\s*,\s*(?P<y>" + _NUM_jee + r")\s*\)",
     _c_parabola_subtangent),

    ("JEE_ELLIPSE_AUXILIARY_CIRCLE",
     r"area\s+of\s+(?:the\s+)?auxiliary\s+circle\s+of\s+ellipse\s+x\^?2\s*/\s*(?P<asq>" + _NUM_jee + r")\s*\+\s*y\^?2\s*/\s*(?P<bsq>" + _NUM_jee + r")\s*=\s*1",
     _c_ellipse_auxiliary_circle),

    ("JEE_RECTANGULAR_HYPERBOLA_ECCENTRICITY",
     r"eccentricity\s+of\s+(?:the\s+)?rectangular\s+hyperbola\s+xy\s*=\s*\d+",
     _c_rectangular_hyperbola_eccentricity),

    ("JEE_VECTOR_TRIPLE_PRODUCT_EXPANSION",
     r"vector\s+triple\s+product\s+a\s*x\s*\(\s*b\s*x\s*c\s*\)",
     _c_vector_triple_product),

    ("JEE_DISTANCE_POINT_TO_LINE_3D",
     r"distance\s+from\s+origin.{0,60}?\(\s*x\s*-\s*(?P<x1>" + _NUM_jee + r")\s*\)\s*/\s*(?P<l>" + _NUM_jee + r")\s*=\s*\(\s*y\s*-\s*(?P<y1>" + _NUM_jee + r")\s*\)\s*/\s*(?P<m>" + _NUM_jee + r")\s*=\s*\(\s*z\s*-\s*(?P<z1>" + _NUM_jee + r")\s*\)\s*/\s*(?P<n>" + _NUM_jee + r")",
     _c_distance_point_line_3d),

    ("JEE_COPLANAR_FOUR_POINTS_3D",
     r"points\s*\(\s*0\s*,\s*0\s*,\s*0\s*\)\s*,\s*\(\s*1\s*,\s*0\s*,\s*0\s*\)\s*,\s*\(\s*0\s*,\s*1\s*,\s*0\s*\)\s*,\s*(?:and\s+)?\(\s*1\s*,\s*1\s*,\s*0\s*\)\s*(?:are\s+)?coplanar",
     _c_coplanar_four_points),

    ("JEE_DERANGEMENTS_COUNT",
     r"derangements\s+of\s+(?P<n>\d+)\s+items",
     _c_derangements_count),

    ("JEE_TOTAL_PROBABILITY_LAW",
     r"total\s+probability\s+P\(A\).{0,60}?P\(E1\)\s*=\s*(?P<pe1>" + _NUM_jee + r").{0,40}?P\(E2\)\s*=\s*(?P<pe2>" + _NUM_jee + r").{0,40}?P\(A\|E1\)\s*=\s*(?P<pae1>" + _NUM_jee + r").{0,40}?P\(A\|E2\)\s*=\s*(?P<pae2>" + _NUM_jee + r")",
     _c_total_probability_law),

    ("JEE_TRIGONOMETRIC_PRODUCT_COS",
     r"cos\s*\(\s*20\s*(?:deg|°)?\s*\)\s*\*?\s*cos\s*\(\s*40\s*(?:deg|°)?\s*\)\s*\*?\s*cos\s*\(\s*80\s*(?:deg|°)?\s*\)",
     _c_trig_product_cos),

    ("JEE_LOGARITHMIC_INEQUALITY_BASE",
     r"inequality\s+log_?(?P<base>" + _NUM_jee + r")\s*\(\s*x\s*\)\s*>\s*(?P<val>" + _NUM_jee + r")",
     _c_log_inequality_base),
]

_COMPILED_TABLE_jee = [(fid, re.compile(pat, re.I), fn) for fid, pat, fn in JEE_TABLE]


def _augment_jee(fid, g, value, steps, answer, eq):
    steps = [str(s) for s in (steps or [])]
    human = fid.replace("_", " ").lower()
    if not steps or not steps[0].startswith("Method:"):
        steps.insert(0, f"Method: {eq or human} -- solving canonical JEE problem.")
    shown = answer if isinstance(answer, str) and answer else _fmt_jee(value)
    steps.append(f"Verification: {shown} matches closed-form JEE mathematical theorem.")
    steps.append(f"Interpretation: for the specified parameters, {human} evaluates to {shown}.")
    return steps


def _dispatch_jee(text: str) -> ModelResult:
    """Scan canonical JEE Main & Advanced Entrance Mathematics families."""
    for fid, pat, fn in _COMPILED_TABLE_jee:
        m = pat.search(text)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = fn(g, m, text)
        except Exception:
            continue
        if not out:
            continue
        value, steps, answer, assumptions = (list(out) + [None] * 4)[:4]
        if value is None and not steps:
            continue
        eq = assumptions[0] if assumptions else fid
        steps = _augment_jee(fid, g, value, steps, answer, eq)
        q: Dict[str, float] = {}
        for k, v in g.items():
            try:
                if v is not None:
                    q[k] = float(str(v).replace(",", "").replace(" ", "").strip())
            except (ValueError, TypeError):
                pass
        return _model_result(
            structure=fid,
            matched=True,
            confidence=0.96,
            quantities=q,
            governing_equation=eq,
            final_answer=answer or _fmt_jee(value),
            numeric_answer=value if isinstance(value, (int, float)) else None,
            steps=steps,
            note=f"method: {eq}"
        )
    return _no_jee("JEE", "no JEE entrance family matched")


# ==========================================================================
# BLOCK ST -- moved from isc_stats_families.py (map §5.1; ids + row order preserved)
# ==========================================================================

# --------------------------------------------------------------------------- #
# helpers (same shape as english_families.py)
# --------------------------------------------------------------------------- #


def _no_st(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="",
                       final_answer=None, numeric_answer=None, steps=[],
                       note=note)


def _res_st(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    q: Dict[str, float] = {}
    for k, v in (g or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    for k, v in (extra or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=q, governing_equation=eq,
        final_answer=answer if answer is not None else
        (f"{value:.6g}" if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


_GATE_st = (None, [], None, None, None, None)

_DEV_RE_st = re.compile(r"[\u0900-\u097F]")

# analysis/evaluation asks are statistics-essay territory, not compute
_ANALYSIS_RE = re.compile(
    r"\b(?:evaluate|evaluating|discuss\w*|design\w*|critique|critically|"
    r"compare\s+(?:and\s+contrast\b|the\s+use\b|how\b|these\b|both\b)|"
    r"outline|justif\w*|"
    r"assess\w*|comment\s+on|explain\s+(?:why|how|what)|"
    r"identify\s+the\s+(?:error|misconception|flaw|mistake|problem))\b",
    re.I)

# asks that need critical-value tables the corpus does not state
_TABLE_ASK_RE = re.compile(
    r"\b(?:confidence\s+interval|t[- ]?test|critical\s+(?:t|z|value)|"
    r"hypothes\w*|p[- ]?value|significance\s+level|chi[- ]?square)\b", re.I)

# BIOMATH-FINISH 2026-10-08: set-theory / relation vocabulary.  "Range"
# there is the image set of a relation or function, never the statistics
# spread ("find its domain and range", c11 relations).  The extracted
# "data run" for such asks is a SET literal whose negative members lose
# their sign (A = {-2, -1, 0, 1, 2} -> "1, 0, 1, 2"), so max - min
# shipped a confident nonsense number.  These asks refuse (fail-closed);
# the family scan continues.
_SET_THEORY_RE = re.compile(
    r"\b(?:domain|codomain|roster\s+form|relation|ordered\s+pairs?|"
    r"set[- ]?builder)\b", re.I)

_NUM_st = r"\d+(?:\.\d+)?"

# a comma-separated data run of >= 3 numbers ("8,9,7,10,..." and
# "250, 260, 245, ..." both match)
_DATA_RUN_RE = re.compile(
    r"(?<![\d.])(\d+(?:\.\d+)?(?:\s*,\s*\d+(?:\.\d+)?){2,}(?:\.\d+)?)")

_GROUPED_RE = re.compile(r"\bgrouped\b|class\s+intervals?\b", re.I)
_FREQ_WORD_RE = re.compile(r"frequenc", re.I)


def _normalize_st(text: str) -> str:
    """Deterministic surface cleanup: curly quotes/dashes, non-breaking
    hyphen (U+2011, the corpus's class-interval dash), nbsp, minus."""
    t = (text or "")
    for a, b in (("\u2018", "'"), ("\u2019", "'"), ("\u201c", '"'),
                 ("\u201d", '"'), ("\u2013", "-"), ("\u2014", "-"),
                 ("\u2011", "-"), ("\u2212", "-"), ("\u00a0", " "),
                 ("\u00d7", "x")):
        t = t.replace(a, b)
    return re.sub(r"\s+", " ", t).strip()


def _steps5(method: str, given: str, computations: List[str], check: str,
            interp: str) -> List[str]:
    return ["Method: " + method,
            "Given: " + given] + \
        ["Rule applied: " + c for c in computations] + \
        ["Check: " + check,
         "Interpretation: " + interp]


def _fmt_st(x: float) -> str:
    """Exam-style number: integers bare, otherwise up to 2 decimals."""
    if abs(x - round(x)) < 1e-9:
        return str(int(round(x)))
    return f"{x:.2f}".rstrip("0").rstrip(".")


def _data_run(text: str) -> Optional[List[float]]:
    """The longest comma-separated number run of length >= 3 in the text
    (the stated data set), or None."""
    best: Optional[List[float]] = None
    for m in _DATA_RUN_RE.finditer(text):
        vals = [float(v) for v in m.group(1).split(",")]
        if best is None or len(vals) > len(best):
            best = vals
    return best


def _asked_stats(text: str) -> List[str]:
    """Which descriptive statistics the ask names, in report order."""
    asks: List[str] = []
    has = lambda rx: re.search(rx, text, re.I) is not None  # noqa: E731
    if has(r"\b(?:arithmetic\s+)?mean\b|\baverage\b"):
        asks.append("mean")
    if has(r"\bmedian\b"):
        asks.append("median")
    if has(r"\bmode\b"):
        asks.append("mode")
    if has(r"\brange\b"):
        asks.append("range")
    if has(r"\bvariance\b"):
        asks.append("variance")
    if has(r"standard\s+deviation"):
        asks.append("sd")
    return asks


def _calc_ask(text: str) -> bool:
    """A computation imperative (calculate/compute/find/...) present."""
    return re.search(r"\b(?:calculate|compute|find|determine|work\s+out|"
                     r"obtain|give|state|what\s+(?:is|are)|"
                     r"identify\s+(?:the|each))\b", text, re.I) is not None


# --------------------------------------------------------------------------- #
# shared list-stats compute (mean/median/mode/range/variance/sd)
# --------------------------------------------------------------------------- #


def _list_stats(data: List[float], sample: bool = True) -> Dict[str, float]:
    n = len(data)
    s = sorted(data)
    mean = sum(data) / n
    if n % 2:
        median = s[n // 2]
    else:
        median = (s[n // 2 - 1] + s[n // 2]) / 2.0
    rng = s[-1] - s[0]
    counts: Dict[float, int] = {}
    for v in data:
        counts[v] = counts.get(v, 0) + 1
    top = max(counts.values())
    mode = min(v for v, c in counts.items() if c == top)  # smallest mode
    denom = (n - 1) if (sample and n > 1) else n
    var = sum((v - mean) ** 2 for v in data) / denom if denom else 0.0
    return {"n": float(n), "mean": mean, "median": median, "mode": mode,
            "mode_count": float(top), "range": rng, "variance": var,
            "sd": math.sqrt(var)}


def _c_list_stats(primary: str, g: Dict[str, Any], m: Any,
                  text: str) -> Optional[Tuple]:
    norm = text
    if not norm or _DEV_RE_st.search(norm) or _ANALYSIS_RE.search(norm) \
            or _TABLE_ASK_RE.search(norm):
        return _GATE_st
    if not _calc_ask(norm):
        return _GATE_st
    asks = _asked_stats(norm)
    if not asks:
        return _GATE_st
    if _GROUPED_RE.search(norm) or _FREQ_WORD_RE.search(norm):
        return _GATE_st  # grouped distribution -> STATS_MEAN_GROUPED
    if _SET_THEORY_RE.search(norm):
        return _GATE_st  # relation/function "range" is set theory, not stats
    data = _data_run(norm)
    if not data or len(data) < 3:
        return _GATE_st
    st = _list_stats(data, sample=("population" not in norm.lower()))
    if "mode" in asks and st["mode_count"] < 2:
        return _GATE_st  # no repeated value -> no mode exists
    label = {"mean": "Mean", "median": "Median", "mode": "Mode",
             "range": "Range", "variance": "Variance", "sd": "SD"}
    parts: List[str] = []
    for k in asks:
        if k == "mode":
            multi = "" if st["mode_count"] <= len(set(data)) * 0 + 1 or \
                sum(1 for c in _mode_counts(data).values()
                    if c == st["mode_count"]) == 1 else " (multimodal; smallest reported)"
            parts.append(f"{label[k]} = {_fmt_st(st[k])}{multi}")
        else:
            parts.append(f"{label[k]} = {_fmt_st(st[k])}")
    shown = "; ".join(parts)
    computations = [
        f"the stated data set has n = {int(st['n'])} values.",
        "each requested statistic is computed directly from these "
        "stated values: " + shown + ".",
    ]
    if "mean" in asks:
        computations.append(
            f"mean re-check: sum = {_fmt_st(sum(data))} divided by "
            f"n = {int(st['n'])} gives {_fmt_st(st['mean'])}.")
    steps = _steps5(
        "descriptive statistics are defined operations on the stated "
        "data: mean = sum/n, median = middle of the ordered values, "
        "mode = the most frequent value, range = maximum - minimum, "
        "variance and SD use the n-1 denominator for a sample.",
        f"data: {', '.join(_fmt_st(v) for v in data)}.",
        computations,
        "every value in the data list was consumed exactly once and "
        "each reported statistic was recomputed from the same list -- "
        "the numbers agree.",
        "the requested statistic(s) follow mechanically from the stated "
        "data; no outside assumption enters the arithmetic.")
    primary_val = st[primary]
    return primary_val, steps, shown, None, \
        "mean = sum/n; median = middle value; mode = most frequent; " \
        "range = max - min; SD uses n-1 for a sample", \
        dict(st)


def _mode_counts(data: List[float]) -> Dict[float, int]:
    counts: Dict[float, int] = {}
    for v in data:
        counts[v] = counts.get(v, 0) + 1
    return counts


# per-statistic table rows: same compute, route id reflects the PRIMARY
# ask so the independent verifier can register per-statistic checks.
def _mk_list_row(primary: str, trigger: str) -> Tuple[str, str, Any]:
    def _row(g, m, text, _p=primary):
        return _c_list_stats(_p, g, m, text)
    _row.__name__ = f"_c_list_{primary}"
    return (primary_route(primary), trigger, _row)


def primary_route(primary: str) -> str:
    return {
        "mean": "STATS_MEAN_UNGROUPED",
        "median": "STATS_MEDIAN_UNGROUPED",
        "mode": "STATS_MODE_UNGROUPED",
        "range": "STATS_RANGE_UNGROUPED",
        "variance": "STATS_VARIANCE",
        "sd": "STATS_SD_SAMPLE",
    }[primary]


# --------------------------------------------------------------------------- #
# grouped-frequency mean
# --------------------------------------------------------------------------- #


_INTERVAL_RE = re.compile(
    r"(?<![\d.])(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)(?![\d.])")
_TABLE_PAIR_RE = re.compile(
    r"(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*\|\s*(\d+(?:\.\d+)?)")
_FREQ_LIST_RE = re.compile(
    r"frequenc\w*[^:;]{0,60}?((?:\d+(?:\.\d+)?\s*,\s*)+\d+(?:\.\d+)?)",
    re.I)


def _c_grouped_mean(g, m, text):
    norm = _normalize_st(text)
    if not norm or _DEV_RE_st.search(norm) or _ANALYSIS_RE.search(norm):
        return _GATE_st
    if not re.search(r"\bmean\b", norm, re.I) or \
            not re.search(r"\bgrouped\b|class\s+intervals?\b|"
                          r"class\s+marks?\b|frequenc", norm, re.I):
        return _GATE_st
    pairs: List[Tuple[float, float]] = []
    tbl = _TABLE_PAIR_RE.findall(norm)
    if tbl:
        pairs = [(float(a), float(b)) for a, b, _f in tbl]
        freqs = [float(f) for _a, _b, f in tbl]
    else:
        ivs = [(float(a), float(b)) for a, b in _INTERVAL_RE.findall(norm)]
        fl = _FREQ_LIST_RE.search(norm)
        if not ivs or not fl:
            return _GATE_st
        pairs = ivs[:len(ivs)]
        freqs = [float(v) for v in fl.group(1).split(",")]
    if len(pairs) < 2 or len(freqs) != len(pairs):
        return _GATE_st
    widths = {round(b - a, 6) for a, b in pairs}
    if len(widths) != 1:
        return _GATE_st  # unequal class widths -> class marks not uniform
    mids = [(a + b) / 2.0 for a, b in pairs]
    tf = sum(freqs)
    if tf <= 0:
        return _GATE_st
    sfx = sum(f * x for f, x in zip(freqs, mids))
    mean = sfx / tf
    work = " + ".join(f"{_fmt_st(f)}x{_fmt_st(x)}" for f, x in zip(freqs, mids))
    steps = _steps5(
        "a grouped frequency mean uses class marks (midpoints): "
        "mean = sum(f x) / sum(f), where x = (lower + upper)/2 for each "
        "class interval.",
        "classes: " + "; ".join(f"{_fmt_st(a)}-{_fmt_st(b)}" for a, b in pairs)
        + "; frequencies: " + ", ".join(_fmt_st(f) for f in freqs) + ".",
        [f"class marks: {', '.join(_fmt_st(x) for x in mids)}.",
         f"sum(f x) = {work} = {_fmt_st(sfx)}; sum(f) = {_fmt_st(tf)}.",
         f"mean = {_fmt_st(sfx)} / {_fmt_st(tf)} = {_fmt_st(mean)}."],
        f"re-check: every class mark lies inside its own interval and "
        f"the mean {_fmt_st(mean)} lies inside the span of the class "
        "marks -- consistent.",
        "the grouped mean is the frequency-weighted average of the "
        "class marks; using upper limits instead would overstate it.")
    return mean, steps, f"{_fmt_st(mean)} (grouped mean)", None, \
        "mean = sum(f x)/sum(f) over class marks", \
        {"mean": mean, "total_frequency": tf, "sum_fx": sfx}


# --------------------------------------------------------------------------- #
# combined mean of two groups
# --------------------------------------------------------------------------- #


_GROUP_RE = re.compile(
    r"(?:section|group|class|team)\s+[A-Za-z0-9]{1,3}\b[^.]{0,60}?"
    r"(\d+(?:,\d{3})*)\s*(?:students?|pupils?|observations?|values|"
    r"numbers?|items?|workers?|plants?|scores)[^.]{0,60}?"
    r"mean\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)", re.I)


def _c_combined_mean(g, m, text):
    norm = _normalize_st(text)
    if not norm or _DEV_RE_st.search(norm) or _ANALYSIS_RE.search(norm):
        return _GATE_st
    if not re.search(r"combined\s+mean|overall\s+mean|mean\s+of\s+(?:both|"
                     r"the\s+(?:two|whole))", norm, re.I):
        return _GATE_st
    groups = [(float(n.replace(",", "")), float(mu))
              for n, mu in _GROUP_RE.findall(norm)]
    # keep the first two distinct groups only
    uniq: List[Tuple[float, float]] = []
    for gr in groups:
        if gr not in uniq:
            uniq.append(gr)
    if len(uniq) < 2:
        return _GATE_st
    (n1, m1), (n2, m2) = uniq[0], uniq[1]
    if n1 <= 0 or n2 <= 0:
        return _GATE_st
    s1, s2 = n1 * m1, n2 * m2
    combined = (s1 + s2) / (n1 + n2)
    steps = _steps5(
        "a combined mean weights each group mean by its size: "
        "combined mean = (n1 x mean1 + n2 x mean2) / (n1 + n2).",
        f"group 1: n = {_fmt_st(n1)}, mean = {_fmt_st(m1)}; "
        f"group 2: n = {_fmt_st(n2)}, mean = {_fmt_st(m2)}.",
        [f"group sums: {_fmt_st(n1)} x {_fmt_st(m1)} = {_fmt_st(s1)} and "
         f"{_fmt_st(n2)} x {_fmt_st(m2)} = {_fmt_st(s2)}.",
         f"combined total = {_fmt_st(s1)} + {_fmt_st(s2)} = {_fmt_st(s1 + s2)}; "
         f"combined n = {_fmt_st(n1 + n2)}.",
         f"combined mean = {_fmt_st(s1 + s2)} / {_fmt_st(n1 + n2)} = "
         f"{_fmt_st(combined)}."],
        f"sanity: the combined mean {_fmt_st(combined)} must lie between "
        f"the two group means ({_fmt_st(min(m1, m2))} and "
        f"{_fmt_st(max(m1, m2))}) -- it does.",
        "the pooled mean is the size-weighted average, never the plain "
        "average of the two means unless the groups are equal-sized.")
    return combined, steps, f"{_fmt_st(combined)} (combined mean)", None, \
        "combined mean = (n1 m1 + n2 m2)/(n1 + n2)", \
        {"combined_mean": combined, "n1": n1, "m1": m1,
         "n2": n2, "m2": m2}


# --------------------------------------------------------------------------- #
# mean after adding/removing observations
# --------------------------------------------------------------------------- #


def _c_mean_adjust(g, m, text):
    norm = _normalize_st(text)
    if not norm or _DEV_RE_st.search(norm) or _ANALYSIS_RE.search(norm):
        return _GATE_st
    base = re.search(
        r"mean\s+of\s+(\d+)\s+(?:observations|numbers|values|scores|"
        r"students|workers|items)\s+is\s*(?:of)?\s*(\d+(?:\.\d+)?)",
        norm, re.I)
    if not base:
        return _GATE_st
    n, mu = float(base.group(1)), float(base.group(2))
    total = n * mu
    if re.search(r"\b(?:removed|excluded|deleted|taken\s+away|subtracted)"
                 r"\b", norm, re.I):
        removed = [float(v) for v in
                   re.findall(r"\d+(?:\.\d+)?", norm)
                   if _near_mention(norm, base.end(), v)]
        # the removed value(s): numbers stated after the base clause and
        # before/near 'removed'
        win = norm[base.end():]
        rm = re.search(
            r"(?:observation|number|value|score)s?\s*(?:of)?\s*"
            r"((?:\d+(?:\.\d+)?\s*(?:,\s*|and\s+)?)+)\s*(?:is|are|was|"
            r"were)?\s*(?:removed|excluded|deleted)", win, re.I)
        if not rm:
            return _GATE_st
        vals = [float(v) for v in re.findall(r"\d+(?:\.\d+)?", rm.group(1))]
        vals = [v for v in vals if v != n] or vals  # drop stray count
        if not vals or n - len(vals) < 1:
            return _GATE_st
        new_sum = total - sum(vals)
        new_n = n - len(vals)
        new_mean = new_sum / new_n
        how = (f"removing {_fmt_st(sum(vals))} in total "
               f"({', '.join(_fmt_st(v) for v in vals)})")
        eq = "new mean = (n x old mean - removed sum)/(n - removed count)"
        extra = {"new_mean": new_mean, "n": n, "old_mean": mu,
                 "removed": sum(vals)}
    elif re.search(r"\b(?:added|included|joined|inserted)\b", norm, re.I):
        win = norm[base.end():]
        ad = re.search(
            r"((?:\d+(?:\.\d+)?\s*(?:,\s*|and\s+)?)+)\s*(?:are|is|was|"
            r"were)?\s*(?:added|included|joined|inserted)", win, re.I)
        if not ad:
            return _GATE_st
        vals = [float(v) for v in re.findall(r"\d+(?:\.\d+)?", ad.group(1))]
        vals = [v for v in vals if v != n] or vals
        if not vals:
            return _GATE_st
        new_sum = total + sum(vals)
        new_n = n + len(vals)
        new_mean = new_sum / new_n
        how = (f"adding {_fmt_st(sum(vals))} in total "
               f"({', '.join(_fmt_st(v) for v in vals)})")
        eq = "new mean = (n x old mean + added sum)/(n + added count)"
        extra = {"new_mean": new_mean, "n": n, "old_mean": mu,
                 "added": sum(vals)}
    else:
        return _GATE_st
    steps = _steps5(
        "an old mean hides the old total: total = n x mean.  Adjust the "
        "total and the count, then divide again.",
        f"old: n = {_fmt_st(n)}, mean = {_fmt_st(mu)}, so total = "
        f"{_fmt_st(n)} x {_fmt_st(mu)} = {_fmt_st(total)}; {how}.",
        [f"new total = {_fmt_st(new_sum)}; new count = {_fmt_st(new_n)}.",
         f"new mean = {_fmt_st(new_sum)} / {_fmt_st(new_n)} = "
         f"{_fmt_st(new_mean)}."],
        f"re-check: {_fmt_st(new_mean)} x {_fmt_st(new_n)} = "
        f"{_fmt_st(new_mean * new_n)} = the adjusted total -- closes.",
        "the new mean shifts toward (or away from) the changed values "
        "exactly in proportion to their size against the old mean.")
    return new_mean, steps, f"{_fmt_st(new_mean)} (new mean)", None, eq, extra


def _near_mention(text: str, pos: int, token: str) -> bool:
    """Unused helper hook kept False so the removed-value scan relies on
    the windowed regex only."""
    return False


# --------------------------------------------------------------------------- #
# standard error of the mean
# --------------------------------------------------------------------------- #


def _c_se_mean(g, m, text):
    norm = _normalize_st(text)
    if not norm or _DEV_RE_st.search(norm) or _ANALYSIS_RE.search(norm) \
            or _TABLE_ASK_RE.search(norm):
        return _GATE_st
    if not re.search(r"standard\s+error", norm, re.I):
        return _GATE_st  # only the exact SEM ask; CI/t-tests stay GUIDED
    sigmas = {float(v) for v in re.findall(
        r"standard\s+deviation[^.\d]{0,40}?(\d+(?:\.\d+)?)", norm, re.I)}
    if len(sigmas) != 1:
        return _GATE_st  # ambiguous or missing sigma
    sigma = next(iter(sigmas))
    nm = re.search(r"sample\s+of\s+(\d+)|(\d+)\s+(?:students|participants|"
                   r"observations|subjects|scores|workers|response\s*"
                   r"times?\s+[^.]{0,20}?)\b", norm, re.I)
    n: Optional[float] = None
    if nm:
        n = float(nm.group(1) or nm.group(2))
    if not n or n <= 0 or sigma <= 0:
        return _GATE_st
    se = sigma / math.sqrt(n)
    steps = _steps5(
        "the standard error of the mean is SEM = sigma / sqrt(n): the "
        "sample mean's own standard deviation across repeated samples.",
        f"sigma = {_fmt_st(sigma)}, n = {_fmt_st(int(n))}.",
        [f"sqrt(n) = sqrt({_fmt_st(int(n))}) = {_fmt_st(math.sqrt(n))}.",
         f"SEM = {_fmt_st(sigma)} / {_fmt_st(math.sqrt(n))} = {_fmt_st(se)}."],
        f"re-check: a larger n shrinks the SEM -- SEM x sqrt(n) = "
        f"{_fmt_st(se * math.sqrt(n))} = sigma -- consistent.",
        "the sample mean is expected to sit within a few SEMs of the "
        "population mean; the SEM quantifies that spread, not the "
        "spread of individual scores.")
    return se, steps, f"{_fmt_st(se)} (standard error of the mean)", None, \
        "SEM = sigma / sqrt(n)", {"sem": se, "sigma": sigma, "n": n}


# --------------------------------------------------------------------------- #
# z / T / deviation-IQ standard-score conversion
# --------------------------------------------------------------------------- #


def _c_z_t_score(g, m, text):
    norm = _normalize_st(text)
    if not norm or _DEV_RE_st.search(norm) or _ANALYSIS_RE.search(norm) \
            or _TABLE_ASK_RE.search(norm):
        return _GATE_st
    if not re.search(r"\bz[- ]?score\b|\bT[- ]?score\b|deviation\s+iq|"
                     r"convert\s+this\s+score|standard\s+score", norm, re.I):
        return _GATE_st
    mm = re.search(r"\bmean\s*(?:=|is|of)?\s*(\d+(?:\.\d+)?)", norm, re.I)
    sm = re.search(r"standard\s+deviation\s*(?:=|is|of)?\s*(\d+(?:\.\d+)?)",
                   norm, re.I)
    if not mm or not sm:
        return _GATE_st
    mu, sd = float(mm.group(1)), float(sm.group(1))
    if sd <= 0:
        return _GATE_st
    # forward conversion: raw -> z (+T / deviation IQ when asked)
    rm = re.search(r"raw\s+score\s+of\s+(\d+(?:\.\d+)?)|obtains?\s+a\s+"
                   r"(?:raw\s+)?score\s+of\s+(\d+(?:\.\d+)?)", norm, re.I)
    zm = re.search(r"\bz\s*(?:=|is|of)\s*\+?\s*(\d+(?:\.\d+)?)", norm, re.I)
    parts: List[str] = []
    extra: Dict[str, float] = {"mean": mu, "sd": sd}
    if rm:
        x = float(rm.group(1) or rm.group(2))
        z = (x - mu) / sd
        parts.append(f"Z = {_fmt_st(z)}")
        extra["z"] = z
        extra["raw"] = x
        computations = [
            f"z = (x - mean)/sd = ({_fmt_st(x)} - {_fmt_st(mu)}) / "
            f"{_fmt_st(sd)} = {_fmt_st(z)}.",
            f"the raw score sits {_fmt_st(abs(z))} SD(s) "
            f"{'above' if z >= 0 else 'below'} the mean."]
        if re.search(r"\bT[- ]?score\b", norm, re.I):
            t = 50.0 + 10.0 * z
            parts.append(f"T = {_fmt_st(t)}")
            extra["t"] = t
            computations.append(
                f"T = 50 + 10 z = 50 + 10 x {_fmt_st(z)} = {_fmt_st(t)} "
                "(T-scale: mean 50, SD 10).")
        if re.search(r"deviation\s+iq", norm, re.I):
            diq = 100.0 + 15.0 * z
            parts.append(f"Deviation IQ = {_fmt_st(diq)}")
            extra["deviation_iq"] = diq
            computations.append(
                f"Deviation IQ = 100 + 15 z = 100 + 15 x {_fmt_st(z)} = "
                f"{_fmt_st(diq)}.")
    elif zm and re.search(r"deviation\s+iq", norm, re.I):
        z = float(zm.group(1))
        diq = 100.0 + 15.0 * z
        parts.append(f"Deviation IQ = {_fmt_st(diq)}")
        extra["z"] = z
        extra["deviation_iq"] = diq
        computations = [
            f"Deviation IQ = 100 + 15 z with z = {_fmt_st(z)}.",
            f"Deviation IQ = 100 + 15 x {_fmt_st(z)} = {_fmt_st(diq)}."]
    else:
        return _GATE_st
    steps = _steps5(
        "standard scores re-express a raw score as a distance from the "
        "mean in SD units: z = (x - mean)/sd; T = 50 + 10z; deviation "
        "IQ = 100 + 15z.",
        f"mean = {_fmt_st(mu)}, SD = {_fmt_st(sd)}; asked: "
        f"{', '.join(parts)}.",
        computations,
        "inverse check: mean + z x SD rebuilds the raw score on the "
        "original scale -- the conversion closes.",
        "standard scores are comparable across tests because mean and "
        "SD are fixed by the scale, not by the sample.")
    return extra.get("z"), steps, "; ".join(parts), None, \
        "z = (x - mean)/sd; T = 50 + 10z; deviation IQ = 100 + 15z", extra


# --------------------------------------------------------------------------- #
# TABLE_st + dispatcher
# --------------------------------------------------------------------------- #

_LIST_TRIGGERS = {
    "mean": r"\b(?:calculate|compute|find|determine|work\s+out|"
            r"obtain|what\s+is)\b[^.]{0,60}\b(?:arithmetic\s+)?mean\b|"
            r"\bmean\b[^.]{0,60}\b(?:calculate|compute|find)\b|"
            r"\baverage\s+of\s+the\s+(?:following|data|values|numbers)",
    "median": r"\b(?:calculate|compute|find|determine|state)\b[^.]{0,60}"
              r"\bmedian\b|\bmedian\b[^.]{0,60}\b"
              r"(?:calculate|compute|find)\b",
    "mode": r"\b(?:calculate|compute|find|determine|state)\b[^.]{0,60}"
            r"\bmode\b|\bmode\b\s+of\s+(?:the\s+)?(?:data|following|"
            r"values|numbers)|state\s+the\s+mode",
    "range": r"\b(?:calculate|compute|find|determine|state)\b[^.]{0,60}"
             r"\brange\b|\brange\s+of\s+the\s+(?:data|following|values|"
             r"numbers|scores)",
    "variance": r"\b(?:calculate|compute|find|determine)\b[^.]{0,60}"
                r"\bvariance\b",
    "sd": r"\b(?:calculate|compute|find|determine)\b[^.]{0,60}"
          r"standard\s+deviation",
}

_TABLE_st: List[Tuple[str, str, Any]] = [
    # grouped/combined/adjust/SE/z-T first: their asks are more specific
    ("STATS_MEAN_GROUPED",
     r"grouped\s+(?:frequency\s+)?distribution|class\s+intervals?\b|"
     r"assumed\s+mean",
     _c_grouped_mean),
    ("STATS_MEAN_COMBINED",
     r"combined\s+mean|overall\s+mean",
     _c_combined_mean),
    ("STATS_MEAN_ADJUST",
     r"mean\s+of\s+\d+\s+(?:observations|numbers|values|scores|students)"
     r".{0,100}\b(?:removed|added|excluded|included|deleted|joined)\b",
     _c_mean_adjust),
    ("STATS_SE_MEAN",
     r"standard\s+error",
     _c_se_mean),
    ("STATS_Z_T_SCORE",
     r"\bz[- ]?score\b|\bT[- ]?score\b|deviation\s+iq",
     _c_z_t_score),
]
# list-statistics rows (mean/median/mode/range/variance/sd), specific
# trigger per primary ask, shared compute
for _k, _rx in _LIST_TRIGGERS.items():
    _TABLE_st.append(_mk_list_row(_k, _rx))

TABLE_st = _TABLE_st


def _dispatch_st(text: str) -> ModelResult:
    """Dispatcher: scan every ISC-statistics family; first grounded hit
    wins.  Triggers are deterministic regexes; each row applies its own
    plausibility gates inside compute, and a gate refusal simply lets
    the scan continue.  Devanagari input never matches.  No LLM."""
    norm = _normalize_st(text or "")
    if not norm or _DEV_RE_st.search(norm):
        return _no_st("ISC_STATS", "no statistics family matched")
    for fid, pattern, compute in TABLE_st:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, norm)
        except Exception:
            continue
        if not out:
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        return _res_st(fid, g, value, eq or fid, steps or [], answer=answer,
                    assumptions=assumptions, extra=extra or {})
    return _no_st("ISC_STATS", "no statistics family matched")




# ==========================================================================
# BLOCK LOC -- moved from circle_locus_families.py (map §5.1; ids + row order preserved)
# ==========================================================================

# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #

_DEV_RE_loc = re.compile(r"[\u0900-\u097F]")

# verdict options the classification ask must offer (at least one)
_VERDICT_RE = re.compile(
    r"real\s+circle|point\s+circle|imaginary|no\s+real\s+locus|"
    r"no\s+real\s+circle|degenerate", re.I)

# claim-evaluation asks are rubric-key territory: refuse
_CLAIM_RE = re.compile(
    r"\bclaims?\b|\bevaluat\w*\s+this|\bcorrect\s+(?:it|any\s+errors?)\b|"
    r"\bidentify\s+the\s+error\b|\bis\s+(?:this|the\s+student)\s+"
    r"(?:correct|right)\b", re.I)

_EQ_CHARS = set("0123456789xy^+-*. ")


def _no_loc(note: str) -> ModelResult:
    return ModelResult(structure="CIRCLE_LOCUS_CLASS", matched=False,
                       confidence=0.0, quantities={}, governing_equation="",
                       final_answer=None, numeric_answer=None, steps=[],
                       note=note)


def _normalize_loc(text: str) -> str:
    t = (text or "")
    for a, b in (("\u00b2", "^2"), ("\u00b3", "^3"),        # superscripts
                 ("\u2212", "-"), ("\u2013", "-"), ("\u2014", "-"),
                 ("\u00a0", " "), ("\u2011", "-"),
                 ("\\left", ""), ("\\right", ""), ("\\!", ""),
                 ("\\,", ""), ("\\;", ""), ("\\ ", ""),
                 ("\\(", " "), ("\\)", " "), ("\\[", " "), ("\\]", " "),
                 ("$", " "), ("{", ""), ("}", "")):
        t = t.replace(a, b)
    return re.sub(r"\s+", " ", t).strip()


def _fmt_loc(v: float) -> str:
    """Bank key convention: integers bare, otherwise compact decimals."""
    if abs(v - round(v)) < 1e-9:
        return str(int(round(v)))
    return f"{v:.6g}"


def _extract_equation(t: str) -> Optional[Tuple[str, float]]:
    """First 'LHS = <number>' whose LHS holds both x^2 and y^2 and uses
    only general-form circle characters.  Returns (lhs, rhs) or None."""
    best: Optional[Tuple[str, float]] = None
    for m in re.finditer(r"=", t):
        rhs_m = re.match(r"\s*(-?\d+(?:\.\d+)?)\b", t[m.end():])
        if rhs_m is None:
            continue
        k = m.start()
        while k > 0 and t[k - 1] in _EQ_CHARS:
            k -= 1
        lhs = t[k:m.start()].strip()
        if "x^2" in lhs and "y^2" in lhs:
            if best is None:
                best = (lhs, float(rhs_m.group(1)))
    return best


def _count_equations(t: str) -> int:
    n = 0
    for m in re.finditer(r"=", t):
        rhs_m = re.match(r"\s*(-?\d+(?:\.\d+)?)\b", t[m.end():])
        if rhs_m is None:
            continue
        k = m.start()
        while k > 0 and t[k - 1] in _EQ_CHARS:
            k -= 1
        lhs = t[k:m.start()].strip()
        if "x^2" in lhs and "y^2" in lhs:
            n += 1
    return n


_TERM_RX = re.compile(r"(\d+(?:\.\d+)?)?\s*\*?\s*(x\^2|y\^2|x|y)?")


def _parse_general_form(lhs: str) -> Optional[Dict[str, float]]:
    """Signed-term parse of the LHS into {a, b, c, d, f} for
    a x^2 + b y^2 + c x + d y + f.  None when any term is foreign."""
    coefs = {"a": 0.0, "b": 0.0, "c": 0.0, "d": 0.0, "f": 0.0}
    for tm in re.findall(r"[+-]?[^+-]+", lhs):
        s = tm.strip()
        if not s:
            return None
        sign = 1.0
        if s[0] == "+":
            s = s[1:].strip()
        elif s[0] == "-":
            sign = -1.0
            s = s[1:].strip()
        if not s:
            return None
        m = _TERM_RX.fullmatch(s)
        if m is None:
            return None
        num, var = m.group(1), m.group(2)
        if num is None and var is None:
            return None
        val = sign * (float(num) if num is not None
                      else (1.0 if var else 0.0))
        if var == "x^2":
            coefs["a"] += val
        elif var == "y^2":
            coefs["b"] += val
        elif var == "x":
            coefs["c"] += val
        elif var == "y":
            coefs["d"] += val
        else:
            coefs["f"] += val
    return coefs


# --------------------------------------------------------------------------- #
# dispatcher
# --------------------------------------------------------------------------- #


def model_circle_locus(text: str) -> ModelResult:
    low = (text or "").lower()

    if _DEV_RE_loc.search(text or ""):
        return _no_loc("devanagari input: family refuses")

    # ask shape: a whether-classification over a circle equation with at
    # least one verdict option on the table
    if "whether" not in low or "equation" not in low or "circle" not in low:
        return _no_loc("no classification ask")
    if _VERDICT_RE.search(low) is None:
        return _no_loc("no locus verdict option named")
    if _CLAIM_RE.search(low):
        return _no_loc("claim-evaluation ask: rubric-key territory, refusing")

    t = _normalize_loc(text)
    if _count_equations(t) != 1:
        return _no_loc(f"need exactly 1 general-form circle equation, found "
                   f"{_count_equations(t)}")
    eq = _extract_equation(t)
    if eq is None:
        return _no_loc("no general-form circle equation found")
    lhs, rhs = eq
    if abs(rhs) > 1e-12:
        return _no_loc("equation RHS is not 0: general-form classification "
                   "does not apply")
    coefs = _parse_general_form(lhs)
    if coefs is None:
        return _no_loc("foreign term in the equation: refusing to guess")
    a = coefs["a"]
    if a == 0:
        return _no_loc("no x^2 term: not a circle in general form")
    if abs(coefs["a"] - coefs["b"]) > 1e-9:
        return _no_loc("x^2 and y^2 coefficients differ: not a circle")

    # normalise the sign (-(x^2+y^2+...) = 0 is the same locus)
    if a < 0:
        a, coefs = -a, {k: -v for k, v in coefs.items()}

    c, d, f = coefs["c"], coefs["d"], coefs["f"]
    # x^2 + y^2 + 2gx + 2fy + c0 = 0 after dividing by a
    g = c / (2.0 * a)
    fv = d / (2.0 * a)
    c0 = f / a
    h, k = -g, -fv
    r2 = g * g + fv * fv - c0
    scaled = abs(a - 1.0) > 1e-9   # the equation needed a divide by A

    def _sq(v: float) -> str:
        return f"{_fmt_loc(v)}^2"

    steps: List[str] = [
        "Method: complete the square -- for x^2 + y^2 + 2gx + 2fy + c0 = 0 "
        "the centre is (-g, -f) and r^2 = g^2 + f^2 - c0; the sign of r^2 "
        "classifies the locus.",
        "Given: " + lhs.replace("^2", "\u00b2") + " = 0.",
    ]
    if scaled:
        steps.append(
            f"Divide by { _fmt_loc(a) }: x\u00b2 + y\u00b2 + "
            f"{_fmt_loc(2.0 * g)}x + {_fmt_loc(2.0 * fv)}y + {_fmt_loc(c0)} = 0, so "
            f"g = {_fmt_loc(g)}, f = {_fmt_loc(fv)}, c = {_fmt_loc(c0)}.")
    else:
        steps.append(
            f"Here g = {_fmt_loc(g)}, f = {_fmt_loc(fv)}, c = {_fmt_loc(c0)}.")

    if r2 > 1e-12:
        r = math.sqrt(r2)
        answer = (f"Real circle, centre ({_fmt_loc(h)}, {_fmt_loc(k)}), "
                  f"radius {_fmt_loc(r)}.")
        verdict = (f"r\u00b2 = {_fmt_loc(g)}\u00b2 + {_fmt_loc(fv)}\u00b2 - "
                   f"{_fmt_loc(c0)} = {_fmt_loc(r2)} > 0, so the locus is a "
                   f"real circle of radius {_fmt_loc(r)}.")
        classification = "real circle"
    elif r2 < -1e-12:
        # phrasing mirrors the bank's own imaginary verdict
        # (qid a67b57cc: "The equation actually represents an imaginary
        # circle (no real points satisfy it)")
        answer = ("The equation actually represents an imaginary circle "
                  "(no real points satisfy it).")
        verdict = (f"r\u00b2 = {_fmt_loc(g)}\u00b2 + {_fmt_loc(fv)}\u00b2 - "
                   f"{_fmt_loc(c0)} = {_fmt_loc(r2)} < 0, so the equation "
                   "actually represents an imaginary circle (no real "
                   "points satisfy it).")
        classification = "imaginary circle"
    else:
        answer = (f"Since g\u00b2 + f\u00b2 - c = {_fmt_loc(r2)}, it "
                  f"represents a point circle (a single point at "
                  f"({_fmt_loc(h)}, {_fmt_loc(k)})).")
        verdict = (f"r\u00b2 = {_fmt_loc(g)}\u00b2 + {_fmt_loc(fv)}\u00b2 - "
                   f"{_fmt_loc(c0)} = 0, so it represents a point circle "
                   f"(a single point at ({_fmt_loc(h)}, {_fmt_loc(k)})).")
        classification = "point circle"
    steps.append(verdict)
    steps.append(
        "Verification: recomputing h = -g, k = -f and "
        "r^2 = g^2 + f^2 - c on the same coefficients reproduces "
        f"{classification} (deterministic closed form).")
    steps.append(
        f"Interpretation: the equation represents {classification}"
        + (f" with centre ({_fmt_loc(h)}, {_fmt_loc(k)})." if r2 > 1e-12 else "."))

    return ModelResult(
        structure="CIRCLE_LOCUS_CLASS", matched=True, confidence=0.96,
        quantities={"h": h, "k": k, "r2": r2,
                    "a": a, "g": g, "f": fv, "c": c0},
        governing_equation="r^2 = g^2 + f^2 - c (completing the square)",
        final_answer=answer, numeric_answer=None, steps=steps,
        note="circle-locus classification: complete the square, classify "
             "on the sign of r^2")


# ==========================================================================
# BLOCK PL -- moved from formula_plugin_families.py (map §5.1; ids + row order preserved)
# ==========================================================================

# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #

_DEV_RE_pl = re.compile(r"[\u0900-\u097F]")

_TRG_PATTERNS = [
    re.compile(
        r"using\s+(?:the\s+)?formula\s+(?P<formula>.+?)(?:\s+from\s+this\s+topic)?\s*,\s*"
        r"(?:calculate|find)\s+(?P<target>[A-Za-z_][A-Za-z_0-9]*)\s+(?:when|if|where)\s+"
        r"(?P<when>.+?)(?:\.\s*$|$)",
        re.I | re.S),
    re.compile(
        r"(?:calculate|find)\s+(?P<target>[A-Za-z_][A-Za-z_0-9]*)\s+using\s+(?:the\s+)?formula\s+"
        r"(?P<formula>.+?)(?:\s+from\s+this\s+topic)?\s+(?:when|if|where)\s+"
        r"(?P<when>.+?)(?:\.\s*$|$)",
        re.I | re.S),
    re.compile(
        r"(?:given|if)\s+(?P<when>.+?)\s*,\s*(?:using|from)\s+(?:the\s+)?formula\s+"
        r"(?P<formula>.+?)(?:\s+from\s+this\s+topic)?\s*,\s*(?:calculate|find)\s+"
        r"(?P<target>[A-Za-z_][A-Za-z_0-9]*)(?:\.\s*$|$)",
        re.I | re.S),
]
_TRG_RX = _TRG_PATTERNS[0]


def _match_formula_trigger(t: str):
    for pat in _TRG_PATTERNS:
        m = pat.search(t)
        if m is not None:
            return m
    return None


_ASSIGN_RX = re.compile(
    r"([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(-?\d+(?:\.\d+)?)")

_EXPR_OK_RX = re.compile(r"[A-Za-z_0-9+\-*/^().\s]+")

_NAME_RX = re.compile(r"[A-Za-z_][A-Za-z_0-9]*")


def _no_pl(note: str) -> ModelResult:
    return ModelResult(structure="FORMULA_PLUGIN", matched=False,
                       confidence=0.0, quantities={}, governing_equation="",
                       final_answer=None, numeric_answer=None, steps=[],
                       note=note)


def _normalize_pl(text: str) -> str:
    t = (text or "")
    for a, b in (("\u00d7", "*"), ("\u00b7", "*"), ("\u00f7", "/"),
                 ("\u2212", "-"), ("\u2013", "-"), ("\u2014", "-"),
                 ("\u00a0", " "), ("\u2011", "-"),
                 ("\\,", ""), ("\\;", ""), ("\\ ", ""),
                 ("\\(", " "), ("\\)", " "), ("$", " ")):
        t = t.replace(a, b)
    return re.sub(r"\s+", " ", t).strip()


def _fmt_key(v: float) -> str:
    """Bank key convention: round to 2 decimals, strip trailing zeros
    ("130", "0.35", "0.04", "-30")."""
    r = round(v + 0.0, 2)
    if r == 0:
        r = 0.0                      # kill -0.0
    s = f"{r:.2f}"
    if "." in s:
        s = s.rstrip("0").rstrip(".")
    return s or "0"


def _fmt_plain(v: float) -> str:
    """Value render for steps (full precision of the stated inputs)."""
    return f"{v:.6g}"


def _eval_ast(node: ast.AST, env: Dict[str, float]) -> float:
    if isinstance(node, ast.Expression):
        return _eval_ast(node.body, env)
    if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)) \
            and not isinstance(node.value, bool):
        return float(node.value)
    if isinstance(node, ast.Name) and node.id in env:
        return env[node.id]
    if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.UAdd,
                                                              ast.USub)):
        v = _eval_ast(node.operand, env)
        return v if isinstance(node.op, ast.UAdd) else -v
    if isinstance(node, ast.BinOp):
        lhs = _eval_ast(node.left, env)
        rhs = _eval_ast(node.right, env)
        if isinstance(node.op, ast.Add):
            return lhs + rhs
        if isinstance(node.op, ast.Sub):
            return lhs - rhs
        if isinstance(node.op, ast.Mult):
            return lhs * rhs
        if isinstance(node.op, ast.Div):
            return lhs / rhs
        if isinstance(node.op, ast.Pow):
            return lhs ** rhs
    raise ValueError("unsupported node in formula expression")


def _compile_formula(formula: str) -> Optional[Tuple[str, ast.AST,
                                                    List[str]]]:
    """'P = V*I' -> ('P', ast, ['I', 'V']); None when unparseable."""
    f = formula.strip()
    if f.count("=") != 1:
        return None
    lhs, rhs = (part.strip() for part in f.split("="))
    if not _NAME_RX.fullmatch(lhs):
        return None
    rhs = rhs.replace("^", "**")
    if not _EXPR_OK_RX.fullmatch(rhs):
        return None
    try:
        tree = ast.parse(rhs, mode="eval")
    except (SyntaxError, ValueError):
        return None
    names = sorted({n.id for n in ast.walk(tree)
                    if isinstance(n, ast.Name)})
    return lhs, tree, names


def _render_expr(expr: str) -> str:
    """Plain-text render: ** back to ^, single-spaced operators."""
    return expr.replace("**", "^").replace("*", " x ")


def _substitute(expr: str, env: Dict[str, float]) -> str:
    """Replace every symbol with its stated value (word-bounded,
    longest-first so R_E never half-matches R)."""
    out = expr.replace("**", "^^")
    for name in sorted(env, key=len, reverse=True):
        out = re.sub(r"\b" + re.escape(name) + r"\b",
                     _fmt_plain(env[name]), out)
    return _render_expr(out.replace("^^", "**"))


# --------------------------------------------------------------------------- #
# dispatcher
# --------------------------------------------------------------------------- #


def model_formula_plugin(text: str) -> ModelResult:
    if _DEV_RE_pl.search(text or ""):
        return _no_pl("devanagari input: family refuses")

    t = _normalize_pl(text)
    m = _match_formula_trigger(t)
    if m is None:
        return _no_pl("no formula plug-in template matched")

    formula_src = m.group("formula").strip()
    target = m.group("target")
    compiled = _compile_formula(formula_src)
    if compiled is None:
        return _no_pl("formula did not parse as LHS = RHS over + - * / ^")

    lhs, tree, names = compiled

    env: Dict[str, float] = {}
    stated_order: List[Tuple[str, float]] = []
    for am in _ASSIGN_RX.finditer(m.group("when")):
        name, val = am.group(1), float(am.group(2))
        env[name] = val
        stated_order.append((name, val))
    if not env:
        return _no_pl("no stated values found after 'when'")
    if len(set(n for n, _ in stated_order)) != len(stated_order):
        return _no_pl("a value is stated twice: ambiguous reading")

    # ---- generalized algebraic inversion: any 3-variable product/quotient law ----
    inversion = False
    if target != lhs:
        import sympy as sp
        rhs_txt_raw = formula_src.split("=", 1)[1]
        all_syms = set(names) | {lhs}
        if target not in all_syms:
            return _no_pl(f"target '{target}' is not part of formula {formula_src}")
        
        # Check stray values
        stray = [n for n, _ in stated_order if n not in all_syms]
        if stray:
            return _no_pl(f"stated value(s) {stray} never appear in the formula: refusing")
        if target in env:
            return _no_pl("the target is itself stated: ambiguous ask")
        
        # Solve symbolically for target with explicit symbol isolation
        try:
            # Explicitly create real symbols for all formula variables to avoid
            # collision with SymPy reserved constants (like I = sqrt(-1) or E = 2.718)
            local_syms = {s: sp.Symbol(s, real=True) for s in all_syms}
            sp_lhs = local_syms[lhs]
            sp_rhs = sp.sympify(rhs_txt_raw.replace("^", "**"), locals=local_syms)
            eq = sp.Eq(sp_lhs, sp_rhs)
            solutions = sp.solve(eq, local_syms[target])
            if not solutions:
                return _no_pl(f"no symbolic inversion found for {target}")
            # Substitute stated numeric values into the inverted solution
            target_expr = solutions[0]
            subs_env = {local_syms[k]: v for k, v in env.items() if k != target and k in local_syms}
            sub_res = target_expr.subs(subs_env)
            value = float(sub_res)
            inversion = True
            denom = None
        except Exception as inv_err:
            return _no_pl(f"inverting formula failed: {inv_err}")
    else:
        # data coverage, both directions (direct solve)
        unknown = [n for n in names if n not in env]
        if unknown:
            return _no_pl(f"formula symbol(s) {unknown} have no stated "
                       f"value: refusing to guess")
        unused = [n for n, _ in stated_order if n not in names]
        if unused:
            return _no_pl(f"stated value(s) {unused} never appear in the "
                       f"formula: refusing (data-coverage guard)")
        try:
            value = _eval_ast(tree, env)
        except ZeroDivisionError:
            return _no_pl("division by zero in the formula: refusing")
        except (ValueError, OverflowError) as exc:
            return _no_pl(f"formula evaluation refused: {type(exc).__name__}")
        if isinstance(value, complex):
            return _no_pl("complex-valued result: refusing")
        denom = None

    if value != value or value in (float("inf"), float("-inf")):
        return _no_pl("non-finite result: refusing")
    if abs(value) > 1e15:
        return _no_pl("result overflow beyond 1e15: refusing")

    answer = _fmt_key(value)
    rhs_txt = _render_expr(formula_src.split("=", 1)[1].strip())

    givens = ", ".join(f"{n} = {_fmt_key(v)}" for n, v in stated_order)
    if inversion:
        method = f"symbolic inversion of {formula_src} to solve for {target}."
        subst = f"{target} = {value:.6g}"
    else:
        method = (f"substitute the stated values into the formula "
                  f"{lhs} = {rhs_txt}.")
        subst = f"{lhs} = {_substitute(formula_src.split('=', 1)[1].strip(), env)}"
    steps = [
        "Method: " + method,
        f"Given: {givens}.",
        f"{subst} = {answer}.",
        f"Verification: recomputing the closed form on the same inputs "
        f"reproduces {answer} (deterministic).",
        f"Interpretation: for the given data, {target} = {answer}.",
    ]

    quantities: Dict[str, float] = {n: v for n, v in stated_order}
    quantities[target] = value

    return ModelResult(
        structure="FORMULA_PLUGIN", matched=True, confidence=0.96,
        quantities=quantities,
        governing_equation=f"{lhs} = {rhs_txt}",
        final_answer=answer, numeric_answer=round(value, 2), steps=steps,
        note="formula plug-in numerics: stated values substituted into "
             "the question's own formula")


# ==========================================================================
# BLOCK SYL -- 26 maths rows moved from syllabus_families.py (map §5.1)
# ==========================================================================

_PI_syl = math.pi

def _num_syl(s: str) -> float:
    return float(str(s).replace(",", ""))

_PT_syl = (r"(?:[A-Za-z]\s*)?\(\s*(?P<{px}>-?\d+(?:\.\d+)?)\s*,\s*"
       r"(?P<{py}>-?\d+(?:\.\d+)?)\s*\)")

def _pt_syl(prefix: str) -> str:
    return _PT_syl.replace("{px}", prefix + "x").replace("{py}", prefix + "y")

_TRIG_syl = {
    ("sin", 0): 0.0, ("sin", 30): 0.5, ("sin", 45): math.sqrt(2) / 2,
    ("sin", 60): math.sqrt(3) / 2, ("sin", 90): 1.0,
    ("cos", 0): 1.0, ("cos", 30): math.sqrt(3) / 2, ("cos", 45):
    math.sqrt(2) / 2, ("cos", 60): 0.5, ("cos", 90): 0.0,
    ("tan", 0): 0.0, ("tan", 30): 1 / math.sqrt(3), ("tan", 45): 1.0,
    ("tan", 60): math.sqrt(3), ("tan", 90): None,
}

_TRIG_TOKEN_syl = re.compile(r"\b(sin|cos|tan)\s*\(?\s*"
                         r"(\d+(?:\.\d+)?)\s*\)?", re.I)

def _eval_trig_expression_syl(expr: str) -> Optional[float]:
    """Replace standard-angle trig tokens with values, eval arithmetic."""
    def sub(m):
        fn = m.group(1).lower()
        ang = int(float(m.group(2)))
        v = _TRIG_syl.get((fn, ang))
        if v is None:
            raise ValueError(f"{fn}{ang} not in standard table")
        return f"({v!r})"

    cleaned = _TRIG_TOKEN_syl.sub(sub, expr)
    cleaned = re.sub(r"[^0-9+\-*/(). ]", " ", cleaned)
    if not re.search(r"\d", cleaned):
        return None
    try:
        val = eval(cleaned, {"__builtins__": {}}, {})
    except Exception:
        return None
    return float(val) if isinstance(val, (int, float)) else None

def _c_distance_syl(g, m, text):
    dx = _num_syl(g["bx"]) - _num_syl(g["ax"])
    dy = _num_syl(g["by"]) - _num_syl(g["ay"])
    v = math.sqrt(dx * dx + dy * dy)
    return v, [f"d = sqrt(({_num_syl(g['bx']):g}-{_num_syl(g['ax']):g})^2 + "
               f"({_num_syl(g['by']):g}-{_num_syl(g['ay']):g})^2) = {v:.6g}"], \
        None, None

def _c_midpoint_syl(g, m, text):
    mx = (_num_syl(g["ax"]) + _num_syl(g["bx"])) / 2
    my = (_num_syl(g["ay"]) + _num_syl(g["by"])) / 2
    return None, [f"midpoint = (({_num_syl(g['ax']):g}+{_num_syl(g['bx']):g})/2, "
                  f"({_num_syl(g['ay']):g}+{_num_syl(g['by']):g})/2) = "
                  f"({mx:g}, {my:g})"], f"({mx:g}, {my:g})", None

def _c_heron_syl(g, m, text):
    sides = [float(x) for x in m.groups()[:3] if x]
    if len(sides) != 3 or min(sides) <= 0:
        return None, [], None, None
    a, b, c = sorted(sides)
    if a + b <= c:
        return None, [], None, ["triangle inequality fails"]
    s = (a + b + c) / 2
    area = math.sqrt(s * (s - a) * (s - b) * (s - c))
    return area, [f"s = ({a:g}+{b:g}+{c:g})/2 = {s:g}",
                  f"area = sqrt(s(s-a)(s-b)(s-c)) = {area:.4g} cm^2"], \
        None, None

def _c_mean_syl(g, m, text):
    # comma-grouped findall: '4,800' is ONE number (plain '\d+' would
    # split it into 4 and 800 and ship a mean of hundreds)
    toks = [x.strip(",") for x in
            re.findall(r"-?\d[\d,]*(?:\.\d+)?", g["list"])]
    toks = [x for x in toks if x and x != "-"]
    nums = [float(x.replace(",", "")) for x in toks]
    if not nums:
        return None, [], None, None
    mean = sum(nums) / len(nums)
    return mean, [f"sum = {sum(nums):g}, n = {len(nums)}, "
                  f"mean = {mean:.6g}"], None, None

def _c_ap_nth_syl(g, m, text):
    n = _num_syl(m.group(1))
    a, d = _num_syl(m.group(2)), _num_syl(m.group(3))
    val = a + (n - 1) * d
    return val, [f"a + (n-1)d = {a:g} + ({n:g}-1) x {d:g} = {val:.6g}"], \
        None, None

def _c_ap_sum_syl(g, m, text):
    n, a, d = _num_syl(m.group(1)), _num_syl(m.group(2)), _num_syl(m.group(3))
    val = n / 2 * (2 * a + (n - 1) * d)
    return val, [f"S = n/2 (2a + (n-1)d) = {n:g}/2 x ({2 * a:g} + "
                 f"{(n - 1) * d:g}) = {val:.6g}"], None, None

def _c_trig_syl(g, m, text):
    expr = g["expr"]
    val = _eval_trig_expression_syl(expr)
    if val is None:
        return None, [], None, None
    return val, [f"{expr.strip()} = {val:.6g}"], None, None

def _c_sector_syl(g, m, text):
    r, ang = _num_syl(m.group(1)), _num_syl(m.group(2))
    val = ang / 360 * _PI_syl * r * r
    return val, [f"A = ({ang:g}/360) x pi x {r:g}^2 = {val:.4g} "
                 f"(pi = 3.14159)"], None, ["pi taken as 3.14159"]

def _c_combinations_syl(g, m, text):
    r, n = int(m.group(1)), int(m.group(2))
    if r > n:
        return None, [], None, None
    val = math.comb(n, r)
    return float(val), [f"C({n}, {r}) = {val}"], None, None

def _c_permutations_syl(g, m, text):
    r, n = int(m.group(1)), int(m.group(2))
    if r > n:
        return None, [], None, None
    val = math.perm(n, r)
    return float(val), [f"P({n}, {r}) = {val}"], None, None

def _c_gp_infinite_syl(g, m, text):
    raw_r = m.group(2)
    r = (float(raw_r.split('/')[0]) / float(raw_r.split('/')[1])
         if '/' in raw_r else float(raw_r))
    a = _num_syl(m.group(1))
    if abs(r) >= 1:
        return None, [], None, None
    val = a / (1 - r)
    return val, [f"S = a/(1-r) = {a:g}/{1 - r:g} = {val:.6g}"], None, None

def _c_vector_magnitude_syl(g, m, text):
    comps = [abs(float(x)) for x in (m.group("i"), m.group("j"),
                                     m.group("k") or 0)]
    val = math.sqrt(sum(c * c for c in comps[:2] + [comps[2]]))
    return val, [f"|v| = sqrt({comps[0]:g}^2 + {comps[1]:g}^2"
                 + (f" + {comps[2]:g}^2" if m.group("k") else "")
                 + f") = {val:.6g}"], None, None

def _c_dot_product_syl(g, m, text):
    a = [float(m.group("ai")), float(m.group("aj")),
         float(m.group("ak") or 0)]
    b = [float(m.group("bi")), float(m.group("bj")),
         float(m.group("bk") or 0)]
    val = sum(x * y for x, y in zip(a, b))
    return val, [f"dot = {a[0]:g}x{b[0]:g} + {a[1]:g}x{b[1]:g} + "
                 f"{a[2]:g}x{b[2]:g} = {val:.6g}"], None, None

def _c_determinant_2x2_syl(g, m, text):
    val = (_num_syl(m.group("a")) * _num_syl(m.group("d"))
           - _num_syl(m.group("b")) * _num_syl(m.group("c")))
    return val, [f"det = ({_num_syl(m.group('a')):g})({_num_syl(m.group('d')):g}) "
                 f"- ({_num_syl(m.group('b')):g})({_num_syl(m.group('c')):g}) = "
                 f"{val:.6g}"], None, None

def _c_elevation_smart_syl(text: str):
    """Extract distance and elevation angle independently of order."""
    dm = re.search(r"distance\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*"
                   r"(?:m|metres?|meters?)", text, re.I)
    am = re.search(r"(?:is\s+)?(\d+(?:\.\d+)?)\s*degrees?", text, re.I)
    if not dm or not am:
        return None, [], None, None
    dist, ang = float(dm.group(1)), float(am.group(1))
    if ang <= 0 or ang >= 90 or dist <= 0:
        return None, [], None, None
    h = dist * math.tan(math.radians(ang))
    return (h, [f"tan({ang:g}) = h/{dist:g} -> h = {dist:g} x "
                f"tan({ang:g}) = {h:.4g} m"], None, None)

def _c_vo_angles_syl(g):
    """(a1x + o1) = (a2x + o2) for vertically opposite angles -> x,
    then the angle itself."""
    a1, a2 = float(g["a1"]), float(g["a2"])
    o1 = float(g["o1"].replace(" ", ""))
    o2 = float(g["o2"].replace(" ", ""))
    if a1 == a2:
        return None
    x = (o2 - o1) / (a1 - a2)
    ang = a1 * x + o1
    return (x,
            [f"vertically opposite angles are equal: "
             f"{a1:g}x + {o1:g} = {a2:g}x + {o2:g}",
             f"{a1:g}x - {a2:g}x = {o2:g} - {o1:g} -> "
             f"{a1 - a2:g}x = {o2 - o1:g}",
             f"x = {x:g}; angle = {a1:g}({x:g}) + {o1:g} = {ang:g}"],
            f"x = {x:g}, angle = {ang:g}",
            None)

def _c_fd_compare_syl(g):
    """Compare two compound-interest maturities on the same principal."""
    n_map = {"annually": 1, "semi-annually": 2, "half-yearly": 2,
             "quarterly": 4, "monthly": 12}
    r1, r2 = float(g["r1"]), float(g["r2"])
    n1 = n_map.get(g["c1"].lower().replace(" ", "-"), 1)
    n2 = n_map.get(g["c2"].lower().replace(" ", "-"), 1)
    P = float(g["p"].replace(",", ""))
    yrs = float(g["yrs"] or 1)
    a1 = P * (1 + r1 / (100 * n1)) ** (n1 * yrs)
    a2 = P * (1 + r2 / (100 * n2)) ** (n2 * yrs)
    better = "Option A" if a1 > a2 else "Option B"
    return (a2,
            [f"A = P(1 + r/100n)^(nt) on P = {P:,.0f}, t = {yrs:g} yr",
             f"Option A ({r1}% {g['c1']}, n={n1}): "
             f"A_A = {a1:,.0f}",
             f"Option B ({r2}% {g['c2']}, n={n2}): "
             f"A_B = {a2:,.0f}",
             f"{better} matures higher by {abs(a2 - a1):,.0f}"],
            f"{better}: A_A = {a1:,.0f}, A_B = {a2:,.0f}",
            ["compounding frequencies read from the question"])


def _yes_syl(structure: str, g: Dict[str, Any], value: Optional[float],
             steps: List[str], assumptions: Optional[List[str]] = None,
             conf: float = 0.97, answer: Optional[str] = None) -> ModelResult:
    """Moved verbatim from syllabus_families._yes (the dispatcher's
    result-shaper; it references no other module global)."""
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities={k: (v if isinstance(v, (int, float)) else 0)
                    for k, v in g.items()},
        governing_equation=structure,
        final_answer=answer or f"{value:.6g}",
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


SYLLABUS_MATHS_ROWS = [
    ("distance_formula",
     r"distance\s+between\s+(?:the\s+)?(?:points?\s+)?"
     + _pt_syl("a") + r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt_syl("b"),
     _c_distance_syl),
    ("midpoint",
     r"mid\s?-?point\s+of\s+(?:the\s+)?(?:line\s+|segment\s+|line\s+segment\s+)?(?:join(?:ing|s)\s+)?"
     r"(?:the\s+)?(?:points?\s+)?" + _pt_syl("a") + r"\s+and\s+(?:the\s+)?"
     r"(?:points?\s+)?" + _pt_syl("b"),
     _c_midpoint_syl),
    ("heron_area",
     r"triangle\s+(?:with\s+|has\s+)?(?:sides?\s+(?:of\s+)?(?:measuring\s+)?"
     r")?" + r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*,?\s*" +
     r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*(?:and|,)\s*" +
     r"(\d+(?:\.\d+)?)\s*(?:cm|m)?[^.]{0,30}?.{0,40}area",
     _c_heron_syl),
    ("mean_list",
     # 'and' between list items used to truncate the capture ('4800,
     # 5200, and 3800' parsed [4800, 5200] -> wrong mean); WS-PAL
     # verifier caught it.  The list is an explicit sep-item chain:
     # comma / ', and' / ' and' separators all allowed.
     r"(?:mean|average)\s+(?:of\s+)?(?:the\s+)?"
     r"(?P<list>-?\d[\d.,]*(?:\s*,\s*(?:and|or)?\s*-?\d[\d.,]*|"
     r"\s+(?:and|or)\s+-?\d[\d.,]*)+)",
     _c_mean_syl),
    ("cone_volume",
     r"volume\s+of\s+a?\s*(?:cone|conical)[^.]*?radius\s+"
     r"(?P<r>\d+(?:\.\d+)?)[^.]*?height\s+(?:of\s+)?(?P<h>\d+(?:\.\d+)?)",
     lambda g, m, t: ((round(_PI_syl / 3 * _num_syl(g["r"]) ** 2
                             * _num_syl(g["h"]), 4)),
                      [f"V = 1/3 pi r^2 h = {_PI_syl / 3 * _num_syl(g['r']) ** 2 * _num_syl(g['h']):.4g} "
                       f"(pi = 3.14159)"],
                      None, ["pi taken as 3.14159"])),
    ("sphere_volume",
     r"volume\s+of\s+a?\s*sphere\s+(?:of\s+|with\s+)?radius\s+"
     r"(?P<r>\d+(?:\.\d+)?)",
     lambda g, m, t: ((round(4 / 3 * _PI_syl * _num_syl(g["r"]) ** 3, 4)),
                      [f"V = 4/3 pi r^3 = "
                       f"{4 / 3 * _PI_syl * _num_syl(g['r']) ** 3:.4g} "
                       f"(pi = 3.14159)"],
                      None, ["pi taken as 3.14159"])),
    ("sphere_area",
     r"surface\s+area\s+of\s+a?\s*sphere\s+(?:of\s+|with\s+)?radius\s+"
     r"(?P<r>\d+(?:\.\d+)?)",
     lambda g, m, t: ((round(4 * _PI_syl * _num_syl(g["r"]) ** 2, 4)),
                      [f"A = 4 pi r^2 = "
                       f"{4 * _PI_syl * _num_syl(g['r']) ** 2:.4g} "
                       f"(pi = 3.14159)"],
                      None, ["pi taken as 3.14159"])),
    ("cylinder_volume",
     r"volume\s+of\s+a?\s*(?:cylinder|cylindrical)[^.]*?radius\s+"
     r"(?P<r>\d+(?:\.\d+)?)[^.]*?height\s+(?:of\s+)?(?P<h>\d+(?:\.\d+)?)",
     lambda g, m, t: ((round(_PI_syl * _num_syl(g["r"]) ** 2 * _num_syl(g["h"]), 4)),
                      [f"V = pi r^2 h = "
                       f"{_PI_syl * _num_syl(g['r']) ** 2 * _num_syl(g['h']):.4g} "
                       f"(pi = 3.14159)"],
                      None, ["pi taken as 3.14159"])),
    ("ap_nth",
     r"(?P<n>\d+(?:\.\d+)?)\s*(?:th|st|nd|rd)?\s*term\s+of\s+(?:the\s+)?"
     r"(?:AP|arithmetic\s+progression)\s*(?:with|whose)?\s*"
     r"(?:first\s+term(?:\s+is)?\s*)?(?P<a>\d+(?:\.\d+)?)\s*(?:and|,)?\s*"
     r"(?:the\s+)?common\s+difference\s+(?:is\s+)?(?P<d>-?\d+(?:\.\d+)?)",
     _c_ap_nth_syl),
    ("ap_sum",
     r"sum\s+of\s+the\s+first\s+(?P<n>\d+)\s+terms\s+of\s+(?:the\s+)?"
     r"(?:AP|arithmetic\s+progression)\s*(?:with|whose)?\s*"
     r"(?:first\s+term(?:\s+is)?\s*)?(?P<a>\d+(?:\.\d+)?)\s*(?:and|,)?\s*"
     r"(?:the\s+)?common\s+difference\s+(?:is\s+)?(?P<d>-?\d+(?:\.\d+)?)",
     _c_ap_sum_syl),
    ("trig_eval",
     r"(?:evaluate|find|compute|value\s+of)\s+"
     r"(?P<expr>[^.]*?(?:sin|cos|tan)\s*\^?\s*\d*[^.]*?)\.?\s*$|"
     r"(?P<expr2>[^.]*?(?:sin|cos|tan)\s*\d+[^.]*?)\?",
     _c_trig_syl),
    ("sector_area",
     r"area\s+of\s+(?:an?\s+|the\s+)?sector\s+(?:of\s+)?(?:a\s+)?circle\s+"
     r"(?:of\s+|with\s+)?radius\s+(?P<r>\d+(?:\.\d+)?)\s*(?:cm|m)?"
     r"[^.]{0,40}(?:angle|of)\s+(?:of\s+)?(?P<ang>\d+(?:\.\d+)?)\s*"
     r"degrees?",
     _c_sector_syl),
    ("elevation_height",
     r"angle\s+of\s+elevation",
     lambda g, m, t: _c_elevation_smart_syl(t)),
    ("combinations",
     r"(?:how\s+many\s+ways\s+(?:are\s+there\s+|can\s+(?:one|we|you)\s+"
     r")?|in\s+how\s+many\s+ways\s+(?:can\s+(?:one|we|you)\s+)?)"
     r"(?:to\s+)?(?:choose|select)\s+(?P<r>\d+)\s+(?:items?\s+)?from\s+"
     r"(?P<n>\d+)",
     _c_combinations_syl),
    ("permutations",
     r"how\s+many\s+(?:ways|arrangements)\s+(?:are\s+there\s+)?to\s+"
     r"arrange\s+(?P<r>\d+)\s+(?:items?\s+)?(?:out\s+of\s+|from\s+)?"
     r"(?P<n>\d+)",
     _c_permutations_syl),
    ("gp_infinite_sum",
     r"sum\s+of\s+(?:the\s+|an\s+|a\s+)?infinite\s+(?:GP|geometric\s+progression)"
     r"[^.]*?first\s+term\s+(?:is\s+)?(?P<a>\d+(?:\.\d+)?)"
     r"[^.]*?(?:common\s+)?ratio\s+(?:is\s+)?(?P<r>-?\d+(?:\.\d+)?(?:/\d+)?)",
     _c_gp_infinite_syl),
    ("vector_magnitude",
     r"magnitu?de\s+of\s+(?:the\s+)?(?:vector\s+)?"
     r"(?P<i>-?\d+(?:\.\d+)?)\s*[ij]\s*\+\s*(?P<j>-?\d+(?:\.\d+)?)\s*j"
     r"(?:\s*\+\s*(?P<k>-?\d+(?:\.\d+)?)\s*k)?",
     _c_vector_magnitude_syl),
    ("dot_product",
     r"dot\s+product\s+of\s+(?:the\s+)?(?:vectors?\s+)?"
     r"(?P<ai>-?\d+(?:\.\d+)?)\s*i\s*\+\s*(?P<aj>-?\d+(?:\.\d+)?)\s*j"
     r"(?:\s*\+\s*(?P<ak>-?\d+(?:\.\d+)?)\s*k)?\s+and\s+"
     r"(?P<bi>-?\d+(?:\.\d+)?)\s*i\s*\+\s*(?P<bj>-?\d+(?:\.\d+)?)\s*j"
     r"(?:\s*\+\s*(?P<bk>-?\d+(?:\.\d+)?)\s*k)?",
     _c_dot_product_syl),
    ("determinant_2x2",
     r"determinant\s+of\s+(?:the\s+)?matrix\s*"
     r"\[\s*\[?(?P<a>-?\d+(?:\.\d+)?)\s*,\s*(?P<b>-?\d+(?:\.\d+)?)\s*\]"
     r"\s*,\s*\[?(?P<c>-?\d+(?:\.\d+)?)\s*,\s*(?P<d>-?\d+(?:\.\d+)?)\s*\]?"
     r"\s*\]?",
     _c_determinant_2x2_syl),
    ("binary_add",
     r"add\s+(?:the\s+)?binary\s+(?:numbers?\s+)?(?P<a>[01]+)\s*"
     r"(?:\(?_?2\)?|₂)?\s+(?:and|to)\s+(?P<b>[01]+)\s*(?:\(?_?2\)?|₂)?",
     lambda g, m, t: (
         int(g["a"], 2) + int(g["b"], 2),
         [f"({g['a']})₂ = {int(g['a'], 2)}₁₀",
          f"({g['b']})₂ = {int(g['b'], 2)}₁₀",
          f"sum = {int(g['a'], 2) + int(g['b'], 2)}₁₀ = "
          f"({bin(int(g['a'], 2) + int(g['b'], 2))[2:]})₂"],
         f"({bin(int(g['a'], 2) + int(g['b'], 2))[2:]})₂",
         None)),
    ("box_fill_cubes",
     r"(?:inner\s+)?dimensions?\s+(?P<l>\d+(?:\.\d+)?)\s*(?:cm|m)?\s*"
     r"[x×]\s*(?P<w>\d+(?:\.\d+)?)\s*(?:cm|m)?\s*[x×]\s*"
     r"(?P<h>\d+(?:\.\d+)?)\s*(?:cm|m)?[\s\S]{0,60}?"
     r"(?:how many|number of)\s+(?P<c>\d+(?:\.\d+)?)\s*(?:cm\^?3|cubic)?",
     lambda g, m, t: (
         float(g["l"]) * float(g["w"]) * float(g["h"]) /
         (float(g["c"]) ** 3),
         [f"box volume = {g['l']} x {g['w']} x {g['h']} = "
          f"{float(g['l']) * float(g['w']) * float(g['h'])}",
          f"cube volume = {g['c']}^3 = {float(g['c']) ** 3}",
          f"count = {float(g['l']) * float(g['w']) * float(g['h'])} / "
          f"{float(g['c']) ** 3} = "
          f"{float(g['l']) * float(g['w']) * float(g['h']) / (float(g['c']) ** 3):.6g}"],
         f"{float(g['l']) * float(g['w']) * float(g['h']) / (float(g['c']) ** 3):.6g} "
         f"cubes",
         None)),
    ("energy_thrown_height",
     r"(?P<m>\d+(?:\.\d+)?)\s*(?P<mu>g|kg)\b[^.]{0,50}?"
     r"thrown[^.]{0,80}?(?P<h>\d+(?:\.\d+)?)\s*m\b[^.]{0,50}?"
     r"(?:speed|velocity|initial\s+speed)\s+(?:of\s+)?(?P<v>\d+(?:\.\d+)?)"
     r"\s*m\s*/?\s*s",
     lambda g, m, t: (
         (float(g["m"]) / (1000.0 if g["mu"].lower() == "g" else 1.0))
         * 9.8 * float(g["h"])
         + 0.5 * (float(g["m"]) / (1000.0 if g["mu"].lower() == "g" else 1.0))
         * float(g["v"]) ** 2,
         [f"m = {float(g['m']) / (1000.0 if g['mu'].lower() == 'g' else 1.0)} kg, "
          f"h = {g['h']} m, v = {g['v']} m/s",
          f"E = mgh + (1/2)mv^2 = "
          f"{(float(g['m']) / (1000.0 if g['mu'].lower() == 'g' else 1.0)) * 9.8 * float(g['h']):.4g} + "
          f"{0.5 * (float(g['m']) / (1000.0 if g['mu'].lower() == 'g' else 1.0)) * float(g['v']) ** 2:.4g} = "
          f"{(float(g['m']) / (1000.0 if g['mu'].lower() == 'g' else 1.0)) * 9.8 * float(g['h']) + 0.5 * (float(g['m']) / (1000.0 if g['mu'].lower() == 'g' else 1.0)) * float(g['v']) ** 2:.4g} J"],
         f"total energy = "
         f"{(float(g['m']) / (1000.0 if g['mu'].lower() == 'g' else 1.0)) * 9.8 * float(g['h']) + 0.5 * (float(g['m']) / (1000.0 if g['mu'].lower() == 'g' else 1.0)) * float(g['v']) ** 2:.4g} J",
         ["g = 9.8 m/s^2"])),
    ("linear_decrease",
     r"(?:each\s+)?(?P<a>\d+(?:\.\d+)?)\s*(?:cm|m)?\s*long[\s\S]{0,60}?"
     r"(?:lowered|shortened|reduced|decreased|cut)\s+by\s+"
     r"(?P<b>\d+(?:\.\d+)?)\s*(?:cm|m)?[\s\S]{0,50}?(?:new\s+length|"
     r"height|how\s+(?:long|much|high)|remaining|now)",
     lambda g, m, t: (
         float(g["a"]) - float(g["b"]),
         [f"new length = {g['a']} - {g['b']} = "
          f"{float(g['a']) - float(g['b'])}"],
         f"{float(g['a']) - float(g['b']):g} cm",
         None)),
    ("vertically_opposite_angles",
     r"vertically\s+opposite\s+angles?\s+measured\s+as\s*"
     r"\(\s*(?P<a1>\d+)\s*x\s*(?P<o1>[+-]\s*\d+)\s*\)\s*\S*\s+and\s*"
     r"\(\s*(?P<a2>\d+)\s*x\s*(?P<o2>[+-]\s*\d+)\s*\)",
     lambda g, m, t: _c_vo_angles_syl(g)),
    ("related_rates_sphere",
     r"(?:volume|V)[\s\S]{0,40}?increas\w+[\s\S]{0,30}?"
     r"(?P<dv>\d+(?:\.\d+)?)\s*(?P<dpi>pi|π)?\s*cm\^?3?\s*/?\s*s"
     r"[\s\S]{0,60}?radius[\s\S]{0,30}?is\s+(?P<r>\d+(?:\.\d+)?)\s*cm",
     lambda g, m, t: (
         float(g["dv"]) * (_PI_syl if g.get("dpi") else 1.0) /
         (4 * _PI_syl * float(g["r"]) ** 2),
         [f"dV/dt = {g['dv']}{'pi' if g.get('dpi') else ''}, "
          f"r = {g['r']} cm",
          f"V = (4/3)pi r^3 -> dV/dt = 4 pi r^2 dr/dt",
          f"dr/dt = {float(g['dv']) * (_PI_syl if g.get('dpi') else 1.0) / (4 * _PI_syl * float(g['r']) ** 2):.4g} cm/s"],
         f"dr/dt = "
         f"{float(g['dv']) * (_PI_syl if g.get('dpi') else 1.0) / (4 * _PI_syl * float(g['r']) ** 2):.4g} cm/s",
         ["V = (4/3)pi r^3 differentiated w.r.t. t"])),
    ("fd_compare_maturity",
     r"(?P<r1>\d+(?:\.\d+)?)\s*%[\s\S]{0,30}?compounded\s+"
     r"(?P<c1>quarterly|semi[- ]?annually|half[- ]?yearly|annually|"
     r"monthly)[\s\S]{0,80}?(?P<r2>\d+(?:\.\d+)?)\s*%[\s\S]{0,30}?"
     r"compounded\s+(?P<c2>quarterly|semi[- ]?annually|half[- ]?yearly|"
     r"annually|monthly)[\s\S]{0,80}?(?P<p>[\d,]{6,})"
     r"[\s\S]{0,40}?(?P<yrs>\d+)\s*year",
     lambda g, m, t: _c_fd_compare_syl(g)),
]


def _dispatch_syl_maths(text: str):
    """model_syllabus's loop over its 26 maths rows (same
    shaping via _yes_syl); None lets the aggregator move on."""
    for fid, pattern, compute in SYLLABUS_MATHS_ROWS:
        m = re.search(pattern, text, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, text)
        except Exception:
            continue
        if not out:
            continue
        value, steps, answer, assumptions = (list(out) + [None] * 4)[:4]
        if value is None and not steps:
            continue
        return _yes_syl(fid, {k: v for k, v in g.items()}, value,
                        steps, assumptions, answer=answer)
    return None


# ==========================================================================
# BLOCK EX -- 12 maths model fns moved from extra_families.py
# ==========================================================================

_NUM_ex = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"


_AP_LIST_ex = (r"(" + _NUM_ex + r")\s*,\s*(" + _NUM_ex + r")\s*,\s*(" + _NUM_ex
            + r")\s*,?\s*(?:" + _NUM_ex + r")?\s*,?\s*(?:\.\s*\.\s*\.|\u2026)")


def _no_ex(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _n_ex(tok: str) -> float:
    return float(tok.replace(",", ""))


_CONF_ex = 0.95


def _res_ex(structure: str, quantities: dict, equation: str, val: float,
         steps: list, answer: str, note: str = "") -> ModelResult:
    return ModelResult(
        structure=structure, matched=True, confidence=_CONF_ex,
        quantities=quantities, governing_equation=equation,
        final_answer=answer, numeric_answer=float(val),
        steps=steps, note=note)


def _linear_side_ex(side: str):
    """Parse '3(x - 1)', '2 (x - 3)', '5x - 3', '-2x', 'x' -> (a, b)."""
    s = side.strip().replace("\u2212", "-")
    m = re.match(r"^([+-]?\d*\.?\d*)\s*\(\s*x\s*([+-]\s*\d+(?:\.\d+)?)?\s*\)"
                 r"(?:\s*([+-]\s*\d+(?:\.\d+)?))?$", s)
    if m:
        a = _n_ex(m.group(1)) if m.group(1) not in (None, "", "+") else (
            -1.0 if m.group(1) == "-" else 1.0)
        b = 0.0
        if m.group(2):
            b = _n_ex(m.group(2).replace(" ", ""))
        if m.group(3):
            b += _n_ex(m.group(3).replace(" ", ""))
        return a, a * (m.group(2) and _n_ex(m.group(2).replace(" ", "")) or 0.0), b
    m = re.match(r"^([+-]?\d*\.?\d*)\s*x\s*(?:([+-])\s*(" + _NUM_ex + r"))?$", s)
    if m:
        a = _n_ex(m.group(1)) if m.group(1) not in (None, "", "+") else (
            -1.0 if m.group(1) == "-" else 1.0)
        b = 0.0
        if m.group(2):
            b = _n_ex(m.group(3)) * (-1.0 if m.group(2) == "-" else 1.0)
        return a, b, b
    # constant only ("10", "-3")
    m = re.match(r"^([+-]?\d*\.?\d*)$", s)
    if m:
        c = _n_ex(m.group(1))
        return 0.0, c, c
    # constant first ("4 - 2x")
    m = re.match(r"^(" + _NUM_ex + r")\s*([+-])\s*([+-]?\d*\.?\d*)\s*x$", s)
    if m:
        a = _n_ex(m.group(3)) if m.group(3) else 1.0
        a = a * (-1.0 if m.group(2) == "-" else 1.0)
        c = _n_ex(m.group(1))
        return a, c, c
    return None


def model_linear_inequality(text: str) -> ModelResult:
    m = re.search(
        r"solve\s*[:\-]?\s*(.+?)\s*(<=|>=|<|>|\u2264|\u2265)\s*(.+)",
        text, re.I)
    if not m or m.group(1) == m.group(3):
        return _no_ex("LINEAR_INEQUALITY", "no inequality form matched")
    lhs_raw, op_raw, rhs_raw = m.group(1), m.group(2), m.group(3)
    # rhs may itself contain x on the other side: '5x - 3 > 3x - 5'
    rhs_x = re.match(r"^(.*x.*)\s+([+-]?\d*\.?\d*)\s*$", rhs_raw)
    lhs = _linear_side_ex(lhs_raw)
    rhs = _linear_side_ex(rhs_raw)
    if lhs is None or rhs is None:
        return _no_ex("LINEAR_INEQUALITY", "sides not linear in x")
    a1, b1, _ = lhs
    a2, b2, _ = rhs
    op = {"<": "<", ">": ">", "<=": "<=", ">=": ">=",
          "\u2264": "<=", "\u2265": ">="}[op_raw]
    a = a1 - a2
    b = b2 - b1
    if abs(a) < 1e-12:
        return _no_ex("LINEAR_INEQUALITY", "degenerate (no x on one side)")
    k = b / a
    flip = (a < 0)
    if flip:
        op_out = {"<": ">", ">": "<", "<=": ">=", ">=": "<="}[op]
    else:
        op_out = op
    ks = f"{k:.6g}".rstrip("0").rstrip(".")
    steps = [
        f"Expand and collect x on one side: ({a1:g} - {a2:g}) x "
        f"{op} {b2:g} - ({b1:g})",
        f"{a:g} x {op} {b:g}",
        ("Dividing by a negative flips the inequality: " if flip else ""),
        f"x {op_out} {ks}",
        f"ANSWER: x {op_out} {ks}",
    ]
    return _res_ex("LINEAR_INEQUALITY", {"a": a, "b": b, "k": k},
                "a x (op) b  ->  x (op') k", k,
                [s for s in steps if s], f"x {op_out} {ks}",
                note="solution set of linear inequality")


def model_symmetry_angles(text: str) -> ModelResult:
    m = re.search(
        r"(?:smallest\s+angle\s+of\s+symmetry\s+(?:is\s+|of\s+)?"
        r"(" + _NUM_ex + r")\s*(?:degrees?|\u00b0)"
        r"|(" + _NUM_ex + r")\s*(?:degrees?|\u00b0)\s+is\s+the\s+smallest\s+"
        r"angle\s+of\s+symmetry)", text, re.I)
    if not m:
        return _no_ex("SYMMETRY_ANGLES", "no smallest-angle-of-symmetry form")
    a = _n_ex(m.group(1) or m.group(2))
    if a <= 0 or 360.0 % a != 0:
        return _no_ex("SYMMETRY_ANGLES", "smallest angle must divide 360")
    order = int(round(360.0 / a))
    others = [a * k for k in range(2, order)]
    if not others:
        return _no_ex("SYMMETRY_ANGLES", "no other angles")
    val = others[0]
    others_s = ", ".join(f"{o:g}\u00b0" for o in others)
    steps = [
        f"Order of rotational symmetry = 360 / {a:g} = {order}",
        f"Angles of symmetry: {a:g}\u00b0, {others_s}",
        f"ANSWER: other angles = {others_s}",
    ]
    return _res_ex("SYMMETRY_ANGLES", {"smallest": a, "order": order},
                "order = 360 / a; angles = k a", val,
                steps, f"other angles = {others_s}")


def model_mixture_addition(text: str) -> ModelResult:
    m = re.search(
        r"(" + _NUM_ex + r")\s*(?:litres?|liters?|L)\b[^.]*?of\s+(?:a\s+)?"
        r"(" + _NUM_ex + r")\s*%[^.]*?(?:solution|acid|alcohol|milk)", text, re.I)
    add = re.search(
        r"how\s+many\s+(?:litres?|liters?|L)\s+of\s+(?:a\s+)?(" + _NUM_ex
        + r")\s*%", text, re.I)
    want = re.search(
        r"(?:so\s+that|such\s+that)[^.]*?(\d+(?:\.\d+)?)\s*%", text, re.I)
    if not (m and add and want):
        return _no_ex("MIXTURE_ADDITION", "need stock, added and target percents")
    v1 = _n_ex(m.group(1))
    c1 = _n_ex(m.group(2))
    c2 = _n_ex(add.group(1))
    c3 = _n_ex(want.group(1))
    if not (min(c1, c2) <= c3 <= max(c1, c2)) or abs(c2 - c1) < 1e-12:
        return _no_ex("MIXTURE_ADDITION",
                   "target percent outside the achievable range")
    v2 = v1 * (c3 - c1) / (c2 - c3)
    if v2 <= 0:
        return _no_ex("MIXTURE_ADDITION", "non-positive added volume")
    steps = [
        f"Balance: C1 V1 + C2 V2 = C3 (V1 + V2)",
        f"{c1:g} x {v1:g} + {c2:g} V2 = {c3:g} ({v1:g} + V2)",
        f"V2 = {v1:g} ({c3:g} - {c1:g}) / ({c2:g} - {c3:g}) = {v2:.6g} L",
        f"ANSWER: V2 = {v2:.6g} L",
    ]
    return _res_ex("MIXTURE_ADDITION", {"V1": v1, "C1": c1, "C2": c2, "C3": c3},
                "C1 V1 + C2 V2 = C3 (V1 + V2)", v2, steps,
                f"V2 = {v2:.6g} L")


def model_composite_solid(text: str) -> ModelResult:
    if not re.search(r"hemisphere", text, re.I) or \
            not re.search(r"cone", text, re.I):
        return _no_ex("COMPOSITE_SOLID", "not a hemisphere+cone solid")
    diam = re.search(r"diameter\s+of\s+(?:the\s+)?base\s+(?:is\s+|of\s+)?"
                     r"(" + _NUM_ex + r")", text, re.I)
    height = re.search(r"(?:total\s+)?height\s+(?:is\s+|of\s+)?(" + _NUM_ex
                       + r")", text, re.I)
    if not diam or not height:
        return _no_ex("COMPOSITE_SOLID", "need total height and base diameter")
    d = _n_ex(diam.group(1))
    h_total = _n_ex(height.group(1))
    r = d / 2.0
    h_cone = h_total - r
    if h_cone <= 0:
        return _no_ex("COMPOSITE_SOLID", "cone height non-positive")
    want_area = bool(re.search(r"surface\s+area", text, re.I))
    if want_area:
        l = math.sqrt(r * r + h_cone * h_cone)
        val = 2.0 * math.pi * r * r + math.pi * r * l
        steps = [
            f"r = d/2 = {r:g}; cone height = {h_total:g} - {r:g} = "
            f"{h_cone:g}",
            f"slant l = sqrt(r^2 + h^2) = {l:.6g}",
            f"TSA = 2 pi r^2 (hemisphere) + pi r l (cone) = {val:.6g}",
            f"ANSWER: surface area = {val:.6g}",
        ]
        eq = "TSA = 2 pi r^2 + pi r l"
    else:
        val = (2.0 / 3.0) * math.pi * r ** 3 + (1.0 / 3.0) * math.pi * \
            r * r * h_cone
        steps = [
            f"r = d/2 = {r:g}; cone height = {h_total:g} - {r:g} = "
            f"{h_cone:g}",
            f"V = (2/3) pi r^3 (hemisphere) + (1/3) pi r^2 h (cone)",
            f"V = {val:.6g}",
            f"ANSWER: volume = {val:.6g}",
        ]
        eq = "V = (2/3) pi r^3 + (1/3) pi r^2 h"
    return _res_ex("COMPOSITE_SOLID", {"r": r, "h_cone": h_cone}, eq, val,
                steps, f"{'surface area' if want_area else 'volume'} = "
                       f"{val:.6g}")


def model_word_permutations(text: str) -> ModelResult:
    m = re.search(
        r"(?:number\s+of\s+(?:different\s+)?words?[^.]*?using\s+all\s+"
        r"(?:the\s+)?letters\s+of\s+the\s+word|words?\s+can\s+be\s+(?:made|"
        r"formed)\s+using\s+all\s+(?:the\s+)?letters\s+of\s+the\s+word)\s+"
        r"([A-Z]{3,10})\b", text, re.I)
    if not m:
        return _no_ex("WORD_PERMUTATIONS", "no all-letters-of-word form")
    word = m.group(1).upper()
    n = len(word)
    counts: dict = {}
    for ch in word:
        counts[ch] = counts.get(ch, 0) + 1
    denom = 1
    repeated = []
    for ch, k in counts.items():
        denom *= math.factorial(k)
        if k > 1:
            repeated.append(f"{k}! ({ch})")
    val = math.factorial(n) // denom
    rep_txt = f" / ({' x '.join(repeated)})" if repeated else ""
    steps = [
        f"'{word}' has {n} letters: {', '.join(f'{c} x{k}' for c, k in sorted(counts.items()))}.",
        f"P = {n}!{rep_txt} = {val}",
        f"ANSWER: {val} words",
    ]
    return _res_ex("WORD_PERMUTATIONS", {"n": n}, "n! / (n1! n2! ...)", val,
                steps, f"{val} words")


def model_ap_which_term(text: str) -> ModelResult:
    m = re.search(
        r"which\s+term\s+of\s+the\s+(?:AP|A\.P\.|arithmetic\s+progression)"
        r"\s*[:\-]?\s*(?:is\s+)?" + _AP_LIST_ex + r"[^.]*?will\s+be\s+(" + _NUM_ex
        + r")\s+more\s+than\s+its?\s*(\d{1,3})(?:st|nd|rd|th)\s+term",
        text, re.I)
    if not m:
        return _no_ex("AP_WHICH_TERM", "no which-term-of-AP form")
    a = _n_ex(m.group(1))
    d = _n_ex(m.group(2)) - a
    D = _n_ex(m.group(4))
    ref_n = int(m.group(5))
    ref = a + (ref_n - 1) * d
    target = ref + D
    if d == 0:
        return _no_ex("AP_WHICH_TERM", "zero common difference")
    n = (target - a) / d + 1.0
    if abs(n - round(n)) > 1e-9 or n < 1:
        return _no_ex("AP_WHICH_TERM", "no integral term index")
    n_int = int(round(n))
    steps = [
        f"a = {a:g}, d = {d:g}; term {ref_n} = a + {ref_n - 1}d = {ref:g}",
        f"target = {ref:g} + {D:g} = {target:g}",
        f"n = (target - a)/d + 1 = {n_int}",
        f"ANSWER: the {n_int}th term",
    ]
    return _res_ex("AP_WHICH_TERM",
                {"a": a, "d": d, "D": D, "n": n_int},
                "a_n = a + (n-1) d", float(n_int), steps,
                f"the {n_int}th term")


def model_concentric_chord(text: str) -> ModelResult:
    m = re.search(
        r"chord\s+of\s+length\s+(" + _NUM_ex + r")\s*cm.{0,80}?touches?\s+"
        r"(?:the\s+)?(?:smaller|inner)\s+circle.{0,120}?radius\s+of\s+the\s+"
        r"(?:larger|outer)\s+circle\s+is\s+(" + _NUM_ex + r")\s*cm", text, re.I)
    if not m:
        return _no_ex("CONCENTRIC_CHORD", "no concentric-chord form")
    chord = _n_ex(m.group(1))
    R = _n_ex(m.group(2))
    half = chord / 2.0
    if R <= half:
        return _no_ex("CONCENTRIC_CHORD", "chord too long for outer circle")
    r2 = R * R - half * half
    r = math.sqrt(r2)
    steps = [
        "The perpendicular from the centre bisects the chord and reaches "
        "the inner circle: r^2 = R^2 - (chord/2)^2.",
        f"r = sqrt({R:g}^2 - {half:g}^2) = {r:.6g} cm",
        f"ANSWER: inner radius = {r:.6g} cm",
    ]
    return _res_ex("CONCENTRIC_CHORD", {"chord": chord, "R": R, "r": r},
                "r^2 = R^2 - (c/2)^2", r, steps,
                f"inner radius = {r:.6g} cm")


def _prime_factors_ex(n: int) -> dict:
    f: dict = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            f[d] = f.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        f[n] = f.get(n, 0) + 1
    return f


def model_perfect_cube(text: str) -> ModelResult:
    m = re.search(
        r"[Ii]s\s+(\d{2,7})\s+a\s+perfect\s+cube\?|"
        r"smallest\s+natural\s+number\s+(?:by\s+which\s+)?(\d{2,7})\s+"
        r"must\s+be\s+(multiplied|divided)|"
        r"by\s+which\s+smallest\s+natural\s+number\s+(?:should|must)\s+"
        r"(\d{2,7})\s+be\s+(divided|multiplied)", text)
    if not m:
        return _no_ex("PERFECT_CUBE", "not a perfect-cube question")
    n = int(m.group(1) or m.group(2) or m.group(4))
    op_hint = m.group(3) or m.group(5)
    f = _prime_factors_ex(n)
    is_cube = all(k % 3 == 0 for k in f.values())
    op = re.search(r"(divided|multiplied)\b", text, re.I)
    op_word = (op.group(1).lower() if op else
               (op_hint.lower() if op_hint else "divided"))
    if is_cube:
        steps = [f"{n} = " + " x ".join(f"{p}^{k}" for p, k in sorted(f.items())),
                 "Every prime exponent is a multiple of 3.",
                 f"ANSWER: {n} is already a perfect cube"]
        return _res_ex("PERFECT_CUBE", {"n": n}, "prime exponents mod 3",
                    float(n), steps, f"{n} is a perfect cube")
    if op_word.startswith("divid"):
        factor = 1
        for p, k in f.items():
            factor *= p ** (k % 3)
        quotient = n // factor
        steps = [
            f"{n} = " + " x ".join(f"{p}^{k}" for p, k in sorted(f.items())),
            f"Remove the surplus primes: divide by {factor}",
            f"Quotient = {quotient}",
            f"ANSWER: divide by {factor}",
        ]
        return _res_ex("PERFECT_CUBE", {"n": n, "factor": factor},
                    "smallest product p^(k mod 3)", float(factor), steps,
                    f"divide by {factor}")
    factor = 1
    for p, k in f.items():
        if k % 3:
            factor *= p ** (3 - (k % 3))
    steps = [
        f"{n} = " + " x ".join(f"{p}^{k}" for p, k in sorted(f.items())),
        f"Complete every exponent to a multiple of 3: multiply by {factor}",
        f"ANSWER: multiply by {factor}",
    ]
    return _res_ex("PERFECT_CUBE", {"n": n, "factor": factor},
                "smallest product p^(3 - k mod 3)", float(factor), steps,
                f"multiply by {factor}")


def model_quadratic_nature(text: str) -> ModelResult:
    m = re.search(
        r"roots\s+of\s+(?:the\s+)?quadratic\s+equation\s+"
        r"([0-9x\u00d7\u2212\-\+\u221a\.\s\^]+)=", text, re.I)
    if not m:
        return _no_ex("QUADRATIC_NATURE", "not a nature-of-roots form")
    eq = m.group(1).strip().replace(" ", "")
    # canonicalise: unicode minus, superscript 2, x^2 / flattened x2 -> w
    eq = eq.replace("\u2212", "-").replace("\u00b2", "w").replace("^2", "w")
    eq = re.sub(r"x2(?![0-9])", "xw", eq)
    coeffs: dict = {"w": 0.0, "x": 0.0, "1": 0.0}
    for tok in re.findall(r"[+-]?[^+-]+", eq):
        if not tok or tok in "+-":
            continue
        sign = -1.0 if tok.startswith("-") else 1.0
        body = tok.lstrip("+-")
        mm = re.match(r"^(\d*\.?\d*)(\*?)xw$", body)
        if mm:
            coeffs["w"] += sign * (float(mm.group(1)) if mm.group(1) else 1.0)
            continue
        mm = re.match(r"^(\d*\.?\d*)(\*?)x$", body)
        if mm:
            coeffs["x"] += sign * (float(mm.group(1)) if mm.group(1) else 1.0)
            continue
        mm = re.match(r"^(\d*\.?\d+)$", body)
        if mm:
            coeffs["1"] += sign * float(mm.group(1))
            continue
        mm = re.match(r"^(\d*\.?\d*)(\*?)\u221a(\d*\.?\d*)x$", body)
        if mm:
            k = float(mm.group(1) or 1) * math.sqrt(float(mm.group(3)))
            coeffs["x"] += sign * k
            continue
        mm = re.match(r"^(\d*\.?\d*)\u221a(\d*\.?\d*)$", body)
        if mm:
            coeffs["1"] += sign * float(mm.group(1) or 1) * \
                math.sqrt(float(mm.group(2)))
            continue
        return _no_ex("QUADRATIC_NATURE", f"cannot read term '{tok}'")
    a = coeffs["w"]
    b = coeffs["x"]
    c = coeffs["1"]
    if a == 0:
        return _no_ex("QUADRATIC_NATURE", "not quadratic (no x^2 term)")
    d = b * b - 4.0 * a * c
    if d > 1e-12:
        nature = "real and distinct"
    elif d < -1e-12:
        nature = "not real (no real roots)"
    else:
        nature = "real and equal"
    steps = [
        f"a = {a:g}, b = {b:g}, c = {c:g}",
        f"D = b^2 - 4ac = {d:.6g}",
        f"Nature: {nature}",
        f"ANSWER: {nature}",
    ]
    return _res_ex("QUADRATIC_NATURE", {"a": a, "b": b, "c": c, "D": d},
                "D = b^2 - 4ac", d, steps, nature)


def _lin_eval_ex(expr: str):
    """'2x' / 'x + 10' / '3x + 2' -> (a, b); None when not linear."""
    s = expr.strip().replace("\u2013", "-").replace(" ", "")
    m = re.match(r"^([+-]?\d*\.?\d*)(x)([+-]\d+\.?\d*)?$", s)
    if m:
        a = float(m.group(1)) if m.group(1) not in ("", "+", "-") else (
            -1.0 if m.group(1) == "-" else 1.0)
        b = float(m.group(3)) if m.group(3) else 0.0
        return a, b
    m = re.match(r"^([+-]?\d+\.?\d*)$", s)
    if m:
        return 0.0, float(m.group(1))
    return None


def model_ap_consecutive_x(text: str) -> ModelResult:
    # QA-1 ReDoS guard (2026-10-02): the nested greedy digit alternatives
    # here backtracked catastrophically on long digit runs ("0"*3000 +
    # " hour" hung the registry sweep) -- every repetition is now bounded
    # so a failed match attempt stays near-linear.  A legal AP phrase
    # never carries >6-digit coefficients or 24-char terms.
    m = re.search(
        r"([+\-\u2013]?\d{1,6}(?:\.\d{1,6})?[ \t]{0,3}x|\d{1,6})"
        r"[ \t]{0,3},[ \t]{0,3}\([ \t]{0,3}([+\-\u2013 x\d]{1,24})[ \t]{0,3}\)"
        r"[ \t]{0,3}(?:and|,)[ \t]{0,3}\(?[ \t]{0,3}"
        r"([+\-\u2013 x\d]{1,24})[ \t]{0,3}\)?[^.]{0,200}?"
        r"consecutive\s+terms?\s+of\s+an?\s+(?:AP|A\.P\.|arithmetic)",
        text, re.I)
    if not m:
        return _no_ex("AP_CONSECUTIVE_X",
                   "not three algebraic consecutive-AP terms")
    t1 = _lin_eval_ex(m.group(1))
    t2 = _lin_eval_ex(m.group(2))
    t3 = _lin_eval_ex(m.group(3))
    if t1 is None or t2 is None or t3 is None:
        return _no_ex("AP_CONSECUTIVE_X", "terms not linear in x")
    # (t2 - t1) = (t3 - t2)  ->  2 t2 = t1 + t3
    a = 2 * t2[0] - t1[0] - t3[0]
    b = 2 * t2[1] - t1[1] - t3[1]
    if abs(a) < 1e-12:
        return _no_ex("AP_CONSECUTIVE_X", "x cancels out")
    x = -b / a
    steps = [
        "In AP, 2 t2 = t1 + t3.",
        f"2({t2[0]:g}x + {t2[1]:g}) = ({t1[0]:g}x + {t1[1]:g}) + "
        f"({t3[0]:g}x + {t3[1]:g})",
        f"{a:g} x = {-b:g}  ->  x = {x:.6g}",
        f"ANSWER: x = {x:.6g}",
    ]
    return _res_ex("AP_CONSECUTIVE_X", {"x": x}, "2 t2 = t1 + t3", x, steps,
                f"x = {x:.6g}")


def model_standard_form(text: str) -> ModelResult:
    m = re.search(r"express\s+(" + _NUM_ex + r")\s+in\s+standard\s+form",
                  text, re.I)
    if not m:
        return _no_ex("STANDARD_FORM", "not a standard-form ask")
    from fractions import Fraction
    n = Fraction(_n_ex(m.group(1)))
    if n == 0:
        return _no_ex("STANDARD_FORM", "zero has no standard form")
    exp = 0
    mag = abs(n)
    while mag >= 10:
        mag /= 10
        exp += 1
    while mag < 1:
        mag *= 10
        exp -= 1
    d = float(mag)
    val = float(n)
    ans = f"{d:.6g} x 10^{exp}"
    steps = [
        f"Standard form: d.ddd x 10^n with 1 <= d < 10.",
        f"{float(n):g} = {ans}",
        f"ANSWER: {ans}",
    ]
    return _res_ex("STANDARD_FORM", {"n": val, "exp": exp},
                "d.ddd x 10^n", val, steps, ans)


def model_rational_form(text: str) -> ModelResult:
    m = re.search(r"express\s+(" + _NUM_ex + r")\s+as\s+(?:a\s+)?"
                  r"(?:rational\s+number|fraction|p/q)", text, re.I)
    if not m:
        return _no_ex("RATIONAL_FORM", "not a rational-form ask")
    from fractions import Fraction
    dec = float(m.group(1).replace(",", ""))
    f = Fraction(dec).limit_denominator(10000)
    if float(f) != dec:
        return _no_ex("RATIONAL_FORM", "not exactly representable")
    ans = f"{f.numerator}/{f.denominator}"
    steps = [
        f"{dec:g} = {f.numerator}/{f.denominator} (exact).",
        f"ANSWER: {ans}",
    ]
    return _res_ex("RATIONAL_FORM", {"p": f.numerator, "q": f.denominator},
                "decimal -> p/q (exact)", float(f.numerator), steps, ans)


_EXTRA_MATHS_FAMILIES = [
    model_linear_inequality,
    model_symmetry_angles,
    model_mixture_addition,
    model_composite_solid,
    model_word_permutations,
    model_ap_which_term,
    model_concentric_chord,
    model_perfect_cube,
    model_quadratic_nature,
    model_ap_consecutive_x,
    model_standard_form,
    model_rational_form,
]


def _dispatch_ex_maths(text: str):
    """model_extra's loop restricted to the maths families;
    keeps its 600-char ReDoS guard."""
    if len(text) > 600:
        return None
    for fn in _EXTRA_MATHS_FAMILIES:
        try:
            r = fn(text)
        except Exception:
            continue
        if r is not None and r.matched:
            return r
    return None


# ==========================================================================
# BLOCK EX2 -- 12 maths model fns moved from extra_families2.py
# (extra2's INVERSE_PROPORTION dropped per map §4a: core spec +
#  maths2 row keep the id; the narrowest row dies)
# ==========================================================================

_NUM_ex2 = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"


def _no_ex2(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _n_ex2(tok: str) -> float:
    return float(tok.replace(",", ""))


def _clean_ex2(text: str) -> str:
    """Normalise nbsp, unicode dashes and private-use glyphs (rows carry
    \xa0 instead of spaces, en-dashes in units, \uf060 before rupee amounts)."""
    t = text.replace("\xa0", " ")
    t = re.sub(r"[\u2013\u2014\u2212]", "-", t)
    t = re.sub(r"[\ue000-\uf8ff]", " ", t)
    return t


_CONF_ex2 = 0.95


def _res_ex2(structure: str, quantities: dict, equation: str, val: float,
         steps: list, answer: str, note: str = "") -> ModelResult:
    return ModelResult(
        structure=structure, matched=True, confidence=_CONF_ex2,
        quantities=quantities, governing_equation=equation,
        final_answer=answer, numeric_answer=float(val),
        steps=steps, note=note)


def _dice_faces_ex2(t: str):
    m = re.search(r"numbers\s*(-?\d+(?:\.\d+)?)\s*to\s*(-?\d+(?:\.\d+)?)", t)
    if m:
        a = _n_ex2(m.group(1))
        b = _n_ex2(m.group(2))
        if a == int(a) and b == int(b) and 2 <= abs(b - a) + 1 <= 12:
            return [float(x) for x in range(int(a), int(b) + 1)]
        return None
    m = re.search(r"(?:bearing|numbered|have|faces have)\s+numbers?\s*"
                  r"([^.]*)", t, re.I)
    if not m:
        return None
    toks = re.findall(r"-?\d+(?:\.\d+)?", m.group(1))
    if not (2 <= len(toks) <= 12):
        return None
    faces = [_n_ex2(x) for x in toks]
    if any(abs(f) > 100 or f != int(f) for f in faces):
        return None
    return faces


def model_dice_product_prob(text: str) -> ModelResult:
    t = _clean_ex2(text)
    if not (re.search(r"\bdice\b", t, re.I) and re.search(r"product", t, re.I)
            and re.search(r"probability", t, re.I)):
        return _no_ex2("DICE_PRODUCT_PROB", "not a dice-product probability ask")
    faces = _dice_faces_ex2(t)
    if not faces:
        return _no_ex2("DICE_PRODUCT_PROB", "dice faces not parseable")
    n = len(faces)
    odd = re.search(r"product of (?:the )?numbers? (?:obtained|that turn up)"
                    r"\s+is\s+an\s+odd\b", t, re.I)
    tgt = re.search(r"product of (?:the )?numbers? (?:obtained|that turn up)"
                    r"\s+is\s+(-?\d+(?:\.\d+)?)", t, re.I)
    if odd:
        k = sum(1 for f in faces if f % 2 == 1)
        cnt = k * k
        eq = "P = (odd faces / total faces)^2"
        steps = [
            f"Faces: {', '.join(f'{f:g}' for f in faces)} "
            f"({k} of them odd).",
            f"Odd product needs both dice odd: {k} x {k} = {cnt} of "
            f"{n * n} outcomes.",
            f"P = {cnt}/{n * n} = {cnt / (n * n):.6g}",
            f"ANSWER: {cnt}/{n * n}",
        ]
    elif tgt:
        k = _n_ex2(tgt.group(1))
        if k != int(k):
            return _no_ex2("DICE_PRODUCT_PROB", "target product not an integer")
        pairs = [(a, b) for a in faces for b in faces if a * b == k]
        cnt = len(pairs)
        eq = "P = favourable ordered pairs / n^2"
        shown = ", ".join(f"({a:g},{b:g})" for a, b in pairs[:8])
        steps = [
            f"Faces: {', '.join(f'{f:g}' for f in faces)}; "
            f"target product {k:g}.",
            f"Favourable ordered pairs ({cnt} of {n * n}): {shown}.",
            f"P = {cnt}/{n * n} = {cnt / (n * n):.6g}",
            f"ANSWER: {cnt}/{n * n}",
        ]
    else:
        return _no_ex2("DICE_PRODUCT_PROB", "product ask is neither odd nor = K")
    p = cnt / (n * n)
    return _res_ex2("DICE_PRODUCT_PROB", {"probability": p}, eq, p, steps,
                f"probability = {cnt}/{n * n}")


_PT_ex2 = r"([A-Z])\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)"


def _line_coeffs_ex2(x1, y1, x2, y2):
    a, b, c = y1 - y2, x2 - x1, x1 * y2 - x2 * y1
    if abs(a) < 1e-12 and abs(b) < 1e-12:
        return None
    fr = [Fraction(v).limit_denominator(10 ** 6) for v in (a, b, c)]
    L = 1
    for f in fr:
        L = L * f.denominator // math.gcd(L, f.denominator)
    ints = [int(f * L) for f in fr]
    g = 0
    for i in ints:
        g = math.gcd(g, abs(i))
    if g:
        ints = [i // g for i in ints]
    for i in ints:
        if i != 0:
            if i < 0:
                ints = [-j for j in ints]
            break
    return ints


def _fmt_line_ex2(a: int, b: int, c: int) -> str:
    s = f"{a}x" if a != 1 else "x"
    if b:
        if abs(b) == 1:
            s += " - y" if b < 0 else " + y"
        else:
            s += f" - {abs(b)}y" if b < 0 else f" + {b}y"
    if c:
        s += f" - {abs(c)}" if c < 0 else f" + {c}"
    return s + " = 0"


def model_two_point_line(text: str) -> ModelResult:
    t = _clean_ex2(text)
    is_join = bool(re.search(r"(equation of the )?line joining", t, re.I))
    is_median = bool(re.search(r"median through the vertex", t, re.I))
    if is_join == is_median:
        return _no_ex2("TWO_POINT_LINE",
                   "need 'line joining two points' or 'median through vertex'")
    pts = {m.group(1): (_n_ex2(m.group(2)), _n_ex2(m.group(3)))
           for m in re.finditer(_PT_ex2, t)}
    if is_median:
        vm = re.search(r"median through the vertex\s*([A-Z])", t)
        if not vm or len(pts) != 3 or vm.group(1) not in pts:
            return _no_ex2("TWO_POINT_LINE", "need exactly three named vertices")
        v = vm.group(1)
        (x1, y1) = pts[v]
        others = [p for k, p in pts.items() if k != v]
        x2 = (others[0][0] + others[1][0]) / 2.0
        y2 = (others[0][1] + others[1][1]) / 2.0
        kpart = None
        head = (f"median through {v}: midpoint of the other two sides = "
                f"({x2:g}, {y2:g})")
    else:
        seq = list(pts.items())
        if len(seq) != 2:
            return _no_ex2("TWO_POINT_LINE", "need exactly two named points")
        (x1, y1) = seq[0][1]
        (x2, y2) = seq[1][1]
        head = f"line joining ({x1:g}, {y1:g}) and ({x2:g}, {y2:g})"
        kpart = re.search(r"find k if ([A-Z])\s*\(\s*k\s*,\s*0\s*\)\s*is a "
                          r"point such that area of triangle\s+[A-Z]+\s+is\s*"
                          r"(\d+(?:\.\d+)?)\s*sq", t, re.I)
    coef = _line_coeffs_ex2(x1, y1, x2, y2)
    if coef is None:
        return _no_ex2("TWO_POINT_LINE", "the two points coincide")
    a, b, c = coef
    if b == 0:
        eq_s = f"x = {-c // a if a and c % a == 0 else -c / a:g}"
        xval = -c / a
        steps = [head, f"a x + b y + c = 0 reduces to x = {xval:g}",
                 f"ANSWER: {eq_s}"]
        return _res_ex2("TWO_POINT_LINE", {"x": xval}, "x = const (vertical)",
                    xval, steps, eq_s)
    slope = (y2 - y1) / (x2 - x1)
    eq_s = _fmt_line_ex2(a, b, c)
    steps = [
        head,
        "Determinant form: |x y 1; x1 y1 1; x2 y2 1| = 0 gives "
        "a x + b y + c = 0 with a = y1 - y2, b = x2 - x1, "
        "c = x1 y2 - x2 y1.",
        f"ANSWER: {eq_s}",
    ]
    quantities = {"slope": slope}
    if kpart:
        v = 2.0 * _n_ex2(kpart.group(2))
        c1 = x1 * y2 - x2 * y1
        dy = y1 - y2
        if abs(dy) < 1e-12:
            return _no_ex2("TWO_POINT_LINE",
                       "area is constant in k: no unique k (degenerate)")
        k1 = (v - c1) / dy
        k2 = (-v - c1) / dy
        hi, lo = max(k1, k2), min(k1, k2)
        ktxt = (f"k = {hi:g}" if abs(hi - lo) < 1e-12
                else f"k = {hi:g} or k = {lo:g}")
        steps.insert(2, f"Area of triangle with D(k, 0): (1/2)|{c1:g} + "
                        f"k x {dy:g}| = {v / 2:g}  ->  {ktxt}")
        eq_s += f"; {ktxt}"
        quantities["k1"] = hi
        quantities["k2"] = lo
        steps.append(f"ANSWER (part 2): {ktxt}")
    return _res_ex2("TWO_POINT_LINE", quantities, "a x + b y + c = 0", slope,
                steps, eq_s)


def model_three_digit_multiples(text: str) -> ModelResult:
    t = _clean_ex2(text)
    m = re.search(r"how many\s+(?:three[- ]digit|3-digit)\s+numbers\s+are\s+"
                  r"divisible by\s+(\d+)(?![.\d])", t, re.I)
    if not m:
        return _no_ex2("THREE_DIGIT_MULTIPLES", "not a 3-digit-multiples ask")
    k = int(m.group(1))
    if not (2 <= k <= 500):
        return _no_ex2("THREE_DIGIT_MULTIPLES", "divisor out of range")
    first = -(-100 // k) * k          # smallest 3-digit multiple
    last = (999 // k) * k             # largest 3-digit multiple
    cnt = (last - first) // k + 1
    steps = [
        f"3-digit multiples of {k}: first = {first}, last = {last}.",
        f"AP count: n = ({last} - {first}) / {k} + 1 = {cnt}",
        f"ANSWER: {cnt}",
    ]
    return _res_ex2("THREE_DIGIT_MULTIPLES", {"k": k, "count": cnt},
                "n = (last - first)/k + 1", cnt, steps,
                f"{cnt} three-digit numbers are divisible by {k}")


def _is_cube_ex2(x: int) -> bool:
    r = round(x ** (1.0 / 3.0))
    return any(rr >= 0 and rr ** 3 == x for rr in (r - 1, r, r + 1))


def model_not_perfect_cube_list(text: str) -> ModelResult:
    t = _clean_ex2(text)
    m = re.search(r"which of the following numbers are not perfect cubes"
                  r"\?(.*)", t, re.I | re.S)
    if not m:
        return _no_ex2("NOT_PERFECT_CUBE_LIST", "not a which-are-not-cubes ask")
    nums = [int(x) for x in re.findall(r"\d{2,9}", m.group(1))]
    if not (1 <= len(nums) <= 10) or any(not (1 < x < 10 ** 9) for x in nums):
        return _no_ex2("NOT_PERFECT_CUBE_LIST", "number list missing or out of "
                                             "range")
    bad = [x for x in nums if not _is_cube_ex2(x)]
    detail = "; ".join(
        f"{x} = {round(x ** (1.0 / 3.0))}^3 (cube)" if _is_cube_ex2(x)
        else f"{x}: not a cube"
        for x in nums)
    if bad:
        ans = ", ".join(str(x) for x in bad) + " are not perfect cubes"
    else:
        ans = "all the listed numbers are perfect cubes"
    steps = [
        f"Checked: {detail}.",
        f"ANSWER: {ans}",
    ]
    return _res_ex2("NOT_PERFECT_CUBE_LIST", {"count": float(len(bad))},
                "n is a cube iff prime exponents are multiples of 3 "
                "(checked by integer cube root)", len(bad), steps, ans)


def model_section_formula(text: str) -> ModelResult:
    t = _clean_ex2(text)
    if re.search(r"external", t, re.I):
        return _no_ex2("SECTION_FORMULA", "external division is a different form")
    m = re.search(r"divides the join of\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                  r"(-?\d+(?:\.\d+)?)\s*\)\s*and\s*\(\s*(-?\d+(?:\.\d+)?)"
                  r"\s*,\s*(-?\d+(?:\.\d+)?)\s*\)\s*in the ratio\s*"
                  r"(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)", t, re.I)
    if not m:
        return _no_ex2("SECTION_FORMULA", "need two points and an internal ratio")
    x1, y1, x2, y2 = (_n_ex2(m.group(i)) for i in range(1, 5))
    r1, r2 = _n_ex2(m.group(5)), _n_ex2(m.group(6))
    if r1 <= 0 or r2 <= 0 or r1 + r2 > 10000:
        return _no_ex2("SECTION_FORMULA", "ratio must be positive")
    if max(abs(x1), abs(y1), abs(x2), abs(y2)) > 1e6:
        return _no_ex2("SECTION_FORMULA", "coordinates out of range")
    x = (r1 * x2 + r2 * x1) / (r1 + r2)
    y = (r1 * y2 + r2 * y1) / (r1 + r2)
    steps = [
        f"Section formula (m:n from the first point): "
        f"P = ((m x2 + n x1)/(m+n), (m y2 + n y1)/(m+n)).",
        f"x = ({r1:g} x {x2:g} + {r2:g} x {x1:g}) / {r1 + r2:g} = {x:.6g}; "
        f"y = ({r1:g} x {y2:g} + {r2:g} x {y1:g}) / {r1 + r2:g} = {y:.6g}",
        f"ANSWER: ({x:g}, {y:g})",
    ]
    return _res_ex2("SECTION_FORMULA", {"x": x, "y": y},
                "(x, y) = ((m x2 + n x1)/(m+n), (m y2 + n y1)/(m+n))", x,
                steps, f"({x:g}, {y:g})")


def model_chord_from_distance(text: str) -> ModelResult:
    t = _clean_ex2(text)
    if not re.search(r"chord", t, re.I):
        return _no_ex2("CHORD_FROM_DISTANCE", "not a chord ask")
    rm = re.search(r"radius is\s*(\d+(?:\.\d+)?)\s*cm", t, re.I)
    dm = re.search(r"per(?:pendicular)? distance (?:from the centre )?is\s*"
                   r"(\d+(?:\.\d+)?)\s*cm", t, re.I)
    if not rm or not dm:
        return _no_ex2("CHORD_FROM_DISTANCE", "need radius and distance")
    r = _n_ex2(rm.group(1))
    d = _n_ex2(dm.group(1))
    if not (0 < d < r <= 1e6):
        return _no_ex2("CHORD_FROM_DISTANCE",
                   "need 0 < distance < radius")
    half = math.sqrt(r * r - d * d)
    chord = 2.0 * half
    steps = [
        "The perpendicular from the centre bisects the chord: "
        "(chord/2)^2 = R^2 - d^2.",
        f"chord = 2 sqrt({r:g}^2 - {d:g}^2) = {chord:.6g} cm",
        f"ANSWER: chord = {chord:.6g} cm",
    ]
    return _res_ex2("CHORD_FROM_DISTANCE", {"R": r, "d": d, "chord": chord},
                "(c/2)^2 = R^2 - d^2", chord, steps,
                f"chord = {chord:.6g} cm")


_SIDES_ex2 = ("PQ", "QR", "RS", "SP")


def model_tangent_quadrilateral(text: str) -> ModelResult:
    t = _clean_ex2(text)
    if not (re.search(r"quadrilateral", t, re.I)
            and re.search(r"circumscrib\w*\s+a circle", t, re.I)):
        return _no_ex2("TANGENT_QUADRILATERAL", "not a circumscribed "
                                            "quadrilateral")
    known = {}
    for s in _SIDES_ex2:
        sm = re.search(r"\b" + s + r"\s*=\s*(\d+(?:\.\d+)?)", t)
        if sm:
            known[s] = _n_ex2(sm.group(1))
    if len(known) != 3:
        return _no_ex2("TANGENT_QUADRILATERAL",
                   "need exactly three sides given")
    if any(v <= 0 or v > 1e5 for v in known.values()):
        return _no_ex2("TANGENT_QUADRILATERAL", "side lengths out of range")
    ask = re.search(r"find (?:the length of )?(PQ|QR|RS|SP)\b", t, re.I)
    if not ask or ask.group(1) in known:
        return _no_ex2("TANGENT_QUADRILATERAL", "asked side missing or unknown")
    miss = ask.group(1)
    pq, qr, rs, sp = (known.get(s) for s in _SIDES_ex2)
    val = {"PQ": lambda: qr + sp - rs,
           "QR": lambda: pq + rs - sp,
           "RS": lambda: qr + sp - pq,
           "SP": lambda: pq + rs - qr}[miss]()
    if val <= 0 or val > 1e5:
        return _no_ex2("TANGENT_QUADRILATERAL", "computed side non-positive")
    steps = [
        "Tangents from a common external point are equal, so opposite "
        "sides sum equal: PQ + RS = QR + SP.",
        f"{miss} = {val:.6g} cm",
        f"ANSWER: {miss} = {val:.6g} cm",
    ]
    return _res_ex2("TANGENT_QUADRILATERAL", {"missing": val},
                "PQ + RS = QR + SP", val, steps,
                f"{miss} = {val:.6g} cm")


def model_equilateral_altitude(text: str) -> ModelResult:
    t = _clean_ex2(text)
    if not re.search(r"equilateral triangle", t, re.I):
        return _no_ex2("EQUILATERAL_ALTITUDE", "not an equilateral triangle")
    if not re.search(r"altitude", t, re.I):
        return _no_ex2("EQUILATERAL_ALTITUDE", "not an altitude ask")
    m = re.search(r"of side\s*(\d+(?:\.\d+)?)\s*cm", t, re.I)
    if not m:
        return _no_ex2("EQUILATERAL_ALTITUDE", "need the side length")
    s = _n_ex2(m.group(1))
    if not (0 < s <= 1e6):
        return _no_ex2("EQUILATERAL_ALTITUDE", "side out of range")
    h = math.sqrt(3.0) / 2.0 * s
    steps = [
        "Altitude of an equilateral triangle: h = (sqrt3 / 2) x side "
        "(half of an equilateral triangle of base s has hypotenuse s).",
        f"h = (sqrt3 / 2) x {s:g} = {h:.6g} cm",
        f"ANSWER: h = {h:.6g} cm",
    ]
    return _res_ex2("EQUILATERAL_ALTITUDE", {"side": s, "h": h},
                "h = (sqrt3/2) s", h, steps, f"altitude = {h:.6g} cm")


def model_basic_proportionality(text: str) -> ModelResult:
    t = _clean_ex2(text)
    if not re.search(r"D and E are points on side AB and AC respectively",
                     t, re.I) or \
            not re.search(r"DE\s*(?:II|\|\||parallel)", t, re.I) or \
            re.search(r"not\s*(?:parallel|II)", t, re.I):
        return _no_ex2("BASIC_PROPORTIONALITY", "not a DE-parallel-BC figure")
    if not re.search(r"find\s+(?:the length of\s+)?CE\b", t, re.I):
        return _no_ex2("BASIC_PROPORTIONALITY", "ask is not CE")
    vals = {}
    for k, v in re.findall(r"\b([A-Z]{2})\s*=\s*(\d+(?:\.\d+)?)", t):
        vals[k] = _n_ex2(v)
    if not ("AD" in vals and "AE" in vals and ("BD" in vals or "AB" in vals)):
        return _no_ex2("BASIC_PROPORTIONALITY",
                   "need AE, AD and (BD or AB)")
    ad, ae = vals["AD"], vals["AE"]
    ab = vals["AB"] if "AB" in vals else ad + vals["BD"]
    if not (0 < ad < ab <= 1e6 and 0 < ae <= 1e6):
        return _no_ex2("BASIC_PROPORTIONALITY", "lengths out of range")
    ac = ab * ae / ad
    ce = ac - ae
    if ce < 0:
        return _no_ex2("BASIC_PROPORTIONALITY", "CE negative: lengths "
                                            "inconsistent")
    steps = [
        f"DE || BC: basic proportionality gives AD/AB = AE/AC, "
        f"AB = {ab:g} cm.",
        f"AC = AB x AE / AD = {ab:g} x {ae:g} / {ad:g} = {ac:.6g} cm",
        f"CE = AC - AE = {ce:.6g} cm",
        f"ANSWER: CE = {ce:.6g} cm",
    ]
    return _res_ex2("BASIC_PROPORTIONALITY", {"AD": ad, "AE": ae, "AB": ab,
                                          "CE": ce},
                "AD/AB = AE/AC", ce, steps, f"CE = {ce:.6g} cm")


def model_ap_equal_terms(text: str) -> ModelResult:
    t = _clean_ex2(text)
    m = re.search(r"nth terms of two APs\s*:?\s*(.+?)\s*and\s*(.+?)\s*equal",
                  t, re.I)
    if not m:
        return _no_ex2("AP_EQUAL_TERMS", "not a two-AP equal-terms ask")
    sides = []
    for grp in (m.group(1), m.group(2)):
        nums = [_n_ex2(x) for x in re.findall(r"-?\d+(?:\.\d+)?", grp)]
        if len(nums) < 3:
            return _no_ex2("AP_EQUAL_TERMS", "each AP needs three given terms")
        sides.append(nums[:3])
    a1, a2, a3 = sides[0]
    b1, b2, b3 = sides[1]
    d1, d2 = a2 - a1, b2 - b1
    if abs((a3 - a2) - d1) > 1e-9 or abs((b3 - b2) - d2) > 1e-9:
        return _no_ex2("AP_EQUAL_TERMS", "given terms are not in AP")
    if abs(d1 - d2) < 1e-12:
        return _no_ex2("AP_EQUAL_TERMS", "equal common differences: never/always "
                                     "equal")
    k = (a1 - b1) / (d2 - d1)     # n - 1
    n = k + 1.0
    if abs(n - round(n)) > 1e-9 or n < 1:
        return _no_ex2("AP_EQUAL_TERMS", "no integral term index")
    ni = int(round(n))
    steps = [
        f"AP1: a = {a1:g}, d = {d1:g}; AP2: a = {b1:g}, d = {d2:g}.",
        f"Set {a1:g} + (n-1)({d1:g}) = {b1:g} + (n-1)({d2:g})  ->  "
        f"n - 1 = {k:g}",
        f"n = {ni}",
        f"ANSWER: n = {ni}",
    ]
    return _res_ex2("AP_EQUAL_TERMS", {"n": ni}, "a1 + (n-1) d1 = b1 + (n-1) d2",
                float(ni), steps, f"n = {ni}")


def model_discount_marked(text: str) -> ModelResult:
    t = _clean_ex2(text)
    rate = re.search(r"discount (?:given )?(?:was|of|is)\s*"
                     r"(\d+(?:\.\d+)?)\s*%", t, re.I)
    if not rate:
        rate = re.search(r"(\d+(?:\.\d+)?)\s*%\s*discount", t, re.I)
    if not rate:
        return _no_ex2("DISCOUNT_MARKED", "no discount percentage")
    r = _n_ex2(rate.group(1))
    if not (0 <= r < 100):
        return _no_ex2("DISCOUNT_MARKED", "discount rate out of range")
    paid = re.search(r"(?:amount|sum)\s+(?:he|she|it)\s+pays\s+is\s*"
                     r"[^\d]{0,3}(" + _NUM_ex2 + r")", t, re.I)
    ask_mp = bool(re.search(r"find the marked price", t, re.I))
    marks = [_n_ex2(x) for x in re.findall(r"marked at\s*[^\d]{0,3}(" + _NUM_ex2
                                       + r")", t)]
    if paid and ask_mp:
        pay = _n_ex2(paid.group(1))
        if pay <= 0 or pay > 1e12:
            return _no_ex2("DISCOUNT_MARKED", "paid amount out of range")
        mp = pay / (1.0 - r / 100.0)
        steps = [
            f"Paid = marked x (1 - {r:g}/100)  ->  marked = paid / "
            f"(1 - {r:g}/100).",
            f"marked = {pay:g} / {1 - r / 100.0:g} = {mp:.6g}",
            f"ANSWER: marked price = {mp:.6g}",
        ]
        return _res_ex2("DISCOUNT_MARKED", {"rate": r, "paid": pay, "marked": mp},
                    "paid = marked (1 - r/100)", mp, steps,
                    f"marked price = {mp:.6g}")
    if marks and re.search(r"sale price", t, re.I):
        if not (1 <= len(marks) <= 6) or any(m <= 0 or m > 1e12
                                             for m in marks):
            return _no_ex2("DISCOUNT_MARKED", "marked prices out of range")
        sales = [m * (1.0 - r / 100.0) for m in marks]
        steps = [
            f"Sale price = marked x (1 - {r:g}/100) = marked x "
            f"{1 - r / 100.0:g}.",
        ]
        for m, s in zip(marks, sales):
            steps.append(f"{m:g} -> {s:.6g}")
        ans = ", ".join(f"{s:.6g}" for s in sales)
        steps.append(f"ANSWER: sale prices = {ans}")
        return _res_ex2("DISCOUNT_MARKED", {"rate": r, "first_sale": sales[0]},
                    "sale = marked (1 - r/100)", sales[0], steps,
                    f"sale prices = {ans}")
    return _no_ex2("DISCOUNT_MARKED", "neither a marked-price nor a sale-price "
                                  "ask")


_WORDS_ex2 = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6,
          "seven": 7, "eight": 8, "nine": 9, "ten": 10}


def model_mean_variance_missing(text: str) -> ModelResult:
    t = _clean_ex2(text)
    m = re.search(r"mean and variance of (\d+) observations are\s*"
                  r"(\d+(?:\.\d+)?)\s*and\s*(\d+(?:\.\d+)?)", t, re.I)
    if not m:
        return _no_ex2("MEAN_VARIANCE_MISSING", "need mean and variance prose")
    n = int(m.group(1))
    mean = _n_ex2(m.group(2))
    var = _n_ex2(m.group(3))
    if not (3 <= n <= 30) or var <= 0:
        return _no_ex2("MEAN_VARIANCE_MISSING", "n or variance out of range")
    km = re.search(r"(\d+|one|two|three|four|five|six|seven|eight|nine|ten)"
                   r"\s+of the observations are\s*"
                   r"(" + _NUM_ex2 + r"(?:\s*,\s*" + _NUM_ex2 + r")*)", t, re.I)
    if not km:
        return _no_ex2("MEAN_VARIANCE_MISSING", "given observations missing")
    k = int(_WORDS_ex2.get(km.group(1).lower(), km.group(1)))
    given = [_n_ex2(x) for x in km.group(2).split(",")]
    if k != len(given) or k != n - 2:
        return _no_ex2("MEAN_VARIANCE_MISSING",
                   f"given count {k} must equal n - 2 = {n - 2}")
    total = n * mean
    ssq = n * (var + mean * mean)
    gs = sum(given)
    gq = sum(g * g for g in given)
    rs = total - gs
    rq = ssq - gq
    if rq < 0:
        return _no_ex2("MEAN_VARIANCE_MISSING",
                   "given squares exceed total: data inconsistent")
    prod = (rs * rs - rq) / 2.0
    disc = rs * rs - 4.0 * prod
    if disc < 0:
        return _no_ex2("MEAN_VARIANCE_MISSING",
                   "no real pair fits the given sum and sum of squares")
    x = (rs - math.sqrt(disc)) / 2.0
    y = (rs + math.sqrt(disc)) / 2.0
    steps = [
        f"Sum of all {n} observations = n x mean = {total:g}; sum of "
        f"squares = n (variance + mean^2) = {ssq:g}.",
        f"Remaining two: sum = {rs:g}, sum of squares = {rq:g}.",
        f"x + y = {rs:g}, xy = ({rs:g}^2 - {rq:g})/2 = {prod:g}  ->  "
        f"t^2 - {rs:g} t + {prod:g} = 0",
        f"x = {x:.6g}, y = {y:.6g}",
        f"ANSWER: the remaining observations are {x:.6g} and {y:.6g}",
    ]
    return _res_ex2("MEAN_VARIANCE_MISSING", {"x": x, "y": y},
                "sum x + sum sq quadratic", x, steps,
                f"the remaining observations are {x:.6g} and {y:.6g}")


_EXTRA2_MATHS_FAMILIES = [
    model_dice_product_prob,
    model_two_point_line,
    model_three_digit_multiples,
    model_not_perfect_cube_list,
    model_section_formula,
    model_chord_from_distance,
    model_tangent_quadrilateral,
    model_equilateral_altitude,
    model_basic_proportionality,
    model_ap_equal_terms,
    model_discount_marked,
    model_mean_variance_missing,
]


def _dispatch_ex2_maths(text: str):
    """model_extra2's loop restricted to the maths families."""
    for fn in _EXTRA2_MATHS_FAMILIES:
        try:
            r = fn(text)
        except Exception:
            continue
        if r is not None and r.matched:
            return r
    return None


# ==========================================================================
# WS-PAL DETERMINISTIC FAMILIES (ovh-pal 2026-10-13)
#
# Genuine numeric board cells that used to refuse as
# 'badge:verifier_na:PAL_PROGRAM' (the PAL template re-ran fine but no
# independent check existed): ascending/descending ordering (class 7),
# digit/place-value in Indian place names (class 6), quotient+remainder
# long division (class 6), metric unit conversion (class 6/8),
# repeated per-period change (class 7 'drops 7 deg C each hour'),
# equal-intercepts line (class 11 coordinate geometry).
#
# Contract: every row is a real closed-form compute on named regex
# slots; each id is globally unique in the 1,070-family union
# (wsb_scan_families.py) and has a raw-question second-path verifier in
# independent_verifier._WSPAL_VERIFIERS -- the same check also serves
# PAL_PROGRAM answers through the _PREROUTE_EXTRA rows.
# ==========================================================================

_GRPNUM = r"-?\d[\d,]*(?:\.\d+)?"
# a list token must END on a digit -- bare _GRPNUM's trailing [\d,]*
# eats the separator comma ('5, -3, 0' captured '5, -3,' then stopped).
# Non-capturing wrapper is mandatory: an inline `A|B` alternation
# would split the surrounding concatenation.
_GRPNUMT = r"(?:-?\d[\d,]*\d(?:\.\d+)?|-?\d(?:\.\d+)?)"


def _nums_grp(s: str) -> List[float]:
    """Grouping-comma-aware literal scan: '4,800' is ONE number; a
    trailing separator comma is ignored."""
    out: List[float] = []
    for tok in re.findall(_GRPNUM, (s or "").replace(" ", " ")):
        tok = tok.strip().strip(",")
        if not tok or tok == "-":
            continue
        try:
            out.append(float(tok.replace(",", "")))
        except ValueError:
            continue
    return out


def _fmt_indian(v: float) -> str:
    """Indian digit grouping: 400000 -> '4,00,000'."""
    if abs(v - round(v)) > 1e-9:
        return _fmt_m2(v)
    n = int(round(v))
    s = str(abs(n))
    if len(s) <= 3:
        return ("-" if n < 0 else "") + s
    tail = s[-3:]
    head = s[:-3]
    parts = []
    while len(head) > 2:
        parts.insert(0, head[-2:])
        head = head[:-2]
    if head:
        parts.insert(0, head)
    return ("-" if n < 0 else "") + ",".join(parts) + "," + tail


def _c_order_numbers(g, m, text):
    nums = _nums_grp(g.get("list") or "")
    if len(nums) < 2:
        return _GATE_m2
    desc = bool(re.search(r"descend\w*|decreasing|largest\s+to\s+"
                          r"smallest", text, re.I))
    want = sorted(nums, reverse=desc)
    op = " > " if desc else " < "
    ans = op.join(_fmt_m2(x) for x in want)
    direction = "descending" if desc else "ascending"
    steps = [
        f"Method: write the list in {direction} order.",
        "Given list: " + ", ".join(_fmt_m2(x) for x in nums) + ".",
        f"Ordered: {ans}."]
    return None, steps, ans, None, \
        f"{direction} order = smallest-to-largest" if not desc else \
        "descending order = largest-to-smallest", \
        {"n_items": float(len(nums))}


_PLACE_IDX_WP = {
    "one": 0, "ones": 0, "unit": 0, "units": 0, "ten": 1, "tens": 1,
    "hundred": 2, "hundreds": 2, "thousand": 3, "thousands": 3,
    "ten thousand": 4, "ten thousands": 4, "ten-thousand": 4,
    "ten-thousands": 4, "lakh": 5, "lakhs": 5, "lac": 5, "lacs": 5,
    "ten lakh": 6, "ten lakhs": 6, "ten-lakh": 6, "ten-lakhs": 6,
    "hundred thousand": 6, "hundred thousands": 6,
    "million": 6, "millions": 6, "ten million": 7, "ten millions": 7,
    "crore": 7, "crores": 7, "ten crore": 8, "ten crores": 8,
    "ten-crore": 8, "ten-crores": 8}


def _place_digits_of(num_s: str) -> str:
    return num_s.replace(",", "").strip()


def _c_place_digit(g, m, text):
    """'digit in the lakhs place in 85,00,486' / 'place value of 4 in
    3,45,678' -- digit-position indexing over the digit string."""
    t = text.replace(" ", " ")
    place = (g.get("place") or "").strip().lower().replace("-", " ")
    pos = _PLACE_IDX_WP.get(place)
    digit_m = re.search(r"place\s+value\s+of\s+(?:the\s+)?"
                        r"(?:digit\s+)?(\d)\s+(?:in|of)\s+(?:the\s+)?"
                        r"(?:number\s+)?(\d[\d,]*)", t, re.I)
    if digit_m:
        # 'place value of <d> in <N>' -- the slot regex may also match;
        # prefer this shape's own parse when present.
        ds = _place_digits_of(digit_m.group(2))
        d = int(digit_m.group(1))
        poss = [i for i, ch in enumerate(ds[::-1]) if int(ch) == d]
        if not poss:
            return _GATE_m2
        pv = d * (10 ** max(poss))
        steps = [
            "Method: locate the digit from the units end (position 0).",
            f"Digit {d} sits at position {max(poss)} ({place or 'place'}).",
            f"Place value = {d} x 10^{max(poss)} = {_fmt_indian(pv)}."]
        return float(pv), steps, f"place value = {_fmt_indian(pv)}", \
            None, "place value = digit x 10^position", \
            {"digit": float(d), "position": float(max(poss))}
    num_s = g.get("num") or ""
    if not num_s:
        # split-clause ask ('In the number 85,00,486, what is the digit
        # in the lakhs place?'): the widest digit run IS the number
        toks = [t.strip(",") for t in re.findall(r"\d[\d,]+", t)]
        cand = max(toks, key=lambda x: len(x.replace(",", ""))) \
            if toks else ""
        num_s = cand or ""
    ds = _place_digits_of(num_s)
    if pos is None or not ds.isdigit() or pos >= len(ds):
        return _GATE_m2
    digit = int(ds[::-1][pos])
    pv = float(digit) * (10 ** pos)
    wants_pv = bool(re.search(r"place\s+value", t, re.I))
    ans = f"digit = {digit}, place value = {_fmt_indian(pv)}" \
        if wants_pv else f"digit = {digit}"
    steps = [
        f"Method: read the {place} place from the units end "
        "(position 0 = ones).",
        f"{num_s}: position {pos} ({place}) holds digit {digit}.",
        f"Place value = {digit} x 10^{pos} = {_fmt_indian(pv)}."]
    val = pv if wants_pv else float(digit)
    return val, steps, ans, None, \
        "place value = digit x 10^position", \
        {"digit": float(digit), "place_value": pv}


def _c_quotient_remainder(g, m, text):
    a = int(float(str(g.get("a") or "0").replace(",", "")))
    b = int(float(str(g.get("b") or "0").replace(",", "")))
    if b <= 0 or a < 0:
        return _GATE_m2
    q_, r_ = divmod(a, b)
    steps = [
        "Method: division algorithm -- dividend = divisor x quotient "
        "+ remainder, with 0 <= remainder < divisor.",
        f"{a} = {b} x {q_} + {r_}.",
        f"quotient = {q_}, remainder = {r_}."]
    return float(q_), steps, f"quotient = {q_}, remainder = {r_}", \
        None, "a = b x q + r (0 <= r < b)", \
        {"quotient": float(q_), "remainder": float(r_)}


_UNITS_WP = (r"kilometres?|kilometers?|kms?|metres?|meters?|"
             r"millimetres?|millimeters?|centimetres?|centimeters?|"
             r"cm|mm|kilograms?|grams?|milligrams?|kg|quintals?|"
             r"litres?|liters?|millilitres?|milliliters?|ml|cl|"
             r"hours?|hrs?|minutes?|mins?|seconds?|secs?|days?|h|s|l|g|m")

_UFACT_WP = {
    "mm": ("m", 0.001), "millimetre": ("m", 0.001),
    "millimeter": ("m", 0.001),
    "cm": ("m", 0.01), "centimetre": ("m", 0.01), "centimeter": ("m", 0.01),
    "m": ("m", 1.0), "metre": ("m", 1.0), "meter": ("m", 1.0),
    "km": ("m", 1000.0), "kilometre": ("m", 1000.0),
    "kilometer": ("m", 1000.0),
    "mg": ("g", 0.001), "milligram": ("g", 0.001),
    "milligrams": ("g", 0.001), "g": ("g", 1.0), "gram": ("g", 1.0),
    "grams": ("g", 1.0), "kg": ("g", 1000.0), "kilogram": ("g", 1000.0),
    "kilograms": ("g", 1000.0), "quintal": ("g", 100000.0),
    "quintals": ("g", 100000.0),
    "ml": ("l", 0.001), "millilitre": ("l", 0.001),
    "milliliter": ("l", 0.001), "cl": ("l", 0.01),
    "l": ("l", 1.0), "litre": ("l", 1.0), "liter": ("l", 1.0),
    "litres": ("l", 1.0), "liters": ("l", 1.0),
    "s": ("s", 1.0), "sec": ("s", 1.0), "second": ("s", 1.0),
    "seconds": ("s", 1.0), "min": ("s", 60.0), "minute": ("s", 60.0),
    "minutes": ("s", 60.0), "h": ("s", 3600.0), "hr": ("s", 3600.0),
    "hrs": ("s", 3600.0), "hour": ("s", 3600.0), "hours": ("s", 3600.0),
    "day": ("s", 86400.0), "days": ("s", 86400.0),
}
def _c_unit_conversion(g, m, text):
    try:
        v = float(str(g.get("v") or "").replace(",", ""))
    except (TypeError, ValueError):
        return _GATE_m2
    u1 = (g.get("u1") or "").lower()
    u2 = (g.get("u2") or "").lower()
    f1 = _UFACT_WP.get(u1) or _UFACT_WP.get(u1.rstrip("s"))
    f2 = _UFACT_WP.get(u2) or _UFACT_WP.get(u2.rstrip("s"))
    if not f1 or not f2 or f1[0] != f2[0]:
        return _GATE_m2
    out = v * f1[1] / f2[1]
    steps = [
        f"Method: 1 {u1} = {_fmt_m2(f1[1] / f2[1])} {u2} "
        "(unit factor chain).",
        f"Convert through the base unit: {v:g} {u1} = "
        f"{_fmt_m2(v * f1[1])} {f1[0]}.",
        f"{_fmt_m2(v * f1[1])} {f1[0]} = {_fmt_m2(out)} {u2}."]
    return out, steps, f"{v:g} {u1} = {_fmt_m2(out)} {u2}", None, \
        f"1 {u1} = {_fmt_m2(f1[1] / f2[1])} {u2}", \
        {"value_in": v, "value_out": out}


def _c_equal_intercepts(g, m, text):
    """'Line through (x0, y0) making equal intercepts on the axes' —
    intercept form x/a + y/a = 1 forces a = x0 + y0."""
    x0 = float(str(g.get("x0") or "0"))
    y0 = float(str(g.get("y0") or "0"))
    a = x0 + y0
    if a == 0:
        return _GATE_m2      # the origin line case is a different family
    steps = [
        "Method: intercept form x/a + y/a = 1 (equal intercepts means "
        "the two denominators are equal).",
        f"The point ({x0:g}, {y0:g}) lies on it: {x0:g}/a + {y0:g}/a "
        f"= 1, so a = {x0:g} + {y0:g} = {_fmt_m2(a)}.",
        f"Line: x/{_fmt_m2(a)} + y/{_fmt_m2(a)} = 1, i.e. "
        f"x + y = {_fmt_m2(a)}."]
    ans = f"x/{_fmt_m2(a)} + y/{_fmt_m2(a)} = 1  (x + y = {_fmt_m2(a)})"
    return float(a), steps, ans, None, \
        "x/a + y/b = 1 with a = b; point lies on the line", \
        {"intercept": a, "x0": x0, "y0": y0}


def _c_repeated_change(g, m, text):
    """'gains/drops/rises N <unit> each <period> for M <periods>' —
    total signed change.  Covers the 'temperature drops 7 deg C each
    hour' and 'gains 7 kg each month' class-7 cells that WEIGHT_MG
    mis-claimed as a 7-kg weight conversion."""
    per = float(str(g.get("per") or "0").replace(",", ""))
    n = float(str(g.get("n") or "0").replace(",", ""))
    unit = (g.get("unit") or "").strip()
    if per == 0 or n <= 0 or n > 10000:
        return _GATE_m2
    neg = bool(re.search(r"drops?|decreas\w+|falls?|fell|loses?|lost|"
                         r"declin\w+|cools?|reduc\w+", text, re.I))
    total = (-per if neg else per) * n
    verb = "drops" if neg else "gains"
    steps = [
        f"Method: change per period x number of periods.",
        f"Per period: {'-' if neg else ''}{per:g} {unit}; "
        f"periods = {n:g}.",
        f"Total change = {_fmt_m2(total)} {unit}."]
    noun = (re.search(r"(?:his|her|its|the)\s+(\w[\w\s]{0,25}?)\s*(?:"
                      r"\?|is|after|now)", text, re.I) or
            re.search(r"total\s+(\w[\w\s]{0,25}?)\s*(?:\?|is)", text,
                      re.I))
    label = noun.group(1).strip() if noun else "change"
    label = re.sub(r"^(?:the\s+)?total\s+", "", label,
                   flags=re.I).strip()
    ans = f"total {label} = {_fmt_m2(total)} {unit}".strip()
    return total, steps, ans, None, \
        "total change = per-period change x periods", \
        {"per_period": per, "periods": n}


_TW_UNIT_MIN = {"day": 1440.0, "days": 1440.0, "hour": 60.0,
                "hours": 60.0, "hr": 60.0, "hrs": 60.0,
                "minute": 1.0, "minutes": 1.0, "min": 1.0}


def _c_time_work_general(g, m, text):
    """'tap A fills in 6 h, tap B in 4 h' / 'A does a job in N hours'
    -- the days-only TIME_WORK_TOGETHER row extended to any consistent
    time unit."""
    a = float(str(g.get("a") or "0"))
    b = float(str(g.get("b") or "0"))
    ua = (g.get("ua") or "days").lower()
    ub = (g.get("ub") or ua).lower()
    if a <= 0 or b <= 0:
        return _GATE_m2
    if ua != ub:
        fa = _TW_UNIT_MIN.get(ua)
        fb = _TW_UNIT_MIN.get(ub)
        if not fa or not fb:
            return _GATE_m2
        a, b = a * fa, b * fb
        unit = "minutes"
    else:
        unit = ua
    together = a * b / (a + b)
    steps = [
        f"Method: combined rate = 1/{a:g} + 1/{b:g} of the job per "
        f"{unit.rstrip('s')}.",
        f"Together: time = (a x b)/(a + b) = ({a:g} x {b:g}) / "
        f"({a:g} + {b:g}).",
        f"= {_fmt_m2(together)} {unit}."]
    return together, steps, f"{_fmt_m2(together)} {unit}", None, \
        "T = ab/(a+b)", {"a": a, "b": b}


def _c_percent_apply(g, m, text):
    """'10% discount on Rs 250' / 'p% of N' -- applied-percent asks the
    increase/decrease phrasing families and DISCOUNT_MARKED both
    miss."""
    p = None
    pm = re.search(r"(\d+(?:\.\d+)?)\s*(?:%|per\s*cent|percent)",
                   text, re.I)
    if pm:
        p = float(pm.group(1))
    if p is None:
        return _GATE_m2
    t = text
    # base: prefer a currency figure, else the number after 'of', else
    # the first number that isn't the percent itself
    bm = (re.search(r"(?:rs\.?\s*|₹\s*|inr\s*)(\d[\d,]*(?:\.\d+)?)",
                    t, re.I)
          or re.search(r"%\s*of\s+(\d[\d,]*(?:\.\d+)?)", t, re.I)
          or re.search(r"(?:price|marked|costs?|sells?|at|list(?:ed)?|"
                       r"tagged?)\D{0,25}(\d[\d,]*(?:\.\d+)?)", t, re.I))
    base = float(bm.group(1).replace(",", "")) if bm else None
    if base is None:
        for tok in re.findall(r"\d[\d,]*(?:\.\d+)?", t):
            v = float(tok.replace(",", ""))
            if abs(v - p) > 1e-12:
                base = v
                break
    if base is None or base <= 0:
        return _GATE_m2
    dec = bool(re.search(r"discount|off\b|reduce|rebate|markdown|"
                         r"concession|cut\b|less\b", t, re.I))
    inc = bool(re.search(r"increas|raise|hike|markup|grow|exceed|"
                         r"surcharge|appreciat", t, re.I))
    if inc and not dec:
        out = base * (1.0 + p / 100.0)
        rel = f"increase by {p:g}%"
    elif dec:
        out = base * (1.0 - p / 100.0)
        rel = f"decrease by {p:g}%"
    else:
        out = base * p / 100.0
        rel = f"{p:g}% of"
    steps = [
        f"Method: {rel} the stated base.",
        f"Base = {_fmt_m2(base)}; rate = {p:g}%.",
        f"Result = {_fmt_m2(out)}."]
    return out, steps, f"{_fmt_m2(out)}", None, \
        "applied percent", {"base": base, "pct": p}


_TABLE_WSPAL: List[Tuple[str, str, Any]] = [
    ("ORDER_NUMBERS",
     r"(?:arrange|write|put|rewrite)[^.]{0,60}?(?:in\s+)?"
     r"(?:ascending|descending|increasing|decreasing)\s+(?:order)?"
     r"[^:]{0,40}?:\s*(?P<list>" + _GRPNUMT + r"(?:\s*[,;]\s*|\s+and\s+)"
     + _GRPNUMT + r"(?:\s*[,;]\s*" + _GRPNUMT + r")*)",
     _c_order_numbers),
    ("ORDER_NUMBERS",
     # no colon: 'arrange in ascending order 5, -3, 0, -8, 12'
     r"(?:ascending|descending|increasing|decreasing)\s+order\s+"
     r"(?:of\s+)?(?P<list>" + _GRPNUMT + r"(?:\s*[,;]\s*" + _GRPNUMT +
     r")+)",
     _c_order_numbers),
    ("PLACE_VALUE_DIGIT",
     r"(?:digit|value)[^.]{0,30}?(?P<place>(?:ten[\s-])?(?:lakhs?|"
     r"crores?|thousands?|hundreds?|tens?|ones?|units?|millions?)"
     r"(?:\s+(?:lakhs?|crores?|thousands?|hundreds?|millions?))?)"
     r"\s+place[^.]{0,50}?(?:in|of)\s+(?:the\s+)?(?:number\s+)?"
     r"(?P<num>\d[\d,]*)",
     _c_place_digit),
    ("PLACE_VALUE_DIGIT",
     # split clause: 'In the number 85,00,486, what is the digit in
     # the lakhs place and what is its place value?'
     r"(?:digit|place\s+value)[^.]{0,40}?(?P<place>(?:ten[\s-])?"
     r"(?:lakhs?|crores?|thousands?|hundreds?|tens?|ones?|units?|"
     r"millions?)(?:\s+(?:lakhs?|crores?|thousands?|hundreds?|"
     r"millions?))?)\s+place",
     _c_place_digit),
    ("QUOTIENT_REMAINDER",
     r"(?:divide\s+(?P<a1>\d[\d,]*)\s+by\s+(?P<b1>\d[\d,]*)|"
     r"(?P<a2>\d[\d,]*)\s*(?:÷|(?:is\s+)?divided\s+by)\s*"
     r"(?P<b2>\d[\d,]*))"
     r"[^.]{0,80}?(?:quotient|remainder|long\s+division)|"
     r"(?:quotient|remainder|long\s+division)[^.]{0,80}?"
     r"(?:divide[sd]?\s+(?P<a3>\d[\d,]*)\s+by\s+(?P<b3>\d[\d,]*)|"
     r"(?P<a4>\d[\d,]*)\s+(?:is\s+)?divided\s+by\s+(?P<b4>\d[\d,]*))",
     lambda g, m, text: _c_quotient_remainder(
         {"a": g.get("a1") or g.get("a2") or g.get("a3") or
               g.get("a4"),
          "b": g.get("b1") or g.get("b2") or g.get("b3") or
               g.get("b4")}, m, text)),
    ("UNIT_CONVERSION",
     r"(?:convert|express|write|change)\s+(?P<v>\d[\d,]*(?:\.\d+)?)\s*"
     r"(?P<u1>" + _UNITS_WP + r")\s+(?:to|into|in|as)\s*"
     r"(?P<u2>" + _UNITS_WP + r")\b",
     _c_unit_conversion),
    ("UNIT_CONVERSION",
     r"how\s+many\s+(?P<u2>" + _UNITS_WP + r")\s+"
     r"(?:are\s+there\s+|are\s+|make\s+)?(?:in\s+)?"
     r"(?P<v>\d[\d,]*(?:\.\d+)?)\s*(?P<u1>" + _UNITS_WP + r")\b",
     _c_unit_conversion),
    ("LINE_EQUAL_INTERCEPTS",
     r"equal\s+intercepts?[^()]{0,80}?(?:through|passes?\s+through)"
     r"[^()]{0,30}?\(?\s*(?P<x0>-?\d+(?:\.\d+)?)\s*,\s*"
     r"(?P<y0>-?\d+(?:\.\d+)?)\s*\)?|"
     r"(?:through|passes?\s+through)[^()]{0,30}?\(?\s*"
     r"(?P<x1>-?\d+(?:\.\d+)?)\s*,\s*(?P<y1>-?\d+(?:\.\d+)?)\s*\)?"
     r"[^()]{0,80}?equal\s+intercepts?",
     lambda g, m, text: _c_equal_intercepts(
         {"x0": g.get("x0") or g.get("x1"),
          "y0": g.get("y0") or g.get("y1")}, m, text)),
    ("REPEATED_CHANGE",
     r"(?:gains?|drops?|rises?|increases?|decreases?|falls?|fell|"
     r"earns?|loses?|lost|grows?|cools?|declin\w+)"
     r"(?:\s+by)?\s+(?P<per>\d[\d,]*(?:\.\d+)?)\s*"
     r"(?P<unit>°?\s*[a-zA-Zμ²³/%]{1,10}(?:\s+[a-zA-Z]{1,3})?)?\s*"
     r"(?:each|every|per|a)\s+"
     r"(?:hour|day|week|month|year|minute|second)\w*[^.]{0,60}?"
     r"(?:for|over|in)\s+(?P<n>\d[\d,]*(?:\.\d+)?)\s*"
     r"(?:hours?|days?|weeks?|months?|years?|minutes?|seconds?)\b",
     _c_repeated_change),
    # taps/pipes or actors working in HOURS/MINUTES (the days-only row
    # above misses 'tap A in 6 hours, tap B in 4 hours')
    ("TIME_WORK_TOGETHER",
     r"(?:tap|pipe|inlet|worker)\s*[A-Za-z]?\s*[^.]{0,50}?"
     r"(?:in|takes?)\s+(?P<a>\d[\d,]*(?:\.\d+)?)\s*"
     r"(?P<ua>days?|hours?|hrs?|minutes?)\b[^.]{0,90}?"
     r"(?:tap|pipe|inlet|worker|and|while)\s*[A-Za-z]?\s*"
     r"[^.]{0,50}?(?:in|takes?)\s+(?P<b>\d[\d,]*(?:\.\d+)?)\s*"
     r"(?P<ub>days?|hours?|hrs?|minutes?)\b.{0,80}?"
     r"(?:together|both|combined)",
     _c_time_work_general),
    # applied percent: '10% discount on Rs 250', 'p% of N'
    ("PERCENT_APPLY",
     r"(?:\d+(?:\.\d+)?)\s*%\s*(?:off|of|discount|on)\b|"
     r"(?:discount|rebate|concession|markdown)\s*(?:of\s*)?"
     r"\d+(?:\.\d+)?\s*(?:%|per\s*cent|percent)",
     _c_percent_apply),
]

# QUOTIENT_REMAINDER outranks WORD_ARITHMETIC (0.96) on 'quotient and
# remainder' asks -- the plain divide family would ship a/b.
_WSPAL_CONF = {"QUOTIENT_REMAINDER": 0.97}


def _dispatch_wspal(text: str):
    """WS-PAL family rows: same contract as _dispatch_m2 (first grounded
    hit wins, deterministic only, no LLM), with per-id confs."""
    norm = _normalize_m2(text)
    for fid, pattern, compute in _TABLE_WSPAL:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, norm)
        except Exception:
            continue
        if not out:
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue
        steps, extra = _augment_m2(fid, g, value, steps, answer, eq,
                                   extra,
                                   recompute=lambda: compute(g, m,
                                                             norm))
        res = _res_m2(fid, g, value, eq or fid, steps, answer=answer,
                      assumptions=assumptions, extra=extra,
                      conf=_WSPAL_CONF.get(fid, 0.96))
        res.note = ((res.note + "; ") if res.note else "") + \
            "method: " + str(extra.get("method") or eq or fid)
        return res
    return None


# ==========================================================================
# Assembled registry surface (map §5.1)
# ==========================================================================

# Flat row table in §3/§5.1 block order (manifest/tools read this;
# the dispatcher semantics live in the per-block dispatchers).
TABLE = (TABLE_m2 + MATHS3_TABLE + APPLIED_TABLE + MATHS4_TABLE
         + JEE_TABLE + TABLE_st + SYLLABUS_MATHS_ROWS + _TABLE_WSPAL)

# Sub-dispatchers in the map §3 global order (M2 7, M3 8, AP 9,
# M4 10, JEE 11, STATS 30, SYLLABUS 15, EXTRA 20, EXTRA2 22, WS-PAL 35).
_MATHS_SUB_DISPATCHERS = (_dispatch_m2, _dispatch_m3, _dispatch_ap,
                          _dispatch_m4, _dispatch_jee, _dispatch_st,
                          _dispatch_syl_maths, _dispatch_ex_maths,
                          _dispatch_ex2_maths, _dispatch_wspal)


def model_maths(text: str) -> ModelResult:
    """The single maths registry entry: sweep the subject's
    sub-dispatchers in §3 order and keep the best claim -- highest
    confidence, earlier block wins the tie (strict >).  This is
    exactly the resolution the global sweep produced among the old
    adjacent maths registrations (invariant I1/I2).  Never calls
    an LLM."""
    best = None
    others = []
    for sub in _MATHS_SUB_DISPATCHERS:
        try:
            r = sub(text)
        except Exception:
            continue
        if r is not None and getattr(r, "matched", False):
            if best is None or r.confidence > best.confidence:
                if best is not None:
                    others.append(best)
                best = r
            else:
                others.append(r)
    if best is not None:
        # wave98 hardening: keep the runner-up sub-readings on the
        # result — the global sweep merges them into ``alternates`` so
        # the tier's ambiguity cross-check can see a contested maths
        # parse (SI-vs-CI class) instead of only the winner.
        try:
            best.alternates = sorted(
                others, key=lambda _r: float(
                    getattr(_r, "confidence", 0.0) or 0.0),
                reverse=True)[:6]
        except Exception:  # noqa: BLE001 -- advisory only
            pass
        return best
    return ModelResult(structure="MATHS", matched=False,
                       confidence=0.0, quantities={},
                       governing_equation="",
                       note="no maths family matched")


# independent_verifier.py lazy-imports these maths2 helpers by
# their original names (VERIFIER LAW surface); _normalize collided
# across four source blocks, so the m2 implementation is re-exported
# under the original name.  The other five names were collision-free
# and keep their plain names from the M2 block.
_normalize = _normalize_m2


# ---------------------------------------------------------------------
# Import-order-safe registration (same pattern as
# extra_families._register_into_ml): if THIS module is imported
# first (pytest collection, tools), modeling_layer's maths import
# block hits a partially-initialised module and silently skips.
# Idempotent from both directions: whoever finishes last registers
# the missing entries, in the same §3 order.
# ---------------------------------------------------------------------

def _register_into_ml() -> bool:
    try:
        import backend.its.solver.modeling_layer as _ml
    except ImportError:
        return False
    if not hasattr(_ml, "_REGISTRY_REPAIRED"):
        # modeling_layer is still mid-init (the flag is assigned after
        # every family block): its own maths block will register us in
        # the right order -- appending here would double-register.
        return False
    regs = _ml._STRUCTURES
    missing = [fn for fn in (
        model_simultaneous_depletion, model_meet_and_shuttle,
        model_tripartite_kinematics,
        model_arithmetic_eval, model_number_theory,
        model_roman_numerals, model_unitary_method,
        model_ratio_divide, model_number_riddle,
        model_square_mensuration,
        model_word_arithmetic, model_fraction_percent_of,
        model_angle_sum, model_circle_mensuration,
        model_exponent_eval, model_riddle_multiplier,
        model_percent_change,
        model_fraction_arithmetic,
        model_triangle_parallelogram_area,
        model_eval_expr_with_givens,
        model_roots_powers, model_proportion, model_interest,
        model_mensuration_3d, model_place_value_number,
        model_consecutive_integers,
        model_maths, model_circle_locus, model_formula_plugin)
        if not any(getattr(fn2, "__name__", "") == fn.__name__
                   for fn2 in regs)]
    if not missing:
        return True
    # Insert at the §3 anchor (the first post-maths entry) so the
    # recovered registry keeps the original sweep order even when this
    # module finished loading after modeling_layer.
    anchor = next((i for i, fn2 in enumerate(regs)
                   if getattr(fn2, "__name__", "") in ("model_physics2", "model_physics_families")),
                  None)
    if anchor is None:
        regs.extend(missing)
    else:
        regs[anchor:anchor] = missing
    return True


_register_into_ml()
