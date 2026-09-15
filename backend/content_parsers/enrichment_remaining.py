"""
Enrichment Remaining Generator
- Parses existing .marker files to find which nodes are already covered
- Only generates enrichment for MISSING nodes
- Batches missing nodes at size 40
- Continues batch numbering from existing max
- Uses key 1, 15 workers
"""
import asyncio
import aiohttp
import ssl
import json
import re
import time
import argparse
from pathlib import Path
from collections import defaultdict

# ─── Config ───
# Keys can be overridden via --key argument
KEY_0 = "sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK"
URL_0 = "https://api.claudeopus.pro/v1/messages"
KEY_1 = "sk-ant-opm-gCvQy5dW5Vaw09slQ6TH6ap31b30cwCl"
URL_1 = "https://api.opusmax.pro/v1/messages"

API_KEY = KEY_0
API_URL = URL_0
MODEL = "claude-opus-5"
MAX_TOKENS = 128000

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

NODES_DIR = Path(r"D:\platform\cbse_data\nodes\by_subject")
OUTPUT_DIR = Path(r"D:\platform\cbse_data\enrichment")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

BATCH_SIZE = 15
CONCURRENCY = 8
semaphore = asyncio.Semaphore(CONCURRENCY)


def load_cbse_nodes_c6_12(subject_filter=None, class_filter=None):
    """Load all CBSE nodes for classes 6-12 from by_subject files, in order."""
    nodes = []
    for f in sorted(NODES_DIR.glob("*.json")):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except Exception:
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
            nodes.append(node)
    return nodes


def count_existing_batches(subj, cls):
    """Count how many batch files exist for this subject+class, and return max batch number."""
    max_bnum = 0
    count = 0
    for f in OUTPUT_DIR.glob(f"{subj}_c{cls}_b*.marker"):
        if f.stat().st_size >= 500:
            m = re.match(rf"{re.escape(subj)}_c{cls}_b(\d+)\.marker", f.name)
            if m:
                bnum = int(m.group(1))
                if bnum > max_bnum:
                    max_bnum = bnum
                count += 1
    return count, max_bnum


def build_enrichment_prompt(nodes_batch, subject, cls):
    """Build prompt for generating enrichment for a batch of nodes."""
    node_lines = []
    for n in nodes_batch:
        nid = n.get("node_id", "")
        topic = n.get("topic", "")
        chapter = n.get("chapter", "")
        snippet = n.get("content_snippet", "")[:300]
        tags = n.get("concept_tags", [])
        if isinstance(tags, list):
            tags_str = ", ".join(str(t) for t in tags[:6])
        else:
            tags_str = str(tags)
        scope = n.get("scope_constraints", [])
        if isinstance(scope, list):
            scope_str = "; ".join(str(s) for s in scope[:4])
        else:
            scope_str = str(scope)
        node_lines.append(
            f"NODE: {nid}\n"
            f"  TOPIC: {topic}\n"
            f"  CHAPTER: {chapter}\n"
            f"  TAGS: {tags_str}\n"
            f"  CONTENT: {snippet}\n"
            f"  SCOPE: {scope_str}"
        )
    nodes_text = "\n\n".join(node_lines)

    return f"""You are an expert CBSE pedagogy designer. Generate enrichment content for CBSE {subject} Class {cls} nodes.

For EACH node below, generate the following enrichment fields in MARKER format:

--- NODE {nodes_batch[0].get('node_id', 'XXX')} ---
TITLE: (clear, student-friendly title)
DEFINITION: |
  (Detailed multi-paragraph definition explaining the concept thoroughly.
   Use plain text with line breaks. 150-400 words.
   Include relationships between sub-concepts where relevant.)
COGNITIVE_LEVEL: (remember|understand|apply|analyze|evaluate|create)
MASTERY_CRITERIA: |
  (What the student must be able to DO to demonstrate mastery.
   1-3 sentences. Observable and measurable.)
SCOPE_BOUNDARY: |
  (What NOT to teach at this level — concepts that belong to later classes.
   Be specific: "Do not teach X -- C11" format.)
TEXT_WALKTHROUGH: |
  (Narrative explanation walking the student through the concept.
   Connect to prior knowledge. Use analogies. 200-500 words.
   Write as if speaking to a Class {cls} student.)
DIAGNOSTIC_QUESTION:
  Q: (a diagnostic question testing understanding)
  A: (the acceptable answer — what a mastery-level student would say)
  LEVEL: (recall|application|reasoning)
COMMON_MISCONCEPTION: |
  (1-3 common misconceptions students have about this topic.
   For each: state the misconception, then explain why it's wrong.)
ON_FAILURE: |
  (If the student fails the diagnostic question, what should happen?
   - Which prerequisite to review
   - What simpler version of the concept to present
   - What analogy or example to use)

RULES:
- Output as plain text in the MARKER format shown above
- Use --- NODE <node_id> --- as separator between nodes
- Do NOT use JSON
- Do NOT use markdown headers (##)
- Use the field names exactly as shown (TITLE:, DEFINITION:, etc.)
- Multi-line fields use the YAML-style | indicator
- Content must be class-appropriate for Class {cls}
- Follow CBSE 2025-26 syllabus
- NO foreign language etymologies (Latin, Greek, etc.)
- NO mnemonics

NODES TO ENRICH ({len(nodes_batch)} nodes):

{nodes_text}
"""


async def call_claude(session, prompt, retries=8):
    body = {
        "model": MODEL,
        "max_tokens": MAX_TOKENS,
        "messages": [{"role": "user", "content": prompt}],
    }
    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
    }
    for attempt in range(retries):
        try:
            async with session.post(API_URL, json=body, headers=headers, ssl=CTX,
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
                    await asyncio.sleep(30 * (attempt + 1))
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
                        reset_match = re.search(r'reset in (\d+) minutes?', err_text.lower())
                        wait = int(reset_match.group(1)) * 60 + 30 if reset_match else 300
                        print(f"      token limit on key 1, waiting {wait}s")
                        await asyncio.sleep(wait)
                    else:
                        print(f"      error {resp.status}: {str(data)[:200]}")
                        await asyncio.sleep(15 * (attempt + 1))
        except Exception as e:
            print(f"      retry {attempt+1}: {str(e)[:150]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


async def process_batch(session, nodes_batch, subject, cls, batch_num, total_batches):
    async with semaphore:
        batch_id = f"{subject}_c{cls}_b{batch_num}"
        out_file = OUTPUT_DIR / f"{batch_id}.marker"

        if out_file.exists() and out_file.stat().st_size >= 500:
            print(f"  [{batch_id}] SKIP — already exists")
            return True

        prompt = build_enrichment_prompt(nodes_batch, subject, cls)
        print(f"  [{batch_id}] {len(nodes_batch)} nodes ({batch_num}/{total_batches}) calling Claude...")
        start = time.time()
        response = await call_claude(session, prompt)
        elapsed = time.time() - start

        if not response:
            print(f"  [{batch_id}] FAILED")
            return False
        if "Token limit" in response[:200] or "rate limit" in response[:200]:
            print(f"  [{batch_id}] FAILED — API limit")
            return False

        out_file.write_text(response, encoding="utf-8")
        size_kb = out_file.stat().st_size / 1024
        print(f"  [{batch_id}] DONE in {elapsed:.1f}s — {size_kb:.1f}KB")
        return True


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--class-num', type=int, default=None)
    parser.add_argument('--subject', default=None)
    parser.add_argument('--exclude-hindi', action='store_true')
    parser.add_argument('--key', type=int, default=0, help='0=claudeopus, 1=opusmax')
    parser.add_argument('--shard', type=int, default=0, help='0=first half, 1=second half')
    args = parser.parse_args()

    # Set key based on --key argument
    global API_KEY, API_URL
    if args.key == 1:
        API_KEY = KEY_1
        API_URL = URL_1
        key_label = "Key1 (opusmax)"
    else:
        API_KEY = KEY_0
        API_URL = URL_0
        key_label = "Key0 (claudeopus)"

    print("\n" + "=" * 70)
    print("Enrichment Remaining Generator (batch=40, only missing nodes)")
    print("=" * 70)
    print(f"  {key_label}, {CONCURRENCY} workers, batch size {BATCH_SIZE}")
    if args.shard:
        print(f"  Shard: second half (odd-indexed batches)")

    # Load all nodes
    print("\nLoading CBSE nodes...")
    nodes = load_cbse_nodes_c6_12(args.subject, args.class_num)
    print(f"  Total nodes: {len(nodes)}")

    # Group by (subject, class) — same order as original generator
    by_subj_class = defaultdict(list)
    for n in nodes:
        subj = n.get("subject", "unknown")
        cls = int(n.get("class_level", 0))
        if args.exclude_hindi and 'hindi' in subj.lower():
            continue
        by_subj_class[(subj, cls)].append(n)

    # For each (subject, class), figure out which nodes are already covered
    # Existing batches at size 15 cover nodes in order: b1=[0:15], b2=[15:30], etc.
    # Count existing batches and skip those nodes
    OLD_BATCH_SIZE = 15
    all_batches = []
    total_skipped = 0
    total_remaining = 0

    for (subj, cls), subj_nodes in sorted(by_subj_class.items()):
        existing_count, max_bnum = count_existing_batches(subj, cls)
        nodes_done = existing_count * OLD_BATCH_SIZE
        remaining = subj_nodes[nodes_done:]

        if not remaining:
            print(f"    {subj:25s} C{cls}: {len(subj_nodes):4d} nodes — ALL DONE ({existing_count} batches)")
            total_skipped += len(subj_nodes)
            continue

        # Batch remaining at size 40, continue numbering from max_bnum
        n_new = (len(remaining) + BATCH_SIZE - 1) // BATCH_SIZE
        for i in range(0, len(remaining), BATCH_SIZE):
            batch = remaining[i:i + BATCH_SIZE]
            batch_num = max_bnum + (i // BATCH_SIZE) + 1
            all_batches.append((batch, subj, cls, batch_num, n_new))

        total_skipped += nodes_done
        total_remaining += len(remaining)
        print(f"    {subj:25s} C{cls}: {len(subj_nodes):4d} nodes — {nodes_done} done ({existing_count} batches), {len(remaining)} remaining -> {n_new} new batches (b{max_bnum+1}-b{max_bnum+n_new})")

    print(f"\n  Total nodes: {len(nodes)}")
    print(f"  Already covered (skipped): {total_skipped}")
    print(f"  Remaining to generate: {total_remaining}")
    print(f"  New batches at size {BATCH_SIZE}: {len(all_batches)}")

    # Shard: key 0 gets even-indexed batches, key 1 gets odd-indexed
    if args.key == 1:
        all_batches = [b for i, b in enumerate(all_batches) if i % 2 == 1]
        print(f"  Sharded to key 1 (odd): {len(all_batches)} batches")
    else:
        all_batches = [b for i, b in enumerate(all_batches) if i % 2 == 0]
        print(f"  Sharded to key 0 (even): {len(all_batches)} batches")

    if args.dry_run:
        print("\n  [dry-run] Not calling API.")
        return

    if not all_batches:
        print("\n  Nothing to do — all nodes already have enrichment!")
        return

    # Skip key check — just start processing (retries handle rate limits)
    print(f"\n  Starting {CONCURRENCY} workers with {key_label}...\n")

    print(f"  Starting {CONCURRENCY} workers...\n")
    connector = aiohttp.TCPConnector(limit=CONCURRENCY)
    async with aiohttp.ClientSession(connector=connector) as session:
        results = await asyncio.gather(*[process_batch(session, *b) for b in all_batches])

    ok = sum(1 for r in results if r)
    fail = sum(1 for r in results if not r)
    print(f"\n{'='*70}\n  DONE — {ok} ok, {fail} failed / {len(all_batches)}\n{'='*70}")


if __name__ == "__main__":
    asyncio.run(main())
