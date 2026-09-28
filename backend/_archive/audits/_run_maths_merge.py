"""
Run CISCE-CBSE maths merge per class batch.
For each class: send CBSE nodes + CISCE topics for that class,
Claude categorizes and generates missing CISCE nodes.
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


def build_prompt_class(cbse_nodes, cisce_nodes, cls):
    """Build prompt for one class."""
    cbse_list = []
    for n in cbse_nodes:
        cbse_list.append(f"  {n['node_id']} | {n['topic']}")
    cbse_text = "\n".join(cbse_list)

    cisce_list = []
    for n in cisce_nodes:
        syllabus = n.get("syllabus", "")[:200]
        cisce_list.append(f"  {n['node_id']} | {n['title']}\n    Syllabus: {syllabus}")
    cisce_text = "\n".join(cisce_list)

    return f"""You are an educational curriculum expert building a unified K-12 knowledge graph
that merges CBSE and CISCE (ICSE/ISC) board curricula for Mathematics, Class {cls}.

I'm giving you:
1. CBSE MATHS NODES — Class {cls}, granular atomic nodes (already generated)
2. CISCE MATHS TOPICS — Class {cls}, coarse syllabus topics with descriptions

YOUR JOB — produce a unified node list with THREE categories:

## CATEGORY A: BOTH (CISCE topics covered by CBSE nodes)

For each CISCE topic, find matching CBSE node(s) by CONCEPT (not exact wording).
Output format:
- cisce: c{cls}_math_001 → cbse: [c{cls}_math_cbse_001, c{cls}_math_cbse_002]

## CATEGORY B: CBSE ONLY

List CBSE node_ids that don't match any CISCE topic.
Output format:
- c{cls}_math_cbse_003
- c{cls}_math_cbse_007

## CATEGORY C: CISCE ONLY (generate new full nodes)

For CISCE topics with NO matching CBSE node, generate full atomic nodes.
Break coarse topics into granular sub-nodes (one concept per node).

Each new node MUST have ALL 20 fields:

## NODE: c{cls}_math_cisce_001

- **topic**: Clear atomic topic title
- **content_snippet**: 2-3 sentence description
- **subject**: maths
- **class_level**: {cls}
- **board**: CISCE
- **chapter**: descriptive chapter name
- **chapter_name**: same as chapter
- **difficulty**: easy|medium|hard
- **estimated_time**: minutes (integer)
- **is_root**: true|false
- **concept_tags**: [tag1, tag2, tag3]
- **scope_constraints**: [what to focus on]
- **prerequisite_node_ids**: [list of node IDs]
- **prerequisite_reasons**: {{"node_id": "why"}}
- **forward_node_ids**: [list]
- **forward_reasons**: {{"node_id": "why"}}
- **cross_subject_prereqs**: [list]
- **cross_subject_reasons**: {{"node_id": "why"}}
- **source_file**: cisce_class{cls}_maths.json

## NODE: c{cls}_math_cisce_002
...

RULES:
- Match by CONCEPT, not exact wording
- One CISCE topic may map to MULTIPLE CBSE nodes
- Be generous with matching — substantially same concept = match
- Only Category C if NO CBSE node covers the CISCE topic
- Break coarse CISCE topics into atomic nodes (CBSE granularity)
- No foreign language etymologies, no mnemonics
- Align with CBSE/CISCE 2025-26 syllabus

═══════════════════════════════════════════════════════════════
CBSE MATHS NODES — Class {cls} ({len(cbse_nodes)} nodes):
═══════════════════════════════════════════════════════════════

{cbse_text}

═══════════════════════════════════════════════════════════════
CISCE MATHS TOPICS — Class {cls} ({len(cisce_nodes)} topics):
═══════════════════════════════════════════════════════════════

{cisce_text}
"""


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
                        return text
                    print(f"      empty response, retry {attempt+1}")
                    await asyncio.sleep(30 * (attempt + 1))
                else:
                    print(f"      API error {resp.status}: {str(data)[:200]}")
                    wait = 60 * (attempt + 1) if resp.status == 429 else 15 * (attempt + 1)
                    await asyncio.sleep(wait)
        except Exception as e:
            print(f"      retry {attempt+1}: {str(e)[:150]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


def parse_response(text):
    """Parse the markdown response into structured data."""
    # Category A: both mappings
    both_mappings = []
    in_cat_a = False
    in_cat_b = False
    in_cat_c = False
    
    cat_b_nodes = []
    cat_c_nodes = []
    
    current_node = {}
    
    for line in text.split("\n"):
        stripped = line.strip()
        
        if "CATEGORY A" in stripped or "CATEGORY A:" in stripped:
            in_cat_a = True; in_cat_b = False; in_cat_c = False
            continue
        elif "CATEGORY B" in stripped or "CATEGORY B:" in stripped:
            in_cat_a = False; in_cat_b = True; in_cat_c = False
            continue
        elif "CATEGORY C" in stripped or "CATEGORY C:" in stripped:
            in_cat_a = False; in_cat_b = False; in_cat_c = True
            continue
        
        if in_cat_a and stripped.startswith("- cisce:"):
            # Parse: - cisce: c6_math_001 → cbse: [c6_math_cbse_001, c6_math_cbse_002]
            m = re.match(r'-\s*cisce:\s*(\S+)\s*→\s*cbse:\s*\[([^\]]*)\]', stripped)
            if m:
                cisce_id = m.group(1)
                cbse_ids = [x.strip() for x in m.group(2).split(",") if x.strip()]
                both_mappings.append({"cisce": cisce_id, "cbse": cbse_ids})
        
        elif in_cat_b and stripped.startswith("- c") and "**" not in stripped:
            cat_b_nodes.append(stripped.lstrip("- "))
        
        elif in_cat_c:
            if stripped.startswith("## NODE:"):
                if current_node:
                    cat_c_nodes.append(current_node)
                current_node = {"node_id": stripped.replace("## NODE:", "").strip()}
            elif stripped.startswith("- **") and "**:" in stripped and current_node:
                key = stripped.split("**")[1]
                val = stripped.split("**:", 1)[1].strip()
                current_node[key] = val
    
    if current_node:
        cat_c_nodes.append(current_node)
    
    return {
        "both": both_mappings,
        "cbse_only": cat_b_nodes,
        "cisce_new": cat_c_nodes,
    }


async def process_class(session, cls, cbse_all, cisce_all, semaphore):
    """Process one class."""
    async with semaphore:
        cbse_nodes = [n for n in cbse_all if str(n["class_level"]) == str(cls)]
        cisce_nodes = [n for n in cisce_all if n["class"] == cls]
        
        if not cisce_nodes:
            print(f"  Class {cls}: no CISCE topics, skipping")
            return None
        
        print(f"  Class {cls}: {len(cbse_nodes)} CBSE + {len(cisce_nodes)} CISCE topics")
        
        prompt = build_prompt_class(cbse_nodes, cisce_nodes, cls)
        print(f"    Prompt: {len(prompt)} chars (~{len(prompt)//4} tokens)")
        
        response = await call_claude(session, prompt)
        
        if response:
            # Save raw markdown
            md_path = OUTPUT_DIR / f"maths_class{cls}_response.md"
            md_path.write_text(response, encoding="utf-8")
            
            # Parse
            parsed = parse_response(response)
            
            # Save parsed JSON
            json_path = OUTPUT_DIR / f"maths_class{cls}_parsed.json"
            with open(json_path, "w", encoding="utf-8") as f:
                json.dump(parsed, f, indent=2, ensure_ascii=False)
            
            print(f"    ✓ both={len(parsed['both'])}, cbse_only={len(parsed['cbse_only'])}, cisce_new={len(parsed['cisce_new'])}")
            return parsed
        else:
            print(f"    ✗ No response")
            return None


async def main():
    # Load data
    data = json.loads(Path(r"D:\platform\backend\_pilot_maths_data.json").read_text(encoding="utf-8"))
    cbse_all = data["cbse"]
    cisce_all = data["cisce"]
    
    classes = [6, 7, 8, 9, 10, 11, 12]
    semaphore = asyncio.Semaphore(3)  # 3 concurrent
    
    print(f"\n=== MATHS MERGE: {len(classes)} classes ===\n")
    
    async with aiohttp.ClientSession() as session:
        tasks = [process_class(session, cls, cbse_all, cisce_all, semaphore) for cls in classes]
        results = await asyncio.gather(*tasks)
    
    # Summary
    total_both = sum(len(r["both"]) for r in results if r)
    total_cbse_only = sum(len(r["cbse_only"]) for r in results if r)
    total_cisce_new = sum(len(r["cisce_new"]) for r in results if r)
    
    print(f"\n=== SUMMARY ===")
    print(f"  Both (shared): {total_both} mappings")
    print(f"  CBSE only: {total_cbse_only} nodes")
    print(f"  CISCE new: {total_cisce_new} nodes")
    print(f"  Output dir: {OUTPUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
