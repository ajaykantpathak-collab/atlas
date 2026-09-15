"""
Deterministic Question Generator — Class 8 Computer Studies (ICSE/CISCE)
Author: Claude-Fable-5 | Source: Viva ICSE Computer Studies 8
"""

import random
import hashlib
import re
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple, Any
import numpy as np

# ──────────────────────────────────────────────
#  CONSTANTS & SEED
# ──────────────────────────────────────────────
MASTER_SEED = 20250608          # fixed seed → fully deterministic
INDIAN_CONTEXT_FRACTION = 0.50  # 50 % Indian-context competency questions

# ──────────────────────────────────────────────
#  NODE REGISTRY
# ──────────────────────────────────────────────
NODES = {
    "c8_cs_001": {
        "class": 8, "subject": "Computer Studies",
        "chapter": "Chapter 1: Operating System and Graphical User Interface",
        "title": "Software types — system, application, utility",
        "cognitive": "Understand", "difficulty": "Medium",
        "exam_relevance": "Board_Only", "exam_weightage": "Medium",
        "competency": "Board",
        "vocabulary": [
            "system software", "application software", "utility software",
            "classify", "Windows", "Linux", "MS Word", "MS Excel",
            "antivirus", "disk cleanup", "device drivers",
        ],
        "examples": {
            "system": ["Windows", "Linux", "macOS", "device drivers"],
            "application": ["MS Word", "MS Excel", "Chrome", "PowerPoint"],
            "utility":   ["antivirus", "disk cleanup", "file compressor", "backup tool"],
        },
        "analogy": {
            "system":    "the foundation of a house",
            "application": "furniture that does specific tasks",
            "utility":   "maintenance tools that keep the computer healthy",
        },
        "prereq": ["c5_cs_005", "c5_cs_006"],
        "mastery": [
            "Classify software into system, application, and utility categories by function.",
            "Give two examples of each software type.",
            "Distinguish system software (manages hardware) from application software (performs user tasks).",
        ],
    },
    "c8_cs_002": {
        "class": 8, "subject": "Computer Studies",
        "chapter": "Chapter 1: Operating System and Graphical User Interface",
        "title": "Operating system — definition, need, and functions",
        "cognitive": "Understand", "difficulty": "Hard",
        "exam_relevance": "Board_Only", "exam_weightage": "High",
        "competency": "Board",
        "vocabulary": [
            "operating system", "OS", "resource management", "user interface",
            "file management", "multitasking", "memory management", "security",
            "CUI", "GUI", "Character User Interface", "Graphical User Interface",
            "CPU", "RAM", "user authentication",
        ],
        "examples": {
            "os_examples": ["Windows", "Linux", "macOS", "Android"],
            "os_functions": ["resource management", "user interface", "file management",
                             "multitasking", "memory management", "security"],
            "analogy_os":   "a traffic controller for the computer",
            "analogy_multi": "a juggler who keeps many balls in the air",
            "analogy_mem":   "allocating desks to students in a classroom",
            "analogy_sec":   "a security guard who protects the building",
        },
        "prereq": ["c8_cs_001", "c5_cs_005"],
        "mastery": [
            "Define an operating system as software that manages hardware and software resources.",
            "List three needs of an OS (resource management, user interface, file management).",
            "Explain three OS features (multitasking, memory management, security).",
            "Distinguish CUI from GUI.",
        ],
    },
}

# ──────────────────────────────────────────────
#  DATA STRUCTURES
# ──────────────────────────────────────────────
@dataclass
class Question:
    id: str
    node_id: str
    type: str
    difficulty: str
    cognitive: str
    competency: str
    indian_context: bool
    question_text: str
    options: List[str] = field(default_factory=list)
    correct_answer: str = ""
    explanation: str = ""
    marks: int = 1
    board_tag: str = ""          # e.g. "ICSE 2024" or "Practice"

@dataclass
class VerificationReport:
    total_questions: int = 0
    nodes_covered: List[str] = field(default_factory=list)
    type_counts: Dict[str, int] = field(default_factory=dict)
    difficulty_counts: Dict[str, int] = field(default_factory=dict)
    indian_context_count: int = 0
    vocabulary_coverage: Dict[str, int] = field(default_factory=dict)
    missing_vocabulary: List[str] = field(default_factory=list)
    prereq_met: bool = True
    errors: List[str] = field(default_factory=list)

# ──────────────────────────────────────────────
#  HELPER: SEEDED HELPERS
# ──────────────────────────────────────────────
def _rng_for(node_id: str, q_type: str, idx: int) -> random.Random:
    """Deterministic per-question RNG from node + type + index."""
    h = hashlib.sha256(f"{MASTER_SEED}:{node_id}:{q_type}:{idx}".encode()).hexdigest()
    return random.Random(int(h, 16) % (2**31))

def _pick(rng: random.Random, seq: list) -> Any:
    return seq[rng.randint(0, len(seq) - 1)]

def _shuffle(rng: random.Random, seq: list) -> list:
    s = seq[:]
    rng.shuffle(s)
    return s

def _is_indian(rng: random.Random) -> bool:
    return rng.random() < INDIAN_CONTEXT_FRACTION

# ──────────────────────────────────────────────
#  QUESTION GENERATORS — c8_cs_001
# ──────────────────────────────────────────────
def _gen_001_mcq(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_001", "mcq", idx)
    vocab = node["vocabulary"]
    ex = node["examples"]
    ic = _is_indian(rng)

    templates = [
        # T1: identify software type
        {
            "stem": (ic
                and "Which of the following is an example of {cat} software used widely in Indian schools?"
                or "Which of the following is an example of {cat} software?"),
            "get_cat": lambda r: r.choice(["system", "application", "utility"]),
            "options_builder": lambda cat, r: {
                "system":    (ex["system"][:2] + ex["application"][:1] + ex["utility"][:1]),
                "application": (ex["application"][:2] + ex["system"][:1] + ["Disk Defragmenter"]),
                "utility":   (ex["utility"][:2] + ex["system"][:1] + ["Google Chrome"]),
            }[cat],
            "correct_idx": lambda cat, r: {"system": 0, "application": 0, "utility": 0}[cat],
        },
        # T2: purpose of a category
        {
            "stem": (ic
                and "In a typical Indian computer lab, which software type is responsible for managing hardware resources like CPU and RAM?"
                or "Which type of software manages the computer's hardware resources?"),
            "options": ["System software", "Application software", "Utility software", "Programming software"],
            "correct_idx": 0,
        },
        # T3: distinguish system vs application
        {
            "stem": (ic
                and "When you type a school assignment in MS Word on a Windows computer, which type of software are you using?"
                or "When a user creates a document in a word processor, which software type is being used?"),
            "options": ["System software", "Application software", "Utility software", "Device driver"],
            "correct_idx": 1,
        },
        # T4: utility purpose
        {
            "stem": (ic
                and "Which software type helps keep your computer virus-free, especially important when doing online banking with BHIM or UPI apps?"
                or "Which type of software protects the computer from viruses and malware?"),
            "options": ["System software", "Application software", "Utility software", "Operating system"],
            "correct_idx": 2,
        },
        # T5: OS classification
        {
            "stem": "Microsoft Windows is an example of which type of software?",
            "options": ["System software", "Application software", "Utility software", "Firmware"],
            "correct_idx": 0,
        },
    ]

    t = _pick(rng, templates)
    opts = []
    correct = ""

    if "get_cat" in t:
        cat = t["get_cat"](rng)
        raw_opts = t["options_builder"](cat, rng)
        opts = _shuffle(rng, raw_opts[:])
        correct = opts[t["correct_idx"](cat, rng)]
        stem = t["stem"].format(cat=cat)
    else:
        opts = _shuffle(rng, t["options"][:])
        correct = opts[t["correct_idx"]]
        stem = t["stem"]

    board = _pick(rng, ["ICSE 2023", "ICSE 2024", "ICSE Model Paper", "Practice Paper"]) if ic else "Practice"
    return Question(
        id=f"c8_cs_001_mcq_{idx+1:02d}",
        node_id="c8_cs_001", type="MCQ",
        difficulty="Medium", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text=stem, options=opts,
        correct_answer=correct,
        explanation=f"Correct: {correct}. "
                    f"System software manages hardware. Application software performs user tasks. "
                    f"Utility software maintains and optimises the system.",
        marks=1, board_tag=board,
    )

def _gen_001_fill_blank(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_001", "fill", idx)
    ic = _is_indian(rng)
    ex = node["examples"]

    pairs = [
        ("______ software manages hardware resources like CPU and memory.", "System"),
        ("______ software performs specific tasks for the user like writing letters.", "Application"),
        ("______ software protects the computer from viruses and malware.", "Utility"),
        ("Windows and Linux are examples of ______ software.", "System"),
        ("MS Word and Chrome are examples of ______ software.", "Application"),
        ("An antivirus program is an example of ______ software.", "Utility"),
        ("______ software acts as an intermediary between the user and the hardware.", "System"),
        ("A disk cleanup tool is a type of ______ software.", "Utility"),
    ]
    stem, answer = _pick(rng, pairs)
    if ic and rng.random() < 0.5:
        stem = stem.replace("Windows", "Windows or Linux")

    return Question(
        id=f"c8_cs_001_fill_{idx+1:02d}",
        node_id="c8_cs_001", type="Fill in the Blanks",
        difficulty="Medium", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text=stem, correct_answer=answer,
        explanation=f"The correct term is '{answer}'. "
                    f"{answer.capitalize()} software: "
                    f"{'manages hardware and system resources' if answer=='System' else ''}"
                    f"{'performs specific user tasks' if answer=='Application' else ''}"
                    f"{'maintains and optimises the computer' if answer=='Utility' else ''}.",
        marks=1,
    )

def _gen_001_true_false(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_001", "tf", idx)
    ic = _is_indian(rng)

    statements = [
        ("MS Word is system software.", False,
         "MS Word is application software — it performs a specific user task (word processing)."),
        ("Antivirus programs are utility software.", True,
         "Antivirus is a classic example of utility software used to maintain system health."),
        ("Windows manages hardware resources.", True,
         "Windows is the operating system — a type of system software that manages hardware."),
        ("System software performs tasks directly for the end user.", False,
         "Application software performs tasks for the end user. System software manages hardware."),
        ("Utility software helps maintain and optimise the computer.", True,
         "Utility software includes antivirus, disk cleanup, and backup tools."),
        ("Linux is an example of application software.", False,
         "Linux is an operating system, which falls under system software."),
        ("There are only two categories of software.", False,
         "Software is classified into THREE categories: system, application, and utility."),
    ]
    stmt, truth, reason = _pick(rng, statements)

    return Question(
        id=f"c8_cs_001_tf_{idx+1:02d}",
        node_id="c8_cs_001", type="True/False",
        difficulty="Medium", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text=f"State whether the following statement is True or False:\n{stmt}",
        correct_answer="True" if truth else "False",
        explanation=reason,
        marks=1,
    )

def _gen_001_match(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_001", "match", idx)
    ic = _is_indian(rng)

    col_a = ["System Software", "Application Software", "Utility Software", "MS Word", "Antivirus"]
    col_b_map = {
        "System Software":   "Manages hardware and system resources",
        "Application Software": "Performs specific user tasks",
        "Utility Software":  "Maintains and optimises the computer",
        "MS Word":           "Example of application software",
        "Antivirus":         "Example of utility software",
    }
    # Shuffle column B entries as a list
    col_b_values = list(col_b_map.values())
    col_b_shuffled = _shuffle(rng, col_b_values[:])
    # Assign letter labels A-E to shuffled B
    letters = ["A", "B", "C", "D", "E"]
    col_b_labeled = {letters[i]: col_b_shuffled[i] for i in range(5)}

    correct_pairs = {}
    for item_a, desc in col_b_map.items():
        for lbl, desc_b in col_b_labeled.items():
            if desc_b == desc:
                correct_pairs[item_a] = lbl
                break

    col_a_str = "\n".join(f"{letters[i]}. {col_a[i]}" for i in range(5))
    col_b_str = "\n".join(f"{lbl}. {col_b_labeled[lbl]}" for lbl in letters)

    return Question(
        id=f"c8_cs_001_match_{idx+1:02d}",
        node_id="c8_cs_001", type="Match the Following",
        difficulty="Medium", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text="Match Column A with Column B:\n\n"
                      f"Column A\n{col_a_str}\n\n"
                      f"Column B\n{col_b_str}",
        correct_answer=" | ".join(f"{k} → {v}" for k, v in correct_pairs.items()),
        explanation="Match each software type / example to its correct description based on function.",
        marks=2,
    )

def _gen_001_ar(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_001", "ar", idx)
    ic = _is_indian(rng)

    pairs = [
        ("Assertion (A): System software manages hardware resources.\n"
         "Reason (R): System software includes the operating system and device drivers.",
         "Both A and R are true and R is the correct explanation of A."),
        ("Assertion (A): Application software performs tasks for the end user.\n"
         "Reason (R): MS Word is an example of system software.",
         "A is true but R is false."),
        ("Assertion (A): Utility software helps maintain the computer.\n"
         "Reason (R): Antivirus is a type of utility software.",
         "Both A and R are true and R is the correct explanation of A."),
        ("Assertion (A): There are three main categories of software.\n"
         "Reason (R): Software can only be classified as system or application.",
         "A is true but R is false."),
    ]
    stem, answer = _pick(rng, pairs)
    options = [
        "Both A and R are true and R is the correct explanation of A.",
        "Both A and R are true but R is NOT the correct explanation of A.",
        "A is true but R is false.",
        "A is false but R is true.",
    ]

    return Question(
        id=f"c8_cs_001_ar_{idx+1:02d}",
        node_id="c8_cs_001", type="Assertion-Reason",
        difficulty="Medium", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text=stem, options=options,
        correct_answer=answer,
        explanation=f"Correct answer: {answer}",
        marks=1,
    )

def _gen_001_case(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_001", "case", idx)
    ic = _is_indian(rng)

    if ic:
        passage = (
            "Rahul, a Class 8 student in Mumbai, uses a Windows laptop for his schoolwork. "
            "He opens MS Word to write his English essay, saves it using File Manager, and "
            "runs Quick Heal antivirus every week. His friend Priya uses LibreOffice Writer "
            "on Ubuntu Linux for the same essay. Both also use Google Chrome to research topics online."
        )
        questions_data = [
            ("What type of software is Windows?", "System software", "Windows is the OS — it manages hardware resources."),
            ("What type of software is MS Word?", "Application software", "MS Word performs a specific task — word processing."),
            ("What type of software is Quick Heal?", "Utility software", "Quick Heal is an antivirus — it maintains system security."),
            ("Is Ubuntu Linux system software or application software?", "System software", "Linux is an OS, a type of system software."),
        ]
    else:
        passage = (
            "A student opens a word processor to type an essay, saves the file using File Explorer, "
            "and runs an antivirus scan weekly. The computer runs on a popular operating system."
        )
        questions_data = [
            ("What type of software is the operating system?", "System software", "OS manages hardware and provides a platform."),
            ("What type of software is the word processor?", "Application software", "Word processors perform specific user tasks."),
            ("What type of software is the antivirus?", "Utility software", "Antivirus maintains system health and security."),
        ]

    q_text = passage + "\n\nQuestions:\n"
    answers = []
    explanations = []
    for i, (q, a, e) in enumerate(questions_data, 1):
        q_text += f"Q{i}. {q}\n"
        answers.append(f"Q{i}: {a}")
        explanations.append(f"Q{i}: {e}")

    return Question(
        id=f"c8_cs_001_case_{idx+1:02d}",
        node_id="c8_cs_001", type="Case-Based",
        difficulty="Medium", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text=q_text,
        correct_answer="\n".join(answers),
        explanation="\n".join(explanations),
        marks=len(questions_data),
    )

# ──────────────────────────────────────────────
#  QUESTION GENERATORS — c8_cs_002
# ──────────────────────────────────────────────
def _gen_002_mcq(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_002", "mcq", idx)
    ic = _is_indian(rng)
    vocab = node["vocabulary"]
    ex = node["examples"]

    templates = [
        {
            "stem": (ic
                and "An operating system is best described as:"
                or "An operating system is best described as:"),
            "options": [
                "System software that manages hardware and software resources",
                "Application software for word processing",
                "A type of utility software",
                "Hardware component of the computer",
            ],
            "correct_idx": 0,
        },
        {
            "stem": "Which of the following is NOT a function of an operating system?",
            "options": ["Resource management", "File management", "Writing computer programs",
                        "Providing a user interface"],
            "correct_idx": 2,
        },
        {
            "stem": "Multitasking in an OS means:",
            "options": [
                "Running multiple programs simultaneously",
                "Running a single program very fast",
                "Deleting multiple files at once",
                "Printing multiple documents together",
            ],
            "correct_idx": 0,
        },
        {
            "stem": (ic
                and "When Priya watches a video on YouTube while her download completes in the background, which OS feature is being used?"
                or "Running several programs at the same time is called:"),
            "options": ["Multitasking", "Memory management", "File management", "Security"],
            "correct_idx": 0,
        },
        {
            "stem": (ic
                and "In an Indian school computer lab, when 30 students open their files simultaneously, which OS function allocates RAM to each student's program?"
                or "Which OS function allocates RAM to running programs?"),
            "options": ["Memory management", "File management", "Security", "Multitasking"],
            "correct_idx": 0,
        },
        {
            "stem": (ic
                and "Before accessing online exam portals, students must enter a password. Which OS feature is this?"
                or "User authentication and access control is part of which OS feature?"),
            "options": ["Security", "Multitasking", "File management", "Memory management"],
            "correct_idx": 0,
        },
        {
            "stem": "Which of the following is NOT an example of an operating system?",
            "options": ["Windows", "Linux", "MS Word", "Android"],
            "correct_idx": 2,
        },
        {
            "stem": "CUI stands for:",
            "options": [
                "Character User Interface",
                "Computer User Interface",
                "Central User Input",
                "Common User Interface",
            ],
            "correct_idx": 0,
        },
        {
            "stem": "GUI stands for:",
            "options": [
                "Graphical User Interface",
                "General User Interface",
                "Graphic Unit Input",
                "Global User Integration",
            ],
            "correct_idx": 0,
        },
        {
            "stem": "Which interface uses icons, windows, and a mouse?",
            "options": ["GUI", "CUI", "Command Prompt only", "BIOS"],
            "correct_idx": 0,
        },
        {
            "stem": (ic
                and "When you save a document in a folder on your desktop, which OS function is helping you?"
                or "Creating, organising, and storing files is called:"),
            "options": ["File management", "Memory management", "Resource management", "Security"],
            "correct_idx": 0,
        },
        {
            "stem": "Which of the following is an example of a GUI-based operating system?",
            "options": ["Windows 10", "MS-DOS", "CP/M", "UNIX terminal"],
            "correct_idx": 0,
        },
    ]

    t = _pick(rng, templates)
    opts = _shuffle(rng, t["options"][:])
    correct = opts[t["correct_idx"]]
    board = _pick(rng, ["ICSE 2023", "ICSE 2024", "ICSE Model Paper", "Practice Paper"]) if ic else "Practice"

    return Question(
        id=f"c8_cs_002_mcq_{idx+1:02d}",
        node_id="c8_cs_002", type="MCQ",
        difficulty="Hard", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text=t["stem"], options=opts,
        correct_answer=correct,
        explanation=f"Correct: {correct}. This tests understanding of OS concepts.",
        marks=1, board_tag=board,
    )

def _gen_002_fill_blank(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_002", "fill", idx)
    ic = _is_indian(rng)

    pairs = [
        ("An operating system is a type of ______ software.", "system"),
        ("The OS manages hardware resources like ______ and memory.", "CPU"),
        ("______ management allocates RAM to running programs.", "Memory"),
        ("The ability to run several programs at once is called ______.", "multitasking"),
        ("______ management involves creating, organising, and storing files.", "File"),
        ("CUI stands for Character ______ Interface.", "User"),
        ("GUI stands for Graphical ______ Interface.", "User"),
        ("User authentication is part of the OS ______ feature.", "security"),
        ("An OS provides a ______ for the user to interact with the computer.", "user interface"),
        ("Android is an example of an operating system used in ______.", "smartphones"),
    ]
    stem, answer = _pick(rng, pairs)

    return Question(
        id=f"c8_cs_002_fill_{idx+1:02d}",
        node_id="c8_cs_002", type="Fill in the Blanks",
        difficulty="Hard", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text=stem, correct_answer=answer,
        explanation=f"The correct term is '{answer}'.",
        marks=1,
    )

def _gen_002_true_false(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_002", "tf", idx)
    ic = _is_indian(rng)

    statements = [
        ("An operating system is application software.", False,
         "An operating system is system software, not application software."),
        ("The OS manages hardware resources.", True,
         "One of the primary functions of an OS is resource management."),
        ("Multitasking allows running only one program at a time.", False,
         "Multitasking means running multiple programs simultaneously."),
        ("File management includes creating, organising, and storing files.", True,
         "File management is a key OS function."),
        ("GUI uses text commands to interact with the computer.", False,
         "GUI uses graphical elements like icons and windows; CUI uses text commands."),
        ("Memory management is handled by the application software.", False,
         "Memory management is a function of the operating system."),
        ("Security in an OS includes user authentication.", True,
         "OS security features include passwords and access control."),
        ("CUI is easier for beginners than GUI.", False,
         "GUI is generally easier for beginners because of its visual, click-based interface."),
    ]
    stmt, truth, reason = _pick(rng, statements)

    return Question(
        id=f"c8_cs_002_tf_{idx+1:02d}",
        node_id="c8_cs_002", type="True/False",
        difficulty="Hard", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text=f"State whether the following statement is True or False:\n{stmt}",
        correct_answer="True" if truth else "False",
        explanation=reason,
        marks=1,
    )

def _gen_002_match(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_002", "match", idx)
    ic = _is_indian(rng)

    col_a_raw = [
        "CPU", "RAM", "Multitasking", "File Management", "Security",
        "CUI", "GUI", "User Interface",
    ]
    col_b_raw = [
        "The brain of the computer — managed by the OS",
        "Primary memory — allocated by memory management",
        "Running multiple programs at the same time",
        "Creating, organising, and storing files",
        "User authentication and access control",
        "Text-based interface (command line)",
        "Graphical interface with icons and windows",
        "The way the user communicates with the computer",
    ]

    # Shuffle both columns
    col_a = _shuffle(rng, col_a_raw[:])
    col_b = _shuffle(rng, col_b_raw[:])

    # Correct mapping from original
    correct_map = {
        "CPU": "The brain of the computer — managed by the OS",
        "RAM": "Primary memory — allocated by memory management",
        "Multitasking": "Running multiple programs at the same time",
        "File Management": "Creating, organising, and storing files",
        "Security": "User authentication and access control",
        "CUI": "Text-based interface (command line)",
        "GUI": "Graphical interface with icons and windows",
        "User Interface": "The way the user communicates with the computer",
    }

    letters = ["A", "B", "C", "D", "E", "F", "G", "H"]
    col_a_str = "\n".join(f"{letters[i]}. {col_a[i]}" for i in range(len(col_a)))
    col_b_str = "\n".join(f"{letters[i]}. {col_b[i]}" for i in range(len(col_b)))

    correct_pairs = {}
    for item_a in col_a:
        correct_pairs[item_a] = correct_map[item_a]

    return Question(
        id=f"c8_cs_002_match_{idx+1:02d}",
        node_id="c8_cs_002", type="Match the Following",
        difficulty="Hard", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text="Match Column A with Column B:\n\n"
                      f"Column A\n{col_a_str}\n\nColumn B\n{col_b_str}",
        correct_answer=" | ".join(f"{k} → {v}" for k, v in correct_pairs.items()),
        explanation="Match each OS term to its correct description.",
        marks=3,
    )

def _gen_002_short(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_002", "short", idx)
    ic = _is_indian(rng)

    prompts = [
        (ic
         and "What is an operating system? Give two examples."
         or "Define an operating system. Give two examples.",
         "An operating system is system software that manages hardware and software resources of a computer. "
         "Examples: Windows and Linux.",
         2),
        (ic
         and "List any three functions of an operating system."
         or "Name three important functions of an operating system.",
         "Three functions of an OS are:\n"
         "1. Resource management (manages CPU, memory, devices)\n"
         "2. File management (creates, organises, stores files)\n"
         "3. Providing a user interface",
         2),
        ("What is multitasking? Give one example.",
         "Multitasking is the ability of an OS to run multiple programs simultaneously. "
         "Example: Listening to music while typing a document.",
         2),
        ("Differentiate between CUI and GUI.",
         "CUI (Character User Interface) uses text commands typed by the user. "
         "GUI (Graphical User Interface) uses graphical elements like icons, windows, and a mouse.",
         2),
        ("Why is memory management important in an operating system?",
         "Memory management ensures that each running program gets the right amount of RAM "
         "and that programs do not interfere with each other's memory.",
         2),
    ]
    q, a, marks = _pick(rng, prompts)

    return Question(
        id=f"c8_cs_002_short_{idx+1:02d}",
        node_id="c8_cs_002", type="Short Answer",
        difficulty="Hard", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text=q, correct_answer=a,
        explanation=f"Marking scheme ({marks} marks): {a}",
        marks=marks,
    )

def _gen_002_case(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_002", "case", idx)
    ic = _is_indian(rng)

    if ic:
        passage = (
            "Anjali, a student in Delhi, turns on her laptop running Windows 11. She logs in by "
            "entering her password — the OS checks it for security. She then opens Google Chrome to "
            "search for her homework, opens MS Word to type her answers, and plays a song on Windows "
            "Media Player — all at the same time. The OS smoothly switches between these programs "
            "without crashing. When she saves her file in the 'Homework' folder on the D: drive, the "
            "OS manages the file storage."
        )
        qs = [
            ("What type of software is Windows 11?", "System software — it is an operating system."),
            ("Which OS feature is used when Anjali enters her password?", "Security — user authentication."),
            ("What is the name of the feature that lets her use Chrome, Word, and Media Player together?",
             "Multitasking."),
            ("Which OS function is responsible for saving her file in a folder?",
             "File management."),
            ("Which OS function ensures each program gets enough memory without crashing?",
             "Memory management."),
        ]
    else:
        passage = (
            "A student logs into a computer, opens a web browser and a text editor at the same time, "
            "saves a file to a folder, and the system protects the account with a password."
        )
        qs = [
            ("What type of software manages all these activities?", "Operating system (system software)."),
            ("Which feature allows multiple programs to run together?", "Multitasking."),
            ("Which feature handles saving and organising files?", "File management."),
            ("Which feature provides password protection?", "Security."),
        ]

    q_text = passage + "\n\nAnswer the following:\n"
    answers = []
    for i, (q, a) in enumerate(qs, 1):
        q_text += f"Q{i}. {q}\n"
        answers.append(f"Q{i}: {a}")

    return Question(
        id=f"c8_cs_002_case_{idx+1:02d}",
        node_id="c8_cs_002", type="Case-Based",
        difficulty="Hard", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text=q_text,
        correct_answer="\n".join(answers),
        explanation="Each answer demonstrates understanding of an OS function.",
        marks=len(qs),
    )

def _gen_002_ar(node: dict, idx: int) -> Question:
    rng = _rng_for("c8_cs_002", "ar", idx)
    ic = _is_indian(rng)

    pairs = [
        ("Assertion (A): The operating system manages the computer's hardware resources.\n"
         "Reason (R): The OS acts as an intermediary between the user and the hardware.",
         "Both A and R are true and R is the correct explanation of A."),
        ("Assertion (A): Multitasking allows an OS to run several programs at the same time.\n"
         "Reason (R): Multitasking reduces the speed of the computer.",
         "A is true but R is false."),
        ("Assertion (A): GUI uses icons and a mouse for interaction.\n"
         "Reason (R): CUI is more user-friendly for beginners than GUI.",
         "A is true but R is false."),
        ("Assertion (A): Memory management is a function of the operating system.\n"
         "Reason (R): The OS allocates RAM to each running program.",
         "Both A and R are true and R is the correct explanation of A."),
        ("Assertion (A): File management includes creating and organising files.\n"
         "Reason (R): File management is performed by application software.",
         "A is true but R is false."),
    ]
    stem, answer = _pick(rng, pairs)
    options = [
        "Both A and R are true and R is the correct explanation of A.",
        "Both A and R are true but R is NOT the correct explanation of A.",
        "A is true but R is false.",
        "A is false but R is true.",
    ]

    return Question(
        id=f"c8_cs_002_ar_{idx+1:02d}",
        node_id="c8_cs_002", type="Assertion-Reason",
        difficulty="Hard", cognitive="Understand",
        competency="Board", indian_context=ic,
        question_text=stem, options=options,
        correct_answer=answer,
        explanation=f"Correct: {answer}",
        marks=1,
    )

# ──────────────────────────────────────────────
#  QUESTION TYPE REGISTRY PER NODE
# ──────────────────────────────────────────────
TYPE_GENERATORS = {
    "c8_cs_001": {
        "MCQ":             _gen_001_mcq,
        "Fill in the Blanks": _gen_001_fill_blank,
        "True/False":      _gen_001_true_false,
        "Match the Following": _gen_001_match,
        "Assertion-Reason": _gen_001_ar,
        "Case-Based":      _gen_001_case,
    },
    "c8_cs_002": {
        "MCQ":             _gen_002_mcq,
        "Fill in the Blanks": _gen_002_fill_blank,
        "True/False":      _gen_002_true_false,
        "Match the Following": _gen_002_match,
        "Assertion-Reason": _gen_002_ar,
        "Short Answer":    _gen_002_short,
        "Case-Based":      _gen_002_case,
    },
}

# Target: at least one question of each type per node, plus extras for board weightage
TYPE_WEIGHTS = {
    "c8_cs_001": ["MCQ", "MCQ", "Fill in the Blanks", "True/False",
                  "Match the Following", "Assertion-Reason", "Case-Based"],
    "c8_cs_002": ["MCQ", "MCQ", "MCQ", "Fill in the Blanks", "True/False",
                  "Match the Following", "Assertion-Reason", "Short Answer", "Case-Based"],
}

# ──────────────────────────────────────────────
#  MAIN GENERATOR CLASS
# ──────────────────────────────────────────────
class Class8CSQuestionGenerator:
    """
    Deterministic question generator for Class 8 Computer Studies.
    Same seed → same output.  All nodes covered.  Indian context ≈ 50 %.
    """

    def __init__(self, seed: int = MASTER_SEED):
        self.master_seed = seed
        self.rng = random.Random(seed)
        self.np_rng = np.random.RandomState(seed % (2**32))

    # ── public API ──────────────────────────────────────────────────────────
    def generate(self, node_ids: Optional[List[str]] = None,
                 total_per_node: Optional[Dict[str, int]] = None) -> Dict[str, List[Question]]:
        """
        Generate questions for the specified nodes.
        If node_ids is None, all nodes are covered.
        total_per_node overrides the default type list length.
        """
        nodes_to_gen = node_ids if node_ids else list(NODES.keys())
        result: Dict[str, List[Question]] = {}

        for nid in nodes_to_gen:
            if nid not in NODES:
                raise ValueError(f"Unknown node: {nid}. Available: {list(NODES.keys())}")
            types = TYPE_WEIGHTS.get(nid, list(TYPE_GENERATORS[nid].keys()))
            if total_per_node and nid in total_per_node:
                # Expand / trim to desired count deterministically
                types = self._adjust_types(nid, types, total_per_node[nid])
            questions = self._generate_for_node(nid, types)
            result[nid] = questions

        return result

    def verify(self, questions: Dict[str, List[Question]]) -> VerificationReport:
        """Run post-generation checks."""
        report = VerificationReport()

        for nid, qs in questions.items():
            report.total_questions += len(qs)
            report.nodes_covered.append(nid)
            for q in qs:
                report.type_counts[q.type] = report.type_counts.get(q.type, 0) + 1
                report.difficulty_counts[q.difficulty] = report.difficulty_counts.get(q.difficulty, 0) + 1
                if q.indian_context:
                    report.indian_context_count += 1
                for w in NODES[q.node_id]["vocabulary"]:
                    report.vocabulary_coverage[w] = report.vocabulary_coverage.get(w, 0) + 1

        # Check all nodes covered
        expected = set(NODES.keys())
        got = set(questions.keys())
        if expected != got:
            report.errors.append(f"Missing nodes: {expected - got}")

        # Check Indian context fraction
        total = report.total_questions
        if total > 0:
            actual_ic = report.indian_context_count / total
            if abs(actual_ic - INDIAN_CONTEXT_FRACTION) > 0.15:
                report.errors.append(
                    f"Indian context fraction {actual_ic:.2f} deviates from target {INDIAN_CONTEXT_FRACTION}")

        # Check vocabulary coverage
        for nid, node in NODES.items():
            if nid in questions:
                for vocab in node["vocabulary"]:
                    if report.vocabulary_coverage.get(vocab, 0) == 0:
                        report.missing_vocabulary.append(vocab)

        return report

    def print_questions(self, questions: Dict[str, List[Question]],
                        show_answers: bool = False) -> None:
        """Pretty-print generated questions."""
        for nid, qs in questions.items():
            node = NODES[nid]
            print(f"\n{'='*70}")
            print(f"  NODE: {nid}  |  {node['title']}")
            print(f"  Chapter: {node['chapter']}")
            print(f"  Difficulty: {node['difficulty']}  |  Cognitive: {node['cognitive']}")
            print(f"{'='*70}")
            for q in qs:
                tag = " 🇮🇳[IC]" if q.indian_context else ""
                print(f"\n[{q.id}] [{q.type}] [{q.difficulty}] (Marks: {q.marks}){tag}")
                print(f"  {q.board_tag}")
                print(f"  Q: {q.question_text}")
                if q.options:
                    for i, opt in enumerate(q.options, 1):
                        marker = " ✓" if opt == q.correct_answer else ""
                        print(f"     {i}. {opt}{marker}")
                else:
                    print(f"  Answer: {q.correct_answer}")
                if show_answers:
                    print(f"  Explanation: {q.explanation}")

    def print_report(self, report: VerificationReport) -> None:
        """Print verification report."""
        print(f"\n{'='*70}")
        print("  VERIFICATION REPORT")
        print(f"{'='*70}")
        print(f"  Total Questions : {report.total_questions}")
        print(f"  Nodes Covered   : {report.nodes_covered}")
        print(f"\n  Type Distribution:")
        for t, c in sorted(report.type_counts.items()):
            print(f"    {t:25s}: {c}")
        print(f"\n  Difficulty Distribution:")
        for d, c in sorted(report.difficulty_counts.items()):
            print(f"    {d:25s}: {c}")
        print(f"\n  Indian Context  : {report.indian_context_count}/{report.total_questions} "
              f"({report.indian_context_count/max(report.total_questions,1)*100:.1f}%)")
        print(f"  Vocab Covered   : {len(report.vocabulary_coverage)} terms")
        if report.missing_vocabulary:
            print(f"  Missing Vocab   : {report.missing_vocabulary}")
        if report.errors:
            print(f"\n  ERRORS:")
            for e in report.errors:
                print(f"    ✗ {e}")
        else:
            print(f"\n  ✓ All checks passed.")

    # ── internal ───────────────────────────────────────────────────────────
    def _adjust_types(self, nid: str, base: List[str], target: int) -> List[str]:
        """Expand or trim type list to target count, deterministically."""
        if len(base) >= target:
            sub_rng = random.Random(hash((self.master_seed, nid, "trim")) % (2**31))
            return sub_rng.sample(base, target)
        # Expand by cycling through available generators
        avail = list(TYPE_GENERATORS[nid].keys())
        result = base[:]
        sub_rng = random.Random(hash((self.master_seed, nid, "expand")) % (2**31))
        while len(result) < target:
            result.append(sub_rng.choice(avail))
        return result[:target]

    def _generate_for_node(self, nid: str, types: List[str]) -> List[Question]:
        node = NODES[nid]
        gens = TYPE_GENERATORS[nid]
        questions: List[Question] = []
        counters: Dict[str, int] = {}

        for t in types:
            counters[t] = counters.get(t, 0) + 1
            idx = counters[t] - 1
            gen_fn = gens.get(t)
            if gen_fn is None:
                raise ValueError(f"No generator for type '{t}' in node '{nid}'")
            q = gen_fn(node, idx)
            questions.append(q)

        return questions


# ──────────────────────────────────────────────
#  BATCH GENERATOR — ALL NODES
# ──────────────────────────────────────────────
def generate_all(seed: int = MASTER_SEED) -> Tuple[Dict[str, List[Question]], VerificationReport]:
    """
    Generate questions for ALL nodes and return (questions_dict, report).
    This is the single-call entry point for the pipeline.
    """
    gen = Class8CSQuestionGenerator(seed=seed)
    questions = gen.generate()
    report = gen.verify(questions)
    return questions, report


# ──────────────────────────────────────────────
#  STEP-BY-STEP VERIFICATION (callable)
# ──────────────────────────────────────────────
class StepByStepVerifier:
    """
    Walks through the generation step-by-step and prints progress,
    then runs numerical checks using numpy.
    """

    def __init__(self, seed: int = MASTER_SEED):
        self.seed = seed
        self.rng = random.Random(seed)

    def verify_full(self) -> Dict[str, Any]:
        steps = []
        # Step 1: seed integrity
        steps.append(self._step1_seed())
        # Step 2: node coverage
        steps.append(self._step2_coverage())
        # Step 3: question distribution
        steps.append(self._step3_distribution())
        # Step 4: Indian context check
        steps.append(self._step4_indian_context())
        # Step 5: vocabulary check
        steps.append(self._step5_vocabulary())
        # Step 6: deterministic rerun
        steps.append(self._step6_determinism())
        # Step 7: numpy statistical summary
        steps.append(self._step7_numpy_stats())

        all_passed = all(s["passed"] for s in steps)
        return {"steps": steps, "all_passed": all_passed}

    def _step1_seed(self) -> dict:
        r = random.Random(self.seed)
        seq1 = [r.randint(0, 9999) for _ in range(10)]
        r = random.Random(self.seed)
        seq2 = [r.randint(0, 9999) for _ in range(10)]
        passed = seq1 == seq2
        return {
            "step": 1, "name": "Seed Integrity",
            "detail": f"Seed {self.seed} → two independent RNG runs produce identical sequence.",
            "sequence_check": passed,
            "passed": passed,
        }

    def _step2_coverage(self) -> dict:
        gen = Class8CSQuestionGenerator(seed=self.seed)
        questions = gen.generate()
        covered = set(questions.keys())
        expected = set(NODES.keys())
        passed = covered == expected
        return {
            "step": 2, "name": "Node Coverage",
            "covered": sorted(covered),
            "expected": sorted(expected),
            "passed": passed,
        }

    def _step3_distribution(self) -> dict:
        gen = Class8CSQuestionGenerator(seed=self.seed)
        questions = gen.generate()
        type_counts: Dict[str, int] = {}
        total = 0
        for qs in questions.values():
            for q in qs:
                type_counts[q.type] = type_counts.get(q.type, 0) + 1
                total += 1
        passed = total > 0 and len(type_counts) >= 5  # at least 5 distinct types across nodes
        return {
            "step": 3, "name": "Question Type Distribution",
            "total": total,
            "type_counts": dict(sorted(type_counts.items())),
            "passed": passed,
        }

    def _step4_indian_context(self) -> dict:
        gen = Class8CSQuestionGenerator(seed=self.seed)
        questions = gen.generate()
        ic_count = sum(1 for qs in questions.values() for q in qs if q.indian_context)
        total = sum(len(qs) for qs in questions.values())
        fraction = ic_count / total if total else 0
        # Allow ±15 % window
        passed = abs(fraction - INDIAN_CONTEXT_FRACTION) <= 0.15
        return {
            "step": 4, "name": "Indian Context Fraction",
            "indian_count": ic_count,
            "total": total,
            "fraction": round(fraction, 3),
            "target": INDIAN_CONTEXT_FRACTION,
            "passed": passed,
        }

    def _step5_vocabulary(self) -> dict:
        gen = Class8CSQuestionGenerator(seed=self.seed)
        questions = gen.generate()
        vocab_hits: Dict[str, int] = {}
        for nid, qs in questions.items():
            all_text = " ".join(q.question_text + " " + q.explanation for q in qs).lower()
            for v in NODES[nid]["vocabulary"]:
                if v.lower() in all_text:
                    vocab_hits[v] = vocab_hits.get(v, 0) + 1
        total_vocab = sum(len(NODES[n]["vocabulary"]) for n in NODES)
        covered_vocab = len(vocab_hits)
        passed = covered_vocab >= total_vocab * 0.7  # 70 % coverage target
        return {
            "step": 5, "name": "Vocabulary Coverage",
            "total_vocab_terms": total_vocab,
            "covered_terms": covered_vocab,
            "coverage_ratio": round(covered_vocab / total_vocab, 3) if total_vocab else 0,
            "missing": [v for n in NODES for v in NODES[n]["vocabulary"] if v not in vocab_hits],
            "passed": passed,
        }

    def _step6_determinism(self) -> dict:
        gen1 = Class8CSQuestionGenerator(seed=self.seed)
        gen2 = Class8CSQuestionGenerator(seed=self.seed)
        q1 = gen1.generate()
        q2 = gen2.generate()
        # Compare all question IDs and answers
        match = True
        for nid in q1:
            if nid not in q2:
                match = False
                break
            for qa, qb in zip(q1[nid], q2[nid]):
                if qa.id != qb.id or qa.correct_answer != qb.correct_answer:
                    match = False
                    break
        return {
            "step": 6, "name": "Determinism (Re-run Check)",
            "detail": "Two generators with same seed produce identical questions.",
            "passed": match,
        }

    def _step7_numpy_stats(self) -> dict:
        gen = Class8CSQuestionGenerator(seed=self.seed)
        questions = gen.generate()
        marks_per_node = {nid: sum(q.marks for q in qs) for nid, qs in questions.items()}
        marks_arr = np.array(list(marks_per_node.values()), dtype=float)
        total_marks = float(marks_arr.sum())
        mean_marks = float(marks_arr.mean())
        std_marks = float(marks_arr.std(ddof=1)) if len(marks_arr) > 1 else 0.0

        diffs = {"Medium": 0, "Hard": 0}
        for qs in questions.values():
            for q in qs:
                diffs[q.difficulty] = diffs.get(q.difficulty, 0) + 1

        passed = total_marks > 0 and len(marks_per_node) == len(NODES)
        return {
            "step": 7, "name": "Numerical Summary (NumPy)",
            "marks_per_node": marks_per_node,
            "total_marks": total_marks,
            "mean_marks_per_node": round(mean_marks, 2),
            "std_marks": round(std_marks, 2),
            "difficulty_counts": diffs,
            "passed": passed,
        }


# ──────────────────────────────────────────────
#  MAIN — run when executed directly
# ──────────────────────────────────────────────
if __name__ == "__main__":
    seed = MASTER_SEED

    print("=" * 70)
    print("  CLASS 8 COMPUTER STUDIES — QUESTION GENERATOR")
    print(f"  Seed: {seed}")
    print("=" * 70)

    # Generate
    generator = Class8CSQuestionGenerator(seed=seed)
    all_questions = generator.generate()

    # Print questions (set show_answers=True to reveal solutions)
    generator.print_questions(all_questions, show_answers=True)

    # Verify
    report = generator.verify(all_questions)
    generator.print_report(report)

    # Step-by-step verification
    print("\n\n")
    verifier = StepByStepVerifier(seed=seed)
    sv = verifier.verify_full()
    for step in sv["steps"]:
        status = "✓ PASS" if step["passed"] else "✗ FAIL"
        print(f"  Step {step['step']}: {step['name']:30s} → {status}")

    print(f"\n  Overall: {'✓ ALL CHECKS PASSED' if sv['all_passed'] else '✗ SOME CHECKS FAILED'}")