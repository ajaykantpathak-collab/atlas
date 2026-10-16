"""nvidia_client.py -- High-throughput NVIDIA NIM client with dual-key round-robin,
strict 40 RPM per-key rate limiting, thread-safe asynchronous pacing, and robust retries.

Target model: nvidia/nemotron-3-super-120b-a12b (120B parameter reasoning model).
"""

from __future__ import annotations

import os
import json
import logging
import urllib.request
import urllib.error
import threading
import time
import random
import socket
from typing import Optional

logger = logging.getLogger(__name__)

NVIDIA_KEYS = [
    "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",
    "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",
]
NVIDIA_URL = "https://integrate.api.nvidia.com/v1"
NVIDIA_MODEL = "nvidia/nemotron-3-super-120b-a12b"

# 40 RPM = 1.5s min interval. We use 1.6s to strictly guarantee < 37.5 RPM per key.
MIN_INTERVAL_PER_KEY = 1.6

_key_idx = 0
_key_lock = threading.Lock()
_key_scheduled_time: dict[str, float] = {}
_key_backoff_until: dict[str, float] = {}


def _get_key_and_wait() -> tuple[str, float]:
    """Atomically schedules the next request on the best available key.
    
    Computes scheduled launch time inside the lock and returns (key, wait_seconds)
    so the calling thread sleeps OUTSIDE the lock without blocking other threads.
    """
    global _key_idx
    with _key_lock:
        now = time.time()
        # Find key with earliest scheduled availability
        best_key = None
        best_launch = float("inf")
        
        # Round-robin preference
        for offset in range(len(NVIDIA_KEYS)):
            candidate = NVIDIA_KEYS[(_key_idx + offset) % len(NVIDIA_KEYS)]
            last_sched = _key_scheduled_time.get(candidate, 0.0)
            backoff = _key_backoff_until.get(candidate, 0.0)
            earliest = max(now, last_sched + MIN_INTERVAL_PER_KEY, backoff)
            if earliest < best_launch:
                best_launch = earliest
                best_key = candidate
                if earliest == now:
                    break
        
        _key_idx += 1
        _key_scheduled_time[best_key] = best_launch
        wait_s = max(0.0, best_launch - now)
        return best_key, wait_s


def _penalize_key(key: str, penalty_seconds: float):
    with _key_lock:
        _key_backoff_until[key] = time.time() + penalty_seconds


def generate(prompt: str, max_tokens: int = 8192,
             temperature: float = 0.2,
             timeout: int = 300,
             model: Optional[str] = None) -> Optional[str]:
    """Generate completion using NVIDIA NIM with thread-safe dual-key scheduling and robust retries."""
    target_model = model or NVIDIA_MODEL
    url = f"{NVIDIA_URL}/chat/completions"
    max_retries = 5

    for attempt in range(max_retries):
        key, wait_s = _get_key_and_wait()
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
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json"
            }
        )

        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                choice = data.get("choices", [{}])[0]
                msg = choice.get("message", {})
                content = msg.get("content")
                if content and content.strip():
                    return content.strip()
                # Reasoning model fallback: extract from reasoning_content
                reasoning = msg.get("reasoning_content")
                if reasoning and reasoning.strip():
                    return reasoning.strip()

        except urllib.error.HTTPError as http_err:
            if http_err.code == 429:
                penalty = (attempt + 1) * 5.0 + random.uniform(0.5, 2.0)
                _penalize_key(key, penalty)
                logger.warning("NVIDIA 429 rate limit on key %s..., backing off %.1fs (attempt %d/%d)",
                               key[:16], penalty, attempt + 1, max_retries)
                time.sleep(random.uniform(0.5, 1.5))
                continue
            elif http_err.code in (500, 502, 503, 504):
                wait_retry = 2.0 * (1.5 ** attempt) + random.uniform(0.5, 1.5)
                logger.warning("NVIDIA HTTP %d server error, retrying in %.1fs (attempt %d/%d)",
                               http_err.code, wait_retry, attempt + 1, max_retries)
                time.sleep(wait_retry)
                continue
            else:
                logger.warning("NVIDIA HTTP %d error (%s): %s", http_err.code, target_model, http_err)
                break

        except (socket.timeout, urllib.error.URLError, TimeoutError) as net_err:
            wait_retry = 2.0 * (1.5 ** attempt) + random.uniform(0.5, 1.5)
            logger.warning("NVIDIA network/timeout error (%s): %s, retrying in %.1fs (attempt %d/%d)",
                           target_model, net_err, wait_retry, attempt + 1, max_retries)
            time.sleep(wait_retry)
            continue

        except Exception as exc:
            logger.warning("NVIDIA generation unexpected exception (%s): %s", target_model, exc)
            time.sleep(1.0)

    # Failover to TokenHarbor or Gemini Flash-Lite if NVIDIA attempts exhausted
    try:
        from backend.tools.tokenharbor_client import generate as _th_gen
        logger.info("Failing over from NVIDIA to TokenHarbor...")
        res = _th_gen(prompt, max_tokens=max_tokens, temperature=temperature, timeout=30)
        if res and res.strip():
            return res.strip()
    except Exception:
        pass

    try:
        from backend.tools.gemini_client import generate as _gemini_gen
        logger.info("Failing over to Gemini Flash-Lite...")
        return _gemini_gen(prompt, max_tokens=max_tokens, temperature=temperature, timeout=30)
    except Exception:
        return None
