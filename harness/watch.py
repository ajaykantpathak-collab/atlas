"""watch.py — scheduled post-ship verification (READ-ONLY on production).

Replays the read-only GET subset of the verify-sweep checklist against
:3001/:80, plus latency budgets. The 10 Reticle flows run ONLY against a
configured dev FE (watch.reticle_dev_url) — never production (Reticle
writes session data). Sweep items that need login/writes are listed in the
report as NOT-RUNNABLE-READ-ONLY with reasons, honestly.

Writes harness/ops/watch/YYYY-MM-DD-HHMM.md and appends a summary line to
today's digest file if it exists. Exit 0 all green, 7 on any red.
"""
from __future__ import annotations

import argparse
import json
import re
from datetime import datetime
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional, Tuple

import common as C


class Probe:
    def __init__(self, name: str, ok: bool, detail: str):
        self.name, self.ok, self.detail = name, ok, detail


def probe_set(cfg: Dict[str, Any],
              fetcher: Callable[..., Tuple[int, str, float]]) -> List[Probe]:
    """The read-only GET probe set (verify-sweep items replayable without
    auth or writes) + latency budget."""
    probes: List[Probe] = []
    wcfg = cfg.get("watch", {})
    budget = wcfg.get("latency_budget_ms", 2000)
    fe = cfg["endpoints"]["frontend"]
    health = cfg["endpoints"]["health"]

    # P1 backend health via nginx: status + all services true (sweep #14)
    code, body, secs = fetcher(health, timeout=8.0)
    ok = code == 200
    services_ok = True
    if ok:
        try:
            svc = json.loads(body).get("services", {})
            services_ok = all(bool(v) for v in svc.values()) and bool(svc)
            ok = services_ok
        except json.JSONDecodeError:
            ok = False
    probes.append(Probe("backend /api/health 200 + all services true (sweep #14)",
                         ok, f"code={code} services={body[:120] if code==200 else body[:60]}"))

    # P2 landing: 200 + SSR shell sanity (sweep #1, GET-level)
    code, body, secs = fetcher(fe, timeout=8.0)
    shell_ok = code == 200 and "<html" in body.lower() and len(body) > 5000
    probes.append(Probe("landing GET 200 + SSR shell (sweep #1, read-only level)",
                         shell_ok, f"code={code} bytes={len(body)}"))

    # P3 landing latency budget (sweep #14: 8 key requests < 2s each)
    ms = round(secs * 1000) if secs >= 0 else -1
    probes.append(Probe(f"landing latency < {budget} ms", 0 <= ms < budget,
                        f"{ms} ms"))

    # P4 static asset loads (parse one _next/static link from the shell)
    m = re.search(r'href="(/_next/static/[^"]+)"', body) or \
        re.search(r'src="(/_next/static/[^"]+)"', body)
    if m:
        scode, _, ssecs = fetcher(fe + m.group(1), timeout=8.0)
        sms = round(ssecs * 1000) if ssecs >= 0 else -1
        probes.append(Probe("static asset 200 (Next build healthy)",
                             scode == 200, f"{m.group(1)[:60]} code={scode} {sms} ms"))
    else:
        probes.append(Probe("static asset 200 (Next build healthy)", False,
                            "no /_next/static asset reference found in shell"))

    # P5-P8 key API GETs (curriculum surface, public, read-only)
    for url in wcfg.get("api_probes", []):
        acode, abody, asecs = fetcher(url, timeout=8.0)
        aok = acode == 200 and len(abody) > 10
        ams = round(asecs * 1000) if asecs >= 0 else -1
        probes.append(Probe(f"API GET {url.replace('http://localhost', '')}",
                             aok and 0 <= ams < budget,
                             f"code={acode} bytes={len(abody)} {ams} ms"))

    # P9 nginx direct (:80 root) serves
    nginx = health.rsplit("/api", 1)[0] + "/"
    ncode, _, _ = fetcher(nginx, timeout=8.0)
    probes.append(Probe("nginx :80 root 200", ncode == 200, f"code={ncode}"))

    # P10 404 behaves (no 5xx on unknown route)
    f404, _, _ = fetcher(fe + "/definitely-not-a-route-404", timeout=8.0)
    probes.append(Probe("unknown FE route returns 4xx (no 5xx)",
                         400 <= f404 < 500, f"code={f404}"))

    # P11 dev backend (port 8020) — informational, never red (dev instance
    # is fleet property; its absence is not a production failure)
    dev_url = cfg["endpoints"].get("dev_health")
    if dev_url:
        dcode, dbody, _ = fetcher(dev_url, timeout=4.0)
        state = "UP" if dcode == 200 else "down"
        probes.append(Probe("dev instance :8020 (informational)", True,
                            f"{state} code={dcode}"))
    return probes


NOT_RUNNABLE = [
    ("sweep #2-#13 Playwright items (signup, dashboard, galaxy, story, "
     "practice, doubt, security, teacher, engagement, hindi, adaptive, "
     "chapter test)", "require login + writes — NOT read-only; run via "
     "verify-sweep skill manually after ships"),
    ("Reticle 10 flows", "write session data — never replayed against "
     "production; run only against a dev FE via watch.reticle_dev_url"),
]


def run_watch(cfg: Dict[str, Any],
              fetcher: Callable[..., Tuple[int, str, float]] = C.http_get,
              now: Optional[datetime] = None) -> Tuple[str, int, Path]:
    now = now or datetime.now()
    probes = probe_set(cfg, fetcher)

    reticle_url = cfg.get("watch", {}).get("reticle_dev_url")
    reticle = Probe("Reticle flows (dev FE)", False,
                    f"SKIPPED — no dev FE configured (reticle_dev_url=null); "
                    "never replayed against production") if not reticle_url else \
        Probe("Reticle flows (dev FE)", True, f"configured target {reticle_url} "
              "(owner must run npm run verify in deploy/frontend for the "
              "authoritative gate — ICE 1.1)")

    reds = [p for p in probes if not p.ok]
    stamp = now.strftime("%Y-%m-%d-%H%M")
    out_dir = C.cfg_path(cfg, "watch")
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{stamp}.md"

    lines = [f"# Atlas watch — {stamp}", "",
             f"**VERDICT: {'RED' if reds else 'GREEN'}** — "
             f"{len(probes) - len(reds)}/{len(probes)} probes green", "",
             "| probe | result | detail |", "|---|---|---|"]
    for p in probes:
        lines.append(f"| {p.name} | {'PASS' if p.ok else 'FAIL'} | {p.detail[:150]} |")
    lines.append(f"| {reticle.name} | SKIPPED | {reticle.detail} |")
    lines += ["", "## Not runnable read-only (honest list)", ""]
    for name, why in NOT_RUNNABLE:
        lines.append(f"- {name}: {why}")
    lines += ["", f"source: GET probes against {cfg['endpoints']['health']} "
              f"and {cfg['endpoints']['frontend']}; config harness/config.json"]
    md = "\n".join(lines) + "\n"
    out_path.write_text(md, encoding="utf-8")

    # append summary line to today's digest if it exists
    digest_path = C.cfg_path(cfg, "digests") / f"{now.strftime('%Y-%m-%d')}.md"
    if digest_path.exists():
        with open(digest_path, "a", encoding="utf-8") as fh:
            fh.write(f"\n> watch {stamp}: "
                     f"{'RED' if reds else 'GREEN'} "
                     f"({len(probes) - len(reds)}/{len(probes)} probes) — "
                     f"{out_path.name}\n")
    code = C.EXIT_OPS_RED if reds else C.EXIT_OK
    return md, code, out_path


def install_print() -> str:
    py = "python"
    cmd = (f'schtasks /Create /TN "AtlasHarnessWatch" /SC DAILY /ST 02:30 '
           f'/TR "cmd /c cd /d D:\\platform && {py} harness\\harness.py watch" /F')
    return ("\n[watch] owner runs this to register the nightly sweep "
            "(inside the 02:00-05:00 window):\n    " + cmd + "\n")


def main(argv: Optional[List[str]] = None) -> int:
    ap = argparse.ArgumentParser(prog="harness watch")
    ap.add_argument("--sweep", action="store_true",
                    help="full probe sweep (default behaviour; Playwright-only "
                         "checklist items are honestly listed NOT-RUNNABLE "
                         "read-only)")
    ap.add_argument("--install-print", action="store_true")
    args = ap.parse_args(argv)
    if args.install_print:
        print(install_print())
        return C.EXIT_OK
    cfg = C.load_config()
    md, code, out_path = run_watch(cfg)
    print(md)
    C.eprint(f"[watch] written to {out_path}; exit {code}")
    return code


if __name__ == "__main__":
    raise SystemExit(main())
