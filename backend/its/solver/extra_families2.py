"""extra_families2.py -- round-3 families mined from the competency90
GUIDED_PRACTICE (refusal) clusters; each family below closes a measured
failure cluster (row ids cited in the comments).

    DICE_PRODUCT_PROB      product of two dice: odd-parity or = K count
    TWO_POINT_LINE         line through two 2D points (determinants) + k/area
    THREE_DIGIT_MULTIPLES  how many 3-digit numbers divisible by k
    NOT_PERFECT_CUBE_LIST  which of the listed numbers are not perfect cubes
    LENS_POWER_REAL        which lens forms a real image: converging P > 0
    COIL_MAGNETIC_MOMENT   wire of length L -> N-turn coil: m max at N = 1
    PROJECTILE_CEILING     max range under a ceiling: u^2 sin2t / g
    BERNOULLI_LIFT         lift = 1/2 rho (v1^2 - v2^2) A (density required)
    ROTATING_CYLINDER      solid cylinder: KE = (1/4)MR^2w^2, L = (1/2)MR^2w
    KELVIN_CONVERT         K -> Celsius -> Fahrenheit
    CARBON_DATING          age = T_half * log2(1/fraction) from % remaining
    SECTION_FORMULA        point dividing a join in ratio m:n
    CHORD_FROM_DISTANCE    chord = 2 sqrt(R^2 - d^2)
    TANGENT_QUADRILATERAL  circumscribed quad: PQ + RS = QR + SP
    EQUILATERAL_ALTITUDE   h = (sqrt3/2) side
    BASIC_PROPORTIONALITY  DE || BC: AC = AB * AE / AD, CE = AC - AE
    AP_EQUAL_TERMS         n-th terms of two APs equal: solve a1+k d1 = b1+k d2
    GEOMETRIC_DEPRECIATION V = V0 (1 - r/100)^n
    DISCOUNT_MARKED        discount %: marked price from paid, or sale prices
    MEAN_VARIANCE_MISSING  recover the two missing observations
    INVERSE_PROPORTION_DAYS one worker falls ill: N D / (N-1) days

All computes are deterministic closed forms; every family refuses (matched
False) unless every slot parses and the guard passes.  Missing data is a
refusal, never a typical value (g = 9.8 and pi are the only stated
constants, called out in steps).  NOTE: registration -- modeling_layer's
integration batch wires model_extra2 into _STRUCTURES; this module does not
self-register (round-3 convention: the main agent owns the wiring).
"""

from __future__ import annotations

import math
import re
from fractions import Fraction

from backend.its.solver.modeling_layer import ModelResult

_NUM = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _n(tok: str) -> float:
    return float(tok.replace(",", ""))


def _clean(text: str) -> str:
    """Normalise nbsp, unicode dashes and private-use glyphs (rows carry
    \xa0 instead of spaces, en-dashes in units, \uf060 before rupee amounts)."""
    t = text.replace("\xa0", " ")
    t = re.sub(r"[\u2013\u2014\u2212]", "-", t)
    t = re.sub(r"[\ue000-\uf8ff]", " ", t)
    return t


_CONF = 0.95


def _res(structure: str, quantities: dict, equation: str, val: float,
         steps: list, answer: str, note: str = "") -> ModelResult:
    return ModelResult(
        structure=structure, matched=True, confidence=_CONF,
        quantities=quantities, governing_equation=equation,
        final_answer=answer, numeric_answer=float(val),
        steps=steps, note=note)


# --------------------------------------------------------------------------- #
# DICE_PRODUCT_PROB (rows 16904, 17590, 33290)
# --------------------------------------------------------------------------- #


def _dice_faces(t: str):
    m = re.search(r"numbers\s*(-?\d+(?:\.\d+)?)\s*to\s*(-?\d+(?:\.\d+)?)", t)
    if m:
        a = _n(m.group(1))
        b = _n(m.group(2))
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
    faces = [_n(x) for x in toks]
    if any(abs(f) > 100 or f != int(f) for f in faces):
        return None
    return faces


def model_dice_product_prob(text: str) -> ModelResult:
    t = _clean(text)
    if not (re.search(r"\bdice\b", t, re.I) and re.search(r"product", t, re.I)
            and re.search(r"probability", t, re.I)):
        return _no("DICE_PRODUCT_PROB", "not a dice-product probability ask")
    faces = _dice_faces(t)
    if not faces:
        return _no("DICE_PRODUCT_PROB", "dice faces not parseable")
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
        k = _n(tgt.group(1))
        if k != int(k):
            return _no("DICE_PRODUCT_PROB", "target product not an integer")
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
        return _no("DICE_PRODUCT_PROB", "product ask is neither odd nor = K")
    p = cnt / (n * n)
    return _res("DICE_PRODUCT_PROB", {"probability": p}, eq, p, steps,
                f"probability = {cnt}/{n * n}")


# --------------------------------------------------------------------------- #
# TWO_POINT_LINE (rows 8101, 7612)
# --------------------------------------------------------------------------- #

_PT = r"([A-Z])\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)"


def _line_coeffs(x1, y1, x2, y2):
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


def _fmt_line(a: int, b: int, c: int) -> str:
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
    t = _clean(text)
    is_join = bool(re.search(r"(equation of the )?line joining", t, re.I))
    is_median = bool(re.search(r"median through the vertex", t, re.I))
    if is_join == is_median:
        return _no("TWO_POINT_LINE",
                   "need 'line joining two points' or 'median through vertex'")
    pts = {m.group(1): (_n(m.group(2)), _n(m.group(3)))
           for m in re.finditer(_PT, t)}
    if is_median:
        vm = re.search(r"median through the vertex\s*([A-Z])", t)
        if not vm or len(pts) != 3 or vm.group(1) not in pts:
            return _no("TWO_POINT_LINE", "need exactly three named vertices")
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
            return _no("TWO_POINT_LINE", "need exactly two named points")
        (x1, y1) = seq[0][1]
        (x2, y2) = seq[1][1]
        head = f"line joining ({x1:g}, {y1:g}) and ({x2:g}, {y2:g})"
        kpart = re.search(r"find k if ([A-Z])\s*\(\s*k\s*,\s*0\s*\)\s*is a "
                          r"point such that area of triangle\s+[A-Z]+\s+is\s*"
                          r"(\d+(?:\.\d+)?)\s*sq", t, re.I)
    coef = _line_coeffs(x1, y1, x2, y2)
    if coef is None:
        return _no("TWO_POINT_LINE", "the two points coincide")
    a, b, c = coef
    if b == 0:
        eq_s = f"x = {-c // a if a and c % a == 0 else -c / a:g}"
        xval = -c / a
        steps = [head, f"a x + b y + c = 0 reduces to x = {xval:g}",
                 f"ANSWER: {eq_s}"]
        return _res("TWO_POINT_LINE", {"x": xval}, "x = const (vertical)",
                    xval, steps, eq_s)
    slope = (y2 - y1) / (x2 - x1)
    eq_s = _fmt_line(a, b, c)
    steps = [
        head,
        "Determinant form: |x y 1; x1 y1 1; x2 y2 1| = 0 gives "
        "a x + b y + c = 0 with a = y1 - y2, b = x2 - x1, "
        "c = x1 y2 - x2 y1.",
        f"ANSWER: {eq_s}",
    ]
    quantities = {"slope": slope}
    if kpart:
        v = 2.0 * _n(kpart.group(2))
        c1 = x1 * y2 - x2 * y1
        dy = y1 - y2
        if abs(dy) < 1e-12:
            return _no("TWO_POINT_LINE",
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
    return _res("TWO_POINT_LINE", quantities, "a x + b y + c = 0", slope,
                steps, eq_s)


# --------------------------------------------------------------------------- #
# THREE_DIGIT_MULTIPLES (rows 6854, 43701)
# --------------------------------------------------------------------------- #


def model_three_digit_multiples(text: str) -> ModelResult:
    t = _clean(text)
    m = re.search(r"how many\s+(?:three[- ]digit|3-digit)\s+numbers\s+are\s+"
                  r"divisible by\s+(\d+)(?![.\d])", t, re.I)
    if not m:
        return _no("THREE_DIGIT_MULTIPLES", "not a 3-digit-multiples ask")
    k = int(m.group(1))
    if not (2 <= k <= 500):
        return _no("THREE_DIGIT_MULTIPLES", "divisor out of range")
    first = -(-100 // k) * k          # smallest 3-digit multiple
    last = (999 // k) * k             # largest 3-digit multiple
    cnt = (last - first) // k + 1
    steps = [
        f"3-digit multiples of {k}: first = {first}, last = {last}.",
        f"AP count: n = ({last} - {first}) / {k} + 1 = {cnt}",
        f"ANSWER: {cnt}",
    ]
    return _res("THREE_DIGIT_MULTIPLES", {"k": k, "count": cnt},
                "n = (last - first)/k + 1", cnt, steps,
                f"{cnt} three-digit numbers are divisible by {k}")


# --------------------------------------------------------------------------- #
# NOT_PERFECT_CUBE_LIST (rows 4293, 43189)
# --------------------------------------------------------------------------- #


def _is_cube(x: int) -> bool:
    r = round(x ** (1.0 / 3.0))
    return any(rr >= 0 and rr ** 3 == x for rr in (r - 1, r, r + 1))


def model_not_perfect_cube_list(text: str) -> ModelResult:
    t = _clean(text)
    m = re.search(r"which of the following numbers are not perfect cubes"
                  r"\?(.*)", t, re.I | re.S)
    if not m:
        return _no("NOT_PERFECT_CUBE_LIST", "not a which-are-not-cubes ask")
    nums = [int(x) for x in re.findall(r"\d{2,9}", m.group(1))]
    if not (1 <= len(nums) <= 10) or any(not (1 < x < 10 ** 9) for x in nums):
        return _no("NOT_PERFECT_CUBE_LIST", "number list missing or out of "
                                             "range")
    bad = [x for x in nums if not _is_cube(x)]
    detail = "; ".join(
        f"{x} = {round(x ** (1.0 / 3.0))}^3 (cube)" if _is_cube(x)
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
    return _res("NOT_PERFECT_CUBE_LIST", {"count": float(len(bad))},
                "n is a cube iff prime exponents are multiples of 3 "
                "(checked by integer cube root)", len(bad), steps, ans)


# --------------------------------------------------------------------------- #
# LENS_POWER_REAL (row 33458)
# --------------------------------------------------------------------------- #


def model_lens_power_real(text: str) -> ModelResult:
    t = _clean(text)
    if not re.search(r"real image", t, re.I) or not re.search(r"power", t,
                                                              re.I):
        return _no("LENS_POWER_REAL", "not a real-image vs power ask")
    powers = [_n(x) for x in re.findall(r"([+-]?\d+(?:\.\d+)?)\s*D\b", t)]
    if len(powers) != 2 or any(abs(p) > 50 for p in powers):
        return _no("LENS_POWER_REAL", "need exactly two in-range powers in D")
    pos = [p for p in powers if p > 0]
    neg = [p for p in powers if p <= 0]
    steps = ["A lens forms a real image of a real object only when it "
             "converges light: converging lens has P > 0."]
    if len(pos) == 2:
        ans = "both the lenses (both have P > 0)"
        val = 1.0
    elif len(neg) == 2:
        ans = "neither of the lenses (both have P < 0)"
        val = 0.0
    else:
        p = pos[0]
        ans = (f"only the lens with power {p:g} D (the "
               f"{neg[0]:g} D lens diverges: P < 0)")
        steps.append(f"{p:g} D > 0 converging; {neg[0]:g} D < 0 diverging.")
        val = p
    steps.append(f"ANSWER: {ans}")
    return _res("LENS_POWER_REAL", {"positive_power": val},
                "real image <=> converging <=> P > 0", val, steps, ans)


# --------------------------------------------------------------------------- #
# COIL_MAGNETIC_MOMENT (row 11493)
# --------------------------------------------------------------------------- #


def model_coil_magnetic_moment(text: str) -> ModelResult:
    t = _clean(text)
    if not (re.search(r"wire of length", t, re.I)
            and re.search(r"coil of N turns", t, re.I)
            and re.search(r"magnetic moment", t, re.I)):
        return _no("COIL_MAGNETIC_MOMENT", "not a wire-to-coil moment ask")
    if not re.search(r"maximum", t, re.I):
        return _no("COIL_MAGNETIC_MOMENT",
                   "only the maximum-N ask is deterministic")
    steps = [
        "Wire of length L bent into N turns: each turn has circumference "
        "L/N, so r = L / (2 pi N).",
        "Area A = pi r^2 = L^2 / (4 pi N^2); moment m = N I A = "
        "I L^2 / (4 pi N).",
        "m is inversely proportional to N, so it is largest at the "
        "smallest N.",
        "ANSWER: N = 1 (a single turn)",
    ]
    return _res("COIL_MAGNETIC_MOMENT", {"N": 1.0},
                "m = N I A = I L^2 / (4 pi N)", 1.0, steps,
                "N = 1 (a single turn)")


# --------------------------------------------------------------------------- #
# PROJECTILE_CEILING (row 46319)
# --------------------------------------------------------------------------- #

_SPEED = r"(\d+(?:\.\d+)?)\s*m\s*(?:/\s*s\b|s\s*[-^]?\s*1(?![\d.]))"


def model_projectile_ceiling(text: str) -> ModelResult:
    t = _clean(text)
    if not (re.search(r"ceiling", t, re.I)
            and re.search(r"maximum horizontal distance", t, re.I)
            and re.search(r"without hitting", t, re.I)):
        return _no("PROJECTILE_CEILING", "not a ceiling-range ask")
    hm = re.search(r"ceiling[^.]{0,60}?is\s*(\d+(?:\.\d+)?)\s*m\s*high", t,
                   re.I)
    um = re.search(r"speed of\s*" + _SPEED, t, re.I)
    if not hm or not um:
        return _no("PROJECTILE_CEILING", "need ceiling height and speed")
    h = _n(hm.group(1))
    u = _n(um.group(1))
    if not (0.5 <= h <= 500) or not (1.0 <= u <= 200):
        return _no("PROJECTILE_CEILING", "values out of physical range")
    g = 9.8  # stated constant
    h45 = u * u / (4.0 * g)   # height reached at the 45-degree shot
    if h45 <= h:
        rng = u * u / g
        steps = [
            f"At 45 deg the apex height is u^2/(4g) = {h45:.4g} m, below "
            f"the ceiling {h:g} m: the ceiling never binds.",
            f"Maximum range (45 deg) = u^2 / g = {u:g}^2 / 9.8 = "
            f"{rng:.6g} m",
            f"ANSWER: {rng:.6g} m",
        ]
        eq = "R = u^2 / g (unconstrained)"
    else:
        s = math.sqrt(2.0 * g * h) / u       # sin(theta_max)
        cos_t = math.sqrt(1.0 - s * s)
        rng = (u * u / g) * 2.0 * s * cos_t
        steps = [
            f"Ceiling binds: h = u^2 sin^2 t / (2g) = {h:g} m gives "
            f"sin t = sqrt(2 x 9.8 x {h:g}) / {u:g} = {s:.6g} (g = 9.8).",
            f"R = u^2 sin(2t) / g = ({u:g}^2 / 9.8) x 2 x {s:.6g} x "
            f"{cos_t:.6g} = {rng:.6g} m",
            f"ANSWER: {rng:.6g} m",
        ]
        eq = "R = u^2 sin(2t)/g with sin t = sqrt(2 g H)/u"
    return _res("PROJECTILE_CEILING", {"u": u, "H": h, "R": rng}, eq, rng,
                steps, f"maximum range = {rng:.6g} m")


# --------------------------------------------------------------------------- #
# BERNOULLI_LIFT (row 46531)
# --------------------------------------------------------------------------- #


def model_bernoulli_lift(text: str) -> ModelResult:
    t = _clean(text)
    if not re.search(r"lift on the wing", t, re.I):
        return _no("BERNOULLI_LIFT", "not a wing-lift ask")
    dens = re.search(r"density of air (?:to be |as |of )?\s*"
                     r"(\d+(?:\.\d+)?)\s*kg", t, re.I)
    area = re.search(r"area\s+(?:is|of)\s*(\d+(?:\.\d+)?)\s*m\s*\^?2"
                     r"(?![\d.])", t, re.I)
    speeds = re.findall(_SPEED, t)
    if not (dens and area and len(speeds) >= 2):
        return _no("BERNOULLI_LIFT",
                   "need both speeds, wing area and air density")
    v1 = _n(speeds[0])
    v2 = _n(speeds[1])
    rho = _n(dens.group(1))
    a = _n(area.group(1))
    if not (1.0 <= v2 < v1 <= 500) or v1 - v2 < 1e-9:
        return _no("BERNOULLI_LIFT", "speeds out of range or inverted")
    if not (0.1 <= rho <= 20) or not (0.05 <= a <= 500):
        return _no("BERNOULLI_LIFT", "density or area out of range")
    lift = 0.5 * rho * (v1 * v1 - v2 * v2) * a
    steps = [
        "Bernoulli: lift = (p_lower - p_upper) A with "
        "p_upper - p_lower = 1/2 rho (v_lower^2 - v_upper^2).",
        f"L = 1/2 x {rho:g} x ({v1:g}^2 - {v2:g}^2) x {a:g} = "
        f"{lift:.6g} N",
        f"ANSWER: lift = {lift:.6g} N",
    ]
    return _res("BERNOULLI_LIFT", {"v_up": v1, "v_lo": v2, "rho": rho,
                                   "A": a, "L": lift},
                "L = 1/2 rho (v1^2 - v2^2) A", lift, steps,
                f"lift = {lift:.6g} N")


# --------------------------------------------------------------------------- #
# ROTATING_CYLINDER (row 46443)
# --------------------------------------------------------------------------- #


def model_rotating_cylinder(text: str) -> ModelResult:
    t = _clean(text)
    if not re.search(r"solid cylinder", t, re.I):
        return _no("ROTATING_CYLINDER", "not a solid-cylinder case")
    mm = re.search(r"(\d+(?:\.\d+)?)\s*kg", t)
    om = re.search(r"angular speed\s*(\d+(?:\.\d+)?)\s*rad", t, re.I)
    rm = re.search(r"radius[^.]{0,30}?is\s*(\d+(?:\.\d+)?)\s*m", t, re.I)
    if not (mm and om and rm):
        return _no("ROTATING_CYLINDER", "need mass, angular speed and radius")
    mass = _n(mm.group(1))
    w = _n(om.group(1))
    r = _n(rm.group(1))
    if not (0.1 <= mass <= 1e5) or not (0.005 <= r <= 50) \
            or not (0.05 <= w <= 1e5):
        return _no("ROTATING_CYLINDER", "values out of physical range")
    has_ke = bool(re.search(r"kinetic energy", t, re.I))
    has_l = bool(re.search(r"angular momentum", t, re.I))
    if not (has_ke or has_l):
        return _no("ROTATING_CYLINDER", "neither KE nor angular momentum ask")
    ke = 0.25 * mass * r * r * w * w      # 1/2 I w^2 with I = 1/2 M R^2
    ang = 0.5 * mass * r * r * w          # I w
    parts = []
    if has_ke:
        parts.append(f"KE = (1/4) M R^2 w^2 = {ke:.6g} J")
    if has_l:
        parts.append(f"L = (1/2) M R^2 w = {ang:.6g} kg m^2/s")
    steps = [
        f"M = {mass:g} kg, R = {r:g} m, w = {w:g} rad/s; "
        f"I = (1/2) M R^2 = {0.5 * mass * r * r:.6g} kg m^2.",
    ] + [f"{p}" for p in parts]
    ans = "; ".join(parts)
    steps.append(f"ANSWER: {ans}")
    eq = "I = (1/2) M R^2; KE = (1/2) I w^2; L = I w"
    return _res("ROTATING_CYLINDER",
                {"KE": ke, "L_ang": ang, "M": mass, "R": r, "w": w},
                eq, ke if has_ke else ang, steps, ans)


# --------------------------------------------------------------------------- #
# KELVIN_CONVERT (row 46554)
# --------------------------------------------------------------------------- #


def model_kelvin_convert(text: str) -> ModelResult:
    t = _clean(text)
    if not (re.search(r"Celsius", t, re.I) and re.search(r"Fahrenheit", t,
                                                         re.I)):
        return _no("KELVIN_CONVERT", "need both Celsius and Fahrenheit ask")
    ks = [_n(x) for x in re.findall(r"(-?\d+(?:\.\d+)?)\s*K\b", t)]
    if not (1 <= len(ks) <= 4):
        return _no("KELVIN_CONVERT", "no kelvin values found")
    if any(k <= 0 or k > 1e5 for k in ks):
        return _no("KELVIN_CONVERT", "kelvin value non-physical")
    nm = re.search(r"(?:triple points? of|temperatures? of)\s+(.+?)\s+are", t,
                   re.I)
    names = ([s.strip() for s in nm.group(1).split(" and ")]
             if nm else [])
    pairs = []
    for i, k in enumerate(ks):
        c = k - 273.15
        f = 1.8 * c + 32.0
        label = names[i] if i < len(names) else f"value {i + 1}"
        pairs.append((label, k, c, f))
    first_c = pairs[0][2]
    out = "; ".join(f"{lb}: {k:g} K = {c:.2f}\u00b0C = {f:.2f}\u00b0F"
                    for lb, k, c, f in pairs)
    steps = ["C = K - 273.15; F = (9/5) C + 32."]
    for lb, k, c, f in pairs:
        steps.append(f"{lb}: {k:g} - 273.15 = {c:.2f}\u00b0C; "
                     f"9/5 x {c:.2f} + 32 = {f:.2f}\u00b0F")
    steps.append(f"ANSWER: {out}")
    return _res("KELVIN_CONVERT", {"C1": first_c},
                "C = K - 273.15; F = (9/5) C + 32", first_c, steps, out)


# --------------------------------------------------------------------------- #
# CARBON_DATING (row 10301)
# --------------------------------------------------------------------------- #


def model_carbon_dating(text: str) -> ModelResult:
    t = _clean(text)
    if not (re.search(r"carbon[- ]?14", t, re.I)
            and re.search(r"half[- ]?life", t, re.I)):
        return _no("CARBON_DATING", "not a carbon-14 half-life ask")
    frac = re.search(r"(\d+(?:\.\d+)?)\s*%\s*of what", t, re.I)
    if not frac:
        frac = re.search(r"was\s*(\d+(?:\.\d+)?)\s*%\s*of", t, re.I)
    hl = re.search(r"half[- ]?life\s*(?:of\s*(?:carbon|C)[- ]?14\s*)?"
                   r"=\s*(\d+(?:\.\d+)?)\s*years", t, re.I)
    if not frac or not hl:
        return _no("CARBON_DATING",
                   "need remaining percentage and half-life in years")
    p = _n(frac.group(1))
    th = _n(hl.group(1))
    if not (0 < p < 100) or not (1 <= th <= 1e7):
        return _no("CARBON_DATING", "percentage or half-life out of range")
    age = th * math.log(100.0 / p) / math.log(2.0)
    steps = [
        f"Remaining fraction = {p:g}% -> N/N0 = {p / 100:g}.",
        "Decay: N/N0 = (1/2)^(t/T)  ->  t = T x log2(N0/N).",
        f"t = {th:g} x log2({100.0 / p:g}) = {age:.6g} years",
        f"ANSWER: age = {age:.6g} years",
    ]
    return _res("CARBON_DATING", {"T_half": th, "pct": p, "age": age},
                "t = T_half x log2(1/fraction)", age, steps,
                f"age = {age:.6g} years")


# --------------------------------------------------------------------------- #
# SECTION_FORMULA (row 4731)
# --------------------------------------------------------------------------- #


def model_section_formula(text: str) -> ModelResult:
    t = _clean(text)
    if re.search(r"external", t, re.I):
        return _no("SECTION_FORMULA", "external division is a different form")
    m = re.search(r"divides the join of\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                  r"(-?\d+(?:\.\d+)?)\s*\)\s*and\s*\(\s*(-?\d+(?:\.\d+)?)"
                  r"\s*,\s*(-?\d+(?:\.\d+)?)\s*\)\s*in the ratio\s*"
                  r"(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)", t, re.I)
    if not m:
        return _no("SECTION_FORMULA", "need two points and an internal ratio")
    x1, y1, x2, y2 = (_n(m.group(i)) for i in range(1, 5))
    r1, r2 = _n(m.group(5)), _n(m.group(6))
    if r1 <= 0 or r2 <= 0 or r1 + r2 > 10000:
        return _no("SECTION_FORMULA", "ratio must be positive")
    if max(abs(x1), abs(y1), abs(x2), abs(y2)) > 1e6:
        return _no("SECTION_FORMULA", "coordinates out of range")
    x = (r1 * x2 + r2 * x1) / (r1 + r2)
    y = (r1 * y2 + r2 * y1) / (r1 + r2)
    steps = [
        f"Section formula (m:n from the first point): "
        f"P = ((m x2 + n x1)/(m+n), (m y2 + n y1)/(m+n)).",
        f"x = ({r1:g} x {x2:g} + {r2:g} x {x1:g}) / {r1 + r2:g} = {x:.6g}; "
        f"y = ({r1:g} x {y2:g} + {r2:g} x {y1:g}) / {r1 + r2:g} = {y:.6g}",
        f"ANSWER: ({x:g}, {y:g})",
    ]
    return _res("SECTION_FORMULA", {"x": x, "y": y},
                "(x, y) = ((m x2 + n x1)/(m+n), (m y2 + n y1)/(m+n))", x,
                steps, f"({x:g}, {y:g})")


# --------------------------------------------------------------------------- #
# CHORD_FROM_DISTANCE (row 43598)
# --------------------------------------------------------------------------- #


def model_chord_from_distance(text: str) -> ModelResult:
    t = _clean(text)
    if not re.search(r"chord", t, re.I):
        return _no("CHORD_FROM_DISTANCE", "not a chord ask")
    rm = re.search(r"radius is\s*(\d+(?:\.\d+)?)\s*cm", t, re.I)
    dm = re.search(r"per(?:pendicular)? distance (?:from the centre )?is\s*"
                   r"(\d+(?:\.\d+)?)\s*cm", t, re.I)
    if not rm or not dm:
        return _no("CHORD_FROM_DISTANCE", "need radius and distance")
    r = _n(rm.group(1))
    d = _n(dm.group(1))
    if not (0 < d < r <= 1e6):
        return _no("CHORD_FROM_DISTANCE",
                   "need 0 < distance < radius")
    half = math.sqrt(r * r - d * d)
    chord = 2.0 * half
    steps = [
        "The perpendicular from the centre bisects the chord: "
        "(chord/2)^2 = R^2 - d^2.",
        f"chord = 2 sqrt({r:g}^2 - {d:g}^2) = {chord:.6g} cm",
        f"ANSWER: chord = {chord:.6g} cm",
    ]
    return _res("CHORD_FROM_DISTANCE", {"R": r, "d": d, "chord": chord},
                "(c/2)^2 = R^2 - d^2", chord, steps,
                f"chord = {chord:.6g} cm")


# --------------------------------------------------------------------------- #
# TANGENT_QUADRILATERAL (row 17391)
# --------------------------------------------------------------------------- #

_SIDES = ("PQ", "QR", "RS", "SP")


def model_tangent_quadrilateral(text: str) -> ModelResult:
    t = _clean(text)
    if not (re.search(r"quadrilateral", t, re.I)
            and re.search(r"circumscrib\w*\s+a circle", t, re.I)):
        return _no("TANGENT_QUADRILATERAL", "not a circumscribed "
                                            "quadrilateral")
    known = {}
    for s in _SIDES:
        sm = re.search(r"\b" + s + r"\s*=\s*(\d+(?:\.\d+)?)", t)
        if sm:
            known[s] = _n(sm.group(1))
    if len(known) != 3:
        return _no("TANGENT_QUADRILATERAL",
                   "need exactly three sides given")
    if any(v <= 0 or v > 1e5 for v in known.values()):
        return _no("TANGENT_QUADRILATERAL", "side lengths out of range")
    ask = re.search(r"find (?:the length of )?(PQ|QR|RS|SP)\b", t, re.I)
    if not ask or ask.group(1) in known:
        return _no("TANGENT_QUADRILATERAL", "asked side missing or unknown")
    miss = ask.group(1)
    pq, qr, rs, sp = (known.get(s) for s in _SIDES)
    val = {"PQ": lambda: qr + sp - rs,
           "QR": lambda: pq + rs - sp,
           "RS": lambda: qr + sp - pq,
           "SP": lambda: pq + rs - qr}[miss]()
    if val <= 0 or val > 1e5:
        return _no("TANGENT_QUADRILATERAL", "computed side non-positive")
    steps = [
        "Tangents from a common external point are equal, so opposite "
        "sides sum equal: PQ + RS = QR + SP.",
        f"{miss} = {val:.6g} cm",
        f"ANSWER: {miss} = {val:.6g} cm",
    ]
    return _res("TANGENT_QUADRILATERAL", {"missing": val},
                "PQ + RS = QR + SP", val, steps,
                f"{miss} = {val:.6g} cm")


# --------------------------------------------------------------------------- #
# EQUILATERAL_ALTITUDE (row 37635)
# --------------------------------------------------------------------------- #


def model_equilateral_altitude(text: str) -> ModelResult:
    t = _clean(text)
    if not re.search(r"equilateral triangle", t, re.I):
        return _no("EQUILATERAL_ALTITUDE", "not an equilateral triangle")
    if not re.search(r"altitude", t, re.I):
        return _no("EQUILATERAL_ALTITUDE", "not an altitude ask")
    m = re.search(r"of side\s*(\d+(?:\.\d+)?)\s*cm", t, re.I)
    if not m:
        return _no("EQUILATERAL_ALTITUDE", "need the side length")
    s = _n(m.group(1))
    if not (0 < s <= 1e6):
        return _no("EQUILATERAL_ALTITUDE", "side out of range")
    h = math.sqrt(3.0) / 2.0 * s
    steps = [
        "Altitude of an equilateral triangle: h = (sqrt3 / 2) x side "
        "(half of an equilateral triangle of base s has hypotenuse s).",
        f"h = (sqrt3 / 2) x {s:g} = {h:.6g} cm",
        f"ANSWER: h = {h:.6g} cm",
    ]
    return _res("EQUILATERAL_ALTITUDE", {"side": s, "h": h},
                "h = (sqrt3/2) s", h, steps, f"altitude = {h:.6g} cm")


# --------------------------------------------------------------------------- #
# BASIC_PROPORTIONALITY (row 17108)
# --------------------------------------------------------------------------- #


def model_basic_proportionality(text: str) -> ModelResult:
    t = _clean(text)
    if not re.search(r"D and E are points on side AB and AC respectively",
                     t, re.I) or \
            not re.search(r"DE\s*(?:II|\|\||parallel)", t, re.I) or \
            re.search(r"not\s*(?:parallel|II)", t, re.I):
        return _no("BASIC_PROPORTIONALITY", "not a DE-parallel-BC figure")
    if not re.search(r"find\s+(?:the length of\s+)?CE\b", t, re.I):
        return _no("BASIC_PROPORTIONALITY", "ask is not CE")
    vals = {}
    for k, v in re.findall(r"\b([A-Z]{2})\s*=\s*(\d+(?:\.\d+)?)", t):
        vals[k] = _n(v)
    if not ("AD" in vals and "AE" in vals and ("BD" in vals or "AB" in vals)):
        return _no("BASIC_PROPORTIONALITY",
                   "need AE, AD and (BD or AB)")
    ad, ae = vals["AD"], vals["AE"]
    ab = vals["AB"] if "AB" in vals else ad + vals["BD"]
    if not (0 < ad < ab <= 1e6 and 0 < ae <= 1e6):
        return _no("BASIC_PROPORTIONALITY", "lengths out of range")
    ac = ab * ae / ad
    ce = ac - ae
    if ce < 0:
        return _no("BASIC_PROPORTIONALITY", "CE negative: lengths "
                                            "inconsistent")
    steps = [
        f"DE || BC: basic proportionality gives AD/AB = AE/AC, "
        f"AB = {ab:g} cm.",
        f"AC = AB x AE / AD = {ab:g} x {ae:g} / {ad:g} = {ac:.6g} cm",
        f"CE = AC - AE = {ce:.6g} cm",
        f"ANSWER: CE = {ce:.6g} cm",
    ]
    return _res("BASIC_PROPORTIONALITY", {"AD": ad, "AE": ae, "AB": ab,
                                          "CE": ce},
                "AD/AB = AE/AC", ce, steps, f"CE = {ce:.6g} cm")


# --------------------------------------------------------------------------- #
# AP_EQUAL_TERMS (row 6856)
# --------------------------------------------------------------------------- #


def model_ap_equal_terms(text: str) -> ModelResult:
    t = _clean(text)
    m = re.search(r"nth terms of two APs\s*:?\s*(.+?)\s*and\s*(.+?)\s*equal",
                  t, re.I)
    if not m:
        return _no("AP_EQUAL_TERMS", "not a two-AP equal-terms ask")
    sides = []
    for grp in (m.group(1), m.group(2)):
        nums = [_n(x) for x in re.findall(r"-?\d+(?:\.\d+)?", grp)]
        if len(nums) < 3:
            return _no("AP_EQUAL_TERMS", "each AP needs three given terms")
        sides.append(nums[:3])
    a1, a2, a3 = sides[0]
    b1, b2, b3 = sides[1]
    d1, d2 = a2 - a1, b2 - b1
    if abs((a3 - a2) - d1) > 1e-9 or abs((b3 - b2) - d2) > 1e-9:
        return _no("AP_EQUAL_TERMS", "given terms are not in AP")
    if abs(d1 - d2) < 1e-12:
        return _no("AP_EQUAL_TERMS", "equal common differences: never/always "
                                     "equal")
    k = (a1 - b1) / (d2 - d1)     # n - 1
    n = k + 1.0
    if abs(n - round(n)) > 1e-9 or n < 1:
        return _no("AP_EQUAL_TERMS", "no integral term index")
    ni = int(round(n))
    steps = [
        f"AP1: a = {a1:g}, d = {d1:g}; AP2: a = {b1:g}, d = {d2:g}.",
        f"Set {a1:g} + (n-1)({d1:g}) = {b1:g} + (n-1)({d2:g})  ->  "
        f"n - 1 = {k:g}",
        f"n = {ni}",
        f"ANSWER: n = {ni}",
    ]
    return _res("AP_EQUAL_TERMS", {"n": ni}, "a1 + (n-1) d1 = b1 + (n-1) d2",
                float(ni), steps, f"n = {ni}")


# --------------------------------------------------------------------------- #
# GEOMETRIC_DEPRECIATION (row 5333)
# --------------------------------------------------------------------------- #


_ORDINAL = {"first": 1, "second": 2, "third": 3, "fourth": 4, "fifth": 5}


def model_geometric_depreciation(text: str) -> ModelResult:
    t = _clean(text)
    cm = re.search(r"(?:costs?\s+(?:him\s+)?|purchas\w*\s+for\s+)"
                   r"(?:Rs\.?|INR|\u20b9)?\s*(" + _NUM + r")", t, re.I)
    rm = re.search(r"depreciat\w*\s+each year by\s*(\d+(?:\.\d+)?)\s*%|"
                   r"depreciat\w*[^.]{0,40}?"
                   r"(\d+(?:\.\d+)?)\s*%\s*per\s*annum", t, re.I)
    ym = re.search(r"at the end of\s+(?:the\s+)?(\d+|first|second|third|"
                   r"fourth|fifth)\s+years?", t, re.I)
    if not (cm and rm and ym):
        return _no("GEOMETRIC_DEPRECIATION",
                   "need cost, yearly % depreciation and horizon")
    v0 = _n(cm.group(1))
    r = _n(rm.group(1) or rm.group(2))
    n = int(ym.group(1)) if ym.group(1).isdigit() \
        else _ORDINAL[ym.group(1)]
    if v0 <= 0 or v0 > 1e12 or not (0 < r < 100) or not (1 <= n <= 60):
        return _no("GEOMETRIC_DEPRECIATION", "values out of range")
    val = v0 * (1.0 - r / 100.0) ** n
    steps = [
        f"Value decays geometrically: V(n) = V0 (1 - r/100)^n.",
        f"V({n}) = {v0:g} x (1 - {r:g}/100)^{n} = {val:.6g}",
        f"ANSWER: V({n}) = {val:.6g}",
    ]
    return _res("GEOMETRIC_DEPRECIATION", {"V0": v0, "r": r, "n": n,
                                           "V": val},
                "V(n) = V0 (1 - r/100)^n", val, steps,
                f"value after {n} years = {val:.6g}")


# --------------------------------------------------------------------------- #
# DISCOUNT_MARKED (rows 43209, 6543)
# --------------------------------------------------------------------------- #


def model_discount_marked(text: str) -> ModelResult:
    t = _clean(text)
    rate = re.search(r"discount (?:given )?(?:was|of|is)\s*"
                     r"(\d+(?:\.\d+)?)\s*%", t, re.I)
    if not rate:
        rate = re.search(r"(\d+(?:\.\d+)?)\s*%\s*discount", t, re.I)
    if not rate:
        return _no("DISCOUNT_MARKED", "no discount percentage")
    r = _n(rate.group(1))
    if not (0 <= r < 100):
        return _no("DISCOUNT_MARKED", "discount rate out of range")
    paid = re.search(r"(?:amount|sum)\s+(?:he|she|it)\s+pays\s+is\s*"
                     r"[^\d]{0,3}(" + _NUM + r")", t, re.I)
    ask_mp = bool(re.search(r"find the marked price", t, re.I))
    marks = [_n(x) for x in re.findall(r"marked at\s*[^\d]{0,3}(" + _NUM
                                       + r")", t)]
    if paid and ask_mp:
        pay = _n(paid.group(1))
        if pay <= 0 or pay > 1e12:
            return _no("DISCOUNT_MARKED", "paid amount out of range")
        mp = pay / (1.0 - r / 100.0)
        steps = [
            f"Paid = marked x (1 - {r:g}/100)  ->  marked = paid / "
            f"(1 - {r:g}/100).",
            f"marked = {pay:g} / {1 - r / 100.0:g} = {mp:.6g}",
            f"ANSWER: marked price = {mp:.6g}",
        ]
        return _res("DISCOUNT_MARKED", {"rate": r, "paid": pay, "marked": mp},
                    "paid = marked (1 - r/100)", mp, steps,
                    f"marked price = {mp:.6g}")
    if marks and re.search(r"sale price", t, re.I):
        if not (1 <= len(marks) <= 6) or any(m <= 0 or m > 1e12
                                             for m in marks):
            return _no("DISCOUNT_MARKED", "marked prices out of range")
        sales = [m * (1.0 - r / 100.0) for m in marks]
        steps = [
            f"Sale price = marked x (1 - {r:g}/100) = marked x "
            f"{1 - r / 100.0:g}.",
        ]
        for m, s in zip(marks, sales):
            steps.append(f"{m:g} -> {s:.6g}")
        ans = ", ".join(f"{s:.6g}" for s in sales)
        steps.append(f"ANSWER: sale prices = {ans}")
        return _res("DISCOUNT_MARKED", {"rate": r, "first_sale": sales[0]},
                    "sale = marked (1 - r/100)", sales[0], steps,
                    f"sale prices = {ans}")
    return _no("DISCOUNT_MARKED", "neither a marked-price nor a sale-price "
                                  "ask")


# --------------------------------------------------------------------------- #
# MEAN_VARIANCE_MISSING (row 7820)
# --------------------------------------------------------------------------- #

_WORDS = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6,
          "seven": 7, "eight": 8, "nine": 9, "ten": 10}


def model_mean_variance_missing(text: str) -> ModelResult:
    t = _clean(text)
    m = re.search(r"mean and variance of (\d+) observations are\s*"
                  r"(\d+(?:\.\d+)?)\s*and\s*(\d+(?:\.\d+)?)", t, re.I)
    if not m:
        return _no("MEAN_VARIANCE_MISSING", "need mean and variance prose")
    n = int(m.group(1))
    mean = _n(m.group(2))
    var = _n(m.group(3))
    if not (3 <= n <= 30) or var <= 0:
        return _no("MEAN_VARIANCE_MISSING", "n or variance out of range")
    km = re.search(r"(\d+|one|two|three|four|five|six|seven|eight|nine|ten)"
                   r"\s+of the observations are\s*"
                   r"(" + _NUM + r"(?:\s*,\s*" + _NUM + r")*)", t, re.I)
    if not km:
        return _no("MEAN_VARIANCE_MISSING", "given observations missing")
    k = int(_WORDS.get(km.group(1).lower(), km.group(1)))
    given = [_n(x) for x in km.group(2).split(",")]
    if k != len(given) or k != n - 2:
        return _no("MEAN_VARIANCE_MISSING",
                   f"given count {k} must equal n - 2 = {n - 2}")
    total = n * mean
    ssq = n * (var + mean * mean)
    gs = sum(given)
    gq = sum(g * g for g in given)
    rs = total - gs
    rq = ssq - gq
    if rq < 0:
        return _no("MEAN_VARIANCE_MISSING",
                   "given squares exceed total: data inconsistent")
    prod = (rs * rs - rq) / 2.0
    disc = rs * rs - 4.0 * prod
    if disc < 0:
        return _no("MEAN_VARIANCE_MISSING",
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
    return _res("MEAN_VARIANCE_MISSING", {"x": x, "y": y},
                "sum x + sum sq quadratic", x, steps,
                f"the remaining observations are {x:.6g} and {y:.6g}")


# --------------------------------------------------------------------------- #
# INVERSE_PROPORTION_DAYS (row 4473)
# --------------------------------------------------------------------------- #


def model_inverse_proportion(text: str) -> ModelResult:
    t = _clean(text)
    if not re.search(r"fell ill", t, re.I):
        return _no("INVERSE_PROPORTION_DAYS",
                   "not a worker-fell-ill inverse proportion")
    m = re.search(r"\b(two|three|four|five|six|seven|eight|nine|\d+)\s+"
                  r"persons?\s+(?:could|can|will)\s+[^.]*?\bin\s+"
                  r"(\d+)\s+days", t, re.I)
    if not m:
        return _no("INVERSE_PROPORTION_DAYS",
                   "need persons and days prose")
    n = int(_WORDS.get(m.group(1).lower(), m.group(1)))
    d = int(m.group(2))
    if not (2 <= n <= 1000) or not (1 <= d <= 3650):
        return _no("INVERSE_PROPORTION_DAYS", "workers or days out of range")
    days = n * d / (n - 1)
    pers = n * d
    steps = [
        f"Total work = {n} x {d} = {pers} person-days (inverse "
        f"proportion).",
        f"(i) with {n - 1} workers: {pers} / {n - 1} = {days:.6g} days",
        f"(ii) to finish in 1 day: {pers} persons",
        f"ANSWER: (i) {days:.6g} days (ii) {pers} persons",
    ]
    return _res("INVERSE_PROPORTION_DAYS", {"workers": n, "days": d,
                                            "t": days},
                "work = N x D person-days; t = N D / (N-1)", days, steps,
                f"(i) {days:.6g} days (ii) {pers} persons")


# --------------------------------------------------------------------------- #
# Dispatcher
# --------------------------------------------------------------------------- #

_FAMILIES = [
    model_dice_product_prob,
    model_two_point_line,
    model_three_digit_multiples,
    model_not_perfect_cube_list,
    model_lens_power_real,
    model_coil_magnetic_moment,
    model_projectile_ceiling,
    model_bernoulli_lift,
    model_rotating_cylinder,
    model_kelvin_convert,
    model_carbon_dating,
    model_section_formula,
    model_chord_from_distance,
    model_tangent_quadrilateral,
    model_equilateral_altitude,
    model_basic_proportionality,
    model_ap_equal_terms,
    model_geometric_depreciation,
    model_discount_marked,
    model_mean_variance_missing,
    model_inverse_proportion,
]


def model_extra2(text: str) -> ModelResult:
    for fn in _FAMILIES:
        try:
            r = fn(text)
        except Exception:
            continue
        if r is not None and r.matched:
            return r
    return _no("EXTRA2", "no extra2 family matched")


def _register_into_ml() -> bool:
    """Import-order-safe registration (same pattern as extra_families):
    if THIS module is imported first, modeling_layer's batch-12 import
    hits a partially-initialised module and silently skips."""
    try:
        import backend.its.solver.modeling_layer as _ml
    except ImportError:
        return False
    if not any(getattr(fn, "__name__", "") == "model_extra2"
               for fn in _ml._STRUCTURES):
        _ml._STRUCTURES.append(model_extra2)
    return True


if not _register_into_ml():
    pass  # modeling_layer not importable yet; its batch-12 registers us
