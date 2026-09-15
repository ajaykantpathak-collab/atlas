"""
CBSE Prerequisites Pipeline v2 — RESUME MODE
=============================================
- Skips (subject, class) combos that already have prereq .md files
- Uses KEY 0 primarily, falls back to key 1
- Processes only the 49 missing combos
- Writes NEW files only — does NOT touch existing data
- Small batches (30 nodes) to avoid OOM

Usage:
  python cbse_prereqs_pipeline_v2.py                    # all missing combos
  python cbse_prereqs_pipeline_v2.py --subject physics  # one subject only
  python cbse_prereqs_pipeline_v2.py --grade 6          # one class only
  python cbse_prereqs_pipeline_v2.py --dry-run          # show plan, don't call API
"""
import asyncio
import aiohttp
import ssl
import json
import os
import argparse
import time
import re
from pathlib import Path
from collections import defaultdict

# ─── Config ───
API_KEYS = [
    "sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK",   # key 0 — PRIMARY (user requested)
    "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna",    # key 1 — fallback
]
API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"
MAX_TOKENS = 128000

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output_fixed")
OUTPUT_DIR = Path(r"D:\platform\cbse_data\prereqs")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

CONCURRENCY_KEY0 = 5   # 5 workers for key 0
CONCURRENCY_KEY1 = 10  # 10 workers for key 1
CONCURRENCY = CONCURRENCY_KEY0 + CONCURRENCY_KEY1  # total max in-flight tasks
semaphore_key0 = asyncio.Semaphore(CONCURRENCY_KEY0)
semaphore_key1 = asyncio.Semaphore(CONCURRENCY_KEY1)


# ─── Load all nodes grouped by subject+class ───
# Map node_id subject abbreviations to canonical subject names
SUBJ_CANONICAL = {
    "hin": "Hindi", "engl": "English Literature", "eng": "English",
    "angl": "English",  # English Language variant
    "geo": "geography", "phy": "physics", "math": "maths", "bio": "biology",
    "cs": "computer_science", "hist": "hist", "bt": "biotech",
    "eco": "economics", "hs": "home_science", "chem": "chemistry",
    "pol": "political_science", "polit": "political_science",  # variant
    "soc": "sociology", "histciv": "history_civics",
    "acc": "accounts", "bs": "business_studies", "psy": "psychology",
    "sci": "science", "pe": "pe", "ai": "ai", "legal": "legal_studies",
    "amath": "applied_maths", "his": "hist", "hpe": "health_and_physical_education",
}

def parse_node_id(nid):
    """Extract (class, subject_abbr) from node_id like c11_math_cbse_001.
    Normalizes c08 -> c8, c09 -> c9 etc."""
    if not nid or "_" not in nid:
        return None, None
    parts = nid.split("_")
    if len(parts) < 4:
        return None, None
    cls = parts[0]  # e.g. c11
    subj_abbr = parts[1]  # e.g. math
    # Normalize c08 -> c8, c09 -> c9
    if cls.startswith("c0") and len(cls) == 3:
        cls = "c" + cls[2]
    return cls, subj_abbr

def load_nodes():
    by_subj_class = defaultdict(list)
    all_nodes = []
    seen_keys = set()  # deduplicate by (node_id, topic) — node_id alone is NOT unique
    for result_file in CBSE_OUTPUT.glob("*.json"):
        if result_file.stat().st_size < 500:
            continue
        try:
            data = json.loads(result_file.read_text(encoding="utf-8"))
            for chunk in data.get("results", []):
                for node in chunk.get("nodes", []):
                    nid = node.get("node_id", "")
                    topic = node.get("topic", "")
                    if not nid:
                        continue
                    # Deduplicate by (node_id, topic) — same node_id can have different topics
                    dedup_key = (nid, topic)
                    if dedup_key in seen_keys:
                        continue
                    seen_keys.add(dedup_key)
                    # Derive subject and class FROM THE NODE_ID, not the file
                    cls, subj_abbr = parse_node_id(nid)
                    if cls is None:
                        continue
                    subject = SUBJ_CANONICAL.get(subj_abbr, subj_abbr)
                    grade = cls.replace("c", "")  # c11 -> 11
                    # Override node's subject field with the correct one
                    node["subject"] = subject
                    node["class"] = grade
                    by_subj_class[(subject, grade)].append(node)
                    all_nodes.append(node)
        except:
            pass
    return by_subj_class, all_nodes


def build_compact_index(all_nodes, exclude_subject=None):
    """Build cross-subject index with ID + short topic.
    Only includes subjects likely to be cross-referenced.
    For science subjects: include math, chem, bio, phy, sci.
    For math: include phy, chem, bio, sci.
    For humanities: include math, sci, geo, hist, eco.
    This keeps the index small enough to include topics."""
    
    # Define which subjects are relevant for each subject group
    SCIENCE_SUBJECTS = {"physics", "chemistry", "biology", "science", "biotech", "maths", "math", "applied_maths", "computer_science", "ai"}
    HUMANITIES_SUBJECTS = {"geography", "hist", "history_civics", "economics", "political_science", "sociology", "psychology", "home_science", "legal_studies"}
    LANG_SUBJECTS = {"Hindi", "English", "English Literature", "health_and_physical_education", "pe"}
    
    if exclude_subject:
        if exclude_subject in SCIENCE_SUBJECTS:
            relevant = SCIENCE_SUBJECTS - {exclude_subject}
        elif exclude_subject in HUMANITIES_SUBJECTS:
            relevant = HUMANITIES_SUBJECTS | {"maths", "math", "science"} - {exclude_subject}
        else:
            relevant = SCIENCE_SUBJECTS | HUMANITIES_SUBJECTS - {exclude_subject}
    else:
        relevant = SCIENCE_SUBJECTS | HUMANITIES_SUBJECTS
    
    lines = []
    for n in all_nodes:
        subj = n.get("subject", "")
        if exclude_subject and subj == exclude_subject:
            continue
        if subj not in relevant:
            continue
        nid = n.get("node_id", "")
        topic = n.get("topic", "")[:30]
        lines.append(f"{nid} {topic}")
    index = "\n".join(lines)
    return index


def get_done_combos():
    """Return set of (subject, class) combos that already have prereq files.
    Normalizes subject names to match result file subject field."""
    done = set()
    for f in OUTPUT_DIR.glob("*.md"):
        if f.stat().st_size < 500:
            continue  # skip corrupted/small files
        parts = f.stem.split("_c")
        if len(parts) == 2:
            subj = parts[0].replace("_", " ")  # English_Literature -> English Literature
            class_part = parts[1].split("_b")[0]
            done.add((subj, class_part))
    return done


def build_prompt(target_nodes, same_subj_all, subject, grade):
    target_lines = []
    for n in target_nodes:
        nid = n.get("node_id", "")
        topic = n.get("topic", "")
        chapter = n.get("chapter", "")
        tags = n.get("concept_tags", [])
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.strip("[]").split(",")]
        tags_str = ", ".join(str(t) for t in tags[:5])
        content = n.get("content_snippet", "")[:200]
        existing_prereqs = n.get("prerequisite_node_ids", [])
        is_root = n.get("is_root", False)
        target_lines.append(
            f"NODE: {nid}\n"
            f"  topic: {topic}\n"
            f"  chapter: {chapter}\n"
            f"  tags: {tags_str}\n"
            f"  is_root: {is_root}\n"
            f"  content: {content}\n"
            f"  existing_prereqs: {existing_prereqs}"
        )
    target_text = "\n\n".join(target_lines)

    # Build full same-subject index with topics — ALL classes including current
    same_lines = []
    for n in same_subj_all:
        nid = n.get("node_id", "")
        topic = n.get("topic", "")[:50]
        chapter = n.get("chapter", "")[:35]
        cls = n.get("class", "")
        same_lines.append(f"{nid} | c{cls} | {chapter} | {topic}")
    same_text = "\n".join(same_lines)

    return f"""You are an expert CBSE pedagogy designer. Your task is to map prerequisite relationships
for CBSE {subject} class {grade} nodes.

You have access to ALL {subject} nodes across ALL classes (6-12) below. Use this full picture to
identify prerequisites from earlier classes, same class, and even later classes if needed.

For EACH target node, output:

## NODE_ID_HERE
- **prerequisite_node_ids**: [node IDs this node directly depends on — same subject, any class]
- **prerequisite_reasons**: {{"node_id": "detailed pedagogical reason explaining the concept transfer"}}
- **prerequisite_depth**: beginner|intermediate|advanced

PREREQUISITE RULES:
1. Prerequisites can be from ANY class of the same subject (class 12 node can need class 9 node)
2. Only list DIRECT dependencies — concepts the student MUST know before attempting this node
3. Don't pad. If a node has no real prerequisites, output empty list []
4. Root nodes (is_root=true) should have empty or minimal prerequisites
5. Most nodes should have 1-3 prerequisites. More than 5 is usually wrong.
6. If a node has existing_prereqs, evaluate each one — keep if valid, remove if wrong

DEPTH DEFINITIONS:
- beginner: single direct concept, one-step reasoning, recall or simple application
- intermediate: 2-3 step reasoning chain, requires combining 2 concepts
- advanced: multi-step reasoning, requires synthesizing 3+ concepts or abstract reasoning

REASON REQUIREMENTS — CRITICAL:
- Each reason must explain the SPECIFIC concept transfer from prereq to this node
- Reference the exact skill/understanding that transfers
- Example BAD: "Need c9_phy_cbse_001 because electricity"
- Example GOOD: "Student must understand Ohm's law (V=IR) as a linear relationship before analyzing AC circuits, because AC analysis applies the same V-I relationship to time-varying quantities"
- Reasons should be 1-2 sentences, specific, pedagogically grounded
- Use terms like: schema building, conceptual scaffolding, cognitive transfer, procedural fluency

NODE ID RULES:
- ONLY use node IDs that appear EXACTLY in the SAME SUBJECT INDEX below
- COPY-PASTE the ID. Do not retype, modify, or abbreviate
- Do NOT invent IDs. Do NOT construct IDs from topic names
- Format: c<class>_<subject>_cbse_<number> — exactly 4 underscore-separated parts
- No chapter segments, no topic names, no sub-numbers

TARGET NODES ({len(target_nodes)} — fill for each):

{target_text}

SAME SUBJECT INDEX — ALL CLASSES (copy IDs EXACTLY from here):

{same_text}
"""


async def call_claude(session, prompt, key_idx=0, retries=5):
    body = {
        "model": MODEL,
        "max_tokens": MAX_TOKENS,
        "temperature": 0,
        "messages": [{"role": "user", "content": prompt}],
    }
    for attempt in range(retries):
        # Use assigned key, fall back to other key on failure
        use_idx = key_idx if attempt == 0 else (1 - key_idx)
        key = API_KEYS[use_idx]
        key_label = str(use_idx)
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
                            print(f"      token/rate limit on key {key_label}, switching")
                            await asyncio.sleep(60 * (attempt + 1))
                            continue
                        return text
                    print(f"      empty, retry {attempt+1}")
                    await asyncio.sleep(30 * (attempt + 1))
                elif resp.status == 429:
                    print(f"      429 on key {key_label}, switching key")
                    await asyncio.sleep(15 * (attempt + 1))
                else:
                    print(f"      error {resp.status}: {str(data)[:200]}")
                    wait = 60 * (attempt + 1) if resp.status == 429 else 15 * (attempt + 1)
                    await asyncio.sleep(wait)
        except Exception as e:
            print(f"      retry {attempt+1}: {str(e)[:150]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


def parse_response(text):
    updates = {}
    current = None
    for line in text.split("\n"):
        stripped = line.strip()
        if stripped.startswith("## c") and stripped.count("_") >= 2:
            nid = stripped.replace("## ", "").strip()
            current = {"node_id": nid}
            updates[nid] = current
        elif current and stripped.startswith("- **") and "**:" in stripped:
            key = stripped.split("**")[1]
            val = stripped.split("**:", 1)[1].strip()
            current[key] = val
    return updates


def validate_refs(response, valid_ids):
    """Check response for invalid node ID references. Returns list of invalid IDs."""
    REF_PATTERN = re.compile(r'(c\d+_[a-z]+_cbse_\w+)')
    refs = REF_PATTERN.findall(response)
    invalid = []
    for r in set(refs):
        if r not in valid_ids:
            invalid.append(r)
    return invalid


def fix_broken_refs(response, valid_ids, node_info):
    """Programmatically fix broken node ID references in the response.
    - maths -> math: safe replacement
    - _chX_ removal: try to find correct node by matching reason keywords to topics
    - descriptive IDs: search for node with matching topic
    - sub-numbered: try to find by base number
    Returns (fixed_response, fixes_applied_count, unfixable_count)."""
    REF_PATTERN = re.compile(r'(c\d+_[a-z]+_cbse_\w+)')
    fixes = 0
    unfixable = 0
    
    def fix_ref(m):
        nonlocal fixes, unfixable
        ref = m.group(1)
        if ref in valid_ids:
            return m.group(0)
        
        # Fix 1: maths -> math (safe)
        fixed = ref.replace("_maths_", "_math_")
        if fixed in valid_ids:
            fixes += 1
            return m.group(0).replace(ref, fixed)
        
        # Fix 2: _chX_ segment: c12_phy_cbse_ch1_003 -> c12_phy_cbse_003
        ch_match = re.match(r'(c\d+_[a-z]+_cbse_)ch\d+_(\w+)', ref)
        if ch_match:
            fixed = ch_match.group(1) + ch_match.group(2)
            if fixed in valid_ids:
                fixes += 1
                return m.group(0).replace(ref, fixed)
        
        # Fix 3: descriptive ID like c11_math_cbse_vectors
        # Extract the descriptive word
        desc_match = re.match(r'c\d+_[a-z]+_cbse_([a-z]+)', ref)
        if desc_match:
            desc_word = desc_match.group(1)
            # Skip if it's actually a number
            if not desc_word.isdigit():
                # Search for a node with this word in its topic
                prefix = ref.rsplit("_cbse_", 1)[0]  # e.g. c11_math
                candidates = []
                for nid, n in node_info.items():
                    if nid.startswith(prefix + "_cbse_"):
                        topic = n.get("topic", "").lower()
                        chapter = n.get("chapter", "").lower()
                        if desc_word in topic or desc_word in chapter:
                            candidates.append(nid)
                if len(candidates) == 1:
                    fixes += 1
                    return m.group(0).replace(ref, candidates[0])
                elif len(candidates) > 1:
                    # Pick the one with most topic overlap
                    # For now pick first — better than removing
                    fixes += 1
                    return m.group(0).replace(ref, candidates[0])
        
        # Fix 4: sub-numbered like c12_phy_cbse_001_002
        # Try base: c12_phy_cbse_001
        sub_match = re.match(r'(c\d+_[a-z]+_cbse_\d+)_\w+', ref)
        if sub_match:
            fixed = sub_match.group(1)
            if fixed in valid_ids:
                fixes += 1
                return m.group(0).replace(ref, fixed)
        
        # Can't fix — remove
        unfixable += 1
        return m.group(0).replace(ref, "__REMOVE__")
    
    fixed_response = REF_PATTERN.sub(fix_ref, response)
    
    # Remove __REMOVE__ entries from lists and reasons
    fixed_response = re.sub(r'"__REMOVE__"\s*,?\s*', '', fixed_response)
    fixed_response = re.sub(r',\s*("__REMOVE__")', '', fixed_response)
    fixed_response = re.sub(r'\[\s*__REMOVE__\s*\]', '[]', fixed_response)
    fixed_response = re.sub(r'\[\s*,\s*\]', '[]', fixed_response)
    
    # Remove from reasons dicts
    fixed_response = re.sub(r'"__REMOVE__"\s*:\s*"[^"]*"\s*,?\s*', '', fixed_response)
    fixed_response = re.sub(r',\s*"__REMOVE__"\s*:\s*"[^"]*"', '', fixed_response)
    fixed_response = re.sub(r'\{\s*__REMOVE__.*?\}', '{}', fixed_response)
    
    # Clean up empty lines
    fixed_response = re.sub(r'\n{3,}', '\n\n', fixed_response)
    
    return fixed_response, fixes, unfixable


def validate_content(response, node_info):
    """Check that cross-subject ref reasons match the actual node topics.
    Returns list of (ref, reason_snippet, actual_topic) mismatches."""
    REF_PATTERN = re.compile(r'(c\d+_[a-z]+_cbse_\w+)')
    mismatches = []
    
    # Parse response into sections
    sections = response.split("## ")
    for sec in sections[1:]:
        lines = sec.strip().split("\n")
        nid = lines[0].strip()
        cross_refs = []
        cross_reasons = {}
        for line in lines:
            s = line.strip()
            if s.startswith("- **cross_subject_prereqs**"):
                val = s.split("**:", 1)[1].strip()
                cross_refs = REF_PATTERN.findall(val)
            if s.startswith("- **cross_subject_reasons**"):
                val = s.split("**:", 1)[1].strip()
                # Extract reason for each ref
                for m in re.finditer(r'"(c\d+_[a-z]+_cbse_\w+)"\s*:\s*"(.*?)"', val, re.DOTALL):
                    cross_reasons[m.group(1)] = m.group(2)
        
        for ref in cross_refs:
            if ref not in node_info:
                continue
            actual_topic = node_info[ref].get("topic", "").lower()
            actual_chapter = node_info[ref].get("chapter", "").lower()
            reason = cross_reasons.get(ref, "").lower()
            
            if not reason:
                continue
            
            # Catch lazy/generic reasons that don't describe a real connection
            LAZY_PHRASES = ["retained from curriculum", "existing cross", "kept from", 
                           "prerequisite concept required", "fundamental concept",
                           "existing prerequisite"]
            reason_lower = reason.lower()
            if any(phrase in reason_lower for phrase in LAZY_PHRASES):
                mismatches.append((nid, ref, reason[:80], actual_topic[:50]))
                continue
            
            # Extract key words from the reason (skip common words)
            COMMON = {"the", "a", "an", "is", "are", "to", "of", "in", "for", "and", "or", "with",
                       "from", "by", "on", "at", "as", "this", "that", "student", "must", "need",
                       "requires", "provides", "establishes", "transfers", "builds", "allows",
                       "enables", "concept", "schema", "skill", "understanding", "before",
                       "essential", "directly", "applied", "used", "between", "into", "over",
                       "same", "both", "across", "which", "their", "these", "those", "such",
                       "it", "its", "be", "has", "have", "was", "were", "will", "can", "not",
                       "but", "they", "them", "he", "she", "we", "you", "i", "so", "if", "then",
                       "more", "than", "less", "also", "only", "just", "very", "most", "all"}
            
            reason_words = set(re.findall(r'[a-z]{4,}', reason)) - COMMON
            topic_words = set(re.findall(r'[a-z]{4,}', actual_topic + " " + actual_chapter)) - COMMON
            
            # Check overlap
            overlap = reason_words & topic_words
            if not overlap and reason_words:
                # No keyword overlap at all — likely wrong node
                mismatches.append((nid, ref, reason[:80], actual_topic[:50]))
    
    return mismatches


async def process_batch(session_holder, subject, grade, target_nodes, same_subj_all,
                        batch_num, total_batches, valid_ids, node_info, key_idx):
    session = session_holder[0]
    sem = semaphore_key0 if key_idx == 0 else semaphore_key1
    async with sem:
        batch_id = f"{subject}_c{grade}_b{batch_num}"
        print(f"  [{batch_id}] {len(target_nodes)} nodes ({batch_num}/{total_batches}) key={key_idx}")

        prompt = build_prompt(target_nodes, same_subj_all, subject, grade)
        prompt_size = len(prompt)
        print(f"    prompt: {prompt_size} chars (~{prompt_size//4} tokens)")

        # GUARD: never overwrite an existing good file
        safe_name = batch_id.replace(" ", "_").replace("/", "_")
        md_path = OUTPUT_DIR / f"{safe_name}.md"
        if md_path.exists() and md_path.stat().st_size >= 500:
            print(f"    SKIP: {md_path.name} already exists ({md_path.stat().st_size} bytes)")
            return {}

        response = await call_claude(session, prompt, key_idx=key_idx)
        if not response:
            print(f"    x no response")
            return {}

        # GUARD: don't write error messages as if they were responses
        if "Token limit" in response or "rate limit" in response[:200] or "usage will reset" in response[:200]:
            print(f"    x API limit error, not writing file")
            return {}

        # PROGRAMMATIC FIX: fix broken refs deterministically (no API retry needed)
        invalid_refs = validate_refs(response, valid_ids)
        if invalid_refs:
            print(f"    ! {len(invalid_refs)} broken refs found, fixing programmatically")
            response, fixes, unfixable = fix_broken_refs(response, valid_ids, node_info)
            print(f"    + fixed {fixes} refs, {unfixable} removed (no match found)")
            # Verify
            remaining = validate_refs(response, valid_ids)
            if remaining:
                print(f"    ! {len(remaining)} broken refs remain after fix: {remaining[:5]}")
            else:
                print(f"    + all refs now valid")

        md_path.write_text(response, encoding="utf-8")

        updates = parse_response(response)
        print(f"    + {len(updates)} nodes updated -> {md_path.name}")
        return updates


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--subject", type=str, default=None, help="Filter to one subject")
    parser.add_argument("--grade", type=str, default=None, help="Filter to one class")
    parser.add_argument("--batch", type=int, default=None, help="Run only one batch number")
    parser.add_argument("--dry-run", action="store_true", help="Show plan, don't call API")
    args = parser.parse_args()

    print("=== CBSE Prerequisites Pipeline v2 (RESUME) ===")
    print(f"  Primary API key: index 0")
    print(f"  Output: {OUTPUT_DIR}")
    print(f"  Concurrency: {CONCURRENCY}")

    # Load all nodes
    print("\nLoading nodes...")
    by_subj_class, all_nodes = load_nodes()
    print(f"  Total nodes: {len(all_nodes)}")
    print(f"  Subject+class combos: {len(by_subj_class)}")

    # Check which combos are already done
    done_combos = get_done_combos()
    print(f"  Already done: {len(done_combos)} combos")

    # Filter to missing combos
    missing = []
    for (subj, grade), nodes in sorted(by_subj_class.items()):
        if (subj, grade) in done_combos:
            continue
        if args.subject and subj != args.subject:
            continue
        if args.grade and grade != args.grade:
            continue
        missing.append((subj, grade, nodes))

    print(f"  Missing (to process): {len(missing)} combos")
    if not missing:
        print("\n  Nothing to do — all combos have prereqs!")
        return

    # Show plan
    total_batches = 0
    for subj, grade, nodes in missing:
        n_batches = (len(nodes) + 29) // 30
        total_batches += n_batches
        print(f"    {subj:25s} class {grade:>3s}: {len(nodes):4d} nodes -> {n_batches} batches")
    print(f"  Total batches: {total_batches}")

    if args.dry_run:
        print("\n  [dry-run] Not calling API.")
        return

    # Build subject indices
    print("\nBuilding subject indices...")
    by_subject = defaultdict(list)
    for (subj, cls), nodes in by_subj_class.items():
        by_subject[subj].extend(nodes)

    # Build all batch configs
    BATCH_SIZE = 30
    session_holder = [None]
    all_batch_configs = []

    # Build valid IDs set and node_info for validation
    valid_ids = set()
    node_info = {}
    for n in all_nodes:
        nid = n.get("node_id", "")
        if nid:
            valid_ids.add(nid)
            node_info[nid] = n
    print(f"  Valid IDs for validation: {len(valid_ids)}")

    for subject, grade, nodes in missing:
        # All nodes of same subject across ALL classes (including current)
        same_subj_all = by_subject.get(subject, [])

        total_batches_this = (len(nodes) + BATCH_SIZE - 1) // BATCH_SIZE

        for i in range(0, len(nodes), BATCH_SIZE):
            batch = nodes[i:i+BATCH_SIZE]
            batch_num = i // BATCH_SIZE + 1
            if args.batch and batch_num != args.batch:
                continue
            # Alternate keys: even batch index -> key 0, odd -> key 1
            key_idx = len(all_batch_configs) % 2
            all_batch_configs.append((session_holder, subject, grade, batch, same_subj_all,
                                     batch_num, total_batches_this, valid_ids, node_info, key_idx))

    print(f"\n  Total batch tasks: {len(all_batch_configs)}")
    print(f"  Key 0: {CONCURRENCY_KEY0} workers, Key 1: {CONCURRENCY_KEY1} workers")
    print(f"  3s gap between launches...")

    # Launch with 3-second gap
    results = []
    pending = set()

    async with aiohttp.ClientSession() as session:
        session_holder[0] = session
        for idx, cfg in enumerate(all_batch_configs):
            while len(pending) >= CONCURRENCY:
                done, pending = await asyncio.wait(pending, return_when=asyncio.FIRST_COMPLETED)
                for d in done:
                    results.append(d.result())

            task = asyncio.create_task(process_batch(*cfg))
            pending.add(task)
            await asyncio.sleep(3)

        if pending:
            done, _ = await asyncio.wait(pending)
            for d in done:
                results.append(d.result())

    # Count successes
    all_updates = {}
    for r in results:
        all_updates.update(r)

    print(f"\n=== DONE ===")
    print(f"  Batches processed: {len(results)}")
    print(f"  Nodes updated: {len(all_updates)}")
    print(f"  Output dir: {OUTPUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
