"""Clean up English nodes in Neo4j — remove parent nodes that have sub-nodes.

Existing subjects (maths, physics, etc.) use flat atomic nodes only.
English was loaded with both parent nodes (c10_eng_101) AND sub-nodes (c10_eng_101_01).
This removes the parent nodes, keeping only the leaf sub-nodes.

Also removes non-curriculum nodes that slipped through filtering.
"""
import json
import re
from neo4j import GraphDatabase

NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "dream_neo4j_2024"

with open(r"D:\platform\backend\_english_full_inventory.json", encoding="utf-8") as f:
    all_nodes = json.load(f)

# Build set of all English node_ids
all_ids = {n["node_id"] for n in all_nodes}

# Find parent nodes — those that have children with _NN suffix
# e.g. c10_eng_101 is a parent if c10_eng_101_01, c10_eng_101_02 exist
parents = set()
for nid in all_ids:
    # Check if any other node_id starts with this + _NN
    pattern = re.escape(nid) + r'_\d{2}$'
    for other in all_ids:
        if re.match(pattern, other) and other != nid:
            parents.add(nid)
            break

print(f"Total English node_ids in inventory: {len(all_ids)}")
print(f"Parent nodes (have sub-node children): {len(parents)}")
print(f"Leaf nodes (no children): {len(all_ids) - len(parents)}")

# Show some parents
print("\nSample parent nodes to remove:")
for p in sorted(parents)[:15]:
    children = [n for n in all_ids if n.startswith(p + "_") and re.match(re.escape(p) + r'_\d{2}$', n)]
    print(f"  {p} → {len(children)} children: {children[:3]}...")

# Connect to Neo4j and remove parent nodes
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# First check what's actually in Neo4j
with driver.session() as session:
    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' RETURN n.node_id as nid"
    )
    neo4j_ids = {r["nid"] for r in result}

print(f"\nEnglish nodes currently in Neo4j: {len(neo4j_ids)}")

# Parents to delete from Neo4j
parents_in_neo4j = parents & neo4j_ids
print(f"Parent nodes to remove from Neo4j: {len(parents_in_neo4j)}")

# Also find non-curriculum nodes that slipped through (not in clean inventory)
# These are nodes like c9_eng_006_enrichment, c10_eng_007_diagnostic_full, etc.
NON_CURRICULUM_PATTERNS = [
    r'_enrichment$',
    r'_enrichment_marker$',
    r'_diagnostic_full$',
    r'_markers$',
    r'_quickref$',
    r'_worksheet$',
    r'_practice$',
    r'_support$',
    r'_guide$',
    r'_log$',
]

non_curriculum = set()
for nid in neo4j_ids:
    for pat in NON_CURRICULUM_PATTERNS:
        if re.search(pat, nid, re.IGNORECASE):
            non_curriculum.add(nid)
            break

print(f"Non-curriculum nodes to remove: {len(non_curriculum)}")
for n in sorted(non_curriculum)[:10]:
    print(f"  {n}")

# Remove parent nodes and non-curriculum nodes
to_remove = parents_in_neo4j | non_curriculum
print(f"\nTotal nodes to remove: {len(to_remove)}")

if to_remove:
    # Delete edges first, then nodes
    with driver.session() as session:
        result = session.run(
            """
            MATCH (n:KnowledgeNode)
            WHERE n.node_id IN $ids
            DETACH DELETE n
            RETURN count(*) as deleted
            """,
            ids=list(to_remove),
        )
        deleted = result.single()["deleted"]
        print(f"Deleted {deleted} nodes (with their edges)")

# Reconnect REQUIRES edges — some sub-nodes had prereqs pointing to parent nodes
# which no longer exist. Those edges are already gone (DETACH DELETE removed them).
# But we should check if sub-nodes have prereqs to other sub-nodes that exist.
print("\nChecking remaining English edges...")
with driver.session() as session:
    result = session.run(
        """
        MATCH (n:KnowledgeNode)-[r:REQUIRES]->(m:KnowledgeNode)
        WHERE n.subject CONTAINS 'English' AND m.subject CONTAINS 'English'
        RETURN count(*) as edges
        """
    )
    print(f"  English REQUIRES edges: {result.single()['edges']}")

# Final count
print("\n=== FINAL English node count ===")
with driver.session() as session:
    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' "
        "RETURN n.subject as subj, count(*) as cnt ORDER BY subj"
    )
    total = 0
    for r in result:
        print(f"  {r['subj']}: {r['cnt']}")
        total += r["cnt"]
    print(f"  TOTAL: {total}")

    result2 = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' "
        "RETURN n.class_level as cls, count(*) as cnt ORDER BY cls"
    )
    print("\n  By class:")
    for r in result2:
        print(f"    Class {r['cls']}: {r['cnt']}")

    result3 = session.run("MATCH (n:KnowledgeNode) RETURN count(*) as total")
    print(f"\n  Total KnowledgeNodes in graph: {result3.single()['total']}")

driver.close()
print("\nDone.")
