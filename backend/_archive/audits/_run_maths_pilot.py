"""Send maths pilot prompt to Claude and save response."""
import asyncio
import aiohttp
import ssl
import os
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

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")


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
            print(f"  Calling Claude (attempt {attempt+1})... prompt={len(prompt)} chars")
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


async def main():
    prompt = Path(r"D:\platform\backend\_pilot_maths_prompt.txt").read_text(encoding="utf-8")
    print(f"Prompt loaded: {len(prompt)} chars (~{len(prompt)//4} tokens)")

    async with aiohttp.ClientSession() as session:
        response = await call_claude(session, prompt)

    if response:
        # Save raw response
        out = Path(r"D:\platform\backend\_pilot_maths_response.md")
        out.write_text(response, encoding="utf-8")
        print(f"\nResponse saved to {out} ({out.stat().st_size//1024}KB)")

        # Quick stats
        cat_a = response.count("cisce_node_id:")
        cat_c = response.count("## NODE: c")
        print(f"\n=== QUICK STATS ===")
        print(f"  Category A (both) mappings: {cat_a}")
        print(f"  Category C (new CISCE nodes): {cat_c}")
        
        # Show first 2000 chars
        print(f"\n=== FIRST 2000 CHARS ===")
        print(response[:2000])
    else:
        print("No response received!")


if __name__ == "__main__":
    asyncio.run(main())
