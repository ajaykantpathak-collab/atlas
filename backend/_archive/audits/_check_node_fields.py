import json
data = json.loads(open(r"D:\platform\cbse_data\nodes\by_subject\physics.json", encoding="utf-8").read())
for n in data[:5]:
    nid = n["node_id"]
    subj = n["subject"]
    cls = n["class_level"]
    ch = n.get("chapter", "")[:40]
    cbs = n.get("_cbse_subject", "MISSING")
    ccode = n.get("_chapter_code", "MISSING")
    ctitle = n.get("_chapter_title", "MISSING")
    print(f"{nid:25s} subj={subj:10s} cls={cls} chapter={ch}")
    print(f"  _cbse_subject={cbs} _chapter_code={ccode} _chapter_title={ctitle}")
    print()

# Check all unique _chapter_code values
codes = set()
for n in data:
    code = n.get("_chapter_code", "")
    if code:
        codes.add(code)
print(f"Unique _chapter_code values in physics.json: {len(codes)}")
for c in sorted(codes):
    print(f"  {c}")
