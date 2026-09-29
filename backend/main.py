import asyncio
import logging
import os
from contextlib import asynccontextmanager
from datetime import datetime

logger = logging.getLogger(__name__)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import get_settings
from backend.database.neo4j import close_neo4j
from backend.database.redis import close_redis
from backend.observability import (
    init_sentry,
    install_heavy_rate_limit,
    install_rate_limit,
    setup_logging,
)

# Console logs are structured from the very first line (LOG_FORMAT=json).
setup_logging()

# Master-process warmup (gunicorn --preload): run the heavy warm steps
# ONCE in the master so forked workers inherit them via COW.  Doing them
# per-worker inside lifespan deadlocked on the import lock (transformers
# lazy import re-entry — backend-2 wedged repeatedly at MiniLM load)
# and paid the index/engine build cost twice.
if os.environ.get("ATLAS_MASTER_WARM") == "1":
    try:
        from backend.services.enhanced_nodes import load_index as _pli
        _pli()
    except Exception:
        pass
    try:
        from backend.ai import model_hub as _mh
        _mh.preload()
    except Exception:
        pass
    try:
        from backend.api.competency_tutor import _get_engine as _ge
        _ge()
    except Exception:
        pass
from backend.routers import (
    auth_router,
    content_router,
    assessment_router,
    tutor_router,
    progress_router,
    achievements_router,
    graph_router,
    solver_router,
    sandbox_router,
    learning_upgrades_router,
    guidance_router,
    paper_generator_router,
    verified_practice_router,
    competency_tutor_router,
    practice_router,
    enhanced_nodes_router,
    intelligence_router,
    its_tutor_router,
    teacher_analytics_router,
    analytics_router,
    accessibility_router,
    student_sync_router,
    id_remapping_router,
    homework_router,
    dashboard_router,
    diagnostics_router,
    teacher_router,
    junior_router,
    exams_adapter_router,
    engagement_router,
    chapter_tests_router,
    preboard_router,
)
from backend.api.assignments import router as assignments_router
from backend.api.vision import router as vision_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Re-assert our logging config here: uvicorn installs its own dictConfig
    # when the server boots, which happens AFTER module import and would
    # otherwise replace the JSON formatter set up at import time.
    setup_logging()
    # Build the concept->formula/answer index once, here, so no student's
    # question pays the ~2s corpus parse. The tutor's formula lane reads it.
    # Build the concept->formula/answer index once, here, so no student's
    # question pays the ~2s corpus parse. The tutor's formula lane reads it.
    #
    # The JSON catalog formulas are the source of truth: 1,771 evaluable
    # equations, and they sit ON the concept that owns the question, so the
    # match is exact. The YAML bank (backend/formulas/**.yaml) is NOT warmed
    # here: measured, only 458 of its 5,520 entries convert to solvable
    # equations and it solved 0 of the real-corpus questions, for ~11s of
    # boot. It stays available behind FORMULA_BANK_ENABLED=1 for experiments.
    try:
        import asyncio as _aio
        from backend.ai.generic_solver import warm_concept_index
        await _aio.to_thread(warm_concept_index)
        if os.getenv("FORMULA_BANK_ENABLED", "0").lower() in ("1", "true", "yes"):
            from backend.ai.generic_solver import warm_formula_bank
            await _aio.to_thread(warm_formula_bank)
    except Exception as _ci_exc:
        logging.getLogger(__name__).warning(
            f"concept index not warmed (lanes degrade to misses): {_ci_exc}"
        )
    # Startup: wire intelligence event persistence + replay shared state.
    # Best-effort — if the DB is down the app still runs (in-memory mode).
    try:
        from backend.services.intelligence_persistence import wire_persistence
        wire_persistence()
    except Exception as e:
        print(f"[intelligence] persistence not wired: {e}")
    # warm the enhanced-nodes index before serving — its first build per
    # worker takes ~80s over the 13k-file corpus; done inline at boot so no
    # request ever pays it (see TIER3 v2 note below).
    def _warm_nodes() -> None:
        try:
            from backend.services.enhanced_nodes import load_index
            load_index()
        except Exception:
            pass

    def _warm_engine() -> None:
        # TutorEngine (catalog parse + tutor store build) used to be built
        # lazily on the FIRST /tutor-graph/serve per worker: with 2 workers
        # the first two serves paid 7-13s each (prod bimodality evidence).
        try:
            from backend.api.competency_tutor import _get_engine
            _get_engine()
        except Exception:
            pass

    def _warm_model() -> None:
        # MiniLM must be warm BEFORE traffic arrives: handlers used to
        # load it inline, wedging the worker (gunicorn SIGKILL).
        try:
            from backend.ai import model_hub
            model_hub.preload()
        except Exception:
            pass

    # TIER3 fix (v2): run warm work INLINE, before `yield`. Warm in
    # background threads held the GIL for minutes, starving the worker's
    # event loop while it was ALSO accepting traffic: every request hung
    # (the 100-timeout rows in the TIER3 load report). Inline warm means a
    # worker finishes loading before it joins the accept loop — traffic
    # waits in the socket backlog until then instead of hanging forever.
    # The raised --timeout (600s, deploy/Dockerfile.backend) and healthcheck
    # --start-period (300s) tolerate the boot cost.
    _warm_nodes()
    _warm_model()
    _warm_engine()
    # NOTE: deliberately NOT warming the sentence-transformers embedding
    # model here — loading it alongside the ~80s nodes-index build OOMs
    # the worker (SIGKILL loop observed). It stays lazy-per-request.

    # Nightly self-evolution: MetaBrain mines AttemptLogs, apply_loop gates
    # findings into inactive rules + A/B tests, the evolving loop updates
    # strategy/misconception state. Gated by a stamp file so the two
    # workers don't double-run; sleeps between checks so a crash loop
    # can't spin.
    evo_task = asyncio.create_task(_evolution_loop())
    yield
    evo_task.cancel()
    # Shutdown
    try:
        from backend.database import dispose_sync_engine
        await dispose_sync_engine()
    except Exception:
        pass
    await close_neo4j()
    await close_redis()


async def _evolution_loop() -> None:
    """Daily self-evolution: MetaBrain -> apply_loop -> self_evolving_loop.
    Runs once per ~22h per deployment (stamp file shared by both workers
    through the cbse_data volume). Best-effort — every stage is gated."""
    import asyncio as _aio
    import time as _t
    stamp = os.path.join(
        os.environ.get("CBSE_DATA_DIR", "cbse_data"),
        "evolution_last_run.txt")
    # grace period: never compete with boot warmup (model/index loads) —
    # first check 15 min after startup
    await _aio.sleep(900)
    while True:
        try:
            last = 0.0
            try:
                last = float(open(stamp).read().strip() or 0)
            except (OSError, ValueError):
                pass
            if _t.time() - last > 22 * 3600:
                # claim the slot BEFORE running so the other worker skips
                os.makedirs(os.path.dirname(stamp), exist_ok=True)
                with open(stamp, "w") as fh:
                    fh.write(str(_t.time()))
                logger.info("[evolution] nightly run starting")
                report = None
                try:
                    from backend.its.agents.meta_brain import MetaBrain
                    from backend.services.self_evolving_loop import (
                        load_interactions)
                    interactions = await _aio.to_thread(load_interactions)
                    report = await _aio.to_thread(
                        MetaBrain().run_all_jobs,
                        interactions, {})
                    logger.info("[evolution] meta-brain: %s findings",
                                getattr(report, "total_findings", 0))
                except Exception as exc:
                    logger.warning("[evolution] meta-brain failed: %s", exc)
                if report is not None:
                    try:
                        from backend.its.evolution.apply_loop import (
                            ApplyLoop)
                        res = await _aio.to_thread(
                            ApplyLoop().plan, report)
                        logger.info(
                            "[evolution] apply_loop: %s applied, %s blocked",
                            getattr(res, "applied_count", 0),
                            getattr(res, "blocked_count", 0))
                    except Exception as exc:
                        logger.warning(
                            "[evolution] apply_loop failed: %s", exc)
                try:
                    from backend.services.self_evolving_loop import (
                        run_evolution_loop)
                    await _aio.to_thread(run_evolution_loop)
                except Exception as exc:
                    logger.warning("[evolution] evolve loop failed: %s", exc)
        except Exception as exc:
            logger.warning("[evolution] scheduler error: %s", exc)
        await _aio.sleep(6 * 3600)


app = FastAPI(
    title="DREAM_APP API",
    description="AI-Powered Educational Platform for Indian Students",
    version="2.0.0",
    lifespan=lifespan,
)

# Rate limiters are registered BEFORE CORS. Starlette's add_middleware
# inserts at index 0, so the LAST-added middleware is the OUTERMOST —
# registering CORS last puts it outside the limiters, and a 429 from either
# limiter then passes OUTWARD through CORS on its way to the client and
# carries the CORS headers a browser needs to read the response body.
# (Registered the other way round, 429s silently lost those headers.)
install_rate_limit(app)

# Strict per-IP per-minute buckets for the three UNAUTHENTICATED CPU-bound
# endpoints (paper-generator/generate, sandbox/solve, tutor/ask). Guests keep
# full access; only abusive burst rates get a 429 + Retry-After. Added after
# the global limiter so it sits OUTSIDE it: a heavy 429 short-circuits before
# the flood counter is even consulted.
install_heavy_rate_limit(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

# Optional error reporting; no-op unless SENTRY_DSN is set.
init_sentry(app)

# A client-supplied id that reaches a UUID-typed column (e.g. a malformed
# achievement/session id) makes SQLAlchemy raise StatementError. Without this
# handler every such request was a 500 + full traceback in the logs instead of
# a client error. 400 (malformed request), never 404 — we didn't look it up.
# Only StatementError is mapped: connection/transaction failures must stay 500.
from sqlalchemy.exc import StatementError


@app.exception_handler(StatementError)
async def _db_statement_error_handler(request, exc: StatementError):
    import logging

    logging.getLogger(__name__).warning(
        "DB bind error on %s %s: %s", request.method, request.url.path,
        str(getattr(exc, "orig", exc))[:200],
    )
    from fastapi.responses import JSONResponse

    return JSONResponse(
        status_code=400,
        content={"detail": "Invalid identifier format"},
    )

# Include all API routers
app.include_router(auth_router)
app.include_router(content_router)
app.include_router(vision_router)
app.include_router(assessment_router)
app.include_router(tutor_router)
app.include_router(progress_router)
app.include_router(achievements_router)
app.include_router(graph_router)
app.include_router(solver_router)
app.include_router(sandbox_router)
app.include_router(learning_upgrades_router)
app.include_router(guidance_router)
app.include_router(paper_generator_router)
app.include_router(verified_practice_router)
app.include_router(competency_tutor_router)
app.include_router(practice_router)
app.include_router(enhanced_nodes_router)
app.include_router(intelligence_router)
app.include_router(its_tutor_router)
app.include_router(teacher_analytics_router)
app.include_router(analytics_router)
app.include_router(accessibility_router)
app.include_router(student_sync_router)
app.include_router(id_remapping_router)
app.include_router(homework_router)
app.include_router(dashboard_router)
app.include_router(diagnostics_router)
app.include_router(junior_router)
app.include_router(exams_adapter_router)
app.include_router(teacher_router)
app.include_router(engagement_router)
app.include_router(assignments_router)
app.include_router(chapter_tests_router)
app.include_router(preboard_router)


@app.get("/health")
@app.get("/api/health")  # nginx passes /api/* through unstripped; AGENTS.md canonical probe
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
