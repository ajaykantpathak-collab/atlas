"""hindi_families.py — deterministic Hindi vyaakaran families
(CBSE/ICSE 6-12): sandhi (viichchheda + bhed), samas (viichchheda +
bhed), alankaar classification (anupraasa, upama, roopak, utprekshaa...),
kaal conversion, vaachya conversion, shabd-roop forms, muhaavare/lokoktiyan
meaning-match, upasargh-pratyaya, vaiyakarani shriArthak pairs.
Registered batch-18.

Conventions: identical to the other subject family modules — a TABLE of
(FID, regex, handler) rows scanned by model_hindi(); patterns operate on
raw Devanagari (handle Unicode word boundaries explicitly, \\b does not
work on Devanagari).  Ground truth: the authored corpus nodes (closed
world); SOLVER_STEP_CONTRACT.md applies to every family (steps stay in
English so the presentation layer can render them consistently, question
terms quoted in Devanagari).  This stub ships an empty table so the
batch-18 registration lands first; family completion is the owning
agent's task.
"""
from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

TABLE: List[Tuple[str, str, Any]] = []


def _declined() -> ModelResult:
    """Honest no-match — the dispatch chain checks `matched`, never None."""
    return ModelResult(structure="NO_MATCH", matched=False, confidence=0.0,
                       quantities={}, governing_equation="",
                       final_answer=None, numeric_answer=None, steps=[],
                       note="")


def model_hindi(text: str) -> ModelResult:
    """Dispatcher stub — scan every Hindi family; first hit wins."""
    norm = text.strip()
    for _fid, pattern, compute in TABLE:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        res = compute(m, norm)
        if res is not None:
            return res
    return _declined()
