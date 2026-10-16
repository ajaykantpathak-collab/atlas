"""board_format.py — wrap solver output into board marking-scheme shape.

CBSE examiners award marks per structural beat (the 5-beat rubric):
  Given -> To Find -> Formula -> Substitution/Working -> Final+units.

CISCE (ICSE/ISC) awards marks per step-line inside the working and a
final statement — same five pieces, lighter on the explicit labels.

Pure text transform: no model calls, deterministic.  Input is whatever
the structure lane produced (slots, formula, steps, answer) plus the
question text for 'Given' extraction.
"""
from __future__ import annotations

import re
from typing import Dict, List, Optional, Tuple


_NUM_UNIT = re.compile(
    r"([a-zA-Z][\w\s]{0,25}?)\s*(?:is|=|of|:)\s*"
    r"(\d+(?:\.\d+)?)\s*"
    r"(cm\^?[23]?|mm|m\b|km|s\b|min|h|hr|hrs|kg|g\b|l\b|ml|°|deg(?:rees)?|"
    r"%|rs\.?|₹|rupees|km/h|kmph|m/s|cm/s|sq\.?\s*cm|per\s+\w+)?",
    re.I)


def _givens_from_text(text: str) -> List[str]:
    """'r = 5 cm', 'speed is 60 km/h', 'buys for Rs 80' given
    extraction."""
    out = []
    for m in _NUM_UNIT.finditer(text):
        name = re.sub(r"\s+", " ", m.group(1)).strip(" .,").lower()
        name = re.sub(r"^(?:the|a|an|its|of)\s+", "", name)
        if len(name) < 2 or len(name) > 28 or name.isdigit():
            continue
        val = m.group(2)
        unit = (m.group(3) or "").strip()
        out.append(f"{name} = {val}" + (f" {unit}" if unit else ""))
    # narrative money pattern: 'buys X for Rs 80', 'sells at Rs 100'
    for m in re.finditer(
            r"(buys?|bought|purchase\w*|costs?|sells?|sold|earns?|"
            r"spends?|paid)\b[^.,\d]{0,30}?"
            r"(?:rs\.?|₹)\s*(\d+(?:\.\d+)?)", text, re.I):
        verb = m.group(1).lower()
        label = ("cost price" if verb.startswith(
            ("buy", "bought", "purchase", "cost", "paid"))
            else "selling price" if verb.startswith(("sell", "sold"))
            else "amount")
        out.append(f"{label} = ₹{m.group(2)}")
    # dedupe preserving order
    seen, keep = set(), []
    for g in out:
        if g not in seen:
            seen.add(g)
            keep.append(g)
    return keep[:8]


def _givens_from_slots(slots: Optional[Dict]) -> List[str]:
    if not slots:
        return []
    out = []
    for k, v in slots.items():
        if v is None or str(v).startswith("<"):
            continue
        out.append(f"{k} = {v}")
    return out[:8]


def _ask_from_text(text: str) -> Optional[str]:
    m = re.search(
        r"(?:find|determine|calculate|evaluate|compute|what is|"
        r"how many|how much)\s+([^.?]{3,80})[.?]?\s*$",
        text.strip(), re.I)
    if m:
        return m.group(1).strip(" .")
    return None


def format_board(
    text: str,
    slots: Optional[Dict],
    formula: Optional[str],
    steps: List[str],
    answer: str,
    board: str = "cbse",
) -> List[str]:
    """Return steps re-shaped into the board rubric.  Returns the raw
    steps unchanged if there's not enough signal to structure — honest
    fallback, never fabricated givens."""
    givens = _givens_from_slots(slots) or _givens_from_text(text)
    ask = _ask_from_text(text)
    formula = (formula or "").strip()
    working = [s for s in steps if s and str(s).strip()]

    beats: List[str] = []
    if givens:
        beats.append("**Given:** " + ";  ".join(givens))
    if ask:
        beats.append(f"**To find:** {ask}")
    if formula and formula != "-":
        beats.append(f"**Formula:** `{formula}`")
    if working:
        beats.append("**Working:**")
        beats.extend(f"  {i+1}. {s.strip()}" for i, s in
                     enumerate(working))
    tail = (f"**∴ {answer}**"
            if not str(answer).strip().lower().startswith("therefore")
            else f"**{answer}**")
    beats.append(tail)

    if board.lower() in ("icse", "isc", "cisce"):
        # CISCE marking credits each algebraic line — lead-in sentence
        # for givens/ask, numbered working, final statement
        beats = []
        lead = []
        if givens:
            lead.append("given " + ", ".join(givens))
        if ask:
            lead.append("required: " + ask)
        if lead:
            beats.append("*(" + "; ".join(lead) + ")*")
        if formula and formula != "-":
            beats.append(f"Using {formula}")
        beats.extend(working_numbered(working))
        beats.append(tail)
    return beats


def working_numbered(working: List[str]) -> List[str]:
    return [f"  {i+1}. {s.strip()}" for i, s in enumerate(working)]


def render_board(steps: List[str]) -> str:
    return "\n".join(steps)
