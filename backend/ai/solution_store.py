"""Solution store — persists DeepSeek-generated solutions and embeds them.

Every time DeepSeek generates a worked solution (because SymPy couldn't compute
and no model answer existed), we:
1. Save it to disk (JSON)
2. Embed it with MiniLM
3. Add it to the matching index

Next time a similar question comes in, MiniLM matches it directly —
no DeepSeek call needed. The system gets smarter over time.
"""
from __future__ import annotations

import json
import logging
import numpy as np
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Optional

logger = logging.getLogger(__name__)

STORE_FILE = Path(__file__).parent / "_deepseek_solutions.json"
EMBEDDINGS_FILE = Path(__file__).parent / "_deepseek_embeddings.npy"


@dataclass
class StoredSolution:
    """A DeepSeek-generated solution stored for future matching."""
    question: str
    solution: str
    category: str
    class_level: int
    steps: list[dict]
    created_at: str
    question_embedding: list[float] = field(default_factory=list)


class SolutionStore:
    """Stores and indexes DeepSeek-generated solutions."""

    def __init__(self):
        self._solutions: list[dict] = []
        self._embeddings: Optional[np.ndarray] = None
        self._embedder = None

    def _load_embedder(self):
        if self._embedder is None:
            from sentence_transformers import SentenceTransformer
            self._embedder = SentenceTransformer('all-MiniLM-L6-v2')
        return self._embedder

    def load(self) -> None:
        """Load stored solutions from disk."""
        if self._solutions:
            return
        if STORE_FILE.exists():
            try:
                self._solutions = json.loads(STORE_FILE.read_text(encoding="utf-8"))
                logger.info(f"Loaded {len(self._solutions)} stored DeepSeek solutions")
            except Exception as e:
                logger.warning(f"Failed to load solutions: {e}")
                self._solutions = []

        if EMBEDDINGS_FILE.exists():
            self._embeddings = np.load(EMBEDDINGS_FILE)
        else:
            self._embeddings = None

    def save(self) -> None:
        """Save solutions to disk."""
        STORE_FILE.write_text(
            json.dumps(self._solutions, indent=2, ensure_ascii=False),
            encoding="utf-8"
        )
        if self._embeddings is not None:
            np.save(EMBEDDINGS_FILE, self._embeddings)

    def add(self, question: str, solution: str, category: str,
            class_level: int, steps: list[dict]) -> None:
        """Add a new DeepSeek-generated solution and embed it."""
        self.load()

        # Check if we already have this question
        for s in self._solutions:
            if s["question"][:200] == question[:200]:
                return  # already stored

        # Embed the question
        embedder = self._load_embedder()
        q_emb = embedder.encode([question[:500]], normalize_embeddings=True)[0]

        entry = {
            "question": question[:500],
            "solution": solution,
            "category": category,
            "class_level": class_level,
            "steps": steps,
            "created_at": datetime.now().isoformat(),
            "embedding": q_emb.tolist(),
        }
        self._solutions.append(entry)

        # Update embeddings array
        if self._embeddings is None:
            self._embeddings = np.array([q_emb])
        else:
            self._embeddings = np.vstack([self._embeddings, q_emb])

        self.save()
        logger.info(f"Stored DeepSeek solution for: '{question[:50]}...' (total: {len(self._solutions)})")

    def match(self, question: str, threshold: float = 0.75) -> Optional[dict]:
        """Check if we already have a stored solution for a similar question.

        Returns the stored solution if found, None otherwise.
        """
        self.load()
        if not self._solutions or self._embeddings is None:
            return None

        embedder = self._load_embedder()
        q_emb = embedder.encode([question[:500]], normalize_embeddings=True)

        sims = (self._embeddings @ q_emb.T).flatten()
        best_idx = int(np.argmax(sims))
        best_sim = float(sims[best_idx])

        if best_sim >= threshold:
            logger.info(f"Stored solution match (sim={best_sim:.3f})")
            return self._solutions[best_idx]

        return None

    def count(self) -> int:
        """Number of stored solutions."""
        self.load()
        return len(self._solutions)


# Singleton
_store: Optional[SolutionStore] = None


def get_store() -> SolutionStore:
    """Get the singleton store."""
    global _store
    if _store is None:
        _store = SolutionStore()
        _store.load()
    return _store
