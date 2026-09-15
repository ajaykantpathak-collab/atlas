"""math_kernel.py — The Math Language Kernel (MLK), Stage 0 of the router.

Mathematical language is a FORMAL language: "integral of x^2 from 0 to
3", "solve x^2 - 5x + 6 = 0", "how many 4-digit numbers from digits 1
to 5 without repetition". These are OPERATION PATTERNS, each mapping
directly to a deterministic engine call (cascade / sympy / closed
formula). No NER, no embeddings, no slot guessing.

Layers:
    1. Expression preprocessing  (unicode/LaTeX-lite -> sympy syntax,
       implicit multiplication: 2x -> 2*x)
    2. Operation router          (solve system, solve equation,
       integrate, differentiate, limit, evaluate)
    3. Word models               (AP/GP series, bag probability,
       counting P(n,r)/C(n,r), distance-from-origin, trig max/min,
       linear systems from prose)

Every result is computed by sympy/cascade: a float when the ask is
numeric, or a SymbolicAnswer (canonical ASCII expression string) when
the ask is an expression -- derivative, indefinite integral -- gated
by _symbolic_safe so nothing partially evaluated ever ships.
This kernel runs BEFORE all other router stages.
"""

from __future__ import annotations

import re
import unicodedata
from typing import Dict, List, NamedTuple, Optional, Tuple

# --------------------------------------------------------------------------- #
# Expression preprocessing + parsing
# --------------------------------------------------------------------------- #

_UNICODE_SUBS = [
    ("𝒙", "x"), ("𝑥", "x"), ("𝑦", "y"), ("𝑧", "z"), ("𝑛", "n"),
    ("×", "*"), ("·", "*"), ("⋅", "*"), ("÷", "/"), ("−", "-"),
    ("–", "-"), ("√", "sqrt"), ("π", "pi"), ("²", "**2"), ("³", "**3"),
    ("⁴", "**4"), ("≤", "<="), ("≥", ">="), ("", ""), ("", ""),
    ("′", "'"),
]


def preprocess(text: str) -> str:
    t = unicodedata.normalize("NFKC", text or "")
    for a, b in _UNICODE_SUBS:
        t = t.replace(a, b)
    t = re.sub(r"\^\s*\(([^()]*)\)", r"**(\1)", t)   # ^{...} / ^(...)
    t = re.sub(r"\^\s*(-?\d+)", r"**\1", t)          # ^2 -> **2
    t = re.sub(r"(?<![a-zA-Z0-9_])log\s*\(", "log(", t)
    return t


def parse_expression(expr: str):
    """Math substring -> sympy expression (implicit multiplication ok)."""
    import sympy
    from sympy.parsing.sympy_parser import (
        implicit_multiplication_application, parse_expr,
        standard_transformations)

    s = preprocess(expr).strip().rstrip(".,;?")
    s = re.sub(r"\s+", " ", s)
    if not s:
        return None
    try:
        transformations = standard_transformations + (
            implicit_multiplication_application,)
        return parse_expr(s, transformations=transformations, evaluate=True)
    except Exception:
        return None


# --------------------------------------------------------------------------- #
# Unicode normalization (PDF-mangled math -> kernel-readable ASCII)
# --------------------------------------------------------------------------- #

_SUPERSCRIPT_MAP = {
    "\u2070": "0", "\u00b9": "1", "\u00b2": "2", "\u00b3": "3",
    "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7",
    "\u2078": "8", "\u2079": "9", "\u207a": "+", "\u207b": "-",
    "\u207f": "n",
}
_SUPERSCRIPT_RUN_RE = re.compile(
    "[\u2070\u00b9\u00b2\u00b3\u2074-\u2079\u207a\u207b\u207f]+")

# unicode operators whose ASCII meaning is exact.  Runs BEFORE NFKC:
# NFKC would flatten x^2 (U+00B2) to the digit sequence "x2" and the
# exponent meaning would be lost.
_MATH_OPERATOR_SUBS = [
    ("\u2212", "-"), ("\u2010", "-"), ("\u2011", "-"), ("\u2013", "-"),
    ("\u2014", "-"), ("\u2015", "-"),
    ("\u00d7", "*"), ("\u00b7", "*"), ("\u22c5", "*"), ("\u2217", "*"),
    ("\u00f7", "/"),
    ("\u2264", "<="), ("\u2265", ">="), ("\u2260", "!="),
    ("\u2261", "="),
    ("\u2208", " in "),
    ("\u221a", "sqrt"), ("\u03c0", "pi"),
    ("\u2032", "'"), ("\u2033", "''"),
    ("\u210e", "h"),
]


def _superscript_run_to_caret(match) -> str:
    """'x^2 x^3' superscript runs -> caret form.  A multi-char run
    that is not a plain (signed) number is parenthesized: 2^(n+1)
    must never reparse as 2^n + 1."""
    body = "".join(_SUPERSCRIPT_MAP.get(ch, "") for ch in match.group(0))
    if not body:
        return match.group(0)
    if re.fullmatch(r"\d+|[+-]\d+", body):
        return "^" + body
    return "^(" + body + ")"


# flattened exponent repair: "ax2" -> "ax^2".  Fires ONLY in
# polynomial-like context (an '=' or solve/equation vocabulary) and
# never on coefficients ("2x"), scientific notation ("2 x 10^-3"),
# function names ("log2") or lone "10x3" multiplication.
_FLAT_EXP_WORD_RE = re.compile(r"[A-Za-z]+[23](?![0-9.^])")
_FUNC_TAIL_RE = re.compile(
    r"(?:log10|log2|antilog|log|ln|lim|max|min|sin|cos|tan|cot|sec|"
    r"csc|exp|sqrt|sinh|cosh|tanh|gcd|lcm)\Z", re.I)
_POLY_CONTEXT_RE = re.compile(
    r"=|\b(?:solve|equation|quadratic|polynomial|roots?|derivative|"
    r"differentiate|integral|integrate|limit)\b", re.I)


def _fix_flattened_exponents(t: str) -> str:
    if not _POLY_CONTEXT_RE.search(t):
        return t

    # multi-digit flattened exponents first ("6x100" -> "6x^100",
    # "x55" -> "x^55"): a single letter variable directly followed by
    # 2+ digits, in polynomial/derivative context, is an exponent --
    # "10x3"-style multiplication only ever flattens ONE digit.
    def _repl_multi(m):
        return m.group(1) + "^" + m.group(2)

    t = re.sub(r"\b([a-z])(\d{2,3})\b", _repl_multi, t, flags=re.I)

    # same repair when the variable follows its coefficient with no
    # gap ("6x100" -> "6x^100"): here NO \b exists before the letter
    # (digit '6' + letter 'x' are both word chars), so the rule above
    # misses it.  The letter must NOT be preceded by another letter
    # (that protects function names: "log100", "sin30") and 'e' is
    # excluded outright so unspaced scientific notation ("2e10") is
    # never mangled into 2*e^10.
    t = re.sub(r"(?<![a-zA-Z^])([a-df-z])(\d{2,3})\b", _repl_multi, t,
               flags=re.I)

    def _repl(match) -> str:
        word = match.group(0)
        letter, digit = word[-2], word[-1]
        if _FUNC_TAIL_RE.search(word[:-1]):
            return word                 # log2, sin3, max2: a function
        prev = t[match.start() - 1] if match.start() else ""
        if prev.isdigit() and t.lower().count(letter.lower()) < 2:
            return word                 # "10x3 = 30": x is the times sign
        return word[:-1] + "^" + digit

    return _FLAT_EXP_WORD_RE.sub(_repl, t)


def normalize_unicode_math(text: str) -> str:
    """Lossless Lane A preprocessing for PDF-mangled math.

    (a) Mathematical Alphanumeric Symbols block -> ASCII letters
        (NFKC handles the block once exponents are safe),
    (b) unicode operators -> ASCII (-, *, /, <=, !=, sqrt, ...),
    (c) superscript runs -> ^ notation, before NFKC can flatten
        x^2 into "x2",
    (d) flattened exponents "ax2" -> "ax^2", only in polynomial-like
        context (never "2x", never "2 x 10^-3").
    Never changes mathematical meaning; ends with a corruption
    self-check -- a backspace byte (chr(8)) can only appear if a
    transport bug mangled a regex on the way in.
    """
    t = text or ""
    t = _SUPERSCRIPT_RUN_RE.sub(_superscript_run_to_caret, t)
    for a, b in _MATH_OPERATOR_SUBS:
        t = t.replace(a, b)
    t = unicodedata.normalize("NFKC", t)
    t = _fix_flattened_exponents(t)
    assert chr(8) not in t, "backspace byte in normalized math text"
    return t


def _num(value) -> float:
    import sympy

    return float(sympy.N(value))


_MATH_FUNCS = {"sqrt", "sin", "cos", "tan", "log", "exp", "pi", "asin",
               "acos", "atan", "sinh", "cosh", "tanh", "ln", "abs"}


def _is_prose_token(tok: str) -> bool:
    """Pure alphabetic words (len>=2) that are not math functions are
    prose: implicit multiplication would happily turn them into symbol
    products, which we must reject before parsing."""
    t = tok.lower().strip("(){}[],.?")
    return t.isalpha() and len(t) >= 2 and t not in _MATH_FUNCS


def _math_tail(segment: str):
    """Longest parsing tail of a text segment whose free symbols are all
    single letters ('Solve the quadratic equation x**2 - 5*x + 6' ->
    x**2 - 5*x + 6). Drops prose prefixes deterministically."""
    tokens = segment.split()
    for i in range(len(tokens)):
        window = tokens[i:]
        if any(_is_prose_token(w) for w in window[:-1]):
            continue  # prose inside the window - not pure math yet
        candidate = " ".join(window)
        expr = parse_expression(candidate)
        if expr is not None and all(
                len(str(s)) == 1 for s in expr.free_symbols):
            return expr
    return None


# --------------------------------------------------------------------------- #
# Layer 3 models (word-level, closed formulas)
# --------------------------------------------------------------------------- #

def _model_linear_system(text: str) -> Optional[Tuple[float, List[str]]]:
    """'2x + 3y = 12 and x - y = 1 ... find x' -> solve the system."""
    if "=" not in text:
        return None
    segments = re.split(r"\band\b|\bwhere\b|[,;]", text, flags=re.I)
    eqs = []
    for seg in segments:
        if seg.count("=") != 1:
            continue
        lhs, _, rhs = seg.partition("=")
        lhs_e = _math_tail(lhs)
        rhs_e = _math_tail(rhs)
        if lhs_e is None or rhs_e is None:
            continue
        eqs.append(lhs_e - rhs_e)
    # 'where y is -6' / 'where y = -6' givens complete the system.
    # Givens come only from POST-'where' text -- harvesting the main
    # equation side ('x+y = 30' -> y=30) once made systems inconsistent.
    import sympy as _sp
    where_parts = re.split(r"\bwhere\b", text, flags=re.I)
    givens_text = " ".join(where_parts[1:]) if len(where_parts) > 1 else ""
    for m in re.finditer(
            r"\b([a-z])\s+(?:is|=)\s*(-?\d+(?:\.\d+)?)\b",
            givens_text, re.I):
        eqs.append(_sp.Symbol(m.group(1).lower()) - float(m.group(2)))
    if len(eqs) < 2:
        return None
    import sympy

    free = sorted({str(s) for e in eqs for s in e.free_symbols},
                  key=lambda v: (len(v), v))
    if not (2 <= len(free) <= 3):
        return None
    syms = [sympy.Symbol(v) for v in free]
    try:
        sol = sympy.solve(eqs, syms, dict=True)
    except Exception:
        return None
    if not sol:
        return None
    sol = sol[0]
    # requested variable
    m = re.search(r"find\s+(?:the\s+value\s+of\s+)?([a-z])\b", text,
                  re.I)
    want = m.group(1).lower() if m else free[0]
    want_sym = sympy.Symbol(want)
    if want_sym in sol:
        return _num(sol[want_sym]), [f"solved system for {want}: {sol}"]
    return None


def _model_ap_gp(text: str) -> Optional[Tuple[float, List[str]]]:
    """'sum of first 20 terms of the AP 5, 9, 13' -> closed formula."""
    m = re.search(
        r"(sum|nth term)\s+of\s+(?:the\s+)?first\s+(\d+)\s+terms\s+of\s+"
        r"(?:the\s+)?(AP|GP|arithmetic progression|geometric progression)"
        r"\s*([\d.,\s]+)", text, re.I)
    if not m:
        return None
    kind, n, seq = m.group(1).lower(), int(m.group(2)), m.group(4)
    nums = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", seq)]
    if len(nums) < 2:
        return None
    a = nums[0]
    steps = [f"series start {nums[:3]}, n = {n}"]
    if kind == "sum" and ("ap" in m.group(3).lower()
                          or "arithmetic" in m.group(3).lower()):
        d = nums[1] - nums[0]
        total = (n / 2) * (2 * a + (n - 1) * d)
        steps.append(f"AP: a={a:g}, d={d:g}, S_{n} = n/2 (2a+(n-1)d) "
                     f"= {total:g}")
        return total, steps
    if kind == "sum" and ("gp" in m.group(3).lower()
                          or "geometric" in m.group(3).lower()):
        r_ = nums[1] / nums[0]
        if abs(r_ - 1) < 1e-12:
            return None
        total = a * (r_ ** n - 1) / (r_ - 1)
        steps.append(f"GP: a={a:g}, r={r_:g}, S_{n} = {total:g}")
        return total, steps
    return None


def _model_bag_probability(text: str) -> Optional[Tuple[float, List[str]]]:
    """'A bag contains 3 red and 5 black balls ... probability that both
    are red (drawn without replacement)' -> hypergeometric."""
    if not re.search(r"probabilit", text, re.I) or \
            not re.search(r"without\s+replacement", text, re.I):
        return None
    colors: Dict[str, int] = {}
    for m in re.finditer(r"(\d+)\s+(red|black|blue|green|white|pink|"
                         r"yellow|orange)", text, re.I):
        colors[m.group(2).lower()] = \
            colors.get(m.group(2).lower(), 0) + int(m.group(1))
    if len(colors) < 2:
        return None
    want_m = re.search(
        r"probabilit[^.]*?(?:both|all|two|2|three|3)\s+(?:balls?\s+)?"
        r"(?:are\s+|is\s+)?(red|black|blue|green|white|pink|yellow|"
        r"orange)\b", text, re.I)
    want = (want_m.group(1).lower() if want_m else None)
    if want not in colors:
        return None
    n_draw = 2 if re.search(r"\b(both|two|2)\b", text, re.I) else 3
    total = sum(colors.values())
    k = colors[want]

    def C(n_, r_):
        from math import comb
        return comb(n_, r_)

    from math import comb
    fav = comb(k, n_draw)
    tot = comb(total, n_draw)
    p = fav / tot
    steps = [f"bag: {colors}, draw {n_draw} without replacement, "
             f"P(all {want}) = C({k},{n_draw})/C({total},{n_draw}) = "
             f"{p:.6f}"]
    return p, steps


def _model_counting(text: str) -> Optional[Tuple[float, List[str]]]:
    """'How many 4-digit numbers ... digits 1 to 5 without repetition'
    -> P(n, r). 'how many ways to choose/arrange r from n' -> C/P."""
    m = re.search(
        r"how\s+many\s+(\d+)[- ]digit\s+numbers?\s+(?:can\s+be\s+formed"
        r"[\w\s]*?)?using\s+(?:the\s+)?digits\s+(\d+)\s+to\s+(\d+)\s+"
        r"(without|with)\s+repetition", text, re.I)
    if m:
        r_ = int(m.group(1))
        lo, hi = int(m.group(2)), int(m.group(3))
        n_ = hi - lo + 1
        from math import perm
        val = perm(n_, r_) if m.group(4).lower() == "without" else n_ ** r_
        return float(val), [f"P({n_},{r_}) style count = {val:g}"]
    m = re.search(
        r"how\s+many\s+ways[\w\s]*?(?:choose|select)\s+(\d+)\s+from\s+"
        r"(\d+)", text, re.I)
    if m:
        from math import comb
        return float(comb(int(m.group(2)), int(m.group(1)))), ["C(n,r)"]
    return None


def _model_distance_origin(text: str) -> Optional[Tuple[float, List[str]]]:
    m = re.search(
        r"distance\s+of\s+the\s+point\s*\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*"
        r"(-?\d+(?:\.\d+)?)\s*\)?\s+from\s+the\s+origin", text, re.I)
    if not m:
        return None
    import math as _math

    x, y = float(m.group(1)), float(m.group(2))
    d = _math.hypot(x, y)
    return d, [f"distance = sqrt({x:g}^2 + {y:g}^2) = {d:g}"]


def _model_trig_extreme(text: str) -> Optional[Tuple[float, List[str]]]:
    """'maximum value of f(x) = 2 + 3 sin x' -> a + |b|."""
    m = re.search(
        r"(max|min)imum\s+value\s+of\s+(?:f\(x\)\s*=\s*)?"
        r"(-?\d+(?:\.\d+)?)\s*\+\s*(-?\d+(?:\.\d+)?)\s*\*?\s*"
        r"(sin|cos)\s*\(?\s*[a-z]\s*\)?", text, re.I)
    if not m:
        return None
    a, b = float(m.group(2)), float(m.group(3))
    want_max = m.group(1).lower() == "max"
    val = a + abs(b) if want_max else a - abs(b)
    return val, [f"{'max' if want_max else 'min'} of {a:g} ± {abs(b):g} "
                 f"= {val:g}"]


def _model_percentage(text: str) -> Optional[Tuple[float, List[str]]]:
    """'What percentage of 250 is 40?' / '40 is what percent of 250?'
    / 'Find 15% of 200'."""
    m = re.search(r"what\s+percentage\s+of\s+(-?[\d.]+)\s+is\s+"
                  r"(-?[\d.]+)", text, re.I)
    if m:
        whole, part = float(m.group(1)), float(m.group(2))
        p = part / whole * 100.0
        return p, [f"percentage = ({part:g} / {whole:g}) * 100 = {p:g}"]
    m = re.search(r"(-?[\d.]+)\s+is\s+what\s+percent(?:age)?\s+of\s+"
                  r"(-?[\d.]+)", text, re.I)
    if m:
        part, whole = float(m.group(1)), float(m.group(2))
        p = part / whole * 100.0
        return p, [f"percentage = ({part:g} / {whole:g}) * 100 = {p:g}"]
    m = re.search(r"find\s+(-?[\d.]+)\s*(?:%|percent)\s+of\s+(-?[\d.]+)",
                  text, re.I)
    if m:
        pct, whole = float(m.group(1)), float(m.group(2))
        val = pct / 100.0 * whole
        return val, [f"{pct:g}% of {whole:g} = {val:g}"]
    return None


def _model_speed_distance_time(text: str) -> Optional[Tuple[float, List[str]]]:
    """'A car covers 180 km in 3 hours. Find the speed' and variants."""
    if not re.search(r"\b(speed|covers|travel\w*|distance)\b", text, re.I):
        return None
    m = re.search(
        r"(?:covers|travels?|travelled|goes)\s+(?:a\s+distance\s+of\s+)?"
        r"([\d.]+)\s*(km|m)\s+in\s+([\d.]+)\s*(hours?|hrs?|minutes?|mins?"
        r"|seconds?|s)\b", text, re.I)
    if not m:
        return None
    dist = float(m.group(1))
    if m.group(2).lower() == "m":
        pass  # metres stay metres; unit-consistent
    t = float(m.group(3))
    u = m.group(4).lower()
    if u.startswith(("hour", "hr")):
        pass
    elif u.startswith(("minut", "min")):
        t /= 60.0
    elif u.startswith(("second", "s")):
        t /= 3600.0
    # ASK GUARD: only answer speed when speed is asked.  'How far in
    # 5 hours' is a direct-proportion distance question -- answering
    # the speed here shipped 60 as the distance.
    if not re.search(r"\b(speed|rate|how\s+fast|velocity)\b", text, re.I):
        return None
    speed = dist / t
    return speed, [f"speed = {dist:g} / {t:g} = {speed:g}"]


def _model_rectangle(text: str) -> Optional[Tuple[float, List[str]]]:
    """'rectangular park 25 m long and 18 m wide - find the area'."""
    m = re.search(
        r"([\d.]+)\s*(?:m|cm|km|met(?:er|re)s?)?\s+long\s+(?:and\s+)?"
        r"([\d.]+)\s*(?:m|cm|km|met(?:er|re)s?)?\s+wide", text, re.I)
    if not m:
        m = re.search(
            r"length\s+(?:of\s+)?([\d.]+)\s*(?:m|cm)?\s+and\s+(?:the\s+)?"
            r"(?:breadth|width|broad(?:th)?)\s+(?:of\s+)?([\d.]+)", text,
            re.I)
    if not m:
        m = re.search(
            r"measures?\s+([\d.]+)\s*(?:m|cm)?\s+in\s+length\s+and\s+"
            r"([\d.]+)\s*(?:m|cm)?\s+in\s+width", text, re.I)
    if not m:
        return None
    a, b = float(m.group(1)), float(m.group(2))
    low = text.lower()
    if "perimeter" in low:
        p = 2 * (a + b)
        return p, [f"perimeter = 2({a:g} + {b:g}) = {p:g}"]
    area = a * b
    return area, [f"area = {a:g} * {b:g} = {area:g}"]


# --------------------------------------------------------------------------- #
# Matrix kernel (senior-maths exam forms, solved exactly)
# --------------------------------------------------------------------------- #

_MATRIX_TOKEN_RE = re.compile(r"-?\d+(?:\.\d+)?|[A-Za-z]")


def _parse_matrix_row(s: str):
    """'x -5 -1' -> ['x', '-5', '-1']; None when a token is junk."""
    s = s.strip()
    if not s:
        return None
    for tok in re.split(r"[,\s]+", s):
        if not _MATRIX_TOKEN_RE.fullmatch(tok):
            return None
    return re.split(r"[,\s]+", s)


def _parse_matrix_grid(content: str):
    """Bracket content -> rows of entry tokens.  Handles nested rows
    ('[1, 0, 2], [0, 2, 1]'), ';' rows ('1 0 2; 0 2 1') and a single
    flattened row ('x -5 -1').  None when malformed."""
    content = content.strip()
    if not content:
        return None
    if "[" in content:
        rows = []
        for inner in re.findall(r"\[([^[\]]*)\]", content):
            row = _parse_matrix_row(inner)
            if row is None:
                return None
            rows.append(row)
        if not rows:
            return None
        if re.sub(r"\[[^[\]]*\]", "", content).strip(" \t,"):
            return None
        return rows
    rows = []
    for part in content.split(";"):
        row = _parse_matrix_row(part)
        if row is None:
            return None
        rows.append(row)
    return rows


def _scan_matrix_groups(text: str):
    """All bracket token grids as (start, end, rows); None when any
    bracket group is unbalanced or malformed."""
    groups = []
    i, n = 0, len(text)
    while i < n:
        if text[i] != "[":
            i += 1
            continue
        depth, j = 0, i
        while j < n:
            if text[j] == "[":
                depth += 1
            elif text[j] == "]":
                depth -= 1
                if depth == 0:
                    break
            j += 1
        if j >= n:
            return None
        rows = _parse_matrix_grid(text[i + 1:j])
        if rows is None:
            return None
        groups.append((i, j + 1, rows))
        i = j + 1
    return groups


def _matrix_groups(text: str):
    """Bracket token grids in order (grid = list of row token lists)."""
    scanned = _scan_matrix_groups(text)
    if scanned is None:
        return None
    return [rows for _s, _e, rows in scanned]


def _grid_desc(rows) -> str:
    if len(rows) == 1:
        return "[" + " ".join(rows[0]) + "]"
    return "[[" + "] [".join(" ".join(row) for row in rows) + "]]"


def _model_matrix_equation(text: str):
    """Exam matrix equations with exactly ONE unknown, solved exactly:

        [v] x [M] x [c] = O     (NCERT Misc / CBSE 2019:
                                 x^2 - 48 = 0 -> x = +/- 4 sqrt 3)
        [v] x [M] = [0 0 0]     (consistent row form)
        [M] x [c] = O           (consistent column form)

    When the flattening left the matrix ambiguous (lost digits,
    several readings that disagree, unknown count != 1, non-zero
    right-hand side, no solution) this returns None: the kernel
    refuses rather than guesses."""
    if "[" not in text or text.count("=") != 1:
        return None
    eq_pos = text.index("=")
    scanned = _scan_matrix_groups(text)
    if not scanned:
        return None
    lhs_groups = [(s, e, rows) for s, e, rows in scanned if e <= eq_pos]
    rhs_groups = [(s, e, rows) for s, e, rows in scanned if s > eq_pos]
    if not lhs_groups:
        return None
    prev_end = None
    for s, e, _rows in lhs_groups:
        if prev_end is None:
            if re.search(r"\d", text[:s]):
                return None                 # junk before the equation
        elif not re.fullmatch(r"[\s*.]*", text[prev_end:s]):
            return None                     # separator must be product
        prev_end = e
    if re.search(r"\d", text[prev_end:eq_pos]):
        return None

    rhs_zero_symbol = False
    target_rows = None
    if rhs_groups:
        s, e, rows = rhs_groups[0]
        if len(rhs_groups) != 1 or re.search(r"\d", text[e:]):
            return None
        try:
            if any(float(tok) != 0.0 for row in rows for tok in row):
                return None                 # non-zero right-hand side
        except ValueError:
            return None
        target_rows = rows
    else:
        rhs_tok = text[eq_pos + 1:].strip(" \t.,;:?")
        if not re.fullmatch(r"[Oo0]", rhs_tok):
            return None
        rhs_zero_symbol = True

    unknowns = sorted({tok for _s, _e, rows in lhs_groups
                       for row in rows for tok in row if tok.isalpha()})
    if len(unknowns) != 1:
        return None
    import sympy
    u = sympy.Symbol(unknowns[0])

    def _entry(tok: str):
        return u if tok == unknowns[0] else sympy.Rational(tok)

    def _mat(rows):
        return sympy.Matrix([[_entry(tok) for tok in row] for row in rows])

    try:
        mats = [_mat(rows) for _s, _e, rows in lhs_groups]
    except (ValueError, TypeError, SyntaxError):
        return None

    def _product(seq):
        p = seq[0]
        for m_ in seq[1:]:
            p = p * m_
        return p

    # readings of the bracket sequence: straight left-to-right
    # product, and the exam flattening where a run of same-width
    # rows means row-vector, stacked matrix, column-vector
    def _stack(seq):
        return sympy.Matrix([row for m_ in seq for row in m_.tolist()])

    cands = [mats]
    if (len(mats) >= 3 and all(m_.shape[0] == 1 for m_ in mats)
            and len({m_.shape[1] for m_ in mats}) == 1):
        cands.append([mats[0], _stack(mats[1:-1]), mats[-1].T])
        cands.append([_stack(mats)])

    outcomes = []       # (symbolic roots sorted, float roots, E, desc)
    for seq in cands:
        try:
            prod = _product(seq)
            if rhs_zero_symbol:
                target = sympy.zeros(prod.rows, prod.cols)
            else:
                target = _mat(target_rows)
                if target.shape != prod.shape:
                    continue
            core = prod - target
            eqs = [core[i, j] for i in range(core.rows)
                   for j in range(core.cols) if core[i, j] != 0]
            if not eqs:
                continue                    # 0 = 0: nothing to solve
            if prod.rows * prod.cols == 1:
                sym_sols = [sympy.simplify(s_)
                            for s_ in sympy.solve(eqs[0], u)
                            if s_.is_number]
            else:
                dict_sols = sympy.solve(eqs, u, dict=True)
                if len(dict_sols) != 1 or u not in dict_sols[0]:
                    continue                # inconsistent / under-set
                val = dict_sols[0][u]
                sym_sols = [sympy.simplify(val)] if val.is_number else []
            if not sym_sols:
                continue
            outcomes.append((sorted(sym_sols, key=sympy.default_sort_key),
                             [_num(s_) for s_ in sorted(
                                 sym_sols, key=sympy.default_sort_key)],
                             core, seq))
        except Exception:
            continue                        # wrong shape for this reading

    if not outcomes:
        return None                         # no exact solution anywhere
    if len({tuple(f) for _sym, f, _c, _d in outcomes}) != 1:
        return None                         # readings disagree: ambiguous
    sym_sols, float_sols, core, _seq = outcomes[0]
    value = float_sols[-1]
    lhs_desc = " . ".join(_grid_desc(rows) for _s, _e, rows in lhs_groups)
    rhs_desc = "O" if rhs_zero_symbol else _grid_desc(target_rows)
    steps = [f"governing equation: {lhs_desc} = {rhs_desc}"]
    if core.rows * core.cols == 1:
        core_desc = sympy.expand(core[0, 0])
        if len(sym_sols) > 1:
            steps.append(f"{core_desc} = 0 -> roots {sym_sols}; "
                         f"largest = {value:g}")
        else:
            steps.append(f"{core_desc} = 0 -> {unknowns[0]} = "
                         f"{value:g}")
    else:
        steps.append(f"product entries {core.tolist()} must all be 0")
        steps.append(f"{unknowns[0]} = {value:g}")
    return value, steps


# --------------------------------------------------------------------------- #
# Parabola through three points (y = ax^2 + bx + c)
# --------------------------------------------------------------------------- #

_QUAD_ABC_RE = re.compile(
    r"([a-z])\s*=\s*([a-z])\s*x\s*\^\s*2\s*\+\s*([a-z])\s*x\s*\+\s*"
    r"([a-z])\b", re.I)
_POINT_PAREN_RE = re.compile(
    r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)")
_POINT_BARE_RE = re.compile(
    r"(?<![\d.,])(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)")


def _model_quadratic_points(text: str):
    """'y = ax^2 + bx + c ... passes through the points 2,15 4,25
    14,15' -> solve the 3x3 system for a, b, c (real bank item 19352,
    the footballer question; PDF extraction lost the parentheses).
    Exactly three distinct points are required; anything else
    refuses."""
    if not _QUAD_ABC_RE.search(text) or not re.search(
            r"pass(?:es)?\s+through|points?\b", text, re.I):
        return None
    raw = [(mm.group(1), mm.group(2))
           for mm in _POINT_PAREN_RE.finditer(text)]
    if len(raw) < 3:
        seen = {(float(sx), float(sy)) for sx, sy in raw}
        for mm in _POINT_BARE_RE.finditer(text):
            sx, sy = mm.group(1), mm.group(2)
            if (float(sx), float(sy)) not in seen:
                raw.append((sx, sy))
                seen.add((float(sx), float(sy)))
    uniq = {(float(sx), float(sy)): (sx, sy) for sx, sy in raw}
    if len(uniq) != 3:
        return None
    pts = [uniq[k] for k in sorted(uniq)]
    import sympy
    a, b, c = sympy.symbols("a b c")
    x = sympy.Symbol("x")
    xs = [sympy.Rational(sx) for sx, _sy in pts]
    ys = [sympy.Rational(sy) for _sx, sy in pts]
    eqs = [sympy.Eq(a * xs[i] ** 2 + b * xs[i] + c, ys[i])
           for i in range(3)]
    sols = sympy.solve(eqs, [a, b, c], dict=True)
    if len(sols) != 1:
        return None
    sol = sols[0]
    if not all(v.is_number for v in sol.values()) or sol.get(a) == 0:
        return None         # a = 0 contradicts the given quadratic
    path = sympy.expand(sol[a] * x ** 2 + sol[b] * x + sol[c])
    steps = [
        "governing equation: y = a*x^2 + b*x + c through points "
        + ", ".join(f"({float(sx):g}, {float(sy):g})" for sx, sy in pts),
        "system: " + "; ".join(
            f"{xs[i] ** 2}a + {xs[i]}b + c = {ys[i]}" for i in range(3)),
        f"solved system: a = {sol[a]}, b = {sol[b]}, c = {sol[c]}",
        f"path: y = {path}",
    ]
    return _num(sol[a]), steps


MODELS = [_model_matrix_equation, _model_quadratic_points,
          _model_percentage, _model_speed_distance_time, _model_rectangle,
          _model_linear_system, _model_ap_gp, _model_bag_probability,
          _model_counting, _model_distance_origin, _model_trig_extreme]


# --------------------------------------------------------------------------- #
# Symbolic answer channel (expression answers, not numbers)
# --------------------------------------------------------------------------- #

class SymbolicAnswer(NamedTuple):
    """A verified SYMBOLIC result flowing through solve_math.

    `expr` is sympy's canonical str() form of the expression: clean
    ASCII, '**' for powers, '*' for products, e.g.
    "600*x**99 - 55*x**54 + 1".  That exact form is the contract
    downstream (router answer string, numeric stays None); it is
    round-trippable by parse_expression().  Indefinite integrals carry
    the constant of integration: "x**3 + C".
    """
    expr: str


def _pure_math_words(s: str) -> bool:
    """Every alphabetic run in `s` is a single-letter variable or a
    known function name.  Prose inside a captured expression ("from",
    "the") would parse into a product of symbols -- a WRONG reading --
    so the symbolic channel refuses instead of shipping it."""
    for run in re.findall(r"[A-Za-z]+", s):
        if len(run) == 1:
            continue
        if run.lower() not in _MATH_FUNCS and run.lower() not in (
                "log10", "log2", "antilog"):
            return False
    return True


def _symbolic_safe(result, source) -> bool:
    """Zero-wrong gate for the symbolic answer channel.

    The shipped expression must be fully symbolic-deterministic:
    - no unevaluated residue (Derivative/Integral left by sympy),
    - no assumption-dependent branches (Piecewise),
    - no singularities or infinities (zoo / nan / oo),
    - no generalised or non-school functions (DiracDelta, Heaviside,
      Sign, Abs -- their derivatives are distributions/piecewise),
    - no invented symbols (result symbols must come from the source),
    - single-letter source symbols only (prose slip would otherwise
      become a symbol product),
    - pure-ASCII str form (never echoes question text).
    """
    import sympy

    if not isinstance(result, sympy.Basic):
        return False
    if result.has(sympy.Piecewise, sympy.Integral, sympy.Derivative,
                  sympy.DiracDelta, sympy.Heaviside, sympy.sign,
                  sympy.Abs, sympy.zoo, sympy.nan, sympy.oo):
        return False
    if not result.free_symbols <= source.free_symbols:
        return False
    if not all(len(str(s)) == 1 for s in source.free_symbols):
        return False
    return str(result).isascii()


# --------------------------------------------------------------------------- #
# Layer 2: operation router (calculus / equation solving)
# --------------------------------------------------------------------------- #

_INTEGRAL_RE = re.compile(
    r"(?:integral\s+of|integrate|area\s+under(?:\s+the\s+curve)?)\s*"
    r"(?:y\s*=\s*)?(.+?)\s*(?:from|between)\s*(-?\d+(?:\.\d+)?)\s*"
    r"(?:to|and)\s*(-?\d+(?:\.\d+)?)", re.I)

# indefinite form: the bounds regex above requires "from/between A to
# B", so an unbounded "integral of x^2 dx" / "integrate x^3 + 2x"
# never reaches the definite branch.  Tried only after _INTEGRAL_RE
# missed; a definite ask is always handled by the definite branch.
_INDEF_INTEGRAL_RE = re.compile(
    r"(?:integral\s+of|integrate)\s*(?:y\s*=\s*)?(.+?)"
    r"(?:\s+with\s+respect\s+to\s+([a-z]))?\s*(?:[.,;]|$)", re.I)

_DERIV_RE = re.compile(
    r"(?:derivative\s+of|differentiate)\s+(.+?)"
    r"(?:\s+with\s+respect\s+to\s+([a-z])"
    r"|\s+(?:evaluated\s+)?at\s+x\s*=\s*(-?\d+(?:\.\d+)?))?"
    r"\s*(?:[.,;]|$)", re.I)


def _op_integral(text: str):
    """Definite integral -> float (unchanged numeric path); indefinite
    integral -> SymbolicAnswer (exact CAS antiderivative + ' + C')."""
    m = _INTEGRAL_RE.search(preprocess(text))
    if m:
        expr = parse_expression(m.group(1))
        if expr is None:
            return None
        import sympy

        x = list(expr.free_symbols)
        var = x[0] if x else sympy.Symbol("x")
        a, b = float(m.group(2)), float(m.group(3))
        val = _num(sympy.integrate(expr, (var, a, b)))
        return val, [f"∫({expr}) d{var} from {a:g} to {b:g} = {val:g}"]
    # ---- indefinite integral: symbolic channel ----
    m = _INDEF_INTEGRAL_RE.search(preprocess(text))
    if not m:
        return None
    raw = m.group(1).strip()
    var_letter = m.group(2)
    # trailing differential marker: "3x^2 dx" -> "3x^2"; the marker
    # letter also names the integration variable.  Without the strip
    # the marker would parse into a constant 'd' (a wrong reading).
    dm = re.search(r"\s*d([a-z])\s*$", raw, flags=re.I)
    if dm:
        if var_letter is None:
            var_letter = dm.group(1)
        raw = raw[:dm.start()]
    if not raw or not _pure_math_words(raw):
        return None             # prose inside the captured integrand
    expr = parse_expression(raw)
    if expr is None:
        return None
    import sympy

    free = list(expr.free_symbols)
    var = (sympy.Symbol(var_letter.lower()) if var_letter
           else (free[0] if free else sympy.Symbol("x")))
    F = sympy.integrate(expr, var)
    if not _symbolic_safe(F, expr):
        return None             # unevaluated / assumption-dependent
    steps = [f"∫({expr}) d{var} = {F} + C",
             "symbolic answer: exact CAS antiderivative (sympy); "
             "+ C is the constant of integration"]
    return SymbolicAnswer(str(F) + " + C"), steps


def _op_derivative(text: str):
    """Derivative ask.  "at x = k" and constant results stay NUMERIC
    (unchanged path); a symbolic result ships only under the
    zero-wrong gate, as SymbolicAnswer(str(d))."""
    m = _DERIV_RE.search(preprocess(text))
    if not m:
        return None
    expr = parse_expression(m.group(1))
    if expr is None:
        return None
    import sympy

    x = list(expr.free_symbols)
    var = (sympy.Symbol(m.group(2)) if m.group(2)
           else (x[0] if x else sympy.Symbol("x")))
    d = sympy.diff(expr, var)
    if m.group(3):
        val = _num(d.subs(var, float(m.group(3))))
        return val, [f"d/d{var} ({expr}) = {d}; at {var} = "
                     f"{m.group(3)} -> {val:g}"]
    if not d.free_symbols:
        return _num(d), [f"d/d{var} ({expr}) = {d}"]
    # ---- symbolic channel: diff() on the parsed expression is exact,
    # but the answer ships ONLY when the reading is provably clean:
    # no prose slipped into the capture, no unevaluated or
    # assumption-dependent residue, single-letter symbols, ASCII str.
    if not _pure_math_words(m.group(1)) or not _symbolic_safe(d, expr):
        return None
    return SymbolicAnswer(str(d)), [
        f"d/d{var} ({expr}) = {d}",
        "symbolic answer: exact CAS derivative (sympy)"]


def _op_solve_equation(text: str) -> Optional[Tuple[float, List[str]]]:
    """'solve x^2 - 5x + 6 = 0 ... find the larger root'."""
    if "=" not in text:
        return None
    import sympy

    segments = re.split(r"\band\b|\bwhere\b|[,;]", text, flags=re.I)
    candidates = [s_ for s_ in segments if s_.count("=") == 1]
    # multi-root keeps: quadratics under an explicit solve/roots ask.
    # Only claimed when no segment yielded a unique root, so system
    # behaviour is unchanged.
    multi = []
    for seg in candidates:
        lhs, _, rhs = seg.partition("=")
        lhs_e = _math_tail(lhs)
        rhs_e = _math_tail(rhs)
        if lhs_e is None or rhs_e is None:
            continue
        eq = lhs_e - rhs_e
        free = sorted(eq.free_symbols, key=lambda s_: str(s_))
        if len(free) != 1:
            continue
        want = None
        if re.search(r"(larger|bigger|greater)", text, re.I):
            sols = sorted(_num(s_) for s_ in sympy.solve(eq, free[0]))
            if sols:
                return sols[-1], [f"{eq} = 0 -> roots {sols}; larger "
                                  f"= {sols[-1]:g}"]
        m = re.search(r"(?:find|wats|what\s+is|calculate|compute)\s+(?:the\s+value\s+of\s+)?([a-z])\b", text, re.I)
        if m:
            want = sympy.Symbol(m.group(1).lower())
        # GIVEN-MARKER GUARD: a segment that states a given
        # ("use pi = 22/7", "where y is -6") must never be
        # solved for its own variable.
        seg_low = seg.lower()
        if re.search(r"\b(use|using|where|given|let|take)\b", seg_low) and (want is None or want not in free):
            continue
        var = want if want in free else free[0]
        try:
            sols = [_num(s_) for s_ in sympy.solve(eq, var)]
        except (TypeError, ValueError):
            continue
        if len(sols) == 1:
            return sols[0], [f"{eq} = 0 -> {var} = {sols[0]:g}"]
        if len(sols) > 1 and re.search(r"\b(solve|roots?|zeros)\b",
                                       text, re.I):
            multi.append((eq, var, sorted(sols)))
    if multi:
        eq, var, sols = multi[0]
        return sols[-1], [f"{eq} = 0 -> roots {sols}; "
                          f"largest = {sols[-1]:g}"]
    return None


def _op_evaluate(text: str) -> Optional[Tuple[float, List[str]]]:
    """Pure arithmetic: 'evaluate 2*sin(30)+3' style."""
    if not re.search(r"\bevaluate\b|\bcompute\b", text, re.I):
        return None
    m = re.search(r"(?:evaluate|compute)\s*[:\-]?\s*(.+)", text, re.I)
    if not m:
        return None
    expr = parse_expression(m.group(1))
    if expr is None or not expr.is_number:
        return None
    val = _num(expr)
    return val, [f"{m.group(1).strip()} = {val:g}"]


OPERATIONS = [_op_integral, _op_derivative, _op_solve_equation,
              _op_evaluate]


# --------------------------------------------------------------------------- #
# Kernel entry
# --------------------------------------------------------------------------- #

def solve_math(text: str):
    """Stage 0: deterministic math-language recognition.

    Returns (value, steps) or None.  `value` is a float for numeric
    asks, or a SymbolicAnswer marker for expression asks (derivative /
    indefinite integral) -- the symbolic answer channel.  Router stage
    0 ships SymbolicAnswer.expr as the answer string with numeric
    kept None; both cases are cascade-exact and verified."""
    if not text:
        return None
    # Lane A entry point: every kernel route benefits from unicode
    # normalization (math italic letters, superscripts, unicode
    # operators, flattened exponents) before any pattern runs.
    text = normalize_unicode_math(text)
    # quick gate: needs math intent (verb, '=', or a maths noun)
    if not re.search(
            r"\b(solve|integral|integrate|derivative|differentiate|"
            r"evaluate|compute|probability|permutation|combination|"
            r"maximum|minimum|sum of|how many|how much|distance|percent|"
            r"percentage|area|perimeter|speed|covers|travels?|long and|"
            r"in length)\b"
            r"|=", text, re.I):
        return None
    for model in MODELS:
        try:
            r = model(text)
        except Exception:
            r = None
        if r is not None:
            return r
    for op in OPERATIONS:
        try:
            r = op(text)
        except Exception:
            r = None
        if r is not None:
            return r
    return None
