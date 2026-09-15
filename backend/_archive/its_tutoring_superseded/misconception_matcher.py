"""Misconception matching engine for the DREAM_APP tutor.

Loads misconceptions from the class_level_content table (content_type='misconceptions')
and matches student wrong answers to known misconceptions by node_id and keyword overlap.

Also loads pp_comments (examiner observations) and remediation paths to provide
comprehensive wrong-answer feedback.

Data sources:
  - class_level_content (content_type='misconceptions'): per-topic misconception entries
    with "Misconception N: ...", "Target node: ...", "Why wrong: ..."
  - class_level_content (content_type='remediation'): step-by-step intervention paths
  - class_level_content (content_type='pp_comments'): examiner observations per topic
  - enrichment_content.common_misconception: inline misconceptions per node
"""

import re
import asyncio
from dataclasses import dataclass, field
from typing import Optional
from cachetools import TTLCache

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.enrichment import ClassLevelContent, EnrichmentContent


# --------------------------------------------------------------------------- #
# Data structures
# --------------------------------------------------------------------------- #

@dataclass
class MisconceptionEntry:
    """A single misconception parsed from the marker files."""
    misconception_text: str        # what the student thinks
    target_nodes: list[str]        # which nodes this applies to
    why_wrong: str                 # why it's wrong
    correction: str                # what's actually correct
    subject: str
    class_levels: list[int]
    source_title: str


@dataclass
class MisconceptionMatch:
    """Result of matching a student answer to misconceptions."""
    matched: bool
    misconception: Optional[MisconceptionEntry] = None
    similarity: float = 0.0
    feedback: str = ""


# --------------------------------------------------------------------------- #
# Cache — misconceptions loaded once, cached for 10 minutes
# --------------------------------------------------------------------------- #

_misconception_cache: TTLCache = TTLCache(maxsize=1, ttl=600)
_CACHE_KEY = "all_misconceptions"
_cache_lock = asyncio.Lock()


# --------------------------------------------------------------------------- #
# Parser — extracts individual misconceptions from .marker content
# --------------------------------------------------------------------------- #

# Pattern: "Misconception N: ..." followed by "Target node: ..." and "Why wrong: ..."
_MISCONCEPTION_RE = re.compile(
    r'Misconception\s+\d+\s*:\s*(.*?)(?=\n\s*Target node:|\n\s*Why wrong:|\n\s*Misconception\s+\d+|\Z)',
    re.DOTALL,
)
_TARGET_NODE_RE = re.compile(r'Target node:\s*(.*?)(?=\n\s*Why wrong:|\n\s*Misconception\s+\d+|\Z)', re.DOTALL)
_WHY_WRONG_RE = re.compile(r'Why wrong:\s*(.*?)(?=\n\s*Misconception\s+\d+|\n\s*Target node:|\Z)', re.DOTALL)
_CORRECTION_RE = re.compile(r'Correction:\s*(.*?)(?=\n\s*Misconception\s+\d+|\n\s*Target node:|\n\s*Why wrong:|\Z)', re.DOTALL)


def _parse_misconceptions(content: str, subject: str, class_levels: list[int], title: str) -> list[MisconceptionEntry]:
    """Parse a misconceptions .marker file content into individual entries."""
    entries = []
    # Find all misconception blocks
    matches = list(_MISCONCEPTION_RE.finditer(content))
    for i, match in enumerate(matches):
        misc_text = match.group(1).strip().strip('"').strip("'")
        if not misc_text or len(misc_text) < 10:
            continue

        # Look for Target node and Why wrong after this misconception
        remaining = content[match.end():]
        target_match = _TARGET_NODE_RE.match(remaining)
        why_match = _WHY_WRONG_RE.match(remaining) if not target_match else _WHY_WRONG_RE.search(remaining)

        target_nodes = []
        if target_match:
            target_text = target_match.group(1).strip()
            # Split by comma and clean
            for part in target_text.split(","):
                part = part.strip()
                if part and re.match(r'^c\d+_\w+_\d+$', part):
                    target_nodes.append(part)

        why_wrong = ""
        if why_match:
            why_wrong = why_match.group(1).strip()
        elif target_match:
            # Why wrong might be right after target node
            after_target = remaining[target_match.end():]
            why_match2 = _WHY_WRONG_RE.match(after_target)
            if why_match2:
                why_wrong = why_match2.group(1).strip()

        # The correction is often the "why wrong" text itself (it explains what's correct)
        correction = why_wrong

        entries.append(MisconceptionEntry(
            misconception_text=misc_text,
            target_nodes=target_nodes,
            why_wrong=why_wrong,
            correction=correction,
            subject=subject,
            class_levels=class_levels,
            source_title=title,
        ))

    return entries


# --------------------------------------------------------------------------- #
# Loader — loads all misconceptions from the database
# --------------------------------------------------------------------------- #

async def _load_all_misconceptions(db: AsyncSession) -> list[MisconceptionEntry]:
    """Load and parse all misconceptions from the database. Cached."""
    if _CACHE_KEY in _misconception_cache:
        return _misconception_cache[_CACHE_KEY]

    async with _cache_lock:
        if _CACHE_KEY in _misconception_cache:
            return _misconception_cache[_CACHE_KEY]

        result = await db.execute(
            select(ClassLevelContent)
            .where(ClassLevelContent.content_type == "misconceptions")
        )
        all_entries = []
        for clc in result.scalars():
            entries = _parse_misconceptions(
                clc.content or "",
                clc.target_subject,
                clc.target_class or [],
                clc.title,
            )
            all_entries.extend(entries)

        _misconception_cache[_CACHE_KEY] = all_entries
        return all_entries


# --------------------------------------------------------------------------- #
# Matching — finds the best misconception match for a wrong answer
# --------------------------------------------------------------------------- #

def _keyword_similarity(text_a: str, text_b: str) -> float:
    """Simple keyword overlap similarity."""
    words_a = set(text_a.lower().split())
    words_b = set(text_b.lower().split())
    if not words_a or not words_b:
        return 0.0
    overlap = len(words_a & words_b)
    return overlap / min(len(words_a), len(words_b))


async def match_misconception(
    db: AsyncSession,
    student_answer: str,
    node_id: str = "",
    subject: str = "",
    class_level: int = 0,
) -> MisconceptionMatch:
    """Match a student's wrong answer to known misconceptions.

    Args:
        db: Database session
        student_answer: The student's wrong answer
        node_id: The curriculum node being tested (optional)
        subject: The subject (optional)
        class_level: The class level (optional)

    Returns:
        MisconceptionMatch with the best matching misconception, or unmatched.
    """
    all_misc = await _load_all_misconceptions(db)

    if not all_misc:
        return MisconceptionMatch(matched=False, feedback="")

    # Filter by node_id first (strongest signal)
    node_matches = [m for m in all_misc if node_id and node_id in m.target_nodes]

    # Filter by subject if no node matches
    if not node_matches and subject:
        subject_matches = [m for m in all_misc if m.subject == subject]
        # Further filter by class if possible
        if class_level:
            class_matches = [m for m in subject_matches if class_level in m.class_levels]
            if class_matches:
                node_matches = class_matches
            else:
                node_matches = subject_matches

    if not node_matches:
        # Use all misconceptions for this subject only (never cross-subject)
        if subject:
            node_matches = [m for m in all_misc if m.subject == subject]
        else:
            # No subject provided — cannot safely match
            return MisconceptionMatch(matched=False, feedback="")

    if not node_matches:
        return MisconceptionMatch(matched=False, feedback="")

    # Score each misconception by keyword similarity to the student answer
    best_match = None
    best_score = 0.0
    for misc in node_matches:
        score = _keyword_similarity(student_answer, misc.misconception_text)
        if score > best_score:
            best_score = score
            best_match = misc

    # Also check the enrichment inline misconception
    if node_id and best_score < 0.3:
        # Try enrichment common_misconception
        enr_result = await db.execute(
            select(EnrichmentContent.common_misconception)
            .where(EnrichmentContent.node_id == node_id)
        )
        row = enr_result.first()
        if row and row[0]:
            inline = row[0]
            # Check if the student answer keywords appear in the inline misconception
            inline_score = _keyword_similarity(student_answer, inline)
            if inline_score > best_score:
                best_score = inline_score
                best_match = MisconceptionEntry(
                    misconception_text=inline[:500],
                    target_nodes=[node_id],
                    why_wrong="",
                    correction=inline[:500],
                    subject=subject,
                    class_levels=[class_level] if class_level else [],
                    source_title="enrichment_inline",
                )

    if best_match and best_score > 0.15:
        feedback = (
            f"**You seem to think:** {best_match.misconception_text[:300]}\n\n"
            f"**Why this is wrong:** {best_match.why_wrong[:300]}\n\n"
        )
        if best_match.target_nodes:
            feedback += f"**Review node:** {', '.join(best_match.target_nodes[:3])}\n"
        return MisconceptionMatch(
            matched=True,
            misconception=best_match,
            similarity=best_score,
            feedback=feedback,
        )

    return MisconceptionMatch(matched=False, feedback="")


# --------------------------------------------------------------------------- #
# Examiner comments — loads pp_comments for a subject/class
# --------------------------------------------------------------------------- #

_pp_cache: TTLCache = TTLCache(maxsize=10, ttl=600)


async def get_examiner_comments(
    db: AsyncSession,
    subject: str = "",
    class_level: int = 0,
) -> list[str]:
    """Get examiner comments (pp_comments) for a subject/class.

    Returns a list of comment strings that can be shown to students
    when they're studying a topic or after an exam.
    """
    cache_key = f"pp_{subject}_{class_level}"
    if cache_key in _pp_cache:
        return _pp_cache[cache_key]

    result = await db.execute(
        select(ClassLevelContent)
        .where(ClassLevelContent.content_type == "pp_comments")
        .where(ClassLevelContent.target_subject == subject)
    )
    comments = []
    for clc in result.scalars():
        if clc.content:
            # Extract "Examiner Observation:" lines
            for m in re.finditer(r'Examiner Observation:\s*(.*?)(?=\n\s*Examiner Observation:|\n===|\Z)', clc.content, re.DOTALL):
                obs = m.group(1).strip()
                if obs and len(obs) > 20:
                    comments.append(obs)

    _pp_cache[cache_key] = comments
    return comments


# --------------------------------------------------------------------------- #
# Remediation paths — loads remediation content for a subject
# --------------------------------------------------------------------------- #

async def get_remediation_path(
    db: AsyncSession,
    subject: str = "",
    node_id: str = "",
) -> Optional[str]:
    """Get a remediation path for a subject/node.

    Returns the remediation content text if available.
    """
    result = await db.execute(
        select(ClassLevelContent)
        .where(ClassLevelContent.content_type == "remediation")
        .where(ClassLevelContent.target_subject == subject)
        .limit(1)
    )
    clc = result.scalar_one_or_none()
    if clc and clc.content:
        # If node_id is specified, try to find the relevant section
        if node_id:
            # Look for the node_id in the content
            idx = clc.content.find(node_id)
            if idx >= 0:
                # Return a window around the match
                start = max(0, idx - 200)
                end = min(len(clc.content), idx + 800)
                return clc.content[start:end]
        return clc.content[:1000]
    return None
