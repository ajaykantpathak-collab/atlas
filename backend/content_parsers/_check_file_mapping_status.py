"""Check current state of file mappings vs total corpus files."""
import json
import os
from collections import defaultdict, Counter

# Count files in file_headers.jsonl (the full corpus index)
total_files = 0
files_by_class = defaultdict(int)
files_by_class_subject = defaultdict(int)
files_by_class_dirtype = defaultdict(lambda: defaultdict(int))

with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        total_files += 1
        cls = r.get("class_from_filename")
        subj = r.get("subject_dir", "unknown")
        dirtype = r.get("directory_type", "unknown")
        if cls:
            files_by_class[cls] += 1
            files_by_class_subject[(cls, subj)] += 1
            files_by_class_dirtype[cls][dirtype] += 1

print(f"Total corpus files indexed in file_headers.jsonl: {total_files}")
print()

# Check which classes have file_mapping files
print(f"{'='*70}")
print(f"FILE MAPPING STATUS BY CLASS")
print(f"{'='*70}")
for cls in range(1, 13):
    fm_path = rf"D:\platform\parsed_output\class{cls}_file_mapping.jsonl"
    if os.path.exists(fm_path):
        count = 0
        mapped = 0
        with open(fm_path, encoding="utf-8-sig") as f:
            for line in f:
                count += 1
                r = json.loads(line)
                if r.get("topic_num") is not None:
                    mapped += 1
        total = files_by_class.get(cls, 0)
        print(f"  Class {cls:2d}: {count:4d} files mapped, {mapped:4d} topic-level, {total:4d} total in corpus")
    else:
        total = files_by_class.get(cls, 0)
        print(f"  Class {cls:2d}: NO FILE MAPPING (corpus has {total:4d} files)")

# Show directory types for a sample class
print(f"\n{'='*70}")
print(f"DIRECTORY TYPES IN CORPUS (by class)")
print(f"{'='*70}")
all_dirtypes = set()
for cls in range(1, 13):
    for dt in files_by_class_dirtype[cls].keys():
        all_dirtypes.add(dt)

print(f"Total directory types: {len(all_dirtypes)}")
for dt in sorted(all_dirtypes):
    print(f"  {dt}")

# Show breakdown for class 9 as example
print(f"\n{'='*70}")
print(f"CLASS 9 DIRECTORY TYPE BREAKDOWN (example)")
print(f"{'='*70}")
for dt, count in sorted(files_by_class_dirtype[9].items(), key=lambda x: -x[1]):
    print(f"  {dt}: {count} files")
