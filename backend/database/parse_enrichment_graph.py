"""Parse enrichment .marker files to extract knowledge graph nodes and edges.

Reads:
  - C:/Users/Alesha4285/Desktop/cisce/_nodes_{subject}.txt  (node inventory)
  - {subject_dir}/enrichment/*.marker                        (content + prerequisites)

Extracts:
  - Node IDs, titles, class level, subject, chapter
  - PREREQ edges (same-class prerequisites)
  - DEPTH_PREREQ edges (cross-class prerequisites)
  - TEXT_WALKTHROUGH references (In Class N, previous node, etc.)

Outputs:
  - D:/node_generator/atomic_graph/cisce_stem/{subject}_graph.json

Usage:
    python -m backend.database.parse_enrichment_graph --subject=physics
    python -m backend.database.parse_enrichment_graph --subject=all
    python -m backend.database.parse_enrichment_graph --subject=physics --verify
"""

import argparse
import json
import re
import os
from pathlib import Path
from collections import defaultdict

# Subject configurations
SUBJECTS = {
    "physics": {
        "nodes_file": "C:/Users/Alesha4285/Desktop/cisce/_nodes_physics.txt",
        "enrichment_dir": "C:/Users/Alesha4285/Desktop/cisce/physics/enrichment",
        "subject_code": "phy",
        "subject_name": "Physics",
    },
    "chem": {
        "nodes_file": "C:/Users/Alesha4285/Desktop/cisce/_nodes_chem.txt",
        "enrichment_dir": "C:/Users/Alesha4285/Desktop/chemistry/enrichment",
        "subject_code": "chem",
        "subject_name": "Chemistry",
    },
    "bio": {
        "nodes_file": "C:/Users/Alesha4285/Desktop/cisce/_nodes_bio.txt",
        "enrichment_dir": "C:/Users/Alesha4285/Desktop/cisce/bio/enrichment",
        "subject_code": "bio",
        "subject_name": "Biology",
    },
    "maths": {
        "nodes_file": "C:/Users/Alesha4285/Desktop/cisce/_nodes_maths.txt",
        "enrichment_dir": "C:/Users/Alesha4285/Desktop/cisce/maths/enrichment",
        "subject_code": "math",
        "subject_name": "Mathematics",
    },
}

OUTPUT_DIR = Path("D:/node_generator/atomic_graph/cisce_stem")

# Node ID pattern: c{class}_{subject}_{number}
NODE_ID_PATTERN = re.compile(r'c(\d+)_(\w+)_(\d+)')

# Prerequisite patterns - capture all variations
# "PREREQ c10_phy_001" or "PREREQ node c10_phy_001"
PREREQ_PATTERN = re.compile(r'PREREQ\s+(?:node\s+)?(c\d+_\w+_\d+)')
# "DEPTH_PREREQ c9_phy_011" or "DEPTH_PREREQ node c9_phy_011"
DEPTH_PREREQ_PATTERN = re.compile(r'DEPTH_PREREQ\s+(?:node\s+)?(c\d+_\w+_\d+)')

# Node header in enrichment files: "--- NODE c10_phy_001 ---"
NODE_HEADER_PATTERN = re.compile(r'^---\s+NODE\s+(c\d+_\w+_\d+)\s+---', re.MULTILINE)

# Title line: "TITLE: ..."
TITLE_PATTERN = re.compile(r'^TITLE:\s*(.+)$', re.MULTILINE)

# "In the previous node (c10_phy_001)"
PREV_NODE_PATTERN = re.compile(r'previous node\s+\(?(c\d+_\w+_\d+)\)?')

# "In Class 8 (c8_phy_011)" or "In Class 8, you learned ... c8_phy_011"
IN_CLASS_PATTERN = re.compile(r'In Class\s+\d+.*?\(?(c\d+_\w+_\d+)\)?', re.DOTALL)


def parse_nodes_file(filepath: str) -> dict:
    """Parse _nodes_{subject}.txt to get all valid node IDs and titles."""
    nodes = {}
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            m = NODE_ID_PATTERN.match(line)
            if m:
                node_id = line.split(':')[0].strip()
                title = line.split(':', 1)[1].strip() if ':' in line else ''
                nodes[node_id] = title
    return nodes


def parse_enrichment_file(filepath: str) -> list[dict]:
    """Parse a single enrichment .marker file and extract nodes with edges."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    nodes = []

    # Split by node headers
    parts = NODE_HEADER_PATTERN.split(content)

    # parts[0] is preamble, then alternating: node_id, content, node_id, content...
    for i in range(1, len(parts), 2):
        node_id = parts[i]
        node_content = parts[i + 1] if i + 1 < len(parts) else ''

        # Extract title
        title_match = TITLE_PATTERN.search(node_content)
        title = title_match.group(1).strip() if title_match else ''

        # Extract class from node_id
        class_match = NODE_ID_PATTERN.match(node_id)
        class_level = int(class_match.group(1)) if class_match else 0
        subject_code = class_match.group(2) if class_match else "unknown"

        # Extract prerequisites
        prereqs = set()
        depth_prereqs = set()

        # PREREQ patterns
        for m in PREREQ_PATTERN.finditer(node_content):
            prereqs.add(m.group(1))

        for m in DEPTH_PREREQ_PATTERN.finditer(node_content):
            depth_prereqs.add(m.group(1))

        # Previous node references (same-class)
        for m in PREV_NODE_PATTERN.finditer(node_content):
            ref = m.group(1)
            if ref != node_id:
                prereqs.add(ref)

        # In Class N references (cross-class depth prereqs)
        for m in IN_CLASS_PATTERN.finditer(node_content):
            ref = m.group(1)
            if ref != node_id:
                depth_prereqs.add(ref)

        # Don't self-reference
        prereqs.discard(node_id)
        depth_prereqs.discard(node_id)

        # Remove depth_prereqs from prereqs (avoid duplication)
        prereqs -= depth_prereqs

        nodes.append({
            "node_id": node_id,
            "topic": title,
            "chapter": "",
            "chapter_name": "",
            "class": class_level,
            "subject": subject_code,
            "board": "CISCE",
            "prerequisite_node_ids": sorted(prereqs),
            "depth_progression_prereqs": sorted(depth_prereqs),
            "forward_node_ids": [],  # Will be computed
            "is_root": len(prereqs) == 0 and len(depth_prereqs) == 0,
            "content_snippet": title,
            "concept_tags": [],
            "scope_constraints": [],
            "prerequisite_reasons": {},
            "forward_reasons": {},
            "cross_subject_prereqs": [],
            "cross_subject_reasons": {},
        })

    return nodes


def compute_forward_links(all_nodes: list[dict]) -> None:
    """Compute forward_node_ids from prerequisite_node_ids + depth_progression_prereqs."""
    # Build reverse map: for each prereq, which nodes depend on it
    forward_map = defaultdict(list)

    for node in all_nodes:
        node_id = node["node_id"]
        for prereq in node["prerequisite_node_ids"] + node["depth_progression_prereqs"]:
            forward_map[prereq].append(node_id)

    # Assign forward links
    for node in all_nodes:
        node["forward_node_ids"] = sorted(forward_map.get(node["node_id"], []))


def verify_graph(nodes: list[dict], valid_node_ids: set, subject_name: str) -> dict:
    """Verify graph integrity. Return report dict."""
    report = {
        "subject": subject_name,
        "total_nodes": len(nodes),
        "valid_node_ids": len(valid_node_ids),
        "missing_from_enrichment": [],
        "missing_from_nodes_file": [],
        "dangling_prereqs": [],
        "dangling_depth_prereqs": [],
        "cross_subject_refs": [],
        "self_references": [],
        "duplicate_nodes": [],
        "nodes_with_no_prereqs": 0,
        "nodes_with_no_forward": 0,
    }

    # Check for nodes in _nodes file but not in enrichment
    enrichment_ids = {n["node_id"] for n in nodes}
    report["missing_from_enrichment"] = sorted(valid_node_ids - enrichment_ids)

    # Check for nodes in enrichment but not in _nodes file
    report["missing_from_nodes_file"] = sorted(enrichment_ids - valid_node_ids)

    # Check for duplicate nodes
    id_counts = defaultdict(int)
    for n in nodes:
        id_counts[n["node_id"]] += 1
    report["duplicate_nodes"] = [nid for nid, c in id_counts.items() if c > 1]

    # Check for dangling prerequisite references
    # Cross-subject refs (e.g. physics -> maths) are valid, just tracked separately
    all_known_ids = valid_node_ids | enrichment_ids
    for node in nodes:
        for prereq in node["prerequisite_node_ids"]:
            if prereq not in all_known_ids:
                # Check if it's a cross-subject reference (different subject code)
                node_match = NODE_ID_PATTERN.match(node["node_id"])
                prereq_match = NODE_ID_PATTERN.match(prereq)
                if node_match and prereq_match and node_match.group(2) != prereq_match.group(2):
                    report["cross_subject_refs"].append(f"{node['node_id']} -> {prereq}")
                else:
                    report["dangling_prereqs"].append(f"{node['node_id']} -> {prereq}")
        for prereq in node["depth_progression_prereqs"]:
            if prereq not in all_known_ids:
                node_match = NODE_ID_PATTERN.match(node["node_id"])
                prereq_match = NODE_ID_PATTERN.match(prereq)
                if node_match and prereq_match and node_match.group(2) != prereq_match.group(2):
                    report["cross_subject_refs"].append(f"{node['node_id']} -> {prereq} (depth)")
                else:
                    report["dangling_depth_prereqs"].append(f"{node['node_id']} -> {prereq}")

    report["nodes_with_no_prereqs"] = sum(
        1 for n in nodes if not n["prerequisite_node_ids"] and not n["depth_progression_prereqs"]
    )
    report["nodes_with_no_forward"] = sum(1 for n in nodes if not n["forward_node_ids"])

    return report


def process_subject(subject_key: str, verify: bool = False) -> dict:
    """Process a single subject: parse, compute forward links, verify, output."""
    config = SUBJECTS[subject_key]
    print(f"\n{'='*60}")
    print(f"Processing {config['subject_name']} ({subject_key})")
    print(f"{'='*60}")

    # Step 1: Parse nodes file
    print(f"\n[1/4] Parsing nodes file: {config['nodes_file']}")
    valid_nodes = parse_nodes_file(config["nodes_file"])
    print(f"  Found {len(valid_nodes)} valid node IDs")

    # Step 2: Parse enrichment files
    print(f"\n[2/4] Parsing enrichment files from: {config['enrichment_dir']}")
    enrich_dir = Path(config["enrichment_dir"])
    marker_files = sorted(enrich_dir.glob("*.marker"))
    print(f"  Found {len(marker_files)} marker files")

    all_nodes = []
    seen_ids = set()
    duplicates_skipped = 0
    for f in marker_files:
        nodes = parse_enrichment_file(str(f))
        for node in nodes:
            if node["node_id"] in seen_ids:
                duplicates_skipped += 1
                continue
            seen_ids.add(node["node_id"])
            all_nodes.append(node)
    print(f"  Extracted {len(all_nodes)} unique nodes from enrichment files")
    if duplicates_skipped:
        print(f"  Skipped {duplicates_skipped} duplicate node entries")

    # Step 3: Compute forward links
    print(f"\n[3/4] Computing forward links...")
    compute_forward_links(all_nodes)

    total_prereqs = sum(len(n["prerequisite_node_ids"]) for n in all_nodes)
    total_depth = sum(len(n["depth_progression_prereqs"]) for n in all_nodes)
    total_forward = sum(len(n["forward_node_ids"]) for n in all_nodes)
    print(f"  PREREQ edges: {total_prereqs}")
    print(f"  DEPTH_PREREQ edges: {total_depth}")
    print(f"  Forward links: {total_forward}")

    # Step 4: Verify
    report = None
    if verify:
        print(f"\n[4/4] Verifying graph integrity...")
        report = verify_graph(all_nodes, set(valid_nodes.keys()), config["subject_name"])
        print(f"  Nodes in _nodes file: {report['valid_node_ids']}")
        print(f"  Nodes in enrichment: {report['total_nodes']}")
        print(f"  Missing from enrichment: {len(report['missing_from_enrichment'])}")
        print(f"  Missing from _nodes file: {len(report['missing_from_nodes_file'])}")
        print(f"  Dangling PREREQ refs: {len(report['dangling_prereqs'])}")
        print(f"  Dangling DEPTH_PREREQ refs: {len(report['dangling_depth_prereqs'])}")
        print(f"  Cross-subject refs: {len(report['cross_subject_refs'])}")
        print(f"  Duplicate nodes: {len(report['duplicate_nodes'])}")
        print(f"  Root nodes (no prereqs): {report['nodes_with_no_prereqs']}")
        print(f"  Leaf nodes (no forward): {report['nodes_with_no_forward']}")

        if report["missing_from_enrichment"]:
            print(f"\n  WARNING: {len(report['missing_from_enrichment'])} nodes in _nodes file but no enrichment file:")
            for nid in report["missing_from_enrichment"][:10]:
                print(f"    {nid}: {valid_nodes.get(nid, '???')}")
            if len(report["missing_from_enrichment"]) > 10:
                print(f"    ... and {len(report['missing_from_enrichment']) - 10} more")

        if report["dangling_prereqs"]:
            print(f"\n  WARNING: {len(report['dangling_prereqs'])} dangling PREREQ references:")
            for ref in report["dangling_prereqs"][:10]:
                print(f"    {ref}")
            if len(report["dangling_prereqs"]) > 10:
                print(f"    ... and {len(report['dangling_prereqs']) - 10} more")

        if report["dangling_depth_prereqs"]:
            print(f"\n  WARNING: {len(report['dangling_depth_prereqs'])} dangling DEPTH_PREREQ references:")
            for ref in report["dangling_depth_prereqs"][:10]:
                print(f"    {ref}")

    # Output
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_file = OUTPUT_DIR / f"{subject_key}_graph.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_nodes, f, indent=2, ensure_ascii=False)
    print(f"\n  Output: {output_file} ({len(all_nodes)} nodes)")

    return report if report else {"total_nodes": len(all_nodes)}


def main():
    parser = argparse.ArgumentParser(description="Parse enrichment files into graph JSON")
    parser.add_argument("--subject", choices=["physics", "chem", "bio", "maths", "all"],
                        default="all", help="Subject to process")
    parser.add_argument("--verify", action="store_true", help="Verify graph integrity")
    args = parser.parse_args()

    if args.subject == "all":
        for subj in ["physics", "chem", "bio", "maths"]:
            process_subject(subj, verify=args.verify)
    else:
        process_subject(args.subject, verify=args.verify)


if __name__ == "__main__":
    main()
