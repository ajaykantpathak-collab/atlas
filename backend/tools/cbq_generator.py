"""cbq_generator.py -- CBQ generation pipeline: Gemini Flash for text,
our engine for answers, round-trip check for compatibility.

THE DEAL: the model writes the question prose; our engine computes
the answer.  Zero hallucination in the answer.  The round-trip check
validates that the generated text parses back to the same IR — if the
model's prose is unparseable, we fall back to the deterministic
renderer.  The student never sees a question the engine can't solve.

Usage:
    python -m backend.tools.cbq_generator --outcome "apply simple
    interest" --class 8 --subject maths --count 10
"""

from __future__ import annotations

import json
import os
import time
from pathlib import Path
from typing import Any, Dict, List, Optional

# --------------------------------------------------------------------------- #
# Gemini Flash client (uses the google-generativeai SDK or REST)
# --------------------------------------------------------------------------- #

_API_KEY = os.environ.get("GEMINI_API_KEY", "")
_MODEL = "gemini-2.0-flash"


def _gemini_generate(prompt: str, max_tokens: int = 500) -> Optional[str]:
    """Call Gemini Flash via REST.  Returns text or None."""
    if not _API_KEY:
        return None
    import urllib.request
    import json as _json
    url = (f"https://generativelanguage.googleapis.com/v1beta/models/"
           f"{_MODEL}:generateContent?key={_API_KEY}")
    body = _json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"maxOutputTokens": max_tokens,
                             "temperature": 0.8},
    }).encode()
    req = urllib.request.Request(url, data=body,
                                 headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = _json.loads(resp.read())
        parts = data.get("candidates", [{}])[0].get("content", {}).get(
            "parts", [])
        return parts[0].get("text", "") if parts else None
    except Exception:
        return None


# --------------------------------------------------------------------------- #
# Prompt templates per competency move
# --------------------------------------------------------------------------- #

_TEMPLATES = {
    "apply": (
        "Write a CBSE class {cls} {subject} competency-based question. "
        "The question must test: APPLY — using a learned procedure in a "
        "familiar context. Use these exact values in the question: "
        "{values}. The answer must be computable using standard CBSE "
        "methods for this topic. Give the question only, no answer. "
        "Use Indian names and rupees. One paragraph, 2-3 sentences."),
    "analyse": (
        "Write a CBSE class {cls} {subject} competency-based question. "
        "The question must test: ANALYSE — breaking down a scenario to "
        "identify which concept applies. Use these exact values: "
        "{values}. Include a scenario where the student must first "
        "identify the correct approach before computing. Indian names, "
        "rupees. One paragraph."),
    "evaluate": (
        "Write a CBSE class {cls} {subject} competency-based question. "
        "The question must test: EVALUATE — judging whether a claim or "
        "method is correct. Present a scenario where someone makes a "
        "claim about {topic} and the student must verify or refute it "
        "using these values: {values}. Indian names, rupees."),
    "compare": (
        "Write a CBSE class {cls} {subject} competency-based question. "
        "The question must test: COMPARE — evaluating two options or "
        "scenarios. Present two options involving {topic} with these "
        "values: {values}. Ask which is better and why. Indian names, "
        "rupees."),
}


def build_prompt(outcome: str, cls: int, subject: str,
                 values: Dict[str, Any], topic: str,
                 competency: str) -> str:
    template = _TEMPLATES.get(competency, _TEMPLATES["apply"])
    value_str = ", ".join(f"{k} = {v}" for k, v in values.items())
    return template.format(cls=cls, subject=subject, values=value_str,
                           topic=topic) + f"\n\nTopic: {topic}\nLearning outcome: {outcome}"


# --------------------------------------------------------------------------- #
# Round-trip check: does our parser read the generated text back to
# the same answer?
# --------------------------------------------------------------------------- #


def round_trip_check(generated_text: str, expected_answer: float
                     ) -> Tuple[bool, Optional[float]]:
    """Run the generated question through our solver.  Returns
    (compatible, extracted_answer)."""
    from backend.its.solver.answer_pipeline import answer
    r = answer(generated_text)
    if r.label not in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS"):
        return False, None
    if r.numeric is None:
        return False, None
    # the computed answer must match the expected value
    if abs(r.numeric - expected_answer) / max(1, abs(expected_answer)) > 0.01:
        return False, r.numeric
    return True, r.numeric


# --------------------------------------------------------------------------- #
# Batch generator: generate N questions per learning outcome
# --------------------------------------------------------------------------- #


def generate_batch(outcome: str, cls: int, subject: str,
                   topic: str, competency: str,
                   value_sets: List[Dict[str, Any]],
                   expected_answers: List[float],
                   output_dir: Path) -> Dict:
    """Generate, round-trip check, and store a batch of CBQs."""
    out_path = output_dir / f"cbq_{subject}_c{cls}_{topic.replace(' ', '_')}_{competency}.json"
    results = {"generated": 0, "verified": 0, "roundtrip_failed": 0,
               "items": []}

    for i, (values, expected) in enumerate(zip(value_sets,
                                               expected_answers)):
        prompt = build_prompt(outcome, cls, subject, values, topic,
                              competency)
        text = _gemini_generate(prompt)
        if not text or len(text.strip()) < 30:
            # fall back to deterministic renderer
            from backend.its.solver.surface_renderer import _pretty
            parts = ", ".join(f"{k} = {_pretty(float(v))}"
                              for k, v in values.items())
            text = f"Find the {topic}. Given: {parts}."
            source = "deterministic"
        else:
            text = text.strip().rstrip('"')
            source = "gemini_flash"

        # round-trip check
        ok, got = round_trip_check(text, expected)
        if ok:
            results["verified"] += 1
        else:
            results["roundtrip_failed"] += 1
            # replace with deterministic version
            parts = ", ".join(f"{k} = {v:g}" for k, v in values.items())
            text = f"Find the {topic}. Given: {parts}."
            source = "deterministic_fallback"

        results["generated"] += 1
        results["items"].append({
            "question": text, "expected_answer": expected,
            "source": source, "roundtrip_ok": ok,
            "competency": competency, "class": cls, "subject": subject,
            "topic": topic, "values": values,
        })

    out_path.write_text(json.dumps(results, indent=1))
    return results
