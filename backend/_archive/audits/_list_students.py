import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

async def main():
    e = create_async_engine("postgresql+asyncpg://dream_user:dream_secure_2024@localhost:5432/dream_app")
    async with e.connect() as c:
        r = await c.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='students' ORDER BY ordinal_position"))
        print("students columns:")
        for row in r:
            print(f"  {row[0]}")
        r2 = await c.execute(text("SELECT id FROM students LIMIT 5"))
        for row in r2:
            print(f"  student id: {row[0]}")
    await e.dispose()

asyncio.run(main())
