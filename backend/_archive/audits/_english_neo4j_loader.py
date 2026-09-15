"""Load English nodes into Neo4j — creates KnowledgeNode, Subject, Chapter nodes + REQUIRES edges.

Reads from: D:\platform\backend\_english_full_inventory.json
Writes to:  Neo4j (bolt://localhost:7687)

SAFETY: Only uses MERGE (idempotent). Never deletes or modifies existing nodes.
        Only adds English subject nodes that don't already exist.
"""
import json
import re
from pathlib import Path
from collections import defaultdict
from neo4j import GraphDatabase

NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "dream_neo4j_2024"

INVENTORY_PATH = Path(r"D:\platform\backend\_english_full_inventory.json")

# Node IDs to SKIP — these are supporting files, not curriculum nodes
SKIP_PATTERNS = [
    r'_teachers_guide',
    r'_vocab\b',
    r'_flashcards',
    r'_practice_sheet',
    r'_worksheet',
    r'_quiz',
    r'_diagnostic',
    r'_diagnostics',
    r'_quickref',
    r'_quick_reference',
    r'_reference\b',
    r'_rubric',
    r'_exam_prep',
    r'_exam_practice',
    r'_exam_questions',
    r'_supporting',
    r'_support_',
    r'_content\.md$',
    r'_markers\.md$',
    r'_SUMMARY',
    r'_index\b',
    r'_readme',
    r'_log\b',
    r'_manifest',
    r'_subnodes_index',
    r'_skill\d',
    r'_consolidated',
    r'_combined',
    r'_gap_fill',
    r'_error_hunt',
    r'_spot_correct',
    r'_verified',
    r'_master_grid',
    r'_walkthrough',
    r'_short_summary',
    r'enrichment_marker',
    r'enrichment\.marker$',
    r'_enrichment_log',
    r'_continuation',
    r'_name_vs_sound',
    r'_Q\d',
    r'sub_node_',  # generic sub_node files without proper node_id
    r'subnode_[a-z]$',  # single-letter subnode files
    r'sub-nodes\.json',
    r'subnodes\.json$',
    r'subnodes_index',
    r'character_map',
    r'timeline\.json',
    r'device_register',
    r'vocabulary_flashcards',
    r'meta\.json',
    r'000_INDEX',
]

def should_skip(node_id, title):
    """Check if a node should be skipped (supporting file, not curriculum node)."""
    for pattern in SKIP_PATTERNS:
        if re.search(pattern, node_id, re.IGNORECASE):
            return True
    # Skip nodes with no proper node_id format
    if not re.match(r'c\d+_[a-z]+_\w+', node_id):
        return True
    # Skip very short titles that look like filenames
    if title.endswith('.md') or title.endswith('.json') or title.endswith('.content'):
        return True
    return False


def fix_class_0(node):
    """Fix nodes with class 0 by inferring from node_id."""
    if node["class"] == 0:
        # ctc_203 → class 6 (Charlie and the Chocolate Factory is class 6 literature)
        if node["node_id"].startswith("ctc_"):
            node["class"] = 6
            node["subject"] = "English Literature"
        else:
            m = re.match(r'c(\d+)', node["node_id"])
            if m:
                node["class"] = int(m.group(1))
    return node


def determine_subject(node_id, subject, cls):
    """Refine subject assignment based on class and node_id."""
    if "engelec" in node_id:
        return "Elective English"
    if "engmod" in node_id:
        return "Modern English"
    if subject in ("Elective English", "Modern English"):
        return subject
    # Classes 1-8: English Language (grammar, writing, comprehension)
    # Classes 9-10: English Language + English Literature (ICSE has both)
    # Classes 11-12: English Literature (ISC) + Elective English + Modern English
    if cls <= 8:
        return "English Language"
    # For classes 9-12, keep whatever was detected
    return subject


def main():
    # Load inventory
    with open(INVENTORY_PATH, encoding="utf-8") as f:
        nodes = json.load(f)
    print(f"Loaded {len(nodes)} nodes from inventory")

    # Filter and fix
    clean_nodes = []
    skipped = 0
    for n in nodes:
        n = fix_class_0(n)
        if should_skip(n["node_id"], n["title"]):
            skipped += 1
            continue
        n["subject"] = determine_subject(n["node_id"], n["subject"], n["class"])
        clean_nodes.append(n)

    print(f"Skipped {skipped} supporting files")
    print(f"Clean curriculum nodes: {len(clean_nodes)}")

    # Stats
    by_class = defaultdict(int)
    by_subject = defaultdict(int)
    for n in clean_nodes:
        by_class[n["class"]] += 1
        by_subject[n["subject"]] += 1

    print("\nBy class:")
    for cls in sorted(by_class.keys()):
        print(f"  Class {cls}: {by_class[cls]}")
    print("\nBy subject:")
    for subj, count in sorted(by_subject.items()):
        print(f"  {subj}: {count}")

    # Check which nodes already exist in Neo4j
    driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

    existing = set()
    with driver.session() as session:
        # Get all existing English node IDs
        result = session.run(
            "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' OR n.node_id CONTAINS 'eng' "
            "RETURN n.node_id as nid"
        )
        for r in result:
            existing.add(r["nid"])
    print(f"\nAlready in Neo4j: {len(existing)} English nodes")

    # Filter to only new nodes
    new_nodes = [n for n in clean_nodes if n["node_id"] not in existing]
    print(f"New nodes to add: {len(new_nodes)}")

    if not new_nodes:
        print("Nothing to add. Exiting.")
        driver.close()
        return

    # Create nodes in batches
    batch_size = 100
    created = 0
    for i in range(0, len(new_nodes), batch_size):
        batch = new_nodes[i:i + batch_size]
        params = []
        for n in batch:
            params.append({
                "node_id": n["node_id"],
                "topic": n["title"][:300],
                "subject": n["subject"],
                "class_level": n["class"],
                "board": "CISCE",
                "chapter": "",
                "chapter_name": "",
                "difficulty": "medium",
                "estimated_time": 30,
                "is_root": False,
                "concept_tags": [],
                "content_snippet": n["title"][:200],
                "prerequisite_node_ids": n["prerequisites"],
                "source_file": n["source_file"],
            })

        with driver.session() as session:
            result = session.run(
                """
                UNWIND $nodes as node
                MERGE (n:KnowledgeNode {node_id: node.node_id})
                SET n.topic = node.topic,
                    n.subject = node.subject,
                    n.class_level = node.class_level,
                    n.board = node.board,
                    n.chapter = node.chapter,
                    n.chapter_name = node.chapter_name,
                    n.difficulty = node.difficulty,
                    n.estimated_time = node.estimated_time,
                    n.is_root = node.is_root,
                    n.concept_tags = node.concept_tags,
                    n.content_snippet = node.content_snippet,
                    n.prerequisite_node_ids = node.prerequisite_node_ids,
                    n.source_file = node.source_file
                RETURN count(n) as created
                """,
                nodes=params,
            )
            created += result.single()["created"]

        print(f"  Created {created}/{len(new_nodes)} nodes")

    # Create Subject nodes
    print("\nCreating Subject nodes...")
    subjects_seen = set()
    for n in new_nodes:
        subj_key = f"CISCE_{n['class']}_{n['subject']}"
        if subj_key not in subjects_seen:
            subjects_seen.add(subj_key)
            with driver.session() as session:
                session.run(
                    "MERGE (s:Subject {subject_key: $key}) "
                    "SET s.board = 'CISCE', s.class_level = $cls, s.subject = $subj",
                    key=subj_key, cls=n["class"], subj=n["subject"],
                )
    print(f"  Created {len(subjects_seen)} Subject nodes")

    # Create REQUIRES edges from prerequisites
    print("\nCreating REQUIRES edges...")
    all_node_ids = {n["node_id"] for n in clean_nodes}
    edges_created = 0
    for n in clean_nodes:
        for prereq in n["prerequisites"]:
            prereq = prereq.strip()
            if prereq and prereq.startswith("c"):
                with driver.session() as session:
                    result = session.run(
                        """
                        MATCH (a:KnowledgeNode {node_id: $from_id})
                        MATCH (b:KnowledgeNode {node_id: $to_id})
                        MERGE (a)-[:REQUIRES]->(b)
                        RETURN count() as created
                        """,
                        from_id=n["node_id"], to_id=prereq,
                    )
                    edges_created += result.single()["created"]
    print(f"  Created {edges_created} REQUIRES edges")

    # Create UNLOCKS edges (reverse of REQUIRES)
    print("\nCreating UNLOCKS edges...")
    with driver.session() as session:
        result = session.run(
            """
            MATCH (a:KnowledgeNode)-[:REQUIRES]->(b:KnowledgeNode)
            WHERE NOT EXISTS((b)-[:UNLOCKS]->(a))
            MERGE (b)-[:UNLOCKS]->(a)
            RETURN count() as created
            """
        )
        print(f"  Created {result.single()['created']} UNLOCKS edges")

    # Final stats
    print("\n=== FINAL Neo4j STATS ===")
    with driver.session() as session:
        result = session.run("MATCH (n:KnowledgeNode) RETURN count(n) as count")
        print(f"  Total KnowledgeNode: {result.single()['count']}")

        result = session.run(
            "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' "
            "OR n.subject CONTAINS 'english' RETURN count(n) as count"
        )
        print(f"  English nodes: {result.single()['count']}")

        result = session.run(
            "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' "
            "RETURN n.subject as subj, count(n) as count ORDER BY subj"
        )
        for r in result:
            print(f"    {r['subj']}: {r['count']}")

        result = session.run(
            "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' "
            "RETURN n.class_level as cls, count(n) as count ORDER BY cls"
        )
        for r in result:
            print(f"    Class {r['cls']}: {r['count']}")

    driver.close()
    print("\nDone.")


if __name__ == "__main__":
    main()
