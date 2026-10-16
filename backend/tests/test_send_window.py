"""test_send_window.py -- FOOLPROOF-MESSAGING window guards (workers.main).

Covers:
  1. digest kinds are MESSAGE sends: NOT in HEAVY_KINDS, IN SEND_KINDS
  2. _guard_send_window defers outside 18:00-21:00 IST and runs inside
  3. deferral uses jobs.defer with the next window start (id preserved,
     no burn — the deterministic daily id must survive to the window)
  4. heavy kinds unaffected by the send guard, send kinds unaffected by
     the heavy guard (the two windows are independent)
  5. boot warm watchdog (_run_warm_bounded in main.py) — bounded join,
     degraded continuation (import-level test; no server boot)
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

from datetime import datetime, timezone, timedelta

IST = timezone(timedelta(hours=5, minutes=30))


def _main():
    import importlib
    import workers.main as W
    importlib.reload(W)
    return W


def test_digest_kinds_are_sends_not_heavy():
    W = _main()
    for k in ("weekly_digest", "daily_nudge", "renewal_notice"):
        assert k not in W.HEAVY_KINDS, f"{k} must leave HEAVY_KINDS"
        assert k in W.SEND_KINDS, f"{k} must be in SEND_KINDS"
    assert "content_reindex" in W.HEAVY_KINDS
    assert "embed_rebuild" in W.HEAVY_KINDS
    assert not (W.SEND_KINDS & W.HEAVY_KINDS), "windows must not overlap kinds"


def test_send_window_open_inside_ist_evening(monkeypatch):
    W = _main()
    # 19:00 IST -> inside 18:00-21:00
    now = datetime(2026, 10, 5, 13, 30, tzinfo=timezone.utc)  # 19:00 IST
    open_now, nxt = W._window_bounds(now.astimezone(IST), W.SEND_WINDOW_IST)
    assert open_now and nxt == now.astimezone(IST)


def test_send_window_defers_outside(monkeypatch):
    W = _main()
    deferred = {}
    monkeypatch.setattr(W.jobs, "defer",
                        lambda jid, ts, note="": deferred.update(
                            jid=jid, ts=ts, note=note))
    # 10:00 IST -> outside; next start = today 18:00 IST
    now = datetime(2026, 10, 5, 4, 30, tzinfo=timezone.utc)  # 10:00 IST
    ok = W._guard_send_window("daily_nudge", "daily_nudge-20261005")
    assert ok is False
    assert deferred["jid"] == "daily_nudge-20261005"
    assert deferred["note"].startswith("[deferred: send window")
    assert deferred["ts"].astimezone(IST).hour == 18


def test_send_window_runs_inside(monkeypatch):
    W = _main()
    now = datetime(2026, 10, 5, 13, 30, tzinfo=timezone.utc)  # 19:00 IST
    monkeypatch.setattr(W, "_ist_now", lambda: now.astimezone(IST))
    assert W._guard_send_window("weekly_digest", "weekly_digest-x") is True


def test_heavy_kinds_untouched_by_send_guard(monkeypatch):
    W = _main()
    # content_reindex at 10:00 IST: send guard must NOT block it
    monkeypatch.setattr(W, "_ist_now",
                        lambda: datetime(2026, 10, 5, 4, 30,
                                         tzinfo=timezone.utc).astimezone(IST))
    assert W._guard_send_window("content_reindex", "x") is True


def test_send_kinds_unaffected_by_heavy_guard(monkeypatch):
    W = _main()
    # weekly_digest outside the HEAVY window: heavy guard passes (it's not
    # a heavy kind anymore); the send guard owns its fate.
    called = {}
    monkeypatch.setattr(W.jobs, "defer",
                        lambda *a, **k: called.setdefault("deferred", True))
    monkeypatch.setattr(W, "ALLOW_HEAVY_NOW", False)
    assert W._guard_heavy("weekly_digest", "j1") is True
    assert not called
    # while an actual heavy kind outside the heavy window still defers
    assert W._guard_heavy("content_reindex", "j2") is False
    assert called.get("deferred") is True


def test_warm_watchdog_exists_and_bounds():
    # source-read (no import): main.py's lifespan must define the bounded
    # warm runner — a sleeping warm is abandoned, never blocks forever.
    # (Importing backend.main here would couple this test to every other
    # service's import health; the source contract is the guarantee.)
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    src = open(os.path.join(root, "main.py"), encoding="utf-8").read()
    assert "def _run_warm_bounded" in src
    assert "th.join(timeout_s)" in src
    assert "ABANDONED" in src
    # every warm step must go through the bounded runner
    for step in ("_warm_nodes", "_warm_model", "_warm_engine",
                 "_warm_semantic_qa", "_warm_question_selector"):
        assert f"_run_warm_bounded(" in src, "bounded runner missing"
        bare = src.count(f"\n    {step}()")
        assert bare == 0, f"{step} is still called unbounded"
