"""Notes service — fetches dedicated topic notes from ClassLevelContent.

The enrichment_content table has the core teaching material (DEFINITION,
WALKTHROUGH, ELI5, etc.) for each node. The class_level_content table has
1,467 dedicated note files across all four subjects — glossaries,
misconceptions, worked examples, formula banks, solution templates,
remediation paths, revision sheets, summaries, high-yield guides,
real-world applications, silly mistakes, quick revision cards, and more.

This service parses those files and returns the relevant section for the
student's current topic and intent.
"""
from __future__ import annotations

import re
from typing import Optional

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.enrichment import ClassLevelContent, EnrichmentContent

# ─────────────────────────────────────────────────────────────────────
# Subject mapping: node_id code → ClassLevelContent subject
# ─────────────────────────────────────────────────────────────────────
_SUBJECT_MAP = {
    "phy": "physics",
    "chem": "chem",
    "bio": "bio",
    "math": "maths",
}


def _parse_node_id(node_id: str) -> tuple[Optional[int], Optional[str]]:
    """Extract class level and subject from a node_id like 'c12_phy_064'."""
    if not node_id or not node_id.startswith("c"):
        return None, None
    parts = node_id.split("_")
    if len(parts) < 2:
        return None, None
    try:
        class_level = int(parts[0][1:])
    except ValueError:
        return None, None
    subject = _SUBJECT_MAP.get(parts[1])
    return class_level, subject


async def _fetch_files(
    db: AsyncSession,
    subject: str,
    class_level: int,
    content_type: str,
) -> list[ClassLevelContent]:
    """Fetch all ClassLevelContent files matching subject + class + type."""
    result = await db.execute(
        select(ClassLevelContent).where(
            and_(
                ClassLevelContent.target_subject == subject,
                ClassLevelContent.content_type == content_type,
            )
        )
    )
    files = result.scalars().all()
    # Filter by class level (target_class is a JSON array)
    matched = []
    for f in files:
        target_classes = f.target_class or []
        if class_level in target_classes or not target_classes:
            matched.append(f)
    # If no exact match, return all for the subject+type
    if not matched and files:
        matched = files
    return matched


def _extract_sections(content: str, pattern: str) -> list[tuple[str, str]]:
    """Split content into sections by a header pattern.
    Returns list of (header, body) tuples.
    """
    sections = []
    matches = list(re.finditer(pattern, content, re.MULTILINE))
    for i, m in enumerate(matches):
        header = m.group(0).strip()
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(content)
        body = content[start:end].strip()
        sections.append((header, body))
    return sections


def _find_node_sections(content: str, node_id: str) -> list[str]:
    """Find sections that reference the given node_id."""
    sections = re.split(
        r"\n(?=\s*(?:---|\.{3}|===|REMEDIATION PATH|MISCONCEPTION|EXAMPLE|Card|Application|Mistake|TEMPLATE|TERM:))",
        content,
    )
    matched = []
    for s in sections:
        if node_id in s:
            clean = s.strip()
            if len(clean) > 50:
                matched.append(clean[:2000])
    return matched


def _find_keyword_sections(content: str, keywords: list[str], section_pattern: str) -> list[str]:
    """Find sections matching any of the keywords."""
    sections = _extract_sections(content, section_pattern)
    matched = []
    for header, body in sections:
        text = (header + " " + body).lower()
        if any(kw.lower() in text for kw in keywords):
            full = header + "\n" + body
            matched.append(full[:2000])
    return matched


def _clean_internal_ids(text: str) -> str:
    """Remove internal node IDs and metadata from student-visible text."""
    if not text:
        return text
    # Remove node ID references like c12_phy_002, c10_chem_033, etc.
    text = re.sub(r'\b[cC]\d+_(?:phy|chem|bio|math)_\d+\b', '', text)
    # Remove node ID references like c12_chem_exam_technique (with word suffix)
    text = re.sub(r'\b[cC]\d+_(?:phy|chem|bio|math)_\w+', '', text)
    # Remove DEPTH_PREREQ, CROSS_PREREQ labels
    text = re.sub(r'\b(?:DEPTH_PREREQ|CROSS_PREREQ|FORWARD_NODE)\b[^:\n]*:', '', text)
    # Remove "Target node:" lines
    text = re.sub(r'^\s*Target node:.*$', '', text, flags=re.MULTILINE)
    # Remove "NODE_ID:" lines
    text = re.sub(r'^\s*NODE_ID:.*$', '', text, flags=re.MULTILINE)
    # Remove "source_file:" lines
    text = re.sub(r'^\s*source_file:.*$', '', text, flags=re.MULTILINE)
    # Remove "--- NODE ... ---" markers
    text = re.sub(r'^---\s*NODE\s+.*---\s*$', '', text, flags=re.MULTILINE)
    # Remove marker file references
    text = re.sub(r'\b\w+\.marker\b', '', text)
    # Remove PP_xxx misconception IDs
    text = re.sub(r'\bPP_\w+\b', '', text)
    # Clean up multiple blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Clean up lines that are just whitespace and dashes
    text = re.sub(r'^\s*--\s*$', '', text, flags=re.MULTILINE)
    return text.strip()


def _strip_template_metadata(text: str) -> str:
    """Remove template/metadata artifacts that leak into student-visible content.

    Removes lines like:
    - VOCABULARY: |
    - SCOPE_BOUNDARY: |
    - COMMON_MISCONCEPTION: |
    - ELI5: |
    - TEXT_WALKTHROUGH: |
    - TEXT_REFERENCE: |
    - MISCONCEPTION_TOPIC: |
    - NODE: |
    """
    if not text:
        return text
    # Remove template metadata labels (KEY: | format)
    template_labels = [
        "VOCABULARY", "SCOPE_BOUNDARY", "COMMON_MISCONCEPTION",
        "ELI5", "TEXT_WALKTHROUGH", "TEXT_REFERENCE",
        "MISCONCEPTION_TOPIC", "NODE", "TOPIC", "DEFINITION",
        "DIAGNOSTIC_QUESTIONS", "ON_FAILURE", "MASTERY_CRITERIA",
        "KEY_TERMS", "EXAM_TIPS", "REAL_WORLD",
    ]
    for label in template_labels:
        text = re.sub(rf'^\s*{label}\s*:\s*\|?\s*$', '', text, flags=re.MULTILINE | re.IGNORECASE)
    # Remove lines that are just a label followed by pipe
    text = re.sub(r'^\s*[A-Z_]+\s*:\s*\|\s*$', '', text, flags=re.MULTILINE)
    # Clean up multiple blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


# ─────────────────────────────────────────────────────────────────────
# Public API — one method per content type
# ─────────────────────────────────────────────────────────────────────

async def get_glossary_term(
    db: AsyncSession, node_id: str, term: str
) -> Optional[str]:
    """Look up a term in the glossary files."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "glossary")
    term_lower = term.lower().strip()

    for f in files:
        content = f.content or ""
        sections = _extract_sections(content, r"^\s*TERM:\s*(.+)$")
        for header, body in sections:
            term_name = header.replace("TERM:", "").strip()
            if term_lower in term_name.lower() or term_name.lower() in term_lower:
                definition = ""
                si_unit = ""
                confusion = ""
                for line in body.split("\n"):
                    line = line.strip()
                    if line.startswith("DEFINITION:"):
                        definition = line[len("DEFINITION:"):].strip()
                    elif line.startswith("SI_UNIT:"):
                        si_unit = line[len("SI_UNIT:"):].strip()
                    elif line.startswith("COMMON_CONFUSION:"):
                        confusion = line[len("COMMON_CONFUSION:"):].strip()

                result = f"**{term_name}**\n\n{definition}"
                if si_unit:
                    result += f"\n\n**SI unit:** {si_unit}"
                if confusion:
                    result += f"\n\n**Common confusion:** {confusion}"
                return result

    return None


async def get_glossary_for_node(
    db: AsyncSession, node_id: str
) -> Optional[str]:
    """List all glossary terms for the current node's subject and class."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "glossary")
    terms = []
    for f in files:
        content = f.content or ""
        sections = _extract_sections(content, r"^\s*TERM:\s*(.+)$")
        for header, body in sections:
            term_name = header.replace("TERM:", "").strip()
            definition = ""
            for line in body.split("\n"):
                line = line.strip()
                if line.startswith("DEFINITION:"):
                    definition = line[len("DEFINITION:"):].strip()
                    break
            if term_name:
                terms.append((term_name, definition[:80] if definition else ""))

    if not terms:
        return None

    lines = []
    for term_name, def_preview in terms[:20]:
        if def_preview:
            lines.append(f"  • **{term_name}** — {def_preview}...")
        else:
            lines.append(f"  • **{term_name}**")
    lines.append(
        f"\n*Total: {len(terms)} terms. Type a term name to see its full definition.*"
    )
    return "\n".join(lines)


async def get_topic_misconceptions(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None
) -> Optional[str]:
    """Get topic-specific misconceptions for the current node."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "misconceptions")

    # First try exact node_id match
    for f in files:
        content = f.content or ""
        sections = _find_node_sections(content, node_id)
        if sections:
            formatted = []
            for s in sections[:3]:
                s = s.strip()
                if s.startswith("---"):
                    s = s[3:].strip()
                formatted.append(s)
            return "\n\n---\n\n".join(formatted)

    # Fall back to keyword matching
    if topic_keywords:
        for f in files:
            content = f.content or ""
            sections = _find_keyword_sections(
                content, topic_keywords,
                r"^\s*(?:---\s*)?MISCONCEPTION\s+\w+",
            )
            if sections:
                return "\n\n---\n\n".join(sections[:3])

    return None


async def get_worked_examples(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None,
    guided: bool = True,
) -> Optional[str]:
    """Get worked examples relevant to the current topic.

    If guided=True, only show the question and given values, then ask the
    student to identify the formula. This prevents answer-dumping and
    keeps the student engaged in the reasoning process.
    """
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "worked_examples")

    def _format_example_guided(header: str, body: str) -> str:
        """Show only Q and GIVEN, ask student to identify formula."""
        lines = body.split("\n")
        question = ""
        given = ""
        for line in lines:
            line = line.strip()
            if line.startswith("Q:"):
                question = line[2:].strip()
            elif line.startswith("GIVEN:"):
                given = line[len("GIVEN:"):].strip()
            elif line.startswith("FORMULA:") or line.startswith("SUBSTITUTE:") or line.startswith("ANSWER:"):
                break  # stop at the answer part

        result = header + "\n"
        if question:
            result += f"\n**Question:** {question}"
        if given:
            result += f"\n\n**Given:** {given}"
        result += (
            "\n\n**Your turn:** Which formula or principle applies here? "
            "Type the formula name (e.g., 'Coulomb's law') or type 'show solution' to see the rest."
        )
        return result

    if topic_keywords:
        for f in files:
            content = f.content or ""
            sections = _find_keyword_sections(
                content, topic_keywords, r"^\s*===\s*EXAMPLE\s+\d+",
            )
            if sections:
                if guided:
                    # Parse each section to extract just Q and GIVEN
                    parsed = []
                    for s in sections[:3]:
                        # Find the header and body
                        lines = s.split("\n", 1)
                        header = lines[0]
                        body = lines[1] if len(lines) > 1 else ""
                        parsed.append(_format_example_guided(header, body))
                    return "\n\n---\n\n".join(parsed)
                return "\n\n---\n\n".join(sections[:3])

    # Fall back: return first 2 examples from the first file
    for f in files:
        content = f.content or ""
        sections = _extract_sections(content, r"^\s*===\s*EXAMPLE\s+\d+")
        if sections:
            if guided:
                formatted = []
                for header, body in sections[:2]:
                    formatted.append(_format_example_guided(header, body))
                return "\n\n---\n\n".join(formatted)
            else:
                formatted = []
                for header, body in sections[:2]:
                    formatted.append(header + "\n" + body)
                return "\n\n---\n\n".join(formatted)

    return None


async def get_formula_bank(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None
) -> Optional[str]:
    """Get formula bank entries for the current class/subject.

    Only returns content that matches the topic keywords. If no match is found,
    returns None so the caller can fall back to node-specific enrichment content.
    """
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "formula_bank")
    if not files:
        return None

    content = files[0].content or ""

    if topic_keywords:
        sections = _extract_sections(content, r"^\s*===\s*.+\s*===")
        for header, body in sections:
            text = (header + " " + body).lower()
            if any(kw.lower() in text for kw in topic_keywords):
                # Strip template metadata artifacts
                result = header + "\n" + body[:3000]
                result = _strip_template_metadata(result)
                return result

    # No keyword match — return None so caller falls back to enrichment
    return None


async def get_formula_derivations(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None
) -> Optional[str]:
    """Get formula derivations for the current topic.

    Only returns content that matches the topic keywords. If no match is found,
    returns None so the caller can fall back to node-specific enrichment content.
    """
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "formula_derivations")
    if not files:
        return None

    content = files[0].content or ""

    if topic_keywords:
        sections = _extract_sections(content, r"^\s*===\s*.+\s*===")
        for header, body in sections:
            text = (header + " " + body).lower()
            if any(kw.lower() in text for kw in topic_keywords):
                result = header + "\n" + body[:3000]
                result = _strip_template_metadata(result)
                return result

    # No keyword match — return None so caller falls back to enrichment
    return None


async def get_solution_template(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None
) -> Optional[str]:
    """Get solution templates for the current topic."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "solution_templates")

    if topic_keywords:
        for f in files:
            content = f.content or ""
            title_lower = (f.title or "").lower()
            if any(kw.lower() in title_lower for kw in topic_keywords):
                sections = _extract_sections(content, r"^\s*===\s*TEMPLATE\s+\d+")
                if sections:
                    formatted = []
                    for header, body in sections[:3]:
                        formatted.append(header + "\n" + body)
                    return "\n\n---\n\n".join(formatted)
                # No sections but title matched — return None for fallback
                return None

    # No keyword match — return None so caller falls back to enrichment
    return None


async def get_remediation_path(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None
) -> Optional[str]:
    """Get remediation paths for the current topic."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "remediation")

    # Try node_id match first
    for f in files:
        content = f.content or ""
        sections = _find_node_sections(content, node_id)
        if sections:
            return "\n\n---\n\n".join(sections[:2])

    # Fall back to keyword match
    if topic_keywords:
        for f in files:
            content = f.content or ""
            sections = _find_keyword_sections(
                content, topic_keywords, r"^\s*===\s*REMEDIATION PATH\s+\d+",
            )
            if sections:
                return "\n\n---\n\n".join(sections[:2])

    return None


async def get_summary(
    db: AsyncSession, node_id: str
) -> Optional[str]:
    """Get the chapter summary for a specific node."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "summaries")
    for f in files:
        content = f.content or ""
        # Summaries have lines like: "  c12_phy_001 -- Title:"
        pattern = rf"^\s*{re.escape(node_id)}\s*--\s*(.+)$"
        match = re.search(pattern, content, re.MULTILINE)
        if match:
            start = match.start()
            # Find the next node entry
            rest = content[match.end():]
            next_match = re.search(r"^\s*\w+_\w+_\d+\s*--\s*", rest, re.MULTILINE)
            if next_match:
                end = match.end() + next_match.start()
            else:
                end = min(start + 1000, len(content))
            summary = content[start:end].strip()
            return summary

    return None


async def get_revision_sheet(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None
) -> Optional[str]:
    """Get revision sheet for the current class/subject."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "revision_sheets")
    if not files:
        return None

    content = files[0].content or ""

    if topic_keywords:
        sections = _extract_sections(content, r"^\s*===\s*KEY FACTS\s*--\s*.+\s*===")
        for header, body in sections:
            text = (header + " " + body).lower()
            if any(kw.lower() in text for kw in topic_keywords):
                return header + "\n" + body[:3000]

    # No keyword match — return None so caller falls back to enrichment
    return None


async def get_high_yield_guide(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None
) -> Optional[str]:
    """Get high-yield exam guide for the current topic."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "high_yield_guides")
    if not files:
        return None

    content = files[0].content or ""

    if topic_keywords:
        sections = _extract_sections(content, r"^\s*\d+\.\s+.+")
        for header, body in sections:
            text = (header + " " + body).lower()
            if any(kw.lower() in text for kw in topic_keywords):
                return header + "\n" + body[:3000]

    # No keyword match — return None so caller falls back to enrichment
    return None


async def get_exam_technique(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None
) -> Optional[str]:
    """Get exam technique guidance for the current topic."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "exam_technique")
    if not files:
        return None

    # Pick the file matching the class level most closely
    best_file = files[0]
    for f in files:
        title = (f.title or "").lower()
        if f"c{class_level}" in title or str(class_level) in title:
            best_file = f
            break

    content = best_file.content or ""

    if topic_keywords:
        sections = _extract_sections(content, r"^\s*(?:Q\d+|PART|HOW TO|Example)")
        for header, body in sections:
            text = (header + " " + body).lower()
            if any(kw.lower() in text for kw in topic_keywords):
                return header + "\n" + body[:3000]

    # No keyword match — return None so caller falls back to enrichment
    return None


async def get_real_world_applications(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None
) -> Optional[str]:
    """Get real-world applications for the current topic."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "real_world_applications")

    if topic_keywords:
        for f in files:
            content = f.content or ""
            sections = _find_keyword_sections(
                content, topic_keywords, r"^\s*Application\s+\d+:",
            )
            if sections:
                return "\n\n---\n\n".join(sections[:3])

    # No keyword match — return None so caller falls back to enrichment
    return None


async def get_silly_mistakes(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None
) -> Optional[str]:
    """Get silly mistakes checklist for the current class/subject."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "silly_mistakes")
    if not files:
        return None

    content = files[0].content or ""

    if topic_keywords:
        sections = _extract_sections(content, r"^\s*Mistake\s+\d+:")
        for header, body in sections:
            text = (header + " " + body).lower()
            if any(kw.lower() in text for kw in topic_keywords):
                return header + "\n" + body[:2000]

    # No keyword match — return None so caller falls back to enrichment
    return None


async def get_quick_revision_cards(
    db: AsyncSession, node_id: str, topic_keywords: Optional[list[str]] = None
) -> Optional[str]:
    """Get quick revision cards for the current topic."""
    class_level, subject = _parse_node_id(node_id)
    if not subject:
        return None

    files = await _fetch_files(db, subject, class_level or 12, "quick_revision_cards")

    if topic_keywords:
        for f in files:
            content = f.content or ""
            sections = _find_keyword_sections(
                content, topic_keywords, r"^\s*Card\s+\d+:",
            )
            if sections:
                return "\n\n---\n\n".join(sections[:5])

    # No keyword match — return None so caller falls back to enrichment
    return None


async def get_topic_keywords(db: AsyncSession, node_id: str) -> list[str]:
    """Get topic keywords from the enrichment content for the current node."""
    result = await db.execute(
        select(EnrichmentContent).where(EnrichmentContent.node_id == node_id)
    )
    enrichment = result.scalar_one_or_none()
    if not enrichment:
        return []

    keywords = []
    if enrichment.title:
        keywords.extend(enrichment.title.split())
    if enrichment.chapter:
        keywords.extend(enrichment.chapter.split())

    stop = {"and", "or", "the", "of", "to", "in", "for", "a", "an", "with",
            "class", "isc", "icse", "board", "exam", "chapter", "unit"}
    keywords = [k.strip("(),.-") for k in keywords if k.lower() not in stop and len(k) > 2]
    return keywords


# ─────────────────────────────────────────────────────────────────────
# SRS Flashcards
# ─────────────────────────────────────────────────────────────────────

async def get_flashcards(
    db: AsyncSession,
    node_id: str,
    topic_keywords: Optional[list[str]] = None,
    limit: int = 10,
) -> Optional[str]:
    """Fetch SRS flashcards relevant to the current topic.

    Parses the flashcard TSV content stored in ClassLevelContent and
    returns cards whose category or front text matches the topic keywords.
    If no keyword match, returns cards from the same subject + class.
    """
    class_level, subject = _parse_node_id(node_id)
    if not class_level or not subject:
        return None

    files = await _fetch_files(db, subject, class_level, "srs_flashcards")
    if not files:
        return None

    # Parse all cards from matching files
    all_cards = []
    for f in files:
        cards = _parse_flashcard_content(f.content)
        all_cards.extend(cards)

    if not all_cards:
        return None

    # Score cards by keyword overlap with topic
    if topic_keywords:
        kw_lower = [k.lower() for k in topic_keywords if len(k) > 3]
        scored = []
        for card in all_cards:
            card_text = f"{card['front']} {card['back']} {card['category']}".lower()
            score = sum(1 for kw in kw_lower if kw in card_text)
            scored.append((score, card))
        scored.sort(key=lambda x: x[0], reverse=True)
        # Only return cards that match keywords — don't fall back to unrelated cards
        matched = [c for s, c in scored if s > 0][:limit]
    else:
        matched = all_cards[:limit]

    if not matched:
        return None

    # Format as flashcard output
    lines = [f"**Flashcards: {len(matched)} cards for quick review**\n"]
    for i, card in enumerate(matched, 1):
        lines.append(f"**Card {i}** ({card.get('cognitive_level', 'review')})")
        lines.append(f"Q: {card['front']}")
        lines.append(f"A: {card['back']}")
        if card.get('category'):
            lines.append(f"*Category: {card['category']}*")
        lines.append("")

    return "\n".join(lines)


def _parse_flashcard_content(content: str) -> list[dict]:
    """Parse flashcard content from ClassLevelContent into card dicts."""
    cards = []
    blocks = content.split("---")
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        card = {}
        for line in block.splitlines():
            line = line.strip()
            if line.startswith("FRONT: "):
                card["front"] = line[7:]
            elif line.startswith("BACK: "):
                card["back"] = line[6:]
            elif line.startswith("CATEGORY: "):
                card["category"] = line[10:]
            elif line.startswith("LEVEL: "):
                card["cognitive_level"] = line[7:]
        if "front" in card and "back" in card:
            cards.append(card)
    return cards


async def get_flashcard_quiz(
    db: AsyncSession,
    node_id: str,
    topic_keywords: Optional[list[str]] = None,
    num_cards: int = 5,
) -> Optional[list[dict]]:
    """Fetch flashcards as a quiz — returns front only, student guesses back.

    Returns list of {front, back, category, cognitive_level} dicts.
    """
    class_level, subject = _parse_node_id(node_id)
    if not class_level or not subject:
        return None

    files = await _fetch_files(db, subject, class_level, "srs_flashcards")
    if not files:
        return None

    all_cards = []
    for f in files:
        cards = _parse_flashcard_content(f.content)
        all_cards.extend(cards)

    if not all_cards:
        return None

    # Score by keyword overlap — only return matching cards
    if topic_keywords:
        kw_lower = [k.lower() for k in topic_keywords if len(k) > 3]
        scored = []
        for card in all_cards:
            card_text = f"{card['front']} {card['back']} {card.get('category', '')}".lower()
            score = sum(1 for kw in kw_lower if kw in card_text)
            scored.append((score, card))
        scored.sort(key=lambda x: x[0], reverse=True)
        matched = [c for s, c in scored if s > 0][:num_cards]
    else:
        matched = all_cards[:num_cards]

    return matched
