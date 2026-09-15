"""
Gemini-powered content generator for ISC Class 11/12 elective subjects.
3 keys, 3 files in parallel per round, 60s break between rounds.
Model: gemini-3.6-flash

Generates: question_bank, drill_banks, revision_sheets, glossary, worked_examples, case_studies
for: home, legal, massmedia, pol, psy, soc (Class 11 and 12)

Usage:
    python gemini_content_gen.py                # generate everything missing
    python gemini_content_gen.py --dry-run      # show what would be generated
    python gemini_content_gen.py --force        # overwrite existing
    python gemini_content_gen.py --file-type question_bank  # only one type
    python gemini_content_gen.py --subject psy   # only psychology
"""

import json
import os
import sys
import time
import urllib.request
import urllib.error
import ssl
import argparse
import threading
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

# Force unbuffered output
sys.stdout.reconfigure(line_buffering=True)

# ─── 3 API keys ───────────────────────────────────────────────
KEYS = [
    os.environ.get('GEMINI_API_KEY', ''),
    os.environ.get('GEMINI_API_KEY', ''),
    os.environ.get('GEMINI_API_KEY', ''),
]

MODEL = 'gemini-3.5-flash'
MAX_TOKENS = 65536
MAX_RETRIES = 4
BREAK_MS = 60000  # 60 second break between rounds
CISCE_DIR = Path(r'D:\cisce')
ENRICHMENT_FILE = Path(r'D:\platform\parsed_output\enrichment.jsonl')
TOPIC_MAP_DIR = Path(r'D:\platform\parsed_output')

# ─── Subjects ─────────────────────────────────────────────────
SUBJECTS = {
    'home':      {'name': 'Home Science',         'dir': 'home'},
    'legal':     {'name': 'Legal Studies',        'dir': 'legal'},
    'massmedia': {'name': 'Mass Media',           'dir': 'massmedia'},
    'pol':       {'name': 'Political Science',    'dir': 'pol'},
    'psy':       {'name': 'Psychology',           'dir': 'psy'},
    'soc':       {'name': 'Sociology',            'dir': 'soc'},
}

# ─── File types (NO formula_bank — replaced with case_studies) ──
FILE_TYPES = {
    'question_bank': {
        'dir': 'question_bank',
        'prefix': 'question_bank',
        'prompt': '''You are an expert ISC examiner writing a Class {class_num} {subject_name} question bank.

SYLLABUS TOPICS:
{topics_with_nodes}

ENRICHMENT (official definitions and sub-skills for each node):
{enrichment}

Write a comprehensive question bank following these rules:
1. Generate 8-12 questions per topic ({min_q}-{max_q} total)
2. Include Short answer (2-3 marks), Long answer (6-8 marks), and MCQ (1 mark) questions
3. EVERY question MUST have a complete, detailed model answer worth full marks
4. For long answers, structure the answer with numbered points
5. For MCQs, provide 4 options and explain WHY the correct answer is right AND why distractors are wrong
6. Questions must test understanding, application, and analysis — not just recall
7. Use Indian context and examples where relevant
8. Base all factual content on the enrichment data provided — do NOT fabricate facts, dates, or names

FORMAT (follow exactly):
================================================================================
ISC CLASS {class_num} {subject_name_upper} — QUESTION BANK
Subject: {subject_name} | Class: {class_num} | Board: CISCE (ISC)
Total Topics: {num_topics} | Total Questions: [count]
================================================================================

=== TOPIC {n}: [topic name] ===

Q: [question]
Type: Short
A: [model answer]

Q: [question]
Type: Long
A: [model answer with numbered points]

Q: [question]
(a) ... (b) ... (c) ... (d) ...
Type: MCQ
A: (letter) [explanation of why correct and why others are wrong]

Output ONLY the question bank. No commentary, no markdown fences.''',
    },
    'drill_banks': {
        'dir': 'drill_banks',
        'prefix': 'drill_banks',
        'prompt': '''You are an ISC teacher creating rapid-fire drill questions for Class {class_num} {subject_name}.

SYLLABUS TOPICS:
{topics_with_nodes}

ENRICHMENT:
{enrichment}

Write drill banks following these rules:
1. 6-8 drill questions per topic
2. Drills are SHORT, quick-fire questions for rapid recall practice
3. Each answer should be 1-3 lines — concise and direct
4. Focus on key facts, definitions, dates, names, and quick applications
5. Mix of recall (define, name, list) and quick application (identify, classify, distinguish)
6. Base all content on the enrichment data

FORMAT:
================================================================================
ISC CLASS {class_num} {subject_name_upper} — DRILL BANKS
================================================================================

=== TOPIC {n}: [topic name] ===

DRILL 1: [area]
Q: [quick question]
A: [concise answer]

DRILL 2: [area]
Q: [quick question]
A: [concise answer]

Output ONLY the drill content.''',
    },
    'revision_sheets': {
        'dir': 'revision_sheets',
        'prefix': 'revision_sheet',
        'prompt': '''You are an ISC teacher creating concise revision sheets for Class {class_num} {subject_name}.

SYLLABUS TOPICS:
{topics_with_nodes}

ENRICHMENT:
{enrichment}

Write revision sheets following these rules:
1. For each topic, provide: Key Facts, Key Definitions, Key Points to Remember
2. Use bullet points — this is for QUICK revision before exams, not full notes
3. Keep each topic to 15-25 bullet points total
4. Include important names, dates, case laws, theories, and formulas where relevant
5. Highlight common exam questions at the end of each topic
6. Base all content on the enrichment data

FORMAT:
================================================================================
ISC CLASS {class_num} {subject_name_upper} — REVISION SHEETS
================================================================================

=== TOPIC {n}: [topic name] ===

KEY FACTS:
- fact 1
- fact 2

KEY DEFINITIONS:
- Term: Definition

KEY POINTS TO REMEMBER:
- point 1

COMMON EXAM QUESTIONS:
- "Question that frequently appears"

Output ONLY the revision content.''',
    },
    'glossary': {
        'dir': 'glossary',
        'prefix': 'glossary',
        'prompt': '''You are creating a comprehensive glossary for ISC Class {class_num} {subject_name}.

SYLLABUS TOPICS:
{topics_with_nodes}

ENRICHMENT:
{enrichment}

Write a glossary following these rules:
1. List ALL key terms, concepts, and important names from the entire syllabus
2. Each term has a clear, precise definition (1-2 lines maximum)
3. Group terms by topic
4. Include terms from enrichment definitions
5. Alphabetical order within each topic
6. Base all definitions on the enrichment data

FORMAT:
================================================================================
ISC CLASS {class_num} {subject_name_upper} — GLOSSARY
================================================================================

=== TOPIC {n}: [topic name] ===

Term One: Clear definition here
Term Two: Clear definition here

Output ONLY the glossary.''',
    },
    'worked_examples': {
        'dir': 'worked_examples',
        'prefix': 'worked_examples',
        'prompt': '''You are an ISC teacher creating worked examples for Class {class_num} {subject_name}.

SYLLABUS TOPICS:
{topics_with_nodes}

ENRICHMENT:
{enrichment}

Write worked examples following these rules:
1. 3-4 worked examples per topic
2. For humanities subjects: use case studies, scenario analysis, or structured answer demonstrations
3. For each example: state the problem/question, then show a step-by-step model answer
4. Show HOW to structure a good answer — this teaches exam technique
5. Include marking scheme points where relevant (e.g., "Key point: [1 mark]")
6. Base all factual content on the enrichment data

FORMAT:
================================================================================
ISC CLASS {class_num} {subject_name_upper} — WORKED EXAMPLES
================================================================================

=== TOPIC {n}: [topic name] ===

EXAMPLE 1: [title]
Question: [the exam question]
Model Answer:
  [Step 1 / Introduction: ...]
  [Step 2 / Main point 1: ...]
  [Step 3 / Main point 2: ...]
  [Step 4 / Conclusion: ...]
  Marking Points: [list key points that earn marks]

Output ONLY the worked examples.''',
    },
    'case_studies': {
        'dir': 'case_studies',
        'prefix': 'case_studies',
        'prompt': '''You are an ISC teacher creating case studies for Class {class_num} {subject_name}.

SYLLABUS TOPICS:
{topics_with_nodes}

ENRICHMENT:
{enrichment}

Write case studies following these rules:
1. 2-3 real-world case studies per topic
2. Each case study should be a real or realistic scenario that illustrates the topic concepts
3. For each case study: describe the situation, then ask 2-3 analytical questions, then provide model answers
4. Use Indian context where possible (Indian laws, Indian examples, Indian society)
5. Case studies should test APPLICATION of knowledge, not just recall
6. Base factual content on the enrichment data — do NOT fabricate specific real events or names

FORMAT:
================================================================================
ISC CLASS {class_num} {subject_name_upper} — CASE STUDIES
================================================================================

=== TOPIC {n}: [topic name] ===

CASE STUDY 1: [title]
Background: [2-3 paragraph scenario description]

Questions:
1. [analytical question]
2. [analytical question]

Model Answers:
1. [detailed answer applying topic concepts to the scenario]
2. [detailed answer]

Output ONLY the case studies.''',
    },
}


def load_enrichment_for_subject(class_num, subject_code):
    """Load enrichment nodes for a class/subject."""
    prefix = f'c{class_num}_{subject_code}_'
    nodes = []
    with open(ENRICHMENT_FILE, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except:
                continue
            nid = rec.get('node_id', '')
            if nid.startswith(prefix):
                nodes.append(rec)
    return nodes


def load_topic_mapping(class_num, subject_code):
    """Load topic mapping for a class/subject."""
    path = TOPIC_MAP_DIR / f'class{class_num}_topic_mapping.json'
    if not path.exists():
        return []
    d = json.load(open(path, encoding='utf-8'))
    key = f'{class_num}_{subject_code}'
    if key not in d:
        return []
    entry = d[key]
    return entry.get('topics', [])


def build_topics_text(topics, enrichment_nodes):
    """Build topics-with-nodes text."""
    lines = []
    node_map = {n.get('node_id'): n for n in enrichment_nodes}
    for t in topics:
        tnum = t.get('topic_num')
        tname = t.get('topic_name', '???')
        node_ids = t.get('nodes', [])
        lines.append(f'  Topic {tnum}: {tname} ({len(node_ids)} nodes)')
        for nid in node_ids:
            node = node_map.get(nid)
            if node:
                title = node.get('title', '')
                lines.append(f'    {nid}: {title}')
    return '\n'.join(lines)


def build_enrichment_text(topics, enrichment_nodes):
    """Build enrichment text for prompt."""
    node_map = {n.get('node_id'): n for n in enrichment_nodes}
    parts = []
    for t in topics:
        for nid in t.get('nodes', []):
            node = node_map.get(nid)
            if node:
                title = node.get('title', '')
                definition = node.get('definition', '')
                if len(definition) > 600:
                    definition = definition[:600] + '...'
                parts.append(f'{nid} — {title}: {definition}')
    return '\n'.join(parts)


def call_gemini(prompt, key):
    """Call Gemini API with a specific key."""
    body = json.dumps({
        'contents': [{'parts': [{'text': prompt}]}],
        'generationConfig': {
            'temperature': 0.7,
            'topP': 0.9,
            'maxOutputTokens': MAX_TOKENS,
        },
        'safetySettings': [
            {'category': 'HARM_CATEGORY_HARASSMENT', 'threshold': 'BLOCK_NONE'},
            {'category': 'HARM_CATEGORY_HATE_SPEECH', 'threshold': 'BLOCK_NONE'},
            {'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold': 'BLOCK_NONE'},
            {'category': 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold': 'BLOCK_NONE'},
        ],
    }).encode('utf-8')

    api_path = f'/v1beta/models/{MODEL}:generateContent?key={key}'
    url = f'https://generativelanguage.googleapis.com{api_path}'

    req = urllib.request.Request(url, data=body, method='POST')
    req.add_header('Content-Type', 'application/json')
    ctx = ssl.create_default_context()

    try:
        with urllib.request.urlopen(req, timeout=300, context=ctx) as resp:
            data = resp.read().decode('utf-8')
            result = json.loads(data)
            if 'error' in result:
                raise Exception(f"API error: {result['error'].get('message', 'unknown')}")
            text = result.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', '')
            if not text or len(text) < 200:
                raise Exception(f'Response too short: {len(text)} chars')
            return text
    except urllib.error.HTTPError as e:
        body_resp = e.read().decode('utf-8', errors='replace')
        if e.code == 503:
            raise Exception('503 service overloaded')
        elif e.code == 429:
            raise Exception('429 rate limited')
        else:
            raise Exception(f'API error {e.code}: {body_resp[:300]}')
    except urllib.error.URLError as e:
        raise Exception(f'Network error: {e.reason}')


def call_with_retry(prompt, key, label):
    """Call Gemini with retry on 503/429."""
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            return call_gemini(prompt, key)
        except Exception as e:
            retryable = '503' in str(e) or '429' in str(e) or 'timeout' in str(e).lower()
            if retryable and attempt < MAX_RETRIES:
                delay = min(5000 * (2 ** (attempt - 1)), 60000)
                print(f'    [{label}] Retry {attempt}/{MAX_RETRIES} in {delay//1000}s — {e}')
                time.sleep(delay / 1000)
                continue
            raise


def generate_one(task):
    """Generate a single file. Returns (label, success, error_msg)."""
    cls, subj, ft_key, topics, enrichment, key = task
    ft = FILE_TYPES[ft_key]
    subject_name = SUBJECTS[subj]['name']
    subject_dir = SUBJECTS[subj]['dir']

    topics_text = build_topics_text(topics, enrichment)
    enrichment_text = build_enrichment_text(topics, enrichment)
    num_topics = len(topics)
    min_q = num_topics * 8
    max_q = num_topics * 12

    # Get first topic number for the format template
    first_topic_n = topics[0].get('topic_num', 1) if topics else 1

    prompt = ft['prompt'].format(
        class_num=cls,
        subject_name=subject_name,
        subject_name_upper=subject_name.upper(),
        topics_with_nodes=topics_text,
        enrichment=enrichment_text,
        num_topics=num_topics,
        min_q=min_q,
        max_q=max_q,
        n=first_topic_n,
    )

    out_dir = CISCE_DIR / subject_dir / ft['dir']
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / f'c{cls}_{subj}_{ft["prefix"]}.marker'

    label = f'C{cls}_{subj}_{ft_key}'

    try:
        text = call_with_retry(prompt, key, label)
        out_file.write_text(text, encoding='utf-8')
        size_kb = out_file.stat().st_size / 1024
        print(f'  [Key{KEYS.index(key)+1}] {label} DONE — {size_kb:.1f}KB')
        return (label, True, None)
    except Exception as e:
        print(f'  [Key{KEYS.index(key)+1}] {label} FAILED — {e}')
        return (label, False, str(e))


def check_existing(class_num, subject_code, file_type):
    """Check if file already exists with content."""
    ft = FILE_TYPES[file_type]
    subject_dir = SUBJECTS[subject_code]['dir']
    out_file = CISCE_DIR / subject_dir / ft['dir'] / f'c{class_num}_{subject_code}_{ft["prefix"]}.marker'
    return out_file.exists() and out_file.stat().st_size > 1000


def main():
    parser = argparse.ArgumentParser(description='Generate ISC content using Gemini 3.6 Flash')
    parser.add_argument('--subject', type=str, help='Only this subject (e.g., psy)')
    parser.add_argument('--class', dest='class_num', type=int, help='Only this class (11 or 12)')
    parser.add_argument('--file-type', type=str, help='Only this file type')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be generated')
    parser.add_argument('--force', action='store_true', help='Overwrite existing files')
    args = parser.parse_args()

    # Build task list
    all_tasks = []
    for cls in [11, 12]:
        if args.class_num and args.class_num != cls:
            continue
        for subj_code in SUBJECTS:
            if args.subject and args.subject != subj_code:
                continue
            topics = load_topic_mapping(cls, subj_code)
            if not topics:
                continue
            enrichment = load_enrichment_for_subject(cls, subj_code)
            if not enrichment:
                continue
            for ft_key in FILE_TYPES:
                if args.file_type and args.file_type != ft_key:
                    continue
                exists = check_existing(cls, subj_code, ft_key)
                if exists and not args.force:
                    continue
                all_tasks.append((cls, subj_code, ft_key, topics, enrichment))

    print(f'\n{"="*70}')
    print(f'Gemini 3.6 Flash Content Generator')
    print(f'{"="*70}')
    print(f'Tasks: {len(all_tasks)} files to generate')
    print(f'Keys:  {len(KEYS)} (3 files per round, 60s break between rounds)')
    print(f'Model: {MODEL}')
    print(f'{"="*70}\n')

    if args.dry_run:
        for cls, subj, ft, topics, enrich in all_tasks:
            print(f'  C{cls}_{subj}_{ft} ({len(topics)} topics, {len(enrich)} nodes)')
        return

    if not all_tasks:
        print('Nothing to generate — all files exist. Use --force to overwrite.')
        return

    # Process in batches of 3 (one per key)
    success_count = 0
    fail_count = 0
    total = len(all_tasks)

    for round_num, i in enumerate(range(0, total, 3)):
        batch = all_tasks[i:i+3]
        round_label = f'Round {round_num+1}/{(total+2)//3}'

        print(f'\n--- {round_label} ({len(batch)} files) ---')

        # Assign keys to tasks in this batch
        tasks_with_keys = []
        for j, (cls, subj, ft, topics, enrich) in enumerate(batch):
            key = KEYS[j % len(KEYS)]
            tasks_with_keys.append((cls, subj, ft, topics, enrich, key))

        # Run in parallel using threads
        with ThreadPoolExecutor(max_workers=3) as executor:
            futures = {executor.submit(generate_one, t): t for t in tasks_with_keys}
            for future in as_completed(futures):
                label, success, err = future.result()
                if success:
                    success_count += 1
                else:
                    fail_count += 1

        # 60 second break between rounds (not after last round)
        if i + 3 < total:
            print(f'\n  60s break before next round...')
            time.sleep(60)

    print(f'\n{"="*70}')
    print(f'COMPLETE: {success_count} succeeded, {fail_count} failed out of {total}')
    print(f'{"="*70}')


if __name__ == '__main__':
    main()
