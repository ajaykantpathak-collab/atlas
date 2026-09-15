from qdrant_client import QdrantClient

from backend.config import get_settings

settings = get_settings()

_qdrant_client = None


def get_qdrant() -> QdrantClient:
    global _qdrant_client
    if _qdrant_client is None:
        _qdrant_client = QdrantClient(url=settings.QDRANT_URL)
    return _qdrant_client


def check_qdrant() -> bool:
    try:
        client = get_qdrant()
        client.get_collections()
        return True
    except Exception:
        return False
