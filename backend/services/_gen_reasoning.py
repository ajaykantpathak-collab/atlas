"""Generate claude_reasoning_engine.py using Fable model via Claude API."""
import urllib.request, json, ssl, os

KEY = os.environ.get("CLAUDE_REASONING_KEY", "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna")
URL = os.environ.get("CLAUDE_REASONING_URL", "https://api.claudeopus.pro/v1/messages")

PROMPT = """You are an expert Python engineer. Generate a complete, production-ready Python file called `claude_reasoning_engine.py`.

This service replaces template-based Socratic question generation in a K-12 learning platform with Claude AI-powered reasoning.

REQUIREMENTS:

1. Claude API Client:
   - Use urllib.request only (no external deps beyond stdlib)
   - API key from env var CLAUDE_REASONING_KEY (default: 'sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna')
   - API URL from env var CLAUDE_REASONING_URL (default: 'https://api.claudeopus.pro/v1/messages')
   - Model: 'fable'
   - Max tokens: 4000
   - Timeout: 90 seconds
   - SSL context with verification
   - Retry on 429/503/timeout with exponential backoff (3 retries, base 5s, max 60s)

2. Socratic Question Generation (async method generate_socratic_question):
   Input: user_query (str), mastery (float 0-1), retrieved_chunks (list of dicts with 'title','text','node_id'), misconceptions (list of dicts), subject (str), class_level (int)
   
   Build a detailed system prompt that instructs Claude to:
   - Analyze what the student specifically doesn't understand from their query
   - Consider mastery level (low <0.4 = start basic, medium 0.4-0.7 = scaffold, high >0.7 = challenge)
   - Generate ONE genuine Socratic question that leads the student to discover the answer
   - NEVER give the answer directly
   - Reference the specific concept, not generic 'this topic'
   - Adapt language to class level (Class 6 vs Class 12)
   - Return JSON: {"question": str, "hint": str, "pedagogical_reason": str}
   
   The hint should be a scaffolded nudge (not the answer), calibrated to mastery.
   The pedagogical_reason explains WHY this question is effective for this student.

3. Misconception Diagnosis (async method diagnose_misconception):
   Input: user_query (str), student_answer (str optional), mastery (float), node_id (str), retrieved_chunks (list)
   
   Build a prompt that instructs Claude to:
   - Analyze the student's query/answer for specific error patterns
   - Identify the ROOT misconception (not just the symptom)
   - Trace back to prerequisite concepts that may be weak
   - Return JSON: {"misconception": str, "root_cause": str, "category": str, "remediation": str, "severity": str}
   
   Categories: conceptual_error, procedural_error, calculation_error, notation_error, prerequisite_gap, misconception
   Severity: low, medium, high

4. Adaptive Learning Path (async method generate_learning_path):
   Input: student_id (str), mastery_map (dict node_id->mastery float), subject (str), class_level (int), target_nodes (list of str), time_available_days (int)
   
   Build a prompt that instructs Claude to:
   - Analyze the student's full mastery graph
   - Identify which nodes are blocking progress on target nodes
   - Generate a personalized multi-week study plan
   - Order nodes by dependency (prerequisites first)
   - Allocate time based on gap severity
   - Return JSON: {"path": [{"node_id": str, "priority": str, "estimated_hours": float, "reason": str, "activities": [str]}], "summary": str, "cross_subject_notes": str}

5. Response parsing:
   - Parse JSON from Claude's response (handle markdown code blocks with ```json ... ```)
   - Strip thinking/reasoning text that some models prepend
   - Fallback to default templates if API fails or JSON is invalid
   - Log errors but never crash the pipeline

6. Caching (in-memory):
   - Cache Socratic questions by (query_hash, mastery_bucket) for 1 hour
   - mastery_bucket: low/medium/high (rounded)
   - Max cache size: 100 entries
   - Use functools.lru_cache or a simple dict with timestamps

7. Async support:
   - All public methods should be async
   - Use asyncio.to_thread for the blocking urllib call

8. Class structure:
   class ClaudeReasoningEngine:
       def __init__(self): ...
       async def generate_socratic_question(self, user_query, mastery, retrieved_chunks, misconceptions, subject, class_level) -> dict
       async def diagnose_misconception(self, user_query, student_answer, mastery, node_id, retrieved_chunks) -> dict
       async def generate_learning_path(self, student_id, mastery_map, subject, class_level, target_nodes, time_available_days) -> dict
       def _call_claude(self, system_prompt, user_prompt) -> str  # sync, wrapped in asyncio.to_thread
       def _parse_json_response(self, text) -> dict
       def _fallback_socratic(self, user_query, mastery, chunks) -> dict
       def _fallback_misconception(self, user_query) -> dict
       def _fallback_learning_path(self, mastery_map, target_nodes) -> dict

9. Fallback templates (used when API fails):
   - Socratic: "Let's break this down. What specific part of {topic} is confusing you?"
   - Misconception: {"misconception": "Unable to diagnose (API unavailable)", "root_cause": "unknown", "category": "misconception", "remediation": "Review the concept and try again", "severity": "medium"}
   - Learning path: Order target nodes by mastery ascending, allocate 2 hours each

10. Logging:
    - Use logging.getLogger(__name__)
    - Log API calls, errors, cache hits/misses
    - Never log API keys or student personal data

Output ONLY the Python code, no markdown fences, no explanations. Start with the module docstring and imports."""

ctx = ssl.create_default_context()
body = json.dumps({
    "model": "fable",
    "max_tokens": 16000,
    "system": "You are an expert Python engineer who writes production-ready code. Output only valid Python code, no markdown fences.",
    "messages": [{"role": "user", "content": PROMPT}]
}).encode("utf-8")

req = urllib.request.Request(URL, data=body, method="POST")
req.add_header("x-api-key", KEY)
req.add_header("Content-Type", "application/json")
req.add_header("anthropic-version", "2023-06-01")

print("Calling Fable API...")
try:
    with urllib.request.urlopen(req, timeout=120, context=ctx) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        text = ""
        for block in data.get("content", []):
            if block.get("type") == "text":
                text = block.get("text", "")
                break
        # Strip markdown fences if present
        if text.startswith("```"):
            lines = text.split("\n")
            # Remove first line (```python) and last line (```)
            lines = [l for l in lines if not l.strip().startswith("```")]
            text = "\n".join(lines)
        print(f"Generated {len(text)} chars, {text.count(chr(10))} lines")
        out_path = r"D:\platform\backend\services\claude_reasoning_engine.py"
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"SAVED to {out_path}")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}: {e.read().decode()[:500]}")
except Exception as e:
    print(f"ERROR: {str(e)[:500]}")
