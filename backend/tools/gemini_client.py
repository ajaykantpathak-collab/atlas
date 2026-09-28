"""gemini_client.py -- key-rotating Gemini client with retry + backoff.

Keys are loaded from (first hit wins):
  1. GEMINI_API_KEYS env var (comma-separated)
  2. GEMINI_API_KEY env var (single)
  3. D:\\platform\\.gemini_keys file (one per line)

Model tiers tried in the owner's preferred order:
  3.5-flash -> 3.6-flash -> 3.7-flash -> 3.1-flash-lite -> 2.5-flash
(2.5 is kept as a last-resort safety so a dead tier never kills a batch.)

On 429/quota: rotate key, exponential backoff with jitter.
On 404/model-missing: skip to the next model tier immediately.
Built for batch generation: thousands of calls, key exhaustion never
blocks the run.
"""

from __future__ import annotations

import json
import os
import random
import time
import urllib.request
from pathlib import Path
from typing import List, Optional

_KEYS_FILE = Path(r"D:\platform\.gemini_keys")

_KEYS: List[str] = []
_multi = os.environ.get("GEMINI_API_KEYS", "")
if _multi:
    _KEYS = [k.strip() for k in _multi.split(",") if k.strip()]
if not _KEYS:
    _single = os.environ.get("GEMINI_API_KEY", "")
    if _single:
        _KEYS = [_single]
if not _KEYS and _KEYS_FILE.exists():
    _KEYS = [k.strip() for k in
             _KEYS_FILE.read_text(encoding="utf-8").splitlines() if k.strip()]

# model tiers, owner's order; flash-latest kept as last-resort fallback
_MODELS = [
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-flash-latest",
]

# Tiers confirmed dead this run (404/invalid) are skipped entirely.
_dead_models: set = set()
_key_idx = 0
_call_count = 0


def _next_key() -> str:
    global _key_idx
    key = _KEYS[_key_idx % len(_KEYS)]
    _key_idx += 1
    return key


def _backoff(attempt: int, cap: float = 60.0) -> None:
    """Exponential backoff with jitter: 1s, 2s, 4s, ... capped at cap."""
    time.sleep(min(cap, (2 ** attempt)) + random.random())


def generate(prompt: str, max_tokens: int = 500,
             temperature: float = 0.8,
             timeout: int = 30,
             max_attempts: int | None = None) -> Optional[str]:
    """Generate text using the next available key+model with retry.

    timeout: per-request HTTP timeout — large max_tokens responses
    (full node .md authoring) need 120s+, not the 30s batch default.
    max_attempts: total tries before giving up (defaults to a full
    sweep of keys × live model tiers).
    """
    global _call_count
    if not _KEYS:
        return None  # no keys configured
    _call_count += 1

    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"maxOutputTokens": max_tokens,
                             "temperature": temperature},
    }).encode()

    live_models = [m for m in _MODELS if m not in _dead_models]
    if not live_models:
        return None
    total_attempts = max_attempts or (len(_KEYS) * len(live_models))
    for attempt in range(total_attempts):
        key = _next_key()
        # walk tiers: each failed model 404 retires it for the run
        model = live_models[(attempt // len(_KEYS)) % len(live_models)]
        url = (f"https://generativelanguage.googleapis.com/v1beta/"
               f"models/{model}:generateContent?key={key}")
        req = urllib.request.Request(
            url, data=body,
            headers={"Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = json.loads(resp.read())
            parts = (data.get("candidates", [{}])[0].get("content", {})
                     .get("parts", []))
            text = parts[0].get("text", "") if parts else ""
            if text.strip():
                return text.strip()
        except Exception as e:
            err = str(e)
            low = err.lower()
            if "404" in err or "not found" in low or "invalid" in low:
                _dead_models.add(model)
                live_models = [m for m in _MODELS if m not in _dead_models]
                if not live_models:
                    return None
            elif "429" in err or "quota" in low or "rate" in low \
                    or "resourceexhausted" in low.replace(" ", ""):
                _backoff(attempt)
            elif "timed out" in low or "timeout" in low:
                _backoff(attempt, cap=20.0)
            else:
                _backoff(attempt, cap=30.0)
            continue
    return None
