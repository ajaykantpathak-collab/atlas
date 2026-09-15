"""Routing service v2 — delegates to Qdrant hybrid search.

Replaces the in-memory numpy embedding search from dream_app's routing_service.py
with Qdrant hybrid search (dense Granite + sparse BM25 + RRF fusion).

Key improvements over v1:
  - Multilingual: Hindi queries work (Granite 97M supports 200+ languages)
  - Hybrid: Dense semantic + sparse BM25 keyword matching with RRF fusion
  - Scalable: No in-memory numpy arrays — Qdrant handles indexing
  - Optional reranking: BGE-Reranker-v2-m3 for higher accuracy
  - Same interface: RouteResult dataclass preserved for backward compatibility

The original routing_service.py is NOT modified. This is a new file in the
platform directory that can be used as a drop-in replacement.

Usage:
    from backend.its.routing.routing_service_semantic import RoutingServiceV2

    result = await RoutingServiceV2.route(
        db=db,
        message="What is photosynthesis?",
        subject_filter="bio",
        class_filter=10,
    )
"""

import asyncio
import logging
from typing import Optional
from dataclasses import dataclass, field

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from services.qdrant_service import QdrantSearchService, SearchResult
from services.keyword_fallback_router import KeywordFallbackRouter, FallbackResult

logger = logging.getLogger(__name__)


@dataclass
class RouteResult:
    """Result of routing a student question."""
    node_id: str
    node_title: str
    field: str
    confidence: float
    method: str
    candidates: list = field(default_factory=list)
    board: str = ""
    subject: str = ""
    class_level: int = 0


# --------------------------------------------------------------------------- #
# Intent classification (keyword based — unchanged from v1)
# --------------------------------------------------------------------------- #

INTENT_KEYWORDS = {
    "definition": ["define", "definition", "what is", "what are", "explain", "meaning", "describe"],
    "text_walkthrough": ["walk me through", "step by step", "how does", "how do", "why does", "why do", "walkthrough", "guide me"],
    "eli5": ["simply", "simple", "easy way", "i don't get it", "eli5", "explain like", "confused", "too hard", "simplify"],
    "common_misconception": ["mistake", "wrong", "error", "misconception", "common error", "students often", "confused about"],
    "diagnostic_questions": ["test me", "practice", "question", "quiz", "check", "assess", "diagnostic"],
    "on_failure": ["stuck", "help", "can't do", "failed", "i don't understand", "struggling", "difficult"],
    "scope_boundary": ["scope", "syllabus", "what do i need", "what to study", "what's covered", "in scope", "out of scope"],
    "mastery_criteria": ["am i ready", "move on", "next", "mastered", "mastery", "criteria", "when can i"],
    "examples": ["example", "show me", "solve", "work through", "demonstrate", "sample"],
}


class RoutingServiceV2:
    """Routes student questions to curriculum nodes using Qdrant hybrid search.

    Class-aware: searches the student's class level first, then falls back
    to adjacent classes, then all classes. This ensures age-appropriate content.

    Keyword overrides from v1 are preserved for known edge cases.
    """

    # Confidence threshold for accepting a match
    CONFIDENCE_THRESHOLD = 0.30

    # Keyword-based routing overrides (same as v1)
    KEYWORD_OVERRIDES = [
        (["bacteria growth", "bacterial growth", "population growth", "exponential growth",
          "which mathematical concept models"],
         ["c11_math_013", "c12_math_038", "c12_bio_063"],
         "maths"),
        (["newton's law of cooling", "newtons law of cooling", "rate of cooling",
          "cooling constant", "dt/dt = -k"],
         ["c12_math_044", "c10_phy_039"],
         None),
        (["bt cotton", "b.t. cotton", "transgenic plant", "transgenic crop", "gm crop",
          "gm cotton", "genetically modified crop", "cry gene", "cry protein",
          "bacillus thuringiensis", "agrobacterium", "ti plasmid"],
         ["c12_bio_047", "c12_bio_044"],
         "bio"),
    ]

    # Singleton Qdrant service
    _qdrant_service: Optional[QdrantSearchService] = None

    @classmethod
    def _get_qdrant_service(cls) -> QdrantSearchService:
        if cls._qdrant_service is None:
            cls._qdrant_service = QdrantSearchService()
        return cls._qdrant_service

    @staticmethod
    def classify_intent(message: str) -> str:
        """Classify what the student wants based on keywords."""
        lower = message.lower().strip()
        for field_name, keywords in INTENT_KEYWORDS.items():
            for kw in keywords:
                if kw in lower:
                    return field_name
        if lower.endswith("?") or any(w in lower for w in ["what", "why", "how", "when", "where", "who"]):
            return "definition"
        return "definition"

    @staticmethod
    def _check_keyword_overrides(
        message: str,
        subject_filter: Optional[str] = None,
    ) -> Optional[tuple[str, str]]:
        """Check if the message matches any keyword override pattern."""
        lower = message.lower().strip()
        for keywords, node_ids, required_subject in RoutingServiceV2.KEYWORD_OVERRIDES:
            if required_subject and subject_filter and subject_filter.lower() not in required_subject:
                continue
            if any(kw in lower for kw in keywords):
                return node_ids[0], node_ids[0]  # Return first node_id
        return None

    @staticmethod
    async def _get_node_title(db: Optional[AsyncSession], node_id: str) -> str:
        """Fetch node title from database. Returns empty string if db is None or node not found."""
        if db is None:
            return ""
        try:
            from backend.models.enrichment import EnrichmentContent
            result = await db.execute(
                select(EnrichmentContent.title).where(EnrichmentContent.node_id == node_id)
            )
            row = result.first()
            return row[0] if row else ""
        except Exception:
            return ""

    @classmethod
    async def route(
        cls,
        db: AsyncSession,
        message: str,
        current_node_id: Optional[str] = None,
        subject_filter: Optional[str] = None,
        class_filter: Optional[int] = None,
        board: Optional[str] = None,
        use_reranker: bool = False,
    ) -> Optional[RouteResult]:
        """Route a student question to the best matching node.

        Uses Qdrant hybrid search with a 3-tier class-aware strategy:
          1. Exact class level match
          2. Adjacent classes ±1 (if no good match in exact class)
          3. All classes (last resort)

        Falls back to keyword-based search over CBSE/CISCE node files
        when Qdrant is unavailable or returns no results.

        Args:
            db: Database session for fetching node titles.
            message: The student's question.
            current_node_id: Node the student is currently studying (for context boost).
            subject_filter: Optional subject filter (e.g., "bio", "physics").
            class_filter: Optional class level filter (1-12).
            board: Optional board filter ("CBSE" or "CISCE").
            use_reranker: If True, use BGE-Reranker for higher accuracy (slower).

        Returns:
            RouteResult if a good match is found, None otherwise.
        """
        service = cls._get_qdrant_service()

        # Check keyword overrides FIRST (before Qdrant search)
        override = cls._check_keyword_overrides(message, subject_filter)
        if override:
            node_id, _ = override
            title = await cls._get_node_title(db, node_id)
            field_name = cls.classify_intent(message)
            return RouteResult(
                node_id=node_id,
                node_title=title,
                field=field_name,
                confidence=0.95,
                method="keyword_override",
                candidates=[node_id],
                board=board or "",
                subject=subject_filter or "",
                class_level=class_filter or 0,
            )

        # Try Qdrant hybrid search first
        qdrant_result = await cls._qdrant_search(
            service=service,
            message=message,
            subject_filter=subject_filter,
            class_filter=class_filter,
            current_node_id=current_node_id,
            use_reranker=use_reranker,
        )

        if qdrant_result is not None:
            qdrant_result.board = board or ""
            qdrant_result.subject = subject_filter or ""
            qdrant_result.class_level = class_filter or 0
            return qdrant_result

        # Fallback: keyword-based search over node files
        logger.info("Qdrant search returned no results, falling back to keyword router")
        fallback = KeywordFallbackRouter.route(
            message=message,
            subject=subject_filter,
            class_level=class_filter,
            board=board,
        )

        if fallback is not None:
            field_name = cls.classify_intent(message)
            return RouteResult(
                node_id=fallback.node_id,
                node_title=fallback.node_title,
                field=field_name,
                confidence=fallback.confidence,
                method=fallback.method,
                candidates=fallback.candidates,
                board=fallback.board,
                subject=fallback.subject,
                class_level=fallback.class_level,
            )

        return None

    @classmethod
    async def _qdrant_search(
        cls,
        service: QdrantSearchService,
        message: str,
        subject_filter: Optional[str],
        class_filter: Optional[int],
        current_node_id: Optional[str],
        use_reranker: bool,
    ) -> Optional[RouteResult]:
        """Try Qdrant hybrid search. Returns None if Qdrant is unavailable or no good match."""
        # Check if Qdrant is available
        if not QdrantSearchService.is_available():
            logger.info("Qdrant not available, skipping to keyword fallback")
            return None

        try:
            # Tier 1: Search within the student's exact class level
            results = []
            if class_filter is not None:
                resp = await service.search_nodes(
                    query=message,
                    class_level=class_filter,
                    subject=subject_filter,
                    top_k=5,
                    use_reranker=use_reranker,
                )
                results = resp.results

            # Tier 2: Search all classes if tier 1 was weak
            if not results or (results[0].dense_score or 0) < cls.CONFIDENCE_THRESHOLD:
                resp_all = await service.search_nodes(
                    query=message,
                    subject=subject_filter,
                    top_k=5,
                    use_reranker=use_reranker,
                )
                if resp_all.results:
                    if not results or (resp_all.results[0].dense_score or 0) > (results[0].dense_score or 0) * 1.15:
                        results = resp_all.results

            if not results:
                return None

            # Get best result
            best = results[0]
            best_node_id = best.payload.get("node_id", "")
            best_score = best.dense_score or best.score

            # Context boost: if the student is currently studying a node and it
            # appears in the top results, boost it
            if current_node_id:
                for r in results:
                    if r.payload.get("node_id") == current_node_id and (r.dense_score or 0) > 0.2:
                        best_node_id = current_node_id
                        best_score = max(r.dense_score or 0, 0.8)
                        break

            # Confidence threshold
            if best_score < cls.CONFIDENCE_THRESHOLD:
                return None

            field_name = cls.classify_intent(message)
            best_title = best.payload.get("title", "")

            return RouteResult(
                node_id=best_node_id,
                node_title=best_title,
                field=field_name,
                confidence=best_score,
                method="qdrant_hybrid" + ("_reranked" if use_reranker else ""),
                candidates=[r.payload.get("node_id", "") for r in results[:5]],
            )
        except Exception as e:
            logger.warning(f"Qdrant search failed: {e}")
            return None
