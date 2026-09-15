"""Seed unregistered elective-subject concepts so TutorEngine registers them.

Root cause: catalogs for computer_science (kecs/lecs), psychology (lepy) and
part of sociology (lesy103-107, lesy201-203) carry worked examples in the
problem/steps shape, which TutorEngine._concept_pool never reads, so those
concepts load with an empty pool and are dropped -- and _merge_generated
ignores bank entries for unregistered ids.

Fix (purely additive): for every concept of the 7 elective subjects that has
no concept-level worked_examples yet, copy the FIRST question of that concept
from the wave-2 banks (t2_*.json) into catalog concept["worked_examples"] as
a single {"q", "a"} item.  Nothing else in the catalogs is modified.
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
CAT_DIR = os.path.normpath(os.path.join(HERE, "..", "competency"))
GEN_DIR = os.path.join(HERE, "generated")
SUBJECTS = {"applied_maths", "computer_science", "informatics_practices",
            "biotechnology", "sociology", "psychology", "home_science"}


def main():
    seeds = {}
    for f in sorted(os.listdir(GEN_DIR)):
        if not (f.startswith("t2_") and f.endswith(".json")):
            continue
        bank = json.load(open(os.path.join(GEN_DIR, f), encoding="utf-8"))
        for entry in bank.get("concepts", []):
            cid = str(entry.get("id") or "")
            qs = entry.get("questions") or []
            if cid and qs and cid not in seeds:
                q = str(qs[0].get("q") or "").strip()
                a = str(qs[0].get("a") or "").strip()
                if q and a:
                    seeds[cid] = {"q": q, "a": a}

    touched, seeded, already = [], 0, 0
    for f in sorted(os.listdir(CAT_DIR)):
        if not (f.startswith("catalog_") and f.endswith(".json")):
            continue
        path = os.path.join(CAT_DIR, f)
        try:
            cat = json.load(open(path, encoding="utf-8"))
        except Exception:
            continue
        if str(cat.get("subject") or "").strip().lower() not in SUBJECTS:
            continue
        changed = False
        for c in cat.get("concepts", []):
            cid = str(c.get("id") or "")
            if not cid or c.get("worked_examples"):
                already += 1
                continue
            if cid in seeds:
                c["worked_examples"] = [dict(seeds[cid])]
                seeded += 1
                changed = True
        if changed:
            with open(path, "w", encoding="utf-8") as fh:
                json.dump(cat, fh, ensure_ascii=False, indent=1)
                fh.write("\n")
            touched.append(f)
    print("seeded:", seeded, "| already had worked_examples:", already)
    print("catalog files touched:", len(touched))
    for f in touched:
        print("  ", f)


if __name__ == "__main__":
    main()
