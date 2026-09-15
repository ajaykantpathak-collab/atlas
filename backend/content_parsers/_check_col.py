from sqlalchemy import create_engine, text
url = 'postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app'
engine = create_engine(url)
with engine.connect() as conn:
    result = conn.execute(text("SELECT data_type FROM information_schema.columns WHERE table_name='board_questions' AND column_name='node_tags'"))
    print('node_tags type:', result.scalar())
    # Test the @> operator
    try:
        result = conn.execute(text("SELECT COUNT(*) FROM board_questions WHERE node_tags::jsonb @> '[\"c9_math_001\"]'::jsonb"))
        print('jsonb cast count:', result.scalar())
    except Exception as e:
        print('jsonb cast error:', e)
    # Try text cast
    try:
        result = conn.execute(text("SELECT COUNT(*) FROM board_questions WHERE node_tags::text LIKE '%c9_math_001%'"))
        print('text cast count:', result.scalar())
    except Exception as e:
        print('text cast error:', e)
