"""test_phase1_build.py -- one-pass build tests: surface renderer,
display-math compiler pass, solver API bridge, CFQ bank integrity.
"""

from __future__ import annotations

import sqlite3
from pathlib import Path

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.its.solver.ir import IR, Quantity, Step
from backend.its.solver.ms_compiler import compile_chain, repair_expression
from backend.its.solver.surface_renderer import render_question, vary

DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")


# --------------------------------------------------------------------------- #
# Display-math pass
# --------------------------------------------------------------------------- #

def test_discourse_prefix_becomes_assignment():
    lines = ["We have the area A = 1/2 x 7 x 7"]
    ir, rep = compile_chain(lines)
    assert ir.anchor_value == pytest.approx(24.5)
    assert rep.passed, rep.failures


def test_unit_suffix_stripped():
    out, repairs = repair_expression("22/7 x 7 x 7 x 10 cm3")
    assert "cm3" not in out
    assert "unit_suffix" in repairs


def test_unit_suffix_not_a_variable():
    out, _ = repair_expression("7H")            # H is a variable, not a unit
    assert out == "7*H"


# --------------------------------------------------------------------------- #
# Surface renderer
# --------------------------------------------------------------------------- #

def _ir() -> IR:
    text = "CP = 400 | Profit = 60 | Profit% = 60/400*100 = 15"
    ir = IR(source_text=text, provenance="marking_scheme")
    ir.quantities = [Quantity(400, "400"), Quantity(60, "60")]
    ir.steps = [
        Step("profit_percent", "60/400*100", ["q1"],
             executable=True, value=15.0),
    ]
    ir.target = "profit_percent"
    ir.anchor_value = 15.0
    return ir


def test_render_guided_withholds_final_value():
    out = render_question(_ir(), mode="guided")
    assert out["ok"]
    assert "profit percent" in out["question"]
    assert "400" in out["question"] and "60" in out["question"]
    assert out["answer_withheld"] is True
    assert "15" not in out["question"]


def test_render_verified_shows_answer():
    out = render_question(_ir(), mode="verified")
    assert out["steps"][-1]["value"] == "15"


def test_render_deterministic():
    a = render_question(_ir(), mode="guided")
    b = render_question(_ir(), mode="guided")
    assert a == b


def test_vary_changes_givens_and_recomputes_anchor():
    v = vary(_ir(), seed=7)
    assert v is not None
    assert v.anchor_value != 15.0
    # 400 (single-occurrence, unprotected) must change; 60 also eligible
    out = render_question(v, mode="verified")
    assert out["steps"][-1]["value"] is not None


def test_vary_deterministic_and_seeded():
    assert vary(_ir(), seed=7).to_dict() == vary(_ir(), seed=7).to_dict()
    seeds = {vary(_ir(), seed=s).anchor_value for s in range(20)}
    assert len(seeds) > 1          # seeds actually diversify


def test_vary_protects_repeated_literals():
    # r appears twice (r*r): geometry consistency forbids varying it
    text = "Area = 22/7 x 7 x 7 = 154"
    ir, _ = compile_chain([text])
    v = vary(ir, seed=3)
    if v is not None:              # 22,7 protected; nothing safe to vary
        assert v.anchor_value == ir.anchor_value


def test_vary_never_renders_source_text():
    v = vary(_ir(), seed=11)
    out = render_question(v, mode="guided")
    assert "CP = 400" not in out["question"]


# --------------------------------------------------------------------------- #
# Solver API bridge (truth tiers)
# --------------------------------------------------------------------------- #

@pytest.fixture(scope="module")
def client():
    from backend.api.verified_practice import router

    app = FastAPI()
    app.include_router(router)
    with TestClient(app) as c:
        yield c


def test_solve_endpoint_verified_tier(client):
    r = client.post("/api/practice/deterministic/solve",
                    json={"text": "Solve for x: 2x + 6 = 20"})
    assert r.status_code == 200
    body = r.json()
    assert body["tier"] in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS")
    assert body["answer"] is not None


def test_solve_endpoint_never_leaks_unverified_answer(client):
    r = client.post("/api/practice/deterministic/solve", json={
        "text": "A certain obscure problem about zorblaxian flux gates "
                "with no canonical structure anywhere"})
    body = r.json()
    assert body["answer"] is None
    assert body["tier"] in ("GUIDED_PRACTICE",)
    assert body["solved"] is False


def test_solve_endpoint_validation(client):
    r = client.post("/api/practice/deterministic/solve", json={"text": "hi"})
    assert r.status_code == 422


# --------------------------------------------------------------------------- #
# Corpus + bank integrity
# --------------------------------------------------------------------------- #

def test_openstax_corpus_licenses_stamped():
    import json

    d = Path(r"D:\platform\cbse_data\openstax_examples")
    files = [f for f in d.glob("*.json") if not f.name.startswith("_")]
    assert len(files) >= 15
    for f in files:
        data = json.loads(f.read_text())
        assert "license" in data, f.name
        if data["license"] == "CC-BY-NC-SA-DO-NOT-SHIP":
            assert data.get("surface_policy") == "regenerate"
            for ex in data["examples"]:
                assert "problem" not in ex and "solution_lines" not in ex


def test_cfq_bank_has_competency_questions():
    if not DB_PATH.exists():
        pytest.skip("bank absent")
    conn = sqlite3.connect(str(DB_PATH))
    n = conn.execute(
        "SELECT COUNT(*) FROM questions q JOIN documents d ON "
        "d.id=q.doc_id WHERE d.doc_type IN ('CFQ','PQ') "
        "AND q.is_competency=1").fetchone()[0]
    conn.close()
    assert n >= 400


# --------------------------------------------------------------------------- #
# Class-6 linear-system regression (the 'where' idiom, 2026-09 user find)
# --------------------------------------------------------------------------- #

def test_class6_linear_system_where_idiom():
    import io, contextlib
    buf = io.StringIO()
    with contextlib.redirect_stderr(buf):
        from backend.its.solver.router import solve_text
    for text, want in [
        ("x+y = 30 where y is -6 wats the value of x", 36.0),
        ("x + y = 30 where y is -6. What is the value of x?", 36.0),
        ("If x + y = 30 and y = -6, find x.", 36.0),
    ]:
        r = solve_text(text)
        assert r.verified and r.numeric is not None, text
        assert abs(r.numeric - want) < 1e-6, f"{text} -> {r.numeric}"
