"""Comprehensive English content inventory — reads ALL files from ALL locations.

Locations:
  1. D:\cisce\eng\enrichment\          — 318 files (markers, md, json, content, txt)
  2. D:\platform\organized\english\classN\enrichment\  — organized by class
  3. D:\platform\organized\english\enrichment\         — top-level shared
  4. D:\platform\parsed_output\english_granular_nodes\ — granular JSONs (c8-c12)
  5. D:\cisce\engelec\                  — Elective English (c11-c12)
  6. D:\cisce\engmod\                   — Modern English (c11-c12, syllabus only)

File formats:
  - .marker  → NODE_ID: / TITLE: / CLASS: / SUBJECT: headers
  - .md      → **Node ID:** / # Sub-Node: / **Prerequisite:** headers
  - .json    → sub_nodes/subnodes arrays with node_id, title, class, subject
  - .content → parse for node_id patterns
  - .txt     → parse for node_id patterns

NO modifications to any source files. Read-only.
"""
import json
import re
from pathlib import Path
from collections import defaultdict

# === SOURCES ===
SOURCES = [
    Path(r"D:\cisce\eng\enrichment"),
    Path(r"D:\platform\organized\english"),
    Path(r"D:\platform\parsed_output\english_granular_nodes"),
    Path(r"D:\platform\parsed_output\english_supporting_files"),
    Path(r"D:\cisce\engelec"),
    Path(r"D:\cisce\engmod"),
]

all_nodes = {}  # node_id → {node_id, title, class, subject, prerequisites, source_file, parent}
stats = defaultdict(int)


def extract_class_from_id(node_id):
    """Extract class number from node_id like c10_eng_101_01 → 10."""
    m = re.match(r'c(\d+)', node_id)
    return int(m.group(1)) if m else 0


def determine_subject(node_id, explicit_subject=None, filename=""):
    """Determine English subject stream from node_id and context."""
    if explicit_subject:
        s = explicit_subject.lower()
        if "elective" in s:
            return "Elective English"
        if "modern" in s:
            return "Modern English"
        if "literature" in s:
            return "English Literature"
        if "language" in s:
            return "English Language"
    # Infer from node_id
    if "engelec" in node_id:
        return "Elective English"
    if "engmod" in node_id:
        return "Modern English"
    # Infer from filename
    if "engelec" in filename:
        return "Elective English"
    if "engmod" in filename:
        return "Modern English"
    # Default: classes 1-8 = Language, 9-12 = Literature
    cls = extract_class_from_id(node_id)
    if cls >= 9:
        return "English Literature"
    return "English Language"


def add_node(node_id, title="", cls=0, subject="", prereqs=None, source_file="", parent=""):
    if not node_id or not node_id.startswith("c"):
        return
    node_id = node_id.strip()
    if cls == 0:
        cls = extract_class_from_id(node_id)
    if not subject:
        subject = determine_subject(node_id, filename=source_file)
    if prereqs is None:
        prereqs = []

    if node_id not in all_nodes:
        all_nodes[node_id] = {
            "node_id": node_id,
            "title": title.strip()[:200],
            "class": cls,
            "subject": subject,
            "prerequisites": [],
            "source_file": source_file,
            "parent": parent,
        }
        stats["nodes_added"] += 1
    else:
        # Merge — fill in missing fields
        n = all_nodes[node_id]
        if not n["title"] and title:
            n["title"] = title.strip()[:200]
        if n["class"] == 0 and cls > 0:
            n["class"] = cls
        if not n["subject"] and subject:
            n["subject"] = subject
        if not n["parent"] and parent:
            n["parent"] = parent
    # Merge prerequisites
    for p in prereqs:
        p = p.strip()
        if p and p.startswith("c") and p not in all_nodes[node_id]["prerequisites"]:
            all_nodes[node_id]["prerequisites"].append(p)


def parse_marker_file(filepath):
    """Parse .marker files with NODE_ID:/TITLE:/CLASS:/SUBJECT: headers."""
    content = filepath.read_text(encoding="utf-8", errors="replace")
    stats["marker_files"] += 1

    # Single-node marker
    node_id_m = re.search(r'^NODE_ID:\s*(.+)$', content, re.MULTILINE)
    title_m = re.search(r'^TITLE:\s*(.+)$', content, re.MULTILINE)
    class_m = re.search(r'^CLASS:\s*(\d+)', content, re.MULTILINE)
    subject_m = re.search(r'^SUBJECT:\s*(.+)$', content, re.MULTILINE)

    if node_id_m:
        nid = node_id_m.group(1).strip()
        title = title_m.group(1).strip() if title_m else ""
        cls = int(class_m.group(1)) if class_m else 0
        subject = subject_m.group(1).strip() if subject_m else ""
        add_node(nid, title, cls, subject, source_file=filepath.name)
        return

    # Multi-node marker (--- NODE xxx --- format)
    blocks = re.split(r'---\s*NODE\s+', content)
    for block in blocks[1:]:
        nid_m = re.match(r'(\S+)', block)
        title_m2 = re.search(r'^TITLE:\s*(.+)$', block, re.MULTILINE)
        cls_m2 = re.search(r'^CLASS:\s*(\d+)', block, re.MULTILINE)
        if nid_m:
            nid = nid_m.group(1).strip()
            title = title_m2.group(1).strip() if title_m2 else ""
            cls = int(cls_m2.group(1)) if cls_m2 else 0
            add_node(nid, title, cls, source_file=filepath.name)


def parse_md_file(filepath):
    """Parse .md files for node IDs."""
    content = filepath.read_text(encoding="utf-8", errors="replace")
    stats["md_files"] += 1
    fname = filepath.name

    # **Node ID:** xxx format
    for m in re.finditer(r'\*\*Node ID:\*\*\s*(.+)', content):
        nid = m.group(1).strip()
        # Find title from first # header
        title_m = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        title = title_m.group(1).strip() if title_m else ""
        # Find prerequisite
        prereq_m = re.search(r'\*\*Prerequisite:\*\*\s*(.+)', content)
        prereqs = [p.strip() for p in prereq_m.group(1).split(",")] if prereq_m else []
        add_node(nid, title, prereqs=prereqs, source_file=fname)

    # # Sub-Node: xxx format (with Node ID in next lines)
    for m in re.finditer(r'^#\s+(?:Sub-Node:?\s*)?(.+)$', content, re.MULTILINE):
        title = m.group(1).strip()
        # Look for node_id pattern in filename or content
        nid_m = re.search(r'c\d+_eng_\w+', fname)
        if nid_m:
            add_node(nid_m.group(0), title, source_file=fname)

    # Fallback: extract node_id from filename if it matches pattern
    if not re.search(r'\*\*Node ID:', content):
        nid_m = re.match(r'(c\d+_eng_\w+)', fname)
        if nid_m:
            title_m = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
            title = title_m.group(1).strip() if title_m else fname
            add_node(nid_m.group(1), title, source_file=fname)


def parse_json_file(filepath):
    """Parse JSON files for subnodes."""
    try:
        content = filepath.read_text(encoding="utf-8", errors="replace")
        data = json.loads(content)
        stats["json_files"] += 1
    except (json.JSONDecodeError, Exception):
        stats["json_errors"] += 1
        return

    fname = filepath.name

    # Handle list format
    if isinstance(data, list):
        for item in data:
            if isinstance(item, dict):
                nid = item.get("node_id", "")
                title = item.get("title", item.get("topic", ""))
                cls = item.get("class", 0)
                subject = item.get("subject", "")
                prereqs = item.get("prerequisites", item.get("prerequisite_node_ids", []))
                parent = item.get("parent_node_id", item.get("parent", ""))
                add_node(nid, title, cls, subject, prereqs, fname, parent)
        return

    if not isinstance(data, dict):
        return

    # parent_node + sub_nodes format
    parent_node = data.get("parent_node", data.get("parent_node_id", ""))
    parent_title = data.get("parent_title", data.get("title", ""))
    cls = data.get("class", 0)
    subject = data.get("subject", "")

    # Add parent node
    if parent_node:
        add_node(parent_node, parent_title, cls, subject, source_file=fname)

    # sub_nodes / subnodes / nodes
    for key in ["sub_nodes", "subnodes", "nodes", "sub_node_list"]:
        sub_nodes = data.get(key, [])
        if isinstance(sub_nodes, list):
            for sn in sub_nodes:
                if not isinstance(sn, dict):
                    continue
                nid = sn.get("node_id", "")
                title = sn.get("title", sn.get("topic", ""))
                sn_cls = sn.get("class", cls)
                sn_subject = sn.get("subject", subject)
                prereqs = sn.get("prerequisites", sn.get("prerequisite_node_ids", []))
                parent = sn.get("parent_node_id", sn.get("parent", parent_node))
                add_node(nid, title, sn_cls, sn_subject, prereqs, fname, parent)

    # Single node with node_id
    nid = data.get("node_id", "")
    if nid:
        title = data.get("title", data.get("topic", ""))
        add_node(nid, title, cls, subject, source_file=fname)


def parse_content_file(filepath):
    """Parse .content and .txt files for node IDs."""
    content = filepath.read_text(encoding="utf-8", errors="replace")
    fname = filepath.name
    stats["content_files"] += 1

    # Look for NODE_ID: header
    node_id_m = re.search(r'^NODE_ID:\s*(.+)$', content, re.MULTILINE)
    if node_id_m:
        nid = node_id_m.group(1).strip()
        title_m = re.search(r'^TITLE:\s*(.+)$', content, re.MULTILINE)
        class_m = re.search(r'^CLASS:\s*(\d+)', content, re.MULTILINE)
        title = title_m.group(1).strip() if title_m else ""
        cls = int(class_m.group(1)) if class_m else 0
        add_node(nid, title, cls, source_file=fname)
        return

    # Extract node_id from filename
    nid_m = re.match(r'(c\d+_eng_\w+)', fname)
    if nid_m:
        title_m = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        title = title_m.group(1).strip() if title_m else fname
        add_node(nid_m.group(1), title, source_file=fname)


def scan_directory(dirpath):
    """Recursively scan a directory for all English content files."""
    if not dirpath.exists():
        return
    for f in sorted(dirpath.rglob("*")):
        if not f.is_file():
            continue
        if "__pycache__" in str(f):
            continue
        ext = f.suffix.lower()
        if ext == ".marker":
            parse_marker_file(f)
        elif ext == ".md":
            parse_md_file(f)
        elif ext == ".json":
            parse_json_file(f)
        elif ext in (".content", ".txt"):
            parse_content_file(f)
        else:
            # Try to extract node_ids from any file
            nid_m = re.match(r'(c\d+_eng\w*_\w+)', f.name)
            if nid_m:
                stats["other_files_with_nodeid"] += 1
                add_node(nid_m.group(1), source_file=f.name)


# === RUN ===
print("=== SCANNING ALL ENGLISH CONTENT ===")
for src in SOURCES:
    print(f"\nScanning: {src}")
    scan_directory(src)

# === RESULTS ===
print(f"\n=== STATS ===")
for k, v in sorted(stats.items()):
    print(f"  {k}: {v}")

print(f"\n=== NODES BY CLASS ===")
by_class = defaultdict(list)
for nid, n in all_nodes.items():
    by_class[n["class"]].append(nid)
for cls in sorted(by_class.keys()):
    print(f"  Class {cls}: {len(by_class[cls])} nodes")

print(f"\n=== NODES BY SUBJECT ===")
by_subject = defaultdict(list)
for nid, n in all_nodes.items():
    by_subject[n["subject"]].append(nid)
for subj, nids in sorted(by_subject.items()):
    classes = sorted(set(all_nodes[nid]["class"] for nid in nids))
    print(f"  {subj}: {len(nids)} nodes, classes={classes}")

print(f"\n=== NODES WITH PREREQUISITES ===")
with_prereqs = sum(1 for n in all_nodes.values() if n["prerequisites"])
print(f"  {with_prereqs} nodes have prerequisites")

print(f"\nTOTAL UNIQUE ENGLISH NODES: {len(all_nodes)}")

# Save inventory
out = Path(r"D:\platform\backend\_english_full_inventory.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(list(all_nodes.values()), f, indent=2, ensure_ascii=False)
print(f"\nInventory saved to {out}")
