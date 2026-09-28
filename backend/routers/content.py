"""Content router for the DREAM_APP educational platform.

Exposes endpoints for browsing subjects, the knowledge graph, individual
nodes, enrichment content (DEFINITION, TEXT_WALKTHROUGH, ELI5, etc.),
board questions, class-level content, recommendations, and search.
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user, get_current_user_optional
from backend.models.content import KnowledgeNodeModel, Subject
from backend.models.enrichment import EnrichmentContent, BoardQuestion, ClassLevelContent
from backend.models.user import User
from backend.schemas.content import (
    BoardQuestionListResponse,
    BoardQuestionSchema,
    ClassLevelContentListResponse,
    ClassLevelContentSchema,
    ContentBundleSchema,
    EnrichmentContentSchema,
    EnrichmentFieldSchema,
    EnrichmentListResponse,
    EnrichmentSummarySchema,
    KnowledgeGraphResponse,
    KnowledgeNodeSchema,
    RecommendedLessonSchema,
    SubjectListResponse,
)
from backend.services.content_service import ContentService
from backend.utils.question_text import strip_pipeline_markers

router = APIRouter(prefix="/api/content", tags=["content"])


# --------------------------------------------------------------------------- #
# Helper
# --------------------------------------------------------------------------- #
def _node_to_schema(node: KnowledgeNodeModel) -> KnowledgeNodeSchema:
    """Convert a ``KnowledgeNodeModel`` ORM instance to its schema."""
    return KnowledgeNodeSchema(
        id=str(node.id),
        node_id=node.node_id,
        label=node.label,
        description=node.description or "",
        subject=node.subject,
        class_level=node.class_level,
        chapter=node.chapter or "",
        node_type=node.node_type,
        simplified_content=node.simplified_content,
        prerequisites=node.prerequisites or [],
        forward_nodes=node.forward_nodes or [],
        mastery_probability=node.mastery_probability or 0.0,
        difficulty=node.difficulty,
        estimated_time=node.estimated_time or 30,
    )


def _subject_to_schema(subject: Subject) -> dict:
    """Convert a ``Subject`` ORM instance to a dict suitable for the schema."""
    return {
        "id": str(subject.id),
        "name": subject.name,
        "board": subject.board,
        "class_level": subject.class_level,
        "icon_name": subject.icon_name or "book",
        "color": subject.color or "#6366f1",
        "topics_count": None,
        "mastery_percentage": None,
    }


# --------------------------------------------------------------------------- #
# Endpoints
# --------------------------------------------------------------------------- #
@router.get("/subjects", response_model=SubjectListResponse)
async def get_subjects(
    board: Optional[str] = Query(default=None),
    class_level: Optional[int] = Query(default=None, ge=1, le=12),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Return subjects, optionally filtered by board and/or class level."""
    subjects = await ContentService.get_subjects(db, board=board, class_level=class_level)
    return SubjectListResponse(
        subjects=[_subject_to_schema(s) for s in subjects]
    )


@router.get("/graph", response_model=KnowledgeGraphResponse)
async def get_knowledge_graph(
    board: Optional[str] = Query(default=None),
    class_level: Optional[int] = Query(default=None, ge=1, le=12),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Return the knowledge graph (nodes and prerequisite links)."""
    graph = await ContentService.get_knowledge_graph(
        db, board=board, class_level=class_level
    )
    return KnowledgeGraphResponse(
        nodes=[KnowledgeNodeSchema(**n) for n in graph.get("nodes", [])],
        links=graph.get("links", []),
    )


@router.get("/nodes/{node_id}", response_model=KnowledgeNodeSchema)
async def get_node(
    node_id: str,
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Return a single knowledge node by its string ``node_id``."""
    try:
        node = await ContentService.get_node(db, node_id)
    except ValueError:
        node = None
    if node is not None:
        return _node_to_schema(node)

    # Corpus fallback — the 9,099 enhanced nodes live in enrichment_content /
    # the md index, not the legacy knowledge_nodes table.
    from backend.models.enrichment import EnrichmentContent
    from sqlalchemy import select as _sel
    ec = (await db.execute(
        _sel(EnrichmentContent).where(EnrichmentContent.node_id == node_id)
    )).scalar_one_or_none()
    if ec is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Node '{node_id}' not found",
        )
    return KnowledgeNodeSchema(
        id=str(ec.id), node_id=ec.node_id,
        label=ec.title or ec.node_id,
        description=(ec.definition or "")[:400],
        subject=ec.subject, class_level=ec.class_level,
        chapter=str(ec.chapter or ""),
        node_type="concept",
        simplified_content=ec.text_walkthrough or ec.eli5,
        prerequisites=ec.prereq_ids or [],
        forward_nodes=ec.forward_node_ids or [],
        mastery_probability=0.0,
        difficulty=ec.difficulty or "medium",
        estimated_time=30,
    )


@router.get("/nodes/{node_id}/content", response_model=List[ContentBundleSchema])
async def get_node_content(
    node_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return all content bundles attached to the given node."""
    try:
        bundles = await ContentService.get_node_content(db, node_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
    return [
        ContentBundleSchema(
            id=str(b.id),
            node_id=str(b.node_id),
            content_type=b.content_type,
            content_data=b.content_data or {},
            is_offline_available=b.is_offline_available,
            file_size_mb=b.file_size_mb,
        )
        for b in bundles
    ]


@router.get("/recommended", response_model=List[RecommendedLessonSchema])
async def get_recommended_lessons(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return lessons recommended for the authenticated user."""
    lessons = await ContentService.get_recommended_lessons(db, str(user.id))
    return [RecommendedLessonSchema(**lesson) for lesson in lessons]


@router.get("/search", response_model=List[KnowledgeNodeSchema])
async def search_nodes(
    q: str = Query(..., min_length=1, description="Search query"),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Search knowledge nodes by label or description."""
    nodes = await ContentService.search_nodes(db, q)
    if nodes:
        return [_node_to_schema(n) for n in nodes]

    # Corpus fallback — search enrichment_content titles/definitions
    # (knowledge_nodes is a legacy table; the 9,099-node corpus lives here)
    from backend.models.enrichment import EnrichmentContent
    from sqlalchemy import select as _sel, or_ as _or
    like = f"%{q.strip()}%"
    rows = (await db.execute(
        _sel(EnrichmentContent)
        .where(_or(EnrichmentContent.title.ilike(like),
                   EnrichmentContent.definition.ilike(like)))
        .limit(100))).scalars().all()
    return [
        KnowledgeNodeSchema(
            id=str(ec.id), node_id=ec.node_id,
            label=ec.title or ec.node_id,
            description=(ec.definition or "")[:400],
            subject=ec.subject, class_level=ec.class_level,
            chapter=str(ec.chapter or ""),
            node_type="concept",
            simplified_content=ec.text_walkthrough or ec.eli5,
            prerequisites=ec.prereq_ids or [],
            forward_nodes=ec.forward_node_ids or [],
            mastery_probability=0.0,
            difficulty=ec.difficulty or "medium",
            estimated_time=30,
        )
        for ec in rows
    ]


@router.get("/subject/{subject}", response_model=List[KnowledgeNodeSchema])
async def get_nodes_by_subject(
    subject: str,
    class_level: Optional[int] = Query(default=None, ge=1, le=12),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Return all nodes for a given subject, optionally filtered by class."""
    nodes = await ContentService.get_nodes_by_subject(
        db, subject, class_level=class_level
    )
    if nodes:
        return [_node_to_schema(n) for n in nodes]

    # Corpus fallback — the 9,099-node corpus lives in enrichment_content,
    # not the legacy knowledge_nodes table, so elective subjects returned
    # [] (B01). Filter by corpus subject codes, not display names.
    _CODES = {
        "mathematics": ["math", "maths", "mathematics", "stat"],
        "maths": ["math", "maths"], "math": ["math", "maths"],
        "science": ["sci", "science", "phy", "chem", "bio", "physics",
                    "chemistry", "biology"],
        "physics": ["phy", "physics"], "chemistry": ["chem", "chemistry"],
        "biology": ["bio", "biology"], "bio": ["bio", "biology"],
        "english": ["engl", "english", "eng_k", "eng_w", "eng_f", "eng_v",
                    "eng_s", "eng_h", "gram", "comp"],
        "hindi": ["hin", "hin_a", "hin_v", "hin_al", "hin_ar"],
        "computer_science": ["comp", "cs", "ip"], "cs": ["comp", "cs", "ip"],
        "accountancy": ["acc"], "accounts": ["acc"], "acc": ["acc"],
        "business_studies": ["bs"], "bs": ["bs"],
        "economics": ["eco", "economics"], "eco": ["eco", "economics"],
        "psychology": ["psy"], "psy": ["psy"],
        "history": ["hist", "history", "histciv"],
        "histciv": ["histciv", "hist", "civ"],
        "geography": ["geo", "geography"], "civics": ["civ", "civics"],
        "social_science": ["soc", "sst", "hist", "geo", "civ", "eco",
                           "histciv"],
        "sociology": ["soc"], "biotechnology": ["biotech"],
        "biotech": ["biotech"], "statistics": ["stat"], "stat": ["stat"],
        "home_science": ["hs"], "hs": ["hs"],
        "physical_education": ["ps"], "ps": ["ps"],
        "applied_mathematics": ["stat", "math"],
        "informatics_practices": ["ip"], "ip": ["ip"],
    }
    codes = _CODES.get(subject.lower().replace(" ", "_"),
                       [subject.lower()])
    from backend.models.enrichment import EnrichmentContent
    from sqlalchemy import select as _sel
    q = _sel(EnrichmentContent).where(EnrichmentContent.subject.in_(codes))
    if class_level is not None:
        q = q.where(EnrichmentContent.class_level == int(class_level))
    rows = (await db.execute(q.order_by(EnrichmentContent.node_id)
                             .limit(500))).scalars().all()
    return [
        KnowledgeNodeSchema(
            id=str(ec.id), node_id=ec.node_id,
            label=ec.title or ec.node_id,
            description=(ec.definition or "")[:400],
            subject=ec.subject, class_level=ec.class_level,
            chapter=str(ec.chapter or ""),
            node_type="concept",
            simplified_content=ec.text_walkthrough or ec.eli5,
            prerequisites=ec.prereq_ids or [],
            forward_nodes=ec.forward_node_ids or [],
            mastery_probability=0.0,
            difficulty=ec.difficulty or "medium",
            estimated_time=30,
        )
        for ec in rows
    ]


# --------------------------------------------------------------------------- #
# Enrichment content endpoints
# --------------------------------------------------------------------------- #
def _enrichment_to_full_schema(content: EnrichmentContent) -> EnrichmentContentSchema:
    """Convert an EnrichmentContent ORM instance to its full schema."""
    from backend.schemas.content import DiagnosticQuestionSchema, OnFailureEntrySchema
    diag = []
    for q in (content.diagnostic_questions or []):
        if isinstance(q, dict):
            diag.append(DiagnosticQuestionSchema(**q))
        else:
            diag.append(DiagnosticQuestionSchema(
                number=q.get("number", 0),
                cognitive_type=q.get("cognitive_type", ""),
                question=q.get("question", ""),
                answer=q.get("answer", ""),
            ))
    on_fail = []
    for f in (content.on_failure or []):
        if isinstance(f, dict):
            on_fail.append(OnFailureEntrySchema(**f))
        else:
            on_fail.append(OnFailureEntrySchema(
                question_number=f.get("question_number", 0),
                remediation_text=f.get("remediation_text", ""),
                review_node_ids=f.get("review_node_ids", []),
            ))
    return EnrichmentContentSchema(
        node_id=content.node_id,
        title=content.title,
        subject=content.subject,
        class_level=content.class_level,
        chapter=content.chapter,
        definition=content.definition,
        text_walkthrough=content.text_walkthrough,
        eli5=content.eli5,
        common_misconception=content.common_misconception,
        diagnostic_questions=diag,
        on_failure=on_fail,
        examples=content.examples,
        cognitive_level=content.cognitive_level,
        mastery_criteria=content.mastery_criteria,
        scope_boundary=content.scope_boundary,
        prereq_ids=content.prereq_ids or [],
        depth_prereq_ids=content.depth_prereq_ids or [],
        forward_node_ids=content.forward_node_ids or [],
        difficulty=content.difficulty,
        board=content.board,
        source_file=content.source_file,
    )


def _enrichment_to_summary(content: EnrichmentContent) -> EnrichmentSummarySchema:
    """Convert an EnrichmentContent ORM instance to a brief summary."""
    return EnrichmentSummarySchema(
        node_id=content.node_id,
        title=content.title,
        subject=content.subject,
        class_level=content.class_level,
        chapter=content.chapter,
        cognitive_level=content.cognitive_level,
        difficulty=content.difficulty,
        has_definition=bool(content.definition),
        has_walkthrough=bool(content.text_walkthrough),
        has_eli5=bool(content.eli5),
        has_misconception=bool(content.common_misconception),
        has_diagnostic=bool(content.diagnostic_questions),
        has_on_failure=bool(content.on_failure),
        prereq_count=len(content.prereq_ids or []),
    )


@router.get("/enrichment", response_model=EnrichmentListResponse)
async def list_enrichment(
    subject: Optional[str] = Query(default=None),
    class_level: Optional[int] = Query(default=None, ge=1, le=12),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """List enrichment content, optionally filtered by subject and/or class."""
    nodes, total = await ContentService.get_enrichment_list(
        db, subject=subject, class_level=class_level, limit=limit, offset=offset
    )

    # Chapter display names: the corpus stores codes ("ch01") — the student-
    # facing name is the title of the chapter's anchor (lowest-numbered) node.
    chap_anchor: dict[str, tuple[int, str]] = {}
    for n in nodes:
        if not n.chapter:
            continue
        key = f"{n.subject}|{n.class_level}|{n.chapter}"
        try:
            seq = int(str(n.node_id).rsplit("_", 1)[-1])
        except (ValueError, IndexError):
            seq = 9999
        if key not in chap_anchor or seq < chap_anchor[key][0]:
            chap_anchor[key] = (seq, n.title or "")

    out = []
    for n in nodes:
        s = _enrichment_to_summary(n)
        anchor = chap_anchor.get(f"{n.subject}|{n.class_level}|{n.chapter}")
        if anchor and n.chapter:
            num = str(n.chapter).lower().lstrip("ch").lstrip("0") or n.chapter
            s.chapter_title = f"Chapter {num} · {anchor[1]}" if anchor[1] else f"Chapter {num}"
        out.append(s)

    # The DB row's has_* flags are stale (legacy CISCE-era columns); the
    # parsed corpus index is the real source — overlay it so lists never hide
    # authored eli5/walkthrough/misconception content that actually exists.
    try:
        from backend.services.enhanced_nodes import load_index as _load_idx
        idx = _load_idx()
        for s in out:
            node = idx.get(s.node_id)
            if not node:
                continue
            s.has_definition = s.has_definition or bool(node.get("definition"))
            s.has_walkthrough = s.has_walkthrough or bool(node.get("walkthrough"))
            s.has_eli5 = s.has_eli5 or bool(node.get("eli5"))
            s.has_misconception = (
                s.has_misconception or bool(node.get("common_misconception"))
            )
            s.has_diagnostic = s.has_diagnostic or bool(node.get("diagnostics"))
    except Exception:
        pass

    return EnrichmentListResponse(nodes=out, total=total)


@router.get("/nodes/{node_id}/enrichment", response_model=EnrichmentContentSchema)
async def get_node_enrichment(
    node_id: str,
    db: AsyncSession = Depends(get_db),
):
    """Serve node pedagogy from the OFFICIAL enhanced-nodes corpus
    (9,010 nodes) — the single source of teaching content across the
    whole app.  (The enrichment_content DB table is legacy CISCE-era
    data covering only ~3.6k nodes and is no longer consulted.)
    Fields the corpus lacks for a node are simply absent; the frontend
    renders sections conditionally."""
    from backend.services.enhanced_nodes import load_index
    from fastapi.responses import JSONResponse
    try:
        node = load_index().get(node_id)
    except Exception:
        node = None
    if node is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"no enhanced node {node_id!r}",
        )
    diagnostics = node.get("diagnostics") or []
    subj = str(node.get("subject") or "").strip().capitalize()
    chap = node.get("chapter")
    display_title = node.get("title") or (
        f"{subj} · Chapter {chap}" if subj and chap else node_id)

    # DB carries fields the md index doesn't (examples, on_failure,
    # difficulty, depth/forward graph ids) — merge them in.
    from backend.models.enrichment import EnrichmentContent as _EC
    from sqlalchemy import select as _sel
    ec = (await db.execute(
        _sel(_EC).where(_EC.node_id == node_id))).scalar_one_or_none()

    return JSONResponse({
        "node_id": node_id,
        "title": (ec.title if ec and ec.title else display_title),
        "subject": node.get("subject") or "",
        "class_level": node.get("class") or 0,
        "chapter": node.get("chapter"),
        "definition": node.get("definition"),
        "text_walkthrough": node.get("walkthrough"),
        "eli5": node.get("eli5") or (ec.eli5 if ec else None),
        "common_misconception": node.get("common_misconception"),
        "diagnostic_questions": [
            {"question": d.get("question") or d.get("q"),
             "answer": d.get("answer") or d.get("a"),
             "options": d.get("options") or [],
             "misconception_if_wrong": d.get("misconception")}
            for d in diagnostics if isinstance(d, dict)
        ],
        "on_failure": node.get("on_failure") or (ec.on_failure if ec else None),
        "examples": node.get("examples") or (ec.examples if ec else None),
        "cognitive_level": node.get("cognitive_level"),
        "mastery_criteria": node.get("mastery_criteria"),
        "scope_boundary": node.get("scope_boundary"),
        "prereq_ids": node.get("prereq_ids") or [],
        "depth_prereq_ids": (ec.depth_prereq_ids if ec else None)
                            or node.get("depth_prereq_ids") or [],
        "forward_node_ids": (ec.forward_node_ids if ec else None)
                            or node.get("forward_node_ids") or [],
        "difficulty": (ec.difficulty if ec else None) or node.get("difficulty"),
        "board": node.get("board") or "CBSE",
    })


@router.get("/nodes/{node_id}/enrichment/{field}", response_model=EnrichmentFieldSchema)
async def get_node_enrichment_field(
    node_id: str,
    field: str,
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Return a single enrichment field for a node.

    Valid fields: definition, text_walkthrough, eli5, common_misconception,
    examples, cognitive_level, mastery_criteria, scope_boundary.
    """
    try:
        value = await ContentService.get_enrichment_field(db, node_id, field)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))
    if value is not None and not isinstance(value, str):
        # structured fields (diagnostic_questions, on_failure, id lists)
        # are JSON documents — serialize so the str-typed schema holds
        import json as _json

        value = _json.dumps(value, ensure_ascii=False)
    return EnrichmentFieldSchema(
        node_id=node_id,
        field=field,
        content=value or "",
    )


@router.get("/search/enrichment", response_model=List[EnrichmentSummarySchema])
async def search_enrichment(
    q: str = Query(..., min_length=1, description="Search query"),
    limit: int = Query(default=20, ge=1, le=100),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Search enrichment content by title, definition, or ELI5 text."""
    results = await ContentService.search_enrichment(db, q, limit=limit)
    return [_enrichment_to_summary(r) for r in results]


# --------------------------------------------------------------------------- #
# Board question endpoints
# --------------------------------------------------------------------------- #
def _question_to_schema(q: BoardQuestion) -> BoardQuestionSchema:
    return BoardQuestionSchema(
        id=str(q.id),
        question_number=q.question_number,
        node_tags=q.node_tags or [],
        subject=q.subject,
        class_level=q.class_level,
        chapter=q.chapter,
        section=q.section,
        question_type=q.question_type,
        question_text=strip_pipeline_markers(q.question_text),
        options=q.options,
        # Answer keys stay server-side — students receive them only
        # post-submit via the grading response, never in question payloads.
        correct_answer=None,
        model_answer=None,
        explanation=None,
        marks=q.marks,
        marking_scheme=None,
        difficulty=q.difficulty,
        source_type=q.source_type,
        source_file=q.source_file,
        board=q.board,
        year=q.year,
    )


@router.get("/questions", response_model=BoardQuestionListResponse)
async def list_questions(
    subject: Optional[str] = Query(default=None),
    class_level: Optional[int] = Query(default=None, ge=1, le=12),
    source_type: Optional[str] = Query(default=None),
    question_type: Optional[str] = Query(default=None),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """List board questions, filtered by subject, class, type, etc."""
    if not subject or class_level is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Both subject and class_level are required",
        )
    questions, total = await ContentService.get_questions_for_class(
        db, subject=subject, class_level=class_level,
        source_type=source_type, question_type=question_type,
        limit=limit, offset=offset,
    )
    return BoardQuestionListResponse(
        questions=[_question_to_schema(q) for q in questions],
        total=total,
    )


@router.get("/nodes/{node_id}/questions", response_model=BoardQuestionListResponse)
async def get_node_questions(
    node_id: str,
    limit: int = Query(default=20, ge=1, le=100),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Return questions tagged to a specific node."""
    questions = await ContentService.get_questions_for_node(db, node_id, limit=limit)
    return BoardQuestionListResponse(
        questions=[_question_to_schema(q) for q in questions],
        total=len(questions),
    )


# --------------------------------------------------------------------------- #
# Class-level content endpoints
# --------------------------------------------------------------------------- #
def _class_content_to_schema(c: ClassLevelContent) -> ClassLevelContentSchema:
    return ClassLevelContentSchema(
        id=str(c.id),
        target_class=c.target_class or [],
        target_subject=c.target_subject,
        content_type=c.content_type,
        title=c.title,
        content=c.content,
        source_file=c.source_file,
        board=c.board,
    )


@router.get("/class-content", response_model=ClassLevelContentListResponse)
async def list_class_content(
    subject: Optional[str] = Query(default=None),
    class_level: Optional[int] = Query(default=None, ge=1, le=12),
    content_type: Optional[str] = Query(default=None),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """List class-level content (glossary, formula bank, summaries, etc.)."""
    items, total = await ContentService.get_class_level_content(
        db, subject=subject, class_level=class_level,
        content_type=content_type, limit=limit, offset=offset,
    )
    return ClassLevelContentListResponse(
        items=[_class_content_to_schema(i) for i in items],
        total=total,
    )


# --------------------------------------------------------------------------- #
# Enrichment graph — built from prereq_ids / forward_node_ids
# --------------------------------------------------------------------------- #
@router.get("/enrichment-graph")
async def get_enrichment_graph(
    subject: Optional[str] = Query(default=None),
    class_level: Optional[int] = Query(default=None, ge=1, le=12),
    limit: int = Query(default=200, ge=1, le=500),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Return a graph of enrichment nodes with prerequisite and forward links.

    This builds a graph from the ``prereq_ids`` and ``forward_node_ids``
    columns of ``EnrichmentContent`` — much richer than the Neo4j graph.
    """
    from sqlalchemy import select

    query = select(EnrichmentContent)
    if subject:
        query = query.where(EnrichmentContent.subject == subject)
    if class_level is not None:
        query = query.where(EnrichmentContent.class_level == class_level)
    query = query.order_by(EnrichmentContent.class_level, EnrichmentContent.subject)
    query = query.limit(limit)

    result = await db.execute(query)
    nodes = result.scalars().all()

    # Build a set of valid node_ids for filtering links
    valid_ids = {n.node_id for n in nodes}

    graph_nodes = []
    for n in nodes:
        graph_nodes.append({
            "id": n.node_id,
            "node_id": n.node_id,
            "label": n.title,
            "subject": n.subject,
            "class_level": n.class_level,
            "chapter": n.chapter,
            "difficulty": n.difficulty,
            "cognitive_level": n.cognitive_level,
        })

    # Build links from prereq_ids (prereq -> node) and forward_node_ids (node -> forward)
    links = []
    seen = set()
    for n in nodes:
        for prereq_id in (n.prereq_ids or []):
            if prereq_id in valid_ids:
                key = (prereq_id, n.node_id)
                if key not in seen:
                    links.append({"source": prereq_id, "target": n.node_id, "type": "prereq"})
                    seen.add(key)
        for fwd_id in (n.forward_node_ids or []):
            if fwd_id in valid_ids:
                key = (n.node_id, fwd_id)
                if key not in seen:
                    links.append({"source": n.node_id, "target": fwd_id, "type": "forward"})
                    seen.add(key)

    return {"nodes": graph_nodes, "links": links}
