"""mtf_solver.py -- Match-the-following solver.

Architecture role (ARCHITECTURE.md Section 4, rung 2-3):
    Structural solver for match-the-following questions.  Parses the
    two-column format and attempts deterministic matching via a
    knowledge base.  Falls back to GUIDED PRACTICE when matching
    cannot be verified.

Format:
    Match the following:
    Column A          Column B
    I. <item>         A) <item>
    II. <item>        B) <item>
    III. <item>       C) <item>

DESIGN:
    1. Detect MTF format (deterministic regex)
    2. Parse Column A and Column B items
    3. Try official key match (fingerprint) -> VERIFIED_OFFICIAL
    4. Try deterministic matching (knowledge base)
    5. Refuse honestly if neither works
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple

# --------------------------------------------------------------------------- #
# Format detection
# --------------------------------------------------------------------------- #

_MTF_HEADER_RE = re.compile(
    r"match\s+the\s+following", re.I)
_COLUMN_RE = re.compile(
    r"column\s*[a-b]\s*[:\-]?", re.I)

# Column item markers: I. II. III. or 1. 2. 3. or (i) (ii) (iii)
# Also handles inline format: "I. text    A) text" on same line
_ROMAN_ITEM = re.compile(
    r"(?:^|\n)\s*([IVX]+)[\.\)]\s*(.+?)(?=\n\s*[IVX]+[\.\)]|\Z)",
    re.DOTALL)
_NUM_ITEM = re.compile(
    r"(?:^|\n)\s*(\d+)[\.\)]\s*(.+?)(?=\n\s*\d+[\.\)]|\Z)",
    re.DOTALL)
_LETTER_ITEM = re.compile(
    r"(?:^|\n)\s*\(?([A-Da-d])\)[\.\s]\s*(.+?)(?=\n\s*\(?[A-Da-d]\)[\.\s]|\Z)",
    re.DOTALL)
# Inline format: "I. text    A) text" -- roman and letter on same line
_INLINE_PAIR = re.compile(
    r"(?:^|\n)\s*([IVX]+)[\.\)]\s+(.+?)\s+"
    r"\(?([A-Da-d])\)[\.\s]\s*(.+?)(?=\n\s*[IVX]+[\.\)]|\Z)",
    re.DOTALL)


@dataclass
class MTFQuestion:
    """Parsed match-the-following question."""
    column_a: Dict[str, str]  # roman/number -> text
    column_b: Dict[str, str]  # letter -> text
    raw_text: str = ""


@dataclass
class MTFResult:
    """Result of MTF solver attempt."""
    label: str  # VERIFIED_OFFICIAL | VERIFIED | GUIDED_PRACTICE
    matching: Dict[str, str] = field(default_factory=dict)  # A-item -> B-item
    column_a: Dict[str, str] = field(default_factory=dict)
    column_b: Dict[str, str] = field(default_factory=dict)
    refusal_reason: Optional[str] = None
    source: str = ""


def detect_mtf_format(text: str) -> Optional[MTFQuestion]:
    """Detect if a question is in match-the-following format."""
    t = text.strip()

    # Must contain "match the following"
    if not _MTF_HEADER_RE.search(t):
        return None

    # Must have at least 2 column items
    # Try to find column A (roman/number items) and column B (letter items)
    col_a = {}
    col_b = {}

    # First try inline format: "I. text    A) text" on same line
    inline_found = False
    for m in _INLINE_PAIR.finditer(t):
        inline_found = True
        a_key = m.group(1).upper()
        a_val = m.group(2).strip()
        b_key = m.group(3).upper()
        b_val = m.group(4).strip()
        if a_val and len(a_val) > 1 and len(a_val) < 200:
            col_a[a_key] = a_val
        if b_val and len(b_val) > 1 and len(b_val) < 200:
            col_b[b_key] = b_val

    if not inline_found:
        # Find roman numeral items (Column A)
        for m in _ROMAN_ITEM.finditer(t):
            key = m.group(1).upper()
            val = m.group(2).strip()
            if val and len(val) > 1 and len(val) < 200:
                col_a[key] = val

        # Find numbered items (alternative Column A)
        if not col_a:
            for m in _NUM_ITEM.finditer(t):
                key = m.group(1)
                val = m.group(2).strip()
                if val and len(val) > 1 and len(val) < 200:
                    col_a[key] = val

        # Find letter items (Column B)
        for m in _LETTER_ITEM.finditer(t):
            key = m.group(1).upper()
            val = m.group(2).strip()
            if val and len(val) > 1 and len(val) < 200:
                col_b[key] = val

    # Need at least 2 items in each column
    if len(col_a) < 2 or len(col_b) < 2:
        return None

    return MTFQuestion(column_a=col_a, column_b=col_b, raw_text=text)


# --------------------------------------------------------------------------- #
# Deterministic matching (extensible knowledge base)
# --------------------------------------------------------------------------- #

# Known matchings: (pattern_in_A, pattern_in_B, confidence)
# These are domain-specific facts that can be matched deterministically
_KNOWN_MATCHES = [
    # Chemistry: catalysts
    (re.compile(r"oil\s+refining", re.I),
     re.compile(r"zeolite", re.I), 0.95),
    (re.compile(r"biodegradable.*polymer", re.I),
     re.compile(r"microorganism", re.I), 0.9),
    # Physics: units
    (re.compile(r"force", re.I),
     re.compile(r"newton", re.I), 0.9),
    (re.compile(r"energy", re.I),
     re.compile(r"joule", re.I), 0.9),
    (re.compile(r"power", re.I),
     re.compile(r"watt", re.I), 0.9),
    # Biology
    (re.compile(r"photosynthesis", re.I),
     re.compile(r"chloroplast", re.I), 0.9),
    (re.compile(r"respiration", re.I),
     re.compile(r"mitochondria", re.I), 0.9),
]


def _try_deterministic_match(col_a: Dict[str, str],
                              col_b: Dict[str, str]
                              ) -> Tuple[Dict[str, str], float]:
    """Try to match Column A items to Column B items using the knowledge base.
    Returns (matching_dict, confidence). Empty dict if no matches."""
    matching = {}
    used_b = set()

    for a_key, a_text in col_a.items():
        best_b = None
        best_conf = 0.0
        for b_key, b_text in col_b.items():
            if b_key in used_b:
                continue
            for pat_a, pat_b, conf in _KNOWN_MATCHES:
                if pat_a.search(a_text) and pat_b.search(b_text):
                    if conf > best_conf:
                        best_b = b_key
                        best_conf = conf
        if best_b is not None:
            matching[a_key] = best_b
            used_b.add(best_b)

    # Only return if ALL items matched (partial matches are dangerous)
    if len(matching) == len(col_a) and len(matching) == len(col_b):
        return matching, 0.9
    return {}, 0.0


# --------------------------------------------------------------------------- #
# Solver
# --------------------------------------------------------------------------- #

def solve_mtf(text: str) -> MTFResult:
    """Attempt to solve a match-the-following question."""
    mtfq = detect_mtf_format(text)
    if mtfq is None:
        return MTFResult(
            label="GUIDED_PRACTICE",
            refusal_reason="Not a match-the-following question")

    # Try official key match first
    try:
        from backend.its.solver.fingerprint_matcher import FingerprintIndex
        if not hasattr(solve_mtf, "_idx"):
            solve_mtf._idx = FingerprintIndex()
            solve_mtf._idx.build()
        result = solve_mtf._idx.lookup(text)
        if result.matched:
            return MTFResult(
                label="VERIFIED_OFFICIAL",
                matching={},
                column_a=mtfq.column_a,
                column_b=mtfq.column_b,
                source="official_key")
    except Exception:
        pass

    # Try deterministic matching
    matching, conf = _try_deterministic_match(
        mtfq.column_a, mtfq.column_b)
    if matching and conf >= 0.85:
        return MTFResult(
            label="VERIFIED",
            matching=matching,
            column_a=mtfq.column_a,
            column_b=mtfq.column_b,
            source="fact_verification")

    # Honest refusal
    return MTFResult(
        label="GUIDED_PRACTICE",
        column_a=mtfq.column_a,
        column_b=mtfq.column_b,
        refusal_reason="Cannot verify matching deterministically -- "
                       "no knowledge base entry for these items")
