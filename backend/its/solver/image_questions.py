"""image_questions.py — split OCR text from a textbook photo into discrete questions.

A photo of a textbook exercise almost always contains SEVERAL questions.
Solving the concatenated text as one problem produced confidently wrong
merged answers (observed live: two questions -> one garbage "VERIFIED"
answer).  This module segments the OCR text on standard exercise-marker
shapes and returns one clean question string per segment.

Marker shapes recognised at LINE START:
    Q1. / Q1) / Q. 1 / Question 3.      (letter-prefixed)
    1.   / 1)  / 12.                     (bare arabic)
    (a)  / (iv) / vii)                   (parenthesised alpha/roman)
A line that starts with no marker continues the previous question.

Segmentation is deliberately conservative: anything that does not look
like an exercise list is returned as a single segment, so downstream
behaviour for ordinary single-question photos is unchanged.
"""

from __future__ import annotations

import re
from typing import List

_LETTER_PREFIX = r"(?:question|que|q)\s*\.?\s*(?P<qp_num>\d{1,3})\s*[.):\]-]?\s*"
_ARABIC = r"(?P<ar_num>\d{1,3})\s*[.)]\s+"
_ALPHA_PAREN = r"\((?P<al_letter>[a-h])\)\s+"
_ROMAN = r"(?P<rm_num>(?=[ivx])x{0,2}(?:ix|iv|v?i{0,3}))\)\s+"

_MARKER = re.compile(
    rf"^(?:{_LETTER_PREFIX}|{_ARABIC}|{_ALPHA_PAREN}|{_ROMAN})",
    re.IGNORECASE,
)
_MIN_BODY = 12  # shorter tail segments are OCR noise, not questions


def _marker_key(match: re.Match) -> tuple:
    """Ordering key so 1.2-style sub-parts nest rather than restart."""
    if match.group("qp_num") is not None:
        return ("q", int(match.group("qp_num")), "")
    if match.group("ar_num") is not None:
        return ("q", int(match.group("ar_num")), "")
    if match.group("al_letter") is not None:
        return ("sub", 0, match.group("al_letter"))
    return ("sub", 0, match.group("rm_num"))


def split_questions(text: str) -> List[str]:
    """Split OCR text into discrete question strings (order preserved).

    Returns a single-element list when no exercise-marker structure is
    found — callers treat that exactly like the original single question.
    """
    if not text or not text.strip():
        return []
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    segments: List[tuple] = []  # (marker_key or None, [lines])
    for line in lines:
        match = _MARKER.match(line)
        if match is None:
            if segments:
                segments[-1][1].append(line)
            else:
                segments.append((None, [line]))
            continue
        key = _marker_key(match)
        body = line[match.end():].strip()
        if segments and segments[-1][0] is not None and key[0] == "sub" \
                and segments[-1][0][0] == "q":
            # (a)/(i) sub-part of the current numbered question: keep it
            # inside the parent so each numbered question stays one solve.
            segments[-1][1].append(line)
            continue
        segments.append((key, [body] if body else []))

    questions: List[str] = []
    # A short non-marker line BEFORE ≥2 marker segments is a page header
    # ("EXERCISE 3.3", a chapter heading), not a question — drop it.
    if (len(segments) >= 3 and segments[0][0] is None
            and len(" ".join(segments[0][1])) < 60):
        segments = segments[1:]
    for key, parts in segments:
        body = " ".join(parts).strip()
        if not body or len(body) < _MIN_BODY:
            continue  # marker with no real body (OCR noise / page footer)
        questions.append(body)
    # Only trust the split when it actually found exercise structure; a
    # single segment means "no markers were seen" and must not wrap the
    # original text differently from before.
    return questions if questions else [text.strip()]
