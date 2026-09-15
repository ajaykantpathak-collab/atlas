"""
Fixed maths merge: Call 1 per class (all CBSE nodes visible, one CISCE class at a time).
Then Call 2 for all unmatched topics.
Output as markdown files only.
"""
import asyncio
import aiohttp
import ssl
import json
import re
from pathlib import Path

API_KEYS = [
    "sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK",
    "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna",
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
            print(f"      API call (attempt {attempt+1}, {len(prompt)} chars)...")
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
                            print(f"      rate-limited, retry after {wait}s")
                            await asyncio.sleep(wait)
                            continue
                        print(f"      Response: {len(text)} chars")
                        return text
                    print(f"      empty response, retry {attempt+1}")
                    await asyncio.sleep(30 * (attempt + 1))
                else:
                    print(f"      API error {resp.status}: {str(data)[:300]}")
                    wait = 60 * (attempt + 1) if resp.status == 429 else 15 * (attempt + 1)
                    await asyncio.sleep(wait)
        except Exception as e:
            print(f"      retry {attempt+1}: {str(e)[:200]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


def build_call1_prompt(cbse_nodes, cisce_nodes, cls):
    cbse_list = []
    for n in cbse_nodes:
        cbse_list.append(f"  {n['node_id']} | class {n['class_level']} | {n['topic']}")
    cbse_text = "\n".join(cbse_list)

    cisce_list = []
    for n in cisce_nodes:
        syllabus = n.get("syllabus", "")[:200]
        cisce_list.append(f"  {n['node_id']} | {n['title']}\n    Syllabus: {syllabus}")
    cisce_text = "\n".join(cisce_list)

    return f"""You are an educational curriculum expert merging CBSE and CISCE Mathematics.

I'm giving you ALL CBSE maths nodes (all classes 6-12) and CISCE maths topics for CLASS {cls} ONLY.

Match each CISCE class {cls} topic to CBSE node(s) by CONCEPT. CBSE nodes may be in a different
class — that's fine, match across class boundaries.

For each CISCE topic, output ONE line in exactly this format:

A | cisce_id → cbse: [cbse_id1, cbse_id2, ...]

If a CISCE topic has NO matching CBSE node, output:

C | cisce_id | topic title here

Rules:
- Match by concept, not exact wording
- One CISCE topic → multiple CBSE nodes is fine
- Be generous: substantially same concept = match (A)
- Only use C if NO CBSE node covers the concept
- Do NOT generate new nodes
- Output ONLY the A and C lines, nothing else

CBSE MATHS NODES ({len(cbse_nodes)} nodes, all classes):
{cbse_text}

CISCE MATHS TOPICS — CLASS {cls} ({len(cisce_nodes)} topics):
{cisce_text}
"""


def parse_call1(text):
    both = []
    unmatched = []
    for line in text.split("\n"):
        line = line.strip()
        if line.startswith("A |"):
            m = re.match(r'A\s*\|\s*(\S+)\s*→\s*cbse:\s*\[([^\]]*)\]', line)
            if m:
                both.append({"cisce": m.group(1), "cbse": [x.strip() for x in m.group(2).split(",") if x.strip()]})
        elif line.startswith("C |"):
            parts = line.replace("C |", "").strip().split(" | ", 1)
            if parts:
                unmatched.append({"node_id": parts[0].strip(), "title": parts[1].strip() if len(parts) > 1 else ""})
    return both, unmatched


def build_call2_prompt(unmatched_cisce, cbse_nodes):
    cbse_ref = "\n".join(f"  {n['node_id']}" for n in cbse_nodes)
    cisce_list = []
    for n in unmatched_cisce:
        syllabus = n.get("syllabus", "")[:300]
        cisce_list.append(f"  {n['node_id']} | class {n['class']} | {n['title']}\n    Syllabus: {syllabus}")
    cisce_text = "\n".join(cisce_list)

    return f"""Generate full atomic curriculum nodes for CISCE-only maths topics not covered by CBSE.

Break each coarse topic into granular atomic sub-nodes (one concept per node).

For each new node, output in this EXACT markdown format:

## NODE: c6_math_cisce_001

- **topic**: Clear atomic topic title
- **content_snippet**: 2-3 sentence description
- **subject**: maths
- **class_level**: 6
- **board**: CISCE
- **chapter**: chapter name
- **chapter_name**: same
- **difficulty**: easy|medium|hard
- **estimated_time**: 20
- **is_root**: false
- **concept_tags**: [tag1, tag2]
- **scope_constraints**: [scope1]
- **prerequisite_node_ids**: [cbse_node_id]
- **prerequisite_reasons**: {{"node_id": "why"}}
- **forward_node_ids**: []
- **forward_reasons**: {{}}
- **cross_subject_prereqs**: []
- **cross_subject_reasons**: {{}}
- **source_file**: cisce_class6_maths.json

Rules:
- node_id: c{{class}}_math_cisce_{{seq}}
- Prerequisites can reference CBSE node IDs below
- No foreign etymologies, no mnemonics
- Generate ALL nodes for ALL topics listed

EXISTING CBSE NODE IDs (for prerequisites):
{cbse_ref}

CISCE TOPICS TO GENERATE ({len(unmatched_cisce)} topics):
{cisce_text}
"""


async def main():
    data = json.loads(Path(r"D:\platform\backend\_pilot_maths_data.json").read_text(encoding="utf-8"))
    cbse_all = data["cbse"]
    cisce_all = data["cisce"]

    classes = [12, 11, 10, 9, 8, 7, 6]
    all_both = []
    all_unmatched = []

    print(f"\n=== MATHS MERGE (per-class Call 1) ===")
    print(f"  CBSE: {len(cbse_all)} nodes (all classes)")
    print(f"  CISCE: {len(cisce_all)} topics (class 6-12)\n")

    async with aiohttp.ClientSession() as session:
        for cls in classes:
            cisce_cls = [n for n in cisce_all if n["class"] == cls]
            if not cisce_cls:
                continue

            print(f"--- Class {cls}: {len(cisce_cls)} CISCE topics ---")
            prompt = build_call1_prompt(cbse_all, cisce_cls, cls)
            print(f"  Prompt: {len(prompt)} chars (~{len(prompt)//4} tokens)")

            response = await call_claude(session, prompt)
            if not response:
                print(f"  ✗ No response")
                continue

            # Save raw markdown
            (OUTPUT_DIR / f"maths_class{cls}_match.md").write_text(response, encoding="utf-8")

            both, unmatched = parse_call1(response)
            all_both.extend(both)
            all_unmatched.extend(unmatched)
            print(f"  ✓ both={len(both)}, unmatched={len(unmatched)}")

        # Save combined matching results as markdown
        md_lines = ["# CBSE-CISCE Maths Merge — Matching Results\n"]
        md_lines.append(f"## Category A: Both (CISCE → CBSE mappings)\n")
        for m in all_both:
            md_lines.append(f"A | {m['cisce']} → cbse: [{', '.join(m['cbse'])}]")
        md_lines.append(f"\n## Category C: CISCE-only (unmatched)\n")
        for u in all_unmatched:
            md_lines.append(f"C | {u['node_id']} | {u['title']}")

        (OUTPUT_DIR / "maths_matching_results.md").write_text("\n".join(md_lines), encoding="utf-8")

        print(f"\n=== CALL 1 SUMMARY ===")
        print(f"  Total both: {len(all_both)}")
        print(f"  Total unmatched: {len(all_unmatched)}")

        # ─── CALL 2: Generate nodes for unmatched ───
        if not all_unmatched:
            print("\n  No unmatched topics — done!")
            return

        # Get full CISCE data for unmatched
        cisce_lookup = {n["node_id"]: n for n in cisce_all}
        unmatched_full = []
        for u in all_unmatched:
            nid = u["node_id"]
            if nid in cisce_lookup:
                unmatched_full.append(cisce_lookup[nid])
            else:
                m = re.search(r'c(\d+)_', nid)
                unmatched_full.append({
                    "node_id": nid,
                    "title": u.get("title", ""),
                    "class": int(m.group(1)) if m else 6,
                    "syllabus": "",
                })

        print(f"\n--- CALL 2: Generate {len(unmatched_full)} CISCE-only nodes ---")

        # Batch by 30 topics
        batch_size = 30
        all_new_nodes_md = []

        for i in range(0, len(unmatched_full), batch_size):
            batch = unmatched_full[i:i+batch_size]
            batch_num = i // batch_size + 1
            total_batches = (len(unmatched_full) - 1) // batch_size + 1
            print(f"\n  Batch {batch_num}/{total_batches}: {len(batch)} topics")

            prompt2 = build_call2_prompt(batch, cbse_all)
            response2 = await call_claude(session, prompt2)
            if response2:
                (OUTPUT_DIR / f"maths_cisce_new_batch{batch_num}.md").write_text(response2, encoding="utf-8")
                all_new_nodes_md.append(response2)
                node_count = response2.count("## NODE:")
                print(f"  ✓ {node_count} nodes generated")
            else:
                print(f"  ✗ No response")

        # Save combined new nodes markdown
        (OUTPUT_DIR / "maths_cisce_new_nodes.md").write_text("\n\n".join(all_new_nodes_md), encoding="utf-8")

        total_new = sum(md.count("## NODE:") for md in all_new_nodes_md)
        print(f"\n{'='*60}")
        print(f"  FINAL — MATHS MERGE")
        print(f"{'='*60}")
        print(f"  Both (shared):      {len(all_both)} mappings")
        print(f"  CISCE new nodes:    {total_new}")
        print(f"  Output: {OUTPUT_DIR}")
        print(f"{'='*60}")


if __name__ == "__main__":
    asyncio.run(main())
