"""Inventory all English content files on disk — read only, no modifications."""
import json
import re
from pathlib import Path
from collections import defaultdict

# === SOURCES ===
ORGANIZED = Path(r"D:\platform\organized\english")
GRANULAR = Path(r"D:\platform\parsed_output\english_granular_nodes")
CISCE_ENG = Path(r"D:\cisce\eng\enrichment")
CISCE_ENGELEC = Path(r"D:\cisce\engelec")
CISCE_ENGMOD = Path(r"D:\cisce\engmod")

inventory = defaultdict(lambda: {"nodes": [], "files": 0})

# 1. Granular node JSONs (classes 8-12, all three English streams)
print("=== GRANULAR NODE JSONs ===")
if GRANULAR.exists():
    for f in sorted(GRANULAR.glob("*_subnodes.json")):
        try:
            with open(f, encoding="utf-8") as fh:
                data = json.load(fh)
            parent_node = data.get("parent_node", "")
            parent_title = data.get("parent_title", "")
            cls = data.get("class", 0)
            sub_nodes = data.get("sub_nodes", [])
            subject = "English"
            # Determine subject stream
            if "engelec" in parent_node:
                subject = "Elective English"
            elif "engmod" in parent_node:
                subject = "Modern English"
            elif "eng" in parent_node:
                subject = "English Literature" if cls >= 9 else "English Language"

            for sn in sub_nodes:
                nid = sn.get("node_id", "")
                title = sn.get("title", "")
                sn_class = sn.get("class", cls)
                sn_subject = sn.get("subject", subject)
                prereqs = sn.get("prerequisites", [])
                inventory[sn_class]["nodes"].append({
                    "node_id": nid,
                    "title": title,
                    "class": sn_class,
                    "subject": sn_subject,
                    "source": "granular",
                    "file": f.name,
                    "prerequisites": prereqs,
                    "parent": parent_node,
                })
            inventory[cls]["files"] += 1
            print(f"  {f.name}: {len(sub_nodes)} sub_nodes (class {cls}, {subject})")
        except Exception as e:
            print(f"  ERROR {f.name}: {e}")

# 2. Enrichment markers (classes 1-7) — parse marker format
print("\n=== ENRICHMENT MARKERS (organized/english/classN/enrichment) ===")
for cls in range(1, 8):
    enrich_dir = ORGANIZED / f"class{cls}" / "enrichment"
    if not enrich_dir.exists():
        continue
    for f in sorted(enrich_dir.iterdir()):
        if not f.is_file():
            continue
        inventory[cls]["files"] += 1
        content = f.read_text(encoding="utf-8", errors="replace")

        # Parse marker files (NODE_ID: ... TITLE: ... CLASS: ... SUBJECT: ...)
        node_id_match = re.search(r'^NODE_ID:\s*(.+)$', content, re.MULTILINE)
        title_match = re.search(r'^TITLE:\s*(.+)$', content, re.MULTILINE)
        class_match = re.search(r'^CLASS:\s*(\d+)', content, re.MULTILINE)
        subject_match = re.search(r'^SUBJECT:\s*(.+)$', content, re.MULTILINE)

        if node_id_match:
            nid = node_id_match.group(1).strip()
            title = title_match.group(1).strip() if title_match else ""
            node_class = int(class_match.group(1)) if class_match else cls
            subject = subject_match.group(1).strip() if subject_match else "English Language"
            inventory[node_class]["nodes"].append({
                "node_id": nid,
                "title": title,
                "class": node_class,
                "subject": subject,
                "source": "marker",
                "file": f.name,
                "prerequisites": [],
                "parent": "",
            })
        elif f.suffix == ".md":
            # Parse MD files with **Node ID:** header
            nid_match = re.search(r'\*\*Node ID:\*\*\s*(.+)', content)
            prereq_match = re.search(r'\*\*Prerequisite:\*\*\s*(.+)', content)
            title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
            if nid_match:
                nid = nid_match.group(1).strip()
                title = title_match.group(1).strip() if title_match else f.stem
                prereqs = []
                if prereq_match:
                    prereqs = [p.strip() for p in prereq_match.group(1).split(",")]
                inventory[cls]["nodes"].append({
                    "node_id": nid,
                    "title": title,
                    "class": cls,
                    "subject": "English Language",
                    "source": "md",
                    "file": f.name,
                    "prerequisites": prereqs,
                    "parent": "",
                })
        elif f.suffix == ".json" and "subnodes" in f.name:
            # Parse subnodes JSON
            try:
                data = json.loads(content)
                sub_nodes = data.get("sub_nodes", [])
                for sn in sub_nodes:
                    nid = sn.get("node_id", "")
                    title = sn.get("title", "")
                    prereqs = sn.get("prerequisites", [])
                    inventory[cls]["nodes"].append({
                        "node_id": nid,
                        "title": title,
                        "class": cls,
                        "subject": "English Language",
                        "source": "subnodes_json",
                        "file": f.name,
                        "prerequisites": prereqs,
                        "parent": data.get("parent_node", ""),
                    })
            except:
                pass

# 3. CISCE eng enrichment markers (top-level)
print("\n=== CISCE eng/enrichment markers ===")
if CISCE_ENG.exists():
    for f in sorted(CISCE_ENG.glob("*.marker")):
        content = f.read_text(encoding="utf-8", errors="replace")
        node_id_match = re.search(r'^NODE_ID:\s*(.+)$', content, re.MULTILINE)
        title_match = re.search(r'^TITLE:\s*(.+)$', content, re.MULTILINE)
        class_match = re.search(r'^CLASS:\s*(\d+)', content, re.MULTILINE)
        subject_match = re.search(r'^SUBJECT:\s*(.+)$', content, re.MULTILINE)
        if node_id_match:
            nid = node_id_match.group(1).strip()
            title = title_match.group(1).strip() if title_match else ""
            node_class = int(class_match.group(1)) if class_match else 0
            subject = subject_match.group(1).strip() if subject_match else "English Language"
            if node_class > 0:
                inventory[node_class]["nodes"].append({
                    "node_id": nid,
                    "title": title,
                    "class": node_class,
                    "subject": subject,
                    "source": "cisce_marker",
                    "file": f.name,
                    "prerequisites": [],
                    "parent": "",
                })

# Deduplicate nodes by node_id
print("\n=== DEDUPLICATED INVENTORY ===")
all_nodes = {}
for cls in sorted(inventory.keys()):
    nodes = inventory[cls]["nodes"]
    unique = {}
    for n in nodes:
        nid = n["node_id"]
        if nid not in unique:
            unique[nid] = n
        # Merge prerequisites
        else:
            for p in n["prerequisites"]:
                if p not in unique[nid]["prerequisites"]:
                    unique[nid]["prerequisites"].append(p)
    inventory[cls]["nodes"] = list(unique.values())
    all_nodes.update(unique)
    print(f"  Class {cls}: {len(unique)} unique nodes, {inventory[cls]['files']} files")

# Subject breakdown
print("\n=== SUBJECT BREAKDOWN ===")
by_subject = defaultdict(list)
for nid, n in all_nodes.items():
    by_subject[n["subject"]].append(nid)
for subj, nids in sorted(by_subject.items()):
    classes = sorted(set(all_nodes[nid]["class"] for nid in nids))
    print(f"  {subj}: {len(nids)} nodes, classes={classes}")

print(f"\nTOTAL UNIQUE ENGLISH NODES: {len(all_nodes)}")

# Save inventory
out = Path(r"D:\platform\backend\_english_node_inventory.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(list(all_nodes.values()), f, indent=2, ensure_ascii=False)
print(f"\nInventory saved to {out}")
