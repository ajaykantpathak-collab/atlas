"""readback.py — the student-corrected read-back path, stateless.

The tutor chat (tutor_service Layer 1.4) stashes `pending_understood`
in session meta and patches corrections into the question text before
re-running the pipeline.  The single-shot /solve surfaces (doubt page,
voice solve) have no session — the client echoes `socratic.understood`
back with the student's edits and this module does the same patch:
old slot value -> new value inside the original question text, then a
full `answer()` re-run (badge gate + PAL cross-check included).

Correction semantics:
  * edits are {role: new_value}; each role's OLD value comes from the
    echoed `slots`/`givens` map — a role not present there is ignored
  * an edit equal to the bound value is a no-op (skipped, not a patch
    failure)
  * if every requested edit fails to land, returns None — the caller
    refuses rather than silently re-answering the original question
"""

from __future__ import annotations

import contextvars
import logging
import re
from typing import Any, Dict, Optional

logger = logging.getLogger(__name__)

# Request-scoped "the student confirmed the read-back card" flag.
# Propagates into the solve pool because solve_isolation carries a
# copy_context().  When set, the strict-unverified gate at answer()
# lets the deterministic result ship: the PARSE is human-verified by
# the card confirm, and the formula is authored deterministic code —
# what remains is exactly what registered verifiers/PAL also check,
# and those still run and can still withhold on disagreement.
CONFIRMED: contextvars.ContextVar[bool] = contextvars.ContextVar(
    "readback_confirmed", default=False)


def _flat_value(v: Any) -> Optional[str]:
    """Slot values arrive as floats or {'value': n, 'unit': 'cm'} dicts;
    the patch needs the bare numeric string."""
    if isinstance(v, dict):
        v = v.get("value")
    if v is None:
        return None
    return str(v)


def apply_corrections(text: str, slots: Dict[str, Any],
                      edits: Dict[str, Any]) -> Optional[str]:
    """Patch `edits` into `text` by replacing each role's bound literal.
    Returns the patched text, or None when nothing changed."""
    text2 = text or ""
    for role, new_v in (edits or {}).items():
        old_raw = _flat_value((slots or {}).get(role))
        if old_raw is None:
            continue
        old_m = re.search(r"-?\d+(?:\.\d+)?", old_raw)
        if not old_m:
            continue
        old_num = old_m.group(0)
        # edit_map carries every slot at final value — unchanged
        # entries would patch the same string and false-refuse
        try:
            if abs(float(new_v) - float(old_num)) < 1e-9:
                continue
        except (TypeError, ValueError):
            pass
        # slots store floats — '64.0' never matches the text's '64';
        # try the int form first, then the literal form
        variants = []
        try:
            f = float(old_num)
            variants.append(f"{f:g}" if f == int(f) else old_num)
        except ValueError:
            pass
        variants.append(old_num)
        new_s = (f"{float(new_v):g}"
                 if isinstance(new_v, (int, float)) else str(new_v))
        done = False
        for cand in variants:
            patched = re.sub(rf"(?<![\d.]){re.escape(cand)}(?![\d.])",
                             new_s, text2, count=1)
            if patched != text2:
                text2 = patched
                done = True
                break
        if not done:
            return None
    # unchanged edits resolve to the original text — a pure-confirm is a
    # plain re-solve, not a refusal
    return text2


def unused_numbers(text: str, givens: Dict[str, Any]) -> list:
    """Numbers present in the question that the parse never bound —
    shown on the card so the student can flag a mis-read."""
    bound = set()
    for v in (givens or {}).values():
        raw = _flat_value(v)
        if raw is None:
            continue
        try:
            bound.add(round(float(re.search(
                r"-?\d+(?:\.\d+)?", raw).group(0)), 6))
        except (AttributeError, TypeError, ValueError):
            continue
    out = []
    for x in dict.fromkeys(
            re.findall(r"(?<![\w.])\d+(?:\.\d+)?(?![\w.])", text or "")):
        try:
            if round(float(x), 6) not in bound:
                out.append(x)
        except ValueError:
            pass
    return out[:8]


_UNIT = (r"cm2|cm3|sq\.?\s*cm|cu\.?\s*cm|cm|mm|km|kg|g|l|ml|"
         r"deg(?:rees?)?|°|%|rs\.?|₹|km/?h|m/s|m\b")

# nouns that name a quantity role — for verb-less phrasing
# ('radius 7 cm', 'side 9') where the generic verb pattern can't anchor
_ROLE_NOUNS = (
    r"radius|radii|height|length|breadth|width|side|diameter|edge|"
    r"angle|rate|time|principal|speed|distance|volume|area|"
    r"perimeter|circumference|mean|median|mode|probability|cost|"
    r"price|mass|weight|capacity|thickness|slant|base\b|sum|"
    r"difference|interest|selling|list price|discount|gain|loss|"
    r"percentage|number of|total|count")

_STOP_ROLES = {
    "find", "given", "if", "that", "such", "when", "the", "a", "an",
    "of", "with", "having", "whose", "what", "is", "are", "and", "or",
    "for", "to", "in", "on", "at", "by", "be", "each", "every", "all",
    "any", "it", "its", "this", "these", "those", "which", "who",
    "calculate", "determine", "evaluate", "compute", "prove", "show",
    "let", "suppose", "consider", "given that", "such that",
    "where", "how", "many", "much", "value", "values", "result",
}


def extract_givens(text: str) -> Dict[str, Dict[str, Any]]:
    """Generic read-back givens for full_text families that bind no
    declared slots — pull 'role N unit' triples from the raw question
    so the card always displays what was read."""
    t = (text or "").lower()
    out: Dict[str, Dict[str, Any]] = {}

    def _put(role: str, num: str, unit: Any):
        # strip leading filler AND trailing qualifiers so the card
        # shows 'height' not 'and height', 'surface area' not
        # 'surface area of cylinder'
        prev = None
        while prev != role:
            prev = role
            role = re.sub(
                r"^(?:the|a|an|of|with|having|its|whose|and|but|for|"
                r"or|where|at|on|in)\s+", "", role).strip()
            role = re.sub(r"\s+(?:of|in|for|at|on)\s+\S.*$", "",
                          role).strip()
        if (not role or len(role) > 28 or role in _STOP_ROLES
                or role in out):
            return
        try:
            v = float(num)
        except (TypeError, ValueError):
            return
        out[role] = {"value": v, "unit": (unit or "").strip()}

    # named quantities: 'radius is 7 cm', 'height = 10', 'pKa 4.75'
    for m in re.finditer(
            r"([a-z][a-z .\-]{0,24}?)\s*(?:is|=|:|was|are|has|"
            r"measure\w*|stands?\s+at)\s+(-?\d+(?:\.\d+)?)\s*"
            r"(" + _UNIT + r")?", t):
        _put(m.group(1), m.group(2), m.group(3))

    # verb-less role nouns: 'radius 7 cm', 'side 9'
    for m in re.finditer(
            r"\b(" + _ROLE_NOUNS + r")\s+(-?\d+(?:\.\d+)?)\s*"
            r"(" + _UNIT + r")?", t):
        _put(m.group(1), m.group(2), m.group(3))

    # rupee amounts are unit-first: 'Rs 45', '₹30'
    for m in re.finditer(r"\b(?:rs\.?|₹)\s*(-?\d+(?:\.\d+)?)", t):
        _put("amount", m.group(1), "rs")

    # counting phrasing: 'thrown 6 times', '3 coins'
    for m in re.finditer(
            r"(-?\d+(?:\.\d+)?)\s*(times|coins|dice|balls|tosses|"
            r"terms|digits|numbers|items|people|students|boys|girls)",
            t):
        _put("number of " + m.group(2), m.group(1), m.group(2))

    # unlabeled numbers carrying a unit: '7 cm' -> 'value 1'
    n_val = 0
    for m in re.finditer(r"(-?\d+(?:\.\d+)?)\s*(" + _UNIT + r")", t):
        if any(abs(g["value"] - float(m.group(1))) < 1e-9
               for g in out.values()):
            continue
        n_val += 1
        out[f"value {n_val}"] = {"value": float(m.group(1)),
                                 "unit": m.group(2).strip()}

    # last resort: ANY number never bound — the card exists so the
    # student can correct a mis-read, and a bare 'value' row is far
    # better than no card on a die/probability/money question
    for m in re.finditer(r"(?<![\w.])(-?\d+(?:\.\d+)?)(?![\w.])", t):
        fv = float(m.group(1))
        if any(abs(g["value"] - fv) < 1e-9 for g in out.values()):
            continue
        n_val += 1
        out[f"value {n_val}"] = {"value": fv, "unit": ""}
    return out


def ask_hint(text: str) -> str:
    """Rough 'what we think you want' string for the card when the
    lane produced none."""
    m = re.search(
        r"(?:find|calculate|determine|evaluate|compute|"
        r"what\s+is|how\s+much|how\s+many)\s+([^.?;]{3,60})",
        (text or "").lower())
    if not m:
        return ""
    return ("find " + m.group(1).strip().rstrip(".,;:"))[:64]
