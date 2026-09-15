"""Merge Class 11 and Class 12 topic mapping parts into final files."""
import json
import os

for class_num, parts in [(11, ["part1", "part2"]), (12, ["part1", "part2"])]:
    merged = {}
    for part in parts:
        path = rf"D:\platform\parsed_output\class{class_num}_topic_mapping_{part}.json"
        if os.path.exists(path):
            with open(path, encoding="utf-8-sig") as f:
                data = json.load(f)
            merged.update(data)
            print(f"Class {class_num} {part}: {len(data)} subjects loaded")
        else:
            print(f"Class {class_num} {part}: FILE MISSING")

    out_path = rf"D:\platform\parsed_output\class{class_num}_topic_mapping.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(merged, f, indent=2, ensure_ascii=False)
    print(f"Class {class_num}: merged {len(merged)} subjects -> {out_path}")
    print()

# Verify
from collections import defaultdict, Counter
import re

enrichment_by_class = defaultdict(set)
enrichment_by_cs = defaultdict(set)
with open(r"D:\platform\parsed_output\enrichment.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        cls = r.get("class_level")
        subj = r.get("subject")
        nid = r.get("node_id")
        if cls and subj and nid:
            enrichment_by_class[cls].add(nid)
            enrichment_by_cs[(cls, subj)].add(nid)

for class_num in [11, 12]:
    path = rf"D:\platform\parsed_output\class{class_num}_topic_mapping.json"
    with open(path, encoding="utf-8-sig") as f:
        mapping = json.load(f)

    all_mapped = set()
    total_nodes = 0
    total_topics = 0
    issues = []

    for key, m in mapping.items():
        subj = m.get("subject", "")
        topics = m.get("topics", [])
        total_topics += len(topics)

        subject_mapped = set()
        for t in topics:
            for nid in t.get("nodes", []):
                if nid in subject_mapped:
                    issues.append(f"{key}: duplicate {nid}")
                subject_mapped.add(nid)
                all_mapped.add(nid)
        total_nodes += len(subject_mapped)

        enrichment_nodes = enrichment_by_cs.get((class_num, subj), set())
        uncovered = enrichment_nodes - subject_mapped
        extra = subject_mapped - enrichment_nodes
        if uncovered:
            issues.append(f"{key}: {len(uncovered)} uncovered: {sorted(uncovered)[:3]}")
        if extra:
            issues.append(f"{key}: {len(extra)} extra: {sorted(extra)[:3]}")

    enrichment_total = len(enrichment_by_class.get(class_num, set()))
    print(f"Class {class_num}: {len(mapping)} subjects, {total_topics} topics, {total_nodes} nodes | enrichment: {enrichment_total}")
    if issues:
        for i in issues:
            print(f"  ISSUE: {i}")
    else:
        print(f"  PERFECT - all nodes covered, no extras, no duplicates")
    print()
