"""
Claude-powered English node splitter.
Takes coarse CISCE English nodes and splits them into granular sub-nodes.

Uses OpusMax API (Claude Sonnet 5) via Anthropic-compatible endpoint.
API: https://api.opusmax.pro/v1/messages

Priority: Class 12 → 11 → 10 → 9 → 8 → ... → 1

Usage:
    python claude_english_splitter.py                    # split all literature nodes
    python claude_english_splitter.py --class 12         # only class 12
    python claude_english_splitter.py --dry-run          # show what would be split
    python claude_english_splitter.py --node c12_eng_101 # split one specific node
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

sys.stdout.reconfigure(line_buffering=True)

# Thread-safe print lock
PRINT_LOCK = threading.Lock()

def safe_print(msg):
    with PRINT_LOCK:
        print(msg)

# ─── API Config ───────────────────────────────────────────────
API_KEY = os.environ.get('ANTHROPIC_API_KEY') or ''
API_URL = 'https://api.claudeopus.pro/v1/messages'
MODEL = 'claude-opus-5'
MAX_TOKENS = 128000
MAX_RETRIES = 3

CISCE_ENG_DIR = Path(r'D:\cisce\eng')
NODES_FILE = Path(r'D:\platform\parsed_output\english_cisce_nodes.json')
OUTPUT_DIR = Path(r'D:\platform\parsed_output\english_granular_nodes')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ─── Node type detection ──────────────────────────────────────
LITERATURE_KEYWORDS = [
    'act', 'macbeth', 'julius', 'caesar', 'poem', 'poetry', 'sonnet', 
    'story', 'prose', 'rhapsody', 'prism', 'treasure', 'conversation',
    'tithonus', 'beethoven', 'small towns', 'death be', 'atithi',
    'cookie', 'soft rains', 'indigo', 'medicine bag', 'lesson',
    'pedestrian', 'girl who', 'great trees', 'considerable', 'photographer',
    'elevator', 'haunted', 'glove', 'power of music', 'tagore', 'tennyson',
    'donne', 'soyinka', 'bradbury', 'dick', 'ray', 'sneve', 'aidoo',
    'frost', 'leacock', 'sleator', 'longfellow', 'hunt', 'daudet',
    'angelou', 'hughes', 'liu', 'twain', 'hearn', 'owen', 'heaney',
    'shakespeare', 'stevenson', 'burnett', 'dickens', 'frank', 'koyczan',
    'mamang', 'dai', 'hoagland', 'abhisara', 'tryst', 'naturalist',
    'strange meeting', 'living god', 'advice to youth', 'paper menagerie',
    'grammatizator', 'thank you ma', 'treasure island', 'secret garden',
    'oliver twist', 'anne frank', 'critical reading',
]

EXAM_KEYWORDS = [
    'composition', 'letter', 'notice', 'email', 'comprehension', 'grammar',
    'transform', 'phrasal', 'tense', 'connector', 'directed', 'proposal',
    'exam technique', 'past paper', 'practice', 'cfq', 'model answer',
    'model composition', 'spiral review', 'create an original',
    'writing process', 'metacognition', 'cross-curricular', 'adaptive',
    'vocabulary framework', 'differentiation', 'common errors',
    'unseen comprehension',
]


def detect_node_type(node):
    """Determine if a node is literature, language/exam, or other."""
    title = (node.get('title') or '').lower()
    subject = (node.get('subject') or '').lower()
    
    if any(kw in title for kw in EXAM_KEYWORDS):
        return 'exam'
    if any(kw in title for kw in LITERATURE_KEYWORDS):
        return 'literature'
    if 'literature' in subject:
        return 'literature'
    if 'language' in subject:
        return 'language'
    return 'other'


def detect_text_type(node):
    """For literature nodes, detect if it's a play, poem, short story, novel, or prose."""
    title = (node.get('title') or '').lower()
    
    if any(kw in title for kw in ['macbeth', 'julius caesar', 'act i', 'act ii', 'act iii', 
                                   'act iv', 'act v', 'act 1', 'act 2', 'act 3', 'shakespeare']):
        return 'play'
    if any(kw in title for kw in ['poem', 'poetry', 'sonnet', 'ode', 'elegy',
                                   'telephone conversation', 'tithonus', 'beethoven',
                                   'small towns', 'death be not proud', 'abhisara',
                                   'why i like', 'sonnet 116', 'death of a naturalist',
                                   'strange meeting', 'when great trees', 'a considerable speck',
                                   'haunted houses', 'the glove and the lions',
                                   'the power of music', 'koyczan', 'mamang dai',
                                   'tennyson', 'donne', 'hoagland', 'heaney', 'owen',
                                   'frost', 'longfellow', 'hunt', 'tagore']):
        return 'poem'
    if any(kw in title for kw in ['story', 'prose', 'rhapsody', 'prism',
                                   'treasure', 'cookie lady', 'soft rains',
                                   'indigo', 'medicine bag', 'the last lesson',
                                   'the pedestrian', 'the girl who can',
                                   'the elevator', 'with the photographer',
                                   'a living god', 'advice to youth',
                                   'paper menagerie', 'grammatizator',
                                   'thank you ma', 'treasure island',
                                   'secret garden', 'oliver twist',
                                   'anne frank', 'atithi', 'ray bradbury',
                                   'philip k dick', 'satyajit', 'sneve',
                                   'daudet', 'leacock', 'sleator',
                                   'hearn', 'liu', 'twain', 'hughes',
                                   'aidoo', 'angelou']):
        return 'short_story'
    if any(kw in title for kw in ['novel', 'book', 'chapter']):
        return 'novel'
    return 'prose'


def call_claude(prompt, system_prompt=None):
    """Call Claude API via OpusMax gateway."""
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
        # Content may have multiple blocks (thinking + text). Find the text block.
        content_blocks = data.get('content', [])
        text = ''
        for block in content_blocks:
            if block.get('type') == 'text':
                text = block.get('text', '')
                break
        if not text:
            # Fallback: try first block
            text = content_blocks[0].get('text', '') if content_blocks else ''
        if not text:
            raise Exception(f'No text in response. Blocks: {[b.get("type") for b in content_blocks]}. Raw: {json.dumps(data)[:500]}')
        return text


def call_with_retry(prompt, system_prompt, label):
    """Call Claude with retry."""
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            return call_claude(prompt, system_prompt)
        except Exception as e:
            if attempt < MAX_RETRIES:
                delay = 10 * attempt
                print(f'    [{label}] Retry {attempt}/{MAX_RETRIES} in {delay}s — {e}')
                time.sleep(delay)
                continue
            raise


def load_node_content(node):
    """Load the full content of a node from its source .marker file."""
    source_file = node.get('source_file')
    if not source_file:
        return ''
    
    filepath = CISCE_ENG_DIR / source_file
    if not filepath.exists():
        return ''
    
    content = filepath.read_text(encoding='utf-8', errors='replace')
    
    # Extract just this node's section
    import re
    node_id = node['node_id']
    pattern = rf'^--- NODE {re.escape(node_id)} ---\n(.*?)(?=^--- NODE |\Z)'
    m = re.search(pattern, content, re.MULTILINE | re.DOTALL)
    if m:
        return m.group(1).strip()
    return ''


def build_split_prompt(node, text_type):
    """Build a world-class prompt for splitting a node into sub-nodes."""
    node_content = load_node_content(node)
    node_id = node['node_id']
    title = node.get('title', '')
    cls = node.get('class', 0)
    
    # Determine sub-node structure based on text type
    if text_type == 'play':
        structure_guide = """For a PLAY (e.g., Macbeth, Julius Caesar), create these sub-nodes:

1. PER-ACT nodes: One node per act or group of scenes covered
   - Plot summary of that act
   - Key events and turning points
   - Key quotes from that act
   - Dramatic significance

2. PER-CHARACTER nodes: One node per major character
   - Character arc across the play
   - Key relationships
   - Key quotes
   - How the character changes
   - Tragic flaw / fatal error

3. PER-THEME nodes: One node per major theme
   - Where the theme appears (act/scene references)
   - How it develops across the play
   - Key quotes that embody it
   - How to write about it in an exam

4. LITERARY DEVICES node: 
   - Key imagery patterns (blood, sleep, nature, etc.)
   - Soliloquy analysis
   - Dramatic irony examples
   - How to identify and write about devices in an exam

Target: 8-12 sub-nodes for a play covering multiple acts."""

    elif text_type == 'poem':
        structure_guide = """For a POEM, create these sub-nodes:

1. FORM AND STRUCTURE node:
   - Poetic form (sonnet, ode, free verse, etc.)
   - Rhyme scheme and meter
   - Stanza structure
   - How form serves meaning

2. THEMES node:
   - Central themes
   - How themes develop across the poem
   - Connection to universal human experience
   - How to write about themes in an exam

3. LINE-BY-LINE ANALYSIS node:
   - Walk through the poem section by section
   - Explain difficult language and references
   - Identify literary devices in context
   - Show how meaning builds line by line

4. LITERARY DEVICES node:
   - Key devices used (metaphor, imagery, alliteration, etc.)
   - Specific examples with line references
   - How devices serve the poem's meaning
   - How to write about devices in an exam

5. CONTEXT AND VOICE node (if applicable):
   - Biographical/historical context
   - Speaker and perspective
   - Tone and mood

Target: 3-5 sub-nodes per poem."""

    elif text_type == 'short_story':
        structure_guide = """For a SHORT STORY, create these sub-nodes:

1. PLOT AND NARRATIVE STRUCTURE node:
   - Summary of events
   - Narrative perspective (first person, third person, etc.)
   - Pacing and structure (linear, circular, frame narrative, etc.)
   - Key turning points

2. CHARACTER ANALYSIS node:
   - Main characters and their motivations
   - Character relationships
   - How characters change
   - Key quotes

3. THEMES node:
   - Central themes
   - How themes are developed through plot and character
   - Universal significance
   - How to write about themes in an exam

4. STYLE AND LANGUAGE node:
   - Narrative voice and tone
   - Key imagery and symbolism
   - Use of dialogue
   - Distinguished stylistic features

Target: 3-4 sub-nodes per short story."""

    elif text_type == 'novel':
        structure_guide = """For a NOVEL, create these sub-nodes:

1. PLOT SUMMARY node: Chapter-by-chapter summary, key events
2. CHARACTER ANALYSIS node: Main characters, arcs, relationships
3. THEMES node: Central themes and their development
4. STYLE AND LANGUAGE node: Narrative voice, imagery, symbolism
5. CONTEXT node: Historical/biographical context if relevant

Target: 4-6 sub-nodes per novel."""

    else:  # prose
        structure_guide = """For a PROSE text, create these sub-nodes:

1. CONTENT AND MEANING node: What the text says, key ideas
2. STYLE AND TECHNIQUE node: How the text is written, literary devices
3. THEMES node: Central themes and their significance
4. EXAM APPLICATION node: How to write about this text in an exam

Target: 3-4 sub-nodes."""

    system_prompt = """You are a master English teacher and CISCE/ISC curriculum expert. Your task is to take a coarse, single-node treatment of a literary text and split it into granular, world-class sub-nodes for a learning platform.

Each sub-node must be:
- Self-contained (a student can study it independently)
- Exam-focused (directly useful for ISC/ICSE exam preparation)
- Rich in content (not just bullet points — full explanations)
- Properly sequenced (prerequisites make sense)

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

Write ALL sub-nodes in this format. No JSON. No markdown fences. Just plain text with these delimiters.

Rules:
- Include 3-5 diagnostic questions per sub-node with varying difficulty levels
- Include 2-3 common misconceptions per sub-node
- Include relevant key quotes where applicable
- Content should be 500-1000 words per sub-node — detailed, not superficial
- Base ALL content on the source material provided — do not fabricate quotes or events
- If the source material is insufficient for a particular sub-node, still create it but note gaps"""

    prompt = f"""SPLIT THIS NODE INTO GRANULAR SUB-NODES

NODE TO SPLIT:
- Node ID: {node_id}
- Title: {title}
- Class: {cls}
- Text type: {text_type}

SOURCE CONTENT (the full existing node):
---
{node_content[:8000]}
---

{structure_guide}

Use the <<<SUBNODE>>> delimited format from your instructions. Write each sub-node with all sections (TITLE, NODE_TYPE, THEMES, ELI5, CONTENT, MASTERY_CRITERIA, DIAGNOSTIC_QUESTIONS, MISCONCEPTIONS, KEY_QUOTES). Do NOT use JSON."""

    return system_prompt, prompt


def parse_delimited_response(text, node):
    """Parse the <<<SUBNODE>>> delimited format into structured sub-nodes."""
    import re

    blocks = re.split(r'<<<SUBNODE>>>', text)
    sub_nodes = []

    for i, block in enumerate(blocks, 1):
        block = block.strip()
        if not block or 'TITLE:' not in block:
            continue

        block = block.replace('<<<END>>>', '').strip()

        node_id = node['node_id']
        node_obj = {
            'node_id': f"{node_id}_{i:02d}",
            'parent_node_id': node_id,
            'title': '',
            'class': node.get('class', 0),
            'subject': 'English Literature',
            'text_name': node.get('title', ''),
            'section': '',
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

        m = re.search(r'^TITLE:\s*(.+)$', block, re.MULTILINE)
        if m: node_obj['title'] = m.group(1).strip()

        m = re.search(r'^NODE_TYPE:\s*(.+)$', block, re.MULTILINE)
        if m: node_obj['node_type'] = m.group(1).strip().lower().replace(' ', '_')

        m = re.search(r'^THEMES:\s*(.+)$', block, re.MULTILINE)
        if m:
            node_obj['themes'] = [t.strip() for t in m.group(1).split(',') if t.strip()]

        m = re.search(r'^ELI5:\s*(.+)$', block, re.MULTILINE)
        if m: node_obj['eli5'] = m.group(1).strip()

        m = re.search(r'^CONTENT:\s*\n(.*?)(?=^MASTERY_CRITERIA:|^DIAGNOSTIC_QUESTIONS:|^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<|$)', block, re.MULTILINE | re.DOTALL)
        if m: node_obj['content'] = m.group(1).strip()

        m = re.search(r'^MASTERY_CRITERIA:\s*\n(.*?)(?=^DIAGNOSTIC_QUESTIONS:|^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<)', block, re.MULTILINE | re.DOTALL)
        if m: node_obj['mastery_criteria'] = m.group(1).strip()

        m = re.search(r'^DIAGNOSTIC_QUESTIONS:\s*\n(.*?)(?=^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<)', block, re.MULTILINE | re.DOTALL)
        if m:
            for qline in m.group(1).strip().split('\n'):
                qline = qline.strip()
                if qline.startswith('Q:'):
                    parts = qline.split('||')
                    q_text = parts[0].replace('Q:', '').strip() if len(parts) > 0 else ''
                    a_text = parts[1].replace('A:', '').strip() if len(parts) > 1 else ''
                    level = parts[2].replace('L:', '').strip() if len(parts) > 2 else 'recall'
                    if q_text:
                        node_obj['diagnostic_questions'].append({'question': q_text, 'acceptable_answer': a_text, 'level': level})

        m = re.search(r'^MISCONCEPTIONS:\s*\n(.*?)(?=^KEY_QUOTES:|^<<<)', block, re.MULTILINE | re.DOTALL)
        if m:
            for mline in m.group(1).strip().split('\n'):
                mline = mline.strip()
                if mline.startswith('M:'):
                    parts = mline.split('||')
                    mis = parts[0].replace('M:', '').strip() if len(parts) > 0 else ''
                    cor = parts[1].replace('C:', '').strip() if len(parts) > 1 else ''
                    if mis:
                        node_obj['common_misconceptions'].append({'misconception': mis, 'correction': cor})

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
                            node_obj['key_quotes'].append({'quote': quote, 'speaker': speaker, 'context': context, 'significance': significance})

        if node_obj['title'] and node_obj['content']:
            sub_nodes.append(node_obj)

    return sub_nodes


def split_node(node):
    """Split a single coarse node into granular sub-nodes using Claude."""
    node_id = node['node_id']
    text_type = detect_text_type(node)

    system_prompt, prompt = build_split_prompt(node, text_type)

    label = f'{node_id}_{text_type}'
    print(f'  [{label}] Calling Claude ({MODEL})...')

    start = time.time()
    response = call_with_retry(prompt, system_prompt, label)
    elapsed = time.time() - start

    sub_nodes = parse_delimited_response(response, node)

    if not sub_nodes:
        raw_file = OUTPUT_DIR / f'{node_id}_RAW.txt'
        raw_file.write_text(response, encoding='utf-8')
        raise Exception(f'No sub-nodes parsed. Raw response saved to {raw_file.name}')

    safe_print(f'  [{label}] DONE in {elapsed:.1f}s — {len(sub_nodes)} sub-nodes created')

    return sub_nodes


def parse_json_robust(text):
    """Parse JSON with multiple repair strategies for common Claude output issues."""
    import re

    # Strategy 1: Direct parse
    try:
        return json.loads(text)
    except:
        pass

    # Strategy 2: Extract JSON object from text
    json_match = re.search(r'\{[\s\S]*\}', text)
    if json_match:
        candidate = json_match.group(0)
        try:
            return json.loads(candidate)
        except:
            pass

        # Strategy 3: Fix control characters (newlines/tabs inside strings)
        fixed = candidate.replace('\r\n', '\\n').replace('\r', '\\n').replace('\t', '\\t')
        try:
            return json.loads(fixed)
        except:
            pass

        # Strategy 4: Fix trailing commas before } or ]
        fixed = re.sub(r',\s*([}\]])', r'\1', candidate)
        try:
            return json.loads(fixed)
        except:
            pass

        # Strategy 5: Fix unescaped newlines inside string values
        # Replace literal newlines that are inside quoted strings
        fixed = candidate
        # This is tricky — replace newlines only inside string values
        def fix_string_newlines(m):
            s = m.group(0)
            # Replace literal newlines with \\n
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

        # Strategy 7: Try line-by-line repair — remove problematic lines
        lines = candidate.split('\n')
        # Find the error location and try removing/fixing nearby lines
        try:
            return json.loads(candidate)
        except json.JSONDecodeError as e:
            # Last resort: try to fix the specific error location
            error_line = e.lineno
            if error_line and error_line <= len(lines):
                # Try removing the problematic line
                lines_copy = lines[:error_line - 1] + lines[error_line:]
                try:
                    return json.loads('\n'.join(lines_copy))
                except:
                    pass

    raise Exception(f'JSON parse failed after all repair strategies. Response starts: {text[:300]}')


def main():
    parser = argparse.ArgumentParser(description='Split CISCE English nodes into granular sub-nodes using Claude')
    parser.add_argument('--class', dest='class_num', type=int, help='Only split nodes for this class')
    parser.add_argument('--node', type=str, help='Split only this specific node ID')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be split')
    parser.add_argument('--force', action='store_true', help='Overwrite existing splits')
    parser.add_argument('--workers', type=int, default=10, help='Number of parallel workers (default: 10)')
    args = parser.parse_args()
    
    # Load nodes
    nodes = json.load(open(NODES_FILE, encoding='utf-8'))
    
    # Filter to literature nodes that need splitting
    tasks = []
    for node in sorted(nodes, key=lambda x: (-(x.get('class', 0)), x['node_id'])):
        cls = node.get('class', 0)
        if args.class_num and args.class_num != cls:
            continue
        if args.node and args.node != node['node_id']:
            continue
        
        ntype = detect_node_type(node)
        if ntype != 'literature':
            continue
        
        # Skip exam practice nodes (past paper practice, CFQ practice)
        title = (node.get('title') or '').lower()
        if any(kw in title for kw in ['past paper', 'cfq', 'model answer', 'model composition', 
                                       'spiral review', 'exam technique']):
            continue
        
        # Check if already split
        out_file = OUTPUT_DIR / f"{node['node_id']}_subnodes.json"
        if out_file.exists() and not args.force:
            continue
        
        text_type = detect_text_type(node)
        tasks.append((node, text_type))
    
    print(f'\n{"="*70}')
    print(f'Claude English Node Splitter — PARALLEL')
    print(f'{"="*70}')
    print(f'Model: {MODEL}')
    print(f'Workers: {args.workers}')
    print(f'Tasks: {len(tasks)} literature nodes to split')
    print(f'Priority: Class 12 → 11 → 10 → 9 → 8 → ... → 1')
    print(f'{"="*70}\n')

    if args.dry_run:
        for node, text_type in tasks:
            print(f'  {node["node_id"]} [{text_type}] Class {node.get("class",0)} — {node.get("title","")[:70]}')
        return

    if not tasks:
        print('Nothing to split — all literature nodes already have sub-nodes. Use --force to re-split.')
        return

    success = 0
    failed = 0
    total_sub_nodes = 0
    completed = 0
    start_time = time.time()

    def process_task(task_tuple):
        """Process a single node split. Returns (node_id, sub_nodes, error)."""
        node, text_type = task_tuple
        node_id = node['node_id']
        try:
            sub_nodes = split_node(node)
            # Save
            out_file = OUTPUT_DIR / f'{node_id}_subnodes.json'
            out_file.write_text(json.dumps({
                'parent_node': node_id,
                'parent_title': node.get('title', ''),
                'text_type': text_type,
                'class': node.get('class', 0),
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
    print(f'COMPLETE: {success} nodes split, {failed} failed')
    print(f'Total sub-nodes created: {total_sub_nodes}')
    print(f'Output: {OUTPUT_DIR}')
    print(f'{"="*70}')


if __name__ == '__main__':
    main()
