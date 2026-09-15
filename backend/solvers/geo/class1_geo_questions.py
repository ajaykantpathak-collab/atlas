"""
Class 1 Geography Question Generator
=====================================
Produces seeded, varied question objects for each of the 4 nodes.

Generation strategy
-------------------
* Each node has a pool of question *templates* (with blank-fill slots).
* Slots are filled from node-scoped vocabulary + local distractors.
* MCQ shuffling is seeded so the same seed always yields the same order.
* No LLM involved — pure Python template expansion.
"""

from __future__ import annotations

import random
import re
import unicodedata
from dataclasses import dataclass, field
from typing import Any

from geo.class1_geo_solver import (
    NODE_META,
    MCQ_OPTIONS,
    ANSWER_KEYS,
    PREREQ_GRAPH,
    _seed_rng,
    _normalise,
    NodeID,
)

# ---------------------------------------------------------------------------
# Question type enum
# ---------------------------------------------------------------------------

class QType:
    MCQ   = "mcq"
    SAQ   = "saq"      # short answer (1-2 words)
    ORDER = "order"    # sequence / ordering
    MATCH = "match"    # matching pairs


# ---------------------------------------------------------------------------
# Question dataclass
# ---------------------------------------------------------------------------

@dataclass
class Question:
    node_id: str
    qtype: str
    qid: str            # unique sub-type key (maps to ANSWER_KEYS)
    text: str
    options: list[str] | None = None   # MCQ: 4 options
    correct_index: int | None = None   # MCQ: 0-based
    answer_text: str | None = None     # SAQ/ORDER: canonical text
    difficulty: str = "Easy"
    cognitive: str = "Remember"
    vocabulary: list[str] = field(default_factory=list)
    topic: str = ""
    marks: int = 1

    def to_dict(self) -> dict:
        d = {
            "node_id": self.node_id,
            "type": self.qtype,
            "qid": self.qid,
            "text": self.text,
            "difficulty": self.difficulty,
            "cognitive": self.cognitive,
            "vocabulary": self.vocabulary,
            "topic": self.topic,
            "marks": self.marks,
        }
        if self.qtype == QType.MCQ:
            d["options"] = self.options
            d["correct_index"] = self.correct_index
        else:
            d["answer_text"] = self.answer_text
        return d


# ---------------------------------------------------------------------------
# Template definitions
# ---------------------------------------------------------------------------
# Templates use Python str.format() with named slots.
# MCQ options are post-processed; SAQ slots filled from vocabulary.

_TEMPLATES: dict[str, list[dict]] = {
    # ── c1_geo_001 ────────────────────────────────────────────────────────
    NodeID.c1_geo_001: [
        # MCQ
        {
            "qid": "earth_home",
            "qtype": QType.MCQ,
            "template": "What is the name of our home planet?",
            "difficulty": "Easy",
            "cognitive": "Remember",
            "mcq_key": "earth_home",
            "marks": 1,
        },
        {
            "qid": "earth_water",
            "qtype": QType.MCQ,
            "template": "Which of these is found on Earth?",
            "difficulty": "Easy",
            "cognitive": "Remember",
            "mcq_key": "earth_water",
            "marks": 1,
        },
        {
            "qid": "earth_care",
            "qtype": QType.MCQ,
            "template": "Which of these helps take care of Earth?",
            "difficulty": "Easy",
            "cognitive": "Remember",
            "mcq_key": "earth_care",
            "marks": 1,
        },
        {
            "qid": "earth_surroundings",
            "qtype": QType.MCQ,
            "template": "Which of these is part of our surroundings?",
            "difficulty": "Easy",
            "cognitive": "Remember",
            "mcq_key": "earth_surroundings",
            "marks": 1,
        },
        # SAQ
        {
            "qid": "earth_home_saq",
            "qtype": QType.SAQ,
            "template": "What is the name of the planet we live on?",
            "answer_tokens": {"earth", "planet earth"},
            "difficulty": "Easy",
            "cognitive": "Remember",
            "marks": 1,
        },
        {
            "qid": "earth_air_saq",
            "qtype": QType.SAQ,
            "template": "What do we breathe to live?",
            "answer_tokens": {"air"},
            "difficulty": "Easy",
            "cognitive": "Remember",
            "marks": 1,
        },
        {
            "qid": "earth_plants_animals_saq",
            "qtype": QType.SAQ,
            "template": "Name two living things found on Earth.",
            "answer_tokens": {"plants", "animals"},
            "difficulty": "Easy",
            "cognitive": "Remember",
            "marks": 1,
        },
        {
            "qid": "earth_surroundings_saq",
            "qtype": QType.SAQ,
            "template": "Name one place near your home that is part of your surroundings.",
            "answer_tokens": {"home", "school", "garden", "playground"},
            "difficulty": "Easy",
            "cognitive": "Remember",
            "marks": 1,
        },
        {
            "qid": "earth_care_saq",
            "qtype": QType.SAQ,
            "template": "Name one way you can take care of Earth.",
            "answer_tokens": {"not litter", "plant trees", "keep clean", "clean"},
            "difficulty": "Easy",
            "cognitive": "Remember",
            "marks": 1,
        },
    ],

    # ── c1_geo_002 ────────────────────────────────────────────────────────
    NodeID.c1_geo_002: [
        {
            "qid": "sun_gives",
            "qtype": QType.MCQ,
            "template": "What does the sun give us?",
            "difficulty": "Easy",
            "cognitive": "Remember",
            "mcq_key": "sun_gives",
            "marks": 1,
        },
        {
            "qid": "sun_sky",
            "qtype": QType.MCQ,
            "template": "When do we see the sun in the sky?",
            "difficulty": "Easy",
            "cognitive": "Remember",
            "mcq_key": "sun_sky",
            "marks": 1,
        },
        {
            "qid": "sun_helps",
            "qtype": QType.MCQ,
            "template": "How does the sun help plants?",
            "difficulty": "Easy",
            "cognitive": "Remember",
            "mcq_key": "sun_helps",
            "marks": 1,
        },
        {
            "qid": "sun_safe",
            "qtype": QType.MCQ,
            "template": "Should we look directly at the sun?",
            "difficulty": "Easy",
            "cognitive": "Remember",
            "mcq_key": "sun_safe",
            "marks": 1,
        },
        {
            "qid": "sun_time",
            "qtype": QType.MCQ,
            "template": "At what times can we observe the sun?",
            "difficulty": "Easy",
            "cognitive": "Remember",
            "mcq_key": "sun_time",
            "marks": 1,
        },
        # SAQ
        {
            "qid": "sun_light_saq",
            "qtype": QType.SAQ,
            "template": "What does the sun give us that helps us see?",
            "answer_tokens": {"light"},
            "difficulty": "Easy",
            "cognitive": "Remember",
            "marks": 1,
        },
        {
            "qid": "sun_heat_saq",
            "qtype": QType.SAQ,
            "template": "What does the sun give us that keeps us warm?",
            "answer_tokens": {"heat", "warmth", "warm"},
            "difficulty": "Easy",
            "cognitive": "Remember",
            "marks": 1,
        },
        {
            "qid": "sun_grow_saq",
            "qtype": QType.SAQ,
            "template": "What does the sun help do to plants?",
            "answer_tokens": {"grow"},
            "difficulty": "Easy",
            "cognitive": "Remember",
            "marks": 1,
        },
        {
            "qid": "sun_position_morning",
            "qtype": QType.SAQ,
            "template": "In which part of the day do you first see the sun?",
            "answer_tokens": {"morning"},
            "difficulty": "Easy",
            "cognitive": "Remember",
            "marks": 1,
        },
        {
            "qid": "sun_no_look_saq",
            "qtype": QType.SAQ,
            "qtype": QType.SAQ,
            "template": "Can we look directly at the sun? (Yes / No)",
            "answer_tokens": {"no", "dont", "do not", "never"},
            "difficulty": "Easy",
            "cognitive": "Remember",
            "marks": 1,
        },
    ],

    # ── c1_geo_003 ────────────────────────────────────────────────────────
    NodeID.c1_geo_003: [
        {
            "qid": "day_night_define",
            "qtype": QType.MCQ,
            "template": "Which sentence best describes day time?",
            "difficulty": "Easy",
            "cognitive": "Understand",
            "mcq_key": "day_night_define",
            "marks": 1,
        },
        {
            "qid": "night_see",
            "qtype": QType.MCQ,
            "template": "What can we see in the sky at night?",
            "difficulty": "Easy",
            "cognitive": "Understand",
            "mcq_key": "night_see",
            "marks": 1,
        },
        {
            "qid": "activity_day",
            "qtype": QType.MCQ,
            "template": "Which activity do we do during the day?",
            "difficulty": "Easy",
            "cognitive": "Understand",
            "mcq_key": "activity_day",
            "marks": 1,
        },
        {
            "qid": "activity_night",
            "qtype": QType.MCQ,
            "template": "What do we mainly do at night?",
            "difficulty": "Easy",
            "cognitive": "Understand",
            "mcq_key": "activity_night",
            "marks": 1,
        },
        {
            "qid": "sun_movement",
            "qtype": QType.MCQ,
            "template": "When does the sun rise and set?",
            "difficulty": "Easy",
            "cognitive": "Understand",
            "mcq_key": "sun_movement",
            "marks": 1,
        },
        {
            "qid": "time_order",
            "qtype": QType.MCQ,
            "template": "What is the correct order of the day?",
            "difficulty": "Easy",
            "cognitive": "Understand",
            "mcq_key": "time_order",
            "marks": 1,
        },
        # SAQ
        {
            "qid": "day_night_saq",
            "qtype": QType.SAQ,
            "template": "What do we call the time when the sun is in the sky?",
            "answer_tokens": {"day"},
            "difficulty": "Easy",
            "cognitive": "Understand",
            "marks": 1,
        },
        {
            "qid": "night_dark_saq",
            "qtype": QType.SAQ,
            "template": "What do we call the time when it is dark?",
            "answer_tokens": {"night"},
            "difficulty": "Easy",
            "cognitive": "Understand",
            "marks": 1,
        },
        {
            "qid": "night_objects_saq",
            "qtype": QType.SAQ,
            "template": "Name two things you can see in the sky at night.",
            "answer_tokens": {"moon", "stars"},
            "difficulty": "Easy",
            "cognitive": "Understand",
            "marks": 1,
        },
        # ORDER — sequence the four time words
        {
            "qid": "time_sequence",
            "qtype": QType.ORDER,
            "template": "Arrange these in order: morning, evening, afternoon, night",
            "answer_sequence": ["morning", "afternoon", "evening", "night"],
            "difficulty": "Easy",
            "cognitive": "Understand",
            "marks": 2,
        },
        # MATCH — day/night activities
        {
            "qid": "activity_match",
            "qtype": QType.MATCH,
            "template": "Match: (A) Going to school  (B) Sleeping  →  (1) Day  (2) Night",
            "matches": [("A", "1"), ("B", "2")],
            "difficulty": "Easy",
            "cognitive": "Understand",
            "marks": 2,
        },
    ],

    # ── c1_geo_004 ────────────────────────────────────────────────────────
    NodeID.c1_geo_004: [
        {
            "qid": "sky_day",
            "qtype": QType.MCQ,
            "template": "What colour is the sky during the day?",
            "difficulty": "Easy",
            "cognitive": "Understand",
            "mcq_key": "sky_day",
            "marks": 1,
        },
        {
            "qid": "sky_sunrise",
            "qtype": QType.MCQ,
            "template": "What colours do we see in the sky at sunrise?",
            "difficulty": "Easy",
            "cognitive": "Understand",
            "mcq_key": "sky_sunrise",
            "marks": 1,
        },
        {
            "qid": "sky_night",
            "qtype": QType.MCQ,
            "template": "What does the sky look like at night?",
            "difficulty": "Easy",
            "cognitive": "Understand",
            "mcq_key": "sky_night",
            "marks": 1,
        },
        {
            "qid": "sky_clouds",
            "qtype": QType.MCQ,
            "template": "What floats in the sky?",
            "difficulty": "Easy",
            "cognitive": "Remember",
            "mcq_key": "sky_clouds",
            "marks": 1,
        },
        {
            "qid": "sky_evening",
            "qtype": QType.MCQ,
            "template": "What happens to the sky in the evening?",
            "difficulty": "Easy",
            "cognitive": "Understand",
            "mcq_key": "sky_evening",
            "marks": 1,
        },
        # SAQ
        {
            "qid": "sky_day_saq",
            "qtype": QType.SAQ,
            "template": "What colour is the sky when the sun is out?",
            "answer_tokens": {"blue"},
            "difficulty": "Easy",
            "cognitive": "Understand",
            "marks": 1,
        },
        {
            "qid": "sky_sunset_saq",
            "qtype": QType.SAQ,
            "template": "What colours appear in the sky at sunset?",
            "answer_tokens": {"orange", "red", "pink"},
            "difficulty": "Easy",
            "cognitive": "Understand",
            "marks": 1,
        },
        {
            "qid": "sky_night_saq",
            "qtype": QType.SAQ,
            "template": "What do we see in the sky at night?",
            "answer_tokens": {"stars", "moon"},
            "difficulty": "Easy",
            "cognitive": "Understand",
            "marks": 1,
        },
        # ORDER — sequence sky changes through the day
        {
            "qid": "sky_sequence",
            "qtype": QType.ORDER,
            "template": "Arrange these sky views in order: dark with stars, blue and bright, orange and red",
            "answer_sequence": ["blue and bright", "orange and red", "dark with stars"],
            "difficulty": "Easy",
            "cognitive": "Understand",
            "marks": 2,
        },
        {
            "qid": "sky_things_match",
            "qtype": QType.MATCH,
            "template": "Match: (A) Sun  (B) Stars  →  (1) Seen in day  (2) Seen at night",
            "matches": [("A", "1"), ("B", "2")],
            "difficulty": "Easy",
            "cognitive": "Understand",
            "marks": 2,
        },
    ],
}


# ---------------------------------------------------------------------------
# Generator class
# ---------------------------------------------------------------------------

@dataclass
class QuestionSet:
    """Container for a generated set of questions."""

    seed: int
    questions: list[Question]
    metadata: dict = field(default_factory=dict)

    def to_list(self) -> list[dict]:
        return [q.to_dict() for q in self.questions]

    def to_json(self, **kwargs) -> str:
        import json
        return json.dumps(self.to_list(), indent=2, **kwargs)


class GeographyQuestionGenerator:
    """
    Deterministic, seeded question generator for Class 1 Geography.

    Usage
    -----
    >>> gen = GeographyQuestionGenerator(seed=42)
    >>> qs = gen.generate(node_id="c1_geo_001", count=4)
    >>> for q in qs:
    ...     print(q.text)
    """

    def __init__(self, seed: int = 42):
        self._rng = _seed_rng(seed)
        self._global_seed = seed

    # ── public API ──────────────────────────────────────────────────────────

    def generate(
        self,
        node_id: str,
        count: int = 5,
        *,
        qtypes: list[str] | None = None,
        unlocked_only: bool = True,
    ) -> QuestionSet:
        """
        Generate *count* questions for *node_id*.

        Parameters
        ----------
        node_id     : one of the 4 node IDs
        count       : number of questions to return (≤ available pool)
        qtypes      : filter by type list e.g. ["mcq", "saq"]; None = all
        unlocked_only: set True to only return questions for nodes the
                       learner has unlocked (checks prereq chain)

        Returns
        -------
        QuestionSet
        """
        if node_id not in NODE_META:
            raise ValueError(f"Unknown node_id: {node_id}. "
                             f"Valid: {sorted(NODE_META.keys())}")

        pool = list(_TEMPLATES.get(node_id, []))

        # filter by qtype if specified
        if qtypes:
            pool = [t for t in pool if t.get("qtype") in qtypes]

        if not pool:
            raise ValueError(f"No templates found for node {node_id} "
                             f"with qtypes={qtypes}")

        # deterministic shuffle
        shuffled = pool[:]
        self._rng.shuffle(shuffled)

        selected = shuffled[: min(count, len(shuffled))]

        questions = [
            self._build_question(node_id, tpl, idx=i)
            for i, tpl in enumerate(selected)
        ]

        return QuestionSet(
            seed=self._global_seed,
            questions=questions,
            metadata={
                "node_id": node_id,
                "label": NODE_META[node_id]["label"],
                "requested": count,
                "returned": len(questions),
                "qtypes_used": sorted(set(q.qtype for q in questions)),
            },
        )

    def generate_all(
        self,
        count_per_node: int = 4,
        *,
        seed: int | None = None,
    ) -> dict[str, QuestionSet]:
        """
        Generate question sets for all 4 nodes in order (respects prereqs).
        Returns a dict keyed by node_id.
        """
        if seed is not None:
            self._rng = _seed_rng(seed)
        result = {}
        for nid in sorted(NODE_META.keys()):
            result[nid] = self.generate(nid, count=count_per_node)
        return result

    def generate_quiz(
        self,
        node_ids: list[str],
        count: int = 10,
        *,
        seed: int | None = None,
    ) -> QuestionSet:
        """
        Mixed-node quiz: draw *count* questions spread across *node_ids*
        proportionally, respecting prerequisite order.
        """
        if seed is not None:
            self._rng = _seed_rng(seed)

        all_questions: list[Question] = []
        per_node = max(1, count // len(node_ids))
        for nid in node_ids:
            qs = self.generate(nid, count=per_node)
            all_questions.extend(qs.questions)

        # re-shuffle and trim
        self._rng.shuffle(all_questions)
        trimmed = all_questions[:count]

        return QuestionSet(
            seed=self._global_seed,
            questions=trimmed,
            metadata={
                "mode": "quiz",
                "node_ids": node_ids,
                "total_generated": len(all_questions),
                "returned": len(trimmed),
            },
        )

    # ── internal ────────────────────────────────────────────────────────────

    def _build_question(
        self, node_id: str, tpl: dict, idx: int
    ) -> Question:
        """Expand a template into a fully populated Question."""
        qtype = tpl["qtype"]

        if qtype == QType.MCQ:
            return self._build_mcq(node_id, tpl)
        elif qtype == QType.SAQ:
            return self._build_saq(node_id, tpl)
        elif qtype == QType.ORDER:
            return self._build_order(node_id, tpl)
        elif qtype == QType.MATCH:
            return self._build_match(node_id, tpl)
        else:
            raise ValueError(f"Unknown qtype: {qtype}")

    def _build_mcq(self, node_id: str, tpl: dict) -> Question:
        mcq_key = tpl["mcq_key"]
        pool = MCQ_OPTIONS[node_id][mcq_key]
        correct_text = pool["correct"]
        distractors = list(pool["distractors"])

        # deterministic shuffle of distractors
        opts = distractors + [correct_text]
        self._rng.shuffle(opts)
        correct_idx = opts.index(correct_text)

        return Question(
            node_id=node_id,
            qtype=QType.MCQ,
            qid=mcq_key,
            text=tpl["template"],
            options=opts,
            correct_index=correct_idx,
            difficulty=tpl["difficulty"],
            cognitive=tpl["cognitive"],
            vocabulary=NODE_META[node_id]["vocabulary"][:5],
            topic=NODE_META[node_id]["spiral_topic"],
            marks=tpl["marks"],
        )

    def _build_saq(self, node_id: str, tpl: dict) -> Question:
        return Question(
            node_id=node_id,
            qtype=QType.SAQ,
            qid=tpl["qid"],
            text=tpl["template"],
            answer_text=" / ".join(sorted(tpl["answer_tokens"])),
            difficulty=tpl["difficulty"],
            cognitive=tpl["cognitive"],
            vocabulary=NODE_META[node_id]["vocabulary"][:5],
            topic=NODE_META[node_id]["spiral_topic"],
            marks=tpl["marks"],
        )

    def _build_order(self, node_id: str, tpl: dict) -> Question:
        # deterministic shuffle of items so the question text changes
        items = list(tpl["answer_sequence"])
        shuffled_items = items[:]
        self._rng.shuffle(shuffled_items)
        # re-construct text with shuffled items
        text = f"Put these in the correct order (1→2→3→…): {', '.join(shuffled_items)}"
        return Question(
            node_id=node_id,
            qtype=QType.ORDER,
            qid=tpl["qid"],
            text=text,
            answer_text=" → ".join(tpl["answer_sequence"]),
            difficulty=tpl["difficulty"],
            cognitive=tpl["cognitive"],
            vocabulary=NODE_META[node_id]["vocabulary"][:5],
            topic=NODE_META[node_id]["spiral_topic"],
            marks=tpl["marks"],
        )

    def _build_match(self, node_id: str, tpl: dict) -> Question:
        return Question(
            node_id=node_id,
            qtype=QType.MATCH,
            qid=tpl["qid"],
            text=tpl["template"],
            answer_text="; ".join(f"{k}→{v}" for k, v in tpl["matches"]),
            difficulty=tpl["difficulty"],
            cognitive=tpl["cognitive"],
            vocabulary=NODE_META[node_id]["vocabulary"][:5],
            topic=NODE_META[node_id]["spiral_topic"],
            marks=tpl["marks"],
        )


# ---------------------------------------------------------------------------
# Convenience functions
# ---------------------------------------------------------------------------

def generate_for_node(node_id: str, count: int = 5, seed: int = 42) -> QuestionSet:
    return GeographyQuestionGenerator(seed=seed).generate(node_id, count)


def generate_quiz(node_ids: list[str], count: int = 10, seed: int = 42) -> QuestionSet:
    return GeographyQuestionGenerator(seed=seed).generate_quiz(node_ids, count)


# ---------------------------------------------------------------------------
# CLI self-test
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    gen = GeographyQuestionGenerator(seed=42)

    print("=== Class 1 Geography — Question Generator Self-Test ===\n")

    all_nodes = sorted(NODE_META.keys())
    for nid in all_nodes:
        meta = NODE_META[nid]
        qs = gen.generate(nid, count=3)
        print(f"--- {nid}: {meta['label']} [{meta['cognitive']}] ---")
        for q in qs.questions:
            if q.qtype == QType.MCQ:
                opt_str = " | ".join(
                    f"{'►' if i == q.correct_index else ' '}{chr(65+i)}. {o}"
                    for i, o in enumerate(q.options)
                )
                print(f"  [{q.qtype}] {q.text}")
                print(f"         {opt_str}")
            elif q.qtype == QType.ORDER:
                print(f"  [{q.qtype}] {q.text}")
                print(f"         Answer: {q.answer_text}")
            else:
                print(f"  [{q.qtype}] {q.text}")
                print(f"         Answer: {q.answer_text}")
        print()

    # Demonstrate cross-node quiz
    print("--- Mixed Quiz (3 questions, all nodes) ---")
    quiz = gen.generate_quiz(all_nodes, count=6, seed=99)
    for q in quiz.questions:
        print(f"  [{q.node_id}] ({q.qtype}) {q.text}")