"""test_watch.py — probe logic, pass/fail rendering, honest SKIPPED list,
digest append, exit 7 on red. No running app required."""
import json
from datetime import datetime
from pathlib import Path

import common as C
import watch


CFG = {
    "endpoints": {"health": "http://localhost/api/health",
                  "frontend": "http://localhost:3001",
                  "dev_health": "http://127.0.0.1:8020/api/health"},
    "paths": {"watch": "harness/ops/watch", "digests": "harness/ops/digests"},
    "watch": {"latency_budget_ms": 2000, "reticle_dev_url": None,
              "api_probes": ["http://localhost/api/content/subjects?class=10"]},
}


def ok_fetcher(url, timeout=8.0):
    if url.endswith("/api/health"):
        return 200, json.dumps({"services": {"postgres": True, "redis": True}}), 0.05
    if "/api/" in url:
        return 200, '{"subjects": ["mathematics"]}' * 5, 0.03
    if "definitely-not-a-route" in url:
        return 404, "", 0.01
    return 200, ('<!DOCTYPE html><html><head><link rel="stylesheet" '
                 'href="/_next/static/css/abc.css"/></head><body>'
                 + "x" * 9000), 0.12


def broken_health_fetcher(url, timeout=8.0):
    if url.endswith("/api/health"):
        return 200, json.dumps({"services": {"postgres": False, "redis": True}}), 0.05
    return ok_fetcher(url, timeout)


def slow_fetcher(url, timeout=8.0):
    if url.endswith("/") or ":3001" in url:
        return 200, "<html>" + "y" * 9000, 3.5  # 3.5s — over budget
    return ok_fetcher(url, timeout)


def test_probes_all_green():
    probes = watch.probe_set(CFG, ok_fetcher)
    reds = [p for p in probes if not p.ok]
    assert not reds, [(p.name, p.detail) for p in reds]
    names = " ".join(p.name for p in probes)
    assert "backend /api/health" in names
    assert "static asset" in names
    assert "API GET" in names


def test_probe_red_on_service_false():
    probes = watch.probe_set(CFG, broken_health_fetcher)
    health = [p for p in probes if "api/health 200" in p.name]
    assert health and not health[0].ok


def test_probe_red_on_latency_budget():
    probes = watch.probe_set(CFG, slow_fetcher)
    lat = [p for p in probes if "latency" in p.name]
    assert lat and not lat[0].ok


def test_run_watch_exit_codes_and_honest_skips(tmp_path, monkeypatch):
    monkeypatch.setattr(C, "cfg_path", lambda cfg, key: tmp_path / key)
    md, code, out = watch.run_watch(CFG, ok_fetcher, now=datetime(2026, 10, 13, 2, 30))
    assert code == C.EXIT_OK
    assert "VERDICT: GREEN" in md
    assert "SKIPPED" in md and "Reticle" in md
    assert "Not runnable read-only" in md
    assert out.exists() and "2026-10-13-0230" in out.name

    md, code, _ = watch.run_watch(CFG, broken_health_fetcher,
                                  now=datetime(2026, 10, 13, 2, 31))
    assert code == C.EXIT_OPS_RED
    assert "VERDICT: RED" in md


def test_watch_appends_to_today_digest(tmp_path, monkeypatch):
    monkeypatch.setattr(C, "cfg_path", lambda cfg, key: tmp_path / key)
    dg = tmp_path / "digests" / "2026-10-13.md"
    dg.parent.mkdir(parents=True)
    dg.write_text("# Atlas digest — 2026-10-13\n", encoding="utf-8")
    watch.run_watch(CFG, ok_fetcher, now=datetime(2026, 10, 13, 2, 35))
    text = dg.read_text(encoding="utf-8")
    assert "watch 2026-10-13-0235" in text and "GREEN" in text


def test_install_print_contains_schtasks_in_window():
    text = watch.install_print()
    assert "schtasks" in text and "/ST 02:30" in text
    assert "harness.py watch" in text
