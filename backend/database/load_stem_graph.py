"""Load CISCE STEM graph JSON into Neo4j.

Reads from D:/node_generator/atomic_graph/cisce_stem/{subject}_graph.json
Loads nodes with REQUIRES (prerequisite) and UNLOCKS (forward) edges.

Usage:
    python load_stem_graph.py                    # Load all 4 subjects
    python load_stem_graph.py --subject=physics  # Load one subject
    python load_stem_graph.py --dry-run          # Just count, don't write
"""

import argparse
import asyncio
import json
import os
from pathlib import Path
from neo4j import AsyncGraphDatabase

NEO4J_URI = os.environ.get("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.environ.get("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.environ.get("NEO4J_PASSWORD", "dream_neo4j_2024")

GRAPH_DIR = Path("D:/node_generator/atomic_graph/cisce_stem")

SUBJECT_FILES = {
    "physics": "physics_graph.json",
    "chem": "chem_graph.json",
    "bio": "bio_graph.json",
    "maths": "maths_graph.json",
}


async def setup_schema(driver):
    """Create constraints and indexes."""
    queries = [
        "CREATE CONSTRAINT node_id_unique IF NOT EXISTS FOR (n:KnowledgeNode) REQUIRE n.node_id IS UNIQUE",
        "CREATE INDEX node_board IF NOT EXISTS FOR (n:KnowledgeNode) ON (n.board)",
        "CREATE INDEX node_class IF NOT EXISTS FOR (n:KnowledgeNode) ON (n.class_level)",
        "CREATE INDEX node_subject IF NOT EXISTS FOR (n:KnowledgeNode) ON (n.subject)",
        "CREATE INDEX node_root IF NOT EXISTS FOR (n:KnowledgeNode) ON (n.is_root)",
        "CREATE INDEX node_board_class_subject IF NOT EXISTS FOR (n:KnowledgeNode) ON (n.board, n.class_level, n.subject)",
        "CREATE FULLTEXT INDEX node_search IF NOT EXISTS FOR (n:KnowledgeNode) ON EACH [n.topic, n.content_snippet]",
    ]
    async with driver.session() as session:
        for q in queries:
            await session.run(q)
    print("  Schema ready.")


async def load_nodes_batch(driver, nodes, batch_size=500):
    """Load nodes into Neo4j in batches."""
    total = len(nodes)
    loaded = 0
    for i in range(0, total, batch_size):
        batch = nodes[i:i + batch_size]
        params = []
        for node in batch:
            params.append({
                "node_id": node["node_id"],
                "topic": node.get("topic", ""),
                "chapter": node.get("chapter", ""),
                "chapter_name": node.get("chapter_name", ""),
                "class_level": node.get("class", 0),
                "subject": node.get("subject", ""),
                "board": node.get("board", "CISCE"),
                "content_snippet": node.get("content_snippet", ""),
                "prerequisite_node_ids": node.get("prerequisite_node_ids", []),
                "depth_progression_prereqs": node.get("depth_progression_prereqs", []),
                "forward_node_ids": node.get("forward_node_ids", []),
                "is_root": node.get("is_root", False),
            })
        async with driver.session() as session:
            await session.run(
                """
                UNWIND $nodes AS node
                MERGE (n:KnowledgeNode {node_id: node.node_id})
                SET n.topic = node.topic,
                    n.chapter = node.chapter,
                    n.chapter_name = node.chapter_name,
                    n.class_level = node.class_level,
                    n.subject = node.subject,
                    n.board = node.board,
                    n.content_snippet = node.content_snippet,
                    n.prerequisite_node_ids = node.prerequisite_node_ids,
                    n.depth_progression_prereqs = node.depth_progression_prereqs,
                    n.forward_node_ids = node.forward_node_ids,
                    n.is_root = node.is_root
                """,
                nodes=params,
            )
        loaded += len(batch)
        print(f"    Loaded {loaded}/{total} nodes...")
    return loaded


async def create_edges(driver, nodes, batch_size=500):
    """Create REQUIRES edges from prerequisite_node_ids and depth_progression_prereqs."""
    requires_edges = []
    for node in nodes:
        nid = node["node_id"]
        for prereq in node.get("prerequisite_node_ids", []):
            requires_edges.append({"source": nid, "target": prereq, "edge_type": "PREREQ"})
        for prereq in node.get("depth_progression_prereqs", []):
            requires_edges.append({"source": nid, "target": prereq, "edge_type": "DEPTH_PREREQ"})

    print(f"    Creating {len(requires_edges)} REQUIRES edges...")
    for i in range(0, len(requires_edges), batch_size):
        batch = requires_edges[i:i + batch_size]
        async with driver.session() as session:
            await session.run(
                """
                UNWIND $edges AS edge
                MATCH (n:KnowledgeNode {node_id: edge.source})
                MATCH (m:KnowledgeNode {node_id: edge.target})
                MERGE (n)-[r:REQUIRES]->(m)
                SET r.edge_type = edge.edge_type
                """,
                edges=batch,
            )
    return len(requires_edges)


async def verify_graph(driver):
    """Verify loaded graph."""
    async with driver.session() as session:
        node_count = (await (await session.run("MATCH (n:KnowledgeNode) RETURN count(n) AS c")).single())["c"]
        edge_count = (await (await session.run("MATCH ()-[r:REQUIRES]->() RETURN count(r) AS c")).single())["c"]
        by_subject = [(r["subject"], r["c"]) async for r in await session.run(
            "MATCH (n:KnowledgeNode) RETURN n.subject AS subject, count(n) AS c ORDER BY subject"
        )]
        by_class = [(r["cls"], r["c"]) async for r in await session.run(
            "MATCH (n:KnowledgeNode) RETURN n.class_level AS cls, count(n) AS c ORDER BY cls"
        )]
        roots = (await (await session.run("MATCH (n:KnowledgeNode {is_root: true}) RETURN count(n) AS c")).single())["c"]
    return {"nodes": node_count, "edges": edge_count, "by_subject": by_subject, "by_class": by_class, "roots": roots}


async def load_subject(driver, subject_key, dry_run=False):
    """Load a single subject into Neo4j."""
    filename = SUBJECT_FILES[subject_key]
    filepath = GRAPH_DIR / filename

    print(f"\n{'='*60}")
    print(f"Loading {subject_key} from {filepath}")
    print(f"{'='*60}")

    if not filepath.exists():
        print(f"  ERROR: File not found: {filepath}")
        print(f"  Run parse_enrichment_graph.py --subject={subject_key} first.")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        nodes = json.load(f)
    print(f"  Nodes in file: {len(nodes)}")

    total_prereqs = sum(len(n.get("prerequisite_node_ids", [])) for n in nodes)
    total_depth = sum(len(n.get("depth_progression_prereqs", [])) for n in nodes)
    print(f"  PREREQ edges: {total_prereqs}")
    print(f"  DEPTH_PREREQ edges: {total_depth}")

    if dry_run:
        print("  [DRY RUN] Skipping Neo4j operations.")
        return

    print(f"\n  Loading nodes...")
    loaded = await load_nodes_batch(driver, nodes)
    print(f"  Loaded {loaded} nodes.")

    print(f"\n  Creating edges...")
    edge_count = await create_edges(driver, nodes)
    print(f"  Created {edge_count} REQUIRES edges.")


async def main(subjects, dry_run=False):
    print("=" * 60)
    print("CISCE STEM Graph Loader")
    print("=" * 60)

    if dry_run:
        for subj in subjects:
            await load_subject(None, subj, dry_run=True)
        return

    print("\nConnecting to Neo4j...")
    driver = AsyncGraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    try:
        print("\nSetting up schema...")
        await setup_schema(driver)

        for subj in subjects:
            await load_subject(driver, subj)

        print(f"\n{'='*60}")
        print("Verification")
        print(f"{'='*60}")
        stats = await verify_graph(driver)
        print(f"  Total nodes: {stats['nodes']}")
        print(f"  Total REQUIRES edges: {stats['edges']}")
        print(f"  Root nodes: {stats['roots']}")
        print(f"\n  By subject:")
        for subj, count in stats["by_subject"]:
            print(f"    {subj}: {count}")
        print(f"\n  By class:")
        for cls, count in stats["by_class"]:
            print(f"    Class {cls}: {count}")

        print(f"\n{'='*60}")
        print("Graph loaded successfully!")
        print(f"{'='*60}")
    finally:
        await driver.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Load CISCE STEM graph into Neo4j")
    parser.add_argument("--subject", choices=["physics", "chem", "bio", "maths", "all"],
                        default="all", help="Subject to load")
    parser.add_argument("--dry-run", action="store_true", help="Don't write to Neo4j")
    args = parser.parse_args()

    if args.subject == "all":
        subjects = ["physics", "chem", "bio", "maths"]
    else:
        subjects = [args.subject]

    asyncio.run(main(subjects, dry_run=args.dry_run))
