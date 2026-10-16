"""common.py — shared helpers for the Atlas Loop harness.

Stdlib-only (plus httpx/psutil where noted). Windows-safe: no POSIX-only
calls; every subprocess uses argument lists and explicit cwd. All commands
run from D:\\platform (ROOT below) per the operating prompt.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Callable, Dict, Iterable, List, Optional, Tuple

ROOT = Path(__file__).resolve().parent.parent  # D:\platform
HARNESS = ROOT / "harness"

# Exit-code contract (§12 of the operating prompt)
EXIT_OK = 0
EXIT_GATE_RED = 2        # gate/soak red, or blocking SKIPPED
EXIT_ILLEGAL = 3         # illegal transition
EXIT_MISSING = 4         # missing evidence/receipt/snapshot
EXIT_JUDGE_FAIL = 5      # judge FAIL
EXIT_TAMPER = 6          # receipt chain broken
EXIT_OPS_RED = 7         # digest/watch threshold breach


# --------------------------------------------------------------------------- #
# Config
# --------------------------------------------------------------------------- #
def load_config(path: Optional[Path] = None) -> Dict[str, Any]:
    cfg_path = path or (HARNESS / "config.json")
    with open(cfg_path, "r", encoding="utf-8") as fh:
        return json.load(fh)


def cfg_path(cfg: Dict[str, Any], key: str) -> Path:
    return ROOT / cfg["paths"][key]


# --------------------------------------------------------------------------- #
# Time
# --------------------------------------------------------------------------- #
def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def iso_utc(dt: Optional[datetime] = None) -> str:
    dt = dt or now_utc()
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")


def parse_utc(ts: str) -> Optional[datetime]:
    try:
        return datetime.fromisoformat(ts.replace("Z", "+00:00"))
    except (ValueError, AttributeError):
        return None


# --------------------------------------------------------------------------- #
# Hashing
# --------------------------------------------------------------------------- #
def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def short_hash(data: str) -> str:
    return sha256_bytes(data.encode("utf-8"))[:8]


# --------------------------------------------------------------------------- #
# JSONL
# --------------------------------------------------------------------------- #
def stream_jsonl(path: Path) -> Iterable[Dict[str, Any]]:
    with open(path, "r", encoding="utf-8", errors="replace") as fh:
        for line in fh:
            line = line.strip()
            if not line:
                continue
            try:
                yield json.loads(line)
            except json.JSONDecodeError:
                continue


def append_jsonl(path: Path, row: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(row, ensure_ascii=False) + "\n")


def read_jsonl(path: Path) -> List[Dict[str, Any]]:
    return list(stream_jsonl(path)) if path.exists() else []


# --------------------------------------------------------------------------- #
# Receipt ids
# --------------------------------------------------------------------------- #
def receipt_id(prefix: str = "rcpt") -> str:
    stamp = now_utc().strftime("%Y%m%dT%H%M%S") + "Z"
    return f"{prefix}_{stamp}_{short_hash(stamp + os.urandom(4).hex())}"


# --------------------------------------------------------------------------- #
# HTTP (injectable for unit tests; read-only GET only — §2.2)
# --------------------------------------------------------------------------- #
def http_get(url: str, timeout: float = 8.0) -> Tuple[int, str, float]:
    """GET → (status_code, body_text, elapsed_seconds). Never raises."""
    import httpx
    try:
        t0 = os.times()
        import time as _t
        start = _t.perf_counter()
        r = httpx.get(url, timeout=timeout, follow_redirects=True)
        elapsed = _t.perf_counter() - start
        return r.status_code, r.text, elapsed
    except Exception as exc:  # connection refused, timeout, DNS ...
        return -1, repr(exc), -1.0


# --------------------------------------------------------------------------- #
# Log sources (file tail + docker logs — both read-only)
# --------------------------------------------------------------------------- #
def read_file_tail(path: Path, max_bytes: int = 20_000_000) -> Optional[str]:
    if not path.exists():
        return None
    size = path.stat().st_size
    with open(path, "rb") as fh:
        if size > max_bytes:
            fh.seek(-max_bytes, os.SEEK_END)
        return fh.read().decode("utf-8", errors="replace")


def docker_logs(container: str, since: str = "24h", tail: int = 20000) -> Optional[str]:
    """Read-only `docker logs`. Returns None if the CLI or container is absent."""
    exe = _which("docker")
    if not exe:
        return None
    try:
        out = subprocess.run(
            [exe, "logs", "--since", since, "--tail", str(tail), container],
            capture_output=True, text=True, timeout=120,
            cwd=str(ROOT), errors="replace",
        )
        if out.returncode != 0:
            return None
        return out.stdout + out.stderr
    except (OSError, subprocess.SubprocessError):
        return None


def _which(name: str) -> Optional[str]:
    from shutil import which
    return which(name)


def find_uvicorn_rss_mb() -> Optional[float]:
    """RSS in MB of a native dev uvicorn on port 8020, if one is running."""
    try:
        import psutil
    except ImportError:
        return None
    total = 0.0
    found = False
    for proc in psutil.process_iter(["cmdline", "memory_info"]):
        try:
            cmd = " ".join(proc.info.get("cmdline") or [])
        except Exception:
            continue
        if "uvicorn" in cmd and "8020" in cmd:
            try:
                total += proc.info["memory_info"].rss / (1024 * 1024)
                found = True
            except Exception:
                pass
    return round(total, 1) if found else None


def disk_free_pct(drive: str = "D:\\") -> float:
    import shutil
    total, used, _free = shutil.disk_usage(drive)
    pct_free = 100.0 * (total - used) / total
    return round(pct_free, 1)


# --------------------------------------------------------------------------- #
# Threshold evaluation
# --------------------------------------------------------------------------- #
class Check:
    """One threshold line: name, measured value, limit, comparison."""

    def __init__(self, name: str, value: Any, limit: Any, red: bool,
                 unit: str = "", detail: str = ""):
        self.name, self.value, self.limit = name, value, limit
        self.red, self.unit, self.detail = red, unit, detail

    def render(self) -> str:
        arrow = "RED" if self.red else "green"
        cmp_ = {"max": "<", "min": ">"}[self.detail or "max"]
        unit = self.unit if isinstance(self.value, (int, float)) else ""
        return (f"{arrow} {self.name}: {self.value}{unit} "
                f"(threshold {cmp_} {self.limit}{self.unit})")


def check_max(name: str, value: float, limit: float, unit: str = "") -> Check:
    return Check(name, value, limit, value > limit, unit, "max")


def check_min(name: str, value: float, limit: float, unit: str = "") -> Check:
    return Check(name, value, limit, value < limit, unit, "min")


def find_bash() -> Optional[str]:
    """Find a functional bash executable on Windows, prioritizing Git Bash."""
    import shutil
    candidates = [
        r"C:\Program Files\Git\bin\bash.exe",
        r"C:\Program Files\Git\usr\bin\bash.exe",
        r"C:\Git\bin\bash.exe",
    ]
    for c in candidates:
        if Path(c).is_file():
            return c
    found = shutil.which("bash")
    if found and "system32" not in found.lower():
        return found
    return None


def eprint(*args: Any) -> None:
    print(*args, file=sys.stderr)

