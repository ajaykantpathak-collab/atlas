"""mine_ms_keys.py -- Extract MCQ answer keys from marking_steps into
official_answers.

Two phases:
  Phase 1: Docs that have BOTH questions and marking_steps.
           Extract answer letter from marking step, link by qno.
  Phase 2: MS docs with marking_steps but NO questions.
           Extract answer from marking step, then cross-link to
           matching SQP/QP docs by question fingerprint.

Also fixes subject misclassification for MS .txt docs whose filenames
encode the real subject (Class_10_<Subject>_marking_schemes_...).

Idempotent: uses INSERT OR REPLACE on official_answers.
Usage:  python -m backend.tools.mine_ms_keys
        python -m backend.tools.mine_ms_keys --dry-run
"""

from __future__ import annotations

import hashlib
import re
import sqlite3
import unicodedata
from pathlib import Path
from typing import Dict, List, Optional, Tuple

DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")

# --------------------------------------------------------------------------- #
# Answer-letter patterns (reliable only -- no bare "A text" prose matches)
# --------------------------------------------------------------------------- #

# (A) text  /  A. text  /  A) text  -- must have separator after letter
_PAREN_LETTER = re.compile(r"^\(?([A-Da-d])[\).]\s+\S")

# (B)text  -- no space after paren (common in CBSE MS)
_PAREN_TIGHT = re.compile(r"^\(([A-Da-d])\)(?=\S)")

# Ans: (B)  /  Answer: A  /  Ans. (C)
_ANS_PREFIX = re.compile(
    r"^Ans(?:wer)?\s*[:.]\s*\(?([A-Da-d])\)?", re.I)

# "Correct option is (iv)" / "Correct answer: (B)"
_CORRECT_OPT = re.compile(
    r"correct\s+(?:option|answer)\s*is\s*\(?([A-Da-d])\)?", re.I)

# Roman numeral variant: "Ans. 6. (iv)" -> map i=1..iv=4
_ROMAN = {"i": "A", "ii": "B", "iii": "C", "iv": "D",
          "v": "E", "vi": "F"}
_ANS_ROMAN = re.compile(
    r"^Ans(?:wer)?\s*[:.]?\s*(?:\d+\s*[.:]?\s*)?\(([ivx]+)\)", re.I)


def _extract_letter(text: str) -> Optional[str]:
    """Try all patterns; return uppercase letter or None."""
    t = text.strip()
    for pat in (_PAREN_LETTER, _ANS_PREFIX, _CORRECT_OPT, _PAREN_TIGHT):
        m = pat.match(t)
        if m:
            return m.group(1).upper()
    # Roman numeral variant
    m = _ANS_ROMAN.match(t)
    if m:
        roman = m.group(1).lower()
        if roman in _ROMAN:
            return _ROMAN[roman]
    return None


def _trim_answer_text(letter: str, raw: str) -> str:
    """Extract minimal factual answer phrase -- NOT full marking scheme prose.

    Copyright-safe: store only the short answer value (fact), not the
    board's explanatory expression.  Caps at 80 chars, first sentence only.
    """
    t = raw.strip()
    # Strip leading answer markers: "(B) ...", "Answer: (B) ...", "Ans: (B) ..."
    for pat in (_PAREN_LETTER, _ANS_PREFIX, _CORRECT_OPT, _PAREN_TIGHT):
        m = pat.match(t)
        if m:
            t = t[m.end():].strip()
            break
    # Also strip "Correct option is (B)" prefix
    m = _CORRECT_OPT.search(t)
    if m:
        t = t[m.end():].strip()
    # Take first sentence only (up to . or newline)
    t = re.split(r"[.\n]", t, maxsplit=1)[0].strip()
    # Remove leading punctuation/whitespace
    t = t.lstrip(":.,; )(").strip()
    # Cap at 80 chars
    if len(t) > 80:
        t = t[:77] + "..."
    if not t:
        return letter
    return f"{letter} - {t}"


# --------------------------------------------------------------------------- #
# Subject re-inference for misclassified MS .txt docs
# --------------------------------------------------------------------------- #

# Filenames: Class_10_<Subject>_marking_schemes_X_<code>_MS_<RealSubject>.txt
#            ClassXII_<Year>_<Subject>-MS.txt
_MS_SUBJECT = [
    (r"account", "accountancy"),
    (r"business|elements", "business_studies"),
    (r"econom", "economics"),
    (r"physics", "physics"),
    (r"chem", "chemistry"),
    (r"bio", "biology"),
    (r"biotech", "biotechnology"),
    (r"math|maths", "maths"),
    (r"english", "english"),
    (r"hindi", "hindi"),
    (r"history", "history"),
    (r"geo", "geography"),
    (r"civics|political", "civics"),
    (r"social", "social_science"),
    (r"science", "science"),
    (r"psych", "psychology"),
    (r"sociology", "sociology"),
    (r"computer|informatics", "computer_science"),
    (r"home[\s_-]*science", "home_science"),
    (r"physical[\s_-]*edu", "physical_education"),
    (r"ncc", "ncc"),
    (r"painting|fine", "fine_arts"),
    (r"music", "music"),
    (r"entrepreneur", "entrepreneurship"),
    (r"financial", "financial_markets"),
    (r"food", "food_production"),
    (r"arabic|bengali|assamese|chinese|french|german|japanese|"
     r"spanish|sherpa|tamang|nepali|tibetan|bodo|limboo|rai|"
     r"tangkhul|kokborok|lepcha|bahasa|malay|russian|kashmiri|"
     r"punjabi|marathi|tamil|telugu|kannada|malayalam|odia|"
     r"gujarati|sindhi|urdu|sanskrit|mizo|manipuri",
     "language"),
]


def _infer_subject(filename: str) -> Optional[str]:
    """Infer subject from MS filename -- handles both patterns."""
    low = filename.lower()
    # Pattern 1: Class_10_<Subject>_marking_schemes_...
    m = re.search(r"class[_\s]*\d+\s*_?\s*([a-z_]+)\s*_?\s*marking", low)
    if m:
        chunk = m.group(1)
        for pat, subj in _MS_SUBJECT:
            if re.search(pat, chunk):
                return subj
    # Pattern 2: ClassXII_<Year>_<Subject>-MS.txt
    m = re.search(r"classxii\s*_?\s*\d{4}[-_]?\d{0,2}\s*_?\s*([a-z_]+)\s*-?\s*ms", low)
    if m:
        chunk = m.group(1)
        for pat, subj in _MS_SUBJECT:
            if re.search(pat, chunk):
                return subj
    # Pattern 3: ClassX_<Year>_<Subject>-MS.txt
    m = re.search(r"classx\s*_?\s*\d{4}[-_]?\d{0,2}\s*_?\s*([a-z_]+)\s*-?\s*ms", low)
    if m:
        chunk = m.group(1)
        for pat, subj in _MS_SUBJECT:
            if re.search(pat, chunk):
                return subj
    # Fallback: scan whole filename
    for pat, subj in _MS_SUBJECT:
        if re.search(pat, low):
            return subj
    return None


def _infer_class(filename: str) -> Optional[str]:
    low = filename.lower()
    if re.search(r"classxii|xii|class_12|class\s*12|[_\-]12", low):
        return "Class_XII"
    if re.search(r"classx\b|class_10|class\s*10|[_\-]x([_\-.]|$)", low):
        return "Class_X"
    if re.search(r"class_11|class\s*11|[_\-]xi\b", low):
        return "Class_11"
    if re.search(r"class_9|class\s*9|9th", low):
        return "Class_9"
    return None


# --------------------------------------------------------------------------- #
# Question fingerprinting
# --------------------------------------------------------------------------- #

def _normalize_stem(text: str) -> str:
    """Normalize MCQ stem for fingerprinting.
    Lowercase, strip options, collapse whitespace, remove punctuation."""
    # Remove option lines: (a) ... / A. ... / (A) ...
    text = re.sub(r"\(?[A-Da-d]\)[.)]\s+[^\n]+", " ", text)
    text = re.sub(r"^[A-Da-d][.)]\s+[^\n]+", " ", text, flags=re.M)
    # Lowercase + unicode normalize
    text = unicodedata.normalize("NFKC", text).lower()
    # Remove non-alphanumeric (keep spaces)
    text = re.sub(r"[^a-z0-9\u0900-\u097f\s]", " ", text)
    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    # Truncate to first 200 chars for fingerprint stability
    return text[:200]


def _fingerprint(text: str) -> str:
    """SHA1 hash of normalized stem."""
    return hashlib.sha1(_normalize_stem(text).encode("utf-8")).hexdigest()[:16]


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #

def main() -> None:
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    conn = sqlite3.connect(str(DB_PATH))

    # Phase 0: Fix subject misclassification for MS docs
    fixed_subjects = 0
    for row in conn.execute(
        "SELECT id, filename, subject, class_label FROM documents WHERE doc_type='MS'"
    ):
        doc_id, filename, old_subj, old_class = row
        new_subj = _infer_subject(filename)
        new_class = _infer_class(filename)
        if new_subj and new_subj != old_subj:
            if not args.dry_run:
                conn.execute(
                    "UPDATE documents SET subject=?, class_label=? WHERE id=?",
                    (new_subj, new_class or old_class, doc_id))
            fixed_subjects += 1
    if not args.dry_run:
        conn.commit()
    print(f"Phase 0: Fixed subject for {fixed_subjects} MS docs")

    # Phase 0.5: Trim existing answer_text to copyright-safe minimal phrases
    trimmed = 0
    for row in conn.execute(
        "SELECT doc_id, qno, letter, answer_text FROM official_answers "
        "WHERE length(answer_text) > 85"
    ):
        doc_id, qno, letter, old_text = row
        new_text = _trim_answer_text(letter, old_text)
        if new_text != old_text:
            if not args.dry_run:
                conn.execute(
                    "UPDATE official_answers SET answer_text=? "
                    "WHERE doc_id=? AND qno=?",
                    (new_text, doc_id, qno))
            trimmed += 1
    if not args.dry_run:
        conn.commit()
    print(f"Phase 0.5: Trimmed {trimmed} existing answer_text rows to "
          f"copyright-safe minimal phrases")

    # Phase 1: Extract answers from marking_steps for docs with questions
    # Get all (doc_id, qno) pairs that have questions
    docs_with_q = {}
    for row in conn.execute(
        "SELECT DISTINCT doc_id FROM questions"
    ):
        docs_with_q[row[0]] = True

    phase1_keys = 0
    phase1_by_doc = {}

    # Get first marking step per (doc_id, qno)
    first_steps = {}
    for row in conn.execute(
        "SELECT doc_id, qno, step_no, text FROM marking_steps "
        "ORDER BY doc_id, qno, step_no"
    ):
        key = (row[0], row[1])
        if key not in first_steps:
            first_steps[key] = row[3]

    # Also check ALL steps for answer patterns (some answers are in later steps)
    all_steps = {}
    for row in conn.execute(
        "SELECT doc_id, qno, step_no, text FROM marking_steps "
        "ORDER BY doc_id, qno, step_no"
    ):
        key = (row[0], row[1])
        all_steps.setdefault(key, []).append(row[3])

    for (doc_id, qno), steps in all_steps.items():
        if doc_id not in docs_with_q:
            continue
        # Check if already has an official answer
        existing = conn.execute(
            "SELECT 1 FROM official_answers WHERE doc_id=? AND qno=?",
            (doc_id, qno)).fetchone()
        if existing:
            continue
        # Try first step, then all steps
        letter = _extract_letter(steps[0]) if steps else None
        if not letter:
            for s in steps[1:]:
                letter = _extract_letter(s)
                if letter:
                    # Extract answer text from that step
                    break
        if letter:
            ans_text = _trim_answer_text(letter, steps[0])
            if not args.dry_run:
                conn.execute(
                    "INSERT OR REPLACE INTO official_answers "
                    "(doc_id, qno, letter, answer_text, marks) "
                    "VALUES (?,?,?,?,1)",
                    (doc_id, qno, letter, ans_text))
            phase1_keys += 1
            phase1_by_doc[doc_id] = phase1_by_doc.get(doc_id, 0) + 1

    if not args.dry_run:
        conn.commit()
    print(f"Phase 1: Extracted {phase1_keys} answer keys from marking_steps "
          f"(docs with questions)")
    if phase1_by_doc:
        for did, cnt in sorted(phase1_by_doc.items(), key=lambda x: -x[1])[:10]:
            fname = conn.execute(
                "SELECT filename FROM documents WHERE id=?", (did,)).fetchone()
            print(f"  doc={did} keys={cnt} file={fname[0][:60] if fname else '?'}")

    # Phase 2: Cross-link MS answers to SQP/QP questions
    # MS docs have answer letters in marking_steps but no questions stored.
    # Find matching SQP/QP docs by subject + class + session, then link by qno.
    phase2_keys = 0
    phase2_conflicts = 0
    phase2_by_subj = {}

    # Build index: (subject, class_label, session) -> [SQP/QP doc_ids]
    sqp_index = {}
    for row in conn.execute(
        "SELECT id, subject, class_label, session, filename "
        "FROM documents WHERE doc_type IN ('SQP','QP') AND n_questions > 0"
    ):
        key = (row[1], row[2], row[3])
        sqp_index.setdefault(key, []).append(row[0])

    # Build index: (doc_id, qno) -> q_type for all questions
    qtype_index = {}
    for row in conn.execute(
        "SELECT doc_id, qno, q_type FROM questions"
    ):
        qtype_index[(row[0], row[1])] = row[2]

    for (doc_id, qno), steps in all_steps.items():
        if doc_id in docs_with_q:
            continue  # already handled in phase 1
        letter = _extract_letter(steps[0]) if steps else None
        if not letter:
            for s in steps[1:]:
                letter = _extract_letter(s)
                if letter:
                    break
        if not letter:
            continue

        # Find the MS doc's metadata
        ms_meta = conn.execute(
            "SELECT subject, class_label, session FROM documents WHERE id=?",
            (doc_id,)).fetchone()
        if not ms_meta:
            continue
        ms_key = (ms_meta[0], ms_meta[1], ms_meta[2])

        # Find matching SQP/QP docs
        matching_docs = sqp_index.get(ms_key, [])
        if not matching_docs:
            continue

        # Try to link by qno to each matching SQP/QP doc
        for sqp_doc_id in matching_docs:
            # Check if this qno exists as a question in the SQP doc
            q_type = qtype_index.get((sqp_doc_id, qno))
            if q_type is None:
                continue
            # Only link to MCQ or AR questions (letter-answer types)
            if q_type not in ("MCQ", "AR", "SHORT"):
                continue
            # Check for existing official answer (conflict)
            existing = conn.execute(
                "SELECT letter FROM official_answers WHERE doc_id=? AND qno=?",
                (sqp_doc_id, qno)).fetchone()
            if existing:
                if existing[0] != letter:
                    phase2_conflicts += 1
                continue  # don't overwrite existing keys

            ans_text = _trim_answer_text(letter, steps[0])
            if not args.dry_run:
                conn.execute(
                    "INSERT OR REPLACE INTO official_answers "
                    "(doc_id, qno, letter, answer_text, marks) "
                    "VALUES (?,?,?,?,1)",
                    (sqp_doc_id, qno, letter, ans_text))
            phase2_keys += 1
            phase2_by_subj[ms_meta[0]] = phase2_by_subj.get(ms_meta[0], 0) + 1

    if not args.dry_run:
        conn.commit()
    print(f"Phase 2: Cross-linked {phase2_keys} answer keys from MS docs "
          f"to SQP/QP questions")
    if phase2_conflicts:
        print(f"  Conflicts (existing key differs): {phase2_conflicts} -- skipped")
    if phase2_by_subj:
        for subj, cnt in sorted(phase2_by_subj.items(), key=lambda x: -x[1])[:10]:
            print(f"  {subj}: {cnt} keys")

    # Summary
    total_keys = conn.execute("SELECT COUNT(*) FROM official_answers").fetchone()[0]
    mcq_with_key = conn.execute(
        "SELECT COUNT(*) FROM questions q WHERE q.q_type='MCQ' "
        "AND EXISTS(SELECT 1 FROM official_answers oa "
        "WHERE oa.doc_id=q.doc_id AND oa.qno=q.qno)"
    ).fetchone()[0]
    mcq_total = conn.execute(
        "SELECT COUNT(*) FROM questions WHERE q_type='MCQ'").fetchone()[0]
    print(f"\n=== SUMMARY ===")
    print(f"Total official_answers: {total_keys}")
    print(f"MCQ total: {mcq_total}")
    print(f"MCQ with key: {mcq_with_key}")
    print(f"MCQ key coverage: {mcq_with_key/mcq_total*100:.1f}%" if mcq_total else "N/A")

    conn.close()


if __name__ == "__main__":
    main()
