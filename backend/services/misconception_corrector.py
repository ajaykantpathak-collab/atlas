"""misconception_corrector.py — C3: close the remediation loop.

The practice submit flow already names the node's common_misconception and
first on_failure step on a wrong answer.  What it never did was *demonstrate
and re-check*:  this module composes the two missing pieces of the loop from
the compq bank (built from the corpus's own pedagogy):

  worked_example  — the node's first authored worked example (Problem →
                    Solution), the "see it done" demonstration for exactly
                    this concept
  follow_up       — the next diagnostic question on the same node (answer
                    deliberately WITHHELD — the student must clear it to
                    close the loop; the misconception text tells them what
                    to watch for)

Every string passes the bank's node-id scrubber before it leaves.  Honest
Nones everywhere: a node without diagnostics or examples simply omits the
section rather than guessing.
"""

from __future__ import annotations

import re
from typing import Any, Dict, Optional

from backend.services.compq_bank import get_bank, scrub_node_ids

_NODE_LIKE = re.compile(r"\bc\d{1,2}_[a-z0-9]+(?:_[a-z0-9]+)*_\d{2}_\d{3}\b")


def is_node_like(node_id: Optional[str]) -> bool:
    return bool(node_id) and bool(_NODE_LIKE.fullmatch(str(node_id).strip()))


def _first(d: Dict[str, Any], *keys: str) -> Any:
    for k in keys:
        v = d.get(k)
        if v:
            return v
    return None


def correction_for(node_id: Optional[str], question_text: str) -> Dict[str, Any]:
    """Compose the C3 correction payload for a WRONG answer.

    Returns {"matched_misconception", "worked_example", "follow_up"} — any
    member may be None when the corpus has nothing honest to serve.
    """
    out: Dict[str, Any] = {"matched_misconception": None,
                           "worked_example": None, "follow_up": None}
    if not is_node_like(node_id):
        return out
    try:
        bank = get_bank()
        match = bank.match_diagnostic(str(node_id).strip(), question_text or "")
        examples = bank.worked_examples_for(str(node_id).strip())
        diags = bank.diagnostics_for(str(node_id).strip())
    except Exception:
        return out

    if match:
        mis = _first(match, "misconception", "misconception_if_wrong", "a")
        if mis:
            out["matched_misconception"] = scrub_node_ids(str(mis))

    if examples:
        ex = examples[0]
        if isinstance(ex, str):
            out["worked_example"] = {"text": scrub_node_ids(ex)}
        elif isinstance(ex, dict):
            out["worked_example"] = {
                k: scrub_node_ids(str(v)) if isinstance(v, str) else v
                for k, v in ex.items()
            }

    matched_q = _first(match or {}, "question", "q")
    for d in diags:
        if not isinstance(d, dict):
            continue
        q = _first(d, "question", "q")
        if not q or (matched_q and _first(d, "question", "q") == matched_q):
            continue
        follow_q = scrub_node_ids(str(q))
        mis = _first(d, "misconception", "misconception_if_wrong")
        out["follow_up"] = {
            "question": follow_q,
            "watch_for": scrub_node_ids(str(mis)) if mis else None,
            # answer intentionally withheld — the loop closes on re-attempt
        }
        break
    return out
