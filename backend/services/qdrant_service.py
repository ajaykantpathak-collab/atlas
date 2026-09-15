"""Qdrant hybrid search service — dense + sparse retrieval with RRF fusion.

Implements the hybrid search architecture from MASTER_PLAN_V2.md:
  1. Dense search: Granite 97M multilingual embeddings (semantic matching)
  2. Sparse search: BM25 sparse vectors (exact keyword matching)
  3. Reciprocal Rank Fusion: combine dense + sparse rankings
  4. Optional cross-encoder reranking (BGE-Reranker-v2-m3)
  5. Metadata filtering: class_level, subject, content_type

Usage:
    from backend.services.qdrant_service import QdrantSearchService

    service = QdrantSearchService()

    # Search nodes (enrichment content)
    results = await service.search_nodes(
        query="What is photosynthesis?",
        class_level=10,
        subject="bio",
        top_k=5,
    )

    # Search questions (for practice)
    results = await service.search_questions(
        query="Newton's second law",
        class_level=11,
        subject="physics",
        top_k=10,
    )

    # Search misconceptions (for remediation)
    results = await service.search_misconceptions(
        query="common errors in balancing equations",
        subject="chem",
        top_k=5,
    )
"""

import asyncio
import os
import sys
import time
import math
import re
import json
import logging
import importlib.util
from pathlib import Path
from collections import Counter, defaultdict
from typing import Optional
from dataclasses import dataclass, field

from qdrant_client import QdrantClient
from qdrant_client.models import (
    SearchRequest, Filter, FieldCondition, MatchValue, SparseVector,
)

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Helper: load embedding service (handles both backend and backend_fastapi)
# ---------------------------------------------------------------------------

_EmbeddingService = None

def _get_embedding_service_class():
    """Load EmbeddingService from the same directory as this file."""
    global _EmbeddingService
    if _EmbeddingService is not None:
        return _EmbeddingService
    emb_path = os.path.join(os.path.dirname(__file__), "embedding_service.py")
    if os.path.exists(emb_path):
        spec = importlib.util.spec_from_file_location("embedding_service", emb_path)
        mod = importlib.util.module_from_spec(spec)
        sys.modules["embedding_service"] = mod
        spec.loader.exec_module(mod)
        _EmbeddingService = mod.EmbeddingService
    else:
        from backend.services.embedding_service import EmbeddingService
        _EmbeddingService = EmbeddingService
    return _EmbeddingService


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

QDRANT_URL = os.environ.get("QDRANT_URL", "http://localhost:6333")

COLLECTIONS = {
    "nodes": "cisce_nodes_v2",
    "questions": "cisce_questions_v2",
    "misconceptions": "cisce_misconceptions_v2",
}

# RRF fusion parameter — standard value from the original paper
RRF_K = 60


# ---------------------------------------------------------------------------
# Self-contained BM25 encoder (no external imports)
# ---------------------------------------------------------------------------

class _BM25Encoder:
    """Simple BM25 sparse vector encoder for exact keyword matching.

    Computes BM25 scores for each document, then converts to sparse vector
    format for Qdrant. Uses IDF weighting and term frequency saturation.
    """

    def __init__(self, k1: float = 1.2, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.doc_freq = defaultdict(int)
        self.doc_count = 0
        self.avg_doc_len = 0
        self._fitted = False

    def _tokenize(self, text: str) -> list:
        return re.findall(r"\b[a-z0-9]{2,}\b", text.lower())

    def fit(self, documents: list):
        self.doc_count = len(documents)
        total_len = 0
        for doc in documents:
            tokens = self._tokenize(doc)
            total_len += len(tokens)
            for token in set(tokens):
                self.doc_freq[token] += 1
        self.avg_doc_len = total_len / max(self.doc_count, 1)
        self._fitted = True

    def encode(self, document: str) -> dict:
        if not self._fitted:
            self.fit([document])
        tokens = self._tokenize(document)
        doc_len = len(tokens)
        term_freqs = Counter(tokens)
        indices, values = [], []
        for term, tf in term_freqs.items():
            df = self.doc_freq.get(term, 0)
            idf = math.log((self.doc_count - df + 0.5) / (df + 0.5) + 1)
            num = tf * (self.k1 + 1)
            den = tf + self.k1 * (1 - self.b + self.b * doc_len / max(self.avg_doc_len, 1))
            score = idf * (num / den)
            if score > 0:
                indices.append(abs(hash(term)) % (2**31))
                values.append(float(score))
        return {"indices": indices, "values": values}


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

@dataclass
class SearchResult:
    """A single search result from Qdrant hybrid search."""
    id: int
    score: float
    payload: dict
    dense_score: Optional[float] = None
    sparse_score: Optional[float] = None
    rerank_score: Optional[float] = None


@dataclass
class SearchResponse:
    """Response from a hybrid search query."""
    query: str
    results: list[SearchResult] = field(default_factory=list)
    latency_ms: float = 0.0
    method: str = "hybrid_rrf"


# ---------------------------------------------------------------------------
# Subject normalization
# ---------------------------------------------------------------------------

SUBJECT_ALIASES = {
    # Map all variants to the short codes stored in the database
    "physics": "physics", "phy": "physics",
    "chemistry": "chem", "chem": "chem",
    "biology": "bio", "bio": "bio",
    "mathematics": "maths", "math": "maths", "maths": "maths",
    "accountancy": "acc", "accounts": "acc", "acc": "acc",
    "economics": "econ", "econ": "econ",
    "business_studies": "bs", "bs": "bs",
    "commerce": "comm", "comm": "comm",
    "computer_science": "cs", "cs": "cs",
    "geography": "geo", "geo": "geo",
    "history_civics": "histciv", "histciv": "histciv",
    "evs": "evs",
    "applied_mathematics": "appmath", "appmath": "appmath",
    "biotechnology": "biotech", "biotech": "biotech",
    "psychology": "psy", "psy": "psy",
    "sociology": "soc", "soc": "soc",
    "political_science": "pol", "pol": "pol",
    "home_science": "home", "home": "home",
    "legal_studies": "legal", "legal": "legal",
    "mass_media": "massmedia", "massmedia": "massmedia",
    "commercial_studies": "commstud", "commstud": "commstud",
    "commercial_applications": "commapp", "commapp": "commapp",
    "economics_applications": "econapp", "econapp": "econapp",
}


def normalize_subject(s: Optional[str]) -> Optional[str]:
    if not s:
        return None
    return SUBJECT_ALIASES.get(s.lower(), s.lower())


# ---------------------------------------------------------------------------
# Qdrant search service
# ---------------------------------------------------------------------------

class QdrantSearchService:
    """Hybrid search service using Qdrant dense + sparse vectors with RRF fusion.

    The service is stateless — it creates a Qdrant client on each search.
    The embedding model is loaded lazily via EmbeddingService.

    Optional cross-encoder reranking with BGE-Reranker-v2-m3 can be enabled
    by setting use_reranker=True in search calls. The reranker is loaded
    lazily on first use.
    """

    _client: Optional[QdrantClient] = None
    _bm25 = None  # BM25 encoder (fitted on the corpus)
    _reranker = None  # Cross-encoder reranker (lazy loaded)
    _reranker_lock = asyncio.Lock()
    _available: Optional[bool] = None  # None = not checked yet

    def __init__(self):
        """Initialize the Qdrant client lazily — don't connect yet."""
        pass  # Don't create client in __init__ — do it lazily

    @classmethod
    def _get_client(cls) -> Optional[QdrantClient]:
        """Lazily create the Qdrant client, with fault tolerance."""
        if cls._client is not None:
            return cls._client
        if cls._available is False:
            return None  # Already confirmed unavailable
        try:
            client = QdrantClient(url=QDRANT_URL, timeout=5)
            # Quick health check
            client.get_collections()
            cls._client = client
            cls._available = True
            return client
        except Exception as e:
            logger.warning(f"Qdrant unavailable at {QDRANT_URL}: {e}")
            cls._available = False
            return None

    @classmethod
    def is_available(cls) -> bool:
        """Check if Qdrant is available."""
        return cls._get_client() is not None

    # ------------------------------------------------------------------ #
    # BM25 sparse vector encoding (self-contained)
    # ------------------------------------------------------------------ #

    @classmethod
    def _get_bm25(cls):
        """Get or build the BM25 encoder for query encoding.

        The BM25 encoder is fitted on a sample of the corpus for IDF estimation.
        For queries, we use the same encoder to produce consistent sparse vectors.
        """
        if cls._bm25 is None:
            bm25 = _BM25Encoder()
            # Fit on a sample of the corpus
            output_dir = Path(r"D:\platform\parsed_output")
            all_texts = []
            for ct in ["enrichment", "misconceptions", "question_bank", "diagnostics", "papers", "drill_banks"]:
                fp = output_dir / f"{ct}.jsonl"
                if not fp.exists():
                    continue
                with open(fp, encoding="utf-8-sig") as f:
                    for i, line in enumerate(f):
                        if i >= 500:  # Sample 500 per type
                            break
                        if not line.strip():
                            continue
                        r = json.loads(line)
                        # Simple text extraction
                        if ct == "enrichment":
                            text = (r.get("title", "") + " " + r.get("definition", ""))[:500]
                        elif ct == "misconceptions":
                            text = (r.get("misconception_text", "") + " " + r.get("correction", ""))[:500]
                        else:
                            text = (r.get("question_text", ""))[:500]
                        if text.strip():
                            all_texts.append(text)

            bm25.fit(all_texts)
            cls._bm25 = bm25

        return cls._bm25

    # ------------------------------------------------------------------ #
    # Cross-encoder reranker (BGE-Reranker-v2-m3)
    # ------------------------------------------------------------------ #

    @classmethod
    async def _get_reranker(cls):
        """Lazy-load the BGE-Reranker-v2-m3 cross-encoder.

        The reranker takes (query, document) pairs and produces a relevance
        score. It's more accurate than bi-encoder similarity but slower,
        so it's only used to rerank the top-k results from hybrid search.
        """
        if cls._reranker is None:
            async with cls._reranker_lock:
                if cls._reranker is None:
                    loop = asyncio.get_event_loop()

                    def _load():
                        from sentence_transformers import CrossEncoder
                        # BGE-Reranker-v2-m3: 568M params, multilingual, 8192 context
                        # Smaller and faster than full BGE-Reranker-v2-gemma
                        return CrossEncoder("BAAI/bge-reranker-v2-m3")

                    cls._reranker = await loop.run_in_executor(None, _load)

        return cls._reranker

    @classmethod
    async def rerank(
        cls,
        query: str,
        results: list,
        top_k: Optional[int] = None,
    ) -> list:
        """Rerank search results using a cross-encoder.

        Args:
            query: The search query.
            results: List of SearchResult objects to rerank.
            top_k: Optional limit on number of results to return.

        Returns:
            Reranked list of SearchResult objects with rerank_score set.
        """
        if not results:
            return results

        reranker = await cls._get_reranker()

        # Build (query, document) pairs for cross-encoder
        pairs = []
        for r in results:
            # Use the most informative text from payload
            if "title" in r.payload:
                doc = r.payload.get("title", "") + " " + r.payload.get("definition", "")[:200]
            elif "question_text" in r.payload:
                doc = r.payload.get("question_text", "")[:500]
            elif "misconception_text" in r.payload:
                doc = r.payload.get("misconception_text", "")[:500]
            else:
                doc = str(r.payload)[:500]
            pairs.append((query, doc))

        # Score pairs with cross-encoder
        loop = asyncio.get_event_loop()

        def _predict():
            return reranker.predict(pairs, show_progress_bar=False)

        scores = await loop.run_in_executor(None, _predict)

        # Update results with reranker scores
        for r, score in zip(results, scores):
            r.rerank_score = float(score)

        # Sort by reranker score
        reranked = sorted(results, key=lambda x: -(x.rerank_score or 0))

        if top_k:
            reranked = reranked[:top_k]

        return reranked

    # ------------------------------------------------------------------ #
    # Filter building
    # ------------------------------------------------------------------ #

    @staticmethod
    def _build_filter(
        class_level: Optional[int] = None,
        subject: Optional[str] = None,
        content_type: Optional[str] = None,
        class_tolerance: int = 0,
    ) -> Optional[Filter]:
        """Build a Qdrant filter from metadata constraints."""
        conditions = []

        if subject:
            norm_subj = normalize_subject(subject)
            if norm_subj:
                conditions.append(FieldCondition(
                    key="subject",
                    match=MatchValue(value=norm_subj),
                ))

        if class_level is not None:
            if class_tolerance > 0:
                # Can't do range on integer with MatchValue — use must with range
                # For simplicity, just use exact match (Qdrant range filters need different syntax)
                conditions.append(FieldCondition(
                    key="class_level",
                    match=MatchValue(value=class_level),
                ))
            else:
                conditions.append(FieldCondition(
                    key="class_level",
                    match=MatchValue(value=class_level),
                ))

        if content_type:
            conditions.append(FieldCondition(
                key="content_type",
                match=MatchValue(value=content_type),
            ))

        if not conditions:
            return None

        return Filter(must=conditions)

    # ------------------------------------------------------------------ #
    # RRF fusion
    # ------------------------------------------------------------------ #

    @staticmethod
    def _rrf_fuse(
        dense_results: list,
        sparse_results: list,
        top_k: int = 10,
    ) -> list[SearchResult]:
        """Fuse dense and sparse results using Reciprocal Rank Fusion.

        RRF score = sum(1 / (k + rank_i)) for each result list

        Args:
            dense_results: Results from dense vector search.
            sparse_results: Results from sparse vector search.
            top_k: Number of fused results to return.
            k: RRF constant (default 60 from the original paper).

        Returns:
            Fused results sorted by RRF score.
        """
        # Build score maps: point_id -> (rrf_score, dense_score, sparse_score, payload)
        rrf_scores = {}
        dense_scores = {}
        sparse_scores = {}
        payloads = {}

        # Dense results
        for rank, r in enumerate(dense_results):
            pid = r.id
            rrf_scores[pid] = rrf_scores.get(pid, 0) + 1.0 / (RRF_K + rank + 1)
            dense_scores[pid] = r.score
            payloads[pid] = r.payload

        # Sparse results
        for rank, r in enumerate(sparse_results):
            pid = r.id
            rrf_scores[pid] = rrf_scores.get(pid, 0) + 1.0 / (RRF_K + rank + 1)
            sparse_scores[pid] = r.score
            if pid not in payloads:
                payloads[pid] = r.payload

        # Build fused results
        fused = []
        for pid, rrf_score in sorted(rrf_scores.items(), key=lambda x: -x[1])[:top_k]:
            fused.append(SearchResult(
                id=pid,
                score=rrf_score,
                payload=payloads.get(pid, {}),
                dense_score=dense_scores.get(pid),
                sparse_score=sparse_scores.get(pid),
            ))

        return fused

    # ------------------------------------------------------------------ #
    # Public search methods
    # ------------------------------------------------------------------ #

    async def search_nodes(
        self,
        query: str,
        class_level: Optional[int] = None,
        subject: Optional[str] = None,
        top_k: int = 5,
        class_tolerance: int = 0,
        use_reranker: bool = False,
    ) -> SearchResponse:
        """Search enrichment nodes for content retrieval and routing.

        Args:
            use_reranker: If True, rerank top results with BGE-Reranker-v2-m3.
        """
        resp = await self._search_collection(
            collection_name=COLLECTIONS["nodes"],
            query=query,
            class_level=class_level,
            subject=subject,
            top_k=top_k,
            class_tolerance=class_tolerance,
        )
        if use_reranker and resp.results:
            resp.results = await self.rerank(query, resp.results, top_k=top_k)
            resp.method = "hybrid_rrf_reranked"
        return resp

    async def search_questions(
        self,
        query: str,
        class_level: Optional[int] = None,
        subject: Optional[str] = None,
        top_k: int = 10,
        content_type: Optional[str] = None,
        use_reranker: bool = False,
    ) -> SearchResponse:
        """Search question records for practice and assessment.

        Args:
            use_reranker: If True, rerank top results with BGE-Reranker-v2-m3.
        """
        resp = await self._search_collection(
            collection_name=COLLECTIONS["questions"],
            query=query,
            class_level=class_level,
            subject=subject,
            top_k=top_k,
            content_type=content_type,
        )
        if use_reranker and resp.results:
            resp.results = await self.rerank(query, resp.results, top_k=top_k)
            resp.method = "hybrid_rrf_reranked"
        return resp

    async def search_misconceptions(
        self,
        query: str,
        class_level: Optional[int] = None,
        subject: Optional[str] = None,
        top_k: int = 5,
        use_reranker: bool = False,
    ) -> SearchResponse:
        """Search misconception records for remediation.

        Args:
            use_reranker: If True, rerank top results with BGE-Reranker-v2-m3.
        """
        resp = await self._search_collection(
            collection_name=COLLECTIONS["misconceptions"],
            query=query,
            class_level=class_level,
            subject=subject,
            top_k=top_k,
        )
        if use_reranker and resp.results:
            resp.results = await self.rerank(query, resp.results, top_k=top_k)
            resp.method = "hybrid_rrf_reranked"
        return resp

    async def _search_collection(
        self,
        collection_name: str,
        query: str,
        class_level: Optional[int] = None,
        subject: Optional[str] = None,
        top_k: int = 5,
        content_type: Optional[str] = None,
        class_tolerance: int = 0,
    ) -> SearchResponse:
        """Internal: perform hybrid search on a single collection."""
        start = time.time()

        # Check if Qdrant is available
        client = self._get_client()
        if client is None:
            return SearchResponse(
                query=query,
                results=[],
                latency_ms=0,
                method="qdrant_unavailable",
            )

        # Get embedding service
        EmbeddingService = _get_embedding_service_class()
        emb_service = await EmbeddingService.get_instance()

        # Generate dense query vector
        dense_vector = await emb_service.encode(query)

        # Generate sparse query vector
        bm25 = self._get_bm25()
        sparse_vec = bm25.encode(query)

        # Build filter
        qdrant_filter = self._build_filter(
            class_level=class_level,
            subject=subject,
            content_type=content_type,
            class_tolerance=class_tolerance,
        )

        # Search with both dense and sparse vectors in parallel
        loop = asyncio.get_event_loop()

        def _dense_search():
            search_params = {
                "collection_name": collection_name,
                "query": dense_vector,
                "using": "dense",
                "limit": top_k * 3,  # Over-fetch for fusion
                "with_payload": True,
            }
            if qdrant_filter:
                search_params["query_filter"] = qdrant_filter
            result = client.query_points(**search_params)
            return result.points

        def _sparse_search():
            search_params = {
                "collection_name": collection_name,
                "query": SparseVector(
                    indices=sparse_vec["indices"],
                    values=sparse_vec["values"],
                ),
                "using": "sparse",
                "limit": top_k * 3,
                "with_payload": True,
            }
            if qdrant_filter:
                search_params["query_filter"] = qdrant_filter
            result = client.query_points(**search_params)
            return result.points

        # Run both searches concurrently
        dense_task = loop.run_in_executor(None, _dense_search)
        sparse_task = loop.run_in_executor(None, _sparse_search)

        dense_raw, sparse_raw = await asyncio.gather(dense_task, sparse_task)

        # Convert to SearchResult objects
        dense_results = [
            SearchResult(id=r.id, score=r.score, payload=r.payload or {})
            for r in dense_raw
        ]
        sparse_results = [
            SearchResult(id=r.id, score=r.score, payload=r.payload or {})
            for r in sparse_raw
        ]

        # RRF fusion
        fused = self._rrf_fuse(dense_results, sparse_results, top_k=top_k)

        latency = (time.time() - start) * 1000

        return SearchResponse(
            query=query,
            results=fused,
            latency_ms=latency,
            method="hybrid_rrf",
        )

    # ------------------------------------------------------------------ #
    # Dense-only search (for fallback / comparison)
    # ------------------------------------------------------------------ #

    async def search_dense_only(
        self,
        collection: str,
        query: str,
        class_level: Optional[int] = None,
        subject: Optional[str] = None,
        top_k: int = 5,
    ) -> SearchResponse:
        """Dense-only search (no BM25). For benchmarking."""
        start = time.time()

        client = self._get_client()
        if client is None:
            return SearchResponse(query=query, results=[], latency_ms=0, method="qdrant_unavailable")

        EmbeddingService = _get_embedding_service_class()
        emb_service = await EmbeddingService.get_instance()
        dense_vector = await emb_service.encode(query)

        qdrant_filter = self._build_filter(class_level=class_level, subject=subject)

        loop = asyncio.get_event_loop()

        def _search():
            params = {
                "collection_name": COLLECTIONS.get(collection, collection),
                "query": dense_vector,
                "using": "dense",
                "limit": top_k,
                "with_payload": True,
            }
            if qdrant_filter:
                params["query_filter"] = qdrant_filter
            result = client.query_points(**params)
            return result.points

        raw = await loop.run_in_executor(None, _search)

        results = [
            SearchResult(id=r.id, score=r.score, payload=r.payload or {})
            for r in raw
        ]

        latency = (time.time() - start) * 1000

        return SearchResponse(
            query=query,
            results=results,
            latency_ms=latency,
            method="dense_only",
        )

    # ------------------------------------------------------------------ #
    # Sparse-only search (for fallback / comparison)
    # ------------------------------------------------------------------ #

    async def search_sparse_only(
        self,
        collection: str,
        query: str,
        class_level: Optional[int] = None,
        subject: Optional[str] = None,
        top_k: int = 5,
    ) -> SearchResponse:
        """Sparse-only search (BM25, no dense). For benchmarking."""
        start = time.time()

        from qdrant_client.models import SparseVector
        bm25 = self._get_bm25()
        sparse_vec = bm25.encode(query)

        qdrant_filter = self._build_filter(class_level=class_level, subject=subject)

        loop = asyncio.get_event_loop()

        def _search():
            params = {
                "collection_name": COLLECTIONS.get(collection, collection),
                "query": SparseVector(
                    indices=sparse_vec["indices"],
                    values=sparse_vec["values"],
                ),
                "using": "sparse",
                "limit": top_k,
                "with_payload": True,
            }
            if qdrant_filter:
                params["query_filter"] = qdrant_filter
            result = self._client.query_points(**params)
            return result.points

        raw = await loop.run_in_executor(None, _search)

        results = [
            SearchResult(id=r.id, score=r.score, payload=r.payload or {})
            for r in raw
        ]

        latency = (time.time() - start) * 1000

        return SearchResponse(
            query=query,
            results=results,
            latency_ms=latency,
            method="sparse_only",
        )
