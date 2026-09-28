import os
"""
Generate supporting English files (quote banks, character maps, theme trackers, etc.)
for CISCE English, Modern English, and Elective English.

Uses Claude Opus 5 via claudeopus.pro gateway.
Outputs to D:\platform\parsed_output\english_supporting_files/

Usage:
    python claude_english_supporting.py --subject eng          # CISCE English 9-12
    python claude_english_supporting.py --subject engmod        # Modern English
    python claude_english_supporting.py --subject engelec       # Elective English
    python claude_english_supporting.py --subject eng --file-types quote_bank,character_maps
    python claude_english_supporting.py --dry-run
"""

import json
import sys
import time
import urllib.request
import ssl
import argparse
import threading
import re
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

sys.stdout.reconfigure(line_buffering=True)

# ─── API Config ───────────────────────────────────────────────
API_KEY = os.environ.get('ANTHROPIC_API_KEY') or ''
API_URL = 'https://api.claudeopus.pro/v1/messages'
MODEL = 'claude-opus-5'
MAX_TOKENS = 128000
MAX_RETRIES = 3

OUTPUT_DIR = Path(r'D:\platform\parsed_output\english_supporting_files')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

GRANULAR_DIR = Path(r'D:\platform\parsed_output\english_granular_nodes')

PRINT_LOCK = threading.Lock()
RATE_LOCK = threading.Lock()
LAST_REQUEST_TIME = [0.0]
MIN_REQUEST_INTERVAL = 0.4  # 0.4s = max 2.5 req/s = 150 req/min (under 200 limit)

def safe_print(msg):
    with PRINT_LOCK:
        print(msg)

def rate_limit():
    """Ensure we don't exceed API rate limits."""
    with RATE_LOCK:
        now = time.time()
        elapsed = now - LAST_REQUEST_TIME[0]
        if elapsed < MIN_REQUEST_INTERVAL:
            time.sleep(MIN_REQUEST_INTERVAL - elapsed)
        LAST_REQUEST_TIME[0] = time.time()


def call_claude(prompt, system_prompt=None):
    messages = [{'role': 'user', 'content': prompt}]
    body = {
        'model': MODEL,
        'max_tokens': MAX_TOKENS,
        'messages': messages,
    }
    if system_prompt:
        body['system'] = system_prompt

    body_json = json.dumps(body).encode('utf-8')

    rate_limit()  # Throttle to stay under 200 req/min

    req = urllib.request.Request(API_URL, data=body_json, method='POST')
    req.add_header('x-api-key', API_KEY)
    req.add_header('Content-Type', 'application/json')
    req.add_header('anthropic-version', '2023-06-01')

    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=600, context=ctx) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        content_blocks = data.get('content', [])
        text = ''
        for block in content_blocks:
            if block.get('type') == 'text':
                text = block.get('text', '')
                break
        if not text:
            text = content_blocks[0].get('text', '') if content_blocks else ''
        if not text:
            raise Exception(f'No text in response. Blocks: {[b.get("type") for b in content_blocks]}')
        # Check for rate limit message in response
        if 'Rate limit' in text or 'rate limit' in text.lower():
            raise Exception(f'Rate limit in response: {text[:100]}')
        return text


def call_with_retry(prompt, system_prompt, label):
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            return call_claude(prompt, system_prompt)
        except Exception as e:
            err_msg = str(e)
            # Rate limit — wait longer
            if 'Rate limit' in err_msg or '429' in err_msg:
                wait = 30 + (attempt * 15)
                safe_print(f'    [{label}] Rate limited, waiting {wait}s (attempt {attempt}/{MAX_RETRIES})')
                time.sleep(wait)
                continue
            if attempt < MAX_RETRIES:
                delay = 10 * attempt
                safe_print(f'    [{label}] Retry {attempt}/{MAX_RETRIES} in {delay}s — {e}')
                time.sleep(delay)
                continue
            raise


# ─── File type definitions ────────────────────────────────────

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


# ─── Prompt builders ──────────────────────────────────────────

def build_prompt(file_type, text_info, cls, subject):
    """Build prompt for a supporting file."""
    text_name = text_info.get('text_name', '')
    author = text_info.get('author', '')
    parent_node = text_info.get('parent_node', '')
    parent_title = text_info.get('parent_title', '')

    # For poetry collections where text_name is "Fireflies - Poet", use parent_title
    # which has the actual poem names (e.g. "Wilfred Owen - Arms and the Boy, The Last Laugh...")
    if parent_title and text_name and 'Fireflies' in text_name:
        text_name = parent_title

    subject_name = {
        'eng': 'English Literature',
        'engmod': 'Modern English',
        'engelec': 'Elective English',
    }.get(subject, 'English')

    prompts = {
        'quote_bank': f"""Create a comprehensive QUOTE BANK for "{text_name}" by {author} (Class {cls}, {subject_name}).

For EACH important quote in the text, provide:
- The exact quote
- Who said it (speaker)
- Context (when/where in the text)
- Literal meaning
- What it reveals about character/theme
- Themes it connects to
- Exam questions it can answer

Include 15-25 quotes covering all major characters, themes, and turning points.
Prioritize quotes that are most useful for ISC/ICSE exam answers.

Use this delimited format:

<<<QUOTE>>>
QUOTE: (the exact quote)
SPEAKER: (who said it)
CONTEXT: (when/where)
LITERAL_MEANING: (what it means literally)
REVEALS: (what it reveals about character/theme)
THEMES: (comma-separated themes)
EXAM_USE: (which exam questions this quote answers)
<<<END>>>

Write ALL quotes in this format. No JSON.""",

        'character_maps': f"""Create a comprehensive CHARACTER MAP for "{text_name}" by {author} (Class {cls}, {subject_name}).

For EACH major character, provide:
- Role in the text
- Key relationships (with other characters)
- Character arc (how they change)
- Key quotes
- Tragic flaw / fatal error (if applicable)
- Exam angle (how to write about this character)

Use this delimited format:

<<<CHARACTER>>>
NAME: (character name)
ROLE: (their role in the text)
RELATIONSHIPS:
- (character): (relationship description)
- (character): (relationship description)
ARC:
(Describe how the character changes across the text, section by section)
KEY_QUOTES:
- "(quote 1)" — (significance)
- "(quote 2)" — (significance)
TRAGIC_FLAW: (their fatal flaw, or "none" if not applicable)
EXAM_ANGLE: (how to write about this character in an exam)
<<<END>>>

Cover ALL major characters. No JSON.""",

        'theme_trackers': f"""Create a comprehensive THEME TRACKER for "{text_name}" by {author} (Class {cls}, {subject_name}).

For EACH major theme, provide:
- Where it appears (section/act/scene references)
- How it develops across the text
- Key quotes that embody it
- Cross-text connections (if applicable)

Use this delimited format:

<<<THEME>>>
THEME: (theme name)
WHERE_IT_APPEARS:
- (section): (how it appears here)
- (section): (how it appears here)
HOW_IT_DEVELOPS:
(Describe how the theme evolves across the text)
KEY_QUOTES:
- "(quote 1)" — (how it embodies the theme)
- "(quote 2)" — (how it embodies the theme)
CROSS_TEXT: (connections to other texts or universal significance)
EXAM_ANGLE: (how to write about this theme in an exam)
<<<END>>>

Cover ALL major themes. No JSON.""",

        'literary_devices': f"""Create a LITERARY DEVICE LIBRARY for "{text_name}" by {author} (Class {cls}, {subject_name}).

For EACH important literary device used in the text, provide:
- Definition of the device
- Specific example from this text
- How to identify it in an exam
- How to write about it in an exam answer

Use this delimited format:

<<<DEVICE>>>
DEVICE: (device name)
DEFINITION: (clear definition)
EXAMPLE_FROM_TEXT:
(Quote the specific passage and explain where it occurs)
HOW_IT_WORKS: (how the device functions in this specific context)
HOW_TO_IDENTIFY: (how a student can spot this device)
HOW_TO_WRITE_ABOUT: (model sentence for writing about this device in an exam)
<<<END>>>

Cover ALL important devices used in the text. No JSON.""",

        'model_answers': f"""Create MODEL ANSWERS for "{text_name}" by {author} (Class {cls}, {subject_name}).

Create 3 exam-style questions about this text, then for each provide:
- A WEAK answer (with score and explanation of why it's weak)
- A STRONG answer (with score and explanation of why it's strong)

Use this delimited format:

<<<QUESTION>>>
QUESTION: (the exam question)
MARKS: (total marks)

WEAK_ANSWER:
(Write a weak student response — 100-200 words)
WEAK_SCORE: (X/Y marks)
WEAK_WHY: (why it's weak — specific issues)

STRONG_ANSWER:
(Write a strong student response — 200-400 words)
STRONG_SCORE: (X/Y marks)
STRONG_WHY: (why it's strong — specific qualities)
<<<END>>>

Create 3-5 questions covering different aspects (character, theme, scene, device). No JSON.""",

        'revision_sheets': f"""Create a REVISION SHEET for "{text_name}" by {author} (Class {cls}, {subject_name}).

Condense everything a student needs to know for the exam into one revision sheet:
- Plot summary (brief)
- Character summaries (1-2 lines each)
- Key themes (1-2 lines each)
- Top 10 quotes (with brief context)
- Key literary devices
- Common exam questions
- Quick revision tips

Write in clear, condensed prose. Use headings and bullet points.
No JSON, no delimited format — just a well-structured revision sheet.""",

        'glossary': f"""Create a GLOSSARY for "{text_name}" by {author} (Class {cls}, {subject_name}).

Include:
- Literary terms used in the text (with definitions)
- Difficult vocabulary from the text (with definitions)
- Cultural/historical references (with explanations)

Use this format:
TERM: (the term) || DEFINITION: (clear definition) || CONTEXT: (how it appears in this text)

List 15-30 terms. No JSON.""",

        'worked_examples': f"""Create WORKED EXAMPLES for "{text_name}" by {author} (Class {cls}, {subject_name}).

Create 2-3 exam questions and provide a step-by-step deconstruction of how to build a strong answer:

For each:
1. The question
2. Step 1: Analyze the question (what is it asking?)
3. Step 2: Plan the answer (what points to make, what quotes to use)
4. Step 3: Write the answer (full model answer)
5. Step 4: Review against rubric (what makes this answer strong?)

Use this delimited format:

<<<WORKED_EXAMPLE>>>
QUESTION: (the exam question)
STEP1_ANALYZE: (what the question is really asking)
STEP2_PLAN: (what points and quotes to use)
STEP3_ANSWER: (the full model answer — 200-400 words)
STEP4_REVIEW: (why this answer would score well)
<<<END>>>

No JSON.""",

        'question_bank': f"""Create a QUESTION BANK for "{text_name}" by {author} (Class {cls}, {subject_name}).

Create 15-20 exam-style questions covering:
- Character questions
- Theme questions
- Scene/section analysis questions
- Literary device questions
- General/evaluative questions

For each question, provide a model answer (50-150 words).

Use this delimited format:

<<<QUESTION>>>
Q: (the question)
MARKS: (marks)
A: (model answer)
LEVEL: (recall|reasoning|evaluation|application|creation)
<<<END>>>

No JSON.""",

        'drill_banks': f"""Create a DRILL BANK for "{text_name}" by {author} (Class {cls}, {subject_name}).

Create quick-fire recall drills:
- 10 quote identification drills (quote → who said it / what context)
- 10 character identification drills (description → which character)
- 10 theme matching drills (quote → which theme)
- 10 vocabulary drills (word from text → definition)

Use this delimited format:

<<<DRILL>>>
TYPE: (quote_id|character_id|theme_match|vocabulary)
Q: (the drill question)
A: (the answer)
<<<END>>>

Create 30-40 drills total. No JSON.""",

        'passage_library': f"""Create a PASSAGE LIBRARY for Class {cls} {subject_name}.

Create 5 unseen comprehension passages appropriate for Class {cls} students:
- 2 narrative passages
- 1 expository passage
- 1 argumentative passage
- 1 descriptive passage

Each passage should be 400-700 words with:
- 5 comprehension questions (factual, inferential, vocabulary)
- 1 summary question
- Model answers

Use this delimited format:

<<<PASSAGE>>>
TITLE: (passage title)
TYPE: (narrative|expository|argumentative|descriptive)
PASSAGE:
(The full passage — 400-700 words)

QUESTIONS:
Q: (question) || A: (model answer) || MARKS: (marks)
Q: (question) || A: (model answer) || MARKS: (marks)
(add 5-6 questions)
<<<END>>>

No JSON.""",

        'writing_rubrics': f"""Create WRITING RUBRICS for Class {cls} {subject_name}.

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

Use this delimited format:

<<<RUBRIC>>>
COMPOSITION_TYPE: (type name)
TOTAL_MARKS: (marks)
CRITERION: (name) || MAX: (marks) || LEVEL_5: (description) || LEVEL_3: (description) || LEVEL_1: (description) || LEVEL_0: (description)
CRITERION: (name) || MAX: (marks) || LEVEL_5: (...) || LEVEL_3: (...) || LEVEL_1: (...) || LEVEL_0: (...)
EXAMINER_NOTE: (common issues from examiner reports)
<<<END>>>

Create rubrics for ALL composition types at this level. No JSON.""",

        'examiner_reports': f"""Create an EXAMINER REPORT DIGEST for Class {cls} {subject_name}.

Based on typical CISCE examiner reports for this level, create a structured digest:

PRAISED: (what strong candidates do)
CRITICIZED: (what weak candidates do)
COMMON_ERRORS: (frequency-ranked list of common mistakes)
MARK_SCHEME_INSIGHTS: (how marks are actually awarded)
REMEDIES: (specific advice for improving)

Write in clear prose with headings. No JSON, no delimited format.""",
    }

    return prompts.get(file_type, '')


def build_system_prompt(file_type, cls, subject):
    subject_name = {
        'eng': 'English Literature',
        'engmod': 'Modern English',
        'engelec': 'Elective English',
    }.get(subject, 'English')

    return f"""You are a master English teacher and CISCE/ISC curriculum expert specializing in {subject_name}.
You are creating {FILE_TYPES[file_type]['description']} for Class {cls} students preparing for ISC/ICSE exams.

Rules:
- Base ALL content on your expert knowledge of the actual texts. Do NOT fabricate quotes.
- If unsure about a specific quote, paraphrase rather than invent.
- Content must be directly useful for ISC/ICSE exam preparation.
- Be specific and detailed — no vague generalities.
- Use the delimited text format specified in the prompt. Do NOT use JSON."""


# ─── Task building ────────────────────────────────────────────

def get_texts_for_subject(subject, class_filter=None):
    """Get all texts (parent nodes) for a subject from granular node files."""
    texts = []
    
    # Map subject codes to file patterns
    if subject == 'eng':
        pattern = 'c*_eng_*_subnodes.json'
    elif subject == 'engmod':
        pattern = 'c*_engmod*_subnodes.json'
    elif subject == 'engelec':
        pattern = 'c*_engelec*_subnodes.json'
    else:
        return texts
    seen_non_play = {}  # (text_name, author) -> text dict, for dedup of poems/prose

    for f in sorted(GRANULAR_DIR.glob(pattern)):
        try:
            data = json.loads(f.read_text(encoding='utf-8'))
            cls = data.get('class', 0)
            if class_filter and cls != class_filter:
                continue
            if cls < 9:
                continue

            parent_node = data.get('parent_node', '')
            parent_title = data.get('parent_title', '')
            text_name = data.get('text_name', parent_title)
            author = data.get('author', '')
            subject_code = data.get('subject_code', subject)
            text_type = data.get('text_type', 'prose')

            text_entry = {
                'parent_node': parent_node,
                'parent_title': parent_title,
                'text_name': text_name,
                'author': author,
                'class': cls,
                'subject': subject,
                'subject_code': subject_code,
                'text_type': text_type,
            }

            if text_type == 'play':
                # Plays: keep per-node (per-act) — detailed
                texts.append(text_entry)
            else:
                # Poems/prose/novels: deduplicate by (text_name, author)
                key = (text_name.lower().strip(), author.lower().strip())
                if key not in seen_non_play:
                    seen_non_play[key] = text_entry
                    texts.append(text_entry)
        except:
            continue

    return texts


def build_tasks(subject, file_types, class_filter=None):
    """Build all tasks for a subject and set of file types."""
    tasks = []
    texts = get_texts_for_subject(subject, class_filter)
    
    # Get unique classes
    classes = sorted(set(t['class'] for t in texts), reverse=True)
    
    for ft in file_types:
        ft_info = FILE_TYPES.get(ft)
        if not ft_info:
            continue
        
        if ft_info['per'] == 'text':
            # One task per text
            for text in texts:
                tasks.append({
                    'file_type': ft,
                    'text_info': text,
                    'class': text['class'],
                    'subject': subject,
                    'output_id': f"{text['parent_node']}_{ft}",
                })
        elif ft_info['per'] == 'class':
            # One task per class
            for cls in classes:
                tasks.append({
                    'file_type': ft,
                    'text_info': {'text_name': '', 'author': '', 'parent_node': ''},
                    'class': cls,
                    'subject': subject,
                    'output_id': f"c{cls}_{subject}_{ft}",
                })
    
    return tasks


# ─── Output saving ────────────────────────────────────────────

def save_output(task, response):
    """Save the response to a file."""
    output_id = task['output_id']
    file_type = task['file_type']
    
    # Determine subject directory
    subject = task['subject']
    cls = task['class']
    
    subject_dir = OUTPUT_DIR / subject
    subject_dir.mkdir(parents=True, exist_ok=True)
    
    out_file = subject_dir / f"{output_id}.txt"
    out_file.write_text(response, encoding='utf-8')
    
    return out_file


# ─── Main ─────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='Generate supporting English files using Claude')
    parser.add_argument('--subject', type=str, required=True, choices=['eng', 'engmod', 'engelec'],
                        help='Subject: eng (CISCE English), engmod (Modern English), engelec (Elective English)')
    parser.add_argument('--file-types', type=str, default='all',
                        help='Comma-separated file types, or "all" (default: all)')
    parser.add_argument('--class', dest='class_num', type=int, help='Only generate for this class')
    parser.add_argument('--dry-run', action='store_true', help='Show tasks without executing')
    parser.add_argument('--workers', type=int, default=5, help='Parallel workers (default: 5)')
    parser.add_argument('--force', action='store_true', help='Overwrite existing')
    args = parser.parse_args()
    
    # Parse file types
    if args.file_types == 'all':
        file_types = list(FILE_TYPES.keys())
    else:
        file_types = [ft.strip() for ft in args.file_types.split(',')]
    
    # Build tasks
    tasks = build_tasks(args.subject, file_types, args.class_num)
    
    # Filter out existing
    if not args.force:
        new_tasks = []
        for task in tasks:
            subject_dir = OUTPUT_DIR / task['subject']
            out_file = subject_dir / f"{task['output_id']}.txt"
            if not out_file.exists():
                new_tasks.append(task)
        tasks = new_tasks
    
    subject_name = {
        'eng': 'CISCE English',
        'engmod': 'Modern English',
        'engelec': 'Elective English',
    }.get(args.subject, 'English')
    
    print(f'\n{"="*70}')
    print(f'Claude {subject_name} Supporting Files Generator — PARALLEL')
    print(f'{"="*70}')
    print(f'Model: {MODEL}')
    print(f'Workers: {args.workers}')
    print(f'File types: {", ".join(file_types)}')
    print(f'Tasks: {len(tasks)}')
    print(f'{"="*70}\n')
    
    if args.dry_run:
        for task in tasks:
            ft = task['file_type']
            ti = task['text_info']
            tn = ti.get('text_name', '') or 'CLASS-LEVEL'
            print(f'  {task["output_id"]} [{ft}] Class {task["class"]} — {tn[:50]}')
        return
    
    if not tasks:
        print('Nothing to generate — all files already exist. Use --force to regenerate.')
        return
    
    success = 0
    failed = 0
    completed = 0
    start_time = time.time()
    
    def process_task(task):
        file_type = task['file_type']
        text_info = task['text_info']
        cls = task['class']
        subject = task['subject']
        output_id = task['output_id']
        
        system_prompt = build_system_prompt(file_type, cls, subject)
        prompt = build_prompt(file_type, text_info, cls, subject)
        
        label = f'{output_id}_{file_type}'
        safe_print(f'  [{label}] Calling Claude ({MODEL})...')
        
        start = time.time()
        response = call_with_retry(prompt, system_prompt, label)
        elapsed = time.time() - start
        
        out_file = save_output(task, response)
        size_kb = out_file.stat().st_size / 1024
        
        safe_print(f'  [{label}] DONE in {elapsed:.1f}s — {size_kb:.1f}KB')
        
        return (output_id, True, None)
    
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {executor.submit(process_task, t): t for t in tasks}
        
        for future in as_completed(futures):
            output_id, ok, err = future.result()
            completed += 1
            elapsed = time.time() - start_time
            
            if err:
                safe_print(f'  [{completed}/{len(tasks)}] {output_id} FAILED — {err[:100]}')
                failed += 1
            else:
                safe_print(f'  [{completed}/{len(tasks)}] {output_id} DONE ({elapsed:.0f}s elapsed)')
                success += 1
    
    print(f'\n{"="*70}')
    print(f'COMPLETE: {success} files generated, {failed} failed')
    print(f'Output: {OUTPUT_DIR}')
    print(f'{"="*70}')


if __name__ == '__main__':
    main()
