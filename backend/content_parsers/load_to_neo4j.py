"""Neo4j edge loader — adds DEPTH_PREREQ edges from enrichment on_failure data.

The existing Neo4j graph already has 4,682 KnowledgeNode nodes and 8,521 REQUIRES edges.
This script adds DEPTH_PREREQ edges from the on_failure remediation data in enrichment files.

DEPTH_PREREQ edges represent: "If a student fails this node's diagnostic question,
they should review the prerequisite node first." These are deeper remediation links
than the regular REQUIRES (direct prerequisite) edges.

SAFETY: Only adds edges. Never deletes or modifies existing nodes/edges.
        Uses MERGE to be idempotent.
"""

import json
import sys
from pathlib import Path
from neo4j import GraphDatabase
from collections import defaultdict

OUTPUT_DIR = Path(r"D:\platform\parsed_output")
NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "dream_neo4j_2024"


def extract_edges():
    """Extract DEPTH_PREREQ edges from enrichment on_failure data."""
    enrichment_file = OUTPUT_DIR / "enrichment.jsonl"
    edges = set()  # (from_node, to_node, edge_type) — deduplicated

    with open(enrichment_file, encoding="utf-8-sig") as f:
        for line in f:
            r = json.loads(line)
            node_id = r.get("node_id")
            on_failure = r.get("on_failure")

            if not node_id or not on_failure or not isinstance(on_failure, list):
                continue

            for item in on_failure:
                if not isinstance(item, dict):
                    continue
                review_node_id = item.get("review_node_id")
                prereq_type = item.get("prereq_type", "DEPTH_PREREQ")

                if review_node_id and review_node_id.startswith("c"):
                    edges.add((node_id, review_node_id, prereq_type))

    return edges


def load_edges_to_neo4j(edges):
    """Load edges into Neo4j using MERGE (idempotent)."""
    driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

    # Group by edge type
    by_type = defaultdict(list)
    for from_node, to_node, edge_type in edges:
        by_type[edge_type].append((from_node, to_node))

    total_loaded = 0
    for edge_type, edge_list in by_type.items():
        print(f"\n  Loading {len(edge_list)} {edge_type} edges...")

        # Process in batches of 500
        batch_size = 500
        loaded = 0
        for i in range(0, len(edge_list), batch_size):
            batch = edge_list[i:i + batch_size]
            params = [{"from_node": f, "to_node": t} for f, t in batch]

            with driver.session() as session:
                # Use MERGE to be idempotent — only create if not exists
                result = session.run(
                    f"""
                    UNWIND $edges AS edge
                    MATCH (from:KnowledgeNode {{node_id: edge.from_node}})
                    MATCH (to:KnowledgeNode {{node_id: edge.to_node}})
                    MERGE (from)-[r:{edge_type}]->(to)
                    RETURN count(r) as created
                    """,
                    edges=params,
                )
                loaded += len(batch)

            if loaded % 2000 == 0 or loaded == len(edge_list):
                print(f"    Progress: {loaded}/{len(edge_list)}")

        total_loaded += loaded
        print(f"  Loaded {loaded} {edge_type} edges")

    # Also create UNLOCKS edges (reverse of REQUIRES + DEPTH_PREREQ)
    print("\n  Creating UNLOCKS edges (reverse of REQUIRES)...")
    with driver.session() as session:
        result = session.run(
            """
            MATCH (a:KnowledgeNode)-[:REQUIRES]->(b:KnowledgeNode)
            WHERE NOT EXISTS((b)-[:UNLOCKS]->(a))
            MERGE (b)-[r:UNLOCKS]->(a)
            RETURN count(r) as created
            """
        )
        unlocks_created = result.single()["created"]
        print(f"    Created {unlocks_created} UNLOCKS edges")

    driver.close()
    return total_loaded


def get_stats():
    """Get current Neo4j statistics."""
    driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    with driver.session() as session:
        result = session.run("MATCH (n:KnowledgeNode) RETURN count(n) as count")
        nodes = result.single()["count"]

        result = session.run("MATCH ()-[r]->() RETURN type(r) as type, count(r) as count ORDER BY type")
        edges = {r["type"]: r["count"] for r in result}

        result = session.run("MATCH (n:KnowledgeNode) RETURN DISTINCT n.subject as subject ORDER BY subject")
        subjects = [r["subject"] for r in result]

    driver.close()
    return {"nodes": nodes, "edges": edges, "subjects": subjects}


def main():
    print("Neo4j Edge Loader — Adding DEPTH_PREREQ edges from enrichment data")
    print("=" * 70)

    # Before stats
    print("\nBefore:")
    before = get_stats()
    print(f"  Nodes: {before['nodes']}")
    print(f"  Edges: {before['edges']}")
    print(f"  Subjects: {len(before['subjects'])}")

    # Extract edges
    print("\nExtracting DEPTH_PREREQ edges from enrichment on_failure data...")
    edges = extract_edges()
    print(f"  Found {len(edges)} unique edges")

    # Load to Neo4j
    print("\nLoading edges to Neo4j...")
    total = load_edges_to_neo4j(edges)
    print(f"\nTotal edges processed: {total}")

    # After stats
    print("\nAfter:")
    after = get_stats()
    print(f"  Nodes: {after['nodes']}")
    print(f"  Edges: {after['edges']}")
    print(f"  Subjects: {len(after['subjects'])}")

    # Deltas
    print("\nDeltas:")
    print(f"  Nodes: {after['nodes'] - before['nodes']}")
    for edge_type in set(list(before["edges"].keys()) + list(after["edges"].keys())):
        before_count = before["edges"].get(edge_type, 0)
        after_count = after["edges"].get(edge_type, 0)
        delta = after_count - before_count
        if delta != 0:
            print(f"  {edge_type}: +{delta}")

    print("\nDone.")


if __name__ == "__main__":
    main()
