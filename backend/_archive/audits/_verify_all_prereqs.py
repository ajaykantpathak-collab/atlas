"""Verify ALL existing prereq .md files: check node IDs exist, reasons are real, format is correct."""
import json
import re
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
PREREQS_DIR = Path(r"D:\platform\cbse_data\prereqs")

# Load all node IDs
all_node_ids = set()
all_nodes_by_id = {}
for f in CBSE_OUTPUT.glob("*_result.json"):
    if f.stat().st_size < 500:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                nid = node.get("node_id", "")
                if nid:
                    all_node_ids.add(nid)
                    all_nodes_by_id[nid] = node
    except:
        pass

print(f"Total unique node IDs in CBSE data: {len(all_node_ids)}")

# Parse all good prereq files
good_files = [f for f in PREREQS_DIR.glob("*.md") if f.stat().st_size >= 500]
print(f"Good prereq files to verify: {len(good_files)}")

stats = {
    "total_nodes": 0,
    "nodes_with_prereqs": 0,
    "nodes_with_cross": 0,
    "nodes_with_depth": 0,
    "total_prereq_refs": 0,
    "valid_prereq_refs": 0,
    "invalid_prereq_refs": 0,
    "total_cross_refs": 0,
    "valid_cross_refs": 0,
    "invalid_cross_refs": 0,
    "nodes_with_reasons": 0,
    "nodes_with_good_reasons": 0,
    "duplicate_key_issues": 0,
    "empty_responses": 0,
}

invalid_prereq = []
invalid_cross = []
depth_dist = defaultdict(int)
by_subject = defaultdict(lambda: {"files": 0, "nodes": 0, "prereqs": 0, "cross": 0, "invalid": 0})

for f in sorted(good_files):
    text = f.read_text(encoding="utf-8")
    
    # Skip error messages
    if "Token limit" in text or "rate limit" in text[:200]:
        stats["empty_responses"] += 1
        continue
    
    # Determine subject from filename
    subj = f.stem.split("_c")[0] if "_c" in f.stem else f.stem
    by_subject[subj]["files"] += 1

    # Parse sections
    sections = re.split(r"\n## (c\d+_\w+_cbse_\d+)\n", text)
    for i in range(1, len(sections), 2):
        nid = sections[i]
        content = sections[i+1] if i+1 < len(sections) else ""
        stats["total_nodes"] += 1
        by_subject[subj]["nodes"] += 1

        # Prereq IDs
        prereq_match = re.search(r"\*\*prerequisite_node_ids\*\*:\s*\[([^\]]*)\]", content)
        prereqs = []
        if prereq_match:
            refs_str = prereq_match.group(1).strip()
            if refs_str:
                prereqs = [r.strip().strip("'\"") for r in refs_str.split(",") if r.strip()]
        
        if prereqs:
            stats["nodes_with_prereqs"] += 1
            for r in prereqs:
                stats["total_prereq_refs"] += 1
                by_subject[subj]["prereqs"] += 1
                if r in all_node_ids:
                    stats["valid_prereq_refs"] += 1
                else:
                    stats["invalid_prereq_refs"] += 1
                    invalid_prereq.append((nid, r, f.name))
                    by_subject[subj]["invalid"] += 1

        # Cross-subject IDs
        cross_match = re.search(r"\*\*cross_subject_prereqs\*\*:\s*\[([^\]]*)\]", content)
        crosses = []
        if cross_match:
            refs_str = cross_match.group(1).strip()
            if refs_str:
                crosses = [r.strip().strip("'\"") for r in refs_str.split(",") if r.strip()]
        
        if crosses:
            stats["nodes_with_cross"] += 1
            for r in crosses:
                stats["total_cross_refs"] += 1
                by_subject[subj]["cross"] += 1
                if r in all_node_ids:
                    stats["valid_cross_refs"] += 1
                else:
                    stats["invalid_cross_refs"] += 1
                    invalid_cross.append((nid, r, f.name))

        # Depth
        depth_match = re.search(r"\*\*prerequisite_depth\*\*:\s*(\w+)", content)
        if depth_match:
            stats["nodes_with_depth"] += 1
            depth_dist[depth_match.group(1)] += 1

        # Check for reasons
        if "**prerequisite_reasons**" in content and ":" in content.split("**prerequisite_reasons**")[1][:50]:
            stats["nodes_with_reasons"] += 1
            # Check if reasons are substantive (more than just {})
            reasons_section = content.split("**prerequisite_reasons**")[1].split("\n")[0] if "**prerequisite_reasons**" in content else ""
            if len(reasons_section.strip()) > 10:
                stats["nodes_with_good_reasons"] += 1

        # Duplicate keys
        if content.count("**prerequisite_node_ids**") > 1:
            stats["duplicate_key_issues"] += 1

# Report
print(f"\n{'='*100}")
print(f"  PREREQ VERIFICATION REPORT")
print(f"{'='*100}")
print(f"  Files checked:           {len(good_files)}")
print(f"  Error-message files:     {stats['empty_responses']}")
print(f"  Total nodes parsed:      {stats['total_nodes']}")
print(f"  Nodes with prereqs:      {stats['nodes_with_prereqs']} ({100*stats['nodes_with_prereqs']//stats['total_nodes'] if stats['total_nodes'] else 0}%)")
print(f"  Nodes with cross-subj:   {stats['nodes_with_cross']} ({100*stats['nodes_with_cross']//stats['total_nodes'] if stats['total_nodes'] else 0}%)")
print(f"  Nodes with depth:        {stats['nodes_with_depth']}")
print(f"  Nodes with reasons:      {stats['nodes_with_reasons']}")
print(f"  Nodes with good reasons: {stats['nodes_with_good_reasons']}")
print(f"  Duplicate key issues:    {stats['duplicate_key_issues']}")
print(f"")
print(f"  Prereq refs:             {stats['total_prereq_refs']} total")
print(f"    valid:                 {stats['valid_prereq_refs']} ({100*stats['valid_prereq_refs']//stats['total_prereq_refs'] if stats['total_prereq_refs'] else 0}%)")
print(f"    invalid:               {stats['invalid_prereq_refs']} ({100*stats['invalid_prereq_refs']//stats['total_prereq_refs'] if stats['total_prereq_refs'] else 0}%)")
print(f"")
print(f"  Cross-subject refs:      {stats['total_cross_refs']} total")
print(f"    valid:                 {stats['valid_cross_refs']} ({100*stats['valid_cross_refs']//stats['total_cross_refs'] if stats['total_cross_refs'] else 0}%)")
print(f"    invalid:               {stats['invalid_cross_refs']} ({100*stats['invalid_cross_refs']//stats['total_cross_refs'] if stats['total_cross_refs'] else 0}%)")
print(f"")
print(f"  Depth distribution:      {dict(depth_dist)}")

print(f"\n{'='*100}")
print(f"  BY SUBJECT")
print(f"{'='*100}")
print(f"  {'Subject':25s} {'Files':>6s} {'Nodes':>7s} {'Prereqs':>8s} {'Cross':>6s} {'Invalid':>8s}")
print(f"  {'-'*65}")
for subj in sorted(by_subject.keys()):
    s = by_subject[subj]
    print(f"  {subj:25s} {s['files']:6d} {s['nodes']:7d} {s['prereqs']:8d} {s['cross']:6d} {s['invalid']:8d}")

if invalid_prereq:
    print(f"\n{'='*100}")
    print(f"  INVALID PREREQ REFS (sample, {len(invalid_prereq)} total)")
    print(f"{'='*100}")
    for nid, ref, fname in invalid_prereq[:15]:
        print(f"  {nid} -> {ref}  (in {fname})")
    if len(invalid_prereq) > 15:
        print(f"  ... and {len(invalid_prereq) - 15} more")

if invalid_cross:
    print(f"\n{'='*100}")
    print(f"  INVALID CROSS-SUBJECT REFS (sample, {len(invalid_cross)} total)")
    print(f"{'='*100}")
    for nid, ref, fname in invalid_cross[:15]:
        print(f"  {nid} -> {ref}  (in {fname})")
    if len(invalid_cross) > 15:
        print(f"  ... and {len(invalid_cross) - 15} more")

# Sample 3 nodes with good prereqs for quality check
print(f"\n{'='*100}")
print(f"  QUALITY SAMPLE (3 nodes with prereqs)")
print(f"{'='*100}")
sampled = 0
for f in sorted(good_files):
    if sampled >= 3:
        break
    text = f.read_text(encoding="utf-8")
    if "Token limit" in text[:200]:
        continue
    sections = re.split(r"\n## (c\d+_\w+_cbse_\d+)\n", text)
    for i in range(1, len(sections), 2):
        if sampled >= 3:
            break
        nid = sections[i]
        content = sections[i+1] if i+1 < len(sections) else ""
        prereq_match = re.search(r"\*\*prerequisite_node_ids\*\*:\s*\[([^\]]*)\]", content)
        if prereq_match and prereq_match.group(1).strip():
            node = all_nodes_by_id.get(nid, {})
            topic = node.get("topic", "?")[:60]
            print(f"\n  {nid}: {topic}")
            # Show first 400 chars of content
            print(f"  {content[:400].strip()}")
            sampled += 1
