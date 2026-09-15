"""Load ALL cross-subject edges into Neo4j from both sources:
1. Mapped CROSS_SUBJECT_LINKS (from neo4j_cross_subject.py)
2. Enrichment prereq_ids/depth_prereq_ids/on_failure review_node_ids
"""
import asyncio
import json
from sqlalchemy import select
from neo4j import AsyncGraphDatabase
from backend.database import async_session
from backend.models.enrichment import EnrichmentContent
from backend.services.cross_subject_reasons import CROSS_SUBJECT_REASONS

NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "dream_neo4j_2024"

SUBJ_MAP = {"phy": "physics", "chem": "chemistry", "bio": "biology", "math": "maths",
            "physics": "physics", "chemistry": "chemistry", "biology": "biology", "maths": "maths"}


def get_subject_code(node_id):
    parts = node_id.split("_")
    return parts[1] if len(parts) >= 2 else ""


async def load_all():
    # 1. Load from mapped CROSS_SUBJECT_LINKS
    with open("_map_cross_subject_results.json") as f:
        data = json.load(f)
    mapped_links = data.get("mapped_links", [])

    # 2. Load from enrichment database
    enrichment_pairs = set()
    async with async_session() as db:
        r = await db.execute(select(EnrichmentContent))
        all_nodes = {e.node_id: e for e in r.scalars()}

        for nid, e in all_nodes.items():
            node_subj = get_subject_code(nid)
            if not node_subj:
                continue
            for pid in (e.prereq_ids or []):
                prereq_subj = get_subject_code(pid)
                if prereq_subj and SUBJ_MAP.get(prereq_subj) != SUBJ_MAP.get(node_subj):
                    enrichment_pairs.add((nid, pid))
            for pid in (e.depth_prereq_ids or []):
                prereq_subj = get_subject_code(pid)
                if prereq_subj and SUBJ_MAP.get(prereq_subj) != SUBJ_MAP.get(node_subj):
                    enrichment_pairs.add((nid, pid))
            for of in (e.on_failure or []):
                for rid in (of.get("review_node_ids") or []):
                    prereq_subj = get_subject_code(rid)
                    if prereq_subj and SUBJ_MAP.get(prereq_subj) != SUBJ_MAP.get(node_subj):
                        enrichment_pairs.add((nid, rid))

    print(f"Enrichment cross-subject pairs: {len(enrichment_pairs)}")
    print(f"Mapped links: {len(mapped_links)}")

    # Combine all pairs with reasons
    all_pairs = {}  # (target, prereq) -> reason

    # From mapped links
    for link in mapped_links:
        key = (link["target"], link["prereq"])
        all_pairs[key] = link["reason"]

    # From enrichment pairs (use cross_subject_reasons.py for reasons)
    for target, prereq in enrichment_pairs:
        if (target, prereq) not in all_pairs:
            reason = CROSS_SUBJECT_REASONS.get((target, prereq), "")
            all_pairs[(target, prereq)] = reason

    print(f"Total unique cross-subject pairs to load: {len(all_pairs)}")

    # Load into Neo4j
    driver = AsyncGraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    created = 0
    missing = 0

    try:
        async with driver.session() as session:
            for (target, prereq), reason in all_pairs.items():
                # Delete existing edge first
                await session.run(
                    "MATCH (n:KnowledgeNode {node_id: $t})-[r:REQUIRES]->(m:KnowledgeNode {node_id: $p}) DELETE r",
                    t=target, p=prereq,
                )
                # Create with properties
                result = await session.run(
                    """
                    MATCH (n:KnowledgeNode {node_id: $target})
                    MATCH (m:KnowledgeNode {node_id: $prereq})
                    CREATE (n)-[r:REQUIRES {reason: $reason, cross_subject: true}]->(m)
                    RETURN r
                    """,
                    target=target, prereq=prereq, reason=reason,
                )
                record = await result.single()
                if record:
                    created += 1
                else:
                    missing += 1
                    print(f"  WARNING: Could not link {target} -> {prereq}")

        print(f"\n  Created: {created} cross-subject edges")
        print(f"  Missing: {missing} edges")

        # Verify
        async with driver.session() as session:
            result = await session.run(
                "MATCH (n)-[r:REQUIRES]->(m) WHERE r.cross_subject = true RETURN count(r) AS total"
            )
            records = await result.data()
            total = records[0]["total"] if records else 0
            print(f"  Total cross-subject edges in Neo4j: {total}")

            # Check c12_phy_135
            result2 = await session.run(
                "MATCH (n:KnowledgeNode {node_id: $nid})-[r:REQUIRES]->(m) WHERE r.cross_subject = true RETURN m.node_id AS prereq, r.reason AS reason",
                nid="c12_phy_135",
            )
            records2 = await result2.data()
            print(f"\n  c12_phy_135 cross-subject edges:")
            for r in records2:
                reason = r["reason"][:60] if r["reason"] else None
                print(f"    -> {r['prereq']} reason={reason}")

    finally:
        await driver.close()


if __name__ == "__main__":
    asyncio.run(load_all())
