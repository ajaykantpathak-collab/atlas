"""Load mapped cross-subject edges into Neo4j using enrichment node IDs."""
import asyncio
import json
from neo4j import AsyncGraphDatabase
import os

NEO4J_URI = os.environ.get("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.environ.get("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.environ.get("NEO4J_PASSWORD", "dream_neo4j_2024")


async def load_edges():
    with open("_map_cross_subject_results.json") as f:
        data = json.load(f)

    mapped_links = data.get("mapped_links", [])
    print(f"Total mapped links to load: {len(mapped_links)}")

    # Deduplicate by (target, prereq)
    seen = set()
    unique_links = []
    for link in mapped_links:
        key = (link["target"], link["prereq"])
        if key not in seen:
            seen.add(key)
            unique_links.append(link)

    print(f"Unique links after dedup: {len(unique_links)}")

    driver = AsyncGraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    created = 0
    missing = 0

    try:
        async with driver.session() as session:
            for link in unique_links:
                target = link["target"]
                prereq = link["prereq"]
                reason = link["reason"]
                result = await session.run(
                    """
                    MATCH (n:KnowledgeNode {node_id: $target})
                    MATCH (m:KnowledgeNode {node_id: $prereq})
                    MERGE (n)-[r:REQUIRES]->(m)
                    SET r.reason = $reason, r.cross_subject = true
                    RETURN count(r) AS created
                    """,
                    target=target, prereq=prereq, reason=reason,
                )
                record = await result.single()
                if record and record["created"] > 0:
                    created += 1
                else:
                    missing += 1
                    print(f"  WARNING: Could not link {target} -> {prereq}")

        print(f"\n  Created: {created} cross-subject edges")
        print(f"  Missing: {missing} edges (node not found)")
    finally:
        await driver.close()


if __name__ == "__main__":
    asyncio.run(load_edges())
