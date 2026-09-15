import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

async def main():
    e = create_async_engine("postgresql+asyncpg://dream_user:dream_secure_2024@localhost:5432/dream_app")
    async with e.connect() as c:
        r = await c.execute(text("SELECT count(*) FROM topics"))
        print(f"topics count: {r.scalar()}")
        r2 = await c.execute(text("SELECT count(*) FROM students"))
        print(f"students count: {r2.scalar()}")
        r3 = await c.execute(text("SELECT count(*) FROM practice_sessions"))
        print(f"practice_sessions count: {r3.scalar()}")
        r4 = await c.execute(text("SELECT count(*) FROM attempts"))
        print(f"attempts count: {r4.scalar()}")
        r5 = await c.execute(text("SELECT count(*) FROM mastery"))
        print(f"mastery count: {r5.scalar()}")
        # Check if topics table has any columns we can use as ID
        r6 = await c.execute(text("SELECT id, name FROM topics LIMIT 5"))
        rows = r6.fetchall()
        if rows:
            print(f"sample topics: {rows}")
        else:
            print("topics table is EMPTY")
    await e.dispose()

asyncio.run(main())
