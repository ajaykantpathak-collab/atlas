"""Centralized embedding service for the platform.

Manages embedding model lifecycle:
  - Lazy loading (model loads on first use, not at import time)
  - Model versioning (swap models by changing one config)
  - Thread-safe singleton (one model instance shared across all requests)
  - Batch encoding with progress tracking
  - Matryoshka dimension support (truncate 768 → 384/256/128 for speed)

Models supported:
  - granite-311m-multilingual (PRIMARY): 768-dim, 200+ languages, 32K context
  - minilm-l6-v2 (FALLBACK): 384-dim, English-only, 256 context

Usage:
    from backend.services.embedding_service import EmbeddingService

    # Get singleton instance
    service = await EmbeddingService.get_instance()

    # Encode single text
    embedding = await service.encode("What is photosynthesis?")

    # Encode batch
    embeddings = await service.encode_batch(["text1", "text2", "text3"])

    # Search query encoding (same as encode, but explicit for readability)
    query_emb = await service.encode_query("आयनीकरण ऊर्जा क्या है?")
"""

import asyncio
import os
import time
from typing import Optional
from dataclasses import dataclass

# Model configuration — change here to swap models
MODEL_CONFIGS = {
    "granite-97m-multilingual": {
        "hf_name": "ibm-granite/granite-embedding-97m-multilingual-r2",
        "dimension": 384,
        "max_context": 32768,
        "languages": 200,
        "matryoshka_dims": [384],
    },
    "granite-311m-multilingual": {
        "hf_name": "ibm-granite/granite-embedding-311m-multilingual-r2",
        "dimension": 768,
        "max_context": 32768,
        "languages": 200,
        "matryoshka_dims": [768, 512, 384, 256, 128],
    },
    "minilm-l6-v2": {
        "hf_name": "all-MiniLM-L6-v2",
        "dimension": 384,
        "max_context": 256,
        "languages": 1,  # English only
        "matryoshka_dims": [384],
    },
}

# Active model — can be overridden by environment variable
# Default: 97M for fast CPU inference. Switch to 311M for higher quality on GPU.
ACTIVE_MODEL = os.environ.get("EMBEDDING_MODEL", "granite-97m-multilingual")


@dataclass
class ModelInfo:
    """Information about the currently loaded embedding model."""
    name: str
    hf_name: str
    dimension: int
    max_context: int
    load_time_s: float
    is_loaded: bool


class EmbeddingService:
    """Centralized embedding service with lazy loading and model versioning.

    Thread-safe singleton — one model instance shared across all requests.
    Use get_instance() to get the singleton, then call encode/encode_batch.
    """

    _instance: Optional["EmbeddingService"] = None
    _lock = asyncio.Lock()
    _model = None
    _model_info: Optional[ModelInfo] = None

    def __init__(self):
        """Private constructor — use get_instance() instead."""
        self._config = MODEL_CONFIGS[ACTIVE_MODEL]

    @classmethod
    async def get_instance(cls) -> "EmbeddingService":
        """Get the singleton instance, loading the model if needed."""
        if cls._instance is None:
            async with cls._lock:
                if cls._instance is None:
                    cls._instance = cls()
                    await cls._instance._load_model()
        return cls._instance

    async def _load_model(self):
        """Load the embedding model (lazy — only called on first use)."""
        if self._model is not None:
            return

        loop = asyncio.get_event_loop()
        start = time.time()

        def _load():
            from sentence_transformers import SentenceTransformer
            return SentenceTransformer(self._config["hf_name"])

        self._model = await loop.run_in_executor(None, _load)
        load_time = time.time() - start

        self._model_info = ModelInfo(
            name=ACTIVE_MODEL,
            hf_name=self._config["hf_name"],
            dimension=self._config["dimension"],
            max_context=self._config["max_context"],
            load_time_s=load_time,
            is_loaded=True,
        )

    @classmethod
    def get_model_info(cls) -> Optional[ModelInfo]:
        """Get information about the currently loaded model (or None if not loaded)."""
        return cls._model_info

    @classmethod
    def get_dimension(cls) -> int:
        """Get the embedding dimension of the active model."""
        return MODEL_CONFIGS[ACTIVE_MODEL]["dimension"]

    @classmethod
    def is_ready(cls) -> bool:
        """Check if the model is loaded and ready."""
        return cls._model is not None and cls._instance is not None

    async def encode(
        self,
        text: str,
        truncate_dim: Optional[int] = None,
    ) -> list[float]:
        """Encode a single text string into an embedding vector.

        Args:
            text: The text to embed.
            truncate_dim: Optional Matryoshka truncation dimension.
                If specified, the embedding is truncated to this dimension
                and L2-normalized. Must be <= model's native dimension.

        Returns:
            Embedding vector as a list of floats.
        """
        if self._model is None:
            await self._load_model()

        loop = asyncio.get_event_loop()

        def _encode():
            kwargs = {"show_progress_bar": False}
            if truncate_dim and truncate_dim < self._config["dimension"]:
                # Matryoshka truncation — normalize after truncation
                import numpy as np
                emb = self._model.encode([text], **kwargs)[0]
                emb = emb[:truncate_dim]
                norm = np.linalg.norm(emb)
                if norm > 0:
                    emb = emb / norm
                return emb.tolist()
            return self._model.encode([text], **kwargs)[0].tolist()

        return await loop.run_in_executor(None, _encode)

    async def encode_batch(
        self,
        texts: list[str],
        truncate_dim: Optional[int] = None,
        batch_size: int = 64,
    ) -> list[list[float]]:
        """Encode a batch of text strings into embedding vectors.

        Args:
            texts: List of texts to embed.
            truncate_dim: Optional Matryoshka truncation dimension.
            batch_size: Batch size for encoding (larger = faster but more memory).

        Returns:
            List of embedding vectors (one per input text).
        """
        if not texts:
            return []

        if self._model is None:
            await self._load_model()

        loop = asyncio.get_event_loop()

        def _encode_batch():
            kwargs = {
                "show_progress_bar": False,
                "batch_size": batch_size,
            }
            if truncate_dim and truncate_dim < self._config["dimension"]:
                import numpy as np
                embs = self._model.encode(texts, **kwargs)
                embs = embs[:, :truncate_dim]
                norms = np.linalg.norm(embs, axis=1, keepdims=True)
                embs = embs / np.maximum(norms, 1e-8)
                return embs.tolist()
            return self._model.encode(texts, **kwargs).tolist()

        return await loop.run_in_executor(None, _encode_batch)

    async def encode_query(self, text: str) -> list[float]:
        """Encode a search query (same as encode, but explicit for readability)."""
        return await self.encode(text)

    @classmethod
    async def rebuild(cls):
        """Force model reload (e.g., after changing model config)."""
        async with cls._lock:
            cls._model = None
            cls._instance = None
            cls._model_info = None
            cls._instance = cls()
            await cls._instance._load_model()
