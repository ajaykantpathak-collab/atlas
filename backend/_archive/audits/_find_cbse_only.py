"""Find CBSE maths nodes that have NO CISCE equivalent (CBSE-only)."""
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

TASK: Find CBSE nodes that have NO equivalent in CISCE.

A CBSE node has a CISCE equivalent if ANY CISCE node covers the same concept,
even if in a different class. For example:
- CBSE "quadratic equations" node → CISCE has nodes about quadratic equations → MATCH
- CBSE node about a topic CISCE doesn't teach at all → NO MATCH

Output ONLY the CBSE node IDs that have NO CISCE equivalent.
One per line, nothing else:

c6_math_cbse_005
c10_math_cbse_042
...

If all CBSE nodes have CISCE equivalents, output: ALL_MATCHED

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

    (OUTPUT_DIR / "maths_cbse_only_nodes.md").write_text(response, encoding="utf-8")

    unmatched = []
    for line in response.strip().split("\n"):
        line = line.strip()
        if line == "ALL_MATCHED":
            print("\nAll CBSE nodes have CISCE equivalents!")
            break
        m = re.match(r'(c\d+_math_cbse_\d+)', line)
        if m:
            unmatched.append(m.group(1))

    print(f"\n=== RESULT ===")
    print(f"CBSE nodes with NO CISCE equivalent (CBSE-only): {len(unmatched)}")
    print(f"CBSE nodes WITH CISCE equivalent (both): {len(cbse_all) - len(unmatched)}")
    print(f"CISCE nodes with CBSE equivalent (both): 504")
    print(f"CISCE nodes with NO CBSE equivalent (CISCE-only): 33")

    if unmatched:
        print(f"\nCBSE-only node IDs (first 20):")
        for uid in unmatched[:20]:
            print(f"  {uid}")
        if len(unmatched) > 20:
            print(f"  ... and {len(unmatched)-20} more")


if __name__ == "__main__":
    asyncio.run(main())
