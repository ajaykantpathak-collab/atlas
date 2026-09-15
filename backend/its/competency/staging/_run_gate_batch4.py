"""_run_gate_batch4.py -- gate-validate batch_4 staging catalogs.

Loads batch_4.json, checks each expected catalog file in staging, and runs
bulk_catalog_generator.validate_catalog(cat, chapter_text).  Prints one
line per chapter: stem, ok, concept count, compute count, problems.

Usage: python _run_gate_batch4.py [stem-filter]
"""
import json
import os
import sys

sys.path.insert(0, "D:/platform")
sys.path.insert(0, "D:/platform/backend/tools")

from bulk_catalog_generator import validate_catalog  # noqa: E402

STAGING = os.path.dirname(os.path.abspath(__file__))
BATCH = os.path.join(STAGING, "_batches", "batch_4.json")


def main():
    flt = sys.argv[1] if len(sys.argv) > 1 else ""
    entries = json.load(open(BATCH, encoding="utf-8"))
    n_ok = n_fail = n_missing = 0
    for e in entries:
        stem = e["stem"]
        if flt and flt not in stem:
            continue
        path = os.path.join(
            STAGING, f"catalog_class{e['class']}_{e['subject']}_{stem}.json")
        if not os.path.exists(path):
            print(f"{stem}: MISSING")
            n_missing += 1
            continue
        with open(path, encoding="utf-8") as f:
            cat = json.load(f)
        text = open(e["file"], encoding="utf-8", errors="ignore").read()
        ok, problems = validate_catalog(cat, text)
        n_comp = sum(1 for c in cat.get("concepts", [])
                     if c.get("solution_type") == "compute")
        n_q = min((len(c.get("question_patterns") or [])
                   for c in cat.get("concepts", [])), default=0)
        we_req = sum(2 for c in cat.get("concepts", [])
                     if c.get("solution_type") == "compute")
        n_we = len(cat.get("worked_examples") or [])
        status = "OK" if ok else "FAIL"
        if ok:
            n_ok += 1
        else:
            n_fail += 1
        print(f"{stem}: {status} concepts={len(cat.get('concepts', []))} "
              f"compute={n_comp} min_qp={n_q} we={n_we}/{we_req}")
        for p in problems[:8]:
            print(f"    - {p}")
    print(f"summary: ok={n_ok} fail={n_fail} missing={n_missing}")


if __name__ == "__main__":
    main()
