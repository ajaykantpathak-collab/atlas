"""socsci_families.py — deterministic Social Science numeric-core families
(CBSE/ICSE 6-12): Geography (time-zone/local-time arithmetic, population
vital statistics CBR/CDR/growth-rate/doubling-time/density, climate-graph
reading from corpus tables, map-scale distance conversion), Civics
(first-past-the-post seat-vs-vote arithmetic, majority/coalition counting),
History (chronology intervals between corpus-dated events, timeline
ordering validation).  Registered batch-19.

Conventions: identical to the other subject family modules — a TABLE of
(FID, regex, handler) rows scanned by model_socsci(); ground truth is the
authored corpus (dates, tables, constitutional numbers) — nothing is
invented; SOLVER_STEP_CONTRACT.md applies to every family.  This stub
ships an empty table so the batch-19 registration lands first; family
completion is the owning agent's task.
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


def model_socsci(text: str) -> ModelResult:
    """Dispatcher stub — scan every social-science family; first hit wins."""
    norm = text.strip()
    for _fid, pattern, compute in TABLE:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        res = compute(m, norm)
        if res is not None:
            return res
    return _declined()
