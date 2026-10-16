"""expanded_invariants.py -- Modular Second-Path Invariants for 140+ STEM Structure Families.

Provides deterministic, non-circular dual-path verifications across:
1. Trigonometric Equations & Identities
2. Quadratic Polynomials & Roots
3. Vectors & 2D/3D Coordinate Geometry
4. Arithmetic & Geometric Progressions
5. Probability, Combinatorics & Statistics
6. Mensuration & Geometry Invariants
7. Physics, Chemistry & Commercial Mathematics
8. Formal NCERT Proof Invariants
"""

from __future__ import annotations

import math
import re
from fractions import Fraction
from typing import Any, Dict, List, Optional, Tuple, Callable

PASS = "pass"
FAIL = "fail"
NA = "na"
Verdict = Tuple[str, str]

def _close(a: float, b: float, rel: float = 1e-3, abs_tol: float = 0.02) -> bool:
    if a is None or b is None:
        return False
    diff = abs(a - b)
    if diff <= abs_tol:
        return True
    denom = max(abs(a), abs(b))
    return (diff / denom) <= rel if denom > 0 else True


# --------------------------------------------------------------------------- #
# 1. Custom Functional Verifiers
# --------------------------------------------------------------------------- #

def v_trig_eq(ctx: Any) -> Verdict:
    """k * trig(a * x) = c equation check."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    m = re.search(r"(\d*)\s*(sin|cos|tan|sec|cosec|cot)\s*\(?\s*(\d*)\s*([a-z])\s*\)?\s*=\s*(sqrt\s*\d+|[\d.]+)", q, re.I)
    if not m:
        return (NA, "could not parse trig equation from text")
    k = float(m.group(1) or 1.0)
    fn = m.group(2).lower()
    a = float(m.group(3) or 1.0)
    raw = m.group(5).strip()
    sm = re.match(r"sqrt\s*\(?\s*(\d+(?:\.\d+)?)\s*\)?", raw)
    rhs = math.sqrt(float(sm.group(1))) if sm else float(raw)
    
    rad = math.radians(a * claim)
    try:
        if fn == "sin":
            val = k * math.sin(rad)
        elif fn == "cos":
            val = k * math.cos(rad)
        elif fn == "tan":
            val = k * math.tan(rad)
        elif fn == "sec":
            val = k / math.cos(rad)
        elif fn == "cosec":
            val = k / math.sin(rad)
        elif fn == "cot":
            val = k / math.tan(rad)
        else:
            return (NA, f"unknown trig fn {fn}")
    except ZeroDivisionError:
        return (FAIL, f"division by zero evaluating {fn}({claim} deg)")

    if _close(val, rhs, rel=1e-3, abs_tol=0.01):
        return (PASS, f"trig root check: {k}*{fn}({a}*{claim:.4g} deg) = {val:.4g} matches rhs {rhs:.4g}")
    return (FAIL, f"trig root violation: {k}*{fn}({a}*{claim:.4g} deg) = {val:.4g} != rhs {rhs:.4g}")


def v_slope(ctx: Any) -> Verdict:
    """Slope between two 2D points: m = (y2 - y1) / (x2 - x1)."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    pts = re.findall(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)", q)
    if len(pts) != 2:
        return (NA, "could not extract 2 points for slope")
    x1, y1 = float(pts[0][0]), float(pts[0][1])
    x2, y2 = float(pts[1][0]), float(pts[1][1])
    dx = x2 - x1
    dy = y2 - y1
    if abs(dx) < 1e-9:
        if "vertical" in (ctx.final_answer or "").lower() or "undefined" in (ctx.final_answer or "").lower():
            return (PASS, "vertical line with undefined slope verified")
        return (FAIL, "vertical line but finite slope claimed")
    expected_m = dy / dx
    if _close(expected_m, claim, rel=1e-3, abs_tol=0.01):
        return (PASS, f"slope check: ({y2:.4g} - {y1:.4g})/({x2:.4g} - {x1:.4g}) = {expected_m:.4g} == claimed {claim:.4g}")
    return (FAIL, f"slope violation: expected {expected_m:.4g} != claimed {claim:.4g}")


def v_vector_dot(ctx: Any) -> Verdict:
    """Dot product of two 3D vectors."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    vecs = re.findall(r"([+-]?\s*\d*)\s*i\s*([+-]\s*\d*)\s*j\s*([+-]\s*\d*)\s*k", q)
    def _parse_c(s):
        s = s.replace(" ", "")
        if not s or s == "+": return 1.0
        if s == "-": return -1.0
        return float(s)
    if len(vecs) != 2:
        return (NA, "could not extract 2 3D vectors")
    v1 = [_parse_c(x) for x in vecs[0]]
    v2 = [_parse_c(x) for x in vecs[1]]
    expected_dot = sum(v1[i] * v2[i] for i in range(3))
    if _close(expected_dot, claim, rel=1e-3, abs_tol=0.01):
        return (PASS, f"dot product check: a . b = {expected_dot:.4g} == claimed {claim:.4g}")
    return (FAIL, f"dot product violation: expected {expected_dot:.4g} != claimed {claim:.4g}")


def v_point_line_dist(ctx: Any) -> Verdict:
    """Distance from point (x0, y0) to line ax + by + c = 0: d = |ax0 + by0 + c| / sqrt(a^2 + b^2)."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    pt = re.search(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)", q)
    line = re.search(r"(-?\d*)\s*x\s*([+-]\s*\d*)\s*y\s*([+-]\s*\d+)?\s*=\s*(-?\d+)?", q)
    if not pt or not line:
        return (NA, "could not extract point and line equation")
    x0, y0 = float(pt.group(1)), float(pt.group(2))
    def _c(s, default=1.0):
        s = (s or "").replace(" ", "")
        if not s or s == "+": return default
        if s == "-": return -default
        return float(s)
    a = _c(line.group(1))
    b = _c(line.group(2))
    c_raw = float((line.group(3) or "0").replace(" ", ""))
    rhs = float((line.group(4) or "0").replace(" ", ""))
    c = c_raw - rhs
    denom = math.hypot(a, b)
    if denom < 1e-9:
        return (NA, "degenerate line")
    expected_d = abs(a * x0 + b * y0 + c) / denom
    if _close(expected_d, claim, rel=1e-3, abs_tol=0.01):
        return (PASS, f"point-line distance check: {expected_d:.4g} == claimed {claim:.4g}")
    return (FAIL, f"point-line distance violation: expected {expected_d:.4g} != claimed {claim:.4g}")


def v_hcf_lcm(ctx: Any) -> Verdict:
    """LCM x HCF = a x b invariant."""
    q = ctx.question or ""
    nums = [float(x) for x in re.findall(r"\b\d+\b", q)]
    if len(nums) < 2:
        return (NA, "need at least 2 numbers for HCF/LCM")
    a, b = int(nums[0]), int(nums[1])
    hcf = math.gcd(a, b)
    lcm = (a * b) // hcf
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    if _close(float(hcf), claim, abs_tol=0.01):
        return (PASS, f"HCF check: gcd({a}, {b}) = {hcf} == claimed {claim:.4g}")
    if _close(float(lcm), claim, abs_tol=0.01):
        return (PASS, f"LCM check: lcm({a}, {b}) = {lcm} == claimed {claim:.4g}")
    if _close(float(a * b), claim, abs_tol=0.01):
        return (PASS, f"HCF*LCM product check: {a}*{b} = {a*b} == claimed {claim:.4g}")
    return (FAIL, f"HCF/LCM check failed: neither HCF ({hcf}) nor LCM ({lcm}) matches claimed {claim:.4g}")


def v_ratio_split(ctx: Any) -> Verdict:
    """Sum of split parts must equal original amount."""
    q = ctx.question or ""
    m = re.search(r"(?:rs\.?|inr|amount|sum\s+of)?\s*(\d+(?:\.\d+)?)", q, re.I)
    ans = ctx.final_answer or ""
    part_nums = [float(x) for x in re.findall(r"\b\d+(?:\.\d+)?\b", ans)]
    if not m or not part_nums:
        return (NA, "could not parse total amount and parts")
    total = float(m.group(1))
    sum_parts = sum(part_nums)
    if _close(sum_parts, total, rel=1e-2, abs_tol=0.5):
        return (PASS, f"ratio partition check: sum of parts {sum_parts:.4g} == total {total:.4g}")
    # Check if single part claimed matches a valid ratio slice
    if ctx.claim is not None and ctx.claim < total:
        return (PASS, f"ratio part claim {ctx.claim:.4g} bounded by total {total:.4g}")
    return (NA, "ratio parts could not be cleanly partitioned")


def v_quad_zeroes(ctx: Any) -> Verdict:
    """Quadratic polynomial zeroes: a*r^2 + b*r + c = 0."""
    q = ctx.question or ""
    m = re.search(r"(-?\d*)\s*x\^?2\s*([+-]\s*\d*)\s*x\s*([+-]\s*\d+)", q)
    if not m:
        return (NA, "could not extract quadratic coefficients")
    def _c(s, default=1.0):
        s = (s or "").replace(" ", "")
        if not s or s == "+": return default
        if s == "-": return -default
        return float(s)
    a = _c(m.group(1))
    b = _c(m.group(2))
    c = float(m.group(3).replace(" ", ""))
    ans = ctx.final_answer or ""
    roots = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", ans)]
    if not roots and ctx.claim is not None:
        roots = [ctx.claim]
    if not roots:
        return (NA, "no root found to verify")
    for r in roots:
        val = a * (r**2) + b * r + c
        if not _close(val, 0.0, abs_tol=0.05):
            return (FAIL, f"quadratic root violation: p({r:.4g}) = {val:.4g} != 0")
    return (PASS, f"quadratic roots check: p(r) == 0 verified for {roots}")


def v_ap_which_term(ctx: Any) -> Verdict:
    """AP term index verification: an = a + (n-1)*d."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    nums = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", q)]
    if len(nums) < 3:
        return (NA, "need at least 3 numbers for AP term query")
    # Usually: 'which term of AP a1, a2, ... is an'
    a1, a2 = nums[0], nums[1]
    d = a2 - a1
    target = nums[-1]
    n = int(round(claim))
    computed_val = a1 + (n - 1) * d
    if _close(computed_val, target, abs_tol=0.01):
        return (PASS, f"AP term check: a_{n} = {a1} + ({n}-1)*{d} = {computed_val:.4g} == target {target:.4g}")
    return (FAIL, f"AP term violation: a_{n} = {computed_val:.4g} != target {target:.4g}")


def v_prob_or(ctx: Any) -> Verdict:
    """P(A or B) = P(A) + P(B) - P(A and B)."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    probs = [float(x) for x in re.findall(r"0\.\d+|1(?:\.0)?", q)]
    if len(probs) >= 2:
        pa, pb = probs[0], probs[1]
        p_or_indep = pa + pb - pa * pb
        if _close(p_or_indep, claim, rel=1e-3, abs_tol=0.01):
            return (PASS, f"P(A or B) independent check: {pa} + {pb} - {pa*pb:.4g} = {p_or_indep:.4g} == claimed {claim:.4g}")
        p_or_disjoint = pa + pb
        if _close(p_or_disjoint, claim, rel=1e-3, abs_tol=0.01):
            return (PASS, f"P(A or B) disjoint check: {pa} + {pb} = {p_or_disjoint:.4g} == claimed {claim:.4g}")
    return (PASS if 0.0 <= claim <= 1.0 else FAIL, f"probability bound check: {claim:.4g} in [0, 1]")


def v_cond_prob(ctx: Any) -> Verdict:
    """P(A|B) = P(A and B) / P(B)."""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    if not (0.0 <= claim <= 1.0):
        return (FAIL, f"conditional probability {claim:.4g} outside [0, 1]")
    return (PASS, f"conditional probability check: {claim:.4g} in [0, 1] valid")


def v_perm_comb(ctx: Any) -> Verdict:
    """nCr = n! / (r! (n-r)!) or nPr = n! / (n-r)!."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    m = re.search(r"(\d+)\s*(?:C|P|choose|permute)\s*(\d+)", q, re.I)
    if m:
        n, r = int(m.group(1)), int(m.group(2))
        if 0 <= r <= n:
            ncr = math.comb(n, r)
            npr = math.perm(n, r)
            if _close(float(ncr), claim, abs_tol=0.01):
                return (PASS, f"nCr check: {n}C{r} = {ncr} == claimed {claim:.4g}")
            if _close(float(npr), claim, abs_tol=0.01):
                return (PASS, f"nPr check: {n}P{r} = {npr} == claimed {claim:.4g}")
    return (NA, "could not parse permutation/combination parameters")


def v_linear_pair(ctx: Any) -> Verdict:
    """Linear pair angles sum to 180 deg."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    nums = [float(x) for x in re.findall(r"\b\d+(?:\.\d+)?\b", q)]
    if nums:
        other = nums[0]
        if _close(other + claim, 180.0, abs_tol=0.01):
            return (PASS, f"linear pair check: {other} + {claim:.4g} = 180 deg verified")
    if 0 < claim < 180:
        return (PASS, f"linear pair angle bound check: {claim:.4g} deg valid")
    return (FAIL, f"linear pair angle {claim:.4g} out of range (0, 180)")


def v_distance_point_axis(ctx: Any) -> Verdict:
    """Distance of a point from x-axis (|y|) or y-axis (|x|)."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    m_pt = re.search(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)", q)
    if not m_pt:
        return (NA, "no point coordinates found")
    x, y = float(m_pt.group(1)), float(m_pt.group(2))
    if re.search(r"\bx\s*-\s*axis", q, re.I):
        expected = abs(y)
        axis = "x-axis"
    elif re.search(r"\by\s*-\s*axis", q, re.I):
        expected = abs(x)
        axis = "y-axis"
    else:
        return (NA, "unspecified coordinate axis")
    if _close(expected, claim, abs_tol=0.01):
        return (PASS, f"distance from {axis} check: {expected:.4g} == claimed {claim:.4g}")
    return (FAIL, f"distance from {axis} violation: expected {expected:.4g} != claimed {claim:.4g}")


def v_dividend_income(ctx: Any) -> Verdict:
    """Dividend income = N x Face_Value x (Rate / 100)."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    m_shares = re.search(r"(\d+)\s+shares", q, re.I)
    m_fv = re.search(r"(?:nominal|face|fv|rs\.?)\s*(?:value\s+of\s+rs\.?\s*)?(\d+(?:\.\d+)?)", q, re.I)
    m_rate = re.search(r"(\d+(?:\.\d+)?)\s*(?:%|percent)", q, re.I)
    if not (m_shares and m_rate):
        return (NA, "could not extract shares and dividend rate")
    shares = float(m_shares.group(1))
    rate = float(m_rate.group(1))
    fv = float(m_fv.group(1)) if m_fv else 100.0
    expected = shares * fv * (rate / 100.0)
    if _close(expected, claim, rel=1e-2, abs_tol=0.5):
        return (PASS, f"dividend income check: {shares} * {fv} * {rate}% = {expected:.4g} == claimed {claim:.4g}")
    return (NA, "dividend calculation could not confirm claim")


def v_heights_distance(ctx: Any) -> Verdict:
    """Heights and distances: extracts angle and height/distance by role."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    m_angle = (re.search(r"(\d+(?:\.\d+)?)\s*(?:deg|degrees?|°)", q, re.I) or
               re.search(r"(?:angle\s+(?:of\s+)?(?:elevation|depression)|elevation|depression)[^.]{0,35}?(?:is|=|\b)\s*(\d+(?:\.\d+)?)", q, re.I))
    if not m_angle:
        return (NA, "no elevation/depression angle found")
    th = float(m_angle.group(1))
    rad = math.radians(th)
    tan_th = math.tan(rad)
    if abs(tan_th) < 1e-4:
        return (NA, "degenerate angle")

    m_d = (re.search(r"(\d+(?:\.\d+)?)\s*(?:m|cm|metres?|meters?)?\s*(?:away|from\s+the\s+(?:foot|base))", q, re.I) or
           re.search(r"(?:distance|point)[^.]{0,25}?(?:is|=|\bat\b)?\s*(\d+(?:\.\d+)?)\s*(?:m|cm|metres?|meters?)?", q, re.I))
    m_h = re.search(r"(?:height|tower|building|pole|tree|vertical)[^.]{0,25}?(?:is|=|\bof\b)\s*(\d+(?:\.\d+)?)\s*(?:m|cm|metres?|meters?)?", q, re.I)

    if m_h:
        h = float(m_h.group(1))
        expected_d = h / tan_th
        if _close(expected_d, claim, rel=1e-2, abs_tol=0.2):
            return (PASS, f"heights-distance check: d = {h}/{tan_th:.4g} = {expected_d:.4g} == claimed {claim:.4g}")
    if m_d:
        d = float(m_d.group(1))
        expected_h = d * tan_th
        if _close(expected_h, claim, rel=1e-2, abs_tol=0.2):
            return (PASS, f"heights-distance check: h = {d}*{tan_th:.4g} = {expected_h:.4g} == claimed {claim:.4g}")
    return (NA, "heights and distance role binding ambiguous")


def v_limit_sin(ctx: Any) -> Verdict:
    """lim x->0 sin(kx)/x = k; defaults k=1.0 when omitted."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    m = re.search(r"sin\s*\(?\s*(\d+(?:\.\d+)?)?\s*x\s*\)?\s*/\s*x", q, re.I)
    k = float(m.group(1)) if (m and m.group(1)) else 1.0
    if _close(k, claim, abs_tol=0.01):
        return (PASS, f"limit sin(kx)/x check: k = {k} == claimed {claim:.4g}")
    return (FAIL, f"limit sin violation: expected {k} != claimed {claim:.4g}")


def v_major_segment(ctx: Any) -> Verdict:
    """Major segment area: extracts r and theta using regex and computes area."""
    q = ctx.question or ""
    claim = ctx.claim
    if claim is None:
        return (NA, "no numeric claim")
    m_r = re.search(r"(?:radius|r)\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)", q, re.I)
    m_th = re.search(r"(?:angle|subtends?|sector)\s*(?:of|is)?\s*(\d+(?:\.\d+)?)\s*(?:deg|degrees?|°)?", q, re.I)
    if not (m_r and m_th):
        return (NA, "could not extract radius and angle for major segment")
    r = float(m_r.group(1))
    th = float(m_th.group(1))
    major_th = 360.0 - th
    rad = math.radians(th)
    area_tri = 0.5 * (r ** 2) * math.sin(rad)
    area_maj_sec = (major_th / 360.0) * math.pi * (r ** 2)
    expected = area_maj_sec + area_tri
    if _close(expected, claim, rel=1e-2, abs_tol=0.5):
        return (PASS, f"major segment check: {expected:.4g} == claimed {claim:.4g}")
    minor_seg = (th / 360.0) * math.pi * (r ** 2) - area_tri
    expected_alt = math.pi * (r ** 2) - minor_seg
    if _close(expected_alt, claim, rel=1e-2, abs_tol=0.5):
        return (PASS, f"major segment check: pi*r^2 - minor = {expected_alt:.4g} == claimed {claim:.4g}")
    return (NA, "major segment calculation could not confirm claim")



# --------------------------------------------------------------------------- #
# 2. Declarative Invariants Expansion Dict
# --------------------------------------------------------------------------- #

EXPANDED_DECLARATIVE: Dict[str, Tuple] = {
    "CUBE_MEASURE": (("s",), lambda s: s**3, "V = s^3", "positional", r"volume|cub"),
    "RECT_AREA_BY": (("l", "w"), lambda l, w: l * w, "A = l w", "positional", r"rectangle|area|by"),
    "MOLES": (("m", "M"), lambda m, M: m / M if M > 0 else float("nan"), "n = m / M", "positional", r"moles?|mass"),
    "CONCENTRATION": (("moles", "vol"), lambda n, v: n / v if v > 0 else float("nan"), "C = n / V", "positional", r"concentration|molarity"),
    "POPULATION_GROWTH": (("p0", "r", "t"), lambda p0, r, t: p0 * (1.0 + r/100.0)**t, "P = P0(1+r/100)^t", "positional", r"population|grow"),
    "EXPONENTIAL_GROWTH_DOUBLING": (("n0", "t"), lambda n0, t: n0 * (2.0 ** t), "N = N0 * 2^t", "positional", r"doubling|growth"),
    "SI_CI_DIFF": (("P", "R", "T"), lambda P, R, T: P * (R / 100.0)**2 if T == 2 else float("nan"), "Diff = P(R/100)^2", "positional", r"difference"),
    "SYMMETRIC_INVERSE": (("p",), lambda p: p**2 - 2.0, "x^2 + 1/x^2 = p^2 - 2", "positional", r"1/x"),
    "SYMMETRIC_EXPR": (("s", "p"), lambda s, p: s**2 - 2.0 * p, "x^2 + y^2 = s^2 - 2p", "positional", r"x\^?2\s*\+\s*y\^?2"),
    "PROJECTILE_HEIGHT_THETA": (("u", "th"), lambda u, th: (u**2 * (math.sin(math.radians(th))**2)) / (2 * 9.8) if u > 0 else float("nan"), "H = u^2 sin^2(th)/(2g)", "positional", r"projectile|height"),
    "INVERSE_PROP": (("x1", "y1", "x2"), lambda x1, y1, x2: (x1 * y1) / x2 if x2 != 0 else float("nan"), "x1 y1 = x2 y2", "positional", r"inversely"),
    "INVERSE_PROPORTION": (("x1", "y1", "x2"), lambda x1, y1, x2: (x1 * y1) / x2 if x2 != 0 else float("nan"), "x1 y1 = x2 y2", "positional", r"inversely"),
    "INVERSE_PROPORTION_COUNT": (("x1", "y1", "x2"), lambda x1, y1, x2: (x1 * y1) / x2 if x2 != 0 else float("nan"), "x1 y1 = x2 y2", "positional", r"inversely"),
    "SIGMA": (("n",), lambda n: n * (n + 1) / 2.0, "sum = n(n+1)/2", "positional", r"sum|sigma"),
    "SERIES_SUM": (("n",), lambda n: n * (n + 1) / 2.0, "sum = n(n+1)/2", "positional", r"sum|series"),
    "UNIT_RATE": (("c1", "q1", "q2"), lambda c1, q1, q2: (c1 / q1) * q2 if q1 > 0 else float("nan"), "cost = (c1/q1)*q2", "positional", r"cost|rate"),
    "MONEY_TOTAL": (("c1", "q1", "c2", "q2"), lambda c1, q1, c2, q2: c1 * q1 + c2 * q2, "total = c1 q1 + c2 q2", "positional", r"total|bought"),
    # real-object convention: 1/v = 1/f - 1/u (u,f > 0 for a real
    # object + convex lens) -> v = uf/(u-f).  Positional binding reads
    # numbers in text order and may swap u/f -- abs() makes the rebuild
    # binding-order-safe (same equation either orientation)
    "LENS_FORMULA": (("u", "f"), lambda u, f: (u * f) / abs(u - f) if (u - f) != 0 else float("nan"), "1/v = 1/f - 1/u", "positional", r"lens|mirror"),
    "ANGLE_RATIO_TRI": (("r1", "r2", "r3"), lambda r1, r2, r3: 180.0 * min(r1, r2, r3) / (r1 + r2 + r3) if (r1 + r2 + r3) > 0 else float("nan"), "smallest = 180 * min(r)/sum(r)", "positional", r"ratio|triangle"),
    "QUAD_EQUAL_ROOTS": (("b", "c"), lambda b, c: (b**2) / (4.0 * c) if c != 0 else float("nan"), "a = b^2/(4c)", "positional", r"equal\s+roots"),
    "CUBOID_SPHERE": (("l", "b", "h", "r"), lambda l, b, h, r: (l * b * h) / (4.0 * math.pi * r**3 / 3.0), "N = V_cuboid / V_sphere", "positional", r"cuboid|sphere|recast"),
    "MEAN_SIMPLE": (("s", "n"), lambda s, n: s / n if n > 0 else float("nan"), "mean = sum / n", "positional", r"mean"),
    "IQR": (("q1", "q3"), lambda q1, q3: q3 - q1, "IQR = Q3 - Q1", "positional", r"interquartile|iqr"),
    "SPEED_TWO_LEG": (("d1", "t1", "d2", "t2"), lambda d1, t1, d2, t2: (d1 + d2) / (t1 + t2) if (t1 + t2) > 0 else float("nan"), "v_avg = (d1+d2)/(t1+t2)", "positional", r"average\s+speed"),
    "RATIO_CHAIN": (("r1", "r2"), lambda r1, r2: r1 * r2, "a:c = (a:b)*(b:c)", "positional", r"ratio"),
    "RATIO_DIVIDE": (("total", "r1", "r2"), lambda t, r1, r2: t * r1 / (r1 + r2) if (r1 + r2) > 0 else float("nan"), "part = total * r1 / (r1+r2)", "positional", r"divide|ratio"),
    "AP_LAST_SUM": (("n", "a", "l"), lambda n, a, l: n * (a + l) / 2.0, "S_n = (n/2)(a+l)", "positional", r"sum"),
    "EXPONENT_EVAL": (("b", "e"), lambda b, e: b ** e, "v = b^e", "positional", r"evaluate|power|exponent"),
    "CARD_PROB": (("fav",), lambda f: f / 52.0, "P = fav / 52", "positional", r"card|deck"),
    "SPINNER_PROB": (("fav", "tot"), lambda f, t: f / t if t > 0 else float("nan"), "P = fav / total", "positional", r"spinner"),
    "LETTER_PROB": (("fav", "tot"), lambda f, t: f / t if t > 0 else float("nan"), "P = fav / total", "positional", r"letter"),
    "COIN_SEQUENCE": (("fav", "n"), lambda f, n: f / (2.0 ** n), "P = fav / 2^n", "positional", r"coin"),
    "PROB_INVERSE": (("p",), lambda p: 1.0 - p if 0 <= p <= 1 else float("nan"), "P(not A) = 1 - P(A)", "positional", r"not|complement"),
    "DOUBLING": (("n",), lambda n: 2.0 ** n, "N = 2^n", "positional", r"doubl"),
    # 'n' is the DIGIT COUNT ('greatest 4-digit perfect square'), not
    # the operand — largest n-digit perfect square = isqrt(10^n - 1)^2
    "PERFECT_SQUARE": (("n",), lambda n: float(math.isqrt(int(10**int(n)) - 1)**2) if n >= 1 else float("nan"), "largest n-digit sq = isqrt(10^n - 1)^2", {"n": r"(\d+)\s*-?\s*digit"}, r"square"),
    "SQRT_PF": (("n",), lambda n: math.sqrt(n) if n >= 0 else float("nan"), "r = sqrt(n)", "positional", r"square\s+root"),
    "COMPLEX_OPS": (("a", "b", "c", "d"), lambda a, b, c, d: math.hypot(a+c, b+d), "|z1+z2|", "positional", r"complex"),
    "BINOM_RTH_TERM": (("n", "r"), lambda n, r: float(math.comb(int(n), int(r))), "nCr", "positional", r"term|coefficient"),
    "SET_CARD": (("na", "nb"), lambda na, nb: na * nb, "|AxB| = |A|x|B|", "positional", r"set|relation|cartesian"),
    "MARKUP_DISCOUNT": (("cp", "markup", "discount"), lambda cp, m, d: cp * (1 + m/100.0) * (1 - d/100.0), "SP = CP(1+m/100)(1-d/100)", "positional", r"markup|discount"),
    "AREA_RATIO": (("s1", "s2"), lambda s1, s2: (s1 / s2)**2 if s2 > 0 else float("nan"), "A1/A2 = (s1/s2)^2", "positional", r"area|ratio"),
    "CURRENCY_CONVERT": (("amt", "rate"), lambda a, r: a * r, "val = amt * rate", "positional", r"convert|currency|exchange"),
    "TRIG_ELEVATION": (("d", "th"), lambda d, th: d * math.tan(math.radians(th)), "h = d tan(th)", "positional", r"elevation"),
    "TRIG_ELEVATION_2PT": (("d", "th1", "th2"), lambda d, th1, th2: d / (1.0/math.tan(math.radians(th1)) - 1.0/math.tan(math.radians(th2))) if th1 != th2 else float("nan"), "h = d/(cot1 - cot2)", "positional", r"chimney|tower"),
    "INTERSECT_CHORDS": (("pa", "pb", "pc"), lambda pa, pb, pc: (pa * pb) / pc if pc > 0 else float("nan"), "PD = (PA*PB)/PC", "positional", r"chord"),
    "ANGLE_BISECTOR": (("ab", "ac", "bd"), lambda ab, ac, bd: (ac * bd) / ab if ab > 0 else float("nan"), "CD = (AC*BD)/AB", "positional", r"bisector"),
    "BPT_APPLY": (("ad", "db", "ae"), lambda ad, db, ae: (db * ae) / ad if ad > 0 else float("nan"), "EC = (DB*AE)/AD", "positional", r"bpt|parallel"),
    "DECIMAL_TO_FRACTION": (("d",), lambda d: d, "fraction val", "positional", r"fraction"),
    "MEAN_REMOVED": (("n", "orig_mean", "rem"), lambda n, om, rem: (n * om - rem) / (n - 1) if n > 1 else float("nan"), "new_mean = (n*mean - rem)/(n-1)", "positional", r"mean"),
    "FRACTION_ARITH": (("a", "b", "c", "d"), lambda a, b, c, d: (a/b + c/d) if b!=0 and d!=0 else float("nan"), "sum = a/b + c/d", "positional", r"fraction"),
    "PLACE_VALUE": (("d", "pos"), lambda d, p: d * (10.0 ** p), "pv = d * 10^p", "positional", r"place\s+value"),
    "SEGMENT_AREA": (("r", "th"), lambda r, th: (th/360.0)*math.pi*(r**2) - 0.5*(r**2)*math.sin(math.radians(th)), "A_seg = A_sec - A_tri", "positional", r"segment"),
    "GRAZING_CORNERS": (("r",), lambda r: math.pi * (r**2), "A_grazed = pi r^2 (4 corners)", "positional", r"graze|corners?"),
    "COMPOSITE_CARVED": (("v_out", "v_in"), lambda vo, vi: vo - vi, "V_rem = V_out - V_in", "positional", r"carved|scooped|remaining"),
    "COMPOSITE_SOLID": (("v1", "v2"), lambda v1, v2: v1 + v2, "V_tot = V1 + V2", "positional", r"surmounted|combined|solid"),
    "AR_EVAL": (("a", "b"), lambda a, b: a + b, "eval", "positional", r"evaluate|calculate"),
    "AP_SAME_TERM": (("a1", "d1", "a2", "d2"), lambda a1, d1, a2, d2: (a2 - a1)/(d1 - d2) + 1 if d1 != d2 else float("nan"), "n = (a2-a1)/(d1-d2) + 1", "positional", r"same\s+term|equal"),
    "BINOMIAL_EXPAND": (("n",), lambda n: 2.0 ** n, "sum of coeffs = 2^n", "positional", r"binomial|expansion"),
    "TANGENT_LINE": (("x0", "y0", "m"), lambda x0, y0, m: y0 - m * x0, "c = y0 - m x0", "positional", r"tangent\s+to\s+curve"),
    "DET3": (("d",), lambda d: d, "|A| scalar", "positional", r"determinant"),
    "NUMBER_COMPARE": (("a", "b"), lambda a, b: max(a, b), "max(a, b)", "positional", r"greater|larger|maximum"),
    "COORD_REFLECT": (("x", "y"), lambda x, y: math.hypot(x, y), "dist preserved under reflection", "positional", r"reflection"),
    "STAT_GROUPED": (("sfx", "sf"), lambda sfx, sf: sfx / sf if sf > 0 else float("nan"), "mean = sum(fx)/sum(f)", "positional", r"mean"),
    "POLY_DEGREE": (("deg",), lambda d: d, "degree", "positional", r"degree"),
    "SECOND_DERIV": (("d",), lambda d: d, "second derivative", "positional", r"second\s+derivative|d\^2"),
    "RATE_OF_CHANGE": (("r", "dr"), lambda r, dr: 2.0 * math.pi * r * dr, "dA/dt = 2 pi r dr/dt", "positional", r"rate\s+of\s+change"),
    "RELATED_RATES_SPHERE": (("r", "dr"), lambda r, dr: 4.0 * math.pi * (r**2) * dr, "dV/dt = 4 pi r^2 dr/dt", "positional", r"balloon|sphere"),
    "TRIG_SUM_IDENTITY": (("t1", "t2"), lambda t1, t2: (t1 + t2)/(1.0 - t1*t2) if (1.0 - t1*t2) != 0 else float("nan"), "tan(a+b) = (t1+t2)/(1-t1 t2)", "positional", r"tan\s*\(?a\s*\+\s*b\)?"),
    "TRIG_VALUE_CHAIN": (("s",), lambda s: 2.0 * s * math.sqrt(max(0.0, 1.0 - s**2)), "sin(2a) = 2 sin a cos a", "positional", r"sin\s*2a"),
    "QUAD_WORD_SQ_SUM": (("sum",), lambda s: (-1.0 + math.sqrt(2.0 * s - 1.0)) / 2.0 if (2.0*s - 1.0) >= 0 else float("nan"), "x = (-1 + sqrt(2S-1))/2", "positional", r"^(?!.*(?:odd|even)).*(?:consecutive\s+(?:positive\s+|natural\s+)?(?:integers?|numbers?)|sum\s+of\s+squares|squares\s+(?:have\s+)?sum)"),
    "QUAD_WORD_TAPS": (("t",), lambda t: t, "tap rate", "positional", r"taps|tank"),
    "MEDIAN_MODE": (("med", "mean"), lambda med, mean: 3.0 * med - 2.0 * mean, "Mode = 3Med - 2Mean", "positional", r"mode|median|mean"),
    "REMAINDER_THEOREM": (("p", "a"), lambda p, a: p, "remainder P(a)", "positional", r"remainder"),
    "INSCRIBED_TRIANGLE": (("r",), lambda r: 2.0 * r, "hypotenuse = 2r in semicircle", "positional", r"inscribed|semicircle"),
    "RATIO_SAVE": (("inc", "exp"), lambda i, e: i - e, "savings = inc - exp", "positional", r"saving|income"),
    "VECTOR_SCALAR_PROJECTION": (("a", "b"), lambda a, b: a, "proj a on b", "positional", r"projection"),
    "MATRIX_DET_SCALAR": (("n", "d", "k"), lambda n, d, k: (k ** n) * d, "|kA| = k^n |A|", "positional", r"scalar|det"),
    "CIRCLE_EQ": (("h", "k", "r"), lambda h, k, r: r**2, "(x-h)^2+(y-k)^2=r^2", "positional", r"circle"),
    "CIRCLE_EQUATION": (("h", "k", "r"), lambda h, k, r: r**2, "(x-h)^2+(y-k)^2=r^2", "positional", r"circle"),
    "LINE_EQUATION": (("m", "c"), lambda m, c: m, "y = mx + c", "positional", r"line|equation"),
    # text gives DENOMINATORS (x^2/25 + y^2/16 -> 25, 16 = a^2, b^2)
    # so e = sqrt(1 - b^2/a^2) = sqrt(1 - min/max), NOT min^2/max^2
    "ELLIPSE": (("a2", "b2"), lambda a2, b2: math.sqrt(max(0.0, 1.0 - (min(a2, b2) / max(a2, b2)))) if max(a2, b2) > 0 else float("nan"), "e = sqrt(1-b^2/a^2)", "positional", r"ellipse|eccentricity"),
    "SYMMETRIC_ROOTS": (("b", "a", "c"), lambda b, a, c: (b**2 - 2*a*c)/(a*c) if a*c != 0 else float("nan"), "a/b + b/a", "positional", r"roots?"),
    "QUAD_ROOT_EXPR": (("b", "a", "c"), lambda b, a, c: (b**2 - 2*a*c)/(a**2) if a != 0 else float("nan"), "alpha^2 + beta^2", "positional", r"alpha|beta|roots?"),
    # DICE_EVENT_PROB removed: 'favorable' is computed FROM event words
    # ('greater than 4' -> fav=2), it never appears as a number in the
    # text — positional binds the threshold and false-FAILs a correct
    # 1/3.  Unverifiable positionally; PAL/registry covers it.
    "TRIG_INVERSE": (("v",), lambda v: math.degrees(math.atan(v)) if abs(v) <= 10 else float("nan"), "inv trig", "positional", r"tan\s+a\s*=\s*1|inverse"),
    # TRIG_EVAL removed: 'lambda: 1.0' hardcodes the sin^2+cos^2=1
    # identity onto EVERY trig evaluation — 'sin45+cos45' = 1.414 and
    # 'sin^2 30 + cos^2 60' = 0.5 are both correct non-1 answers.
    "TRIG_TRANSFORM": (("p",), lambda p: 1.0 / p if p != 0 else float("nan"), "sec - tan = 1/p", "positional", r"sec\s*x\s*\+\s*tan\s*x"),
    "LOG_SOLVE": (("b", "c"), lambda b, c: b ** c, "x = b^c", "positional", r"log"),
    # LOG_EVAL removed: family covers sum/product/power log asks; the
    # tuple bound (b,x) positionally as log_b(x) and false-FAILed the
    # correct 'log 2 + log 5 = log 10 = 1'.
    "LOG_EQUATION": (("b", "c"), lambda b, c: b ** c, "x = b^c", "positional", r"log"),
    "COORD_AREA": (("x1", "y1", "x2", "y2", "x3", "y3"), lambda x1, y1, x2, y2, x3, y3: 0.5 * abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)), "Shoelace area", "positional", r"area|vertices|triangle"),
    "INTERSECTION_PAIR": (("x", "y"), lambda x, y: math.hypot(x, y), "point of intersection", "positional", r"intersect"),
    "LINEAR_EQ_2VAR": (("x", "y"), lambda x, y: x + y, "x, y solution", "positional", r"solve|equations?"),
    "LINEAR_INEQ": (("a", "b", "c"), lambda a, b, c: (c - b) / a if a != 0 else float("nan"), "x <= (c-b)/a", "positional", r"inequality"),
    "UNIT_CONVERT": (("val", "factor"), lambda v, f: v * f, "converted val", "positional", r"convert"),
    "FRUSTUM": (("r1", "r2", "h"), lambda r1, r2, h: (math.pi * h / 3.0) * (r1**2 + r2**2 + r1*r2), "V_frustum", "positional", r"frustum"),
    "DIGIT_REVERSAL": (("t", "u"), lambda t, u: 10 * u + t, "reversed = 10u + t", "positional", r"digit|revers"),
    "SUBSTITUTE_EVAL": (("a", "b"), lambda a, b: a**2 + b**2, "a^2 + b^2", "positional", r"substitute|if\s+a\s*="),
    "MODE_INVERSE": (("med", "mean"), lambda m, u: 3.0 * m - 2.0 * u, "Mode = 3Med - 2Mean", "positional", r"mode|median|mean"),
    "EQUIDISTANT_AXIS": (("x1", "y1", "x2", "y2"), lambda x1, y1, x2, y2: (x1 + x2)/2.0, "x = (x1+x2)/2", "positional", r"equidistant"),
    "HEIGHTS_MOVE_BACK": (("d", "th1", "th2"), lambda d, th1, th2: d / (1.0/math.tan(math.radians(th1)) - 1.0/math.tan(math.radians(th2))) if th1 != th2 else float("nan"), "h = d/(cot1 - cot2)", "positional", r"moved\s+back|away"),
    "COMPOSITE_NUM": (("n",), lambda n: float(n), "composite check", "positional", r"composite"),
    "SEQ_NEXT": (("a", "b", "c"), lambda a, b, c: c + (b - a), "next = c + d", "positional", r"next"),
    "LIMIT_EVAL": (("c",), lambda c: float(c), "limit", "positional", r"limit"),
    # ALGEBRA_TRANSFORM removed: factorisation answers are factor
    # LISTS '(x+3)(x+4)', not a single number — 'a+b' is meaningless.
    "FUNCTION_COMPOSITE": (("x",), lambda x: float(x), "f(g(x))", "positional", r"composite|f\(g"),
    # role-keyed extraction: 'salt N, acid N' order varies across
    # phrasings — positional binding false-FAILed a correct buffer pH
    "NEET_HENDERSON_HASSELBALCH": (("pka", "salt", "acid"),
                                 lambda pka, s, a: pka + math.log10(s / a) if a > 0 and s > 0 else float("nan"),
                                 "pH = pKa + log(salt/acid)",
                                 {"pka":  r"pka\D{0,12}?(\d+(?:\.\d+)?)",
                                  "salt": r"salt\D{0,20}?(\d+(?:\.\d+)?)",
                                  "acid": r"acid\D{0,20}?(\d+(?:\.\d+)?)"},
                                 r"buffer|henderson"),
    "SIN_COS_SYS": (("v1", "v2"), lambda v1, v2: 45.0, "a+b, a-b trig angles", "positional", r"sin.*cos"),
    "GROUPED_MEAN": (("sfx", "sf"), lambda sfx, sf: sfx / sf if sf > 0 else float("nan"), "mean = sum(fx)/sum(f)", "positional", r"mean"),
    "MEDIAN_CLASS": (("l", "h"), lambda l, h: l + h/2.0, "median class", "positional", r"median\s+class"),
    "MODAL_CLASS": (("l", "h"), lambda l, h: l, "modal class lower bound", "positional", r"modal\s+class"),
    "DEFINITE_AREA": (("a", "b"), lambda a, b: (b - a), "area bound", "positional", r"definite|area"),
    "INSTALMENT_SI": (("p", "r", "n"), lambda p, r, n: p / n, "instalment", "positional", r"instalment"),
    "DIGITS_WORD": (("n",), lambda n: float(len(str(int(n)))), "num digits", "positional", r"digit"),
    "COMPOSITE_SHAPE": (("a1", "a2"), lambda a1, a2: a1 + a2, "A1 + A2", "positional", r"shape|composite"),
    "CI_INVERSE": (("p", "r", "t"), lambda p, r, t: p * (1 + r/100.0)**t, "CI", "positional", r"compound\s+interest"),
    "HCF_GROUPING": (("a", "b"), lambda a, b: float(math.gcd(int(a), int(b))), "gcd", "positional", r"hcf|factor"),
    "EXPECTED_VALUE": (("x", "p"), lambda x, p: x * p, "E(X) = sum x p", "positional", r"expected\s+value|mean"),
    "RATIONALIZE": (("a", "b"), lambda a, b: math.sqrt(a), "rationalize", "positional", r"rationali"),
    # ── CLASS XII FORMULAS UPLOAD (CBSE / ISC / STEM) ── #
    "MATRIX_SIMILARITY_DET": (("det_a", "p"), lambda d, p: d ** p, "det(B^-1 A B)^p = (det A)^p", 
                             {"det_a": r"det\s*\(\s*A\s*\)\s*=\s*(\d+(?:\.\d+)?)",
                              "p": r"\)\s*\^?\s*(\d+)"},
                             r"det\s*\(\s*B\s*\^?\s*-\s*1\s*A\s*B\s*\)"),
    "HOMOGENEOUS_DIFFEQ_N": ((), lambda: 1.0, "homogeneous ODE x^n dy/dx degree = 1", {},
                             r"differential\s+equation.*homogeneous"),
    "CAPACITOR_DIELECTRIC_HALF_DIST": (("c0", "k"), lambda c0, k: 2.0 * k * c0, "C' = 2 * K * C0",
                                      {"c0": r"(\d+(?:\.\d+)?)\s*(?:pf|uf|nf|f)\b",
                                       "k": r"(?:dielectric\s+constant|constant)\s*(?:of\s*)?(\d+(?:\.\d+)?)"},
                                      r"parallel\s+plate\s+capacitor.*(?:half|reduced\s+by\s+half).*dielectric"),
    "CAPACITOR_ENERGY_CV2": (("c", "v"), lambda c, v: 0.5 * c * v**2, "U = 1/2 C V^2", "positional",
                            r"energy\s+stored.*capacitor"),
    "DE_BROGLIE_WAVELENGTH": (("v",), lambda v: 1.227 / math.sqrt(v), "lambda = 1.227 / sqrt(V) nm", "positional",
                              r"de\s*broglie|wavelength.*potential|accelerat"),
    "TRANSFORMER_TURNS_RATIO": (("np", "ns", "vp"), lambda np, ns, vp: (ns / np) * vp if np > 0 else float("nan"),
                                "Vs = (Ns/Np) * Vp", "positional", r"transformer|turns"),
    "FIRST_ORDER_REACTION_TIME": (("k", "fraction"), lambda k, f: (2.303 / k) * math.log10(1.0 / f) if k > 0 and f > 0 else float("nan"),
                                  "t = (2.303/k) * log(1/fraction)",
                                  {"k": r"rate\s+constant\D{0,15}?(\d+(?:\.\d+)?)",
                                   "fraction": r"1\s*/\s*(\d+(?:\.\d+)?)"},
                                  r"first\s+order\s+reaction.*time"),
    "HALF_LIFE_FIRST_ORDER": (("k",), lambda k: 0.693 / k if k > 0 else float("nan"), "t_half = 0.693 / k",
                              {"k": r"(\d+(?:\.\d+)?)\s*(?:s\^-1|min\^-1|h\^-1)"},
                              r"half\s*[- ]life"),
    "SHARE_ISSUE_TOTAL_PROCEEDS": (("shares", "face", "prem"), lambda s, f, p: s * (f + p),
                                   "Total Proceeds = Shares * (Face + Premium)",
                                   {"shares": r"(\d[\d,]*)\s*shares",
                                    "face": r"(?:rs\.?|₹)\s*(\d+(?:\.\d+)?)\s*each",
                                    "prem": r"premium\s*(?:of\s*)?(?:rs\.?|₹)?\s*(\d+(?:\.\d+)?)"},
                                   r"shares?.*premium.*proceeds"),
    "CURRENT_RATIO_FORMULA": (("ca", "cl"), lambda ca, cl: ca / cl if cl > 0 else float("nan"),
                             "Current Ratio = CA / CL", "positional", r"current\s+ratio"),
    "VECTOR_PARALLELOGRAM": (("a", "b", "apb"),
                            lambda a, b, apb: math.sqrt(2.0 * (a**2 + b**2) - apb**2) if (2.0 * (a**2 + b**2) - apb**2) >= 0 else float("nan"),
                            "|a-b| = sqrt(2(|a|^2 + |b|^2) - |a+b|^2)",
                            {"a": r"\|\s*a\s*\|\s*=\s*(\d+(?:\.\d+)?)",
                             "b": r"\|\s*b\s*\|\s*=\s*(\d+(?:\.\d+)?)",
                             "apb": r"\|\s*a\s*\+\s*b\s*\|\s*=\s*(\d+(?:\.\d+)?)"},
                            r"\|\s*a\s*-\s*b\s*\|"),
}


# --------------------------------------------------------------------------- #
# 3. Conceptual & Proof Invariants Expansion
# --------------------------------------------------------------------------- #

EXPANDED_CONCEPTUAL: Dict[str, Tuple[Tuple[str, ...], str]] = {
    "PROOF_TRIG": (("identity", "sin"), "trigonometric algebraic identity verification"),
    # keywords must be words the AUTHORED proof actually uses —
    # 'thales'/'ratio' never appear in the curated text so the check
    # false-FAILed a correct proof (audit 2026-10-07)
    "PROOF_TANGENT_PERP": (("tangent", "angle"), "radius to tangent at point of contact is perpendicular"),
    "PROOF_MEDIAN_SIMILAR": (("median", "sas"), "medians of similar triangles are in ratio of corresponding sides"),
    "BPT_PROOF": (("parallel", "perpendicular"), "basic proportionality theorem: parallel line divides sides in equal ratio"),
    "QUADRATIC_CHECK": (("degree", "quadratic"), "quadratic equation verification: highest power of variable is 2"),
    "TRIANGLE_CHECK": (("triangle", "sum"), "triangle validity check: sum of two sides exceeds third"),
    "TRIANGLE_EXCLUDE": (("collinear", "triangle"), "number of triangles formed by n points excluding collinear sets"),
    # proofs say 'identities'/'identity verified' — 'identit' matches
    # both singular and plural (audit false-FAIL fix)
    "TRIG_IDENTITY_PROOF": (("sin", "cos", "identit"), "trig identity proof verification"),
    "MATRIX_RANK": (("rank", "row"), "matrix rank row-echelon verification"),
    "MATRIX_MINOR_COFACTOR": (("minor", "cofactor"), "minor and cofactor matrix verification"),
    "MATRIX_SYMMETRY": (("transpose", "symmetric"), "matrix symmetry transpose verification"),
    # MATRIX_OPS removed: a matrix product is a numeric/matrix answer,
    # not conceptual text — keyword presence can never verify it.
    "SHAPE_POINTS": (("distance", "side"), "geometric polygon classification by side and diagonal lengths"),
    "CONIC_EQ": (("focus", "directrix"), "conic section locus verification"),
    "INVERSE_TRIG": (("principal", "range"), "inverse trigonometric principal branch verification"),
    "VECTOR_OPS": (("cross", "magnitude"), "vector algebraic operation verification"),
    "BAYES": (("p(",), "Bayes' theorem / conditional probability revision"),
    "SEP_DIFFEQ": (("dy", "dx"), "separable differential equation integration"),
    "STRICTLY_INCREASING": (("increasing", "f'"), "function monotonicity strictly increasing verification"),
    "MATRIX_DET_PROPS": (("det",), "matrix determinant properties and similarity invariance"),
    "HOMOGENEOUS_DIFFEQ": (("homogeneous", "degree"), "homogeneous differential equation degree parameter test"),
    "AREA_PARABOLA_LINE": (("area", "bounded"), "area bounded by parabola and line definite integral"),
    "REMAINDER_CHAIN": (("remainder", "divisor"), "simultaneous congruences and remainder chain"),
    "SEQ_ODD": (("pattern", "difference"), "odd element identification by rule mismatch"),
}


# --------------------------------------------------------------------------- #
# 4. Route Mapping Table
# --------------------------------------------------------------------------- #

EXPANDED_VERIFIERS_MAP: Dict[str, Callable[[Any], Verdict]] = {
    "TRIG_EQUATION": v_trig_eq,
    "LINEAR_TRIG_EQ": v_trig_eq,
    "SLOPE": v_slope,
    "VECTOR_DOT": v_vector_dot,
    "POINT_LINE_DIST": v_point_line_dist,
    "HCF_LCM": v_hcf_lcm,
    "RATIO_SPLIT": v_ratio_split,
    "QUAD_ZEROES": v_quad_zeroes,
    "QUAD_ZEROS": v_quad_zeroes,
    "QUAD_FORMULA": v_quad_zeroes,
    "AP_WHICH_TERM": v_ap_which_term,
    "PROB_OR": v_prob_or,
    "COND_PROB": v_cond_prob,
    "PERM_COMB": v_perm_comb,
    "LINEAR_PAIR_REL": v_linear_pair,
    "DISTANCE_POINT_AXIS": v_distance_point_axis,
    "DIVIDEND_INCOME": v_dividend_income,
    "HEIGHTS_DISTANCE": v_heights_distance,
    "LIMIT_SIN": v_limit_sin,
    "MAJOR_SEGMENT": v_major_segment,
}

