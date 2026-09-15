"""Verify all Class 1 directories are properly used in the mapping."""
import json
from collections import defaultdict

# Load file mapping
file_map = []
with open(r"D:\platform\parsed_output\class1_file_mapping.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        file_map.append(json.loads(line))

# Group by content type
by_type = defaultdict(lambda: {"count": 0, "levels": defaultdict(int), "subjects": set()})

for r in file_map:
    ct = r["content_type"]
    by_type[ct]["count"] += 1
    by_type[ct]["levels"][r["level"]] += 1
    by_type[ct]["subjects"].add(r["subject"])

print(f"=== Class 1 content types ({len(by_type)} types) ===\n")
for ct in sorted(by_type.keys()):
    info = by_type[ct]
    subjects = ",".join(sorted(info["subjects"]))
    levels = dict(info["levels"])
    print(f"  {ct:40s}: {info['count']:3d} files | {levels} | subjects: {subjects}")

# Check if any content types are NOT in the mapping
print(f"\n=== Summary ===")
print(f"Total content types: {len(by_type)}")
print(f"Total files: {len(file_map)}")
print(f"Files with nodes: {sum(1 for r in file_map if r['node_count'] > 0)}")
print(f"Files with 0 nodes: {sum(1 for r in file_map if r['node_count'] == 0)}")
