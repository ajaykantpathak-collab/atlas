"""repertoire.py -- Full-repertoire attachment for solved doubts.

Every solved doubt (text /solve, photo /solve-image, spoken
/solve-voice) should return not just the verified answer but the
node's whole teaching repertoire: the hand-drawn doodle card, the
labelled diagram, and the interactive sim.  This module resolves the
node identity from the solve result and looks each asset up in the
generated repertoire index (its/solver/repertoire_index.json, built by
backend/tools/build_repertoire_index.py from the canonical frontend
asset maps).

ZERO-GUESS CONTRACT (wrong-subject repertoire is worse than none):
  * Asset lookups are EXACT node-id index lookups -- the subject never
    enters the resolution, so a cross-subject attachment is impossible
    by construction.
  * A solve with no node link returns honest nulls (semantic text->node
    matching is a v2 concern and stays out of this path).
  * The index lists a node only when the canonical frontend map lists
    it (and, for doodle cards, the .webp file exists on its shelf), so
    the URLs built here are served files, never 404 guesses.

This module is intentionally side-effect-free and dependency-free:
it never touches the answer pipeline's gates, labels, or payloads.
"""

from __future__ import annotations

import json
import logging
import os
import re
from pathlib import Path
from typing import Any, Dict, Optional

_log = logging.getLogger("solver.repertoire")

_INDEX_PATH = Path(__file__).resolve().parent / "repertoire_index.json"

# Corpus node-id grammar: c{class}_{subject...}_{chapter}_{nnn}
# (c10_bio_cbse_01_003, c9_hin_ga_cbse_02_004, c11_acc_isc_03_001, ...)
_NODE_ID_RE = re.compile(r"\bc(\d{1,2})_[a-z0-9]+(?:_[a-z0-9]+)*\b")

# A node token must look like a REAL corpus id: class + subject + chapter
# + serial.  Bare "c6_"-style fragments never resolve.
_PLAUSIBLE_NODE_RE = re.compile(
    r"^c\d{1,2}_[a-z0-9]+(?:_[a-z0-9]+)*_\d{1,3}(?:_\d{1,4})?$")

_index: Optional[Dict[str, Dict[str, Any]]] = None


def _load_index() -> Dict[str, Dict[str, Any]]:
    """Lazy singleton load of the generated snapshot.  A missing or
    corrupt index degrades to empty maps -- repertoire attaches honest
    nulls and the solve response is otherwise untouched."""
    global _index
    if _index is not None:
        return _index
    path = Path(os.environ.get("REPERTOIRE_INDEX_PATH") or _INDEX_PATH)
    try:
        doc = json.loads(path.read_text(encoding="utf-8"))
        _index = {
            "doodle": doc.get("doodle") or {},
            "diagrams": doc.get("diagrams") or {},
            "sims": doc.get("sims") or {},
        }
    except Exception as exc:  # missing file, bad JSON, permissions
        _log.warning("repertoire index unavailable (%s) -- attaching nulls", exc)
        _index = {"doodle": {}, "diagrams": {}, "sims": {}}
    return _index


def reload_repertoire_index() -> None:
    """Drop the cached snapshot (tests / after a rebuild)."""
    global _index
    _index = None


def _known_node(node_id: str) -> bool:
    idx = _load_index()
    return (node_id in idx["doodle"] or node_id in idx["diagrams"]
            or node_id in idx["sims"])


def _plausible(node_id: str) -> bool:
    return bool(_PLAUSIBLE_NODE_RE.match(node_id or ""))


def resolve_node_id(solve_result: Any = None,
                    node_id: Optional[str] = None) -> Optional[str]:
    """Resolve the corpus node a solved question belongs to.

    Priority (first hit wins):
      1. An explicit binding passed by the caller -- the practice flows
         know the bank question's source node (board_questions rows
         carry node_tags; lesson-page doubts know /learn/<id>).
      2. A `node_id`/`node` field on the solve result (future lanes may
         stamp it).
      3. A node-shaped token in the audit trail (route entries, anchor,
         gates) -- validated against the index so stray tokens that are
         not real corpus ids never resolve.

    Returns a single validated node id or None.  Never guesses.
    """
    cand = (node_id or "").strip()
    # An explicit binding is trusted when it looks like a corpus id OR
    # the asset indexes actually know it (grammar drift can never lose
    # a real binding).
    if _plausible(cand) or _known_node(cand):
        return cand

    if isinstance(solve_result, dict):
        for key in ("node_id", "node"):
            cand = str(solve_result.get(key) or "").strip()
            if _plausible(cand) or _known_node(cand):
                return cand

        audit = solve_result.get("audit")
        if isinstance(audit, dict):
            texts: list = []
            anchor = audit.get("anchor")
            if isinstance(anchor, str):
                texts.append(anchor)
            for group in ("route", "gates_passed"):
                val = audit.get(group)
                if isinstance(val, list):
                    texts.extend(str(v) for v in val)
            if isinstance(audit.get("node_id"), str):
                texts.append(audit["node_id"])
            for text in texts:
                for m in _NODE_ID_RE.finditer(text):
                    tok = m.group(0)
                    if _plausible(tok) and _known_node(tok):
                        return tok
    return None


def repertoire_for_node(node_id: Optional[str]) -> Dict[str, Optional[str]]:
    """Index lookups for one node -> served URLs / sim id.

    Every field is filled ONLY from the generated index; a node absent
    from an asset map gets null for that asset -- never a nearest-guess
    from another subject, class, or chapter.
    """
    nulls: Dict[str, Optional[str]] = {"node_id": None, "doodle": None,
                                       "diagram": None, "sim": None,
                                       "sim_title": None}
    if not node_id or not (_plausible(node_id) or _known_node(node_id)):
        return nulls
    idx = _load_index()

    out: Dict[str, Optional[str]] = {"node_id": node_id}

    shelf = idx["doodle"].get(node_id)
    out["doodle"] = (f"/doodle_cards/class{shelf}/{node_id}.webp"
                     if shelf else None)

    diagram_file = idx["diagrams"].get(node_id)
    out["diagram"] = f"/diagrams/{diagram_file}" if diagram_file else None

    sim = idx["sims"].get(node_id)
    if isinstance(sim, dict) and sim.get("id"):
        out["sim"] = sim["id"]
        out["sim_title"] = sim.get("title") or None
    else:
        out["sim"] = None
        out["sim_title"] = None
    return out


def attach_repertoire(solve_result: Any = None,
                      node_id: Optional[str] = None) -> Dict[str, Optional[str]]:
    """The one call every solve endpoint makes before returning.

    Resolves the node from the explicit binding or the solve result's
    own audit trail, then attaches the node's doodle card, diagram and
    sim.  No node link, no repertoire: every field is an honest null.
    Never raises -- a repertoire failure must never break a solve.
    """
    try:
        return repertoire_for_node(
            resolve_node_id(solve_result, node_id=node_id))
    except Exception:  # pragma: no cover - defensive
        _log.exception("repertoire attachment failed -- attaching nulls")
        return {"node_id": None, "doodle": None, "diagram": None,
                "sim": None, "sim_title": None}


__all__ = ["attach_repertoire", "repertoire_for_node", "resolve_node_id",
           "reload_repertoire_index"]
