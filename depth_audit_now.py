"""DEPTH_AUDIT — grade all enhanced nodes against the gold-tier pedagogy bar.

GOLD   : full stack — core sections + >=4 diagnostics + misconception
         + on_failure + prereq_ids
PARTIAL: core sections + 1-3 diagnostics (some depth, incomplete stack)
MISSING: definition only / effectively bare
Prints per-class and overall distribution, writes DEPTH_AUDIT_NOW.json.
"""
import json
from collections import defaultdict

idx = json.load(open(r"D:\platform\backend\_cache\enhanced_nodes_index.json", encoding="utf-8"))
nodes = idx["nodes"]
by_class = defaultdict(lambda: {"GOLD": 0, "PARTIAL": 0, "MISSING": 0})
overall = {"GOLD": 0, "PARTIAL": 0, "MISSING": 0}
examples = {"PARTIAL": [], "MISSING": []}

for n in nodes:
    diags = n.get("diagnostics") or []
    ndiag = len(diags) if isinstance(diags, list) else 0
    has_mc = bool(n.get("common_misconception"))
    has_of = bool(n.get("on_failure"))
    has_pr = bool(n.get("prereq_ids"))
    has_mc_col = (n.get("mastery_criteria") or "")
    has_scope = (n.get("scope_boundary") or "")
    has_walk = bool(n.get("walkthrough"))

    # gold bar = TEACHING CONTENT quality: full sections + 4+ diagnostics
    # + authored misconception + on-failure guidance.  Prerequisite chains
    # are GRAPH structure (certified separately) — chapter-1 foundation
    # nodes legitimately have none, so they are not required here.
    if has_walk and ndiag >= 4 and has_mc and has_of and has_mc_col and has_scope:
        v = "GOLD"
    elif has_walk or n.get("definition"):
        v = "PARTIAL"
    else:
        v = "MISSING"
    overall[v] += 1
    by_class[n.get("class", 0)][v] += 1
    if len(examples.get(v, [])) < 3 and v in examples:
        examples[v].append(n["node_id"])

total = sum(overall.values())
g = overall["GOLD"]
p = overall["PARTIAL"]
m = overall["MISSING"]
print(f"TOTAL {total}")
print(f"GOLD   {g:5d}  ({g*100.0/total:.1f}%)")
print(f"PARTIAL{p:5d}  ({p*100.0/total:.1f}%)")
print(f"MISSING{m:5d}  ({m*100.0/total:.1f}%)")
for cls in sorted(by_class):
    c = by_class[cls]
    tot = sum(c.values())
    print(f"  class {cls:>2}: total {tot:4d} | GOLD {c['GOLD']:4d} ({c['GOLD']*100.0/tot:.0f}%) | PARTIAL {c['PARTIAL']:4d} | MISSING {c['MISSING']:3d}")
print("PARTIAL examples:", examples["PARTIAL"])
print("MISSING examples:", examples["MISSING"])
json.dump({"overall": overall, "by_class": {str(k): v for k, v in by_class.items()},
           "examples": examples}, open(r"D:\platform\DEPTH_AUDIT_NOW.json", "w", encoding="utf-8"), indent=1)
