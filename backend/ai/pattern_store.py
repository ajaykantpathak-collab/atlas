# -*- coding: utf-8 -*-
from __future__ import annotations

"""Solution pattern store — stores question PATTERNS, not full solutions.

When DeepSeek solves a question, we:
1. Normalize the question (replace numbers/expressions with placeholders)
2. Store: normalized pattern -> category, form_fields, solution approach
3. Embed the normalized pattern

When a new question comes in:
1. Normalize it the same way
2. Match against stored patterns (high threshold since patterns are normalized)
3. If match -> show form, student fills values -> SymPy computes
4. If no match -> DeepSeek identifies category -> store new pattern

This means: same question type with different numbers = instant, no API call.
Only genuinely NEW question types need DeepSeek.
"""
import os
os.environ['TRANSFORMERS_OFFLINE'] = '1'
os.environ['HF_HUB_OFFLINE'] = '1'

import json
import logging
import re
import numpy as np
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Optional

logger = logging.getLogger(__name__)

STORE_FILE = Path(__file__).parent / "_solution_patterns.json"
EMBEDDINGS_FILE = Path(__file__).parent / "_pattern_embeddings.npy"


def normalize_question(question: str) -> str:
    """Normalize a question by replacing variable values with placeholders.

    "Find the area bounded by y = x^3, x = -2 and x = 1"
    -> "Find the area bounded by y = <expr>, x = <num> and x = <num>"

    "Solve x dy - y dx = 2*sqrt(x^2 + y^2) dx"
    -> "Solve x dy - y dx = <expr> dx"

    "Evaluate the integral of (x^2+2x+3)/((x+2)^2*(x+3)) dx"
    -> "Evaluate the integral of <expr> dx"
    """
    q = question.lower().strip()

    # Replace specific numbers (but keep structural words)
    # Order matters: replace longer patterns first

    # Replace decimal numbers
    q = re.sub(r'\b\d+\.\d+\b', '<num>', q)
    # Replace integers — allow trailing letters (e.g. "15th", "3rd", "2nd")
    # so "15th" -> "<num>th", not "<num>5th"
    q = re.sub(r'(?<![a-z])\d+', '<num>', q)

    # Replace mathematical expressions after "y =", "f(x) =", etc.
    # "y = <stuff>" -> "y = <expr>"
    q = re.sub(r'y\s*=\s*[^,;\.]+?(?=\s*(?:,|;|\.|and|the|from|where|given|$))', 'y = <expr>', q)
    q = re.sub(r'f\(x\)\s*=\s*[^,;\.]+?(?=\s*(?:,|;|\.|and|is|from|where|given|$))', 'f(x) = <expr>', q)

    # Replace expressions in integrals
    # "integral of <stuff> dx" -> "integral of <expr> dx"
    q = re.sub(r'(?:integral of|integrate|integral)\s+.+?(?:\s+dx|\s+d[xyzt])', 'integral of <expr> dx', q)

    # Replace ODE strings
    # "dy/dx = <stuff>" -> "dy/dx = <expr>"
    q = re.sub(r'dy/dx\s*=\s*[^,;\.]+?(?=\s*(?:,|;|\.|given|where|$))', 'dy/dx = <expr>', q)
    q = re.sub(r'dx/dy\s*=\s*[^,;\.]+?(?=\s*(?:,|;|\.|given|where|$))', 'dx/dy = <expr>', q)

    # Replace matrix contents
    q = re.sub(r'\[\[.*?\]\]', '<matrix>', q)

    # Replace "from <num> to <num>" -> "from <num> to <num>" (already num-replaced)
    # Already handled by number replacement

    # Replace "x = <num>" patterns (ordinates/bounds)
    q = re.sub(r'x\s*=\s*<num>', 'x = <num>', q)
    q = re.sub(r'y\s*=\s*<num>', 'y = <num>', q)

    # Replace "x^2 + y^2 = <num>" (circle)
    q = re.sub(r'x\^?2\s*\+\s*y\^?2\s*=\s*<num>', 'x^2 + y^2 = <num>', q)

    # Replace "x^2 = <num>y" (horizontal parabola)
    q = re.sub(r'x\^?2\s*=\s*<num>y', 'x^2 = <num>y', q)

    # Collapse multiple spaces
    q = re.sub(r'\s+', ' ', q).strip()

    return q


@dataclass
class StoredPattern:
    """A question pattern stored for future matching."""
    pattern: str                    # normalized question text
    original_question: str          # first question that created this pattern
    category: str                   # identified category
    form_fields: list[dict]         # form fields for student to fill
    class_level: int
    created_at: str
    embedding: list[float] = field(default_factory=list)


class PatternStore:
    """Stores and matches question patterns (not full solutions)."""

    def __init__(self):
        self._patterns: list[dict] = []
        self._embeddings: Optional[np.ndarray] = None
        self._embedder = None

    def _load_embedder(self):
        if self._embedder is None:
            import os
            os.environ['TRANSFORMERS_OFFLINE'] = '1'
            os.environ['HF_HUB_OFFLINE'] = '1'
            from sentence_transformers import SentenceTransformer
            self._embedder = SentenceTransformer('all-MiniLM-L6-v2')
        return self._embedder

    def load(self) -> None:
        """Load stored patterns from disk."""
        if self._patterns:
            return
        if STORE_FILE.exists():
            try:
                self._patterns = json.loads(STORE_FILE.read_text(encoding="utf-8"))
                logger.info(f"Loaded {len(self._patterns)} stored patterns")
            except Exception as e:
                logger.warning(f"Failed to load patterns: {e}")
                self._patterns = []

        if EMBEDDINGS_FILE.exists():
            self._embeddings = np.load(EMBEDDINGS_FILE)
        else:
            self._embeddings = None

    def save(self) -> None:
        """Save patterns to disk."""
        STORE_FILE.write_text(
            json.dumps(self._patterns, indent=2, ensure_ascii=False),
            encoding="utf-8"
        )
        if self._embeddings is not None:
            np.save(EMBEDDINGS_FILE, self._embeddings)

    def add(self, question: str, category: str, form_fields: list[dict],
            class_level: int) -> None:
        """Add a new pattern. Normalizes the question and stores it."""
        self.load()

        pattern = normalize_question(question)

        # Check if we already have this pattern
        for p in self._patterns:
            if p["pattern"] == pattern:
                return  # already stored

        # Embed the normalized pattern
        embedder = self._load_embedder()
        p_emb = embedder.encode([pattern], normalize_embeddings=True)[0]

        entry = {
            "pattern": pattern,
            "original_question": question[:500],
            "category": category,
            "form_fields": form_fields,
            "class_level": class_level,
            "created_at": datetime.now().isoformat(),
            "embedding": p_emb.tolist(),
        }
        self._patterns.append(entry)

        # Update embeddings array
        if self._embeddings is None:
            self._embeddings = np.array([p_emb])
        else:
            self._embeddings = np.vstack([self._embeddings, p_emb])

        self.save()
        logger.info(f"Stored pattern: '{pattern[:60]}...' (total: {len(self._patterns)})")

    def match(self, question: str, threshold: float = 0.85) -> Optional[dict]:
        """Match a question against stored patterns.

        Uses exact normalized string matching only.
        No embeddings, no model loading — instant.

        Returns the stored pattern if found, None otherwise.
        """
        self.load()
        if not self._patterns:
            return None

        pattern = normalize_question(question)

        # Exact pattern match only — instant, no model needed
        for p in self._patterns:
            if p["pattern"] == pattern:
                logger.info(f"Exact pattern match: '{pattern[:50]}...'")
                return p

        return None

    def count(self) -> int:
        """Number of stored patterns."""
        self.load()
        return len(self._patterns)


# Singleton
_store: Optional[PatternStore] = None


def get_pattern_store() -> PatternStore:
    """Get the singleton store."""
    global _store
    if _store is None:
        _store = PatternStore()
        _store.load()
    return _store


def preload_embedder():
    """Pre-load the MiniLM model so first match is fast."""
    store = get_pattern_store()
    store._load_embedder()

