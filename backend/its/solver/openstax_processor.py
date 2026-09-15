"""openstax_processor.py -- batch-promote unverified OpenStax examples.

The IR compiler could not extract a clean computation chain from ~11.5k
mined OpenStax examples (mostly WEB renditions whose math is embedded
in prose).  Many of those still carry real question text, so the
solver pipeline gets a second, independent pass at them:

    1. answer_pipeline.answer(problem)   -- the full lane cascade
    2. VERIFIED / VERIFIED_WITH_ASSUMPTIONS -> promote with the
       computed answer (provenance stamped, nothing fabricated)
    3. GUIDED -> relation_binder.bind_variables over the intent-
       lexicon canonicalization (same route Lane B uses)
    4. still unverified -> left untouched (honest refusal)

Promotion requires TWO independent sources to agree:

    1. the engine computes a VERIFIED result (deterministic chain,
       plausibility gates passed), AND
    2. the book's own worked solution corroborates the value: the
       engine answer matches the final numeric token of the mined
       solution_lines.  WEB/PDF text flattening ("x4 -16x2" for
       x^4-16x^2, "95 9" for 9 5/9) lets the kernel verify numbers
       that answer a garbled reading, so an engine answer that
       CONTRADICTS the book's own solution must never ship.  Examples
       without solution text cannot be corroborated and stay
       unverified (honest refusal).

License stamps and surface_policy are never
touched; examples without surface text (restricted-license books,
structure only) are skipped, not guessed.

Usage:
    python -m backend.its.solver.openstax_processor            # full run
    python -m backend.its.solver.openstax_processor --limit 50 # smoke
    python -m backend.its.solver.openstax_processor --dry-run  # no save
    python -m backend.its.solver.openstax_processor --revalidate
        # re-apply the corroboration gate to existing promotions,
        # demoting any that the book's own solution contradicts
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import traceback
from pathlib import Path
from typing import Any, Dict, List, Optional

from backend.its.solver.answer_pipeline import (
    VERIFIED, VERIFIED_ASSUMED, _FIGURE_REF_RE, answer, AuditTrail)
from backend.its.solver.intent_lexicon import canonicalize
from backend.its.solver.relation_binder import bind_variables

CORPUS_DIR = Path(r"D:\platform\cbse_data\openstax_examples")
DEFAULT_BATCH = 100
# starts with '_' so the corpus scan always skips it
CHECKPOINT = CORPUS_DIR / "_process_checkpoint.jsonl"

# labels that may be promoted (VERIFIED_OFFICIAL needs a Board key and
# cannot arise here; AMBIGUOUS is never promoted)
_VERIFIED_LABELS = (VERIFIED, VERIFIED_ASSUMED)

# Same figure guard answer() applies to its own lanes: a question whose
# data lives in a figure must never be promoted by the binder either.


def _promote(ex: Dict[str, Any], result, source: str) -> None:
    """Flip to verified status, keeping full engine provenance."""
    ex["anchor_verified"] = True
    ex["verification_source"] = source
    ex["engine_label"] = result.label
    ex["engine_answer"] = result.answer
    ex["engine_route"] = list(result.audit.route)
    if result.audit.assumptions:
        ex["engine_assumptions"] = list(result.audit.assumptions)


_PROMOTION_FIELDS = ("verification_source", "engine_label",
                     "engine_answer", "engine_route", "engine_assumptions")


def _demote(ex: Dict[str, Any]) -> None:
    """Undo a promotion completely (back to honest-refusal state)."""
    ex["anchor_verified"] = False
    for field in _PROMOTION_FIELDS:
        ex.pop(field, None)


_DASHES = {0x2212, 0x2010, 0x2011, 0x2012, 0x2013, 0x2014, 0x2015}
_NUM_RE = re.compile(r"-?\d[\d,]*(?:\.\d+)?")


def _nums(text: str) -> List[float]:
    """Every number in text, dash-variants normalized."""
    for ch in _DASHES:
        text = text.replace(chr(ch), "-")
    out = []
    for m in _NUM_RE.finditer(text):
        try:
            out.append(float(m.group(0).replace(",", "")))
        except ValueError:
            continue
    return out


_BLEED_RE = re.compile(
    r"^\s*(?:check\s+your\s+learning|try\s+it)\b", re.I)
# PDF math-extraction artifacts: big-paren glyph fragments, and a
# standalone letter directly followed by space + digits ("x 32",
# "n 12") which is a flattened exponent/subscript, never clean text.
_MANGLE_RE = re.compile(r"[\u239b-\u23a2]|(?:[^a-zA-Z]|^)[a-z]\s+\d{1,3}"
                        r"(?:[^\w]|$)")
# asks whose answer is an EXPRESSION, never a bare number
_SYMBOLIC_ASK_RE = re.compile(
    r"^\s*(?:factor|simplify|add|subtract|multiply|divide|expand|"
    r"combine)\b", re.I)
_PART_MARKER_RE = re.compile(r"[\u2460-\u2473]|\([a-c]\)")
_SOLVE_FOR_RE = re.compile(r"\bfor\s+([a-z])\b")


def _symbolic_ask(problem: str) -> bool:
    """True when the ask demands an expression, not a bare number."""
    m = _SYMBOLIC_ASK_RE.match(problem)
    if m:
        # strip the verb word itself ("Add:" contains letters too)
        body = problem[m.end():]
        body = _PART_MARKER_RE.sub(" ", body)
        if re.search(r"[a-df-z]", body.lower().replace("lcm", "")
                     .replace("gcf", "")):
            return True
    m = _SOLVE_FOR_RE.search(problem)
    if m:
        others = {c for c in re.findall(r"[a-z]", problem.lower())
                  if c != m.group(1)}
        if others:
            return True
    return False


def _corroborated(ex: Dict[str, Any], answer: Any) -> bool:
    """True when the book's own worked solution agrees with the value.

    The gate: some number in the engine answer must match a number in
    the CLOSING lines of the mined solution_lines (1e-3 relative
    tolerance).  Input and intermediate values -- the numbers a
    flattened-math mis-parse latches onto -- sit early in a worked
    solution; the answer sits at the end.  Lines after a
    "Check Your Learning" / "TRY IT" marker belong to the NEXT item
    (miner block bleed) and are cut before the window is taken.

    Additionally, an answer whose EVERY number already appears in the
    problem statement is a input echo, not a computed result
    ("evaluate at n = -5" answered "-5") and is refused even when the
    echo survives the closing-lines check.  A problem carrying
    PDF-extraction mangling (big-paren fragments, flattened
    exponents like "x 32") is refused outright: the kernel verified a
    garbled reading, not the question.  No solution text, or no
    agreement there -> refuse (safe direction; the example simply
    stays unverified).
    """
    problem = ex.get("problem") or ""
    if _MANGLE_RE.search(problem):
        return False                # mangled PDF math: unreadable ask
    if _symbolic_ask(problem) or problem.count("|") >= 4:
        return False                # expression ask / multi-absolute ask
    lines = ex.get("solution_lines") or []
    if not lines:
        return False
    for i, ln in enumerate(lines):
        if _BLEED_RE.match(ln):
            lines = lines[:i]
            break
    if not lines:
        return False
    ans_nums = _nums(str(answer))
    if not ans_nums:
        return False
    prob_nums = _nums(ex.get("problem") or "")
    if ans_nums and all(
            any(abs(a - p) <= 1e-3 * max(1.0, abs(p))
                for p in prob_nums) for a in ans_nums):
        return False                # pure input echo, nothing computed
    window = lines[-6:]
    sol_nums = _nums(" ".join(window))
    if not sol_nums:
        return False
    return any(abs(a - b) <= 1e-3 * max(1.0, abs(b))
               for a in ans_nums for b in sol_nums)


def _try_binder(text: str):
    """GUIDED fallback: relation binder over canonicalized intent.

    Returns a verified PipelineResult or None.  Never fabricates: the
    binder only fires on a complete typed binding with a solved value.
    """
    if _FIGURE_REF_RE.search(text):
        return None
    audit = AuditTrail(lane="B")
    canonical_text, subs = canonicalize(text)
    for original, canonical in subs:
        audit.assumptions.append(
            f"intent: '{original}' read as '{canonical}'")
    result = bind_variables(canonical_text, audit)
    if result is not None and result.label in _VERIFIED_LABELS:
        return result
    return None


def process_book(path: Path, state: Dict[str, int], batch: int,
                 save: bool, limit: Optional[int], done: set) -> bool:
    """One book file in place.  Returns True when the file changed."""
    payload = json.loads(path.read_text(encoding="utf-8"))
    examples: List[Dict[str, Any]] = payload.get("examples", [])
    changed = False
    for ex in examples:
        if limit is not None and state["processed"] >= limit:
            break
        if ex.get("anchor_verified"):
            continue                     # already verified: untouched
        key = f"{path.name}::{ex.get('id')}"
        if key in done:
            state["resumed_skips"] += 1
            continue                     # processed by an earlier run
        problem = ex.get("problem") or ""
        if not problem.strip():
            state["skipped_no_text"] += 1
            if save:
                _checkpoint(CHECKPOINT, key)  # decided: nothing to do
            continue                     # structure only: honest refusal
        done.add(key)
        state["processed"] += 1
        try:
            result = answer(problem)
            if result.label in _VERIFIED_LABELS \
                    and _corroborated(ex, result.answer):
                _promote(ex, result, "answer_pipeline")
                state["newly_verified"] += 1
                changed = True
            elif result.label in _VERIFIED_LABELS:
                # engine verified but the book's own solution ends with
                # a different value: flattened-math mis-parse, refuse
                state["gate_blocked"] += 1
            else:
                bound = _try_binder(problem)
                if bound is not None and _corroborated(ex, bound.answer):
                    _promote(ex, bound, "relation_binder")
                    state["newly_verified_binder"] += 1
                    state["newly_verified"] += 1
                    changed = True
                elif bound is not None:
                    state["gate_blocked"] += 1
        except Exception:
            state["errors"] += 1
            print(f"  !! error on {path.name} example {ex.get('id')}",
                  file=sys.stderr, flush=True)
            traceback.print_exc()
        # checkpoint AFTER the call: a native crash (segfault) before
        # this line means the example is retried next run, never lost
        # silently and never poisoning the run.  (dry-run never checks
        # points, so a later real run still sees those examples)
        if save:
            _checkpoint(CHECKPOINT, key)
        if state["processed"] % batch == 0:
            print(f"  [batch] processed={state['processed']} "
                  f"newly_verified={state['newly_verified']} "
                  f"binder={state['newly_verified_binder']} "
                  f"gate_blocked={state['gate_blocked']} "
                  f"errors={state['errors']} "
                  f"no_text={state['skipped_no_text']} "
                  f"resumed_skips={state['resumed_skips']} "
                  f"elapsed={time.time() - state['t0']:.0f}s",
                  flush=True)
    if changed and save:
        payload["n_anchor_verified"] = sum(
            1 for e in examples if e.get("anchor_verified"))
        # atomic swap: a segfault mid-write must never truncate a book
        tmp = path.with_suffix(".json.tmp")
        tmp.write_text(
            json.dumps(payload, indent=1, ensure_ascii=True),
            encoding="utf-8")
        tmp.replace(path)
    return changed


def _count_verified(files: List[Path]) -> Dict[str, int]:
    """Corpus-wide verified/unverified counts (cheap full scan)."""
    out = {"verified": 0, "unverified": 0, "total": 0}
    for path in files:
        payload = json.loads(path.read_text(encoding="utf-8"))
        for ex in payload.get("examples", []):
            out["total"] += 1
            if ex.get("anchor_verified"):
                out["verified"] += 1
            else:
                out["unverified"] += 1
    return out


def _load_checkpoint(path: Path) -> set:
    """Keys already processed by ANY previous run (crash resume)."""
    if not path.exists():
        return set()
    return {ln.strip() for ln in
            path.read_text(encoding="utf-8").splitlines() if ln.strip()}


def _checkpoint(path: Path, key: str) -> None:
    with path.open("a", encoding="utf-8") as fh:
        fh.write(key + "\n")


def revalidate(files: List[Path], state: Dict[str, int],
               save: bool = True) -> None:
    """Re-apply the corroboration gate to existing promotions.

    Demotes engine promotions that the book's own solution contradicts
    (flattened-PDF-math mis-parses).  Original anchor-IR verifications
    (no verification_source) are never touched.
    """
    for path in files:
        payload = json.loads(path.read_text(encoding="utf-8"))
        examples = payload.get("examples", [])
        changed = False
        for ex in examples:
            if not ex.get("verification_source"):
                continue
            state["processed"] += 1
            if _corroborated(ex, ex.get("engine_answer")):
                state["kept"] += 1
            else:
                _demote(ex)
                state["demoted"] += 1
                changed = True
        if changed and save:
            payload["n_anchor_verified"] = sum(
                1 for e in examples if e.get("anchor_verified"))
            tmp = path.with_suffix(".json.tmp")
            tmp.write_text(
                json.dumps(payload, indent=1, ensure_ascii=True),
                encoding="utf-8")
            tmp.replace(path)
        print(f"[revalidated] {path.name} "
              f"cumulative kept={state['kept']} "
              f"demoted={state['demoted']}", flush=True)


def main() -> None:
    ap = argparse.ArgumentParser(
        description="Promote unverified OpenStax examples via the "
                    "solver pipeline.")
    ap.add_argument("--corpus-dir", type=Path, default=CORPUS_DIR)
    ap.add_argument("--batch-size", type=int, default=DEFAULT_BATCH)
    ap.add_argument("--limit", type=int, default=None,
                    help="stop after N processed examples (smoke run)")
    ap.add_argument("--dry-run", action="store_true",
                    help="process but do not write files back")
    ap.add_argument("--revalidate", action="store_true",
                    help="re-apply the corroboration gate to existing "
                         "promotions and demote contradictions")
    args = ap.parse_args()

    files = sorted(p for p in args.corpus_dir.glob("*.json")
                   if not p.name.startswith("_"))
    if args.revalidate:
        state = {"processed": 0, "kept": 0, "demoted": 0,
                 "t0": time.time()}
        revalidate(files, state, save=not args.dry_run)
        print(json.dumps({
            "revalidated": state["processed"], "kept": state["kept"],
            "demoted": state["demoted"],
            "elapsed_s": round(time.time() - state["t0"], 1),
            "dry_run": args.dry_run}, indent=1), flush=True)
        return

    before = _count_verified(files)
    done = _load_checkpoint(CHECKPOINT)
    state = {"processed": 0, "newly_verified": 0,
             "newly_verified_binder": 0, "errors": 0,
             "skipped_no_text": 0, "gate_blocked": 0,
             "resumed_skips": len(done),
             "t0": time.time()}
    print(f"openstax_processor: {len(files)} book files, "
          f"checkpointed={len(done)}, dry_run={args.dry_run}", flush=True)
    for path in files:
        process_book(path, state, args.batch_size,
                     save=not args.dry_run, limit=args.limit, done=done)
        if args.limit is not None and state["processed"] >= args.limit:
            break
        print(f"[book done] {path.name}", flush=True)

    processed = state["processed"]
    err_rate = (state["errors"] / processed * 100) if processed else 0.0
    after = _count_verified(files)
    report = {
        "examples_total": after["total"],
        "verified_before": before["verified"],
        "verified_after": after["verified"],
        "processed": processed,
        "newly_verified": state["newly_verified"],
        "newly_verified_via_answer_pipeline":
            state["newly_verified"] - state["newly_verified_binder"],
        "newly_verified_via_relation_binder":
            state["newly_verified_binder"],
        "still_unverified": after["unverified"],
        "skipped_no_text": state["skipped_no_text"],
        "gate_blocked": state["gate_blocked"],
        "resumed_skips": state["resumed_skips"],
        "errors": state["errors"],
        "error_rate_pct": round(err_rate, 3),
        "elapsed_s": round(time.time() - state["t0"], 1),
        "dry_run": args.dry_run,
    }
    print(json.dumps(report, indent=1), flush=True)


if __name__ == "__main__":
    main()
