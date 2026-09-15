"""
Curriculum Node API Router
==========================

Endpoints for managing curriculum nodes in the CISCE K-12 learning platform.
Provides listing, detail views, sub-node traversal, question lookups,
solver integration, and mastery tracking.

All endpoints are prefixed with /api/nodes.

Written for async FastAPI with Pydantic v2 schemas and SQLAlchemy async sessions.
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from database import Topic, Student, Mastery

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/nodes", tags=["nodes"])


# ---------------------------------------------------------------------------
# Optional service imports with graceful degradation
# ---------------------------------------------------------------------------
try:
    from services.content_service import ContentService
    HAS_CONTENT_SERVICE = True
except ImportError:
    HAS_CONTENT_SERVICE = False

try:
    from services.knowledge_tracing import KnowledgeTracingService
    HAS_KNOWLEDGE_TRACING = True
except ImportError:
    HAS_KNOWLEDGE_TRACING = False


# ---------------------------------------------------------------------------
# Pydantic v2 Schemas
# ---------------------------------------------------------------------------


class SubjectSchema(BaseModel):
    """Minimal subject information returned on node listings."""

    id: str = Field(..., description="Subject unique identifier")
    name: str = Field(..., description="Display name of the subject")
    code: str = Field(..., description="Short subject code (e.g. 'MATH')")

    model_config = {"json_schema_extra": {
        "example": {
            "id": "subject-math-001",
            "name": "Mathematics",
            "code": "MATH",
        }
    }}


class TopicSchema(BaseModel):
    """Core curriculum node representation."""

    id: str = Field(..., description="Unique node identifier")
    name: str = Field(..., description="Display name of the node")
    description: str = Field(..., description="Description of the curriculum content")
    node_type: str = Field(..., description="Node type: 'chapter', 'topic', 'sub-topic', 'concept'")
    subject: SubjectSchema = Field(..., description="Parent subject")
    class_level: str = Field(..., description="CISCE class level (e.g. '10', '12')")
    parent_id: Optional[str] = Field(None, description="Parent node ID, if any")
    order_index: int = Field(..., ge=0, description="Display order within parent")
    is_active: bool = Field(..., description="Whether this node is currently active")
    created_at: datetime = Field(..., description="ISO timestamp of creation")
    updated_at: datetime = Field(..., description="ISO timestamp of last update")

    model_config = {"json_schema_extra": {
        "example": {
            "id": "node-math-ch1",
            "name": "Coordinate Geometry",
            "description": "Study of points, lines, and planes using coordinates.",
            "node_type": "chapter",
            "subject": {
                "id": "subject-math-001",
                "name": "Mathematics",
                "code": "MATH",
            },
            "class_level": "10",
            "parent_id": None,
            "order_index": 1,
            "is_active": True,
            "created_at": "2024-01-01T00:00:00Z",
            "updated_at": "2024-06-15T10:30:00Z",
        }
    }}


class SubNodeResponse(BaseModel):
    """A sub-node with additional metadata about the parent chain."""

    id: str = Field(..., description="Sub-node unique identifier")
    name: str = Field(..., description="Display name")
    node_type: str = Field(..., description="Type: 'topic' or 'sub-topic'")
    depth: int = Field(..., ge=1, description="Depth level from the root node")
    order_index: int = Field(..., ge=0, description="Display order")
    question_count: int = Field(..., ge=0, description="Number of questions linked to this node")

    model_config = {"json_schema_extra": {
        "example": {
            "id": "node-math-ch1-t1",
            "name": "Distance Formula",
            "node_type": "topic",
            "depth": 1,
            "order_index": 1,
            "question_count": 24,
        }
    }}


class NodeQuestionsResponse(BaseModel):
    """Paginated question list for a curriculum node."""

    node_id: str = Field(..., description="Curriculum node ID")
    total: int = Field(..., ge=0, description="Total number of questions for this node")
    page: int = Field(..., ge=1, description="Current page number")
    page_size: int = Field(..., ge=1, description="Items per page")
    items: list[dict[str, Any]] = Field(
        ...,
        description="Question data; structure depends on the question bank integration",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "node_id": "node-math-ch1",
            "total": 48,
            "page": 1,
            "page_size": 20,
            "items": [
                {
                    "question_id": "q-001",
                    "text": "Find the distance between (1,2) and (4,6).",
                    "difficulty": "medium",
                    "type": "short_answer",
                }
            ],
        }
    }}


class SolverInfoResponse(BaseModel):
    """Solver configuration and capabilities for a given node."""

    node_id: str = Field(..., description="Curriculum node ID")
    problem_types: list[str] = Field(
        ...,
        description="List of supported problem type identifiers for this node",
    )
    supports_step_by_step: bool = Field(
        ...,
        description="Whether step-by-step solution generation is available",
    )
    supports_generation: bool = Field(
        ...,
        description="Whether new question generation is available for this node",
    )
    available_difficulties: list[str] = Field(
        ...,
        description="Difficulty levels the solver can handle for this node",
    )
    config: dict[str, Any] = Field(
        default_factory=dict,
        description="Solver-specific configuration overrides",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "node_id": "node-math-ch1",
            "problem_types": ["distance_formula", "section_formula", "area_triangle"],
            "supports_step_by_step": True,
            "supports_generation": True,
            "available_difficulties": ["easy", "medium", "hard"],
            "config": {
                "timeout_seconds": 30,
                "max_steps": 8,
            },
        }
    }}


class MasteryUpdateRequest(BaseModel):
    """Request body for updating mastery of a curriculum node."""

    student_id: str = Field(
        ..., min_length=1, description="Student unique identifier"
    )
    score: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description="Mastery score update, 0.0 (none) to 1.0 (mastered)",
    )
    source: str = Field(
        default="manual",
        min_length=1,
        description="Source of the mastery update (e.g. 'practice', 'exam', 'manual')",
    )
    timestamp: Optional[datetime] = Field(
        None,
        description="Timestamp of the event; defaults to now() if omitted",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "student-001",
            "score": 0.75,
            "source": "practice",
            "timestamp": "2024-07-20T14:00:00Z",
        }
    }}


class MasteryUpdateResponse(BaseModel):
    """Response confirming a mastery update."""

    student_id: str = Field(..., description="Student unique identifier")
    node_id: str = Field(..., description="Curriculum node ID")
    mastery_score: float = Field(..., ge=0.0, le=1.0, description="Updated mastery score")
    mastery_level: str = Field(..., description="Human-readable mastery level")
    updated_at: datetime = Field(..., description="Timestamp of this update")

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "student-001",
            "node_id": "node-math-ch1",
            "mastery_score": 0.75,
            "mastery_level": "Proficient",
            "updated_at": "2024-07-20T14:00:00Z",
        }
    }}


class NodeFilters(BaseModel):
    """Query parameters for filtering node listings."""

    subject: Optional[str] = Field(
        None, description="Filter by subject code (e.g. 'MATH', 'SCI')"
    )
    class_level: Optional[str] = Field(
        None, description="Filter by CISCE class level (e.g. '10', '12')"
    )
    node_type: Optional[str] = Field(
        None,
        description="Filter by node type: 'chapter', 'topic', 'sub-topic', 'concept'",
    )
    parent_id: Optional[str] = Field(
        None, description="Filter by parent node ID; use 'null' for root nodes"
    )
    search: Optional[str] = Field(
        None, min_length=1, description="Substring search on node name"
    )


# ---------------------------------------------------------------------------
# Helper utilities
# ---------------------------------------------------------------------------


def _mastery_level(score: float) -> str:
    """Map a numeric mastery score to a human-readable level string."""
    if score >= 0.9:
        return "Mastered"
    if score >= 0.7:
        return "Proficient"
    if score >= 0.4:
        return "Developing"
    if score > 0.0:
        return "Emerging"
    return "Not Started"


def _node_to_schema(node: Topic) -> TopicSchema:
    """Convert a Topic ORM object to its Pydantic schema."""
    subject_schema = SubjectSchema(
        id=node.subject_obj.id if node.subject_obj else "",
        name=node.subject_obj.name if node.subject_obj else "",
        code=node.subject_obj.code if node.subject_obj else "",
    )
    return TopicSchema(
        id=node.id,
        name=node.name,
        description=node.description or "",
        node_type=node.node_type,
        subject=subject_schema,
        class_level=node.class_level,
        parent_id=node.parent_id,
        order_index=node.order_index,
        is_active=node.is_active,
        created_at=node.created_at,
        updated_at=node.updated_at,
    )


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------


@router.get("/health", status_code=status.HTTP_200_OK, tags=["Health"])
async def health_check() -> dict[str, Any]:
    """Health check endpoint for curriculum node service."""
    return {
        "service": "nodes",
        "status": "healthy",
        "content_service": "available" if HAS_CONTENT_SERVICE else "unavailable",
        "knowledge_tracing": "available" if HAS_KNOWLEDGE_TRACING else "unavailable",
    }


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@router.get(
    "",
    response_model=list[TopicSchema],
    status_code=status.HTTP_200_OK,
    summary="List curriculum nodes",
    description="Return all curriculum nodes, optionally filtered by subject, class, or node type.",
)
async def list_nodes(
    subject: Optional[str] = Query(None, description="Filter by subject code"),
    class_level: Optional[str] = Query(None, description="Filter by CISCE class level"),
    node_type: Optional[str] = Query(None, description="Filter by node type"),
    parent_id: Optional[str] = Query(None, description="Filter by parent node ID"),
    search: Optional[str] = Query(None, description="Substring search on node name"),
    db: AsyncSession = Depends(get_db),
) -> list[TopicSchema]:
    """List curriculum nodes with optional filters.

    Supports filtering by subject code, class level, node type, and parent ID.
    A free-text search on the node name is also available.
    Falls back to Neo4j knowledge graph when PostgreSQL is empty.
    """
    # Try DB first, fall back to Neo4j
    nodes = []
    try:
        stmt = select(Topic)
        if class_level:
            stmt = stmt.where(Topic.class_level == class_level)
        if node_type:
            stmt = stmt.where(Topic.node_type == node_type)
        if parent_id is not None:
            stmt = stmt.where(Topic.parent_id == parent_id)
        if search:
            stmt = stmt.where(Topic.name.ilike(f"%{search}%"))
        stmt = stmt.order_by(Topic.order_index, Topic.name)
        result = await db.execute(stmt)
        nodes = result.scalars().all()
    except Exception as e:
        logger.warning("DB query failed, falling back to Neo4j: %s", e)
        nodes = []

    if nodes:
        return [_node_to_schema(node) for node in nodes]

    # Fallback: query Neo4j knowledge graph
    try:
        from services.graph_service import get_graph_service
        svc = get_graph_service()
        # If subject and class_level provided, get nodes for that subject/class
        if subject and class_level:
            cl_int = int(class_level) if str(class_level).isdigit() else 0
            neo4j_nodes = await svc.get_graph(subject, cl_int)
            graph_nodes = neo4j_nodes.get("nodes", [])
        else:
            # Get root nodes as a starting point
            graph_nodes = await svc.get_roots()

        if not graph_nodes:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No curriculum nodes found matching the given filters.",
            )

        # Convert to TopicSchema format
        from datetime import datetime, timezone
        now = datetime.now(timezone.utc)
        schemas = []
        for i, n in enumerate(graph_nodes):
            subj_code = n.get("subject", subject or "")
            subj_name = subj_code.title()
            schemas.append(TopicSchema(
                id=n.get("id") or n.get("node_id", ""),
                name=n.get("name") or n.get("topic", ""),
                description=n.get("description", n.get("name", "")),
                node_type=n.get("type", "topic"),
                subject=SubjectSchema(
                    id=f"subject-{subj_code}",
                    name=subj_name,
                    code=subj_code.upper()[:4],
                ),
                class_level=str(n.get("class_level", class_level or "")),
                parent_id=n.get("parent_id"),
                order_index=i,
                is_active=True,
                created_at=now,
                updated_at=now,
            ))
        return schemas
    except HTTPException:
        raise
    except Exception as e:
        logger.warning("Neo4j fallback failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No curriculum nodes found matching the given filters.",
        )


@router.get(
    "/{node_id}",
    response_model=TopicSchema,
    status_code=status.HTTP_200_OK,
    summary="Get node details",
    description="Return full details for a single curriculum node by its ID.",
)
async def get_node(
    node_id: str,
    db: AsyncSession = Depends(get_db),
) -> TopicSchema:
    """Retrieve the details of a single curriculum node."""
    stmt = select(Topic).where(Topic.id == node_id)
    result = await db.execute(stmt)
    node = result.scalar_one_or_none()

    if node is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Curriculum node with ID '{node_id}' not found.",
        )

    return _node_to_schema(node)


@router.get(
    "/{node_id}/sub-nodes",
    response_model=list[SubNodeResponse],
    status_code=status.HTTP_200_OK,
    summary="Get sub-nodes",
    description="Return all child (granular) nodes for a given curriculum node.",
)
async def get_sub_nodes(
    node_id: str,
    db: AsyncSession = Depends(get_db),
) -> list[SubNodeResponse]:
    """Return all direct sub-nodes of the given node.

    Each sub-node includes a depth indicator and the number of linked questions.
    """
    # Verify parent node exists
    parent_stmt = select(Topic).where(Topic.id == node_id)
    parent_result = await db.execute(parent_stmt)
    parent_node = parent_result.scalar_one_or_none()

    if parent_node is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Curriculum node with ID '{node_id}' not found.",
        )

    # Fetch children
    child_stmt = (
        select(Topic)
        .where(Topic.parent_id == node_id)
        .order_by(Topic.order_index, Topic.name)
    )
    child_result = await db.execute(child_stmt)
    children = child_result.scalars().all()

    if not children:
        return []

    # Gather question counts per child node
    child_ids = [c.id for c in children]
    count_stmt = (
        select(
            Topic.id,
            func.count(func.distinct("question_id")).label("question_count"),
        )
        .outerjoin("node_questions", Topic.id == "node_questions.c.node_id")
        .where(Topic.id.in_(child_ids))
        .group_by(Topic.id)
    )
    count_result = await db.execute(count_stmt)
    count_map = {row[0]: row[1] for row in count_result.all()}

    response: list[SubNodeResponse] = []
    for child in children:
        depth = 1
        current = child
        while current.parent_id is not None:
            depth += 1
            ancestor_stmt = select(Topic).where(
                Topic.id == current.parent_id
            )
            ancestor_result = await db.execute(ancestor_stmt)
            ancestor = ancestor_result.scalar_one_or_none()
            if ancestor is None:
                break
            current = ancestor

        response.append(
            SubNodeResponse(
                id=child.id,
                name=child.name,
                node_type=child.node_type,
                depth=depth,
                order_index=child.order_index,
                question_count=count_map.get(child.id, 0),
            )
        )

    return response


@router.get(
    "/{node_id}/questions",
    response_model=NodeQuestionsResponse,
    status_code=status.HTTP_200_OK,
    summary="Get questions for a node",
    description="Return paginated questions linked to a curriculum node.",
)
async def get_node_questions(
    node_id: str,
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    difficulty: Optional[str] = Query(
        None, description="Filter by difficulty: easy, medium, hard"
    ),
    db: AsyncSession = Depends(get_db),
) -> NodeQuestionsResponse:
    """Return a paginated list of questions associated with a curriculum node.

    Optionally filter by difficulty level.
    """
    # Verify node exists
    node_stmt = select(Topic).where(Topic.id == node_id)
    node_result = await db.execute(node_stmt)
    node = node_result.scalar_one_or_none()

    if node is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Curriculum node with ID '{node_id}' not found.",
        )

    items: list[dict[str, Any]] = []

    if HAS_CONTENT_SERVICE:
        try:
            content_service = ContentService(db)
            items = await content_service.get_questions_for_node(
                node_id=node_id,
                page=page,
                page_size=page_size,
                difficulty=difficulty,
            )
        except Exception as exc:
            logger.error(
                "ContentService error for node %s: %s", node_id, exc
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to retrieve questions from content service.",
            ) from exc
    else:
        # Fallback: query from database junction table directly
        try:
            from sqlalchemy import text as sql_text
            offset = (page - 1) * page_size
            query = sql_text(
                """
                SELECT q.id, q.text, q.difficulty, q.question_type
                FROM questions q
                JOIN node_questions nq ON q.id = nq.question_id
                WHERE nq.node_id = :node_id
                """
                + (" AND q.difficulty = :difficulty" if difficulty else "")
                + """
                ORDER BY q.created_at DESC
                LIMIT :page_size OFFSET :offset
                """
            )
            params: dict[str, Any] = {
                "node_id": node_id,
                "page_size": page_size,
                "offset": offset,
            }
            if difficulty:
                params["difficulty"] = difficulty

            result = await db.execute(query.bindparams(**params))
            rows = result.mappings().all()
            items = [
                {
                    "question_id": row["id"],
                    "text": row["text"],
                    "difficulty": row["difficulty"],
                    "type": row["question_type"],
                }
                for row in rows
            ]
        except Exception as exc:
            logger.error(
                "Fallback question query error for node %s: %s", node_id, exc
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to retrieve questions.",
            ) from exc

    # Compute total
    count_query = select(func.count()).select_from(
        select(1)
        .outerjoin("node_questions", "questions.id == node_questions.question_id")
        .where("node_questions.node_id == :node_id")
        .subquery()
    )
    total_result = await db.execute(
        select(func.count())
        .select_from(
            select(1)
            .outerjoin("node_questions", "questions.id == node_questions.question_id")
            .where("node_questions.node_id == :node_id")
            .subquery()
        )
    )
    total = total_result.scalar() or 0

    return NodeQuestionsResponse(
        node_id=node_id,
        total=total,
        page=page,
        page_size=page_size,
        items=items,
    )


@router.get(
    "/{node_id}/solver",
    response_model=SolverInfoResponse,
    status_code=status.HTTP_200_OK,
    summary="Get solver info for a node",
    description="Return solver capabilities, supported problem types, and configuration for a curriculum node.",
)
async def get_solver_info(
    node_id: str,
    db: AsyncSession = Depends(get_db),
) -> SolverInfoResponse:
    """Return solver configuration and capabilities for a given node.

    Aggregates information from the content service if available,
    otherwise falls back to a default configuration.
    """
    # Verify node exists
    node_stmt = select(Topic).where(Topic.id == node_id)
    node_result = await db.execute(node_stmt)
    node = node_result.scalar_one_or_none()

    if node is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Curriculum node with ID '{node_id}' not found.",
        )

    # Default fallback
    problem_types: list[str] = []
    supports_steps = True
    supports_generation = True
    available_difficulties = ["easy", "medium", "hard"]
    config: dict[str, Any] = {
        "timeout_seconds": 30,
        "max_steps": 8,
    }

    if HAS_CONTENT_SERVICE:
        try:
            content_service = ContentService(db)
            solver_data = await content_service.get_solver_info(node_id)
            problem_types = solver_data.get("problem_types", [])
            supports_steps = solver_data.get("supports_step_by_step", True)
            supports_generation = solver_data.get("supports_generation", True)
            available_difficulties = solver_data.get(
                "available_difficulties", ["easy", "medium", "hard"]
            )
            config = solver_data.get("config", config)
        except Exception as exc:
            logger.warning(
                "Could not retrieve solver info from ContentService for %s: %s",
                node_id,
                exc,
            )
    else:
        # Derive problem types from the node name/type as a heuristic fallback
        problem_types = [f"{node.node_type}:{node.name.lower().replace(' ', '_')}"]
        logger.debug(
            "ContentService unavailable; using heuristic problem types for node %s",
            node_id,
        )

    return SolverInfoResponse(
        node_id=node_id,
        problem_types=problem_types,
        supports_step_by_step=supports_steps,
        supports_generation=supports_generation,
        available_difficulties=available_difficulties,
        config=config,
    )


@router.post(
    "/{node_id}/mastery",
    response_model=MasteryUpdateResponse,
    status_code=status.HTTP_200_OK,
    summary="Update mastery for a node",
    description="Update or record the mastery score for a student on a given curriculum node.",
)
async def update_mastery(
    node_id: str,
    payload: MasteryUpdateRequest,
    db: AsyncSession = Depends(get_db),
) -> MasteryUpdateResponse:
    """Record a mastery update for a student on a curriculum node.

    Delegates to the knowledge tracing service if available,
    otherwise persists directly to the database.
    """
    # Verify node exists
    node_stmt = select(Topic).where(Topic.id == node_id)
    node_result = await db.execute(node_stmt)
    node = node_result.scalar_one_or_none()

    if node is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Curriculum node with ID '{node_id}' not found.",
        )

    # Validate student_id against known students
    from database import Student
    student_stmt = select(Student).where(Student.id == payload.student_id)
    student_result = await db.execute(student_stmt)
    student = student_result.scalar_one_or_none()

    if student is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID '{payload.student_id}' not found.",
        )

    now = payload.timestamp or datetime.now(timezone.utc)
    mastery_score = payload.score

    if HAS_KNOWLEDGE_TRACING:
        try:
            kt_service = KnowledgeTracingService(db)
            mastery_score = await kt_service.update_mastery(
                student_id=payload.student_id,
                node_id=node_id,
                score=payload.score,
                source=payload.source,
                timestamp=now,
            )
        except Exception as exc:
            logger.error(
                "KnowledgeTracingService error for student %s, node %s: %s",
                payload.student_id,
                node_id,
                exc,
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update mastery via knowledge tracing service.",
            ) from exc
    else:
        # Direct database persistence as fallback
        try:
            from database import Mastery
            from sqlalchemy import insert as sa_insert

            stmt = sa_insert(Mastery).values(
                student_id=payload.student_id,
                node_id=node_id,
                mastery_score=payload.score,
                source=payload.source,
                updated_at=now,
            )
            await db.execute(stmt)
            await db.commit()
        except Exception as exc:
            await db.rollback()
            logger.error(
                "Direct mastery insert error for student %s, node %s: %s",
                payload.student_id,
                node_id,
                exc,
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to persist mastery update.",
            ) from exc

    mastery_level = _mastery_level(mastery_score)

    return MasteryUpdateResponse(
        student_id=payload.student_id,
        node_id=node_id,
        mastery_score=mastery_score,
        mastery_level=mastery_level,
        updated_at=now,
    )