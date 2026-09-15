"""pipeline.py -- the backbone.  One entrypoint, ordered stages,
one manifest.  Replaces the scattered one-off scripts as THE way to
run the data pipeline (the scripts remain as stage implementations).

Stages (each idempotent, each writes its results to the manifest):

    ingest-audit   what source files exist + text-layer health
    mine-openstax  OpenStax PDFs -> examples + IR (license-stamped)
    mine-cfq       CBSE CFQ/PQ PDFs -> bank questions + official keys
    compile        marking-scheme chains -> anchor-verified IR stats
    validate       re-run the gate stack over the whole corpus
    coverage       S7 register curve
    link           curriculum-graph linking (GUARDED: requires stable
                   node data -- see PIPELINE.md data contract)
    serve-check    smoke the serving endpoints

Usage:
    python -m backend.tools.pipeline --stage all
    python -m backend.tools.pipeline --stage validate
    python -m backend.tools.pipeline --contract      # print data contract

Manifest: cbse_data/pipeline_manifest.json (stage -> {status, stats,
ran_at}).  Rerunning a stage refreshes only its own section.
"""

from __future__ import annotations

import argparse
import datetime
import json
import subprocess
import sys
from pathlib import Path
from typing import Callable, Dict

PLATFORM = Path(r"D:\platform")
CBSE_DATA = PLATFORM / "cbse_data"
MANIFEST = CBSE_DATA / "pipeline_manifest.json"

STAGE_ORDER = ["ingest-audit", "mine-openstax", "mine-cfq", "compile",
               "validate", "coverage", "link", "serve-check"]


def _now() -> str:
    return datetime.datetime.now().isoformat(timespec="seconds")


def _load_manifest() -> Dict:
    if MANIFEST.exists():
        return json.loads(MANIFEST.read_text())
    return {}


def _save(manifest: Dict) -> None:
    MANIFEST.write_text(json.dumps(manifest, indent=1))


def _run_module(module: str, *args: str) -> Dict:
    cmd = [sys.executable, "-m", module, *args]
    proc = subprocess.run(cmd, cwd=str(PLATFORM), capture_output=True,
                          text=True, timeout=1800)
    ok = proc.returncode == 0
    return {"status": "ok" if ok else "failed",
            "stdout_tail": proc.stdout[-1500:],
            "stderr_tail": proc.stderr[-500:]}


# --------------------------------------------------------------------------- #
# Stages
# --------------------------------------------------------------------------- #

def stage_ingest_audit(**_) -> Dict:
    """What sources exist + text-layer health.  No writes."""
    import fitz

    from backend.tools.mine_cfq import SRC as CFQ_DIR
    from backend.tools.mine_openstax import PDF_DIRS as OS_DIRS

    def audit(dirs, label):
        files, image_pdfs = 0, 0
        for d in dirs:
            if not d.exists():
                continue
            for p in d.glob("*.pdf"):
                files += 1
                try:
                    pdf = fitz.open(str(p))
                    sample = sorted(
                        len(pdf[i].get_text().strip())
                        for i in range(min(10, pdf.page_count)))
                    pdf.close()
                    if (sample[len(sample) // 2] if sample else 0) < 300:
                        image_pdfs += 1
                except Exception:
                    image_pdfs += 1
        return {"label": label, "files": files,
                "image_pdfs_need_ocr": image_pdfs}

    return {"status": "ok",
            "stats": [audit(OS_DIRS, "openstax"), audit([CFQ_DIR], "cfq")]}


def stage_mine_openstax(**_) -> Dict:
    out = _run_module("backend.tools.mine_openstax", "--all")
    summary = CBSE_DATA / "openstax_examples" / "_summary.json"
    if summary.exists():
        out["stats"] = json.loads(summary.read_text())
    return out


def stage_mine_cfq(**_) -> Dict:
    out = _run_module("backend.tools.mine_cfq")
    import sqlite3

    conn = sqlite3.connect(str(CBSE_DATA / "question_bank.db"))
    out["stats"] = {
        "competency_questions": conn.execute(
            "SELECT COUNT(*) FROM questions q JOIN documents d ON "
            "d.id=q.doc_id WHERE d.doc_type IN ('CFQ','PQ')").fetchone()[0],
        "official_answers": conn.execute(
            "SELECT COUNT(*) FROM official_answers").fetchone()[0]}
    conn.close()
    return out


def stage_compile(**_) -> Dict:
    from backend.its.solver.ms_compiler import compile_corpus

    total = {"n_chains": 0, "n_compiled": 0, "n_executable": 0,
             "n_multistep": 0, "n_anchor_verified": 0,
             "n_gate_passed": 0}
    for subject in ("maths", "physics", "chemistry", "science",
                    "accountancy"):
        stats, _ = compile_corpus(subject=subject)
        for k in total:
            total[k] += stats.get(k, 0)
    return {"status": "ok", "stats": {"marking_schemes": total}}


def stage_validate(**_) -> Dict:
    """Gate stack over every corpus file; licenses re-checked."""
    from backend.its.solver.ir import ir_from_dict
    from backend.its.solver.validator import validate_ir

    corpus = CBSE_DATA / "openstax_examples"
    n, passed, restricted_clean = 0, 0, 0
    for f in corpus.glob("*.json"):
        if f.name.startswith("_"):
            continue
        data = json.loads(f.read_text())
        restricted = data.get("license") == "CC-BY-NC-SA-DO-NOT-SHIP"
        for ex in data.get("examples", []):
            if not ex.get("ir"):
                continue
            n += 1
            if validate_ir(ir_from_dict(ex["ir"])).passed:
                passed += 1
            if restricted and "problem" not in ex:
                restricted_clean += 1
    return {"status": "ok", "stats": {
        "irs_checked": n, "gate_passed": passed,
        "restricted_files_surface_clean": restricted_clean}}


def stage_coverage(**_) -> Dict:
    from backend.tools.register_coverage import measure

    out = {}
    for subject in ("mathematics", "maths"):
        try:
            r = measure(subject)
            (CBSE_DATA / f"register_coverage_{subject}.json").write_text(
                json.dumps(r))
            out[subject] = r["curve"][-1] if r["curve"] else None
        except Exception as exc:
            out[subject] = f"error: {exc}"

    # MCQ official-key coverage (A1 metric)
    try:
        conn = sqlite3.connect(str(CBSE_DATA / "question_bank.db"))
        mcq_total = conn.execute(
            "SELECT COUNT(*) FROM questions WHERE q_type='MCQ'"
        ).fetchone()[0]
        mcq_with_key = conn.execute(
            "SELECT COUNT(*) FROM questions q WHERE q.q_type='MCQ' "
            "AND EXISTS(SELECT 1 FROM official_answers oa "
            "WHERE oa.doc_id=q.doc_id AND oa.qno=q.qno)"
        ).fetchone()[0]
        total_keys = conn.execute(
            "SELECT COUNT(*) FROM official_answers").fetchone()[0]
        conn.close()
        out["mcq_key_coverage"] = {
            "mcq_total": mcq_total,
            "mcq_with_key": mcq_with_key,
            "coverage_pct": round(mcq_with_key / mcq_total * 100, 1)
                            if mcq_total else 0.0,
            "total_official_answers": total_keys,
            "target_pct": 90.0,
        }
    except Exception as exc:
        out["mcq_key_coverage"] = f"error: {exc}"

    return {"status": "ok", "stats": out}


def stage_link(**_) -> Dict:
    """Curriculum linking.  GUARDED: requires stable node data.

    Stability contract (PIPELINE.md): node_metadata.json complete and
    node_embeddings.npy present with MiniLM-compatible dimensions.  The
    graph team flips the marker when ready.
    """
    marker = CBSE_DATA / "nodes" / "graph" / "STABLE.mark"
    if not marker.exists():
        return {"status": "skipped",
                "reason": "node data not marked stable "
                          "(cbse_data/nodes/graph/STABLE.mark absent)"}
    return _run_module("backend.tools.node_linker")


def stage_serve_check(**_) -> Dict:
    from fastapi.testclient import TestClient

    from backend.api.verified_practice import router
    from fastapi import FastAPI

    app = FastAPI()
    app.include_router(router)
    with TestClient(app) as c:
        lib = c.get("/api/practice/deterministic/library")
        cfq = c.get("/api/practice/deterministic/cfq/item?subject=physics")
        sol = c.post("/api/practice/deterministic/solve",
                     json={"text": "Solve for x: 2x + 4 = 10"})
    return {"status": "ok" if all(
        r.status_code == 200 for r in (lib, cfq, sol)) else "failed",
        "stats": {"library": lib.status_code, "cfq_item": cfq.status_code,
                  "solver_tier": sol.json().get("tier")}}


STAGES: Dict[str, Callable] = {
    "ingest-audit": stage_ingest_audit,
    "mine-openstax": stage_mine_openstax,
    "mine-cfq": stage_mine_cfq,
    "compile": stage_compile,
    "validate": stage_validate,
    "coverage": stage_coverage,
    "link": stage_link,
    "serve-check": stage_serve_check,
}


DATA_CONTRACT = {
    "sources.openstax_pdfs": {
        "where": "D:/KnowledgeBase/OpenStax/*.pdf",
        "require": "born-digital text layer (median page text >= 300 "
                   "chars); OP/print renditions preferred -- WEB "
                   "renditions compile ~10-100x worse",
        "provides": "worked examples -> IR chains",
    },
    "sources.cfq_pdfs": {
        "where": "ncert-mcp data/raw/cbse_exam/CompetencyFocused/*.pdf",
        "require": "chapter headings 'N. NAME', questions 'Q.N', "
                   "per-chapter 'Answers' keys; image PDFs need OCR",
        "provides": "competency questions + official answer keys",
    },
    "db.question_bank": {
        "tables": {
            "documents": ["id", "filename*", "doc_type", "subject*",
                          "class_label*", "session", "n_questions"],
            "questions": ["id", "doc_id*", "qno*", "section (=chapter)",
                          "q_type", "marks", "is_competency", "text*"],
            "marking_steps": ["doc_id*", "qno*", "step_no", "text*"],
            "official_answers": ["doc_id*", "qno*", "letter*",
                                 "answer_text", "marks"],
        },
        "note": "* = required non-null; others optional",
    },
    "corpus.openstax_examples": {
        "file": "cbse_data/openstax_examples/<book>.json",
        "fields": ["book*", "license*", "n_examples*", "examples[].id*",
                   "examples[].ir (IR schema: quantities+steps+target"
                   "+anchor)*", "surface_policy (regenerate|none)"],
    },
    "graph.nodes (PARKED until stable)": {
        "where": "cbse_data/nodes/graph/",
        "requires": [
            "node_metadata.json: node_id*, subject* (lowercase, "
            "underscored), class_level* (int), chapter*, concept_tags[]",
            "node_embeddings.npy: N x 384 (MiniLM all-MiniLM-L6-v2), "
            "row order == node_metadata order",
            "STABLE.mark: empty marker file created by the data team "
            "when the graph is frozen -- the link stage refuses to run "
            "without it",
        ],
    },
    "serving": {
        "base": "/api/practice/deterministic",
        "endpoints": ["GET /library", "GET /item", "GET /random",
                      "POST /check", "GET /cfq/item", "POST /cfq/check",
                      "POST /solve"],
        "truth_tiers": ["VERIFIED", "VERIFIED-OFFICIAL (cfq keys)",
                        "GUIDED_PRACTICE"],
    },
}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--stage", default="all",
                    choices=STAGE_ORDER + ["all"])
    ap.add_argument("--contract", action="store_true")
    args = ap.parse_args()

    if args.contract:
        print(json.dumps(DATA_CONTRACT, indent=1))
        return

    manifest = _load_manifest()
    todo = STAGE_ORDER if args.stage == "all" else [args.stage]
    for name in todo:
        print(f"== {name} ", flush=True)
        try:
            result = STAGES[name]()
        except Exception as exc:
            result = {"status": "failed", "reason": str(exc)}
        result["ran_at"] = _now()
        manifest[name] = result
        _save(manifest)
        print(f"   {result.get('status')} {str(result.get('stats', ''))[:220]}")


if __name__ == "__main__":
    main()
