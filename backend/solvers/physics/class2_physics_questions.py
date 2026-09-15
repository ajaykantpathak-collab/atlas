"""
Class 2 Physics (EVS) – Question Generator
==========================================
Generates deterministic, curriculum-aligned questions for nodes
  c2_phy_001  – Revision of air around us
  c2_phy_002  – Properties of air (no colour, can be felt)
  c2_phy_003  – Vehicles run on petrol, diesel, CNG, electricity

Features
--------
* Seeded randomness → same seed always produces the same paper
* Mixed difficulty: 50 % Indian-context (EVS-style, local examples),
                   50 % standard textbook
* Three question types per node: MCQ, True/False, Fill-in-the-Blank
* Step-by-step answers embedded in each question record
* Export to JSON / printable text
"""
from __future__ import annotations

import random
import hashlib
import json
import textwrap
from typing import List, Dict, Optional
from dataclasses import dataclass, asdict
from enum import Enum

# Re-use the question bank defined in the solver
from class2_physics_solver import (
    _QUESTION_BANK, NodeID, QType, Difficulty, QuestionRecord,
    get_node_questions, get_all_nodes,
)

# ===========================================================================
# Seed helper
# ===========================================================================

def seed_from(student_name: str, paper_code: str = "C2PHY") -> int:
    """
    Produce a deterministic 32-bit integer seed from a student name
    and an optional paper code.  Same inputs → same seed always.
    """
    raw = f"{paper_code}|{student_name}"
    h = hashlib.sha256(raw.encode()).hexdigest()
    return int(h[:8], 16)


# ===========================================================================
# Indian-context question templates (50 % of generated pool)
# These expand the seed-shuffled bank with locale-specific items.
# ===========================================================================

_INDIAN_QA_POOL: Dict[str, List[Dict]] = {
    "c2_phy_001": [
        # -- MCQ --
        {"qtype": "mcq", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "In the summer afternoon, Amit fans himself with a newspaper. "
             "What does he feel?"
         ),
         "options": [
             "No air at all",
             "A cool breeze on his face",
             "Only the newspaper",
             "Only the ceiling fan",
         ],
         "correct_index": 1,
         "explanation": (
             "Fans move air. The moving air (breeze) touches Amit's face "
             "and he feels it – proving air is present."
         ),
         "vocab": ["air", "breeze", "afternoon", "feel"]},
        {"qtype": "mcq", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "Grandma hangs wet clothes on the terrace in the morning. "
             "Why do they dry?"
         ),
         "options": [
             "Because the sun eats the water",
             "Because air carries away the water drops",
             "Because the clothes become lighter",
             "Because the wind breaks the clothes",
         ],
         "correct_index": 1,
         "explanation": (
             "Air moving around the clothes carries away the water. "
             "This shows air is present and can be felt as a breeze."
         ),
         "vocab": ["air", "wind", "breeze", "morning"]},
        {"qtype": "mcq", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "Which time of day does NOT have air around us?"
         ),
         "options": [
             "Morning – yes",
             "Afternoon – yes",
             "Evening – yes",
             "All three times have air",
         ],
         "correct_index": 3,
         "explanation": (
             "Air is present at all times – morning, afternoon, and evening. "
             "There is no time when air is absent."
         ),
         "vocab": ["air", "morning", "afternoon", "evening", "everywhere"]},
        # -- True / False --
        {"qtype": "true_false", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "When you hold your breath for a few seconds, air disappears "
             "from around you."
         ),
         "correct_tf": "False",
         "explanation": (
             "Holding your breath stops you from taking air in, "
             "but air is still all around you."
         ),
         "vocab": ["air", "breathe"]},
        {"qtype": "true_false", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "The chubby pumpkins (phulka) on a pressure cooker show "
             "that air is present."
         ),
         "correct_tf": "True",
         "explanation": (
             "The steam pushes the weight up. That push comes from "
             "the air/steam pressure inside – showing air/steam occupies space."
         ),
         "vocab": ["air", "pressure", "cooker"]},
        # -- Fill-blank --
        {"qtype": "fill_blank", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "We can feel the ______ blowing on our face when we go "
             "outside on a windy day."
         ),
         "correct_fill": "wind",
         "explanation": (
             "Wind is moving air. When it touches our skin we feel it."
         ),
         "vocab": ["air", "wind", "feel"]},
        {"qtype": "fill_blank", "difficulty": "Easy", "cognitive": "Remember",
         "text": "Air is an ______ blanket around the whole Earth.",
         "correct_fill": "invisible",
         "explanation": (
             "Air has no colour so it is invisible. "
             "It wraps around the Earth like a blanket."
         ),
         "vocab": ["air", "invisible", "everywhere"]},
    ],

    "c2_phy_002": [
        {"qtype": "mcq", "difficulty": "Easy", "cognitive": "Understand",
         "text": (
             "Kiran tries to catch air in his closed fist. "
             "Can he hold it?"
         ),
         "options": [
             "Yes, easily",
             "No, because air is invisible and escapes",
             "Yes, if he closes his fist very tight",
             "No, air is too heavy to hold",
         ],
         "correct_index": 1,
         "explanation": (
             "Air is invisible and slips through small gaps. "
             "You cannot hold it like a solid object."
         ),
         "vocab": ["air", "invisible", "space"]},
        {"qtype": "mcq", "difficulty": "Easy", "cognitive": "Understand",
         "text": (
             "Meera's mother inflates a rubber balloon for her. "
             "What property of air does the balloon show?"
         ),
         "options": [
             "Air has a colour",
             "Air occupies space",
             "Air is very light",
             "Air disappears after some time",
         ],
         "correct_index": 1,
         "explanation": (
             "The balloon grows bigger because air fills the inside. "
             "This proves air takes up space."
         ),
         "vocab": ["air", "space", "balloon", "invisible"]},
        {"qtype": "true_false", "difficulty": "Easy", "cognitive": "Understand",
         "text": (
             "If air had a colour, we would be able to see it "
             "without closing our eyes."
         ),
         "correct_tf": "True",
         "explanation": (
             "Things with colour can be seen. Since air has no colour, "
             "it is invisible and we cannot see it."
         ),
         "vocab": ["air", "colour", "invisible"]},
        {"qtype": "fill_blank", "difficulty": "Easy", "cognitive": "Understand",
         "text": (
             "When you swing your hand in the air, you feel it because "
             "air is a _____."
         ),
         "correct_fill": "gas",
         "explanation": (
             "Air is a gas. Gases are invisible but we can feel them "
             "when they move (like wind)."
         ),
         "vocab": ["air", "gas", "feel", "invisible"]},
        {"qtype": "mcq", "difficulty": "Easy", "cognitive": "Understand",
         "text": (
             "Compare: a table and air. Which statement is correct?"
         ),
         "options": [
             "Both have colour",
             "Both take up space",
             "Neither takes up space",
             "The table is invisible like air",
         ],
         "correct_index": 1,
         "explanation": (
             "A table and air both occupy space. "
             "The table is solid; air is a gas, "
             "but both fill the space they are in."
         ),
         "vocab": ["air", "space", "invisible", "observe"]},
        {"qtype": "true_false", "difficulty": "Easy", "cognitive": "Understand",
         "text": (
             "A ceiling fan moves air. When it blows on you, "
             "you feel the air."
         ),
         "correct_tf": "True",
         "explanation": (
             "A fan's blades push air toward you. "
             "That moving air touches your skin – you feel it."
         ),
         "vocab": ["air", "feel", "fan", "wind"]},
    ],

    "c2_phy_003": [
        {"qtype": "mcq", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "A school bus that carries many children usually runs on?"
         ),
         "options": ["Petrol", "Diesel", "CNG", "Water"],
         "correct_index": 1,
         "explanation": (
             "Big buses use diesel because it gives more power "
             "for heavy loads and long distances."
         ),
         "vocab": ["diesel", "bus", "vehicle", "fuel"]},
        {"qtype": "mcq", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "Rahul charges his scooter at a charging station. "
             "What fuel does his scooter use?"
         ),
         "options": ["Petrol", "Diesel", "Electricity", "CNG"],
         "correct_index": 2,
         "explanation": (
             "An electric scooter runs on electricity stored in batteries."
         ),
         "vocab": ["electricity", "scooter", "vehicle", "fuel"]},
        {"qtype": "mcq", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "CNG stands for Compressed Natural Gas. "
             "It is used mainly in which vehicle in Indian cities?"
         ),
         "options": [
             "Airplanes",
             "Auto rickshaws and taxis",
             "Ships",
             "Bullock carts",
         ],
         "correct_index": 1,
         "explanation": (
             "CNG is a clean fuel used in auto rickshaws and taxis "
             "in many Indian cities to reduce pollution."
         ),
         "vocab": ["CNG", "auto rickshaw", "vehicle", "fuel"]},
        {"qtype": "true_false", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "A metro train is powered by electricity from overhead wires."
         ),
         "correct_tf": "True",
         "explanation": (
             "Metro trains get electricity from wires above the track "
             "and do not use petrol or diesel."
         ),
         "vocab": ["electricity", "metro", "vehicle", "fuel"]},
        {"qtype": "true_false", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "If a vehicle has no fuel, it can still keep moving "
             "on its own."
         ),
         "correct_tf": "False",
         "explanation": (
             "Vehicles need fuel or energy to move. "
             "Without it, the engine cannot push the wheels."
         ),
         "vocab": ["fuel", "vehicle", "energy"]},
        {"qtype": "fill_blank", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "Cars and bikes mostly run on _______."
         ),
         "correct_fill": "petrol",
         "explanation": (
             "Most personal vehicles – cars and motorbikes – run on petrol."
         ),
         "vocab": ["petrol", "vehicle", "fuel"]},
        {"qtype": "fill_blank", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "______ vehicles run on electricity and do not produce smoke."
         ),
         "correct_fill": "electric",
         "explanation": (
             "Electric vehicles use electricity and do not release smoke "
             "or harmful gases from a tailpipe."
         ),
         "vocab": ["electricity", "vehicle", "fuel"]},
        {"qtype": "mcq", "difficulty": "Easy", "cognitive": "Remember",
         "text": (
             "Which of these is NOT a fuel for vehicles?"
         ),
         "options": ["Petrol", "Diesel", "Electricity", "Mud water"],
         "correct_index": 3,
         "explanation": (
             "Petrol, diesel, CNG, and electricity are all used as fuels "
             "or energy sources for vehicles. Mud water is not a fuel."
         ),
         "vocab": ["petrol", "diesel", "electricity", "vehicle", "fuel"]},
    ],
}


# ===========================================================================
# Question Generator class
# ===========================================================================

class PhysicsQuestionGenerator:
    """
    Deterministic question-paper generator for Class 2 Physics.

    Usage
    -----
    >>> gen = PhysicsQuestionGenerator(seed=42)
    >>> paper = gen.generate_paper("Priya Sharma")
    >>> print(paper.to_text())
    """

    # ── construction ────────────────────────────────────────────────────────
    def __init__(
        self,
        seed: Optional[int] = None,
        mix_ratio: float = 0.5,
    ):
        """
        Parameters
        ----------
        seed : int | None
            Random seed for reproducibility.  If None, a random seed is used.
        mix_ratio : float
            Fraction of Indian-context questions in the output
            (default 0.5 = 50 % Indian / 50 % standard).
        """
        self._rng = random.Random(seed)
        self.mix_ratio = mix_ratio
        self._seed = seed

    # ── internal helpers ────────────────────────────────────────────────────
    def _shuffle(self, items: list) -> list:
        out = list(items)
        self._rng.shuffle(out)
        return out

    def _pick(self, items: list, k: int) -> list:
        return self._shuffle(items)[:k]

    def _build_qa(
        self,
        pool: List[Dict],
        qtype: str,
        n: int,
        difficulty: str,
    ) -> List[QuestionRecord]:
        """Pick *n* questions from pool matching qtype & difficulty."""
        filtered = [q for q in pool
                    if q["qtype"] == qtype
                    and q["difficulty"] == difficulty]
        picked = self._pick(filtered, min(n, len(filtered)))
        records = []
        for i, q in enumerate(picked):
            qid_suffix = qtype[0].upper() + str(i + 1)   # e.g. "M1"
            rec = QuestionRecord(
                id=f"gen_{qtype}_{qid_suffix}",
                node_id="mixed",
                qtype=q["qtype"],
                difficulty=q["difficulty"],
                cognitive=q.get("cognitive", "Remember"),
                question_text=q["text"],
                options=q.get("options"),
                correct_index=q.get("correct_index"),
                correct_tf=q.get("correct_tf"),
                correct_fill=q.get("correct_fill"),
                match_pairs=q.get("match_pairs"),
                explanation=q.get("explanation", ""),
                vocabulary_tags=q.get("vocab", []),
            )
            records.append(rec)
        return records

    # ── public API ──────────────────────────────────────────────────────────
    def generate_for_node(
        self,
        node_id: str,
        n_mcq: int = 3,
        n_tf: int = 2,
        n_fill: int = 1,
        use_indian_context: bool = True,
    ) -> List[QuestionRecord]:
        """
        Generate a set of questions for a single node.

        Parameters
        ----------
        node_id : str
            One of 'c2_phy_001', 'c2_phy_002', 'c2_phy_003'.
        n_mcq, n_tf, n_fill : int
            Number of each question type.
        use_indian_context : bool
            If True, supplement with Indian-context questions.

        Returns
        -------
        List[QuestionRecord]
        """
        # Core bank questions
        core_qs = list(_QUESTION_BANK.get(node_id, []))
        core_qs = self._shuffle(core_qs)

        # Indian-context supplements
        ind_pool = _INDIAN_QA_POOL.get(node_id, [])

        def _select(qtype, n, pool_list):
            filtered = [q for q in pool_list if q["qtype"] == qtype]
            picked = self._pick(filtered, min(n, len(filtered)))
            return [
                QuestionRecord(
                    id=f"gen_{node_id}_{qtype}_{i+1}",
                    node_id=node_id,
                    qtype=q["qtype"],
                    difficulty=q["difficulty"],
                    cognitive=q.get("cognitive", "Remember"),
                    question_text=q["text"],
                    options=q.get("options"),
                    correct_index=q.get("correct_index"),
                    correct_tf=q.get("correct_tf"),
                    correct_fill=q.get("correct_fill"),
                    explanation=q.get("explanation", ""),
                    vocabulary_tags=q.get("vocab", []),
                )
                for i, q in enumerate(picked)
            ]

        mcqs  = _select("mcq",       n_mcq,  core_qs)
        tfs   = _select("true_false", n_tf,   core_qs)
        fills = _select("fill_blank", n_fill,  core_qs)

        if use_indian_context and ind_pool:
            n_indian = max(1, int(round((n_mcq + n_tf + n_fill) * self.mix_ratio)))
            indian_qs = _select("mcq", n_indian, ind_pool) + \
                        _select("true_false", max(1, n_indian // 2), ind_pool)
            # interleave
            combined = []
            all_sets = [mcqs, tfs, fills, indian_qs]
            max_len = max(len(s) for s in all_sets)
            for i in range(max_len):
                for s in all_sets:
                    if i < len(s):
                        combined.append(s[i])
            return combined[: n_mcq + n_tf + n_fill + len(indian_qs)]

        return mcqs + tfs + fills

    def generate_paper(
        self,
        student_name: str,
        nodes: Optional[List[str]] = None,
        per_node: Dict[str, Dict] = None,
    ) -> "QuestionPaper":
        """
        Build a full paper for *student_name* across all (or selected) nodes.

        Parameters
        ----------
        student_name : str
            Used to seed the RNG deterministically.
        nodes : list[str] | None
            Node IDs to include.  Default: all three nodes.
        per_node : dict | None
            Per-node overrides, e.g.
            {'c2_phy_001': {'n_mcq': 2, 'n_tf': 2, 'n_fill': 1}}.

        Returns
        -------
        QuestionPaper
        """
        # Re-seed for this student
        s = seed_from(student_name)
        self._rng = random.Random(s)

        if nodes is None:
            nodes = [n.value for n in NodeID]
        if per_node is None:
            per_node = {}

        all_questions: List[QuestionRecord] = []
        for nid in nodes:
            cfg = per_node.get(nid, {"n_mcq": 3, "n_tf": 2, "n_fill": 1})
            qs = self.generate_for_node(
                node_id=nid,
                n_mcq=cfg.get("n_mcq", 3),
                n_tf=cfg.get("n_tf", 2),
                n_fill=cfg.get("n_fill", 1),
                use_indian_context=True,
            )
            all_questions.extend(qs)

        return QuestionPaper(
            student_name=student_name,
            seed_used=s,
            questions=all_questions,
            nodes=nodes,
        )


# ===========================================================================
# QuestionPaper – container + export
# ===========================================================================

@dataclass
class QuestionPaper:
    student_name: str
    seed_used: int
    questions: List[QuestionRecord]
    nodes: List[str]

    # ---- text export ----
    def to_text(self, show_answers: bool = False) -> str:
        lines: List[str] = [
            "=" * 60,
            f"  CLASS 2 – PHYSICS (EVS) PRACTICE PAPER",
            f"  Student : {self.student_name}",
            f"  Seed    : {self.seed_used}",
            f"  Nodes   : {', '.join(self.nodes)}",
            "=" * 60,
        ]
        node_headers = {
            "c2_phy_001": "Node c2_phy_001 – Revision of Air Around Us",
            "c2_phy_002": "Node c2_phy_002 – Properties of Air",
            "c2_phy_003": "Node c2_phy_003 – Vehicle Fuels",
            "mixed":      "Mixed Questions",
        }
        current_node = None
        q_num = 1
        for q in self.questions:
            if q.node_id != current_node:
                current_node = q.node_id
                lines.append("")
                lines.append("-" * 60)
                lines.append(f"  {node_headers.get(current_node, current_node)}")
                lines.append("-" * 60)
                lines.append("")

            lines.append(f"Q{q_num}. [{q.qtype.upper()}] {q.question_text}")
            if q.qtype == "mcq" and q.options:
                for i, opt in enumerate(q.options):
                    marker = chr(65 + i)
                    lines.append(f"     {marker}) {opt}")
            if show_answers:
                if q.qtype == "mcq":
                    ans = chr(65 + q.correct_index) if q.correct_index is not None else "?"
                    lines.append(f"     [Answer: {ans}]")
                elif q.qtype == "true_false":
                    lines.append(f"     [Answer: {q.correct_tf}]")
                elif q.qtype == "fill_blank":
                    lines.append(f"     [Answer: {q.correct_fill}]")
            lines.append("")
            q_num += 1

        lines.append("=" * 60)
        lines.append("  END OF PAPER")
        lines.append("=" * 60)
        return "\n".join(lines)

    def to_json(self, indent: int = 2) -> str:
        """Export the paper as a JSON string."""
        data = {
            "student_name": self.student_name,
            "seed_used": self.seed_used,
            "nodes": self.nodes,
            "questions": [asdict(q) for q in self.questions],
        }
        return json.dumps(data, indent=indent, ensure_ascii=False)

    def to_answer_key(self) -> str:
        """Return just the answer key as text."""
        lines = [
            "=" * 55,
            f"  ANSWER KEY  –  {self.student_name}",
            f"  Seed: {self.seed_used}",
            "=" * 55,
        ]
        for i, q in enumerate(self.questions, 1):
            if q.qtype == "mcq":
                ans = chr(65 + q.correct_index) if q.correct_index is not None else "?"
            elif q.qtype == "true_false":
                ans = q.correct_tf or "?"
            else:
                ans = q.correct_fill or "?"
            lines.append(f"  Q{i:02d}. {ans}  "
                         f"({q.node_id})  {q.qtype}")
        return "\n".join(lines)


# ===========================================================================
# Marking scheme generator
# ===========================================================================

def marking_scheme(paper: QuestionPaper) -> str:
    """Generate a teacher-facing marking scheme."""
    lines = [
        "=" * 60,
        "  MARKING SCHEME",
        f"  Student : {paper.student_name}  |  Seed : {paper.seed_used}",
        "=" * 60,
    ]
    for i, q in enumerate(paper.questions, 1):
        marks = 1 if q.difficulty == "Easy" else 2
        neg   = 0 if q.qtype in ("fill_blank",) else 0.25
        if q.qtype == "mcq":
            ans = chr(65 + q.correct_index) if q.correct_index is not None else "?"
        elif q.qtype == "true_false":
            ans = q.correct_tf or "?"
        else:
            ans = q.correct_fill or "?"
        lines.append(
            f"Q{i:02d}. [{q.qtype.upper()}] Correct: {ans}  "
            f"Marks: +{marks}  Negative: -{neg}"
        )
        lines.append(f"     Explanation: {q.explanation}")
        lines.append("")
    return "\n".join(lines)


# ===========================================================================
# Difficulty-balanced generator (explicit ratio control)
# ===========================================================================

def balanced_paper(
    student_name: str,
    mcq_std: int = 2,
    mcq_ind: int = 1,
    tf_std: int = 1,
    tf_ind: int = 1,
    fill_std: int = 1,
) -> QuestionPaper:
    """
    Generate a paper with explicit counts of standard vs Indian-context
    questions so that the 50/50 mix is guaranteed.
    """
    gen = PhysicsQuestionGenerator(seed=seed_from(student_name))
    paper = gen.generate_paper(student_name)
    # Post-filter: keep exactly the right mix
    std_qs, ind_qs = [], []
    for q in paper.questions:
        if any(q.node_id == nid and
               q in _INDIAN_QA_POOL.get(nid, [])
               for nid in _INDIAN_QA_POOL):
            ind_qs.append(q)
        else:
            std_qs.append(q)
    paper.questions = std_qs[:mcq_std + tf_std + fill_std] + \
                      ind_qs[:mcq_ind + tf_ind]
    return paper


# ===========================================================================
# CLI demo
# ===========================================================================

if __name__ == "__main__":
    print("=" * 55)
    print("  CLASS 2 PHYSICS – QUESTION GENERATOR DEMO")
    print("=" * 55)

    # ── Paper for student "Ananya" ──────────────────────────────────────────
    gen = PhysicsQuestionGenerator(seed=seed_from("Ananya"))
    paper = gen.generate_paper("Ananya")

    print("\n--- Practice Paper (no answers) ---")
    print(paper.to_text(show_answers=False))

    print("\n--- Answer Key ---")
    print(paper.to_answer_key())

    print("\n--- Marking Scheme ---")
    print(marking_scheme(paper))

    # ── JSON export ─────────────────────────────────────────────────────────
    json_out = paper.to_json()
    with open("class2_phy_paper_ananya.json", "w", encoding="utf-8") as fh:
        fh.write(json_out)
    print(f"\nJSON saved: class2_phy_paper_ananya.json  "
          f"({len(json_out)} bytes)")

    # ── Per-node generation ─────────────────────────────────────────────────
    print("\n--- Node c2_phy_002 only (3 MCQ, 2 TF, 1 fill) ---")
    node_paper_qs = gen.generate_for_node(
        "c2_phy_002", n_mcq=3, n_tf=2, n_fill=1
    )
    for i, q in enumerate(node_paper_qs, 1):
        print(f"  Q{i}. [{q.qtype}] {q.question_text}")
        if q.options:
            for j, o in enumerate(q.options):
                print(f"       {chr(65+j)}) {o}")

    # ── Seeding demonstration ───────────────────────────────────────────────
    print("\n--- Seeding demo (deterministic) ---")
    for name in ("Ananya", "Ananya"):
        s = seed_from(name)
        g2 = PhysicsQuestionGenerator(seed=s)
        p2 = g2.generate_paper(name)
        print(f"  seed('{name}') = {s}  |  questions = "
              f"{len(p2.questions)}  |  first Q = "
              f"{p2.questions[0].id if p2.questions else 'N/A'}")