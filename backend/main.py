from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import get_settings
from backend.database.neo4j import close_neo4j
from backend.database.redis import close_redis
from backend.routers import (
    auth_router,
    content_router,
    assessment_router,
    tutor_router,
    progress_router,
    achievements_router,
    graph_router,
    solver_router,
    verified_practice_router,
    competency_tutor_router,
    practice_router,
    enhanced_nodes_router,
    intelligence_router,
    its_tutor_router,
    teacher_analytics_router,
)

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: wire intelligence event persistence + replay shared state.
    # Best-effort — if the DB is down the app still runs (in-memory mode).
    try:
        from backend.services.intelligence_persistence import wire_persistence
        wire_persistence()
    except Exception as e:
        print(f"[intelligence] persistence not wired: {e}")
    yield
    # Shutdown
    try:
        from backend.database import dispose_sync_engine
        await dispose_sync_engine()
    except Exception:
        pass
    await close_neo4j()
    await close_redis()


app = FastAPI(
    title="DREAM_APP API",
    description="AI-Powered Educational Platform for Indian Students",
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all API routers
app.include_router(auth_router)
app.include_router(content_router)
app.include_router(assessment_router)
app.include_router(tutor_router)
app.include_router(progress_router)
app.include_router(achievements_router)
app.include_router(graph_router)
app.include_router(solver_router)
app.include_router(verified_practice_router)
app.include_router(competency_tutor_router)
app.include_router(practice_router)
app.include_router(enhanced_nodes_router)
app.include_router(intelligence_router)
app.include_router(its_tutor_router)
app.include_router(teacher_analytics_router)


@app.get("/health")
async def health_check():
    import asyncio

    from backend.database import check_postgres
    from backend.database.neo4j import check_neo4j
    from backend.database.redis import check_redis
    from backend.database.qdrant import check_qdrant

    # fail fast: a down database must hang neither the app nor the probe
    async def _safe(fn):
        try:
            return await asyncio.wait_for(fn(), timeout=2.0)
        except Exception:
            return "unreachable"

    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "environment": settings.ENVIRONMENT,
        "services": {
            "postgres": await _safe(check_postgres),
            "neo4j": await _safe(check_neo4j),
            "redis": await _safe(check_redis),
            "qdrant": check_qdrant(),
        },
    }


@app.get("/")
async def root():
    return {
        "name": "DREAM_APP API",
        "version": "2.0.0",
        "docs": "/docs",
        "health": "/health",
    }
