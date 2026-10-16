"""test_ovh_cl10_perf.py — CL-10 + CL-21 refusal-path perf fixes.

(a) re._MAXCACHE raised before the family sweep + restored after the
    quantulum3 lazy import poisons it (numpy.f2py sets 50).
(b) shared httpx clients (no per-call SSL context) in both LLM modules
    and the structure extractor.
(c) _chat consumes the per-question LLM budget — uncapped calls on the
    refusal tail were the 135.7s @24VU outlier.
"""
import asyncio
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))


def test_maxcache_raised_at_import():
    import backend.its.solver.modeling_layer  # noqa: F401
    assert re._MAXCACHE >= 8192


def test_maxcache_restored_after_poison():
    from backend.its.solver import _regex_cache
    re._MAXCACHE = 50            # simulate numpy.f2py crackfortran poison
    _regex_cache.ensure()
    assert re._MAXCACHE >= 8192


def test_parse_quantities_restores_cache():
    from backend.its.solver.quantity_parser import parse_quantities
    re._MAXCACHE = 50            # poison again right before the lazy import
    parse_quantities("a car moves at 5 m/s")
    assert re._MAXCACHE >= 8192


def test_structure_extractor_shared_client():
    from backend.its.solver import structure_extractor as se
    c1 = se._sync_client()
    c2 = se._sync_client()
    assert c1 is c2 and not c1.is_closed


def test_llm_clients_shared():
    import asyncio
    from backend.ai import llm_client as aic
    async def grab():
        return aic._shared_async_client(3.0), aic._shared_async_client(3.0)
    c1, c2 = asyncio.run(grab())
    assert c1 is c2 and not c1.is_closed
    c1.aclose = c1.aclose  # leave open; shared by design


def test_chat_obeys_llm_budget(monkeypatch):
    from backend.its.solver import structure_extractor as se
    from backend.its.solver import competency_engine as ce
    # exhaust the shared per-question budget
    tok = ce._LLM_BUDGET.set(0)
    try:
        monkeypatch.setenv("GEMINI_API_KEY", "x")
        monkeypatch.setenv("GROQ_API_KEY", "x")
        assert se._chat("extract slots") is None
    finally:
        ce._LLM_BUDGET.reset(tok)


def test_chat_consumes_budget(monkeypatch):
    from backend.its.solver import structure_extractor as se
    from backend.its.solver import competency_engine as ce
    tok = ce._LLM_BUDGET.set(1)
    calls = []

    class _Resp:
        status_code = 500

    class _C:
        def post(self, *a, **k):
            calls.append(a)
            return _Resp()

    try:
        monkeypatch.setenv("GROQ_API_KEY", "x")
        monkeypatch.delenv("GEMINI_API_KEY", raising=False)
        monkeypatch.setenv("FREELLM_API_KEY", "")
        monkeypatch.setattr(se, "_SYNC_HTTP", _C())
        # force LLM mode on so the policy gate doesn't short-circuit
        monkeypatch.setenv("SOLVER_LLM_MODE", "fallback")
        se._chat("extract slots")
        assert ce._LLM_BUDGET.get() == 0
    finally:
        ce._LLM_BUDGET.reset(tok)
