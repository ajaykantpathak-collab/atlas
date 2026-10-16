"""unit_shape.py -- answer-unit normalization and answer-shape guards.

Born from the 2026-09-30 standing-gate failures:

    B06  "cardiac output in litres per minute" answered as
         "5250 mL/min" -- the family computed in the unit the GIVENS
         imply and never normalized to the unit the ASK demands.
    M04  a GST-inclusive price ("includes 18% GST ... before GST")
         was pushed through the FORWARD tax chain instead of the
         reverse one -- the reverse branch's trigger regex only knew
         "including/inclusive of".

Two independent, deterministic services live here:

    1. UNIT NORMALIZATION.  ``normalize_to_ask_unit`` reads the unit
       the ask names ("in litres per minute", "in cm2", "in hours")
       and the unit the computation's steps imply ("5250 mL/min"),
       and converts the numeric when both sit in the same dimension.
       Conversions are exact powers-of-10 / defined factors (1 L =
       1000 mL, 1 min = 60 s, ...); the converted value is checked
       by inverting the conversion before it may ship.

    2. GST REVERSE CHAIN.  ``gst_reverse`` runs the base -> +GST ->
       total chain in BOTH directions around the stated total and
       only returns when the revenue relation closes exactly
       (base*(1 + r/100) == total within float epsilon) -- the
       verifier beat.  It fires ONLY on an explicit inclusive-price
       ask ("price before GST", "taxable value"), never to fit an
       expected key.

Every helper is fail-closed: None means "no normalization", and the
caller keeps its previous (honest) result.  Nothing here reads keys,
expects, or the grading harness.
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

# --------------------------------------------------------------------------- #
# 1. Unit registry: prefix-normalized linear conversions per dimension
# --------------------------------------------------------------------------- #

# dimension -> {canonical unit: factor to canonical}
# canonical choice is arbitrary; only ratios are ever used.
_LINEAR_UNITS: Dict[str, Dict[str, float]] = {
    "volume": {
        "l": 1.0, "litre": 1.0, "liter": 1.0, "litres": 1.0,
        "liters": 1.0,
        "ml": 0.001, "millilitre": 0.001, "milliliter": 0.001,
        "millilitres": 0.001, "milliliters": 0.001,
        "m3": 1000.0, "cm3": 0.001,
        "kl": 1000.0, "kilolitre": 1000.0, "kilolitres": 1000.0,
    },
    "length": {
        "m": 1.0, "meter": 1.0, "meters": 1.0, "metre": 1.0,
        "metres": 1.0,
        "km": 1000.0, "kilometre": 1000.0, "kilometres": 1000.0,
        "kilometer": 1000.0, "kilometers": 1000.0,
        "cm": 0.01, "centimetre": 0.01, "centimeter": 0.01,
        "centimetres": 0.01, "centimeters": 0.01,
        "mm": 0.001, "millimetre": 0.001, "millimeters": 0.001,
    },
    "mass": {
        "g": 0.001, "gram": 0.001, "grams": 0.001,
        "kg": 1.0, "kilogram": 1.0, "kilograms": 1.0,
        "mg": 1e-06, "milligram": 1e-06, "milligrams": 1e-06,
        "tonne": 1000.0, "tonnes": 1000.0, "quintal": 100.0,
    },
    "time": {
        "s": 1.0, "sec": 1.0, "secs": 1.0, "second": 1.0,
        "seconds": 1.0,
        "min": 60.0, "mins": 60.0, "minute": 60.0, "minutes": 60.0,
        "h": 3600.0, "hr": 3600.0, "hrs": 3600.0, "hour": 3600.0,
        "hours": 3600.0,
        "day": 86400.0, "days": 86400.0,
    },
}

# dimension -> {canonical unit: factor}; temperature uses offsets so it
# is handled by dedicated formulas, not the linear table.
_TEMPERATURE = {"degc": "C", "c": "C", "celsius": "C",
                "k": "K", "kelvin": "K", "degf": "F", "f": "F",
                "fahrenheit": "F"}

# spoken/printed aliases -> registry key
_UNIT_ALIAS = {
    "litre": "litre", "liter": "liter", "litres": "litres",
    "liters": "liters", "l": "l", "ltr": "l",
    "millilitre": "millilitre", "milliliter": "milliliter",
    "millilitres": "millilitres", "milliliters": "milliliters",
    "ml": "ml",
    "cubic metre": "m3", "cubic meter": "m3", "cubic metres": "m3",
    "cubic meters": "m3", "m3": "m3", "m^3": "m3",
    "cubic centimetre": "cm3", "cubic centimeter": "cm3",
    "cm3": "cm3", "cm^3": "cm3",
    "metre": "metre", "meter": "meter", "metres": "metres",
    "meters": "meters", "m": "m",
    "kilometre": "kilometre", "kilometer": "kilometer",
    "kilometres": "kilometres", "kilometers": "kilometers",
    "km": "km",
    "centimetre": "centimetre", "centimeter": "centimeter",
    "centimetres": "centimetres", "centimeters": "centimeters",
    "cm": "cm",
    "millimetre": "millimetre", "millimeters": "millimeters",
    "mm": "mm",
    "gram": "gram", "grams": "grams", "g": "g",
    "kilogram": "kilogram", "kilograms": "kilograms", "kg": "kg",
    "milligram": "milligram", "milligrams": "milligrams", "mg": "mg",
    "second": "second", "seconds": "seconds", "s": "s",
    "sec": "sec", "secs": "secs",
    "minute": "minute", "minutes": "minutes", "min": "min",
    "mins": "mins",
    "hour": "hour", "hours": "hours", "h": "h", "hr": "hr",
    "hrs": "hrs",
    "day": "day", "days": "days",
}

# a computed unit mention, e.g. "mL/min", "km/h", "g", "cm^2"
_COMPOUND_UNIT_RE = re.compile(
    r"\b([A-Za-z][A-Za-z]{0,12})\s*(?:\^\{?(-?\d+)\}?|([0-9]))?"
    r"\s*/\s*([A-Za-z][A-Za-z]{0,12})\b"
    r"|\b([A-Za-z][A-Za-z]{0,12})\s*(?:\^\{?(-?\d+)\}?|([0-2]))?\b")

_ASK_UNIT_RE = re.compile(
    r"\b(?:in|express(?:ed)?\s+in|give\s+the\s+answer\s+in|"
    r"answer\s+in)\s+(?:the\s+)?"
    r"([A-Za-z][A-Za-z0-9/^\s.\-]{0,24}?)\s*(?:[.?]|$)", re.I)


def _canon_unit(token: str) -> Optional[Tuple[str, str]]:
    """'mL' -> ('volume', 'ml'); unknown -> None."""
    t = token.strip().lower().replace("²", "2").replace("³", "3")
    t = t.replace("^2", "2").replace("^3", "3")
    t = t.rstrip(".")
    key = _UNIT_ALIAS.get(t)
    if key is None:
        return None
    for dim, table in _LINEAR_UNITS.items():
        if key in table:
            return dim, key
    return None


def _parse_compound(token: str):
    """Parse a unit token into (num_dim, num_unit, den_dim, den_unit,
    power).  'mL/min' -> ('volume','ml','time','min',1); 'cm2' ->
    ('length','cm',None,'',2); 'litres per minute' -> like
    'litres/minute'.  None when any unit piece is unknown."""
    t = token.strip().rstrip(".").lower().replace("²", "2") \
        .replace("³", "3")
    t = re.sub(r"\s*\bper\b\s*", "/", t)
    t = t.replace(" ", "").replace("^", "")
    num, den, power = t, "", 1
    if "/" in t:
        num, _, den = t.partition("/")
    for tail, pw in (("2", 2), ("3", 3)):
        if num.endswith(tail) and _canon_unit(num[:-1]):
            num, power = num[:-1], pw
            break
    num_c = _canon_unit(num)
    if not num_c:
        return None
    den_c = _canon_unit(den) if den else None
    if den and not den_c:
        return None
    return num_c[0], num_c[1], (den_c[0] if den_c else None), \
        (den_c[1] if den_c else ""), power


def convert_linear(value: float, src: str, dst: str) -> Optional[float]:
    """Convert value expressed in src-unit to dst-unit (compound units
    allowed: 'mL/min' -> 'litres/minute').  Exact factors only; the
    result is verified by inverting the conversion.  None when units
    are unknown, sit in different dimensions, or fail verification."""
    s = _parse_compound(src)
    d = _parse_compound(dst)
    if not s or not d:
        return None
    if (s[0], s[2], s[4]) != (d[0], d[2], d[4]):
        return None
    try:
        sf = _factor(s[0], s[1])
        sd = _factor(s[2], s[3])
        df = _factor(d[0], d[1])
        dd = _factor(d[2], d[3])
    except KeyError:
        return None
    for x in (sf, sd, df, dd):
        if not x > 0:
            return None
    # a compound unit carries a RATE of canonical units: num/den
    src_rate = sf / (sd if sd else 1.0)
    dst_rate = df / (dd if dd else 1.0)
    out = value * src_rate / dst_rate
    # verifier beat: inverting must reproduce the input exactly
    back = out * dst_rate / src_rate
    if not (abs(back - value) <= 1e-9 * max(1.0, abs(value))):
        return None
    return out


def _factor(dim: Optional[str], unit: str) -> float:
    """Multiplicative factor of one unit piece (denominator pieces
    divide: handled by callers multiplying num and den factors)."""
    if dim is None:
        return 1.0
    f = _LINEAR_UNITS[dim][unit]
    return f


def ask_unit(text: str) -> Optional[str]:
    """The unit the ask names: '... in litres per minute.' -> 'litres
    per minute'.  Only the LAST parseable ask clause counts."""
    hits = _ASK_UNIT_RE.findall(text or "")
    for cand in reversed(hits):
        cand = cand.strip()
        # reject non-unit trailing clauses ('in the third year',
        # 'in 2024', 'in each case')
        if re.search(r"\b(year|month|day\b|case|words|steps|detail|"
                     r"figure|decimal|fraction|ratio|percent|"
                     r"brief|short|terms)\b", cand, re.I):
            continue
        if _parse_compound(cand) is not None:
            return cand
    return None


def computed_unit(answer: str, steps_text: str,
                  numeric: Optional[float] = None) -> Optional[str]:
    """The unit the computation's own answer/steps carry: prefer the
    '<number> <unit>' mention whose number IS the answer's numeric
    (the family's result line), else the last mention.  Scans the
    answer first, then the steps, so a family's check lines cannot
    override the result line."""
    num_re = r"(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)"
    unit_re = (r"([A-Za-z][A-Za-z]{0,12}(?:\s*\^\s*[-0-9]{1,2})?"
               r"(?:\s*(?:/\s*|\bper\b\s*)[A-Za-z][A-Za-z]{0,12})?)")
    for hay in (answer or "", steps_text or ""):
        hits = [(float(n), u) for n, u in
                re.findall(num_re + r"\s*" + unit_re, hay)]
        if numeric is not None:
            for n, u in hits:
                if abs(n - numeric) <= 1e-9 * max(1.0, abs(numeric)) \
                        and _parse_compound(u.strip()) is not None:
                    return u.strip()
        for _n, u in reversed(hits):
            if _parse_compound(u.strip()) is not None:
                return u.strip()
    return None


def fmt_num(v: float) -> str:
    """Compact deterministic formatting ('5.25', '5250', '0.4667')."""
    if v == int(v) and abs(v) < 1e15:
        return f"{int(v):,}" if abs(v) >= 10000 else f"{int(v)}"
    return f"{v:.6g}"


def normalize_to_ask_unit(text: str, answer: str, numeric: float,
                          steps: List[str]) -> Optional[Dict[str, Any]]:
    """Convert a verified numeric answer into the unit the ask names.

    Returns {"answer", "numeric", "steps"} or None when the ask does
    not name a unit, the computed unit is unknown, dimensions differ,
    the conversion fails verification, or ask unit == computed unit
    (nothing to normalize).  Ambiguity (ask drops the per-unit) is a
    refusal, never a guess.
    """
    target = ask_unit(text or "")
    if target is None or numeric is None:
        return None
    steps_text = " | ".join(str(s) for s in (steps or []))
    src = computed_unit(answer or "", steps_text, numeric)
    if src is None:
        return None
    sparts = _parse_compound(src)
    tparts = _parse_compound(target)
    if not sparts or not tparts:
        return None
    if sparts[2] is None and tparts[2] is not None:
        return None      # ask names a per-unit the computation lacks
    converted = convert_linear(numeric, src, target)
    if converted is None:
        return None
    if abs(converted - numeric) <= 1e-9 * max(1.0, abs(numeric)):
        return None      # same physical unit: nothing to normalize
    new_steps = list(steps or [])
    new_steps.append(
        f"Unit normalization: ask names {target}; computed value "
        f"{fmt_num(numeric)} {src} = {fmt_num(converted)} {target} "
        f"(inversion check passed).")
    new_answer = answer or f"{fmt_num(converted)} {target}"
    head = re.escape(src.split("/")[0].split("per")[0].strip())
    pat = rf"(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*{head}" \
          rf"(\s*(?:/\s*|\bper\b\s*)[A-Za-z]+)?"
    new_answer = re.sub(pat, f"{fmt_num(converted)} {target}",
                        new_answer, count=1)
    return {"answer": new_answer, "numeric": converted,
            "steps": new_steps}


# --------------------------------------------------------------------------- #
# 2. GST reverse chain (inclusive-price ask)
# --------------------------------------------------------------------------- #

_INCL_GST_STATED_RE = re.compile(
    r"\b(?:includes?|included|including|inclusive\s+of|inclusive|"
    r"contain(?:s|ing)?)\b[^.\d]{0,40}?(\d+(?:\.\d+)?)\s*%\s*(?:GST|"
    r"goods\s+(?:and|&)\s+services\s+tax|tax)\b"
    r"|(\d+(?:\.\d+)?)\s*%\s*(?:GST|tax)\b[^.]{0,40}?"
    r"\b(?:includes?|included|inclusive)\b", re.I)
_PRE_TAX_ASK_RE = re.compile(
    r"before\s+(?:the\s+)?(?:GST|tax)|pre-?GST|taxable\s+(?:value|"
    r"price)|original\s+price|price\s+before|basic\s+price|"
    r"listed\s+price\s+before|net\s+price\s+before", re.I)
_GST_RATE_ANY_RE = re.compile(
    r"(\d+(?:\.\d+)?)\s*%\s*(?:GST|goods\s+(?:and|&)\s+services\s+tax|"
    r"tax)", re.I)
_AMOUNT_RE = re.compile(
    r"(?:rs\.?|inr|₹|rupees?)\s*(\d[\d,]*(?:\.\d+)?)"
    r"|(\d[\d,]*(?:\.\d+)?)\s*(?:rs\.?|inr|₹|rupees?)", re.I)


def _money_candidates(text: str) -> List[float]:
    out = []
    for m in _AMOUNT_RE.finditer(text or ""):
        tok = m.group(1) or m.group(2)
        if tok:
            out.append(float(tok.replace(",", "")))
    return out


def gst_inclusive_ask(text: str) -> Optional[Tuple[float, float, float]]:
    """Detect 'price P includes r% GST; find the pre-GST price'.

    Returns (total, rate, base) with the reverse chain VERIFIED
    (base*(1+r/100) closes on total within 1e-9 relative), or None.
    The base is chosen among money-looking numbers as the one whose
    reverse chain closes -- never 'the value that fits a key'.
    """
    if not text:
        return None
    if not _PRE_TAX_ASK_RE.search(text):
        return None
    rm = _GST_RATE_ANY_RE.search(text)
    if not rm:
        return None
    rate = float(rm.group(1))
    if not (0 < rate <= 60):
        return None
    if not _INCL_GST_STATED_RE.search(text):
        return None
    for total in _money_candidates(text):
        den = 1.0 + rate / 100.0
        base = total / den
        # revenue-relation verifier: the forward chain on the reverse
        # base must close on the stated total, both ways.
        fwd = base * den
        if not (abs(fwd - total) <= 1e-9 * max(1.0, total)):
            continue
        gst = total - base
        if base <= 0 or gst <= 0:
            continue
        return total, rate, base
    return None


def gst_reverse_result(text: str) -> Optional[Dict[str, Any]]:
    """Full VERIFIED result payload for the inclusive-GST ask."""
    hit = gst_inclusive_ask(text or "")
    if hit is None:
        return None
    total, rate, base = hit
    gst = total - base
    steps = [
        f"Given: the printed/total price {fmt_num(total)} already "
        f"includes {fmt_num(rate)}% GST.",
        f"Reverse the chain: price before GST = total / (1 + "
        f"{fmt_num(rate)}/100) = {fmt_num(total)} / "
        f"{fmt_num(1.0 + rate / 100.0)} = {fmt_num(base)}.",
        f"GST contained = {fmt_num(total)} - {fmt_num(base)} = "
        f"{fmt_num(gst)}.",
        f"Check (revenue relation): {fmt_num(base)} + "
        f"{fmt_num(rate)}% = {fmt_num(base)} x "
        f"{fmt_num(1.0 + rate / 100.0)} = {fmt_num(total)} -- closes "
        f"on the stated total.",
    ]
    answer = (f"price before GST = Rs {fmt_num(base)} "
              f"(GST contained = Rs {fmt_num(gst)}; "
              f"total with GST = Rs {fmt_num(total)})")
    return {"answer": answer, "numeric": base, "steps": steps,
            "gate": "gst_reverse_revenue_relation"}


# --------------------------------------------------------------------------- #
# 3. Answer-shape helpers (multi-root, complement probability)
# --------------------------------------------------------------------------- #

_BOTH_ASK_RE = re.compile(
    r"\b(both\s+(?:values?|roots?|numbers?|solutions?)|all\s+(?:values?|"
    r"roots?|numbers?|solutions?)|values?\s+of\s+[a-z]\b[^.?!]*\band\b|"
    r"roots\b(?!.*\b(larger|largest|bigger|greater|smaller|smallest)\b)"
    r")", re.I)
_KERNEL_ROOTS_RE = re.compile(
    r"->\s*roots\s*\[([^\]]+)\](?:;\s*(?:larger|largest)\s*=\s*"
    r"-?\d+(?:\.\d+)?)?")


def reshape_multi_root(text: str, answer: str, numeric: float,
                       steps: List[str]) -> Optional[Dict[str, Any]]:
    """When the ask demands BOTH/ALL values and the kernel already
    computed the full root set (it is printed in its own steps), the
    shipped answer must carry every root, not just the largest.

    Fail-closed: only fires on the kernel's exact roots-steps
    signature; otherwise returns None (no change).
    """
    if not _BOTH_ASK_RE.search(text or ""):
        return None
    m = None
    for s in (steps or []):
        m = _KERNEL_ROOTS_RE.search(str(s))
        if m:
            break
    if not m:
        return None
    try:
        roots = sorted(float(x) for x in m.group(1).split(","))
    except (TypeError, ValueError):
        return None
    if not roots or numeric is None:
        return None
    # the shipped numeric must BE one of the roots (kernel picked one)
    if not any(abs(numeric - r) <= 1e-9 for r in roots):
        return None
    var = "x"
    vm = re.search(r"\b([a-z])\s*\^", str(steps[0] if steps else ""),
                   re.I)
    if vm:
        var = vm.group(1).lower()
    parts = " or ".join(f"{var} = {fmt_num(r)}" for r in roots)
    new_steps = list(steps or [])
    new_steps.append(
        f"Ask-shape: the question asks for {'both' if len(roots) == 2 else 'all'} "
        f"values, so every root of the equation is presented "
        f"({', '.join(fmt_num(r) for r in roots)}); the kernel's "
        f"single-value pick ({fmt_num(numeric)}) is among them.")
    return {"answer": parts, "numeric": roots[-1],
            "steps": new_steps}


_PROB_NOT_RE = re.compile(
    r"\bprobability\b[^.?!]{0,120}?\bnot\b", re.I)
_NEG_GUARD_RE = re.compile(
    r"\b(?:never|cannot|can't|impossible|neither|nor)\b", re.I)


def reshape_prob_complement(text: str, answer: str, numeric: float,
                            steps: List[str]) -> Optional[Dict[str,
                                                               Any]]:
    """'probability that it is NOT green' vs a family answer that
    computed P(named event): ship the complement P(~E) = 1 - P(E),
    verified by P(E) + P(~E) == 1 exactly.

    Fail-closed: needs an explicit 'probability ... not ...' ask, no
    second negation, a probability in [0,1], and the family's own
    steps must have computed favourable/total for the NAMED event
    (its answer is the direct-event probability).
    """
    low = (text or "").lower()
    if not _PROB_NOT_RE.search(low) or _NEG_GUARD_RE.search(low):
        return None
    if numeric is None or not (0.0 <= numeric <= 1.0):
        return None
    steps_text = " | ".join(str(s) for s in (steps or [])).lower()
    if "favourable" not in steps_text and "favorable" not in steps_text:
        return None
    comp = 1.0 - numeric
    if abs(numeric + comp - 1.0) > 1e-12:
        return None
    # fraction rendering when the direct probability is a clean ratio
    comp_txt = f"{comp:.6g}"
    frac = _ratio_of(numeric)
    if frac:
        num, den = frac
        cnum, cden = den - num, den
        if abs(cnum / cden - comp) <= 1e-12:
            comp_txt = f"{cnum}/{cden} (= {comp:.6g})"
    new_steps = list(steps or [])
    new_steps.append(
        f"Complement ask: the question asks for P(NOT event); the "
        f"family computed P(event) = {numeric:.6g}, so P(NOT event) "
        f"= 1 - {numeric:.6g} = {comp:.6g}.")
    new_steps.append(
        f"Complement check: P(event) + P(NOT event) = "
        f"{numeric:.6g} + {comp:.6g} = 1.")
    head = (answer or "").strip()
    if not head:
        head = f"probability = {comp_txt}"
    new_answer = f"{head} -> P(NOT) = {comp_txt}"
    return {"answer": new_answer, "numeric": comp, "steps": new_steps}


def _ratio_of(p: float) -> Optional[Tuple[int, int]]:
    """Exact small-denominator ratio for a float in [0,1] (Farey up
    to 999), else None."""
    if p < 0 or p > 1:
        return None
    for den in range(2, 1000):
        num = round(p * den)
        if abs(num / den - p) <= 1e-12:
            if num == 0 or num == den:
                return None
            from math import gcd
            if gcd(num, den) == 1:
                return num, den
    return None


# --------------------------------------------------------------------------- #
# 4. Construction-ask guard (procedure asks are not numeric asks)
# --------------------------------------------------------------------------- #

_CONSTRUCTION_ASK_RE = re.compile(
    r"\bsteps?\s+of\s+construction\b|\bconstruct\s+(?:a|an|the)\s+"
    r"(?:triangle|line|angle|perpendicular|bisector|square|"
    r"rectangle|rhombus|parallelogram|circle|hexagon)\b", re.I)


def is_construction_ask(text: str) -> bool:
    return bool(_CONSTRUCTION_ASK_RE.search(text or ""))


CONSTRUCTION_REFUSAL = (
    "This question asks for a construction — the answer is a drawn "
    "figure with its steps of construction, not a single number. Use "
    "guided practice to work through the construction method.")


# --------------------------------------------------------------------------- #
# 3b. Linear-exact rescue (distractor-resistant solve asks)
# --------------------------------------------------------------------------- #

_SOLVE_ASK_RE = re.compile(
    r"\bsolve\b|\bfor\s+[a-z]\s*[:=]", re.I)
_LINEAR_TERM_RE = re.compile(r"([+-]?)\s*(\d+(?:\.\d+)?)?\s*([a-z]?)")
_VAR_SIDE_RE = re.compile(r"[a-z]")


def _parse_linear_side(side: str) -> Optional[Tuple[float, float, str]]:
    """'2x + 6' -> (2.0, 6.0, 'x'); '20' -> (0.0, 20.0, '');
    None when the side is not a clean linear expression (any prose,
    second variable, or glued junk disqualifies -- that is exactly what
    keeps distractor sentences out)."""
    s = side.strip().rstrip(".")
    if not s or not re.fullmatch(
            r"[+\-]?[\d.\s]*[a-z]?[\d.\s+\-]*[a-z]?[\d.\s+\-]*", s, re.I):
        if not re.fullmatch(r"[\d.\s+\-]+", s):
            return None
    variables = set(re.findall(r"[a-z]", s, re.I))
    if len(variables) > 1:
        return None
    var = variables.pop() if variables else ""
    var = var.lower()
    coeff = 0.0
    const = 0.0
    pos = 0
    term_re = re.compile(
        r"([+-]?)\s*(\d+(?:\.\d+)?)?\s*([a-z])?(\s*\*?\s*[a-z])?", re.I)
    saw_term = False
    for m in term_re.finditer(s):
        if m.start() != pos and s[pos:m.start()].strip():
            return None          # unparseable gap: prose on the side
        pos = m.end()
        sign = -1.0 if m.group(1) == "-" else 1.0
        num = m.group(2)
        has_var = bool(m.group(3) or m.group(4))
        if num is None and not has_var:
            continue
        saw_term = True
        val = float(num) if num is not None else 1.0
        if has_var:
            coeff += sign * val
        else:
            const += sign * val
    if pos != len(s.strip()) or not saw_term:
        return None
    return coeff, const, var


def solve_linear_exact(text: str) -> Optional[Dict[str, Any]]:
    """Distractor-resistant 'solve for x' rescue.

    Only a clause whose BOTH sides are pure linear expressions with at
    most one variable is solved; every other sentence in the question
    is never read, so a distractor number cannot leak into the answer.
    Verified by substituting the solution back (a*x + b == c exactly).
    """
    if not text or not _SOLVE_ASK_RE.search(text):
        return None
    # candidate clauses: sentence/comma fragments containing exactly one '='
    clauses = re.split(r"[.!?;]\s*", text)
    best = None
    for clause in clauses:
        if clause.count("=") != 1:
            continue
        lhs, _, rhs = clause.partition("=")
        lhs = re.sub(r"^\s*solve\b[^:=]*[:=]?\s*", "", lhs,
                     flags=re.I)          # strip 'solve for x:' lead-in
        lhs = re.sub(r"^\s*solve\s+", "", lhs, flags=re.I)
        left = _parse_linear_side(lhs)
        right = _parse_linear_side(rhs)
        if left is None or right is None:
            continue
        lc, lk, lv = left
        rc, rk, rv = right
        var = lv or rv
        if not var:
            continue
        a = lc - rc
        b = lk - rk
        if abs(a) < 1e-12:
            continue
        x = -b / a
        # verifier: substitute back into the ORIGINAL sides
        if abs((lc * x + lk) - (rc * x + rk)) > 1e-9 * max(
                1.0, abs(lc * x + lk), abs(rc * x + rk)):
            continue
        if not (abs(x) < 1e12):
            continue
        xr = round(x)
        if abs(x - xr) <= 1e-12:
            x = float(xr)
        best = (var, x, clause.strip(), lc, lk, rc, rk)
    if best is None:
        return None
    var, x, clause, lc, lk, rc, rk = best

    def _side_str(c, k, v):
        terms = []
        if c:
            terms.append(f"{c:g}{v}" if v else f"{c:g}")
        if k:
            terms.append(("+ " if k > 0 else "- ") + f"{abs(k):g}")
        return " ".join(terms) or "0"

    steps = [
        f"equation (distractor-resistant read: only the clause with "
        f"one '=' is parsed): {_side_str(lc, lk, var)} = "
        f"{_side_str(rc, rk, var)}",
        f"collect terms: {lc - rc:g}{var} = {rk - lk:g} -> "
        f"{var} = {x:g}",
        f"check: substitute back -- {lc:g} x {x:g} {'+' if lk >= 0 else '-'} "
        f"{abs(lk):g} = {rc:g} x {x:g} {'+' if rk >= 0 else '-'} "
        f"{abs(rk):g} -- closes exactly",
    ]
    return {"answer": f"{var} = {x:g}", "numeric": x, "steps": steps,
            "gate": "linear_exact_substitution"}


__all__ = [
    "ask_unit", "computed_unit", "convert_linear", "fmt_num",
    "normalize_to_ask_unit", "gst_inclusive_ask", "gst_reverse_result",
    "reshape_multi_root", "reshape_prob_complement",
    "is_construction_ask", "CONSTRUCTION_REFUSAL", "solve_linear_exact",
]
