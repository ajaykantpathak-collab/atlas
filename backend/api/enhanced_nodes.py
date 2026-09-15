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
    return node


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
        "load_stats": idx.stats,
    }
