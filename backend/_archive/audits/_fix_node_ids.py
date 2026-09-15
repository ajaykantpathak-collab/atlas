"""Create fresh unique node IDs for all CBSE nodes.
- Reads existing nodes (READ-ONLY)
- Removes garbage (empty topic/chapter)
- Renumbers sequentially within each (class, subject) group
- Updates all internal references (prereqs, forward IDs) to new IDs
- Writes NEW files to D:\platform\cbse_coverage_output_fixed\
- Does NOT touch existing files"""
import json
import re
from pathlib import Path
from collections import defaultdict

SOURCE_DIR = Path(r"D:\platform\cbse_coverage_output")
OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output_fixed")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

SUBJ_CANONICAL = {
    "hin": "hin", "engl": "engl", "eng": "eng", "angl": "eng",
    "geo": "geo", "phy": "phy", "math": "math", "bio": "bio",
    "cs": "cs", "hist": "hist", "bt": "bt", "eco": "eco",
    "hs": "hs", "chem": "chem", "pol": "pol", "polit": "pol",
    "math": "maths",  # use maths — Claude naturally writes this
    "soc": "soc", "histciv": "histciv", "acc": "acc", "bs": "bs",
    "psy": "psy", "sci": "sci", "pe": "pe", "ai": "ai",
    "legal": "legal", "amath": "amath", "his": "hist", "hpe": "hpe",
}

def parse_node_id(nid):
    if not nid or "_" not in nid:
        return None, None
    parts = nid.split("_")
    if len(parts) < 4:
        return None, None
    cls = parts[0]
    subj_abbr = parts[1]
    if cls.startswith("c0") and len(cls) == 3:
        cls = "c" + cls[2:]
    subj_abbr = SUBJ_CANONICAL.get(subj_abbr, subj_abbr)
    return cls, subj_abbr

# Step 1: Read all nodes, filter garbage, group by (class, subject)
print("Step 1: Reading all nodes...")
all_nodes = []
garbage = []
for f in SOURCE_DIR.glob("*_result.json"):
    if f.stat().st_size < 500:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                nid = node.get("node_id", "")
                topic = node.get("topic", "")
                chapter = node.get("chapter", "")
                if not nid or not topic or not chapter:
                    garbage.append((f.name, nid, topic[:30], "empty field"))
                    continue
                cls, subj = parse_node_id(nid)
                if cls is None:
                    garbage.append((f.name, nid, topic[:30], "bad node_id format"))
                    continue
                all_nodes.append(node)
    except:
        pass

print(f"  Total nodes read: {len(all_nodes) + len(garbage)}")
print(f"  Valid nodes: {len(all_nodes)}")
print(f"  Garbage removed: {len(garbage)}")
for fname, nid, topic, issue in garbage:
    print(f"    {nid or 'NONE'} | {topic} | {issue}")

# Step 2: Group by (class, subject), sort by (chapter, original number)
print("\nStep 2: Grouping and sorting...")
groups = defaultdict(list)
for node in all_nodes:
    nid = node.get("node_id", "")
    cls, subj = parse_node_id(nid)
    chapter = node.get("chapter", "")
    # Extract original number from node_id (last numeric part)
    parts = nid.split("_")
    orig_num = 0
    for p in reversed(parts):
        if p.isdigit():
            orig_num = int(p)
            break
    groups[(cls, subj)].append((chapter, orig_num, node))

# Sort each group by (chapter, original_number)
for key in groups:
    groups[key].sort(key=lambda x: (x[0], x[1]))

# Step 3: Assign new unique IDs and build mapping
print("\nStep 3: Assigning new IDs...")
# Mapping: (old_node_id, chapter) -> new_node_id
id_mapping = {}

for (cls, subj), items in groups.items():
    for i, (chapter, orig_num, node) in enumerate(items, 1):
        old_nid = node.get("node_id", "")
        new_nid = f"{cls}_{subj}_cbse_{i:03d}"
        id_mapping[(old_nid, chapter)] = new_nid
        node["node_id"] = new_nid
        node["old_node_id"] = old_nid  # keep reference

print(f"  Groups: {len(groups)}")
print(f"  New IDs assigned: {len(id_mapping)}")

# Step 4: Update all internal references
print("\nStep 4: Updating internal references...")
updated_refs = 0
for (cls, subj), items in groups.items():
    for chapter, orig_num, node in items:
        old_nid = node.get("old_node_id", "")
        
        # Update prerequisite_node_ids
        old_prereqs = node.get("prerequisite_node_ids", [])
        new_prereqs = []
        for ref in old_prereqs:
            # Try to find the new ID for this reference
            # The ref should be in the same chapter (same subject)
            new_ref = id_mapping.get((ref, chapter), ref)
            new_prereqs.append(new_ref)
            if new_ref != ref:
                updated_refs += 1
        node["prerequisite_node_ids"] = new_prereqs
        
        # Update prerequisite_reasons keys
        old_reasons = node.get("prerequisite_reasons", {})
        if isinstance(old_reasons, dict):
            new_reasons = {}
            for k, v in old_reasons.items():
                new_k = id_mapping.get((k, chapter), k)
                new_reasons[new_k] = v
            node["prerequisite_reasons"] = new_reasons
        
        # Update forward_node_ids
        old_forward = node.get("forward_node_ids", [])
        new_forward = []
        for ref in old_forward:
            new_ref = id_mapping.get((ref, chapter), ref)
            new_forward.append(new_ref)
        node["forward_node_ids"] = new_forward
        
        # Update forward_reasons keys
        old_fr = node.get("forward_reasons", {})
        if isinstance(old_fr, dict):
            new_fr = {}
            for k, v in old_fr.items():
                new_k = id_mapping.get((k, chapter), k)
                new_fr[new_k] = v
            node["forward_reasons"] = new_fr
        
        # cross_subject_prereqs - these reference other subjects, can't map yet
        # Leave them as-is for now, they'll be regenerated

print(f"  Internal refs updated: {updated_refs}")

# Step 5: Write new files - one per (class, subject) combo
print("\nStep 5: Writing new files...")
file_count = 0
for (cls, subj), items in groups.items():
    nodes = [item[2] for item in items]
    grade = cls.replace("c", "")
    filename = f"fixed_{subj}_c{grade}.json"
    output = {
        "subject": subj,
        "grade": grade,
        "class": cls,
        "results": [{"nodes": nodes}],
        "node_count": len(nodes),
    }
    out_path = OUTPUT_DIR / filename
    out_path.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")
    file_count += 1

print(f"  Files written: {file_count}")
print(f"  Output dir: {OUTPUT_DIR}")

# Step 6: Verify uniqueness
print("\nStep 6: Verifying uniqueness...")
all_new_ids = []
for (cls, subj), items in groups.items():
    for chapter, orig_num, node in items:
        all_new_ids.append(node["node_id"])

print(f"  Total new IDs: {len(all_new_ids)}")
print(f"  Unique new IDs: {len(set(all_new_ids))}")
if len(all_new_ids) == len(set(all_new_ids)):
    print("  PERFECT - all IDs are unique!")
else:
    dups = [nid for nid in all_new_ids if all_new_ids.count(nid) > 1]
    print(f"  PROBLEM - {len(set(dups))} duplicate IDs remain!")
    for d in list(set(dups))[:5]:
        print(f"    {d}")

# Summary
print(f"\n{'='*80}")
print(f"  SUMMARY")
print(f"{'='*80}")
print(f"  Original nodes:  {len(all_nodes) + len(garbage)}")
print(f"  Garbage removed: {len(garbage)}")
print(f"  Valid nodes:     {len(all_nodes)}")
print(f"  New unique IDs:  {len(set(all_new_ids))}")
print(f"  Groups:          {len(groups)}")
print(f"  Files written:   {file_count}")
print(f"  Output:          {OUTPUT_DIR}")
print(f"\n  Groups by (class, subject):")
for (cls, subj), items in sorted(groups.items()):
    print(f"    {cls}_{subj}: {len(items)} nodes")
