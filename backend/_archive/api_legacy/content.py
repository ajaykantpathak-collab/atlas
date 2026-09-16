"""
Content API Router — CISCE/ICSE/ISC K-12 Learning Platform
==========================================================

Content browsing and search API for navigating subjects, classes, content
nodes, lessons, and enrichment materials.

Integrates with content_service.py for node/tree data and qdrant_service.py
for semantic search.
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy.ext.asyncio import AsyncSession

# ContentService for database queries
from services.content_service import ContentService
from database import get_db

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/content", tags=["content"])


# ---------------------------------------------------------------------------
# Service instances (lazy-loaded, fall back gracefully)
# ---------------------------------------------------------------------------

_content_service: Optional[ContentService] = None
_qdrant_service: Optional[Any] = None


async def get_content_service(db: AsyncSession = Depends(get_db)) -> ContentService:
    """Get a ContentService instance with a database session."""
    return ContentService(db)


def get_qdrant_service() -> Optional[Any]:
    global _qdrant_service
    if _qdrant_service is None:
        try:
            _qdrant_service = None
        except Exception as exc:
            logger.warning("QdrantService unavailable: %s", exc)
            return None
    return _qdrant_service


# ---------------------------------------------------------------------------
# Pydantic v2 Schemas
# ---------------------------------------------------------------------------


class SubjectResponse(BaseModel):
    """A subject offered by the platform."""

    slug: str = Field(..., description="URL-friendly subject identifier")
    name: str = Field(..., description="Human-readable subject name")
    description: Optional[str] = Field(
        None, description="Short description of the subject"
    )
    icon_url: Optional[str] = Field(
        None, description="URL or path to the subject icon"
    )
    chapter_count: int = Field(
        ..., ge=0, description="Number of chapters in this subject"
    )
    class_levels: list[str] = Field(
        ..., description="Class levels where this subject is taught"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "slug": "mathematics",
            "name": "Mathematics",
            "description": "Algebra, geometry, trigonometry and calculus",
            "icon_url": "/static/icons/mathematics.svg",
            "chapter_count": 14,
            "class_levels": ["9", "10", "11", "12"],
        }
    }}


class ClassLevelResponse(BaseModel):
    """A single class / grade level entry."""

    level: str = Field(..., description="Class level identifier, e.g. '10'")
    label: str = Field(..., description="Display label, e.g. 'Class 10'")
    syllabus_code: Optional[str] = Field(
        None, description="ICSE/ISC syllabus code if applicable"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "level": "10",
            "label": "Class 10 (ICSE)",
            "syllabus_code": "ICSE-10",
        }
    }}


class ContentNodeResponse(BaseModel):
    """A lightweight content node (chapter or section)."""

    node_id: str = Field(..., description="Unique node identifier")
    title: str = Field(..., description="Node title")
    type: str = Field(..., description="Node type: chapter / section / topic / subtopic")
    parent_id: Optional[str] = Field(
        None, description="Parent node ID, None for root chapters"
    )
    order: int = Field(..., ge=0, description="Display order within siblings")
    has_lesson: bool = Field(
        ..., description="Whether a full lesson page exists for this node"
    )
    has_enrichment: bool = Field(
        ..., description="Whether enrichment files exist for this node"
    )
    child_count: int = Field(
        ..., ge=0, description="Number of child nodes"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "node_id": "math-10-ch-1",
            "title": "Rational and Irrational Numbers",
            "type": "chapter",
            "parent_id": None,
            "order": 1,
            "has_lesson": True,
            "has_enrichment": True,
            "child_count": 6,
        }
    }}


class ContentNodeDetailResponse(ContentNodeResponse):
    """Detailed node response with full content body."""

    content_html: Optional[str] = Field(
        None, description="Full HTML content of the lesson"
    )
    content_markdown: Optional[str] = Field(
        None, description="Markdown source of the lesson"
    )
    key_concepts: list[str] = Field(
        default_factory=list, description="Key concepts covered"
    )
    learning_objectives: list[str] = Field(
        default_factory=list, description="Learning objectives for this node"
    )
    prerequisites: list[str] = Field(
        default_factory=list, description="Prerequisite node IDs"
    )
    estimated_duration_minutes: int = Field(
        ..., ge=0, description="Estimated study time in minutes"
    )
    created_at: datetime = Field(..., description="Creation timestamp (UTC)")
    updated_at: datetime = Field(..., description="Last update timestamp (UTC)")

    model_config = {"json_schema_extra": {
        "example": {
            "node_id": "math-10-ch-1",
            "title": "Rational and Irrational Numbers",
            "type": "chapter",
            "parent_id": None,
            "order": 1,
            "has_lesson": True,
            "has_enrichment": True,
            "child_count": 6,
            "content_html": "<p>Rational numbers can be expressed...</p>",
            "content_markdown": "# Rational and Irrational Numbers\n\n...",
            "key_concepts": ["rational number", "irrational number", "decimal expansion"],
            "learning_objectives": [
                "Define rational and irrational numbers",
                "Prove irrationality of sqrt(2)",
            ],
            "prerequisites": [],
            "estimated_duration_minutes": 45,
            "created_at": "2024-01-15T08:00:00Z",
            "updated_at": "2024-06-20T12:30:00Z",
        }
    }}


class LessonSectionResponse(BaseModel):
    """One section within a lesson page."""

    section_id: str = Field(..., description="Unique section identifier")
    heading: str = Field(..., description="Section heading text")
    order: int = Field(..., ge=0, description="Display order within the lesson")
    content_html: str = Field(..., description="Section body in HTML")
    content_markdown: str = Field(
        ..., description="Section body in Markdown"
    )
    illustrations: list[str] = Field(
        default_factory=list,
        description="Paths/URLs to diagrams or images in this section",
    )
    worked_examples: list[str] = Field(
        default_factory=list,
        description="IDs of worked examples linked to this section",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "section_id": "math-10-ch-1-sec-2",
            "heading": "Decimal Expansions",
            "order": 2,
            "content_html": "<p>The decimal expansion of a rational number either...</p>",
            "content_markdown": "## Decimal Expansions\n\nThe decimal expansion of...",
            "illustrations": ["/static/illustrations/decimal_expansion.png"],
            "worked_examples": ["we-001"],
        }
    }}


class LessonResponse(BaseModel):
    """Full lesson with ordered sections."""

    node_id: str = Field(..., description="Content node ID")
    title: str = Field(..., description="Lesson title")
    intro_paragraph: Optional[str] = Field(
        None, description="Introductory paragraph for the lesson"
    )
    sections: list[LessonSectionResponse] = Field(
        ..., description="Ordered list of lesson sections"
    )
    summary_notes: Optional[str] = Field(
        None, description="Summary / revision notes at the end"
    )
    related_nodes: list[str] = Field(
        default_factory=list,
        description="IDs of related or prerequisite content nodes",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "node_id": "math-10-ch-1",
            "title": "Rational and Irrational Numbers",
            "intro_paragraph": "In this lesson we explore...",
            "sections": [],
            "summary_notes": "Remember: rational numbers have...",
            "related_nodes": ["math-10-ch-2"],
        }
    }}


class EnrichmentFileResponse(BaseModel):
    """A single enrichment file attached to a content node."""

    file_id: str = Field(..., description="Unique file identifier")
    filename: str = Field(..., description="Original filename")
    file_type: str = Field(
        ...,
        description="File type category: pdf / image / video / interactive / document",
    )
    file_url: str = Field(..., description="URL to download or stream the file")
    file_size_bytes: int = Field(..., ge=0, description="File size in bytes")
    mime_type: str = Field(..., description="MIME type of the file")
    description: Optional[str] = Field(
        None, description="Human-readable description of the enrichment material"
    )
    order: int = Field(..., ge=0, description="Display order within enrichment list")
    created_at: datetime = Field(..., description="Creation timestamp (UTC)")

    model_config = {"json_schema_extra": {
        "example": {
            "file_id": "math-10-ch-1-enr-1",
            "filename": "rational_numbers_worksheet.pdf",
            "file_type": "pdf",
            "file_url": "/static/enrichment/rational_numbers_worksheet.pdf",
            "file_size_bytes": 245862,
            "mime_type": "application/pdf",
            "description": "Practice worksheet on rational numbers",
            "order": 1,
            "created_at": "2024-03-01T10:00:00Z",
        }
    }}


class EnrichmentResponse(BaseModel):
    """Collection of enrichment files for a content node."""

    node_id: str = Field(..., description="Content node ID")
    title: str = Field(..., description="Title of the parent content node")
    files: list[EnrichmentFileResponse] = Field(
        ..., description="Ordered list of enrichment files"
    )
    total_count: int = Field(
        ..., ge=0, description="Total number of enrichment files"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "node_id": "math-10-ch-1",
            "title": "Rational and Irrational Numbers",
            "files": [],
            "total_count": 0,
        }
    }}


class SearchResultItem(BaseModel):
    """A single search result item."""

    node_id: str = Field(..., description="Content node ID")
    title: str = Field(..., description="Node title")
    subject: str = Field(..., description="Subject slug")
    class_level: str = Field(..., description="Class level")
    snippet: str = Field(
        ..., description="Highlighted excerpt matching the query"
    )
    score: float = Field(
        ..., ge=0.0, le=1.0, description="Relevance score (0.0 to 1.0)"
    )
    node_type: str = Field(..., description="Node type")
    has_lesson: bool = Field(..., description="Whether a full lesson exists")

    model_config = {"json_schema_extra": {
        "example": {
            "node_id": "math-10-ch-1",
            "title": "Rational and Irrational Numbers",
            "subject": "mathematics",
            "class_level": "10",
            "snippet": "...decimal expansion of <mark>rational numbers</mark> either...",
            "score": 0.92,
            "node_type": "chapter",
            "has_lesson": True,
        }
    }}


class SearchResponse(BaseModel):
    """Paginated search results."""

    query: str = Field(..., description="The search query string")
    total_results: int = Field(..., ge=0, description="Total matching results")
    page: int = Field(..., ge=1, description="Current page number")
    page_size: int = Field(..., ge=1, description="Results per page")
    total_pages: int = Field(..., ge=0, description="Total number of pages")
    results: list[SearchResultItem] = Field(
        ..., description="Search results for this page"
    )
    filters_applied: dict[str, Any] = Field(
        default_factory=dict,
        description="Filters that were applied to produce these results",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "query": "rational numbers",
            "total_results": 3,
            "page": 1,
            "page_size": 10,
            "total_pages": 1,
            "results": [],
            "filters_applied": {"subject": "mathematics", "class_level": "10"},
        }
    }}


class HealthResponse(BaseModel):
    """Health check response."""

    status: str = Field(..., description="Overall service status")
    timestamp: datetime = Field(..., description="Check timestamp (UTC)")
    services: dict[str, str] = Field(
        ..., description="Per-service health status"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "status": "healthy",
            "timestamp": "2025-01-15T12:00:00Z",
            "services": {
                "content_service": "ok",
                "qdrant_service": "ok",
            },
        }
    }}


class ErrorResponse(BaseModel):
    """Standard error response."""

    detail: str = Field(..., description="Error message")
    error_code: Optional[str] = Field(
        None, description="Machine-readable error code"
    )
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="Error timestamp (UTC)",
    )


# ---------------------------------------------------------------------------
# In-memory LRU cache for cheap content lookups
# ---------------------------------------------------------------------------

_CACHE_MAXSIZE = 256
_cache: dict[str, tuple[Any, float]] = {}
_cache_order: list[str] = []


def _cache_get(key: str) -> Optional[Any]:
    if key in _cache:
        value, _ = _cache[key]
        return value
    return None


def _cache_set(key: str, value: Any, ttl_seconds: int = 300) -> None:
    import time

    if len(_cache_order) >= _CACHE_MAXSIZE:
        oldest = _cache_order.pop(0)
        _cache.pop(oldest, None)
    _cache[key] = (value, time.time() + ttl_seconds)


def _cache_cleanup() -> None:
    import time

    now = time.time()
    expired = [k for k, (_, exp) in _cache.items() if now > exp]
    for k in expired:
        _cache.pop(k, None)
        if k in _cache_order:
            _cache_order.remove(k)


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check",
    description="Check the health of the content API and its dependent services.",
)
async def health_check() -> HealthResponse:
    """Return health status of content API and backing services."""
    services: dict[str, str] = {}

    try:
        # Just check if the service module is importable
        from services.content_service import ContentService  # noqa: F401
        services["content_service"] = "ok"
    except Exception as exc:
        logger.warning("content_service health check failed: %s", exc)
        services["content_service"] = "unavailable"

    qdrant = get_qdrant_service()
    services["qdrant_service"] = "ok" if qdrant is not None else "unavailable"

    overall = "healthy" if all(v == "ok" for v in services.values()) else "degraded"

    return HealthResponse(
        status=overall,
        timestamp=datetime.now(timezone.utc),
        services=services,
    )


@router.get(
    "/subjects",
    response_model=list[SubjectResponse],
    summary="List all subjects",
    description=(
        "Return a list of all subjects offered on the platform, "
        "including chapter counts and applicable class levels."
    ),
)
async def list_subjects(
    service: ContentService = Depends(get_content_service),
) -> list[SubjectResponse]:
    """List all subjects with metadata."""
    _cache_cleanup()
    cache_key = "subjects:all"
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    try:
        subjects_raw = await service.get_all_subjects()
    except Exception as exc:
        logger.error("Failed to fetch subjects: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Content service temporarily unavailable.",
        )

    result = [SubjectResponse(**s) for s in subjects_raw]
    _cache_set(cache_key, result, ttl_seconds=600)
    return result


@router.get(
    "/subjects/{subject}/classes",
    response_model=list[ClassLevelResponse],
    summary="List class levels for a subject",
    description=(
        "Return the class/grade levels in which the given subject is taught."
    ),
)
async def list_subject_classes(
    subject: str,
    service: ContentService = Depends(get_content_service),
) -> list[ClassLevelResponse]:
    """List class levels available for a given subject."""
    _cache_cleanup()
    cache_key = f"subject:{subject}:classes"
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    try:
        classes_raw = await service.get_classes_for_subject(subject)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
    except Exception as exc:
        logger.error("Failed to fetch classes for subject '%s': %s", subject, exc)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Content service temporarily unavailable.",
        )

    result = [ClassLevelResponse(**c) for c in classes_raw]
    _cache_set(cache_key, result, ttl_seconds=600)
    return result


@router.get(
    "/nodes/{class_level}/{subject}",
    response_model=list[ContentNodeResponse],
    summary="List content nodes for a class and subject",
    description=(
        "Return the hierarchical list of content nodes (chapters and sections) "
        "for the given class level and subject."
    ),
)
async def list_content_nodes(
    class_level: str,
    subject: str,
    expand: bool = Query(
        False, description="If true, return the full tree recursively"
    ),
    service: ContentService = Depends(get_content_service),
) -> list[ContentNodeResponse]:
    """List content nodes for a specific class level and subject."""
    _cache_cleanup()
    cache_key = f"nodes:{class_level}:{subject}:expand={int(expand)}"
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    try:
        cl_int = int(class_level) if str(class_level).isdigit() else 0
        nodes_raw = await service.get_nodes_for_class(subject, cl_int)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
    except Exception as exc:
        logger.error(
            "Failed to fetch nodes for class=%s subject=%s: %s",
            class_level, subject, exc,
        )
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Content service temporarily unavailable.",
        )

    # Convert to ContentNodeResponse format
    result = []
    for i, n in enumerate(nodes_raw):
        node_id = n.get("node_id", "")
        result.append(ContentNodeResponse(
            node_id=node_id,
            title=n.get("name", node_id),
            type=n.get("type", "topic"),
            parent_id=n.get("parent_id"),
            order=i,
            has_lesson=True,  # lessons are loaded from markdown files
            has_enrichment=bool(n.get("enrichment_files")),
            child_count=0,
        ))
    _cache_set(cache_key, result, ttl_seconds=300)
    return result


@router.get(
    "/node/{node_id}",
    response_model=ContentNodeDetailResponse,
    summary="Get a single content node with full content",
    description=(
        "Return the full details of a single content node, including the "
        "complete lesson content (HTML and Markdown), key concepts, "
        "learning objectives, and prerequisites."
    ),
)
async def get_node_detail(
    node_id: str,
) -> ContentNodeDetailResponse:
    """Get full details for a single content node."""
    _cache_cleanup()
    cache_key = f"node:detail:{node_id}"
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    service = get_content_service()
    try:
        node_raw = await service.get_node_by_id(node_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
    except Exception as exc:
        logger.error("Failed to fetch node '%s': %s", node_id, exc)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Content service temporarily unavailable.",
        )

    result = ContentNodeDetailResponse(**node_raw)
    _cache_set(cache_key, result, ttl_seconds=300)
    return result


@router.get(
    "/nodes/{node_id}",
    response_model=ContentNodeDetailResponse,
    summary="Get a single content node (plural alias)",
)
async def get_node_detail_plural(node_id: str) -> ContentNodeDetailResponse:
    """Plural alias for /node/{node_id} — frontend calls /nodes/{node_id}."""
    return await get_node_detail(node_id)


@router.get(
    "/nodes/{node_id}/content",
    response_model=list[dict],
    summary="Get content bundles for a node",
)
async def get_node_content_bundles(node_id: str) -> list[dict]:
    """Return content bundles (lesson, enrichment, questions) for a node."""
    _cache_cleanup()
    cache_key = f"node:content:{node_id}"
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    service = get_content_service()
    bundles: list[dict] = []

    # Try to get the node detail first
    try:
        node_raw = await service.get_node_by_id(node_id)
        bundles.append({
            "id": f"{node_id}_lesson",
            "nodeId": node_id,
            "contentType": "lesson",
            "contentData": node_raw,
            "isOfflineAvailable": False,
        })
    except Exception as exc:
        logger.warning("Failed to fetch node content for '%s': %s", node_id, exc)

    # Try to get enrichment
    try:
        enrichment = await service.get_enrichment_for_node(node_id)
        if enrichment:
            bundles.append({
                "id": f"{node_id}_enrichment",
                "nodeId": node_id,
                "contentType": "enrichment",
                "contentData": enrichment,
                "isOfflineAvailable": False,
            })
    except Exception:
        pass

    _cache_set(cache_key, bundles, ttl_seconds=300)
    return bundles


@router.get(
    "/search",
    response_model=SearchResponse,
    summary="Search content",
    description=(
        "Perform a full-text / semantic search across content nodes. "
        "Results are ranked by relevance and can be filtered by subject, "
        "class level, and node type."
    ),
)
async def search_content(
    q: Optional[str] = Query(
        None, min_length=1, description="Search query string (alias: q)"
    ),
    query: Optional[str] = Query(
        None, min_length=1, description="Search query string"
    ),
    subject: Optional[str] = Query(
        None, description="Filter by subject slug"
    ),
    class_level: Optional[str] = Query(
        None, description="Filter by class level"
    ),
    node_type: Optional[str] = Query(
        None, description="Filter by node type (chapter, section, topic, subtopic)"
    ),
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    page_size: int = Query(10, ge=1, le=50, description="Results per page"),
    service: ContentService = Depends(get_content_service),
) -> SearchResponse:
    """Search content nodes by query with optional filters."""
    search_query = q or query
    if not search_query:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Search query is required (use 'q' or 'query' parameter).",
        )

    # Use Neo4j-based search from content service
    try:
        search_results = await service.search_content(search_query, limit=page_size * 2)
        # Apply filters
        if subject:
            search_results = [r for r in search_results if r.get("subject") == subject]
        if class_level:
            search_results = [r for r in search_results if str(r.get("class_level")) == str(class_level)]
        if node_type:
            search_results = [r for r in search_results if r.get("type") == node_type]

        total_results = len(search_results)
        # Paginate
        start_idx = (page - 1) * page_size
        end_idx = start_idx + page_size
        items = search_results[start_idx:end_idx]

        results_list = []
        for item in items:
            try:
                results_list.append(SearchResultItem(
                    node_id=item.get("node_id", ""),
                    title=item.get("name", ""),
                    subject=item.get("subject", ""),
                    class_level=str(item.get("class_level", "")),
                    node_type=item.get("type", "topic"),
                    score=1.0,
                    snippet=item.get("description", ""),
                ))
            except Exception:
                pass
    except Exception as exc:
        logger.error("Content search failed: %s", exc)
        results_list = []
        total_results = 0

    total_pages = (total_results + page_size - 1) // page_size if total_results > 0 else 0

    return SearchResponse(
        query=search_query,
        total_results=total_results,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        results=results_list,
        filters_applied={"subject": subject, "class_level": class_level, "node_type": node_type},
    )


@router.get(
    "/lesson/{node_id}",
    response_model=LessonResponse,
    summary="Get lesson content for a node",
    description=(
        "Return the full structured lesson content for a content node, "
        "including all ordered sections with HTML and Markdown content, "
        "worked example references, and summary notes."
    ),
)
async def get_lesson(
    node_id: str,
    service: ContentService = Depends(get_content_service),
) -> LessonResponse:
    """Get full lesson content with ordered sections for a content node."""
    _cache_cleanup()
    cache_key = f"lesson:{node_id}"
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    try:
        lesson_raw = await service.get_lesson(node_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
    except Exception as exc:
        logger.error("Failed to fetch lesson for node '%s': %s", node_id, exc)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Content service temporarily unavailable.",
        )

    if not lesson_raw:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lesson not found for node '{node_id}'.",
        )

    result = LessonResponse(**lesson_raw)
    _cache_set(cache_key, result, ttl_seconds=300)
    return result


@router.get(
    "/enrichment/{node_id}",
    response_model=EnrichmentResponse,
    summary="Get enrichment files for a node",
    description=(
        "Return all enrichment files (PDFs, images, videos, interactive "
        "content, documents) associated with a content node."
    ),
)
async def get_enrichment(node_id: str) -> EnrichmentResponse:
    """Get all enrichment files for a content node."""
    _cache_cleanup()
    cache_key = f"enrichment:{node_id}"
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    service = get_content_service()
    try:
        enrichment_raw = await service.get_enrichment(node_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
    except Exception as exc:
        logger.error(
            "Failed to fetch enrichment for node '%s': %s", node_id, exc
        )
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Content service temporarily unavailable.",
        )

    result = EnrichmentResponse(**enrichment_raw)
    _cache_set(cache_key, result, ttl_seconds=300)
    return result


@router.get(
    "/enrichment",
    response_model=dict,
    summary="Get enrichment count for a subject/class",
    description="Return the total count of enrichment files for a subject and class level.",
)
async def get_enrichment_count(
    subject: str = Query(..., description="Subject slug"),
    class_level: str = Query(..., description="Class level"),
    limit: int = Query(1, description="Limit"),
    service: ContentService = Depends(get_content_service),
) -> dict:
    """Return enrichment file count for a subject/class."""
    try:
        cl_int = int(class_level) if str(class_level).isdigit() else 0
        # Count enrichment files in the organized directory
        import os
        from pathlib import Path
        organized = Path(os.getenv("ORGANIZED_CONTENT_DIR", r"D:\platform\organized"))
        enrichment_dir = organized / subject / f"class{cl_int}" / "enrichment"
        total = 0
        if enrichment_dir.exists():
            total = sum(1 for f in enrichment_dir.iterdir() if f.is_file())
        return {"total": total, "subject": subject, "class_level": class_level}
    except Exception as exc:
        logger.error("Failed to fetch enrichment count: %s", exc)
        return {"total": 0, "subject": subject, "class_level": class_level}


@router.get(
    "/graph",
    response_model=dict,
    summary="Get knowledge graph overview",
    description="Return a knowledge graph filtered by board and/or class level.",
)
async def get_content_graph(
    board: Optional[str] = Query(None, description="Filter by board (e.g. CISCE)"),
    classLevel: Optional[str] = Query(None, description="Filter by class level"),
    service: ContentService = Depends(get_content_service),
) -> dict:
    """Return a knowledge graph overview for the frontend."""
    try:
        from services.graph_service import get_graph_service
        graph_svc = get_graph_service()
        # Get all subjects
        subjects = await service.get_all_subjects()
        nodes = []
        links = []
        # For each subject, get root nodes
        for subj in subjects[:10]:  # Limit to first 10 subjects for performance
            subj_slug = subj["slug"]
            # Get classes for this subject
            classes = await service.get_classes_for_subject(subj_slug)
            for cl in classes:
                cl_level = cl["level"]
                if classLevel and cl_level != classLevel:
                    continue
                cl_int = int(cl_level) if cl_level.isdigit() else 0
                try:
                    graph_data = await graph_svc.get_graph(subj_slug, cl_int)
                    for n in graph_data.get("nodes", [])[:20]:  # Limit nodes per subject
                        nodes.append({
                            "id": n.get("node_id", ""),
                            "nodeId": n.get("node_id", ""),
                            "label": n.get("name", ""),
                            "subject": subj_slug,
                            "classLevel": cl_int,
                            "nodeType": "topic",
                        })
                    for r in graph_data.get("relationships", [])[:20]:
                        links.append({
                            "source": r.get("source_id", ""),
                            "target": r.get("target_id", ""),
                            "type": r.get("relationship_type", "REQUIRES"),
                        })
                except Exception:
                    pass
        return {"nodes": nodes, "links": links}
    except Exception as exc:
        logger.error("Failed to fetch content graph: %s", exc)
        return {"nodes": [], "links": []}


@router.get(
    "/recommended",
    response_model=list[dict],
    summary="Get recommended lessons",
    description="Return a list of recommended lessons for the student.",
)
async def get_recommended_lessons(
    service: ContentService = Depends(get_content_service),
) -> list[dict]:
    """Return recommended lessons across subjects."""
    try:
        # Get a few nodes from different subjects as recommendations
        from services.graph_service import get_graph_service
        graph_svc = get_graph_service()
        subjects = await service.get_all_subjects()
        recommendations = []
        for subj in subjects[:5]:
            subj_slug = subj["slug"]
            classes = await service.get_classes_for_subject(subj_slug)
            if classes:
                cl_int = int(classes[0]["level"]) if classes[0]["level"].isdigit() else 10
                try:
                    graph_data = await graph_svc.get_graph(subj_slug, cl_int)
                    for n in graph_data.get("nodes", [])[:2]:
                        recommendations.append({
                            "nodeId": n.get("node_id", ""),
                            "subject": subj_slug,
                            "topic": n.get("name", ""),
                            "chapter": n.get("metadata", {}).get("chapter", ""),
                            "progress": 0,
                            "difficulty": n.get("difficulty", "medium"),
                            "estimatedTime": n.get("estimated_minutes", 30),
                            "icon": "book",
                        })
                except Exception:
                    pass
            if len(recommendations) >= 10:
                break
        return recommendations
    except Exception as exc:
        logger.error("Failed to fetch recommended lessons: %s", exc)
        return []


@router.get(
    "/subject/{subject}",
    response_model=list[dict],
    summary="Get nodes by subject",
    description="Return all content nodes for a given subject, optionally filtered by class level.",
)
async def get_nodes_by_subject(
    subject: str,
    classLevel: Optional[int] = Query(None, description="Filter by class level"),
    service: ContentService = Depends(get_content_service),
) -> list[dict]:
    """Return content nodes for a subject."""
    try:
        if classLevel:
            nodes = await service.get_nodes_for_class(subject, classLevel)
        else:
            # Get all classes for this subject
            classes = await service.get_classes_for_subject(subject)
            nodes = []
            for cl in classes:
                cl_int = int(cl["level"]) if cl["level"].isdigit() else 0
                cl_nodes = await service.get_nodes_for_class(subject, cl_int)
                nodes.extend(cl_nodes)
        # Convert to frontend format
        return [
            {
                "id": n.get("node_id", ""),
                "nodeId": n.get("node_id", ""),
                "label": n.get("name", ""),
                "description": n.get("description", ""),
                "subject": subject,
                "classLevel": n.get("class_level", 0),
                "chapter": n.get("chapter", ""),
                "nodeType": "topic",
                "prerequisites": n.get("prerequisites", []),
                "forwardNodes": [],
                "masteryProbability": 0,
                "difficulty": n.get("difficulty", "medium"),
                "estimatedTime": n.get("estimated_time", 30),
            }
            for n in nodes
        ]
    except Exception as exc:
        logger.error("Failed to fetch nodes for subject %s: %s", subject, exc)
        return []