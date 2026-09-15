import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

# Parse all result files
subject_classes = defaultdict(lambda: defaultdict(int))  # subject -> class -> count
total_nodes = 0
empty_files = 0
sample_node = None
subject_names = set()

for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    size = f.stat().st_size
    if size < 100:
        empty_files += 1
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        empty_files += 1
        continue

    subject = data.get("subject", data.get("Subject", "unknown"))
    grade = data.get("grade", data.get("Grade", "?"))
    subject_names.add(subject)

    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            cls = node.get("class_level", node.get("class", "?"))
            subject_classes[subject][cls] += 1
            total_nodes += 1
            if sample_node is None:
                sample_node = node

print(f"Total result files: {len(list(CBSE_OUTPUT.glob('*_result.json')))}")
print(f"Empty/failed files: {empty_files}")
print(f"Total nodes: {total_nodes}")
print(f"Unique subjects: {len(subject_names)}")
print(f"\nSubjects: {sorted(subject_names)}")

print(f"\n{'='*70}")
print(f"  NODES BY SUBJECT AND CLASS")
print(f"{'='*70}")
print(f"{'Subject':30s}", end="")
for cls in range(1, 13):
    print(f"{'c'+str(cls):>5s}", end="")
print(f"{'Total':>8s}")
print("-" * 95)

for subj in sorted(subject_classes.keys()):
    print(f"{subj:30s}", end="")
    row_total = 0
    for cls in range(1, 13):
        cnt = subject_classes[subj].get(cls, 0)
        print(f"{cnt:5d}" if cnt > 0 else f"{'-':>5s}", end="")
        row_total += cnt
    print(f"{row_total:8d}")

# Show sample node
if sample_node:
    print(f"\n{'='*70}")
    print(f"  SAMPLE NODE FIELDS")
    print(f"{'='*70}")
    for k, v in sample_node.items():
        print(f"  {k}: {str(v)[:100]}")
