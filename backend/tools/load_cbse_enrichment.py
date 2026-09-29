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

MD_DIR = Path("/app/content/enhanced_nodes_md")
SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*\n", re.MULTILINE)
FNAME_RE = re.compile(
    r"c(\d+)_([a-z]+(?:_[a-z]+)*?)_(?:cbse_|ch|u)?(\d+)_(\d+)$", re.IGNORECASE)


def parse_md(text: str) -> dict[str, str]:
    parts = SECTION_RE.split(text)
    sections = {}
    for i in range(1, len(parts) - 1, 2):
        sections[parts[i].strip()] = parts[i + 1].strip()
    return sections


def parse_file(path: Path) -> dict | None:
    m = FNAME_RE.search(path.stem)
    if not m:
        return None
    class_level, subject, chapter, _num = (
        int(m.group(1)), m.group(2), m.group(3), int(m.group(4)))
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
        # Derive display title from the definition's leading term
        # ("Life processes are ..." → "Life Processes"); fall back to
        # a subject·chapter label — never the raw node id.
        m = re.match(
            r"^([A-Z][^.;:]{3,55}?)\s+(?:is|are|refers|means|can be|"
            r"denotes|consists|represents|occurs|was|were|has|have|also)",
            sections.get("DEFINITION", "").strip())
        if m:
            title = m.group(1).title()
        else:
            # Hindi/verbose definitions: leading term before an em-dash,
            # colon or sentence break ("प्रमुख घटनाएँ — ..." → "प्रमुख घटनाएँ").
            head = sections.get("DEFINITION", "").strip().split("\n")[0].strip()
            title = ""
            for sep in (" — ", " – ", ": ", "।", "."):
                if sep in head:
                    cand = head.split(sep, 1)[0].strip()
                    if 3 <= len(cand) <= 60:
                        title = cand
                        break
            if not title:
                title = (head[:57].rstrip() + "…") if len(head) > 60 \
                    else (head or f"{subject.title()} · Ch {chapter}")

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
        "board": "CBSE",
        "difficulty": "medium",
    }


async def main() -> None:
    files = sorted(MD_DIR.glob("*.md"))
    print(f"{len(files)} md files")

    parsed = []
    skipped = 0
    for f in files:
        rec = parse_file(f)
        if rec:
            parsed.append(rec)
        else:
            skipped += 1
    print(f"parsed {len(parsed)} nodes, skipped {skipped}")

    async with async_session() as db:
        existing = set((await db.execute(
            select(EnrichmentContent.node_id))).scalars().all())
        print(f"existing enrichment rows: {len(existing)}")

        inserted = updated = 0
        for rec in parsed:
            if rec["node_id"] in existing:
                row = (await db.execute(select(EnrichmentContent).where(
                    EnrichmentContent.node_id == rec["node_id"]))).scalar_one()
                for k, v in rec.items():
                    setattr(row, k, v)
                updated += 1
            else:
                db.add(EnrichmentContent(**rec))
                inserted += 1
            if (inserted + updated) % 1000 == 0:
                await db.commit()
                print(f"  {inserted+updated}...")
        await db.commit()
        print(f"done: {inserted} inserted, {updated} updated")


if __name__ == "__main__":
    asyncio.run(main())
