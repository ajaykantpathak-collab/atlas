"""Print Class 9 task data for subagent prompts."""
import json

with open(r"D:\platform\parsed_output\file_mapping_tasks_valid.json", encoding="utf-8-sig") as f:
    tasks = json.load(f)

c9 = [t for t in tasks if t["class"] == 9]
for t in c9:
    key = t["key"]
    fc = t["file_count"]
    topics = json.dumps(t["topics"])
    files = json.dumps(t["files"])
    print(f"KEY={key}")
    print(f"FILES={fc}")
    print(f"TOPICS={topics}")
    print(f"FILELIST={files}")
    print("---")
