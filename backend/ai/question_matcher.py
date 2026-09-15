"""MiniLM-based question matcher.

Embeds all 8,746 pre-built questions with MiniLM and matches
student-typed questions to the closest pre-built question.

No LLM. No DeepSeek. Just local MiniLM embeddings + cosine similarity.

The matched question provides:
- The step decomposition (from worked examples / board style)
- The model answer (for verification)
- The linked curriculum node (for graph-based remediation)
- The category (for SymPy operation selection)
"""
from __future__ import annotations

import os
os.environ['TRANSFORMERS_OFFLINE'] = '1'
os.environ['HF_HUB_OFFLINE'] = '1'

import json
import logging
import numpy as np
from pathlib import Path
from typing import Optional

from backend.ai.question_loader import build_question_bank, ParsedQuestion, QuestionBank

logger = logging.getLogger(__name__)

EMBEDDINGS_FILE = Path(__file__).parent / "_question_embeddings.npy"
INDEX_FILE = Path(__file__).parent / "_question_index.json"


class QuestionMatcher:
    """Match student questions to pre-built questions using MiniLM."""

    def __init__(self):
        self._embedder = None
        self._bank: Optional[QuestionBank] = None
        self._embeddings: Optional[np.ndarray] = None
        self._index: list[dict] = []  # [{question_id, question_text, node_id, ...}]

    def _load_embedder(self):
        if self._embedder is None:
            import os
            os.environ['TRANSFORMERS_OFFLINE'] = '1'
            os.environ['HF_HUB_OFFLINE'] = '1'
            from sentence_transformers import SentenceTransformer
            logger.info("Loading MiniLM (all-MiniLM-L6-v2)...")
            self._embedder = SentenceTransformer('all-MiniLM-L6-v2')
        return self._embedder

    def _load_bank(self) -> QuestionBank:
        if self._bank is None:
            logger.info("Loading question bank...")
            self._bank = build_question_bank()
        return self._bank

    def build_index(self, force_rebuild: bool = False) -> None:
        """Build the embedding index for all questions."""
        if not force_rebuild and EMBEDDINGS_FILE.exists() and INDEX_FILE.exists():
            logger.info("Loading pre-built embedding index...")
            self._embeddings = np.load(EMBEDDINGS_FILE)
            self._index = json.loads(INDEX_FILE.read_text(encoding="utf-8"))
            logger.info(f"Loaded {len(self._index)} question embeddings")
            return

        bank = self._load_bank()
        embedder = self._load_embedder()

        # Filter to questions with actual text
        valid_questions = [q for q in bank.questions if q.question_text and len(q.question_text) > 10]
        logger.info(f"Embedding {len(valid_questions)} questions...")

        # Embed in batches
        texts = [q.question_text[:500] for q in valid_questions]
        embeddings = embedder.encode(texts, batch_size=64, normalize_embeddings=True, show_progress_bar=True)

        self._embeddings = np.array(embeddings)
        self._index = [
            {
                "question_id": q.question_id,
                "question_text": q.question_text[:300],
                "node_id": q.node_id,
                "class_level": q.class_level,
                "source_type": q.source_type,
                "category": q.category,
                "cognitive_level": q.cognitive_level,
                "marks": q.marks,
                "has_answer": bool(q.answer_text),
                "has_steps": bool(q.steps),
            }
            for q in valid_questions
        ]

        # Save
        np.save(EMBEDDINGS_FILE, self._embeddings)
        INDEX_FILE.write_text(json.dumps(self._index, ensure_ascii=False), encoding="utf-8")
        logger.info(f"Saved {len(self._index)} embeddings to disk")

    def match(self, question: str, class_level: Optional[int] = None, top_k: int = 5) -> list[dict]:
        """Match a student question to the closest pre-built questions.

        Returns top-k matches with similarity scores.
        """
        if self._embeddings is None:
            self.build_index()

        embedder = self._load_embedder()
        q_emb = embedder.encode([question[:500]], normalize_embeddings=True)

        # Compute cosine similarity (embeddings are normalized)
        sims = (self._embeddings @ q_emb.T).flatten()

        # Filter by class if specified
        if class_level is not None:
            mask = np.array([idx["class_level"] == class_level for idx in self._index])
            if mask.any():
                sims_masked = np.where(mask, sims, -1.0)
            else:
                sims_masked = sims
        else:
            sims_masked = sims

        # Get top-k
        top_idx = np.argsort(sims_masked)[::-1][:top_k]

        results = []
        for i in top_idx:
            if sims_masked[i] < 0:
                continue
            entry = self._index[i].copy()
            entry["score"] = float(sims_masked[i])
            results.append(entry)

        return results

    def match_best(self, question: str, class_level: Optional[int] = None, threshold: float = 0.3) -> Optional[dict]:
        """Match and return only the best match, or None if below threshold."""
        results = self.match(question, class_level, top_k=1)
        if results and results[0]["score"] >= threshold:
            return results[0]
        return None

    def get_question(self, question_id: str) -> Optional[ParsedQuestion]:
        """Get the full question object by ID."""
        bank = self._load_bank()
        for q in bank.questions:
            if q.question_id == question_id:
                return q
        return None


# Singleton
_matcher: Optional[QuestionMatcher] = None


def get_matcher() -> QuestionMatcher:
    """Get the singleton matcher instance."""
    global _matcher
    if _matcher is None:
        _matcher = QuestionMatcher()
        _matcher.build_index()
    return _matcher


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    matcher = QuestionMatcher()
    matcher.build_index(force_rebuild=True)

    # Test with real questions
    test_questions = [
        ("Find the HCF and LCM of 135 and 225", 5),
        ("Find the equation of the tangent to the curve y = x^3 - 3x + 2 at x = 2", 12),
        ("Solve the quadratic equation 2x^2 - 7x + 3 = 0", 10),
        ("A particle moves along s = t^3 - 6t^2 + 9t + 5. Find when velocity is zero", 12),
        ("Find the area bounded by y = x^2 and y = x", 12),
        ("Solve dy/dx + 2y = 3x", 12),
        ("Show that R = {(a,b): |a-b| divisible by 2} is an equivalence relation on A = {1,2,3,4}", 12),
        ("Find the derivative of sin(x^2)", 11),
        ("Evaluate the integral of x^2 from 0 to 2", 12),
        ("Find the percentage of 25 out of 200", 7),
    ]

    print("\n" + "=" * 80)
    print("MATCHING RESULTS")
    print("=" * 80)
    for q, cls in test_questions:
        results = matcher.match(q, class_level=cls, top_k=3)
        print(f"\nQ: {q} (Class {cls})")
        for i, r in enumerate(results):
            print(f"  {i+1}. [{r['score']:.3f}] {r['question_text'][:80]}")
            print(f"     node={r['node_id']}, class={r['class_level']}, type={r['source_type']}, has_answer={r['has_answer']}, has_steps={r['has_steps']}")
