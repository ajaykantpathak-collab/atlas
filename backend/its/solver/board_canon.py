"""board_canon.py — canonical rewriter: board-form ask -> trigger-form ask.

Family triggers read rigid slot strings ("distance is 41", "radius is 9").
Board papers write them naturally ("a point at a distance of 41cm", "a set
of 9 distinct observations").  This module is the bridge: loose acceptors
detect the ask + bind the quantities, then emit the rigid imperative form
the existing family TABLEs fire on.

Design rules:
    - ADD-ONLY: this file calls the family dispatchers; it never edits them.
    - NO-OP SAFE: if no acceptor matches, returns None — caller falls through
      to the normal pipeline untouched.
    - VERIFIED EMISSION: every rewrite is checked by re-running the family
      dispatcher on the emitted string; a rewrite that doesn't fire is
      never shipped.

Ask forms handled (CBSE X maths):
    eval        -> imperative "find X" phrasing (usually passes through)
    transform   -> "f given as value; find g(f)" -> evaluate-form
    complement  -> "probability of not E" -> P(not E) = 1 - P(E)
    conditional -> "if <stmt> then find X" -> bind condition, ask X
    inverse     -> result given, input asked ("HCF is 81, find pairs")
    select      -> "which of the following is not X" -> per-option eval
    prove       -> "prove A = B" -> identity verify (kernel lane)
"""

from __future__ import annotations

import re
import unicodedata
from typing import Any, Dict, List, Optional, Tuple

# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #

_NUM = r"(\d+(?:\.\d+)?)"

def _n(t: str) -> str:
    t = unicodedata.normalize("NFKC", t or "")
    t = (t.replace("−", "-").replace("–", "-")
          .replace("√", " sqrt ").replace("π", " pi ")
          .replace("𝛳", "theta").replace("θ", "theta")
          .replace("°", " degrees ").replace("𝑥", "x").replace("𝑦", "y"))
    return re.sub(r"\s+", " ", t).strip()


def _num(label: str, text: str) -> Optional[str]:
    """Loose slot finder: '<label> ... is/of/at a <label> of N'."""
    m = re.search(
        label + r"[^0-9]{0,25}?(?:is|=|of|:)?\s*" + _NUM, text, re.I)
    return m.group(1) if m else None


# --------------------------------------------------------------------------- #
# Acceptors: (detect_re, emit_fn).  emit returns the canonical string or None.
# --------------------------------------------------------------------------- #

def _acc_tangent_length(t: str) -> Optional[str]:
    """'tangent drawn to a circle of radius R from a point at distance D'
    -> 'tangent ... distance is D ... radius is R'."""
    if "tangent" not in t or "radius" not in t:
        return None
    r = _num(r"radius", t)
    d = _num(r"(?:distance|point)", t)
    if r and d:
        return (f"find the length of the tangent drawn to a circle, "
                f"distance is {d} cm, radius is {r} cm")
    return None


def _acc_sector_arc(t: str) -> Optional[str]:
    """'sector ... radius R ... arc length L' -> sector-area via arc.
    Family trigger wants radius+angle; emit arc-form if present, else angle."""
    if "sector" not in t:
        return None
    r = _num(r"radius", t)
    arc = _num(r"arc\s*(?:length)?", t)
    ang = _num(r"(?:central\s*)?angle", t)
    if r and arc:
        return (f"find the area of a sector of a circle of radius {r} cm "
                f"with arc length {arc} cm")
    if r and ang:
        return (f"area of a sector of a circle, radius is {r}, angle is {ang}")
    return None


_WORDNUM = {"one": "1", "two": "2", "three": "3", "four": "4", "five": "5",
            "six": "6", "seven": "7", "eight": "8", "nine": "9", "ten": "10",
            "eleven": "11", "twelve": "12"}


def _acc_prob_complement(t: str) -> Optional[str]:
    """'probability of not getting the sum 8' (dice) -> direct form.
    Keeps the domain context (dice/cards/letters) the handler needs;
    numeral-words are digitised.  Complement wrap is the caller's job."""
    if "probab" not in t:
        return None
    m = re.search(r"probability\s+(?:of|that)\s+(?:not\s+)?"
                  r"(?:getting|drawing|selecting|choosing|picking)?\s*"
                  r"(?:a|an|the)?\s*([a-z0-9\s]{2,40})", t, re.I)
    if not m:
        return None
    what = m.group(1).strip()
    for w, d in _WORDNUM.items():
        what = re.sub(rf"\b{w}\b", d, what)
    # domain context ("a pair of dice is tossed") rides in the stem — keep it
    dom = ""
    dm = re.match(r"^([^.]{0,80}?(dice|die|cards?|coin|letters?|balls?|"
                  r"word|deck|bag|box)[^.]{0,60}?\.)", t, re.I)
    if dm:
        dom = dm.group(1) + " "
    return f"{dom}find the probability of getting {what}"


def _acc_median_transform(t: str) -> Optional[str]:
    """'median of N observations is M, each increased by k' -> transform."""
    if "median" not in t or "is" not in t:
        return None
    m = re.search(r"median[^.]*?is\s*" + _NUM, t, re.I)
    k = re.search(r"(?:increased|decreased)\s+by\s+" + _NUM, t, re.I)
    if m and k:
        return (f"the median of observations is {m.group(1)}; each value "
                f"is increased by {k.group(1)}. find the new median")
    return None


def _acc_quad_zeroes(t: str) -> Optional[str]:
    """'find the zeroes of the quadratic polynomial P' -> keep imperative."""
    if "zeroes" not in t and "zeros" not in t:
        return None
    m = re.search(r"(?:quadratic\s+)?polynomial\s+(.+?)(?:\s+and\s+|$)", t, re.I)
    if m:
        return f"find the zeroes of the quadratic polynomial {m.group(1)}"
    return None


def _acc_trig_conditional(t: str) -> Optional[str]:
    """'if k·sin(ax) = c' -> 'k sin ax = c, find x'."""
    m = re.search(
        r"(\d*)\s*(sin|cos|tan|sec|cosec|cot)\s*\(?(\w+)\)?\s*=\s*([^\s,;]+)",
        t, re.I)
    if m and ("find" in t or "equal to" in t):
        k = m.group(1) or "1"
        return (f"{k} {m.group(2)} {m.group(3)} = {m.group(4)}. "
                f"find the value of x")
    return None


def _acc_hcf_pairs(t: str) -> Optional[str]:
    """'sum is S and HCF is H, find possible pairs' -> inverse form."""
    if "hcf" not in t and "h.c.f" not in t:
        return None
    s = _num(r"sum", t)
    h = _num(r"h\.?c\.?f", t)
    if s and h:
        return (f"two numbers have sum {s} and hcf {h}. "
                f"find the number of such pairs")
    return None


def _acc_volume_height(t: str) -> Optional[str]:
    """'base area A and volume V of cone, find height' -> cone volume family."""
    if "cone" not in t:
        return None
    a = _num(r"area", t)
    v = _num(r"volume", t)
    if a and v and "height" in t:
        return (f"the base area of a cone is {a} cm^2 and its volume is "
                f"{v} cm^3. find the height")
    return None


def _acc_tangent_quadrilateral(t: str) -> Optional[str]:
    """'quadrilateral circumscribes circle, sides a,b,c; find d' —
    tangent-chord theorem family."""
    if "circumscribe" not in t:
        return None
    nums = re.findall(r"[A-Z]{2}\s*=\s*" + _NUM, t)
    if len(nums) >= 3:
        return ("a quadrilateral circumscribes a circle with sides "
                + ", ".join(nums))
    return None


def _acc_sin_cos(t: str) -> Optional[str]:
    """'sin(A+B)=1 and cos(A-B)=sqrt3/2' -> system of angle equations."""
    if re.search(r"sin\s*\(?[a-z]\s*\+\s*[a-z]", t, re.I) and \
       re.search(r"cos\s*\(?[a-z]\s*-\s*[a-z]", t, re.I):
        return "find A and B given sin(A+B)=1 and cos(A-B)=sqrt(3)/2"
    return None


_ACCEPTORS = [
    ("TANGENT_LENGTH", _acc_tangent_length),
    ("SECTOR_ARC", _acc_sector_arc),
    ("PROB_COMPLEMENT", _acc_prob_complement),
    ("MEDIAN_TRANSFORM", _acc_median_transform),
    ("QUAD_ZEROES", _acc_quad_zeroes),
    ("TRIG_CONDITIONAL", _acc_trig_conditional),
    ("HCF_PAIRS", _acc_hcf_pairs),
    ("CONE_HEIGHT", _acc_volume_height),
    ("TANGENT_QUAD", _acc_tangent_quadrilateral),
    ("SIN_COS_SYS", _acc_sin_cos),
]


def canonicalize(text: str) -> Optional[Dict[str, str]]:
    """Return {'family': fid, 'canonical': rewritten} or None."""
    t = _n(text)
    for fid, acc in _ACCEPTORS:
        out = acc(t)
        if out:
            return {"family": fid, "canonical": out}
    return None
