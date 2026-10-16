"""test_backup.py — manifest write/verify, retention pruning, drill
lifecycle on a SQLite stand-in, refusal to target the live database.
No Postgres needed."""
import gzip
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

import pytest

import backup as B
import common as C


CFG = {
    "backup": {
        "core_tables": ["questions", "users"],
        "live_db_names_blocklist": ["dream_app", "postgres"],
        "retain_daily": 2, "retain_weekly": 1,
        "large_skip_mb": 1024,
        "dburl_file": "unused",
        "docker_fallback_cmd": "docker exec ...",
        "runtime_state_paths": [],
    }
}


# --------------------------------------------------------------------------- #
# scratch-name guard
# --------------------------------------------------------------------------- #
def test_scratch_name_refuses_live_db():
    with pytest.raises(ValueError, match="live database"):
        B.assert_scratch_safe("dream_app", CFG["backup"]["live_db_names_blocklist"])
    with pytest.raises(ValueError, match="must start"):
        B.assert_scratch_safe("evil_db", CFG["backup"]["live_db_names_blocklist"])
    B.assert_scratch_safe(B.SCRATCH_PREFIX + "20261013030000",
                          CFG["backup"]["live_db_names_blocklist"])


def test_parse_dburl_asyncpg_scheme():
    dsn = B.parse_dburl(
        "postgresql+asyncpg://u:secretpw@127.0.0.1:5432/dream_app")
    assert dsn == {"user": "u", "password": "secretpw", "host": "127.0.0.1",
                   "port": "5432", "dbname": "dream_app"}


# --------------------------------------------------------------------------- #
# manifest write/verify round-trip
# --------------------------------------------------------------------------- #
def test_manifest_roundtrip_and_tamper(tmp_path):
    payload = b"hello backup"
    f = tmp_path / "data.csv.gz"
    with gzip.open(f, "wb") as zf:
        zf.write(payload)
    man = {"ts_utc": "2026-10-13T03:00:00Z", "engine": "test",
           "files": [{"path": "data.csv.gz", "bytes": f.stat().st_size,
                      "sha256": C.sha256_file(f)}]}
    B.write_manifest(tmp_path, man)
    doc = B.verify_manifest(tmp_path)
    assert doc["engine"] == "test"
    # tamper → mismatch
    with gzip.open(f, "wb") as zf:
        zf.write(b"tampered")
    with pytest.raises(ValueError, match="sha256 mismatch"):
        B.verify_manifest(tmp_path)
    # missing file → error
    (tmp_path / "data.csv.gz").unlink()
    with pytest.raises(FileNotFoundError):
        B.verify_manifest(tmp_path)


# --------------------------------------------------------------------------- #
# retention pruning
# --------------------------------------------------------------------------- #
def make_backup_dir(backups: Path, name: str):
    d = backups / name
    d.mkdir(parents=True)
    (d / "manifest.json").write_text("{}", encoding="utf-8")
    return d


def test_retention_prune(tmp_path):
    names = ["db-20261001-0300", "db-20261002-0300", "db-20261009-0300",
             "db-20261010-0300", "db-20261012-0300", "db-20261013-0300",
             "not-a-backup"]
    for n in names:
        make_backup_dir(tmp_path, n)
    removed = B.retention_prune(tmp_path, keep_daily=2, keep_weekly=1)
    # keep newest 2 (10-12, 10-13); among older keep 1 per week up to 1:
    # 10-09/10-10 are the same ISO week as 10-12/13 -> nothing older qualifies
    kept = sorted(d.name for d in tmp_path.iterdir())
    assert "db-20261013-0300" in kept and "db-20261012-0300" in kept
    assert "db-20261001-0300" not in kept and "db-20261002-0300" not in kept
    assert "not-a-backup" in kept  # never touched (no db- prefix)
    assert all(r.startswith("db-") for r in removed)


# --------------------------------------------------------------------------- #
# drill lifecycle on a SQLite stand-in
# --------------------------------------------------------------------------- #
class SqliteAdapter(B.Adapter):
    """Stand-in proving the drill mechanics: scratch lifecycle, loading,
    count assertions, drop."""

    DIALECT_FIXES = {
        "CREATE TABLE IF NOT EXISTS public.\"questions\"": 'CREATE TABLE IF NOT EXISTS "questions"',
        "CREATE TABLE IF NOT EXISTS public.\"users\"": 'CREATE TABLE IF NOT EXISTS "users"',
    }

    def __init__(self, root: Path):
        self.root = root
        self.created, self.dropped, self._open = [], [], []

    def _sqlite(self, name: str):
        conn = sqlite3.connect(self.root / f"{name}.db")
        self._open.append(conn)
        return conn

    def create_scratch(self, name):
        self.created.append(name)
        self._sqlite(name).close()

    def connect_scratch(self, name):
        return self._sqlite(name)

    def exec(self, conn, sql):
        s = sql
        for pg, lite in self.DIALECT_FIXES.items():
            s = s.replace(pg, lite)
        if s.startswith("CREATE TABLE") and "public." in s:
            s = s.replace("public.", "")
        if not s.lower().startswith(("create", "alter", "select", "insert")):
            return
        conn.execute(s)
        conn.commit()

    def copy_in(self, conn, table, cols, csv_gz_path):
        import csv as _csv
        import io
        with gzip.open(csv_gz_path, "rt", encoding="utf-8", newline="") as fh:
            rows = list(_csv.reader(fh))
        ph = ", ".join("?" for _ in cols)
        collist = ", ".join(f'"{c}"' for c in cols)
        conn.executemany(f'INSERT INTO "{table}" ({collist}) VALUES ({ph})', rows)
        conn.commit()
        return len(rows)

    def count(self, conn, table):
        return conn.execute(f'SELECT count(*) FROM "{table}"').fetchone()[0]

    def probe(self, conn, table):
        conn.execute(f'SELECT * FROM "{table}" LIMIT 1').fetchone()
        return True

    def drop_scratch(self, name):
        self.dropped.append(name)
        for conn in self._open:
            try:
                conn.close()
            except Exception:
                pass
        self._open.clear()
        (self.root / f"{name}.db").unlink()


def build_sqlite_backup(tmp_path: Path, question_rows, user_rows):
    """Fabricate a backup dir in the harness format (SQLite-friendly DDL)."""
    bdir = tmp_path / "db-20261013-0300"
    (bdir / "data").mkdir(parents=True)
    schema = {
        "pre": ['CREATE TABLE IF NOT EXISTS "questions" (id INTEGER PRIMARY KEY, q TEXT)',
                'CREATE TABLE IF NOT EXISTS "users" (id INTEGER PRIMARY KEY, name TEXT)'],
        "post": ['CREATE INDEX IF NOT EXISTS idx_q ON "questions" (q)'],
        "copy_columns": {"questions": ["id", "q"], "users": ["id", "name"]},
    }
    with gzip.open(bdir / "schema.json.gz", "wt", encoding="utf-8") as zf:
        json.dump(schema, zf)
    files_meta = []
    for t, rows in (("questions", question_rows), ("users", user_rows)):
        p = bdir / "data" / f"{t}.csv.gz"
        import csv as _csv
        with gzip.open(p, "wt", encoding="utf-8", newline="") as zf:
            w = _csv.writer(zf)
            w.writerows(rows)
        files_meta.append({"path": f"data/{t}.csv.gz", "bytes": p.stat().st_size,
                           "sha256": C.sha256_file(p)})
    man = {"ts_utc": "2026-10-13T03:00:00Z", "engine": "sqlite-standin",
           "table_order": ["questions", "users"],
           "table_rows": {"questions": len(question_rows), "users": len(user_rows)},
           "counts": {"questions": len(question_rows), "users": len(user_rows)},
           "files": files_meta}
    B.write_manifest(bdir, man)
    return bdir


def test_drill_lifecycle_pass(tmp_path):
    bdir = build_sqlite_backup(tmp_path,
                               [[1, "2+2?"], [2, "3+3?"]],
                               [[1, "asha"], [2, "vijay"]])
    ad = SqliteAdapter(tmp_path)
    code, report = B.run_drill(CFG, bdir, ad, keep=False,
                               scratch_name=B.SCRATCH_PREFIX + "unit01")
    assert code == 0, report
    assert report["verdict"] == "PASS"
    assert report["tables"]["questions"] == {"expected": 2, "loaded": 2, "status": "PASS"}
    assert report["tables"]["users"]["status"] == "PASS"
    assert report["rows_loaded_total"] == 4
    assert report["probe"]["ok"] is True
    assert ad.dropped == [B.SCRATCH_PREFIX + "unit01"]  # scratch dropped
    assert (tmp_path / (B.SCRATCH_PREFIX + "unit01.db")).exists() is False


def test_drill_detects_count_mismatch(tmp_path):
    bdir = build_sqlite_backup(tmp_path, [[1, "2+2?"]], [[1, "asha"]])
    man = json.loads((bdir / "manifest.json").read_text())
    man["table_rows"]["questions"] = 5  # lie: expect 5, loaded 1
    B.write_manifest(bdir, man)
    ad = SqliteAdapter(tmp_path)
    code, report = B.run_drill(CFG, bdir, ad, keep=False,
                               scratch_name=B.SCRATCH_PREFIX + "unit02")
    assert code == 1
    assert report["tables"]["questions"]["status"] == "FAIL"
    assert report["verdict"] == "FAIL"


def test_drill_refuses_live_dbname(tmp_path):
    bdir = build_sqlite_backup(tmp_path, [], [])
    ad = SqliteAdapter(tmp_path)
    with pytest.raises(ValueError, match="live database"):
        B.run_drill(CFG, bdir, ad, scratch_name="dream_app")
    # even a prefixed name that somehow collides with the blocklist is refused
    with pytest.raises(ValueError, match="live database"):
        B.assert_scratch_safe(B.SCRATCH_PREFIX + "dream_app",
                              [B.SCRATCH_PREFIX + "dream_app"])
    assert ad.created == []  # nothing was created


def test_topo_sort_parents_first():
    edges = [("attempts", "users"), ("attempts", "questions")]
    out = B.topo_sort(["attempts", "users", "questions"], edges, [])
    assert out.index("users") < out.index("attempts")
    assert out.index("questions") < out.index("attempts")


def test_topo_sort_cycle_fallback():
    out = B.topo_sort(["a", "b"], [("a", "b"), ("b", "a")], notes := [])
    assert sorted(out) == ["a", "b"]
    assert notes and "cycle" in notes[0]
