#!/usr/bin/env python3
"""Build the authoring work spec for the 216 REVIEW_NEEDED nodes.

For each node:
  - PARTIAL: in-scope diagnostics = those matched by the depth entry's
    uncovered_diagnostics (index prefix or normalized q-text match), exactly
    as scope_diagnostics() in simdef_compiler.py does.  Action: REWRITE those
    indices in place (same competency, compilable form).
  - MISSING: all diagnostics in scope.  Action: APPEND 3 new usable
    diagnostics contiguous after the last existing index.

Outputs (backend/its/competency/_authoring/):
  work_spec.json   -- per node: file, verdict, rewrite idx list, append count
  briefs/<class>_<subject>.txt -- compact per-cluster source briefs for authoring
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PLATFORM = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
ROOT = os.path.dirname(PLATFORM)
INDEX_PATH = os.path.join(PLATFORM, "_cache", "enhanced_nodes_index.json")
DEPTH_DIR = os.path.normpath(os.path.join(HERE, ".."))
GEN_DIR = os.path.join(ROOT, "frontend", "components", "sims_v2", "generated")
MD_DIR = os.path.join(ROOT, "content", "enhanced_nodes_md")

rev = json.load(open(os.path.join(GEN_DIR, "REVIEW_NEEDED.json"), encoding="utf-8"))
raw = json.load(open(INDEX_PATH, encoding="utf-8"))
nodes = {n["node_id"]: n for n in raw["nodes"]}

depth = {}
for c in range(7, 13):
    d = json.load(open(os.path.join(DEPTH_DIR, f"CLASS{c}_NODE_DEPTH.json"),
                       encoding="utf-8"))
    for e in d["nodes"]:
        depth[e["node_id"]] = e
d6 = json.load(open(os.path.join(ROOT, "frontend", "components", "sims_v2",
                                 "CLASS6_NODE_DEPTH.json"), encoding="utf-8"))
for e in d6["nodes"]:
    depth[e["node_id"]] = e

_DIAG_PREFIX_RE = re.compile(r"^diagnostic\s+(\d+)\s*\(coverage[^)]*\):\s*")


def norm_text(s):
    return re.sub(r"[^a-z0-9\u0900-\u097F]+", " ", s.lower()).strip()


def scope_indices(node, uncovered):
    """Mirror scope_diagnostics() index resolution."""
    diags = node.get("diagnostics") or []
    if not uncovered:
        return None                      # fallback: all
    scope, matched = [], set()
    for u in uncovered:
        m = _DIAG_PREFIX_RE.match(u)
        if m:
            k = int(m.group(1)) - 1
            if 0 <= k < len(diags):
                scope.append(k)
                matched.add(k)
                continue
        nu = norm_text(_DIAG_PREFIX_RE.sub("", u))
        if not nu:
            continue
        for k, d in enumerate(diags):
            if k in matched:
                continue
            nq = norm_text(d.get("q", ""))
            if nq and (nq.startswith(nu) or nu.startswith(nq) or nu in nq):
                scope.append(k)
                matched.add(k)
                break
    if not scope:
        return None                      # partial-unmatched-fallback: all
    return sorted(scope)


def clean(t):
    t = re.sub(r"\*\*|__|`{1,3}", "", t or "")
    return re.sub(r"[ \t]{2,}", " ", t).strip()


spec = {}
briefs = {}
for row in rev["nodes"]:
    nid = row["node_id"]
    node = nodes[nid]
    e = depth[nid]
    verdict = row["verdict"]
    diags = node.get("diagnostics") or []
    if verdict == "MISSING":
        rewrite, append = [], 3
    else:
        idxs = scope_indices(node, e.get("uncovered_diagnostics") or [])
        if idxs is None:
            rewrite, append = [], 3      # fallback-all: safest to also append
        else:
            rewrite, append = idxs, 0
    last = max((d["index"] for d in diags), default=0)
    spec[nid] = {
        "file": node["source_file"],
        "verdict": verdict,
        "chapter": node["chapter"],
        "node_num": node["node_num"],
        "rewrite_indices": rewrite,
        "append_count": append,
        "append_start_index": last + 1,
        "diag_count": len(diags),
        "reason": row["reason"],
    }
    lines = [
        f"### NODE {nid}  class={node['class']} sub={node['subject']} "
        f"ch={node['chapter']} verdict={verdict} "
        f"action={'REWRITE ' + str(rewrite) if rewrite else ''}"
        f"{'APPEND %d from idx %d' % (append, last + 1) if append else ''}",
        f"DEFINITION: {clean(node.get('definition',''))}",
    ]
    wt = clean(node.get("walkthrough", ""))
    lines.append(f"WALKTHROUGH: {wt[:1400]}")
    for d in diags:
        mark = " [IN-SCOPE-REWRITE]" if (d["index"] - 1) in rewrite else ""
        lines.append(f"D{d['index']} Q: {clean(d['q'])[:320]}{mark}")
        lines.append(f"D{d['index']} A: {clean(d['a'])[:420]}")
    if append:
        lines.append(f"(append {append} new diagnostics as D{last + 1}..)")
    lines.append("")
    briefs.setdefault(f"{node['class']}_{node['subject']}", []).append(
        "\n".join(lines))

os.makedirs(os.path.join(HERE, "briefs"), exist_ok=True)
with open(os.path.join(HERE, "work_spec.json"), "w", encoding="utf-8") as f:
    json.dump(spec, f, ensure_ascii=False, indent=1)
for name, chunks in sorted(briefs.items()):
    with open(os.path.join(HERE, "briefs", f"{name}.txt"), "w",
              encoding="utf-8") as f:
        f.write("\n".join(chunks))
n_rew = sum(1 for s in spec.values() if s["rewrite_indices"])
n_app = sum(1 for s in spec.values() if s["append_count"])
n_rew_diags = sum(len(s["rewrite_indices"]) for s in spec.values())
print(f"nodes: {len(spec)}  rewrite-nodes: {n_rew} "
      f"({n_rew_diags} diagnostics)  append-nodes: {n_app}  "
      f"brief files: {len(briefs)}")
stats = {}
for s in spec.values():
    stats[s["verdict"]] = stats.get(s["verdict"], 0) + 1
print(stats)
