"""Apply schema fixes for practice endpoint.
Tables are empty so ALTER TABLE is safe.
1. Make attempts.topic_id nullable (topics table is empty)
2. Add attempts.session_id FK to practice_sessions
3. Add attempts.marks_awarded column
"""
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

async def main():
    e = create_async_engine("postgresql+asyncpg://dream_user:dream_secure_2024@localhost:5432/dream_app")
    async with e.begin() as conn:
        # 1. Make topic_id nullable
        await conn.execute(text("ALTER TABLE attempts ALTER COLUMN topic_id DROP NOT NULL"))
        print("OK: attempts.topic_id is now nullable")

        # 2. Add session_id FK
        await conn.execute(text("""
            ALTER TABLE attempts
            ADD COLUMN IF NOT EXISTS session_id UUID
            REFERENCES practice_sessions(id) ON DELETE CASCADE
        """))
        print("OK: attempts.session_id column added")

        # 3. Add marks_awarded
        await conn.execute(text("""
            ALTER TABLE attempts
            ADD COLUMN IF NOT EXISTS marks_awarded INTEGER DEFAULT 0
        """))
        print("OK: attempts.marks_awarded column added")

        # 4. Add index on session_id
        await conn.execute(text("""
            CREATE INDEX IF NOT EXISTS idx_attempts_session_id
            ON attempts(session_id)
        """))
        print("OK: index on attempts.session_id created")

    await e.dispose()
    print("\nSchema migration complete.")

asyncio.run(main())
