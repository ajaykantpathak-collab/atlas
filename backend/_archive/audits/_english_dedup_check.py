"""Check for duplicate English nodes — same node_id from different source files."""
import json
from collections import defaultdict

with open(r"D:\platform\backend\_english_full_inventory.json", encoding="utf-8") as f:
    nodes = json.load(f)

# Group by node_id — show how many source files each came from
sources_per_node = defaultdict(list)
for n in nodes:
    sources_per_node[n["node_id"]].append({
        "file": n["source_file"],
        "title": n["title"][:80],
        "class": n["class"],
        "subject": n["subject"],
    })

# Show nodes that came from multiple files
print("=== NODES WITH MULTIPLE SOURCES (potential duplicates) ===")
multi = {nid: srcs for nid, srcs in sources_per_node.items() if len(srcs) > 1}
print(f"Total unique node_ids: {len(sources_per_node)}")
print(f"Nodes from multiple sources: {len(multi)}")
print()

# Show first 30 multi-source nodes
for nid in sorted(multi.keys())[:30]:
    srcs = multi[nid]
    print(f"\n{nid} ({len(srcs)} sources):")
    for s in srcs:
        print(f"  [{s['file']}] class={s['class']} subj={s['subject']} title={s['title'][:60]}")

# Check for near-duplicate node_ids (same base, different suffix)
print("\n=== NODE_ID PATTERN ANALYSIS ===")
# Group by parent pattern (e.g. c10_eng_101 without sub-node suffix)
by_parent = defaultdict(list)
for nid in sources_per_node:
    # Strip last _NN suffix if present
    parts = nid.rsplit("_", 1)
    if len(parts) == 2 and parts[1].isdigit():
        by_parent[parts[0]].append(nid)
    else:
        by_parent[nid].append(nid)

# Show parent nodes with many children
print("\nParent nodes with most children:")
for parent in sorted(by_parent.keys(), key=lambda p: len(by_parent[p]), reverse=True)[:20]:
    children = by_parent[parent]
    print(f"  {parent}: {len(children)} children — {children[:5]}{'...' if len(children)>5 else ''}")

# Check class 9 and 10 specifically — 223 and 209 seems high
print("\n=== CLASS 9 NODES (223 seems high) ===")
c9_nodes = [nid for nid in sources_per_node if nid.startswith("c9_")]
# Group by type
c9_by_type = defaultdict(list)
for nid in c9_nodes:
    if "eng_101" in nid or "eng_102" in nid or "eng_103" in nid or "eng_104" in nid:
        c9_by_type["literature_subnodes"].append(nid)
    elif "eng_006" in nid or "eng_010" in nid:
        c9_by_type["grammar"].append(nid)
    elif "eng_001" in nid or "eng_002" in nid or "eng_003" in nid:
        c9_by_type["language_basics"].append(nid)
    else:
        c9_by_type["other"].append(nid)
for typ, nids in c9_by_type.items():
    print(f"  {typ}: {len(nids)} nodes")
    for n in nids[:5]:
        print(f"    {n}")
