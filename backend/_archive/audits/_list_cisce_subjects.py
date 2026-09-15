"""List all CISCE subjects and their classes."""
from neo4j import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))
with driver.session() as s:
    result = s.run("MATCH (n:KnowledgeNode) RETURN DISTINCT n.subject as subj, collect(DISTINCT n.class_level) as classes ORDER BY subj")
    for r in result:
        classes = sorted(r["classes"])
        print(f"  {r['subj']}: classes {classes}")
driver.close()
