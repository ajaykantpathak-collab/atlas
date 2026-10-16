"""tokenharbor_client.py -- TokenHarbor API client (OpenAI-compatible) with retry & failover.

Supports models like claude-haiku-5.5:free, deepseek-v4-flash:free, etc.
"""

from __future__ import annotations

import json
import logging
import os
import urllib.request
from typing import Optional

logger = logging.getLogger(__name__)

import threading
import time

_DEFAULT_KEYS = [
    "thk_live_549JX27UBPUCvP7a-qzH54vy6Wh3GOnWG3xgjwj1GQFfegALRuTPQdXNydsAXw8G",
    "thk_live_uXboNrJztO_wjo6h5RqtKPL8EzZQEiOPQ7dnbksxTFGwiuCxJOU75ac6im_oW_hz",
]
_DEFAULT_URL = "https://tokenharbor.ai/v1"
_DEFAULT_MODEL = "claude-haiku-5.5:free"

_key_index = 0
_key_lock = threading.Lock()
_key_last_times: dict = {}
_disabled_keys: set = set()


def _get_round_robin_key(override_key: Optional[str] = None) -> tuple[str, float]:
    """Returns (key, wait_seconds) with independent per-key 3.5s pacing."""
    global _key_index
    with _key_lock:
        if override_key:
            k = override_key
        else:
            active_keys = [k for k in _DEFAULT_KEYS if k not in _disabled_keys]
            if not active_keys:
                active_keys = _DEFAULT_KEYS
            _key_index = (_key_index + 1) % len(active_keys)
            k = active_keys[_key_index]

        now = time.time()
        last = _key_last_times.get(k, 0.0)
        diff = now - last
        wait_s = max(0.0, 3.5 - diff)
        _key_last_times[k] = now + wait_s
        return k, wait_s


def generate(prompt: str, max_tokens: int = 8192,
             temperature: float = 0.1,
             timeout: int = 30,
             model: Optional[str] = None,
             api_key: Optional[str] = None) -> Optional[str]:
    """Generate completion using TokenHarbor API with round-robin multi-key pacing and failover."""
    base_url = (os.environ.get("TOKENHARBOR_BASE_URL") or _DEFAULT_URL).rstrip("/")
    target_model = model or os.environ.get("TOKENHARBOR_MODEL") or _DEFAULT_MODEL
    url = f"{base_url}/chat/completions"

    for attempt in range(3):
        target_key, wait_s = _get_round_robin_key(api_key or os.environ.get("TOKENHARBOR_API_KEY"))
        if wait_s > 0:
            time.sleep(wait_s)

        body = json.dumps({
            "model": target_model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": temperature,
            "max_tokens": max_tokens
        }).encode("utf-8")

        req = urllib.request.Request(
            url,
            data=body,
            headers={
                "Authorization": f"Bearer {target_key}",
                "Content-Type": "application/json"
            }
        )

        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                choice = data.get("choices", [{}])[0]
                content = choice.get("message", {}).get("content", "")
                if content and content.strip():
                    return content.strip()
        except urllib.error.HTTPError as http_err:
            if http_err.code == 429:
                wait_retry = (attempt + 1) * 5.0
                logger.info("TokenHarbor 429 rate limit hit on key %s..., backing off for %.1fs...", target_key[:16], wait_retry)
                time.sleep(wait_retry)
                continue
            if http_err.code == 403:
                # Unverified email key; disable from round-robin for 5 minutes
                logger.warning("TokenHarbor key %s... requires email verification (HTTP 403).", target_key[:16])
                _disabled_keys.add(target_key)
            else:
                logger.warning("TokenHarbor HTTP error (%s): %s", target_model, http_err)
            break
        except Exception as exc:
            logger.warning("TokenHarbor generation failed (%s): %s", target_model, exc)
            time.sleep(1.0)

    # Failover to Gemini Flash-Lite
    try:
        from backend.tools.gemini_client import generate as _gemini_gen
        g_text = _gemini_gen(prompt, max_tokens=max_tokens, temperature=temperature, timeout=timeout)
        if g_text and g_text.strip():
            logger.info("TokenHarbor failover to Gemini Flash-Lite succeeded.")
            return g_text.strip()
    except Exception as g_exc:
        logger.warning("Gemini failover also failed: %s", g_exc)

    return None
