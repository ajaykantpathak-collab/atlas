"""
Graph-RAG Retriever for LearnerCompass K-12 Learning Platform (2026 Research)

Loads parsed enrichment data and node JSON files to traverse the knowledge graph
for structured, context-aware retrieval. Implements BFS prerequisite traversal,
LRU caching, and cross-subject link discovery.
"""

import json
import logging
import os
from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path
from typing import Any, Optional

logger = logging.getLogger(__name__)


# ─── Data Structures ────────────────────────────────────────────────────────


@dataclass
class GraphRAGResult:
    """Structured result from Graph-RAG retrieval."""

    current_concept: dict = field(default_factory=dict)
    prerequisites: list[dict] = field(default_factory=list)
    forward_concepts: list[dict] = field(default_factory=list)
    misconceptions: list[dict] = field(default_factory=list)
    cross_subject_links: list[dict] = field(default_factory=list)
    on_failure_strategy: str = ""
    concept_tags: list[str] = field(default_factory=list)
    difficulty: str = "medium"
    estimated_time: int = 15


# ─── Helper Utilities ───────────────────────────────────────────────────────


def _load_json_safe(path: str) -> Any:
    """Load a JSON file, returning None on any failure."""
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, json.JSONDecodeError) as exc:
        logger.warning("Could not load %s: %s", path, exc)
        return None


def _parse_marker_content(content: str) -> dict:
    """
    Fallback parser for raw marker-file style content.
    Expects simple KEY: VALUE lines, with section headers in [brackets].
    """
    result: dict[str, Any] = {}
    current_section = "_root"
    result[current_section] = {}

    for raw_line in content.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue

        # Section header  [SECTION_NAME]
        if line.startswith("[") and line.endswith("]"):
            current_section = line[1:-1].strip()
            result.setdefault(current_section, {})
            continue

        # Key: Value  (first colon split)
        if ":" in line:
            key, _, value = line.partition(":")
            key = key.strip().lower().replace(" ", "_")
            value = value.strip()
            result.setdefault(current_section, {})[key] = value

    return result


def _flatten_marker_data(parsed: dict) -> dict:
    """Flatten sectioned marker output into a single concept dict."""
    flat: dict[str, Any] = {}
    for section, fields in parsed.items():
        if isinstance(fields, dict):
            for k, v in fields.items():
                flat[f"{section}.{k}"] = v
        else:
            flat[section] = fields
    return flat


# ─── Main Retriever ─────────────────────────────────────────────────────────


class GraphRAGRetriever:
    """
    Graph-RAG retriever that traverses a knowledge graph to retrieve
    structured teaching context for a given concept node.

    Data sources (in priority order):
      1. enrichment_parsed.json  – fully-parsed enrichment data
      2. nodes/by_subject/*.json  – per-subject node files (fallback)

    Prerequisite traversal uses BFS up to the requested depth.
    """

    def __init__(
        self,
        enrichment_json_path: str,
        nodes_dir: str,
    ) -> None:
        """
        Load all enrichment and node data into memory.

        Parameters
        ----------
        enrichment_json_path : str
            Path to the parsed enrichment JSON (from enrichment_parser.py).
        nodes_dir : str
            Directory containing per-subject node JSON files
            (e.g., D:\\platform\\cbse_data\\nodes\\by_subject\\).
        """
        self.enrichment_path = enrichment_json_path
        self.nodes_dir = nodes_dir

        # Primary store: node_id -> concept dict
        self._enrichment_index: dict[str, dict] = {}
        # Secondary store: node_id -> concept dict  (raw node files)
        self._node_index: dict[str, dict] = {}
        # Adjacency maps for fast graph traversal
        self._prereq_edges: dict[str, list[str]] = {}   # node -> [prereq_ids]
        self._forward_edges: dict[str, list[str]] = {}  # node -> [forward_ids]
        # Quick lookup: node_id -> subject
        self._node_subject: dict[str, str] = {}

        self._load_enrichment_data()
        self._load_node_files()

        # Merge: enrichment index wins; supplement missing nodes from node_index
        merged: dict[str, dict] = dict(self._node_index)
        merged.update(self._enrichment_index)
        self._all_nodes: dict[str, dict] = merged

        logger.info(
            "GraphRAGRetriever ready — %d concepts indexed "
            "(%d from enrichment, %d from node files).",
            len(self._all_nodes),
            len(self._enrichment_index),
            len(self._node_index),
        )

    # ── Data Loading ──────────────────────────────────────────────────────

    def _load_enrichment_data(self) -> None:
        """Load enrichment_parsed.json and build in-memory index + adjacency maps."""
        path = self.enrichment_path
        if not os.path.isfile(path):
            logger.warning(
                "Enrichment file not found at %s — will use node files only.", path
            )
            return

        raw = _load_json_safe(path)
        if raw is None:
            logger.warning(
                "Enrichment file at %s could not be parsed — "
                "falling back to node files.",
                path,
            )
            return

        # enrichment_parsed.json may be a list of concept dicts or a single dict
        concepts: list[dict] = raw if isinstance(raw, list) else [raw]

        for concept in concepts:
            if not isinstance(concept, dict):
                continue
            node_id = str(concept.get("node_id") or concept.get("id") or "").strip()
            if not node_id:
                continue

            self._enrichment_index[node_id] = concept

            # Build prerequisite adjacency
            prereqs = concept.get("prerequisites", [])
            if isinstance(prereqs, list):
                self._prereq_edges.setdefault(node_id, [])
                for p in prereqs:
                    pid = str(p).strip()
                    if pid:
                        self._prereq_edges[node_id].append(pid)

            # Build forward-concept adjacency
            forwards = concept.get("forward_concepts", concept.get("next_concepts", []))
            if isinstance(forwards, list):
                self._forward_edges.setdefault(node_id, [])
                for f in forwards:
                    fid = str(f).strip()
                    if fid:
                        self._forward_edges[node_id].append(fid)

            subject = concept.get("subject", "")
            if subject:
                self._node_subject[node_id] = str(subject)

    def _load_node_files(self) -> None:
        """Load all JSON files from nodes_dir/by_subject/ as fallback node data."""
        nodes_path = Path(self.nodes_dir)
        if not nodes_path.is_dir():
            logger.warning(
                "Nodes directory %s does not exist — node-file fallback unavailable.",
                nodes_path,
            )
            return

        json_files = sorted(nodes_path.glob("*.json"))
        if not json_files:
            by_subject = nodes_path / "by_subject"
            if by_subject.is_dir():
                json_files = sorted(by_subject.glob("*.json"))

        for jf in json_files:
            raw = _load_json_safe(str(jf))
            if raw is None:
                continue

            entries: list[dict] = (
                raw if isinstance(raw, list) else raw.get("concepts", raw.get("nodes", [raw]))
            )
            if isinstance(entries, dict):
                entries = [entries]

            for entry in entries:
                if not isinstance(entry, dict):
                    continue
                node_id = str(
                    entry.get("node_id") or entry.get("id") or entry.get("concept_id") or ""
                ).strip()
                if not node_id:
                    continue
                # Only add if not already covered by enrichment data
                if node_id not in self._node_index:
                    self._node_index[node_id] = entry

                # Build adjacency from node data if not already present
                prereqs = entry.get("prerequisites", [])
                if isinstance(prereqs, list) and node_id not in self._prereq_edges:
                    self._prereq_edges.setdefault(node_id, [])
                    for p in prereqs:
                        pid = str(p).strip()
                        if pid:
                            self._prereq_edges[node_id].append(pid)

                forwards = entry.get("forward_concepts", entry.get("next_concepts", []))
                if isinstance(forwards, list) and node_id not in self._forward_edges:
                    self._forward_edges.setdefault(node_id, [])
                    for f in forwards:
                        fid = str(f).strip()
                        if fid:
                            self._forward_edges[node_id].append(fid)

                subject = entry.get("subject", "")
                if subject:
                    self._node_subject.setdefault(node_id, str(subject))

    # ── Fallback: parse marker files directly ──────────────────────────────

    def _fallback_load_concept(self, node_id: str) -> Optional[dict]:
        """
        Try to locate and parse a marker-style file for the given node_id.
        Searches nodes_dir for files whose stem matches node_id.
        """
        nodes_path = Path(self.nodes_dir)
        candidates = [
            nodes_path / f"{node_id}.json",
            nodes_path / "by_subject" / f"{node_id}.json",
        ]
        for marker_path in candidates:
            if marker_path.is_file():
                raw = _load_json_safe(str(marker_path))
                if raw is not None:
                    if isinstance(raw, dict):
                        return raw
                    # If it's a single string, treat as marker content
                    if isinstance(raw, str):
                        return _flatten_marker_data(_parse_marker_content(raw))
                    logger.debug(
                        "Marker file %s is not a dict — skipping.", marker_path
                    )
        return None

    # ── Public API ────────────────────────────────────────────────────────

    @lru_cache(maxsize=1000)
    def retrieve(self, node_id: str, depth: int = 3) -> GraphRAGResult:
        """
        Retrieve a fully-populated GraphRAGResult for the given concept node.

        Traverses prerequisites (and their prerequisites) up to *depth* levels.

        Parameters
        ----------
        node_id : str
            The concept/node identifier.
        depth : int
            Maximum BFS depth for prerequisite traversal (default 3).

        Returns
        -------
        GraphRAGResult
            Populated result; empty/default if node is not found.
        """
        if node_id not in self._all_nodes:
            logger.warning(
                "Node '%s' not found in any index — returning empty result.", node_id
            )
            return GraphRAGResult()

        concept = dict(self._all_nodes[node_id])

        prerequisites = self._build_prerequisites(node_id, depth)
        forward_concepts = self._build_forward_concepts(node_id)
        misconceptions = self._get_misconceptions(node_id, include_prereqs=True)
        cross_subject_links = self._build_cross_subject_links(node_id)

        return GraphRAGResult(
            current_concept=concept,
            prerequisites=prerequisites,
            forward_concepts=forward_concepts,
            misconceptions=misconceptions,
            cross_subject_links=cross_subject_links,
            on_failure_strategy=concept.get("on_failure_strategy", ""),
            concept_tags=concept.get("concept_tags", concept.get("tags", [])),
            difficulty=concept.get("difficulty", "medium"),
            estimated_time=int(concept.get("estimated_time", 15)),
        )

    def get_teaching_context(
        self,
        node_id: str,
        student_mastery_map: Optional[dict[str, float]] = None,
    ) -> dict:
        """
        Return a compact, teaching-ready context dict for *node_id*.

        Parameters
        ----------
        node_id : str
            The concept/node identifier.
        student_mastery_map : dict[str, float], optional
            Mapping of node_id -> mastery score (0.0–1.0).
            Used to mark prerequisites as *is_blocking* when mastery < 0.4.

        Returns
        -------
        dict
            Compact context dict with current concept, prerequisites,
            forward concepts, misconceptions, cross-subject links, and metadata.
        """
        result = self.retrieve(node_id)
        mastery = student_mastery_map or {}

        concept = result.current_concept

        # Compact current concept
        current_compact = {
            "node_id": node_id,
            "title": concept.get("title", concept.get("name", "")),
            "definition": concept.get("definition", concept.get("description", "")),
            "walkthrough": concept.get("walkthrough", ""),
            "diagnostic_question": concept.get("diagnostic_question", ""),
            "mastery_criteria": concept.get("mastery_criteria", ""),
            "scope_boundary": concept.get("scope_boundary", ""),
            "cognitive_level": concept.get("cognitive_level", ""),
        }

        # Prerequisites with mastery awareness
        prereqs_compact = []
        for prereq in result.prerequisites:
            pid = prereq.get("node_id", "")
            score = float(mastery.get(pid, 1.0))
            prereqs_compact.append({
                "node_id": pid,
                "title": prereq.get("title", ""),
                "mastery_status": score,
                "is_blocking": score < 0.4,
            })

        # Forward concepts
        forwards_compact = [
            {"node_id": fc.get("node_id", ""), "title": fc.get("title", "")}
            for fc in result.forward_concepts
        ]

        # Misconceptions
        misconceptions_compact = [
            {
                "misconception": m.get("misconception", m.get("text", "")),
                "explanation": m.get("explanation", m.get("why_it_happens", "")),
                "correction": m.get("correction", m.get("correct_view", "")),
            }
            for m in result.misconceptions
        ]

        # Cross-subject links
        cross_compact = [
            {
                "node_id": link.get("node_id", link.get("related_node_id", "")),
                "subject": link.get("subject", ""),
                "topic": link.get("topic", link.get("title", "")),
                "reason": link.get("reason", link.get("connection_reason", "")),
            }
            for link in result.cross_subject_links
        ]

        return {
            "current_concept": current_compact,
            "prerequisites": prereqs_compact,
            "forward_concepts": forwards_compact,
            "misconceptions": misconceptions_compact,
            "cross_subject_links": cross_compact,
            "on_failure_strategy": result.on_failure_strategy,
            "concept_tags": result.concept_tags,
            "difficulty": result.difficulty,
            "estimated_time": result.estimated_time,
        }

    def get_prerequisite_chain(self, node_id: str, depth: int = 3) -> list[str]:
        """
        Return an ordered list of prerequisite node_ids up to *depth* levels.

        Uses BFS so prerequisites closer to the target concept appear first
        (breadth-first ordering).

        Parameters
        ----------
        node_id : str
            Starting concept.
        depth : int
            Maximum traversal depth.

        Returns
        -------
        list[str]
            Ordered prerequisite node IDs (may contain duplicates across
            different branches — deduplicated while preserving order).
        """
        visited: set[str] = set()
        ordered: list[str] = []
        queue: list[tuple[str, int]] = [(node_id, 0)]

        while queue:
            current, level = queue.pop(0)
            if level >= depth:
                continue
            for prereq_id in self._prereq_edges.get(current, []):
                if prereq_id not in visited:
                    visited.add(prereq_id)
                    ordered.append(prereq_id)
                    queue.append((prereq_id, level + 1))

        return ordered

    def get_misconception_set(
        self, node_id: str, include_prereqs: bool = True
    ) -> list[dict]:
        """
        Collect all misconceptions for *node_id* and optionally its prerequisites.

        Parameters
        ----------
        node_id : str
            The concept to query.
        include_prereqs : bool
            If True, also include misconceptions from prerequisite concepts.

        Returns
        -------
        list[dict]
            Deduplicated list of misconception dicts, each with at minimum
            a "misconception" (or "text") key and "explanation" key.
        """
        seen_texts: set[str] = set()
        result: list[dict] = []

        def _collect(source: str) -> None:
            concept = self._all_nodes.get(source, {})
            raw_mis = concept.get("misconceptions", [])
            if isinstance(raw_mis, dict):
                raw_mis = [raw_mis]
            for item in raw_mis:
                if not isinstance(item, dict):
                    continue
                text = item.get(
                    "misconception", item.get("text", item.get("statement", ""))
                ).strip()
                if not text or text in seen_texts:
                    continue
                seen_texts.add(text)
                result.append({
                    "node_id": source,
                    "misconception": text,
                    "explanation": item.get(
                        "explanation",
                        item.get("why_it_happens", item.get("reason", "")),
                    ),
                    "correction": item.get(
                        "correction",
                        item.get("correct_view", item.get("remedy", "")),
                    ),
                    "grade_levels": item.get("grade_levels", []),
                    "frequency": item.get("frequency", ""),
                })

        _collect(node_id)
        if include_prereqs:
            prereq_ids = self._prereq_edges.get(node_id, [])
            # Expand one more level for richer context
            expanded = list(prereq_ids)
            for pid in prereq_ids:
                expanded.extend(self._prereq_edges.get(pid, []))
            for pid in dict.fromkeys(expanded):  # preserve order, deduplicate
                _collect(pid)

        return result

    def get_cross_subject_links(self, node_id: str) -> list[dict]:
        """
        Retrieve cross-subject links for *node_id*.

        Also discovers indirect links through forward and prerequisite neighbours
        when the concept itself has no explicit cross-subject links.

        Parameters
        ----------
        node_id : str
            The concept to query.

        Returns
        -------
        list[dict]
            Each dict contains: node_id, subject, topic, reason.
        """
        concept = self._all_nodes.get(node_id, {})
        direct: list[dict] = concept.get("cross_subject_links", [])
        if not isinstance(direct, list):
            direct = []

        normalised: list[dict] = []
        seen_keys: set[str] = set()

        def _add(link: dict) -> None:
            if not isinstance(link, dict):
                return
            subject = str(link.get("subject", link.get("from_subject", ""))).strip()
            related_id = str(
                link.get("node_id", link.get("related_node_id", ""))
            ).strip()
            dedup_key = f"{subject}:{related_id}"
            if dedup_key in seen_keys:
                return
            seen_keys.add(dedup_key)
            normalised.append({
                "node_id": related_id,
                "subject": subject,
                "topic": str(link.get("topic", link.get("title", ""))),
                "reason": str(
                    link.get(
                        "reason",
                        link.get("connection_reason", link.get("description", "")),
                    )
                ),
            })

        for link in direct:
            _add(link)

        # Probe neighbours for additional cross-subject connections
        neighbours = (
            self._prereq_edges.get(node_id, [])
            + self._forward_edges.get(node_id, [])
        )
        for nid in neighbours:
            neighbour_concept = self._all_nodes.get(nid, {})
            neighbour_subject = str(neighbour_concept.get("subject", "")).strip()
            if neighbour_subject and neighbour_subject != self._node_subject.get(
                node_id, ""
            ):
                _add({
                    "node_id": nid,
                    "subject": neighbour_subject,
                    "topic": neighbour_concept.get("title", neighbour_concept.get("name", "")),
                    "reason": f"Connected via prerequisite/forward relationship from {node_id}",
                })

        return normalised

    # ── Internal Builders ─────────────────────────────────────────────────

    def _build_prerequisites(
        self, node_id: str, depth: int
    ) -> list[dict]:
        """BFS-collect prerequisites with metadata up to *depth* levels."""
        prereq_ids = self.get_prerequisite_chain(node_id, depth)
        result: list[dict] = []
        for pid in prereq_ids:
            concept = self._all_nodes.get(pid, {})
            result.append({
                "node_id": pid,
                "title": concept.get("title", concept.get("name", "")),
                "definition": concept.get("definition", concept.get("description", "")),
                "difficulty": concept.get("difficulty", "medium"),
                "subject": concept.get("subject", ""),
            })
        return result

    def _build_forward_concepts(self, node_id: str) -> list[dict]:
        """Build forward-concept list from adjacency map."""
        result: list[dict] = []
        for fid in self._forward_edges.get(node_id, []):
            concept = self._all_nodes.get(fid, {})
            result.append({
                "node_id": fid,
                "title": concept.get("title", concept.get("name", "")),
                "difficulty": concept.get("difficulty", "medium"),
            })
        return result

    def _get_misconceptions(
        self, node_id: str, include_prereqs: bool
    ) -> list[dict]:
        """Delegate to get_misconception_set for internal use."""
        return self.get_misconception_set(node_id, include_prereqs=include_prereqs)

    def _build_cross_subject_links(self, node_id: str) -> list[dict]:
        """Delegate to get_cross_subject_links for internal use."""
        return self.get_cross_subject_links(node_id)

    # ── Cache Management ──────────────────────────────────────────────────

    def clear_cache(self) -> None:
        """Clear the LRU cache on retrieve(). Call after bulk data updates."""
        self.retrieve.cache_clear()  # type: ignore[attr-defined]
        logger.info("GraphRAGRetriever retrieve() cache cleared.")

    def cache_info(self) -> str:
        """Return cache statistics for retrieve()."""
        return str(self.retrieve.cache_info())  # type: ignore[attr-defined]

    # ── Introspection ─────────────────────────────────────────────────────

    def get_available_node_ids(self) -> list[str]:
        """Return a sorted list of all known node IDs."""
        return sorted(self._all_nodes.keys())

    def node_exists(self, node_id: str) -> bool:
        """Check whether a concept node is indexed."""
        return node_id in self._all_nodes

    def get_subject_for_node(self, node_id: str) -> str:
        """Return the subject associated with *node_id*, or '' if unknown."""
        return self._node_subject.get(node_id, "")

    def __len__(self) -> int:
        return len(self._all_nodes)

    def __repr__(self) -> str:
        return (
            f"<GraphRAGRetriever "
            f"enrichment={len(self._enrichment_index)} "
            f"nodes={len(self._node_index)} "
            f"total={len(self._all_nodes)}>"
        )