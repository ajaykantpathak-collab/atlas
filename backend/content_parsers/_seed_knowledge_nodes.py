"""Populate knowledge_nodes table from enrichment_content (4,677 nodes)."""
import sys, os, json
sys.path.insert(0, r'D:\platform')
sys.path.insert(0, r'D:\platform\backend_fastapi')
from sqlalchemy import create_engine, text

url = 'postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app'
engine = create_engine(url)

with engine.begin() as conn:
    # Check current count
    result = conn.execute(text("SELECT COUNT(*) FROM knowledge_nodes"))
    current = result.scalar()
    print(f"Current knowledge_nodes: {current}")

    if current >= 4000:
        print("Already populated. Skipping.")
        sys.exit(0)

    # Insert from enrichment_content
    # Map: node_id->node_id, title->label, definition->description,
    #   subject->subject, class_level->class_level, chapter->chapter,
    #   prereq_ids->prerequisites, forward_node_ids->forward_nodes,
    #   difficulty->difficulty
    insert_sql = text("""
        INSERT INTO knowledge_nodes (node_id, label, description, subject, class_level, chapter, node_type, simplified_content, prerequisites, forward_nodes, mastery_probability, difficulty, estimated_time)
        SELECT
            e.node_id,
            e.title,
            LEFT(e.definition, 500),
            e.subject,
            e.class_level,
            e.chapter,
            'info',
            e.eli5,
            COALESCE(e.prereq_ids, '[]'::json),
            COALESCE(e.forward_node_ids, '[]'::json),
            0.0,
            COALESCE(e.difficulty, 'medium'),
            15
        FROM enrichment_content e
        WHERE NOT EXISTS (
            SELECT 1 FROM knowledge_nodes k WHERE k.node_id = e.node_id
        )
        ON CONFLICT DO NOTHING
    """)

    result = conn.execute(insert_sql)
    inserted = result.rowcount
    print(f"Inserted {inserted} knowledge_nodes from enrichment_content")

    # Verify
    result = conn.execute(text("SELECT COUNT(*) FROM knowledge_nodes"))
    total = result.scalar()
    print(f"Total knowledge_nodes: {total}")

    # Check by class
    result = conn.execute(text("SELECT class_level, COUNT(*) FROM knowledge_nodes GROUP BY class_level ORDER BY class_level"))
    print("By class:")
    for r in result:
        print(f"  C{r[0]}: {r[1]}")
