"""Load the validated enhanced-node graph + sims into Neo4j.

Idempotent: MERGE everywhere, safe to re-run after repairs.

Graph model:
  (:Node {node_id, class, subject, chapter, board, kind, depth,
          diagnostics, definition_snippet})
  (:Sim  {sim_id, title, class, subject, source})
  [:PREREQUISITE_OF | FORWARD_TO | LEADS_TO | BUILDS_ON |
   CROSS_SUBJECT_PREREQ]  between Nodes
  [:COVERS {strength}]          Sim -> Node

Structural edges are parsed straight from the md files' `## <SECTION>`
lines (the parser cache does not retain them). Broken targets are
skipped with a count.

Usage:  python backend/tools/load_graph_neo4j.py [--wipe]
"""
import glob
import json
import os
import sys
from collections import Counter

from neo4j import GraphDatabase

# In-repo copy first (content/md_cache — synced from the Desktop original so
# the graph is rebuildable on any machine); fall back to the Desktop path.
_MD_CANDIDATES = [
    os.path.join(os.path.dirname(os.path.abspath(__file__)),
                 "..", "..", "content", "md_cache"),
    r"C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache",
]
MD_DIR = os.environ.get("GRAPH_MD_DIR") or next(
    (p for p in _MD_CANDIDATES if os.path.isdir(p)), _MD_CANDIDATES[0])
MD_INDEX = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        "..", "_cache", "enhanced_nodes_index.json")
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..",
                    "frontend", "components")
AUDIT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                         "..", "its", "competency")

ENV = {}
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        "..", "..", ".env")
if os.path.exists(env_path):
    for line in open(env_path, encoding="utf-8", errors="ignore"):
        if "=" in line and not line.strip().startswith("#"):
            k, v = line.split("=", 1)
            ENV[k.strip()] = v.strip()
URI = (os.environ.get("NEO4J_URI") or ENV.get("NEO4J_URI")
       or "bolt://localhost:7687")
AUTH = ("neo4j",
        os.environ.get("NEO4J_PASSWORD") or ENV.get("NEO4J_PASSWORD", ""))

SECTION_MAP = {
    "PREREQUISITE_NODE_IDS": "PREREQUISITE_OF",
    "FORWARD_NODE_IDS": "FORWARD_TO",
    "LEADS_TO": "LEADS_TO",
    "BUILDS_ON": "BUILDS_ON",
    "CROSS_SUBJECT_PREREQS": "CROSS_SUBJECT_PREREQ",
}


def _env_of(node: dict) -> dict:
    return {
        "node_id": node.get("node_id"),
        "class": node.get("class"),
        "subject": node.get("subject"),
        "chapter": node.get("chapter"),
        "board": node.get("board"),
        "definition_snippet": (node.get("definition") or "")[:300],
        "diagnostics": len(node.get("diagnostics") or []),
    }


def _md_reference_edges(node_ids: set) -> tuple:
    """Parse the 5 reference sections from md files. Returns (rows, skipped)."""
    erows = []
    skipped = 0
    seen = set()
    for fname in sorted(os.listdir(MD_DIR)):
        if not fname.endswith(".md"):
            continue
        src = fname[:-3]
        try:
            text = open(os.path.join(MD_DIR, fname),
                        encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        for section, rel in SECTION_MAP.items():
            marker = "## " + section
            at = text.find(marker)
            if at < 0:
                continue
            line_start = text.find("\n", at)
            if line_start < 0:
                continue
            line_end = text.find("\n", line_start + 1)
            value_line = text[line_start + 1:
                              line_end if line_end > 0 else len(text)].strip()
            for tok in value_line.split(","):
                tgt = tok.strip()
                if not tgt or tgt == src:
                    continue
                if tgt not in node_ids:
                    skipped += 1
                    continue
                key = (src, rel, tgt)
                if key in seen:
                    continue
                seen.add(key)
                erows.append({"a": src, "b": tgt, "rel": rel})
    return erows, skipped


def _load_depth() -> dict:
    depth = {}
    audit_dirs = [AUDIT_DIR, os.path.join(ROOT, "sims_v2")]
    for base in audit_dirs:
        for f in os.listdir(base):
            if f.endswith("_NODE_DEPTH.json"):
                d = json.load(open(os.path.join(base, f), encoding="utf-8"))
                entries = d.get("entries") or d.get("nodes") or []
                if isinstance(entries, dict):
                    entries = list(entries.values())
                for e in entries:
                    if isinstance(e, dict) and e.get("node_id"):
                        depth[e["node_id"]] = e.get("verdict", "UNKNOWN")
    return depth


def main(wipe: bool = False) -> None:
    index = json.load(open(MD_INDEX, encoding="utf-8"))
    all_parsed = index["nodes"]
    # _comp case-study companions are a different artifact kind (comp/teaching
    # engine) — they never enter the node graph, per owner decision.
    nodes = [n for n in all_parsed
             if not str(n.get("node_id") or "").endswith("_comp")
             and n.get("kind") != "case_companion"]
    node_ids = {n.get("node_id") for n in nodes}
    print(f"index: {len(all_parsed)} parsed -> {len(nodes)} graph nodes "
          f"({len(all_parsed) - len(nodes)} companions excluded)")

    depth = _load_depth()
    print(f"depth verdicts: {len(depth)}")

    sims = {}
    for mapfile, source in (
        (os.path.join(ROOT, "sims_v2", "SIM_NODE_MAP_V2.json"), "v2"),
        (os.path.join(ROOT, "sims_v2", "LEGACY_SIM_MAP.json"), "legacy"),
    ):
        if os.path.exists(mapfile):
            m = json.load(open(mapfile, encoding="utf-8"))
            entries = m.get("sims") if isinstance(m, dict) else m
            for e in (entries or []):
                sid = e.get("simId") or e.get("sim_id") or e.get("file")
                if sid:
                    sims[str(sid)] = {
                        "sim_id": str(sid),
                        "title": str(e.get("title") or e.get("topic") or sid)[:120],
                        "class": e.get("class"),
                        "subject": e.get("subject"),
                        "source": source,
                    }
    map_path = os.path.join(AUDIT_DIR, "SIM_NODE_MAP.json")
    map_entries = json.load(open(map_path, encoding="utf-8")) \
        if os.path.exists(map_path) else []
    if isinstance(map_entries, dict):
        map_entries = map_entries.get("entries") or []

    # Primary inventory — SIM_INDEX.json (3k+ sims, authoritative node map).
    sim_index_path = os.path.join(ROOT, "sims_v2", "SIM_INDEX.json")
    if os.path.exists(sim_index_path):
        si = json.load(open(sim_index_path, encoding="utf-8"))
        for sid, e in si.items():
            sid = str(sid)
            sims[sid] = {
                "sim_id": sid,
                "title": str(e.get("t") or sid)[:120],
                "class": e.get("c"),
                "subject": e.get("s"),
                "source": "index",
            }
            map_entries.append({"simId": sid, "nodeIds": e.get("n") or []})

    # Hand-authored English grammar/composition sims (dream_sims project).
    ds_dir = os.environ.get("DREAM_SIMS_DIR",
                            r"C:/Users/Alesha4285/Desktop/dream_sims")
    ds_count = 0
    if os.path.isdir(ds_dir):
        import re as _re
        for ts in glob.glob(os.path.join(ds_dir, "class*/v3w/*.ts")):
            text = open(ts, encoding="utf-8", errors="ignore").read()
            sid = _re.search(r"id:\s*'([^']+)'", text)
            if not sid:
                continue
            sid = sid.group(1)
            def _m(p):
                m = _re.search(p, text)
                return m.group(1) if m else None
            lvl = _m(r"classLevel:\s*(\d+)")
            nids = _re.search(r"nodeIds:\s*\[([^\]]*)\]", text)
            sims[sid] = {
                "sim_id": sid,
                "title": str(_m(r"title:\s*'([^']+)'") or sid)[:120],
                "class": int(lvl) if lvl else None,
                "subject": _m(r"subject:\s*'([^']+)'"),
                "source": "dream_sims",
            }
            map_entries.append({
                "simId": sid,
                "nodeIds": _re.findall(r"'([^']+)'", nids.group(1)) if nids else [],
            })
            ds_count += 1
    print(f"sims: {len(sims)} total ({ds_count} dream_sims) "
          f"+ {len(map_entries)} cover entries")

    drv = GraphDatabase.driver(URI, auth=AUTH)
    with drv.session(database="neo4j") as s:
        if wipe:
            s.run("MATCH (n) DETACH DELETE n")
            print("wiped existing graph")
        s.run("CREATE CONSTRAINT node_id IF NOT EXISTS "
              "FOR (n:Node) REQUIRE n.node_id IS UNIQUE")
        s.run("CREATE CONSTRAINT sim_id IF NOT EXISTS "
              "FOR (x:Sim) REQUIRE x.sim_id IS UNIQUE")

        rows = []
        for n in nodes:
            props = _env_of(n)
            dv = depth.get(props["node_id"])
            if dv:
                props["depth"] = dv
            rows.append(props)
        for i in range(0, len(rows), 500):
            s.run("""
                UNWIND $rows AS row
                MERGE (n:Node {node_id: row.node_id})
                SET n += row
            """, rows=rows[i:i + 500])
        print(f"nodes written: {len(rows)}")

        erows, skipped = _md_reference_edges(node_ids)
        rel_counts = Counter(r["rel"] for r in erows)
        by_rel = {}
        for r in erows:
            by_rel.setdefault(r["rel"], []).append(r)
        for rel, rows_r in by_rel.items():
            for i in range(0, len(rows_r), 1000):
                s.run(f"""
                    UNWIND $rows AS row
                    MATCH (a:Node {{node_id: row.a}}), (b:Node {{node_id: row.b}})
                    MERGE (a)-[:{rel}]->(b)
                """, rows=rows_r[i:i + 1000])
        print(f"edges written: {len(erows)} (skipped broken refs: {skipped})")
        print("  by type:", dict(rel_counts))

        sim_rows = list(sims.values())
        for e in map_entries:
            sid = e.get("simId") or e.get("file")
            if sid and str(sid) not in sims:
                sim_rows.append({"sim_id": str(sid),
                                 "title": str(e.get("title") or sid)[:120],
                                 "class": e.get("class"),
                                 "subject": e.get("subject"),
                                 "source": "c6_12"})
        for i in range(0, len(sim_rows), 500):
            s.run("""
                UNWIND $rows AS row
                MERGE (x:Sim {sim_id: row.sim_id})
                SET x += row
            """, rows=sim_rows[i:i + 500])
        print("sims written:", len(sim_rows))

        cover = []
        seen = set()
        for e in map_entries:
            sid = e.get("simId") or e.get("file")
            for nid in (e.get("nodeIds") or []):
                key = (str(sid), nid)
                if key not in seen:
                    seen.add(key)
                    cover.append({"sim": str(sid), "node": nid,
                                  "strength": e.get("matchStrength", "mapped")})
        v2map = json.load(open(os.path.join(
            ROOT, "sims_v2", "SIM_NODE_MAP_V2.json"), encoding="utf-8"))
        for e in (v2map.get("sims") or []):
            sid = e.get("simId") or e.get("file")
            for nid in (e.get("nodeIds") or []):
                key = (str(sid), nid)
                if key not in seen:
                    seen.add(key)
                    cover.append({"sim": str(sid), "node": nid, "strength": "v2"})
        legacy = json.load(open(os.path.join(
            ROOT, "sims_v2", "LEGACY_SIM_MAP.json"), encoding="utf-8"))
        legacy_entries = legacy.get("sims") if isinstance(legacy, dict) else legacy
        for e in (legacy_entries or []):
            sid = e.get("simId") or e.get("file")
            for nid in (e.get("nodeIds") or []):
                key = (str(sid), nid)
                if key not in seen:
                    seen.add(key)
                    cover.append({"sim": str(sid), "node": nid, "strength": "legacy"})
        for i in range(0, len(cover), 1000):
            s.run("""
                UNWIND $rows AS row
                MERGE (x:Sim {sim_id: row.sim})
                MERGE (n:Node {node_id: row.node})
                MERGE (x)-[r:COVERS]->(n)
                SET r.strength = row.strength
            """, rows=cover[i:i + 1000])
        print("COVERS relationships:", len(cover))

        stats = s.run("""
            MATCH (n:Node) WITH count(n) AS nodes
            MATCH ()-[r]->() RETURN nodes, count(r) AS rels
        """).single()
        gold = s.run(
            "MATCH (n:Node {depth:'GOLD'}) RETURN count(n) AS c").single()["c"]
        print(f"GRAPH LOADED: nodes={stats['nodes']} rels={stats['rels']} gold={gold}")
    drv.close()


if __name__ == "__main__":
    main(wipe="--wipe" in sys.argv)
