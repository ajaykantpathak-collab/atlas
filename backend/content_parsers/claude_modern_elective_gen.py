import os
"""
Generate granular nodes for Modern English and Elective English from scratch.
Uses CISCE 2027 syllabus and Claude Opus 5 to create world-class content.

Modern English (891): Pygmalion + Perspectives (short stories) + Reflections (poems)
Elective English (850): Novels + Drama + Fireflies poetry collection

Usage:
    python claude_modern_elective_gen.py --subject engmod          # Modern English
    python claude_modern_elective_gen.py --subject engelec         # Elective English
    python claude_modern_elective_gen.py --subject engmod --class 11
    python claude_modern_elective_gen.py --dry-run
"""

import json
import sys
import time
import urllib.request
import ssl
import argparse
import threading
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

sys.stdout.reconfigure(line_buffering=True)

# ─── API Config ───────────────────────────────────────────────
API_KEY = os.environ.get('ANTHROPIC_API_KEY') or ''
API_URL = 'https://api.claudeopus.pro/v1/messages'
MODEL = 'claude-opus-5'
MAX_TOKENS = 128000
MAX_RETRIES = 3

CISCE_DIR = Path(r'D:\cisce')
OUTPUT_DIR = Path(r'D:\platform\parsed_output\english_granular_nodes')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

PRINT_LOCK = threading.Lock()

def safe_print(msg):
    with PRINT_LOCK:
        print(msg)


def call_claude(prompt, system_prompt=None):
    """Call Claude API."""
    messages = [{'role': 'user', 'content': prompt}]
    body = {
        'model': MODEL,
        'max_tokens': MAX_TOKENS,
        'messages': messages,
    }
    if system_prompt:
        body['system'] = system_prompt

    body_json = json.dumps(body).encode('utf-8')
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
        return text


def call_with_retry(prompt, system_prompt, label):
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            return call_claude(prompt, system_prompt)
        except Exception as e:
            if attempt < MAX_RETRIES:
                delay = 10 * attempt
                safe_print(f'    [{label}] Retry {attempt}/{MAX_RETRIES} in {delay}s — {e}')
                time.sleep(delay)
                continue
            raise


def parse_json_robust(text):
    """Parse JSON with multiple repair strategies."""
    import re

    # Strip markdown fences
    text = text.strip()
    if text.startswith('```'):
        idx = text.find('\n')
        if idx > 0:
            text = text[idx + 1:]
    if text.endswith('```'):
        text = text[:-3]
    text = text.strip()

    # Strategy 1: Direct parse
    try:
        return json.loads(text)
    except:
        pass

    # Strategy 2: Extract JSON object
    json_match = re.search(r'\{[\s\S]*\}', text)
    if json_match:
        candidate = json_match.group(0)
        try:
            return json.loads(candidate)
        except:
            pass

        # Strategy 3: Fix control characters
        fixed = candidate.replace('\r\n', '\\n').replace('\r', '\\n').replace('\t', '\\t')
        try:
            return json.loads(fixed)
        except:
            pass

        # Strategy 4: Fix trailing commas
        fixed = re.sub(r',\s*([}\]])', r'\1', candidate)
        try:
            return json.loads(fixed)
        except:
            pass

        # Strategy 5: Fix newlines inside strings
        def fix_string_newlines(m):
            s = m.group(0)
            s = s.replace('\n', '\\n').replace('\r', '\\r')
            return s
        fixed = re.sub(r'"[^"\\]*(?:\\.[^"\\]*)*"', fix_string_newlines, candidate)
        try:
            return json.loads(fixed)
        except:
            pass

        # Strategy 6: Fix smart quotes
        fixed = candidate.replace('\u201c', '"').replace('\u201d', '"').replace('\u2018', "'").replace('\u2019', "'")
        try:
            return json.loads(fixed)
        except:
            pass

    raise Exception(f'JSON parse failed after all repair strategies. Response starts: {text[:300]}')


# ─── Task builders ────────────────────────────────────────────

def build_modern_english_tasks(syllabus, class_filter=None):
    """Build generation tasks for Modern English."""
    tasks = []
    subject_code = syllabus['subject_code']
    
    for cls_str, cls_data in syllabus['classes'].items():
        cls = int(cls_str)
        if class_filter and class_filter != cls:
            continue
        
        # Drama (Pygmalion) — split into per-act + character + theme nodes
        drama = cls_data['drama']
        tasks.append({
            'node_id': f'c{cls}_{subject_code}_drama',
            'title': f"{drama['text']} by {drama['author']} — {drama['acts']}",
            'class': cls,
            'subject': 'Modern English',
            'subject_code': subject_code,
            'text_type': 'play',
            'text_name': drama['text'],
            'author': drama['author'],
            'section': drama['acts'],
            'source_content': '',
        })
        
        # Short stories (Perspectives)
        for i, story in enumerate(cls_data['perspectives_short_stories'], 1):
            tasks.append({
                'node_id': f'c{cls}_{subject_code}_story_{i:02d}',
                'title': f"{story['title']} by {story['author']}",
                'class': cls,
                'subject': 'Modern English',
                'subject_code': subject_code,
                'text_type': 'short_story',
                'text_name': story['title'],
                'author': story['author'],
                'section': 'Perspectives',
                'source_content': '',
            })
        
        # Poems (Reflections)
        for i, poem in enumerate(cls_data['reflections_poems'], 1):
            tasks.append({
                'node_id': f'c{cls}_{subject_code}_poem_{i:02d}',
                'title': f"{poem['title']} by {poem['author']}",
                'class': cls,
                'subject': 'Modern English',
                'subject_code': subject_code,
                'text_type': 'poem',
                'text_name': poem['title'],
                'author': poem['author'],
                'section': 'Reflections',
                'source_content': '',
            })
    
    return tasks


def build_elective_english_tasks(syllabus, class_filter=None):
    """Build generation tasks for Elective English."""
    tasks = []
    subject_code = syllabus['subject_code']
    
    for cls_str, cls_data in syllabus['classes'].items():
        cls = int(cls_str)
        if class_filter and class_filter != cls:
            continue
        
        # Novels (both options — students choose one)
        for i, novel in enumerate(cls_data['novel'], 1):
            tasks.append({
                'node_id': f'c{cls}_{subject_code}_novel_{i}',
                'title': f"{novel['title']} by {novel['author']}",
                'class': cls,
                'subject': 'Elective English',
                'subject_code': subject_code,
                'text_type': 'novel',
                'text_name': novel['title'],
                'author': novel['author'],
                'section': 'Novel',
                'source_content': '',
            })
        
        # Drama (both options)
        for i, drama in enumerate(cls_data['drama'], 1):
            tasks.append({
                'node_id': f'c{cls}_{subject_code}_drama_{i}',
                'title': f"{drama['title']} by {drama['author']}",
                'class': cls,
                'subject': 'Elective English',
                'subject_code': subject_code,
                'text_type': 'play',
                'text_name': drama['title'],
                'author': drama['author'],
                'section': 'Drama',
                'source_content': '',
            })
        
        # Poetry (Fireflies collection) — one task per poet
        poetry = cls_data['poetry']
        for i, (poet, poems) in enumerate(poetry['poets'].items(), 1):
            tasks.append({
                'node_id': f'c{cls}_{subject_code}_poet_{i:02d}',
                'title': f"{poet} — {', '.join(poems[:2])}{'...' if len(poems) > 2 else ''}",
                'class': cls,
                'subject': 'Elective English',
                'subject_code': subject_code,
                'text_type': 'poem',
                'text_name': ', '.join(poems),
                'author': poet,
                'section': f'Poetry: {", ".join(poems)}',
                'source_content': '',
            })
    
    return tasks


# ─── Prompt builders ──────────────────────────────────────────

def build_generation_prompt(task):
    """Build a world-class prompt for generating nodes from scratch."""
    text_type = task['text_type']
    text_name = task['text_name']
    author = task['author']
    section = task['section']
    cls = task['class']
    subject = task['subject']
    
    if text_type == 'play':
        structure_guide = """For a PLAY, create these sub-nodes:

1. PER-ACT/SECTION nodes: One node per act or major section
   - Plot summary of that act
   - Key events and turning points
   - Key quotes from that act
   - Dramatic significance

2. PER-CHARACTER nodes: One node per major character
   - Character arc
   - Key relationships
   - Key quotes
   - How the character changes
   - Tragic flaw / fatal error

3. PER-THEME nodes: One node per major theme
   - Where the theme appears
   - How it develops
   - Key quotes that embody it
   - How to write about it in an exam

4. LITERARY DEVICES node:
   - Key imagery patterns
   - Soliloquy/monologue analysis
   - Dramatic irony examples
   - How to identify and write about devices

Target: 8-12 sub-nodes for a play."""

    elif text_type == 'poem':
        structure_guide = """For a POEM (or group of poems by the same poet), create these sub-nodes:

1. FORM AND STRUCTURE node:
   - Poetic form (sonnet, ode, free verse, etc.)
   - Rhyme scheme and meter
   - Stanza structure
   - How form serves meaning

2. THEMES node:
   - Central themes
   - How themes develop
   - Connection to universal human experience
   - How to write about themes in an exam

3. LINE-BY-LINE ANALYSIS node:
   - Walk through the poem section by section
   - Explain difficult language and references
   - Identify literary devices in context
   - Show how meaning builds

4. LITERARY DEVICES node:
   - Key devices used
   - Specific examples with line references
   - How devices serve meaning
   - How to write about devices in an exam

5. CONTEXT AND VOICE node:
   - Biographical/historical context
   - Speaker and perspective
   - Tone and mood

If multiple poems by the same poet, create one sub-node per poem PLUS a comparative node.

Target: 4-6 sub-nodes per poem or poet group."""

    elif text_type == 'short_story':
        structure_guide = """For a SHORT STORY, create these sub-nodes:

1. PLOT AND NARRATIVE STRUCTURE node:
   - Summary of events
   - Narrative perspective
   - Pacing and structure
   - Key turning points

2. CHARACTER ANALYSIS node:
   - Main characters and motivations
   - Character relationships
   - How characters change
   - Key quotes

3. THEMES node:
   - Central themes
   - How themes develop through plot and character
   - Universal significance
   - How to write about themes in an exam

4. STYLE AND LANGUAGE node:
   - Narrative voice and tone
   - Key imagery and symbolism
   - Use of dialogue
   - Distinguished stylistic features

Target: 4-5 sub-nodes per short story."""

    elif text_type == 'novel':
        structure_guide = """For a NOVEL, create these sub-nodes:

1. PLOT SUMMARY node: Chapter-by-chapter summary, key events
2. CHARACTER ANALYSIS node: Main characters, arcs, relationships, key quotes
3. THEMES node: Central themes and their development across the novel
4. STYLE AND LANGUAGE node: Narrative voice, imagery, symbolism, structure
5. CONTEXT node: Historical/biographical/cultural context
6. EXAM APPLICATION node: How to write about this novel in an ISC exam

Target: 6-8 sub-nodes per novel."""

    else:
        structure_guide = "Target: 3-4 sub-nodes."

    system_prompt = f"""You are a master English teacher and CISCE/ISC curriculum expert specializing in {subject}. Your task is to create granular, world-class learning nodes for a prescribed text in the ISC {subject} syllabus (Exam Year 2027).

You must create detailed, exam-focused content that a student can use to master this text for the ISC board exam.

IMPORTANT RULES:
- Base ALL content on your expert knowledge of the actual text. Do NOT fabricate quotes, events, or characters.
- If you are unsure about a specific quote, paraphrase rather than invent.
- Include REAL quotations from the text where you are confident they are accurate.
- Content should be 500-1000 words per sub-node — detailed, not superficial.
- Include 3-5 diagnostic questions per sub-node with varying difficulty (recall, reasoning, evaluation, application, creation).
- Include 2-3 common misconceptions per sub-node with corrections.
- Include relevant key quotes where applicable (quote, speaker, context, significance).

OUTPUT FORMAT — Use this EXACT delimited text format. Do NOT use JSON. Do NOT use markdown fences.

For EACH sub-node, write:

<<<SUBNODE>>>
TITLE: (short title for this sub-node)
NODE_TYPE: (one of: scene_analysis, character_analysis, theme_analysis, literary_devices, form_structure, context, plot_summary, style_language, exam_application)
THEMES: (comma-separated list of themes covered)
ELI5: (one-simple-sentence explanation for a young student)

CONTENT:
(Write 500-1000 words of detailed analysis here. You can write freely — paragraphs, bullet points, whatever serves the content. This is the main body.)

MASTERY_CRITERIA:
(What the student must be able to DO after mastering this node — 2-3 sentences)

DIAGNOSTIC_QUESTIONS:
Q: (question text) || A: (acceptable answer) || L: (level: recall|reasoning|evaluation|application|creation)
Q: (question text) || A: (acceptable answer) || L: (level)
Q: (question text) || A: (acceptable answer) || L: (level)
(add 3-5 questions)

MISCONCEPTIONS:
M: (the misconception) || C: (the correction)
M: (the misconception) || C: (the correction)
(add 2-3)

KEY_QUOTES:
QUOTE: (the quote) || SPEAKER: (who said it) || CONTEXT: (when/where) || SIGNIFICANCE: (why it matters)
QUOTE: (the quote) || SPEAKER: (who) || CONTEXT: (when) || SIGNIFICANCE: (why)
(add as many as relevant, or write "none" if not applicable)
<<<END>>>

Then start the next sub-node with <<<SUBNODE>>> again.

Write ALL sub-nodes in this format. No JSON. No markdown fences. Just plain text with these delimiters."""

    # For poetry groups, list each prescribed poem explicitly
    poem_list_instruction = ""
    if text_type == 'poem' and ',' in text_name:
        poems = [p.strip() for p in text_name.split(',')]
        poem_list = '\n'.join(f'  {i+1}. "{p}"' for i, p in enumerate(poems))
        poem_list_instruction = f"""

PRESCRIBED POEMS BY {author} (analyze THESE poems — do NOT invent or substitute any other poems):
{poem_list}

These are the EXACT poems prescribed in the ISC {subject} syllabus for Exam Year 2027.
- Analyze ONLY these poems. Do NOT create content about any other poem.
- Do NOT treat the anthology or collection name as a poem title.
- Do NOT invent poem titles, quotations, or biographical details.
- If you are not confident about an exact quotation, paraphrase rather than fabricate.
- For each poem, provide accurate analysis based on your expert knowledge of that specific poem.
- Create sub-nodes that cover ALL the prescribed poems, plus a comparative node if there are multiple poems."""

    prompt = f"""CREATE GRANULAR LEARNING NODES FOR THIS PRESCRIBED TEXT:

TEXT: {text_name}
AUTHOR: {author}
CLASS: {cls}
SUBJECT: {subject}
SECTION: {section}
TEXT TYPE: {text_type}

This is a prescribed text in the CISCE ISC {subject} syllabus for Exam Year 2027.
Create world-class, exam-focused sub-nodes that will help a Class {cls} student master this text.
{poem_list_instruction}

{structure_guide}

Use the <<<SUBNODE>>> delimited format from your instructions. Write each sub-node with all sections (TITLE, NODE_TYPE, THEMES, ELI5, CONTENT, MASTERY_CRITERIA, DIAGNOSTIC_QUESTIONS, MISCONCEPTIONS, KEY_QUOTES). Do NOT use JSON."""

    return system_prompt, prompt


def parse_delimited_response(text, task):
    """Parse the <<<SUBNODE>>> delimited format into structured sub-nodes."""
    import re
    
    # Split by subnode markers
    blocks = re.split(r'<<<SUBNODE>>>', text)
    sub_nodes = []
    
    for i, block in enumerate(blocks, 1):
        block = block.strip()
        if not block or '<<<END>>>' not in block and 'TITLE:' not in block:
            continue
        
        # Remove END marker if present
        block = block.replace('<<<END>>>', '').strip()
        
        node = {
            'node_id': f"{task['node_id']}_{i:02d}",
            'parent_node_id': task['node_id'],
            'title': '',
            'class': task['class'],
            'subject': task['subject'],
            'text_name': task['text_name'],
            'author': task['author'],
            'section': task.get('section', ''),
            'node_type': '',
            'content': '',
            'mastery_criteria': '',
            'diagnostic_questions': [],
            'common_misconceptions': [],
            'key_quotes': [],
            'themes': [],
            'prerequisites': [],
            'eli5': '',
        }
        
        # Extract TITLE
        m = re.search(r'^TITLE:\s*(.+)$', block, re.MULTILINE)
        if m:
            node['title'] = m.group(1).strip()
        
        # Extract NODE_TYPE
        m = re.search(r'^NODE_TYPE:\s*(.+)$', block, re.MULTILINE)
        if m:
            node['node_type'] = m.group(1).strip().lower().replace(' ', '_')
        
        # Extract THEMES
        m = re.search(r'^THEMES:\s*(.+)$', block, re.MULTILINE)
        if m:
            themes = [t.strip() for t in m.group(1).split(',') if t.strip()]
            node['themes'] = themes
        
        # Extract ELI5 (Claude sometimes writes ELI1 or EL15)
        m = re.search(r'^ELI[15]:\s*(.+)$', block, re.MULTILINE)
        if m:
            node['eli5'] = m.group(1).strip()
        
        # Extract CONTENT (between CONTENT: and next section marker or end of block)
        m = re.search(r'^CONTENT:\s*\n(.*?)(?=^MASTERY_CRITERIA:|^DIAGNOSTIC_QUESTIONS:|^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<|$)', block, re.MULTILINE | re.DOTALL)
        if m:
            node['content'] = m.group(1).strip()
        
        # Extract MASTERY_CRITERIA
        m = re.search(r'^MASTERY_CRITERIA:\s*\n(.*?)(?=^DIAGNOSTIC_QUESTIONS:|^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<)', block, re.MULTILINE | re.DOTALL)
        if m:
            node['mastery_criteria'] = m.group(1).strip()
        
        # Extract DIAGNOSTIC_QUESTIONS
        m = re.search(r'^DIAGNOSTIC_QUESTIONS:\s*\n(.*?)(?=^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<)', block, re.MULTILINE | re.DOTALL)
        if m:
            qblock = m.group(1).strip()
            for qline in qblock.split('\n'):
                qline = qline.strip()
                if qline.startswith('Q:'):
                    parts = qline.split('||')
                    q_text = parts[0].replace('Q:', '').strip() if len(parts) > 0 else ''
                    a_text = parts[1].replace('A:', '').strip() if len(parts) > 1 else ''
                    level = parts[2].replace('L:', '').strip() if len(parts) > 2 else 'recall'
                    if q_text:
                        node['diagnostic_questions'].append({
                            'question': q_text,
                            'acceptable_answer': a_text,
                            'level': level,
                        })
        
        # Extract MISCONCEPTIONS
        m = re.search(r'^MISCONCEPTIONS:\s*\n(.*?)(?=^KEY_QUOTES:|^<<<)', block, re.MULTILINE | re.DOTALL)
        if m:
            mblock = m.group(1).strip()
            for mline in mblock.split('\n'):
                mline = mline.strip()
                if mline.startswith('M:'):
                    parts = mline.split('||')
                    mis = parts[0].replace('M:', '').strip() if len(parts) > 0 else ''
                    cor = parts[1].replace('C:', '').strip() if len(parts) > 1 else ''
                    if mis:
                        node['common_misconceptions'].append({
                            'misconception': mis,
                            'correction': cor,
                        })
        
        # Extract KEY_QUOTES
        m = re.search(r'^KEY_QUOTES:\s*\n(.*?)(?=^<<<|$)', block, re.MULTILINE | re.DOTALL)
        if m:
            kblock = m.group(1).strip()
            if kblock.lower() != 'none':
                for kline in kblock.split('\n'):
                    kline = kline.strip()
                    if kline.startswith('QUOTE:'):
                        parts = kline.split('||')
                        quote = parts[0].replace('QUOTE:', '').strip() if len(parts) > 0 else ''
                        speaker = parts[1].replace('SPEAKER:', '').strip() if len(parts) > 1 else ''
                        context = parts[2].replace('CONTEXT:', '').strip() if len(parts) > 2 else ''
                        significance = parts[3].replace('SIGNIFICANCE:', '').strip() if len(parts) > 3 else ''
                        if quote:
                            node['key_quotes'].append({
                                'quote': quote,
                                'speaker': speaker,
                                'context': context,
                                'significance': significance,
                            })
        
        # Only add if we got at least a title and some content
        if node['title'] and node['content']:
            sub_nodes.append(node)
    
    return sub_nodes


def generate_node(task):
    """Generate sub-nodes for a single task using Claude."""
    node_id = task['node_id']
    text_type = task['text_type']
    
    system_prompt, prompt = build_generation_prompt(task)
    
    label = f'{node_id}_{text_type}'
    safe_print(f'  [{label}] Calling Claude ({MODEL})...')
    
    start = time.time()
    response = call_with_retry(prompt, system_prompt, label)
    elapsed = time.time() - start
    
    sub_nodes = parse_delimited_response(response, task)
    
    if not sub_nodes:
        # Save raw response for manual inspection
        raw_file = OUTPUT_DIR / f'{node_id}_RAW.txt'
        raw_file.write_text(response, encoding='utf-8')
        raise Exception(f'No sub-nodes parsed. Raw response saved to {raw_file.name}')
    
    safe_print(f'  [{label}] DONE in {elapsed:.1f}s — {len(sub_nodes)} sub-nodes created')
    
    return sub_nodes


def main():
    parser = argparse.ArgumentParser(description='Generate Modern English and Elective English nodes using Claude')
    parser.add_argument('--subject', type=str, required=True, choices=['engmod', 'engelec'],
                        help='Subject to generate: engmod (Modern English) or engelec (Elective English)')
    parser.add_argument('--class', dest='class_num', type=int, help='Only generate for this class')
    parser.add_argument('--dry-run', action='store_true', help='Show tasks without executing')
    parser.add_argument('--workers', type=int, default=5, help='Parallel workers (default: 5)')
    parser.add_argument('--force', action='store_true', help='Overwrite existing')
    parser.add_argument('--node', type=str, help='Only generate this specific node ID (comma-separated for multiple)')
    args = parser.parse_args()
    
    # Load syllabus
    syllabus_file = CISCE_DIR / args.subject / 'syllabus_2027.json'
    syllabus = json.load(open(syllabus_file, encoding='utf-8'))
    
    # Build tasks
    if args.subject == 'engmod':
        tasks = build_modern_english_tasks(syllabus, args.class_num)
    else:
        tasks = build_elective_english_tasks(syllabus, args.class_num)
    
    # Filter by specific node IDs if provided
    if args.node:
        node_ids = [n.strip() for n in args.node.split(',')]
        tasks = [t for t in tasks if t['node_id'] in node_ids]

    # Filter out already-done
    if not args.force and not args.node:
        tasks = [t for t in tasks if not (OUTPUT_DIR / f"{t['node_id']}_subnodes.json").exists()]
    
    print(f'\n{"="*70}')
    print(f'Claude {syllabus["subject"]} Node Generator — PARALLEL')
    print(f'{"="*70}')
    print(f'Model: {MODEL}')
    print(f'Workers: {args.workers}')
    print(f'Tasks: {len(tasks)} texts to generate nodes for')
    print(f'{"="*70}\n')
    
    if args.dry_run:
        for t in tasks:
            print(f'  {t["node_id"]} [{t["text_type"]}] Class {t["class"]} — {t["title"][:70]}')
        return
    
    if not tasks:
        print('Nothing to generate — all tasks already have nodes. Use --force to regenerate.')
        return
    
    success = 0
    failed = 0
    total_sub_nodes = 0
    completed = 0
    start_time = time.time()
    
    def process_task(task):
        node_id = task['node_id']
        try:
            sub_nodes = generate_node(task)
            out_file = OUTPUT_DIR / f'{node_id}_subnodes.json'
            out_file.write_text(json.dumps({
                'parent_node': node_id,
                'parent_title': task['title'],
                'text_type': task['text_type'],
                'class': task['class'],
                'subject': task['subject'],
                'subject_code': task['subject_code'],
                'text_name': task['text_name'],
                'author': task['author'],
                'sub_nodes': sub_nodes,
            }, indent=2, ensure_ascii=False), encoding='utf-8')
            return (node_id, sub_nodes, None)
        except Exception as e:
            return (node_id, None, str(e))
    
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {executor.submit(process_task, t): t for t in tasks}
        
        for future in as_completed(futures):
            node_id, sub_nodes, err = future.result()
            completed += 1
            elapsed = time.time() - start_time
            
            if err:
                safe_print(f'  [{completed}/{len(tasks)}] {node_id} FAILED — {err[:100]}')
                failed += 1
            else:
                safe_print(f'  [{completed}/{len(tasks)}] {node_id} DONE — {len(sub_nodes)} sub-nodes ({elapsed:.0f}s elapsed)')
                success += 1
                total_sub_nodes += len(sub_nodes)
    
    print(f'\n{"="*70}')
    print(f'COMPLETE: {success} texts processed, {failed} failed')
    print(f'Total sub-nodes created: {total_sub_nodes}')
    print(f'Output: {OUTPUT_DIR}')
    print(f'{"="*70}')


if __name__ == '__main__':
    main()
