"""Audit CBSE nodes by subject and find CISCE syllabus files."""
import json
from pathlib import Path
from collections import defaultdict

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")

# Count CBSE nodes by subject
subject_nodes = defaultdict(list)
total = 0

for result_file in OUTPUT_DIR.glob("*_result.json"):
    if result_file.stat().st_size < 500:
        continue
    try:
        data = json.loads(result_file.read_text(encoding="utf-8"))
        subject = data.get("subject", "unknown")
        grade = data.get("grade", "?")
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                topic = node.get("topic", "")
                node_id = node.get("node_id", "")
                if topic:
                    subject_nodes[subject].append({
                        "node_id": node_id,
                        "topic": topic,
                        "class_level": node.get("class_level", grade),
                    })
                    total += 1
    except:
        pass

print(f"=== CBSE NODES BY SUBJECT (total: {total}) ===\n")
for subj in sorted(subject_nodes.keys()):
    nodes = subject_nodes[subj]
    classes = sorted(set(str(n["class_level"]) for n in nodes))
    print(f"  {subj}: {len(nodes)} nodes, classes={classes}")

# Now find CISCE syllabus files
print("\n=== CISCE SYLLABUS FILES ===\n")
backend = Path(r"D:\platform\backend")
for f in backend.glob("**/*cisce*"):
    if f.is_file() and f.stat().st_size > 100:
        print(f"  {f} ({f.stat().st_size//1024}KB)")
for f in backend.glob("**/*syllabus*"):
    if f.is_file() and f.stat().st_size > 100:
        print(f"  {f} ({f.stat().st_size//1024}KB)")
