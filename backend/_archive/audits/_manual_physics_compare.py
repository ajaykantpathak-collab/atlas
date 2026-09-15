"""Manual comparison: read CBSE and CISCE physics nodes for class 11-12 side by side."""
import json
from pathlib import Path
from neo4j import GraphDatabase

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")
NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "dream_neo4j_2024"

driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

for grade in [11, 12]:
    print(f"\n{'='*80}")
    print(f"CLASS {grade} PHYSICS")
    print(f"{'='*80}")

    # Get CISCE physics nodes
    with driver.session() as s:
        result = s.run(
            "MATCH (n:KnowledgeNode) WHERE n.class_level = $cls AND n.subject = 'physics' "
            "RETURN n.node_id as nid, n.topic as topic, n.content_snippet as snippet "
            "ORDER BY n.node_id",
            cls=grade
        )
        cisce = [{"node_id": r["nid"], "topic": r["topic"], "snippet": r["snippet"] or ""} for r in result]

    # Get CBSE physics nodes
    cbse = []
    for f in sorted(OUTPUT_DIR.glob("*_result.json")):
        data = json.loads(f.read_text(encoding="utf-8"))
        if data.get("grade") != grade or data.get("subject") != "physics":
            continue
        for chunk in data.get("results", []):
            if "_error" in chunk:
                continue
            for node in chunk.get("nodes", []):
                cbse.append({"node_id": node["node_id"], "topic": node["topic"], 
                            "snippet": node.get("content_snippet", "")})

    print(f"\nCISCE: {len(cisce)} nodes | CBSE: {len(cbse)} nodes")
    print(f"\n--- CISCE NODES ---")
    for n in cisce:
        print(f"  {n['node_id']}: {n['topic']}")
    
    print(f"\n--- CBSE NODES ---")
    for n in cbse:
        print(f"  {n['node_id']}: {n['topic']}")

driver.close()
