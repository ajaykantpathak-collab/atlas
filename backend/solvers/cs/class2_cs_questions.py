"""
Question Generator for Class 2 Computer Studies (3 nodes)
Generates seeded, randomised questions with solutions.

Usage:
    from class2_cs_questions import generate_question, generate_worksheet

    q = generate_question("c2_cs_001", seed=42)
    ws = generate_worksheet(seed=7)   # one question per node
"""
import random
import textwrap
from dataclasses import dataclass, field
from typing import Optional, List, Dict

from class2_cs_solver import (
    C2CS001Solver, C2CS002Solver, C2CS003Solver,
    solve, SOLVER_MAP,
)

# ─────────────────────────────────────────────
# Data Structures
# ─────────────────────────────────────────────
@dataclass
class Question:
    node_id: str
    node_label: str
    qtype: str                   # q1, q2, q3, q4
    prompt: str
    options: List[str] = field(default_factory=list)
    answer: str = ""
    difficulty: str = "Easy"
    marks: int = 1
    hint: str = ""
    explanation: str = ""

    def formatted(self) -> str:
        lines = [f"Q: {self.prompt}"]
        if self.options:
            for i, opt in enumerate(self.options, 1):
                lines.append(f"  {i}. {opt}")
            lines.append(f"  Answer: {self.answer}")
        else:
            lines.append(f"  [Answer: {self.answer}]")
        if self.hint:
            lines.append(f"  💡 Hint: {self.hint}")
        lines.append(f"  📖 {self.explanation}")
        return "\n".join(lines)


@dataclass
class Worksheet:
    title: str
    class_level: str
    subject: str
    questions: List[Question]
    total_marks: int = 0

    def __post_init__(self):
        self.total_marks = sum(q.marks for q in self.questions)

    def formatted(self) -> str:
        header = (
            f"{'=' * 60}\n"
            f"  {self.title}\n"
            f"  Class: {self.class_level}  |  Subject: {self.subject}\n"
            f"{'=' * 60}\n"
        )
        body = []
        for i, q in enumerate(self.questions, 1):
            body.append(f"\nQ{i}. [{q.node_label}] ({q.difficulty}, {q.marks} mark{'s' if q.marks>1 else ''})")
            if q.options:
                body.append(q.prompt)
                for j, opt in enumerate(q.options, 1):
                    body.append(f"   {j}. {opt}")
            else:
                body.append(f"   {q.prompt}")
        footer = (
            f"\n{'─' * 60}\n"
            f"  Total Marks: {self.total_marks}\n"
            f"{'─' * 60}"
        )
        return header + "\n".join(body) + footer


# ─────────────────────────────────────────────
# Constants
# ─────────────────────────────────────────────
NODE_META = {
    "c2_cs_001": "Computer as electronic device",
    "c2_cs_002": "Role of computers in daily life",
    "c2_cs_003": "Input devices",
}

# Option pools for multiple-choice questions
MCQ_OPTIONS = {
    "c2_cs_001": {
        "characteristic": {
            "prompt": "Which of these is NOT a characteristic of a computer?",
            "choices": ["Speed", "Accuracy", "Diligence", "Hunger"],
            "answer": "Hunger",
            "hint": "Computers don't eat!",
        },
        "electricity": {
            "prompt": "Why does a computer need electricity?",
            "choices": ["It is an electronic device", "It is hungry", "It likes light", "It sleeps without it"],
            "answer": "It is an electronic device",
            "hint": "What does 'electronic' mean?",
        },
    },
    "c2_cs_002": {
        "education": {
            "prompt": "Which of these is a use of computers in education?",
            "choices": ["Playing games", "Showing educational videos", "Sending emails", "Listening to music"],
            "answer": "Showing educational videos",
            "hint": "What do teachers use computers for at school?",
        },
        "communication": {
            "prompt": "Which device helps computers communicate with people far away?",
            "choices": ["Scanner", "Internet", "Keyboard", "Scanner"],
            "answer": "Internet",
            "hint": "How do you talk to grandparents who live in another city?",
        },
    },
    "c2_cs_003": {
        "input_device": {
            "prompt": "Which of these is an INPUT device?",
            "choices": ["Monitor", "Keyboard", "Speaker", "Printer"],
            "answer": "Keyboard",
            "hint": "Which device sends data INTO the computer?",
        },
        "webcam": {
            "prompt": "Which device captures live video?",
            "choices": ["Scanner", "Microphone", "Webcam", "Mouse"],
            "answer": "Webcam",
            "hint": "It rhymes with 'cam'.",
        },
        "microphone": {
            "prompt": "Which device records sound?",
            "choices": ["Mouse", "Scanner", "Microphone", "Monitor"],
            "answer": "Microphone",
            "hint": "It starts with 'mic'.",
        },
    },
}

# Fill-in-the-blank pools per node
FIB_PROMPTS = {
    "c2_cs_001": [
        {
            "qtype": "q1",
            "prompt": "A computer is an electronic device because it runs on _______.",
            "answer": "electricity",
            "alternatives": ["power", "electric current"],
            "hint": "Think about what makes a fan or bulb work.",
            "explanation": (
                "A computer runs on electricity. When electricity is not available, "
                "the computer stops working — just like a fan or mixer."
            ),
        },
        {
            "qtype": "q3",
            "prompt": "Showing the result to the user is called the _______ function.",
            "answer": "output",
            "alternatives": [],
            "hint": "The four functions are: input, processing, output, storage.",
            "explanation": (
                "Output is the function where the computer shows or prints the result "
                "for the user to see."
            ),
        },
        {
            "qtype": "q4",
            "prompt": (
                "Why is a computer called an electronic device? "
                "(One-line answer)"
            ),
            "answer": "because it runs on electricity",
            "alternatives": [],
            "hint": "Mention electricity and what happens when power is cut.",
            "explanation": (
                "A computer is an electronic device because it needs electricity to work. "
                "It stops when the power goes off."
            ),
        },
    ],
    "c2_cs_002": [
        {
            "qtype": "q2",
            "prompt": (
                "Give ONE example of how computers help in education."
            ),
            "answer": "showing videos",
            "alternatives": ["displaying maps", "playing rhymes", "showing lessons"],
            "hint": "Think about what teachers show on a computer in class.",
            "explanation": (
                "In education, computers help teachers show videos, display maps, "
                "and play rhymes to make lessons interesting."
            ),
        },
        {
            "qtype": "q3",
            "prompt": "Playing games on a computer is an example of _______.",
            "answer": "entertainment",
            "alternatives": [],
            "hint": "Is playing a game for learning or for fun?",
            "explanation": (
                "Playing games and watching movies are examples of computers "
                "being used for entertainment."
            ),
        },
        {
            "qtype": "q4",
            "prompt": (
                "A computer is like a _______ because it sends messages to people far away."
            ),
            "answer": "postman",
            "alternatives": [],
            "hint": "Who delivers letters to faraway places?",
            "explanation": (
                "A computer is like a postman for communication — it sends messages, "
                "emails, and enables video calls to people far away."
            ),
        },
    ],
    "c2_cs_003": [
        {
            "qtype": "q1",
            "prompt": "Which input device records sound and sends it to the computer?",
            "answer": "microphone",
            "alternatives": [],
            "hint": "Singers use this to record their voice.",
            "explanation": (
                "A microphone records sound (voice, music) and sends it into "
                "the computer as data."
            ),
        },
        {
            "qtype": "q3",
            "prompt": "Which device lets you TYPE text and commands?",
            "answer": "keyboard",
            "alternatives": [],
            "hint": "It has many keys like a piano.",
            "explanation": (
                "A keyboard has letter, number, and symbol keys. "
                "Pressing the keys types text into the computer."
            ),
        },
        {
            "qtype": "q4",
            "prompt": (
                "Why is a scanner called an input device? "
                "(One-line answer)"
            ),
            "answer": "converts picture to digital",
            "alternatives": ["scans pictures", "takes image of document"],
            "hint": "It puts a picture INTO the computer.",
            "explanation": (
                "A scanner is an input device because it converts a physical picture "
                "or document into a digital image that the computer can store."
            ),
        },
    ],
}


# ─────────────────────────────────────────────
# Question Generation
# ─────────────────────────────────────────────
def _pick_mcq(node_id: str, rng: random.Random) -> Optional[Question]:
    pool = MCQ_OPTIONS.get(node_id, {})
    if not pool:
        return None
    key = rng.choice(list(pool.keys()))
    item = pool[key]
    # Shuffle choices deterministically
    choices = item["choices"][:]
    rng.shuffle(choices)
    # Map shuffled letter
    answer_idx = choices.index(item["answer"])
    answer_letter = chr(65 + answer_idx)   # A, B, C, D
    return Question(
        node_id=node_id,
        node_label=NODE_META[node_id],
        qtype="mcq",
        prompt=item["prompt"],
        options=[f"{chr(65+i)}. {c}" for i, c in enumerate(choices)],
        answer=f"{answer_letter}. {item['answer']}",
        difficulty="Easy",
        marks=1,
        hint=item.get("hint", ""),
        explanation=item.get("explanation", ""),
    )


def _pick_fib(node_id: str, rng: random.Random) -> Optional[Question]:
    pool = FIB_PROMPTS.get(node_id, [])
    if not pool:
        return None
    item = rng.choice(pool)
    return Question(
        node_id=node_id,
        node_label=NODE_META[node_id],
        qtype=item["qtype"],
        prompt=item["prompt"],
        options=[],
        answer=item["answer"],
        difficulty="Easy",
        marks=1,
        hint=item.get("hint", ""),
        explanation=item.get("explanation", ""),
    )


def generate_question(
    node_id: str,
    qtype: Optional[str] = None,
    seed: Optional[int] = None,
) -> Question:
    """
    Generate a single question for a given node.

    Parameters
    ----------
    node_id   : "c2_cs_001" | "c2_cs_002" | "c2_cs_003"
    qtype     : "mcq" | "fib" | None (random)
    seed      : int or None — for reproducibility

    Returns
    -------
    Question
    """
    if node_id not in NODE_META:
        raise ValueError(f"Unknown node_id: {node_id}")

    rng = random.Random(seed)

    if qtype is None:
        qtype = rng.choice(["mcq", "fib"])

    if qtype == "mcq":
        q = _pick_mcq(node_id, rng)
    else:
        q = _pick_fib(node_id, rng)

    if q is None:
        raise ValueError(f"No questions available for {node_id} / {qtype}")
    return q


def generate_worksheet(
    seed: Optional[int] = None,
    node_order: Optional[List[str]] = None,
) -> Worksheet:
    """
    Generate one worksheet with one question per node (MCQ + FIB mix).

    Parameters
    ----------
    seed        : int or None
    node_order  : list of node_ids or None (default: all three in order)

    Returns
    -------
    Worksheet
    """
    nodes = node_order or ["c2_cs_001", "c2_cs_002", "c2_cs_003"]
    rng = random.Random(seed)

    questions: List[Question] = []
    for node_id in nodes:
        qtype = rng.choice(["mcq", "fib"])
        q = generate_question(node_id, qtype=qtype, seed=rng.randint(0, 9999))
        questions.append(q)

    return Worksheet(
        title="Computer Studies — Class 2 Practice Sheet",
        class_level="2",
        subject="Computer Studies",
        questions=questions,
    )


def generate_adaptive_quiz(
    seed: int,
    num_questions: int = 9,
) -> List[Question]:
    """
    Generate a mixed quiz of `num_questions` questions spread across
    all 3 nodes (roughly equal distribution).
    """
    rng = random.Random(seed)
    nodes = ["c2_cs_001", "c2_cs_002", "c2_cs_003"]
    questions: List[Question] = []
    per_node = max(1, num_questions // len(nodes))

    for node_id in nodes:
        for _ in range(per_node):
            qtype = rng.choice(["mcq", "fib"])
            q = generate_question(node_id, qtype=qtype, seed=rng.randint(0, 99999))
            questions.append(q)

    # Shuffle order
    rng.shuffle(questions)
    return questions[:num_questions]


# ─────────────────────────────────────────────
# Verification
# ─────────────────────────────────────────────
def _verify():
    """
    Generate one question per node and run solver verification.
    """
    print("=" * 60)
    print("CS Class-2 Question Generator — Verification")
    print("=" * 60)

    rng = random.Random(42)

    for node_id in ["c2_cs_001", "c2_cs_002", "c2_cs_003"]:
        print(f"\n── Node: {node_id} ({NODE_META[node_id]}) ──")
        for qtype in ["mcq", "fib"]:
            q = generate_question(node_id, qtype=qtype, seed=rng.randint(0, 9999))
            print(f"\n{q.formatted()}")

            # Run solver verification
            solver = SOLVER_MAP[node_id]
            method_name = f"solve_{q.qtype}"
            method = getattr(solver, method_name, None)

            if method and q.qtype != "mcq":
                # For FIB questions, try correct + one wrong answer
                result_correct = method(q.answer)
                result_wrong   = method("wrong_answer")
                status_c = "✓" if result_correct.correct else "✗"
                status_w = "✓" if not result_wrong.correct else "✗"
                print(f"  Solver (correct arg) : {status_c} score={result_correct.score}")
                print(f"  Solver (wrong  arg)  : {status_w} score={result_wrong.score}")

    # Worksheet
    print("\n── Worksheet ──")
    ws = generate_worksheet(seed=7)
    print(ws.formatted())

    # Adaptive quiz
    print("\n── Adaptive Quiz (6 questions) ──")
    quiz = generate_adaptive_quiz(seed=99, num_questions=6)
    for i, q in enumerate(quiz, 1):
        print(f"  Q{i}. [{q.node_id}] {q.prompt[:80]}...")

    print("\n" + "=" * 60)
    print("Verification complete.")
    print("=" * 60)


if __name__ == "__main__":
    _verify()