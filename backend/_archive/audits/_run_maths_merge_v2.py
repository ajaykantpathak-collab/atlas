"""
Two-call CISCE-CBSE maths merge:
  Call 1: All CBSE + all CISCE → Category A (mappings) + Category B (CBSE-only) + Category C (just list unmatched CISCE topic IDs)
  Call 2: Unmatched CISCE topics only → Generate full 20-field nodes
"""
import asyncio
import aiohttp
import ssl
import json
import re
from pathlib import Path

API_KEYS = [
    "<redacted>",
    "<redacted>",
]
API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

OUTPUT_DIR = Path(r"D:\platform\cisce_merge_output")
OUTPUT_DIR.mkdir(exist_ok=True)


async def call_claude(session, prompt, retries=5):
    body = {
        "model": MODEL,
        "max_tokens": 128000,
        "messages": [{"role": "user", "content": prompt}],
    }
    for attempt in range(retries):
        key = API_KEYS[1]
        headers = {
            "x-api-key": key,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01",
        }
        try:
            print(f"    Calling Claude (attempt {attempt+1}, prompt={len(prompt)} chars)...")
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
                        if "Rate limit" in text or "rate limit" in text.lower():
                            wait = 60 * (attempt + 1)
                            print(f"    rate-limited, retry after {wait}s")
                            await asyncio.sleep(wait)
                            continue
                        print(f"    Response: {len(text)} chars")
                        return text
                    print(f"    empty response, retry {attempt+1}")
                    await asyncio.sleep(30 * (attempt + 1))
                else:
                    print(f"    API error {resp.status}: {str(data)[:300]}")
                    wait = 60 * (attempt + 1) if resp.status == 429 else 15 * (attempt + 1)
                    await asyncio.sleep(wait)
        except Exception as e:
            print(f"    retry {attempt+1}: {str(e)[:200]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


def build_call1_prompt(cbse_nodes, cisce_nodes):
    """Call 1: Match + categorize. No new node generation."""
    cbse_list = []
    for n in cbse_nodes:
        cbse_list.append(f"  {n['node_id']} | class {n['class_level']} | {n['topic']}")
    cbse_text = "\n".join(cbse_list)

    cisce_list = []
    for n in cisce_nodes:
        syllabus = n.get("syllabus", "")[:200]
        cisce_list.append(f"  {n['node_id']} | class {n['class']} | {n['title']}\n    Syllabus: {syllabus}")
    cisce_text = "\n".join(cisce_list)

    return f"""You are an educational curriculum expert merging CBSE and CISCE (ICSE/ISC)
Mathematics curricula for classes 6-12 into a unified knowledge graph.

I'm giving you:
1. CBSE MATHS NODES — all classes, granular atomic nodes (already generated)
2. CISCE MATHS TOPICS — all classes 6-12, coarse syllabus topics

YOUR JOB — categorize every topic into ONE of three categories.
DO NOT generate new nodes. Just categorize and map.

═══════════════════════════════════════════════════════════════
CATEGORY A — "both": CISCE topics covered by existing CBSE nodes
═══════════════════════════════════════════════════════════════
A CISCE topic may be covered by CBSE nodes in a DIFFERENT class
(e.g., CISCE class 8 topic might match CBSE class 7 or class 9 node).
Match by CONCEPT across class boundaries.

Output format (one per line):
A | cisce: c6_math_001 → cbse: [c6_math_cbse_001, c7_math_cbse_003]

═══════════════════════════════════════════════════════════════
CATEGORY B — "CBSE": CBSE nodes not matching any CISCE topic
═══════════════════════════════════════════════════════════════
Output format (one node_id per line):
B | c6_math_cbse_005

═══════════════════════════════════════════════════════════════
CATEGORY C — "CISCE": CISCE topics with NO matching CBSE node
═══════════════════════════════════════════════════════════════
These are CISCE-only topics that need new nodes generated later.
Just list the cisce_node_id and its title.

Output format (one per line):
C | c6_math_005 | Estimating outcomes of number operations

═══════════════════════════════════════════════════════════════
RULES:
- Match by CONCEPT, not exact wording
- Match ACROSS class boundaries (CISCE class 8 can match CBSE class 7)
- One CISCE topic → multiple CBSE nodes is fine
- One CBSE node → multiple CISCE topics is fine
- Be generous: substantially same concept = match (Category A)
- Only Category C if NO CBSE node covers the concept at all
- Do NOT generate new nodes in this step

═══════════════════════════════════════════════════════════════
CBSE MATHS NODES ({len(cbse_nodes)} nodes, all classes):
═══════════════════════════════════════════════════════════════

{cbse_text}

═══════════════════════════════════════════════════════════════
CISCE MATHS TOPICS ({len(cisce_nodes)} topics, class 6-12):
═══════════════════════════════════════════════════════════════

{cisce_text}
"""


def build_call2_prompt(unmatched_cisce, cbse_nodes):
    """Call 2: Generate full nodes for unmatched CISCE topics."""
    # Include CBSE node IDs for prerequisite references
    cbse_ids = [n["node_id"] for n in cbse_nodes]
    cbse_ref = "\n".join(f"  {nid}" for nid in cbse_ids)

    cisce_list = []
    for n in unmatched_cisce:
        syllabus = n.get("syllabus", "")[:300]
        cisce_list.append(f"  {n['node_id']} | class {n['class']} | {n['title']}\n    Syllabus: {syllabus}")
    cisce_text = "\n".join(cisce_list)

    return f"""You are an educational curriculum expert. Generate full atomic curriculum nodes
for CISCE (ICSE/ISC) Mathematics topics that are NOT covered by any existing CBSE node.

These are CISCE-only topics. Break each coarse topic into granular atomic sub-nodes
(one concept per node), matching the granularity of CBSE nodes.

Each new node MUST have ALL 20 fields in this EXACT markdown format:

## NODE: c6_math_cisce_001

- **topic**: Clear atomic topic title
- **content_snippet**: 2-3 sentence description
- **subject**: maths
- **class_level**: 6
- **board**: CISCE
- **chapter**: descriptive chapter name
- **chapter_name**: same as chapter
- **difficulty**: easy|medium|hard
- **estimated_time**: minutes (integer)
- **is_root**: true|false
- **concept_tags**: [tag1, tag2, tag3]
- **scope_constraints**: [what to focus on]
- **prerequisite_node_ids**: [list of node IDs — can reference CBSE nodes below]
- **prerequisite_reasons**: {{"node_id": "why"}}
- **forward_node_ids**: [list]
- **forward_reasons**: {{"node_id": "why"}}
- **cross_subject_prereqs**: [list]
- **cross_subject_reasons**: {{"node_id": "why"}}
- **source_file**: cisce_class6_maths.json

RULES:
- node_id format: c{{class}}_math_cisce_{{seq}} (e.g., c6_math_cisce_001)
- Break coarse topics into atomic sub-nodes (2-5 per topic depending on complexity)
- Use the CISCE class level for class_level
- Prerequisites can reference existing CBSE node IDs (listed below)
- No foreign language etymologies, no mnemonics
- Align with CBSE/CISCE 2025-26 syllabus
- Generate ALL nodes — do not skip any topic

═══════════════════════════════════════════════════════════════
EXISTING CBSE NODE IDs (for prerequisite references):
═══════════════════════════════════════════════════════════════

{cbse_ref}

═══════════════════════════════════════════════════════════════
CISCE TOPICS TO GENERATE NODES FOR ({len(unmatched_cisce)} topics):
═══════════════════════════════════════════════════════════════

{cisce_text}
"""


def parse_call1(text):
    """Parse Call 1 response — categorization."""
    both_mappings = []
    cbse_only = []
    cisce_unmatched = []

    for line in text.split("\n"):
        line = line.strip()
        if line.startswith("A |"):
            # Format: A | c6_math_001 → cbse: [c7_math_cbse_001, ...]
            m = re.match(r'A\s*\|\s*(?:cisce:\s*)?(\S+)\s*→\s*cbse:\s*\[([^\]]*)\]', line)
            if m:
                cisce_id = m.group(1)
                cbse_ids = [x.strip() for x in m.group(2).split(",") if x.strip()]
                both_mappings.append({"cisce": cisce_id, "cbse": cbse_ids})
        elif line.startswith("B |"):
            node_id = line.replace("B |", "").strip()
            if node_id.startswith("c"):
                cbse_only.append(node_id)
        elif line.startswith("C |"):
            parts = line.replace("C |", "").strip().split(" | ", 1)
            if len(parts) >= 1:
                node_id = parts[0].strip()
                title = parts[1].strip() if len(parts) > 1 else ""
                cisce_unmatched.append({"node_id": node_id, "title": title})

    return {"both": both_mappings, "cbse_only": cbse_only, "cisce_unmatched_ids": cisce_unmatched}


def parse_call2(text):
    """Parse Call 2 response — new nodes."""
    nodes = []
    current = {}
    for line in text.split("\n"):
        stripped = line.strip()
        if stripped.startswith("## NODE:"):
            if current and "topic" in current:
                nodes.append(current)
            current = {"node_id": stripped.replace("## NODE:", "").strip()}
        elif stripped.startswith("- **") and "**:" in stripped and current:
            key = stripped.split("**")[1]
            val = stripped.split("**:", 1)[1].strip()
            current[key] = val
    if current and "topic" in current:
        nodes.append(current)
    return nodes


async def main():
    # Load data
    data = json.loads(Path(r"D:\platform\backend\_pilot_maths_data.json").read_text(encoding="utf-8"))
    cbse_all = data["cbse"]
    cisce_all = data["cisce"]

    print(f"\n=== MATHS MERGE (2-call approach) ===")
    print(f"  CBSE: {len(cbse_all)} nodes (all classes)")
    print(f"  CISCE: {len(cisce_all)} topics (class 6-12)")

    async with aiohttp.ClientSession() as session:
        # ─── CALL 1: Categorize ───
        print(f"\n--- CALL 1: Categorize (match + find gaps) ---")
        prompt1 = build_call1_prompt(cbse_all, cisce_all)
        print(f"  Prompt: {len(prompt1)} chars (~{len(prompt1)//4} tokens)")

        response1 = await call_claude(session, prompt1)
        if not response1:
            print("  ✗ No response for Call 1!")
            return

        # Save raw
        (OUTPUT_DIR / "maths_call1_response.md").write_text(response1, encoding="utf-8")

        # Parse
        cat = parse_call1(response1)
        print(f"\n  Category A (both): {len(cat['both'])} mappings")
        print(f"  Category B (CBSE only): {len(cat['cbse_only'])} nodes")
        print(f"  Category C (CISCE unmatched): {len(cat['cisce_unmatched_ids'])} topics")

        # Save parsed
        with open(OUTPUT_DIR / "maths_call1_parsed.json", "w", encoding="utf-8") as f:
            json.dump(cat, f, indent=2, ensure_ascii=False)

        # ─── CALL 2: Generate new nodes ───
        unmatched_ids = cat["cisce_unmatched_ids"]
        if not unmatched_ids:
            print("\n  No unmatched topics — nothing to generate!")
            return

        # Get full CISCE topic data for unmatched IDs
        cisce_lookup = {n["node_id"]: n for n in cisce_all}
        unmatched_full = []
        for u in unmatched_ids:
            nid = u["node_id"]
            if nid in cisce_lookup:
                unmatched_full.append(cisce_lookup[nid])
            else:
                # Still include with title from Call 1
                unmatched_full.append({
                    "node_id": nid,
                    "title": u.get("title", ""),
                    "class": int(re.search(r'c(\d+)_', nid).group(1)) if re.search(r'c(\d+)_', nid) else 6,
                    "syllabus": "",
                })

        print(f"\n--- CALL 2: Generate {len(unmatched_full)} CISCE-only nodes ---")

        # Split into batches of ~50 topics to keep output manageable
        batch_size = 50
        all_new_nodes = []

        for i in range(0, len(unmatched_full), batch_size):
            batch = unmatched_full[i:i+batch_size]
            print(f"\n  Batch {i//batch_size + 1}/{(len(unmatched_full)-1)//batch_size + 1}: {len(batch)} topics")

            prompt2 = build_call2_prompt(batch, cbse_all)
            print(f"  Prompt: {len(prompt2)} chars (~{len(prompt2)//4} tokens)")

            response2 = await call_claude(session, prompt2)
            if response2:
                # Save raw
                (OUTPUT_DIR / f"maths_call2_batch{i//batch_size + 1}.md").write_text(response2, encoding="utf-8")

                new_nodes = parse_call2(response2)
                all_new_nodes.extend(new_nodes)
                print(f"  ✓ Generated {len(new_nodes)} nodes")
            else:
                print(f"  ✗ No response for batch {i//batch_size + 1}")

        # Save all new nodes
        with open(OUTPUT_DIR / "maths_cisce_new_nodes.json", "w", encoding="utf-8") as f:
            json.dump(all_new_nodes, f, indent=2, ensure_ascii=False)

        # ─── FINAL SUMMARY ───
        print(f"\n{'='*60}")
        print(f"  FINAL SUMMARY — MATHS")
        print(f"{'='*60}")
        print(f"  Category A (both):     {len(cat['both'])} CISCE→CBSE mappings")
        print(f"  Category B (CBSE only): {len(cat['cbse_only'])} nodes")
        print(f"  Category C (CISCE new): {len(all_new_nodes)} new nodes generated")
        print(f"  Output dir: {OUTPUT_DIR}")
        print(f"{'='*60}")


if __name__ == "__main__":
    asyncio.run(main())
