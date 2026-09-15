"""Verify English nodes are legitimate — show sample nodes per class per subject."""
from neo4j import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

with driver.session() as session:
    # Show sample nodes per class per subject
    result = session.run(
        """
        MATCH (n:KnowledgeNode)
        WHERE n.subject CONTAINS 'English'
        RETURN n.class_level as cls, n.subject as subj, collect(n.node_id)[..5] as sample, count(*) as cnt
        ORDER BY cls, subj
        """
    )
    print("=== English nodes per class per subject ===")
    print(f"{'Class':<6} {'Subject':<22} {'Count':<6} {'Sample node_ids'}")
    print("-" * 90)
    for r in result:
        samples = ", ".join(r["sample"][:3])
        print(f"  C{r['cls']:<4} {r['subj']:<22} {r['cnt']:<6} {samples}")

    # Compare with other subjects
    print("\n=== Comparison with other subjects ===")
    result2 = session.run(
        """
        MATCH (n:KnowledgeNode)
        WHERE NOT n.subject CONTAINS 'English'
        RETURN n.subject as subj, count(*) as cnt
        ORDER BY cnt DESC
        """
    )
    for r in result2:
        print(f"  {r['subj']:<25} {r['cnt']}")

    # Total
    result3 = session.run("MATCH (n:KnowledgeNode) RETURN count(*) as total")
    print(f"\n  TOTAL graph: {result3.single()['total']}")

driver.close()
