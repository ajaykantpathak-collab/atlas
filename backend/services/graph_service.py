"""Graph service for Neo4j knowledge graph operations.

Connects to the Neo4j database and provides methods for querying
the CISCE curriculum knowledge graph.
"""
from __future__ import annotations

import logging
import os
from typing import Any, Optional

logger = logging.getLogger(__name__)

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
        self._uri = uri or os.getenv("NEO4J_URI", "bolt://localhost:7687")
        self._user = user or os.getenv("NEO4J_USER", "neo4j")
        self._password = password or os.getenv("NEO4J_PASSWORD", "dream_neo4j_2024")
        self._driver = None

    async def check_connection(self) -> bool:
        """Check if Neo4j is reachable and return node count."""
        if not HAS_NEO4J:
            return False
        try:
            if self._driver is None:
                self._driver = GraphDatabase.driver(
                    self._uri, auth=(self._user, self._password)
                )
            with self._driver.session() as session:
                result = session.run("MATCH (n) RETURN count(n) as count")
                record = result.single()
                count = record["count"] if record else 0
                logger.info("Neo4j connected: %d nodes", count)
                return count > 0
        except Exception as e:
            logger.error("Neo4j connection failed: %s", e)
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
                MATCH (n:KnowledgeNode)
                WHERE n.subject = $subject AND n.class_level = $class_level
                RETURN n.node_id as node_id, n.topic as topic,
                       n.chapter as chapter, n.difficulty as difficulty,
                       n.estimated_time as estimated_time,
                       n.is_root as is_root,
                       n.prerequisite_node_ids as prereqs
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
                    "difficulty": record["difficulty"],
                    "estimated_minutes": record["estimated_time"],
                    "metadata": {
                        "chapter": record["chapter"],
                        "is_root": record["is_root"],
                        "prerequisites": record["prereqs"] or [],
                    },
                })

            # Get edges (REQUIRES relationships)
            result = session.run(
                """
                MATCH (a:KnowledgeNode)-[r:REQUIRES]->(b:KnowledgeNode)
                WHERE a.subject = $subject AND a.class_level = $class_level
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

    async def get_node(self, node_id: str) -> dict[str, Any]:
        """Get a single node by its ID, including relationships."""
        if not HAS_NEO4J:
            raise RuntimeError("Neo4j driver not available")
        if self._driver is None:
            self._driver = GraphDatabase.driver(
                self._uri, auth=(self._user, self._password)
            )
        with self._driver.session() as session:
            result = session.run(
                "MATCH (n:KnowledgeNode {node_id: $node_id}) RETURN n",
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
                    "name": node.get("topic", node_id),
                    "node_type": "topic",
                    "subject": node.get("subject", ""),
                    "class_level": str(node.get("class_level", "")),
                    "difficulty": node.get("difficulty"),
                    "estimated_minutes": node.get("estimated_time"),
                    "metadata": {
                        "chapter": node.get("chapter"),
                        "is_root": node.get("is_root"),
                        "prerequisites": node.get("prerequisite_node_ids", []),
                        "content_snippet": node.get("content_snippet", ""),
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
                    MATCH (a:KnowledgeNode)-[r:REQUIRES]->(n:KnowledgeNode {node_id: $node_id})
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
                    MATCH (n:KnowledgeNode {node_id: $node_id})-[r:REQUIRES]->(b:KnowledgeNode)
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
                MATCH (n:KnowledgeNode {node_id: $node_id})
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
                MATCH (n:KnowledgeNode {node_id: $node_id})
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

    async def get_stats(self) -> dict[str, Any]:
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

        return {
            "total_nodes": nodes_count,
            "total_edges": edges_count,
            "labels": labels,
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
                MATCH (n:KnowledgeNode)
                WHERE n.is_root = true OR NOT ()-[:REQUIRES]->(n)
                RETURN n.node_id as node_id, n.topic as topic, n.subject as subject,
                       n.class_level as class_level
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
                "MATCH (n:KnowledgeNode {node_id: $node_id}) RETURN n",
                node_id=node_id,
            )
            record = result.single()
            if not record:
                return {"target_node": None, "prerequisites": []}
            node = dict(record["n"])
            target_node = {
                "node_id": node.get("node_id", node_id),
                "name": node.get("topic", node_id),
                "node_type": "topic",
                "subject": node.get("subject", ""),
                "class_level": str(node.get("class_level", "")),
                "difficulty": node.get("difficulty"),
                "estimated_minutes": node.get("estimated_time"),
                "metadata": {},
            }
            # Get prerequisites via REQUIRES relationships (recursive)
            # Neo4j doesn't support parameters in relationship length patterns,
            # so we use a fixed depth and limit results
            result = session.run(
                """
                MATCH (n:KnowledgeNode {node_id: $node_id})-[:REQUIRES*1..5]->(prereq:KnowledgeNode)
                RETURN DISTINCT prereq.node_id as node_id, prereq.topic as topic,
                       prereq.subject as subject, prereq.class_level as class_level,
                       prereq.chapter as chapter, prereq.difficulty as difficulty
                LIMIT 50
                """,
                node_id=node_id,
            )
            prerequisites = []
            for r in result:
                prerequisites.append({
                    "node_id": r["node_id"],
                    "name": r["topic"] or r["node_id"],
                    "node_type": "topic",
                    "subject": r["subject"],
                    "class_level": str(r["class_level"]),
                    "difficulty": r["difficulty"],
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
                MATCH (n:KnowledgeNode)
                WHERE n.topic CONTAINS $search_query OR n.content_snippet CONTAINS $search_query
            """
            params = {"search_query": query, "result_limit": limit}
            if subject:
                cypher += " AND n.subject = $subject"
                params["subject"] = subject
            if class_level:
                cypher += " AND n.class_level = $class_level"
                params["class_level"] = int(class_level) if str(class_level).isdigit() else 0
            cypher += """
                RETURN n.node_id as node_id, n.topic as topic, n.subject as subject,
                       n.class_level as class_level, n.chapter as chapter,
                       n.difficulty as difficulty
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
                    "difficulty": record["difficulty"],
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
                MATCH path = shortestPath((a:KnowledgeNode {node_id: $from_id})-[:REQUIRES*]->(b:KnowledgeNode {node_id: $to_id}))
                UNWIND nodes(path) as n
                RETURN n.node_id as node_id, n.name as name, n.subject as subject
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

    @staticmethod
    async def get_stats() -> dict[str, Any]:
        svc = get_graph_service()
        try:
            if await svc.check_connection():
                stats = await svc.get_stats()
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
                node = await svc.get_node(node_id)
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
        """Run a read-only cypher query on the singleton; [] on any failure."""
        svc = get_graph_service()
        try:
            if not HAS_NEO4J:
                return []
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

    @staticmethod
    async def get_nodes_by_class(
        board: str, class_level: Any, subject: Optional[str] = None
    ) -> list[dict[str, Any]]:
        if subject:
            cypher = """
                MATCH (n:KnowledgeNode)
                WHERE n.subject = $subject AND n.class_level = $class_level
                RETURN n.node_id as node_id, n.topic as name, n.chapter as chapter,
                       n.difficulty as difficulty
                ORDER BY n.node_id LIMIT 500
            """
            rows = await GraphService._run_cypher(
                cypher, subject=subject, class_level=int(class_level)
            )
        else:
            cypher = """
                MATCH (n:KnowledgeNode)
                WHERE n.class_level = $class_level
                RETURN n.node_id as node_id, n.topic as name, n.subject as subject,
                       n.chapter as chapter, n.difficulty as difficulty
                ORDER BY n.subject, n.node_id LIMIT 500
            """
            rows = await GraphService._run_cypher(cypher, class_level=int(class_level))
        if rows:
            return rows
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
                    return found["results"]
        except Exception as e:
            logger.warning("graph search unavailable: %s", e)
        try:
            return await _sqlite_fb.search_nodes(query, limit)
        except Exception as e:
            logger.warning("graph sqlite fallback (search) failed: %s", e)
            return []

    @staticmethod
    async def get_all_prerequisites(node_id: str, max_depth: int = 10) -> list[dict[str, Any]]:
        svc = get_graph_service()
        try:
            if await svc.check_connection():
                data = await svc.get_prerequisites(node_id, max_depth)
                if data.get("prerequisites"):
                    return data["prerequisites"]
                # Node may exist but have no prereqs in Neo4j; fall back to
                # SQLite which may know the edge.
                node = await svc.get_node(node_id)
                if node is not None:
                    return []
        except Exception as e:
            logger.warning("graph prerequisites unavailable: %s", e)
        try:
            data = await _sqlite_fb.get_prerequisites(node_id, max_depth)
            return data.get("prerequisites", [])
        except Exception as e:
            logger.warning("graph sqlite fallback (prerequisites) failed: %s", e)
            return []

    @staticmethod
    async def get_all_unlocks(node_id: str, max_depth: int = 10) -> list[dict[str, Any]]:
        cypher = """
            MATCH (n:KnowledgeNode {node_id: $node_id})<-[:REQUIRES*1..%d]-(unlock:KnowledgeNode)
            RETURN DISTINCT unlock.node_id as node_id, unlock.topic as name,
                   unlock.subject as subject, unlock.difficulty as difficulty
            LIMIT 100
        """ % max(1, min(int(max_depth), 20))
        rows = await GraphService._run_cypher(cypher, node_id=node_id)
        if rows:
            return rows
        try:
            return await _sqlite_fb.get_all_unlocks(node_id, max_depth)
        except Exception as e:
            logger.warning("graph sqlite fallback (unlocks) failed: %s", e)
            return []

    @staticmethod
    async def get_related_nodes(node_id: str) -> list[dict[str, Any]]:
        cypher = """
            MATCH (n:KnowledgeNode {node_id: $node_id})-[:RELATED_TO]-(rel:KnowledgeNode)
            RETURN DISTINCT rel.node_id as node_id, rel.topic as name,
                   rel.subject as subject, rel.difficulty as difficulty
            LIMIT 50
        """
        rows = await GraphService._run_cypher(cypher, node_id=node_id)
        if rows:
            return rows
        try:
            return await _sqlite_fb.get_related_nodes(node_id)
        except Exception as e:
            logger.warning("graph sqlite fallback (related) failed: %s", e)
            return []

    @staticmethod
    async def find_gaps(
        target_node_id: str, mastered_node_ids: set, max_depth: int = 10
    ) -> list[dict[str, Any]]:
        mastered = set(mastered_node_ids or [])
        prereqs = await GraphService.get_all_prerequisites(target_node_id, max_depth)
        return [p for p in prereqs if p.get("node_id") not in mastered]

    @staticmethod
    async def find_root_gaps(
        target_node_id: str, mastered_node_ids: set, max_depth: int = 10
    ) -> list[dict[str, Any]]:
        mastered = set(mastered_node_ids or [])
        gaps = await GraphService.find_gaps(target_node_id, mastered, max_depth)
        roots: list[dict[str, Any]] = []
        for gap in gaps:
            own = await GraphService.get_all_prerequisites(gap.get("node_id", ""), max_depth)
            unmet = [p for p in own if p.get("node_id") not in mastered]
            if not unmet:
                roots.append(gap)
        return roots

    @staticmethod
    async def get_learning_path(
        target_node_id: str, mastered_node_ids: set, max_depth: int = 10
    ) -> list[dict[str, Any]]:
        """Ordered nodes to learn: deepest prerequisites first, target last."""
        mastered = set(mastered_node_ids or [])
        svc = get_graph_service()
        try:
            if await svc.check_connection():
                data = await svc.get_prerequisites(target_node_id, max_depth)
                prereqs = [
                    p for p in data.get("prerequisites", [])
                    if p.get("node_id") not in mastered
                ]
                path = list(reversed(prereqs))  # deepest first
                target = data.get("target_node")
                if target:
                    path.append(target)
                if path:
                    return path
        except Exception as e:
            logger.warning("graph path unavailable: %s", e)
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
