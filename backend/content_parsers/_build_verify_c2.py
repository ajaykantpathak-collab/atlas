"""Build Class 2 file-to-level mapping and run verification."""
import json
from collections import defaultdict

# Load Class 2 topic mapping
with open(r"D:\platform\parsed_output\class2_topic_mapping.json", encoding="utf-8-sig") as f:
    class2_topics = json.load(f)

# Build lookups
topic_lookup = {}
all_topics_by_subj = {}
all_nodes_by_subj = {}
for key, m in class2_topics.items():
    subj = m["subject"]
    all_topics_by_subj[subj] = set()
    all_nodes_by_subj[subj] = set()
    for t in m["topics"]:
        topic_lookup[(subj, t["topic_num"])] = t["nodes"]
        all_topics_by_subj[subj].add(t["topic_num"])
        all_nodes_by_subj[subj].update(t["nodes"])

# Process Class 2 files
results = []
with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        if r.get("class_from_filename") != 2:
            continue
        subj = r.get("subject_dir")
        if not subj or subj == "unknown":
            continue
        topics = r.get("topic_numbers")
        unit = r.get("unit") or "unknown"
        file_path = r.get("file_path")
        filename = r.get("filename", "")

        if unit and "enrichment" in unit.lower():
            results.append({"file_path": file_path, "filename": filename, "subject": subj,
                "content_type": unit, "level": "node", "topic_nums": None,
                "mapped_nodes": [r.get("node_id", "")], "node_count": 1})
            continue

        subj_nodes = all_nodes_by_subj.get(subj, set())
        subj_topics = all_topics_by_subj.get(subj, set())
        if not subj_nodes:
            results.append({"file_path": file_path, "filename": filename, "subject": subj,
                "content_type": unit, "level": "unmapped", "topic_nums": topics,
                "mapped_nodes": [], "node_count": 0})
            continue

        # Check unit name for topic match
        unit_lower = (unit or "").lower()
        matched_topic_num = None
        for t in class2_topics.get(f"2_{subj}", {}).get("topics", []):
            tname = t["topic_name"].lower()
            unit_norm = unit_lower.replace("--", "-")
            tname_norm = tname.replace("--", "-")
            if tname_norm in unit_norm or unit_norm in tname_norm:
                matched_topic_num = t["topic_num"]
                break

        if matched_topic_num is not None:
            level = "topic"
            mapped_nodes = set(topic_lookup.get((subj, matched_topic_num), []))
            topics = [matched_topic_num]
        elif topics and set(topics).issubset(subj_topics):
            mapped_nodes = set()
            for tn in topics:
                mapped_nodes.update(topic_lookup.get((subj, tn), []))
            level = "class" if set(topics) == subj_topics else "topic"
        else:
            level = "class"
            mapped_nodes = set(subj_nodes)

        results.append({"file_path": file_path, "filename": filename, "subject": subj,
            "content_type": unit, "level": level, "topic_nums": topics if topics else None,
            "mapped_nodes": sorted(mapped_nodes), "node_count": len(mapped_nodes)})

# Write
with open(r"D:\platform\parsed_output\class2_file_mapping.jsonl", "w", encoding="utf-8") as f:
    for r in results:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")

# Summary
by_level = defaultdict(int)
by_subj = defaultdict(lambda: defaultdict(int))
for r in results:
    by_level[r["level"]] += 1
    by_subj[r["subject"]][r["level"]] += 1

print(f"Total Class 2 files mapped: {len(results)}")
print(f"By level: {dict(by_level)}")
print(f"\nBy subject:")
for subj in sorted(by_subj.keys()):
    print(f"  {subj}: {dict(by_subj[subj])}")

# Topic-level files
topic_files = [r for r in results if r["level"] == "topic"]
print(f"\nTopic-level files: {len(topic_files)}")
for r in topic_files:
    print(f"  {r['subject']}/{r['content_type']}: {r['filename']} -> topics {r['topic_nums']}")

# ============= VERIFICATION =============
print("\n" + "=" * 60)
print("CLASS 2 VERIFICATION CHECKLIST")
print("=" * 60)

# Load enrichment
enrichment_by_node = {}
with open(r"D:\platform\parsed_output\enrichment.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        if r.get("class_level") == 2:
            enrichment_by_node[r["node_id"]] = r

all_nodes = set(enrichment_by_node.keys())

# 1. All nodes mapped
mapped = set()
for key, m in class2_topics.items():
    for t in m["topics"]:
        mapped.update(t["nodes"])
print(f"\n1. ALL NODES MAPPED: {len(mapped)}/{len(all_nodes)} {'PASS' if mapped == all_nodes else 'FAIL'}")

# 2. Every node has enrichment
print(f"2. EVERY NODE HAS ENRICHMENT: {len(enrichment_by_node)}/{len(all_nodes)} {'PASS' if len(enrichment_by_node) == len(all_nodes) else 'FAIL'}")

# 3. Sub-skills (diagnostic_questions)
with_diag = sum(1 for r in enrichment_by_node.values() if r.get("diagnostic_questions"))
print(f"3. SUB-SKILLS (diagnostic_questions): {with_diag}/{len(all_nodes)} {'PASS' if with_diag == len(all_nodes) else 'FAIL'}")

# 4. Tutor-brain
with_tutor = sum(1 for r in enrichment_by_node.values() if r.get("text_walkthrough"))
print(f"4. TUTOR-BRAIN: {with_tutor}/{len(all_nodes)} {'PASS' if with_tutor == len(all_nodes) else 'FAIL'}")

# 5. Quiz/exam scoped
quiz_types = {"Board Style Questions", "Mock Papers", "Mock Paper", "Practice Tests",
              "Practice Question Paper", "Question Bank", "Question Bank (Clean)",
              "Question Bank Clean", "Question Papers", "Question Papers Clean",
              "Past Papers", "Practice"}
quiz_files = [r for r in results if r["content_type"] in quiz_types]
all_covered = all(r["node_count"] > 0 for r in quiz_files)
print(f"5. QUIZ/EXAM SCOPED: {len(quiz_files)} files, all mapped: {all_covered} {'PASS' if all_covered else 'FAIL'}")

# 6. Lesson view
teaching_types = {"Teaching", "Step By Step Teach", "Step-by-Step Teaching",
                  "Crash Course", "Doubt Clearing", "Worked Examples",
                  "Solution Templates", "Model Answers"}
subjects_with_teaching = set()
for r in results:
    if r["content_type"] in teaching_types:
        subjects_with_teaching.add(r["subject"])
all_subjects = {k.split("_", 1)[1] for k in class2_topics.keys()}
missing_t = all_subjects - subjects_with_teaching
print(f"6. LESSON VIEW: subjects with teaching={sorted(subjects_with_teaching)} {'PASS' if not missing_t else f'FAIL - missing {missing_t}'}")

# 7. End-to-end
flow_ok = True
for key, m in class2_topics.items():
    subj = m["subject"]
    node_count = sum(len(t["nodes"]) for t in m["topics"])
    subj_files = [r for r in results if r["subject"] == subj and r["level"] == "class"]
    has_enrich = subj in {s for s in all_subjects}
    subj_teach = [r for r in results if r["subject"] == subj and r["content_type"] in teaching_types]
    ok = len(subj_files) > 0 and has_enrich and len(subj_teach) > 0
    if not ok:
        flow_ok = False
        print(f"7. FLOW {subj}: class={len(subj_files)} enrich={has_enrich} teach={len(subj_teach)} ISSUE")
print(f"7. END-TO-END FLOW: {'PASS' if flow_ok else 'FAIL'}")

print("\n" + "=" * 60)
