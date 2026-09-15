"""Check PostgreSQL tables and row counts."""
import os, sys
sys.path.insert(0, r'D:\platform')
sys.path.insert(0, r'D:\platform\backend_fastapi')
from sqlalchemy import create_engine, text

url = os.environ.get('DATABASE_URL', 'postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app')
engine = create_engine(url)
with engine.connect() as conn:
    result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name"))
    tables = [r[0] for r in result]
    print('Tables:', tables)

    for t in ['users', 'knowledge_nodes', 'enrichment_content', 'board_questions', 'class_level_content', 'exams', 'quiz_questions', 'masteries', 'achievements']:
        if t in tables:
            result = conn.execute(text(f'SELECT COUNT(*) FROM {t}'))
            print(f'  {t}: {result.scalar()} rows')
        else:
            print(f'  {t}: MISSING')

    # Check board_questions sample
    if 'board_questions' in tables:
        result = conn.execute(text("SELECT COUNT(*) FROM board_questions"))
        count = result.scalar()
        print(f"\nboard_questions: {count} rows")
        if count > 0:
            result = conn.execute(text("SELECT question_text, subject, class_level, source_type FROM board_questions LIMIT 3"))
            for r in result:
                print(f"  {r[1]}/{r[2]}/{r[3]}: {r[0][:80]}")

    # Check knowledge_nodes sample
    if 'knowledge_nodes' in tables:
        result = conn.execute(text("SELECT COUNT(*) FROM knowledge_nodes"))
        count = result.scalar()
        print(f"\nknowledge_nodes: {count} rows")
        if count > 0:
            result = conn.execute(text("SELECT node_id, title, subject, class_level FROM knowledge_nodes LIMIT 5"))
            for r in result:
                print(f"  {r[0]}: {r[1]} ({r[2]}/C{r[3]})")
