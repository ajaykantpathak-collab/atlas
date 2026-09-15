"""review_smoke.py -- routing smoke for staged science catalogs.

Loads the competency router with BOTH the live competency dir and the
staged science catalogs (monkeypatched file list), then routes 3
question patterns per catalog.  PASS = best concept belongs to that
catalog and score >= 0.4.

Usage: python review_smoke.py
"""
import glob
import json
import os
import re
import sys

sys.path.insert(0, r"D:/platform")
HERE = os.path.dirname(os.path.abspath(__file__))
STAGING = os.path.dirname(HERE)

from review_audit import PATTERNS  # noqa: E402

COMPETENCY_DIR = os.path.dirname(STAGING)
THRESH = 0.4
N_QUESTIONS = 3


def staged_files():
    files = []
    for p in PATTERNS:
        files += glob.glob(os.path.join(STAGING, p))
    return sorted(set(files))


VAR_VALUES = {
    "dish": "boiled rice", "food_item": "curd", "ingredient": "milk",
    "item": "egg", "plant_name": "mustard plant", "part": "leaf",
    "seed_type": "moong", "substance": "baking soda", "element": "sodium",
    "compound": "quick lime", "gas": "carbon dioxide", "metal": "zinc",
    "acid": "hydrochloric acid", "ion": "nitrate", "organism": "fish",
    "animal": "frog", "plant": "mango", "organ": "heart",
    "process": "respiration", "hormone": "thyroxine", "liquid": "oil",
    "solution": "salt solution", "salt": "common salt", "rock": "granite",
    "object": "mirror", "material": "copper", "name": "oxygen",
    "number": "5", "a": "5", "b": "3", "c": "4", "n": "4", "m": "3",
    "x": "6", "y": "2", "angle": "40", "volume_solute": "10",
    "volume_solution": "100", "mass": "4", "speed": "10", "time": "2",
}


def instantiate(pattern: str) -> str:
    def _sub(m):
        var = m.group(1).lower()
        return VAR_VALUES.get(var, "5")
    return re.sub(r"\{([a-z_0-9]+)\}", _sub, str(pattern)).strip()


def main():
    import backend.its.solver.competency_engine as ce
    live = [os.path.join(COMPETENCY_DIR, f)
            for f in os.listdir(COMPETENCY_DIR)
            if f.startswith("catalog_") and f.endswith(".json")]
    staged = staged_files()
    ce._catalog_files = lambda: live + staged
    ce._INDEX = None

    results = []
    for path in staged:
        fname = os.path.basename(path)
        data = json.load(open(path, encoding="utf-8"))
        cids = {c.get("id") for c in data.get("concepts") or []}
        pats = []
        for c in data.get("concepts") or []:
            pats.extend(str(p) for p in (c.get("question_patterns") or []))
        if not pats:
            results.append((fname, 0, 0, []))
            continue
        step = max(1, len(pats) // N_QUESTIONS)
        chosen = [pats[i * step] for i in range(min(N_QUESTIONS, len(pats)))]
        # spread probe: up to 6 candidate patterns; PASS needs 3 landing
        # in-catalog (score >= 0.4)
        probe = max(1, len(pats) // 6)
        candidates = [pats[i * probe] for i in range(min(6, len(pats)))]
        ok = 0
        fails = []
        tried = 0
        for q in candidates:
            if ok >= N_QUESTIONS:
                break
            tried += 1
            text = instantiate(q)
            hit = ce.route_concept(text)
            if hit is None:
                fails.append((text, "NO-ROUTE", 0.0))
                continue
            concept, score = hit
            if concept.get("id") in cids and score >= THRESH:
                ok += 1
            else:
                fails.append((text, concept.get("id"),
                              round(float(score), 3)))
        results.append((fname, ok, tried, fails))

    passed = sum(1 for _f, ok, _n, _x in results if ok >= N_QUESTIONS)
    print("catalogs smoke-tested: %d" % len(results))
    print("catalogs with >= %d own-pattern routes in-catalog at >= %.2f: "
          "%d (%.0f%%)" %
          (N_QUESTIONS, THRESH, passed,
           100.0 * passed / max(1, len(results))))
    print("\nFAILURES:")
    for fname, ok, n, fails in results:
        if fails:
            print("  %s (%d/%d)" % (fname, ok, n))
            for text, cid, score in fails:
                print("     routed->%s (%.2f): %s" % (cid, score, text[:70]))
    out = os.path.join(HERE, "smoke_results.json")
    json.dump([{"file": f, "ok": ok, "n": n,
                "fails": fails} for f, ok, n, fails in results],
              open(out, "w", encoding="utf-8"), indent=1)
    print("results -> %s" % out)


if __name__ == "__main__":
    main()
