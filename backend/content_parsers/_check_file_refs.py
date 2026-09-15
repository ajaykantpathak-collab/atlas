"""Check how many Class 9-12 files can be mapped to topics by scanning content for node_id references."""
import json
import re
import os
from collections import defaultdict, Counter

# Load topic mappings for classes 9-12
node_to_topic = {}  # node_id -> (class, subject, topic_num, topic_name)
for cls in range(9, 13):
    path = rf"D:\platform\parsed_output\class{cls}_topic_mapping.json"
    with open(path, encoding="utf-8-sig") as f:
        mapping = json.load(f)
    for key, m in mapping.items():
        subj = m["subject"]
        for t in m["topics"]:
            for nid in t["nodes"]:
                node_to_topic[nid] = (cls, subj, t["topic_num"], t["topic_name"])

print(f"Loaded {len(node_to_topic)} node-to-topic mappings")

# Pattern to find node IDs in file content
node_pattern = re.compile(r'c(\d+)_(\w+)_(\d+)')

results = defaultdict(lambda: {"total": 0, "has_nodes": 0, "has_topics": 0, "no_refs": 0, "no_class": 0})

for cls in range(9, 13):
    with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
        for line in f:
            r = json.loads(line)
            if r.get("class_from_filename") != cls:
                continue

            results[cls]["total"] += 1
            fp = r.get("file_path", "")

            # Check if file exists and read content
            if not os.path.exists(fp):
                results[cls]["no_refs"] += 1
                continue

            try:
                with open(fp, encoding="utf-8-sig", errors="ignore") as cf:
                    content = cf.read()[:50000]  # Read first 50K chars
            except:
                results[cls]["no_refs"] += 1
                continue

            # Find node_id references in content
            found_nodes = set()
            for match in node_pattern.finditer(content):
                found_nodes.add(match.group(0))

            # Map found nodes to topics
            found_topics = set()
            for nid in found_nodes:
                if nid in node_to_topic:
                    found_topics.add(node_to_topic[nid])

            if found_nodes:
                results[cls]["has_nodes"] += 1
            if found_topics:
                results[cls]["has_topics"] += 1
            if not found_nodes and not found_topics:
                results[cls]["no_refs"] += 1

print(f"\n{'='*70}")
print(f"FILE CONTENT ANALYSIS: Classes 9-12")
print(f"{'='*70}")
print(f"{'Class':>6} {'Total':>6} {'Has node refs':>14} {'Has topic refs':>15} {'No refs at all':>15}")
for cls in range(9, 13):
    r = results[cls]
    print(f"{cls:>6} {r['total']:>6} {r['has_nodes']:>14} {r['has_topics']:>15} {r['no_refs']:>15}")

total_no_refs = sum(results[cls]["no_refs"] for cls in range(9, 13))
total_files = sum(results[cls]["total"] for cls in range(9, 13))
print(f"\nTotal files needing subagent reasoning (no refs): {total_no_refs}/{total_files}")
print(f"Total files mappable by script: {total_files - total_no_refs}/{total_files}")
