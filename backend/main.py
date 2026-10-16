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
from backend.modules.metrics.middleware import install_metrics_middleware
from backend.modules.metrics.router import router as metrics_router
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
    # Solver warm: MiniLM concept-embeds, NER model and spaCy nlp all
    # lazy-load inside the first solve — without this the FIRST ask
    # pays ~15-20s of model init inside the 10s quick-question budget
    # and times out on a solvable question.  Two representative calls
    # pull every lazy dep into the master so forks inherit them.
    try:
        from backend.its.solver.answer_pipeline import answer as _ans
        _ans("A car accelerates uniformly from 15 m/s to 25 m/s "
             "while covering 80 m. Find its acceleration")
        _ans("Find the number of moles in 36 g of water of molar "
             "mass 18 g/mol")
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
    paper_mode_router,
    compq_router,
    learnpath_router,
    grade_prose_router,
    # RESTORED 2026-10-02 (boundary wave): the segregation cleanup dropped
    # these two from the aggregator while the shipped frontend still calls
    # POST /api/solver/solve, GET /api/solver/types (student /solver page)
    # and POST /api/sandbox/solve, GET /api/sandbox/code-node/{id}
    # (student /sandbox page) — those surfaces 404'd in prod.  Both router
    # modules are boundaries-lint clean now (solver reach goes through
    # backend.services.solver_gateway).
    solver_router,
    sandbox_router,
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
        try:
            from backend.services import readiness as _rdy0
            _rdy0.mark("concept_index", True, "concept index warmed")
        except Exception:
            pass
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
    def _warm_nodes():
        try:
            from backend.services.enhanced_nodes import load_index
            return load_index()
        except Exception:
            return None

    def _warm_engine():
        # TutorEngine (catalog parse + tutor store build) used to be built
        # lazily on the FIRST /tutor-graph/serve per worker: with 2 workers
        # the first two serves paid 7-13s each (prod bimodality evidence).
        # Must RETURN the engine — the readiness mark below checks
        # `_eng is not None`; a None return flips the component red even
        # when the build succeeded (same bug class as _warm_nodes).
        try:
            from backend.api.competency_tutor import _get_engine
            return _get_engine()
        except Exception:
            return None

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
    #
    # FOOLPROOF-BOOT (2026-10-05): inline-with-deadline. Every warm step
    # runs bounded (join with per-step timeout). A wedged step (the compq
    # bind-mount stall stalled BOTH workers 90+ minutes — app never came
    # up) is abandoned after its window: loud log + readiness False, boot
    # continues, first requests may pay the cold load. Serving degraded
    # always beats never binding. Warm results are captured and reused by
    # the readiness block (no second load_index call = no lock race).

    def _run_warm_bounded(name: str, fn, timeout_s: float):
        """Run fn inline-equivalently, but never longer than timeout_s."""
        import threading as _th
        import time as _time
        box: dict = {}

        def _run():
            try:
                box["ret"] = fn()
                box["ok"] = True
            except Exception as _e:  # steps swallow internally; belt+braces
                box["err"] = str(_e)[:160]

        th = _th.Thread(target=_run, name=f"warm-{name}", daemon=True)
        t0 = _time.perf_counter()
        th.start()
        th.join(timeout_s)
        took = _time.perf_counter() - t0
        if th.is_alive():
            logging.getLogger(__name__).error(
                "WARM STEP '%s' exceeded %.0fs — ABANDONED; serving "
                "degraded (first requests may pay the cold load)", name,
                timeout_s)
            try:
                from backend.services import readiness as _rdy
                _rdy.mark(name, False, f"warm timeout >{timeout_s:.0f}s")
            except Exception:
                pass
            return None
        logging.getLogger(__name__).info("warm %s done in %.1fs", name, took)
        if "err" in box:
            logging.getLogger(__name__).warning(
                "warm %s raised: %s", name, box["err"])
        return box.get("ret")

    _WARM_DEFAULT_S = float(os.environ.get("WARM_STEP_TIMEOUT_S", "600"))
    _WARM_TIMEOUTS_S = {"nodes_index": float(os.environ.get(
        "WARM_NODES_TIMEOUT_S", "1800"))}  # HDD index rebuild ~17min

    _idx = _run_warm_bounded("nodes_index", _warm_nodes,
                             _WARM_TIMEOUTS_S.get("nodes_index",
                                                  _WARM_DEFAULT_S))
    _run_warm_bounded("model", _warm_model, _WARM_DEFAULT_S)
    _eng = _run_warm_bounded("concept_index", _warm_engine, _WARM_DEFAULT_S)

    def _warm_semantic_qa() -> None:
        # SEMANTIC BANK LANE (2026-10-03): the cross-encoder + a full
        # recall->rerank round-trip must be paid at boot, not by the
        # first student whose question every computed lane refuses (a
        # cold CE load is seconds; /solve runs under a 60s budget).
        # MiniLM itself comes in through model_hub above.
        try:
            from backend.its.solver.semantic_qa import warm as _sq_warm
            _sq_warm()
        except Exception:
            pass

    _run_warm_bounded("semantic_qa", _warm_semantic_qa, _WARM_DEFAULT_S)

    # NOTE: the compq bank is NOT warmed inline (tried 2026-10-05, reverted
    # same night): ensure() reads ~420MB of JSONL artifacts through the
    # Windows bind mount, which is I/O-bound and stalled BOTH workers'
    # lifespan for 90+ minutes (S-state, ~0 CPU) — the app never bound
    # :8000.  The bank stays lazily loaded: the first /api/compq request
    # per worker pays the ~6s cold path, exactly as before.

    def _warm_question_selector() -> None:
        # COLD-START hardening (brief §A1): the practice /start path's
        # first QuestionSelector construction paid the solvers-registry
        # import scan (hundreds of solver modules) + adapter wiring on the
        # FIRST student session after an idle period — the same cold-boot
        # tax the other warms remove.  init_registry() is the registry's
        # own documented startup hook; the practice router reads the same
        # singleton (the top-level `services`/`solvers` module identities
        # resolve to these same files — backend/__init__.py puts the
        # package dir on sys.path).
        try:
            import solvers.registry as _sreg
            _stats = _sreg.init_registry()
            try:
                from backend.services import readiness as _rdy1
                _rdy1.mark("solver_registry", True,
                           f"{getattr(_stats, 'total_solvers', '?')} solvers")
            except Exception:
                pass
        except Exception as _qs_exc:
            logging.getLogger(__name__).warning(
                f"question-selector registry not warmed: {_qs_exc}")
            try:
                from backend.services import readiness as _rdy2
                _rdy2.mark("solver_registry", False, str(_qs_exc)[:120])
            except Exception:
                pass

    _run_warm_bounded("solver_registry", _warm_question_selector,
                      _WARM_DEFAULT_S)

    # READINESS (2026-10-02 audit): record the warm outcome per component so
    # /ready can gate on process-local state (see services/readiness.py).
    # FOOLPROOF-BOOT: reuses the captured warm result — a second load_index()
    # here would re-enter the index lock/race and can stall unbounded.
    try:
        from backend.services import readiness as _rdy
        _idx_count = getattr(_idx, "node_count", lambda: 0)() \
            if _idx is not None else 0
        _rdy.mark("nodes_index", bool(_idx_count), f"{_idx_count} nodes")
        _rdy.mark("model", True, "model_hub preloaded")
        _rdy.mark("concept_index", _eng is not None, "tutor engine built")
    except Exception as _rdy_exc:
        logging.getLogger(__name__).warning(f"readiness mark failed: {_rdy_exc}")
    # NOTE: deliberately NOT warming the sentence-transformers embedding
    # model here — loading it alongside the ~80s nodes-index build OOMs
    # the worker (SIGKILL loop observed). It stays lazy-per-request.

    # Nightly self-evolution: MetaBrain mines AttemptLogs, apply_loop gates
    # findings into inactive rules + A/B tests, the evolving loop updates
    # strategy/misconception state. Gated by a stamp file so the two
    # workers don't double-run; sleeps between checks so a crash loop
    # can't spin.
    evo_task = asyncio.create_task(_evolution_loop())

    # ── STARTUP SMOKE TEST (2026-10-07) ────────────────────────────────
    # Runs before the first request is served.  If a CRITICAL check fails
    # (answer pipeline broken, slop gate missing, control chars in
    # families), the worker REFUSES to serve traffic.  This prevents the
    # app from serving broken responses to students after a bad deploy.
    # Non-negotiable: this must run before yield.
    from backend.startup_smoke import run_startup_smoke
    run_startup_smoke()

    # Preboard catalog warm (2026-10-02 wave): /api/preboard/papers paid a
    # 16-18s COLD first hit after every restart -- the grouped COUNT over
    # the 233k-row board_questions table only gets fast once the relation
    # pages are in the DB cache and the async pool is primed. Warm it in a
    # fire-and-forget task right after startup; never blocks readiness.
    preboard_warm = asyncio.create_task(_warm_preboard_catalog())

    # Compq-bank warm: NOT inline (the 420MB bind-mount read wedged boot
    # for 90min when tried 2026-10-05) and NOT cold-per-request (first
    # /submit post-boot blocked ~60s while 3 workers raced 3 parallel
    # loads — 2026-10-10). Started as a task so the worker binds first;
    # CompqBank.ensure() is now lock-serialized so an early request joins
    # the warm load instead of racing a second one.
    def _spawn_compq_warm():
        try:
            from backend.services.compq_bank import get_bank
            return asyncio.create_task(asyncio.to_thread(get_bank))
        except Exception:
            return None
    compq_warm = _spawn_compq_warm()
    yield
    evo_task.cancel()
    preboard_warm.cancel()
    if compq_warm is not None:
        compq_warm.cancel()
    # Shutdown
    try:
        from backend.database import dispose_sync_engine
        await dispose_sync_engine()
    except Exception:
        pass
    await close_neo4j()
    await close_redis()


async def _warm_preboard_catalog() -> None:
    """Touch the preboard catalog query once after boot so the first real
    student hit is warm. Best-effort: failures are logged and ignored."""
    await asyncio.sleep(20)  # let boot-critical warmup (nodes index) go first
    try:
        from backend.database import async_session_maker
        from backend.models.enrichment import BoardQuestion
        from sqlalchemy import select as _sel, func as _func
        async with async_session_maker() as db:
            await db.execute(
                _sel(BoardQuestion.subject, _func.count())
                .select_from(BoardQuestion)
                .where(BoardQuestion.class_level == 10)
                .where(BoardQuestion.correct_answer.isnot(None))
                .group_by(BoardQuestion.subject)
            )
        logger.info("[preboard] catalog query warmed at startup")
    except asyncio.CancelledError:
        raise
    except Exception as exc:
        logger.warning(f"[preboard] startup warm skipped: {exc}")


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


# Production hides the API surface map: /docs, /redoc and /openapi.json
# enumerate every endpoint (including their auth requirements), which is
# free reconnaissance for an attacker. Dev/test keep them for development.
from backend.config import Environment as _Environment
_is_production = settings.env == _Environment.PRODUCTION

app = FastAPI(
    title="DREAM_APP API",
    description="AI-Powered Educational Platform for Indian Students",
    version="2.0.0",
    lifespan=lifespan,
    docs_url=None if _is_production else "/docs",
    redoc_url=None if _is_production else "/redoc",
    openapi_url=None if _is_production else "/openapi.json",
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
install_metrics_middleware(app)

# ── CORS (WS-D hardening 2026-10-10) ────────────────────────────────────────
# kwargs are built through cors_middleware_kwargs, which FAILS CLOSED on
# configurations that are dangerous with credentials: a "*" origin would
# let any site read authenticated responses; "null" is forgeable via
# sandboxed iframes / redirect chains. Exact origins only.
from backend.middleware.security_headers import cors_middleware_kwargs

_cors_kwargs = cors_middleware_kwargs(
    settings.cors_origins_list, allow_credentials=True
)
# Share the allow-list with the rate limiter so a throttled cross-origin
# caller can still READ the 429 + Retry-After from a browser.
from backend.middleware import rate_limiter as _rate_limiter_mod
_rate_limiter_mod.configure_cors_origins(_cors_kwargs["allow_origins"])

app.add_middleware(
    CORSMiddleware,
    **_cors_kwargs,
)

# DISPLAY CLEANLINESS BOUNDARY (2026-10-04 sweep): every student /api/*
# response is scrubbed of machine-language at this single outermost
# serving boundary — raw LaTeX, markdown markers, compute-junk floats,
# NaN/None verbatim, pipeline jargon ("Lane C", "variable binding"),
# third-person authoring voice, and node ids inside DISPLAY strings
# (ids under fetch-key fields survive byte-exact by owner law).  JSON
# payloads walk via clean_student_payload; text/plain runs through
# student_clean.  Fail-open: any internal error serves the original
# bytes.  Probes/auth/payments/teacher/intelligence surfaces excluded.
from backend.services.display_scrub import install_display_boundary
install_display_boundary(app)

# ── RATE LIMITER (2026-10-07): sliding-window per-IP/auth-sub throttling ──
# Default 120 req/min per IP; expensive endpoints (solve/practice/tutor)
# 20 req/min. Protects against DoS and runaway clients. Added AFTER the
# display boundary so the scrub runs first on responses going out.
from backend.middleware.rate_limiter import RateLimiterMiddleware
app.add_middleware(RateLimiterMiddleware)

# ── SECURITY HEADERS (WS-D 2026-10-10) ─────────────────────────────────────
# Outermost wrapper: every response -- including 429s from the limiter
# above and error pages -- carries nosniff / frame-deny / referrer-
# policy / permissions-policy / a strict API CSP, and a scrubbed Server
# token instead of the uvicorn banner. /docs (dev-only) keeps its CSP
# exemption so the swagger UI still executes.
from backend.middleware.security_headers import SecurityHeadersMiddleware
app.add_middleware(SecurityHeadersMiddleware)

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


# HARDENING (2026-10-02): catch-all handler -- every unhandled exception is
# logged WITH the request context and exc_info (Starlette's default
# ServerErrorMiddleware would swallow the request path from the log line and
# return a bare 500).  Registered Exception handlers only fire when nothing
# more specific matched, so HTTPException/StatementError paths are untouched.
@app.exception_handler(Exception)
async def _unhandled_exception_handler(request, exc: Exception):
    import logging

    logging.getLogger("atlas.unhandled").error(
        "unhandled %s on %s %s: %s", type(exc).__name__,
        request.method, request.url.path, exc, exc_info=True,
    )
    from fastapi.responses import JSONResponse

    return JSONResponse(
        status_code=500,
        content={"detail": (
            "Something went wrong on our side. The error was logged -- "
            "please retry, or rephrase the question.")},
        headers={"Retry-After": "2"},
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
app.include_router(metrics_router)

# Intelligence layer (2026-10-02): the journey state machine + the
# self-healing pipeline.  The journey ORCHESTRATES the per-subject flows
# (probe -> teach -> practice -> remediate -> challenge -> mastered) using
# the existing mastery engine; healing consumes the solver's miss queue.
try:
    from backend.modules.journey.router import router as journey_router
    from backend.modules.healing.router import router as healing_router
    app.include_router(journey_router)
    app.include_router(healing_router)
except Exception as _j_exc:
    logging.getLogger(__name__).warning(f"journey/healing offline: {_j_exc}")

# Phase F foundation (2026-10-02): compliance (SEPARATE database) + mobile
try:
    from backend.modules.compliance.service import router as compliance_router
    from backend.modules.compliance.db import init_tables as _cmp_init
    app.include_router(compliance_router)
    _cmp_init()
except Exception as _cmp_exc:
    logging.getLogger(__name__).warning(f"compliance module offline: {_cmp_exc}")

try:
    from backend.modules.mobile.router import router as mobile_router
    from backend.database import Base
    app.include_router(mobile_router)
except Exception as _mob_exc:
    logging.getLogger(__name__).warning(f"mobile module offline: {_mob_exc}")
app.include_router(learning_upgrades_router)
app.include_router(guidance_router)
app.include_router(paper_generator_router)
app.include_router(verified_practice_router)
app.include_router(competency_tutor_router)
app.include_router(practice_router)
app.include_router(enhanced_nodes_router)
from backend.api.supplements import router as supplements_router
app.include_router(supplements_router)
app.include_router(intelligence_router)
app.include_router(its_tutor_router)
from backend.modules.review.router import router as review_router
app.include_router(review_router)
from backend.modules.learning.router import router as learning_router
app.include_router(learning_router)
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
app.include_router(paper_mode_router)
app.include_router(compq_router)  # CBQ competency-question bank (compq agent, additive)
app.include_router(learnpath_router)  # unified adaptive journey composer (learnpath-v2, additive)
try:  # Wave 9.8 L4: prose marking-scheme grader (additive, fail-open)
    app.include_router(grade_prose_router)
except Exception as _gp_exc:
    logging.getLogger(__name__).warning(f"grade_prose offline: {_gp_exc}")
app.include_router(solver_router)    # structured math solver — student /solver page (restored, see imports)
app.include_router(sandbox_router)   # subject sandboxes ground truth — student /sandbox page (restored, see imports)
try:  # Wave 9.8 Contract A: /api/solve/check + /api/tutor/reveal (L1)
    from backend.api.solve_check import router as solve_check_router
    app.include_router(solve_check_router)
except Exception as _sc_exc:
    logging.getLogger(__name__).warning(f"solve_check offline: {_sc_exc}")
try:  # COLD-START brief §D3: weekly WhatsApp parent digest (mock-safe transport)
    from backend.api.parent_digest import router as parent_digest_router
    app.include_router(parent_digest_router)
except Exception as _pd_exc:
    logging.getLogger(__name__).warning(f"parent digest offline: {_pd_exc}")
try:  # Wave 9.8 L5: mistake notebook + weekly card + who's-stuck (Contract B)
    from backend.routers.notebook import router as notebook_router
    from backend.routers.me_weekly import router as me_weekly_router
    from backend.routers.teacher_stuck import router as teacher_stuck_router
    app.include_router(notebook_router)
    app.include_router(me_weekly_router)
    app.include_router(teacher_stuck_router)
except Exception as _l5_exc:
    logging.getLogger(__name__).warning(f"struggle/notebook routes offline: {_l5_exc}")
try:  # Wave 9.8 L6: per-chapter offline practice sets (SW-precached)
    from backend.routers.offline_set import router as offline_set_router
    app.include_router(offline_set_router)
except Exception as _os_exc:
    logging.getLogger(__name__).warning(f"offline_set routes offline: {_os_exc}")
try:  # literature bank (साहित्य-कोश) — additive, independent corpus dir
    from backend.modules.literature.router import router as literature_router
    app.include_router(literature_router)
except Exception as _lit_exc:
    logging.getLogger(__name__).warning(f"literature bank offline: {_lit_exc}")
try:  # NEET UG / JEE Main / JEE Advanced Competitive Ladder API
    from backend.api.competitive_ladder import router as competitive_ladder_router
    app.include_router(competitive_ladder_router)
except Exception as _cl_exc:
    logging.getLogger(__name__).warning(f"competitive ladder offline: {_cl_exc}")

# Payments + store presence (LEARNING_DESIGN Build B 4+5, additive): Razorpay
# scaffold in TEST mode — every endpoint degrades to 503 "payments not
# configured" until RAZORPAY_KEY_ID/KEY_SECRET exist. Creates its own tables
# (orders / entitlements / webhook ledger / waitlist) idempotently at import,
# compliance-module style (on_event is a no-op under this app's lifespan).
try:
    from backend.modules.payments.router import router as payments_router
    from backend.modules.payments import service as _payments_service

    app.include_router(payments_router)
    _payments_service.init_tables()
except Exception as _pay_exc:
    logging.getLogger(__name__).warning(f"payments module offline: {_pay_exc}")


@app.get("/ready")
@app.get("/api/ready")
async def ready_check():
    """READINESS (2026-10-02 audit): 200 only when this worker finished its
    heavy warm (nodes index / concept index / model) and can serve student
    traffic without paying boot cost.  External dependencies are reported
    but never gate -- a postgres blip must not restart-loop a warm worker
    (that distinction is the whole point of ready-vs-alive)."""
    from backend.services.readiness import is_ready, snapshot

    snap = snapshot()
    if is_ready():
        return {"status": "ready", **snap}
    from fastapi.responses import JSONResponse

    return JSONResponse(status_code=503,
                        content={"status": "warming", **snap})


@app.get("/api/warm-status")
async def warm_status():
    """COLD-START (brief §A2): FE-pollable warm report — always 200 (a
    warming backend must be pollable, not an error), shape:
    {model_loaded, index_loaded, ready, components, uptime_s}.

    `ready` mirrors /ready's gate (nodes_index + concept_index + model all
    marked ok); model_loaded / index_loaded are LIVE singleton checks, not
    cached marks, so the FE can distinguish "still loading" from "loaded"."""
    from backend.services.readiness import is_ready, snapshot

    model_loaded = False
    try:
        from backend.ai import model_hub
        model_loaded = model_hub.try_get() is not None
    except Exception:
        model_loaded = False

    index_loaded = False
    index_nodes = 0
    try:
        from backend.services.enhanced_nodes import load_index
        idx = load_index()
        # node_count has appeared as both a property and a method across
        # builds (main.py's readiness block defends the same way)
        _nc = getattr(idx, "node_count", 0)
        _nc = _nc() if callable(_nc) else _nc
        index_nodes = int(_nc or 0)
        index_loaded = index_nodes > 0
    except Exception:
        index_loaded = False

    snap = snapshot()
    return {
        "model_loaded": model_loaded,
        "index_loaded": index_loaded,
        "index_nodes": index_nodes,
        "ready": bool(is_ready()),
        "warm_done": bool(snap.get("warm_done")),
        "components": snap.get("components", {}),
        "uptime_s": snap.get("uptime_s"),
    }


_health_cache: dict = {"ts": 0.0, "payload": None}


@app.get("/health")
@app.get("/api/health")  # nginx passes /api/* through unstripped; AGENTS.md canonical probe
async def health_check():
    """PERF baseline 2026-10-03: the four service probes used to run
    SEQUENTIALLY, so a slow probe stacked (warmup saw 7.5-15s for this
    endpoint; worst case 4 x 5s timeout = 20s).  They are independent —
    run them concurrently (worst case = one probe timeout, 5s) and serve
    a 1s-TTL cached snapshot so probe storms (nginx, k8s-style sweeps,
    load tests) cost one round of checks per second at most.  Response
    shape unchanged."""
    import asyncio
    import time as _time

    now = _time.monotonic()
    if _health_cache["payload"] is not None and now - _health_cache["ts"] < 1.0:
        cached = _health_cache["payload"]
        return {
            "status": "ok",
            "timestamp": datetime.utcnow().isoformat(),
            "environment": settings.ENVIRONMENT,
            "services": cached["services"],
            "cached": True,
        }

    from backend.database import check_postgres
    from backend.database.neo4j import check_neo4j
    from backend.database.redis import check_redis
    from backend.database.qdrant import check_qdrant

    # fail fast: a down database must hang neither the app nor the probe.
    # 5s: the neo4j ASYNC driver's first handshake per worker process takes
    # ~3-4s cold; at 2s the canonical probe reported false "unreachable".
    async def _safe(fn):
        try:
            return await asyncio.wait_for(fn(), timeout=5.0)
        except Exception:
            return "unreachable"

    pg, nj, rd = await asyncio.gather(
        _safe(check_postgres), _safe(check_neo4j), _safe(check_redis)
    )
    services = {
        "postgres": pg,
        "neo4j": nj,
        "redis": rd,
        "qdrant": check_qdrant(),
    }
    _health_cache["ts"] = now
    _health_cache["payload"] = {"services": services}
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "environment": settings.ENVIRONMENT,
        "services": services,
    }


@app.get("/")
async def root():
    return {
        "name": "DREAM_APP API",
        "version": "2.0.0",
        "docs": "/docs",
        "health": "/health",
    }
