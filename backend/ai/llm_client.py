"""LLM client using FreeLLMAPI as the unified endpoint.

FreeLLMAPI (https://github.com/tashfeenahmed/freellmapi) is a self-hosted proxy
that aggregates 28+ free LLM providers behind one OpenAI-compatible endpoint.
It handles:
  - Automatic failover across providers (Groq, Gemini, Cerebras, etc.)
  - Quota tracking to stay under every free-tier cap
  - Dynamic model catalog updates
  - ~4 billion tokens/month combined free capacity

The LLM is ONLY used for:
1. Conceptual question answering (grounded in enrichment content)
2. Routing fallback (when keyword/TF-IDF routing is ambiguous)

It is NEVER used for math computation — SymPy handles all math.
"""

import hashlib
import json
import logging
import os
import re
import threading
import time
from typing import Optional

import httpx

from backend.config import get_settings
from backend.ai.prompt_guard import wrap_untrusted

logger = logging.getLogger(__name__)
settings = get_settings()

# Process-wide round-robin counter shared by all LLMClient instances so
# comma-listed FREELLM_MODEL pools rotate evenly app-wide.
import itertools as _itertools
_MODEL_RR = _itertools.count()

# CL-21(c): shared async clients keyed by (loop, timeout) — per-call
# `async with httpx.AsyncClient(...)` rebuilt a full SSL context every
# attempt (~0.8s; WS-H measured 140.7s/176 calls in the LLM lane).
_ASYNC_CLIENTS: dict = {}


def _shared_async_client(timeout) -> httpx.AsyncClient:
    try:
        key = (id(__import__("asyncio").get_running_loop()), timeout)
    except RuntimeError:
        key = (0, timeout)
    c = _ASYNC_CLIENTS.get(key)
    if c is None or c.is_closed:
        c = httpx.AsyncClient(timeout=timeout)
        _ASYNC_CLIENTS[key] = c
    return c


def _strip_thinking(text: str) -> str:
    """Strip thinking/reasoning text that some models (Qwen3, GPT-OSS) prepend.

    These models often output:
      "Here's a thinking process:\n1. Analyze...\n2. ...\n\n{actual answer}"
      or "<think>...thinking...</think>\n{actual answer}"

    This function extracts the actual answer after the thinking.
    """
    if not text:
        return text

    # Pattern 1: <think>/<thought> tags (Qwen3, GPT-OSS, Gemma-4 all emit
    # reasoning under one of these tags)
    think_match = re.search(r'</(?:think|thought)>\s*(.*)', text, re.DOTALL)
    if think_match:
        return think_match.group(1).strip()
    # Unclosed <thought> block at the top (model rambled past max_tokens)
    # — the reply would be pure reasoning; drop it entirely.
    if re.match(r'^\s*<(?:think|thought)>', text):
        return ""

    # Pattern 2: "Thinking Process:" or "Here's a thinking process:" header
    # The actual answer usually comes after the thinking section
    thinking_headers = [
        "here's a thinking process",
        "thinking process:",
        "let me think",
        "let's think",
        "i need to think",
    ]
    lower = text.lower()
    for header in thinking_headers:
        if lower.startswith(header):
            # Find where the thinking ends - look for JSON or a clear answer
            # The answer usually starts at the last JSON object or after a double newline
            # Try to find JSON in the text
            json_match = re.search(r'\{.*\}', text, re.DOTALL)
            if json_match:
                return json_match.group(0).strip()
            # Try to find the answer after numbered steps
            # Look for a line that doesn't start with a number or bullet
            lines = text.split('\n')
            answer_lines = []
            found_end = False
            for line in lines:
                if found_end:
                    answer_lines.append(line)
                elif not re.match(r'^\s*\d+[\.\)]\s', line) and not re.match(r'^\s*[-*]\s', line) and line.strip() and not line.lower().startswith(header):
                    # This line doesn't look like a thinking step
                    if any(kw in line.lower() for kw in ['answer', 'result', 'output', 'json', '{', 'the ']):
                        found_end = True
                        answer_lines.append(line)
            if answer_lines:
                return '\n'.join(answer_lines).strip()

    # Pattern 3: Numbered steps at the start (1. 2. 3. etc.)
    # If the text starts with numbered steps, try to find the answer after them
    if re.match(r'^\s*\d+[\.\)]\s', text):
        lines = text.split('\n')
        answer_lines = []
        in_steps = True
        for line in lines:
            if in_steps and re.match(r'^\s*\d+[\.\)]\s', line):
                continue
            in_steps = False
            answer_lines.append(line)
        if answer_lines:
            result = '\n'.join(answer_lines).strip()
            if result:
                return result

    return text


class CircuitBreaker:
    """Thread-safe circuit breaker preventing cascading hangs when LLM daemon is offline."""
    def __init__(self, failure_threshold: int = 3, recovery_timeout: float = 30.0):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = 0.0
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN

    def record_failure(self):
        import time as _time
        self.failure_count += 1
        self.last_failure_time = _time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = "OPEN"
            logger.warning(f"LLM Circuit breaker TRIPPED to OPEN ({self.failure_count} failures). Fast-failing for {self.recovery_timeout}s.")

    def record_success(self):
        self.failure_count = 0
        self.state = "CLOSED"

    def can_attempt(self) -> bool:
        import time as _time
        if self.state == "CLOSED":
            return True
        if self.state == "OPEN":
            if _time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "HALF_OPEN"
                return True
            return False
        return True  # HALF_OPEN allows test attempts


_GLOBAL_CIRCUIT_BREAKER = CircuitBreaker()


class LLMClient:
    """OpenAI-compatible LLM client backed by FreeLLMAPI.

    FreeLLMAPI handles all provider failover internally, so this client
    just needs one endpoint and one key.
    """

    def __init__(self, timeout: float = 3.0):
        # Settings uses env_prefix="PLATFORM_" and has no FREELLM_* fields —
        # the settings properties return "" unconditionally. Read the real
        # env vars directly; settings kept only as a legacy fallback.
        self.base_url = (
            os.environ.get("FREELLM_API_URL")
            or os.environ.get("LLM_API_URL")
            or settings.FREELLM_API_URL
            or "http://localhost:3001/v1"
        )
        self.api_key = (
            os.environ.get("FREELLM_API_KEY")
            or os.environ.get("LLM_API_KEY")
            or settings.FREELLM_API_KEY
            or "sk-free"
        )
        self.model = (
            os.environ.get("FREELLM_MODEL")
            or os.environ.get("LLM_MODEL")
            or settings.FREELLM_MODEL
            or "llama-3.3-70b-versatile"
        )
        # Round-robin model pool: FREELLM_MODEL may be a comma list
        # (e.g. "gemma-4-31b-it,gemma-4-26b-a4b-it"). The shared process-wide
        # counter rotates picks across ALL client instances so load spreads
        # evenly instead of every instance starting at index 0.
        self._models = [m.strip() for m in self.model.split(",") if m.strip()] or ["llama-3.3-70b-versatile"]
        self.timeout = timeout
        self._cache: dict = {}           # in-memory prompt-hash cache
        self._pdb = self._open_persistent_cache()

    # -- persistent prompt cache -----------------------------------------
    # Same store as services.llm_client (same file, same key format) — a
    # doubt cached by the WS path answers instantly on the HTTP path too.
    _PDB_PATH = os.path.join(
        os.environ.get("CBSE_DATA_DIR", "/app/cbse_data"), "llm_cache.db")

    def _open_persistent_cache(self):
        """SQLite on the shared mount — survives restarts, shared across
        backends and across both LLM client implementations."""
        try:
            import sqlite3
            os.makedirs(os.path.dirname(self._PDB_PATH), exist_ok=True)
            con = sqlite3.connect(self._PDB_PATH, check_same_thread=False)
            con.execute("CREATE TABLE IF NOT EXISTS cache (k TEXT PRIMARY KEY, v TEXT)")
            return con
        except Exception:
            return None

    @staticmethod
    def _ckey(messages: list, max_tokens: int) -> str:
        # identical key format to services.llm_client so both clients share
        return hashlib.sha256(json.dumps(
            {"m": messages, "mt": max_tokens},
            ensure_ascii=False).encode()).hexdigest()

    def _pget(self, k: str):
        try:
            row = self._pdb.execute(
                "SELECT v FROM cache WHERE k=?", (k,)).fetchone() \
                if self._pdb is not None else None
            return row[0] if row else None
        except Exception:
            return None

    def _pset(self, k: str, v: str) -> None:
        try:
            if self._pdb is not None:
                self._pdb.execute(
                    "INSERT OR REPLACE INTO cache (k,v) VALUES (?,?)", (k, v))
                self._pdb.commit()
        except Exception:
            pass

    def _cache_get(self, messages: list, max_tokens: int,
                   temperature: float) -> Optional[str]:
        if temperature != 0.0:
            return None
        k = self._ckey(messages, max_tokens)
        if k in self._cache:
            return self._cache[k]
        v = self._pget(k)
        if v is not None:
            self._cache[k] = v
        return v

    def _cache_set(self, messages: list, max_tokens: int,
                   temperature: float, answer: str) -> None:
        if temperature != 0.0 or not answer or answer.startswith("["):
            return
        k = self._ckey(messages, max_tokens)
        self._cache[k] = answer
        self._pset(k, answer)

    async def chat(
        self,
        messages: list[dict],
        temperature: float = 0.0,
        max_tokens: int = 500,
    ) -> str:
        """Send a chat completion request and return the response text.

        FreeLLMAPI handles failover across 28+ providers automatically.
        Includes retry with backoff for rate-limited (429) responses.
        """
        import asyncio

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": "",
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }

        cached = self._cache_get(messages, max_tokens, temperature)
        if cached is not None:
            return cached

        if not _GLOBAL_CIRCUIT_BREAKER.can_attempt():
            logger.warning("LLM call skipped: Circuit breaker is OPEN. Returning fast fallback.")
            return "[LLM unavailable — using pre-written content]"

        # If default points to Next.js frontend port (:3001), route directly to Gemini 3.5 / 3.1 Flash-lite
        if "localhost:3001" in self.base_url or "127.0.0.1:3001" in self.base_url:
            try:
                from backend.tools.gemini_client import generate as _gemini_gen
                prompt_parts = [f"{m.get('role', 'user').upper()}: {m.get('content', '')}" for m in messages]
                full_prompt = "\n\n".join(prompt_parts)
                g_ans = _gemini_gen(full_prompt, max_tokens=max_tokens, temperature=temperature, timeout=25)
                if g_ans and g_ans.strip():
                    clean_ans = _strip_thinking(g_ans.strip())
                    self._cache_set(messages, max_tokens, temperature, clean_ans)
                    return clean_ans
            except Exception as _ge:
                logger.warning(f"Direct Gemini call failed: {_ge}")
            return "[LLM unavailable — using pre-written content]"

        # Round-robin + failover: on any per-model failure, advance to the
        # next model in the pool so one degraded model never breaks the app.
        # 429s get bounded exponential backoff before moving on.
        pool = len(self._models)
        tries_left = min(max(pool, 2), 3)
        attempt = 0
        while tries_left > 0:
            model = self._models[next(_MODEL_RR) % pool]
            payload["model"] = model
            tries_left -= 1
            client = _shared_async_client(self.timeout)
            try:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=headers,
                    json=payload,
                )

                # Retry same model on 429 (rate limited) with backoff
                if response.status_code == 429 and attempt < 2:
                    attempt += 1
                    tries_left += 1  # don't burn a model switch on rate limit
                    wait = 2 ** attempt
                    logger.info(f"LLM {model} rate-limited (429), retrying in {wait}s")
                    await asyncio.sleep(wait)
                    continue

                response.raise_for_status()
                data = response.json()
                content = data["choices"][0]["message"]["content"].strip()
                answer = _strip_thinking(content)
                if answer:
                    _GLOBAL_CIRCUIT_BREAKER.record_success()
                    self._cache_set(messages, max_tokens, temperature,
                                    answer)
                    return answer
                # Thinking consumed the whole budget — nothing usable
                logger.warning(f"LLM {model} returned only reasoning text")
                continue
            except httpx.TimeoutException:
                _GLOBAL_CIRCUIT_BREAKER.record_failure()
                logger.warning(f"LLM {model} timeout — trying next model")
                continue
            except httpx.HTTPStatusError as e:
                if e.response.status_code in (404, 500, 502, 503, 504):
                    _GLOBAL_CIRCUIT_BREAKER.record_failure()
                logger.warning(f"LLM {model} HTTP {e.response.status_code} — trying next model")
                continue
            except httpx.HTTPError as e:
                _GLOBAL_CIRCUIT_BREAKER.record_failure()
                logger.warning(f"LLM {model} HTTP error: {e} — trying next model")
                continue
            except Exception as e:
                _GLOBAL_CIRCUIT_BREAKER.record_failure()
                logger.warning(f"LLM {model} unavailable: {e} — trying next model")
                continue

        return "[LLM unavailable — using pre-written content]"

    async def chat_stream(
        self,
        messages: list[dict],
        temperature: float = 0.0,
        max_tokens: int = 500,
    ):
        """Async-generator yielding response tokens as they arrive.

        Same failover pool as chat(); streams the FIRST model that responds
        successfully. Falls back to the full (non-streamed) chat() result
        when the upstream doesn't honour stream=True."""
        import asyncio

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": "",
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": True,
        }

        cached = self._cache_get(messages, max_tokens, temperature)
        if cached is not None:
            yield cached
            return

        if not _GLOBAL_CIRCUIT_BREAKER.can_attempt():
            yield "[LLM unavailable — using pre-written content]"
            return

        pool = len(self._models)
        tries_left = min(max(pool, 2), 3)
        while tries_left > 0:
            model = self._models[next(_MODEL_RR) % pool]
            payload["model"] = model
            tries_left -= 1
            try:
                client = _shared_async_client(self.timeout)
                async with client.stream(
                    "POST",
                    f"{self.base_url}/chat/completions",
                    headers=headers,
                    json=payload,
                ) as response:
                    if response.status_code == 429:
                        continue
                    response.raise_for_status()
                    got = False
                    parts: list = []
                    # reasoning models stream `<thought>...</thought>`
                    # first — buffer until we can tell, suppress the
                    # block, then stream the real answer live. If the
                    # stream is short-buffered past 600 chars without
                    # a thought tag, release what we have.
                    buf = ""
                    in_thought = False
                    thought_done = False
                    async for line in response.aiter_lines():
                        if not line.startswith("data:"):
                            continue
                        data = line[5:].strip()
                        if data == "[DONE]":
                            break
                        try:
                            chunk = json.loads(data)
                            delta = (chunk["choices"][0].get("delta") or {}).get("content")
                            if not delta:
                                continue
                            got = True
                            if not thought_done:
                                buf += delta
                                if not in_thought and "<thought" in buf[:40]:
                                    in_thought = True
                                if in_thought:
                                    end = buf.find("</thought>")
                                    if end != -1:
                                        buf = buf[end + 10:]
                                        in_thought = False
                                        thought_done = True
                                        if buf:
                                            parts.append(buf)
                                            yield buf
                                        buf = ""
                                elif len(buf) > 600:
                                    thought_done = True
                                    parts.append(buf)
                                    yield buf
                                    buf = ""
                            else:
                                parts.append(delta)
                                yield delta
                        except (json.JSONDecodeError, KeyError, IndexError):
                            continue
                    if got:
                        _GLOBAL_CIRCUIT_BREAKER.record_success()
                        self._cache_set(messages, max_tokens,
                                        temperature, "".join(parts))
                        return
            except (httpx.TimeoutException, httpx.HTTPError) as e:
                _GLOBAL_CIRCUIT_BREAKER.record_failure()
                logger.warning(f"LLM {model} stream failed: {e} — trying next model")
                continue
            except Exception as e:
                _GLOBAL_CIRCUIT_BREAKER.record_failure()
                logger.warning(f"LLM {model} stream error: {e} — trying next model")
                continue

        # all streams failed — last resort: non-streamed call so the
        # student still gets an answer, just slower
        full = await self.chat(messages, temperature=temperature, max_tokens=max_tokens)
        yield full

    async def route_question(
        self,
        question: str,
        candidate_nodes: list[dict],
    ) -> Optional[str]:
        """Use the LLM to route a question to the correct node."""
        if not candidate_nodes:
            return None

        node_list = "\n".join(
            f"{i+1}. {n['node_id']}: {n['title']}"
            for i, n in enumerate(candidate_nodes[:10])
        )
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a question router for an educational app. "
                    "Given a student's question and a list of topic nodes, "
                    "select the SINGLE most relevant node. "
                    "Reply with ONLY the node_id, nothing else."
                ),
            },
            {
                "role": "user",
                "content": f"Question: {wrap_untrusted(question)}\n\nNodes:\n{node_list}\n\nReply with only the node_id:",
            },
        ]

        result = await self.chat(messages, temperature=0.0, max_tokens=50)
        result = result.strip().strip("\"'")
        for n in candidate_nodes:
            if n["node_id"] in result:
                return n["node_id"]
        return None

    async def answer_with_context(
        self,
        question: str,
        enrichment_content: str,
        scope_boundary: str = "",
    ) -> str:
        """Answer a student question using enrichment content as context."""
        system_parts = [
            "You are a CISCE/CBSE tutor for classes 1-12. Answer the student's question using ONLY the provided enrichment content.",
            "Do NOT add any new facts, examples, or explanations not in the content.",
            "Do NOT change the meaning of the content.",
            "Do NOT solve math problems — the system has a separate math engine for that.",
            "Present the answer conversationally, as if talking to a student.",
            "Keep the answer concise (3-5 sentences) and focused on the question.",
            "If the content doesn't answer the question, say: 'Let me find the right lesson for you.'",
        ]
        if scope_boundary:
            system_parts.append(f"Scope: {scope_boundary}")

        messages = [
            {
                "role": "system",
                "content": "\n".join(system_parts),
            },
            {
                "role": "user",
                "content": f"Enrichment content:\n{enrichment_content}\n\nStudent question: {wrap_untrusted(question)}",
            },
        ]

        return await self.chat(messages, temperature=0.0, max_tokens=1200)

    async def answer_conceptual(
        self,
        question: str,
        enrichment_fields: dict,
    ) -> str:
        """Answer a conceptual/competency question using multiple enrichment fields.

        Args:
            question: The student's question
            enrichment_fields: Dict of {field_name: content} from the enrichment node
        """
        # Build context from all available enrichment fields
        context_parts = []
        for field, content in enrichment_fields.items():
            if content and isinstance(content, str) and len(content) > 20:
                context_parts.append(f"### {field.replace('_', ' ').title()}:\n{content}")

        if not context_parts:
            return ""

        context = "\n\n".join(context_parts)

        system_parts = [
            "You are a CISCE/CBSE tutor. A student asked a conceptual question.",
            "Answer using the provided enrichment content from the curriculum as your primary source.",
            "You may use your general knowledge to CONNECT and EXPLAIN the curriculum content, but do not contradict it.",
            "Do NOT invent specific formulas, numerical examples, or facts that aren't in the content.",
            "Do NOT solve math problems — just explain concepts.",
            "Write a clear, specific answer directly addressing the question (3-6 sentences).",
            "If asking 'why', explain the reasoning. Use the content as basis but fill in logical connections.",
            "If asking 'show that', explain what the property means and why it holds.",
            "If asking 'what is', give a clear definition.",
            "If asking 'how can X help', explain how the concept applies to the real-world scenario.",
            "NEVER say 'this topic needs more detail' or 'try asking for a walkthrough' — always attempt an answer.",
            "Always give your best answer using the content plus standard mathematical knowledge.",
        ]

        messages = [
            {
                "role": "system",
                "content": "\n".join(system_parts),
            },
            {
                "role": "user",
                "content": f"Curriculum content for this topic:\n\n{context}\n\nStudent question: {wrap_untrusted(question)}",
            },
        ]

        return await self.chat(messages, temperature=0.0, max_tokens=500)


# Singleton client
_client: Optional[LLMClient] = None


def get_llm_client() -> LLMClient:
    """Get or create the singleton LLM client."""
    global _client
    if _client is None:
        _client = LLMClient()
    return _client
