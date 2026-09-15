"""fingerprint_matcher.py -- Deterministic MCQ fingerprint matching.

Architecture role (ARCHITECTURE.md Section 4, Rung 1):
    "Banked verified parse (retrieval + deterministic number re-binding)
     -- free, VERIFIED"

This module builds a fingerprint index of all questions that already have
official answer keys, then matches unkeyed MCQs against that index.

DESIGN:
    1. Extract stem + options from question text
    2. Normalize: lowercase, NFKC, strip option markers, collapse whitespace,
       strip punctuation, truncate to 200 chars
    3. Fingerprint = SHA1(normalized_stem) + SHA1(sorted_normalized_options)
    4. Exact match only -- deterministic, zero-wrong
    5. Collision detection: if two keyed questions have the same fingerprint
       but different answer letters, REFUSE (ambiguous, not guessed)

USAGE:
    from backend.its.solver.fingerprint_matcher import FingerprintIndex
    idx = FingerprintIndex()
    idx.build()           # build from DB
    result = idx.lookup(question_text)  # -> MatchResult or None
"""

from __future__ import annotations

import hashlib
import re
import sqlite3
import unicodedata
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional, Tuple

DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")

# --------------------------------------------------------------------------- #
# Normalization
# --------------------------------------------------------------------------- #

# Option markers: (a) (A) a) A. [a] etc.
_OPT_MARKER = re.compile(
    r"\(?([a-dA-D])\)[.)]\s*|\b([a-dA-D])[.)]\s+", re.MULTILINE)

# Inline option split: "stem (a) x (b) y (c) z (d) w"
_INLINE_OPT = re.compile(r"\(([a-d])\)\s*", re.I)


def _normalize(text: str) -> str:
    """Normalize text for fingerprinting."""
    # Unicode normalize
    text = unicodedata.normalize("NFKC", text)
    # Lowercase
    text = text.lower()
    # Remove marks/scores like [1 mark], [2 marks]
    text = re.sub(r"\[\d+[.\d]*\s*mark[^\]]*\]", " ", text)
    # Remove non-alphanumeric (keep spaces, Devanagari range)
    text = re.sub(r"[^a-z0-9\u0900-\u097f\s]", " ", text)
    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    # Truncate for stability
    return text[:200]


def _extract_stem_and_options(text: str) -> Tuple[str, List[str]]:
    """Split question into stem and option values.

    Handles:
      - Inline: "stem (a) x (b) y (c) z (d) w"
      - Prefixed: "stem A. x B. y C. z D. w"
      - No options: returns (full_text, [])
    """
    t = text.replace("\xa0", " ").strip()

    # Try inline (a)/(b)/(c)/(d) split
    parts = _INLINE_OPT.split(t)
    if len(parts) >= 5:  # stem + 4 options minimum
        stem = parts[0].strip()
        opts = []
        for i in range(1, len(parts) - 1, 2):
            opt_text = parts[i + 1].strip(" .|")
            # Cut at next option marker or end
            opt_text = re.split(r"\(?[a-dA-D]\)", opt_text)[0].strip()
            if opt_text:
                opts.append(opt_text)
        if len(opts) >= 2:
            return _normalize(stem), [_normalize(o) for o in opts]

    # Try prefixed A. B. C. D. split
    matches = list(re.finditer(
        r"(?:^|\s)\(?([A-Da-d])\)[.)]\s+|\b([A-Da-d])[.)]\s+", t))
    if len(matches) >= 2:
        stem = t[:matches[0].start()].strip()
        opts = []
        for i, m in enumerate(matches):
            start = m.end()
            end = matches[i + 1].start() if i + 1 < len(matches) else len(t)
            opt_text = t[start:end].strip(" .|")
            if opt_text:
                opts.append(opt_text)
        if len(opts) >= 2:
            return _normalize(stem), [_normalize(o) for o in opts]

    # No options found -- treat whole text as stem
    return _normalize(t), []


def _fingerprint(stem_norm: str, opts_norm: List[str]) -> str:
    """Deterministic fingerprint: stem hash + sorted option hashes."""
    stem_hash = hashlib.sha1(stem_norm.encode("utf-8")).hexdigest()[:16]
    if not opts_norm:
        return stem_hash
    opt_hashes = sorted(
        hashlib.sha1(o.encode("utf-8")).hexdigest()[:8] for o in opts_norm)
    return f"{stem_hash}_{'-'.join(opt_hashes)}"


# --------------------------------------------------------------------------- #
# Index and matching
# --------------------------------------------------------------------------- #

@dataclass
class KeyedQuestion:
    """A question with an official answer key."""
    doc_id: int
    qno: int
    letter: str
    answer_text: str
    fingerprint: str
    subject: str = ""
    class_label: str = ""


@dataclass
class MatchResult:
    """Result of a fingerprint lookup."""
    matched: bool
    letter: str = ""
    answer_text: str = ""
    source_doc_id: int = 0
    source_qno: int = 0
    collision: bool = False
    collision_detail: str = ""


class FingerprintIndex:
    """Index of keyed questions for deterministic matching."""

    def __init__(self, db_path: Path = DB_PATH):
        self.db_path = db_path
        self._by_fp: Dict[str, List[KeyedQuestion]] = {}
        self._collisions: Dict[str, str] = {}  # fp -> detail

    def build(self) -> int:
        """Build index from all questions with official keys.
        Returns number of indexed questions."""
        conn = sqlite3.connect(str(self.db_path))
        rows = conn.execute("""
            SELECT q.doc_id, q.qno, q.text, oa.letter, oa.answer_text,
                   d.subject, d.class_label
            FROM questions q
            JOIN official_answers oa ON oa.doc_id = q.doc_id
                AND oa.qno = q.qno
            JOIN documents d ON d.id = q.doc_id
        """).fetchall()
        conn.close()

        for row in rows:
            doc_id, qno, text, letter, ans_text, subj, cls = row
            stem_norm, opts_norm = _extract_stem_and_options(text or "")
            fp = _fingerprint(stem_norm, opts_norm)
            kq = KeyedQuestion(
                doc_id=doc_id, qno=qno, letter=letter,
                answer_text=ans_text or "", fingerprint=fp,
                subject=subj or "", class_label=cls or "")

            # Collision detection: same fingerprint, different letter
            existing = self._by_fp.get(fp, [])
            if existing:
                existing_letters = {e.letter for e in existing}
                if letter in existing_letters:
                    # Same fp, same letter -- duplicate question, fine
                    pass
                else:
                    # COLLISION: same fingerprint, different answer letter
                    self._collisions[fp] = (
                        f"fp={fp}: doc={doc_id} q={qno} letter={letter} "
                        f"conflicts with doc={existing[0].doc_id} "
                        f"q={existing[0].qno} letter={existing[0].letter}")
                    # Still add it, but mark as collision
            self._by_fp.setdefault(fp, []).append(kq)

        return sum(len(v) for v in self._by_fp.values())

    @property
    def collision_count(self) -> int:
        return len(self._collisions)

    @property
    def unique_fingerprints(self) -> int:
        return len(self._by_fp)

    def lookup(self, question_text: str) -> MatchResult:
        """Look up a question by fingerprint. Returns MatchResult."""
        stem_norm, opts_norm = _extract_stem_and_options(question_text)
        fp = _fingerprint(stem_norm, opts_norm)

        # Check collision first
        if fp in self._collisions:
            return MatchResult(
                matched=False, collision=True,
                collision_detail=self._collisions[fp])

        candidates = self._by_fp.get(fp)
        if not candidates:
            return MatchResult(matched=False)

        if len(candidates) == 1:
            kq = candidates[0]
            return MatchResult(
                matched=True, letter=kq.letter,
                answer_text=kq.answer_text,
                source_doc_id=kq.doc_id, source_qno=kq.qno)

        # Multiple candidates with same letter -- pick first (they agree)
        letters = {c.letter for c in candidates}
        if len(letters) == 1:
            kq = candidates[0]
            return MatchResult(
                matched=True, letter=kq.letter,
                answer_text=kq.answer_text,
                source_doc_id=kq.doc_id, source_qno=kq.qno)

        # Multiple candidates with different letters -- collision
        return MatchResult(
            matched=False, collision=True,
            collision_detail=f"fp={fp}: {len(candidates)} candidates "
                             f"with letters {letters}")

    def propagate_keys(self, dry_run: bool = False) -> Dict[str, int]:
        """For every unkeyed MCQ in the DB, try to match against the index.
        If unique match found, insert the official key.

        Returns stats dict.
        """
        conn = sqlite3.connect(str(self.db_path))
        stats = {"matched": 0, "no_match": 0, "collision": 0,
                 "already_keyed": 0, "by_subject": {}}

        # Get all MCQs (and SHORT questions with inline options)
        rows = conn.execute("""
            SELECT q.doc_id, q.qno, q.text, q.q_type, d.subject
            FROM questions q JOIN documents d ON d.id = q.doc_id
            WHERE q.q_type IN ('MCQ', 'SHORT', 'AR')
        """).fetchall()

        for row in rows:
            doc_id, qno, text, q_type, subj = row

            # Skip if already has a key
            existing = conn.execute(
                "SELECT 1 FROM official_answers WHERE doc_id=? AND qno=?",
                (doc_id, qno)).fetchone()
            if existing:
                stats["already_keyed"] += 1
                continue

            result = self.lookup(text or "")
            if result.collision:
                stats["collision"] += 1
                continue
            if not result.matched:
                stats["no_match"] += 1
                continue

            # Insert the matched key
            if not dry_run:
                conn.execute(
                    "INSERT OR REPLACE INTO official_answers "
                    "(doc_id, qno, letter, answer_text, marks) "
                    "VALUES (?,?,?,?,1)",
                    (doc_id, qno, result.letter, result.answer_text))
            stats["matched"] += 1
            if subj:
                stats["by_subject"][subj] = \
                    stats["by_subject"].get(subj, 0) + 1

        if not dry_run:
            conn.commit()

        # Final coverage
        total_mcq = conn.execute(
            "SELECT COUNT(*) FROM questions WHERE q_type='MCQ'").fetchone()[0]
        mcq_with_key = conn.execute("""
            SELECT COUNT(*) FROM questions q WHERE q.q_type='MCQ'
            AND EXISTS(SELECT 1 FROM official_answers oa
                       WHERE oa.doc_id=q.doc_id AND oa.qno=q.qno)
        """).fetchone()[0]
        stats["mcq_total"] = total_mcq
        stats["mcq_with_key"] = mcq_with_key
        stats["coverage_pct"] = round(mcq_with_key / total_mcq * 100, 1) \
            if total_mcq else 0.0

        conn.close()
        return stats


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #

def main():
    """Build index and propagate keys to unkeyed MCQs."""
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--report-only", action="store_true",
                    help="Only report stats, don't propagate")
    args = ap.parse_args()

    print("Building fingerprint index...", flush=True)
    idx = FingerprintIndex()
    indexed = idx.build()
    print(f"  Indexed {indexed} keyed questions")
    print(f"  Unique fingerprints: {idx.unique_fingerprints}")
    print(f"  Collisions (same fp, different letter): {idx.collision_count}")

    if idx.collision_count:
        print("\n  Collision details (first 5):")
        for fp, detail in list(idx._collisions.items())[:5]:
            print(f"    {detail}")

    if args.report_only:
        return

    print("\nPropagating keys to unkeyed MCQs...", flush=True)
    stats = idx.propagate_keys(dry_run=args.dry_run)
    print(f"  Matched: {stats['matched']}")
    print(f"  No match: {stats['no_match']}")
    print(f"  Collision: {stats['collision']}")
    print(f"  Already keyed: {stats['already_keyed']}")
    if stats.get("by_subject"):
        print("  By subject:")
        for subj, cnt in sorted(
                stats["by_subject"].items(), key=lambda x: -x[1])[:10]:
            print(f"    {subj}: {cnt}")

    print(f"\n=== COVERAGE ===")
    print(f"  MCQ total: {stats['mcq_total']}")
    print(f"  MCQ with key: {stats['mcq_with_key']}")
    print(f"  Coverage: {stats['coverage_pct']}%")


if __name__ == "__main__":
    main()
