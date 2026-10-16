"""test_digest.py — digest threshold logic, section order, sources, benign
filtering, exit codes. No running app required: HTTP + docker readers are
injected stubs; telemetry/logs are fixture files."""
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pytest

import common as C
import digest


NOW = datetime(2026, 10, 13, 14, 0, tzinfo=timezone.utc)


def make_cfg(tmp_path: Path, telemetry: Path, logs_file: Path,
             receipts: Path, corpus: Path, backups: Path) -> dict:
    return {
        "endpoints": {"health": "http://localhost/api/health",
                      "frontend": "http://localhost:3001",
                      "dev_health": "http://127.0.0.1:8020/api/health"},
        "paths": {"telemetry": str(telemetry), "receipts": str(receipts),
                  "corpus_cases": str(corpus), "backups": str(backups),
                  "digests": str(tmp_path / "digests")},
        "log_sources": [{"name": "fixture_log", "type": "file",
                         "path": str(logs_file), "max_bytes": 1000000}],
        "benign_log_patterns": ["Expected background thread exit"],
        "thresholds": {"refusal_rate_pct_max": 25.0, "p95_ms_max": 10000,
                       "error_lines_max": 5, "disk_free_pct_min": 15.0,
                       "backup_age_hours_max": 26},
    }


def ok_fetcher(url, timeout=8.0):
    if "health" in url:
        return 200, json.dumps({"status": "ok", "services": {
            "postgres": True, "redis": True, "qdrant": True}}), 0.04
    return 200, "<html>ok</html>", 0.02


def write_telemetry(path: Path, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        for r in rows:
            fh.write(json.dumps(r) + "\n")


def row(min_ago, label="VERIFIED", refusal=None, latency=1000.0):
    ts = (NOW - timedelta(minutes=min_ago)).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    return {"ts": ts, "surface": "solve", "label": label,
            "refusal_reason": refusal, "latency_ms": latency,
            "verified": label.startswith("VERIFIED")}


# --------------------------------------------------------------------------- #
# telemetry collector
# --------------------------------------------------------------------------- #
def test_telemetry_stats_exact(tmp_path):
    tel = tmp_path / "tel.jsonl"
    rows = (
        [row(1), row(2), row(3)]                                    # 3 verified
        + [row(4, "GUIDED_PRACTICE", "needs method", 2000)] * 2      # 2 refusals
        + [row(60 * 30)]                                             # outside 24h, ignored
    )
    write_telemetry(tel, rows)
    st = digest.collect_telemetry(tel, NOW - timedelta(hours=24))
    assert st["total"] == 5
    assert st["refusals"] == 2
    assert st["refusal_rate_pct"] == 40.0
    assert st["verified_share_pct"] == 60.0
    assert st["top_refusals"] == [("needs method", 2)]
    # latencies: 3x1000, 2x2000 -> p50=1000 p95=2000
    assert st["p50_ms"] == 1000 and st["p95_ms"] == 2000


def test_telemetry_missing_file(tmp_path):
    st = digest.collect_telemetry(tmp_path / "nope.jsonl", NOW)
    assert st.get("unreachable") is True


# --------------------------------------------------------------------------- #
# error lines + benign filtering
# --------------------------------------------------------------------------- #
def test_error_lines_benign_filtered():
    text = ("\n".join([
        "INFO: 127.0.0.1 - GET /api/health 200",
        "ERROR:    Expected background thread exit ...",   # benign
        "ERROR:    something exploded",                    # counted
        "Traceback (most recent call last):",              # counted
        "INFO: fine",
    ]))
    res = digest.collect_error_lines([("src", text)],
                                     ["Expected background thread exit"])
    assert res["count"] == 2
    assert len(res["first3"]) == 2


# --------------------------------------------------------------------------- #
# gather: thresholds, verdict, exit code
# --------------------------------------------------------------------------- #
def gather_with(tmp_path, tel_rows, log_text="", fetcher=ok_fetcher,
                disk=72.0, rss=None, corpus_rows=None, receipt_docs=None,
                backup_manifest=None):
    tel = tmp_path / "tel.jsonl"
    write_telemetry(tel, tel_rows)
    logs = tmp_path / "log.txt"
    logs.write_text(log_text, encoding="utf-8")
    receipts = tmp_path / "receipts"
    corpus = tmp_path / "cases.jsonl"
    if corpus_rows:
        corpus.parent.mkdir(parents=True, exist_ok=True)
        corpus.write_text("".join(json.dumps(r) + "\n" for r in corpus_rows),
                          encoding="utf-8")
    if receipt_docs:
        wi = receipts / "WI-1"
        wi.mkdir(parents=True, exist_ok=True)
        (wi / "wi.json").write_text(json.dumps(receipt_docs["wi"]), encoding="utf-8")
        (wi / "1_IMPLEMENT_VERIFY.json").write_text(
            json.dumps(receipt_docs["receipt"]), encoding="utf-8")
    backups = tmp_path / "backups"
    if backup_manifest:
        bdir = backups / "db-20261013-0300"
        bdir.mkdir(parents=True, exist_ok=True)
        (bdir / "manifest.json").write_text(json.dumps(backup_manifest), encoding="utf-8")
    cfg = make_cfg(tmp_path, tel, logs, receipts, corpus, backups)
    g = digest.gather(cfg, fetcher=fetcher, docker_reader=lambda *a, **k: None,
                      telemetry_path=tel, now=NOW, disk_pct=disk, rss_mb=rss)
    return g, cfg


def test_verdict_action_needed_and_exit_7(tmp_path, capsys):
    # refusal 40% (>25 RED), p95 high, no backup (RED), disk green
    g, cfg = gather_with(tmp_path, [row(1), row(2, "GUIDED_PRACTICE", "x", 30000)])
    assert g["verdict"] == "ACTION NEEDED"
    names = [c.name for c in g["reds"]]
    assert "refusal_rate" in names and "p95_elapsed_ms" in names and "backup_age" in names
    greens = [c.name for c in g["checks"] if not c.red]
    assert "disk_free" in greens and "error_lines_24h" in greens
    md, code = digest.run_digest(cfg, "2026-10-13", injections={
        "fetcher": ok_fetcher,
        "docker_reader": lambda *a, **k: None,
        "telemetry_path": tmp_path / "tel.jsonl", "now": NOW,
        "disk_pct": 72.0, "rss_mb": None})
    assert code == C.EXIT_OPS_RED
    out = capsys.readouterr()  # silence print side effects not needed; run_digest prints nothing
    assert "ACTION NEEDED" in md


def test_verdict_healthy_exit_0(tmp_path):
    g, cfg = gather_with(tmp_path, [row(1), row(2)],
                         backup_manifest={"ts_utc": "2026-10-13T01:00:00Z",
                                          "engine": "fixture"})
    assert g["verdict"] == "HEALTHY", g["reds"]
    assert all(not c.red for c in g["checks"])
    _, code = digest.run_digest(cfg, "2026-10-13", injections={
        "fetcher": ok_fetcher, "docker_reader": lambda *a, **k: None,
        "telemetry_path": tmp_path / "tel.jsonl", "now": NOW,
        "disk_pct": 72.0, "rss_mb": None})
    assert code == C.EXIT_OK


def test_degraded_on_unreachable_sources(tmp_path):
    def bad_fetcher(url, timeout=8.0):
        return -1, "ConnectionError", -1.0
    g, _ = gather_with(tmp_path, [row(1)], fetcher=bad_fetcher)
    # serving failed + telemetry fine + backup missing red => ACTION NEEDED
    assert g["verdict"] == "ACTION NEEDED"


def test_section_order_and_sources(tmp_path):
    g, cfg = gather_with(tmp_path, [row(1), row(2)],
                         backup_manifest={"ts_utc": "2026-10-13T01:00:00Z"})
    md = digest.render(g, "2026-10-13")
    order = ["## Serving", "## Solver quality (24 h)", "## Errors",
             "## Change loop", "## Capacity", "## Backup", "## Thresholds"]
    pos = [md.find(h) for h in order]
    assert all(p >= 0 for p in pos), md[:400]
    assert pos == sorted(pos), "section order violated"
    # every section names a source
    for sec in ["Serving", "Solver quality", "Errors", "Change loop",
                "Capacity", "Backup"]:
        block = md.split("## " + sec, 1)[1].split("\n## ", 1)[0]
        assert "source:" in block, f"{sec} missing source line"


def test_change_loop_counts(tmp_path):
    receipt = {"ts_utc": "2026-10-12T00:00:00Z",
               "gates": [{"id": "G5", "ok": True}, {"id": "G2", "ok": False}]}
    wi = {"state": "REWORK", "rework_count": 1}
    g, _ = gather_with(tmp_path, [row(1)], receipt_docs={"wi": wi, "receipt": receipt},
                       corpus_rows=[{"status": "red"}, {"status": "green"},
                                    {"status": "parked"}])
    assert g["loop"]["open_by_state"] == {"REWORK": 1}
    assert g["loop"]["rework_wis"] == ["WI-1"]
    assert g["loop"]["gate_catches_7d"] == 1
    assert g["loop"]["corpus_total"] == 3
    assert g["loop"]["corpus"] == {"red": 1, "green": 1, "parked": 1}


def test_backup_age_red_when_stale(tmp_path):
    g, _ = gather_with(tmp_path, [row(1)],
                       backup_manifest={"ts_utc": "2026-10-11T01:00:00Z"})  # ~61h old
    ages = [c for c in g["checks"] if c.name == "backup_age_h"]
    assert ages and ages[0].red
