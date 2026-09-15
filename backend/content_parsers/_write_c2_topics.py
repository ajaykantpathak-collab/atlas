"""Write the Class 2 topic-to-node mapping.

Sources:
- Bio: file headers use unified topics 1, 3, 7, 8, 10, 11 (same as Class 1)
- Physics: file headers use unified topics 7, 12, 14, 15
- Maths: themes 1-6 from c2_maths_syllabus.txt
- Chem: from c2_chem syllabus (explicit node IDs)
- EVS: from c2_evs syllabus (explicit node IDs)
- Geo: syllabus file is WRONG (EVS-style topics) — topics from node titles
- CS: no syllabus file — topics from node titles
"""
import json

class2_mapping = {
    "2_bio": {
        "class": 2,
        "subject": "bio",
        "topics": [
            {"topic_num": 1, "topic_name": "About Me", "nodes": ["c2_bio_001"]},
            {"topic_num": 3, "topic_name": "Food", "nodes": ["c2_bio_002", "c2_bio_003", "c2_bio_004"]},
            {"topic_num": 7, "topic_name": "Air", "nodes": ["c2_bio_005", "c2_bio_006", "c2_bio_007"]},
            {"topic_num": 8, "topic_name": "Keeping Clean, Safe and Healthy", "nodes": ["c2_bio_008", "c2_bio_009"]},
            {"topic_num": 10, "topic_name": "Plants", "nodes": ["c2_bio_010", "c2_bio_011", "c2_bio_012"]},
            {"topic_num": 11, "topic_name": "Animals", "nodes": ["c2_bio_013", "c2_bio_014", "c2_bio_015"]},
        ],
    },
    "2_chem": {
        "class": 2,
        "subject": "chem",
        "topics": [
            {"topic_num": 1, "topic_name": "Storage of water", "nodes": ["c2_chem_001"]},
            {"topic_num": 2, "topic_name": "Simple properties of water", "nodes": ["c2_chem_002"]},
            {"topic_num": 3, "topic_name": "Water conservation in daily life", "nodes": ["c2_chem_003"]},
            {"topic_num": 4, "topic_name": "Vessels and containers for water storage", "nodes": ["c2_chem_004"]},
        ],
    },
    "2_physics": {
        "class": 2,
        "subject": "physics",
        "topics": [
            {"topic_num": 7, "topic_name": "My Need - Air", "nodes": ["c2_phy_001", "c2_phy_002"]},
            {"topic_num": 12, "topic_name": "Transport", "nodes": ["c2_phy_003", "c2_phy_004", "c2_phy_005"]},
            {"topic_num": 14, "topic_name": "The World Around Me: Sun, Moon, Sky and Stars", "nodes": ["c2_phy_006", "c2_phy_007"]},
            {"topic_num": 15, "topic_name": "Time, Space, Direction", "nodes": ["c2_phy_008", "c2_phy_009", "c2_phy_010"]},
        ],
    },
    "2_maths": {
        "class": 2,
        "subject": "maths",
        "topics": [
            {"topic_num": 1, "topic_name": "Numbers", "nodes": ["c2_math_001", "c2_math_002", "c2_math_003", "c2_math_004"]},
            {"topic_num": 2, "topic_name": "Number Operations", "nodes": ["c2_math_005", "c2_math_006", "c2_math_007", "c2_math_008", "c2_math_009", "c2_math_010", "c2_math_011", "c2_math_012", "c2_math_013", "c2_math_014"]},
            {"topic_num": 3, "topic_name": "Geometry", "nodes": ["c2_math_015", "c2_math_016", "c2_math_017", "c2_math_018", "c2_math_019"]},
            {"topic_num": 4, "topic_name": "Measurement", "nodes": ["c2_math_020", "c2_math_021", "c2_math_022", "c2_math_023"]},
            {"topic_num": 5, "topic_name": "Data Handling", "nodes": ["c2_math_024"]},
            {"topic_num": 6, "topic_name": "Patterns", "nodes": ["c2_math_025", "c2_math_026", "c2_math_027"]},
        ],
    },
    "2_evs": {
        "class": 2,
        "subject": "evs",
        "topics": [
            {"topic_num": 1, "topic_name": "My Environment - Family, Home, School", "nodes": ["c2_evs_001"]},
            {"topic_num": 2, "topic_name": "Local Animals and Birds", "nodes": ["c2_evs_002"]},
            {"topic_num": 3, "topic_name": "Local Plants and Trees", "nodes": ["c2_evs_003"]},
            {"topic_num": 4, "topic_name": "Physical Features of the Locality", "nodes": ["c2_evs_004"]},
            {"topic_num": 5, "topic_name": "Food - Where It Comes From", "nodes": ["c2_evs_005"]},
            {"topic_num": 6, "topic_name": "Water and Shelter", "nodes": ["c2_evs_006"]},
            {"topic_num": 7, "topic_name": "Safety - Road, Fire, First Aid", "nodes": ["c2_evs_007"]},
            {"topic_num": 8, "topic_name": "Personal Hygiene and Cleanliness", "nodes": ["c2_evs_008"]},
            {"topic_num": 9, "topic_name": "Keeping Surroundings Clean", "nodes": ["c2_evs_009"]},
            {"topic_num": 10, "topic_name": "Care of Plants and Animals", "nodes": ["c2_evs_010"]},
        ],
    },
    "2_geo": {
        "class": 2,
        "subject": "geo",
        "topics": [
            {"topic_num": 1, "topic_name": "Earth and Sky", "nodes": ["c2_geo_001", "c2_geo_002", "c2_geo_003"]},
            {"topic_num": 2, "topic_name": "Weather and Seasons", "nodes": ["c2_geo_004", "c2_geo_005"]},
            {"topic_num": 3, "topic_name": "Directions", "nodes": ["c2_geo_006", "c2_geo_007"]},
            {"topic_num": 4, "topic_name": "Maps and Places", "nodes": ["c2_geo_008", "c2_geo_010"]},
            {"topic_num": 5, "topic_name": "Water", "nodes": ["c2_geo_009"]},
        ],
    },
    "2_cs": {
        "class": 2,
        "subject": "cs",
        "topics": [
            {"topic_num": 1, "topic_name": "Introduction to Computers", "nodes": ["c2_cs_001", "c2_cs_002"]},
            {"topic_num": 2, "topic_name": "Input/Output Devices", "nodes": ["c2_cs_003", "c2_cs_004"]},
            {"topic_num": 3, "topic_name": "Keyboard and Mouse", "nodes": ["c2_cs_005", "c2_cs_006"]},
            {"topic_num": 4, "topic_name": "Paint", "nodes": ["c2_cs_007", "c2_cs_008"]},
            {"topic_num": 5, "topic_name": "File Management", "nodes": ["c2_cs_009", "c2_cs_010", "c2_cs_011"]},
            {"topic_num": 6, "topic_name": "Computer Etiquette", "nodes": ["c2_cs_012"]},
        ],
    },
}

# Verify all nodes are covered
all_c2_nodes = set()
with open(r"D:\platform\parsed_output\enrichment.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        if r.get("class_level") == 2:
            all_c2_nodes.add(r["node_id"])

mapped_nodes = set()
for key, m in class2_mapping.items():
    for t in m["topics"]:
        for nid in t["nodes"]:
            mapped_nodes.add(nid)

print(f"Class 2 total nodes: {len(all_c2_nodes)}")
print(f"Class 2 mapped nodes: {len(mapped_nodes)}")
uncovered = all_c2_nodes - mapped_nodes
extra = mapped_nodes - all_c2_nodes
if uncovered:
    print(f"UNCOVERED: {sorted(uncovered)}")
if extra:
    print(f"EXTRA (not in enrichment): {sorted(extra)}")
if not uncovered and not extra:
    print("PERFECT - all nodes covered, no extras!")

# Check for duplicates
from collections import Counter
for key, m in class2_mapping.items():
    all_assigned = []
    for t in m["topics"]:
        all_assigned.extend(t["nodes"])
    counts = Counter(all_assigned)
    dups = {n: c for n, c in counts.items() if c > 1}
    if dups:
        print(f"{key} - nodes in multiple topics: {dups}")

with open(r"D:\platform\parsed_output\class2_topic_mapping.json", "w", encoding="utf-8") as f:
    json.dump(class2_mapping, f, indent=2, ensure_ascii=False)
print("\nWritten to D:\\platform\\parsed_output\\class2_topic_mapping.json")
