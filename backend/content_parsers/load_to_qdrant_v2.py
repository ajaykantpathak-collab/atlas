"""Qdrant loader v2 — indexes content with Granite 768-dim dense + BM25 sparse vectors.

Replaces the Phase 1 MiniLM loader. Creates hybrid search collections with:
  - Dense vectors: Granite 311M multilingual (768-dim, 200+ languages)
  - Sparse vectors: BM25 with IDF modifier (exact keyword matching)
  - Metadata: subject, class_level, source_format, content_type, node_id

Collections:
  cisce_nodes_v2:          enrichment nodes (4,720 points)
  cisce_questions_v2:      all question records (27,837 points)
  cisce_misconceptions_v2: misconception records (7,034 points)

SAFETY: Creates NEW collections with _v2 suffix. Does NOT delete v1 collections.
        Re-running is safe (uses upsert).
"""

import json
import sys
import time
import math
import re
from pathlib import Path
from collections import Counter, defaultdict
from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance, VectorParams, SparseVectorParams, SparseIndexParams,
    PointStruct, PayloadSchemaType, NamedSparseVector, SparseVector,
)
from sentence_transformers import SentenceTransformer

OUTPUT_DIR = Path(r"D:\platform\parsed_output")
QDRANT_URL = "http://localhost:6333"
EMBEDDING_MODEL = "ibm-granite/granite-embedding-97m-multilingual-r2"
EMBEDDING_DIM = 384
BATCH_SIZE = 100  # Larger batch for faster 97M model


def load_jsonl(filepath: Path) -> list:
    if not filepath.exists():
        return []
    records = []
    with open(filepath, encoding="utf-8-sig") as f:
        for line in f:
            if line.strip():
                records.append(json.loads(line))
    return records


# ---------------------------------------------------------------------------
# BM25 sparse vector computation
# ---------------------------------------------------------------------------

class BM25Encoder:
    """Simple BM25 sparse vector encoder for exact keyword matching.

    Computes BM25 scores for each document, then converts to sparse vector
    format for Qdrant. Uses IDF weighting and term frequency saturation.
    """

    def __init__(self, k1: float = 1.2, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.doc_freq = defaultdict(int)  # term -> number of docs containing it
        self.doc_count = 0
        self.avg_doc_len = 0
        self._fitted = False

    def _tokenize(self, text: str) -> list[str]:
        """Simple tokenization — lowercase, split on non-alphanumeric."""
        text = text.lower()
        tokens = re.findall(r"\b[a-z0-9]{2,}\b", text)
        return tokens

    def fit(self, documents: list[str]):
        """Fit BM25 parameters (IDF, avg doc length) on a corpus."""
        self.doc_count = len(documents)
        total_len = 0

        for doc in documents:
            tokens = self._tokenize(doc)
            total_len += len(tokens)
            unique_tokens = set(tokens)
            for token in unique_tokens:
                self.doc_freq[token] += 1

        self.avg_doc_len = total_len / max(self.doc_count, 1)
        self._fitted = True

    def encode(self, document: str) -> dict:
        """Encode a document as a sparse vector (term -> BM25 score).

        Returns dict with 'indices' and 'values' for Qdrant SparseVector.
        """
        if not self._fitted:
            # Auto-fit on single doc (not ideal but works for queries)
            self.fit([document])

        tokens = self._tokenize(document)
        doc_len = len(tokens)
        term_freqs = Counter(tokens)

        indices = []
        values = []

        for term, tf in term_freqs.items():
            # IDF: log((N - df + 0.5) / (df + 0.5) + 1)
            df = self.doc_freq.get(term, 0)
            idf = math.log((self.doc_count - df + 0.5) / (df + 0.5) + 1)

            # BM25 score: IDF * (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * dl/avgdl))
            numerator = tf * (self.k1 + 1)
            denominator = tf + self.k1 * (1 - self.b + self.b * doc_len / max(self.avg_doc_len, 1))
            score = idf * (numerator / denominator)

            if score > 0:
                # Use hash of term as index (Qdrant requires integer indices)
                indices.append(abs(hash(term)) % (2**31))
                values.append(float(score))

        return {"indices": indices, "values": values}


# ---------------------------------------------------------------------------
# Text extraction for embedding
# ---------------------------------------------------------------------------

def get_embedding_text(record: dict, content_type: str) -> str:
    """Get the text to embed for a record.

    Truncated to 500 chars for fast CPU embedding. The full text is still
    stored in the payload for retrieval — the embedding only needs enough
    text to capture the semantic meaning.
    """
    if content_type == "enrichment":
        parts = [
            record.get("title", ""),
            record.get("definition", ""),
        ]
        return " ".join(p for p in parts if p)[:500]

    elif content_type == "misconceptions":
        parts = [
            record.get("misconception_text", ""),
            record.get("correction", ""),
        ]
        return " ".join(p for p in parts if p)[:500]

    else:  # questions, diagnostics, papers, drill_banks
        parts = [
            record.get("question_text", ""),
        ]
        return " ".join(p for p in parts if p)[:500]


def get_payload(record: dict, content_type: str) -> dict:
    """Get the Qdrant payload (metadata) for a record."""
    payload = {
        "record_id": record.get("record_id"),
        "content_type": content_type,
        "source_file": record.get("source_file"),
        "source_format": record.get("source_format"),
        "subject": record.get("subject"),
        "class_level": record.get("class_level"),
        "target_nodes": record.get("target_nodes", []),
    }

    if content_type == "enrichment":
        payload["node_id"] = record.get("node_id")
        payload["title"] = record.get("title")
        payload["definition"] = (record.get("definition") or "")[:1000]
    elif content_type == "misconceptions":
        payload["misconception_text"] = (record.get("misconception_text") or "")[:1000]
        payload["correction"] = (record.get("correction") or "")[:1000]
    else:
        payload["question_text"] = (record.get("question_text") or "")[:1000]
        payload["answer"] = (record.get("answer") or "")[:1000]

    return payload


def create_collection_v2(client: QdrantClient, name: str):
    """Create a Qdrant collection with dense + sparse vectors."""
    if client.collection_exists(name):
        print(f"  Collection {name} already exists — recreating...")
        client.delete_collection(name)

    client.create_collection(
        collection_name=name,
        vectors_config={
            "dense": VectorParams(size=EMBEDDING_DIM, distance=Distance.COSINE),
        },
        sparse_vectors_config={
            "sparse": SparseVectorParams(
                index=SparseIndexParams(
                    on_disk=False,
                    full_scan_threshold=10000,
                )
            ),
        },
    )

    # Create payload indexes
    indexes = {
        "subject": PayloadSchemaType.KEYWORD,
        "class_level": PayloadSchemaType.INTEGER,
        "source_format": PayloadSchemaType.KEYWORD,
        "content_type": PayloadSchemaType.KEYWORD,
        "node_id": PayloadSchemaType.KEYWORD,
    }

    for field, schema_type in indexes.items():
        try:
            client.create_payload_index(
                collection_name=name,
                field_name=field,
                field_schema=schema_type,
            )
        except Exception as e:
            print(f"    Warning: index creation failed for {field}: {e}")

    print(f"  Created collection {name} (dense={EMBEDDING_DIM}d Granite + sparse BM25)")


def load_records_v2(client: QdrantClient, model, bm25: BM25Encoder,
                     collection_name: str, records: list, content_type: str):
    """Load records into a Qdrant v2 collection with dense + sparse vectors."""
    if not records:
        print(f"  No records to load for {collection_name}")
        return 0

    total = len(records)
    loaded = 0
    start_time = time.time()
    next_milestone = 500

    for i in range(0, total, BATCH_SIZE):
        batch = records[i:i + BATCH_SIZE]

        # Generate dense embeddings
        texts = [get_embedding_text(r, content_type) for r in batch]
        valid = [(j, t) for j, t in enumerate(texts) if t.strip()]
        if not valid:
            continue

        valid_indices = [j for j, _ in valid]
        valid_texts = [t for _, t in valid]
        dense_embeddings = model.encode(valid_texts, show_progress_bar=False)

        # Generate sparse BM25 vectors
        sparse_vectors = [bm25.encode(t) for t in valid_texts]

        # Create points
        points = []
        for k, idx in enumerate(valid_indices):
            r = batch[idx]
            record_id = r.get("record_id", f"rec_{i + idx}")
            point_id = abs(hash(record_id)) % (2**63)

            payload = get_payload(r, content_type)

            points.append(PointStruct(
                id=point_id,
                vector={
                    "dense": dense_embeddings[k].tolist(),
                    "sparse": SparseVector(
                        indices=sparse_vectors[k]["indices"],
                        values=sparse_vectors[k]["values"],
                    ),
                },
                payload=payload,
            ))

        # Upsert points
        try:
            client.upsert(collection_name=collection_name, points=points)
            loaded += len(points)
        except Exception as e:
            print(f"    Error at batch {i}: {e}", flush=True)

        if loaded >= next_milestone or loaded >= total:
            elapsed = time.time() - start_time
            rate = loaded / max(elapsed, 1)
            eta = (total - loaded) / max(rate, 0.1)
            print(f"    Progress: {loaded}/{total} ({rate:.1f} rec/s, ETA: {eta:.0f}s)", flush=True)
            next_milestone += 500

    return loaded


def main():
    print("Qdrant Loader v2 — Granite 768-dim + BM25 Sparse Vectors")
    print("=" * 70)

    client = QdrantClient(url=QDRANT_URL)

    # Test connection
    try:
        collections = client.get_collections()
        print(f"Connected to Qdrant. Existing collections: {len(collections.collections)}")
    except Exception as e:
        print(f"ERROR: Cannot connect to Qdrant: {e}")
        return

    # Load embedding model
    print(f"\nLoading embedding model: {EMBEDDING_MODEL}...")
    model = SentenceTransformer(EMBEDDING_MODEL)
    print(f"  Model loaded (dim={model.get_sentence_embedding_dimension()})")

    # Load all records for BM25 fitting
    print("\nLoading all records for BM25 fitting...", flush=True)
    all_texts = []
    all_records = {}

    for ct in ["enrichment", "misconceptions", "question_bank", "diagnostics", "papers", "drill_banks"]:
        records = load_jsonl(OUTPUT_DIR / f"{ct}.jsonl")
        all_records[ct] = records
        for r in records:
            text = get_embedding_text(r, ct)
            if text.strip():
                all_texts.append(text)
        print(f"  {ct}: {len(records)} records", flush=True)

    print(f"\nFitting BM25 on {len(all_texts)} documents...", flush=True)
    bm25 = BM25Encoder()
    # Fit in chunks to show progress
    chunk_size = 5000
    for i in range(0, len(all_texts), chunk_size):
        chunk = all_texts[i:i+chunk_size]
        if i == 0:
            bm25.fit(chunk)
        else:
            # Incremental update
            bm25.doc_count += len(chunk)
            total_len = 0
            for doc in chunk:
                tokens = bm25._tokenize(doc)
                total_len += len(tokens)
                for token in set(tokens):
                    bm25.doc_freq[token] += 1
            bm25.avg_doc_len = (bm25.avg_doc_len * (i) + total_len) / (i + len(chunk))
        print(f"  BM25 fit progress: {min(i+chunk_size, len(all_texts))}/{len(all_texts)}", flush=True)
    print(f"  BM25 fitted (vocab: {len(bm25.doc_freq)} terms, avg doc len: {bm25.avg_doc_len:.1f})", flush=True)

    # Create v2 collections
    print("\nCreating v2 collections...")
    collection_map = {
        "cisce_nodes_v2": ("enrichment", all_records["enrichment"]),
        "cisce_misconceptions_v2": ("misconceptions", all_records["misconceptions"]),
        "cisce_questions_v2": ("questions", all_records["question_bank"] + all_records["diagnostics"] + all_records["papers"] + all_records["drill_banks"]),
    }

    for coll_name in collection_map:
        create_collection_v2(client, coll_name)

    # Load data
    for coll_name, (ct, records) in collection_map.items():
        print(f"\nLoading {ct} into {coll_name}...")
        loaded = load_records_v2(client, model, bm25, coll_name, records, ct)
        print(f"  Loaded {loaded} records")

    # Print final stats
    print("\n" + "=" * 70)
    print("QDRANT V2 LOAD SUMMARY")
    print("=" * 70)
    for coll_name in collection_map:
        info = client.get_collection(coll_name)
        count = info.points_count
        print(f"  {coll_name:30s}: {count:>6} points")

    print("\nDone.")


if __name__ == "__main__":
    main()
