"""Load CISCE enrichment .marker files into PostgreSQL structured columns.

This loader scans the enrichment directories, parses each .marker file
using the existing marker_parser, and inserts/upserts rows into the
enrichment_content table with structured columns for every pedagogical
field.

The loader is subject-agnostic -- it scans any subject directory that
has an enrichment/ subdirectory and loads what it finds.

Usage:
    python -m backend.database.load_enrichment                    # load all
    python -m backend.database.load_enrichment --subject=physics   # one subject
    python -m backend.database.load_enrichment --dry-run           # preview only
"""

import argparse
import asyncio
import json
import os
import re
import sys
from pathlib import Path
from typing import Optional

from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import async_session
from backend.models.enrichment import EnrichmentContent, ContentVersion
from backend.database.marker_parser import parse_enrichment_file, _cognitive_level_to_difficulty

# Default content library root.  CISCE content lives outside the repo;
# override CISCE_CONTENT_ROOT when deploying elsewhere.
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

# Subjects that are NOT loaded (excluded from the core STEM scope)
EXCLUDED_SUBJECTS = {"cs", "geo", "evs", "appmath", "biotech", "eng"}

# Node ID pattern: c10_phy_001, c12_chem_042, etc.
NODE_ID_RE = re.compile(r'^c(\d+)_(\w+)_(\d+)$')

# Subject short names in node IDs
NODE_SUBJECT_MAP = {
    "phy": "physics",
    "chem": "chem",
    "bio": "bio",
    "maths": "maths",
    "math": "maths",
    "cs": "cs",
    "geo": "geo",
    "evs": "evs",
    "appmath": "appmath",
    "biotech": "biotech",
}


def parse_node_id(node_id: str) -> Optional[dict]:
    """Parse a node_id like 'c10_phy_001' into components."""
    m = NODE_ID_RE.match(node_id)
    if not m:
        return None
    class_level = int(m.group(1))
    subj_short = m.group(2)
    seq = int(m.group(3))
    subject = NODE_SUBJECT_MAP.get(subj_short, subj_short)
    return {
        "class_level": class_level,
        "subject": subject,
        "subject_short": subj_short,
        "sequence": seq,
    }


def load_graph_metadata(graph_dir: Path) -> dict[str, dict]:
    """Load prerequisite/forward metadata from graph JSON files.

    Returns a dict keyed by node_id with prereq_ids, depth_prereq_ids,
    forward_node_ids, chapter, chapter_name.
    """
    metadata: dict[str, dict] = {}
    graph_files = {
        "physics_graph.json": "physics",
        "chem_graph.json": "chem",
        "bio_graph.json": "bio",
        "maths_graph.json": "maths",
    }
    for filename, subject in graph_files.items():
        filepath = graph_dir / filename
        if not filepath.exists():
            continue
        with open(filepath, "r", encoding="utf-8") as f:
            nodes = json.load(f)
        for node in nodes:
            nid = node.get("node_id", "")
            if not nid:
                continue
            metadata[nid] = {
                "prereq_ids": node.get("prerequisite_node_ids", []),
                "depth_prereq_ids": node.get("depth_progression_prereqs", []),
                "forward_node_ids": node.get("forward_node_ids", []),
                "chapter": node.get("chapter", ""),
                "chapter_name": node.get("chapter_name", ""),
                "subject": subject,
            }
    return metadata


def find_enrichment_files(root: Path, subject_filter: Optional[str] = None) -> list[tuple[str, Path]]:
    """Find all enrichment .marker files.

    Returns list of (subject_name, filepath) tuples.
    Scans the main cisce root AND any sibling directories on the Desktop
    that have enrichment subdirectories (e.g. Desktop/chemistry which
    holds the chemistry enrichment files separately).
    """
    results: list[tuple[str, Path]] = []

    # Scan the main root directory
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

        enrichment_dir = subj_dir / "enrichment"
        if not enrichment_dir.is_dir():
            continue

        for marker_file in sorted(enrichment_dir.glob("*.marker")):
            results.append((subject, marker_file))

    # Also scan sibling directories on the Desktop (e.g. Desktop\chemistry)
    # This catches subjects whose enrichment files live outside the cisce root
    parent = root.parent  # Desktop
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
        enrichment_dir = sibling / "enrichment"
        if not enrichment_dir.is_dir():
            continue
        # Avoid duplicates: skip if we already have files for this subject
        existing = [f for s, f in results if s == subject]
        if existing:
            continue
        for marker_file in sorted(enrichment_dir.glob("*.marker")):
            results.append((subject, marker_file))

    return results


async def load_enrichment(
    db: AsyncSession,
    root: Path,
    subject_filter: Optional[str] = None,
    graph_dir: Optional[Path] = None,
    dry_run: bool = False,
) -> dict:
    """Load all enrichment files into the database.

    Returns a summary dict with counts.
    """
    # Load graph metadata for prereq/forward info
    graph_meta: dict[str, dict] = {}
    if graph_dir and graph_dir.exists():
        graph_meta = load_graph_metadata(graph_dir)
        print(f"  Loaded graph metadata for {len(graph_meta)} nodes")

    # Find all enrichment files
    files = find_enrichment_files(root, subject_filter)
    print(f"  Found {len(files)} enrichment files")

    if dry_run:
        # Just parse and report, don't write to DB
        total_nodes = 0
        by_subject: dict[str, int] = {}
        errors: list[str] = []
        for subject, filepath in files:
            try:
                nodes = parse_enrichment_file(str(filepath))
                by_subject[subject] = by_subject.get(subject, 0) + len(nodes)
                total_nodes += len(nodes)
            except Exception as e:
                errors.append(f"{filepath.name}: {e}")
        return {
            "total_files": len(files),
            "total_nodes": total_nodes,
            "by_subject": by_subject,
            "errors": errors,
            "dry_run": True,
        }

    # Parse all files first
    all_nodes: list[dict] = []
    parse_errors: list[str] = []
    for subject, filepath in files:
        try:
            nodes = parse_enrichment_file(str(filepath))
            for node in nodes:
                node["_source_file"] = str(filepath)
                node["_dir_subject"] = subject
                all_nodes.append(node)
        except Exception as e:
            parse_errors.append(f"{filepath.name}: {e}")

    print(f"  Parsed {len(all_nodes)} nodes from {len(files)} files")
    if parse_errors:
        print(f"  Parse errors: {len(parse_errors)}")
        for err in parse_errors[:5]:
            print(f"    {err}")

    # Get existing node IDs for upsert detection
    existing_result = await db.execute(select(EnrichmentContent.node_id))
    existing_ids = {row[0] for row in existing_result}

    inserted = 0
    updated = 0
    skipped = 0
    batch = []
    BATCH_SIZE = 100

    for node_data in all_nodes:
        node_id = node_data.get("node_id", "")
        if not node_id:
            skipped += 1
            continue

        # Skip if already exists (will update below in bulk)
        if node_id in existing_ids:
            # Update existing row
            parsed = parse_node_id(node_id)
            if parsed:
                class_level = parsed["class_level"]
                subject = parsed["subject"]
            else:
                subject = node_data.get("_dir_subject", "unknown")
                class_level = 0
                m = re.match(r'c(\d+)', node_id)
                if m:
                    class_level = int(m.group(1))

            gmeta = graph_meta.get(node_id, {})

            existing = await db.execute(
                select(EnrichmentContent).where(EnrichmentContent.node_id == node_id)
            )
            existing_row = existing.scalar_one_or_none()
            if existing_row:
                existing_row.title = node_data.get("title", "") or node_id
                existing_row.subject = subject
                existing_row.class_level = class_level
                existing_row.chapter = gmeta.get("chapter", "") or None
                existing_row.definition = node_data.get("definition", "") or None
                existing_row.text_walkthrough = node_data.get("text_walkthrough", "") or None
                existing_row.eli5 = node_data.get("eli5", "") or None
                existing_row.common_misconception = node_data.get("common_misconception", "") or None
                existing_row.diagnostic_questions = node_data.get("diagnostic_questions", []) or None
                existing_row.on_failure = node_data.get("on_failure", []) or None
                existing_row.examples = node_data.get("examples", "") or None
                existing_row.cognitive_level = node_data.get("cognitive_level", "") or None
                existing_row.mastery_criteria = node_data.get("mastery_criteria", "") or None
                existing_row.scope_boundary = node_data.get("scope_boundary", "") or None
                existing_row.prereq_ids = gmeta.get("prereq_ids", []) or None
                existing_row.depth_prereq_ids = gmeta.get("depth_prereq_ids", []) or None
                existing_row.forward_node_ids = gmeta.get("forward_node_ids", []) or None
                existing_row.source_file = node_data.get("_source_file")
                existing_row.difficulty = node_data.get("difficulty", "medium")
                updated += 1
            continue

        # Parse node_id for class/subject
        parsed = parse_node_id(node_id)
        if parsed:
            class_level = parsed["class_level"]
            subject = parsed["subject"]
        else:
            subject = node_data.get("_dir_subject", "unknown")
            class_level = 0
            m = re.match(r'c(\d+)', node_id)
            if m:
                class_level = int(m.group(1))

        gmeta = graph_meta.get(node_id, {})

        content = EnrichmentContent(
            node_id=node_id,
            title=node_data.get("title", "") or node_id,
            subject=subject,
            class_level=class_level,
            chapter=gmeta.get("chapter", "") or None,
            definition=node_data.get("definition", "") or None,
            text_walkthrough=node_data.get("text_walkthrough", "") or None,
            eli5=node_data.get("eli5", "") or None,
            common_misconception=node_data.get("common_misconception", "") or None,
            diagnostic_questions=node_data.get("diagnostic_questions", []) or None,
            on_failure=node_data.get("on_failure", []) or None,
            examples=node_data.get("examples", "") or None,
            cognitive_level=node_data.get("cognitive_level", "") or None,
            mastery_criteria=node_data.get("mastery_criteria", "") or None,
            scope_boundary=node_data.get("scope_boundary", "") or None,
            prereq_ids=gmeta.get("prereq_ids", []) or None,
            depth_prereq_ids=gmeta.get("depth_prereq_ids", []) or None,
            forward_node_ids=gmeta.get("forward_node_ids", []) or None,
            source_file=node_data.get("_source_file"),
            board="CISCE",
            difficulty=node_data.get("difficulty", "medium"),
        )
        db.add(content)
        inserted += 1
        existing_ids.add(node_id)  # prevent duplicate adds

        # Commit in batches
        if inserted % BATCH_SIZE == 0:
            await db.commit()
            print(f"    ... committed {inserted} rows")

    # Final commit
    await db.commit()

    # Log version info
    by_subject: dict[str, int] = {}
    for node_data in all_nodes:
        nid = node_data.get("node_id", "")
        parsed = parse_node_id(nid)
        s = parsed["subject"] if parsed else node_data.get("_dir_subject", "unknown")
        by_subject[s] = by_subject.get(s, 0) + 1

    return {
        "total_files": len(files),
        "total_nodes": len(all_nodes),
        "inserted": inserted,
        "updated": updated,
        "skipped": skipped,
        "by_subject": by_subject,
        "parse_errors": parse_errors,
    }


async def main():
    parser = argparse.ArgumentParser(description="Load enrichment .marker files into PostgreSQL")
    parser.add_argument("--root", default=str(CISCE_ROOT), help="CISCE content root directory")
    parser.add_argument("--subject", default=None, help="Filter to one subject (physics, bio, maths, etc.)")
    parser.add_argument("--graph-dir", default=r"D:\node_generator\atomic_graph\cisce_stem",
                        help="Directory with graph JSON files for prereq metadata")
    parser.add_argument("--dry-run", action="store_true", help="Parse only, don't write to DB")
    args = parser.parse_args()

    root = Path(args.root)
    graph_dir = Path(args.graph_dir)

    print(f"Loading enrichment from: {root}")
    print(f"Graph metadata from: {graph_dir}")
    if args.subject:
        print(f"Subject filter: {args.subject}")
    if args.dry_run:
        print("DRY RUN -- no database writes")
    print()

    async with async_session() as db:
        result = await load_enrichment(
            db, root, subject_filter=args.subject,
            graph_dir=graph_dir, dry_run=args.dry_run,
        )

    print("\n" + "=" * 60)
    print("ENRICHMENT LOAD SUMMARY")
    print("=" * 60)
    print(f"Total files scanned:  {result['total_files']}")
    print(f"Total nodes parsed:   {result['total_nodes']}")
    if not result.get("dry_run"):
        print(f"Inserted:             {result['inserted']}")
        print(f"Updated:              {result['updated']}")
        print(f"Skipped:              {result['skipped']}")
    print(f"\nBy subject:")
    for subject, count in sorted(result.get("by_subject", {}).items()):
        print(f"  {subject:15s}: {count}")
    if result.get("parse_errors"):
        print(f"\nParse errors: {len(result['parse_errors'])}")
        for err in result["parse_errors"][:10]:
            print(f"  {err}")


if __name__ == "__main__":
    asyncio.run(main())
