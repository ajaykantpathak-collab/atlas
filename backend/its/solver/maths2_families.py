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
