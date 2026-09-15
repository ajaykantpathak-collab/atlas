"""gemini_client.py -- key-rotating Gemini Flash client with retry.

Keys are loaded from the GEMINI_API_KEYS environment variable
(comma-separated).  Falls back to the GEMINI_API_KEY single-key env
var.  Rotates across 3 model tiers (2.0 Flash -> 2.0 Flash-Lite
-> 1.5 Flash) with automatic retry on 429/errors.  Built for batch
CBQ generation: thousands of calls, key exhaustion never blocks the
run.
"""

from __future__ import annotations

import json
import os
import time
import urllib.request
from typing import List, Optional

# Load keys from environment (never hardcoded)
_KEYS: List[str] = []
_multi = os.environ.get("GEMINI_API_KEYS", "")
if _multi:
    _KEYS = [k.strip() for k in _multi.split(",") if k.strip()]
if not _KEYS:
    _single = os.environ.get("GEMINI_API_KEY", "")
    if _single:
        _KEYS = [_single]

# model tiers, tried in order on 429/404 (real Gemini model names)
_MODELS = [
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-3-flash-preview",
]

_key_idx = 0
_model_idx = 0
_call_count = 0


def _next_key() -> str:
    global _key_idx
    key = _KEYS[_key_idx % len(_KEYS)]
    _key_idx += 1
    return key


def _next_model() -> str:
    global _model_idx
    _model_idx += 1
    return _MODELS[_model_idx % len(_MODELS)]


def generate(prompt: str, max_tokens: int = 500,
             temperature: float = 0.8) -> Optional[str]:
    """Generate text using the next available key+model with retry."""
    global _call_count
    if not _KEYS:
        return None  # no keys configured
    _call_count += 1

    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"maxOutputTokens": max_tokens,
                             "temperature": temperature},
    }).encode()

    total_attempts = len(_KEYS) * len(_MODELS)
    for attempt in range(total_attempts):
        key = _next_key()
        # advance model tier every full key cycle so all tiers are tried
        model = _MODELS[(attempt // len(_KEYS)) % len(_MODELS)]
        url = (f"https://generativelanguage.googleapis.com/v1beta/"
               f"models/{model}:generateContent?key={key}")
        req = urllib.request.Request(
            url, data=body,
            headers={"Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read())
            parts = (data.get("candidates", [{}])[0].get("content", {})
                     .get("parts", []))
            text = parts[0].get("text", "") if parts else ""
            if text.strip():
                return text.strip()
        except Exception as e:
            err = str(e)
            if "429" in err or "quota" in err.lower():
                time.sleep(1)  # brief pause before next key
            elif "404" in err or "not found" in err.lower():
                # model not available -- advance to next tier
                _next_model()
            continue
    return None
