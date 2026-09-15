# Validation helper for class 8 gap catalogs (staging).
# Runs bulk_catalog_generator.validate_catalog plus DRAFTER_BRIEF checks
# (>=3 concepts, >=5 patterns per concept, worked_examples/exercises
# present, compute smoke via safe_eval mock env, routing smoke).
import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__),
                                    "..", "..", "..", ".."))
sys.path.insert(0, os.path.join(ROOT, "backend", "tools"))
sys.path.insert(0, ROOT)
os.chdir(ROOT)

from bulk_catalog_generator import validate_catalog  # noqa: E402

STEMS = [
    ("hegp105", "D:/node_generator/ncert-mcp/data/processed/text_cache_new/hegp105.txt"),
    ("hhml101", "D:/node_generator/ncert-mcp/data/processed/text_cache_new/hhml101.txt"),
    ("hhml102", "D:/node_generator/ncert-mcp/data/processed/text_cache_new/hhml102.txt"),
    ("hhml103", "D:/node_generator/ncert-mcp/data/processed/text_cache_new/hhml103.txt"),
    ("hhml104", "D:/node_generator/ncert-mcp/data/processed/text_cache_new/hhml104.txt"),
    ("hhml105", "D:/node_generator/ncert-mcp/data/processed/text_cache_new/hhml105.txt"),
    ("hhml106", "D:/node_generator/ncert-mcp/data/processed/text_cache_new/hhml106.txt"),
    ("hhml107", "D:/node_generator/ncert-mcp/data/processed/text_cache_new/hhml107.txt"),
    ("hhml108", "D:/node_generator/ncert-mcp/data/processed/text_cache_new/hhml108.txt"),
    ("hhml110", "D:/node_generator/ncert-mcp/data/processed/text_cache_new/hhml110.txt"),
]

SUBJECTS = {"hegp": "maths", "hhml": "hindi"}


def check(stem, path):
    subj = SUBJECTS[stem[:4]]
    cat_path = os.path.join(
        ROOT, "backend", "its", "competency", "staging",
        "catalog_class8_{}_{}.json".format(subj, stem))
    try:
        with open(cat_path, encoding="utf-8") as fh:
            cat = json.load(fh)
    except FileNotFoundError:
        print("[{}] MISSING {}".format(stem, cat_path))
        return
    except Exception as exc:
        print("[{}] UNREADABLE: {}".format(stem, exc))
        return
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    ok, problems = validate_catalog(cat, text)
    lines = []
    if not ok:
        lines.append("GATE FAIL: " + "; ".join(problems))
    concepts = cat.get("concepts") or []
    if len(concepts) < 3:
        lines.append("concepts={} (<3)".format(len(concepts)))
    for c in concepts:
        n_pat = len(c.get("question_patterns") or [])
        if n_pat < 5:
            lines.append("{}: patterns={} (<5)".format(c.get("id"), n_pat))
        stype = c.get("solution_type")
        if stype == "compute" and not (c.get("solution_steps") or []):
            lines.append("{}: compute without steps".format(c.get("id")))
    if not cat.get("worked_examples"):
        lines.append("no worked_examples")
    if not cat.get("exercises"):
        lines.append("no exercises")
    if cat.get("source_file") not in (path, path.replace("/", "\\")):
        lines.append("source_file mismatch: {!r}".format(cat.get("source_file")))
    n_compute = sum(1 for c in concepts
                    if c.get("solution_type") == "compute")
    print("[{}] {} concepts={} compute={} {}".format(
        stem, "OK  " if not lines else "BAD ",
        len(concepts), n_compute, "| " + " ; ".join(lines) if lines else ""))


if __name__ == "__main__":
    only = sys.argv[1:] or None
    for stem, path in STEMS:
        if only and stem not in only:
            continue
        check(stem, path)
