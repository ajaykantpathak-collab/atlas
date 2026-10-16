"""test_mine.py — telemetry mining: signature grouping, ranking, candidates
file, origin line numbers. Fixture telemetry only."""
import json
from datetime import timedelta
from pathlib import Path

import common as C
import mine


def write_tel(path: Path, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        for r in rows:
            fh.write(json.dumps(r) + "\n")


def row(days_ago, refusal, subject="physics", stage="s:stage", text_len=100):
    ts = (C.now_utc() - timedelta(days=days_ago)).strftime(
        "%Y-%m-%dT%H:%M:%S.000Z")
    return {"ts": ts, "refusal_reason": refusal, "subject": subject,
            "stage": stage, "text_len": text_len, "label": "GUIDED_PRACTICE"}


def test_mine_groups_ranks_and_records_origin(tmp_path, monkeypatch):
    tel = tmp_path / "tel.jsonl"
    write_tel(tel, [
        row(0.1, "needs method"), row(0.2, "needs method"),
        row(0.3, "needs method", subject="mathematics"),
        row(0.4, "no structure matched"),
        row(9, "too old — excluded"),
        row(0.5, None),  # not a refusal — excluded
    ])
    cases = tmp_path / "corpus" / "cases.jsonl"
    cfg = {"paths": {"telemetry": str(tel), "corpus_cases": str(cases)}}
    monkeypatch.setattr(C, "cfg_path", lambda c, k: Path(c["paths"][k]))
    monkeypatch.setattr(C, "ROOT", tmp_path)
    out = mine.mine(cfg, "7d")
    sigs = {r["signature"]: r for r in out}
    assert out[0]["count"] == 2  # top by frequency
    assert len(out) == 3  # 3 signatures within 7d
    top = out[0]
    assert top["origin"]["line_no"] in (1, 2, 3)
    assert top["question_text"] is None  # schema has no text — recovery needed
    dest = tmp_path / "corpus" / "corpus_candidates.jsonl"
    assert dest.exists()
