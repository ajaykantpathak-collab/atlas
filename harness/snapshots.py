"""snapshots.py — pre-change snapshot manifest + byte-identical rollback (§10).

snapshot WI  copies every in-scope file (from the plan receipt) into
harness/snapshots/<WI>/ plus manifest.json. rollback restores every
manifest file, verifies each sha256 after restore (prints the table),
and the runner writes the ROLLED_BACK receipt. Snapshots are kept until
SHIPPED + 7 days, then pruned by `harness gc`.
"""
from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any, Dict, List, Optional

import common as C


def snapshot_dir(cfg: Dict[str, Any], wi: str) -> Path:
    return C.cfg_path(cfg, "snapshots") / wi


def snapshot(cfg: Dict[str, Any], wi: str,
             files: Optional[List[str]] = None) -> Path:
    if files is None:
        import runner as R
        plan_doc = json.loads(R._plan_receipt(cfg, wi).read_text(encoding="utf-8"))
        files = plan_doc["evidence"]["files_in_scope"]
    if not files:
        raise SystemExit(4)
    sdir = snapshot_dir(cfg, wi)
    (sdir / "files").mkdir(parents=True, exist_ok=True)
    manifest = {"work_item": wi, "ts_utc": C.iso_utc(), "files": []}
    for i, rel in enumerate(files):
        src = C.ROOT / rel
        if not src.exists():
            # file not yet created: record as new — rollback DELETES it
            manifest["files"].append({"path": rel, "sha256": None,
                                      "bytes": 0, "blob": None, "new": True})
            continue
        blob = f"files/{i:03d}_{src.name}"
        shutil.copyfile(src, sdir / blob)
        manifest["files"].append({"path": rel, "sha256": C.sha256_file(src),
                                  "bytes": src.stat().st_size, "blob": blob})
    mpath = sdir / "manifest.json"
    mpath.write_text(json.dumps(manifest, indent=1, ensure_ascii=False),
                     encoding="utf-8")
    return mpath


def restore_files(cfg: Dict[str, Any], wi: str) -> List[Dict[str, Any]]:
    sdir = snapshot_dir(cfg, wi)
    manifest_path = sdir / "manifest.json"
    if not manifest_path.exists():
        raise FileNotFoundError(
            f"no snapshot manifest for {wi} (run: harness.py snapshot {wi})")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    table: List[Dict[str, Any]] = []
    for entry in manifest["files"]:
        dest = C.ROOT / entry["path"]
        if entry.get("new") or entry.get("blob") is None:
            # file did not exist pre-change: rollback deletes it
            if dest.exists():
                dest.unlink()
            table.append({"path": entry["path"], "sha256": None,
                          "restored_sha256": None,
                          "ok": not dest.exists()})
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(sdir / entry["blob"], dest)
        ok = C.sha256_file(dest) == entry["sha256"]
        table.append({"path": entry["path"], "sha256": entry["sha256"],
                      "restored_sha256": C.sha256_file(dest), "ok": ok})
    return table


def print_restore_table(table: List[Dict[str, Any]]) -> None:
    print(f"{'path':60s} {'ok':5s} sha256")
    for r in table:
        print(f"{r['path']:60s} {str(r['ok']):5s} {r['sha256'][:16]}..."
              f"{'==' + r['restored_sha256'][:16] if r['ok'] else '!= MISMATCH'}")


def gc(cfg: Dict[str, Any]) -> List[str]:
    """Prune snapshots of WIs SHIPPED more than 7 days ago."""
    import runner as R
    removed = []
    sroot = C.cfg_path(cfg, "snapshots")
    if not sroot.exists():
        return removed
    for d in sroot.iterdir():
        if not d.is_dir() or not R.WI_RX.match(d.name):
            continue
        try:
            state = R.state_of(cfg, d.name)
        except Exception:
            continue
        if state != "SHIPPED":
            continue
        rcpts = R.receipts_of(cfg, d.name)
        ship_ts = None
        for p in rcpts:
            doc = json.loads(p.read_text(encoding="utf-8"))
            if doc.get("to_state") == "SHIPPED":
                ship_ts = C.parse_utc(doc.get("ts_utc", ""))
        if ship_ts is None:
            continue
        if (C.now_utc() - ship_ts).days > 7:
            shutil.rmtree(d)
            removed.append(d.name)
    return removed
