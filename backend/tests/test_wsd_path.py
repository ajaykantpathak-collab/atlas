# -*- coding: utf-8 -*-
"""WS-D file-path confinement probes (supplements.py, 2026-10-10).

GET /api/supplements/file?path=<...> serves a file from the supplements
root.  These tests fire real traversal payloads at the confinement helper
and prove the whole indexed corpus still resolves (no regression for the
live NIM marker library).
"""

from __future__ import annotations

import json
import os
import tempfile
from pathlib import Path

import pytest

from backend.api import supplements


@pytest.fixture()
def fake_root(tmp_path: Path) -> Path:
    (tmp_path / "maths" / "drill").mkdir(parents=True)
    (tmp_path / "maths" / "drill" / "c10_drill.marker").write_text("DATA", encoding="utf-8")
    (tmp_path / "secret.txt").write_text("TOP", encoding="utf-8")
    (tmp_path / ".hidden").write_text("ENV", encoding="utf-8")
    (tmp_path / "maths" / ".env").write_text("LEAK", encoding="utf-8")
    return tmp_path


TRAVERSAL_PAYLOADS = [
    "../secret.txt",
    "../../secret.txt",
    "maths/../../secret.txt",
    "maths/drill/../../../../secret.txt",
    "/etc/passwd",
    "//etc/passwd",
    "C:\\Windows\\win.ini",
    "maths\\..\\..\\secret.txt",
    "..\\..\\secret.txt",
    "maths/drill/../../../etc/passwd",
    ".",
    "..",
    "maths/./drill/c10_drill.marker".replace("./", "../"),  # maths/../drill/...
    "",
    "   ",
    "maths/.hidden-drill/x",
    ".env",
    ".hidden",
    "maths/.env",
    "maths/%2e%2e/secret",     # encoded dots are decoded upstream; raw check too
]

ABSOLUTE_PAYLOADS = [
    f"{os.sep}etc{os.sep}passwd",
    str(Path(tempfile.gettempdir()) / "some" / "file"),
]


def test_traversal_payloads_are_rejected(fake_root: Path):
    root = str(fake_root)
    for payload in TRAVERSAL_PAYLOADS + ABSOLUTE_PAYLOADS:
        assert supplements._safe_path(root, payload) is None, (
            f"traversal payload leaked through _safe_path: {payload!r}"
        )


def test_backslash_payloads_are_rejected_even_on_windows(fake_root: Path):
    """split('/') alone does not see backslash segments on Windows hosts."""
    root = str(fake_root)
    for payload in ("maths\\..\\secret.txt", "..\\secret.txt", "maths\\\\secret.txt"):
        assert supplements._safe_path(root, payload) is None, payload


def test_legitimate_indexed_file_resolves(fake_root: Path):
    got = supplements._safe_path(str(fake_root), "maths/drill/c10_drill.marker")
    assert got is not None and got.endswith("c10_drill.marker")


def test_dot_segments_rejected(fake_root: Path):
    assert supplements._safe_path(str(fake_root), "maths/./drill/c10_drill.marker") is None
    assert supplements._safe_path(str(fake_root), "./maths/drill/c10_drill.marker") is None


def test_symlink_escape_is_rejected(tmp_path: Path):
    """A symlink planted inside the root that points outside must not be
    servable (realpath containment)."""
    outside = tmp_path / "outside.marker"
    outside.write_text("X", encoding="utf-8")
    root = tmp_path / "root"
    (root / "maths").mkdir(parents=True)
    try:
        os.symlink(outside, root / "maths" / "escape.marker")
    except (OSError, NotImplementedError):
        pytest.skip("symlinks unavailable on this host")
    assert supplements._safe_path(str(root), "maths/escape.marker") is None


def test_whole_live_index_still_resolves():
    """Regression: every file in the SHIPPED supplements index must keep
    passing the confinement (the NIM run adds markers continuously)."""
    root = supplements._supp_root()
    if not root:
        pytest.skip("supplements root not present on this host")
    idx = supplements._load_index()
    files = [
        rec.get("file", "")
        for subjects in idx.values()
        for cats in subjects.values()
        for rec in cats
    ]
    assert files, "index unexpectedly empty"
    rejected = [
        f for f in files
        if supplements._safe_path(root, f) is None and os.path.isfile(os.path.join(root, f))
    ]
    assert rejected == [], f"allowlist regressed on indexed files: {rejected[:5]}"


def test_index_file_itself_is_still_servable():
    """_supplements_index.json is intentionally public (it powers /index)."""
    root = supplements._supp_root()
    if not root:
        pytest.skip("supplements root not present")
    assert supplements._safe_path(root, "_supplements_index.json") is not None
