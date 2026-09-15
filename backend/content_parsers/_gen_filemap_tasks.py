"""Generate the subagent task list for file-to-topic mapping.

Each subagent handles one (class, subject) pair.
It reads the first 50 lines of each file to find topic structure,
then writes a file mapping JSON.
"""
import json
import os
from collections import defaultdict

# Group files by (class, subject)
groups = defaultdict(list)

with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        cls = r.get("class_from_filename")
        if cls not in [9, 10, 11, 12]:
            continue
        subj = r.get("subject_dir") or "unknown"
        fp = r.get("file_path", "")
        fname = r.get("filename", "")
        parts = fp.replace("\\", "/").split("/")
        dirtype = parts[-2] if len(parts) >= 2 else "unknown"
        groups[(cls, subj)].append({"file_path": fp, "filename": fname, "dirtype": dirtype})

# Generate task list
tasks = []
for (cls, subj), files in sorted(groups.items()):
    # Load topic mapping for this class+subject
    topic_map_path = rf"D:\platform\parsed_output\class{cls}_topic_mapping.json"
    with open(topic_map_path, encoding="utf-8-sig") as f:
        topic_map = json.load(f)
    key = f"{cls}_{subj}"
    topics = topic_map.get(key, {}).get("topics", [])
    topic_names = {t["topic_num"]: t["topic_name"] for t in topics}

    file_list = [{"file_path": f["file_path"], "dirtype": f["dirtype"]} for f in files]
    
    tasks.append({
        "class": cls,
        "subject": subj,
        "key": key,
        "file_count": len(files),
        "topics": topic_names,
        "files": file_list,
    })

print(f"Total subagent tasks: {len(tasks)}")
print(f"\nPer class:")
for cls in [9, 10, 11, 12]:
    cls_tasks = [t for t in tasks if t["class"] == cls]
    total_files = sum(t["file_count"] for t in cls_tasks)
    print(f"  Class {cls}: {len(cls_tasks)} subagents, {total_files} files")

# Save task list for reference
with open(r"D:\platform\parsed_output\file_mapping_tasks.json", "w", encoding="utf-8") as f:
    json.dump(tasks, f, indent=2, ensure_ascii=False)
print(f"\nTask list saved to file_mapping_tasks.json")

# Print first 3 tasks as examples
print(f"\n--- Example tasks ---")
for t in tasks[:3]:
    print(f"  Class {t['class']} {t['subject']}: {t['file_count']} files, {len(t['topics'])} topics")
