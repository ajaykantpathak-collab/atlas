"""Qdrant loader — indexes parsed content into Qdrant for hybrid search.

Creates 4 collections:
  cisce_nodes:        enrichment nodes (for content retrieval and routing)
  cisce_questions:    all question-like records (for practice and assessment)
  cisce_misconceptions: misconception records (for remediation)
  cisce_papers:       paper records (for exam practice)

Uses all-MiniLM-L6-v2 (384-dim) for now. Granite 311M upgrade is Phase 2.
Collection config supports easy dimension upgrade later (recreate + reload).

SAFETY: Only creates collections and inserts points. Never deletes existing data.
        Uses upsert (insert + update) so re-running is safe.
"""

import json
import sys
import time
from pathlib import Path
from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance, VectorParams, PointStruct,
    PayloadSchemaType, OptimizersConfigDiff,
)
from sentence_transformers import SentenceTransformer

OUTPUT_DIR = Path(r"D:\platform\parsed_output")
QDRANT_URL = "http://localhost:6333"
EMBEDDING_MODEL = "all-MiniLM-L6-v2"
EMBEDDING_DIM = 384
BATCH_SIZE = 100


def load_jsonl(filepath: Path) -> list:
    if not filepath.exists():
        return []
    records = []
    with open(filepath, encoding="utf-8-sig") as f:
        for line in f:
            if line.strip():
                records.append(json.loads(line))
    return records


def get_embedding_text(record: dict, content_type: str) -> str:
    """Get the text to embed for a record."""
    if content_type == "enrichment":
        parts = [
            record.get("title", ""),
            record.get("definition", ""),
            record.get("eli5", ""),
        ]
        return " ".join(p for p in parts if p)[:2000]  # Truncate for model context

    elif content_type == "misconceptions":
        parts = [
            record.get("misconception_text", ""),
            record.get("correction", ""),
        ]
        return " ".join(p for p in parts if p)[:2000]

    else:  # questions, diagnostics, papers, drill_banks
        parts = [
            record.get("question_text", ""),
            record.get("answer", ""),
        ]
        return " ".join(p for p in parts if p)[:2000]


def create_collection(client: QdrantClient, name: str, dim: int = EMBEDDING_DIM):
    """Create a Qdrant collection with metadata indexes."""
    # Delete if exists (only for initial setup — re-running will recreate)
    if client.collection_exists(name):
        print(f"  Collection {name} already exists — skipping creation")
        return

    client.create_collection(
        collection_name=name,
        vectors_config=VectorParams(size=dim, distance=Distance.COSINE),
        optimizers_config=OptimizersConfigDiff(
            indexing_threshold=0,  # Index immediately for small datasets
        ),
    )

    # Create payload indexes for filtering
    indexes = {
        "subject": PayloadSchemaType.KEYWORD,
        "class_level": PayloadSchemaType.INTEGER,
        "source_format": PayloadSchemaType.KEYWORD,
        "content_type": PayloadSchemaType.KEYWORD,
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

    print(f"  Created collection {name} (dim={dim})")


def load_records_to_qdrant(client: QdrantClient, model, collection_name: str,
                            records: list, content_type: str):
    """Load records into a Qdrant collection with embeddings."""
    if not records:
        print(f"  No records to load for {collection_name}")
        return 0

    total = len(records)
    loaded = 0

    for i in range(0, total, BATCH_SIZE):
        batch = records[i:i + BATCH_SIZE]

        # Generate embeddings
        texts = [get_embedding_text(r, content_type) for r in batch]
        # Filter out empty texts
        valid = [(j, t) for j, t in enumerate(texts) if t.strip()]
        if not valid:
            continue

        valid_indices = [j for j, _ in valid]
        valid_texts = [t for _, t in valid]
        embeddings = model.encode(valid_texts, show_progress_bar=False)

        # Create points
        points = []
        for k, idx in enumerate(valid_indices):
            r = batch[idx]
            record_id = r.get("record_id", f"rec_{i + idx}")

            # Convert record_id to integer hash for Qdrant (requires uint64)
            point_id = abs(hash(record_id)) % (2**63)

            payload = {
                "record_id": record_id,
                "content_type": content_type,
                "source_file": r.get("source_file"),
                "source_format": r.get("source_format"),
                "subject": r.get("subject"),
                "class_level": r.get("class_level"),
                "target_nodes": r.get("target_nodes", []),
            }

            # Add content-type-specific fields
            if content_type == "enrichment":
                payload["node_id"] = r.get("node_id")
                payload["title"] = r.get("title")
                payload["definition"] = (r.get("definition") or "")[:500]
            elif content_type == "misconceptions":
                payload["misconception_text"] = (r.get("misconception_text") or "")[:500]
                payload["correction"] = (r.get("correction") or "")[:500]
            else:
                payload["question_text"] = (r.get("question_text") or "")[:500]
                payload["answer"] = (r.get("answer") or "")[:500]

            points.append(PointStruct(
                id=point_id,
                vector=embeddings[k].tolist(),
                payload=payload,
            ))

        # Upsert points
        try:
            client.upsert(collection_name=collection_name, points=points)
            loaded += len(points)
        except Exception as e:
            print(f"    Error at batch {i}: {e}")

        if loaded % 1000 == 0 or loaded == total:
            print(f"    Progress: {loaded}/{total}")

    return loaded


def main():
    print("Qdrant Loader — Indexing Parsed Content")
    print("=" * 70)

    # Initialize Qdrant client
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

    # Create collections
    print("\nCreating collections...")
    collection_map = {
        "cisce_nodes": "enrichment",
        "cisce_questions": "questions",
        "cisce_misconceptions": "misconceptions",
    }

    for coll_name in collection_map:
        create_collection(client, coll_name)

    # Load enrichment nodes
    print("\nLoading enrichment nodes into cisce_nodes...")
    enrichment = load_jsonl(OUTPUT_DIR / "enrichment.jsonl")
    loaded = load_records_to_qdrant(client, model, "cisce_nodes", enrichment, "enrichment")
    print(f"  Loaded {loaded} enrichment nodes")

    # Load misconceptions
    print("\nLoading misconceptions into cisce_misconceptions...")
    misc = load_jsonl(OUTPUT_DIR / "misconceptions.jsonl")
    loaded = load_records_to_qdrant(client, model, "cisce_misconceptions", misc, "misconceptions")
    print(f"  Loaded {loaded} misconceptions")

    # Load questions (question_bank + diagnostics + papers + drill_banks)
    print("\nLoading questions into cisce_questions...")
    all_questions = []
    for ct in ["question_bank", "diagnostics", "papers", "drill_banks"]:
        records = load_jsonl(OUTPUT_DIR / f"{ct}.jsonl")
        all_questions.extend(records)
        print(f"  {ct}: {len(records)} records")

    loaded = load_records_to_qdrant(client, model, "cisce_questions", all_questions, "questions")
    print(f"  Loaded {loaded} questions total")

    # Print final stats
    print("\n" + "=" * 70)
    print("QDRANT LOAD SUMMARY")
    print("=" * 70)
    for coll_name in collection_map:
        info = client.get_collection(coll_name)
        count = info.points_count
        print(f"  {coll_name:25s}: {count:>6} points")

    print("\nDone.")


if __name__ == "__main__":
    main()
