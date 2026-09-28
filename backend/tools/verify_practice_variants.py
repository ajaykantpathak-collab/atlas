"""verify_practice_variants.py -- independent zero-wrong verification of the
GEN-2 practice-variant batch (mirror of verify_eli5_corpus.py's pattern).

Re-validates EVERY emitted JSONL row against its own node md file using the
generator's mechanical checks (verify_row), plus independent structural
checks the loader and the practice draw path depend on:
  * node coordinates match the canonical index (class/subject/source_file);
  * Hindi exclusion (no hin_*), classes 6-12 only;
  * question_type is one the practice UI maps to a real widget
    (fill_blank/true_false/numeric -- NO options anywhere, so the
    start-response correct_option answer-key path can never trigger);
  * T/F answers exactly True/False; formula answers recompute exactly;
  * within-file normalized-text dedup AND dedup vs live board_questions
    (fresh dump straight from postgres);
  * no raw node ids in question/answer/explanation.

Exit code 0 only when violations == 0.
"""
import importlib.util
import json
import re
import subprocess
import sys
from collections import Counter

spec = importlib.util.spec_from_file_location(
    "gp", r"D:\platform\derive_practice_variants.py")
gp = importlib.util.module_from_spec(spec)
sys.argv = ["verify"]          # neutral argv for the generator module
spec.loader.exec_module(gp)

JSONL = r"D:\platform\_gen2_practice_variants.jsonl"
MD = gp.MD

_ALLOWED_TYPES = {"fill_blank", "true_false", "numeric"}
_ALLOWED_TRANSFORMS = {"fill_definition", "fill_walkthrough",
                       "fill_prereq_concept", "fill_mastery",
                       "tf_true", "tf_false", "formula_calc"}

def load_live_texts():
    out = subprocess.run(
        ["docker", "exec", "dream-postgres", "psql", "-U", "dream_user",
         "-d", "dream_app", "-t", "-A", "-c",
         "SELECT json_agg(question_text) FROM board_questions "
         "WHERE question_text IS NOT NULL;"],
        capture_output=True, text=True, timeout=600)
    return set(gp._norm_text(t) for t in json.loads(out.stdout or "[]"))

def main():
    idx = json.load(open(gp.INDEX, encoding="utf-8"))
    by_id = {n["node_id"]: n for n in idx["nodes"]}
    live = load_live_texts()
    print(f"live board_questions texts for dedup: {len(live)}")

    rows = [json.loads(l) for l in open(JSONL, encoding="utf-8")]
    print(f"rows in batch: {len(rows)}")

    viol = 0
    seen_norm = set()
    per_class = Counter()
    per_subject = Counter()
    per_transform = Counter()
    src_cache = {}
    for r in rows:
        nid = r.get("node_id", "")
        n = by_id.get(nid)
        def fail(msg):
            nonlocal viol
            viol += 1
            if viol <= 15:
                print("  VIOLATION:", nid, msg)
        if n is None:
            fail("node-not-in-index"); continue
        if str(n["subject"]).startswith("hin"):
            fail("hindi-node-present")
        if not (6 <= int(r["class_level"]) <= 12):
            fail("class-out-of-range")
        if int(r["class_level"]) != int(n["class"]) or \
                r["subject"] != n["subject"]:
            fail("class/subject-mismatch-vs-index")
        sf = r.get("source_file", "")
        if not sf.startswith("practice_variants/") or \
                sf.split("/", 1)[1] != n["source_file"]:
            fail("source-file-mismatch")
        if r.get("question_type") not in _ALLOWED_TYPES:
            fail("bad-question-type:" + str(r.get("question_type")))
        if r.get("transform") not in _ALLOWED_TRANSFORMS:
            fail("bad-transform")
        if "options" in r and r["options"]:
            fail("options-present")
        if r.get("marks", 1) != 1:
            fail("marks-not-1")
        if not str(r.get("correct_answer", "")).strip():
            fail("empty-answer")
        if r["question_type"] == "true_false" and \
                r["correct_answer"] not in ("True", "False"):
            fail("tf-answer-shape")
        if r["transform"] == "formula_calc" and \
                r["question_type"] != "numeric":
            fail("formula-type-not-numeric")
        key = gp._norm_text(r["question_text"])
        if key in seen_norm:
            fail("dup-within-batch")
        seen_norm.add(key)
        if key in live:
            fail("dup-vs-live-board-questions")
        md_path = sf.split("/", 1)[1]
        if md_path not in src_cache:
            with open(MD + "\\" + md_path, encoding="utf-8-sig",
                      errors="replace") as fh:
                src_cache[md_path] = fh.read()
        bad = gp.verify_row(r, src_cache[md_path])
        if bad:
            viol += 1
            if viol <= 15:
                print("  VIOLATION:", nid, bad[:3])
            continue
        per_class[r["class_level"]] += 1
        per_subject[r["subject"]] += 1
        per_transform[r["transform"]] += 1

    print("=" * 60)
    print("TOTAL VIOLATIONS:", viol, "(must be 0)")
    print("verified-good per class:",
          dict(sorted(per_class.items())))
    print("verified-good per transform:",
          dict(sorted(per_transform.items())))
    print("verified-good subjects:", len(per_subject))
    return 0 if viol == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
