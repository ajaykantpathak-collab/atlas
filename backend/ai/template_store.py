"""Template store for multi-step problem decompositions.

When the LLM orchestrator decomposes a multi-step problem, the decomposition
is saved here. Future questions of the same pattern (with different numbers)
are matched via embedding similarity and solved without calling the LLM.

Flow:
  1. Student asks multi-step question
  2. Normalize question (replace numbers with placeholders)
  3. Embed normalized question
  4. Search template store for similar patterns (cosine similarity > 0.85)
  5. If found → extract numbers, substitute into saved steps, solve
  6. If not found → call LLM orchestrator, save new template
"""

import re
import asyncio
import numpy as np
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.solver_template import SolverTemplate


# --------------------------------------------------------------------------- #
# Question normalization
# --------------------------------------------------------------------------- #

# Replace numbers with placeholders for pattern matching
_NUM_PATTERN = re.compile(r'\b\d+\.?\d*\b')

def normalize_question(question: str) -> str:
    """Normalize a question by replacing numbers with NUM placeholder.
    
    "A sheet of area 96 cm², L=2W" → "A sheet of area NUM cm², L=NUMW"
    
    This allows matching questions that are the same pattern with
    different specific values.
    """
    normalized = _NUM_PATTERN.sub('NUM', question)
    # Collapse multiple NUMs
    normalized = re.sub(r'(NUM\s*)+', 'NUM ', normalized)
    return normalized.strip().lower()


def extract_numbers(question: str) -> list[float]:
    """Extract all numbers from a question in order of appearance."""
    return [float(m.group()) for m in re.finditer(r'\d+\.?\d*', question)]


# --------------------------------------------------------------------------- #
# Embedding (reuses the same model as routing service)
# --------------------------------------------------------------------------- #

_model = None
_model_lock = asyncio.Lock()

async def get_model():
    global _model
    if _model is None:
        async with _model_lock:
            if _model is None:
                from sentence_transformers import SentenceTransformer
                _model = SentenceTransformer('all-MiniLM-L6-v2')
    return _model

async def embed_text(text: str) -> np.ndarray:
    """Embed text using the same model as routing service."""
    model = await get_model()
    loop = asyncio.get_event_loop()
    embedding = await loop.run_in_executor(
        None,
        lambda: model.encode([text], convert_to_numpy=True, show_progress_bar=False)[0]
    )
    # Normalize
    norm = np.linalg.norm(embedding)
    if norm > 0:
        embedding = embedding / norm
    return embedding


# --------------------------------------------------------------------------- #
# Template store
# --------------------------------------------------------------------------- #

class TemplateStore:
    """Save, search, and reuse multi-step problem templates."""

    SIMILARITY_THRESHOLD = 0.85  # cosine similarity to consider a match

    @staticmethod
    async def find_match(
        db: AsyncSession, question: str
    ) -> Optional[tuple[SolverTemplate, list[float]]]:
        """Find a matching template for a question.
        
        Returns (template, numbers_from_question) if found, None otherwise.
        """
        normalized = normalize_question(question)
        query_embedding = await embed_text(normalized)
        numbers = extract_numbers(question)

        # Load all templates (there won't be many — hundreds at most)
        result = await db.execute(select(SolverTemplate))
        templates = result.scalars().all()

        if not templates:
            return None

        best_template = None
        best_sim = 0.0

        for tmpl in templates:
            if tmpl.embedding is None:
                continue
            # Compute cosine similarity
            tmpl_emb = np.array(tmpl.embedding, dtype=np.float32)
            tmpl_norm = np.linalg.norm(tmpl_emb)
            if tmpl_norm > 0:
                tmpl_emb = tmpl_emb / tmpl_norm
            sim = float(np.dot(tmpl_emb, query_embedding))
            if sim > best_sim:
                best_sim = sim
                best_template = tmpl

        if best_template and best_sim >= TemplateStore.SIMILARITY_THRESHOLD:
            return (best_template, numbers)

        return None

    @staticmethod
    async def save_template(
        db: AsyncSession,
        template_name: str,
        original_question: str,
        steps: list[dict],
        variables: list[str] = None,
        subject: Optional[str] = None,
        class_level: Optional[int] = None,
    ) -> SolverTemplate:
        """Save a new template after LLM decomposition."""
        normalized = normalize_question(original_question)
        embedding = await embed_text(normalized)

        tmpl = SolverTemplate(
            template_name=template_name,
            normalized_pattern=normalized,
            original_question=original_question,
            steps=steps,
            variables=variables or [],
            embedding=embedding.tolist(),
            subject=subject,
            class_level=class_level,
            times_used=0,
            created_at=datetime.now(timezone.utc),
        )
        db.add(tmpl)
        await db.commit()
        await db.refresh(tmpl)
        return tmpl

    @staticmethod
    async def increment_usage(db: AsyncSession, template_id) -> None:
        """Increment the usage count for a template."""
        await db.execute(
            text("UPDATE solver_templates SET times_used = times_used + 1, "
                 "last_used_at = :now WHERE id = :tid"),
            {"now": datetime.now(timezone.utc), "tid": template_id}
        )
        await db.commit()

    @staticmethod
    async def create_table(db: AsyncSession) -> None:
        """Create the solver_templates table if it doesn't exist."""
        is_pg = db.get_bind().dialect.name == "postgresql"
        if is_pg:
            await db.execute(text("""
                CREATE TABLE IF NOT EXISTS solver_templates (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    template_name VARCHAR(200) NOT NULL,
                    normalized_pattern TEXT NOT NULL,
                    original_question TEXT NOT NULL,
                    steps JSONB NOT NULL,
                    variables JSONB DEFAULT '[]'::jsonb,
                    embedding JSONB,
                    subject VARCHAR(50),
                    class_level INTEGER,
                    times_used INTEGER DEFAULT 0,
                    created_at TIMESTAMPTZ DEFAULT NOW(),
                    last_used_at TIMESTAMPTZ
                )
            """))
        else:
            # SQLite (local/offline mode): no gen_random_uuid/JSONB/TIMESTAMPTZ
            await db.execute(text("""
                CREATE TABLE IF NOT EXISTS solver_templates (
                    id VARCHAR(36) PRIMARY KEY,
                    template_name VARCHAR(200) NOT NULL,
                    normalized_pattern TEXT NOT NULL,
                    original_question TEXT NOT NULL,
                    steps JSON NOT NULL,
                    variables JSON DEFAULT '[]',
                    embedding JSON,
                    subject VARCHAR(50),
                    class_level INTEGER,
                    times_used INTEGER DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    last_used_at TIMESTAMP
                )
            """))
        await db.commit()
        if not is_pg:
            return
        # Also fix the column type if it was created without TZ by the ORM
        try:
            await db.execute(text(
                "ALTER TABLE solver_templates ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at AT TIME ZONE 'UTC'"
            ))
            await db.execute(text(
                "ALTER TABLE solver_templates ALTER COLUMN last_used_at TYPE TIMESTAMPTZ USING last_used_at AT TIME ZONE 'UTC'"
            ))
            await db.commit()
        except Exception:
            pass  # Already correct type
