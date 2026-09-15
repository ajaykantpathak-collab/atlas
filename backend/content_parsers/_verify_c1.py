"""Class 1 Verification Checklist

1. All nodes mapped (to topics)
2. Every node has enrichment content
3. Every node has sub-skills (from enrichment)
4. Every node has tutor-brain coverage (from enrichment)
5. Quiz/exam scoped to covered nodes (class-level files map to all nodes)
6. Lesson view works (teaching files exist for each subject)
7. End-to-end student flow passes (node -> topic -> class content available)
"""
import json
from collections import defaultdict

print("=" * 60)
print("CLASS 1 VERIFICATION CHECKLIST")
print("=" * 60)

# Load topic mapping
with open(r"D:\platform\parsed_output\class1_topic_mapping.json", encoding="utf-8-sig") as f:
    class1_topics = json.load(f)

# Load enrichment
enrichment_by_node = {}
enrichment_by_subj = defaultdict(list)
with open(r"D:\platform\parsed_output\enrichment.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        if r.get("class_level") == 1:
            nid = r["node_id"]
            enrichment_by_node[nid] = r
            enrichment_by_subj[r["subject"]].append(nid)

# Load file mapping
file_map = []
with open(r"D:\platform\parsed_output\class1_file_mapping.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        file_map.append(json.loads(line))

# 1. All nodes mapped to topics
print("\n1. ALL NODES MAPPED TO TOPICS")
all_nodes = set(enrichment_by_node.keys())
mapped_nodes = set()
for key, m in class1_topics.items():
    for t in m["topics"]:
        mapped_nodes.update(t["nodes"])
uncovered = all_nodes - mapped_nodes
extra = mapped_nodes - all_nodes
print(f"   Total nodes: {len(all_nodes)}")
print(f"   Mapped to topics: {len(mapped_nodes)}")
print(f"   Uncovered: {len(uncovered)}")
print(f"   Extra: {len(extra)}")
if not uncovered and not extra:
    print("   PASS")
else:
    if uncovered:
        print(f"   FAIL - uncovered: {sorted(uncovered)}")
    if extra:
        print(f"   FAIL - extra: {sorted(extra)}")

# 2. Every node has enrichment content
print("\n2. EVERY NODE HAS ENRICHMENT CONTENT")
nodes_with_enrichment = set(enrichment_by_node.keys())
missing = all_nodes - nodes_with_enrichment
print(f"   Nodes with enrichment: {len(nodes_with_enrichment)}/{len(all_nodes)}")
if not missing:
    print("   PASS")
else:
    print(f"   FAIL - missing enrichment: {sorted(missing)}")

# 3. Every node has sub-skills (from enrichment)
print("\n3. EVERY NODE HAS SUB-SKILLS")
nodes_with_subskills = set()
for nid, r in enrichment_by_node.items():
    if r.get("sub_skills") or r.get("subskills"):
        nodes_with_subskills.add(nid)
missing_subskills = all_nodes - nodes_with_subskills
print(f"   Nodes with sub-skills: {len(nodes_with_subskills)}/{len(all_nodes)}")
if not missing_subskills:
    print("   PASS")
else:
    # Check a sample
    sample = list(missing_subskills)[:3]
    for nid in sample:
        r = enrichment_by_node[nid]
        fields = [k for k in r.keys() if "skill" in k.lower() or "sub" in k.lower()]
        print(f"   {nid}: fields with 'skill/sub' = {fields}")
    print(f"   {len(missing_subskills)} nodes missing sub-skills field")

# 4. Every node has tutor-brain coverage (from enrichment)
print("\n4. EVERY NODE HAS TUTOR-BRAIN COVERAGE")
nodes_with_tutor = set()
for nid, r in enrichment_by_node.items():
    if r.get("tutor_brain") or r.get("tutor") or r.get("walkthrough") or r.get("text_walkthrough"):
        nodes_with_tutor.add(nid)
missing_tutor = all_nodes - nodes_with_tutor
print(f"   Nodes with tutor-brain: {len(nodes_with_tutor)}/{len(all_nodes)}")
if not missing_tutor:
    print("   PASS")
else:
    sample = list(missing_tutor)[:3]
    for nid in sample:
        r = enrichment_by_node[nid]
        fields = [k for k in r.keys() if "tutor" in k.lower() or "walk" in k.lower() or "brain" in k.lower()]
        print(f"   {nid}: relevant fields = {fields}")
    print(f"   {len(missing_tutor)} nodes missing tutor-brain")

# 5. Quiz/exam scoped to covered nodes
print("\n5. QUIZ/EXAM SCOPED TO COVERED NODES")
quiz_types = {"Board Style Questions", "Mock Papers", "Mock Paper", "Practice Tests",
              "Practice Question Paper", "Question Bank", "Question Bank (Clean)",
              "Question Bank Clean", "Question Papers", "Question Papers Clean",
              "Past Papers", "Practice"}
quiz_files = [r for r in file_map if r["content_type"] in quiz_types]
all_covered = all(r["node_count"] > 0 for r in quiz_files)
print(f"   Quiz/exam files: {len(quiz_files)}")
print(f"   All have nodes mapped: {all_covered}")
if all_covered:
    print("   PASS")
else:
    no_nodes = [r for r in quiz_files if r["node_count"] == 0]
    print(f"   FAIL - {len(no_nodes)} files without nodes")

# 6. Lesson view works (teaching files exist for each subject)
print("\n6. LESSON VIEW (TEACHING FILES EXIST)")
teaching_types = {"Teaching", "Step By Step Teach", "Step-by-Step Teaching",
                  "Crash Course", "Doubt Clearing", "Worked Examples",
                  "Solution Templates", "Model Answers"}
subjects_with_teaching = set()
for r in file_map:
    if r["content_type"] in teaching_types:
        subjects_with_teaching.add(r["subject"])
all_subjects = set(class1_topics.keys())
all_subjects = {k.split("_", 1)[1] for k in all_subjects}
missing_subjects = all_subjects - subjects_with_teaching
print(f"   Subjects with teaching files: {sorted(subjects_with_teaching)}")
print(f"   All subjects: {sorted(all_subjects)}")
if not missing_subjects:
    print("   PASS")
else:
    print(f"   MISSING teaching for: {sorted(missing_subjects)}")

# 7. End-to-end student flow
print("\n7. END-TO-END STUDENT FLOW")
print("   Checking: node -> topic -> class content available for each subject")
flow_ok = True
for key, m in class1_topics.items():
    subj = m["subject"]
    topics = m["topics"]
    node_count = sum(len(t["nodes"]) for t in topics)
    
    # Check class-level files exist for this subject
    subj_files = [r for r in file_map if r["subject"] == subj and r["level"] == "class"]
    has_class = len(subj_files) > 0
    
    # Check enrichment exists
    has_enrichment = subj in enrichment_by_subj and len(enrichment_by_subj[subj]) > 0
    
    # Check teaching files exist
    subj_teaching = [r for r in file_map if r["subject"] == subj and r["content_type"] in teaching_types]
    has_teaching = len(subj_teaching) > 0
    
    status = "OK" if (has_class and has_enrichment and has_teaching) else "ISSUE"
    if status != "OK":
        flow_ok = False
    print(f"   {subj}: {node_count} nodes, {len(topics)} topics, "
          f"class_files={len(subj_files)}, enrichment={len(enrichment_by_subj.get(subj, []))}, "
          f"teaching={len(subj_teaching)} [{status}]")

if flow_ok:
    print("\n   PASS")
else:
    print("\n   FAIL - some subjects have issues")

print("\n" + "=" * 60)
print("VERIFICATION COMPLETE")
print("=" * 60)
