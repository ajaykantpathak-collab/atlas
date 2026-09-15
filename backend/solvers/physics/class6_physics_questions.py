"""
Class 6 Physics — Question Generator
Nodes: c6_phy_001, c6_phy_002, c6_phy_003
Generates practice questions, worksheets, and exam-style papers.
50 % Indian competency (conceptual, real-world, multilingual) +
50 % standard board-format questions.
"""
from __future__ import annotations
import math, random, json, textwrap
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum
from class6_physics_solver import (
    solve, verify, Node001, Node002, Node003,
    QDetail, CheckResult, DEFAULT_SEED, make_rng,
)

# ══════════════════════════════════════════════════════════════════════════════
# Enums & helpers
# ══════════════════════════════════════════════════════════════════════════════
class Competency(Enum):
    BOARD  = "Board"
    SKILL  = "Skill"

class Difficulty(Enum):
    EASY   = "Easy"
    MEDIUM = "Medium"

class IndianContext(Enum):
    # real-world contexts Indian students relate to
    RUPEE_COINS   = "Rupee–paise coin conversion analogy"
    HAND_SPAN     = "Hand-span / haath (traditional unit)"
    RICE_GRAINS   = "Weighing rice on a traditional balance"
    MONSOON_THERMO= "Thermometer reading in summer/monsoon"
    ROPE_LENGTH    = "Rope / dori for measuring curved ground"
    MARKET_SCALE   = "Market shopkeeper's balance / electronic scale"

CONTEXT_POOL: List[IndianContext] = list(IndianContext)

# ── seed helper ───────────────────────────────────────────────────────────────
def seed_rng(seed: int = DEFAULT_SEED) -> random.Random:
    return random.Random(seed)

# ══════════════════════════════════════════════════════════════════════════════
# Question bank — each entry is a *template* that gets randomised on generate
# ══════════════════════════════════════════════════════════════════════════════
# Format: (node_id, method_key, competency, difficulty, context_enum, weight)
QUESTION_TEMPLATES: List[Tuple] = [
    # ── NODE 001 ──────────────────────────────────────────────────────────
    ("c6_phy_001", "si_unit",            Competency.BOARD, Difficulty.EASY,
     IndianContext.RUPEE_COINS,         1),
    ("c6_phy_001", "term_definition",    Competency.BOARD, Difficulty.EASY,
     IndianContext.HAND_SPAN,           1),
    ("c6_phy_001", "need_standard",      Competency.SKILL, Difficulty.EASY,
     IndianContext.HAND_SPAN,           1),
    ("c6_phy_001", "si_unit",            Competency.BOARD, Difficulty.EASY,
     IndianContext.RUPEE_COINS,         1),
    # ── NODE 002 ──────────────────────────────────────────────────────────
    ("c6_phy_002", "unit_conversion",    Competency.BOARD, Difficulty.EASY,
     IndianContext.RICE_GRAINS,         1),
    ("c6_phy_002", "addition",           Competency.SKILL, Difficulty.EASY,
     IndianContext.ROPE_LENGTH,         1),
    ("c6_phy_002", "curved_line",        Competency.SKILL, Difficulty.EASY,
     IndianContext.ROPE_LENGTH,         1),
    ("c6_phy_002", "unit_conversion",    Competency.BOARD, Difficulty.EASY,
     IndianContext.MARKET_SCALE,       1),
    # ── NODE 003 ──────────────────────────────────────────────────────────
    ("c6_phy_003", "beam_balance",       Competency.BOARD, Difficulty.EASY,
     IndianContext.RICE_GRAINS,         1),
    ("c6_phy_003", "mass_conversion",    Competency.BOARD, Difficulty.EASY,
     IndianContext.RUPEE_COINS,         1),
    ("c6_phy_003", "compare_instruments",Competency.SKILL, Difficulty.EASY,
     IndianContext.MARKET_SCALE,       1),
    ("c6_phy_003", "beam_balance",       Competency.SKILL, Difficulty.EASY,
     IndianContext.RICE_GRAINS,        1),
]

# ══════════════════════════════════════════════════════════════════════════════
# Wrapper dataclass for generated questions
# ══════════════════════════════════════════════════════════════════════════════
@dataclass
class Question:
    id: str
    node: str
    competency: str
    difficulty: str
    context: str
    subtype: str
    prompt: str
    answer: str
    explanation: str
    steps: List[str]
    user_answer_blank: str = ""   # filled by the learner
    is_correct: Optional[bool] = None

    def as_dict(self) -> Dict:
        return {
            "id": self.id, "node": self.node,
            "competency": self.competency, "difficulty": self.difficulty,
            "context": self.context, "subtype": self.subtype,
            "prompt": self.prompt,
            "answer": self.answer, "explanation": self.explanation,
            "steps": self.steps,
            "user_answer": self.user_answer_blank,
            "is_correct": self.is_correct,
        }

# ══════════════════════════════════════════════════════════════════════════════
# Generator class
# ══════════════════════════════════════════════════════════════════════════════
class QuestionGenerator:
    def __init__(self, seed: int = DEFAULT_SEED):
        self.rng = seed_rng(seed)
        self._counter = 0

    def _next_id(self, node: str) -> str:
        self._counter += 1
        return f"{node}_Q{self._counter:03d}"

    def _shuffle_templates(self, templates: List[Tuple]) -> List[Tuple]:
        lst = list(templates)
        self.rng.shuffle(lst)
        return lst

    # ── public API ─────────────────────────────────────────────────────────
    def generate(self, node_id: Optional[str] = None,
                 competency: Optional[Competency] = None,
                 difficulty: Optional[Difficulty] = None,
                 n: int = 5, seed: Optional[int] = None) -> List[Question]:
        """
        Generate n random questions, optionally filtered by node/competency/
        difficulty.

        Parameters
        ----------
        node_id      : c6_phy_001 | c6_phy_002 | c6_phy_003 | None (all)
        competency   : Competency.BOARD | Competency.SKILL | None (all)
        difficulty   : Difficulty.EASY | Difficulty.MEDIUM | None (all)
        n            : number of questions to return
        seed         : optional seed override for this call
        """
        if seed is not None:
            self.rng = seed_rng(seed)

        pool = list(QUESTION_TEMPLATES)
        if node_id:
            pool = [t for t in pool if t[0] == node_id]
        if competency:
            pool = [t for t in pool if t[2] == competency]
        if difficulty:
            pool = [t for t in pool if t[3] == difficulty]

        if not pool:
            raise ValueError("No templates match the given filters.")

        shuffled = self._shuffle_templates(pool)

        # extend pool if n > len(pool)
        extended = (shuffled * ((n // len(shuffled)) + 1))[:n]

        questions: List[Question] = []
        for (nid, method, comp, diff, ctx, wt) in extended:
            # call solver with a unique per-question seed
            qseed = self.rng.randint(0, 999_999)
            detail = solve(nid, method, seed=qseed)

            q = Question(
                id       = self._next_id(nid),
                node     = nid,
                competency= comp.value,
                difficulty= diff.value,
                context  = ctx.value,
                subtype  = detail.subtype,
                prompt   = detail.prompt,
                answer   = detail.answer,
                explanation= detail.explanation,
                steps    = detail.steps,
            )
            questions.append(q)

        return questions

    def generate_worksheet(self, nodes: Optional[List[str]] = None,
                           questions_per_node: int = 3,
                           title: str = "Class 6 Physics — Worksheet",
                           seed: Optional[int] = None) -> str:
        """
        Produce a printable worksheet (markdown text).
        """
        if seed is not None:
            self.rng = seed_rng(seed)

        if nodes is None:
            nodes = ["c6_phy_001","c6_phy_002","c6_phy_003"]

        lines: List[str] = []
        lines.append(f"# {title}\n")
        lines.append(
            f"**Syllabus:** Physical Quantities & Measurement  "
            f"| **Class:** 6 | **Subject:** Physics\n"
        )
        lines.append("---\n")

        grand_q = 0
        answer_key_lines: List[str] = ["## Answer Key\n"]

        for node in nodes:
            node_labels = {
                "c6_phy_001": "Physical Quantities & Units",
                "c6_phy_002": "Measurement of Length",
                "c6_phy_003": "Measurement of Mass",
            }
            lines.append(f"### Section: {node_labels.get(node, node)}\n")
            answer_key_lines.append(f"#### {node_labels.get(node, node)}\n")

            qs = self.generate(node_id=node, n=questions_per_node)
            for qi, q in enumerate(qs, 1):
                grand_q += 1
                lines.append(f"**Q{grand_q}.** [{q.competency} | {q.difficulty}] "
                             f"*({q.context})*\n\n{q.prompt}\n\n")
                lines.append("> **Your answer:**\n>\n```\n\n```\n\n")
                answer_key_lines.append(f"**Q{grand_q}.**\n\n")
                answer_key_lines.append(f"> **Answer:** {q.answer}\n\n")
                answer_key_lines.append(f"> **Explanation:** {q.explanation}\n\n")
                answer_key_lines.append("> **Steps:**\n")
                for step in q.steps:
                    answer_key_lines.append(f"> - {step}\n\n")

            lines.append("---\n")

        lines.append("\n")
        lines.extend(answer_key_lines)
        return "\n".join(lines)

    def generate_mcq(self, node_id: str, n: int = 5,
                     seed: Optional[int] = None) -> List[Dict]:
        """
        Generate multiple-choice questions (A/B/C/D) for the given node.
        Indian-context distractors included.
        """
        if seed is not None:
            self.rng = seed_rng(seed)

        mcqs: List[Dict] = []
        if node_id == "c6_phy_001":
            mcqs = self._mcq_001(n)
        elif node_id == "c6_phy_002":
            mcqs = self._mcq_002(n)
        elif node_id == "c6_phy_003":
            mcqs = self._mcq_003(n)
        else:
            raise ValueError(f"No MCQ bank for node '{node_id}'.")
        return mcqs

    # ── MCQ helpers ─────────────────────────────────────────────────────────
    def _mcq_001(self, n: int) -> List[Dict]:
        templates = [
            {
                "question": "Which of the following is the SI unit of mass?",
                "correct": "kilogram (kg)",
                "options": ["gram (g)", "kilogram (kg)", "pound (lb)", "quintal"],
                "concept": "SI unit of mass",
            },
            {
                "question": "Which of the following is NOT a basic physical quantity?",
                "correct": "Volume",
                "options": ["Length", "Mass", "Volume", "Time"],
                "concept": "Four basic quantities",
            },
            {
                "question": (
                    "Ravi measures a book with his hand-span and gets 4 spans. "
                    "His sister measures it and gets 3 spans. Which conclusion "
                    "is correct?"
                ),
                "correct": (
                    "Hand-span is not a standard unit; it varies with hand size."
                ),
                "options": [
                    "The book actually changed size.",
                    "Ravi's measurement is wrong.",
                    "Hand-span is not a standard unit; it varies with hand size.",
                    "The book has 3.5 spans.",
                ],
                "concept": "Need for standard units",
            },
            {
                "question": "What does a thermometer measure?",
                "correct": "Temperature",
                "options": ["Heat", "Temperature", "Length", "Mass"],
                "concept": "SI unit of temperature",
            },
            {
                "question": "The full form of SI is:",
                "correct": "International System of Units",
                "options": [
                    "Standard Indian unit",
                    "International System of Units",
                    "Indian Unit",
                    "Simple Integration",
                ],
                "concept": "Definition of SI",
            },
        ]
        selected = (templates * ((n // len(templates)) + 1))[:n]
        out: List[Dict] = []
        for i, t in enumerate(selected, 1):
            opts = t["options"][:]
            self.rng.shuffle(opts)
            out.append({
                "id":      f"c6_phy_001_MCQ{i:03d}",
                "node":    "c6_phy_001",
                "type":    "mcq",
                "question": t["question"],
                "options": {chr(65+j): o for j, o in enumerate(opts)},
                "correct_letter": next(
                    k for k,v in {chr(65+j): o for j,o in enumerate(opts)}.items()
                    if v == t["correct"]
                ),
                "correct": t["correct"],
                "concept": t["concept"],
            })
        return out

    def _mcq_002(self, n: int) -> List[Dict]:
        templates = [
            {
                "question": "1 km = _____ cm",
                "correct": "1,00,000",
                "options": ["100", "1,00,000", "10,000", "1,000"],
                "concept": "Unit conversion",
            },
            {
                "question": (
                    "The length of a curved garden path is best measured using:"
                ),
                "correct": "A thread laid along the curve",
                "options": [
                    "A rigid ruler directly",
                    "A thread laid along the curve",
                    "A measuring tape only",
                    "A weighing balance",
                ],
                "concept": "Curved line measurement",
            },
            {
                "question": "Which unit is the largest?",
                "correct": "Kilometre",
                "options": ["Millimetre", "Centimetre", "Metre", "Kilometre"],
                "concept": "Length units comparison",
            },
            {
                "question": (
                    "A cricket bat is about 1 ____ long. (Fill the best unit)"
                ),
                "correct": "metre",
                "options": ["millimetre", "centimetre", "metre", "kilometre"],
                "concept": "Appropriate unit selection",
            },
            {
                "question": "The smallest division on a typical school ruler is:",
                "correct": "1 mm",
                "options": ["1 cm", "1 mm", "0.5 cm", "2 mm"],
                "concept": "Least count of a ruler",
            },
        ]
        selected = (templates * ((n // len(templates)) + 1))[:n]
        out: List[Dict] = []
        for i, t in enumerate(selected, 1):
            opts = t["options"][:]
            self.rng.shuffle(opts)
            out.append({
                "id":      f"c6_phy_002_MCQ{i:03d}",
                "node":    "c6_phy_002",
                "type":    "mcq",
                "question": t["question"],
                "options": {chr(65+j): o for j, o in enumerate(opts)},
                "correct_letter": next(
                    k for k,v in {chr(65+j): o for j,o in enumerate(opts)}.items()
                    if v == t["correct"]
                ),
                "correct": t["correct"],
                "concept": t["concept"],
            })
        return out

    def _mcq_003(self, n: int) -> List[Dict]:
        templates = [
            {
                "question": (
                    "On a beam balance, an object is placed in the left pan "
                    "and standard masses in the right pan. The beam balances. "
                    "This means:"
                ),
                "correct": "Mass of object = total mass in right pan",
                "options": [
                    "Mass of object > total mass in right pan",
                    "Mass of object < total mass in right pan",
                    "Mass of object = total mass in right pan",
                    "Nothing can be concluded",
                ],
                "concept": "Beam balance principle",
            },
            {
                "question": "The SI unit of mass is:",
                "correct": "kilogram",
                "options": ["gram", "kilogram", "pound", "quintal"],
                "concept": "SI unit of mass",
            },
            {
                "question": (
                    "A shopkeeper uses an electronic balance to weigh 1 kg of "
                    "rice. The reading shows 1.00 kg. This balance measures:"
                ),
                "correct": "Mass (directly via strain gauge)",
                "options": [
                    "Weight only",
                    "Mass (directly via strain gauge)",
                    "Volume",
                    "Density",
                ],
                "concept": "Electronic balance principle",
            },
            {
                "question": "Which instrument would you use to measure 5 mg precisely?",
                "correct": "An analytical electronic balance",
                "options": [
                    "A beam balance",
                    "A ruler",
                    "An analytical electronic balance",
                    "A thermometer",
                ],
                "concept": "Appropriate instrument selection",
            },
            {
                "question": (
                    "1 kg = _____ g"
                ),
                "correct": "1000",
                "options": ["100", "1000", "10,000", "100,000"],
                "concept": "Mass unit conversion",
            },
        ]
        selected = (templates * ((n // len(templates)) + 1))[:n]
        out: List[Dict] = []
        for i, t in enumerate(selected, 1):
            opts = t["options"][:]
            self.rng.shuffle(opts)
            out.append({
                "id":      f"c6_phy_003_MCQ{i:03d}",
                "node":    "c6_phy_003",
                "type":    "mcq",
                "question": t["question"],
                "options": {chr(65+j): o for j, o in enumerate(opts)},
                "correct_letter": next(
                    k for k,v in {chr(65+j): o for j,o in enumerate(opts)}.items()
                    if v == t["correct"]
                ),
                "correct": t["correct"],
                "concept": t["concept"],
            })
        return out

    # ── numerical practice generator ────────────────────────────────────────
    def generate_numericals(self, node_id: str, n: int = 5,
                            seed: Optional[int] = None) -> List[Question]:
        """
        Generate fully worked numerical problems (long-answer type).
        """
        if seed is not None:
            self.rng = seed_rng(seed)

        qs: List[Question] = []
        methods = {
            "c6_phy_001": ["si_unit", "term_definition", "need_standard"],
            "c6_phy_002": ["unit_conversion", "addition", "curved_line"],
            "c6_phy_003": ["beam_balance", "mass_conversion",
                           "compare_instruments"],
        }[node_id]

        for i in range(n):
            m = methods[i % len(methods)]
            qseed = self.rng.randint(0, 999_999)
            d = solve(node_id, m, seed=qseed)
            qs.append(Question(
                id       = f"{node_id}_NUM{i+1:03d}",
                node     = node_id,
                competency="Board",
                difficulty="Easy",
                context  = "Numerical",
                subtype  = d.subtype,
                prompt   = d.prompt,
                answer   = d.answer,
                explanation= d.explanation,
                steps    = d.steps,
            ))
        return qs

# ══════════════════════════════════════════════════════════════════════════════
# Worksheet printer (pretty)
# ══════════════════════════════════════════════════════════════════════════════
def print_worksheet(worksheet_md: str, answers: bool = False):
    divider = "=" * 60
    for line in worksheet_md.splitlines():
        print(line)
    if answers:
        print(divider)
        print("  ANSWERS (revealed above in the worksheet)")

# ══════════════════════════════════════════════════════════════════════════════
# Exam paper generator (ICSE-style)
# ══════════════════════════════════════════════════════════════════════════════
class ExamPaper:
    """
    Generates a self-contained exam paper with:
    - Section A: MCQs (1 mark each)
    - Section B: Very Short Answer (1-2 marks)
    - Section C: Short Answer (3 marks)
    """
    def __init__(self, seed: int = DEFAULT_SEED):
        self.rng  = seed_rng(seed)
        self.gen  = QuestionGenerator(seed=seed)

    def generate(self, title: str = "Class 6 Physics — Formative Assessment",
                 total_marks: int = 10) -> str:
        lines: List[str] = []
        lines.append("=" * 60)
        lines.append(f"  {title}")
        lines.append(f"  Time: 45 min   Max Marks: {total_marks}")
        lines.append("=" * 60)
        lines.append("")

        # Section A — MCQ (4 × 1 mark = 4)
        lines.append("Section A — Multiple Choice Questions  [4 Marks]")
        lines.append("Choose the correct option. Each question carries 1 mark.\n")
        mcqs_001 = self.gen._mcq_001(2)
        mcqs_002 = self.gen._mcq_002(1)
        mcqs_003 = self.gen._mcq_003(1)
        all_mcqs = mcqs_001 + mcqs_002 + mcqs_003
        self.rng.shuffle(all_mcqs)
        for i, mcq in enumerate(all_mcqs[:4], 1):
            lines.append(f"Q{i}. {mcq['question']}")
            for letter, opt in mcq["options"].items():
                lines.append(f"   ({letter}) {opt}")
            lines.append("")

        # Section B — Very Short Answer (3 × 1 mark = 3)
        lines.append("Section B — Very Short Answer Questions  [3 Marks]")
        lines.append("Answer in one sentence or one word.\n")
        vsa_prompts = [
            ("c6_phy_001", "si_unit", "What is the SI unit of length?"),
            ("c6_phy_001", "term_definition",
             "Define 'physical quantity' in one line."),
            ("c6_phy_002", "unit_conversion",
             "How many centimetres are in 1 metre?"),
            ("c6_phy_003", "mass_conversion",
             "How many grams are in 1 kilogram?"),
        ]
        vsa_sel = vsa_prompts[:3]
        for i, (nid, mth, prompt) in enumerate(vsa_sel, 1):
            lines.append(f"Q{i+4}. {prompt}\n")

        # Section C — Short Answer (1 × 3 marks = 3)
        lines.append("Section C — Short Answer Question  [3 Marks]")
        lines.append("Explain with an example.\n")
        detail = solve("c6_phy_001", "need_standard", seed=self.rng.randint(0,999))
        lines.append(f"Q7. {detail.prompt}\n")
        lines.append("_" * 60 + "\n")

        # Answer key (hidden after the divider)
        lines.append("\n\n")
        lines.append("=" * 60)
        lines.append("  ANSWER KEY  (for teacher use only)")
        lines.append("=" * 60)
        for i, mcq in enumerate(all_mcqs[:4], 1):
            lines.append(
                f"Q{i}.  Ans: ({mcq['correct_letter']}) {mcq['correct']}"
            )
        for i, (nid, mth, _) in enumerate(vsa_sel, 1):
            d = solve(nid, mth, seed=self.rng.randint(0,999))
            lines.append(f"Q{i+4}.  Ans: {d.answer}")
        lines.append(f"Q7.  Ans: {detail.answer}")

        return "\n".join(lines)

# ══════════════════════════════════════════════════════════════════════════════
# Public API
# ══════════════════════════════════════════════════════════════════════════════
__all__ = [
    "QuestionGenerator", "ExamPaper",
    "Question", "Competency", "Difficulty", "IndianContext",
    "generate", "generate_worksheet", "generate_mcq", "generate_exam",
]

def generate(node_id: Optional[str]   = None,
             competency: Optional[str]  = None,
             difficulty: Optional[str]  = None,
             n: int                     = 5,
             seed: int                  = DEFAULT_SEED) -> List[Question]:
    comp_map   = {c.value: c for c in Competency}
    diff_map   = {d.value: d for d in Difficulty}
    gen = QuestionGenerator(seed=seed)
    return gen.generate(
        node_id    = node_id,
        competency = comp_map.get(competency) if competency else None,
        difficulty = diff_map.get(difficulty) if difficulty else None,
        n          = n,
    )

def generate_worksheet(nodes: Optional[List[str]]  = None,
                       questions_per_node: int      = 3,
                       title: str                   = "Class 6 Physics — Worksheet",
                       seed: int                    = DEFAULT_SEED) -> str:
    gen = QuestionGenerator(seed=seed)
    return gen.generate_worksheet(
        nodes=nodes, questions_per_node=questions_per_node, title=title
    )

def generate_mcq(node_id: str, n: int = 5,
                 seed: int = DEFAULT_SEED) -> List[Dict]:
    gen = QuestionGenerator(seed=seed)
    return gen.generate_mcq(node_id, n)

def generate_exam(title: str = "Class 6 Physics — Formative Assessment",
                  total_marks: int = 10,
                  seed: int = DEFAULT_SEED) -> str:
    paper = ExamPaper(seed=seed)
    return paper.generate(title, total_marks)

# ══════════════════════════════════════════════════════════════════════════════
# Demo
# ══════════════════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    print("=" * 60)
    print("  CLASS 6 PHYSICS — QUESTION GENERATOR DEMO")
    print("=" * 60)

    # 1. Random questions across all nodes
    print("\n── 1. Random questions (all nodes, n=3) ──")
    for q in generate(n=3, seed=101):
        print(f"\n[{q.node} | {q.subtype}] {q.difficulty} | {q.context}")
        print(f"  Q: {q.prompt}")
        print(f"  A: {q.answer[:80]}...")

    # 2. MCQ for one node
    print("\n\n── 2. MCQs for c6_phy_001 ──")
    for mcq in generate_mcq("c6_phy_001", n=3, seed=202):
        print(f"\n{mcq['id']}: {mcq['question']}")
        for letter, opt in mcq["options"].items():
            mark = " ✓" if letter == mcq["correct_letter"] else ""
            print(f"   ({letter}) {opt}{mark}")

    # 3. Worksheet
    print("\n\n── 3. Worksheet preview (truncated) ──")
    ws = generate_worksheet(questions_per_node=2, seed=303)
    preview = "\n".join(ws.splitlines()[:30])
    print(preview)
    print("  ... [truncated] ...")

    # 4. Exam paper
    print("\n\n── 4. Exam paper ──")
    print(generate_exam(seed=404))

    # 5. Verification
    print("\n\n── 5. Verification examples ──")
    r1 = verify("c6_phy_002","unit_conversion", 120.0, 120.0, tol=0.5, unit="cm")
    print(f"  120 vs 120 cm  → {'✅' if r1.correct else '❌'} "
          f"(expected {r1.expected}, got {r1.got})")
    r2 = verify("c6_phy_002","unit_conversion", 130.0, 120.0, tol=0.5, unit="cm")
    print(f"  130 vs 120 cm  → {'✅' if r2.correct else '❌'} "
          f"(expected {r2.expected}, got {r2.got}, tol={r2.tolerance})")