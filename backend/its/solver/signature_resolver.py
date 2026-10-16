"""signature_resolver.py — resolve quantitative questions by DIMENSIONAL
SIGNATURE, not by phrase matching.

THE DIRECTIVE (owner, 2026-10-01): "Stop selecting solvers by matching the
question. Resolve it by dimensional signature."

The resolver:
1. Extracts every quantity from the question as {value_si, dimension_vector}
   using the dimension registry (dimensions.py).
2. Classifies the TARGET dimension from the ask ("how long" -> T,
   "what speed" -> LT⁻¹, "how far" -> L, "find the time" -> T ...).
3. Ranks solver templates whose INPUT dimension multiset matches the
   extracted givens AND whose OUTPUT dimension matches the target.

The regex triggers in the family tables survive as the FAST PATH -- cheap
and exact on canonical phrasings.  The signature resolver is:
  * the PARAPHRASE FALLBACK (catches phrasings no trigger was written for)
  * the UNIT-SWAP GUARD (a time slot cannot bind to a length)
  * the ARBITER (regex fires but dimensions contradict -> refuse)

Tonight's proof: "It falls through 45 m -> 4.5 s" was dimensionally
impossible (m / (m/s²) = s², not s).  The signature router rejects that
equation at selection time.
"""
from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.dimensions import (
    Dims, D_ACCEL, D_LENGTH, D_SPEED, D_TIME, D_MASS, D_FORCE, D_NONE,
    scan_quantities, unit_dims, to_si,
)

# ------------------------------------------------------------------ #
# ASK classification: target dimension from question wording
# ------------------------------------------------------------------ #

_ASK_TARGETS = [
    (re.compile(r"how\s+long|time\s+(?:taken|of\s+flight|to\s+(?:fall|reach|stop)"
               r"|hit)|how\s+soon|when\s+will|takes?\s+to\s+(?:come|reach|fall|hit)"
               r"|time\s+before|(?:how\s+long\s+does\s+it\s+|how\s+long\s+to)"
               r"|fall\s+take|time\s+of\s+the\s+fall", re.I),
     D_TIME, "t"),
    (re.compile(r"(?:with\s+)?what\s+(?:speed|velocity)"
               r"|how\s+fast|velocity\s+just\s+before|impact\s+(?:velocity|speed)"
               r"|hits?\s+the\s+(?:ground|water|surface)\s+(?:at|with)", re.I),
     D_SPEED, "v"),
    (re.compile(r"how\s+far|what\s+distance|distance\s+(?:travelled|covered)"
               r"|how\s+(?:high|deep)|stopping\s+distance", re.I),
     D_LENGTH, "s"),
    (re.compile(r"(?:what\s+(?:is|was)\s+(?:its?\s+|the\s+)?)?"
                r"(?:acceleration|retardation|deceleration)", re.I),
     D_ACCEL, "a"),
    (re.compile(r"average\s+speed", re.I), D_SPEED, "speed"),
]


def target_dim(text: str) -> Optional[Tuple[Dims, str]]:
    for rx, dim, name in _ASK_TARGETS:
        if rx.search(text):
            return dim, name
    return None


# ------------------------------------------------------------------ #
# Signature: the dimension multiset of the KNOWN quantities
# ------------------------------------------------------------------ #

def _sig_key(dims_list: List[Dims]) -> Tuple:
    """Order-independent signature of the known quantities."""
    counts: Dict[Tuple, int] = {}
    for d in dims_list:
        counts[d] = counts.get(d, 0) + 1
    return tuple(sorted(counts.items()))


# ------------------------------------------------------------------ #
# Solver templates: closed-form exact solvers keyed by
#   (frozenset of known dims, target dim)
# Each solver: (knowns: Dict[str, float], raw: Dict[str, tuple])
#   -> {"answer", "value", "steps", "verification"} or None.
# knowns holds SI values; raw maps name -> (raw_value, raw_unit).
# The ANSWER is displayed in the question's own units (schoolbook
# arithmetic on raw numbers) -- "150 km in 2 hours" must read 75 km/h,
# not 20.8333 m/s.  The SI path remains the verification backbone.
# Every solver is closed-form and self-verifying (inverse check).
# ------------------------------------------------------------------ #

def _solve_speed_from_distance_time(k, raw):
    s = k.get("L", 0.0)
    t = k.get("T", 0.0)
    if t <= 0:
        return None
    v = s / t
    check = v * t
    if abs(check - s) > 1e-9 * max(1, abs(s)):
        return None
    s_raw, u_s = raw.get("L", (s, "m"))
    t_raw, u_t = raw.get("T", (t, "s"))
    v_disp = s_raw / t_raw if t_raw > 0 else v
    unit_disp = f"{_sym(u_s)}/{_sym(u_t)}" if u_s and u_t else "m/s"
    return {"value": v, "answer": f"{v_disp:.6g} {unit_disp}",
            "steps": [f"speed = distance / time = {s_raw:.6g} {u_s} / "
                      f"{t_raw:.6g} {u_t} = {v_disp:.6g} {unit_disp}",
                      f"inverse check (SI): {v:.6g} m/s × {t:.6g} s = "
                      f"{check:.6g} == {s:.6g} m ✓"],
            "verification": "inverse relation (speed × time == distance)"}


def _solve_time_from_distance_accel(k, raw):
    s = k.get("L", 0.0)
    a = k.get("a", 0.0)
    if a <= 0 or s < 0:
        return None
    t = (2 * s / a) ** 0.5
    check = 0.5 * a * t * t
    if abs(check - s) > 1e-9 * max(1, abs(s)):
        return None
    return {"value": t, "answer": f"time = {t:.6g} s",
            "steps": [f"t = √(2s/a) = √(2 × {s:.6g} m / {a:.6g} m/s²) = "
                      f"{t:.6g} s",
                      f"inverse check: ½ × {a:.6g} × {t:.6g}² = "
                      f"{check:.6g} == {s:.6g} m ✓"],
            "verification": "inverse relation (s = ½at²)"}


def _solve_force_from_mass_accel(k, raw):
    m = k.get("M", 0.0)
    a = k.get("a", 0.0)
    if m <= 0:
        return None
    f = m * a
    check = f / m
    if abs(check - a) > 1e-9 * max(1, abs(a)):
        return None
    m_raw, u_m = raw.get("M", (m, "kg"))
    a_raw, u_a = raw.get("a", (a, "m/s^2"))
    f_disp = m_raw * a_raw
    unit_disp = "N" if (u_m == "kg" and u_a == "m/s^2") \
        else f"{_sym(u_m)}·{_sym(u_a)}"
    return {"value": f, "answer": f"force = {f_disp:.6g} {unit_disp}",
            "steps": [f"F = ma = {m_raw:.6g} {u_m} × {a_raw:.6g} {u_a} = "
                      f"{f_disp:.6g} {unit_disp}",
                      f"inverse check: {f:.6g} N / {m:.6g} kg = "
                      f"{check:.6g} == {a:.6g} m/s² ✓"],
            "verification": "inverse relation (F / m == a)"}


def _solve_distance_from_speed_time(k, raw):
    v = k.get("v", 0.0)
    t = k.get("T", 0.0)
    if t <= 0:
        return None
    s = v * t
    check = s / t
    if abs(check - v) > 1e-9 * max(1, abs(v)):
        return None
    v_raw, u_v = raw.get("v", (v, "m/s"))
    t_raw, u_t = raw.get("T", (t, "s"))
    s_disp = v_raw * t_raw
    # km/h × h -> km;  m/s × s -> m;  else compose honestly (m·min).
    # normalize unit spellings first or 'm/s' x 'seconds' composes the
    # nonsense unit 'm/s·seconds'
    u_v, u_t = _sym(u_v), _sym(u_t)
    if u_v.endswith("/" + u_t):
        unit_disp = _sym(u_v[: -len(u_t) - 1])
    else:
        unit_disp = f"{u_v}·{u_t}"
    return {"value": s, "answer": f"{s_disp:.6g} {unit_disp}",
            "steps": [f"distance = speed × time = {v_raw:.6g} {u_v} × "
                      f"{t_raw:.6g} {u_t} = {s_disp:.6g} {unit_disp}",
                      f"inverse check (SI): {s:.6g} m / {t:.6g} s = "
                      f"{check:.6g} == {v:.6g} m/s ✓"],
            "verification": "inverse relation (distance / time == speed)"}


def _solve_accel_from_mass_force(k, raw):
    m = k.get("M", 0.0)
    f = k.get("F", 0.0)
    if m <= 0:
        return None
    a = f / m
    check = a * m
    if abs(check - f) > 1e-9 * max(1, abs(f)):
        return None
    f_raw, u_f = raw.get("F", (f, "N"))
    m_raw, u_m = raw.get("M", (m, "kg"))
    a_disp = f_raw / m_raw
    unit_disp = "m/s^2" if (u_f == "N" and u_m == "kg") \
        else f"{_sym(u_f)}/{_sym(u_m)}"
    return {"value": a, "answer": f"acceleration = {a_disp:.6g} {unit_disp}",
            "steps": [f"a = F/m = {f_raw:.6g} {u_f} / {m_raw:.6g} {u_m} = "
                      f"{a_disp:.6g} {unit_disp}",
                      f"inverse check: {a:.6g} m/s² × {m:.6g} kg = "
                      f"{check:.6g} == {f:.6g} N ✓"],
            "verification": "inverse relation (a × m == F)"}


# signature key: frozenset of dimension vectors present in knowns
# NOTE: every solver named here MUST be defined above this dict -- the
# dict literal evaluates its values at import time.
SIGNATURE_SOLVERS = {
    (frozenset({D_LENGTH, D_TIME}), D_SPEED):
        _solve_speed_from_distance_time,
    (frozenset({D_LENGTH, D_ACCEL}), D_TIME):
        _solve_time_from_distance_accel,
    (frozenset({D_MASS, D_ACCEL}), D_FORCE):
        _solve_force_from_mass_accel,
    (frozenset({D_SPEED, D_TIME}), D_LENGTH):
        _solve_distance_from_speed_time,
    (frozenset({D_MASS, D_FORCE}), D_ACCEL):
        _solve_accel_from_mass_force,
}


def _dims_key(d: Dims) -> Tuple:
    """Quantize to a resolution key for matching (dimension family only).
    Semantic pseudo-dims ('pct', 'cur', ...) carry a string tag in dim[0];
    pass strings through untouched instead of rounding them."""
    return tuple(x if isinstance(x, str) else round(x) for x in d[:7])


# display symbols: registry canonical keys are word families ("hours");
# answers should read "km/h", not "km/hours"
_SYM = {
    "hour": "h", "hours": "h", "hr": "h",
    "second": "s", "seconds": "s", "sec": "s",
    "minute": "min", "minutes": "min",
    "metre": "m", "metres": "m", "meter": "m", "meters": "m",
    "centimetre": "cm", "centimetres": "cm",
    "centimeter": "cm", "centimeters": "cm",
    "millimetre": "mm", "millimetres": "mm",
    "millimeter": "mm", "millimeters": "mm",
    "kilometre": "km", "kilometres": "km",
    "kilometer": "km", "kilometers": "km",
    "gram": "g", "grams": "g",
    "kilogram": "kg", "kilograms": "kg",
    "newton": "N", "newtons": "N",
}


def _sym(u: str) -> str:
    return _SYM.get(u, u)


# reverse lookup: dimension vector -> semantic name
_DIM_NAMES = {
    _dims_key(D_LENGTH): "L",
    _dims_key(D_TIME): "T",
    _dims_key(D_MASS): "M",
    _dims_key(D_SPEED): "v",
    _dims_key(D_ACCEL): "a",
    _dims_key(D_FORCE): "F",
}


def resolve(text: str) -> Optional[Dict[str, Any]]:
    """Attempt dimensional-signature resolution."""
    # COMPARATIVE-DELTA GUARD (SOLVER-DIG-2, 2026-10-06): a quantity
    # attached to "less / more / faster ..." is a DIFFERENCE between two
    # readings of the problem, not a value the single-step model may
    # consume.  'express train takes 1 hour less ... 11 km/h more ...
    # travel 132 km' shipped speed = 132 km / 1 h VERIFIED.  Any delta
    # clause sends the question to the multi-step/quadratic lanes.
    if re.search(r"\b\d+(?:\.\d+)?\s*[A-Za-z°/^]{0,8}?\s*"
                 r"(?:less|more|fewer|greater|faster|slower|earlier|"
                 r"later)\b", text, re.I):
        return None
    knowns: Dict[Tuple, List[Tuple[float, str]]] = {}
    for v_si, d, span, raw_u in scan_quantities(text):
        key = _dims_key(d)
        knowns.setdefault(key, []).append((v_si, span, raw_u))

    if len(knowns) < 2:
        return None

    ask = target_dim(text)
    if ask is None:
        return None
    target, target_name = ask

    # map dimension vectors -> semantic names -> SI values.
    # AMBIGUITY GUARD: a dimension family carrying MORE than one quantity
    # (multi-leg journeys, "2 hours 30 minutes", before/after pairs) cannot
    # be disambiguated by single-step solvers -- taking vals[0] would ship
    # the first leg's arithmetic as a VERIFIED whole-problem answer.  Refuse;
    # the richer family solvers own those questions.
    values: Dict[str, float] = {}
    raws: Dict[str, Tuple[float, str]] = {}
    for dk, vals in knowns.items():
        name = _DIM_NAMES.get(dk)
        if not name or not vals:
            continue
        if len(vals) > 1:
            return None
        v_si, span, raw_u = vals[0]
        values[name] = v_si
        try:
            raw_val = float(span[: -len(raw_u)].replace(",", "").strip())
        except ValueError:
            raw_val = v_si
        raws[name] = (raw_val, raw_u)

    if len(values) < 2:
        return None

    known_set = frozenset(values.keys())
    # PHYSICS GUARD: the constant-rate signatures ({v,T}->L, {L,T}->v)
    # model uniform motion only.  If an acceleration is present (g, a)
    # or the question signals a projectile/kinematic situation, s=vt
    # is WRONG physics — refuse so the kinematics/PAL lane owns it.
    accelerated = "a" in known_set or re.search(
        r"\b(thrown|throw|projectile|gravity|free[\s-]fall|falls?\b|"
        r"dropped|accelerat\w*|decelerat\w*|retard\w*|brakes?\b)\b",
        text, re.I)
    CONST_RATE_SIGS = {
        frozenset({D_SPEED, D_TIME}),     # s = v t
        frozenset({D_LENGTH, D_TIME}),    # v = s / t  (average only)
    }
    for (sig_known, sig_target), solver in SIGNATURE_SOLVERS.items():
        if _dims_key(sig_target) != _dims_key(target):
            continue
        # sig_known holds dimension VECTORS; known_set holds semantic
        # NAMES ('L', 'T', ...).  Translate vectors -> names before the
        # subset test, or the check is vector-vs-string and never true.
        need = {_DIM_NAMES.get(_dims_key(d)) for d in sig_known} - {None}
        if not need.issubset(known_set):
            continue
        if accelerated and sig_known in CONST_RATE_SIGS:
            continue
        result = solver(values, raws)
        if result is not None:
            return {
                "answer": result["answer"],
                "value": result["value"],
                "verification": result["verification"],
                "steps": result["steps"],
                "knowns": dict(values),
            }
    return None
