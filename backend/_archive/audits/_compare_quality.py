"""Compare CBSE generated content quality vs our existing CISCE content."""
import json
from pathlib import Path
from neo4j import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

# 1. Get a CISCE node for comparison
print("=== CISCE NODE (existing) ===")
with driver.session() as s:
    r = s.run(
        "MATCH (n:KnowledgeNode) WHERE n.class_level = 12 AND n.subject = 'biology' "
        "RETURN n LIMIT 3"
    )
    for record in r:
        node = record["n"]
        print(f"\n  node_id: {node.get('node_id')}")
        print(f"  topic: {node.get('topic')}")
        print(f"  content_snippet: {node.get('content_snippet', '')[:200]}")
        print(f"  difficulty: {node.get('difficulty')}")
        print(f"  estimated_time: {node.get('estimated_time')}")
        print(f"  concept_tags: {node.get('concept_tags', [])}")
        print(f"  scope_constraints: {node.get('scope_constraints', [])}")
        print(f"  prerequisite_node_ids: {node.get('prerequisite_node_ids', [])}")
        prereq_reasons = node.get('prerequisite_reasons', {})
        if prereq_reasons:
            print(f"  prerequisite_reasons:")
            if isinstance(prereq_reasons, dict):
                for k, v in list(prereq_reasons.items())[:2]:
                    print(f"    {k}: {str(v)[:100]}")
            else:
                print(f"    (raw): {str(prereq_reasons)[:200]}")
        print(f"  cross_subject_prereqs: {node.get('cross_subject_prereqs', [])}")
        cross_reasons = node.get('cross_subject_reasons', {})
        if cross_reasons:
            print(f"  cross_subject_reasons:")
            if isinstance(cross_reasons, dict):
                for k, v in list(cross_reasons.items())[:2]:
                    print(f"    {k}: {str(v)[:100]}")
            else:
                print(f"    (raw): {str(cross_reasons)[:200]}")
        print(f"  source_file: {node.get('source_file')}")

# 2. Get CBSE generated nodes for same subject
print("\n\n=== CBSE NODES (newly generated) ===")
output = Path(r"D:\platform\cbse_coverage_output")
bio_file = output / "lebo101_result.json"
if bio_file.exists():
    data = json.loads(bio_file.read_text(encoding="utf-8"))
    nodes = data["results"][0].get("nodes", [])
    for node in nodes[:3]:
        print(f"\n  node_id: {node.get('node_id')}")
        print(f"  topic: {node.get('topic')}")
        print(f"  content_snippet: {node.get('content_snippet', '')[:200]}")
        print(f"  difficulty: {node.get('difficulty')}")
        print(f"  estimated_time: {node.get('estimated_time')}")
        print(f"  concept_tags: {node.get('concept_tags', [])}")
        print(f"  scope_constraints: {node.get('scope_constraints', [])}")
        print(f"  prerequisite_node_ids: {node.get('prerequisite_node_ids', [])}")
        prereq_reasons = node.get('prerequisite_reasons', {})
        if prereq_reasons:
            print(f"  prerequisite_reasons:")
            if isinstance(prereq_reasons, dict):
                for k, v in list(prereq_reasons.items())[:2]:
                    print(f"    {k}: {str(v)[:100]}")
            else:
                print(f"    (raw): {str(prereq_reasons)[:200]}")
        print(f"  cross_subject_prereqs: {node.get('cross_subject_prereqs', [])}")
        cross_reasons = node.get('cross_subject_reasons', {})
        if cross_reasons:
            print(f"  cross_subject_reasons:")
            if isinstance(cross_reasons, dict):
                for k, v in list(cross_reasons.items())[:2]:
                    print(f"    {k}: {str(v)[:100]}")
            else:
                print(f"    (raw): {str(cross_reasons)[:200]}")
        print(f"  source_file: {node.get('source_file')}")

# 3. Compare accounts too
print("\n\n=== CISCE ACCOUNTS NODE ===")
with driver.session() as s:
    r = s.run(
        "MATCH (n:KnowledgeNode) WHERE n.class_level = 12 AND n.subject = 'accounts' "
        "RETURN n LIMIT 1"
    )
    node = r.single()["n"]
    print(f"  node_id: {node.get('node_id')}")
    print(f"  topic: {node.get('topic')}")
    print(f"  content_snippet: {node.get('content_snippet', '')[:200]}")
    print(f"  scope_constraints: {node.get('scope_constraints', [])}")

print("\n=== CBSE ACCOUNTS NODE ===")
acc_file = output / "leac102_result.json"
if acc_file.exists():
    data = json.loads(acc_file.read_text(encoding="utf-8"))
    nodes = data["results"][0].get("nodes", [])
    if nodes:
        node = nodes[1]  # second node (first is root)
        print(f"  node_id: {node.get('node_id')}")
        print(f"  topic: {node.get('topic')}")
        print(f"  content_snippet: {node.get('content_snippet', '')[:200]}")
        print(f"  scope_constraints: {node.get('scope_constraints', [])}")

driver.close()
