"""Manually match CBSE physics class 12 nodes to CISCE physics class 12 nodes concept by concept."""
import json
from pathlib import Path
from neo4j import GraphDatabase

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")
driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

# Get CISCE nodes
with driver.session() as s:
    result = s.run(
        "MATCH (n:KnowledgeNode) WHERE n.class_level = 12 AND n.subject = 'physics' "
        "RETURN n.node_id as nid, n.topic as topic ORDER BY n.node_id"
    )
    cisce = [{"node_id": r["nid"], "topic": r["topic"]} for r in result]

# Get CBSE nodes
cbse = []
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    if data.get("grade") != 12 or data.get("subject") != "physics":
        continue
    for chunk in data.get("results", []):
        if "_error" in chunk:
            continue
        for node in chunk.get("nodes", []):
            cbse.append({"node_id": node["node_id"], "topic": node["topic"]})

print(f"CISCE: {len(cisce)} nodes | CBSE: {len(cbse)} nodes\n")

# Print CISCE with index
print("=== CISCE NODES ===")
for i, n in enumerate(cisce):
    print(f"{i+1:3d}. {n['node_id']}: {n['topic']}")

print(f"\n=== CBSE NODES ===")
for i, n in enumerate(cbse):
    print(f"{i+1:3d}. {n['node_id']}: {n['topic']}")

driver.close()
