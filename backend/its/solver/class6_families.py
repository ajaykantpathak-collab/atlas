"""class6_families.py -- the foundation families (CBSE Class 6 maths).

The adversarial batteries proved the engine skipped the floor: LCM,
HCF, integer arithmetic, decimal addition, roman numerals, unitary
method, ratio division all refused while NEET-tier structures shipped.
This module is the floor, bottom-up, one registered family per
syllabus chapter type.  All deterministic; string answers allowed via
ModelResult.final_answer (numeric_answer stays None there).

    ARITHMETIC_EVAL      -3 + 5, 2.5 + 3.75, Add 45,678 and 23,456
    NUMBER_THEORY        LCM/HCF/GCD of A and B (numeric); prime
                         factorisation (string answer)
    ROMAN_NUMERALS       49 -> XLIX ; XLIX -> 49
    UNITARY_METHOD       cost of 5 pens is 60 -> cost of 8 pens
    RATIO_DIVIDE         divide 60 in ratio 2:3 (smaller/larger part)
    NUMBER_RIDDLE        'If 5 added to a number gives 12, find it'
"""

from __future__ import annotations

import math
import re

from backend.its.solver.modeling_layer import ModelResult


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


# --------------------------------------------------------------------------- #
# ARITHMETIC_EVAL -- pure arithmetic in words or symbols
# --------------------------------------------------------------------------- #

_ARROW_OPS = [("multiplied by", "*"), ("multiplies", "*"),
              ("divided by", "/"), ("added to", "+"), ("plus", "+"),
              ("minus", "-"), ("times", "*"), ("x", "*"), ("×", "*"),
              ("÷", "/"), ("+", "+"), ("-", "-"), ("*", "*"), ("/", "/")]
_NUM = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"     # 45,678 | 3.75 | 7


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
        return _no("ARITHMETIC_EVAL",
                   "scientific notation in chemistry context")
    # 'add A and B' / 'sum of A and B' first (no operator symbols)
    add_m = re.search(r"(?:add|sum of)\s+(" + _NUM + r")\s+and\s+(" +
                      _NUM + r")", low)
    if add_m:
        if not _expression_is_whole_question(low, [add_m.span()]):
            return _no("ARITHMETIC_EVAL",
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
        return _no("ARITHMETIC_EVAL", "pi given: circle family")
    if re.search(r"\d\s*/\s*\d\s+of\s+\d", low):
        return _no("ARITHMETIC_EVAL", "fraction-of family")
    # pure expression ("what is -3 + 5", "2.5 + 3.75 = ?"): strip prose
    expr_m = re.search(
        r"(-?\d[\d,\.]*(?:\s*(?:[+\-*/x×÷^]|\b(?:plus|minus|times|"
        r"multiplied by|divided by)\b)\s*-?\d[\d,\.]*)+)", low)
    if not expr_m:
        return _no("ARITHMETIC_EVAL", "no arithmetic expression")
    # RED-TEAM GUARD: the expression must BE the question.  An embedded
    # scrape ("2 + 25" from a pH mixture, "5/2" from a word equation,
    # "25 -5 -10" from a five-score sum) is fabricated arithmetic.
    if not _expression_is_whole_question(low, [expr_m.span(1)]):
        return _no("ARITHMETIC_EVAL",
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
        return _no("ARITHMETIC_EVAL", "expression not pure arithmetic")
    # 'add A and B' / 'sum of A and B'
    add_m = re.search(r"(?:add|sum of)\s+(" + _NUM + r")\s+and\s+(" +
                      _NUM + r")", low)
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
        return _no("ARITHMETIC_EVAL", "evaluation failed")
    if not isinstance(val, (int, float)) or abs(val) == float("inf"):
        return _no("ARITHMETIC_EVAL", "evaluation not finite")
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

_TWO_NUMS = re.compile(r"(?:of|between)\s+(" + _NUM + r")\s*(?:,|and)\s*(" +
                       _NUM + r")", re.I)


def model_number_theory(text: str) -> ModelResult:
    low = text.lower()
    if re.search(r"\b(lcm|l\.c\.m|hcf|gcf|gcd|highest common factor|"
                 r"least common multiple|lowest common multiple)\b", low):
        m = _TWO_NUMS.search(text)
        if not m:
            return _no("NUMBER_THEORY", "no two numbers for LCM/HCF")
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
            steps=[f"{a} = {' x '.join(map(str, _prime_factors(a)))}",
                   f"{b} = {' x '.join(map(str, _prime_factors(b)))}",
                   f"{word} = {val}"],
            note="number theory")
    if re.search(r"prime\s+factoris\w*|prime\s+factoriz\w*", low):
        m = re.search(r"of\s+([\d,]+)", text)
        if not m:
            return _no("NUMBER_THEORY", "no number to factorise")
        n = int(_to_num(m.group(1)))
        facs = _prime_factors(n)
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
    return _no("NUMBER_THEORY", "no number-theory intent")


def _prime_factors(n: int) -> list:
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
        return _no("ROMAN_NUMERALS", "no roman mention")
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
    return _no("ROMAN_NUMERALS", "no roman numeral found")


# --------------------------------------------------------------------------- #
# UNITARY_METHOD -- 'cost of 5 pens is 60; cost of 8 pens?'
# --------------------------------------------------------------------------- #


def model_unitary_method(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"\bcost\b|\bprice\b|\bweigh\w*\b|\bearn\w*\b|"
                     r"\bpays?\b", low):
        return _no("UNITARY_METHOD", "no cost/weight context")
    m = re.search(r"(?:of|for)\s+(\d+(?:\.\d+)?)\s+([a-z ]{3,24}?)\s+(?:is|"
                  r"are|costs?|comes? to|was)\s+(?:rs\.?|inr|₹)?\s*"
                  r"(\d+(?:\.\d+)?)", low)
    if not m:
        return _no("UNITARY_METHOD", "no 'N items is P' pattern")
    n, item = float(m.group(1)), m.group(2).strip()
    price = float(m.group(3))
    m2 = re.search(r"(\d+(?:\.\d+)?)\s+" + re.escape(item.split()[-1]),
                   low[low.find(item) + len(item):])
    if not m2:
        return _no("UNITARY_METHOD", "no target quantity")
    m_qty = float(m2.group(1))
    if n <= 0:
        return _no("UNITARY_METHOD", "zero base quantity")
    per = price / n
    total = per * m_qty
    return ModelResult(
        structure="UNITARY_METHOD", matched=True, confidence=0.9,
        quantities={"n": n, "price": price, "m": m_qty},
        governing_equation="total = price/n * m",
        final_answer=f"{total:.4g}", numeric_answer=total,
        steps=[f"Cost of 1 {item.split()[-1]} = {price:g}/{n:g} = "
               f"{per:.4g}",
               f"Cost of {m_qty:g} = {per:.4g} x {m_qty:g} = "
               f"{total:.4g}"],
        note="unitary method")


# --------------------------------------------------------------------------- #
# RATIO_DIVIDE -- 'divide 60 in ratio 2:3'
# --------------------------------------------------------------------------- #


def model_ratio_divide(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"\bratio\b", low) or not re.search(
            r"divide|split|share[d]?|distributed", low):
        return _no("RATIO_DIVIDE", "no ratio-division phrasing")
    total_m = re.search(r"(?:divide|split|share|distribut\w*)\s+"
                        r"([\d,]+)", low)
    ratio_m = re.search(r"ratio\s+of\s*(\d+)\s*:\s*(\d+)", low)
    if not ratio_m:
        ratio_m = re.search(r"(\d+)\s*:\s*(\d+)", low)
    if not total_m or not ratio_m:
        return _no("RATIO_DIVIDE", "need total + ratio a:b")
    total = _to_num(total_m.group(1))
    a, b = int(ratio_m.group(1)), int(ratio_m.group(2))
    if a + b <= 0:
        return _no("RATIO_DIVIDE", "degenerate ratio")
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
        return _no("NUMBER_RIDDLE", "no 'a number' subject")
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
            return _no("NUMBER_RIDDLE", "zero multiplier")
        val = result / mul
        return ModelResult(
            structure="NUMBER_RIDDLE", matched=True, confidence=0.9,
            quantities={"mul": mul, "result": result},
            governing_equation="n * mul = result",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"n x {mul:g} = {result:g}",
                   f"n = {result:g}/{mul:g} = {val:g}"],
            note="number riddle (times)")
    return _no("NUMBER_RIDDLE", "unrecognised riddle form")

# --------------------------------------------------------------------------- #
# SQUARE_MENSURATION -- area / perimeter of a square (and rectangles the
# kernel regexes miss)
# --------------------------------------------------------------------------- #


def model_square_mensuration(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"square", low):
        return _no("SQUARE_MENSURATION", "not a square")
    if not re.search(r"area|perimeter|boundary", low):
        return _no("SQUARE_MENSURATION", "no area/perimeter ask")
    sm = re.search(r"side\s*(?:of\s*)?(?:is\s*)?(" + _NUM + r")", low)
    if not sm:
        return _no("SQUARE_MENSURATION", "no side given")
    s = _to_num(sm.group(1))
    if s <= 0:
        return _no("SQUARE_MENSURATION", "non-positive side")
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
