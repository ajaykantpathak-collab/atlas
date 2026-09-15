"""Check CISCE maths topic counts per class to plan batching."""
import json
from pathlib import Path
from collections import Counter

data = json.loads(Path(r"D:\platform\backend\_pilot_maths_data.json").read_text(encoding="utf-8"))
cisce = data["cisce"]
cbse = data["cbse"]

cisce_by_class = Counter(n["class"] for n in cisce)
cbse_by_class = Counter(str(n["class_level"]) for n in cbse)

print("CISCE maths per class:")
for c in sorted(cisce_by_class.keys()):
    print(f"  class {c}: {cisce_by_class[c]} topics")

print("\nCBSE maths per class:")
for c in sorted(cbse_by_class.keys()):
    print(f"  class {c}: {cbse_by_class[c]} nodes")

# Estimate new nodes per class (assume 40% unmatched, 3x expansion)
print("\nEstimated new CISCE nodes per class:")
for c in sorted(cisce_by_class.keys()):
    unmatched = int(cisce_by_class[c] * 0.4)
    new_nodes = unmatched * 3
    est_tokens = new_nodes * 200
    print(f"  class {c}: ~{unmatched} unmatched → ~{new_nodes} nodes → ~{est_tokens} output tokens")
