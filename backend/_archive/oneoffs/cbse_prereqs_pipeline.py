"""
CBSE Prerequisites & Cross-Subject Mapping Pipeline

Fills in for all 21K nodes:
  - prerequisite_node_ids + prerequisite_reasons (depth, why)
  - cross_subject_prereqs + cross_subject_reasons (why)

Uses API key index 0.
Processes by subject+class batches.
Writes NEW files only — does NOT touch existing data.
"""
import asyncio
import aiohttp
import ssl
import json
import os
from pathlib import Path
from collections import defaultdict

# ─── Config ───
API_KEYS = [
    "<redacted>",   # key 0 — used by this pipeline
    "<redacted>",    # key 1 — used by merge pipeline
]
API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"
MAX_TOKENS = 128000

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
OUTPUT_DIR = Path(r"D:\platform\cbse_data\prereqs")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Concurrency
CONCURRENCY = 10
semaphore = asyncio.Semaphore(CONCURRENCY)
# Key rotation: prereqs uses key 0 primarily, falls back to key 1
_key_index = 0
# 3 second gap between launching subagents to avoid burst rate limits
import time


# ─── Load all nodes grouped by subject+class ───
def load_nodes():
    """Load all CBSE nodes, grouped by (subject, class)."""
    by_subj_class = defaultdict(list)
    all_nodes = []

    for result_file in CBSE_OUTPUT.glob("*_result.json"):
        if result_file.stat().st_size < 500:
            continue
        try:
            data = json.loads(result_file.read_text(encoding="utf-8"))
            subject = data.get("subject", "unknown")
            grade = str(data.get("grade", "?"))
            for chunk in data.get("results", []):
                for node in chunk.get("nodes", []):
                    by_subj_class[(subject, grade)].append(node)
                    all_nodes.append(node)
        except:
            pass

    return by_subj_class, all_nodes


def build_compact_index(all_nodes, exclude_subject=None):
    """Build compact node index: one line per node (ID only, no topic)."""
    lines = []
    for n in all_nodes:
        subj = n.get("subject", "")
        if exclude_subject and subj == exclude_subject:
            continue
        nid = n.get("node_id", "")
        lines.append(nid)
    return "\n".join(lines)


def build_prompt(target_nodes, same_subj_other, cross_subj_index, subject, grade):
    """Build prompt for one batch."""
    # Target nodes — full info
    target_lines = []
    for n in target_nodes:
        nid = n.get("node_id", "")
        topic = n.get("topic", "")
        chapter = n.get("chapter", "")
        tags = n.get("concept_tags", [])
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.strip("[]").split(",")]
        tags_str = ", ".join(str(t) for t in tags[:5])
        existing_prereqs = n.get("prerequisite_node_ids", [])
        existing_cross = n.get("cross_subject_prereqs", [])
        target_lines.append(
            f"NODE: {nid}\n"
            f"  topic: {topic}\n"
            f"  chapter: {chapter}\n"
            f"  tags: {tags_str}\n"
            f"  existing_prereqs: {existing_prereqs}\n"
            f"  existing_cross: {existing_cross}"
        )
    target_text = "\n\n".join(target_lines)

    # Same subject, other classes — IDs + topic only, compact
    same_lines = []
    for n in same_subj_other:
        nid = n.get("node_id", "")
        topic = n.get("topic", "")[:60]
        same_lines.append(f"{nid} | {topic}")
    same_text = "\n".join(same_lines)
    # Limit to 2000 lines to keep prompt small
    same_lines_list = same_text.split("\n")
    if len(same_lines_list) > 2000:
        same_text = "\n".join(same_lines_list[:2000])

    return f"""You are a pedagogy expert. Fill in prerequisites and cross-subject dependencies
for CBSE {subject} class {grade} nodes.

For EACH target node below, output in this format:

## NODE_ID_HERE
- **prerequisite_node_ids**: [list of node IDs this node depends on — from same subject any class]
- **prerequisite_reasons**: {{"node_id": "pedagogical reason"}}
- **prerequisite_depth**: beginner|intermediate|advanced
- **cross_subject_prereqs**: [node IDs from OTHER subjects needed before this node]
- **cross_subject_reasons**: {{"node_id": "pedagogical reason"}}

PEDAGOGICAL REQUIREMENTS FOR REASONS:
- Reasons must explain WHY a student needs the prerequisite BEFORE attempting this node
- Use proper pedagogical language: cognitive load, schema building, conceptual scaffolding
- Reference the specific skill/understanding transferred from prereq to this node
- Example BAD: "Need c9_math_001 because fractions"
- Example GOOD: "Student must understand fraction equivalence before combining rational expressions, as the LCD procedure relies on the same part-whole reasoning"
- Example GOOD cross-subject: "Newton's second law problems require solving simultaneous equations, so algebraic manipulation from maths is essential before attempting force-resolution problems"
- Each reason should be 1-2 sentences, specific to the concept transfer

RULES:
- Prerequisites can be from ANY class of same subject (class 10 node can need class 9 node)
- Cross-subject: Physics needs maths, Chemistry needs physics/maths, Biology needs chemistry, etc.
- Only list REAL dependencies — don't pad
- If a node has existing_prereqs, keep them and ADD more if needed
- Depth: beginner = single direct concept, intermediate = 2-3 step chain, advanced = multi-step reasoning chain
- A root node (is_root=true) should have empty or minimal prereqs

TARGET NODES ({len(target_nodes)} — fill for each):

{target_text}

SAME SUBJECT OTHER CLASSES (for prereq references):

{same_text}

OTHER SUBJECTS INDEX (for cross-subject prereqs):

{cross_subj_index}
"""


async def call_claude(session, prompt, retries=5):
    body = {
        "model": MODEL,
        "max_tokens": MAX_TOKENS,
        "messages": [{"role": "user", "content": prompt}],
    }
    for attempt in range(retries):
        # Start with key 1 (key 0 is rate-limited), fall back to key 0
        key = API_KEYS[1] if attempt % 2 == 0 else API_KEYS[0]
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
                        if "rate limit" in text.lower():
                            print(f"      rate limit on key {'0' if attempt % 2 == 0 else '1'}, switching")
                            await asyncio.sleep(30 * (attempt + 1))
                            continue
                        return text
                    print(f"      empty, retry {attempt+1}")
                    await asyncio.sleep(30 * (attempt + 1))
                elif resp.status == 429:
                    print(f"      429 on key {'0' if attempt % 2 == 0 else '1'}, switching key")
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
    """Parse the markdown response into node updates."""
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


async def process_batch(session_holder, subject, grade, target_nodes, same_subj_other,
                        cross_subj_index, batch_num, total_batches):
    """Process one batch of nodes."""
    session = session_holder[0]
    async with semaphore:
        batch_id = f"{subject}_c{grade}_b{batch_num}"
        print(f"  [{batch_id}] {len(target_nodes)} nodes ({batch_num}/{total_batches})")

        prompt = build_prompt(target_nodes, same_subj_other, cross_subj_index, subject, grade)
        prompt_size = len(prompt)
        print(f"    prompt: {prompt_size} chars (~{prompt_size//4} tokens)")

        response = await call_claude(session, prompt)
        if not response:
            print(f"    ✗ no response")
            return {}

        # Save raw markdown
        safe_name = batch_id.replace(" ", "_").replace("/", "_")
        md_path = OUTPUT_DIR / f"{safe_name}.md"
        md_path.write_text(response, encoding="utf-8")

        # Parse
        updates = parse_response(response)
        print(f"    ✓ {len(updates)} nodes updated")
        return updates


async def main():
    print("=== CBSE Prerequisites & Cross-Subject Pipeline ===")
    print(f"  API key: index 0")
    print(f"  Output: {OUTPUT_DIR}")
    print(f"  Concurrency: {CONCURRENCY}")

    # Load all nodes
    print("\nLoading nodes...")
    by_subj_class, all_nodes = load_nodes()
    print(f"  Total nodes: {len(all_nodes)}")
    print(f"  Subject+class combos: {len(by_subj_class)}")

    # Build cross-subject compact index (reused across all batches)
    # This is large — ~21K lines. We'll build per-subject versions to keep prompts smaller.
    print("\nBuilding subject indices...")

    # Group by subject
    by_subject = defaultdict(list)
    for (subj, cls), nodes in by_subj_class.items():
        by_subject[subj].extend(nodes)

    print(f"  Subjects: {len(by_subject)}")
    for subj in sorted(by_subject.keys()):
        print(f"    {subj}: {len(by_subject[subj])} nodes")

    # Process each subject+class
    all_updates = {}
    batch_tasks = []

    # Batch size — keep prompt under ~100K tokens
    # Each target node ~200 chars, cross-subject index ~50 chars/node
    # With 20K other nodes: 20K * 50 = 1M chars = too big
    # So we limit cross-subject index to node IDs + topics only, and batch target nodes at 30

    BATCH_SIZE = 30
    session_holder = [None]  # will be set when session opens

    # Build all batch configs first
    all_batch_configs = []
    for (subject, grade), nodes in sorted(by_subj_class.items()):
        same_subj_other = [n for (s, c), ns in by_subj_class.items()
                          if s == subject and c != grade for n in ns]
        cross_index = build_compact_index(all_nodes, exclude_subject=subject)
        cross_lines = cross_index.split("\n")
        if len(cross_lines) > 4000:
            cross_index = "\n".join(cross_lines[:4000])

        total_batches = (len(nodes) + BATCH_SIZE - 1) // BATCH_SIZE
        print(f"  {subject} class {grade}: {len(nodes)} nodes → {total_batches} batches")

        for i in range(0, len(nodes), BATCH_SIZE):
            batch = nodes[i:i+BATCH_SIZE]
            batch_num = i // BATCH_SIZE + 1
            all_batch_configs.append((session_holder, subject, grade, batch, same_subj_other,
                                     cross_index, batch_num, total_batches))

    print(f"\n  Total batches: {len(all_batch_configs)}")
    print(f"  Running with concurrency={CONCURRENCY}, 3s gap between launches...")

    # Launch with 3-second gap, max 10 concurrent
    results = []
    pending = set()

    async with aiohttp.ClientSession() as session:
        session_holder[0] = session
        for idx, cfg in enumerate(all_batch_configs):
            # Wait if at concurrency limit
            while len(pending) >= CONCURRENCY:
                done, pending = await asyncio.wait(pending, return_when=asyncio.FIRST_COMPLETED)
                for d in done:
                    results.append(d.result())

            # Launch new task
            task = asyncio.create_task(process_batch(*cfg))
            pending.add(task)

            # 3 second gap between launches
            await asyncio.sleep(3)

        # Wait for remaining
        if pending:
            done, _ = await asyncio.wait(pending)
            for d in done:
                results.append(d.result())
        for r in results:
            all_updates.update(r)

    # Save combined results as markdown
    print(f"\n=== Saving results ===")
    md_lines = ["# CBSE Prerequisites & Cross-Subject Mapping\n"]
    md_lines.append(f"Total nodes updated: {len(all_updates)}\n")

    for nid in sorted(all_updates.keys()):
        u = all_updates[nid]
        md_lines.append(f"\n## {nid}")
        for k, v in u.items():
            if k != "node_id":
                md_lines.append(f"- **{k}**: {v}")

    combined_path = OUTPUT_DIR / "all_prereqs_mapping.md"
    combined_path.write_text("\n".join(md_lines), encoding="utf-8")
    print(f"  Combined: {combined_path} ({combined_path.stat().st_size//1024}KB)")

    print(f"\n=== DONE ===")
    print(f"  Nodes processed: {len(all_updates)}")
    print(f"  Output dir: {OUTPUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
