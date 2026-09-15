"""Test Qdrant search directly."""
import asyncio, sys, os, time
sys.path.insert(0, r"D:\platform")

# Load the qdrant service directly
import importlib.util
svc_path = r"D:\platform\backend\services\qdrant_service.py"
spec = importlib.util.spec_from_file_location("qdrant_service", svc_path)
mod = importlib.util.module_from_spec(spec)
sys.modules["qdrant_service"] = mod
spec.loader.exec_module(mod)

QdrantSearchService = mod.QdrantSearchService

async def test():
    service = QdrantSearchService()
    print("Searching for 'photosynthesis'...")
    start = time.time()
    response = await service.search_nodes(query="photosynthesis", top_k=5)
    elapsed = time.time() - start
    print(f"Search took {elapsed:.2f}s")
    print(f"Results: {len(response.results) if response else 0}")
    if response and response.results:
        for i, r in enumerate(response.results[:3]):
            print(f"  [{i}] score={r.score:.4f}, title={r.payload.get('title', 'N/A')[:60]}")
            print(f"      node_id={r.payload.get('node_id', 'N/A')}")

asyncio.run(test())
