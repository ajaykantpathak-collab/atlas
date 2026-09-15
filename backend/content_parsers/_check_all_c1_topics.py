import json

# Check all Class 1 files for topic_numbers, grouped by subject
from collections import defaultdict

subj_topics = defaultdict(list)

with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        if r.get("class_from_filename") != 1:
            continue
        subj = r.get("subject_dir") or "unknown"
        topics = r.get("topic_numbers")
        syllabus = r.get("syllabus_topics", "")
        if topics:
            subj_topics[subj].append((r.get("filename"), topics, syllabus[:200]))

for subj in sorted(subj_topics.keys()):
    print(f"\n=== {subj} ===")
    for fname, topics, syllabus in subj_topics[subj][:3]:
        print(f"  {fname}: topics={topics}")
        print(f"    syllabus: {syllabus}")
