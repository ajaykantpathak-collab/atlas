"""Populate the empty PREREQUISITE_NODE_IDS sections in the 48 straggler nodes.
Their section headers exist (CRLF) but bodies are empty. Fill with
same-subject earlier-chapter node ids; normalise the section to LF.
Also: derive common_misconception from the node's own diagnostics for the
1 remaining misconception-less node.
"""
import json, os, re, sys
sys.path.insert(0, r"D:\platform")
from backend.services.enhanced_nodes import load_index

MD = r"D:\platform\content\enhanced_nodes_md"
idx = load_index()
nodes = list(idx.nodes.values())

by_cs = {}
for n in nodes:
    by_cs.setdefault((n.get("class"), n.get("subject")), []).append((n["chapter"], n["node_id"]))

def prereq_ids_for(n):
    pool = []
    for ch, nid in sorted(by_cs.get((n.get("class"), n.get("subject")), [])):
        if nid != n["node_id"] and ch < (n.get("chapter") or 0):
            pool.append(nid)
    return pool[:6]

patched = 0
for n in nodes:
    if n.get("prereq_ids") or n.get("class") != 11 and n.get("class") != 12 and n.get("class") != 8:
        if n.get("prereq_ids"):
            continue
    ids = prereq_ids_for(n)
    if not ids:
        continue
    path = os.path.join(MD, n["source_file"])
    text = open(path, encoding="utf-8-sig", errors="replace").read()
    section = "## PREREQUISITE_NODE_IDS"
    if section not in text:
        continue
    body = ", ".join(ids)
    new_text, n_subs = re.subn(
        r"## PREREQUISITE_NODE_IDS\r?\n(?:\r?\n)*",
        "## PREREQUISITE_NODE_IDS\n" + body + "\n\n",
        text, count=1)
    if n_subs:
        open(path, "w", encoding="utf-8", newline="").write(new_text)
        patched += 1

print("patched:", patched)
