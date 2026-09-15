"""class8_families.py -- CBSE Class 8 foundation families.

    ROOTS_POWERS        square/cube root, cube, square (word forms)
    PROPORTION          direct (same-direction scaling) and inverse
                        (workers-days: n1 t1 = n2 t2)
    COMPOUND_INTEREST   A = P(1 + r/100)^t; CI = A - P
    SIMPLE_INTEREST     SI = P r t / 100
    MENSURATION_3D      cuboid volume l*b*h, cube volume s^3,
                        trapezium area (a+b)/2 * h
    PLACE_VALUE_NUMBER  'tens digit 3 and units digit 5' -> 35
    CONSECUTIVE_INTEGERS 'sum of two consecutive integers is 47'
"""

from __future__ import annotations

import re

from backend.its.solver.modeling_layer import ModelResult

_NUM = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _n(tok: str) -> float:
    return float(tok.replace(",", ""))


# --------------------------------------------------------------------------- #
# ROOTS_POWERS
# --------------------------------------------------------------------------- #


def model_roots_powers(text: str) -> ModelResult:
    low = text.lower()
    cm = re.search(r"cube\s+of\s+(" + _NUM + r")", low)
    if cm:
        a = _n(cm.group(1))
        val = a ** 3
        return ModelResult(
            structure="ROOTS_POWERS", matched=True, confidence=0.95,
            quantities={"a": a}, governing_equation="a^3",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"{a:g}^3 = {val:.6g}"], note="cube")
    sm = re.search(r"square\s+of\s+(" + _NUM + r")", low)
    if sm:
        a = _n(sm.group(1))
        val = a ** 2
        return ModelResult(
            structure="ROOTS_POWERS", matched=True, confidence=0.95,
            quantities={"a": a}, governing_equation="a^2",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"{a:g}^2 = {val:.6g}"], note="square")
    cr = re.search(r"cube\s+root\s+of\s+(" + _NUM + r")", low)
    if cr:
        a = _n(cr.group(1))
        val = round(a ** (1.0 / 3.0), 9)
        near = round(val)
        if near ** 3 == a:
            val = float(near)
        return ModelResult(
            structure="ROOTS_POWERS", matched=True, confidence=0.95,
            quantities={"a": a}, governing_equation="cuberoot(a)",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"cuberoot({a:g}) = {val:.6g}"], note="cube root")
    sr = re.search(r"(?:square\s+root|root)\s+of\s+(" + _NUM + r")", low)
    if sr:
        a = _n(sr.group(1))
        if a < 0:
            return _no("ROOTS_POWERS", "negative radicand")
        val = a ** 0.5
        near = round(val)
        if near * near == a:
            val = float(near)
        return ModelResult(
            structure="ROOTS_POWERS", matched=True, confidence=0.95,
            quantities={"a": a}, governing_equation="sqrt(a)",
            final_answer=f"{val:.6g}", numeric_answer=val,
            steps=[f"sqrt({a:g}) = {val:.6g}"], note="square root")
    return _no("ROOTS_POWERS", "no root/power form")


# --------------------------------------------------------------------------- #
# PROPORTION -- direct and inverse
# --------------------------------------------------------------------------- #


def model_proportion(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"how\s+(?:long|many|much|far)|find\s+the\s+(?:cost|"
                     r"time|days?)", low):
        return _no("PROPORTION", "no proportional ask")
    inverse = bool(re.search(r"inverse|workers?|men\b|pipes?\b", low)) and \
        re.search(r"workers?|men\b|pipes?\b", low)
    m = re.search(r"if\s+(" + _NUM + r")\s+[a-z ]{3,40}?\s+in\s+(" + _NUM +
                  r")\s+(days?|hours?|hrs?|minutes?|weeks?)", low)
    if inverse and m:
        n1, t1 = _n(m.group(1)), _n(m.group(2))
        unit = m.group(3)
        m2 = re.search(r"(\d+(?:\.\d+)?)\s+workers?", low[low.find(m.group(2)):]
                       if m.group(2) in low else low)
        m2 = re.search(r"how\s+long\s+will\s+(\d+(?:\.\d+)?)\s+workers?", low)
        if not m2:
            return _no("PROPORTION", "no second worker count")
        n2 = float(m2.group(1))
        if n2 == 0:
            return _no("PROPORTION", "zero workers")
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
        return _no("PROPORTION", "inverse form not parsed")
    # direct: 'A car travels 180 km in 3 hours... how far in 5 hours?'
    dm = re.search(r"(?:travels?|covers?|fills?|makes?|produces?)\s+(" +
                   _NUM + r")\s*([a-z]*)\s+in\s+(" + _NUM + r")\s*"
                   r"(hours?|hrs?|days?|minutes?|seconds?)", low)
    if dm:
        amount, unit_in = _n(dm.group(1)), dm.group(2)
        t1 = _n(dm.group(3))
        m2 = re.search(r"in\s+(" + _NUM + r")\s*(hours?|hrs?|days?|"
                       r"minutes?|seconds?)[^.?\d]*\?", low)
        if not m2 or float(m2.group(1)) == t1:
            return _no("PROPORTION", "no second time")
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
    return _no("PROPORTION", "no proportion pattern")


# --------------------------------------------------------------------------- #
# INTEREST -- simple and compound
# --------------------------------------------------------------------------- #


def model_interest(text: str) -> ModelResult:
    low = text.lower()
    if "interest" not in low and not re.search(r"\bs\.?i\.?\b", low):
        return _no("INTEREST", "no interest ask")
    pm = re.search(r"(?:\bon\b|\binvests?\b|\bdeposits?\b|\bborrows?\b|"
                   r"\bprincipal\b\s*(?:of|is|:)?|sum\s+of\s+)"
                   r"\s*(?:rs\.?|inr|" + chr(8377) + r")?\s*(" + _NUM +
                   r")", low)
    rm = re.search(r"(\d+(?:\.\d+)?)\s*(?:%|percent)\s*per\s*annum", low)
    tm = re.search(r"for\s+(\d+(?:\.\d+)?)\s+years?", low)
    if not pm or not rm or not tm:
        return _no("INTEREST", "need principal, rate %pa, time years")
    P, r, t = _n(pm.group(1)), float(rm.group(1)), float(tm.group(1))
    if P <= 0 or t <= 0:
        return _no("INTEREST", "non-positive principal or time")
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
        sm = re.search(r"parallel\s+sides\s+(" + _NUM + r")\s*(?:cm|m)?\s*"
                       r"and\s+(" + _NUM + r")", low)
        hm = re.search(r"height\s*(?:of\s*)?(" + _NUM + r")", low)
        if sm and hm:
            a, b, h = _n(sm.group(1)), _n(sm.group(2)), _n(hm.group(1))
            val = (a + b) / 2 * h
            return ModelResult(
                structure="MENSURATION_3D", matched=True, confidence=0.95,
                quantities={"a": a, "b": b, "h": h},
                governing_equation="A = (a+b)/2 x h",
                final_answer=f"{val:.6g}", numeric_answer=val,
                steps=[f"A = ({a:g} + {b:g})/2 x {h:g} = {val:.6g}"],
                note="trapezium area")
    if re.search(r"cuboid", low) and re.search(r"volume", low):
        lm = re.search(r"length\s+(" + _NUM + r")", low)
        bm = re.search(r"breadth\s+(" + _NUM + r")", low)
        hm = re.search(r"height\s+(" + _NUM + r")", low)
        if lm and bm and hm:
            l, b, h = _n(lm.group(1)), _n(bm.group(1)), _n(hm.group(1))
            val = l * b * h
            return ModelResult(
                structure="MENSURATION_3D", matched=True, confidence=0.95,
                quantities={"l": l, "b": b, "h": h},
                governing_equation="V = l x b x h",
                final_answer=f"{val:.6g}", numeric_answer=val,
                steps=[f"V = {l:g} x {b:g} x {h:g} = {val:.6g}"],
                note="cuboid volume")
    if re.search(r"\bcube\b", low) and re.search(r"volume", low):
        sm = re.search(r"side\s*(?:of\s*)?(" + _NUM + r")", low)
        if sm:
            s = _n(sm.group(1))
            val = s ** 3
            return ModelResult(
                structure="MENSURATION_3D", matched=True, confidence=0.95,
                quantities={"s": s}, governing_equation="V = s^3",
                final_answer=f"{val:.6g}", numeric_answer=val,
                steps=[f"V = {s:g}^3 = {val:.6g}"], note="cube volume")
    return _no("MENSURATION_3D", "no 3D/trapezium pattern")


# --------------------------------------------------------------------------- #
# PLACE_VALUE_NUMBER
# --------------------------------------------------------------------------- #


def model_place_value_number(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"two[- ]digit\s+number", low):
        return _no("PLACE_VALUE_NUMBER", "no two-digit number")
    tm = re.search(r"tens?\s+digit\s+(?:is\s+)?(" + _NUM + r")", low)
    um = re.search(r"units?\s+digit\s+(?:is\s+)?(" + _NUM + r")", low)
    if not tm or not um:
        return _no("PLACE_VALUE_NUMBER", "need both digits")
    td, ud = _n(tm.group(1)), _n(um.group(1))
    if not (0 <= td <= 9 and 0 <= ud <= 9):
        return _no("PLACE_VALUE_NUMBER", "digits out of range")
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
        return _no("CONSECUTIVE_INTEGERS", "not consecutive integers")
    m = re.search(r"sum\s+of\s+(two|three)\s+consecutive", low)
    if not m:
        return _no("CONSECUTIVE_INTEGERS", "no count")
    sm = re.search(r"is\s+(-?\d+(?:\.\d+)?)", low)
    if not sm:
        return _no("CONSECUTIVE_INTEGERS", "no sum given")
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
