"""slm_extractor.py -- NuExtract-based structured extraction.

Uses NuExtract-1.5-smol (1.7B) to extract structured data from
question text. Replaces regex-based extraction with a model that
understands English and only outputs what's in the text (no
hallucination).

Output schema:
{
  "subject": "maths|physics|chemistry|commerce|unknown",
  "asked": "what the question wants (dimension or type)",
  "quantities": [
    {"value": 500, "unit": "Rs", "role": "cost_price"},
    ...
  ],
  "is_computational": true/false,
  "needs_figure": true/false
}
"""
from __future__ import annotations

import json
import os
import re
from typing import Any, Dict, List, Optional, Tuple

import torch

_MODEL = None
_TOKENIZER = None
_DEVICE = None
_MODEL_PATH = r"D:\.cache\huggingface\hub\models--numind--NuExtract-1.5-smol\snapshots\7b4eda06be472f905b06ee9b18feaf5dd227d4d5"


# The extraction template -- NuExtract fills this in.
# Field hints in the template guide the model to output what we want.
_EXTRACTION_TEMPLATE = """{
    "subject": "one of: maths, physics, chemistry, commerce",
    "asked": "what to find, e.g. area, profit, speed, current, pH",
    "quantities": [
        {
            "value": "numeric value only, e.g. 500",
            "unit": "unit symbol only, e.g. Rs, cm, m, kg, km/h",
            "role": "what this value represents, e.g. cost_price, selling_price, length, width, radius, speed, time, principal, rate"
        }
    ],
    "is_computational": "true or false",
    "needs_figure": "true or false"
}"""


def _load_model():
    """Load NuExtract model and tokenizer (lazy, once)."""
    global _MODEL, _TOKENIZER, _DEVICE
    if _MODEL is not None:
        return _MODEL, _TOKENIZER, _DEVICE

    from transformers import AutoModelForCausalLM, AutoTokenizer

    _DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
    _TOKENIZER = AutoTokenizer.from_pretrained(
        _MODEL_PATH, trust_remote_code=True)
    _MODEL = AutoModelForCausalLM.from_pretrained(
        _MODEL_PATH, torch_dtype=torch.bfloat16,
        trust_remote_code=True).to(_DEVICE).eval()
    return _MODEL, _TOKENIZER, _DEVICE


def _build_prompt(text: str, template: str) -> str:
    """Build NuExtract prompt."""
    return (f"<|input|>\n### Template:\n{template}\n"
            f"### Text:\n{text}\n\n<|output|>")


def extract_structured(
    text: str,
    max_new_tokens: int = 1000,
) -> Optional[Dict[str, Any]]:
    """Extract structured data from question text using NuExtract.

    Returns a dict with keys: subject, asked, quantities,
    is_computational, needs_figure. Returns None on failure.
    """
    if not text or not text.strip():
        return None

    model, tokenizer, device = _load_model()

    template = json.dumps(json.loads(_EXTRACTION_TEMPLATE), indent=4)
    prompt = _build_prompt(text, template)

    with torch.no_grad():
        enc = tokenizer(prompt, return_tensors="pt",
                        truncation=True,
                        max_length=8000).to(device)
        pred_ids = model.generate(**enc, max_new_tokens=max_new_tokens,
                                  do_sample=False, temperature=0.0)
        output = tokenizer.decode(pred_ids[0],
                                  skip_special_tokens=True)

    # Extract the part after <|output|>
    if "<|output|>" in output:
        output = output.split("<|output|>", 1)[1]

    output = output.strip()

    # Try to parse as JSON -- NuExtract may produce partial JSON
    # so we try to find the first complete JSON object
    parsed = None
    try:
        parsed = json.loads(output)
    except json.JSONDecodeError:
        start = output.find("{")
        if start >= 0:
            depth = 0
            for i in range(start, len(output)):
                if output[i] == "{":
                    depth += 1
                elif output[i] == "}":
                    depth -= 1
                    if depth == 0:
                        try:
                            parsed = json.loads(output[start:i + 1])
                        except json.JSONDecodeError:
                            pass
                        break

    if parsed is None:
        return None

    # Post-process: clean up the extracted data
    return _postprocess(parsed, text)


def _postprocess(parsed: Dict[str, Any],
                 original_text: str) -> Dict[str, Any]:
    """Clean up SLM output into our canonical format."""
    # 1. Normalize subject
    subject_raw = str(parsed.get("subject", "")).strip().lower()
    subject = "unknown"
    if subject_raw in ("maths", "math", "mathematics"):
        subject = "maths"
    elif subject_raw in ("physics", "physical science"):
        subject = "physics"
    elif subject_raw in ("chemistry", "chemical science", "science"):
        subject = "chemistry"
    elif subject_raw in ("commerce", "accountancy", "accounting",
                          "business", "business studies", "economics"):
        subject = "commerce"
    parsed["subject"] = subject

    # 2. Clean quantities -- extract numeric value from "Rs 500" etc.
    cleaned_qs = []
    for q in parsed.get("quantities", []):
        if not isinstance(q, dict):
            continue
        val_raw = str(q.get("value", "")).strip()
        unit_raw = str(q.get("unit", "")).strip()
        role_raw = str(q.get("role", "")).strip().lower()
        role_raw = role_raw.replace(" ", "_").replace("-", "_")

        if not val_raw:
            continue

        # Extract numeric value from strings like "Rs 500", "12 cm", "5%"
        num_match = re.search(r"-?\d+(?:\.\d+)?", val_raw)
        if not num_match:
            continue
        value = float(num_match.group(0))

        # If unit is empty, try to extract from value string
        if not unit_raw:
            # "Rs 500" -> unit="Rs"
            # "5%" -> unit="%"
            # "12 cm" -> unit="cm"
            unit_match = re.search(
                r"(?:^|(?<=\d))\s*([a-zA-Z%/\u00b0\u03bc\u03a9\u00b3\u00b2]+)",
                val_raw)
            if unit_match:
                unit_raw = unit_match.group(1).strip()
            # Also check if "Rs" or "rupees" precedes the number
            money_match = re.search(
                r"(Rs\.?|INR|rupees?)\s*\d", val_raw, re.I)
            if money_match:
                unit_raw = "Rs"

        # If unit still empty but role hints at money
        if not unit_raw and role_raw in (
                "cost_price", "selling_price", "marked_price",
                "principal", "profit", "loss", "interest", "amount",
                "capital", "discount", "price"):
            unit_raw = "Rs"

        cleaned_qs.append({
            "value": value,
            "unit": unit_raw,
            "role": role_raw,
        })
    parsed["quantities"] = cleaned_qs

    # 3. Infer is_computational if empty
    is_comp = parsed.get("is_computational", "")
    if isinstance(is_comp, str):
        is_comp = is_comp.strip().lower()
        if is_comp in ("true", "yes", "1"):
            parsed["is_computational"] = True
        elif is_comp in ("false", "no", "0"):
            parsed["is_computational"] = False
        else:
            # Infer: computational if we have quantities
            parsed["is_computational"] = len(cleaned_qs) > 0

    # 4. Infer needs_figure if empty
    needs_fig = parsed.get("needs_figure", "")
    if isinstance(needs_fig, str):
        needs_fig = needs_fig.strip().lower()
        if needs_fig in ("true", "yes", "1"):
            parsed["needs_figure"] = True
        elif needs_fig in ("false", "no", "0"):
            parsed["needs_figure"] = False
        else:
            # Infer from text
            fig_words = ["figure", "diagram", "graph", "refer to fig",
                         "see figure", "in the figure", "shown in"]
            parsed["needs_figure"] = any(
                w in original_text.lower() for w in fig_words)

    return parsed


def extract_quantities_with_roles(
    text: str,
) -> List[Dict[str, Any]]:
    """Extract quantities with their roles from text.

    Returns [{"value": 500, "unit": "Rs", "role": "cost_price"}, ...]
    """
    result = extract_structured(text)
    if not result:
        return []

    quantities = result.get("quantities", [])
    cleaned = []
    for q in quantities:
        if not isinstance(q, dict):
            continue
        val = q.get("value")
        if val is None or val == "":
            continue
        try:
            val = float(val)
        except (TypeError, ValueError):
            continue
        unit = str(q.get("unit", "")).strip()
        role = str(q.get("role", "")).strip().lower().replace(" ", "_")
        cleaned.append({"value": val, "unit": unit, "role": role})
    return cleaned


def identify_subject_slm(text: str) -> Tuple[str, float]:
    """Identify subject using SLM. Returns (subject, confidence)."""
    result = extract_structured(text)
    if not result:
        return "unknown", 0.0
    subject = str(result.get("subject", "")).strip().lower()
    if subject in ("maths", "math", "mathematics"):
        return "maths", 0.9
    if subject in ("physics", "physical science"):
        return "physics", 0.9
    if subject in ("chemistry", "chemical science"):
        return "chemistry", 0.9
    if subject in ("commerce", "accountancy", "business",
                   "economics", "accounting"):
        return "commerce", 0.9
    return "unknown", 0.3


def extract_asked_slm(text: str) -> Tuple[str, float]:
    """Extract what the question asks for. Returns (asked, confidence)."""
    result = extract_structured(text)
    if not result:
        return "unknown", 0.0
    asked = str(result.get("asked", "")).strip().lower()
    if not asked:
        return "unknown", 0.0
    return asked, 0.85


def is_computational_slm(text: str) -> bool:
    """Check if the question is computational (not essay/conceptual)."""
    result = extract_structured(text)
    if not result:
        return True  # default to trying
    val = result.get("is_computational", "")
    if isinstance(val, bool):
        return val
    if isinstance(val, str):
        return val.strip().lower() in ("true", "yes", "1")
    return True


def needs_figure_slm(text: str) -> bool:
    """Check if the question needs a figure we don't have."""
    result = extract_structured(text)
    if not result:
        return False
    val = result.get("needs_figure", "")
    if isinstance(val, bool):
        return val
    if isinstance(val, str):
        return val.strip().lower() in ("true", "yes", "1")
    return False
