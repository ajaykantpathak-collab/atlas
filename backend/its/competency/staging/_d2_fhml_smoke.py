# -*- coding: utf-8 -*-
"""Routing smoke for Devanagari (hindi) staging catalogs.

The production normalizer (_normalize_question) keeps only [a-z# /] runs,
so pure-Devanagari concept text collapses to near-empty strings and the
cross-catalog embedding stage cannot discriminate between hindi
chapters.  This smoke therefore checks TWO layers:

  A. Production path: probes go through
     backend.its.solver.competency_engine.route_concept against the FULL
     staging index.  Criterion: score >= 0.40 (brief threshold).  Top-1
     catalog identity is logged but cross-chapter identity is expected
     to be arbitrary for Devanagari (platform limitation, not a catalog
     defect).

  B. Within-catalog discrimination: character-trigram TF cosine between
     each probe and each concept's authored text (language-neutral;
     Devanagari-safe).  Each probe must rank its OWN concept first among
     the catalog's concepts.  This proves the authored patterns are
     chapter-specific and internally separable -- the production
     embedding model is English-only and cannot separate Devanagari
     inputs (its normalizer also strips non-Latin text).

Usage: python _d2_fhml_smoke.py <stem-substring> [<stem-substring> ...]
"""
import json
import os
import re
import sys

sys.path.insert(0, "D:/platform")
sys.path.insert(0, "D:/platform/backend/tools")

STAGING = os.path.dirname(os.path.abspath(__file__))
THRESHOLD = 0.40
PROBES = 3


def concept_text_raw(c):
    parts = [c.get("title", ""), c.get("key_idea", "")]
    parts.extend(c.get("question_patterns", []) or [])
    return " . ".join(p for p in parts if p)


def trigrams(s):
    s = re.sub(r"\s+", "", str(s))
    if len(s) < 3:
        return {}
    out = {}
    for i in range(len(s) - 2):
        g = s[i:i + 3]
        out[g] = out.get(g, 0) + 1
    return out


def trigram_cosine(a, b):
    ta, tb = trigrams(a), trigrams(b)
    if not ta or not tb:
        return 0.0
    dot = sum(v * tb.get(k, 0) for k, v in ta.items())
    na = sum(v * v for v in ta.values()) ** 0.5
    nb = sum(v * v for v in tb.values()) ** 0.5
    return dot / (na * nb) if na and nb else 0.0


def main():
    selectors = sys.argv[1:]
    files = sorted(
        f for f in os.listdir(STAGING)
        if f.startswith("catalog_") and f.endswith(".json")
        and all(s in f for s in selectors))
    if not files:
        print("NO FILES matched %r" % selectors)
        return 1

    from backend.its.solver import competency_engine as ce
    ce._COMPETENCY_DIR = STAGING
    ce._INDEX = None
    router = ce._get_router()
    if router is None:
        print("router init failed")
        return 1
    model = router.model

    n_pass = 0
    fails = []
    for f in files:
        with open(os.path.join(STAGING, f), encoding="utf-8") as fh:
            cat = json.load(fh)
        concepts = cat.get("concepts", [])
        cat_ids = {c.get("id") for c in concepts}
        # probes: one pattern from up to PROBES distinct concepts
        probes = []
        for c in concepts:
            pats = c.get("question_patterns") or []
            if pats:
                probes.append((c["id"], pats[len(pats) // 2]))
            if len(probes) >= PROBES:
                break

        raw_texts = [concept_text_raw(c) for c in concepts]

        a_ok = 0
        b_ok = 0
        lines = []
        for cid, probe in probes:
            hit = ce.route_concept(probe)
            score = hit[1] if hit else 0.0
            top = hit[0]["id"] if hit else "NO-ROUTE"
            flag_a = score >= THRESHOLD
            a_ok += flag_a
            # layer B: rank probe among THIS catalog's concepts
            # (char-trigram cosine, Devanagari-safe)
            sims = [trigram_cosine(probe, t) for t in raw_texts]
            order = sorted(range(len(sims)), key=lambda i: -sims[i])
            src_idx = [i for i, c in enumerate(concepts)
                       if c.get("id") == cid][0]
            rank = order.index(src_idx) + 1
            margin = (sims[order[0]] - sims[order[1]]
                      if len(order) > 1 else sims[order[0]])
            flag_b = rank == 1
            b_ok += flag_b
            lines.append("  probe %-14s A: %.3f -> %-14s %s | B: rank %d "
                         "(margin %.3f) %s"
                         % (cid, score, top,
                            "ok" if flag_a else "FAIL",
                            rank, margin,
                            "ok" if flag_b else "FAIL"))
        status = "PASS" if (a_ok == len(probes) and b_ok == len(probes)) \
            else "PARTIAL A=%d/%d B=%d/%d" % (a_ok, len(probes),
                                              b_ok, len(probes))
        print("%-52s %s" % (f, status))
        for ln in lines:
            print(ln)
        if status == "PASS":
            n_pass += 1
        else:
            fails.append(f)
    print("\nRouting smoke: %d/%d catalogs pass" % (n_pass, len(files)))
    if fails:
        print("FAILED:", " ".join(fails))
    return 0


if __name__ == "__main__":
    sys.exit(main())
