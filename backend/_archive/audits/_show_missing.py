"""Show what subjects/grades the 41 missing chapters belong to."""
import json
from pathlib import Path
from collections import defaultdict

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")

missing = ['gees202', 'gees204', 'ghml101', 'hees102', 'hehd106', 'hepr101',
           'hess204', 'hhbk101', 'hhdv106', 'hhsb103', 'iebe103', 'iess101',
           'jefp107', 'jesc110', 'jesc111', 'jesc112', 'jesc113',
           'jess101', 'jess102', 'jess103', 'jess104', 'jess105', 'jess106',
           'jess107', 'jess1a1', 'kegy101', 'kegy102', 'kegy103', 'kegy105',
           'kegy106', 'kegy107', 'kehe202', 'keph101', 'keph1a1', 'keww101',
           'leai1101', 'leai1201', 'leam1101', 'leam1201', 'lels1101', 'lels1201']

# Get metadata from the failed result.json stubs
by_grade = defaultdict(list)
for stem in missing:
    result_path = OUTPUT_DIR / f"{stem}_result.json"
    if result_path.exists():
        try:
            data = json.loads(result_path.read_text(encoding="utf-8"))
            grade = data.get("grade", "?")
            subject = data.get("cbse_subject", data.get("subject", "?"))
            title = data.get("title", "?")
            by_grade[grade].append((stem, subject, title))
        except Exception:
            by_grade["?"].append((stem, "?", "?"))
    else:
        by_grade["?"].append((stem, "?", "no result file"))

print(f"=== 41 MISSING CHAPTERS ===\n")
for grade in sorted(by_grade.keys()):
    items = by_grade[grade]
    print(f"Grade {grade}: {len(items)} missing")
    for stem, subject, title in items:
        print(f"  {stem:<12} {subject:<25} {title[:50]}")
    print()

# Summary by subject
by_subject = defaultdict(int)
for grade in by_grade:
    for _, subject, _ in by_grade[grade]:
        by_subject[subject] += 1

print("=== SUMMARY BY SUBJECT ===")
for subject, count in sorted(by_subject.items(), key=lambda x: -x[1]):
    print(f"  {subject:<25} {count} chapters")
