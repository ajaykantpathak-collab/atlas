#!/usr/bin/env python3
"""Refine the 180-node authoring plan and regenerate compact briefs.

need classes:
  rewrite-multi  -- PARTIAL nodes whose in-scope diagnostic(s) must yield
                    >= 2 candidates (one pool-independent) so thin clusters
                    reach >= 4 challenges and lone nodes compile anywhere
  append3        -- MISSING nodes: append 3 usable diagnostics
  isolated-rich  -- subject-isolated single-node chapters: need >= 4 usable
                    diagnostics for the standalone micro-lesson; rewrite the
                    in-scope diagnostic(s) AND append 4 new ones
"""
import json
import os
import re
import collections

HERE = os.path.dirname(os.path.abspath(__file__))
PLATFORM = os.path.normpath(os.path.join(HERE, "..", "..", ".."))

plan = json.load(open(os.path.join(HERE, "plan180.json"), encoding="utf-8"))
TRUE_ISOLATED = {
    "c12_phy_cbse_02_007", "c12_phy_cbse_08_004", "c12_phy_cbse_09_003",
    "c12_phy_cbse_10_004", "c12_phy_cbse_10_008", "c12_phy_cbse_12_001",
}
for nid, p in plan.items():
    if nid in TRUE_ISOLATED:
        p["need"] = "isolated-rich"
    elif p["need"] == "isolated-rich":
        p["need"] = "rewrite-multi"
    elif p["need"] == "rewrite1":
        p["need"] = "rewrite-multi"
    if p["need"] == "isolated-rich":
        p["append"] = 4
print(collections.Counter(p["need"] for p in plan.values()))
json.dump(plan, open(os.path.join(HERE, "plan180.json"), "w"), indent=1)

raw = json.load(open(os.path.join(PLATFORM, "_cache",
                                  "enhanced_nodes_index.json"), encoding="utf-8"))
nodes = {n["node_id"]: n for n in raw["nodes"]}


def clean(t):
    t = re.sub(r"\*\*|__|`{1,3}", "", t or "")
    return re.sub(r"[ \t]{2,}", " ", t).strip()


briefs = {}
for nid, p in plan.items():
    n = nodes[nid]
    last = max((d["index"] for d in (n.get("diagnostics") or [])), default=0)
    lines = [f"### NODE {nid} need={p['need']} rewrite={p['rewrite']} "
             f"append={p['append']} append_start=D{last + 1}",
             f"DEFINITION: {clean(n.get('definition', ''))}",
             f"WALKTHROUGH: {clean(n.get('walkthrough', ''))[:1400]}"]
    for d in n.get("diagnostics") or []:
        mark = " [IN-SCOPE]" if (d["index"] - 1) in p["rewrite"] else ""
        lines.append(f"D{d['index']} Q: {clean(d['q'])[:340]}{mark}")
        lines.append(f"D{d['index']} A: {clean(d['a'])[:460]}")
    briefs.setdefault(f"{n['class']}_{n['subject']}", []).append(
        "\n".join(lines))

bdir = os.path.join(HERE, "briefs180")
os.makedirs(bdir, exist_ok=True)
for name, chunks in sorted(briefs.items()):
    with open(os.path.join(bdir, f"{name}.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(chunks))
print("brief files:", len(briefs))
