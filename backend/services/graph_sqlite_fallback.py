"""SQLite fallback for the knowledge-graph service.

When Neo4j is unreachable, ``GraphService``'s static facades degrade to the
platform database instead of returning empty payloads. The SQLite graph
representation is the ``knowledge_nodes`` table
(``backend.models.content.KnowledgeNodeModel``): each row carries
``prerequisites`` / ``forward_nodes`` JSON lists which act as REQUIRES
edges (``node -REQUIRES-> prerequisite``).

Seed/maintain the table with ``python -m backend.tools.seed_graph_sqlite``.

This module is intentionally self-contained (no imports from
``backend.database``) so it also works from the legacy
``services.graph_service`` import path.
"""

from __future__ import annotations

import json
import logging
import os
from typing import Any, Optional

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

logger = logging.getLogger(__name__)

# --------------------------------------------------------------------------- #
# Engine management
# --------------------------------------------------------------------------- #
_engine = None
_sessionmaker = None


def _resolve_database_url() -> str:
    """Resolve the platform database URL (same precedence as backend.config)."""
    for name in ("PLATFORM_DATABASE_URL", "DATABASE_URL", "POSTGRES_URL"):
        val = os.environ.get(name, "")
        if val:
            return val
    try:
        from backend.config import get_settings

        url = get_settings().database_url
        if url:
            return url
    except Exception:  # pragma: no cover - settings optional here
        pass
    return "sqlite+aiosqlite:///./backend_local.db"


def _get_sessionmaker():
    global _engine, _sessionmaker
    if _sessionmaker is None:
        url = _resolve_database_url()
        _engine = create_async_engine(url, pool_pre_ping=True)
        _sessionmaker = sessionmaker(
            _engine, class_=AsyncSession, expire_on_commit=False
        )
    return _sessionmaker


async def dispose() -> None:
    """Dispose the fallback engine (best-effort, used by tests/shutdown)."""
    global _engine, _sessionmaker
    if _engine is not None:
        try:
            await _engine.dispose()
        except Exception:  # pragma: no cover
            pass
    _engine = None
    _sessionmaker = None


# --------------------------------------------------------------------------- #
# Data loading helpers
# --------------------------------------------------------------------------- #
def _parse_json_list(raw: Any) -> list[str]:
    if raw is None:
        return []
    if isinstance(raw, list):
        return [str(x) for x in raw if x]
    if isinstance(raw, str):
        txt = raw.strip()
        if not txt or txt.lower() == "null":
            return []
        try:
            parsed = json.loads(txt)
        except (ValueError, TypeError):
            return []
        if isinstance(parsed, list):
            return [str(x) for x in parsed if x]
    return []


async def _load_nodes() -> dict[str, dict[str, Any]]:
    """Load the full knowledge_nodes table into a dict keyed by node_id."""
    sql = text(
        """
        SELECT node_id, label, description, subject, class_level, chapter,
               node_type, simplified_content, prerequisites, forward_nodes,
               difficulty, estimated_time
        FROM knowledge_nodes
        """
    )
    sessionmaker = _get_sessionmaker()
    try:
        async with sessionmaker() as session:
            result = await session.execute(sql)
            rows = result.mappings().all()
    except Exception as e:
        logger.warning("graph sqlite fallback unavailable: %s", e)
        return {}

    nodes: dict[str, dict[str, Any]] = {}
    for row in rows:
        node_id = row["node_id"]
        nodes[node_id] = {
            "node_id": node_id,
            "label": row["label"] or node_id,
            "description": row["description"] or "",
            "subject": row["subject"] or "",
            "class_level": row["class_level"],
            "chapter": row["chapter"],
            "node_type": row["node_type"] or "topic",
            "simplified_content": row["simplified_content"] or "",
            "prerequisites": _parse_json_list(row["prerequisites"]),
            "forward_nodes": _parse_json_list(row["forward_nodes"]),
            "difficulty": row["difficulty"],
            "estimated_time": row["estimated_time"],
        }
    return nodes


# --------------------------------------------------------------------------- #
# Formatting (shapes mirror the Neo4j instance methods in GraphService)
# --------------------------------------------------------------------------- #
def _format_node_brief(node: dict[str, Any]) -> dict[str, Any]:
    return {
        "node_id": node["node_id"],
        "name": node["label"],
        "node_type": "topic",
        "subject": node["subject"],
        "class_level": str(node["class_level"]),
        "difficulty": node["difficulty"],
        "estimated_minutes": node["estimated_time"],
        "metadata": {
            "chapter": node["chapter"],
            "is_root": not node["prerequisites"],
            "prerequisites": node["prerequisites"],
        },
    }


async def available() -> bool:
    """True when the SQLite graph has at least one node."""
    return bool(await _load_nodes())


async def get_stats() -> dict[str, Any]:
    nodes = await _load_nodes()
    if not nodes:
        return {}
    edges = sum(len(n["prerequisites"]) for n in nodes.values())
    return {
        "total_nodes": len(nodes),
        "total_edges": edges,
        "labels": ["KnowledgeNode"],
        "status": "sqlite_fallback",
    }


async def get_node(node_id: str) -> Optional[dict[str, Any]]:
    nodes = await _load_nodes()
    node = nodes.get(node_id)
    if node is None:
        return None
    incoming = [
        {"source_id": nid, "target_id": node_id, "relationship_type": "REQUIRES"}
        for nid, n in nodes.items() if node_id in n["prerequisites"]
    ]
    outgoing = [
        {"source_id": node_id, "target_id": p, "relationship_type": "REQUIRES"}
        for p in node["prerequisites"] if p in nodes
    ]
    formatted = _format_node_brief(node)
    formatted["metadata"].update(
        {
            "content_snippet": node["simplified_content"] or node["description"],
            "prerequisite_reasons": {},
            "forward_reasons": {},
            "scope_constraints": [],
            "cross_subject_prereqs": [],
            "cross_subject_reasons": {},
        }
    )
    return {
        "node": formatted,
        "incoming_relationships": incoming,
        "outgoing_relationships": outgoing,
    }


async def get_nodes_by_class(
    class_level: Any, subject: Optional[str] = None
) -> list[dict[str, Any]]:
    nodes = await _load_nodes()
    try:
        want = int(class_level)
    except (TypeError, ValueError):
        want = 0
    out = []
    for node in nodes.values():
        if node["class_level"] != want:
            continue
        if subject and node["subject"] != subject:
            continue
        item = {
            "node_id": node["node_id"],
            "name": node["label"],
            "chapter": node["chapter"],
            "difficulty": node["difficulty"],
        }
        if not subject:
            item["subject"] = node["subject"]
        out.append(item)
    out.sort(key=lambda n: (n.get("subject") or "", n["node_id"]))
    return out


async def search_nodes(query: str, limit: int = 20) -> list[dict[str, Any]]:
    q = (query or "").lower()
    if not q:
        return []
    nodes = await _load_nodes()
    results = []
    for node in nodes.values():
        haystack = " ".join(
            [node["label"], node["description"], node["simplified_content"]]
        ).lower()
        if q in haystack:
            results.append(
                {
                    "node_id": node["node_id"],
                    "name": node["label"],
                    "node_type": "topic",
                    "subject": node["subject"],
                    "class_level": str(node["class_level"]),
                    "difficulty": node["difficulty"],
                    "estimated_minutes": node["estimated_time"],
                    "metadata": {"chapter": node["chapter"]},
                }
            )
        if len(results) >= limit:
            break
    return results


async def get_prerequisites(
    node_id: str, max_depth: int = 5
) -> dict[str, Any]:
    nodes = await _load_nodes()
    node = nodes.get(node_id)
    if node is None:
        return {"target_node": None, "prerequisites": []}

    # BFS across REQUIRES edges (node -> its prerequisites).
    visited: set[str] = {node_id}
    frontier = [node_id]
    prerequisites: list[dict[str, Any]] = []
    depth = 0
    while frontier and depth < max(1, int(max_depth)):
        nxt: list[str] = []
        for current in frontier:
            for prereq_id in nodes.get(current, {}).get("prerequisites", []):
                if prereq_id in visited:
                    continue
                visited.add(prereq_id)
                prereq = nodes.get(prereq_id)
                if prereq is None:
                    continue
                prerequisites.append(
                    {
                        "node_id": prereq_id,
                        "name": prereq["label"],
                        "node_type": "topic",
                        "subject": prereq["subject"],
                        "class_level": str(prereq["class_level"]),
                        "difficulty": prereq["difficulty"],
                        "estimated_minutes": None,
                        "metadata": {"chapter": prereq["chapter"]},
                    }
                )
                nxt.append(prereq_id)
        frontier = nxt
        depth += 1

    return {
        "target_node": _format_node_brief(node),
        "prerequisites": prerequisites,
        "depth": max_depth,
    }


async def get_all_unlocks(
    node_id: str, max_depth: int = 10
) -> list[dict[str, Any]]:
    nodes = await _load_nodes()
    if node_id not in nodes:
        return []
    visited: set[str] = {node_id}
    frontier = [node_id]
    unlocks: list[dict[str, Any]] = []
    depth = 0
    while frontier and depth < max(1, int(max_depth)):
        nxt: list[str] = []
        for current in frontier:
            for follower_id in nodes.get(current, {}).get("forward_nodes", []):
                if follower_id in visited:
                    continue
                visited.add(follower_id)
                follower = nodes.get(follower_id)
                if follower is None:
                    continue
                unlocks.append(
                    {
                        "node_id": follower_id,
                        "name": follower["label"],
                        "subject": follower["subject"],
                        "difficulty": follower["difficulty"],
                    }
                )
                nxt.append(follower_id)
        frontier = nxt
        depth += 1
    return unlocks[:100]


async def get_related_nodes(node_id: str) -> list[dict[str, Any]]:
    """RELATED_TO edges are a Neo4j-only concept; SQLite has none."""
    return []


async def get_graph(subject: str, class_level: Any) -> dict[str, Any]:
    """Nodes + REQUIRES relationships for one subject/class (mirror of the
    Neo4j ``get_graph`` payload)."""
    nodes = await _load_nodes()
    try:
        want = int(class_level)
    except (TypeError, ValueError):
        want = 0
    selected = {
        nid: n
        for nid, n in nodes.items()
        if n["subject"] == subject and n["class_level"] == want
    }
    out_nodes = [_format_node_brief(n) for n in selected.values()]
    out_nodes.sort(key=lambda n: n["node_id"])
    relationships = [
        {"source_id": nid, "target_id": p, "relationship_type": "REQUIRES"}
        for nid, n in selected.items()
        for p in n["prerequisites"]
        if p in selected
    ]
    return {
        "subject": subject,
        "class_level": want,
        "nodes": out_nodes,
        "relationships": relationships,
        "edges": relationships,
    }


async def get_learning_path(
    target_node_id: str,
    mastered_node_ids: set,
    max_depth: int = 10,
) -> list[dict[str, Any]]:
    """Ordered nodes to learn: deepest prerequisites first, target last."""
    data = await get_prerequisites(target_node_id, max_depth)
    if data.get("target_node") is None:
        return []
    mastered = set(mastered_node_ids or [])
    prereqs = [p for p in data["prerequisites"] if p["node_id"] not in mastered]
    path = list(reversed(prereqs))
    target = data["target_node"]
    if target:
        path.append(target)
    return path
