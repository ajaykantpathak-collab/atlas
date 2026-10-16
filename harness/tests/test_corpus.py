"""test_corpus.py — append-only enforcement, dedupe, parked transitions,
pinned-check scaffold."""
import json
from pathlib import Path

import pytest

import common as C
import corpus as K


@pytest.fixture()
def env(tmp_path, monkeypatch):
    cases = tmp_path / "corpus" / "cases.jsonl"
    cases.parent.mkdir(parents=True)
    pinned = tmp_path / "tests" / "corpus"
    cfg = {"paths": {"corpus_cases": str(cases),
                     "corpus_pinned_dir": str(pinned)}}
    monkeypatch.setattr(C, "cfg_path", lambda c, k: Path(c["paths"][k]))
    return cfg, cases, pinned


def test_add_case_appends_and_writes_pinned(env):
    cfg, cases, pinned = env
    res = K.add_case(cfg, source="telemetry",
                     origin={"file": "tel.jsonl", "line_no": 8123},
                     question_text="Find the value of 2x + 3 when x = 4",
                     expected={"tier": "VERIFIED"},
                     added_because="refusal_reason=solver_timeout")
    assert res["deduped"] is False
    rows = [json.loads(ln) for ln in cases.read_text(encoding="utf-8").splitlines()]
    assert len(rows) == 1 and rows[0]["id"] == "COR-000001"
    assert rows[0]["status"] == "red"
    scaffold = pinned / "test_COR-000001.py"
    assert scaffold.exists()
    assert "model_problem" in scaffold.read_text(encoding="utf-8")


def test_dedupe_same_question_hash(env):
    cfg, cases, _ = env
    K.add_case(cfg, source="manual", origin={}, question_text="What is 7 x 8?",
               expected={}, added_because="test")
    res2 = K.add_case(cfg, source="manual", origin={},
                      question_text="what  is  7 x  8?",  # same normalized
                      expected={}, added_because="dup")
    assert res2["deduped"] is True
    lines = cases.read_text(encoding="utf-8").splitlines()
    assert len(lines) == 1


def test_status_transition_parks_without_delete(env):
    cfg, cases, _ = env
    K.add_case(cfg, source="manual", origin={},
               question_text="Derive the lens formula",
               expected={}, added_because="test")
    hit = K.set_status(cfg, "COR-000001", "parked",
                       "requires verifier family not yet authored")
    assert hit["status"] == "parked"
    rows = [json.loads(ln) for ln in cases.read_text(encoding="utf-8").splitlines()]
    assert len(rows) == 1  # never deleted
    assert rows[0]["status"] == "parked"
    hist = [json.loads(ln) for ln in
            (cases.parent / "history.jsonl").read_text(encoding="utf-8").splitlines()]
    assert hist[-1]["action"] == "status" and hist[-1]["status"] == "parked"
    assert K.summary(cfg) == {"red": 0, "green": 0, "parked": 1, "total": 1}


def test_next_case_id_increments(env):
    cfg, _, _ = env
    assert K.next_case_id(cfg) == "COR-000001"
    K.add_case(cfg, source="manual", origin={}, question_text="q one",
               expected={}, added_because="t")
    K.add_case(cfg, source="manual", origin={}, question_text="q two",
               expected={}, added_because="t")
    assert K.next_case_id(cfg) == "COR-000003"
