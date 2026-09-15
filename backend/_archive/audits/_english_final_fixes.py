"""Final English fixes:
1. Reclassify c11_eng_007 and c12_eng_007_* as English Language (grammar/writing skills)
2. Extract class 2 literature nodes from broken JSON using regex
"""
import re
from pathlib import Path
from neo4j import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

# 1. Reclassify language-skill nodes in classes 11-12
print("=== Reclassifying class 11-12 language nodes ===")
# c11_eng_007 = "Sentence transformation" — this is Language, not Literature
# c12_eng_007_a through _f = sentence transformation parts — Language
# c12_eng_001, c12_eng_001a-e = composition writing — Language
LANGUAGE_NODE_PATTERNS = [
    r'^c11_eng_007$',
    r'^c12_eng_007_[a-f]$',
    r'^c12_eng_001[a-e]?$',
    r'^c12_eng_002$',
    r'^c12_eng_003$',
    r'^c12_eng_004$',
    r'^c12_eng_005$',
]

with driver.session() as session:
    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.class_level IN [11,12] AND n.subject = 'English Literature' "
        "RETURN n.node_id as nid, n.topic as topic"
    )
    to_reclassify = []
    for r in result:
        nid = r["nid"]
        for pat in LANGUAGE_NODE_PATTERNS:
            if re.match(pat, nid):
                to_reclassify.append(nid)
                break
        # Also check topic for language keywords
        topic = r["topic"].lower()
        if any(kw in topic for kw in ["sentence transformation", "composition", "essay writing",
                                       "grammar", "comprehension", "writing skill"]):
            if nid not in to_reclassify:
                to_reclassify.append(nid)

    if to_reclassify:
        result2 = session.run(
            "MATCH (n:KnowledgeNode) WHERE n.node_id IN $ids "
            "SET n.subject = 'English Language' RETURN count(*) as updated",
            ids=to_reclassify,
        )
        print(f"  Reclassified {result2.single()['updated']} nodes to English Language:")
        for nid in to_reclassify:
            print(f"    {nid}")

# 2. Extract class 2 literature nodes from broken JSON using regex
print("\n=== Extracting class 2 literature nodes from broken JSON ===")
f = Path(r"D:\platform\organized\english\class2\enrichment\c2_eng_lit_205_208_subnodes.json")
content = f.read_text(encoding="utf-8")

# Find all BOOK_NNN blocks and their sub_nodes
# Pattern: "BOOK_205": { "title": "...", ... "sub_nodes": [ { "id": "...", "label": "...", ... } ] }
book_pattern = re.compile(r'"BOOK_(\d+)":\s*\{[^}]*?"title":\s*"([^"]+)"', re.DOTALL)
sub_node_pattern = re.compile(r'"id":\s*"([^"]+)"[^}]*?"label":\s*"([^"]+)"', re.DOTALL)

books = book_pattern.finditer(content)
added = 0
for book_match in books:
    book_num = book_match.group(1)
    book_title = book_match.group(2)
    # Find sub_nodes within this book block
    start = book_match.end()
    # Find the next BOOK_ or end of file
    next_book = content.find('"BOOK_', start)
    if next_book == -1:
        book_section = content[start:]
    else:
        book_section = content[start:next_book]

    sub_matches = sub_node_pattern.finditer(book_section)
    for sm in sub_matches:
        sn_id = sm.group(1)
        label = sm.group(2)
        nid = f"c2_eng_lit_{book_num}_{sn_id}"
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
                nid=nid, title=title[:300], snippet=title[:200], src=f.name,
            )
        added += 1
        print(f"  Added: {nid} — {title[:50]}")

print(f"  Total class 2 literature nodes added: {added}")

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
