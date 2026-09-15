"""Parse and load class 2 English from non-standard JSON files.
Also check class 11 English Language content."""
import json
import re
from pathlib import Path
from neo4j import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

# === CLASS 2 ===
print("=== Loading Class 2 English ===")

# File 1: c2_eng_001_grammar_nodes.json — starts with ```json fence
f1 = Path(r"D:\platform\organized\english\class2\enrichment\c2_eng_001_grammar_nodes.json")
content = f1.read_text(encoding="utf-8")
# Strip markdown code fences
content = re.sub(r'^```json\s*', '', content)
content = re.sub(r'\s*```\s*$', '', content)
try:
    data = json.loads(content)
    subs = data.get("sub_nodes", [])
    print(f"  Grammar nodes: {len(subs)} sub_nodes")
    for i, sn in enumerate(subs):
        nid = f"c2_eng_001_{chr(97 + i)}"  # c2_eng_001_a, _b, _c, _d
        title = sn.get("title", "")
        skill = sn.get("skill", "")
        with driver.session() as session:
            session.run(
                """
                MERGE (n:KnowledgeNode {node_id: $nid})
                SET n.topic = $title, n.subject = 'English Language', n.class_level = 2,
                    n.board = 'CISCE', n.difficulty = 'medium',
                    n.estimated_time = 20, n.is_root = false,
                    n.concept_tags = [], n.content_snippet = $snippet,
                    n.source_file = $src
                """,
                nid=nid, title=title[:300], snippet=title[:200], src=f1.name,
            )
        print(f"    Added: {nid} — {title[:50]}")
except Exception as e:
    print(f"  ERROR parsing grammar_nodes: {e}")

# File 2: c2_eng_lit_205_208_subnodes.json — uses BOOK_NNN structure
f2 = Path(r"D:\platform\organized\english\class2\enrichment\c2_eng_lit_205_208_subnodes.json")
try:
    data = json.loads(f2.read_text(encoding="utf-8"))
    # Structure: { "meta": {...}, "BOOK_205": { "title":..., "sub_nodes": [...] }, ... }
    added = 0
    for key, val in data.items():
        if not key.startswith("BOOK_"):
            continue
        book_num = key.replace("BOOK_", "")
        book_title = val.get("title", "")
        sub_nodes = val.get("sub_nodes", [])
        for sn in sub_nodes:
            sn_id = sn.get("id", "")
            nid = f"c2_eng_lit_{book_num}_{sn_id}"
            label = sn.get("label", "")
            title = f"{book_title} — {label}"
            with driver.session() as session:
                session.run(
                    """
                    MERGE (n:KnowledgeNode {node_id: $nid})
                    SET n.topic = $title, n.subject = 'English Literature', n.class_level = 2,
                        n.board = 'CISCE', n.difficulty = 'easy',
                        n.estimated_time = 15, n.is_root = false,
                        n.concept_tags = [], n.content_snippet = $snippet,
                        n.source_file = $src
                    """,
                    nid=nid, title=title[:300], snippet=title[:200], src=f2.name,
                )
            added += 1
    print(f"  Literature nodes: {added} sub_nodes from {f2.name}")
except Exception as e:
    print(f"  ERROR parsing lit_subnodes: {e}")

# === CLASS 11 English Language ===
print("\n=== Checking Class 11 English Language ===")
# Check what class 11 English content exists on disk
c11_granular = Path(r"D:\platform\parsed_output\english_granular_nodes")
c11_files = list(c11_granular.glob("c11_eng_*_subnodes.json"))
print(f"  Class 11 granular files: {len(c11_files)}")
for f in c11_files[:5]:
    print(f"    {f.name}")

# Check enrichment markers for class 11
c11_enrich = Path(r"D:\platform\organized\english\class11\enrichment")
if c11_enrich.exists():
    files = list(c11_enrich.iterdir())
    print(f"  Class 11 enrichment files: {len(files)}")
    for f in files:
        print(f"    {f.name}")

# Check cisce/eng/enrichment for class 11 markers
c11_cisce = Path(r"D:\cisce\eng\enrichment")
c11_markers = list(c11_cisce.glob("c11_eng_*"))
print(f"  CISCE eng class 11 markers: {len(c11_markers)}")
for f in c11_markers[:10]:
    print(f"    {f.name}")

# The ISC English Language paper covers: essay writing, comprehension, grammar
# Check if there are any language-focused nodes in class 11
print("\n  Class 11 English nodes in Neo4j:")
with driver.session() as session:
    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.class_level = 11 AND n.subject CONTAINS 'English' "
        "RETURN n.subject as subj, n.node_id as nid, n.topic as topic ORDER BY nid LIMIT 20"
    )
    for r in result:
        print(f"    {r['nid']}: [{r['subj']}] {r['topic'][:60]}")

# Final counts
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
