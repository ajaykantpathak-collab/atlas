"""build_bank_embed.py — one-time batch embed of every board_questions
norm_text so the bank lane can match PARAPHRASED bank questions, not
just exact/trigram ones.

Writes cbse_data/bank_q_embed.npz:
    ids     int64[N]   — board_questions.id
    emb     float16[N,384] — MiniLM-L6 embeddings (unit-normalized)
    norms   str[N]     — the norm_text the embedding encodes

Run:  python -m backend.tools.build_bank_embed
Cost: ~250k rows, CPU MiniLM ~500/s -> ~8-10 min, zero API calls.
"""
from __future__ import annotations

import os
import sys
import time

import numpy as np


def _out_dir() -> str:
    base = os.environ.get("CBSE_DATA_DIR") or os.path.join(
        os.path.dirname(__file__), "..", "..", "cbse_data")
    if not os.path.isdir(base):
        alt = os.path.join("D:/platform", "runtime_data")
        base = alt if os.path.isdir(alt) else base
    return base


def main() -> None:
    from sqlalchemy import text as _text
    from backend.its.solver.bank_answer import _engine, normalize

    eng = _engine()
    rows = []
    with eng.connect() as cx:
        res = cx.execute(_text(
            "SELECT id, question_text FROM board_questions "
            "WHERE board = 'CBSE' ORDER BY id"))
        rows = res.fetchall()
    print(f"{len(rows)} questions", flush=True)

    from sentence_transformers import SentenceTransformer
    m = SentenceTransformer("all-MiniLM-L6-v2")

    ids, norms, embs = [], [], []
    t0 = time.time()
    B = 512
    for i in range(0, len(rows), B):
        chunk = rows[i:i + B]
        texts = [normalize(r.question_text or "") for r in chunk]
        if not any(texts):
            continue
        e = m.encode(texts, normalize_embeddings=True,
                     show_progress_bar=False)
        for j, r in enumerate(chunk):
            if texts[j]:
                ids.append(int(r.id))
                norms.append(texts[j])
                embs.append(e[j].astype(np.float16))
        if (i // B) % 40 == 0:
            done = min(i + B, len(rows))
            print(f"{done}/{len(rows)}  ({done/(time.time()-t0):.0f}/s)",
                  flush=True)

    out = os.path.join(_out_dir(), "bank_q_embed.npz")
    np.savez_compressed(
        out,
        ids=np.asarray(ids, dtype=np.int64),
        emb=np.stack(embs).astype(np.float16),
        norms=np.asarray(norms))
    print(f"wrote {out}: {len(ids)} vectors", flush=True)


if __name__ == "__main__":
    sys.exit(main())
