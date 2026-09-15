"""Check Qdrant collection points and their vectors."""
import sys, os, requests, json

# Get collection info
r = requests.get("http://localhost:6333/collections/cisce_nodes_v2")
info = r.json()
print("Collection config:")
print(json.dumps(info["result"]["config"]["params"], indent=2))
print(f"Points count: {info['result']['points_count']}")
print(f"Vectors count: {info['result']['vectors_count']}")
print(f"Indexed_vectors_count: {info['result']['indexed_vectors_count']}")
