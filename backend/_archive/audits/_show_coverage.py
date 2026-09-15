"""Show full node coverage per class/grade and subject from all result files."""
import json
from pathlib import Path
from collections import defaultdict

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")

# Collect nodes from both _result.json (OK ones) and _recovered.json
grade_subject_nodes = defaultdict(lambda: defaultdict(int))
grade_subject_chapters = defaultdict(lambda: defaultdict(int))
total_nodes = 0
total_chapters = 0

# Process OK result files
for f in OUTPUT_DIR.glob("*_result.json"):
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        results = data.get("results", [])
        has_real = any("nodes" in r for r in results)
        if not has_real:
            continue
        grade = data.get("grade", 0)
        subject = data.get("cbse_subject", data.get("subject", "Unknown"))
        chapter_nodes = 0
        for r in results:
            nodes = r.get("nodes", [])
            chapter_nodes += len(nodes)
        grade_subject_nodes[grade][subject] += chapter_nodes
        grade_subject_chapters[grade][subject] += 1
        total_nodes += chapter_nodes
        total_chapters += 1
    except Exception:
        continue

# Process recovered files
for f in OUTPUT_DIR.glob("*_recovered.json"):
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        grade = data.get("grade", 0)
        subject = data.get("cbse_subject", data.get("subject", "Unknown"))
        results = data.get("results", [])
        chapter_nodes = 0
        for r in results:
            nodes = r.get("nodes", [])
            chapter_nodes += len(nodes)
        grade_subject_nodes[grade][subject] += chapter_nodes
        grade_subject_chapters[grade][subject] += 1
        total_nodes += chapter_nodes
        total_chapters += 1
    except Exception:
        continue

# Print coverage table
print("=" * 90)
print(f"{'Grade':>5}  {'Subject':<25} {'Chapters':>8} {'Nodes':>8}  {'Avg/Ch':>7}")
print("=" * 90)

for grade in sorted(grade_subject_nodes.keys()):
    subjects = grade_subject_nodes[grade]
    grade_total_nodes = 0
    grade_total_chapters = 0
    for subject in sorted(subjects.keys()):
        nodes = subjects[subject]
        chapters = grade_subject_chapters[grade][subject]
        avg = nodes / chapters if chapters > 0 else 0
        grade_total_nodes += nodes
        grade_total_chapters += chapters
        print(f"{grade:>5}  {subject:<25} {chapters:>8} {nodes:>8}  {avg:>7.1f}")
    print(f"{grade:>5}  {'--- TOTAL ---':<25} {grade_total_chapters:>8} {grade_total_nodes:>8}  {grade_total_nodes/grade_total_chapters if grade_total_chapters else 0:>7.1f}")
    print("-" * 90)

print("=" * 90)
print(f"{'ALL':>5}  {'--- GRAND TOTAL ---':<25} {total_chapters:>8} {total_nodes:>8}  {total_nodes/total_chapters if total_chapters else 0:>7.1f}")
print()

# Also show missing chapters per grade
print("\n=== MISSING CHAPTERS (no usable nodes) ===")
all_chapters = set()
for f in OUTPUT_DIR.glob("*_result.json"):
    stem = f.stem.replace("_result", "")
    all_chapters.add(stem)

ok_chapters = set()
for f in OUTPUT_DIR.glob("*_result.json"):
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        results = data.get("results", [])
        if any("nodes" in r for r in results):
            ok_chapters.add(f.stem.replace("_result", ""))
    except Exception:
        pass
for f in OUTPUT_DIR.glob("*_recovered.json"):
    ok_chapters.add(f.stem.replace("_recovered", ""))

missing = all_chapters - ok_chapters
print(f"Total chapters: {len(all_chapters)}")
print(f"Usable: {len(ok_chapters)}")
print(f"Missing: {len(missing)}")
if missing:
    print(f"Missing chapter IDs: {sorted(missing)}")
