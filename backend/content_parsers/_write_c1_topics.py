"""Write the corrected Class 1 topic-to-node mapping.

FIXES:
- Physics: use topic numbers 7, 12, 14 (matching file headers)
- Maths: use Theme numbers 1-6 (matching syllabus), not the false-positive [20]
  - Theme 4 (Measurement) includes length, weight, volume, AND time
  - Theme 2 (Number Operations) includes both addition AND subtraction
- Bio: topics 1, 3, 7, 8, 10, 11 (already correct, matching file headers)
- Chem: own numbering (no topic numbers in files)
- EVS: own numbering (no topic numbers in files)
- Geo: own numbering (syllabus file was wrong, topics from node titles)
- CS: own numbering (no syllabus file, topics from node titles)
"""
import json

class1_mapping = {
    "1_bio": {
        "class": 1,
        "subject": "bio",
        "topics": [
            {"topic_num": 1, "topic_name": "About Me", "nodes": ["c1_bio_001", "c1_bio_002", "c1_bio_003"]},
            {"topic_num": 3, "topic_name": "Food We Eat", "nodes": ["c1_bio_004", "c1_bio_005", "c1_bio_006", "c1_bio_007"]},
            {"topic_num": 7, "topic_name": "Air", "nodes": ["c1_bio_008", "c1_bio_009", "c1_bio_010", "c1_bio_011"]},
            {"topic_num": 8, "topic_name": "Keeping Clean, Safe and Healthy", "nodes": ["c1_bio_012", "c1_bio_013"]},
            {"topic_num": 10, "topic_name": "Plants", "nodes": ["c1_bio_014", "c1_bio_015", "c1_bio_016", "c1_bio_017"]},
            {"topic_num": 11, "topic_name": "Animals", "nodes": ["c1_bio_018", "c1_bio_019", "c1_bio_020", "c1_bio_021", "c1_bio_022"]},
        ],
    },
    "1_chem": {
        "class": 1,
        "subject": "chem",
        "topics": [
            {"topic_num": 1, "topic_name": "Uses of water", "nodes": ["c1_chem_001"]},
            {"topic_num": 2, "topic_name": "Sources of water", "nodes": ["c1_chem_002"]},
            {"topic_num": 3, "topic_name": "Need for judicious use of water", "nodes": ["c1_chem_003"]},
            {"topic_num": 4, "topic_name": "Reuse of water in the family", "nodes": ["c1_chem_004"]},
        ],
    },
    "1_physics": {
        "class": 1,
        "subject": "physics",
        "topics": [
            {"topic_num": 7, "topic_name": "My Needs - Air", "nodes": ["c1_phy_001", "c1_phy_002", "c1_phy_003"]},
            {"topic_num": 12, "topic_name": "Transport", "nodes": ["c1_phy_004", "c1_phy_005"]},
            {"topic_num": 14, "topic_name": "The World around Me - Sun, Moon, Sky and Stars", "nodes": ["c1_phy_006", "c1_phy_007", "c1_phy_008"]},
        ],
    },
    "1_maths": {
        "class": 1,
        "subject": "maths",
        "topics": [
            {"topic_num": 1, "topic_name": "Numbers", "nodes": ["c1_math_001", "c1_math_002", "c1_math_003", "c1_math_004", "c1_math_005", "c1_math_006", "c1_math_007", "c1_math_008", "c1_math_009"]},
            {"topic_num": 2, "topic_name": "Number Operations", "nodes": ["c1_math_010", "c1_math_011", "c1_math_012"]},
            {"topic_num": 3, "topic_name": "Geometry", "nodes": ["c1_math_013", "c1_math_014", "c1_math_015", "c1_math_016"]},
            {"topic_num": 4, "topic_name": "Measurement", "nodes": ["c1_math_017", "c1_math_018", "c1_math_019", "c1_math_020", "c1_math_021", "c1_math_022", "c1_math_023", "c1_math_024", "c1_math_025"]},
            {"topic_num": 5, "topic_name": "Data Handling", "nodes": ["c1_math_026"]},
            {"topic_num": 6, "topic_name": "Patterns", "nodes": ["c1_math_027", "c1_math_028"]},
        ],
    },
    "1_evs": {
        "class": 1,
        "subject": "evs",
        "topics": [
            {"topic_num": 1, "topic_name": "My Family and Home", "nodes": ["c1_evs_001"]},
            {"topic_num": 2, "topic_name": "My School and Friends", "nodes": ["c1_evs_002"]},
            {"topic_num": 3, "topic_name": "Animals in My Surroundings", "nodes": ["c1_evs_003"]},
            {"topic_num": 4, "topic_name": "Plants in My Surroundings", "nodes": ["c1_evs_004"]},
            {"topic_num": 5, "topic_name": "Physical Features of My Locality", "nodes": ["c1_evs_005"]},
            {"topic_num": 6, "topic_name": "My Need for Food", "nodes": ["c1_evs_006"]},
            {"topic_num": 7, "topic_name": "My Need for Water and Shelter", "nodes": ["c1_evs_007"]},
            {"topic_num": 8, "topic_name": "Play and Recreation", "nodes": ["c1_evs_008"]},
            {"topic_num": 9, "topic_name": "Protection from Accidents and Hazards", "nodes": ["c1_evs_009"]},
            {"topic_num": 10, "topic_name": "Personal Cleanliness", "nodes": ["c1_evs_010"]},
            {"topic_num": 11, "topic_name": "Keeping My Belongings Neat and Tidy", "nodes": ["c1_evs_011"]},
            {"topic_num": 12, "topic_name": "Keeping Surroundings Clean", "nodes": ["c1_evs_012"]},
            {"topic_num": 13, "topic_name": "Taking Care of Plants and Animals", "nodes": ["c1_evs_013"]},
        ],
    },
    "1_geo": {
        "class": 1,
        "subject": "geo",
        "topics": [
            {"topic_num": 1, "topic_name": "The Earth", "nodes": ["c1_geo_001"]},
            {"topic_num": 2, "topic_name": "Sun and Sky", "nodes": ["c1_geo_002", "c1_geo_003", "c1_geo_004"]},
            {"topic_num": 3, "topic_name": "Weather and Seasons", "nodes": ["c1_geo_005", "c1_geo_006"]},
            {"topic_num": 4, "topic_name": "Water", "nodes": ["c1_geo_007", "c1_geo_008"]},
            {"topic_num": 5, "topic_name": "Places and Land Features", "nodes": ["c1_geo_009", "c1_geo_010"]},
        ],
    },
    "1_cs": {
        "class": 1,
        "subject": "cs",
        "topics": [
            {"topic_num": 1, "topic_name": "Introduction to Computers", "nodes": ["c1_cs_001", "c1_cs_002", "c1_cs_003", "c1_cs_004"]},
            {"topic_num": 2, "topic_name": "Parts of a Computer", "nodes": ["c1_cs_005"]},
            {"topic_num": 3, "topic_name": "Input Devices", "nodes": ["c1_cs_006", "c1_cs_007", "c1_cs_008"]},
            {"topic_num": 4, "topic_name": "Storage Devices", "nodes": ["c1_cs_009"]},
            {"topic_num": 5, "topic_name": "Computer Etiquette and Safety", "nodes": ["c1_cs_010"]},
        ],
    },
}

# Verify all nodes are covered
all_c1_nodes = set()
with open(r"D:\platform\parsed_output\enrichment.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        if r.get("class_level") == 1:
            all_c1_nodes.add(r["node_id"])

mapped_nodes = set()
for key, m in class1_mapping.items():
    for t in m["topics"]:
        for nid in t["nodes"]:
            mapped_nodes.add(nid)

print(f"Class 1 total nodes: {len(all_c1_nodes)}")
print(f"Class 1 mapped nodes: {len(mapped_nodes)}")
uncovered = all_c1_nodes - mapped_nodes
extra = mapped_nodes - all_c1_nodes
if uncovered:
    print(f"UNCOVERED: {sorted(uncovered)}")
if extra:
    print(f"EXTRA (not in enrichment): {sorted(extra)}")
if not uncovered and not extra:
    print("PERFECT - all nodes covered, no extras!")

# Check for duplicate assignments (nodes in multiple topics within same subject)
for key, m in class1_mapping.items():
    all_assigned = []
    for t in m["topics"]:
        all_assigned.extend(t["nodes"])
    from collections import Counter
    counts = Counter(all_assigned)
    dups = {n: c for n, c in counts.items() if c > 1}
    if dups:
        print(f"\n{key} - nodes in multiple topics: {dups}")

with open(r"D:\platform\parsed_output\class1_topic_mapping.json", "w", encoding="utf-8") as f:
    json.dump(class1_mapping, f, indent=2, ensure_ascii=False)
print("\nWritten to D:\\platform\\parsed_output\\class1_topic_mapping.json")
