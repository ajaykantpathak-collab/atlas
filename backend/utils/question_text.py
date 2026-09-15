"""question_text.py -- pipeline-marker hygiene at the serve/seed boundary.

Mined question records sometimes carry generation-pipeline markers in
their text: ``TOPIC_TAG:``, ``TARGET_NODE:``, ``COGNITIVE_LEVEL:``,
``QID:`` and embedded ``ANSWER:`` keys.  These are metadata, not
student-facing content (and ``ANSWER:`` is a straight answer leak), so
:func:`strip_pipeline_markers` removes them before a question is
served or seeded into an exam/quiz bank.

Records that contain MULTIPLE ``TOPIC_TAG`` markers are merged rows
(two mined questions concatenated by a pipeline hiccup) and are never
cleanable -- :func:`is_merged_record` flags them so callers can drop
the question entirely.
"""
from __future__ import annotations

import re

# Line-anchored pipeline markers: "TOPIC_TAG: [Human A...]",
# "Target node: c10_bio_002" etc. (case-insensitive; the miners emit
# several spellings of the same marker).
_MARKER_LINE_RE = re.compile(
    r"^\s*(?:TOPIC_TAG|TARGET[_ ]?NODE|COGNITIVE[_ ]?LEVEL|QID|SOURCE_REF)"
    r"\s*:.*$",
    re.MULTILINE | re.IGNORECASE,
)

# Leading "QUESTION:" wrapper some miners leave on the text.
_QUESTION_PREFIX_RE = re.compile(r"^\s*QUESTION\s*:\s*", re.I)

# Embedded answer key: "ANSWER: (a) Noise pollution" -- strip the key
# and everything after it on that line (the answer never ships inside
# the question stem).
_ANSWER_LINE_RE = re.compile(
    r"^\s*ANSWER\s*:.*$", re.MULTILINE)

# Section dividers between merged records ("--- DQ_C10_02 ---").
_DIVIDER_RE = re.compile(r"^\s*-{2,}\s*\S+\s*-{2,}\s*$", re.MULTILINE)

_TOPIC_TAG_RE = re.compile(r"\bTOPIC_TAG\s*:")


def count_topic_tags(text: str) -> int:
    """Number of ``TOPIC_TAG:`` markers in the text."""
    return len(_TOPIC_TAG_RE.findall(str(text or "")))


def is_merged_record(text: str) -> bool:
    """True when the text carries multiple TOPIC_TAG markers -- a merged
    (multi-question) record that must be dropped, not cleaned."""
    return count_topic_tags(text) >= 2


def strip_pipeline_markers(text: str) -> str:
    """Remove pipeline metadata lines from question text.

    Strips TOPIC_TAG / TARGET_NODE / COGNITIVE_LEVEL / QID /
    SOURCE_REF lines, embedded ``ANSWER:`` key lines, record dividers
    and a leading ``QUESTION:`` wrapper, then collapses the whitespace
    the removals leave behind.  Idempotent and marker-free on output.
    """
    if not text:
        return text
    out = str(text)
    out = _MARKER_LINE_RE.sub("", out)
    out = _ANSWER_LINE_RE.sub("", out)
    out = _DIVIDER_RE.sub("", out)
    out = _QUESTION_PREFIX_RE.sub("", out, count=1)
    # collapse the blank runs the line removals left
    out = re.sub(r"\n{3,}", "\n\n", out)
    out = re.sub(r"[ \t]+\n", "\n", out)
    return out.strip()


def clean_question_text(text: str) -> str:
    """Serve/seed-boundary cleaner: strip pipeline markers.  Callers
    that can drop the record entirely should check
    :func:`is_merged_record` first (merged records are not cleanable)."""
    return strip_pipeline_markers(text)
