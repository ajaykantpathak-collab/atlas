"""Clean up English nodes with file-name-derived IDs that aren't proper curriculum nodes.

Proper node_id pattern: c<NN>_eng_<NNN> or c<NN>_eng_<NNN><letter> or c<NN>_eng<stream>_<NNN>_<NN>
Bad patterns: c4_eng_003a_tense_present_simple_past_simple (file name as node_id)
              c8_eng_001_c1, c8_eng_001_st1 (file suffix as node_id)
              c12_eng_007_a (file suffix as node_id)
"""
import re
from neo4j import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

# Get all English node_ids
with driver.session() as session:
    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' RETURN n.node_id as nid, n.topic as topic"
    )
    nodes = [(r["nid"], r["topic"]) for r in result]

print(f"Total English nodes: {len(nodes)}")

# Proper patterns:
# c1_eng_001, c1_eng_001a, c10_eng_126, c12_eng_001a
# c10_eng_101_01 (sub-node: parent_NNN_NN)
# c11_engelec_drama_1_01 (elective: stream_type_N_NN)
# c11_engmod_poem_01_01 (modern: stream_type_NN_NN)
# c6_eng_101_01 (sub-node)
# c8_eng_201_characters (literature sub-topic — borderline)

PROPER_PATTERNS = [
    r'^c\d+_eng_\d{3}[a-z]?$',           # c10_eng_001, c10_eng_001a
    r'^c\d+_eng_\d{3}_\d{2}$',           # c10_eng_101_01 (sub-node)
    r'^c\d+_engelec_\w+_\d+_\d{2}$',     # c11_engelec_drama_1_01
    r'^c\d+_engelec_\w+_\d+$',           # c11_engelec_drama_1 (parent — should have been removed)
    r'^c\d+_engmod_\w+_\d{2}$',          # c11_engmod_poem_01
    r'^c\d+_engmod_\w+_\d{2}_\d{2}$',    # c11_engmod_poem_01_01
    r'^c\d+_engmod_\w+$',                # c11_engmod_drama (parent — should have been removed)
    r'^c\d+_eng_\d{3}[a-z]?_\w+$',       # c8_eng_001_c1 — borderline, file-derived
]

# Strict proper pattern: c<NN>_eng<optional stream>_<identifiers>
# Bad: anything with descriptive words in the node_id that looks like a filename
bad_nodes = []
good_nodes = []

for nid, topic in nodes:
    # Check if node_id has descriptive words (more than just numbers/letters after the base pattern)
    # Bad patterns: contains words like "tense", "sentence", "practice", "enrichment", "characters", etc.
    is_bad = False

    # If node_id contains long descriptive segments, it's file-derived
    parts = nid.split("_")
    # Proper: c10_eng_001 (4 parts max for base), c10_eng_101_01 (5 parts)
    # c11_engelec_drama_1_01 (6 parts)
    # Bad: c4_eng_003a_tense_present_simple_past_simple (8 parts with words)

    # Check for word-only segments (not numbers, not standard abbreviations)
    word_segments = [p for p in parts if p.isalpha() and len(p) > 3 and p not in ("eng", "engelec", "engmod")]
    if word_segments:
        # Allow "drama", "poem", "novel", "poet", "story" for engelec/engmod
        allowed_words = {"drama", "poem", "novel", "poet", "story", "poems", "stories"}
        unexpected_words = [w for w in word_segments if w not in allowed_words]
        if unexpected_words:
            is_bad = True

    # Also check for very long node_ids (likely file names)
    if len(nid) > 30:
        is_bad = True

    # Check for file extension remnants
    if any(nid.endswith(ext) for ext in ["_md", "_json", "_content", "_txt", "_marker"]):
        is_bad = True

    if is_bad:
        bad_nodes.append((nid, topic))
    else:
        good_nodes.append((nid, topic))

print(f"\nProper curriculum nodes: {len(good_nodes)}")
print(f"Bad/file-derived nodes to remove: {len(bad_nodes)}")

print("\nBad nodes to remove:")
for nid, topic in bad_nodes:
    print(f"  {nid} → {topic[:60]}")

# Remove bad nodes
if bad_nodes:
    bad_ids = [n[0] for n in bad_nodes]
    with driver.session() as session:
        result = session.run(
            "MATCH (n:KnowledgeNode) WHERE n.node_id IN $ids DETACH DELETE n RETURN count(*) as deleted",
            ids=bad_ids,
        )
        print(f"\nDeleted {result.single()['deleted']} bad nodes")

# Final count
print("\n=== FINAL English node count ===")
with driver.session() as session:
    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' "
        "RETURN n.subject as subj, count(*) as cnt ORDER BY subj"
    )
    total = 0
    for r in result:
        print(f"  {r['subj']}: {r['cnt']}")
        total += r["cnt"]
    print(f"  TOTAL: {total}")

    result2 = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.subject CONTAINS 'English' "
        "RETURN n.class_level as cls, count(*) as cnt ORDER BY cls"
    )
    print("\n  By class:")
    for r in result2:
        print(f"    Class {r['cls']}: {r['cnt']}")

    result3 = session.run("MATCH (n:KnowledgeNode) RETURN count(*) as total")
    print(f"\n  Total KnowledgeNodes in graph: {result3.single()['total']}")

driver.close()
