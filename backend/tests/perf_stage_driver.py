"""perf_stage_driver.py — PERF agent (2026-10-03) controlled incremental load baseline.

Mission mix (per protocol):
  60% GET   pages/APIs  -> "/" (25%), /api/health (10%),
                           /api/content/subjects (15%), /learn (10%)
  25% POST  /api/practice/start (authed, 3 pre-created accounts, small bodies)
  15% POST  /api/practice/deterministic/solve (real bank questions via corpus)

Modes:
  warmup : 10 iterations over the key routes, per-iteration latency table
           (latency stabilization check before any load).
  stage  : N asyncio workers for S seconds against --base, per-endpoint
           p50/p75/p95/p99 + error rate + rps, JSON report, rolling
           error-rate abort guard (box protection).

Run inside dream-backend-1:
  PYTHONPATH=/app python backend/tests/perf_stage_driver.py warmup --base http://nginx
  PYTHONPATH=/app python backend/tests/perf_stage_driver.py stage \
      --base http://nginx --users 5 --seconds 60 --label stage1 \
      --json backend/tests/perf_results/stage1.json

Exit codes: 0 clean; 2 stop-condition tripped (p95>5s or err>1% steady);
            3 aborted (rolling error guard); 1 crashed.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import random
import sys
import time
from collections import defaultdict, deque
from pathlib import Path

import httpx

if __package__ in (None, ""):
    sys.path.insert(0, os.environ.get("PYTHONPATH_ROOT", "/app"))

from backend.harness.loadgen.corpus import random_question  # noqa: E402
from backend.harness.loadgen.percentiles import summarize  # noqa: E402

ACCOUNTS = [
    ("perf_baseline_1@example.com", "PerfTest!secure23"),
    ("perf_baseline_2@example.com", "PerfTest!secure23"),
    ("perf_baseline_3@example.com", "PerfTest!secure23"),
]

# endpoint label, path, weight, auth, timeout
GET_TARGETS = [
    ("GET /", "/", 25, False, 15.0),
    ("GET /api/health", "/api/health", 10, False, 15.0),
    ("GET /api/content/subjects", "/api/content/subjects", 15, False, 15.0),
    ("GET /learn", "/learn", 10, False, 15.0),
]
GET_WEIGHT_TOTAL = sum(t[2] for t in GET_TARGETS)  # 60

PRACTICE_SUBJECTS = ["mathematics", "science"]
SOLVE_TIMEOUT_S = 45.0

STOP_P95_MS = 5000.0
STOP_ERR_RATE = 0.01
ABORT_ROLLING_ERR = 0.25  # box-protection: rolling 100-request error rate
ABORT_ROLLING_N = 100


class Recorder:
    def __init__(self) -> None:
        self.rows: list = []  # (endpoint, ms, status, t_rel)
        self.rolling: deque = deque(maxlen=ABORT_ROLLING_N)

    def __call__(self, endpoint: str, ms: float, status: int, t_rel: float) -> None:
        self.rows.append((endpoint, ms, status, t_rel))
        self.rolling.append(0 if (0 <= status < 400) else 1)

    def rolling_err_rate(self) -> float:
        if not self.rolling:
            return 0.0
        return sum(self.rolling) / len(self.rolling)


def _ok(status: int) -> bool:
    return 0 <= status < 400


async def _timed(client, rec, endpoint, method, path, *, headers=None,
                 json_body=None, timeout=15.0, t0_run=0.0):
    t0 = time.perf_counter()
    try:
        resp = await client.request(method, path, headers=headers,
                                    json=json_body, timeout=timeout)
    except httpx.RequestError:
        rec(endpoint, (time.perf_counter() - t0) * 1000.0, -1,
            time.perf_counter() - t0_run)
        return None
    rec(endpoint, (time.perf_counter() - t0) * 1000.0, resp.status_code,
        time.perf_counter() - t0_run)
    return resp


async def _login(client, email: str, password: str):
    r = await client.post("/api/auth/login",
                          json={"email": email, "password": password},
                          timeout=20.0)
    r.raise_for_status()
    tok = (r.json() or {}).get("access_token")
    if not tok:
        raise RuntimeError(f"no access_token for {email}")
    return {"Authorization": f"Bearer {tok}"}


# --------------------------------------------------------------------------- #
# warmup mode
# --------------------------------------------------------------------------- #
async def do_warmup(base: str, iterations: int, out_path: str | None) -> int:
    rows = []
    headers_all = []
    async with httpx.AsyncClient(base_url=base, timeout=20.0,
                                 follow_redirects=True) as client:
        for email, pw in ACCOUNTS:
            headers_all.append(await _login(client, email, pw))

        warm_plan = [
            ("GET /", "GET", "/", None, 15.0),
            ("GET /api/health", "GET", "/api/health", None, 15.0),
            ("GET /api/content/subjects", "GET", "/api/content/subjects", None, 15.0),
            ("GET /learn", "GET", "/learn", None, 15.0),
            ("POST /api/practice/start", "POST", "/api/practice/start", "auth", 30.0),
            ("POST /api/practice/deterministic/solve", "POST",
             "/api/practice/deterministic/solve", "solve", SOLVE_TIMEOUT_S),
        ]
        for i in range(1, iterations + 1):
            for label, method, path, kind, tmo in warm_plan:
                headers = None
                body = None
                if kind == "auth":
                    headers = headers_all[i % len(headers_all)]
                    body = {"subject": PRACTICE_SUBJECTS[i % 2], "class_level": 10}
                elif kind == "solve":
                    q = random_question(random.Random(i))
                    body = {"text": q["text"], "node_id": q["node_id"]}
                t0 = time.perf_counter()
                try:
                    resp = await client.request(method, path, headers=headers,
                                                json=body, timeout=tmo)
                    ms = (time.perf_counter() - t0) * 1000.0
                    st = resp.status_code
                except httpx.RequestError as e:
                    ms = (time.perf_counter() - t0) * 1000.0
                    st = -1
                    print(f"  it{i} {label}: TRANSPORT ERROR {type(e).__name__}")
                rows.append({"iter": i, "endpoint": label, "ms": round(ms, 1),
                             "status": st})
                print(f"  it{i:<2} {label:<44} {ms:>8.1f} ms  http {st}")

    print("\nper-endpoint warm trajectory (ms):")
    by_ep: dict = defaultdict(list)
    for r in rows:
        by_ep[r["endpoint"]].append((r["iter"], r["ms"]))
    for ep, pts in by_ep.items():
        traj = " ".join(f"{ms:.0f}" for _, ms in pts)
        first_half = [ms for it, ms in pts if it <= len(pts) // 2]
        last_half = [ms for it, ms in pts if it > len(pts) // 2]
        print(f"  {ep:<44} {traj}")
        if first_half and last_half:
            print(f"      first-half mean {sum(first_half)/len(first_half):.0f} -> "
                  f"last-half mean {sum(last_half)/len(last_half):.0f}")
    if out_path:
        Path(out_path).parent.mkdir(parents=True, exist_ok=True)
        Path(out_path).write_text(json.dumps(rows, indent=1), encoding="utf-8")
        print(f"warmup rows -> {out_path}")
    return 0


# --------------------------------------------------------------------------- #
# stage mode
# --------------------------------------------------------------------------- #
async def do_stage(base: str, users: int, seconds: float, label: str,
                   think: float, out_path: str | None, seed: int | None) -> int:
    rec = Recorder()
    stop = asyncio.Event()
    started = time.perf_counter()

    async with httpx.AsyncClient(base_url=base, timeout=20.0,
                                 limits=httpx.Limits(
                                     max_connections=users + 10,
                                     max_keepalive_connections=users + 10),
                                 follow_redirects=True) as client:
        print(f"[{label}] logging in {len(ACCOUNTS)} accounts ...")
        headers_all = [await _login(client, e, p) for e, p in ACCOUNTS]
        rng = random.Random(seed)

        def pick_get():
            roll = rng.uniform(0, GET_WEIGHT_TOTAL)
            acc = 0
            for ep, path, w, _auth, tmo in GET_TARGETS:
                acc += w
                if roll < acc:
                    return ep, path, tmo
            return GET_TARGETS[-1][0], GET_TARGETS[-1][1], GET_TARGETS[-1][4]

        async def worker(idx: int):
            # spread worker starts over the first 3s
            await asyncio.sleep((idx / max(1, users)) * 3.0)
            while not stop.is_set():
                roll = rng.uniform(0, 100)
                hdrs = headers_all[idx % len(headers_all)]
                if roll < GET_WEIGHT_TOTAL:
                    ep, path, tmo = pick_get()
                    await _timed(client, rec, ep, "GET", path, timeout=tmo,
                                 t0_run=started)
                elif roll < 85:
                    body = {"subject": rng.choice(PRACTICE_SUBJECTS),
                            "class_level": 10}
                    await _timed(client, rec, "POST /api/practice/start", "POST",
                                 "/api/practice/start", headers=hdrs, json_body=body,
                                 timeout=30.0, t0_run=started)
                else:
                    q = random_question(rng)
                    await _timed(client, rec, "POST /api/practice/deterministic/solve",
                                 "POST", "/api/practice/deterministic/solve",
                                 json_body={"text": q["text"], "node_id": q["node_id"]},
                                 timeout=SOLVE_TIMEOUT_S, t0_run=started)
                await asyncio.sleep(think * rng.uniform(0.5, 1.5))

        async def guard():
            """Abort if the box is drowning (rolling error rate exploded)."""
            while not stop.is_set():
                await asyncio.sleep(2.0)
                er = rec.rolling_err_rate()
                if len(rec.rolling) >= ABORT_ROLLING_N and er > ABORT_ROLLING_ERR:
                    print(f"[{label}] ABORT: rolling error rate "
                          f"{er*100:.1f}% over last {len(rec.rolling)} reqs")
                    stop.set()
                    return 3

        workers = [asyncio.create_task(worker(i)) for i in range(users)]
        g = asyncio.create_task(guard())
        await asyncio.sleep(seconds)
        stop.set()
        await asyncio.gather(*workers, return_exceptions=True)
        g.cancel()
        await asyncio.gather(g, return_exceptions=True)

    elapsed = time.perf_counter() - started
    rows = rec.rows
    if not rows:
        print("no samples")
        return 1

    window = max(0.001, elapsed)
    by_ep: dict = defaultdict(list)
    for ep, ms, st, _t in rows:
        by_ep[ep].append((ms, st))

    def _row(ep, pts):
        errs = sum(1 for _m, s in pts if not _ok(s))
        stats = summarize([m for m, _ in pts], errors=errs,
                          window_seconds=window)
        return {"endpoint": ep, "requests": len(pts), "errors": errs,
                "error_rate": round(errs / len(pts), 6),
                "rps": round(len(pts) / window, 3),
                **{k: round(stats[k], 1) for k in
                   ("p50_ms", "p75_ms", "p95_ms", "p99_ms", "mean_ms", "max_ms")}}

    ep_rows = [_row(ep, pts) for ep, pts in by_ep.items()]
    ep_rows.sort(key=lambda r: -r["requests"])
    total_errs = sum(1 for _e, _m, s, _t in rows if not _ok(s))
    overall = _row("OVERALL", [(m, s) for _e, m, s, _t in rows])

    print(f"\n[{label}] users={users} seconds={seconds:.0f} "
          f"elapsed={elapsed:.1f}s base={base}")
    print(f"{'endpoint':<44}{'reqs':>7}{'errs':>6}{'err%':>7}{'rps':>8}"
          f"{'p50':>8}{'p75':>8}{'p95':>9}{'p99':>9}{'max':>9}")
    print("-" * 115)
    for r in [overall] + ep_rows:
        print(f"{r['endpoint']:<44}{r['requests']:>7}{r['errors']:>6}"
              f"{r['error_rate']*100:>6.2f}%{r['rps']:>8.1f}"
              f"{r['p50_ms']:>8.0f}{r['p75_ms']:>8.0f}{r['p95_ms']:>9.0f}"
              f"{r['p99_ms']:>9.0f}{r['max_ms']:>9.0f}")

    report = {
        "meta": {"label": label, "base": base, "users": users,
                 "seconds": seconds, "elapsed": round(elapsed, 2),
                 "think_time": think, "seed": seed,
                 "mix": {"get": 60, "practice_start": 25, "solve": 15},
                 "tool": "backend.tests.perf_stage_driver"},
        "summary": overall,
        "endpoints": ep_rows,
        "samples": [{"endpoint": e, "ms": round(m, 1), "status": s,
                     "t": round(t, 2)} for e, m, s, t in rows],
    }
    if out_path:
        Path(out_path).parent.mkdir(parents=True, exist_ok=True)
        Path(out_path).write_text(json.dumps(report, indent=1),
                                  encoding="utf-8")
        print(f"report -> {out_path}")

    if rec.rolling_err_rate() > ABORT_ROLLING_ERR:
        return 3
    if overall["p95_ms"] > STOP_P95_MS or overall["error_rate"] > STOP_ERR_RATE:
        print(f"STOP CONDITION: p95 {overall['p95_ms']:.0f}ms / "
              f"err {overall['error_rate']*100:.2f}%")
        return 2
    return 0


def main(argv=None) -> int:
    p = argparse.ArgumentParser(prog="perf_stage_driver")
    sub = p.add_subparsers(dest="mode", required=True)

    w = sub.add_parser("warmup")
    w.add_argument("--base", default="http://nginx")
    w.add_argument("--iterations", type=int, default=10)
    w.add_argument("--json", default=None)

    s = sub.add_parser("stage")
    s.add_argument("--base", default="http://nginx")
    s.add_argument("--users", type=int, default=5)
    s.add_argument("--seconds", type=float, default=60.0)
    s.add_argument("--think", type=float, default=0.25)
    s.add_argument("--label", default="stage")
    s.add_argument("--json", default=None)
    s.add_argument("--seed", type=int, default=42)
    args = p.parse_args(argv)

    if args.mode == "warmup":
        return asyncio.run(do_warmup(args.base, args.iterations, args.json))
    return asyncio.run(do_stage(args.base, args.users, args.seconds,
                                args.label, args.think, args.json, args.seed))


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        raise SystemExit(130)
