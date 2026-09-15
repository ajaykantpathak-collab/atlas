from sqlalchemy import create_engine, text
url = 'postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app'
engine = create_engine(url)
with engine.connect() as conn:
    # Check what node_tags look like for C9 maths
    result = conn.execute(text("SELECT node_tags, question_text FROM board_questions WHERE class_level=9 AND subject='maths' LIMIT 10"))
    print("C9 maths node_tags:")
    for r in result:
        print(f"  tags={r[0]} q={r[1][:80]}")

    # Check if any C9 questions have non-empty tags
    result = conn.execute(text("SELECT COUNT(*) FROM board_questions WHERE class_level=9 AND subject='maths' AND node_tags::text != '[]' AND node_tags IS NOT NULL"))
    print(f"\nC9 maths with non-empty tags: {result.scalar()}")

    # Check what subjects/tags exist for c9_math nodes
    result = conn.execute(text("SELECT DISTINCT node_tags FROM board_questions WHERE class_level=9 AND subject='maths' AND node_tags::text != '[]' LIMIT 5"))
    print("\nDistinct tags:")
    for r in result:
        print(f"  {r[0]}")
