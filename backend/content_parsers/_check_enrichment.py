import json
lines = open(r"D:\platform\parsed_output\enrichment.jsonl", "r", encoding="utf-8").readlines()
for l in lines[:3]:
    r = json.loads(l)
    nid = r.get("node_id", "")
    cls = r.get("class_level", "")
    subj = r.get("subject", "")
    title = r.get("title", "")[:50]
    print(f"node_id={nid}, class={cls}, subject={subj}, title={title}")
    print(f"  keys: {list(r.keys())[:10]}")
    print()

# Count per class
cls_counts = {}
for l in lines:
    if not l.strip():
        continue
    r = json.loads(l)
    cls = r.get("class_level", 0)
    cls_counts[cls] = cls_counts.get(cls, 0) + 1
print("Class distribution in enrichment.jsonl:")
for k in sorted(cls_counts.keys()):
    print(f"  Class {k}: {cls_counts[k]} nodes")
