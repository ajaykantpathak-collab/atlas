"""
concept_graph_traverser.py
Structural knowledge graph traverser for a K-12 learning platform.
Pure graph traversal — no embeddings, no semantic similarity, no RAG.
"""

from __future__ import annotations

import json
import os
import warnings
from dataclasses import dataclass, field
from functools import lru_cache
from typing import Any, Dict, List, Optional


# ---------------------------------------------------------------------------
# Data Transfer Object
# ---------------------------------------------------------------------------

@dataclass
class TeachingContext:
    """Compact context object returned to the orchestrator for a node."""
    node_id: str
    title: str
    subject: str
    topic: str
    mastery_status: Optional[str] = None
    grade_level: Optional[str] = None
    concept_tags: List[str] = field(default_factory=list)
    prerequisites: List[Dict[str, Any]] = field(default_factory=list)
    blocking_unmastered: List[str] = field(default_factory=list)
    forward_concepts: List[str] = field(default_factory=list)
    cross_subject_links: List[Dict[str, Any]] = field(default_factory=list)
    misconceptions: List[Dict[str, str]] = field(default_factory=list)
    diagnostic: Optional[Dict[str, Any]] = None
    on_failure_strategy: str = ""


# ---------------------------------------------------------------------------
# Traverser
# ---------------------------------------------------------------------------

class ConceptGraphTraverser:
    """In-memory structural traverser over a concept knowledge graph.

    Parameters
    ----------
    nodes_dir : str
        Root directory containing ``by_subject/*.json`` node files.
    enrichment_json_path : str | None
        Optional path to a pre-merged enrichment_parsed.json.
    """

    def __init__(
        self,
        nodes_dir: str,
        enrichment_json_path: Optional[str] = None,
    ) -> None:
        self._nodes_dir = nodes_dir
        self._nodes: Dict[str, Dict[str, Any]] = {}
        self._adj_out: Dict[str, List[str]] = {}
        self._adj_in: Dict[str, List[str]] = {}
        self._subject_index: Dict[str, List[str]] = {}
        self._tag_index: Dict[str, List[str]] = {}

        self._load(enrichment_json_path)
        self._build_indices()

    # ------------------------------------------------------------------
    # Loading
    # ------------------------------------------------------------------

    def _load(self, enrichment_json_path: Optional[str]) -> None:
        """Load nodes from enrichment JSON or individual per-subject files."""
        if enrichment_json_path and os.path.isfile(enrichment_json_path):
            self._load_enrichment(enrichment_json_path)
        else:
            self._load_per_subject()

    def _load_enrichment(self, path: str) -> None:
        with open(path, "r", encoding="utf-8") as fh:
            data = json.load(fh)
        if isinstance(data, list):
            for node in data:
                nid = node.get("node_id")
                if nid:
                    self._nodes[nid] = node
        elif isinstance(data, dict):
            self._nodes = {k: v for k, v in data.items()}

    def _load_per_subject(self) -> None:
        by_subject_dir = os.path.join(self._nodes_dir, "by_subject")
        if not os.path.isdir(by_subject_dir):
            warnings.warn(
                f"Nodes directory not found: {by_subject_dir}"
            )
            return
        for fname in os.listdir(by_subject_dir):
            if not fname.endswith(".json"):
                continue
            filepath = os.path.join(by_subject_dir, fname)
            with open(filepath, "r", encoding="utf-8") as fh:
                try:
                    data = json.load(fh)
                except json.JSONDecodeError:
                    warnings.warn(f"Skipping corrupt file: {filepath}")
                    continue
            nodes_list = data if isinstance(data, list) else [data]
            for node in nodes_list:
                nid = node.get("node_id")
                if nid:
                    self._nodes[nid] = node

    def _build_indices(self) -> None:
        for nid, node in self._nodes.items():
            # Forward adjacency
            for prereq in node.get("prerequisites", []):
                self._adj_out.setdefault(nid, []).append(prereq)
                self._adj_in.setdefault(prereq, []).append(nid)

            # Subject index
            subject = node.get("subject", "unknown")
            self._subject_index.setdefault(subject, []).append(nid)

            # Tag index
            for tag in node.get("concept_tags", []):
                self._tag_index.setdefault(tag, []).append(nid)

    # ------------------------------------------------------------------
    # Primitive helpers
    # ------------------------------------------------------------------

    @lru_cache(maxsize=1000)
    def _safe_node(self, node_id: str) -> Dict[str, Any]:
        """Return node dict or empty dict with a warning."""
        if node_id in self._nodes:
            return self._nodes[node_id]
        warnings.warn(f"Node not found: {node_id}")
        return {}

    def _node_ids(self, node_id: str) -> List[str]:
        return list(self._nodes.keys())

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def get_concept(self, node_id: str) -> Dict[str, Any]:
        """Return all fields for a node."""
        return dict(self._safe_node(node_id))

    @lru_cache(maxsize=1000)
    def get_prerequisites(
        self,
        node_id: str,
        depth: int = 3,
    ) -> List[Dict[str, Any]]:
        """BFS up to *depth* levels. Each result: {node_id, title, subject, mastery_status, is_blocking}."""
        node = self._safe_node(node_id)
        if not node:
            return []

        prereqs: List[str] = list(node.get("prerequisites", []))
        visited: set = {node_id}
        results: List[Dict[str, Any]] = []
        frontier = list(prereqs)

        for level in range(depth):
            next_frontier: List[str] = []
            for pid in frontier:
                if pid in visited:
                    continue
                visited.add(pid)
                pnode = self._safe_node(pid)
                if not pnode:
                    continue
                results.append({
                    "node_id": pid,
                    "title": pnode.get("title", ""),
                    "subject": pnode.get("subject", ""),
                    "mastery_status": pnode.get("mastery_status"),
                    "is_blocking": pnode.get("is_blocking", False),
                })
                for ppid in pnode.get("prerequisites", []):
                    if ppid not in visited:
                        next_frontier.append(ppid)
            frontier = next_frontier
            if not frontier:
                break

        return results

    @lru_cache(maxsize=1000)
    def get_forward_concepts(self, node_id: str) -> List[Dict[str, Any]]:
        """Return concepts that list *node_id* as a prerequisite."""
        node = self._safe_node(node_id)
        if not node:
            return []
        child_ids = self._adj_in.get(node_id, [])
        return [
            {k: child.get(k) for k in ("node_id", "title", "subject", "topic")}
            for child_id in child_ids
            if (child := self._safe_node(child_id))
        ]

    @lru_cache(maxsize=1000)
    def get_cross_subject_links(self, node_id: str) -> List[Dict[str, Any]]:
        """Return cross-subject links embedded in the node."""
        node = self._safe_node(node_id)
        if not node:
            return []
        raw = node.get("cross_subject_links", [])
        return [
            {
                "node_id": link.get("node_id", ""),
                "subject": link.get("subject", ""),
                "topic": link.get("topic", ""),
                "reason": link.get("reason", ""),
            }
            for link in raw
        ]

    @lru_cache(maxsize=1000)
    def get_misconceptions(
        self,
        node_id: str,
        include_prereqs: bool = False,
    ) -> List[Dict[str, str]]:
        """Return {misconception, explanation, correction} dicts."""
        node = self._safe_node(node_id)
        if not node:
            return []

        results = [
            {
                "misconception": m.get("misconception", ""),
                "explanation": m.get("explanation", ""),
                "correction": m.get("correction", ""),
            }
            for m in node.get("misconceptions", [])
        ]

        if include_prereqs:
            for prereq_id in node.get("prerequisites", []):
                pnode = self._safe_node(prereq_id)
                if pnode:
                    for m in pnode.get("misconceptions", []):
                        results.append({
                            "misconception": m.get("misconception", ""),
                            "explanation": m.get("explanation", ""),
                            "correction": m.get("correction", ""),
                        })

        return results

    @lru_cache(maxsize=1000)
    def get_diagnostic_question(self, node_id: str) -> Dict[str, Any]:
        """Return {question, answer, level} or {} if none."""
        node = self._safe_node(node_id)
        if not node:
            return {}
        dq = node.get("diagnostic_question", {})
        return {
            "question": dq.get("question", ""),
            "answer": dq.get("answer", ""),
            "level": dq.get("level", ""),
        }

    @lru_cache(maxsize=1000)
    def get_on_failure_strategy(self, node_id: str) -> str:
        """Return remediation strategy string for this node."""
        node = self._safe_node(node_id)
        return node.get("on_failure_strategy", "") if node else ""

    def get_teaching_context(
        self,
        node_id: str,
        student_mastery_map: Optional[Dict[str, str]] = None,
    ) -> Dict[str, Any]:
        """Compact context dict for the orchestrator."""
        node = self._safe_node(node_id)
        if not node:
            return {}

        mastery = (
            student_mastery_map.get(node_id) if student_mastery_map else None
        ) or node.get("mastery_status")

        prereqs = self.get_prerequisites(node_id)
        blocking = [p["node_id"] for p in prereqs if p.get("is_blocking")]

        mastery_map = student_mastery_map or {}

        context = TeachingContext(
            node_id=node_id,
            title=node.get("title", ""),
            subject=node.get("subject", ""),
            topic=node.get("topic", ""),
            mastery_status=mastery,
            grade_level=node.get("grade_level"),
            concept_tags=list(node.get("concept_tags", [])),
            prerequisites=prereqs,
            blocking_unmastered=blocking,
            forward_concepts=[
                fc["node_id"]
                for fc in self.get_forward_concepts(node_id)
            ],
            cross_subject_links=self.get_cross_subject_links(node_id),
            misconceptions=self.get_misconceptions(node_id),
            diagnostic=self.get_diagnostic_question(node_id) or None,
            on_failure_strategy=self.get_on_failure_strategy(node_id),
        )
        return context.__dict__

    @lru_cache(maxsize=1000)
    def get_prerequisite_chain(self, node_id: str) -> List[str]:
        """Full prerequisite chain from root(s) to *node_id* (DFS)."""
        node = self._safe_node(node_id)
        if not node:
            return []

        memo: Dict[str, List[str]] = {}

        def _chain(nid: str) -> List[str]:
            if nid in memo:
                return memo[nid]
            n = self._safe_node(nid)
            if not n:
                memo[nid] = []
                return []
            prereqs = n.get("prerequisites", [])
            if not prereqs:
                memo[nid] = [nid]
                return [nid]
            chain_segments = [_chain(p) for p in prereqs if _chain(p)]
            if chain_segments:
                longest = max(chain_segments, key=len)
                result = longest + [nid]
            else:
                result = [nid]
            memo[nid] = result
            return result

        return _chain(node_id)

    def find_root_cause(
        self,
        node_id: str,
        student_mastery_map: Dict[str, str],
    ) -> str:
        """Trace back through prereqs to find the first unmastered blocking prerequisite."""
        node = self._safe_node(node_id)
        if not node:
            return f"Cannot diagnose: node '{node_id}' not found."

        queue: List[tuple] = [(node_id, 0)]
        visited: set = {node_id}

        while queue:
            current_id, _ = queue.pop(0)
            cnode = self._safe_node(current_id)
            if not cnode:
                continue
            for pid in cnode.get("prerequisites", []):
                if pid in visited:
                    continue
                visited.add(pid)
                pnode = self._safe_node(pid)
                if not pnode:
                    continue
                status = student_mastery_map.get(pid)
                if status != "mastered":
                    blocking = pnode.get("is_blocking", False)
                    label = "blocking" if blocking else "unmastered"
                    return (
                        f"Root cause: '{pnode.get('title', pid)}' "
                        f"({pnode.get('subject', '')}) "
                        f"is {label} for '{node.get('title', node_id)}'."
                    )
                queue.append((pid, 0))

        return (
            f"All prerequisites for '{node.get('title', node_id)}' "
            f"are mastered. Issue may be within the concept itself."
        )

    @lru_cache(maxsize=1000)
    def get_related_by_tags(self, node_id: str) -> List[Dict[str, Any]]:
        """Return other concepts sharing at least one concept_tag."""
        node = self._safe_node(node_id)
        if not node:
            return []
        tags = set(node.get("concept_tags", []))
        if not tags:
            return []
        related: List[Dict[str, Any]] = []
        seen: set = {node_id}
        for tag in tags:
            for candidate_id in self._tag_index.get(tag, []):
                if candidate_id in seen:
                    continue
                seen.add(candidate_id)
                cnode = self._safe_node(candidate_id)
                if cnode:
                    related.append({
                        "node_id": candidate_id,
                        "title": cnode.get("title", ""),
                        "subject": cnode.get("subject", ""),
                        "topic": cnode.get("topic", ""),
                        "shared_tags": sorted(
                            tags & set(cnode.get("concept_tags", []))
                        ),
                    })
        return related

    def __len__(self) -> int:
        return len(self._nodes)

    def __contains__(self, node_id: str) -> bool:
        return node_id in self._nodes

    def __repr__(self) -> str:
        return (
            f"ConceptGraphTraverser("
            f"nodes={len(self._nodes)}, "
            f"subjects={len(self._subject_index)})"
        )