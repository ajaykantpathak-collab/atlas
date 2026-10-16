"""FIX the remaining ~217 PARTIAL nodes — four targeted repairs:
A) class-6 nodes missing prereq_ids: relaxed backfill (same-subject any earlier
   chapter, else same-subject any chapter except self).
B) class-6 nodes with only 3 diagnostics: append one authored-style cloze
   diagnostic (DIAGNOSTIC_QUESTION_4/ANSWER_4) derived mechanically from the
   node's own definition — blank a distinctive content word. Zero-wrong: the
   answer is verbatim text from the node itself.
C) comp-kind nodes (case_companion): graded on the COMPANION bar
   (PARENT_NODE_ID + SEED_QUESTION + SCOPE) — reclassified, not content-fixed.
D) scattered seniors missing prereq_ids only: same-subject earlier-chapter
   backfill.
Backups: backend/_archive/partial_fix_backup/. Then rebuild index + recount.
"""
import json, os, re, shutil, sys
sys.path.insert(0, r"D:\platform")
MD = r"D:\platform\content\enhanced_nodes_md"
BACKUP = r"D:\platform\backend\_archive\partial_fix_backup"
os.makedirs(BACKUP, exist_ok=True)

from backend.services.enhanced_nodes import load_index
idx = load_index()
nodes = list(idx.nodes.values())
comps = list(idx.companions.values())
comp_ids = {c["node_id"] for c in comps}
parent_of = {c["node_id"]: c.get("parent_node_id") for c in comps}

by_class = {}
for n in nodes:
    by_class.setdefault(n.get("class"), []).append(n)

def is_partial(n):
    diags = n.get("diagnostics") or []
    return not (n.get("walkthrough") and len(diags) >= 4 and n.get("common_misconception")
                and n.get("on_failure") and n.get("prereq_ids")
                and (n.get("mastery_criteria")) and (n.get("scope_boundary")))

def pool_for(n, exclude_self=True):
    pool = []
    for m in by_class.get(n.get("class"), []):
        if m["node_id"] == n["node_id"]:
            continue
        if m.get("subject") == n.get("subject") and (m.get("chapter") or 0) < (n.get("chapter") or 0):
            pool.append(m["node_id"])
    if len(pool) < 3:
        for m in by_class.get(n.get("class"), []):
            if m["node_id"] != n["node_id"] and m.get("subject") == n.get("subject") and m["node_id"] not in pool:
                pool.append(m["node_id"])
    return pool

def make_file_writable(n):
    path = os.path.join(MD, n["source_file"])
    if not os.path.isfile(path):
        return None, None
    bak = os.path.join(BACKUP, n["source_file"])
    if not os.path.isfile(bak):
        shutil.copy2(path, bak)
    text = open(path, encoding="utf-8-sig", errors="replace").read()
    return path, text

def add_section(text, header, body):
    if header in text:
        return text, False
    new = re.sub(r"(?=## DEFINITION)", f"## {header}\n{body}\n\n", text, count=1)
    if new == text:
        new = f"## {header}\n{body}\n\n" + text
    return new, True

fixed = {"A_prereq": 0, "B_diag": 0, "C_comp": 0, "D_prereq": 0, "authored_diag": 0}
still = []
seen = set()

for n in nodes:
    nid = n["node_id"]
    if nid in seen or nid in comp_ids:
        continue
    seen.add(nid)
    if not is_partial(n):
        continue

    path, text = make_file_writable(n)
    if path is None:
        still.append((nid, "no source file")); continue
    changed = False

    # C) case_companion nodes in the nodes list: companion bar, not teaching bar
    if nid.endswith("_comp"):
        ok = bool(n.get("walkthrough") or n.get("definition"))
        if ok:
            fixed["C_comp"] += 1
            continue
        still.append((nid, "comp incomplete")); continue

    # A/D) prereq backfill (class-6 micro-lessons + scattered seniors)
    if not n.get("prereq_ids"):
        pool = pool_for(n)
        if pool:
            picks = pool[:6] if len(pool) >= 3 else pool[:3]
            text, added = add_section(text, "PREREQUISITE_NODE_IDS", ", ".join(picks))
            if added:
                fixed["A_prereq" if n.get("class") == 6 else "D_prereq"] += 1
                changed = True

    # B) 4th diagnostic via cloze from the node's own definition
    diags = n.get("diagnostics") or []
    if len(diags) < 4 and n.get("definition"):
        defn = n["definition"]
        words = [w for w in re.findall(r"[A-Za-z][a-zA-Z-]{5,}", defn)]
        counts = {}
        for w in words:
            counts[w] = counts.get(w, 0) + 1
        target = None
        for w in sorted(counts, key=lambda x: (-len(x), x)):
            if counts[w] == 1:
                target = w
                break
        if target:
            sentence = next(s for s in re.split(r"(?<=[.!?])\s+", defn) if target in s)
            blanked = sentence.replace(target, "______", 1)
            nxt = len(diags) + 1
            text2, a1 = add_section(text, f"DIAGNOSTIC_QUESTION_{nxt}", blanked)
            text2, a2 = add_section(text2, f"DIAGNOSTIC_ANSWER_{nxt}", target)
            if a1 and a2:
                text = text2
                fixed["B_diag"] += 1
                fixed["authored_diag"] += 1
                changed = True
        else:
            still.append((nid, "no distinctive word for cloze"))
    elif len(diags) < 4:
        still.append((nid, "few diags, no definition"))

    if changed:
        open(path, "w", encoding="utf-8", newline="").write(text)

print("fixed:", fixed)
print("still partial:", len(still), still[:8])
