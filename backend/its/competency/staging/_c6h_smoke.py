# -*- coding: utf-8 -*-
"""Routing smoke for one class 6 Hindi staging catalog.

Runs 2 question_patterns of the chapter through the live
backend.its.solver.competency_engine.route_concept, then a scoped router
over the staging class 6 hindi catalogs, and logs the normalization
diagnosis (Devanagari handling in the router).
"""
import json
import os
import sys

sys.path.insert(0, r"D:\platform")
sys.path.insert(0, r"D:\platform\backend\tools")

STEM = sys.argv[1] if len(sys.argv) > 1 else "fhml102"
STAGING = r"D:\platform\backend\its\competency\staging"

CAT_PATH = os.path.join(STAGING, "catalog_class6_hindi_%s.json" % STEM)
cat = json.load(open(CAT_PATH, encoding="utf-8"))
ids = {c["id"] for c in cat["concepts"]}

# --- diagnosis: what survives the router's ASCII-only normalizer ---
import backend.its.solver.competency_engine as ce  # noqa: E402

norms = [ce._normalize_question(ce._concept_text(c))
         for c in cat["concepts"]]
print("normalized concept texts (router view):")
for c, n in zip(cat["concepts"], norms):
    print("   %-12s %r" % (c["id"], n[:40]))

# --- live router smoke: 2 patterns per chapter ---
hits = []
for c in cat["concepts"][:2]:
    hits.append(c["question_patterns"][0])
for c in cat["concepts"][2:4]:
    hits.append(c["question_patterns"][-1])
if len(hits) < 2:
    hits.append(cat["concepts"][0]["question_patterns"][1])

r = ce._get_router()
print("live router: %d concepts loaded" % len(r.concepts))
in_cat = 0
for h in hits:
    res = ce.route_concept(h)
    if res is None:
        print("   %-46s -> NO MATCH" % h[:44])
        continue
    top, score = res
    ok = "IN-CATALOG" if top.get("id") in ids else "OUT"
    in_cat += ok == "IN-CATALOG"
    print("   %-46s -> %-14s %.3f %s"
          % (h[:44], top.get("id"), score, ok))
print("LIVE SMOKE: %d/%d in-catalog" % (in_cat, len(hits)))

# --- scoped router over staging class 6 hindi catalogs only ---
class _Scoped:
    pass


import numpy as np  # noqa: E402

files = sorted(f for f in os.listdir(STAGING)
               if f.startswith("catalog_class6_hindi_")
               and f.endswith(".json"))
concepts = []
for fn in files:
    c2 = json.load(open(os.path.join(STAGING, fn), encoding="utf-8"))
    for c in c2.get("concepts", []):
        c = dict(c)
        c["chapter_title"] = c2.get("chapter_title", "")
        c["_file"] = fn
        concepts.append(c)
texts = [ce._normalize_question(ce._concept_text(c)) for c in concepts]
emb = r.model.encode(texts, normalize_embeddings=True)
print("scoped router: %d concepts from %d staging class-6 files"
      % (len(concepts), len(files)))
uniq = len(set(texts))
print("scoped: %d distinct normalized concept texts out of %d "
      "(degeneracy check)" % (uniq, len(texts)))
sc_in = 0
for h in hits:
    q = r.model.encode([ce._normalize_question(h)],
                       normalize_embeddings=True)[0]
    scores = emb @ q
    best = int(np.argmax(scores))
    top = concepts[best]
    ok = "IN-CATALOG" if top["_file"].endswith("%s.json" % STEM) else "OUT"
    sc_in += ok == "IN-CATALOG"
    print("   %-46s -> %-12s %.3f %s (%s)"
          % (h[:44], top["id"], float(scores[best]), ok, top["_file"]))
print("SCOPED SMOKE: %d/%d in-catalog" % (sc_in, len(hits)))
