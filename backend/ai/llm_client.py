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

import logging
import os
import re
from typing import Optional

import httpx

from backend.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

# Process-wide round-robin counter shared by all LLMClient instances so
# comma-listed FREELLM_MODEL pools rotate evenly app-wide.
import itertools as _itertools
_MODEL_RR = _itertools.count()


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


class LLMClient:
    """OpenAI-compatible LLM client backed by FreeLLMAPI.

    FreeLLMAPI handles all provider failover internally, so this client
    just needs one endpoint and one key.
    """

    def __init__(self, timeout: float = 40.0):
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

        # Round-robin + failover: on any per-model failure, advance to the
        # next model in the pool so one degraded model never breaks the app.
        # 429s get bounded exponential backoff before moving on.
        pool = len(self._models)
        tries_left = max(pool, 3)
        attempt = 0
        while tries_left > 0:
            model = self._models[next(_MODEL_RR) % pool]
            payload["model"] = model
            tries_left -= 1
            async with httpx.AsyncClient(timeout=self.timeout) as client:
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
                        return answer
                    # Thinking consumed the whole budget — nothing usable
                    logger.warning(f"LLM {model} returned only reasoning text")
                    continue
                except httpx.TimeoutException:
                    logger.warning(f"LLM {model} timeout — trying next model")
                    continue
                except httpx.HTTPStatusError as e:
                    logger.warning(f"LLM {model} HTTP {e.response.status_code} — trying next model")
                    continue
                except httpx.HTTPError as e:
                    logger.warning(f"LLM {model} HTTP error: {e} — trying next model")
                    continue
                except Exception as e:
                    logger.warning(f"LLM {model} unavailable: {e} — trying next model")
                    continue

        return "[LLM unavailable — using pre-written content]"

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
                "content": f"Question: {question}\n\nNodes:\n{node_list}\n\nReply with only the node_id:",
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
                "content": f"Enrichment content:\n{enrichment_content}\n\nStudent question: {question}",
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
                "content": f"Curriculum content for this topic:\n\n{context}\n\nStudent question: {question}",
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
