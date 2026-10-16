"""test_ovh_cl01_enrichment_missing.py — CL-01 post-ship review pin.

Fallback 3 used to query `EnrichmentContent.slug` — a column the model
never declared — so every corpus-missing node id raised AttributeError
(500).  After the fix the miss chain (index -> alt-separator -> slug map
-> enrichment_content row) must end in an honest 404.
"""
import os
import sys

import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))


@pytest.mark.asyncio
async def test_corpus_missing_node_returns_404_not_500():
    pytest.importorskip("asyncpg")
    from fastapi import HTTPException
    from backend.database import AsyncSessionLocal
    from backend.routers.content import get_node_enrichment

    async with AsyncSessionLocal() as db:
        with pytest.raises(HTTPException) as ei:
            await get_node_enrichment("c10_zzz_cbse_99_999", db=db)
    assert ei.value.status_code == 404
