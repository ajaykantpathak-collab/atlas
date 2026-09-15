from neo4j import GraphDatabase
import json
from pathlib import Path

driver = GraphDatabase.driver('bolt://localhost:7687', auth=('neo4j','dream_neo4j_2024'))

# Get all CISCE class 1-5 nodes from Neo4j
with driver.session() as s:
    # Check what properties exist
    r = s.run("MATCH (n:KnowledgeNode) WHERE n.class_level >= 1 AND n.class_level <= 5 RETURN keys(n) as props LIMIT 1")
    props = r.single()["props"]
    print(f"Node properties: {props}")

    # Get all class 1-5 nodes with all properties
    r = s.run("MATCH (n:KnowledgeNode) WHERE n.class_level >= 1 AND n.class_level <= 5 RETURN n")
    nodes_1_5 = []
    for rec in r:
        node = dict(rec["n"])
        nodes_1_5.append(node)

    print(f"\nTotal class 1-5 nodes: {len(nodes_1_5)}")

    # Show sample
    if nodes_1_5:
        print(f"\nSample node properties:")
        for k, v in nodes_1_5[0].items():
            print(f"  {k}: {str(v)[:80]}")

driver.close()

# Build routing entries for class 1-5
# All go to CISCE since we don't have CBSE class 1-5 content
routing_1_5 = {}
for node in nodes_1_5:
    nid = node.get("node_id") or node.get("nid") or ""
    if not nid:
        # Try to construct from properties
        subj = node.get("subject", "")
        cls = node.get("class_level", "")
        # Skip if no usable ID
        continue

    routing_1_5[nid] = {
        "source": "cisce",
        "cisce_node_id": nid,
        "cbse_node_id": None,
        "reason": "class_1_5_no_cbse_data",
        "class": node.get("class_level"),
        "subject": node.get("subject"),
        "title": node.get("title", "")
    }

print(f"\nRouting entries for class 1-5: {len(routing_1_5)}")

# Load existing routing map
routing_path = Path(r"D:\platform\cbse_data\cross_board\mappings\board_routing_map.json")
existing = json.loads(routing_path.read_text(encoding="utf-8"))
print(f"Existing routing entries (class 6-12): {len(existing)}")

# Merge
existing.update(routing_1_5)
print(f"Combined routing entries: {len(existing)}")

# Save
routing_path.write_text(json.dumps(existing, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\nUpdated routing map saved to {routing_path}")

# Summary by class
from collections import defaultdict
by_class = defaultdict(lambda: {"cbse": 0, "cisce": 0})
for nid, info in existing.items():
    cls = info.get("class")
    if cls is None:
        # Try to parse from node_id
        import re
        m = re.match(r'c(\d+)_', nid)
        if m:
            cls = int(m.group(1))
    if cls is not None:
        by_class[cls][info["source"]] += 1

print(f"\n{'='*50}")
print(f"  ROUTING MAP BY CLASS")
print(f"{'='*50}")
print(f"{'Class':>6s} {'→CBSE':>8s} {'→CISCE':>8s} {'Total':>8s}")
print("-" * 35)
for cls in sorted(by_class.keys()):
    s = by_class[cls]
    total = s["cbse"] + s["cisce"]
    print(f"{cls:6d} {s['cbse']:8d} {s['cisce']:8d} {total:8d}")
