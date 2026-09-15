"""verified_practice.py -- Ship-ready practice API over the verified IR
corpus (deterministic engine).  Distinct from the legacy IRT practice
router in api/practice.py; mounted at /api/practice/deterministic.

Design: STATELESS ANSWER ESCROW.  A practice item is fully determined
by (book, index, seed); the server rebuilds the item and its official
answer at check time WITHOUT ever shipping the answer to the client.
The GET /item response physically cannot leak what it does not contain.

Truth tiers (ARCHITECTURE.md 11): every served item's chain re-executes
to its stored anchor under the gate stack.  Guided mode withholds the
final value until the student attempts an answer.

Endpoints:
  GET  /api/practice/deterministic/library
  GET  /api/practice/deterministic/item?book=&index=&seed=
  GET  /api/practice/deterministic/random?seed=
  POST /api/practice/deterministic/check
"""

from __future__ import annotations

import json
import random
import re
import threading
from fractions import Fraction
from pathlib import Path
from typing import Dict, List, Optional

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from backend.its.solver.ir import ir_from_dict
from backend.its.solver.surface_renderer import render_question, vary
from backend.its.solver.validator import validate_ir

_REPO_ROOT = Path(__file__).resolve().parents[2]   # backend/api/.. -> repo root
CORPUS_DIR = _REPO_ROOT / "cbse_data" / "openstax_examples"

router = APIRouter(prefix="/api/practice/deterministic",
                   tags=["practice-deterministic"])

_cache: Dict[str, dict] = {}

# Warm the solve cascade at import (server boot): loads MiniLM and the
# kernel so the first real student doubt does not pay 10 s cold-start.
def _warm_solver() -> None:
    import time

    time.sleep(2)
    try:
        from backend.its.solver.router import solve_text
        solve_text("Solve for x: 2x + 2 = 6")
        # warm the batched-embed path too: its lazy init costs ~30-40s
        # on first use, which would otherwise hit a real student
        from backend.its.solver.quantity_parser import parse_quantities
        from backend.its.solver.variable_registry import embed_texts
        qs = parse_quantities("A car travels 180 km in 3 hours at constant speed.")
        if qs:
            embed_texts([q.context for q in qs])
    except Exception:
        pass  # warmup is best-effort; the endpoint works regardless


threading.Thread(target=_warm_solver, daemon=True,
                 name="solver-warmup").start()


def _load_book(book: str) -> dict:
    if book in _cache:
        return _cache[book]
    if ".." in book or "/" in book or "\\" in book:
        raise HTTPException(404, "invalid book id")
    path = CORPUS_DIR / f"{book}.json"
    if not path.exists():
        raise HTTPException(404, f"unknown book {book!r}")
    data = json.loads(path.read_text())
    if not _shippable(data):
        raise HTTPException(
            404, f"book {book!r} is not shippable "
                 f"(quarantined by license/metadata flag)")
    _cache[book] = data
    return data


def _shippable(book_data: dict) -> bool:
    """Quarantine gate: any book whose license/metadata carries a
    DO-NOT-SHIP flag (e.g. CC-BY-NC-SA-DO-NOT-SHIP) never serves —
    not via /library, /item, /random, /check, or /binditem."""
    license_tag = str(book_data.get("license", "") or "").upper()
    if "DO-NOT-SHIP" in license_tag or "DO_NOT_SHIP" in license_tag:
        return False
    policy = str(book_data.get("surface_policy", "") or "").upper()
    if "DO-NOT-SHIP" in policy or "DO_NOT_SHIP" in policy:
        return False
    return True


def _verified_examples(book_data: dict) -> List[dict]:
    return [ex for ex in book_data.get("examples", [])
            if ex.get("anchor_verified") and ex.get("ir")]


def _quality_ok(rendered: dict) -> bool:
    """Screen out degenerate items: need >= 2 steps and >= 2 distinct
    non-trivial givens so the student actually computes something."""
    givens = [g for g in rendered.get("givens", []) if g not in ("0", "?")]
    return len(rendered.get("steps", [])) >= 2 and len(givens) >= 2


def _build_item(book: str, index: int, seed: Optional[int]) -> dict:
    """Deterministic: same (book, index, seed) -> same item, always.

    Walks forward from the requested index until an example passes the
    gate stack AND the quality screen, so degenerate one-step chains
    never reach a student.
    """
    data = _load_book(book)
    examples = _verified_examples(data)
    if not examples:
        raise HTTPException(404, f"book {book!r} has no verified chains")
    chosen = None
    # pass 1: gates + quality; pass 2: gates only (books whose every
    # chain is degenerate still serve rather than 404)
    for require_quality in (True, False):
        for offset in range(len(examples)):
            ex = examples[(index + offset) % len(examples)]
            ir = ir_from_dict(ex["ir"])
            if not validate_ir(ir).passed:
                continue
            probe = render_question(ir, mode="guided")
            if not probe.get("ok"):
                continue
            if require_quality and not _quality_ok(probe):
                continue
            chosen = (ex, ir, (index + offset) % len(examples))
            break
        if chosen is not None:
            break
    if chosen is None:
        raise HTTPException(404, f"book {book!r} has no servable items")
    ex, ir, real_index = chosen

    effective_seed = seed or 0
    if seed:
        variant = vary(ir, seed=seed)
        if variant is not None:
            ir = variant

    rendered = render_question(ir, mode="guided")
    if not rendered.get("ok"):
        raise HTTPException(500, "render failed")

    # Surface rule (ARCHITECTURE.md 18, v2): the website NEVER displays
    # source text from any external corpus -- OpenStax material is an
    # internal mining/eval ground only.  Every student-facing question
    # is author-first rendered from the IR structure.  The verified IR
    # (facts and methods) is retained; the surface is ours.
    question = rendered["question"]
    question_source = "rendered"

    return {
        "book": book,
        "example_id": ex["id"],
        "index": real_index,
        "seed": effective_seed,
        "tier": "VERIFIED",
        "license": data.get("license", "unknown"),
        "question": question,
        "question_source": question_source,
        "target": rendered["target"],
        "givens": rendered["givens"],
        "steps": rendered["steps"],       # final step value is null
        "n_steps": len(rendered["steps"]),
    }


@router.get("/library")
async def library():
    books = []
    for path in sorted(CORPUS_DIR.glob("*.json")):
        if path.name.startswith("_"):
            continue
        data = json.loads(path.read_text())
        if not _shippable(data):
            continue        # DO-NOT-SHIP quarantine: never listed
        n_verified = sum(1 for e in data.get("examples", [])
                         if e.get("anchor_verified"))
        if n_verified == 0:
            continue
        books.append({
            "book": data["book"],
            "n_examples": data.get("n_examples", 0),
            "n_verified": n_verified,
            "license": data.get("license", "unknown"),
            "shippable": data.get("license") == "CC-BY-4.0",
        })
    return {"books": books,
            "total_verified": sum(b["n_verified"] for b in books)}


@router.get("/item")
async def item(
    book: str = Query(...),
    index: int = Query(0, ge=0),
    seed: Optional[int] = Query(None, ge=0, le=10 ** 9),
):
    return _build_item(book, index, seed)


class CheckRequest(BaseModel):
    book: str
    index: int = Field(ge=0)
    seed: int = Field(default=0, ge=0)
    answer: str = Field(..., min_length=1, max_length=100)


def _parse_answer(text: str) -> Optional[float]:
    """Accept 15, 15.0, 60/4, ' 15 cm', '-3/2'."""
    s = text.strip().rstrip(".")
    try:
        return float(Fraction(s))
    except (ValueError, ZeroDivisionError):
        pass
    for tok in s.split():
        try:
            return float(Fraction(tok.rstrip(",;")))
        except (ValueError, ZeroDivisionError):
            continue
    return None


@router.post("/check")
async def check(req: CheckRequest):
    """Rebuild the item server-side (escrow) and grade the attempt."""
    data = _load_book(req.book)
    examples = _verified_examples(data)
    if not examples:
        raise HTTPException(404, "no verified chains")
    ex = examples[req.index % len(examples)]
    ir = ir_from_dict(ex["ir"])
    if req.seed:
        variant = vary(ir, seed=req.seed)
        if variant is not None:
            ir = variant

    expected = ir.final_value()
    if expected is None:
        raise HTTPException(500, "chain not executable")
    got = _parse_answer(req.answer)
    if got is None:
        return {"correct": False, "verdict": "unparseable",
                "expected": None, "steps": None}

    scale = max(1.0, abs(expected))
    correct = abs(got - expected) / scale <= 1e-4
    full = render_question(ir, mode="verified")
    return {
        "correct": correct,
        "verdict": "correct" if correct else "incorrect",
        "expected": expected,
        "student": got,
        "steps": full["steps"],       # revealed only after an attempt
        "target": full["target"],
    }


@router.get("/random")
async def random_item(seed: Optional[int] = Query(None)):
    """Deterministic wander across the whole corpus."""
    rng = random.Random(seed if seed is not None else 42)
    lib = await library()
    if not lib["books"]:
        raise HTTPException(404, "empty corpus")
    book = rng.choice(lib["books"])["book"]
    return _build_item(book, rng.randrange(1000), rng.randrange(10 ** 6))


# --------------------------------------------------------------------------- #
# Competency practice: official CBSE items with ESCROWED official keys.
# The answer letter NEVER ships with the item; check grades against the
# official_answers table.  Tier: VERIFIED-OFFICIAL (ground truth is the
# Board's key, not computation -- labeled as such).
# --------------------------------------------------------------------------- #

import sqlite3

BANK = _REPO_ROOT / "cbse_data" / "question_bank.db"
_OPTION_SPLIT = re.compile(r"\(([a-d])\)\s*")


def _bank_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(str(BANK))
    conn.row_factory = sqlite3.Row
    return conn


def _split_mcq(text: str):
    """'stem (a) x (b) y ...' -> (stem, {a: x, b: y, ...})."""
    parts = _OPTION_SPLIT.split(text)
    if len(parts) < 5:
        return text.strip(), {}
    stem = parts[0].strip()
    options = {}
    for i in range(1, len(parts) - 1, 2):
        options[parts[i]] = parts[i + 1].strip(" .|")
    return stem, options


@router.get("/cfq/items")
async def cfq_items(
    subject: Optional[str] = Query(None),
    with_keys: bool = Query(True, description="only items that have an "
                                              "official escrowed answer"),
    limit: int = Query(20, ge=1, le=100),
):
    conn = _bank_conn()
    sql = ("SELECT d.id AS doc_id, d.filename, d.subject, d.class_label, "
           "q.qno, q.section AS chapter, q.q_type, q.text "
           "FROM questions q JOIN documents d ON d.id = q.doc_id "
           "WHERE d.doc_type IN ('CFQ','PQ')")
    params: list = []
    if subject:
        sql += " AND d.subject = ?"
        params.append(subject)
    if with_keys:
        sql += (" AND EXISTS (SELECT 1 FROM official_answers o WHERE "
                "o.doc_id = d.id AND o.qno = q.qno)")
    sql += " ORDER BY q.qno LIMIT ?"
    params.append(limit)
    rows = conn.execute(sql, params).fetchall()
    conn.close()
    return {"items": [dict(r) for r in rows]}


@router.get("/cfq/item")
async def cfq_item(
    subject: Optional[str] = Query(None),
    index: int = Query(0, ge=0),
):
    """One competency MCQ: stem + options, NO answer (escrow).

    Any keyed item is eligible -- options are detected by inline
    '(a) ... (b) ...' markers regardless of the mined q_type, which
    unlocks books whose layout the miner typed as SHORT."""
    conn = _bank_conn()
    sql = ("SELECT d.id AS doc_id, d.filename, d.subject, d.class_label, "
           "q.qno, q.section AS chapter, q.q_type, q.text "
           "FROM questions q JOIN documents d ON d.id = q.doc_id "
           "WHERE d.doc_type IN ('CFQ','PQ') "
           "AND EXISTS (SELECT 1 FROM official_answers o WHERE "
           "o.doc_id = d.id AND o.qno = q.qno)")
    params: list = []
    if subject:
        sql += " AND d.subject = ?"
        params.append(subject)
    sql += " ORDER BY d.id, q.qno"
    rows = conn.execute(sql, params).fetchall()
    conn.close()
    if not rows:
        raise HTTPException(404, "no competency MCQs with official keys")
    # first row whose stem + options parse cleanly; layouts vary
    for row in rows:
        candidate = dict(row)
        text = (candidate.pop("text", "") or "").replace("\xa0", " ")
        stem, options = _split_mcq(text)
        clean_opts = {k: re.sub(r"\s*\[\d+[.\d]*\s*mark[^]]*\]", "", v)
                      .strip() for k, v in options.items()}
        if len(stem) >= 15 and len(clean_opts) >= 2 and all(
                len(v) <= 400 for v in clean_opts.values()) \
                and not stem.lstrip().startswith("[") \
                and "marks to be given" not in stem.lower() \
                and not stem.lower().startswith("answer"):
            return {"tier_available": "VERIFIED-OFFICIAL",
                    "source": f"CBSE {candidate['filename']} "
                              "(official practice)",
                    "stem": stem.strip(), "options": clean_opts, **candidate}
    raise HTTPException(404, "no parseable MCQ options in selection")


class CfqCheckRequest(BaseModel):
    doc_id: int
    qno: int
    answer: str = Field(..., min_length=1, max_length=4)


@router.post("/cfq/check")
async def cfq_check(req: CfqCheckRequest):
    """Grade against the official key -- escrowed until attempted."""
    conn = _bank_conn()
    row = conn.execute(
        "SELECT letter, answer_text, marks FROM official_answers "
        "WHERE doc_id=? AND qno=?", (req.doc_id, req.qno)).fetchone()
    conn.close()
    if row is None:
        raise HTTPException(404, "no official key for this item")
    got = req.answer.strip().upper().lstrip("(").rstrip(").")
    correct = got == row["letter"]
    return {"tier": "VERIFIED-OFFICIAL", "correct": correct,
            "expected_letter": row["letter"],
            "official_answer_text": row["answer_text"],
            "marks": row["marks"]}


# --------------------------------------------------------------------------- #
# Free-form deterministic solver with truth tiers (the router bridge,
# ARCHITECTURE.md Phase 4).  VERIFIED returns the answer; anything else
# returns method only -- an unverified number is never shipped.
# --------------------------------------------------------------------------- #

class SolveTextRequest(BaseModel):
    text: str = Field(..., min_length=5, max_length=4000)


@router.post("/solve")
async def solve_deterministic(body: SolveTextRequest):
    """The Truth Core entry: every answer comes through
    answer_pipeline.answer() -- classification, lanes, gates, labels,
    audit trail (ARCHITECTURE.md section 4)."""
    from backend.its.solver.answer_pipeline import answer as pipeline_answer

    result = pipeline_answer(body.text)
    verified = result.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS")
    return {
        "tier": result.label,
        "solved": result.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                                   "VERIFIED_OFFICIAL"),
        "stage": result.audit.lane,
        "answer": result.answer if verified else None,
        "numeric": result.numeric if verified else None,
        "steps": result.steps,
        "assumptions": result.audit.assumptions,
        "audit": result.audit.to_dict(),
        "socratic": result.socratic,
        "refusal_reason": result.refusal_reason,
        "elapsed_ms": result.audit.elapsed_ms,
    }

# --------------------------------------------------------------------------- #
# Lane C: student-bound execution.  The student assigns roles to the
# numbers; the executor computes under the same gates as every lane.
# --------------------------------------------------------------------------- #

class BindRequest(BaseModel):
    question: str = Field(default="", max_length=2000)
    target_role: str = Field(..., min_length=2, max_length=40)
    bindings: list = Field(..., min_length=1, max_length=8)


@router.post("/bind")
async def bind(body: BindRequest):
    from backend.its.solver.answer_pipeline import AuditTrail
    from backend.its.solver.binding_executor import execute_binding

    audit = AuditTrail(lane="C")
    result = execute_binding({
        "question": body.question,
        "target_role": body.target_role,
        "bindings": body.bindings,
    }, audit)
    return {
        "tier": result.label,
        "answer": result.answer,
        "numeric": result.numeric,
        "steps": result.steps,
        "assumptions": result.audit.assumptions,
        "refusal_reason": result.refusal_reason,
        "audit": result.audit.to_dict(),
    }


@router.get("/bind/roles")
async def bind_roles():
    """The role menu: every role the binding UI may offer, grouped by
    the computation it participates in."""
    return {"roles": {
        "count": "how many items",
        "unit_price": "price of one item",
        "principal": "the principal amount (P)",
        "rate_percent": "rate per year (%)",
        "time_years": "time in years",
        "part": "the part quantity",
        "whole": "the whole quantity",
        "percent": "the percentage",
        "base": "base of a shape",
        "height": "height of a shape",
        "side": "side of a square",
        "length": "length",
        "breadth": "breadth",
        "radius": "radius of a circle",
        "speed": "speed",
        "time": "time",
        "distance": "distance",
        "first_quantity": "first quantity",
        "second_quantity": "second quantity",
    }, "targets": {
        "total": "total cost/value",
        "percent": "what percent",
        "part": "the part (percent of whole)",
        "base": "the whole (from part and percent)",
        "simple_interest": "simple interest",
        "compound_interest": "compound interest",
        "amount": "final amount (P + CI)",
        "area_triangle": "area of triangle",
        "area_parallelogram": "area of parallelogram",
        "area_square": "area of square",
        "perimeter_square": "perimeter of square",
        "area_rectangle": "area of rectangle",
        "perimeter_rectangle": "perimeter of rectangle",
        "area_circle": "area of circle",
        "circumference": "circumference of circle",
        "distance": "distance travelled",
        "speed": "speed",
        "time": "time taken",
        "difference": "difference between quantities",
        "sum": "sum of quantities",
    }}

# --------------------------------------------------------------------------- #
# Lane C prompts from OpenStax Try-Its (CC-BY books only): question text
# served for student binding; answers are never shipped (escrow).
# --------------------------------------------------------------------------- #

TRYITS_DIR = _REPO_ROOT / "cbse_data" / "openstax_tryits"


@router.get("/binditem")
async def bind_item(seed: int = Query(42)):
    import random as _r
    rng = _r.Random(seed)
    files = sorted(TRYITS_DIR.glob("*.json"))
    files = [f for f in files if not f.name.startswith("_")]
    pool = []
    for f in files:
        data = json.loads(f.read_text())
        if data.get("license") != "CC-BY-4.0":
            continue
        for it in data.get("tryits", []):
            q = it.get("question", "")
            if len(q) > 40 and re.search(r"\d", q):
                pool.append((data["book"], it["id"], q))
    if not pool:
        raise HTTPException(404, "no binding prompts")
    book, tid, question = pool[seed % len(pool)]
    return {"tier_available": "BIND",
            "book": book, "example_id": tid, "question": question,
            "attribution": "OpenStax (CC BY 4.0)"}
