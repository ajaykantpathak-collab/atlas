"""Check if existing subjects in Neo4j have parent-child hierarchies or flat nodes."""
from neo4j import GraphDatabase
import re

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

with driver.session() as session:
    # Check maths nodes — do they have _01 _02 sub-node patterns?
    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.subject = 'maths' AND n.class_level = 10 "
        "RETURN n.node_id as nid ORDER BY nid LIMIT 30"
    )
    print("=== Maths class 10 node IDs (sample) ===")
    for r in result:
        print(f"  {r['nid']}")

    # Check if any existing nodes have sub-node patterns (_NN suffix)
    result2 = session.run(
        """
        MATCH (n:KnowledgeNode)
        WHERE n.subject IN ['maths','physics','chemistry','biology','computer_science']
        AND n.node_id =~ '.*_\\d{2}$'
        RETURN n.subject as subj, count(*) as cnt
        ORDER BY subj
        """
    )
    print("\n=== Existing nodes with _NN sub-node suffix ===")
    for r in result2:
        print(f"  {r['subj']}: {r['cnt']}")

    # Check total nodes per subject (non-English)
    result3 = session.run(
        """
        MATCH (n:KnowledgeNode)
        WHERE NOT n.subject CONTAINS 'English'
        RETURN n.subject as subj, count(*) as cnt
        ORDER BY cnt DESC
        """
    )
    print("\n=== Non-English nodes per subject ===")
    for r in result3:
        print(f"  {r['subj']}: {r['cnt']}")

    # Check English nodes — how many are parent vs sub-node
    result4 = session.run(
        """
        MATCH (n:KnowledgeNode)
        WHERE n.subject CONTAINS 'English'
        WITH n.node_id as nid,
             CASE WHEN nid =~ '.*_\\d{2}$' THEN 'sub_node'
                  ELSE 'parent_node'
             END as node_type
        RETURN node_type, count(*) as cnt
        """
    )
    print("\n=== English nodes: parent vs sub-node ===")
    for r in result4:
        print(f"  {r['node_type']}: {r['cnt']}")

driver.close()
