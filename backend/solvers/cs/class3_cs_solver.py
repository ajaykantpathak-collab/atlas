# /// vendor: addcp=1
"""
Solver for Class 3 Computer Studies (CISCE Curriculum)
Covers: c3_cs_001, c3_cs_002, c3_cs_003
Deterministic, no LLM — uses SymPy-free pure-Python logic.
"""

import hashlib
import json
import math
import os
import re
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Optional

# ─── DATA STRUCTURES ────────────────────────────────────────────────────────

class NodeID(Enum):
    C3_CS_001 = "c3_cs_001"
    C3_CS_002 = "c3_cs_002"
    C3_CS_003 = "c3_cs_003"


class QType(Enum):
    MCQ = "mcq"
    TRUE_FALSE = "true_false"
    FILL_BLANK = "fill_blank"
    MATCH = "match"
    SHORT_ANSWER = "short_answer"


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


@dataclass
class QRecord:
    """Single question record."""
    node: NodeID
    qtype: QType
    difficulty: Difficulty
    question: str
    options: list[str] = field(default_factory=list)
    answer: Any = None
    explanation: str = ""

    def to_dict(self) -> dict:
        return {
            "node": self.node.value,
            "qtype": self.qtype.value,
            "difficulty": self.difficulty.value,
            "question": self.question,
            "options": self.options,
            "answer": self.answer,
            "explanation": self.explanation,
        }


@dataclass
class SolverResult:
    correct: bool
    user_answer: Any
    expected_answer: Any
    explanation: str
    score_awarded: float
    max_score: float

    def to_dict(self) -> dict:
        return {
            "correct": self.correct,
            "user_answer": str(self.user_answer),
            "expected_answer": str(self.expected_answer),
            "explanation": self.explanation,
            "score_awarded": self.score_awarded,
            "max_score": self.max_score,
        }


# ─── CANONICAL ANSWER BANKS ─────────────────────────────────────────────────

# Each entry: (node, question_text_hash, canonical_answer, explanation)
BANK: list[tuple[str, str, Any, str]] = []


def _add(node: NodeID, qtext: str, answer: Any, explanation: str = ""):
    key = hashlib.md5(qtext.encode()).hexdigest()[:12]
    BANK.append((node.value, key, answer, explanation))


# ── c3_cs_001: Hardware vs Software ─────────────────────────────────────────
_add(NodeID.C3_CS_001,
     "Which of the following is a hardware component of a computer?",
     "monitor",
     "Hardware = physical parts you can touch. Monitor is a screen you can touch.")

_add(NodeID.C3_CS_001,
     "Which of the following is a software component of a computer?",
     "paint program",
     "Software = programs inside the computer. A paint program is software.")

_add(NodeID.C3_CS_001,  # intentional alias-style: let's use proper
     "Hardware refers to:",
     "the physical parts of a computer you can touch",
     "Hardware = monitor, keyboard, mouse, CPU — all tangible parts.")

_add(NodeID.C3_CS_001,
     "Software refers to:",
     "the set of programs that tell hardware what to do",
     "Software directs hardware operations (e.g., Paint, Word).")

_add(NodeID.C3_CS_001,
     "The relationship between hardware and software is best described as:",
     "they work together as an integrated system",
     "Hardware provides physical capability; software provides instructions. "
     "Like a kitchen: stove, fridge, sink each have a job.")

_add(NodeID.C3_CS_001,
     "Without software, hardware is like:",
     "a body without a brain",
     "Hardware without software cannot function, just as a body without a brain cannot act.")

_add(NodeID.C3_CS_001,
     "Hardware is like the ____ of a computer.",
     "body",
     "Hardware is the tangible part, like the body. Software is the brain.")

_add(NodeID.C3_CS_001,
     "Software is like the ____ of a computer.",
     "brain",
     "Software directs what the computer does, like a brain directs a body.")

# ── c3_cs_002: Five main components ─────────────────────────────────────────
_add(NodeID.C3_CS_002,
     "What does CPU stand for?",
     "Central Processing Unit",
     "CPU = Central Processing Unit — it processes all data and instructions.")

_add(NodeID.C3_CS_002,
     "The CPU is called the ____ of the computer.",
     "brain",
     "CPU processes data and instructions — like a brain processes thoughts.")

_add(NodeID.C3_CS_002,
     "Memory (RAM) stores data:",
     "temporarily during processing",
     "RAM holds data only while the computer is ON — temporary workspace.")

_add(NodeID.C3_CS_002,
     "Which of the following is an input device?",
     "keyboard",
     "Input devices send data INTO the computer. Keyboard sends keystrokes.")

_add(NodeID.C3_CS_002,
     "Which of the following is an output device?",
     "monitor",
     "Output devices show results FROM the computer. Monitor displays output.")

_add(NodeID.C3_CS_002,
     "The input unit uses devices like:",
     "keyboard and mouse",
     "Keyboard and mouse send data to the CPU — they are input devices.")

_add(NodeID.C3_CS_002,
     "The output unit uses devices like:",
     "monitor and printer",
     "Monitor and printer show results from the computer — output devices.")

_add(NodeID.C3_CS_002,
     "Storage keeps data:",
     "permanently",
     "Storage (hard disk, SSD) saves data even when the computer is switched OFF.")

_add(NodeID.C3_CS_002,
     "Memory is like a ____ because it holds data temporarily.",
     "short-term notepad",
     "RAM = short-term notepad. Cleared when power is off.")

_add(NodeID.C3_CS_002,
     "Storage is like a ____ because it keeps data permanently.",
     "filing cabinet",
     "Hard disk = filing cabinet. Data stays even after shutdown.")

_add(NodeID.C3_CS_002,
     "Which is NOT one of the five main components of a computer system?",
     "speaker",
     "The five components: CPU, memory, input unit, output unit, storage unit. "
     "Speaker is peripheral but not listed as a main component at this level.")

# ── c3_cs_003: System software vs Application software ──────────────────────
_add(NodeID.C3_CS_003,
     "System software is software that:",
     "manages and controls computer hardware",
     "System software (e.g., OS) runs the computer and manages hardware resources.")

_add(NodeID.C3_CS_003,
     "Application software is software that:",
     "performs specific user tasks",
     "Application software (e.g., Paint, Word) helps users do specific jobs.")

_add(NodeID.C3_CS_003,
     "Which of the following is system software?",
     "Windows operating system",
     "Windows is an OS — it manages the computer. That makes it system software.")

_add(NodeID.C3_CS_003,
     "Which of the following is application software?",
     "Paint",
     "Paint is used for drawing — a specific user task. That makes it application software.")

_add(NodeID.C3_CS_003,
     "Classify: Microsoft Word is",
     "application software",
     "Word is for writing letters/documents — a specific task → application software.")

_add(NodeID.C3_CS_003,
     "Classify: Linux is",
     "system software",
     "Linux is an OS that manages hardware → system software.")

_add(NodeID.C3_CS_003,
     "Classify: A game app is",
     "application software",
     "Games perform specific tasks (entertainment) → application software.")

_add(NodeID.C3_CS_003,
     "Without system software, the computer:",
     "cannot run at all",
     "System software (OS) is essential — it loads first and manages all hardware.")

_add(NodeID.C3_CS_003,
     "Examples of application software include all EXCEPT:",
     "Windows",
     "Windows is the OS → system software, not application software.")

# ─── NORMALISED LOOKUP ───────────────────────────────────────────────────────

def _norm(s: str) -> str:
    return re.sub(r"\s+", " ", s.strip().lower())


def _find(question_text: str) -> Optional[tuple[Any, str]]:
    norm_q = _norm(question_text)
    for (_node, key, answer, explanation) in BANK:
        # match by normalised question text (stored in key lookup via md5)
        pass
    return None


# Rebuild a direct lookup: normalised question -> (answer, explanation)
_QA_LOOKUP: dict[str, tuple[Any, str]] = {}
_RAW_QUESTIONS: list[str] = []

# We need to re-derive questions from BANK entries.
# Let's hard-code the normalised question->answer mapping by re-running adds above.
# Instead, let's build it via a parallel dict registered at module load.

_RAW_QA: dict[str, tuple[Any, str]] = {
    # c3_cs_001
    "which of the following is a hardware component of a computer?": ("monitor", "Hardware = physical parts you can touch. Monitor is a screen you can touch."),
    "which of the following is a software component of a computer?": ("paint program", "Software = programs inside the computer. A paint program is software."),
    "hardware refers to:": ("the physical parts of a computer you can touch", "Hardware = monitor, keyboard, mouse, CPU — all tangible parts."),
    "software refers to:": ("the set of programs that tell hardware what to do", "Software directs hardware operations (e.g., Paint, Word)."),
    "the relationship between hardware and software is best described as:": ("they work together as an integrated system", "Hardware provides physical capability; software provides instructions."),
    "without software, hardware is like:": ("a body without a brain", "Hardware without software cannot function, just as a body without a brain cannot act."),
    "hardware is like the ____ of a computer.": ("body", "Hardware is the tangible part, like the body. Software is the brain."),
    "software is like the ____ of a computer.": ("brain", "Software directs what the computer does, like a brain directs a body."),
    # c3_cs_002
    "what does cpu stand for?": ("Central Processing Unit", "CPU = Central Processing Unit — it processes all data and instructions."),
    "the cpu is called the ____ of the computer.": ("brain", "CPU processes data and instructions — like a brain processes thoughts."),
    "memory (ram) stores data:": ("temporarily during processing", "RAM holds data only while the computer is ON — temporary workspace."),
    "which of the following is an input device?": ("keyboard", "Input devices send data INTO the computer. Keyboard sends keystrokes."),
    "which of the following is an output device?": ("monitor", "Output devices show results FROM the computer. Monitor displays output."),
    "the input unit uses devices like:": ("keyboard and mouse", "Keyboard and mouse send data to the CPU — they are input devices."),
    "the output unit uses devices like:": ("monitor and printer", "Monitor and printer show results from the computer — output devices."),
    "storage keeps data:": ("permanently", "Storage (hard disk, SSD) saves data even when the computer is switched OFF."),
    "memory is like a ____ because it holds data temporarily.": ("short-term notepad", "RAM = short-term notepad. Cleared when power is off."),
    "storage is like a ____ because it keeps data permanently.": ("filing cabinet", "Hard disk = filing cabinet. Data stays even after shutdown."),
    "which is not one of the five main components of a computer system?": ("speaker", "The five components: CPU, memory, input, output, storage."),
    # c3_cs_003
    "system software is software that:": ("manages and controls computer hardware", "System software (e.g., OS) runs the computer and manages hardware resources."),
    "application software is software that:": ("performs specific user tasks", "Application software (e.g., Paint, Word) helps users do specific jobs."),
    "which of the following is system software?": ("windows operating system", "Windows is an OS — it manages the computer. That makes it system software."),
    "which of the following is application software?": ("paint", "Paint is used for drawing — a specific user task. That makes it application software."),
    "classify: microsoft word is": ("application software", "Word is for writing letters/documents — a specific task → application software."),
    "classify: linux is": ("system software", "Linux is an OS that manages hardware → system software."),
    "classify: a game app is": ("application software", "Games perform specific tasks (entertainment) → application software."),
    "without system software, the computer:": ("cannot run at all", "System software (OS) is essential — it loads first and manages all hardware."),
    "examples of application software include all except:": ("windows", "Windows is the OS → system software, not application software."),
}

# Normalise keys
_QA_LOOKUP = {_norm(k): (v[0], v[1]) for k, v in _RAW_QA.items()}


# ─── QUESTION BANK (structured) ─────────────────────────────────────────────

QUESTION_BANK: list[QRecord] = []

def _q(node: NodeID, qtype: QType, diff: Difficulty,
       question: str, options: list[str], answer, explanation: str = ""):
    QUESTION_BANK.append(QRecord(node, qtype, diff, question, options, answer, explanation))


# ── c3_cs_001 questions ──────────────────────────────────────────────────────
_q(NodeID.C3_CS_001, QType.MCQ, Difficulty.MEDIUM,
  "Which of the following is a hardware component of a computer?",
  ["Paint program", "Microsoft Word", "Monitor", "Windows"],
  "Monitor",
  "Hardware = physical parts you can touch. Monitor is hardware; Paint/Word/Windows are software.")

_q(NodeID.C3_CS_001, QType.MCQ, Difficulty.MEDIUM,
  "Which of the following is a software component of a computer?",
  ["Keyboard", "Mouse", "CPU", "Paint program"],
  "Paint program",
  "Software = programs inside the computer. Paint program is software; keyboard/mouse/CPU are hardware.")

_q(NodeID.C3_CS_001, QType.MCQ, Difficulty.EASY,
  "Hardware refers to:",
  ["Programs inside the computer", "Physical parts you can touch", "The internet connection", "Data stored on disk"],
  "Physical parts you can touch",
  "Hardware = monitor, keyboard, mouse, CPU — all tangible physical parts.")

_q(NodeID.C3_CS_001, QType.MCQ, Difficulty.EASY,
  "Software refers to:",
  ["Physical parts of the computer", "Programs that tell hardware what to do", "The power supply", "The monitor screen"],
  "Programs that tell hardware what to do",
  "Software = set of programs that direct hardware operations.")

_q(NodeID.C3_CS_001, QType.TRUE_FALSE, Difficulty.MEDIUM,
  "The relationship between hardware and software: they work together as an integrated system.",
  ["True", "False"],
  "True",
  "Hardware provides physical capability; software provides instructions. They are interdependent.")

_q(NodeID.C3_CS_001, QType.TRUE_FALSE, Difficulty.MEDIUM,
  "Without software, hardware can still do useful work on its own.",
  ["True", "False"],
  "False",
  "Without software, hardware is like a body without a brain — it cannot function.")

_q(NodeID.C3_CS_001, QType.FILL_BLANK, Difficulty.MEDIUM,
  "Hardware is like the ____ of a computer.",
  ["body"],
  "body",
  "Hardware is the tangible part, like the body. Software is the brain.")

_q(NodeID.C3_CS_001, QType.FILL_BLANK, Difficulty.MEDIUM,
  "Software is like the ____ of a computer.",
  ["brain"],
  "brain",
  "Software directs what the computer does, like a brain directs a body.")

_q(NodeID.C3_CS_001, QType.SHORT_ANSWER, Difficulty.MEDIUM,
  "Explain in your own words why a computer needs both hardware and software. Use one analogy.",
  [],
  "A computer needs hardware (body) and software (brain) to function. Like a car needs both an engine and fuel, or a kitchen needs both physical tools and a cook's instructions.",
  "A good answer mentions both are needed and uses an analogy (body/brain, car/engine+fuel, kitchen/cook).")

_q(NodeID.C3_CS_001, QType.MATCH, Difficulty.MEDIUM,
  "Match Column A (parts) with Column B (type):\n"
  "Column A: Monitor | Paint program | Keyboard | Windows\n"
  "Column B: Hardware | Software",
  [],
  {"Monitor": "Hardware", "Paint program": "Software", "Keyboard": "Hardware", "Windows": "Software"},
  "Monitor→Hardware, Paint program→Software, Keyboard→Hardware, Windows→Software.")

# ── c3_cs_002 questions ──────────────────────────────────────────────────────
_q(NodeID.C3_CS_002, QType.MCQ, Difficulty.MEDIUM,
  "What does CPU stand for?",
  ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Central Print Unit"],
  "Central Processing Unit",
  "CPU = Central Processing Unit. It processes all data and instructions in the computer.")

_q(NodeID.C3_CS_002, QType.MCQ, Difficulty.EASY,
  "The CPU is called the ____ of the computer.",
  ["Heart", "Brain", "Leg", "Storage"],
  "Brain",
  "CPU processes data and instructions — like a brain processes thoughts.")

_q(NodeID.C3_CS_002, QType.MCQ, Difficulty.MEDIUM,
  "Memory (RAM) stores data:",
  ["Permanently even when the computer is off", "Temporarily during processing", "Only on a hard disk", "Only in the CPU"],
  "Temporarily during processing",
  "RAM is a temporary workspace. Data is lost when power is off.")

_q(NodeID.C3_CS_002, QType.MCQ, Difficulty.EASY,
  "Which of the following is an input device?",
  ["Monitor", "Printer", "Keyboard", "Speaker"],
  "Keyboard",
  "Input devices send data INTO the computer. Keyboard sends keystrokes IN.")

_q(NodeID.C3_CS_002, QType.MCQ, Difficulty.EASY,
  "Which of the following is an output device?",
  ["Mouse", "Keyboard", "Monitor", "Scanner"],
  "Monitor",
  "Output devices show results FROM the computer. Monitor displays output.")

_q(NodeID.C3_CS_002, QType.TRUE_FALSE, Difficulty.MEDIUM,
  "The input unit uses devices like the keyboard and mouse.",
  ["True", "False"],
  "True",
  "Keyboard and mouse send data INTO the CPU — they are input devices.")

_q(NodeID.C3_CS_002, QType.TRUE_FALSE, Difficulty.MEDIUM,
  "The output unit uses devices like the monitor and printer.",
  ["True", "False"],
  "True",
  "Monitor and printer show data FROM the computer — they are output devices.")

_q(NodeID.C3_CS_002, QType.MCQ, Difficulty.MEDIUM,
  "Storage keeps data:",
  ["Temporarily while the CPU works", "Permanently even when the computer is off", "Only in the CPU register", "Only in RAM"],
  "Permanently even when the computer is off",
  "Storage (hard disk, SSD) keeps data permanently. RAM is temporary.")

_q(NodeID.C3_CS_002, QType.FILL_BLANK, Difficulty.MEDIUM,
  "Memory is like a ____ because it holds data temporarily.",
  ["short-term notepad"],
  "short-term notepad",
  "RAM is a temporary workspace — like a short-term notepad you clear later.")

_q(NodeID.C3_CS_002, QType.FILL_BLANK, Difficulty.MEDIUM,
  "Storage is like a ____ because it keeps data permanently.",
  ["filing cabinet"],
  "filing cabinet",
  "Hard disk is a permanent store — like a filing cabinet where files stay.")

_q(NodeID.C3_CS_002, QType.SHORT_ANSWER, Difficulty.MEDIUM,
  "Name the five main components of a computer system in order of data flow (input → processing → output → storage).",
  [],
  "1. Input Unit  →  2. CPU  →  3. Memory (temporary)  →  4. Output Unit  →  5. Storage Unit (permanent)",
  "Data flows: Input → CPU → Memory (while processing) → Output. Storage is separate for permanent saving.")

_q(NodeID.C3_CS_002, QType.MATCH, Difficulty.MEDIUM,
  "Match: (A) CPU (B) Memory (C) Input Unit (D) Output Unit (E) Storage\n"
  "with: 1. Processes data  2. Temporary storage  3. Keyboard/Mouse  4. Monitor/Printer  5. Permanent storage",
  [],
  {"CPU": "1. Processes data", "Memory": "2. Temporary storage",
   "Input Unit": "3. Keyboard/Mouse", "Output Unit": "4. Monitor/Printer", "Storage": "5. Permanent storage"},
  "CPU=1, Memory=2, Input=3, Output=4, Storage=5.")

# ── c3_cs_003 questions ──────────────────────────────────────────────────────
_q(NodeID.C3_CS_003, QType.MCQ, Difficulty.MEDIUM,
  "System software is software that:",
  ["Performs specific user tasks", "Manages and controls computer hardware", "Draws pictures on screen", "Types documents"],
  "Manages and controls computer hardware",
  "System software (e.g., OS) manages hardware and runs the computer.")

_q(NodeID.C3_CS_003, QType.MCQ, Difficulty.EASY,
  "Application software is software that:",
  ["Manages the computer hardware", "Performs specific user tasks", "Loads when the computer starts", "Controls memory"],
  "Performs specific user tasks",
  "Application software (e.g., Paint, Word) helps users perform specific tasks.")

_q(NodeID.C3_CS_003, QType.MCQ, Difficulty.MEDIUM,
  "Which of the following is system software?",
  ["Microsoft Paint", "Microsoft Word", "Windows Operating System", "A game app"],
  "Windows Operating System",
  "Windows is an OS — it manages the computer hardware → system software.")

_q(NodeID.C3_CS_003, QType.MCQ, Difficulty.EASY,
  "Which of the following is application software?",
  ["Windows", "Linux", "Paint", "macOS"],
  "Paint",
  "Paint is for drawing — a specific user task → application software.")

_q(NodeID.C3_CS_003, QType.TRUE_FALSE, Difficulty.MEDIUM,
  "The operating system is an example of system software.",
  ["True", "False"],
  "True",
  "The OS (Windows, Linux, macOS) manages hardware → it is system software.")

_q(NodeID.C3_CS_003, QType.TRUE_FALSE, Difficulty.EASY,
  "A game app is an example of system software.",
  ["True", "False"],
  "False",
  "Games perform specific tasks (entertainment) → application software, not system software.")

_q(NodeID.C3_CS_003, QType.FILL_BLANK, Difficulty.MEDIUM,
  "Classify: Microsoft Word is ____ software.",
  ["application"],
  "application",
  "Word is for writing documents → application software.")

_q(NodeID.C3_CS_003, QType.FILL_BLANK, Difficulty.MEDIUM,
  "Classify: Linux is ____ software.",
  ["system"],
  "system",
  "Linux is an OS → system software.")

_q(NodeID.C3_CS_003, QType.MCQ, Difficulty.MEDIUM,
  "Examples of application software include all EXCEPT:",
  ["Paint", "MS Word", "Windows", "A calculator app"],
  "Windows",
  "Windows is the OS → system software. Paint, Word, calculator apps are application software.")

_q(NodeID.C3_CS_003, QType.SHORT_ANSWER, Difficulty.HARD,
  "Give two examples each of system software and application software.",
  [],
  {"system": ["Windows", "Linux", "macOS", "Android OS"],
   "application": ["Paint", "MS Word", "Calculator", "Game app", "Browser"]},
  "System: OS (Windows, Linux, macOS, Android). Application: Paint, Word, Calculator, Games, Browser.")


# ─── SOLVER ──────────────────────────────────────────────────────────────────

def _normalise_answer(raw: Any) -> str:
    return _norm(str(raw))


def _mcq_check(user: str, correct: str) -> bool:
    return _normalise_answer(user) == _normalise_answer(correct)


def _tf_check(user: str, correct: str) -> bool:
    u = _normalise_answer(user)
    return u in ("true", _normalise_answer(correct))


def _fill_blank_check(user: str, correct: Any) -> bool:
    """Accept close variants."""
    u = _normalise_answer(user)
    c = _normalise_answer(correct)
    if isinstance(correct, list):
        return u in [_normalise_answer(x) for x in correct]
    # allow prefix match for short blanks
    if len(u) >= 3 and len(c) >= 3:
        return u == c or u in c or c in u
    return u == c


def _match_check(user: Any, correct: Any) -> bool:
    """Compare match dicts."""
    if not isinstance(user, dict) or not isinstance(correct, dict):
        return False
    u_norm = {_norm(k): _normalise_answer(v) for k, v in user.items()}
    c_norm = {_norm(k): _normalise_answer(v) for k, v in correct.items()}
    return u_norm == c_norm


def _short_answer_check(user: str, correct: Any) -> tuple[bool, float]:
    """Keyword-based partial credit for short answers."""
    u = _normalise_answer(user)
    # For dict-type answers (e.g., two examples each)
    if isinstance(correct, dict):
        score = 0.0
        total = 0.0
        for key, vals in correct.items():
            if isinstance(vals, list):
                total += len(vals)
                for v in vals:
                    if _normalise_answer(v) in u:
                        score += 1.0
            else:
                total += 1.0
                if _normalise_answer(vals) in u:
                    score += 1.0
        ratio = score / total if total > 0 else 0.0
        return ratio >= 0.5, ratio
    # String answer
    c = _normalise_answer(correct)
    # token overlap
    u_tokens = set(re.findall(r"[a-z0-9]+", u))
    c_tokens = set(re.findall(r"[a-z0-9]+", c))
    if not c_tokens:
        return u == c, 1.0 if u == c else 0.0
    overlap = len(u_tokens & c_tokens)
    ratio = overlap / len(c_tokens)
    return ratio >= 0.6, ratio


def solve(record: QRecord, user_answer: Any) -> SolverResult:
    """
    Evaluate a single question and return a SolverResult.
    Deterministic — no randomness, no external calls.
    """
    correct_answer = record.answer
    max_score = 2.0 if record.difficulty == Difficulty.HARD else (1.5 if record.difficulty == Difficulty.MEDIUM else 1.0)

    if record.qtype in (QType.MCQ, QType.TRUE_FALSE):
        is_correct = _mcq_check(str(user_answer), str(correct_answer))
        return SolverResult(
            correct=is_correct,
            user_answer=user_answer,
            expected_answer=correct_answer,
            explanation=record.explanation or f"Correct answer: {correct_answer}",
            score_awarded=max_score if is_correct else 0.0,
            max_score=max_score,
        )

    if record.qtype == QType.FILL_BLANK:
        is_correct = _fill_blank_check(str(user_answer), correct_answer)
        return SolverResult(
            correct=is_correct,
            user_answer=user_answer,
            expected_answer=correct_answer,
            explanation=record.explanation or f"Correct answer: {correct_answer}",
            score_awarded=max_score if is_correct else 0.0,
            max_score=max_score,
        )

    if record.qtype == QType.MATCH:
        is_correct = _match_check(user_answer, correct_answer)
        return SolverResult(
            correct=is_correct,
            user_answer=user_answer,
            expected_answer=correct_answer,
            explanation=record.explanation or f"Correct answer: {correct_answer}",
            score_awarded=max_score if is_correct else 0.0,
            max_score=max_score,
        )

    if record.qtype == QType.SHORT_ANSWER:
        is_correct, ratio = _short_answer_check(str(user_answer), correct_answer)
        partial = round(max_score * ratio, 2)
        return SolverResult(
            correct=is_correct,
            user_answer=user_answer,
            expected_answer=correct_answer,
            explanation=(
                record.explanation
                + f"\n\n[Partial credit: {partial}/{max_score} — "
                  f"keyword overlap ratio: {ratio:.0%}]"
            ),
            score_awarded=partial,
            max_score=max_score,
        )

    # Fallback
    return SolverResult(
        correct=False,
        user_answer=user_answer,
        expected_answer=correct_answer,
        explanation="Unknown question type.",
        score_awarded=0.0,
        max_score=max_score,
    )


def solve_batch(records_and_answers: list[tuple[QRecord, Any]]) -> list[SolverResult]:
    """Solve a batch of (question_record, user_answer) pairs."""
    return [solve(rec, ans) for rec, ans in records_and_answers]


def total_score(results: list[SolverResult]) -> dict:
    earned = sum(r.score_awarded for r in results)
    maximum = sum(r.max_score for r in results)
    pct = round((earned / maximum) * 100, 1) if maximum > 0 else 0.0
    return {"earned": round(earned, 2), "maximum": round(maximum, 2), "percentage": pct}


def lookup_answer(question_text: str) -> Optional[tuple[Any, str]]:
    """Look up a canonical answer by normalised question text."""
    return _QA_LOOKUP.get(_norm(question_text))


# ─── VALIDATION ──────────────────────────────────────────────────────────────

def validate_answer_format(qtype: QType, answer: Any) -> tuple[bool, str]:
    """Check if the user's answer is in a sensible format for the question type."""
    if qtype in (QType.MCQ, QType.TRUE_FALSE):
        if not isinstance(answer, (str, int, float)):
            return False, f"Expected a string/number for {qtype.value}, got {type(answer).__name__}"
    elif qtype == QType.FILL_BLANK:
        if not isinstance(answer, str) or len(answer.strip()) == 0:
            return False, "Fill-in-the-blank answer must be a non-empty string."
    elif qtype == QType.MATCH:
        if not isinstance(answer, dict):
            return False, "Match answer must be a dict mapping left items to right items."
    elif qtype == QType.SHORT_ANSWER:
        if not isinstance(answer, str) or len(answer.strip()) < 3:
            return False, "Short answer must be at least 3 characters."
    return True, "OK"


# ─── DIAGNOSTICS ─────────────────────────────────────────────────────────────

def coverage_report() -> dict:
    """Report how many questions exist per node and difficulty."""
    report: dict[str, Any] = {}
    for node in NodeID:
        node_qs = [q for q in QUESTION_BANK if q.node == node]
        by_diff: dict[str, int] = {d.value: 0 for d in Difficulty}
        by_type: dict[str, int] = {t.value: 0 for t in QType}
        for q in node_qs:
            by_diff[q.difficulty.value] += 1
            by_type[q.qtype.value] += 1
        report[node.value] = {
            "total": len(node_qs),
            "by_difficulty": by_diff,
            "by_type": by_type,
        }
    return report


def get_questions_for_node(node: NodeID) -> list[QRecord]:
    return [q for q in QUESTION_BANK if q.node == node]


# ─── VERIFICATION ────────────────────────────────────────────────────────────

def _verify():
    """Run internal checks at import time."""
    errors = []

    # Check all questions have answers
    for q in QUESTION_BANK:
        if q.answer is None:
            errors.append(f"Missing answer for: {q.question[:60]}")

    # Check no duplicate normalised questions
    seen: set[str] = set()
    for q in QUESTION_BANK:
        nq = _norm(q.question)
        if nq in seen:
            errors.append(f"Duplicate question: {q.question[:60]}")
        seen.add(nq)

    # Check each node has questions
    for node in NodeID:
        nqs = get_questions_for_node(node)
        if not nqs:
            errors.append(f"No questions for node {node.value}")

    if errors:
        print("[Solver Verification FAILED]")
        for e in errors:
            print(f"  ✗ {e}")
    else:
        cov = coverage_report()
        total = sum(v["total"] for v in cov.values())
        print(f"[Solver Verification PASSED] — {total} questions across {len(NodeID)} nodes")
        for node, info in cov.items():
            print(f"  {node}: {info['total']} q  |  {info['by_difficulty']}")


# E1 dedupe: this file executes TWICE in one process — the registry
# imports it as solvers._plugins.class3_cs_solver while the questions
# pack imports the bare `class3_cs_solver` (sys.path).  Two module
# objects = two _verify() runs (the triple [Solver Verification PASSED]
# print).  The env sentinel is shared across module instances.
if not os.environ.get("_CLASS3_CS_VERIFY_DONE"):
    _verify()
    os.environ["_CLASS3_CS_VERIFY_DONE"] = "1"


# ─── PUBLIC API ──────────────────────────────────────────────────────────────

__all__ = [
    "QRecord", "SolverResult", "QType", "Difficulty", "NodeID",
    "solve", "solve_batch", "total_score", "validate_answer_format",
    "QUESTION_BANK", "coverage_report", "get_questions_for_node",
    "lookup_answer",
]

if __name__ == "__main__":
    print("Class 3 CS Solver — coverage report:")
    print(json.dumps(coverage_report(), indent=2))

    # Quick smoke test on every question
    print("\nSmoke test:")
    passed = 0
    for q in QUESTION_BANK:
        r = solve(q, q.answer)
        status = "✓" if r.correct else "✗"
        passed += int(r.correct)
        print(f"  {status} [{q.node.value}] {r.score_awarded}/{r.max_score} pts — {q.question[:50]}...")
    print(f"\n{passed}/{len(QUESTION_BANK)} questions passed self-test.")