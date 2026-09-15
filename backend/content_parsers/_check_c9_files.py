"""Check the actual directory structure of corpus files for Class 9."""
import json
from collections import defaultdict, Counter

# Get all class 9 files and their directory paths
cls9_dirs = defaultdict(int)
cls9_subjects = Counter()
cls9_files = []

with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        if r.get("class_from_filename") == 9:
            fp = r.get("file_path", "")
            subj = r.get("subject_dir") or "unknown"
            # Extract directory type from path
            # Path format: D:\cisce\{subject}\{dirtype}\{filename}
            parts = fp.replace("\\", "/").split("/")
            dirtype = "unknown"
            if len(parts) >= 5:
                dirtype = parts[-2]  # directory containing the file
            cls9_dirs[dirtype] += 1
            cls9_subjects[subj] += 1
            cls9_files.append((fp, subj, dirtype, r.get("topic_numbers"), r.get("syllabus_topics")))

print(f"Class 9: {len(cls9_files)} total files")
print(f"\nSubjects:")
for s, c in cls9_subjects.most_common():
    print(f"  {s}: {c}")

print(f"\nDirectory types:")
for d, c in sorted(cls9_dirs.items(), key=lambda x: -x[1]):
    print(f"  {d}: {c}")

# Show files with topic_numbers
print(f"\nFiles with topic_numbers:")
topic_count = 0
for fp, subj, dt, tn, st in cls9_files:
    if tn:
        topic_count += 1
        if topic_count <= 10:
            print(f"  {subj}/{dt}: topics={tn} | {(st or '')[:80]}")
print(f"  ... total: {topic_count} files with topic_numbers")

# Show files without topic_numbers by dirtype
print(f"\nFiles WITHOUT topic_numbers by dirtype:")
no_topic = defaultdict(int)
for fp, subj, dt, tn, st in cls9_files:
    if not tn:
        no_topic[dt] += 1
for d, c in sorted(no_topic.items(), key=lambda x: -x[1]):
    print(f"  {d}: {c}")
