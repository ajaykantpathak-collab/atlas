"""concept_matcher.py -- MiniLM-based concept identification.

Matches a free-text question to the closest concept in the
catalog using sentence embeddings. Returns the best matching
concept with confidence.

Uses all-MiniLM-L6-v2 (22M params, already on disk) for speed.
Embeds concept descriptions, question patterns, and worked
example patterns. Finds the best match via cosine similarity.
"""
from __future__ import annotations

import json
import os
import re
from typing import Any, Dict, List, Optional, Tuple

import numpy as np

_MODEL = None
_CATALOG = None
_CONCEPT_EMBEDDINGS = None
_CONCEPT_TEXTS = None
_EXAMPLE_EMBEDDINGS = None
_EXAMPLE_META = None


def _get_model():
    global _MODEL
    if _MODEL is None:
        from sentence_transformers import SentenceTransformer
        model_path = (
            r"D:\.cache\huggingface\hub"
            r"\models--sentence-transformers--all-MiniLM-L6-v2"
        )
        snapshot = None
        for d in os.listdir(model_path):
            full = os.path.join(model_path, d)
            if os.path.isdir(full) and d.startswith("snapshots"):
                for sub in os.listdir(full):
                    snapshot = os.path.join(full, sub)
                    break
        _MODEL = SentenceTransformer(snapshot or model_path)
    return _MODEL


def _load_catalog(catalog_path: str) -> Dict:
    global _CATALOG
    if _CATALOG is None:
        with open(catalog_path, "r", encoding="utf-8") as f:
            _CATALOG = json.load(f)
    return _CATALOG


def _build_index(catalog_path: str):
    """Build embedding index from catalog concepts and examples."""
    global _CONCEPT_EMBEDDINGS, _CONCEPT_TEXTS
    global _EXAMPLE_EMBEDDINGS, _EXAMPLE_META

    if _CONCEPT_EMBEDDINGS is not None:
        return

    catalog = _load_catalog(catalog_path)
    model = _get_model()

    # Build concept texts: combine title + definition + key_idea + patterns
    concept_texts = []
    for c in catalog["concepts"]:
        parts = [c["title"], c["definition"], c["key_idea"]]
        parts.extend(c.get("question_patterns", []))
        raw = " ".join(parts)
        concept_texts.append(_normalize_question(raw))

    _CONCEPT_TEXTS = concept_texts
    _CONCEPT_EMBEDDINGS = model.encode(
        concept_texts, normalize_embeddings=True)

    # Build example texts from worked examples
    example_texts = []
    example_meta = []
    for ex in catalog.get("worked_examples", []):
        text = ex.get("question_pattern", "")
        example_texts.append(text)
        example_meta.append({
            "example_id": ex["id"],
            "concept": ex["concept"],
            "question_type": ex["question_type"],
        })

    if example_texts:
        normed = [_normalize_question(t) for t in example_texts]
        _EXAMPLE_EMBEDDINGS = model.encode(
            normed, normalize_embeddings=True)
        _EXAMPLE_META = example_meta


def _normalize_question(text: str) -> str:
    """Normalize question text for better matching.

    Replace numbers with #, normalize math operators to words,
    remove special characters. This focuses the embedding on
    the STRUCTURE of the question, not the specific numbers.
    """
    t = text.lower().strip()
    # Replace numbers (including negatives and decimals) with #
    t = re.sub(r'-?\d+\.?\d*', '#', t)
    # Replace math symbols with words
    t = t.replace('+', ' plus ')
    t = t.replace('-', ' minus ')  # careful: this also replaces hyphens
    t = t.replace('x', ' times ')  # multiplication
    t = t.replace('*', ' times ')
    t = t.replace('/', ' divided by ')
    t = t.replace('=', ' equals ')
    t = t.replace('(', ' ')
    t = t.replace(')', ' ')
    t = t.replace('[', ' ')
    t = t.replace(']', ' ')
    t = t.replace('{', ' ')
    t = t.replace('}', ' ')
    t = t.replace('....', ' blank ')
    t = t.replace('...', ' blank ')
    t = t.replace('.', ' ')
    t = t.replace(',', ' ')
    t = t.replace(':', ' ')
    t = t.replace('c', ' degrees ')  # temperature
    # Collapse whitespace
    t = re.sub(r'\s+', ' ', t).strip()
    return t


def _keyword_boost(
    question: str,
    catalog: Dict,
    concept_map: Dict[str, int],
) -> Optional[int]:
    """Keyword-based concept override.

    If the question contains strong keyword signals for a specific
    concept, return that concept's index directly. This handles cases
    where MiniLM semantic similarity is too close between related
    concepts in the same chapter.

    Returns the concept index to force, or None to use MiniLM scores.
    """
    q_lower = question.lower().strip()

    # Build a lookup of concept IDs present in this catalog
    available = set(catalog["concepts"][i]["id"] for i in range(len(catalog["concepts"])))

    # --- Chapter 11: Exponents and Powers ---
    # "to the power N" where N != 0 -> Exponents (c7m11.2.1)
    # "power 0" / "to the 0" -> Zero Exponent (c7m11.3.6)
    # "squared times" / "cubed times" / "power times power" -> Multiplying Powers (c7m11.3.1)
    if "c7m11.2.1" in available or "c7m11.3.1" in available or "c7m11.3.6" in available:
        # Zero exponent: explicit "power 0", "to the 0", "zero exponent"
        if "power 0" in q_lower or "to the 0" in q_lower or "zero exponent" in q_lower or "raised to 0" in q_lower or "to the power of 0" in q_lower:
            if "c7m11.3.6" in available:
                return concept_map["c7m11.3.6"]

        # Multiplying powers same base: "squared times", "cubed times", "power times power", "times" + power words
        if ("squared times" in q_lower or "cubed times" in q_lower
                or ("times" in q_lower and ("squared" in q_lower or "cubed" in q_lower or "power" in q_lower))):
            if "c7m11.3.1" in available:
                return concept_map["c7m11.3.1"]

        # General exponents: "to the power N" (N != 0), "raised to the power N"
        # Only trigger if there's a non-zero power mentioned
        import re as _re
        power_match = _re.search(r'(?:to the power|raised to the power|to the)\s+(\d+)', q_lower)
        if power_match:
            exp_val = int(power_match.group(1))
            if exp_val != 0 and "c7m11.2.1" in available:
                return concept_map["c7m11.2.1"]

        # "what is N cubed" / "what is N squared" (not times) -> Exponents
        if ("cubed" in q_lower or "squared" in q_lower) and "times" not in q_lower:
            if "c7m11.2.1" in available:
                return concept_map["c7m11.2.1"]

    # --- Chapter 2: Fractions and Decimals ---
    # "reciprocal" keyword -> Reciprocal of a Fraction (c7m2.2.1)
    if "c7m2.2.1" in available:
        if "reciprocal" in q_lower:
            return concept_map["c7m2.2.1"]

    # Rate x quantity word problem -> Multiplication of Fraction by Whole Number (c7m2.1.1)
    # Structural: "X per unit" x "N units" = total. Works for cars, trains, planes, anything.
    # Trigger: question has "per" + "how much" + a quantity word (distance, total, cost, etc.)
    if "c7m2.1.1" in available:
        has_per = " per " in q_lower or " using " in q_lower or " for each " in q_lower
        has_how_much = "how much" in q_lower or "find the total" in q_lower or "what is the total" in q_lower
        has_quantity = any(w in q_lower for w in ["distance", "total", "cost", "amount", "price", "weight", "length"])
        has_of_phrase = " of " in q_lower and ("litre" in q_lower or "hour" in q_lower or "day" in q_lower or "unit" in q_lower or "metre" in q_lower or "meter" in q_lower)
        if (has_per or has_of_phrase) and has_how_much and has_quantity:
            return concept_map["c7m2.1.1"]

    # --- Chapter 3: Data Handling ---
    # "probability" / "chance" / "die rolled" / "coin tossed" -> Probability (c7m3.6.1)
    if "c7m3.6.1" in available:
        prob_keywords = ["probability", "chance of", "die is rolled", "coin is tossed",
                          "dice is rolled", "rolled once", "tossed once", "likely",
                          "favorable outcome", "equally likely"]
        if any(kw in q_lower for kw in prob_keywords):
            return concept_map["c7m3.6.1"]

    # --- Chapter 4: Simple Equations ---
    # Word problem setup: "sum of two numbers is X, one exceeds other by Y" -> Applications (c7m4.6.1)
    # Structural: question describes a relationship between unknowns, not a ready equation.
    if "c7m4.6.1" in available:
        has_sum = "sum of" in q_lower or "sum is" in q_lower
        has_exceeds = "exceeds" in q_lower or "exceeded by" in q_lower or "more than" in q_lower
        has_two_unknowns = "two numbers" in q_lower or "two digits" in q_lower or "both numbers" in q_lower
        has_setup_language = "set up" in q_lower or "find both" in q_lower or "find the numbers" in q_lower
        if (has_sum and has_exceeds) or (has_two_unknowns and has_setup_language):
            return concept_map["c7m4.6.1"]

    # --- Chapter 5: Lines and Angles ---
    # "two lines intersect" + "find all other angles" -> Vertically Opposite Angles (c7m5.2.4)
    # This is correct behavior -- intersecting lines produce vertically opposite angles.
    # No override needed; the matcher already gets this right. Test expectation was wrong.

    # --- Chapter 6: Triangle and its Properties ---
    # "can a triangle have sides" -> Sum of Two Sides / Triangle Inequality (c7m6.7.1)
    if "c7m6.7.1" in available:
        if "can a triangle have" in q_lower or "is it possible to have a triangle" in q_lower:
            return concept_map["c7m6.7.1"]
        if "sum of two sides" in q_lower or "triangle inequality" in q_lower:
            return concept_map["c7m6.7.1"]
        # "sides X, Y, Z" + "possible" or "can" -> inequality check
        import re as _re6
        if _re6.search(r'sides?\s+\d', q_lower) and ("can" in q_lower or "possible" in q_lower or "valid" in q_lower):
            return concept_map["c7m6.7.1"]

    # --- Chapter 10: Algebraic Expressions ---
    # "classify" + "monomial/binomial/trinomial/polynomial" -> Classification concept (c7m10.5.1)
    if "c7m10.5.1" in available:
        classify_keywords = ["classify", "monomial", "binomial", "trinomial", "polynomial",
                             "how many terms", "is it a monomial", "is it a binomial",
                             "is it a trinomial", "is it a polynomial"]
        if any(kw in q_lower for kw in classify_keywords):
            return concept_map["c7m10.5.1"]

    return None


def match_concept(
    question: str,
    catalog_path: str = None,
    threshold: float = 0.3,
) -> Tuple[Optional[Dict], float, Optional[Dict]]:
    """Match a question to the best concept in the catalog.

    Two-stage matching:
      1. spaCy extracts structural features (operations, signs, type)
         to narrow the concept pool
      2. MiniLM does semantic matching within the narrowed pool
      3. Keyword override for cases where MiniLM is too close

    Returns (concept, confidence, example_match).
    concept is None if no match above threshold.
    example_match is the best worked example match if any.
    """
    if catalog_path is None:
        catalog_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "catalog_class7_maths_ch1_integers.json",
        )

    _build_index(catalog_path)
    catalog = _load_catalog(catalog_path)
    model = _get_model()

    # Stage 1: spaCy feature extraction
    from backend.its.competency.spacy_features import (
        extract_features, filter_concepts_by_features,
    )
    features = extract_features(question)
    all_concept_ids = [c["id"] for c in catalog["concepts"]]
    candidate_ids = filter_concepts_by_features(features, all_concept_ids)

    # Stage 2: MiniLM semantic matching within narrowed pool
    norm_q = _normalize_question(question)
    q_emb = model.encode([norm_q], normalize_embeddings=True)[0]

    # Map concept IDs to indices
    concept_map = {c["id"]: i for i, c in enumerate(catalog["concepts"])}

    # Stage 3: Keyword override -- check before MiniLM
    keyword_idx = _keyword_boost(question, catalog, concept_map)

    if keyword_idx is not None:
        best_concept_idx = keyword_idx
        # Use the MiniLM score for this concept as the confidence
        best_concept_score = float((_CONCEPT_EMBEDDINGS[best_concept_idx] @ q_emb))
        # Boost the score above threshold so it's returned
        if best_concept_score < threshold:
            best_concept_score = threshold + 0.01
    elif candidate_ids and len(candidate_ids) < len(all_concept_ids):
        # Use narrowed pool
        candidate_indices = [concept_map[cid] for cid in candidate_ids
                            if cid in concept_map]
        if candidate_indices:
            candidate_scores = _CONCEPT_EMBEDDINGS[candidate_indices] @ q_emb
            best_local = int(np.argmax(candidate_scores))
            best_concept_idx = candidate_indices[best_local]
            best_concept_score = float(candidate_scores[best_local])
        else:
            best_concept_idx = int(np.argmax(_CONCEPT_EMBEDDINGS @ q_emb))
            best_concept_score = float((_CONCEPT_EMBEDDINGS @ q_emb)[best_concept_idx])
    else:
        # No narrowing -- use all concepts
        concept_scores = _CONCEPT_EMBEDDINGS @ q_emb
        best_concept_idx = int(np.argmax(concept_scores))
        best_concept_score = float(concept_scores[best_concept_idx])

    # Match against worked examples
    best_example = None
    best_example_score = 0.0
    if _EXAMPLE_EMBEDDINGS is not None and len(_EXAMPLE_EMBEDDINGS) > 0:
        example_scores = _EXAMPLE_EMBEDDINGS @ q_emb
        best_ex_idx = int(np.argmax(example_scores))
        best_example_score = float(example_scores[best_ex_idx])
        if best_example_score > threshold:
            best_example = _EXAMPLE_META[best_ex_idx]

    # Return the concept if score is high enough
    concept = None
    if best_concept_score > threshold:
        concept = catalog["concepts"][best_concept_idx]

    return concept, best_concept_score, best_example


def match_top_n(
    question: str,
    catalog_path: str = None,
    n: int = 3,
) -> List[Tuple[Dict, float]]:
    """Return top N matching concepts with scores."""
    if catalog_path is None:
        catalog_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "catalog_class7_maths_ch1_integers.json",
        )

    _build_index(catalog_path)
    catalog = _load_catalog(catalog_path)
    model = _get_model()

    norm_q = _normalize_question(question)
    q_emb = model.encode([norm_q], normalize_embeddings=True)[0]
    scores = _CONCEPT_EMBEDDINGS @ q_emb

    top_indices = np.argsort(scores)[-n:][::-1]
    results = []
    for idx in top_indices:
        results.append((catalog["concepts"][idx], float(scores[idx])))
    return results
