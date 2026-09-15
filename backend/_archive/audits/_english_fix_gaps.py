"""Fix English gaps:
1. Classes 6-8 literature nodes are marked as "English Language" but should be "English Literature"
2. Class 2 English Language nodes missing — check what's on disk
3. Class 11 English Language missing — check if it's classified as Literature
"""
import json
import re
from pathlib import Path
from neo4j import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

# 1. Check what's in Neo4j for classes 6-8 English
print("=== Classes 6-8 English nodes in Neo4j ===")
with driver.session() as session:
    for cls in [6, 7, 8]:
        result = session.run(
            "MATCH (n:KnowledgeNode) WHERE n.class_level = $cls AND n.subject CONTAINS 'English' "
            "RETURN n.node_id as nid, n.subject as subj, n.topic as topic ORDER BY nid",
            cls=cls,
        )
        nodes = list(result)
        print(f"\nClass {cls}: {len(nodes)} nodes")
        for n in nodes[:10]:
            print(f"  {n['nid']}: [{n['subj']}] {n['topic'][:60]}")

# 2. Check class 2 and 11
print("\n=== Class 2 English nodes ===")
with driver.session() as session:
    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.class_level = 2 AND n.subject CONTAINS 'English' "
        "RETURN n.node_id as nid, n.subject as subj, n.topic as topic"
    )
    nodes = list(result)
    print(f"Class 2: {len(nodes)} nodes")
    for n in nodes:
        print(f"  {n['nid']}: [{n['subj']}] {n['topic'][:60]}")

print("\n=== Class 11 English Language nodes ===")
with driver.session() as session:
    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.class_level = 11 AND n.subject = 'English Language' "
        "RETURN n.node_id as nid, n.topic as topic"
    )
    nodes = list(result)
    print(f"Class 11 English Language: {len(nodes)} nodes")

# 3. Check what's on disk for class 2
print("\n=== Class 2 English content on disk ===")
c2_path = Path(r"D:\platform\organized\english\class2\enrichment")
if c2_path.exists():
    for f in sorted(c2_path.iterdir()):
        print(f"  {f.name} ({f.stat().st_size} bytes)")
        if f.suffix == ".json":
            try:
                data = json.loads(f.read_text(encoding="utf-8"))
                if isinstance(data, dict):
                    subs = data.get("sub_nodes", data.get("subnodes", []))
                    for sn in subs[:5]:
                        if isinstance(sn, dict):
                            print(f"    → {sn.get('node_id','')}: {sn.get('title','')[:50]}")
            except:
                pass

# 4. Fix: Reclassify class 6-8 literature nodes
# Nodes with IDs like c6_eng_101_*, c6_eng_203_*, c7_eng_205_*, c8_eng_201_*, c8_eng_215_*
# are literature (text analysis) not language (grammar)
print("\n=== Fixing class 6-8 literature classification ===")
LITERATURE_PATTERNS = [
    r'^c[678]_eng_1\d{2}',     # c6_eng_101, c7_eng_101, c8_eng_101 (literature texts)
    r'^c[678]_eng_2\d{2}',     # c6_eng_201, c7_eng_201, c8_eng_201 (literature texts)
    r'^c[678]_eng_lit',        # c6_eng_lit_*, c7_eng_lit_*
    r'^c[678]_eng_203_sub',    # c6_eng_203_sub_* (Animal Farm sub-nodes)
]

with driver.session() as session:
    for cls in [6, 7, 8]:
        result = session.run(
            "MATCH (n:KnowledgeNode) WHERE n.class_level = $cls AND n.subject = 'English Language' "
            "RETURN n.node_id as nid, n.topic as topic",
            cls=cls,
        )
        to_update = []
        for r in result:
            nid = r["nid"]
            topic = r["topic"]
            # Check if this is literature (text analysis) vs language (grammar)
            is_literature = False
            for pat in LITERATURE_PATTERNS:
                if re.match(pat, nid):
                    is_literature = True
                    break
            # Also check topic for literature keywords
            if not is_literature:
                lit_keywords = ["characters", "plot", "theme", "symbolism", "allegory",
                               "animal farm", "hobbit", "maus", "treasure island",
                               "tuck", "shakespeare", "drama", "poem", "literary",
                               "narrative", "character analysis", "imagery"]
                for kw in lit_keywords:
                    if kw in topic.lower():
                        is_literature = True
                        break

            if is_literature:
                to_update.append(nid)

        if to_update:
            result2 = session.run(
                "MATCH (n:KnowledgeNode) WHERE n.node_id IN $ids "
                "SET n.subject = 'English Literature' "
                "RETURN count(*) as updated",
                ids=to_update,
            )
            updated = result2.single()["updated"]
            print(f"  Class {cls}: reclassified {updated} nodes to English Literature")
            for nid in to_update[:5]:
                print(f"    {nid}")

# 5. Load class 2 English from disk
print("\n=== Loading class 2 English from disk ===")
c2_grammar = Path(r"D:\platform\organized\english\class2\enrichment\c2_eng_001_grammar_nodes.json")
c2_lit = Path(r"D:\platform\organized\english\class2\enrichment\c2_eng_lit_205_208_subnodes.json")

for fpath in [c2_grammar, c2_lit]:
    if not fpath.exists():
        print(f"  {fpath.name}: NOT FOUND")
        continue
    try:
        data = json.loads(fpath.read_text(encoding="utf-8"))
        subs = data.get("sub_nodes", data.get("subnodes", []))
        print(f"  {fpath.name}: {len(subs)} sub_nodes")
        for sn in subs:
            if isinstance(sn, dict):
                nid = sn.get("node_id", "")
                title = sn.get("title", "")
                subject = sn.get("subject", "English Language")
                prereqs = sn.get("prerequisites", [])
                if nid:
                    with driver.session() as session:
                        session.run(
                            """
                            MERGE (n:KnowledgeNode {node_id: $nid})
                            SET n.topic = $title, n.subject = $subject, n.class_level = 2,
                                n.board = 'CISCE', n.difficulty = 'medium',
                                n.estimated_time = 30, n.is_root = false,
                                n.concept_tags = [], n.content_snippet = $snippet,
                                n.prerequisite_node_ids = $prereqs, n.source_file = $src
                            """,
                            nid=nid, title=title[:300], subject=subject,
                            snippet=title[:200], prereqs=prereqs, src=fpath.name,
                        )
                    print(f"    Added: {nid} [{subject}]")
    except Exception as e:
        print(f"  ERROR: {e}")

# Final verification
print("\n=== FINAL English counts ===")
with driver.session() as session:
    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' "
        "RETURN n.subject as subj, n.class_level as cls, count(*) as cnt "
        "ORDER BY subj, cls"
    )
    by_subj = {}
    for r in result:
        key = r["subj"]
        if key not in by_subj:
            by_subj[key] = []
        by_subj[key].append(f"C{r['cls']}:{r['cnt']}")
    for subj in sorted(by_subj.keys()):
        print(f"  {subj}: {', '.join(by_subj[subj])}")

    result2 = session.run("MATCH (n:KnowledgeNode) RETURN count(*) as total")
    print(f"\n  Total KnowledgeNodes: {result2.single()['total']}")

driver.close()
