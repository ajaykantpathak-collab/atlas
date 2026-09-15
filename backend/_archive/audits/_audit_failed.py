import json
from pathlib import Path
from collections import defaultdict

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")
results = list(OUTPUT_DIR.glob("*_result.json"))

failed = []
ok = []

for f in results:
    size = f.stat().st_size
    data = json.loads(f.read_text(encoding="utf-8"))
    results_list = data.get("results", [])
    has_error = any("_error" in r for r in results_list)
    has_real_content = any("nodes" in r or "questions" in r for r in results_list)

    if has_error and not has_real_content:
        failed.append((f.stem.replace("_result", ""), data.get("grade"), data.get("subject"), data.get("cbse_subject"), size))
    else:
        ok.append((f.stem.replace("_result", ""), data.get("grade"), data.get("subject"), size))

print(f"OK: {len(ok)}")
print(f"Failed (error stubs): {len(failed)}")

# Breakdown by grade and subject
by_grade = defaultdict(list)
for chap, grade, subject, cbse_subject, size in failed:
    by_grade[grade].append((chap, cbse_subject, size))

print("\n=== FAILED BY GRADE ===")
for grade in sorted(by_grade.keys()):
    items = by_grade[grade]
    by_subj = defaultdict(list)
    for chap, subj, size in items:
        by_subj[subj].append(chap)
    print(f"\n  Grade {grade}: {len(items)} failed")
    for subj, chaps in sorted(by_subj.items()):
        print(f"    {subj}: {len(chaps)}")

# List all failed chapter IDs for reprocessing
print("\n=== ALL FAILED CHAPTER IDs ===")
failed_ids = [chap for chap, _, _, _, _ in failed]
print(",".join(failed_ids))
