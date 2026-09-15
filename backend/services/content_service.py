"""Content service for querying CISCE content.

Combines Neo4j knowledge graph data (subjects, classes, topics, prerequisites)
with file-based lesson content (markdown content nodes from D:\\platform\\organized).
This gives students a complete browsing and learning experience.
"""
from __future__ import annotations

import logging
import os
from pathlib import Path
from typing import Any, Optional

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)

# Path to organized content files
ORGANIZED_DIR = Path(os.getenv(
    "ORGANIZED_CONTENT_DIR",
    r"D:\platform\organized"
))

# Subject display name mapping
SUBJECT_DISPLAY = {
    "maths": "Mathematics",
    "physics": "Physics",
    "chem": "Chemistry",
    "bio": "Biology",
    "biology": "Biology",
    "english": "English",
    "hindi": "Hindi",
    "histciv": "History & Civics",
    "geo": "Geography",
    "econ": "Economics",
    "econapp": "Economics Applications",
    "commerce": "Commerce",
    "comm": "Commercial Studies",
    "commapp": "Commercial Applications",
    "commstud": "Communication Studies",
    "acc": "Accountancy",
    "bs": "Business Studies",
    "cs": "Computer Science",
    "computer": "Computer Applications",
    "appmath": "Applications of Mathematics",
    "evs": "Environmental Science",
    "biotech": "Biotechnology",
    "home": "Home Science",
    "legal": "Legal Studies",
    "massmedia": "Mass Media & Communication",
    "pol": "Political Science",
    "psy": "Psychology",
    "soc": "Sociology",
    "art": "Art",
    "pe": "Physical Education",
    "robotics": "Robotics & AI",
    "sci": "Science",
    "sst": "Social Studies",
}


def _get_neo4j_driver():
    """Get a Neo4j driver lazily."""
    try:
        from neo4j import GraphDatabase
        uri = os.getenv("NEO4J_URI", "bolt://localhost:7687")
        user = os.getenv("NEO4J_USER", "neo4j")
        password = os.getenv("NEO4J_PASSWORD", "dream_neo4j_2024")
        return GraphDatabase.driver(uri, auth=(user, password))
    except Exception as e:
        logger.warning("Neo4j not available: %s", e)
        return None


class ContentService:
    """Service for querying CISCE content from Neo4j + file system."""

    def __init__(self, db: AsyncSession = None):
        self._db = db
        self._driver = None

    def _session(self):
        if self._driver is None:
            self._driver = _get_neo4j_driver()
        if self._driver is None:
            return None
        return self._driver.session()

    async def get_all_subjects(self) -> list[dict[str, Any]]:
        """Get all distinct subjects from the Neo4j knowledge graph."""
        subjects = []
        try:
            sess = self._session()
            if sess is None:
                raise RuntimeError("Neo4j not available")
            # Get distinct subjects from Subject nodes
            result = sess.run("""
                MATCH (s:Subject)
                RETURN s.subject as subject, s.class_level as class_level,
                       s.board as board, s.subject_key as subject_key
                ORDER BY s.subject, s.class_level
            """)
            # Group by subject
            subject_map: dict[str, dict[str, Any]] = {}
            for r in result:
                subj = r["subject"]
                if subj is None:
                    continue
                if subj not in subject_map:
                    subject_map[subj] = {
                        "slug": subj,
                        "name": SUBJECT_DISPLAY.get(subj, subj.title()),
                        "description": f"CISCE {SUBJECT_DISPLAY.get(subj, subj.title())} curriculum",
                        "icon_url": None,
                        "chapter_count": 0,
                        "class_levels": [],
                    }
                if r["class_level"] is not None:
                    subject_map[subj]["class_levels"].append(str(r["class_level"]))

            # Get chapter counts per subject
            result = sess.run("""
                MATCH (c:Chapter)
                RETURN c.subject as subject, count(distinct c) as chapter_count
            """)
            for r in result:
                subj = r["subject"]
                if subj in subject_map:
                    subject_map[subj]["chapter_count"] = r["chapter_count"]

            sess.close()
            subjects = list(subject_map.values())
            # Sort by name
            subjects.sort(key=lambda s: s["name"])
        except Exception as e:
            logger.error("Failed to fetch subjects from Neo4j: %s", e)
            # Fallback to file system
            subjects = self._get_subjects_from_filesystem()
        return subjects

    def _get_subjects_from_filesystem(self) -> list[dict[str, Any]]:
        """Fallback: get subjects from the organized directory structure."""
        subjects = []
        if ORGANIZED_DIR.exists():
            for d in sorted(ORGANIZED_DIR.iterdir()):
                if d.is_dir() and not d.name.startswith("_"):
                    class_levels = []
                    for cd in d.iterdir():
                        if cd.is_dir() and cd.name.startswith("class"):
                            class_levels.append(cd.name.replace("class", ""))
                    subjects.append({
                        "slug": d.name,
                        "name": SUBJECT_DISPLAY.get(d.name, d.name.title()),
                        "description": f"CISCE {SUBJECT_DISPLAY.get(d.name, d.name.title())} curriculum",
                        "icon_url": None,
                        "chapter_count": 0,
                        "class_levels": sorted(class_levels),
                    })
        return subjects

    async def get_classes_for_subject(self, subject: str) -> list[dict[str, Any]]:
        """Get all class levels available for a subject."""
        classes = []
        try:
            sess = self._session()
            if sess is None:
                raise RuntimeError("Neo4j not available")
            result = sess.run("""
                MATCH (s:Subject {subject: $subject})
                RETURN s.class_level as class_level
                ORDER BY s.class_level
            """, subject=subject)
            for r in result:
                cl = r["class_level"]
                if cl is not None:
                    classes.append({
                        "level": str(cl),
                        "label": f"Class {cl}",
                        "syllabus_code": None,
                    })
            sess.close()
            if not classes:
                classes = [
                    {"level": str(c), "label": f"Class {c}", "syllabus_code": None}
                    for c in range(1, 13)
                ]
        except Exception as e:
            logger.error("Failed to fetch classes for %s: %s", subject, e)
            classes = [
                {"level": str(c), "label": f"Class {c}", "syllabus_code": None}
                for c in range(1, 13)
            ]
        return classes

    async def get_nodes_for_class(self, subject: str, class_level: int) -> list[dict[str, Any]]:
        """Get all content nodes (topics) for a subject and class level."""
        nodes = []
        try:
            sess = self._session()
            if sess is None:
                raise RuntimeError("Neo4j not available")
            result = sess.run("""
                MATCH (n:KnowledgeNode)
                WHERE n.subject = $subject AND n.class_level = $class_level
                RETURN n.node_id as node_id, n.topic as topic,
                       n.chapter as chapter, n.difficulty as difficulty,
                       n.estimated_time as estimated_time,
                       n.is_root as is_root,
                       n.prerequisite_node_ids as prereqs
                ORDER BY n.node_id
            """, subject=subject, class_level=class_level)
            for r in result:
                nodes.append({
                    "node_id": r["node_id"],
                    "name": r["topic"] or r["node_id"],
                    "subject": subject,
                    "class_level": class_level,
                    "type": "topic",
                    "chapter": r["chapter"],
                    "difficulty": r["difficulty"],
                    "estimated_time": r["estimated_time"],
                    "is_root": r["is_root"],
                    "prerequisites": r["prereqs"] or [],
                    "description": r["topic"] or "",
                })
            sess.close()
        except Exception as e:
            logger.error("Failed to fetch nodes: %s", e)
        return nodes

    async def get_lesson(self, node_id: str) -> dict[str, Any]:
        """Get a lesson for a specific node — combines graph metadata with markdown content."""
        lesson = {}
        try:
            sess = self._session()
            if sess is None:
                raise RuntimeError("Neo4j not available")
            result = sess.run("""
                MATCH (n:KnowledgeNode {node_id: $node_id})
                RETURN n
            """, node_id=node_id)
            record = result.single()
            sess.close()
            if record:
                node = dict(record["n"])
                # Try to load markdown content
                md_content = self._load_markdown_content(node.get("node_id", node_id))

                # Parse markdown into sections
                sections = self._parse_markdown_sections(md_content) if md_content else []

                lesson = {
                    "node_id": node.get("node_id", node_id),
                    "title": node.get("topic", node_id),
                    "intro_paragraph": node.get("content_snippet", ""),
                    "sections": sections,
                    "summary_notes": None,
                    "related_nodes": node.get("prerequisite_node_ids", []),
                    # Extra fields for internal use
                    "subject": node.get("subject", ""),
                    "class_level": node.get("class_level", 0),
                    "chapter": node.get("chapter", ""),
                    "difficulty": node.get("difficulty", ""),
                    "estimated_time": node.get("estimated_time", 30),
                    "content": md_content,
                }
        except Exception as e:
            logger.error("Failed to fetch lesson for %s: %s", node_id, e)

        return lesson

    def _parse_markdown_sections(self, md_content: str) -> list[dict[str, Any]]:
        """Parse markdown content into lesson sections by ## headers."""
        if not md_content:
            return []
        sections = []
        current_title = "Introduction"
        current_body = []
        lines = md_content.split("\n")
        in_frontmatter = False
        order = 0

        for line in lines:
            # Skip YAML frontmatter
            if line.strip() == "---":
                in_frontmatter = not in_frontmatter
                continue
            if in_frontmatter:
                continue
            # Detect ## headers
            if line.startswith("## "):
                if current_body:
                    body_md = "\n".join(current_body).strip()
                    sections.append({
                        "section_id": f"sec_{order}",
                        "heading": current_title,
                        "order": order,
                        "content_html": "",  # HTML not generated yet
                        "content_markdown": body_md,
                        "illustrations": [],
                        "worked_examples": [],
                    })
                    order += 1
                current_title = line[3:].strip()
                current_body = []
            else:
                current_body.append(line)

        # Add the last section
        if current_body:
            body_md = "\n".join(current_body).strip()
            sections.append({
                "section_id": f"sec_{order}",
                "heading": current_title,
                "order": order,
                "content_html": "",
                "content_markdown": body_md,
                "illustrations": [],
                "worked_examples": [],
            })

        return sections

    def _load_markdown_content(self, node_id: str) -> str:
        """Load the markdown content file for a node_id."""
        # node_id format: c10_math_001
        # file path: organized/maths/class10/content_nodes/c10_math_001.md
        try:
            # Parse node_id to find subject and class
            parts = node_id.split("_")
            if len(parts) >= 3:
                class_num = parts[0].lstrip("c")
                subject = parts[1]
                # Try to find the file
                file_path = ORGANIZED_DIR / subject / f"class{class_num}" / "content_nodes" / f"{node_id}.md"
                if file_path.exists():
                    return file_path.read_text(encoding="utf-8", errors="replace")
                # Try alternate subject names
                for subj_dir in ORGANIZED_DIR.iterdir():
                    if not subj_dir.is_dir():
                        continue
                    file_path = subj_dir / f"class{class_num}" / "content_nodes" / f"{node_id}.md"
                    if file_path.exists():
                        return file_path.read_text(encoding="utf-8", errors="replace")
        except Exception as e:
            logger.debug("Could not load markdown for %s: %s", node_id, e)
        return ""

    async def get_enrichment(self, node_id: str) -> dict[str, Any]:
        """Get enrichment content for a specific node."""
        files = []
        try:
            # Parse node_id
            parts = node_id.split("_")
            if len(parts) >= 3:
                class_num = parts[0].lstrip("c")
                subject = parts[1]
                enrichment_dir = ORGANIZED_DIR / subject / f"class{class_num}" / "enrichment"
                if enrichment_dir.exists():
                    for f in enrichment_dir.iterdir():
                        if f.is_file():
                            files.append({
                                "file_path": str(f),
                                "file_type": f.suffix.lstrip("."),
                                "subject": subject,
                                "class_level": int(class_num) if class_num.isdigit() else 0,
                            })
        except Exception as e:
            logger.error("Failed to fetch enrichment for %s: %s", node_id, e)
        return {"node_id": node_id, "files": files}

    async def search_content(self, query: str, limit: int = 20) -> list[dict[str, Any]]:
        """Search content by text query across the knowledge graph."""
        results = []
        try:
            sess = self._session()
            if sess is None:
                raise RuntimeError("Neo4j not available")
            result = sess.run("""
                MATCH (n:KnowledgeNode)
                WHERE n.topic CONTAINS $search_query OR n.content_snippet CONTAINS $search_query
                RETURN n.node_id as node_id, n.topic as topic,
                       n.subject as subject, n.class_level as class_level,
                       n.chapter as chapter, n.difficulty as difficulty
                LIMIT $result_limit
            """, search_query=query, result_limit=limit)
            for r in result:
                results.append({
                    "node_id": r["node_id"],
                    "name": r["topic"] or r["node_id"],
                    "subject": r["subject"],
                    "class_level": r["class_level"],
                    "type": "topic",
                    "chapter": r["chapter"],
                    "difficulty": r["difficulty"],
                    "description": r["topic"] or "",
                })
            sess.close()
        except Exception as e:
            logger.error("Failed to search content: %s", e)
        return results

    def close(self):
        if self._driver:
            self._driver.close()
            self._driver = None

    # =================================================================== #
    # SQL-backed facade used by backend/routers/content.py and
    # backend/services/progress_service.py.
    #
    # These are staticmethods querying the canonical SQLAlchemy models
    # (backend.models.content / backend.models.enrichment).  The router
    # calls e.g. ContentService.get_subjects(db, ...); previously none of
    # these existed, so every content route raised AttributeError (500).
    # =================================================================== #

    @staticmethod
    async def get_subjects(
        db, board: Optional[str] = None, class_level: Optional[int] = None
    ) -> list[Any]:
        from sqlalchemy import select
        from backend.models.content import Subject

        query = select(Subject)
        if board:
            query = query.where(Subject.board == board)
        if class_level is not None:
            query = query.where(Subject.class_level == class_level)
        query = query.order_by(Subject.class_level, Subject.name)
        result = await db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    async def get_knowledge_graph(
        db, board: Optional[str] = None, class_level: Optional[int] = None
    ) -> dict[str, Any]:
        from sqlalchemy import select
        from backend.models.content import KnowledgeNodeModel

        query = select(KnowledgeNodeModel)
        if board and hasattr(KnowledgeNodeModel, "board"):
            query = query.where(KnowledgeNodeModel.board == board)
        if class_level is not None:
            query = query.where(KnowledgeNodeModel.class_level == class_level)
        query = query.order_by(KnowledgeNodeModel.class_level, KnowledgeNodeModel.node_id)
        result = await db.execute(query)
        nodes = list(result.scalars().all())

        graph_nodes = [
            {
                "id": str(n.id),
                "node_id": n.node_id,
                "label": n.label,
                "description": n.description or "",
                "subject": n.subject,
                "class_level": n.class_level,
                "chapter": n.chapter or "",
                "node_type": n.node_type,
                "simplified_content": n.simplified_content,
                "prerequisites": n.prerequisites or [],
                "forward_nodes": n.forward_nodes or [],
                "mastery_probability": n.mastery_probability or 0.0,
                "difficulty": n.difficulty or "medium",
                "estimated_time": n.estimated_time or 30,
            }
            for n in nodes
        ]

        valid_ids = {n.node_id for n in nodes}
        links = []
        seen: set[tuple[str, str]] = set()
        for n in nodes:
            for prereq in (n.prerequisites or []):
                if prereq in valid_ids and (prereq, n.node_id) not in seen:
                    links.append({"source": prereq, "target": n.node_id, "type": "prerequisite"})
                    seen.add((prereq, n.node_id))
        return {"nodes": graph_nodes, "links": links}

    @staticmethod
    async def get_node(db, node_id: str) -> Any:
        from sqlalchemy import select
        from backend.models.content import KnowledgeNodeModel

        result = await db.execute(
            select(KnowledgeNodeModel).where(KnowledgeNodeModel.node_id == node_id)
        )
        node = result.scalar_one_or_none()
        if node is None:
            raise ValueError(f"Node '{node_id}' not found")
        return node

    @staticmethod
    async def get_node_content(db, node_id: str) -> list[Any]:
        from sqlalchemy import select
        from backend.models.content import ContentBundle, KnowledgeNodeModel

        node = (await db.execute(
            select(KnowledgeNodeModel).where(KnowledgeNodeModel.node_id == node_id)
        )).scalar_one_or_none()
        if node is None:
            raise ValueError(f"Node '{node_id}' not found")
        result = await db.execute(
            select(ContentBundle).where(ContentBundle.node_id == node.id)
        )
        return list(result.scalars().all())

    @staticmethod
    async def get_recommended_lessons(db, user_id: str) -> list[dict[str, Any]]:
        """Recommend up to 20 nodes from the student's class level."""
        from sqlalchemy import select
        from backend.models.content import KnowledgeNodeModel
        from backend.models.user import User

        class_level: Optional[int] = None
        try:
            user = (await db.execute(
                select(User).where(User.id == user_id)
            )).scalar_one_or_none()
            if user is not None and user.class_level:
                class_level = user.class_level
        except Exception:
            pass

        query = select(KnowledgeNodeModel)
        if class_level is not None:
            query = query.where(KnowledgeNodeModel.class_level == class_level)
        query = query.order_by(KnowledgeNodeModel.subject, KnowledgeNodeModel.node_id).limit(20)
        nodes = (await db.execute(query)).scalars().all()

        return [
            {
                "node_id": n.node_id,
                "subject": n.subject,
                "topic": n.label,
                "chapter": n.chapter or "",
                "progress": int((n.mastery_probability or 0.0) * 100),
                "difficulty": n.difficulty or "medium",
                "estimated_time": n.estimated_time or 30,
                "icon": "book",
            }
            for n in nodes
        ]

    @staticmethod
    async def search_nodes(db, q: str, limit: int = 50) -> list[Any]:
        from sqlalchemy import select
        from backend.models.content import KnowledgeNodeModel

        pattern = f"%{q}%"
        result = await db.execute(
            select(KnowledgeNodeModel)
            .where(
                (KnowledgeNodeModel.label.ilike(pattern))
                | (KnowledgeNodeModel.node_id.ilike(pattern))
                | (KnowledgeNodeModel.description.ilike(pattern))
            )
            .limit(limit)
        )
        return list(result.scalars().all())

    @staticmethod
    async def get_nodes_by_subject(
        db, subject: str, class_level: Optional[int] = None
    ) -> list[Any]:
        from sqlalchemy import select
        from backend.models.content import KnowledgeNodeModel

        query = select(KnowledgeNodeModel).where(
            (KnowledgeNodeModel.subject == subject)
            | (KnowledgeNodeModel.subject.ilike(f"%{subject}%"))
        )
        if class_level is not None:
            query = query.where(KnowledgeNodeModel.class_level == class_level)
        query = query.order_by(KnowledgeNodeModel.node_id)
        return list((await db.execute(query)).scalars().all())

    @staticmethod
    async def get_enrichment_list(
        db,
        subject: Optional[str] = None,
        class_level: Optional[int] = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Any], int]:
        from sqlalchemy import select, func
        from backend.models.enrichment import EnrichmentContent

        query = select(EnrichmentContent)
        count_query = select(func.count(EnrichmentContent.id))
        if subject:
            query = query.where(EnrichmentContent.subject == subject)
            count_query = count_query.where(EnrichmentContent.subject == subject)
        if class_level is not None:
            query = query.where(EnrichmentContent.class_level == class_level)
            count_query = count_query.where(EnrichmentContent.class_level == class_level)
        query = query.order_by(EnrichmentContent.class_level, EnrichmentContent.subject)
        query = query.limit(limit).offset(offset)
        nodes = (await db.execute(query)).scalars().all()
        total = (await db.execute(count_query)).scalar() or 0
        return list(nodes), int(total)

    @staticmethod
    async def get_enrichment(db, node_id: str) -> Any:
        """Full enrichment record for a node (raises ValueError if absent)."""
        from sqlalchemy import select
        from backend.models.enrichment import EnrichmentContent

        result = await db.execute(
            select(EnrichmentContent).where(EnrichmentContent.node_id == node_id)
        )
        content = result.scalar_one_or_none()
        if content is None:
            raise ValueError(f"No enrichment content for node '{node_id}'")
        return content

    @staticmethod
    async def get_enrichment_field(db, node_id: str, field: str) -> Any:
        from backend.models.enrichment import EnrichmentContent

        allowed = {
            "definition", "text_walkthrough", "eli5", "common_misconception",
            "examples", "cognitive_level", "mastery_criteria", "scope_boundary",
            "diagnostic_questions", "on_failure", "difficulty", "chapter",
            "prereq_ids", "depth_prereq_ids", "forward_node_ids",
        }
        if field not in allowed:
            raise ValueError(f"Unknown enrichment field '{field}'")
        result = await db.execute(
            select(EnrichmentContent).where(EnrichmentContent.node_id == node_id)
        )
        content = result.scalar_one_or_none()
        if content is None:
            raise ValueError(f"No enrichment content for node '{node_id}'")
        return getattr(content, field, None)

    @staticmethod
    async def search_enrichment(
        db, q: str, limit: int = 20
    ) -> list[Any]:
        from sqlalchemy import select
        from backend.models.enrichment import EnrichmentContent

        pattern = f"%{q}%"
        result = await db.execute(
            select(EnrichmentContent)
            .where(
                (EnrichmentContent.title.ilike(pattern))
                | (EnrichmentContent.definition.ilike(pattern))
                | (EnrichmentContent.eli5.ilike(pattern))
            )
            .limit(limit)
        )
        return list(result.scalars().all())

    @staticmethod
    async def get_questions_for_class(
        db,
        subject: str,
        class_level: int,
        source_type: Optional[str] = None,
        question_type: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> tuple[list[Any], int]:
        from sqlalchemy import select, func
        from backend.models.enrichment import BoardQuestion

        query = select(BoardQuestion).where(
            BoardQuestion.subject == subject,
            BoardQuestion.class_level == class_level,
        )
        count_query = select(func.count(BoardQuestion.id)).where(
            BoardQuestion.subject == subject,
            BoardQuestion.class_level == class_level,
        )
        if source_type:
            query = query.where(BoardQuestion.source_type == source_type)
            count_query = count_query.where(BoardQuestion.source_type == source_type)
        if question_type:
            query = query.where(BoardQuestion.question_type == question_type)
            count_query = count_query.where(BoardQuestion.question_type == question_type)
        query = query.order_by(BoardQuestion.question_number).limit(limit).offset(offset)
        questions = (await db.execute(query)).scalars().all()
        total = (await db.execute(count_query)).scalar() or 0
        return list(questions), int(total)

    @staticmethod
    async def get_questions_for_node(
        db, node_id: str, limit: int = 20
    ) -> list[Any]:
        from sqlalchemy import select
        from sqlalchemy.orm import InstrumentedAttribute  # noqa: F401
        from backend.models.enrichment import BoardQuestion

        # node_tags is a JSON list of node_id strings; cast to string so the
        # filter works identically on postgres and sqlite.
        from sqlalchemy import String as _String, cast as _cast

        result = await db.execute(
            select(BoardQuestion)
            .where(_cast(BoardQuestion.node_tags, _String).ilike(f'%"{node_id}"%'))
            .limit(limit)
        )
        return list(result.scalars().all())

    @staticmethod
    async def get_class_level_content(
        db,
        subject: Optional[str] = None,
        class_level: Optional[int] = None,
        content_type: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> tuple[list[Any], int]:
        from sqlalchemy import select, func
        from backend.models.enrichment import ClassLevelContent

        query = select(ClassLevelContent)
        count_query = select(func.count(ClassLevelContent.id))
        if subject:
            query = query.where(ClassLevelContent.target_subject == subject)
            count_query = count_query.where(ClassLevelContent.target_subject == subject)
        if content_type:
            query = query.where(ClassLevelContent.content_type == content_type)
            count_query = count_query.where(ClassLevelContent.content_type == content_type)
        # target_class is a JSON list like [10] or [1,2,3,4,5]; cast to
        # string so the LIKE filter is portable across dialects.
        if class_level is not None:
            from sqlalchemy import String as _String, cast as _cast

            cond = _cast(ClassLevelContent.target_class, _String).ilike(f"%{class_level}%")
            query = query.where(cond)
            count_query = count_query.where(cond)
        query = query.order_by(ClassLevelContent.title).limit(limit).offset(offset)
        items = (await db.execute(query)).scalars().all()
        total = (await db.execute(count_query)).scalar() or 0
        return list(items), int(total)
