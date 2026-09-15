"""Verify the structure and integrity of ALL CISCE STEM content files on disk.

Scans every enrichment .marker file and every question_bank .marker file across
the 4 STEM subjects (physics, chemistry, biology, maths) and produces a detailed
report of:
  - Which sections are present/missing per file
  - Node ID extraction success
  - Structural anomalies (missing required sections, malformed headers)
  - Cross-check against _nodes_{subject}.txt inventory files
  - Cross-check against the generated graph JSON files

This script DOES NOT modify any data. It only reads and reports.

Usage:
    python -m backend.database.verify_all_content
    python -m backend.database.verify_all_content --subject=physics
    python -m backend.database.verify_all_content --detail
"""

import argparse
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

# ---------------------------------------------------------------------------
# Configuration — actual paths verified on disk
# ---------------------------------------------------------------------------
SUBJECTS = {
    "physics": {
        "nodes_file": "C:/Users/Alesha4285/Desktop/cisce/_nodes_physics.txt",
        "enrichment_dir": "C:/Users/Alesha4285/Desktop/cisce/physics/enrichment",
        "question_bank_dir": "C:/Users/Alesha4285/Desktop/cisce/physics/question_bank",
        "graph_json": "D:/node_generator/atomic_graph/cisce_stem/physics_graph.json",
        "subject_code": "phy",
        "subject_name": "Physics",
    },
    "chem": {
        "nodes_file": "C:/Users/Alesha4285/Desktop/cisce/_nodes_chem.txt",
        "enrichment_dir": "C:/Users/Alesha4285/Desktop/chemistry/enrichment",
        "question_bank_dir": "C:/Users/Alesha4285/Desktop/chemistry/question_bank",
        "graph_json": "D:/node_generator/atomic_graph/cisce_stem/chem_graph.json",
        "subject_code": "chem",
        "subject_name": "Chemistry",
    },
    "bio": {
        "nodes_file": "C:/Users/Alesha4285/Desktop/cisce/_nodes_bio.txt",
        "enrichment_dir": "C:/Users/Alesha4285/Desktop/cisce/bio/enrichment",
        "question_bank_dir": "C:/Users/Alesha4285/Desktop/cisce/bio/question_bank",
        "graph_json": "D:/node_generator/atomic_graph/cisce_stem/bio_graph.json",
        "subject_code": "bio",
        "subject_name": "Biology",
    },
    "maths": {
        "nodes_file": "C:/Users/Alesha4285/Desktop/cisce/_nodes_maths.txt",
        "enrichment_dir": "C:/Users/Alesha4285/Desktop/cisce/maths/enrichment",
        "question_bank_dir": "C:/Users/Alesha4285/Desktop/cisce/maths/question_bank",
        "graph_json": "D:/node_generator/atomic_graph/cisce_stem/maths_graph.json",
        "subject_code": "math",
        "subject_name": "Mathematics",
    },
}

# Required enrichment sections per the CISCE AGENTS.md spec
REQUIRED_ENRICHMENT_SECTIONS = [
    "TITLE", "DEFINITION", "TEXT_WALKTHROUGH", "ELI5",
    "COMMON_MISCONCEPTION", "DIAGNOSTIC_QUESTION", "ON_FAILURE",
    "COGNITIVE_LEVEL", "MASTERY_CRITERIA", "SCOPE_BOUNDARY",
]

# All known enrichment section keys (superset, includes optional)
KNOWN_ENRICHMENT_SECTIONS = set(REQUIRED_ENRICHMENT_SECTIONS) | {
    "NODE_ID", "CLASS", "SUBJECT", "UNIT", "CHAPTER",
    "SYLLABUS", "EXAMPLES",
}

# Patterns
NODE_ID_RE = re.compile(r'c(\d+)_(\w+)_(\d+)')
# Enrichment node header: "--- NODE c10_phy_001 ---" (strict node ID format)
NODE_HEADER_RE = re.compile(r'^---\s+NODE\s+(c\d+_\w+_\d+)\s+---', re.MULTILINE)
# Question bank node header: "--- NODE c10_physics_question_bank ---" (relaxed)
QB_NODE_HEADER_RE = re.compile(r'^---\s+NODE\s+(c\d+_\S+)\s+---', re.MULTILINE)
SECTION_KEY_RE = re.compile(r'^([A-Z][A-Z_0-9]+):\s*(.*)$', re.MULTILINE)


# ---------------------------------------------------------------------------
# Parsers (lightweight — just extract section keys, not full content)
# ---------------------------------------------------------------------------

def extract_node_ids_from_enrichment(filepath: str) -> list[tuple[str, set[str]]]:
    """Return list of (node_id, set_of_section_keys_present) for one file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    parts = NODE_HEADER_RE.split(content)
    results = []
    for i in range(1, len(parts), 2):
        node_id = parts[i]
        node_content = parts[i + 1] if i + 1 < len(parts) else ""
        keys = set(m.group(1) for m in SECTION_KEY_RE.finditer(node_content))
        results.append((node_id, keys))
    return results


def parse_nodes_inventory(filepath: str) -> dict[str, str]:
    """Parse _nodes_{subject}.txt -> {node_id: title}."""
    nodes = {}
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            m = NODE_ID_RE.match(line)
            if m:
                nid = line.split(":")[0].strip()
                title = line.split(":", 1)[1].strip() if ":" in line else ""
                nodes[nid] = title
    return nodes


def inspect_question_bank(filepath: str) -> dict:
    """Inspect a question bank file structure. Returns metadata + counts."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    # Use relaxed header regex for QB files (node IDs like c10_physics_question_bank)
    parts = QB_NODE_HEADER_RE.split(content)
    if len(parts) < 3:
        return {
            "file": Path(filepath).name, "node_id": None, "sections": {},
            "question_count": 0, "answer_count": 0, "section_headers": 0,
            "has_marks": False, "errors": ["no node header found"],
        }
    node_id = parts[1]
    body = parts[2] if len(parts) > 2 else ""
    keys = {}
    for m in SECTION_KEY_RE.finditer(body):
        keys[m.group(1)] = m.group(2).strip()
    # Count questions: matches all three formats:
    #   Format A: "Q1. ..." (dot)    Format B: "Q1 [BASIC] ..." (bracket)    Format C: "Q1: ..." (colon)
    q_count = len(re.findall(r'(?:^|\n)\s*Q\d+\s*[.:\[]', body))
    # Count answers: matches "Answer:" (old) and "A:" (new, optionally indented)
    a_count = len(re.findall(r'Answer:', body)) + len(re.findall(r'(?:^|\n)\s*A:', body))
    section_headers = len(re.findall(r'===\s*(?:SECTION|TOPIC)', body, re.IGNORECASE))
    has_marks = bool(re.search(r'\(\d+\s*marks?\)', body, re.IGNORECASE))
    return {
        "file": Path(filepath).name,
        "node_id": node_id,
        "sections": keys,
        "question_count": q_count,
        "answer_count": a_count,
        "section_headers": section_headers,
        "has_marks": has_marks,
        "errors": [],
    }


# ---------------------------------------------------------------------------
# Verification per subject
# ---------------------------------------------------------------------------

def verify_subject(subject_key: str, detail: bool = False) -> dict:
    """Run full verification on one subject. Returns a report dict."""
    cfg = SUBJECTS[subject_key]
    report = {
        "subject": subject_key,
        "subject_name": cfg["subject_name"],
        "enrichment_dir": cfg["enrichment_dir"],
        "question_bank_dir": cfg["question_bank_dir"],
        "enrichment_files": 0,
        "enrichment_nodes": 0,
        "duplicate_nodes": [],
        "nodes_missing_sections": [],  # list of {node_id, file, missing}
        "unknown_sections": Counter(),
        "section_presence": Counter(),  # how many nodes have each section
        "nodes_file_count": 0,
        "nodes_in_inventory_not_in_enrichment": [],
        "nodes_in_enrichment_not_in_inventory": [],
        "graph_json_nodes": 0,
        "graph_json_matches_enrichment": True,
        "nodes_in_enrichment_not_in_graph": [],
        "nodes_in_graph_not_in_enrichment": [],
        "question_bank_files": 0,
        "question_bank_reports": [],
        "errors": [],
    }

    # --- 1. Parse nodes inventory ---
    try:
        inventory = parse_nodes_inventory(cfg["nodes_file"])
        report["nodes_file_count"] = len(inventory)
    except FileNotFoundError:
        report["errors"].append(f"nodes file missing: {cfg['nodes_file']}")
        inventory = {}

    # --- 2. Scan enrichment files ---
    enrich_dir = Path(cfg["enrichment_dir"])
    if not enrich_dir.exists():
        report["errors"].append(f"enrichment dir missing: {cfg['enrichment_dir']}")
        return report

    marker_files = sorted(enrich_dir.glob("*.marker"))
    report["enrichment_files"] = len(marker_files)

    seen_ids = set()
    enrichment_ids = set()
    id_counts = Counter()

    for mf in marker_files:
        try:
            nodes_in_file = extract_node_ids_from_enrichment(str(mf))
        except Exception as e:
            report["errors"].append(f"failed to parse {mf.name}: {e}")
            continue
        for node_id, keys in nodes_in_file:
            report["enrichment_nodes"] += 1
            id_counts[node_id] += 1
            if id_counts[node_id] > 1:
                report["duplicate_nodes"].append({"node_id": node_id, "file": mf.name})
                continue  # only inspect first occurrence
            enrichment_ids.add(node_id)
            # Track section presence
            for k in keys:
                report["section_presence"][k] += 1
                if k not in KNOWN_ENRICHMENT_SECTIONS:
                    report["unknown_sections"][k] += 1
            # Check required sections
            missing = [s for s in REQUIRED_ENRICHMENT_SECTIONS if s not in keys]
            if missing:
                report["nodes_missing_sections"].append({
                    "node_id": node_id,
                    "file": mf.name,
                    "missing": missing,
                })

    # --- 3. Cross-check enrichment vs inventory ---
    report["nodes_in_inventory_not_in_enrichment"] = sorted(
        set(inventory.keys()) - enrichment_ids
    )
    report["nodes_in_enrichment_not_in_inventory"] = sorted(
        enrichment_ids - set(inventory.keys())
    )

    # --- 4. Cross-check enrichment vs graph JSON ---
    graph_path = Path(cfg["graph_json"])
    if graph_path.exists():
        try:
            with open(graph_path, "r", encoding="utf-8") as f:
                graph_nodes = json.load(f)
            graph_ids = {n["node_id"] for n in graph_nodes}
            report["graph_json_nodes"] = len(graph_nodes)
            report["nodes_in_enrichment_not_in_graph"] = sorted(
                enrichment_ids - graph_ids
            )
            report["nodes_in_graph_not_in_enrichment"] = sorted(
                graph_ids - enrichment_ids
            )
            report["graph_json_matches_enrichment"] = (
                len(report["nodes_in_enrichment_not_in_graph"]) == 0
                and len(report["nodes_in_graph_not_in_enrichment"]) == 0
            )
        except Exception as e:
            report["errors"].append(f"failed to parse graph JSON: {e}")
    else:
        report["errors"].append(f"graph JSON missing: {cfg['graph_json']}")

    # --- 5. Scan question bank files ---
    qb_dir = Path(cfg["question_bank_dir"])
    if qb_dir.exists():
        qb_files = sorted(qb_dir.glob("*.marker"))
        report["question_bank_files"] = len(qb_files)
        for qf in qb_files:
            qb_report = inspect_question_bank(str(qf))
            report["question_bank_reports"].append(qb_report)
    else:
        report["errors"].append(f"question_bank dir missing: {cfg['question_bank_dir']}")

    return report


# ---------------------------------------------------------------------------
# Reporting
# ---------------------------------------------------------------------------

def print_report(report: dict, detail: bool = False) -> None:
    """Print a human-readable summary of the verification report."""
    s = report["subject"]
    print(f"\n{'='*70}")
    print(f"  {report['subject_name']} ({s})")
    print(f"{'='*70}")

    print(f"\n  Enrichment:")
    print(f"    Files:              {report['enrichment_files']}")
    print(f"    Nodes (incl dups):  {report['enrichment_nodes']}")
    print(f"    Unique nodes:       {len(set()) + report['enrichment_nodes'] - sum(1 for _ in report['duplicate_nodes'])}")
    print(f"    Duplicate entries:  {len(report['duplicate_nodes'])}")
    print(f"    Nodes missing req sections: {len(report['nodes_missing_sections'])}")

    print(f"\n  Section presence (across unique nodes):")
    total_unique = report["enrichment_nodes"] - len(report["duplicate_nodes"])
    for section in REQUIRED_ENRICHMENT_SECTIONS:
        count = report["section_presence"].get(section, 0)
        pct = (count / total_unique * 100) if total_unique else 0
        flag = " OK" if count == total_unique else " MISSING"
        print(f"    {section:25s} {count:5d} / {total_unique}  ({pct:5.1f}%){flag}")

    if report["unknown_sections"]:
        print(f"\n  Unknown sections found:")
        for k, c in report["unknown_sections"].most_common():
            print(f"    {k:25s} {c} occurrences")

    print(f"\n  Inventory cross-check:")
    print(f"    _nodes file count:        {report['nodes_file_count']}")
    print(f"    In inventory, not enrich: {len(report['nodes_in_inventory_not_in_enrichment'])}")
    print(f"    In enrich, not inventory: {len(report['nodes_in_enrichment_not_in_inventory'])}")

    print(f"\n  Graph JSON cross-check:")
    print(f"    Graph JSON nodes:         {report['graph_json_nodes']}")
    print(f"    Matches enrichment:       {report['graph_json_matches_enrichment']}")
    print(f"    In enrich, not graph:     {len(report['nodes_in_enrichment_not_in_graph'])}")
    print(f"    In graph, not enrich:     {len(report['nodes_in_graph_not_in_enrichment'])}")

    print(f"\n  Question bank:")
    print(f"    Files: {report['question_bank_files']}")
    for qb in report["question_bank_reports"]:
        print(f"      {qb['file']}")
        print(f"        node_id={qb['node_id']}  Q={qb['question_count']}  A={qb['answer_count']}  sections={qb['section_headers']}  marks={'Y' if qb['has_marks'] else 'N'}")
        if qb["errors"]:
            print(f"        ERRORS: {qb['errors']}")
        if detail:
            print(f"        sections present: {list(qb['sections'].keys())}")

    if report["errors"]:
        print(f"\n  ERRORS:")
        for e in report["errors"]:
            print(f"    - {e}")

    if detail and report["nodes_missing_sections"]:
        print(f"\n  Nodes missing required sections (first 20):")
        for entry in report["nodes_missing_sections"][:20]:
            print(f"    {entry['node_id']}  ({entry['file']})  missing: {entry['missing']}")
        if len(report["nodes_missing_sections"]) > 20:
            print(f"    ... and {len(report['nodes_missing_sections']) - 20} more")

    if detail and report["nodes_in_enrichment_not_in_inventory"]:
        print(f"\n  In enrichment but not in _nodes file (first 20):")
        for nid in report["nodes_in_enrichment_not_in_inventory"][:20]:
            print(f"    {nid}")

    if detail and report["nodes_in_inventory_not_in_enrichment"]:
        print(f"\n  In _nodes file but not in enrichment (first 20):")
        for nid in report["nodes_in_inventory_not_in_enrichment"][:20]:
            print(f"    {nid}")


def main():
    parser = argparse.ArgumentParser(description="Verify all CISCE STEM content files")
    parser.add_argument("--subject", choices=["physics", "chem", "bio", "maths", "all"],
                        default="all", help="Subject to verify")
    parser.add_argument("--detail", action="store_true", help="Show detailed lists")
    parser.add_argument("--json", type=str, default=None,
                        help="Write full report to JSON file")
    args = parser.parse_args()

    all_reports = []
    subjects = ["physics", "chem", "bio", "maths"] if args.subject == "all" else [args.subject]

    for subj in subjects:
        report = verify_subject(subj, detail=args.detail)
        all_reports.append(report)
        print_report(report, detail=args.detail)

    # Summary
    print(f"\n{'='*70}")
    print("  SUMMARY")
    print(f"{'='*70}")
    total_enrich = sum(r["enrichment_nodes"] - len(r["duplicate_nodes"]) for r in all_reports)
    total_missing = sum(len(r["nodes_missing_sections"]) for r in all_reports)
    total_qb = sum(r["question_bank_files"] for r in all_reports)
    total_qb_q = sum(sum(qb["question_count"] for qb in r["question_bank_reports"]) for r in all_reports)
    total_qb_a = sum(sum(qb["answer_count"] for qb in r["question_bank_reports"]) for r in all_reports)
    print(f"  Total unique enrichment nodes: {total_enrich}")
    print(f"  Total nodes missing sections:  {total_missing}")
    print(f"  Total QB files:                {total_qb}")
    print(f"  Total QB questions:            {total_qb_q}")
    print(f"  Total QB answers:              {total_qb_a}")
    print(f"  QB Q/A balance:                {'OK' if total_qb_q == total_qb_a else 'IMBALANCED'}")

    if args.json:
        with open(args.json, "w", encoding="utf-8") as f:
            json.dump(all_reports, f, indent=2, ensure_ascii=False, default=str)
        print(f"\n  Full report written to: {args.json}")


if __name__ == "__main__":
    main()
