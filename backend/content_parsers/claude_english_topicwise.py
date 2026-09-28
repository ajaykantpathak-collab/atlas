import os
"""
Topic-wise Supporting Files Generator — CISCE English C1-8 + CBSE English C6-12.

Instead of generating 10 files PER TEXT/CHAPTER (3,750+ files),
this generates 10 files PER TOPIC (~44 topics = ~440 files).

Topics are grouped by (class, text_type):
  - C10 Poetry, C10 Prose, C10 Drama, C10 Language_Skills, C10 Thematic_Unit
  - Large topics (>15 chapters) are split into parts.

Each topic file covers ALL texts/chapters within that topic group.
For example, "C10_Poetry_quote_bank.md" contains quotes from ALL C10 poems.

Uses key 0 only, 5 workers.
"""
import asyncio
import aiohttp
import ssl
import json
import argparse
import time
import re
from pathlib import Path
from collections import defaultdict

# ─── Config ───
API_KEYS = [
    os.environ.get('ANTHROPIC_API_KEY') or '',   # key 0 — 5 workers
]
API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"
MAX_TOKENS = 128000

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

# ─── Paths ───
ORGANIZED_DIR = Path(r"D:\platform\organized\english")
OUTPUT_DIR = Path(r"D:\platform\parsed_output\english_c1_8_supporting_files")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

CBSE_NODES_DIR = Path(r"D:\platform\cbse_data\nodes\by_subject")
CBSE_OUTPUT_DIR = Path(r"D:\platform\parsed_output\cbse_supporting_files_topicwise")
CBSE_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ─── Concurrency: 5 workers on key 0 ───
CONCURRENCY = 5
semaphore = asyncio.Semaphore(CONCURRENCY)

# ─── Max chapters per topic before splitting ───
MAX_CHAPTERS_PER_TOPIC = 15

# ─── File types (same 10 types, generated per-topic instead of per-text) ───
FILE_TYPES = {
    'quote_bank': {
        'literary_only': True,
        'description': 'Curated quote bank with speaker, context, meaning, themes, exam applicability',
    },
    'character_maps': {
        'literary_only': True,
        'description': 'Character relationships, arcs, key quotes, tragic flaws, exam angles',
    },
    'theme_trackers': {
        'literary_only': True,
        'description': 'Theme occurrences, development, supporting quotations, cross-text connections',
    },
    'literary_devices': {
        'literary_only': True,
        'description': 'Literary device definitions with textual examples and exam-writing guidance',
    },
    'model_answers': {
        'literary_only': False,
        'description': 'Weak, average, and strong exam responses with rubric scores and explanations',
    },
    'revision_sheets': {
        'literary_only': False,
        'description': 'Key quotes, character summaries, themes, condensed for quick revision',
    },
    'glossary': {
        'literary_only': False,
        'description': 'Literary terms and vocabulary specific to this topic',
    },
    'worked_examples': {
        'literary_only': False,
        'description': 'Model exam answers with step-by-step deconstruction of how to build the answer',
    },
    'question_bank': {
        'literary_only': False,
        'description': 'Exam-style Q&A per topic with marking scheme alignment',
    },
    'drill_banks': {
        'literary_only': False,
        'description': 'Rapid-fire practice drills: definition, example identification, application',
    },
}

LITERARY_ONLY_TYPES = {'quote_bank', 'character_maps', 'theme_trackers', 'literary_devices'}


# ─── Text type detection ───
def detect_text_type(chapter_name):
    ch_lower = chapter_name.lower()
    if any(kw in ch_lower for kw in ['poem', 'poetry', 'ode', 'sonnet', 'ballad', 'elegy', 'rhyme', 'song']):
        return 'Poetry'
    elif any(kw in ch_lower for kw in ['play', 'drama', 'act i', 'act ii', 'act iii', 'act iv', 'act v',
                                        'julius', 'macbeth', 'merchant', 'scene']):
        return 'Drama'
    elif any(kw in ch_lower for kw in ['grammar', 'vocabulary', 'writing', 'comprehension', 'speaking',
                                        'listening', 'reading', 'synonyms', 'antonyms', 'tense', 'clauses',
                                        'composition', 'letter', 'essay', 'notice', 'report writing',
                                        'precis', 'summary']):
        return 'Language_Skills'
    elif any(kw in ch_lower for kw in ['cross-chapter', 'skill', 'unit', 'theme']):
        return 'Thematic_Unit'
    else:
        return 'Prose'


def is_literary_topic(text_type):
    return text_type in ('Poetry', 'Drama', 'Prose')


# ─── Load CISCE texts for C1-8 ───
def load_cisce_texts():
    texts = []
    seen = set()
    for cls in range(1, 9):
        cls_dir = ORGANIZED_DIR / f"class{cls}"
        if not cls_dir.exists():
            continue
        for f in cls_dir.rglob("*subnodes*.json"):
            if "__pycache__" in str(f):
                continue
            try:
                raw = f.read_text(encoding="utf-8")
                m = re.search(r'\{.*\}', raw, re.DOTALL)
                if not m:
                    continue
                data = json.loads(m.group())
                text_name = data.get("text_name", data.get("parent_title", ""))
                if not text_name:
                    continue
                key = (text_name.lower().strip(), cls)
                if key in seen:
                    continue
                seen.add(key)
                texts.append({
                    'text_name': text_name,
                    'class': cls,
                    'text_type': detect_text_type(text_name),
                })
            except Exception:
                continue
    return texts


# ─── Load CBSE chapters for C6-12 ───
def load_cbse_chapters():
    chapters = []
    eng_file = CBSE_NODES_DIR / "English_Literature.json"
    if not eng_file.exists():
        return chapters
    try:
        data = json.loads(eng_file.read_text(encoding="utf-8"))
    except Exception:
        return chapters
    seen = set()
    for node in data:
        cls = int(node.get("class_level", 0))
        if cls < 6 or cls > 12:
            continue
        chapter = node.get("chapter", node.get("chapter_name", ""))
        if not chapter:
            continue
        key = (cls, chapter.lower().strip())
        if key in seen:
            continue
        seen.add(key)
        chapters.append({
            'text_name': chapter,
            'class': cls,
            'text_type': detect_text_type(chapter),
        })
    return chapters


# ─── Group texts into topics ───
def group_into_topics(texts, source='cisce'):
    """Group texts by (class, text_type), splitting large groups into parts."""
    by_group = defaultdict(list)
    for t in texts:
        by_group[(t['class'], t['text_type'])].append(t['text_name'])

    topics = []
    for (cls, ttype), names in sorted(by_group.items()):
        unique = sorted(set(names))
        if len(unique) <= MAX_CHAPTERS_PER_TOPIC:
            topics.append({
                'class': cls,
                'text_type': ttype,
                'part': 0,  # 0 = no split
                'chapters': unique,
                'source': source,
            })
        else:
            n_parts = (len(unique) + MAX_CHAPTERS_PER_TOPIC - 1) // MAX_CHAPTERS_PER_TOPIC
            for i in range(n_parts):
                start = i * MAX_CHAPTERS_PER_TOPIC
                end = start + MAX_CHAPTERS_PER_TOPIC
                topics.append({
                    'class': cls,
                    'text_type': ttype,
                    'part': i + 1,
                    'chapters': unique[start:end],
                    'source': source,
                })
    return topics


# ─── Build topic ID ───
def topic_id(topic):
    cls = topic['class']
    ttype = topic['text_type']
    part = topic['part']
    prefix = 'cbse_' if topic['source'] == 'cbse' else ''
    if part > 0:
        return f"{prefix}c{cls}_{ttype}_p{part}"
    return f"{prefix}c{cls}_{ttype}"


# ─── Prompt builders ───
def build_system_prompt(file_type, cls, board='ICSE'):
    return f"""You are a master English teacher and {board} curriculum expert specializing in English Literature and Language.
You are creating {FILE_TYPES[file_type]['description']} for Class {cls} students preparing for {board} exams.

This is a TOPIC-LEVEL document covering MULTIPLE texts/chapters within the same topic area.
Cover ALL listed texts comprehensively — do not skip any.

Rules:
- Base ALL content on your expert knowledge of the actual texts. Do NOT fabricate quotes.
- If unsure about a specific quote, paraphrase rather than invent.
- Content must be directly useful for {board} exam preparation.
- Be specific and detailed — no vague generalities.
- Content must be class-appropriate for Class {cls} students.
- Output as clean Markdown with proper headings (##, ###), bullet points, and tables where appropriate.
- Do NOT use JSON. Do NOT use delimited formats like <<<TAG>>>. Use plain Markdown.
- Follow {board} 2025-26 marking schemes where applicable:
  - 3-mark questions: Content = 2 marks, Expression = 1 mark
  - 6-mark questions: Content = 3 marks, Expression = 2 marks, Accuracy = 1 mark
- NO foreign language etymologies (Latin, Greek, Italian, etc.)
- NO mnemonics in any field"""


def build_prompt(file_type, topic):
    cls = topic['class']
    ttype = topic['text_type']
    chapters = topic['chapters']
    board = 'CBSE' if topic['source'] == 'cbse' else 'ICSE'
    literary = is_literary_topic(ttype)

    chapter_list = '\n'.join(f"  - {c}" for c in chapters)
    topic_label = f"{ttype} (Class {cls}, {board})"
    display = f"{topic_label}\n\nTexts/Chapters covered:\n{chapter_list}"

    prompts = {
        'quote_bank': f"""Create a comprehensive QUOTE BANK for the following {board} English {ttype} topic:

{display}

For EACH text listed, select the 5-10 most important quotes and provide:
- The exact quote
- Who said it (speaker) or Narrator
- Context (when/where in the text)
- Literal meaning
- What it reveals about character/theme
- Themes it connects to
- Exam questions it can answer

Cover ALL texts listed above. Use ## headings per text, then ### per quote.
Output raw Markdown text only. No JSON.""",

        'character_maps': f"""Create comprehensive CHARACTER MAPS for the following {board} English {ttype} topic:

{display}

For EACH text, map the major characters:
- Role in the text
- Key relationships
- Character arc
- Key quotes
- Exam angle

Use ## per text, ### per character. Cover ALL texts.
Output raw Markdown text only. No JSON.""",

        'theme_trackers': f"""Create comprehensive THEME TRACKERS for the following {board} English {ttype} topic:

{display}

For EACH text, track the major themes:
- Where each theme appears
- How it develops
- Key quotes
- Cross-text connections within this topic

Use ## per text, ### per theme. Cover ALL texts.
Output raw Markdown text only. No JSON.""",

        'literary_devices': f"""Create a LITERARY DEVICE LIBRARY for the following {board} English {ttype} topic:

{display}

For EACH text, identify the important literary devices used:
- Definition of the device
- Specific example from the text
- How to write about it in an exam

Use ## per text, ### per device. Cover ALL texts.
Output raw Markdown text only. No JSON.""",

        'model_answers': (
            f"""Create MODEL ANSWERS for the following {board} English {ttype} topic:

{display}

For EACH text, create 2-3 exam-style questions with:
- A WEAK answer (score + why it's weak)
- A STRONG answer (score + why it's strong)

Use ## per text, ### per question. Cover ALL texts.
Output raw Markdown text only. No JSON."""
            if literary else
            f"""Create MODEL ANSWERS for the following {board} English {ttype} topic:

{display}

Create 5-8 exam-style questions covering different aspects of this topic, with:
- A WEAK answer (score + why)
- A STRONG answer (score + why)

Use ## per question. Output raw Markdown text only. No JSON."""
        ),

        'revision_sheets': (
            f"""Create REVISION SHEETS for the following {board} English {ttype} topic:

{display}

For EACH text, condense into a revision sheet:
- Plot summary (brief)
- Character summaries (1-2 lines)
- Key themes
- Top 5 quotes
- Key literary devices
- Common exam questions

Use ## per text. Cover ALL texts. Output raw Markdown text only. No JSON."""
            if literary else
            f"""Create a REVISION SHEET for the following {board} English {ttype} topic:

{display}

Condense everything:
- Key definitions and rules
- Important examples
- Step-by-step procedures
- Common exam question types
- Quick revision tips

Use ## headings. Output raw Markdown text only. No JSON."""
        ),

        'glossary': (
            f"""Create a GLOSSARY for the following {board} English {ttype} topic:

{display}

For EACH text, include:
- Literary terms used (with definitions)
- Difficult vocabulary (with definitions)
- Cultural/historical references

Use ## per text, then a Markdown table: Term | Definition | Context.
Cover ALL texts. Output raw Markdown text only. No JSON."""
            if literary else
            f"""Create a GLOSSARY for the following {board} English {ttype} topic:

{display}

Include:
- Key terminology (with definitions)
- Related terms students need to know
- Examples for each term
- How each term appears in exams

Use a Markdown table: Term | Definition | Example.
Output raw Markdown text only. No JSON."""
        ),

        'worked_examples': (
            f"""Create WORKED EXAMPLES for the following {board} English {ttype} topic:

{display}

For EACH text, create 1-2 worked exam answers with step-by-step deconstruction:
- Step 1: Analyze (what the question asks)
- Step 2: Plan (structure and content)
- Step 3: Answer (full model answer)
- Step 4: Deconstruct (why it scores well)

Use ## per text, ### per worked example. Cover ALL texts.
Output raw Markdown text only. No JSON."""
            if literary else
            f"""Create WORKED EXAMPLES for the following {board} English {ttype} topic:

{display}

Create 3-5 worked examples with step-by-step deconstruction:
- Step 1: Analyze
- Step 2: Plan
- Step 3: Answer
- Step 4: Deconstruct

Use ## per worked example. Output raw Markdown text only. No JSON."""
        ),

        'question_bank': f"""Create a QUESTION BANK for the following {board} English {ttype} topic:

{display}

For EACH text, create 5-8 exam-style questions with:
- Marks (3 or 6 marks per {board} scheme)
- Bloom level (Recall/Understanding/Application/Analysis)
- Full question text
- Model answer
- Marking scheme breakdown

Use ## per text, ### per question. Cover ALL texts.
Output raw Markdown text only. No JSON.""",

        'drill_banks': f"""Create DRILL BANKS for the following {board} English {ttype} topic:

{display}

For EACH text, create rapid-fire drills:
- Definition drills (10 per text)
- Example identification drills (5 per text)
- Application drills (5 per text)

Use ## per text, ### per drill type. Cover ALL texts.
Output raw Markdown text only. No JSON.""",
    }

    return prompts.get(file_type, prompts['question_bank'])


# ─── API call ───
async def call_claude(session, prompt, system_prompt):
    for attempt in range(3):
        try:
            payload = {
                "model": MODEL,
                "max_tokens": MAX_TOKENS,
                "system": system_prompt,
                "messages": [{"role": "user", "content": prompt}],
            }
            headers = {
                "x-api-key": API_KEYS[0],
                "Content-Type": "application/json",
                "anthropic-version": "2023-06-01",
            }
            async with session.post(API_URL, json=payload, headers=headers, ssl=CTX,
                                     timeout=aiohttp.ClientTimeout(total=900)) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    text = ""
                    for block in data.get("content", []):
                        if block["type"] == "text":
                            text = block["text"]
                            break
                    if text and len(text) > 200:
                        return text
                    print(f"      empty, retry {attempt+1}")
                    await asyncio.sleep(10 * (attempt + 1))
                elif resp.status == 429:
                    print(f"      429, waiting 300s")
                    await asyncio.sleep(300)
                else:
                    try:
                        data = await resp.json()
                    except:
                        data = {}
                    err_text = ""
                    for block in data.get("content", []):
                        if block.get("type") == "text":
                            err_text = block["text"]
                            break
                    if "token limit" in err_text.lower() or "rate limit" in err_text.lower():
                        print(f"      token/rate limit on key 0, waiting 60s")
                        await asyncio.sleep(60)
                    else:
                        print(f"      error {resp.status}: {str(data)[:200]}")
                        await asyncio.sleep(15 * (attempt + 1))
        except Exception as e:
            print(f"      retry {attempt+1}: {str(e)[:150]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


# ─── Process one task ───
async def process_task(session, task):
    async with semaphore:
        tid = task['topic_id']
        ft = task['file_type']
        topic = task['topic']
        out_dir = CBSE_OUTPUT_DIR if topic['source'] == 'cbse' else OUTPUT_DIR
        out_file = out_dir / f"{tid}_{ft}.md"

        if out_file.exists() and out_file.stat().st_size >= 100:
            print(f"  [{tid}_{ft}] SKIP — already exists")
            return True

        board = 'CBSE' if topic['source'] == 'cbse' else 'ICSE'
        sys_prompt = build_system_prompt(ft, topic['class'], board)
        prompt = build_prompt(ft, topic)

        print(f"  [{tid}_{ft}] Calling Claude... ({len(topic['chapters'])} chapters)")
        start = time.time()
        response = await call_claude(session, prompt, sys_prompt)
        elapsed = time.time() - start

        if not response:
            print(f"  [{tid}_{ft}] FAILED")
            return False

        if "Token limit" in response[:200] or "rate limit" in response[:200]:
            print(f"  [{tid}_{ft}] FAILED — API limit")
            return False

        out_file.write_text(response, encoding="utf-8")
        size_kb = out_file.stat().st_size / 1024
        print(f"  [{tid}_{ft}] DONE in {elapsed:.1f}s — {size_kb:.1f}KB")
        return True


# ─── Main ───
async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--class-num', type=int, default=None)
    parser.add_argument('--source', choices=['cisce', 'cbse', 'both'], default='both')
    parser.add_argument('--file-types', default='all')
    args = parser.parse_args()

    print("\n" + "=" * 70)
    print("Topic-wise Supporting Files Generator")
    print("  CISCE English C1-8 + CBSE English C6-12")
    print("=" * 70)
    print(f"  Key 0 only, {CONCURRENCY} workers")
    print(f"  Max chapters per topic: {MAX_CHAPTERS_PER_TOPIC}")

    all_topics = []

    if args.source in ('cisce', 'both'):
        print("\nLoading CISCE texts C1-8...")
        cisce_texts = load_cisce_texts()
        print(f"  Found {len(cisce_texts)} texts")
        cisce_topics = group_into_topics(cisce_texts, source='cisce')
        print(f"  Grouped into {len(cisce_topics)} topics")
        all_topics.extend(cisce_topics)

    if args.source in ('cbse', 'both'):
        print("\nLoading CBSE chapters C6-12...")
        cbse_chapters = load_cbse_chapters()
        print(f"  Found {len(cbse_chapters)} chapters")
        cbse_topics = group_into_topics(cbse_chapters, source='cbse')
        print(f"  Grouped into {len(cbse_topics)} topics")
        all_topics.extend(cbse_topics)

    # Filter by class if specified
    if args.class_num:
        all_topics = [t for t in all_topics if t['class'] == args.class_num]
        print(f"\n  Filtered to class {args.class_num}: {len(all_topics)} topics")

    # Determine file types
    if args.file_types == 'all':
        file_types = list(FILE_TYPES.keys())
    else:
        file_types = [ft.strip() for ft in args.file_types.split(',')]

    # Build tasks
    tasks = []
    for topic in all_topics:
        tid = topic_id(topic)
        literary = is_literary_topic(topic['text_type'])
        for ft in file_types:
            # Skip literary-only types for non-literary topics
            if ft in LITERARY_ONLY_TYPES and not literary:
                continue
            tasks.append({
                'topic_id': tid,
                'file_type': ft,
                'topic': topic,
            })

    # Filter out existing
    new_tasks = []
    for task in tasks:
        tid = task['topic_id']
        ft = task['file_type']
        topic = task['topic']
        out_dir = CBSE_OUTPUT_DIR if topic['source'] == 'cbse' else OUTPUT_DIR
        out_file = out_dir / f"{tid}_{ft}.md"
        if not out_file.exists() or out_file.stat().st_size < 100:
            new_tasks.append(task)

    print(f"\n  Total topics: {len(all_topics)}")
    print(f"  Total tasks: {len(tasks)}")
    print(f"  Already done: {len(tasks) - len(new_tasks)}")
    print(f"  To generate: {len(new_tasks)}")
    print(f"  CISCE output: {OUTPUT_DIR}")
    print(f"  CBSE output:  {CBSE_OUTPUT_DIR}")

    if args.dry_run:
        print("\n  [dry-run] Tasks:")
        for task in new_tasks:
            t = task['topic']
            print(f"    {task['topic_id']}_{task['file_type']} — C{t['class']} {t['text_type']} ({len(t['chapters'])} chapters)")
        return

    if not new_tasks:
        print("\n  Nothing to generate — all files exist!")
        return

    print(f"\n  Starting generation with {CONCURRENCY} workers...\n")

    connector = aiohttp.TCPConnector(limit=CONCURRENCY)
    async with aiohttp.ClientSession(connector=connector) as session:
        results = await asyncio.gather(*[process_task(session, t) for t in new_tasks])

    succeeded = sum(1 for r in results if r)
    failed = sum(1 for r in results if not r)
    print(f"\n{'=' * 70}")
    print(f"  DONE — {succeeded} succeeded, {failed} failed out of {len(new_tasks)} tasks")
    print(f"{'=' * 70}")


if __name__ == "__main__":
    asyncio.run(main())
