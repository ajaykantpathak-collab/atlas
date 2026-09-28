"""LLM client using any OpenAI-compatible API endpoint.

Supports:
  - FreeLLMAPI (self-hosted proxy, 28+ free providers, ~4B tokens/month)
  - Groq (free tier, fast inference)
  - OpenRouter (free + paid models)
  - Local Llama/Ollama (completely free, offline)
  - Any other OpenAI-compatible endpoint

The LLM is ONLY used for:
  1. Conceptual question answering (grounded in enrichment content)
  2. Routing fallback (when keyword/TF-IDF routing is ambiguous)
  3. Socratic question generation (guided by curriculum content)

It is NEVER used for math computation — SymPy handles all math.
All LLM responses are grounded in pre-written enrichment content to prevent hallucination.

Configuration via environment variables:
  LLM_API_URL   - Base URL (default: http://localhost:3001/v1 for FreeLLMAPI)
  LLM_API_KEY   - API key (default: sk-free for FreeLLMAPI)
  LLM_MODEL     - Model name (default: llama-3.3-70b-versatile)
  LLM_TIMEOUT   - Request timeout in seconds (default: 60)
"""

import hashlib
import itertools
import json
import logging
import os
import re
import threading
import time
from typing import Optional

import httpx

logger = logging.getLogger(__name__)

# Process-wide round-robin counter shared by all client instances.
_MODEL_RR = itertools.count()

# ── load .env if python-dotenv is available ──────────────────────────────────
try:
    from dotenv import load_dotenv
    # Try multiple .env locations (platform root has FREELLM_* vars)
    _backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    for _env_path in (
        os.path.join(_backend_dir, ".env"),          # backend/.env
        os.path.join(os.path.dirname(_backend_dir), ".env"),  # platform/.env
        os.path.join(os.getcwd(), ".env"),
    ):
        if os.path.exists(_env_path):
            load_dotenv(_env_path, override=False)
except ImportError:
    pass


def _strip_thinking(text: str) -> str:
    """Strip thinking/reasoning text that some models (Qwen3, GPT-OSS) prepend.

    These models often output:
      "<think>...thinking...</think>\n{actual answer}"
      or "Here's a thinking process:\n1. Analyze...\n2. ...\n\n{actual answer}"

    This function extracts the actual answer after the thinking.
    """
    if not text:
        return text

    # Pattern 1: <think>...</think> tags
    think_match = re.search(r'</think>\s*(.*)', text, re.DOTALL)
    if think_match:
        return think_match.group(1).strip()

    # Pattern 2: "Thinking Process:" or "Here's a thinking process:" header
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
            json_match = re.search(r'\{.*\}', text, re.DOTALL)
            if json_match:
                return json_match.group(0).strip()
            lines = text.split('\n')
            answer_lines = []
            found_end = False
            for line in lines:
                if found_end:
                    answer_lines.append(line)
                elif not re.match(r'^\s*\d+[\.\)]\s', line) and not re.match(r'^\s*[-*]\s', line) and line.strip() and not line.lower().startswith(header):
                    if any(kw in line.lower() for kw in ['answer', 'result', 'output', 'json', '{', 'the ']):
                        found_end = True
                        answer_lines.append(line)
            if answer_lines:
                return '\n'.join(answer_lines).strip()

    # Pattern 3: Numbered steps at the start
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
    """OpenAI-compatible LLM client.

    Works with any OpenAI-compatible API:
      - FreeLLMAPI (default, 28+ free providers)
      - Groq, OpenRouter, Together, etc.
      - Local Ollama (http://localhost:11434/v1)

    The client handles:
      - Automatic retry on rate limits (429) with exponential backoff
      - Thinking/reasoning text stripping (for Qwen3, GPT-OSS, etc.)
      - Graceful fallback (returns error string, never crashes)
    """

    def __init__(self, timeout: float = None):
        # Try FREELLM_* vars first (matches .env), fall back to LLM_* vars
        self.base_url = (
            os.environ.get("FREELLM_API_URL")
            or os.environ.get("LLM_API_URL")
            or "http://localhost:3001/v1"
        )
        self.api_key = (
            os.environ.get("FREELLM_API_KEY")
            or os.environ.get("LLM_API_KEY")
            or "sk-free"
        )
        self.model = (
            os.environ.get("FREELLM_MODEL")
            or os.environ.get("LLM_MODEL")
            or "llama-3.1-8b-instruct-fast"  # fast, reliable, free
        )
        # Comma-list model pool → process-wide round robin (e.g.
        # "gemma-4-31b-it,gemma-4-26b-a4b-it").
        self._models = [m.strip() for m in self.model.split(",") if m.strip()] or ["llama-3.1-8b-instruct-fast"]
        self.timeout = timeout or float(os.environ.get("LLM_TIMEOUT", "60"))
        self._cache: dict[str, str] = {}  # simple in-memory prompt-hash cache

    # -- circuit breaker (class state, shared across instances) -----------
    _cb_lock = threading.Lock()
    _cb_failures = 0
    _cb_open_until = 0.0
    _CB_THRESHOLD = 3        # consecutive 5xx/timeout failures to trip
    _CB_COOLDOWN = 30.0      # seconds to fail-fast once tripped

    @property
    def _circuit_open_until(self) -> float:
        return type(self)._cb_open_until

    @classmethod
    def _record_failure(cls) -> None:
        with cls._cb_lock:
            cls._cb_failures += 1
            if cls._cb_failures >= cls._CB_THRESHOLD:
                cls._cb_open_until = time.time() + cls._CB_COOLDOWN
                logger.warning(
                    "LLM circuit OPEN — %d consecutive failures, "
                    "fail-fast for %ss", cls._cb_failures,
                    int(cls._CB_COOLDOWN))

    @classmethod
    def _record_success(cls) -> None:
        with cls._cb_lock:
            cls._cb_failures = 0
            cls._cb_open_until = 0.0

    async def chat(
        self,
        messages: list[dict],
        temperature: float = 0.0,
        max_tokens: int = 500,
        use_cache: bool = True,
        model: Optional[str] = None,
    ) -> str:
        """Send a chat completion request and return the response text.

        Includes retry with backoff for rate-limited (429) responses.
        Never raises — returns error string on failure.
        """
        import asyncio
        import hashlib

        # Cache check (only for deterministic calls)
        cache_key = ""
        if use_cache and temperature == 0.0:
            cache_key = hashlib.sha256(
                json.dumps({"m": messages, "mt": max_tokens}, ensure_ascii=False).encode()
            ).hexdigest()
            if cache_key in self._cache:
                logger.debug("LLM cache hit")
                return self._cache[cache_key]

        # Circuit breaker: when the upstream is 503ing, every request
        # otherwise eats N x timeout seconds of doomed retries and wedges
        # the worker. After CIRCUIT_THRESHOLD consecutive failures, fail
        # instantly for CIRCUIT_COOLDOWN seconds.
        if (self._circuit_open_until > time.time()):
            return "[LLM circuit open — upstream congested]"

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            # explicit `model` (multimodal/audio callers) wins over the
            # round-robin pool — an image or audio payload must never land
            # on a text-only model
            "model": model or self._models[next(_MODEL_RR) % len(self._models)],
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }

        max_retries = 3
        for attempt in range(max_retries):
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                try:
                    response = await client.post(
                        f"{self.base_url}/chat/completions",
                        headers=headers,
                        json=payload,
                    )

                    if response.status_code == 429 and attempt < max_retries - 1:
                        wait = 2 ** attempt
                        logger.info(f"LLM rate-limited (429), retrying in {wait}s (attempt {attempt+1}/{max_retries})")
                        await asyncio.sleep(wait)
                        continue

                    response.raise_for_status()
                    data = response.json()
                    content = data["choices"][0]["message"]["content"].strip()
                    result = _strip_thinking(content)
                    if cache_key:
                        self._cache[cache_key] = result
                    LLMClient._record_success()
                    return result
                except httpx.TimeoutException:
                    LLMClient._record_failure()
                    logger.warning("LLM timeout — falling back to pre-written content")
                    return "[LLM timeout — using pre-written content]"
                except httpx.HTTPStatusError as e:
                    if e.response.status_code == 429:
                        logger.warning(f"LLM rate-limited after {max_retries} retries")
                        return "[LLM rate-limited — using pre-written content]"
                    if e.response.status_code >= 500:
                        LLMClient._record_failure()
                    logger.warning(f"LLM HTTP error: {e}")
                    return "[LLM error — using pre-written content]"
                except httpx.HTTPError as e:
                    logger.warning(f"LLM HTTP error: {e}")
                    return "[LLM error — using pre-written content]"
                except Exception as e:
                    logger.warning(f"LLM unavailable: {e}")
                    return "[LLM unavailable — using pre-written content]"

        return "[LLM rate-limited — using pre-written content]"

    async def route_question(
        self,
        question: str,
        candidate_nodes: list[dict],
    ) -> Optional[str]:
        """Use the LLM to route a question to the correct curriculum node."""
        if not candidate_nodes:
            return None

        node_list = "\n".join(
            f"{i+1}. {n['node_id']}: {n.get('title', n.get('name', ''))}"
            for i, n in enumerate(candidate_nodes[:10])
        )
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a question router for an Indian educational app (CISCE/ICSE/ISC). "
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
            nid = n.get("node_id", n.get("id", ""))
            if nid and nid in result:
                return nid
        return None

    async def answer_with_context(
        self,
        question: str,
        enrichment_content: str,
        scope_boundary: str = "",
    ) -> str:
        """Answer a student question using enrichment content as context.

        The LLM is constrained to ONLY use the provided content — no hallucination.
        """
        system_parts = [
            "You are a CISCE/ICSE/ISC tutor for classes 1-12. Answer the student's question using ONLY the provided enrichment content.",
            "Do NOT add any new facts, examples, or explanations not in the content.",
            "Do NOT change the meaning of the content.",
            "Do NOT solve math problems — the system has a separate math engine for that.",
            "Present the answer conversationally, as if talking to a student.",
            "Keep the answer concise (3-5 sentences) and focused on the question.",
            "Use simple Hinglish where natural (mix of Hindi + English, like how Indian students talk).",
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

        return await self.chat(messages, temperature=0.0, max_tokens=400)

    async def answer_conceptual(
        self,
        question: str,
        enrichment_fields: dict,
    ) -> str:
        """Answer a conceptual/competency question using multiple enrichment fields."""
        context_parts = []
        for field, content in enrichment_fields.items():
            if content and isinstance(content, str) and len(content) > 20:
                context_parts.append(f"### {field.replace('_', ' ').title()}:\n{content}")

        if not context_parts:
            return ""

        context = "\n\n".join(context_parts)

        system_parts = [
            "You are a CISCE/ICSE/ISC tutor for Indian students. A student asked a conceptual question.",
            "Answer using the provided enrichment content from the curriculum as your primary source.",
            "You may use your general knowledge to CONNECT and EXPLAIN the curriculum content, but do not contradict it.",
            "Do NOT invent specific formulas, numerical examples, or facts that aren't in the content.",
            "Do NOT solve math problems — just explain concepts.",
            "Write a clear, specific answer directly addressing the question (3-6 sentences).",
            "Use simple Hinglish where natural (mix of Hindi + English, like how Indian students talk).",
            "If asking 'why', explain the reasoning. Use the content as basis but fill in logical connections.",
            "If asking 'show that', explain what the property means and why it holds.",
            "If asking 'what is', give a clear definition.",
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

    async def generate_socratic_question(
        self,
        student_query: str,
        context_content: str,
        mastery: float = 0.0,
        hint_level: int = 1,
    ) -> str:
        """Generate a Socratic question that guides the student to discover the answer.

        The question should:
          - NOT give the answer directly
          - Guide the student toward the right thinking
          - Be appropriate for the student's mastery level
          - Be in Hinglish where natural
        """
        mastery_desc = {
            (0.0, 0.3): "low mastery — student is new to this topic",
            (0.3, 0.6): "medium mastery — student has some understanding",
            (0.6, 1.0): "high mastery — student understands well but needs a nudge",
        }
        mastery_label = "low mastery"
        for (lo, hi), desc in mastery_desc.items():
            if lo <= mastery < hi:
                mastery_label = desc
                break

        hint_desc = {
            1: "Level 1: Just a conceptual nudge (ask what they already know)",
            2: "Level 2: Point to the relevant formula or principle",
            3: "Level 3: Give a partial structure or setup",
            4: "Level 4: Near-complete (only for high mastery students)",
        }

        system_parts = [
            "You are a Socratic tutor for Indian students (CISCE/ICSE/ISC).",
            "Your job is to ask a GUIDING QUESTION, not give the answer.",
            f"Student mastery: {mastery_label}",
            f"Hint level: {hint_desc.get(hint_level, hint_desc[1])}",
            "Use Hinglish (mix of Hindi + English) where natural.",
            "Ask ONE clear question that helps the student think.",
            "Do NOT give the answer. Do NOT solve the problem.",
            "Reply with ONLY the Socratic question, nothing else.",
        ]

        messages = [
            {
                "role": "system",
                "content": "\n".join(system_parts),
            },
            {
                "role": "user",
                "content": f"Context:\n{context_content[:1000]}\n\nStudent said: {student_query}\n\nGenerate a Socratic guiding question:",
            },
        ]

        return await self.chat(messages, temperature=0.3, max_tokens=150)

    async def explain_step_simpler(
        self,
        step_rule: str,
        step_formula: str,
        step_explanation: str,
        student_level: str = "Class 11",
    ) -> str:
        """Explain a solver step in simpler terms for a struggling student.

        Called when student taps 'Explain this step simpler' on a solver step.
        Uses the LLM to rephrase the step explanation in simpler Hinglish.
        """
        system_parts = [
            f"You are a patient tutor for an Indian {student_level} student.",
            "The student didn't understand a step in a solved problem.",
            "Explain the step in SIMPLER terms using Hinglish (mix of Hindi + English).",
            "Use an analogy or real-life example if helpful.",
            "Keep it to 2-3 sentences. Be encouraging.",
            "Do NOT solve the problem — just explain THIS step.",
        ]

        messages = [
            {
                "role": "system",
                "content": "\n".join(system_parts),
            },
            {
                "role": "user",
                "content": (
                    f"Step rule: {step_rule}\n"
                    f"Formula: {step_formula}\n"
                    f"Original explanation: {step_explanation}\n\n"
                    f"Explain this step simpler:"
                ),
            },
        ]

        return await self.chat(messages, temperature=0.3, max_tokens=200)

    # ── solver fallback ──────────────────────────────────────────────────────

    async def solver_fallback(
        self,
        problem_text: str,
        trigger_reason: str,
        canonical_ir: dict | None = None,
        attempted_solution: dict | None = None,
        error_details: str = "",
    ) -> dict:
        """LLM fallback for the STEM solver when deterministic path fails.

        Strictly limited to ANALYSIS and EXPLANATION — never computation.
        Returns a dict with: extraction, formula_candidates, explanation_text, confidence.
        """
        ir_str = json.dumps(canonical_ir, ensure_ascii=False, indent=2) if canonical_ir else "N/A"
        sol_str = json.dumps(attempted_solution, ensure_ascii=False, indent=2) if attempted_solution else "N/A"

        system_prompt = (
            "You are a STEM problem-solving assistant for a CBSE/CISCE learning platform "
            "(classes 1-12, JEE Advanced, NEET). Your role is STRICTLY limited to analysis "
            "and explanation. You MUST NOT perform calculations — the deterministic compute "
            "engine handles all math.\n\n"
            "Your tasks:\n"
            "1. Analyze the problem and identify what concept/formula applies\n"
            "2. If extraction failed, extract quantities and identify the target\n"
            "3. If no formula was found, suggest formula candidates from standard physics/chem/math\n"
            "4. If verification failed, diagnose what went wrong\n"
            "5. Return structured JSON with: extraction, formula_candidates, explanation_text, confidence\n\n"
            "DO NOT compute numerical answers. DO NOT invent physics. "
            "Stick to established NCERT/CBSE curriculum content.\n\n"
            "Return ONLY valid JSON in this format:\n"
            '{"extraction": {"quantities": [], "target": "", "concept_tags": []}, '
            '"formula_candidates": [], "explanation_text": "", "confidence": 0.0}'
        )

        user_prompt = (
            f"Problem type: {trigger_reason}\n"
            f"Original problem: {problem_text}\n\n"
            f"Structured extraction (if available):\n{ir_str}\n\n"
            f"Computed result (if available):\n{sol_str}\n\n"
            f"Error details (if applicable): {error_details}\n\n"
            "Return JSON:"
        )

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ]

        raw = await self.chat(messages, temperature=0.0, max_tokens=800)

        # Parse JSON from response — handle markdown code blocks
        try:
            # Strip markdown code fences if present
            cleaned = re.sub(r'```(?:json)?\s*', '', raw)
            cleaned = cleaned.replace('```', '').strip()
            # Find the first { to the last }
            start = cleaned.find('{')
            end = cleaned.rfind('}')
            if start != -1 and end != -1 and end > start:
                return json.loads(cleaned[start:end + 1])
        except (json.JSONDecodeError, AttributeError):
            pass

        # Fallback if JSON parsing failed
        return {
            "extraction": {"quantities": [], "target": "", "concept_tags": []},
            "formula_candidates": [],
            "explanation_text": raw if not raw.startswith("[LLM") else "",
            "confidence": 0.0,
            "llm_error": raw.startswith("[LLM"),
        }

    # ── competency justification ─────────────────────────────────────────────

    async def generate_justification(
        self,
        problem_text: str,
        computed_result: dict,
        concept_tags: list[str],
        board: str = "CBSE",
        class_level: str = "10",
    ) -> str:
        """Generate a competency justification for a CBSE/CISCE question.

        The LLM does NOT compute — it explains WHY the computed answer is correct.
        Returns 3-4 sentences of justification text tied to the curriculum competency.
        """
        result_str = json.dumps(computed_result, ensure_ascii=False, indent=2)

        system_prompt = (
            f"You are a physics/chemistry/maths tutor for {board} Class {class_level}. "
            "A student solved a competency question deterministically. "
            "Your job is to write a 3-4 sentence justification that:\n"
            "1. States the physics/chemistry/maths principle applied\n"
            "2. References the calculation (do NOT recalculate)\n"
            "3. Explains why the result makes sense\n"
            "4. Ties it to the CBSE/CISCE competency framework\n\n"
            "Do NOT do new calculations. Do NOT contradict the computed result. "
            "Use simple English appropriate for the class level. "
            "Reply with ONLY the justification text, nothing else."
        )

        user_prompt = (
            f"Problem: {problem_text}\n\n"
            f"Computed result: {result_str}\n\n"
            f"Concepts: {', '.join(concept_tags)}\n\n"
            "Write the justification:"
        )

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ]

        return await self.chat(messages, temperature=0.3, max_tokens=300)


# Singleton client
_client: Optional[LLMClient] = None


def get_llm_client() -> LLMClient:
    """Get or create the singleton LLM client."""
    global _client
    if _client is None:
        _client = LLMClient()
    return _client
