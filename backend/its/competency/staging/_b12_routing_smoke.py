"""Routing smoke for the class9 Hindi (Ganga) staging catalogs.

Builds an embedding index over ONLY the ihga10x/ihga11x staging files and
routes 2 question patterns per catalog; the top concept must belong to the
same catalog with score >= 0.4 (DRAFTER_BRIEF routing smoke).
Falls back to normalized-token overlap if sentence-transformers is not
loadable.
"""
import json
import os
import re
import sys

sys.path.insert(0, "D:/platform")
sys.path.insert(0, "D:/platform/backend/tools")

STAGING = os.path.dirname(os.path.abspath(__file__))
STEMS = ["ihga10%s" % i for i in range(2, 10)] + ["ihga110", "ihga111", "ihga112"]


def norm(t):
    t = re.sub(r"\d+(?:\.\d+)?", "#", str(t or ""))
    t = (t.replace("+", " plus ").replace("-", " minus ")
          .replace("*", " times ").replace("/", " divided by ")
          .replace("=", " equals ").replace("^", " to the power "))
    t = re.sub(r"[^a-z# /\t]", " ", t.lower())
    return re.sub(r"\s+", " ", t).strip()


def load_catalogs():
    cats = []
    for f in sorted(os.listdir(STAGING)):
        if not (f.startswith("catalog_class9_hindi_") and f.endswith(".json")):
            continue
        if not any(s in f for s in STEMS):
            continue
        cat = json.load(open(os.path.join(STAGING, f), encoding="utf-8"))
        cats.append(cat)
    return cats


def main():
    cats = load_catalogs()
    print("catalogs:", len(cats))
    model = None
    try:
        from sentence_transformers import SentenceTransformer
        model = SentenceTransformer("all-MiniLM-L6-v2")
        print("model: all-MiniLM-L6-v2")
    except Exception as e:
        print("model unavailable, token-overlap fallback (%s)" % str(e)[:80])

    # concept texts (same composition as competency_engine._concept_text)
    concepts = []
    for cat in cats:
        for c in cat.get("concepts", []):
            parts = [c.get("title", ""), c.get("key_idea", ""), c.get("formula", "")]
            parts.extend(c.get("question_patterns", []) or [])
            text = norm(" . ".join(p for p in parts if p))
            concepts.append((cat, c, text))

    if model is not None and concepts:
        emb = model.encode([t for _, _, t in concepts],
                           normalize_embeddings=True)

    n_pass = n_fail = 0
    failures = []
    for cat in cats:
        pats = [p for c in cat.get("concepts", [])
                for p in (c.get("question_patterns") or [])]
        samples = [pats[0], pats[len(pats) // 2]]
        for q in samples:
            qn = norm(q)
            if model is not None:
                v = model.encode([qn], normalize_embeddings=True)[0]
                scores = [float(v @ e) for e in emb]
            else:
                qset = set(qn.split())
                scores = []
                for _, _, t in concepts:
                    ts = set(t.split())
                    sc = (len(qset & ts) / max(1, len(qset | ts))) if qset else 0.0
                    scores.append(sc)
            best = max(range(len(scores)), key=lambda i: scores[i])
            bc, bcid, sc = concepts[best][0], concepts[best][1].get("id"), scores[best]
            ok = bc is cat and sc >= 0.4
            if ok:
                n_pass += 1
            else:
                n_fail += 1
                failures.append("%s: '%s' -> %s (%.3f)"
                                % (os.path.basename(
                                    str(cat.get("source_file", ""))), q[:44],
                                   bcid, sc))
        print("%s: 2 patterns routed (last best %s, %.3f)"
              % (cat.get("chapter"), bcid, sc))
    print("PASS %d/%d" % (n_pass, n_pass + n_fail))
    for f in failures:
        print("  FAIL", f)
    return 0 if n_fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
