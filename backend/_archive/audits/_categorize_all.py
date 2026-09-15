"""ONE call: get all three categories at once."""
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


async def call_claude(session, prompt, retries=5):
    body = {"model": MODEL, "max_tokens": 128000,
            "messages": [{"role": "user", "content": prompt}]}
    for attempt in range(retries):
        key = API_KEYS[1]
        headers = {"x-api-key": key, "Content-Type": "application/json",
                   "anthropic-version": "2023-06-01"}
        try:
            print(f"  API call (attempt {attempt+1}, {len(prompt)} chars)...")
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

    print(f"CBSE maths: {len(cbse_all)} nodes")
    print(f"CISCE maths: {len(cisce_all)} nodes")

    cbse_list = []
    for n in cbse_all:
        cbse_list.append(f"{n['node_id']} | c{n['class_level']} | {n['topic']}")
    cbse_text = "\n".join(cbse_list)

    cisce_list = []
    for n in cisce_all:
        syllabus = n.get("syllabus", "")[:150]
        cisce_list.append(f"{n['node_id']} | c{n['class']} | {n['title']}\n  {syllabus}")
    cisce_text = "\n".join(cisce_list)

    prompt = f"""You are comparing CBSE and CISCE mathematics curricula for classes 6-12.

CBSE has {len(cbse_all)} granular atomic nodes.
CISCE has {len(cisce_all)} nodes.

TASK: Categorize EVERY node into exactly ONE of three categories.
Match by concept across class boundaries.

Output THREE sections:

## BOTH
CISCE nodes that have a CBSE equivalent (same concept exists in CBSE).
One per line: cisce_node_id → cbse_node_id
(If one CISCE node maps to multiple CBSE nodes, list all on same line separated by commas)

## CBSE_ONLY
CBSE nodes that have NO CISCE equivalent (concept not taught in CISCE at all).
One node_id per line.

## CISCE_ONLY
CISCE nodes that have NO CBSE equivalent (concept not taught in CBSE at all).
One node_id per line.

Rules:
- Match by concept, not exact wording
- Match across class boundaries (CISCE class 8 can match CBSE class 7)
- Be generous: substantially same concept = BOTH
- Only CBSE_ONLY if NO CISCE node covers that concept
- Only CISCE_ONLY if NO CBSE node covers that concept
- Every node must appear in exactly one category

CBSE MATHS NODES ({len(cbse_all)}):
{cbse_text}

CISCE MATHS NODES ({len(cisce_all)}):
{cisce_text}
"""

    print(f"\nPrompt: {len(prompt)} chars (~{len(prompt)//4} tokens)")

    async with aiohttp.ClientSession() as session:
        response = await call_claude(session, prompt)

    if not response:
        print("No response!")
        return

    (OUTPUT_DIR / "maths_full_categorization.md").write_text(response, encoding="utf-8")

    # Parse
    section = None
    both = []
    cbse_only = []
    cisce_only = []

    for line in response.split("\n"):
        line = line.strip()
        if line == "## BOTH":
            section = "both"
        elif line == "## CBSE_ONLY":
            section = "cbse_only"
        elif line == "## CISCE_ONLY":
            section = "cisce_only"
        elif section == "both" and "→" in line:
            m = re.match(r'(\S+)\s*→\s*(.+)', line)
            if m:
                both.append({"cisce": m.group(1), "cbse": [x.strip() for x in m.group(2).split(",")]})
        elif section == "cbse_only" and re.match(r'c\d+_math_cbse_\d+', line):
            cbse_only.append(line)
        elif section == "cisce_only" and re.match(r'c\d+_math_\d+', line) and "cbse" not in line:
            cisce_only.append(line)

    print(f"\n{'='*60}")
    print(f"  MATHS CATEGORIZATION — COMPLETE")
    print(f"{'='*60}")
    print(f"  BOTH (shared):      {len(both)} CISCE→CBSE mappings")
    print(f"  CBSE_ONLY:          {len(cbse_only)} nodes")
    print(f"  CISCE_ONLY:         {len(cisce_only)} nodes")
    print(f"  Total CBSE:         {len(cbse_all)} ({len(both)} shared + {len(cbse_only)} only)")
    print(f"  Total CISCE:        {len(cisce_all)} ({len(both)} shared + {len(cisce_only)} only)")
    print(f"  Output: {OUTPUT_DIR / 'maths_full_categorization.md'}")
    print(f"{'='*60}")


if __name__ == "__main__":
    asyncio.run(main())
