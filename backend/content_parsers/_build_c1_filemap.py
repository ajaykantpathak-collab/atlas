"""Build the Class 1 file-to-level mapping using the verified topic mapping.

For each Class 1 file:
- If it has topic_numbers that match our topic mapping -> topic-level
- If it has topic_numbers that cover ALL topics -> class-level
- If it has no topic_numbers -> class-level
- Enrichment files -> node-level (already handled separately)

Output: D:\platform\parsed_output\class1_file_mapping.jsonl
"""
import json
from collections import defaultdict

# Load Class 1 topic mapping
with open(r"D:\platform\parsed_output\class1_topic_mapping.json", encoding="utf-8-sig") as f:
    class1_topics = json.load(f)

# Build topic_num -> nodes lookup per subject
topic_lookup = {}  # (subj, topic_num) -> [node_ids]
all_topics_by_subj = {}  # subj -> set of all topic_nums
all_nodes_by_subj = {}  # subj -> set of all node_ids

for key, m in class1_topics.items():
    subj = m["subject"]
    all_topics_by_subj[subj] = set()
    all_nodes_by_subj[subj] = set()
    for t in m["topics"]:
        topic_lookup[(subj, t["topic_num"])] = t["nodes"]
        all_topics_by_subj[subj].add(t["topic_num"])
        all_nodes_by_subj[subj].update(t["nodes"])

# Process all Class 1 files
results = []
with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        cls = r.get("class_from_filename")
        if cls != 1:
            continue
        
        subj = r.get("subject_dir")
        if not subj or subj == "unknown":
            continue
        
        topics = r.get("topic_numbers")
        unit = r.get("unit") or "unknown"
        file_path = r.get("file_path")
        filename = r.get("filename", "")
        
        # Skip enrichment files (they're node-level, handled separately)
        if unit and "enrichment" in unit.lower():
            level = "node"
            # Enrichment files map to their own node
            node_id = r.get("node_id", "")
            results.append({
                "file_path": file_path,
                "filename": filename,
                "subject": subj,
                "content_type": unit,
                "level": "node",
                "topic_nums": None,
                "mapped_nodes": [node_id] if node_id else [],
                "node_count": 1 if node_id else 0,
            })
            continue
        
        # Get all nodes and topics for this subject
        subj_nodes = all_nodes_by_subj.get(subj, set())
        subj_topics = all_topics_by_subj.get(subj, set())
        
        if not subj_nodes:
            # No topic mapping for this subject - shouldn't happen for Class 1
            results.append({
                "file_path": file_path,
                "filename": filename,
                "subject": subj,
                "content_type": unit,
                "level": "unmapped",
                "topic_nums": topics,
                "mapped_nodes": [],
                "node_count": 0,
            })
            continue
        
        # Check for topic-specific teaching files by unit name
        # These are files like "My Needs -- Air" or "Transport" that cover
        # only one topic, identified by their unit/directory name
        unit_lower = (unit or "").lower()
        matched_topic_num = None
        for t in class1_topics.get(f"1_{subj}", {}).get("topics", []):
            tname = t["topic_name"].lower()
            # Normalize dashes for comparison
            unit_norm = unit_lower.replace("--", "-")
            tname_norm = tname.replace("--", "-")
            if tname_norm in unit_norm or unit_norm in tname_norm:
                matched_topic_num = t["topic_num"]
                break
        
        if matched_topic_num is not None:
            # Topic-specific file identified by unit name
            level = "topic"
            mapped_nodes = set(topic_lookup.get((subj, matched_topic_num), []))
            topics = [matched_topic_num]
        elif topics and set(topics).issubset(subj_topics):
            # Topic numbers match our mapping
            mapped_nodes = set()
            for tn in topics:
                nodes = topic_lookup.get((subj, tn), [])
                mapped_nodes.update(nodes)
            
            # If all topics are covered, it's class-level
            if set(topics) == subj_topics:
                level = "class"
            else:
                level = "topic"
        else:
            # No topic numbers or don't match - class-level
            level = "class"
            mapped_nodes = set(subj_nodes)
        
        results.append({
            "file_path": file_path,
            "filename": filename,
            "subject": subj,
            "content_type": unit,
            "level": level,
            "topic_nums": topics if topics else None,
            "mapped_nodes": sorted(mapped_nodes),
            "node_count": len(mapped_nodes),
        })

# Write results
with open(r"D:\platform\parsed_output\class1_file_mapping.jsonl", "w", encoding="utf-8") as f:
    for r in results:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")

# Summary
by_level = defaultdict(int)
by_subj = defaultdict(lambda: defaultdict(int))
for r in results:
    by_level[r["level"]] += 1
    by_subj[r["subject"]][r["level"]] += 1

print(f"Total Class 1 files mapped: {len(results)}")
print(f"\nBy level: {dict(by_level)}")
print(f"\nBy subject and level:")
for subj in sorted(by_subj.keys()):
    levels = by_subj[subj]
    print(f"  {subj}: {dict(levels)}")

# Show topic-level files
print(f"\n=== Topic-level files ===")
for r in results:
    if r["level"] == "topic":
        print(f"  {r['subject']}/{r['content_type']}: {r['filename']} -> topics {r['topic_nums']}, {r['node_count']} nodes")
