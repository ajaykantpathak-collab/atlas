"""
discussion_moments.py
Multi-agent discussion moments for active engagement.

This is Addition 3 to the ITS stack. At key conceptual points (after INTRODUCE,
before PROBE_Q1), two AI personas briefly debate a point derived from the
COMMON_MISCONCEPTION field. The student picks a side, then the system reveals
which is correct and why.

This does NOT replace the single-voice tutoring for most nodes. It only triggers
for nodes with rich COMMON_MISCONCEPTION content where a debate is pedagogically
valuable.

Personas:
  - Coach: gives the correct explanation (warm, encouraging)
  - Skeptic: voices the common misconception (confident but wrong)

The debate is FULLY DETERMINISTIC — generated from .bloom.marker content,
no LLM at serve time.
"""

from __future__ import annotations

import logging
import re
import zlib
from typing import Any, Optional

logger = logging.getLogger(__name__)


def _extract_misconception_pairs(text: str) -> list[dict[str, str]]:
    """Extract misconception/truth pairs from COMMON_MISCONCEPTION field.

    The field typically has format:
      1. भ्रम: <misconception>
         सच्चाई: <truth>
      2. भ्रम: <misconception>
         सच्चाई: <truth>

    Or in English:
      1. Misconception: <misconception>
         Truth: <truth>
    """
    pairs: list[dict[str, str]] = []

    # Structured label pairs: myth-labelled lines zipped with the
    # truth-labelled lines that follow them.  (The original single
    # regex with a non-greedy group + optional truth group collapsed
    # every match to one character once the truth label was missing on
    # the same line -- label-line pairing fixes that.)
    label_sets = [
        ("भ्रम", "सच्चाई", "hindi"),
        ("Misconception", "Truth", "english"),
        ("Myth", "Fact", "english"),
    ]
    _LABEL_RE = r"(?:^|\n)\s*(?:\d+[.)]\s*)?{}\s*[:\-]?\s*([^\n]+)"
    for myth_label, truth_label, lang in label_sets:
        myths = [m.group(1).strip() for m in re.finditer(
            _LABEL_RE.format(myth_label), text, re.IGNORECASE)]
        truths = [m.group(1).strip() for m in re.finditer(
            _LABEL_RE.format(truth_label), text, re.IGNORECASE)]
        for i, myth in enumerate(myths):
            if myth:
                pairs.append({
                    "misconception": myth,
                    "truth": truths[i] if i < len(truths) else "",
                    "language": lang,
                })
        if pairs:
            break

    # Fallback: if no structured pairs found, split by numbered items
    if not pairs:
        # Split by "1.", "2.", etc.
        items = re.split(r"\d+\.\s*", text)
        for item in items[1:]:  # Skip text before first number
            item = item.strip()
            if len(item) > 30:
                pairs.append({
                    "misconception": item[:200],
                    "truth": "",
                    "language": "unknown",
                })

    return pairs


def generate_discussion(bloom_marker: dict) -> str | None:
    """Generate a multi-agent discussion moment from a .bloom.marker node.

    Args:
        bloom_marker: Parsed .bloom.marker content.

    Returns:
        Discussion text with Coach vs Skeptic debate, or None if no
        suitable misconception content exists.
    """
    misconception_text = bloom_marker.get("common_misconception", "")
    if len(misconception_text) < 100:
        return None

    pairs = _extract_misconception_pairs(misconception_text)
    if not pairs:
        return None

    # Use the first (most important) misconception pair
    pair = pairs[0]
    misconception = pair["misconception"]
    truth = pair["truth"]

    # If no truth provided, use the definition as the correct view
    if not truth:
        truth = bloom_marker.get("definition", "")[:200]

    # Build the debate
    title = bloom_marker.get("title", bloom_marker.get("node_id", "this topic"))

    content = f"**Discussion Moment: {title}**\n\n"
    content += "Two tutors are discussing this concept. Listen to both sides, "
    content += "then decide who you agree with.\n\n"

    content += "---\n\n"

    # Skeptic voices the misconception
    content += "**🤔 Skeptic:**\n"
    content += f"\"{misconception}\"\n\n"

    # Coach gives the correct explanation
    content += "**👩‍🏫 Coach:**\n"
    content += f"\"{truth}\"\n\n"

    content += "---\n\n"

    content += "**Who do you agree with?**\n"
    content += "  - Type **A** if you agree with the Skeptic\n"
    content += "  - Type **B** if you agree with the Coach\n"
    content += "  - Type **C** if you're not sure\n\n"

    # We don't reveal the answer yet — the state machine will handle the response
    # and transition to PROBE_Q1 after the student picks a side
    content += "_(We'll reveal who was right after you choose.)_"

    return content


def generate_discussion_reveal(
    bloom_marker: dict,
    student_choice: str,
) -> str:
    """Generate the reveal after the student picks a side in the discussion.

    Args:
        bloom_marker: Parsed .bloom.marker content.
        student_choice: "A" (Skeptic), "B" (Coach), or "C" (not sure)

    Returns:
        Reveal text showing which side was correct.
    """
    misconception_text = bloom_marker.get("common_misconception", "")
    pairs = _extract_misconception_pairs(misconception_text)
    pair = pairs[0] if pairs else {"misconception": "", "truth": ""}
    misconception = pair["misconception"]
    truth = pair["truth"] or bloom_marker.get("definition", "")[:200]

    choice = student_choice.upper().strip()

    content = "**Discussion Reveal**\n\n"

    if choice == "A":
        # Student agreed with Skeptic (wrong)
        content += f"You agreed with the **Skeptic** — but the **Coach** was right!\n\n"
        content += f"**Why the Skeptic was wrong:**\n{misconception}\n\n"
        content += f"**The correct view:**\n{truth}\n\n"
        content += "This is a common misconception — don't worry, many students think this way. "
        content += "Let's make sure you understand it fully. Time for some questions!\n\n"
    elif choice == "B":
        # Student agreed with Coach (correct)
        content += f"You agreed with the **Coach** — and you're right! 🎉\n\n"
        content += f"**The Coach's explanation:**\n{truth}\n\n"
        content += f"**Why the Skeptic was wrong:**\n{misconception}\n\n"
        content += "Great thinking! Let's test your understanding with some questions.\n\n"
    else:
        # Student wasn't sure
        content += f"Not sure? That's okay — let's clear this up.\n\n"
        content += f"**The Coach was right:**\n{truth}\n\n"
        content += f"**The Skeptic was expressing a common misconception:**\n{misconception}\n\n"
        content += "Now let's test your understanding with some questions.\n\n"

    content += "---\n\n"
    content += "Type **ready** to start the diagnostic questions."

    return content


def should_trigger_discussion(bloom_marker: dict) -> bool:
    """Check if a discussion moment should trigger for this node.

    Triggers when:
      - COMMON_MISCONCEPTION field has at least 100 characters
      - At least one misconception/truth pair can be extracted
    """
    misconception_text = bloom_marker.get("common_misconception", "")
    if len(misconception_text) < 100:
        return False
    pairs = _extract_misconception_pairs(misconception_text)
    return len(pairs) > 0


# --------------------------------------------------------------------------- #
# Prose COMMON_MISCONCEPTION parsing (the dominant corpus format)
# --------------------------------------------------------------------------- #
# The enhanced-nodes corpus (10k+ files, ~90% coverage) authors
# COMMON_MISCONCEPTION as prose: the belief first ("Students believe /
# often think ..."), then the correction ("This is wrong: ...", "This
# stems from ...", "In fact ...").  These helpers split that prose into
# the (claim, correction) pair the debate needs -- deterministically,
# no LLM.

_SENTENCE_END_RE = re.compile(r"[.!?।][\"'”’)]*(?=\s|$)")

#: Sentence-openers that flip the prose from the wrong belief to the
#: correct view.
_CORRECTION_MARKERS = (
    "this is wrong", "this is incorrect", "this is a misconception",
    "this stems from", "this confuses", "this ignores", "this mixes",
    "this happens because", "this is false", "in fact", "in reality",
    "actually", "however", "the truth", "the correct", "correct is",
    "the reason", "why it is wrong", "but this", "सच्चाई", "वास्तव में",
)

#: Sentence-openers that only describe the consequence of the
#: misconception (exam damage control) -- they end the correction.
_CONSEQUENCE_MARKERS = (
    "this misconception leads", "this leads to errors",
    "in board exams", "in exams", "students lose marks",
    "they lose marks", "this causes students", "marks are lost",
)

#: Leading attributions stripped so the claim reads as the belief
#: itself (the student side of the debate speaks in first person).
_BELIEF_ATTR_RE = re.compile(
    r"^\s*(?:\d+[.)]\s*)?(?:भ्रम\s*[:\-]?\s*)?"
    r"(?:students?\s+(?:often|sometimes|usually|generally|frequently|"
    r"commonly|mistakenly)?\s*(?:believe|think|feel|assume|say|claim|argue)"
    r"(?:\s+that)?\s*[:\-]?\s*)",
    re.IGNORECASE,
)

#: Correction openers stripped so the coach side states the correct
#: view positively instead of "This is wrong: ...".
_CORRECTION_ATTR_RE = re.compile(
    r"^\s*(?:\d+[.)]\s*)?"
    r"(?:सच्चाई\s*[:\-]?\s*|truth\s*[:\-]\s*)?"
    r"(?:this\s+is\s+(?:wrong|incorrect|false)[ :,]*|"
    r"this\s+is\s+a\s+misconception[.:]*\s*|"
    r"the\s+correct(?:\s+view|statement)?\s+is\s*[:\-]?\s*)",
    re.IGNORECASE,
)

#: A usable claim/correction side must carry at least this many chars.
_MIN_SIDE_CHARS = 25
#: Sides are clipped to keep the debate card scannable.
_MAX_SIDE_CHARS = 280

#: Curriculum node references embedded by the corpus authors
#: ("(Class 9, c9_chem_ch3_6)") -- machine ids never reach students.
_NODE_REF_RE = re.compile(
    r"\s*\((?:Class\s*\d+\s*,\s*)?[a-z]{1,6}\d{0,2}_[a-z0-9_]{1,40}\)",
    re.IGNORECASE,
)


def _strip_node_refs(text: str) -> str:
    return _NODE_REF_RE.sub("", text or "")


def _clip(text: str, limit: int = _MAX_SIDE_CHARS) -> str:
    text = " ".join(_strip_node_refs(text).split())
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0].rstrip(",;:")
    return cut + " …"


def _split_sentences(text: str) -> list[str]:
    text = " ".join((text or "").split())
    if not text:
        return []
    out: list[str] = []
    start = 0
    for m in _SENTENCE_END_RE.finditer(text):
        out.append(text[start:m.end()].strip())
        start = m.end()
    if start < len(text):
        out.append(text[start:].strip())
    return [s for s in out if s]


def _extract_belief_correction(text: str) -> Optional[dict[str, str]]:
    """Split prose misconception text into a belief/correction pair.

    Returns ``{"misconception": ..., "truth": ...}`` or ``None`` when
    the text carries no recognisable correction turn.
    """
    sentences = _split_sentences(text)
    if len(sentences) < 2:
        return None
    correct_idx = -1
    for i, sentence in enumerate(sentences[1:], start=1):
        low = sentence.lower()
        if any(low.startswith(mk) or mk in low[:80] for mk in _CORRECTION_MARKERS):
            correct_idx = i
            break
    if correct_idx < 1:
        return None
    belief_raw = " ".join(sentences[:correct_idx]).strip()
    # correction ends before consequence/exam-talk sentences
    truth_parts: list[str] = []
    for sentence in sentences[correct_idx:]:
        low = sentence.lower()
        if truth_parts and any(low.startswith(mk) for mk in _CONSEQUENCE_MARKERS):
            break
        truth_parts.append(sentence)
    belief_raw = _BELIEF_ATTR_RE.sub("", belief_raw).strip().strip('"“”').strip()
    # the belief often continues past a closed quotation into analysis
    # ("...only at night.\" The exact wrong reasoning: ...") -- keep the
    # quoted claim, drop the trailing commentary
    for q in ('"', "”"):
        pos = belief_raw.find(q, 1)
        if pos >= _MIN_SIDE_CHARS and len(belief_raw) - pos > 40:
            belief_raw = belief_raw[:pos + 1]
            break
    belief_raw = belief_raw.strip().strip('"“”').strip()
    truth = _CORRECTION_ATTR_RE.sub("", " ".join(truth_parts)).strip()
    if len(belief_raw) < _MIN_SIDE_CHARS or len(truth) < _MIN_SIDE_CHARS:
        return None
    return {"misconception": _clip(belief_raw), "truth": _clip(truth)}


def parse_misconception(text: str) -> Optional[dict[str, str]]:
    """Parse any COMMON_MISCONCEPTION-style text into belief/truth.

    Structured formats first (भ्रम/सच्चाई, Misconception/Truth,
    Myth/Fact, numbered items), then the prose form.  ``None`` when no
    usable pair exists -- the caller stays discussion-free.
    """
    if not text or len(text) < 40:
        return None
    pairs = _extract_misconception_pairs(text)
    for pair in pairs:
        if pair.get("misconception") and len(pair.get("truth") or "") >= _MIN_SIDE_CHARS:
            return {"misconception": _clip(pair["misconception"]),
                    "truth": _clip(pair["truth"])}
    return _extract_belief_correction(text)


# --------------------------------------------------------------------------- #
# Serve-time discussion object ({claimA, claimB, correctIndex, reveal})
# --------------------------------------------------------------------------- #

def build_discussion_object(bloom_marker: dict, seed: str = "") -> Optional[dict]:
    """Build the optional ``discussion`` payload for a serve response.

    Deterministic from the misconception data: same concept -> same
    debate, same correct side.  ``seed`` (the concept id) only flips
    which side speaks first (crc32), so the correct answer is not
    always in the same slot.  Returns ``None`` when the concept has no
    usable misconception -- the key stays absent, the contract is
    backward-compatible, and it never affects marks.
    """
    text = str(bloom_marker.get("common_misconception") or "")
    parsed = parse_misconception(text)
    if parsed is None:
        return None
    misconception = parsed["misconception"]
    truth = parsed["truth"] or _clip(
        str(bloom_marker.get("definition") or ""))[:_MAX_SIDE_CHARS]

    import zlib
    skeptic_first = zlib.crc32(seed.encode("utf-8")) % 2 == 0
    correct_index = 1 if skeptic_first else 0
    claim_a, claim_b = ((misconception, truth) if skeptic_first
                        else (truth, misconception))
    return {
        "claimA": claim_a,
        "claimB": claim_b,
        "correctIndex": correct_index,
        "reveal": truth,
    }


# --------------------------------------------------------------------------- #
# Service facade (consumed by backend/api/quest.py's debate provider)
# --------------------------------------------------------------------------- #

class DiscussionMoment:
    """One debatable node: the debate markdown plus its reveal."""

    def __init__(self, node_id: str, topic: str, text: str, reveal: str):
        self.id = f"debate:{node_id}"
        self.node_id = node_id
        self.topic = topic
        self.text = text
        self.reveal = reveal


class DiscussionMomentsService:
    """Serves a discussion moment for a node (or a deterministic pick).

    Best-effort by contract: every failure returns ``None`` so callers
    (quest composer) simply ship a debate-free day.
    """

    def get_debate_for_node(self, node_id: Optional[str] = None,
                            student_id: str = "") -> Optional[DiscussionMoment]:
        try:
            marker = self._marker_for(node_id)
            if marker is None:
                return None
            text = generate_discussion(marker)
            if not text:
                return None
            reveal = ""
            parsed = parse_misconception(
                str(marker.get("common_misconception") or ""))
            if parsed:
                reveal = parsed["truth"]
            return DiscussionMoment(
                node_id=str(marker.get("node_id") or node_id or ""),
                topic=str(marker.get("title") or "Misconception debate"),
                text=text, reveal=reveal)
        except Exception:                      # debates are never load-bearing
            return None

    def get_reveal(self, node_id: str, student_choice: str) -> Optional[str]:
        try:
            marker = self._marker_for(node_id)
            if marker is None:
                return None
            return generate_discussion_reveal(marker, student_choice)
        except Exception:
            return None

    @staticmethod
    def _marker_for(node_id: Optional[str]) -> Optional[dict]:
        """Bloom-marker dict for ``node_id``, else a stable daily pick."""
        from backend.services.enhanced_nodes import load_index
        index = load_index()
        if node_id:
            node = index.get(node_id)
            return ({**node, "common_misconception":
                     common_misconception_section(node),
                     "title": node.get("node_id")}
                    if node else None)
        # deterministic day-rotated scan: same day -> same debate
        import time as _time
        day = int(_time.strftime("%j"))
        for nid in sorted(index.nodes):
            node = index.nodes[nid]
            section = common_misconception_section(node)
            if section and parse_misconception(section):
                day -= 1
                if day < 0:
                    return {**node, "common_misconception": section,
                            "title": nid}
        return None


_section_cache: dict[str, str] = {}
_section_lock = None


def common_misconception_section(node: dict) -> str:
    """The node's raw COMMON_MISCONCEPTION section (file-backed, cached).

    The enhanced-nodes index keeps core teaching fields only; the
    misconception section is re-read from the node's source file on
    first use and memoised per node.
    """
    global _section_lock
    cached = _section_cache.get(node.get("node_id") or "")
    if cached is not None:
        return cached
    import threading
    if _section_lock is None:
        _section_lock = threading.Lock()
    source = node.get("source_file") or ""
    text = ""
    try:
        from backend.services.enhanced_nodes import get_md_dir, split_sections
        import os
        path = os.path.join(get_md_dir(), source)
        with _section_lock:
            with open(path, "r", encoding="utf-8-sig", errors="replace") as fh:
                text = split_sections(fh.read()).get("COMMON_MISCONCEPTION", "")
    except Exception:
        text = ""
    _section_cache[node.get("node_id") or ""] = text
    return text
