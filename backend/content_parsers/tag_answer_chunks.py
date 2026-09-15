"""Phase 5.1: Tag Qdrant chunks with is_answer_chunk boolean.

Adds `is_answer_chunk: bool` to every point in the v2 collections.

Rules:
  - cisce_nodes_v2 (enrichment):
    - Definitions, walkthroughs, ELI5 → is_answer_chunk: false
    - Model answers, solutions, diagnostic answers → is_answer_chunk: true
    - Determined by checking text content for answer-like patterns
  - cisce_questions_v2 (questions):
    - Questions with model_answer/solution/correct_answer → is_answer_chunk: true
    - Question stems only → is_answer_chunk: false
  - cisce_misconceptions_v2 (misconceptions):
    - All → is_answer_chunk: false (misconceptions are not answers)

Usage:
    python tag_answer_chunks.py
"""

import sys
import re
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from qdrant_client import QdrantClient


# ---------------------------------------------------------------------------
# Answer-chunk detection rules
# ---------------------------------------------------------------------------

# Fields that indicate the chunk contains an answer
ANSWER_FIELDS = {
    "model_answer", "correct_answer", "solution", "answer",
    "answer_text", "model_solution", "marking_scheme",
    "worked_solution", "answer_key", "expected_answer",
}

# Source formats that are answer-like (contain solutions/answers)
ANSWER_FORMATS = {
    "B_q_answer",       # Question answers
    "F_q_correct",      # Correct answers
    "A_cfq",            # Conceptual framework questions (with answers)
}

# Source formats that are question stems only (no answers)
QUESTION_STEM_FORMATS = {
    "C_acc_drill",      # Drill questions
    "C_maths",          # Math questions
    "C_board_style",    # Board-style questions
    "C_diag_line",      # Diagnostic questions
    "G_diag_q",         # Diagnostic questions
    "H_bare",           # Bare questions
    "H_field_based",    # Field-based questions
}

# Text patterns that indicate answer content
ANSWER_PATTERNS = [
    re.compile(r"\banswer\s*[:is]\b", re.IGNORECASE),
    re.compile(r"\bsolution\s*[:is]\b", re.IGNORECASE),
    re.compile(r"\bcorrect\s+(?:answer|option)\b", re.IGNORECASE),
    re.compile(r"\bmodel\s+answer\b", re.IGNORECASE),
    re.compile(r"\bworked\s+(?:out\s+)?solution\b", re.IGNORECASE),
    re.compile(r"\bmarking\s+scheme\b", re.IGNORECASE),
    re.compile(r"\bstep\s*1\s*:", re.IGNORECASE),
    re.compile(r"\btherefore\b", re.IGNORECASE),  # Common in solutions
    re.compile(r"\bhence\b", re.IGNORECASE),
]

# Text patterns that indicate definition/walkthrough (not answer)
DEFINITION_PATTERNS = [
    re.compile(r"\bdefinition\s*:\s*", re.IGNORECASE),
    re.compile(r"\bis\s+defined\s+as\b", re.IGNORECASE),
    re.compile(r"\brefers\s+to\b", re.IGNORECASE),
    re.compile(r"\bmeans\s+that\b", re.IGNORECASE),
    re.compile(r"\bELI5\b", re.IGNORECASE),
    re.compile(r"\bsimple\s+terms\b", re.IGNORECASE),
    re.compile(r"\bin\s+other\s+words\b", re.IGNORECASE),
    re.compile(r"\bwalkthrough\b", re.IGNORECASE),
    re.compile(r"\bexplanation\s*:\s*", re.IGNORECASE),
    re.compile(r"\boverview\s*:\s*", re.IGNORECASE),
]


def classify_chunk(payload: dict) -> bool:
    """Determine if a chunk is an answer chunk.

    Args:
        payload: The Qdrant point payload.

    Returns:
        True if the chunk contains answer/solution content.
    """
    if not payload:
        return False

    content_type = payload.get("content_type", "")
    source_format = payload.get("source_format", "")

    # Misconceptions are never answer chunks
    if content_type == "misconceptions":
        return False

    # Questions: check if they contain answers
    if content_type == "questions":
        # If source format is known to contain answers
        if source_format in ANSWER_FORMATS:
            return True
        # If source format is known to be question stems only
        if source_format in QUESTION_STEM_FORMATS:
            return False
        # Check for answer fields in payload
        for field in ANSWER_FIELDS:
            if field in payload and payload[field]:
                return True
        # Check text content for answer patterns
        text = _get_text(payload)
        if text:
            for pattern in ANSWER_PATTERNS:
                if pattern.search(text):
                    return True
        return False

    # Enrichment nodes: check text content
    if content_type == "enrichment":
        text = _get_text(payload)
        if not text:
            return False

        # Check for answer patterns
        answer_matches = sum(1 for p in ANSWER_PATTERNS if p.search(text))
        # Check for definition patterns
        definition_matches = sum(1 for p in DEFINITION_PATTERNS if p.search(text))

        # If more answer patterns than definition patterns → answer chunk
        if answer_matches > 0 and answer_matches >= definition_matches:
            return True

        # Check specific fields
        for field in ANSWER_FIELDS:
            if field in payload and payload[field]:
                return True

        # Check for diagnostic_answer field
        if payload.get("diagnostic_answer") or payload.get("scope_answer"):
            return True

        return False

    return False


def _get_text(payload: dict) -> str:
    """Extract text content from payload."""
    # Try common text fields
    text_fields = ["text", "content", "question_text", "answer_text",
                   "description", "body", "statement"]
    for field in text_fields:
        val = payload.get(field)
        if val and isinstance(val, str):
            return val
    # Fallback: concatenate all string values
    parts = []
    for v in payload.values():
        if isinstance(v, str) and len(v) > 20:
            parts.append(v)
    return " ".join(parts)


# ---------------------------------------------------------------------------
# Main tagging function
# ---------------------------------------------------------------------------

def tag_collection(client: QdrantClient, collection_name: str, batch_size: int = 256):
    """Tag all points in a collection with is_answer_chunk.

    Args:
        client: Qdrant client.
        collection_name: Name of the collection to tag.
        batch_size: Number of points to process per batch.
    """
    from qdrant_client.models import PointStruct

    print(f"\n{'='*60}")
    print(f"Tagging collection: {collection_name}")

    info = client.get_collection(collection_name)
    total_points = info.points_count
    print(f"  Total points: {total_points}")

    offset = None
    tagged_true = 0
    tagged_false = 0
    total_processed = 0
    batch = []

    while True:
        scroll_result = client.scroll(
            collection_name=collection_name,
            limit=batch_size,
            offset=offset,
            with_payload=True,
            with_vectors=False,
        )
        points, offset = scroll_result
        if not points:
            break

        for point in points:
            is_answer = classify_chunk(point.payload or {})
            if is_answer:
                tagged_true += 1
            else:
                tagged_false += 1

            # Update payload
            new_payload = dict(point.payload or {})
            new_payload["is_answer_chunk"] = is_answer

            batch.append(PointStruct(
                id=point.id,
                vector={},  # Keep existing vectors (empty = no update)
                payload=new_payload,
            ))

            total_processed += 1

            # Update in batches
            if len(batch) >= batch_size:
                client.upsert(
                    collection_name=collection_name,
                    points=batch,
                    wait=False,
                )
                batch = []
                print(f"  Progress: {total_processed}/{total_points} "
                      f"(answer: {tagged_true}, non-answer: {tagged_false})")

        if offset is None:
            break

    # Flush remaining batch
    if batch:
        client.upsert(
            collection_name=collection_name,
            points=batch,
            wait=True,
        )

    print(f"  Done: {total_processed}/{total_points} tagged")
    print(f"  Answer chunks:     {tagged_true} ({tagged_true/max(total_processed,1):.1%})")
    print(f"  Non-answer chunks: {tagged_false} ({tagged_false/max(total_processed,1):.1%})")


def main():
    """Tag all v2 collections with is_answer_chunk."""
    client = QdrantClient(host="localhost", port=6333)

    collections = [
        "cisce_nodes_v2",
        "cisce_questions_v2",
        "cisce_misconceptions_v2",
    ]

    for coll in collections:
        tag_collection(client, coll)

    print(f"\n{'='*60}")
    print("All collections tagged with is_answer_chunk")


if __name__ == "__main__":
    main()
