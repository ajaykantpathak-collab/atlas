import json
from pathlib import Path

subj_dir = Path(r"D:\platform\cbse_data\nodes\by_subject")
for f in sorted(subj_dir.glob("*.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    chapters = {}
    for n in data:
        code = n.get("_chapter_code", "")
        if code and code not in chapters:
            chapters[code] = {
                "node_subject": n.get("subject", ""),
                "cbse_subject": n.get("_cbse_subject", ""),
                "chapter_name": n.get("chapter", "")[:50],
                "class": n.get("class_level", ""),
                "sample_topic": n.get("topic", "")[:50],
            }
    if chapters:
        print(f"\n=== {f.stem} ({len(data)} nodes, {len(chapters)} chapters) ===")
        for code in sorted(chapters):
            c = chapters[code]
            cls = str(c["class"])
            print(f"  {code:10s} c{cls:>2s} cbse={c['cbse_subject']:15s} | {c['chapter_name']}")
