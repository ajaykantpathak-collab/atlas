"""extra_families.py -- families mined from the competency90 dev clusters
(baseline: 42.4% verified; each family here closes a named failure cluster).

    LINEAR_INEQUALITY     solve 3(x-1) <= 2(x-3), 5x-3 > 3x-5 (sign flip)
    SYMMETRY_ANGLES       smallest angle of symmetry 60 deg -> the others
    PERPETUITY            PV perpetuity: i = A / PV per period (+ nominal)
    RESISTOR_NETWORK      n and m ohm in series/parallel across V volts
    MIXTURE_ADDITION      C1 V1 + C2 V2 = C3 (V1 + V2), solve V2
    COMPOSITE_SOLID       hemisphere surmounted by a cone: volume / CSA
    LINEAR_DEPRECIATION   V(t) = V0 - d t from prose, evaluate V(k)
    GAS_WALL_IMPULSE      |dp| = 2 m v cos(theta) for a wall rebound

All computes are deterministic closed forms; every family refuses (matched
False) unless every slot parses and the physics/maths guard passes.
"""

from __future__ import annotations

import math
import re

from backend.its.solver.modeling_layer import ModelResult

_NUM = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"
_SCI = (r"(?:\d+(?:\.\d+)?\s*(?:[x*]|\u00d7)\s*10\s*(?:\^|\*\*)?\s*[-+]?\d+"
        r"|\d+(?:\.\d+)?\s*[eE]\s*[-+]?\d+|\d+(?:\.\d+)?)")
_AP_LIST = (r"(" + _NUM + r")\s*,\s*(" + _NUM + r")\s*,\s*(" + _NUM
            + r")\s*,?\s*(?:" + _NUM + r")?\s*,?\s*(?:\.\s*\.\s*\.|\u2026)")


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _n(tok: str) -> float:
    return float(tok.replace(",", ""))


def _sci(tok: str) -> float:
    t = (tok or "").strip().replace(",", "").replace("\u00d7", "x")
    m = re.match(r"^(" + _NUM + r")\s*x\s*10\s*(?:\^|\*\*)?\s*([+-]?\d+)$",
                 t, re.I)
    if m:
        return _n(m.group(1)) * (10.0 ** int(m.group(2)))
    m = re.match(r"^(" + _NUM + r")\s*[eE]\s*([+-]?\d+)$", t)
    if m:
        return _n(m.group(1)) * (10.0 ** int(m.group(2)))
    return _n(t)


_CONF = 0.95


def _res(structure: str, quantities: dict, equation: str, val: float,
         steps: list, answer: str, note: str = "") -> ModelResult:
    return ModelResult(
        structure=structure, matched=True, confidence=_CONF,
        quantities=quantities, governing_equation=equation,
        final_answer=answer, numeric_answer=float(val),
        steps=steps, note=note)


# --------------------------------------------------------------------------- #
# LINEAR_INEQUALITY
# --------------------------------------------------------------------------- #

_LIN = r"([+-]?\d*\.?\d*)\s*x\s*([+-]\s*" + _NUM + r")?"


def _linear_side(side: str):
    """Parse '3(x - 1)', '2 (x - 3)', '5x - 3', '-2x', 'x' -> (a, b)."""
    s = side.strip().replace("\u2212", "-")
    m = re.match(r"^([+-]?\d*\.?\d*)\s*\(\s*x\s*([+-]\s*\d+(?:\.\d+)?)?\s*\)"
                 r"(?:\s*([+-]\s*\d+(?:\.\d+)?))?$", s)
    if m:
        a = _n(m.group(1)) if m.group(1) not in (None, "", "+") else (
            -1.0 if m.group(1) == "-" else 1.0)
        b = 0.0
        if m.group(2):
            b = _n(m.group(2).replace(" ", ""))
        if m.group(3):
            b += _n(m.group(3).replace(" ", ""))
        return a, a * (m.group(2) and _n(m.group(2).replace(" ", "")) or 0.0), b
    m = re.match(r"^([+-]?\d*\.?\d*)\s*x\s*(?:([+-])\s*(" + _NUM + r"))?$", s)
    if m:
        a = _n(m.group(1)) if m.group(1) not in (None, "", "+") else (
            -1.0 if m.group(1) == "-" else 1.0)
        b = 0.0
        if m.group(2):
            b = _n(m.group(3)) * (-1.0 if m.group(2) == "-" else 1.0)
        return a, b, b
    # constant only ("10", "-3")
    m = re.match(r"^([+-]?\d*\.?\d*)$", s)
    if m:
        c = _n(m.group(1))
        return 0.0, c, c
    # constant first ("4 - 2x")
    m = re.match(r"^(" + _NUM + r")\s*([+-])\s*([+-]?\d*\.?\d*)\s*x$", s)
    if m:
        a = _n(m.group(3)) if m.group(3) else 1.0
        a = a * (-1.0 if m.group(2) == "-" else 1.0)
        c = _n(m.group(1))
        return a, c, c
    return None


def model_linear_inequality(text: str) -> ModelResult:
    m = re.search(
        r"solve\s*[:\-]?\s*(.+?)\s*(<=|>=|<|>|\u2264|\u2265)\s*(.+)",
        text, re.I)
    if not m or m.group(1) == m.group(3):
        return _no("LINEAR_INEQUALITY", "no inequality form matched")
    lhs_raw, op_raw, rhs_raw = m.group(1), m.group(2), m.group(3)
    # rhs may itself contain x on the other side: '5x - 3 > 3x - 5'
    rhs_x = re.match(r"^(.*x.*)\s+([+-]?\d*\.?\d*)\s*$", rhs_raw)
    lhs = _linear_side(lhs_raw)
    rhs = _linear_side(rhs_raw)
    if lhs is None or rhs is None:
        return _no("LINEAR_INEQUALITY", "sides not linear in x")
    a1, b1, _ = lhs
    a2, b2, _ = rhs
    op = {"<": "<", ">": ">", "<=": "<=", ">=": ">=",
          "\u2264": "<=", "\u2265": ">="}[op_raw]
    a = a1 - a2
    b = b2 - b1
    if abs(a) < 1e-12:
        return _no("LINEAR_INEQUALITY", "degenerate (no x on one side)")
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
    return _res("LINEAR_INEQUALITY", {"a": a, "b": b, "k": k},
                "a x (op) b  ->  x (op') k", k,
                [s for s in steps if s], f"x {op_out} {ks}",
                note="solution set of linear inequality")


# --------------------------------------------------------------------------- #
# SYMMETRY_ANGLES
# --------------------------------------------------------------------------- #


def model_symmetry_angles(text: str) -> ModelResult:
    m = re.search(
        r"(?:smallest\s+angle\s+of\s+symmetry\s+(?:is\s+|of\s+)?"
        r"(" + _NUM + r")\s*(?:degrees?|\u00b0)"
        r"|(" + _NUM + r")\s*(?:degrees?|\u00b0)\s+is\s+the\s+smallest\s+"
        r"angle\s+of\s+symmetry)", text, re.I)
    if not m:
        return _no("SYMMETRY_ANGLES", "no smallest-angle-of-symmetry form")
    a = _n(m.group(1) or m.group(2))
    if a <= 0 or 360.0 % a != 0:
        return _no("SYMMETRY_ANGLES", "smallest angle must divide 360")
    order = int(round(360.0 / a))
    others = [a * k for k in range(2, order)]
    if not others:
        return _no("SYMMETRY_ANGLES", "no other angles")
    val = others[0]
    others_s = ", ".join(f"{o:g}\u00b0" for o in others)
    steps = [
        f"Order of rotational symmetry = 360 / {a:g} = {order}",
        f"Angles of symmetry: {a:g}\u00b0, {others_s}",
        f"ANSWER: other angles = {others_s}",
    ]
    return _res("SYMMETRY_ANGLES", {"smallest": a, "order": order},
                "order = 360 / a; angles = k a", val,
                steps, f"other angles = {others_s}")


# --------------------------------------------------------------------------- #
# PERPETUITY
# --------------------------------------------------------------------------- #


def model_perpetuity(text: str) -> ModelResult:
    m = re.search(
        r"perpetuity\s+of\s+(?:rs\.?|rs\s*|₹\s*)?(" + _NUM + r")\s*"
        r"(?:payable\s+at\s+the\s+end\s+of\s+each\s+)?"
        r"(quarter|month|year|half[- ]?year)", text, re.I)
    pv = re.search(
        r"(?:rs\.?|rs\s*|₹\s*)?(" + _NUM + r")\s*(?:in\s+)?cash\s+"
        r"(?:is\s+)?equivalent", text, re.I)
    if not m or not pv:
        return _no("PERPETUITY", "need perpetuity payment and present value")
    pay = _n(m.group(1))
    period = m.group(2).lower()
    principal = _n(pv.group(1))
    if principal <= 0 or pay <= 0:
        return _no("PERPETUITY", "non-positive values")
    i_period = pay / principal
    per_year = {"month": 12, "quarter": 4, "half-year": 2, "year": 1}[period]
    nominal = i_period * per_year * 100.0
    steps = [
        f"Perpetuity: PV = A / i  ->  i = A / PV",
        f"i per {period} = {pay:g} / {principal:g} = {i_period:.6g}",
        f"Nominal annual rate = {i_period:.6g} x {per_year} = "
        f"{nominal:.4g}%",
        f"ANSWER: rate = {nominal:.4g}% p.a. (nominal)",
    ]
    return _res("PERPETUITY",
                {"payment": pay, "pv": principal, "i_period": i_period},
                "PV = A / i", nominal, steps, f"rate = {nominal:.4g}% p.a.")


# --------------------------------------------------------------------------- #
# RESISTOR_NETWORK
# --------------------------------------------------------------------------- #


def model_resistor_network(text: str) -> ModelResult:
    from backend.its.solver.unit_registry import resolve
    m = re.search(
        r"(?:resistors?\s+of\s+)?(" + _NUM + r")\s*"
        r"(?P<u1>ohms?|\u03a9|kohms?|kilohms?|k\u03a9|megaohms?)\s*"
        r"(?:,|\band\b)\s*(" + _NUM + r")\s*"
        r"(?P<u2>ohms?|\u03a9|kohms?|kilohms?|k\u03a9|megaohms?)"
        r"(?:\s*(?:,|\band\b)\s*(" + _NUM + r")\s*"
        r"(?P<u3>ohms?|\u03a9|kohms?|kilohms?|k\u03a9|megaohms?))?"
        r"[^.]*?\b(series|parallel)\b", text, re.I)
    v = re.search(
        r"(?:across\s+)?(?:a\s+)?(" + _NUM + r")\s*V\b(?:olt)?\s*"
        r"(?:battery|supply|cell|source)", text, re.I)
    if not m:
        return _no("RESISTOR_NETWORK", "need resistor values and connection")
    conv_note = []

    def _ohms(val_s: str, unit: str) -> float:
        raw = _n(val_s)
        ru = resolve(unit.lower(), "resistance")
        if ru is None:
            return raw
        if ru[1] != 1.0:
            conv_note.append(f"{raw:g} {unit} = {raw * ru[1]:g} ohm")
        return raw * ru[1]

    rs = [_ohms(m.group(1), m.group("u1")), _ohms(m.group(3), m.group("u2"))]
    if m.group(5):
        rs.append(_ohms(m.group(5), m.group("u3")))
    conn = m.group(7).lower()
    if conn == "parallel":
        req = 1.0 / sum(1.0 / r for r in rs)
        eq = "1/Req = sum(1/Ri) (parallel)"
    else:
        req = float(sum(rs))
        eq = "Req = sum(Ri) (series)"
    steps = [*conv_note,
             f"{conn} combination: {eq}",
             f"Req = {req:.6g} ohm"]
    if v:
        volt = _n(v.group(1))
        cur = volt / req
        steps.append(f"I = V / Req = {volt:g} / {req:.6g} = {cur:.6g} A")
        steps.append(f"ANSWER: current = {cur:.6g} A")
        return _res("RESISTOR_NETWORK", {"Req": req, "V": volt},
                    "V = I R", cur, steps, f"current = {cur:.6g} A")
    steps.append(f"ANSWER: Req = {req:.6g} ohm")
    return _res("RESISTOR_NETWORK", {"Req": req}, eq, req, steps,
                f"Req = {req:.6g} ohm")


# --------------------------------------------------------------------------- #
# MIXTURE_ADDITION
# --------------------------------------------------------------------------- #


def model_mixture_addition(text: str) -> ModelResult:
    m = re.search(
        r"(" + _NUM + r")\s*(?:litres?|liters?|L)\b[^.]*?of\s+(?:a\s+)?"
        r"(" + _NUM + r")\s*%[^.]*?(?:solution|acid|alcohol|milk)", text, re.I)
    add = re.search(
        r"how\s+many\s+(?:litres?|liters?|L)\s+of\s+(?:a\s+)?(" + _NUM
        + r")\s*%", text, re.I)
    want = re.search(
        r"(?:so\s+that|such\s+that)[^.]*?(\d+(?:\.\d+)?)\s*%", text, re.I)
    if not (m and add and want):
        return _no("MIXTURE_ADDITION", "need stock, added and target percents")
    v1 = _n(m.group(1))
    c1 = _n(m.group(2))
    c2 = _n(add.group(1))
    c3 = _n(want.group(1))
    if not (min(c1, c2) <= c3 <= max(c1, c2)) or abs(c2 - c1) < 1e-12:
        return _no("MIXTURE_ADDITION",
                   "target percent outside the achievable range")
    v2 = v1 * (c3 - c1) / (c2 - c3)
    if v2 <= 0:
        return _no("MIXTURE_ADDITION", "non-positive added volume")
    steps = [
        f"Balance: C1 V1 + C2 V2 = C3 (V1 + V2)",
        f"{c1:g} x {v1:g} + {c2:g} V2 = {c3:g} ({v1:g} + V2)",
        f"V2 = {v1:g} ({c3:g} - {c1:g}) / ({c2:g} - {c3:g}) = {v2:.6g} L",
        f"ANSWER: V2 = {v2:.6g} L",
    ]
    return _res("MIXTURE_ADDITION", {"V1": v1, "C1": c1, "C2": c2, "C3": c3},
                "C1 V1 + C2 V2 = C3 (V1 + V2)", v2, steps,
                f"V2 = {v2:.6g} L")


# --------------------------------------------------------------------------- #
# COMPOSITE_SOLID (hemisphere + cone)
# --------------------------------------------------------------------------- #


def model_composite_solid(text: str) -> ModelResult:
    if not re.search(r"hemisphere", text, re.I) or \
            not re.search(r"cone", text, re.I):
        return _no("COMPOSITE_SOLID", "not a hemisphere+cone solid")
    diam = re.search(r"diameter\s+of\s+(?:the\s+)?base\s+(?:is\s+|of\s+)?"
                     r"(" + _NUM + r")", text, re.I)
    height = re.search(r"(?:total\s+)?height\s+(?:is\s+|of\s+)?(" + _NUM
                       + r")", text, re.I)
    if not diam or not height:
        return _no("COMPOSITE_SOLID", "need total height and base diameter")
    d = _n(diam.group(1))
    h_total = _n(height.group(1))
    r = d / 2.0
    h_cone = h_total - r
    if h_cone <= 0:
        return _no("COMPOSITE_SOLID", "cone height non-positive")
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
    return _res("COMPOSITE_SOLID", {"r": r, "h_cone": h_cone}, eq, val,
                steps, f"{'surface area' if want_area else 'volume'} = "
                       f"{val:.6g}")


# --------------------------------------------------------------------------- #
# LINEAR_DEPRECIATION (prose form)
# --------------------------------------------------------------------------- #


def model_linear_depreciation(text: str) -> ModelResult:
    m = re.search(
        r"(?:initial\s+value\s+(?:of\s+the\s+\w+\s+)?(?:is\s+)?"
        r"(?:rs\.?|rs\s*|₹\s*)?(" + _NUM + r"))"
        r"[^.]*?(?:depreciates?|decreases?|reduces?)\s+(?:at\s+)?"
        r"(?:rs\.?|rs\s*|₹\s*)?(" + _NUM + r")\s*(?:per|each)\s*year",
        text, re.I)
    t = re.search(r"[Vv]\s*\(\s*(\d+(?:\.\d+)?)\s*\)", text)
    if not m or not t:
        return _no("LINEAR_DEPRECIATION",
                   "need initial value, yearly depreciation and V(t) ask")
    v0 = _n(m.group(1))
    d = _n(m.group(2))
    tk = _n(t.group(1))
    val = v0 - d * tk
    if val < 0:
        return _no("LINEAR_DEPRECIATION", "negative value: beyond scrap")
    steps = [
        f"Linear model: V(t) = V0 - d t",
        f"V({tk:g}) = {v0:g} - {d:g} x {tk:g} = {val:.6g}",
        f"ANSWER: V({tk:g}) = {val:.6g}",
    ]
    return _res("LINEAR_DEPRECIATION", {"V0": v0, "d": d, "t": tk},
                "V(t) = V0 - d t", val, steps, f"V({tk:g}) = {val:.6g}")


# --------------------------------------------------------------------------- #
# GAS_WALL_IMPULSE
# --------------------------------------------------------------------------- #


def model_gas_wall_impulse(text: str) -> ModelResult:
    if not re.search(r"(?:hits?|strikes?)\s+(?:a\s+)?(?:horizontal\s+)?wall",
                     text, re.I) or \
            not re.search(r"rebounds?\s+with\s+the\s+same\s+speed", text, re.I):
        return _no("GAS_WALL_IMPULSE", "not a rebound-off-wall case")
    from backend.its.solver.unit_registry import resolve
    m_mass = re.search(r"(?:molecule|molecule of mass|mass)\D{0,40}?"
                       r"(" + _SCI + r")\s*"
                       r"(?P<mu>kg\b|g\b|mg\b)?", text, re.I)
    m_speed = re.search(r"speed\s+(?:of\s+)?(" + _SCI + r")\s*m\s*s?\s*"
                        r"?[\u2013\-]?\s*1|\bspeed\s+(?:of\s+)?(" + _SCI
                        + r")\s*m/s", text, re.I)
    m_ang = re.search(r"angle\s+(?:of\s+)?(" + _NUM + r")\s*(?:degrees?|\u00b0)"
                      r"\s+with\s+the\s+normal", text, re.I)
    if not (m_mass and m_speed and m_ang):
        return _no("GAS_WALL_IMPULSE", "need mass, speed and angle to normal")
    mass_raw = _sci(m_mass.group(1))
    unit = (m_mass.group("mu") or "kg").lower()
    ru = resolve(unit, "mass")
    if ru is None:
        return _no("GAS_WALL_IMPULSE", "unknown mass unit")
    mass = mass_raw * ru[1]
    conv_note = []
    if unit != "kg":
        conv_note.append(f"mass {mass_raw:g} {unit} = {mass:g} kg")
    speed = _sci(m_speed.group(1) or m_speed.group(2))
    ang = _n(m_ang.group(1))
    dp = 2.0 * mass * speed * math.cos(math.radians(ang))
    steps = [
        *conv_note,
        "Only the normal component reverses: |dp| = 2 m v cos(theta).",
        f"|dp| = 2 x {mass:g} x {speed:g} x cos({ang:g} deg) = {dp:.6g}",
        f"ANSWER: |dp| = {dp:.6g} kg m/s",
    ]
    return _res("GAS_WALL_IMPULSE", {"m": mass, "v": speed, "theta": ang},
                "|dp| = 2 m v cos(theta)", dp, [s for s in steps if s],
                f"|dp| = {dp:.6g} kg m/s")


# --------------------------------------------------------------------------- #
# WORD_PERMUTATIONS (repeated letters)
# --------------------------------------------------------------------------- #


def model_word_permutations(text: str) -> ModelResult:
    m = re.search(
        r"(?:number\s+of\s+(?:different\s+)?words?[^.]*?using\s+all\s+"
        r"(?:the\s+)?letters\s+of\s+the\s+word|words?\s+can\s+be\s+(?:made|"
        r"formed)\s+using\s+all\s+(?:the\s+)?letters\s+of\s+the\s+word)\s+"
        r"([A-Z]{3,10})\b", text, re.I)
    if not m:
        return _no("WORD_PERMUTATIONS", "no all-letters-of-word form")
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
    return _res("WORD_PERMUTATIONS", {"n": n}, "n! / (n1! n2! ...)", val,
                steps, f"{val} words")


# --------------------------------------------------------------------------- #
# AP_WHICH_TERM (n-th term exceeds a given term by D)
# --------------------------------------------------------------------------- #


def model_ap_which_term(text: str) -> ModelResult:
    m = re.search(
        r"which\s+term\s+of\s+the\s+(?:AP|A\.P\.|arithmetic\s+progression)"
        r"\s*[:\-]?\s*(?:is\s+)?" + _AP_LIST + r"[^.]*?will\s+be\s+(" + _NUM
        + r")\s+more\s+than\s+its?\s*(\d{1,3})(?:st|nd|rd|th)\s+term",
        text, re.I)
    if not m:
        return _no("AP_WHICH_TERM", "no which-term-of-AP form")
    a = _n(m.group(1))
    d = _n(m.group(2)) - a
    D = _n(m.group(4))
    ref_n = int(m.group(5))
    ref = a + (ref_n - 1) * d
    target = ref + D
    if d == 0:
        return _no("AP_WHICH_TERM", "zero common difference")
    n = (target - a) / d + 1.0
    if abs(n - round(n)) > 1e-9 or n < 1:
        return _no("AP_WHICH_TERM", "no integral term index")
    n_int = int(round(n))
    steps = [
        f"a = {a:g}, d = {d:g}; term {ref_n} = a + {ref_n - 1}d = {ref:g}",
        f"target = {ref:g} + {D:g} = {target:g}",
        f"n = (target - a)/d + 1 = {n_int}",
        f"ANSWER: the {n_int}th term",
    ]
    return _res("AP_WHICH_TERM",
                {"a": a, "d": d, "D": D, "n": n_int},
                "a_n = a + (n-1) d", float(n_int), steps,
                f"the {n_int}th term")


# --------------------------------------------------------------------------- #
# CONCENTRIC_CHORD (chord of outer touches inner circle)
# --------------------------------------------------------------------------- #


def model_concentric_chord(text: str) -> ModelResult:
    m = re.search(
        r"chord\s+of\s+length\s+(" + _NUM + r")\s*cm.{0,80}?touches?\s+"
        r"(?:the\s+)?(?:smaller|inner)\s+circle.{0,120}?radius\s+of\s+the\s+"
        r"(?:larger|outer)\s+circle\s+is\s+(" + _NUM + r")\s*cm", text, re.I)
    if not m:
        return _no("CONCENTRIC_CHORD", "no concentric-chord form")
    chord = _n(m.group(1))
    R = _n(m.group(2))
    half = chord / 2.0
    if R <= half:
        return _no("CONCENTRIC_CHORD", "chord too long for outer circle")
    r2 = R * R - half * half
    r = math.sqrt(r2)
    steps = [
        "The perpendicular from the centre bisects the chord and reaches "
        "the inner circle: r^2 = R^2 - (chord/2)^2.",
        f"r = sqrt({R:g}^2 - {half:g}^2) = {r:.6g} cm",
        f"ANSWER: inner radius = {r:.6g} cm",
    ]
    return _res("CONCENTRIC_CHORD", {"chord": chord, "R": R, "r": r},
                "r^2 = R^2 - (c/2)^2", r, steps,
                f"inner radius = {r:.6g} cm")


# --------------------------------------------------------------------------- #
# BAROMETER_COLUMN (Torricelli: h = P / (rho g))
# --------------------------------------------------------------------------- #


def model_barometer_column(text: str) -> ModelResult:
    if not re.search(r"barometer|column\s+of\s+\w+\s+liquid", text, re.I):
        return _no("BAROMETER_COLUMN", "not a liquid-column case")
    from backend.its.solver.unit_registry import resolve
    dens = re.search(
        r"(?:density|density of [a-z ]+)\s*(?:of\s+)?(?:is\s+)?"
        r"(" + _SCI + r")\s*"
        r"(?P<du>kg\s*/\s*m\s*3|kg\s*m\s*[-\u2013]?\s*3|g\s*/\s*cm\s*3|"
        r"g\s*cm\s*[-\u2013]?\s*3|g/cc|kg/m\u00b3|g/cm\u00b3)", text, re.I)
    if not dens:
        return _no("BAROMETER_COLUMN", "need liquid density")
    rho_raw = _sci(dens.group(1))
    du_key = dens.group("du").replace(" ", "").lower()
    du_key = du_key.replace("m-3", "/m3").replace("m\u20133", "/m3")
    ru = resolve(du_key, "density")
    if ru is None:
        return _no("BAROMETER_COLUMN", "unknown density unit")
    rho = rho_raw * ru[1]
    # normal atmospheric pressure unless stated otherwise
    P = 101325.0
    g = 9.8
    conv_note = []
    if ru[1] != 1.0:
        conv_note.append(f"density {rho_raw:g} {dens.group('du')} = "
                         f"{rho:g} kg/m3")
    pm = re.search(
        r"(" + _SCI + r")\s*"
        r"(?P<pu>pa\b|kpa\b|atm\b|bar\b|mmhg\b|mm\s*hg\b|torr\b|"
        r"n/m2\b|n/m\u00b2\b)", text, re.I)
    if pm:
        pu = resolve(pm.group("pu").replace(" ", "").lower(), "pressure")
        if pu is None:
            return _no("BAROMETER_COLUMN", "unknown pressure unit")
        P = _sci(pm.group(1)) * pu[1]
        conv_note.append(f"pressure {_sci(pm.group(1)):g} {pm.group('pu')} = "
                         f"{P:g} Pa")
    h = P / (rho * g)
    steps = [
        *conv_note,
        "Hydrostatic balance: P = rho g h  ->  h = P / (rho g).",
        f"h = {P:g} / ({rho:g} x {g:g}) = {h:.6g} m",
        f"ANSWER: column height = {h:.6g} m",
    ]
    return _res("BAROMETER_COLUMN", {"P": P, "rho": rho, "g": g},
                "P = rho g h", h, steps, f"column height = {h:.6g} m",
                note="normal atmospheric pressure assumed" if not pm else "")


# --------------------------------------------------------------------------- #
# PERFECT_CUBE (smallest divide/multiply to make a perfect cube)
# --------------------------------------------------------------------------- #


def _prime_factors(n: int) -> dict:
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
        return _no("PERFECT_CUBE", "not a perfect-cube question")
    n = int(m.group(1) or m.group(2) or m.group(4))
    op_hint = m.group(3) or m.group(5)
    f = _prime_factors(n)
    is_cube = all(k % 3 == 0 for k in f.values())
    op = re.search(r"(divided|multiplied)\b", text, re.I)
    op_word = (op.group(1).lower() if op else
               (op_hint.lower() if op_hint else "divided"))
    if is_cube:
        steps = [f"{n} = " + " x ".join(f"{p}^{k}" for p, k in sorted(f.items())),
                 "Every prime exponent is a multiple of 3.",
                 f"ANSWER: {n} is already a perfect cube"]
        return _res("PERFECT_CUBE", {"n": n}, "prime exponents mod 3",
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
        return _res("PERFECT_CUBE", {"n": n, "factor": factor},
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
    return _res("PERFECT_CUBE", {"n": n, "factor": factor},
                "smallest product p^(3 - k mod 3)", float(factor), steps,
                f"multiply by {factor}")


# --------------------------------------------------------------------------- #
# KINEMATICS_STOP (v^2 = u^2 - 2 a s, uniform retardation to a stop)
# --------------------------------------------------------------------------- #


def model_kinematics_stop(text: str) -> ModelResult:
    if not re.search(r"(?:brought\s+to\s+(?:a\s+)?stop|comes?\s+to\s+rest|"
                     r"come\s+to\s+rest)", text, re.I):
        return _no("KINEMATICS_STOP", "not a stop-from-speed case")
    speed = re.search(
        r"(?:speed\s+(?:of\s+)?)?(" + _NUM + r")\s*"
        r"(km\s*/\s*h(?:r)?|km\s*h\s*[-\u2013]?\s*1|m\s*/\s*s|"
        r"m\s*s\s*[-\u2013]?\s*1)\b", text, re.I)
    dist = re.search(r"(" + _NUM + r")\s*m(?!\s*/\s*s)\b", text, re.I)
    if not speed or not dist:
        return _no("KINEMATICS_STOP", "need initial speed and stopping distance")
    u = _n(speed.group(1))
    if "km" in speed.group(2):
        u = u * 1000.0 / 3600.0  # km/h -> m/s
    s = _n(dist.group(1))
    if u <= 0 or s <= 0:
        return _no("KINEMATICS_STOP", "non-positive inputs")
    a = u * u / (2.0 * s)  # retardation magnitude
    want_time = bool(re.search(r"time\s+(?:taken|to)", text, re.I))
    if want_time:
        val = u / a
        steps = [
            f"u = {u:.6g} m/s, s = {s:g} m",
            f"v^2 = u^2 - 2 a s with v = 0  ->  a = u^2 / (2 s) = {a:.6g} m/s^2",
            f"t = u / a = {val:.6g} s",
            f"ANSWER: time = {val:.6g} s (retardation {a:.6g} m/s^2)",
        ]
        return _res("KINEMATICS_STOP", {"u_ms": u, "s": s, "a": a},
                    "v^2 = u^2 - 2 a s", val, steps,
                    f"time = {val:.6g} s")
    steps = [
        f"u = {u:.6g} m/s (converted to SI), s = {s:g} m",
        "v = 0 at rest: v^2 = u^2 - 2 a s  ->  a = u^2 / (2 s)",
        f"a = {a:.6g} m/s^2 (retardation)",
        f"ANSWER: retardation = {a:.6g} m/s^2",
    ]
    return _res("KINEMATICS_STOP", {"u_ms": u, "s": s}, "v^2 = u^2 - 2 a s",
                a, steps, f"retardation = {a:.6g} m/s^2")


# --------------------------------------------------------------------------- #
# QUADRATIC_NATURE (discriminant b^2 - 4ac -> nature of roots)
# --------------------------------------------------------------------------- #


def model_quadratic_nature(text: str) -> ModelResult:
    m = re.search(
        r"roots\s+of\s+(?:the\s+)?quadratic\s+equation\s+"
        r"([0-9x\u00d7\u2212\-\+\u221a\.\s\^]+)=", text, re.I)
    if not m:
        return _no("QUADRATIC_NATURE", "not a nature-of-roots form")
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
        return _no("QUADRATIC_NATURE", f"cannot read term '{tok}'")
    a = coeffs["w"]
    b = coeffs["x"]
    c = coeffs["1"]
    if a == 0:
        return _no("QUADRATIC_NATURE", "not quadratic (no x^2 term)")
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
    return _res("QUADRATIC_NATURE", {"a": a, "b": b, "c": c, "D": d},
                "D = b^2 - 4ac", d, steps, nature)


# --------------------------------------------------------------------------- #
# ELECTRIC_POTENTIAL_ZERO (two charges, null point on the joining line)
# --------------------------------------------------------------------------- #


def model_potential_zero_point(text: str) -> ModelResult:
    if not re.search(r"(?:electric\s+)?potential\s+(?:is\s+)?zero", text,
                     re.I):
        return _no("ELECTRIC_POTENTIAL_ZERO", "not a null-point ask")
    from backend.its.solver.unit_registry import resolve
    q1 = re.search(
        r"(" + _SCI + r")\s*(?P<u1>[a-z\u03bc\u03bd]*c)\b[^.]*?(?:and|,)"
        r"\s*[" + "\u2013-" + r"]?\s*(" + _SCI + r")\s*"
        r"(?P<u2>[a-z\u03bc\u03bd]*c)\b", text, re.I)
    dist = re.search(r"(" + _NUM + r")\s*cm\b", text, re.I)
    if not (q1 and dist):
        return _no("ELECTRIC_POTENTIAL_ZERO",
                   "need two charges with units and their separation")
    conv_note = []
    qa_raw, qb_raw = _sci(q1.group(1)), _sci(q1.group(3))
    ru1 = resolve(q1.group("u1"), "charge")
    ru2 = resolve(q1.group("u2"), "charge")
    if ru1 is None or ru2 is None:
        return _no("ELECTRIC_POTENTIAL_ZERO", "unknown charge unit")
    qa = abs(qa_raw * ru1[1])
    qb = abs(qb_raw * ru2[1])
    if ru1[1] != 1.0 or ru2[1] != 1.0:
        conv_note.append(
            f"charges converted to coulomb: {qa_raw:g} {q1.group('u1')} = "
            f"{qa:g} C, {qb_raw:g} {q1.group('u2')} = {qb:g} C")
    d = _n(dist.group(1))
    if qa <= 0 or qb <= 0 or d <= 0:
        return _no("ELECTRIC_POTENTIAL_ZERO", "non-positive magnitudes")
    x = d * qa / (qa + qb)  # measured from the first charge
    steps = [
        *conv_note,
        "V = 0 where k q1 / x = k q2 / (d - x)",
        f"x = d |q1| / (|q1| + |q2|) = {d:g} x {qa:g} / ({qa:g} + {qb:g}) "
        f"= {x:.6g} cm from the first charge",
        f"ANSWER: {x:.6g} cm from the first charge",
    ]
    return _res("ELECTRIC_POTENTIAL_ZERO",
                {"q1": qa, "q2": qb, "d": d, "x": x},
                "k q1/x = k q2/(d-x)", x, [s for s in steps if s],
                f"{x:.6g} cm from the first charge")


# --------------------------------------------------------------------------- #
# AP_CONSECUTIVE_X (three algebraic terms in AP, find x)
# --------------------------------------------------------------------------- #


def _lin_eval(expr: str):
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
    m = re.search(
        r"([+\-\u2013]?\d*\.?\d*\s*x|\d+)\s*,\s*\(\s*([+\-\u2013 x\d]+)\s*\)"
        r"\s*(?:and|,)\s*\(?\s*([+\-\u2013 x\d]+)\s*\)?[^.]*?"
        r"consecutive\s+terms?\s+of\s+an?\s+(?:AP|A\.P\.|arithmetic)",
        text, re.I)
    if not m:
        return _no("AP_CONSECUTIVE_X",
                   "not three algebraic consecutive-AP terms")
    t1 = _lin_eval(m.group(1))
    t2 = _lin_eval(m.group(2))
    t3 = _lin_eval(m.group(3))
    if t1 is None or t2 is None or t3 is None:
        return _no("AP_CONSECUTIVE_X", "terms not linear in x")
    # (t2 - t1) = (t3 - t2)  ->  2 t2 = t1 + t3
    a = 2 * t2[0] - t1[0] - t3[0]
    b = 2 * t2[1] - t1[1] - t3[1]
    if abs(a) < 1e-12:
        return _no("AP_CONSECUTIVE_X", "x cancels out")
    x = -b / a
    steps = [
        "In AP, 2 t2 = t1 + t3.",
        f"2({t2[0]:g}x + {t2[1]:g}) = ({t1[0]:g}x + {t1[1]:g}) + "
        f"({t3[0]:g}x + {t3[1]:g})",
        f"{a:g} x = {-b:g}  ->  x = {x:.6g}",
        f"ANSWER: x = {x:.6g}",
    ]
    return _res("AP_CONSECUTIVE_X", {"x": x}, "2 t2 = t1 + t3", x, steps,
                f"x = {x:.6g}")


# --------------------------------------------------------------------------- #
# Dispatcher
# --------------------------------------------------------------------------- #

def model_standard_form(text: str) -> ModelResult:
    m = re.search(r"express\s+(" + _NUM + r")\s+in\s+standard\s+form",
                  text, re.I)
    if not m:
        return _no("STANDARD_FORM", "not a standard-form ask")
    from fractions import Fraction
    n = Fraction(_n(m.group(1)))
    if n == 0:
        return _no("STANDARD_FORM", "zero has no standard form")
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
    return _res("STANDARD_FORM", {"n": val, "exp": exp},
                "d.ddd x 10^n", val, steps, ans)


# --------------------------------------------------------------------------- #
# RATIONAL_FORM (express a decimal as a rational number p/q)
# --------------------------------------------------------------------------- #


def model_rational_form(text: str) -> ModelResult:
    m = re.search(r"express\s+(" + _NUM + r")\s+as\s+(?:a\s+)?"
                  r"(?:rational\s+number|fraction|p/q)", text, re.I)
    if not m:
        return _no("RATIONAL_FORM", "not a rational-form ask")
    from fractions import Fraction
    dec = float(m.group(1).replace(",", ""))
    f = Fraction(dec).limit_denominator(10000)
    if float(f) != dec:
        return _no("RATIONAL_FORM", "not exactly representable")
    ans = f"{f.numerator}/{f.denominator}"
    steps = [
        f"{dec:g} = {f.numerator}/{f.denominator} (exact).",
        f"ANSWER: {ans}",
    ]
    return _res("RATIONAL_FORM", {"p": f.numerator, "q": f.denominator},
                "decimal -> p/q (exact)", float(f.numerator), steps, ans)


_FAMILIES = [
    model_linear_inequality,
    model_symmetry_angles,
    model_perpetuity,
    model_resistor_network,
    model_mixture_addition,
    model_composite_solid,
    model_linear_depreciation,
    model_gas_wall_impulse,
    model_word_permutations,
    model_ap_which_term,
    model_concentric_chord,
    model_barometer_column,
    model_perfect_cube,
    model_kinematics_stop,
    model_quadratic_nature,
    model_potential_zero_point,
    model_ap_consecutive_x,
    model_standard_form,
    model_rational_form,
]


def model_extra(text: str) -> ModelResult:
    for fn in _FAMILIES:
        try:
            r = fn(text)
        except Exception:
            continue
        if r is not None and r.matched:
            return r
    return _no("EXTRA", "no extra family matched")


# --------------------------------------------------------------------------- #
# Import-order-safe registration.  modeling_layer's batch-10 imports this
# module, but if THIS module is imported first (pytest collection, tools),
# that batch import hits a partially-initialised module and silently skips.
# Idempotent from both directions: whoever finishes last registers.
# --------------------------------------------------------------------------- #




# --------------------------------------------------------------------------- #
# STANDARD_FORM (express N in standard form: d.ddd x 10^n, 1 <= d < 10)
# --------------------------------------------------------------------------- #


def _register_into_ml() -> bool:
    try:
        import backend.its.solver.modeling_layer as _ml
    except ImportError:
        return False
    if not any(getattr(fn, "__name__", "") == "model_extra"
               for fn in _ml._STRUCTURES):
        _ml._STRUCTURES.append(model_extra)
    return True


if not _register_into_ml():
    pass  # modeling_layer not importable yet; its batch-10 will register us
