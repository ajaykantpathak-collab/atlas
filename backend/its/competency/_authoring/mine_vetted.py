#!/usr/bin/env python3
"""Mine parsed_output/diagnostics.jsonl + misconceptions.jsonl for vetted
content matching each REVIEW_NEEDED node, and enrich the authoring briefs.

Matching is topical ONLY (the JSONL target_nodes use a different corpus's
flat node ids -- zero exact-id overlap with enhanced node ids), so every
vetted item is a CANDIDATE source: the author must still verify it is
answerable from the node's own definition/walkthrough/diagnostics before
use, per the zero-wrong rule.

For each node attaches, after its own content:
  VETTED-DIAG ranked by token overlap with (definition + walkthrough + diag
  questions); same class_level + subject family.
  VETTED-MIS  ranked misconceptions for the subject overlapping the node's
  definition tokens.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PLATFORM = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
ROOT = os.path.dirname(PLATFORM)
PARSED = os.path.join(ROOT, "parsed_output")

STOP = set("""a an the of in on for to and or is are was were be been with as
by at from this that these those it its their there here which what who whom
how why when where can could should would may might must not no nor but if
than then so such very more most much many any some all each every into onto
about between among over under above below up down out off again further once
only other another also because while during before after both few own same
too just state list define explain give name""".split())


def toks(t):
    return {w for w in re.findall(r"[a-z\u0900-\u097F]{3,}", (t or "").lower())
            if w not in STOP}


def jac(a, b):
    ta, tb = toks(a), toks(b)
    if not ta or not tb:
        return 0.0
    return len(ta & tb) / len(ta | tb)


SUBJ_FAMILY = {  # enhanced subject -> jsonl subject spellings
    "acc": {"acc"}, "bs": {"bs", "bst", "business"}, "bio": {"bio", "biology"},
    "biotech": {"biotech", "bt"}, "ca": {"ca", "compapp"},
    "chem": {"chem", "chemistry"}, "cs": {"cs", "cpp", "python", "sql"},
    "eco": {"econ", "eco", "economics"}, "eng": {"eng", "english"},
    "eng_s": {"eng"}, "eng_h": {"eng"}, "eng_w": {"eng"}, "eng_f": {"eng"},
    "eng_k": {"eng"}, "eng_v": {"eng"},
    "geo": {"geo", "geography"}, "hin_a": {"hin", "hindi"},
    "hin_al": {"hin"}, "hin_ar": {"hin"}, "hin_v": {"hin"},
    "hs": {"hs", "homesci", "home_science"}, "math": {"math", "maths"},
    "phy": {"phy", "physics"}, "ps": {"ps", "ped", "physed"},
    "psy": {"psy", "psychology"}, "soc": {"soc", "sociology"},
    "stat": {"stat", "statistics"}, "hist": {"hist", "history"},
    "civ": {"civ", "polsci"}, "ip": {"ip"},
}

# ---------------------------------------------------------------- load jsonl
diag_recs, mis_recs = [], []
with open(os.path.join(PARSED, "diagnostics.jsonl"), encoding="utf-8") as f:
    for line in f:
        try:
            r = json.loads(line)
        except ValueError:
            continue
        r["_t"] = toks(r.get("question_text", "") + " " +
                       (r.get("correct_answer") or ""))
        diag_recs.append(r)
with open(os.path.join(PARSED, "misconceptions.jsonl"), encoding="utf-8") as f:
    for line in f:
        try:
            r = json.loads(line)
        except ValueError:
            continue
        r["_t"] = toks(r.get("misconception_text", "") + " " +
                       (r.get("correction") or ""))
        mis_recs.append(r)
print(f"loaded {len(diag_recs)} vetted diagnostics, "
      f"{len(mis_recs)} vetted misconceptions")

# ---------------------------------------------------------------- work spec
spec = json.load(open(os.path.join(HERE, "work_spec.json"), encoding="utf-8"))
raw = json.load(open(os.path.join(PLATFORM, "_cache",
                                  "enhanced_nodes_index.json"),
                     encoding="utf-8"))
nodes = {n["node_id"]: n for n in raw["nodes"]}


def node_text(n):
    parts = [n.get("definition", ""), n.get("walkthrough", "")]
    for d in n.get("diagnostics") or []:
        parts.append(d.get("q", ""))
    return " ".join(parts)


provenance = {}
brief_dir = os.path.join(HERE, "briefs")
for fname in sorted(os.listdir(brief_dir)):
    path = os.path.join(brief_dir, fname)
    text = open(path, encoding="utf-8").read()
    cls_s = fname[:-4]                       # e.g. 11_acc
    blocks = text.split("### NODE ")
    out = [blocks[0]]
    for b in blocks[1:]:
        nid = b.split(" ", 1)[0]
        node = nodes[nid]
        cls = node["class"]
        sub = node["subject"]
        fam = SUBJ_FAMILY.get(sub, {sub})
        nt = node_text(node)
        ntok = toks(nt)
        # vetted diagnostics of same class + subject family
        cands = []
        for r in diag_recs:
            if r.get("class_level") != cls:
                continue
            if (r.get("subject") or "") not in fam:
                continue
            ov = len(ntok & r["_t"])
            if not ov:
                continue
            cands.append((ov / max(1, len(r["_t"])), r))
        cands.sort(key=lambda x: -x[0])
        lines = ["### NODE " + b.rstrip() + "\n"]
        for score, r in cands[:3]:
            if score < 0.06:
                continue
            lines.append(
                f"VETTED-DIAG {r['diagnostic_id']} (fit {score:.2f}, "
                f"src {os.path.basename(r.get('source_file',''))})\n"
                f"  Q: {r.get('question_text','')[:400]}\n"
                f"  A: {(r.get('correct_answer') or '')[:600]}")
        mtoks = toks(node.get("definition", ""))
        mcands = []
        for r in mis_recs:
            if (r.get("subject") or "") not in fam:
                continue
            ov = len(mtoks & r["_t"])
            if not ov:
                continue
            mcands.append((ov / max(1, len(r["_t"])), r))
        mcands.sort(key=lambda x: -x[0])
        for score, r in mcands[:3]:
            if score < 0.05:
                continue
            lines.append(
                f"VETTED-MIS {r['misconception_id']} (fit {score:.2f})\n"
                f"  M: {r.get('misconception_text','')[:250]}\n"
                f"  C: {(r.get('correction') or '')[:400]}")
        out.append("\n".join(lines))
    open(path, "w", encoding="utf-8").write("\n".join(out))
print("briefs enriched")
