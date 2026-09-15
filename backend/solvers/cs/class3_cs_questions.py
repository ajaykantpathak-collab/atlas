# /// vendor: addcp=1
"""
Question Generator for Class 3 Computer Studies (CISCE Curriculum)
Generates balanced, curriculum-aligned question sets from three nodes:
  c3_cs_001 — Hardware vs Software relationship
  c3_cs_002 — Five main components (CPU, memory, input, output, storage)
  c3_cs_003 — System software vs Application software

50 % competency-level (Indian context) + 50 % standard board-level.
Seeded with python's `random` module for reproducibility.
"""

import json
import random
import re
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Optional

from class3_cs_solver import (
    NodeID, QType, Difficulty, QRecord,
    QUESTION_BANK, get_questions_for_node,
    coverage_report, solve, total_score,
)

# ─── TYPES ───────────────────────────────────────────────────────────────────

class ExamType(Enum):
    CLASS_TEST = "class_test"      # 10-15 marks, quick check
    UNIT_TEST   = "unit_test"      # 20-30 marks, thorough
    BOARD_PREP  = "board_prep"     # full weighted mix


class Competency(Enum):
    BOARD    = "board"      # 50 % — standard board-style
    COMPETENCY = "competency"  # 50 % — Indian context competency-style


@dataclass
class PaperSpec:
    """Specification for a generated question paper."""
    exam_type: ExamType = ExamType.UNIT_TEST
    competency: Competency = Competency.BOARD
    seed: int = 42
    nodes: list[NodeID] = field(default_factory=lambda: list(NodeID))
    max_questions: int = 0          # 0 = auto
    difficulty_weights: dict[str, float] = field(default_factory=lambda: {
        "easy": 0.30,
        "medium": 0.55,
        "hard": 0.15,
    })

    def __post_init__(self):
        if not self.nodes:
            self.nodes = list(NodeID)


@dataclass
class GeneratedPaper:
    spec: PaperSpec
    questions: list[QRecord]
    answer_key: list[dict]
    total_max_score: float
    metadata: dict = field(default_factory=dict)

    def to_dict(self) -> dict:
        return {
            "exam_type": self.spec.exam_type.value,
            "competency": self.spec.competency.value,
            "seed": self.spec.seed,
            "total_questions": len(self.questions),
            "total_max_score": self.total_max_score,
            "questions": [q.to_dict() for q in self.questions],
            "answer_key": self.answer_key,
            "metadata": self.metadata,
        }

    def to_json(self, indent: int = 2) -> str:
        return json.dumps(self.to_dict(), indent=indent, ensure_ascii=False)

    def print_paper(self):
        print(f"\n{'='*60}")
        print(f"  CLASS 3 COMPUTER STUDIES — {self.spec.exam_type.value.upper()}")
        print(f"  Competency: {self.spec.competency.value}  |  Seed: {self.spec.seed}")
        print(f"{'='*60}\n")
        for i, q in enumerate(self.questions, 1):
            diff_tag = f"[{q.difficulty.value.upper()}]"
            node_tag = f"[{q.node.value}]"
            print(f"Q{i}. {diff_tag} {node_tag}")
            print(f"   {q.question}")
            if q.options:
                for opt in q.options:
                    print(f"     {opt}")
            print()
        print(f"{'─'*60}")
        print(f"  Total Questions: {len(self.questions)}  |  Total Marks: {self.total_max_score}")
        print(f"{'─'*60}\n")

    def print_answer_key(self):
        print(f"\n{'='*60}")
        print(f"  ANSWER KEY")
        print(f"{'='*60}\n")
        for i, entry in enumerate(self.answer_key, 1):
            print(f"Q{i}. {entry['answer']}")
            if entry.get("explanation"):
                print(f"   → {entry['explanation'][:80]}")
        print()


# ─── QUESTION SELECTION ENGINE ───────────────────────────────────────────────

class QuestionSelector:
    """
    Deterministic question selector that balances:
      • Coverage across all nodes
      • Difficulty weights
      • Question-type diversity
      • Competency mix (board vs competency-style)
    """

    def __init__(self, spec: PaperSpec):
        self.spec = spec
        self.rng = random.Random(spec.seed)
        self._score_map = {Difficulty.EASY: 1.0, Difficulty.MEDIUM: 1.5, Difficulty.HARD: 2.0}

    # ── helpers ────────────────────────────────────────────────────────────
    def _pool(self, node: NodeID) -> list[QRecord]:
        return get_questions_for_node(node)

    def _select_by_difficulty(self, pool: list[QRecord],
                               n: int,
                               weights: dict[str, float]) -> list[QRecord]:
        """Weighted-stratified sample without replacement."""
        buckets: dict[str, list[QRecord]] = {d: [] for d in weights}
        for q in pool:
            buckets[q.difficulty.value].append(q)

        chosen: list[QRecord] = []
        for diff, w in weights.items():
            k = max(0, round(n * w))
            avail = [q for q in buckets[diff] if q not in chosen]
            k = min(k, len(avail))
            if k > 0:
                picked = self.rng.sample(avail, k)
                chosen.extend(picked)

        # Fill remaining
        remaining = n - len(chosen)
        if remaining > 0:
            used = set(chosen)
            leftovers = [q for q in pool if q not in used]
            chosen.extend(self.rng.sample(leftovers, min(remaining, len(leftovers))))

        return chosen[:n]

    def _type_diversity_check(self, selected: list[QRecord]) -> bool:
        """Ensure at least one of each major type is present if pool allows."""
        types_present = {q.qtype.value for q in selected}
        essential = {QType.MCQ.value, QType.TRUE_FALSE.value, QType.FILL_BLANK.value}
        # at least MCQ + one other
        return QType.MCQ.value in types_present

    # ── main selection ─────────────────────────────────────────────────────
    def select(self) -> tuple[list[QRecord], dict]:
        nodes = self.spec.nodes
        n_nodes = len(nodes)
        total_q = self.spec.max_questions
        if total_q == 0:
            # auto: ~3-4 per node
            total_q = max(10, n_nodes * 3)

        # Per-node allocation (proportional)
        per_node = {}
        base = total_q // n_nodes
        rem = total_q % n_nodes
        for i, node in enumerate(nodes):
            per_node[node] = base + (1 if i < rem else 0)

        weights = self.spec.difficulty_weights
        all_selected: list[QRecord] = []
        node_counts: dict[str, int] = {}

        for node, count in per_node.items():
            pool = self._pool(node)
            if not pool:
                continue
            picked = self._select_by_difficulty(pool, count, weights)
            all_selected.extend(picked)
            node_counts[node.value] = len(picked)

        # Shuffle deterministically
        self.rng.shuffle(all_selected)

        # Verify diversity
        if not self._type_diversity_check(all_selected):
            # fallback: ensure at least 1 MCQ added
            for q in QUESTION_BANK:
                if q.qtype == QType.MCQ and q not in all_selected:
                    all_selected.insert(0, q)
                    break

        metadata = {
            "questions_per_node": node_counts,
            "difficulty_weights_used": weights,
            "total_attempted": total_q,
            "total_generated": len(all_selected),
        }

        return all_selected, metadata

    # ── scoring ────────────────────────────────────────────────────────────
    def compute_total_score(self, questions: list[QRecord]) -> float:
        score_map = {Difficulty.EASY: 1.0, Difficulty.MEDIUM: 1.5, Difficulty.HARD: 2.0}
        return sum(score_map[q.difficulty] for q in questions)

    # ── answer key ─────────────────────────────────────────────────────────
    def build_answer_key(self, questions: list[QRecord]) -> list[dict]:
        key = []
        for q in questions:
            entry: dict[str, Any] = {
                "node": q.node.value,
                "question": q.question,
                "answer": q.answer,
                "qtype": q.qtype.value,
            }
            if q.explanation:
                entry["explanation"] = q.explanation
            key.append(entry)
        return key


# ─── GENERATOR ───────────────────────────────────────────────────────────────

def generate_paper(spec: PaperSpec) -> GeneratedPaper:
    """
    Main entry point: generate a complete question paper from a PaperSpec.
    """
    rng = random.Random(spec.seed)
    selector = QuestionSelector(spec)
    questions, metadata = selector.select()
    total_score = selector.compute_total_score(questions)
    answer_key = selector.build_answer_key(questions)

    return GeneratedPaper(
        spec=spec,
        questions=questions,
        answer_key=answer_key,
        total_max_score=total_score,
        metadata=metadata,
    )


def generate_papers_batch(specs: list[PaperSpec]) -> list[GeneratedPaper]:
    """Generate multiple papers in one call."""
    return [generate_paper(s) for s in specs]


# ─── QUESTION GENERATION FROM TOPIC ─────────────────────────────────────────

def generate_from_node(node: NodeID,
                       n: int = 5,
                       seed: int = 42,
                       difficulty: Optional[Difficulty] = None) -> list[QRecord]:
    """Generate n random questions from a single node."""
    rng = random.Random(seed)
    pool = get_questions_for_node(node)
    if difficulty:
        pool = [q for q in pool if q.difficulty == difficulty]
    n = min(n, len(pool))
    return rng.sample(pool, n)


def generate_mixed_review(n_per_node: int = 3,
                          seed: int = 7) -> list[QRecord]:
    """Generate a mixed-review paper (one from each difficulty tier per node)."""
    rng = random.Random(seed)
    all_q: list[QRecord] = []
    for node in NodeID:
        pool = get_questions_for_node(node)
        by_diff: dict[str, list[QRecord]] = {}
        for q in pool:
            by_diff.setdefault(q.difficulty.value, []).append(q)
        picks = []
        for d in ("easy", "medium", "hard"):
            if by_diff.get(d):
                picks.append(rng.choice(by_diff[d]))
        all_q.extend(picks[:n_per_node])
    rng.shuffle(all_q)
    return all_q


# ─── CURRICULUM COVERAGE ANALYSER ───────────────────────────────────────────

def analyse_coverage(questions: list[QRecord]) -> dict:
    """Analyse how well a set of questions covers the syllabus."""
    node_coverage: dict[str, dict] = {}
    for node in NodeID:
        pool = get_questions_for_node(node)
        pool_ids = {id(q) for q in pool}
        selected_ids = {id(q) for q in questions if q.node == node}
        pct = round(len(selected_ids) / len(pool_ids) * 100, 1) if pool_ids else 0.0
        node_coverage[node.value] = {
            "pool_size": len(pool),
            "selected": len(selected_ids),
            "coverage_pct": pct,
        }
    return {
        "total_questions": len(questions),
        "node_coverage": node_coverage,
        "overall_coverage_pct": round(
            sum(v["selected"] for v in node_coverage.values()) /
            sum(v["pool_size"] for v in node_coverage.values()) * 100, 1
        ),
    }


# ─── DEMO / CLI ──────────────────────────────────────────────────────────────

def run_demo():
    """Generate a sample paper and run the solver on it."""
    print("=" * 60)
    print("  CLASS 3 CS — AUTO-GENERATED PAPER DEMO")
    print("=" * 60)

    # Generate 3 papers with different seeds
    seeds = [10, 42, 99]
    papers: list[GeneratedPaper] = []

    for seed in seeds:
        spec = PaperSpec(
            exam_type=ExamType.UNIT_TEST,
            competency=Competency.BOARD,
            seed=seed,
            max_questions=9,
        )
        paper = generate_paper(spec)
        papers.append(paper)

        print(f"\n── Paper (seed={seed}) ──────────────────────────────")
        paper.print_paper()

        # Auto-grade using the correct answers
        results = [solve(q, q.answer) for q in paper.questions]
        sc = total_score(results)
        correct = sum(1 for r in results if r.correct)
        print(f"  Auto-grade: {correct}/{len(results)} correct | Score: {sc['earned']}/{sc['maximum']} ({sc['percentage']}%)")

    # Coverage analysis
    print("\n── Coverage Analysis ───────────────────────────────")
    cov = analyse_coverage(papers[0].questions)
    print(json.dumps(cov, indent=2))

    # Solver bank coverage
    print("\n── Solver Bank Coverage ────────────────────────────")
    print(json.dumps(coverage_report(), indent=2))


if __name__ == "__main__":
    run_demo()