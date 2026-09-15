"""
Class 2 Chemistry — Question Generator
Nodes: c2_chem_001, c2_chem_002, c2_chem_003
Difficulty: Easy | Cognitive Level: Remember
"""

import random
from dataclasses import dataclass, field
from typing import List, Dict, Optional

from class2_chem_solver import (
    set_seed,
    ANSWER_KEY,
    QUESTION_META,
    NODES,
    evaluate_quiz,
    print_result,
    _MASTER_SEED,
)

# ═══════════════════════════════════════════════════════════════════════════════
#  Data model
# ═══════════════════════════════════════════════════════════════════════════════

@dataclass
class Question:
    """One atomic question ready for display or serialisation."""
    question_id:   str
    node_id:       str
    node_title:    str
    q_type:        str        # "mc" | "fb" | "tf"
    difficulty:    str
    text:          str
    choices:       List[str] = field(default_factory=list)   # MCQ only
    correct_answer: str      = ""                            # canonical
    hint:          str       = ""

    def to_dict(self) -> dict:
        d = {
            "id":           self.question_id,
            "node_id":      self.node_id,
            "node_title":   self.node_title,
            "type":         self.q_type,
            "difficulty":   self.difficulty,
            "question":     self.text,
            "correct":      self.correct_answer,
        }
        if self.choices:
            d["choices"] = self.choices
        if self.hint:
            d["hint"] = self.hint
        return d

# ═══════════════════════════════════════════════════════════════════════════════
#  Question bank  —  seeded RNG, completely deterministic given the seed
# ═══════════════════════════════════════════════════════════════════════════════

def _build_bank() -> Dict[str, List[Question]]:
    """
    Returns a dict keyed by node_id, each value being the full list of
    Question objects for that node.  Construction uses random.choice for
    distractors, but the bank itself is static (no side-effects on subsequent
    calls beyond the shuffle done in generate_quiz).
    """
    set_seed(_MASTER_SEED)          # ensure deterministic construction
    bank: Dict[str, List[Question]] = {}

    # ── Node 1: Storage of water ───────────────────────────────────────────────
    n1 = [
        # MCQ 1
        Question(
            question_id="c2_chem_001_mc_01",
            node_id="c2_chem_001",
            node_title=NODES["c2_chem_001"]["title"],
            q_type="mc", difficulty="Easy",
            text="Which of the following is the BEST thing to store drinking water in?",
            choices=["An open glass",
                     "A cloth only",
                     "A drum with a lid",
                     "A leaky bucket"],
            correct_answer="drum with lid",
            hint="Water stays clean when it is covered.",
        ),
        # MCQ 2
        Question(
            question_id="c2_chem_001_mc_02",
            node_id="c2_chem_001",
            node_title=NODES["c2_chem_001"]["title"],
            q_type="mc", difficulty="Easy",
            text="What do we put on top of a water pot to keep it clean?",
            choices=["A flower",
                     "A lid",
                     "A spoon",
                     "A napkin"],
            correct_answer="lid",
            hint="Think of what covers a container.",
        ),
        # FillBlank 1
        Question(
            question_id="c2_chem_001_fb_01",
            node_id="c2_chem_001",
            node_title=NODES["c2_chem_001"]["title"],
            q_type="fb", difficulty="Easy",
            text="We keep collected water in a pot, bucket or ______ so that it stays clean.",
            correct_answer="drum with lid",
            hint="It is a big container with a cover.",
        ),
        # FillBlank 2
        Question(
            question_id="c2_chem_001_fb_02",
            node_id="c2_chem_001",
            node_title=NODES["c2_chem_001"]["title"],
            q_type="fb", difficulty="Easy",
            text="We cover the water container with a ______ so dust and flies cannot enter.",
            correct_answer="lid",
            hint="It sits on top of the container.",
        ),
        # True/False 1
        Question(
            question_id="c2_chem_001_tf_01",
            node_id="c2_chem_001",
            node_title=NODES["c2_chem_001"]["title"],
            q_type="tf", difficulty="Easy",
            text="Covering stored water with a lid keeps it clean and safe.",
            correct_answer="True",
            hint="Think about dust and flies.",
        ),
    ]
    bank["c2_chem_001"] = n1

    # ── Node 2: Properties of water ────────────────────────────────────────────
    n2 = [
        Question(
            question_id="c2_chem_002_mc_01",
            node_id="c2_chem_002",
            node_title=NODES["c2_chem_002"]["title"],
            q_type="mc", difficulty="Easy",
            text="What is the colour of clean, pure water?",
            choices=["Blue", "Green", "Colourless", "White"],
            correct_answer="colourless",
            hint="Look through a clear glass of clean water — what do you see?",
        ),
        Question(
            question_id="c2_chem_002_mc_02",
            node_id="c2_chem_002",
            node_title=NODES["c2_chem_002"]["title"],
            q_type="mc", difficulty="Easy",
            text="Clean water has no smell. This property is called:",
            choices=["Tasteless", "Odourless", "Colourless", "Soft"],
            correct_answer="odourless",
            hint="'Odour' means smell. No smell = ?",
        ),
        Question(
            question_id="c2_chem_002_fb_01",
            node_id="c2_chem_002",
            node_title=NODES["c2_chem_002"]["title"],
            q_type="fb", difficulty="Easy",
            text=(
                "Clean water has three special properties — it is "
                "______, tasteless and odourless."
            ),
            correct_answer="colourless",
            hint="It has no colour of its own.",
        ),
        Question(
            question_id="c2_chem_002_fb_02",
            node_id="c2_chem_002",
            node_title=NODES["c2_chem_002"]["title"],
            q_type="fb", difficulty="Easy",
            text="If clean water has no colour, we say it is ______.",
            correct_answer="colourless",
            hint="Start with 'col' …",
        ),
        Question(
            question_id="c2_chem_002_tf_01",
            node_id="c2_chem_002",
            node_title=NODES["c2_chem_002"]["title"],
            q_type="tf", difficulty="Easy",
            text="The blue colour of sea water means that pure water is blue.",
            correct_answer="False",
            hint="The colour comes from the sky or things dissolved in it, not the water itself.",
        ),
    ]
    bank["c2_chem_002"] = n2

    # ── Node 3: Water conservation ─────────────────────────────────────────────
    n3 = [
        Question(
            question_id="c2_chem_003_mc_01",
            node_id="c2_chem_003",
            node_title=NODES["c2_chem_003"]["title"],
            q_type="mc", difficulty="Easy",
            text="Which action saves the MOST water while brushing your teeth?",
            choices=[
                "Leave the tap running",
                "Turn off the tap after use",
                "Use more water",
                "Throw water on the floor",
            ],
            correct_answer="Turn off the tap after use",
            hint="Wasting water means less water for everyone.",
        ),
        Question(
            question_id="c2_chem_003_mc_02",
            node_id="c2_chem_003",
            node_title=NODES["c2_chem_003"]["title"],
            q_type="mc", difficulty="Easy",
            text="To water plants, it is better to use:",
            choices=[
                "A running hose for a long time",
                "A bucket of water",
                "No water at all",
                "A glass of juice",
            ],
            correct_answer="Use a bucket instead of a running hose",
            hint="A running hose wastes a lot of water.",
        ),
        Question(
            question_id="c2_chem_003_fb_01",
            node_id="c2_chem_003",
            node_title=NODES["c2_chem_003"]["title"],
            q_type="fb", difficulty="Easy",
            text="To save water, we should ______ the tap after brushing our teeth.",
            correct_answer="turn off",
            hint="The opposite of 'turn on'.",
        ),
        Question(
            question_id="c2_chem_003_fb_02",
            node_id="c2_chem_003",
            node_title=NODES["c2_chem_003"]["title"],
            q_type="fb", difficulty="Easy",
            text="Leftover water from washing rice can be used for watering ______.",
            correct_answer="plants",
            hint="They grow in soil and need water.",
        ),
        Question(
            question_id="c2_chem_003_tf_01",
            node_id="c2_chem_003",
            node_title=NODES["c2_chem_003"]["title"],
            q_type="tf", difficulty="Easy",
            text="We should tell a grown-up if we see a dripping tap or a leak.",
            correct_answer="True",
            hint="Leaks waste water every day.",
        ),
    ]
    bank["c2_chem_003"] = n3

    return bank


# ── Module-level bank (built once, read-only thereafter) ──────────────────────
_BANK: Dict[str, List[Question]] = _build_bank()


# ═══════════════════════════════════════════════════════════════════════════════
#  Generator API
# ═══════════════════════════════════════════════════════════════════════════════

def get_questions_by_node(node_id: str) -> List[Question]:
    """Return all questions for a single node (copy — safe to mutate locally)."""
    return [q for q in _BANK.get(node_id, [])]


def get_all_questions() -> List[Question]:
    """Return all 15 questions across all three nodes."""
    all_q: List[Question] = []
    for qlist in _BANK.values():
        all_q.extend(qlist)
    return all_q


def generate_quiz(
    seed:             int       = _MASTER_SEED,
    nodes:            Optional[List[str]] = None,
    per_node_counts:  Optional[Dict[str, int]] = None,
    shuffle_within:   bool      = True,
) -> List[Question]:
    """
    Build a quiz by sampling questions from the bank.

    Parameters
    ----------
    seed             : int    — RNG seed (default = _MASTER_SEED = 42)
    nodes            : list of node_ids to include; None = all 3 nodes
    per_node_counts  : dict   node_id → number of questions to sample.
                              None → all questions for each node.
    shuffle_within   : bool   shuffle the selected questions (deterministic).

    Returns
    -------
    List[Question] — in randomised order (if shuffle_within=True).
    """
    set_seed(seed)
    active_nodes = nodes if nodes else list(_BANK.keys())
    selected: List[Question] = []

    for nid in active_nodes:
        pool = _BANK.get(nid, [])
        if not pool:
            continue
        if per_node_counts and nid in per_node_counts:
            k = min(per_node_counts[nid], len(pool))
            selected.extend(random.sample(pool, k))
        else:
            selected.extend(list(pool))          # all questions for node

    if shuffle_within:
        random.shuffle(selected)

    return selected


def quiz_to_markdown(quiz: List[Question], show_answers: bool = False) -> str:
    """
    Render a list of questions as a Markdown string suitable for printing
    or writing to a .md file.
    """
    lines: List[str] = []
    lines.append("# Class 2 Chemistry — Practice Quiz\n")
    lines.append(f"**Total questions:** {len(quiz)}  ")
    lines.append(f"**Difficulty:** Easy  ")
    lines.append(f"**Cognitive Level:** Remember\n")

    # Group by node
    from itertools import groupby
    quiz_sorted = sorted(quiz, key=lambda q: (q.node_id, q.question_id))
    for nid, group in groupby(quiz_sorted, key=lambda q: q.node_id):
        group_list = list(group)
        node_title = group_list[0].node_title
        lines.append(f"\n---\n## 📚 {nid}: {node_title}\n")
        for i, q in enumerate(group_list, 1):
            lines.append(f"**Q{i}.** [{q.q_type.upper()}] {q.text}")
            if q.choices:
                for j, ch in enumerate(q.choices, 1):
                    lines.append(f"   {j}. {ch}")
            if show_answers:
                lines.append(f"   \n   ✅ **Answer:** {q.correct_answer}")
            lines.append("")

    return "\n".join(lines)


def quiz_to_markdown_with_answers(quiz: List[Question]) -> str:
    """Convenience wrapper — always shows answers."""
    return quiz_to_markdown(quiz, show_answers=True)


# ═══════════════════════════════════════════════════════════════════════════════
#  Self-contained: build quiz → auto-grade → report
# ═══════════════════════════════════════════════════════════════════════════════

def run_practice_session(
    seed:          int          = _MASTER_SEED,
    student_marks: Dict[str, str] = None,
) -> None:
    """
    One-shot routine: build a quiz, optionally grade it, print results.

    If *student_marks* is provided, the quiz is auto-graded using the solver.
    Keys are question_id strings; values are the student's raw answers.
    """
    set_seed(seed)
    quiz = generate_quiz(seed=seed)

    print(quiz_to_markdown(quiz, show_answers=False))

    if student_marks is not None:
        print("\n--- Auto-grading ---\n")
        result = evaluate_quiz(student_marks)
        print_result(result, show_details=True)


# ═══════════════════════════════════════════════════════════════════════════════
#  Verification
# ═══════════════════════════════════════════════════════════════════════════════

def verify_generator(seed: int = _MASTER_SEED) -> None:
    """
    Deterministic check: build a quiz, grade all-correct answers,
    and assert a perfect score.
    """
    set_seed(seed)
    quiz = generate_quiz(seed=seed)

    perfect_answers = {q.question_id: q.correct_answer for q in quiz}
    result = evaluate_quiz(perfect_answers)

    print(f"  Quiz size : {len(quiz)} questions")
    print(f"  Score     : {result['total_correct']}/{result['total_questions']}")
    print(f"  Percentage: {result['percentage']}%")

    assert result["total_correct"] == len(quiz), \
        f"Expected {len(quiz)}/{len(quiz)}, got {result['total_correct']}"
    print("  ✓ Generator verification passed.\n")


if __name__ == "__main__":
    verify_generator()
