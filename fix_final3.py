"""Insert PREREQUISITE_NODE_IDS bodies into the 3 straggler files — verified write."""
import json, re

by_id = {}
idx = json.load(open(r"D:\platform\backend\_cache\enhanced_nodes_index.json", encoding="utf-8"))
by_cs = {}
for n in idx["nodes"]:
    by_cs.setdefault((n.get("class"), n.get("subject")), []).append((n.get("chapter") or 0, n["node_id"]))

for nid in ["c11_hin_v_cbse_01_001", "c11_soc_cbse_01_001", "c12_hs_cbse_01_001"]:
    n = None
    for x in idx["nodes"]:
        if x["node_id"] == nid:
            n = x
            break
    pool = sorted([(x.get("chapter") or 0, x["node_id"]) for x in idx["nodes"]
                   if x.get("class") == n["class"] and x.get("subject") == n["subject"]
                   and (x.get("chapter") or 0) < (n.get("chapter") or 0)])
    ids = ", ".join(nid2 for _, nid2 in pool[-6:])
    p = r"D:\platform\content\enhanced_nodes_md" + "\\" + n["source_file"]
    raw = open(p, "rb").read()
    hdr = b"## PREREQUISITE_NODE_IDS"
    if hdr in raw:
        # replace the empty body: header line + following blank lines
        new = re.sub(rb"(## PREREQUISITE_NODE_IDS\r?\n)(\r?\n)+",
                     rb"\1" + ids.encode("utf-8") + rb"\n\n", raw, count=1)
    else:
        new = raw + b"\n\n## PREREQUISITE_NODE_IDS\n" + ids.encode("utf-8") + b"\n"
    if new != raw:
        open(p, "wb").write(new)
        check = open(p, "rb").read()
        print(nid, "written, verify-in-file:", b"PREREQUISITE_NODE_IDS\n" + ids.encode("utf-8")[:20] in check)
    else:
        print(nid, "NO CHANGE — pattern miss")
