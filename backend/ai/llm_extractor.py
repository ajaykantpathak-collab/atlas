"""LLM extractor — DeepSeek ONLY.

The LLM does TWO things only:
1. Extracts variables from the question (expressions, points, bounds, etc.)
2. Identifies the category/formula (tangent_normal, integration, etc.)

The LLM NEVER:
- Computes anything
- Decomposes steps
- Solves equations
- Gives answers

SymPy handles ALL math. The LLM is just a parser.
"""
from __future__ import annotations

import json
import logging
import re
from typing import Optional

import httpx

from backend.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


async def call_deepseek(messages: list[dict], max_tokens: int = 1000, timeout: float = 60.0) -> Optional[str]:
    """Call DeepSeek API."""
    # The Settings object changed shape over time; read the key from env
    # vars first with a safe getattr fallback instead of a hard
    # AttributeError ('Settings' has no attribute 'DEEPSEEK_API_KEY').
    import os

    api_key = (
        os.getenv("DEEPSEEK_API_KEY")
        or getattr(settings, "deepseek_api_key", None)
    )
    base_url = (
        os.getenv("DEEPSEEK_BASE_URL")
        or getattr(settings, "deepseek_base_url", None)
        or "https://api.deepseek.com"
    )

    if not api_key or "your_" in api_key:
        logger.warning("DeepSeek API key not configured")
        return None

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            resp = await client.post(
                f"{base_url}/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
                json={"model": "deepseek-chat", "messages": messages, "temperature": 0.0, "max_tokens": max_tokens},
            )
            if resp.status_code == 429:
                logger.warning("DeepSeek rate-limited")
                return None
            resp.raise_for_status()
            content = resp.json()["choices"][0]["message"]["content"].strip()
            # Strip thinking tags
            content = re.sub(r'<think>.*?</think>', '', content, flags=re.DOTALL)
            return content
    except Exception as e:
        logger.warning(f"DeepSeek API error: {e}")
        return None


# The ONLY prompt — extract variables + identify category. No math, no decomposition.
EXTRACT_PROMPT = """You are a math question parser. Extract values and identify the category. DO NOT solve. DO NOT compute. DO NOT decompose steps.

Return ONLY this JSON:
{
  "category": "tangent_normal | differentiation | integration | differential_equation | quadratic | matrix | linear_system | equivalence_relation | continuity | increasing_decreasing | kinematics | max_min | hcf_lcm | percentage | interest | ratio_proportion | set_theory | exponents | inequation | area_between_curves | partial_fraction | homogeneous_ode | circle | vector | probability | progression | trig_identity | proof | optimization",
  "expression": "main expression, use ** for powers, * for multiply (e.g. x**3 - 3*x + 2)",
  "var": "variable letter (x, y, t)",
  "point": "evaluation point if any",
  "rhs": "right side of equation if any",
  "lower": "lower bound for integration/area",
  "upper": "upper bound for integration/area",
  "curve1": "first curve for area problems",
  "curve2": "second curve for area problems",
  "numbers": "comma-separated numbers for HCF/LCM/percentage",
  "matrix_a": "matrix as [[a,b],[c,d]]",
  "matrix_b": "second matrix if any",
  "matrix_power": "matrix power if asked (e.g. 3 for A^3)",
  "set_a": "set elements comma-separated",
  "set_b": "second set elements if any",
  "ode_str": "ODE in dy/dx form (e.g. dy/dx + 2*y = 3*x)",
  "initial_condition": "initial condition (e.g. y(0)=1)",
  "constraint": "domain constraint (e.g. x > -1, x in W)",
  "divisible_by": "number for equivalence relation divisibility",
  "eq_class": "equivalence class value to find",
  "lines": "line equations separated by ; for area between lines",
  "circle_eq": "circle equation",
  "find": "what to find (e.g. velocity_zero, area, tangent, normal, determinant, inverse)"
}

Rules:
- Use ** for exponents, * for multiplication
- For ODEs, rewrite as dy/dx = ... or dy/dx + P*y = Q
- Leave fields empty if not applicable
- DO NOT include answers or solutions

Question: {question}
"""


async def llm_extract(question: str) -> Optional[dict]:
    """Use DeepSeek to extract variables and category from a question.

    The LLM only parses. SymPy computes.
    """
    prompt = EXTRACT_PROMPT.replace("{question}", question[:1000])
    messages = [
        {"role": "system", "content": "Return ONLY valid JSON. No explanations. No math solutions."},
        {"role": "user", "content": prompt},
    ]

    response = await call_deepseek(messages, max_tokens=800, timeout=30.0)
    if not response:
        return None

    try:
        if '{' in response:
            start = response.find('{')
            end = response.rfind('}') + 1
            return json.loads(response[start:end])
    except json.JSONDecodeError as e:
        logger.warning(f"DeepSeek JSON parse failed: {e}")

    return None


def llm_extract_sync(question: str) -> Optional[dict]:
    """Sync wrapper."""
    import asyncio
    return asyncio.run(llm_extract(question))


# ─────────────────────────────────────────────────────────────────────
# Solver generation — DeepSeek writes SymPy code for new question types
# ─────────────────────────────────────────────────────────────────────

SOLVER_GEN_PROMPT = """You are a math teacher and SymPy expert. A student asked this question:

{question}

The student will provide values through a form with these fields: {form_fields}

Write a Python function using SymPy that:
1. Takes a `values` dict with those field names as keys
2. Computes the solution step by step
3. Returns a dict with:
   - "steps": list of {{"step": int, "description": str, "result": str, "success": bool}}
   - "error": str (empty if no error)

Rules:
- Import SymPy inside the function: `from sympy import *`
- Use the student's values from the dict, NOT hardcoded numbers
- Show each computational step clearly
- Return results as strings (str(result))
- The function MUST be named `solve` and take one argument `values`
- DO NOT solve the specific question — write a GENERAL solver for this question TYPE
- DO NOT use input() or print() — just compute and return

Example for "Find HCF of N numbers":
```python
def solve(values):
    from sympy import gcd, ilcm
    nums_str = values.get("numbers", "")
    nums = [int(x.strip()) for x in nums_str.split(",") if x.strip()]
    if not nums:
        return {{"steps": [], "error": "No numbers provided"}}
    steps = []
    h = nums[0]
    for i in range(1, len(nums)):
        h = gcd(h, nums[i])
        steps.append({{"step": i, "description": f"gcd({{h}}, {{nums[i]}})", "result": str(gcd(h, nums[i])), "success": True}})
    steps.append({{"step": len(nums), "description": "Final HCF", "result": str(h), "success": True}})
    return {{"steps": steps, "error": ""}}
```

Now write a solver for this question type. Return ONLY the Python code, no explanations.
"""


SOLVE_PROMPT = """You are a math teacher. Solve this question step by step with clear working. Show each step. Include the final answer. Format as numbered steps.

Question: {question}
"""


async def llm_generate_solver(question: str, form_fields: list[dict]) -> Optional[str]:
    """Ask DeepSeek to write a SymPy solver for a new question type.

    Returns Python code string, or None.
    """
    field_names = [f["name"] for f in form_fields]
    prompt = SOLVER_GEN_PROMPT.replace("{question}", question[:800]).replace("{form_fields}", str(field_names))
    messages = [
        {"role": "system", "content": "You are a SymPy expert. Return ONLY valid Python code. No explanations."},
        {"role": "user", "content": prompt},
    ]
    response = await call_deepseek(messages, max_tokens=2000, timeout=60.0)
    if not response:
        return None
    # Extract code from markdown code blocks if present
    if "```python" in response:
        start = response.find("```python") + 9
        end = response.find("```", start)
        return response[start:end].strip()
    if "```" in response:
        start = response.find("```") + 3
        end = response.find("```", start)
        return response[start:end].strip()
    return response.strip()


async def llm_solve_question(question: str) -> Optional[str]:
    """Ask DeepSeek to solve a specific question (worked solution for student)."""
    prompt = SOLVE_PROMPT.replace("{question}", question)
    messages = [
        {"role": "system", "content": "You are a math teacher. Solve step by step. Show all working."},
        {"role": "user", "content": prompt},
    ]
    return await call_deepseek(messages, max_tokens=2000, timeout=60.0)


def llm_generate_solver_sync(question: str, form_fields: list[dict]) -> Optional[str]:
    import asyncio
    return asyncio.run(llm_generate_solver(question, form_fields))


def llm_solve_question_sync(question: str) -> Optional[str]:
    import asyncio
    return asyncio.run(llm_solve_question(question))
