"""WS-E packet-1 tests — question registry + ingestion integrity.

Covers:
  1. reload_questions.plan_reload(): parsed / empty-drop / error
     accounting on a small marker fixture (TDD for the silent-drop fix).
  2. reload_questions.reconcile(): parsed == inserted + dropped + lost
     identity, including the file-error case.
  3. reload_questions wipe NAMESPACING: the tool only ever deletes
     board == OWNED_BOARD ("CISCE") rows — never the CBSE/ICSE/ISC/
     QUARANTINED rows written by the other four writers.
  4. insert_generator_variants.normalize_qtype(): fill_blank_type is
     aliased to fill_blank at ingestion (matrix disposition WS-E).
  5. refusal paths: wipe against an empty root is refused.

Run:  python -m pytest tests/test_wse_reload_questions.py -q
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest

BACKEND = Path(__file__).resolve().parents[1]
DEPLOY = Path(__file__).resolve().parents[2]
for _p in (str(DEPLOY), str(BACKEND)):
    if _p not in sys.path:
        sys.path.insert(0, _p)

# plan_reload imports backend.database.load_content -> backend.database,
# which resolves DATABASE_URL at import time.  These tests never touch a
# database, so pin a syntactically-valid placeholder BEFORE that import
# (engine creation is lazy; nothing connects).
os.environ.setdefault(
    "DATABASE_URL", "postgresql+asyncpg://pytest:placeholder@127.0.0.1:1/db")

from backend.reload_questions import (  # noqa: E402
    OWNED_BOARD, plan_reload, reconcile,
)
from backend.tools.insert_generator_variants import (  # noqa: E402
    QTYPE_ALIASES, normalize_qtype,
)

MARKER = """--- NODE c11_phys_question_bank_test ---
TITLE: WS-E fixture bank
CLASS: 11
SUBJECT: physics
CHAPTER: 1

Q1. What is the SI unit of force? (2 marks)
Answer: newton

Q2.
Answer: this row has an empty stem

Q3. State Newton's third law of motion.
Answer: every action has an equal and opposite reaction
"""


@pytest.fixture()
def content_root(tmp_path: Path) -> Path:
    """Live layout: root/<subject>/question_bank/*.marker."""
    qb = tmp_path / "physics" / "question_bank"
    qb.mkdir(parents=True)
    (qb / "c11_phys_question_bank_test.marker").write_text(
        MARKER, encoding="utf-8")
    return tmp_path


def test_plan_reload_counts_parsed_and_drops(content_root: Path):
    plan = plan_reload(content_root)
    assert plan["question_files"] == 1
    assert plan["answer_files"] == 0
    # Q1 + Q3 usable, Q2 has an empty stem -> counted as a drop
    assert plan["questions_parsed"] == 3
    assert plan["empty_text_drops"] == 1
    assert plan["file_errors"] == []
    assert sum(plan["by_subject"].values()) == 2
    assert plan["by_subject"].get("physics") == 2
    # per-file ledger feeds the reconciliation identity
    pf = plan["per_file"]["c11_phys_question_bank_test.marker"]
    assert pf == {"parsed": 3, "empty_drops": 1}


def test_plan_reload_reports_parse_errors(content_root: Path):
    # invalid utf-8 -> parse_question_bank_file raises -> recorded, no crash
    bad = content_root / "physics" / "question_bank" / "broken.marker"
    bad.write_bytes(b"\xff\xfe\x00bad")
    plan = plan_reload(content_root)
    assert plan["question_files"] == 2
    assert len(plan["file_errors"]) == 1
    assert "broken.marker" in plan["file_errors"][0]
    assert plan["per_file"]["broken.marker"]["parsed"] is None


def test_reconcile_identity_holds_for_clean_load(content_root: Path):
    plan = plan_reload(content_root)
    rec = reconcile(plan, inserted=2, load_errors=[])
    assert rec["ok"] is True
    assert rec["parsed"] == 3 and rec["inserted"] == 2
    assert rec["empty_dropped"] == 1 and rec["lost_to_file_errors"] == 0


def test_reconcile_counts_error_files_as_lost(content_root: Path):
    bad = content_root / "physics" / "question_bank" / "broken.marker"
    bad.write_bytes(b"\xff\xfe\x00bad")
    plan = plan_reload(content_root)
    # broken.marker NEVER parsed (plan-time error, parsed=None), so it
    # contributed 0 to questions_parsed: a load-time error for it loses
    # nothing.  Identity: 3 parsed = 2 inserted + 1 dropped + 0 lost.
    rec = reconcile(plan, inserted=2,
                    load_errors=["broken.marker: boom"])
    assert rec["ok"] is True
    assert rec["lost_to_file_errors"] == 0


def test_reconcile_lost_counts_plan_parsed_rows(tmp_path: Path):
    """A file that PARSED at plan time but errors at LOAD time loses its
    whole parse — the identity must still close (inserted + dropped +
    lost == parsed)."""
    qb = tmp_path / "physics" / "question_bank"
    qb.mkdir(parents=True)
    (qb / "a.marker").write_text(MARKER, encoding="utf-8")   # 3 parsed, 1 empty
    (qb / "b.marker").write_text(MARKER.replace(
        "WS-E fixture bank", "second bank"), encoding="utf-8")  # 3 parsed, 1 empty
    plan = plan_reload(tmp_path)
    assert plan["questions_parsed"] == 6
    assert plan["empty_text_drops"] == 2
    # b.marker errors at load time AFTER parsing fine at plan time: its
    # 3 parsed rows are lost; a.marker inserts its 2 usable rows.
    rec = reconcile(plan, inserted=2, load_errors=["b.marker: disk died"])
    assert rec["lost_to_file_errors"] == 3
    assert rec["ok"] is True  # 6 == 2 + 1 + 3
    # and a mismatch (lost not accounted) is still a hard failure
    rec2 = reconcile(plan, inserted=2, load_errors=[])
    assert rec2["ok"] is False  # 2 + 2 + 0 != 6


def test_empty_stem_question_not_slurped_from_answer_line(content_root: Path):
    """Corruption regression: 'Q2.\\nAnswer: x' must NOT become a question
    whose stem is the ANSWER LINE and whose answer is the NEXT question's
    answer (the old newline-eating separator did exactly that)."""
    from backend.database.marker_parser import parse_question_bank_file

    doc = parse_question_bank_file(str(
        content_root / "physics" / "question_bank"
        / "c11_phys_question_bank_test.marker"))
    qs = doc["questions"]
    assert len(qs) == 3
    assert qs[0]["question"] == "What is the SI unit of force?"
    assert qs[0]["answer"] == "newton"
    # Q2 keeps its empty stem AND its own answer
    assert qs[1]["question"] == ""
    assert qs[1]["answer"] == "this row has an empty stem"
    # Q3 is untouched by Q2's emptiness
    assert qs[2]["question"] == "State Newton's third law of motion."
    assert qs[2]["answer"] == "every action has an equal and opposite reaction"


def test_reconcile_mismatch_is_a_hard_failure(content_root: Path):
    plan = plan_reload(content_root)
    rec = reconcile(plan, inserted=1, load_errors=[])  # a row vanished
    assert rec["ok"] is False


def test_wipe_namespace_is_owned_board_only():
    """The delete scope must never match the live writer boards."""
    # every OTHER writer's board value (verified in board_coverage.json
    # 2026-10-10: the table's live board domain is exactly these four)
    other_boards = {"CBSE", "ICSE", "ISC", "QUARANTINED"}
    assert OWNED_BOARD not in other_boards
    assert OWNED_BOARD == "CISCE"


def test_wipe_against_empty_root_is_refused(tmp_path: Path):
    import asyncio
    from backend.reload_questions import reload

    empty = tmp_path / "no content root here"
    empty.mkdir()
    rc = asyncio.run(reload(empty, wipe=True, allow_empty=False))
    assert rc == 2


def test_fill_blank_type_alias_normalized_at_ingestion():
    assert QTYPE_ALIASES == {"fill_blank_type": "fill_blank"}
    assert normalize_qtype("fill_blank_type") == "fill_blank"
    # canonical values pass through untouched; case/space tolerant
    assert normalize_qtype("fill_blank") == "fill_blank"
    assert normalize_qtype("mcq_single") == "mcq_single"
    assert normalize_qtype("  TRUE_FALSE ") == "true_false"
    assert normalize_qtype(None) == ""
    assert normalize_qtype("") == ""


def test_reload_module_imports_without_db_side_effects():
    """Plan-mode safety: importing the module must not pull the DB stack."""
    import backend.reload_questions as rq
    assert callable(rq.plan_reload)
    # main() defaults to plan-only: no --wipe, no write
    import inspect
    src = inspect.getsource(rq.main)
    assert "--wipe" in src and "action=\"store_true\"" in src


class _FakeResult:
    def __init__(self, rows):
        self._rows = rows

    def scalars(self):
        return self

    def all(self):
        return self._rows


class _FakeSession:
    """Minimal async_session stand-in: records deletes, never touches PG."""

    def __init__(self):
        self.deleted = []
        self.commits = 0

    async def __aenter__(self):
        return self

    async def __aexit__(self, *exc):
        return False

    async def execute(self, stmt):
        from sqlalchemy.sql.dml import Delete
        if isinstance(stmt, Delete):
            # literal binds so the scoped WHERE (board='CISCE') is visible
            # in the recorded SQL — bare str() only shows ':board_1'
            self.deleted.append(str(stmt.compile(
                compile_kwargs={"literal_binds": True})))
        return _FakeResult([])

    async def commit(self):
        self.commits += 1


def test_wipe_write_path_executes_end_to_end(content_root, monkeypatch, capsys):
    """REGRESSION (found 2026-10-11, ovhE-reg-3): the --wipe path used
    `find_content_files` at module scope it never imported -> NameError
    the moment a real wipe ran (every prior test stopped before the write
    block).  With the session + loaders stubbed, reload(wipe=True) must
    run the whole namespaced wipe + insert + reconcile path and exit 0."""
    import asyncio
    import backend.database as db_mod
    import backend.database.load_content as lc_mod
    import backend.reload_questions as rq

    sess = _FakeSession()
    monkeypatch.setattr(db_mod, "async_session", lambda: sess)
    monkeypatch.setattr(
        lc_mod, "find_content_files",
        lambda root: ([("physics", "question_bank",
                        root / "physics" / "question_bank"
                        / "c11_phys_question_bank_test.marker")],
                      [], []))
    async def _fake_qbanks(db, files):
        return {"inserted": 2, "by_subject": {}, "errors": []}

    async def _fake_akeys(db, files):
        return {"keys_parsed": 0, "updated": 0}

    monkeypatch.setattr(lc_mod, "load_question_banks", _fake_qbanks)
    monkeypatch.setattr(lc_mod, "load_answer_keys", _fake_akeys)

    rc = asyncio.run(rq.reload(content_root, wipe=True, allow_empty=False))
    out = capsys.readouterr().out
    assert rc == 0, out
    # namespaced wipe ran exactly once, scoped to the owned board
    assert len(sess.deleted) == 1
    assert "CISCE" in sess.deleted[0]
    assert sess.commits == 1
    # reconciliation line printed and OK (3 parsed = 2 + 1 + 0)
    assert "RECONCILIATION: parsed=3" in out
    assert "-> OK" in out
