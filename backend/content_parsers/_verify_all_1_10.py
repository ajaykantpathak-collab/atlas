"""Comprehensive verification of Classes 1-10.

Checks:
1. All nodes mapped to topics (no uncovered, no extras)
2. No duplicate node assignments within a subject
3. Subject keys match directory names
4. Subject field inside matches key
5. All topic_nums are unique within a subject
6. Node IDs match the expected pattern (cN_subj_NNN)
7. Cross-check against enrichment data
"""
import json
import re
from collections import defaultdict, Counter

# Load all enrichment nodes
enrichment_by_class = defaultdict(set)
enrichment_by_cs = defaultdict(set)
node_titles = {}

with open(r"D:\platform\parsed_output\enrichment.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        cls = r.get("class_level")
        subj = r.get("subject")
        nid = r.get("node_id")
        if cls and subj and nid:
            enrichment_by_class[cls].add(nid)
            enrichment_by_cs[(cls, subj)].add(nid)
            node_titles[nid] = r.get("title", "")

issues = []

for class_num in range(1, 11):
    topic_file = rf"D:\platform\parsed_output\class{class_num}_topic_mapping.json"
    try:
        with open(topic_file, encoding="utf-8-sig") as f:
            mapping = json.load(f)
    except FileNotFoundError:
        issues.append(f"Class {class_num}: MISSING topic mapping file")
        continue

    all_mapped = set()
    
    for key, m in mapping.items():
        subj = m.get("subject", "")
        topics = m.get("topics", [])
        
        # Check key format
        expected_key = f"{class_num}_{subj}"
        if key != expected_key:
            issues.append(f"Class {class_num}: key '{key}' doesn't match expected '{expected_key}'")
        
        # Check subject matches enrichment subjects
        enrichment_nodes = enrichment_by_cs.get((class_num, subj), set())
        if not enrichment_nodes:
            issues.append(f"Class {class_num} {subj}: no enrichment nodes found for this subject")
        
        # Check topic_nums are unique
        topic_nums = [t.get("topic_num") for t in topics]
        num_counts = Counter(topic_nums)
        dups_nums = {n: c for n, c in num_counts.items() if c > 1}
        if dups_nums:
            issues.append(f"Class {class_num} {subj}: duplicate topic_nums: {dups_nums}")
        
        # Check nodes
        subject_mapped = set()
        for t in topics:
            nodes = t.get("nodes", [])
            for nid in nodes:
                # Check node ID format
                if not re.match(rf'^c{class_num}_{subj}_\d+$', nid):
                    issues.append(f"Class {class_num} {subj}: node '{nid}' doesn't match pattern c{class_num}_{subj}_NNN")
                
                # Check for duplicate within subject
                if nid in subject_mapped:
                    issues.append(f"Class {class_num} {subj}: node '{nid}' assigned to multiple topics")
                subject_mapped.add(nid)
                all_mapped.add(nid)
        
        # Check coverage against enrichment
        uncovered = enrichment_nodes - subject_mapped
        extra = subject_mapped - enrichment_nodes
        if uncovered:
            issues.append(f"Class {class_num} {subj}: {len(uncovered)} uncovered nodes: {sorted(uncovered)[:5]}")
        if extra:
            issues.append(f"Class {class_num} {subj}: {len(extra)} extra nodes (not in enrichment): {sorted(extra)[:5]}")
    
    # Check if all enrichment nodes for this class are covered
    enrichment_total = enrichment_by_class.get(class_num, set())
    uncovered_class = enrichment_total - all_mapped
    if uncovered_class:
        issues.append(f"Class {class_num}: {len(uncovered_class)} enrichment nodes not mapped by ANY subject")

print(f"{'='*60}")
print(f"COMPREHENSIVE VERIFICATION: Classes 1-10")
print(f"{'='*60}")
print(f"Total issues found: {len(issues)}")
print()

if issues:
    for issue in issues:
        print(f"  ISSUE: {issue}")
else:
    print("NO ISSUES FOUND - ALL CLASSES 1-10 ARE PERFECT!")

# Also print summary stats
print(f"\n{'='*60}")
print(f"SUMMARY STATS")
print(f"{'='*60}")
for class_num in range(1, 11):
    topic_file = rf"D:\platform\parsed_output\class{class_num}_topic_mapping.json"
    try:
        with open(topic_file, encoding="utf-8-sig") as f:
            mapping = json.load(f)
        total_nodes = sum(len(t["nodes"]) for m in mapping.values() for t in m["topics"])
        total_topics = sum(len(m["topics"]) for m in mapping.values())
        subj_count = len(mapping)
        enrichment_count = len(enrichment_by_class.get(class_num, set()))
        status = "OK" if total_nodes == enrichment_count else f"MISMATCH ({total_nodes} vs {enrichment_count})"
        print(f"  Class {class_num:2d}: {subj_count} subjects, {total_topics} topics, {total_nodes} nodes | enrichment: {enrichment_count} | {status}")
    except FileNotFoundError:
        print(f"  Class {class_num:2d}: MISSING")
