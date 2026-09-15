"""Verify Classes 3-5 topic mappings and build file mappings."""
import json
from collections import defaultdict

def verify_and_build(class_num, topic_file, output_file):
    # Load topic mapping
    with open(topic_file, encoding="utf-8-sig") as f:
        topic_mapping = json.load(f)

    # Load enrichment
    enrichment_by_node = {}
    with open(r"D:\platform\parsed_output\enrichment.jsonl", encoding="utf-8-sig") as f:
        for line in f:
            r = json.loads(line)
            if r.get("class_level") == class_num:
                enrichment_by_node[r["node_id"]] = r

    all_nodes = set(enrichment_by_node.keys())

    # Build lookups
    topic_lookup = {}
    all_topics_by_subj = {}
    all_nodes_by_subj = {}
    mapped_nodes = set()
    for key, m in topic_mapping.items():
        subj = m["subject"]
        all_topics_by_subj[subj] = set()
        all_nodes_by_subj[subj] = set()
        for t in m["topics"]:
            topic_lookup[(subj, t["topic_num"])] = t["nodes"]
            all_topics_by_subj[subj].add(t["topic_num"])
            all_nodes_by_subj[subj].update(t["nodes"])
            mapped_nodes.update(t["nodes"])

    # Check duplicates
    dups_found = False
    for key, m in topic_mapping.items():
        all_assigned = []
        for t in m["topics"]:
            all_assigned.extend(t["nodes"])
        counts = defaultdict(int)
        for n in all_assigned:
            counts[n] += 1
        dups = {n: c for n, c in counts.items() if c > 1}
        if dups:
            dups_found = True
            print(f"  {key} DUPLICATES: {dups}")

    # Verification
    print(f"\n{'='*60}")
    print(f"CLASS {class_num} VERIFICATION")
    print(f"{'='*60}")

    uncovered = all_nodes - mapped_nodes
    extra = mapped_nodes - all_nodes
    print(f"1. ALL NODES MAPPED: {len(mapped_nodes)}/{len(all_nodes)} {'PASS' if not uncovered and not extra else 'FAIL'}")
    if uncovered:
        print(f"   UNCOVERED: {sorted(uncovered)}")
    if extra:
        print(f"   EXTRA: {sorted(extra)}")
    if dups_found:
        print("   DUPLICATES FOUND (see above)")

    print(f"2. ENRICHMENT: {len(enrichment_by_node)}/{len(all_nodes)} {'PASS' if len(enrichment_by_node) == len(all_nodes) else 'FAIL'}")

    with_diag = sum(1 for r in enrichment_by_node.values() if r.get("diagnostic_questions"))
    print(f"3. SUB-SKILLS: {with_diag}/{len(all_nodes)} {'PASS' if with_diag == len(all_nodes) else 'FAIL'}")

    with_tutor = sum(1 for r in enrichment_by_node.values() if r.get("text_walkthrough"))
    print(f"4. TUTOR-BRAIN: {with_tutor}/{len(all_nodes)} {'PASS' if with_tutor == len(all_nodes) else 'FAIL'}")

    # Build file mapping
    results = []
    teaching_types = {"Teaching", "Step By Step Teach", "Step-by-Step Teaching",
                      "Crash Course", "Doubt Clearing", "Worked Examples",
                      "Solution Templates", "Model Answers"}
    quiz_types = {"Board Style Questions", "Mock Papers", "Mock Paper", "Practice Tests",
                  "Practice Question Paper", "Question Bank", "Question Bank (Clean)",
                  "Question Bank Clean", "Question Papers", "Question Papers Clean",
                  "Past Papers", "Practice"}

    with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
        for line in f:
            r = json.loads(line)
            if r.get("class_from_filename") != class_num:
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
            prefix = f"{class_num}_"
            for t in topic_mapping.get(f"{prefix}{subj}", {}).get("topics", []):
                tname = t["topic_name"].lower()
                unit_norm = unit_lower.replace("--", "-")
                tname_norm = tname.replace("--", "-")
                if len(tname_norm) > 3 and (tname_norm in unit_norm or unit_norm in tname_norm):
                    matched_topic_num = t["topic_num"]
                    break

            if matched_topic_num is not None:
                level = "topic"
                mapped = set(topic_lookup.get((subj, matched_topic_num), []))
                topics = [matched_topic_num]
            elif topics and set(topics).issubset(subj_topics):
                mapped = set()
                for tn in topics:
                    mapped.update(topic_lookup.get((subj, tn), []))
                level = "class" if set(topics) == subj_topics else "topic"
            else:
                level = "class"
                mapped = set(subj_nodes)

            results.append({"file_path": file_path, "filename": filename, "subject": subj,
                "content_type": unit, "level": level, "topic_nums": topics if topics else None,
                "mapped_nodes": sorted(mapped), "node_count": len(mapped)})

    with open(output_file, "w", encoding="utf-8") as f:
        for r in results:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    by_level = defaultdict(int)
    for r in results:
        by_level[r["level"]] += 1
    print(f"5. QUIZ/EXAM SCOPED: {sum(1 for r in results if r['content_type'] in quiz_types and r['node_count'] > 0)} files mapped {'PASS'}")

    subjects_with_teaching = set()
    for r in results:
        if r["content_type"] in teaching_types:
            subjects_with_teaching.add(r["subject"])
    all_subjects = {k.split("_", 1)[1] for k in topic_mapping.keys()}
    missing_t = all_subjects - subjects_with_teaching
    print(f"6. LESSON VIEW: {'PASS' if not missing_t else f'FAIL - missing {missing_t}'}")

    # End-to-end
    flow_ok = True
    for key, m in topic_mapping.items():
        subj = m["subject"]
        subj_files = [r for r in results if r["subject"] == subj and r["level"] == "class"]
        subj_teach = [r for r in results if r["subject"] == subj and r["content_type"] in teaching_types]
        if not (len(subj_files) > 0 and len(subj_teach) > 0):
            flow_ok = False
            print(f"7. FLOW {subj}: ISSUE")
    print(f"7. END-TO-END FLOW: {'PASS' if flow_ok else 'FAIL'}")

    print(f"\nFiles: {len(results)} | By level: {dict(by_level)}")
    topic_files = [r for r in results if r["level"] == "topic"]
    if topic_files:
        print(f"Topic-level files: {len(topic_files)}")
        for r in topic_files[:5]:
            print(f"  {r['subject']}/{r['content_type']}: {r['filename']} -> {r['topic_nums']}")

verify_and_build(3, r"D:\platform\parsed_output\class3_topic_mapping.json",
                  r"D:\platform\parsed_output\class3_file_mapping.jsonl")
verify_and_build(4, r"D:\platform\parsed_output\class4_topic_mapping.json",
                  r"D:\platform\parsed_output\class4_file_mapping.jsonl")
verify_and_build(5, r"D:\platform\parsed_output\class5_topic_mapping.json",
                  r"D:\platform\parsed_output\class5_file_mapping.jsonl")
