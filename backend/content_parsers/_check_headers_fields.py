"""Check what fields are actually in file_headers.jsonl"""
import json
from collections import Counter

fields = Counter()
dir_types = Counter()
sample = None

with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for i, line in enumerate(f):
        r = json.loads(line)
        for k in r.keys():
            fields[k] += 1
        dt = r.get("directory_type") or r.get("dir_type") or r.get("type") or "N/A"
        dir_types[dt] += 1
        if i < 3:
            print(f"--- Record {i+1} ---")
            for k, v in r.items():
                val = str(v)[:100] if v else str(v)
                print(f"  {k}: {val}")
            print()

print(f"\n{'='*50}")
print(f"FIELDS (top 20):")
for k, c in fields.most_common(20):
    print(f"  {k}: {c}")

print(f"\n{'='*50}")
print(f"DIRECTORY TYPES:")
for dt, c in dir_types.most_common(20):
    print(f"  {dt}: {c}")
