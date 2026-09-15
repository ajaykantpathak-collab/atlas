"""modeling_structures.py -- canonical structures batch 2.

Three families the adversarial battery proved missing (each verified
against its textbook problem):

    SIMULTANEOUS_DEPLETION   two-candles: 1 - t/T1 = k(1 - t/T2)
    MEET_AND_SHUTTLE         fly-between-trains: t = D/(v1+v2); s = w t
    TRIPARTITE_KINEMATICS    accelerate-cruise-brake: s = 1/2 a t1^2
                                                           + v t2 + 1/2 v t3

All deterministic triggers + closed forms + asymmetry guards (D2).
Registered by modeling_layer.  NOTE: every regex here is a raw string
-- a corrupted non-raw escape once shipped a literal backspace into a
pattern and silently zeroed a whole family.
"""

from __future__ import annotations

import re
from typing import Optional

from backend.its.solver.modeling_layer import ModelResult


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


# --------------------------------------------------------------------------- #
# STRUCTURE 2: SIMULTANEOUS_DEPLETION  (two-candles)
# --------------------------------------------------------------------------- #

_DEPLETE_DUR_RE = re.compile(
    r"\b(?:burn(?:s|t)?(?:\s+out)?|consum\w*|melt\w*|drain\w*|"
    r"empty\w*|runs?\s+out)\D{0,30}?in\s+(\d+(?:\.\d+)?)\s*"
    r"(hours?|hrs?|h|minutes?|mins?|days?)\b", re.I)
_ANY_DURATION_RE = re.compile(
    r"in\s+(\d+(?:\.\d+)?)\s*(hours?|hrs?|h|minutes?|mins?|days?)\b",
    re.I)
_DEPLETE_RATIO_RE = re.compile(
    r"\b(twice|thrice|three\s+times|four\s+times|five\s+times|"
    r"(\d+(?:\.\d+)?)\s*times)\b", re.I)
_HOURS = {"h": 1.0, "hour": 1.0, "hours": 1.0, "hr": 1.0, "hrs": 1.0,
          "minute": 1 / 60, "minutes": 1 / 60, "min": 1 / 60,
          "mins": 1 / 60, "day": 24.0, "days": 24.0}


def _dep_ratio(text: str) -> Optional[float]:
    m = _DEPLETE_RATIO_RE.search(text)
    if not m:
        return None
    if m.group(2):
        return float(m.group(2))
    word = re.sub(r"\s*times$", "", m.group(1).lower())
    return {"twice": 2.0, "thrice": 3.0, "three": 3.0, "four": 4.0,
            "five": 5.0}.get(word)


def _to_hours(value: float, unit: str) -> float:
    return value * _HOURS[unit.lower().rstrip(".")]


def model_simultaneous_depletion(text: str) -> ModelResult:
    low = text.lower()
    durations = [_to_hours(float(m.group(1)), m.group(2))
                 for m in _DEPLETE_DUR_RE.finditer(text)]
    # ordinal fallback: "the first ... in 3 hours, the second in 4
    # hours" -- the second mention often omits the depletion verb
    if len(durations) < 2 and re.search(r"burn|consum|melt", low) \
            and re.search(r"first|second", low):
        durations = [_to_hours(float(m.group(1)), m.group(2))
                     for m in _ANY_DURATION_RE.finditer(text)]
    k = _dep_ratio(text)
    equal_len = re.search(r"equal\s+length|same\s+(?:length|size)|"
                          r"identical", low)
    compare = re.search(r"twice|times|as\s+long\s+as", low)
    if (len(durations) < 2 or k is None or not equal_len or not compare
            or abs(durations[0] - durations[1]) < 1e-12):
        return _no("SIMULTANEOUS_DEPLETION",
                   f"need 2 distinct durations + ratio k + equal lengths "
                   f"(got {len(durations)}, k={k})")
    T1, T2 = sorted(durations[:2])       # T1 = shorter life
    # "one candle twice the other" is reading-ambiguous; solve both
    # assignments and accept the root in the physical range
    t = None
    for denom in (k / T2 - 1.0 / T1, k / T1 - 1.0 / T2):
        if abs(denom) < 1e-12:
            continue
        cand = (k - 1.0) / denom
        if 0 < cand < min(T1, T2):
            t = cand
            break
    if t is None:
        return _no("SIMULTANEOUS_DEPLETION",
                   "no reading gives a root in the physical range")
    return ModelResult(
        structure="SIMULTANEOUS_DEPLETION", matched=True,
        confidence=0.9, quantities={"T1": T1, "T2": T2, "k": k},
        governing_equation="1 - t/T1 = k(1 - t/T2)",
        final_answer=f"{t:.4g} hours",
        numeric_answer=t,
        steps=[f"Fractions remaining: first = 1 - t/{T1:g}, "
               f"second = 1 - t/{T2:g}",
               f"Set 1 - t/{T1:g} = {k:g}(1 - t/{T2:g})",
               f"t = ({k:g} - 1)/({k:g}/{T2:g} - 1/{T1:g}) = {t:.4g} "
               f"hours"],
        note="two-candles family")


# --------------------------------------------------------------------------- #
# STRUCTURE 3: MEET_AND_SHUTTLE  (fly-between-trains)
# --------------------------------------------------------------------------- #

_SPEED_KMPH_RE = re.compile(
    r"(\d+(?:\.\d+)?)\s*(?:km\s*/\s*h(?:r)?|kmph|kilometres?\s*per\s*"
    r"hour|kilometers?\s*per\s*hour)", re.I)
_TOWARD_RE = re.compile(r"toward\w*|approach\w*|each\s+other|"
                        r"head(ed)?\s+(?:toward|for)", re.I)
_SHUTTLE_RE = re.compile(r"\b(fly|bird|bee|shuttle|swallow|drone)\b",
                         re.I)
_DIST_APART_RE = re.compile(r"(\d+(?:\.\d+)?)\s*km\s+apart", re.I)
_SHUTTLE_SPEED_RE = re.compile(
    r"(?:fly|bird|bee|shuttle|swallow|drone)\D{0,60}?"
    r"(\d+(?:\.\d+)?)\s*km(?:\s*/\s*h(?:r)?)?", re.I)


def model_meet_and_shuttle(text: str) -> ModelResult:
    low = text.lower()
    if not (_TOWARD_RE.search(low) and _SHUTTLE_RE.search(low)):
        return _no("MEET_AND_SHUTTLE", "no approach + shuttle narrative")
    speeds = [float(m.group(1)) for m in _SPEED_KMPH_RE.finditer(text)]
    md = _DIST_APART_RE.search(text)
    dist = float(md.group(1)) if md else None
    if len(speeds) < 2 or dist is None or dist <= 0:
        return _no("MEET_AND_SHUTTLE",
                   f"need vehicle speeds + 'D km apart' (got "
                   f"{len(speeds)} speeds, D={dist})")
    wm = _SHUTTLE_SPEED_RE.search(low)
    if wm:
        w = float(wm.group(1))
        others = [s for s in speeds if abs(s - w) > 1e-9]
    else:
        w = speeds[-1]
        others = speeds[:-1]
    if "each" in low and len(others) == 1:
        v1 = v2 = others[0]          # "at 50 km/h each" -> both trains
    elif len(others) >= 2:
        v1, v2 = others[0], others[1]
    else:
        return _no("MEET_AND_SHUTTLE",
                   "cannot separate the two vehicle speeds")
    if v1 + v2 <= 0:
        return _no("MEET_AND_SHUTTLE", "closing speed <= 0")
    t_meet = dist / (v1 + v2)
    d_fly = w * t_meet
    return ModelResult(
        structure="MEET_AND_SHUTTLE", matched=True, confidence=0.9,
        quantities={"D": dist, "v1": v1, "v2": v2, "w": w},
        governing_equation="t = D/(v1+v2); s = w*t",
        final_answer=f"{d_fly:.4g} km",
        numeric_answer=d_fly,
        steps=[f"Closing speed: {v1:g} + {v2:g} = {v1 + v2:g} km/h",
               f"They meet after {dist:g}/{v1 + v2:g} = "
               f"{t_meet:.4g} hours",
               f"The fly flies {w:g} x {t_meet:.4g} = {d_fly:.4g} km"],
        note="fly-between-trains family")


# --------------------------------------------------------------------------- #
# STRUCTURE 4: TRIPARTITE_KINEMATICS  (accelerate - cruise - brake)
# --------------------------------------------------------------------------- #


def model_tripartite_kinematics(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"accelerat\w*(?:\s+uniformly)?\s+from\s+rest|"
                     r"uniformly\s+accelerat\w*|accelerat\w+\s+uniformly",
                     low):
        return _no("TRIPARTITE_KINEMATICS", "no uniform acceleration")
    if not re.search(r"constant\s+veloc\w+|uniform\s+veloc\w+", low):
        return _no("TRIPARTITE_KINEMATICS", "no cruise phase")
    if not re.search(r"brake\w*|decelerat\w*|retardat\w*|comes?\s+to\s+rest",
                     low):
        return _no("TRIPARTITE_KINEMATICS", "no braking phase")
    am = re.search(r"(?:at|of)\s+(\d+(?:\.\d+)?)\s*m\s*/?\s*s\s*[\^]?\s*2",
                   low)
    times = re.findall(r"(?:for|in)\s+(\d+(?:\.\d+)?)\s*seconds?", low)
    if not am or len(times) < 3:
        return _no("TRIPARTITE_KINEMATICS",
                   f"need acceleration + 3 durations (a="
                   f"{'yes' if am else 'no'}, times={len(times)})")
    acc = float(am.group(1))
    t1, t2, t3 = (float(t) for t in times[:3])
    if min(t1, t2, t3) <= 0:
        return _no("TRIPARTITE_KINEMATICS", "non-positive duration")
    v = acc * t1
    s1 = 0.5 * acc * t1 ** 2
    s2 = v * t2
    s3 = 0.5 * v * t3
    total = s1 + s2 + s3
    return ModelResult(
        structure="TRIPARTITE_KINEMATICS", matched=True, confidence=0.9,
        quantities={"a": acc, "t1": t1, "t2": t2, "t3": t3, "v": v},
        governing_equation="s = 1/2 a t1^2 + v t2 + 1/2 v t3",
        final_answer=f"{total:.4g} m",
        numeric_answer=total,
        steps=[f"Phase 1: v = a t1 = {acc:g} x {t1:g} = {v:g} m/s; "
               f"s1 = 1/2 a t1^2 = {s1:g} m",
               f"Phase 2: s2 = v t2 = {v:g} x {t2:g} = {s2:g} m",
               f"Phase 3: uniform brake to rest in {t3:g} s; "
               f"s3 = 1/2 v t3 = {s3:g} m",
               f"Total = {s1:g} + {s2:g} + {s3:g} = {total:.4g} m"],
        note="accelerate-cruise-brake family")
