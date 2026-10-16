"""digest.py — daily one-screen health digest (READ-ONLY on production).

Command: python harness/harness.py digest [--date YYYY-MM-DD]

Writes harness/ops/digests/YYYY-MM-DD.md, prints it, exits 0 (HEALTHY or
DEGRADED) or 7 (ACTION NEEDED — any threshold red). Section order is law:

    Verdict / Serving / Solver quality (24 h) / Errors / Change loop /
    Capacity / Backup

Every table names its real source path underneath it. No POSTs, no writes
anywhere outside harness/ops/.
"""
from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional, Tuple

import common as C

SECTIONS = ["Serving", "Solver quality (24 h)", "Errors", "Change loop",
            "Capacity", "Backup"]

_ERR_RX = re.compile(r"Traceback|\bERROR\b")


# --------------------------------------------------------------------------- #
# Collectors (pure; file/system IO injected by the caller in tests)
# --------------------------------------------------------------------------- #
def collect_telemetry(path: Path, since: datetime) -> Dict[str, Any]:
    """24h solver stats from the answer-telemetry JSONL."""
    if not path.exists():
        return {"unreachable": True, "source": str(path)}
    n = ref = ver = 0
    lat: List[float] = []
    reasons: Dict[str, int] = {}
    for row in C.stream_jsonl(path):
        ts = C.parse_utc(row.get("ts", ""))
        if ts is None or ts < since:
            continue
        n += 1
        rr = row.get("refusal_reason")
        if rr:
            ref += 1
            reasons[str(rr)] = reasons.get(str(rr), 0) + 1
        label = str(row.get("label") or "")
        if label.startswith("VERIFIED"):
            ver += 1
        lm = row.get("latency_ms")
        if isinstance(lm, (int, float)):
            lat.append(float(lm))
    lat.sort()
    p50 = lat[len(lat) // 2] if lat else 0.0
    p95 = lat[int(len(lat) * 0.95)] if lat else 0.0
    return {
        "source": str(path),
        "total": n,
        "refusals": ref,
        "refusal_rate_pct": round(100.0 * ref / n, 1) if n else None,
        "verified_share_pct": round(100.0 * ver / n, 1) if n else None,
        "p50_ms": round(p50), "p95_ms": round(p95),
        "top_refusals": sorted(reasons.items(), key=lambda kv: -kv[1])[:5],
    }


def collect_error_lines(logs: List[Tuple[str, str]],
                        benign: List[str]) -> Dict[str, Any]:
    """Count Traceback/ERROR lines across (name, text) log sources."""
    hits: List[Tuple[str, str]] = []
    for name, text in logs:
        for line in text.splitlines():
            if not _ERR_RX.search(line):
                continue
            if any(b in line for b in benign):
                continue
            hits.append((name, line.strip()[:160]))
    return {"count": len(hits), "first3": hits[:3],
            "sources_read": [n for n, _ in logs]}


def collect_change_loop(receipts_dir: Path, corpus_path: Path,
                        now: datetime) -> Dict[str, Any]:
    states: Dict[str, int] = {}
    rework_wis: List[str] = []
    gate_catches = 0
    week_ago = now - timedelta(days=7)
    if receipts_dir.exists():
        for wi_dir in sorted(receipts_dir.iterdir()):
            if not wi_dir.is_dir():
                continue
            state = "INTAKE"
            wi_json = wi_dir / "wi.json"
            if wi_json.exists():
                try:
                    state = json.loads(wi_json.read_text(encoding="utf-8")).get("state", "INTAKE")
                except (json.JSONDecodeError, OSError):
                    pass
                if wi_json.exists():
                    try:
                        if json.loads(wi_json.read_text(encoding="utf-8")).get("rework_count", 0):
                            rework_wis.append(wi_dir.name)
                    except (json.JSONDecodeError, OSError):
                        pass
            states[state] = states.get(state, 0) + 1
            for rc in wi_dir.glob("*.json"):
                if rc.name in ("wi.json", "judge_verdict.json", "soak_report.json"):
                    continue
                try:
                    doc = json.loads(rc.read_text(encoding="utf-8"))
                except (json.JSONDecodeError, OSError):
                    continue
                ts = C.parse_utc(doc.get("ts_utc", ""))
                if ts is None or ts < week_ago:
                    continue
                for g in doc.get("gates", []) or []:
                    if g.get("ok") is False:
                        gate_catches += 1
    statuses = {"red": 0, "green": 0, "parked": 0}
    total_cases = 0
    if corpus_path.exists():
        for case in C.stream_jsonl(corpus_path):
            total_cases += 1
            st = case.get("status", "red")
            if st in statuses:
                statuses[st] += 1
    return {
        "open_by_state": states, "rework_wis": rework_wis,
        "gate_catches_7d": gate_catches,
        "corpus_total": total_cases, "corpus": statuses,
        "sources": [str(receipts_dir), str(corpus_path)],
    }


def collect_backup(backups_dir: Path, now: datetime) -> Dict[str, Any]:
    best: Optional[Path] = None
    best_ts: Optional[datetime] = None
    manifest: Dict[str, Any] = {}
    if backups_dir.exists():
        for man in backups_dir.glob("*/manifest.json"):
            try:
                doc = json.loads(man.read_text(encoding="utf-8"))
            except (json.JSONDecodeError, OSError):
                continue
            ts = C.parse_utc(doc.get("ts_utc", ""))
            if ts is not None and (best_ts is None or ts > best_ts):
                best, best_ts, manifest = man, ts, doc
    if best is None or best_ts is None:
        return {"exists": False, "source": f"{backups_dir}/*/manifest.json"}
    age_h = (now - best_ts).total_seconds() / 3600.0
    return {
        "exists": True, "manifest": str(best),
        "manifest_sha256": C.sha256_file(best),
        "ts_utc": manifest.get("ts_utc"), "age_hours": round(age_h, 1),
        "engine": manifest.get("engine"),
        "db_dump": manifest.get("db_dump"),
        "source": f"{backups_dir}/*/manifest.json",
    }


# --------------------------------------------------------------------------- #
# Gather + render
# --------------------------------------------------------------------------- #
def gather(cfg: Dict[str, Any], *, fetcher: Callable[..., Tuple[int, str, float]] = C.http_get,
           docker_reader: Optional[Callable[..., Optional[str]]] = C.docker_logs,
           telemetry_path: Optional[Path] = None, now: Optional[datetime] = None,
           disk_pct: Optional[float] = None, rss_mb: Optional[float] = ...) -> Dict[str, Any]:
    now = now or C.now_utc()
    th = cfg["thresholds"]
    since = now - timedelta(hours=24)

    # --- Serving -----------------------------------------------------------
    code, body, secs = fetcher(cfg["endpoints"]["health"], timeout=8.0)
    services: Dict[str, bool] = {}
    health_ok = code == 200
    if health_ok:
        try:
            services = json.loads(body).get("services", {}) or {}
            health_ok = bool(services.get("postgres"))
        except json.JSONDecodeError:
            health_ok = False
    fcode, _, fsecs = fetcher(cfg["endpoints"]["frontend"], timeout=8.0)
    fe_ok = fcode == 200
    serving = {
        "health_url": cfg["endpoints"]["health"], "health_code": code,
        "health_ms": round(secs * 1000) if secs >= 0 else -1,
        "services": services,
        "frontend_url": cfg["endpoints"]["frontend"], "frontend_code": fcode,
        "frontend_ms": round(fsecs * 1000) if fsecs >= 0 else -1,
        "ok": health_ok and fe_ok,
    }

    # --- Solver quality ----------------------------------------------------
    tel = collect_telemetry(
        telemetry_path or C.cfg_path(cfg, "telemetry"), since)

    # --- Errors ------------------------------------------------------------
    logs: List[Tuple[str, str]] = []
    unreachable_logs: List[str] = []
    for src in cfg.get("log_sources", []):
        if src["type"] == "file":
            text = C.read_file_tail(C.ROOT / src["path"], src.get("max_bytes", 20_000_000))
        else:  # docker
            text = docker_reader(src["container"], src.get("since", "24h"), src.get("tail", 20000)) if docker_reader else None
        if text is None:
            unreachable_logs.append(src["name"])
            continue
        logs.append((src["name"], text))
    errors = collect_error_lines(logs, cfg.get("benign_log_patterns", []))
    errors["unreachable_sources"] = unreachable_logs
    errors["sources"] = [s["name"] + (f" (file {s.get('path')})" if s["type"] == "file" else f" (docker {s['container']})")
                         for s in cfg.get("log_sources", [])]

    # --- Change loop -------------------------------------------------------
    loop = collect_change_loop(C.cfg_path(cfg, "receipts"),
                               C.cfg_path(cfg, "corpus_cases"), now)

    # --- Capacity ----------------------------------------------------------
    if disk_pct is None:
        disk_pct = C.disk_free_pct()
    if rss_mb is ...:
        rss_mb = C.find_uvicorn_rss_mb()
    capacity = {"disk_free_pct": disk_pct, "rss_mb": rss_mb,
                "sources": ["shutil.disk_usage(D:\\)", "psutil (uvicorn :8020 cmdline scan)"]}

    # --- Backup ------------------------------------------------------------
    backup = collect_backup(C.cfg_path(cfg, "backups"), now)

    # --- Threshold checks --------------------------------------------------
    checks: List[C.Check] = []
    if tel.get("unreachable"):
        pass
    else:
        if tel["refusal_rate_pct"] is not None:
            checks.append(C.check_max("refusal_rate", tel["refusal_rate_pct"],
                                      th["refusal_rate_pct_max"], "%"))
        checks.append(C.check_max("p95_elapsed_ms", tel["p95_ms"], th["p95_ms_max"], "ms"))
    checks.append(C.check_max("error_lines_24h", errors["count"], th["error_lines_max"]))
    checks.append(C.check_min("disk_free", capacity["disk_free_pct"], th["disk_free_pct_min"], "%"))
    if backup.get("exists"):
        checks.append(C.check_max("backup_age_h", backup["age_hours"],
                                  th["backup_age_hours_max"], "h"))
    else:
        checks.append(C.Check("backup_age", "never (no backup found)",
                              th["backup_age_hours_max"], True, "h", "max"))

    reds = [c for c in checks if c.red]
    ambers = []
    if not serving["ok"]:
        ambers.append("serving probe failed")
    if tel.get("unreachable"):
        ambers.append(f"telemetry unreachable: {tel.get('source')}")
    if errors["unreachable_sources"]:
        ambers.append("log sources unreachable: " + ", ".join(errors["unreachable_sources"]))
    if reds:
        verdict = "ACTION NEEDED"
    elif ambers:
        verdict = "DEGRADED"
    else:
        verdict = "HEALTHY"

    return {"now": now, "verdict": verdict, "checks": checks, "reds": reds,
            "ambers": ambers, "serving": serving, "telemetry": tel,
            "errors": errors, "loop": loop, "capacity": capacity,
            "backup": backup}


def render(g: Dict[str, Any], date_str: str) -> str:
    out: List[str] = []
    A = out.append
    A(f"# Atlas digest — {date_str}")
    A("")
    A(f"**VERDICT: {g['verdict']}** — {len(g['reds'])} red / "
      f"{len(g['checks']) - len(g['reds'])} green threshold checks"
      + (f"; ambers: {'; '.join(g['ambers'])}" if g['ambers'] else ""))
    A("")

    s = g["serving"]
    A("## Serving")
    A("| probe | status | ms |")
    A("|---|---|---|")
    A(f"| GET {s['health_url']} | {s['health_code']} | {s['health_ms']} |")
    A(f"| GET {s['frontend_url']} | {s['frontend_code']} | {s['frontend_ms']} |")
    A("")
    svc = ", ".join(f"{k}: {'true' if v else 'FALSE'}" for k, v in s["services"].items()) or "(no services json)"
    A(svc)
    A(f"\nsource: GET {s['health_url']}; GET {s['frontend_url']}")

    t = g["telemetry"]
    A("\n## Solver quality (24 h)")
    if t.get("unreachable"):
        A(f"UNREACHABLE — {t.get('source')}")
    else:
        A("| metric | value |")
        A("|---|---|")
        A(f"| total solves | {t['total']} |")
        A(f"| refusal rate | {t['refusal_rate_pct']}% |")
        A(f"| VERIFIED share | {t['verified_share_pct']}% |")
        A(f"| p50 elapsed | {t['p50_ms']} ms |")
        A(f"| p95 elapsed | {t['p95_ms']} ms |")
        A("\ntop refusal reasons (top 5):")
        for reason, cnt in t["top_refusals"]:
            A(f"- {cnt}× {reason[:110]}")
        A(f"\nsource: {t['source']} (window last 24 h from {C.iso_utc(g['now'])})")

    e = g["errors"]
    A("\n## Errors")
    A(f"Traceback/ERROR lines in 24 h (benign-filtered): **{e['count']}**")
    for name, line in e["first3"]:
        A(f"- `[{name}]` {line}")
    if e.get("unreachable_sources"):
        A(f"- unreachable sources (not counted): {', '.join(e['unreachable_sources'])}")
    A(f"\nsource: {'; '.join(e['sources'])}")

    lp = g["loop"]
    A("\n## Change loop")
    A("| state | work items |")
    A("|---|---|")
    if lp["open_by_state"]:
        for st in sorted(lp["open_by_state"]):
            A(f"| {st} | {lp['open_by_state'][st]} |")
    else:
        A("| (none) | 0 |")
    A("")
    A(f"REWORK counts: {len(lp['rework_wis'])} work item(s)"
      + (f" ({', '.join(lp['rework_wis'])})" if lp["rework_wis"] else ""))
    A(f"corpus: {lp['corpus_total']} cases "
      f"(red {lp['corpus']['red']} / green {lp['corpus']['green']} / parked {lp['corpus']['parked']})")
    A(f"gate catches this week: {lp['gate_catches_7d']}")
    A(f"\nsource: {'; '.join(lp['sources'])}")

    cap = g["capacity"]
    A("\n## Capacity")
    A(f"| host disk free (D:\\) | {cap['disk_free_pct']}% |")
    rss = cap["rss_mb"]
    A(f"| dev uvicorn RSS (port 8020) | {rss} MB |" if rss is not None
      else "| dev uvicorn RSS (port 8020) | not running |")
    A(f"\nsource: {'; '.join(cap['sources'])}")

    b = g["backup"]
    A("\n## Backup")
    if b.get("exists"):
        A(f"last successful backup: {b['ts_utc']} (age {b['age_hours']} h, engine {b['engine']})")
        A(f"manifest: `{b['manifest']}` sha256 `{b['manifest_sha256']}`")
    else:
        A("last successful backup: NONE")
    A(f"\nsource: {b['source']}")

    A("\n## Thresholds")
    for c in g["checks"]:
        A(f"- {c.render()}")
    return "\n".join(out) + "\n"


def run_digest(cfg: Dict[str, Any], date_str: Optional[str] = None,
               injections: Optional[Dict[str, Any]] = None) -> Tuple[str, int]:
    inj = dict(injections or {})
    g = gather(cfg, **{k: v for k, v in inj.items() if k in
                       ("fetcher", "docker_reader", "telemetry_path", "now",
                        "disk_pct", "rss_mb")})
    date_str = date_str or g["now"].astimezone().strftime("%Y-%m-%d")
    md = render(g, date_str)
    out_path = C.cfg_path(cfg, "digests") / f"{date_str}.md"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(md, encoding="utf-8")
    exit_code = C.EXIT_OPS_RED if g["verdict"] == "ACTION NEEDED" else C.EXIT_OK
    g["_out_path"] = str(out_path)
    return md, exit_code


def main(argv: Optional[List[str]] = None) -> int:
    ap = argparse.ArgumentParser(prog="harness digest")
    ap.add_argument("--date", default=None, help="names the output file")
    args = ap.parse_args(argv)
    cfg = C.load_config()
    md, code = run_digest(cfg, args.date)
    print(md)
    C.eprint(f"[digest] written; verdict exit code {code}")
    return code


if __name__ == "__main__":
    raise SystemExit(main())
