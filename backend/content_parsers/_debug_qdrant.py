"""Debug Qdrant search — test dense and sparse separately."""
import asyncio, sys, os, time
sys.path.insert(0, r"D:\platform")

import importlib.util
svc_path = r"D:\platform\backend\services\qdrant_service.py"
spec = importlib.util.spec_from_file_location("qdrant_service", svc_path)
mod = importlib.util.module_from_spec(spec)
sys.modules["qdrant_service"] = mod
spec.loader.exec_module(mod)

from qdrant_client import QdrantClient
from qdrant_client.models import SparseVector

QdrantSearchService = mod.QdrantSearchService

async def test():
    service = QdrantSearchService()

    # Get embedding
    EmbeddingService = mod._get_embedding_service_class()
    emb_service = await EmbeddingService.get_instance()
    query = "photosynthesis"
    print(f"Query: {query}")
    dense_vector = await emb_service.encode(query)
    print(f"Dense vector dim: {len(dense_vector)}")

    # Direct dense search
    client = service._client
    coll = mod.COLLECTIONS["nodes"]
    print(f"Collection: {coll}")

    result = client.query_points(
        collection_name=coll,
        query=dense_vector,
        using="dense",
        limit=5,
        with_payload=True,
    )
    print(f"Dense search results: {len(result.points)}")
    for p in result.points[:3]:
        title = p.payload.get("title", "N/A") if p.payload else "N/A"
        print(f"  score={p.score:.4f}, title={title[:60]}")

    # Try search_points (older API)
    result2 = client.search(
        collection_name=coll,
        query_vector=dense_vector,
        limit=5,
        with_payload=True,
    )
    print(f"Legacy search results: {len(result2)}")
    for p in result2[:3]:
        title = p.payload.get("title", "N/A") if p.payload else "N/A"
        print(f"  score={p.score:.4f}, title={title[:60]}")

asyncio.run(test())
