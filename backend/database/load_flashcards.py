"""Load SRS flashcard .tsv files into ClassLevelContent table.

Each TSV file has columns: front, back, category, cognitive_level
Organized by subject + class level.

Usage:
    python -m backend.database.load_flashcards
"""
import asyncio
import csv
import os
import re
from pathlib import Path
from typing import Optional

from sqlalchemy import select, delete
from backend.database import async_session
from backend.models.enrichment import ClassLevelContent

# CISCE content lives outside the repo; override CISCE_CONTENT_ROOT when
# deploying elsewhere.
CISCE_ROOT = Path(os.environ.get(
    "CISCE_CONTENT_ROOT", r"C:\Users\Alesha4285\Desktop\cisce"))
DESKTOP = Path(os.environ.get("CISCE_DESKTOP_ROOT", CISCE_ROOT.parent))

# Subject directory → canonical subject name
SUBJECT_MAP = {
    "physics": "physics",
    "chem": "chem",
    "chemistry": "chem",
    "bio": "bio",
    "biology": "bio",
    "maths": "maths",
    "math": "maths",
}


def parse_flashcard_tsv(filepath: Path) -> list[dict]:
    """Parse a flashcard TSV file into a list of card dicts.

    Handles two formats:
    1. Standard TSV with header: front\tback\tcategory\tcognitive_level
    2. Anki-style TSV with metadata lines starting with # and columns: front\tback\ttags
    """
    cards = []

    # Detect encoding and read
    with open(filepath, "rb") as f:
        raw = f.read()
    # Try UTF-8 first, fall back to UTF-16
    for enc in ("utf-8", "utf-16", "utf-16-le", "utf-16-be", "latin-1"):
        try:
            text = raw.decode(enc)
            break
        except (UnicodeDecodeError, LookupError):
            continue

    lines = text.splitlines()

    # Filter out Anki metadata lines (start with #)
    data_lines = [l for l in lines if l.strip() and not l.strip().startswith("#")]

    if not data_lines:
        return cards

    # Check if first line is a header
    first_line = data_lines[0].lower()
    has_header = "front" in first_line and "back" in first_line

    if has_header:
        reader = csv.DictReader(data_lines, delimiter="\t")
        for row in reader:
            front = (row.get("front") or "").strip()
            back = (row.get("back") or "").strip()
            category = (row.get("category") or "").strip()
            cognitive_level = (row.get("cognitive_level") or "").strip()
            if front and back:
                cards.append({
                    "front": front,
                    "back": back,
                    "category": category,
                    "cognitive_level": cognitive_level,
                })
    else:
        # Anki-style: columns are front, back, tags (no header)
        for line in data_lines:
            parts = line.split("\t")
            if len(parts) >= 2:
                front = parts[0].strip()
                back = parts[1].strip()
                tags = parts[2].strip() if len(parts) > 2 else ""
                # Extract category from tags (first tag is usually the category)
                category = tags.split("::")[0] if "::" in tags else tags
                cognitive_level = ""
                # Try to extract cognitive level from tags
                if "::" in tags:
                    tag_parts = tags.split("::")
                    if len(tag_parts) > 1:
                        cognitive_level = tag_parts[-1].strip()
                if front and back:
                    cards.append({
                        "front": front,
                        "back": back,
                        "category": category,
                        "cognitive_level": cognitive_level,
                    })

    return cards


def extract_class_from_filename(filename: str) -> list[int]:
    """Extract class levels from filename like 'physics_flashcards_c10.tsv'."""
    # Match patterns: c10, c11_c12, c1_c8, c9_c10
    matches = re.findall(r'c(\d+)', filename)
    if not matches:
        return []
    classes = [int(m) for m in matches]
    if len(classes) == 1:
        return [classes[0]]
    # For ranges like c1_c8, expand to [1,2,3,4,5,6,7,8]
    if len(classes) == 2 and classes[1] - classes[0] > 2:
        return list(range(classes[0], classes[1] + 1))
    return classes


def extract_subject_from_filename(filename: str, dir_subject: str) -> str:
    """Extract subject from filename, falling back to directory subject."""
    lower = filename.lower()
    for key, subject in SUBJECT_MAP.items():
        if key in lower:
            return subject
    return SUBJECT_MAP.get(dir_subject, dir_subject)


def find_flashcard_files() -> list[tuple[str, list[int], Path]]:
    """Find all flashcard TSV files.

    Returns list of (subject, class_levels, filepath) tuples.
    Scans cisce subject dirs and Desktop sibling dirs.
    """
    results = []

    # Scan cisce root
    for subj_dir in sorted(CISCE_ROOT.iterdir()):
        if not subj_dir.is_dir() or subj_dir.name.startswith(".") or subj_dir.name.startswith("_"):
            continue
        fc_dir = subj_dir / "srs_flashcards"
        if not fc_dir.is_dir():
            continue
        for tsv_file in sorted(fc_dir.glob("*.tsv")):
            classes = extract_class_from_filename(tsv_file.name)
            if not classes:
                continue
            subject = extract_subject_from_filename(tsv_file.name, subj_dir.name)
            results.append((subject, classes, tsv_file))

    # Scan Desktop sibling dirs (chemistry)
    for sibling in sorted(DESKTOP.iterdir()):
        if not sibling.is_dir() or sibling == CISCE_ROOT or sibling.name.startswith("."):
            continue
        fc_dir = sibling / "srs_flashcards"
        if not fc_dir.is_dir():
            continue
        for tsv_file in sorted(fc_dir.glob("*.tsv")):
            classes = extract_class_from_filename(tsv_file.name)
            if not classes:
                continue
            subject = extract_subject_from_filename(tsv_file.name, sibling.name)
            # Avoid duplicates
            existing = [(s, c, f) for s, c, f in results if s == subject and f.name == tsv_file.name]
            if existing:
                continue
            results.append((subject, classes, tsv_file))

    return results


async def load_flashcards(dry_run: bool = False) -> dict:
    """Load all flashcard files into ClassLevelContent table."""
    files = find_flashcard_files()
    print(f"Found {len(files)} flashcard files")

    if dry_run:
        total_cards = 0
        by_subject = {}
        for subject, classes, filepath in files:
            cards = parse_flashcard_tsv(filepath)
            by_subject[subject] = by_subject.get(subject, 0) + len(cards)
            total_cards += len(cards)
            print(f"  {filepath.name}: {len(cards)} cards (subject={subject}, classes={classes})")
        print(f"\nTotal cards: {total_cards}")
        print(f"By subject: {by_subject}")
        return {"total_files": len(files), "total_cards": total_cards}

    # Delete existing flashcard entries
    async with async_session() as db:
        await db.execute(
            delete(ClassLevelContent).where(
                ClassLevelContent.content_type == "srs_flashcards"
            )
        )
        await db.commit()
    print("Cleared existing flashcard entries")

    inserted = 0
    errors = []
    by_subject = {}

    for subject, classes, filepath in files:
        try:
            cards = parse_flashcard_tsv(filepath)
            if not cards:
                continue

            # Build content as structured text
            lines = []
            for card in cards:
                lines.append(f"FRONT: {card['front']}")
                lines.append(f"BACK: {card['back']}")
                if card['category']:
                    lines.append(f"CATEGORY: {card['category']}")
                if card['cognitive_level']:
                    lines.append(f"LEVEL: {card['cognitive_level']}")
                lines.append("---")
            content = "\n".join(lines)

            clc = ClassLevelContent(
                target_class=classes,
                target_subject=subject,
                content_type="srs_flashcards",
                title=filepath.stem,
                content=content,
                source_file=str(filepath),
                board="CISCE",
            )
            async with async_session() as db:
                db.add(clc)
                await db.commit()

            inserted += 1
            by_subject[subject] = by_subject.get(subject, 0) + len(cards)
            print(f"  Loaded {filepath.name}: {len(cards)} cards (subject={subject}, classes={classes})")

        except Exception as e:
            errors.append(f"{filepath.name}: {e}")

    print(f"\nInserted {inserted} files, {sum(by_subject.values())} total cards")
    print(f"By subject: {by_subject}")
    if errors:
        print(f"Errors: {len(errors)}")
        for e in errors:
            print(f"  {e}")

    return {"inserted": inserted, "errors": errors, "by_subject": by_subject}


async def main():
    import sys
    dry_run = "--dry-run" in sys.argv
    await load_flashcards(dry_run=dry_run)


if __name__ == "__main__":
    asyncio.run(main())
