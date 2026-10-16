"""test_wsa_v3_chokepoint.py -- WSA-P1: v3 deterministic choke-point tests.

Packet: _work/overhaul/WS-A_packet_plan.md section WSA-P1 (agent ovhA-p15).

Proves on ``backend.its.solver.deterministic_service``:
  1. fast-lane NeuroLink engine dicts are slop-gate SCRUBBED before serving
     (ban-listed tokens + node-id-shaped strings + 15-digit floats never
     reach students) and every solve emits one solver_metrics line with
     lane="v3" + a route stamp;
  2. the strict contract holds for a non-VERIFIED engine status (the
     answer is withheld, verification.verified forced False);
  3. a >inner-budget answer() completion is CACHED via solve_isolation
     (cache_key + _store_cached) and served on retry instead of being
     discarded;
  4. the inner budget knob SOLVER_V3_INNER_BUDGET_S is respected;
  5. every return in solve_deterministically routes through the single
     module-private _serve() exit (AST guard against regressions).

Run:  cd D:\\platform\\deploy\\backend
      python -m pytest tests/test_wsa_v3_chokepoint.py -q
"""

from __future__ import annotations

import ast
import re
import sys
import time
from pathlib import Path
from types import SimpleNamespace

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from backend.its.solver import deterministic_service as service  # noqa: E402
from backend.services import solve_isolation  # noqa: E402

_NODE_ID_RX = re.compile(r"\bc\d{1,2}_[a-z0-9]+_[a-z0-9]+(?:_[a-z0-9]+)*\b", re.I)


# ------------------------------------------------------------------ #
# helpers
# ------------------------------------------------------------------ #

class _FakeNeuroEngine:
    """Stand-in for NeuroLinkEngine.get_instance() serving a fixed payload."""

    def __init__(self, payload):
        self._payload = payload

    def fast_solve(self, question, subject="", class_level=""):
        return dict(self._payload)


def _fake_audit(route=("probe",)):
    return SimpleNamespace(
        gates_passed=["probe_gate"],
        anchor=None,
        to_dict=lambda: {"route": list(route), "gates_passed": ["probe_gate"]},
    )


def _pin_to_answer_seam(monkeypatch, fake_answer):
    """Route every probe straight to the answer() fallback seam."""
    monkeypatch.setattr(service, "answer", fake_answer)
    monkeypatch.setattr(service, "is_pure_concept_query", lambda text: False)


def _direct_returns(fn_node: ast.FunctionDef) -> list[ast.Return]:
    """Return statements of fn_node, EXCLUDING nested function bodies."""
    out: list[ast.Return] = []

    def _visit(node, nested):
        for child in ast.iter_child_nodes(node):
            if isinstance(child, (ast.FunctionDef, ast.AsyncFunctionDef,
                                  ast.Lambda)):
                _visit(child, True)
                continue
            if isinstance(child, ast.Return) and not nested:
                out.append(child)
            _visit(child, nested)

    _visit(fn_node, False)
    return out


# ------------------------------------------------------------------ #
# 1. fast lanes serve through the scrubbed, metered choke point
# ------------------------------------------------------------------ #

def test_fast_lane_scrubbed(monkeypatch, caplog):
    poisoned = {
        "status": "verified",
        "answer": ("Photosynthesis happens in the chloroplast (Lane C) — "
                   "see node c10_bio_cbse_01_001 — rate 0.3333333333333333 "
                   "per second"),
        "steps": ["**Step 1:** the student should note \\( x \\)"],
        "verification": {
            "verified": True, "label": "VERIFIED_CONCEPT",
            "gates_passed": ["neurolink_corpus_match"],
            "anchor": "node:c10_bio_cbse_01_001",
        },
        "audit": {"lane": "neurolink_concept", "node_id": "c10_bio_cbse_01_001"},
        "llm_used": False, "subject": "science", "class_level": "10",
        "elapsed_ms": 4,
    }
    monkeypatch.setattr(
        service, "NeuroLinkEngine",
        SimpleNamespace(get_instance=lambda: _FakeNeuroEngine(poisoned)))
    monkeypatch.setattr(service, "is_pure_concept_query", lambda text: True)

    with caplog.at_level("INFO", logger="solver.metrics"):
        result = service.solve_deterministically(
            "what is photosynthesis", subject="science", class_level="10")

    answer = result["answer"]
    assert isinstance(answer, str) and answer
    assert "Lane C" not in answer
    assert _NODE_ID_RX.search(answer) is None, "node-id-shaped string served"
    assert "0.3333333333333333" not in answer
    assert "0.3333" in answer, "compute-junk float not rounded for students"

    step = result["steps"][0]
    assert step.startswith("Step 1:") and "**" not in step
    assert "you" in step and "the student" not in step

    # ids riding payload fields (anchor/audit) are accepted-by-design
    assert result["verification"]["anchor"] == "node:c10_bio_cbse_01_001"

    # one solver_metrics line with lane="v3" + a route stamp
    lines = [r.getMessage() for r in caplog.records
             if r.name == "solver.metrics"]
    assert any('"lane": "v3"' in m for m in lines), lines
    assert any("v3:neurolink:concept" in m for m in lines), lines


def test_nonverified_engine_status_withholds_answer(monkeypatch):
    payload = {
        "status": "guided",  # a future engine's non-VERIFIED wire status
        "answer": "this must not ship",
        "steps": ["method step"],
        "verification": {"verified": True, "label": "SOME_ENGINE_LABEL",
                         "gates_passed": []},
        "audit": {"lane": "probe"},
        "llm_used": False,
    }
    monkeypatch.setattr(
        service, "NeuroLinkEngine",
        SimpleNamespace(get_instance=lambda: _FakeNeuroEngine(payload)))
    monkeypatch.setattr(service, "is_pure_concept_query", lambda text: True)

    result = service.solve_deterministically("probe question zz1",
                                             subject="science")
    assert result["answer"] is None, "non-VERIFIED status carried an answer"
    assert result["verification"]["verified"] is False


def test_non_dict_engine_payload_falls_through(monkeypatch):
    """Edge hardening: a rogue engine returning a non-dict is not a
    result — the solve continues to the answer() seam instead of serving
    an opaque object."""
    monkeypatch.setattr(
        service, "NeuroLinkEngine",
        SimpleNamespace(get_instance=lambda: _FakeNeuroEngine("junk")))
    monkeypatch.setattr(service, "is_pure_concept_query", lambda text: True)
    ok = SimpleNamespace(label="VERIFIED", answer="9", numeric=9.0,
                         steps=[], audit=_fake_audit(), refusal_reason=None)
    _pin_to_answer_seam(monkeypatch, lambda q: ok)

    result = service.solve_deterministically("probe question zz2",
                                             subject="maths")
    assert result["status"] == "verified"
    assert result["answer"] == "9"


def test_serve_guard_converts_non_dict_to_typed_refusal():
    """Defense-in-depth: if a non-dict ever REACHES _serve directly it is
    converted to a typed refusal, never served as an opaque object."""
    out = service._serve("junk", stamp="probe", subject="s",
                         class_level="c", board="b", started=time.perf_counter())
    assert out["status"] == "unsupported"
    assert out["answer"] is None
    assert out["verification"]["label"] == "INVALID_ENGINE_PAYLOAD"
    assert out["refusal_reason"]


def test_empty_dict_engine_result_falls_through(monkeypatch):
    """Edge hardening: an empty engine dict is not a result — the solve
    continues to the answer() seam instead of serving {}."""
    monkeypatch.setattr(
        service, "NeuroLinkEngine",
        SimpleNamespace(get_instance=lambda: _FakeNeuroEngine({})))
    monkeypatch.setattr(service, "is_pure_concept_query", lambda text: True)
    ok = SimpleNamespace(label="VERIFIED", answer="9", numeric=9.0,
                         steps=[], audit=_fake_audit(), refusal_reason=None)
    _pin_to_answer_seam(monkeypatch, lambda q: ok)

    result = service.solve_deterministically("probe question zz3",
                                             subject="maths")
    assert result["status"] == "verified"
    assert result["answer"] == "9"


# ------------------------------------------------------------------ #
# 2. timeout caches the abandoned completion (retry promise)
# ------------------------------------------------------------------ #

def test_v3_timeout_caches(monkeypatch):
    question = "timing probe polynomial wq7xz remainder question"
    slow_result = SimpleNamespace(
        label="VERIFIED", answer="42", numeric=42.0,
        steps=["divide, then take the remainder"],
        audit=_fake_audit(route=("probe:slow",)),
        refusal_reason=None,
    )

    def _slow(q):
        time.sleep(0.45)
        return slow_result

    monkeypatch.setenv("SOLVER_V3_INNER_BUDGET_S", "0.15")
    _pin_to_answer_seam(monkeypatch, _slow)

    first = service.solve_deterministically(question, subject="maths")
    assert first["status"] == "guided_practice"
    assert first["answer"] is None
    assert "fallback:socratic_nudge" in (first["audit"].get("route") or [])

    # the abandoned completion must land in the solve_isolation cache...
    key = solve_isolation.cache_key("solver.v3fallback", question)
    deadline = time.time() + 15.0
    while solve_isolation.get_cached(key) is None and time.time() < deadline:
        time.sleep(0.05)
    assert solve_isolation.get_cached(key) is not None, \
        "late completion was discarded, not cached for the retry"

    # ...and the retry is served from it, not re-nudged.
    second = service.solve_deterministically(question, subject="maths")
    assert second["status"] == "verified"
    assert second["answer"] == "42"


# ------------------------------------------------------------------ #
# 3. inner budget knob
# ------------------------------------------------------------------ #

def test_v3_budget_knob(monkeypatch):
    # invalid / absent values keep the 1.0 default
    monkeypatch.setenv("SOLVER_V3_INNER_BUDGET_S", "not-a-number")
    assert service._inner_budget_s() == 1.0
    monkeypatch.delenv("SOLVER_V3_INNER_BUDGET_S", raising=False)
    assert service._inner_budget_s() == 1.0

    # generous knob: a slow-but-within-budget answer() completes
    monkeypatch.setenv("SOLVER_V3_INNER_BUDGET_S", "3.0")
    ok = SimpleNamespace(label="VERIFIED", answer="7", numeric=7.0,
                         steps=[], audit=_fake_audit(), refusal_reason=None)

    def _slow_ok(q):
        time.sleep(0.4)
        return ok

    _pin_to_answer_seam(monkeypatch, _slow_ok)
    result = service.solve_deterministically(
        "budget knob generous probe qz93", subject="maths")
    assert result["status"] == "verified"
    assert result["answer"] == "7"

    # tight knob: the honest nudge, answer withheld
    monkeypatch.setenv("SOLVER_V3_INNER_BUDGET_S", "0.05")
    ok2 = SimpleNamespace(label="VERIFIED", answer="8", numeric=8.0,
                          steps=[], audit=_fake_audit(), refusal_reason=None)

    def _slow_ok2(q):
        time.sleep(0.4)
        return ok2

    _pin_to_answer_seam(monkeypatch, _slow_ok2)
    result2 = service.solve_deterministically(
        "budget knob tight probe qz94", subject="maths")
    assert result2["status"] == "guided_practice"
    assert result2["answer"] is None


# ------------------------------------------------------------------ #
# 4. single-exit AST guard
# ------------------------------------------------------------------ #

def test_solve_deterministically_single_exit():
    src = Path(service.__file__).read_text(encoding="utf-8")
    tree = ast.parse(src)
    fn = next(n for n in ast.walk(tree)
              if isinstance(n, ast.FunctionDef)
              and n.name == "solve_deterministically")
    returns = _direct_returns(fn)
    assert returns, "solve_deterministically has no returns to check"
    for ret in returns:
        served = ret.value
        assert isinstance(served, ast.Call), \
            f"line {ret.lineno}: return is not a _serve() call"
        assert getattr(served.func, "id", None) == "_serve", \
            f"line {ret.lineno}: return bypasses the _serve() choke point"
