"""soak.py — SOAK spec (§9 / G10). Boot (or reuse) the dev instance on 8020,
parity replay, load replay over worst-refusal stems, RSS ceiling, log scan,
teardown of only the process soak booted. Any threshold breach -> red."""
from __future__ import annotations

import asyncio
import json
import random
import re
import subprocess
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import common as C

BENIGN_DEFAULT = ["Expected background thread exit", "Timing: AsyncClient"]


async def _load_replay(base_url: str, stems: List[str], users: int,
                       duration_s: int) -> Dict[str, Any]:
    import httpx
    latencies: List[float] = []
    errors = 0
    total = 0
    consecutive_5xx = 0
    worst_streak = 0
    stop_at = time.time() + duration_s

    async def worker(client: httpx.AsyncClient, seed: int):
        nonlocal errors, total, consecutive_5xx, worst_streak
        rng = random.Random(seed)
        while time.time() < stop_at:
            q = stems[rng.randrange(len(stems))]
            total += 1
            t0 = time.perf_counter()
            try:
                r = await client.post(
                    f"{base_url}/api/practice/deterministic/solve",
                    json={"text": q}, timeout=70.0)
                latencies.append((time.perf_counter() - t0) * 1000)
                if r.status_code >= 500:
                    consecutive_5xx += 1
                    worst_streak = max(worst_streak, consecutive_5xx)
                elif r.status_code < 400:
                    consecutive_5xx = 0
                else:
                    errors += 1
            except Exception:
                errors += 1
                latencies.append((time.perf_counter() - t0) * 1000)

    async with httpx.AsyncClient() as client:
        await asyncio.gather(*[worker(client, i) for i in range(users)])
    lat = sorted(latencies)
    p50 = lat[len(lat) // 2] if lat else 0
    p95 = lat[int(len(lat) * 0.95)] if lat else 0
    mx = lat[-1] if lat else 0
    return {"total": total, "errors": errors,
            "error_rate": round(errors / max(total, 1), 4),
            "p50_ms": round(p50), "p95_ms": round(p95), "max_ms": round(mx),
            "worst_5xx_streak": worst_streak}


def _kill_pid(pid: Optional[int]) -> None:
    if pid is None:
        return
    try:
        subprocess.run(["taskkill", "/PID", str(pid), "/F", "/T"],
                       capture_output=True, timeout=30)
    except Exception:
        pass


def _rss_mb(pid: Optional[int]) -> float:
    try:
        import psutil
        p = psutil.Process(pid)
        return p.memory_info().rss / (1024 * 1024)
    except Exception:
        # fall back: scan for the uvicorn on 8020
        return C.find_uvicorn_rss_mb() or 0.0


def _scan_log(text: str, benign: List[str]) -> List[str]:
    hits = []
    for line in text.splitlines():
        if re.search(r"Traceback|\bERROR\b", line):
            if not any(b in line for b in benign):
                hits.append(line.strip()[:160])
    return hits


def run_soak(cfg: Dict[str, Any], wi: str) -> Dict[str, Any]:
    t_start = time.time()
    scfg = cfg["soak"]
    dev = cfg["endpoints"]["dev_health"]
    base = dev.rsplit("/api/health", 1)[0]
    wi_dir = C.cfg_path(cfg, "receipts") / wi
    wi_dir.mkdir(parents=True, exist_ok=True)
    boot_log_path = wi_dir / "logs" / "soak_boot.log"
    booted_pid: Optional[int] = None
    reused = False

    # 1. boot (or reuse a healthy instance — never kill one we didn't boot)
    code, body, _ = C.http_get(dev, timeout=12.0)
    if not (code == 200 and '"postgres":true' in body.replace(" ", "")):
        bash = C.find_bash()
        if not bash:
            return _red(cfg, wi, "bash not on PATH; cannot boot dev instance")
        boot_log_path.parent.mkdir(parents=True, exist_ok=True)
        with open(boot_log_path, "wb") as lf:
            proc = subprocess.Popen(
                [bash, str(C.ROOT / "_work" / "overhaul" / "boot_dev.sh")],
                cwd=str(C.ROOT), stdout=lf, stderr=subprocess.STDOUT,
                env={**__import__("os").environ, "PYTHONUNBUFFERED": "1"})
        booted_pid = proc.pid
        deadline = time.time() + scfg["boot_wait_s"]
        while time.time() < deadline:
            code, body, _ = C.http_get(dev, timeout=12.0)
            if code == 200 and '"postgres":true' in body.replace(" ", ""):
                break
            if proc.poll() is not None:
                _kill_pid(booted_pid)
                return _red(cfg, wi, "dev instance died during soak boot")
            time.sleep(5)
        else:
            # boot budget exhausted — kill what we booted (never leak it)
            _kill_pid(booted_pid)
            return _red(cfg, wi, f"dev instance not healthy after "
                                 f"{scfg['boot_wait_s']}s (booted pid killed)")
    else:
        reused = True
        boot_log_path.write_text("(reused already-healthy dev instance)\n",
                                 encoding="utf-8")

    # pid for RSS sampling: booted pid or scan for uvicorn on 8020
    rss_pid = booted_pid
    try:
        values: Dict[str, Any] = {"reused_instance": reused,
                                  "booted_pid": booted_pid}
        # 2. parity replay (LLM off)
        out = wi_dir / "logs" / "soak_parity.json"
        proc = subprocess.run(
            [__import__("sys").executable,
             str(C.ROOT / "_work" / "overhaul" / "wsb_m2_parity.py"), str(out)],
            cwd=str(C.ROOT), capture_output=True, text=True, timeout=600,
            env={**{k: v for k, v in __import__("os").environ.items()
                    if k not in ("FREELLM_API_KEY", "GEMINI_API_KEY",
                                 "GROQ_API_KEY")},
                 "SOLVER_LLM_MODE": "off", "PYTHONUNBUFFERED": "1"})
        parity_ok = proc.returncode == 0 and out.exists()
        matched = base_matched = None
        if parity_ok:
            doc = json.loads(out.read_text(encoding="utf-8"))
            matched = sum(1 for v in doc.get("results", {}).values()
                          if v.get("structure"))
            bp = C.cfg_path(cfg, "parity_baseline")
            if bp.exists():
                base_matched = json.loads(
                    bp.read_text(encoding="utf-8")).get("matched")
                parity_ok = matched >= (base_matched or 0)
            # worst-refusal stems: unmatched ones (refusal-prone)
            stems = [s.get("question_text", "")
                     for s in json.load(open(C.ROOT / "_work" / "overhaul" /
                                            "sample_200.json",
                                            encoding="utf-8"))]
            unmatched_ids = {k for k, v in doc.get("results", {}).items()
                             if not v.get("structure")}
            sample = json.load(open(C.ROOT / "_work" / "overhaul" /
                                    "sample_200.json", encoding="utf-8"))
            hard = [s["question_text"] for s in sample
                    if s.get("id") in unmatched_ids and s.get("question_text")]
            stems = hard or [s.get("question_text", "") for s in sample
                             if s.get("question_text")]
        else:
            stems = [s.get("question_text", "")
                     for s in json.load(open(C.ROOT / "_work" / "overhaul" /
                                            "sample_200.json",
                                            encoding="utf-8"))
                     if s.get("question_text")]
        values["parity"] = {"ok": parity_ok, "matched": matched,
                            "baseline": base_matched}

        # 3. load replay
        load = asyncio.run(_load_replay(base, stems, scfg["users"],
                                        scfg["duration_s"]))
        values["load"] = load

        # 4. RSS samples
        rss_samples = []
        deadline = time.time() + 30
        while time.time() < deadline and len(rss_samples) < 3:
            rss_samples.append(round(_rss_mb(rss_pid), 1))
            time.sleep(scfg.get("sample_secs", 10))
        values["rss_mb_samples"] = rss_samples
        peak_rss = max(rss_samples) if rss_samples else 0.0

        # 5. log scan
        try:
            log_text = boot_log_path.read_text(encoding="utf-8",
                                               errors="replace")
        except OSError:
            log_text = ""
        bad_lines = _scan_log(log_text, cfg.get("benign_log_patterns",
                                                BENIGN_DEFAULT))
        values["log_errors"] = bad_lines[:5]

        thresholds = {
            "parity_ge_baseline": parity_ok,
            "error_rate_lt_1pct": load["error_rate"] < scfg["error_rate_max"],
            "p95_lt_cap_ms": load["p95_ms"] < scfg["p95_ms_max"],
            "no_5xx_storm": load["worst_5xx_streak"] <= scfg["consecutive_5xx_max"],
            "rss_lt_ceiling": peak_rss < scfg["rss_gb_max"] * 1024,
            "logs_clean": not bad_lines,
        }
        all_green = all(thresholds.values())
        report = {"ts_utc": C.iso_utc(), "work_item": wi,
                  "all_green": all_green, "thresholds": thresholds,
                  "values": values,
                  "wall_seconds": round(time.time() - t_start, 1),
                  "report_path": str(wi_dir / "soak_report.json")}
        return report
    finally:
        # 6. teardown: kill ONLY the process soak booted (by PID, never name)
        if booted_pid is not None:
            try:
                subprocess.run(["taskkill", "/PID", str(booted_pid), "/F",
                                "/T"], capture_output=True, timeout=30)
            except Exception:
                pass


def _red(cfg: Dict[str, Any], wi: str, why: str) -> Dict[str, Any]:
    wi_dir = C.cfg_path(cfg, "receipts") / wi
    return {"ts_utc": C.iso_utc(), "work_item": wi, "all_green": False,
            "thresholds": {"boot": False}, "values": {"reason": why},
            "report_path": str(wi_dir / "soak_report.json")}
