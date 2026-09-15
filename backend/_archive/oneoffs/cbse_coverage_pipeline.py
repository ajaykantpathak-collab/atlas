"""
CBSE/CISCE Coverage + Verification Pipeline
============================================
Async pipeline with 10 parallel workers using Claude Opus 5.

For each NCERT book chapter:
  1. Load book text from text_cache
  2. Load our CISCE nodes matching that subject+class from Neo4j
  3. Send to Claude: book text + our nodes
  4. Claude returns JSON:
     - covered: our nodes that match book content (→ tag as CBSE+CISCE)
     - missing: topics in book not in our nodes (→ Claude creates new nodes, tagged CBSE)
     - extra: our nodes not in book (→ tag as CISCE-only)
     - verification: for covered nodes, factually correct / needs correction
  5. Write results to Neo4j

For CBSE-only subjects (no CISCE equivalent):
  - Send book text only
  - Claude generates full node set in CISCE format

Large chapters (>100K tokens) are split by section numbers (e.g. 8.1, 8.2, ...)

Usage:
  python cbse_coverage_pipeline.py --grade 12              # all class 12 subjects
  python cbse_coverage_pipeline.py --grade 12 --subject physics  # class 12 physics only
  python cbse_coverage_pipeline.py --grade 12 --dry-run    # show plan, don't call API
"""
import asyncio
import aiohttp
import json
import ssl
import re
import os
import time
import argparse
from pathlib import Path
from collections import defaultdict
from neo4j import GraphDatabase

# === CONFIG ===
API_KEYS = [
    "sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK",
    "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna",
]
API_KEY = os.environ.get("CLAUDE_API_KEY", API_KEYS[1])  # use 2nd key
API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"
MAX_TOKENS = 128000
MAX_INPUT_TOKENS = 128000  # full context window for book text
CHARS_PER_TOKEN = 4
MAX_TEXT_CHARS = MAX_INPUT_TOKENS * CHARS_PER_TOKEN  # 512K chars max book text

TEXT_CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")
PDF_DIR = Path(r"D:\node_generator\ncert-mcp\data\raw\ncert_pdfs")

NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "dream_neo4j_2024"

WORKERS = 7
OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# SSL context (same as hindi pipeline)
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

# === NCERT PDF → subject mapping ===
# PDF folder names → normalized subject names that match our Neo4j subjects
CBSE_TO_CISCE_SUBJECT = {
    "Mathematics": "maths",
    "Science": "physics",  # CBSE science = physics+chem+bio; we'll let Claude split
    "Physics": "physics",
    "Physics_1": "physics",
    "Physics_2": "physics",
    "Chemistry": "chemistry",
    "Chemistry_1": "chemistry",
    "Chemistry_2": "chemistry",
    "Biology": "biology",
    "Biotechnology": "biotech",
    "Accountancy": "accounts",
    "Economics": "economics",
    "Business_Studies": "business_studies",
    "Commerce": "commerce",
    "Computer_Science": "computer_science",
    "Computer_Applications": "computer_science",
    "Informatics_Practices": "computer_science",
    "Information_Technology": "computer_science",
    "Geography": "geography",
    "Geography_1": "geography",
    "History": "hist",
    "Civics": "political_science",
    "Political_Science": "political_science",
    "Psychology": "psychology",
    "Sociology": "sociology",
    "Home_Science": "home_science",
    "Legal_Studies": "legal_studies",
    "Applied_Mathematics": "applied_maths",
    "Artificial_Intelligence": "ai",
    "English": "English Literature",  # CBSE English = literature texts (Flamingo, Vistas, etc.)
    "Hindi": "Hindi",
    "Social_Science": "history_civics",  # combined
    "Fine_Art": "art",
    "Health_and_Physical_Education": "physical_education",
    "Physical_Education_and_Well_Being": "physical_education",
    "Skill_Education": "skill_education",
    "Knowledge_Traditions_Practices_of_India": "ktpi",
    "Entrepreneurship": "entrepreneurship",
    # CBSE-only subjects (no CISCE equivalent)
    "Arts": None,
    "The_World_Around_Us": "evs",
    "Environmental_Studies": "evs",
}

# All chapters generate full CBSE node sets — no overlap mode, don't touch CISCE
# CBSE nodes use separate IDs: c{grade}_{subj}_cbse_{num}
# Output: separate CBSE graph JSON files per subject+class

# Subject codes for node IDs
SUBJECT_CODES = {
    "physics": "phy", "chemistry": "chem", "biology": "bio", "maths": "math",
    "computer_science": "cs", "accounts": "acc", "economics": "eco",
    "business_studies": "bs", "geography": "geo", "hist": "hist",
    "political_science": "pol", "psychology": "psy", "sociology": "soc",
    "biotech": "bt", "home_science": "hs", "hindi": "hin", "Hindi": "hin",
    "english_core": "eng", "english_elective": "engelec",
    "english_literature": "engl", "English Literature": "engl",
    "entrepreneurship": "entre",
    "science": "sci", "social_science": "sst", "evs": "evs",
    "civics": "civ",
    "legal_studies": "legal", "applied_maths": "amath", "ai": "ai",
    "commerce": "comm", "entrepreneurship": "entre", "history_civics": "histciv",
    "english_core": "eng", "english_elective": "engelec",
    "english_literature": "engl",
}

# Subjects to SKIP entirely (non-academic / vocational only)
SKIP_SUBJECTS = {
    "art",             # Fine Arts — not in CISCE curriculum
    "ktpi",            # Knowledge Traditions and Practices of India — CBSE-only, skip
    "skill_education", # Vocational — skip
    "physical_education",  # Skip for now (CBSE-only, low priority)
    "entrepreneurship",    # Vocational — skip
}

# CBSE folder names to skip
SKIP_CBSE_FOLDERS = {
    "Fine_Art",
    "Knowledge_Traditions_Practices_of_India",
    "Skill_Education",
    "Arts",
    "Health_and_Physical_Education",
    "Physical_Education_and_Well_Being",
    "Entrepreneurship",
}


# NCERT file code prefix → subject (2nd+3rd chars after grade letter)
# Pattern: [grade_letter][subject_code][chapter_number]
# Verified by reading actual file content for each code
FILE_CODE_TO_SUBJECT = {
    # Class 11-12 (k/l prefix)
    "ac": "accounts",          # Accountancy
    "bo": "biology",           # Biology
    "bt": "biotech",           # Biotechnology
    "bs": "business_studies",  # Business Studies
    "ca": "computer_science",  # Computerised Accounting (actually CS apps)
    "ch": "chemistry",         # Chemistry
    "cs": "computer_science",  # Computer Science
    "ec": "economics",         # Economics
    "ee": "economics",         # Economics (alt)
    "fa": "art",               # Fine Art
    "fl": "english_core",      # English Core (Flamingo)
    "gy": "geography",         # Geography
    "he": "home_science",      # Home Science
    "hh": "hindi",             # Hindi (har/hat)
    "hp": "physical_education",  # Health & PE
    "hs": "history",           # History
    "ip": "computer_science",  # Informatics Practices
    "kl": "english_elective",  # English Elective (Kaleidoscope)
    "mh": "maths",             # Mathematics
    "ph": "physics",           # Physics
    "ps": "political_science", # Political Science
    "py": "psychology",        # Psychology
    "sy": "sociology",         # Sociology
    "vt": "english_core",      # English Core (Vistas)
    "ww": "english_elective",  # English Elective (Woven Words)
    # Class 9-10 (i/j prefix)
    "ff": "english_core",      # English (First Flight)
    "kr": "hindi",             # Hindi (Kritika)
    "ks": "hindi",             # Hindi (Kshitij)
    "sb": "hindi",             # Hindi (Sanchayan)
    "sp": "hindi",             # Hindi (Sparsh)
    "sc": "science",           # Science (combined phy+chem+bio)
    "ss": "social_science",    # Social Science (combined)
    # Class 6-8 (f/g/h prefix)
    "dv": "hindi",             # Hindi (Durva)
    "vs": "hindi",             # Hindi (Vasant)
    "hl": "english_core",      # English (Honeysuckle)
    "pw": "english_core",      # English (A Pact with the Sun)
    "gp": "geography",         # Geography
    "es": "science",           # Science
    "cu": "civics",            # Civics
    # Class 1-5 (a-e prefix)
    "en": "english_core",      # English (primary)
    "jm": "maths",             # Maths (primary)
    "rd": "english_core",      # English (Raindrops)
    "mr": "maths",             # Maths (Merry Maths)
    "bu": "evs",               # EVS (Looking Around)
    "ev": "evs",               # EVS
    "ap": "art",               # Art
    "ky": "civics",            # Civics
    "mm": "maths",             # Maths (applied)
    "st": "entrepreneurship",  # Entrepreneurship
    "it": "computer_science",  # IT
    "pr": "physical_education",  # PE
    "sa": "sociology",         # Sociology
    "ee": "economics",         # Economics
}

# Grade letter → grade number
GRADE_LETTERS = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5,
    'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 10,
    'k': 11, 'l': 12,
}


def get_subject_from_filename(filename):
    """Determine subject from NCERT file code (e.g. leph101 → physics).
    NCERT uses variable-length subject codes. Try 3-char first, then 2-char.
    """
    if len(filename) < 4:
        return None
    grade_letter = filename[0]

    # Try 3-char subject code first (e.g. leca101 → eca, leac102 → eac)
    if len(filename) >= 6:
        code3 = filename[1:4]
        if code3 in FILE_CODE_TO_SUBJECT_3:
            return FILE_CODE_TO_SUBJECT_3[code3]

    # Try 2-char subject code (e.g. leph101 → ph, lebo101 → bo)
    code2 = filename[1:3]
    if code2 in FILE_CODE_TO_SUBJECT:
        return FILE_CODE_TO_SUBJECT[code2]

    return None


# 3-char subject codes (for disambiguation)
FILE_CODE_TO_SUBJECT_3 = {
    "eca": "computer_science",  # Computerised Accounting
    "eac": "accounts",          # Accountancy
    "eec": "economics",         # Economics
    "ecs": "computer_science",  # Computer Science (lecs*)
    "esy": "sociology",         # Sociology
    "efl": "english_core",      # English (Flamingo)
    "evt": "english_core",      # English (Vistas)
    "ekl": "english_elective",  # English (Kaleidoscope)
    "eww": "english_elective",  # English (Woven Words)
    "eps": "political_science", # Political Science (leps*)
    # ── Added: missing le* subject codes ──
    "eai": "ai",                # Artificial Intelligence (leai*)
    "eam": "applied_maths",     # Applied Mathematics (leam*)
    "els": "legal_studies",     # Legal Studies (lels*)
    "ebo": "biology",           # Biology (lebo*)
    "ebs": "business_studies",  # Business Studies (lebs*)
    "ebt": "biotech",           # Biotechnology (lebt*)
    "egy": "geography",         # Geography (legy*)
    "ehe": "home_science",      # Home Science (lehe*)
    "ehh": "hindi",             # Hindi (lehh*)
    "ehs": "hist",              # History (lehs*)
    "eip": "computer_science",  # Informatics Practices (leip*)
    "emh": "maths",             # Mathematics (lemh*)
    "eph": "physics",           # Physics (leph*)
    "epy": "psychology",        # Psychology (lepy*)
    "eec": "economics",         # Economics (alt)
    "eca": "computer_science",  # Computerised Accounting (alt)
}


def get_chapters_for_grade(grade):
    """Get all NCERT book chapters for a grade, mapped to subject.
    Uses folder name as primary source, file code as fallback.
    """
    grade_dir = PDF_DIR / f"grade_{grade}"
    if not grade_dir.exists():
        return []

    chapters = []
    seen_files = set()  # dedup (same file may appear in multiple folders)

    for subj_dir in sorted(grade_dir.iterdir()):
        if not subj_dir.is_dir():
            continue
        cbse_subject = subj_dir.name

        # Skip excluded subjects (by folder name)
        if cbse_subject in SKIP_CBSE_FOLDERS:
            continue

        for pdf in sorted(subj_dir.glob("*.pdf")):
            if pdf.stem in seen_files:
                continue
            seen_files.add(pdf.stem)

            cache_file = TEXT_CACHE / f"{pdf.stem}.txt"
            if not cache_file.exists():
                continue

            # Determine subject from folder name (primary), file code (fallback)
            # Special case: "Civics" folder in grades 11-12 contains lecs* files
            # which are actually Computer Science, not Civics
            cisce_subject = CBSE_TO_CISCE_SUBJECT.get(cbse_subject, None)
            if cbse_subject == "Civics":
                # Use file code to determine real subject
                file_subject = get_subject_from_filename(pdf.stem)
                if file_subject:
                    cisce_subject = file_subject
            if not cisce_subject:
                cisce_subject = get_subject_from_filename(pdf.stem)

            # Skip excluded subjects (by detected subject name)
            if cisce_subject and cisce_subject in SKIP_SUBJECTS:
                continue

            # Get chapter title from first meaningful lines
            title = ""
            try:
                lines = cache_file.read_text(encoding="utf-8", errors="replace").split("\n")
                for line in lines[:30]:
                    line = line.strip()
                    if len(line) > 5 and "Reprint" not in line and "CHAPTER" not in line:
                        title = line[:80]
                        break
            except:
                pass

            chapters.append({
                "file": pdf.stem,
                "cache_path": str(cache_file),
                "title": title,
                "size": cache_file.stat().st_size,
                "grade": grade,
                "cbse_subject": cbse_subject,
                "cisce_subject": cisce_subject,
            })

    return chapters


def split_large_text(text, max_chars=MAX_TEXT_CHARS):
    """Split large text by section numbers (e.g. 1.1, 1.2, 8.1, 8.2)."""
    if len(text) <= max_chars:
        return [text]

    # Find section markers like "1.1", "8.2" at start of line
    section_pattern = re.compile(r'^(\d+\.\d+)\s', re.MULTILINE)
    matches = list(section_pattern.finditer(text))

    if len(matches) < 2:
        # No section markers — split by character count at paragraph boundaries
        chunks = []
        start = 0
        while start < len(text):
            end = min(start + max_chars, len(text))
            if end < len(text):
                # Find nearest paragraph break
                para_break = text.rfind("\n\n", start, end)
                if para_break > start:
                    end = para_break
            chunks.append(text[start:end])
            start = end
        return chunks

    # Split at section boundaries
    chunks = []
    for i, match in enumerate(matches):
        start = match.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        section_text = text[start:end]

        if len(section_text) > max_chars:
            # Recursively split this section
            chunks.extend(split_large_text(section_text, max_chars))
        else:
            # Merge small sections together
            if chunks and len(chunks[-1]) + len(section_text) < max_chars:
                chunks[-1] += section_text
            else:
                chunks.append(section_text)

    return chunks


def get_our_nodes(driver, grade, subject):
    """Get our CISCE nodes for a grade+subject from Neo4j."""
    with driver.session() as session:
        if subject in ("English Language", "English Literature", "Elective English", "Modern English"):
            result = session.run(
                "MATCH (n:KnowledgeNode) WHERE n.class_level = $cls AND n.subject CONTAINS 'English' "
                "RETURN n.node_id as nid, n.topic as topic, n.subject as subj, n.content_snippet as snippet",
                cls=grade,
            )
        else:
            result = session.run(
                "MATCH (n:KnowledgeNode) WHERE n.class_level = $cls AND n.subject = $subj "
                "RETURN n.node_id as nid, n.topic as topic, n.subject as subj, n.content_snippet as snippet",
                cls=grade, subj=subject,
            )
        return [{"node_id": r["nid"], "topic": r["topic"], "subject": r["subj"],
                 "content_snippet": r["snippet"] or ""} for r in result]


async def call_claude(session, prompt, system_prompt=None, retries=8):
    """Call Claude API async. Retries on rate-limit (proxy returns 200 + warning text)."""
    body = {
        "model": MODEL,
        "max_tokens": 128000,
        "messages": [{"role": "user", "content": prompt}],
    }
    if system_prompt:
        body["system"] = system_prompt

    for attempt in range(retries):
        key = API_KEYS[1]  # use 2nd key
        headers = {
            "x-api-key": key,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01",
        }
        try:
            async with session.post(API_URL, json=body, headers=headers, ssl=CTX, timeout=aiohttp.ClientTimeout(total=600)) as resp:
                data = await resp.json()
                if resp.status == 200:
                    text = ""
                    for block in data.get("content", []):
                        if block["type"] == "text":
                            text = block["text"]
                            break
                    if text.strip():
                        # Check for rate-limit text masquerading as 200 response
                        if "Rate limit exceeded" in text or "rate limit" in text.lower():
                            wait = 60 * (attempt + 1)
                            print(f"    rate-limited (200+text), retry {attempt+1}/{retries} after {wait}s")
                            await asyncio.sleep(wait)
                            continue
                        return text
                    print(f"    empty response, retry {attempt+1}/{retries}")
                    await asyncio.sleep(30 * (attempt + 1))
                else:
                    print(f"    API error {resp.status}: {str(data)[:200]}")
                    wait = 60 * (attempt + 1) if resp.status == 429 else 15 * (attempt + 1)
                    await asyncio.sleep(wait)
        except Exception as e:
            print(f"    retry {attempt+1}: {str(e)[:150]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


def build_prompt_overlap(chapter_text, our_nodes, chapter_title, grade, subject):
    """Build prompt for subjects that exist in both CBSE and CISCE.
    Does: coverage check + factual verification + create missing nodes (full CISCE format) + diagrams.
    """
    nodes_text = "\n".join(
        f"  - {n['node_id']}: {n['topic']}" + (f" | {n['content_snippet'][:100]}" if n['content_snippet'] else "")
        for n in our_nodes
    )

    return f"""You are an educational curriculum expert building a K-12 knowledge graph.
I'm giving you:
1. A NCERT textbook chapter (Class {grade} {subject}) — this is CBSE content
2. Our existing CISCE curriculum nodes for this subject+class

Your job (return ALL results in ONE JSON object):

A) COVERAGE MAPPING: For each of our nodes, determine if this NCERT chapter covers it.
   - "covered": node matches content in this chapter → tag as BOTH boards
   - "extra": node is NOT in this chapter (CISCE-only content) → tag as CISCE-only
   - "missing": chapter has educational content we have NO node for → CREATE new nodes

B) FACTUAL VERIFICATION: For each covered node, verify our node topic is factually
   correct per the book text. Flag any errors, imprecise statements, or missing details.

C) CREATE MISSING NODES: For topics in the book that we don't have nodes for,
   create new nodes in the EXACT same format as our existing nodes (full 20 fields).
   These are CBSE nodes (board = "CBSE").

D) DIAGRAMS: For nodes where a visual diagram would help learning (geometry, physics
   diagrams, biology structures, geography maps, chemistry reactions, etc.),
   generate an SVG diagram with interactive hotspots.

CHAPTER TITLE: {chapter_title}

OUR EXISTING NODES (CISCE):
{nodes_text}

BOOK TEXT (NCERT/CBSE):
{chapter_text}

Return a JSON object with this EXACT structure:
{{
  "covered": [
    {{
      "node_id": "c12_phy_001",
      "board": "both",
      "verification": "correct",
      "correction": "",
      "book_reference": "Section 1.2, paragraph 3"
    }},
    {{
      "node_id": "c12_phy_003",
      "board": "both",
      "verification": "needs_correction",
      "correction": "Should specify Coulomb's law in vector form includes unit vector r̂",
      "book_reference": "Section 1.3"
    }}
  ],
  "extra": [
    {{"node_id": "c12_phy_129", "board": "CISCE", "reason": "Communication systems not in NCERT class 12 physics"}}
  ],
  "missing": [
    {{
      "node_id": "c12_phy_141",
      "topic": "Electric field due to charged disc",
      "content_snippet": "Field on axis of uniformly charged disc of radius R at distance x",
      "subject": "{subject}",
      "class_level": {grade},
      "board": "CBSE",
      "chapter": "descriptive chapter name you write",
      "chapter_name": "descriptive chapter name you write",
      "difficulty": "medium",
      "estimated_time": 30,
      "is_root": false,
      "concept_tags": ["electric field", "charged disc", "gauss law application"],
      "scope_constraints": ["Derivation only for axial point", "Numerical problems on field calculation"],
      "prerequisite_node_ids": ["c12_phy_006", "c12_phy_012"],
      "prerequisite_reasons": {{"c12_phy_006": "Requires understanding of electric field concept", "c12_phy_012": "Uses Gauss theorem to derive field"}},
      "forward_node_ids": [],
      "forward_reasons": {{}},
      "cross_subject_prereqs": [],
      "cross_subject_reasons": {{}},
      "source_file": "cbse_class{grade}_{subject}.json"
    }}
  ],
  "diagrams": [
    {{
      "node_id": "c12_phy_008",
      "diagram_type": "svg",
      "title": "Electric Dipole Field Lines",
      "svg_description": "SVG showing positive and negative charges with field lines emanating from positive to negative",
      "hotspots": [
        {{"label": "Positive charge (+q)", "x": 150, "y": 200, "description": "Source of field lines"}},
        {{"label": "Negative charge (-q)", "x": 350, "y": 200, "description": "Sink of field lines"}},
        {{"label": "Axial line", "x": 250, "y": 200, "description": "Line passing through both charges — strongest field here"}},
        {{"label": "Equatorial line", "x": 250, "y": 300, "description": "Perpendicular bisector — field opposite to dipole moment"}}
      ],
      "alt_text": "Diagram of electric dipole showing field lines from positive to negative charge"
    }}
  ],
  "chapter_summary": "Brief summary of what this chapter covers"
}}

RULES:
- Only create missing nodes for GENUINE educational content (skip prefaces, activities, exercises, "do this" sections, table of contents)
- DO NOT copy text verbatim from the book. Write all content (topic, content_snippet, chapter names, scope_constraints) in your own original words.
- Missing node IDs: c{{class}}_{{subject_code}}_{{number}} (e.g. c12_phy_141). Use next available number.
- Subject codes: phy=physics, chem=chemistry, bio=biology, math=maths, cs=computer_science, acc=accounts, eco=economics, bs=business_studies, geo=geography, hist=hist, pol=political_science, psy=psychology, soc=sociology, bt=biotech, hs=home_science
- ALL missing nodes must have ALL 20 fields filled (node_id, topic, content_snippet, subject, class_level, board, chapter, chapter_name, difficulty, estimated_time, is_root, concept_tags, scope_constraints, prerequisite_node_ids, prerequisite_reasons, forward_node_ids, forward_reasons, cross_subject_prereqs, cross_subject_reasons, source_file)
- board = "CBSE" for new nodes, "both" for covered existing nodes, "CISCE" for extra nodes
- Be STRICT on factual verification — flag anything imprecise, incomplete, or potentially wrong
- book_reference should point to the section/paragraph in the book text
- Only generate diagrams where VISUAL representation genuinely aids understanding (not for every node)
- Diagram hotspots must have x,y coordinates (0-500 range), label, and description
- Return ONLY the JSON, no other text"""


def build_prompt_cbse_only(chapter_text, chapter_title, grade, subject):
    """Build prompt for generating full CBSE node set from book text.
    All subjects use this — CBSE graph is completely separate from CISCE.
    Granularity is age-appropriate: fewer nodes for younger students.
    """
    subj_code = SUBJECT_CODES.get(subject, subject[:4])

    # Age-appropriate granularity guidance
    if grade >= 11:
        granularity = """GRANULARITY (Class {grade} — senior, exam-focused):
- Create 15-30 nodes per chapter (atomic concepts, exam-relevant)
- Each node = one concept, formula, derivation, or application
- Include numerical problem-solving nodes where applicable
- Map detailed prerequisites within and across chapters
- Full cross-subject links (physics needs maths, etc.)
- Full scope constraints specifying exam depth""".format(grade=grade)
    else:
        granularity = """GRANULARITY (Class {grade}):
- Use your judgment to decide the right number of nodes based on the student's age and the chapter's complexity
- Younger students need fewer, broader nodes; older students need more specific nodes
- A Class 6 chapter might need 5-8 nodes; a Class 10 chapter might need 10-20
- Let the content and age group guide you — don't over-split simple topics, don't under-split complex ones""".format(grade=grade)

    return f"""You are an educational curriculum expert building a K-12 knowledge graph.
I'm giving you a NCERT textbook chapter. Generate a complete set of curriculum nodes
from this chapter in our standard format. These are CBSE nodes — completely separate
from our CISCE graph.

CHAPTER: {chapter_title} (Class {grade} {subject})

BOOK TEXT (NCERT/CBSE):
{chapter_text}

Create atomic curriculum nodes for the educational content in this chapter.
Each node = one concept, skill, or literary element that a student needs to learn.

{granularity}

{granularity}

Output each node as a MARKDOWN section using this EXACT format:

## NODE: c{grade}_{subj_code}_cbse_001

- **topic**: Clear topic title
- **content_snippet**: Brief description of what this node covers (2-3 sentences)
- **subject**: {subject}
- **class_level**: {grade}
- **board**: CBSE
- **chapter**: descriptive chapter name you write
- **chapter_name**: descriptive chapter name you write
- **difficulty**: easy|medium|hard
- **estimated_time**: 20
- **is_root**: false
- **concept_tags**: tag1, tag2
- **scope_constraints**: What to teach; What to skip
- **prerequisite_node_ids**: c{grade}_{subj_code}_cbse_000
- **prerequisite_reasons**: c{grade}_{subj_code}_cbse_000 = Why this is needed first
- **forward_node_ids**: (leave empty if none)
- **forward_reasons**: (leave empty if none)
- **cross_subject_prereqs**: (leave empty if none)
- **cross_subject_reasons**: (leave empty if none)
- **source_file**: cbse_class{grade}_{subject}.json

## DIAGRAM: c{grade}_{subj_code}_cbse_001

- **diagram_type**: svg
- **title**: Diagram title
- **svg_description**: Description of what the SVG shows
- **hotspots**: Label @ (250, 200) = What this part represents
- **alt_text**: Text alternative for accessibility

## CHAPTER_SUMMARY
Brief summary of the chapter.

RULES:
- Only create nodes for GENUINE educational content (skip prefaces, activities, exercises, "do this" sections, table of contents)
- DO NOT copy text verbatim from the book. Write all content (topic, content_snippet, chapter names, scope_constraints) in your own original words.
- Node IDs: c{{class}}_{{subject_code}}_cbse_{{number}} starting from 001
- Subject code for this subject: {subj_code}
- ALL nodes must have ALL 20 fields filled — NO empty fields
- board = "CBSE" for all nodes
- Each node should be ATOMIC — one concept per node
- Output PLAIN MARKDOWN TEXT — do NOT wrap in JSON, do NOT use code fences, do NOT use JSON markers
- Start each node with "## NODE:" header
- Start each diagram with "## DIAGRAM:" header
- End with "## CHAPTER_SUMMARY" header

PREREQUISITES (prerequisite_node_ids + prerequisite_reasons):
- Map prerequisites WITHIN this chapter (concepts that build on each other)
- Also map prerequisites from EARLIER chapters in the same subject (use node IDs from earlier chapters)
- Also map prerequisites from EARLIER CLASSES (e.g. class 12 physics node may require class 11 physics node)
- Each prerequisite MUST have a reason explaining the CONCEPTUAL dependency
- Reason format: "Student needs [concept A] because [specific reason why B requires A]"
- Do NOT use templated reasons like "provides foundation" or "is essential for"
- If a node has no prerequisites (foundational concept), set is_root=true and leave arrays empty

DEPTH (scope_constraints):
- Specify what depth to teach this topic at
- Include: what aspects to cover, what to skip, what level of detail
- Example: Derive formula only for axial case; Numerical problems on field calculation; Skip non-axial derivations

CROSS-SUBJECT LINKS (cross_subject_prereqs + cross_subject_reasons):
- Map links to OTHER subjects when a concept genuinely requires knowledge from another subject
- Examples: Physics "Electric field" requires Maths "Integration"; Chemistry "Mole concept" requires Maths "Ratio and proportion"
- Use node ID format: c{{class}}_{{subject_code}}_cbse_{{num}} for the cross-subject target
- Each cross-subject link MUST have a specific reason
- Only create cross-subject links when there is a GENUINE conceptual dependency, not just topical similarity
- If no genuine cross-subject dependency exists, leave arrays empty (don't force links)

FORWARD LINKS (forward_node_ids + forward_reasons):
- Map what concepts THIS node enables downstream
- forward_reasons should explain what the downstream concept gains from this one

- For literature: create nodes for themes, characters, plot points, literary devices, vocabulary
- For language: create nodes for grammar concepts, comprehension skills, writing skills
- Only generate diagrams where VISUAL representation genuinely aids understanding
- Diagram hotspots must have x,y coordinates (0-500 range), label, and description
- Output as PLAIN MARKDOWN — no JSON, no code fences, no markers"""


def parse_markdown_nodes(text: str, chapter_file: str, chunk_num: int) -> dict:
    """Parse markdown-formatted response into structured node data.

    Expected format:
        ## NODE: node_id
        - **field**: value
        ...
        ## DIAGRAM: node_id
        - **field**: value
        ...
        ## CHAPTER_SUMMARY
        text
    """
    nodes = []
    diagrams = []
    chapter_summary = ""

    # Split into sections by ## headers
    sections = re.split(r'^## ', text, flags=re.MULTILINE)

    for section in sections:
        section = section.strip()
        if not section:
            continue

        if section.startswith("NODE:"):
            node = _parse_node_section(section)
            if node:
                nodes.append(node)
        elif section.startswith("DIAGRAM:"):
            diag = _parse_diagram_section(section)
            if diag:
                diagrams.append(diag)
        elif section.startswith("CHAPTER_SUMMARY"):
            # Everything after the header line
            lines = section.split("\n", 1)
            chapter_summary = lines[1].strip() if len(lines) > 1 else ""

    return {
        "nodes": nodes,
        "diagrams": diagrams,
        "chapter_summary": chapter_summary,
    }


def _parse_kv_lines(body: str) -> dict:
    """Parse '- **key**: value' lines into a dict."""
    result = {}
    for line in body.split("\n"):
        line = line.strip()
        m = re.match(r'-\s*\*\*([^*]+)\*\*\s*:\s*(.*)', line)
        if m:
            key = m.group(1).strip()
            val = m.group(2).strip()
            result[key] = val
    return result


def _parse_list_field(val: str) -> list:
    """Parse a comma or semicolon separated string into a list."""
    if not val or val.strip() in ("(leave empty if none)", "(none)", "-", ""):
        return []
    parts = re.split(r'[;,]', val)
    return [p.strip() for p in parts if p.strip()]


def _parse_reasons_field(val: str) -> dict:
    """Parse 'node_id = reason' entries into a dict."""
    if not val or val.strip() in ("(leave empty if none)", "(none)", "-", ""):
        return {}
    result = {}
    # Split by semicolons or newlines, look for "id = reason" pattern
    parts = re.split(r'[;\n]', val)
    for part in parts:
        part = part.strip()
        if "=" in part:
            k, v = part.split("=", 1)
            result[k.strip()] = v.strip()
    return result


def _parse_node_section(section: str) -> dict:
    """Parse a ## NODE: section into a node dict."""
    lines = section.split("\n", 1)
    header = lines[0].strip()
    body = lines[1] if len(lines) > 1 else ""

    # Extract node_id from header
    m = re.match(r'NODE:\s*(\S+)', header)
    if not m:
        return None
    node_id = m.group(1)

    kv = _parse_kv_lines(body)

    is_root = str(kv.get("is_root", "false")).lower().strip() in ("true", "yes", "1")
    estimated_time = 20
    try:
        estimated_time = int(kv.get("estimated_time", "20"))
    except (ValueError, TypeError):
        pass

    return {
        "node_id": node_id,
        "topic": kv.get("topic", ""),
        "content_snippet": kv.get("content_snippet", ""),
        "subject": kv.get("subject", ""),
        "class_level": kv.get("class_level", ""),
        "board": kv.get("board", "CBSE"),
        "chapter": kv.get("chapter", ""),
        "chapter_name": kv.get("chapter_name", ""),
        "difficulty": kv.get("difficulty", "medium"),
        "estimated_time": estimated_time,
        "is_root": is_root,
        "concept_tags": _parse_list_field(kv.get("concept_tags", "")),
        "scope_constraints": _parse_list_field(kv.get("scope_constraints", "")),
        "prerequisite_node_ids": _parse_list_field(kv.get("prerequisite_node_ids", "")),
        "prerequisite_reasons": _parse_reasons_field(kv.get("prerequisite_reasons", "")),
        "forward_node_ids": _parse_list_field(kv.get("forward_node_ids", "")),
        "forward_reasons": _parse_reasons_field(kv.get("forward_reasons", "")),
        "cross_subject_prereqs": _parse_list_field(kv.get("cross_subject_prereqs", "")),
        "cross_subject_reasons": _parse_reasons_field(kv.get("cross_subject_reasons", "")),
        "source_file": kv.get("source_file", ""),
    }


def _parse_diagram_section(section: str) -> dict:
    """Parse a ## DIAGRAM: section into a diagram dict."""
    lines = section.split("\n", 1)
    header = lines[0].strip()
    body = lines[1] if len(lines) > 1 else ""

    m = re.match(r'DIAGRAM:\s*(\S+)', header)
    if not m:
        return None
    node_id = m.group(1)

    kv = _parse_kv_lines(body)

    # Parse hotspots: "Label @ (x, y) = description"
    hotspots = []
    hs_raw = kv.get("hotspots", "")
    if hs_raw and hs_raw.strip() not in ("(none)", "-", ""):
        for hs_line in re.split(r'[;\n]', hs_raw):
            hs_line = hs_line.strip()
            hm = re.match(r'([^@]+)@\s*\((\d+),\s*(\d+)\)\s*=\s*(.*)', hs_line)
            if hm:
                hotspots.append({
                    "label": hm.group(1).strip(),
                    "x": int(hm.group(2)),
                    "y": int(hm.group(3)),
                    "description": hm.group(4).strip(),
                })

    return {
        "node_id": node_id,
        "diagram_type": kv.get("diagram_type", "svg"),
        "title": kv.get("title", ""),
        "svg_description": kv.get("svg_description", ""),
        "hotspots": hotspots,
        "alt_text": kv.get("alt_text", ""),
    }


async def process_chapter(session, chapter, semaphore, dry_run=False):
    """Process one chapter: coverage check + verification + create missing."""
    async with semaphore:
        chapter_file = chapter["file"]
        grade = chapter["grade"]
        subject = chapter["cisce_subject"] or "unknown"
        cbse_subject = chapter["cbse_subject"]

        print(f"  [{chapter_file}] {chapter['title'][:40]} — grade {grade} {subject}...")

        # Read book text
        try:
            book_text = Path(chapter["cache_path"]).read_text(encoding="utf-8", errors="replace")
        except Exception as e:
            print(f"    ERROR reading file: {e}")
            return None

        # Split if too large
        chunks = split_large_text(book_text)
        if len(chunks) > 1:
            print(f"    Split into {len(chunks)} chunks (size={len(book_text)//1024}KB)")

        # ALL chapters generate full CBSE node sets — don't touch CISCE
        print(f"    Generating CBSE nodes from scratch (CISCE untouched)")

        if dry_run:
            return {
                "chapter": chapter_file,
                "title": chapter["title"],
                "grade": grade,
                "subject": subject,
                "book_chunks": len(chunks),
                "book_size_kb": len(book_text) // 1024,
                "mode": "cbse_full",
            }

        all_results = []
        for i, chunk in enumerate(chunks):
            chunk_title = chapter["title"] + (f" (part {i+1}/{len(chunks)})" if len(chunks) > 1 else "")

            # Always use CBSE generation mode
            prompt = build_prompt_cbse_only(chunk, chunk_title, grade, subject)

            print(f"    Calling Claude for chunk {i+1}/{len(chunks)}...")
            response = await call_claude(session, prompt)

            if response:
                # Save raw markdown response
                md_path = OUTPUT_DIR / f"{chapter_file}_chunk{i+1}.md"
                md_path.write_text(response, encoding="utf-8")

                # Parse markdown into structured nodes
                try:
                    result = parse_markdown_nodes(response, chapter_file, i + 1)
                    result["_chunk"] = i + 1
                    all_results.append(result)
                    n_nodes = len(result.get("nodes", []))
                    print(f"    ✓ Chunk {i+1} done — {n_nodes} nodes")
                except Exception as e:
                    print(f"    ✗ Parse error: {e}")
                    all_results.append({"_error": str(e), "_chunk": i + 1, "_raw": response[:500]})
            else:
                print(f"    ✗ No response for chunk {i+1}")
                all_results.append({"_error": "no response", "_chunk": i + 1})

        # Save results
        result_path = OUTPUT_DIR / f"{chapter_file}_result.json"
        with open(result_path, "w", encoding="utf-8") as f:
            json.dump({
                "chapter": chapter_file,
                "title": chapter["title"],
                "grade": grade,
                "subject": subject,
                "cbse_subject": cbse_subject,
                "mode": "cbse_full",
                "results": all_results,
            }, f, indent=2, ensure_ascii=False)

        return result_path


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--grade", type=int, nargs="+", default=[12], help="Grade(s) to process")
    parser.add_argument("--subject", type=str, default="", help="Filter to specific subject")
    parser.add_argument("--dry-run", action="store_true", help="Show plan without calling API")
    parser.add_argument("--workers", type=int, default=WORKERS, help="Number of parallel workers")
    parser.add_argument("--retry-failed", action="store_true", help="Reprocess chapters with error stubs")
    args = parser.parse_args()

    print(f"\n=== CBSE FULL GRAPH GENERATION PIPELINE ===")
    print(f"Grades: {args.grade}")
    print(f"Workers: {args.workers}")
    print(f"Dry run: {args.dry_run}")
    print()

    # Get all chapters for all requested grades
    all_chapters = []
    for grade in args.grade:
        grade_chapters = get_chapters_for_grade(grade)
        all_chapters.extend(grade_chapters)
        print(f"  Grade {grade}: {len(grade_chapters)} chapters")

    print(f"Total chapters: {len(all_chapters)}")

    # Filter by subject if specified
    if args.subject:
        all_chapters = [c for c in all_chapters if args.subject.lower() in (c["cisce_subject"] or "").lower()
                        or args.subject.lower() in c["cbse_subject"].lower()]
        print(f"After subject filter: {len(all_chapters)}")

    # Skip already-done chapters (resume capability)
    # With --retry-failed, also reprocess chapters whose result files contain only errors
    done = set()
    failed_stubs = set()
    for f in OUTPUT_DIR.glob("*_result.json"):
        stem = f.stem.replace("_result", "")
        if args.retry_failed:
            try:
                import json as _json
                data = _json.loads(f.read_text(encoding="utf-8"))
                results_list = data.get("results", [])
                has_error = any("_error" in r for r in results_list)
                has_real_content = any("nodes" in r or "questions" in r for r in results_list)
                if has_error and not has_real_content:
                    # Check if we already recovered this from raw txt
                    recovered_path = OUTPUT_DIR / f"{stem}_recovered.json"
                    if recovered_path.exists():
                        done.add(stem)  # Already recovered — skip
                        continue
                    failed_stubs.add(stem)
                    continue  # Don't add to done — will be reprocessed
            except Exception:
                failed_stubs.add(stem)
                continue
        done.add(stem)
    pending = [ch for ch in all_chapters if ch["file"] not in done]
    skipped = len(all_chapters) - len(pending)
    print(f"Already done: {skipped}, pending: {len(pending)}")
    if args.retry_failed and failed_stubs:
        print(f"Retry-failed: reprocessing {len(failed_stubs)} error stubs")

    # Show plan
    print(f"\n=== PLAN ===")
    by_subject = defaultdict(list)
    for ch in pending:
        by_subject[ch["cisce_subject"] or ch["cbse_subject"]].append(ch)
    for subj, chs in sorted(by_subject.items()):
        total_size = sum(c["size"] for c in chs) // 1024
        print(f"  {subj}: {len(chs)} chapters ({total_size}KB total)")

    if args.dry_run:
        print("\n=== DRY RUN — not calling API ===")
        return

    if not pending:
        print("\nAll chapters already done!")
        return

    # Confirm before proceeding
    print(f"\n=== STARTING ({len(pending)} chapters, {args.workers} workers) ===")

    semaphore = asyncio.Semaphore(args.workers)

    connector = aiohttp.TCPConnector(ssl=CTX, limit=args.workers)
    async with aiohttp.ClientSession(connector=connector) as session:
        tasks = [process_chapter(session, ch, semaphore, args.dry_run) for ch in pending]
        results = await asyncio.gather(*tasks)

    # Summary
    print(f"\n=== SUMMARY ===")
    success = sum(1 for r in results if r)
    print(f"  Chapters processed: {success}/{len(pending)}")
    print(f"  Results saved to: {OUTPUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
