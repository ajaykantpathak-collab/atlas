from neo4j import AsyncGraphDatabase

from backend.config import get_settings

settings = get_settings()

_neo4j_driver = None


async def get_neo4j():
    global _neo4j_driver
    if _neo4j_driver is None:
        _neo4j_driver = AsyncGraphDatabase.driver(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD),
        )
    return _neo4j_driver


async def close_neo4j():
    global _neo4j_driver
    if _neo4j_driver is not None:
        await _neo4j_driver.close()
        _neo4j_driver = None


async def check_neo4j() -> bool:
    try:
        driver = await get_neo4j()
        async with driver.session() as session:
            result = await session.run("RETURN 1 AS num")
            await result.single()
        return True
    except Exception:
        return False
