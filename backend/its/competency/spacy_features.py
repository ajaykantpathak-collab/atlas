"""spacy_features.py -- extract structural features from a question.

Uses spaCy to extract:
  - operation type (add, subtract, multiply, divide, verify, fill_blank)
  - sign patterns (pos x neg, neg x neg, etc.)
  - question type (computation, verify_property, word_problem, fill_blank)
  - intent verb (find, evaluate, verify, write)

These features narrow the concept pool BEFORE MiniLM matching.
"""
from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Set

# E1 (BATCH_BRIEF §4): spaCy pulls thinc->torch (~48s cold) — it must
# load on FIRST USE, never at module import.  This module rides the
# competency engine into every boot (solution_executor imports
# extract_features top-level), so the top-level `import spacy` was a
# hidden torch-at-boot door.  _get_nlp() now imports lazily.
spacy = None  # populated lazily by _get_nlp()

_NLP = None


def _get_nlp():
    global _NLP, spacy
    if _NLP is None:
        import spacy as _spacy
        spacy = _spacy
        _NLP = spacy.load("en_core_web_sm")
    return _NLP


def extract_features(question: str) -> Dict[str, Any]:
    """Extract structural features from a question.

    Returns a dict with:
      - operations: set of detected operations
      - sign_pattern: sign pattern for multiplication/division
      - question_type: computation, verify_property, word_problem, fill_blank
      - intent_verb: find, evaluate, verify, write, fill
      - has_equals: bool
      - has_not_equal: bool
      - numbers: list of (value, sign) tuples
    """
    nlp = _get_nlp()
    doc = nlp(question)
    q_lower = question.lower()

    features = {
        "operations": set(),
        "sign_pattern": None,
        "question_type": None,
        "intent_verb": None,
        "has_equals": False,
        "has_not_equal": False,
        "numbers": [],
    }

    # 1. Detect operations from symbols and words
    if "/" in question or "divided" in q_lower or "divide" in q_lower or "quotient" in q_lower:
        features["operations"].add("divide")
    if " x " in question or " * " in question or "times" in q_lower or "product" in q_lower or "multiply" in q_lower:
        features["operations"].add("multiply")
    if " + " in q_lower or "plus" in q_lower or "sum" in q_lower or "add" in q_lower:
        features["operations"].add("add")
    if " - " in q_lower or "minus" in q_lower or "difference" in q_lower or "subtract" in q_lower:
        features["operations"].add("subtract")

    # 2. Detect equals and not-equal
    if "=" in question:
        features["has_equals"] = True
    if "!=" in question or "not equal" in q_lower:
        features["has_not_equal"] = True

    # 3. Detect question type
    if "fill in the blank" in q_lower or "...." in question or "fill in" in q_lower:
        features["question_type"] = "fill_blank"
    elif "verify" in q_lower or "is commutative" in q_lower or "is associative" in q_lower or "is closed" in q_lower or "closed under" in q_lower or "property" in q_lower:
        features["question_type"] = "verify_property"
    elif any(w in q_lower for w in ["temperature", "elevator", "shopkeeper", "class test",
                                     "marks for correct", "how many", "how long",
                                     "descends", "profit", "loss", "pens", "pencils"]):
        features["question_type"] = "word_problem"
    elif "write" in q_lower and "pair" in q_lower:
        features["question_type"] = "write_pair"
    elif "evaluate" in q_lower or "find" in q_lower or "compute" in q_lower:
        features["question_type"] = "computation"
    else:
        features["question_type"] = "unknown"

    # 4. Detect intent verb
    for verb in ["evaluate", "verify", "find", "write", "fill", "compute", "check"]:
        if verb in q_lower:
            features["intent_verb"] = verb
            break

    # 5. Extract numbers with signs
    # Look for patterns like (-5), -5, 5, (-30)
    num_pattern = r'\(?(-?\d+\.?\d*)\)?'
    for match in re.finditer(r'\(-?\d+\.?\d*\)|-?\d+\.?\d*', question):
        text = match.group()
        val = None
        try:
            val = float(text.strip("()"))
        except ValueError:
            continue
        sign = "neg" if val < 0 else "pos"
        features["numbers"].append((val, sign))

    # 6. Detect sign pattern for multiplication/division
    # Look for patterns like (-a) x (-b) or a x (-b) or (-a) / (-b)
    # Use the actual numbers found
    if "multiply" in features["operations"] or "divide" in features["operations"]:
        signs = [s for _, s in features["numbers"]]
        if len(signs) >= 2:
            if signs[0] == "neg" and signs[1] == "neg":
                features["sign_pattern"] = "neg_neg"
            elif (signs[0] == "pos" and signs[1] == "neg") or (signs[0] == "neg" and signs[1] == "pos"):
                features["sign_pattern"] = "pos_neg"
            else:
                features["sign_pattern"] = "pos_pos"

    # 7. Detect structural patterns (commutative, distributive, identity)
    # Commutative addition: a + b = b + (blank)
    # Pattern: has equals, has add, and the right side has add with a blank
    if features["has_equals"] and "add" in features["operations"] and "fill_blank" == features["question_type"]:
        # Check if pattern is a + b = b + (blank) -- commutative
        # vs a + 0 = a -- identity
        # Look for: number, plus, number, equals, number, plus, blank
        # The commutative pattern has TWO numbers on left and a number + blank on right
        if len(features["numbers"]) >= 3:
            # If there are 3+ numbers and a blank, likely commutative (a+b=b+?)
            features["structural_pattern"] = "commutative_add"
        elif len(features["numbers"]) == 1:
            # Only one number visible, blank on other side -- likely identity (a + 0 = a or a + ? = 0)
            features["structural_pattern"] = "additive_identity"

    # Distributive: a x (b + c) = a x b + a x c
    # Pattern: has multiply AND add, has equals, verify type
    if (features["has_equals"] and "multiply" in features["operations"]
            and "add" in features["operations"]
            and features["question_type"] == "verify_property"):
        # Check for the distributive pattern: a x (b + c) = a x b + a x c
        # Has brackets/parentheses with addition inside, multiplied outside
        if ("[" in question or "(" in question) and "=" in question:
            features["structural_pattern"] = "distributive"

    return features


def filter_concepts_by_features(
    features: Dict[str, Any],
    concept_ids: List[str],
) -> List[str]:
    """Filter concept IDs based on extracted features.

    Returns a narrowed list of concept IDs that match the features.
    If no filter applies, returns the original list unchanged.
    """
    filtered = set(concept_ids)
    ops = features["operations"]
    qtype = features["question_type"]

    # If we detected operations, keep only concepts matching those operations
    if ops:
        op_concepts = set()
        if "add" in ops:
            op_concepts.update({"c7m1.1.1", "c7m1.1.2", "c7m1.1.3",
                                 "c7m1.1.4", "c7m1.1.5"})
        if "subtract" in ops:
            op_concepts.update({"c7m1.1.2"})
        if "multiply" in ops:
            op_concepts.update({"c7m1.2.1", "c7m1.2.2", "c7m1.3.1",
                                 "c7m1.3.2", "c7m1.3.3", "c7m1.3.4",
                                 "c7m1.3.5", "c7m1.3.6"})
        if "divide" in ops:
            op_concepts.update({"c7m1.4", "c7m1.5"})

        # Only filter if we found matching concepts
        intersection = filtered & op_concepts
        if intersection:
            filtered = intersection

    # If verify_property type, prefer property concepts
    if qtype == "verify_property":
        property_concepts = {"c7m1.1.1", "c7m1.1.2", "c7m1.1.3", "c7m1.1.4",
                             "c7m1.1.5", "c7m1.3.1", "c7m1.3.2", "c7m1.3.5",
                             "c7m1.3.6", "c7m1.5"}
        intersection = filtered & property_concepts
        if intersection:
            filtered = intersection

    # If fill_blank type with division, prefer division properties
    if qtype == "fill_blank" and "divide" in ops:
        division_concepts = {"c7m1.5"}
        if "c7m1.5" in filtered:
            filtered = {"c7m1.5"}

    # If fill_blank type with addition, prefer addition properties
    if qtype == "fill_blank" and "add" in ops:
        add_concepts = {"c7m1.1.3", "c7m1.1.5"}
        intersection = filtered & add_concepts
        if intersection:
            filtered = intersection

    # Structural pattern disambiguation
    structural = features.get("structural_pattern")
    if structural == "commutative_add":
        if "c7m1.1.3" in filtered:
            filtered = {"c7m1.1.3"}
    elif structural == "additive_identity":
        if "c7m1.1.5" in filtered:
            filtered = {"c7m1.1.5"}
    elif structural == "distributive":
        if "c7m1.3.6" in filtered:
            filtered = {"c7m1.3.6"}

    # If word_problem, prefer division (most word problems use division)
    if qtype == "word_problem":
        word_concepts = {"c7m1.4"}
        if "c7m1.4" in filtered:
            filtered = word_concepts

    # If write_pair, prefer closure concepts
    if qtype == "write_pair":
        if "sum" in ops or "add" in ops:
            if "c7m1.1.1" in filtered:
                filtered = {"c7m1.1.1"}
        if "subtract" in ops or "difference" in str(features):
            if "c7m1.1.2" in filtered:
                filtered = {"c7m1.1.2"}

    # Sign pattern disambiguation for multiplication
    if "multiply" in ops and features["sign_pattern"]:
        if features["sign_pattern"] == "neg_neg":
            if "c7m1.2.2" in filtered:
                filtered = {"c7m1.2.2"}
        elif features["sign_pattern"] == "pos_neg":
            if "c7m1.2.1" in filtered:
                filtered = {"c7m1.2.1"}

    # If computation with division (evaluate), prefer division over properties
    if qtype == "computation" and "divide" in ops:
        if "c7m1.4" in filtered:
            filtered = {"c7m1.4"}

    return list(filtered) if filtered else concept_ids
