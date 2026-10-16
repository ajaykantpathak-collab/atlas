"""feedback_scrub.py — keep the grader's voice out of student feedback.

Bank rows sometimes carry the GRADER's prose in fields that are served
verbatim: ``correct_answer`` holding "You's diagram is incorrect…"
instead of an answer value, ``explanation`` opening with a verdict
clause ("Your answer is correct.") that can contradict the graded
verdict the student just received.  The scrubs below run at serving
boundaries — grading always sees the raw bank text.

1. ``scrub_answer_key`` — the answer-key field.  A grader-voice opener
   means the field holds commentary, not an answer value: serve ""
   (front ends render their own examiner-note path when the key is
   empty).  There is deliberately NO length rule — long answers are
   legit; only the voice is detected.

2. ``scrub_explanation`` — the explanation field, served post-answer.
   When the verdict is wrong, a leading verdict-asserting clause
   ("Your answer is correct.", a bare "Correct.") contradicts the
   outcome the student just saw: strip ONLY that clause and keep the
   teaching content after it.  A correct verdict leaves the
   explanation untouched.

3. ``has_grader_voice`` — the no-verdict surface: question-serving
   payloads that ship an explanation before grading.  With no verdict
   to judge contradiction against, only the opener is detected; the
   caller decides whether to withhold the field.

practice.submit_answer's ``_clean_feedback`` sits on top of these and
keeps its own >80-char rule — that display context wants a short key.
"""

from __future__ import annotations

import re
from typing import Any

# Grader-voice openers: "You's…", "Your…", "The student…", or a bare
# "Correct."/"Incorrect." — meta-narration about an attempt, never an
# answer value.
_GRADER_VOICE_RE = re.compile(
    r"^(you('|'?s)?\b|your\b|the student\b|correct\.|incorrect\.|wrong\.)",
    re.I)

# A leading "Your answer is correct." / "You's diagram was wrong."-style
# verdict clause (either polarity — it is grader meta-commentary, not
# teaching content).
_VERDICT_CLAUSE_RE = re.compile(
    r"^\s*(?:"
    r"you(?:'re| are| were)\s+(?:correct|incorrect|right|wrong)\b[.!]?\s*"
    r"|(?:you(?:'s|'re| r)?\s+|your\s+|the\s+|this\s+)?"
    r"(?:answer|diagram|working|response|solution|attempt|submission|work)\s+"
    r"(?:is|was|seems|looks)\s+(?:not\s+)?"
    r"(?:correct|incorrect|right|wrong)\b[.!]?\s*)",
    re.I)

# Bare "Correct."/"Right." opener — a direct contradiction when the
# graded verdict is wrong.
_BARE_CORRECT_RE = re.compile(r"^\s*(?:correct|right)[.!]\s*", re.I)


def has_grader_voice(text: Any) -> bool:
    """True when ``text`` opens in the grader's voice."""
    return bool(_GRADER_VOICE_RE.match(str(text or "").strip()))


def _scrub_ids(text: str) -> str:
    """Strip embedded corpus node ids from display text (449 answer-key +
    235 explanation + 902 marking-scheme bank rows embed them —
    2026-10-11 audit). Lazy import keeps this module dependency-free."""
    try:
        from backend.services.compq_bank import scrub_node_ids
        return scrub_node_ids(text)
    except Exception:
        return text


def scrub_answer_key(text: Any) -> str:
    """Serve the answer-key field, or "" when it holds grader prose.

    Only the voice is detected — a long legit answer passes through
    unchanged (the >80-char display rule belongs to the practice
    surface's ``_clean_feedback``, not to the key itself). Node ids are
    stripped — internal ids never reach display text.
    """
    t = str(text or "").strip()
    if t and _GRADER_VOICE_RE.match(t):
        return ""
    return _scrub_ids(t)


def scrub_explanation(text: Any, is_correct: bool) -> str:
    """Serve the explanation field given the graded verdict.

    A wrong verdict + an opening verdict clause ("Your answer is
    correct.") is a contradiction the student can see: strip ONLY that
    clause — the teaching content after it is kept.  A correct verdict
    leaves the explanation untouched.
    """
    ex = str(text or "").strip()
    if ex and not is_correct:
        ex = _VERDICT_CLAUSE_RE.sub("", ex, count=1)
        ex = _BARE_CORRECT_RE.sub("", ex, count=1).strip()
    return _scrub_ids(ex)


# ── Teacher-voice remediation → student voice ─────────────────────────
# Corpus `on_failure.remediation_text` is authored FOR TEACHERS:
# "If a student makes sign errors — use this remediation: 1. Have them
# write the three points vertically… Give them 5 drill problems…"
# Served verbatim it reads like a lesson plan. Rewrite the imperative
# patterns to second-person instructions the child can act on.

_TEACHER_PREFIX_RE = re.compile(
    r"^\s*if\s+(?:a\s+|the\s+)?student\s+makes?\s+(.+?)\s*"
    r"(?:error|mistake|slip)s?[,;:\u2014—\s]*",
    re.I)
_USE_REMEDIATION_RE = re.compile(
    r"(?:use\s+)?this\s+(?:remediation|strategy|approach|fix)[:;.\u2014—\s]*",
    re.I)


def _imperative(m: re.Match) -> str:
    verb = m.group(1).strip()
    return verb[0].upper() + verb[1:] if verb else ""


_REMEDIATION_PATTERNS: list[tuple[re.Pattern, Any]] = [
    # "Have them write…" / "Have the student write…" → "Write…"
    (re.compile(r"\bhave\s+(?:them|the student|him|her|students)\s+(\w+)", re.I),
     _imperative),
    # "Make them write…" / "Make the student write…" → "Write…"
    (re.compile(r"\bmake\s+(?:them|the student|him|her|students)\s+(\w+)", re.I),
     _imperative),
    # "Ask them to compare…" → "Compare…"
    (re.compile(r"\bask\s+(?:them|the student|him|her|students)\s+to\s+(\w+)", re.I),
     _imperative),
    # "Give them 5 drill problems" → "Do 5 drill problems"
    (re.compile(r"\bgive\s+(?:them|the student|him|her|students)\s+", re.I),
     "Do "),
    # "Get them to try" → "Try"
    (re.compile(r"\bget\s+(?:them|the student|him|her|students)\s+to\s+(\w+)", re.I),
     _imperative),
]

_TEACHER_VOICE_LEFTOVER = re.compile(
    r"\b(?:the\s+student|have\s+them|make\s+them|give\s+them|them\s+to\s+(?:try|write|draw|label|read)|their\s+answer|they\s+(?:should|need|must))\b",
    re.I)


def scrub_remediation(text: Any) -> str:
    """Serve remediation_text in the student's voice.

    Rewrites teacher-directed imperatives to second-person instructions.
    If teacher-voice survives the rewrite (unseen phrasing), return "" —
    a generic card title still renders and the student never sees a
    lesson plan addressed to their teacher.
    """
    t = str(text or "").strip()
    if not t:
        return ""
    m = _TEACHER_PREFIX_RE.match(t)
    if m:
        t = ("If you slipped on " + m.group(1).strip() + " — " +
             t[m.end():])
    t = _USE_REMEDIATION_RE.sub("", t).strip()
    for pat, repl in _REMEDIATION_PATTERNS:
        t = pat.sub(repl, t)
    t = re.sub(r"\s{2,}", " ", t).strip()
    t = re.sub(r"^[\s,;:.\u2014—]+", "", t)
    if t:
        t = t[0].upper() + t[1:]
    if _TEACHER_VOICE_LEFTOVER.search(t):
        return ""
    return t
