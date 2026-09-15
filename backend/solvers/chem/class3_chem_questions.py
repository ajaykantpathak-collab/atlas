"""
Class 3 Chemistry Question Generator
Covers 3 nodes: Living/Non-living, Solids, Liquids
Syllabus: ICSE Class 3 Chemistry
50 % Indian context, 50 % standard. Seeded deterministic.
"""

import random
import json
import hashlib
from dataclasses import dataclass, field, asdict
from typing import List, Optional, Dict, Any
from enum import Enum

from class3_chem_solver import (
    Class3ChemSolver,
    NodeID,
    Difficulty,
    Competency,
    Question,
    seeded_rng,
    _SEED,
)

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

VALID_QUESTION_TYPES = ["mcq", "fill_blank", "true_false", "short_answer"]
VALID_NODES = [n.value for n in NodeID]
DIFFICULTIES = [Difficulty.EASY.value]
COMPETENCIES = [Competency.SCHOOL.value]


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class QuestionSet:
    """A reproducible, labelled set of questions."""
    label: str
    seed: int
    node: str
    count: int
    questions: List[Question] = field(default_factory=list)
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "label": self.label,
            "seed": self.seed,
            "node": self.node,
            "count": self.count,
            "metadata": self.metadata,
            "questions": [self._q_to_dict(q) for q in self.questions],
        }

    @staticmethod
    def _q_to_dict(q: Question) -> Dict[str, Any]:
        d = {
            "node": q.node,
            "difficulty": q.difficulty,
            "competency": q.competency,
            "question_type": q.question_type,
            "question_text": q.question_text,
            "correct_answer": q.correct_answer,
            "explanation": q.explanation,
            "step_by_step": q.step_by_step,
            "indian_context": q.indian_context,
        }
        if q.options:
            d["options"] = q.options
        return d

    def to_json(self, indent: int = 2) -> str:
        return json.dumps(self.to_dict(), indent=indent, ensure_ascii=False)


class Class3ChemQuestionGenerator:
    """Deterministic question generator for Class 3 Chemistry."""

    def __init__(self, seed: int = _SEED):
        self.solver = Class3ChemSolver()
        self.default_seed = seed

    # ──────────────────── Single question ─────────────────────
    def generate(
        self,
        node: str,
        question_type: str = "mcq",
        seed: Optional[int] = None,
    ) -> Question:
        """Generate one question for the given node."""
        s = seed if seed is not None else self.default_seed
        return self.solver.solve(node=node, question_type=question_type, seed=s)

    # ──────────────────── Question set ────────────────────────
    def generate_set(
        self,
        node: str,
        count: int = 5,
        question_types: Optional[List[str]] = None,
        seed: Optional[int] = None,
        label: str = "",
    ) -> QuestionSet:
        """Generate a labelled, reproducible set of questions."""
        rng = seeded_rng(seed if seed is not None else self.default_seed)
        types = question_types or VALID_QUESTION_TYPES

        questions: List[Question] = []
        used_types: List[str] = []

        for i in range(count):
            q_type = types[i % len(types)]
            q_seed = rng.randint(0, 10_000)
            q = self.solver.solve(node=node, question_type=q_type, seed=q_seed)
            questions.append(q)
            used_types.append(q_type)

        hash_input = f"{label}|{seed}|{node}|{count}|" + "|".join(
            str(q.node) + q.question_type for q in questions
        )
        checksum = hashlib.md5(hash_input.encode()).hexdigest()[:8]

        return QuestionSet(
            label=label or f"set_{node}_{count}q",
            seed=seed if seed is not None else self.default_seed,
            node=node,
            count=count,
            questions=questions,
            metadata={
                "question_types_used": used_types,
                "checksum": checksum,
                "syllabus": "ICSE Class 3 Chemistry",
            },
        )

    # ──────────────────── Full worksheet ───────────────────────
    def generate_worksheet(
        self,
        nodes: Optional[List[str]] = None,
        count_per_node: int = 4,
        seed: Optional[int] = None,
        label: str = "worksheet",
    ) -> QuestionSet:
        """Generate a multi-node worksheet."""
        rng = seeded_rng(seed if seed is not None else self.default_seed)
        target_nodes = nodes or VALID_NODES

        all_questions: List[Question] = []
        used_types: List[str] = []
        worksheet_seed = seed if seed is not None else self.default_seed

        for node in target_nodes:
            for i in range(count_per_node):
                q_type = VALID_QUESTION_TYPES[i % len(VALID_QUESTION_TYPES)]
                q_seed = rng.randint(0, 10_000)
                q = self.solver.solve(node=node, question_type=q_type, seed=q_seed)
                all_questions.append(q)
                used_types.append(q_type)

        hash_input = f"{label}|{worksheet_seed}|" + "|".join(
            q.node + q.question_type for q in all_questions
        )
        checksum = hashlib.md5(hash_input.encode()).hexdigest()[:8]

        return QuestionSet(
            label=label,
            seed=worksheet_seed,
            node=",".join(target_nodes),
            count=len(all_questions),
            questions=all_questions,
            metadata={
                "question_types_used": used_types,
                "checksum": checksum,
                "syllabus": "ICSE Class 3 Chemistry",
                "nodes_covered": target_nodes,
            },
        )

    # ──────────────────── Reproduce ───────────────────────────
    def reproduce(self, qs: QuestionSet) -> QuestionSet:
        """Re-create an identical QuestionSet from its seed and label."""
        seed = qs.seed
        nodes = qs.node.split(",")
        count_per_node = max(1, qs.count // len(nodes))
        return self.generate_worksheet(
            nodes=nodes,
            count_per_node=count_per_node,
            seed=seed,
            label=qs.label,
        )

    # ──────────────────── Export ───────────────────────────────
    def export_json(self, qs: QuestionSet, filepath: str) -> None:
        with open(filepath, "w", encoding="utf-8") as fh:
            fh.write(qs.to_json())

    def export_text(self, qs: QuestionSet, filepath: str) -> None:
        """Human-readable text export."""
        lines: List[str] = []
        lines.append(f"Question Set: {qs.label}")
        lines.append(f"Seed: {qs.seed}  |  Node: {qs.node}  |  Count: {qs.count}")
        lines.append(f"Checksum: {qs.metadata.get('checksum','')}")
        lines.append("=" * 60)

        for i, q in enumerate(qs.questions, 1):
            lines.append(f"\nQ{i}. [{q.question_type.upper()}] ({q.node})")
            lines.append(f"   {q.question_text}")
            if q.options:
                for opt in q.options:
                    marker = ">>" if opt.lower() == q.correct_answer.lower() else "  "
                    lines.append(f"   {marker} {opt}")
            lines.append(f"   Answer: {q.correct_answer}")
            lines.append(f"   Explanation: {q.explanation}")
            lines.append("   Step-by-step:")
            for step in q.step_by_step:
                lines.append(f"     • {step}")

        with open(filepath, "w", encoding="utf-8") as fh:
            fh.write("\n".join(lines) + "\n")


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

_gen = Class3ChemQuestionGenerator()


def generate_question(
    node: str,
    question_type: str = "mcq",
    seed: Optional[int] = None,
) -> Dict[str, Any]:
    q = _gen.generate(node=node, question_type=question_type, seed=seed)
    return QuestionSet._q_to_dict(q)


def generate_question_set(
    node: str,
    count: int = 5,
    seed: Optional[int] = None,
    label: str = "",
) -> Dict[str, Any]:
    qs = _gen.generate_set(node=node, count=count, seed=seed, label=label)
    return qs.to_dict()


def generate_worksheet(
    nodes: Optional[List[str]] = None,
    count_per_node: int = 4,
    seed: Optional[int] = None,
    label: str = "worksheet",
) -> Dict[str, Any]:
    qs = _gen.generate_worksheet(
        nodes=nodes, count_per_node=count_per_node, seed=seed, label=label
    )
    return qs.to_dict()


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import sys

    gen = Class3ChemQuestionGenerator()

    ws = gen.generate_worksheet(
        nodes=VALID_NODES,
        count_per_node=4,
        seed=42,
        label="class3_chem_demo",
    )

    print(ws.to_json())