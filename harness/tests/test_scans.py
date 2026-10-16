"""test_scans.py — each scanner catches its seeded defect and passes clean
files; display_id_leak excludes payload/URL keys (§6.3)."""
import json
from pathlib import Path

import pytest

import common as C
import scans


@pytest.fixture()
def world(tmp_path, monkeypatch):
    monkeypatch.setattr(C, "ROOT", tmp_path)
    backend = tmp_path / "deploy" / "backend"
    (backend / "its" / "solver").mkdir(parents=True)
    (backend / "tests").mkdir(parents=True)
    (backend / "tests" / "test_wsa_no_silent_pass.py").write_text(
        "PIN_TOTALS = {'TOTAL': 10}\n", encoding="utf-8")
    return tmp_path, backend


def test_control_chars_catches_seeded_backspace(world):
    tmp, backend = world
    (backend / "served.py").write_bytes(b"ok = 1\nbad = 2\x08\n")
    hard, warn, n = scans.control_chars(backend, tmp / "no_content", 0)
    assert any("\\x08" in f.detail for f in hard)


def test_control_chars_clean_file_passes(world):
    tmp, backend = world
    (backend / "clean.py").write_text("x = 1\n", encoding="utf-8")
    hard, warn, n = scans.control_chars(backend, tmp / "no_content", 0)
    assert hard == []


def test_control_chars_excluded_dirs_not_scanned(world):
    tmp, backend = world
    trashed = backend / "_trash" / "old.py"
    trashed.parent.mkdir(parents=True)
    trashed.write_bytes(b"x = 1\x00\n")
    hard, warn, n = scans.control_chars(backend, tmp / "no_content", 0)
    # _trash/backups/caches are excluded from the target list entirely
    # (non-served graveyards); the G5 summary names the exclusion
    assert hard == [] and warn == []


def test_control_chars_allowlist(world, tmp_path):
    tmp, backend = world
    cfgfile = tmp / "cfg.json"
    cfgfile.write_text(json.dumps({
        "scans": {"control_byte_allowlist": [
            {"path": "deploy/backend/tool.py",
             "bytes": ["08"], "reason": "intentional delimiter"}]}}), encoding="utf-8")
    orig_load = C.load_config
    C.load_config = lambda path=None: json.loads(cfgfile.read_text(encoding="utf-8"))
    try:
        (backend / "tool.py").write_bytes(b"rx = 1\x08 + delim\n")
        hard, warn, n = scans.control_chars(backend, tmp / "no_content", 0)
        assert hard == []
        assert any("intentional delimiter" in f.detail for f in warn)
    finally:
        C.load_config = orig_load


def test_nan_literals_catches_all_three_forms(world):
    tmp, backend = world
    f = backend / "its" / "solver" / "fam.py"
    f.write_text("a = float('nan')\nb = nan\nc = 1e999\n", encoding="utf-8")
    findings = scans.nan_literals([str(f).replace("\\", "/")], ("its/solver/",))
    assert len(findings) == 3
    assert all(f.scanner == "nan_literals" for f in findings)


def test_nan_literals_ignores_non_student_files(world):
    tmp, backend = world
    f = backend / "tools" / "offline.py"
    f.parent.mkdir(parents=True)
    f.write_text("a = float('nan')\n", encoding="utf-8")
    assert scans.nan_literals([str(f).replace("\\", "/")],
                              ("its/solver/", "routers/")) == []


def test_parse_check_catches_syntax_error(world):
    tmp, backend = world
    f = backend / "broken.py"
    f.write_text("def f(:\n", encoding="utf-8")
    out = scans.parse_check([str(f)])
    assert out and out[0].scanner == "parse_check"


def test_display_id_leak_flags_display_not_payload(world):
    tmp, backend = world
    f = backend / "its" / "solver" / "page.py"
    f.write_text(
        'TITLE = "Overview for c10_bio_cbse_01_001"\n'          # display -> FLAG
        'node = {"id": "c10_bio_cbse_01_001"}\n'                 # payload key -> ok
        'url = "/learn/" + "c10_bio_cbse_01_001"\n'              # URL concat -> ok
        'if node_id == "c10_bio_cbse_01_001": pass\n'            # compare -> ok
        'msg = f"Study c10_bio_cbse_01_001 now"\n',              # f-string -> FLAG
        encoding="utf-8")
    out = scans.display_id_leak([str(f).replace("\\", "/")])
    assert len(out) == 2
    assert any("line 1" in x.detail for x in out)
    assert any("line 5" in x.detail for x in out)


def test_display_id_leak_ignores_non_solver_files(world):
    tmp, backend = world
    f = backend / "models" / "m.py"
    f.parent.mkdir(parents=True)
    f.write_text('T = "node c10_bio_cbse_01_001"\n', encoding="utf-8")
    assert scans.display_id_leak([str(f).replace("\\", "/")]) == []


def test_silent_pass_warns_on_increase(world):
    tmp, backend = world
    wsa = backend / "tests" / "test_wsa_no_silent_pass.py"
    last = tmp / "pin_last.json"
    last.write_text(json.dumps({"TOTAL": 10}), encoding="utf-8")
    findings, counts = scans.silent_pass(wsa, last)
    assert counts == {"TOTAL": 10}
    assert findings == []  # no change
    wsa.write_text("PIN_TOTALS = {'TOTAL': 12}\n", encoding="utf-8")
    findings, counts = scans.silent_pass(wsa, last)
    assert any("WARN" in f.detail and "12" in f.detail for f in findings)
    assert counts == {"TOTAL": 12}


def test_oversize_warn(world):
    tmp, backend = world
    big = backend / "its" / "solver" / "big.py"
    big.write_text("\n" * (scans.OVERSIZE_LINES + 5), encoding="utf-8")
    out = scans.oversize_warn(backend / "its" / "solver")
    assert out and "WARN" in out[0].detail
