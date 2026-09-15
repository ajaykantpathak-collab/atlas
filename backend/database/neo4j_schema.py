"""Neo4j schema setup — constraints, indexes, and initial structure.

Run this once to prepare the Neo4j database for knowledge graph loading.
Usage:
    python -m backend.database.neo4j_schema
"""

from neo4j import AsyncGraphDatabase

# Read settings directly to avoid importing backend.database (which pulls SQLAlchemy)
import os
NEO4J_URI = os.environ.get("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.environ.get("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.environ.get("NEO4J_PASSWORD", "dream_neo4j_2024")

SCHEMA_QUERIES = [
    # Unique constraints (also serve as indexes)
    "CREATE CONSTRAINT node_id_unique IF NOT EXISTS "
    "FOR (n:KnowledgeNode) REQUIRE n.node_id IS UNIQUE",

    "CREATE CONSTRAINT subject_id_unique IF NOT EXISTS "
    "FOR (s:Subject) REQUIRE s.subject_key IS UNIQUE",

    "CREATE CONSTRAINT chapter_id_unique IF NOT EXISTS "
    "FOR (c:Chapter) REQUIRE c.chapter_key IS UNIQUE",

    # Indexes for fast lookups
    "CREATE INDEX node_board IF NOT EXISTS FOR (n:KnowledgeNode) ON (n.board)",
    "CREATE INDEX node_class IF NOT EXISTS FOR (n:KnowledgeNode) ON (n.class_level)",
    "CREATE INDEX node_subject IF NOT EXISTS FOR (n:KnowledgeNode) ON (n.subject)",
    "CREATE INDEX node_chapter IF NOT EXISTS FOR (n:KnowledgeNode) ON (n.chapter_name)",
    "CREATE INDEX node_root IF NOT EXISTS FOR (n:KnowledgeNode) ON (n.is_root)",
    "CREATE INDEX node_difficulty IF NOT EXISTS FOR (n:KnowledgeNode) ON (n.difficulty)",

    # Composite index for board + class + subject
    "CREATE INDEX node_board_class_subject IF NOT EXISTS "
    "FOR (n:KnowledgeNode) ON (n.board, n.class_level, n.subject)",

    # Full-text index for searching node topics and content
    "CREATE FULLTEXT INDEX node_search IF NOT EXISTS "
    "FOR (n:KnowledgeNode) ON EACH [n.topic, n.content_snippet, n.chapter_name]",
]


async def setup_schema():
    """Create all constraints and indexes in Neo4j."""
    driver = AsyncGraphDatabase.driver(
        NEO4J_URI,
        auth=(NEO4J_USER, NEO4J_PASSWORD),
    )
    try:
        async with driver.session() as session:
            for query in SCHEMA_QUERIES:
                await session.run(query)
                print(f"  OK: {query.split('CREATE')[1].split(' IF')[0].strip()}")
        print("\nNeo4j schema created successfully.")
    finally:
        await driver.close()


if __name__ == "__main__":
    import asyncio
    asyncio.run(setup_schema())
