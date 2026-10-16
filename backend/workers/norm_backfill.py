"""norm_backfill.py — Wave 9.8 L3: norm_text backfill for board_questions.

Registered in workers/main.py as `norm_text_backfill` (HEAVY window).
Also runnable directly for the dry-run:

    python -m backend.workers.norm_backfill --dry-run --force-window
    python -m backend.workers.norm_backfill            # real run (window)

Spec (`_work/wave98/L3_backfill_spec.md`) is executed verbatim:

- Window guard: same 02:00-05:00 heavy window as content_reindex unless
  `--force-window` (dry-run only). Dry-run never writes.
- Selection: `norm_text IS NULL AND board <> 'QUARANTINED'`, ordered by
  id, chunks of 5000.
- Update per chunk in ONE transaction with `AND norm_text IS NULL`
  (idempotent re-check; safe to re-run).
- Resumable cursor at data_file("norm_backfill.cursor") — the
  runtime-data path helper (`/app/cbse_data` in the container).
- Between chunks: sleep 0.5, RSS check (<1.5 GB), log `chunk n rows t`.
- Dry-run: per-board would-write counts + 20 samples.
- Post-run: NULL counts before/after, `ANALYZE board_questions`, and a
  REPORT (not creation) of the norm_text trigram index.
"""

from __future__ import annotations

import argparse
import logging
import os
import sys
import time

# the proven normaliser — identity-pinned by the spec's tests
from backend.its.solver.bank_answer import normalize

log = logging.getLogger(__name__)

CHUNK = 5000
SLEEP_S = 0.5
RSS_LIMIT_BYTES = 1_500_000_000  # 1.5 GB

_SELECT_SQL = (
    "SELECT id, question_text FROM board_questions "
    "WHERE norm_text IS NULL AND board <> 'QUARANTINED' "
    "AND id::text > :cursor ORDER BY id::text LIMIT :lim")
_UPDATE_SQL = (
    "UPDATE board_questions SET norm_text = :n "
    "WHERE id = :id AND norm_text IS NULL")
_COUNT_SQL = (
    "SELECT board, count(*) AS c FROM board_questions "
    "WHERE norm_text IS NULL AND board <> 'QUARANTINED' "
    "GROUP BY board ORDER BY board")
_INDEX_SQL = (
    "SELECT indexname FROM pg_indexes "
    "WHERE tablename = 'board_questions' "
    "AND indexdef ILIKE '%gin%norm_text%'")


def _engine():
    from backend.its.solver.bank_answer import _engine as _be
    return _be()


def _cursor_path() -> str:
    try:
        from backend.its.solver.paths import data_file
    except ImportError:  # flat-import environments
        from its.solver.paths import data_file
    return data_file("norm_backfill.cursor")


def read_cursor() -> str:
    """Return the last committed id cursor ('' = from the beginning)."""
    try:
        p = _cursor_path()
        if os.path.exists(p):
            with open(p, encoding="utf-8") as fh:
                return fh.read().strip()
    except Exception as e:  # noqa: BLE001
        log.warning("norm_backfill cursor read failed: %s", e)
    return ""


def write_cursor(last_id: str) -> None:
    try:
        p = _cursor_path()
        os.makedirs(os.path.dirname(p), exist_ok=True)
        tmp = p + ".tmp"
        with open(tmp, "w", encoding="utf-8") as fh:
            fh.write(str(last_id))
        os.replace(tmp, p)
    except Exception as e:  # noqa: BLE001
        log.warning("norm_backfill cursor write failed: %s", e)


def _rss_bytes() -> int:
    try:
        import psutil
        return psutil.Process(os.getpid()).memory_info().rss
    except Exception:  # noqa: BLE001
        return 0


def _counts(cx, _text) -> dict:
    return {r.board: int(r.c) for r in cx.execute(_text(_COUNT_SQL))}


def dry_run() -> dict:
    """Read-only: what the real run WOULD write + 20 samples."""
    from sqlalchemy import text as _text
    started = time.monotonic()
    with _engine().connect() as cx:
        counts = _counts(cx, _text)
        rows = list(cx.execute(_text(
            "SELECT id, board, question_text FROM board_questions "
            "WHERE norm_text IS NULL AND board <> 'QUARANTINED' "
            "ORDER BY id LIMIT 20")))
        index_rows = list(cx.execute(_text(_INDEX_SQL)))
    samples = [{"id": str(r.id), "board": r.board,
                "norm_text": normalize(r.question_text or "")[:80]}
               for r in rows]
    report = {"dry_run": True, "would_backfill": counts,
              "samples": samples,
              "trgm_index": [r.indexname for r in index_rows],
              "elapsed_s": round(time.monotonic() - started, 1)}
    log.info("norm_backfill DRY-RUN: %s", report["would_backfill"])
    for s in samples:
        log.info("  sample %s [%s] %s", s["id"][:8], s["board"],
                 s["norm_text"])
    return report


def run_backfill() -> dict:
    """The real (window-gated) chunked backfill."""
    from sqlalchemy import text as _text
    started = time.monotonic()
    cursor = read_cursor()
    written = 0
    chunks = 0
    with _engine().connect() as cx:
        before = _counts(cx, _text)
    log.info("norm_backfill start cursor=%r nulls_before=%s",
             cursor, before)
    while True:
        with _engine().connect() as cx, cx.begin():
            t0 = time.monotonic()
            rows = list(cx.execute(_text(_SELECT_SQL),
                                   {"cursor": cursor, "lim": CHUNK}))
            if not rows:
                break
            for r in rows:
                cx.execute(_text(_UPDATE_SQL),
                           {"n": normalize(r.question_text or ""),
                            "id": r.id})
            cursor = str(rows[-1].id)
            chunks += 1
            written += len(rows)
        write_cursor(cursor)
        rss = _rss_bytes()
        log.info("norm_backfill chunk %d rows %d (+%dms) rss=%dMB",
                 chunks, len(rows),
                 round((time.monotonic() - t0) * 1000),
                 rss // (1024 * 1024))
        if rss and rss > RSS_LIMIT_BYTES:
            log.warning("norm_backfill RSS %d > 1.5GB — pausing 60s",
                        rss)
            time.sleep(60)
        time.sleep(SLEEP_S)
    with _engine().connect() as cx:
        after = _counts(cx, _text)
        cx.execute(_text("ANALYZE board_questions"))
        index_rows = list(cx.execute(_text(_INDEX_SQL)))
    index_names = [r.indexname for r in index_rows]
    if not index_names:
        log.warning("norm_backfill: NO trigram index on norm_text — "
                    "report to coordinator (DDL ships separately)")
    report = {"written": written, "chunks": chunks,
              "nulls_before": before, "nulls_after": after,
              "trgm_index": index_names,
              "elapsed_s": round(time.monotonic() - started, 1)}
    log.info("norm_backfill done: %s", report)
    return report


def handler(payload: dict) -> dict:
    """Worker entry: payload {dry_run: bool} — the job row is the audit
    trail; real writes only ever happen inside the heavy window."""
    if (payload or {}).get("dry_run"):
        return dry_run()
    return run_backfill()


def main() -> None:
    ap = argparse.ArgumentParser(description="norm_text backfill")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--force-window", action="store_true",
                    help="dry-run only: skip the 02:00-05:00 guard")
    args = ap.parse_args()
    logging.basicConfig(level=logging.INFO,
                        format="%(asctime)s %(levelname)s %(message)s")
    if args.dry_run:
        import json as _json
        print(_json.dumps(dry_run(), indent=1, default=str))
        return
    if not args.force_window:
        from backend.workers.main import _heavy_window_bounds
        from datetime import datetime, timezone
        open_now, nxt = _heavy_window_bounds(
            datetime.now(timezone.utc).astimezone())
        if not open_now:
            log.error("norm_backfill outside heavy window "
                      "(next start %s) — refusing", nxt)
            sys.exit(2)
    run_backfill()


if __name__ == "__main__":
    main()
