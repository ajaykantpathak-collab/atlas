import json

with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        if r.get("class_from_filename") != 1:
            continue
        subj = r.get("subject_dir")
        if subj in ("maths", "physics") and r.get("topic_numbers"):
            fname = r.get("file_path", "").split("\\")[-1]
            syllabus = (r.get("syllabus") or "")[:300]
            topics = r.get("topic_numbers")
            print(f"FILE: {fname}")
            print(f"SUBJECT: {subj}")
            print(f"TOPICS: {topics}")
            print(f"SYLLABUS: {syllabus}")
            print()
