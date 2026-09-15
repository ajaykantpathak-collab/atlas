"""
Find CISCE maths nodes that have NO CBSE equivalent.
Send all 1478 CBSE + 537 CISCE, ask Claude to list only unmatched CISCE node IDs.
Output is tiny — just a list of IDs.
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
                            wait = 60 * (attempt + 1)
                            print(f"  rate-limited, retry after {wait}s")
                            await asyncio.sleep(wait)
                            continue
                        print(f"  Response: {len(text)} chars")
                        return text
                    print(f"  empty response, retry {attempt+1}")
                    await asyncio.sleep(30 * (attempt + 1))
                else:
                    print(f"  API error {resp.status}: {str(data)[:300]}")
                    wait = 60 * (attempt + 1) if resp.status == 429 else 15 * (attempt + 1)
                    await asyncio.sleep(wait)
        except Exception as e:
            print(f"  retry {attempt+1}: {str(e)[:200]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


async def main():
    data = json.loads(Path(r"D:\platform\backend\_pilot_maths_data.json").read_text(encoding="utf-8"))
    cbse_all = data["cbse"]
    cisce_all = data["cisce"]

    print(f"CBSE maths: {len(cbse_all)} nodes")
    print(f"CISCE maths: {len(cisce_all)} nodes (class 6-12)")

    # Build compact lists — just ID + topic, no full content
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
CISCE has {len(cisce_all)} nodes (slightly coarser but still node-level).

TASK: Find CISCE nodes that have NO equivalent in CBSE.

A CISCE node has a CBSE equivalent if ANY CBSE node covers the same concept,
even if in a different class. For example:
- CISCE "derivatives" node → CBSE has 15 nodes about derivatives → MATCH (has equivalent)
- CISCE "GST computation" node → CBSE has nodes about GST → MATCH
- CISCE node about a topic CBSE doesn't teach at all → NO MATCH

Output ONLY the CISCE node IDs that have NO CBSE equivalent.
One per line, nothing else:

c6_math_005
c10_math_042
...

If all CISCE nodes have CBSE equivalents, output: ALL_MATCHED

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

    # Save raw response
    (OUTPUT_DIR / "maths_unmatched_cisce.md").write_text(response, encoding="utf-8")

    # Parse — just extract node IDs
    unmatched = []
    for line in response.strip().split("\n"):
        line = line.strip()
        if line == "ALL_MATCHED":
            print("\nAll CISCE nodes have CBSE equivalents!")
            break
        m = re.match(r'(c\d+_math_\d+)', line)
        if m:
            unmatched.append(m.group(1))

    print(f"\n=== RESULT ===")
    print(f"CISCE nodes with NO CBSE equivalent: {len(unmatched)}")
    print(f"CISCE nodes WITH CBSE equivalent (both): {len(cisce_all) - len(unmatched)}")
    print(f"CBSE nodes (all tagged 'both' where concept matches): {len(cbse_all)}")

    if unmatched:
        print(f"\nUnmatched CISCE node IDs:")
        for uid in unmatched:
            print(f"  {uid}")

        # Save as markdown
        md = f"# CISCE Maths Nodes with NO CBSE Equivalent\n\n"
        md += f"Total unmatched: {len(unmatched)}\n\n"
        for uid in unmatched:
            md += f"{uid}\n"
        (OUTPUT_DIR / "maths_cisce_only_nodes.md").write_text(md, encoding="utf-8")
        print(f"\nSaved to {OUTPUT_DIR / 'maths_cisce_only_nodes.md'}")


if __name__ == "__main__":
    asyncio.run(main())
