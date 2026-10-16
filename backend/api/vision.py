"""Vision extraction API — photo of a problem → extracted text.

POST /api/vision/extract

The extraction helpers live in backend.services.vision_extract (the
services seam shared with routers/learning_upgrades.py's examiner photo
grading — router→api cross-imports are a boundaries-lint violation
class).  This module is the HTTP surface: request/response models plus
the parse→vision fallback orchestration.
"""

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from backend.deps import get_current_user
from backend.models.user import User
from backend.services.vision_extract import (
    _call_parse,
    _call_vision,
    _nvidia_key,
    _to_data_url,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/vision", tags=["vision"])


class ExtractRequest(BaseModel):
    """Base64 image — raw or data-url. mime inferred if data-url.

    WS-D caps (2026-10-10): base64 bombs used to flow straight into the
    OCR/vision providers; the payload is bounded (~6MB decoded) and the
    mime must be a real image type."""
    image: str = Field(..., min_length=8, max_length=8_000_000,
                       description="base64 image or data URL")
    mime: Optional[str] = Field(
        default=None, max_length=64, pattern=r"^image/[A-Za-z0-9.+-]+$",
    )


class ExtractResponse(BaseModel):
    text: str
    source: str  # 'parse' | 'vision'
    regions: int = 0


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
