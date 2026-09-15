"""
CBSE Enrichment Generator — generates .marker enrichment files for CBSE C6-12 nodes.

Uses key 1 with 10 workers.
Reads nodes from D:\\platform\\cbse_data\\nodes\\by_subject\\*.json
Writes NEW enrichment markers to D:\\platform\\cbse_data\\enrichment/

Enrichment fields (same as CISCE .marker format):
  TITLE, DEFINITION, COGNITIVE_LEVEL, MASTERY_CRITERIA, SCOPE_BOUNDARY,
  TEXT_WALKTHROUGH, DIAGNOSTIC_QUESTION, COMMON_MISCONCEPTION, ON_FAILURE

Usage:
    python cbse_enrichment_generator.py --dry-run
    python cbse_enrichment_generator.py
    python cbse_enrichment_generator.py --subject physics
    python cbse_enrichment_generator.py --class-num 10
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

# ─── Config (key 1 only, 10 workers) ───
API_KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"  # key 1
API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"
MAX_TOKENS = 128000

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

# ─── Paths ───
NODES_DIR = Path(r"D:\platform\cbse_data\nodes\by_subject")
OUTPUT_DIR = Path(r"D:\platform\cbse_data\enrichment")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ─── Concurrency: 15 workers on key 1 ───
CONCURRENCY = 15
semaphore = asyncio.Semaphore(CONCURRENCY)

# ─── Batch size: 15 nodes per API call (keeps prompt manageable) ───
BATCH_SIZE = 15


def load_done_node_ids():
    """Parse all existing .marker files and return a set of done node_ids."""
    done = set()
    for f in OUTPUT_DIR.glob("*.marker"):
        try:
            text = f.read_text(encoding="utf-8")
            for m in re.finditer(r"--- NODE (\S+) ---", text):
                done.add(m.group(1))
        except Exception:
            continue
    return done


def load_cbse_nodes_c6_12(subject_filter=None, class_filter=None):
    """Load all CBSE nodes for classes 6-12 from by_subject files."""
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
        "temperature": 0,
        "messages": [{"role": "user", "content": prompt}],
    }
    for attempt in range(retries):
        headers = {
            "x-api-key": API_KEY,
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
                            reset_match = re.search(r'reset in (\d+) minutes?', text_lower)
                            wait = int(reset_match.group(1)) * 60 + 30 if reset_match else 300
                            print(f"      token limit on key 1, waiting {wait}s")
                            await asyncio.sleep(wait)
                            continue
                        return text
                    print(f"      empty, retry {attempt+1}")
                    await asyncio.sleep(30 * (attempt + 1))
                elif resp.status == 429:
                    print(f"      429, waiting 300s")
                    await asyncio.sleep(300)
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

        # GUARD: never overwrite existing files
        if out_file.exists() and out_file.stat().st_size >= 500:
            print(f"  [{batch_id}] SKIP — already exists ({out_file.stat().st_size} bytes)")
            return True

        prompt = build_enrichment_prompt(nodes_batch, subject, cls)
        print(f"  [{batch_id}] {len(nodes_batch)} nodes ({batch_num}/{total_batches}) calling Claude...")

        start = time.time()
        response = await call_claude(session, prompt)
        elapsed = time.time() - start

        if not response:
            print(f"  [{batch_id}] FAILED — no response")
            return False

        if "Token limit" in response[:200] or "rate limit" in response[:200]:
            print(f"  [{batch_id}] FAILED — API limit error")
            return False

        out_file.write_text(response, encoding="utf-8")
        size_kb = out_file.stat().st_size / 1024
        print(f"  [{batch_id}] DONE in {elapsed:.1f}s — {size_kb:.1f}KB")
        return True


async def main():
    parser = argparse.ArgumentParser(description='Generate CBSE enrichment markers for C6-12')
    parser.add_argument('--subject', type=str, default=None, help='Filter to one subject')
    parser.add_argument('--class-num', type=int, default=None, help='Filter to one class (6-12)')
    parser.add_argument('--dry-run', action='store_true', help='Show plan without calling API')
    parser.add_argument('--exclude-hindi', action='store_true', help='Skip Hindi subject')
    args = parser.parse_args()

    print("\n=== CBSE Enrichment Generator (C6-12) ===")
    print(f"  Key 1 only, {CONCURRENCY} workers")
    print(f"  Output: {OUTPUT_DIR}")

    # Load nodes
    print("\nLoading CBSE nodes for C6-12...")
    nodes = load_cbse_nodes_c6_12(args.subject, args.class_num)
    print(f"  Total nodes: {len(nodes)}")

    # Group by (subject, class)
    by_subj_class = defaultdict(list)
    for n in nodes:
        subj = n.get("subject", "unknown")
        cls = int(n.get("class_level", 0))
        if args.exclude_hindi and 'hindi' in subj.lower():
            continue
        by_subj_class[(subj, cls)].append(n)

    # Build batches
    all_batches = []
    for (subj, cls), subj_nodes in sorted(by_subj_class.items()):
        n_batches = (len(subj_nodes) + BATCH_SIZE - 1) // BATCH_SIZE
        for i in range(0, len(subj_nodes), BATCH_SIZE):
            batch = subj_nodes[i:i + BATCH_SIZE]
            batch_num = i // BATCH_SIZE + 1
            all_batches.append((batch, subj, cls, batch_num, n_batches))

    # Filter out existing (filename-based skip preserves all done work)
    new_batches = []
    for batch, subj, cls, bnum, ntotal in all_batches:
        batch_id = f"{subj}_c{cls}_b{bnum}"
        out_file = OUTPUT_DIR / f"{batch_id}.marker"
        if not out_file.exists() or out_file.stat().st_size < 500:
            new_batches.append((batch, subj, cls, bnum, ntotal))
    all_batches = new_batches

    # Show plan
    print(f"\n  Subject+class combos: {len(by_subj_class)}")
    print(f"  Total batches to generate: {len(all_batches)}")
    for (subj, cls), subj_nodes in sorted(by_subj_class.items()):
        n_batches = (len(subj_nodes) + BATCH_SIZE - 1) // BATCH_SIZE
        existing = sum(1 for b in range(1, n_batches + 1)
                       if (OUTPUT_DIR / f"{subj}_c{cls}_b{b}.marker").exists()
                       and (OUTPUT_DIR / f"{subj}_c{cls}_b{b}.marker").stat().st_size >= 500)
        print(f"    {subj:25s} C{cls}: {len(subj_nodes):4d} nodes -> {n_batches} batches ({existing} done)")

    if args.dry_run:
        print("\n  [dry-run] Not calling API.")
        return

    if not all_batches:
        print("\n  Nothing to do — all batches already have enrichment files!")
        return

    # Wait for key 1 rate limit to reset (check first)
    print("\n  Checking key 1 availability...")
    import urllib.request
    test_body = json.dumps({"model": MODEL, "max_tokens": 50, "messages": [{"role": "user", "content": "hi"}]}).encode("utf-8")
    test_req = urllib.request.Request(API_URL, data=test_body, method="POST")
    test_req.add_header("x-api-key", API_KEY)
    test_req.add_header("Content-Type", "application/json")
    test_req.add_header("anthropic-version", "2023-06-01")
    try:
        with urllib.request.urlopen(test_req, timeout=30, context=CTX) as resp:
            test_data = json.loads(resp.read().decode("utf-8"))
            test_text = ""
            for block in test_data.get("content", []):
                if block["type"] == "text":
                    test_text = block["text"]
                    break
            if "token limit" in test_text.lower() or "rate limit" in test_text.lower():
                reset_match = re.search(r'reset in (\d+) minutes?', test_text.lower())
                wait_min = int(reset_match.group(1)) if reset_match else 30
                print(f"  Key 1 rate limited, waiting {wait_min} minutes...")
                for remaining in range(wait_min * 60, 0, -30):
                    print(f"    {remaining}s remaining...")
                    await asyncio.sleep(30)
                print("  Starting now.\n")
            else:
                print("  Key 1 is live!\n")
    except Exception as e:
        print(f"  Key 1 check error: {str(e)[:150]}")
        print("  Waiting 25 minutes to be safe...")
        for remaining in range(1500, 0, -30):
            print(f"    {remaining}s remaining...")
            await asyncio.sleep(30)

    print(f"  Batches to process: {len(all_batches)}")
    print(f"  2s gap between launches...\n")

    # Launch with 2-second gap
    results = []
    pending = set()

    async with aiohttp.ClientSession() as session:
        for batch, subj, cls, bnum, ntotal in all_batches:
            while len(pending) >= CONCURRENCY:
                done, pending = await asyncio.wait(pending, return_when=asyncio.FIRST_COMPLETED)
                for d in done:
                    results.append(d.result())

            task_coro = process_batch(session, batch, subj, cls, bnum, ntotal)
            pending.add(asyncio.create_task(task_coro))
            await asyncio.sleep(2)

        if pending:
            done, _ = await asyncio.wait(pending)
            for d in done:
                results.append(d.result())

    success = sum(1 for r in results if r)
    failed = sum(1 for r in results if not r)

    print(f"\n{'='*70}")
    print(f"COMPLETE: {success} batches generated, {failed} failed")
    print(f"Output: {OUTPUT_DIR}")
    print(f"{'='*70}")


if __name__ == "__main__":
    asyncio.run(main())
