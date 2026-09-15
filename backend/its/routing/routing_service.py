"""Routing service for student questions.

Uses sentence-transformer embeddings for semantic matching of student
questions to knowledge nodes. Handles:
  - Morphological variations (trigonometry/trigonometric)
  - Paraphrasing ("what makes things fall" → "gravity")
  - Class-appropriate depth (Class 5 student gets simple photosynthesis,
    Class 11 student gets photophosphorylation details)
  - Scales to 15k+ nodes

The embedding model (all-MiniLM-L6-v2, ~80MB) runs locally on CPU.
It is NOT an LLM — it does not generate text. It only converts text
to vectors for similarity matching. Answer content always comes from
the verified enrichment database.

Class-aware routing strategy:
  1. Search within the student's class level first (exact match)
  2. If no good match, search adjacent classes (±1 level)
  3. If still no match, search all classes
  This ensures a Class 5 student gets Class 5 content, not Class 11.
"""

import re
import asyncio
import numpy as np
from typing import Optional
from dataclasses import dataclass, field

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.enrichment import EnrichmentContent


@dataclass
class RouteResult:
    """Result of routing a student question."""
    node_id: str
    node_title: str
    field: str
    confidence: float
    method: str
    candidates: list = field(default_factory=list)


# --------------------------------------------------------------------------- #
# Intent classification (keyword based — unchanged)
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


# --------------------------------------------------------------------------- #
# Embedding model — loaded once, reused across all requests
# --------------------------------------------------------------------------- #

_model = None
_model_lock = asyncio.Lock()

async def get_model():
    """Lazy-load the sentence-transformer model (singleton)."""
    global _model
    if _model is None:
        async with _model_lock:
            if _model is None:
                from sentence_transformers import SentenceTransformer
                _model = SentenceTransformer('all-MiniLM-L6-v2')
    return _model


# --------------------------------------------------------------------------- #
# Embedding cache — pre-computed node embeddings with class/subject metadata
# --------------------------------------------------------------------------- #

class EmbeddingCache:
    """Cache of node embeddings with class-level and subject metadata.

    Stores embeddings for all nodes in a single numpy array, plus
    metadata arrays for class_level and subject so we can filter
    search results by the student's class.
    """

    _instance = None
    _node_ids: list[str] = []
    _node_titles: dict[str, str] = {}
    _node_classes: np.ndarray = None   # shape: (N,) — int class levels
    _node_subjects: list[str] = []     # shape: (N,) — subject strings
    _embeddings: np.ndarray = None     # shape: (N, 384) — normalized
    _lock = asyncio.Lock()

    # Subject name normalization (DB uses short forms)
    _SUBJECT_ALIASES = {
        "physics": "physics", "phy": "physics",
        "chemistry": "chemistry", "chem": "chemistry",
        "biology": "biology", "bio": "biology",
        "mathematics": "maths", "math": "maths", "maths": "maths",
    }

    @classmethod
    def _norm_subject(cls, s: Optional[str]) -> Optional[str]:
        if not s:
            return None
        return cls._SUBJECT_ALIASES.get(s.lower(), s.lower())

    @classmethod
    async def get_or_build(cls, db: AsyncSession) -> "EmbeddingCache":
        """Get the cached embeddings, or build them if not yet computed."""
        if cls._instance is None or cls._embeddings is None:
            async with cls._lock:
                if cls._instance is None or cls._embeddings is None:
                    await cls._build(db)
                    cls._instance = cls()
        return cls._instance

    @classmethod
    async def _build(cls, db: AsyncSession):
        """Load all nodes, compute embeddings, store in memory."""
        stmt = select(
            EnrichmentContent.node_id,
            EnrichmentContent.title,
            EnrichmentContent.definition,
            EnrichmentContent.subject,
            EnrichmentContent.class_level,
        )
        result = await db.execute(stmt)
        rows = list(result.all())

        cls._node_ids = [r[0] for r in rows]
        cls._node_titles = {r[0]: r[1] for r in rows}
        cls._node_classes = np.array([r[4] or 0 for r in rows], dtype=np.int32)
        cls._node_subjects = [cls._norm_subject(r[3]) for r in rows]

        # Build text to embed: title + first 200 chars of definition
        texts = []
        for r in rows:
            title = r[1] or ""
            defn = (r[2] or "")[:200]
            texts.append(f"{title}. {defn}")

        # Compute embeddings (batch)
        model = await get_model()
        loop = asyncio.get_event_loop()
        cls._embeddings = await loop.run_in_executor(
            None,
            lambda: model.encode(texts, convert_to_numpy=True, show_progress_bar=False)
        )

        # Normalize for cosine similarity
        norms = np.linalg.norm(cls._embeddings, axis=1, keepdims=True)
        cls._embeddings = cls._embeddings / np.maximum(norms, 1e-8)

    @classmethod
    async def rebuild(cls, db: AsyncSession):
        """Force rebuild (e.g., after adding new nodes)."""
        async with cls._lock:
            await cls._build(db)
            cls._instance = cls()

    @classmethod
    def is_ready(cls) -> bool:
        return cls._embeddings is not None and len(cls._node_ids) > 0

    @classmethod
    def search(
        cls,
        query_embedding: np.ndarray,
        top_k: int = 5,
        class_level: Optional[int] = None,
        subject: Optional[str] = None,
        class_tolerance: int = 0,
    ) -> list[tuple[str, float]]:
        """Find the top-k most similar nodes, optionally filtered by class/subject.

        Args:
            query_embedding: The embedded question vector.
            top_k: Number of results to return.
            class_level: If set, only search nodes at this class level.
            subject: If set, only search nodes for this subject.
            class_tolerance: If class_level is set, also include classes
                within ±this many levels. 0 = exact class only.

        Returns:
            List of (node_id, cosine_similarity) sorted by similarity.
        """
        if cls._embeddings is None:
            return []

        # Normalize query
        query_norm = np.linalg.norm(query_embedding)
        if query_norm > 0:
            query_embedding = query_embedding / query_norm

        # Cosine similarity = dot product (both normalized)
        similarities = cls._embeddings @ query_embedding

        # Build a mask for filtering
        mask = np.ones(len(similarities), dtype=bool)

        if class_level is not None:
            if class_tolerance > 0:
                lo = class_level - class_tolerance
                hi = class_level + class_tolerance
                mask &= (cls._node_classes >= lo) & (cls._node_classes <= hi)
            else:
                mask &= (cls._node_classes == class_level)

        if subject is not None:
            norm_subj = cls._norm_subject(subject)
            subj_arr = np.array(cls._node_subjects)
            mask &= (subj_arr == norm_subj)

        # Apply mask — set non-matching similarities to -1
        filtered_sims = np.where(mask, similarities, -1.0)

        # Get top-k indices from filtered results
        top_indices = np.argsort(filtered_sims)[-top_k:][::-1]

        # Filter out -1 entries (no match)
        results = []
        for i in top_indices:
            if filtered_sims[i] > -1.0:
                results.append((cls._node_ids[i], float(filtered_sims[i])))

        return results


# --------------------------------------------------------------------------- #
# Routing service
# --------------------------------------------------------------------------- #

class RoutingService:
    """Routes student questions to the correct node using semantic embeddings.

    Class-aware: searches the student's class level first, then falls back
    to adjacent classes, then all classes. This ensures age-appropriate
    content depth.
    """

    # Confidence threshold for accepting a match
    CONFIDENCE_THRESHOLD = 0.30

    # Keyword-based routing overrides for cases where embeddings misroute.
    # Maps keyword patterns to preferred node IDs.
    # This runs BEFORE embedding search — if it matches, it overrides.
    KEYWORD_OVERRIDES = [
        # Bacteria/population growth → exponential functions, not compound interest
        (["bacteria growth", "bacterial growth", "population growth", "exponential growth",
          "which mathematical concept models"],
         ["c11_math_013", "c12_math_038", "c12_bio_063"],  # exponential functions, derivatives of exp, population growth models
         "maths"),
        # Newton's law of cooling → differential equations, not straight lines
        (["newton's law of cooling", "newtons law of cooling", "rate of cooling",
          "cooling constant", "dt/dt = -k"],
         ["c12_math_044", "c10_phy_039"],  # derivatives as rate of change, cooling
         None),
        # Bt cotton / GM crops / transgenic plants → biotechnology in agriculture
        (["bt cotton", "b.t. cotton", "transgenic plant", "transgenic crop", "gm crop",
          "gm cotton", "genetically modified crop", "cry gene", "cry protein",
          "bacillus thuringiensis", "agrobacterium", "ti plasmid"],
         ["c12_bio_047", "c12_bio_044"],  # biotechnology in agriculture, biotechnology principles
         "bio"),
        # Newton's First Law → taught from Class 6 (force changes state of motion)
        # Class 6 introduces the concept qualitatively (push/pull, state of motion)
        # Class 9 formalises it as "Newton's First Law (inertia)"
        # Class 11 adds the mathematical form (ΣF=0 → a=0)
        # Default to the earliest introduction (Class 6) unless a higher class is specified
        (["newton's first law", "newtons first law", "newton first law",
          "first law of motion", "law of inertia", "what is inertia",
          "inertia of rest", "inertia of motion"],
         ["c6_phy_013", "c9_phy_014", "c11_phy_016"],  # Class 6 → 9 → 11 progression
         "physics"),
    ]

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
        class_filter: Optional[int] = None,
    ) -> Optional[tuple[str, str]]:
        """Check if the message matches any keyword override pattern.

        Returns (node_id, title) if matched, None otherwise.
        When class_filter is provided, returns the node closest to that class.
        When no class_filter, returns the lowest class node (earliest introduction).
        """
        lower = message.lower().strip()
        for keywords, node_ids, required_subject in RoutingService.KEYWORD_OVERRIDES:
            if required_subject and subject_filter and subject_filter.lower() not in required_subject:
                continue
            if any(kw in lower for kw in keywords):
                # Build (node_id, title, class_level) for nodes that exist
                candidates = []
                for nid in node_ids:
                    title = EmbeddingCache._node_titles.get(nid)
                    if title:
                        idx = EmbeddingCache._node_ids.index(nid) if nid in EmbeddingCache._node_ids else -1
                        cls = int(EmbeddingCache._node_classes[idx]) if idx >= 0 and idx < len(EmbeddingCache._node_classes) else 99
                        candidates.append((nid, title, cls))
                if not candidates:
                    continue
                # If class_filter given, pick the closest class (prefer exact, then nearest)
                if class_filter is not None:
                    candidates.sort(key=lambda x: abs(x[2] - class_filter))
                else:
                    # No class filter → pick lowest class (earliest introduction)
                    candidates.sort(key=lambda x: x[2])
                return candidates[0][0], candidates[0][1]
        return None

    @staticmethod
    async def route(
        db: AsyncSession,
        message: str,
        current_node_id: Optional[str] = None,
        subject_filter: Optional[str] = None,
        class_filter: Optional[int] = None,
    ) -> Optional[RouteResult]:
        """Route a student question to the best matching node.

        Uses a 3-tier class-aware search:
          1. Exact class level match (Class 5 student → Class 5 nodes)
          2. Adjacent classes ±1 (if no good match in exact class)
          3. All classes (last resort)

        Returns None if no good match is found.
        """
        cache = await EmbeddingCache.get_or_build(db)

        if not EmbeddingCache.is_ready():
            return None

        # Check keyword overrides FIRST (before embedding search)
        override = RoutingService._check_keyword_overrides(message, subject_filter, class_filter)
        if override:
            node_id, title = override
            field_name = RoutingService.classify_intent(message)
            return RouteResult(
                node_id=node_id,
                node_title=title,
                field=field_name,
                confidence=0.95,
                method="keyword_override",
                candidates=[node_id],
            )

        if not EmbeddingCache.is_ready():
            return None

        # Embed the query
        model = await get_model()
        loop = asyncio.get_event_loop()
        query_embedding = await loop.run_in_executor(
            None,
            lambda: model.encode([message], convert_to_numpy=True, show_progress_bar=False)[0]
        )

        # ── Tier 1: Search within the student's exact class level ──
        results = []
        if class_filter is not None:
            results = EmbeddingCache.search(
                query_embedding, top_k=5,
                class_level=class_filter,
                subject=subject_filter,
                class_tolerance=0,
            )

        # ── Tier 2: Search adjacent classes (±1) ──
        # Always run this — even if tier 1 found something, an adjacent
        # class might have a much better match (e.g., topic not taught at
        # the student's exact class but available one level down)
        if class_filter is not None:
            adjacent = EmbeddingCache.search(
                query_embedding, top_k=5,
                class_level=class_filter,
                subject=subject_filter,
                class_tolerance=1,
            )
            if adjacent and (not results or adjacent[0][1] > results[0][1] * 1.15):
                # Only use adjacent if it's meaningfully better (15%+)
                results = adjacent

        # ── Tier 3: Search all classes if tier 1+2 were weak ──
        if not results or results[0][1] < RoutingService.CONFIDENCE_THRESHOLD:
            all_results = EmbeddingCache.search(
                query_embedding, top_k=10,
                subject=subject_filter,
            )
            if all_results and (not results or all_results[0][1] > results[0][1] * 1.15):
                results = all_results

        # ── Tier 3b: When no class filter, prefer lowest class among near-equal matches ──
        # A Class 6 student asking "what is newton first law" should get Class 9
        # content (the lowest available), not Class 11.
        if class_filter is None and len(results) >= 2:
            best_sim = results[0][1]
            # Find all results within 20% of the best match — longer Class 11
            # content naturally scores higher on embedding similarity, but
            # pedagogically the lowest available class is the right starting point.
            near_equal = [(nid, sim) for nid, sim in results if sim >= best_sim * 0.80]
            if len(near_equal) > 1:
                # Build node_id → class_level lookup
                node_ids = EmbeddingCache._node_ids
                node_classes = EmbeddingCache._node_classes
                id_to_class = {}
                if node_ids is not None and node_classes is not None:
                    for i, nid in enumerate(node_ids):
                        if i < len(node_classes):
                            id_to_class[nid] = int(node_classes[i])
                # Sort by class level (lowest first), then by similarity
                near_equal.sort(key=lambda x: (id_to_class.get(x[0], 99), -x[1]))
                results = near_equal + [r for r in results if r not in near_equal]

        if not results:
            return None

        best_node_id, best_sim = results[0]

        # Context boost: if the student is currently studying a node and it
        # appears in the top results, boost it
        if current_node_id:
            for node_id, sim in results:
                if node_id == current_node_id and sim > 0.2:
                    best_node_id = current_node_id
                    best_sim = max(sim, 0.8)
                    break

        # Confidence threshold
        if best_sim < RoutingService.CONFIDENCE_THRESHOLD:
            return None

        field_name = RoutingService.classify_intent(message)
        best_title = EmbeddingCache._node_titles.get(best_node_id, "")

        return RouteResult(
            node_id=best_node_id,
            node_title=best_title,
            field=field_name,
            confidence=best_sim,
            method="embedding",
            candidates=[n for n, _ in results[:5]],
        )
