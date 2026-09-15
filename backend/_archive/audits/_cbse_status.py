"""Check CBSE generator status."""
import json
import os
from pathlib import Path
from collections import defaultdict

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")
PDF_DIR = Path(r"D:\KnowledgeBase\PARSED_DATA\CBSE")

# Grade letter mapping from the pipeline
GRADE_LETTERS = {}
# Read from the pipeline file
import re
with open(r"D:\platform\backend\cbse_coverage_pipeline.py", "r") as f:
    content = f.read()
    match = re.search(r'GRADE_LETTERS\s*=\s*\{([^}]+)\}', content)
    if match:
        for line in match.group(1).split('\n'):
            m = re.search(r'"(\w)"\s*:\s*(\d+)', line)
            if m:
                GRADE_LETTERS[m.group(1)] = int(m.group(2))

print(f"Grade mapping: {GRADE_LETTERS}")
print()

# Count processed files by grade
results = list(OUTPUT_DIR.glob("*_result.json"))
by_grade = defaultdict(lambda: {"total": 0, "success": 0, "failed": 0})
subjects_by_grade = defaultdict(lambda: defaultdict(int))

for f in results:
    name = f.stem.replace("_result", "")
    grade_letter = name[0] if name else "?"
    grade = GRADE_LETTERS.get(grade_letter, f"?({grade_letter})")
    
    by_grade[grade]["total"] += 1
    if f.stat().st_size >= 1000:
        by_grade[grade]["success"] += 1
    else:
        by_grade[grade]["failed"] += 1
    
    # Try to read subject from the result file
    try:
        data = json.loads(f.read_text(encoding="utf-8", errors="replace"))
        subj = data.get("subject", data.get("cbse_subject", "unknown"))
        subjects_by_grade[grade][subj] += 1
    except:
        subjects_by_grade[grade]["_parse_error"] += 1

print("=" * 70)
print("CBSE COVERAGE PIPELINE STATUS")
print("=" * 70)
total_all = sum(v["total"] for v in by_grade.values())
success_all = sum(v["success"] for v in by_grade.values())
failed_all = sum(v["failed"] for v in by_grade.values())
print(f"Total chapters processed: {total_all}")
print(f"Successful (>=1KB): {success_all}")
print(f"Failed (<1KB): {failed_all}")
print(f"Total output size: {sum(f.stat().st_size for f in results) / 1024 / 1024:.1f} MB")
print()

print("=" * 70)
print("BY GRADE")
print("=" * 70)
for grade in sorted(by_grade.keys(), key=lambda x: (isinstance(x, str), x)):
    v = by_grade[grade]
    print(f"  Class {grade}: {v['total']:4} chapters ({v['success']} OK, {v['failed']} failed)")
    for subj, count in sorted(subjects_by_grade[grade].items()):
        print(f"    {subj}: {count}")

# Check if the process is still running
print()
print("=" * 70)
print("PROCESS STATUS")
print("=" * 70)
import subprocess
result = subprocess.run(["wmic", "process", "where", "name='python.exe'", "get", "processid,commandline"], 
                       capture_output=True, text=True)
for line in result.stdout.split('\n'):
    if 'cbse_coverage' in line.lower():
        print(f"  RUNNING: {line.strip()}")

# Check last modified file
if results:
    latest = max(results, key=lambda f: f.stat().st_mtime)
    import datetime
    mtime = datetime.datetime.fromtimestamp(latest.stat().st_mtime)
    print(f"  Last file written: {latest.name} at {mtime}")
    print(f"  Current time: {datetime.datetime.now()}")
    elapsed = datetime.datetime.now() - mtime
    print(f"  Elapsed since last write: {elapsed}")

# Check total available chapters
print()
print("=" * 70)
print("AVAILABLE NCERT CHAPTERS")
print("=" * 70)
if PDF_DIR.exists():
    for grade_dir in sorted(PDF_DIR.iterdir()):
        if grade_dir.is_dir():
            txt_count = len(list(grade_dir.rglob("*.txt")))
            print(f"  {grade_dir.name}: {txt_count} files")
