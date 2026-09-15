"""Post-process: renumber CBSE node IDs to be unique, then check similarity between CBSE and CISCE nodes."""
import json
from pathlib import Path
from collections import defaultdict
import re
from neo4j import GraphDatabase

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")
NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "dream_neo4j_2024"

def normalize(s):
    s = s.lower().strip()
    s = re.sub(r'[^a-z0-9 ]', '', s)
    s = re.sub(r'\s+', ' ', s)
    return s

def similarity(a, b):
    wa = set(normalize(a).split())
    wb = set(normalize(b).split())
    if not wa or not wb:
        return 0
    return len(wa & wb) / min(len(wa), len(wb))

# 1. Collect all CBSE nodes
all_nodes = []
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    for chunk in data.get("results", []):
        if "_error" in chunk:
            continue
        for node in chunk.get("nodes", []):
            node["_chapter"] = data["chapter"]
            node["_subject"] = data["subject"]
            all_nodes.append(node)

print(f"Total CBSE nodes: {len(all_nodes)}")

# 2. Renumber: per subject, assign unique sequential IDs
subject_counters = defaultdict(int)
id_map = {}  # old_id → new_id

for node in all_nodes:
    subject = node["_subject"]
    subject_counters[subject] += 1
    grade = node["class_level"]
    
    # Get subject code
    subj_codes = {
        "physics": "phy", "chemistry": "chem", "biology": "bio", "maths": "math",
        "computer_science": "cs", "accounts": "acc", "economics": "eco",
        "business_studies": "bs", "geography": "geo", "hist": "hist",
        "political_science": "pol", "psychology": "psy", "sociology": "soc",
        "biotech": "bt", "home_science": "hs", "hindi": "hin", "Hindi": "hin",
        "english_core": "eng", "english_elective": "engelec",
        "english_literature": "engl", "English Literature": "engl",
    }
    subj_code = subj_codes.get(subject, subject[:4])
    
    old_id = node["node_id"]
    new_id = f"c{grade}_{subj_code}_cbse_{subject_counters[subject]:03d}"
    id_map[old_id] = new_id
    node["node_id"] = new_id

# 3. Update prerequisite references in all nodes
for node in all_nodes:
    if node.get("prerequisite_node_ids"):
        node["prerequisite_node_ids"] = [id_map.get(pid, pid) for pid in node["prerequisite_node_ids"]]
    if node.get("forward_node_ids"):
        node["forward_node_ids"] = [id_map.get(fid, fid) for fid in node["forward_node_ids"]]

print(f"Renumbered {len(id_map)} node IDs")
print(f"Subjects: {dict(subject_counters)}")

# 4. Save renumbered nodes back to files
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    changed = False
    for chunk in data.get("results", []):
        if "_error" in chunk:
            continue
        for node in chunk.get("nodes", []):
            old_id = node["node_id"]
            if old_id in id_map:
                node["node_id"] = id_map[old_id]
                changed = True
            # Update prereqs
            if node.get("prerequisite_node_ids"):
                node["prerequisite_node_ids"] = [id_map.get(pid, pid) for pid in node["prerequisite_node_ids"]]
            if node.get("forward_node_ids"):
                node["forward_node_ids"] = [id_map.get(fid, fid) for fid in node["forward_node_ids"]]
            # Update prereq reasons keys
            if node.get("prerequisite_reasons") and isinstance(node["prerequisite_reasons"], dict):
                new_reasons = {}
                for k, v in node["prerequisite_reasons"].items():
                    new_k = id_map.get(k, k)
                    new_reasons[new_k] = v
                node["prerequisite_reasons"] = new_reasons
            if node.get("forward_reasons") and isinstance(node["forward_reasons"], dict):
                new_reasons = {}
                for k, v in node["forward_reasons"].items():
                    new_k = id_map.get(k, k)
                    new_reasons[new_k] = v
                node["forward_reasons"] = new_reasons
    if changed:
        f.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")

print("Saved renumbered nodes to files")

# 5. Check similarity between CBSE and CISCE nodes
print("\n=== CBSE vs CISCE SIMILARITY ===")
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# Group CBSE nodes by subject
cbse_by_subject = defaultdict(list)
for node in all_nodes:
    cbse_by_subject[node["_subject"]].append(node)

with driver.session() as session:
    for subject, cbse_nodes in sorted(cbse_by_subject.items()):
        # Get CISCE nodes for same subject
        result = session.run(
            "MATCH (n:KnowledgeNode) WHERE n.subject = $subj "
            "RETURN n.node_id as nid, n.topic as topic, n.content_snippet as snippet, n.class_level as cls",
            subj=subject
        )
        cisce_nodes = [{"node_id": r["nid"], "topic": r["topic"], 
                       "content_snippet": r["snippet"] or "", "class_level": r["cls"]} 
                      for r in result]
        
        if not cisce_nodes:
            print(f"\n  {subject}: 0 CISCE nodes (CBSE-only subject)")
            continue
        
        # Compare
        matches = []
        for cn in cbse_nodes:
            best_match = None
            best_sim = 0
            for csn in cisce_nodes:
                if cn["class_level"] != csn["class_level"]:
                    continue
                sim = similarity(cn["topic"], csn["topic"])
                if sim > best_sim:
                    best_sim = sim
                    best_match = csn
            if best_match and best_sim >= 0.6:
                matches.append((best_sim, cn, best_match))
        
        matches.sort(key=lambda x: -x[0])
        print(f"\n  {subject}: {len(cbse_nodes)} CBSE vs {len(cisce_nodes)} CISCE — {len(matches)} matches (>=60%)")
        for sim, cn, csn in matches[:10]:
            print(f"    [{sim:.0%}] CBSE {cn['node_id']}: {cn['topic'][:50]}")
            print(f"           CISCE {csn['node_id']}: {csn['topic'][:50]}")

driver.close()

# 6. Save similarity report
report = {"renumbered": len(id_map), "subject_counts": dict(subject_counters)}
report_path = OUTPUT_DIR / "_renumber_report.json"
report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
print(f"\nReport saved to {report_path}")
