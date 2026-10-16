# -*- coding: utf-8 -*-
"""CBQ bank (competency-question engine) regression tests.

Covers, per the compq-engine spec:
  * parser round-trip on an inline _comp document + both embedded-CQ shapes;
  * node-id hygiene (scrub + served payloads carry zero ids in display text);
  * deterministic grading: numeric gate-matching (correct / partial /
    incorrect) and theory self-assessment flow;
  * subject spread of the built bank (>= 6 subjects, skipped when the bank
    has not been built yet);
  * wiring: the router is mounted in BOTH main.py trees and the solver
    cross-check goes through the solve_isolation boundary (source inspection,
    same anti-rot pattern as test_paper_mode.py / test_service_reachability.py).

No docker, no DB, no solver warm-up: the only heavy artifact touched is the
built JSONL bank (content dir), and only in the tests marked to skip without it.
"""
from __future__ import annotations

import asyncio
import json
import re
from pathlib import Path

import pytest

from backend.services.compq_bank import (
    NODE_ID_RE,
    _SCRUB_RE,
    classify_sub_part,
    extract_numerics,
    grade_numeric_attempt,
    match_gates,
    parse_comp_file,
    parse_embedded_cqs,
    parse_node_bundle,
    parse_node_id,
    scrub_node_ids,
)
from backend.routers import compq as compq_router_module

REPO_ROOT = None
_ancestors = [Path(__file__).resolve().parent, *Path(__file__).resolve().parents]
for _anc in _ancestors:
    if (_anc / "deploy" / "content" / "compq_bank.jsonl").exists():
        REPO_ROOT = _anc
        break
if REPO_ROOT is None:
    for _anc in _ancestors:
        if (_anc / "content" / "compq_bank.jsonl").exists():
            REPO_ROOT = _anc
            break
assert REPO_ROOT is not None, "repo root not found from test file location"
BANK_PATH = REPO_ROOT / "deploy" / "content" / "compq_bank.jsonl"

SAMPLE_COMP_MD = """## PARENT_NODE_ID
c9_math_cbse_01_001

## EXAM_TARGETS
CBSE Class 9, school exams

## STREAM
maths

## NODES_INVOLVED
### PRIMARY_SUBJECT_NODES:
c9_math_cbse_01_001, c9_math_cbse_01_002
### CROSS_SUBJECT_NODES:
c9_sci_cbse_01_001
### PREREQUISITE_NODES:
c8_math_cbse_01_001

## SEED_QUESTION_1
### TITLE: Number Systems — the cricket pitch case
### SCENARIO:
A groundkeeper marks a pitch of length 2.05 m and wants it expressed as a
fraction of the 20 m square boundary. (c9_math_cbse_01_002)
### CONCEPTS_COMBINED:
Math: c9_math_cbse_01_001, c9_math_cbse_01_002 | Physics: units
### DIFFICULTY_TIER: Main
### EXAM_LEVELS: CBSE Class 9

### SUB_PART_A
**Q:** Express 2.05 m as a fraction of the 20 m boundary and simplify.
**Nodes:** c9_math_cbse_01_001, c9_math_cbse_01_002 | **Level:** Main | **Time:** 60 sec
**Guideline:**
Step 1 (Identify+Recall): We need 2.05/20 as a simplified fraction.
Step 2 (Setup): 2.05 = 205/100, so the fraction is 205/2000.
Step 3 (Execute): Divide by 5: 41/400.
Step 4 (Verify+Answer): 2.05 m is 41/400 of the 20 m boundary.
Step 5 (Generalize): Any terminating decimal converts to a fraction with denominator 10^k.
**Shortcut:** Move the decimal, then cancel. | 20 sec saved | Terminating decimals only.
**Traps:** (1) Writing 2.05/20 as 205/20 → wrong. (2) Forgetting to simplify.
**Variants:** V1: Pitch 1.5 m. V2: Boundary 25 m. V3: Recurring decimal. V4: Conceptual — why simplify? V5: Assertion-Reason: "41/400 is in lowest terms" — True.

### SUB_PART_B
**Q:** Explain why an irrational number cannot be written as such a fraction.
**Nodes:** c9_math_cbse_01_001 | **Level:** Main | **Time:** 90 sec
**Guideline:**
Step 1 (Identify+Recall): Irrational = not expressible as p/q with integers p, q.
Step 2 (Setup): Suppose sqrt(2) = p/q in lowest terms.
Step 3 (Execute): Squaring gives 2q^2 = p^2; parity argument forces both even — contradiction.
Step 4 (Verify+Answer): Contradiction, so sqrt(2) is irrational.
Step 5 (Generalize): Same parity argument works for sqrt(3), sqrt(5).
**Shortcut:** Contradiction via lowest terms. | 30 sec saved | Quadratic irrationals.
**Traps:** (1) Assuming p, q coprime is unnecessary. (2) Mixing up parity steps.
**Variants:** V1: sqrt(3). V2: sqrt(5). V3: cube root case. V4: Conceptual — define irrational. V5: Assertion-Reason — False.

## DECOMPOSITION_MAP
| Seed | Sub-part | Concept |
|------|----------|---------|
| 1 | A | decimal fractions |
TOTAL: 2
"""

SAMPLE_NODE_CBSE = """## DEFINITION
Number systems basics.

## WORKED_EXAMPLE_1
PROBLEM: Express 0.75 as a fraction.
STEPS:
- Step 1: 0.75 = 75/100.
- Step 2: Simplify to 3/4.
REASONING: Terminating decimals have denominator a power of ten.
ANSWER: 3/4.

## COMPETENCY_QUESTION_1
QUESTION: A student claims 0.999... equals 1. Evaluate the claim.
COMPETENCY: evaluating arguments
STEPS:
- Step 1: Let x = 0.999...
- Step 2: 10x - x = 9, so x = 1.
ANSWER: The claim is correct: 0.999... = 1 exactly.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Convert 2.05 m to a fraction of 20 m and justify each step.
COMPETENCY: procedural fluency
STEPS:
- Step 1: 2.05/20 = 205/2000.
- Step 2: Simplify by 5 to 41/400.
ANSWER: 41/400.
DIFFICULTY: easy
"""

SAMPLE_NODE_CISCE = """## DEFINITION
Cell division basics.

## DIAGNOSTIC_QUESTION_1
A student counts 4 cells in anaphase out of 200 and concludes anaphase is the
shortest phase. Evaluate.
## DIAGNOSTIC_ANSWER_1
The data support the claim since 2% is the smallest share. A wrong answer
(e.g., "the counts are too small to say anything") reveals the misconception
that proportional reasoning needs huge samples.

## COMPETENCY_QUESTION_1
QUESTION: Interpret the phase-count data from the onion root tip slide.
COMPETENCY: interpreting experimental evidence
ANSWER: Interphase has 85% of cells, so it is the longest phase.
MARKING_POINTS: - Correct percentages (1 mark) - Correct link to duration (1 mark)
DIFFICULTY: medium
"""


# --------------------------------------------------------------------------- #
# Parser round-trip
# --------------------------------------------------------------------------- #

def test_parse_comp_round_trip(tmp_path: Path) -> None:
    f = tmp_path / "c9_math_cbse_01_001_comp.md"
    f.write_text(SAMPLE_COMP_MD, encoding="utf-8")
    rec = parse_comp_file(f)
    assert rec is not None
    assert rec["parent_node"] == "c9_math_cbse_01_001"
    assert rec["subject"] == "math" and rec["grade"] == 9 and rec["stream"] == "maths"
    assert len(rec["seeds"]) == 1
    seed = rec["seeds"][0]
    assert [sp["sub_part_id"] for sp in seed["sub_parts"]] == ["A", "B"]
    sp_a = seed["sub_parts"][0]
    assert sp_a["time_sec"] == 60
    assert sp_a["nodes"] == ["c9_math_cbse_01_001", "c9_math_cbse_01_002"]
    assert [s["label"] for s in sp_a["guideline_steps"]] == [
        "Identify+Recall", "Setup", "Execute", "Verify+Answer", "Generalize"]
    assert len(sp_a["traps"]) == 2
    assert len(sp_a["variants"]) == 5
    assert sp_a["variants"][0]["text"].startswith("Pitch 1.5 m")
    concepts = rec["seeds"][0]
    assert "Math" in str(concepts["concepts_combined_raw"])


def test_node_id_parsing() -> None:
    m = parse_node_id("c12_acc_cbse_01_001")
    assert (m["grade"], m["subject"], m["board"]) == (12, "acc", "cbse")
    m = parse_node_id("c10_bio_icse_01_001")
    assert (m["grade"], m["board"]) == (10, "icse")
    m = parse_node_id("c12_cs_isc_03_003")
    assert (m["board"]) == "isc"
    m = parse_node_id("c6_economics_ch07_001")
    assert (m["grade"], m["subject"]) == (6, "economics")


def test_scrub_and_embedded_both_boards(tmp_path: Path) -> None:
    dirty = "Economics context (c10_eco_cbse_01_002) matters, see c12_acc_cbse_01_001."
    clean = scrub_node_ids(dirty)
    assert not _SCRUB_RE.search(clean)
    assert "Economics context" in clean and "c10_eco" not in clean

    cbse = parse_embedded_cqs(SAMPLE_NODE_CBSE)
    assert len(cbse) == 2
    assert cbse[0]["steps"] and cbse[0]["answer"]
    assert cbse[0]["marking_points"] == []

    cisce = parse_embedded_cqs(SAMPLE_NODE_CISCE)
    assert len(cisce) == 1
    assert cisce[0]["steps"] == []
    assert len(cisce[0]["marking_points"]) == 2
    assert cisce[0]["answer"]


def test_node_bundle_worked_examples_and_diagnostics() -> None:
    bundle = parse_node_bundle(SAMPLE_NODE_CBSE)
    assert len(bundle["worked_examples"]) == 1
    we = bundle["worked_examples"][0]
    assert we["problem"].startswith("Express 0.75")
    assert we["answer"] == "3/4."
    assert len(we["steps"]) == 2

    bundle2 = parse_node_bundle(SAMPLE_NODE_CISCE)
    assert bundle2["diagnostics"], "CISCE diagnostics must be carved"
    d = bundle2["diagnostics"][0]
    assert d["q"].startswith("A student counts")
    assert "misconception" in (d["misconception"] or "").lower()
    assert bundle2["worked_examples"] == []      # honest empty, not fabricated


# --------------------------------------------------------------------------- #
# Grading: numeric gates + theory flow
# --------------------------------------------------------------------------- #

def _numeric_row() -> dict:
    return {
        "compq_id": "cq_" + "0" * 16,
        "sub_part_id": "A",
        "parent_node": "c12_acc_cbse_01_001",
        "kind": "numeric",
        "q": "Value goodwill using the super profit method (3 years' purchase).",
        "guideline_steps": [
            {"step": "1", "label": "Identify+Recall", "text": "recall super profit"},
            {"step": "4", "label": "Verify+Answer",
             "text": "Normal Profit = 57.6L; Super Profit = -12.6L; "
                     "Goodwill (Super Profit) = -37.8L."},
            {"step": "5", "label": "Generalize", "text": "if rate 15% then recompute"},
        ],
        "answer_gates": extract_numerics(
            "Normal Profit = 57.6L; Super Profit = -12.6L; Goodwill = -37.8L."),
        "traps": ["Using book value of the algorithm instead of 120L."],
        "shortcut": "Negative super profit -> no goodwill.",
        "time_sec": 180,
    }


def test_numeric_gate_matching() -> None:
    gates = extract_numerics("Goodwill = -37.8L and ratio 6 : 4 : 2 : 3.")
    assert [g["raw"] for g in gates] == ["-37.8", "6", "4", "2", "3"]
    assert gates[0]["unit"] == "L"

    hit = match_gates(_numeric_row()["answer_gates"],
                      "Goodwill is -37.8 lakh (57.6 normal, -12.6 super).")
    assert hit["graded"] and hit["ratio"] >= 0.75

    miss = match_gates(_numeric_row()["answer_gates"], "I think goodwill is 60.")
    assert miss["graded"] and miss["ratio"] < 0.4


def test_attempt_flow_numeric() -> None:
    row = _numeric_row()
    full = grade_numeric_attempt(row, "Normal profit 57.6L, super profit -12.6L, "
                                      "goodwill -37.8L")
    assert full["verdict"] == "correct" and full["graded_by"] == "gate"
    # concise answer hitting only the final deliverable: conservative partial
    concise = grade_numeric_attempt(row, "Goodwill = -37.8L")
    assert concise["verdict"] == "partial"
    partial = grade_numeric_attempt(row, "Normal profit 57.6 only")
    assert partial["verdict"] == "partial"
    wrong = grade_numeric_attempt(row, "goodwill = 60")
    assert wrong["verdict"] == "incorrect"

    from backend.routers.compq import grade_attempt
    served = grade_attempt(row, "goodwill = 60", check_with_solver=False)
    assert served["verdict"] == "incorrect"
    assert served["traps"], "miss must surface the named misconception traps"
    labels = [s["label"] for s in served["method"]["guideline_steps"]]
    assert "Verify+Answer" in labels
    assert served.get("gates_total") == 3


def test_attempt_flow_theory() -> None:
    row = _numeric_row()
    row["kind"] = "theory"
    row["answer_gates"] = []
    served = compq_router_module.grade_attempt(row, "It cannot be negative because...",
                                               check_with_solver=False)
    assert served["verdict"] == "self_assessed"
    assert served["graded_by"] == "authored_guideline"
    assert served["rubric"] and len(served["rubric"]) == 3
    assert served["traps"]


def test_classification_rule() -> None:
    q_num = "Calculate the sacrificing ratio of the three partners."
    gates = extract_numerics("Sacrificing ratio = 0 : 5 : 7.")
    assert classify_sub_part(q_num, gates)[0] == "numeric"
    q_theory = "Explain why the firm records a capital reserve here."
    assert classify_sub_part(q_theory, [])[0] == "theory"
    assert classify_sub_part(q_num, [])[0] == "theory"


# --------------------------------------------------------------------------- #
# Bank-level checks (need the built bank; skipped otherwise)
# --------------------------------------------------------------------------- #

def _bank_rows(min_rows: int = 1):
    if not BANK_PATH.exists():
        pytest.skip("compq bank not built yet (deploy/content/compq_bank.jsonl)")
    rows = []
    with BANK_PATH.open("r", encoding="utf-8") as fh:
        for line in fh:
            if line.strip():
                rows.append(json.loads(line))
    return rows


def test_bank_subject_spread_at_least_6() -> None:
    rows = _bank_rows()
    subjects = {r.get("subject_label") for r in rows}
    assert len(subjects) >= 6, f"bank must span >=6 subjects, got {sorted(subjects)}"
    boards = {r.get("board") for r in rows}
    assert "cbse" in boards


def test_bank_display_strings_never_leak_node_ids() -> None:
    rows = _bank_rows()
    display_keys = ("q", "scenario", "seed_title", "shortcut")
    leaks = 0
    for r in rows[:5000]:
        for k in display_keys:
            if r.get(k) and _SCRUB_RE.search(str(r[k])):
                leaks += 1
        for s in r.get("guideline_steps") or []:
            if _SCRUB_RE.search(s.get("text") or ""):
                leaks += 1
        for t in r.get("traps") or []:
            if _SCRUB_RE.search(t):
                leaks += 1
    assert leaks == 0, f"{leaks} display strings still contain internal node ids"


# --------------------------------------------------------------------------- #
# Serving endpoints against the real bank (skipped when not built)
# --------------------------------------------------------------------------- #

def _pick_row(rows, with_variants=False, kind=None):
    for r in rows:
        if kind and r.get("kind") != kind:
            continue
        if with_variants and not (r.get("variants") or []):
            continue
        return r
    return None


def test_node_endpoint_payload_and_id_hygiene() -> None:
    rows = _bank_rows()
    target = rows[0]
    payload = asyncio.run(compq_router_module.node_cbqs(target["parent_node"]))
    assert payload["node"] == target["parent_node"]
    assert payload["counts"]["cbq_sub_parts"] >= 1
    assert payload["cbqs"], "node payload must list CBQ sub-parts (question side)"
    for cbq in payload["cbqs"]:
        assert "guideline_steps" not in cbq, "questions must not leak the guideline"
        assert "answer_gates" not in cbq and "traps" not in cbq
    if payload["counts"]["worked_examples"]:
        we = payload["worked_examples"][0]
        assert {"problem", "steps", "reasoning", "answer"} <= set(we)
    blob = json.dumps(payload, ensure_ascii=False)
    # ids ARE allowed as opaque fetch keys; display fields must be clean —
    # walk the question-side payloads specifically:
    for cbq in payload["cbqs"]:
        for k in ("question", "scenario", "seed_title"):
            assert not _SCRUB_RE.search(cbq.get(k) or ""), f"id leak in {k}"


def test_attempt_endpoint_numeric_and_diagnostic_on_miss() -> None:
    rows = _bank_rows()
    row = _pick_row(rows, kind="numeric")
    if row is None:
        pytest.skip("no numeric rows in bank")
    miss_text = "999999"
    req = compq_router_module.AttemptRequest(
        compq_id=row["compq_id"], sub_part_id=row["sub_part_id"],
        student_answer=miss_text, check_with_solver=False)
    resp = asyncio.run(compq_router_module.attempt(req))
    assert resp["compq_id"] == row["compq_id"]
    assert resp["verdict"] == "incorrect"
    assert resp["traps"]
    assert resp["method"]["guideline_steps"]
    # diagnostic misconception surfaces on a miss when the node has diagnostics
    if "diagnostic" in resp:
        assert "misconception" in resp["diagnostic"]


def test_variants_endpoint_fresh_instances() -> None:
    rows = _bank_rows()
    row = _pick_row(rows, with_variants=True)
    if row is None:
        pytest.skip("no variant rows in bank")
    payload = asyncio.run(compq_router_module.variants(row["compq_id"]))
    assert payload["compq_id"] == row["compq_id"]
    assert len(payload["instances"]) >= 3
    for inst in payload["instances"]:
        assert inst["base_question"] and inst["mutation"]


# --------------------------------------------------------------------------- #
# Wiring (anti-rot source inspection, mirrors test_paper_mode.py)
# --------------------------------------------------------------------------- #

def test_router_mounted_in_both_main_trees() -> None:
    for main_py in (REPO_ROOT / "deploy" / "backend" / "main.py",
                    REPO_ROOT / "backend" / "main.py"):
        src = main_py.read_text(encoding="utf-8")
        assert "compq_router" in src, f"{main_py} does not mount the compq router"
        assert "app.include_router(compq_router)" in src
    init_py = (REPO_ROOT / "deploy" / "backend" / "routers" / "__init__.py").read_text(encoding="utf-8")
    assert "from backend.routers.compq import router as compq_router" in init_py


def test_solver_crosscheck_goes_through_isolation_boundary() -> None:
    src = (REPO_ROOT / "deploy" / "backend" / "routers" / "compq.py").read_text(encoding="utf-8")
    assert "solve_isolation.run_async" in src, "solver calls must use the isolation boundary"
    # answer_pipeline may only be imported inside the pool-side function
    pipeline_uses = [ln for ln in src.splitlines() if "answer_pipeline" in ln]
    inside_sync = src.split("def _solver_numeric_sync")[1].split("\nasync def")[0]
    for ln in pipeline_uses:
        assert ln in inside_sync or ln.strip().startswith("#"), (
            f"answer_pipeline referenced outside the isolation wrapper: {ln.strip()}")
