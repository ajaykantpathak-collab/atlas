"""paper_generator router — paper assembly + corpus coverage endpoints.

POST /api/paper-generator/generate  → assembled board-pattern paper + answer key
GET  /api/paper-generator/coverage  → per-chapter/difficulty counts for the picker
"""
from typing import List, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.services.paper_generator import (
    PaperRequest,
    coverage,
    generate_paper,
)

router = APIRouter(prefix="/api/paper-generator", tags=["paper-generator"])


class GenerateBody(BaseModel):
    class_level: int
    subject: str
    total_marks: int = 80
    duration_minutes: int = 180
    chapters: Optional[List[str]] = None
    difficulty: Optional[List[str]] = None
    paper_title: str = ""
    seed: Optional[int] = None


@router.post("/generate")
async def generate(body: GenerateBody, db: AsyncSession = Depends(get_db)):
    req = PaperRequest(
        class_level=body.class_level,
        subject=body.subject,
        total_marks=max(10, min(body.total_marks, 200)),
        duration_minutes=max(30, min(body.duration_minutes, 360)),
        chapters=body.chapters or [],
        difficulty=body.difficulty or [],
        paper_title=body.paper_title,
        seed=body.seed,
    )
    return await generate_paper(db, req)


@router.get("/coverage")
async def get_coverage(
    class_level: int,
    subject: str,
    db: AsyncSession = Depends(get_db),
):
    return await coverage(db, class_level, subject)
