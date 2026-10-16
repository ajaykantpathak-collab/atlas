"""One-shot: fill the 3 empty PREREQUISITE_NODE_IDS bodies. Exact bytes."""
import json

idx = json.load(open(r"D:\platform\backend\_cache\enhanced_nodes_index.json", encoding="utf-8"))
by_id = {n["node_id"]: n for n in idx["nodes"]}
by_cs = {}
for n in idx["nodes"]:
    by_cs.setdefault((n.get("class"), n.get("subject")), []).append((n.get("chapter") or 0, n["node_id"]))

for nid in ["c11_hin_v_cbse_01_001", "c11_soc_cbse_01_001", "c12_hs_cbse_01_001"]:
    n = by_id[nid]
    pool = sorted([(c, x) for c, x in by_cs.get((n["class"], n["subject"]), []) if c < (n["chapter"] or 0) and x != nid])
    ids = ", ".join(x for _, x in pool[-6:])
    p = r"D:\platform\content\enhanced_nodes_md" + "\\" + n["source_file"]
    raw = open(p, "rb").read()
    ids_b = ids.encode("utf-8")
    new = None
    for pat in (b"## PREREQUISITE_NODE_IDS\r\n\r\n",
                b"## PREREQUISITE_NODE_IDS\n\n\n",
                b"## PREREQUISITE_NODE_IDS\n\n",
                b"## PREREQUISITE_NODE_IDS\r\n"):
        if pat in raw:
            new = raw.replace(pat, b"## PREREQUISITE_NODE_IDS\n" + ids_b + b"\n\n", 1)
            break
    if new is None:
        print(nid, "-> pattern miss")
        continue
    open(p, "wb").write(new)
    check = open(p, "rb").read()
    ok = (b"PREREQUISITE_NODE_IDS\n" + ids_b[:20]) in check
    print(nid, "-> written, ids-in-file:", ok)
