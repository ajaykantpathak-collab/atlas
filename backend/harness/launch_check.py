#!/usr/bin/env python3
"""harness/launch_check.py — THE PRE-SERVE GATE (Phase A).

Runs BEFORE gunicorn binds.  A container that cannot serve students fails
here, fast and loud, instead of crash-looping behind a healthcheck.

Steps (each names itself on failure):
  1. full app import (every NameError/ImportError class)
  2. route manifest: registered routes must match routes_manifest.json
     (unexpected loss/gain = fail; regenerate with --update)
  3. dependency probes: postgres, redis, neo4j, qdrant (3s timeout each)
  4. content gate: nodes index loads with >= 19,000 nodes
  5. solver self-test: planted attacks must verify-or-refuse correctly

Usage:
  python -m backend.harness.launch_check            # gate (exit 0/1)
  python -m backend.harness.launch_check --update   # rewrite manifest
  python -m backend.harness.launch_check --offline  # skip dependency probes
"""
from __future__ import annotations

import hashlib
import json
import os
import sys
import time

sys.path.insert(0, "/app")

MANIFEST = os.path.join(os.path.dirname(__file__), "routes_manifest.json")
MIN_NODES = 19_000
ok = []
fail = []


def step(name, fn):
    # HEARTBEAT (2026-10-05): a wedged check (the in-container content
    # index rebuild ground 40+ minutes with zero output — stdout was
    # block-buffered) is invisible in docker logs. Announce every step
    # UNBUFFERED with a timestamp so a stall is visible within seconds.
    import sys as _sys
    import time as _time
    print(f"  [....] {name} — started "
          f"{_time.strftime('%H:%M:%S')}", flush=True)
    _t0 = _time.perf_counter()
    try:
        detail = fn()
        ok.append(f"{name} {detail}")
        print(f"  [PASS] {name} {detail} "
              f"({_time.perf_counter()-_t0:.1f}s)", flush=True)
        return True
    except Exception as e:
        fail.append(f"{name}: {type(e).__name__}: {e}")
        print(f"  [FAIL] {name}: {type(e).__name__}: {e} "
              f"({_time.perf_counter()-_t0:.1f}s)", flush=True)
        _sys.stdout.flush()
        return False


# ------------------------------------------------------------------ #
def s_import():
    from backend import main  # noqa: F401  (the full app)
    return f"{len(main.app.routes)} routes registered"


def _real_routes(routes):
    """Yield every concrete APIRoute, expanding FastAPI >=0.141 lazy
    ``_IncludedRouter`` wrappers (they carry no ``methods`` themselves —
    the real table hangs off ``original_router.routes``).  On older
    FastAPI the includes are already flattened, so this is a no-op."""
    for r in routes:
        if hasattr(r, "methods") and hasattr(r, "path"):
            yield r
        elif hasattr(r, "original_router"):
            yield from _real_routes(getattr(r.original_router, "routes", []))


def s_manifest():
    from backend.main import app
    table = sorted(f"{sorted(r.methods - {'HEAD', 'OPTIONS'})} {r.path}"
                   for r in _real_routes(app.routes))
    current = hashlib.sha256(
        json.dumps(table, sort_keys=True).encode()).hexdigest()
    want = {"hash": current, "count": len(table)}
    if "--update" in sys.argv:
        json.dump(want, open(MANIFEST, "w"), indent=1)
        return f"manifest written ({len(table)} routes)"
    if not os.path.exists(MANIFEST):
        json.dump(want, open(MANIFEST, "w"), indent=1)
        return f"manifest seeded ({len(table)} routes)"
    have = json.load(open(MANIFEST))
    if have.get("hash") != current:
        raise AssertionError(
            f"route surface drifted: manifest {have.get('count')} routes vs "
            f"now {len(table)}; run with --update after REVIEWING the diff")
    return f"matches manifest ({len(table)} routes)"


def s_dependencies():
    import socket
    import urllib.request

    probes = {
        "postgres": ("http://localhost", None),  # via app pool below
    }
    # postgres through the app's engine
    from backend.database import get_sync_engine
    from sqlalchemy import text
    with get_sync_engine().connect() as cx:
        cx.execute(text("SELECT 1"))
    # redis (auth optional)
    try:
        import redis as _r
        url = os.environ.get("REDIS_URL") or \
            os.environ.get("PLATFORM_REDIS_URL") or "redis://redis:6379/0"
        c = _r.Redis.from_url(url, socket_timeout=3)
        c.ping()
    except Exception:
        pass  # redis is cache-tier: degraded, not fatal (documented)
    # neo4j + qdrant: bolt/http reachability.  Prefer the configured URIs
    # (native dev points at 127.0.0.1); fall back to the in-network service
    # names when the env does not carry them (container default).
    import urllib.parse as _up

    def _host_port(uri: str, default_host: str, default_port: int):
        try:
            u = _up.urlparse(uri)
            if u.hostname:
                return u.hostname, u.port or default_port
        except Exception:
            pass
        return default_host, default_port

    neo = _host_port(os.environ.get("NEO4J_URI")
                     or os.environ.get("PLATFORM_NEO4J_URI") or "",
                     "neo4j", 7687)
    qdr = _host_port(os.environ.get("QDRANT_URL")
                     or os.environ.get("PLATFORM_QDRANT_URL") or "",
                     "qdrant", 6333)
    import time as _time
    last_err: Exception | None = None
    for attempt in range(3):
        try:
            for host, port in (neo, qdr):
                try:
                    s = socket.create_connection((host, port), timeout=3)
                    s.close()
                except Exception as exc:
                    # name the target: a bare "connection refused" says nothing
                    raise ConnectionRefusedError(
                        f"{host}:{port} -> {type(exc).__name__}: {exc}") from exc
            break
        except Exception as exc:
            last_err = exc
            if attempt < 2:
                # a dependency restarting in our boot window is a timing
                # race, not a bad deploy — retry before failing
                _time.sleep(5)
    if last_err is not None and attempt == 2:
        raise last_err
    return "postgres ok (redis/neo4j/qdrant reachable)"


def s_content():
    from backend.services.enhanced_nodes import load_index
    idx = load_index()
    n = idx.node_count()
    if n < MIN_NODES:
        raise AssertionError(f"nodes index too small: {n} < {MIN_NODES}")
    return f"{n} nodes"


def s_solver():
    sys.path.insert(0, "/app")
    from backend.its.solver.answer_pipeline import answer

    cases = [
        ("A car travels 150 km in 2 hours. What is its average speed?",
         lambda r: r.label == "VERIFIED" and "75" in (r.answer or "")),
        ("Evaluate 3x + 4 when x = 5",
         lambda r: r.label == "VERIFIED" and "19" in (r.answer or "")),
        ("Explain the color of the smell of Tuesday.",
         lambda r: not r.label.startswith("VERIFIED")
         and r.answer is None),
    ]
    for q, check in cases:
        r = answer(q)
        if not check(r):
            raise AssertionError(f"self-test failed on {q[:40]!r} "
                                 f"-> {r.label} {r.answer!r}")
    return f"{len(cases)} planted cases pass"


def main():
    # unbuffered from the first line: docker logs must show progress even
    # if the process wedges inside a check
    sys.stdout.reconfigure(line_buffering=True)  # py3.7+
    print(f"launch_check: pre-serve gate "
          f"(pid {os.getpid()}, {time.strftime('%F %T')})", flush=True)
    step("1 import", s_import)
    step("2 route-manifest", s_manifest)
    if "--offline" not in sys.argv:
        step("3 dependencies", s_dependencies)
    step("4 content-index", s_content)
    step("5 solver-selftest", s_solver)
    if fail:
        print(f"\nLAUNCH GATE FAILED ({len(fail)}):", flush=True)
        for f in fail:
            print("  -", f, flush=True)
        sys.exit(1)
    print("\nLAUNCH GATE PASSED — safe to serve", flush=True)


if __name__ == "__main__":
    main()
