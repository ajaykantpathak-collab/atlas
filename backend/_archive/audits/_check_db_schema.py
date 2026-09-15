import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

async def main():
    e = create_async_engine("postgresql+asyncpg://dream_user:dream_secure_2024@localhost:5432/dream_app")
    async with e.connect() as c:
        r = await c.execute(text("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='practice_sessions' ORDER BY ordinal_position"))
        print("practice_sessions columns:")
        for row in r:
            print(f"  {row[0]}: {row[1]}")
        r2 = await c.execute(text("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='attempts' ORDER BY ordinal_position"))
        print("\nattempts columns:")
        for row in r2:
            print(f"  {row[0]}: {row[1]}")
    await e.dispose()

asyncio.run(main())
