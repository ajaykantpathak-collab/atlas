"""Extract CBSE MATHS chapters only and build chapter-level matching prompt."""
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
NODE_INDEX = Path(r"D:\platform\content\index\node_index.json")

# ─── CBSE: group MATHS nodes by chapter ───
cbse_chapters = defaultdict(lambda: {"nodes": [], "classes": set()})
for result_file in CBSE_OUTPUT.glob("*_result.json"):
    if result_file.stat().st_size < 500:
        continue
    try:
        data = json.loads(result_file.read_text(encoding="utf-8"))
        subject = data.get("subject", "unknown")
        # Only maths
        if subject != "maths":
            continue
        grade = data.get("grade", "?")
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                chapter = node.get("chapter", node.get("chapter_name", "Unknown"))
                if chapter and chapter != "Unknown":
                    cbse_chapters[chapter]["nodes"].append(node.get("node_id", ""))
                    cbse_chapters[chapter]["classes"].add(str(grade))
    except:
        pass

# ─── CISCE: get maths topics for class 6-12 ───
cisce_data = json.loads(NODE_INDEX.read_text(encoding="utf-8"))
cisce_maths = []
for item in cisce_data:
    if item.get("subject") == "maths" and isinstance(item.get("class"), int) and item["class"] >= 6:
        cisce_maths.append({
            "node_id": item.get("node_id", ""),
            "title": item.get("title", ""),
            "class": item.get("class", "?"),
            "syllabus": item.get("syllabus", "")[:300],
        })

print(f"=== CBSE MATHS CHAPTERS ({len(cbse_chapters)} chapters) ===\n")
for ch in sorted(cbse_chapters.keys()):
    info = cbse_chapters[ch]
    print(f"  [{', '.join(sorted(info['classes']))}] {ch} ({len(info['nodes'])} nodes)")

print(f"\nTotal CBSE maths nodes in chapters: {sum(len(v['nodes']) for v in cbse_chapters.values())}")
print(f"CISCE maths topics: {len(cisce_maths)}")

# Save
out = Path(r"D:\platform\backend\_maths_chapters_only.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump({
        "cbse_chapters": {k: {"node_count": len(v["nodes"]), "classes": sorted(v["classes"]), "node_ids": v["nodes"]}
                          for k, v in cbse_chapters.items()},
        "cisce_topics": cisce_maths,
    }, f, indent=2, ensure_ascii=False)
print(f"\nSaved to {out} ({out.stat().st_size//1024}KB)")
