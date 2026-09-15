"""Build the task prompts for file mapping subagents."""
import json

with open(r"D:\platform\parsed_output\file_mapping_tasks.json", encoding="utf-8-sig") as f:
    tasks = json.load(f)

# Only include tasks that have topics (skip eng, unknown, etc.)
valid_tasks = [t for t in tasks if len(t["topics"]) > 0]

print(f"Valid tasks (with topics): {len(valid_tasks)}")
print(f"Skipped (no topics): {len(tasks) - len(valid_tasks)}")

# Group by class for batching
for cls in [9, 10, 11, 12]:
    cls_tasks = [t for t in valid_tasks if t["class"] == cls]
    print(f"\nClass {cls}: {len(cls_tasks)} tasks")
    for t in cls_tasks:
        print(f"  {t['key']}: {t['file_count']} files, {len(t['topics'])} topics")

# Save valid tasks
with open(r"D:\platform\parsed_output\file_mapping_tasks_valid.json", "w", encoding="utf-8") as f:
    json.dump(valid_tasks, f, indent=2, ensure_ascii=False)
