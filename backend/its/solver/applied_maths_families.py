"""applied_maths_families.py -- typed formula families for CBSE
Applied Mathematics, classes 11-12.

Same contract as syllabus_families.py: one TABLE of rows
(id, trigger regex with named slots, compute function) plus a single
deterministic dispatcher (model_applied_maths).  Recognition is by
trigger regex only -- no LLM, no randomness.  Every family computes a
closed form with math.comb / math.log / math.pow, shows the steps, and
enforces plausibility gates (positive quantities where required, no
zero denominators, valid log arguments, probabilities inside [0, 1],
overflow bounds on compound growth).

Coverage (18 families):
  logs       LOG_SOLVE, LOG_PROPERTIES
  matrices   MATRIX_ADD, MATRIX_MULTIPLY, MATRIX_INVERSE_2X2
  calculus   LIMIT_FACTOR, DERIVATIVE_POWER, DERIVATIVE_EVAL,
             INTEGRAL_BASIC, AREA_UNDER_CURVE, RATE_OF_CHANGE
  binomial   BINOMIAL_TERM, PROBABILITY_BINOMIAL
  finance    EMI, ANNUITY, CAGR
  statistics INDEX_NUMBER, TIME_SERIES_TREND
"""

from __future__ import annotations

import math
import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# helpers (same _no / _yes pattern as syllabus_families.py)
# --------------------------------------------------------------------------- #


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


def _fmt(v: float) -> str:
    """Compact deterministic number formatting for steps and answers."""
    return str(int(round(v))) if abs(v - round(v)) < 1e-9 else f"{v:.6g}"


def _plist(s: str) -> List[float]:
    return [float(x.replace(",", ""))
            for x in re.findall(r"\d+(?:\.\d+)?", s or "")]


_NUM = r"-?\d+(?:\.\d+)?"
_SQ = r"(?:\^2|\*\*2|\u00b2)"          # x^2, x**2 or x with superscript 2
_RS = r"(?:(?:Rs|INR)\.?\s*)?"          # optional currency prefix


def _m2(p: str) -> str:
    """2x2 matrix literal [[a, b], [c, d]] with prefixed named groups."""
    n = _NUM
    return (r"\[\s*\[\s*(?P<" + p + r"a>" + n + r")\s*,\s*(?P<" + p + r"b>"
            + n + r")\s*\]\s*,\s*\[\s*(?P<" + p + r"c>" + n + r")\s*,\s*(?P<"
            + p + r"d>" + n + r")\s*\]\s*\]")


# --------------------------------------------------------------------------- #
# compute functions: (g, m, text) -> (value | None, steps, answer | None,
#                                     assumptions | None)
# --------------------------------------------------------------------------- #


def _c_log_solve(g, m, text):
    val = _num(g["val"])
    if abs(val) > 300:                     # gate: 10**val would overflow
        return None, [], None, None
    x = math.pow(10.0, val)
    return x, [f"log10(x) = {_fmt(val)}  ->  x = 10^{_fmt(val)} = {_fmt(x)}",
               "antilog of the common (base 10) logarithm"], None, \
        ["log taken to base 10"]


def _c_log_props(g, m, text):
    a, b, op = _num(g["a"]), _num(g["b"]), g["op"]
    if a <= 0 or b <= 0:                   # gate: log arguments positive
        return None, [], None, None
    if op == "+":
        v = math.log10(a) + math.log10(b)
        return v, [f"log {_fmt(a)} + log {_fmt(b)} = log({_fmt(a)} x "
                   f"{_fmt(b)}) = log {_fmt(a * b)} = {v:.6g}"], None, \
            ["product rule: log m + log n = log(mn)"]
    v = math.log10(a) - math.log10(b)
    return v, [f"log {_fmt(a)} - log {_fmt(b)} = log({_fmt(a)}/"
               f"{_fmt(b)}) = log {_fmt(a / b)} = {v:.6g}"], None, \
        ["quotient rule: log m - log n = log(m/n)"]


def _c_matrix_add(g, m, text):
    p = [_num(g["pa"]), _num(g["pb"]), _num(g["pc"]), _num(g["pd"])]
    q = [_num(g["qa"]), _num(g["qb"]), _num(g["qc"]), _num(g["qd"])]
    s = [a + b for a, b in zip(p, q)]
    ans = (f"[[{_fmt(s[0])}, {_fmt(s[1])}], "
           f"[{_fmt(s[2])}, {_fmt(s[3])}]]")
    steps = ["add corresponding elements",
             f"[[{_fmt(p[0])} + {_fmt(q[0])}, {_fmt(p[1])} + {_fmt(q[1])}], "
             f"[{_fmt(p[2])} + {_fmt(q[2])}, {_fmt(p[3])} + {_fmt(q[3])}]]",
             f"sum = {ans}"]
    return None, steps, ans, None


def _c_matrix_scalar(g, m, text):
    p = [_num(g["pa"]), _num(g["pb"]), _num(g["pc"]), _num(g["pd"])]
    k = _num(g["k"])
    s = [k * v for v in p]
    ans = (f"[[{_fmt(s[0])}, {_fmt(s[1])}], "
           f"[{_fmt(s[2])}, {_fmt(s[3])}]]")
    steps = ["multiply every element by the scalar",
             f"{_fmt(k)} x [[{_fmt(p[0])}, {_fmt(p[1])}], "
             f"[{_fmt(p[2])}, {_fmt(p[3])}]] = {ans}"]
    return None, steps, ans, None


def _c_matrix_inverse(g, m, text):
    a, b = _num(g["pa"]), _num(g["pb"])
    c, d = _num(g["pc"]), _num(g["pd"])
    det = a * d - b * c
    if det == 0:                           # gate: singular matrix
        return None, [], None, None
    inv = [d / det, -b / det, -c / det, a / det]
    ans = (f"[[{_fmt(inv[0])}, {_fmt(inv[1])}], "
           f"[{_fmt(inv[2])}, {_fmt(inv[3])}]]")
    steps = [f"det = ({_fmt(a)})({_fmt(d)}) - ({_fmt(b)})({_fmt(c)}) = "
             f"{_fmt(det)}",
             f"A^-1 = (1/{_fmt(det)}) x [[{_fmt(d)}, {_fmt(-b)}], "
             f"[{_fmt(-c)}, {_fmt(a)}]] = {ans}"]
    return None, steps, ans, None


def _c_limit_factor(g, m, text):
    c, a, pt = _num(g["c"]), _num(g["a"]), _num(g["pt"])
    eps = 1e-9
    if abs(pt - a) <= eps:                 # 0/0 form -> factorise and cancel
        if abs(c - a * a) > eps:           # gate: x = a would be a pole
            return None, [], None, None
        lim = 2.0 * a
        return lim, [f"substituting x = {_fmt(a)} gives 0/0 (indeterminate)",
                     f"factorise: x^2 - {_fmt(c)} = (x - {_fmt(a)})"
                     f"(x + {_fmt(a)})",
                     f"cancel (x - {_fmt(a)}): limit of x + {_fmt(a)} as "
                     f"x -> {_fmt(a)} = {_fmt(lim)}"], None, None
    v = (pt * pt - c) / (pt - a)           # direct substitution branch
    return v, [f"denominator at x = {_fmt(pt)} is non-zero, substitute: "
               f"({_fmt(pt)}^2 - {_fmt(c)}) / ({_fmt(pt)} - {_fmt(a)}) = "
               f"{_fmt(v)}"], None, None


def _c_deriv_power(g, m, text):
    n = _num(g["n"])
    if n == 0:
        return 0.0, ["power rule: d/dx x^n = n x^(n-1)", "d/dx x^0 = 0"], \
            "0", None
    ans = "1" if n == 1 else f"{_fmt(n)}x^{_fmt(n - 1)}"
    return None, ["power rule: d/dx x^n = n x^(n-1)",
                  f"d/dx x^{_fmt(n)} = {ans}"], ans, None


def _c_deriv_eval(g, m, text):
    a, pt = _num(g["a"]), _num(g["pt"])
    b = _num(g["b"]) * (1.0 if (g.get("s1") or "+") == "+" else -1.0)
    fp = 2.0 * a * pt + b
    bstr = f" + {_fmt(b)}x" if b >= 0 else f" - {_fmt(-b)}x"
    cstr = ""
    if g.get("c"):
        cv = _num(g["c"]) * (1.0 if (g.get("s2") or "+") == "+" else -1.0)
        cstr = f" + {_fmt(cv)}" if cv >= 0 else f" - {_fmt(-cv)}"
    return fp, [f"f(x) = {_fmt(a)}x^2{bstr}{cstr}",
                f"f'(x) = {_fmt(2 * a)}x + {_fmt(b)}",
                f"f'({_fmt(pt)}) = {_fmt(2 * a)} x {_fmt(pt)} + {_fmt(b)} = "
                f"{_fmt(fp)}"], None, None


def _c_integral_basic(g, m, text):
    co = _num(g["co"])
    k = co / 3.0
    if g.get("lo") is not None and g.get("hi") is not None:
        lo, hi = _num(g["lo"]), _num(g["hi"])
        v = k * (hi ** 3 - lo ** 3)
        return v, [f"antiderivative of {co:g}x^2 is {_fmt(k)}x^3",
                   f"[{_fmt(k)}x^3] from {lo:g} to {hi:g} = {_fmt(k)} x "
                   f"({hi:g}^3 - {lo:g}^3) = {_fmt(v)}"], None, None
    ans = "x^3 + C" if abs(k - 1.0) < 1e-9 else f"{_fmt(k)}x^3 + C"
    return None, [f"integral of {co:g}x^2 dx = ({co:g}/3) x^3 = {ans}"], \
        ans, None


def _c_area_curve(g, m, text):
    lo, hi = _num(g["lo"]), _num(g["hi"])
    if hi <= lo:                           # gate: need an increasing interval
        return None, [], None, None
    v = (hi ** 3 - lo ** 3) / 3.0
    return v, [f"area = integral of x^2 dx from {lo:g} to {hi:g}",
               f"= [x^3/3] from {lo:g} to {hi:g} = ({hi:g}^3 - {lo:g}^3)/3 "
               f"= {_fmt(v)}"], None, None


def _c_binomial_term(g, m, text):
    n = int(_num(g["n"]))
    x, y = g["x"], g["y"]
    if g.get("r"):
        r = int(_num(g["r"]))
        k = r - 1
        if r < 1 or k > n:                 # gate: term index within range
            return None, [], None, None
        coef = math.comb(n, k)
        parts = [_fmt(float(coef))]
        if n - k:
            parts.append(f"{x}^{_fmt(n - k)}")
        if k:
            parts.append(f"{y}^{_fmt(k)}")
        ans = " ".join(parts)
        return float(coef), [f"T(r+1) = C(n, r) x^(n-r) y^r with n = {n}",
                             f"T{r} = C({n}, {k}) {x}^{n - k} {y}^{k} = "
                             f"{coef} {x}^{n - k} {y}^{k}"], ans, None
    ans = f"T(r+1) = C({n}, r) {x}^({n}-r) {y}^r"
    return None, ["general term in the expansion of (x + y)^n is "
                  "T(r+1) = C(n, r) x^(n-r) y^r",
                  f"here n = {n}, so the general term is {ans}"], ans, None


def _c_emi(g, m, text):
    P, r, n = _num(g["p"]), _num(g["r"]), int(_num(g["n"]))
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
    A, n, r = _num(g["a"]), int(_num(g["n"])), _num(g["r"])
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
    v1, v2, n = _num(g["v1"]), _num(g["v2"]), _num(g["n"])
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
    w = int(_num(g["win"])) if g.get("win") else 3
    if w < 2 or not vals or len(vals) < w:  # gate: enough data points
        return None, [], None, None
    avgs = [sum(vals[i:i + w]) / w for i in range(len(vals) - w + 1)]
    ans = f"{w}-period moving averages: " + ", ".join(_fmt(a) for a in avgs)
    return None, [f"data: {', '.join(_fmt(v) for v in vals)}",
                  f"each trend value = mean of {w} consecutive values",
                  ans], ans, ["successive (non-centered) moving averages"]


def _c_prob_binomial(g, m, text):
    r, n, p = int(_num(g["r"])), int(_num(g["n"])), _num(g["p"])
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
    rate = _num(g["rate"])
    if str(g.get("dir") or "increasing").lower().startswith("decreas"):
        rate = -rate
    s, unit = _num(g["s"]), str(g["unit"]).lower()
    if s <= 0:                             # gate: side length positive
        return None, [], None, None
    dadt = 2.0 * s * rate
    ans = f"dA/dt = {_fmt(dadt)} {unit}^2/s"
    return dadt, ["A = s^2, so dA/dt = 2s (ds/dt) by the chain rule",
                  f"ds/dt = {_fmt(rate)} {unit}/s at s = {_fmt(s)}",
                  f"dA/dt = 2 x {_fmt(s)} x {_fmt(rate)} = "
                  f"{_fmt(dadt)} {unit}^2/s"], ans, None


# --------------------------------------------------------------------------- #
# the table: (id, trigger regex with named slots, compute)
# --------------------------------------------------------------------------- #

APPLIED_TABLE: List[Tuple[str, Any, Any]] = [
    # ---- logs (class 11/12) ----
    ("LOG_SOLVE",
     r"(?:solve|find)\b.{0,40}?\blog\s*\(?\s*x\s*\)?\s*=\s*(?P<val>" + _NUM
     + r")",
     _c_log_solve),
    ("LOG_PROPERTIES",
     r"(?:evaluate|simplify|find|compute)\b.{0,20}?\blog\s*\(?\s*(?P<a>"
     + _NUM + r")\s*\)?\s*(?P<op>\+|-|/)\s*log\s*\(?\s*(?P<b>" + _NUM
     + r")\s*\)?",
     _c_log_props),

    # ---- matrices (class 12) ----
    ("MATRIX_ADD",
     r"(?:add|sum\s+of)\s+(?:the\s+)?(?:matrices\s+|matrix\s+)?" + _m2("p")
     + r"\s+(?:and|with|\+)\s+(?:the\s+)?(?:matrix\s+)?" + _m2("q"),
     _c_matrix_add),
    ("MATRIX_MULTIPLY",
     r"multiply\s+(?:the\s+)?(?:matrix\s+)?" + _m2("p")
     + r"\s+by\s+(?:the\s+)?(?:scalar\s+)?(?P<k>" + _NUM + r")",
     _c_matrix_scalar),
    ("MATRIX_INVERSE_2X2",
     r"inverse\s+of\s+(?:the\s+)?(?:matrix\s+)?" + _m2("p"),
     _c_matrix_inverse),

    # ---- calculus (class 12 / applied maths) ----
    ("LIMIT_FACTOR",
     r"limit\s+of\s*\(?\s*x\s*" + _SQ + r"\s*-\s*(?P<c>" + _NUM
     + r")\s*\)?\s*/\s*\(?\s*x\s*-\s*(?P<a>" + _NUM + r")\s*\)?"
     + r"(?:\s+as\s+x\s*(?:approaches|tends\s+to|->|\u2192)"
     + r"|\s+at\s+x\s*=)\s*(?P<pt>" + _NUM + r")",
     _c_limit_factor),
    ("DERIVATIVE_POWER",
     r"derivative\s+of\s+(?:the\s+)?(?:function\s+)?x\s*(?:\^|\*\*)\s*"
     r"(?P<n>" + _NUM + r")",
     _c_deriv_power),
    ("DERIVATIVE_EVAL",
     r"f\s*'\s*\(\s*(?P<pt>" + _NUM + r")\s*\).{0,40}?f\s*\(?\s*x\s*\)?\s*"
     r"=\s*(?P<a>" + _NUM + r")\s*\*?\s*x\s*" + _SQ + r"\s*(?P<s1>[+-])\s*"
     r"(?P<b>" + _NUM + r")\s*\*?\s*x(?:\s*(?P<s2>[+-])\s*(?P<c>" + _NUM
     + r"))?",
     _c_deriv_eval),
    ("INTEGRAL_BASIC",
     r"integrate\s+(?P<co>" + _NUM + r")\s*\*?\s*x\s*" + _SQ
     + r"\s*(?:with\s+respect\s+to\s+)?dx"
     + r"(?:\s+from\s+(?P<lo>" + _NUM + r")\s+to\s+(?P<hi>" + _NUM + r"))?",
     _c_integral_basic),
    ("AREA_UNDER_CURVE",
     r"area\s+under\s+(?:the\s+)?(?:curve\s+)?y\s*=\s*x\s*" + _SQ
     + r"\s+from\s+x\s*=\s*(?P<lo>" + _NUM + r")\s+to\s+x\s*=\s*(?P<hi>"
     + _NUM + r")",
     _c_area_curve),

    # ---- binomial (class 11 / applied maths) ----
    ("BINOMIAL_TERM",
     r"(?:(?P<r>\d+)\s*(?:th|st|nd|rd)\s+term|general\s+term)\s*"
     r"(?:in|of)\s+(?:the\s+)?expansion\s+of\s*\(\s*(?P<x>[a-z])\s*\+\s*"
     r"(?P<y>[a-z])\s*\)\s*\^?\s*\(?\s*(?P<n>\d+)\s*\)?",
     _c_binomial_term),

    # ---- finance (applied maths) ----
    ("EMI",
     r"\bEMI\b.{0,80}?loan\s+of\s+" + _RS + r"(?P<p>" + _NUM + r")"
     + r".{0,80}?(?P<r>" + _NUM + r")\s*%\s*(?:per\s+annum|p\.a\.|annual)"
     + r".{0,80}?for\s+(?P<n>\d+)\s*(?:months?|EMIs?|instal?ments?|"
     r"installments?)",
     _c_emi),
    ("ANNUITY",
     r"(?:future|accumulated|maturity)\s+value\s+of\s+an?\s+(?:annual\s+)?"
     r"annuity\s+of\s+" + _RS + r"(?P<a>" + _NUM + r")"
     + r".{0,100}?for\s+(?P<n>\d+)\s+years?"
     + r".{0,60}?(?:at|@)\s*(?P<r>" + _NUM + r")\s*%",
     _c_annuity),
    ("CAGR",
     r"(?:\bCAGR\b|compound\s+annual\s+growth\s+rate).{0,100}?from\s+"
     + _RS + r"(?P<v1>" + _NUM + r")" + r".{0,60}?to\s+" + _RS
     + r"(?P<v2>" + _NUM + r")" + r".{0,60}?in\s+(?P<n>" + _NUM
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
     r"(?:is\s+|of\s+|=\s*|:\s*)|p\s*=\s*)(?P<p>" + _NUM + r")",
     _c_prob_binomial),

    # ---- rates of change (class 12 / applied maths) ----
    ("RATE_OF_CHANGE",
     r"(?:side|edge)\s+of\s+an?\s+square\s+(?:is\s+)?"
     r"(?P<dir>increasing|decreasing)\s+at\s+(?:the\s+rate\s+of\s+)?"
     r"(?P<rate>" + _NUM + r")\s*(?P<unit>cm|mm|m)\s*(?:/|per)\s*s\b"
     r".{0,120}?when\s+(?:the\s+)?(?:side|edge)\s*(?:length\s+)?"
     r"(?:is\s+|=\s*)?(?P<s>" + _NUM + r")",
     _c_rate_change),
]

# precompile triggers once at import (regex errors surface immediately)
APPLIED_TABLE = [(fid, re.compile(pat, re.I), fn)
                 for fid, pat, fn in APPLIED_TABLE]


# --------------------------------------------------------------------------- #
# dispatcher
# --------------------------------------------------------------------------- #


def model_applied_maths(text: str) -> ModelResult:
    """Deterministic dispatcher: scan the applied-maths table, first
    grounded hit wins (gates inside compute may reject a trigger hit)."""
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
        return _yes(fid, g, value, steps, assumptions, answer=answer)
    return _no("APPLIED_MATHS", "no applied-maths family matched")
