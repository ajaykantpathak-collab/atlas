"""Node mapper — maps parsed records to curriculum nodes using a 4-layer strategy.

Layer 1 (Deterministic): Copy node references from existing fields
    - node_id, node_tags, target_nodes, review_node_id, NODE_ID
    - These are explicit references placed by the original content authors.

Layer 2 (Structural): Extract node IDs from text fields using regex
    - Pattern: c\d+_\w+  (e.g., c10_phy_001, c11_acc_002)
    - Scans question_text, answer, model_answer, topic, instructions, etc.
    - Also extracts from parenthetical "(Node c11_acc_005)" patterns.

Layer 3 (Keyword): Match question text against node titles/definitions
    - Build a keyword index from enrichment node titles and definitions.
    - For records without node references, match on keyword overlap.
    - Requires minimum 2 keyword matches to assign (low confidence).
    - Mapped nodes are marked with confidence="keyword" and can be reviewed.

Layer 4 (Embedding): Semantic similarity using Granite 311M embeddings
    - DEFERRED to Phase 2 (requires embedding model installation).
    - Will use Qdrant hybrid search for high-quality semantic matching.

Output:
    D:\\platform\\parsed_output\\node_mappings.jsonl
    One line per record with:
        record_id, content_type, source_file, mapped_nodes (list of {node_id, layer, confidence})
"""

import json
import re
import sys
from pathlib import Path
from collections import defaultdict

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

OUTPUT_DIR = Path(r"D:\platform\parsed_output")

# Node ID pattern: c{class}_{subject}_{number} e.g., c10_phy_001, c11_acc_002
NODE_ID_PATTERN = re.compile(r"\b(c\d+_[a-z]+_\d+)\b", re.IGNORECASE)
# Broader pattern for multi-segment subjects: c9_maths_cfq_diagnostics, c10_econapp_012
NODE_ID_PATTERN_BROAD = re.compile(r"\b(c\d+_[a-z]+(?:_[a-z]+)*_\d+)\b", re.IGNORECASE)
# Parenthetical node reference: (Node c11_acc_005)
PAREN_NODE_PATTERN = re.compile(r"\(Node\s+(c\d+_[a-z]+_\d+)\)", re.IGNORECASE)
# "Target node:" prefix
TARGET_NODE_PREFIX = re.compile(r"Target\s+node:\s*(c[\d\w_,\s]+)", re.IGNORECASE)


def build_node_index():
    """Build an index of all known node IDs from enrichment data."""
    nodes = {}
    enrichment_file = OUTPUT_DIR / "enrichment.jsonl"
    if not enrichment_file.exists():
        return nodes

    with open(enrichment_file, encoding="utf-8-sig") as f:
        for line in f:
            r = json.loads(line)
            node_id = r.get("node_id")
            if node_id:
                nodes[node_id] = {
                    "title": r.get("title"),
                    "definition": r.get("definition"),
                    "class_level": r.get("class_level"),
                    "subject": r.get("subject"),
                    "cognitive_level": r.get("cognitive_level"),
                }
    return nodes


def layer1_deterministic(record: dict) -> list:
    """Layer 1: Extract node references from explicit fields."""
    mapped = []

    # node_id field (enrichment records ARE the node)
    node_id = record.get("node_id")
    if node_id and re.match(r"^c\d+_", node_id):
        mapped.append({
            "node_id": node_id,
            "layer": "deterministic",
            "confidence": "high",
            "source_field": "node_id",
        })

    # node_tags field (question_bank)
    node_tags = record.get("node_tags")
    if node_tags and isinstance(node_tags, list):
        for nt in node_tags:
            if nt and re.match(r"^c\d+_", nt):
                mapped.append({
                    "node_id": nt,
                    "layer": "deterministic",
                    "confidence": "high",
                    "source_field": "node_tags",
                })

    # target_nodes field (already extracted by parsers)
    target_nodes = record.get("target_nodes", [])
    if target_nodes and isinstance(target_nodes, list):
        for tn in target_nodes:
            if tn and re.match(r"^c\d+_", tn):
                mapped.append({
                    "node_id": tn,
                    "layer": "deterministic",
                    "confidence": "high",
                    "source_field": "target_nodes",
                })

    # review_node_id (enrichment on_failure)
    rni = record.get("review_node_id")
    if rni and re.match(r"^c\d+_", rni):
        mapped.append({
            "node_id": rni,
            "layer": "deterministic",
            "confidence": "high",
            "source_field": "review_node_id",
        })

    # Deduplicate by node_id, keeping highest confidence
    seen = {}
    for m in mapped:
        nid = m["node_id"]
        if nid not in seen:
            seen[nid] = m
    return list(seen.values())


def layer2_structural(record: dict, node_index: dict = None) -> list:
    """Layer 2: Extract node IDs from text fields using regex.
    
    Only accepts node IDs that match the standard pattern AND exist in the node index
    (if node_index is provided).
    """
    mapped = []

    # Text fields to scan for node IDs
    text_fields = [
        "question_text", "answer", "model_answer", "marking_scheme",
        "topic", "instructions", "skill_targeted", "diagnostic_question",
        "misconception_text", "correction", "why_wrong", "remediation",
        "source_ref", "mark_allocation", "definition", "text_walkthrough",
        "eli5", "common_misconception", "scope_boundary",
    ]

    found_nodes = set()
    for field in text_fields:
        val = record.get(field)
        if not val or not isinstance(val, str):
            continue

        # Standard pattern match (strict: c\d+_[a-z]+_\d+)
        for m in NODE_ID_PATTERN.finditer(val):
            found_nodes.add(m.group(1).lower())

        # Parenthetical node references
        for m in PAREN_NODE_PATTERN.finditer(val):
            found_nodes.add(m.group(1).lower())

        # "Target node:" prefix
        for m in TARGET_NODE_PREFIX.finditer(val):
            for nid in re.findall(r"c\d+_[a-z]+_\d+", m.group(1)):
                found_nodes.add(nid.lower())

    # Validate against node index if provided
    for nid in found_nodes:
        if node_index and nid not in node_index:
            continue  # Skip unknown nodes
        mapped.append({
            "node_id": nid,
            "layer": "structural",
            "confidence": "high",
            "source_field": "text_scan",
        })

    return mapped


def layer3_keyword(record: dict, node_index: dict) -> list:
    """Layer 3: Match question text against node titles and definitions using keyword overlap.

    Only applies when no nodes were found in layers 1-2.
    Uses keyword overlap with node title AND definition.
    - Title overlap: 2+ words = low confidence, 4+ = medium
    - Definition overlap: 5+ words = low confidence (definitions are long)
    Takes the best match (highest overlap), up to 3 candidates.
    """
    mapped = []

    # Skip if we already have mappings
    existing = record.get("_existing_mappings", [])
    if existing:
        return mapped

    # Get text to match against
    text = ""
    for field in ["question_text", "misconception_text", "topic", "diagnostic_question",
                  "answer", "model_answer"]:
        val = record.get(field)
        if val and isinstance(val, str):
            text += " " + val
    text = text.strip().lower()

    if not text or len(text) < 20:
        return mapped

    # Get subject filter
    subject = record.get("subject")
    class_level = record.get("class_level")

    # Tokenize text (filter short words, keep 4+ char words)
    text_words = set(w for w in re.findall(r"\b[a-z]{4,}\b", text) if len(w) > 3)

    if not text_words:
        return mapped

    # Match against node titles AND definitions
    candidates = []
    for node_id, node_data in node_index.items():
        # Filter by subject if known
        if subject and node_data.get("subject") and node_data["subject"] != subject:
            continue
        # Filter by class if known
        if class_level and node_data.get("class_level") and node_data["class_level"] != class_level:
            continue

        title = (node_data.get("title") or "").lower()
        definition = (node_data.get("definition") or "").lower()

        # Extract title words (4+ chars)
        title_words = set(w for w in re.findall(r"\b[a-z]{4,}\b", title) if len(w) > 3)
        # Extract definition words (4+ chars) — but only use a subset
        # (first 500 chars of definition to avoid over-matching)
        def_words = set(w for w in re.findall(r"\b[a-z]{4,}\b", definition[:500]) if len(w) > 3)

        # Count overlaps
        title_overlap = text_words & title_words
        def_overlap = text_words & def_words

        # Title overlap is weighted higher than definition overlap
        score = len(title_overlap) * 3 + len(def_overlap)

        # Require at least 2 title words OR 5 definition words
        if len(title_overlap) >= 2 or len(def_overlap) >= 5:
            all_overlap = title_overlap | def_overlap
            candidates.append({
                "node_id": node_id,
                "score": score,
                "title_overlap_count": len(title_overlap),
                "def_overlap_count": len(def_overlap),
                "overlap_words": list(all_overlap)[:8],
            })

    # Sort by score, take top 3
    candidates.sort(key=lambda x: -x["score"])
    for c in candidates[:3]:
        # Confidence: high title overlap = medium, else low
        confidence = "medium" if c["title_overlap_count"] >= 4 else "low"
        mapped.append({
            "node_id": c["node_id"],
            "layer": "keyword",
            "confidence": confidence,
            "source_field": "keyword_match",
            "overlap_count": c["title_overlap_count"] + c["def_overlap_count"],
            "overlap_words": c["overlap_words"],
        })

    return mapped


def map_record(record: dict, node_index: dict) -> dict:
    """Map a single record to nodes using all applicable layers."""
    # Layer 1: Deterministic
    l1 = layer1_deterministic(record)

    # Layer 2: Structural — skip for enrichment records.
    # Enrichment records are already deterministically mapped to their own
    # node_id. The structural layer would scan their definition/walkthrough/
    # on_failure text and find OTHER node IDs mentioned there (cross-references,
    # prerequisites, remediation targets) — these are references, not mappings.
    # Running structural on enrichment produces ~11,600 false positive mappings.
    if record.get("content_type") == "enrichment":
        l2 = []
    else:
        l2 = layer2_structural(record, node_index)

    # Combine layers 1 and 2, deduplicate
    all_mapped = {}
    for m in l1 + l2:
        nid = m["node_id"]
        if nid not in all_mapped:
            all_mapped[nid] = m

    # Layer 3: Keyword — DISABLED.
    # The keyword matcher produced too many false positives (~30-40% of
    # sampled mappings were wrong). Generic words like "plant", "system",
    # "triangle" caused cross-topic matches within the same subject.
    # Only deterministic (explicit node IDs) and structural (text-scanned
    # node IDs) mappings are trusted.
    # l3 = layer3_keyword(record, node_index)
    else:
        record["_existing_mappings"] = list(all_mapped.values())

    # Remove temporary field
    record.pop("_existing_mappings", None)

    return {
        "record_id": record.get("record_id"),
        "content_type": record.get("content_type"),
        "source_file": record.get("source_file"),
        "source_format": record.get("source_format"),
        "mapped_nodes": list(all_mapped.values()),
    }


def main():
    print("Node Mapper — 4-Layer Mapping")
    print("=" * 70)

    # Build node index from enrichment
    print("Building node index from enrichment data...")
    node_index = build_node_index()
    print(f"  Loaded {len(node_index)} nodes")

    # Process each content type
    content_types = ["enrichment", "question_bank", "diagnostics", "papers", "misconceptions", "drill_banks"]
    all_mappings = []
    stats = defaultdict(lambda: {"total": 0, "mapped": 0, "by_layer": defaultdict(int)})

    for ct in content_types:
        input_file = OUTPUT_DIR / f"{ct}.jsonl"
        if not input_file.exists():
            continue

        print(f"\nProcessing {ct}...")
        ct_mappings = []

        with open(input_file, encoding="utf-8-sig") as f:
            for line in f:
                record = json.loads(line)
                mapping = map_record(record, node_index)
                ct_mappings.append(mapping)
                all_mappings.append(mapping)

                stats[ct]["total"] += 1
                if mapping["mapped_nodes"]:
                    stats[ct]["mapped"] += 1
                    for mn in mapping["mapped_nodes"]:
                        stats[ct]["by_layer"][mn["layer"]] += 1

        print(f"  Mapped: {stats[ct]['mapped']}/{stats[ct]['total']} ({stats[ct]['mapped']/stats[ct]['total']*100:.1f}%)")
        for layer, count in sorted(stats[ct]["by_layer"].items()):
            print(f"    {layer}: {count}")

    # Write mappings
    output_file = OUTPUT_DIR / "node_mappings.jsonl"
    with open(output_file, "w", encoding="utf-8") as f:
        for m in all_mappings:
            f.write(json.dumps(m, ensure_ascii=False, default=str) + "\n")

    # Print summary
    print(f"\n{'='*70}")
    print(f"SUMMARY")
    print(f"{'='*70}")
    total = sum(s["total"] for s in stats.values())
    mapped = sum(s["mapped"] for s in stats.values())
    print(f"Total records: {total}")
    print(f"Mapped: {mapped}/{total} ({mapped/total*100:.1f}%)")
    print(f"Unmapped: {total - mapped}")
    print(f"\nBy content type:")
    for ct in content_types:
        s = stats[ct]
        if s["total"] > 0:
            pct = s["mapped"] / s["total"] * 100
            print(f"  {ct:20s}: {s['mapped']:>5}/{s['total']:>5} ({pct:.1f}%)")
    print(f"\nOutput: {output_file}")
    print(f"\nDone.")


if __name__ == "__main__":
    main()
