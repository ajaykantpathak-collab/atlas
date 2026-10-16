"""test_runner_states.py — legality table, receipt-required transitions,
hash-chain tamper detection, REWORK cap -> FAILED, judge FAIL handling.
Fake gate/soak/restore engines are injected; no real boots."""
import json
import shutil
from pathlib import Path

import pytest

import common as C
import runner as R


@pytest.fixture()
def env(tmp_path, monkeypatch):
    """A scratch harness world under tmp_path with two product files."""
    (tmp_path / "receipts").mkdir()
    (tmp_path / "snapshots").mkdir()
    prod = tmp_path / "deploy" / "backend"
    prod.mkdir(parents=True)
    (prod / "alpha.py").write_text("X = 1\n", encoding="utf-8")
    (prod / "beta.py").write_text("Y = 2\n", encoding="utf-8")
    cfg = {"paths": {"receipts": str(tmp_path / "receipts"),
                     "snapshots": str(tmp_path / "snapshots"),
                     "corpus_cases": str(tmp_path / "cases.jsonl")}}
    monkeypatch.setattr(C, "cfg_path", lambda c, k: Path(c["paths"][k]))
    monkeypatch.setattr(C, "ROOT", tmp_path)
    return cfg, tmp_path


PLAN = """# WI — test

## Type

IMPROVEMENT

## Citation (improvement valve / refactor baseline)

corpus case COR-000001 (refusal_reason=solver_timeout, telemetry line 8123)

## Files in scope

- deploy/backend/alpha.py

## Gates expected (applicability matrix)

- G1 : apply
- G5 : apply
- G9 : not_applicable (chisel absent)

## Approach

1. tweak alpha
"""


def make_wi(env, plan=True):
    cfg, tmp = env
    wi = R.new_wi(cfg, "test item", ["deploy/backend/alpha.py"])
    if plan:
        p = tmp / "plan.md"
        p.write_text(PLAN, encoding="utf-8")
        R.cmd_plan(cfg, wi, p)
    return wi


def green_gates(cfg, wi, files, matrix):
    log = Path(cfg["paths"]["receipts"]) / wi / "logs" / "G1.log"
    log.parent.mkdir(parents=True, exist_ok=True)
    log.write_text("1 passed", encoding="utf-8")
    return [{"id": "G1", "ok": True, "exit": 0, "seconds": 0.1,
             "log": str(log), "log_sha256": C.sha256_file(log)}]


def red_gates(cfg, wi, files, matrix):
    log = Path(cfg["paths"]["receipts"]) / wi / "logs" / "G5.log"
    log.parent.mkdir(parents=True, exist_ok=True)
    log.write_text("control char found", encoding="utf-8")
    return [{"id": "G5", "ok": False, "exit": 2, "seconds": 0.1,
             "log": str(log), "log_sha256": C.sha256_file(log)}]


def fake_soak(green=True):
    def run(cfg, wi):
        return {"report_path": str(Path(cfg["paths"]["receipts"]) / wi / "soak_report.json"),
                "thresholds": {"error_rate": green, "p95": green, "rss": green,
                               "logs_clean": green},
                "all_green": green}
    return run


# --------------------------------------------------------------------------- #
# legality
# --------------------------------------------------------------------------- #
def test_illegal_skip_and_transition(env):
    cfg, tmp = env
    wi = make_wi(env, plan=False)  # state INTAKE
    # skipping PLAN is illegal from INTAKE
    with pytest.raises(R.LoopError) as e:
        R.cmd_advance(cfg, wi, "IMPLEMENT")
    assert e.value.code == C.EXIT_ILLEGAL
    p = tmp / "plan.md"
    p.write_text(PLAN, encoding="utf-8")
    R.cmd_plan(cfg, wi, p)
    R.cmd_advance(cfg, wi, "IMPLEMENT")
    with pytest.raises(R.LoopError) as e:
        R.cmd_advance(cfg, wi, "STAGED")
    assert e.value.code == C.EXIT_ILLEGAL


def test_review_requires_green_verify(env):
    cfg, tmp = env
    wi = make_wi(env)
    R.cmd_advance(cfg, wi, "IMPLEMENT")
    assert R.cmd_verify(cfg, wi, gate_runner=red_gates) == C.EXIT_GATE_RED
    verdict = tmp / "v.json"
    verdict.write_text(json.dumps(
        {"work_item": wi, "verdict": "PASS", "independent_reruns": [{"gate": "G5", "exit": 0}],
         "issues": [], "ts_utc": "2026-10-13T00:00:00Z"}), encoding="utf-8")
    with pytest.raises(R.LoopError) as e:
        R.cmd_review(cfg, wi, verdict)
    assert e.value.code == C.EXIT_GATE_RED


def test_full_green_cycle_to_staged_requires_snapshot_and_judge(env):
    cfg, tmp = env
    wi = make_wi(env)
    R.cmd_advance(cfg, wi, "IMPLEMENT")
    assert R.cmd_verify(cfg, wi, gate_runner=green_gates) == C.EXIT_OK
    verdict = tmp / "v.json"
    verdict.write_text(json.dumps(
        {"work_item": wi, "verdict": "PASS", "independent_reruns": [{"gate": "G5", "exit": 0}],
         "issues": [], "ts_utc": "2026-10-13T00:00:00Z"}), encoding="utf-8")
    assert R.cmd_review(cfg, wi, verdict) == C.EXIT_OK
    assert R.state_of(cfg, wi) == "REVIEW"
    # STAGED without snapshot -> exit 4
    with pytest.raises(R.LoopError) as e:
        R.cmd_advance(cfg, wi, "STAGED")
    assert e.value.code == C.EXIT_MISSING
    # make snapshot manifest covering scope
    snapdir = Path(cfg["paths"]["snapshots"]) / wi
    snapdir.mkdir(parents=True)
    (snapdir / "manifest.json").write_text(json.dumps(
        {"files": [{"path": "deploy/backend/alpha.py", "sha256": "x", "bytes": 1,
                    "blob": "files/0.py"}]}), encoding="utf-8")
    assert R.cmd_advance(cfg, wi, "STAGED") == C.EXIT_OK


def test_soak_then_ready_requires_green_report(env):
    cfg, tmp = env
    wi = make_wi(env)
    R.cmd_advance(cfg, wi, "IMPLEMENT")
    R.cmd_verify(cfg, wi, gate_runner=green_gates)
    verdict = tmp / "v.json"
    verdict.write_text(json.dumps(
        {"work_item": wi, "verdict": "PASS", "independent_reruns": [],
         "issues": [], "ts_utc": "2026-10-13T00:00:00Z"}), encoding="utf-8")
    # relax: verdict needs reruns; give it one
    verdict.write_text(json.dumps(
        {"work_item": wi, "verdict": "PASS",
         "independent_reruns": [{"gate": "G1", "exit": 0}],
         "issues": [], "ts_utc": "2026-10-13T00:00:00Z"}), encoding="utf-8")
    R.cmd_review(cfg, wi, verdict)
    snapdir = Path(cfg["paths"]["snapshots"]) / wi
    snapdir.mkdir(parents=True)
    (snapdir / "manifest.json").write_text(json.dumps(
        {"files": [{"path": "deploy/backend/alpha.py", "sha256": "x", "bytes": 1,
                    "blob": "files/0.py"}]}), encoding="utf-8")
    R.cmd_advance(cfg, wi, "STAGED")
    assert R.cmd_soak(cfg, wi, soak_runner=fake_soak(True)) == C.EXIT_OK
    assert R.state_of(cfg, wi) == "SOAK"
    assert R.cmd_advance(cfg, wi, "READY") == C.EXIT_OK
    assert R.state_of(cfg, wi) == "READY"


def test_soak_red_blocks_ready(env):
    cfg, tmp = env
    wi = make_wi(env)
    R.cmd_advance(cfg, wi, "IMPLEMENT")
    R.cmd_verify(cfg, wi, gate_runner=green_gates)
    verdict = tmp / "v.json"
    verdict.write_text(json.dumps(
        {"work_item": wi, "verdict": "PASS",
         "independent_reruns": [{"gate": "G1", "exit": 0}],
         "issues": [], "ts_utc": "2026-10-13T00:00:00Z"}), encoding="utf-8")
    R.cmd_review(cfg, wi, verdict)
    snapdir = Path(cfg["paths"]["snapshots"]) / wi
    snapdir.mkdir(parents=True)
    (snapdir / "manifest.json").write_text(json.dumps(
        {"files": [{"path": "deploy/backend/alpha.py", "sha256": "x", "bytes": 1,
                    "blob": "files/0.py"}]}), encoding="utf-8")
    R.cmd_advance(cfg, wi, "STAGED")
    # write the red report the runner expects to find for READY
    assert R.cmd_soak(cfg, wi, soak_runner=fake_soak(False)) == C.EXIT_GATE_RED
    rp = Path(cfg["paths"]["receipts"]) / wi / "soak_report.json"
    rp.write_text(json.dumps({"all_green": False,
                              "thresholds": {"p95": False}}), encoding="utf-8")
    with pytest.raises(R.LoopError) as e:
        R.cmd_advance(cfg, wi, "READY")
    assert e.value.code == C.EXIT_GATE_RED


# --------------------------------------------------------------------------- #
# receipts + tamper
# --------------------------------------------------------------------------- #
def test_no_receipt_no_transition_and_chain_verify(env):
    cfg, tmp = env
    wi = make_wi(env)
    docs = R.verify_chain(cfg, wi)
    assert len(docs) == 2  # genesis + plan
    assert all(d["prev_receipt_sha256"] for d in docs[1:])
    # flip one byte in the FIRST receipt -> the plan receipt's prev link
    # no longer matches -> tamper detected
    rcpts = R.receipts_of(cfg, wi)
    rcpts[0].write_text(rcpts[0].read_text(encoding="utf-8")
                        .replace('"notes"', '"notez"'), encoding="utf-8")
    with pytest.raises(R.LoopError) as e:
        R.verify_chain(cfg, wi)
    assert e.value.code == C.EXIT_TAMPER


def test_missing_gate_log_is_tamper(env):
    cfg, tmp = env
    wi = make_wi(env)
    R.cmd_advance(cfg, wi, "IMPLEMENT")
    R.cmd_verify(cfg, wi, gate_runner=green_gates)
    # delete the referenced log
    log = Path(cfg["paths"]["receipts"]) / wi / "logs" / "G1.log"
    log.unlink()
    with pytest.raises(R.LoopError) as e:
        R.verify_chain(cfg, wi)
    assert e.value.code == C.EXIT_TAMPER


# --------------------------------------------------------------------------- #
# rework cap + judge fail streak
# --------------------------------------------------------------------------- #
def test_rework_cap_moves_to_failed(env):
    cfg, tmp = env
    wi = make_wi(env)
    for i in range(3):
        assert R.cmd_advance(cfg, wi, "REWORK") == C.EXIT_OK
        R.cmd_advance(cfg, wi, "IMPLEMENT")
    with pytest.raises(R.LoopError) as e:
        R.cmd_advance(cfg, wi, "REWORK")
    assert e.value.code == C.EXIT_ILLEGAL
    assert R.rework_count(cfg, wi) == 3


def test_two_consecutive_judge_fails_to_failed(env):
    cfg, tmp = env
    wi = make_wi(env)
    R.cmd_advance(cfg, wi, "IMPLEMENT")
    R.cmd_verify(cfg, wi, gate_runner=green_gates)
    vfail = tmp / "vfail.json"
    vfail.write_text(json.dumps(
        {"work_item": wi, "verdict": "FAIL",
         "independent_reruns": [{"gate": "G1", "exit": 0}],
         "issues": [{"severity": "blocker", "desc": "x"}],
         "ts_utc": "2026-10-13T00:00:00Z"}), encoding="utf-8")
    assert R.cmd_review(cfg, wi, vfail) == C.EXIT_JUDGE_FAIL
    assert R.state_of(cfg, wi) == "REWORK"
    R.cmd_advance(cfg, wi, "IMPLEMENT")
    R.cmd_verify(cfg, wi, gate_runner=green_gates)
    assert R.cmd_review(cfg, wi, vfail) == C.EXIT_JUDGE_FAIL
    assert R.state_of(cfg, wi) == "FAILED"
    assert R.state_of(cfg, wi) in R.TERMINAL


def test_plan_valve_rejects_weak_citation(env):
    cfg, tmp = env
    wi = R.new_wi(cfg, "bad plan", [])
    p = tmp / "plan2.md"
    p.write_text(PLAN.replace(
        "corpus case COR-000001 (refusal_reason=solver_timeout, telemetry line 8123)",
        "n/a"), encoding="utf-8")
    with pytest.raises(R.LoopError) as e:
        R.cmd_plan(cfg, wi, p)
    assert e.value.code == C.EXIT_MISSING


def test_rollback_legality(env):
    cfg, tmp = env
    wi = make_wi(env)
    # rollback from PLAN is illegal (§5: STAGED/SOAK/READY only)
    def fake_restore(cfg, wi):
        return [{"path": "deploy/backend/alpha.py", "ok": True}]
    with pytest.raises(R.LoopError) as e:
        R.cmd_rollback(cfg, wi, restore=fake_restore)
    assert e.value.code == C.EXIT_ILLEGAL
