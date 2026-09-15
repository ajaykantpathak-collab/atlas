"""class7_families.py -- CBSE Class 7 foundation families.

Battery-driven (2026-09): the class-7 run showed 4/21 cracked and 5
WRONG-ships (given-solved-as-unknown).  This module adds the missing
chapter families; the given-marker guard in math_kernel kills the
wrong-ships.

    WORD_ARITHMETIC      Multiply 0.5 and 0.4 / Divide 2.4 by 0.6
    FRACTION_PERCENT_OF  2/3 of 18, 10% of 250, half of 18
    ANGLE_SUM            complementary (90) / supplementary, linear
                         pair (180) / triangle angles (180)
    CIRCLE_MENSURATION   area = pi r^2, circumference = 2 pi r
    EXPONENT_EVAL        2^5, 3^2 x 3^3 (product law)
    RIDDLE_MULTIPLIER    'sum of twice a number and 5 is 15'
"""

from __future__ import annotations

import math
import re
from typing import Optional

from backend.its.solver.modeling_layer import ModelResult

_NUM = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _n(tok: str) -> float:
    return float(tok.replace(",", ""))


# --------------------------------------------------------------------------- #
# WORD_ARITHMETIC
# --------------------------------------------------------------------------- #


def model_word_arithmetic(text: str) -> ModelResult:
    low = text.lower()
    pm = re.search(r"(?:multiply|product\s+of)\s+(-?" + _NUM + r")\s+(?:and|"
                   r"by|\s)\s*(-?" + _NUM + r")", low)
    if pm:
        a, b = _n(pm.group(1)), _n(pm.group(2))
        val = a * b
        return ModelResult(
            structure="WORD_ARITHMETIC", matched=True, confidence=0.96,
            quantities={"a": a, "b": b}, governing_equation="a * b",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"{a:g} x {b:g} = {val:.6g}"], note="word product")
    dm = re.search(r"divide\s+(-?" + _NUM + r")\s+by\s+(-?" + _NUM + r")",
                   low)
    if dm:
        a, b = _n(dm.group(1)), _n(dm.group(2))
        if b == 0:
            return _no("WORD_ARITHMETIC", "division by zero")
        val = a / b
        return ModelResult(
            structure="WORD_ARITHMETIC", matched=True, confidence=0.96,
            quantities={"a": a, "b": b}, governing_equation="a / b",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"{a:g} / {b:g} = {val:.6g}"], note="word quotient")
    sm = re.search(r"subtract\s+(-?" + _NUM + r")\s+from\s+(-?" + _NUM + r")",
                   low)
    if sm:
        # 'subtract X from Y' = Y - X
        b, a = _n(sm.group(1)), _n(sm.group(2))
        val = a - b
        return ModelResult(
            structure="WORD_ARITHMETIC", matched=True, confidence=0.96,
            quantities={"a": a, "b": b}, governing_equation="a - b",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"{a:g} - {b:g} = {val:.6g}"], note="word difference")
    return _no("WORD_ARITHMETIC", "no word-arithmetic form")


# --------------------------------------------------------------------------- #
# FRACTION_PERCENT_OF
# --------------------------------------------------------------------------- #


def model_fraction_percent_of(text: str) -> ModelResult:
    low = text.lower()
    fo = re.search(
        r"(\d+\s*/\s*\d+|\d+(?:\.\d+)?\s*%|half|quarter|thrice|double)"
        r"\s+of\s+(" + _NUM + r")", low)
    if not fo:
        return _no("FRACTION_PERCENT_OF", "no 'fraction of base'")
    base = _n(fo.group(2))
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
            return _no("FRACTION_PERCENT_OF", "zero denominator")
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

_DEG = r"(-?\d+(?:\.\d+)?)\s*(?:degrees?|deg|°)?"


def model_angle_sum(text: str) -> ModelResult:
    low = text.lower()
    if re.search(r"complementary", low):
        total, label = 90.0, "complementary"
    elif re.search(r"supplementary|linear\s+pair", low):
        total, label = 180.0, "supplementary"
    elif re.search(r"triangle", low) and re.search(r"\bangle\b", low):
        total, label = 180.0, "triangle angle sum"
    else:
        return _no("ANGLE_SUM", "no angle-sum context")
    knowns = [float(m.group(1)) for m in
              re.finditer(_DEG, low) if m.group(1)]
    # drop a requested-but-unknown phrasing; we only trust numbers given
    if not knowns:
        return _no("ANGLE_SUM", "no known angles")
    if re.search(r"ratio\s+\d+\s*:\s*\d+", low):
        return _no("ANGLE_SUM", "ratio form not supported yet")
    rest = total - sum(knowns)
    if rest <= 0:
        return _no("ANGLE_SUM",
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
        return _no("CIRCLE_MENSURATION", "no circle")
    if re.search(r"sector", low):
        return _no("CIRCLE_MENSURATION",
                   "sector questions handled by the sector family")
    if not re.search(r"area|circumference|perimeter", low):
        return _no("CIRCLE_MENSURATION", "no area/circumference ask")
    pi = math.pi
    pi_desc = "pi"
    pm = re.search(r"pi\s*(?:=|is)\s*(\d+(?:\.\d+)?(?:\s*/\s*\d+)?)", low)
    if pm:
        parts = pm.group(1).split("/")
        pi = (float(parts[0]) / float(parts[1]) if len(parts) == 2
              else float(parts[0]))
        pi_desc = pm.group(1)
    rm = re.search(r"radius\s*(?:of\s*)?(?:is\s*)?(" + _NUM + r")", low)
    dm = re.search(r"diameter\s*(?:of\s*)?(?:is\s*)?(" + _NUM + r")", low)
    if rm:
        r = _n(rm.group(1))
    elif dm:
        r = _n(dm.group(1)) / 2.0
    else:
        return _no("CIRCLE_MENSURATION", "no radius/diameter")
    if r <= 0:
        return _no("CIRCLE_MENSURATION", "non-positive radius")
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
        return _no("EXPONENT_EVAL", ctx)
    from backend.its.solver.class6_families import \
        _expression_is_whole_question
    word_m = re.search(r"(\d+)\s+(?:raised\s+to\s+the\s+power\s+(?:of\s+)?"
                       r"|to\s+the\s+power\s+(?:of\s+)?|to\s+the\s+power)"
                       r"\s*(\d+)", low)
    if word_m:
        # whole-question gate: a worded power is only the answer when
        # the power IS the question ('2 raised to the power 5'); other
        # stated quantities mean it is data inside a word problem
        if not _expression_is_whole_question(low, [word_m.span()]):
            return _no("EXPONENT_EVAL",
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
        return _no("EXPONENT_EVAL", "no power expression")
    # whole-question gate: '3.0 x 10^8 m/s ... 2.00 ns' must never
    # become '10^8 = 1e+08' (coefficient AND the actual ask ignored)
    if not _expression_is_whole_question(low, [expr_m.span(1)]):
        return _no("EXPONENT_EVAL",
                   "power expression is not the whole question: leftover "
                   "quantities would be fabricated slot arithmetic")
    expr = expr_m.group(1)
    val = None
    try:
        py = re.sub(r"x", "*", expr)
        val = eval(py.replace("^", "**"), {"__builtins__": {}}, {})
    except Exception:
        return _no("EXPONENT_EVAL", "evaluation failed")
    if not isinstance(val, (int, float)):
        return _no("EXPONENT_EVAL", "non-numeric result")
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
        return _no("RIDDLE_MULTIPLIER", "no multiplier riddle")
    mul = 2.0 if "twice" in low or "double" in low else 3.0
    m = re.search(r"and\s+(-?\d+(?:\.\d+)?)\s+is\s+(-?\d+(?:\.\d+)?)", low)
    if not m:
        return _no("RIDDLE_MULTIPLIER", "no 'and A is B' tail")
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
    m = re.search(r"(increase|decrease|reduced?|reduces?)" + chr(92) + 's+(-?' + _NUM +
                  r')' + chr(92) + 's+by' + chr(92) + 's+(-?[0-9.]+)[ ]*%', low)
    if not m:
        return _no("PERCENT_CHANGE", "no percent-change phrasing")
    base = _n(m.group(2))
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
