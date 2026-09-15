import json
from collections import defaultdict

subj_topics = defaultdict(list)

with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        if r.get("class_from_filename") != 2:
            continue
        subj = r.get("subject_dir") or "unknown"
        topics = r.get("topic_numbers")
        if topics:
            subj_topics[subj].append((r.get("filename"), topics, (r.get("syllabus_topics") or "")[:200]))

for subj in sorted(subj_topics.keys()):
    print(f"\n=== {subj} ===")
    for fname, topics, syllabus in subj_topics[subj][:2]:
        print(f"  {fname}: topics={topics}")
        print(f"    syllabus: {syllabus}")
