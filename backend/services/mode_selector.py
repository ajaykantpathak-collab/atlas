"""
mode_selector.py
Subject-specific presentation modes for the INTRODUCE state.

This is Addition 4 to the ITS stack. Instead of always serving TEXT_WALKTHROUGH
the same way, the mode selector picks a presentation mode based on the subject:

  - STORY mode (Languages: Hindi, English) — narrative from ELI5 + walkthrough
  - LAB mode (Science) — sim + observation prompts from walkthrough
  - PROOF mode (Math) — step-by-step from working fields
  - CONTEXT mode (Social Science) — timeline/map + walkthrough

Only the INTRODUCE presentation changes per mode. Diagnostic questions,
remediation, and mastery tracking stay the same across all modes.

All content comes from existing .bloom.marker fields — no LLM, no new content.
"""

from __future__ import annotations

import logging
from enum import Enum
from typing import Any

logger = logging.getLogger(__name__)


class PresentationMode(str, Enum):
    """Presentation modes for the INTRODUCE state."""
    DEFAULT = "default"       # Standard walkthrough
    STORY = "story"           # Narrative (languages)
    LAB = "lab"               # Simulation + observation (science)
    PROOF = "proof"           # Step-by-step derivation (math)
    CONTEXT = "context"       # Timeline/map context (social science)


# Subject → mode mapping
SUBJECT_MODE_MAP: dict[str, PresentationMode] = {
    # Languages → STORY
    "hindi": PresentationMode.STORY,
    "english": PresentationMode.STORY,
    "english literature": PresentationMode.STORY,
    "sanskrit": PresentationMode.STORY,
    "urdu": PresentationMode.STORY,

    # Science → LAB
    "science": PresentationMode.LAB,
    "physics": PresentationMode.LAB,
    "chemistry": PresentationMode.LAB,
    "biology": PresentationMode.LAB,
    "biotechnology": PresentationMode.LAB,

    # Math → PROOF
    "mathematics": PresentationMode.PROOF,
    "math": PresentationMode.PROOF,
    "maths": PresentationMode.PROOF,

    # Social Science → CONTEXT
    "social_science": PresentationMode.CONTEXT,
    "history": PresentationMode.CONTEXT,
    "history_civics": PresentationMode.CONTEXT,
    "geography": PresentationMode.CONTEXT,
    "civics": PresentationMode.CONTEXT,
    "economics": PresentationMode.CONTEXT,
    "political_science": PresentationMode.CONTEXT,
}


def select_mode(subject: str) -> PresentationMode:
    """Select the presentation mode based on subject.

    Args:
        subject: Subject name (case-insensitive).

    Returns:
        The appropriate PresentationMode for this subject.
    """
    subject_lower = subject.lower().strip()
    return SUBJECT_MODE_MAP.get(subject_lower, PresentationMode.DEFAULT)


def render_introduce(
    bloom_marker: dict,
    mode: PresentationMode | None = None,
    subject: str = "",
) -> str:
    """Render the INTRODUCE content in the appropriate mode.

    Args:
        bloom_marker: Parsed .bloom.marker content.
        mode: Presentation mode (auto-selected if None).
        subject: Subject name (used if mode is None).

    Returns:
        The INTRODUCE content formatted for the selected mode.
    """
    if mode is None:
        mode = select_mode(subject)

    title = bloom_marker.get("title", bloom_marker.get("node_id", "this topic"))
    definition = bloom_marker.get("definition", "")
    walkthrough = bloom_marker.get("text_walkthrough", "")
    eli5 = bloom_marker.get("eli5", "")
    questions = bloom_marker.get("diagnostic_questions", [])

    if mode == PresentationMode.STORY:
        return _render_story(title, definition, walkthrough, eli5)
    elif mode == PresentationMode.LAB:
        return _render_lab(title, definition, walkthrough, questions)
    elif mode == PresentationMode.PROOF:
        return _render_proof(title, definition, walkthrough, questions)
    elif mode == PresentationMode.CONTEXT:
        return _render_context(title, definition, walkthrough, eli5)
    else:
        return _render_default(title, definition, walkthrough)


def _render_default(title: str, definition: str, walkthrough: str) -> str:
    """Default mode — standard walkthrough."""
    content = f"**{title}**\n\n"
    if definition:
        content += f"{definition}\n\n"
    if walkthrough:
        content += f"{walkthrough}\n\n"
    content += "---\n\n"
    content += "Type **ready** to start the diagnostic questions, "
    content += "or **simplify** for a simpler explanation."
    return content


def _render_story(title: str, definition: str, walkthrough: str, eli5: str) -> str:
    """Story mode — narrative presentation for languages.

    Uses ELI5 as the narrative hook, then walkthrough as the story continuation.
    """
    content = f"📖 **{title}** — A Story\n\n"

    if eli5:
        content += f"*Imagine this...*\n\n{eli5}\n\n"

    content += "*Now let's explore this more deeply...*\n\n"

    if walkthrough:
        content += f"{walkthrough}\n\n"

    if definition:
        content += f"**Key idea:** {definition[:300]}\n\n"

    content += "---\n\n"
    content += "Type **ready** to check your understanding, "
    content += "or **simplify** for an even simpler version."
    return content


def _render_lab(title: str, definition: str, walkthrough: str, questions: list) -> str:
    """Lab mode — simulation + observation for science.

    Frames the walkthrough as a lab observation, with prompts to observe
    specific phenomena before answering questions.
    """
    content = f"🔬 **{title}** — Lab Observation\n\n"

    if definition:
        content += f"**What we're studying:**\n{definition[:400]}\n\n"

    content += "**Observation Setup:**\n"
    content += "Let's observe this concept in action. As you read through, "
    content += "pay attention to what happens at each step.\n\n"

    if walkthrough:
        # Break walkthrough into "observation steps"
        paragraphs = walkthrough.split("\n\n")
        for i, para in enumerate(paragraphs[:5], 1):
            if para.strip():
                content += f"**Step {i}:** {para.strip()}\n\n"

    # Add observation prompts from the first question
    if questions:
        q1 = questions[0]
        content += f"**Before we test your understanding, observe:**\n"
        content += f"Think about: {q1.get('question', '')[:200]}\n\n"

    content += "---\n\n"
    content += "Type **ready** to start the diagnostic questions, "
    content += "or **simplify** for a simpler explanation."
    return content


def _render_proof(title: str, definition: str, walkthrough: str, questions: list) -> str:
    """Proof mode — step-by-step derivation for math.

    Uses the WORKING fields from diagnostic questions as step-by-step proofs.
    """
    content = f"📐 **{title}** — Step by Step\n\n"

    if definition:
        content += f"**What we're proving:**\n{definition[:400]}\n\n"

    if walkthrough:
        content += f"**Approach:**\n{walkthrough[:500]}\n\n"

    # Show worked examples from questions
    worked_examples = []
    for q in questions[:2]:
        working = q.get("working", "")
        if working:
            worked_examples.append({
                "question": q.get("question", "")[:150],
                "working": working,
            })

    if worked_examples:
        content += "**Worked Example:**\n"
        for i, ex in enumerate(worked_examples, 1):
            content += f"\n*Example {i}:* {ex['question']}\n"
            # Break working into steps
            steps = ex["working"].split(".")
            for j, step in enumerate(steps[:5], 1):
                step = step.strip()
                if step:
                    content += f"  {j}. {step}\n"

    content += "\n---\n\n"
    content += "Type **ready** to try the diagnostic questions yourself, "
    content += "or **simplify** for a simpler explanation."
    return content


def _render_context(title: str, definition: str, walkthrough: str, eli5: str) -> str:
    """Context mode — timeline/map context for social science.

    Frames the content in historical/geographical context.
    """
    content = f"🗺️ **{title}** — In Context\n\n"

    if definition:
        content += f"**The big picture:**\n{definition[:400]}\n\n"

    if eli5:
        content += f"**In simple terms:**\n{eli5[:300]}\n\n"

    if walkthrough:
        # Frame walkthrough as a journey through context
        content += "**Let's explore this in context:**\n\n"
        paragraphs = walkthrough.split("\n\n")
        for i, para in enumerate(paragraphs[:4], 1):
            if para.strip():
                content += f"• {para.strip()}\n\n"

    content += "---\n\n"
    content += "Type **ready** to check your understanding, "
    content += "or **simplify** for a simpler explanation."
    return content
