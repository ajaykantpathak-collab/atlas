"""Routing smoke for staged territory catalogs.

Builds the same MiniLM index the production router uses, but over the
STAGING directory (staged files are not discoverable by route_concept
until promoted).  For each catalog: 3 probe patterns from the catalog's
own question_patterns (perturbed phrasings) must route INTO that
catalog's concept with score >= 0.4.

Usage: python _route_smoke.py [file-substring ...]
"""
import json
import os
import re
import sys

sys.path.insert(0, "D:/platform")

STAGING = os.path.dirname(os.path.abspath(__file__))
THRESHOLD = 0.40
PROBES_PER_CATALOG = 3


def is_territory(fname):
    if not (fname.startswith("catalog_") and fname.endswith(".json")):
        return False
    stem = fname[len("catalog_"):-len(".json")]
    if any(x in stem for x in ("maths", "science", "physics", "chemistry",
                               "biology")):
        return False
    if re.search(r"class1[12]_accountancy_", stem):
        return True
    if re.search(r"class1[12]_business_studies_", stem):
        return True
    if re.search(r"class1[12]_economics_", stem):
        return True
    if re.search(r"class(6|7|8|9|10|11|12)_social_science_", stem):
        return True
    if re.search(r"class1[12]_", stem):
        return True
    return False


def perturb(pattern, i):
    """Light phrasing variants so we test generalization, not memorized
    strings."""
    p = re.sub(r"\d+(?:\.\d+)?", "25", str(pattern))
    if i == 1:
        return "Explain how to " + p[0].lower() + p[1:]
    if i == 2:
        return "A student asks: " + p
    return p


def main():
    selectors = sys.argv[1:]
    files = sorted(f for f in os.listdir(STAGING)
                   if f.endswith(".json") and is_territory(f)
                   and all(s in f for s in selectors))
    if not files:
        print("NO FILES matched selectors %r" % selectors)
        return 1

    from backend.its.solver import competency_engine as ce
    ce._COMPETENCY_DIR = STAGING
    ce._INDEX = None
    router = ce._get_router()
    if router is None:
        print("router init failed (sentence_transformers missing?)")
        return 1
    by_id = {c["id"]: c for c in router.concepts}

    pass_n = 0
    fail_list = []
    for f in files:
        with open(os.path.join(STAGING, f), encoding="utf-8") as fh:
            cat = json.load(fh)
        cat_ids = {c.get("id") for c in cat.get("concepts", [])}
        ok = 0
        details = []
        pats = []
        for c in cat.get("concepts", []):
            pats.extend(c.get("question_patterns") or [])
        if not pats:
            print("%-55s NO PATTERNS" % f)
            fail_list.append((f, "no patterns"))
            continue
        step = max(1, len(pats) // PROBES_PER_CATALOG)
        probes = [pats[i * step] for i in range(PROBES_PER_CATALOG)]
        for pi, probe in enumerate(probes):
            text = perturb(probe, pi)
            hit = router.route(text)
            if hit is None:
                details.append("  probe%d NO-ROUTE [%s]" % (pi, text[:70]))
                continue
            concept, score = hit
            in_cat = concept["id"] in cat_ids
            ok_flag = in_cat and score >= THRESHOLD
            if ok_flag:
                ok += 1
            else:
                details.append("  probe%d %.3f -> %s (%s) [%s]" % (
                    pi, score, concept["id"],
                    concept.get("chapter_title", "")[:30], text[:60]))
        status = "PASS" if ok == PROBES_PER_CATALOG else \
            ("PARTIAL %d/3" % ok if ok else "FAIL")
        print("%-55s %s" % (f[:55], status))
        for d in details:
            print(d)
        if ok == PROBES_PER_CATALOG:
            pass_n += 1
        else:
            fail_list.append((f, "%d/3" % ok))
    print("\nRouting: %d/%d catalogs fully pass (target 8/10 min)"
          % (pass_n, len(files)))
    for f, why in fail_list:
        print("  FAIL/PARTIAL: %s (%s)" % (f, why))
    return 0


if __name__ == "__main__":
    sys.exit(main())
