"""_validate_batch2.py -- gate-check batch_2 staged catalogs.

Usage:
    python -B staging/_validate_batch2.py            # validate all staged batch2 files
    python -B staging/_validate_batch2.py hhml109 hegp101
"""
import json
import sys
from pathlib import Path

ROOT = Path(r"D:\platform")
STAGING = ROOT / "backend" / "its" / "competency" / "staging"
BATCH = STAGING / "_batches" / "batch_2.json"
TEXT_DIR = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache_new")

sys.path.insert(0, str(ROOT / "backend" / "tools"))
sys.path.insert(0, str(ROOT))
from bulk_catalog_generator import validate_catalog  # noqa: E402


# batch says "unknown" for these books; use the real subject so the
# filename and catalog match the router's subject expectations
SUBJECT_FIX = {"hemh": "maths", "iebe": "english"}


def main() -> None:
    entries = {e["stem"]: e for e in
               json.loads(BATCH.read_text(encoding="utf-8"))}
    for stem, e in entries.items():
        if e["subject"] == "unknown":
            e["subject"] = SUBJECT_FIX.get(stem[:4], e["subject"])
    stems = sys.argv[1:] or sorted(entries)
    nok = 0
    for stem in stems:
        e = entries.get(stem)
        if not e:
            print(f"{stem}: NOT IN BATCH")
            continue
        path = (STAGING / ("catalog_class%s_%s_%s.json"
                           % (e["class"], e["subject"], stem)))
        if not path.exists():
            print(f"{stem}: MISSING {path.name}")
            continue
        cat = json.loads(path.read_text(encoding="utf-8"))
        text = Path(e["file"]).read_text(encoding="utf-8", errors="ignore")
        ok, problems = validate_catalog(cat, text)
        # quality floor beyond the gate
        q = []
        for c in cat.get("concepts", []):
            if len(c.get("question_patterns") or []) < 5:
                q.append("%s: <5 question_patterns" % c.get("id"))
            if c.get("solution_type") == "compute":
                n = sum(1 for w in cat.get("worked_examples", [])
                        if w.get("concept") == c["id"])
                if n < 2:
                    q.append("%s: compute concept has %d worked examples"
                             % (c["id"], n))
        ncomp = sum(1 for c in cat.get("concepts", [])
                    if c.get("solution_type") == "compute")
        tag = "OK" if (ok and not q) else "FAIL"
        if ok and not q:
            nok += 1
        print(f"{stem}: {tag} concepts={len(cat.get('concepts', []))} "
              f"compute={ncomp} we={len(cat.get('worked_examples', []))}")
        for p in (problems + q)[:8]:
            print("   -", p)
    print(f"\n{nok}/{len(stems)} passed")


if __name__ == "__main__":
    main()
