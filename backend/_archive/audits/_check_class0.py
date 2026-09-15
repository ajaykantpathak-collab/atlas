"""Check class 0 nodes and show sample nodes."""
import json

with open(r"D:\platform\backend\_english_full_inventory.json", encoding="utf-8") as f:
    nodes = json.load(f)

# Show class 0 nodes
print("=== CLASS 0 NODES ===")
for n in nodes:
    if n["class"] == 0:
        print(f"  {n['node_id']}: title={n['title'][:60]}, subject={n['subject']}, file={n['source_file']}")

# Show sample nodes per class
print("\n=== SAMPLE NODES PER CLASS ===")
from collections import defaultdict
by_class = defaultdict(list)
for n in nodes:
    by_class[n["class"]].append(n)

for cls in sorted(by_class.keys()):
    sample = by_class[cls][:3]
    print(f"\nClass {cls} ({len(by_class[cls])} nodes):")
    for n in sample:
        print(f"  {n['node_id']}: {n['title'][:70]} [{n['subject']}]")
        if n["prerequisites"]:
            print(f"    prereqs: {n['prerequisites'][:3]}")
