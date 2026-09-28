#!/usr/bin/env python3
"""NONSTEM-4: the non-STEM bench — same discipline as the maths benches.

Two measurements:

A) ROUTE ACCURACY — sample authored diagnostic questions per subject,
   ask model_answer() to retrieve; count when the returned node ==
   the item's own node (self-retrieval).  This is the "does the student's
   question land on the right content" number.

B) GROUNDING — for generated chapter packs, embed each marking point and
   its cited node's text; flag points whose best support is weak
   (cosine < threshold).  This is the "is the generated content faithful"
   number — catches fabrication at scale.

Usage:
  python backend/tools/bench_nonstem.py --route-per-subject 150
  python backend/tools/bench_nonstem.py --grounding          # generated packs
"""
import argparse
import json
import os
import random
import sys
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))
os.environ.setdefault("HF_HOME",
                      os.path.join(os.path.dirname(__file__), "..", "..",
                                   "runtime_data", "hf_cache"))

from backend.services.enhanced_nodes import (  # noqa: E402
    load_index, model_answer, _mp_index, _mp_file, _node_embeddings)


def bench_routes(per_subject: int) -> None:
    mp_idx = _mp_index()
    by_subj = defaultdict(list)
    for nid, subj in mp_idx.items():
        by_subj[subj].append(nid)

    rng = random.Random(42)
    print(f"{'subject':14}{'tested':>8}{'node_hit':>9}{'any':>6}")
    tot = hit = 0
    for subj in sorted(by_subj):
        nids = rng.sample(by_subj[subj], min(40, len(by_subj[subj])))
        items = []
        entry_file = _mp_file(subj)
        for nid in nids:
            for it in (entry_file.get(nid) or {}).get("items", [])[:4]:
                items.append((nid, it["q"]))
        sample = rng.sample(items, min(per_subject, len(items)))
        s_hit = s_any = 0
        for want_nid, q in sample:
            r = model_answer(q)
            if r is not None:
                s_any += 1
                if r.get("node_id") == want_nid or \
                   want_nid in {n for mp_ in r.get("marking_points", [])
                                for n in mp_.get("node_ids", [])}:
                    s_hit += 1
        tot += len(sample)
        hit += s_hit
        print(f"{subj:14}{len(sample):>8}{s_hit:>9}{s_any:>6}")
    print(f"\nTOTAL {hit}/{tot} exact-node = {100*hit/max(1,tot):.0f}%")


def bench_grounding() -> None:
    import numpy as np
    packed = _node_embeddings(load_index())
    if packed is None:
        print("embedding model unavailable — cannot ground-check")
        return
    nids, emb, model = packed
    npos = {n: i for i, n in enumerate(nids)}

    mdir = os.path.join(os.path.dirname(__file__), "..", "..",
                        "content", "model_answers")
    files = sorted(glob for glob in
                   __import__("glob").glob(os.path.join(mdir, "*.json")))
    if not files:
        print("no generated packs yet")
        return
    total = flagged = 0
    weak = []
    for f in files:
        data = json.load(open(f, encoding="utf-8"))
        for q in data.get("questions", []):
            for mp_ in q.get("marking_points", []):
                pt = mp_.get("point") or ""
                src = [n for n in (mp_.get("node_ids") or [])
                       if n in npos]
                if not pt or not src:
                    continue
                total += 1
                pe = model.encode([pt.lower()],
                                  normalize_embeddings=True)[0]
                best = max(float(emb[npos[n]] @ pe) for n in src)
                if best < 0.35:
                    flagged += 1
                    weak.append((os.path.basename(f), pt[:80],
                                 round(best, 2)))
    print(f"grounding: {total-flagged}/{total} points supported "
          f"({100*(total-flagged)/max(1,total):.0f}%)")
    for f, p, s in weak[:15]:
        print(f"  WEAK {s} {f}: {p}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--route-per-subject", type=int, default=150)
    ap.add_argument("--grounding", action="store_true")
    ap.add_argument("--routes", action="store_true")
    a = ap.parse_args()
    if a.grounding:
        bench_grounding()
    else:
        bench_routes(a.route_per_subject)
