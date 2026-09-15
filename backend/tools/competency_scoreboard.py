"""competency_scoreboard.py -- per-class competency scoreboard with
stage-level root-cause diagnosis.

Runs REAL bank questions (mined NCERT book exercises) through the full
answer pipeline.  Guided items are then diagnosed THROUGH the competency
stages individually, so failures cluster by ROOT CAUSE rather than by
question:

    router_gap      no concept above threshold (S1 miss)
    slot_gap        concept routed but slots not extractable (S2 miss)
    executor_gap    slots extracted but catalog executor refused (S4 miss)
    family_gap      bound family refused the reading
    out_of_scope    figure-carried, essay, exploratory -- honest refusals
    covered         verified through any path

Usage:
    PYTHONPATH=/d/platform python -B backend/tools/competency_scoreboard.py \
        --class 7 --subject maths --n 150 [--resume]
"""

from __future__ import annotations

import argparse
import collections
import json
import random
import sqlite3
import sys
from pathlib import Path

DB = Path(r"D:\platform\cbse_data\question_bank.db")
OUT = Path(r"D:\platform\cbse_data\competency_scoreboard.jsonl")
PTR = Path(r"D:\platform\cbse_data\competency_scoreboard.ptr")


def load_pool(cls: str, subject: str) -> list:
    conn = sqlite3.connect(str(DB))
    rows = conn.execute(
        """SELECT q.id, q.text, d.subject, d.class_label FROM questions q
           JOIN documents d ON d.id = q.doc_id
           WHERE d.filename LIKE 'ncert_%' AND d.class_label = ?
             AND d.subject = ? AND length(q.text) BETWEEN 30 AND 500""",
        (cls, subject)).fetchall()
    conn.close()
    # strip embedded answer-key tails by the same rule as the miner
    # (single source of truth in slot_extractor) so every measured text
    # is the question alone -- before/after runs stay comparable
    from backend.its.solver.slot_extractor import strip_answer_tail
    rows = [(rid, strip_answer_tail(text), subject, cls_label)
            for rid, text, subject, cls_label in rows]
    random.Random(20260908).shuffle(rows)
    return rows


def diagnose(text: str) -> str:
    """Root-cause a guided item through the competency stages."""
    from backend.its.solver.competency_engine import route_concept
    hit = route_concept(text)
    if hit is None:
        return "router_gap"
    concept, _ = hit
    import re as _re
    if _re.search(r"figure|shown|diagram|graph|dot plot|picture",
                  text, _re.I):
        return "out_of_scope"
    from backend.its.solver.slot_extractor import extract_slots
    try:
        slots = extract_slots(text, concept)
    except Exception:
        slots = None
    if not slots:
        return "slot_gap"
    from backend.its.solver.catalog_executor import execute_concept
    try:
        res = execute_concept(concept, slots, text)
    except Exception:
        return "executor_error"
    if res is not None and getattr(res, "ok", False):
        return "executor_gap"   # computed here but pipeline refused: wiring
    return "executor_gap"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--class", dest="cls", default="Class_7")
    ap.add_argument("--subject", default="maths")
    ap.add_argument("--n", type=int, default=150)
    ap.add_argument("--resume", action="store_true")
    args = ap.parse_args()

    import logging
    import warnings
    logging.disable(logging.CRITICAL)
    warnings.filterwarnings("ignore")

    from backend.its.solver.answer_pipeline import answer

    pool = load_pool(args.cls, args.subject)
    print(f"pool: {len(pool)} | sampling {args.n}", flush=True)

    done_ids = set()
    if args.resume and OUT.exists():
        for line in OUT.read_text(encoding="utf-8").splitlines():
            try:
                rec = json.loads(line)
                done_ids.add(rec["id"])
            except json.JSONDecodeError:
                continue
        print(f"resume: {len(done_ids)} done", flush=True)

    skip = set()
    if args.resume and PTR.exists():
        try:
            poison = json.loads(PTR.read_text(encoding="utf-8"))
            if poison.get("id"):
                skip.add(poison["id"])
                print(f"skip poison {poison['id']}", flush=True)
        except json.JSONDecodeError:
            pass

    mode = "a" if (args.resume and done_ids) else "w"
    out_f = open(OUT, mode, encoding="utf-8")
    n = 0
    for rid, text, subject, cls_label in pool:
        if n >= args.n:
            break
        if rid in done_ids or rid in skip:
            continue
        PTR.write_text(json.dumps({"id": rid}), encoding="utf-8")
        try:
            r = answer(text)
        except Exception as e:
            out_f.write(json.dumps({"id": rid, "text": text[:200],
                                    "error": str(e)[:80]}) + "\n")
            out_f.flush()
            n += 1
            continue
        PTR.write_text("{}", encoding="utf-8")
        rec = {
            "id": rid, "text": text, "subject": subject,
            "class": cls_label, "label": r.label,
            "answer": r.answer if r.label in
            ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
             "VERIFIED_OFFICIAL") else None,
        }
        if r.label == "GUIDED_PRACTICE":
            rec["root_cause"] = diagnose(text)
        else:
            rec["root_cause"] = "covered"
        out_f.write(json.dumps(rec) + "\n")
        out_f.flush()
        n += 1
        if n % 25 == 0:
            print(f"  {n} done", flush=True)
    out_f.close()
    print("DONE", flush=True)


if __name__ == "__main__":
    main()
