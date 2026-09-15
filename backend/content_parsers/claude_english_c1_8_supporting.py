"""
Generate supporting English files for CISCE Classes 1-8.

Uses the same 2 Claude Opus keys as cbse_prereqs_pipeline_v2.py.
- 10 workers for key 1
- 5 workers for key 0

Reads text info from D:\\platform\\organized\\english\\class{1-8} subnodes files.
Writes NEW files to D:\\platform\\parsed_output\\english_c1_8_supporting_files/

Usage:
    python claude_english_c1_8_supporting.py --dry-run
    python claude_english_c1_8_supporting.py
    python claude_english_c1_8_supporting.py --class-num 7
    python claude_english_c1_8_supporting.py --file-types quote_bank,character_maps
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

# ─── Config (same keys as cbse_prereqs_pipeline_v2.py) ───
API_KEYS = [
    "sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK",   # key 0 — 5 workers
    "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna",    # key 1 — 10 workers
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

# CBSE supporting files output (same 13 file types, C6-12)
CBSE_NODES_DIR = Path(r"D:\platform\cbse_data\nodes\by_subject")
CBSE_OUTPUT_DIR = Path(r"D:\platform\parsed_output\cbse_supporting_files")
CBSE_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ─── Concurrency: 5 workers on key 0 only (key 1 not used) ───
CONCURRENCY_KEY0 = 5
CONCURRENCY_KEY1 = 0  # key 1 not used for this generation
semaphore_key0 = asyncio.Semaphore(CONCURRENCY_KEY0)
semaphore_key1 = asyncio.Semaphore(1)  # unused

# ─── 13 File Types (same as claude_english_supporting.py) ───
FILE_TYPES = {
    'quote_bank': {
        'per': 'text',
        'description': 'Curated quote bank with speaker, context, meaning, themes, exam applicability',
    },
    'character_maps': {
        'per': 'text',
        'description': 'Character relationships, arcs, key quotes, tragic flaws, exam angles',
    },
    'theme_trackers': {
        'per': 'text',
        'description': 'Theme occurrences, development, supporting quotations, cross-text connections',
    },
    'literary_devices': {
        'per': 'text',
        'description': 'Literary device definitions with textual examples and exam-writing guidance',
    },
    'model_answers': {
        'per': 'text',
        'description': 'Weak, average, and strong exam responses with rubric scores and explanations',
    },
    'revision_sheets': {
        'per': 'text',
        'description': 'Key quotes, character summaries, themes, condensed for quick revision',
    },
    'glossary': {
        'per': 'text',
        'description': 'Literary terms and vocabulary specific to this text',
    },
    'worked_examples': {
        'per': 'text',
        'description': 'Model exam answers with step-by-step deconstruction of how to build the answer',
    },
    'question_bank': {
        'per': 'text',
        'description': 'Exam-style Q&A per text with marking scheme alignment',
    },
    'drill_banks': {
        'per': 'text',
        'description': 'Quick recall drills: quotes, characters, vocabulary, key facts',
    },
    'passage_library': {
        'per': 'class',
        'description': 'Unseen comprehension passages with questions and model answers',
    },
    'writing_rubrics': {
        'per': 'class',
        'description': 'Marking rubrics per composition type with performance levels and examiner notes',
    },
    'examiner_reports': {
        'per': 'class',
        'description': 'Systematic digest of CISCE examiner comments, common errors, mark scheme insights',
    },
}


# ─── Load texts from organized/english/class{1-8} ───
def load_texts_for_c1_8():
    """Load all texts (parent nodes) for English Classes 1-8 from organized subnodes files."""
    texts = []
    seen_keys = set()

    for cls in range(1, 9):
        cls_dir = ORGANIZED_DIR / f"class{cls}"
        if not cls_dir.exists():
            continue

        # Find all subnodes files (in enrichment/ and granular_nodes/)
        subnode_files = list(cls_dir.rglob("*subnodes*.json"))
        # Also check for nodes files
        node_files = list(cls_dir.rglob("*nodes*.json"))

        all_files = subnode_files + node_files

        for f in all_files:
            if "__pycache__" in str(f):
                continue
            try:
                raw = f.read_text(encoding="utf-8")
                # Some files have trailing markers — extract JSON
                json_match = re.search(r'\{.*\}', raw, re.DOTALL)
                if not json_match:
                    continue
                data = json.loads(json_match.group())

                # Extract text info — handle both formats
                parent_node = data.get("parent_node", data.get("parent", data.get("node_id", "")))
                parent_title = data.get("parent_title", data.get("title", ""))
                text_name = data.get("text_name", parent_title)
                author = data.get("author", "")
                text_type = data.get("text_type", "prose")
                subject_code = data.get("subject_code", "eng")

                # For C1-8, many texts are grammar/writing units, not literary texts
                # We still generate supporting files for them
                # Deduplicate by (text_name, author, class)
                dedup_key = (text_name.lower().strip() if text_name else "",
                             author.lower().strip(),
                             cls)
                if dedup_key in seen_keys:
                    continue
                seen_keys.add(dedup_key)

                # Skip empty/generic entries
                if not text_name and not parent_title:
                    continue

                text_entry = {
                    'parent_node': parent_node,
                    'parent_title': parent_title,
                    'text_name': text_name or parent_title,
                    'author': author,
                    'class': cls,
                    'subject': 'eng',
                    'subject_code': subject_code,
                    'text_type': text_type,
                    'source_file': str(f),
                }
                texts.append(text_entry)
            except Exception:
                continue

    return texts


# ─── Prompt builders (adapted from claude_english_supporting.py) ───
def build_system_prompt(file_type, cls):
    return f"""You are a master English teacher and ICSE curriculum expert specializing in English Literature and Language.
You are creating {FILE_TYPES[file_type]['description']} for Class {cls} students preparing for ICSE exams.

Rules:
- Base ALL content on your expert knowledge of the actual texts. Do NOT fabricate quotes.
- If unsure about a specific quote, paraphrase rather than invent.
- Content must be directly useful for ICSE exam preparation.
- Be specific and detailed — no vague generalities.
- Content must be class-appropriate for Class {cls} students.
- Output as clean Markdown with proper headings (##, ###), bullet points, and tables where appropriate.
- Do NOT use JSON. Do NOT use delimited formats like <<<TAG>>>. Use plain Markdown.
- Follow CBSE 2025-26 marking schemes where applicable:
  - 3-mark questions: Content = 2 marks, Expression = 1 mark
  - 6-mark questions: Content = 3 marks, Expression = 2 marks, Accuracy = 1 mark
- NO foreign language etymologies (Latin, Greek, Italian, etc.)
- NO mnemonics in any field"""


def is_literary_text(text_info):
    """Detect whether this is an actual literary text or a concept/language topic."""
    text_type = (text_info.get('text_type') or '').lower().strip()
    title = (text_info.get('text_name') or text_info.get('parent_title') or '').lower()

    # Empty text_type means it's a language/grammar topic
    if not text_type:
        return False

    # Check for concept/skill chapter keywords in title
    concept_keywords = [
        'poetry appreciation', 'rhyme scheme', 'metre', 'tone and mood',
        'character development', 'round and flat', 'narrative voice',
        'point of view', 'genre and literary forms', 'fiction vs non-fiction',
        'synonyms', 'antonyms', 'analogy', 'vocabulary', 'grammar',
        'writing skills', 'comprehension skills', 'speaking skills',
        'listening skills', 'reading comprehension',
    ]
    for kw in concept_keywords:
        if kw in title:
            return False

    # If text_type is a real literary type, it's a literary text
    return text_type in ('prose', 'poem', 'play', 'short_story', 'novel', 'drama', 'essay', 'biography')


def build_prompt(file_type, text_info, cls):
    text_name = text_info.get('text_name', '')
    author = text_info.get('author', '')
    parent_title = text_info.get('parent_title', '')

    if parent_title and text_name and 'Fireflies' in text_name:
        text_name = parent_title

    display_name = text_name or parent_title or f"Class {cls} English"

    literary = is_literary_text(text_info)

    prompts = {
        'quote_bank': f"""Create a comprehensive QUOTE BANK for "{display_name}" by {author or 'various'} (Class {cls}, ICSE English).

For EACH important quote in the text, provide:
- The exact quote
- Who said it (speaker)
- Context (when/where in the text)
- Literal meaning
- What it reveals about character/theme
- Themes it connects to
- Exam questions it can answer

Include 10-20 quotes covering all major characters, themes, and turning points.
Prioritize quotes that are most useful for ICSE exam answers.

Write as a Markdown document. Use a table with columns: Quote | Speaker | Context | Literal Meaning | Reveals | Themes | Exam Use.
Or use ## headings per quote with bullet points underneath. Either is fine.
Output raw Markdown text only. No JSON.""",

        'character_maps': f"""Create a comprehensive CHARACTER MAP for "{display_name}" by {author or 'various'} (Class {cls}, ICSE English).

For EACH major character, provide:
- Role in the text
- Key relationships (with other characters)
- Character arc (how they change)
- Key quotes
- Tragic flaw / fatal error (if applicable)
- Exam angle (how to write about this character)

Write as a Markdown document. Use ## Character Name as heading for each character,
then ### subheadings for Role, Relationships, Character Arc, Key Quotes, Tragic Flaw, Exam Angle.
Use bullet points and bold text where helpful.
Cover ALL major characters. Output raw Markdown text only. No JSON.""",

        'theme_trackers': f"""Create a comprehensive THEME TRACKER for "{display_name}" by {author or 'various'} (Class {cls}, ICSE English).

For EACH major theme, provide:
- Where it appears (section/act/scene references)
- How it develops across the text
- Key quotes that embody it
- Cross-text connections (if applicable)

Write as a Markdown document. Use ## Theme Name as heading for each theme,
then ### subheadings for Where It Appears, How It Develops, Key Quotes, Cross-Text Connections, Exam Angle.
Use bullet points for individual occurrences and quotes.
Cover ALL major themes. Output raw Markdown text only. No JSON.""",

        'literary_devices': f"""Create a LITERARY DEVICE LIBRARY for "{display_name}" by {author or 'various'} (Class {cls}, ICSE English).

For EACH important literary device used in the text, provide:
- Definition of the device
- Specific example from this text
- How to identify it in an exam
- How to write about it in an exam answer

Write as a Markdown document. Use ## Device Name as heading for each device,
then ### subheadings for Definition, Example from Text, How It Works, How to Identify, How to Write About.
Quote specific passages and explain where they occur.
Cover ALL important devices used in the text. Output raw Markdown text only. No JSON.""",

        'model_answers': (
            f"""Create MODEL ANSWERS for "{display_name}" by {author or 'various'} (Class {cls}, ICSE English).

Create 3 exam-style questions about this text, then for each provide:
- A WEAK answer (with score and explanation of why it's weak)
- A STRONG answer (with score and explanation of why it's strong)

Write as a Markdown document. Use ## Question N as heading for each question,
then ### subheadings for Weak Answer (with score and why), Strong Answer (with score and why).
Weak answers should be 100-200 words, strong answers 200-400 words.
Create 3-5 questions covering different aspects (character, theme, scene, device).
Output raw Markdown text only. No JSON."""
            if literary else
            f"""Create MODEL ANSWERS for the topic "{display_name}" (Class {cls}, ICSE English Language).

This is a language/grammar/concept topic. Create 3 exam-style questions, then for each provide:
- A WEAK answer (with score and explanation of why it's weak)
- A STRONG answer (with score and explanation of why it's strong)

Write as a Markdown document. Use ## Question N as heading for each question,
then ### subheadings for Weak Answer (with score and why), Strong Answer (with score and why).
Weak answers should be 80-150 words, strong answers 150-300 words.
Cover different question types (definition, application, error correction, analysis).
Output raw Markdown text only. No JSON."""
        ),

        'revision_sheets': (
            f"""Create a REVISION SHEET for "{display_name}" by {author or 'various'} (Class {cls}, ICSE English).

Condense everything a student needs to know for the exam into one revision sheet:
- Plot summary (brief)
- Character summaries (1-2 lines each)
- Key themes (1-2 lines each)
- Top 10 quotes (with brief context)
- Key literary devices
- Common exam questions
- Quick revision tips

Write as a clean Markdown document with ## headings for each section and bullet points.
Keep it condensed and exam-focused. Output raw Markdown text only. No JSON."""
            if literary else
            f"""Create a REVISION SHEET for the topic "{display_name}" (Class {cls}, ICSE English Language).

This is a language/grammar/concept topic, NOT a literary text. Condense everything a student needs to know:
- Key definitions and rules
- Important examples for each rule
- Common patterns and structures
- Step-by-step procedures (how to apply the concept)
- Common exam question types for this topic
- Quick revision tips and common mistakes to avoid

Write as a clean Markdown document with ## headings for each section and bullet points.
Keep it condensed and exam-focused. Output raw Markdown text only. No JSON."""
        ),

        'glossary': (
            f"""Create a GLOSSARY for "{display_name}" by {author or 'various'} (Class {cls}, ICSE English).

Include:
- Literary terms used in the text (with definitions)
- Difficult vocabulary from the text (with definitions)
- Cultural/historical references (with explanations)

Write as a Markdown table with columns: Term | Definition | Context in Text.
Or use ## Term as heading with definition and context as bullet points.
List 10-25 terms. Output raw Markdown text only. No JSON."""
            if literary else
            f"""Create a GLOSSARY for the topic "{display_name}" (Class {cls}, ICSE English Language).

This is a language/grammar/concept topic. Include:
- Key terminology for this topic (with clear definitions)
- Related grammatical terms students need to know
- Examples for each term
- How each term is used in exam questions

Write as a Markdown table with columns: Term | Definition | Example.
List 10-25 terms. Output raw Markdown text only. No JSON."""
        ),

        'worked_examples': (
            f"""Create WORKED EXAMPLES for "{display_name}" by {author or 'various'} (Class {cls}, ICSE English).

Create 2-3 exam questions and provide a step-by-step deconstruction of how to build a strong answer:

For each:
1. The question
2. Step 1: Analyze the question (what is it asking?)
3. Step 2: Plan the answer (what points to make, what quotes to use)
4. Step 3: Write the answer (full model answer)
5. Step 4: Review against rubric (what makes this answer strong?)

Write as a Markdown document. Use ## Worked Example N as heading,
then ### Step 1: Analyze, ### Step 2: Plan, ### Step 3: Answer, ### Step 4: Review.
Model answers should be 200-400 words. Output raw Markdown text only. No JSON."""
            if literary else
            f"""Create WORKED EXAMPLES for the topic "{display_name}" (Class {cls}, ICSE English Language).

This is a language/grammar/concept topic. Create 2-3 exam-style questions and provide a step-by-step deconstruction:

For each:
1. The question
2. Step 1: Analyze the question (what is it asking?)
3. Step 2: Plan the answer (what rules/concepts to apply)
4. Step 3: Write the answer (full model answer showing the skill in action)
5. Step 4: Review (what makes this answer strong? what common errors to avoid?)

Write as a Markdown document. Use ## Worked Example N as heading,
then ### Step 1: Analyze, ### Step 2: Plan, ### Step 3: Answer, ### Step 4: Review.
Model answers should be 150-300 words. Output raw Markdown text only. No JSON."""
        ),

        'question_bank': (
            f"""Create a QUESTION BANK for "{display_name}" by {author or 'various'} (Class {cls}, ICSE English).

Create 10-15 exam-style questions covering:
- Character questions
- Theme questions
- Scene/section analysis questions
- Literary device questions
- General/evaluative questions

For each question, provide a model answer (50-150 words).

Write as a Markdown document. Use ## Question N as heading,
then **Marks:** X, **Level:** recall/reasoning/evaluation/application/creation,
then the model answer as a paragraph. Output raw Markdown text only. No JSON."""
            if literary else
            f"""Create a QUESTION BANK for the topic "{display_name}" (Class {cls}, ICSE English Language).

This is a language/grammar/concept topic. Create 10-15 exam-style questions covering:
- Definition/recall questions
- Application questions (apply the rule to a sentence)
- Analysis questions (identify the concept in a given text)
- Error correction questions
- Comparison questions (e.g., compare synonyms vs antonyms)

For each question, provide a model answer (50-150 words).

Write as a Markdown document. Use ## Question N as heading,
then **Marks:** X, **Level:** recall/reasoning/evaluation/application/creation,
then the model answer as a paragraph. Output raw Markdown text only. No JSON."""
        ),

        'drill_banks': (
            f"""Create a DRILL BANK for "{display_name}" by {author or 'various'} (Class {cls}, ICSE English).

Create quick-fire recall drills:
- 10 quote identification drills (quote -> who said it / what context)
- 10 character identification drills (description -> which character)
- 10 theme matching drills (quote -> which theme)
- 10 vocabulary drills (word from text -> definition)

Write as a Markdown document. Use ## Drill Type as heading for each category,
then each drill as a bullet: **Q:** question **A:** answer.
Create 20-30 drills total. Output raw Markdown text only. No JSON."""
            if literary else
            f"""Create a DRILL BANK for the topic "{display_name}" (Class {cls}, ICSE English Language).

This is a language/grammar/concept topic. Create quick-fire recall drills:
- 10 definition drills (term -> definition)
- 10 example identification drills (example -> which concept it illustrates)
- 10 application drills (given sentence -> apply the rule)
- 10 error-spotting drills (find the mistake in the sentence)

Write as a Markdown document. Use ## Drill Type as heading for each category,
then each drill as a bullet: **Q:** question **A:** answer.
Create 20-30 drills total. Output raw Markdown text only. No JSON."""
        ),

        'passage_library': f"""Create a PASSAGE LIBRARY for Class {cls} ICSE English.

Create 5 unseen comprehension passages appropriate for Class {cls} students:
- 2 narrative passages
- 1 expository passage
- 1 argumentative passage
- 1 descriptive passage

Each passage should be 300-600 words with:
- 5 comprehension questions (factual, inferential, vocabulary)
- 1 summary question
- Model answers

Write as a Markdown document. Use ## Passage N: Title as heading,
then **Type:** narrative/expository/etc, then the full passage as a blockquote or indented text,
then ### Questions with each Q and model answer. Output raw Markdown text only. No JSON.""",

        'writing_rubrics': f"""Create WRITING RUBRICS for Class {cls} ICSE English.

Create marking rubrics for each composition type tested at this level:
- Narrative composition
- Descriptive composition
- Reflective composition
- Argumentative/Persuasive composition
- Expository composition
- Directed writing (if applicable)

For each rubric:
- Total marks
- 3-4 criteria with performance levels (0-5 scale)
- Examiner notes

Write as a Markdown document. Use ## Composition Type as heading for each rubric,
then **Total Marks:** X, then a Markdown table with criteria as rows and levels as columns,
then ### Examiner Notes. Output raw Markdown text only. No JSON.""",

        'examiner_reports': f"""Create an EXAMINER REPORT DIGEST for Class {cls} ICSE English.

Based on typical ICSE examiner reports for this level, create a structured digest:

PRAISED: (what strong candidates do)
CRITICIZED: (what weak candidates do)
COMMON_ERRORS: (frequency-ranked list of common mistakes)
MARK_SCHEME_INSIGHTS: (how marks are actually awarded)
REMEDIES: (specific advice for improving)

Write as a clean Markdown document with ## headings for each section and bullet points.
Output raw Markdown text only. No JSON.""",
    }

    return prompts.get(file_type, '')


# ─── API call (async — key 0 only, no fallback) ───
async def call_claude(session, prompt, system_prompt, key_idx=0, retries=8):
    body = {
        "model": MODEL,
        "max_tokens": MAX_TOKENS,
        "temperature": 0,
        "messages": [{"role": "user", "content": prompt}],
        "system": system_prompt,
    }
    for attempt in range(retries):
        # Always use key 0 — no alternating
        key = API_KEYS[0]
        headers = {
            "x-api-key": key,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01",
        }
        try:
            async with session.post(API_URL, json=body, headers=headers, ssl=CTX,
                                     timeout=aiohttp.ClientTimeout(total=900)) as resp:
                data = await resp.json()
                if resp.status == 200:
                    text = ""
                    for block in data.get("content", []):
                        if block["type"] == "text":
                            text = block["text"]
                            break
                    if text.strip():
                        text_lower = text.lower()
                        if "rate limit" in text_lower or "token limit" in text_lower or "usage will reset" in text_lower:
                            # Parse "reset in X minutes" from response
                            reset_match = re.search(r'reset in (\d+) minutes?', text_lower)
                            wait = int(reset_match.group(1)) * 60 + 30 if reset_match else 300
                            print(f"      token limit on key 0, waiting {wait}s (reset in {reset_match.group(1) if reset_match else '?'} min)")
                            await asyncio.sleep(wait)
                            continue
                        return text
                    print(f"      empty, retry {attempt+1}")
                    await asyncio.sleep(30 * (attempt + 1))
                elif resp.status == 429:
                    print(f"      429 on key 0, waiting 300s")
                    await asyncio.sleep(300)
                else:
                    print(f"      error {resp.status}: {str(data)[:200]}")
                    await asyncio.sleep(15 * (attempt + 1))
        except Exception as e:
            print(f"      retry {attempt+1}: {str(e)[:150]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


# ─── Task processing ───
async def process_task(session, task, key_idx):
    sem = semaphore_key0 if key_idx == 0 else semaphore_key1
    async with sem:
        file_type = task['file_type']
        text_info = task['text_info']
        cls = task['class']
        output_id = task['output_id']
        is_cbse = task.get('subject') == 'cbse'

        # Determine output directory
        out_dir = CBSE_OUTPUT_DIR if is_cbse else OUTPUT_DIR

        # GUARD: never overwrite existing files
        out_file = out_dir / f"{output_id}.md"
        if out_file.exists() and out_file.stat().st_size >= 100:
            print(f"  [{output_id}] SKIP — already exists ({out_file.stat().st_size} bytes)")
            return True

        system_prompt = build_system_prompt(file_type, cls)
        prompt = build_prompt(file_type, text_info, cls)

        print(f"  [{output_id}] Calling Claude (key={key_idx})...")

        start = time.time()
        response = await call_claude(session, prompt, system_prompt, key_idx=key_idx)
        elapsed = time.time() - start

        if not response:
            print(f"  [{output_id}] FAILED — no response")
            return False

        # GUARD: don't write error messages as responses
        if "Token limit" in response[:200] or "rate limit" in response[:200] or "usage will reset" in response[:200]:
            print(f"  [{output_id}] FAILED — API limit error")
            return False

        out_file.write_text(response, encoding="utf-8")
        size_kb = out_file.stat().st_size / 1024
        print(f"  [{output_id}] DONE in {elapsed:.1f}s — {size_kb:.1f}KB")
        return True


# ─── Build tasks ───
LITERATURE_ONLY_TYPES = {'quote_bank', 'character_maps', 'theme_trackers', 'literary_devices'}

def build_tasks(texts, file_types, class_filter=None):
    tasks = []
    classes = sorted(set(t['class'] for t in texts))

    for ft in file_types:
        ft_info = FILE_TYPES.get(ft)
        if not ft_info:
            continue

        if ft_info['per'] == 'text':
            for text in texts:
                if class_filter and text['class'] != class_filter:
                    continue
                # Skip literature-only types for non-literary texts
                if ft in LITERATURE_ONLY_TYPES and not is_literary_text(text):
                    continue
                tasks.append({
                    'file_type': ft,
                    'text_info': text,
                    'class': text['class'],
                    'output_id': f"{text['parent_node']}_{ft}",
                })
        elif ft_info['per'] == 'class':
            for cls in classes:
                if class_filter and cls != class_filter:
                    continue
                tasks.append({
                    'file_type': ft,
                    'text_info': {'text_name': '', 'author': '', 'parent_node': ''},
                    'class': cls,
                    'output_id': f"c{cls}_eng_{ft}",
                })

    return tasks


# ─── Load CBSE texts for C6-12 supporting files ───
def load_cbse_texts_c6_12():
    """Load CBSE English Literature texts for C6-12 from by_subject nodes.
    Groups nodes by (class, chapter) to identify distinct texts/chapters."""
    texts = []
    seen_keys = set()

    eng_file = CBSE_NODES_DIR / "English_Literature.json"
    if not eng_file.exists():
        return texts

    try:
        data = json.loads(eng_file.read_text(encoding="utf-8"))
    except Exception:
        return texts

    # Group by (class, chapter) — each chapter is a "text"
    by_chapter = defaultdict(list)
    for node in data:
        cls = int(node.get("class_level", 0))
        if cls < 6 or cls > 12:
            continue
        chapter = node.get("chapter", node.get("chapter_name", ""))
        if not chapter:
            continue
        by_chapter[(cls, chapter)].append(node)

    for (cls, chapter), chapter_nodes in sorted(by_chapter.items()):
        # Use first node as representative
        first = chapter_nodes[0]
        node_id = first.get("node_id", f"c{cls}_eng_cbse")
        # Create a parent_node ID from the chapter
        parent_node = f"c{cls}_eng_{chapter[:30].replace(' ', '_').replace('/', '_')}"

        dedup_key = (cls, chapter.lower().strip())
        if dedup_key in seen_keys:
            continue
        seen_keys.add(dedup_key)

        # Detect text_type from chapter name
        ch_lower = chapter.lower()
        if any(kw in ch_lower for kw in ['poem', 'poetry', 'ode', 'sonnet', 'ballad', 'elegy']):
            text_type = 'poem'
        elif any(kw in ch_lower for kw in ['play', 'drama', 'act i', 'act ii', 'act iii', 'act iv', 'act v',
                                            'scene', 'julius caesar', 'macbeth', 'the merchant']):
            text_type = 'play'
        elif any(kw in ch_lower for kw in ['grammar', 'vocabulary', 'writing skills', 'comprehension',
                                            'speaking skills', 'listening skills', 'reading',
                                            'synonyms', 'antonyms', 'tense', 'clauses',
                                            'composition', 'letter', 'essay', 'notice',
                                            'report writing', 'precis', 'summary']):
            text_type = ''  # non-literary
        else:
            text_type = 'prose'  # default to prose for stories

        text_entry = {
            'parent_node': parent_node,
            'parent_title': chapter,
            'text_name': chapter,
            'author': '',  # CBSE nodes don't have author field
            'class': cls,
            'subject': 'cbse_eng',
            'subject_code': 'eng',
            'text_type': text_type,
            'source_file': str(eng_file),
            'node_count': len(chapter_nodes),
        }
        texts.append(text_entry)

    return texts


def build_cbse_tasks(texts, file_types, class_filter=None):
    """Build supporting file tasks for CBSE C6-12 texts."""
    tasks = []
    classes = sorted(set(t['class'] for t in texts))

    for ft in file_types:
        ft_info = FILE_TYPES.get(ft)
        if not ft_info:
            continue

        if ft_info['per'] == 'text':
            for text in texts:
                if class_filter and text['class'] != class_filter:
                    continue
                # Skip literature-only types for non-literary texts
                if ft in LITERATURE_ONLY_TYPES and not is_literary_text(text):
                    continue
                tasks.append({
                    'file_type': ft,
                    'text_info': text,
                    'class': text['class'],
                    'subject': 'cbse',
                    'output_id': f"cbse_{text['parent_node']}_{ft}",
                })
        elif ft_info['per'] == 'class':
            for cls in classes:
                if class_filter and cls != class_filter:
                    continue
                tasks.append({
                    'file_type': ft,
                    'text_info': {'text_name': '', 'author': '', 'parent_node': ''},
                    'class': cls,
                    'subject': 'cbse',
                    'output_id': f"cbse_c{cls}_eng_{ft}",
                })

    return tasks


# ─── Main ───
async def main():
    parser = argparse.ArgumentParser(description='Generate English C1-8 supporting files using Claude Opus')
    parser.add_argument('--file-types', type=str, default='all',
                        help='Comma-separated file types, or "all" (default: all)')
    parser.add_argument('--class-num', type=int, help='Only generate for this class (1-8)')
    parser.add_argument('--dry-run', action='store_true', help='Show tasks without executing')
    args = parser.parse_args()

    # Parse file types
    if args.file_types == 'all':
        file_types = list(FILE_TYPES.keys())
    else:
        file_types = [ft.strip() for ft in args.file_types.split(',')]

    # Load CISCE texts
    print("\nLoading CISCE texts from organized/english/class{1-8}...")
    texts = load_texts_for_c1_8()
    print(f"  Found {len(texts)} CISCE texts across C1-8")
    for t in texts:
        print(f"    C{t['class']}: {t['text_name'][:60]} ({t['parent_node']})")

    # Build CISCE tasks
    cisce_tasks = build_tasks(texts, file_types, args.class_num)

    # Load CBSE texts for C6-12
    print("\nLoading CBSE English Literature texts for C6-12...")
    cbse_texts = load_cbse_texts_c6_12()
    print(f"  Found {len(cbse_texts)} CBSE texts across C6-12")
    for t in cbse_texts[:20]:
        print(f"    C{t['class']}: {t['text_name'][:60]} ({t['node_count']} nodes)")
    if len(cbse_texts) > 20:
        print(f"    ... and {len(cbse_texts) - 20} more")

    # Build CBSE tasks
    cbse_tasks = build_cbse_tasks(cbse_texts, file_types, args.class_num)

    # Merge all tasks
    all_tasks = cisce_tasks + cbse_tasks

    # Filter out existing — CISCE goes to OUTPUT_DIR, CBSE goes to CBSE_OUTPUT_DIR
    new_tasks = []
    for task in all_tasks:
        is_cbse = task.get('subject') == 'cbse'
        out_dir = CBSE_OUTPUT_DIR if is_cbse else OUTPUT_DIR
        out_file = out_dir / f"{task['output_id']}.md"
        if not out_file.exists() or out_file.stat().st_size < 100:
            new_tasks.append(task)
    tasks = new_tasks

    print(f"\n{'='*70}")
    print(f"Claude Supporting Files Generator (CISCE English C1-8 + CBSE C6-12)")
    print(f"{'='*70}")
    print(f"Model: {MODEL}")
    print(f"Key 0 only: {CONCURRENCY_KEY0} workers")
    print(f"File types: {', '.join(file_types)}")
    print(f"CISCE tasks: {len([t for t in tasks if t.get('subject') != 'cbse'])}")
    print(f"CBSE tasks: {len([t for t in tasks if t.get('subject') == 'cbse'])}")
    print(f"Total tasks: {len(tasks)}")
    print(f"CISCE output: {OUTPUT_DIR}")
    print(f"CBSE output: {CBSE_OUTPUT_DIR}")
    print(f"{'='*70}\n")

    if args.dry_run:
        for task in tasks:
            ft = task['file_type']
            ti = task['text_info']
            tn = ti.get('text_name', '') or 'CLASS-LEVEL'
            print(f"  {task['output_id']} [{ft}] Class {task['class']} — {tn[:50]}")
        return

    if not tasks:
        print("Nothing to generate — all files already exist.")
        return

    # All tasks use key 0 only (5 workers)
    print(f"  All {len(tasks)} tasks on key 0 (5 workers)")
    print(f"  2s gap between launches...\n")

    # Launch with 2-second gap
    results = []
    pending = set()
    total_concurrency = CONCURRENCY_KEY0

    async with aiohttp.ClientSession() as session:
        for idx, task in enumerate(tasks):
            while len(pending) >= total_concurrency:
                done, pending = await asyncio.wait(pending, return_when=asyncio.FIRST_COMPLETED)
                for d in done:
                    results.append(d.result())

            task_coro = process_task(session, task, 0)
            pending.add(asyncio.create_task(task_coro))
            await asyncio.sleep(2)

        if pending:
            done, _ = await asyncio.wait(pending)
            for d in done:
                results.append(d.result())

    success = sum(1 for r in results if r)
    failed = sum(1 for r in results if not r)

    print(f"\n{'='*70}")
    print(f"COMPLETE: {success} files generated, {failed} failed")
    print(f"Output: {OUTPUT_DIR}")
    print(f"{'='*70}")


if __name__ == "__main__":
    asyncio.run(main())
