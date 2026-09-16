#!/usr/bin/env python3
"""For each still-failing (node, in-scope diagnostic), report exactly which
compiler gate it dies at: q-length, junk-answer, core-length, order-items,
numeric-key, or mcq (with distractor strategy counts)."""
import collections
import importlib.util
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PLATFORM = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
sys.path.insert(0, PLATFORM)

spec = importlib.util.spec_from_file_location(
    "sc", os.path.join(PLATFORM, "its", "competency", "simdef_compiler.py"))
sc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sc)
from services.enhanced_nodes import split_misconception

PATCH_DIR = os.path.join(HERE, "patches")


def load_and_apply():
    patches = {}
    for f in sorted(os.listdir(PATCH_DIR)):
        if f.endswith(".json"):
            patches.update(json.load(open(os.path.join(PATCH_DIR, f),
                                          encoding="utf-8")))
    raw = json.load(open(sc.INDEX_PATH, encoding="utf-8"))
    nodes = {n["node_id"]: n for n in raw["nodes"]}
    for nid, sp in patches.items():
        n = nodes.get(nid)
        if n is None:
            continue
        diags = list(n.get("diagnostics") or [])
        for ks, nd in (sp.get("rewrites") or {}).items():
            k = int(ks) - 1
            d = dict(diags[k])
            d["q"] = nd.get("q", d["q"])
            d["a"] = nd.get("a", d["a"])
            d["misconception"] = split_misconception(d["a"])
            diags[k] = d
        for app in sp.get("appends") or []:
            idx = max((d["index"] for d in diags), default=0) + 1
            diags.append({"index": idx, "q": app["q"], "a": app["a"],
                          "misconception": split_misconception(app["a"])})
        n["diagnostics"] = diags
    return raw, nodes


def mcq_probe(key, pool, qbucket, q):
    """Re-run build_mcq while counting available strategies."""
    klow = key.casefold()

    def okshape(t):
        return (3 <= len(t) <= sc.MAX_OPT_CHARS and t.casefold() != klow
                and sc.jaccard(t, key) < 0.72)

    sib_ok = sum(1 for (_n, _k, oc, b) in pool
                 if oc and len(oc) >= sc.MIN_CORE_CHARS
                 and okshape(sc.trim_option(oc)))
    terms = sc._cap_terms(key)
    vocab = []
    for (_n, _k, oc, _b) in pool[:80]:
        for t in sc._cap_terms(oc):
            if t not in terms and t.casefold() not in klow and t not in vocab:
                vocab.append(t)
    pert = sc._perturb_number(key, "xnum")
    pert_ok = bool(pert and okshape(pert))
    return {"pool_size": len(pool), "sibling_okshape": sib_ok,
            "cap_terms": terms[:4], "vocab_terms": len(vocab),
            "perturb_ok": pert_ok}


def main():
    raw, nodes = load_and_apply()
    detail = json.load(open(os.path.join(HERE, "_remaining83.json"),
                            encoding="utf-8"))
    comp = sc.Compiler([6, 7, 8, 9, 10, 11, 12])
    comp.nodes = {n["node_id"]: n for n in raw["nodes"]}

    for nid in sorted(detail):
        info = detail[nid]
        cls, sub, chap = info["cluster"]
        node = nodes[nid]
        # real pool = cluster members' cores (patched in-memory state)
        members = []
        for n2id, n2 in nodes.items():
            if (n2["class"], sc.SUBJECT_CODE.get(n2["subject"], n2["subject"]),
                    n2["chapter"]) == (cls, sub, chap) and n2id in comp.depth:
                v = (comp.depth[n2id].get("verdict") or "").upper()
                if v != "GOLD":
                    members.append(n2id)
        pool = []
        for m in members:
            for d in nodes[m].get("diagnostics") or []:
                core, _w = sc.strip_wrong_tail(d.get("a", ""))
                if sc.MIN_CORE_CHARS <= len(core) <= sc.MAX_CORE_CHARS:
                    pool.append((m, d["index"], core,
                                 sc.stem_bucket(sc.clean(d.get("q", "")))))
        for k1 in info["failing"]:
            d = node["diagnostics"][k1 - 1]
            q = sc.trim(sc.clean(d.get("q", "")), sc.MAX_Q_CHARS)
            core, wrong = sc.strip_wrong_tail(d.get("a", ""))
            gates = []
            if len(q) < 12:
                gates.append("Q_SHORT")
            if sc.JUNK_ANSWER_RE.search(d.get("a", "")):
                gates.append("JUNK_ANSWER")
            if len(core) < sc.MIN_CORE_CHARS:
                gates.append(f"CORE_SHORT({len(core)})")
            elif len(core) > sc.MAX_CORE_CHARS:
                gates.append(f"CORE_LONG({len(core)})")
            items = sc.order_items(core)
            numeric = sc.numeric_key(q, core)
            if items:
                gates.append("order-ok")
            if numeric:
                gates.append("numeric-ok")
            if not items and not numeric:
                key = sc.trim_option(core)
                probe = mcq_probe(key, pool, sc.stem_bucket(q), q)
                mcq = sc.build_mcq(key, pool, "probe", sc.stem_bucket(q), q)
                gates.append("mcq-" + ("ok" if mcq else "FAIL") + str(probe))
            print(f"{nid} D{k1}: {'; '.join(gates)}")


if __name__ == "__main__":
    main()
