"""Shared MiniLM embedder — ONE instance per worker process.

Why this exists: sentence-transformers cold loads take tens of seconds
and were run INLINE on the event loop from several request handlers
(answer_evaluator, hybrid_evaluator, deepseek_router,
generated_solvers).  A cold load wedged the whole worker — the loop
stopped heartbeating and gunicorn's arbiter SIGKILLed it mid-request —
and each importing module kept its OWN copy (4x RAM per worker).

Contract:
- preload(): blocking; call from the startup warm-up thread ONLY.
- try_get(): non-blocking; the warm model, or None while still loading.
- get_embedder(): awaitable; a cold load runs in the executor so async
  handlers never block the loop.
- load_sync(): blocking fallback for sync-only paths (last resort —
  the startup preload should make this unreachable in practice).
"""
import asyncio
import logging
import os
import threading

# Offline + thread env BEFORE sentence_transformers/torch can be imported
# (best-effort: only engages when no earlier import baked the constants).
# Containers get these from the image env anyway; this covers bare dev runs.
os.environ.setdefault("TRANSFORMERS_OFFLINE", "1")
os.environ.setdefault("HF_HUB_OFFLINE", "1")

_MODEL = None
_LOCK = threading.Lock()
_logger = logging.getLogger(__name__)


def _load_sync():
    global _MODEL
    if _MODEL is not None:
        return _MODEL
    with _LOCK:
        if _MODEL is None:
            import time
            import torch
            # PERF (2026-10-03 solve cold-start): cap torch threads — on the
            # 8-core box oversubscribed inference threads slowed CPU encode.
            # This is the ONE shared MiniLM instance per process; every
            # solver-path embedder (semantic_matcher, variable_registry,
            # quantity_binder) loads THROUGH here since this fix.
            torch.set_num_threads(int(os.environ.get("TORCH_NUM_THREADS", "1")))
            from sentence_transformers import SentenceTransformer
            t0 = time.time()
            try:
                _MODEL = SentenceTransformer("all-MiniLM-L6-v2")
            except Exception:
                # Cache missing on this host — retry once with network on.
                os.environ.pop("TRANSFORMERS_OFFLINE", None)
                os.environ.pop("HF_HUB_OFFLINE", None)
                _MODEL = SentenceTransformer("all-MiniLM-L6-v2")
            # Canonical per-process log line: grep "MiniLM loaded" — must
            # appear exactly ONCE per worker (double-load regression probe).
            _logger.info("MiniLM loaded (shared singleton) in %.1fs",
                         time.time() - t0)
    return _MODEL


def try_get():
    """Non-blocking: the warm model, or None while it is still loading."""
    return _MODEL


def load_sync():
    """Blocking load — last resort for sync-only paths."""
    return _load_sync()


def preload() -> None:
    """Blocking warm-up — call from the startup warm-up thread only."""
    try:
        _load_sync()
    except Exception:
        pass  # handlers degrade gracefully via try_get/get_embedder


async def get_embedder():
    """Awaitable access; a cold load runs in the executor, never inline."""
    if _MODEL is not None:
        return _MODEL
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(None, _load_sync)
