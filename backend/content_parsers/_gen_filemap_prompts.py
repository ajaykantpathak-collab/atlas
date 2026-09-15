"""Generate subagent task prompts for file-to-topic mapping.
Each subagent handles one (class, subject) pair.
Saves prompts to a JSON file for batch launching.
"""
import json

with open(r"D:\platform\parsed_output\file_mapping_tasks_valid.json", encoding="utf-8-sig") as f:
    tasks = json.load(f)

prompts = []
for t in tasks:
    cls = t["class"]
    subj = t["subject"]
    key = t["key"]
    topics = t["topics"]
    files = t["files"]
    
    # Build the file list string
    file_list_str = "\n".join(
        f'  {i+1}. {f["file_path"]} (dirtype: {f["dirtype"]})'
        for i, f in enumerate(files)
    )
    
    # Build topics string
    topics_str = "\n".join(
        f'  Topic {num}: {name}'
        for num, name in sorted(topics.items(), key=lambda x: int(x[0]))
    )
    
    prompt = f"""Map files to topics for Class {cls} {subj}.

TOPICS AVAILABLE:
{topics_str}

FILES TO MAP ({len(files)} files):
{file_list_str}

INSTRUCTIONS:
1. For EACH file, read ONLY the first 50 lines to find topic structure.
2. Look for these patterns in file content:
   - "=== TOPIC N: ... ===" sections
   - "TOPIC N" references
   - Node IDs like "c{cls}_{subj}_NNN" that map to topics
   - Section headers that match topic names
3. Classify each file as ONE of:
   - "topic": File is organized by specific topics. List which topic_nums it covers.
   - "subject": File covers the whole subject (all topics). Set topic_nums to null.
   - "class": File covers multiple subjects (mock papers, blueprints). Set topic_nums to null.
   - "unmapped": Cannot determine topic scope from content. Set topic_nums to null.
4. For "topic" files, set topic_nums to the list of topic numbers it covers.
5. DO NOT guess. If a file doesn't have clear topic markers, classify it as "subject" or "unmapped".

Write output to D:\\platform\\parsed_output\\file_mappings\\{key}_file_mapping.jsonl
Format (one JSON per line):
{{"file_path": "...", "dirtype": "...", "mapping_type": "topic", "topic_nums": [1, 3]}}
{{"file_path": "...", "dirtype": "...", "mapping_type": "subject", "topic_nums": null}}

After writing, print a summary: how many files of each type."""
    
    prompts.append({"key": key, "class": cls, "subject": subj, "prompt": prompt, "file_count": len(files)})

with open(r"D:\platform\parsed_output\file_mapping_prompts.json", "w", encoding="utf-8") as f:
    json.dump(prompts, f, indent=2, ensure_ascii=False)

print(f"Generated {len(prompts)} prompts")
for p in prompts:
    print(f"  {p['key']}: {p['file_count']} files")

# Create output directory
import os
os.makedirs(r"D:\platform\parsed_output\file_mappings", exist_ok=True)
print("\nOutput directory created: D:\\platform\\parsed_output\\file_mappings\\")
