"""LLM classifier for multi-step problem routing.

Uses Gemini Flash Lite for classification + variable extraction.
The LLM does ONLY:
  1. Pick which template matches the question
  2. Extract the variable values from the question

The LLM NEVER does math or generates step commands.
All computation is done by the deterministic compute engine.
"""

import re
import json
import asyncio
import requests
from typing import Optional

from backend.ai.template_library import ALL_TEMPLATES
from backend.config import get_settings


# --------------------------------------------------------------------------- #
# Build the template catalog for the LLM prompt
# --------------------------------------------------------------------------- #

def _build_catalog() -> str:
    """Build a compact catalog of template names + descriptions for the LLM."""
    lines = []
    for i, tmpl in enumerate(ALL_TEMPLATES, 1):
        name = tmpl["template_name"]
        keywords = ", ".join(tmpl.get("keywords", [])[:4])
        vars_list = [v["name"] for v in tmpl.get("variables", [])]
        vars_str = ", ".join(vars_list) if vars_list else "none"
        lines.append(f"{i}. {name} — keywords: {keywords} — variables: {vars_str}")
    return "\n".join(lines)


_CATALOG = _build_catalog()


SYSTEM_PROMPT = f"""You are a problem classifier for a math/physics/chemistry/biology solver.

Given a student's question, identify which template it matches and extract the variable values.

RULES:
1. Output ONLY a JSON object: {{"template": "template_name", "variables": {{...}}}}
2. If no template matches, output: {{"template": "none", "variables": {{}}}}
3. Extract ALL variable values as numbers (not text)
4. If a value is described in words (e.g. "from rest" = 0, "doubled" = 2), convert to number
5. Use the variable names exactly as listed in the template
6. No explanation, no markdown, just the JSON object

TEMPLATES:
{_CATALOG}

Examples:
Question: "A car starts from rest and accelerates at 5 m/s² for 10 seconds, what is its final velocity?"
Output: {{"template": "kinematics_final_velocity", "variables": {{"u": 0, "a": 5, "t": 10}}}}

Question: "Find the pH of a solution with H+ concentration 0.001 M"
Output: {{"template": "ph_from_concentration", "variables": {{"H": 0.001}}}}

Question: "A rectangular sheet of area 96 cm² is twice as long as wide. Cut squares of side x and fold. Find max volume."
Output: {{"template": "open_top_box_optimization", "variables": {{"area": 96, "ratio": 2}}}}

Question: "What is photosynthesis?"
Output: {{"template": "none", "variables": {{}}}}"""


# --------------------------------------------------------------------------- #
# Gemini API call
# --------------------------------------------------------------------------- #

async def classify_question(question: str) -> Optional[dict]:
    """Classify a question against the template library using Gemini.
    
    Returns {"template": "template_name", "variables": {...}} or None on failure.
    """
    settings = get_settings()
    api_key = settings.GEMINI_API_KEY
    model = settings.GEMINI_MODEL

    if not api_key:
        return None

    def _do_request():
        for attempt in range(3):
            try:
                resp = requests.post(
                    f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}",
                    headers={"Content-Type": "application/json"},
                    json={
                        "contents": [{"parts": [{"text": SYSTEM_PROMPT + "\n\nQuestion: " + question}]}],
                        "generationConfig": {"temperature": 0.1, "maxOutputTokens": 200},
                    },
                    timeout=30,
                )
                if resp.status_code == 429 or resp.status_code == 503:
                    # Rate limited or overloaded — wait and retry
                    import time
                    time.sleep(2 * (attempt + 1))
                    continue
                return resp
            except Exception:
                return None
        return None

    loop = asyncio.get_event_loop()
    try:
        response = await loop.run_in_executor(None, _do_request)
    except Exception:
        return None

    if response is None:
        return None

    if response.status_code != 200:
        return None

    data = response.json()
    try:
        raw = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        return None

    # Parse JSON (strip markdown fences if present)
    clean = raw.strip()
    if clean.startswith("```"):
        lines = clean.split("\n")
        clean = "\n".join(lines[1:])
    if clean.endswith("```"):
        clean = clean.rsplit("```", 1)[0]
    clean = clean.strip()
    if clean.startswith("json"):
        clean = clean[4:].strip()

    # Find the JSON object in the response
    json_match = re.search(r'\{[^{}]*"template"[^{}]*\}', clean, re.DOTALL)
    if json_match:
        clean = json_match.group(0)

    try:
        result = json.loads(clean)
        if isinstance(result, dict) and "template" in result:
            return result
    except json.JSONDecodeError:
        pass

    return None


# --------------------------------------------------------------------------- #
# Template lookup + variable handling
# --------------------------------------------------------------------------- #

def find_template(template_name: str) -> Optional[dict]:
    """Find a template by name in the library."""
    for tmpl in ALL_TEMPLATES:
        if tmpl["template_name"] == template_name:
            return tmpl
    return None


def fill_defaults(template: dict, variables: dict) -> dict:
    """Fill in default values for optional variables that weren't extracted."""
    for var_def in template.get("variables", []):
        var_name = var_def["name"]
        if var_name not in variables or variables[var_name] is None:
            if "default" in var_def:
                variables[var_name] = var_def["default"]
    return variables


def substitute_variables_into_steps(template: dict, variables: dict) -> list[dict]:
    """Substitute {var_name} placeholders in step commands and purposes with actual values."""
    steps = []
    for i, step in enumerate(template["steps"], 1):
        cmd = step["command"]
        purpose = step.get("purpose", "")
        for var_name, var_value in variables.items():
            cmd = cmd.replace(f"{{{var_name}}}", str(var_value))
            purpose = purpose.replace(f"{{{var_name}}}", str(var_value))
        # Also substitute step_N references
        steps.append({
            "step": i,
            "command": cmd,
            "purpose": purpose,
        })
    return steps
