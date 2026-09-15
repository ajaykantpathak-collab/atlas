"""Extract CBSE chapters and CISCE topics for chapter-level matching."""
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
NODE_INDEX = Path(r"D:\platform\content\index\node_index.json")

# ─── CBSE: group nodes by chapter ───
cbse_chapters = defaultdict(lambda: {"nodes": [], "classes": set(), "subjects": set()})
for result_file in CBSE_OUTPUT.glob("*_result.json"):
    if result_file.stat().st_size < 500:
        continue
    try:
        data = json.loads(result_file.read_text(encoding="utf-8"))
        subject = data.get("subject", "unknown")
        grade = data.get("grade", "?")
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                chapter = node.get("chapter", node.get("chapter_name", "Unknown"))
                if chapter and chapter != "Unknown":
                    cbse_chapters[chapter]["nodes"].append(node.get("node_id", ""))
                    cbse_chapters[chapter]["classes"].add(str(grade))
                    cbse_chapters[chapter]["subjects"].add(subject)
    except:
        pass

# ─── CISCE: get topics for class 6-12 maths ───
cisce_data = json.loads(NODE_INDEX.read_text(encoding="utf-8"))
cisce_maths = []
for item in cisce_data:
    if item.get("subject") == "maths" and isinstance(item.get("class"), int) and item["class"] >= 6:
        cisce_maths.append({
            "node_id": item.get("node_id", ""),
            "title": item.get("title", ""),
            "class": item.get("class", "?"),
            "section": item.get("section", ""),
            "syllabus": item.get("syllabus", "")[:300],
        })

# Group CISCE by class
cisce_by_class = defaultdict(list)
for t in cisce_maths:
    cisce_by_class[t["class"]].append(t)

print(f"=== CBSE MATHS CHAPTERS ({len(cbse_chapters)} unique chapters) ===\n")
for ch in sorted(cbse_chapters.keys()):
    info = cbse_chapters[ch]
    print(f"  [{', '.join(sorted(info['classes']))}] {ch} ({len(info['nodes'])} nodes)")

print(f"\n=== CISCE MATHS TOPICS BY CLASS ===\n")
for cls in sorted(cisce_by_class.keys()):
    topics = cisce_by_class[cls]
    print(f"  Class {cls}: {len(topics)} topics")
    for t in topics[:3]:
        print(f"    {t['node_id']}: {t['title'][:60]}")
    if len(topics) > 3:
        print(f"    ... and {len(topics)-3} more")

# Save for prompt building
out = Path(r"D:\platform\backend\_maths_chapters_data.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump({
        "cbse_chapters": {k: {"node_count": len(v["nodes"]), "classes": sorted(v["classes"]), "node_ids": v["nodes"]}
                          for k, v in cbse_chapters.items()},
        "cisce_topics": cisce_maths,
    }, f, indent=2, ensure_ascii=False)
print(f"\nSaved to {out} ({out.stat().st_size//1024}KB)")
