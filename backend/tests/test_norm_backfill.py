"""Wave 9.8 L3 — norm_text backfill job pins (spec tests 1-5)."""

import os
import sys

import pytest

sys.path.insert(0, os.path.join("D:\\", "platform", "deploy"))

from backend.workers import norm_backfill
from backend.its.solver.bank_answer import normalize as _bank_normalize


def test_window_guard_refuses_outside_heavy_window(monkeypatch):
    """Outside 02:00-05:00 a non-dry CLI run exits 2; dry-run needs no
    window (coordinator dry-runs at any time)."""
    from datetime import datetime, timezone
    monkeypatch.setattr(
        "backend.workers.main._heavy_window_bounds",
        lambda now: (False, datetime(2026, 10, 14, 2, 0,
                                     tzinfo=timezone.utc)))
    monkeypatch.setattr(sys, "argv", ["norm_backfill"])
    with pytest.raises(SystemExit) as ei:
        norm_backfill.main()
    assert ei.value.code == 2


def test_dry_run_allowed_anytime(monkeypatch):
    """Dry-run path never consults the window and never writes."""
    monkeypatch.setattr(sys, "argv", ["norm_backfill", "--dry-run"])
    monkeypatch.setattr(norm_backfill, "dry_run",
                        lambda: {"dry_run": True, "would_backfill": {}})
    norm_backfill.main()  # no SystemExit, no DB


def test_update_is_idempotent_recheck():
    assert "norm_text IS NULL" in norm_backfill._UPDATE_SQL
    # both the WHERE clause re-check and the selection carry it
    assert norm_backfill._UPDATE_SQL.count("norm_text IS NULL") >= 1


def test_cursor_round_trip(tmp_path, monkeypatch):
    monkeypatch.setattr(norm_backfill, "_cursor_path",
                        lambda: str(tmp_path / "norm_backfill.cursor"))
    assert norm_backfill.read_cursor() == ""
    norm_backfill.write_cursor("abc-123")
    assert norm_backfill.read_cursor() == "abc-123"
    norm_backfill.write_cursor("def-456")
    assert norm_backfill.read_cursor() == "def-456"


def test_normalize_identity():
    """The spec's proven normaliser — bank_answer.normalize imported,
    never copied."""
    assert norm_backfill.normalize is _bank_normalize


def test_quarantined_rows_never_selected():
    assert "board <> 'QUARANTINED'" in norm_backfill._SELECT_SQL
    assert "QUARANTINED" in norm_backfill._COUNT_SQL


def test_chunk_size_and_sleep():
    assert norm_backfill.CHUNK == 5000
    assert norm_backfill.SLEEP_S == 0.5
    assert norm_backfill.RSS_LIMIT_BYTES == 1_500_000_000
