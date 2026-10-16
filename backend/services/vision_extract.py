"""vision_extract.py — NVIDIA NIM OCR/vision extraction (services seam).

Moved out of api/vision.py so the HTTP edge shares ONE implementation:
api/vision.py (POST /api/vision/extract) and routers/learning_upgrades.py
(examiner photo grading) both reach these helpers through this services
module — router→router/api cross-imports are a boundaries-lint violation
class (ROUTER_CROSS_IMPORT).

Pipeline (unchanged from the original api/vision.py implementation):
  1. nvidia/nemotron-parse — purpose-built document OCR (image-only input,
     returns markdown + bounding boxes via tool_calls). Fast (~1.5s).
  2. meta/llama-3.2-11b-vision-instruct — fallback when the parse output is
     too thin to be a problem (diagrams, apparatus photos, low text).

Note: helpers raise fastapi HTTPException exactly as before, so served
error codes are byte-identical to the pre-move behaviour.
"""

from __future__ import annotations

import base64
import binascii
import logging
import os
import re
from typing import Optional

import httpx
from fastapi import HTTPException

logger = logging.getLogger(__name__)

NVIDIA_BASE = "https://integrate.api.nvidia.com/v1"
PARSE_MODEL = "nvidia/nemotron-parse"
VISION_MODEL = "meta/llama-3.2-11b-vision-instruct"
TIMEOUT_S = 30.0
MAX_IMAGE_B64 = 8 * 1024 * 1024  # ~6MB raw image


def _nvidia_key() -> str:
    key = os.environ.get("NVIDIA_API_KEY", "")
    if not key:
        raise HTTPException(503, "vision service not configured")
    return key


def _to_data_url(image: str, mime: Optional[str]) -> str:
    """Normalise to a data URL the NIM chat API accepts and guard against image bombs."""
    raw_b64 = image
    if image.startswith("data:"):
        parts = image.split(",", 1)
        if len(parts) == 2:
            raw_b64 = parts[1]
    if len(raw_b64) > MAX_IMAGE_B64:
        raise HTTPException(413, "image too large")
    try:
        raw_bytes = base64.b64decode(raw_b64, validate=True)
    except binascii.Error:
        raise HTTPException(400, "invalid base64 image")

    # Decompression bomb and dimensional sanity guard
    try:
        import io
        from PIL import Image
        with Image.open(io.BytesIO(raw_bytes)) as img:
            w, h = img.size
            if w * h > 16_000_000:  # > 16 Megapixels (~4000x4000)
                raise HTTPException(413, f"image resolution too large ({w}x{h}); max 16MP")
    except HTTPException:
        raise
    except Exception:
        pass  # unparseable by PIL will be handled by model endpoint or rejected

    if image.startswith("data:"):
        return image
    return f"data:{mime or 'image/jpeg'};base64,{image}"


def _bbox_to_text(args_json: str) -> tuple[str, int]:
    """nemotron-parse returns tool_calls[].function.arguments = a JSON-ish
    list of {bbox, text, type}. Extract the text fields in reading order."""
    texts = re.findall(r'"text"\s*:\s*"((?:[^"\\]|\\.)*)"', args_json)
    out = []
    for t in texts:
        try:
            out.append(bytes(t, "utf-8").decode("unicode_escape"))
        except Exception:
            out.append(t)
    return "\n".join(out).strip(), len(texts)


async def _call_parse(data_url: str, key: str) -> tuple[str, int]:
    """nemotron-parse: image-only, OCR → markdown_bbox tool call."""
    payload = {
        "model": PARSE_MODEL,
        "messages": [{
            "role": "user",
            "content": [{"type": "image_url", "image_url": {"url": data_url}}],
        }],
        "max_tokens": 2048,
    }
    async with httpx.AsyncClient(timeout=TIMEOUT_S) as client:
        r = await client.post(
            f"{NVIDIA_BASE}/chat/completions",
            headers={"Authorization": f"Bearer {key}"},
            json=payload,
        )
    if r.status_code != 200:
        logger.warning("nemotron-parse %s: %s", r.status_code, r.text[:200])
        return "", 0
    j = r.json()
    msg = (j.get("choices") or [{}])[0].get("message") or {}
    for tc in msg.get("tool_calls") or []:
        if tc.get("function", {}).get("name") == "markdown_bbox":
            return _bbox_to_text(tc["function"].get("arguments") or "")
    content = msg.get("content")
    return (content.strip() if isinstance(content, str) else "", 0)


async def _call_vision(data_url: str, key: str) -> str:
    """llama vision fallback — describe the problem when OCR is thin."""
    payload = {
        "model": VISION_MODEL,
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": (
                    "This is a photo of a student's homework problem or textbook. "
                    "Transcribe the problem exactly — keep equations as LaTeX where "
                    "possible. If it's a diagram, describe what it shows in one line."
                )},
                {"type": "image_url", "image_url": {"url": data_url}},
            ],
        }],
        "max_tokens": 600,
    }
    async with httpx.AsyncClient(timeout=TIMEOUT_S) as client:
        r = await client.post(
            f"{NVIDIA_BASE}/chat/completions",
            headers={"Authorization": f"Bearer {key}"},
            json=payload,
        )
    if r.status_code != 200:
        logger.warning("vision %s: %s", r.status_code, r.text[:200])
        return ""
    j = r.json()
    msg = (j.get("choices") or [{}])[0].get("message") or {}
    content = msg.get("content")
    return content.strip() if isinstance(content, str) else ""
