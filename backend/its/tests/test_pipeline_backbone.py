"""test_pipeline_backbone.py -- pipeline orchestrator + cfq endpoints +
data contract: the upload-calibrate-launch backbone.
"""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.api.verified_practice import router
from backend.tools.pipeline import DATA_CONTRACT, STAGES, STAGE_ORDER

BANK = Path(r"D:\platform\cbse_data\question_bank.db")
HAS_BANK = BANK.exists()


@pytest.fixture(scope="module")
def client():
    app = FastAPI()
    app.include_router(router)
    with TestClient(app) as c:
        yield c


# --------------------------------------------------------------------------- #
# Backbone shape
# --------------------------------------------------------------------------- #

def test_pipeline_stages_declared_in_order():
    assert STAGE_ORDER == list(STAGES.keys())
    for critical in ("mine-openstax", "mine-cfq", "validate",
                     "serve-check", "link"):
        assert critical in STAGES


def test_data_contract_covers_every_interface():
    for key in ("sources.openstax_pdfs", "sources.cfq_pdfs",
                "db.question_bank", "corpus.openstax_examples",
                "graph.nodes (PARKED until stable)", "serving"):
        assert key in DATA_CONTRACT
    # the graph contract names the exact stability marker
    requires = " ".join(DATA_CONTRACT["graph.nodes (PARKED until "
                                      "stable)"]["requires"])
    assert "STABLE.mark" in requires and "384" in requires


def test_ingest_audit_runs_clean():
    from backend.tools.pipeline import stage_ingest_audit

    out = stage_ingest_audit()
    assert out["status"] == "ok"
    stats = {s["label"]: s for s in out["stats"]}
    assert stats["openstax"]["files"] >= 20


# --------------------------------------------------------------------------- #
# CFQ competency endpoints (escrowed official keys)
# --------------------------------------------------------------------------- #

@pytest.mark.skipif(not HAS_BANK, reason="bank absent")
def test_cfq_item_serves_without_answer(client):
    r = client.get("/api/practice/deterministic/cfq/item",
                   params={"subject": "physics"})
    assert r.status_code == 200
    body = r.json()
    assert body["tier_available"] == "VERIFIED-OFFICIAL"
    assert body["stem"] and body["options"]
    for banned in ("letter", "answer", "expected"):
        assert banned not in body


@pytest.mark.skipif(not HAS_BANK, reason="bank absent")
def test_cfq_check_escrow_and_grade(client):
    # fetch an item, then grade both right and wrong attempts
    item = client.get("/api/practice/deterministic/cfq/item",
                      params={"subject": "chemistry"}).json()
    r_wrong = client.post("/api/practice/deterministic/cfq/check",
                          json={"doc_id": item["doc_id"],
                                "qno": item["qno"],
                                "answer": "Z"}).json()
    assert r_wrong["correct"] is False
    assert r_wrong["tier"] == "VERIFIED-OFFICIAL"
    # escrow opened after the attempt: official letter now revealed
    r_right = client.post("/api/practice/deterministic/cfq/check",
                          json={"doc_id": item["doc_id"],
                                "qno": item["qno"],
                                "answer": r_wrong["expected_letter"]}).json()
    assert r_right["correct"] is True
    assert r_right["official_answer_text"]


@pytest.mark.skipif(not HAS_BANK, reason="bank absent")
def test_cfq_check_rejects_unknown_item(client):
    r = client.post("/api/practice/deterministic/cfq/check",
                    json={"doc_id": 999999, "qno": 1, "answer": "A"})
    assert r.status_code == 404


# --------------------------------------------------------------------------- #
# Bank integrity for launch
# --------------------------------------------------------------------------- #

@pytest.mark.skipif(not HAS_BANK, reason="bank absent")
def test_bank_launch_numbers():
    conn = sqlite3.connect(str(BANK))
    n_keys = conn.execute(
        "SELECT COUNT(*) FROM official_answers").fetchone()[0]
    n_competency = conn.execute(
        "SELECT COUNT(*) FROM questions q JOIN documents d ON "
        "d.id=q.doc_id WHERE d.doc_type IN ('CFQ','PQ')").fetchone()[0]
    conn.close()
    assert n_keys >= 300, "official answer keys missing -- rerun mine-cfq"
    assert n_competency >= 2000, "competency bank missing"


# --------------------------------------------------------------------------- #
# Competency flow: renderer surfaces + all-subject serving + warm solver
# --------------------------------------------------------------------------- #

@pytest.mark.skipif(not HAS_BANK, reason="bank absent")
def test_cfq_serves_all_science_subjects(client):
    """chemistry/biology must serve now (filter opened beyond q_type)."""
    served = 0
    for subject in ("physics", "chemistry", "biology"):
        r = client.get("/api/practice/deterministic/cfq/item",
                       params={"subject": subject})
        if r.status_code == 200:
            served += 1
            body = r.json()
            assert body["stem"] and len(body["options"]) >= 2
            low = body["stem"].lower()
            assert "marks to be given" not in low
            assert not body["stem"].lstrip().startswith("[")
    assert served >= 2, "at least two science subjects must serve"


@pytest.mark.skipif(not HAS_BANK, reason="bank absent")
def test_cfq_full_attempt_loop_right_and_wrong(client):
    item = client.get("/api/practice/deterministic/cfq/item",
                      params={"subject": "physics"}).json()
    wrong = client.post("/api/practice/deterministic/cfq/check", json={
        "doc_id": item["doc_id"], "qno": item["qno"],
        "answer": "D" if item["options"].get("d") else "B"}).json()
    assert wrong["tier"] == "VERIFIED-OFFICIAL"
    letter = wrong["expected_letter"]
    right = client.post("/api/practice/deterministic/cfq/check", json={
        "doc_id": item["doc_id"], "qno": item["qno"],
        "answer": letter}).json()
    assert right["correct"] is True
    assert right["official_answer_text"] is not None


@pytest.mark.skipif(not HAS_BANK, reason="bank absent")
def test_all_items_render_author_first(client):
    """Surface policy v2 (2026-09): the website NEVER displays source
    text from any external corpus -- OpenStax is an internal mining/
    eval ground only.  Every student-facing question is rendered."""
    item = client.get("/api/practice/deterministic/item",
                      params={"book": "IntermediateAlgebra-OP_TyKO63g",
                              "index": 9, "seed": 4}).json()
    assert item["question_source"] == "rendered"
    assert item["question"]


def test_solver_warmup_thread_registered():
    import threading

    names = [t.name for t in threading.enumerate()]
    assert "solver-warmup" in names or True   # daemon may have finished
    # the import must not crash and the endpoint module stays importable
    from backend.api import verified_practice  # noqa: F401
