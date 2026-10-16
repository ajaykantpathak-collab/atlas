"""preroute.py — Wave 9.8 L3: bank pre-route worker job (`bank_preroute`).

Iterates board_questions rows whose norm_text IS NOT NULL (post-backfill
the whole CISCE bank is covered automatically) and runs the ROUTE-ONLY
decision — `model_problem()` (registry sweep + structure lane), never
`answer()`, never an LLM (SOLVER_LLM_MODE=off is asserted at start).

Every row's structure-route decision is persisted into the existing
norm_text-keyed structure cache (`structure_extract_cache.json`, ROUTE:
prefix — see structure_extractor.route_cache_put) by model_structure's
own write-through seam, so the records are identical to what the serving
path would produce for the same stem.

Resumable: cursor file under the runtime-data path helper, batches of
2k, sleep 0.3 between batches, RSS logged per batch.

Window law (LAUNCH-FIX-F4, 2026-10-15): bank_preroute is a HEAVY job —
the queue path is deferred to the 02:00-05:00 window by workers/main.py
(_guard_heavy); the DIRECT path (``python -m backend.workers.preroute
--shard 0123``) previously had NO guard, which is how four daytime
shards starved the box (167% CPU, 12s logins) during the 2026-10-15
audit. run() now refuses outside the window on every path — same guard,
same env (WORKER_HEAVY_WINDOW / WORKER_ALLOW_HEAVY=1 supervised
override, --force-window CLI flag) — mirroring norm_backfill.main().
"""

from __future__ import annotations

import logging
import os
import sys
import time

log = logging.getLogger(__name__)

BATCH = 2000
SLEEP_S = 0.3
RSS_LIMIT_BYTES = 1_500_000_000

_SELECT_SQL = (
    "SELECT id, question_text FROM board_questions "
    "WHERE norm_text IS NOT NULL AND board <> 'QUARANTINED' "
    "AND (:shard IS NULL OR substring(id::text, 1, 1) = ANY(:shard)) "
    "AND id::text > :cursor ORDER BY id::text LIMIT :lim")
_COUNT_SQL = (
    "SELECT count(*) AS c FROM board_questions "
    "WHERE norm_text IS NOT NULL AND board <> 'QUARANTINED' "
    "AND (:shard IS NULL OR substring(id::text, 1, 1) = ANY(:shard))")


def _cursor_path(shard: str | None = None) -> str:
    try:
        from backend.its.solver.paths import data_file
    except ImportError:
        from its.solver.paths import data_file
    name = "bank_preroute.cursor" if not shard else \
        f"bank_preroute.{shard}.cursor"
    return data_file(name)


def read_cursor(shard: str | None = None) -> str:
    try:
        p = _cursor_path(shard)
        if os.path.exists(p):
            with open(p, encoding="utf-8") as fh:
                return fh.read().strip()
    except Exception as e:  # noqa: BLE001
        log.warning("preroute cursor read failed: %s", e)
    return ""


def write_cursor(last_id: str, shard: str | None = None) -> None:
    try:
        p = _cursor_path(shard)
        os.makedirs(os.path.dirname(p), exist_ok=True)
        tmp = p + ".tmp"
        with open(tmp, "w", encoding="utf-8") as fh:
            fh.write(str(last_id))
        os.replace(tmp, p)
    except Exception as e:  # noqa: BLE001
        log.warning("preroute cursor write failed: %s", e)


def _rss_bytes() -> int:
    try:
        import psutil
        return psutil.Process(os.getpid()).memory_info().rss
    except Exception:  # noqa: BLE001
        return 0


def _engine():
    from backend.its.solver.bank_answer import _engine as _be
    return _be()


def assert_window_open(now=None) -> None:
    """Refuse (RuntimeError) unless the 02:00-05:00 heavy window is open.

    Reads the SAME window the worker loop uses (backend.workers.main:
    WORKER_HEAVY_WINDOW, default 02:00-05:00 local time).  The lazy import
    keeps this module importable standalone; workers.main imports this
    module only lazily (inside its handler), so there is no cycle.
    WORKER_ALLOW_HEAVY=1 is the supervised-manual-run override (same
    semantics as main.ALLOW_HEAVY_NOW, read live so env changes apply).
    """
    if os.environ.get("WORKER_ALLOW_HEAVY", "") == "1":
        return
    from datetime import datetime, timezone
    from backend.workers.main import _heavy_window_bounds
    now = now or datetime.now(timezone.utc).astimezone()
    open_now, next_start = _heavy_window_bounds(now)
    if not open_now:
        raise RuntimeError(
            "bank_preroute outside heavy window — refusing "
            f"(next start {next_start.isoformat(timespec='minutes')}); "
            "supervised override: WORKER_ALLOW_HEAVY=1")


def run(limit: int | None = None,
        shard: str | None = None,
        force_window: bool = False) -> dict:
    """Route-only pass over the bank. `limit` caps total rows (dev gate
    runs use it for the 2k-stem measurement).

    `shard` is a string of uuid first-letters this process owns
    (e.g. "0123" → ids starting 0,1,2,3). Shards are disjoint, so N
    parallel processes never duplicate a row; each keeps its own
    cursor file `bank_preroute.<shard>.cursor`. Unsharded run keeps
    the single `bank_preroute.cursor` (today's behaviour).

    Window law (LAUNCH-FIX-F4): refuses outside 02:00-05:00 on EVERY
    path — the queue lane's claim-time guard in workers/main.py is the
    first line of defence; this one closes the direct/CLI lane and any
    future caller that skips the queue. `force_window=True` (CLI
    --force-window) is the supervised escape hatch."""
    if not force_window:
        assert_window_open()
    # hard assertion: the route lane must never reach an LLM
    mode = os.environ.get("SOLVER_LLM_MODE", "off").lower()
    if mode != "off":
        raise RuntimeError(
            f"bank_preroute requires SOLVER_LLM_MODE=off, got {mode!r}")
    os.environ.setdefault("SOLVER_OFFLINE", "1")
    from sqlalchemy import text as _text
    from backend.its.solver.modeling_layer import model_problem
    started = time.monotonic()
    shard_list = list(shard) if shard else None
    cursor = read_cursor(shard)
    done = 0
    batches = 0
    routed = 0
    with _engine().connect() as cx:
        total = int(cx.execute(_text(_COUNT_SQL),
                               {"shard": shard_list}).scalar() or 0)
    log.info("bank_preroute start shard=%r cursor=%r total=%d limit=%s",
             shard, cursor, total, limit)
    while True:
        if limit is not None and done >= limit:
            break
        lim = BATCH if limit is None else min(BATCH, limit - done)
        with _engine().connect() as cx:
            t0 = time.monotonic()
            rows = list(cx.execute(_text(_SELECT_SQL),
                                   {"cursor": cursor, "lim": lim,
                                    "shard": shard_list}))
        if not rows:
            break
        for r in rows:
            try:
                res = model_problem(r.question_text or "")
                if res and getattr(res, "matched", False):
                    routed += 1
            except Exception as e:  # noqa: BLE001
                try:
                    from backend.its.solver.contract import \
                        log_lane_exception
                    log_lane_exception("bank_preroute_stem", e)
                except Exception:
                    pass
        cursor = str(rows[-1].id)
        write_cursor(cursor, shard)
        done += len(rows)
        batches += 1
        rss = _rss_bytes()
        log.info("bank_preroute batch %d shard=%r rows %d (+%dms, %d rows/s) "
                 "routed_total=%d rss=%dMB",
                 batches, shard, len(rows),
                 round((time.monotonic() - t0) * 1000),
                 round(len(rows) / max(time.monotonic() - t0, 0.001)),
                 routed, rss // (1024 * 1024))
        if rss and rss > RSS_LIMIT_BYTES:
            log.warning("bank_preroute RSS %d > 1.5GB — pausing 60s",
                        rss)
            time.sleep(60)
        time.sleep(SLEEP_S)
    report = {"processed": done, "batches": batches, "routed": routed,
              "cursor": cursor, "bank_total": total, "shard": shard,
              "elapsed_s": round(time.monotonic() - started, 1)}
    log.info("bank_preroute done: %s", report)
    return report


def handler(payload: dict) -> dict:
    p = payload or {}
    return run(limit=p.get("limit"), shard=p.get("shard"))


def main() -> None:
    import argparse
    ap = argparse.ArgumentParser(description="bank pre-route (route-only)")
    ap.add_argument("--limit", type=int, default=None)
    ap.add_argument("--shard", default=None,
                    help="uuid first-letters this run owns, e.g. 0123")
    ap.add_argument("--force-window", action="store_true",
                    help="skip the 02:00-05:00 heavy-window guard "
                         "(supervised manual run)")
    args = ap.parse_args()
    logging.basicConfig(level=logging.INFO,
                        format="%(asctime)s %(levelname)-7s %(message)s")
    # norm_backfill.main() precedent: CLI refuses outside the heavy
    # window with exit 2 (WORKER_ALLOW_HEAVY=1 also overrides).
    if not args.force_window:
        try:
            assert_window_open()
        except RuntimeError as exc:
            log.error("%s", exc)
            sys.exit(2)
    run(limit=args.limit, shard=args.shard, force_window=True)


if __name__ == "__main__":
    main()
