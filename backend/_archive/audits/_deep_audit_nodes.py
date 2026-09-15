"""Check ALL 21,320 nodes - every unique subject name, every node_id prefix pattern."""
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

# Collect ALL nodes with their actual subject field and node_id prefix
all_nodes = []
subject_field_values = defaultdict(int)
node_id_prefixes = defaultdict(int)
subject_by_file = defaultdict(set)

for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        continue

    file_subject = data.get("subject", "?")
    file_grade = data.get("grade", "?")
    file_key = f.stem.replace("_result", "")

    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            nid = node.get("node_id", "")
            subj = node.get("subject", "?")
            cls = node.get("class_level", "?")

            all_nodes.append({"node_id": nid, "subject": subj, "class": cls, "file": file_key})
            subject_field_values[subj] += 1

            # Extract prefix pattern (e.g. "c11_appmath" from "c11_appmath_001")
            parts = nid.split("_")
            if len(parts) >= 2:
                prefix = f"{parts[0]}_{parts[1]}"
                node_id_prefixes[prefix] += 1

            subject_by_file[file_key].add(subj)

print(f"Total nodes: {len(all_nodes)}")
print(f"\n{'='*60}")
print(f"  ALL UNIQUE SUBJECT FIELD VALUES IN NODES")
print(f"{'='*60}")
for subj, cnt in sorted(subject_field_values.items(), key=lambda x: -x[1]):
    print(f"  {subj:40s} {cnt:6d}")

print(f"\n{'='*60}")
print(f"  ALL UNIQUE NODE_ID PREFIXES")
print(f"{'='*60}")
for prefix, cnt in sorted(node_id_prefixes.items(), key=lambda x: -x[1]):
    print(f"  {prefix:40s} {cnt:6d}")

# Now search for the "missing" subjects
print(f"\n{'='*60}")
print(f"  SEARCHING FOR 'MISSING' SUBJECTS")
print(f"{'='*60}")

missing_search = ["applied_maths", "appmath", "applied", "legal", "law",
                  "ai", "artificial", "fine_art", "fine", "art",
                  "hpe", "health", "physical", "ktpi", "knowledge",
                  "skill", "social", "civics", "science"]

for term in missing_search:
    matches = [(n["node_id"], n["subject"], n["class"]) for n in all_nodes if term in n["subject"].lower() or term in n["node_id"].lower()]
    if matches:
        print(f"\n  '{term}' found in {len(matches)} nodes:")
        for m in matches[:5]:
            print(f"    {m[0]:30s} subj={m[1]:20s} class={m[2]}")
        if len(matches) > 5:
            print(f"    ... and {len(matches)-5} more")
    else:
        print(f"\n  '{term}' — NOT FOUND in any node")

# Check files that might contain these subjects
print(f"\n{'='*60}")
print(f"  FILES WITH MULTIPLE SUBJECTS")
print(f"{'='*60}")
for file_key, subjs in sorted(subject_by_file.items()):
    if len(subjs) > 1:
        print(f"  {file_key}: {subjs}")
