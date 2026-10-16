"""hop_types.py -- typed hop contract + cross-subject hop families (WS-MH).

The multi-hop planner (hop_planner.try_multi_hop) used to treat every hop
as an opaque ``_answer_core`` call: a value came back with no type, so
"hop N output must feed hop N+1 input" could never be checked -- a chain
whose middle hop produced 'speed' where the next clause asked 'mass'
silently shipped.  This module gives hops a TYPE:

    HopResult(value, unit, dimension, family_id, assumptions)

and a closed family table for the cross-subject stems the planner
actually meets (physics kinematics, maths linear/quadratic, chem
mole/molarity, econ percent, ...).  Every family is a tight regex+rule
solver over ONE clause plus the carried previous HopResult; it returns
None on any shape it does not own, so the planner falls back to the
ordinary core solver for everything else.

Dimensions are small canonical tokens ("speed", "length", "moles",
"amount", "value", ...) shared by hop_planner (boundary dim check at
every hop seam) and independent_verifier (the CHAIN second path re-
derives each clause and re-checks every boundary).  No LLM anywhere.
"""

from __future__ import annotations

import math
import re
from dataclasses import dataclass, field
from typing import Callable, List, Optional, Tuple


# ------------------------------------------------------------------ #
# the typed result
# ------------------------------------------------------------------ #

@dataclass(frozen=True)
class HopResult:
    """One solved hop: a value carrying its physical/cognitive type.

    value       the computed number (float)
    unit        display unit ("m/s", "mol/L", "Rs", "" when unitless)
    dimension   canonical dim token -- the boundary contract between
                hops (hop N's dimension must be consumable by hop N+1)
    family_id   the typed family that produced it ("" = generic core)
    assumptions stated/derived assumptions worth surfacing ("g = 10
                m/s^2 as stated", "ideal dilution")
    """
    value: float
    unit: str = ""
    dimension: str = "value"
    family_id: str = ""
    assumptions: Tuple[str, ...] = ()
    note: str = ""       # short qualifier shown in the step line, e.g.
                         # "net +20%" -- keeps the composed answer as
                         # descriptive as the generic-reader hops were

    def display(self) -> str:
        v = f"{self.value:g}"
        base = (v + " " + self.unit).strip()
        return f"{base} ({self.note})" if self.note else base


# ------------------------------------------------------------------ #
# dimension vocabulary
# ------------------------------------------------------------------ #

# forward-reference nouns ("using this speed", "at the same rate") ->
# the dimension hop N must have produced for hop N+1 to consume it.
NOUN_DIM = {
    "speed": "speed", "velocity": "speed",
    "distance": "length", "height": "length", "depth": "length",
    "time": "time", "period": "time",
    "amount": "amount", "sum": "amount", "value": "value",
    "cost": "amount", "price": "amount", "total": "amount",
    "interest": "amount",
    "area": "area", "volume": "volume",
    "current": "current", "voltage": "voltage",
    "resistance": "resistance", "power": "power",
    "energy": "work", "work": "work",
    "mass": "mass", "concentration": "concentration",
    "molarity": "concentration", "moles": "moles",
    "number": "value", "root": "value", "angle": "angle",
    "ph": "ph",
}

_ANY = "*"          # a family that consumes ANY carried dimension
                    # (a bare number can feed a coefficient / percent
                    # base / ratio whole regardless of its dim)


def dim_of_unit(unit: str) -> Optional[str]:
    """Best-effort dimension for a display unit string; None unknown."""
    u = (unit or "").strip().lower().replace(" ", "")
    table = {
        "m/s": "speed", "km/h": "speed", "kmph": "speed",
        "m": "length", "km": "length", "cm": "length", "mm": "length",
        "s": "time", "min": "time", "h": "time", "hr": "time",
        "sec": "time",
        "mol": "moles", "moles": "moles",
        "mol/l": "concentration", "mol/litre": "concentration",
        "j": "work", "kj": "work",
        "w": "power", "n": "force",
        "l": "volume", "ml": "volume",
        "kg": "mass", "g": "mass",
        "rs": "amount", "inr": "amount",
        "%": "percent", "deg": "angle", "°": "angle",
    }
    return table.get(u)


# ------------------------------------------------------------------ #
# shared extraction helpers
# ------------------------------------------------------------------ #

_N = r"(-?\d[\d,]*(?:\.\d+)?)"

# words that can precede an equation inside a clause ("find the larger
# root of x^2 - 9x + c = 0") -- the equation LHS is the text AFTER the
# last such boundary
_EQ_WORDS_RE = re.compile(
    r":|\b(?:of|for|solve|in|to|if|find|that|which|is|are|and|or|"
    r"the|what|where|equation|root|roots|value|values|larger|"
    r"smaller|greater)\b", re.I)


def _eq_parts(matched: str) -> Optional[Tuple[str, str]]:
    """Split 'lhs = rhs' and trim ask-word contamination from both
    sides; returns None when nothing sane remains."""
    if not matched or "=" not in matched:
        return None
    lhs, rhs = matched.split("=", 1)
    lhs = _EQ_WORDS_RE.split(lhs)[-1].strip()
    rhs = _EQ_WORDS_RE.split(rhs)[0].strip()
    if not lhs or not rhs:
        return None
    return lhs, rhs


def _f1(pattern: str, text: str, group: int = 1) -> Optional[float]:
    m = re.search(pattern, text, re.I)
    if not m:
        return None
    try:
        return float(m.group(group).replace(",", ""))
    except (ValueError, IndexError):
        return None


def _carried(carried: Optional[HopResult],
             dims) -> Optional[HopResult]:
    """The carried hop result when its dimension is one this clause can
    consume ("*" dims accept anything)."""
    if carried is None:
        return None
    if dims == _ANY or (dims and carried.dimension in dims):
        return carried
    return None


_LEN_M = {"m": 1.0, "metre": 1.0, "meter": 1.0, "km": 1000.0,
          "kilometre": 1000.0, "kilometer": 1000.0, "cm": 0.01,
          "mm": 0.001}
_TIME_S = {"s": 1.0, "sec": 1.0, "second": 1.0, "seconds": 1.0,
           "min": 60.0, "minute": 60.0, "minutes": 60.0,
           "h": 3600.0, "hr": 3600.0, "hour": 3600.0, "hours": 3600.0}
_VOL_L = {"l": 1.0, "litre": 1.0, "liter": 1.0, "ml": 0.001,
          "millilitre": 0.001, "milliliter": 0.001}


# ------------------------------------------------------------------ #
# families -- each solve(clause, carried) -> HopResult | None
# ------------------------------------------------------------------ #

def _kinematics(clause: str, carried: Optional[HopResult]
                ) -> Optional[HopResult]:
    """s = d/t and rearrangements.  The classic cross-hop feed: clause 1
    produces a speed, clause 2 consumes it ('using this speed ...')."""
    q = clause
    dm = re.search(_N + r"\s*(kilometres?|kilometers?|metres?|meters?|"
                   r"km|cm|mm|m)\b(?!\s*/)", q, re.I)
    tm = re.search(_N + r"\s*(hours?|hrs?|hr|minutes?|mins?|seconds?|"
                   r"secs?|sec|min|h|s)\b", q, re.I)
    sm = re.search(_N + r"\s*(m\s*/\s*s|metres?\s+per\s+second|"
                   r"km\s*/\s*h|kmph|kilometres?\s+per\s+hour)\b",
                   q, re.I)
    d_m = (float(dm.group(1).replace(",", ""))
           * _LEN_M.get(dm.group(2).lower().rstrip("s")
                        if dm.group(2).lower() not in _LEN_M
                        else dm.group(2).lower(), 1.0)) if dm else None
    t_s = (float(tm.group(1).replace(",", ""))
           * _TIME_S.get(tm.group(2).lower().rstrip("s")
                         if tm.group(2).lower() not in _TIME_S
                         else tm.group(2).lower(), 1.0)) if tm else None
    s_ms = None
    s_unit = "m/s"
    if sm:
        raw = float(sm.group(1).replace(",", ""))
        if re.search(r"km|kilomet", sm.group(2), re.I):
            s_ms = raw / 3.6
            s_unit = "km/h"
        else:
            s_ms = raw
    car = _carried(carried, ("speed",))
    if s_ms is None and car is not None:
        s_ms = car.value if car.unit in ("m/s", "") else car.value / 3.6
        s_unit = car.unit or "m/s"

    if re.search(r"\b(?:speed|velocity|how\s+fast)\b", q, re.I) \
            and re.search(r"find|calculate|what|determine|\?", q, re.I):
        if d_m is not None and t_s:
            v = d_m / t_s
            if re.search(r"km\s*/\s*h|kmph|per\s+hour", q, re.I):
                return HopResult(v * 3.6, "km/h", "speed", "kin_sdt")
            return HopResult(v, "m/s", "speed", "kin_sdt")
    if re.search(r"how\s+far|distance|travel|cover|journey", q, re.I):
        if s_ms is not None and t_s:
            d = s_ms * t_s
            if s_unit == "km/h":
                return HopResult(d / 1000.0, "km", "length", "kin_sdt")
            return HopResult(d, "m", "length", "kin_sdt")
    if re.search(r"how\s+long|time\s+(?:taken|does|will)|"
                 r"takes?\s+to|time\s+to\s+cover", q, re.I):
        if s_ms and d_m is not None:
            t = d_m / s_ms
            if s_unit == "km/h":
                return HopResult(t / 3600.0, "h", "time", "kin_sdt")
            return HopResult(t, "s", "time", "kin_sdt")
    return None


def _linear_eq(clause: str, carried: Optional[HopResult]
               ) -> Optional[HopResult]:
    """'solve for x: ax + b = c' -- a carried value may fill a named
    coefficient ("using this speed as k, solve k*x + 2 = 18")."""
    q = clause
    if not re.search(r"solve|find\s+(?:the\s+)?(?:value\s+of\s+)?x\b|"
                     r"what\s+is\s+x\b", q, re.I):
        return None
    m = re.search(r"([-+\d\sxXa-z*/().^]{2,}?=\s*[-+\d\sxXa-z*/().^]+)",
                  q)
    if not m:
        return None
    parts = _eq_parts(m.group(1))
    if parts is None:
        return None
    lhs, rhs = parts
    try:
        import sympy as _sp
        body = (lhs + " - (" + rhs + ")")
        body = body.replace("^", "**").replace("X", "x")
        body = re.sub(r"(\d)\s*([a-zA-Z(])", r"\1*\2", body)
        body = re.sub(r"([a-zA-Z)])\s*(?=\d)", r"\1*", body)
        expr = _sp.expand(_sp.sympify(body))
        syms = {str(s): s for s in expr.free_symbols}
        if "x" not in syms:
            return None
        others = [s for k, s in syms.items() if k != "x"]
        if len(others) > 1:
            return None
        if others:
            car = _carried(carried, _ANY)
            if car is None:
                return None          # named coefficient unbound
            expr = expr.subs(others[0], car.value)
            assum = (f"coefficient {others[0]} = carried value "
                     f"{car.value:g}",)
        else:
            assum = ()
        sols = _sp.solve(_sp.Eq(expr, 0), syms["x"])
        roots = [float(s) for s in sols
                 if getattr(s, "is_real", None)]
        if len(roots) != 1:
            return None
        return HopResult(roots[0], "", "value", "math_linear", assum)
    except Exception:
        return None


def _quadratic_eq(clause: str, carried: Optional[HopResult]
                  ) -> Optional[HopResult]:
    """'x^2 + bx + c = 0' asks: roots, larger/smaller root, sum, product.
    A carried value may fill a named coefficient ('... + c = 0' where c
    is the height found)."""
    q = clause
    if not re.search(r"x\s*(?:\^2|\*\*2|\u00b2)", q, re.I):
        return None
    m = re.search(r"([-+\d\sxXa-z*/().^]{2,}?=\s*[-+\d\sxXa-z*/().^]+)",
                  q)
    if not m:
        return None
    parts = _eq_parts(m.group(1))
    if parts is None:
        return None
    lhs, rhs = parts
    try:
        import sympy as _sp
        body = (lhs + " - (" + rhs + ")")
        body = body.replace("^", "**").replace("X", "x")
        body = re.sub(r"\u00b2", "**2", body)
        body = re.sub(r"(\d)\s*([a-zA-Z(])", r"\1*\2", body)
        body = re.sub(r"([a-zA-Z)])\s*(?=\d)", r"\1*", body)
        expr = _sp.expand(_sp.sympify(body))
        syms = {str(s): s for s in expr.free_symbols}
        if "x" not in syms:
            return None
        others = [s for k, s in syms.items() if k != "x"]
        if len(others) > 1:
            return None
        assum = ()
        if others:
            car = _carried(carried, _ANY)
            if car is None:
                return None
            expr = expr.subs(others[0], car.value)
            assum = (f"coefficient {others[0]} = carried value "
                     f"{car.value:g}",)
        sols = _sp.solve(_sp.Eq(expr, 0), syms["x"])
        roots = sorted(float(s) for s in sols
                       if getattr(s, "is_real", None))
        if not roots:
            return None
        if re.search(r"larger|greater|bigger|maximum|max\b", q, re.I):
            return HopResult(roots[-1], "", "value", "math_quadratic",
                             assum)
        if re.search(r"smaller|lesser|minimum|min\b", q, re.I):
            return HopResult(roots[0], "", "value", "math_quadratic",
                             assum)
        if re.search(r"sum\s+of\s+(?:the\s+)?roots", q, re.I):
            return HopResult(sum(roots), "", "value", "math_quadratic",
                             assum)
        if re.search(r"product\s+of\s+(?:the\s+)?roots", q, re.I):
            return HopResult(math.prod(roots), "", "value",
                             "math_quadratic", assum)
        if len(roots) == 1:
            return HopResult(roots[0], "", "value", "math_quadratic",
                             assum)
        # 'find the roots' ships both; the typed value is the larger
        # (the displayed answer line carries both roots anyway)
        if re.search(r"root|solve|find\s+x", q, re.I):
            return HopResult(roots[-1], "", "value", "math_quadratic",
                             assum + (f"roots are {roots[0]:g} and "
                                      f"{roots[-1]:g}",))
        return None
    except Exception:
        return None


def _mole(clause: str, carried: Optional[HopResult]
          ) -> Optional[HopResult]:
    """n = W/M -- 'mass N g, molar mass M g/mol' or 'moles in N g of X
    (M = ...)'."""
    q = clause
    if not re.search(r"\bmoles?\b|amount\s+of\s+substance", q, re.I):
        return None
    mass = _f1(_N + r"\s*(?:g|grams?)\b(?!\s*/)", q)
    mm = _f1(r"(?:molar|atomic|molecular)\s+mass[^0-9]{0,20}" + _N, q)
    if mm is None:
        mm = _f1(_N + r"\s*(?:g\s*/\s*mol|g\s+mol\^?-?1?)\b", q)
    if mm is None:
        mm = _f1(r"[mM]\s*=\s*" + _N, q)
    if mass is None or not mm:
        return None
    return HopResult(mass / mm, "mol", "moles", "chem_mole")


def _molarity(clause: str, carried: Optional[HopResult]
              ) -> Optional[HopResult]:
    """Molarity C = n/V and dilution C1 V1 = C2 V2."""
    q = clause
    if not re.search(r"molarity|molar\s+concentration|concentration|"
                     r"dilut", q, re.I):
        return None
    def _vol_l(num: str, unit: str) -> float:
        u = unit.lower()
        return float(num.replace(",", "")) * (
            0.001 if (u == "ml" or u.startswith("milli")) else 1.0)

    # dilution: 'C M solution of V1 ... diluted to V2' -> C1 V1 = C2 V2
    if re.search(r"dilut", q, re.I):
        c1 = _f1(_N + r"\s*(?:M\b|mol\s*/\s*L)", q)
        car = _carried(carried, ("concentration",))
        if c1 is None and car is not None:
            c1 = car.value
        v2m = re.search(r"dilut\w*\s+[^0-9]{0,25}?(?:to|into|up\s+to)\s+"
                        + _N + r"\s*(millilitres?|milliliters?|ml|"
                        r"litres?|liters?|l)\b", q, re.I) or \
            re.search(r"(?:to|into)\s+" + _N +
                      r"\s*(millilitres?|milliliters?|ml|litres?|"
                      r"liters?|l)\b", q, re.I)
        v1m = re.search(_N + r"\s*(millilitres?|milliliters?|ml|"
                        r"litres?|liters?|l)\b[^.]{0,40}?\bdilut",
                        q, re.I)
        if c1 is None or v2m is None:
            return None
        v2 = _vol_l(v2m.group(1), v2m.group(2))
        v1 = _vol_l(v1m.group(1), v1m.group(2)) if v1m else 1.0
        assum = () if v1m else ("initial volume 1 L implicit",)
        if not v2:
            return None
        return HopResult(c1 * v1 / v2, "mol/L", "concentration",
                         "chem_molarity", assum)
    vm = re.search(_N + r"\s*(millilitres?|milliliters?|ml|litres?|"
                   r"liters?|l)\b", q, re.I)
    n = _f1(_N + r"\s*(?:mol|moles)\b(?!\s*/)", q)
    car = _carried(carried, ("moles",))
    if n is None and car is not None:
        n = car.value
    if vm and n is not None:
        v = _vol_l(vm.group(1), vm.group(2))
        if v:
            return HopResult(n / v, "mol/L", "concentration",
                             "chem_molarity")
    return None


def _ph(clause: str, carried: Optional[HopResult]
        ) -> Optional[HopResult]:
    """pH = -log10[H+] for strong-acid asks."""
    q = clause
    if not re.search(r"\bpH\b", q):
        return None
    conc = _f1(_N + r"\s*(?:M\b|mol\s*/\s*L|molar)", q)
    if conc is None:
        conc = _f1(_N + r"\s*x\s*10\s*\^?\s*-?\d+", q)
    if conc is None:
        em = re.search(_N + r"\s*(?:x\s*|×\s*)10\s*\^?\s*(-?\d+)", q, re.I)
        if em:
            conc = float(em.group(1)) * 10 ** int(em.group(2))
    car = _carried(carried, ("concentration",))
    if conc is None and car is not None:
        conc = car.value
    if conc is None or conc <= 0:
        return None
    return HopResult(-math.log10(conc), "", "ph", "chem_ph",
                     ("strong acid: [H+] fully dissociated",))


def _percent(clause: str, carried: Optional[HopResult]
             ) -> Optional[HopResult]:
    """'P% of N', 'increase/decrease N by P%', 'discounted by P%'."""
    q = clause
    pm = _f1(_N + r"\s*%", q)
    if pm is None:
        return None
    whole = _f1(r"\bof\s+(?:the\s+|his\s+|her\s+|its\s+|their\s+|"
                r"that\s+|this\s+|a\s+|an\s+)*" + _N, q)
    dim = "amount"
    if whole is None:
        car = _carried(carried, _ANY)
        if car is None:
            # bare 'P% of it/this/remaining' with no resolvable base
            if not re.search(r"rs\.?\s*" + _N + "|" + _N +
                             r"\s*(?:rupees?|rs\b|inr\b)", q, re.I):
                return None
            whole = _f1(r"(?:rs\.?\s*|rupees?\s*)" + _N, q) or \
                _f1(_N + r"\s*(?:rupees?|rs\b|inr\b)", q)
            if whole is None:
                return None
        else:
            whole = car.value
            dim = car.dimension if car.dimension not in ("percent",) \
                else "amount"
    part = whole * pm / 100.0
    dec = re.search(r"decreas|discount|fall|drop|reduc|depreciat|"
                    r"less|deduct|spend|spent|spent|lose|lost|\boff\b",
                    q, re.I)
    inc = re.search(r"increas|rise|gain|tax|hike|appreciat|added|"
                    r"earn", q, re.I)
    change_ask = re.search(
        r"find\s+(?:the\s+)?(?:increase|decrease|discount|reduction|"
        r"tax|change|amount\s+(?:of\s+)?(?:increase|decrease))\b",
        q, re.I)
    if change_ask:
        return HopResult(part, "", dim, "econ_percent",
                         note=("net -" if dec else "net +")
                         + f"{pm:g}%")
    if dec or inc or re.search(
            r"final|new\s+price|selling|remaining|left|net|"
            r"after\s+the|save[sd]?\b", q, re.I):
        val = whole - part if dec else (whole + part if inc else part)
        if re.search(r"save[sd]?\b|remain|left", q, re.I) and dec:
            val = whole - part
        return HopResult(val, "", dim, "econ_percent",
                         note=("net -" if dec else "net +")
                         + f"{pm:g}%")
    return HopResult(part, "", dim, "econ_percent")


def _fraction(clause: str, carried: Optional[HopResult]
              ) -> Optional[HopResult]:
    """'3/4 of N', 'half/quarter of the remaining'."""
    q = clause
    fm = re.search(r"(\d+)\s*/\s*(\d+)\s*of\s+(?:the\s+|his\s+|her\s+|"
                   r"its\s+|their\s+|a\s+|an\s+|remaining\s+|"
                   r"rest\s+)*" + _N + "?", q, re.I)
    frac = None
    if fm:
        num, den = float(fm.group(1)), float(fm.group(2))
        if den:
            frac = num / den
        whole_txt = fm.group(3)
        whole = float(whole_txt.replace(",", "")) if whole_txt else None
    elif re.search(r"\bhalf\s+of\b", q, re.I):
        frac = 0.5
        whole = _f1(r"half\s+of\s+(?:the\s+|remaining\s+|rest\s+)*" + _N,
                    q)
    elif re.search(r"\bquarter\s+of\b", q, re.I):
        frac = 0.25
        whole = _f1(r"quarter\s+of\s+(?:the\s+|remaining\s+|rest\s+)*"
                    + _N, q)
    else:
        return None
    if whole is None:
        car = _carried(carried, _ANY)
        if car is None:
            return None
        whole = car.value
    return HopResult(whole * frac, "", "amount", "math_fraction")


def _ratio_share(clause: str, carried: Optional[HopResult]
                 ) -> Optional[HopResult]:
    """'divide/share/distribute N in the ratio a:b' -> a named share."""
    q = clause
    rm = re.search(r"ratio\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*:\s*"
                   r"(\d+(?:\.\d+)?)(?:\s*:\s*(\d+(?:\.\d+)?))?", q, re.I)
    if not rm:
        return None
    parts = [float(x) for x in rm.groups() if x is not None]
    whole = _f1(r"(?:divide|share|split|distribut\w*|of)\s+"
                r"(?:rs\.?\s*|rupees?\s*|inr\s*)?" + _N, q)
    dim = "amount"
    if whole is None:
        car = _carried(carried, _ANY)
        if car is None:
            return None
        whole = car.value
        dim = car.dimension if car.dimension != "percent" else "amount"
    tot = sum(parts)
    if not tot:
        return None
    shares = [whole * p / tot for p in parts]
    if re.search(r"larger|greater|bigger|maximum|b\s+get|second", q, re.I):
        return HopResult(max(shares) if not re.search(
            r"first|a\s+get", q, re.I) else shares[-1], "",
            "share", "math_ratio")
    if re.search(r"smaller|lesser|minimum", q, re.I):
        return HopResult(min(shares), "", "share", "math_ratio")
    if re.search(r"first|a\s+get", q, re.I):
        return HopResult(shares[0], "", "share", "math_ratio")
    if len(shares) == 2 and re.search(r"each|shares?", q, re.I):
        return HopResult(shares[-1], "", "share", "math_ratio",
                         (f"shares are {shares[0]:g} and "
                          f"{shares[-1]:g}",))
    return None


def _work_power(clause: str, carried: Optional[HopResult]
                ) -> Optional[HopResult]:
    """W = F.d ; P = W/t."""
    q = clause
    f_n = _f1(r"force\s+(?:of\s+)?" + _N + r"\s*n\b|" + _N +
              r"\s*n(?:ewtons?)?\b[^/]{0,30}force", q)
    d_m = _f1(_N + r"\s*(?:m|metres?|meters?)\b(?!\s*/)", q)
    if re.search(r"\bwork\b", q, re.I) and f_n is not None \
            and d_m is not None and not re.search(r"power", q, re.I):
        return HopResult(f_n * d_m, "J", "work", "phys_work")
    if re.search(r"\bpower\b", q, re.I):
        w = _f1(_N + r"\s*j(?:oules?)?\b", q)
        car = _carried(carried, ("work",))
        if w is None and car is not None:
            w = car.value
        t_s = _f1(r"(?:in|over|for)\s+" + _N +
                  r"\s*(?:s|sec|seconds?|minutes?|mins?|hours?|h)\b", q)
        unit_t = re.search(r"(?:in|over|for)\s+" + _N +
                           r"\s*(minutes?|mins?|hours?|h)\b", q, re.I)
        if t_s and w is not None:
            t = t_s * (3600.0 if unit_t and unit_t.group(2).lower()
                       .startswith(("h",)) else
                       (60.0 if unit_t else 1.0))
            return HopResult(w / t, "W", "power", "phys_work")
    return None


def _projectile(clause: str, carried: Optional[HopResult]
                ) -> Optional[HopResult]:
    """Vertical throw: max height h = u^2/(2g), time-to-apex t = u/g."""
    q = clause
    if not re.search(r"thrown?\s+(?:vertically\s+)?up|projectile|"
                     r"tossed\s+up|launched\s+up", q, re.I):
        return None
    u = _f1(_N + r"\s*(?:m\s*/\s*s|metres?\s+per\s+second)", q)
    g = _f1(r"g\s*=\s*" + _N, q) or 9.8
    assum = () if _f1(r"g\s*=\s*" + _N, q) else ("g = 9.8 m/s^2 assumed",)
    if not u:
        return None
    if re.search(r"time\s+to\s+reach|time\s+taken\s+to\s+reach|"
                 r"reach\s+the\s+(?:top|highest)", q, re.I):
        return HopResult(u / g, "s", "time", "phys_projectile", assum)
    if re.search(r"maximum\s+height|how\s+high|highest\s+point|"
                 r"(?:find|what|calculate|compute)\b[^.]{0,25}"
                 r"\bheight\b", q, re.I):
        return HopResult(u * u / (2.0 * g), "m", "length",
                         "phys_projectile", assum)
    return None


def _interest(clause: str, carried: Optional[HopResult]
              ) -> Optional[HopResult]:
    """SI = P*r*t/100 or amount A = P + SI."""
    q = clause
    if not re.search(r"simple\s+interest|interest\b", q, re.I):
        return None
    p = _f1(r"(?:rs\.?\s*|rupees?\s*|inr\s*|₹\s*)" + _N, q) or \
        _f1(r"(?:principal|sum|deposit\w*|invest\w*|loan)\b[^0-9]{0,20}"
            + _N, q)
    car = _carried(carried, ("amount",))
    if p is None and car is not None:
        p = car.value
    r = _f1(_N + r"\s*%\s*(?:per\s+annum|p\.?a\.?|per\s+year)?", q)
    t = _f1(r"(?:for|in|over)\s+" + _N + r"\s*years?", q) or \
        _f1(_N + r"\s*years?", q)
    if p is None or r is None or t is None:
        return None
    si = p * r * t / 100.0
    if re.search(r"amount|total", q, re.I) and not re.search(
            r"interest\s*(?:=|is|find|only)?\s*\??\s*$|"
            r"find\s+(?:the\s+)?simple\s+interest", q, re.I):
        return HopResult(p + si, "Rs", "amount", "econ_interest",
                         ("simple interest assumed",))
    return HopResult(si, "Rs", "amount", "econ_interest")


def _trig_height(clause: str, carried: Optional[HopResult]
                 ) -> Optional[HopResult]:
    """tan-theta sight problems: 'angle of elevation 45 deg from a point
    D m away' -> height = D tan(theta); given height -> distance."""
    q = clause
    am = _f1(r"angle\s+of\s+elevation[^0-9]{0,30}" + _N, q) or \
        _f1(r"elevation\s+(?:is|of)\s+" + _N, q)
    if am is None or not (0 < am < 90):
        return None
    d = _f1(_N + r"\s*(?:m|metres?|meters?)\s*(?:away|from|distant)",
            q) or _f1(r"distance\s+(?:of\s+)?" + _N +
                      r"\s*(?:m|metres?|meters?)", q) or \
        _f1(r"(?:point|observed)\s+(?:is\s+)?(?:at\s+)?" + _N +
            r"\s*(?:m|metres?|meters?)", q)
    h = _f1(r"(?:height|tower|pole|tree|building)\s*(?:is|of)?\s*" + _N +
            r"\s*(?:m|metres?|meters?)?", q)
    car = _carried(carried, ("length",))
    if d is None and car is not None:
        d = car.value
    th = math.radians(am)
    if re.search(r"height|how\s+tall", q, re.I) and d is not None:
        return HopResult(d * math.tan(th), "m", "length", "optics_trig")
    if re.search(r"distance|how\s+far", q, re.I) and h is not None:
        return HopResult(h / math.tan(th), "m", "length", "optics_trig")
    return None


# ------------------------------------------------------------------ #
# the family table
# ------------------------------------------------------------------ #

@dataclass(frozen=True)
class HopFamily:
    family_id: str
    produces: Tuple[str, ...]          # dims it can emit
    consumes: Tuple[str, ...]          # carried dims it can take ("*")
    solve: Callable[[str, Optional[HopResult]], Optional[HopResult]]


# the ask the planner appends to a value-only setup clause
_PLANNER_ASK_RE = re.compile(r"\.\s*Find the (\w+)\.?\s*$")

# dim -> [(unit regex, (canonical unit label, value multiplier))]
_DIM_UNIT_PATTERNS = {
    "length": [(r"(?:kilometres?|kilometers?|km)\b", ("km", 1.0)),
               (r"(?:metres?|meters?|m)\b(?!\s*/)", ("m", 1.0)),
               (r"(?:centimetres?|cm)\b", ("cm", 1.0))],
    "speed": [(r"km\s*/\s*h|kmph|kilometres?\s+per\s+hour",
               ("km/h", 1.0)),
              (r"m\s*/\s*s|metres?\s+per\s+second", ("m/s", 1.0))],
    "time": [(r"(?:hours?|hrs?)\b", ("h", 1.0)),
             (r"(?:minutes?|mins?)\b", ("min", 1.0)),
             (r"(?:seconds?|secs?|s)\b", ("s", 1.0))],
    "volume": [(r"(?:millilitres?|milliliters?|ml)\b", ("mL", 1.0)),
               (r"(?:litres?|liters?|l)\b", ("L", 1.0))],
    "mass": [(r"(?:kilograms?|kg)\b", ("kg", 1.0)),
             (r"(?:grams?|g)\b(?!\s*/)", ("g", 1.0))],
    "amount": [(r"(?:rupees?|rs\.?|inr)\b", ("Rs", 1.0))],
    "moles": [(r"(?:moles?|mol)\b(?!\s*/)", ("mol", 1.0))],
    "concentration": [(r"(?:mol\s*/\s*l|m)\b", ("mol/L", 1.0))],
    "work": [(r"(?:joules?|j)\b", ("J", 1.0))],
    "power": [(r"(?:watts?|w)\b", ("W", 1.0))],
    "area": [(r"(?:sq\.?\s*m|m\s*(?:\^2|2)|square\s+metres?)\b",
              ("sq m", 1.0))],
}


def _stated_value(clause: str, carried: Optional[HopResult]
                  ) -> Optional[HopResult]:
    """LAST RESORT: 'holds a volume of 10 L' + appended 'Find the
    volume.' -- the clause merely DECLARES the quantity the next hop
    needs; the typed output is the stated number in the asked
    dimension.  Only fires on the planner's appended ask, never on
    arbitrary clauses."""
    q = clause or ""
    m = _PLANNER_ASK_RE.search(q)
    if not m:
        return None
    dim = NOUN_DIM.get(m.group(1).lower().rstrip("s"))
    if not dim:
        return None
    body = q[:m.start()]
    for unitpat, conv in _DIM_UNIT_PATTERNS.get(dim, []):
        mm = re.search(_N + r"\s*" + unitpat, body, re.I)
        if mm:
            return HopResult(
                float(mm.group(1).replace(",", "")) * conv[1],
                conv[0], dim, "stated_value")
    return None


HOP_FAMILIES: Tuple[HopFamily, ...] = (
    HopFamily("kin_sdt", ("speed", "length", "time"),
              ("speed", "length", "time"), _kinematics),
    HopFamily("phys_work", ("work", "power"), ("work",), _work_power),
    HopFamily("phys_projectile", ("length", "time"), (), _projectile),
    HopFamily("chem_mole", ("moles",), (), _mole),
    HopFamily("chem_molarity", ("concentration",),
              ("moles", "concentration", "volume"), _molarity),
    HopFamily("chem_ph", ("ph",), ("concentration",), _ph),
    HopFamily("econ_interest", ("amount",), ("amount",), _interest),
    HopFamily("econ_percent", ("amount",), (_ANY,), _percent),
    HopFamily("math_fraction", ("amount",), (_ANY,), _fraction),
    HopFamily("math_ratio", ("share",), (_ANY,), _ratio_share),
    HopFamily("optics_trig", ("length",), ("length",), _trig_height),
    HopFamily("math_quadratic", ("value",), (_ANY,), _quadratic_eq),
    HopFamily("math_linear", ("value",), (_ANY,), _linear_eq),
    # last resort: the clause merely states the quantity the next hop
    # needs ("a volume of 10 L" + appended "Find the volume.")
    HopFamily("stated_value", tuple(_DIM_UNIT_PATTERNS), (),
              _stated_value),
)


def dispatch_hop(clause: str, carried: Optional[HopResult] = None
                 ) -> Optional[HopResult]:
    """First typed family that owns this clause; None -> the planner
    falls back to the ordinary core solver for the clause."""
    for fam in HOP_FAMILIES:
        try:
            hr = fam.solve(clause, carried)
        except Exception:
            hr = None
        if hr is not None:
            return hr
    return None


__all__ = ["HopResult", "HopFamily", "HOP_FAMILIES", "NOUN_DIM",
           "dim_of_unit", "dispatch_hop"]
