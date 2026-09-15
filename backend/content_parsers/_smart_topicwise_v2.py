import time
import datetime
import subprocess
import sys
import json
import urllib.request
import ssl
import re

API_URL = "https://api.claudeopus.pro/v1/messages"
API_KEY = "sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK"
MODEL = "claude-opus-5"
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

def check_key0():
    try:
        body = json.dumps({"model": MODEL, "max_tokens": 50, "messages": [{"role": "user", "content": "hi"}]}).encode("utf-8")
        req = urllib.request.Request(API_URL, data=body, method="POST")
        req.add_header("x-api-key", API_KEY)
        req.add_header("Content-Type", "application/json")
        req.add_header("anthropic-version", "2023-06-01")
        with urllib.request.urlopen(req, timeout=30, context=CTX) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            text = ""
            for block in data.get("content", []):
                if block["type"] == "text":
                    text = block["text"]
                    break
            if "token limit" in text.lower() or "rate limit" in text.lower():
                reset_match = re.search(r"reset in (\d+) minutes?", text.lower())
                wait_min = int(reset_match.group(1)) if reset_match else 60
                return False, wait_min
            return True, 0
    except Exception as e:
        err = str(e).lower()
        reset_match = re.search(r"reset in (\d+) minutes?", err)
        if reset_match:
            return False, int(reset_match.group(1))
        if "429" in err or "rate" in err or "limit" in err:
            return False, 60
        return False, 30

while True:
    print(f"\n[{datetime.datetime.now().strftime('%H:%M:%S')}] Checking key 0...")
    sys.stdout.flush()
    available, wait_min = check_key0()
    if not available:
        print(f"  Key 0 rate limited, waiting {wait_min} minutes...")
        sys.stdout.flush()
        for remaining in range(wait_min * 60, 0, -60):
            print(f"    {remaining//60} min remaining...")
            sys.stdout.flush()
            time.sleep(60)
        continue
    print(f"  Key 0 live! Starting topicwise_remaining...")
    sys.stdout.flush()
    proc = subprocess.run([sys.executable, "topicwise_remaining.py", "--exclude-hindi"], cwd=r"D:\platform\backend\content_parsers")
    print(f"  Exited code {proc.returncode} at {datetime.datetime.now().strftime('%H:%M:%S')}, waiting 2 min...")
    sys.stdout.flush()
    time.sleep(120)
