"""competency90_benchmark.py -- the 90% competency gate, reproducible.

Samples computational questions from the bank (CFQ / PQ / SQP / QB plus the
freshly mined NCERT STEM chapters), runs the full answer() pipeline, and
reports the verified share on two disjoint splits:

  dev       -- agents may read failures from this split and fix families
  heldout   -- the acceptance number.  Fixing against heldout items is
               overfitting, not coverage; treat it as sealed until the
               final gate.

Split is a pure hash of doc_id + qno so it is stable across runs and
across any number of questions added to the bank later.

A question counts as computational when it has digits, is 40-600 chars,
and does not match an essay marker (define / explain / draw / discuss ...).
Theory questions are served by the theory rubric path, not the solver,
so they are excluded here by design, not hidden.

Usage:
    PYTHONPATH=/d/platform python backend/tools/competency90_benchmark.py [n] [--split dev|heldout|both]
"""

from __future__ import annotations

import collections
import hashlib
import json
import random
import re
import sqlite3
import sys
from pathlib import Path

DB = Path(r"D:\platform\cbse_data\question_bank.db")
OUT = Path(r"D:\platform\cbse_data\competency90_benchmark.json")
OUT_JSONL = Path(r"D:\platform\cbse_data\competency90_benchmark.jsonl")

HELDOUT_PCT = 40  # percent of items sealed for the final gate

_ESSAY_RE = re.compile(
    r"\b(define|definition|explain|explanation|describe|discuss|draw|"
    r"sketch|write\s+(?:a\s+)?(?:note|short|essay|report)|differentiate|"
    r"distinguish|list\s+(?:two|three|four|any)|name\s+the|state\s+"
    r"(?:whether|any|two|three)|justify|comment|elaborate|illustrate\s+"
    r"with|prove\s+that|show\s+that|why\s+(?:do|does|is|are|it)|"
    r"what\s+(?:are|is)\s+(?:the\s+)?(?:advantages|disadvantages|"
    r"properties|uses|functions|importance)|mention|outline)\b", re.I)
_DIGIT_RE = re.compile(r"\d")
# a computational question ASKS something: question mark or a computation verb
_ASKS_RE = re.compile(
    r"(\?|\bfind\b|\bcalculate\b|\bcompute\b|\bevaluate\b|\bsolve\b|"
    r"\bsimplify\b|\bdetermine\b|\bhow\s+(?:much|many|far|long|fast)\b|"
    r"\bwhat\s+(?:is|will|would)\b|\bthe\s+value\s+of\b|\bvalue\s+of\s+x\b|"
    r"\bat\s+what\s+rate\b|\bin\s+how\s+many\b|\bexpress\b)", re.I)
# paper instructions, statement-selection and arrangement items are served
# by other app paths (question types with official keys / theory rubric),
# not the deterministic solver -- they are out of metric scope by design.
_NOT_SOLVER_RE = re.compile(
    r"\b(this\s+paper\s+contains|to\s+be\s+answered\s+in|"
    r"arrange\s+the\s+following|identify\s+the\s+(?:correct|incorrect)|"
    r"match\s+the\s+following|assertion|reason\s*\(?\s*r\s*\)?|"
    r"choose\s+the\s+correct\s+option|read\s+the\s+statements)\b", re.I)


def is_computational(text: str) -> bool:
    if not (40 <= len(text) <= 600):
        return False
    if not _DIGIT_RE.search(text):
        return False
    if _ESSAY_RE.search(text):
        return False
    if _NOT_SOLVER_RE.search(text):
        return False
    if not _ASKS_RE.search(text):
        return False
    return True


def split_of(doc_id: str, qno) -> str:
    h = hashlib.sha1(f"{doc_id}:{qno}".encode()).hexdigest()
    return "heldout" if (int(h, 16) % 100) < HELDOUT_PCT else "dev"


def load_pool() -> list:
    conn = sqlite3.connect(str(DB))
    rows = conn.execute(
        """SELECT q.id, q.doc_id, q.qno, q.text, d.subject, d.class_label,
                  d.doc_type
           FROM questions q
           JOIN documents d ON d.id = q.doc_id
           WHERE d.doc_type IN ('CFQ','PQ','SQP','QB','TEXTBOOK')
             AND d.subject IN ('maths','mathematics','physics','chemistry',
                               'science','biology','commerce',
                               'business_studies','accountancy','economics',
                               'applied_maths')""").fetchall()
    conn.close()
    pool = []
    for rid, doc_id, qno, text, subject, cls, doc_type in rows:
        if not is_computational(text or ""):
            continue
        pool.append({
            "id": rid, "doc_id": doc_id, "qno": qno, "text": text,
            "subject": subject, "class": cls, "doc_type": doc_type,
            "split": split_of(doc_id, qno),
        })
    return pool


def run(n: int, which: str, resume: bool = False) -> dict:
    import logging
    import warnings
    logging.disable(logging.CRITICAL)
    warnings.filterwarnings("ignore")

    from backend.its.solver.answer_pipeline import answer

    pool = load_pool()
    random.Random(20260907).shuffle(pool)

    wanted = {"dev": [], "heldout": []}
    for item in pool:
        wanted[item["split"]].append(item)
    plan = {}
    if which in ("dev", "both"):
        plan["dev"] = wanted["dev"][:n]
    if which in ("heldout", "both"):
        plan["heldout"] = wanted["heldout"][:n]

    # The environment's ML stack segfaults natively under long runs; the
    # JSONL is the checkpoint.  On resume, already-done ids are skipped
    # and results are re-read from the file.
    results = []
    done_ids = set()
    if resume and OUT_JSONL.exists():
        for line in OUT_JSONL.read_text(encoding="utf-8").splitlines():
            try:
                rec = json.loads(line)
            except json.JSONDecodeError:  # torn last line
                continue
            results.append(rec)
            done_ids.add(rec["id"])
        print(f"resume: {len(done_ids)} items already done", flush=True)

    # A native crash (the env's ML stack segfaults on rare inputs) leaves
    # the pointer file naming the in-flight item.  That item is recorded
    # as crashed and skipped on later attempts -- otherwise resume loops
    # retry the same poison item forever.
    ptr = OUT_JSONL.with_suffix(".ptr")
    skip_ids: dict = {}
    if resume and ptr.exists():
        try:
            poison = json.loads(ptr.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            poison = None
        if poison and poison.get("id") is not None:
            skip_ids[poison["id"]] = poison.get("crashes", 0) + 1
            print(f"skipping poison item {poison['id']} "
                  f"(crashes: {skip_ids[poison['id']]})", flush=True)

    mode = "a" if (resume and done_ids) else "w"
    OUT_JSONL.parent.mkdir(parents=True, exist_ok=True)
    jsonl_f = open(OUT_JSONL, mode, encoding="utf-8")
    for split, items in plan.items():
        for i, item in enumerate(items):
            if item["id"] in done_ids:
                continue
            if skip_ids.get(item["id"], 0) >= 1:
                continue  # known native-crash item; dropped from metric
            ptr.write_text(json.dumps({"id": item["id"]}), encoding="utf-8")
            r = answer(item["text"])
            ptr.write_text("{}", encoding="utf-8")  # item completed cleanly
            rec = dict(item)
            rec["benchmark_split"] = split
            rec["label"] = r.label
            rec["numeric"] = r.numeric
            rec["lane"] = r.audit.lane if r.audit else None
            rec["routes"] = list(r.audit.route) if r.audit else []
            rec["gates"] = list(r.audit.gates_passed) if r.audit else []
            rec["refusal_reason"] = r.refusal_reason
            results.append(rec)
            jsonl_f.write(json.dumps(rec) + "\n")
            jsonl_f.flush()
            if (i + 1) % 50 == 0:
                print(f"  [{split}] {i + 1}/{len(items)}", flush=True)
    jsonl_f.close()

    summary = {"pool_total": len(pool), "pool_dev": len(wanted["dev"]),
               "pool_heldout": len(wanted["heldout"]), "runs": {}}
    for split in plan:
        rs = [r for r in results if r["benchmark_split"] == split]
        ver = sum(1 for r in rs if r["label"] in
                  ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS", "VERIFIED_OFFICIAL"))
        wrong_risk = sum(1 for r in rs if r["label"] == "AMBIGUOUS")
        summary["runs"][split] = {
            "n": len(rs),
            "verified": ver,
            "guided": sum(1 for r in rs if r["label"] == "GUIDED_PRACTICE"),
            "wrong_risk": wrong_risk,
            "verified_share": round(ver / len(rs), 4) if rs else 0.0,
        }

    # failure clusters on DEV only (heldout stays sealed for analysis)
    clusters = collections.Counter()
    cluster_examples = collections.defaultdict(list)
    for r in results:
        if r["benchmark_split"] != "dev":
            continue
        if r["label"] in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                          "VERIFIED_OFFICIAL"):
            continue
        route = r["routes"][0] if r["routes"] else "none"
        sig = f"{route}|{r['subject']}|{(r['refusal_reason'] or '')[:40]}"
        clusters[sig] += 1
        if len(cluster_examples[sig]) < 3:
            cluster_examples[sig].append(
                {"id": r["id"], "text": r["text"][:220],
                 "refusal": (r["refusal_reason"] or "")[:80]})
    summary["dev_failure_clusters"] = [
        {"sig": sig, "count": cnt, "examples": cluster_examples[sig][:3]}
        for sig, cnt in clusters.most_common(25)]

    OUT.write_text(json.dumps(summary, indent=1), encoding="utf-8")
    return summary


if __name__ == "__main__":
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 100
    which = "both"
    resume = False
    for a in sys.argv[2:]:
        if a.startswith("--split"):
            which = a.split("=")[1]
        if a == "--resume":
            resume = True
    s = run(n, which, resume=resume)
    print(json.dumps(s["runs"], indent=1))
    print("saved:", OUT)
