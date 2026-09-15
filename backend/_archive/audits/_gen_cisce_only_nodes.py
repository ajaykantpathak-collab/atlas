"""Generate full atomic nodes for the 33 CISCE-only maths topics."""
import asyncio
import aiohttp
import ssl
import json
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


async def call_claude(session, prompt, retries=5):
    body = {"model": MODEL, "max_tokens": 128000,
            "messages": [{"role": "user", "content": prompt}]}
    for attempt in range(retries):
        key = API_KEYS[1]
        headers = {"x-api-key": key, "Content-Type": "application/json",
                   "anthropic-version": "2023-06-01"}
        try:
            print(f"  API call (attempt {attempt+1})...")
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
                            await asyncio.sleep(60 * (attempt + 1))
                            continue
                        print(f"  Response: {len(text)} chars")
                        return text
                    print(f"  empty, retry {attempt+1}")
                    await asyncio.sleep(30 * (attempt + 1))
                else:
                    print(f"  error {resp.status}: {str(data)[:200]}")
                    await asyncio.sleep(15 * (attempt + 1))
        except Exception as e:
            print(f"  retry {attempt+1}: {str(e)[:150]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


async def main():
    data = json.loads(Path(r"D:\platform\backend\_pilot_maths_data.json").read_text(encoding="utf-8"))
    cbse_all = data["cbse"]
    cisce_all = data["cisce"]
    cisce_lookup = {n["node_id"]: n for n in cisce_all}

    # Load unmatched IDs
    unmatched_text = Path(OUTPUT_DIR / "maths_cisce_only_nodes.md").read_text(encoding="utf-8")
    unmatched_ids = [l.strip() for l in unmatched_text.split("\n")
                     if l.strip().startswith("c") and "_math_" in l]

    print(f"Unmatched CISCE nodes: {len(unmatched_ids)}")

    # Get full data
    unmatched_full = [cisce_lookup[nid] for nid in unmatched_ids if nid in cisce_lookup]

    # Build CBSE reference (just IDs + topics for prereqs)
    cbse_ref = "\n".join(f"  {n['node_id']} | {n['topic'][:60]}" for n in cbse_all)

    # Build CISCE topics text
    cisce_text = ""
    for n in unmatched_full:
        syllabus = n.get("syllabus", "")[:200]
        cisce_text += f"  {n['node_id']} | class {n['class']} | {n['title']}\n    {syllabus}\n"

    prompt = f"""Generate full atomic curriculum nodes for these 33 CISCE-only maths topics
(topics NOT covered by any CBSE node).

For each topic, generate 1-3 atomic nodes (one concept per node) in this EXACT markdown format:

## NODE: c8_math_cisce_001

- **topic**: Clear atomic topic title
- **content_snippet**: 2-3 sentence description
- **subject**: maths
- **class_level**: 8
- **board**: CISCE
- **chapter**: chapter name
- **chapter_name**: same
- **difficulty**: easy|medium|hard
- **estimated_time**: 20
- **is_root**: false
- **concept_tags**: [tag1, tag2]
- **scope_constraints**: [scope1]
- **prerequisite_node_ids**: [cbse_node_id]
- **prerequisite_reasons**: {{"node_id": "pedagogical reason"}}
- **forward_node_ids**: []
- **forward_reasons**: {{}}
- **cross_subject_prereqs**: []
- **cross_subject_reasons**: {{}}
- **source_file**: cisce_class8_maths.json

PEDAGOGICAL REQUIREMENTS:
- Prerequisite reasons must explain WHY the student needs that prereq BEFORE this node
- Use proper pedagogical language: schema building, conceptual scaffolding, cognitive load
- Example: "Student must understand basic integration before Wallis' formula, as it relies on recursive integration by parts and pattern recognition"
- No foreign etymologies, no mnemonics
- Align with CISCE 2025-26 syllabus
- node_id format: c{{class}}_math_cisce_{{seq}}

CBSE NODE IDs (for prerequisite references):
{cbse_ref}

CISCE TOPICS TO GENERATE ({len(unmatched_full)} topics):
{cisce_text}
"""

    print(f"Prompt: {len(prompt)} chars (~{len(prompt)//4} tokens)")

    async with aiohttp.ClientSession() as session:
        response = await call_claude(session, prompt)

    if not response:
        print("No response!")
        return

    # Save raw markdown
    out_path = OUTPUT_DIR / "maths_cisce_new_nodes.md"
    out_path.write_text(response, encoding="utf-8")

    node_count = response.count("## NODE:")
    print(f"\n=== DONE ===")
    print(f"  Generated {node_count} new CISCE nodes")
    print(f"  Saved to {out_path}")


if __name__ == "__main__":
    asyncio.run(main())
