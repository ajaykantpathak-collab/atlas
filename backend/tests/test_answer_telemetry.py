"""test_answer_telemetry.py — solve rows carry a stable, privacy-preserving
question_hash (sha256 of whitespace-normalized lowercase text, 16 hex) and
never the raw question text. Mirrors the CL-06 capture pattern."""
from backend.services import answer_telemetry as tel


class _Result:
    label = "GUIDED_PRACTICE"
    refusal_reason = "needs method"


def _capture(monkeypatch):
    captured = {}
    monkeypatch.setattr(tel, "_emit", lambda row: captured.update(row))
    return captured


def test_solve_row_carries_question_hash(monkeypatch):
    captured = _capture(monkeypatch)
    tel.record_solve("Find x when 2x + 3 = 11", _Result(), 120.0)
    h = captured.get("question_hash")
    assert isinstance(h, str) and len(h) == 16
    int(h, 16)  # hex


def test_question_hash_stable_under_case_and_whitespace(monkeypatch):
    captured = _capture(monkeypatch)
    tel.record_solve("find x when 2x + 3 = 11", _Result(), 1.0)
    h1 = captured["question_hash"]
    captured.clear()
    tel.record_solve("Find   x  when 2x + 3 = 11", _Result(), 1.0)
    h2 = captured["question_hash"]
    assert h1 == h2 and h1 is not None


def test_question_hash_differs_across_questions(monkeypatch):
    captured = _capture(monkeypatch)
    tel.record_solve("What is the speed of light?", _Result(), 1.0)
    h1 = captured["question_hash"]
    captured.clear()
    tel.record_solve("Solve for y: 3y - 4 = 11", _Result(), 1.0)
    assert h1 != captured["question_hash"]


def test_question_hash_none_for_empty_text(monkeypatch):
    captured = _capture(monkeypatch)
    tel.record_solve("", _Result(), 1.0)
    assert captured["question_hash"] is None


def test_raw_text_never_in_row(monkeypatch):
    captured = _capture(monkeypatch)
    q = "A notebook costs x rupees, you buy 3 and pay 20 fee, total 170"
    tel.record_solve(q, _Result(), 1.0)
    assert q not in str(captured)
    assert captured["text_len"] == len(q)
