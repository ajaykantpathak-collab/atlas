"""Enrichment-driven tutor service for the DREAM_APP educational platform.

The tutor uses a layered approach:
1. Serve pre-written enrichment content directly (90% of interactions)
2. Route student questions to the correct node + field (keyword/TF-IDF)
3. Solve numerical problems with template engine (no LLM)
4. LLM fallback for novel questions (constrained to enrichment content)

The enrichment content IS the tutor -- it is pre-written, verified, and
pedagogically structured. The LLM is only used for routing ambiguity and
as a last-resort fallback, never for generating the core teaching content.
"""

import json
import logging
import random
import re
from datetime import datetime, timezone
from typing import Any, Optional

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.content import KnowledgeNodeModel
from backend.models.enrichment import EnrichmentContent
from backend.models.progress import StudySession
from backend.services.progress_service import ProgressService
from backend.services.routing_service import RoutingService, RouteResult
from backend.services.graph_service import GraphService
from backend.ai.template_engine import TemplateEngine
from backend.ai.compute_engine import ComputeEngine
from backend.ai.orchestrator import Orchestrator
from backend.ai.llm_client import get_llm_client
from backend.ai.answer_evaluator import evaluate_answer, evaluate_diagnostic_set, EvalResult
from backend.ai.hybrid_evaluator import evaluate_answer as evaluate_answer_hybrid
from backend.services import evaluator_solver_bridge
from backend.ai.misconception_matcher import match_misconception, get_examiner_comments
from backend.services.drill_service import DrillService
from backend.services import notes_service
from backend.services.cross_subject_reasons import get_cross_subject_reason
from backend.ai.socratic_engine import (
    chunk_walkthrough,
    evaluate_checkpoint,
    evaluate_checkpoint_hybrid,
    build_hint,
    build_misconception_probe,
    build_guided_remediation,
    start_socratic_teaching,
    next_socratic_chunk,
    TeachingChunk,
)

# In-memory session metadata store
_SESSION_METADATA: dict[str, dict[str, Any]] = {}

# Tutor session meta is also mirrored to Redis (key tutor:meta:{sid}) so a
# request landing on ANY worker/replica can hydrate state — the local dict
# alone is per-process and breaks under gunicorn's 4 workers.
_META_TTL_S = 60 * 60 * 24  # 24h
_META_KEY = "tutor:meta:"


async def _meta_get(session_id: str) -> Optional[dict]:
    """Local dict → Redis hydrate → None. Keeps in-memory speed when the
    same worker serves consecutive messages."""
    meta = _SESSION_METADATA.get(session_id)
    if meta is not None:
        return meta
    try:
        from backend.services.redis_service import get_redis
        r = await get_redis()
        if r:
            raw = await r.get(_META_KEY + session_id)
            if raw:
                meta = json.loads(raw)
                _SESSION_METADATA[session_id] = meta
                return meta
    except Exception:
        pass
    return None


async def _meta_put(session_id: str, meta: dict) -> None:
    """Write-through: local dict + Redis (best-effort)."""
    _SESSION_METADATA[session_id] = meta
    try:
        from backend.services.redis_service import get_redis
        r = await get_redis()
        if r:
            await r.set(_META_KEY + session_id, json.dumps(meta, default=str), ex=_META_TTL_S)
    except Exception:
        pass


# Multi-step detection keywords — questions with these likely need decomposition
_MULTISTEP_KEYWORDS = [
    "maximize", "minimise", "minimize", "maximum", "minimum",
    "open-top box", "open top box", "fold up", "folding up",
    "find the value of x that", "optimal",
    "show that", "prove that", "derive",
    "hence find", "hence or otherwise",
    "given that", "if the", "such that",
    "how many moles", "stages", "steps",
    "rubber band", "crawls", "reach the end", "far end",
    "stretching", "stretches", "doubling", "doubles",
]

_MULTISTEP_INDICATORS = [
    "(a)", "(b)", "(c)",  # multi-part questions
    "part i", "part ii", "part iii",
]

# Questions that should NOT trigger the orchestrator (too simple or non-STEM)
_SKIP_KEYWORDS = [
    "who is", "what is the capital", "how to cook",
    "tell me a joke", "who won",
]


# Internal ID patterns that must never appear in student-visible content
_INTERNAL_ID_RE = re.compile(
    r'\b[cC]\d+_(?:phy|chem|bio|math)_\w+\b'  # node IDs like c12_phy_002
    r'|\bDEPTH_PREREQ\b|\bCROSS_PREREQ\b|\bFORWARD_NODE\b|\bPREREQ\b'
    r'|\bPP_\w+\b'  # misconception PP IDs
    r'|\.marker\b'  # marker file references
    r'|^---\s*NODE\s+.*---\s*$',  # --- NODE ... --- markers
    re.MULTILINE | re.IGNORECASE,
)
_NODE_ID_IN_PARENS_RE = re.compile(
    r'\s*\(node\s+\S+\s*\)',  # "(node c8_phy_013)"
    re.IGNORECASE,
)
_NODE_ID_LINE_RE = re.compile(
    r'^\s*(?:NODE_ID:|Target node:|source_file:|Target class:)\s*.*$',
    re.MULTILINE | re.IGNORECASE,
)


def _clean_student_content(text: str) -> str:
    """Remove all internal IDs, metadata, and node references from student-visible text,
    while carefully preserving rich markdown links and navigation actions."""
    if not text:
        return text

    # Protect markdown links [label](url) from internal ID stripping
    saved_links: list[str] = []
    def save_link(m: re.Match) -> str:
        saved_links.append(m.group(0))
        return f"__SAVED_LINK_{len(saved_links)-1}__"
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', save_link, text)

    # Remove "(node c8_phy_013)" style references in parentheses
    text = _NODE_ID_IN_PARENS_RE.sub('', text)
    # Remove "Review PREREQ c12_phy_007" style references BEFORE stripping PREREQ keyword
    text = re.sub(r'Review\s+(?:CROSS_)?PREREQ\s+\S+', 'Review the prerequisite', text, flags=re.IGNORECASE)
    # Remove bare node IDs and PREREQ/DEPTH_PREREQ/CROSS_PREREQ keywords
    text = _INTERNAL_ID_RE.sub('', text)
    # Remove metadata lines
    text = _NODE_ID_LINE_RE.sub('', text)
    # Clean up "Review  node" artifacts (left after PREREQ removal)
    text = re.sub(r'Review\s+node\s+', 'Review the prerequisite ', text, flags=re.IGNORECASE)
    # Remove stray "node" tokens left behind
    text = re.sub(r'\bnode\b\s+', '', text, flags=re.IGNORECASE)
    # Clean up multiple blank lines and empty parentheses
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'\(\s*\)', '', text)
    text = re.sub(r'  +', ' ', text)  # collapse multiple spaces

    # Restore saved links
    for idx, link_str in enumerate(saved_links):
        text = text.replace(f"__SAVED_LINK_{idx}__", link_str)

    return text.strip()


# ── Adaptive difficulty helpers (item 32: diagnostic_level wiring) ──────

# Bloom's cognitive level ordering (low → high)
_BLOOM_ORDER = [
    "recall", "remember", "understand", "reasoning", "apply",
    "analyze", "analyse", "evaluate", "create",
]

# Map cognitive levels to drill tiers
_LEVEL_TO_TIER = {
    "recall": "BASIC",
    "remember": "BASIC",
    "understand": "BASIC",
    "reasoning": "BASIC",
    "apply": "EXAM",
    "analyze": "EXAM",
    "analyse": "EXAM",
    "evaluate": "EXAM",
    "create": "CHALLENGE",
}


def _bloom_rank(level: str) -> int:
    """Return the numeric rank of a cognitive level (0=lowest)."""
    if not level:
        return 2  # default: reasoning
    norm = level.lower().strip()
    # Handle verbose values like "Understand (Bloom's Level 2 ...)"
    for i, known in enumerate(_BLOOM_ORDER):
        if norm.startswith(known):
            return i
    return 2  # default: reasoning


def _tier_for_level(level: str) -> str:
    """Map a cognitive level to a drill tier (BASIC/EXAM/CHALLENGE)."""
    if not level:
        return "BASIC"
    norm = level.lower().strip()
    for known, tier in _LEVEL_TO_TIER.items():
        if norm.startswith(known):
            return tier
    return "BASIC"


def _select_diagnostic_start_index(
    diag_questions: list, diagnostic_level: str
) -> int:
    """Pick the starting question index based on the topic's diagnostic_level.

    If diagnostic_level is high (e.g. "evaluate"), skip the easier recall/
    understand questions and start at the appropriate level.  If low, start
    from Q1 as before.

    Returns the 0-based index into diag_questions.
    """
    if not diag_questions or not diagnostic_level:
        return 0
    target_rank = _bloom_rank(diagnostic_level)
    # Find the first question whose cognitive_type is at or above the target
    for i, q in enumerate(diag_questions):
        ct = (q.get("cognitive_type", "") or "").lower() if isinstance(q, dict) else ""
        if _bloom_rank(ct) >= target_rank:
            return i
    return 0  # fallback: start from the beginning


def _check_incomplete_question(message: str) -> Optional[str]:
    """Check if a question is missing key information needed to solve it.
    
    Returns a helpful message asking for the missing info, or None if the
    question seems complete (or is not a numerical problem).
    """
    lower = message.lower().strip()
    
    # Only check questions that look like they want a numerical answer
    question_indicators = ["when does", "how long", "how far", "how fast", "find", "calculate", "what is the"]
    if not any(ind in lower for ind in question_indicators):
        return None
    
    # Check for band/crawling problems missing speed or length
    if any(kw in lower for kw in ["band", "caterpillar", "ant", "snail", "worm", "crawl"]):
        has_speed = bool(re.search(r'\d+\.?\d*\s*cm/s', lower))
        has_length = bool(re.search(r'\d+\.?\d*\s*cm', lower))
        if not has_speed and not has_length:
            return (
                "I need more information to solve this problem. "
                "Please provide:\n"
                "• The crawling speed (e.g., 'crawls at 2 cm/s')\n"
                "• The length of the band (e.g., 'a 50 cm band')\n"
                "• Whether the band is stretching, shrinking, or still"
            )
        if not has_speed:
            return (
                "I need the crawling speed to solve this. "
                "For example: 'crawls at 2 cm/s'."
            )
        if not has_length:
            return (
                "I need the length of the band to solve this. "
                "For example: 'a 50 cm band'."
            )
    
    # Check for general physics problems missing key values
    # (e.g., "find velocity" without giving enough info)
    if "velocity" in lower and not any(c.isdigit() for c in lower):
        return (
            "I need more information to find the velocity. "
            "Please provide values like initial velocity, acceleration, time, or height."
        )
    
    if "force" in lower and not any(c.isdigit() for c in lower):
        return (
            "I need more information to find the force. "
            "Please provide values like mass and acceleration."
        )
    
    return None


def _looks_like_multistep(message: str) -> bool:
    """Check if a question looks like a multi-step STEM problem.
    
    Returns True if the question has multi-step indicators and is not
    a simple single-step computation or non-STEM question.
    """
    lower = message.lower().strip()

    # Skip non-STEM
    if any(kw in lower for kw in _SKIP_KEYWORDS):
        return False

    # Skip very short questions (likely single-step)
    if len(lower) < 30:
        return False

    # Check for multi-part indicators
    has_parts = any(ind in lower for ind in _MULTISTEP_INDICATORS)

    # Check for multi-step keywords
    has_keywords = any(kw in lower for kw in _MULTISTEP_KEYWORDS)

    # Check for word-problem structure (long sentence with numbers and math terms)
    has_numbers = any(c.isdigit() for c in lower)
    has_math_terms = any(term in lower for term in [
        "area", "volume", "length", "width", "height", "radius",
        "force", "mass", "velocity", "acceleration", "energy",
        "pressure", "temperature", "charge", "current", "voltage",
        "mole", "molar", "concentration", "ph", "equilibrium",
        "angle", "triangle", "circle", "square", "rectangle",
        "function", "derivative", "integral", "equation",
        "maximize", "minimize", "optimize",
    ])

    # Trigger if: has parts, OR has keywords + math terms, OR is long with numbers + math terms
    if has_parts:
        return True
    if has_keywords and has_math_terms:
        return True
    if len(lower) > 80 and has_numbers and has_math_terms and has_parts:
        return True

    return False


class TutorService:
    """Enrichment-driven tutor service."""

    # ------------------------------------------------------------------ #
    # Session lifecycle
    # ------------------------------------------------------------------ #
    @staticmethod
    async def start_session(
        db: AsyncSession, user_id: str, node_id: str, topic: Optional[str] = None
    ) -> dict:
        """Create a new tutor session for a specific node.

        The first message serves the node's DEFINITION -- the foundation
        of the lesson.
        """
        # Get enrichment content
        result = await db.execute(
            select(EnrichmentContent).where(EnrichmentContent.node_id == node_id)
        )
        enrichment = result.scalar_one_or_none()
        if enrichment is None:
            raise ValueError(f"Enrichment content for node '{node_id}' not found")

        # Check for existing session on the same node — only resume if explicitly requested
        # via topic="resume", otherwise always create a fresh session
        if topic and "resume" in topic.lower():
            now = datetime.now(timezone.utc)
            for existing_sid, existing_meta in _SESSION_METADATA.items():
                if (existing_meta.get("node_id") == node_id
                        and existing_meta.get("user_id") == user_id
                        and existing_meta.get("phase") != "teach"):
                    msg_count = len(existing_meta.get("messages", []))
                    return {
                        "session_id": existing_sid,
                        "node_id": node_id,
                        "topic": existing_meta.get("topic", enrichment.title),
                        "status": "resumed",
                        "message": (
                            f"Welcome back! You have an in-progress session on **{enrichment.title}** "
                            f"({msg_count} messages so far). Continue where you left off."
                        ),
                        "first_message": {
                            "role": "tutor",
                            "content": existing_meta["messages"][-1]["content"] if existing_meta.get("messages") else "",
                            "type": "session_resume",
                        },
                    }
                # Found an in-progress session — return it instead of creating new
                msg_count = len(existing_meta.get("messages", []))
                return {
                    "session_id": existing_sid,
                    "node_id": node_id,
                    "topic": existing_meta.get("topic", enrichment.title),
                    "status": "resumed",
                    "message": (
                        f"Welcome back! You have an in-progress session on **{enrichment.title}** "
                        f"({msg_count} messages so far). Continue where you left off, "
                        f"or type 'restart' to start over."
                    ),
                    "first_message": {
                        "role": "tutor",
                        "content": existing_meta["messages"][-1]["content"] if existing_meta.get("messages") else "",
                        "type": "session_resume",
                    },
                }

        topic_text = topic or enrichment.title

        # Serve the DEFINITION as the opening message
        definition = enrichment.definition or "Let's start with the basics."
        first_message = (
            f"Welcome to: **{enrichment.title}**\n\n{definition}\n\n"
            f"Want me to:\n"
            f"• Walk you through it step by step? (type 'walkthrough')\n"
            f"• Explain it simply? (type 'simplify')\n"
            f"• Show common mistakes? (type 'mistakes')\n"
            f"• Test your understanding? (type 'test me')\n"
            f"• Or ask me any question about this topic!"
        )

        messages = [
            {
                "role": "tutor",
                "content": first_message,
                "type": "definition",
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }
        ]
        meta = {
            "user_id": str(user_id),
            "node_id": node_id,
            "topic": topic_text,
            "subject": enrichment.subject,
            "class_level": enrichment.class_level,
            "messages": messages,
            "misconceptions": [],
            "enrichment_served": ["definition"],
            # Diagnostic flow state
            "phase": "teach",                # teach / diagnostic / remediate / drill / mastered
            "diag_current_q": 0,             # 1-indexed question number during diagnostic
            "diag_answers": {},              # {q_num: student_answer}
            "diag_results": {},              # {q_num: {correct, score, feedback, cognitive_type}}
            "diag_failed": [],               # list of failed question numbers
            "remediation_active": False,     # True when in remediation flow
            "remediation_node": None,        # node_id of prereq being studied
            "original_node": node_id,        # the node we were studying before remediation
            # Socratic teaching state
            "socratic_chunks": [],           # list of TeachingChunk objects
            "socratic_current": -1,          # current chunk index (-1 = not started)
            "hint_levels": {},              # {q_num: hint_level} for progressive hints
            "socratic_hints": {},           # {chunk_idx: hint_level} for Socratic hints
            "socratic_wrong_counts": {},    # {chunk_idx: wrong_count} for adaptive ELI5
            "diag_pre_remediation_scores": {},  # {q_num: score_before_remediation}
            "diag_confidence_recorded": False,  # True after student rates confidence
            "diag_confidence": 0,           # 1-5 confidence rating
            "xp_earned": 0,                 # XP earned in this session
            "guided_practice": None,        # Guided practice state
            # Drill state
            "drill_session_id": None,
            "drill_tier": None,
            "drill_current": 0,
            "drill_total": 0,
        }

        session = StudySession(
            user_id=user_id,
            nodes_studied=1,
            questions_answered=0,
            xp_earned=0,
        )
        db.add(session)
        await db.flush()
        await db.refresh(session)

        session_id = str(session.id)
        await _meta_put(session_id, meta)

        return {
            "session_id": session_id,
            "node_id": node_id,
            "topic": topic_text,
            "messages": messages,
            "status": "active",
        }

    # ------------------------------------------------------------------ #
    # Reply — the core routing logic
    # ------------------------------------------------------------------ #
    @staticmethod
    async def reply(db: AsyncSession, session_id: str, message: str, user_id: str = "") -> dict:
        """Process a student reply and generate the tutor's response.

        Routing order:
        1. Intent keywords (walkthrough, simplify, mistakes, test, etc.)
        2. Numerical problem detection → template engine
        3. Context-based routing (current node)
        4. Keyword/TF-IDF routing across all nodes
        5. LLM fallback (constrained to enrichment content)
        """
        meta = await _meta_get(session_id)
        if meta is None:
            raise ValueError(f"Tutor session '{session_id}' not found")

        # Validate input — reject empty or whitespace-only messages
        if not message or not message.strip():
            return await TutorService._build_reply(
                session_id, meta,
                "It looks like you didn't type anything. That's okay! Type 'help' to see what I can do, or 'walkthrough' to get started.",
                "empty_input", db
            )

        # Record student message
        meta["messages"].append(
            {
                "role": "student",
                "content": message,
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }
        )

        node_id = meta["node_id"]
        subject = meta.get("subject")
        class_level = meta.get("class_level")

        # Get the current node's enrichment
        result = await db.execute(
            select(EnrichmentContent).where(EnrichmentContent.node_id == node_id)
        )
        enrichment = result.scalar_one_or_none()

        # Layer 0: Drill flow — handle drill answers, hints, and show answer
        if meta.get("phase") == "drill" and meta.get("drill_session_id"):
            lower = message.lower().strip()
            if "stop" in lower or "quit" in lower:
                meta["phase"] = "teach"
                meta["drill_session_id"] = None
                meta["drill_tier"] = None
                meta["drill_current"] = 0
                meta["drill_total"] = 0
                return await TutorService._build_reply(
                    session_id, meta, "Drill stopped. What would you like to do next?", "drill_stop", db
                )
            # Handle "show answer" in drill
            if "show answer" in lower or "what's the answer" in lower:
                # Get the current question's model answer from the drill session
                from backend.services.drill_service import _DRILL_SESSIONS
                drill_session = _DRILL_SESSIONS.get(meta["drill_session_id"])
                if drill_session and drill_session.current_index < len(drill_session.questions):
                    q = drill_session.questions[drill_session.current_index]
                    answer = q.correct_answer or q.model_answer or "Answer not available."
                    content = f"**Model Answer:**\n\n{answer}\n\nType your answer, or 'next' to move to the next question:"
                    return await TutorService._build_reply(
                        session_id, meta, content, "drill_show_answer", db
                    )
                return await TutorService._build_reply(
                    session_id, meta, "Answer not available for this question.", "drill_error", db
                )
            # Handle "hint" in drill
            if lower in ("hint", "help", "stuck", "clue", "give me a hint"):
                from backend.services.drill_service import _DRILL_SESSIONS
                drill_session = _DRILL_SESSIONS.get(meta["drill_session_id"])
                if drill_session and drill_session.current_index < len(drill_session.questions):
                    q = drill_session.questions[drill_session.current_index]
                    # Use the model answer to build a hint (first sentence or key formula)
                    answer = q.correct_answer or q.model_answer or ""
                    if answer:
                        # Give the first sentence as a hint
                        first_sentence = answer.split(".")[0] + "."
                        content = f"**Hint:**\n\n{first_sentence}\n\nType your answer, or 'show answer' for the full answer:"
                        return await TutorService._build_reply(
                            session_id, meta, content, "drill_hint", db
                        )
                return await TutorService._build_reply(
                    session_id, meta, "No hint available. Type 'show answer' to see the answer.", "drill_error", db
                )
            # Handle "next" in drill (skip to next question without answering)
            if lower in ("next", "skip"):
                from backend.services.drill_service import _DRILL_SESSIONS
                drill_session = _DRILL_SESSIONS.get(meta["drill_session_id"])
                if drill_session:
                    drill_session.current_index += 1
                    if drill_session.current_index >= len(drill_session.questions):
                        meta["phase"] = "teach"
                        meta["drill_session_id"] = None
                        return await TutorService._build_reply(
                            session_id, meta, "That was the last question. Type 'drill' to try again, or 'test me' for a diagnostic.", "drill_complete", db
                        )
                    next_q = drill_session.questions[drill_session.current_index]
                    meta["drill_current"] = drill_session.current_index + 1
                    content = f"**Question {drill_session.current_index + 1}** ({drill_session.current_tier} tier):\n\n{next_q.question_text}\n\nType your answer:"
                    return await TutorService._build_reply(
                        session_id, meta, content, "drill_progress", db
                    )
            # Treat as drill answer
            drill_result = await DrillService.submit_answer(db, meta["drill_session_id"], message)
            if "error" in drill_result:
                meta["phase"] = "teach"
                return await TutorService._build_reply(
                    session_id, meta, f"Drill error: {drill_result['error']}", "drill_error", db
                )

            # Update drill state in meta
            meta["drill_current"] = drill_result.get("current_question", meta.get("drill_current", 0))
            meta["drill_total"] = drill_result.get("total_questions", meta.get("drill_total", 0))
            meta["drill_tier"] = drill_result.get("tier", meta.get("drill_tier", "BASIC"))

            # Build feedback
            correct_icon = "✓" if drill_result.get("correct") else "✗"
            drill_score = max(0.0, min(1.0, drill_result.get("score", 0)))
            content_parts = [
                f"{correct_icon} **{'Correct!' if drill_result.get('correct') else 'Not quite.'}** "
                f"(Score: {drill_score:.0%})\n\n"
                f"{drill_result.get('feedback', '')}"
            ]

            if drill_result.get("model_answer") and not drill_result.get("correct") and drill_result.get("model_answer") != "None":
                content_parts.append(f"\n\n**Model Answer:**\n{drill_result['model_answer'][:500]}")

            if drill_result.get("tier_complete"):
                if drill_result.get("mastered"):
                    meta["phase"] = "teach"
                    meta["drill_session_id"] = None
                    meta["drill_tier"] = None
                    meta["drill_current"] = 0
                    meta["drill_total"] = 0
                    content_parts.append("\n\n**Mastery verified!** Type 'test me' to retake the diagnostic, or ask about another topic.")
                elif drill_result.get("tier_passed"):
                    next_tier = drill_result.get("next_tier", "")
                    if next_tier and drill_result.get("next_question"):
                        meta["drill_tier"] = next_tier
                        meta["drill_current"] = 1
                        meta["drill_total"] = drill_result.get("total_questions", 5)
                        content_parts.append(
                            f"\n\n---\n\n**{next_tier} Tier — Question 1:**\n\n{drill_result['next_question']}\n\nType your answer. Type 'hint' for a clue, or 'show answer' to see the answer:"
                        )
                    else:
                        meta["phase"] = "teach"
                        meta["drill_session_id"] = None
                        meta["drill_tier"] = None
                        meta["drill_current"] = 0
                        meta["drill_total"] = 0
                        content_parts.append("\n\n**Mastery verified!** You're ready to move on.")
                else:
                    # Failed tier
                    meta["phase"] = "teach"
                    content_parts.append("\n\nType 'retry' to try the tier again, or 'review' for remediation.")
            elif drill_result.get("next_question"):
                meta["drill_current"] = drill_result.get("current_question", 1)
                content_parts.append(
                    f"\n\n---\n\n**Question {drill_result.get('current_question', 1)}** "
                    f"({drill_result.get('tier', 'BASIC')} tier):\n\n"
                    f"{drill_result['next_question']}\n\nType your answer. Type 'hint' for a clue, or 'show answer' to see the answer:"
                )

            return await TutorService._build_reply(
                session_id, meta, "\n".join(content_parts), "drill_progress", db
            )

        # Layer 0a: Flashcard quiz flow — handle quiz answers
        if meta.get("phase") == "flashcard_quiz" and meta.get("flashcard_quiz"):
            quiz = meta["flashcard_quiz"]
            lower = message.lower().strip()
            if "stop" in lower or "quit" in lower or "exit" in lower:
                meta["phase"] = "teach"
                meta["flashcard_quiz"] = None
                results = quiz.get("results", [])
                correct = sum(1 for r in results if r.get("correct"))
                # Feed results into SM-2 spaced repetition
                await TutorService._update_sm2_from_quiz(meta, results)
                content = (
                    f"**Flashcard Quiz Complete!**\n\n"
                    f"You got {correct}/{len(results)} correct.\n\n"
                    f"Cards you missed have been added to your review queue. "
                    f"Type 'spiral review' to see when to review them next, "
                    f"or 'test me' for a full diagnostic."
                )
                return await TutorService._build_reply(session_id, meta, content, "flashcard_quiz_complete", db)

            current_idx = quiz.get("current", 0)
            cards = quiz.get("cards", [])
            if current_idx >= len(cards):
                meta["phase"] = "teach"
                meta["flashcard_quiz"] = None
                results = quiz.get("results", [])
                correct = sum(1 for r in results if r.get("correct"))
                # Feed results into SM-2 spaced repetition
                await TutorService._update_sm2_from_quiz(meta, results)
                content = (
                    f"**Flashcard Quiz Complete!**\n\n"
                    f"You got {correct}/{len(results)} correct.\n\n"
                    f"Cards you missed have been added to your review queue. "
                    f"Type 'spiral review' to see when to review them next, "
                    f"or 'test me' for a full diagnostic."
                )
                return await TutorService._build_reply(session_id, meta, content, "flashcard_quiz_complete", db)

            current_card = cards[current_idx]
            if "show answer" in lower or "reveal" in lower:
                # Show the answer and move to next
                quiz["results"].append({
                    "card": current_card["front"][:50],
                    "correct": False,
                    "skipped": True,
                })
                content = f"**Answer:** {current_card['back']}"
                next_idx = current_idx + 1
                quiz["current"] = next_idx
                if next_idx < len(cards):
                    next_card = cards[next_idx]
                    content += (
                        f"\n\n---\n\n**Card {next_idx + 1} of {len(cards)}** "
                        f"({next_card.get('cognitive_level', 'review')})\n\n"
                        f"**Q:** {next_card['front']}\n\n"
                        f"Type your answer, or 'show answer' to reveal it."
                    )
                else:
                    correct = sum(1 for r in quiz["results"] if r.get("correct"))
                    content += f"\n\n---\n\n**Quiz Complete!** You got {correct}/{len(quiz['results'])} correct."
                    meta["phase"] = "teach"
                    meta["flashcard_quiz"] = None
                return await TutorService._build_reply(session_id, meta, content, "flashcard_quiz_reveal", db)
            elif "next" in lower:
                # Skip to next card
                next_idx = current_idx + 1
                quiz["current"] = next_idx
                if next_idx < len(cards):
                    next_card = cards[next_idx]
                    content = (
                        f"**Card {next_idx + 1} of {len(cards)}** "
                        f"({next_card.get('cognitive_level', 'review')})\n\n"
                        f"**Q:** {next_card['front']}\n\n"
                        f"Type your answer, or 'show answer' to reveal it."
                    )
                else:
                    correct = sum(1 for r in quiz["results"] if r.get("correct"))
                    content = f"**Quiz Complete!** You got {correct}/{len(quiz['results'])} correct."
                    meta["phase"] = "teach"
                    meta["flashcard_quiz"] = None
                return await TutorService._build_reply(session_id, meta, content, "flashcard_quiz_next", db)
            else:
                # Evaluate the student's answer
                student_answer = message.strip()
                back = current_card.get("back", "").lower()
                answer_lower = student_answer.lower()
                # Evaluate using hybrid evaluator (semantic + keyword)
                is_correct = False
                try:
                    fc_result = await evaluate_answer_hybrid(
                        student_answer=student_answer,
                        model_answer=current_card.get("back", ""),
                        question_type="free_text",
                        question_text=current_card.get("front", ""),
                        solver_bridge=evaluator_solver_bridge,
                    )
                    is_correct = fc_result.correct or fc_result.score >= 0.3
                except Exception:
                    # Fallback to keyword overlap
                    back_words = set(re.findall(r'[a-z]{4,}', back))
                    answer_words = set(re.findall(r'[a-z]{4,}', answer_lower))
                    overlap = len(back_words & answer_words)
                    score = overlap / max(len(back_words), 1) if back_words else 0
                    is_correct = score >= 0.3 or (len(student_answer) > 20 and score >= 0.15)

                quiz["results"].append({
                    "card": current_card["front"][:50],
                    "correct": is_correct,
                    "student_answer": student_answer[:100],
                })

                if is_correct:
                    feedback = f"✓ **Correct!** The answer is: {current_card['back']}"
                else:
                    feedback = f"◐ **Not quite.** The answer is: {current_card['back']}"

                next_idx = current_idx + 1
                quiz["current"] = next_idx
                if next_idx < len(cards):
                    next_card = cards[next_idx]
                    feedback += (
                        f"\n\n---\n\n**Card {next_idx + 1} of {len(cards)}** "
                        f"({next_card.get('cognitive_level', 'review')})\n\n"
                        f"**Q:** {next_card['front']}\n\n"
                        f"Type your answer, or 'show answer' to reveal it."
                    )
                else:
                    correct = sum(1 for r in quiz["results"] if r.get("correct"))
                    feedback += f"\n\n---\n\n**Quiz Complete!** You got {correct}/{len(quiz['results'])} correct."
                    meta["phase"] = "teach"
                    meta["flashcard_quiz"] = None
                return await TutorService._build_reply(session_id, meta, feedback, "flashcard_quiz_answer", db)

        # Layer 0a2: Guided practice flow — handle practice answers
        if meta.get("phase") == "guided_practice" and meta.get("guided_practice"):
            gp = meta["guided_practice"]
            lower = message.lower().strip()
            if "stop" in lower or "quit" in lower or "exit" in lower:
                meta["phase"] = "teach"
                meta["guided_practice"] = None
                return await TutorService._build_reply(
                    session_id, meta, "Practice stopped. What would you like to do next?", "guided_practice_stop", db
                )
            if "show solution" in lower or "show answer" in lower:
                answer = gp.get("answer", "")
                if answer:
                    content = f"**Full Solution:**\n\n{answer}\n\nType 'test me' to try the diagnostic, or 'walkthrough' to review the concept."
                else:
                    content = "Solution not available. Type 'test me' for the diagnostic, or 'walkthrough' to review."
                meta["phase"] = "teach"
                meta["guided_practice"] = None
                return await TutorService._build_reply(session_id, meta, content, "guided_practice_solution", db)

            step = gp.get("step", 1)
            total = gp.get("steps_total", 3)
            if step == 1:
                # Acknowledge their attempt and move to step 2
                gp["step"] = 2
                content = (
                    f"Good thinking! Now let's apply it.\n\n"
                    f"**Step 2 of {total}:** Write down the formula or relationship you'd use. "
                    f"Even a rough version is fine — type your answer, or 'show solution' to see it."
                )
                return await TutorService._build_reply(session_id, meta, content, "guided_practice_step", db)
            elif step == 2:
                gp["step"] = 3
                content = (
                    f"Good! Now let's compute the answer.\n\n"
                    f"**Step 3 of {total}:** What's the final answer? Type your answer, "
                    f"or 'show solution' to see the full solution."
                )
                return await TutorService._build_reply(session_id, meta, content, "guided_practice_step", db)
            else:
                # Final step — show the answer and transition
                answer = gp.get("answer", "")
                content = (
                    f"Great effort! Here's the model answer for comparison:\n\n"
                    f"**Model Answer:** {answer[:400] if answer else 'Not available.'}\n\n"
                    f"You've practiced the key steps. Type 'test me' to try the full diagnostic, "
                    f"or 'walkthrough' to review the concept."
                )
                meta["phase"] = "teach"
                meta["guided_practice"] = None
                return await TutorService._build_reply(session_id, meta, content, "guided_practice_done", db)

        if meta.get("phase") == "diagnostic" and meta.get("diag_current_q", 0) > 0:
            # Check for special commands first
            lower = message.lower().strip()
            # Commands that should break out of diagnostic mode
            _DIAG_BREAKOUT_COMMANDS = [
                "stop", "quit", "exit", "cancel",
                "flashcards", "flashcard", "glossary", "terms",
                "spiral", "spiral review", "spaced repetition",
                "what have i learned", "my progress", "progress",
                "walkthrough", "eli5", "simplify",
                "what topics", "show chapters", "browse",
                "where do i start", "learning path",
            ]
            if any(lower == cmd or lower.startswith(cmd) for cmd in _DIAG_BREAKOUT_COMMANDS):
                meta["phase"] = "teach"
                meta["diag_current_q"] = 0
                # Handle the command directly here instead of falling through
                # to avoid it being caught by other handlers
                try:
                    if lower in ("stop", "quit", "exit", "cancel"):
                        return await TutorService._build_reply(session_id, meta, "Diagnostic stopped. What would you like to do next? You can type 'walkthrough' to learn step by step, 'flashcards' for quick review, or 'test me' to try again.", "diagnostic_stop", db)
                    if "flashcard" in lower:
                        return await TutorService._handle_flashcards(session_id, meta, enrichment, db)
                    if "glossary" in lower or "terms" in lower:
                        glossary_text = await notes_service.get_glossary_browse(db, node_id)
                        if glossary_text:
                            return await TutorService._build_reply(session_id, meta, f"**Glossary for this topic**\n\n{glossary_text}", "glossary", db)
                        return await TutorService._build_reply(session_id, meta, "No glossary available. Type 'flashcards' for key concepts.", "glossary", db)
                    if "eli5" in lower or "simplify" in lower:
                        content = enrichment.eli5 or enrichment.text_walkthrough or "Simple explanation not available for this topic."
                        return await TutorService._build_reply(session_id, meta, content, "eli5", db)
                    if "what topics" in lower or "browse" in lower or "chapters" in lower:
                        browse_content = await TutorService._handle_topic_browse(db, meta)
                        if browse_content:
                            return await TutorService._build_reply(session_id, meta, browse_content, "topic_browse", db)
                    if "where do i start" in lower or "learning path" in lower:
                        path_content = await TutorService._handle_learning_path(db, meta, enrichment)
                        if path_content:
                            return await TutorService._build_reply(session_id, meta, path_content, "learning_path", db)
                    if "what have i learned" in lower or "progress" in lower:
                        progress_content = await TutorService._handle_progress_check(db, meta)
                        if progress_content:
                            return await TutorService._build_reply(session_id, meta, progress_content, "progress_check", db)
                except Exception:
                    pass  # Fall through to normal intent handling
                # Default: fall through to normal intent handling
            elif "show answer" in lower or "skip" in lower:
                return await TutorService._handle_diagnostic_skip(session_id, meta, enrichment, db)
            else:
                # Confidence calibration — if student types a number 1-5, record as confidence
                if lower in ("1", "2", "3", "4", "5") and not meta.get("diag_confidence_recorded"):
                    meta["diag_confidence_recorded"] = True
                    meta["diag_confidence"] = int(lower)
                    confidence_labels = {
                        1: "not confident at all", 2: "a little confident",
                        3: "somewhat confident", 4: "fairly confident", 5: "very confident",
                    }
                    content = (
                        f"Thanks! You rated yourself **{lower}/5** ({confidence_labels.get(int(lower), '')}). "
                        f"Don't worry if you're not confident — that's what we're here to work on.\n\n"
                        f"Now, what's your answer to Question {meta.get('diag_current_q', 1)}? "
                        f"Take your best guess — even a partial answer helps."
                    )
                    return await TutorService._build_reply(
                        session_id, meta, content, "confidence_recorded", db
                    )
                if "practice similar" in lower or "try similar" in lower or "similar question" in lower:
                    # Serve a similar practice question from flashcards
                    keywords = await notes_service.get_topic_keywords(db, node_id)
                    cards = await notes_service.get_flashcard_quiz(db, node_id, keywords, num_cards=1)
                    if cards:
                        card = cards[0]
                        meta["phase"] = "flashcard_quiz"
                        meta["flashcard_quiz"] = {"cards": cards, "current": 0, "results": []}
                        content = (
                            f"**Practice Similar Question**\n\n"
                            f"**Q:** {card['front']}\n\n"
                            f"Type your answer, or 'show answer' to reveal it."
                        )
                        return await TutorService._build_reply(
                            session_id, meta, content, "practice_similar", db
                        )
                    return await TutorService._build_reply(
                        session_id, meta,
                        "No similar questions available. Type 'show answer' to see the answer, "
                        "or 'review' for remediation.",
                        "practice_similar_empty", db
                    )
                if lower in ("hint", "help", "stuck", "clue", "give me a hint"):
                    # Progressive hint system
                    q_num = meta.get("diag_current_q", 0)
                    hint_levels = meta.get("hint_levels", {})
                    current_level = hint_levels.get(q_num, 0) + 1
                    if current_level > 3:
                        return await TutorService._build_reply(
                            session_id, meta,
                            "No more hints available. Type 'show answer' to see the full answer.",
                            "hint_exhausted", db
                        )
                    hint_levels[q_num] = current_level
                    meta["hint_levels"] = hint_levels
                    hint_text = build_hint(current_level, q_num, enrichment)
                    return await TutorService._build_reply(
                        session_id, meta, hint_text, f"hint_level_{current_level}", db
                    )
                if "stop" in lower or "quit" in lower or "exit" in lower:
                    meta["phase"] = "teach"
                    meta["diag_current_q"] = 0
                    return await TutorService._build_reply(
                        session_id, meta, "Diagnostic stopped. What would you like to do next?", "diagnostic_stop", db
                    )
                # Treat as answer to current diagnostic question
                return await TutorService._handle_diagnostic_answer(session_id, meta, enrichment, message, db)

        # Layer 0b: Remediation flow — if student was sent to review a prereq
        if meta.get("remediation_active") and meta.get("remediation_node"):
            lower = message.lower().strip()
            if "back" in lower or "return" in lower or "ready" in lower:
                # Student wants to return to original node
                orig_node = meta.get("original_node", node_id)
                meta["node_id"] = orig_node
                meta["remediation_active"] = False
                meta["remediation_node"] = None
                meta["remediation_completed"] = True
                meta["phase"] = "diagnostic"
                # Re-fetch enrichment for original node
                orig_result = await db.execute(
                    select(EnrichmentContent).where(EnrichmentContent.node_id == orig_node)
                )
                orig_enrichment = orig_result.scalar_one_or_none()
                if orig_enrichment:
                    # Retest the failed question
                    failed = meta.get("diag_failed", [])
                    if failed:
                        q_num = failed[0]
                        diag = orig_enrichment.diagnostic_questions or []
                        q = next((d for d in diag if d.get("number") == q_num), None)
                        if q:
                            meta["diag_current_q"] = q_num
                            # Track that this is a post-remediation retry
                            pre_scores = meta.get("diag_pre_remediation_scores", {})
                            if q_num not in pre_scores:
                                pre_scores[q_num] = meta.get("diag_results", {}).get(q_num, {}).get("score", 0.0)
                                meta["diag_pre_remediation_scores"] = pre_scores
                            content = (
                                f"Welcome back! You've reviewed the prerequisite. "
                                f"Now let's see if you can answer the question you were stuck on.\n\n"
                                f"**Retry: Diagnostic Question {q_num}** ({q.get('cognitive_type', '')}):\n\n"
                                f"{q.get('question', '')}\n\n"
                                f"Type your answer:"
                            )
                            return await TutorService._build_reply(session_id, meta, content, "diagnostic_retry", db)
                return await TutorService._build_reply(
                    session_id, meta, "Welcome back! What would you like to do?", "remediation_return", db
                )

        # Layer 0c: Socratic teaching flow — handle checkpoint answers and 'next'
        if meta.get("phase") == "socratic" and meta.get("socratic_chunks"):
            lower = message.lower().strip()
            # Check for intent keywords that should break out of Socratic mode
            # and be handled by the intent handler instead
            _NOTE_INTENT_KEYWORDS = [
                "test me", "quiz me", "diagnostic", "assess me",
                "drill", "practice drill", "exam practice",
                "mistake", "mistakes", "wrong", "error", "misconception", "common error",
                "silly mistake", "silly errors", "careless",
                "example", "show me", "demonstrate", "sample", "worked example",
                "show solution", "show full solution", "full solution", "show working",
                "formula", "formulas", "formulae",
                "revision", "revise", "summary", "summarize", "quick review",
                "flashcard", "flashcards", "quick revision", "rapid revision", "cram",
                "exam tip", "exam technique", "high yield", "exam strategy",
                "real world", "application", "applications",
                "solution template", "how to solve", "answer format",
                "solve", "calculate", "compute",
                "stuck", "help", "struggling",
                "scope", "syllabus", "mastery", "criteria",
                "guided practice", "practice", "try it", "my turn",
                "next topic", "what's next", "spiral", "glossary",
                "practice similar", "try similar",
                # Greetings and browsing also break out
                "hello", "hi ", "hey", "chapters", "topics", "where do i start",
                "what should i study", "learning path", "what have i learned",
                "my progress", "i don't get it", "i don't understand", "this is hard",
                "i'm confused", "i'm lost", "i give up",
                "i dont understand", "i dont get it", "im confused", "im lost",
                "dont understand", "dont get it", "not getting it", "cant understand",
                "nahi samajh", "nahi samajha", "samajh nahi", "samajha nahi",
                "hint do", "hint de", "hint dedo",
            ]
            if any(w in lower for w in _NOTE_INTENT_KEYWORDS):
                # Break out of Socratic mode — handle as intent
                meta["phase"] = "teach"
                meta["socratic_chunks"] = []
                meta["socratic_current"] = -1
                # Fall through to intent handling below
            elif any(w in lower for w in ["simplify", "eli5", "explain like", "easy way", "too hard"]):
                # Serve ELI5 without leaving Socratic mode
                content = enrichment.eli5 or enrichment.text_walkthrough or "Simple explanation not available for this topic."
                return await TutorService._build_reply(session_id, meta, content, "eli5", db)
            elif lower in ("back", "previous", "go back", "repeat"):
                # Go back to previous chunk
                chunks_data = meta.get("socratic_chunks", [])
                current_idx = meta.get("socratic_current", -1)
                if current_idx > 0:
                    prev_idx = current_idx - 1
                    meta["socratic_current"] = prev_idx
                    chunk_data = chunks_data[prev_idx]
                    checkpoint = chunk_data.get("checkpoint_question")
                    content = f"Let's revisit the previous section:\n\n{chunk_data['content']}"
                    if checkpoint:
                        content += f"\n\n**Checkpoint:** {checkpoint}"
                    return await TutorService._build_reply(
                        session_id, meta, content, "socratic_chunk", db
                    )
                else:
                    return await TutorService._build_reply(
                        session_id, meta, "This is already the first section. Type 'next' to continue.", "socratic_checkpoint", db
                    )
            elif lower.startswith("what is ") or lower.startswith("what does ") or lower.startswith("what's ") or lower.startswith("define "):
                # Inline vocabulary help — try glossary first, then enrichment content
                term = re.sub(r"^(what is |what does |what's |define )", "", lower).rstrip("?.! ").strip()
                # Try the glossary first (dedicated term definitions with SI units)
                glossary_result = await notes_service.get_glossary_term(db, meta.get("node_id", ""), term)
                if glossary_result:
                    return await TutorService._build_reply(
                        session_id, meta, glossary_result, "socratic_vocab", db
                    )
                # Fall back to searching enrichment content
                definition = enrichment.definition or ""
                eli5 = enrichment.eli5 or ""
                walkthrough = enrichment.text_walkthrough or ""
                all_text = f"{definition}\n\n{eli5}\n\n{walkthrough}"
                sentences = re.split(r'(?<=[.!?])\s+', all_text)
                matches = [s.strip() for s in sentences if term in s.lower() and len(s.strip()) > 20]
                if matches:
                    content = f"**{term}** — from this lesson:\n\n{matches[0]}"
                    if len(matches) > 1:
                        content += f"\n\nAlso: {matches[1]}"
                    return await TutorService._build_reply(
                        session_id, meta, content, "socratic_vocab", db
                    )
                else:
                    return await TutorService._build_reply(
                        session_id, meta,
                        f"I couldn't find '{term}' in this lesson. Try rephrasing, or type 'next' to continue.",
                        "socratic_vocab", db
                    )
            elif lower in ("hint", "clue", "give me a hint", "help me"):
                # Progressive hint system for Socratic checkpoints
                chunks_data = meta.get("socratic_chunks", [])
                current_idx = meta.get("socratic_current", -1)
                if 0 <= current_idx < len(chunks_data):
                    chunk_data = chunks_data[current_idx]
                    chunk_content = chunk_data.get("content", "")
                    keywords = chunk_data.get("checkpoint_answer_keywords", [])
                    checkpoint_q = chunk_data.get("checkpoint_question", "")
                    socratic_hints = meta.get("socratic_hints", {})
                    current_level = socratic_hints.get(current_idx, 0) + 1
                    if current_level > 3:
                        hint_text = (
                            "Let me give you a simpler version. Type 'eli5' for a simple analogy, "
                            "or 'next' to move on and come back to this later."
                        )
                    else:
                        socratic_hints[current_idx] = current_level
                        meta["socratic_hints"] = socratic_hints
                        if current_level == 1:
                            # Level 1: ask a guiding question that points to the concept
                            if keywords:
                                hint_text = (
                                    f"**Hint 1 of 3:** Think about **{keywords[0]}**. "
                                    f"Can you explain what {keywords[0]} means in your own words? "
                                    f"Even a rough idea is fine."
                                )
                            else:
                                # Extract the most important sentence from the chunk
                                sentences = [s.strip() for s in chunk_content.split(".") if len(s.strip()) > 30]
                                key_sentence = sentences[0][:120] if sentences else chunk_content[:120]
                                hint_text = (
                                    f"**Hint 1 of 3:** Here's the key sentence from what you read:\n"
                                    f"\"{key_sentence}...\"\n"
                                    f"What do you think it's trying to say?"
                                )
                        elif current_level == 2:
                            # Level 2: give a fill-in-the-blank scaffold
                            if len(keywords) >= 2:
                                hint_text = (
                                    f"**Hint 2 of 3:** Fill in the blank:\n"
                                    f"The concept here connects **{keywords[0]}** with **{keywords[1]}**. "
                                    f"Complete this sentence: \"{keywords[0].capitalize()} is related to {keywords[1]} because...\""
                                )
                            elif keywords:
                                hint_text = (
                                    f"**Hint 2 of 3:** The answer is about **{keywords[0]}**. "
                                    f"Write one sentence about why {keywords[0]} is important here."
                                )
                            else:
                                hint_text = (
                                    "**Hint 2 of 3:** What is the main takeaway from the section you just read? "
                                    "Write it in one sentence."
                                )
                        else:
                            # Level 3: give a near-complete answer scaffold
                            if len(keywords) >= 2:
                                hint_text = (
                                    f"**Hint 3 of 3:** Here's a scaffold — complete it:\n"
                                    f"\"The main idea is that {keywords[0]} ___ {keywords[1]}...\"\n"
                                    f"Fill in the blank with what you think connects them. "
                                    f"Or type 'next' to see the answer and move on."
                                )
                            elif keywords:
                                hint_text = (
                                    f"**Hint 3 of 3:** The answer involves **{keywords[0]}**. "
                                    f"Write a sentence using this term. Even a guess is fine — you can type 'next' to move on."
                                )
                            else:
                                hint_text = (
                                    "**Hint 3 of 3:** Try your best — write what you remember from the section. "
                                    "Or type 'next' to move on."
                                )
                    return await TutorService._build_reply(
                        session_id, meta, hint_text, f"socratic_hint_{current_level}", db
                    )
            elif lower in ("next", "skip", "continue"):
                # Advance to next chunk
                chunks_data = meta.get("socratic_chunks", [])
                current_idx = meta.get("socratic_current", -1)
                # Convert stored chunk dicts back to TeachingChunk-like objects
                chunks = [
                    TeachingChunk(
                        index=c["index"],
                        content=c["content"],
                        checkpoint_question=c.get("checkpoint_question"),
                        checkpoint_answer_keywords=c.get("checkpoint_answer_keywords", []),
                        is_last=c.get("is_last", False),
                    )
                    for c in chunks_data
                ]
                result = next_socratic_chunk(chunks, current_idx)
                meta["socratic_current"] = result["chunk_index"]
                if result["is_last"] and result["phase"] == "teach":
                    meta["phase"] = "teach"
                return await TutorService._build_reply(
                    session_id, meta, result["content"], "socratic_chunk", db
                )
            else:
                # Evaluate checkpoint answer
                chunks_data = meta.get("socratic_chunks", [])
                current_idx = meta.get("socratic_current", -1)
                if 0 <= current_idx < len(chunks_data):
                    chunk_data = chunks_data[current_idx]
                    chunk = TeachingChunk(
                        index=chunk_data["index"],
                        content=chunk_data["content"],
                        checkpoint_question=chunk_data.get("checkpoint_question"),
                        checkpoint_answer_keywords=chunk_data.get("checkpoint_answer_keywords", []),
                        is_last=chunk_data.get("is_last", False),
                    )
                    correct, feedback = await evaluate_checkpoint_hybrid(message, chunk)
                    if correct:
                        # Reset wrong counter for this chunk
                        wrong_counts = meta.get("socratic_wrong_counts", {})
                        wrong_counts[current_idx] = 0
                        meta["socratic_wrong_counts"] = wrong_counts
                        # Advance to next chunk
                        result = next_socratic_chunk(
                            [TeachingChunk(**c) for c in chunks_data],
                            current_idx,
                        )
                        meta["socratic_current"] = result["chunk_index"]
                        if result["is_last"] and result["phase"] == "teach":
                            meta["phase"] = "teach"
                        content = f"✓ {feedback}\n\n---\n\n{result['content']}"
                        return await TutorService._build_reply(
                            session_id, meta, content, "socratic_chunk", db
                        )
                    else:
                        # Track wrong attempts — auto-ELI5 after 2 wrong answers
                        wrong_counts = meta.get("socratic_wrong_counts", {})
                        wrong_counts[current_idx] = wrong_counts.get(current_idx, 0) + 1
                        meta["socratic_wrong_counts"] = wrong_counts
                        if wrong_counts[current_idx] >= 2 and enrichment.eli5:
                            # Truncate ELI5 at sentence boundary, not mid-sentence
                            eli5_text = enrichment.eli5
                            if len(eli5_text) > 400:
                                # Find last sentence boundary before 400 chars
                                cut = eli5_text[:400].rfind('. ')
                                if cut > 100:
                                    eli5_text = eli5_text[:cut + 1]
                                else:
                                    eli5_text = eli5_text[:400].rsplit(' ', 1)[0] + "..."
                            feedback += (
                                f"\n\n---\n\nIt looks like this part is tricky. Here's a simpler way to think about it:\n\n"
                                f"**{eli5_text}**\n\n"
                                f"Now try answering the checkpoint again, or type 'next' to move on."
                            )
                        return await TutorService._build_reply(
                            session_id, meta, feedback, "socratic_checkpoint", db
                        )

        # Layer 0.9: Greeting / frustration / browsing / learning path
        lower = message.lower().strip()

        # Greeting — serve definition + welcome
        _GREETINGS = {"hi", "hello", "hey", "hi there", "hello there", "hey there",
                       "good morning", "good afternoon", "good evening", "sup", "yo"}
        if lower in _GREETINGS or lower.startswith("hi ") or lower.startswith("hello "):
            title = enrichment.title if enrichment else "this topic"
            # Truncate definition at sentence boundary
            def_full = (enrichment.definition or "") if enrichment else ""
            if len(def_full) > 500:
                cut = def_full[:500].rfind('. ')
                if cut > 100:
                    definition = def_full[:cut + 1]
                else:
                    definition = def_full[:500].rsplit(' ', 1)[0] + "..."
            else:
                definition = def_full
            content = (
                f"Hello! Welcome to **{title}**.\n\n"
                f"{definition}\n\n"
                f"Here's what you can do:\n"
                f"• Type **walkthrough** for a step-by-step explanation\n"
                f"• Type **eli5** for a simple analogy\n"
                f"• Type **test me** to check your understanding\n"
                f"• Type **flashcards** for quick review cards\n"
                f"• Type **help** if you're stuck"
            )
            return await TutorService._build_reply(session_id, meta, content, "greeting", db)

        # Frustration / emotional support detection
        _FRUSTRATION_SIGNALS = [
            "i don't get it", "i don't understand", "this is hard", "this is confusing",
            "i'm confused", "i'm lost", "too hard", "i give up", "i cant do this",
            "i can't do this", "makes no sense", "what is going on", "i'm dumb",
            "i'm stupid", "help me", "i don't know anything", "i don't know where to start",
            "i don't know", "i dont know", "idk", "no idea", "i have no idea",
            "i'm stuck", "im stuck", "stuck", "struggling", "i am stuck",
            # Hinglish frustration signals
            "nahi samajh", "nahi samajha", "samajh nahi", "samajha nahi",
            "samajh nahi aaya", "samajha nahi aaya", "nahi aata", "nahi aata hai",
            "i dont understand", "i dont get it", "im confused", "im lost",
            "dont understand", "dont get it", "not getting it", "cant understand",
        ]
        # "help" as a standalone message is also a frustration signal
        _frustration_matched = any(sig in lower for sig in _FRUSTRATION_SIGNALS) or lower == "help"
        if _frustration_matched:
            # Track repeated frustration for escalation
            frustration_count = meta.get("frustration_count", 0) + 1
            meta["frustration_count"] = frustration_count
            title = enrichment.title if enrichment else "this topic"
            # Truncate ELI5 at sentence boundary
            eli5_full = (enrichment.eli5 or "") if enrichment else ""
            if len(eli5_full) > 400:
                cut = eli5_full[:400].rfind('. ')
                if cut > 100:
                    eli5 = eli5_full[:cut + 1]
                else:
                    eli5 = eli5_full[:400].rsplit(' ', 1)[0] + "..."
            else:
                eli5 = eli5_full

            # Detect Hinglish input for bilingual acknowledgment
            _HINGLISH_SIGNALS = ["nahi samajh", "nahi samajha", "samajh nahi", "samajha nahi",
                                 "nahi aata", "nahi aata hai", "samajh nahi aaya", "samajha nahi aaya"]
            is_hinglish = any(sig in lower for sig in _HINGLISH_SIGNALS)
            hinglish_ack = "Koi baat nahi — " if is_hinglish else ""

            # Escalating responses based on frustration count
            if frustration_count >= 3:
                # Third+ time: suggest taking a break or switching topics
                content = (
                    f"It sounds like you're really struggling with {title}, and that's completely okay. "
                    f"Sometimes stepping away and coming back later helps.\n\n"
                    f"Here are some options:\n"
                    f"• Type **flashcards** — just review the basics without pressure\n"
                    f"• Type **eli5** — for the simplest possible explanation\n"
                    f"• Type **next topic** — try a different topic and come back to this one later\n"
                    f"• Take a short break — learning is more effective when you're rested\n\n"
                    f"You're not giving up — you're being smart about your learning."
                )
            elif frustration_count == 2:
                # Second time: more direct, offer to show the answer
                content = (
                    f"I can see this is still tricky. Let's try a different approach.\n\n"
                    f"**Simple version:** {eli5}\n\n"
                    f"Would you like me to:\n"
                    f"• **Show you the answer** — type 'show answer' to see a worked example\n"
                    f"• **Walk through it slowly** — type 'walkthrough' for step-by-step\n"
                    f"• **Try a different topic** — type 'next topic'\n\n"
                    f"There's no rush. Take your time."
                )
            else:
                # First time: standard empathetic response
                content = (
                    f"{hinglish_ack}It's okay to feel stuck — {title} is a challenging topic, "
                    f"and you're not alone in finding it difficult. Let me break it down.\n\n"
                    f"**Simple version:** {eli5}\n\n"
                    f"Here's what I suggest:\n"
                    f"• Type **walkthrough** — I'll guide you one small step at a time\n"
                    f"• Type **eli5** — for an even simpler analogy\n"
                    f"• Type **flashcards** — quick cards to build your basics\n"
                    f"• Type **where do i start** — I'll show you what to study first\n\n"
                    f"You've got this. Take it one step at a time."
                )
            return await TutorService._build_reply(session_id, meta, content, "emotional_support", db)

        # Topic browsing — "show chapters" / "what topics" / "list topics"
        if any(w in lower for w in ["show chapters", "what topics", "list topics",
                                     "show topics", "what chapters", "list chapters",
                                     "browse topics", "browse chapters", "show me topics",
                                     "show me chapters", "show me topics", "show topics"]):
            browse_content = await TutorService._handle_topic_browse(db, meta)
            if browse_content:
                return await TutorService._build_reply(session_id, meta, browse_content, "topic_browse", db)

        # Learning path — "where do I start" / "what should I study first" / "learning path"
        if any(w in lower for w in ["where do i start", "what should i study",
                                     "what should i learn", "learning path", "where to start",
                                     "what do i need to know", "prerequisites", "what comes before",
                                     "what do i need before"]):
            path_content = await TutorService._handle_learning_path(db, meta, enrichment)
            if path_content:
                return await TutorService._build_reply(session_id, meta, path_content, "learning_path", db)

        # Next topic — "next topic" / "what's next" / "move on"
        if any(w in lower for w in ["next topic", "what's next", "whats next", "move on",
                                     "what now", "what next", "continue to next"]):
            forward_ids = enrichment.forward_node_ids or [] if enrichment else []
            if forward_ids:
                # Fetch forward_reasons from the graph — maps forward node_id
                # to a human-readable reason for why it's the natural next step.
                forward_reasons_map = {}
                try:
                    graph_fields = await GraphService.get_node_enrichment_fields(enrichment.node_id)
                    forward_reasons_map = graph_fields.get("forward_reasons", {})
                except Exception:
                    pass
                next_titles = []
                for fid in forward_ids[:3]:
                    try:
                        f_result = await db.execute(
                            select(EnrichmentContent).where(EnrichmentContent.node_id == fid)
                        )
                        f_enr = f_result.scalar_one_or_none()
                        if f_enr:
                            next_titles.append((fid, f_enr.title))
                    except Exception:
                        pass
                if next_titles:
                    lines = ["**What's next?** You're ready to move on to:\n"]
                    for fid, title in next_titles:
                        reason = forward_reasons_map.get(fid)
                        if reason:
                            lines.append(f"  • {title} — _{reason}_")
                        else:
                            lines.append(f"  • {title}")
                    lines.append(
                        f"\nType the name of the topic you want to learn next, "
                        f"or type 'drill' for exam practice on the current topic first."
                    )
                    return await TutorService._build_reply(
                        session_id, meta, "\n".join(lines), "next_topic", db
                    )
            return await TutorService._build_reply(
                session_id, meta,
                "You've completed this topic! Type 'test me' to verify your understanding, "
                "or 'drill' for exam practice.",
                "next_topic", db
            )

        # Spiral review — "spiral review" / "review old topics" / "spaced repetition"
        if any(w in lower for w in ["spiral", "spiral review", "review old", "spaced repetition",
                                     "review schedule", "what should i review", "review queue"]):
            try:
                from backend.services.spiral_service import SpiralService
                review_plan = await SpiralService.get_review_plan(
                    db, user_id=meta.get("user_id", ""), subject=meta.get("subject", "")
                )
                if review_plan and review_plan.get("items"):
                    lines = ["**Spiral Review Queue**\n"]
                    for item in review_plan["items"][:5]:
                        lines.append(f"  • {item.get('title', 'Unknown')} — due: {item.get('due', 'now')}")
                    lines.append("\nType a topic name to start reviewing, or 'flashcards' for quick practice.")
                    return await TutorService._build_reply(
                        session_id, meta, "\n".join(lines), "spiral_review", db
                    )
            except Exception:
                pass
            return await TutorService._build_reply(
                session_id, meta,
                "No spiral review items due right now. Type 'flashcards' for quick practice, "
                "or 'test me' to check your current topic.",
                "spiral_review", db
            )

        # Glossary browse — "glossary" / "list terms" / "key terms"
        if any(w in lower for w in ["glossary", "list terms", "key terms", "all terms",
                                     "browse terms", "vocabulary", "show terms"]):
            try:
                glossary_text = await notes_service.get_glossary_for_node(db, meta.get("node_id", ""))
                if glossary_text:
                    return await TutorService._build_reply(
                        session_id, meta, f"**Glossary for this topic**\n\n{glossary_text}",
                        "glossary", db
                    )
            except Exception:
                pass
            return await TutorService._build_reply(
                session_id, meta,
                "No glossary available for this topic. Type a term name to look it up, "
                "or 'flashcards' for key concepts.",
                "glossary", db
            )

        # Progress visibility — "what have I learned" / "my progress" / "what do I know"
        if any(w in lower for w in ["what have i learned", "my progress", "what do i know",
                                     "what have i mastered", "show my progress",
                                     "what have i studied", "what am i good at"]):
            progress_content = await TutorService._handle_progress_check(db, meta)
            if progress_content:
                return await TutorService._build_reply(session_id, meta, progress_content, "progress_check", db)

        # Layer 1: Intent keyword matching
        reply_content, reply_type = TutorService._handle_intent(message, enrichment)
        if reply_content:
            # Handle Socratic start — set up chunked teaching
            if reply_type == "socratic_start":
                # If already in Socratic phase with chunks, resume from current position
                # unless the student explicitly asked to restart
                existing_chunks = meta.get("socratic_chunks", [])
                existing_current = meta.get("socratic_current", -1)
                if (existing_chunks and existing_current >= 0
                        and meta.get("phase") == "socratic"
                        and lower not in ("restart", "start over", "begin again")):
                    # Resume from current chunk — don't restart from 0
                    chunk = existing_chunks[existing_current]
                    content = chunk["content"]
                    if chunk.get("checkpoint_question"):
                        content += f"\n\n---\n\n**Checkpoint:** {chunk['checkpoint_question']}\n\nType your answer, or 'next' to skip:"
                    return await TutorService._build_reply(
                        session_id, meta, content, "socratic_resume", db
                    )
                chunks = chunk_walkthrough(enrichment.text_walkthrough or "")
                if chunks:
                    # Store chunks as dicts in meta
                    meta["socratic_chunks"] = [
                        {
                            "index": c.index,
                            "content": c.content,
                            "checkpoint_question": c.checkpoint_question,
                            "checkpoint_answer_keywords": c.checkpoint_answer_keywords,
                            "is_last": c.is_last,
                        }
                        for c in chunks
                    ]
                    meta["socratic_current"] = 0
                    meta["phase"] = "socratic"
                    first = chunks[0]
                    content = first.content
                    if first.checkpoint_question:
                        content += f"\n\n---\n\n**Checkpoint:** {first.checkpoint_question}\n\nType your answer, or 'next' to skip:"
                    return await TutorService._build_reply(
                        session_id, meta, content, "socratic_start", db
                    )
                else:
                    # No walkthrough — fall back to definition
                    content = enrichment.definition or "Walkthrough not available for this topic."
                    return await TutorService._build_reply(
                        session_id, meta, content, "walkthrough", db
                    )
            # Handle diagnostic start — set phase and current question
            if reply_type == "diagnostic_start":
                meta["phase"] = "diagnostic"
                meta["diag_current_q"] = 1
                meta["diag_answers"] = {}
                meta["diag_results"] = {}
                meta["diag_failed"] = []
                meta["diag_total_questions"] = len(enrichment.diagnostic_questions or [])
            # Handle remediation trigger
            elif reply_type == "remediation_trigger":
                return await TutorService._start_remediation(session_id, meta, db)
            # Handle solver trigger — connect to structured solver
            elif reply_type == "solver_trigger":
                return await TutorService._start_solver(session_id, meta, enrichment, db)
            # Handle vocabulary trigger — use glossary first
            elif reply_type == "vocab_trigger":
                term = reply_content.split(":", 1)[1] if ":" in reply_content else ""
                node_id = meta.get("node_id", "")
                glossary_result = await notes_service.get_glossary_term(db, node_id, term)
                if glossary_result:
                    content = notes_service._clean_internal_ids(glossary_result)
                    return await TutorService._build_reply(session_id, meta, content, "vocabulary", db)
                # Term isn't in this node's glossary. If the term is also
                # unrelated to the node (no lexical overlap with title/
                # definition), dumping the node definition would be wrong —
                # e.g. "what is the capital of France" must NOT answer with
                # the chromosome section. Try the LLM; it answers from
                # enrichment context or honestly declines off-topic asks.
                if not TutorService._term_in_node(term, enrichment):
                    llm_reply = await TutorService._try_llm_reply(
                        session_id, meta, enrichment, term, db
                    )
                    if llm_reply:
                        return llm_reply
                    return await TutorService._build_reply(
                        session_id, meta,
                        f"I couldn't find '{term}' in this topic's glossary. "
                        f"Try asking about **{enrichment.title}** or say "
                        "'explain' / 'test me'.",
                        "vocabulary", db,
                    )
                # Related term, glossary miss → serve the node definition.
                content = enrichment.definition or f"I could not find '{term}' in the glossary."
                return await TutorService._build_reply(session_id, meta, content, "vocabulary", db)
            # Handle notes-based triggers — fetch from dedicated note files
            elif reply_type == "misconceptions_trigger":
                return await TutorService._handle_notes(session_id, meta, enrichment, db, "misconceptions")
            elif reply_type == "silly_mistakes_trigger":
                return await TutorService._handle_notes(session_id, meta, enrichment, db, "silly_mistakes")
            elif reply_type == "worked_examples_trigger":
                return await TutorService._handle_notes(session_id, meta, enrichment, db, "worked_examples")
            elif reply_type == "guided_practice_trigger":
                return await TutorService._handle_guided_practice(session_id, meta, enrichment, db)
            elif reply_type == "full_solution_trigger":
                # Show the full worked example with substitution and answer
                node_id = meta.get("node_id", "")
                keywords = await notes_service.get_topic_keywords(db, node_id)
                content = await notes_service.get_worked_examples(db, node_id, keywords, guided=False)
                if content:
                    content = notes_service._clean_internal_ids(content)
                    content = f"**Full Worked Solution**\n\n{content}"
                else:
                    content = "No worked solution available. Try 'example' to see a guided version."
                return await TutorService._build_reply(session_id, meta, content, "full_solution", db)
            elif reply_type == "formula_trigger":
                return await TutorService._handle_notes(session_id, meta, enrichment, db, "formula")
            elif reply_type == "revision_trigger":
                return await TutorService._handle_notes(session_id, meta, enrichment, db, "revision")
            elif reply_type == "quick_revision_trigger":
                return await TutorService._handle_notes(session_id, meta, enrichment, db, "quick_revision")
            elif reply_type == "flashcard_trigger":
                return await TutorService._handle_flashcards(session_id, meta, enrichment, db)
            elif reply_type == "exam_tips_trigger":
                return await TutorService._handle_notes(session_id, meta, enrichment, db, "exam_tips")
            elif reply_type == "real_world_trigger":
                return await TutorService._handle_notes(session_id, meta, enrichment, db, "real_world")
            elif reply_type == "solution_template_trigger":
                return await TutorService._handle_notes(session_id, meta, enrichment, db, "solution_template")
            # Handle drill trigger
            elif reply_type == "drill_trigger":
                return await TutorService._start_drill(session_id, meta, enrichment, db)
            # Handle hint trigger — provide a hint for the current context
            elif reply_type == "hint_trigger":
                # If in Socratic mode, give a Socratic hint
                if meta.get("phase") == "socratic":
                    current = meta.get("socratic_current", -1)
                    chunks = meta.get("socratic_chunks", [])
                    if 0 <= current < len(chunks):
                        chunk = chunks[current]
                        keywords = chunk.get("checkpoint_answer_keywords", [])
                        if keywords:
                            hint = f"**Hint:** Think about {keywords[0]}. "
                            if len(keywords) > 1:
                                hint += f"Also consider {keywords[1]}."
                            return await TutorService._build_reply(session_id, meta, hint, "hint", db)
                # If in diagnostic mode, give a diagnostic hint
                if meta.get("phase") == "diagnostic":
                    q_num = meta.get("diag_current_q", 0)
                    hint_level = meta.get("hint_levels", {}).get(str(q_num), 0)
                    if hint_level < 3:
                        hint_level += 1
                        meta.setdefault("hint_levels", {})[str(q_num)] = hint_level
                        hint = build_hint(hint_level, q_num, enrichment)
                        return await TutorService._build_reply(session_id, meta, hint, "hint", db)
                # Default hint — suggest looking at ELI5 or walkthrough
                content = "Here's a tip: type 'simplify' for a simpler explanation, or 'walkthrough' for a step-by-step guide."
                return await TutorService._build_reply(session_id, meta, content, "hint", db)
            # Handle retry trigger — retest the first failed question
            elif reply_type == "diagnostic_retry_trigger":
                failed = meta.get("diag_failed", [])
                if failed:
                    q_num = failed[0]
                    diag = enrichment.diagnostic_questions or []
                    q = next((d for d in diag if d.get("number") == q_num), None)
                    if q:
                        meta["phase"] = "diagnostic"
                        meta["diag_current_q"] = q_num
                        content = (
                            f"**Retrying Question {q_num}** ({q.get('cognitive_type', '')}):\n\n"
                            f"{q.get('question', '')}\n\n"
                            f"Type your answer:"
                        )
                        return await TutorService._build_reply(session_id, meta, content, "diagnostic_retry", db)
                return await TutorService._build_reply(
                    session_id, meta, "No failed questions to retry. Type 'test me' to start a new diagnostic.", "info", db
                )
            return await TutorService._build_reply(session_id, meta, reply_content, reply_type, db)

        # Layer 1.4 — PENDING VALUE-CONFIRM: when the last solution came
        # from the structure lane, the read-back card stashes the parse
        # here.  The student can confirm it, or correct a value
        # ('angle is 30 not 60') and the SAME deterministic compute
        # re-runs on their numbers — no re-extraction, no LLM.
        def _understood_card(u: dict, msg: str, m: dict,
                             gated: bool = False) -> str:
            """Render the structure-lane read-back: 'as per the question,
            <givens> — we have to find <ask>'.  gated=True (LLM path) asks
            for approval BEFORE computing; gated=False (verified path)
            shows the values the solve used so the student can flag a
            mis-parse.  Either way the pending card is stashed so a
            'no'/'<role> is N' turn recomputes deterministically."""
            givens = u.get("givens") or {}
            if not givens:
                return ""

            def _fmt_g(k, v):
                if isinstance(v, dict):
                    vv = v.get("value")
                    uu = v.get("unit") or ""
                    return f"**{k}** = {vv}{(' ' + uu) if uu else ''}"
                return f"**{k}** = {v}"

            given_lines = ",  ".join(_fmt_g(k, v) for k, v in givens.items())
            ask_phrase = (u.get("ask") or "").strip() or "the final answer"
            flat = {k: (v.get("value") if isinstance(v, dict) else v)
                    for k, v in givens.items()}
            m["pending_understood"] = {
                "structure": u.get("structure"), "slots": flat,
                "text": msg[:1500],
                "code": u.get("code"),      # PAL_PROGRAM rides along
                "plan": u.get("plan"),
                "flows": u.get("flows"),    # declared signed flows
                "start": u.get("start"),    # declared starting total
                "already_solved": not gated}
            # data-coverage honesty: numbers in the question the parse
            # never bound get called out on the card — 'unused' values
            # are how a wrong model hides (g=10 ignored, base amount
            # ignored).  Computed HERE against the flat givens actually
            # shown — never against an earlier/empty parse snapshot
            # (that double-vision flagged the used perimeter '100' as
            # unused live).
            bound_vals = set()
            for v in flat.values():
                try:
                    bound_vals.add(round(float(v), 6))
                except (TypeError, ValueError):
                    pass
            unused = []
            for x in dict.fromkeys(
                    re.findall(r"(?<![\w.])\d+(?:\.\d+)?(?![\w.])",
                               msg or "")):
                try:
                    if round(float(x), 6) not in bound_vals:
                        unused.append(x)
                except ValueError:
                    pass
            unused = unused[:8]
            unused_note = (f"  *(I did not use these numbers: "
                           f"{', '.join(unused)} — tell me if they "
                           f"matter.)*" if unused else "")
            # declared-flow restatement: each quantity's direction as
            # the parse understands it ('sold pens → +30').  A wrong
            # direction is readable here — this is the semantic
            # double-check the student actually confirms.
            flow_lines = ""
            for fl in (u.get("flows") or []):
                if isinstance(fl, dict) and fl.get("source"):
                    flow_lines += (
                        f"\n  • {fl['source']} → "
                        f"{fl.get('sign', '?')}{fl.get('value', '?')}"
                        f"  ({fl.get('why', '')})")
            if gated:
                return (f"As per the question, it seems {given_lines} — "
                        f"so what we have to find is **{ask_phrase}**."
                        + flow_lines + unused_note +
                        "  Is that correct? If not, tell me the right "
                        "values (e.g. 'speed is 60').")
            return (f"_Reading: {given_lines} — asked for "
                    f"{ask_phrase}.  If a value looks off, say e.g. "
                    f"'{next(iter(flat), 'speed')} is 30'._\n\n")

        def _run_pending_compute(pending: dict,
                                 edits: dict | None = None):
            """Confirm-turn compute: PAL_PROGRAM runs its sandboxed code
            (edits patch the bound values inside it); everything else
            reruns the structure spec via solve_with_slots."""
            if pending.get("structure") == "PAL_PROGRAM" and \
                    pending.get("code"):
                code = pending["code"]
                if edits:
                    # patch the bound values inside the program.  The
                    # LLM's variable names may differ from the givens
                    # keys (student edits 'speed', code binds 'v'), so:
                    # (1) try the named line '<role> = <old>',
                    # (2) else patch the UNIQUE literal assignment
                    #     '<var> = <old>' — only when old_num appears
                    #     exactly once as an RHS literal,
                    # (3) if nothing changed, refuse rather than
                    #     recompute on stale values.
                    for role, new_v in edits.items():
                        old = (pending.get("slots") or {}).get(role)
                        if old is None:
                            continue
                        old_m = re.search(r"-?\d+(?:\.\d+)?",
                                          str(old))
                        old_num = old_m.group(0) if old_m else \
                            str(old)
                        patched = re.sub(
                            rf"(?m)^(\s*{re.escape(role)}\s*=\s*)"
                            rf"{re.escape(old_num)}\b",
                            rf"\g<1>{new_v}", code)
                        if patched == code:
                            lit = re.findall(
                                rf"(?m)^(\s*\w+\s*=\s*)"
                                rf"{re.escape(old_num)}\b\s*$",
                                code)
                            if len(lit) == 1:
                                patched = re.sub(
                                    rf"(?m)^(\s*\w+\s*=\s*)"
                                    rf"{re.escape(old_num)}\b\s*$",
                                    rf"\g<1>{new_v}", code)
                        if patched == code:
                            return None  # couldn't apply the edit
                        code = patched
                try:
                    from backend.its.solver.pal_executor import \
                        run_program
                    ran = run_program(code)
                except Exception:
                    ran = None
                if ran is None:
                    return None
                # declared-semantics gate: the confirmed card's program
                # must agree with its own declared flow directions —
                # a contradiction ships nothing
                try:
                    from backend.its.solver.semantic_check import \
                        verify_pal_consistency
                    ok_v, why_v = verify_pal_consistency(
                        pending.get("text") or "", pending,
                        ran.get("numeric"))
                    if not ok_v:
                        try:
                            from backend.its.solver.contract import \
                                log_lane_exception
                            log_lane_exception(
                                "pal_semantic_card",
                                Exception(str(why_v)))
                        except Exception:
                            pass
                        return None
                except Exception:
                    pass
                return {"steps": pending.get("plan") or [],
                        "answer": ran["answer_text"]}
            # TEXT-REWRITE recompute: edited slots patched straight into
            # the original question text ('64' -> '120'), then the whole
            # pipeline re-runs on the corrected question.  Handles every
            # lane uniformly — full-text specs re-parse anyway, kernels
            # aren't in STRUCTURE_SPECS at all — so solve_with_slots'
            # 'square P' keys can never map back.  Refuses when an edit
            # didn't actually change the text.
            if edits:
                text2 = pending.get("text") or ""
                for role, new_v in edits.items():
                    old = (pending.get("slots") or {}).get(role)
                    if old is None:
                        continue
                    old_m = re.search(r"-?\d+(?:\.\d+)?", str(old))
                    if not old_m:
                        continue
                    old_num = old_m.group(0)
                    # edit_map carries EVERY slot at final value — skip
                    # unchanged entries; patching 300->300 yields the
                    # same string and would false-refuse below
                    try:
                        if abs(float(new_v) - float(old_num)) < 1e-9:
                            continue
                    except (TypeError, ValueError):
                        pass
                    # slots store floats — '64.0' never matches the
                    # text's '64'; try the int form first, then the
                    # literal form
                    variants = []
                    try:
                        f = float(old_num)
                        variants.append(
                            f"{f:g}" if f == int(f) else old_num)
                    except ValueError:
                        pass
                    variants.append(old_num)
                    new_s = (f"{float(new_v):g}"
                             if isinstance(new_v, (int, float))
                             else str(new_v))
                    done = False
                    for cand in variants:
                        patched = re.sub(
                            rf"(?<![\d.]){re.escape(cand)}(?![\d.])",
                            new_s, text2, count=1)
                        if patched != text2:
                            text2 = patched
                            done = True
                            break
                    if not done:
                        return None
                try:
                    from backend.its.solver.answer_pipeline import (
                        answer as _ans)
                    r2 = _ans(text2, meta.get("node_id"),
                              defer_llm=True)
                    if r2 is not None and r2.label.startswith("VERIFIED") \
                            and r2.answer:
                        return {"steps": r2.steps or [],
                                "answer": r2.answer}
                    return None
                except Exception as _e:
                    try:
                        from backend.its.solver.contract import \
                            log_lane_exception
                        log_lane_exception("edit_recompute", _e)
                    except Exception:
                        pass
                    return None
            try:
                from backend.its.solver.structure_families import \
                    solve_with_slots
                got = solve_with_slots(
                    pending["structure"],
                    dict(pending.get("slots") or {}),
                    pending.get("text") or "")
                if got is not None:
                    return got
            except Exception:
                pass
            # structure id isn't a live spec (lane tags like 'S', cached
            # extractor ids) — re-run the full pipeline on the original
            # question text instead of refusing
            try:
                from backend.its.solver.answer_pipeline import (
                    answer as _ans)
                r2 = _ans(pending.get("text") or "",
                          meta.get("node_id"), defer_llm=True)
                if r2 is not None and r2.label.startswith("VERIFIED") \
                        and r2.answer:
                    return {"steps": r2.steps or [],
                            "answer": r2.answer}
            except Exception as _e:
                try:
                    from backend.its.solver.contract import \
                        log_lane_exception
                    log_lane_exception("confirm_recompute", _e)
                except Exception:
                    pass
            return None

        # Layer 1.3 — STAGED REVEAL: after a confirmed read-back computes,
        # the student chooses how much to see.  'hint'/'next' reveals one
        # step at a time (they produce the rest); 'full'/'answer' dumps
        # the worked solution.  Worked-example fading, session-simple.
        ps = meta.get("pending_solve")
        if ps:
            low_msg = message.lower().strip()
            # same new-question rule as the confirm card: an ask verb
            # means the student moved on — drop the staged reveal
            if len(low_msg) > 120 or re.search(
                    r"\b(find|solve|calculate|compute|determine|"
                    r"evaluate|prove|show\s+that|what\s+is|how\s+(?:"
                    r"much|many|long|far|high))\b", low_msg):
                meta["pending_solve"] = None
                ps = None
        if ps:
            steps = ps.get("steps") or []
            shown = int(ps.get("shown") or 0)
            n = len(steps)
            want_next = re.fullmatch(
                r"(hint|next|next step|continue|go on|more)[.!]?",
                low_msg)
            want_full = re.fullmatch(
                r"(full|full solution|answer|show answer|show all|"
                r"solution|solve)[.!]?", low_msg)
            if want_full:
                meta["pending_solve"] = None
                steps_text = "\n".join(f"• {s}" for s in steps)
                return await TutorService._build_reply(
                    session_id, meta,
                    f"**Answer:** {ps['answer']}\n\n{steps_text}\n\n"
                    "_verified deterministically — now tell me which "
                    "step you want me to explain deeper._",
                    "solution", db)
            if want_next:
                if shown < n:
                    step_no = shown + 1
                    ps["shown"] = step_no
                    remaining = n - step_no
                    tail = (f"\n\n_{remaining} step(s) left — try this "
                            f"one yourself first, then say 'next' "
                            f"(or 'full' for everything)._" if remaining
                            else "\n\n_That was the last step — say "
                                 "'full' to see the final answer._")
                    return await TutorService._build_reply(
                        session_id, meta,
                        f"**Step {step_no} of {n}:**  "
                        f"{steps[shown]}{tail}",
                        "hint_step", db)
                meta["pending_solve"] = None
                steps_text = "\n".join(f"• {s}" for s in steps)
                return await TutorService._build_reply(
                    session_id, meta,
                    f"**Answer:** {ps['answer']}\n\n{steps_text}\n\n"
                    "_verified deterministically_",
                    "solution", db)
            meta["pending_solve"] = None  # new question; drop

        pending = meta.get("pending_understood")
        if pending:
            low_msg = message.lower().strip()
            # only short turns are confirmation/correction replies — a
            # long message, or ANY message carrying its own ask verb
            # ('find its side', 'solve for x'), is a NEW question, not
            # a card reply — drop the pending card and re-route.  Live
            # bug: 'perimeter of a square is 100 cm. find its side'
            # was eaten as an edit ('square is 100').
            if len(low_msg) > 120 or re.search(
                    r"\b(find|solve|calculate|compute|determine|"
                    r"evaluate|prove|show\s+that|what\s+is|how\s+(?:"
                    r"much|many|long|far|high))\b", low_msg):
                meta["pending_understood"] = None
                pending = None
        if pending:
            edits = re.findall(
                r"(?:change|set|use|make|take|correct)?\s*(?:the\s+)?"
                r"([a-z_]{2,})\s*(?:to|=|as|is|should be|is actually)\s*"
                r"(-?\d+(?:\.\d+)?)", low_msg)
            # verb-driven form: 'use angle 30', 'take height 50'
            edits += re.findall(
                r"(?:use|take|set|make|change|keep)\s+(?:the\s+)?"
                r"([a-z_]{2,})\s+(?:at\s+|to\s+|=)?\s*"
                r"(-?\d+(?:\.\d+)?)", low_msg)
            # single-letter roles: 'P is 120', 'r = 5' — the {2,}
            # patterns above silently miss them (live bug: 'no, P is
            # 120' fell through to the generic fallback)
            edits += [m for m in re.findall(
                r"(?<![a-z_])([a-z])\s*(?:is|=|to|be)\s*"
                r"(-?\d+(?:\.\d+)?)", low_msg)
                if m[0] not in ("i", "a", "e", "x", "y", "z")]
            edits = list(dict.fromkeys(edits))  # overlapping patterns
            confirm = re.fullmatch(
                r"(yes|correct|right|ok|okay|confirm|sure|exactly|yep|"
                r"that's right|thats right|haan|haan ji)[.!]?", low_msg)
            reject = re.fullmatch(
                r"(no|nope|wrong|not correct|incorrect|nahi|galat)[.!]?",
                low_msg)
            if reject:
                # keep pending — ask the student to fit in the values
                known = ", ".join(
                    f"'{k}'" for k in (pending.get("slots") or {})) or \
                    "the values"
                return await TutorService._build_reply(
                    session_id, meta,
                    "Tell me the right values then — for example "
                    f"'{next(iter(pending.get('slots') or {'value': None}), 'value')} "
                    f"is 30'.  I know these slots: {known}.",
                    "await_correction", db)
            if edits:
                slots = dict(pending.get("slots") or {})
                applied = []
                for role, val_s in edits:
                    val = float(val_s)
                    target = next((k for k in slots
                                   if k.lower() == role or
                                   k.lower().startswith(role) or
                                   role in k.lower()), None)
                    if target:
                        slots[target] = val
                        applied.append(f"{target} = {val:g}")
                if applied:
                    edit_map = dict(pending.get("slots") or {})
                    for role, val_s in edits:
                        tgt = next((k for k in edit_map
                                    if k.lower() == role or
                                    k.lower().startswith(role) or
                                    role in k.lower()), None)
                        if tgt:
                            edit_map[tgt] = float(val_s)
                    fixed = _run_pending_compute(pending,
                                                 edits=edit_map)
                    meta["pending_understood"] = None
                    if fixed:
                        meta["pending_solve"] = {
                            "steps": fixed["steps"] or [],
                            "answer": fixed["answer"], "shown": 0}
                        return await TutorService._build_reply(
                            session_id, meta,
                            f"Got it — {', '.join(applied)}. "
                            f"Recomputed on your values.  Try it with "
                            f"a **hint first**, or see the **full "
                            f"solution**?",
                            "offer_reveal", db)
                    reply_content = (
                        f"I tried {', '.join(applied)} but the "
                        f"calculation refused — those values may not "
                        f"fit this problem type. Check the question "
                        f"and tell me the values again?")
                    return await TutorService._build_reply(
                        session_id, meta, reply_content,
                        "confirm_failed", db)
                # named nothing we know — ask again, keep pending
                known = ", ".join(
                    f"'{k}'" for k in (pending.get("slots") or {}))
                return await TutorService._build_reply(
                    session_id, meta,
                    f"I couldn't map that to a value I read. "
                    f"These are the slots I know: {known} — "
                    f"tell me like 'speed is 60'.",
                    "await_correction", db)
            elif confirm:
                if pending.get("solved_answer"):
                    # gated verified card: the answer was held — ship it
                    # now that the student confirmed the read-back, and
                    # offer the staged reveal like any solved item
                    meta["pending_understood"] = None
                    meta["pending_solve"] = {
                        "steps": pending.get("solved_steps") or [],
                        "answer": pending["solved_answer"],
                        "shown": 0}
                    steps_txt = "\n".join(
                        f"• {s}" for s in (pending.get("solved_steps")
                                           or []))
                    return await TutorService._build_reply(
                        session_id, meta,
                        f"**Answer:** {pending['solved_answer']}\n\n"
                        + (steps_txt + "\n\n" if steps_txt else "")
                        + "_verified deterministically_",
                        "solution", db)
                if pending.get("already_solved"):
                    # verified-path card — answer already shown; 'yes'
                    # just closes the check, no recompute needed
                    meta["pending_understood"] = None
                    return await TutorService._build_reply(
                        session_id, meta,
                        "Confirmed — the solution stands.  Ask me to "
                        "explain any step and I'll break it down.",
                        "confirmed", db)
                # student approved the read-back — NOW compute on the
                # confirmed values, then let THEM pick the reveal depth
                fixed = _run_pending_compute(pending)
                meta["pending_understood"] = None
                if fixed:
                    meta["pending_solve"] = {
                        "steps": fixed["steps"] or [],
                        "answer": fixed["answer"], "shown": 0}
                    return await TutorService._build_reply(
                        session_id, meta,
                        "Confirmed.  Do you want to try it with a "
                        "**hint first** (I'll show one step at a time "
                        "and you work the rest), or the **full "
                        "solution** right away?",
                        "offer_reveal", db)
                return await TutorService._build_reply(
                    session_id, meta,
                    "The confirmed values didn't produce a clean "
                    "answer — can you repaste the question for me?",
                    "confirm_failed", db)
            # 'hint'/'full' on a pending card = implicit confirm + depth
            elif re.fullmatch(r"(hint|next|full|answer|show|solve)[.!]?",
                              low_msg):
                if pending.get("solved_answer"):
                    meta["pending_understood"] = None
                    meta["pending_solve"] = {
                        "steps": pending.get("solved_steps") or [],
                        "answer": pending["solved_answer"],
                        "shown": 0}
                    steps_txt = "\n".join(
                        f"• {s}" for s in (pending.get("solved_steps")
                                           or []))
                    return await TutorService._build_reply(
                        session_id, meta,
                        f"**Answer:** {pending['solved_answer']}\n\n"
                        + (steps_txt + "\n\n" if steps_txt else "")
                        + "_verified deterministically_",
                        "solution", db)
                if pending.get("already_solved"):
                    meta["pending_understood"] = None
                    return await TutorService._build_reply(
                        session_id, meta,
                        "The solution is above — tell me which step "
                        "you want explained and I'll break it down.",
                        "clarify", db)
                fixed = _run_pending_compute(pending)
                meta["pending_understood"] = None
                if not fixed:
                    return await TutorService._build_reply(
                        session_id, meta,
                        "The confirmed values didn't produce a clean "
                        "answer — can you repaste the question for me?",
                        "confirm_failed", db)
                meta["pending_solve"] = {
                    "steps": fixed["steps"] or [],
                    "answer": fixed["answer"], "shown": 0}
                steps_n = fixed["steps"] or []
                if low_msg in ("full", "answer", "show", "solve"):
                    meta["pending_solve"] = None
                    steps_text = "\n".join(f"• {s}" for s in steps_n)
                    return await TutorService._build_reply(
                        session_id, meta,
                        f"**Answer:** {fixed['answer']}\n\n"
                        f"{steps_text}\n\n_verified deterministically_",
                        "solution", db)
                ps_shown = steps_n[0] if steps_n else ""
                meta["pending_solve"]["shown"] = 1
                remaining = len(steps_n) - 1
                return await TutorService._build_reply(
                    session_id, meta,
                    f"**Step 1 of {len(steps_n)}:**  {ps_shown}\n\n"
                    f"_{remaining} step(s) left — try it yourself, "
                    f"then 'next' (or 'full' for everything)._",
                    "hint_step", db)
            else:
                meta["pending_understood"] = None  # new question; drop

        # Layer 1.5 — DETERMINISTIC PIPELINE FIRST (2026-10-02 audit fix:
        # the core promise).  The student's natural question now reaches the
        # verified solver chain — bank official keys, node-grounded content,
        # exact kernels, families, dimensional signatures — BEFORE any
        # template matcher declines and before the LLM fallback ever fires.
        # Only a VERIFIED* tier answers here; everything else (guided,
        # ambiguous, timeout, saturated) falls through to the layers below,
        # so the LLM stays the LAST resort, never the default.
        try:
            # Tier-0: 10/10 Cross-Subject Cognitive Engine (Maths Zenith, Chemistry Quartic, Biology AR, Commerce, Humanities)
            from backend.its.solver.deterministic_service import solve_deterministically
            tier0_res = solve_deterministically(message, subject=subject, class_level=class_level)
            if tier0_res and isinstance(tier0_res, dict) and tier0_res.get("status") == "verified" and tier0_res.get("answer"):
                steps_text = "\n".join(f"• {s}" for s in (tier0_res.get("steps") or []))
                audit = tier0_res.get("audit") or {}
                lane = audit.get("lane") or tier0_res.get("verification", {}).get("label", "deterministic_zenith")
                # same read-back gate as the pipeline branch: parse the
                # used givens out of the steps ('P = 64' before '->') and
                # hold the answer behind a 'correct?' card so a mis-parse
                # never ships unconfirmed
                synth = {}
                for head in [str(s).split("->")[0]
                             for s in (tier0_res.get("steps") or [])[:1]]:
                    for mm in re.finditer(
                            r"([A-Za-z_][A-Za-z _%]{0,14}?)\s*=\s*"
                            r"(-?\d+(?:\.\d+)?)", head):
                        k = mm.group(1).strip()
                        if k.lower() not in ("answer", "e", "i") \
                                and len(synth) < 8:
                            synth[k] = float(mm.group(2))
                if synth:
                    card = _understood_card(
                        {"structure": lane,
                         "structure_label": "Deterministic solve",
                         "givens": synth,
                         "ask": ""},
                        message, meta, gated=True)
                    pend = meta.get("pending_understood") or {}
                    pend["solved_answer"] = tier0_res["answer"]
                    pend["solved_steps"] = list(
                        tier0_res.get("steps") or [])
                    meta["pending_understood"] = pend
                    return await TutorService._build_reply(
                        session_id, meta, card, "confirm_values", db)
                reply_content = (
                    f"**Answer:** {tier0_res['answer']}\n\n"
                    + (f"**Derivation:**\n{steps_text}\n\n" if steps_text else "")
                    + f"_verified deterministically via {lane}_"
                )
                return await TutorService._build_reply(
                    session_id, meta, reply_content, "solution", db
                )
        except Exception:
            pass

        try:
            from backend.services.solve_isolation import cache_key, run_async
            from backend.its.solver.answer_pipeline import (
                answer as pipeline_answer)

            outcome = await run_async(
                cache_key("tutor.det.nollm", message),
                pipeline_answer, message, node_id or None,
                defer_llm=True)
            if (outcome.result is not None
                    and outcome.result.label.startswith("VERIFIED")
                    and outcome.result.answer):
                r = outcome.result
                steps_text = "\n".join(f"• {s}" for s in (r.steps or []))
                # Every structure-lane solve (LLM OR binder) carries a
                # parsed read-back.  GATE the answer on it: wrong-verify
                # live bugs (projectile read as s=vt, multi-trade read
                # as CP/SP) all shipped because the card and the answer
                # arrived in the SAME message — the student saw the
                # mis-parse only after the wrong answer.  Now: card
                # first, answer on 'yes'; 'no'/edits recompute the spec
                # deterministically.  Lanes with no parsed givens
                # (exact kernels, memo, corpus) still ship directly —
                # there is nothing to mis-read.
                u = (r.socratic or {}).get("understood") or {}
                # full-text specs (PROFIT_LOSS, percent, geometry)
                # parse values internally and report empty givens —
                # the same specs that wrong-verify most.  Synthesise
                # the givens from 'key = value' assignments inside the
                # verified steps so the gate still has values to read
                # back to the student.
                if not u.get("givens"):
                    synth = {}
                    # only the FIRST step's input side — that's where
                    # givens get bound ('CP = 240, SP = 300'); later
                    # steps assign computed values (profit = 60) which
                    # must never appear on the read-back as 'givens'
                    heads = [str(s).split("->")[0]
                             for s in (r.steps or [])[:1]]
                    for head in heads:
                        for mm in re.finditer(
                                r"([A-Za-z_][A-Za-z _%]{0,14}?)\s*=\s*"
                                r"(-?\d+(?:\.\d+)?)", head):
                            k = mm.group(1).strip()
                            if k.lower() not in ("answer", "e", "i") \
                                    and len(synth) < 8:
                                synth[k] = float(mm.group(2))
                    if synth:
                        u = dict(u)
                        u["givens"] = synth
                        u.setdefault("structure",
                                     getattr(r.socratic, "structure",
                                             None) or
                                     (u.get("structure") or "steps"))
                if u.get("givens"):
                    card = _understood_card(u, message, meta, gated=True)
                    pend = meta.get("pending_understood") or {}
                    # stash the already-computed answer: on 'yes' the
                    # verified result ships without recomputing; on
                    # edits the spec recomputes from corrected slots
                    pend["solved_answer"] = r.answer
                    pend["solved_steps"] = list(r.steps or [])
                    pend["solved_numeric"] = r.numeric
                    meta["pending_understood"] = pend
                    return await TutorService._build_reply(
                        session_id, meta, card, "confirm_values", db)
                reply_content = (
                    f"**Answer:** {r.answer}\n\n"
                    + (f"{steps_text}\n\n" if steps_text else "")
                    + "_verified deterministically"
                    + (f" ({r.audit.anchor})" if r.audit and r.audit.anchor
                       else "") + "_")
                return await TutorService._build_reply(
                    session_id, meta, reply_content, "solution", db
                )
            # Deterministic layers declined -> the LLM parses the
            # question into {structure, values-with-units, ask} and the
            # STUDENT cross-checks it before any compute runs.  Only
            # extraction happens here; the math waits for 'yes'.
            if not (outcome.result is not None
                    and outcome.result.label.startswith("VERIFIED")):
                try:
                    from backend.its.solver.structure_extractor import \
                        extract_slots
                    ex = extract_slots(message)
                except Exception:
                    ex = None
                if ex and ex.get("structure") and ex.get("slots"):
                    card = _understood_card(
                        {"structure": ex["structure"],
                         "givens": ex.get("slots_rich") or ex["slots"],
                         "ask": ex.get("ask") or ""},
                        message, meta, gated=True)
                    return await TutorService._build_reply(
                        session_id, meta, card, "confirm_values", db)
                # No registered spec fits -> PAL: the LLM writes a
                # computation PROGRAM (composite questions have no slot
                # map).  The card shows givens + plan; the sandbox runs
                # the code only on 'yes'.
                try:
                    from backend.its.solver.structure_extractor import \
                        extract_program
                    prog = extract_program(message)
                except Exception:
                    prog = None
                if prog and prog.get("code"):
                    plan_lines = "\n".join(
                        f"  {i + 1}. {s}"
                        for i, s in enumerate(prog.get("plan") or []))
                    card = _understood_card(
                        {"structure": "PAL_PROGRAM",
                         "structure_label": "Planned computation",
                         "givens": prog.get("givens") or {},
                         "ask": prog.get("ask") or "",
                         "plan": prog.get("plan") or [],
                         "flows": prog.get("flows") or [],
                         "start": prog.get("start"),
                         "code": prog.get("code")},
                        message, meta, gated=True)
                    if plan_lines:
                        card += ("\n\n**How I'll compute it:**\n"
                                 + plan_lines)
                    return await TutorService._build_reply(
                        session_id, meta, card, "confirm_values", db)
                # extractor found nothing -> honest fall-through
        except Exception:
            pass  # deterministic layer unavailable — fall through honestly

        # Layer 2: Numerical problem → compute engine (SymPy) then template engine
        compute = ComputeEngine.attempt(message)
        if compute and compute.matched:
            steps_text = "\n".join(f"• {s}" for s in compute.steps)
            reply_content = f"**Solution:**\n\n{steps_text}\n\n**Answer:** {compute.answer}"
            return await TutorService._build_reply(
                session_id, meta, reply_content, compute.question_type, db
            )

        if TemplateEngine.detect_numerical(message):
            solution = TemplateEngine.solve(message, subject=subject)
            if solution and solution.matched:
                reply_content = TutorService._format_solution(solution)
                return await TutorService._build_reply(
                    session_id, meta, reply_content, "solution", db
                )

        # Layer 3: Context-based — check if question is about current node
        if enrichment:
            reply_content, reply_type = TutorService._search_within_node(message, enrichment)
            if reply_content:
                return await TutorService._build_reply(
                    session_id, meta, reply_content, reply_type, db
                )

        # Layer 4: Route to a different node
        try:
            route = await RoutingService.route(
                db, message,
                current_node_id=node_id,
                subject_filter=subject,
                class_filter=class_level,
            )
            if route is None:
                # No match found — give a subject-aware helpful response
                _SUBJ_EXAMPLES = {
                    "maths": "try 'What is the quadratic formula?' or 'Explain the Pythagorean theorem'",
                    "math": "try 'What is the quadratic formula?' or 'Explain the Pythagorean theorem'",
                    "physics": "try 'What is Newton's second law?' or 'Explain electric current'",
                    "phy": "try 'What is Newton's second law?' or 'Explain electric current'",
                    "chem": "try 'What is Raoult's law?' or 'Explain chemical bonding'",
                    "chemistry": "try 'What is Raoult's law?' or 'Explain chemical bonding'",
                    "bio": "try 'What is photosynthesis?' or 'Explain mitosis'",
                    "biology": "try 'What is photosynthesis?' or 'Explain mitosis'",
                }
                example = _SUBJ_EXAMPLES.get(subject.lower(), "try asking about a specific concept")
                reply_content = (
                    f"I'm not sure which topic that question is about. "
                    f"Could you rephrase it? For example, {example}. "
                    f"You can also type 'walkthrough', 'test me', 'flashcards', or 'help'."
                )
                return await TutorService._build_reply(
                    session_id, meta, reply_content, "no_match", db
                )
            if route.node_id != node_id:
                # The question is about a different node
                other_result = await db.execute(
                    select(EnrichmentContent).where(
                        EnrichmentContent.node_id == route.node_id
                    )
                )
                other_enrichment = other_result.scalar_one_or_none()
                if other_enrichment:
                    field_value = getattr(other_enrichment, route.field, None) or ""
                    # Don't render lists/dicts as raw Python repr
                    if isinstance(field_value, (list, dict)):
                        field_value = ""
                    if field_value and isinstance(field_value, str):
                        reply_content = (
                            f"This seems to be about **{other_enrichment.title}** "
                            f"(a related topic).\n\n{field_value[:500]}\n\n"
                            f"Would you like to study this topic in full? "
                            f"Or shall we continue with **{enrichment.title}**?"
                        )
                        return await TutorService._build_reply(
                            session_id, meta, reply_content, "related_topic", db
                        )
        except Exception:
            pass  # Fall through to LLM

        # Layer 5: LLM fallback — answers the student's actual question
        # using only the node's enrichment content as grounding.
        llm_reply = await TutorService._try_llm_reply(
            session_id, meta, enrichment, message, db
        )
        if llm_reply:
            return llm_reply

        # Bare confirm/reject/depth words with nothing pending: the
        # answer already shipped (no card was needed), so these are
        # acknowledgements — nudge toward the next move instead of
        # acting like the question failed.
        if re.fullmatch(
                r"(yes|yeah|yep|ok|okay|no|nope|hint|next|full|answer|"
                r"show|solve)[.!]?", message.lower().strip()):
            reply_content = (
                "That's settled — want me to **explain any step**, "
                "show a **mistake-check**, or do you have the **next "
                "question**?")
            return await TutorService._build_reply(
                session_id, meta, reply_content, "clarify", db)

        # Absolute fallback
        reply_content = (
            "I'm not sure about that specific question. "
            "Try asking me to 'explain', 'simplify', 'walkthrough', "
            "'show mistakes', or 'test me' on this topic."
        )
        return await TutorService._build_reply(
            session_id, meta, reply_content, "fallback", db
        )

    # ------------------------------------------------------------------ #
    # LLM helpers
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _try_llm_reply(
        session_id: str, meta: dict,
        enrichment: Optional[EnrichmentContent],
        message: str, db: AsyncSession,
    ) -> Optional[dict]:
        """Layer-5 LLM reply grounded in the node's enrichment content.

        Returns a built reply dict on success, None when the LLM is
        unavailable or returns an error marker — caller falls back."""
        if not enrichment:
            return None
        try:
            llm = get_llm_client()
            context_parts = []
            if enrichment.definition:
                context_parts.append(f"Definition: {enrichment.definition[:800]}")
            if enrichment.text_walkthrough:
                # trim: first token latency scales with prompt size — the
                # walkthrough's middle is rarely needed for a doubt answer
                wt = enrichment.text_walkthrough
                context_parts.append(
                    f"Walkthrough: {wt[:1200]}{'...' if len(wt) > 1200 else ''}")
            if enrichment.eli5:
                context_parts.append(f"Simple explanation: {enrichment.eli5[:400]}")
            context = "\n\n".join(context_parts)
            llm_reply = await llm.answer_with_context(
                question=message,
                enrichment_content=context,
                scope_boundary=enrichment.scope_boundary or "",
            )
            if llm_reply and not llm_reply.startswith("[LLM"):
                # HONEST LABELING (2026-10-02 audit): this tier is an
                # unverified LLM answer grounded in lesson notes — the
                # student must be able to tell it apart from a verified
                # deterministic solution.
                llm_reply = (llm_reply.rstrip()
                             + "\n\n_AI-generated from this lesson's notes "
                             "-- helpful, but not a verified solution._")
                return await TutorService._build_reply(
                    session_id, meta, llm_reply, "llm_fallback", db
                )
        except Exception as exc:
            logging.getLogger(__name__).warning("LLM tutor fallback failed: %s", exc)
        return None

    @staticmethod
    def _term_in_node(term: str, enrichment: EnrichmentContent) -> bool:
        """True when any content word of `term` appears in the node's
        title/definition — guards 'what is X' from serving this node's
        definition for an unrelated X."""
        stop = {"the", "a", "an", "of", "is", "in", "on", "for", "to",
                "and", "or", "do", "does", "what", "why", "how"}
        words = [w for w in re.sub(r"[^a-z0-9 ]", " ", term.lower()).split()
                 if w not in stop and len(w) > 2]
        if not words:
            return True  # nothing to match on — don't punish
        haystack = " ".join([
            enrichment.title or "",
            enrichment.definition or "",
        ]).lower()
        return any(w in haystack for w in words)

    # ------------------------------------------------------------------ #
    # Quick question — no session required
    # ------------------------------------------------------------------ #
    @staticmethod
    async def quick_question(
        db: AsyncSession, message: str, subject: Optional[str] = None, class_level: Optional[int] = None
    ) -> dict:
        """Answer a free-text question without requiring a tutor session.

        Routes the question to the best matching enrichment node and serves
        the appropriate field.  No session, no LLM — purely deterministic.
        """
        # Layer 0: Try compute engine FIRST for ALL questions.
        # Uses attempt_with_llm which tries deterministic solvers first,
        # then falls back to LLM-SymPy bridge for questions the regex
        # solvers can't handle. This handles ANY math question.
        _PURE_CONVERSATIONAL = ["hi", "hello", "hey", "thanks", "thank you", "ok", "okay", "bye"]
        if message.lower().strip() not in _PURE_CONVERSATIONAL:
            # ---- Layer -2: 10/10 Tier-0 Cross-Subject Cognitive Engine -------
            try:
                from backend.its.solver.deterministic_service import solve_deterministically
                tier0_res = solve_deterministically(message, subject=subject, class_level=class_level)
                if tier0_res and isinstance(tier0_res, dict) and tier0_res.get("status") == "verified" and tier0_res.get("answer"):
                    steps_text = "\n".join(f"• {s}" for s in (tier0_res.get("steps") or []))
                    audit = tier0_res.get("audit") or {}
                    lane = audit.get("lane") or tier0_res.get("verification", {}).get("label", "deterministic_zenith")
                    # Check for interdisciplinary bridge (Physics ⟷ Chemistry ⟷ Biology ⟷ Maths)
                    bridge_note = ""
                    try:
                        from backend.services.cross_subject_bridge import CrossSubjectBridgeService
                        bridge = CrossSubjectBridgeService.get_bridge_for_query(message)
                        if bridge:
                            bridge_note = (
                                f"\n\n---\n🔗 **Cross-Disciplinary Bridge ({bridge.primary_subject.capitalize()} ⟷ {bridge.target_subject.capitalize()}):**\n"
                                f"**{bridge.title}**\n"
                                f"• *Foundational Invariant:* {bridge.shared_foundation}\n"
                            )
                            if bridge.convention_trap:
                                bridge_note += f"• {bridge.convention_trap}\n"
                    except Exception:
                        pass

                    return {
                        "question": message,
                        "answer": f"**Answer:** {tier0_res['answer']}\n\n{steps_text}{bridge_note}\n\n_verified deterministically via {lane}_",
                        "node_id": None,
                        "node_title": f"Deterministic ({lane})",
                        "subject": subject,
                        "class_level": class_level,
                        "type": "deterministic_zenith",
                        "confidence": 1.0,
                        "method": lane,
                    }
            except Exception:
                pass

            # ---- Layer -1: generic expression solver -------------------------
            # Runs BEFORE the hand-written patterns because measurement says it
            # is strictly safer: over 10,161 real corpus questions the generic
            # lanes produced 1 wrong answer against pattern_solver's 36, since
            # every result is either back-substituted into the original
            # equation or exact. See scripts/coverage_lab.py --gate.
            #
            # Self-contained algebra only ("solve for x: 2x + 8 = 16",
            # "find the value of 2x^2 + 2x + 6 at x = 3"). The FORMULA lane is
            # deliberately NOT here: it needs the concept's stored formula,
            # which does not exist until RoutingService picks a node at Layer 1.
            # That lane is wired after routing for exactly that reason.
            # Local import: this module has no module-level `os`, and putting
            # `_os.environ` outside the try below raised NameError on EVERY
            # question — a wiring bug that would have broken the tutor outright.
            import os as _os
            _gen_on = _os.environ.get("GENERIC_SOLVER_ENABLED", "1")
            if _gen_on not in ("0", "false", "no", "False"):
                try:
                    from backend.ai.generic_solver import solve_expression_question
                    _gen = solve_expression_question(message)
                    if _gen and _gen.matched and _gen.answer is not None:
                        _steps = "\n".join(f"• {s}" for s in _gen.steps)
                        return {
                            "question": message,
                            "answer": f"{_gen.answer}\n\n{_steps}",
                            "node_id": None,
                            "node_title": f"Computed ({_gen.question_type})",
                            "subject": subject,
                            "class_level": class_level,
                            "type": _gen.question_type,
                            "confidence": _gen.confidence,
                            "method": "generic_expression",
                        }
                except Exception as _gen_exc:
                    # A solver regression must never cost a student their
                    # answer: fall through to the existing layers untouched.
                    import logging as _logging
                    _logging.getLogger(__name__).warning(
                        f"generic expression solver unavailable: {_gen_exc}"
                    )

                # Layer -1b: the YAML formula bank. OFF by default.
                #
                # Measured on 10,161 real corpus questions: the JSON catalog
                # formulas (1,771 evaluable, sitting on the owning concept)
                # solved 888 with 0 wrong, while the bank converted only 458
                # of 5,520 entries to solvable equations and solved 0 — for
                # ~11s of startup. Kept behind an env flag for experiments,
                # out of the student request path.
                _bank_on = _os.environ.get("FORMULA_BANK_ENABLED", "0")
                if _bank_on in ("1", "true", "yes", "True"):
                  try:
                    from backend.ai.generic_solver import solve_from_bank
                    _bank = solve_from_bank(message)
                    if _bank and _bank.matched and _bank.answer is not None:
                        _bsteps = "\n".join(f"• {s}" for s in _bank.steps)
                        return {
                            "question": message,
                            "answer": f"{_bank.answer}\n\n{_bsteps}",
                            "node_id": None,
                            "node_title": "Computed (formula bank)",
                            "subject": subject,
                            "class_level": class_level,
                            "type": "bank_formula",
                            "confidence": _bank.confidence,
                            "method": "generic_bank_formula",
                        }
                  except Exception as _bank_exc:
                    import logging as _logging
                    _logging.getLogger(__name__).warning(
                        f"formula bank lane unavailable: {_bank_exc}"
                    )

            # Layer 0.1: Try structural pattern solver FIRST (deterministic, no LLM)
            # This is the new spaCy + structural pattern + SymPy pipeline.
            # It handles competency questions, narrative scenarios, and
            # generalizes across many wordings via structural matching.
            try:
                from backend.ai.pattern_solver import solve as pattern_solve
                from backend.ai.missing_value_handler import check_missing
                pattern_result = pattern_solve(message)
                if pattern_result and pattern_result.matched:
                    steps_text = "\n".join(f"• {s}" for s in pattern_result.steps)
                    return {
                        "question": message,
                        "answer": f"**Solution:**\n\n{steps_text}\n\n**Answer:** {pattern_result.answer}",
                        "node_id": None,
                        "node_title": f"Computed ({pattern_result.question_type})",
                        "subject": subject,
                        "class_level": class_level,
                        "type": pattern_result.question_type,
                        "confidence": 1.0,
                        "method": "pattern_solver",
                    }
                # Check if pattern matched but variables are missing → ask for clarification
                missing_result = check_missing(message)
                if missing_result:
                    return {
                        "question": message,
                        "answer": missing_result.answer,
                        "node_id": None,
                        "node_title": "Need more information",
                        "subject": subject,
                        "class_level": class_level,
                        "type": "clarification",
                        "confidence": 0.0,
                        "method": "pattern_solver_missing",
                    }
            except Exception as e:
                import logging
                logging.getLogger(__name__).debug(f"Pattern solver error: {e}", exc_info=True)

            # attempt_with_llm may reach an LLM/bridge service that can be
            # down (connection refused) — that must degrade to the next
            # layer, never bubble a raw socket error to the student.
            try:
                compute = await ComputeEngine.attempt_with_llm(message)
            except Exception as e:
                import logging
                logging.getLogger(__name__).warning(f"Compute engine unavailable: {e}")
                compute = None
            if compute and compute.matched:
                steps_text = "\n".join(f"• {s}" for s in compute.steps)
                return {
                    "question": message,
                    "answer": f"**Solution:**\n\n{steps_text}\n\n**Answer:** {compute.answer}",
                    "node_id": None,
                    "node_title": f"Computed ({compute.question_type})",
                    "subject": subject,
                    "class_level": class_level,
                    "type": compute.question_type,
                    "confidence": 1.0,
                    "method": "compute",
                }

        # Layer 0.2: Try old template engine for physics formula problems
        if TemplateEngine.detect_numerical(message):
            solution = TemplateEngine.solve(message, subject=subject)
            if solution and solution.matched:
                steps_text = "\n".join(f"• {s.description}" for s in solution.steps)
                return {
                    "question": message,
                    "answer": f"**Solution:**\n\n{steps_text}\n\n**Answer:** {solution.final_answer}\n\n_{solution.method_note}_",
                    "node_id": None,
                    "node_title": f"Computed ({solution.template_name})",
                    "subject": subject,
                    "class_level": class_level,
                    "type": "numerical",
                    "confidence": 1.0,
                    "method": "template",
                }

        # Layer 0.5: Try full orchestrator (includes LLM fallback) for multi-step
        # This is the PRIMARY solver for STEM questions — runs for ALL questions,
        # not just multi-step ones. The orchestrator:
        #   1. Extracts variables using template-specific regex patterns (0 API)
        #   2. Matches by keywords to the best template (0 API)
        #   3. Executes the template deterministically (0 API)
        # Only falls through if no template matches or variables are missing.

        # Layer 0.6: Try full orchestrator (includes LLM fallback for classification)
        # Only for multi-step problems that the keyword matcher didn't catch
        if _looks_like_multistep(message):
            try:
                orch_result = await Orchestrator.solve(
                    db, message, subject=subject, class_level=class_level
                )
                if orch_result and orch_result.matched:
                    method_note = (
                        f"_{orch_result.method} — "
                        f"{'template reused' if orch_result.method == 'template_reuse' else 'LLM decomposed + saved as template'}_"
                    )
                    return {
                        "question": message,
                        "answer": f"{orch_result.answer}\n\n{method_note}",
                        "node_id": None,
                        "node_title": f"Multi-step ({orch_result.template_name[:50]})",
                        "subject": subject,
                        "class_level": class_level,
                        "type": "multistep",
                        "confidence": orch_result.confidence,
                        "method": orch_result.method,
                    }
            except Exception as e:
                import logging
                logging.getLogger(__name__).error(f"Orchestrator error: {e}", exc_info=True)
                pass  # Fall through to semantic routing

        # Layer 1: Route the question to the best enrichment node.
        # The router may depend on optional services (embeddings/qdrant) —
        # degrade to the no-match fallback instead of raising.
        try:
            route = await RoutingService.route(
                db, message, current_node_id=None, subject_filter=subject, class_filter=class_level
            )
        except Exception as e:
            import logging
            logging.getLogger(__name__).warning(f"Routing service unavailable: {e}")
            route = None

        # ---- Post-routing generic lanes ------------------------------------
        # We now know WHICH concept this question is about, which is what the
        # formula lane needs (the concept's stored formula) and what the
        # concept-answer lane needs (its curated explanation). This is why
        # these lanes could not sit at the top of the funnel.
        #
        # `import os as _os` is repeated deliberately: the Layer -1 import is
        # function-local and sits inside a conditional, so for a conversational
        # message it never ran and `_os` was UNBOUND here.
        import os as _os
        _gen_on = _os.environ.get("GENERIC_SOLVER_ENABLED", "1")
        if _gen_on not in ("0", "false", "no", "False") and route is not None:
            try:
                _node_id = (
                    route.get("node_id") if isinstance(route, dict)
                    else getattr(route, "node_id", None)
                )
                if _node_id:
                    from backend.ai.generic_solver import solve_for_node
                    _node = solve_for_node(message, _node_id)
                    if _node and _node.matched and _node.answer is not None:
                        _steps = "\n".join(f"• {s}" for s in _node.steps)
                        return {
                            "question": message,
                            "answer": f"{_node.answer}\n\n{_steps}",
                            "node_id": str(_node_id),
                            "node_title": str(_node_id),
                            "subject": subject,
                            "class_level": class_level,
                            "type": _node.question_type or "answer",
                            "confidence": _node.confidence,
                            "method": f"generic_{_node.lane}",
                        }
            except Exception as _node_exc:
                # Fail OPEN: fall through to the existing funnel untouched.
                import logging as _logging
                _logging.getLogger(__name__).warning(
                    f"generic node solver unavailable: {_node_exc}"
                )

        # If routing found no match, give a friendly response
        if route is None:
            # Check if the question is incomplete (missing key values)
            incomplete_check = _check_incomplete_question(message)
            if incomplete_check:
                return {
                    "question": message,
                    "answer": incomplete_check,
                    "node_id": None,
                    "node_title": "Incomplete question",
                    "subject": subject,
                    "class_level": class_level,
                    "type": "incomplete",
                    "confidence": 0.0,
                    "method": "none",
                }
            _SUBJ_FALLBACK = {
                "maths": "What is the quadratic formula?",
                "math": "What is the quadratic formula?",
                "physics": "What is Newton's second law?",
                "phy": "What is Newton's second law?",
                "chem": "What is Raoult's law?",
                "chemistry": "What is Raoult's law?",
                "bio": "What is photosynthesis?",
                "biology": "What is photosynthesis?",
            }
            _subj_ex = _SUBJ_FALLBACK.get((subject or "").lower(), "a specific concept from your syllabus")
            return {
                "question": message,
                "answer": f"I'm not sure about that topic. I can help with questions from your current subject. Try asking something like '{_subj_ex}'. You can also ask me to solve equations like 'solve 2x + 5 = 15' or calculate things like 'what is 15% of 200'.",
                "node_id": None,
                "node_title": None,
                "subject": None,
                "class_level": None,
                "type": "no_match",
                "confidence": 0.0,
                "method": "none",
            }

        # If confidence is very low, the match is unreliable — be honest
        if route.confidence < 0.15:
            _SUBJ_FALLBACK2 = {
                "maths": "What is the quadratic formula?", "math": "What is the quadratic formula?",
                "physics": "What is Newton's second law?", "phy": "What is Newton's second law?",
                "chem": "What is Raoult's law?", "chemistry": "What is Raoult's law?",
                "bio": "What is photosynthesis?", "biology": "What is photosynthesis?",
            }
            _subj_ex2 = _SUBJ_FALLBACK2.get((subject or "").lower(), "a specific concept from your syllabus")
            return {
                "question": message,
                "answer": f"I'm not confident I found the right topic for your question. The closest match I found was '{route.node_title}', but that might not be what you're looking for. Could you rephrase your question? For example, try '{_subj_ex2}'.",
                "node_id": route.node_id,
                "node_title": route.node_title,
                "subject": None,
                "class_level": None,
                "type": "low_confidence",
                "confidence": route.confidence,
                "method": route.method,
            }

        # Fetch the enrichment row for the routed node
        result = await db.execute(
            select(EnrichmentContent).where(EnrichmentContent.node_id == route.node_id)
        )
        enrichment = result.scalar_one_or_none()
        if enrichment is None:
            return {
                "question": message,
                "answer": "I couldn't find content for that topic. Try rephrasing your question.",
                "node_id": None,
                "node_title": None,
                "subject": None,
                "class_level": None,
                "type": "no_match",
                "confidence": 0.0,
                "method": "none",
            }

        # Node-aware calculation: if the routed node has a solver, try it
        from backend.ai.node_solver_registry import solve_for_node
        calc_result = solve_for_node(route.node_id, message)
        if calc_result and calc_result.matched:
            steps_text = "\n".join(f"- {s}" for s in calc_result.steps)
            return {
                "question": message,
                "answer": f"**Solution:**\n\n{steps_text}\n\n**Answer:** {calc_result.answer}",
                "node_id": enrichment.node_id,
                "node_title": enrichment.title,
                "subject": enrichment.subject,
                "class_level": enrichment.class_level,
                "type": calc_result.question_type,
                "confidence": route.confidence,
                "method": "node_solver",
            }

        # Try intent-based field first
        reply_content, reply_type = TutorService._handle_intent(message, enrichment)

        # Resolve trigger strings that _handle_intent returns
        if reply_content and reply_content.startswith("__TRIGGER_VOCAB__:"):
            term = reply_content.split(":", 1)[1] if ":" in reply_content else ""
            glossary_result = await notes_service.get_glossary_term(db, route.node_id, term)
            if glossary_result:
                reply_content = notes_service._clean_internal_ids(glossary_result)
                reply_type = "vocabulary"
            else:
                reply_content = enrichment.definition or f"I could not find '{term}' in the glossary."
                reply_type = "vocabulary"
        elif reply_content and reply_content.startswith("__TRIGGER_"):
            # Other triggers (SOCRATIC, HINT, etc.) — fall back to definition for quick_question
            reply_content = enrichment.definition or f"This is **{enrichment.title}**. Try asking me to 'explain', 'simplify', or 'walkthrough' this topic."
            reply_type = "definition"

        if not reply_content:
            # Fall back to the routed field
            # But NEVER use on_failure or diagnostic_questions as a direct answer
            # (they are lists of dicts, not pedagogical content)
            _SKIP_FIELDS = {"on_failure", "diagnostic_questions", "mastery_criteria"}
            field_value = getattr(enrichment, route.field, None) if route.field not in _SKIP_FIELDS else None
            if field_value and isinstance(field_value, str):
                reply_content = field_value
                reply_type = route.field
            elif field_value and isinstance(field_value, list) and route.field not in _SKIP_FIELDS:
                # Convert list to string (join string elements, skip dicts)
                str_items = [str(item) for item in field_value if isinstance(item, str)]
                reply_content = "\n".join(str_items) if str_items else ""
                reply_type = route.field
            else:
                # Last resort: definition
                reply_content = enrichment.definition or f"This is **{enrichment.title}**. Try asking me to 'explain', 'simplify', or 'walkthrough' this topic."
                reply_type = "definition"

        # Layer 2: For conceptual questions, map intent to enrichment field directly
        # NO LLM — use the verified enrichment content that's already in the database
        _CONCEPTUAL_TRIGGERS = [
            "why", "explain", "justify", "show that", "prove", "what is",
            "what does", "what are", "how can", "how does", "difference between",
            "meaning of", "significance of", "geometrical meaning",
        ]
        is_conceptual_question = any(kw in message.lower() for kw in _CONCEPTUAL_TRIGGERS)
        if is_conceptual_question and reply_type in ("definition", "text_walkthrough", "eli5", route.field, "vocabulary"):
            # Deterministic conceptual handler — intent → enrichment field (no LLM)
            try:
                from backend.ai.conceptual_handler import handle_conceptual, detect_intent
                from backend.ai.nlp_parser import parse_question
                parsed = parse_question(message)
                intent = detect_intent(parsed)
                # Map intent to enrichment field directly
                _INTENT_TO_FIELD = {
                    "what_is": "definition",
                    "why": "text_walkthrough",
                    "justify": "text_walkthrough",
                    "explain": "text_walkthrough",
                    "eli5": "eli5",
                    "misconception": "common_misconception",
                    "scope": "scope_boundary",
                }
                target_field = _INTENT_TO_FIELD.get(intent)
                if target_field:
                    field_value = getattr(enrichment, target_field, None)
                    if field_value and isinstance(field_value, str) and len(field_value) > 30:
                        reply_content = field_value
                        reply_type = target_field
            except Exception as e:
                import logging
                logging.getLogger(__name__).debug(f"Conceptual handler error: {e}")

            # If we still only have a definition, try text_walkthrough as a richer fallback
            if reply_type == "definition" and enrichment.text_walkthrough and len(enrichment.text_walkthrough) > 50:
                reply_content = enrichment.text_walkthrough
                reply_type = "text_walkthrough"

        return {
            "question": message,
            "answer": reply_content,
            "node_id": enrichment.node_id,
            "node_title": enrichment.title,
            "subject": enrichment.subject,
            "class_level": enrichment.class_level,
            "type": reply_type,
            "confidence": route.confidence,
            "method": route.method,
        }

    # ------------------------------------------------------------------ #
    # Intent handling
    # ------------------------------------------------------------------ #
    @staticmethod
    def _handle_intent(
        message: str, enrichment: Optional[EnrichmentContent]
    ) -> tuple[Optional[str], str]:
        """Handle explicit intent keywords from the student.

        Returns (content, type) or (None, "") if no intent matched.
        """
        if not enrichment:
            return None, ""

        lower = message.lower().strip()

        # Vocabulary help — "what is X", "define X" — use glossary first
        if lower.startswith("what is ") or lower.startswith("define ") or lower.startswith("what's "):
            term = re.sub(r"^(what is |define |what's )", "", lower).rstrip("?.! ").strip()
            if term and len(term) < 50:
                return f"__TRIGGER_VOCAB__:{term}", "vocab_trigger"

        # Walkthrough — now uses Socratic chunked teaching
        if any(w in lower for w in ["walkthrough", "walk me through", "step by step", "guide me"]):
            # This is handled by the caller (reply method) to set up Socratic state
            return "__TRIGGER_SOCRATIC__", "socratic_start"

        # Exam Readiness / Percentile Projection
        if any(w in lower for w in ["readiness", "predict my rank", "percentile", "exam readiness", "jee rank", "neet rank"]):
            try:
                from backend.services.exam_readiness_service import ExamReadinessService
                target_exam = "neet" if (enrichment.subject or "").lower() == "biology" else "jee_advanced"
                rep = ExamReadinessService.calculate_readiness(
                    topic_mastery={enrichment.subject: 0.85, "default": 0.72},
                    avg_solve_time_seconds=55.0,
                    shortcut_triage_ratio=0.88,
                    exam_target=target_exam
                )
                gaps = "\n".join([f"• **{g['category'].replace('_', ' ').title()}**: Current {g['current_mastery']}% (Potential Gain: +{g['potential_percentile_gain']}%ile)" for g in rep.critical_remediation_nodes])
                recs = "\n".join([f"• {r}" for r in rep.recommendations])
                content = (
                    f"### 🎯 Predictive Exam Readiness Report ({rep.exam_target})\n\n"
                    f"**Projected Percentile:** `{rep.projected_percentile}%ile` ({rep.predicted_score_range})\n"
                    f"**Readiness Tier:** `{rep.readiness_tier}`\n"
                    f"**Solving Velocity Index:** `{rep.solving_velocity_index}x` | **Shortcut Efficiency:** `{rep.shortcut_triage_efficiency*100:.0f}%`\n\n"
                    f"**Critical High-Yield Focus Areas:**\n{gaps}\n\n"
                    f"**Actionable Next Steps:**\n{recs}"
                )
                return content, "exam_readiness"
            except Exception:
                pass

        # Cognitive Fatigue / Confusion -> Socratic 2-Button Choice Fork
        if any(w in lower for w in ["confused", "don't get it", "dont get it", "huh", "lost", "too complicated", "brain hurts", "stuck"]):
            eli5_text = enrichment.eli5 or "Let's strip away all the symbols and build the physical picture from scratch."
            content = (
                f"### 💡 Let's reset and build intuition first.\n\n"
                f"{eli5_text}\n\n"
                f"---\n"
                f"**Quick Intuition Check:** Which statement feels more natural to you?\n\n"
                f"🅰️ **Option A:** The phenomenon occurs spontaneously because the system seeks minimum potential energy.\n"
                f"🅱️ **Option B:** An external continuous work input is required to maintain this state.\n\n"
                f"*(Click or type 'A' or 'B' to test your mental model!)*"
            )
            return content, "socratic_fork"

        # ELI5 / simplify (including Hinglish variants)
        if any(w in lower for w in ["simplify", "simple", "eli5", "explain like", "easy way", "too hard",
                                     "easy way batao", "aur explain karo", "aur explain", "explain karo",
                                     "samjhao", "aasan bhasha", "simple bhasha"]):
            content = enrichment.eli5 or enrichment.text_walkthrough or "Simple explanation not available for this topic."
            return content, "eli5"

        # Hint (including Hinglish "hint do", "hint de", "hint dedo")
        if any(w in lower for w in ["hint", "hint do", "hint de", "hint dedo", "clue do", "clue de"]):
            return "__TRIGGER_HINT__", "hint_trigger"

        # Silly mistakes — procedural error checklist (check BEFORE common mistakes)
        if any(w in lower for w in ["silly mistake", "silly errors", "careless", "stupid mistake"]):
            return "__TRIGGER_SILLY_MISTAKES__", "silly_mistakes_trigger"

        # Common mistakes — use topic-specific misconception files
        if any(w in lower for w in ["mistake", "mistakes", "wrong", "error", "misconception", "common error"]):
            return "__TRIGGER_MISCONCEPTIONS__", "misconceptions_trigger"

        # Drill practice — start tiered drill progression
        if lower in ("drill", "drill me", "practice drill", "exam practice"):
            return "__TRIGGER_DRILL__", "drill_trigger"

        # Test me / practice — start the full diagnostic flow
        if any(w in lower for w in ["test me", "quiz me", "diagnostic", "assess me"]):
            diag = enrichment.diagnostic_questions or []
            if diag:
                # Wire in diagnostic_level — adapt the starting question
                # to the topic's cognitive level.  For high-level topics
                # (e.g. "evaluate"), skip the easier recall questions.
                diag_level = getattr(enrichment, "diagnostic_level", "") or "reasoning"
                start_idx = _select_diagnostic_start_index(diag, diag_level)
                start_q = diag[start_idx]
                start_q_num = start_q.get("number", start_idx + 1)
                skipped = start_idx  # number of questions skipped
                remaining = len(diag) - skipped

                # Build the intro — mention if questions were skipped
                level_note = ""
                if skipped > 0:
                    level_note = (
                        f"\n_(Starting at {start_q.get('cognitive_type', '')} level "
                        f"for this {diag_level}-level topic — "
                        f"{skipped} easier question{'s' if skipped > 1 else ''} skipped.)_\n"
                    )

                # Start diagnostic flow — set phase and serve the first question
                # Note: this is called from _handle_intent which returns (content, type)
                # The phase is set in the caller (reply method) when type == "diagnostic_start"
                content = (
                    f"**Diagnostic Test: {enrichment.title}**\n\n"
                    f"You'll get {remaining} questions at increasing cognitive levels "
                    f"({', '.join(d.get('cognitive_type', '') for d in diag[start_idx:])}).\n"
                    f"{level_note}\n"
                    f"Before we start — **how confident are you** about this topic? "
                    f"Type a number from 1 (not confident at all) to 5 (very confident), "
                    f"or just type your answer to Question {start_q_num} to skip this.\n\n"
                    f"**Question {start_q_num}** ({start_q.get('cognitive_type', '')}):\n\n"
                    f"{start_q.get('question', '')}\n\n"
                    f"Type your confidence rating (1-5) or your answer. "
                    f"Type 'show answer' to skip, or 'stop' to quit."
                )
                return content, "diagnostic_start"
            return "No diagnostic questions available for this topic.", "diagnostic"

        # Show answer
        if "show answer" in lower or "what's the answer" in lower or "answer please" in lower:
            diag = enrichment.diagnostic_questions or []
            if diag:
                content = f"**Answer:**\n\n{diag[0].get('answer', 'Answer not available.')}"
                return content, "diagnostic_answer"
            return "No answer to show.", "diagnostic"

        # Scope
        if any(w in lower for w in ["scope", "syllabus", "what do i need", "what to study"]):
            content = enrichment.scope_boundary or "Scope not defined for this topic."
            # Wire in scope_constraints from the graph — these are
            # structured "Teach: ... Do NOT teach: ... Already covered: ..."
            # boundaries that clarify what's in/out of scope.
            try:
                graph_fields = GraphService.get_node_enrichment_fields_sync(enrichment.node_id)
                scope_items = graph_fields.get("scope_constraints", [])
                if scope_items:
                    content += "\n\n**Scope boundaries:**\n"
                    for item in scope_items:
                        content += f"  • {item}\n"
            except Exception:
                pass
            return content, "scope"

        # Mastery criteria
        if any(w in lower for w in ["am i ready", "move on", "mastered", "mastery", "criteria"]):
            content = enrichment.mastery_criteria or "Mastery criteria not defined for this topic."
            return content, "mastery"

        # Show solution — reveal the full worked example (after student tried)
        if any(w in lower for w in ["show solution", "show full solution", "show the solution", "show answer", "full solution", "show working"]):
            return "__TRIGGER_FULL_SOLUTION__", "full_solution_trigger"

        # Examples — use worked examples from dedicated notes
        if any(w in lower for w in ["example", "show me", "demonstrate", "sample", "worked example", "solved example"]):
            # "guided practice" / "practice" / "try it" → guided practice mode
            if any(w in lower for w in ["guided practice", "practice", "try it", "let me try", "my turn"]):
                return "__TRIGGER_GUIDED_PRACTICE__", "guided_practice_trigger"
            return "__TRIGGER_WORKED_EXAMPLES__", "worked_examples_trigger"

        # Formula — use formula bank from dedicated notes
        if any(w in lower for w in ["formula", "formulas", "formulae", "equations", "all formulas"]):
            return "__TRIGGER_FORMULA__", "formula_trigger"

        # SRS flashcards — dedicated trigger for spaced repetition cards
        # Check BEFORE quick revision so "flashcards" hits this, not quick_revision
        if any(w in lower for w in ["flashcard", "flashcards", "srs", "spaced repetition", "flashcard quiz", "card quiz", "flip cards"]):
            return "__TRIGGER_FLASHCARDS__", "flashcard_trigger"

        # Quick revision cards (check BEFORE general revision)
        if any(w in lower for w in ["quick revision", "rapid revision", "cram"]):
            return "__TRIGGER_QUICK_REVISION__", "quick_revision_trigger"

        # Revision / summary — use revision sheets and summaries
        if any(w in lower for w in ["revision", "revise", "summary", "summarize", "quick review", "cheat sheet"]):
            return "__TRIGGER_REVISION__", "revision_trigger"

        # Exam tips / exam technique / high yield
        if any(w in lower for w in ["exam tip", "exam technique", "how to answer", "high yield", "important topics", "exam strategy"]):
            return "__TRIGGER_EXAM_TIPS__", "exam_tips_trigger"

        # Real world applications
        if any(w in lower for w in ["real world", "application", "applications", "where is this used", "practical use"]):
            return "__TRIGGER_REAL_WORLD__", "real_world_trigger"

        # Solution template — how to structure answers
        if any(w in lower for w in ["solution template", "how to solve", "how to structure", "answer format", "marking scheme"]):
            return "__TRIGGER_SOLUTION_TEMPLATE__", "solution_template_trigger"

        # Structured solver — for calculation questions
        if any(w in lower for w in ["solve", "calculate", "compute", "find the value", "help me calculate"]):
            # Don't trigger solver for "solve this" if it's clearly a conceptual question
            if any(w in lower for w in ["concept", "explain", "define", "what is", "why"]):
                pass  # fall through to LLM conceptual handler
            else:
                return "__TRIGGER_SOLVER__", "solver_trigger"

        # Help / stuck — but NOT for "how can X help" application questions
        if any(w in lower for w in ["stuck", "help", "can't do", "i don't understand", "struggling", "difficult"]):
            # "how can calculus help" is an application question, not a help request
            if any(w in lower for w in ["how can", "how does", "how do"]):
                return None, ""
            # Use guided remediation (on_failure as questions)
            on_fail = enrichment.on_failure or []
            if on_fail:
                entry = on_fail[0]
                guiding = build_guided_remediation(entry.get("question_number", 1), enrichment)
                return guiding, "remediation"
            return "Let's review the basics. Type 'walkthrough' for a step-by-step explanation, or 'simplify' for a simpler version.", "remediation"

        # Review prerequisite (after diagnostic shows remediation needed)
        if lower in ("review", "review prereq", "study prereq"):
            return "__TRIGGER_REMEDIATION__", "remediation_trigger"

        # Retry failed diagnostic question
        if lower in ("retry", "retry question", "try again"):
            return "__TRIGGER_RETRY__", "diagnostic_retry_trigger"

        return None, ""

    # ------------------------------------------------------------------ #
    # Search within node content
    # ------------------------------------------------------------------ #
    @staticmethod
    def _search_within_node(
        message: str, enrichment: EnrichmentContent
    ) -> tuple[Optional[str], str]:
        """Search for relevant content within the current node's enrichment.

        Uses simple keyword matching to find the most relevant paragraph.
        """
        # Combine all text fields
        fields = {
            "definition": enrichment.definition or "",
            "text_walkthrough": enrichment.text_walkthrough or "",
            "eli5": enrichment.eli5 or "",
            "common_misconception": enrichment.common_misconception or "",
        }

        msg_words = set(message.lower().split())
        best_field = None
        best_score = 0

        for field_name, field_text in fields.items():
            if not field_text:
                continue
            field_words = set(field_text.lower().split())
            overlap = len(msg_words & field_words)
            if overlap > best_score:
                best_score = overlap
                best_field = field_name

        if best_field and best_score >= 3:
            content = fields[best_field]

            # 1. Proactive Misconception Interceptor
            misconception = enrichment.common_misconception or ""
            if misconception and best_field != "common_misconception":
                mis_words = set(re.findall(r"\b\w{4,}\b", misconception.lower()))
                # If student's query touches misconception keywords or asks about mistakes
                if len(msg_words & mis_words) >= 2 or any(k in message.lower() for k in ["wrong", "why not", "isn't", "is it true", "mistake", "slip", "confused"]):
                    content = f"⚠️ **Examiner Alert (Common Trap):**\n_{misconception}_\n\n" + content

            # 2. Tri-Modal Visual & Sandbox Recommendations
            nid = getattr(enrichment, 'node_id', '') or ''
            subj = getattr(enrichment, 'subject', '') or ''
            visual_links: list[str] = []

            # Map node subject to 3D sandbox
            if '_phy_' in nid or 'phy' in subj:
                visual_links.append(f"[⚛️ Open Physics 3D Sandbox](/sandbox?lab=physics&node={nid})")
            elif '_chem_' in nid or 'chem' in subj:
                visual_links.append(f"[🧪 Open Chemistry 3D Workbench](/sandbox?lab=chem&node={nid})")
            elif '_bio_' in nid or 'bio' in subj:
                visual_links.append(f"[🔬 Open Biology 3D Cell Lab](/sandbox?lab=biology&node={nid})")
            elif '_math_' in nid or 'math' in subj:
                visual_links.append(f"[📐 Open Maths 3D Sandbox](/sandbox?lab=maths&node={nid})")
            elif '_acc_' in nid or 'account' in subj:
                visual_links.append(f"[📒 Open Accountancy Ledger Lab](/sandbox?lab=accountancy&node={nid})")
            elif '_econ_' in nid or 'econ' in subj:
                visual_links.append(f"[📈 Open Economics Market Lab](/sandbox?lab=econ&node={nid})")
            elif '_cs_' in nid or 'code' in subj:
                visual_links.append(f"[💻 Open Code & Flowchart Bench](/sandbox?lab=code&node={nid})")

            # If student asks for visual / sim / experiment / 3d
            if visual_links and re.search(r"\b(sim|visual|see|show|experiment|lab|try|graph|3d|sandbox)\b", message, re.I):
                content += "\n\n**Visual Lab Workbench:**\n" + "\n".join(f"• {link}" for link in visual_links)

            return content, best_field

        return None, ""

    # ------------------------------------------------------------------ #
    # Solution formatting
    # ------------------------------------------------------------------ #
    @staticmethod
    def _format_solution(solution) -> str:
        """Format a template engine solution as a conversational response."""
        parts = [f"Let me solve this step by step:\n"]
        for i, step in enumerate(solution.steps, 1):
            parts.append(f"**Step {i}:** {step.description}")
            if step.expression:
                parts.append(f"  → {step.expression}")
            if step.result:
                parts.append(f"  = {step.result}")
            parts.append("")

        parts.append(f"**Answer: {solution.final_answer}**")
        if solution.method_note:
            parts.append(f"\n_{solution.method_note}_")

        return "\n".join(parts)

    # ------------------------------------------------------------------ #
    # Diagnostic flow — answer evaluation and progression
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _handle_diagnostic_answer(
        session_id: str, meta: dict, enrichment: EnrichmentContent,
        student_answer: str, db: AsyncSession,
    ) -> dict:
        """Evaluate a student's answer to a diagnostic question and serve the next one."""
        q_num = meta.get("diag_current_q", 0)
        diag = enrichment.diagnostic_questions or []
        current_q = next((d for d in diag if d.get("number") == q_num), None)
        if not current_q:
            meta["phase"] = "teach"
            return await TutorService._build_reply(
                session_id, meta, "Diagnostic question not found. Let's continue learning.", "diagnostic_error", db
            )

        # Check for "I don't know" — track consecutive failures
        _IDK_PHRASES = ["i don't know", "i dont know", "idk", "no idea", "i have no idea",
                        "i don't know the answer", "i dont know the answer"]
        is_idk = any(phrase in student_answer.lower().strip() for phrase in _IDK_PHRASES)
        if is_idk:
            # Track consecutive "I don't know" responses
            idk_count = meta.get("consecutive_idk", 0) + 1
            meta["consecutive_idk"] = idk_count
            if idk_count >= 3:
                # After 3 consecutive "I don't know", stop diagnostic and switch to teaching
                meta["phase"] = "teach"
                meta["consecutive_idk"] = 0
                # Show the model answer for the current question
                model_ans = current_q.get("answer", "Answer not available.")
                content = (
                    f"It looks like you're not sure about this topic yet, and that's okay. "
                    f"Let me show you the answer and then we'll learn the concept together.\n\n"
                    f"**Model Answer:**\n{model_ans}\n\n"
                    f"---\n\n"
                    f"Let's take a step back and build your understanding. "
                    f"Type **walkthrough** for a step-by-step explanation, "
                    f"or **eli5** for a simple analogy. "
                    f"You can also type **flashcards** for quick review cards."
                )
                return await TutorService._build_reply(session_id, meta, content, "diagnostic_idk_stop", db)
        else:
            # Reset consecutive IDK counter on any real answer
            meta["consecutive_idk"] = 0

        # Evaluate the answer using the hybrid evaluator (MiniLM + DeepSeek)
        result = await evaluate_answer_hybrid(
            student_answer=student_answer,
            model_answer=current_q.get("answer", ""),
            question_type="free_text",
            question_text=current_q.get("question", ""),
            node_id=meta["node_id"],
            cognitive_type=current_q.get("cognitive_type", ""),
            solver_bridge=evaluator_solver_bridge,
        )

        # Record the answer and result
        meta["diag_answers"][q_num] = student_answer
        meta["diag_results"][q_num] = {
            "correct": result.correct,
            "score": max(0.0, min(1.0, result.score)),  # Floor at 0, cap at 1
            "feedback": result.feedback,
            "cognitive_type": current_q.get("cognitive_type", ""),
        }
        if not result.correct:
            meta["diag_failed"].append(q_num)

        # Detect post-remediation improvement
        pre_scores = meta.get("diag_pre_remediation_scores", {})
        improvement_note = ""
        if q_num in pre_scores:
            pre_score = pre_scores[q_num]
            post_score = result.score
            if result.correct and pre_score < 0.5:
                improvement_note = (
                    f"\n\n🎉 **Improvement!** You went from {pre_score:.0%} to {post_score:.0%} "
                    f"after reviewing the prerequisite. That's real progress — you learned something!"
                )
                # Remove from failed list since they got it right now
                if q_num in meta.get("diag_failed", []):
                    meta["diag_failed"].remove(q_num)
            elif post_score > pre_score:
                improvement_note = (
                    f"\n\n📈 **Getting better!** You improved from {pre_score:.0%} to {post_score:.0%}. "
                    f"Keep going — you're on the right track."
                )

        # Build feedback message
        bloom_label = current_q.get("cognitive_type", "unknown")
        display_score = max(0.0, min(1.0, result.score))
        xp_earned = 0
        if result.correct:
            xp_earned = 10 + int(display_score * 10)  # 10-20 XP for correct
            feedback_header = f"✓ **Correct!** (Score: {display_score:.0%} — {bloom_label}) +{xp_earned} XP"
        elif result.partial:
            xp_earned = 5
            feedback_header = f"◐ **Partially correct.** (Score: {display_score:.0%} — {bloom_label}) +{xp_earned} XP"
        else:
            feedback_header = f"✗ **Not quite.** (Score: {display_score:.0%} — {bloom_label})"

        # Award XP — the feedback header announces this number, so it must be
        # REAL: route it through the canonical reward ledger (users.total_xp),
        # keyed (session, question) exactly-once. The session counter below
        # stays as the per-session display total; before this fix the header
        # promised XP the dashboard wallet never received (council finding:
        # XP shown vs XP banked disagreed).
        if xp_earned > 0:
            try:
                from backend.services.reward_ledger import RewardLedger

                await RewardLedger.award_xp(
                    db, str(meta.get("user_id") or ""),
                    xp_earned,
                    event="tutor",
                    event_ref=f"{session_id}:{q_num}",
                )
            except Exception as exc:
                logger.warning("tutor XP wallet write skipped: %s", exc)
            meta["xp_earned"] = meta.get("xp_earned", 0) + xp_earned

        # If wrong, try to match to a known misconception
        misconception_feedback = ""
        if not result.correct and not result.partial:
            try:
                misc_match = await match_misconception(
                    db, student_answer,
                    node_id=meta["node_id"],
                    subject=meta.get("subject", ""),
                    class_level=meta.get("class_level", 0),
                )
                if misc_match.matched and misc_match.feedback:
                    # Use Socratic probing instead of just dumping the correction
                    probe = build_misconception_probe(
                        misc_match.misconception.misconception_text if misc_match.misconception else "",
                        student_answer,
                    )
                    misconception_feedback = f"\n\n{probe}"
                    meta["misconceptions"].append({
                        "question": q_num,
                        "student_answer": student_answer[:200],
                        "misconception": misc_match.misconception.misconception_text[:200] if misc_match.misconception else "",
                    })
            except Exception:
                pass  # Misconception matching is a nice-to-have, don't fail on errors

        # For partial or wrong answers, add guided remediation from on_failure
        # but KEEP the hybrid evaluator's nuanced feedback (what student got right)
        guided_hint = ""
        if not result.correct:
            guided_hint = build_guided_remediation(q_num, enrichment)
            guided_hint = (
                f"\n\n**Need guidance?**\n{guided_hint}\n\n"
                f"(Type 'hint' for another clue, 'show answer' to see the full answer, "
                f"or 'practice similar' to try a similar question.)"
            )
            # Keep the evaluator feedback — it contains "what you got right" nuance
            # even for low scores. Only suppress if it's empty or generic.
            feedback_body = result.feedback if result.feedback else ""
        else:
            feedback_body = result.feedback

        # Check if this is a post-remediation retry — if so, show learning gain and stop
        pre_scores = meta.get("diag_pre_remediation_scores", {})
        if q_num in pre_scores and meta.get("remediation_active") is False and meta.get("remediation_completed"):
            pre_score = pre_scores[q_num]
            post_score = result.score
            gain = post_score - pre_score
            meta["phase"] = "teach"
            meta["diag_current_q"] = 0
            if gain > 0:
                gain_text = f"**Learning Gain: +{gain*100:.0f}%** (from {pre_score*100:.0f}% to {post_score*100:.0f}%)"
            elif result.correct:
                gain_text = f"You got it right this time! (Score: {post_score*100:.0f}%)"
            else:
                gain_text = f"You improved from {pre_score*100:.0f}% to {post_score*100:.0f}%. Keep practicing!"
            content = (
                f"{feedback_header}\n\n{feedback_body}{misconception_feedback}\n\n"
                f"---\n\n{gain_text}\n\n"
                f"You've completed the remediation cycle. "
                f"Type 'test me' for a full diagnostic, 'flashcards' for review, "
                f"or 'next topic' to move on."
            )
            return await TutorService._build_reply(session_id, meta, content, "diagnostic_retry_result", db)

        # Find next question
        next_q_num = q_num + 1
        next_q = next((d for d in diag if d.get("number") == next_q_num), None)

        if next_q:
            # Serve next question
            meta["diag_current_q"] = next_q_num
            # For wrong answers, include the model answer so the student can learn from it
            model_answer_section = ""
            if not result.correct and not result.partial:
                model_ans = current_q.get("answer", "")
                if model_ans:
                    model_answer_section = f"\n\n**Model Answer:**\n{model_ans}\n"
            content = (
                f"{feedback_header}\n\n{feedback_body}{misconception_feedback}{guided_hint}{improvement_note}{model_answer_section}\n\n"
                f"---\n\n"
                f"**Question {next_q_num}** ({next_q.get('cognitive_type', '')}):\n\n"
                f"{next_q.get('question', '')}\n\n"
                f"Type your answer. Type 'hint' for a clue, or 'show answer' to skip:"
            )
            return await TutorService._build_reply(session_id, meta, content, "diagnostic_progress", db)
        else:
            # All questions done — show scorecard and trigger remediation
            return await TutorService._finish_diagnostic(session_id, meta, enrichment, db)

    @staticmethod
    async def _handle_diagnostic_skip(
        session_id: str, meta: dict, enrichment: EnrichmentContent, db: AsyncSession,
    ) -> dict:
        """Skip the current diagnostic question (show answer and move on)."""
        q_num = meta.get("diag_current_q", 0)
        diag = enrichment.diagnostic_questions or []
        current_q = next((d for d in diag if d.get("number") == q_num), None)
        if not current_q:
            meta["phase"] = "teach"
            return await TutorService._build_reply(
                session_id, meta, "No question to skip.", "diagnostic_error", db
            )

        # Mark as skipped (not penalized — student is learning by viewing the answer)
        meta["diag_answers"][q_num] = "[viewed answer]"
        meta["diag_results"][q_num] = {
            "correct": False,
            "score": 0.0,
            "feedback": "Question skipped — model answer shown for learning.",
            "cognitive_type": current_q.get("cognitive_type", ""),
            "skipped": True,
        }
        # Don't add to diag_failed — the student chose to learn, not failed

        # Show the answer
        answer_text = current_q.get("answer", "Answer not available.")

        # Find next question
        next_q_num = q_num + 1
        next_q = next((d for d in diag if d.get("number") == next_q_num), None)

        if next_q:
            meta["diag_current_q"] = next_q_num
            content = (
                f"**Model Answer:**\n\n{answer_text}\n\n"
                f"---\n\n"
                f"**Question {next_q_num}** ({next_q.get('cognitive_type', '')}):\n\n"
                f"{next_q.get('question', '')}\n\n"
                f"Type your answer:"
            )
            return await TutorService._build_reply(session_id, meta, content, "diagnostic_progress", db)
        else:
            # Last question — show model answer BEFORE finishing diagnostic
            meta["diag_current_q"] = 0  # Mark diagnostic as complete
            meta["phase"] = "diagnostic_complete"
            finish_reply = await TutorService._finish_diagnostic(session_id, meta, enrichment, db)
            # Prepend the model answer to the finish summary
            finish_reply["content"] = f"**Model Answer:**\n\n{answer_text}\n\n---\n\n{finish_reply.get('content', '')}"
            return finish_reply

    @staticmethod
    async def _finish_diagnostic(
        session_id: str, meta: dict, enrichment: EnrichmentContent, db: AsyncSession,
    ) -> dict:
        """Show the diagnostic scorecard and trigger remediation for failed questions."""
        results = meta.get("diag_results", {})
        failed = meta.get("diag_failed", [])

        # Build Bloom scorecard
        bloom_scores = {}
        for q_num, res in results.items():
            bloom = res.get("cognitive_type", "unknown")
            if bloom not in bloom_scores:
                bloom_scores[bloom] = {"correct": 0, "total": 0}
            bloom_scores[bloom]["total"] += 1
            if res.get("correct"):
                bloom_scores[bloom]["correct"] += 1

        scorecard_lines = []
        for bloom, data in bloom_scores.items():
            icon = "✓" if data["correct"] == data["total"] else ("◐" if data["correct"] > 0 else "✗")
            scorecard_lines.append(f"  {icon} **{bloom.title()}**: {data['correct']}/{data['total']}")

        all_scores = [r.get("score", 0) for r in results.values()]
        overall = sum(all_scores) / len(all_scores) if all_scores else 0
        # Clamp overall score to 0–100% (prevent negative scores)
        overall = max(0.0, min(1.0, overall))
        all_correct = len(failed) == 0

        meta["phase"] = "teach"  # Reset phase

        # Feed failed diagnostic questions into SM-2 spaced repetition
        if failed:
            try:
                from backend.services.spiral_service import SpiralService
                diag = enrichment.diagnostic_questions or []
                for q_num in failed:
                    q = next((d for d in diag if d.get("number") == q_num), None)
                    if q:
                        await SpiralService.add_review_item(
                            user_id=meta.get("user_id", ""),
                            node_id=meta.get("node_id", ""),
                            item_type="diagnostic",
                            item_id=f"diag_q{q_num}",
                            quality=1,  # Wrong answer → low quality → review soon
                        )
            except Exception:
                pass  # SM-2 is nice-to-have, don't fail diagnostic

        if all_correct:
            # Suggest next topic using forward_node_ids
            forward_ids = enrichment.forward_node_ids or [] if enrichment else []
            next_topic_text = ""
            if forward_ids:
                # Fetch forward_reasons from the graph for pedagogical context
                forward_reasons_map = {}
                try:
                    graph_fields = await GraphService.get_node_enrichment_fields(enrichment.node_id)
                    forward_reasons_map = graph_fields.get("forward_reasons", {})
                except Exception:
                    pass
                next_titles = []
                for fid in forward_ids[:3]:
                    try:
                        f_result = await db.execute(
                            select(EnrichmentContent).where(EnrichmentContent.node_id == fid)
                        )
                        f_enr = f_result.scalar_one_or_none()
                        if f_enr:
                            reason = forward_reasons_map.get(fid)
                            if reason:
                                next_titles.append(f"  • {f_enr.title} — _{reason}_")
                            else:
                                next_titles.append(f"  • {f_enr.title}")
                    except Exception:
                        pass
                if next_titles:
                    next_topic_text = (
                        f"\n\n**What's next?** You're ready for:\n"
                        + "\n".join(next_titles)
                        + f"\n\nType 'next topic' to start the next topic, or ask about any of these."
                    )
            content = (
                f"**Diagnostic Complete!**\n\n"
                f"**Overall Score: {overall:.0%}**\n\n"
                f"**Bloom Scorecard:**\n{'\n'.join(scorecard_lines)}\n\n"
                f"Excellent! You've demonstrated mastery across all cognitive levels.\n"
                f"Type 'drill' for exam-level practice, or 'mastery' to see the mastery criteria."
                f"{next_topic_text}"
            )

            # Wire in diagnostic_level — suggest the appropriate drill tier
            diag_level = getattr(enrichment, "diagnostic_level", "") or "reasoning"
            suggested_tier = _tier_for_level(diag_level)
            if suggested_tier != "BASIC":
                content += (
                    f"\n\n_(This topic is at {diag_level} level — "
                    f"drill will start at {suggested_tier} tier.)_"
                )
            return await TutorService._build_reply(session_id, meta, content, "diagnostic_complete", db)

        # Has failed questions — trigger remediation
        # Collect ALL failed questions' on_failure paths
        on_failures = enrichment.on_failure or []
        current_subject = enrichment.subject if hasattr(enrichment, 'subject') else None

        # Normalize subject names — graph uses 'phy', 'chem', 'bio', 'math'
        # while enrichment uses 'physics', 'chemistry', 'biology', 'maths'
        _SUBJECT_NORMALIZE = {
            'phy': 'physics', 'chem': 'chemistry', 'bio': 'biology', 'math': 'maths',
            'physics': 'physics', 'chemistry': 'chemistry', 'biology': 'biology', 'maths': 'maths',
        }
        def _norm_subj(s):
            return _SUBJECT_NORMALIZE.get(s.lower(), s.lower()) if s else s

        # Build a list of all review nodes from all failed questions
        # Prefer cross-subject prereqs (they're more interesting pedagogically)
        all_review_nodes = []  # list of (review_node_id, q_num, remediation_text)
        for failed_q in failed:
            on_fail = next(
                (of for of in on_failures if of.get("question_number") == failed_q),
                None,
            )
            if on_fail and on_fail.get("review_node_ids"):
                for rid in on_fail["review_node_ids"]:
                    all_review_nodes.append((rid, failed_q, on_fail.get("remediation_text", "")))

        if all_review_nodes:
            # Prefer cross-subject prereq if available, else use first
            best_review = None
            best_is_cross = False
            for rid, q_num, rem_text in all_review_nodes:
                try:
                    pnode = await GraphService.get_node(rid)
                except Exception:
                    pnode = None
                psubj = pnode.get("subject") if pnode else None
                is_cross = psubj and current_subject and _norm_subj(psubj) != _norm_subj(current_subject)
                if is_cross and not best_is_cross:
                    best_review = (rid, q_num, rem_text)
                    best_is_cross = True
                elif best_review is None:
                    best_review = (rid, q_num, rem_text)

            review_node_id = best_review[0]
            first_failed = best_review[1]
            remediation_text = best_review[2]

            # Check if the review node exists in the graph
            try:
                prereq_node = await GraphService.get_node(review_node_id)
            except Exception:
                prereq_node = None

            # Get the prereq enrichment to show its title
            prereq_title = review_node_id
            prereq_subject = None
            if prereq_node:
                prereq_title = prereq_node.get("topic", review_node_id)
                prereq_subject = prereq_node.get("subject")
            else:
                # Try to get from enrichment table
                prereq_result = await db.execute(
                    select(EnrichmentContent).where(EnrichmentContent.node_id == review_node_id)
                )
                prereq_enr = prereq_result.scalar_one_or_none()
                if prereq_enr:
                    prereq_title = prereq_enr.title

            # Check if this is a cross-subject prerequisite
            cross_subject_reason = None
            if prereq_subject and current_subject and _norm_subj(prereq_subject) != _norm_subj(current_subject):
                # Fetch the cross-subject reason from Neo4j first
                try:
                    prereqs_with_reasons = await GraphService.get_all_prerequisites(enrichment.node_id, max_depth=2)
                    for p in prereqs_with_reasons:
                        if p.get("node_id") == review_node_id:
                            reasons = p.get("reasons", [])
                            # Filter out None/empty reasons
                            valid_reasons = [r for r in reasons if r and r.strip()]
                            if valid_reasons:
                                cross_subject_reason = valid_reasons[0]
                            break
                except Exception:
                    pass
                # Fallback: use the static cross-subject reason mapping
                if not cross_subject_reason:
                    cross_subject_reason = get_cross_subject_reason(enrichment.node_id, review_node_id)

            # Clean the remediation text — replace "Review PREREQ node c12_phy_007 (title)" with friendly text
            clean_rem_text = remediation_text
            # Pattern: "Review PREREQ node c12_phy_007 (Electric field...)" or "CROSS_PREREQ node c12_math_064 (title)"
            # Handles PREREQ, DEPTH_PREREQ, and CROSS_PREREQ prefixes
            clean_rem_text = re.sub(
                r'(?:Review\s+)?(?:CROSS_PREREQ|DEPTH_PREREQ|PREREQ)\s+node\s+\S+\s*\(([^)]*)\)',
                r'"\1"',
                clean_rem_text, flags=re.IGNORECASE
            )
            # Remove bare "PREREQ node c12_phy_007" without parens
            clean_rem_text = re.sub(
                r'(?:Review\s+)?(?:CROSS_PREREQ|DEPTH_PREREQ|PREREQ)\s+node\s+\S+',
                f'"{prereq_title}"',
                clean_rem_text, flags=re.IGNORECASE
            )
            # Remove any remaining bare node IDs
            clean_rem_text = _clean_student_content(clean_rem_text)

            # Build the remediation message
            content = (
                f"**Diagnostic Complete**\n\n"
                f"**Overall Score: {overall:.0%}**\n\n"
                f"**Bloom Scorecard:**\n{'\n'.join(scorecard_lines)}\n\n"
                f"---\n\n"
                f"**Remediation Needed**\n\n"
                f"You struggled with Question {first_failed} "
                f"({results.get(first_failed, {}).get('cognitive_type', '')}).\n\n"
                f"{clean_rem_text}\n\n"
                f"**Recommended review:** {prereq_title}"
            )

            # Add cross-subject reason if applicable
            if cross_subject_reason:
                content += (
                    f"\n\n**Why this matters:** {cross_subject_reason}"
                )

            # Wire in prerequisite_reasons from the graph — this is a
            # human-readable explanation of WHY this prereq is needed,
            # stored on the current node's prerequisite_reasons field.
            prereq_reason = None
            try:
                graph_fields = await GraphService.get_node_enrichment_fields(enrichment.node_id)
                prereq_reasons_map = graph_fields.get("prerequisite_reasons", {})
                if prereq_reasons_map and review_node_id in prereq_reasons_map:
                    prereq_reason = prereq_reasons_map[review_node_id]
            except Exception:
                pass
            if prereq_reason and not cross_subject_reason:
                content += (
                    f"\n\n**Why you need this:** {prereq_reason}"
                )

            content += (
                f"\n\nType 'review' to study this prerequisite, or 'retry' to attempt Q{first_failed} again.\n"
                f"Failed questions have been added to your review queue — type 'spiral review' to see when to revisit them."
            )
            # Store remediation target for later
            meta["remediation_target"] = review_node_id
            meta["remediation_prereq_title"] = prereq_title
            meta["remediation_text"] = remediation_text
            return await TutorService._build_reply(session_id, meta, content, "diagnostic_remediation", db)
        else:
            # No on_failure path — show misconceptions
            miscon_text = enrichment.common_misconception or ""
            content = (
                f"**Diagnostic Complete**\n\n"
                f"**Overall Score: {overall:.0%}**\n\n"
                f"**Bloom Scorecard:**\n{'\n'.join(scorecard_lines)}\n\n"
                f"---\n\n"
                f"You struggled with some questions. Here are common misconceptions for this topic:\n\n"
                f"{miscon_text[:500] if miscon_text else 'Review the definition and walkthrough, then try again.'}\n\n"
                f"Type 'walkthrough' for a step-by-step explanation, or 'retry' to retake the diagnostic."
            )
            return await TutorService._build_reply(session_id, meta, content, "diagnostic_remediation", db)

    @staticmethod
    async def _start_remediation(
        session_id: str, meta: dict, db: AsyncSession,
    ) -> dict:
        """Switch the session to study a prerequisite node using Socratic chunking."""
        review_node_id = meta.get("remediation_target", "")
        if not review_node_id:
            return await TutorService._build_reply(
                session_id, meta, "No remediation target set. Type 'test me' to start a diagnostic.", "error", db
            )

        # Fetch the prereq enrichment
        result = await db.execute(
            select(EnrichmentContent).where(EnrichmentContent.node_id == review_node_id)
        )
        prereq_enr = result.scalar_one_or_none()
        if not prereq_enr:
            prereq_title = meta.get("remediation_prereq_title", "the prerequisite")
            return await TutorService._build_reply(
                session_id, meta, f"Could not find content for {prereq_title}. Try 'walkthrough' instead.", "error", db
            )

        # Switch session to the prereq node
        meta["original_node"] = meta["node_id"]
        meta["node_id"] = review_node_id
        meta["remediation_active"] = True
        meta["remediation_node"] = review_node_id

        # Check if this is a cross-subject prerequisite and fetch the reason
        cross_subject_note = ""
        orig_node_id = meta.get("original_node", "")
        if orig_node_id and orig_node_id != review_node_id:
            try:
                orig_result = await db.execute(
                    select(EnrichmentContent).where(EnrichmentContent.node_id == orig_node_id)
                )
                orig_enr = orig_result.scalar_one_or_none()
                if orig_enr and prereq_enr.subject and orig_enr.subject:
                    _SUBJ_NORM = {'phy': 'physics', 'chem': 'chemistry', 'bio': 'biology', 'math': 'maths'}
                    if _SUBJ_NORM.get(prereq_enr.subject.lower(), prereq_enr.subject.lower()) != _SUBJ_NORM.get(orig_enr.subject.lower(), orig_enr.subject.lower()):
                        # Cross-subject — fetch the reason from Neo4j
                        prereqs_with_reasons = await GraphService.get_all_prerequisites(orig_node_id, max_depth=2)
                        for p in prereqs_with_reasons:
                            if p.get("node_id") == review_node_id:
                                reasons = p.get("reasons", [])
                                valid_reasons = [r for r in reasons if r and r.strip()]
                                if valid_reasons:
                                    cross_subject_note = f"\n\n**Why you need this:** {valid_reasons[0]}"
                                break
                        # Fallback: use the static cross-subject reason mapping
                        if not cross_subject_note:
                            reason = get_cross_subject_reason(orig_node_id, review_node_id)
                            if reason:
                                cross_subject_note = f"\n\n**Why you need this:** {reason}"
            except Exception:
                pass

        # If no cross-subject reason was found, try prerequisite_reasons
        # from the graph (same-subject pedagogical reason).
        if not cross_subject_note and orig_node_id:
            try:
                graph_fields = await GraphService.get_node_enrichment_fields(orig_node_id)
                prereq_reasons_map = graph_fields.get("prerequisite_reasons", {})
                if prereq_reasons_map and review_node_id in prereq_reasons_map:
                    reason = prereq_reasons_map[review_node_id]
                    if reason:
                        cross_subject_note = f"\n\n**Why you need this:** {reason}"
            except Exception:
                pass

        # Use Socratic chunking for the walkthrough if available
        walkthrough = prereq_enr.text_walkthrough or ""
        if walkthrough and len(walkthrough) > 500:
            # Chunk the walkthrough and start Socratic teaching
            chunks = chunk_walkthrough(walkthrough)
            meta["socratic_chunks"] = [
                {
                    "index": c.index,
                    "content": c.content,
                    "checkpoint_question": c.checkpoint_question,
                    "checkpoint_answer_keywords": c.checkpoint_answer_keywords,
                    "is_last": c.is_last,
                }
                for c in chunks
            ]
            meta["socratic_current"] = 0
            meta["phase"] = "socratic"
            first_chunk = chunks[0]
            content = (
                f"**Remediation: {prereq_enr.title}**\n\n"
                f"You need to review this prerequisite before continuing. "
                f"Let's go through it step by step.{cross_subject_note}\n\n"
                f"{first_chunk.content}"
            )
            if first_chunk.checkpoint_question:
                content += f"\n\n**Checkpoint:** {first_chunk.checkpoint_question}"
            content += (
                f"\n\n*(Type your answer, or 'next' to skip, 'back' to revisit, "
                f"'simplify' for a simpler explanation)*"
            )
            return await TutorService._build_reply(session_id, meta, content, "remediation_start", db)
        else:
            # Short content — show directly
            meta["phase"] = "teach"
            definition = prereq_enr.definition or "Let's start with the basics."
            content = (
                f"**Remediation: {prereq_enr.title}**\n\n"
                f"You need to review this prerequisite before continuing.\n\n"
                f"{definition}\n\n"
                f"Want me to:\n"
                f"• Walk you through it? (type 'walkthrough')\n"
                f"• Explain simply? (type 'simplify')\n"
                f"• Test you on it? (type 'test me')\n\n"
                f"When you're ready, type 'back' to return to the original topic."
            )
            return await TutorService._build_reply(session_id, meta, content, "remediation_start", db)

    # ------------------------------------------------------------------ #
    # Notes handler — fetch from dedicated note files
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _handle_notes(
        session_id: str, meta: dict, enrichment: EnrichmentContent,
        db: AsyncSession, note_type: str
    ) -> dict:
        """Fetch dedicated note content for the current topic."""
        node_id = meta.get("node_id", "")
        keywords = await notes_service.get_topic_keywords(db, node_id)

        content = None
        label = ""

        if note_type == "misconceptions":
            content = await notes_service.get_topic_misconceptions(db, node_id, keywords)
            if not content:
                content = enrichment.common_misconception or "No topic-specific misconceptions found."
            label = "Topic-Specific Misconceptions"

        elif note_type == "silly_mistakes":
            content = await notes_service.get_silly_mistakes(db, node_id, keywords)
            label = "Silly Mistakes Checklist"

        elif note_type == "worked_examples":
            content = await notes_service.get_worked_examples(db, node_id, keywords)
            if not content:
                content = enrichment.examples or "No worked examples found."
            label = "Worked Examples"

        elif note_type == "formula":
            content = await notes_service.get_formula_bank(db, node_id, keywords)
            derivations = await notes_service.get_formula_derivations(db, node_id, keywords)
            if derivations:
                content = (content or "") + "\n\n---\n\n**Formula Derivations:**\n\n" + derivations
            label = "Formula Bank"

        elif note_type == "revision":
            summary = await notes_service.get_summary(db, node_id)
            sheet = await notes_service.get_revision_sheet(db, node_id, keywords)
            parts = []
            if summary:
                parts.append(f"**Quick Summary:**\n\n{summary}")
            if sheet:
                parts.append(f"**Revision Sheet:**\n\n{sheet}")
            content = "\n\n---\n\n".join(parts) if parts else "No revision content found."
            label = "Revision"

        elif note_type == "quick_revision":
            content = await notes_service.get_quick_revision_cards(db, node_id, keywords)
            label = "Quick Revision Cards"

        elif note_type == "exam_tips":
            technique = await notes_service.get_exam_technique(db, node_id, keywords)
            high_yield = await notes_service.get_high_yield_guide(db, node_id, keywords)
            parts = []
            if technique:
                parts.append(f"**Exam Technique:**\n\n{technique}")
            if high_yield:
                parts.append(f"**High-Yield Guide:**\n\n{high_yield}")
            content = "\n\n---\n\n".join(parts) if parts else "No exam technique content found."
            label = "Exam Tips"

        elif note_type == "real_world":
            content = await notes_service.get_real_world_applications(db, node_id, keywords)
            label = "Real-World Applications"

        elif note_type == "solution_template":
            content = await notes_service.get_solution_template(db, node_id, keywords)
            label = "Solution Template"

        if not content:
            content = f"No {label.lower()} available for this topic."

        # Clean internal IDs and metadata from student-visible content
        content = notes_service._clean_internal_ids(content)

        # Prepend a header
        content = f"**{label}**\n\n{content}"

        # If content is very long (over 3500 chars), chunk it via Socratic
        # so the student isn't overwhelmed with a wall of text
        if len(content) > 3500 and note_type not in ("silly_mistakes", "quick_revision"):
            chunks = chunk_walkthrough(content)
            if chunks and len(chunks) > 1:
                meta["socratic_chunks"] = [
                    {
                        "index": c.index,
                        "content": c.content,
                        "checkpoint_question": c.checkpoint_question,
                        "checkpoint_answer_keywords": c.checkpoint_answer_keywords,
                        "is_last": c.is_last,
                    }
                    for c in chunks
                ]
                meta["socratic_current"] = 0
                meta["phase"] = "socratic"
                first = chunks[0]
                chunk_content = first.content
                if first.checkpoint_question:
                    chunk_content += f"\n\n---\n\n**Checkpoint:** {first.checkpoint_question}\n\nType your answer, or 'next' to skip:"
                return await TutorService._build_reply(
                    session_id, meta, chunk_content, f"notes_{note_type}_chunked", db
                )

        return await TutorService._build_reply(session_id, meta, content, f"notes_{note_type}", db)

    # ------------------------------------------------------------------ #
    # SRS Flashcards — spaced repetition review
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _handle_flashcards(
        session_id: str, meta: dict, enrichment: EnrichmentContent, db: AsyncSession,
    ) -> dict:
        """Serve SRS flashcards for the current topic.

        If the student said "flashcard quiz", starts an interactive quiz mode
        where they see the front, guess, then see the back.
        Otherwise, shows Q&A pairs for quick review.
        """
        node_id = meta.get("node_id", "")
        keywords = await notes_service.get_topic_keywords(db, node_id)

        # Check if this is a quiz request (interactive mode)
        last_msg = meta.get("messages", [{}])[-1] if meta.get("messages") else {}
        last_text = (last_msg.get("content", "") if last_msg else "").lower()

        if "quiz" in last_text:
            # Start interactive flashcard quiz
            cards = await notes_service.get_flashcard_quiz(db, node_id, keywords, num_cards=5)
            if cards:
                meta["flashcard_quiz"] = {
                    "cards": cards,
                    "current": 0,
                    "results": [],
                }
                meta["phase"] = "flashcard_quiz"
                first_card = cards[0]
                content = (
                    f"**Flashcard Quiz — Card 1 of {len(cards)}** "
                    f"({first_card.get('cognitive_level', 'review')})\n\n"
                    f"**Q:** {first_card['front']}\n\n"
                    f"Type your answer, or 'show answer' to reveal it."
                )
                return await TutorService._build_reply(session_id, meta, content, "flashcard_quiz_start", db)

        # Default: show Q&A pairs
        content = await notes_service.get_flashcards(db, node_id, keywords, limit=8)

        if not content:
            content = (
                "No flashcards available for this topic yet. "
                "Try 'quick revision' for revision cards, or 'walkthrough' to study the concept."
            )

        content += "\n\n---\n\n*Type **flashcard quiz** for an interactive quiz — you guess, then I reveal the answer.*"
        return await TutorService._build_reply(session_id, meta, content, "flashcards", db)

    # ------------------------------------------------------------------ #
    # SM-2 update from flashcard quiz results
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _update_sm2_from_quiz(meta: dict, results: list):
        """Feed flashcard quiz results into SM-2 spaced repetition scheduling."""
        try:
            from backend.services.spiral_service import SpiralService
            for r in results:
                # SM-2 quality: 5 if correct, 2 if skipped, 1 if wrong
                quality = 5 if r.get("correct") else (2 if r.get("skipped") else 1)
                card_id = r.get("card", "")[:50]
                await SpiralService.add_review_item(
                    user_id=meta.get("user_id", ""),
                    node_id=meta.get("node_id", ""),
                    item_type="flashcard",
                    item_id=card_id,
                    quality=quality,
                )
        except Exception:
            pass  # SM-2 is a nice-to-have, don't fail the quiz

    # ------------------------------------------------------------------ #
    # Guided practice — student solves a worked example step by step
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _handle_guided_practice(
        session_id: str, meta: dict, enrichment: EnrichmentContent, db: AsyncSession,
    ) -> dict:
        """Serve a guided practice problem where the student fills in key steps.

        Uses the enrichment's examples or diagnostic questions as practice,
        but instead of just testing, it scaffolds the student through each step.
        """
        node_id = meta.get("node_id", "")
        keywords = await notes_service.get_topic_keywords(db, node_id)

        # Try to get a worked example
        examples_text = await notes_service.get_worked_examples(db, node_id, keywords)

        if not examples_text or len(examples_text) < 50:
            # Fall back to using the first diagnostic question as guided practice
            diag = enrichment.diagnostic_questions or []
            if diag:
                q = diag[0]
                content = (
                    f"**Guided Practice**\n\n"
                    f"Let's work through this together step by step.\n\n"
                    f"**Question:** {q.get('question', '')}\n\n"
                    f"**Step 1:** Before we solve, what concept do you think applies here? "
                    f"Type the name of the concept or formula you'd use."
                )
                meta["guided_practice"] = {
                    "question": q.get("question", ""),
                    "answer": q.get("answer", ""),
                    "step": 1,
                    "steps_total": 3,
                }
                meta["phase"] = "guided_practice"
                return await TutorService._build_reply(
                    session_id, meta, content, "guided_practice_start", db
                )
            return await TutorService._build_reply(
                session_id, meta,
                "No practice problems available for this topic yet. "
                "Type 'test me' for a diagnostic, or 'walkthrough' to learn the concept.",
                "guided_practice_empty", db
            )

        # Use the worked example as guided practice
        content = (
            f"**Guided Practice**\n\n"
            f"Here's a worked example. Let's solve it together.\n\n"
            f"{examples_text[:600]}\n\n"
            f"**Your turn:** What's the first step you would take to solve this? "
            f"Type your answer, or 'show solution' to see the full solution."
        )
        meta["guided_practice"] = {"step": 1, "steps_total": 3}
        meta["phase"] = "guided_practice"
        return await TutorService._build_reply(
            session_id, meta, content, "guided_practice_start", db
        )

    # ------------------------------------------------------------------ #
    # Topic browsing — list chapters/topics for current subject + class
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _handle_topic_browse(db: AsyncSession, meta: dict) -> Optional[str]:
        """List available topics for the current subject and class level."""
        subject = meta.get("subject", "")
        class_level = meta.get("class_level", 0)
        if not subject or not class_level:
            return None

        # Normalize subject names — DB uses 'maths', 'physics', 'chem', 'bio'
        # but sessions may use 'math', 'phy', etc.
        _SUBJ_ALIASES = {
            'math': 'maths', 'maths': 'maths', 'mathematics': 'maths',
            'phy': 'physics', 'physics': 'physics',
            'chem': 'chem', 'chemistry': 'chem',
            'bio': 'bio', 'biology': 'bio',
        }
        db_subject = _SUBJ_ALIASES.get(subject.lower(), subject)

        try:
            result = await db.execute(
                select(EnrichmentContent).where(
                    and_(
                        EnrichmentContent.subject == db_subject,
                        EnrichmentContent.class_level == class_level,
                    )
                ).order_by(EnrichmentContent.chapter).limit(30)
            )
            nodes = result.scalars().all()
        except Exception:
            return None
        if not nodes:
            return f"No topics found for {subject} Class {class_level}."

        # Group by chapter
        chapters = {}
        for node in nodes:
            ch = node.chapter or "General"
            if ch not in chapters:
                chapters[ch] = []
            chapters[ch].append(node)

        lines = [f"**Topics for {subject.title()} — Class {class_level}**\n"]
        for ch_name in sorted(chapters.keys()):
            lines.append(f"**{ch_name}**")
            for node in chapters[ch_name][:8]:
                lines.append(f"  • {node.title}")
            lines.append("")

        lines.append(
            f"Type a topic name and I'll start teaching it. "
            f"You can also type **walkthrough** to learn the current topic, "
            f"or **where do I start** for a recommended learning path."
        )
        return "\n".join(lines)

    # ------------------------------------------------------------------ #
    # Learning path — show prerequisites and recommended order
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _handle_learning_path(
        db: AsyncSession, meta: dict, enrichment: EnrichmentContent,
    ) -> Optional[str]:
        """Show the prerequisite chain for the current topic."""
        node_id = meta.get("node_id", "")
        if not node_id:
            return None

        title = enrichment.title if enrichment else node_id

        # Get prerequisites from the graph
        try:
            prereqs = await GraphService.get_all_prerequisites(node_id, max_depth=3)
        except Exception:
            prereqs = []

        # Also get prereq_ids from enrichment
        prereq_ids = enrichment.prereq_ids or [] if enrichment else []
        depth_prereq_ids = enrichment.depth_prereq_ids or [] if enrichment else []

        lines = [f"**Learning Path for: {title}**\n"]

        if prereqs:
            lines.append("Here's what you should know before this topic:\n")
            for p in prereqs[:10]:
                p_title = p.get("topic", p.get("node_id", ""))
                p_depth = p.get("depth", 0)
                indent = "  " * p_depth
                lines.append(f"{indent}• {p_title}")
            lines.append("")
        elif prereq_ids:
            lines.append("Here's what you should know before this topic:\n")
            for pid in prereq_ids[:10]:
                # Try to get the title
                try:
                    p_result = await db.execute(
                        select(EnrichmentContent).where(EnrichmentContent.node_id == pid)
                    )
                    p_enr = p_result.scalar_one_or_none()
                    p_title = p_enr.title if p_enr else pid
                except Exception:
                    p_title = pid
                lines.append(f"  • {p_title}")
            lines.append("")
        else:
            lines.append("This topic doesn't have specific prerequisites — you can start here directly!\n")

        # Wire in cross-subject prerequisites from the graph — these are
        # prerequisites from OTHER subjects (e.g. maths needed for physics)
        # with human-readable reasons explaining the cross-subject link.
        try:
            graph_fields = await GraphService.get_node_enrichment_fields(node_id)
            cs_prereqs = graph_fields.get("cross_subject_prereqs", [])
            cs_reasons = graph_fields.get("cross_subject_reasons", {})
            if cs_prereqs:
                lines.append("**Cross-subject prerequisites:**\n")
                for cs_pid in cs_prereqs[:5]:
                    # Try to get the title from enrichment
                    try:
                        cs_result = await db.execute(
                            select(EnrichmentContent).where(EnrichmentContent.node_id == cs_pid)
                        )
                        cs_enr = cs_result.scalar_one_or_none()
                        cs_title = cs_enr.title if cs_enr else cs_pid
                        cs_subject = cs_enr.subject if cs_enr else ""
                    except Exception:
                        cs_title = cs_pid
                        cs_subject = ""
                    subject_label = f" ({cs_subject})" if cs_subject else ""
                    reason = cs_reasons.get(cs_pid)
                    if reason:
                        lines.append(f"  • {cs_title}{subject_label} — _{reason}_")
                    else:
                        lines.append(f"  • {cs_title}{subject_label}")
                lines.append("")
        except Exception:
            pass

        lines.append(
            f"**Your next steps:**\n"
            f"• Type **walkthrough** to learn {title} step by step\n"
            f"• Type **eli5** for a simple analogy\n"
            f"• Type **review** to study a prerequisite first"
        )
        return "\n".join(lines)

    # ------------------------------------------------------------------ #
    # Progress check — show what the student has learned
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _handle_progress_check(db: AsyncSession, meta: dict) -> Optional[str]:
        """Show the student's progress on the current topic and related topics."""
        node_id = meta.get("node_id", "")
        subject = meta.get("subject", "")
        class_level = meta.get("class_level", 0)

        # Count messages in this session as engagement
        msg_count = len(meta.get("messages", []))
        diag_results = meta.get("diag_results", {})
        diag_failed = meta.get("diag_failed", [])

        lines = ["**Your Progress So Far**\n"]

        # Session engagement
        lines.append(f"**This session:** {msg_count} messages exchanged")
        if diag_results:
            total_qs = len(diag_results)
            correct_qs = sum(1 for r in diag_results.values() if r.get("correct"))
            lines.append(f"**Diagnostic:** {correct_qs}/{total_qs} questions correct")
            if diag_failed:
                lines.append(f"**Needs work:** Questions {', '.join(str(q) for q in diag_failed)}")
        else:
            lines.append("**Diagnostic:** Not taken yet — type 'test me' to check your understanding")
        lines.append("")

        # Show what's available
        lines.append(
            f"**What you can do next:**\n"
            f"• Type **test me** to assess your understanding\n"
            f"• Type **flashcards** for quick review\n"
            f"• Type **drill** for exam-level practice\n"
            f"• Type **walkthrough** to study step by step"
        )
        return "\n".join(lines)

    # ------------------------------------------------------------------ #
    # Structured solver flow — for calculation questions
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _start_solver(
        session_id: str, meta: dict, enrichment: EnrichmentContent, db: AsyncSession,
    ) -> dict:
        """Connect the tutor to the structured solver.

        Shows the student available problem types for their current topic
        and guides them to the solver interface.
        """
        from backend.ai.problem_types import get_all_problem_types

        node_id = meta.get("node_id", "")
        # Extract class level and subject from node_id (e.g. "c12_phy_064" → class 12, physics)
        class_level = None
        subject = None
        if node_id.startswith("c") and "_" in node_id:
            parts = node_id.split("_")
            if len(parts) >= 2:
                try:
                    class_level = int(parts[0][1:])
                except ValueError:
                    pass
                subj_code = parts[1]
                subject_map = {"phy": "Physics", "chem": "Chemistry", "bio": "Biology", "math": "Maths"}
                subject = subject_map.get(subj_code, "")

        # Get problem types for this class level
        all_types = get_all_problem_types()
        relevant = [p for p in all_types if p.class_level == class_level] if class_level else []

        if not relevant:
            # Show all types grouped by category
            content = (
                "**Structured Solver**\n\n"
                "I can help you solve calculation problems step by step.\n\n"
                "Pick a problem type from the solver panel (the calculator icon in the sidebar), "
                "input your variables, and I'll show you the worked solution with every step.\n\n"
                "No guessing — you tell me what you know, and the math engine does the rest.\n\n"
                "Type 'walkthrough' to learn the concept first, or 'test me' to practice."
            )
        else:
            # List relevant problem types
            type_list = "\n".join(
                f"• **{p.name}** — {p.description[:80]}"
                for p in relevant[:8]
            )
            content = (
                f"**Structured Solver — Class {class_level} {subject}**\n\n"
                "I can solve these types of problems step by step. "
                "Pick one from the solver panel (calculator icon):\n\n"
                f"{type_list}\n\n"
                "Or tell me what you want to calculate, and I'll find the right problem type.\n\n"
                "Type 'walkthrough' to learn the concept first, or 'test me' to practice."
            )

        return await TutorService._build_reply(session_id, meta, content, "solver_start", db)

    # ------------------------------------------------------------------ #
    # Drill flow — tiered practice
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _start_drill(
        session_id: str, meta: dict, enrichment: EnrichmentContent, db: AsyncSession,
    ) -> dict:
        """Start a drill session for the current node.

        Tries board questions first, falls back to enrichment diagnostic
        questions (which always have answers) if no topic-specific board
        questions are found.
        """
        node_id = meta["node_id"]
        subject = meta.get("subject", enrichment.subject if enrichment else "")
        class_level = meta.get("class_level", enrichment.class_level if enrichment else 0)

        # Wire in diagnostic_level — adapt the starting tier to the topic's
        # cognitive level.  A topic with diagnostic_level="evaluate" starts
        # at EXAM tier instead of BASIC, since the student is expected to
        # be at a higher level.  BASIC is still the safe default.
        diag_level = getattr(enrichment, "diagnostic_level", "") or "reasoning"
        start_tier = _tier_for_level(diag_level)

        result = await DrillService.start_drill(db, node_id, subject, class_level, tier=start_tier)

        if not result.get("started"):
            # Fallback: use enrichment diagnostic questions as drill questions
            diag_qs = enrichment.diagnostic_questions or []
            if diag_qs:
                # Use diagnostic questions as drill questions at the adaptive tier
                from backend.services.drill_service import DrillService as DS, DrillSession, DrillQuestion
                drill_qs = [
                    DrillQuestion(
                        question_id=f"diag_{enrichment.node_id}_{q.get('number', i)}",
                        question_text=q.get("question", ""),
                        tier=start_tier,
                        marks=1,
                        correct_answer=q.get("answer", ""),
                        model_answer=q.get("answer", ""),
                        marking_scheme="",
                        node_tags=[enrichment.node_id],
                    )
                    for i, q in enumerate(diag_qs)
                ]
                session = DrillSession(
                    node_id=node_id,
                    subject=subject,
                    class_level=class_level,
                    current_tier=start_tier,
                    current_index=0,
                    questions=drill_qs,
                    tier_scores={},
                )
                drill_sid = f"drill_{node_id}_{start_tier}_{id(session)}"
                from backend.services.drill_service import _DRILL_SESSIONS
                _DRILL_SESSIONS[drill_sid] = session

                meta["drill_session_id"] = drill_sid
                meta["phase"] = "drill"
                meta["drill_tier"] = start_tier
                meta["drill_current"] = 1
                meta["drill_total"] = len(drill_qs)

                # Explain why this tier was chosen
                tier_note = ""
                if start_tier != "BASIC":
                    tier_note = (
                        f"\n_(Starting at {start_tier} tier — "
                        f"this topic is at {diag_level} level.)_\n"
                    )

                content = (
                    f"**Drill Practice: {enrichment.title if enrichment else node_id}**\n\n"
                    f"Tier: **{start_tier}** ({len(drill_qs)} questions)\n"
                    f"{tier_note}"
                    f"Pass 80% to advance.\n\n"
                    f"**Question 1:**\n\n{drill_qs[0].question_text}\n\n"
                    f"Type your answer. Type 'hint' for a clue, or 'show answer' to see the answer:"
                )
                return await TutorService._build_reply(session_id, meta, content, "drill_start", db)

            content = result.get("message", "No drill questions available. Try 'test me' for diagnostic questions.")
            return await TutorService._build_reply(session_id, meta, content, "drill_unavailable", db)

        # Store drill session ID in meta
        meta["drill_session_id"] = result["session_id"]
        meta["phase"] = "drill"
        meta["drill_tier"] = "BASIC"
        meta["drill_current"] = result.get("current_question", 1)
        meta["drill_total"] = result.get("total_questions", 5)

        content = (
            f"**Drill Practice: {enrichment.title if enrichment else node_id}**\n\n"
            f"Tier: **BASIC** ({result['total_questions']} questions)\n"
            f"Pass 80% to advance to EXAM tier.\n\n"
            f"**Question 1:**\n\n{result['question']}\n\n"
            f"Type your answer. Type 'hint' for a clue, or 'show answer' to see the answer:"
        )
        return await TutorService._build_reply(session_id, meta, content, "drill_start", db)

    # ------------------------------------------------------------------ #
    # Build reply
    # ------------------------------------------------------------------ #
    @staticmethod
    async def _build_reply(
        session_id: str,
        meta: dict,
        content: str,
        reply_type: str,
        db: AsyncSession,
    ) -> dict:
        """Build the reply dict and update session metadata.

        XP is tracked in-session and reported to the frontend.
        Mastery/BKT updates to the DB are deferred until the UUID/string
        mismatch in ProgressService is resolved.
        """
        # Clean internal IDs and metadata from ALL student-visible content
        content = _clean_student_content(content)

        meta["messages"].append(
            {
                "role": "tutor",
                "content": content,
                "type": reply_type,
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }
        )
        meta["enrichment_served"].append(reply_type)

        # Include diagnostic state in the reply for frontend consumption
        diag_state = None
        phase = meta.get("phase", "teach")

        if phase == "socratic":
            diag_state = {
                "phase": "socratic",
                "socratic_current": meta.get("socratic_current", -1),
                "socratic_total": len(meta.get("socratic_chunks", [])),
                "remediation_active": False,
                "remediation_node": None,
                "drill_tier": None,
                "drill_current": 0,
                "drill_total": 0,
            }
        elif phase == "diagnostic" or reply_type.startswith("diagnostic"):
            # Get total questions from meta or fetch from DB
            total_q = meta.get("diag_total_questions", 0)
            if not total_q:
                # Try to fetch from enrichment
                enr_result = await db.execute(
                    select(EnrichmentContent).where(EnrichmentContent.node_id == meta["node_id"])
                )
                enr = enr_result.scalar_one_or_none()
                if enr and enr.diagnostic_questions:
                    total_q = len(enr.diagnostic_questions)
                    meta["diag_total_questions"] = total_q
            # Build Bloom scorecard from results
            bloom_scorecard = {}
            for q_num, res in meta.get("diag_results", {}).items():
                cog = res.get("cognitive_type", "unknown")
                if cog not in bloom_scorecard:
                    bloom_scorecard[cog] = {"correct": 0, "total": 0}
                bloom_scorecard[cog]["total"] += 1
                if res.get("correct"):
                    bloom_scorecard[cog]["correct"] += 1
            diag_state = {
                "phase": phase,
                "current_question": meta.get("diag_current_q", 0),
                "total_questions": total_q,
                "answered": len(meta.get("diag_answers", {})),
                "failed": meta.get("diag_failed", []),
                "results": meta.get("diag_results", {}),
                "bloom_scorecard": bloom_scorecard if bloom_scorecard else None,
                "remediation_active": meta.get("remediation_active", False),
                "remediation_node": meta.get("remediation_node"),
                "drill_tier": None,
                "drill_current": 0,
                "drill_total": 0,
            }
        elif phase == "drill":
            diag_state = {
                "phase": "drill",
                "drill_tier": meta.get("drill_tier", "BASIC"),
                "drill_current": meta.get("drill_current", 0),
                "drill_total": meta.get("drill_total", 0),
                "remediation_active": False,
                "remediation_node": None,
            }
        elif meta.get("remediation_active"):
            diag_state = {
                "phase": "remediate",
                "remediation_active": True,
                "remediation_node": meta.get("remediation_node"),
                "drill_tier": None,
                "drill_current": 0,
                "drill_total": 0,
            }
        else:
            # Teach phase — include minimal state
            diag_state = {
                "phase": phase,
                "remediation_active": False,
                "remediation_node": None,
                "drill_tier": None,
                "drill_current": 0,
                "drill_total": 0,
            }

        # Persist mutated meta so other workers/replicas can continue
        # this session (messages, phase, diagnostic/drill state).
        await _meta_put(session_id, meta)

        # U-LANE LABEL (Layer U2, BATCH_BRIEF §4B): ONE honesty enum on
        # every answer surface.  kind->label: "solution"/"confirm_values"
        # are deterministic-solver outputs (VERIFIED); node-content serves
        # (eli5/glossary/walkthrough/banks) are GROUNDED; the LLM tier is
        # AI; guidance/hints carry NONE.  The prose suffixes stay for
        # readability; THIS field is what UIs render.
        try:
            from backend.services.answer_lane import AnswerLabel, stamp
            _lane_map = {
                "solution": AnswerLabel.VERIFIED,
                "confirm_values": AnswerLabel.VERIFIED,
                "llm_fallback": AnswerLabel.AI,
                "eli5": AnswerLabel.GROUNDED,
                "glossary": AnswerLabel.GROUNDED,
                "topic_browse": AnswerLabel.GROUNDED,
                "learning_path": AnswerLabel.GROUNDED,
                "walkthrough": AnswerLabel.GROUNDED,
                "flashcard_quiz_reveal": AnswerLabel.GROUNDED,
                "guided_practice_solution": AnswerLabel.GROUNDED,
            }
            reply = {
                "session_id": session_id,
                "reply": {
                    "role": "tutor",
                    "content": content,
                    "type": reply_type,
                    "misconception_detected": "yes" if reply_type == "remediation" else None,
                    "prerequisite_gap": meta.get("remediation_target"),
                    "diagnostic_state": diag_state,
                },
                "updated_mastery": None,
            }
            _lane_label = _lane_map.get(reply_type, AnswerLabel.NONE)
            if _lane_label is not AnswerLabel.NONE:
                stamp(reply["reply"], "tutor_rest", _lane_label, reply_type)
            return reply
        except Exception:
            pass

        return {
            "session_id": session_id,
            "reply": {
                "role": "tutor",
                "content": content,
                "type": reply_type,
                "misconception_detected": "yes" if reply_type == "remediation" else None,
                "prerequisite_gap": meta.get("remediation_target"),
                "diagnostic_state": diag_state,
            },
            "updated_mastery": None,
        }

    # ------------------------------------------------------------------ #
    # Session management
    # ------------------------------------------------------------------ #
    @staticmethod
    async def get_session(db: AsyncSession, session_id: str, user_id: str = "") -> dict:
        """Return the full session state including message history."""
        meta = await _meta_get(session_id)
        if meta is None:
            raise ValueError(f"Tutor session '{session_id}' not found")

        result = await db.execute(
            select(StudySession).where(StudySession.id == session_id)
        )
        session = result.scalar_one_or_none()
        if session is None:
            raise ValueError(f"StudySession '{session_id}' not found")

        return {
            "session_id": session_id,
            "node_id": meta["node_id"],
            "topic": meta["topic"],
            "subject": meta.get("subject"),
            "class_level": meta.get("class_level"),
            "messages": meta["messages"],
            "misconceptions": meta["misconceptions"],
            "enrichment_served": meta.get("enrichment_served", []),
            "started_at": session.started_at.isoformat() if session.started_at else None,
            "ended_at": session.ended_at.isoformat() if session.ended_at else None,
            "xp_earned": session.xp_earned,
        }

    @staticmethod
    async def get_user_sessions(db: AsyncSession, user_id: str) -> list[dict]:
        """Return all tutor sessions for a user."""
        result = await db.execute(
            select(StudySession)
            .where(StudySession.user_id == user_id)
            .order_by(StudySession.started_at.desc())
        )
        sessions = list(result.scalars().all())
        out = []
        for session in sessions:
            sid = str(session.id)
            meta = await _meta_get(sid) or {}
            out.append({
                "session_id": sid,
                "node_id": meta.get("node_id"),
                "topic": meta.get("topic"),
                "subject": meta.get("subject"),
                "started_at": session.started_at.isoformat() if session.started_at else None,
                "ended_at": session.ended_at.isoformat() if session.ended_at else None,
                "xp_earned": session.xp_earned,
                "message_count": len(meta.get("messages", [])),
            })
        return out

    @staticmethod
    async def end_session(db: AsyncSession, session_id: str, user_id: str = "") -> dict:
        """End a tutor session."""
        meta = await _meta_get(session_id)
        if meta is None:
            raise ValueError(f"Tutor session '{session_id}' not found")

        result = await db.execute(
            select(StudySession).where(StudySession.id == session_id)
        )
        session = result.scalar_one_or_none()
        if session is None:
            raise ValueError(f"StudySession '{session_id}' not found")

        now = datetime.now(timezone.utc)
        session.ended_at = now
        if session.started_at is not None:
            session.duration_seconds = int((now - session.started_at).total_seconds())
        session.questions_answered = len(
            [m for m in meta["messages"] if m["role"] == "student"]
        )

        await db.flush()
        await db.refresh(session)

        return {
            "session_id": session_id,
            "ended_at": now.isoformat(),
            "duration_seconds": session.duration_seconds,
            "questions_answered": session.questions_answered,
            "enrichment_served": meta.get("enrichment_served", []),
            "misconceptions_count": len(meta["misconceptions"]),
        }

    @staticmethod
    async def get_hint(db: AsyncSession, session_id: str, user_id: str = "") -> dict:
        """Generate a hint for the current session."""
        meta = await _meta_get(session_id)
        if meta is None:
            raise ValueError(f"Tutor session '{session_id}' not found")

        result = await db.execute(
            select(EnrichmentContent).where(
                EnrichmentContent.node_id == meta["node_id"]
            )
        )
        enrichment = result.scalar_one_or_none()

        if enrichment:
            # Serve the ELI5 as a hint, or the first ON_FAILURE entry
            if enrichment.eli5:
                hint = enrichment.eli5
            elif enrichment.on_failure:
                hint = enrichment.on_failure[0].get("remediation_text", "Review the basics.")
            else:
                hint = "Review the definition and try again."
        else:
            hint = "Review the core concepts."

        meta["messages"].append({
            "role": "tutor",
            "content": hint,
            "type": "hint",
            "timestamp": datetime.now(timezone.utc).isoformat(),
        })
        await _meta_put(session_id, meta)

        return {"session_id": session_id, "hint": hint}
