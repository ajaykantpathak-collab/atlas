"""
Generate curriculum nodes for 18 missing CBSE chapters using API.
Uses chapter names + NCERT knowledge instead of broken PDF text extraction.
"""
import asyncio
import aiohttp
import json
import ssl
import os
from pathlib import Path

# ─── Config ───
API_KEYS = [
    "sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK",
    "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna",
]
API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"
OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

# ─── Chapter definitions ───
# fess101-111: NCERT Class 6 History (Our Pasts - I)
HISTORY_CHAPTERS = [
    ("fess101", 6, "history_civics", "Social_Science", "What, Where, How and When?"),
    ("fess102", 6, "history_civics", "Social_Science", "On The Trail of the Earliest People"),
    ("fess103", 6, "history_civics", "Social_Science", "From Gathering to Growing Food"),
    ("fess104", 6, "history_civics", "Social_Science", "In the Earliest Cities"),
    ("fess105", 6, "history_civics", "Social_Science", "What Books and Burials Tell Us"),
    ("fess106", 6, "history_civics", "Social_Science", "Kingdoms, Kings and an Early Republic"),
    ("fess107", 6, "history_civics", "Social_Science", "New Questions and Ideas"),
    ("fess108", 6, "history_civics", "Social_Science", "Ashoka, The Emperor Who Gave Up War"),
    ("fess109", 6, "history_civics", "Social_Science", "Vital Villages, Thriving Towns"),
    ("fess110", 6, "history_civics", "Social_Science", "Traders, Kings and Pilgrims"),
    ("fess111", 6, "history_civics", "Social_Science", "New Empires and Kingdoms"),
]

# kegy101-107: NCERT Class 11 Geography (Fundamentals of Physical Geography)
GEO_CHAPTERS = [
    ("kegy101", 11, "geography", "Geography", "Geography as a Discipline"),
    ("kegy102", 11, "geography", "Geography", "The Origin and Evolution of the Earth"),
    ("kegy103", 11, "geography", "Geography", "Interior of the Earth"),
    ("kegy105", 11, "geography", "Geography", "Distribution of Oceans and Continents"),
    ("kegy106", 11, "geography", "Geography", "Minerals and Rocks"),
    ("kegy107", 11, "geography", "Geography", "Geomorphic Processes"),
]

# keww101: NCERT Class 11 English (Woven Words) - The Lament
ENG_CHAPTERS = [
    ("keww101", 11, "English Literature", "English", "The Lament by Anton Chekhov"),
]

ALL_CHAPTERS = HISTORY_CHAPTERS + GEO_CHAPTERS + ENG_CHAPTERS


def build_prompt_from_name(chapter_title, grade, subject):
    """Build prompt using just chapter name — let Opus use its NCERT knowledge."""
    subj_code_map = {
        "history_civics": "hist", "geography": "geo", "English Literature": "eng",
    }
    subj_code = subj_code_map.get(subject, subject[:4])

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
- Use your judgment to decide the right number of nodes based on the student's age
- A Class 6 chapter might need 5-10 nodes
- Younger students need fewer, broader nodes
- Let the content and age group guide you""".format(grade=grade)

    return f"""You are an educational curriculum expert building a K-12 knowledge graph.
I'm giving you a NCERT textbook chapter name. Generate a complete set of curriculum nodes
from this chapter using your knowledge of the NCERT textbook content. These are CBSE nodes.

CHAPTER: {chapter_title} (Class {grade} {subject})

You know the content of this NCERT chapter. Generate atomic curriculum nodes
for the educational content. Each node = one concept, skill, or topic that a
student needs to learn from this chapter.

{granularity}

Output each node as a MARKDOWN section using this EXACT format:

## NODE: c{grade}_{subj_code}_cbse_001

- **topic**: Clear topic title
- **content_snippet**: Brief description of what this node covers (2-3 sentences)
- **subject**: {subject}
- **class_level**: {grade}
- **board**: CBSE
- **chapter**: {chapter_title}
- **chapter_name**: {chapter_title}
- **difficulty**: easy|medium|hard
- **estimated_time**: minutes
- **is_root**: true|false
- **concept_tags**: [tag1, tag2, tag3]
- **scope_constraints**: [what to focus on, what's out of scope]
- **prerequisite_node_ids**: [list of node IDs this depends on]
- **prerequisite_reasons**: {{"node_id": "why"}}
- **forward_node_ids**: [list of node IDs that depend on this]
- **forward_reasons**: {{"node_id": "why"}}
- **cross_subject_prereqs**: [list of node IDs from other subjects]
- **cross_subject_reasons**: {{"node_id": "why"}}
- **source_file**: cbse_class{grade}_{subject}.json

## NODE: c{grade}_{subj_code}_cbse_002

- **topic**: ...

(continue for all nodes in the chapter)

Generate ALL nodes in this format. Be thorough and educationally accurate."""


async def call_claude(session, prompt, retries=5):
    """Call Claude API."""
    body = {
        "model": MODEL,
        "max_tokens": 128000,
        "messages": [{"role": "user", "content": prompt}],
    }
    for attempt in range(retries):
        key = API_KEYS[1]
        headers = {
            "x-api-key": key,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01",
        }
        try:
            async with session.post(API_URL, json=body, headers=headers, ssl=CTX,
                                     timeout=aiohttp.ClientTimeout(total=600)) as resp:
                data = await resp.json()
                if resp.status == 200:
                    text = ""
                    for block in data.get("content", []):
                        if block["type"] == "text":
                            text = block["text"]
                            break
                    if text.strip():
                        if "Rate limit" in text or "rate limit" in text.lower():
                            wait = 60 * (attempt + 1)
                            print(f"    rate-limited, retry {attempt+1}/{retries} after {wait}s")
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


def parse_markdown_nodes(text, chapter_file):
    """Parse markdown nodes from API response."""
    nodes = []
    sections = text.split("## NODE:")
    for section in sections[1:]:  # skip preamble
        lines = section.strip().split("\n")
        node_id = lines[0].strip()
        node = {"node_id": node_id}
        for line in lines[1:]:
            line = line.strip()
            if line.startswith("- **") and "**:" in line:
                key = line.split("**")[1]
                val = line.split("**:", 1)[1].strip()
                node[key] = val
        if "topic" in node:
            nodes.append(node)
    return {"nodes": nodes, "diagrams": [], "chapter_summary": ""}


async def process_one(session, chapter_info, semaphore):
    """Process one chapter."""
    async with semaphore:
        code, grade, subject, cbse_subject, title = chapter_info
        print(f"  [{code}] {title} — grade {grade} {subject}...")

        prompt = build_prompt_from_name(title, grade, subject)
        print(f"    Calling Claude...")
        response = await call_claude(session, prompt)

        if response:
            # Save raw markdown
            md_path = OUTPUT_DIR / f"{code}_chunk1.md"
            md_path.write_text(response, encoding="utf-8")

            # Parse
            try:
                result = parse_markdown_nodes(response, code)
                n_nodes = len(result.get("nodes", []))
                print(f"    ✓ Done — {n_nodes} nodes")
            except Exception as e:
                print(f"    ✗ Parse error: {e}")
                result = {"_error": str(e), "_chunk": 1, "_raw": response[:500]}
                n_nodes = 0
        else:
            print(f"    ✗ No response")
            result = {"_error": "no response", "_chunk": 1}
            n_nodes = 0

        # Save result
        result_path = OUTPUT_DIR / f"{code}_result.json"
        with open(result_path, "w", encoding="utf-8") as f:
            json.dump({
                "chapter": code,
                "title": title,
                "grade": grade,
                "subject": subject,
                "cbse_subject": cbse_subject,
                "mode": "cbse_full_from_name",
                "results": [result],
            }, f, indent=2, ensure_ascii=False)

        return n_nodes


async def main():
    print(f"\n=== GENERATING {len(ALL_CHAPTERS)} MISSING CHAPTERS ===\n")
    semaphore = asyncio.Semaphore(5)  # 5 concurrent

    async with aiohttp.ClientSession() as session:
        tasks = [process_one(session, ch, semaphore) for ch in ALL_CHAPTERS]
        results = await asyncio.gather(*tasks)

    total_nodes = sum(results)
    success = sum(1 for r in results if r > 0)
    print(f"\n=== DONE: {success}/{len(ALL_CHAPTERS)} chapters, {total_nodes} nodes ===")


if __name__ == "__main__":
    asyncio.run(main())
