"""test_wsc_consolidation.py — WS-C socratic consolidation invariants.

Pins the WS-C_tutor_design.md decisions:
  - exactly ONE socratic dialogue engine lives under its/tutoring
    (unified_socratic_engine) — the 6-engine sprawl is consolidated;
  - dead modules (socratic_state_machine, experience_engine) are gone;
  - socratic_engine_pcr is a thin re-export shim, not a second engine —
    the implementation moved into socratic_pipeline (PCR lane);
  - socratic_pipeline_integrated stays (reclassified: v3 multi-agent
    serving pipeline, not a competing dialogue engine);
  - the canonical engine's public surfaces still import;
  - the slop-gate choke point scrubs tutor-served strings.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
# ONLY the deploy root on sys.path (two-module-identity trap).

import pytest

TUTORING_DIR = os.path.join(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__))), "its", "tutoring")


# --------------------------------------------------------------- engine count
def test_dead_modules_absent():
    for name in ("socratic_state_machine.py", "experience_engine.py"):
        assert not os.path.exists(os.path.join(TUTORING_DIR, name)), name
    import importlib.util
    for name in ("backend.its.tutoring.socratic_state_machine",
                 "backend.its.tutoring.experience_engine"):
        assert importlib.util.find_spec(name) is None, name


def test_single_dialogue_engine():
    """Only unified_socratic_engine may carry session/dialogue state
    (TutoringState machine)."""
    from backend.its.tutoring import unified_socratic_engine as U
    assert hasattr(U, "UnifiedSocraticEngine")
    assert hasattr(U, "StudentState")
    assert hasattr(U, "TutoringState")
    # the other modules must NOT carry a second state machine
    for mod in ("socratic_pipeline", "socratic_pipeline_integrated"):
        m = __import__(f"backend.its.tutoring.{mod}", fromlist=["x"])
        assert not hasattr(m, "TutoringState"), mod


def test_pcr_module_gone():
    """socratic_engine_pcr.py is burned; its classes live in
    socratic_pipeline and services/socratic_engine_v2.py (its own
    deprecated `import *` shim) re-exports from the pipeline directly —
    zero shim-to-shim chains remain."""
    p = os.path.join(TUTORING_DIR, "socratic_engine_pcr.py")
    assert not os.path.exists(p)
    import importlib.util
    assert importlib.util.find_spec(
        "backend.its.tutoring.socratic_engine_pcr") is None
    # the implementation lives in socratic_pipeline and is THE class
    from backend.its.tutoring.socratic_pipeline import SocraticEngineV2
    # services/socratic_engine_v2.py re-exports from socratic_pipeline
    from backend.services.socratic_engine_v2 import (
        SocraticEngineV2 as ServicesV2,
        SocraticResponse as ServicesResp,
    )
    assert ServicesV2 is SocraticEngineV2


def test_integrated_pipeline_stays_importable():
    from backend.services.socratic_pipeline_v3 import SocraticPipelineV3
    assert callable(getattr(SocraticPipelineV3, "process_interaction", None))


def test_public_surfaces_import():
    """api/tutor.py engine surface + routers/tutor.py mount still resolve."""
    from backend.api import tutor as api_tutor
    assert callable(api_tutor._get_unified_engine)
    import backend.routers.tutor as rt
    assert callable(getattr(rt, "router", None))


# --------------------------------------------------------------- slop gate
def test_slop_gate_scrubs_tutor_strings():
    """Banned strings must not survive the api/tutor scrub facade."""
    from backend.api.tutor import _scrub_str
    for banned in ("The student should use Lane C.",
                   "solve node c10_bio_cbse_01_001 now",
                   r"compute $x^2$ now"):
        clean = _scrub_str(banned)
        for frag in ("Lane C", "the student", "c10_bio_cbse_01_001",
                     "$x^2$"):
            assert frag.lower() not in clean.lower(), (banned, clean)


def test_slop_gate_fail_open():
    from backend.api.tutor import _scrub_str, _scrub_resp_dict
    assert _scrub_str("") == ""
    assert _scrub_str(None) is None
    d = _scrub_resp_dict({"content": "use Lane C here", "x": 1})
    assert "Lane C" not in d["content"] and d["x"] == 1


def test_scrub_wired_on_reply_path():
    """Every emit point in api/tutor.py is behind the scrub (source-level
    pin so a refactor can't silently re-bypass it)."""
    import inspect
    from backend.api import tutor as api_tutor
    src = inspect.getsource(api_tutor)
    assert src.count("_scrub_str(") >= 6
    assert src.count("_scrub_resp_dict(") >= 4
