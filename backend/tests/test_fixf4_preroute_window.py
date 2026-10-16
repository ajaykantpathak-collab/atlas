"""test_fixf4_preroute_window.py — LAUNCH-FIX-F4: bank_preroute shard runs
are confined to the 02:00-05:00 heavy window on EVERY entry path.

Background (audit 2026-10-15 laneB): four bank_preroute shards ran during
the day (worker at 167% CPU, 12s logins, 503 wall). The QUEUE path was
already guarded (workers/main.py HEAVY_KINDS + _guard_heavy defer); the
DIRECT path — ``python -m backend.workers.preroute --shard 0123`` — had no
guard at all. norm_backfill.main() set the precedent (window check, exit 2,
--force-window override); preroute now matches it and adds a
defense-in-depth check inside run() itself so no caller can skip it.

Pins (mock clock, no DB):
  1. run() outside the window REFUSES before touching the engine.
  2. run() inside the window PROCEEDS (stubbed engine, full loop).
  3. WORKER_ALLOW_HEAVY=1 (supervised) overrides the refusal.
  4. CLI main() exits 2 outside the window; --force-window bypasses.
  5. queue path: bank_preroute is a HEAVY kind and _guard_heavy defers it
     outside the window (job preserved, next-start stamped).
"""

import os
import sys
from datetime import datetime, timezone

import pytest

sys.path.insert(0, os.path.join("D:\\", "platform", "deploy"))

from backend.workers import preroute  # noqa: E402


def _bounds(open_now, nxt=None):
    return lambda now: (open_now, nxt or now)


def _closed_bounds(now):
    """Window closed; next start 02:00 next day."""
    return (False, datetime(2026, 10, 16, 2, 0, tzinfo=timezone.utc))


# --------------------------------------------------------------------------- #
# 1. run() outside the window refuses BEFORE any DB work
# --------------------------------------------------------------------------- #
def test_run_refuses_outside_window_before_engine(monkeypatch):
    monkeypatch.setenv("SOLVER_LLM_MODE", "off")
    monkeypatch.delenv("WORKER_ALLOW_HEAVY", raising=False)
    monkeypatch.setattr(
        "backend.workers.main._heavy_window_bounds", _closed_bounds)

    def _boom():
        raise AssertionError("engine touched — guard must fire first")
    monkeypatch.setattr(preroute, "_engine", _boom)

    with pytest.raises(RuntimeError) as ei:
        preroute.run(limit=5)
    msg = str(ei.value)
    assert "heavy window" in msg
    assert "2026-10-16" in msg  # names the next window start


# --------------------------------------------------------------------------- #
# 2. run() inside the window proceeds (stubbed engine, full loop)
# --------------------------------------------------------------------------- #
class _Row:
    def __init__(self, id, text):
        self.id = id
        self.question_text = text


class _Result:
    matched = True


class _Cx:
    """Serves two 2-row batches then empty (limit=4 exercised fully)."""

    def __init__(self):
        self._batches = [
            [_Row("a1", "q1"), _Row("a2", "q2")],
            [_Row("a3", "q3"), _Row("a4", "q4")],
            [],
        ]

    def __enter__(self):
        return self

    def __exit__(self, *a):
        return False

    def execute(self, sql, params=None):
        if str(sql).strip().upper().startswith("SELECT COUNT"):
            return type("C", (), {"scalar": lambda s: 4})()
        return self._batches.pop(0) if self._batches else []


def test_run_proceeds_inside_window(monkeypatch, tmp_path):
    monkeypatch.setenv("SOLVER_LLM_MODE", "off")
    monkeypatch.delenv("WORKER_ALLOW_HEAVY", raising=False)
    monkeypatch.setattr(
        "backend.workers.main._heavy_window_bounds",
        lambda now: (True, now))

    cx = _Cx()
    engine = type("E", (), {"connect": lambda s: cx})()
    monkeypatch.setattr(preroute, "_engine", lambda: engine)

    import backend.its.solver.modeling_layer as ml
    monkeypatch.setattr(ml, "model_problem", lambda t: _Result())

    cursor_file = tmp_path / "bank_preroute.test.cursor"
    monkeypatch.setattr(preroute, "_cursor_path",
                        lambda shard=None: str(cursor_file))
    monkeypatch.setattr(preroute, "BATCH", 2)
    monkeypatch.setattr(preroute, "SLEEP_S", 0)

    report = preroute.run(limit=4)
    assert report["processed"] == 4
    assert report["routed"] == 4
    assert report["batches"] == 2
    assert cursor_file.exists() and cursor_file.read_text() == "a4"


# --------------------------------------------------------------------------- #
# 3. supervised override: WORKER_ALLOW_HEAVY=1 lets a closed window pass
# --------------------------------------------------------------------------- #
def test_allow_heavy_env_overrides(monkeypatch):
    monkeypatch.setenv("SOLVER_LLM_MODE", "off")
    monkeypatch.setenv("WORKER_ALLOW_HEAVY", "1")
    monkeypatch.setattr(
        "backend.workers.main._heavy_window_bounds", _closed_bounds)
    # the guard must not even consult the bounds under the override
    monkeypatch.setattr(
        "backend.workers.main._heavy_window_bounds",
        lambda now: (_ for _ in ()).throw(AssertionError("not supervised")))

    cx = _Cx()
    engine = type("E", (), {"connect": lambda s: cx})()
    monkeypatch.setattr(preroute, "_engine", lambda: engine)
    import backend.its.solver.modeling_layer as ml
    monkeypatch.setattr(ml, "model_problem", lambda t: _Result())
    monkeypatch.setattr(preroute, "BATCH", 2)
    monkeypatch.setattr(preroute, "SLEEP_S", 0)

    report = preroute.run(limit=4)
    assert report["processed"] == 4


# --------------------------------------------------------------------------- #
# 4. CLI: exit 2 outside the window; --force-window bypasses
# --------------------------------------------------------------------------- #
def test_cli_exits_2_outside_window(monkeypatch):
    monkeypatch.setenv("SOLVER_LLM_MODE", "off")
    monkeypatch.delenv("WORKER_ALLOW_HEAVY", raising=False)
    monkeypatch.setattr(
        "backend.workers.main._heavy_window_bounds", _closed_bounds)
    monkeypatch.setattr(sys, "argv", ["preroute", "--shard", "0123"])
    with pytest.raises(SystemExit) as ei:
        preroute.main()
    assert ei.value.code == 2


def test_cli_force_window_bypasses(monkeypatch, tmp_path):
    monkeypatch.setenv("SOLVER_LLM_MODE", "off")
    monkeypatch.delenv("WORKER_ALLOW_HEAVY", raising=False)
    monkeypatch.setattr(
        "backend.workers.main._heavy_window_bounds", _closed_bounds)

    ran = {}
    monkeypatch.setattr(preroute, "run",
                        lambda limit=None, shard=None, force_window=False:
                        ran.update(limit=limit, shard=shard,
                                   force_window=force_window) or {"ok": 1})
    monkeypatch.setattr(sys, "argv",
                        ["preroute", "--force-window", "--limit", "10"])
    preroute.main()
    assert ran == {"limit": 10, "shard": None, "force_window": True}


# --------------------------------------------------------------------------- #
# 5. queue path: bank_preroute stays a HEAVY kind and _guard_heavy defers
# --------------------------------------------------------------------------- #
def test_bank_preroute_is_heavy_kind():
    from backend.workers import main as W
    assert "bank_preroute" in W.HEAVY_KINDS


def test_guard_heavy_defers_preroute_outside_window(monkeypatch):
    from backend.workers import main as W
    deferred = {}
    monkeypatch.setattr(
        W, "_heavy_window_bounds",
        _closed_bounds)
    monkeypatch.setattr(W.jobs, "defer",
                        lambda jid, ts, note="": deferred.update(
                            jid=jid, ts=ts, note=note))
    ok = W._guard_heavy("bank_preroute", "bank_preroute-test-1")
    assert ok is False
    assert deferred["jid"] == "bank_preroute-test-1"
    assert deferred["note"].startswith("[deferred: heavy window")
    assert deferred["ts"].hour == 2  # next window start


def test_guard_heavy_runs_preroute_inside_window(monkeypatch):
    from backend.workers import main as W
    monkeypatch.setattr(
        W, "_heavy_window_bounds",
        lambda now: (True, now))
    monkeypatch.setattr(W.jobs, "defer",
                        lambda *a, **k: (_ for _ in ()).throw(
                            AssertionError("must not defer inside window")))
    assert W._guard_heavy("bank_preroute", "bank_preroute-test-2") is True
