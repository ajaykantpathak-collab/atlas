"""
Class 4 Computer Studies — Question Generator
Seeded randomisation; 50 % Indian-context (ICSE / CISCE flavour),
50 % standard international. Each question carries full step-by-step
solution and a verifier string returned by the solver.
"""
from __future__ import annotations

import random
import textwrap
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple

from class4_cs_solver import (
    solve_node_001,
    solve_node_002,
    solve_node_003,
    solve_all,
    QuestionSet,
    SolvedQuestion,
    _fmt_unit,
)


# ──────────────────────────────────────────────
#  QUESTION CATALOGUE  (structured template dicts)
# ──────────────────────────────────────────────

_TOPIC_META: Dict[str, Dict] = {
    "c4_cs_001": {
        "title": "Data vs Information & Storage Units",
        "icon": "💾",
        "learning_objectives": [
            "Distinguish data (raw facts) from information (processed, meaningful data).",
            "List storage units in ascending order: bit, byte, KB, MB, GB, TB.",
            "Convert between units: 1 byte = 8 bits; 1 KB = 1,000 bytes.",
        ],
    },
    "c4_cs_002": {
        "title": "RAM & ROM Memory",
        "icon": "🧠",
        "learning_objectives": [
            "Define RAM as volatile memory and ROM as non-volatile memory.",
            "Explain one use of each: RAM for running programs, ROM for startup (BIOS).",
            "Predict what happens to data when power is switched off.",
        ],
    },
    "c4_cs_003": {
        "title": "Storage Devices",
        "icon": "💿",
        "learning_objectives": [
            "Identify HDD, SSD, USB flash drive, CD, DVD, and cloud storage.",
            "Classify devices as internal vs external and permanent vs portable.",
            "Compare HDD and SSD (speed, moving parts, durability).",
        ],
    },
}


# ──────────────────────────────────────────────
#  GENERATOR CLASS
# ──────────────────────────────────────────────

@dataclass
class GeneratedPaper:
    """A ready-to-print question paper for a single or all nodes."""
    title: str
    grade: str = "Class 4"
    subject: str = "Computer Studies"
    curriculum: str = "ICSE / CISCE"
    sections: List[Dict] = field(default_factory=list)

    def render(self) -> str:
        lines = [
            f"{'='*70}",
            f"  {self.title}",
            f"  {self.grade}  |  {self.subject}  |  {self.curriculum}",
            f"{'='*70}",
        ]
        for sec in self.sections:
            lines.append(f"\n{sec['heading']}")
            lines.append(f"{'─'*60}")
            for i, q in enumerate(sec["questions"], 1):
                lines.append(f"\n  Q{i}. {q.question}")
                if q.options:
                    for opt in q.options:
                        lines.append(f"     {opt}")
        lines.append(f"\n{'='*70}")
        lines.append("  ANSWERS & SOLUTIONS  (see solver output for step-by-step)")
        lines.append(f"{'='*70}")
        for sec in self.sections:
            lines.append(f"\n{sec['heading']}")
            for i, q in enumerate(sec["questions"], 1):
                lines.append(f"  Q{i}. Answer: {q.answer}")
        return "\n".join(lines)


class QuestionGenerator:
    """
    Deterministic question generator.

    Usage:
        gen = QuestionGenerator(seed=2025)
        paper = gen.generate(node_ids=["c4_cs_001","c4_cs_002","c4_cs_003"])
        print(paper.render())
    """

    def __init__(self, seed: int = 2025):
        self._master_rng = random.Random(seed)
        self._node_seeds: Dict[str, int] = {}

    # ── public API ──────────────────────────────────────────────────────────

    def generate(
        self,
        node_ids: Optional[List[str]] = None,
        questions_per_node: int = 8,
    ) -> GeneratedPaper:
        """
        Generate a question paper.

        Args:
            node_ids: list of node IDs to include (None → all 3).
            questions_per_node: max questions per node (solver decides exact count).

        Returns:
            GeneratedPaper with sections and full step-by-step solutions.
        """
        if node_ids is None:
            node_ids = ["c4_cs_001", "c4_cs_002", "c4_cs_003"]

        solver_map = {
            "c4_cs_001": solve_node_001,
            "c4_cs_002": solve_node_002,
            "c4_cs_003": solve_node_003,
        }

        sections: List[Dict] = []
        all_answers: List[str] = []

        for nid in node_ids:
            if nid not in solver_map:
                raise ValueError(f"Unknown node: {nid}")

            seed = self._get_node_seed(nid)
            qset = solver_map[nid](seed=seed, q_per_type=max(1, questions_per_node // 4))
            meta = _TOPIC_META.get(nid, {})

            # Pick at most questions_per_node questions (random subset for variety)
            r = random.Random(seed + 999)
            selected = r.sample(qset.questions, min(len(qset.questions), questions_per_node))

            heading = f"Section {len(sections)+1}: {meta.get('icon','')} {meta.get('title', nid)}"
            sections.append({
                "heading": heading,
                "node_id": nid,
                "questions": selected,
            })
            for q in selected:
                all_answers.append(f"[{nid}] {q.answer}")

        return GeneratedPaper(
            title="Computer Studies — Class 4 Practice Paper",
            sections=sections,
        )

    def generate_with_solutions(self, **kwargs) -> Tuple[GeneratedPaper, List[Dict]]:
        """
        Like generate() but also returns the full solved dicts.
        """
        paper = self.generate(**kwargs)
        solutions = []
        for sec in paper.sections:
            for q in sec["questions"]:
                solutions.append(q.as_dict())
        return paper, solutions

    def get_node_info(self, node_id: str) -> Dict:
        """Return metadata for a node."""
        return _TOPIC_META.get(node_id, {})

    def list_nodes(self) -> List[str]:
        """Return all available node IDs."""
        return list(_TOPIC_META.keys())

    # ── internal ─────────────────────────────────────────────────────────────

    def _get_node_seed(self, node_id: str) -> int:
        if node_id not in self._node_seeds:
            self._node_seeds[node_id] = self._master_rng.randint(0, 9999)
        return self._node_seeds[node_id]


# ──────────────────────────────────────────────
#  CONVENIENCE FUNCTIONS  (Indian / ICSE context)
# ──────────────────────────────────────────────

def generate_icse_paper(seed: int = 2025) -> str:
    """
    Produce a paper with ICSE-format instructions and mark allocation.
    50 % standard + 50 % Indian context.
    """
    gen = QuestionGenerator(seed=seed)
    paper = gen.generate(questions_per_node=6)

    header = textwrap.dedent(f"""\
    ╔══════════════════════════════════════════════════════════════╗
    ║   COMPUTER STUDIES — CLASS 4   |   TIME: 45 minutes        ║
    ║   ICSE / CISCE Curriculum   |   Max Marks: 30              ║
    ╚══════════════════════════════════════════════════════════════╝

    Instructions:
      1. All questions are compulsory.
      2. Write your answers in the space provided.
      3. Show your working for all calculation questions.
      4. Each question carries marks as indicated.
    """)

    body_lines = [header]
    marks_per_section = 10
    total_q = sum(len(s["questions"]) for s in paper.sections)

    for sec in paper.sections:
        body_lines.append(f"\n{'='*60}")
        body_lines.append(sec["heading"])
        body_lines.append(f"Marks: {marks_per_section}")
        body_lines.append(f"{'='*60}")
        for i, q in enumerate(sec["questions"], 1):
            m = 2 if len(q.step_by_step) <= 4 else 3
            body_lines.append(f"\n  Q{i}.  [{m} marks]")
            body_lines.append(f"  {q.question}")
            if q.options:
                for opt in q.options:
                    body_lines.append(f"       {opt}")

    body_lines.append(f"\n\n{'='*60}")
    body_lines.append("  MARKING SCHEME (for teacher use)")
    body_lines.append(f"{'='*60}")
    for sec in paper.sections:
        body_lines.append(f"\n{sec['heading']}")
        for i, q in enumerate(sec["questions"], 1):
            body_lines.append(f"  Q{i}. Ans: {q.answer}")

    return "\n".join(body_lines)


def generate_worksheet(node_id: str, seed: int = 2025) -> str:
    """
    Generate a single-topic worksheet with step-by-step solutions included.
    """
    gen = QuestionGenerator(seed=seed)
    meta = gen.get_node_info(node_id)

    solver_fn = {
        "c4_cs_001": solve_node_001,
        "c4_cs_002": solve_node_002,
        "c4_cs_003": solve_node_003,
    }.get(node_id)
    if solver_fn is None:
        return f"Error: Unknown node '{node_id}'"

    node_seed = gen._get_node_seed(node_id)
    qset = solver_fn(seed=node_seed, q_per_type=2)

    lines = [
        f"{'='*65}",
        f"  WORKSHEET: {meta.get('icon','📝')} {meta.get('title', node_id)}",
        f"  Class 4  |  Computer Studies  |  ICSE Curriculum",
        f"{'='*65}",
        "\n  Learning Objectives:",
    ]
    for obj in meta.get("learning_objectives", []):
        lines.append(f"    • {obj}")

    lines.append(f"\n{'─'*65}")
    lines.append("  QUESTIONS")
    lines.append(f"{'─'*65}")

    for i, q in enumerate(qset.questions, 1):
        lines.append(f"\n  Q{i}. {q.question}")
        if q.options:
            for opt in q.options:
                lines.append(f"       {opt}")

    lines.append(f"\n\n{'='*65}")
    lines.append("  STEP-BY-STEP SOLUTIONS")
    lines.append(f"{'='*65}")

    for i, q in enumerate(qset.questions, 1):
        lines.append(f"\n  Q{i}.")
        for step in q.step_by_step:
            lines.append(f"    {step}")
        lines.append(f"  ✓ Verified: {q.verification}")
        lines.append(f"  ✔ Answer: {q.answer}")

    return "\n".join(lines)


# ──────────────────────────────────────────────
#  CLI
# ──────────────────────────────────────────────

if __name__ == "__main__":
    import sys

    print("\n" + "═"*65)
    print("  Class 4 Computer Studies — Question Generator")
    print("═"*65)

    # Full paper
    print("\n📄 Generating full practice paper…")
    gen = QuestionGenerator(seed=2025)
    paper = gen.generate(questions_per_node=6)
    print(paper.render())

    # Node-specific worksheets
    for nid in ["c4_cs_001", "c4_cs_002", "c4_cs_003"]:
        print(f"\n\n{'─'*65}")
        print(f"  WORKSHEET: {nid}")
        print(f"{'─'*65}")
        print(generate_worksheet(nid, seed=2025))

    # ICSE-formatted paper
    print("\n\n" + "═"*65)
    print("  ICSE FORMAT PAPER")
    print("═"*65)
    print(generate_icse_paper(seed=2025))