"""Check duplication in result files."""
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
node_count = 0
node_ids = defaultdict(int)
node_chapters = defaultdict(set)

for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    ch_code = f.stem.replace("_result", "")
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        continue
    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            nid = node.get("node_id", "")
            node_count += 1
            node_ids[nid] += 1
            node_chapters[nid].add(ch_code)

print(f"Total node entries: {node_count}")
print(f"Unique node_ids: {len(node_ids)}")
print(f"Average copies per node: {node_count / len(node_ids):.1f}")

# Distribution
copy_counts = defaultdict(int)
for nid, cnt in node_ids.items():
    copy_counts[cnt] += 1

print(f"\nCopies distribution:")
for copies in sorted(copy_counts.keys()):
    print(f"  {copies} copies: {copy_counts[copies]} nodes")

# Sample nodes with many copies
print(f"\nNodes with most copies:")
for nid in sorted(node_ids, key=lambda x: -node_ids[x])[:10]:
    chapters = sorted(node_chapters[nid])
    print(f"  {nid}: {node_ids[nid]} copies, chapters: {chapters[:5]}{'...' if len(chapters)>5 else ''}")
