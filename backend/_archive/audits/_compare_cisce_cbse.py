"""Check topic similarity between CBSE and CISCE nodes for class 12 across all subjects."""
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

# Collect CBSE class 12 nodes
cbse_nodes = []
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    if data.get("grade") != 12:
        continue
    for chunk in data.get("results", []):
        if "_error" in chunk:
            continue
        for node in chunk.get("nodes", []):
            cbse_nodes.append(node)

print(f"CBSE class 12 nodes: {len(cbse_nodes)}")

# Group by subject
cbse_by_subject = defaultdict(list)
for n in cbse_nodes:
    cbse_by_subject[n["subject"]].append(n)

# Get CISCE class 12 nodes from Neo4j
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

print(f"\n{'Subject':<25} {'CBSE':>6} {'CISCE':>6} {'Match':>6} {'%':>6} {'Avg%':>6}")
print("-" * 65)

total_cbse = 0
total_cisce = 0
total_matches = 0
all_matches = []

for subject in sorted(cbse_by_subject.keys()):
    cbse_subj_nodes = cbse_by_subject[subject]
    
    with driver.session() as session:
        # Try exact subject match
        result = session.run(
            "MATCH (n:KnowledgeNode) WHERE n.class_level = 12 AND n.subject = $subj "
            "RETURN n.node_id as nid, n.topic as topic, n.content_snippet as snippet",
            subj=subject
        )
        cisce_subj_nodes = [{"node_id": r["nid"], "topic": r["topic"], 
                            "content_snippet": r["snippet"] or ""} for r in result]
        
        # If no match, try variations
        if not cisce_subj_nodes:
            for alt in [subject.replace("_", " "), subject.capitalize(), 
                        subject.upper(), subject.replace("_", "")]:
                result = session.run(
                    "MATCH (n:KnowledgeNode) WHERE n.class_level = 12 AND "
                    "(toLower(n.subject) = toLower($subj)) "
                    "RETURN n.node_id as nid, n.topic as topic, n.content_snippet as snippet",
                    subj=alt
                )
                cisce_subj_nodes = [{"node_id": r["nid"], "topic": r["topic"],
                                    "content_snippet": r["snippet"] or ""} for r in result]
                if cisce_subj_nodes:
                    break
    
    if not cisce_subj_nodes:
        print(f"  {subject:<25} {len(cbse_subj_nodes):>6} {'0':>6} {'—':>6} {'—':>6} {'—':>6}")
        continue
    
    # Compare each CBSE node to each CISCE node
    matches = []
    for cn in cbse_subj_nodes:
        best_sim = 0
        best_cisce = None
        for csn in cisce_subj_nodes:
            sim = similarity(cn["topic"], csn["topic"])
            if sim > best_sim:
                best_sim = sim
                best_cisce = csn
        if best_sim >= 0.5:
            matches.append((best_sim, cn, best_cisce))
            all_matches.append((best_sim, subject, cn, best_cisce))
    
    matches.sort(key=lambda x: -x[0])
    match_count = len(matches)
    pct = match_count / len(cbse_subj_nodes) * 100 if cbse_subj_nodes else 0
    avg_sim = sum(m[0] for m in matches) / match_count if match_count else 0
    
    print(f"  {subject:<25} {len(cbse_subj_nodes):>6} {len(cisce_subj_nodes):>6} {match_count:>6} {pct:>5.0f}% {avg_sim:>5.0f}%")
    
    total_cbse += len(cbse_subj_nodes)
    total_cisce += len(cisce_subj_nodes)
    total_matches += match_count

print(f"\n  {'TOTAL':<25} {total_cbse:>6} {total_cisce:>6} {total_matches:>6} {total_matches/total_cbse*100:>5.0f}%")

# Show top matches per subject
print(f"\n=== TOP MATCHES PER SUBJECT (>=80% similarity) ===")
all_matches.sort(key=lambda x: -x[0])
by_subj_matches = defaultdict(list)
for sim, subject, cn, csn in all_matches:
    if sim >= 0.8:
        by_subj_matches[subject].append((sim, cn, csn))

for subject in sorted(by_subj_matches.keys()):
    matches = by_subj_matches[subject]
    print(f"\n  {subject} ({len(matches)} high-similarity matches):")
    for sim, cn, csn in matches[:8]:
        print(f"    [{sim:.0%}] CBSE {cn['node_id']}: {cn['topic'][:55]}")
        print(f"           CISCE {csn['node_id']}: {csn['topic'][:55]}")

# Show CBSE-only nodes (no CISCE match >= 50%)
print(f"\n=== CBSE-ONLY NODES (no CISCE equivalent, <50% match) ===")
cbse_only_by_subj = defaultdict(int)
for subject in sorted(cbse_by_subject.keys()):
    cbse_subj_nodes = cbse_by_subject[subject]
    matched_ids = set()
    for sim, subj, cn, csn in all_matches:
        if subj == subject and sim >= 0.5:
            matched_ids.add(cn["node_id"])
    for cn in cbse_subj_nodes:
        if cn["node_id"] not in matched_ids:
            cbse_only_by_subj[subject] += 1

for subj, count in sorted(cbse_only_by_subj.items(), key=lambda x: -x[1]):
    total = len(cbse_by_subject[subj])
    print(f"  {subj}: {count}/{total} CBSE-only ({count/total*100:.0f}%)")

driver.close()
