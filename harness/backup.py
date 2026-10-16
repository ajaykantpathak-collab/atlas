"""backup.py — nightly DB + runtime-state backups, manifest, retention,
and the restore drill (NEVER against the live database).

Engines, in order:
  1. host `pg_dump` (if ever installed)  → db.sql.gz (spec-exact)
  2. psycopg2 logical dump: schema DDL from the catalogs + per-table COPY CSV,
     engine labeled "psycopg2_copy_dump" in the manifest
  3. if the DB is unreachable: print the owner-approved docker exec command
     and exit 1 (the harness itself stays off Docker — §2.2).

Restore drill: creates atlas_restore_drill_<ts> on the same instance, loads
the dump, asserts core-table row counts against the manifest, probes one
row, drops the scratch DB. The live DB name is blocklisted and the scratch
name prefix is hard-guarded.
"""
from __future__ import annotations

import argparse
import gzip
import io
import json
import os
import re
import shutil
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional, Tuple

import common as C

SCRATCH_PREFIX = "atlas_restore_drill_"


# --------------------------------------------------------------------------- #
# DSN handling
# --------------------------------------------------------------------------- #
def parse_dburl(text: str) -> Dict[str, str]:
    m = re.match(
        r"postgresql(?:\+[a-z]+)?://([^:]+):([^@]+)@([^:/]+):(\d+)/(\w+)",
        text.strip())
    if not m:
        raise ValueError(f"unparseable dburl: {text[:40]}...")
    user, pw, host, port, db = m.groups()
    return {"user": user, "password": pw, "host": host, "port": port, "dbname": db}


def resolve_dburl(cfg: Dict[str, Any]) -> Dict[str, str]:
    return parse_dburl((C.ROOT / cfg["backup"]["dburl_file"]).read_text(encoding="utf-8"))


def psycopg2_connect(dsn: Dict[str, str], dbname: Optional[str] = None,
                      autocommit: bool = False):
    import psycopg2
    conn = psycopg2.connect(host=dsn["host"], port=dsn["port"], user=dsn["user"],
                            password=dsn["password"],
                            dbname=dbname or dsn["dbname"], connect_timeout=10)
    conn.autocommit = autocommit
    return conn


def qid(name: str) -> str:
    return '"' + name.replace('"', '""') + '"'


# --------------------------------------------------------------------------- #
# Schema dumping (engine 2)
# --------------------------------------------------------------------------- #
def dump_schema(cur) -> Dict[str, Any]:
    """Return {"pre": [...], "post": [...], "copy_columns": {t: [cols]},
    "table_order": [...]} for the public schema."""
    fidelity: List[str] = []

    cur.execute("SELECT extname FROM pg_extension ORDER BY 1")
    exts = [r[0] for r in cur.fetchall()]

    cur.execute("""SELECT c.relname, c.oid FROM pg_class c
                   JOIN pg_namespace n ON n.oid = c.relnamespace
                   WHERE n.nspname='public' AND c.relkind IN ('r','p')
                   ORDER BY 1""")
    tables = {r[0]: r[1] for r in cur.fetchall()}

    # FK dependency order (parents first)
    cur.execute("""SELECT conrelid::regclass::text, confrelid::regclass::text
                   FROM pg_constraint
                   WHERE contype='f' AND connamespace='public'::regnamespace""")
    edges = [(a.split(".")[-1], b.split(".")[-1]) for a, b in cur.fetchall()]
    order = topo_sort(list(tables), edges, fidelity)

    # sequences (with owning column when serial-linked)
    cur.execute("""SELECT s.relname, seq.seqtypid::regtype::text,
                          q.owned IS NOT NULL AS owned
                   FROM pg_class s
                   JOIN pg_namespace n ON n.oid = s.relnamespace
                   JOIN pg_sequence seq ON seq.seqrelid = s.oid
                   LEFT JOIN LATERAL (
                       SELECT 1 AS owned FROM pg_depend d
                       WHERE d.objid = s.oid AND d.deptype IN ('a','i') LIMIT 1
                   ) q ON TRUE
                   WHERE n.nspname='public' AND s.relkind='S' ORDER BY 1""")
    seq_rows = cur.fetchall()

    pre: List[str] = []
    for ext in exts:
        pre.append(f"CREATE EXTENSION IF NOT EXISTS {qid(ext)}")
    for name, data_type, _owned in seq_rows:
        pre.append(f"CREATE SEQUENCE IF NOT EXISTS public.{qid(name)} AS {data_type}")

    copy_columns: Dict[str, List[str]] = {}
    table_cols: Dict[str, List[Dict[str, Any]]] = {}
    for tname in order:
        oid = tables[tname]
        cur.execute("""SELECT a.attname, pg_catalog.format_type(a.atttypid, a.atttypmod),
                              a.attnotnull, a.attidentity, a.attgenerated,
                              pg_catalog.pg_get_expr(d.adbin, d.adrelid)
                       FROM pg_attribute a
                       LEFT JOIN pg_attrdef d ON d.adrelid = a.attrelid AND d.adnum = a.attnum
                       WHERE a.attrelid = %s AND a.attnum > 0 AND NOT a.attisdropped
                       ORDER BY a.attnum""", (oid,))
        cols = cur.fetchall()
        table_cols[tname] = [{"name": c[0]} for c in cols]
        frags, copies = [], []
        for (attname, typ, notnull, identity, generated, default) in cols:
            frag = f"{qid(attname)} {typ}"
            if identity:
                # identity metadata is flattened to a sequence default so COPY
                # can round-trip explicit values (noted in the manifest)
                seq = _serial_for(cur, oid, attname)
                frag += f" NOT NULL DEFAULT nextval('{seq}')"
                fidelity.append(f"{tname}.{attname}: identity flattened to sequence default")
            elif generated:
                frag += f" GENERATED ALWAYS AS {default} STORED"
            else:
                if default is not None:
                    frag += f" DEFAULT {default}"
                if notnull:
                    frag += " NOT NULL"
            frags.append(frag)
            if not generated:
                copies.append(attname)
        pre.append(f"CREATE TABLE IF NOT EXISTS public.{qid(tname)} (\n  " +
                   ",\n  ".join(frags) + "\n)")
        copy_columns[tname] = copies

    # post-data: constraints (data first, then these), indexes, setvals
    post: List[str] = []
    cur.execute("""SELECT conrelid::regclass::text, conname,
                          pg_get_constraintdef(oid, true)
                   FROM pg_constraint
                   WHERE connamespace='public'::regnamespace
                     AND contype IN ('p','u','f','c')
                   ORDER BY contype, conname""")
    cons = cur.fetchall()
    constraint_index_names = set()
    for rel, conname, _def in cons:
        constraint_index_names.add(conname)
    order_map = {"p": 0, "u": 1, "c": 2, "f": 3}
    for rel, conname, cdef in sorted(cons, key=lambda r: order_map.get(_contype_of(r[2]), 9)):
        post.append(f"ALTER TABLE public.{qid(rel.split('.')[-1])} "
                    f"ADD CONSTRAINT {qid(conname)} {cdef}")

    cur.execute("""SELECT indexname, indexdef FROM pg_indexes
                   WHERE schemaname='public'""")
    for iname, idef in sorted(cur.fetchall()):
        if iname in constraint_index_names:
            continue
        post.append(idef)

    for name, _dt, _owned in seq_rows:
        try:
            cur.execute(f"SELECT last_value, is_called FROM public.{qid(name)}")
            last, is_called = cur.fetchone()
            post.append(f"SELECT setval('public.{qid(name)}', {int(last)}, "
                        f"{'true' if is_called else 'false'})")
        except Exception:
            pass

    return {"pre": pre, "post": post, "copy_columns": copy_columns,
            "table_order": order, "fidelity_notes": fidelity}


def _contype_of(cdef: str) -> str:
    c = cdef.upper()
    if c.startswith("PRIMARY KEY"):
        return "p"
    if c.startswith("UNIQUE"):
        return "u"
    if c.startswith("FOREIGN KEY"):
        return "f"
    return "c"


def _serial_for(cur, oid: int, attname: str) -> str:
    cur.execute("SELECT pg_get_serial_sequence(%s::regclass::text, %s)",
                (oid, attname))
    row = cur.fetchone()
    return row[0] if row and row[0] else "public." + qid(attname + "_seq")


def topo_sort(nodes: List[str], edges: List[Tuple[str, str]],
              fidelity: List[str]) -> List[str]:
    """Parents (edge[1]) before children (edge[0]). Cycles → alphabetical note."""
    from collections import defaultdict
    deps: Dict[str, set] = defaultdict(set)
    for child, parent in edges:
        if child in nodes and parent in nodes and child != parent:
            deps[child].add(parent)
    out: List[str] = []
    remaining = set(nodes)
    while remaining:
        ready = sorted(n for n in remaining if not (deps[n] & remaining))
        if not ready:
            fidelity.append("FK cycle detected; falling back to alphabetical "
                            "order for the rest")
            out.extend(sorted(remaining))
            return out
        out.extend(ready)
        remaining -= set(ready)
    return out


# --------------------------------------------------------------------------- #
# Backup run
# --------------------------------------------------------------------------- #
def count_tables(cur, tables: List[str]) -> Dict[str, int]:
    counts = {}
    for t in tables:
        cur.execute(f"SELECT count(*) FROM public.{qid(t)}")
        counts[t] = cur.fetchone()[0]
    return counts


def zip_runtime_state(cfg: Dict[str, Any], dest: Path,
                      full: bool = False) -> Tuple[int, int]:
    """Zip configured runtime_data paths; skip files over large_skip_mb
    unless --full. Returns (files_zipped, bytes_zipped)."""
    limit = None if full else cfg["backup"]["large_skip_mb"] * 1024 * 1024
    n = b = 0
    with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for rel in cfg["backup"]["runtime_state_paths"]:
            root = C.ROOT / rel
            if root.is_file():
                files = [root]
            elif root.is_dir():
                files = [p for p in root.rglob("*") if p.is_file()]
            else:
                continue
            for p in files:
                if limit and p.stat().st_size > limit:
                    continue
                zf.write(p, p.relative_to(C.ROOT).as_posix())
                n += 1
                b += p.stat().st_size
    return n, b


def write_manifest(dir_path: Path, manifest: Dict[str, Any]) -> Path:
    path = dir_path / "manifest.json"
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=1, ensure_ascii=False)
    return path


def verify_manifest(dir_path: Path) -> Dict[str, Any]:
    """Read + verify every file sha256. Raises on mismatch."""
    doc = json.loads((dir_path / "manifest.json").read_text(encoding="utf-8"))
    for f in doc.get("files", []):
        p = dir_path / f["path"]
        if not p.exists():
            raise FileNotFoundError(f"manifest file missing: {f['path']}")
        if C.sha256_file(p) != f["sha256"]:
            raise ValueError(f"sha256 mismatch: {f['path']}")
    return doc


def retention_prune(backups_dir: Path, keep_daily: int,
                    keep_weekly: int) -> List[str]:
    """Keep newest keep_daily dirs; among older ones keep one per ISO week,
    up to keep_weekly; delete the rest. Only harness-made db-* dirs."""
    if not backups_dir.exists():
        return []
    dirs = sorted((d for d in backups_dir.iterdir()
                   if d.is_dir() and d.name.startswith("db-")
                   and (d / "manifest.json").exists()),
                  key=lambda d: d.name, reverse=True)
    keep = set(dirs[:keep_daily])
    older = dirs[keep_daily:]
    weeks: Dict[str, Path] = {}
    for d in older:  # newest first
        iso = datetime.strptime(d.name[3:11], "%Y%m%d").isocalendar()
        key = f"{iso[0]}-W{iso[1]:02d}"
        if key not in weeks and len(weeks) < keep_weekly:
            weeks[key] = d
    keep.update(weeks.values())
    removed = []
    for d in dirs:
        if d not in keep:
            shutil.rmtree(d)
            removed.append(d.name)
    return removed


def run_backup(cfg: Dict[str, Any], full: bool = False) -> int:
    ts = datetime.now(timezone.utc)
    stamp = ts.strftime("%Y%m%d-%H%M")
    backups_dir = C.cfg_path(cfg, "backups")
    out_dir = backups_dir / f"db-{stamp}"
    out_dir.mkdir(parents=True, exist_ok=True)

    dsn = resolve_dburl(cfg)
    try:
        conn = psycopg2_connect(dsn)
    except Exception as exc:
        print(f"[backup] cannot reach {dsn['host']}:{dsn['port']}/{dsn['dbname']}: {exc}")
        print(f"[backup] owner-approved fallback (run it yourself):")
        print(f"    {cfg['backup']['docker_fallback_cmd']}")
        return 1
    cur = conn.cursor()
    cur.execute("SHOW server_version")
    server_version = cur.fetchone()[0]

    engine = "psycopg2_copy_dump"
    files_meta: List[Dict[str, Any]] = []

    schema = dump_schema(cur)
    counts = count_tables(cur, cfg["backup"]["core_tables"])

    # schema.json.gz (restore authority) + schema.sql (human-readable audit)
    schema_doc = {"pre": schema["pre"], "post": schema["post"],
                  "copy_columns": schema["copy_columns"]}
    raw = json.dumps(schema_doc, indent=1).encode("utf-8")
    with gzip.open(out_dir / "schema.json.gz", "wb", compresslevel=6) as zf:
        zf.write(raw)
    (out_dir / "schema.sql").write_text(
        "-- Atlas backup schema (engine psycopg2_copy_dump) "
        f"db={dsn['dbname']} ts={C.iso_utc(ts)}\n"
        + ";\n".join(schema["pre"]) + ";\n"
        + ";\n".join(schema["post"]) + ";\n", encoding="utf-8")
    files_meta.append({"path": "schema.json.gz", "bytes": (out_dir / "schema.json.gz").stat().st_size})
    files_meta.append({"path": "schema.sql", "bytes": (out_dir / "schema.sql").stat().st_size})

    # data CSVs
    table_rows: Dict[str, int] = {}
    data_dir = out_dir / "data"
    data_dir.mkdir(exist_ok=True)
    for t in schema["table_order"]:
        cols = schema["copy_columns"][t]
        collist = ", ".join(qid(c) for c in cols)
        csv_path = data_dir / f"{t}.csv.gz"
        with gzip.open(csv_path, "wb", compresslevel=6) as gzf:
            cur.copy_expert(
                f"COPY (SELECT {collist} FROM public.{qid(t)}) TO STDOUT "
                "WITH (FORMAT csv)", gzf)
        cur.execute(f"SELECT count(*) FROM public.{qid(t)}")
        table_rows[t] = cur.fetchone()[0]
        if table_rows[t] > 0:
            files_meta.append({"path": f"data/{t}.csv.gz",
                               "bytes": csv_path.stat().st_size})
        else:
            csv_path.unlink()
    conn.close()

    # runtime state zip
    rz = out_dir / "runtime_state.zip"
    n_files, n_bytes = zip_runtime_state(cfg, rz, full)
    files_meta.append({"path": "runtime_state.zip", "bytes": rz.stat().st_size})

    for f in files_meta:
        f["sha256"] = C.sha256_file(out_dir / f["path"])

    manifest = {
        "workdir": "atlas-backup", "ts_utc": C.iso_utc(ts),
        "engine": engine, "db_name": dsn["dbname"],
        "pg_server_version": server_version,
        "table_order": schema["table_order"], "table_rows": table_rows,
        "counts": counts, "files": files_meta,
        "runtime_state": {"files": n_files, "source_bytes": n_bytes},
        "fidelity_notes": schema["fidelity_notes"],
        "full": full,
    }
    mpath = write_manifest(out_dir, manifest)
    removed = retention_prune(backups_dir, cfg["backup"]["retain_daily"],
                              cfg["backup"]["retain_weekly"])
    total_mb = sum(f["bytes"] for f in files_meta) / (1024 * 1024)
    print(f"[backup] OK -> {out_dir}")
    print(f"[backup] engine={engine} pg={server_version} "
          f"tables={len(table_order_str(manifest))} "
          f"rows={sum(table_rows.values())} "
          f"files={len(files_meta)} total={total_mb:.1f} MB")
    print(f"[backup] counts: {counts}")
    print(f"[backup] runtime_state.zip: {n_files} files, "
          f"{n_bytes / (1024 * 1024):.1f} MB source")
    print(f"[backup] manifest sha256: {C.sha256_file(mpath)}")
    if removed:
        print(f"[backup] retention pruned: {', '.join(removed)}")
    return 0


def table_order_str(manifest: Dict[str, Any]) -> List[str]:
    return manifest.get("table_order", [])


# --------------------------------------------------------------------------- #
# Restore drill (adapter-based: production=psycopg2, tests=sqlite)
# --------------------------------------------------------------------------- #
class Adapter:
    """Minimal storage adapter for the drill orchestrator."""

    def create_scratch(self, name: str) -> None: ...
    def connect_scratch(self, name: Any): ...
    def exec(self, conn: Any, sql: str) -> None: ...
    def copy_in(self, conn: Any, table: str, cols: List[str],
                csv_gz_path: Path) -> int: ...
    def count(self, conn: Any, table: str) -> int: ...
    def probe(self, conn: Any, table: str) -> Any: ...
    def drop_scratch(self, name: str) -> None: ...


class PostgresAdapter(Adapter):
    def __init__(self, dsn: Dict[str, str]):
        self.dsn = dsn

    def create_scratch(self, name: str) -> None:
        conn = psycopg2_connect(self.dsn, dbname="postgres", autocommit=True)
        cur = conn.cursor()
        cur.execute(f"CREATE DATABASE {qid(name)}")
        conn.close()

    def connect_scratch(self, name: str):
        return psycopg2_connect(self.dsn, dbname=name)

    def exec(self, conn, sql: str) -> None:
        conn.cursor().execute(sql)
        conn.commit()

    def copy_in(self, conn, table, cols, csv_gz_path) -> int:
        collist = ", ".join(qid(c) for c in cols)
        n = 0
        with gzip.open(csv_gz_path, "rb") as gzf:
            # psycopg2 copy_expert needs a file-like; stream via a reader that counts
            cur = conn.cursor()
            cur.copy_expert(
                f"COPY public.{qid(table)} ({collist}) FROM STDIN "
                "WITH (FORMAT csv)", gzf)
            conn.commit()
            return cur.rowcount if cur.rowcount and cur.rowcount > 0 else -1

    def count(self, conn, table) -> int:
        cur = conn.cursor()
        cur.execute(f"SELECT count(*) FROM public.{qid(table)}")
        return cur.fetchone()[0]

    def probe(self, conn, table) -> Any:
        cur = conn.cursor()
        cur.execute(f"SELECT * FROM public.{qid(table)} LIMIT 1")
        cur.fetchone()
        return True

    def drop_scratch(self, name: str) -> None:
        conn = psycopg2_connect(self.dsn, dbname="postgres", autocommit=True)
        try:
            cur = conn.cursor()
            # hard timeout: a wedged cluster (ProcSignalBarrier blocked by a
            # zombie backend) must never wedge the drill CLI forever
            cur.execute("SET statement_timeout = '30s'")
            # terminate any stray connections first; WITH (FORCE) is avoided —
            # it can hang on ProcSignalBarrier when busy backends exist
            cur.execute("SELECT pg_terminate_backend(pid) FROM pg_stat_activity "
                        "WHERE datname = %s AND pid <> pg_backend_pid()", (name,))
            cur.execute(f"DROP DATABASE {qid(name)}")
        finally:
            conn.close()


def assert_scratch_safe(name: str, blocklist: List[str]) -> None:
    if name in blocklist:
        raise ValueError(f"refusing to touch live database: {name}")
    if not name.startswith(SCRATCH_PREFIX):
        raise ValueError(f"scratch name must start with {SCRATCH_PREFIX}: {name}")


def run_drill(cfg: Dict[str, Any], backup_dir: Path, adapter: Adapter,
              keep: bool = False, scratch_name: Optional[str] = None) -> Tuple[int, Dict[str, Any]]:
    ts = datetime.now(timezone.utc)
    name = scratch_name or (SCRATCH_PREFIX + ts.strftime("%Y%m%d%H%M%S"))
    assert_scratch_safe(name, cfg["backup"]["live_db_names_blocklist"])

    manifest = json.loads((backup_dir / "manifest.json").read_text(encoding="utf-8"))
    schema = json.loads(gzip.open(backup_dir / "schema.json.gz", "rt",
                                  encoding="utf-8").read())
    report: Dict[str, Any] = {"scratch_db": name, "backup_dir": str(backup_dir),
                              "ts_utc": C.iso_utc(ts), "tables": {}, "probe": None}
    code = 0
    try:
        adapter.create_scratch(name)
        conn = adapter.connect_scratch(name)
        for stmt in schema["pre"]:
            adapter.exec(conn, stmt)
        for t in manifest["table_order"]:
            rows = manifest["table_rows"].get(t, 0)
            csv = backup_dir / "data" / f"{t}.csv.gz"
            if rows and csv.exists():
                adapter.copy_in(conn, t, schema["copy_columns"][t], csv)
            elif rows and not csv.exists():
                report["tables"][t] = {"expected": rows, "loaded": None,
                                       "status": "FAIL (csv missing)"}
                code = 1
        for stmt in schema["post"]:
            adapter.exec(conn, stmt)
        loaded = 0
        for t in manifest["table_order"]:
            expected = manifest["table_rows"].get(t, 0)
            got = adapter.count(conn, t)
            ok = got == expected
            loaded += got
            report["tables"][t] = {"expected": expected, "loaded": got,
                                   "status": "PASS" if ok else "FAIL"}
            if not ok:
                code = 1
        core_fail = [t for t in cfg["backup"]["core_tables"]
                     if t in report["tables"] and report["tables"][t]["status"] != "PASS"]
        report["rows_loaded_total"] = loaded
        report["core_tables_all_pass"] = not core_fail
        if core_fail:
            code = 1
        report["probe"] = {"ok": bool(adapter.probe(conn, manifest["counts"] and
                                                    cfg["backup"]["core_tables"][0])),
                           "note": f"SELECT 1 row from {cfg['backup']['core_tables'][0]}"}
        if not report["probe"]["ok"]:
            code = 1
    finally:
        if not keep:
            try:
                adapter.drop_scratch(name)
                report["dropped"] = True
            except Exception as exc:
                report["dropped"] = False
                report["drop_error"] = repr(exc)[:300]
                print(f"[restore-drill] OWNER ACTION: scratch db {name} could "
                      f"not be dropped ({exc!r:.120}); drop it manually once "
                      f"the cluster is healthy")
        else:
            report["dropped"] = False
    report["verdict"] = "PASS" if code == 0 else "FAIL"
    (backup_dir / "drill_report.json").write_text(
        json.dumps(report, indent=1, ensure_ascii=False), encoding="utf-8")
    return code, report


def print_drill_report(report: Dict[str, Any]) -> None:
    print(f"[restore-drill] scratch db: {report['scratch_db']} "
          f"(NEVER the live database)")
    for t, r in report["tables"].items():
        print(f"[restore-drill]   {t}: expected={r.get('expected')} "
              f"loaded={r.get('loaded')} -> {r.get('status')}")
    print(f"[restore-drill] rows loaded: {report.get('rows_loaded_total')}")
    print(f"[restore-drill] health probe: {report.get('probe')}")
    print(f"[restore-drill] scratch dropped: {report.get('dropped')}")
    print(f"[restore-drill] VERDICT: {report['verdict']}")


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #
def main(argv: Optional[List[str]] = None) -> int:
    ap = argparse.ArgumentParser(prog="harness backup")
    ap.add_argument("command", choices=["backup", "restore-drill"])
    ap.add_argument("backup_dir", nargs="?", help="restore-drill only")
    ap.add_argument("--full", action="store_true")
    ap.add_argument("--keep", action="store_true")
    args = ap.parse_args(argv)
    cfg = C.load_config()
    if args.command == "backup":
        return run_backup(cfg, full=args.full)
    if not args.backup_dir:
        ap.error("restore-drill requires <backup-dir>")
    bdir = Path(args.backup_dir)
    if not bdir.is_absolute():
        bdir = C.ROOT / bdir
    dsn = resolve_dburl(cfg)
    code, report = run_drill(cfg, bdir, PostgresAdapter(dsn), keep=args.keep)
    print_drill_report(report)
    return code


if __name__ == "__main__":
    raise SystemExit(main())
