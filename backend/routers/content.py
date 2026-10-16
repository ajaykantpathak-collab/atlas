"""Content router for the DREAM_APP educational platform.

Exposes endpoints for browsing subjects, the knowledge graph, individual
nodes, enrichment content (DEFINITION, TEXT_WALKTHROUGH, ELI5, etc.),
board questions, class-level content, recommendations, and search.
"""

import hashlib
import re
import time as _time
from typing import Dict, List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException, Query, status
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
from backend.services.display_scrub import scrub_display
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
# Slug layer — keep internal node ids out of public URLs
# --------------------------------------------------------------------------- #
# The learn page serves /learn/<slug> and needs two lookups:
#   GET /api/content/slugmap?ids=a,b,c  -> {node_id: {slug, title}}
#   GET /api/content/resolve/{slug}     -> {node_id, slug, title}
# Slugs are DERIVED deterministically from the enrichment title (no schema
# change, no migration): every worker iterates the enrichment table in the
# same node_id order and applies the same collision rule, so both workers —
# and restarts — always build the identical bidirectional map. A title edit
# is the only thing that can move a slug; the frontend treats any topic id
# that is not a slug as a raw node id, so old id links keep working.
_SLUG_NON_ALNUM = re.compile(r"[^a-z0-9]+")
_SLUG_CACHE_TTL = 300.0  # seconds between rebuilds
_slug_cache: Dict[str, object] = {"at": 0.0, "by_node": {}, "by_slug": {}}


def _slugify(title: str) -> str:
    s = _SLUG_NON_ALNUM.sub("-", (title or "").strip().lower()).strip("-")
    return s[:80] or "topic"


def _slug_stem(node_id: str) -> str:
    """Stable per-node disambiguator (hash() is process-randomized, md5 is
    not — the two workers must always agree)."""
    return hashlib.md5(node_id.encode("utf-8")).hexdigest()[:6]


async def _slug_maps(db: AsyncSession) -> tuple[Dict[str, dict], Dict[str, str]]:
    """Return (node_id -> {slug,title}, slug -> node_id), rebuilt at most
    once per TTL. DB failure degrades to an empty map (caller decides)."""
    now = _time.monotonic()
    if now - float(_slug_cache["at"]) < _SLUG_CACHE_TTL and _slug_cache["by_node"]:
        return _slug_cache["by_node"], _slug_cache["by_slug"]  # type: ignore[return-value]

    by_node: Dict[str, dict] = {}
    by_slug: Dict[str, str] = {}
    seen: Dict[str, str] = {}

    try:
        from sqlalchemy import select as _select

        rows = (
            await db.execute(
                _select(
                    EnrichmentContent.node_id,
                    EnrichmentContent.title,
                    EnrichmentContent.class_level,
                    EnrichmentContent.subject,
                ).order_by(EnrichmentContent.node_id)
            )
        ).all()
        from backend.services.enhanced_nodes import is_weak_title
        for node_id, title, class_level, subject in rows:
            # Degenerate stored titles ("This node covers…", markup
            # leaks) must not mint slugs — skip them so the corpus-
            # derived title fills the slot in the augment pass below.
            if not node_id or not title or is_weak_title(title):
                continue
            base = _slugify(title)
            cand = base
            if cand in seen:
                cand = _slugify(f"{base}-c{class_level}-{subject}")[:90] or base
            if cand in seen and seen[cand] != node_id:
                cand = _slugify(f"{base}-{_slug_stem(node_id)}")[:90] or base
            if cand in seen and seen[cand] != node_id:
                continue
            seen[cand] = node_id
            by_node[node_id] = {"slug": cand, "title": title}
            by_slug[cand] = node_id
            by_slug[node_id.lower()] = node_id
            by_slug[node_id.lower().replace("_", "-")] = node_id
    except Exception:
        pass

    # Augment with the full 9,000+ enhanced nodes corpus so all topics resolve
    try:
        from backend.services.enhanced_nodes import load_index, _derive_title
        idx = load_index()
        for nid, n in idx.nodes.items():
            by_slug[nid.lower()] = nid
            by_slug[nid.lower().replace("_", "-")] = nid
            if nid not in by_node:
                t = n.get("title") or _derive_title(n) or nid
                c = n.get("class") or 0
                s = n.get("subject") or ""
                base = _slugify(t)
                cand = base
                if cand in seen:
                    cand = _slugify(f"{base}-c{c}-{s}")[:90] or base
                if cand in seen and seen[cand] != nid:
                    cand = _slugify(f"{base}-{_slug_stem(nid)}")[:90] or base
                if cand in seen and seen[cand] != nid:
                    cand = _slugify(f"{base}-{nid}")[:90] or base
                seen[cand] = nid
                by_node[nid] = {"slug": cand, "title": t}
                by_slug[cand] = nid
    except Exception:
        pass

    _slug_cache["at"] = now
    _slug_cache["by_node"] = by_node
    _slug_cache["by_slug"] = by_slug
    return by_node, by_slug


async def _slugmap_entries(wanted: List[str], db: AsyncSession):
    """Shared slugmap lookup behind GET (CSV query) and POST (JSON body)."""
    if not wanted:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="ids must contain at least one node id",
        )
    if len(wanted) > 500:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="too many ids (max 500)",
        )
    try:
        by_node, _ = await _slug_maps(db)
    except Exception:
        return {}  # catalog unavailable — frontend degrades to raw ids
    return {nid: entry for nid in wanted if (entry := by_node.get(nid))}


@router.get("/slugmap")
async def slug_map(
    ids: str = Query(
        ..., min_length=1, description="Comma-separated node ids (max 500)"
    ),
    db: AsyncSession = Depends(get_db),
):
    """Map node ids to their public slugs (learn-page related links).

    Unknown ids are simply absent from the result — the caller falls back
    to the raw id. Never leaks anything beyond slug + title."""
    wanted = [i.strip() for i in ids.split(",") if i.strip()]
    return await _slugmap_entries(wanted, db)


@router.post("/slugmap")
async def slug_map_post(
    ids: List[str] = Body(..., embed=True, description="Node ids (max 500)"),
    db: AsyncSession = Depends(get_db),
):
    """Same map as GET /slugmap, with ids in a JSON body — large id sets
    overflow proxy request-target limits (431) as a query string."""
    wanted = [i.strip() for i in ids if isinstance(i, str) and i.strip()]
    return await _slugmap_entries(wanted, db)


@router.get("/resolve/{slug}")
async def resolve_slug(slug: str, db: AsyncSession = Depends(get_db)):
    """Resolve a public slug back to its internal node id (learn-page entry)."""
    clean = slug.strip().lower()
    try:
        by_node, by_slug = await _slug_maps(db)
    except Exception:
        by_node, by_slug = {}, {}

    node_id = by_slug.get(clean) or by_slug.get(clean.replace("-", "_"))

    if not node_id:
        from backend.services.enhanced_nodes import load_index
        try:
            idx = load_index()
            if clean in idx.nodes:
                node_id = clean
            elif clean.replace("-", "_") in idx.nodes:
                node_id = clean.replace("-", "_")
            else:
                hits = idx.search(clean.replace("-", " ").replace("_", " "), limit=1)
                if hits:
                    node_id = hits[0]["node_id"]
        except Exception:
            pass

    if not node_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"unknown slug: {slug!r}",
        )
    entry = by_node.get(node_id, {"title": node_id.replace("_", " ").title(), "slug": clean})
    return {
        "node_id": node_id,
        "slug": entry.get("slug", clean),
        "title": entry.get("title"),
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
        # Wave 9.8 L3: chapter open -> warm the node's bank stems.
        # Fire-and-forget; every failure is swallowed inside.
        from backend.services.prewarm import prewarm_node
        prewarm_node(node_id, {"node_id": node_id})
    except Exception:  # noqa: BLE001
        pass
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
        "english": ["engl", "english", "eng", "eng_k", "eng_w", "eng_f", "eng_v",
                    "eng_s", "eng_h", "gram", "comp"],
        "hindi": ["hin", "hin_a", "hin_v", "hin_al", "hin_ar"],
        # "comp" is English composition in this table — not computer.
        # Real computer codes: cs (11-12) + compst/comst (6-8) + compapp
        # (9-10); ip = Informatics Practices (11-12, same family).
        "computer_science": ["cs", "ip", "compst", "comst", "compapp"],
        "cs": ["cs", "ip", "compst", "comst", "compapp"],
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
    board: Optional[str] = Query(default=None),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """List enrichment content, optionally filtered by subject/class/board."""
    nodes, total = await ContentService.get_enrichment_list(
        db, subject=subject, class_level=class_level, board=board,
        limit=limit, offset=offset
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

    # Title resolver for the student-facing headings below (the corpus
    # index is a warm singleton; failure degrades to no-op scrubbing).
    try:
        from backend.services.enhanced_nodes import load_index as _load_idx
        from backend.services.display_scrub import make_title_resolver as _mtr
        _list_resolve = _mtr(_load_idx())
    except Exception:
        _list_resolve = None

    out = []
    for n in nodes:
        s = _enrichment_to_summary(n)
        # student-facing headings: scrub ids/LaTeX/markdown from the
        # corpus title and the composed chapter name
        if _list_resolve is not None:
            try:
                s.title = scrub_display(s.title, _list_resolve) or s.title
            except Exception:
                pass
        anchor = chap_anchor.get(f"{n.subject}|{n.class_level}|{n.chapter}")
        if anchor and n.chapter:
            num = str(n.chapter).lower().lstrip("ch").lstrip("0") or n.chapter
            chapter_name = ""
            if _list_resolve is not None:
                try:
                    chapter_name = scrub_display(anchor[1], _list_resolve) or ""
                except Exception:
                    chapter_name = anchor[1] or ""
            else:
                chapter_name = anchor[1] or ""
            s.chapter_title = (f"Chapter {num} · {chapter_name}"
                               if chapter_name else f"Chapter {num}")
        out.append(s)

    # The DB row's has_* flags are stale (legacy CISCE-era columns); the
    # parsed corpus index is the real source — overlay it so lists never hide
    # authored eli5/walkthrough/misconception content that actually exists.
    try:
        from backend.services.enhanced_nodes import (
            load_index as _load_idx, _derive_title as _dt,
            is_weak_title as _iwt)
        idx = _load_idx()
        for s in out:
            node = idx.get(s.node_id)
            if not node:
                continue
            # Stale/degenerate stored title -> the corpus-derived one.
            if _iwt(s.title):
                s.title = _dt(node) or s.title
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
    from backend.services.display_scrub import make_title_resolver, scrub_display
    from fastapi.responses import JSONResponse
    _scrub = scrub_display  # call sites below use the short name
    _index = load_index()
    # per-index response cache — node content is static between index
    # rebuilds, and the dict dies with the index so staleness can't leak
    _rcache = getattr(_index, "_resp_cache", None)
    if _rcache is None:
        _rcache = _index._resp_cache = {}
    _hit = _rcache.get(node_id)
    if _hit is not None:
        return JSONResponse(_hit)
    try:
        node = _index.get(node_id)
    except Exception:
        node = None

    if node is None:
        # Fallback 1: hyphen-to-underscore or vice-versa
        alt = node_id.replace("-", "_")
        try:
            node = _index.get(alt)
            if node is not None:
                node_id = alt
        except Exception:
            pass

    if node is None:
        # Fallback 2: Check if node_id was actually passed as a slug
        try:
            _, by_slug = await _slug_maps(db)
            mapped_id = by_slug.get(node_id.lower()) or by_slug.get(node_id.lower().replace("-", "_"))
            if mapped_id:
                node = _index.get(mapped_id)
                if node is not None:
                    node_id = mapped_id
        except Exception:
            pass

    if node is None:
        # Fallback 3: Query legacy enrichment_content DB table directly
        # (no fuzzy corpus search: a keyword hit would serve an unrelated node)
        from backend.models.enrichment import EnrichmentContent as _EC
        from sqlalchemy import select as _sel
        ec = (await db.execute(
            _sel(_EC).where(_EC.node_id == node_id)
        )).scalar_one_or_none()
        if ec is not None:
            return JSONResponse({
                "node_id": ec.node_id,
                "title": ec.title or ec.node_id,
                "subject": ec.subject or "",
                "class_level": ec.class_level or 0,
                "chapter": str(ec.chapter or ""),
                "definition": ec.definition or "",
                "text_walkthrough": ec.text_walkthrough or "",
                "eli5": ec.eli5 or "",
                "common_misconception": ec.common_misconception or "",
                "diagnostic_questions": ec.diagnostic_questions or [],
                "on_failure": ec.on_failure or [],
                "examples": ec.examples or "",
                "cognitive_level": ec.cognitive_level or "understand",
                "mastery_criteria": ec.mastery_criteria or "",
                "scope_boundary": ec.scope_boundary or "",
                "prereq_ids": ec.prereq_ids or [],
                "depth_prereq_ids": ec.depth_prereq_ids or [],
                "forward_node_ids": ec.forward_node_ids or [],
                "difficulty": ec.difficulty or "medium",
                "board": ec.board or "CBSE",
            })

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"no enhanced node {node_id!r}",
        )
    # Student-visible strings must never render node ids — they travel in
    # payloads as opaque fetch keys by design, but pedagogy citations like
    # "... (c11_geo_cbse_01_001)" are scrubbed at this boundary:
    # parenthesised references drop out, bare ids resolve to titles.
    _resolve = make_title_resolver(_index)
    diagnostics = node.get("diagnostics") or []
    subj = str(node.get("subject") or "").strip().capitalize()
    chap = node.get("chapter")
    from backend.services.enhanced_nodes import _derive_title, is_weak_title
    display_title = node.get("title") or _derive_title(node) or (
        f"{subj} · Chapter {chap}" if subj and chap else node_id)

    # DB carries fields the md index doesn't (examples, on_failure,
    # difficulty, depth/forward graph ids) — merge them in.
    from backend.models.enrichment import EnrichmentContent as _EC
    from sqlalchemy import select as _sel
    ec = (await db.execute(
        _sel(_EC).where(_EC.node_id == node_id))).scalar_one_or_none()

    _coach = (_index.exam_coaching_for_parent(node_id)
              if hasattr(_index, "exam_coaching_for_parent") else {})
    payload = {
        "node_id": node_id,
        # the title/chapter are student-facing headings — scrub raw LaTeX
        # ("$XY = 7\,\text{cm}$") and markdown ("**Collection of Data**")
        # exactly like the body fields (render-fix wave, 2026-10-04)
        # enrichment_content.title is legacy-loaded and can be stale/
        # degenerate ("This node covers…", "**markup**") — the live
        # corpus derivation wins whenever the row reads weak.
        "title": _scrub(
            display_title
            if (ec is None or is_weak_title(ec.title))
            else ec.title,
            _resolve),
        "subject": node.get("subject") or "",
        "class_level": node.get("class") or 0,
        "chapter": _scrub(node.get("chapter"), _resolve),
        "definition": _scrub(node.get("definition"), _resolve),
        "text_walkthrough": _scrub(node.get("walkthrough"), _resolve),
        "eli5": _scrub(node.get("eli5") or (ec.eli5 if ec else None), _resolve),
        "common_misconception": _scrub(node.get("common_misconception"), _resolve),
        "diagnostic_questions": [
            {"question": _scrub(d.get("question") or d.get("q"), _resolve),
             "answer": _scrub(d.get("answer") or d.get("a"), _resolve),
             "options": _scrub(d.get("options") or [], _resolve),
             "misconception_if_wrong": _scrub(d.get("misconception"), _resolve)}
            for d in diagnostics if isinstance(d, dict)
        ],
        "on_failure": _scrub(node.get("on_failure") or (ec.on_failure if ec else None), _resolve),
        "examples": _scrub(node.get("examples") or (ec.examples if ec else None), _resolve),
        "cognitive_level": node.get("cognitive_level"),
        "mastery_criteria": _scrub(node.get("mastery_criteria"), _resolve),
        "scope_boundary": _scrub(node.get("scope_boundary"), _resolve),
        "prereq_ids": node.get("prereq_ids") or [],
        "depth_prereq_ids": (ec.depth_prereq_ids if ec else None)
                            or node.get("depth_prereq_ids") or [],
        "forward_node_ids": (ec.forward_node_ids if ec else None)
                            or node.get("forward_node_ids") or [],
        "difficulty": (ec.difficulty if ec else None) or node.get("difficulty"),
        "board": node.get("board") or "CBSE",
        # Unlocked pedagogical assets
        "formula": node.get("formula"),
        "formula_variables": node.get("formula_variables"),
        "formula_units": node.get("formula_units"),
        "computation_type": node.get("computation_type"),
        "competency_questions": [
            {
                "index": cq.get("index", 1),
                "question": _scrub(cq.get("question"), _resolve),
                "competency": _scrub(cq.get("competency"), _resolve),
                "steps": [_scrub(s, _resolve) for s in cq.get("steps", [])],
                "answer": _scrub(cq.get("answer"), _resolve),
                "difficulty": cq.get("difficulty", "medium")
            }
            for cq in (node.get("competency_questions") or [])
        ],
        "prerequisite_reasons": {
            k: _scrub(v, _resolve) for k, v in (node.get("prerequisite_reasons") or {}).items()
        },
        "forward_reasons": {
            k: _scrub(v, _resolve) for k, v in (node.get("forward_reasons") or {}).items()
        },
        "cross_subject_reasons": {
            k: _scrub(v, _resolve) for k, v in (node.get("cross_subject_reasons") or {}).items()
        },
        "prereq_stuck": _scrub(node.get("prereq_stuck"), _resolve),
        "prereq_before": _scrub(node.get("prereq_before"), _resolve),
        "exam_shortcuts": _coach.get("shortcuts", []),
        "exam_traps": _coach.get("traps", []),
    }
    if len(_rcache) < 5000:          # bound memory; hot nodes only
        _rcache[node_id] = payload
    return JSONResponse(payload)


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
    # Same student-visible boundary as the full enrichment response: ids
    # resolve/drop, LaTeX/markdown/floats normalize — structured fields
    # are scrubbed BEFORE serialization so JSON syntax stays intact.
    from backend.services.display_scrub import make_title_resolver as _mtr
    from backend.services.enhanced_nodes import load_index as _li
    try:
        value = scrub_display(value, _mtr(_li()))
    except Exception:
        pass
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


# --------------------------------------------------------------------------- #
# Public SEO surface (WS-SEO, 2026-10-13)
# --------------------------------------------------------------------------- #
# Two unauthenticated, crawler-safe endpoints backing the public /topic/<slug>
# pages and the sitemap feed.  They serve ONLY the preview fields the owner
# approved for organic acquisition: title, breadcrumbs, definition, eli5, one
# misconception, the key formula, <=2 worked examples and <=2 FAQ pairs, plus
# related-topic links.  Board-question banks, marking schemes, competency
# questions, on-failure remediation and any premium field never leave through
# this path.  Both endpoints are anonymous by design (crawlers carry no
# session) and emit `Cache-Control: public, max-age=300`.
#
# NOTE for operators: these routes live under the shared sliding-window
# limiter (middleware/rate_limiter.py — 120 req/min per IP, constants
# DEFAULT_LIMIT/DEFAULT_WINDOW).  If Search Console reports 429s on crawl
# bursts, add "/api/content/topic" to _EXEMPT_PREFIXES there or make the
# constants env-driven — deliberately NOT loosened here pending owner call.

#: corpus subject code -> public display name (covers both corpora; audited
#: against the live index 2026-10-13 — every code below appears in
#: enhanced_nodes_index).  Unknown codes title-case as a last resort.
_SEO_SUBJECT_NAMES = {
    "acc": "Accountancy", "ca": "Computerised Accounting",
    "ai": "Artificial Intelligence", "app": "Applied Mathematics",
    "appmath": "Applied Mathematics",
    "bio": "Biology", "biology": "Biology", "biotech": "Biotechnology",
    "bs": "Business Studies", "bst": "Business Studies",
    "chem": "Chemistry", "chemistry": "Chemistry",
    "civ": "Civics", "civics": "Civics", "comm": "Commerce",
    "compapp": "Computer Applications", "compst": "Computer Studies",
    "comst": "Computer Studies", "cs": "Computer Science",
    "eco": "Economics", "econ": "Economics", "economics": "Economics",
    "eng": "English", "engl": "English", "english": "English",
    "eng_elec": "English Elective", "eng_f": "English (Flamingo)",
    "eng_h": "English (Hornbill)", "eng_k": "English (Kaleidoscope)",
    "eng_mod": "English (Writing)", "eng_s": "English (Snapshots)",
    "eng_v": "English (Vistas)", "eng_w": "English (Woven Words)",
    "envsci": "Environmental Science",
    "geo": "Geography", "geography": "Geography",
    "gram": "English Grammar",
    "hin": "Hindi", "hin_a": "Hindi", "hin_al": "Hindi",
    "hin_ar": "Hindi", "hin_ga": "Hindi", "hin_kr": "Hindi",
    "hin_ks": "Hindi", "hin_sp": "Hindi", "hin_v": "Hindi",
    "hist": "History", "history": "History", "histciv": "History & Civics",
    "hs": "Home Science", "ip": "Informatics Practices",
    "leg": "Legal Studies", "legal": "Legal Studies",
    "math": "Mathematics", "phy": "Physics", "physics": "Physics",
    "polsci": "Political Science",
    # c11_ps_* is the CBSE Political-Science book (Political Theory /
    # Indian Constitution at Work), not Physical Education — verified
    # against node definitions.
    "ps": "Political Science", "psy": "Psychology",
    "robotics": "Robotics", "soc": "Sociology", "stat": "Statistics",
}

_SEO_BOARD_NAMES = {"cbse": "CBSE", "icse": "ICSE", "isc": "ISC"}

_SEO_CACHE_TTL = 300.0  # rebuild alongside the slug-map TTL
_seo_index_cache: Dict[str, object] = {
    "at": 0.0, "rows": [], "chapters": {}, "anchors": {}, "by_id": {},
}

#: titles that are just the prettified node id (e.g. "C11 Hin Isc") — the
#: _derive_title last resort.  They can never reach a public page.
_SEO_ID_TITLE = re.compile(r"^(?:c\d{1,2}|cbse|icse|isc)\b", re.I)


def _seo_board(node: Dict) -> str:
    """Board display name; the corpus stores '' for ~2.2k legacy CBSE ids."""
    return _SEO_BOARD_NAMES.get(str(node.get("board") or "cbse").lower(), "CBSE")


def _seo_subject_name(code: str) -> str:
    return _SEO_SUBJECT_NAMES.get(
        (code or "").strip().lower(),
        (code or "").replace("_", " ").strip().title() or "General",
    )


def _seo_display_title(node: Dict, derive, weak) -> str:
    """Public-safe topic title.

    Order: corpus title -> derived-from-definition -> a deterministic
    "Subject · Chapter n · Part m" label.  The derived title is rejected
    when it is weak (fragments, markup, ellipses) or is just the
    prettified node id — internal ids never appear in public text."""
    t = (node.get("title") or "").strip()
    if not t or weak(t):
        t = (derive(node) or "").strip()
    if not t or weak(t) or _SEO_ID_TITLE.match(t):
        subj = _seo_subject_name(node.get("subject"))
        ch = node.get("chapter")
        num = node.get("node_num")
        label = f"{subj} · Chapter {ch}" if ch not in (None, "") else subj
        if isinstance(num, int) and num > 0:
            label += f" · Part {num}"
        return label
    return t


async def _seo_index(db: AsyncSession):
    """Return (rows, chapters, anchors, by_id) for the public surface.

    rows:     sitemap feed — [{id, slug, title, class_level, subject,
              board, chapter}] for every teaching node.
    chapters: (board, class, subject, chapter) -> (seq, node_id, title)
              triples sorted by node_num — powers the related rail.
    anchors:  same key -> chapter display title (first node's title).
    by_id:    node_id -> its row dict (slug + resolved title + coords).

    Titles prefer the enrichment_content row (proper-cased, reviewed)
    over the derived-from-definition one; slugs come from the shared
    ``_slug_maps`` build so /topic/<slug>, /learn links and the sitemap
    always agree byte-for-byte.  Rebuilt at most once per TTL; a
    corpus/index reload moves all four together.
    """
    now = _time.monotonic()
    if (now - float(_seo_index_cache["at"]) < _SEO_CACHE_TTL
            and _seo_index_cache["rows"]):
        return (_seo_index_cache["rows"], _seo_index_cache["chapters"],
                _seo_index_cache["anchors"], _seo_index_cache["by_id"])

    from backend.services.enhanced_nodes import (
        load_index, _derive_title, is_weak_title)

    rows: List[dict] = []
    chapters: Dict[tuple, List[tuple]] = {}
    by_id: Dict[str, dict] = {}
    try:
        by_node, _ = await _slug_maps(db)
    except Exception:
        by_node = {}
    try:
        idx = load_index()
    except Exception:
        idx = None
    if idx is not None:
        for nid, n in idx.nodes.items():
            entry = by_node.get(nid) or {}
            db_title = (entry.get("title") or "").strip()
            title = (
                db_title
                if (db_title and not is_weak_title(db_title)
                    and not _SEO_ID_TITLE.match(db_title))
                else _seo_display_title(n, _derive_title, is_weak_title)
            )
            slug = entry.get("slug") or _slugify(title)
            board = _seo_board(n)
            cls = n.get("class") or 0
            subj = (n.get("subject") or "").strip()
            chap = n.get("chapter")
            row = {
                "id": nid,
                "slug": slug,
                "title": title,
                "class_level": cls,
                "subject": subj,
                "board": board,
                "chapter": chap if isinstance(chap, int) else (
                    int(chap) if str(chap).isdigit() else str(chap or "")),
            }
            rows.append(row)
            by_id[nid] = row
            ckey = (board, cls, subj, str(chap))
            seq = n.get("node_num")
            if not isinstance(seq, int):
                try:
                    seq = int(str(nid).rsplit("_", 1)[-1])
                except (ValueError, IndexError):
                    seq = 9999
            chapters.setdefault(ckey, []).append((seq, nid, title))
    anchors: Dict[tuple, str] = {}
    for ckey, members in chapters.items():
        members.sort(key=lambda m: (m[0], m[1]))
        # chapter title = the anchor (lowest-numbered) node's title, when
        # it reads like a real name — matches the chapter_title rule used
        # by /api/content/enrichment.
        first = members[0][2] if members else ""
        anchors[ckey] = "" if (not first or is_weak_title(first)) else first

    _seo_index_cache["at"] = now
    _seo_index_cache["rows"] = rows
    _seo_index_cache["chapters"] = chapters
    _seo_index_cache["anchors"] = anchors
    _seo_index_cache["by_id"] = by_id
    return rows, chapters, anchors, by_id


@router.get("/topic-index")
async def topic_index(db: AsyncSession = Depends(get_db)):
    """Compact index of every indexable topic — the sitemap feed.

    ~20k rows across both corpora (CBSE + ICSE/ISC).  Anonymous +
    publicly cacheable; consumed by app/sitemap.ts and any crawl tooling.
    """
    from fastapi.responses import JSONResponse
    rows, _, _, _ = await _seo_index(db)
    return JSONResponse(
        {"count": len(rows), "topics": rows},
        headers={"Cache-Control": "public, max-age=300"},
    )


_SEO_EX_SPLIT = re.compile(r"\bPROBLEM\s*:", re.I)
#: worked-example body markers seen across both corpora: CBSE uses STEPS,
#: CISCE docs also carry SOLUTION / ANSWER blocks.
_SEO_SEC_SPLIT = re.compile(r"\b(STEPS|SOLUTION|ANSWER)\s*:", re.I)
_SEO_STEP_LINE = re.compile(r"^\s*[-*•]?\s*step\s*\d*\s*[.:)]?\s*", re.I)
#: summary footers that trail worked examples — not step content.
_SEO_FOOTER = re.compile(
    r"^\s*(?:REASONING|ANSWER|SOLUTION|NOTE|SOURCE|MARKS|VERDICT|CHECK)\s*:",
    re.I)


def _seo_clip(text: str, cap: int) -> str:
    """Hard length cap with a word-boundary ellipsis (never mid-word)."""
    text = (text or "").strip()
    if len(text) <= cap:
        return text
    cut = text[:cap]
    sp = cut.rfind(" ")
    return (cut[:sp] if sp > cap // 2 else cut).rstrip(",;: ") + "…"


def _seo_examples(raw: str, limit: int = 2) -> List[dict]:
    """Trim the corpus `examples` blob to `limit` worked examples.

    Corpus shape: 'PROBLEM: <text>\\n\\nSTEPS:\\n- Step 1: ...' repeated
    ~3x (CISCE docs may carry SOLUTION/ANSWER instead of STEPS).
    Serving shape: [{problem, steps[]}] — the public page renders these
    as lettered answer-book steps.  Hard caps keep the crawler payload
    small; summary footers (REASONING:, ANSWER:) are dropped."""
    out: List[dict] = []
    for chunk in _SEO_EX_SPLIT.split(raw or ""):
        chunk = chunk.strip()
        if not chunk:
            continue
        parts = _SEO_SEC_SPLIT.split(chunk, maxsplit=1)
        prob = parts[0].strip()
        steps: List[str] = []
        if len(parts) == 3:
            marker, body = parts[1].upper(), parts[2]
            if marker == "STEPS":
                for line in body.splitlines():
                    line = _SEO_STEP_LINE.sub("", line).strip()
                    if not line or _SEO_FOOTER.match(line):
                        continue
                    steps.append(_seo_clip(line, 260))
                    if len(steps) >= 8:
                        break
            else:
                # SOLUTION/ANSWER blob — serve as a single step block.
                body = body.strip()
                if body:
                    steps.append(_seo_clip(body, 900))
        if not prob:
            continue
        out.append({"problem": _seo_clip(prob, 700), "steps": steps})
        if len(out) >= limit:
            break
    return out


def _seo_faqs(diagnostics, resolver, scrub, limit: int = 2) -> List[dict]:
    """First `limit` diagnostic Q/A pairs as FAQ entries.

    The owner-approved preview shape explicitly includes a couple of
    FAQ-style pairs; diagnostics are the corpus's question-answer unit
    and are already served anonymously by /enrichment.  Everything
    beyond `limit` stays gated behind signup."""
    out = []
    for d in diagnostics or []:
        if not isinstance(d, dict):
            continue
        q = (d.get("q") or d.get("question") or "").strip()
        a = (d.get("a") or d.get("answer") or "").strip()
        if not q or not a:
            continue
        out.append({
            "question": scrub(q[:400], resolver) or q[:400],
            "answer": scrub(a[:900], resolver) or a[:900],
        })
        if len(out) >= limit:
            break
    return out


@router.get("/topic/{key}")
async def get_public_topic(key: str, db: AsyncSession = Depends(get_db)):
    """Public-safe topic payload for the /topic/<slug> SSR pages.

    ``key`` accepts a slug OR a node id (opaque fetch key — owner rule).
    Preview fields only; answer banks and premium sections are absent by
    construction, not by filter.  404 on unknown keys."""
    from fastapi.responses import JSONResponse
    from backend.services.enhanced_nodes import (
        load_index, _derive_title, is_weak_title)
    from backend.services.display_scrub import make_title_resolver, scrub_display

    idx = load_index()
    rows, chapters, anchors, by_id = await _seo_index(db)

    # per-index response cache — content is static between index rebuilds
    _pcache = getattr(idx, "_seo_page_cache", None)
    if _pcache is None:
        _pcache = idx._seo_page_cache = {}
    _hit = _pcache.get(key)
    if _hit is not None:
        return JSONResponse(_hit, headers={"Cache-Control": "public, max-age=300"})

    # -- resolve key -> node ------------------------------------------------ #
    clean = (key or "").strip().lower()
    node_id = None
    try:
        _, by_slug = await _slug_maps(db)
        node_id = by_slug.get(clean) or by_slug.get(clean.replace("-", "_"))
    except Exception:
        node_id = None
    node = idx.get(node_id) if node_id else None
    if node is None:
        node = idx.get(key) or idx.get(clean) or idx.get(clean.replace("-", "_"))
        if node is not None:
            node_id = node.get("node_id") or clean
    # No fuzzy-search fallback on the public surface: a keyword hit would
    # serve an unrelated node at a bogus URL (soft-404 / infinite URL
    # space).  Unknown keys are honest 404s — same rule the enrichment
    # endpoint applies.
    if node is None or not node_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"unknown topic: {key!r}",
        )

    resolver = make_title_resolver(idx)

    def _s(v, cap=0):
        out = scrub_display(v, resolver)
        if isinstance(out, str) and cap:
            out = _seo_clip(out, cap)
        return out

    row = by_id.get(node_id) or {}
    slug = row.get("slug") or _slugify(
        _seo_display_title(node, _derive_title, is_weak_title))
    title = _s(row.get("title") or
               _seo_display_title(node, _derive_title, is_weak_title))
    board = _seo_board(node)
    cls = node.get("class") or 0
    subj = (node.get("subject") or "").strip()
    subj_name = _seo_subject_name(subj)
    chap = node.get("chapter")
    ckey = (board, cls, subj, str(chap))
    try:
        ch_num = int(chap)
    except (TypeError, ValueError):
        ch_num = None
    chap_title = anchors.get(ckey) or ""
    chap_label = (f"Chapter {ch_num} · {chap_title}" if ch_num and chap_title
                  else f"Chapter {ch_num}" if ch_num else (chap_title or ""))

    # -- related topics: same-chapter neighbours + foundations -------------- #
    related: List[dict] = []
    members = chapters.get(ckey) or []
    pos = next((i for i, m in enumerate(members) if m[1] == node_id), -1)
    seen_rel = {node_id}
    if pos >= 0:
        window = members[max(0, pos - 3):pos] + members[pos + 1:pos + 4]
        for _, rid, rtitle in window[:6]:
            if rid in seen_rel:
                continue
            seen_rel.add(rid)
            rslug = (by_id.get(rid) or {}).get("slug") or _slugify(rtitle)
            related.append({"slug": rslug, "title": _s(rtitle) or rtitle,
                            "kind": "chapter"})
    for pid in (node.get("prereq_ids") or [])[:4]:
        if pid in seen_rel:
            continue
        pn = idx.get(pid)
        if not pn:
            continue
        ptitle = _seo_display_title(pn, _derive_title, is_weak_title)
        pslug = (by_id.get(pid) or {}).get("slug") or _slugify(ptitle)
        seen_rel.add(pid)
        related.append({"slug": pslug, "title": _s(ptitle) or ptitle,
                        "kind": "foundation"})
        if len(related) >= 10:
            break

    formula = None
    if node.get("formula"):
        formula = {
            "latex": _s(node.get("formula")),
            "variables": [
                _s(v) for v in (node.get("formula_variables") or [])
            ],
            "units": _s(node.get("formula_units")),
        }

    payload = {
        "node_id": node_id,
        "slug": slug,
        "title": title,
        "class_level": cls,
        "subject": subj,
        "subject_name": subj_name,
        "board": board,
        "chapter": ch_num if ch_num is not None else chap,
        "chapter_title": chap_title,
        "cognitive_level": node.get("cognitive_level"),
        "difficulty": node.get("difficulty"),
        "definition": _s(node.get("definition")),
        "eli5": _s(node.get("eli5")),
        "common_misconception": _s(node.get("common_misconception"), 900),
        "formula": formula,
        "examples": [
            {"problem": _s(e["problem"]) or e["problem"],
             "steps": [_s(s) or s for s in e["steps"]]}
            for e in _seo_examples(node.get("examples") or "", limit=2)
        ],
        "faqs": _seo_faqs(node.get("diagnostics"), resolver, scrub_display,
                          limit=2),
        "related": related,
        "breadcrumbs": [
            {"kind": "class", "label": f"Class {cls}"},
            {"kind": "subject", "label": subj_name},
            {"kind": "chapter", "label": chap_label or subj_name},
            {"kind": "topic", "label": title},
        ],
    }
    if len(_pcache) < 4000:          # bound memory; hot topics only
        _pcache[key] = payload
    return JSONResponse(payload,
                        headers={"Cache-Control": "public, max-age=300"})
