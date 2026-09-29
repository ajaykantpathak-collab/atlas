"""Graph router — exposes Neo4j knowledge graph queries to the frontend.

Endpoints:
  GET  /api/graph/stats              — overall graph statistics
  GET  /api/graph/node/{node_id}     — single node details
  GET  /api/graph/class/{class_level} — all nodes for a class
  GET  /api/graph/search             — full-text search
  GET  /api/graph/prerequisites/{node_id} — recursive prerequisites
  GET  /api/graph/unlocks/{node_id}  — recursive forward unlocks
  POST /api/graph/gaps               — gap analysis (find missing prereqs)
  POST /api/graph/path               — adaptive learning path
  GET  /api/graph/visualize          — nodes + edges for 3D visualization
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel

import logging

from backend.deps import get_current_user_optional
from backend.models.user import User
from backend.services.graph_service import GraphService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/graph", tags=["graph"])


# --------------------------------------------------------------------------- #
# Request models
# --------------------------------------------------------------------------- #
class GapAnalysisRequest(BaseModel):
    """Request body for gap analysis."""
    target_node_id: str
    mastered_node_ids: List[str] = []
    max_depth: int = 10


class LearningPathRequest(BaseModel):
    """Request body for adaptive learning path."""
    target_node_id: str
    mastered_node_ids: List[str] = []
    max_depth: int = 10


# --------------------------------------------------------------------------- #
# Endpoints
# --------------------------------------------------------------------------- #
@router.get("/stats")
async def get_graph_stats():
    """Get overall knowledge graph statistics."""
    try:
        return await GraphService.get_stats()
    except Exception as e:
        logger.warning("graph endpoint degraded, neo4j error: %s", e)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Knowledge graph temporarily unavailable",
        )


@router.get("/node/{node_id}")
async def get_node(node_id: str):
    """Get a single knowledge node by its node_id."""
    node = await GraphService.get_node(node_id)
    # An empty dict is as good as absent — never 200 on an unknown node.
    if not node:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Node '{node_id}' not found",
        )
    return node


@router.get("/class/{class_level}")
async def get_nodes_by_class(
    class_level: int,
    board: str = Query("CBSE", description="Board: CBSE or CISCE"),
    subject: Optional[str] = Query(None, description="Filter by subject"),
):
    """Get all nodes for a given class, optionally filtered by subject."""
    try:
        nodes = await GraphService.get_nodes_by_class(board, class_level, subject)
        return {"nodes": nodes, "count": len(nodes)}
    except Exception as e:
        logger.warning("graph endpoint degraded, neo4j error: %s", e)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Knowledge graph temporarily unavailable",
        )


@router.get("/search")
async def search_nodes(
    q: str = Query(..., min_length=2, description="Search query"),
    limit: int = Query(20, ge=1, le=100),
):
    """Full-text search across node topics and content."""
    try:
        nodes = await GraphService.search_nodes(q, limit)
        return {"nodes": nodes, "count": len(nodes), "query": q}
    except Exception as e:
        logger.warning("graph endpoint degraded, neo4j error: %s", e)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Knowledge graph temporarily unavailable",
        )


@router.get("/prerequisites/{node_id}")
async def get_prerequisites(
    node_id: str,
    max_depth: int = Query(10, ge=1, le=20),
):
    """Recursively find ALL prerequisites of a node (any depth).

    This is the core diagnostic query — returns everything a student
    needs to know before mastering this node, ordered by depth.
    """
    try:
        prereqs = await GraphService.get_all_prerequisites(node_id, max_depth)
        return {"node_id": node_id, "prerequisites": prereqs, "count": len(prereqs)}
    except Exception as e:
        logger.warning("graph endpoint degraded, neo4j error: %s", e)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Knowledge graph temporarily unavailable",
        )


@router.get("/unlocks/{node_id}")
async def get_unlocks(
    node_id: str,
    max_depth: int = Query(10, ge=1, le=20),
):
    """Recursively find everything this node unlocks (forward traversal)."""
    try:
        unlocks = await GraphService.get_all_unlocks(node_id, max_depth)
        return {"node_id": node_id, "unlocks": unlocks, "count": len(unlocks)}
    except Exception as e:
        logger.warning("graph endpoint degraded, neo4j error: %s", e)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Knowledge graph temporarily unavailable",
        )


@router.get("/related/{node_id}")
async def get_related(node_id: str):
    """Get bidirectionally related nodes (RELATED_TO edges).

    These are conceptually interdependent nodes across subjects.
    """
    try:
        related = await GraphService.get_related_nodes(node_id)
        return {"node_id": node_id, "related": related, "count": len(related)}
    except Exception as e:
        logger.warning("graph endpoint degraded, neo4j error: %s", e)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Knowledge graph temporarily unavailable",
        )


@router.post("/gaps")
async def find_gaps(req: GapAnalysisRequest):
    """Find unmastered prerequisites of a target node.

    Given a node the student wants to learn and the set of nodes they've
    already mastered, return the prerequisite nodes they're missing.
    """
    try:
        mastered_set = set(req.mastered_node_ids)
        gaps = await GraphService.find_gaps(req.target_node_id, mastered_set, req.max_depth)
        root_gaps = await GraphService.find_root_gaps(req.target_node_id, mastered_set, req.max_depth)
        return {
            "target_node_id": req.target_node_id,
            "gaps": gaps,
            "gap_count": len(gaps),
            "root_gaps": root_gaps,
            "root_gap_count": len(root_gaps),
        }
    except Exception as e:
        logger.warning("graph endpoint degraded, neo4j error: %s", e)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Knowledge graph temporarily unavailable",
        )


@router.post("/path")
async def get_learning_path(req: LearningPathRequest):
    """Find the optimal learning path from current mastery to target node.

    Returns an ordered list of nodes to learn, starting from root gaps
    and building up to the target. Excludes already-mastered nodes.
    """
    try:
        mastered_set = set(req.mastered_node_ids)
        path = await GraphService.get_learning_path(
            req.target_node_id, mastered_set, req.max_depth
        )
        return {
            "target_node_id": req.target_node_id,
            "path": path,
            "steps": len(path),
        }
    except Exception as e:
        logger.warning("graph endpoint degraded, neo4j error: %s", e)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Knowledge graph temporarily unavailable",
        )


@router.get("/visualize")
async def get_graph_for_visualization(
    class_level: int = Query(..., description="Class 1-12"),
    board: str = Query("CBSE", description="Board: CBSE or CISCE"),
    subject: Optional[str] = Query(None, description="Filter by subject"),
):
    """Return nodes and edges for 3D graph visualization."""
    try:
        graph = await GraphService.get_graph_for_visualization(board, class_level, subject)
        return graph
    except Exception as e:
        logger.warning("graph endpoint degraded, neo4j error: %s", e)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Knowledge graph temporarily unavailable",
        )
