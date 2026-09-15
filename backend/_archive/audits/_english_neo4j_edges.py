"""Create REQUIRES and UNLOCKS edges for English nodes."""
import json
from pathlib import Path
from neo4j import GraphDatabase

NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "dream_neo4j_2024"
INVENTORY_PATH = Path(r"D:\platform\backend\_english_full_inventory.json")

with open(INVENTORY_PATH, encoding="utf-8") as f:
    nodes = json.load(f)

driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# Create REQUIRES edges from prerequisites
print("Creating REQUIRES edges...")
edges_created = 0
edges_missing = 0
for n in nodes:
    for prereq in n.get("prerequisites", []):
        prereq = prereq.strip()
        if prereq and prereq.startswith("c"):
            with driver.session() as session:
                result = session.run(
                    """
                    MATCH (a:KnowledgeNode {node_id: $from_id})
                    MATCH (b:KnowledgeNode {node_id: $to_id})
                    MERGE (a)-[:REQUIRES]->(b)
                    RETURN count(*) as created
                    """,
                    from_id=n["node_id"], to_id=prereq,
                )
                c = result.single()["created"]
                edges_created += c
                if c == 0:
                    edges_missing += 1

print(f"  Created {edges_created} REQUIRES edges ({edges_missing} prereq targets missing)")

# Create UNLOCKS edges (reverse of REQUIRES)
print("\nCreating UNLOCKS edges...")
with driver.session() as session:
    result = session.run(
        """
        MATCH (a:KnowledgeNode)-[:REQUIRES]->(b:KnowledgeNode)
        WHERE NOT EXISTS((b)-[:UNLOCKS]->(a))
        MERGE (b)-[:UNLOCKS]->(a)
        RETURN count(*) as created
        """
    )
    print(f"  Created {result.single()['created']} UNLOCKS edges")

# Final stats
print("\n=== FINAL Neo4j STATS ===")
with driver.session() as session:
    result = session.run("MATCH (n:KnowledgeNode) RETURN count(n) as count")
    print(f"  Total KnowledgeNode: {result.single()['count']}")

    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' RETURN count(n) as count"
    )
    print(f"  English nodes: {result.single()['count']}")

    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' "
        "RETURN n.subject as subj, count(*) as count ORDER BY subj"
    )
    for r in result:
        print(f"    {r['subj']}: {r['count']}")

    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' "
        "RETURN n.class_level as cls, count(*) as count ORDER BY cls"
    )
    for r in result:
        print(f"    Class {r['cls']}: {r['count']}")

driver.close()
print("\nDone.")
