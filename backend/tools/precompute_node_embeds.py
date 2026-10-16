"""tools/precompute_node_embeds.py — E1 (BATCH_BRIEF §4): guarantee the
node-embedding .npy exists for the CURRENT corpus content BEFORE a worker
boots, so the ~45-minute in-worker encode never happens on the serving
path.

Run at ship time (SHIP_CHECKLIST step, on the HOST, before the one
rolling restart):

    cd deploy/backend && python -m tools.precompute_node_embeds

Byte-exact contract: the texts/key construction is the loader's own
(services.enhanced_nodes._embed_texts_and_key) — a key computed here is
the key the worker looks up.  Exit codes: 0 = cache present or freshly
built; 1 = index/embedder unavailable (worker will fall back to the
stale-cache path on boot — non-fatal but report it).
"""
import os
import sys
import time

# the `backend` package root is the dir CONTAINING this file's parent:
# deploy/backend/tools/this.py -> sys.path needs deploy/ (container: /app)
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))))

os.environ.setdefault("SOLVER_LLM_MODE", "off")


def main() -> int:
    t0 = time.perf_counter()
    from backend.services.enhanced_nodes import (
        load_index, _embed_texts_and_key, _REPO_ROOT)
    index = load_index()
    n_nodes = len(index.nodes)
    nids, texts, mname, key = _embed_texts_and_key(index)
    cache = os.path.join(_REPO_ROOT, "cbse_data", f"node_embed_{key}.npy")
    print(f"index: {n_nodes} nodes | embedder: {mname}")
    print(f"content key: {key}")
    if os.path.exists(cache):
        import numpy as np
        arr = np.load(cache)
        ok = arr.ndim == 2 and arr.shape[0] == len(nids)
        print(f"cache HIT: {cache} shape={arr.shape} "
              f"rows-match={ok} "
              f"({time.perf_counter() - t0:.1f}s total)")
        return 0 if ok else 1
    print(f"cache MISS: {cache} — encoding {len(texts)} texts "
          "(one-time; this is the ~45-min cost, paid here NOT at boot)")
    import numpy as np
    from backend.services.enhanced_nodes import _node_embeddings
    packed = _node_embeddings(index)   # encodes + saves via the loader
    if packed is None:
        print("ERROR: embedder unavailable — worker will serve stale or "
              "re-encode at boot")
        return 1
    import numpy as np
    nids2, emb, _model = packed
    ok = emb.shape[0] == len(nids2) and os.path.exists(cache)
    print(f"encoded + saved: {cache} shape={emb.shape} "
          f"({time.perf_counter() - t0:.1f}s total)")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
