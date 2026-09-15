"""
q_matrix_generator.py
Auto-generate a Q-matrix from .bloom.marker files for cognitive diagnosis.

The Q-matrix maps each diagnostic question to the specific cognitive skills it tests.
This is the input that CDM (DINA/GDINA) needs to diagnose which skills a student
has vs doesn't have.

Skills are derived from:
  1. Bloom level (recall, reasoning, evaluate, apply, create) — always 1 skill per question
  2. concept_tags from the parent node — each question tests the node's concepts
  3. Question text keywords — refines which concepts each question targets

Output format:
  {
    "node_id": "c10_sci_cbse_015",
    "skills": ["recall", "reasoning", "evaluate", "apply", "create",
               "photosynthesis_light_rxn", "photosynthesis_calvin_cycle"],
    "questions": [
      {"q_num": 1, "bloom": "recall", "skills_required": ["recall", "photosynthesis_light_rxn"]},
      ...
    ],
    "matrix": [[1,0,0,0,0,1,0], [0,1,0,0,0,1,1], ...]  # QxS binary matrix
  }

This module is READ-ONLY — it never modifies source files.
"""

from __future__ import annotations

import logging
import re
from typing import Any

from backend.its.parsing.bloom_marker_parser import parse_bloom_marker, load_all_bloom_markers

logger = logging.getLogger(__name__)

# Bloom levels we recognize
BLOOM_LEVELS = ["recall", "reasoning", "evaluate", "apply", "create"]


def _extract_concept_skills(node_data: dict, max_skills: int = 3) -> list[str]:
    """Extract concept-level skills from node data.

    Uses concept_tags if available, otherwise derives from title keywords.
    Skills are prefixed with the node_id to keep them globally unique.
    """
    node_id = node_data.get("node_id", "unknown")
    skills: list[str] = []

    # Try concept_tags first
    concept_tags = node_data.get("concept_tags", [])
    if isinstance(concept_tags, list):
        for tag in concept_tags[:max_skills]:
            tag_clean = re.sub(r"[^a-zA-Z0-9_]", "_", str(tag).lower().strip())[:30]
            if tag_clean:
                skills.append(f"{node_id}_{tag_clean}")

    # Fallback: derive from title — pick key nouns
    if not skills:
        title = node_data.get("title", "")
        if title:
            # Simple keyword extraction — remove common words, pick first 2-3
            stop_words = {"the", "a", "an", "of", "and", "or", "in", "on", "at", "to",
                         "for", "is", "are", "was", "were", "be", "been", "being",
                         "with", "by", "from", "as", "this", "that", "these", "those"}
            words = re.findall(r"[a-zA-Z]{3,}", title.lower())
            keywords = [w for w in words if w not in stop_words][:max_skills]
            for kw in keywords:
                skills.append(f"{node_id}_{kw}")

    # Ultimate fallback — just use the node_id as a single skill
    if not skills:
        skills.append(f"{node_id}_concept")

    return skills[:max_skills]


def _map_question_to_skills(
    question: dict,
    bloom_skills: list[str],
    concept_skills: list[str],
) -> list[str]:
    """Map a single diagnostic question to the skills it tests.

    Every question tests its Bloom level.
    Questions at higher Bloom levels (evaluate, apply, create) test MORE concept skills
    because they require deeper understanding.
    """
    bloom = question.get("bloom_level", "recall").lower()
    required: list[str] = []

    # Always include the Bloom-level skill
    bloom_skill = f"bloom_{bloom}"
    if bloom_skill not in bloom_skills:
        # Shouldn't happen, but be safe
        bloom_skill = bloom_skills[0] if bloom_skills else "bloom_recall"
    required.append(bloom_skill)

    # Map Bloom level to how many concept skills it tests
    # recall: 1 concept, reasoning: 2, evaluate: 2, apply: 2, create: all 3
    n_concepts = {"recall": 1, "reasoning": 2, "evaluate": 2, "apply": 2, "create": 3}
    n_needed = n_concepts.get(bloom, 1)

    for i, cs in enumerate(concept_skills[:n_needed]):
        required.append(cs)

    return required


def generate_q_matrix_for_node(node_data: dict) -> dict:
    """Generate a Q-matrix for a single parsed .bloom.marker node.

    Args:
        node_data: Parsed .bloom.marker content from bloom_marker_parser.

    Returns:
        Q-matrix dict with skills list, question mappings, and binary matrix.
    """
    node_id = node_data.get("node_id", "unknown")

    # Build the skill list: 5 Bloom skills + concept skills
    bloom_skills = [f"bloom_{bl}" for bl in BLOOM_LEVELS]
    concept_skills = _extract_concept_skills(node_data)
    all_skills = bloom_skills + concept_skills

    # Map each diagnostic question to skills
    questions = node_data.get("diagnostic_questions", [])
    question_mappings: list[dict] = []
    matrix_rows: list[list[int]] = []

    for q in questions:
        q_num = q.get("q_num", 0)
        bloom = q.get("bloom_level", "recall").lower()
        required = _map_question_to_skills(q, bloom_skills, concept_skills)

        # Build binary row: 1 if skill is required, 0 otherwise
        row = [1 if skill in required else 0 for skill in all_skills]
        matrix_rows.append(row)

        question_mappings.append({
            "q_num": q_num,
            "bloom": bloom,
            "skills_required": required,
        })

    return {
        "node_id": node_id,
        "skills": all_skills,
        "bloom_skills": bloom_skills,
        "concept_skills": concept_skills,
        "questions": question_mappings,
        "matrix": matrix_rows,
        "n_questions": len(questions),
        "n_skills": len(all_skills),
    }


def generate_q_matrix_from_file(filepath: str) -> dict | None:
    """Parse a .bloom.marker file and generate its Q-matrix."""
    parsed = parse_bloom_marker(filepath)
    if not parsed:
        return None
    return generate_q_matrix_for_node(parsed)


def generate_q_matrices_for_directory(
    directory: str,
    max_nodes: int | None = None,
) -> dict[str, dict]:
    """Generate Q-matrices for all .bloom.marker files in a directory.

    Args:
        directory: Path to directory containing .bloom.marker files.
        max_nodes: Optional limit on number of nodes to process.

    Returns:
        Dict mapping node_id -> Q-matrix.
    """
    all_markers = load_all_bloom_markers(directory)
    if max_nodes:
        items = list(all_markers.items())[:max_nodes]
        all_markers = dict(items)

    result: dict[str, dict] = {}
    for node_id, node_data in all_markers.items():
        try:
            qm = generate_q_matrix_for_node(node_data)
            result[node_id] = qm
        except Exception as exc:
            logger.warning("Failed to generate Q-matrix for %s: %s", node_id, exc)

    logger.info("Generated Q-matrices for %d nodes from %s", len(result), directory)
    return result


def validate_q_matrix(q_matrix: dict) -> list[str]:
    """Validate a Q-matrix for CDM compatibility.

    Returns a list of issues (empty list = valid).
    """
    issues: list[str] = []
    n_q = q_matrix.get("n_questions", 0)
    n_s = q_matrix.get("n_skills", 0)
    matrix = q_matrix.get("matrix", [])

    if n_q == 0:
        issues.append("No questions in Q-matrix")
    if n_s == 0:
        issues.append("No skills in Q-matrix")
    if len(matrix) != n_q:
        issues.append(f"Matrix has {len(matrix)} rows but n_questions={n_q}")
    for i, row in enumerate(matrix):
        if len(row) != n_s:
            issues.append(f"Row {i} has {len(row)} cols but n_skills={n_s}")
        if sum(row) == 0:
            issues.append(f"Row {i} has no skills required (all zeros)")

    return issues
