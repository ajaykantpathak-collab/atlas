import os
"""Check Claude API rate limit status by making a minimal request and reading headers."""
import asyncio
import aiohttp
import ssl
import json

API_KEY = os.environ.get('ANTHROPIC_API_KEY') or ''
API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

async def check():
    payload = {
        "model": MODEL,
        "max_tokens": 10,
        "messages": [{"role": "user", "content": "Hi"}],
    }
    headers = {
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(API_URL, json=payload, headers=headers, ssl=CTX) as resp:
            print(f"Status: {resp.status}")
            print()
            print("=== Rate Limit Headers ===")
            for h in sorted(resp.headers.keys()):
                if 'ratelimit' in h.lower() or 'retry' in h.lower() or 'x-ratelimit' in h.lower():
                    print(f"  {h}: {resp.headers[h]}")
            print()
            print("=== All Headers ===")
            for h in sorted(resp.headers.keys()):
                print(f"  {h}: {resp.headers[h]}")
            if resp.status != 200:
                text = await resp.text()
                print(f"\nBody: {text[:500]}")

asyncio.run(check())
