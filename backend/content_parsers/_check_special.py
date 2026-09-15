import json

# Check the topic-specific physics files
special_files = [
    "c1_phy_001_to_003_air.marker",
    "c1_phy_004_to_006_transport_sun.marker",
    "c1_phy_007_seasons_bridge_c2.marker",
]

with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        fname = r.get("filename", "")
        if fname in special_files:
            print(f"FILE: {fname}")
            print(f"  dir: {r.get('dir_name')}")
            print(f"  unit: {r.get('unit')}")
            print(f"  topics: {r.get('topic_numbers')}")
            print(f"  syllabus: {(r.get('syllabus_topics') or '')[:200]}")
            print()
