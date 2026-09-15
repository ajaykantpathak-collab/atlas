"""syllabus_families.py -- typed formula-table for classes 9-12 STEM.

One table, one dispatcher (bet 1 in first concrete form): every row is
a syllabus computation type -- trigger regex with named slots, compute
function, human steps, assumptions.  Registered as ONE modeling
structure; battery-tested per class.

Coverage:
  class 9   distance formula, midpoint, Heron's area, mean of a list,
            cone/sphere/cylinder volume+surface
  class 10  AP nth term + sum, standard-angle trig evaluation,
            sector area, angle-of-elevation heights
  class 11  combinations, permutations, infinite GP sum
  class 12  vector magnitude/dot product, 2x2 determinant
  physics   Ohm's law, F = ma, work, PE/KE, density, wave speed,
            heat, electrical power
  chemistry moles from mass, molarity
"""

from __future__ import annotations

import math
import re
from typing import Any, Dict, List, Optional

from backend.its.solver.modeling_layer import ModelResult

_PI = math.pi


def _no(structure: str, note: str) -> ModelResult:
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


def _num(s: str) -> float:
    return float(str(s).replace(",", ""))


def _deg(rad: float) -> float:
    return math.degrees(rad)


def _rad(deg: float) -> float:
    return math.radians(deg)


_PT = (r"\(\s*(?P<{px}>-?\d+(?:\.\d+)?)\s*,\s*(?P<{py}>-?\d+(?:\.\d+)?)"
       r"\s*\)")


def _pt(prefix: str) -> str:
    return _PT.replace("{px}", prefix + "x").replace("{py}", prefix + "y")


# trig: standard-angle value table (exact where clean)
_TRIG = {
    ("sin", 0): 0.0, ("sin", 30): 0.5, ("sin", 45): math.sqrt(2) / 2,
    ("sin", 60): math.sqrt(3) / 2, ("sin", 90): 1.0,
    ("cos", 0): 1.0, ("cos", 30): math.sqrt(3) / 2, ("cos", 45):
    math.sqrt(2) / 2, ("cos", 60): 0.5, ("cos", 90): 0.0,
    ("tan", 0): 0.0, ("tan", 30): 1 / math.sqrt(3), ("tan", 45): 1.0,
    ("tan", 60): math.sqrt(3), ("tan", 90): None,
}

_TRIG_TOKEN = re.compile(r"\b(sin|cos|tan)\s*\(?\s*"
                         r"(\d+(?:\.\d+)?)\s*\)?", re.I)


def _eval_trig_expression(expr: str) -> Optional[float]:
    """Replace standard-angle trig tokens with values, eval arithmetic."""
    def sub(m):
        fn = m.group(1).lower()
        ang = int(float(m.group(2)))
        v = _TRIG.get((fn, ang))
        if v is None:
            raise ValueError(f"{fn}{ang} not in standard table")
        return f"({v!r})"

    cleaned = _TRIG_TOKEN.sub(sub, expr)
    cleaned = re.sub(r"[^0-9+\-*/(). ]", " ", cleaned)
    if not re.search(r"\d", cleaned):
        return None
    try:
        val = eval(cleaned, {"__builtins__": {}}, {})
    except Exception:
        return None
    return float(val) if isinstance(val, (int, float)) else None


# --------------------------------------------------------------------------- #
# Row compute functions: (g: named groups, m: match, text) ->
#   (value | None, steps, answer_override | None, assumptions | None)
# --------------------------------------------------------------------------- #


def _c_distance(g, m, text):
    dx = _num(g["bx"]) - _num(g["ax"])
    dy = _num(g["by"]) - _num(g["ay"])
    v = math.sqrt(dx * dx + dy * dy)
    return v, [f"d = sqrt(({_num(g['bx']):g}-{_num(g['ax']):g})^2 + "
               f"({_num(g['by']):g}-{_num(g['ay']):g})^2) = {v:.6g}"], \
        None, None


def _c_midpoint(g, m, text):
    mx = (_num(g["ax"]) + _num(g["bx"])) / 2
    my = (_num(g["ay"]) + _num(g["by"])) / 2
    return None, [f"midpoint = (({_num(g['ax']):g}+{_num(g['bx']):g})/2, "
                  f"({_num(g['ay']):g}+{_num(g['by']):g})/2) = "
                  f"({mx:g}, {my:g})"], f"({mx:g}, {my:g})", None


def _c_heron(g, m, text):
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


def _c_mean(g, m, text):
    nums = [float(x.replace(",", "")) for x in
            re.findall(r"\d+(?:\.\d+)?", g["list"])]
    if not nums:
        return None, [], None, None
    mean = sum(nums) / len(nums)
    return mean, [f"sum = {sum(nums):g}, n = {len(nums)}, "
                  f"mean = {mean:.6g}"], None, None


def _c_ap_nth(g, m, text):
    n = _num(m.group(1))
    a, d = _num(m.group(2)), _num(m.group(3))
    val = a + (n - 1) * d
    return val, [f"a + (n-1)d = {a:g} + ({n:g}-1) x {d:g} = {val:.6g}"], \
        None, None


def _c_ap_sum(g, m, text):
    n, a, d = _num(m.group(1)), _num(m.group(2)), _num(m.group(3))
    val = n / 2 * (2 * a + (n - 1) * d)
    return val, [f"S = n/2 (2a + (n-1)d) = {n:g}/2 x ({2 * a:g} + "
                 f"{(n - 1) * d:g}) = {val:.6g}"], None, None


def _c_trig(g, m, text):
    expr = g["expr"]
    val = _eval_trig_expression(expr)
    if val is None:
        return None, [], None, None
    return val, [f"{expr.strip()} = {val:.6g}"], None, None


def _c_sector(g, m, text):
    r, ang = _num(m.group(1)), _num(m.group(2))
    val = ang / 360 * _PI * r * r
    return val, [f"A = ({ang:g}/360) x pi x {r:g}^2 = {val:.4g} "
                 f"(pi = 3.14159)"], None, ["pi taken as 3.14159"]


def _c_elevation(g, m, text):
    dist, ang = _num(m.group(2)), _num(m.group(1))
    if ang <= 0 or ang >= 90:
        return None, [], None, None
    h = dist * math.tan(_rad(ang))
    return h, [f"tan({ang:g}) = h/{dist:g} -> h = {dist:g} x "
               f"tan({ang:g}) = {h:.4g} m"], None, None


def _c_combinations(g, m, text):
    r, n = int(m.group(1)), int(m.group(2))
    if r > n:
        return None, [], None, None
    val = math.comb(n, r)
    return float(val), [f"C({n}, {r}) = {val}"], None, None


def _c_permutations(g, m, text):
    r, n = int(m.group(1)), int(m.group(2))
    if r > n:
        return None, [], None, None
    val = math.perm(n, r)
    return float(val), [f"P({n}, {r}) = {val}"], None, None


def _c_gp_infinite(g, m, text):
    raw_r = m.group(2)
    r = (float(raw_r.split('/')[0]) / float(raw_r.split('/')[1])
         if '/' in raw_r else float(raw_r))
    a = _num(m.group(1))
    if abs(r) >= 1:
        return None, [], None, None
    val = a / (1 - r)
    return val, [f"S = a/(1-r) = {a:g}/{1 - r:g} = {val:.6g}"], None, None


def _c_vector_magnitude(g, m, text):
    comps = [abs(float(x)) for x in (m.group("i"), m.group("j"),
                                     m.group("k") or 0)]
    val = math.sqrt(sum(c * c for c in comps[:2] + [comps[2]]))
    return val, [f"|v| = sqrt({comps[0]:g}^2 + {comps[1]:g}^2"
                 + (f" + {comps[2]:g}^2" if m.group("k") else "")
                 + f") = {val:.6g}"], None, None


def _c_dot_product(g, m, text):
    a = [float(m.group("ai")), float(m.group("aj")),
         float(m.group("ak") or 0)]
    b = [float(m.group("bi")), float(m.group("bj")),
         float(m.group("bk") or 0)]
    val = sum(x * y for x, y in zip(a, b))
    return val, [f"dot = {a[0]:g}x{b[0]:g} + {a[1]:g}x{b[1]:g} + "
                 f"{a[2]:g}x{b[2]:g} = {val:.6g}"], None, None


def _c_determinant_2x2(g, m, text):
    val = (_num(m.group("a")) * _num(m.group("d"))
           - _num(m.group("b")) * _num(m.group("c")))
    return val, [f"det = ({_num(m.group('a')):g})({_num(m.group('d')):g}) "
                 f"- ({_num(m.group('b')):g})({_num(m.group('c')):g}) = "
                 f"{val:.6g}"], None, None


# ---- physics ----

def _c_ohm_current(g, m, text):
    r_ohm = _num(m.group("r"))
    volts = _num(m.group("v"))
    if m.group("rk") and "kilo" in (m.group("rk") or "").lower():
        r_ohm *= 1000
    if r_ohm <= 0:
        return None, [], None, None
    i = volts / r_ohm
    return i, [f"I = V/R = {volts:g}/{r_ohm:g} = {i:.6g} A"], None, None


def _c_ohm_resistance(g, m, text):
    volts, amps = _num(m.group("v")), _num(m.group("i"))
    if amps == 0:
        return None, [], None, None
    r = volts / amps
    return r, [f"R = V/I = {volts:g}/{amps:g} = {r:.6g} ohm"], None, None


def _c_newton(g, m, text):
    f = _num(m.group(1)) * _num(m.group(2))
    return f, [f"F = m x a = {_num(m.group(1)):g} x "
               f"{_num(m.group(2)):g} = {f:.6g} N"], None, None


def _c_work(g, m, text):
    w = _num(m.group(1)) * _num(m.group(2))
    return w, [f"W = F x d = {_num(m.group(1)):g} x "
               f"{_num(m.group(2)):g} = {w:.6g} J"], None, None


def _c_pe(g, m, text):
    gm = 9.8
    pe = _num(m.group(1)) * gm * _num(m.group(2))
    return (pe, [f"PE = m g h = {_num(m.group(1)):g} x 9.8 x "
                 f"{_num(m.group(2)):g} = {pe:.4g} J"],
            None, ["g taken as 9.8 m/s^2"])


def _c_ke(g, m, text):
    ke = 0.5 * _num(m.group(1)) * _num(m.group(2)) ** 2
    return ke, [f"KE = 1/2 m v^2 = 1/2 x {_num(m.group(1)):g} x "
                f"{_num(m.group(2)):g}^2 = {ke:.6g} J"], None, None


def _c_density(g, m, text):
    mass = _num(g["m"])
    vol = _num(g["v"])
    if vol == 0:
        return None, [], None, None
    d = mass / vol
    unit = "kg/m3" if (g.get("mu") or "").lower() == "kg" else "g/cm3"
    return d, [f"density = {mass:g}/{vol:g} = {d:.6g} {unit}"], \
        None, None


def _c_wave(g, m, text):
    f_hz, wl = _num(m.group(1)), _num(m.group(2))
    if m.group(2).lower() and "cm" in (m.group(2) or "").lower():
        wl /= 100.0
    v = f_hz * wl
    return v, [f"v = f x lambda = {f_hz:g} x {wl:g} = {v:.6g} m/s"], \
        None, None


def _c_heat(g, m, text):
    mass = _num(g["m"])
    dt = _num(g["dt"])
    c = _num(g["c"])
    if (g.get("mu") or "").lower() == "g":
        mass /= 1000.0
        q = mass * c * dt
        return q, [f"Q = {mass:g} kg x {c:g} x {dt:g} = {q:.6g} J"], \
            None, None
    q = mass * c * dt
    return q, [f"Q = m c dT = {mass:g} x {c:g} x {dt:g} = {q:.6g} J"], \
        None, None


def _c_power(g, m, text):
    amps = _num(g["i"])
    volts = _num(g["v"])
    p = volts * amps
    return p, [f"P = V x I = {volts:g} x {amps:g} = {p:.6g} W"], None, None


def _c_moles(g, m, text):
    mass, mm = _num(m.group(1)), _num(m.group(2))
    if mm == 0:
        return None, [], None, None
    n = mass / mm
    return n, [f"n = mass/M = {mass:g}/{mm:g} = {n:.6g} mol"], None, None


def _c_molarity(g, m, text):
    n = _num(m.group(1))
    vol = _num(m.group(2))
    unit = (m.group(3) or "").lower()
    if unit.startswith("m"):
        vol /= 1000.0
    if vol == 0:
        return None, [], None, None
    M = n / vol
    return M, [f"M = n/V = {n:g}/{vol:g} L = {M:.6g} mol/L"], None, None


def _c_elevation_smart(text: str):
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


# --------------------------------------------------------------------------- #
# The table: (id, regex, compute)
# --------------------------------------------------------------------------- #

_NUM = r"\d+(?:\.\d+)?"

TABLE = [
    # ---- class 9 maths ----
    ("distance_formula",
     r"distance\s+between\s+(?:the\s+)?(?:points?\s+)?"
     + _pt("a") + r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt("b"),
     _c_distance),
    ("midpoint",
     r"mid\s?-?point\s+of\s+(?:the\s+)?(?:line\s+|segment\s+|line\s+segment\s+)?(?:join(?:ing|s)\s+)?"
     r"(?:the\s+)?(?:points?\s+)?" + _pt("a") + r"\s+and\s+(?:the\s+)?"
     r"(?:points?\s+)?" + _pt("b"),
     _c_midpoint),
    ("heron_area",
     r"triangle\s+(?:with\s+|has\s+)?(?:sides?\s+(?:of\s+)?(?:measuring\s+)?"
     r")?" + r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*,?\s*" +
     r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*(?:and|,)\s*" +
     r"(\d+(?:\.\d+)?)\s*(?:cm|m)?[^.]{0,30}?.{0,40}area",
     _c_heron),
    ("mean_list",
     r"(?:mean|average)\s+of\s+(?P<list>[\d.,\s]+)",
     _c_mean),
    ("cone_volume",
     r"volume\s+of\s+a?\s*(?:cone|conical)[^.]*?radius\s+"
     r"(?P<r>\d+(?:\.\d+)?)[^.]*?height\s+(?:of\s+)?(?P<h>\d+(?:\.\d+)?)",
     lambda g, m, t: ((round(_PI / 3 * _num(g["r"]) ** 2
                             * _num(g["h"]), 4)),
                      [f"V = 1/3 pi r^2 h = {_PI / 3 * _num(g['r']) ** 2 * _num(g['h']):.4g} "
                       f"(pi = 3.14159)"],
                      None, ["pi taken as 3.14159"])),
    ("sphere_volume",
     r"volume\s+of\s+a?\s*sphere\s+(?:of\s+|with\s+)?radius\s+"
     r"(?P<r>\d+(?:\.\d+)?)",
     lambda g, m, t: ((round(4 / 3 * _PI * _num(g["r"]) ** 3, 4)),
                      [f"V = 4/3 pi r^3 = "
                       f"{4 / 3 * _PI * _num(g['r']) ** 3:.4g} "
                       f"(pi = 3.14159)"],
                      None, ["pi taken as 3.14159"])),
    ("sphere_area",
     r"surface\s+area\s+of\s+a?\s*sphere\s+(?:of\s+|with\s+)?radius\s+"
     r"(?P<r>\d+(?:\.\d+)?)",
     lambda g, m, t: ((round(4 * _PI * _num(g["r"]) ** 2, 4)),
                      [f"A = 4 pi r^2 = "
                       f"{4 * _PI * _num(g['r']) ** 2:.4g} "
                       f"(pi = 3.14159)"],
                      None, ["pi taken as 3.14159"])),
    ("cylinder_volume",
     r"volume\s+of\s+a?\s*(?:cylinder|cylindrical)[^.]*?radius\s+"
     r"(?P<r>\d+(?:\.\d+)?)[^.]*?height\s+(?:of\s+)?(?P<h>\d+(?:\.\d+)?)",
     lambda g, m, t: ((round(_PI * _num(g["r"]) ** 2 * _num(g["h"]), 4)),
                      [f"V = pi r^2 h = "
                       f"{_PI * _num(g['r']) ** 2 * _num(g['h']):.4g} "
                       f"(pi = 3.14159)"],
                      None, ["pi taken as 3.14159"])),

    # ---- class 10 maths ----
    ("ap_nth",
     r"(?P<n>\d+(?:\.\d+)?)\s*(?:th|st|nd|rd)?\s*term\s+of\s+(?:the\s+)?"
     r"(?:AP|arithmetic\s+progression)\s*(?:with|whose)?\s*"
     r"(?:first\s+term(?:\s+is)?\s*)?(?P<a>\d+(?:\.\d+)?)\s*(?:and|,)?\s*"
     r"(?:the\s+)?common\s+difference\s+(?:is\s+)?(?P<d>-?\d+(?:\.\d+)?)",
     _c_ap_nth),
    ("ap_sum",
     r"sum\s+of\s+the\s+first\s+(?P<n>\d+)\s+terms\s+of\s+(?:the\s+)?"
     r"(?:AP|arithmetic\s+progression)\s*(?:with|whose)?\s*"
     r"(?:first\s+term(?:\s+is)?\s*)?(?P<a>\d+(?:\.\d+)?)\s*(?:and|,)?\s*"
     r"(?:the\s+)?common\s+difference\s+(?:is\s+)?(?P<d>-?\d+(?:\.\d+)?)",
     _c_ap_sum),
    ("trig_eval",
     r"(?:evaluate|find|compute|value\s+of)\s+"
     r"(?P<expr>[^.]*?(?:sin|cos|tan)\s*\^?\s*\d*[^.]*?)\.?\s*$|"
     r"(?P<expr2>[^.]*?(?:sin|cos|tan)\s*\d+[^.]*?)\?",
     _c_trig),
    ("sector_area",
     r"area\s+of\s+(?:an?\s+|the\s+)?sector\s+(?:of\s+)?(?:a\s+)?circle\s+"
     r"(?:of\s+|with\s+)?radius\s+(?P<r>\d+(?:\.\d+)?)\s*(?:cm|m)?"
     r"[^.]{0,40}(?:angle|of)\s+(?:of\s+)?(?P<ang>\d+(?:\.\d+)?)\s*"
     r"degrees?",
     _c_sector),
    ("elevation_height",
     r"angle\s+of\s+elevation",
     lambda g, m, t: _c_elevation_smart(t)),

    # ---- class 11 maths ----
    ("combinations",
     r"(?:how\s+many\s+ways\s+(?:are\s+there\s+|can\s+(?:one|we|you)\s+"
     r")?|in\s+how\s+many\s+ways\s+(?:can\s+(?:one|we|you)\s+)?)"
     r"(?:to\s+)?(?:choose|select)\s+(?P<r>\d+)\s+(?:items?\s+)?from\s+"
     r"(?P<n>\d+)",
     _c_combinations),
    ("permutations",
     r"how\s+many\s+(?:ways|arrangements)\s+(?:are\s+there\s+)?to\s+"
     r"arrange\s+(?P<r>\d+)\s+(?:items?\s+)?(?:out\s+of\s+|from\s+)?"
     r"(?P<n>\d+)",
     _c_permutations),
    ("gp_infinite_sum",
     r"sum\s+of\s+(?:the\s+)?infinite\s+(?:GP|geometric\s+progression)"
     r"[^.]*?first\s+term\s+(?:is\s+)?(?P<a>\d+(?:\.\d+)?)"
     r"[^.]*?(?:common\s+)?ratio\s+(?:is\s+)?(?P<r>-?\d+(?:/\d+)?|-?\d+(?:\.\d+)?)",
     _c_gp_infinite),

    # ---- class 12 maths ----
    ("vector_magnitude",
     r"magnitu?de\s+of\s+(?:the\s+)?(?:vector\s+)?"
     r"(?P<i>-?\d+(?:\.\d+)?)\s*[ij]\s*\+\s*(?P<j>-?\d+(?:\.\d+)?)\s*j"
     r"(?:\s*\+\s*(?P<k>-?\d+(?:\.\d+)?)\s*k)?",
     _c_vector_magnitude),
    ("dot_product",
     r"dot\s+product\s+of\s+(?:the\s+)?(?:vectors?\s+)?"
     r"(?P<ai>-?\d+(?:\.\d+)?)\s*i\s*\+\s*(?P<aj>-?\d+(?:\.\d+)?)\s*j"
     r"(?:\s*\+\s*(?P<ak>-?\d+(?:\.\d+)?)\s*k)?\s+and\s+"
     r"(?P<bi>-?\d+(?:\.\d+)?)\s*i\s*\+\s*(?P<bj>-?\d+(?:\.\d+)?)\s*j"
     r"(?:\s*\+\s*(?P<bk>-?\d+(?:\.\d+)?)\s*k)?",
     _c_dot_product),
    ("determinant_2x2",
     r"determinant\s+of\s+(?:the\s+)?matrix\s*"
     r"\[\s*\[?(?P<a>-?\d+(?:\.\d+)?)\s*,\s*(?P<b>-?\d+(?:\.\d+)?)\s*\]"
     r"\s*,\s*\[?(?P<c>-?\d+(?:\.\d+)?)\s*,\s*(?P<d>-?\d+(?:\.\d+)?)\s*\]?"
     r"\s*\]?",
     _c_determinant_2x2),

    # ---- physics ----
    ("ohm_current",
     r"current\s+(?:through|flowing\s+through)\s+an?\s+"
     r"(?P<rk>kilo-?)?(?P<r>\d+(?:\.\d+)?)\s*ohm\s+resistor\s+"
     r"(?:when\s+)?(?:connected\s+(?:to|across)\s+|applied\s+)?"
     r"(?:a\s+)?(?:potential\s+difference\s+of\s+)?(?P<v>\d+(?:\.\d+)?)"
     r"\s*volts?",
     _c_ohm_current),
    ("ohm_resistance",
     r"resistance\s+[^.]*?(?P<v>\d+(?:\.\d+)?)\s*volts?[^.]*?"
     r"(?P<i>\d+(?:\.\d+)?)\s*(?P<iunit>milli)?amperes?",
     lambda g, m, t: _c_ohm_resistance(
         {"v": g["v"],
          "i": _num(g["i"]) / (1000.0 if g["iunit"] else 1.0)}, m, t)),
    ("newton_second",
     r"force\s+(?:required\s+)?to\s+accelerat\w+\s+an?\s+"
     r"(?P<m>\d+(?:\.\d+)?)\s*(?:kg|kilogram)s?\s+(?:mass\s+)?"
     r"(?:of\s+)?at\s+(?P<a>\d+(?:\.\d+)?)\s*m\s*(?:/|per)?\s*s\s*\^?\s*2",
     _c_newton),
    ("work_force_distance",
     r"work\s+done\s+by\s+(?:a\s+)?force\s+of\s+(?P<f>\d+(?:\.\d+)?)\s*"
     r"(?:N|newtons?)\s+(?:in\s+moving\s+(?:a\s+)?(?:body\s+|object\s+)?"
     r"(?:through|over|along)?\s*(?:a\s+)?distance\s+of\s+)?"
     r"(?:through|over|of)?\s*(?P<d>\d+(?:\.\d+)?)\s*(?:m|metres?|"
     r"meters?)",
     _c_work),
    ("potential_energy",
     r"potential\s+energy\s+of\s+an?\s+(?P<m>\d+(?:\.\d+)?)\s*"
     r"(?:kg|kilogram)s?\s+(?:mass\s+)?(?:kept\s+|placed\s+)?"
     r"(?:at|to)\s+a?\s*(?:height\s+of\s+)?(?P<h>\d+(?:\.\d+)?)\s*"
     r"(?:m|metres?|meters?)",
     lambda g, m, t: _c_pe({"m": g["m"], "h": g["h"]}, m, t)),
    ("kinetic_energy",
     r"kinetic\s+energy\s+of\s+an?\s+(?P<m>\d+(?:\.\d+)?)\s*"
     r"(?:kg|kilogram)s?\s+(?:mass\s+)?(?:moving\s+)?(?:at\s+|with\s+"
     r"(?:a\s+)?(?:speed|velocity)\s+of\s+)?(?P<v>\d+(?:\.\d+)?)\s*"
     r"m\s*/?\s*s\b",
     lambda g, m, t: _c_ke({"m": g["m"], "v": g["v"]}, m, t)),
    ("density",
     r"density\s+of\s+an?\s+(?:object|substance|body)\s+of\s+mass\s+"
     r"(?P<m>\d+(?:\.\d+)?)\s*(?P<mu>kg|g)\b[^.]*?volume\s+(?:of\s+)?"
     r"(?P<v>\d+(?:\.\d+)?)\s*(?P<vu>m3|cm3|m\^3|cm\^3)",
     lambda g, m, t: _c_density({"m": g["m"], "v": g["v"]}, m, t)),
    ("wave_speed",
     r"wave\s+(?:speed|velocity)\s+(?:of\s+)?(?:a\s+)?(?:wave\s+)?"
     r"(?:with\s+|of\s+)?frequency\s+(?P<f>\d+(?:\.\d+)?)\s*"
     r"(?:Hz|hertz)\b[^.]*?wavelength\s+(?:of\s+)?(?P<wl>\d+(?:\.\d+)?)"
     r"\s*(?P<wlu>m|cm|metres?)",
     lambda g, m, t: _c_wave(
         {"f": g["f"], "wl": g["wl"],
          "2": g["wlu"]}, m, t)),
    ("heat_energy",
     r"heat\s+(?:required|needed)\s+to\s+(?:raise\s+)?(?:the\s+)?"
     r"temperature\s+of\s+(?P<m>\d+(?:\.\d+)?)\s*(?P<mu>kg|g)\b[^.]*?"
     r"(?:by|through|to\s+raise\s+it\s+by)\s+(?P<dt>\d+(?:\.\d+)?)\s*"
     r"(?:K|degrees?|C)\b[^.]*?specific\s+heat\s+(?:capacity\s+)?"
     r"(?:of\s+)?(?P<c>\d+(?:\.\d+)?)",
     lambda g, m, t: _c_heat({"m": g["m"], "dt": g["dt"],
                              "c": g["c"], "1": g["mu"]}, m, t)),
    ("electrical_power",
     r"power\s+(?:of\s+|consumed\s+by\s+|dissipated\s+by\s+)?(?:a\s+)?"
     r"(?:device\s+)?(?:drawing\s+(?:a\s+)?)?current\s+of\s+"
     r"(?P<iu>milli)?(?P<i>\d+(?:\.\d+)?)\s*(?:milli)?amperes?\s+"
     r"(?:at|through)\s+(?:a\s+)?(?:potential\s+difference\s+of\s+)?"
     r"(?P<v>\d+(?:\.\d+)?)\s*volts?",
     lambda g, m, t: _c_power(
         {"i": _num(g["i"]) / (1000.0 if g["iu"] else 1.0),
          "v": g["v"]}, m, t)),

    # ---- chemistry ----
    ("moles_from_mass",
     r"moles?\s+(?:in|of)\s+(?P<m>\d+(?:\.\d+)?)\s*(?:g|grams?)\s+"
     r"(?:of\s+)?[a-z ]{0,40}?molar\s+mass\s+(?:of\s+)?(?P<mm>\d+"
     r"(?:\.\d+)?)",
     lambda g, m, t: _c_moles({"m": g["m"], "mm": g["mm"]}, m, t)),
    ("molarity",
     r"molarity\s+of\s+(?P<n>\d+(?:\.\d+)?)\s*(?:moles?|mol)\s+"
     r"(?:of\s+)?[a-z ]{0,30}?(?:in|dissolved\s+in)\s+"
     r"(?P<v>\d+(?:\.\d+)?)\s*(?P<vu>litres?|liters?|L|ml|"
     r"millilit?res?)",
     lambda g, m, t: _c_molarity({"n": g["n"], "v": g["v"],
                                  "3": g["vu"]}, m, t)),
]



def model_syllabus(text: str) -> ModelResult:
    """Single dispatcher: scan the typed table, first grounded hit wins."""
    for fid, pattern, compute in TABLE:
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
        return _yes(fid, {k: v for k, v in g.items()}, value, steps,
                    assumptions, answer=answer)
    return _no("SYLLABUS", "no syllabus formula matched")
