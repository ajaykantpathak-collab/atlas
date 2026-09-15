"""
Class 1 Physics Question Generator
====================================
Generates 5 question variants × 4 nodes = 20 unique question configs.
All randomisation is seeded → deterministic, reproducible.

Output format (per question):
  {
    "id":          "c1_phy_001_v1_fb",
    "node":        "c1_phy_001",
    "title":       "Air is all around us",
    "variant":     "fill_blank | true_false | match | enumerate | mcq | sort | ...",
    "competency":  "Remember | Understand",
    "difficulty":  "Easy",
    "seed":        12345,          # reproducible seed
    "question":    "string",
    "options":     {"A": "...", ...}  or null,
    "answer":      "A"               or list/dict for open-ended
    "steps":       ["Step 1 …", ...]
    "verify_hint": "Check that …"
  }

Usage:
  >>> from physics.class1_physics_questions import generate_questions
  >>> qs = generate_questions(seed=2026)
  >>> for q in qs: print(q["id"], q["question"][:60])
"""

from __future__ import annotations

import random
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Callable

# ── reuse solver internals ────────────────────────────────────────────────────
from physics.class1_physics_solver import (
    solve,
    NodeID,
    QuestionContext,
    _hash_seed,
    AIR_SIGNS,
    AIR_USES,
    WIND_EXAMPLES,
    LAND_VEHICLES,
    WATER_VEHICLES,
    AIR_VEHICLES,
)

# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

@dataclass
class QuestionSpec:
    """One blueprint for a question."""
    node_id: str
    node_name: str
    competency: str
    difficulty: str
    variant: str
    weight: float          # relative probability weight
    description: str       # human-readable
    topics: List[str]      # syllabus keywords


# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

QUESTION_REGISTRY: List[QuestionSpec] = [
    # ── c1_phy_001 ────────────────────────────────────────────────────────────
    QuestionSpec(
        node_id="c1_phy_001",
        node_name="Air is all around us",
        competency="Remember",
        difficulty="Easy",
        variant="fill_blank",
        weight=1.0,
        description="Fill in the blank: 'Air is ___ around us'",
        topics=["air", "everywhere", "invisible"],
    ),
    QuestionSpec(
        node_id="c1_phy_001",
        node_name="Air is all around us",
        competency="Remember",
        difficulty="Easy",
        variant="true_false",
        weight=1.0,
        description="Identify which statement shows air is present",
        topics=["air", "signs", "observe"],
    ),
    # ── c1_phy_002 ────────────────────────────────────────────────────────────
    QuestionSpec(
        node_id="c1_phy_002",
        node_name="Feeling air when wind blows",
        competency="Understand",
        difficulty="Easy",
        variant="match",
        weight=1.0,
        description="Match things with how wind moves them",
        topics=["wind", "moving air", "feel", "breeze"],
    ),
    QuestionSpec(
        node_id="c1_phy_002",
        node_name="Feeling air when wind blows",
        competency="Understand",
        difficulty="Easy",
        variant="fill",
        weight=1.0,
        description="Fill in: 'Wind is ___ air'",
        topics=["wind", "moving air"],
    ),
    # ── c1_phy_003 ────────────────────────────────────────────────────────────
    QuestionSpec(
        node_id="c1_phy_003",
        node_name="Uses of air in daily life",
        competency="Understand",
        difficulty="Easy",
        variant="enumerate",
        weight=1.0,
        description="Name three uses of air in daily life",
        topics=["breathe", "kite", "dry clothes", "clean air"],
    ),
    QuestionSpec(
        node_id="c1_phy_003",
        node_name="Uses of air in daily life",
        competency="Understand",
        difficulty="Easy",
        variant="mcq",
        weight=1.0,
        description="Why do living things need air?",
        topics=["breathe", "alive", "living things"],
    ),
    QuestionSpec(
        node_id="c1_phy_003",
        node_name="Uses of air in daily life",
        competency="Understand",
        difficulty="Easy",
        variant="clean_air",
        weight=1.0,
        description="How do we keep air clean?",
        topics=["trees", "clean air", "plant"],
    ),
    # ── c1_phy_004 ────────────────────────────────────────────────────────────
    QuestionSpec(
        node_id="c1_phy_004",
        node_name="Modes of transport",
        competency="Remember",
        difficulty="Easy",
        variant="sort",
        weight=1.0,
        description="Sort vehicles into land / water / air",
        topics=["land", "water", "air", "vehicle", "mode"],
    ),
    QuestionSpec(
        node_id="c1_phy_004",
        node_name="Modes of transport",
        competency="Remember",
        difficulty="Easy",
        variant="emergency",
        weight=1.0,
        description="Which vehicle takes sick people to hospital?",
        topics=["ambulance", "emergency", "hospital"],
    ),
    QuestionSpec(
        node_id="c1_phy_004",
        node_name="Modes of transport",
        competency="Remember",
        difficulty="Easy",
        variant="traffic_signal",
        weight=1.0,
        description="What does the red traffic light mean?",
        topics=["red light", "stop", "traffic signal"],
    ),
]

_NODE_MAP = {spec.node_id: NodeID[spec.node_id.upper()] for spec in QUESTION_REGISTRY}


# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

def _make_seed(base_seed: int, spec: QuestionSpec, index: int) -> int:
    """Deterministic per-question seed from base_seed + registry position."""
    raw = f"{base_seed}|{spec.node_id}|{spec.variant}|{index}"
    return _hash_seed(raw)


def generate_one(spec: QuestionSpec, base_seed: int, index: int) -> Dict:
    """
    Build a fully resolved question dict from a QuestionSpec.
    """
    seed = _make_seed(base_seed, spec, index)
    node_enum = _NODE_MAP[spec.node_id]

    result = solve(node_enum, variant=spec.variant, seed=seed)

    out: Dict = {
        "id":        f"{spec.node_id}_v{index}_{spec.variant[:2]}",
        "node":      spec.node_id,
        "title":     spec.node_name,
        "variant":   spec.variant,
        "competency": spec.competency,
        "difficulty": spec.difficulty,
        "weight":    spec.weight,
        "topics":    spec.topics,
        "seed":      seed,
        "question":  result["question"],
        "steps":     result["steps"],
    }

    if "options" in result:
        out["options"] = result["options"]

    if spec.variant in ("fill_blank", "fill", "true_false",
                         "mcq", "clean_air", "traffic_signal", "emergency"):
        out["answer"] = result["answer"]
    elif spec.variant == "enumerate":
        out["answer"] = result["correct_set"]
        out["verify_hint"] = (
            f"Any {len(result['correct_set'])} distinct uses of air are accepted."
        )
    elif spec.variant == "match":
        out["column_a"] = result.get("column_a", {})
        out["column_b"] = result.get("column_b", {})
        out["answer"]   = result["answer"]
    elif spec.variant == "sort":
        out["vehicles"] = result.get("vehicles", [])
        out["answer"]   = result["answer"]

    return out


def generate_questions(
    seed: int = 2026,
    *,
    node_filter: Optional[str] = None,
    variant_filter: Optional[str] = None,
    max_per_node: Optional[int] = None,
) -> List[Dict]:
    """
    Generate all questions, optionally filtered.

    Parameters
    ----------
    seed            : int  – master seed (default 2026)
    node_filter     : str  – only this node id, e.g. "c1_phy_001"
    variant_filter  : str  – only this variant, e.g. "fill_blank"
    max_per_node    : int  – cap per node (round-robin truncation)

    Returns
    -------
    List[Dict] – each dict is a fully resolved question spec.
    """
    specs = QUESTION_REGISTRY
    if node_filter:
        specs = [s for s in specs if s.node_id == node_filter]
    if variant_filter:
        specs = [s for s in specs if s.variant == variant_filter]

    # group by node for max_per_node cap
    by_node: Dict[str, List[QuestionSpec]] = {}
    for s in specs:
        by_node.setdefault(s.node_id, []).append(s)

    selected: List[QuestionSpec] = []
    for nid, slist in by_node.items():
        selected.extend(slist[:max_per_node] if max_per_node else slist)

    # deterministic index order
    selected.sort(key=lambda s: (s.node_id, s.variant))

    return [generate_one(spec, seed, i) for i, spec in enumerate(selected)]


def generate_worksheet(
    n_per_variant: int = 2,
    seed: int = 42,
) -> Dict:
    """
    Produce a ready-to-print worksheet for all 4 nodes.

    Returns
    -------
    {
      "title": "Class 1 Physics – Worksheet",
      "instructions": "...",
      "questions": [ ... ]
    }
    """
    rng = random.Random(seed)
    questions: List[Dict] = []

    counter = 0
    for node_id in ["c1_phy_001", "c1_phy_002", "c1_phy_003", "c1_phy_004"]:
        variants_for_node = [s for s in QUESTION_REGISTRY if s.node_id == node_id]
        chosen = rng.sample(variants_for_node, k=min(n_per_variant, len(variants_for_node)))
        for spec in chosen:
            q = generate_one(spec, seed, counter)
            questions.append(q)
            counter += 1

    return {
        "title": "Class 1 Physics – Worksheet (EVS: Air, Transport)",
        "instructions": (
            "Answer each question carefully. "
            "For MCQ, write the letter (A/B/C/D). "
            "For match-the-columns, write pairs like A-2, B-4 etc. "
            "For sorting/enumeration, list your answers clearly."
        ),
        "total_questions": len(questions),
        "questions": questions,
    }


# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    ws = generate_worksheet(n_per_variant=2, seed=7)
    print(f"=== {ws['title']} ===")
    print(f"Total questions: {ws['total_questions']}\n")
    for q in ws["questions"]:
        print(f"[{q['id']}] ({q['variant']}) {q['question']}")
        if "options" in q:
            for letter, text in q["options"].items():
                print(f"    {letter}. {text}")
        print(f"    Answer: {q['answer']}")
        print()