"""test_gates.py — applicability matrix, SKIPPED-blocking, timeout kill,
evidence-log presence + sha256. Fake executor; no real boots."""
import json
import time
from pathlib import Path

import pytest

import common as C
import gates as G


CFG = {
    "paths": {"receipts": "harness/receipts", "snapshots": "harness/snapshots",
              "parity_baseline": "harness/ops/parity_baseline.json"},
    "gates": {"timeout_s": 600, "verify_wall_cap_s": 1200,
              "chisel_present": False},
    "scans": {"content_sample_files": 0, "student_facing_globs": ["its/solver/"]},
    "soak": {"boot_wait_s": 1},
    "endpoints": {"dev_health": "http://127.0.0.1:8020/api/health"},
}


def fake_executor(exit_code=0):
    def ex(cmd, cwd, env, timeout, log_path):
        log_path.parent.mkdir(parents=True, exist_ok=True)
        log_path.write_text(f"fake run exit={exit_code}\n", encoding="utf-8")
        return exit_code
    return ex


@pytest.fixture()
def world(tmp_path, monkeypatch):
    receipts = tmp_path / "receipts"
    receipts.mkdir()
    monkeypatch.setattr(C, "cfg_path", lambda c, k: tmp_path / c["paths"][k]
                        if not c["paths"][k].startswith("harness")
                        else tmp_path / c["paths"][k].split("/", 1)[1])
    # G5 scans run against C.ROOT-deploy; give it a clean minimal world
    backend = tmp_path / "deploy" / "backend"
    (backend / "its" / "solver").mkdir(parents=True)
    (backend / "tests").mkdir(parents=True)
    (backend / "tests" / "test_wsa_no_silent_pass.py").write_text(
        "PIN_TOTALS = {'TOTAL': 5}\n", encoding="utf-8")
    monkeypatch.setattr(C, "ROOT", tmp_path)
    monkeypatch.setattr(G, "ROOT", tmp_path)
    monkeypatch.setattr(G, "DEPLOY_BACKEND", backend)
    return tmp_path, receipts, backend


def test_applicability_matrix():
    a = G.applicability(["deploy/backend/its/solver/x.py"], CFG)
    assert a["G2"]["applies"] == "apply"
    assert a["G4"]["applies"] == "apply"
    assert a["G6"]["applies"] == "apply"
    assert a["G8"]["applies"] == "not_applicable"
    assert a["G9"]["applies"] == "not_applicable"  # chisel absent
    b = G.applicability(["deploy/frontend/app/page.tsx"], CFG)
    assert b["G8"]["applies"] == "apply"
    assert b["G2"]["applies"] == "not_applicable"
    c = G.applicability(["harness/README.md"], CFG)
    assert c["G1"]["applies"] == "not_applicable"
    assert c["G5"]["applies"] == "apply"


def test_g1_skipped_blocks_when_no_tests_map(world):
    tmp, receipts, backend = world
    wi = "WI-20261013-001"
    res = G.gate_G1(CFG, wi, ["deploy/backend/tools/zzz_novel.py"],
                    receipts / wi, fake_executor(), 600)
    assert res["ok"] is False and res["skipped"] is True
    assert "blocks promotion" in res["reason"]


def test_g1_uses_mapped_test(world):
    tmp, receipts, backend = world
    (backend / "alpha.py").write_text("x=1\n", encoding="utf-8")
    (backend / "tests" / "test_alpha.py").write_text("def t(): pass\n",
                                                     encoding="utf-8")
    wi = "WI-20261013-002"
    res = G.gate_G1(CFG, wi, ["deploy/backend/alpha.py"], receipts / wi,
                    fake_executor(0), 600)
    assert res["ok"] is True and res["tests"] == ["tests/test_alpha.py"]
    assert res["log"].endswith(".log")


def test_real_executor_timeout_kills(tmp_path):
    log = tmp_path / "t.log"
    code = G.real_executor([sys_exe(), "-c", "import time; time.sleep(30)"],
                           tmp_path, {"PATH": ""} | {"SYSTEMROOT": "C:\\Windows"},
                           2, log)
    assert code == 124
    assert "TIMED OUT" in log.read_text(encoding="utf-8")


def sys_exe():
    import sys
    return sys.executable


def test_evidence_log_sha256_present(world):
    tmp, receipts, backend = world
    wi = "WI-20261013-003"
    res = G.gate_G2(CFG, wi, ["deploy/backend/x.py"], receipts / wi,
                    fake_executor(0), 600)
    logp = tmp / res["log"]
    assert logp.exists()
    assert res["log_sha256"] == C.sha256_file(logp)


def test_g5_red_on_seeded_defect(world):
    import scans
    tmp, receipts, backend = world
    (backend / "its" / "solver" / "fam.py").write_bytes(b"a = 1\x08\n")
    res = G.gate_G5(CFG, "WI-20261013-004",
                    ["deploy/backend/its/solver/fam.py"], receipts / "WI-20261013-004")
    assert res["ok"] is False and res["hard_findings"] >= 1


def test_wall_cap_blocks_remaining_gates(world):
    tmp, receipts, backend = world
    cfg = dict(CFG)
    cfg["gates"] = {**CFG["gates"], "verify_wall_cap_s": -1}
    res = G.run_applicable_gates(cfg, "WI-20261013-005",
                                 ["deploy/backend/its/solver/x.py"], {},
                                 executor=fake_executor(0))
    assert res and all(r["ok"] is False and r["skipped"] for r in res)
    assert any("wall cap" in r["reason"] for r in res)


def test_matrix_na_and_derived_na(world):
    tmp, receipts, backend = world
    (backend / "alpha.py").write_text("x=1\n", encoding="utf-8")
    matrix = {f"G{i}": {"applies": "not_applicable"} for i in range(1, 11)}
    res = G.run_applicable_gates(CFG, "WI-20261013-006",
                                 ["deploy/backend/alpha.py"], matrix,
                                 executor=fake_executor(0))
    by_id = {r["id"]: r for r in res}
    # G9 matrix N/A + chisel absent -> skipped ok
    assert by_id["G9"]["ok"] is True and by_id["G9"]["skipped"] is True
    # G8 declared apply in... it's not_applicable in matrix and files -> skipped
    assert by_id["G8"]["skipped"] is True
    # G2 matrix said N/A but backend py changed -> derived says apply ->
    # planned False and actual True -> gate RUNS (fail-closed more gates)
    assert by_id["G2"]["ok"] is True  # fake executor exit 0


def test_g10_links_recent_report(world):
    tmp, receipts, backend = world
    wi = "WI-20261013-007"
    widir = receipts / wi
    widir.mkdir(parents=True)
    import datetime
    (widir / "soak_report.json").write_text(json.dumps(
        {"ts_utc": C.iso_utc(), "all_green": True}), encoding="utf-8")
    res = G.gate_G10(CFG, wi, [], widir)
    assert res["ok"] is True and res["linked"] is True


def test_g10_red_report_defers_to_soak_state(world):
    tmp, receipts, backend = world
    wi = "WI-20261013-008"
    widir = receipts / wi
    widir.mkdir(parents=True)
    (widir / "soak_report.json").write_text(json.dumps(
        {"ts_utc": C.iso_utc(), "all_green": False}), encoding="utf-8")
    res = G.gate_G10(CFG, wi, [], widir)
    # VERIFY never pre-empts SOAK's own blocking moment (SOAK -> READY
    # re-checks all_green); a red/stale report defers, it does not block
    assert res["ok"] is True and res["linked"] is False
    assert "executes again at SOAK state" in res["note"]
