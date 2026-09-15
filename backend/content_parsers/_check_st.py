"""Check board_questions source_types."""
import sys
sys.path.insert(0, r'D:\platform')
sys.path.insert(0, r'D:\platform\backend_fastapi')
from sqlalchemy import create_engine, text
url = 'postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app'
engine = create_engine(url)
with engine.connect() as conn:
    result = conn.execute(text("SELECT source_type, COUNT(*) FROM board_questions GROUP BY source_type ORDER BY COUNT(*) DESC"))
    print("All source_types:")
    for r in result:
        print(f"  {r[0]}: {r[1]}")

    result = conn.execute(text("SELECT source_type, COUNT(*) FROM board_questions WHERE class_level=9 AND subject='maths' GROUP BY source_type"))
    print("\nC9 maths source_types:")
    for r in result:
        print(f"  {r[0]}: {r[1]}")

    # Check what node_tags look like
    result = conn.execute(text("SELECT node_tags, question_text FROM board_questions WHERE node_tags IS NOT NULL LIMIT 3"))
    print("\nSample node_tags:")
    for r in result:
        print(f"  tags={r[0]} q={r[1][:80]}")
