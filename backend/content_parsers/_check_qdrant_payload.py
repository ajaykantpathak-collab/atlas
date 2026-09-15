"""Check Qdrant payload structure for class_level."""
import requests, json

r = requests.post(
    "http://localhost:6333/collections/cisce_nodes_v2/points/scroll",
    json={"limit": 10, "with_payload": True, "with_vector": False},
)
points = r.json()["result"]["points"]

for p in points[:5]:
    payload = p.get("payload", {})
    print(f"ID: {p['id']}")
    print(f"  Payload keys: {list(payload.keys())}")
    print(f"  class_level: {payload.get('class_level')}")
    print(f"  subject: {payload.get('subject')}")
    print(f"  node_id: {payload.get('node_id')}")
    print(f"  title: {str(payload.get('title', ''))[:60]}")
    # Check if class_level is in a different field
    for k, v in payload.items():
        if isinstance(v, (int, str)) and str(v) in ["1", "2", "3", "4", "5"]:
            print(f"  ** {k} = {v}")
    print()

# Count class_level distribution
r2 = requests.post(
    "http://localhost:6333/collections/cisce_nodes_v2/points/scroll",
    json={"limit": 5000, "with_payload": True, "with_vector": False},
)
all_points = r2.json()["result"]["points"]
cls_counts = {}
for p in all_points:
    cls = p.get("payload", {}).get("class_level", "missing")
    cls_counts[cls] = cls_counts.get(cls, 0) + 1
print(f"\nClass distribution in Qdrant ({len(all_points)} points):")
for k in sorted(cls_counts.keys(), key=lambda x: str(x)):
    print(f"  {k}: {cls_counts[k]}")
