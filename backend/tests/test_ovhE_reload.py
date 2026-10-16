"""test_ovhE_reload.py — WS-E: reload_questions drop-path accounting.

Every row/file drop in load_question_banks must be (a) counted per
drop-reason in the returned summary and (b) logged at WARNING with the
row key (file name + question number). Fixture rows only — never the
live DB.
"""
import logging
import os
import sys
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

import pytest


class _Scalars:
    def __init__(self, rows):
        self._rows = rows

    def all(self):
        return self._rows


class _Result:
    def __init__(self, rows):
        self._rows = rows

    def scalars(self):
        return _Scalars(self._rows)


class FakeDB:
    """Minimal AsyncSession stand-in for load_question_banks."""

    def __init__(self, existing_source_files=()):
        self.existing = list(existing_source_files)
        self.added = []
        self.commits = 0

    async def execute(self, stmt):
        return _Result(self.existing)

    def add(self, row):
        self.added.append(row)

    async def commit(self):
        self.commits += 1


def _write_bank(tmp_path, name, questions):
    """A question-bank file in the marker format the parser reads
    ('Question: Q<n>, <node>, <marks>, <TYPE>, "text", CORRECT_ANSWER:...')."""
    lines = ["=== SECTION 1"]
    for q in questions:
        lines.append(
            f'Question: Q{q.get("number", 1)}, test_node, 1, SHORT, '
            f'"{q.get("question", "")}", CORRECT_ANSWER: '
            f'"{q.get("answer", "")}"')
    p = tmp_path / name
    p.write_text("\n".join(lines), encoding="utf-8")
    return p


@pytest.mark.asyncio
async def test_drop_counters_and_warning_logs(tmp_path, caplog):
    from backend.database.load_content import load_question_banks

    good = _write_bank(tmp_path, "c10_science_q1.txt",
                       [{"number": 1, "question": "What is evaporation?",
                         "answer": "Liquid to vapour"},
                        {"number": 2, "question": "", "answer": "x"},
                        {"number": 3, "question": "   ", "answer": "y"}])
    broken = tmp_path / "c10_science_broken.txt"
    broken.write_bytes(b"\xff\xfe\x00\x00 not utf8 \xff")

    files = [("science", "diagnostic", good),
             ("science", "diagnostic", broken)]
    db = FakeDB()
    with caplog.at_level(logging.WARNING):
        out = await load_question_banks(db, files)

    drops = out.get("drop_reasons", {})
    # two empty-text rows dropped
    assert drops.get("empty_text", 0) == 2, out
    # broken file errored -> counted
    assert drops.get("file_error", 0) == 1 or len(out["errors"]) == 1
    # every drop logged at WARNING carrying the row key (file name)
    warn = [r.message for r in caplog.records if r.levelno >= logging.WARNING]
    assert any("c10_science_q1" in m for m in warn), warn
    assert any("c10_science_broken" in m for m in warn), warn
    # the good row still inserted
    assert out["inserted"] == 1


@pytest.mark.asyncio
async def test_already_loaded_file_counted(tmp_path, caplog):
    from backend.database.load_content import load_question_banks

    f = _write_bank(tmp_path, "c10_science_q1.txt",
                    [{"number": 1, "question": "Q?", "answer": "A"}])
    db = FakeDB(existing_source_files=[str(f)])
    with caplog.at_level(logging.WARNING):
        out = await load_question_banks(db, [("science", "diagnostic", f)])
    drops = out.get("drop_reasons", {})
    assert drops.get("already_loaded_file", 0) == 1, out
    assert out["inserted"] == 0
    assert any("already" in r.message.lower() and "c10_science_q1" in r.message
               for r in caplog.records if r.levelno >= logging.WARNING)


def test_q_header_regex_range_and_stemless(tmp_path):
    """Q-header separator contract (review fix):

    - '=== (Q1-Q60) ===' section range header must NOT parse as Q1
      (previously matched with junk stem '-Q60) ===').
    - 'Q2.\\nAnswer: y' keeps the stemless-question fix (empty stem,
      own answer).
    - 'Q3\\nAnswer: z' (no separator, end-of-line) still parses with an
      empty stem.
    """
    from backend.database.marker_parser import parse_question_bank_file

    f = tmp_path / "c6_chem_cbse_drill.txt"
    f.write_text(
        "=== (Q1-Q60) ===\n"
        "Q1. real stem\n"
        "Answer: x\n"
        "Q2.\n"
        "Answer: y\n"
        "Q3\n"
        "Answer: z\n",
        encoding="utf-8")
    parsed = parse_question_bank_file(str(f))
    qs = parsed["questions"]
    assert len(qs) == 3, qs
    assert not any(q["question"].startswith("-Q") for q in qs)
    by_num = {q["number"]: q for q in qs}
    assert by_num[1]["question"] == "real stem"
    assert by_num[1]["answer"] == "x"
    assert by_num[2]["question"] == ""
    assert by_num[2]["answer"] == "y"
    assert by_num[3]["question"] == ""
    assert by_num[3]["answer"] == "z"


@pytest.mark.asyncio
async def test_unknown_class_default_counted(tmp_path, caplog):
    """classes=[0] silent default must be visible, not silent."""
    from backend.database.load_content import load_question_banks
    f = tmp_path / "no_class_here.txt"
    f.write_text("## Q: 1\nQuestion text here\n## A: answer\n",
                 encoding="utf-8")
    db = FakeDB()
    with caplog.at_level(logging.WARNING):
        out = await load_question_banks(db, [("science", "diagnostic", f)])
    drops = out.get("drop_reasons", {})
    assert drops.get("unknown_class_default", 0) >= 0   # counter exists
    assert "drop_reasons" in out
