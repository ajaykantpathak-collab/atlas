"""Keyword fallback router — searches CBSE/CISCE node JSON files directly.

Used when Qdrant is unavailable or returns no results. Provides a
keyword-based search over the CBSE node files in cbse_data/nodes/by_subject
and CISCE enrichment marker files.

This is NOT a replacement for Qdrant hybrid search — it's a safety net
that ensures routing still works when Qdrant is down or not indexed.

Usage:
    from backend.services.keyword_fallback_router import KeywordFallbackRouter

    result = await KeywordFallbackRouter.route(
        message="What is photosynthesis?",
        subject="bio",
        class_level=10,
        board="CBSE",
    )
"""

import os
import re
import json
import logging
from typing import Optional
from dataclasses import dataclass, field
from collections import defaultdict

logger = logging.getLogger(__name__)

# Path to CBSE node files
CBSE_NODES_DIR = os.path.join("D:", os.sep, "platform", "cbse_data", "nodes", "by_subject")

# Path to CISCE enrichment
CISCE_ENRICHMENT_DIR = os.path.join("D:", os.sep, "cisce")


@dataclass
class FallbackResult:
    """Result of keyword-based fallback routing."""
    node_id: str
    node_title: str
    confidence: float
    method: str
    board: str
    subject: str
    class_level: int
    candidates: list = field(default_factory=list)


class KeywordFallbackRouter:
    """Keyword-based fallback router for when Qdrant is unavailable.

    Searches CBSE node JSON files and CISCE enrichment marker files
    using keyword matching on titles, topics, and concept tags.
    """

    _cbse_cache: Optional[list] = None
    _cisce_cache: Optional[list] = None

    @classmethod
    def _load_cbse_nodes(cls) -> list:
        """Load all CBSE nodes from JSON files into memory."""
        if cls._cbse_cache is not None:
            return cls._cbse_cache

        nodes = []
        if not os.path.isdir(CBSE_NODES_DIR):
            logger.warning(f"CBSE nodes dir not found: {CBSE_NODES_DIR}")
            cls._cbse_cache = nodes
            return nodes

        for fname in os.listdir(CBSE_NODES_DIR):
            if not fname.endswith(".json"):
                continue
            fpath = os.path.join(CBSE_NODES_DIR, fname)
            try:
                with open(fpath, encoding="utf-8") as f:
                    data = json.load(f)
                if isinstance(data, list):
                    nodes.extend(data)
            except Exception as e:
                logger.debug(f"Error reading {fpath}: {e}")

        cls._cbse_cache = nodes
        logger.info(f"KeywordFallbackRouter: loaded {len(nodes)} CBSE nodes")
        return nodes

    @classmethod
    def _load_cisce_nodes(cls) -> list:
        """Load CISCE node metadata from enrichment marker files."""
        if cls._cisce_cache is not None:
            return cls._cisce_cache

        nodes = []
        if not os.path.isdir(CISCE_ENRICHMENT_DIR):
            logger.warning(f"CISCE dir not found: {CISCE_ENRICHMENT_DIR}")
            cls._cisce_cache = nodes
            return nodes

        # Scan all subject directories for enrichment .marker files
        for subj_dir in os.listdir(CISCE_ENRICHMENT_DIR):
            enrich_path = os.path.join(CISCE_ENRICHMENT_DIR, subj_dir, "enrichment")
            if not os.path.isdir(enrich_path):
                continue
            for fname in os.listdir(enrich_path):
                if not fname.endswith(".marker"):
                    continue
                fpath = os.path.join(enrich_path, fname)
                try:
                    with open(fpath, encoding="utf-8-sig") as f:
                        content = f.read()
                    # Parse --- NODE <id> --- sections
                    for match in re.finditer(r"^--- NODE (\S+) ---\r?$", content, re.MULTILINE):
                        node_id = match.group(1)
                        # Extract TITLE from the section
                        section_start = match.end()
                        # Find next NODE or end of file
                        next_match = re.search(r"^--- NODE \S+ ---\r?$", content[section_start:], re.MULTILINE)
                        section_end = section_start + next_match.start() if next_match else len(content)
                        section = content[section_start:section_end]

                        title_match = re.search(r"^TITLE:\s*(.+?)$", section, re.MULTILINE)
                        title = title_match.group(1).strip() if title_match else node_id

                        # Extract class from node_id (e.g., c10_bio_001 -> 10)
                        cls_match = re.match(r"c(\d+)_", node_id)
                        class_level = int(cls_match.group(1)) if cls_match else 0

                        nodes.append({
                            "node_id": node_id,
                            "title": title,
                            "topic": title,
                            "subject": subj_dir,
                            "class_level": class_level,
                            "board": "CISCE",
                            "concept_tags": [],
                            "content_snippet": section[:500],
                        })
                except Exception as e:
                    logger.debug(f"Error reading {fpath}: {e}")

        cls._cisce_cache = nodes
        logger.info(f"KeywordFallbackRouter: loaded {len(nodes)} CISCE nodes")
        return nodes

    @staticmethod
    def _tokenize(text: str) -> set:
        """Simple tokenizer for keyword matching."""
        return set(re.findall(r"\b[a-z0-9]{2,}\b", text.lower()))

    @staticmethod
    def _score_match(query_tokens: set, node: dict) -> float:
        """Score a node against query tokens.

        Returns a confidence score between 0 and 1.
        """
        # Build node text from title, topic, concept_tags
        node_text = " ".join(filter(None, [
            node.get("title", ""),
            node.get("topic", ""),
            " ".join(node.get("concept_tags", [])),
            node.get("content_snippet", "")[:200],
        ]))
        node_tokens = KeywordFallbackRouter._tokenize(node_text)

        if not node_tokens or not query_tokens:
            return 0.0

        # Jaccard-like score: overlap / query length
        overlap = query_tokens & node_tokens
        if not overlap:
            return 0.0

        # Weighted: title matches count more
        title_tokens = KeywordFallbackRouter._tokenize(node.get("title", "") + " " + node.get("topic", ""))
        title_overlap = query_tokens & title_tokens

        score = (len(overlap) / len(query_tokens)) * 0.6
        if title_overlap:
            score += (len(title_overlap) / len(query_tokens)) * 0.4

        return min(score, 1.0)

    @classmethod
    def route(
        cls,
        message: str,
        subject: Optional[str] = None,
        class_level: Optional[int] = None,
        board: Optional[str] = None,
        top_k: int = 5,
    ) -> Optional[FallbackResult]:
        """Route a student question using keyword matching.

        Args:
            message: The student's question.
            subject: Optional subject filter.
            class_level: Optional class level filter.
            board: Optional board filter ("CBSE" or "CISCE").
            top_k: Number of candidates to return.

        Returns:
            FallbackResult if a good match is found, None otherwise.
        """
        query_tokens = cls._tokenize(message)
        if not query_tokens:
            return None

        # Determine which node sets to search
        search_sets = []
        if board is None or board.upper() == "CBSE":
            search_sets.append(("CBSE", cls._load_cbse_nodes()))
        if board is None or board.upper() in ("CISCE", "ICSE", "ISC"):
            search_sets.append(("CISCE", cls._load_cisce_nodes()))

        # If no board specified, search CBSE first then CISCE
        if board is None:
            search_sets = [("CBSE", cls._load_cbse_nodes()), ("CISCE", cls._load_cisce_nodes())]

        scored = []
        for node_board, nodes in search_sets:
            for node in nodes:
                # Apply filters
                if class_level is not None:
                    node_cls = node.get("class_level", 0)
                    if isinstance(node_cls, str):
                        try:
                            node_cls = int(node_cls)
                        except ValueError:
                            continue
                    if node_cls != class_level:
                        continue

                if subject is not None:
                    node_subj = str(node.get("subject", "")).lower()
                    # Normalize subject comparison
                    if subject.lower() not in node_subj and node_subj not in subject.lower():
                        # Check common aliases
                        aliases = {
                            "bio": ["biology", "bio"],
                            "biology": ["biology", "bio"],
                            "phy": ["physics", "phy"],
                            "physics": ["physics", "phy"],
                            "chem": ["chemistry", "chem"],
                            "chemistry": ["chemistry", "chem"],
                            "math": ["maths", "math", "mathematics"],
                            "maths": ["maths", "math", "mathematics"],
                            "acc": ["accounts", "acc", "accountancy"],
                            "accounts": ["accounts", "acc", "accountancy"],
                        }
                        subj_aliases = aliases.get(subject.lower(), [subject.lower()])
                        if not any(a in node_subj for a in subj_aliases):
                            continue

                score = cls._score_match(query_tokens, node)
                if score > 0:
                    scored.append((score, node_board, node))

        if not scored:
            return None

        # Sort by score descending
        scored.sort(key=lambda x: -x[0])

        best_score, best_board, best_node = scored[0]

        # Confidence threshold for keyword matching (lower than Qdrant)
        if best_score < 0.15:
            return None

        return FallbackResult(
            node_id=best_node.get("node_id", ""),
            node_title=best_node.get("title", best_node.get("topic", "")),
            confidence=best_score,
            method="keyword_fallback",
            board=best_board,
            subject=best_node.get("subject", ""),
            class_level=best_node.get("class_level", 0),
            candidates=[s[2].get("node_id", "") for s in scored[:top_k]],
        )
