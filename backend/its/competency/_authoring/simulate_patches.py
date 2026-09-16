#!/usr/bin/env python3
"""Dry-run the compiler against an IN-MEMORY patched copy of the node index.

Applies every _authoring/patches/*.json (rewrites keyed by 1-based diagnostic
number, appends appended in order) to in-memory node dicts, then runs the
real Compiler.run()-equivalent grouping/prepare/build to report which
REVIEW_NEEDED nodes still fail and why.  Touches no corpus file.

Usage: python simulate_patches.py [--patches DIR] [--only nid,nid...]
"""
import collections
import importlib.util
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PLATFORM = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
sys.path.insert(0, PLATFORM)                      # for services import

spec = importlib.util.spec_from_file_location(
    "sc", os.path.join(PLATFORM, "its", "competency", "simdef_compiler.py"))
sc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sc)

PATCH_DIRS = [os.path.join(HERE, "patches"), os.path.join(HERE, "patches2")]


def load_patches():
    patches = {}
    for pd in PATCH_DIRS:
        if not os.path.isdir(pd):
            continue
        for f in sorted(os.listdir(pd)):
            if f.endswith(".json"):
                with open(os.path.join(pd, f), encoding="utf-8") as fh:
                    patches.update(json.load(fh))
    return patches


def apply_in_memory(patches):
    with open(sc.INDEX_PATH, encoding="utf-8") as fh:
        raw = json.load(fh)
    nodes = {n["node_id"]: n for n in raw["nodes"]}
    changed = 0
    for nid, spec_n in patches.items():
        n = nodes.get(nid)
        if n is None:
            print("PATCH TARGET MISSING:", nid)
            continue
        diags = list(n.get("diagnostics") or [])
        for k_str, new_d in (spec_n.get("rewrites") or {}).items():
            k = int(k_str) - 1
            if not (0 <= k < len(diags)):
                print("REWRITE INDEX OOB:", nid, k_str, "of", len(diags))
                continue
            d = dict(diags[k])
            d["q"] = new_d.get("q", d["q"])
            d["a"] = new_d.get("a", d["a"])
            from services.enhanced_nodes import split_misconception
            d["misconception"] = split_misconception(d["a"])
            diags[k] = d
        for app in spec_n.get("appends") or []:
            from services.enhanced_nodes import split_misconception
            idx = max((d["index"] for d in diags), default=0) + 1
            diags.append({"index": idx, "q": app["q"], "a": app["a"],
                          "misconception": split_misconception(app["a"])})
        n["diagnostics"] = diags
        changed += 1
    return raw, nodes, changed


def main():
    patches = load_patches()
    raw, nodes, changed = apply_in_memory(patches)
    print(f"patched {changed}/{len(patches)} nodes in memory")

    comp = sc.Compiler([6, 7, 8, 9, 10, 11, 12])
    comp.nodes = {n["node_id"]: n for n in raw["nodes"]}   # swapped in
    comp.companions = raw.get("companions")

    groups = collections.defaultdict(list)
    for nid, entry in comp.depth.items():
        node = comp.nodes.get(nid)
        if node is None:
            comp.review[nid] = "node missing from enhanced_nodes_index"
            continue
        verdict = (entry.get("verdict") or "").upper()
        if verdict == "GOLD":
            continue
        if node["class"] not in comp.classes:
            continue
        key = (node["class"], sc.SUBJECT_CODE.get(node["subject"], node["subject"]),
               node["chapter"])
        groups[key].append((nid, node, entry, verdict))

    still = {}
    for (cls, sub, chap) in sorted(groups.keys()):
        members = sorted(groups[(cls, sub, chap)],
                         key=lambda x: (x[1]["node_num"], x[0]))
        sim_seed = f"gen_c{cls}_{sub}_ch{chap:02d}"
        usable, _m = comp.prepare_cluster(members, sim_seed)
        ids = {u[0] for u in usable}
        for nid, node, entry, verdict in members:
            if nid not in ids:
                still[nid] = comp.review.get(nid, "?")

    still_review = json.load(open(os.path.join(HERE, "still_review.json"),
                                  encoding="utf-8"))
    still_ids = {x[0] for x in still_review}
    fixed = still_ids - set(still)
    print(f"still_review nodes: {len(still_ids)}; fixed by patches: {len(fixed)}; "
          f"still failing: {len(still_ids & set(still))}")
    agg = collections.Counter()
    for nid in still_ids:
        if nid in still:
            agg[still[nid]] += 1
    for k, v in agg.most_common(20):
        print(f"  {v:3d}  {k}")
    if "--detail" in sys.argv:
        for nid in sorted(still_ids & set(still)):
            print(" ", nid, "->", still[nid])


if __name__ == "__main__":
    main()
