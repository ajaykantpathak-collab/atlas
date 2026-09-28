"""enhanced_nodes.py -- TEACHING CONTENT API router.

Serves the parsed enhanced-node pedagogy corpus (~8.9k atomic teaching
nodes with DEFINITION / COGNITIVE_LEVEL / MASTERY_CRITERIA /
SCOPE_BOUNDARY / WALKTHROUGH / DIAGNOSTIC_Q&A sections) produced by
``backend.services.enhanced_nodes``.

Endpoints (all GET, read-only, no DB):
    /api/nodes/node?node_id=...            full teaching node
    /api/nodes/by-class-subject?class=&subject=   node list (summaries)
    /api/nodes/search?q=&limit=&class=&subject=   scored full-text search
    /api/nodes/stats                       corpus + load statistics

Deterministic: parsing/indexing is regex + filesystem only.
"""
from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from backend.services.enhanced_nodes import (
    EnhancedNodesIndex,
    load_index,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/nodes",
                   tags=["enhanced-teaching-nodes"])


def get_index() -> EnhancedNodesIndex:
    """Index accessor (module-level so tests can monkeypatch it)."""
    try:
        return load_index()
    except RuntimeError as exc:
        raise HTTPException(503, str(exc))


# ── sims-for-node ────────────────────────────────────────────────────────
# The learn page asks "which sims teach this node?" — resolved from
# frontend/components/sims_v2/SIM_INDEX.json (3,018 sims, each carrying
# its node-id list). Served from the BACKEND on purpose: the Next dev/
# prod proxy shadows dynamic app/api routes, so a Next-side handler can
# never execute under the /api/* rewrite.
import json
import os
from functools import lru_cache

_SIM_INDEX_CANDIDATES = [
    # in-image copy (backend/_cache/sim_index.json — synced from
    # frontend/components/sims_v2/SIM_INDEX.json)
    os.path.join(os.path.dirname(os.path.abspath(__file__)),
                 "..", "_cache", "sim_index.json"),
    # local dev fallback: read the frontend registry in place
    os.path.join(os.path.dirname(os.path.abspath(__file__)),
                 "..", "..", "frontend", "components", "sims_v2",
                 "SIM_INDEX.json"),
]
_SIM_INDEX_PATH = next((p for p in _SIM_INDEX_CANDIDATES
                        if os.path.isfile(p)), _SIM_INDEX_CANDIDATES[0])


@lru_cache(maxsize=1)
def _node_sim_index() -> dict:
    with open(_SIM_INDEX_PATH, encoding="utf-8") as fh:
        sim_index = json.load(fh)
    out: dict = {}
    for sim_id, meta in sim_index.items():
        entry = {"id": sim_id, "title": meta.get("t", sim_id),
                 "classLevel": meta.get("c"),
                 "generated": "_gen" in sim_id or sim_id.startswith("gen_")}
        for nid in meta.get("n") or []:
            out.setdefault(nid, []).append(entry)
    return out


@router.get("/{node_id}/sims")
async def sims_for_node(node_id: str):
    """Sims whose nodeIds include this node (learn-page launcher)."""
    return _node_sim_index().get(node_id, [])


@router.get("/node")
async def get_node(node_id: str = Query(..., min_length=1,
                                        description="e.g. c10_bio_cbse_01_001")):
    """Return the full teaching node (definition, walkthrough,
    mastery criteria, scope boundary, diagnostics).

    Case-study companion ids (``..._comp``, kind ``case_companion``)
    resolve too -- they carry parent_node_id + seed questions instead
    of the teaching sections."""
    idx = get_index()
    node = idx.get(node_id)
    if node is None:
        raise HTTPException(404, f"unknown node_id: {node_id!r}")
    from backend.services.enhanced_nodes import _derive_title
    return {**node, "title": _derive_title(node)}


@router.get("/by-class-subject")
async def by_class_subject(
    cls: int = Query(..., alias="class", ge=1, le=14),
    subject: str = Query(..., min_length=1, description="e.g. bio, math"),
    limit: int = Query(200, ge=1, le=1000),
    offset: int = Query(0, ge=0),
):
    """List teaching nodes for one class + subject (summaries)."""
    idx = get_index()
    all_nodes = idx.by_class_subject(cls, subject)
    if not all_nodes:
        raise HTTPException(
            404, f"no teaching nodes for class={cls} subject={subject!r}")
    window = all_nodes[offset:offset + limit]
    return {
        "class": cls,
        "subject": subject,
        "total": len(all_nodes),
        "count": len(window),
        "offset": offset,
        "nodes": window,
    }


@router.get("/graph")
async def graph(
    cls: Optional[int] = Query(None, alias="class", ge=1, le=14),
    class_level: Optional[int] = Query(None, ge=1, le=14),
    subject: Optional[str] = Query(None),
    limit: int = Query(300, ge=1, le=1000),
):
    """Nodes + prereq links for the knowledge-graph explorer."""
    idx = get_index()
    effective_cls = cls if cls is not None else class_level
    return idx.graph(cls=effective_cls, subject=subject, limit=limit)


@router.get("/search")
async def search(
    q: str = Query(..., min_length=1, description="free-text query"),
    limit: int = Query(20, ge=1, le=100),
    cls: Optional[int] = Query(None, alias="class", ge=1, le=14),
    subject: Optional[str] = Query(None, min_length=1),
):
    """Scored full-text search over node ids, definitions and
    teaching bodies (walkthrough / mastery / diagnostics)."""
    idx = get_index()
    results = idx.search(q, limit=limit, cls=cls, subject=subject)
    return {
        "q": q,
        "count": len(results),
        "results": results,
    }


@router.get("/stats")
async def stats():
    """Corpus statistics: parsed/skipped files, classes, subjects.

    ``nodes`` counts teaching cards only; case-study companions
    (``*_comp.md``, kind ``case_companion``) are reported separately so
    the teaching count is never inflated.
    """
    idx = get_index()
    return {
        "nodes": idx.node_count(),
        "companions": idx.companion_count(),
        "classes": idx.classes(),
        "subjects": idx.subjects(),
        "per_class": idx.per_class_counts(),
        "per_class_subject": idx.per_class_subject_counts(),
        "load_stats": idx.stats,
    }
