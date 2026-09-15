"""Full CISCE mapping audit — check all subjects, all classes directly against Neo4j.

CISCE structure:
  ICSE (Classes 1-10): Maths, Physics, Chemistry, Biology, CS, EVS, Geography, History&Civics, English, Hindi
  ICSE (Classes 9-10 only): Commercial Studies, Commercial Applications, Economics Applications
  ISC (Classes 11-12): All subjects including Accounts, Economics, Commerce, BS, Biotech, Home Science, Legal, Mass Media, Pol Sci, Psychology, Sociology, English (3 streams), Hindi
"""
from neo4j import GraphDatabase
from collections import defaultdict

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

# Expected subject-class combinations based on CISCE curriculum
EXPECTED = {
    # Core subjects (classes 1-10 ICSE, 11-12 ISC)
    "maths": list(range(1, 13)),
    "physics": list(range(1, 13)),
    "chemistry": list(range(1, 13)),
    "biology": list(range(1, 13)),
    "computer_science": list(range(1, 13)),
    "geography": list(range(1, 13)),
    # EVS: classes 1-6, 9-12 (not 7-8 per user)
    "evs": [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
    # History & Civics: classes 6-10 (combined), 11-12 separate as History
    "history_civics": [6, 7, 8, 9, 10],
    "hist": [11, 12],  # ISC History (separate)
    # English: 4 streams
    "English Language": list(range(1, 13)),
    "English Literature": list(range(6, 13)),  # literature starts class 6
    "Elective English": [11, 12],
    "Modern English": [11, 12],
    # Hindi: classes 1-12
    "Hindi": list(range(1, 13)),
    # ISC-only subjects (classes 11-12)
    "accounts": [11, 12],
    "economics": [9, 10, 11, 12],  # Economics is 9-12
    "commerce": [11, 12],
    "business_studies": [11, 12],
    "biotech": [11, 12],
    "home_science": [11, 12],
    "legal_studies": [11, 12],
    "mass_media": [11, 12],
    "political_science": [11, 12],
    "psychology": [11, 12],
    "sociology": [11, 12],
    "appmath": [10, 11, 12],  # Applications of Maths
    # ICSE 9-10 only
    "commercial_studies": [9, 10],
    "commercial_applications": [9, 10],
    "economics_applications": [9, 10],
}

# Get actual nodes from Neo4j
with driver.session() as session:
    result = session.run(
        """
        MATCH (n:KnowledgeNode)
        RETURN n.subject as subj, n.class_level as cls, count(*) as cnt
        ORDER BY subj, cls
        """
    )
    actual = defaultdict(dict)
    for r in result:
        actual[r["subj"]][r["cls"]] = r["cnt"]

print("=== FULL CISCE MAPPING AUDIT ===")
print(f"{'Subject':<25} {'Expected classes':<20} {'Actual classes':<30} {'Status'}")
print("-" * 100)

issues = []
for subj, expected_classes in sorted(EXPECTED.items()):
    actual_classes = sorted(actual.get(subj, {}).keys())
    actual_str = ", ".join(f"C{c}:{actual[subj][c]}" for c in actual_classes)
    expected_str = ", ".join(f"C{c}" for c in expected_classes)

    missing = [c for c in expected_classes if c not in actual_classes]
    extra = [c for c in actual_classes if c not in expected_classes]

    if missing:
        status = f"MISSING: {missing}"
        issues.append((subj, "missing", missing))
    elif extra:
        status = f"EXTRA: {extra}"
        issues.append((subj, "extra", extra))
    else:
        status = "OK"

    print(f"{subj:<25} {expected_str:<20} {actual_str:<30} {status}")

# Also show subjects in Neo4j not in expected
print("\n=== SUBJECTS IN NEO4J NOT IN EXPECTED ===")
for subj in sorted(actual.keys()):
    if subj not in EXPECTED:
        classes = sorted(actual[subj].keys())
        counts = ", ".join(f"C{c}:{actual[subj][c]}" for c in classes)
        print(f"  {subj}: {counts}")

# Summary
print(f"\n=== SUMMARY ===")
print(f"  Total subjects in Neo4j: {len(actual)}")
print(f"  Expected subjects: {len(EXPECTED)}")
print(f"  Issues: {len(issues)}")
for subj, issue_type, classes in issues:
    print(f"    {subj}: {issue_type} {classes}")

# Total node count
with driver.session() as session:
    result = session.run("MATCH (n:KnowledgeNode) RETURN count(*) as total")
    print(f"\n  Total KnowledgeNodes: {result.single()['total']}")

driver.close()
