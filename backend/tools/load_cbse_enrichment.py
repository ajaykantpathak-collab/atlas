"""Load the CBSE enhanced_nodes_md corpus into enrichment_content.

Each .md file is one knowledge node with `## SECTION` headers:
DEFINITION, WALKTHROUGH, MASTERY_CRITERIA, COGNITIVE_LEVEL, SCOPE_BOUNDARY,
COMMON_MISCONCEPTION, ON_FAILURE, DIAGNOSTIC_QUESTION_N/ANSWER_N,
WORKED_EXAMPLE_N, PREREQUISITE_NODE_IDS, ...
"""
import asyncio
import re
from pathlib import Path

from sqlalchemy import select

from backend.database import async_session
from backend.models.enrichment import EnrichmentContent

# Dual-corpus: CBSE + CISCE (icse/isc filename tokens → board CISCE).
MD_DIRS = [
    (Path("/app/content/enhanced_nodes_md"), "CBSE"),
    (Path("/app/content/cisce_nodes_v2"), "CISCE"),
]
SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*\n", re.MULTILINE)
FNAME_RE = re.compile(
    r"c(\d+)_([a-z]+(?:_[a-z]+)*?)_(cbse|icse|isc|ch|u)?_?(\d+)_(\d+)$",
    re.IGNORECASE)


def parse_md(text: str) -> dict[str, str]:
    parts = SECTION_RE.split(text)
    sections = {}
    for i in range(1, len(parts) - 1, 2):
        sections[parts[i].strip()] = parts[i + 1].strip()
    return sections


def parse_file(path: Path, default_board: str = "CBSE") -> dict | None:
    m = FNAME_RE.search(path.stem)
    if not m:
        return None
    class_level, subject, board_tok, chapter, _num = (
        int(m.group(1)), m.group(2), (m.group(3) or "").lower(),
        int(m.group(4)), m.group(5))
    # Filename board token beats the dir default — an _icse_/_isc_ file is
    # CISCE wherever it lives; ch/u/empty = legacy CBSE naming.
    board = "CISCE" if board_tok in ("icse", "isc") else (
        "CBSE" if board_tok in ("cbse", "ch", "u", "") else default_board)
    if path.stem.endswith("_comp"):
        return None  # case-study companions excluded from enrichment nodes

    sections = parse_md(path.read_text(encoding="utf-8", errors="ignore"))
    if not sections.get("DEFINITION"):
        return None

    diags = []
    for i in range(1, 7):
        q = sections.get(f"DIAGNOSTIC_QUESTION_{i}")
        a = sections.get(f"DIAGNOSTIC_ANSWER_{i}")
        if q:
            diags.append({"number": i, "question": q, "answer": a or ""})

    worked = [v for k, v in sections.items() if k.startswith("WORKED_EXAMPLE_")]

    def _id_list(key: str) -> list[str]:
        return [n.strip() for n in re.split(r"[,\n]", sections.get(key, ""))
                if n.strip().startswith("c")]

    prereqs = _id_list("PREREQUISITE_NODE_IDS") or _id_list("BUILDS_ON")
    forwards = _id_list("FORWARD_NODE_IDS") or _id_list("LEADS_TO")
    cross = _id_list("CROSS_SUBJECT_PREREQS")

    title = re.sub(r"_", " ", sections.get("TITLE", "")).strip()
    if not title:
        # Shared serve-time deriver (enhanced_nodes._title_from_head):
        # markup stripped, defined concept taken left of the first finite
        # verb, meta openers ("This node covers…") un-nested to the covered
        # object; falls back to a subject·chapter label — never the node id.
        from backend.services.enhanced_nodes import _title_from_head
        title = _title_from_head(
            sections.get("DEFINITION", "").split("\n")[0])
        if title:
            title = title[0].upper() + title[1:]
        else:
            title = f"{subject.title()} · Ch {chapter}"

    return {
        "node_id": path.stem,
        "title": title,
        "subject": subject,
        "class_level": class_level,
        "chapter": f"ch{chapter}",
        "definition": sections.get("DEFINITION"),
        "text_walkthrough": sections.get("WALKTHROUGH"),
        "common_misconception": sections.get("COMMON_MISCONCEPTION"),
        "diagnostic_questions": diags or None,
        "on_failure": ([{"question_number": 0,
                         "remediation_text": sections["ON_FAILURE"],
                         "review_node_ids": []}]
                       if sections.get("ON_FAILURE") else None),
        "examples": "\n\n".join(worked) if worked else None,
        "cognitive_level": sections.get("COGNITIVE_LEVEL"),
        "mastery_criteria": sections.get("MASTERY_CRITERIA"),
        "scope_boundary": sections.get("SCOPE_BOUNDARY"),
        "prereq_ids": prereqs or None,
        "depth_prereq_ids": cross or None,
        "forward_node_ids": forwards or None,
        "source_file": str(path),
        "board": board,
        "difficulty": "medium",
    }


async def main() -> None:
    parsed = []
    skipped = 0
    for md_dir, board in MD_DIRS:
        files = sorted(md_dir.glob("*.md"))
        print(f"{len(files)} md files in {md_dir} (board={board})")
        for f in files:
            rec = parse_file(f, default_board=board)
            if rec:
                parsed.append(rec)
            else:
                skipped += 1
    print(f"parsed {len(parsed)} nodes, skipped {skipped}")

    async with async_session() as db:
        existing = set((await db.execute(
            select(EnrichmentContent.node_id))).scalars().all())
        print(f"existing enrichment rows: {len(existing)}")

        # one SELECT per batch of stale ids — not per record
        stale_ids = [r["node_id"] for r in parsed if r["node_id"] in existing]
        new_recs  = [r for r in parsed if r["node_id"] not in existing]
        existing_rows = {}
        for i in range(0, len(stale_ids), 500):
            chunk = stale_ids[i:i+500]
            rows = (await db.execute(
                select(EnrichmentContent).where(
                    EnrichmentContent.node_id.in_(chunk)))).scalars().all()
            existing_rows.update({r.node_id: r for r in rows})

        inserted = updated = 0
        for rec in new_recs:
            db.add(EnrichmentContent(**rec))
            inserted += 1
            if inserted % 1000 == 0:
                await db.commit()
                print(f"  {inserted} inserted...")
        for rec in parsed:
            row = existing_rows.get(rec["node_id"])
            if row is None:
                continue
            for k, v in rec.items():
                setattr(row, k, v)
            updated += 1
            if updated % 1000 == 0:
                await db.commit()
                print(f"  {updated} updated...")
        await db.commit()
        print(f"done: {inserted} inserted, {updated} updated")


if __name__ == "__main__":
    asyncio.run(main())
