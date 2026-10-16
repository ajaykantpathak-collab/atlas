"""ask_coherence.py -- does the family answer what the question asks?

The output-side mirror of SKEPTIC-1's _value_consumed() (input side):
that verifies a bound value's unit against what the family CONSUMES;
this verifies the family's OUTPUT kind against what the question
ASKS.  A family that matches keywords but answers another kind -- a
median for a sum-ask, 1/x for a proof-ask, a tangent length for an
area-ask -- is the shadowing bug behind the confident-wrong class.
Refuse it and the fall-through gives the correct family its turn.

Fail-open by design: an ask that cannot be typed never blocks.
"""

from __future__ import annotations

import re
from typing import Dict, List, Optional, Set, Tuple

Kind = str

ASK_KINDS: Dict[Kind, "re.Pattern[str]"] = {
    k: re.compile(p, re.I)
    for k, p in {
        "length": r"\b(?:length|perimeter|circumference|height|depth|"
                  r"distance|tangent|chord|side|diagonal|altitude|"
                  r"breadth|width|radius|radii|diameter|slant|"
                  r"how\s+(?:long|far|tall)|kilomet(?:er|re)s?|"
                  r"met(?:er|re)s?|cm|mm)\b",
        "area":   r"\bareas?\b|\bsq\.?\s*(?:cm|mm|m|km|units?)\b",
        "volume": r"\b(?:volume|capacity)\b|\b(?:litres?|liters?)\b|\bcu\.?\s*(?:cm|m|units?)\b",
        "angle":  r"\b(?:angles?|theta|inclination|elevation|"
                  r"depression)\b|\bin\s+degrees?\b|°",
        "time":   r"\b(?:time|duration)\b|\bhow\s+many\s+"
                  r"(?:hours?|minutes?|seconds?|days?|weeks?|years?)\b|"
                  r"\b(?:hours?|minutes?|seconds?|days?|weeks?|years?)\b",
        "speed":  r"\b(?:speed|velocity|km/h|kmph|km\s*per\s+hour|m/s)\b",
        "money":  r"\b(?:cost|costs|price|prices?|spend|spent|paid|pay|"
                  r"pays|charge[sd]?|profit|loss|discount|income|salary|"
                  r"fare|bill|money)\b|₹|\b(?:rs\.?|rupees)\b|\b(?:compound|simple)\s+interest\b|\binterest\b|\bprincipal\b",
        "mass":   r"\b(?:mass|weight)\b",
        "temperature": r"\btemperature\b|°\s*[cf]\b|"
                       r"\b(?:celsius|fahrenheit|kelvin)\b",
        "probability": r"\b(?:probability|chance|likelihood)\b|\bP\s*\(",
        "percent": r"\bpercent(?:age)?\b|%",
        # unit-qualified how-many is a QUANTITY ask, not a count:
        # 'How many kilometres...' -> length (the unit names the kind);
        # bare 'How many students...' stays count (LOOP-FIXER geo-c8)
        "count":  r"\bhow\s+many\b(?!\s*(?:km\b|kilomet(?:er|re)s?|"
                  r"met(?:er|re)s?|cm\b|mm\b|lit(?:er|re)s?|ml\b|"
                  r"grams?|kilograms?|kg\b|rupees?|rs\.?|\u20b9|"
                  r"hours?|minutes?|seconds?|days?|years?|degrees?))"
                  r"|\bnumber\s+of\b|(?<!least[-\s])\bcount\b",
                  # 'least count' is a length ask (vernier/screw LC),
                  # not a counting ask -- the bare 'count' keyword used
                  # to type it {count} and gate-refuse the LC family's
                  # '0.1 mm' answer (2026-10-08 reconciliation)
        "ratio":  r"\bratios?\b",
        "sum":    r"\bsum\b",
        "mean":   r"\bmean\b|\baverages?\b",
        "median": r"\bmedians?\b",
        "mode":   r"\bmodes?\b",
        "range":  r"\branges?\b",
        "roots":  r"\b(?:zeroes?|zeros?|roots?)\b",
        "term":   r"\b(?:which|what)\s+terms?\b|\b(?:\d+\w{0,2}|next|"
                  r"following|last|first|nth)\s+terms?\b",
        "classify": r"\bwhat\s+(?:kind|type)\s+of\b|\bnature\s+of\s+(?:the\s+)?(?:roots?|zeroes?)\b|\bname\s+the\s+"
                    r"(?:figure|shape|quadrilateral|polygon)\b",
        "proof":  r"\bprove\b|\bshow\s+that\b|\bverify\s+that\b|"
                  r"\bdemonstrate\s+that\b",
        # C11/C12 sweep kinds — previously untyped, so every numeric
        # family passed the ask-gate on them (rank->det shipped VERIFIED)
        "rank":   r"\brank\s+of\b|\bits\s+rank\b|\bfind\s+(?:the\s+)?rank\b",
        "equation": r"\bequation\b|\bcurve\b(?!\s+area)",
        "minor":  r"\bminor\s+M?_?\d|cofactor\s+(?:of\s+)?[ACa-z]_?\d|"
                  r"\bM_\d+\s*_?\d*\b|\bC_\d+\s*_?\d*\b|"
                  r"\bminor\s+of\s+a_?\d",
        "design": r"\bdesign\s+(?:a|an|the)\b|\bchoose\s+(?:a|an)\s+"
                  r"\w+\s+and\s+(?:a|an)\s+\w+",
        "matrix_type": r"\bsymmetric\b|\bskew[-\s]?symmetric\b|"
                       r"\bscalar\s+matrix\b|\bdiagonal\s+matrix\b|"
                       r"\bidentity\s+matrix\b|\bsingular\b|"
                       r"\bnon[-\s]?singular\b",
        "direction": r"\bdirection\s+(?:cosines?|ratios?|angles?)\b",
        "energy":       r"\b(?:heat|energy)\b|how\s+much\s+heat",
        "momentum":     r"\bmomentum\b|\bimpulse\b",
        # physics work asks share the joule with energy (2026-10-08
        # class-9 reconciliation): without this kind a "how much work is
        # done ... for 30 seconds" ask typed as {time} off the tail and
        # the correct zero-work family (answer '0 J') was gate-refused.
        "work":         r"\bhow\s+much\s+work\b|\bwork\s+(?:is\s+)?done\b"
                        r"|\bwork\s+done\s+by\b",
        "acceleration": r"\b(?:acceleration|retardation|deceleration)\b",
        "power":        r"\bpower\s+of\s+(?:a|the)\s+lens\b|"
                        r"\bdiopt(?:re|er)s?\b",
        # pressure was answer-side only (_ANSWER_UNIT_KIND) since the
        # owner's kind additions -- every pressure ask degraded to
        # whatever leaked from the givens ('Take g = 10 m/s^2' typed as
        # speed) and the coherence gate then killed the correct
        # pressure families (2026-10-07 c8 regression root cause).
        "pressure":     r"\bpressures?\b|\bpascals?\b|\bPa\b",
    }.items()
}


def register_ask_kinds(extra: Dict[Kind, str]) -> None:
    """Subjects extend the taxonomy (their money/temperature phrasings)."""
    for k, p in (extra or {}).items():
        ASK_KINDS[k] = re.compile(p, re.I)


_IMPERATIVE = re.compile(
    r"\b(?:find|calculate|determine|evaluate|compute|obtain|"
    r"what|how|which)\b", re.I)
_PROOF_ANCHOR = re.compile(
    r"\b(?:prove|show\s+that|verify\s+that|demonstrate\s+that)\b", re.I)

_MODIFIER_GAP = re.compile(r"^\s{0,3}$|^\s*of\s*$")
_COORD_GAP = re.compile(r"^\W{0,8}(?:and|or|&|,|\+)\W{0,8}$", re.I)


def _scan(window: str) -> Tuple[Set[Kind], Set[Kind]]:
    hits: List[Tuple[int, int, Kind]] = []
    for kind, pat in ASK_KINDS.items():
        for m in pat.finditer(window):
            hits.append((m.start(), m.end(), kind))
    if not hits:
        return set(), set()
    hits.sort(key=lambda h: (h[0], -(h[1] - h[0])))
    primary: Set[Kind] = {hits[0][2]}
    tolerated: Set[Kind] = set()
    last_end = hits[0][1]
    for s, e, k in hits[1:]:
        if s < last_end:
            continue
        gap = window[last_end:s]
        if _MODIFIER_GAP.match(gap) and len(primary) == 1:
            tolerated |= primary
            primary = {k}
        elif _COORD_GAP.match(gap) and len(gap) <= 24:
            primary |= {k}
        last_end = max(last_end, e)
    return primary, tolerated


def asked_kinds(text: str) -> Tuple[Set[Kind], Set[Kind]]:
    if not text:
        return set(), set()
    m = None
    for m in _IMPERATIVE.finditer(text):
        pass
    if m is not None:
        window = text[m.start():m.start() + 220]
    elif (mp := _PROOF_ANCHOR.search(text)) is not None:
        window = text[mp.start():mp.start() + 220]
    else:
        window = text[:160]
    # parenthetical segments are givens/conventions, never the ask:
    # '(Take g = 10 m/s^2)' must not type a pressure ask as speed
    # (2026-10-07 c8 regression -- the givens-leak class).
    window = re.sub(r"\([^)]*\)", " ", window)
    return _scan(window)


def asked_any(text: str) -> Set[Kind]:
    pri, tol = asked_kinds(text)
    return pri | tol


def kind_set(declared) -> Set[Kind]:
    if not declared:
        return set()
    return {declared} if isinstance(declared, str) else set(declared)


_ANSWER_UNIT_KIND: Tuple[Tuple[str, Kind], ...] = (
    # kWh/Wh billing energy BEFORE the time row: '1.2 kWh per day' must
    # type as energy, not time (the 'per day' qualifier is not the
    # answer's unit -- 2026-10-07 saved-kWh regression)
    (r"\b(?:kwh|mwh|gwh|wh)\b", "energy"),
    # composite joule units type on the NUMERATOR before the plain-unit
    # rows: '88 J/°C' is a heat capacity (energy per temperature) --
    # the temperature row below it used to claim the tail first and
    # re-type the C7 heat-per-degree answer as temperature
    # (2026-10-08 class-7/9 reconciliation)
    (r"(\d)\s*(?:k?J|joules?)\s*(?:/|per\s)", "energy"),
    (r"(?:sq\.?\s*(?:cm|mm|m|km|units?)|(?:cm|mm|m|km)\s*\^?\s*2|"
     r"square\s+(?:cm|mm|m|units?))\b", "area"),
    (r"(?:cu\.?\s*(?:cm|m|units?)|(?:cm|m)\s*\^?\s*3|"
     r"cubic\s+(?:cm|m|units?))\b", "volume"),
    (r"(\d)\s*m/s\^?2\b|(\d)\s*ms-2\b", "acceleration"),
    (r"\b(?:km/h|kmph|km\.?\s*h-1|m/s|km\s*per\s+hour)\b", "speed"),
    (r"°\s*[cf]\b|\b(?:celsius|fahrenheit|kelvin)\b", "temperature"),
    (r"\bdeg(?:rees?)?\b|°", "angle"),
    (r"(?:₹|rs\.?|rupees)\b", "money"),
    (r"%|\bpercent\b", "percent"),
    (r"\b(?:hours?|minutes?|seconds?|days?)\b", "time"),
    (r"(\d)\s*(?:k?J|joules?)\b|(\d)\s*(?:k?cal|calories?)\b", "energy"),
    (r"(\d)\s*(?:D|diopt(?:re|er)s?)\b", "power"),
    (r"\d(?:\.\d+)?\s*(?:Pa|pascals?|N/m)\b", "pressure"),
    (r"\b(?:km|cm|mm|met(?:er|re)s?|ft|inches|foot)\b|\bm\b", "length"),
)


# Cross-kind bridges (2026-10-08 reconciliation): pairs of kinds that
# share a unit and must accept each other's answers.  Work and energy
# are BOTH joules -- a work ask accepts a joule answer and an energy
# ask accepts a work answer.  Bridges only WIDEN acceptance (fail-open
# direction); the shadowing protection (median vs sum etc.) is
# unaffected because unrelated kinds never bridge.
_KIND_BRIDGES: Dict[Kind, Set[Kind]] = {
    "work": {"energy"},
    "energy": {"work"},
}


def bridge_kinds(wanted: Set[Kind]) -> Set[Kind]:
    """wanted plus the unit-sharing companion kinds of every member."""
    out = set(wanted)
    for k in wanted:
        out |= _KIND_BRIDGES.get(k, set())
    return out


_DIM_TO_KIND: Dict[str, Kind] = {
    "[length] ** 2": "area",
    "[length] ** 3": "volume",
    "[time]": "time",
    "[length] / [time]": "speed",
    "[length] / [time] ** 2": "acceleration",
    "[mass]": "mass",
    "[temperature]": "temperature",
    "[mass] * [length] ** 2 / [time] ** 2": "energy",
    "[mass] / [length] / [time] ** 2": "pressure",
    "1 / [length]": "power",
}


def answer_kind(answer: str) -> Optional[Kind]:
    if not answer:
        return None
    tail = " ".join(answer.split()[-4:])
    # 'per <unit>' qualifiers (billing periods, rates) name a ratio, not
    # the answer's own unit: '1.2 kWh per day' is energy, not time
    tail = re.sub(r"\bper\s+\w+", " ", tail, flags=re.I)
    for pat, kind in _ANSWER_UNIT_KIND:
        if re.search(pat, tail, re.I):
            return kind
    # Pint dimensional inference fallback
    try:
        from backend.its.solver.pint_physics_engine import ureg
        q = ureg(tail.strip())
        dim_str = str(q.dimensionality)
        if dim_str in _DIM_TO_KIND:
            return _DIM_TO_KIND[dim_str]
    except Exception:
        pass
    return None


def ask_coherent(text: str, declared, answer: Optional[str] = None,
                 ask_phrase: Optional[str] = None) -> bool:
    pri, tol = asked_kinds(ask_phrase or text)
    if not (pri or tol):
        return True
    d = kind_set(declared)
    if pri == {"proof"} and "proof" not in d:
        return False
    accept = bridge_kinds((pri | tol))
    if d and not (d & accept):
        return False
    if answer:
        ak = answer_kind(answer)
        if ak and ak not in accept:
            return False
    return True


ASK_REFUSALS: List[Tuple[str, str, str, str, bool]] = []


def note_refusal(sid: str, wanted: Set[Kind], claimed: Set[Kind],
                 reason: str, watch: bool = False) -> None:
    if len(ASK_REFUSALS) < 500:
        ASK_REFUSALS.append((sid, ",".join(sorted(wanted)),
                             ",".join(sorted(claimed)) or "-", reason,
                             watch))
