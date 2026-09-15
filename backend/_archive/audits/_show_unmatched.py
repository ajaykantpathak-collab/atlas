import json
from pathlib import Path
data = json.loads(Path(r"D:\platform\backend\_pilot_maths_data.json").read_text(encoding="utf-8"))
cisce = {n["node_id"]: n for n in data["cisce"]}
unmatched = Path(r"D:\platform\cisce_merge_output\maths_cisce_only_nodes.md").read_text(encoding="utf-8")
ids = [l.strip() for l in unmatched.split("\n") if l.strip().startswith("c") and "_math_" in l]
print(f"33 unmatched CISCE maths nodes:\n")
for nid in ids:
    n = cisce.get(nid, {})
    cls = n.get("class", "?")
    title = n.get("title", "")[:70]
    print(f"  {nid} | class {cls} | {title}")
