"""Verify legal_studies prereq files: check that referenced node IDs actually exist."""
import json
from pathlib import Path
from collections import defaultdict
import re

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

# Parse legal_studies prereq files
legal_files = sorted(PREREQS_DIR.glob("legal_studies_*.md"))
print(f"\nLegal studies prereq files: {len(legal_files)}")

total_nodes = 0
total_prereq_refs = 0
total_cross_refs = 0
valid_prereq_refs = 0
valid_cross_refs = 0
invalid_prereq_refs = []
invalid_cross_refs = []
duplicate_keys = []
depth_counts = defaultdict(int)

for f in legal_files:
    text = f.read_text(encoding="utf-8")
    # Parse each node section
    sections = re.split(r"\n## (c\d+_\w+_cbse_\d+)\n", text)
    # sections[0] is preamble, then alternating id, content
    for i in range(1, len(sections), 2):
        nid = sections[i]
        content = sections[i+1] if i+1 < len(sections) else ""
        total_nodes += 1

        # Extract prerequisite_node_ids
        prereq_match = re.search(r"\*\*prerequisite_node_ids\*\*:\s*\[([^\]]*)\]", content)
        if prereq_match:
            refs = [r.strip().strip("'\"") for r in prereq_match.group(1).split(",") if r.strip()]
            for r in refs:
                if r:
                    total_prereq_refs += 1
                    if r in all_node_ids:
                        valid_prereq_refs += 1
                    else:
                        invalid_prereq_refs.append((nid, r))

        # Extract cross_subject_prereqs
        cross_match = re.search(r"\*\*cross_subject_prereqs\*\*:\s*\[([^\]]*)\]", content)
        if cross_match:
            refs = [r.strip().strip("'\"") for r in cross_match.group(1).split(",") if r.strip()]
            for r in refs:
                if r:
                    total_cross_refs += 1
                    if r in all_node_ids:
                        valid_cross_refs += 1
                    else:
                        invalid_cross_refs.append((nid, r))

        # Check for duplicate prerequisite_node_ids keys (formatting issue seen in c12_b1)
        if content.count("**prerequisite_node_ids**") > 1:
            duplicate_keys.append(nid)

        # Extract depth
        depth_match = re.search(r"\*\*prerequisite_depth\*\*:\s*(\w+)", content)
        if depth_match:
            depth_counts[depth_match.group(1)] += 1

print(f"\n{'='*80}")
print(f"  LEGAL STUDIES PREREQ VERIFICATION")
print(f"{'='*80}")
print(f"  Nodes parsed:              {total_nodes}")
print(f"  Prereq refs:               {total_prereq_refs} ({valid_prereq_refs} valid, {total_prereq_refs - valid_prereq_refs} invalid)")
print(f"  Cross-subject refs:        {total_cross_refs} ({valid_cross_refs} valid, {total_cross_refs - valid_cross_refs} invalid)")
print(f"  Duplicate key issues:      {len(duplicate_keys)}")
print(f"  Depth distribution:        {dict(depth_counts)}")

if invalid_prereq_refs:
    print(f"\n  INVALID PREREQ REFS ({len(invalid_prereq_refs)}):")
    for nid, ref in invalid_prereq_refs[:20]:
        print(f"    {nid} -> {ref}")
    if len(invalid_prereq_refs) > 20:
        print(f"    ... and {len(invalid_prereq_refs) - 20} more")

if invalid_cross_refs:
    print(f"\n  INVALID CROSS-SUBJECT REFS ({len(invalid_cross_refs)}):")
    for nid, ref in invalid_cross_refs[:20]:
        print(f"    {nid} -> {ref}")
    if len(invalid_cross_refs) > 20:
        print(f"    ... and {len(invalid_cross_refs) - 20} more")

if duplicate_keys:
    print(f"\n  DUPLICATE KEY ISSUES:")
    for nid in duplicate_keys:
        print(f"    {nid}")

# Check pedagogical quality: sample 5 nodes with prereqs
print(f"\n{'='*80}")
print(f"  SAMPLE NODES (quality check)")
print(f"{'='*80}")
sample_count = 0
for f in legal_files:
    text = f.read_text(encoding="utf-8")
    sections = re.split(r"\n## (c\d+_\w+_cbse_\d+)\n", text)
    for i in range(1, len(sections), 2):
        nid = sections[i]
        content = sections[i+1] if i+1 < len(sections) else ""
        prereq_match = re.search(r"\*\*prerequisite_node_ids\*\*:\s*\[([^\]]*)\]", content)
        if prereq_match and prereq_match.group(1).strip():
            node = all_nodes_by_id.get(nid, {})
            topic = node.get("topic", "?")
            print(f"\n  {nid}: {topic[:60]}")
            print(f"  {content[:500]}")
            sample_count += 1
            if sample_count >= 3:
                break
    if sample_count >= 3:
        break
