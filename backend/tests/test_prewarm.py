"""Wave 9.8 L3 — session prewarm + bank pre-route pins.

Contract under test (backend/services/prewarm.py,
backend/workers/preroute.py, workers/main.py registrations):

  1. ``prewarm_node`` is fire-and-forget on the request path — a dead
     queue (no Redis/broker in this stack; the postgres job queue is
     what ``jobs.enqueue`` rides) degrades to a silent no-op, NEVER an
     exception reaching the chapter-open handler.
  2. It enqueues the ``session_prewarm`` kind under the deterministic
     ``prewarm-<node_id>`` job id, and dedupes repeats inside the
     per-process TTL so a refresh loop cannot flood the queue.
  3. ``run_node_prewarm`` never raises — a failed bank select returns
     ``{"stems": 0, "error": ...}``.
  4. ``bank_preroute`` hard-refuses when SOLVER_LLM_MODE != off (the
     route-only lane must never reach an LLM), selects only
     norm_text-populated non-quarantined rows, and runs in 2k batches
     under the 1.5GB RSS tripwire.
  5. The worker registry carries all three wave-98 kinds.
"""

import os
import sys

import pytest

sys.path.insert(0, os.path.join("D:\\", "platform", "deploy"))

from backend.services import prewarm
from backend.workers import preroute


# --------------------------------------------------------------------------- #
# 1. fire-and-forget: queue down -> silent no-op
# --------------------------------------------------------------------------- #

def test_prewarm_node_is_noop_when_queue_unavailable(monkeypatch):
    """The whole point of prewarm: the request path never sees a failure.
    Simulate the job queue being unreachable (Redis/broker-less stack —
    jobs.enqueue raising) and assert the call returns quietly."""
    prewarm._SEEN.clear()

    def _boom(*a, **k):
        raise RuntimeError("queue unavailable")

    monkeypatch.setattr(
        "backend.workers.jobs.enqueue", _boom, raising=False)
    # must not raise
    assert prewarm.prewarm_node("c10_sci_cbse_03_001") is None


def test_prewarm_node_enqueues_session_prewarm_kind(monkeypatch):
    """Happy path: kind + deterministic job id are the queue contract
    the worker registry consumes."""
    prewarm._SEEN.clear()
    calls = []
    monkeypatch.setattr(
        "backend.workers.jobs.enqueue",
        lambda kind, payload=None, **kw: calls.append(
            (kind, payload, kw)) or "jid",
        raising=False)
    nid = "c10_sci_cbse_03_001"
    prewarm.prewarm_node(nid, {"board": "CBSE"})
    assert len(calls) == 1
    kind, payload, kw = calls[0]
    assert kind == "session_prewarm"
    assert payload["node_id"] == nid
    assert kw.get("job_id") == f"prewarm-{nid}"


def test_prewarm_node_dedupes_within_ttl(monkeypatch):
    """One enqueue per node per process-TTL — a refresh storm must not
    flood the jobs table."""
    prewarm._SEEN.clear()
    calls = []
    monkeypatch.setattr(
        "backend.workers.jobs.enqueue",
        lambda *a, **k: calls.append((a, k)) or "jid",
        raising=False)
    nid = "c9_math_cbse_01_002"
    prewarm.prewarm_node(nid)
    prewarm.prewarm_node(nid)
    prewarm.prewarm_node(nid)
    assert len(calls) == 1


def test_prewarm_node_empty_id_is_noop(monkeypatch):
    prewarm._SEEN.clear()
    calls = []
    monkeypatch.setattr(
        "backend.workers.jobs.enqueue",
        lambda *a, **k: calls.append((a, k)) or "jid",
        raising=False)
    prewarm.prewarm_node("")
    prewarm.prewarm_node(None)
    assert calls == []


# --------------------------------------------------------------------------- #
# 2. worker-side body never raises
# --------------------------------------------------------------------------- #

def test_run_node_prewarm_db_failure_returns_error_dict(monkeypatch):
    """A dead bank engine degrades to an honest error dict — the job row
    records it, the worker loop keeps going."""
    def _boom_engine():
        raise RuntimeError("no db")

    monkeypatch.setattr(
        "backend.its.solver.bank_answer._engine", _boom_engine,
        raising=False)
    out = prewarm.run_node_prewarm("c10_sci_cbse_03_001")
    assert out["node_id"] == "c10_sci_cbse_03_001"
    assert out["stems"] == 0
    assert "error" in out


# --------------------------------------------------------------------------- #
# 3. bank_preroute pins
# --------------------------------------------------------------------------- #

def test_preroute_refuses_when_llm_mode_not_off(monkeypatch):
    """Route-only must never reach an LLM: SOLVER_LLM_MODE != off is a
    hard RuntimeError before a single row is touched."""
    monkeypatch.setenv("SOLVER_LLM_MODE", "hybrid")
    with pytest.raises(RuntimeError, match="SOLVER_LLM_MODE"):
        preroute.run(limit=1)


def test_preroute_selects_norm_populated_nonquarantined_only():
    assert "norm_text IS NOT NULL" in preroute._SELECT_SQL
    assert "board <> 'QUARANTINED'" in preroute._SELECT_SQL
    assert "norm_text IS NOT NULL" in preroute._COUNT_SQL
    assert preroute.BATCH == 2000
    assert preroute.RSS_LIMIT_BYTES == 1_500_000_000
    assert preroute.SLEEP_S == 0.3


def test_preroute_cursor_round_trip(tmp_path, monkeypatch):
    monkeypatch.setattr(preroute, "_cursor_path",
                        lambda: str(tmp_path / "bank_preroute.cursor"))
    assert preroute.read_cursor() == ""
    preroute.write_cursor("01fb17ca-c210-45e8-b92f-d2a1b2923891")
    assert preroute.read_cursor() == "01fb17ca-c210-45e8-b92f-d2a1b2923891"


# --------------------------------------------------------------------------- #
# 4. worker registry carries the wave-98 kinds
# --------------------------------------------------------------------------- #

def test_worker_registry_has_wave98_kinds():
    from backend.workers import main as wmain
    assert "norm_text_backfill" in wmain.HANDLERS
    assert "bank_preroute" in wmain.HANDLERS
    assert "session_prewarm" in wmain.HANDLERS
    # heavy-window kinds per owner law (02:00-05:00 only)
    assert "norm_text_backfill" in wmain.HEAVY_KINDS
    assert "bank_preroute" in wmain.HEAVY_KINDS
    # session_prewarm is deliberately NOT heavy — it must land before
    # the student does
    assert "session_prewarm" not in wmain.HEAVY_KINDS
