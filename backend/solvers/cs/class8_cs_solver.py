"""
cs/class8_cs_solver.py
Solver + Explanation Engine for Computer Studies Class 8

Nodes covered:
  c8_cs_001 : Software types (system, application, utility)
  c8_cs_002 : Operating system – definition, need, and functions

All verification is deterministic — no LLM calls, no network access.
"""

from __future__ import annotations

import random
import textwrap
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class Problem:
    """Lightweight DTO returned by every generator."""
    node_id:        str
    problem_type:   str
    question:       str
    correct_answer: Any          # str | int
    choices:        List[str]
    explanation:    str
    difficulty:     str  = "Medium"
    topic:          str  = ""


@dataclass
class SessionStats:
    """Accumulates per-session correctness metrics."""
    total_generated: int = 0
    total_checked:   int = 0
    total_correct:   int = 0
    total_wrong:     int = 0
    by_node:         Dict[str, Dict[str, int]] = field(default_factory=dict)

    def record_generation(self, node_id: str) -> None:
        self.total_generated += 1
        self.by_node.setdefault(node_id, {"generated": 0, "checked": 0,
                                          "correct": 0, "wrong": 0})
        self.by_node[node_id]["generated"] += 1

    def record_check(self, node_id: str, is_correct: bool) -> None:
        self.total_checked += 1
        if is_correct:
            self.total_correct += 1
        else:
            self.total_wrong += 1
        nb = self.by_node.setdefault(node_id, {"generated": 0, "checked": 0,
                                               "correct": 0, "wrong": 0})
        nb["checked"] += 1
        if is_correct:
            nb["correct"] += 1
        else:
            nb["wrong"] += 1

    @property
    def accuracy(self) -> float:
        if self.total_checked == 0:
            return 0.0
        return round(self.total_correct / self.total_checked * 100, 1)

    def summary(self) -> str:
        lines = [
            f"Total generated : {self.total_generated}",
            f"Total checked   : {self.total_checked}",
            f"Correct         : {self.total_correct}",
            f"Wrong           : {self.total_wrong}",
            f"Accuracy        : {self.accuracy}%",
            "",
            "Per-node breakdown:",
        ]
        for nid, s in self.by_node.items():
            acc = (s["correct"] / s["checked"] * 100) if s["checked"] else 0.0
            lines.append(
                f"  {nid}: {s['checked']} checked | "
                f"{s['correct']} correct | {acc:.1f}% accuracy"
            )
        return "\n".join(lines)


@dataclass
class CheckResult:
    """Returned by every solver.check_answer() call."""
    is_correct:   bool
    correct_answer: Any
    explanation:   str
    feedback:      str = ""


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

class BaseProblemGenerator(ABC):
    """
    Subclass this for each problem type.

    Parameters
    ----------
    seed : int | None
        Explicit seed for reproducibility.  When *None* a fresh random seed
        is drawn from the OS RNG so every run is different.
    """

    node_id:   str = ""
    node_label: str = ""

    # ------------------------------------------------------------------
    def __init__(self, seed: Optional[int] = None) -> None:
        self._rng = random.Random(seed)   # isolated PRNG — no global state
        self._seed = seed if seed is not None else self._rng.randint(0, 2**31 - 1)

    # ------------------------------------------------------------------
    @abstractmethod
    def generate(self) -> Problem:
        """Build and return a fresh Problem instance."""
        ...

    @abstractmethod
    def check_answer(self, problem: Problem, user_answer: Any) -> CheckResult:
        """Verify *user_answer* against *problem.correct_answer*."""
        ...

    # ------------------------------------------------------------------
    @property
    def seed(self) -> int:
        return self._seed

    def _shuffle(self, items: List[Any]) -> List[Any]:
        """Return a shuffled copy — does not mutate the input list."""
        out = list(items)
        self._rng.shuffle(out)
        return out


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

class SoftwareClassificationProblem(BaseProblemGenerator):
    node_id    = "c8_cs_001"
    node_label = "Software Types – Classification"

    _ITEMS: List[tuple] = [
        # (item, category, brief_why)
        ("Windows",      "System Software",
         "It manages the computer's hardware and runs all other programs."),
        ("Linux",        "System Software",
         "It is an open-source operating system that manages hardware resources."),
        ("MS Word",      "Application Software",
         "It lets users create and edit documents — a specific user task."),
        ("MS Excel",     "Application Software",
         "It lets users work with spreadsheets and data — a specific user task."),
        ("Chrome",       "Application Software",
         "It lets users browse websites — a specific user task."),
        ("VLC Media Player", "Application Software",
         "It plays audio and video files for the user."),
        ("Antivirus",    "Utility Software",
         "It protects the computer from viruses and malware."),
        ("Disk Cleanup", "Utility Software",
         "It removes unnecessary files to free up disk space."),
        ("WinRAR",       "Utility Software",
         "It compresses and decompresses files to save storage."),
        ("Notepad",      "Application Software",
         "It lets users write and save plain-text files."),
    ]

    _CATEGORIES = ["System Software", "Application Software", "Utility Software"]

    def _build_distractors(self, correct: str) -> List[str]:
        """Return two wrong category labels, shuffled with the correct one."""
        wrong = [c for c in self._CATEGORIES if c != correct]
        return self._shuffle([correct] + wrong)   # returns 3-item list

    def generate(self) -> Problem:
        item, category, _why = self._rng.choice(self._ITEMS)
        choices = self._build_distractors(category)
        correct_index = choices.index(category)

        question = (
            f"'{item}' is an example of which type of software?\n"
            + "\n".join(f"  {i+1}. {c}" for i, c in enumerate(choices))
        )
        explanation = (
            f"'{item}' is {category}.\n\n"
            f"Reason: {_why}\n\n"
            "Quick-rule summary:\n"
            "  • System Software  – manages hardware and runs the computer "
            "(e.g., Windows, Linux)\n"
            "  • Application Software – performs specific tasks for the user "
            "(e.g., Word, Chrome)\n"
            "  • Utility Software – maintains and optimises the computer "
            "(e.g., Antivirus, Disk Cleanup)"
        )

        return Problem(
            node_id        = self.node_id,
            problem_type   = "SoftwareClassification",
            question       = question,
            correct_answer = correct_index + 1,    # 1-based for the user
            choices        = choices,
            explanation    = explanation,
            difficulty     = "Medium",
            topic          = "Software types",
        )

    def check_answer(self, problem: Problem, user_answer: Any) -> CheckResult:
        try:
            ans = int(user_answer)
        except (TypeError, ValueError):
            return CheckResult(
                is_correct    = False,
                correct_answer= problem.correct_answer,
                explanation   = problem.explanation,
                feedback      = "Please enter a number (1, 2, or 3).",
            )
        is_correct = ans == problem.correct_answer
        feedback = (
            "Correct! Well done." if is_correct
            else f"Incorrect. The correct answer is option "
                 f"{problem.correct_answer}: {problem.choices[problem.correct_answer - 1]}."
        )
        return CheckResult(
            is_correct    = is_correct,
            correct_answer= problem.correct_answer,
            explanation   = problem.explanation,
            feedback      = feedback,
        )


class SoftwareFunctionsProblem(BaseProblemGenerator):
    """
    Scenario-based: identify the primary purpose of a software type.
    Correct answer is the 1-based index of the right option.
    """
    node_id    = "c8_cs_001"
    node_label = "Software Types – Functions"

    _SCENARIOS: List[tuple] = [
        # (scenario, correct_category, distractor_set)
        (
            "A program that runs in the background, manages the CPU and "
            "memory, and lets other programs run on the computer.",
            "System Software",
            ["Application Software", "Utility Software"],
        ),
        (
            "A program that lets you browse the internet and watch videos "
            "— it does not control the computer's hardware.",
            "Application Software",
            ["System Software", "Utility Software"],
        ),
        (
            "A program that scans your computer for harmful files and "
            "removes them to keep the system safe.",
            "Utility Software",
            ["Application Software", "System Software"],
        ),
        (
            "A program that compresses large files so they take less space "
            "on your hard drive.",
            "Utility Software",
            ["Application Software", "System Software"],
        ),
        (
            "A program that manages files, creates folders, and helps you "
            "save and retrieve documents on your computer.",
            "System Software",
            ["Application Software", "Utility Software"],
        ),
        (
            "A program that lets you create presentations with slides, "
            "images, and animations for a school project.",
            "Application Software",
            ["System Software", "Utility Software"],
        ),
    ]

    def generate(self) -> Problem:
        scenario, correct, distractors = self._rng.choice(self._SCENARIOS)
        choices = self._shuffle([correct] + distractors)
        correct_idx = choices.index(correct)

        question = (
            f"{scenario}\n"
            "What type of software is being described?\n"
            + "\n".join(f"  {i+1}. {c}" for i, c in enumerate(choices))
        )
        explanation = (
            f"This describes {correct}.\n\n"
            "System Software manages hardware resources and provides a platform "
            "for other software to run.\n"
            "Application Software performs specific tasks the user wants to do.\n"
            "Utility Software maintains and optimises the computer system."
        )

        return Problem(
            node_id        = self.node_id,
            problem_type   = "SoftwareFunctions",
            question       = question,
            correct_answer = correct_idx + 1,
            choices        = choices,
            explanation    = explanation,
            difficulty     = "Medium",
            topic          = "Software types – functions",
        )

    def check_answer(self, problem: Problem, user_answer: Any) -> CheckResult:
        try:
            ans = int(user_answer)
        except (TypeError, ValueError):
            return CheckResult(
                is_correct    = False,
                correct_answer= problem.correct_answer,
                explanation   = problem.explanation,
                feedback      = "Please enter a number (1, 2, or 3).",
            )
        is_correct = ans == problem.correct_answer
        feedback = (
            "Correct! You understand software functions well." if is_correct
            else f"Incorrect. The correct answer is option "
                 f"{problem.correct_answer}: "
                 f"{problem.choices[problem.correct_answer - 1]}."
        )
        return CheckResult(
            is_correct    = is_correct,
            correct_answer= problem.correct_answer,
            explanation   = problem.explanation,
            feedback      = feedback,
        )


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

class OSDefinitionProblem(BaseProblemGenerator):
    """What-is definition question about the Operating System."""
    node_id    = "c8_cs_002"
    node_label = "OS – Definition"

    _DEFINITIONS: List[tuple] = [
        # (question_text, correct_option, options, explanation)
        (
            "What is an Operating System (OS)?",
            "System software that manages hardware and software resources",
            [
                "A type of application software used for browsing",
                "System software that manages hardware and software resources",
                "A hardware component that stores data",
                "A programming language used to write software",
            ],
            (
                "An Operating System is system software that manages the "
                "computer's hardware and software resources.\n\n"
                "It acts as an intermediary between the user and the hardware, "
                "ensuring that all parts of the computer work together smoothly."
            ),
        ),
        (
            "Which of the following best describes the primary role of an OS?",
            "To manage and coordinate computer hardware and software",
            [
                "To design computer hardware components",
                "To manage and coordinate computer hardware and software",
                "To provide internet connectivity to the computer",
                "To create new application programs",
            ],
            (
                "The primary role of an OS is to manage and coordinate all "
                "hardware and software resources of the computer.\n\n"
                "Without an OS, the user would have to control every piece of "
                "hardware manually, which is impractical."
            ),
        ),
    ]

    def generate(self) -> Problem:
        qtext, correct, options, explanation = self._rng.choice(self._DEFINITIONS)
        choices    = self._shuffle(options)
        correct_idx = choices.index(correct) + 1   # 1-based

        question = qtext + "\n" + "\n".join(
            f"  {i+1}. {c}" for i, c in enumerate(choices)
        )
        return Problem(
            node_id        = self.node_id,
            problem_type   = "OSDefinition",
            question       = question,
            correct_answer = correct_idx,
            choices        = choices,
            explanation    = explanation,
            difficulty     = "Medium",
            topic          = "OS – Definition",
        )

    def check_answer(self, problem: Problem, user_answer: Any) -> CheckResult:
        try:
            ans = int(user_answer)
        except (TypeError, ValueError):
            return CheckResult(
                is_correct    = False,
                correct_answer= problem.correct_answer,
                explanation   = problem.explanation,
                feedback      = "Please enter a number (1, 2, 3, or 4).",
            )
        is_correct = ans == problem.correct_answer
        feedback = (
            "Correct! The OS is indeed the manager of all resources." if is_correct
            else f"Incorrect. The correct answer is option "
                 f"{problem.correct_answer}: "
                 f"{problem.choices[problem.correct_answer - 1]}."
        )
        return CheckResult(
            is_correct    = is_correct,
            correct_answer= problem.correct_answer,
            explanation   = problem.explanation,
            feedback      = feedback,
        )


class OSNeedsProblem(BaseProblemGenerator):
    """What is the OS *used for* — need/function question."""
    node_id    = "c8_cs_002"
    node_label = "OS – Needs / Why we need an OS"

    _NEEDS: List[tuple] = [
        # (question_text, correct, distractors, explanation)
        (
            "Why does a computer need an Operating System?",
            "To manage hardware resources and provide a platform for applications",
            [
                "To increase the physical size of the hard disk",
                "To manage hardware resources and provide a platform for applications",
                "To replace all application software",
                "To make the computer screen brighter",
            ],
            (
                "A computer needs an OS because the OS manages hardware resources "
                "(CPU, memory, devices) and provides a platform on which "
                "application software can run.\n\n"
                "Without an OS, users would need to control each hardware "
                "device directly, which is extremely complex."
            ),
        ),
        (
            "Which of the following is a primary NEED of an Operating System?",
            "Resource management (CPU, memory, I/O devices)",
            [
                "Creating documents and spreadsheets",
                "Resource management (CPU, memory, I/O devices)",
                "Designing websites",
                "Playing music and videos",
            ],
            (
                "Resource management is a primary need of an OS.\n\n"
                "The OS allocates CPU time, RAM, and controls input/output "
                "devices so that every running program gets what it needs "
                "without conflicts."
            ),
        ),
        (
            "Without an Operating System, a computer user would have to:",
            "Manually control each hardware component using complex commands",
            [
                "Browse the internet normally",
                "Manually control each hardware component using complex commands",
                "Use MS Word without any issues",
                "Print documents wirelessly",
            ],
            (
                "Without an OS, the user would need to give direct, low-level "
                "commands to every piece of hardware — an impossible task for "
                "ordinary users.\n\n"
                "The OS abstracts away this complexity so users can interact "
                "with the computer through a simple interface."
            ),
        ),
    ]

    def generate(self) -> Problem:
        qtext, correct, distractors, explanation = self._rng.choice(self._NEEDS)
        choices     = self._shuffle([correct] + distractors)
        correct_idx = choices.index(correct) + 1

        question = qtext + "\n" + "\n".join(
            f"  {i+1}. {c}" for i, c in enumerate(choices)
        )
        return Problem(
            node_id        = self.node_id,
            problem_type   = "OSNeeds",
            question       = question,
            correct_answer = correct_idx,
            choices        = choices,
            explanation    = explanation,
            difficulty     = "Hard",
            topic          = "OS – Needs",
        )

    def check_answer(self, problem: Problem, user_answer: Any) -> CheckResult:
        try:
            ans = int(user_answer)
        except (TypeError, ValueError):
            return CheckResult(
                is_correct    = False,
                correct_answer= problem.correct_answer,
                explanation   = problem.explanation,
                feedback      = "Please enter a number (1, 2, 3, or 4).",
            )
        is_correct = ans == problem.correct_answer
        feedback = (
            "Correct! You clearly understand why an OS is essential." if is_correct
            else f"Incorrect. The correct answer is option "
                 f"{problem.correct_answer}: "
                 f"{problem.choices[problem.correct_answer - 1]}."
        )
        return CheckResult(
            is_correct    = is_correct,
            correct_answer= problem.correct_answer,
            explanation   = problem.explanation,
            feedback      = feedback,
        )


class OSFunctionsProblem(BaseProblemGenerator):
    """
    Identify which of four options is NOT a function of an OS,
    OR identify which IS a key function of an OS.
    """
    node_id    = "c8_cs_002"
    node_label = "OS – Key Functions"

    _POSITIVE: List[tuple] = [
        # (question, correct, distractors, explanation)
        (
            "Which of the following is a KEY FUNCTION of an Operating System?",
            "Memory management – allocating RAM to running programs",
            [
                "Designing website layouts",
                "Memory management – allocating RAM to running programs",
                "Writing computer programs",
                "Printing photographs using a photo editor",
            ],
            (
                "Memory management is a key function of an OS.\n\n"
                "The OS keeps track of every byte of memory and decides which "
                "program gets how much RAM. When a program closes, the OS "
                "reclaims that memory so another program can use it."
            ),
        ),
        (
            "Which of the following is a KEY FUNCTION of an Operating System?",
            "Multitasking – running multiple programs at the same time",
            [
                "Multitasking – running multiple programs at the same time",
                "Writing source code in C++",
                "Creating animated GIF images",
                "Managing a company's employee database",
            ],
            (
                "Multitasking is a key function of an OS.\n\n"
                "Through multitasking, the OS rapidly switches between programs "
                "giving the illusion that they are running simultaneously. "
                "This lets you type in Word while music plays and a browser "
                "downloads a file — all at once."
            ),
        ),
        (
            "Which of the following is a KEY FUNCTION of an Operating System?",
            "Security – user authentication and access control",
            [
                "Formatting text in bold and italics",
                "Creating 3D computer graphics",
                "Security – user authentication and access control",
                "Scanning documents with a flatbed scanner",
            ],
            (
                "Security is a key function of an OS.\n\n"
                "The OS uses passwords, user accounts, and permission settings "
                "to protect data from unauthorised access and keep the system "
                "safe from threats."
            ),
        ),
        (
            "Which of the following is a KEY FUNCTION of an Operating System?",
            "File management – creating, organising and storing files",
            [
                "File management – creating, organising and storing files",
                "Retouching photographs with filters",
                "Streaming live video to audiences",
                "Solving mathematical equations in a spreadsheet",
            ],
            (
                "File management is a key function of an OS.\n\n"
                "The OS keeps track of every file on the computer — where it "
                "is stored, its name, size, and type — and provides a way for "
                "users to create, rename, move, and delete files."
            ),
        ),
    ]

    def generate(self) -> Problem:
        qtext, correct, distractors, explanation = self._rng.choice(self._POSITIVE)
        choices     = self._shuffle([correct] + distractors)
        correct_idx = choices.index(correct) + 1

        question = qtext + "\n" + "\n".join(
            f"  {i+1}. {c}" for i, c in enumerate(choices)
        )
        return Problem(
            node_id        = self.node_id,
            problem_type   = "OSFunctions",
            question       = question,
            correct_answer = correct_idx,
            choices        = choices,
            explanation    = explanation,
            difficulty     = "Hard",
            topic          = "OS – Key Functions",
        )

    def check_answer(self, problem: Problem, user_answer: Any) -> CheckResult:
        try:
            ans = int(user_answer)
        except (TypeError, ValueError):
            return CheckResult(
                is_correct    = False,
                correct_answer= problem.correct_answer,
                explanation   = problem.explanation,
                feedback      = "Please enter a number (1, 2, 3, or 4).",
            )
        is_correct = ans == problem.correct_answer
        feedback = (
            "Correct! That is indeed a key function of an OS." if is_correct
            else f"Incorrect. The correct answer is option "
                 f"{problem.correct_answer}: "
                 f"{problem.choices[problem.correct_answer - 1]}."
        )
        return CheckResult(
            is_correct    = is_correct,
            correct_answer= problem.correct_answer,
            explanation   = problem.explanation,
            feedback      = feedback,
        )


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

class ExplanationEngine:
    """
    Returns rich, syllabus-aligned explanations keyed by (node_id, problem_type).
    Keeps a cache so the same explanation is returned consistently.
    """

    _CACHE: Dict[str, str] = {}

    @classmethod
    def explain(cls, problem: Problem) -> str:
        key = f"{problem.node_id}::{problem.problem_type}"
        if key not in cls._CACHE:
            cls._CACHE[key] = cls._build(problem)
        return cls._CACHE[key]

    @classmethod
    def _build(cls, problem: Problem) -> str:
        nid   = problem.node_id
        ptype = problem.problem_type

        if nid == "c8_cs_001" and ptype in ("SoftwareClassification",
                                             "SoftwareFunctions"):
            return textwrap.dedent(f"""\
                ┌─ Concept: Software Types ──────────────────────────────┐
                │                                                         │
                │  System Software                                        │
                │  • Runs the computer; manages hardware & resources      │
                │  • Examples: Windows, Linux, device drivers              │
                │  • Analogy: the manager of a building                    │
                │                                                         │
                │  Application Software                                    │
                │  • Performs specific tasks for the user                  │
                │  • Examples: MS Word, Chrome, VLC Player                 │
                │  • Analogy: tools in a toolbox                           │
                │                                                         │
                │  Utility Software                                        │
                │  • Maintains and optimises the computer                  │
                │  • Examples: Antivirus, Disk Cleanup, WinRAR             │
                │  • Analogy: maintenance staff keeping a building healthy  │
                │                                                         │
                └─────────────────────────────────────────────────────────┘
                {problem.explanation}""")

        if nid == "c8_cs_002" and ptype == "OSDefinition":
            return textwrap.dedent("""\
                ┌─ Concept: What is an Operating System? ────────────────┐
                │                                                         │
                │  An Operating System (OS) is system software that:      │
                │   1. Manages the computer's hardware (CPU, memory, etc.) │
                │   2. Provides an interface between user and computer     │
                │   3. Manages files and folders on the computer           │
                │   4. Runs and manages application software               │
                │                                                         │
                │  Without an OS, a computer cannot function.              │
                │  The OS is the most important system software.           │
                │                                                         │
                └─────────────────────────────────────────────────────────┘
                """ + problem.explanation)

        if nid == "c8_cs_002" and ptype in ("OSNeeds", "OSFunctions"):
            return textwrap.dedent("""\
                ┌─ Concept: Why We Need an OS + OS Functions ─────────────┐
                │                                                         │
                │  Why we NEED an OS:                                      │
                │   • Resource management – CPU, memory, devices           │
                │   • User interface – lets people interact with computer  │
                │   • File management – creates, organises, stores files   │
                │                                                         │
                │  Key OS FUNCTIONS:                                       │
                │   • Multitasking – runs many programs at once            │
                │   • Memory management – allocates RAM to programs        │
                │   • Security – passwords, user accounts, access control  │
                │   • File management – tracks, stores, retrieves files    │
                │                                                         │
                └─────────────────────────────────────────────────────────┘
                """ + problem.explanation)

        return problem.explanation


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

class SolverEngine:
    """
    Central dispatcher.

    Usage
    -----
    >>> solver = SolverEngine()
    >>> problem = solver.generate("c8_cs_001", "SoftwareClassification", seed=42)
    >>> result  = solver.check_answer(problem, 1)
    >>> print(result.feedback, result.explanation)
    """

    _REGISTRY: Dict[str, type] = {}

    @classmethod
    def register(cls, node_id: str, problem_type: str,
                 generator_cls: type) -> None:
        cls._REGISTRY[f"{node_id}::{problem_type}"] = generator_cls

    def __init__(self) -> None:
        self._generators: Dict[str, BaseProblemGenerator] = {}
        self.stats = SessionStats()

    # ------------------------------------------------------------------
    def _get_generator(self, node_id: str, problem_type: str,
                       seed: Optional[int]) -> BaseProblemGenerator:
        key = f"{node_id}::{problem_type}"
        if key not in self._REGISTRY:
            raise ValueError(
                f"Unknown problem type '{problem_type}' for node '{node_id}'. "
                f"Available: {list(self._REGISTRY.keys())}"
            )
        if key not in self._generators:
            self._generators[key] = self._REGISTRY[key](seed=seed)
        return self._generators[key]

    # ------------------------------------------------------------------
    def generate(self, node_id: str, problem_type: str,
                 seed: Optional[int] = None) -> Problem:
        """
        Generate a new problem.

        Parameters
        ----------
        node_id      : e.g. "c8_cs_001"
        problem_type : e.g. "SoftwareClassification"
        seed         : optional integer for reproducibility
        """
        gen  = self._get_generator(node_id, problem_type, seed)
        prob = gen.generate()
        self.stats.record_generation(node_id)
        return prob

    # ------------------------------------------------------------------
    def check_answer(self, problem: Problem,
                     user_answer: Any) -> CheckResult:
        """
        Verify the user's answer and return a CheckResult.

        Generates a fresh explanation each call so no stale data leaks.
        """
        key = f"{problem.node_id}::{problem.problem_type}"
        gen = self._generators.get(key) or self._get_generator(
            problem.node_id, problem.problem_type, None
        )
        result = gen.check_answer(problem, user_answer)
        result.explanation = ExplanationEngine.explain(problem)
        self.stats.record_check(problem.node_id, result.is_correct)
        return result

    # ------------------------------------------------------------------
    def get_explanation(self, problem: Problem) -> str:
        """Return the syllabus-aligned explanation for *problem*."""
        return ExplanationEngine.explain(problem)

    def get_stats(self) -> SessionStats:
        """Return cumulative session statistics."""
        return self.stats


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

SolverEngine.register("c8_cs_001", "SoftwareClassification",
                      SoftwareClassificationProblem)
SolverEngine.register("c8_cs_001", "SoftwareFunctions",
                      SoftwareFunctionsProblem)
SolverEngine.register("c8_cs_002", "OSDefinition",
                      OSDefinitionProblem)
SolverEngine.register("c8_cs_002", "OSNeeds",
                      OSNeedsProblem)
SolverEngine.register("c8_cs_002", "OSFunctions",
                      OSFunctionsProblem)


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def _self_test() -> None:
    engine = SolverEngine()
    all_types = [
        ("c8_cs_001", "SoftwareClassification"),
        ("c8_cs_001", "SoftwareFunctions"),
        ("c8_cs_002", "OSDefinition"),
        ("c8_cs_002", "OSNeeds"),
        ("c8_cs_002", "OSFunctions"),
    ]

    print("=" * 60)
    print("  Self-test: generating & verifying one problem per type")
    print("=" * 60)

    for node_id, ptype in all_types:
        problem = engine.generate(node_id, ptype, seed=12345)
        result  = engine.check_answer(problem, problem.correct_answer)
        assert result.is_correct, (
            f"Self-test FAILED for {node_id}/{ptype}: "
            f"expected {problem.correct_answer}"
        )
        status = "✓ PASS"
        print(f"  {status}  [{node_id}] {ptype}")

    print()
    print("Session stats:")
    print(engine.get_stats().summary())
    print()
    print("All self-tests passed.")


if __name__ == "__main__":
    _self_test()