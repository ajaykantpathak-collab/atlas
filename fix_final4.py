"""Final 4-node gold pass — add the ONE missing section per node."""
import json, os, re, shutil, sys
sys.path.insert(0, r"D:\platform")
from backend.services.enhanced_nodes import load_index

MD = r"D:\platform\content\enhanced_nodes_md"
idx = load_index()
nodes = list(idx.nodes.values())
by_cs = {}
for n in nodes:
    by_cs.setdefault((n.get("class"), n.get("subject")), []).append((n.get("chapter") or 0, n["node_id"]))

def add_sec(text, header, body):
    if "## " + header in text:
        return text, False
    new = re.sub(r"(?=## DEFINITION)", "## " + header + "\n" + body + "\n\n", text, count=1)
    if new == text:
        new = "## " + header + "\n" + body + "\n\n" + text
    return new, True

TARGETS = ["c11_hin_v_cbse_01_001", "c11_soc_cbse_01_001", "c12_hs_cbse_01_001", "c8_engl_ch5_17"]
by_id = {n["node_id"]: n for n in nodes}

for nid in TARGETS:
    n = by_id[nid]
    path = os.path.join(MD, n["source_file"])
    bak = os.path.join(r"D:\platform\backend\_archive\partial_fix_backup", n["source_file"])
    if not os.path.isfile(bak):
        os.makedirs(os.path.dirname(bak), exist_ok=True)
        shutil.copy2(path, bak)
    text = open(path, encoding="utf-8-sig", errors="replace").read()
    added = []

    if not n.get("prereq_ids") and "## PREREQUISITE_NODE_IDS" not in text:
        pool = [nid2 for ch, nid2 in sorted(by_cs.get((n.get("class"), n.get("subject")), []))
                if ch < (n.get("chapter") or 0) and nid2 != nid]
        if pool:
            text, _ = add_sec(text, "PREREQUISITE_NODE_IDS", ", ".join(pool[-6:]))
            added.append("prereqs")

    if not n.get("common_misconception"):
        d0 = (n.get("diagnostics") or [{}])[0]
        mc = str(d0.get("misconception") or "")
        if len(mc) > 20:
            text, _ = add_sec(text, "COMMON_MISCONCEPTION", mc)
            added.append("misconception")

    print(nid, "->", added or "still open")
