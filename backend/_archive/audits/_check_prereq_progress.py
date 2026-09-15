"""Check prereq pipeline progress: which (subject, class) batches are done vs missing."""
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
PREREQS_DIR = Path(r"D:\platform\cbse_data\prereqs")

# 1. Collect all (subject, class) combos from result files
result_combos = defaultdict(int)  # (subject, class) -> num result files
for f in CBSE_OUTPUT.glob("*_result.json"):
    if f.stat().st_size < 500:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        subj = data.get("subject", "unknown")
        grade = data.get("grade", "?")
        result_combos[(subj, str(grade))] += 1
    except:
        pass

# 2. Collect prereq batches done
prereq_combos = defaultdict(int)  # (subject, class) -> num prereq batch files
for f in PREREQS_DIR.glob("*.md"):
    # filename: subject_cX_bY.md
    parts = f.stem.split("_c")
    if len(parts) == 2:
        subj = parts[0]
        class_part = parts[1].split("_b")[0]
        prereq_combos[(subj, class_part)] += 1

# 3. Compare
print(f"{'='*100}")
print(f"  PREREQ PIPELINE PROGRESS")
print(f"{'='*100}")
print(f"  Total (subject, class) combos in CBSE results: {len(result_combos)}")
print(f"  Total (subject, class) combos with prereqs:    {len(prereq_combos)}")
print()

# Group by subject
all_subjects = sorted(set(s for s, c in result_combos.keys()))
print(f"  {'Subject':25s} {'Results':>8s} {'Prereqs':>8s} {'Missing':>8s} {'Status':>10s}")
print(f"  {'-'*65}")

total_results = 0
total_prereqs = 0
total_missing = 0
missing_combos = []

for subj in all_subjects:
    # Get all classes for this subject
    result_classes = {c for s, c in result_combos.keys() if s == subj}
    prereq_classes = {c for s, c in prereq_combos.keys() if s == subj}

    n_results = len(result_classes)
    n_prereqs = len(prereq_classes)
    n_missing = n_results - n_prereqs
    status = "DONE" if n_missing == 0 else f"{n_missing} LEFT"

    print(f"  {subj:25s} {n_results:8d} {n_prereqs:8d} {n_missing:8d} {status:>10s}")

    total_results += n_results
    total_prereqs += n_prereqs
    total_missing += n_missing

    for c in sorted(result_classes - prereq_classes, key=lambda x: int(x) if x.isdigit() else 0):
        missing_combos.append((subj, c))

print(f"  {'-'*65}")
print(f"  {'TOTAL':25s} {total_results:8d} {total_prereqs:8d} {total_missing:8d}")
print(f"\n  Coverage: {100*total_prereqs//total_results if total_results else 0}%")

# Detail: missing combos
if missing_combos:
    print(f"\n{'='*100}")
    print(f"  MISSING PREREQ BATCHES ({len(missing_combos)} combos)")
    print(f"{'='*100}")
    for subj, cls in sorted(missing_combos, key=lambda x: (x[0], int(x[1]) if x[1].isdigit() else 0)):
        n_nodes = result_combos.get((subj, cls), 0)
        print(f"  {subj:25s} class {cls:>3s}  ({n_nodes} result files)")

# Also check: for done combos, how many batches vs how many needed?
print(f"\n{'='*100}")
print(f"  BATCH-LEVEL DETAIL (done combos)")
print(f"{'='*100}")
print(f"  {'Subject':25s} {'Class':>5s} {'Result files':>13s} {'Prereq batches':>15s}")
print(f"  {'-'*65}")
for subj in all_subjects:
    result_classes = {c for s, c in result_combos.keys() if s == subj}
    for cls in sorted(result_classes, key=lambda x: int(x) if x.isdigit() else 0):
        n_results = result_combos[(subj, cls)]
        n_prereqs = prereq_combos.get((subj, cls), 0)
        if n_prereqs > 0:
            print(f"  {subj:25s} {cls:>5s} {n_results:13d} {n_prereqs:15d}")
