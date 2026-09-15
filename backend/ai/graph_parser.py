"""Parse CISCE marker files into a structured knowledge graph.

Reads:
  - C:/Users/Alesha4285/Desktop/cisce/maths/class12_maths_nodes.marker
  - C:/Users/Alesha4285/Desktop/cisce/maths/enrichment/c12_maths_enrichment_part*.marker

Produces:
  - A Graph object with nodes (dict of properties) and edges (prerequisite links).
  - Each node carries: node_id, topic, syllabus, examples, mastery_criteria,
    scope_boundary, prereq list, depth_prereq list, reasons, and enrichment
    content (definition, text_walkthrough, diagnostic_questions, etc.).

The graph is used by graph_solver.py to route questions to the correct
curriculum node and identify the mathematical operations needed.
"""

from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

# CISCE maths corpus lives outside the repo; override CISCE_CONTENT_ROOT when
# deploying to a machine without the author's Desktop layout.
_CISCE_ROOT = Path(os.environ.get(
    "CISCE_CONTENT_ROOT", r"C:\Users\Alesha4285\Desktop\cisce"))
NODES_FILE = _CISCE_ROOT / "maths" / "class12_maths_nodes.marker"
ENRICHMENT_DIR = _CISCE_ROOT / "maths" / "enrichment"
CACHE_FILE = Path(__file__).parent / "_graph_cache.json"


# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

@dataclass
class GraphNode:
    node_id: str
    topic: str
    section: str = ""
    syllabus: str = ""
    cognitive_level: str = ""
    difficulty: str = ""
    mastery_criteria: str = ""
    examples: str = ""
    vocabulary: str = ""
    spiral_topic: str = ""
    scope_level: str = ""
    scope_boundary: str = ""
    is_root: bool = False
    prereq: list[str] = field(default_factory=list)
    prereq_reason: str = ""
    depth_prereq: list[str] = field(default_factory=list)
    depth_reason: str = ""
    exam_relevance: str = ""
    exam_weightage: str = ""
    competency_level: str = ""
    prereq_strength: str = ""
    # Enrichment content
    definition: str = ""
    text_walkthrough: str = ""
    eli5: str = ""
    common_misconception: str = ""
    diagnostic_question: str = ""
    on_failure: str = ""
    enrichment_cognitive_level: str = ""
    enrichment_mastery_criteria: str = ""
    enrichment_scope_boundary: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {k: v for k, v in self.__dict__.items()}

    @classmethod
    def from_dict(cls, d: dict[str, Any]) -> "GraphNode":
        return cls(**{k: v for k, v in d.items() if k in cls.__dataclass_fields__})


@dataclass
class Graph:
    nodes: dict[str, GraphNode] = field(default_factory=dict)

    def add_node(self, node: GraphNode) -> None:
        self.nodes[node.node_id] = node

    def prereq_edges(self) -> list[tuple[str, str, str]]:
        """Return (source, target, reason) for all PREREQ edges.
        Edge direction: node -> its prerequisite (node REQUIRES prereq)."""
        edges = []
        for nid, node in self.nodes.items():
            for p in node.prereq:
                if p and p != "none":
                    edges.append((nid, p, node.prereq_reason))
        return edges

    def depth_edges(self) -> list[tuple[str, str, str]]:
        """Return (source, target, reason) for all DEPTH_PREREQ edges."""
        edges = []
        for nid, node in self.nodes.items():
            for p in node.depth_prereq:
                if p and p != "none":
                    edges.append((nid, p, node.depth_reason))
        return edges

    def children_of(self, node_id: str) -> list[str]:
        """Nodes that have node_id as a prerequisite."""
        return [nid for nid, node in self.nodes.items()
                if node_id in node.prereq or node_id in node.depth_prereq]

    def ancestors(self, node_id: str, depth: int = 5) -> list[str]:
        """Walk prerequisite chain backward (BFS up to depth)."""
        seen = set()
        queue = [(node_id, 0)]
        while queue:
            nid, d = queue.pop(0)
            if d >= depth or nid in seen:
                continue
            seen.add(nid)
            node = self.nodes.get(nid)
            if not node:
                continue
            for p in node.prereq + node.depth_prereq:
                if p and p != "none" and p not in seen:
                    queue.append((p, d + 1))
        seen.discard(node_id)
        return list(seen)

    def to_json(self) -> str:
        return json.dumps(
            {nid: n.to_dict() for nid, n in self.nodes.items()},
            indent=2, ensure_ascii=False,
        )


# ---------------------------------------------------------------------------
# Node file parser
# ---------------------------------------------------------------------------

NODE_HEADER_RE = re.compile(r"^---\s+NODE\s+(c\d+_\w+_\d+)\s*:")
FIELD_RE = re.compile(r"^([A-Z][A-Z_]+):\s*(.*)$")


def parse_nodes_file(path: Path) -> dict[str, GraphNode]:
    """Parse a classXX_subject_nodes.marker file."""
    text = path.read_text(encoding="utf-8")
    lines = text.split("\n")
    nodes: dict[str, GraphNode] = {}
    current: GraphNode | None = None
    for line in lines:
        m = NODE_HEADER_RE.match(line)
        if m:
            if current:
                nodes[current.node_id] = current
            nid = m.group(1)
            topic = line[m.end():].rstrip(" -").strip()
            current = GraphNode(node_id=nid, topic=topic)
            continue
        if current is None:
            continue
        fm = FIELD_RE.match(line)
        if not fm:
            continue
        key, val = fm.group(1), fm.group(2).strip()
        if key == "NODE":
            continue
        _set_node_field(current, key, val)
    if current:
        nodes[current.node_id] = current
    return nodes


def _set_node_field(node: GraphNode, key: str, val: str) -> None:
    mapping = {
        "SECTION": "section",
        "SYLLABUS": "syllabus",
        "COGNITIVE_LEVEL": "cognitive_level",
        "DIFFICULTY": "difficulty",
        "MASTERY_CRITERIA": "mastery_criteria",
        "EXAMPLES": "examples",
        "VOCABULARY": "vocabulary",
        "SPIRAL_TOPIC": "spiral_topic",
        "SCOPE_LEVEL": "scope_level",
        "SCOPE_BOUNDARY": "scope_boundary",
        "IS_ROOT": "is_root",
        "PREREQ": "prereq",
        "REASON": "prereq_reason",
        "DEPTH_PREREQ": "depth_prereq",
        "DEPTH_REASON": "depth_reason",
        "EXAM_RELEVANCE": "exam_relevance",
        "EXAM_WEIGHTAGE": "exam_weightage",
        "COMPETENCY_LEVEL": "competency_level",
        "PREREQ_STRENGTH": "prereq_strength",
    }
    field_name = mapping.get(key)
    if not field_name:
        return
    if field_name in ("prereq", "depth_prereq"):
        items = [p.strip() for p in re.split(r"[,\s]+", val) if p.strip()]
        items = [p for p in items if p and p.lower() != "none"]
        setattr(node, field_name, items)
    elif field_name == "is_root":
        setattr(node, field_name, val.lower() == "true")
    else:
        setattr(node, field_name, val)


# ---------------------------------------------------------------------------
# Enrichment file parser
# ---------------------------------------------------------------------------

ENRICH_NODE_RE = re.compile(r"^---\s+NODE\s+(c\d+_\w+_\d+)\s*---")
ENRICH_FIELD_RE = re.compile(r"^([A-Z][A-Z_]+):\s*(\|?)\s*$")


def parse_enrichment_file(path: Path) -> dict[str, dict[str, str]]:
    """Parse one enrichment marker file. Returns {node_id: {field: text}}."""
    text = path.read_text(encoding="utf-8")
    lines = text.split("\n")
    results: dict[str, dict[str, str]] = {}
    current_id: str | None = None
    current_fields: dict[str, str] = {}
    current_key: str | None = None
    in_block = False

    for line in lines:
        m = ENRICH_NODE_RE.match(line)
        if m:
            if current_id:
                results[current_id] = current_fields
            current_id = m.group(1)
            current_fields = {}
            current_key = None
            in_block = False
            continue
        if current_id is None:
            continue
        fm = ENRICH_FIELD_RE.match(line)
        if fm:
            # Save previous block
            current_key = fm.group(1)
            pipe = fm.group(2)
            if pipe == "|":
                in_block = True
                current_fields[current_key] = ""
            else:
                in_block = False
                # Value is on same line — but our regex consumed it.
                # Re-match with value capture.
                fm2 = re.match(r"^([A-Z][A-Z_]+):\s*(.*)$", line)
                current_fields[current_key] = fm2.group(2).strip() if fm2 else ""
            continue
        if in_block and current_key:
            if line.strip() == "" and current_fields[current_key]:
                # blank line inside block — keep as paragraph break
                current_fields[current_key] += "\n"
            else:
                current_fields[current_key] += line + "\n"
            continue
        # Single-line field (e.g. COGNITIVE_LEVEL: apply)
        sm = re.match(r"^([A-Z][A-Z_]+):\s*(.*)$", line)
        if sm:
            current_fields[sm.group(1)] = sm.group(2).strip()

    if current_id:
        results[current_id] = current_fields
    return results


def merge_enrichment(graph: Graph, enrich_dir: Path, pattern: str = "c12_maths_enrichment_part*.marker") -> int:
    """Merge enrichment content into graph nodes. Returns count merged."""
    merged = 0
    for f in sorted(enrich_dir.glob(pattern)):
        parsed = parse_enrichment_file(f)
        for nid, fields in parsed.items():
            node = graph.nodes.get(nid)
            if not node:
                continue
            if "DEFINITION" in fields:
                node.definition = fields["DEFINITION"].strip()
            if "TEXT_WALKTHROUGH" in fields:
                node.text_walkthrough = fields["TEXT_WALKTHROUGH"].strip()
            if "ELI5" in fields:
                node.eli5 = fields["ELI5"].strip()
            if "COMMON_MISCONCEPTION" in fields:
                node.common_misconception = fields["COMMON_MISCONCEPTION"].strip()
            if "DIAGNOSTIC_QUESTION" in fields:
                node.diagnostic_question = fields["DIAGNOSTIC_QUESTION"].strip()
            if "ON_FAILURE" in fields:
                node.on_failure = fields["ON_FAILURE"].strip()
            if "COGNITIVE_LEVEL" in fields:
                node.enrichment_cognitive_level = fields["COGNITIVE_LEVEL"]
            if "MASTERY_CRITERIA" in fields:
                node.enrichment_mastery_criteria = fields["MASTERY_CRITERIA"].strip()
            if "SCOPE_BOUNDARY" in fields:
                node.enrichment_scope_boundary = fields["SCOPE_BOUNDARY"].strip()
            merged += 1
    return merged


# ---------------------------------------------------------------------------
# Build and cache
# ---------------------------------------------------------------------------

def build_graph(use_cache: bool = True) -> Graph:
    """Build the full graph from marker files (with optional JSON cache)."""
    if use_cache and CACHE_FILE.exists():
        data = json.loads(CACHE_FILE.read_text(encoding="utf-8"))
        return Graph(nodes={nid: GraphNode.from_dict(d) for nid, d in data.items()})

    graph = Graph()
    nodes = parse_nodes_file(NODES_FILE)
    for nid, node in nodes.items():
        graph.add_node(node)
    merge_enrichment(graph, ENRICHMENT_DIR)

    # Cache
    CACHE_FILE.write_text(graph.to_json(), encoding="utf-8")
    return graph


# ---------------------------------------------------------------------------
# Keyword index for routing
# ---------------------------------------------------------------------------

# Generic words that appear in many nodes and don't help with routing.
# Keep this SMALL — only truly generic words, not math terms.
_GENERIC_WORDS = frozenset({
    "that", "this", "from", "have", "been", "will", "would", "could",
    "should", "might", "must", "shall", "however", "therefore", "hence",
    "thus", "since", "because", "given", "find", "value", "determine",
    "calculate", "compute", "show", "prove", "verify", "check", "test",
    "question", "answer", "result", "solution", "problem", "example",
    "student", "class", "board", "exam", "examination", "paper",
    "note", "reserved", "covered", "teach", "learn", "study",
    "condition", "conditions", "instance", "instances", "general",
    "specific", "method", "approach", "technique", "procedure",
    "following", "every", "another", "various", "respectively",
    "namely", "candidate", "examiner", "teacher", "learner",
    "instructor", "beginner", "expert", "novice", "master",
    "amateur", "professional", "introduction", "overview",
    "summary", "review", "revision", "practice", "exercise",
    "homework", "assignment", "tutorial", "lecture", "lesson",
    "topic", "concept", "concepts", "idea", "ideas", "theme",
    "subject", "matter", "content", "material", "resource",
    "reference", "bibliography", "citation", "source", "sources",
    "document", "file", "record", "entry", "entries",
    "section", "subsection", "paragraph", "sentence", "word",
    "phrase", "clause", "statement", "remark", "comment",
    "observation", "note", "notes", "annotation", "footnote",
    "heading", "title", "label", "caption", "figure", "table",
    "chart", "graph", "diagram", "illustration", "picture",
    "image", "drawing", "sketch", "plot", "curve", "surface",
    "point", "line", "plane", "space", "region", "area",
    "boundary", "interior", "exterior", "limit", "section",
    "level", "grade", "mark", "marks", "score", "scores",
    "credit", "credits", "point", "points", "bonus", "penalty",
    "reward", "punishment", "prize", "award", "certificate",
    "diploma", "degree", "qualification", "certification",
    "enrollment", "registration", "admission", "application",
    "form", "forms", "format", "template", "pattern",
    "type", "types", "kind", "kinds", "category", "categories",
    "class", "classes", "group", "groups", "set", "sets",
    "collection", "family", "series", "sequence",
})


def build_keyword_index(graph: Graph) -> dict[str, list[str]]:
    """Build a keyword -> [node_ids] index for routing questions to nodes."""
    index: dict[str, list[str]] = {}
    for nid, node in graph.nodes.items():
        # Combine topic, syllabus, vocabulary, examples for keywords
        text = " ".join([
            node.topic, node.syllabus, node.vocabulary,
            node.examples, node.definition,
        ]).lower()
        # Extract significant words (4+ chars to reduce noise)
        words = re.findall(r"[a-z]{4,}", text)
        for w in set(words):
            if w in _GENERIC_WORDS:
                continue
            index.setdefault(w, []).append(nid)
    # Sort each list by node_id for determinism
    for k in index:
        index[k] = sorted(set(index[k]))
    return index


def route_question(graph: Graph, index: dict[str, list[str]], question: str) -> list[tuple[str, int]]:
    """Route a question to candidate nodes. Returns [(node_id, score)] sorted by score desc."""
    q_lower = question.lower()
    scores: dict[str, int] = {}
    for word, node_ids in index.items():
        if word in q_lower:
            for nid in node_ids:
                scores[nid] = scores.get(nid, 0) + 1
    # Boost score for topic name matches
    for nid, node in graph.nodes.items():
        topic_words = [w for w in re.findall(r"[a-z]{3,}", node.topic.lower())]
        topic_matches = sum(1 for w in topic_words if w in q_lower)
        if topic_matches > 0:
            scores[nid] = scores.get(nid, 0) + topic_matches * 3
    ranked = sorted(scores.items(), key=lambda x: -x[1])
    return ranked[:10]


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import sys
    use_cache = "--no-cache" not in sys.argv
    graph = build_graph(use_cache=use_cache)
    print(f"Nodes: {len(graph.nodes)}")
    print(f"PREREQ edges: {len(graph.prereq_edges())}")
    print(f"DEPTH edges: {len(graph.depth_edges())}")
    enriched = sum(1 for n in graph.nodes.values() if n.definition)
    print(f"Nodes with enrichment: {enriched}")
    # Print sample
    sample = list(graph.nodes.values())[0]
    print(f"\nSample node: {sample.node_id}")
    print(f"  Topic: {sample.topic}")
    print(f"  Prereq: {sample.prereq}")
    print(f"  Has definition: {bool(sample.definition)}")
    print(f"  Has diagnostic: {bool(sample.diagnostic_question)}")
    # Test routing
    idx = build_keyword_index(graph)
    test_q = "find the derivative of sin(x^2) using chain rule"
    hits = route_question(graph, idx, test_q)
    print(f"\nRouting test: '{test_q}'")
    for nid, score in hits[:5]:
        print(f"  {nid} (score={score}): {graph.nodes[nid].topic}")
