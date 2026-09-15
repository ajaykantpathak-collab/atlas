"""metadata_stripper.py -- remove document metadata before extraction.

Strips trailing publisher metadata, reprint notices, ISBNs, and
copyright lines that corrupt quantity extraction (e.g. "Reprint 2026-27"
becoming "2026 - 27 = 1999" in the math kernel).

This runs BEFORE any quantity or unit extraction.
"""
from __future__ import annotations

import re

# Trailing metadata patterns -- these appear at the END of scraped
# question text and are never part of the problem.
# Order matters: longer patterns first.
_METADATA_PATTERNS = [
    # "Reprint 2026-27" / "Reprint 2025-26" etc.
    re.compile(r"\s*Reprint\s+\d{4}[-\s]?\d{2,4}\s*$", re.I),
    # "Reprint 2026-27 Ch_01" etc.
    re.compile(r"\s*Reprint\s+\d{4}[-\s]?\d{2,4}\s+\S+\s*$", re.I),
    # "Ganita Prakash" / "Mathematics textbook" trailing refs
    re.compile(r"\s*Ganita\s+Prakas[a-z]*\s*$", re.I),
    re.compile(r"\s*Mathematics\s+textbook\s*$", re.I),
    # ISBN patterns
    re.compile(r"\s*ISBN[-\s]?\d{10,13}\s*$", re.I),
    # "Reprint 2026-27" anywhere (not just end) -- remove the fragment
    re.compile(r"\bReprint\s+\d{4}[-\s]?\d{2,4}\b", re.I),
    # "Industrial Policy, 1991" style -- year after a policy/event name
    # Only strip the year, keep the text (the year is metadata)
    # But ONLY when the year is 1900-2030 and follows a comma
    # This is tricky -- we do NOT want to strip "in 1991" from a
    # history question. We only strip trailing years after policy names.
    # Actually, for K-12 competency questions, years are almost never
    # problem inputs. Strip them.
]

# Year-like numbers: 4-digit numbers in 1800-2100 range
_YEAR_RE = re.compile(r"\b(18\d{2}|19\d{2}|20\d{2})\b")

# Metadata keywords that indicate the following text is not problem data
_METADATA_KEYWORDS = re.compile(
    r"\b(Reprint|Copyright|ISBN|Published|Edition|Printer|"
    r"Printer|All rights reserved)\b", re.I)


def strip_metadata(text: str) -> str:
    """Remove trailing document metadata from question text.

    This is conservative: it only removes text that is clearly
    publisher metadata, never problem content.
    """
    if not text:
        return text

    result = text

    # Remove trailing metadata patterns
    for pat in _METADATA_PATTERNS:
        result = pat.sub("", result)

    # Remove any line that starts with a metadata keyword
    lines = result.split("\n")
    clean_lines = []
    for line in lines:
        stripped = line.strip()
        if _METADATA_KEYWORDS.search(stripped) and len(stripped) < 80:
            # Only skip if the ENTIRE line is metadata-like
            # (not just containing the word somewhere)
            if _METADATA_KEYWORDS.match(stripped):
                continue
        clean_lines.append(line)
    result = "\n".join(clean_lines)

    # Strip trailing "Reprint XXXX-XX" fragments that survived
    result = re.sub(r"\s*Reprint\s+\d{4}[-\s]?\d{2,4}.*$", "",
                    result, flags=re.I)

    # Final cleanup: remove trailing whitespace and newlines
    result = result.rstrip()

    return result


def strip_years(text: str) -> str:
    """Remove year-like numbers (1800-2099) from text.

    Used AFTER metadata stripping, for questions where a year
    appears inline but is not a problem input (e.g. "In 1991, a
    company was formed... find profit").

    This is aggressive -- it removes ALL 4-digit years. For K-12
    competency questions, years are almost never problem inputs.
    """
    if not text:
        return text
    return _YEAR_RE.sub("", text)


def is_year_like(value: float) -> bool:
    """Check if a numeric value looks like a year (1800-2100)."""
    return 1800 <= value <= 2100
