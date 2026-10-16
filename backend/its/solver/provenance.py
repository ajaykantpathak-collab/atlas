"""
provenance.py -- curriculum grounding WITHOUT exposing copyrighted text.

THE CONSTRAINT
--------------
The NCERT-derived transcripts under D:\\_KEEP are copyrighted. We may USE them
internally -- to confirm a relationship is taught, and to audit our own
answers -- but must never SHIP their prose to a student.

That rules out the obvious design. A proof dict carrying
    "quote": "determining speed as distance travelled divided by time taken"
is a verbatim excerpt, and `SolverOutcome.to_payload()` copies `proof`
straight into the HTTP response. That design leaks the textbook.

THE DESIGN
----------
Split grounding in two:

  INTERNAL (server side, auditor only)
      The verbatim passage, its file, line range and SHA-256. Reachable only
      through an explicit audit call. Never placed in a SolverOutcome.

  EXTERNAL (student facing)
      A provenance FINGERPRINT: source id, chapter number, chapter title,
      passage hash, line range. These are bibliographic facts and
      cryptographic digests -- none is protected expression, and none can be
      read back into the original text.

A fingerprint is also BETTER evidence than a quote: a quote can be
transcribed wrongly or silently edited; a hash either matches the file we
actually read or it does not. Grounding becomes provable while the student
never sees a sentence.

Chapter titles are used because a title names a work; it is not expression.
"""

from __future__ import annotations

import hashlib
import pathlib
from dataclasses import dataclass
from typing import Dict, List, Optional

BOOKS_ROOT = pathlib.Path(r"D:\_KEEP\text_cache_new")

# Addressed by id, never by path, in anything leaving the process.
_SOURCE_CATALOGUE: Dict[str, dict] = {
    "am11_numerical_applications": {
        "file": "am11_002_numerical_application.txt",
        "chapter": "Numerical Applications",
        "board_subject": "CBSE Class 11 Applied Mathematics",
        "class_level": 11,
    },
    "c10_real_numbers": {
        "file": "jemh101.txt",
        "chapter": "Real Numbers",
        "board_subject": "CBSE Class 10 Mathematics",
        "class_level": 10,
    },
    "c12_electric_charges": {
        "file": "leph101.txt",
        "chapter": "Electric Charges and Fields",
        "board_subject": "CBSE Class 12 Physics",
        "class_level": 12,
    },
    "c10_chem_reactions": {
        "file": "jesc101.txt",
        "chapter": "Chemical Reactions and Equations",
        "board_subject": "CBSE Class 10 Science",
        "class_level": 10,
    },
}

# `needle` locates a passage in the file. It is never returned to a caller.
_GROUNDED: Dict[str, List[dict]] = {
    "am11_numerical_applications": [
        {"relation": "speed = distance / time", "dimension": "speed",
         "needle": "speed as distance travelled divided by time"},
        {"relation": "time = distance / speed", "dimension": "time",
         "needle": "Average speed is total distance travelled divided by total time"},
    ],
    "c10_real_numbers": [
        {"relation": "hcf via Euclid's division algorithm", "dimension": "hcf",
         "needle": "use it mainly to compute the HCF"},
    ],
    "c12_electric_charges": [
        {"relation": "force = mass x acceleration",
         "dimension": "force",
         "needle": "Using Newton’s second law of motion, F = ma"},
        {"relation": "balancing means equal atomic counts on both sides",
         "dimension": "balanced_equation",
         "needle": "same on both the sides? If yes, then the equation is balanced",
         "file": "jesc101.txt"},
    ],
}


@dataclass(frozen=True)
class GroundRef:
    """The ONLY shape of grounding permitted to leave the process."""
    source_id: str
    board_subject: str
    chapter: str
    class_level: int
    relation: str
    passage_sha256: str
    line_start: int
    line_end: int

    def to_audit_dict(self) -> Dict[str, object]:
        """AUDITOR-FACING (staff tooling, logs, release review).

        Deliberately NOT a student-facing shape. There is no `to_public_dict`
        on purpose: a citation is meaningless to a learner and creates a
        surface through which copyrighted material could leak. Grounding is a
        GATE that runs server-side -- it decides whether we release an answer,
        it is never rendered to the student.
        """
        return {
            "source_id": self.source_id,
            "reference": f"{self.board_subject}, Chapter: {self.chapter}",
            "relation": self.relation,
            "sha256": self.passage_sha256,
            "passage_lines": f"{self.line_start}-{self.line_end}",
        }


def _sha(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def _locate(path: pathlib.Path, needle: str):
    """Line range of a passage -> (start, end, text), or None."""
    try:
        lines = path.read_text(encoding="utf-8", errors="ignore").splitlines()
    except OSError:
        return None
    low = needle.lower()
    for i, line in enumerate(lines):
        if low in line.lower():
            end = i
            while end + 1 < len(lines) and lines[end + 1].strip():
                end += 1
            return i + 1, end + 1, "\n".join(lines[i:end + 1])
    return None


def ground(relation_key: str,
           dimension: Optional[str] = None) -> Optional[GroundRef]:
    """Fingerprint the curriculum source for a relation, if one teaches it.

    Returns None when nothing grounds it -- itself a meaningful signal: the
    answer is then not curriculum-grounded and must not claim to be.
    """
    for source_id, entries in _GROUNDED.items():
        for e in entries:
            if e["relation"] != relation_key:
                continue
            if dimension and e.get("dimension") != dimension:
                continue
            meta = _SOURCE_CATALOGUE[source_id]
            path = BOOKS_ROOT / e.get("file", meta["file"])
            hit = _locate(path, e["needle"])
            if not hit:
                return None
            start, end, text = hit
            return GroundRef(
                source_id=source_id,
                board_subject=meta["board_subject"],
                chapter=meta["chapter"],
                class_level=meta["class_level"],
                relation=e["relation"],
                passage_sha256=_sha(text),
                line_start=start, line_end=end)
    return None


def is_grounded(relation_key: str, dimension: Optional[str] = None) -> bool:
    """THE ONLY method a solver should call.

    Returns a bare boolean so there is nothing quotable to leak: the solver
    learns whether the relationship is genuinely taught in the curriculum and
    nothing else. It cannot obtain a chapter title, a passage, or a file path
    to pass downstream, because none is returned.

    Used as a release gate alongside the arithmetic verifier:

        independently verified AND curriculum grounded -> VERIFIED
        independently verified, not grounded           -> VERIFIED, lower
                                                          confidence
        not independently verified                     -> withhold the number

    This is what "use the books internally to produce better answers" means in
    code: the corpus decides whether we trust ourselves, and is never itself
    rendered to the student.
    """
    return ground(relation_key, dimension) is not None


def audit(ref: GroundRef) -> Dict[str, object]:
    """INTERNAL ONLY. Verbatim passage, for a human reviewer.

    There is no route from here to an API response: a caller must already
    hold a GroundRef obtained server-side. This exists so grounding can be
    checked by a reviewer without re-reading the textbook.
    """
    meta = _SOURCE_CATALOGUE[ref.source_id]
    path = BOOKS_ROOT / meta["file"]
    lines = path.read_text(encoding="utf-8", errors="ignore").splitlines()
    text = "\n".join(lines[ref.line_start - 1:ref.line_end])
    return {
        "reference": f"{ref.board_subject}, Chapter: {ref.chapter}",
        "relation": ref.relation,
        "file": str(path),
        "lines": f"{ref.line_start}-{ref.line_end}",
        "sha256": _sha(text),
        "hash_matches": _sha(text) == ref.passage_sha256,
        "passage": text,          # AUDITOR EYES ONLY
    }