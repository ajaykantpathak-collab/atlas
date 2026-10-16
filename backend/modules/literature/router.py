# -*- coding: utf-8 -*-
"""Literature bank API — साहित्य-कोश.

    GET /api/literature            catalog (filter: class, subject, type, board)
    GET /api/literature/{lit_id}   one full piece — text + meaning + acts +
                                   characters + Q&A
"""
from __future__ import annotations

from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from backend.services import literature_bank

router = APIRouter(prefix="/api/literature", tags=["literature-bank"])


@router.get("")
def catalog(
    klass: Optional[str] = Query(None, alias="class"),
    subject: Optional[str] = None,
    typ: Optional[str] = Query(None, alias="type"),
    board: Optional[str] = None,
):
    """Catalog of all bank pieces — metadata + section list only."""
    items = literature_bank.list_pieces(
        klass=klass, subject=subject, typ=typ, board=board)
    return {"count": len(items), "items": items}


@router.get("/{lit_id}")
def piece(lit_id: str):
    doc = literature_bank.get_piece(lit_id)
    if not doc:
        raise HTTPException(status_code=404, detail="literature piece not found")
    return doc
