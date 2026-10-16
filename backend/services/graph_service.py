"""Graph service for Neo4j knowledge graph operations.

Connects to the Neo4j database and provides methods for querying
the CISCE curriculum knowledge graph.

D11 (2026-09-30): the GATING endpoints — /api/graph/gaps and
/api/graph/path (find_gaps / find_root_gaps / get_learning_path) —
filter prerequisites through the shared hard-edge classifier
(services/graph_edges): an edge A→B (A requires B) is a hard gate iff
B's class is strictly below A's OR B's subject differs.  Same-class
sibling mesh never gates.  Display endpoints (/prerequisites,
/unlocks, /visualize) keep the full edge set for chain display.
"""
from __future__ import annotations

import logging
import os
import re
from typing import Any, Optional, Tuple

from fastapi.concurrency import run_in_threadpool

try:  # package import (platform runtime)
    from backend.services import graph_edges
except ImportError:  # legacy flat import path
    from services import graph_edges  # type: ignore[no-redef]

logger = logging.getLogger(__name__)

#: a bare corpus node id ("c6_math_ch03_040") in a display-name field —
#: broadened to any lowercase slug token so unknown-id shapes are caught too
_LOOKS_LIKE_ID = re.compile(r"^[a-z0-9][a-z0-9_-]{7,}$")

try:
    from neo4j import GraphDatabase
    HAS_NEO4J = True
except ImportError:
    HAS_NEO4J = False
    logger.warning("neo4j driver not installed - graph service will be unavailable")


class GraphService:
    """Service for interacting with the Neo4j knowledge graph."""

    def __init__(
        self,
        uri: Optional[str] = None,
        user: Optional[str] = None,
        password: Optional[str] = None,
    ):
        self._uri = uri or os.getenv("PLATFORM_NEO4J_URI") or os.getenv("NEO4J_URI", "bolt://localhost:7687")
        self._user = user or os.getenv("PLATFORM_NEO4J_USER") or os.getenv("NEO4J_USER", "neo4j")
        # no literal default (lane-B audit 2026-10-15): the env must supply it
        self._password = password or os.getenv("PLATFORM_NEO4J_PASSWORD") or os.getenv("NEO4J_PASSWORD", "")
        self._driver = None

    async def check_connection(self) -> bool:
        """Check if Neo4j is reachable and return node count.

        Result is cached for 60s: this used to run a full ``count(n)`` over
        the ~15k-node graph on EVERY node read (get_node calls it first),
        on the event loop. Both problems fixed: the query is offloaded to a
        worker thread and repeated calls hit the short-lived cache."""
        if not HAS_NEO4J:
            return False
        import time as _time

        now = _time.monotonic()
        cached = getattr(self, "_conn_cache", None)
        if cached and now - cached[0] < 60.0:
            return cached[1]
        try:
            if self._driver is None:
                self._driver = GraphDatabase.driver(
                    self._uri, auth=(self._user, self._password)
                )

            def _probe() -> bool:
                with self._driver.session() as session:
                    result = session.run("MATCH (n) RETURN count(n) as count")
                    record = result.single()
                    count = record["count"] if record else 0
                    logger.info("Neo4j connected: %d nodes", count)
                    return count > 0

            ok = await run_in_threadpool(_probe)
            self._conn_cache = (now, ok)
            return ok
        except Exception as e:
            logger.error("Neo4j connection failed: %s", e)
            self._conn_cache = (now, False)
            return False

    async def get_graph(self, subject: str, class_level: Any) -> dict[str, Any]:
        """Get the knowledge graph for a subject and class level."""
        if not HAS_NEO4J:
            raise RuntimeError("Neo4j driver not available")
        # Convert class_level to int if it's a string
        if isinstance(class_level, str):
            class_level = int(class_level) if class_level.isdigit() else 0
        if self._driver is None:
            self._driver = GraphDatabase.driver(
                self._uri, auth=(self._user, self._password)
            )
        with self._driver.session() as session:
            # Get nodes for this subject/class
            result = session.run(
                """
                MATCH (n:Node)
                WHERE n.subject = $subject AND toInteger(n.class) = $class_level
                RETURN n.node_id as node_id, n.node_id as topic,
                       n.chapter as chapter, n.depth as depth
                ORDER BY n.node_id
                LIMIT 200
                """,
                subject=subject,
                class_level=class_level,
            )
            nodes = []
            for record in result:
                nodes.append({
                    "node_id": record["node_id"],
                    "name": record["topic"] or record["node_id"],
                    "node_type": "topic",
                    "subject": subject,
                    "class_level": str(class_level),
                    "difficulty": None,
                    "estimated_minutes": None,
                    "metadata": {
                        "chapter": record["chapter"],
                        "depth": record["depth"],
                    },
                })

            # Get edges (PREREQUISITE_OF relationships — corpus schema)
            result = session.run(
                """
                MATCH (a:Node)-[r:PREREQUISITE_OF]->(b:Node)
                WHERE a.subject = $subject AND toInteger(a.class) = $class_level
                RETURN a.node_id as from, b.node_id as to, type(r) as rel
                LIMIT 500
                """,
                subject=subject,
                class_level=class_level,
            )
            relationships = []
            for record in result:
                relationships.append({
                    "source_id": record["from"],
                    "target_id": record["to"],
                    "relationship_type": record["rel"],
                })

        return {
            "subject": subject,
            "class_level": class_level,
            "nodes": nodes,
            "relationships": relationships,
            "edges": relationships,  # alias for compatibility
        }

    async def _get_node_neo4j(self, node_id: str) -> dict[str, Any]:
        """Get a single node by its ID, including relationships."""
        if not HAS_NEO4J:
            raise RuntimeError("Neo4j driver not available")
        if self._driver is None:
            self._driver = GraphDatabase.driver(
                self._uri, auth=(self._user, self._password)
            )
        with self._driver.session() as session:
            result = session.run(
                "MATCH (n:Node {node_id: $node_id}) RETURN n",
                node_id=node_id,
            )
            record = result.single()
            if record:
                node = dict(record["n"])
                # Parse JSON-encoded string fields stored by the importer.
                # These are the "dead node fields" that the tutor runtime
                # needs but were never exposed before.
                import json as _json
                def _parse_json_field(raw, default):
                    """Parse a Neo4j string-encoded JSON field."""
                    if raw is None:
                        return default
                    if isinstance(raw, (list, dict)):
                        return raw
                    if isinstance(raw, str):
                        try:
                            parsed = _json.loads(raw)
                            return parsed if parsed is not None else default
                        except (ValueError, TypeError):
                            return default
                    return default
                prerequisite_reasons = _parse_json_field(
                    node.get("prerequisite_reasons"), {})
                forward_reasons = _parse_json_field(
                    node.get("forward_reasons"), {})
                scope_constraints = _parse_json_field(
                    node.get("scope_constraints"), [])
                cross_subject_prereqs = _parse_json_field(
                    node.get("cross_subject_prereqs"), [])
                cross_subject_reasons = _parse_json_field(
                    node.get("cross_subject_reasons"), {})
                # Format for the API response
                formatted_node = {
                    "node_id": node.get("node_id", node_id),
                    "name": node.get("topic") or node.get("node_id", node_id),
                    "node_type": "topic",
                    "subject": node.get("subject", ""),
                    "class_level": str(node.get("class", "")),
                    "difficulty": node.get("difficulty"),
                    "estimated_minutes": node.get("estimated_time"),
                    "metadata": {
                        "chapter": node.get("chapter"),
                        "board": node.get("board"),
                        "depth": node.get("depth"),
                        "diagnostics": node.get("diagnostics"),
                        "content_snippet": node.get("definition_snippet", ""),
                        # ── Dead node fields now wired ──
                        "prerequisite_reasons": prerequisite_reasons,
                        "forward_reasons": forward_reasons,
                        "scope_constraints": scope_constraints,
                        "cross_subject_prereqs": cross_subject_prereqs,
                        "cross_subject_reasons": cross_subject_reasons,
                    },
                }
                # Get incoming and outgoing relationships
                incoming = []
                outgoing = []
                rel_result = session.run(
                    """
                    MATCH (a:Node)-[r:PREREQUISITE_OF]->(n:Node {node_id: $node_id})
                    RETURN a.node_id as source_id, type(r) as rel_type
                    """,
                    node_id=node_id,
                )
                for r in rel_result:
                    incoming.append({
                        "source_id": r["source_id"],
                        "target_id": node_id,
                        "relationship_type": r["rel_type"],
                    })
                rel_result = session.run(
                    """
                    MATCH (n:Node {node_id: $node_id})-[r:PREREQUISITE_OF]->(b:Node)
                    RETURN b.node_id as target_id, type(r) as rel_type
                    """,
                    node_id=node_id,
                )
                for r in rel_result:
                    outgoing.append({
                        "source_id": node_id,
                        "target_id": r["target_id"],
                        "relationship_type": r["rel_type"],
                    })
                return {
                    "node": formatted_node,
                    "incoming_relationships": incoming,
                    "outgoing_relationships": outgoing,
                }
        return {}

    async def get_node_enrichment_fields(self, node_id: str) -> dict[str, Any]:
        """Fetch only the 'dead node' enrichment fields for a node.

        Returns a dict with keys:
            prerequisite_reasons, forward_reasons, scope_constraints,
            cross_subject_prereqs, cross_subject_reasons

        Falls back to empty values if Neo4j is unavailable or the node
        doesn't exist. Used by the tutor runtime to wire in pedagogical
        context without a full get_node call.
        """
        if not HAS_NEO4J:
            return {
                "prerequisite_reasons": {},
                "forward_reasons": {},
                "scope_constraints": [],
                "cross_subject_prereqs": [],
                "cross_subject_reasons": {},
            }
        if self._driver is None:
            self._driver = GraphDatabase.driver(
                self._uri, auth=(self._user, self._password)
            )
        import json as _json
        def _parse(raw, default):
            if raw is None:
                return default
            if isinstance(raw, (list, dict)):
                return raw
            if isinstance(raw, str):
                try:
                    return _json.loads(raw) or default
                except (ValueError, TypeError):
                    return default
            return default
        with self._driver.session() as session:
            result = session.run(
                """
                MATCH (n:Node {node_id: $node_id})
                RETURN n.prerequisite_reasons as pr,
                       n.forward_reasons as fr,
                       n.scope_constraints as sc,
                       n.cross_subject_prereqs as csp,
                       n.cross_subject_reasons as csr
                """,
                node_id=node_id,
            )
            record = result.single()
            if record:
                return {
                    "prerequisite_reasons": _parse(record["pr"], {}),
                    "forward_reasons": _parse(record["fr"], {}),
                    "scope_constraints": _parse(record["sc"], []),
                    "cross_subject_prereqs": _parse(record["csp"], []),
                    "cross_subject_reasons": _parse(record["csr"], {}),
                }
        return {
            "prerequisite_reasons": {},
            "forward_reasons": {},
            "scope_constraints": [],
            "cross_subject_prereqs": [],
            "cross_subject_reasons": {},
        }

    def get_node_enrichment_fields_sync(self, node_id: str) -> dict[str, Any]:
        """Synchronous version of get_node_enrichment_fields.

        Used by sync code paths (e.g. _handle_intent in tutor_service)
        that can't use ``await`` but still need the dead-node enrichment
        fields from Neo4j.
        """
        if not HAS_NEO4J:
            return {
                "prerequisite_reasons": {},
                "forward_reasons": {},
                "scope_constraints": [],
                "cross_subject_prereqs": [],
                "cross_subject_reasons": {},
            }
        if self._driver is None:
            self._driver = GraphDatabase.driver(
                self._uri, auth=(self._user, self._password)
            )
        import json as _json
        def _parse(raw, default):
            if raw is None:
                return default
            if isinstance(raw, (list, dict)):
                return raw
            if isinstance(raw, str):
                try:
                    return _json.loads(raw) or default
                except (ValueError, TypeError):
                    return default
            return default
        with self._driver.session() as session:
            result = session.run(
                """
                MATCH (n:Node {node_id: $node_id})
                RETURN n.prerequisite_reasons as pr,
                       n.forward_reasons as fr,
                       n.scope_constraints as sc,
                       n.cross_subject_prereqs as csp,
                       n.cross_subject_reasons as csr
                """,
                node_id=node_id,
            )
            record = result.single()
            if record:
                return {
                    "prerequisite_reasons": _parse(record["pr"], {}),
                    "forward_reasons": _parse(record["fr"], {}),
                    "scope_constraints": _parse(record["sc"], []),
                    "cross_subject_prereqs": _parse(record["csp"], []),
                    "cross_subject_reasons": _parse(record["csr"], {}),
                }
        return {
            "prerequisite_reasons": {},
            "forward_reasons": {},
            "scope_constraints": [],
            "cross_subject_prereqs": [],
            "cross_subject_reasons": {},
        }

    async def _get_stats_neo4j(self) -> dict[str, Any]:
        """Get graph statistics."""
        if not HAS_NEO4J:
            return {"error": "Neo4j not available"}
        if self._driver is None:
            self._driver = GraphDatabase.driver(
                self._uri, auth=(self._user, self._password)
            )
        with self._driver.session() as session:
            nodes_result = session.run("MATCH (n) RETURN count(n) as count")
            nodes_count = nodes_result.single()["count"]

            edges_result = session.run("MATCH ()-[r]->() RETURN count(r) as count")
            edges_count = edges_result.single()["count"]

            labels_result = session.run(
                "CALL db.labels() YIELD label RETURN collect(label) as labels"
            )
            labels_record = labels_result.single()
            labels = labels_record["labels"] if labels_record else []

            # Per-label breakdown so consumers can distinguish curriculum
            # nodes from Sim/catalog nodes — a single flat count hid that
            # "25k nodes" meant 20.9k curriculum + 3.8k sims (2026-10-10).
            breakdown_result = session.run(
                "MATCH (n) RETURN labels(n)[0] as lbl, count(*) as c"
            )
            breakdown = {r["lbl"]: r["c"] for r in breakdown_result}

        return {
            "total_nodes": nodes_count,
            "total_edges": edges_count,
            "labels": labels,
            "node_breakdown": breakdown,
        }

    async def get_roots(self) -> list[dict[str, Any]]:
        """Get root nodes (nodes with no incoming REQUIRES edges)."""
        if not HAS_NEO4J:
            return []
        if self._driver is None:
            self._driver = GraphDatabase.driver(
                self._uri, auth=(self._user, self._password)
            )
        with self._driver.session() as session:
            result = session.run(
                """
                MATCH (n:Node)
                WHERE NOT (n)-[:PREREQUISITE_OF]->()
                RETURN n.node_id as node_id, n.node_id as topic, n.subject as subject,
                       n.class as class_level
                LIMIT 50
                """
            )
            roots = []
            for record in result:
                roots.append({
                    "node_id": record["node_id"],
                    "name": record["topic"] or record["node_id"],
                    "subject": record["subject"],
                    "class_level": record["class_level"],
                })
        return roots

    async def get_prerequisites(self, node_id: str, max_depth: int = 5) -> dict[str, Any]:
        """Get the prerequisite chain for a node."""
        if not HAS_NEO4J:
            return {"target_node": None, "prerequisites": []}
        if self._driver is None:
            self._driver = GraphDatabase.driver(
                self._uri, auth=(self._user, self._password)
            )
        with self._driver.session() as session:
            # Get the target node
            result = session.run(
                "MATCH (n:Node {node_id: $node_id}) RETURN n",
                node_id=node_id,
            )
            record = result.single()
            if not record:
                return {"target_node": None, "prerequisites": []}
            node = dict(record["n"])
            target_node = {
                "node_id": node.get("node_id", node_id),
                "name": node.get("topic") or node.get("node_id", node_id),
                "node_type": "topic",
                "subject": node.get("subject", ""),
                "class_level": str(node.get("class", "")),
                "difficulty": node.get("difficulty"),
                "estimated_minutes": node.get("estimated_time"),
                "metadata": {"chapter": node.get("chapter"),
                             "board": node.get("board")},
            }
            # Get prerequisites via PREREQUISITE_OF (corpus edge: n requires prereq)
            # Neo4j doesn't support parameters in relationship length patterns,
            # so we use a fixed depth and limit results
            result = session.run(
                """
                MATCH (n:Node {node_id: $node_id})-[:PREREQUISITE_OF*1..5]->(prereq:Node)
                RETURN DISTINCT prereq.node_id as node_id, prereq.subject as subject,
                       prereq.class as class_level, prereq.chapter as chapter,
                       prereq.definition_snippet as snippet
                LIMIT 50
                """,
                node_id=node_id,
            )
            prerequisites = []
            for r in result:
                prerequisites.append({
                    "node_id": r["node_id"],
                    "name": (r["snippet"] or r["node_id"])[:80],
                    "node_type": "topic",
                    "subject": r["subject"],
                    "class_level": str(r["class_level"]),
                    "difficulty": None,
                    "estimated_minutes": None,
                    "metadata": {"chapter": r["chapter"]},
                })
            return {
                "target_node": target_node,
                "prerequisites": prerequisites,
                "depth": max_depth,
            }

    async def search(
        self, query: str, subject: str = None, class_level: str = None, limit: int = 20
    ) -> dict[str, Any]:
        """Search the knowledge graph for nodes matching the query."""
        if not HAS_NEO4J:
            return {"results": [], "total": 0}
        if self._driver is None:
            self._driver = GraphDatabase.driver(
                self._uri, auth=(self._user, self._password)
            )
        with self._driver.session() as session:
            cypher = """
                MATCH (n:Node)
                WHERE n.node_id CONTAINS $search_query OR n.definition_snippet CONTAINS $search_query
            """
            params = {"search_query": query, "result_limit": limit}
            if subject:
                cypher += " AND n.subject = $subject"
                params["subject"] = subject
            if class_level:
                cypher += " AND n.class = $class_level"
                params["class_level"] = str(class_level)
            cypher += """
                RETURN n.node_id as node_id, n.definition_snippet as topic,
                       n.subject as subject, n.class as class_level,
                       n.chapter as chapter
                LIMIT $result_limit
            """
            result = session.run(cypher, **params)
            results = []
            for record in result:
                results.append({
                    "node_id": record["node_id"],
                    "name": record["topic"] or record["node_id"],
                    "node_type": "topic",
                    "subject": record["subject"],
                    "class_level": str(record["class_level"]),
                    "difficulty": None,
                    "estimated_minutes": None,
                    "metadata": {
                        "chapter": record["chapter"],
                    },
                })
            return {"results": results, "total": len(results)}

    async def get_path(self, from_node: str, to_node: str) -> list[dict[str, Any]]:
        """Get the learning path between two nodes."""
        if not HAS_NEO4J:
            return []
        if self._driver is None:
            self._driver = GraphDatabase.driver(
                self._uri, auth=(self._user, self._password)
            )
        with self._driver.session() as session:
            result = session.run(
                """
                MATCH path = shortestPath((a:Node {node_id: $from_id})-[:PREREQUISITE_OF*]->(b:Node {node_id: $to_id}))
                UNWIND nodes(path) as n
                RETURN n.node_id as node_id, n.node_id as name, n.subject as subject
                """,
                from_id=from_node,
                to_id=to_node,
            )
            path = []
            for record in result:
                path.append({
                    "node_id": record["node_id"],
                    "name": record["name"],
                    "subject": record["subject"],
                })
        return path

    def close(self):
        """Close the driver connection."""
        if self._driver:
            self._driver.close()
            self._driver = None

    # ------------------------------------------------------------------ #
    # Static facade expected by backend/routers/graph.py.
    #
    # The router calls GraphService.<method>(...) as classmethods.  Those
    # names did not exist (only the instance API above does), so every
    # graph route raised AttributeError/TypeError.  These staticmethods
    # delegate to the singleton instance and ALWAYS degrade gracefully:
    # when Neo4j is unreachable the optional service first falls back to
    # the SQLite knowledge graph (knowledge_nodes table — see
    # graph_sqlite_fallback / tools/seed_graph_sqlite.py) and only yields
    # empty responses when that is empty too.
    # SQLite fallback module is imported at module level (see below).
    # ------------------------------------------------------------------ #

    _UNAVAILABLE_STATS = {"total_nodes": 0, "total_edges": 0, "labels": [], "status": "neo4j_unavailable"}

    # ------------------------------------------------------------------ #
    # Display-name resolution (render-fix wave, 2026-10-04).  The graph
    # endpoints used to leak raw node ids in the ``name`` field of
    # unlocks/prerequisites/related rows — rendered verbatim by the FE
    # "UNLOCKS NEXT" panel.  Titles resolve from the enhanced-nodes
    # corpus index (already a warm singleton in the serving process);
    # when no title exists the name is dropped (None) so the frontend's
    # sanctioned friendly-label fallback engages instead.
    # ------------------------------------------------------------------ #

    _TITLES_CACHE: Optional[dict] = None

    @staticmethod
    def _node_titles() -> dict:
        if GraphService._TITLES_CACHE is None:
            titles: dict = {}
            try:
                try:  # package import (platform runtime)
                    from backend.services.enhanced_nodes import (
                        _derive_title, load_index)
                except ImportError:  # legacy flat import path
                    from services.enhanced_nodes import (  # type: ignore
                        _derive_title, load_index)
                idx = load_index()
                pools = []
                for pool in ("nodes", "companions"):
                    mapping = getattr(idx, pool, None)
                    if isinstance(mapping, dict):
                        pools.append(mapping)
                for mapping in pools:
                    for nid, node in mapping.items():
                        if not isinstance(node, dict):
                            continue
                        # corpus nodes carry no title field — the API
                        # derives one from the definition's first clause
                        title = str(node.get("title")
                                    or _derive_title(node) or "").strip()
                        if title:
                            titles[nid] = title
            except Exception as e:  # noqa: BLE001 -- degrade, never fail
                logger.warning("graph title map unavailable: %s", e)
            GraphService._TITLES_CACHE = titles
        return GraphService._TITLES_CACHE

    @staticmethod
    def _friendly_names(rows: list) -> list:
        """Replace id-like/absent ``name`` values with corpus titles."""
        if not rows:
            return rows
        titles = GraphService._node_titles()
        for row in rows:
            if not isinstance(row, dict):
                continue
            name = row.get("name")
            if isinstance(name, str) and name.strip() \
                    and not _LOOKS_LIKE_ID.match(name.strip()):
                continue  # real display text (snippet/label) — keep it
            nid = row.get("node_id") or (name.strip() if isinstance(name, str) else "")
            title = titles.get(nid)
            if title:
                row["name"] = title
            else:
                # never serve the raw id: let the FE friendly-label
                # fallback engage ("Next topic" / nodeRefLabel)
                row["name"] = None
        return rows

    @staticmethod
    async def get_stats() -> dict[str, Any]:
        svc = get_graph_service()
        try:
            if await svc.check_connection():
                stats = await svc._get_stats_neo4j()
                stats.setdefault("status", "ok")
                return stats
        except Exception as e:
            logger.warning("graph stats unavailable: %s", e)
        fallback = await _sqlite_fb.get_stats()
        if fallback:
            return fallback
        return dict(GraphService._UNAVAILABLE_STATS)

    @staticmethod
    async def get_node(node_id: str) -> Optional[dict[str, Any]]:
        svc = get_graph_service()
        try:
            if await svc.check_connection():
                node = await svc._get_node_neo4j(node_id)
                if node is not None:
                    return node
        except Exception as e:
            logger.warning("graph node %s unavailable: %s", node_id, e)
        try:
            return await _sqlite_fb.get_node(node_id)
        except Exception as e:
            logger.warning("graph sqlite fallback failed for %s: %s", node_id, e)
            return None

    @staticmethod
    async def _run_cypher(cypher: str, **params) -> list[dict[str, Any]]:
        """Run a read-only cypher query on the singleton; [] on any failure.

        The neo4j driver here is the SYNC one; session.run used to execute
        directly on the event loop, so deep traversals (PREREQUISITE_OF*1..20)
        froze the whole worker for their duration (observed: /api/graph/unlocks
        multi-second freezes). The blocking block is offloaded to a worker
        thread."""
        svc = get_graph_service()

        def _query() -> list[dict[str, Any]]:
            if not HAS_NEO4J:
                return []
            try:
                if svc._driver is None:
                    svc._driver = GraphDatabase.driver(
                        svc._uri, auth=(svc._user, svc._password)
                    )
                with svc._driver.session() as session:
                    result = session.run(cypher, **params)
                    return [dict(record) for record in result]
            except Exception as e:
                logger.warning("graph query failed: %s", e)
                return []

        return await run_in_threadpool(_query)

    @staticmethod
    async def get_nodes_by_class(
        board: str, class_level: Any, subject: Optional[str] = None
    ) -> list[dict[str, Any]]:
        if subject:
            cypher = """
                MATCH (n:Node)
                WHERE n.subject = $subject AND toInteger(n.class) = $class_level
                RETURN n.node_id as node_id, n.node_id as name, n.chapter as chapter,
                       n.depth as depth
                ORDER BY n.node_id LIMIT 500
            """
            rows = await GraphService._run_cypher(
                cypher, subject=subject, class_level=int(class_level)
            )
        else:
            cypher = """
                MATCH (n:Node)
                WHERE toInteger(n.class) = $class_level
                RETURN n.node_id as node_id, n.node_id as name, n.subject as subject,
                       n.chapter as chapter, n.depth as depth
                ORDER BY n.subject, n.node_id LIMIT 500
            """
            rows = await GraphService._run_cypher(cypher, class_level=int(class_level))
        if rows:
            return GraphService._friendly_names(rows)
        try:
            return await _sqlite_fb.get_nodes_by_class(class_level, subject)
        except Exception as e:
            logger.warning("graph sqlite fallback (nodes_by_class) failed: %s", e)
            return []

    @staticmethod
    async def search_nodes(query: str, limit: int = 20) -> list[dict[str, Any]]:
        svc = get_graph_service()
        try:
            if await svc.check_connection():
                found = await svc.search(query, limit=limit)
                if found.get("results"):
                    return GraphService._friendly_names(found["results"])
        except Exception as e:
            logger.warning("graph search unavailable: %s", e)
        try:
            return await _sqlite_fb.search_nodes(query, limit)
        except Exception as e:
            logger.warning("graph sqlite fallback (search) failed: %s", e)
            return []

    @staticmethod
    async def _prereq_bundle(
        node_id: str, max_depth: int = 10
    ) -> Tuple[Optional[dict[str, Any]], list[dict[str, Any]]]:
        """(target_brief, prerequisite_rows) for one node — Neo4j first,
        SQLite fallback second, ``(``None``, ``[])`` when unknown.

        The shared source for get_all_prerequisites (display, unfiltered)
        and the D11 hard-only gating consumers below; the target brief
        carries the ``subject``/``class_level`` coordinates the hard-edge
        classifier needs.
        """
        svc = get_graph_service()
        try:
            if await svc.check_connection():
                data = await svc.get_prerequisites(node_id, max_depth)
                if data.get("prerequisites"):
                    return data.get("target_node"), data.get("prerequisites") or []
                # Node may exist but have no prereqs in Neo4j.
                node = await svc._get_node_neo4j(node_id)
                if node is not None:
                    return node.get("node"), []
        except Exception as e:
            logger.warning("graph prerequisites unavailable: %s", e)
        try:
            data = await _sqlite_fb.get_prerequisites(node_id, max_depth)
            return data.get("target_node"), data.get("prerequisites", [])
        except Exception as e:
            logger.warning("graph sqlite fallback (prerequisites) failed: %s", e)
            return None, []

    @staticmethod
    async def get_all_prerequisites(node_id: str, max_depth: int = 10) -> list[dict[str, Any]]:
        """ALL prerequisite rows (display — NOT hard-filtered; see D11 note
        in the module docstring).  Gating consumers use find_gaps /
        get_learning_path, which hard-filter through graph_edges.

        The bundle already degrades Neo4j → SQLite fallback → []."""
        try:
            _target, rows = await GraphService._prereq_bundle(node_id, max_depth)
            return GraphService._friendly_names(rows)
        except Exception as e:
            logger.warning("graph prerequisites unavailable: %s", e)
            return []

    @staticmethod
    async def get_all_unlocks(node_id: str, max_depth: int = 10) -> list[dict[str, Any]]:
        """Recursive forward unlocks — level-by-level BFS.

        The previous single variable-length expansion
        (``<-[:PREREQUISITE_OF*1..N]-``) is exponential on popular roots:
        Neo4j must enumerate every path before DISTINCT collapses the
        multiplicity, so deep roots on the 150k-edge graph ran minutes and
        hung the endpoint (60s+ client timeouts, 2026-09-29). BFS expands
        one hop per query — every query is an index seek on the unique
        ``node_id`` index — and caps both the frontier and the result.
        Returns depth-ordered rows shaped exactly like the old query:
        ``{node_id, name, subject}``.
        """
        depth = max(1, min(int(max_depth), 20))
        MAX_NODES = 1000  # hard result cap (old query LIMIT 100)
        LEVEL_CAP = 400   # max ids per UNWIND batch
        try:
            frontier: list[str] = [node_id]
            seen: set[str] = {node_id}
            out: list[dict[str, Any]] = []
            while frontier and len(out) < MAX_NODES and depth > 0:
                depth -= 1
                rows = await GraphService._run_cypher(
                    """
                    UNWIND $ids AS id
                    MATCH (n:Node {node_id: id})<-[:PREREQUISITE_OF]-(m:Node)
                    WHERE m.node_id IS NOT NULL AND NOT m.node_id IN $seen
                    RETURN DISTINCT m.node_id AS node_id, m.subject AS subject
                    LIMIT $cap
                    """,
                    ids=frontier[:LEVEL_CAP],
                    seen=sorted(seen),
                    cap=MAX_NODES - len(out),
                )
                nxt: list[str] = []
                for r in rows:
                    nid = r.get("node_id")
                    if not nid or nid in seen:
                        continue
                    seen.add(nid)
                    out.append({
                        "node_id": nid,
                        "name": nid,   # display-resolved by _friendly_names
                        "subject": r.get("subject"),
                    })
                    nxt.append(nid)
                frontier = nxt
            if out:
                return GraphService._friendly_names(out)
        except Exception as e:
            logger.warning("graph unlocks BFS failed: %s", e)
        try:
            return await _sqlite_fb.get_all_unlocks(node_id, max_depth)
        except Exception as e:
            logger.warning("graph sqlite fallback (unlocks) failed: %s", e)
            return []

    @staticmethod
    async def get_related_nodes(node_id: str) -> list[dict[str, Any]]:
        cypher = """
            MATCH (n:Node {node_id: $node_id})-[r]-(rel:Node)
            RETURN DISTINCT rel.node_id as node_id, rel.node_id as name,
                   rel.subject as subject, type(r) as rel
            LIMIT 50
        """
        rows = await GraphService._run_cypher(cypher, node_id=node_id)
        if rows:
            return GraphService._friendly_names(rows)
        try:
            return await _sqlite_fb.get_related_nodes(node_id)
        except Exception as e:
            logger.warning("graph sqlite fallback (related) failed: %s", e)
            return []

    @staticmethod
    async def find_gaps(
        target_node_id: str, mastered_node_ids: set, max_depth: int = 10
    ) -> list[dict[str, Any]]:
        """Unmastered HARD prerequisites of the target (D11).

        Same-class sibling mesh never appears here: an edge only gates
        when the prereq's class is strictly below the target's or its
        subject differs (services/graph_edges.filter_hard_rows)."""
        mastered = set(mastered_node_ids or [])
        target, prereqs = await GraphService._prereq_bundle(target_node_id, max_depth)
        hard = graph_edges.filter_hard_rows(prereqs, target)
        return [p for p in hard if p.get("node_id") not in mastered]

    @staticmethod
    async def find_root_gaps(
        target_node_id: str, mastered_node_ids: set, max_depth: int = 10
    ) -> list[dict[str, Any]]:
        """Deepest learnable roots of the unmet HARD chain (D11): gaps
        whose OWN hard prerequisites are all mastered."""
        mastered = set(mastered_node_ids or [])
        gaps = await GraphService.find_gaps(target_node_id, mastered, max_depth)
        roots: list[dict[str, Any]] = []
        for gap in gaps:
            g_target, g_prereqs = await GraphService._prereq_bundle(
                gap.get("node_id", ""), max_depth)
            hard = graph_edges.filter_hard_rows(g_prereqs, g_target)
            unmet = [p for p in hard if p.get("node_id") not in mastered]
            if not unmet:
                roots.append(gap)
        return roots

    @staticmethod
    async def get_learning_path(
        target_node_id: str, mastered_node_ids: set, max_depth: int = 10
    ) -> list[dict[str, Any]]:
        """Ordered nodes to learn: deepest HARD prerequisites first, target
        last (D11 — sibling mesh is excluded from the path)."""
        mastered = set(mastered_node_ids or [])
        target, prereqs = await GraphService._prereq_bundle(target_node_id, max_depth)
        hard = [
            p for p in graph_edges.filter_hard_rows(prereqs, target)
            if p.get("node_id") not in mastered
        ]
        path = list(reversed(hard))  # deepest first
        if target:
            path.append(target)
        if path:
            return GraphService._friendly_names(path)
        try:
            return await _sqlite_fb.get_learning_path(
                target_node_id, mastered, max_depth
            )
        except Exception as e:
            logger.warning("graph sqlite fallback (path) failed: %s", e)
            return []

    @staticmethod
    async def get_graph_for_visualization(
        board: str, class_level: Any, subject: Optional[str] = None
    ) -> dict[str, Any]:
        nodes = await GraphService.get_nodes_by_class(board, class_level, subject)
        edges = []
        if nodes and subject:
            svc = get_graph_service()
            try:
                if await svc.check_connection():
                    graph = await svc.get_graph(subject, class_level)
                    edges = graph.get("edges", [])
            except Exception as e:
                logger.warning("graph edges unavailable: %s", e)
            if not edges:
                try:
                    graph = await _sqlite_fb.get_graph(subject, class_level)
                    edges = graph.get("edges", [])
                except Exception as e:
                    logger.warning("graph sqlite fallback (edges) failed: %s", e)
        return {"nodes": nodes, "edges": edges, "relationships": edges}


# SQLite fallback (module-level so the static facades can reach it from
# both the `backend.services.graph_service` and legacy `services.graph_service`
# import paths).
try:  # package import (platform runtime)
    from backend.services import graph_sqlite_fallback as _sqlite_fb
except ImportError:  # legacy flat import path
    from services import graph_sqlite_fallback as _sqlite_fb  # type: ignore[no-redef]


# Singleton instance
_graph_service: GraphService | None = None


def get_graph_service() -> GraphService:
    """Return the singleton GraphService instance."""
    global _graph_service
    if _graph_service is None:
        _graph_service = GraphService()
    return _graph_service
