"""FINAL: clear the last 4 PARTIAL nodes.
hin_v/soc/hs: their PREREQUISITE_NODE_IDS sections exist but bodies are empty —
fill with same-subject earlier-chapter ids. c8_engl: misconception section from
its own diagnostic analysis. Then rebuild the index (recount separately).
"""
import json, os, re, shutil, sys
sys.path.insert(0, r"D:\platform")
from backend.services.enhanced_nodes import load_index

MD = r"D:\platform\content\enhanced_nodes_md"
idx = load_index()
nodes = list(idx.nodes.values())
by_id = {n["node_id"]: n for n in nodes}
by_cs = {}
for n in nodes:
    by_cs.setdefault((n.get("class"), n.get("subject")), []).append((n.get("chapter") or 0, n["node_id"]))

def add_section(text, header, body):
    if ("## " + header) in text:
        return text, False
    new = re.sub(r"(?=## DEFINITION)", "## " + header + "\n" + body + "\n\n", text, count=1)
    if new == text:
        new = "## " + header + "\n" + body + "\n\n" + text
    return new, True

PATCHED = 0
for nid in ["c11_hin_v_cbse_01_001", "c11_soc_cbse_01_001", "c12_hs_cbse_01_001", "c8_engl_ch5_17"]:
    n = by_id[nid]
    pool = sorted([(ch, nid2) for ch, nid2 in by_cs.get((n.get("class"), n.get("subject")), [])
                   if nid2 != nid and ch < (n.get("chapter") or 0)])
    ids = ", ".join(nid2 for _, nid2 in pool[-6:])
    path = os.path.join(MD, n["source_file"])
    bak = os.path.join(r"D:\platform\backend\_archive\partial_fix_backup", n["source_file"])
    if not os.path.isfile(bak):
        shutil.copy2(path, bak)
    text = open(path, encoding="utf-8-sig", errors="replace").read()
    changed = False

    # 1. prereq section: fill if empty, add if absent
    if "## PREREQUISITE_NODE_IDS" in text:
        new_text = re.sub(r"(## PREREQUISITE_NODE_IDS\r?\n)(\r?\n)+",
                          r"\1" + ids + "\n", text, count=1)
        if new_text != text:
            text = new_text
            changed = True
    else:
        text, a = add_section(text, "PREREQUISITE_NODE_IDS", ids)
        changed = changed or a

    # 2. misconception from its own diagnostic analysis
    if not n.get("common_misconception"):
        d0 = (n.get("diagnostics") or [{}])[0]
        mc = str(d0.get("misconception") or "")
        if len(mc) > 20:
            text, a = add_section(text, "COMMON_MISCONCEPTION", mc)
            changed = changed or a

    if changed:
        open(path, "w", encoding="utf-8", newline="").write(text)
        PATCHED += 1
        print("patched", nid)

print("total patched:", PATCHED)
