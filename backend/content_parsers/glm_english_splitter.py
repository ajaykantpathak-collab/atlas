"""
GLM-powered English node splitter for Class 1-8.
Uses Zhipu GLM-4.7 via OpenAI-compatible endpoint.

Same delimited-text approach as claude_english_splitter.py but:
- API: https://open.bigmodel.cn/api/paas/v4/chat/completions
- Auth: Bearer token
- Model: glm-4.7
- Sequential execution (1 worker) to avoid OOM and rate limits

Usage:
    python glm_english_splitter.py --class 8          # split all class 8 literature nodes
    python glm_english_splitter.py --class 8 --dry-run
    python glm_english_splitter.py --node c8_eng_201
"""

import json
import os
import sys
import time
import urllib.request
import urllib.error
import ssl
import argparse
import re
from pathlib import Path

sys.stdout.reconfigure(line_buffering=True)

# ─── API Config ───────────────────────────────────────────────
API_KEY = '93296b71324642388f2a0023c9b49305.ToP65AZkwP2OnUiZ'
API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
MODEL = 'glm-5.3-flash'
MAX_TOKENS = 16000
MAX_RETRIES = 3
REQUEST_TIMEOUT = 300  # seconds per request

CISCE_ENG_DIR = Path(r'D:\cisce\eng')
NODES_FILE = Path(r'D:\platform\parsed_output\english_cisce_nodes.json')
OUTPUT_DIR = Path(r'D:\platform\parsed_output\english_granular_nodes')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
RAW_DIR = Path(r'D:\platform\parsed_output\english_granular_nodes\raw_responses')
RAW_DIR.mkdir(parents=True, exist_ok=True)

# ─── Node type detection (same as claude splitter) ─────────────
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
    # Class 1-8 literature keywords
    'hobbit', 'mockingbird', 'striped pyjamas', 'lord of the flies',
    'pearl', 'old man and the sea', 'hemingway', 'sherlock', 'holmes',
    'ramayana', 'mahabharata', 'earthsea', 'watership down',
    'tale of two cities', 'les miserables', 'wodehouse', 'copperfield',
    'maus', 'spiegelman', 'tolkien', 'harper lee', 'steinbeck',
    'doyle', 'conan', 'rajagopalachari', 'leguin', 'le guin',
    'adams', 'hugo', 'dickens', 'genre', 'fiction', 'non-fiction',
    'character development', 'narrative voice', 'point of view',
    'rhyme scheme', 'metre', 'tone', 'mood',
]

EXAM_KEYWORDS = [
    'composition', 'letter', 'notice', 'email', 'comprehension', 'grammar',
    'transform', 'phrasal', 'tense', 'connector', 'directed', 'proposal',
    'exam technique', 'past paper', 'practice', 'cfq', 'model answer',
    'model composition', 'spiral review', 'create an original',
    'writing process', 'metacognition', 'cross-curricular', 'adaptive',
    'vocabulary framework', 'differentiation', 'common errors',
    'unseen comprehension', 'argumentative essay',
]


def detect_node_type(node):
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
    title = (node.get('title') or '').lower()
    if any(kw in title for kw in ['macbeth', 'julius caesar', 'act i', 'act ii', 'act iii',
                                   'act iv', 'act v', 'act 1', 'act 2', 'act 3', 'shakespeare']):
        return 'play'
    if any(kw in title for kw in ['poem', 'poetry', 'sonnet', 'ode', 'elegy',
                                   'rhyme scheme', 'metre', 'tone', 'mood']):
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
                                   'aidoo', 'angelou',
                                   'sherlock', 'holmes', 'doyle']):
        return 'short_story'
    if any(kw in title for kw in ['novel', 'book', 'chapter',
                                   'hobbit', 'mockingbird', 'striped pyjamas',
                                   'lord of the flies', 'pearl', 'old man and the sea',
                                   'ramayana', 'mahabharata', 'earthsea', 'watership',
                                   'tale of two cities', 'les miserables', 'wodehouse',
                                   'copperfield', 'maus']):
        return 'novel'
    if any(kw in title for kw in ['genre', 'fiction', 'non-fiction', 'character development',
                                   'narrative voice', 'point of view']):
        return 'prose'
    return 'prose'


# ─── GLM API call ──────────────────────────────────────────────
def call_glm(prompt, system_prompt=None):
    """Call GLM-4.7 via Zhipu OpenAI-compatible endpoint."""
    messages = []
    if system_prompt:
        messages.append({'role': 'system', 'content': system_prompt})
    messages.append({'role': 'user', 'content': prompt})

    body = json.dumps({
        'model': MODEL,
        'max_tokens': MAX_TOKENS,
        'messages': messages,
        'temperature': 0.7,
    }).encode('utf-8')

    req = urllib.request.Request(API_URL, data=body, method='POST')
    req.add_header('Authorization', 'Bearer ' + API_KEY)
    req.add_header('Content-Type', 'application/json')

    ctx = ssl.create_default_context()

    with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT, context=ctx) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        text = data.get('choices', [{}])[0].get('message', {}).get('content', '')
        if not text:
            raise Exception('No text in GLM response. Raw: %s' % json.dumps(data)[:500])
        return text


def call_with_retry(prompt, system_prompt, label):
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            return call_glm(prompt, system_prompt)
        except urllib.error.HTTPError as e:
            err_body = e.read().decode()[:200]
            if attempt < MAX_RETRIES:
                delay = 15 * attempt
                print('    [%s] HTTP %d retry %d/%d in %ds — %s' % (label, e.code, attempt, MAX_RETRIES, delay, err_body))
                time.sleep(delay)
                continue
            raise
        except Exception as e:
            if attempt < MAX_RETRIES:
                delay = 15 * attempt
                print('    [%s] Retry %d/%d in %ds — %s' % (label, attempt, MAX_RETRIES, delay, str(e)[:100]))
                time.sleep(delay)
                continue
            raise


# ─── Content loading ───────────────────────────────────────────
def load_node_content(node):
    source_file = node.get('source_file')
    if not source_file:
        return ''
    filepath = CISCE_ENG_DIR / source_file
    if not filepath.exists():
        return ''
    content = filepath.read_text(encoding='utf-8', errors='replace')
    node_id = node['node_id']
    pattern = rf'^--- NODE {re.escape(node_id)} ---\n(.*?)(?=^--- NODE |\Z)'
    m = re.search(pattern, content, re.MULTILINE | re.DOTALL)
    if m:
        return m.group(1).strip()
    return ''


# ─── Prompt building ───────────────────────────────────────────
def build_split_prompt(node, text_type):
    node_content = load_node_content(node)
    node_id = node['node_id']
    title = node.get('title', '')
    cls = node.get('class', 0)

    # Simpler structure for Class 1-5, fuller for 6-8
    if cls <= 5:
        target_min = 2
        target_max = 4
        content_words = '300-600 words'
    else:
        target_min = 3
        target_max = 6
        content_words = '500-1000 words'

    if text_type == 'play':
        structure_guide = """For a PLAY, create these sub-nodes:
1. PER-ACT/SCENE nodes: Plot summary, key events, dramatic significance
2. PER-CHARACTER nodes: Character arc, relationships, key quotes
3. PER-THEME nodes: Where theme appears, how it develops, exam use
4. LITERARY DEVICES node: Imagery, soliloquy, dramatic irony
Target: %d-%d sub-nodes.""" % (target_min, target_max)
    elif text_type == 'poem':
        structure_guide = """For a POEM, create these sub-nodes:
1. FORM AND STRUCTURE: Poetic form, rhyme scheme, meter, stanza structure
2. THEMES: Central themes, development, universal connection
3. LINE-BY-LINE ANALYSIS: Walk through poem, explain language, devices in context
4. LITERARY DEVICES: Key devices with examples
Target: %d-%d sub-nodes.""" % (target_min, target_max)
    elif text_type == 'short_story':
        structure_guide = """For a SHORT STORY, create these sub-nodes:
1. PLOT AND STRUCTURE: Summary, narrative perspective, turning points
2. CHARACTER ANALYSIS: Main characters, motivations, changes, key quotes
3. THEMES: Central themes, development, exam relevance
4. STYLE AND LANGUAGE: Voice, imagery, symbolism, dialogue
Target: %d-%d sub-nodes.""" % (target_min, target_max)
    elif text_type == 'novel':
        structure_guide = """For a NOVEL, create these sub-nodes:
1. PLOT SUMMARY: Chapter-by-chapter summary, key events
2. CHARACTER ANALYSIS: Main characters, arcs, relationships
3. THEMES: Central themes and their development
4. STYLE AND LANGUAGE: Narrative voice, imagery, symbolism
5. CONTEXT: Historical/biographical context if relevant
Target: %d-%d sub-nodes.""" % (target_min, target_max)
    else:
        structure_guide = """For a PROSE/LANGUAGE text, create these sub-nodes:
1. CONTENT AND MEANING: Key ideas, what the text says
2. STYLE AND TECHNIQUE: How it's written, literary devices
3. THEMES: Central themes and significance
4. EXAM APPLICATION: How to write about this in an exam
Target: %d-%d sub-nodes.""" % (target_min, target_max)

    system_prompt = """You are a master English teacher and CISCE/ICSE curriculum expert with 20+ years of experience. Your task is to take a coarse, single-node treatment of a literary text and split it into granular, world-class sub-nodes for a learning platform.

Each sub-node must be:
- Self-contained (a student can study it independently)
- Exam-focused (directly useful for ICSE/ISC exam preparation)
- Rich in content — write FULL PARAGRAPHS with detailed analysis, examples, and exam advice. NOT bullet points. NOT summaries. Write at least %s per sub-node.
- Properly sequenced (prerequisites make sense)

CRITICAL: Each CONTENT section must be a MINIMUM of %s. Write multiple full paragraphs. Include specific examples from the text, character names, plot points, literary devices, and exam tips. Do NOT write short summaries.

OUTPUT FORMAT — Use this EXACT delimited text format. Do NOT use JSON. Do NOT use markdown fences.

For EACH sub-node, write:

<<<SUBNODE>>>
TITLE: (short title for this sub-node)
NODE_TYPE: (one of: scene_analysis, character_analysis, theme_analysis, literary_devices, form_structure, context, plot_summary, style_language, exam_application)
THEMES: (comma-separated list of themes covered)
ELI5: (one-simple-sentence explanation for a young student)

CONTENT:
(Write AT LEAST %s of detailed analysis here. Multiple full paragraphs. Include specific textual references, character analysis, themes, and exam advice. This is the main body — make it substantial.)

MASTERY_CRITERIA:
(What the student must be able to DO after mastering this node — 2-3 full sentences)

DIAGNOSTIC_QUESTIONS:
Q: (question text) || A: (acceptable answer) || L: (level: recall|reasoning|evaluation|application|creation)
Q: (question text) || A: (acceptable answer) || L: (level)
Q: (question text) || A: (acceptable answer) || L: (level)
Q: (question text) || A: (acceptable answer) || L: (level)
(You MUST include at least 4 diagnostic questions with varying difficulty levels)

MISCONCEPTIONS:
M: (the misconception) || C: (the correction)
M: (the misconception) || C: (the correction)
M: (the misconception) || C: (the correction)
(You MUST include at least 3 common misconceptions with corrections)

KEY_QUOTES:
QUOTE: (the quote) || SPEAKER: (who said it) || CONTEXT: (when/where) || SIGNIFICANCE: (why it matters)
QUOTE: (the quote) || SPEAKER: (who) || CONTEXT: (when) || SIGNIFICANCE: (why)
QUOTE: (the quote) || SPEAKER: (who) || CONTEXT: (when) || SIGNIFICANCE: (why)
(add at least 3 relevant quotes, or write "none" if not applicable)
<<<END>>>

Then start the next sub-node with <<<SUBNODE>>> again.

Rules:
- You MUST include at least 4 diagnostic questions per sub-node
- You MUST include at least 3 common misconceptions per sub-node
- You MUST include at least 3 key quotes where applicable
- Content MUST be at least %s per sub-node — write detailed, multi-paragraph analysis
- Base ALL content on the source material provided — do not fabricate quotes or events
- If source material is insufficient, still create the sub-node but note gaps""" % (content_words, content_words, content_words, content_words)

    prompt = """SPLIT THIS NODE INTO GRANULAR SUB-NODES

NODE TO SPLIT:
- Node ID: %s
- Title: %s
- Class: %d
- Text type: %s

SOURCE CONTENT (the full existing node):
---
%s
---

%s

Use the <<<SUBNODE>>> delimited format from your instructions. Write each sub-node with all sections (TITLE, NODE_TYPE, THEMES, ELI5, CONTENT, MASTERY_CRITERIA, DIAGNOSTIC_QUESTIONS, MISCONCEPTIONS, KEY_QUOTES). Do NOT use JSON.""" % (
        node_id, title, cls, text_type,
        node_content[:8000],
        structure_guide
    )

    return system_prompt, prompt


# ─── Response parsing (same as claude splitter) ────────────────
def parse_delimited_response(text, node):
    blocks = re.split(r'<<<SUBNODE>>>', text)
    sub_nodes = []

    for i, block in enumerate(blocks, 1):
        block = block.strip()
        if not block or 'TITLE:' not in block:
            continue
        block = block.replace('<<<END>>>', '').strip()

        node_id = node['node_id']
        node_obj = {
            'node_id': '%s_%02d' % (node_id, i),
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

        m = re.search(r'^CONTENT:\s*\n(.*?)(?=^MASTERY_CRITERIA:|^DIAGNOSTIC_QUESTIONS:|^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<SUBNODE>>>|$)', block, re.MULTILINE | re.DOTALL)
        if m: node_obj['content'] = m.group(1).strip()

        m = re.search(r'^MASTERY_CRITERIA:\s*\n(.*?)(?=^DIAGNOSTIC_QUESTIONS:|^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<SUBNODE>>>|$)', block, re.MULTILINE | re.DOTALL)
        if m: node_obj['mastery_criteria'] = m.group(1).strip()

        m = re.search(r'^DIAGNOSTIC_QUESTIONS:\s*\n(.*?)(?=^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<SUBNODE>>>|$)', block, re.MULTILINE | re.DOTALL)
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

        m = re.search(r'^MISCONCEPTIONS:\s*\n(.*?)(?=^KEY_QUOTES:|^<<<SUBNODE>>>|$)', block, re.MULTILINE | re.DOTALL)
        if m:
            for mline in m.group(1).strip().split('\n'):
                mline = mline.strip()
                if mline.startswith('M:'):
                    parts = mline.split('||')
                    mis = parts[0].replace('M:', '').strip() if len(parts) > 0 else ''
                    cor = parts[1].replace('C:', '').strip() if len(parts) > 1 else ''
                    if mis:
                        node_obj['common_misconceptions'].append({'misconception': mis, 'correction': cor})

        m = re.search(r'^KEY_QUOTES:\s*\n(.*?)(?=^<<<SUBNODE>>>|$)', block, re.MULTILINE | re.DOTALL)
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


# ─── Split single node ─────────────────────────────────────────
def split_node(node):
    node_id = node['node_id']
    text_type = detect_text_type(node)
    system_prompt, prompt = build_split_prompt(node, text_type)
    label = '%s_%s' % (node_id, text_type)
    print('  [%s] Calling GLM (%s)...' % (label, MODEL))

    start = time.time()
    response = call_with_retry(prompt, system_prompt, label)
    elapsed = time.time() - start

    # Save raw response for debugging
    raw_file = RAW_DIR / ('%s_raw.txt' % node_id)
    raw_file.write_text(response, encoding='utf-8')

    sub_nodes = parse_delimited_response(response, node)
    if not sub_nodes:
        raise Exception('No sub-nodes parsed. Raw saved to %s' % raw_file.name)

    print('  [%s] DONE in %.1fs — %d sub-nodes' % (label, elapsed, len(sub_nodes)))
    return sub_nodes


# ─── Main ──────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description='Split CISCE English nodes using GLM-4.7')
    parser.add_argument('--class', dest='class_num', type=int, help='Only split nodes for this class')
    parser.add_argument('--node', type=str, help='Split only this specific node ID')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be split')
    parser.add_argument('--force', action='store_true', help='Overwrite existing splits')
    args = parser.parse_args()

    nodes = json.load(open(NODES_FILE, encoding='utf-8'))

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

        title = (node.get('title') or '').lower()
        if any(kw in title for kw in ['past paper', 'cfq', 'model answer', 'model composition',
                                       'spiral review', 'exam technique']):
            continue

        out_file = OUTPUT_DIR / ('%s_subnodes.json' % node['node_id'])
        if out_file.exists() and not args.force:
            continue

        text_type = detect_text_type(node)
        tasks.append((node, text_type))

    print('\n' + '=' * 70)
    print('GLM English Node Splitter — SEQUENTIAL (Class 1-8)')
    print('=' * 70)
    print('Model: %s' % MODEL)
    print('API: %s' % API_URL)
    print('Tasks: %d literature nodes to split' % len(tasks))
    print('=' * 70 + '\n')

    if args.dry_run:
        for node, text_type in tasks:
            print('  %s [%s] Class %d — %s' % (node['node_id'], text_type, node.get('class', 0), node.get('title', '')[:70]))
        return

    if not tasks:
        print('Nothing to split. Use --force to re-split existing.')
        return

    success = 0
    failed = 0
    total_sub_nodes = 0
    start_time = time.time()

    for idx, (node, text_type) in enumerate(tasks, 1):
        node_id = node['node_id']
        print('[%d/%d] %s [%s] — %s' % (idx, len(tasks), node_id, text_type, node.get('title', '')[:60]))

        try:
            sub_nodes = split_node(node)
            out_file = OUTPUT_DIR / ('%s_subnodes.json' % node_id)
            out_file.write_text(json.dumps({
                'parent_node': node_id,
                'parent_title': node.get('title', ''),
                'text_type': text_type,
                'class': node.get('class', 0),
                'model': MODEL,
                'sub_nodes': sub_nodes,
            }, indent=2, ensure_ascii=False), encoding='utf-8')
            success += 1
            total_sub_nodes += len(sub_nodes)
        except Exception as e:
            print('  FAILED — %s' % str(e)[:150])
            failed += 1

        elapsed = time.time() - start_time
        print('  Elapsed: %.0fs (%d ok, %d fail, %d sub-nodes total)' % (elapsed, success, failed, total_sub_nodes))
        # Small delay between requests to be gentle on the API
        if idx < len(tasks):
            time.sleep(2)

    print('\n' + '=' * 70)
    print('COMPLETE: %d nodes split, %d failed' % (success, failed))
    print('Total sub-nodes: %d' % total_sub_nodes)
    print('Output: %s' % OUTPUT_DIR)
    print('=' * 70)


if __name__ == '__main__':
    main()
