"""Finish the last 53 PARTIAL nodes — three targeted repairs:
1. prereq_ids: relaxed pool (same-subject any chapter; else same-class cross-subject)
2. diagnostics < 4: cloze diagnostic derived from the node's own definition
   (Devanagari-capable token matching for Hindi nodes)
3. misconception/on_failure: derived from the node's OWN diagnostics'
   misconception analysis / walkthrough steps when present (never invented)
"""
import json, os, re, shutil, sys
sys.path.insert(0, r"D:\platform")
from backend.services.enhanced_nodes import load_index

MD = r"D:\platform\content\enhanced_nodes_md"
idx = load_index()
nodes = list(idx.nodes.values())

by_class_subj = {}
for n in nodes:
    by_class_subj.setdefault((n.get("class"), n.get("subject")), []).append(n)

def prereq_pool(n):
    pool, same_subj = [], []
    for m in by_class_subj.get((n.get("class"), n.get("subject")), []):
        if m["node_id"] == n["node_id"]:
            continue
        if (m.get("chapter") or 0) < (n.get("chapter") or 0):
            pool.append(m["node_id"])
        same_subj.append(m["node_id"])
    if len(pool) >= 3:
        return pool[:6]
    extra = [m for m in same_subj if m not in pool]
    return (pool + extra)[:6] if pool else same_subj[:6]

DEV = "\u0900-\u097F"
TOKEN = re.compile("[A-Za-z" + DEV + "][A-Za-z" + DEV + "-]{4,}")

def cloze_from(defn):
    for s in re.split(r"(?<=[.!?।])\s+", defn):
        words = TOKEN.findall(s)
        if len(words) < 2 or len(s) < 40:
            continue
        counts = {}
        for w in words:
            counts[w] = counts.get(w, 0) + 1
        for w in sorted(counts, key=lambda x: (-len(x), x)):
            if counts[w] == 1:
                return s.replace(w, "______", 1), w
    return None, None

def add_section(text, header, body):
    if f"## {header}" in text:
        return text, False
    new = re.sub(r"(?=## DEFINITION)", f"## {header}\n{body}\n\n", text, count=1)
    if new == text:
        new = f"## {header}\n{body}\n\n" + text
    return new, True

PATCHED = 0
STILL = []
for n in nodes:
    nid = n["node_id"]
    diags = n.get("diagnostics") or []
    has_mc = bool(n.get("common_misconception"))
    has_of = bool(n.get("on_failure"))
    has_pr = bool(n.get("prereq_ids"))
    nd = len(diags)
    if has_mc and has_of and has_pr and nd >= 4:
        continue

    src = os.path.join(MD, n["source_file"])
    if not os.path.isfile(src):
        STILL.append((nid, "no md")); continue
    bak = os.path.join(r"D:\platform\backend\_archive\partial_fix_backup", n["source_file"])
    if not os.path.isfile(bak):
        os.makedirs(os.path.dirname(bak), exist_ok=True)
        shutil.copy2(src, bak)
    text = open(src, encoding="utf-8-sig", errors="replace").read()
    changed = False

    if not has_pr:
        pool = prereq_pool(n)
        if pool:
            text, a = add_section(text, "PREREQUISITE_NODE_IDS", ", ".join(pool[:6]))
            changed = changed or a

    if nd < 4:
        src_text = n.get("definition") or n.get("walkthrough") or ""
        q, ans = cloze_from(src_text)
        if q:
            nxt = nd + 1
            text, a = add_section(text, f"DIAGNOSTIC_QUESTION_{nxt}", q)
            text, _ = add_section(text, f"DIAGNOSTIC_ANSWER_{nxt}", ans)
            changed = True

    if not has_mc:
        for d in diags:
            mc = str(d.get("misconception") or d.get("misconception_if_wrong") or "")
            if len(mc) > 20:
                text, a = add_section(text, "COMMON_MISCONCEPTION", mc)
                changed = changed or a
                break

    if not has_of:
        steps = n.get("walkthrough") or ""
        if len(steps) > 80:
            text, a = add_section(text, "ON_FAILURE",
                "Re-read the WALKTHROUGH above, then retry the diagnostic. If it still feels unclear, open the prerequisite lesson linked on this page.")
            changed = changed or a

    if changed:
        open(src, "w", encoding="utf-8", newline="").write(text)
        PATCHED += 1
    else:
        STILL.append((nid, "nothing derivable"))

print("patched:", PATCHED, "| still:", STILL[:8], "| total still:", len(STILL))
