"""Ping both Claude API keys and check rate limit status."""
import json
import urllib.request
import ssl

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

KEYS = {
    "key0": "sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK",
    "key1": "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna",
}

API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"

for name, key in KEYS.items():
    print(f"\n=== {name} ===")
    body = json.dumps({
        "model": MODEL,
        "max_tokens": 10,
        "messages": [{"role": "user", "content": "Say OK"}],
    }).encode("utf-8")
    req = urllib.request.Request(API_URL, data=body, method="POST")
    req.add_header("x-api-key", key)
    req.add_header("Content-Type", "application/json")
    req.add_header("anthropic-version", "2023-06-01")
    try:
        with urllib.request.urlopen(req, timeout=30, context=CTX) as resp:
            print(f"  HTTP {resp.status}")
            data = json.loads(resp.read().decode("utf-8"))
            text = ""
            for block in data.get("content", []):
                if block.get("type") == "text":
                    text = block["text"]
                    break
            print(f"  Response: {text[:300]}")
            if "rate limit" in text.lower() or "token limit" in text.lower() or "reset" in text.lower():
                print(f"  *** RATE LIMITED ***")
            else:
                print(f"  *** LIVE ***")
    except urllib.error.HTTPError as e:
        print(f"  HTTP {e.code}")
        body = e.read().decode("utf-8")
        print(f"  Body: {body[:500]}")
        if e.code == 429:
            print(f"  *** RATE LIMITED (429) ***")
            for h in e.headers:
                if 'retry' in h.lower() or 'ratelimit' in h.lower() or 'reset' in h.lower():
                    print(f"  {h}: {e.headers[h]}")
    except Exception as e:
        print(f"  Error: {e}")
