"""Check English node properties in Neo4j."""
from neo4j import GraphDatabase
driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))
with driver.session() as session:
    # Get all properties of one English node
    result = session.run("MATCH (n:KnowledgeNode {node_id: 'c10_eng_126'}) RETURN properties(n) as props")
    r = result.single()
    if r:
        props = r["props"]
        print("Properties of c10_eng_126:")
        for k, v in sorted(props.items()):
            val_str = str(v)[:80]
            print(f"  {k}: {val_str}")

    # Check a working subject node for comparison
    print()
    result2 = session.run("MATCH (n:KnowledgeNode {node_id: 'c10_math_001'}) RETURN properties(n) as props")
    r2 = result2.single()
    if r2:
        props2 = r2["props"]
        print("Properties of c10_math_001 (working):")
        for k, v in sorted(props2.items()):
            val_str = str(v)[:80]
            print(f"  {k}: {val_str}")

    # Check how many nodes have class_level vs class
    print()
    result3 = session.run("MATCH (n:KnowledgeNode) RETURN count(n.class_level) as has_class_level, count(n.class) as has_class, count(n) as total")
    r3 = result3.single()
    print(f"Nodes with class_level: {r3['has_class_level']}")
    print(f"Nodes with class: {r3['has_class']}")
    print(f"Total nodes: {r3['total']}")

driver.close()
