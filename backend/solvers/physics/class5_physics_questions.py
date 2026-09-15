"""
Class 5 Physics — Question Generator Module
Covers: c5_phy_001, c5_phy_002, c5_phy_003
Uses: solver.py (imported) + inline generation for paper export
Author: Auto-generated | Deterministic | Seeded
"""

from __future__ import annotations

import random
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum

# ──────────────────────────────────────────────
#  RE-USE FROM SOLVER (avoid duplication)
# ──────────────────────────────────────────────

from physics.class5_physics_solver import (
    Question, Diff, QType, NodeID, VerificationResult,
    _make_seed, _shuffle_options, _build_options_text,
    OBJECT_SOUNDS, PLEASANT_SOUNDS, UNPLEASANT_SOUNDS, WARNING_SIGNALS,
    generate_question, verify_answer, generate_quiz, print_quiz,
    _gen_match_sound, _gen_identify_object, _gen_count_objects,
    _gen_classify_sound, _gen_give_example, _gen_why_pleasant,
    _gen_warning_signal, _gen_action_match, _gen_warning_vs_ordinary,
)

# ──────────────────────────────────────────────
#  PAPER / QUIZ EXPORT MODELS
# ──────────────────────────────────────────────

@dataclass
class QuizConfig:
    """Configuration for generating a printable quiz paper."""
    seed: int = 42
    nodes: Optional[List[str]] = None         # None → all three nodes
    per_node: int = 2                          # questions per node
    include_answers: bool = False              # True → answer key appended
    title: str = "Class 5 Physics — Practice Quiz"
    sub_title: str = "Topics: Sounds, Pleasant/Unpleasant Sounds, Warning Signals"


@dataclass
class PaperQuestion:
    number: int
    node: str
    topic: str
    question_text: str
    options: List[str]
    correct_option: str


# ──────────────────────────────────────────────
#  NODE METADATA
# ──────────────────────────────────────────────

_NODE_META: Dict[str, Dict] = {
    "c5_phy_001": {
        "topic":  "Sounds made by common objects",
        "icon":   "🔊",
        "skills": ["Name 5 sound-making objects", "Match sound → object", "Tell sounds apart"],
    },
    "c5_phy_002": {
        "topic":  "Pleasant and unpleasant sounds",
        "icon":   "🎵",
        "skills": ["Classify sound as pleasant/unpleasant", "Give examples", "Explain why"],
    },
    "c5_phy_003": {
        "topic":  "Sound as a warning signal",
        "icon":   "🚨",
        "skills": ["Name 2 warning signals", "Explain what each means", "Distinguish from ordinary sound"],
    },
}

# ──────────────────────────────────────────────
#  CORE GENERATOR
# ──────────────────────────────────────────────

def generate_paper(config: QuizConfig) -> Tuple[str, Optional[str]]:
    """
    Build a formatted question paper (and optional answer key).

    Returns
    -------
    (paper_text, answer_key_text | None)
    """
    if config.nodes is None:
        config.nodes = ["c5_phy_001", "c5_phy_002", "c5_phy_003"]

    rng = _make_seed("paper", config.seed)
    questions: List[PaperQuestion] = []
    answer_key_lines = []
    q_num = 1

    for node in config.nodes:
        meta = _NODE_META.get(node, {})
        topic = meta.get("topic", node)
        icon  = meta.get("icon", "📝")
        for _ in range(config.per_node):
            q = generate_question(node, seed=rng.randint(0, 99999))
            options_display = "\n".join(
                f"   ({chr(65+i)}) {opt}" for i, opt in enumerate(q.options)
            )
            questions.append(PaperQuestion(
                number   = q_num,
                node     = node,
                topic    = topic,
                question_text = q.question_text,
                options  = q.options,
                correct_option = q.options[q.correct_index],
            ))
            answer_key_lines.append(
                f"Q{q_num}: {chr(65+q.correct_index)} — {q.options[q.correct_index]}"
            )
            q_num += 1

    lines: List[str] = []
    lines.append("╔" + "═"*66 + "╗")
    lines.append(f"║  {config.title:<62}  ║")
    lines.append(f"║  {config.sub_title:<62}  ║")
    lines.append("╚" + "═"*66 + "╝")
    lines.append(f"\n  Seed        : {config.seed}")
    lines.append(f"  Total Qs    : {len(questions)}")
    lines.append(f"  Instructions: Circle the correct option letter.\n")

    current_node = None
    for pq in questions:
        if pq.node != current_node:
            current_node = pq.node
            meta = _NODE_META.get(current_node, {})
            lines.append(f"\n{'─'*68}")
            lines.append(f"  {meta.get('icon','📝')} {meta.get('topic', current_node).upper()}")
            lines.append(f"  Skills: {', '.join(meta.get('skills', []))}")
            lines.append(f"{'─'*68}\n")
        lines.append(f"Q{pq.number}. {pq.question_text}")
        lines.append("")

    paper_text = "\n".join(lines)

    answer_key: Optional[str] = None
    if config.include_answers:
        ak_lines = [
            "╔══════════════════════════════════════════════════════════╗",
            "║                  ANSWER KEY                              ║",
            "╚══════════════════════════════════════════════════════════╝",
            "",
            "  Fill this AFTER attempting the paper.\n",
        ]
        for ak in answer_key_lines:
            ak_lines.append(f"  {ak}")
        ak_lines.append("")
        answer_key = "\n".join(ak_lines)

    return paper_text, answer_key


# ──────────────────────────────────────────────
#  FORMAT HELPERS
# ──────────────────────────────────────────────

def format_explanation(q: Question, student_picked: int) -> str:
    """
    Build a step-by-step feedback string for a given student answer.

    Parameters
    ----------
    q           : the Question object
    student_picked: zero-based index the student chose

    Returns
    -------
    Multi-line feedback string
    """
    result = verify_answer(q, student_picked)
    status_icon = "✅" if result.is_correct else "❌"
    header = (
        f"\n{'═'*58}\n"
        f"  FEEDBACK for Q on [{q.node.upper()}]\n"
        f"{'═'*58}\n"
        f"  {status_icon}  Your answer : ({chr(65+student_picked)}) {result.user_choice}\n"
        f"  {'✓' if result.is_correct else '✗'}  Correct ans : ({chr(65+result.correct_index)}) {result.correct_choice}\n"
        f"{'─'*58}\n"
    )
    return header + result.explanation


def node_summary() -> str:
    """Return a human-readable summary of all covered nodes."""
    lines = ["\n╔══════════════════════════════════════════════════════════╗",
             "║          CLASS 5 PHYSICS — NODE SUMMARY                  ║",
             "╚══════════════════════════════════════════════════════════╝"]
    for nid, meta in _NODE_META.items():
        lines.append(f"\n  {meta['icon']} {nid.upper()}")
        lines.append(f"     Topic  : {meta['topic']}")
        lines.append(f"     Skills :")
        for s in meta['skills']:
            lines.append(f"       • {s}")
    return "\n".join(lines)


# ──────────────────────────────────────────────
#  INDIAN-CONTEXT QUESTION BANK (static extras)
# ──────────────────────────────────────────────

_INDIA_FACTS = {
    "c5_phy_001": [
        "The wall clock in your classroom ticks and tells the time for the whole school.",
        "The pressure cooker's whistle is a familiar sound in every Indian kitchen.",
        "A flute ( bansuri ) is a traditional Indian instrument — Lord Krishna is often shown playing it.",
        "Call bells are used in shops and hospitals so customers or patients can call for help.",
        "A school bell rings to signal the start and end of each class period.",
    ],
    "c5_phy_002": [
        "During Diwali, firecrackers make loud, unpleasant sounds that can scare birds and pets.",
        "A flute or shehnai played at an Indian wedding creates a pleasant, festive atmosphere.",
        "Birds chirping at sunrise near a village home is a very pleasant morning sound.",
        "A loud DJ playing at a wedding late at night can be unpleasant for neighbours trying to sleep.",
        "Bells in a temple ring with a calm, peaceful tone that many find pleasant.",
    ],
    "c5_phy_003": [
        "In Indian cities, fire alarms in malls and cinema halls help keep people safe.",
        "An ambulance siren has right of way — vehicles must move aside on Indian roads.",
        "Railway crossing bells warn people that a train is approaching — always stop and look!",
        "Tsunami warning sirens were installed along India's coastal areas after 2004.",
        "A school bell helps organise the day for lakhs of students across India.",
    ],
}


def get_india_fact(node: str) -> str:
    """Return a random Indian-context fact for the given node (seeded)."""
    rng = _make_seed("india_fact", node)
    return rng.choice(_INDIA_FACTS.get(node, ["No fact available."]))


# ──────────────────────────────────────────────
#  QUIZ STATS
# ──────────────────────────────────────────────

@dataclass
class QuizStats:
    total_questions: int = 0
    by_node: Dict[str, int] = field(default_factory=dict)
    by_type: Dict[str, int] = field(default_factory=dict)
    easy: int = 0
    medium: int = 0

    @classmethod
    def from_questions(cls, questions: List[Question]) -> "QuizStats":
        stats = cls()
        stats.total_questions = len(questions)
        for q in questions:
            stats.by_node[q.node] = stats.by_node.get(q.node, 0) + 1
            stats.by_type[q.qtype] = stats.by_type.get(q.qtype, 0) + 1
            if q.difficulty == Diff.EASY.value:
                stats.easy += 1
            else:
                stats.medium += 1
        return stats

    def __str__(self) -> str:
        parts = [
            f"  Total Questions : {self.total_questions}",
            f"  By Node         : {dict(self.by_node)}",
            f"  By Type         : {dict(self.by_type)}",
            f"  Easy            : {self.easy}",
            f"  Medium          : {self.medium}",
        ]
        return "\n".join(parts)


# ──────────────────────────────────────────────
#  FULL QUESTION GENERATOR PIPELINE
# ──────────────────────────────────────────────

def generate_full_set(seed: int = 2024) -> Dict[str, List[Question]]:
    """
    Generate a complete question set covering all sub-types for each node.

    Returns
    -------
    Dict[node_id] → List[Question]
    """
    rng = _make_seed("fullset", seed)
    result: Dict[str, List[Question]] = {}

    node_qtypes = {
        "c5_phy_001": ["match", "identify", "count"],
        "c5_phy_002": ["classify", "example", "why_pleasant"],
        "c5_phy_003": ["signal", "action", "distinguish"],
    }

    for node, qtypes in node_qtypes.items():
        questions: List[Question] = []
        for qtype in qtypes:
            q = generate_question(node, qtype=qtype, seed=rng.randint(0, 99999))
            questions.append(q)
        result[node] = questions

    return result


# ──────────────────────────────────────────────
#  STANDALONE DEMO
# ──────────────────────────────────────────────

if __name__ == "__main__":
    print(node_summary())

    print("\n\n══ Sample Paper (seed=77, 2 per node) ══")
    config = QuizConfig(seed=77, per_node=2, include_answers=True)
    paper, key = generate_paper(config)
    print(paper)
    if key:
        print(key)

    print("\n\n══ Full Question Set ══")
    full = generate_full_set(seed=99)
    all_qs = [q for qs in full.values() for q in qs]
    stats = QuizStats.from_questions(all_qs)
    print(stats)

    print("\n\n══ India Context Facts ══")
    for nid in ["c5_phy_001", "c5_phy_002", "c5_phy_003"]:
        print(f"  [{nid}] {get_india_fact(nid)}")