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
import os
import random
import re
import threading
from fractions import Fraction
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile, status
from pydantic import BaseModel, Field

from backend.deps import require_role
from backend.services.solver_gateway import ir_from_dict
from backend.services.solver_gateway import render_question, vary
from backend.services.solver_gateway import validate_ir

_REPO_ROOT = Path(__file__).resolve().parents[2]   # backend/api/.. -> repo root
CORPUS_DIR = _REPO_ROOT / "cbse_data" / "openstax_examples"

_IMAGE_SOLVE_FANOUT = 12

router = APIRouter(prefix="/api/practice/deterministic",
                   tags=["practice-deterministic"])

_cache: Dict[str, dict] = {}

# Warm the solve cascade at import (server boot): loads MiniLM and the
# kernel so the first real student doubt does not pay 10 s cold-start.
def _warm_solver() -> None:
    import time

    time.sleep(2)
    try:
        from backend.services.solver_gateway import solve_text
        solve_text("Solve for x: 2x + 2 = 6")
        # warm the batched-embed path too: its lazy init costs ~30-40s
        # on first use, which would otherwise hit a real student
        from backend.services.solver_gateway import parse_quantities
        from backend.services.solver_gateway import embed_texts
        qs = parse_quantities("A car travels 180 km in 3 hours at constant speed.")
        if qs:
            embed_texts([q.context for q in qs])
        # warm the semantic matcher's own MiniLM singleton (modeling_layer
        # cold path) -- background thread, so even if this takes a minute
        # the event loop and every endpoint stay responsive
        from backend.services.solver_gateway import get_matcher
        get_matcher().match("A car travels 180 km in 3 hours at constant speed.")
    except Exception:
        pass  # warmup is best-effort; the endpoint works regardless


threading.Thread(target=_warm_solver, daemon=True,
                 name="solver-warmup").start()


def _solver_version() -> str:
    """SOLVER_VERSION for honest payload stamping; never breaks a solve."""
    try:
        from backend.services.solver_gateway import SOLVER_VERSION
        return SOLVER_VERSION
    except Exception:
        return "dev"


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
    # REPERTOIRE: when the caller knows the question's source node (a
    # bank question's node_tags, a lesson-page doubt), it rides here and
    # the response carries the node's doodle card + diagram + sim.
    # Optional and additive -- plain doubts solve exactly as before.
    node_id: Optional[str] = Field(default=None, max_length=64)
    # READ-BACK CONFIRM: the student edited the "we read this as" card —
    # edits ride as {role: new_value} plus the echoed `understood` map
    # (it carries the bound slots the roles patch against).  Present =>
    # the question text is corrected and the pipeline re-runs; absent =>
    # the plain solve.  Same semantics as the tutor's Layer-1.4 card.
    corrections: Optional[Dict[str, Any]] = Field(default=None)
    understood: Optional[Dict[str, Any]] = Field(default=None)
    # the student tapped "confirm" on the reading card with no edits —
    # same confidence as a correction: our parse is human-verified, so
    # the deterministic compute may ship its result on these numbers.
    confirmed: Optional[bool] = Field(default=None)


# --------------------------------------------------------------------------- #
# REPERTOIRE -- one shared helper so every solved doubt (typed, photo,
# spoken) carries the node's full teaching repertoire: doodle card +
# labelled diagram + interactive sim.  Index lookups only (never a
# wrong-subject guess); no node link attaches honest nulls.  A
# repertoire failure must never break a solve, so this swallows and
# attaches nulls.
# --------------------------------------------------------------------------- #

def _with_repertoire(payload: dict, node_id: Optional[str] = None,
                     question_text: Optional[str] = None) -> dict:
    """Attach the repertoire object to a solve payload (additive key)."""
    # READ-BACK CARD enrichment: every computable question gets a card —
    # full_text families bind no declared slots so the lane's understood
    # arrives with empty givens; GUIDED/withheld results get no
    # understood at all.  Backfill from the raw text so the card is
    # never an empty shell (e2e dig 2026-10-07).
    if question_text:
        try:
            # boundaries gate: api/ reaches the solver ONLY through the
            # services seam (WS-D 2026-10-10 — was a direct
            # backend.its.solver.readback import).
            from backend.services import solver_gateway as _gw
            _rb = _gw.readback_module
            unused_numbers, extract_givens, ask_hint = (
                _rb.unused_numbers, _rb.extract_givens, _rb.ask_hint)
            soc = payload.get("socratic")
            _u = (soc or {}).get("understood")
            if not isinstance(_u, dict):
                _u = {}
            if not _u.get("givens"):
                gen = extract_givens(question_text)
                if gen:
                    _u["givens"] = gen
            if not _u.get("ask"):
                _u["ask"] = ask_hint(question_text)
            if _u.get("givens"):
                _u["unused"] = unused_numbers(question_text,
                                              _u["givens"])
            if _u:
                soc = dict(soc or {})
                soc["understood"] = _u
                payload["socratic"] = soc
        except Exception:
            pass
    try:
        from backend.services.solver_gateway import attach_repertoire
        payload["repertoire"] = attach_repertoire(payload, node_id=node_id)
    except Exception:
        payload["repertoire"] = {"node_id": None, "doodle": None,
                                 "diagram": None, "sim": None,
                                 "sim_title": None}
    # TEACH-LOOP: an answered doubt is the highest-intent learning
    # signal — attach the resolved node's authored pedagogy
    # (concept -> check -> _comp stretch -> next concept) so the
    # student rolls straight into the loop on ANY outcome, verified
    # or not.  node_id comes from the repertoire resolver (the same
    # binding the doodle/diagram attach uses); failure attaches None.
    # Fallback: when no node id was stamped anywhere, a strict semantic
    # match (embedding similarity) binds free-text doubts to their
    # concept — wrong-node teaching is worse than none, so the floor is
    # high and only the top hit counts.
    try:
        from backend.services.enhanced_nodes import (
            load_index, _semantic_hits)
        rid = (payload.get("repertoire") or {}).get("node_id") or node_id
        if not rid and question_text:
            rid = _doubt_node_for(load_index(), question_text)
        payload["teach_loop"] = (
            load_index().teach_loop_for(rid) if rid else None)
    except Exception:
        payload["teach_loop"] = None
    # GUIDED TEACHING: on any non-verified tier, attach authored teaching
    # from the compq bank (question-specific misconception + the node's
    # worked example + a follow-up diagnostic).  A refusal must never be a
    # dead end — this is what "here is the method instead" actually hands
    # over.  Verified answers carry nothing (nothing to remediate).
    tier = str(payload.get("tier") or payload.get("badge") or "")
    if question_text and not tier.startswith("VERIFIED"):
        try:
            from backend.services.misconception_corrector import correction_for
            guided = correction_for(node_id, question_text)
            payload["guided_teaching"] = guided if any(guided.values()) else None
        except Exception:
            payload["guided_teaching"] = None
    return payload


async def _multipart_composite(question_text: str, whole_tier: str,
                               node_id: Optional[str]) -> Optional[dict]:
    """PART-WISE VERDICTS for multi-part questions the solver refused
    WHOLE (standing gate 2026-09-30: the dominant remaining refusal
    class).  When the whole-question solve did NOT verify and
    part_splitter detects >=2 sub-parts, each part (shared scenario +
    sub-ask) is solved through the SAME verified path -- the identical
    answer_pipeline under the same solve_isolation pool, budget and
    cache -- and the response carries one honest verdict per part:

      {"parts": [{part_id, question, tier, answer (verified parts only),
                  steps, refusal_reason (guided parts)}],
       "overall": "verified" | "partial" | "guided"}

    overall is "verified" only when EVERY part verified on its own
    merits; a part-level answer is never promoted by other parts
    passing.  A verified whole-question solve never reaches this path,
    and single-part questions are untouched (returns None).  Additive:
    the caller attaches this under the "multipart" key only.
    """
    import asyncio as _aio

    from backend.services.solver_gateway import answer as pipeline_answer
    from backend.services.solver_gateway import overall_verdict, split_parts
    from backend.services.solve_isolation import cache_key, run_async

    if str(whole_tier or "").startswith("VERIFIED"):
        return None
    try:
        split = split_parts(question_text)
    except Exception:
        return None
    if split is None or len(split.parts) < 2:
        return None

    async def _solve_part(part):
        pq = split.part_question(part)
        outcome = await run_async(cache_key("verified_practice.solve", pq),
                                  pipeline_answer, pq, node_id or None)
        if outcome.timed_out or outcome.saturated:
            return {
                "part_id": part.part_id, "question": pq,
                "tier": "GUIDED_PRACTICE", "answer": None, "numeric": None,
                "steps": [],
                "refusal_reason": (
                    "this part needed more solver time than allowed; the "
                    "answer stays withheld — a retry usually serves it"),
            }
        r = outcome.result
        answer_ok = r.label.startswith("VERIFIED")
        verified = r.label.startswith("VERIFIED")
        entry = {
            "part_id": part.part_id,
            "question": pq,
            "tier": r.label,
            "answer": r.answer if answer_ok else None,
            "numeric": r.numeric if answer_ok else None,
            "steps": list(r.steps or []),
            # same honest guided quality as the whole-question path: the
            # authored method/model answer the pipeline serves today
            "socratic": r.socratic,
        }
        if not verified:
            # guided parts carry the same honest refusal quality as the
            # whole-question path: reason + authored guided teaching.
            entry["refusal_reason"] = r.refusal_reason
            try:
                from backend.services.misconception_corrector import (
                    correction_for)
                guided = correction_for(node_id, pq)
                if any(guided.values()):
                    entry["guided_teaching"] = guided
            except Exception:
                pass
        return entry

    try:
        parts = await _aio.gather(*[_solve_part(p) for p in split.parts])
    except Exception:
        return None
    overall = overall_verdict([p["tier"] for p in parts])
    return {
        "detected": True,
        "shape": split.shape,
        "scenario": split.scenario or None,
        "overall": overall,
        "solved": overall in ("verified", "partial"),
        "n_parts": len(parts),
        "n_verified": sum(1 for p in parts
                          if str(p["tier"]).startswith("VERIFIED")),
        "parts": parts,
    }


def _isolation_refusal(question_text: str, outcome) -> dict:
    """Honest payload when the isolated solve times out or the pool is
    saturated: unsolved, with the reason named, never a silent empty."""
    reason = ("solver_saturated" if outcome.saturated else "solver_timeout")
    return {
        "tier": "GUIDED_PRACTICE",
        "solved": False,
        "stage": None,
        "answer": None,
        "numeric": None,
        "steps": [],
        "socratic": None,
        "refusal_reason": reason,
        "elapsed_ms": outcome.elapsed_ms,
        "audit": None,
        "text": question_text,
        "repertoire": None,
    }


def _solve_payload(question_text: str,
                   node_id: Optional[str] = None) -> dict:
    """The ONE text->answer->repertoire path shared by /solve-image and
    /solve-voice: pipeline answer, flat fields, repertoire attached."""
    from backend.services.solver_gateway import answer as pipeline_answer

    # WS-MH: thread node_id through so the bank-answer lane inside
    # answer() derives its board/class/subject scope from the corpus node
    # (context_from_node_id) instead of matching unscoped.
    result = pipeline_answer(question_text, node_id=node_id)
    verified = result.label.startswith("VERIFIED")
    payload = {
        "tier": result.label,
        "badge": result.label,
        "answer_tier": getattr(result, "answer_tier", None),
        "trust": getattr(result, "trust", None),
        "method": getattr(result, "method", None),
        "similar": getattr(result, "similar", None),
        "check_endpoint": getattr(result, "check_endpoint", None),
        "gradable": getattr(result, "gradable", None),
        "confidence": getattr(result, "confidence", None),
        "disclaimer": getattr(result, "disclaimer", None),
        "solved": result.label.startswith("VERIFIED"),
        "stage": result.audit.lane,
        "answer": result.answer if verified else None,
        "numeric": result.numeric if verified else None,
        "steps": result.steps,
        "socratic": result.socratic,
        "refusal_reason": result.refusal_reason,
        "elapsed_ms": result.audit.elapsed_ms,
        "audit": result.audit.to_dict(),
    }
    return _with_repertoire(payload, node_id=node_id,
                            question_text=question_text)


_DOUBT_STOP = frozenset((
    "a an the is are was were what which who whom whose how why when where "
    "do does did can could should would will shall may might must of in on "
    "at to for with by from as and or but if then than so such it its this "
    "that these those i we you he she they me us him her them my our your "
    "his their explain define describe tell give state write about between "
    "into over under more most many much very some any all each every both "
    "same other own only also too not no nor just"
).split())


def _doubt_node_for(index, question_text: str) -> Optional[str]:
    """Bind a free-text doubt to its teaching node.

    Ordered strongest-first:
      1. verbatim phrase (3+ content words) in a node title/definition —
         'salt satyagraha' must hit the history node, not the NaCl node
      2. semantic embedding hit >= 0.45
      3. stopword-stripped lexical hit on titles (score >= 20)
    """
    ql = (question_text or "").lower().strip()
    if not ql:
        return None
    words = [w for w in re.findall(r"[a-z0-9₹μ%.'’-]+", ql)
             if w not in _DOUBT_STOP and len(w) > 1]
    if not words:
        return None

    # 1. verbatim phrase: longest n-gram (>=2 content words) appearing in a
    #    node title or definition wins outright. Haystack is built once and
    #    memoised — 23k nodes × title+def is a ~1s one-time cost per process.
    hay = getattr(index, "_doubt_hay", None)
    if hay is None:
        from backend.services.enhanced_nodes import _derive_title
        hay = {nid: ((_derive_title(node) or "") + " "
                     + (node.get("definition") or "")).lower()
               for nid, node in index.nodes.items()}
        index._doubt_hay = hay
    best_phrase: Tuple[int, str] = (0, "")
    for n in range(min(5, len(words)), 1, -1):
        for i in range(len(words) - n + 1):
            gram = " ".join(words[i:i + n])
            if len(gram) < 6:
                continue
            for nid, h in hay.items():
                if gram in h and n > best_phrase[0]:
                    best_phrase = (n, nid)
            if best_phrase[0] >= n:
                break
        if best_phrase[0]:
            break
    if best_phrase[0]:
        return best_phrase[1]

    # 2. semantic
    from backend.services.enhanced_nodes import _semantic_hits
    hits = _semantic_hits(index, ql, 1, threshold=0.45)
    if hits:
        return hits[0]

    # 3. stopword-stripped lexical — only content terms, titles weighted.
    #    Reuse the index's precomputed _hay (title+definition already
    #    lowered once at build) instead of re-lowering 20k nodes per call.
    score_n: Tuple[float, Optional[str]] = (0.0, None)
    hay3 = getattr(index, "_hay", None) or {}
    for nid, node in index.nodes.items():
        h = hay3.get(nid)
        if h is not None:
            title, body = h[1], h[2]
        else:
            title = (node.get("title") or "").lower()
            body = (node.get("definition") or "").lower()
        s = 0.0
        for w in words:
            if w in title:
                s += 15.0
            if w in body:
                s += 3.0
        if s > score_n[0]:
            score_n = (s, nid)
    return score_n[1] if score_n[0] >= 20.0 else None


@router.post("/solve")
async def solve_deterministic(body: SolveTextRequest):
    """The Truth Core entry: every answer comes through
    answer_pipeline.answer() -- classification, lanes, gates, labels,
    audit trail (ARCHITECTURE.md section 4).

    ISOLATION (2026-09-30 wedge fix): this used to call the pipeline
    INLINE on the event loop -- a cold lane (MiniLM/spacy/formula-graph
    lazy loads, unbounded CAS) froze the whole worker for minutes (the
    ~47-min incident). The solve now runs on the dedicated bounded pool
    under a hard budget (SOLVE_BUDGET_S, default 60s). Past the budget
    the endpoint returns honest GUIDED_PRACTICE method content with the
    answer withheld while the compute finishes in the background and is
    cached -- a retry of the same question is served instantly."""
    import asyncio as _aio

    from backend.services.solver_gateway import answer as pipeline_answer
    from backend.services.solve_isolation import (
        GUIDED_METHOD_STEPS, cache_key, default_budget, run_async,
        saturation_refusal_reason, timeout_refusal_reason,
    )

    # READ-BACK CONFIRM: the student edited the "our reading" card —
    # patch their values into the question text and solve THAT.  A patch
    # that lands nowhere refuses honestly instead of silently solving
    # the original question again.
    solve_text = body.text
    # student confirmed/corrected the reading card — mark the solve so
    # the strict gate ships the (parse-verified) deterministic result
    _confirm_tok = None
    if body.confirmed or body.corrections:
        try:
            from backend.services import solver_gateway as _gw
            _confirm_tok = _gw.readback_module.CONFIRMED.set(True)
        except Exception:
            _confirm_tok = None
    if body.corrections:
        try:
            from backend.services import solver_gateway as _gw
            apply_corrections = _gw.readback_module.apply_corrections
            _u = body.understood or {}
            _slots = dict(_u.get("givens") or _u.get("slots") or {})
            _patched = apply_corrections(solve_text, _slots,
                                         body.corrections)
            if _patched:
                solve_text = _patched
            else:
                return _with_repertoire({
"tier": "GUIDED_PRACTICE",
                    "badge": "GUIDED_PRACTICE",
                    "answer_tier": "guided",
                    "trust": {"label": "Let's build it together",
                              "detail": "We could not verify this one — let's build it together"},
                    "method": None, "similar": None,
                    "check_endpoint": None,
                    "solved": False,
                    "stage": "readback",
                    "answer": None, "numeric": None, "steps": [],
                    "socratic": {"understood": _u},
                    "refusal_reason": ("Those numbers don't match "
                                       "anything we read — re-ask the "
                                       "question and we'll try again."),
                    "elapsed_ms": 0.0,
                }, node_id=body.node_id, question_text=solve_text)
        except Exception:
            pass  # patch failure never blocks the plain solve

    key = cache_key("verified_practice.solve", solve_text)
    # Wave 9.8 L3 soft budget: the AWAIT gives up at SOLVE_SOFT_BUDGET_S
    # (default 6s) and serves the best-available Contract A payload; the
    # compute CONTINUES on the isolation pool and lands in the shared
    # caches/answer memo, so the next request is instant.  The 60s hard
    # budget inside the pipeline itself is untouched.
    try:
        soft_s = max(0.5, float(os.environ.get("SOLVE_SOFT_BUDGET_S",
                                               "6")))
    except (TypeError, ValueError):
        soft_s = 6.0
    # the hard budget remains the ceiling — a configured SOLVE_BUDGET_S
    # below the soft default still caps the await
    try:
        soft_s = min(soft_s, default_budget())
    except Exception:
        pass
    try:
        outcome = await run_async(key, pipeline_answer, solve_text,
                                  body.node_id or None, budget_s=soft_s)
    finally:
        if _confirm_tok is not None:
            try:
                CONFIRMED.reset(_confirm_tok)
            except Exception:
                pass

    if outcome.timed_out:
        # soft-budget handoff: best-available tier payload, labelled
        # unverified, upgrading=true — the background solve fills the
        # cache and a retry gets the real result.
        try:
            from backend.services.solver_gateway import (SolverOutcome,
                                                     SolverStatus,
                                                     emit_solver_metrics)
            emit_solver_metrics(SolverOutcome(
                status=SolverStatus.GUIDED_PRACTICE,
                steps=list(GUIDED_METHOD_STEPS),
                route=["solve:soft_budget"], llm_used=False,
                latency_ms=outcome.elapsed_ms,
                refusal_reason=timeout_refusal_reason(soft_s),
            ), lane="verified_practice_solve")
        except Exception:
            pass
        _soft = {}
        try:
            from backend.its.solver.tiered_response import (
                best_available_payload)
            _ctx = None
            try:
                from backend.its.solver.bank_answer import (
                    context_from_node_id)
                _ctx = context_from_node_id(body.node_id)
                # L4: the gradable probe resolves node-level marking
                # points too — keep the id in the probe context
                if body.node_id:
                    _ctx = dict(_ctx or {})
                    _ctx["node_id"] = body.node_id
            except Exception:
                _ctx = None
            # DB + model_problem must never block the event loop, and the
            # exemplar build itself is bounded: past 1.0s the student gets
            # the bare guided payload — still inside ~soft+1s total
            _soft = await _aio.wait_for(
                _aio.to_thread(best_available_payload, solve_text, _ctx),
                timeout=1.0) or {}
        except Exception:
            _soft = {}
        return _with_repertoire({
            "tier": "GUIDED_PRACTICE",
            "badge": "GUIDED_PRACTICE",
            "answer_tier": _soft.get("answer_tier", "guided"),
            "trust": _soft.get("trust"),
            "method": _soft.get("method"),
            "similar": _soft.get("similar"),
            "check_endpoint": _soft.get("check_endpoint"),
            "gradable": _soft.get("gradable"),
            "verified": False,
            "upgrading": True,
            "solved": False,
            "stage": "soft_budget",
            "answer": None,
            "numeric": None,
            "steps": list(GUIDED_METHOD_STEPS),
            "assumptions": [],
            "audit": {"lane": "soft_budget",
                      "route": ["solve:soft_budget"],
                      "gates_passed": [],
                      "readings_considered": 1, "anchor": None,
                      "elapsed_ms": round(outcome.elapsed_ms)},
            "socratic": None,
            "refusal_reason": timeout_refusal_reason(soft_s),
            "elapsed_ms": round(outcome.elapsed_ms),
            "status": "guided_practice",
            "route": ["solve:soft_budget"],
            "solver_version": _solver_version(),
            "llm_used": False,
            "budget_exceeded": True,
            "cached": False,
        }, node_id=body.node_id, question_text=solve_text)

    if outcome.saturated:
        budget_s = float(os.environ.get("SOLVE_BUDGET_S", "60"))
        try:
            budget_s = max(1.0, float(budget_s))
        except (TypeError, ValueError):
            budget_s = 60.0
        reason = saturation_refusal_reason()
        route = ["solve:budget_exceeded" if outcome.timed_out
                 else "solve:pool_saturated"]
        try:
            from backend.services.solver_gateway import (SolverOutcome,
                                                     SolverStatus,
                                                     emit_solver_metrics)
            emit_solver_metrics(SolverOutcome(
                status=SolverStatus.GUIDED_PRACTICE,
                steps=list(GUIDED_METHOD_STEPS),
                route=route, llm_used=False,
                latency_ms=outcome.elapsed_ms,
                refusal_reason=reason,
            ), lane="verified_practice_solve")
        except Exception:
            pass
        # REPERTOIRE: even the honest timeout/busy refusal carries the
        # repertoire shape (all nulls unless a node binding rode in) so
        # every response renders the same card layout.
        return _with_repertoire({
            "tier": "GUIDED_PRACTICE",
            "badge": "GUIDED_PRACTICE",
            "answer_tier": "guided",
            "trust": {"label": "Let's build it together",
                      "detail": "We could not verify this one — let's build it together"},
            "method": None, "similar": None, "check_endpoint": None,
            "solved": False,
            "stage": "timeout" if outcome.timed_out else "busy",
            "answer": None,
            "numeric": None,
            "steps": list(GUIDED_METHOD_STEPS),
            "assumptions": [],
            "audit": {"lane": "timeout" if outcome.timed_out else "busy",
                      "route": route, "gates_passed": [],
                      "readings_considered": 1, "anchor": None,
                      "elapsed_ms": round(outcome.elapsed_ms)},
            "socratic": None,
            "refusal_reason": reason,
            "elapsed_ms": round(outcome.elapsed_ms),
            "status": "guided_practice",
            "route": route,
            "solver_version": _solver_version(),
            "llm_used": False,
            "budget_exceeded": outcome.timed_out,
            "cached": False,
        }, node_id=body.node_id, question_text=solve_text)

    result = outcome.result
    verified = result.label.startswith("VERIFIED")
    # SOLVER CONTRACT: map the truth label onto SolverStatus and publish
    # the audit fields (additive only -- existing keys untouched).
    # `answer`/`numeric` stay withheld on every non-verified tier.
    payload = None
    if outcome.cached:
        # Served from the background-completion cache: skip re-emitting a
        # solver_metrics line for the same solve, keep the response shape.
        payload = {
            # Wave 9.8 Contract A: `tier` is now the student-facing tier
            # (verified/bank_similar/method_only/guided); the truth badge
            # lives on `badge` — stamping never mutates it.
            "tier": result.label,
            "badge": result.label,
            "answer_tier": getattr(result, "answer_tier", None),
            "trust": getattr(result, "trust", None),
            "method": getattr(result, "method", None),
            "similar": getattr(result, "similar", None),
            "check_endpoint": getattr(result, "check_endpoint", None),
            "gradable": getattr(result, "gradable", None),
            "solved": result.label.startswith("VERIFIED"),
            "stage": result.audit.lane,
            "answer": result.answer if verified else None,
            "numeric": result.numeric if verified else None,
            "steps": result.steps,
            "assumptions": result.audit.assumptions,
            "audit": result.audit.to_dict(),
            "socratic": result.socratic,
            "refusal_reason": result.refusal_reason,
            "elapsed_ms": result.audit.elapsed_ms,
            "status": "verified" if verified else "guided_practice",
            "route": ["solve:background_cache"],
            "solver_version": _solver_version(),
            "llm_used": False,
            "cached": True,
        }
        # MULTIPART (additive key): whole solve refused and the question
        # splits into >=2 parts -> per-part verdicts ride alongside.
        try:
            payload["multipart"] = await _multipart_composite(
                solve_text, result.label, node_id=body.node_id)
        except Exception:
            payload["multipart"] = None
        if payload["multipart"] is None:
            payload.pop("multipart", None)
        return _with_repertoire(payload, node_id=body.node_id,
                                question_text=solve_text)
    outcome_contract = None
    try:
        from backend.services.solver_gateway import (outcome_from_pipeline,
                                                 emit_solver_metrics)
        outcome_contract = outcome_from_pipeline(result)
        emit_solver_metrics(outcome_contract, lane="verified_practice_solve")
    except Exception:
        outcome_contract = None
    payload = {
        "tier": result.label,
        "badge": result.label,
        "answer_tier": getattr(result, "answer_tier", None),
        "trust": getattr(result, "trust", None),
        "method": getattr(result, "method", None),
        "similar": getattr(result, "similar", None),
        "check_endpoint": getattr(result, "check_endpoint", None),
            "gradable": getattr(result, "gradable", None),
        "solved": result.label.startswith("VERIFIED"),
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
    if outcome_contract is not None:
        payload["status"] = outcome_contract.status.value
        payload["route"] = outcome_contract.route
        payload["solver_version"] = outcome_contract.solver_version
        payload["llm_used"] = outcome_contract.llm_used
    payload.setdefault("cached", False)
    # MULTIPART (additive key): whole solve refused and the question
    # splits into >=2 parts -> per-part verdicts ride alongside.  A
    # verified whole-question solve never reaches this; single-part
    # questions get no extra key (None is popped).
    try:
        payload["multipart"] = await _multipart_composite(
            solve_text, result.label, node_id=body.node_id)
    except Exception:
        payload["multipart"] = None
    if payload["multipart"] is None:
        payload.pop("multipart", None)
    return _with_repertoire(payload, node_id=body.node_id,
                            question_text=solve_text)


# --------------------------------------------------------------------------- #
# PHOTO-1: image input — vision model transcribes the question (extraction
# only), the SAME deterministic pipeline answers it.  The photo never
# bypasses the truth gates.
# --------------------------------------------------------------------------- #

_OCR_PROMPT = (
    "Transcribe the exam question in this image exactly. Output ONLY the "
    "question text — no commentary, no answer, no formatting. Preserve "
    "numbers, units, and mathematical notation (write x^2, sqrt(3), "
    "fractions as a/b). If the image contains no readable question, "
    "output exactly: UNREADABLE")


def _clean_llm_text(text: str) -> str:
    """Strip thinking/reasoning blocks (gemma <thought>, qwen <think>)
    so the pipeline never sees reasoning noise as input."""
    text = re.sub(r"<(thought|think|reasoning)>.*?</\1>",
                  "", text, flags=re.S | re.I)
    text = re.sub(r"</?(thought|think|reasoning)>", "", text, flags=re.I)
    return text.strip()


async def _extract_question_from_image(image_bytes: bytes,
                                       media_type: str) -> Optional[str]:
    """Vision-LLM OCR — extraction only, never answering."""
    import base64
    from backend.services.llm_client import get_llm_client
    b64 = base64.b64encode(image_bytes).decode()
    client = get_llm_client()
    text = await client.chat(
        [{"role": "user", "content": [
            {"type": "text", "text": _OCR_PROMPT},
            {"type": "image_url",
             "image_url": {"url": f"data:{media_type};base64,{b64}"}}]}],
        temperature=0.0, max_tokens=800, use_cache=False,
        model=os.environ.get("VISION_MODEL", "gemma-4-26b-a4b-it"))
    text = _clean_llm_text(text or "")
    if not text or "UNREADABLE" in text or "[LLM error" in text \
            or text.lower().startswith(("sorry", "i can't", "error")):
        return None
    return text[:4000]


@router.post("/solve-image")
async def solve_image(file: UploadFile = File(...)):
    """Photo of a question -> transcribe -> same solve pipeline."""
    if file is None:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "image file required")
    media = (file.content_type or "image/jpeg")
    if not media.startswith("image/"):
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "expected an image file")
    image_bytes = await file.read()
    if len(image_bytes) > 8 * 1024 * 1024:
        raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                            "image too large (8MB max)")
    try:
        text = await _extract_question_from_image(image_bytes, media)
    except Exception:
        text = None
    if not text:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "couldn't read the question from that photo — "
                            "try a clearer shot")
    from backend.services.solver_gateway import split_questions
    import asyncio
    from backend.services.solve_isolation import cache_key, run_async

    def _solve_one(question_text: str):
        # The shared pipeline+repertoire path: same payload every
        # doubt surface gets, repertoire attached (nulls when the
        # transcription carries no node link).
        payload = _solve_payload(question_text)
        payload["text"] = question_text
        return payload

    async def _solve_one_isolated(question_text: str):
        outcome = await run_async(
            cache_key("verified_practice.solve_image", question_text),
            _solve_one, question_text)
        if outcome.timed_out or outcome.saturated:
            return _isolation_refusal(question_text, outcome)
        return outcome.result

    segments = split_questions(text)
    if len(segments) <= 1:
        result = await _solve_one_isolated(text)
        result["extracted_text"] = text
        return result
    # A textbook exercise photo: solve each question SEPARATELY.  Merged
    # single-prompt solving produced confidently wrong composite answers,
    # so each segment gets its own verdict — and the flat fields mirror
    # the first question so existing clients keep rendering correctly.
    segments = segments[:_IMAGE_SOLVE_FANOUT]
    questions = await asyncio.gather(*[
        _solve_one_isolated(seg) for seg in segments])
    # Flat fields mirror the FIRST question (existing clients keep
    # rendering); the first question's repertoire mirrors with them.
    return {
        "count": len(questions),
        "questions": questions,
        "multi_question": True,
        "extracted_text": text,
        "tier": questions[0]["tier"],
        "solved": questions[0]["solved"],
        "stage": questions[0]["stage"],
        "answer": questions[0]["answer"],
        "numeric": questions[0]["numeric"],
        "steps": questions[0]["steps"],
        "socratic": questions[0]["socratic"],
        "refusal_reason": questions[0]["refusal_reason"],
        "repertoire": questions[0]["repertoire"],
        "elapsed_ms": sum(q["elapsed_ms"] or 0 for q in questions),
    }


# --------------------------------------------------------------------------- #
# PAGE-SOLVE (W1): the whole-page twin of /solve-image.  One photo of a
# full textbook exercise -> every question gets its own verdict AND its
# own on-page box (normalized [x0, y0, x1, y1], one per question block),
# so the page "solves itself" in place.  Extraction + segmentation +
# solving live in its/solver/page_solve.py (imported here); each
# question rides solve_isolation.run_async — the same pool, budget and
# cache lane as /solve.  Honesty: answers only on verified tiers, an
# explicit truncation note past 12 questions, box_source labels every
# non-vision box as an estimate.
# --------------------------------------------------------------------------- #

@router.post("/solve-page")
async def solve_page_route(file: UploadFile = File(...)):
    """Photo of a full exercise page -> per-question boxes + verdicts."""
    if file is None:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "image file required")
    media = (file.content_type or "image/jpeg")
    if not media.startswith("image/"):
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "expected an image file")
    try:
        image_bytes = await file.read()
    except Exception:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "couldn't read that upload — try the photo again")
    if len(image_bytes) > 8 * 1024 * 1024:
        raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                            "image too large (8MB max)")
    from backend.services.solver_gateway import page_solve
    try:
        result = await page_solve.solve_page(image_bytes, media)
    except Exception:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "couldn't read the questions on that page — "
                            "try a clearer shot")
    if not isinstance(result, dict) or not result.get("questions"):
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "couldn't read a question on that page — "
                            "try a clearer shot")
    return result


async def _extract_steps_from_image(image_bytes: bytes,
                                    media_type: str) -> Optional[str]:
    """Transcribe handwritten/printed working as numbered steps."""
    import base64
    from backend.services.llm_client import get_llm_client
    b64 = base64.b64encode(image_bytes).decode()
    client = get_llm_client()
    text = await client.chat(
        [{"role": "user", "content": [
            {"type": "text", "text":
             "This is a student's handwritten/printed math or science "
             "working. Transcribe it faithfully as numbered steps: "
             "'Step 1: ... Step 2: ...' Preserve every number, unit and "
             "symbol exactly. Include the question line if visible at the "
             "top. If illegible, output 'UNREADABLE'."},
            {"type": "image_url",
             "image_url": {"url": f"data:{media_type};base64,{b64}"}}]}],
        temperature=0.0, max_tokens=1200, use_cache=False,
        model=os.environ.get("VISION_MODEL", "gemma-4-26b-a4b-it"))
    text = _clean_llm_text(text or "")
    if not text or "UNREADABLE" in text or "[LLM error" in text \
            or text.lower().startswith(("sorry", "i can't", "error")):
        return None
    return text[:4000]


@router.post("/grade-work")
async def grade_work(file: UploadFile = File(...)):
    """Step-level grading: photo of handwritten working -> transcribe steps
    -> check each step against the canonical compute chain. Returns
    per-step verdicts so students see WHERE it broke — mirrors CBSE
    step marking."""
    if file is None:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "image file required")
    media = (file.content_type or "image/jpeg")
    if not media.startswith("image/"):
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "expected an image file")
    image_bytes = await file.read()
    if len(image_bytes) > 8 * 1024 * 1024:
        raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                            "image too large (8MB max)")
    try:
        transcript = await _extract_steps_from_image(image_bytes, media)
    except Exception:
        transcript = None
    if not transcript:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "couldn't read the working from that photo — "
                            "try a clearer shot")

    # split into question (pre-first-step) + numbered steps
    parts = re.split(r"(?i)\bstep\s*\d+\s*[:.\-]", transcript)
    question = parts[0].strip() if len(parts) > 1 else transcript.strip()
    steps = [s.strip() for s in parts[1:] if s.strip()] \
        if len(parts) > 1 else []

    # canonical path: run the question through the same pipeline
    from backend.services.solver_gateway import answer as pipeline_answer
    from backend.services.solve_isolation import cache_key, run_async
    outcome = await run_async(
        cache_key("verified_practice.grade_work", question or transcript),
        pipeline_answer, question or transcript)
    if outcome.timed_out or outcome.saturated:
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE,
                            "the solver is busy — try the working again")
    result = outcome.result
    canonical_steps = result.steps or []

    # rubric-match each student step against canonical steps
    step_verdicts = []
    if steps and canonical_steps:
        from backend.services.enhanced_nodes import (
            _mp_terms, _point_covered, _grade_model)
        model = _grade_model()
        for i, st in enumerate(steps):
            st_terms = _mp_terms(st)
            best, best_sc = None, 0.0
            for cs in canonical_steps:
                _, sc = _point_covered(str(cs), st_terms, [st], model)
                if sc > best_sc:
                    best, best_sc = str(cs), sc
            step_verdicts.append({
                "step": i + 1,
                "text": st,
                "matches_canonical": best if best_sc >= 0.35 else None,
                "score": round(best_sc, 3),
                "ok": best_sc >= 0.35,
            })
    n_ok = sum(1 for s in step_verdicts if s["ok"])

    # W2 Mistake Detector: the FIRST divergent step is where the working
    # broke.  After it, the canonical continuation is revealed step-by-step
    # so the student sees exactly what should have followed — the "caught
    # my error at step 2" moment.  Honest None when everything matches or
    # the solver could not produce a canonical path.
    first_wrong = next((s for s in step_verdicts if not s["ok"]), None)
    first_wrong_detail = None
    if first_wrong is not None and result.label.startswith("VERIFIED"):
        idx = first_wrong["step"] - 1
        first_wrong_detail = {
            "step_number": first_wrong["step"],
            "your_step": first_wrong["text"][:300],
            "canonical_step": first_wrong["matches_canonical"]
            or (canonical_steps[idx] if idx < len(canonical_steps) else None),
            "note": "your working diverges from the correct method here — "
                    "everything before this step was fine",
        }

    return {
        "tier": "STEP_FEEDBACK",
        "question": question,
        "transcript": transcript,
        "steps": step_verdicts,
        "steps_ok": n_ok,
        "steps_total": len(step_verdicts),
        "first_wrong_step": first_wrong_detail,
        "solve_tier": result.label,
        "canonical_answer": result.answer
        if result.label.startswith("VERIFIED") else None,
        "canonical_steps": canonical_steps,
        "verdict": ("correct" if step_verdicts and n_ok == len(step_verdicts)
                    else "partial" if n_ok else "incorrect"),
    }


@router.post("/solve-voice")
async def solve_voice(file: UploadFile = File(...)):
    """Voice doubt -> transcription -> same deterministic pipeline.
    Spoken questions (esp. Hindi/Hinglish) reach the solver without
    typing — the audio is transcribed, never answered by the LLM."""
    if file is None:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "audio file required")
    media = (file.content_type or "audio/webm").split(";")[0]
    audio = await file.read()
    if len(audio) > 20 * 1024 * 1024:
        raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                            "audio too large (20MB max)")
    import base64
    from backend.services.llm_client import get_llm_client
    b64 = base64.b64encode(audio).decode()
    client = get_llm_client()
    text = await client.chat(
        [{"role": "user", "content": [
            {"type": "text", "text":
             "Transcribe this student's spoken question verbatim. "
             "Preserve numbers, units and symbols exactly. Output only "
             "the question text — no commentary. If unintelligible, "
             "output 'UNINTELLIGIBLE'."},
            {"type": "input_audio",
             "input_audio": {"data": b64,
                             "format": media.split("/")[-1]}}]}],
        temperature=0.0, max_tokens=400, use_cache=False,
        model=os.environ.get("AUDIO_MODEL", "gemini-flash-latest"))
    text = _clean_llm_text(text or "")
    if not text or "UNINTELLIGIBLE" in text or "[LLM error" in text:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "could not transcribe the audio")
    from backend.services.solve_isolation import cache_key, run_async
    # REPERTOIRE: the transcript goes through the SAME
    # pipeline+repertoire helper as every other doubt surface, so a
    # spoken question gets the identical verified answer plus the
    # node's doodle card, diagram and sim.
    outcome = await run_async(
        cache_key("verified_practice.solve_voice", text),
        _solve_payload, text)
    if outcome.timed_out or outcome.saturated:
        payload = _isolation_refusal(text, outcome)
    else:
        payload = outcome.result
    payload["transcribed_text"] = text      # kept: existing clients read it
    return payload


@router.get("/queue")
async def answer_queue(
    limit: int = Query(100, ge=1, le=1000),
    user=Depends(require_role("teacher")),
):
    """Unanswered-question review queue (QUEUE-1): every solve request that
    returned no verified/authored answer, newest first.  The offline
    promotion path reads this to grow coverage where students actually ask.

    Staff-only: entries carry the first 500 chars of every student's
    unsolved submission — children's data must not be publicly listable
    (DPDP). The offline promotion pipeline reads the jsonl directly, so
    gating HTTP access does not affect it."""
    from backend.services.solver_gateway import _queue_path
    path = _queue_path()
    try:
        with open(path, encoding="utf-8") as fh:
            lines = fh.readlines()
    except OSError:
        return {"items": [], "total": 0}
    items = [json.loads(l) for l in lines[-limit:] if l.strip()]
    items.reverse()
    return {"items": items, "total": len(lines)}


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
    from backend.services.solver_gateway import AuditTrail
    from backend.services.solver_gateway import execute_binding
    from backend.services.solve_isolation import (
        GUIDED_METHOD_STEPS, cache_key, default_budget, run_async,
        saturation_refusal_reason, timeout_refusal_reason,
    )

    # ISOLATION (wedge fix): Lane C execution is solver compute too — run
    # it on the dedicated bounded pool; past the budget answer with the
    # honest guided payload while the work finishes in the background.
    def _execute() -> Any:
        audit = AuditTrail(lane="C")
        return execute_binding({
            "question": body.question,
            "target_role": body.target_role,
            "bindings": body.bindings,
        }, audit)

    key = cache_key("verified_practice.bind",
                    f"{body.question}|{body.target_role}|"
                    f"{sorted(map(str, body.bindings))}")
    iso = await run_async(key, _execute)

    if iso.timed_out or iso.saturated:
        budget_s = float(os.environ.get("SOLVE_BUDGET_S", "60"))
        reason = (timeout_refusal_reason(budget_s) if iso.timed_out
                  else saturation_refusal_reason())
        return {
            "tier": "GUIDED_PRACTICE",
            "badge": "GUIDED_PRACTICE",
            "answer_tier": "guided",
            "trust": {"label": "Let's build it together",
                      "detail": "We could not verify this one — let's build it together"},
            "method": None, "similar": None, "check_endpoint": None,
            "answer": None,
            "numeric": None,
            "steps": list(GUIDED_METHOD_STEPS),
            "assumptions": [],
            "refusal_reason": reason,
            "audit": {"lane": "C", "route": ["bind:budget_exceeded"
                      if iso.timed_out else "bind:pool_saturated"],
                      "gates_passed": [], "readings_considered": 1,
                      "anchor": None,
                      "elapsed_ms": round(iso.elapsed_ms)},
            "budget_exceeded": iso.timed_out,
            "cached": False,
        }

    result = iso.result
    return {
        "tier": result.label,
        "badge": result.label,
        "answer_tier": getattr(result, "answer_tier", None),
        "trust": getattr(result, "trust", None),
        "method": getattr(result, "method", None),
        "similar": getattr(result, "similar", None),
        "check_endpoint": getattr(result, "check_endpoint", None),
            "gradable": getattr(result, "gradable", None),
        "answer": result.answer,
        "numeric": result.numeric,
        "steps": result.steps,
        "assumptions": result.audit.assumptions,
        "refusal_reason": result.refusal_reason,
        "audit": result.audit.to_dict(),
        "cached": iso.cached,
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
