"""chemistry3_families.py -- remaining chemistry gap families, classes 11-12 CBSE.

Batch-3 chemistry: 12 typed formula families in the chemistry2 style --
trigger regex (RAW STRING) with named slots, compute function with
plausibility gates, human-readable substitution steps, and a single
dispatcher (model_chemistry3, first grounded hit wins).  Deterministic
only: regex extraction + closed form, zero LLM calls.

Coverage:
  thermo         Gibbs free energy dG = dH - T dS, entropy dS = Q/T
  equilibrium    Le Chatelier shift from gas-mole counts (+ heat marker)
  electrochem    electrolysis mass m = Z I t, Faraday charge Q = n z F
  stoichiometry  mass-mass via molar-mass table (1:1 mole ratio assumed)
  ionic          pH <-> pOH (pH + pOH = 14)
  kinetics       second-order integrated law, Arrhenius activation energy
  solutions      mixing concentrations, dilution M1 V1 = M2 V2
  redox          oxidation number from a fixed standard-rules table

Numeric slots accept plain decimals AND the scientific-notation forms
students actually type: 0.01, 2e-6, 1 x 10^-3, 10^6.

REGEX SAFETY NOTE: every pattern in this module is written as a RAW
string.  A non-raw string containing backslash sequences silently
turns them into control characters and corrupts the trigger -- never
write a regex as a plain (non-raw) string.
"""

from __future__ import annotations

import math
import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver import unit_registry as _ureg
from backend.its.solver.modeling_layer import ModelResult

_CONF = 0.95

# --------------------------------------------------------------------------- #
# Numeric helpers
# --------------------------------------------------------------------------- #

_NUM = r"\d+(?:\.\d+)?"

# plain / 2e-6 / 1 x 10^-3 / 10^6  (bare 10^... branch before plain form)
_SCI = (r"-?(?:"
        + _NUM + r"\s*(?:[x*]|\u00d7)\s*10\s*(?:\^|\*\*)?\s*[-+]?\d+"
        r"|" + _NUM + r"\s*[eE]\s*[-+]?\d+"
        r"|10(?!\d)\s*(?:\^|\*\*)?\s*[-+]?\d+"
        r"|" + _NUM + r")")

_UNIT_WORD = r"(?:millilitres?|milliliters?|ml|litres?|liters?|L)"

_ComputeOut = Optional[Tuple[float, List[str], Optional[str],
                             Optional[List[str]]]]


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _num(s: str) -> float:
    return float(str(s).replace(",", ""))


def _sci(s: str) -> float:
    """Parse plain/scientific tokens: 0.01, 2e-6, 1 x 10^-3, 10^6."""
    t = (s or "").strip().replace(",", "").replace("\u00d7", "x")
    m = re.match(r"^(-?" + _NUM + r")\s*x\s*10\s*(?:\^|\*\*)?\s*([+-]?\d+)$",
                 t, re.I)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    m = re.match(r"^(-?" + _NUM + r")\s*[eE]\s*([+-]?\d+)$", t)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    m = re.match(r"^10(?!\d)\s*(?:\^|\*\*)?\s*([+-]?\d+)$", t)
    if m:
        return 10.0 ** int(m.group(1))
    return float(t)


def _to_litre(val: float, unit: str) -> float:
    u = (unit or "l").lower()
    return val / 1000.0 if u.startswith("m") else val


_SECONDS = {"h": 3600.0, "hr": 3600.0, "hour": 3600.0, "min": 60.0,
            "minute": 60.0, "s": 1.0, "sec": 1.0}


def _tsec(val: float, unit: str) -> float:
    u = (unit or "s").strip().lower()
    if len(u) > 1 and u.endswith("s"):
        u = u[:-1]
    return val * _SECONDS.get(u, 0.0)


# --------------------------------------------------------------------------- #
# Reference tables
# --------------------------------------------------------------------------- #

_MOLAR_MASS = {
    "h": 1.0, "c": 12.0, "n": 14.0, "o": 16.0, "s": 32.0,
    "h2": 2.0, "o2": 32.0, "n2": 28.0, "h2o": 18.0, "h2o2": 34.0,
    "co": 28.0, "co2": 44.0, "caco3": 100.0, "cao": 56.0,
    "mgco3": 84.0, "mgo": 40.0, "nacl": 58.5, "nh3": 17.0,
    "ch4": 16.0, "so2": 64.0, "so3": 80.0, "hcl": 36.5,
    "kclo3": 122.5, "kcl": 74.5, "naoh": 40.0, "koh": 56.0,
    "h2so4": 98.0, "hno3": 63.0, "fe2o3": 160.0, "al2o3": 102.0,
    "na2co3": 106.0, "nahco3": 84.0, "caso4": 136.0, "baso4": 233.0,
    "agcl": 143.5, "cuo": 79.5, "zno": 81.0, "fe": 56.0, "zn": 65.0,
    "cu": 63.5, "mg": 24.0, "ca": 40.0, "na": 23.0, "k": 39.0,
    "ag": 108.0, "al": 27.0, "no": 30.0, "no2": 46.0, "fe3o4": 232.0,
    "fes": 88.0, "c2h5oh": 46.0, "c6h12o6": 180.0,
}

# electrochemical equivalents in g/C (textbook values)
_Z_ROWS = ((("cuso4", "copper"), 0.0003294),
           (("agno3", "silver"), 0.001118),
           (("znso4", "zinc"), 0.0003387),
           (("niso4", "nickel"), 0.0003041),
           (("feso4", "iron"), 0.00029),
           (("al2(so4)3", "aluminium", "aluminum"), 0.0000933))

# fixed oxidation states for elements that are NOT the unknown
_FIXED_OX = {"H": 1.0, "O": -2.0, "F": -1.0, "Cl": -1.0, "Br": -1.0,
             "I": -1.0, "Li": 1.0, "Na": 1.0, "K": 1.0, "Rb": 1.0,
             "Cs": 1.0, "Be": 2.0, "Mg": 2.0, "Ca": 2.0, "Sr": 2.0,
             "Ba": 2.0, "Al": 3.0, "Zn": 2.0, "Ag": 1.0}

_R_GAS = 8.314          # J/(mol K)
_FARADAY = 96500.0      # C/mol


def _z_for(low_text: str) -> Optional[float]:
    for names, z in _Z_ROWS:
        if any(nm in low_text for nm in names):
            return z
    return None


def _mm(formula: str) -> Optional[float]:
    return _MOLAR_MASS.get((formula or "").strip().lower())


# --------------------------------------------------------------------------- #
# Thermo / equilibrium computes
# --------------------------------------------------------------------------- #


def _c_gibbs(g, m, t) -> _ComputeOut:
    dh = _sci(g["dh"])
    temp = _sci(g["temp"])
    ds = _sci(g["ds"])
    if temp <= 0:
        return None
    hu = (g.get("hu") or "kJ").lower()
    su = (g.get("su") or "kJ").lower()
    dh_kj = dh / 1000.0 if hu == "j" else dh
    ds_kj = ds / 1000.0 if su == "j" else ds
    dg = dh_kj - temp * ds_kj
    verdict = "spontaneous" if dg < 0 else "non-spontaneous"
    steps = [
        "Gibbs free energy: dG = dH - T dS.",
        f"dG = ({dh_kj:g}) - ({temp:g} x {ds_kj:g}) = {dg:.6g} kJ/mol",
        f"ANSWER: dG = {dg:.6g} kJ/mol ({verdict} at {temp:g} K)",
    ]
    return dg, steps, f"dG = {dg:.6g} kJ/mol ({verdict})", None


def _c_entropy(g, m, t) -> _ComputeOut:
    q = _sci(g["heat"])
    temp = _sci(g["temp"])
    if temp <= 0:
        return None
    ds = q / temp
    steps = [
        "Entropy change for a reversible transfer: dS = Q_rev / T.",
        f"dS = {q:g} / {temp:g} = {ds:.6g} J/K",
        f"ANSWER: entropy_change = {ds:.6g} J/K",
    ]
    return ds, steps, f"entropy_change = {ds:.6g} J/K", \
        ["magnitude only; heat taken as absorbed reversibly"]


def _split_reaction(rxn: str):
    """'N2 + 3H2 <=> 2NH3' -> ('N2 + 3H2', '2NH3'); None if not splitable."""
    s = (rxn or "").strip()
    s = s.replace("\u21cc", "<=>").replace("\u2192", "->")
    parts = re.split(r"\s*(?:<=>|<->|-->|->|=)\s*", s)
    if len(parts) != 2 or not parts[0].strip() or not parts[1].strip():
        return None, None
    return parts[0], parts[1]


def _side_moles(side: str) -> Optional[float]:
    """Sum of stoichiometric coefficients of real species on one side."""
    total = 0.0
    for term in re.split(r"\s*\+\s*", (side or "").strip()):
        term = term.strip()
        if not term:
            continue
        if re.fullmatch(r"(?i)(heat|energy|light)", term):
            continue  # thermo marker, not a species
        mm = re.match(r"^(\d+(?:\.\d+)?)\s*(.+)$", term)
        coef = float(mm.group(1)) if mm else 1.0
        rest = mm.group(2).strip() if mm else term
        if not re.search(r"[A-Za-z]", rest) or \
                not re.fullmatch(r"[A-Za-z0-9()\[\]\s]*", rest):
            return None
        total += coef
    return total


def _c_le_chatelier(g, m, t) -> _ComputeOut:
    left, right = _split_reaction(g.get("rxn") or "")
    if left is None:
        return None
    n_l = _side_moles(left)
    n_r = _side_moles(right)
    if n_l is None or n_r is None:
        return None
    chg = (g.get("change") or "").lower()
    increasing = ("increas" in chg or "rais" in chg or "ris" in chg
                  or "doubl" in chg)
    d = n_r - n_l
    if g.get("factor", "").lower() == "temperature":
        # only answerable when the +heat marker marks the exothermic side
        heat_right = re.search(r"(?i)\+\s*heat|\+\s*energy", right or "")
        heat_left = re.search(r"(?i)(?:^|\+)\s*heat|\+\s*energy", left or "")
        if heat_right:
            forward = (not increasing)  # exothermic: T up -> backward
        elif heat_left:
            forward = increasing        # endothermic: T up -> forward
        else:
            return None
    elif n_l == n_r:
        steps = [
            "Le Chatelier: count gas moles on each side of the equation.",
            f"moles: left = {n_l:g}, right = {n_r:g} (equal)",
            "ANSWER: no shift -- pressure change has no effect when gas "
            "moles are equal on both sides",
        ]
        return 0.0, steps, \
            "no shift: equal gas moles on both sides", None
    else:
        more_on_right = d > 0
        if increasing:
            forward = not more_on_right   # shift toward FEWER gas moles
        else:
            forward = more_on_right       # shift toward MORE gas moles
    side_txt = "forward (toward products)" if forward \
        else "backward (toward reactants)"
    n_few, n_more = (n_r, n_l) if n_r < n_l else (n_l, n_r)
    ans = (f"Equilibrium shifts {side_txt}: fewer gas moles "
           f"({n_few:g} vs {n_more:g} gas moles)")
    steps = [
        "Le Chatelier: a pressure increase shifts equilibrium toward the "
        "side with FEWER gas moles (a decrease toward more).",
        f"moles: left = {n_l:g}, right = {n_r:g} of the given equation",
        f"ANSWER: {ans}",
    ]
    return d, steps, ans, \
        ["gas moles counted from the stoichiometric coefficients"]


# --------------------------------------------------------------------------- #
# Electrochemistry computes
# --------------------------------------------------------------------------- #


def _c_electrolysis(g, m, t) -> _ComputeOut:
    cur = _num(g["cur"])
    raw_t = _num(g["t"])
    if "_conv_t" in g:
        sec = raw_t  # normalized to seconds by the unit schema
    else:
        sec = _tsec(raw_t, g.get("tu") or "s")
    z = _z_for((t or "").lower())
    if cur <= 0 or sec <= 0 or z is None:
        return None
    mass = z * cur * sec
    steps = [
        "Faraday's first law of electrolysis: m = Z I t "
        "(Z = electrochemical equivalent).",
        f"t = {sec:g} s, Z = {z:g} g/C for this electrolyte",
        f"m = {z:g} x {cur:g} x {sec:g} = {mass:.6g} g",
        f"ANSWER: mass_deposited = {mass:.6g} g",
    ]
    return mass, steps, f"mass_deposited = {mass:.6g} g", None


def _c_faraday(g, m, t) -> _ComputeOut:
    moles = _num(g["moles"])
    ion = (g.get("ion") or "").replace(" ", "").replace("^", "")
    zm = re.search(r"(\d+)\+$", ion)
    z = float(zm.group(1)) if zm else 1.0
    if moles <= 0 or z <= 0:
        return None
    q = moles * z * _FARADAY
    steps = [
        "Charge for electrolysis: Q = n z F (F = 96500 C/mol, z = ion charge).",
        f"Q = {moles:g} x {z:g} x 96500 = {q:.6g} C",
        f"ANSWER: charge = {q:.6g} C",
    ]
    return q, steps, f"charge = {q:.6g} C", None


# --------------------------------------------------------------------------- #
# Stoichiometry / ionic computes
# --------------------------------------------------------------------------- #


def _c_stoich(g, m, t) -> _ComputeOut:
    mass = _num(g["mass"])
    mm_r = _mm(g["reactant"])
    mm_p = _mm(g["product"])
    if mass <= 0 or mm_r is None or mm_p is None:
        return None
    moles = mass / mm_r
    out = moles * mm_p
    steps = [
        "Mass-mass stoichiometry: moles = mass / molar mass "
        "(1:1 mole ratio assumed).",
        f"n({g['reactant']}) = {mass:g}/{mm_r:g} = {moles:.6g} mol",
        f"m({g['product']}) = {moles:.6g} x {mm_p:g} = {out:.6g} g",
        f"ANSWER: mass of {g['product']} = {out:.6g} g",
    ]
    return out, steps, f"mass of {g['product']} = {out:.6g} g", \
        ["1:1 mole ratio between " + g["reactant"] + " and "
         + g["product"] + " assumed"]


def _c_ph_to_h(g, m, t) -> _ComputeOut:
    ph = _num(g["ph"])
    if not (0.0 <= ph <= 14.0):
        return None
    h = 10.0 ** (-ph)
    steps = [
        "pH = -log10([H+])  ->  [H+] = 10^(-pH).",
        f"[H+] = 10^(-{ph:g}) = {h:.6g} M",
        f"ANSWER: [H+] = {h:.6g} M",
    ]
    return h, steps, f"[H+] = {h:.6g} M", None


def _c_ph_from_h(g, m, t) -> _ComputeOut:
    h = _sci(g["h"]) if g.get("h") is not None else (
        _sci(g["h2"]) if g.get("h2") is not None else None)
    if h is None or h <= 0.0 or h > 14.0:
        return None
    ph = -math.log10(h)
    steps = [
        "pH = -log10([H+]).",
        f"pH = -log10({h:g}) = {ph:.4g}",
        f"ANSWER: pH = {ph:.4g}",
    ]
    return ph, steps, f"pH = {ph:.4g}", None


_MOLAR_VOLUME_STP = 22.4  # litres per mol at STP (class-11 convention)


def _c_moles_stp(g, m, t) -> _ComputeOut:
    v = _num(g["v"])
    if v <= 0.0:
        return None
    if "_conv_v" in g:
        litres = v  # normalized to litres by the unit schema
    else:
        u = (g.get("u") or "L").lower()
        litres = v / 1000.0 if u.startswith("m") else v
    n = litres / _MOLAR_VOLUME_STP
    steps = [
        f"At STP, 1 mol of any ideal gas occupies {_MOLAR_VOLUME_STP:g} L.",
        f"V = {litres:g} L  ->  n = {litres:g} / {_MOLAR_VOLUME_STP:g} = {n:.6g} mol",
        f"ANSWER: moles = {n:.6g} mol",
    ]
    return n, steps, f"moles = {n:.6g} mol", None


def _c_ph_poh(g, m, t) -> _ComputeOut:
    if g.get("ph") is None and g.get("ph2") is not None:
        g = dict(g, ph=g["ph2"])
    if g.get("poh") is None and g.get("poh2") is not None:
        g = dict(g, poh=g["poh2"])
    if g.get("ph") is not None:
        ph = _num(g["ph"])
        if not (0.0 <= ph <= 14.0):
            return None
        val = 14.0 - ph
        steps = [
            "pH + pOH = 14 (at 25 degrees C).",
            f"pOH = 14 - {ph:g} = {val:g}",
            f"ANSWER: pOH = {val:g}",
        ]
        return val, steps, f"pOH = {val:g}", None
    poh = _num(g["poh"])
    if not (0.0 <= poh <= 14.0):
        return None
    val = 14.0 - poh
    steps = [
        "pH + pOH = 14 (at 25 degrees C).",
        f"pH = 14 - {poh:g} = {val:g}",
        f"ANSWER: pH = {val:g}",
    ]
    return val, steps, f"pH = {val:g}", None


# --------------------------------------------------------------------------- #
# Kinetics computes
# --------------------------------------------------------------------------- #


def _c_second_order(g, m, t) -> _ComputeOut:
    k = _sci(g["k"])
    a0 = _sci(g["a0"])
    a = _sci(g["a"])
    if k <= 0 or a0 <= 0 or a <= 0 or a >= a0:
        return None  # decay: [A] must fall below [A]0
    time_s = (1.0 / a - 1.0 / a0) / k
    steps = [
        "Second-order integrated law: 1/[A] = 1/[A]0 + k t  ->  "
        "t = (1/[A] - 1/[A]0)/k.",
        f"t = (1/{a:g} - 1/{a0:g})/{k:g} = {time_s:.6g} s",
        f"ANSWER: time = {time_s:.6g} s",
    ]
    return time_s, steps, f"time = {time_s:.6g} s", None


def _c_arrhenius(g, m, t) -> _ComputeOut:
    k1 = _sci(g["k1"])
    k2 = _sci(g["k2"])
    t1 = _sci(g["T1"])
    t2 = _sci(g["T2"])
    if min(k1, k2, t1, t2) <= 0 or t1 == t2 or k1 == k2:
        return None
    denom = 1.0 / t1 - 1.0 / t2
    if denom == 0:
        return None
    ea = _R_GAS * math.log(k2 / k1) / denom
    if ea <= 0:
        return None
    ln_ratio = math.log(k2 / k1)
    steps = [
        "Arrhenius equation: ln(k2/k1) = (Ea/R)(1/T1 - 1/T2)  ->  "
        "Ea = R ln(k2/k1)/(1/T1 - 1/T2), R = 8.314 J/(mol K).",
        f"ln({k2:g}/{k1:g}) = {ln_ratio:.6g}; "
        f"1/{t1:g} - 1/{t2:g} = {denom:.6g}",
        f"Ea = 8.314 x {ln_ratio:.6g}/{denom:.6g} = {ea:.6g} J/mol",
        f"ANSWER: activation_energy = {ea:.6g} J/mol ({ea / 1000:.4g} kJ/mol)",
    ]
    return ea, steps, f"activation_energy = {ea:.6g} J/mol", None


# --------------------------------------------------------------------------- #
# Solutions computes
# --------------------------------------------------------------------------- #


def _c_mixing(g, m, t) -> _ComputeOut:
    if "_conv_v1" in g:
        v1 = _num(g["v1"])  # normalized to litres by the unit schema
    else:
        v1 = _to_litre(_num(g["v1"]), g.get("u1"))
    if "_conv_v2" in g:
        v2 = _num(g["v2"])
    else:
        v2 = _to_litre(_num(g["v2"]), g.get("u2"))
    m1 = _num(g["m1"])
    m2 = _num(g["m2"])
    if v1 <= 0 or v2 <= 0 or m1 < 0 or m2 < 0:
        return None
    c = (m1 * v1 + m2 * v2) / (v1 + v2)
    steps = [
        "Mixing: moles add and volumes add  ->  "
        "C_mix = (M1 V1 + M2 V2)/(V1 + V2).",
        f"C = ({m1:g} x {v1:g} + {m2:g} x {v2:g})/({v1:g} + {v2:g}) "
        f"= {c:.6g} mol/L",
        f"ANSWER: concentration = {c:.6g} M",
    ]
    return c, steps, f"concentration = {c:.6g} M", None


def _c_dilution(g, m, t) -> _ComputeOut:
    m1 = _num(g["m1"])
    m2 = _num(g["m2"])
    v2 = _num(g["v2"])
    if m1 <= 0 or v2 <= 0 or m2 < 0 or m2 >= m1:
        return None  # dilution: target must be weaker than the stock
    v1 = m2 * v2 / m1
    unit = (g.get("u2") or "ml").strip()
    steps = [
        "Dilution: M1 V1 = M2 V2  ->  V1 = M2 V2 / M1.",
        f"V1 = ({m2:g} x {v2:g})/{m1:g} = {v1:.6g} {unit}",
        f"ANSWER: stock_volume = {v1:.6g} {unit}",
    ]
    return v1, steps, f"stock_volume = {v1:.6g} {unit}", None


# --------------------------------------------------------------------------- #
# Oxidation number compute
# --------------------------------------------------------------------------- #


def _c_oxidation(g, m, t) -> _ComputeOut:
    comp = g.get("compound") or ""
    toks = re.findall(r"[A-Z][a-z]?\d*", comp)
    if not toks or "".join(toks) != comp:
        return None  # needs a plain, properly capitalised formula
    counts: Dict[str, float] = {}
    for tk in toks:
        el = re.match(r"[A-Za-z]+", tk).group(0)
        tail = tk[len(el):]
        counts[el] = counts.get(el, 0.0) + (float(tail) if tail else 1.0)
    target = None
    for el in counts:
        if el.lower() == (g.get("element") or "").lower():
            target = el
            break
    if target is None or counts[target] <= 0:
        return None
    total = 0.0
    for el, c in counts.items():
        if el == target:
            continue
        if el not in _FIXED_OX:
            return None  # unknown auxiliary element: refuse, never guess
        total += _FIXED_OX[el] * c

    def ox_show(el: str) -> str:
        return "x" if el == target else f"{_FIXED_OX[el]:+g}"

    lhs = " + ".join(f"{c:g}({ox_show(el)})" for el, c in counts.items())
    x = -total / counts[target]
    if abs(x) > 8.0:
        return None
    steps = [
        "Neutral compound: the oxidation numbers sum to 0 "
        "(standard rules: H = +1, O = -2).",
        f"{lhs} = 0, with x = oxidation number of {target}",
        f"x = {x:+g}",
        f"ANSWER: oxidation number of {target} in {comp} = {x:+g}",
    ]
    return x, steps, f"oxidation number of {target} in {comp} = {x:+g}", \
        ["standard rules; neutral species assumed"]


# --------------------------------------------------------------------------- #
# The table: (id, trigger regex [RAW], governing equation, compute)
# --------------------------------------------------------------------------- #

TABLE = [
    # ---- ionic: [H+] straight from a stated pH (the inverse ask) ----
    ("PH_TO_H",
     r"pH\s+of\s+(?:a\s+|an\s+|the\s+)?(?:sample\s+of\s+)?"
     r"[A-Za-z][A-Za-z0-9 ]{0,30}?\s+is\s+(?P<ph>" + _SCI + r")"
     r".{0,80}?calculate\s+(?:the\s+)?(?:concentration\s+of\s+"
     r"hydrogen\s+ion(?:\s+in\s+it(?:self)?)?|hydrogen\s+ion\s+"
     r"concentration)",
     "[H+] = 10^(-pH)",
     _c_ph_to_h),

    # ---- ionic: pH straight from H+ concentration ----
    ("PH_FROM_H",
     r"(?:pH\s+of\s+(?:a\s+|an\s+|the\s+)?solution\b"
     r"[^.]*?(?:hydrogen\s+ion\s+concentration|concentration\s+of\s+"
     r"H\s*(?:\+|⁺)|\[?\s*H\s*(?:\+|⁺)\s*\]?)\s*"
     r"(?:is\s+|of\s+|=)?\s*(?P<h>" + _SCI + r")\s*"
     r"(?:M\b|mol\s*/?\s*L\b|mol\s+per\s+litre|mol\s+per\s+liter|"
     r"moles?\s+per\s+litre|moles?\s+per\s+liter)"
     r"|(?:hydrogen\s+ion\s+concentration|H\s*(?:\+|⁺)\s*concentration)\s*"
     r"(?:of\s+(?:a\s+|an\s+|the\s+)?(?:solution|acid|base)\s*)?"
     r"(?:is\s+|=)?\s*(?P<h2>" + _SCI + r")\s*"
     r"(?:M\b|mol\s+per\s+litre|mol\s+per\s+liter|moles?\s+per\s+litre|"
     r"moles?\s+per\s+liter)"
     r".{0,60}?find\s+(?:its\s+|the\s+)?pH\b)",
     "pH = -log10([H+])",
     _c_ph_from_h),

    # ---- mole concept: gas volume at STP ----
    ("MOLES_AT_STP",
     r"(?:number\s+of\s+)?moles?\s+(?:of\s+(?:an?\s+|the\s+)?(?:ideal\s+)?gas"
     r"[^.]*?)?\s*in\s+(?P<v>" + _SCI + r")\s*"
     r"(?P<u>millilitres?|milliliters?|ml|litres?|liters?|L)\b"
     r"[^.]*?(?:at\s+|under\s+)?STP\b",
     "n = V(STP) / 22.4 L per mol",
     _c_moles_stp),

    # ---- thermo ----
    ("GIBBS_ENERGY",
     r"(?:(?:\u0394|delta)\s*G\b|gibbs\s+(?:free\s+)?energy)"
     r"[^.]*?(?:(?:\u0394|delta)\s*H|dH)\s*(?:=|is)\s*(?P<dh>" + _SCI + r")"
     r"\s*(?P<hu>kJ|J)\s*(?:/|per)\s*(?:g\s*/?\s*)?mol\b"
     r"[^.]*?temperatures?\s*(?:is|of|at|=)?\s*(?P<temp>" + _SCI + r")"
     r"\s*K\b"
     r"[^.]*?(?:(?:\u0394|delta)\s*S|dS)\s*(?:=|is)\s*(?P<ds>" + _SCI + r")"
     r"\s*(?P<su>kJ|J)\s*(?:/|per)\s*\(?\s*(?:K|kelvin)",
     "dG = dH - T dS",
     _c_gibbs),

    ("ENTROPY_CHANGE",
     r"entropy\s+change[^.]*?(?P<heat>" + _SCI + r")\s*J\b"
     r"[^.]*?heat\s+(?:is\s+)?(?:added|supplied|absorbed|removed|released)?"
     r"[^.]*?at\s+(?:a\s+)?(?:constant\s+)?"
     r"(?:temperatures?\s+(?:of\s+)?)?(?P<temp>" + _SCI + r")\s*K\b",
     "dS = Q_rev/T",
     _c_entropy),

    # ---- equilibrium ----
    ("LE_CHATELIER",
     r"reaction\s+(?P<rxn>[^?.!]+?)[,;]?\s*"
     r"(?:what\s+happens\s*|which\s+way\s+|in\s+which\s+direction\s+"
     r"(?:will|does)?\s*(?:the\s+)?(?:reaction|equilibrium)\s+"
     r"(?:shift|move)?)?"
     r"(?:if|when)\s+(?:the\s+)?(?P<factor>pressure|temperature)\s+"
     r"(?P<change>increases?|decreases?|rises?|drops?|is\s+increased|"
     r"is\s+decreased|is\s+raised|is\s+lowered|is\s+doubled|is\s+reduced)",
     "pressure increase shifts equilibrium toward fewer gas moles",
     _c_le_chatelier),

    # ---- electrochemistry ----
    ("ELECTROLYSIS_MASS",
     r"mass\s+(?:is\s+)?(?:deposited|liberated|discharged)"
     r"(?:\s+at\s+\w+\s+(?:cathode|electrode))?\s+when\s+"
     r"(?P<cur>" + _NUM + r")\s*(?:A|amp|amps|ampere|amperes)\b"
     r"[^.]*?flows?\s+through\s+(?:a\s+)?(?P<elec>[A-Za-z0-9()]+)\s+solution"
     r"[^.]*?for\s+(?P<t>" + _NUM + r")\s*"
     r"(?P<tu>hours?|hrs?|minutes?|mins?|seconds?|secs?|h|min|s)\b",
     "m = Z I t (Z = electrochemical equivalent)",
     _c_electrolysis),

    ("FARADAY_ELECTROLYSIS",
     r"charge\s+(?:required|needed)\s+to\s+"
     r"(?:deposit|liberate|discharge|plate\s+out)\s+"
     r"(?P<moles>" + _NUM + r")\s*(?:moles?|mol)\s+of\s+"
     r"(?:[A-Za-z]{1,3}\s+from\s+)?"
     r"(?P<ion>[A-Za-z]{1,2}\s*\^?\s*\d*\s*\+)",
     "Q = n z F, F = 96500 C/mol",
     _c_faraday),

    # ---- stoichiometry ----
    ("STOICHIOMETRY_MASS_MASS",
     r"mass\s+of\s+(?P<product>[A-Za-z][A-Za-z0-9]{0,9})\s+(?:is\s+)?"
     r"(?:produced|formed|obtained|liberated|evolved|released)\s+when\s+"
     r"(?P<mass>" + _NUM + r")\s*(?:g|grams?)\b\s+(?:of\s+)?"
     r"(?P<reactant>[A-Za-z][A-Za-z0-9]{0,9})\b"
     r"[^.]*?(?:completely\s+)?"
     r"(?:decompos\w+|dissociat\w+|react\w*|burn\w*|heated)"
     r"(?:\s+completely)?",
     "moles = mass / molar mass (1:1 mole ratio)",
     _c_stoich),

    # ---- ionic ----
    ("PH_POH",
     r"(?:pH\s+(?:of\s+(?:a\s+|an\s+|the\s+)?(?:solution\s+)?)?(?:is|was)\s*(?P<ph2>" + _NUM + r")\b)"
     r".{0,60}?find\s+(?:its\s+|the\s+)?pOH\b"
     r"|(?:pOH\s+of\s+(?:a\s+|an\s+|the\s+)?(?:solution\s+)?(?:is|was)\s*(?P<poh2>" + _NUM + r")\b)"
     r".{0,60}?find\s+(?:its\s+|the\s+)?pH\b"
     r"|(?:pOH\s+of\s+[^.]*?pH\s+(?:of\s+|is\s+)?(?P<ph>" + _NUM + r")"
     r"|pH\s+of\s+[^.]*?pOH\s+(?:of\s+|is\s+)?(?P<poh>" + _NUM + r"))",
     "pH + pOH = 14",
     _c_ph_poh),

    # ---- kinetics ----
    ("SECOND_ORDER_KINETICS",
     r"second[-\s]?order\s+reaction[^.]*?k\s*=\s*(?P<k>" + _SCI + r")"
     r"\s*L\s*/\s*mol"
     r"[^.]*?\[\s*A\s*\]\s*(?:0|\u2080)?\s*=\s*(?P<a0>" + _SCI + r")\s*M\b"
     r"[^.]*?(?:to\s+reach|until|till|when)\s*"
     r"\[\s*A\s*\]\s*=\s*(?P<a>" + _SCI + r")\s*M\b",
     "1/[A] = 1/[A]0 + k t",
     _c_second_order),

    ("ARRHENIUS_ACTIVATION",
     r"activation\s+energy[^.]*?k\s*1?\s*=\s*(?P<k1>" + _SCI + r")\s*at\s+"
     r"(?:T\s*1?\s*=\s*)?(?P<T1>" + _SCI + r")\s*K\b"
     r"[^.]*?k\s*2?\s*=\s*(?P<k2>" + _SCI + r")\s*at\s+"
     r"(?:T\s*2?\s*=\s*)?(?P<T2>" + _SCI + r")\s*K\b",
     "ln(k2/k1) = (Ea/R)(1/T1 - 1/T2)",
     _c_arrhenius),

    # ---- solutions ----
    ("CONCENTRATION_AFTER_MIXING",
     r"(?:concentration|molarity)\s*(?:of\s+the\s+(?:mixture|solution))?\s*"
     r"(?:when|after|on\s+mixing)?\s*"
     r"(?P<v1>" + _NUM + r")\s*(?P<u1>" + _UNIT_WORD + r")\b\s+of\s+"
     r"(?P<m1>" + _NUM + r")\s*M\b"
     r"[^.]*?mixed\s+with\s+"
     r"(?P<v2>" + _NUM + r")\s*(?P<u2>" + _UNIT_WORD + r")\b\s+of\s+"
     r"(?P<m2>" + _NUM + r")\s*M\b",
     "C_mix = (M1 V1 + M2 V2)/(V1 + V2)",
     _c_mixing),

    ("DILUTION_M1V1",
     r"(?:what|which)\s+volume\s+of\s+(?P<m1>" + _NUM + r")\s*M\s*\??\s*"
     r"(?P<stock>[A-Za-z]{0,3}[A-Za-z0-9]{0,4})?\s*"
     r"(?:is\s+|are\s+|to\s+be\s+|must\s+be\s+|should\s+be\s+)?"
     r"(?:needed|required|used|added|taken)?\s*"
     r"(?:to|for)\s+(?:make|prepare|produce|obtain|get|dilute\s+to|"
     r"dilute\s+it\s+to)\s+"
     r"(?P<v2>" + _NUM + r")\s*(?P<u2>" + _UNIT_WORD + r")\b\s+of\s+"
     r"(?:a\s+|an\s+|the\s+)?(?P<m2>" + _NUM + r")\s*M\b",
     "M1 V1 = M2 V2",
     _c_dilution),

    # ---- redox ----
    ("OXIDATION_NUMBER",
     r"oxidation\s+(?:number|state)\s+of\s+(?:the\s+)?"
     r"(?P<element>[A-Za-z]{1,2})\b\s+in\s+(?:the\s+)?"
     r"(?P<compound>[A-Za-z0-9]+)",
     "sum of oxidation numbers = 0 (neutral compound)",
     _c_oxidation),
]


# --------------------------------------------------------------------------- #
# Unit schemas: family -> {slot: canonical unit, _out: answer unit,
# _need: dimensions the trigger could not match without}
# --------------------------------------------------------------------------- #

UNITS: Dict[str, Dict[str, Any]] = {
    "PH_FROM_H": {"h": "concentration_molL", "_out": "dimensionless",
                  "_need": ("concentration",)},
    "PH_TO_H": {"_out": "concentration_molL"},
    "MOLES_AT_STP": {"v": "volume_l", "_out": "amount_mol",
                     "_need": ("volume",)},
    "GIBBS_ENERGY": {"temp": "temperature_k", "_need": ("temperature",)},
    "ENTROPY_CHANGE": {"heat": "energy_j", "_need": ("energy",)},
    "LE_CHATELIER": {"_out": "dimensionless"},
    "ELECTROLYSIS_MASS": {"t": "time_s", "_out": "gram_g",
                          "_need": ("current", "time")},
    "FARADAY_ELECTROLYSIS": {"moles": "amount_mol", "_out": "charge_c",
                             "_need": ("amount",)},
    "STOICHIOMETRY_MASS_MASS": {"mass": "gram_g", "_out": "gram_g",
                                "_need": ("mass",)},
    "SECOND_ORDER_KINETICS": {"a0": "concentration_molL",
                              "a": "concentration_molL",
                              "_out": "time_s",
                              "_need": ("concentration",)},
    "ARRHENIUS_ACTIVATION": {"T1": "temperature_k", "T2": "temperature_k",
                             "_out": "energy_j",
                             "_need": ("temperature",)},
    "CONCENTRATION_AFTER_MIXING": {"v1": "volume_l", "v2": "volume_l",
                                   "_out": "concentration_molL",
                                   "_need": ("volume",)},
}


def get_units(fid: str) -> Optional[Dict[str, str]]:
    """Unit schema for a family id; None when the family is unwired."""
    return UNITS.get(fid)


# --------------------------------------------------------------------------- #
# Dispatcher
# --------------------------------------------------------------------------- #


def _quantities_from(m, value: float) -> Dict[str, float]:
    """All named slots parsed as floats (non-numeric groups skipped)."""
    q: Dict[str, float] = {}
    for k, v in (m.groupdict() or {}).items():
        if v is None:
            continue
        try:
            q[k] = _sci(v)
        except ValueError:
            continue
    q["result"] = float(value)
    return q


def model_chemistry3(text: str) -> ModelResult:
    """Scan the chemistry3 family table; first grounded hit wins.

    Families with a "_need" dimension list are skipped when the text
    lacks those units (lossless: their triggers require the unit word),
    and schema-declared slots are normalized to canonical units before
    compute so "560 mL" reaches the mole math as 0.56 litres.
    """
    dims = _ureg.dimensions_of(text)
    for fid, pattern, equation, compute in TABLE:
        schema = UNITS.get(fid)
        if not _ureg.has_dimensions(dims, schema.get("_need")
                                    if schema else None):
            continue
        m = re.search(pattern, text, re.I)
        if not m:
            continue
        g = m.groupdict()
        if schema:
            try:
                g = _ureg.normalize_slots(g, m, text, schema)
            except Exception:
                g = m.groupdict()
        try:
            out = compute(g, m, text)
        except Exception:
            continue
        if not out or out[0] is None:
            continue
        value, steps, answer, assumptions = (list(out) + [None] * 4)[:4]
        if value is None:
            continue
        return ModelResult(
            structure=fid,
            matched=True,
            confidence=_CONF,
            quantities=_quantities_from(m, value),
            governing_equation=equation,
            final_answer=answer or f"{value:.6g}",
            numeric_answer=float(value),
            steps=steps,
            note="; ".join(assumptions) if assumptions else "",
        )
    return _no("CHEMISTRY3", "no chemistry3 family matched")
