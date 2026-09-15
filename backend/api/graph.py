"""
Knowledge Graph API Router — K-12 Learning Platform (CISCE/ICSE/ISC)
====================================================================

Endpoints:
  GET  /api/graph/{subject}/{class_level}       → Knowledge graph for a subject/class
  GET  /api/graph/node/{node_id}                → Single node with relationships
  GET  /api/graph/prerequisites/{node_id}       → Prerequisite chain for a node
  GET  /api/graph/path/{from_node}/{to_node}    → Learning path between two nodes
  GET  /api/graph/search                        → Search nodes by name/topic
  GET  /api/graph/health                        → Health check
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, ConfigDict

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/graph", tags=["Knowledge Graph"])


# ---------------------------------------------------------------------------
# Optional service import with graceful degradation
# ---------------------------------------------------------------------------
try:
    from services.graph_service import GraphService

    _graph_service: GraphService | None = None

    def get_graph_service() -> GraphService:
        global _graph_service
        if _graph_service is None:
            _graph_service = GraphService()
        return _graph_service

    HAS_GRAPH_SERVICE = True
except ImportError:
    HAS_GRAPH_SERVICE = False

    def get_graph_service() -> Any:  # type: ignore[misc]
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Graph service is not available. Neo4j may not be configured.",
        )


# ---------------------------------------------------------------------------
# Pydantic v2 Schemas
# ---------------------------------------------------------------------------


class GraphNodeModel(BaseModel):
    """Represents a node in the knowledge graph."""

    node_id: str = Field(..., description="Unique node identifier")
    name: str = Field(..., description="Human-readable name of the concept")
    node_type: str = Field(..., description="Type: concept / topic / lesson / skill")
    description: Optional[str] = Field(None, description="Detailed description")
    subject: str = Field(..., description="Subject slug, e.g. 'mathematics'")
    class_level: str = Field(..., description="Class level, e.g. '10'")
    difficulty: Optional[str] = Field(None, description="easy / medium / hard")
    estimated_minutes: Optional[int] = Field(
        None, description="Estimated study time in minutes"
    )
    metadata: dict[str, Any] = Field(
        default_factory=dict, description="Arbitrary key-value metadata"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "node_id": "math-grade10-algebra-001",
            "name": "Quadratic Equations",
            "node_type": "topic",
            "description": "Solving quadratic equations by factoring and formula",
            "subject": "mathematics",
            "class_level": "10",
            "difficulty": "medium",
            "estimated_minutes": 45,
            "metadata": {"chapter": 5, "board_code": "C50"},
        }
    }}


class GraphRelationshipModel(BaseModel):
    """Represents a relationship between two knowledge graph nodes."""

    source_id: str = Field(..., description="Source node ID")
    target_id: str = Field(..., description="Target node ID")
    relationship_type: str = Field(
        ..., description="Type: prerequisite / builds_on / related_to / part_of"
    )
    weight: Optional[float] = Field(
        None, ge=0.0, description="Strength of the relationship (0.0-1.0)"
    )
    description: Optional[str] = Field(None, description="Optional description")

    model_config = {"json_schema_extra": {
        "example": {
            "source_id": "math-grade10-algebra-001",
            "target_id": "math-grade10-algebra-002",
            "relationship_type": "prerequisite",
            "weight": 0.9,
            "description": "Must know linear equations first",
        }
    }}


class KnowledgeGraphResponse(BaseModel):
    """Full knowledge graph for a subject/class combination."""

    subject: str = Field(..., description="Subject slug")
    class_level: str = Field(..., description="Class level")
    nodes: list[GraphNodeModel] = Field(..., description="All nodes in the graph")
    relationships: list[GraphRelationshipModel] = Field(
        ..., description="All relationships in the graph"
    )
    generated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="Timestamp when the graph was generated",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "subject": "mathematics",
            "class_level": "10",
            "nodes": [],
            "relationships": [],
            "generated_at": "2026-01-15T10:30:00Z",
        }
    }}


class NodeDetailResponse(BaseModel):
    """Detailed view of a single node with its relationships."""

    node: GraphNodeModel = Field(..., description="The requested node")
    incoming_relationships: list[GraphRelationshipModel] = Field(
        ..., description="Relationships pointing to this node"
    )
    outgoing_relationships: list[GraphRelationshipModel] = Field(
        ..., description="Relationships pointing away from this node"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "node": {},
            "incoming_relationships": [],
            "outgoing_relationships": [],
        }
    }}


class PrerequisiteChainResponse(BaseModel):
    """Prerequisite chain for a given node."""

    target_node: GraphNodeModel = Field(
        ..., description="The node whose prerequisites are being resolved"
    )
    prerequisites: list[GraphNodeModel] = Field(
        ..., description="Ordered list of prerequisite nodes"
    )
    depth: int = Field(..., ge=0, description="Maximum depth of the prerequisite chain")

    model_config = {"json_schema_extra": {
        "example": {
            "target_node": {},
            "prerequisites": [],
            "depth": 3,
        }
    }}


class LearningPathResponse(BaseModel):
    """Learning path between two nodes."""

    from_node: GraphNodeModel = Field(..., description="Starting node")
    to_node: GraphNodeModel = Field(..., description="Destination node")
    path_nodes: list[GraphNodeModel] = Field(
        ..., description="Ordered nodes along the shortest path"
    )
    path_relationships: list[GraphRelationshipModel] = Field(
        ..., description="Relationships along the path"
    )
    total_estimated_minutes: Optional[int] = Field(
        None, description="Total estimated study time along the path"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "from_node": {},
            "to_node": {},
            "path_nodes": [],
            "path_relationships": [],
            "total_estimated_minutes": 120,
        }
    }}


class SearchResponse(BaseModel):
    """Search results from the knowledge graph."""

    query: str = Field(..., description="The search query that was executed")
    results: list[GraphNodeModel] = Field(
        ..., description="Matching nodes ordered by relevance"
    )
    total: int = Field(..., ge=0, description="Total number of results found")

    model_config = {"json_schema_extra": {
        "example": {
            "query": "quadratic",
            "results": [],
            "total": 0,
        }
    }}


class HealthResponse(BaseModel):
    """Health check response."""

    status: str = Field(..., description="Service health status")
    neo4j_connected: bool = Field(..., description="Whether Neo4j is reachable")
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="Health check timestamp",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "status": "healthy",
            "neo4j_connected": True,
            "timestamp": "2026-01-15T10:30:00Z",
        }
    }}


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check",
    description="Check the health of the knowledge graph service and Neo4j connection.",
)
async def health_check() -> HealthResponse:
    """Return health status of the knowledge graph service."""
    neo4j_connected = False
    if HAS_GRAPH_SERVICE:
        try:
            svc = get_graph_service()
            neo4j_connected = await svc.check_connection()
        except Exception:
            neo4j_connected = False

    status_value = "healthy" if neo4j_connected else "degraded"
    return HealthResponse(
        status=status_value,
        neo4j_connected=neo4j_connected,
    )


# NOTE: The /{subject}/{class_level} route is defined at the END of this file
# to avoid it catching /node/{node_id}, /search, /stats, /unlocks/{node_id}, etc.


@router.get(
    "/node/{node_id}",
    response_model=NodeDetailResponse,
    summary="Get node detail",
    description="Retrieve a single knowledge graph node along with its relationships.",
)
async def get_node_detail(
    node_id: str,
    svc: Any = Depends(get_graph_service),
) -> NodeDetailResponse:
    """Return a single node with its incoming and outgoing relationships."""
    try:
        data = await svc.get_node(node_id)
        if not data or data.get("node") is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Node '{node_id}' not found.",
            )
        return NodeDetailResponse(
            node=data["node"],
            incoming_relationships=data.get("incoming_relationships", []),
            outgoing_relationships=data.get("outgoing_relationships", []),
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Failed to get node %s: %s", node_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve node detail.",
        ) from exc


@router.get(
    "/prerequisites/{node_id}",
    response_model=PrerequisiteChainResponse,
    summary="Get prerequisite chain",
    description="Retrieve the full prerequisite chain for a given knowledge graph node.",
)
async def get_prerequisites(
    node_id: str,
    max_depth: int = Query(5, ge=1, le=10, description="Maximum traversal depth"),
    svc: Any = Depends(get_graph_service),
) -> PrerequisiteChainResponse:
    """Return the ordered prerequisite chain for the specified node."""
    try:
        data = await svc.get_prerequisites(node_id, max_depth)
        if not data or data.get("target_node") is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Node '{node_id}' not found or has no prerequisites.",
            )
        return PrerequisiteChainResponse(
            target_node=data["target_node"],
            prerequisites=data.get("prerequisites", []),
            depth=data.get("depth", max_depth),
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Failed to get prerequisites for %s: %s", node_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve prerequisite chain.",
        ) from exc


@router.get(
    "/path/{from_node}/{to_node}",
    response_model=LearningPathResponse,
    summary="Get learning path",
    description="Find the shortest learning path between two knowledge graph nodes.",
)
async def get_learning_path(
    from_node: str,
    to_node: str,
    svc: Any = Depends(get_graph_service),
) -> LearningPathResponse:
    """Return the shortest learning path between two nodes in the graph."""
    try:
        data = await svc.get_path(from_node, to_node)
        if not data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No learning path found from '{from_node}' to '{to_node}'.",
            )
        return LearningPathResponse(
            from_node=data["from_node"],
            to_node=data["to_node"],
            path_nodes=data.get("path_nodes", []),
            path_relationships=data.get("path_relationships", []),
            total_estimated_minutes=data.get("total_estimated_minutes"),
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Failed to get path from %s to %s: %s", from_node, to_node, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve learning path.",
        ) from exc


@router.get(
    "/search",
    response_model=SearchResponse,
    summary="Search knowledge graph",
    description="Search for nodes in the knowledge graph by name or topic keyword.",
)
async def search_nodes(
    q: str = Query(..., min_length=1, description="Search query string"),
    subject: Optional[str] = Query(None, description="Filter by subject slug"),
    class_level: Optional[str] = Query(None, description="Filter by class level"),
    limit: int = Query(20, ge=1, le=100, description="Maximum results to return"),
    svc: Any = Depends(get_graph_service),
) -> SearchResponse:
    """Search the knowledge graph for nodes matching the query."""
    try:
        data = await svc.search(q, subject=subject, class_level=class_level, limit=limit)
        results = data.get("results", [])
        return SearchResponse(
            query=q,
            results=results,
            total=data.get("total", len(results)),
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Search failed for query '%s': %s", q, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Search operation failed.",
        ) from exc


@router.get(
    "/stats",
    response_model=dict,
    summary="Get graph statistics",
    description="Return summary statistics about the knowledge graph.",
)
async def get_graph_stats(
    svc: Any = Depends(get_graph_service),
) -> dict:
    """Return graph statistics."""
    try:
        stats = await svc.get_stats()
        return stats
    except Exception as exc:
        logger.error("Failed to get graph stats: %s", exc)
        return {"total_nodes": 0, "total_relationships": 0, "subjects": 0}


@router.get(
    "/unlocks/{node_id}",
    response_model=dict,
    summary="Get nodes unlocked by completing a node",
    description="Return the list of nodes that become available after mastering the given node.",
)
async def get_unlocks(
    node_id: str,
    max_depth: int = Query(3, ge=1, le=10, description="Max traversal depth"),
    svc: Any = Depends(get_graph_service),
) -> dict:
    """Return nodes unlocked by completing a node."""
    try:
        # Find nodes that have this node as a prerequisite (REQUIRES relationship)
        node = await svc.get_node(node_id)
        if not node:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Node '{node_id}' not found.",
            )
        # Get the graph for the same subject/class to find forward edges
        subject = node.get("subject", "")
        class_level = node.get("class_level", 0)
        graph_data = await svc.get_graph(subject, class_level)
        unlocks = []
        for rel in graph_data.get("relationships", []):
            if rel.get("source_id") == node_id:
                target_id = rel.get("target_id", "")
                # Find the target node
                for n in graph_data.get("nodes", []):
                    if n.get("node_id") == target_id:
                        unlocks.append(n)
                        break
        return {"node_id": node_id, "unlocks": unlocks}
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Failed to get unlocks for %s: %s", node_id, exc)
        return {"node_id": node_id, "unlocks": []}


@router.get(
    "/related/{node_id}",
    response_model=dict,
    summary="Get related nodes",
    description="Return nodes related to the given node via RELATED_TO relationships.",
)
async def get_related(
    node_id: str,
    svc: Any = Depends(get_graph_service),
) -> dict:
    """Return nodes related to the given node."""
    try:
        node = await svc.get_node(node_id)
        if not node:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Node '{node_id}' not found.",
            )
        subject = node.get("subject", "")
        class_level = node.get("class_level", 0)
        graph_data = await svc.get_graph(subject, class_level)
        related = []
        for rel in graph_data.get("relationships", []):
            if rel.get("source_id") == node_id or rel.get("target_id") == node_id:
                other_id = rel.get("target_id") if rel.get("source_id") == node_id else rel.get("source_id")
                for n in graph_data.get("nodes", []):
                    if n.get("node_id") == other_id:
                        related.append(n)
                        break
        return {"node_id": node_id, "related": related}
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Failed to get related nodes for %s: %s", node_id, exc)
        return {"node_id": node_id, "related": []}


@router.post(
    "/gaps",
    response_model=dict,
    summary="Analyze knowledge gaps",
    description="Identify prerequisite gaps between mastered nodes and a target node.",
)
async def analyze_gaps(
    body: dict,
    svc: Any = Depends(get_graph_service),
) -> dict:
    """Analyze knowledge gaps for a target node."""
    try:
        target_node_id = body.get("target_node_id", "")
        mastered_node_ids = body.get("mastered_node_ids", [])
        if not target_node_id:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="target_node_id is required.",
            )
        # Get the target node
        node = await svc.get_node(target_node_id)
        if not node:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Node '{target_node_id}' not found.",
            )
        # Get prerequisites
        prereqs = node.get("prerequisite_node_ids", [])
        gaps = [p for p in prereqs if p not in mastered_node_ids]
        return {
            "target_node_id": target_node_id,
            "gaps": gaps,
            "mastered": mastered_node_ids,
            "total_prerequisites": len(prereqs),
            "gaps_count": len(gaps),
        }
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Failed to analyze gaps: %s", exc)
        return {"target_node_id": body.get("target_node_id", ""), "gaps": []}


@router.post(
    "/path",
    response_model=dict,
    summary="Get learning path",
    description="Compute a learning path from mastered nodes to a target node.",
)
async def get_learning_path(
    body: dict,
    svc: Any = Depends(get_graph_service),
) -> dict:
    """Compute a learning path to a target node."""
    try:
        target_node_id = body.get("target_node_id", "")
        mastered_node_ids = body.get("mastered_node_ids", [])
        if not target_node_id:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="target_node_id is required.",
            )
        node = await svc.get_node(target_node_id)
        if not node:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Node '{target_node_id}' not found.",
            )
        # Get prerequisites and build a path
        prereqs = node.get("prerequisite_node_ids", [])
        # Simple path: unmastered prerequisites in order, then the target
        path = [p for p in prereqs if p not in mastered_node_ids]
        path.append(target_node_id)
        return {
            "target_node_id": target_node_id,
            "path": path,
            "total_steps": len(path),
        }
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Failed to compute learning path: %s", exc)
        return {"target_node_id": body.get("target_node_id", ""), "path": []}


# This route MUST be at the end to avoid catching /node/{node_id}, /search, /stats, etc.
@router.get(
    "/{subject}/{class_level}",
    response_model=KnowledgeGraphResponse,
    summary="Get knowledge graph",
    description="Retrieve the complete knowledge graph for a given subject and class level.",
)
async def get_knowledge_graph(
    subject: str,
    class_level: str,
    svc: Any = Depends(get_graph_service),
) -> KnowledgeGraphResponse:
    """Return the full knowledge graph for the specified subject and class level."""
    try:
        data = await svc.get_graph(subject, class_level)
        return KnowledgeGraphResponse(
            subject=subject,
            class_level=class_level,
            nodes=data.get("nodes", []),
            relationships=data.get("relationships", []),
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Failed to get knowledge graph for %s/%s: %s", subject, class_level, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve knowledge graph.",
        ) from exc