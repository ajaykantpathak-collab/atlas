"""Find Class 1 files where the unit name matches a topic name."""
import json

# Load Class 1 topic mapping
with open(r"D:\platform\parsed_output\class1_topic_mapping.json", encoding="utf-8-sig") as f:
    class1_topics = json.load(f)

# Build topic name -> topic_num lookup per subject
topic_names_by_subj = {}  # subj -> {topic_name_lower: topic_num}
for key, m in class1_topics.items():
    subj = m["subject"]
    topic_names_by_subj[subj] = {}
    for t in m["topics"]:
        name = t["topic_name"].lower()
        topic_names_by_subj[subj][name] = t["topic_num"]

# Check all Class 1 files
matches = []
with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        if r.get("class_from_filename") != 1:
            continue
        subj = r.get("subject_dir")
        if not subj or subj not in topic_names_by_subj:
            continue
        unit = (r.get("unit") or "").lower()
        if not unit or unit == "unknown":
            continue
        
        # Check if unit matches any topic name
        topic_map = topic_names_by_subj[subj]
        for tname, tnum in topic_map.items():
            if tname in unit or unit in tname:
                fname = r.get("filename", "")
                matches.append({
                    "filename": fname,
                    "subject": subj,
                    "unit": r.get("unit"),
                    "matched_topic": tname,
                    "topic_num": tnum,
                })
                break

print(f"Files with unit matching topic name: {len(matches)}")
for m in matches:
    print(f"  {m['subject']}/{m['unit']}: {m['filename']} -> topic {m['topic_num']} ({m['matched_topic']})")
