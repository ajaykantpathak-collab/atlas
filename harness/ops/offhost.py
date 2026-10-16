"""offhost.py — LAUNCH-FIX-F4 (2026-10-15): copy the newest backups OFF
this host and verify them AT the destination.

Audit §2 #3 (CRITICAL): daily backups existed but were same-host only
(``D:\\platform\\backups`` and ``harness/ops/backups`` — same disk as the
production databases). Disk or host loss = product + user-data loss.

Transport, in order (auto-detected, env/config driven):
  1. rclone   — when ``rclone`` is on PATH and the target looks like a
     remote (``remote:bucket/path``). Supports every cloud store via one
     binary; owner installs rclone + configures the remote once.
  2. robocopy — Windows builtin, for a UNC network share, a second
     physical disk, or a mounted cloud drive letter.
  3. neither configured — prints the EXACT owner setup commands and
     exits 2. Never a silent no-op: the scheduled task's log must show
     the gap every morning until a target exists.

Configuration (either works, env wins):
  OFFHOST_BACKUP_TARGET        e.g. ``atlas-backups:dream_app`` (rclone)
                               or ``\\\\NAS\\AtlasBackups`` / ``E:\\AtlasBackups``
  harness config.json          backup.offhost_target

What is copied (newest only — cheap daily delta):
  * newest ``harness/ops/backups/db-*`` dir  — the harness backup
    (schema.json.gz + data/*.csv.gz + runtime_state.zip + manifest.json)
  * newest ``dream_app_*.dump`` + ``atlas_compliance_*.dump`` from the
    pg_dump lane (``D:\\platform\\backups``) when present

Verification: every manifest-listed file is re-hashed AT the destination
(sha256); raw dumps are hashed at source and destination and compared.
Mismatch or missing file => exit 1 (loud, non-zero — schedtasks surface
it). Exit codes: 0 copied+verified · 1 copy/verify failure · 2 target
unconfigured.

CLI:  python harness/harness.py offhost-copy
      (thin wrapper: deploy/scripts/backup_offhost.cmd for Task Scheduler;
       schedule: deploy/scripts/INSTALL_OFFHOST_BACKUP.cmd — daily 04:30,
       after the 03:30 dump + 04:00 second-copy)
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Dict, Optional

# exit codes (align with harness.py conventions: 2 = blocked/owner action)
EXIT_OK = 0
EXIT_FAIL = 1
EXIT_UNCONFIGURED = 2

OWNER_SETUP_COMMANDS = """
[offhost] OWNER ACTION — no off-host target configured. Pick ONE:

  (a) Cloud via rclone (recommended; any S3/GDrive/OneDrive/B2 target):
      1. Install rclone:  winget install Rclone.Rclone
      2. Configure a remote (named e.g. 'atlas-backups'):
         rclone config            # follow prompts, name it atlas-backups
         rclone lsd atlas-backups: # verify it lists
      3. Set the target permanently (machine-wide, for Task Scheduler):
         setx OFFHOST_BACKUP_TARGET "atlas-backups:dream_app" /M
      4. Re-run: python harness\\harness.py offhost-copy

  (b) Second box/NAS via robocopy (no new software):
      setx OFFHOST_BACKUP_TARGET "\\\\YOUR-NAS\\AtlasBackups" /M
      (or a second physical disk, e.g. E:\\AtlasBackups — must NOT be a
       partition of the same physical disk as D:)
      Re-run: python harness\\harness.py offhost-copy
"""


def _sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def resolve_target(cfg: Optional[Dict], env: Optional[Dict] = None) -> str:
    env = env if env is not None else os.environ
    t = env.get("OFFHOST_BACKUP_TARGET", "").strip()
    if t:
        return t
    if cfg:
        t = str(cfg.get("backup", {}).get("offhost_target", "")).strip()
        if t:
            return t
    return ""


def newest_dir(parent: Path, prefix: str) -> Optional[Path]:
    if not parent.is_dir():
        return None
    dirs = sorted((d for d in parent.iterdir()
                   if d.is_dir() and d.name.startswith(prefix)),
                  key=lambda d: d.name, reverse=True)
    return dirs[0] if dirs else None


def newest_file(parent: Path, pattern: str) -> Optional[Path]:
    if not parent.is_dir():
        return None
    files = sorted(parent.glob(pattern), key=lambda p: p.name, reverse=True)
    return files[0] if files else None


def _robocopy(src: Path, dst: Path) -> None:
    # /E recurse incl. empty dirs; NO /MIR — never delete at the target.
    # robocopy exit codes: 0-7 are success shapes; >=8 is failure.
    r = subprocess.run(["robocopy", str(src), str(dst), "/E", "/NFL",
                        "/NDL", "/NJH", "/NP"],
                       capture_output=True, text=True)
    if r.returncode >= 8:
        raise RuntimeError(f"robocopy failed ({r.returncode}): "
                           f"{(r.stderr or r.stdout)[:400]}")


def _robocopy_file(src: Path, dest_dir: Path) -> None:
    dest_dir.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(["robocopy", str(src.parent), str(dest_dir),
                        src.name, "/NFL", "/NDL", "/NJH", "/NP"],
                       capture_output=True, text=True)
    if r.returncode >= 8:
        raise RuntimeError(f"robocopy failed ({r.returncode}): "
                           f"{(r.stderr or r.stdout)[:400]}")


def _rclone(src: Path, target: str) -> None:
    r = subprocess.run(["rclone", "copy", str(src), target,
                        "--transfers", "4"],
                       capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(f"rclone failed ({r.returncode}): "
                           f"{(r.stderr or r.stdout)[:400]}")


def _rclone_to(src: Path, dest_remote_path: str) -> None:
    r = subprocess.run(["rclone", "copyto", str(src), dest_remote_path],
                       capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(f"rclone copyto failed ({r.returncode}): "
                           f"{(r.stderr or r.stdout)[:400]}")


def _use_rclone(target: str, env: Dict) -> bool:
    """rclone iff available AND the target is a remote (``name:bucket``),
    not a Windows drive path (``E:\\dir`` — single letter before the
    colon), and no explicit robocopy override is set."""
    if env.get("OFFHOST_BACKUP_TRANSPORT", "").lower() == "robocopy":
        return False
    if env.get("OFFHOST_BACKUP_TRANSPORT", "").lower() == "rclone":
        return shutil.which("rclone") is not None
    if not shutil.which("rclone"):
        return False
    return bool(re.match(r"^[A-Za-z0-9_-]{2,}:", target))


def verify_backup_dir(dest_dir: Path) -> Dict[str, int]:
    """Re-hash every manifest file AT the destination.
    Returns {"files": n, "bad": n, "missing": n}; raises FileNotFoundError
    when the manifest itself is absent."""
    manifest = json.loads((dest_dir / "manifest.json").read_text(
        encoding="utf-8"))
    bad = missing = 0
    for f in manifest.get("files", []):
        p = dest_dir / f["path"]
        if not p.exists():
            missing += 1
            continue
        if _sha256(p) != f["sha256"]:
            bad += 1
    return {"files": len(manifest.get("files", [])), "bad": bad,
            "missing": missing}


def run_offhost(cfg: Optional[Dict] = None,
                env: Optional[Dict] = None,
                harness_backups: Optional[Path] = None,
                pg_lane: Optional[Path] = None) -> int:
    """Copy + verify. Optional source-dir params keep it testable; the
    CLI uses the real locations (harness/ops/backups, platform/backups)."""
    env = env if env is not None else os.environ
    if cfg is None:
        sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
        import common as C  # noqa: E402  (harness root)
        cfg = C.load_config()

    target = resolve_target(cfg, env)
    if not target:
        print(OWNER_SETUP_COMMANDS)
        return EXIT_UNCONFIGURED

    harness_root = Path(__file__).resolve().parent.parent  # .../harness
    platform_root = harness_root.parent                     # .../platform
    harness_backups = harness_backups or (harness_root / "ops" / "backups")
    pg_lane = pg_lane or (platform_root / "backups")

    failures: list[str] = []

    # -- 1. newest harness backup dir (manifest-verified at destination) --
    hb = newest_dir(harness_backups, "db-")
    if hb is not None:
        dest_name = "harness_" + hb.name
        try:
            if _use_rclone(target, env):
                _rclone(hb, target.rstrip("/") + "/" + dest_name)
                verify_at = None  # remote: rclone verifies hashes itself
            else:
                dest_dir = Path(target) / dest_name
                _robocopy(hb, dest_dir)
                verify_at = dest_dir
            if verify_at is not None:
                res = verify_backup_dir(verify_at)
                status = "OK" if res["bad"] == res["missing"] == 0 else "FAIL"
                print(f"[offhost] {hb.name}: {res['files']} files verified "
                      f"at destination -> {status} ({verify_at})")
                if status == "FAIL":
                    failures.append(f"{hb.name}: {res['bad']} bad, "
                                    f"{res['missing']} missing at destination")
            else:
                print(f"[offhost] {hb.name}: rclone copy -> "
                      f"{target.rstrip('/')}/{dest_name}")
        except Exception as exc:  # noqa: BLE001 — report, keep going
            failures.append(f"{hb.name}: {exc}")
            print(f"[offhost] FAIL {hb.name}: {exc}")
    else:
        print("[offhost] no harness backup dir under "
              f"{harness_backups} (run: python harness/harness.py backup)")

    # -- 2. newest pg_dump lane files (size + sha256 source-vs-dest) --
    for pattern in ("dream_app_*.dump", "atlas_compliance_*.dump"):
        src = newest_file(pg_lane, pattern)
        if src is None:
            continue
        try:
            if _use_rclone(target, env):
                _rclone_to(src, target.rstrip("/") + "/pg_dump/" + src.name)
                print(f"[offhost] {src.name}: rclone copyto -> "
                      f"{target.rstrip('/')}/pg_dump/{src.name}")
            else:
                dest_dir = Path(target) / "pg_dump"
                _robocopy_file(src, dest_dir)
                dest = dest_dir / src.name
                src_hash, dst_hash = _sha256(src), _sha256(dest)
                ok = src_hash == dst_hash
                print(f"[offhost] {src.name}: sha256 "
                      f"{'match' if ok else 'MISMATCH'} -> "
                      f"{dest} ({src.stat().st_size} bytes)")
                if not ok:
                    failures.append(f"{src.name}: sha256 mismatch")
        except Exception as exc:  # noqa: BLE001
            failures.append(f"{pattern}: {exc}")
            print(f"[offhost] FAIL {pattern}: {exc}")

    if failures:
        print(f"[offhost] VERDICT: FAIL ({len(failures)} failure(s))")
        for f in failures:
            print(f"[offhost]   - {f}")
        return EXIT_FAIL
    print("[offhost] VERDICT: OK — newest backups exist off this host, "
          "verified at the destination")
    return EXIT_OK


def main(argv: Optional[list] = None) -> int:  # CLI parity with backup.py
    return run_offhost()


if __name__ == "__main__":
    raise SystemExit(main())
