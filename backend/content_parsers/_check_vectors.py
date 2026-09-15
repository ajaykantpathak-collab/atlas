"""Check if Qdrant points have vectors."""
import requests, json

# Scroll a single point with vectors
r = requests.post(
    "http://localhost:6333/collections/cisce_nodes_v2/points/scroll",
    json={"limit": 2, "with_vector": True, "with_payload": True},
)
data = r.json()
points = data["result"]["points"]
print(f"Retrieved {len(points)} points")
for p in points:
    pid = p["id"]
    has_vector = "vector" in p
    vec = p.get("vector", {})
    dense = vec.get("dense", []) if isinstance(vec, dict) else vec
    payload = p.get("payload", {})
    print(f"\nPoint ID: {pid}")
    print(f"  Has vector: {has_vector}")
    print(f"  Dense vector length: {len(dense) if dense else 0}")
    print(f"  First 5 values: {dense[:5] if dense else 'N/A'}")
    print(f"  Payload keys: {list(payload.keys())[:10]}")
    print(f"  Title: {payload.get('title', 'N/A')[:80]}")
    print(f"  Node ID: {payload.get('node_id', 'N/A')}")
