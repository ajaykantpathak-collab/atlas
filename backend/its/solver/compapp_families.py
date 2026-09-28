"""compapp_families.py — deterministic Computer Applications / Computer
Studies families (ICSE 6-10, CBSE 6-10 IT): number-system conversions
(binary/octal/decimal/hex, both directions + arithmetic in base),
binary-weight/MSB-LSB questions, Java output prediction for taught
constructs (loops, conditionals, increment/decrement, type casting,
operator precedence — order-of-evaluation maps), boolean algebra and
logic gates (truth-table evaluation, De Morgan), storage-unit
conversions, HTML/CSS tag-property matching from the taught set.
Registered batch-18.

Conventions: identical to the other subject family modules — a TABLE of
(FID, regex, handler) rows scanned by model_compapp(); handlers return
deterministic, reproducible outputs only (no invented code semantics
outside the taught corpus subset).  Ground truth: the authored corpus
nodes (closed world — see also the sandbox E8 code-node endpoint for the
misconception side); SOLVER_STEP_CONTRACT.md applies to every family.
This stub ships an empty table so the batch-18 registration lands
first; family completion is the owning agent's task.
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


def model_compapp(text: str) -> ModelResult:
    """Dispatcher stub — scan every computer-applications family."""
    norm = text.strip()
    for _fid, pattern, compute in TABLE:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        res = compute(m, norm)
        if res is not None:
            return res
    return _declined()
