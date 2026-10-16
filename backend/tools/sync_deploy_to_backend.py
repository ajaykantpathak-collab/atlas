"""sync_deploy_to_backend.py -- Automated Two-Way or Deploy-to-Root Synchronizer.

Keeps D:\\platform\\deploy\\backend and D:\\platform\\backend in 100% byte-for-byte SHA256 parity
for all solver files and critical services.

Usage:
    python tools/sync_deploy_to_backend.py [--check] [--verbose]
"""

from __future__ import annotations

import argparse
import hashlib
import os
import shutil
import sys
from pathlib import Path

REPO_DIR = Path(r"D:\platform")
DEPLOY_DIR = REPO_DIR / "deploy" / "backend"
ROOT_DIR = REPO_DIR / "backend"

SYNC_SUBDIRS = [
    "its",
    "services",
    "routers",
    "api",
    "tools",
    "tests",
]

SYNC_FILES = [
    "main.py",
    "config.py",
    "database.py",
]


def _sha(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def sync(check_only: bool = False, verbose: bool = False) -> int:
    if not DEPLOY_DIR.exists():
        print(f"Error: {DEPLOY_DIR} does not exist", file=sys.stderr)
        return 1
    if not ROOT_DIR.exists():
        print(f"Error: {ROOT_DIR} does not exist", file=sys.stderr)
        return 1

    targets: list[Path] = []
    for sub in SYNC_SUBDIRS:
        sub_path = DEPLOY_DIR / sub
        if sub_path.exists():
            for p in sub_path.rglob("*.py"):
                if "__pycache__" not in p.parts:
                    targets.append(p.relative_to(DEPLOY_DIR))

    for fname in SYNC_FILES:
        fp = DEPLOY_DIR / fname
        if fp.exists():
            targets.append(Path(fname))

    differ = []
    synced = 0

    for rel in targets:
        src = DEPLOY_DIR / rel
        dst = ROOT_DIR / rel

        if not dst.exists() or _sha(src) != _sha(dst):
            differ.append(rel)
            if not check_only:
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dst)
                synced += 1
                if verbose:
                    print(f"Synced: {rel}")

    if check_only:
        if differ:
            print(f"Drift detected in {len(differ)} file(s):")
            for d in differ:
                print(f"  - {d}")
            return 1
        print(f"Parity verified: {len(targets)} files identical between deploy and root.")
        return 0
    else:
        print(f"Sync complete: {synced} file(s) updated out of {len(targets)} monitored files.")
        return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Check parity without copying")
    parser.add_argument("--verbose", action="store_true", help="Verbose output")
    args = parser.parse_args()
    sys.exit(sync(check_only=args.check, verbose=args.verbose))
