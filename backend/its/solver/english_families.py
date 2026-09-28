"""english_families.py — deterministic English grammar & literature
families (CBSE/ICSE 6-12): tense conversion, active/passive voice,
direct/indirect narration, error-spotting, sentence transformations
(simple/compound/complex, degree, interchange), determiners and
prepositions gap-fill, question tags, non-finites, subject-verb
agreement, literary devices.  Registered batch-18.

Conventions: identical to the other subject family modules — a TABLE of
(FID, regex, handler) rows scanned by model_english(); handlers build
their result via the standard _res()/_no() helpers copied from the
sibling modules; impossible inputs are gate-refused.  Ground truth: the
authored corpus nodes (closed world); SOLVER_STEP_CONTRACT.md applies to
every family.  This stub ships an empty table so the batch-18
registration lands first; family completion is the owning agent's task.
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


def model_english(text: str) -> ModelResult:
    """Dispatcher stub — scan every English family; first hit wins."""
    norm = text.strip()
    for _fid, pattern, compute in TABLE:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        res = compute(m, norm)
        if res is not None:
            return res
    return _declined()
