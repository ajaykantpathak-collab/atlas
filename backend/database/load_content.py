"""Load CISCE question banks and class-level content into PostgreSQL.

This loader handles all non-enrichment content:
- Question banks, mock papers, past papers, drill banks, diagnostics
  → BoardQuestion table (parsed into individual questions)
- Glossaries, formula banks, summaries, high-yield guides, etc.
  → ClassLevelContent table (stored as full file content)

Content is organized by class + subject + content_type, parsed from
filenames and directory names. No per-question tagging needed.

Usage:
    python -m backend.database.load_content                 # load all
    python -m backend.database.load_content --subject=physics # one subject
    python -m backend.database.load_content --dry-run         # preview only
"""

import argparse
import asyncio
import os
import re
from pathlib import Path
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import async_session
from backend.models.enrichment import BoardQuestion, ClassLevelContent
from backend.database.marker_parser import parse_question_bank_file

# CISCE content lives outside the repo; override CISCE_CONTENT_ROOT when
# deploying elsewhere.
CISCE_ROOT = Path(os.environ.get(
    "CISCE_CONTENT_ROOT", r"C:\Users\Alesha4285\Desktop\cisce"))

# Subject directory name → canonical subject name
# Only the 4 core STEM subjects are loaded
SUBJECT_MAP = {
    "physics": "physics",
    "chem": "chem",
    "chemistry": "chem",
    "bio": "bio",
    "biology": "bio",
    "maths": "maths",
    "mathematics": "maths",
}

# Subjects that are NOT loaded
EXCLUDED_SUBJECTS = {"cs", "geo", "evs", "appmath", "biotech", "eng"}

# Directory names that contain question-type content → BoardQuestion
QUESTION_DIRS = {
    "question_bank", "question_bank_clean", "question_bank_answers",
    "question_papers", "question_papers_clean",
    "mock_papers", "past_papers",
    "board_style_questions",
    "diagnostic_questions", "diagnostics",
    "drill_banks",
    "practice_tests", "practice",
}

# Directory names that contain class-level content → ClassLevelContent
CLASS_LEVEL_DIRS = {
    "glossary", "formula_bank", "formula_derivations", "formula_decision",
    "summaries", "high_yield_guides", "revision_sheets",
    "quick_revision_cards", "blueprint", "syllabus_sections",
    "learning_outcomes", "exam_guidance", "exam_technique",
    "solution_templates", "worked_examples", "real_world_applications",
    "shortcuts", "silly_mistakes", "spiral_review",
    "remediation", "misconceptions", "model_answers",
    "difficulty_ladder", "calculator_guide",
    "derivation_techniques", "proof_techniques",
    "graph_construction_practice", "cross_topic_connections",
    "teaching", "pp_comments", "pp_text", "ppa_text",
    "practical", "practical_text", "reaction_bank",
    "diagrams", "90_tracker",
    "olympiad_physics", "olympiad_maths",
}

# Map directory names to source_type for BoardQuestion
DIR_TO_SOURCE_TYPE = {
    "question_bank": "question_bank",
    "question_bank_clean": "question_bank",
    "question_bank_answers": "question_bank",
    "question_papers": "past_paper",
    "question_papers_clean": "past_paper",
    "mock_papers": "mock_paper",
    "past_papers": "past_paper",
    "board_style_questions": "board_style",
    "diagnostic_questions": "diagnostic",
    "diagnostics": "diagnostic",
    "drill_banks": "drill_bank",
    "practice_tests": "practice_test",
    "practice": "practice",
}

# Class pattern in filenames: c10, c12, c1, etc.
CLASS_RE = re.compile(r'(?:^|_)(c\d+)(?:_|$)', re.IGNORECASE)

# Subject pattern in filenames
SUBJECT_IN_FILENAME = {
    "physics": "physics", "phys": "physics", "phy": "physics",
    "chemistry": "chem", "chem": "chem",
    "biology": "bio", "bio": "bio", "biol": "bio",
    "maths": "maths", "math": "maths", "mathematics": "maths",
    "cs": "cs", "computer_science": "cs",
    "geography": "geo", "geo": "geo",
    "evs": "evs",
    "appmath": "appmath", "applied_maths": "appmath",
    "biotech": "biotech",
}


def extract_class_from_filename(filename: str) -> list[int]:
    """Extract class levels from filename.

    Returns a list because some files cover multiple classes (e.g. c1_c8).
    """
    classes: list[int] = []
    # Match patterns like c10, c1, c12
    for m in re.finditer(r'c(\d+)', filename, re.IGNORECASE):
        cls = int(m.group(1))
        if 1 <= cls <= 12 and cls not in classes:
            classes.append(cls)
    return classes


def extract_subject_from_filename(filename: str, dir_subject: str) -> str:
    """Extract subject from filename, falling back to directory subject."""
    lower = filename.lower()
    for key, subject in SUBJECT_IN_FILENAME.items():
        if key in lower:
            return subject
    return dir_subject


def detect_question_type(question_text: str, options: list = None) -> str:
    """Detect question type from question text."""
    if options:
        return "mcq"
    lower = question_text.lower().strip()
    # Diagram-based
    if any(w in lower for w in ["diagram", "draw", "label the", "sketch"]):
        return "diagram"
    # Numerical
    if any(w in lower for w in ["calculate", "find the value", "compute", "solve", "determine the"]):
        if any(c.isdigit() for c in question_text):
            return "numerical"
    # Multi-part (has (a), (b), (i), (ii), etc.)
    if re.search(r'\([a-z]\)', question_text) or re.search(r'\([ivx]+\)', question_text):
        return "multi_part"
    # Long answer
    if len(question_text) > 200 or "explain" in lower or "describe" in lower or "discuss" in lower:
        return "long_answer"
    # True/False
    if lower.startswith("true") or lower.startswith("false") or "state whether" in lower:
        return "true_false"
    return "short_answer"


def find_content_files(
    root: Path, subject_filter: Optional[str] = None
) -> tuple[list[tuple[str, str, Path]], list[tuple[str, str, Path]]]:
    """Find all question-type and class-level content files.

    Returns (question_files, class_level_files) where each is a list of
    (subject, content_type, filepath) tuples.

    Scans the main cisce root AND sibling directories on the Desktop
    (e.g. Desktop/chemistry which holds chemistry content separately).
    """
    question_files: list[tuple[str, str, Path]] = []
    class_level_files: list[tuple[str, str, Path]] = []
    seen_subjects: set[str] = set()

    def _scan_dir(subj_dir: Path, subject: str):
        if subject in seen_subjects:
            return
        found_any = False
        for content_dir in sorted(subj_dir.iterdir()):
            if not content_dir.is_dir():
                continue
            ctype = content_dir.name
            if ctype in QUESTION_DIRS:
                source_type = DIR_TO_SOURCE_TYPE.get(ctype, ctype)
                for f in sorted(content_dir.glob("*.marker")):
                    question_files.append((subject, source_type, f))
                    found_any = True
            elif ctype in CLASS_LEVEL_DIRS:
                for f in sorted(content_dir.glob("*.marker")):
                    class_level_files.append((subject, ctype, f))
                    found_any = True
        # Only mark as seen if we found files, so sibling dirs can still contribute
        if found_any:
            seen_subjects.add(subject)

    # Scan main root
    for subj_dir in sorted(root.iterdir()):
        if not subj_dir.is_dir():
            continue
        dir_name = subj_dir.name
        if dir_name.startswith(".") or dir_name.startswith("_"):
            continue
        if dir_name in ("enrichment_prompts", "enrichment_logs",
                        "tagging_prompts", "tagging_logs",
                        "all_subjects_logs", "all_subjects_prompts",
                        "item_banks_icse", "item_banks_isc",
                        "ppa_icse", "ppa_isc", "__pycache__"):
            continue

        subject = SUBJECT_MAP.get(dir_name, dir_name)
        if subject in EXCLUDED_SUBJECTS or dir_name in EXCLUDED_SUBJECTS:
            continue
        if subject_filter and subject != subject_filter:
            continue
        _scan_dir(subj_dir, subject)

    # Scan sibling directories on the Desktop (e.g. Desktop\chemistry)
    parent = root.parent
    for sibling in sorted(parent.iterdir()):
        if not sibling.is_dir():
            continue
        if sibling == root:
            continue
        sname = sibling.name
        if sname.startswith(".") or sname.startswith("_"):
            continue
        subject = SUBJECT_MAP.get(sname)
        if not subject:
            continue
        if subject in EXCLUDED_SUBJECTS or sname in EXCLUDED_SUBJECTS:
            continue
        if subject_filter and subject != subject_filter:
            continue
        _scan_dir(sibling, subject)

    return question_files, class_level_files


async def load_question_banks(
    db: AsyncSession,
    files: list[tuple[str, str, Path]],
    dry_run: bool = False,
) -> dict:
    """Load question bank files into BoardQuestion table."""
    if dry_run:
        total_q = 0
        by_type: dict[str, int] = {}
        by_subject: dict[str, int] = {}
        for subject, source_type, filepath in files:
            try:
                parsed = parse_question_bank_file(str(filepath))
                qs = parsed.get("questions", [])
                by_subject[subject] = by_subject.get(subject, 0) + len(qs)
                total_q += len(qs)
                by_type[source_type] = by_type.get(source_type, 0) + len(qs)
            except Exception:
                pass
        return {"total_files": len(files), "total_questions": total_q,
                "by_type": by_type, "by_subject": by_subject, "dry_run": True}

    inserted = 0
    errors: list[str] = []
    by_subject: dict[str, int] = {}

    for subject, source_type, filepath in files:
        try:
            parsed = parse_question_bank_file(str(filepath))
            questions = parsed.get("questions", [])
            classes = extract_class_from_filename(filepath.name)
            if not classes and parsed.get("class_level"):
                classes = [parsed["class_level"]]
            if not classes:
                classes = [0]  # unknown class

            file_subject = extract_subject_from_filename(filepath.name, subject)

            for q in questions:
                qtext = q.get("question", "").strip()
                if not qtext:
                    continue

                qtype = detect_question_type(qtext)
                board_q = BoardQuestion(
                    question_number=q.get("number"),
                    node_tags=[],  # no per-question tagging
                    subject=file_subject,
                    class_level=classes[0],
                    chapter=parsed.get("chapter", "") or None,
                    section=q.get("section", "") or None,
                    question_type=qtype,
                    question_text=qtext,
                    correct_answer=q.get("answer", "") or None,
                    model_answer=q.get("answer", "") or None,
                    marks=q.get("marks", 1),
                    difficulty="medium",
                    source_type=source_type,
                    source_file=str(filepath),
                    board="CISCE",
                )
                db.add(board_q)
                inserted += 1
                by_subject[file_subject] = by_subject.get(file_subject, 0) + 1

        except Exception as e:
            errors.append(f"{filepath.name}: {e}")

    await db.commit()
    return {"total_files": len(files), "inserted": inserted,
            "by_subject": by_subject, "errors": errors}


async def load_class_level_content(
    db: AsyncSession,
    files: list[tuple[str, str, Path]],
    dry_run: bool = False,
) -> dict:
    """Load class-level content files into ClassLevelContent table."""
    if dry_run:
        by_type: dict[str, int] = {}
        by_subject: dict[str, int] = {}
        for subject, ctype, filepath in files:
            by_type[ctype] = by_type.get(ctype, 0) + 1
            by_subject[subject] = by_subject.get(subject, 0) + 1
        return {"total_files": len(files), "by_type": by_type,
                "by_subject": by_subject, "dry_run": True}

    inserted = 0
    errors: list[str] = []
    by_type: dict[str, int] = {}

    for subject, ctype, filepath in files:
        try:
            content = filepath.read_text(encoding="utf-8")
            classes = extract_class_from_filename(filepath.name)
            if not classes:
                # Check if filename implies all classes (e.g. formula_bank_c1_c8)
                classes = list(range(1, 13))  # default to all

            file_subject = extract_subject_from_filename(filepath.name, subject)

            clc = ClassLevelContent(
                target_class=classes,
                target_subject=file_subject,
                content_type=ctype,
                title=filepath.stem,
                content=content,
                source_file=str(filepath),
                board="CISCE",
            )
            db.add(clc)
            inserted += 1
            by_type[ctype] = by_type.get(ctype, 0) + 1
        except Exception as e:
            errors.append(f"{filepath.name}: {e}")

    await db.commit()
    return {"total_files": len(files), "inserted": inserted,
            "by_type": by_type, "errors": errors}


async def main():
    parser = argparse.ArgumentParser(description="Load question banks and class-level content")
    parser.add_argument("--root", default=str(CISCE_ROOT))
    parser.add_argument("--subject", default=None)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    root = Path(args.root)
    print(f"Loading content from: {root}")
    if args.subject:
        print(f"Subject filter: {args.subject}")
    if args.dry_run:
        print("DRY RUN -- no database writes")
    print()

    question_files, class_level_files = find_content_files(root, args.subject)
    print(f"Found {len(question_files)} question files, {len(class_level_files)} class-level files")
    print()

    async with async_session() as db:
        print("Loading question banks...")
        q_result = await load_question_banks(db, question_files, dry_run=args.dry_run)
        print(f"  Files: {q_result['total_files']}")
        if q_result.get("dry_run"):
            print(f"  Questions (parsed): {q_result['total_questions']}")
            print(f"  By source type: {q_result['by_type']}")
            print(f"  By subject: {q_result['by_subject']}")
        else:
            print(f"  Inserted: {q_result['inserted']}")
            if q_result.get("errors"):
                print(f"  Errors: {len(q_result['errors'])}")

        print("\nLoading class-level content...")
        c_result = await load_class_level_content(db, class_level_files, dry_run=args.dry_run)
        print(f"  Files: {c_result['total_files']}")
        if c_result.get("dry_run"):
            print(f"  By type: {c_result['by_type']}")
            print(f"  By subject: {c_result['by_subject']}")
        else:
            print(f"  Inserted: {c_result['inserted']}")
            if c_result.get("errors"):
                print(f"  Errors: {len(c_result['errors'])}")

    print("\n" + "=" * 60)
    print("CONTENT LOAD COMPLETE")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())
