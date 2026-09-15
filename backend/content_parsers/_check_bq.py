"""Check board_questions data for quiz compatibility."""
import os, sys
sys.path.insert(0, r'D:\platform')
sys.path.insert(0, r'D:\platform\backend_fastapi')
from sqlalchemy import create_engine, text

url = 'postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app'
engine = create_engine(url)
with engine.connect() as conn:
    # Check board_questions with node_tags
    result = conn.execute(text("SELECT COUNT(*) FROM board_questions WHERE node_tags IS NOT NULL AND node_tags::text != '[]'"))
    print(f"board_questions with node_tags: {result.scalar()}")

    # Check by class and subject
    result = conn.execute(text("SELECT class_level, subject, COUNT(*) FROM board_questions GROUP BY class_level, subject ORDER BY class_level, subject"))
    print("\nboard_questions by class/subject:")
    for r in result:
        print(f"  C{r[0]} {r[1]}: {r[2]}")

    # Sample with node_tags
    result = conn.execute(text("SELECT question_text, node_tags, subject, class_level, source_type, difficulty, question_type FROM board_questions WHERE node_tags IS NOT NULL AND node_tags != '[]' LIMIT 5"))
    print("\nSample questions with node_tags:")
    for r in result:
        print(f"  {r[2]}/C{r[3]}/{r[4]}: nodes={r[1]} type={r[6]} diff={r[5]}")
        print(f"    Q: {r[0][:100]}")

    # Check knowledge_nodes schema
    result = conn.execute(text("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='knowledge_nodes' ORDER BY ordinal_position"))
    print("\nknowledge_nodes columns:")
    for r in result:
        print(f"  {r[0]}: {r[1]}")

    # Check existing knowledge_nodes
    result = conn.execute(text("SELECT * FROM knowledge_nodes LIMIT 3"))
    cols = [c.name for c in result.cursor.description]
    print(f"\nknowledge_nodes columns: {cols}")
    for r in result:
        print(f"  {dict(zip(cols, r))}")
