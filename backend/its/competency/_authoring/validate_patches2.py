#!/usr/bin/env python3
"""Validate authored patches2/*.json: every rewritten/appended diagnostic must
yield >=1 challenge candidate (pool-independent gates: order / numeric, plus
mcq against a synthetic pool of the patch set itself + chapter siblings)."""
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

P2 = os.path.join(HERE, "patches2")
raw = json.load(open(sc.INDEX_PATH, encoding="utf-8"))
nodes = {n["node_id"]: n for n in raw["nodes"]}

# gather all authored content as an mcq pool of last resort
pool_all = []
authored = {}
for f in sorted(os.listdir(P2)):
    if not f.endswith(".json"):
        continue
    for nid, sp in json.load(open(os.path.join(P2, f), encoding="utf-8")).items():
        authored[nid] = sp
        for d in (sp.get("appends") or []):
            pool_all.append(d["a"])
        for d in (sp.get("rewrites") or {}).values():
            pool_all.append(d["a"])

fails = []
checked = 0
for nid, sp in sorted(authored.items()):
    n = nodes.get(nid)
    if n is None:
        fails.append((nid, "-", "NODE NOT IN INDEX"))
        continue
    # chapter sibling pool (non-GOLD members) like the real compiler
    sibs = []
    for n2id, n2 in nodes.items():
        if (n2["class"], sc.SUBJECT_CODE.get(n2["subject"], n2["subject"]),
                n2["chapter"]) == (n["class"], n["subject"], n["chapter"]):
            for d in n2.get("diagnostics") or []:
                core, _w = sc.strip_wrong_tail(d.get("a", ""))
                if sc.MIN_CORE_CHARS <= len(core) <= sc.MAX_CORE_CHARS:
                    sibs.append((n2id, d["index"], core,
                                 sc.stem_bucket(sc.clean(d.get("q", "")))))
    own_pool = sibs + [(nid, 0, a, "scenario") for a in pool_all]
    for ks, d in (sp.get("rewrites") or {}).items():
        checked += 1
        oq = nodes[nid]["diagnostics"][int(ks) - 1]["q"]
        q = sc.trim(sc.clean(d.get("q", oq)), sc.MAX_Q_CHARS)
        core, wrong = sc.strip_wrong_tail(d["a"])
        gates = []
        if len(q) < 12:
            gates.append("Q_SHORT")
        if sc.JUNK_ANSWER_RE.search(d["a"]):
            gates.append("JUNK_ANS")
        if not (sc.MIN_CORE_CHARS <= len(core) <= sc.MAX_CORE_CHARS):
            gates.append(f"CORE({len(core)})")
        items = sc.order_items(core)
        num = sc.numeric_key(q, core)
        mcq = sc.build_mcq(sc.trim_option(core), own_pool, nid + ks,
                           sc.stem_bucket(q), q) if core else None
        if items:
            gates.append("order")
        if num:
            gates.append(f"math({num[0]}{num[2]})")
        if mcq:
            gates.append("mcq")
        got = [g for g in gates if g in ("order",) or g.startswith("math") or g == "mcq"]
        status = "OK" if got and not any(g.isupper() for g in gates) else "FAIL"
        if status == "FAIL":
            fails.append((nid, "D" + ks, ";".join(gates) or "no-candidate"))
        print(f"{nid} D{ks}: {';'.join(gates) or 'NO-CANDIDATE'} -> {status}")
    for i, app in enumerate(sp.get("appends") or []):
        checked += 1
        core, wrong = sc.strip_wrong_tail(app["a"])
        q = sc.trim(sc.clean(app["q"]), sc.MAX_Q_CHARS)
        items = sc.order_items(core)
        num = sc.numeric_key(q, core)
        mcq = sc.build_mcq(sc.trim_option(core), own_pool, nid + f"app{i}",
                           sc.stem_bucket(q), q) if core else None
        got = bool(items or num or mcq)
        gates = []
        if items: gates.append("order")
        if num: gates.append("math")
        if mcq: gates.append("mcq")
        status = "OK" if got else "FAIL"
        if not got:
            fails.append((nid, f"app{i}", ";".join(gates) or "no-candidate"))
        print(f"{nid} app{i}: {';'.join(gates) or 'NO-CANDIDATE'} -> {status}")

print(f"\nchecked {checked}; failures: {len(fails)}")
for nid, k, why in fails:
    print("  FAIL", nid, k, why)
