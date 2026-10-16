"""test_ovh_cl18_config.py — CL-18: LLM key fields fillable + dead
deepseek route_question removed.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))


def test_gemini_api_key_fillable_from_env(monkeypatch):
    monkeypatch.setenv("GEMINI_API_KEY", "sekret-test")
    import importlib
    from backend import config as cfg
    importlib.reload(cfg)
    s = cfg.Settings()
    assert s.gemini_api_key == "sekret-test"
    assert s.GEMINI_API_KEY == "sekret-test"
    importlib.reload(cfg)


def test_groq_key_fillable_from_env(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "groq-test")
    import importlib
    from backend import config as cfg
    importlib.reload(cfg)
    s = cfg.Settings()
    assert s.GROQ_API_KEY == "groq-test"
    importlib.reload(cfg)


def test_gemini_model_property():
    from backend.config import Settings
    assert Settings().GEMINI_MODEL == "gemini-flash-latest"


def test_dead_route_question_removed():
    from backend.ai import deepseek_router as dr
    assert not hasattr(dr, "route_question")
    assert not hasattr(dr, "_call_deepseek")
    # survivors still serve the live routes
    assert callable(dr.get_cache_stats)
    assert callable(dr.get_variables_for_problem_type)


def test_classifier_respects_solver_llm_off(monkeypatch):
    """SOLVER_LLM_MODE=off + fillable key must NOT dial Gemini (prod
    posture — pre-CL-18 the unfillable key made this return None)."""
    import backend.ai.classifier as clf

    def _boom(*a, **k):
        raise AssertionError("HTTP call attempted under SOLVER_LLM_MODE=off")

    monkeypatch.setenv("SOLVER_LLM_MODE", "off")
    monkeypatch.setenv("GEMINI_API_KEY", "sekret")
    monkeypatch.setattr(clf, "requests",
                        type("R", (), {"post": staticmethod(_boom)}))
    monkeypatch.setattr(
        clf, "get_settings",
        lambda: type("S", (), {"GEMINI_API_KEY": "sekret",
                               "GEMINI_MODEL": "m"})())
    import asyncio
    assert asyncio.run(clf.classify_question("what is 2+2")) is None


def test_classifier_proceeds_when_llm_allowed(monkeypatch):
    """Unset SOLVER_LLM_MODE + key + stubbed HTTP -> the call goes out."""
    import backend.ai.classifier as clf
    captured = {}

    class _Resp:
        status_code = 200

        def json(self):
            return {"candidates": [{"content": {"parts": [
                {"text": '{"template": "t", "variables": {}}'}]}}]}

    def _post(url, headers=None, json=None, timeout=None):
        captured["url"] = url
        return _Resp()

    monkeypatch.delenv("SOLVER_LLM_MODE", raising=False)
    monkeypatch.setenv("GEMINI_API_KEY", "sekret")
    monkeypatch.setattr(clf, "requests",
                        type("R", (), {"post": staticmethod(_post)}))
    monkeypatch.setattr(
        clf, "get_settings",
        lambda: type("S", (), {"GEMINI_API_KEY": "sekret",
                               "GEMINI_MODEL": "m"})())
    import asyncio
    asyncio.run(clf.classify_question("what is 2+2"))
    assert "generativelanguage" in captured.get("url", "")


def test_solver_router_import_surface():
    """routers/solver must not import the dead name."""
    import inspect
    import backend.routers.solver as rs
    src = inspect.getsource(rs)
    import re
    # exact-name match: route_question_graph must not trip this
    assert not re.search(r"\broute_question\b(?!_graph)", src)
