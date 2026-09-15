"""Gemma 4 renderer for the agent ensemble — Gemini API (AI Studio) backend.

Same contract as ClaudeRenderer: render(agent_action, student_state,
teaching_context, language) -> str. The LLM only PHRASES the deterministic
action payload; it never computes answers. On any failure (no key, timeout,
bad response) the caller's template fallback applies, so the tutor loop can
never break because of this module.

Models (Google AI Studio, free tier):
  - gemma-4-26b-a4b-it : fast MoE, default for per-interaction phrasing
  - gemma-4-31b-it     : deeper, used for the free-form ask/WHY lane
Both are thinking models — "thought" parts are filtered out and the token
budget is 8192 so the final text always fits after internal reasoning.
"""
import json
import logging
import os
import shelve
import time
import hashlib
import urllib.request
import urllib.error
from collections import OrderedDict
from pathlib import Path

logger = logging.getLogger(__name__)

# Same fallback contract as claude_renderer so callers behave identically.
FALLBACK_TEMPLATES = {
    "assess": "Let's check your understanding. {question}",
    "scaffold": "Here's a hint: {hint}",
    "feedback": "Not quite. {feedback} Let's try again.",
    "motivate": "{encouragement}",
    "tutor": "Let me explain. {explanation}",
    "redirect": "Before we continue, let's review {prerequisite_concept} first.",
}

SYSTEM_PROMPT = (
    "You are a warm K-12 tutor voice. Rephrase the given teaching action into "
    "natural, encouraging language a school student would like. NEVER give a "
    "direct answer. NEVER change, invent, or drop any number or formula in the "
    "payload. Keep it under 80 words. Output ONLY the phrased text."
)

MAX_OUTPUT_TOKENS = 8192
API_ROOT = "https://generativelanguage.googleapis.com/v1beta/models"
_TIMEOUT = 40

# Action types that deserve the deeper 31B model (free-form explanation).
_DEEP_ACTIONS = {"tutor", "redirect"}


class _LRUCache:
    def __init__(self, capacity=1000):
        self._cache = OrderedDict()
        self._capacity = capacity

    def get(self, key):
        if key not in self._cache:
            return None
        self._cache.move_to_end(key)
        return self._cache[key]

    def put(self, key, value):
        self._cache[key] = value
        if len(self._cache) > self._capacity:
            self._cache.popitem(last=False)


class _PersistentCache:
    def __init__(self, db_path="gemma_voice.db"):
        self._db_path = db_path

    def get(self, key):
        try:
            with shelve.open(self._db_path) as db:
                entry = db.get(key)
                if entry and entry.get("expires_at", 0) > time.time():
                    return entry["response"]
        except Exception as exc:
            logger.warning("Gemma persistent cache read failed: %s", exc)
        return None

    def put(self, key, response, ttl=86400):
        try:
            with shelve.open(self._db_path) as db:
                db[key] = {
                    "response": response,
                    "timestamp": time.time(),
                    "expires_at": time.time() + ttl,
                }
        except Exception as exc:
            logger.warning("Gemma persistent cache write failed: %s", exc)


def _load_api_key() -> str:
    key = (
        os.environ.get("GEMINI_API_KEY")
        or os.environ.get("GOOGLE_API_KEY")
        or ""
    )
    if key:
        return key.strip()
    # Same direct .env scan pattern as backend.config (robust to load order);
    # repo-relative so it works on any checkout location.
    _here = Path(__file__).resolve()           # backend/its/agents/gemma_renderer.py
    for env_path in (Path(".env"), Path("../.env"),
                     _here.parents[2] / ".env",          # <repo>/.env
                     _here.parents[1] / ".env"):         # backend/.env
        try:
            for line in env_path.read_text(encoding="utf-8", errors="ignore").splitlines():
                if line.startswith("GEMINI_API_KEY="):
                    val = line.split("=", 1)[1].strip()
                    if val:
                        return val
        except OSError:
            continue
    return ""


class GemmaRenderer:
    """Phrases deterministic agent actions via Gemma 4 on the Gemini API."""

    def __init__(self, api_key=None, fast_model="gemma-4-26b-a4b-it",
                 deep_model="gemma-4-31b-it", cache_size=1000,
                 persistent_cache_path=None):
        self._api_key = api_key or _load_api_key()
        self._fast_model = fast_model
        self._deep_model = deep_model
        self._memory_cache = _LRUCache(capacity=cache_size)
        self._persistent_cache = (
            _PersistentCache(persistent_cache_path) if persistent_cache_path else None
        )
        self._token_log = []
        self.available = bool(self._api_key)
        if not self.available:
            logger.info("GemmaRenderer: no GEMINI_API_KEY — will always fall back")

    def render(self, agent_action, student_state, teaching_context, language="en"):
        if not self.available:
            return self._fallback_response(agent_action)

        cache_key = self._cache_key(agent_action, student_state, language)
        cached = self._memory_cache.get(cache_key)
        if cached is not None:
            return cached

        if self._persistent_cache:
            persistent = self._persistent_cache.get(cache_key)
            if persistent is not None:
                self._memory_cache.put(cache_key, persistent)
                return persistent

        model = (
            self._deep_model
            if agent_action.get("action_type") in _DEEP_ACTIONS
            else self._fast_model
        )
        text, tokens = self._api_call(agent_action, student_state,
                                      teaching_context, language, model)
        if text:
            self._memory_cache.put(cache_key, text)
            if self._persistent_cache:
                self._persistent_cache.put(cache_key, text)
        if tokens:
            self._token_log.append(tokens)
        return text or self._fallback_response(agent_action)

    def get_token_usage(self):
        return self._token_log

    def _api_call(self, agent_action, student_state, teaching_context,
                  language, model):
        lang_note = " Reply in simple Hinglish (Roman script)." if language == "hinglish" else ""
        user_payload = json.dumps({
            "action_type": agent_action.get("action_type", "tutor"),
            "content_payload": agent_action.get("content_payload", {}),
            "student_mastery_bucket": student_state.get("mastery_bucket", ""),
            "affective_state": student_state.get("affective_state", ""),
            "concept_title": teaching_context.get("concept_title", ""),
        }, separators=(",", ":"), ensure_ascii=False)

        body = json.dumps({
            "contents": [{"role": "user", "parts": [
                {"text": SYSTEM_PROMPT + lang_note + "\n\n" + user_payload}
            ]}],
            "generationConfig": {
                "maxOutputTokens": MAX_OUTPUT_TOKENS,
                "temperature": 0.7,
            },
        }).encode("utf-8")

        url = f"{API_ROOT}/{model}:generateContent?key={self._api_key}"
        req = urllib.request.Request(
            url, data=body,
            headers={"Content-Type": "application/json"}, method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=_TIMEOUT) as resp:
                data = json.loads(resp.read().decode("utf-8"))
        except (urllib.error.HTTPError, urllib.error.URLError, OSError) as exc:
            logger.warning("Gemma API call failed: %s", exc)
            return "", None
        except json.JSONDecodeError as exc:
            logger.warning("Gemma response parse error: %s", exc)
            return "", None

        candidates = data.get("candidates") or []
        parts = (
            candidates[0].get("content", {}).get("parts", [])
            if candidates else []
        )
        # Gemma is a thinking model: skip thought parts, take the final text.
        final = " ".join(
            p.get("text", "") for p in parts if not p.get("thought")
        ).strip()
        usage = data.get("usageMetadata", {})
        tokens = {
            "model": model,
            "input_tokens": usage.get("promptTokenCount"),
            "output_tokens": usage.get("candidatesTokenCount"),
            "thought_tokens": usage.get("thoughtsTokenCount"),
            "timestamp": time.time(),
        }
        # Reject garbage that would leak to a student.
        if not final or "Invalid API key" in final or len(final) > 1200:
            return "", tokens
        return final, tokens

    def _fallback_response(self, agent_action):
        action_type = agent_action.get("action_type", "tutor")
        content = agent_action.get("content_payload", {})
        template = FALLBACK_TEMPLATES.get(action_type, FALLBACK_TEMPLATES["tutor"])
        try:
            return template.format(**content)
        except (KeyError, ValueError):
            return template.format(**{k: content.get(k, "") for k in
                ["question", "hint", "feedback", "encouragement",
                 "explanation", "prerequisite_concept"]})

    @staticmethod
    def _cache_key(agent_action, student_state, language):
        raw = (
            agent_action.get("action_type", "")
            + json.dumps(agent_action.get("content_payload", {}),
                         separators=(",", ":"), sort_keys=True)
            + str(student_state.get("mastery_bucket", ""))
            + language
        )
        return hashlib.md5(raw.encode()).hexdigest()[:16]


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    renderer = GemmaRenderer()
    print("available:", renderer.available)
    result = renderer.render(
        agent_action={"action_type": "scaffold",
                      "content_payload": {"hint": "Think about factors of 12"}},
        student_state={"mastery_bucket": "developing", "affective_state": "neutral"},
        teaching_context={"concept_title": "Prime Factorization"},
        language="en",
    )
    print("RESULT:", result)
    print("Tokens:", renderer.get_token_usage()[-1] if renderer.get_token_usage() else None)
