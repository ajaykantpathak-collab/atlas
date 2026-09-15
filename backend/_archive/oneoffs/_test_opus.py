"""Quick test of Claude Opus 5 API connectivity."""
import urllib.request, json, ssl, time

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"
ctx = ssl.create_default_context()

body = json.dumps({
    "model": MODEL,
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Say OK in Hindi Devanagari. Reply with ONLY the word, nothing else."}]
}).encode("utf-8")

req = urllib.request.Request(URL, data=body, method="POST")
req.add_header("x-api-key", KEY)
req.add_header("Content-Type", "application/json")
req.add_header("anthropic-version", "2023-06-01")

t0 = time.time()
try:
    with urllib.request.urlopen(req, timeout=120, context=ctx) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        elapsed = time.time() - t0
        text = ""
        for block in data.get("content", []):
            if block.get("type") == "text":
                text = block.get("text", "")
                break
        usage = data.get("usage", {})
        print(f"Response ({elapsed:.1f}s): {text}")
        print(f"Usage: {usage}")
        print("API OK")
except urllib.error.HTTPError as e:
    elapsed = time.time() - t0
    body = e.read().decode("utf-8", errors="replace")[:500]
    print(f"HTTP Error {e.code} ({elapsed:.1f}s): {body}")
except Exception as e:
    elapsed = time.time() - t0
    print(f"Error ({elapsed:.1f}s): {e}")
