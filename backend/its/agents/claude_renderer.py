import json
import time
import urllib.request
import urllib.error
import hashlib
import logging
from collections import OrderedDict
import shelve
import os

logger = logging.getLogger(__name__)

FALLBACK_TEMPLATES = {
    "assess": "Let's check your understanding. {question}",
    "scaffold": "Here's a hint: {hint}",
    "feedback": "Not quite. {feedback} Let's try again.",
    "motivate": "{encouragement}",
    "tutor": "Let me explain. {explanation}",
    "redirect": "Before we continue, let's review {prerequisite_concept} first.",
}

SYSTEM_PROMPT = (
    "You are a K-12 tutor. Convert the given pedagogical action into natural, "
    "encouraging language. Never give direct answers. Be precise. Match the "
    "student's level. Output max 300 tokens."
)


class LRUCache:
    def __init__(self, capacity=1000):
        self._cache = OrderedDict()
        self._capacity = capacity

    def get(self, key):
        if key not in self._cache:
            return None
        self._cache.move_to_end(key)
        return self._cache[key]

    def put(self, key, value):
        if key in self._cache:
            self._cache.move_to_end(key)
        self._cache[key] = value
        if len(self._cache) > self._capacity:
            self._cache.popitem(last=False)

    def clear(self):
        self._cache.clear()


class ClaudeReasoningCache:
    def __init__(self, db_path="claude_reasoning.db"):
        self._db_path = db_path

    def get(self, key):
        try:
            with shelve.open(self._db_path) as db:
                entry = db.get(key)
                if entry and entry.get("expires_at", 0) > time.time():
                    return entry["response"]
        except Exception as exc:
            logger.warning("Persistent cache read failed: %s", exc)
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
            logger.warning("Persistent cache write failed: %s", exc)


class ClaudeRenderer:
    def __init__(self, api_key=None, api_url=None, model="fable", cache_size=1000, persistent_cache_path=None):
        self._api_key = api_key or os.environ.get("ANTHROPIC_API_KEY") or os.environ.get("CLAUDE_API_KEY") or ""
        self._api_url = api_url or os.environ.get("CLAUDE_API_URL", "https://api.claudeopus.pro/v1/messages")
        self._model = model
        self._memory_cache = LRUCache(capacity=cache_size)
        self._persistent_cache = (
            ClaudeReasoningCache(persistent_cache_path) if persistent_cache_path else None
        )
        self._token_log = []

    def render(self, agent_action, student_state, teaching_context, language="en"):
        cache_key = self._cache_key(agent_action, student_state, language)

        cached = self._memory_cache.get(cache_key)
        if cached is not None:
            logger.debug("Memory cache hit: %s", cache_key[:8])
            return cached["text"]

        if self._persistent_cache:
            persistent = self._persistent_cache.get(cache_key)
            if persistent is not None:
                logger.debug("Persistent cache hit: %s", cache_key[:8])
                self._memory_cache.put(cache_key, {"text": persistent, "tokens": None})
                return persistent

        text, tokens = self._api_call(agent_action, student_state, teaching_context, language)
        self._memory_cache.put(cache_key, {"text": text, "tokens": tokens})

        if self._persistent_cache:
            self._persistent_cache.put(cache_key, text)

        if tokens:
            self._token_log.append(tokens)

        return text

    def get_token_usage(self):
        return self._token_log

    def clear_cache(self):
        self._memory_cache.clear()

    def _api_call(self, agent_action, student_state, teaching_context, language):
        user_payload = json.dumps({
            "action_type": agent_action.get("action_type", ""),
            "content_payload": agent_action.get("content_payload", {}),
            "student_mastery_bucket": student_state.get("mastery_bucket", ""),
            "affective_state": student_state.get("affective_state", ""),
            "concept_title": teaching_context.get("concept_title", ""),
            "language": language,
        }, separators=(",", ":"))

        data = json.dumps({
            "model": self._model,
            "max_tokens": 300,
            "temperature": 0.7,
            "system": SYSTEM_PROMPT,
            "messages": [{"role": "user", "content": user_payload}],
        }).encode("utf-8")

        req = urllib.request.Request(
            self._api_url,
            data=data,
            headers={
                "Content-Type": "application/json",
                "x-api-key": self._api_key,
                "anthropic-version": "2023-06-01",
            },
            method="POST",
        )

        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                usage_header = resp.headers.get("x-usage")
                usage = {}
                if usage_header:
                    try:
                        usage = json.loads(usage_header)
                    except (json.JSONDecodeError, ValueError):
                        pass

                body = json.loads(resp.read().decode("utf-8"))
                usage_data = body.get("usage", {})
                text = body["content"][0]["text"] if body.get("content") else ""
                tokens = {
                    "input_tokens": usage.get("input_tokens") or usage_data.get("input_tokens"),
                    "output_tokens": usage.get("output_tokens") or usage_data.get("output_tokens"),
                    "timestamp": time.time(),
                }
                return text, tokens

        except urllib.error.HTTPError as exc:
            logger.error("HTTP error %s: %s", exc.code, exc.reason)
        except urllib.error.URLError as exc:
            logger.error("Network error: %s", exc.reason)
        except (json.JSONDecodeError, KeyError, IndexError) as exc:
            logger.error("Response parse error: %s", exc)

        return self._fallback_response(agent_action), None

    def _fallback_response(self, agent_action):
        action_type = agent_action.get("action_type", "tutor")
        content = agent_action.get("content_payload", {})
        template = FALLBACK_TEMPLATES.get(action_type, FALLBACK_TEMPLATES["tutor"])
        try:
            return template.format(**content)
        except (KeyError, ValueError):
            return template.format(**{k: content.get(k, "") for k in
                ["question", "hint", "feedback", "encouragement", "explanation", "prerequisite_concept"]})

    @staticmethod
    def _cache_key(agent_action, student_state, language):
        raw = agent_action.get("action_type", "") + json.dumps(
            agent_action.get("content_payload", {}), separators=(",", ":")
        ) + str(student_state.get("mastery_bucket", "")) + language
        return hashlib.md5(raw.encode()).hexdigest()[:16]


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    import sys
    key = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("ANTHROPIC_API_KEY", "")
    renderer = ClaudeRenderer(api_key=key)
    result = renderer.render(
        agent_action={"action_type": "scaffold", "content_payload": {"hint": "Think about factors"}},
        student_state={"mastery_bucket": "developing", "affective_state": "neutral"},
        teaching_context={"concept_title": "Prime Factorization"},
        language="en",
    )
    print(result)
    print("Token log:", renderer.get_token_usage())