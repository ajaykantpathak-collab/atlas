"""Check English atomic graph nodes."""
import json

for fname in ["English Language_graph.json", "English Literature_graph.json"]:
    path = f"D:\\node_generator\\atomic_graph\\cisce_enriched\\{fname}"
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    print(f"\n{fname}: {len(data)} nodes")
    for n in data:
        nid = n.get("node_id", "?")
        cls = n.get("class", "?")
        subj = n.get("subject", "?")
        topic = n.get("topic", "")[:80]
        print(f"  {nid}: class={cls}, subject={subj}, topic={topic}")

# Now check what's in Neo4j
from neo4j import GraphDatabase
driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))
with driver.session() as session:
    result = session.run("MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' OR n.subject CONTAINS 'english' RETURN n.node_id as nid, n.subject as subj, n.class as cls")
    records = list(result)
    print(f"\nNeo4j English nodes: {len(records)}")
    for r in records:
        print(f"  {r['nid']}: subject={r['subj']}, class={r['cls']}")

    # Also check by node_id pattern
    result2 = session.run("MATCH (n:KnowledgeNode) WHERE n.node_id STARTS WITH 'c10_eng' OR n.node_id STARTS WITH 'c12_eng' OR n.node_id STARTS WITH 'c1_eng' OR n.node_id STARTS WITH 'c9_eng' RETURN n.node_id as nid, n.subject as subj")
    records2 = list(result2)
    print(f"\nNeo4j eng* nodes: {len(records2)}")
    for r in records2:
        print(f"  {r['nid']}: subject={r['subj']}")

driver.close()
