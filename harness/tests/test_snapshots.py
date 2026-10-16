"""test_snapshots.py — manifest round-trip byte-identity, restore refusal
without manifest, sha256 verification table."""
import json
from pathlib import Path

import pytest

import common as C
import snapshots as S


@pytest.fixture()
def env(tmp_path, monkeypatch):
    prod = tmp_path / "deploy" / "backend" / "its" / "solver"
    prod.mkdir(parents=True)
    (prod / "alpha.py").write_bytes(b"X = 1\n")
    (prod / "beta.py").write_bytes(b"Y = 2\n")
    cfg = {"paths": {"snapshots": str(tmp_path / "snapshots"),
                     "receipts": str(tmp_path / "receipts")}}
    monkeypatch.setattr(C, "cfg_path", lambda c, k: Path(c["paths"][k]))
    monkeypatch.setattr(C, "ROOT", tmp_path)
    return cfg, tmp_path, prod


def test_snapshot_then_modify_then_restore_byte_identical(env):
    cfg, tmp, prod = env
    mpath = S.snapshot(cfg, "WI-20261013-001",
                       ["deploy/backend/its/solver/alpha.py",
                        "deploy/backend/its/solver/beta.py"])
    man = json.loads(mpath.read_text(encoding="utf-8"))
    assert len(man["files"]) == 2
    # mutate both files badly
    (prod / "alpha.py").write_text("X = 'BROKEN'\n", encoding="utf-8")
    (prod / "beta.py").write_bytes(b"Y = 2\x08\n")
    table = S.restore_files(cfg, "WI-20261013-001")
    assert all(r["ok"] for r in table)
    assert (prod / "alpha.py").read_bytes() == b"X = 1\n"
    assert (prod / "beta.py").read_bytes() == b"Y = 2\n"
    # byte-identity proven by sha equality
    for r in table:
        assert r["restored_sha256"] == r["sha256"]


def test_restore_refuses_without_manifest(env):
    cfg, tmp, prod = env
    with pytest.raises(FileNotFoundError, match="no snapshot manifest"):
        S.restore_files(cfg, "WI-99999999-001")


def test_restore_detects_mismatch(env, capsys):
    cfg, tmp, prod = env
    S.snapshot(cfg, "WI-20261013-002",
               ["deploy/backend/its/solver/alpha.py"])
    # tamper the stored blob so restore writes wrong bytes
    sdir = S.snapshot_dir(cfg, "WI-20261013-002")
    blob = sdir / "files" / "000_alpha.py"
    blob.write_text("TAMPERED\n", encoding="utf-8")
    table = S.restore_files(cfg, "WI-20261013-002")
    assert table[0]["ok"] is False
    S.print_restore_table(table)
    out = capsys.readouterr().out
    assert "MISMATCH" in out


def test_missing_scope_file_recorded_as_new(env):
    cfg, tmp, prod = env
    mpath = S.snapshot(cfg, "WI-20261013-003",
                       ["deploy/backend/its/solver/never_existed.py"])
    man = json.loads(mpath.read_text(encoding="utf-8"))
    assert man["files"][0]["new"] is True and man["files"][0]["blob"] is None


def test_new_file_rolls_back_by_deletion(env):
    cfg, tmp, prod = env
    new_rel = "deploy/backend/tests/test_brand_new.py"
    S.snapshot(cfg, "WI-20261013-004",
               ["deploy/backend/its/solver/alpha.py", new_rel])
    # create the "new" file during IMPLEMENT
    (tmp / new_rel).parent.mkdir(parents=True, exist_ok=True)
    (tmp / new_rel).write_text("def test_new(): pass\n", encoding="utf-8")
    table = S.restore_files(cfg, "WI-20261013-004")
    by_path = {r["path"]: r for r in table}
    assert by_path[new_rel]["ok"] is True
    assert not (tmp / new_rel).exists()          # deleted on rollback
    assert (prod / "alpha.py").exists()          # old file restored
    assert by_path["deploy/backend/its/solver/alpha.py"]["ok"] is True
