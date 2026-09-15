"""Quick verification of all 12 classes."""
import json
import re
from collections import defaultdict, Counter

enrichment_by_class = defaultdict(set)
enrichment_by_cs = defaultdict(set)
node_id_abbr = {}

with open(r"D:\platform\parsed_output\enrichment.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        cls = r.get("class_level")
        subj = r.get("subject")
        nid = r.get("node_id")
        if cls and subj and nid:
            enrichment_by_class[cls].add(nid)
            enrichment_by_cs[(cls, subj)].add(nid)
            parts = nid.split("_")
            if len(parts) >= 3:
                node_id_abbr[(cls, subj)] = parts[1]

issues = []
print(f"{'='*70}")
print(f"FINAL VERIFICATION: ALL 12 CLASSES")
print(f"{'='*70}")

for class_num in range(1, 13):
    path = rf"D:\platform\parsed_output\class{class_num}_topic_mapping.json"
    try:
        with open(path, encoding="utf-8-sig") as f:
            mapping = json.load(f)
    except FileNotFoundError:
        print(f"  Class {class_num:2d}: MISSING FILE")
        issues.append(f"Class {class_num}: missing file")
        continue

    all_mapped = set()
    total_nodes = 0
    total_topics = 0

    for key, m in mapping.items():
        subj = m.get("subject", "")
        topics = m.get("topics", [])
        total_topics += len(topics)
        subj_abbr = node_id_abbr.get((class_num, subj), subj)

        subject_mapped = set()
        for t in topics:
            for nid in t.get("nodes", []):
                if not re.match(rf"^c{class_num}_{subj_abbr}_\d+$", nid):
                    issues.append(f"Class {class_num} {subj}: bad node ID {nid}")
                if nid in subject_mapped:
                    issues.append(f"Class {class_num} {subj}: duplicate {nid}")
                subject_mapped.add(nid)
                all_mapped.add(nid)
        total_nodes += len(subject_mapped)

        enrichment_nodes = enrichment_by_cs.get((class_num, subj), set())
        uncovered = enrichment_nodes - subject_mapped
        extra = subject_mapped - enrichment_nodes
        if uncovered:
            issues.append(f"Class {class_num} {subj}: {len(uncovered)} uncovered")
        if extra:
            issues.append(f"Class {class_num} {subj}: {len(extra)} extra")

    enrichment_total = len(enrichment_by_class.get(class_num, set()))
    status = "OK" if total_nodes == enrichment_total and not any(i.startswith(f"Class {class_num}") for i in issues) else "FAIL"
    print(f"  Class {class_num:2d}: {len(mapping):2d} subjects, {total_topics:3d} topics, {total_nodes:4d} nodes | enrichment: {enrichment_total:4d} | {status}")

print(f"\n{'='*70}")
print(f"Total issues: {len(issues)}")
if issues:
    for i in issues:
        print(f"  {i}")
else:
    print("ALL 12 CLASSES PERFECT - zero issues across all classes!")

# Grand total
grand_total = sum(len(enrichment_by_class[c]) for c in range(1, 13))
print(f"\nGrand total: {grand_total} unique enrichment nodes across 12 classes")
