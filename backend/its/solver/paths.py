"""paths.py -- runtime-data and env-file resolution for the solver lanes.

WSA-P4 (2026-10-10): three solver sites resolved runtime data with a
hardcoded Windows literal as a fallback (`D:\\platform\\runtime_data`,
`D:\\platform\\deploy\\.env`).  Inside the Linux containers those paths
never exist, so the fallback silently no-op'd and the lanes degraded
with zero trace (routing map SS10.2).  One resolver, one ladder:

  1. ``CBSE_DATA_DIR`` env — AUTHORITATIVE when set.  Never falls
     through to a Windows literal: an operator who points the env at a
     dir means that dir, even before the file exists there.
  2. package-relative ``<repo>/cbse_data`` — the container mount
     (``/app/cbse_data``, Docker bind of runtime_data) and the native
     deploy tree (``deploy/cbse_data``).
  3. legacy Windows literal ``D:\\platform\\runtime_data`` — LAST
     resort for bare native runs where the package-relative dir does
     not exist at all.
  4. package-relative again as the writable default (a write must have
     somewhere deterministic to create).

Stdlib only; no solver-package imports (this module sits under
everything and must never cycle).
"""
from __future__ import annotations

import os
from typing import List

# resolved once per process; env changes (tests, dev boots) reset it via
# reset_caches()
_DATA_DIR_CACHE: List[str] = []

_LEGACY_RUNTIME_LITERAL = r"D:\platform\runtime_data"
_LEGACY_DEPLOY_ENV_LITERAL = r"D:\platform\deploy\.env"


def _package_root() -> str:
    # .../<repo>/backend/its/solver/paths.py -> .../<repo>
    return os.path.normpath(os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "..", "..", ".."))


def _package_cbse_data() -> str:
    return os.path.join(_package_root(), "cbse_data")


def reset_caches() -> None:
    """Tests/dev boots that change CBSE_DATA_DIR call this so resolution
    is re-evaluated (paths are otherwise resolved once per process)."""
    del _DATA_DIR_CACHE[:]


def data_dir() -> str:
    """The runtime data directory (solver state, banks, memos)."""
    env = os.environ.get("CBSE_DATA_DIR")
    if env:
        return os.path.normpath(env)
    if _DATA_DIR_CACHE:
        return _DATA_DIR_CACHE[0]
    pkg = _package_cbse_data()
    if os.path.isdir(pkg):
        chosen = pkg
    elif os.path.isdir(_LEGACY_RUNTIME_LITERAL):
        chosen = _LEGACY_RUNTIME_LITERAL
    else:
        chosen = pkg  # writable default
    _DATA_DIR_CACHE.append(chosen)
    return chosen


def data_file(name: str) -> str:
    """Resolve a runtime-data file through the data_dir ladder."""
    return os.path.join(data_dir(), name)


def env_file_candidates() -> List[str]:
    """Where a deploy .env may live, in authority order:
    ``CBSE_ENV_FILE`` env, package-relative ``<repo>/.env``, then the
    legacy Windows literal (never present inside the containers)."""
    out = []
    env = os.environ.get("CBSE_ENV_FILE")
    if env:
        out.append(os.path.normpath(env))
    out.append(os.path.join(_package_root(), ".env"))
    out.append(_LEGACY_DEPLOY_ENV_LITERAL)
    return out
