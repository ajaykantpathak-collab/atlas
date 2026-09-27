"""maths2_families.py -- maths families for classes 9-12 CBSE, batch 2.

Twenty deterministic closed-form families in the syllabus_families
style: trigger regex with named slots, plausibility gates, formula +
substitution steps, and a ModelResult (matched=True, confidence >= 0.93,
quantities dict, governing equation, final answer string, numeric
answer float, steps list).

Families:
  statistics        MEDIAN, MODE, MEAN_GROUPED
  trigonometry      TRIG_IDENTITY_EVAL, COMPOUND_ANGLES
  coordinate geom   SECTION_FORMULA, AREA_TRIANGLE_COORDS,
                    SLOPE_TWO_POINTS, LINE_EQ_SLOPE_INTERCEPT,
                    DISTANCE_POINT_LINE
  limits            LIMIT_STANDARD
  probability       PROBABILITY_CONDITIONAL, PROBABILITY_DEPENDENT
  binomial          BINOMIAL_COEFFICIENT
  matrices          MATRIX_MULTIPLY_2X2, MATRIX_TRANSPOSE
  series            SUM_SQUARES, SUM_CUBES, HARMONIC_MEAN
  vectors           VECTOR_CROSS_PRODUCT

Dispatcher: model_maths2(text) -> ModelResult (first grounded row wins).
Deterministic only -- no LLM calls anywhere in this module.
"""

from __future__ import annotations

import math
import re
from fractions import Fraction
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# helpers (same shape as syllabus_families.py)
# --------------------------------------------------------------------------- #


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    """Matched ModelResult; non-numeric slots are dropped from quantities."""
    q: Dict[str, float] = {}
    for k, v in (g or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    for k, v in (extra or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=q, governing_equation=eq,
        final_answer=answer if answer is not None else
        (f"{value:.6g}" if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


_NUM = r"-?\d+(?:\.\d+)?"
_U_NUM = r"\d+(?:\.\d+)?"

_PT = (r"\(\s*(?P<{px}>-?\d+(?:\.\d+)?)\s*,\s*(?P<{py}>-?\d+(?:\.\d+)?)"
       r"\s*\)")


def _pt(prefix: str) -> str:
    return _PT.replace("{px}", prefix + "x").replace("{py}", prefix + "y")


def _mtx(prefix: str) -> str:
    """2x2 bracketed matrix: [[a, b], [c, d]] with named groups p11..p22."""

    def cell(r_: int, c_: int) -> str:
        return (r"(?P<" + prefix + str(r_) + str(c_) + r">" + _NUM + r")")

    return (r"\[\s*\[\s*" + cell(1, 1) + r"\s*,\s*" + cell(1, 2) + r"\s*\]"
            r"\s*,\s*\[\s*" + cell(2, 1) + r"\s*,\s*" + cell(2, 2) + r"\s*\]"
            r"\s*\]")


def _sq(grp: str) -> str:
    """Squared trig call:  fn^2(angle)  (angle in degrees, symbol optional)."""
    return (r"\s*\^\s*2\s*\(?\s*(?P<" + grp + ">" + _U_NUM +
            r")\s*°?\s*\)?")


def _tcall(fn: str, grp: str) -> str:
    """Trig call with parentheses: fn(angle)."""
    return (fn + r"\(\s*(?P<" + grp + ">" + _U_NUM + r")\s*°?\s*\)")


def _fmt(v: float) -> str:
    return f"{v:.6g}"


def _nums(s: str) -> List[float]:
    return [float(x.replace(",", ""))
            for x in re.findall(r"\d+(?:\.\d+)?", s or "")]


def _list_str(nums: List[float]) -> str:
    return "[" + ", ".join(_fmt(x) for x in nums) + "]"


def _mtx_str(m_: List[List[float]]) -> str:
    return "[" + ", ".join(
        "[" + ", ".join(_fmt(v) for v in row) + "]" for row in m_) + "]"


def _snap(v: float, tol: float = 1e-9) -> float:
    """Snap float noise onto the nearest integer when extremely close."""
    r = round(v)
    return float(r) if abs(v - r) < tol else v


def _frac_str(v: float) -> str:
    fr = Fraction(v).limit_denominator(10000)
    if fr.denominator == 1:
        return f"{fr.numerator}"
    return f"{fr.numerator}/{fr.denominator} (~{_fmt(v)})"


# trig: standard-angle value table (exact where clean)
_TRIG = {
    ("sin", 0): 0.0, ("sin", 30): 0.5, ("sin", 45): math.sqrt(2) / 2,
    ("sin", 60): math.sqrt(3) / 2, ("sin", 90): 1.0,
    ("cos", 0): 1.0, ("cos", 30): math.sqrt(3) / 2, ("cos", 45):
    math.sqrt(2) / 2, ("cos", 60): 0.5, ("cos", 90): 0.0,
    ("tan", 0): 0.0, ("tan", 30): 1 / math.sqrt(3), ("tan", 45): 1.0,
    ("tan", 60): math.sqrt(3), ("tan", 90): None,
}
_STD_ANGLES = (0, 30, 45, 60, 90)


def _trig_val(fn: str, deg: float) -> float:
    if float(deg).is_integer() and (fn, int(deg)) in _TRIG:
        v = _TRIG[(fn, int(deg))]
        if v is not None:
            return v
    return (math.sin if fn == "sin" else math.cos)(math.radians(deg))


def _normalize(text: str) -> str:
    """Deterministic surface cleanup: unicode minus and superscripts.

    "sin²30°" becomes "sin^230°" -- every downstream regex treats ^2 as
    the power and the following digits as the angle, and the standard
    angle gate rejects any mis-reading anyway.
    """
    t = (text or "").replace("−", "-").replace("–", "-").replace("’", "'")
    return re.sub(
        r"[⁰¹²³⁴⁵⁶⁷⁸⁹]+",
        lambda m_: "^" + "".join(
            str("⁰¹²³⁴⁵⁶⁷⁸⁹".index(c)) for c in m_.group(0)),
        t)


# gate-failure tuple: value None + empty steps -> dispatcher keeps scanning
_GATE = (None, [], None, None, None, None)


# --------------------------------------------------------------------------- #
# 1-2. MEDIAN / MODE
# --------------------------------------------------------------------------- #


def _c_median(g, m, text):
    nums = sorted(_nums(g["list"]))
    n = len(nums)
    if n == 0:
        return _GATE
    if n % 2:
        med = nums[n // 2]
        steps = [f"Sort the data: {_list_str(nums)}.",
                 f"n = {n} is odd, so the median is the middle "
                 f"({n // 2 + 1}th) value = {_fmt(med)}."]
    else:
        lo, hi = nums[n // 2 - 1], nums[n // 2]
        med = (lo + hi) / 2
        steps = [f"Sort the data: {_list_str(nums)}.",
                 f"n = {n} is even, so the median is the average of the two "
                 f"middle values ({_fmt(lo)} + {_fmt(hi)})/2 = {_fmt(med)}."]
    return med, steps, None, None, "median = middle value of the sorted data", \
        {"n": float(n)}


def _c_mode(g, m, text):
    nums = _nums(g["list"])
    if not nums:
        return _GATE
    counts: Dict[float, int] = {}
    for x in nums:
        counts[x] = counts.get(x, 0) + 1
    best = max(counts.values())
    if best < 2:
        return _GATE  # no repeated value: mode is undefined
    winners = sorted(k for k, v in counts.items() if v == best)
    mode = winners[0]
    table = ", ".join(f"{k:g}: {v}" for k, v in sorted(counts.items()))
    steps = [f"Tally each value: {table}.",
             f"Highest frequency is {best}, so the mode = {_fmt(mode)}"
             + (" (multimodal data; smallest mode reported)"
                if len(winners) > 1 else "") + "."]
    return mode, steps, f"{mode:g}", None, "mode = most frequent value", \
        {"frequency": float(best), "n": float(len(nums))}


# --------------------------------------------------------------------------- #
# 3. MEAN_GROUPED
# --------------------------------------------------------------------------- #


def _c_mean_grouped(g, m, text):
    xs = _nums(g["xs"])
    fs = _nums(g["fs"])
    if not xs or len(xs) != len(fs):
        return _GATE
    sf = sum(fs)
    if sf == 0:
        return _GATE
    sfx = sum(x * f for x, f in zip(xs, fs))
    mean = sfx / sf
    steps = [f"sum fx = " + " + ".join(f"{x:g}x{f:g}"
                                       for x, f in zip(xs, fs)) +
             f" = {_fmt(sfx)}",
             "sum f = " + " + ".join(_fmt(f) for f in fs) + f" = {_fmt(sf)}",
             f"mean = sum fx / sum f = {_fmt(sfx)} / {_fmt(sf)} = "
             f"{_fmt(mean)}"]
    return mean, steps, None, None, "mean = (sum fx) / (sum f)", \
        {"sum_fx": sfx, "sum_f": sf}


# --------------------------------------------------------------------------- #
# 4. TRIG_IDENTITY_EVAL
# --------------------------------------------------------------------------- #


def _pyth_angle(g) -> Optional[float]:
    try:
        a1, a2 = float(g["a1"]), float(g["a2"])
    except (TypeError, KeyError):
        return None
    if a1 != a2:
        return None
    if not float(a1).is_integer() or int(a1) not in _STD_ANGLES:
        return None
    return a1


def _one_angle(g) -> Optional[float]:
    try:
        a = float(g["ang"])
    except (TypeError, KeyError):
        return None
    if not float(a).is_integer() or int(a) not in _STD_ANGLES:
        return None
    return a


def _c_sin_cos_sq(g, m, text):
    a = _pyth_angle(g)
    if a is None:
        return _GATE
    steps = ["Pythagorean identity: sin^2(A) + cos^2(A) = 1, for every A.",
             f"Here A = {a:g} degrees in both terms, so the value is "
             f"exactly 1."]
    return 1.0, steps, "1", None, "sin^2(A) + cos^2(A) = 1", None


def _c_1_tan_sq(g, m, text):
    a = _one_angle(g)
    if a is None or a == 90:
        return _GATE  # tan(90) undefined
    cosv = _trig_val("cos", a)
    v = _snap(1.0 / (cosv * cosv))
    steps = ["Identity: 1 + tan^2(A) = sec^2(A).",
             f"sec(A) = 1/cos(A) = 1/{_fmt(cosv)}, so sec^2({a:g} degrees) "
             f"= {_fmt(v)}."]
    return v, steps, f"{v:g}", None, "1 + tan^2(A) = sec^2(A)", None


def _c_1_cot_sq(g, m, text):
    a = _one_angle(g)
    if a is None or a == 0:
        return _GATE  # cot(0) undefined
    sinv = _trig_val("sin", a)
    v = _snap(1.0 / (sinv * sinv))
    steps = ["Identity: 1 + cot^2(A) = cosec^2(A).",
             f"cosec(A) = 1/sin(A) = 1/{_fmt(sinv)}, so cosec^2({a:g} "
             f"degrees) = {_fmt(v)}."]
    return v, steps, f"{v:g}", None, "1 + cot^2(A) = cosec^2(A)", None


def _c_sec_tan_sq(g, m, text):
    a = _one_angle(g)
    if a is None or a == 90:
        return _GATE
    steps = ["Identity: sec^2(A) - tan^2(A) = 1.",
             f"Here A = {a:g} degrees in both terms, so the value is "
             f"exactly 1."]
    return 1.0, steps, "1", None, "sec^2(A) - tan^2(A) = 1", None


def _c_csc_cot_sq(g, m, text):
    a = _one_angle(g)
    if a is None or a == 0:
        return _GATE
    steps = ["Identity: cosec^2(A) - cot^2(A) = 1.",
             f"Here A = {a:g} degrees in both terms, so the value is "
             f"exactly 1."]
    return 1.0, steps, "1", None, "cosec^2(A) - cot^2(A) = 1", None


# --------------------------------------------------------------------------- #
# 5. SECTION_FORMULA
# --------------------------------------------------------------------------- #


def _c_section(g, m, text):
    if re.search(r"\bexternal", text, re.I):
        return _GATE  # opposite polarity: external division is a different
        # formula ((m x2 - n x1)/(m - n)); refuse rather than mis-model
    x1, y1 = float(g["ax"]), float(g["ay"])
    x2, y2 = float(g["bx"]), float(g["by"])
    mm, nn = float(g["mm"]), float(g["nn"])
    if mm + nn == 0:
        return _GATE
    px = (mm * x2 + nn * x1) / (mm + nn)
    py = (mm * y2 + nn * y1) / (mm + nn)
    steps = [
        f"Internal division in ratio m:n = {mm:g}:{nn:g}: P = "
        f"((m x2 + n x1)/(m + n), (m y2 + n y1)/(m + n)).",
        f"x = ({mm:g} x {_fmt(x2)} + {nn:g} x {_fmt(x1)})/{_fmt(mm + nn)} "
        f"= {_fmt(px)}",
        f"y = ({mm:g} x {_fmt(y2)} + {nn:g} x {_fmt(y1)})/{_fmt(mm + nn)} "
        f"= {_fmt(py)}",
        f"P = ({_fmt(px)}, {_fmt(py)})"]
    return px, steps, f"({_fmt(px)}, {_fmt(py)})", None, \
        "P = ((m x2 + n x1)/(m+n), (m y2 + n y1)/(m+n))", \
        {"px": px, "py": py}


# --------------------------------------------------------------------------- #
# 6. AREA_TRIANGLE_COORDS
# --------------------------------------------------------------------------- #


def _c_area_tri(g, m, text):
    x1, y1 = float(g["ax"]), float(g["ay"])
    x2, y2 = float(g["bx"]), float(g["by"])
    x3, y3 = float(g["cx"]), float(g["cy"])
    raw = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)
    area = abs(raw) / 2
    if area < 1e-12:
        return _GATE  # collinear points: degenerate triangle
    steps = [
        "Shoelace formula: area = 1/2 |x1(y2 - y3) + x2(y3 - y1) + "
        "x3(y1 - y2)|.",
        f"= 1/2 |{_fmt(x1)}({_fmt(y2)} - {_fmt(y3)}) + {_fmt(x2)}"
        f"({_fmt(y3)} - {_fmt(y1)}) + {_fmt(x3)}({_fmt(y1)} - {_fmt(y2)})|",
        f"= 1/2 |{_fmt(raw)}| = {_fmt(area)} square units."]
    return area, steps, None, None, \
        "area = 1/2 |x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)|", None


# --------------------------------------------------------------------------- #
# 7. SLOPE_TWO_POINTS
# --------------------------------------------------------------------------- #


def _c_slope(g, m, text):
    x1, y1 = float(g["ax"]), float(g["ay"])
    x2, y2 = float(g["bx"]), float(g["by"])
    if x2 == x1:
        return _GATE  # vertical line: slope undefined (division by zero)
    s = (y2 - y1) / (x2 - x1)
    steps = [f"slope = (y2 - y1)/(x2 - x1) = ({_fmt(y2)} - {_fmt(y1)})/"
             f"({_fmt(x2)} - {_fmt(x1)}) = {_fmt(s)}"]
    return s, steps, None, None, "slope = (y2 - y1)/(x2 - x1)", None


# --------------------------------------------------------------------------- #
# 8. LIMIT_STANDARD
# --------------------------------------------------------------------------- #

_LIM0 = (r"\blim(?:it)?(?:\s+as\s+)?[\(\[]?\s*x\s*(?:→|->|=>)\s*0\s*[\)\]]?"
         r"\s*(?:of\s+)?")


def _lim_a(g) -> float:
    a = g.get("a")
    return float(a) if a else 1.0


def _c_limit_sin(g, m, text):
    a = _lim_a(g)
    if a < 0:
        return _GATE
    steps = [f"Standard limit: lim(x->0) sin(ax)/x = a.",
             f"Here a = {_fmt(a)}, so the limit = {_fmt(a)}."]
    return a, steps, None, None, "lim(x->0) sin(ax)/x = a", None


def _c_limit_tan(g, m, text):
    a = _lim_a(g)
    if a < 0:
        return _GATE
    steps = [f"Standard limit: lim(x->0) tan(ax)/x = a (tan(ax)/ax -> 1).",
             f"Here a = {_fmt(a)}, so the limit = {_fmt(a)}."]
    return a, steps, None, None, "lim(x->0) tan(ax)/x = a", None


def _c_limit_1mcos_sq(g, m, text):
    a = _lim_a(g)
    if a < 0:
        return _GATE
    v = a * a / 2
    steps = [f"Standard limit: lim(x->0) (1 - cos(ax))/x^2 = a^2/2.",
             f"Here a = {_fmt(a)}: a^2/2 = {_fmt(v)}."]
    return v, steps, None, None, "lim(x->0) (1 - cos(ax))/x^2 = a^2/2", None


def _c_limit_1mcos_lin(g, m, text):
    a = _lim_a(g)
    if a < 0:
        return _GATE
    steps = [f"Standard limit: lim(x->0) (1 - cos(ax))/x = 0.",
             "cos(ax) -> 1 as x -> 0, so the numerator 1 - cos(ax) -> 0 "
             "and the limit = 0."]
    return 0.0, steps, None, None, "lim(x->0) (1 - cos(ax))/x = 0", None


def _c_limit_exp(g, m, text):
    steps = ["Standard limit: lim(x->0) (e^x - 1)/x = 1.",
             "The value is exactly 1."]
    return 1.0, steps, None, None, "lim(x->0) (e^x - 1)/x = 1", None


# --------------------------------------------------------------------------- #
# 9-10. PROBABILITY_CONDITIONAL / PROBABILITY_DEPENDENT
# --------------------------------------------------------------------------- #

_COLORS = ("red", "blue", "green", "white", "black")
_COLOR = r"(?:red|blue|green|white|black)"


def _bag_counts(text: str) -> Dict[str, float]:
    counts: Dict[str, float] = {}
    for col in _COLORS:
        mm = re.search(r"(\d+)\s+" + col, text, re.I)
        if mm:
            counts[col] = float(mm.group(1))
    return counts


def _c_prob_conditional(g, m, text):
    c1, c2 = g["c1"].lower(), g["c2"].lower()
    counts = _bag_counts(text)
    if c1 not in counts or c2 not in counts:
        return _GATE  # asked-about color absent from the bag statement
    n1, n2 = counts[c1], counts[c2]
    big_n = sum(counts.values())
    if big_n < 2 or n2 < 1:
        return _GATE  # cannot condition on an impossible second draw
    same = c1 == c2
    n2_eff = (n2 - 1) if same else n2
    both = (n1 * n2_eff) / (big_n * (big_n - 1))
    p2nd = n2 / big_n
    cond = both / p2nd
    bag = ", ".join(f"{int(v)} {k}" for k, v in sorted(counts.items()))
    steps = [
        f"Bag: {bag}; N = {int(big_n)} balls, two draws without replacement.",
        f"P(2nd = {c2}) = {int(n2)}/{int(big_n)} = {_fmt(p2nd)} "
        f"(every ball is equally likely to be the second draw).",
        f"P(1st = {c1} AND 2nd = {c2}) = ({int(n1)}/{int(big_n)}) x "
        f"({int(n2_eff)}/{int(big_n - 1)}) = {_fmt(both)}.",
        f"Bayes rule: P(1st = {c1} | 2nd = {c2}) = {_fmt(both)} / "
        f"{_fmt(p2nd)} = {_fmt(cond)} "
        f"(= ({int(n1 - (1 if same else 0))})/({int(big_n - 1)}) after "
        f"cancelling)."]
    return cond, steps, _frac_str(cond), None, \
        "P(first=A | second=B) = (nA - [A=B]) / (N - 1)", \
        {"n_first": n1, "n_second": n2, "N": big_n}


def _c_prob_dependent(g, m, text):
    nr, nb = float(g["nr"]), float(g["nb"])
    col = g["col"].lower()
    big_n = nr + nb
    n = nr if col == "red" else nb
    if big_n < 2 or n < 2:
        return _GATE  # cannot draw two of this color
    p1 = n / big_n
    p2 = (n - 1) / (big_n - 1)
    val = p1 * p2
    fr = Fraction(int(n), int(big_n)) * Fraction(int(n - 1), int(big_n - 1))
    steps = [
        f"P(1st {col}) = {int(n)}/{int(big_n)} = {_fmt(p1)}.",
        f"One {col} ball is now gone: P(2nd {col} | 1st {col}) = "
        f"{int(n - 1)}/{int(big_n - 1)} = {_fmt(p2)}.",
        f"P(both {col}) = {_fmt(p1)} x {_fmt(p2)} = "
        f"{int(n * (n - 1))}/{int(big_n * (big_n - 1))} = "
        f"{fr.numerator}/{fr.denominator} = {_fmt(val)}."]
    return val, steps, f"{fr.numerator}/{fr.denominator} (~{_fmt(val)})", \
        None, "P(both) = (n/N) x ((n-1)/(N-1)), without replacement", \
        {"N": big_n, "n_color": n}


# --------------------------------------------------------------------------- #
# 11. BINOMIAL_COEFFICIENT
# --------------------------------------------------------------------------- #


def _c_binom(g, m, text):
    k = int(float(g["k"]))
    n = int(float(g["n"]))
    a_raw = g.get("a") or g.get("a2")
    a = float(a_raw) if a_raw else 1.0
    if n < 0 or k > n:
        return _GATE  # x^k cannot appear when k > n
    pw = n - k
    coef = _snap(math.comb(n, k) * (a ** pw))
    steps = [
        "General term of (x + a)^n: C(n, k) x^k a^(n - k).",
        f"Coefficient of x^{k} in (x + {_fmt(a)})^{n} = C({n}, {k}) x "
        f"{_fmt(a)}^{pw} = {math.comb(n, k)} x {_fmt(a ** pw)} = "
        f"{_fmt(coef)}."]
    return coef, steps, f"{coef:g}", None, \
        "coefficient of x^k in (x + a)^n = C(n, k) a^(n - k)", None


# --------------------------------------------------------------------------- #
# 12-13. MATRIX_MULTIPLY_2X2 / MATRIX_TRANSPOSE
# --------------------------------------------------------------------------- #


def _c_matmul(g, m, text):
    a = [[float(g["a11"]), float(g["a12"])],
         [float(g["a21"]), float(g["a22"])]]
    b = [[float(g["b11"]), float(g["b12"])],
         [float(g["b21"]), float(g["b22"])]]
    c = [[a[i][0] * b[0][j] + a[i][1] * b[1][j] for j in range(2)]
         for i in range(2)]
    entry_sum = sum(sum(row) for row in c)
    steps = [
        "Row-by-column rule: c[i][j] = a[i][1] b[1][j] + a[i][2] b[2][j].",
        f"c11 = {a[0][0]:g}x{b[0][0]:g} + {a[0][1]:g}x{b[1][0]:g} = "
        f"{_fmt(c[0][0])}",
        f"c12 = {a[0][0]:g}x{b[0][1]:g} + {a[0][1]:g}x{b[1][1]:g} = "
        f"{_fmt(c[0][1])}",
        f"c21 = {a[1][0]:g}x{b[0][0]:g} + {a[1][1]:g}x{b[1][0]:g} = "
        f"{_fmt(c[1][0])}",
        f"c22 = {a[1][0]:g}x{b[0][1]:g} + {a[1][1]:g}x{b[1][1]:g} = "
        f"{_fmt(c[1][1])}",
        f"Product = {_mtx_str(c)}. numeric_answer carries the entry sum; "
        f"the full matrix is the final answer."]
    return entry_sum, steps, _mtx_str(c), None, \
        "C = A B, 2x2 row-by-column product", {"entry_sum": entry_sum}


def _c_transpose(g, m, text):
    mtx = [[float(g["m11"]), float(g["m12"])],
           [float(g["m21"]), float(g["m22"])]]
    t = [[mtx[0][0], mtx[1][0]], [mtx[0][1], mtx[1][1]]]
    entry_sum = sum(sum(row) for row in t)
    steps = [
        "Transpose swaps rows and columns: T[i][j] = M[j][i].",
        f"Row 1 ({_fmt(mtx[0][0])}, {_fmt(mtx[0][1])}) becomes column 1; "
        f"row 2 ({_fmt(mtx[1][0])}, {_fmt(mtx[1][1])}) becomes column 2.",
        f"T = {_mtx_str(t)}. numeric_answer carries the entry sum; the "
        f"full matrix is the final answer."]
    return entry_sum, steps, _mtx_str(t), None, \
        "A^T: rows become columns", {"entry_sum": entry_sum}


# --------------------------------------------------------------------------- #
# 14-16. SUM_SQUARES / SUM_CUBES / HARMONIC_MEAN
# --------------------------------------------------------------------------- #


def _c_sum_squares(g, m, text):
    n = float(g["n"])
    if n < 1:
        return _GATE
    v = n * (n + 1) * (2 * n + 1) / 6
    steps = [
        "Sum of squares of the first n natural numbers: n(n+1)(2n+1)/6.",
        f"= {n:g} x {n + 1:g} x {2 * n + 1:g} / 6 = {_fmt(v)}."]
    return v, steps, None, None, "sum of squares = n(n+1)(2n+1)/6", None


def _c_sum_cubes(g, m, text):
    n = float(g["n"])
    if n < 1:
        return _GATE
    v = (n * (n + 1) / 2) ** 2
    steps = [
        "Sum of cubes of the first n natural numbers: [n(n+1)/2]^2.",
        f"= [{n:g} x {n + 1:g}/2]^2 = [{_fmt(n * (n + 1) / 2)}]^2 = "
        f"{_fmt(v)}."]
    return v, steps, None, None, "sum of cubes = [n(n+1)/2]^2", None


def _c_hm_two(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    if a <= 0 or b <= 0:
        return _GATE  # harmonic mean needs positive values
    v = 2 * a * b / (a + b)
    steps = [
        "Harmonic mean of two numbers: 2ab/(a + b).",
        f"= (2 x {_fmt(a)} x {_fmt(b)})/({_fmt(a)} + {_fmt(b)}) = "
        f"{_fmt(2 * a * b)}/{_fmt(a + b)} = {_fmt(v)}."]
    return v, steps, None, None, "HM = 2ab/(a + b)", None


def _c_hm_list(g, m, text):
    nums = _nums(g["list"])
    if not nums or any(x <= 0 for x in nums):
        return _GATE
    inv = sum(1.0 / x for x in nums)
    v = len(nums) / inv
    steps = [
        "Harmonic mean of n numbers: n / (sum of reciprocals).",
        f"n = {len(nums)}; reciprocals: " +
        " + ".join(f"1/{x:g}" for x in nums) + f" = {_fmt(inv)}",
        f"HM = {len(nums)}/{_fmt(inv)} = {_fmt(v)}."]
    return v, steps, None, None, "HM = n / (sum of 1/x)", \
        {"n": float(len(nums))}


# --------------------------------------------------------------------------- #
# 17. VECTOR_CROSS_PRODUCT
# --------------------------------------------------------------------------- #


def _c_cross(g, m, text):
    a = [float(g["ai"]), float(g["aj"]), float(g["ak"] or 0)]
    b = [float(g["bi"]), float(g["bj"]), float(g["bk"] or 0)]
    cx = a[1] * b[2] - a[2] * b[1]
    cy = a[2] * b[0] - a[0] * b[2]
    cz = a[0] * b[1] - a[1] * b[0]
    mag = math.sqrt(cx * cx + cy * cy + cz * cz)
    ans = f"({_fmt(cx)})i + ({_fmt(cy)})j + ({_fmt(cz)})k"
    steps = [
        "a x b = determinant |i j k; a1 a2 a3; b1 b2 b3| expanded along "
        "the unit vectors.",
        f"i-component = {a[1]:g}x{b[2]:g} - {a[2]:g}x{b[1]:g} = {_fmt(cx)}",
        f"j-component = {a[2]:g}x{b[0]:g} - {a[0]:g}x{b[2]:g} = {_fmt(cy)} "
        f"(this one is subtracted in the determinant)",
        f"k-component = {a[0]:g}x{b[1]:g} - {a[1]:g}x{b[0]:g} = {_fmt(cz)}",
        f"a x b = {ans}; |a x b| = {_fmt(mag)} (numeric_answer carries the "
        f"magnitude; the full vector is the final answer)."]
    return mag, steps, ans, None, \
        "a x b = (a2 b3 - a3 b2, a3 b1 - a1 b3, a1 b2 - a2 b1)", \
        {"cx": cx, "cy": cy, "cz": cz}


# --------------------------------------------------------------------------- #
# 18. LINE_EQ_SLOPE_INTERCEPT
# --------------------------------------------------------------------------- #


def _c_line_slope_intercept(g, m, text):
    a = float(g["a"])
    b = float(g["b"]) * (1.0 if g["sgn"] == "+" else -1.0)
    c = float(g["c"])
    if b == 0:
        return _GATE  # 0*y = ... : no y term, no finite slope/intercept
    slope = -a / b
    inter = c / b
    fs = Fraction(slope).limit_denominator(10000)
    fi = Fraction(inter).limit_denominator(10000)

    def _fr(x: Fraction) -> str:
        return f"{x.numerator}" if x.denominator == 1 \
            else f"{x.numerator}/{x.denominator}"

    ans = (f"y = ({_fr(fs)})x + {_fr(fi)}; slope = {_fr(fs)}, "
           f"y-intercept = {_fr(fi)}")
    steps = [
        f"Rearrange {_fmt(a)}x + {_fmt(b)}y = {_fmt(c)} into y = mx + c:",
        f"{_fmt(b)}y = {_fmt(c)} - ({_fmt(a)})x",
        f"y = ({_fmt(c)} - ({_fmt(a)})x)/{_fmt(b)} = ({_fr(fs)})x + "
        f"{_fr(fi)}",
        f"slope m = {_fr(fs)} = {_fmt(slope)}; y-intercept c = {_fr(fi)} = "
        f"{_fmt(inter)}."]
    return slope, steps, ans, None, "a x + b y = c  ->  y = (-a/b)x + (c/b)", \
        {"slope": slope, "y_intercept": inter}


# --------------------------------------------------------------------------- #
# 19. COMPOUND_ANGLES
# --------------------------------------------------------------------------- #


def _pair_angles(g) -> Tuple[Optional[float], Optional[float]]:
    try:
        a1, b1 = float(g["a1"]), float(g["b1"])
        a2, b2 = float(g["a2"]), float(g["b2"])
    except (TypeError, KeyError):
        return None, None
    if a1 != a2 or b1 != b2:
        return None, None
    return a1, b1


def _c_sin_sum(g, m, text):
    a, b = _pair_angles(g)
    if a is None:
        return _GATE
    v = _snap(_trig_val("sin", a + b))
    steps = [f"Compound angle formula: sin(A)cos(B) + cos(A)sin(B) = "
             f"sin(A + B).",
             f"A = {a:g}, B = {b:g} -> sin({a + b:g} degrees) = {_fmt(v)}."]
    return v, steps, f"{v:g}", None, \
        "sin(A)cos(B) + cos(A)sin(B) = sin(A + B)", None


def _c_sin_diff(g, m, text):
    a, b = _pair_angles(g)
    if a is None:
        return _GATE
    v = _snap(_trig_val("sin", a - b))
    steps = [f"Compound angle formula: sin(A)cos(B) - cos(A)sin(B) = "
             f"sin(A - B).",
             f"A = {a:g}, B = {b:g} -> sin({a - b:g} degrees) = {_fmt(v)}."]
    return v, steps, f"{v:g}", None, \
        "sin(A)cos(B) - cos(A)sin(B) = sin(A - B)", None


def _c_cos_sum(g, m, text):
    a, b = _pair_angles(g)
    if a is None:
        return _GATE
    v = _snap(_trig_val("cos", a + b))
    steps = [f"Compound angle formula: cos(A)cos(B) - sin(A)sin(B) = "
             f"cos(A + B).",
             f"A = {a:g}, B = {b:g} -> cos({a + b:g} degrees) = {_fmt(v)}."]
    return v, steps, f"{v:g}", None, \
        "cos(A)cos(B) - sin(A)sin(B) = cos(A + B)", None


def _c_cos_diff(g, m, text):
    a, b = _pair_angles(g)
    if a is None:
        return _GATE
    v = _snap(_trig_val("cos", a - b))
    steps = [f"Compound angle formula: cos(A)cos(B) + sin(A)sin(B) = "
             f"cos(A - B).",
             f"A = {a:g}, B = {b:g} -> cos({a - b:g} degrees) = {_fmt(v)}."]
    return v, steps, f"{v:g}", None, \
        "cos(A)cos(B) + sin(A)sin(B) = cos(A - B)", None


# --------------------------------------------------------------------------- #
# 20. DISTANCE_POINT_LINE
# --------------------------------------------------------------------------- #


def _c_dist_point_line(g, m, text):
    px, py = float(g["px"]), float(g["py"])
    a = float(g["a"])
    b = float(g["b"]) * (1.0 if g["sgn"] == "+" else -1.0)
    c = -float(g["c0"])  # ax + by = c0  ->  ax + by - c0 = 0
    denom = math.sqrt(a * a + b * b)
    if denom == 0:
        return _GATE  # not a line
    num = abs(a * px + b * py + c)
    d = num / denom
    s_b = "+" if b >= 0 else "-"
    s_c = "+" if c >= 0 else "-"
    steps = [
        f"Line: {_fmt(a)}x {s_b} {abs(b):g}y = {g['c0']}  ->  "
        f"{_fmt(a)}x {s_b} {abs(b):g}y {s_c} {abs(c):g} = 0 "
        f"(a = {_fmt(a)}, b = {_fmt(b)}, c = {_fmt(c)}).",
        "distance = |a x1 + b y1 + c| / sqrt(a^2 + b^2)",
        f"= |{_fmt(a)}x{_fmt(px)} {s_b} {abs(b):g}x{_fmt(py)} {s_c} "
        f"{abs(c):g}| / sqrt({_fmt(a)}^2 + {_fmt(b)}^2) = {_fmt(num)}/"
        f"{_fmt(denom)} = {_fmt(d)}."]
    return d, steps, None, None, \
        "d = |a x1 + b y1 + c| / sqrt(a^2 + b^2)", None


# --------------------------------------------------------------------------- #
# The table: (structure id, trigger regex, compute)
# compute returns (value, steps, answer, assumptions, eq, extra-quantities)
# --------------------------------------------------------------------------- #

_LISTKW = r"(?:the\s+)?(?:(?:data|numbers?|list|set|values?)\s+)?"
_NUMCLS = r"[\d.,:\s]+"

_TABLE: List[Tuple[str, str, Any]] = [
    # ---- statistics ----
    ("MEDIAN",
     r"\bmedian\s+of\s+" + _LISTKW + r"(?P<list>" + _NUMCLS + r")",
     _c_median),
    ("MODE",
     r"\bmode\s+of\s+" + _LISTKW + r"(?P<list>" + _NUMCLS + r")",
     _c_mode),
    ("MEAN_GROUPED",
     r"\b(?:mean|average)\b\s+(?:of\s+)?(?:the\s+)?(?:following\s+)?"
     r"frequency\s+(?:distribution|table)\s*:?\s*(?:x\s*=\s*)?"
     r"(?P<xs>[\d.,\s]+?)\s*,?\s*f\s*=\s*(?P<fs>[\d.,\s]+)",
     _c_mean_grouped),

    # ---- trigonometry ----
    ("TRIG_IDENTITY_EVAL",
     r"\bsin" + _sq("a1") + r"\s*\+\s*cos" + _sq("a2"),
     _c_sin_cos_sq),
    ("TRIG_IDENTITY_EVAL",
     r"\bcos" + _sq("a1") + r"\s*\+\s*sin" + _sq("a2"),
     _c_sin_cos_sq),
    ("TRIG_IDENTITY_EVAL",
     r"1\s*\+\s*\btan" + _sq("ang"),
     _c_1_tan_sq),
    ("TRIG_IDENTITY_EVAL",
     r"1\s*\+\s*\bcot" + _sq("ang"),
     _c_1_cot_sq),
    ("TRIG_IDENTITY_EVAL",
     r"\bsec" + _sq("a1") + r"\s*-\s*\btan" + _sq("a2"),
     _c_sec_tan_sq),
    ("TRIG_IDENTITY_EVAL",
     r"\b(?:cosec|csc)" + _sq("a1") + r"\s*-\s*\bcot" + _sq("a2"),
     _c_csc_cot_sq),

    # ---- coordinate geometry ----
    ("SECTION_FORMULA",
     r"divides?\s+(?:the\s+)?(?:line\s+)?(?:segment\s+)?"
     r"(?:line\s+segment\s+)?(?:join(?:ing|s)?\s+)?(?:the\s+)?"
     r"(?:points?\s+)?" + _pt("a") +
     r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt("b") +
     r".{0,60}?ratio\s*(?P<mm>\d+)\s*:\s*(?P<nn>\d+)",
     _c_section),
    ("AREA_TRIANGLE_COORDS",
     r"area\s+of\s+(?:a\s+|an\s+|the\s+)?triangle\s+"
     r"(?:with\s+|having\s+|whose\s+)?(?:vertices\s+|corners\s+|"
     r"points\s+|coordinates\s+)?" + _pt("a") + r"\s*,\s*" + _pt("b") +
     r"\s*(?:,\s*|and\s+)" + _pt("c"),
     _c_area_tri),
    ("SLOPE_TWO_POINTS",
     r"(?:slope|gradient)\s+of\s+(?:the\s+)?(?:line\s+)?"
     r"(?:join(?:ing|s)?\s+|through\s+|passing\s+through\s+|"
     r"connecting\s+)?(?:the\s+)?(?:points?\s+)?" + _pt("a") +
     r"\s+and\s+(?:the\s+)?(?:points?\s+)?" + _pt("b"),
     _c_slope),
    ("LINE_EQ_SLOPE_INTERCEPT",
     r"(?:slope(?:\s+and\s+y-?intercept)?|y-?intercept(?:\s+and\s+slope)?)"
     r"\s+of\s+(?:the\s+)?line\s+(?P<a>" + _NUM + r")\s*x\s*(?P<sgn>[+-])"
     r"\s*(?P<b>" + _NUM + r")\s*y\s*=\s*(?P<c>" + _NUM + r")",
     _c_line_slope_intercept),
    ("DISTANCE_POINT_LINE",
     r"distance\s+(?:of\s+)?(?:from\s+|between\s+)(?:the\s+)?point\s*"
     + _pt("p") +
     r"\s+(?:and|to)\s+(?:the\s+)?line\s+(?P<a>" + _NUM + r")\s*x\s*"
     r"(?P<sgn>[+-])\s*(?P<b>" + _NUM + r")\s*y\s*=\s*(?P<c0>" + _NUM +
     r")",
     _c_dist_point_line),

    # ---- limits ----
    ("LIMIT_STANDARD",
     _LIM0 + r"sin\s*\(\s*(?P<a>" + _U_NUM + r")?\s*\*?\s*x\s*\)\s*/\s*x\b",
     _c_limit_sin),
    ("LIMIT_STANDARD",
     _LIM0 + r"tan\s*\(\s*(?P<a>" + _U_NUM + r")?\s*\*?\s*x\s*\)\s*/\s*x\b",
     _c_limit_tan),
    ("LIMIT_STANDARD",
     _LIM0 + r"\(?\s*1\s*-\s*cos\s*\(?\s*(?P<a>" + _U_NUM +
     r")?\s*\*?\s*x\s*\)?\s*\)?\s*/\s*x\s*\^\s*2\b",
     _c_limit_1mcos_sq),
    ("LIMIT_STANDARD",
     _LIM0 + r"\(?\s*1\s*-\s*cos\s*\(?\s*(?P<a>" + _U_NUM +
     r")?\s*\*?\s*x\s*\)?\s*\)?\s*/\s*x\b",
     _c_limit_1mcos_lin),
    ("LIMIT_STANDARD",
     _LIM0 + r"\(?\s*e\s*\^\s*x\s*-\s*1\s*\)?\s*/\s*x\b",
     _c_limit_exp),

    # ---- probability ----
    ("PROBABILITY_DEPENDENT",
     r"(?P<nr>\d+)\s+red\s+(?:and\s+)?(?P<nb>\d+)\s+blue"
     r".{0,120}?without\s+replacement.{0,120}?"
     r"(?:p\s*\(\s*both|probability\s+(?:that\s+|of\s+)?both)"
     r"\s*(?:balls?\s*)?(?:are\s+|being\s+)?(?P<col>red|blue)",
     _c_prob_dependent),
    ("PROBABILITY_DEPENDENT",
     r"(?P<nb>\d+)\s+blue\s+(?:and\s+)?(?P<nr>\d+)\s+red"
     r".{0,120}?without\s+replacement.{0,120}?"
     r"(?:p\s*\(\s*both|probability\s+(?:that\s+|of\s+)?both)"
     r"\s*(?:balls?\s*)?(?:are\s+|being\s+)?(?P<col>red|blue)",
     _c_prob_dependent),
    ("PROBABILITY_CONDITIONAL",
     r"given\s+that\s+the\s+(?:second|2nd)\s+(?:ball\s+|draw\s+|card\s+)?"
     r"(?:is\s+|was\s+)?(?P<c2>" + _COLOR + r")"
     r".{0,120}?probability\s+(?:that\s+)?the\s+first"
     r"(?:\s+ball|\s+draw|\s+card)?(?:\s+was|\s+is)?(?:\s+also)?\s+"
     r"(?P<c1>" + _COLOR + r")",
     _c_prob_conditional),

    # ---- binomial ----
    ("BINOMIAL_COEFFICIENT",
     r"coefficient\s+of\s+x\s*\^\s*(?P<k>\d+)\s+in\s+(?:the\s+)?"
     r"expansion\s+of\s+\(\s*(?:x\s*\+\s*(?P<a>" + _NUM + r")"
     r"|(?P<a2>" + _NUM + r")\s*\+\s*x)\s*\)\s*\^\s*(?P<n>\d+)",
     _c_binom),

    # ---- matrices ----
    ("MATRIX_MULTIPLY_2X2",
     r"(?:multiply\s+(?:the\s+)?matri(?:x|ces)\s*|product\s+of\s+"
     r"(?:the\s+)?matri(?:x|ces)\s*)" + _mtx("a") +
     r"\s+(?:by|and|with)\s+(?:the\s+)?(?:matri(?:x|ces)\s*)?" + _mtx("b"),
     _c_matmul),
    ("MATRIX_TRANSPOSE",
     r"transpose\s+of\s+(?:the\s+)?matri(?:x|ces)\s*" + _mtx("m"),
     _c_transpose),

    # ---- series ----
    ("SUM_SQUARES",
     r"sum\s+of\s+(?:the\s+)?squares\s+of\s+(?:the\s+)?first\s+"
     r"(?P<n>\d+)\s+natural\s+numbers?",
     _c_sum_squares),
    ("SUM_CUBES",
     r"sum\s+of\s+(?:the\s+)?cubes\s+of\s+(?:the\s+)?first\s+"
     r"(?P<n>\d+)\s+natural\s+numbers?",
     _c_sum_cubes),
    ("HARMONIC_MEAN",
     r"harmonic\s+mean\s+of\s+(?P<a>" + _U_NUM + r")\s+and\s+(?P<b>"
     + _U_NUM + r")",
     _c_hm_two),
    ("HARMONIC_MEAN",
     r"harmonic\s+mean\s+of\s+" + _LISTKW + r"(?P<list>" + _NUMCLS + r")",
     _c_hm_list),

    # ---- vectors ----
    ("VECTOR_CROSS_PRODUCT",
     r"cross\s+product\s+of\s+(?:the\s+)?(?:vectors?\s+)?"
     r"(?P<ai>" + _NUM + r")\s*\*?\s*i"
     r"(?:\s*\+\s*(?P<aj>" + _NUM + r")\s*\*?\s*j)?"
     r"(?:\s*\+\s*(?P<ak>" + _NUM + r")\s*\*?\s*k)?"
     r"\s+and\s+(?:the\s+)?(?:vector\s+)?"
     r"(?P<bi>" + _NUM + r")\s*\*?\s*i"
     r"(?:\s*\+\s*(?P<bj>" + _NUM + r")\s*\*?\s*j)?"
     r"(?:\s*\+\s*(?P<bk>" + _NUM + r")\s*\*?\s*k)?",
     _c_cross),

    # ---- compound angles ----
    ("COMPOUND_ANGLES",
     _tcall("sin", "a1") + r"\s*\*?\s*" + _tcall("cos", "b1") +
     r"\s*\+\s*" + _tcall("cos", "a2") + r"\s*\*?\s*" + _tcall("sin", "b2"),
     _c_sin_sum),
    ("COMPOUND_ANGLES",
     _tcall("sin", "a1") + r"\s*\*?\s*" + _tcall("cos", "b1") +
     r"\s*-\s*" + _tcall("cos", "a2") + r"\s*\*?\s*" + _tcall("sin", "b2"),
     _c_sin_diff),
    ("COMPOUND_ANGLES",
     _tcall("cos", "a1") + r"\s*\*?\s*" + _tcall("cos", "b1") +
     r"\s*-\s*" + _tcall("sin", "a2") + r"\s*\*?\s*" + _tcall("sin", "b2"),
     _c_cos_sum),
    ("COMPOUND_ANGLES",
     _tcall("cos", "a1") + r"\s*\*?\s*" + _tcall("cos", "b1") +
     r"\s*\+\s*" + _tcall("sin", "a2") + r"\s*\*?\s*" + _tcall("sin", "b2"),
     _c_cos_diff),
]


# --------------------------------------------------------------------------- #
# BOOK-COMPLETE FAMILIES (classes 6-10 arithmetic/algebra/mensuration)
# Derived from the actual textbook inventory: Ganita Prakash 6-8, NCERT
# Mathematics 8-10 (rational numbers, linear equations, squares/cubes,
# comparing quantities, algebraic expressions, mensuration, exponents,
# direct/inverse proportion, factorisation, graphs; real numbers, polynomials,
# linear pairs, quadratics, AP, triangles, coordinate geometry, trigonometry,
# circles, surface areas/volumes, statistics, probability).
# --------------------------------------------------------------------------- #


def _c_frac_add_sub(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    c, d = float(g["c"]), float(g["d"])
    if b == 0 or d == 0:
        return _GATE
    op = (g.get("op1") or "+").strip()
    if op == "-" and "diff" not in text and "-" not in (m.group("op") or ""):
        pass  # operator captured separately below
    is_sub = "-" in (m.group("op") or "")
    den = b * d
    n1, n2 = a * d, c * b
    val = (n1 - n2) / den if is_sub else (n1 + n2) / den
    steps = [
        f"LCM of denominators {b:g} and {d:g} is {den:g}.",
        f"{a:g}/{b:g} = {n1:g}/{den:g} and {c:g}/{d:g} = {n2:g}/{den:g}.",
        f"{'Subtract' if is_sub else 'Add'}: ({n1:g} {'-' if is_sub else '+'} {n2:g})/{den:g} = {_fmt(val)}."]
    return val, steps, None, None, "a/b +/- c/d via LCM", {"num": val}


def _c_frac_mul_div(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    c, d = float(g["c"]), float(g["d"])
    if b == 0 or d == 0:
        return _GATE
    is_div = "divid" in text or m.group("op") in ("/", "÷")
    if is_div:
        val = (a * d) / (b * c) if c != 0 else None
        if val is None:
            return _GATE
        steps = [f"Dividing by {c:g}/{d:g} means multiplying by {d:g}/{c:g}.",
                 f"{a:g}/{b:g} x {d:g}/{c:g} = {_fmt(a * d)}/{_fmt(b * c)} = {_fmt(val)}."]
        eq = "(a/b) / (c/d) = (a x d)/(b x c)"
    else:
        val = (a * c) / (b * d)
        steps = [f"Multiply numerators and denominators: ({a:g} x {c:g})/({b:g} x {d:g}).",
                 f"= {_fmt(val)}."]
        eq = "(a/b) x (c/d) = (a x c)/(b x d)"
    return val, steps, None, None, eq, None


def _c_hcf(g, m, text):
    a, b = int(float(g["a"])), int(float(g["b"]))
    if a <= 0 or b <= 0:
        return _GATE
    x, y = a, b
    while y:
        x, y = y, x % y
    steps = [f"Euclid's algorithm: HCF({a}, {b}).",
             f"HCF({a}, {b}) = {x}."]
    return float(x), steps, str(x), None, "HCF via Euclid's algorithm", None


def _c_lcm(g, m, text):
    a, b = int(float(g["a"])), int(float(g["b"]))
    if a <= 0 or b <= 0:
        return _GATE
    x, y = a, b
    while y:
        x, y = y, x % y
    l = a * b // x
    steps = [f"HCF({a}, {b}) = {x}.",
             f"LCM(a, b) = (a x b)/HCF = ({a} x {b})/{x} = {l}."]
    return float(l), steps, str(l), None, "LCM = (a x b)/HCF", None


def _c_percent_of(g, m, text):
    p, n = float(g["p"]), float(g["n"])
    val = p * n / 100.0
    steps = [f"{p:g}% of {n:g} = ({p:g}/100) x {n:g} = {_fmt(val)}."]
    return val, steps, None, None, "p% of N = (p/100) x N", None


def _c_percent_change(g, m, text):
    a, b = float(g["a"]), float(g["b"])
    if a == 0:
        return _GATE
    change = (b - a) / a * 100.0
    kind = "increase" if change >= 0 else "decrease"
    steps = [f"Change = {b:g} - {a:g} = {_fmt(b - a)}.",
             f"% {kind} = (change/original) x 100 = ({_fmt(b - a)}/{a:g}) x 100 = {_fmt(abs(change))}%."]
    return abs(change), steps, f"{_fmt(abs(change))}% {kind}", None, \
        "% change = (new - old)/old x 100", None


def _c_profit_loss(g, m, text):
    cp, sp = float(g["cp"]), float(g["sp"])
    diff = sp - cp
    if cp == 0:
        return _GATE
    pct = abs(diff) / cp * 100.0
    kind = "profit" if diff >= 0 else "loss"
    steps = [f"CP = {cp:g}, SP = {sp:g}. SP - CP = {_fmt(diff)} ({kind}).",
             f"{kind.capitalize()}% = ({_fmt(abs(diff))}/{cp:g}) x 100 = {_fmt(pct)}%."]
    return pct, steps, f"{kind} of {_fmt(abs(diff))} ({_fmt(pct)}%)", None, \
        "profit/loss% = |SP - CP|/CP x 100", {"diff": diff}


def _c_si(g, m, text):
    p = float(g["p"]); r = float(g["r"]); t = float(g["t"])
    si = p * r * t / 100.0
    steps = [f"SI = (P x R x T)/100 = ({p:g} x {r:g} x {t:g})/100 = {_fmt(si)}."]
    want_amt = "amount" in text
    if want_amt:
        steps.append(f"Amount = P + SI = {p:g} + {_fmt(si)} = {_fmt(p + si)}.")
    return (p + si) if want_amt else si, steps, None, None, \
        "SI = PRT/100", None


def _c_ci(g, m, text):
    p = float(g["p"]); r = float(g["r"]); t = float(g["t"])
    amt = p * (1 + r / 100.0) ** t
    ci = amt - p
    steps = [f"Amount = P(1 + R/100)^T = {p:g}(1 + {r:g}/100)^{t:g} = {_fmt(amt)}.",
             f"CI = Amount - P = {_fmt(amt)} - {p:g} = {_fmt(ci)}."]
    want_amt = "amount" in text
    return amt if want_amt else ci, steps, None, None, \
        "A = P(1 + R/100)^T", None


def _c_ratio_share(g, m, text):
    total = float(g["total"])
    parts = [float(x) for x in (g["r1"], g["r2"])]
    ssum = sum(parts)
    if ssum == 0:
        return _GATE
    shares = [total * p / ssum for p in parts]
    steps = [f"Total ratio parts = {parts[0]:g} + {parts[1]:g} = {ssum:g}.",
             f"Share 1 = ({parts[0]:g}/{ssum:g}) x {total:g} = {_fmt(shares[0])}.",
             f"Share 2 = ({parts[1]:g}/{ssum:g}) x {total:g} = {_fmt(shares[1])}."]
    extra = {"s1": shares[0], "s2": shares[1]}
    return shares[0], steps, f"{_fmt(shares[0])} and {_fmt(shares[1])}", None, \
        "share = (ratio part/total parts) x amount", extra


def _c_unitary(g, m, text):
    n1 = float(g["n1"]); cost = float(g["cost"]); n2 = float(g["n2"])
    if n1 == 0:
        return _GATE
    one = cost / n1
    val = one * n2
    steps = [f"Cost of 1 article = {cost:g}/{n1:g} = {_fmt(one)}.",
             f"Cost of {n2:g} articles = {_fmt(one)} x {n2:g} = {_fmt(val)}."]
    return val, steps, None, None, "unitary method", {"unit_cost": one}


def _c_sdt(g, m, text):
    d = g.get("d") or g.get("d2"); t = g.get("t") or g.get("t2"); s = g.get("s")
    if "speed" in text and s is None and d is not None and t is not None:
        dd, tt = float(d), float(t)
        if tt == 0:
            return _GATE
        v = dd / tt
        return v, [f"Speed = Distance/Time = {dd:g}/{tt:g} = {_fmt(v)} km/h."], \
            None, None, "speed = distance/time", None
    if "distance" in text and d is None and s is not None and t is not None:
        ss, tt = float(s), float(t)
        dd = ss * tt
        return dd, [f"Distance = Speed x Time = {ss:g} x {tt:g} = {_fmt(dd)} km."], \
            None, None, "distance = speed x time", None
    if "time" in text and t is None and s is not None and d is not None:
        ss, dd = float(s), float(d)
        if ss == 0:
            return _GATE
        tt = dd / ss
        return tt, [f"Time = Distance/Speed = {dd:g}/{ss:g} = {_fmt(tt)} h."], \
            None, None, "time = distance/speed", None
    return _GATE


def _c_time_work(g, m, text):
    a = float(g["a"]); b = float(g["b"])
    if a <= 0 or b <= 0:
        return _GATE
    together = a * b / (a + b)
    steps = [f"A's 1-day work = 1/{a:g}, B's 1-day work = 1/{b:g}.",
             f"Together = 1/{a:g} + 1/{b:g} = ({b:g} + {a:g})/({a:g} x {b:g}).",
             f"Time together = ({a:g} x {b:g})/({a:g} + {b:g}) = {_fmt(together)} days."]
    return together, steps, None, None, "combined time = ab/(a+b)", None


def _c_linear_solve(g, m, text):
    a = float(g["a"]); b = float(g["b"]); c = float(g["c"])
    if a == 0:
        return _GATE
    x = (c - b) / a
    steps = [f"{a:g}x {'+' if b >= 0 else '-'} {abs(b):g} = {c:g}.",
             f"{a:g}x = {c:g} {'-' if b >= 0 else '+'} {abs(b):g} = {_fmt(c - b)}.",
             f"x = {_fmt(c - b)}/{a:g} = {_fmt(x)}."]
    return x, steps, f"x = {_fmt(x)}", None, "ax + b = c", None


def _c_quad_roots(g, m, text):
    a = float(g["a"])
    b = float(g["b"]) * (-1 if (m.group("bop") or "-") == "-" else 1)
    c = float(g["c"]) * (-1 if (m.group("cop") or "-") == "-" else 1)
    if a == 0:
        return _GATE
    disc = b * b - 4 * a * c
    if disc < 0:
        return _GATE
    r1 = (-b + disc ** 0.5) / (2 * a)
    r2 = (-b - disc ** 0.5) / (2 * a)
    steps = [f"Discriminant = b^2 - 4ac = {b:g}^2 - 4({a:g})({c:g}) = {_fmt(disc)}.",
             f"x = (-b +/- sqrt(D))/2a = ({-b:g} +/- {_fmt(disc ** 0.5)})/{2 * a:g}.",
             f"Roots: x = {_fmt(r1)} and x = {_fmt(r2)}."]
    extra = {"r1": r1, "r2": r2, "discriminant": disc}
    return r1, steps, f"x = {_fmt(r1)}, x = {_fmt(r2)}", None, \
        "x = (-b +/- sqrt(b^2 - 4ac))/2a", extra


def _c_ap_nth(g, m, text):
    a = float(g["a"]); d = float(g["d"]); n = float(g["n"])
    val = a + (n - 1) * d
    steps = [f"a_n = a + (n - 1)d = {a:g} + ({n:g} - 1)({d:g}).",
             f"= {a:g} + {_fmt((n - 1) * d)} = {_fmt(val)}."]
    return val, steps, None, None, "a_n = a + (n-1)d", None


def _c_ap_sum(g, m, text):
    a = float(g["a"]); d = float(g["d"]); n = float(g["n"])
    val = n * (2 * a + (n - 1) * d) / 2
    steps = [f"S_n = n/2 [2a + (n - 1)d] = {n:g}/2 [2({a:g}) + ({n:g} - 1)({d:g})].",
             f"= {_fmt(val)}."]
    return val, steps, None, None, "S_n = n/2 [2a + (n-1)d]", None


def _c_gp_nth(g, m, text):
    a = float(g["a"]); r = float(g["r"]); n = float(g["n"])
    val = a * r ** (n - 1)
    steps = [f"a_n = a r^(n-1) = {a:g} x {r:g}^({n:g} - 1).",
             f"= {a:g} x {_fmt(r ** (n - 1))} = {_fmt(val)}."]
    return val, steps, None, None, "a_n = a r^(n-1)", None


def _c_circle_area(g, m, text):
    r = float(g["r"])
    val = 22.0 / 7.0 * r * r if abs(r * 7 / 22 - round(r * 7 / 22)) < 1e-9 or True else 3.14159 * r * r
    val = 3.141592653589793 * r * r
    steps = [f"Area = pi r^2 = 3.14159 x {r:g}^2 = {_fmt(val)}.",
             f"(Using 22/7: {_fmt(22.0 / 7.0 * r * r)}.)"]
    return val, steps, None, None, "area = pi r^2", None


def _c_circle_circum(g, m, text):
    r = float(g["r"])
    val = 2 * 3.141592653589793 * r
    steps = [f"Circumference = 2 pi r = 2 x 3.14159 x {r:g} = {_fmt(val)}.",
             f"(Using 22/7: {_fmt(2 * 22.0 / 7.0 * r)}.)"]
    return val, steps, None, None, "circumference = 2 pi r", None


def _c_rect_area(g, m, text):
    l = float(g["l"]); w = float(g["w"])
    val = l * w
    steps = [f"Area = length x breadth = {l:g} x {w:g} = {_fmt(val)}."]
    per = 2 * (l + w)
    extra = {"area": val, "perimeter": per}
    return val, steps, None, None, "area = l x b", extra


def _c_square_area(g, m, text):
    s = float(g["s"])
    val = s * s
    steps = [f"Area = side^2 = {s:g}^2 = {_fmt(val)}.",
             f"Perimeter = 4 x {s:g} = {_fmt(4 * s)}."]
    extra = {"area": val, "perimeter": 4 * s}
    return val, steps, None, None, "area = side^2", extra


def _c_pythagoras(g, m, text):
    a = float(g["a"]); b = float(g["b"])
    h = (a * a + b * b) ** 0.5
    steps = [f"Hypotenuse^2 = {a:g}^2 + {b:g}^2 = {_fmt(a * a)} + {_fmt(b * b)} = {_fmt(a * a + b * b)}.",
             f"Hypotenuse = sqrt({_fmt(a * a + b * b)}) = {_fmt(h)}."]
    return h, steps, None, None, "h^2 = a^2 + b^2", None


def _c_volume_cube(g, m, text):
    s = float(g["s"])
    v = s ** 3
    steps = [f"Volume of cube = edge^3 = {s:g}^3 = {_fmt(v)}.",
             f"Surface area = 6 x {s:g}^2 = {_fmt(6 * s * s)}."]
    extra = {"volume": v, "surface_area": 6 * s * s}
    return v, steps, None, None, "V = edge^3", extra


def _c_volume_cyl(g, m, text):
    r = float(g["r"]); h = float(g["h"])
    v = 3.141592653589793 * r * r * h
    steps = [f"Volume of cylinder = pi r^2 h = 3.14159 x {r:g}^2 x {h:g} = {_fmt(v)}."]
    return v, steps, None, None, "V = pi r^2 h", None


def _c_volume_sphere(g, m, text):
    r = float(g["r"])
    v = 4.0 / 3.0 * 3.141592653589793 * r ** 3
    steps = [f"Volume of sphere = (4/3) pi r^3 = (4/3) x 3.14159 x {r:g}^3 = {_fmt(v)}.",
             f"Surface area = 4 pi r^2 = {_fmt(4 * 3.141592653589793 * r * r)}."]
    extra = {"volume": v, "surface_area": 4 * 3.141592653589793 * r * r}
    return v, steps, None, None, "V = (4/3) pi r^3", extra


def _c_exp_eval(g, m, text):
    b = float(g["b"]); e = float(g["e"])
    if e > 40 or abs(b) > 1000:
        return _GATE
    val = b ** e
    steps = [f"{b:g}^{e:g} = {_fmt(val)}."]
    return val, steps, None, None, "base^exponent", None


def _c_root_perfect(g, m, text):
    n = float(g["n"])
    is_cube = "cube" in text
    if is_cube:
        r = round(n ** (1.0 / 3.0))
        if r ** 3 != n:
            return _GATE
        return float(r), [f"Cube root of {n:g}: {r:g}^3 = {n:g}, so the cube root is {r:g}."], \
            str(r), None, "cube root", None
    r = round(n ** 0.5)
    if r * r != n:
        return _GATE
    return float(r), [f"Square root of {n:g}: {r:g}^2 = {n:g}, so the square root is {r:g}."], \
        str(r), None, "square root", None


_BOOK_ROWS = [
    ("FRACTION_ADD_SUB",
     r"(?P<a>" + _NUM + r")\s*/\s*(?P<b>" + _U_NUM + r")\s*(?P<op>[-+])\s*(?P<c>"
     + _NUM + r")\s*/\s*(?P<d>" + _U_NUM + r")",
     _c_frac_add_sub),
    ("FRACTION_MUL_DIV",
     r"(?P<a>" + _NUM + r")\s*/\s*(?P<b>" + _U_NUM + r")\s*(?P<op>[x*÷/]|times|multiplied by|divided by)\s*(?P<c>"
     + _NUM + r")\s*/\s*(?P<d>" + _U_NUM + r")",
     _c_frac_mul_div),
    ("HCF_TWO_NUMBERS",
     r"hc[fp]\b\s*(?:of\b)?\s*(?:the\s*)?(?:two\s*)?(?:numbers?\s*)?(?P<a>\d+)\s*(?:and|,)\s*(?P<b>\d+)",
     _c_hcf),
    ("LCM_TWO_NUMBERS",
     r"lcm\b\s*(?:of\b)?\s*(?:the\s*)?(?:two\s*)?(?:numbers?\s*)?(?P<a>\d+)\s*(?:and|,)\s*(?P<b>\d+)",
     _c_lcm),
    ("PERCENT_OF",
     r"(?P<p>" + _U_NUM + r")\s*%\s*(?:of)\s*(?P<n>" + _NUM + r")",
     _c_percent_of),
    ("PERCENT_CHANGE",
     r"percentage\s+(?:increase|decrease|change)\s+(?:from\s*|when\s+(?:the\s+)?)\s*"
     r"(?P<a>" + _NUM + r")\s*(?:to|and)\s*(?P<b>" + _NUM + r")",
     _c_percent_change),
    ("PROFIT_LOSS_PERCENT",
     r"(?:cp\b|cost\s*price|buys?\b|bought\b|purchased?\b)[^0-9]{0,40}(?P<cp>" + _NUM + r")"
     r".{0,120}?(?:sp\b|selling\s*price|sells?\b[^0-9]{0,20}for|sold\b[^0-9]{0,20}for)[^0-9]{0,30}(?P<sp>" + _NUM + r")"
     r".{0,60}?(?:profit|loss)",
     _c_profit_loss),
    ("SIMPLE_INTEREST",
     r"simple\s+interest\s+(?:on|of)\s+(?:rs\.?\s*|rs\s*|₹\s*|inr\s*)?(?P<p>" + _NUM + r")"
     r".{0,40}?(?:at|@|rate)\s*(?P<r>" + _U_NUM + r")\s*%"
     r".{0,40}?(?:for|in|per annum for|per\s*annum,?\s*for)?\s*(?P<t>" + _U_NUM + r")\s*years?",
     _c_si),
    ("COMPOUND_INTEREST",
     r"compound(?:ed)?\s+(?:annually,?\s*)?(?:interest|amount)\s+(?:on|of)\s+"
     r"(?:rs\.?\s*|rs\s*|₹\s*|inr\s*)?(?P<p>" + _NUM + r")"
     r".{0,40}?(?:at|@|rate)\s*(?P<r>" + _U_NUM + r")\s*%"
     r".{0,40}?(?:for|in|per\s*annum,?\s*for)?\s*(?P<t>" + _U_NUM + r")\s*years?",
     _c_ci),
    ("RATIO_SHARE",
     r"divid\w+\s+(?:rs\.?\s*|rs\s*|₹\s*)?(?P<total>" + _NUM + r")\s+(?:in\s+the\s+ratio\s*)?(?P<r1>" + _U_NUM + r")\s*:\s*(?P<r2>" + _U_NUM + r")",
     _c_ratio_share),
    ("UNITARY",
     r"(?:if\s*)?(?:the\s*)?cost\s+of\s+(?P<n1>" + _U_NUM + r")\s*(?:articles?|items?|pens?|books?| notebooks?|kg|kilograms?)\s+is\s+(?:rs\.?\s*|₹\s*)?(?P<cost>"
     + _NUM + r")\s*,?\s*(?:then\s*)?(?:what\s*is\s*(?:the\s*)?cost|find\s*(?:the\s*)?cost|cost)\s+of\s+(?P<n2>"
     + _U_NUM + r")",
     _c_unitary),
    ("SPEED_DIST_TIME",
     r"(?:(?:find|what)\s+(?:is\s+)?the\s+(?P<kind>speed|distance|time)\b)?"
     r"(?P<s>" + _NUM + r")?\s*(?:km/h|km\/h|kmph)?"
     r"(?:[^0-9]{0,40}(?P<d2>" + _NUM + r")\s*km\b)?"
     r"(?:[^0-9]{0,40}(?P<t2>" + _U_NUM + r")\s*(?:hours?|hrs?|h\b))?",
     _c_sdt),
    ("TIME_WORK_TOGETHER",
     r"\bA\s+(?:can\s+)?(?:do(?:es)?)?\s*(?:a\s+)?(?:work|job)\s+in\s+(?P<a>" + _U_NUM + r")\s*days?\b"
     r".{0,60}?\bB\s+(?:can\s+)?(?:do(?:es)?)?\s*(?:it|the\s+(?:work|job))\s+in\s+(?P<b>" + _U_NUM + r")\s*days?",
     _c_time_work),
    ("LINEAR_SOLVE",
     r"solve[:\s]+(?P<a>" + _NUM + r")\s*x\s*(?P<op>[-+])\s*(?P<b>" + _NUM + r")\s*=\s*(?P<c>" + _NUM + r")",
     _c_linear_solve),
    ("QUADRATIC_ROOTS",
     r"roots?\s+of\s+(?P<a>" + _NUM + r")\s*x\s*\^\s*2\s*(?P<bop>[-+])\s*(?P<b>" + _NUM + r")\s*x\s*(?P<cop>[-+])\s*(?P<c>"
     + _NUM + r")\s*=\s*0",
     _c_quad_roots),
    ("AP_NTH",
     r"(?:(?:find|what\s+is)\s+the\s+)?(?P<n>" + _U_NUM + r")\s*(?:th|st|nd|rd)\s+term\s+of\s+(?:the\s+)?(?:ap|a\.p\.|arithmetic\s+progression)"
     r".{0,40}?first\s+term\s+(?:is\s+)?(?P<a>" + _NUM + r")"
     r".{0,40}?common\s+difference\s+(?:is\s+)?(?P<d>" + _NUM + r")",
     _c_ap_nth),
    ("AP_SUM",
     r"sum\s+of\s+(?:the\s+)?first\s+(?P<n>" + _U_NUM + r")\s+terms?\s+of\s+(?:the\s+)?(?:ap|a\.p\.|arithmetic\s+progression)"
     r".{0,40}?first\s+term\s+(?:is\s+)?(?P<a>" + _NUM + r")"
     r".{0,40}?common\s+difference\s+(?:is\s+)?(?P<d>" + _NUM + r")",
     _c_ap_sum),
    ("GP_NTH",
     r"(?:(?:find|what\s+is)\s+the\s+)?(?P<n>" + _U_NUM + r")\s*(?:th|st|nd|rd)\s+term\s+of\s+(?:the\s+)?(?:gp|g\.p\.|geometric\s+progression)"
     r".{0,40}?first\s+term\s+(?:is\s+)?(?P<a>" + _NUM + r")"
     r".{0,40}?(?:common\s+ratio|ratio)\s+(?:is\s+)?(?P<r>" + _NUM + r")",
     _c_gp_nth),
    ("CIRCLE_AREA",
     r"area\s+of\s+(?:a\s+)?circle\s+(?:of|with)\s+radius\s+(?:is\s+)?(?P<r>" + _NUM + r")",
     _c_circle_area),
    ("CIRCLE_CIRCUMFERENCE",
     r"circumference\s+of\s+(?:a\s+)?circle\s+(?:of|with)\s+radius\s+(?:is\s+)?(?P<r>" + _NUM + r")",
     _c_circle_circum),
    ("RECT_AREA",
     r"area\s+of\s+(?:a\s+)?rectangle\s+(?:of|with)?\s*(?:length\s*)?(?:is\s+)?(?P<l>" + _NUM + r")"
     r"\s*(?:cm|m|meters?|metres?)?\s*(?:and|by|x|\*)\s*(?:breadth|width|breath)\s*(?:is\s+)?(?P<w>" + _NUM + r")",
     _c_rect_area),
    ("SQUARE_AREA",
     r"area\s+of\s+(?:a\s+)?square\s+(?:of|with)\s+side\s+(?:is\s+)?(?P<s>" + _NUM + r")",
     _c_square_area),
    ("PYTHAGORAS",
     r"hypotenuse\s+of\s+(?:a\s+)?right(?:\s*[- ])?angled?\s+triangle\s+(?:with|having|whose)\s+(?:legs?|sides?|arms?)\s+(?:of\s*)?(?:is\s+)?(?P<a>"
     + _NUM + r")\s*(?:cm|m|,)?\s*and\s*(?P<b>" + _NUM + r")",
     _c_pythagoras),
    ("VOLUME_CUBE",
     r"volume\s+of\s+(?:a\s+)?cube\s+(?:of|with)\s+(?:edge|side)\s+(?:is\s+)?(?P<s>" + _NUM + r")",
     _c_volume_cube),
    ("VOLUME_CYLINDER",
     r"volume\s+of\s+(?:a\s+)?cylinder\s+(?:of|with)\s+radius\s+(?:is\s+)?(?P<r>" + _NUM + r")"
     r"\s*(?:cm|m)?\s*(?:and|,)\s*(?:height\s*)?(?:is\s+)?(?P<h>" + _NUM + r")",
     _c_volume_cyl),
    ("VOLUME_SPHERE",
     r"volume\s+of\s+(?:a\s+)?sphere\s+(?:of|with)\s+radius\s+(?:is\s+)?(?P<r>" + _NUM + r")",
     _c_volume_sphere),
    ("EXPONENT_EVAL",
     r"(?:evaluate|value\s+of)\s+(?P<b>" + _NUM + r")\s*\^\s*(?P<e>\d{1,2})\b",
     _c_exp_eval),
    ("ROOT_PERFECT",
     r"(?:square|cube)\s+root\s+of\s+(?P<n>\d+)",
     _c_root_perfect),
]

_TABLE.extend(_BOOK_ROWS)


TABLE = _TABLE

TABLE = _TABLE


def model_maths2(text: str) -> ModelResult:
    """Dispatcher: scan every maths2 family; first grounded hit wins.

    Triggers are deterministic regexes with named slots; each row applies
    its own plausibility gates inside compute, and a gate refusal simply
    lets the scan continue.  Never calls an LLM.
    """
    norm = _normalize(text)
    for fid, pattern, compute in TABLE:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, norm)
        except Exception:
            continue
        if not out:
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        return _res(fid, g, value, eq or fid, steps or [], answer=answer,
                    assumptions=assumptions, extra=extra or {})
    return _no("MATHS2", "no maths2 family matched")
