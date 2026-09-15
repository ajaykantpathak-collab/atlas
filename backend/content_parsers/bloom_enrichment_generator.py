"""
Bloom Enrichment Generator — single-pass generation for CBSE nodes.

Follows the proven pattern from gemini_content_gen.py:
  - 3 keys, 3 tasks per round, 60s break between rounds
  - Each task assigned a fixed key at build time
  - Retry with exponential backoff on 503/429

Two modes:
  FULL      — for unenriched nodes (1 node/call) — generates ALL fields
  SUPPLEMENT — for already-enriched nodes (3 nodes/call) — generates only missing fields

Model: gemini-3.6-flash
Output: .bloom.marker files (NEW, never overwrites existing .marker files)

Usage:
    python bloom_enrichment_generator.py --dry-run
    python bloom_enrichment_generator.py
    python bloom_enrichment_generator.py --mode full
    python bloom_enrichment_generator.py --mode supplement --subject physics
    python bloom_enrichment_generator.py --max-calls 780
"""
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
import ssl
import argparse
from pathlib import Path
from collections import defaultdict, Counter
from concurrent.futures import ThreadPoolExecutor, as_completed

sys.stdout.reconfigure(line_buffering=True)

# ─── Gemini API config (same as gemini_content_gen.py) ──────
KEYS = [
    os.environ.get('GEMINI_API_KEY', ''),
    os.environ.get('GEMINI_API_KEY', ''),
    os.environ.get('GEMINI_API_KEY', ''),
]
MODEL = 'gemini-3.6-flash'
MAX_TOKENS = 65536
MAX_RETRIES = 5
BREAK_MS = 60000  # 60s break between rounds (same as proven script)

# ─── Paths ───────────────────────────────────────────────────
NODES_BY_CLASS_DIR = Path(r"D:\platform\cbse_data\nodes\by_class")
NODES_GEN_DIR = Path(r"D:\platform\cbse_data\generated")
ENRICHMENT_DIR = Path(r"D:\platform\cbse_data\enrichment")
BLOOM_DIR = Path(r"D:\platform\cbse_data\bloom_enrichment")
BLOOM_DIR.mkdir(parents=True, exist_ok=True)

# ─── Batch size for supplement mode ──────────────────────────
SUPPLEMENT_BATCH_SIZE = 3

# ─── Diagram types per subject ───────────────────────────────
DIAGRAM_TYPES = {
    'science': 'body-diagram, circuit, solar-system, water-cycle, food-chain, generic-flow',
    'physics': 'circuit, solar-system, generic-flow, number-line',
    'chemistry': 'generic-flow, bar-chart',
    'biology': 'body-diagram, plant-parts, food-chain, generic-flow',
    'mathematics': 'place-value-chart, factor-tree, fraction-bar, number-line, bar-chart, venn-diagram',
    'math': 'place-value-chart, factor-tree, fraction-bar, number-line, bar-chart, venn-diagram',
    'social_science': 'timeline, map-india, generic-flow',
    'history_civics': 'timeline, map-india, generic-flow',
    'geography': 'map-india, generic-flow',
    'economics': 'bar-chart, generic-flow',
    'english': 'timeline, venn-diagram',
    'English Literature': 'timeline, venn-diagram',
    'hindi': 'timeline, venn-diagram',
}


# ─── Load nodes ──────────────────────────────────────────────
def load_enriched_ids():
    """Load all node IDs that have enrichment in .marker files."""
    enriched = set()
    for f in ENRICHMENT_DIR.glob("*.marker"):
        try:
            text = f.read_text(encoding="utf-8")
            for m in re.finditer(r"--- NODE (\S+) ---", text):
                enriched.add(m.group(1))
        except Exception:
            continue
    return enriched


def load_bloom_ids():
    """Load all node IDs that already have .bloom.marker files."""
    done = set()
    for f in BLOOM_DIR.glob("*.bloom.marker"):
        try:
            text = f.read_text(encoding="utf-8")
            for m in re.finditer(r"--- NODE (\S+) ---", text):
                done.add(m.group(1))
        except Exception:
            continue
    return done


def load_all_nodes(subject_filter=None, class_filter=None):
    """Load all unique CBSE nodes C6-12 from by_class/*_complete.json + generated/*.json (deduplicated)."""
    unique = {}  # node_id -> node dict (first occurrence wins)

    # Load from by_class/*_complete.json (the deduplicated complete files)
    for f in sorted(NODES_BY_CLASS_DIR.glob("*_complete.json")):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except Exception:
            continue
        if not isinstance(data, list):
            continue
        for node in data:
            try:
                cls_raw = node.get("class_level", 0)
                if cls_raw is None or cls_raw == "":
                    continue
                cls = int(cls_raw)
            except (ValueError, TypeError):
                continue
            if cls < 6 or cls > 12:
                continue
            subj = node.get("subject", "")
            if subject_filter and subj != subject_filter:
                continue
            if class_filter and cls != class_filter:
                continue
            nid = node.get("node_id", "")
            if nid and nid not in unique:
                unique[nid] = node

    # Load from generated/*.json (1004 new chapter nodes, not in by_class)
    for f in sorted(NODES_GEN_DIR.glob("*.json")):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except Exception:
            continue
        if not isinstance(data, list):
            continue
        for node in data:
            try:
                cls_raw = node.get("class_level", 0)
                if cls_raw is None or cls_raw == "":
                    continue
                cls = int(cls_raw)
            except (ValueError, TypeError):
                continue
            if cls < 6 or cls > 12:
                continue
            subj = node.get("subject", "")
            if subject_filter and subj != subject_filter:
                continue
            if class_filter and cls != class_filter:
                continue
            nid = node.get("node_id", "")
            if nid and nid not in unique:
                unique[nid] = node

    return list(unique.values())


def load_existing_enrichment(node_id):
    """Load existing enrichment text for a node from .marker files."""
    for f in ENRICHMENT_DIR.glob("*.marker"):
        try:
            text = f.read_text(encoding="utf-8")
            pattern = rf"--- NODE {re.escape(node_id)} ---(.*?)(?=--- NODE |\Z)"
            m = re.search(pattern, text, re.DOTALL)
            if m:
                return m.group(0).strip()
        except Exception:
            continue
    return None


# ─── Prompt builders ─────────────────────────────────────────
def node_context(n):
    """Build context string for a node."""
    nid = n.get("node_id", "")
    topic = n.get("topic", "")
    chapter = n.get("chapter", "")
    snippet = (n.get("content_snippet", "") or "")[:400]
    tags = n.get("concept_tags", [])
    if isinstance(tags, list):
        tags_str = ", ".join(str(t) for t in tags[:8])
    else:
        tags_str = str(tags)
    scope = n.get("scope_constraints", [])
    if isinstance(scope, list):
        scope_str = "; ".join(str(s) for s in scope[:4])
    else:
        scope_str = str(scope)
    prereqs = n.get("prerequisite_node_ids", [])
    if isinstance(prereqs, list):
        prereq_str = ", ".join(str(p) for p in prereqs[:5])
    else:
        prereq_str = str(prereqs)
    return (f"NODE: {nid}\n"
            f"  TOPIC: {topic}\n"
            f"  CHAPTER: {chapter}\n"
            f"  TAGS: {tags_str}\n"
            f"  CONTENT: {snippet}\n"
            f"  SCOPE: {scope_str}\n"
            f"  PREREQUISITES: {prereq_str}")


def build_full_prompt(n, cls, subj):
    """Full prompt for unenriched nodes — generates ALL fields, 1 node per call."""
    diagram_types = DIAGRAM_TYPES.get(subj, 'generic-flow')
    ctx = node_context(n)
    nid = n.get("node_id", "")

    return f"""You are an expert CBSE pedagogy designer. Generate COMPLETE enrichment for ONE CBSE {subj} Class {cls} node.

{ctx}

Generate ALL fields below in MARKER format. Output EXACTLY this structure:

--- NODE {nid} ---
TITLE: (clear, student-friendly title)
DEFINITION: |
  (Detailed multi-paragraph definition. 150-400 words. Plain text with line breaks.
   Include relationships between sub-concepts where relevant.)
COGNITIVE_LEVEL: (remember|understand|apply|analyze|evaluate|create)
MASTERY_CRITERIA: |
  (What the student must be able to DO to demonstrate mastery. 1-3 sentences. Observable and measurable.)
SCOPE_BOUNDARY:
  TEACH: (what this node teaches)
  DO_NOT_TEACH: (what is reserved for later classes — be specific: "Do not teach X -- C11")
  ALREADY_COVERED: (what was already covered in earlier classes)
TEXT_WALKTHROUGH: |
  (Narrative explanation walking the student through the concept.
   Connect to prior knowledge. Use analogies. 200-500 words.
   Write as if speaking to a Class {cls} student.)
ELI5: |
  (60-80 word child-friendly analogy explaining this concept in the simplest possible terms.
   Use everyday Indian examples a Class {cls} student would relate to.)
DIAGNOSTIC_QUESTIONS:
  Q1 (recall):
    QUESTION: (factual recall question)
    ANSWER: (the correct answer)
    ANSWER_TYPE: (number|text|mcq)
    UNIT: (unit if applicable, else omit)
    FORMULA: (formula if applicable, else omit)
    WORKING: (step-by-step solution showing how to arrive at the answer)
    HINT: (a hint for the student)
    OPTIONS: [optA, optB, optC, optD] (ONLY for mcq type, omit otherwise)
  Q2 (reasoning):
    QUESTION: ...
    ANSWER: ...
    ANSWER_TYPE: ...
    WORKING: ...
    HINT: ...
  Q3 (evaluate):
    QUESTION: ...
    ANSWER: ...
    ANSWER_TYPE: ...
    WORKING: ...
    HINT: ...
  Q4 (apply):
    QUESTION: ...
    ANSWER: ...
    ANSWER_TYPE: ...
    WORKING: ...
    HINT: ...
  Q5 (create):
    QUESTION: ...
    ANSWER: ...
    ANSWER_TYPE: ...
    WORKING: ...
    HINT: ...
REMEDIATION_PATHS:
  Q1_FAILS -> REVIEW (prerequisite_node_id or "none") | GUIDANCE: (what to do after review)
  Q2_FAILS -> REVIEW (prerequisite_node_id or "none") | GUIDANCE: (what to do after review)
  Q3_FAILS -> REVIEW (prerequisite_node_id or "none") | GUIDANCE: (what to do after review)
  Q4_FAILS -> REVIEW (prerequisite_node_id or "none") | GUIDANCE: (what to do after review)
  Q5_FAILS -> REVIEW (prerequisite_node_id or "none") | GUIDANCE: (what to do after review)
COMMON_MISCONCEPTION: |
  (1-3 common misconceptions. For each: state the misconception, then explain why it's wrong.)
ON_FAILURE: |
  (If the student fails the diagnostic questions, what should happen?
   - Which prerequisite to review
   - What simpler version of the concept to present
   - What analogy or example to use)
DIAGRAM:
  TYPE: (one of: {diagram_types} — or omit DIAGRAM section entirely if node doesn't need a visual)
  TITLE: (diagram title)
  SVG_DESCRIPTION: (detailed description of what the SVG shows)
  HOTSPOTS:
    - LABEL: (label) | X: (0-400) | Y: (0-300) | DESCRIPTION: (what this hotspot explains)
    - LABEL: (label) | X: (0-400) | Y: (0-300) | DESCRIPTION: (what this hotspot explains)
  ALT_TEXT: (accessibility text)
  ANIMATE: (true|false)
  STEPS:
    - LABEL: (step label) | ACTION: (what to highlight) | DURATION: (ms)

RULES:
- Output as plain text in the MARKER format shown above
- Start with --- NODE {nid} ---
- Do NOT use JSON or markdown headers
- Use field names exactly as shown
- Multi-line fields use YAML-style | indicator
- Content must be class-appropriate for Class {cls}
- Follow CBSE 2025-26 syllabus
- NO foreign language etymologies (Latin, Greek, etc.)
- NO mnemonics
- Each diagnostic question MUST have QUESTION, ANSWER, ANSWER_TYPE, WORKING, HINT
- Only include OPTIONS line for mcq type questions
- Only include UNIT line if the answer has a unit
- Only include FORMULA line if a formula is used
- OMIT the DIAGRAM section entirely if this node does not benefit from a visual
- If including DIAGRAM, hotspots should have 2-5 entries with X (0-400) and Y (0-300)

Output ONLY the marker content. No commentary."""


def build_supplement_prompt(nodes_batch, cls, subj):
    """Supplement prompt for already-enriched nodes — generates only missing fields, 3 nodes per call."""
    diagram_types = DIAGRAM_TYPES.get(subj, 'generic-flow')
    nodes_text = "\n\n".join(node_context(n) for n in nodes_batch)

    # Load existing enrichment for each node to include as context
    existing_parts = []
    for n in nodes_batch:
        nid = n.get("node_id", "")
        existing = load_existing_enrichment(nid)
        if existing:
            existing_parts.append(f"EXISTING ENRICHMENT for {nid}:\n{existing[:1500]}...")
        else:
            existing_parts.append(f"EXISTING ENRICHMENT for {nid}: (none found)")
    existing_text = "\n\n".join(existing_parts)

    node_ids = [n.get("node_id", "") for n in nodes_batch]

    return f"""You are an expert CBSE pedagogy designer. Generate SUPPLEMENTAL enrichment fields for {len(nodes_batch)} CBSE {subj} Class {cls} nodes.

These nodes ALREADY have basic enrichment (TITLE, DEFINITION, TEXT_WALKTHROUGH, etc).
You ONLY need to generate the MISSING fields below.

{nodes_text}

{existing_text}

For EACH node, generate ONLY these supplemental fields in MARKER format:

--- NODE {node_ids[0]} ---
ELI5: |
  (60-80 word child-friendly analogy. Use everyday Indian examples for Class {cls}.)
DIAGNOSTIC_QUESTIONS:
  Q1 (recall):
    QUESTION: ...
    ANSWER: ...
    ANSWER_TYPE: (number|text|mcq)
    UNIT: (if applicable, else omit)
    FORMULA: (if applicable, else omit)
    WORKING: (step-by-step solution)
    HINT: (hint for student)
    OPTIONS: [A, B, C, D] (ONLY for mcq)
  Q2 (reasoning):
    QUESTION: ...
    ANSWER: ...
    ANSWER_TYPE: ...
    WORKING: ...
    HINT: ...
  Q3 (evaluate):
    QUESTION: ...
    ANSWER: ...
    ANSWER_TYPE: ...
    WORKING: ...
    HINT: ...
  Q4 (apply):
    QUESTION: ...
    ANSWER: ...
    ANSWER_TYPE: ...
    WORKING: ...
    HINT: ...
  Q5 (create):
    QUESTION: ...
    ANSWER: ...
    ANSWER_TYPE: ...
    WORKING: ...
    HINT: ...
REMEDIATION_PATHS:
  Q1_FAILS -> REVIEW (prerequisite_node_id or "none") | GUIDANCE: ...
  Q2_FAILS -> REVIEW (prerequisite_node_id or "none") | GUIDANCE: ...
  Q3_FAILS -> REVIEW (prerequisite_node_id or "none") | GUIDANCE: ...
  Q4_FAILS -> REVIEW (prerequisite_node_id or "none") | GUIDANCE: ...
  Q5_FAILS -> REVIEW (prerequisite_node_id or "none") | GUIDANCE: ...
DIAGRAM:
  TYPE: (one of: {diagram_types} — or omit DIAGRAM entirely if not needed)
  TITLE: ...
  SVG_DESCRIPTION: ...
  HOTSPOTS:
    - LABEL: ... | X: (0-400) | Y: (0-300) | DESCRIPTION: ...
  ALT_TEXT: ...
  ANIMATE: (true|false)
  STEPS:
    - LABEL: ... | ACTION: ... | DURATION: (ms)

(Repeat for each node with --- NODE <node_id> --- separator)

RULES:
- Output as plain text MARKER format
- Start each node with --- NODE <node_id> ---
- Do NOT regenerate TITLE, DEFINITION, COGNITIVE_LEVEL, MASTERY_CRITERIA, TEXT_WALKTHROUGH, COMMON_MISCONCEPTION, ON_FAILURE — those already exist
- ONLY output: ELI5, DIAGNOSTIC_QUESTIONS (5 at different Bloom levels), REMEDIATION_PATHS, DIAGRAM
- Each diagnostic question MUST have QUESTION, ANSWER, ANSWER_TYPE, WORKING, HINT
- Only include OPTIONS for mcq type
- Only include UNIT/FORMULA if applicable
- OMIT DIAGRAM section entirely if node doesn't need a visual
- Content must be class-appropriate for Class {cls}
- Follow CBSE 2025-26 syllabus
- NO foreign language etymologies, NO mnemonics

Output ONLY the marker content for all {len(nodes_batch)} nodes. No commentary."""


# ─── API call (copied from gemini_content_gen.py) ────────────
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
    """Call Gemini with retry on 503/429 (same as gemini_content_gen.py)."""
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


# ─── Task processing (same pattern as generate_one) ─────────
def process_full_task(task):
    """Process a single unenriched node (full generation, 1 node/call)."""
    n, cls, subj, key = task
    nid = n.get("node_id", "")
    label = f"FULL_{nid}"

    out_file = BLOOM_DIR / f"{nid}.bloom.marker"
    if out_file.exists() and out_file.stat().st_size >= 500:
        return (label, True, "SKIP")

    prompt = build_full_prompt(n, cls, subj)

    try:
        text = call_with_retry(prompt, key, label)
        out_file.write_text(text, encoding="utf-8")
        size_kb = out_file.stat().st_size / 1024
        print(f'  [Key{KEYS.index(key)+1}] {label} DONE — {size_kb:.1f}KB')
        return (label, True, None)
    except Exception as e:
        print(f'  [Key{KEYS.index(key)+1}] {label} FAILED — {e}')
        return (label, False, str(e))


def process_supplement_task(task):
    """Process a batch of 3 enriched nodes (supplement generation)."""
    nodes_batch, cls, subj, key = task
    node_ids = [n.get("node_id", "") for n in nodes_batch]
    label = f"SUPP_{node_ids[0]}"

    out_file = BLOOM_DIR / f"{node_ids[0]}_batch.bloom.marker"
    if out_file.exists() and out_file.stat().st_size >= 500:
        return (label, True, "SKIP")

    prompt = build_supplement_prompt(nodes_batch, cls, subj)

    try:
        text = call_with_retry(prompt, key, label)
        out_file.write_text(text, encoding="utf-8")
        size_kb = out_file.stat().st_size / 1024
        print(f'  [Key{KEYS.index(key)+1}] {label} DONE — {size_kb:.1f}KB ({len(nodes_batch)} nodes)')
        return (label, True, None)
    except Exception as e:
        print(f'  [Key{KEYS.index(key)+1}] {label} FAILED — {e}')
        return (label, False, str(e))


# ─── Main (same round pattern as gemini_content_gen.py) ─────
def main():
    parser = argparse.ArgumentParser(description='Bloom Enrichment Generator (gemini-3.6-flash)')
    parser.add_argument('--mode', choices=['full', 'supplement', 'both'], default='both',
                        help='full=unenriched only, supplement=enriched only, both=all')
    parser.add_argument('--subject', type=str, default=None, help='Filter to one subject')
    parser.add_argument('--class-num', type=int, default=None, help='Filter to one class (6-12)')
    parser.add_argument('--dry-run', action='store_true', help='Show plan without calling API')
    parser.add_argument('--max-calls', type=int, default=None, help='Stop after N API calls')
    parser.add_argument('--batch-size', type=int, default=SUPPLEMENT_BATCH_SIZE,
                        help=f'Nodes per call in supplement mode (default {SUPPLEMENT_BATCH_SIZE})')
    args = parser.parse_args()

    print(f'\n{"="*70}')
    print(f'Bloom Enrichment Generator')
    print(f'{"="*70}')
    print(f'  Model: {MODEL}')
    print(f'  Keys: {len(KEYS)} (3 tasks per round, 60s break between rounds)')
    print(f'  Output: {BLOOM_DIR}')
    print(f'  Mode: {args.mode}')
    if args.max_calls:
        print(f'  Max calls: {args.max_calls}')
    print()

    # Load data
    print("Loading CBSE nodes...")
    all_nodes = load_all_nodes(args.subject, args.class_num)
    print(f"  Total nodes: {len(all_nodes)}")

    print("Loading enriched IDs from .marker files...")
    enriched_ids = load_enriched_ids()
    print(f"  Enriched: {len(enriched_ids)}")

    print("Loading bloom IDs from .bloom.marker files...")
    bloom_ids = load_bloom_ids()
    print(f"  Already have bloom: {len(bloom_ids)}")

    # Split into unenriched (full) and enriched (supplement)
    unenriched_nodes = [n for n in all_nodes
                        if n.get("node_id", "") not in enriched_ids
                        and n.get("node_id", "") not in bloom_ids]
    enriched_nodes = [n for n in all_nodes
                      if n.get("node_id", "") in enriched_ids
                      and n.get("node_id", "") not in bloom_ids]

    print(f"\n  Unenriched (need FULL): {len(unenriched_nodes)}")
    print(f"  Enriched (need SUPPLEMENT): {len(enriched_nodes)}")

    # Breakdown
    for label, nodes_list in [("UNENRICHED", unenriched_nodes), ("ENRICHED", enriched_nodes)]:
        if nodes_list:
            by_class = Counter(str(n.get("class_level", "?")) for n in nodes_list)
            by_subj = Counter(n.get("subject", "?") for n in nodes_list)
            print(f"\n  {label} by class:")
            for c in sorted(by_class.keys()):
                print(f"    C{c}: {by_class[c]}")
            print(f"  {label} by subject (top 10):")
            for s, c in by_subj.most_common(10):
                print(f"    {s}: {c}")

    # Build tasks (task = (node/batch, cls, subj, key))
    # Keys assigned at build time, round-robin (same as gemini_content_gen.py)
    all_tasks = []
    key_idx = 0

    if args.mode in ('full', 'both'):
        for n in unenriched_nodes:
            cls = n.get("class_level", 0)
            subj = n.get("subject", "unknown")
            key = KEYS[key_idx % len(KEYS)]
            key_idx += 1
            all_tasks.append(('full', (n, cls, subj, key)))

    if args.mode in ('supplement', 'both'):
        # Group enriched by (subject, class) for batching
        by_subj_class = defaultdict(list)
        for n in enriched_nodes:
            cls = n.get("class_level", 0)
            subj = n.get("subject", "unknown")
            by_subj_class[(subj, cls)].append(n)

        for (subj, cls), nodes in sorted(by_subj_class.items(),
                                          key=lambda x: (str(x[0][0]), str(x[0][1]))):
            for i in range(0, len(nodes), args.batch_size):
                batch = nodes[i:i + args.batch_size]
                key = KEYS[key_idx % len(KEYS)]
                key_idx += 1
                all_tasks.append(('supplement', (batch, cls, subj, key)))

    # Cap to max-calls if specified
    if args.max_calls:
        all_tasks = all_tasks[:args.max_calls]

    total = len(all_tasks)
    full_count = sum(1 for t in all_tasks if t[0] == 'full')
    supp_count = sum(1 for t in all_tasks if t[0] == 'supplement')

    print(f"\n{'='*70}")
    print(f"  PLAN:")
    print(f"    Full tasks (1 node/call): {full_count}")
    print(f"    Supplement tasks ({args.batch_size} nodes/call): {supp_count}")
    print(f"    Total calls: {total}")
    print(f"    Rounds: {(total + 2) // 3} (3 per round, 60s break)")
    print(f"{'='*70}")

    if args.dry_run:
        print(f"\n  [dry-run] Not calling API.")
        if all_tasks:
            print(f"\n  First 10 tasks:")
            for ttype, task in all_tasks[:10]:
                if ttype == 'full':
                    n = task[0]
                    print(f"    FULL  {n.get('node_id','')} | C{task[1]} | {task[2]} | {n.get('topic','')[:40]}")
                else:
                    ids = [n.get("node_id", "") for n in task[0]]
                    print(f"    SUPP  C{task[1]} {task[2]} | {len(task[0])} nodes: {ids}")
        return

    if not all_tasks:
        print("\n  Nothing to do — all nodes already have bloom enrichment!")
        return

    # Process in rounds of 3 (one per key) — same as gemini_content_gen.py
    success_count = 0
    fail_count = 0
    skip_count = 0

    for round_num, i in enumerate(range(0, total, 3)):
        batch = all_tasks[i:i+3]
        round_label = f'Round {round_num+1}/{(total+2)//3}'

        print(f'\n--- {round_label} ({len(batch)} tasks) ---')

        with ThreadPoolExecutor(max_workers=3) as executor:
            futures = {}
            for ttype, task in batch:
                if ttype == 'full':
                    futures[executor.submit(process_full_task, task)] = task
                else:
                    futures[executor.submit(process_supplement_task, task)] = task

            for future in as_completed(futures):
                label, success, err = future.result()
                if success:
                    if err and "SKIP" in str(err):
                        skip_count += 1
                    else:
                        success_count += 1
                else:
                    fail_count += 1

        # 60s break between rounds (not after last round)
        if i + 3 < total:
            print(f'\n  60s break before next round...')
            time.sleep(60)

    print(f'\n{"="*70}')
    print(f'COMPLETE: {success_count} succeeded, {skip_count} skipped, {fail_count} failed out of {total}')
    print(f'Output: {BLOOM_DIR}')
    print(f'{"="*70}')


if __name__ == "__main__":
    main()
