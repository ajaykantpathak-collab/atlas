"""relation_binder.py -- typed relation schemas + signal lexicons.

THE CORE FIX for phrasing generalization: relations declare typed
slots, a linear solve (any slot can be the unknown), and per-slot
SIGNAL LEXICONS (data, not code).  The binder:

    1. extracts typed money quantities with spans
    2. detects the ASK: the slot whose phrase occurs LAST in the text
       (questions end with the ask)
    3. binds every non-ask slot: signal phrase hit -> nearest untaken
       quantity; optional slots default to 0
    4. solves the relation for the ask; plausibility gates apply

Reversed questions (given closing, find profit) come free from the
linear solve; new phrasings are lexicon entries, not code.
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.answer_pipeline import (
    AuditTrail, GUIDED, PipelineResult, VERIFIED)

_RS = r"(?:rs\.?|inr|" + chr(8377) + r")?"
_MONEY_RE = re.compile(
    _RS + r"\s*(-?\d[\d,]*(?:\.\d+)?)\s*(?:crore|lakhs?|lakh)?", re.I)


def _money_quantities(text: str) -> List[Tuple[float, int, int]]:
    out = []
    for m in _MONEY_RE.finditer(text):
        val = float(m.group(1).replace(",", ""))
        sc = m.group(0).lower()
        if "crore" in sc:
            val *= 10_000_000
        elif "lakh" in sc:
            val *= 100_000
        out.append((val, m.start(0), m.end(0)))
    return out


RELATIONS = [
    {
        "id": "closing_capital",
        "asks": {
            "closing": [r"closing\s+capital", r"capital\s+at\s+the\s+end"],
            "profit": [r"profit\s+earned", r"profit\s+(?:made|during)",
                       r"\bprofit\b", r"earned"],
            "drawings": [r"find\s+(?:the\s+)?drawings?",
                         r"how\s+much\s+(?:was\s+)?withdrawn"],
            "opening": [r"opening\s+capital"],
        },
        "signals": {
            "opening": [r"opening\s+capital", r"started\s+a\s+business\s+with"],
            "closing": [r"closing\s+capital",
                        r"capital\s+at\s+the\s+end"],
            "profit": [r"made\s+a\s+profit", r"profit\s+of\s*$",
                       r"\bprofit\b", r"earned\s+a?\s*profit"],
            "drawings": [r"withdrew", r"\bdrawings?\b"],
            "addcap": [r"introduced\s+capital"],
        },
        "optional": ["drawings", "addcap"],
        "solve": lambda v, target: (
            (v["opening"] + v["profit"] - v.get("drawings", 0)
             + v.get("addcap", 0)) if target == "closing"
            else (v["closing"] - v["opening"] - v.get("addcap", 0)
                  + v.get("drawings", 0)) if target == "profit"
            else (v["closing"] - v["opening"] - v.get("addcap", 0)
                  + v.get("profit", 0)) if target == "drawings"
            else (v["closing"] - v["profit"] + v.get("drawings", 0)
                  - v.get("addcap", 0))),
    },
    {
        "id": "roi",
        "asks": {
            "roi": [r"return\s+on\s+investment", r"\broi\b"],
            "ebit": [r"find\s+(?:the\s+)?EBIT"],
            "cap": [r"find\s+(?:the\s+)?capital\s+employed"],
        },
        "signals": {
            "ebit": [r"EBIT"],
            "cap": [r"capital\s+employed"],
            "roi": [r"return\s+on\s+investment"],
        },
        "optional": [],
        "solve": lambda v, target: (
            (v["ebit"] / v["cap"] * 100) if target == "roi"
            else (v["roi"] / 100 * v["cap"]) if target == "ebit"
            else (v["ebit"] / (v["roi"] / 100))),
    },
]


def _bind(text: str, relation: Dict
          ) -> Optional[Tuple[str, Dict[str, float], int]]:
    low = text.lower()
    quantities = _money_quantities(text)
    if not quantities:
        return None

    # ask = slot whose phrase occurs LAST in the text (questions end
    # with the ask); ties -> the later phrase wins
    ask, ask_pos = None, -1
    for slot, phrases in relation["asks"].items():
        for ph in phrases:
            m = re.search(ph, low, re.I)
            if m and m.start() > ask_pos:
                ask, ask_pos = slot, m.start()
    if ask is None:
        return None

    values: Dict[str, float] = {}
    taken: set = set()
    signals_hit = 0
    # sentence spans: a number binds only to a signal in its own
    # sentence (falling back to the whole text when the sentence has
    # no untaken number).  Cross-clause nearest-number binding shipped
    # wrong values (capital employed vs EBIT swap).
    sentences: List[Tuple[int, int]] = []
    for sm in re.finditer(r"[^.!?]+", low):
        sentences.append((sm.start(), sm.end()))

    def sentence_of(pos: int) -> Tuple[int, int]:
        for s, e in sentences:
            if s <= pos < e:
                return (s, e)
        return (0, len(low))

    for slot, phrases in relation["signals"].items():
        if slot == ask:
            continue
        hit = None
        for ph in phrases:
            m = re.search(ph, low, re.I)
            if m:
                hit = (m.start(), m.end())
                break
        if hit is None:
            if slot in relation["optional"]:
                values[slot] = 0.0
            continue
        sig_mid = (hit[0] + hit[1]) / 2

        def nearest(lo: int, hi: int):
            best, best_d = None, None
            for idx, (val, s, e) in enumerate(quantities):
                if idx in taken:
                    continue
                mid = (s + e) / 2
                if not (lo <= mid < hi):
                    continue
                d = abs(mid - sig_mid)
                if best_d is None or d < best_d:
                    best, best_d = (idx, val), d
            return best

        pick = nearest(*sentence_of(hit[0])) or nearest(0, len(low))
        if pick is None:
            if slot in relation["optional"]:
                values[slot] = 0.0
            continue
        taken.add(pick[0])
        values[slot] = pick[1]
        signals_hit += 1

    needed = [s for s in relation["signals"] if s != ask]
    missing = [s for s in needed if s not in values]
    if missing:
        return None
    try:
        value = relation["solve"](values, ask)
    except Exception:
        return None
    if value is None or not isinstance(value, (int, float)):
        return None
    if abs(value) >= 1e15:
        return None
    return (ask, values, signals_hit)


def bind_variables(text: str, audit: AuditTrail) -> Optional[PipelineResult]:
    """Try every relation; arbitrate by binding completeness + hits."""
    candidates = []
    for relation in RELATIONS:
        out = _bind(text, relation)
        if out is None:
            continue
        ask, values, hits = out
        try:
            value = relation["solve"](values, ask)
        except Exception:
            continue
        if value is None or not isinstance(value, (int, float)):
            continue
        if abs(value) >= 1e15:
            continue
        audit.route.append(f"relation:{relation['id']}:{ask}")
        audit.gates_passed.append("typed_binding")
        audit.readings_considered = len(candidates) + 1
        steps = [f"{slot} = {val:,.0f}"
                 for slot, val in sorted(values.items())]
        steps.append(f"{ask} = {value:,.0f} (relation {relation['id']}, "
                     f"{hits} signal matches)")
        candidates.append((hits, PipelineResult(
            label=VERIFIED, answer=f"{value:,.0f}", numeric=value,
            steps=steps, audit=audit)))
    if not candidates:
        return None
    candidates.sort(key=lambda c: -c[0])
    if len(candidates) > 1 and candidates[0][0] == candidates[1][0]:
        candidates[0][1].socratic = {
            "ambiguous_relations": [c for c in
                                    (id for id, _ in candidates)]}
    return candidates[0][1]
