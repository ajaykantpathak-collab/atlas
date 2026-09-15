"""Count files per (class, subject, dirtype) group to plan subagent batching."""
import json
import os
from collections import defaultdict

groups = defaultdict(list)

with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        cls = r.get("class_from_filename")
        if cls not in [9, 10, 11, 12]:
            continue
        subj = r.get("subject_dir") or "unknown"
        fp = r.get("file_path", "")
        parts = fp.replace("\\", "/").split("/")
        dirtype = parts[-2] if len(parts) >= 2 else "unknown"
        groups[(cls, subj, dirtype)].append(fp)

# Stats
sizes = [len(v) for v in groups.values()]
print(f"Total groups (class, subject, dirtype): {len(groups)}")
print(f"Total files: {sum(sizes)}")
print(f"Files per group: min={min(sizes)}, max={max(sizes)}, avg={sum(sizes)/len(sizes):.1f}")
print()

# Distribution
from collections import Counter
size_dist = Counter()
for v in groups.values():
    n = len(v)
    if n <= 5:
        size_dist["1-5"] += 1
    elif n <= 10:
        size_dist["6-10"] += 1
    elif n <= 20:
        size_dist["11-20"] += 1
    else:
        size_dist["20+"] += 1

print("Group size distribution:")
for k in ["1-5", "6-10", "11-20", "20+"]:
    print(f"  {k} files: {size_dist[k]} groups")

# How many subagents at 5 files max
import math
total_agents = sum(math.ceil(len(v) / 5) for v in groups.values())
print(f"\nSubagents needed at 5 files max: {total_agents}")

# How many subagents at 10 files max
total_agents_10 = sum(math.ceil(len(v) / 10) for v in groups.values())
print(f"Subagents needed at 10 files max: {total_agents_10}")

# Show biggest groups
print(f"\n{'='*60}")
print(f"BIGGEST GROUPS (20+ files)")
print(f"{'='*60}")
big = [(k, len(v)) for k, v in groups.items() if len(v) >= 20]
big.sort(key=lambda x: -x[1])
for (cls, subj, dt), count in big:
    print(f"  Class {cls} {subj}/{dt}: {count} files")

# Show per-class group counts
print(f"\n{'='*60}")
print(f"GROUPS PER CLASS")
print(f"{'='*60}")
for cls in [9, 10, 11, 12]:
    cls_groups = {k: v for k, v in groups.items() if k[0] == cls}
    cls_agents = sum(math.ceil(len(v) / 5) for v in cls_groups.values())
    print(f"  Class {cls}: {len(cls_groups)} groups, {sum(len(v) for v in cls_groups.values())} files, {cls_agents} subagents needed")
