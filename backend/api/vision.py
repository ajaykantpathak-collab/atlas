"""Vision extraction API — photo of a problem → extracted text.

POST /api/vision/extract

Pipeline:
  1. nvidia/nemotron-parse — purpose-built document OCR (image-only input,
     returns markdown + bounding boxes via tool_calls). Fast (~1.5s).
  2. meta/llama-3.2-11b-vision-instruct — fallback when the parse output is
     too thin to be a problem (diagrams, apparatus photos, low text).
"""

import base64
import binascii
import logging
import os
import re
from typing import Any, Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from backend.deps import get_current_user
from backend.models.user import User

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/vision", tags=["vision"])

NVIDIA_BASE = "https://integrate.api.nvidia.com/v1"
PARSE_MODEL = "nvidia/nemotron-parse"
VISION_MODEL = "meta/llama-3.2-11b-vision-instruct"
TIMEOUT_S = 30.0
MAX_IMAGE_B64 = 8 * 1024 * 1024  # ~6MB raw image


class ExtractRequest(BaseModel):
    """Base64 image — raw or data-url. mime inferred if data-url."""
    image: str = Field(..., description="base64 image or data URL")
    mime: Optional[str] = None


class ExtractResponse(BaseModel):
    text: str
    source: str  # 'parse' | 'vision'
    regions: int = 0


def _nvidia_key() -> str:
    key = os.environ.get("NVIDIA_API_KEY", "")
    if not key:
        raise HTTPException(503, "vision service not configured")
    return key


def _to_data_url(image: str, mime: Optional[str]) -> str:
    """Normalise to a data URL the NIM chat API accepts."""
    if image.startswith("data:"):
        return image
    if len(image) > MAX_IMAGE_B64:
        raise HTTPException(413, "image too large")
    try:
        base64.b64decode(image, validate=True)
    except binascii.Error:
        raise HTTPException(400, "invalid base64 image")
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


@router.post("/extract", response_model=ExtractResponse)
async def extract(req: ExtractRequest, user: User = Depends(get_current_user)) -> ExtractResponse:
    key = _nvidia_key()
    data_url = _to_data_url(req.image, req.mime)

    text, regions = await _call_parse(data_url, key)
    if len(text) >= 20:
        return ExtractResponse(text=text, source="parse", regions=regions)

    # OCR too thin — diagram/photo fallback
    vt = await _call_vision(data_url, key)
    if vt:
        return ExtractResponse(text=vt, source="vision", regions=regions)
    if text:
        return ExtractResponse(text=text, source="parse", regions=regions)
    raise HTTPException(422, "could not read this image — try a clearer photo")
