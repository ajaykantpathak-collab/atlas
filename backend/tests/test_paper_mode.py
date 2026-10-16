# -*- coding: utf-8 -*-
"""Board Paper Mode (paper_mode router + service) regression tests.

Mirrors the existing no-conftest direct-call pattern of this suite
(test_idor_guards.py): pure service-layer behaviour on stub rows, plus
wiring tests that lock the router into the app — the same "the guard must
actually be attached" logic that keeps an unmounted router from rotting
silently (test_service_reachability.py's dead-code lesson).

No DB, no solver warm-up, no network: grading, paper assembly, catalog
building and the ownership guard are exercised directly; the solve path is
proved wired through the isolation boundary by source inspection (the
isolation contract itself is covered by test_solve_isolation.py).
"""

from __future__ import annotations

import asyncio
import inspect
from pathlib import Path
from types import SimpleNamespace

import pytest
from fastapi import HTTPException

from backend.services import paper_mode_service as pms
from backend.routers import paper_mode as pmr

STUDENT_ID = "3f2a1b4c-5d6e-7f80-91a2-b3c4d5e6f701"
OTHER_STUDENT_ID = "9a8b7c6d-5e4f-3021-8765-4321fedcba09"


# ── stub row factory (only the attributes the service reads) ─────────────
def _row(qid="11111111-2222-3333-4444-555555555555", qtype="short_answer",
         text="What is the SI unit of force?", key="newton",
         model=None, marks=1, options=None, number=1, subject="phy",
         node_tags=None, explanation=None, marking_scheme=None):
    return SimpleNamespace(
        id=qid, question_type=qtype, question_text=text,
        correct_answer=key, model_answer=model, marks=marks, options=options,
        question_number=number, subject=subject, class_level=10,
        node_tags=node_tags, explanation=explanation,
        marking_scheme=marking_scheme, chapter="Force", section="A",
        difficulty="medium")


# ─────────────────────────────────────────────────────────────────────────
# 1. Catalog: honest subject spread (>=5 subjects) and honest emptiness
# ─────────────────────────────────────────────────────────────────────────
def test_catalog_covers_at_least_five_subjects():
    rows = [(s, cls, 10, []) for s, cls in
            [("math", 10), ("phy", 10), ("chem", 10), ("bio", 10),
             ("hist", 10), ("geo", 10), ("math", 12)]]
    combos = pms.build_catalog(rows)
    subjects = {c["subject"] for c in combos}
    assert len(subjects) >= 5
    assert all(c["question_count"] == 10 for c in combos)
    assert all(c["label"] and c["label"] != c["subject"]
               for c in combos), "codes must be presented with real labels"


def test_catalog_honest_empty_when_combination_absent():
    assert pms.build_catalog([]) == []


def test_catalog_reports_years_when_the_bank_has_them():
    combos = pms.build_catalog([("math", 10, 5, ["2019", None, "2020",
                                                 "2019"])])
    assert combos[0]["years"] == ["2019", "2020"]


def test_canonical_subject_aliases():
    assert pms.canonical_subject("Physics") == "phy"
    assert pms.canonical_subject("phy") == "phy"
    assert pms.canonical_subject("acc") == "acc"  # codes pass through


# ─────────────────────────────────────────────────────────────────────────
# 2. Paper assembly: ordering, MCQ options, zero answer leakage
# ─────────────────────────────────────────────────────────────────────────
def test_paper_has_mcq_numeric_and_theory_rows_ordered_without_answers():
    rows = [
        _row(qtype="long_answer", text="Explain Newton's second law.",
             key="F=ma", model="Force equals mass times acceleration. "
             "It is the rate of change of momentum. Apply it per axis.",
             marks=5, number=3),
        _row(qtype="numeric", text="A 2 kg body accelerates at 3 m/s2. "
             "Find the force.", key="6", marks=2, number=1),
        _row(qtype="mcq_single", text="Pick the correct relation",
             key="F = ma", marks=1, number=2,
             options=[["E = mc2", "F = ma", "v = u + at"]]),
    ]
    paper = pms.build_paper(10, "phy", rows)
    assert paper["count"] == 3
    assert [q["number"] for q in paper["questions"]] == [1, 2, 3]
    types = {q["type"] for q in paper["questions"]}
    assert types == {"numeric", "mcq_single", "long_answer"}

    mcq = paper["questions"][1]
    assert mcq["options"] == ["E = mc2", "F = ma", "v = u + at"]

    # zero answer leakage: answer-bearing fields never ship pre-attempt
    forbidden = {"correct_answer", "model_answer", "explanation",
                 "marking_scheme", "node_tags"}
    for q in paper["questions"]:
        assert not (set(q) & forbidden), f"leaked {set(q) & forbidden}"
        assert not any("cbse_0" in str(v) for v in q.values()), \
            "node ids must never appear in paper payloads"


def test_paper_honest_empty_for_absent_combination():
    paper = pms.build_paper(13, " Sanskrit ", [])
    assert paper["count"] == 0 and paper["questions"] == []
    assert paper["note"], "an empty paper must say so, not just be empty"


def test_paper_orders_none_numbers_last():
    rows = [_row(number=None, text="b"), _row(number=2, text="a")]
    paper = pms.build_paper(10, "phy", rows)
    assert [q["number"] for q in paper["questions"]] == [2, None]


# ─────────────────────────────────────────────────────────────────────────
# 3. Grading: one worked verdict per class (numeric / MCQ / theory)
# ─────────────────────────────────────────────────────────────────────────
def test_numeric_verdict_verified_within_tolerance():
    row = _row(qtype="numeric", key="4140", marks=3)
    g = pms.grade_attempt(row, "4140")
    assert g["verdict"] == "CORRECT" and g["marks_awarded"] == 3
    # gate-style 1% relative tolerance: 4130 is the same physics answer
    g = pms.grade_attempt(row, "4130")
    assert g["verdict"] == "CORRECT"
    # a different order of magnitude is not
    g = pms.grade_attempt(row, "414")
    assert g["verdict"] == "WRONG" and g["marks_awarded"] == 0


def test_mcq_verdict_letter_and_text():
    row = _row(qtype="mcq_single", key="F = ma", marks=1,
               options=[["E = mc2", "F = ma", "v = u + at"]])
    assert pms.grade_attempt(row, "F = ma")["verdict"] == "CORRECT"
    assert pms.grade_attempt(row, "B")["verdict"] == "CORRECT"  # letter
    assert pms.grade_attempt(row, "A")["verdict"] == "WRONG"
    assert pms.grade_attempt(row, "E=mc2")["verdict"] == "WRONG"


def test_theory_verdict_guided_partial_and_full():
    model = ("Force equals mass times acceleration. "
             "It is the rate of change of momentum. "
             "The unit of force is the newton. "
             "Apply the equation along each axis separately.")
    row = _row(qtype="long_answer", key="F=ma", model=model, marks=5)
    full = ("Force equals mass times acceleration. It is the rate of change "
            "of momentum. The unit of force is the newton. Apply the "
            "equation along each axis.")
    g = pms.grade_attempt(row, full)
    assert g["verdict"] == "CORRECT" and g["marks_awarded"] == 5

    partial = "Force equals mass times acceleration."
    g = pms.grade_attempt(row, partial)
    assert g["verdict"] == "PARTIAL"
    assert 0 < g["marks_awarded"] < 5  # marks scaled by coverage

    g = pms.grade_attempt(row, "I do not know anything about this topic")
    assert g["verdict"] == "WRONG" and g["marks_awarded"] == 0


def test_ungradeable_when_row_has_no_key():
    row = _row(qtype="long_answer", key=None, model=None, marks=5)
    g = pms.grade_attempt(row, "anything at all")
    assert g["verdict"] == "UNGRADEABLE" and g["correct"] is None
    assert g["marks_awarded"] is None and "withheld" in g["reason"]


def test_blank_answer_is_wrong_not_an_error():
    g = pms.grade_attempt(_row(key="newton"), "")
    assert g["verdict"] == "WRONG" and g["correct"] is False


def test_short_lane_fill_blank():
    assert pms.grade_attempt(_row(qtype="fill_blank", key="pressure"),
                             "Pressure")["verdict"] == "CORRECT"
    assert pms.grade_attempt(_row(qtype="fill_blank", key="pressure"),
                             "temperature")["verdict"] == "WRONG"


# ─────────────────────────────────────────────────────────────────────────
# 4. Solver path: wired through the isolation boundary
# ─────────────────────────────────────────────────────────────────────────
def test_solve_goes_through_isolation_boundary_not_inline():
    """The wedge contract: the solve must call solve_isolation.run_async —
    importing answer_pipeline is fine, CALLING it inline is the ~47-minute
    incident this codebase once shipped."""
    src = Path(pmr.__file__).read_text(encoding="utf-8")
    svc = Path(pms.__file__).read_text(encoding="utf-8")
    assert "run_inline" not in src
    assert "run_async" in svc, "service must use the isolation boundary"
    assert "pipeline_answer, question_text" in svc, \
        "solve must hand the pipeline to run_async, not call it"


def test_verification_beat_detects_the_step_contract_line():
    hit = pms.verification_beat(
        ["List givens with units", "Substitute step by step",
         "Verification: units cancel and the magnitude matches F = ma."])
    assert hit["present"] and "Verification" in hit["line"]
    miss = pms.verification_beat(["List givens", "Substitute values"])
    assert miss["present"] is False and miss["line"] is None


# ─────────────────────────────────────────────────────────────────────────
# 5. Misconception link: honest nulls without a node
# ─────────────────────────────────────────────────────────────────────────
def test_misconception_honest_nulls_without_node_tags():
    link = asyncio.run(pms.misconception_link(_row(node_tags=None)))
    assert link == {"topic_title": None, "diagnostic_question": None,
                    "misconception": None}


def test_misconception_from_index_diagnostics_never_exposes_node_ids(monkeypatch):
    """The index is stubbed — a real load_index() cold-builds the 14k-file
    corpus parse, which no unit test should pay for."""
    import backend.services.enhanced_nodes as en

    class _StubIndex:
        def get(self, nid):
            if nid == "c10_phy_cbse_01_001":
                return {"title": "Force and Motion",
                        "diagnostics": [
                            {"index": 1, "q": "Why does the box stop?",
                             "a": "A wrong answer is frictionless motion",
                             "misconception": "students think motion needs "
                                              "a continuous force"}],
                        "common_misconception": "motion requires force"}

    monkeypatch.setattr(en, "load_index", lambda: _StubIndex())
    link = asyncio.run(pms.misconception_link(
        _row(node_tags=["c10_phy_cbse_01_001"])))
    assert link["topic_title"] == "Force and Motion"
    assert "continuous force" in link["misconception"]
    assert link["diagnostic_question"] == "Why does the box stop?"
    # node ids stay internal: never in the link payload
    assert "node_id" not in link
    assert all("cbse_0" not in str(v or "") for v in link.values())


def test_misconception_falls_back_to_marking_points(monkeypatch):
    import backend.services.enhanced_nodes as en

    class _NoDiagIndex:
        def get(self, nid):
            return {"title": "T", "diagnostics": []}

    monkeypatch.setattr(en, "load_index", lambda: _NoDiagIndex())
    monkeypatch.setattr(en, "misconception_for_node",
                        lambda nid: {"misconception": "sign slip on g",
                                     "wrong_signals": ["-9.8"]})
    link = asyncio.run(pms.misconception_link(
        _row(node_tags=["c10_phy_cbse_02_001"])))
    assert link["misconception"] == "sign slip on g"


def test_misconception_index_failure_degrades_to_honest_nulls(monkeypatch):
    import backend.services.enhanced_nodes as en

    def _boom():
        raise RuntimeError("index cold-build failed")

    monkeypatch.setattr(en, "load_index", _boom)
    link = asyncio.run(pms.misconception_link(
        _row(node_tags=["c10_phy_cbse_01_001"])))
    assert link["misconception"] is None and link["topic_title"] is None


# ─────────────────────────────────────────────────────────────────────────
# 6. Ledger summary
# ─────────────────────────────────────────────────────────────────────────
def test_summarize_counts_and_per_subject_split():
    attempts = [
        {"subject": "phy", "correct": True},
        {"subject": "phy", "correct": False},
        {"subject": "math", "correct": True},
        {"subject": "math", "correct": None},   # ungraded row
    ]
    s = pms.summarize(attempts)
    assert s["total"] == 4 and s["graded"] == 3 and s["correct"] == 2
    assert s["accuracy_pct"] == round(100 * 2 / 3, 1)
    assert s["by_subject"]["phy"] == {"total": 2, "correct": 1}


# ─────────────────────────────────────────────────────────────────────────
# 7. Wiring: the ownership guard is attached and the router is mounted
# ─────────────────────────────────────────────────────────────────────────
def test_attempts_endpoint_carries_self_or_staff_guard():
    """Same wiring proof as the B16 tests: the guard must be IN the
    endpoint signature, not merely exist somewhere in the module."""
    guard = inspect.signature(pmr.paper_attempts).parameters[
        "student_id"].default
    from fastapi.params import Depends as DependsClass
    assert isinstance(guard, DependsClass), "attempts route lost its guard"
    assert guard.dependency.__name__ == "require_self_or_staff"


def test_attempt_post_requires_authentication():
    from fastapi.params import Depends as DependsClass
    deps = [p.default.dependency for p in
            inspect.signature(pmr.paper_attempt).parameters.values()
            if isinstance(p.default, DependsClass)]
    names = {getattr(d, "__name__", "") for d in deps}
    assert "get_current_user" in names, "attempt POST must require a user"


def test_router_mounted_in_main_before_parameterized_paper_route():
    """backend.main is deliberately NOT imported here: under the container's
    ATLAS_MASTER_WARM=1 a bare import preloads every model in the TEST
    process (minutes + GB of RSS).  The reachability gate's lesson applies
    instead — lock the wiring by source, then prove route ORDER on a micro
    app built from the real router module."""
    backend_dir = Path(pmr.__file__).resolve().parent.parent
    main_src = (backend_dir / "main.py").read_text(encoding="utf-8")
    init_src = (backend_dir / "routers" / "__init__.py").read_text(
        encoding="utf-8")
    assert "paper_mode_router" in init_src, "router never exported"
    assert "app.include_router(paper_mode_router)" in main_src, \
        "router never mounted in the app"

    # route order on the real router object: literal routes must be
    # declared BEFORE the parameterized paper route, or FastAPI matches
    # "/api/paper/attempts/x" as class_level="attempts" (the /me-swallows
    # bug class).
    paths = [r.path for r in pmr.router.routes]
    assert "/api/paper/subjects" in paths
    assert "/api/paper/attempt" in paths
    assert "/api/paper/attempts/{student_id}" in paths
    assert "/api/paper/{class_level}/{subject}" in paths
    assert paths.index("/api/paper/attempts/{student_id}") < \
        paths.index("/api/paper/{class_level}/{subject}")


# ─────────────────────────────────────────────────────────────────────────
# 8. Ownership guard behaviour (the B16 rule, unchanged)
# ─────────────────────────────────────────────────────────────────────────
def test_self_or_staff_rule_on_the_guard_we_reuse():
    from backend.deps import require_self_or_staff
    guard = require_self_or_staff
    me = SimpleNamespace(id=STUDENT_ID, role="student")
    other = SimpleNamespace(id=OTHER_STUDENT_ID, role="student")
    staff = SimpleNamespace(id=OTHER_STUDENT_ID, role="teacher")
    assert asyncio.run(guard(STUDENT_ID, me)) == STUDENT_ID
    with pytest.raises(HTTPException) as exc:
        asyncio.run(guard(OTHER_STUDENT_ID, me))
    assert exc.value.status_code == 403
    assert asyncio.run(guard(OTHER_STUDENT_ID, staff)) == OTHER_STUDENT_ID
