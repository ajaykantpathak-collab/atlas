"""
Build CBSE data index from the 1098 result files.
Creates:
  - nodes/index/master_index.json (all nodes flat)
  - nodes/by_class/class_XX.json (per class)
  - nodes/by_subject/SUBJECT.json (per subject)
  - content/diagrams/ (extract SVG diagrams)
DOES NOT modify any existing files — only creates new files in cbse_data/.
"""
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
CBSE_DATA = Path(r"D:\platform\cbse_data")

# ─── Load all nodes ───
all_nodes = []
by_class = defaultdict(list)
by_subject = defaultdict(list)
diagrams = []

for result_file in CBSE_OUTPUT.glob("*_result.json"):
    if result_file.stat().st_size < 500:
        continue
    try:
        data = json.loads(result_file.read_text(encoding="utf-8"))
        grade = data.get("grade", "?")
        subject = data.get("subject", "unknown")
        cbse_subject = data.get("cbse_subject", "unknown")
        title = data.get("title", "")
        chapter_code = data.get("chapter", "")

        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                node["_chapter_code"] = chapter_code
                node["_chapter_title"] = title
                node["_cbse_subject"] = cbse_subject
                all_nodes.append(node)
                by_class[str(grade)].append(node)
                by_subject[subject].append(node)

            # Extract diagrams
            for diag in chunk.get("diagrams", []):
                diag["_chapter_code"] = chapter_code
                diagrams.append(diag)
    except:
        pass

print(f"Total nodes: {len(all_nodes)}")
print(f"Total diagrams: {len(diagrams)}")
print(f"Classes: {sorted(by_class.keys())}")
print(f"Subjects: {sorted(by_subject.keys())}")

# ─── Save master index (compact: node_id, topic, class, subject, chapter) ───
compact = []
for n in all_nodes:
    compact.append({
        "node_id": n.get("node_id", ""),
        "topic": n.get("topic", ""),
        "class_level": n.get("class_level", n.get("_chapter_code", "")),
        "subject": n.get("subject", ""),
        "chapter": n.get("chapter", n.get("_chapter_title", "")),
        "board": n.get("board", "CBSE"),
        "difficulty": n.get("difficulty", ""),
    })

master_path = CBSE_DATA / "nodes" / "index" / "master_index.json"
with open(master_path, "w", encoding="utf-8") as f:
    json.dump(compact, f, indent=2, ensure_ascii=False)
print(f"\nSaved master index: {master_path} ({master_path.stat().st_size//1024}KB)")

# ─── Save per-class files ───
for cls, nodes in sorted(by_class.items()):
    out = CBSE_DATA / "nodes" / "by_class" / f"class_{cls}.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(nodes, f, indent=2, ensure_ascii=False)
    print(f"  class_{cls}.json: {len(nodes)} nodes ({out.stat().st_size//1024}KB)")

# ─── Save per-subject files ───
for subj, nodes in sorted(by_subject.items()):
    safe_subj = subj.replace(" ", "_").replace("/", "_")
    out = CBSE_DATA / "nodes" / "by_subject" / f"{safe_subj}.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(nodes, f, indent=2, ensure_ascii=False)
    print(f"  {safe_subj}.json: {len(nodes)} nodes ({out.stat().st_size//1024}KB)")

# ─── Save diagrams index ───
if diagrams:
    diag_path = CBSE_DATA / "content" / "diagrams" / "diagrams_index.json"
    with open(diag_path, "w", encoding="utf-8") as f:
        json.dump(diagrams, f, indent=2, ensure_ascii=False)
    print(f"\nDiagrams index: {diag_path} ({len(diagrams)} diagrams)")

# ─── Save class+subject summary ───
summary = defaultdict(lambda: {"nodes": 0, "chapters": set()})
for n in all_nodes:
    cls = str(n.get("class_level", n.get("_chapter_code", "?")))
    subj = n.get("subject", "unknown")
    summary[f"class_{cls}_{subj}"]["nodes"] += 1
    summary[f"class_{cls}_{subj}"]["chapters"].add(n.get("_chapter_title", ""))

summary_out = {}
for key, val in sorted(summary.items()):
    summary_out[key] = {"nodes": val["nodes"], "chapters": len(val["chapters"])}

summary_path = CBSE_DATA / "nodes" / "index" / "coverage_summary.json"
with open(summary_path, "w", encoding="utf-8") as f:
    json.dump(summary_out, f, indent=2, ensure_ascii=False)
print(f"\nCoverage summary: {summary_path}")

print(f"\n=== DONE: CBSE data index built ===")
