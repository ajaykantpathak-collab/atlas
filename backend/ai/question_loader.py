"""Parse all maths question sources into a unified question bank.

Sources:
- enrichment/*.marker — 740 files, 5 diagnostic questions each = 3,748 questions
- worked_examples/*.marker — step-by-step solutions with marking
- board_style_questions/*.marker — board exam questions with model answers
- question_bank/*.marker — practice questions
- drill_banks/*.marker — drill questions
- mock_papers/*.marker — mock exam questions
- past_papers/*.marker — actual past exam questions
- practice_tests/*.marker — practice test questions

Each parsed question has:
- question_id: unique ID
- source: which file it came from
- node_id: linked curriculum node (if extractable)
- class_level: class
- question_text: the question
- answer_text: the model answer (if available)
- steps: list of step decompositions (if available)
- marks: total marks
- category: detected category
"""
from __future__ import annotations

import os
import re
import json
import logging
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

logger = logging.getLogger(__name__)

# CISCE maths corpus lives outside the repo; override CISCE_CONTENT_ROOT when
# deploying to a machine without the author's Desktop layout.
CISCE_ROOT = Path(os.environ.get(
    "CISCE_CONTENT_ROOT", r"C:\Users\Alesha4285\Desktop\cisce"))
CISCE_MATHS = CISCE_ROOT / "maths"


@dataclass
class ParsedQuestion:
    """A single parsed question from any source."""
    question_id: str
    source: str                # file path
    source_type: str           # "enrichment", "worked_example", "board_style", etc.
    node_id: str = ""          # linked curriculum node
    class_level: int = 0
    question_text: str = ""
    answer_text: str = ""
    steps: list[dict] = field(default_factory=list)  # [{description, working, marks}]
    marks: float = 0
    category: str = ""
    cognitive_level: str = ""  # recall, reasoning, evaluate, apply, create


@dataclass
class QuestionBank:
    """All parsed questions."""
    questions: list[ParsedQuestion] = field(default_factory=list)
    by_node: dict[str, list[ParsedQuestion]] = field(default_factory=dict)
    by_class: dict[int, list[ParsedQuestion]] = field(default_factory=dict)

    def add(self, q: ParsedQuestion) -> None:
        self.questions.append(q)
        if q.node_id:
            self.by_node.setdefault(q.node_id, []).append(q)
        if q.class_level:
            self.by_class.setdefault(q.class_level, []).append(q)


# ─────────────────────────────────────────────────────────────────────
# Parsers for each source type
# ─────────────────────────────────────────────────────────────────────

# Node header: --- NODE c10_math_001 ---
NODE_HEADER_RE = re.compile(r'^---\s+NODE\s+(\S+)\s+---')
# Title: TITLE: ...
TITLE_RE = re.compile(r'^TITLE:\s*(.+)$')
# Class from node ID: c10_math_001 → 10
NODE_CLASS_RE = re.compile(r'c(\d+)_')
# Diagnostic question: Q1 (recall): ... or Q1 (reasoning): ...
DIAG_Q_RE = re.compile(r'^\s*Q(\d+)\s*\((\w+)\):\s*(.+)$')
DIAG_ANSWER_RE = re.compile(r'^\s*Answer:\s*(.+)$')
# Worked example: === EXAMPLE N: ... ===
EXAMPLE_HEADER_RE = re.compile(r'^===\s+EXAMPLE\s+(\d+):\s*(.+?)\s+===')
# Worked example Q: Q: ...
WE_Q_RE = re.compile(r'^\s*Q:\s*(.+)$')
# Worked example Step N: ...
WE_STEP_RE = re.compile(r'^\s*Step\s+(\d+)[:.]\s*(.+)$')
# Worked example Answer: ...
WE_ANSWER_RE = re.compile(r'^\s*Answer:\s*(.+)$')
# Board style Q1. ...
BOARD_Q_RE = re.compile(r'^\s*Q(\d+)\.\s*(.+)$')
BOARD_MODEL_RE = re.compile(r'^\s*Model Answer:\s*$', re.IGNORECASE)
BOARD_MARK_RE = re.compile(r'^\s*Mark Allocation:\s*(.+)$', re.IGNORECASE)


def parse_enrichment_file(path: Path) -> list[ParsedQuestion]:
    """Parse an enrichment marker file.

    Each enrichment file has multiple nodes, each with 5 diagnostic questions.
    """
    questions: list[ParsedQuestion] = []
    text = path.read_text(encoding="utf-8")
    lines = text.split("\n")

    current_node = ""
    current_title = ""
    current_class = 0
    in_diagnostic = False
    current_q: Optional[ParsedQuestion] = None
    answer_lines: list[str] = []

    for line in lines:
        # Node header
        nm = NODE_HEADER_RE.match(line)
        if nm:
            # Save previous question
            if current_q and answer_lines:
                current_q.answer_text = " ".join(answer_lines).strip()
                questions.append(current_q)
                current_q = None
                answer_lines = []

            current_node = nm.group(1)
            cm = NODE_CLASS_RE.search(current_node)
            current_class = int(cm.group(1)) if cm else 0
            current_title = ""
            in_diagnostic = False
            continue

        # Title
        tm = TITLE_RE.match(line)
        if tm and current_node:
            current_title = tm.group(1).strip()
            continue

        # Diagnostic section start
        if line.strip().startswith("DIAGNOSTIC_QUESTION:"):
            in_diagnostic = True
            # Save any previous question
            if current_q and answer_lines:
                current_q.answer_text = " ".join(answer_lines).strip()
                questions.append(current_q)
                current_q = None
                answer_lines = []
            continue

        # If we hit another section (DEFINITION, ELI5, etc.), stop diagnostic
        if re.match(r'^[A-Z_]+:', line) and not line.strip().startswith("DIAGNOSTIC_QUESTION:"):
            if current_q and answer_lines:
                current_q.answer_text = " ".join(answer_lines).strip()
                questions.append(current_q)
                current_q = None
                answer_lines = []
            in_diagnostic = False
            continue

        if not in_diagnostic:
            continue

        # Parse diagnostic questions
        dq = DIAG_Q_RE.match(line)
        if dq:
            # Save previous question
            if current_q and answer_lines:
                current_q.answer_text = " ".join(answer_lines).strip()
                questions.append(current_q)
                answer_lines = []

            qnum = int(dq.group(1))
            cognitive = dq.group(2).lower()
            qtext = dq.group(3).strip()
            current_q = ParsedQuestion(
                question_id=f"{current_node}_diag_q{qnum}",
                source=str(path),
                source_type="enrichment",
                node_id=current_node,
                class_level=current_class,
                question_text=qtext,
                cognitive_level=cognitive,
            )
            continue

        # Answer line
        if current_q:
            am = DIAG_ANSWER_RE.match(line)
            if am:
                answer_lines.append(am.group(1).strip())
            elif line.strip():
                answer_lines.append(line.strip())

    # Save last question
    if current_q and answer_lines:
        current_q.answer_text = " ".join(answer_lines).strip()
        questions.append(current_q)

    return questions


def parse_worked_examples_file(path: Path) -> list[ParsedQuestion]:
    """Parse a worked examples marker file."""
    questions: list[ParsedQuestion] = []
    text = path.read_text(encoding="utf-8")
    lines = text.split("\n")

    # Extract class from filename
    cm = re.search(r'c(\d+)_maths_worked', path.name)
    class_level = int(cm.group(1)) if cm else 0

    current_q: Optional[ParsedQuestion] = None
    current_steps: list[dict] = []
    answer_text = ""
    in_steps = False

    for line in lines:
        # Example header
        em = EXAMPLE_HEADER_RE.match(line)
        if em:
            # Save previous
            if current_q:
                current_q.steps = current_steps
                current_q.answer_text = answer_text
                questions.append(current_q)

            example_num = int(em.group(1))
            example_title = em.group(2).strip()
            current_q = ParsedQuestion(
                question_id=f"c{class_level}_we_ex{example_num}",
                source=str(path),
                source_type="worked_example",
                class_level=class_level,
                category=example_title.lower().replace(" ", "_"),
            )
            current_steps = []
            answer_text = ""
            in_steps = False
            continue

        if current_q is None:
            continue

        # Question line
        qm = WE_Q_RE.match(line)
        if qm:
            current_q.question_text = qm.group(1).strip()
            in_steps = True
            continue

        # Step line
        sm = WE_STEP_RE.match(line)
        if sm and in_steps:
            step_num = int(sm.group(1))
            step_desc = sm.group(2).strip()
            current_steps.append({
                "step_num": step_num,
                "description": step_desc,
                "working": "",
                "marks": 0,
            })
            continue

        # Answer line
        am = WE_ANSWER_RE.match(line)
        if am:
            answer_text = am.group(1).strip()
            continue

        # Marking line
        if line.strip().startswith("Marking:"):
            # Try to extract total marks
            mm = re.search(r'(\d+)\s*marks?\]', line, re.IGNORECASE)
            if mm:
                current_q.marks = float(mm.group(1))
            continue

        # Step working (continuation)
        if in_steps and current_steps and line.strip():
            current_steps[-1]["working"] += " " + line.strip()

    # Save last
    if current_q:
        current_q.steps = current_steps
        current_q.answer_text = answer_text
        questions.append(current_q)

    return questions


def parse_board_style_file(path: Path) -> list[ParsedQuestion]:
    """Parse a board style questions marker file."""
    questions: list[ParsedQuestion] = []
    text = path.read_text(encoding="utf-8")
    lines = text.split("\n")

    cm = re.search(r'c(\d+)_maths_board', path.name)
    class_level = int(cm.group(1)) if cm else 0

    current_q: Optional[ParsedQuestion] = None
    in_model_answer = False
    in_examples = False
    model_lines: list[str] = []

    for line in lines:
        if line.strip().startswith("EXAMPLES:"):
            in_examples = True
            in_model_answer = False
            continue
        if not in_examples:
            continue

        # Question
        qm = BOARD_Q_RE.match(line)
        if qm:
            if current_q:
                current_q.answer_text = "\n".join(model_lines).strip()
                questions.append(current_q)

            qnum = int(qm.group(1))
            qtext = qm.group(2).strip()
            # Extract marks from question
            marks_match = re.search(r'\((\d+(?:\.\d+)?)\s*marks?\)', qtext, re.IGNORECASE)
            marks = float(marks_match.group(1)) if marks_match else 0

            current_q = ParsedQuestion(
                question_id=f"c{class_level}_board_q{qnum}",
                source=str(path),
                source_type="board_style",
                class_level=class_level,
                question_text=qtext,
                marks=marks,
            )
            model_lines = []
            in_model_answer = False
            continue

        if current_q is None:
            continue

        if BOARD_MODEL_RE.match(line):
            in_model_answer = True
            continue

        mm = BOARD_MARK_RE.match(line)
        if mm:
            # Try to parse steps from mark allocation
            continue

        if in_model_answer:
            model_lines.append(line)

    if current_q:
        current_q.answer_text = "\n".join(model_lines).strip()
        questions.append(current_q)

    return questions


def parse_generic_question_file(path: Path, source_type: str) -> list[ParsedQuestion]:
    """Parse a generic question file (question_bank, drill_banks, etc.).

    These files have varied formats, so we extract any Q: or Q1. patterns.
    """
    questions: list[ParsedQuestion] = []
    text = path.read_text(encoding="utf-8")
    lines = text.split("\n")

    cm = re.search(r'c(\d+)_maths', path.name)
    class_level = int(cm.group(1)) if cm else 0

    current_q: Optional[ParsedQuestion] = None
    q_lines: list[str] = []

    for line in lines:
        # Match various question patterns
        qm = re.match(r'^\s*(?:Q|Question)\s*(\d+)[:.)]?\s*(.+)$', line, re.IGNORECASE)
        if qm:
            if current_q and q_lines:
                current_q.question_text = " ".join(q_lines).strip()
                questions.append(current_q)

            qnum = int(qm.group(1))
            current_q = ParsedQuestion(
                question_id=f"c{class_level}_{source_type}_q{qnum}",
                source=str(path),
                source_type=source_type,
                class_level=class_level,
            )
            q_lines = [qm.group(2).strip()]
            continue

        if current_q and line.strip():
            # Stop if we hit an answer or next section
            if re.match(r'^\s*(?:A|Ans|Answer|Solution)[:.]?\s', line, re.IGNORECASE):
                current_q.answer_text = line.strip()
                continue
            q_lines.append(line.strip())

    if current_q and q_lines:
        current_q.question_text = " ".join(q_lines).strip()
        questions.append(current_q)

    return questions


# ─────────────────────────────────────────────────────────────────────
# Build the full question bank
# ─────────────────────────────────────────────────────────────────────

CACHE_FILE = Path(__file__).parent / "_question_bank_cache.json"


def build_question_bank(use_cache: bool = True) -> QuestionBank:
    """Build the full question bank from all maths marker files."""
    if use_cache and CACHE_FILE.exists():
        data = json.loads(CACHE_FILE.read_text(encoding="utf-8"))
        bank = QuestionBank()
        for qd in data:
            bank.add(ParsedQuestion(**qd))
        logger.info(f"Loaded {len(bank.questions)} questions from cache")
        return bank

    bank = QuestionBank()

    # 1. Enrichment files (740 files, 5 questions each)
    enrich_dir = CISCE_MATHS / "enrichment"
    if enrich_dir.exists():
        for f in sorted(enrich_dir.glob("c*_maths_enrichment_part*.marker")):
            qs = parse_enrichment_file(f)
            for q in qs:
                bank.add(q)
        logger.info(f"Enrichment: {len([q for q in bank.questions if q.source_type == 'enrichment'])} questions")

    # 2. Worked examples
    we_dir = CISCE_MATHS / "worked_examples"
    if we_dir.exists():
        for f in sorted(we_dir.glob("*.marker")):
            qs = parse_worked_examples_file(f)
            for q in qs:
                bank.add(q)
        logger.info(f"Worked examples: {len([q for q in bank.questions if q.source_type == 'worked_example'])} questions")

    # 3. Board style questions
    bs_dir = CISCE_MATHS / "board_style_questions"
    if bs_dir.exists():
        for f in sorted(bs_dir.glob("*.marker")):
            qs = parse_board_style_file(f)
            for q in qs:
                bank.add(q)
        logger.info(f"Board style: {len([q for q in bank.questions if q.source_type == 'board_style'])} questions")

    # 4. Question banks, drill banks, etc.
    for dirname, stype in [
        ("question_bank", "question_bank"),
        ("question_bank_clean", "question_bank_clean"),
        ("drill_banks", "drill_bank"),
        ("practice", "practice"),
        ("practice_tests", "practice_test"),
        ("mock_papers", "mock_paper"),
        ("past_papers", "past_paper"),
        ("diagnostic_questions", "diagnostic_question"),
    ]:
        d = CISCE_MATHS / dirname
        if d.exists():
            count_before = len(bank.questions)
            for f in sorted(d.glob("*.marker")):
                qs = parse_generic_question_file(f, stype)
                for q in qs:
                    bank.add(q)
            count_after = len(bank.questions)
            logger.info(f"{dirname}: {count_after - count_before} questions")

    # Cache
    cache_data = []
    for q in bank.questions:
        cache_data.append({
            "question_id": q.question_id,
            "source": q.source,
            "source_type": q.source_type,
            "node_id": q.node_id,
            "class_level": q.class_level,
            "question_text": q.question_text,
            "answer_text": q.answer_text,
            "steps": q.steps,
            "marks": q.marks,
            "category": q.category,
            "cognitive_level": q.cognitive_level,
        })
    CACHE_FILE.write_text(json.dumps(cache_data, indent=2, ensure_ascii=False), encoding="utf-8")
    logger.info(f"Total: {len(bank.questions)} questions cached")
    return bank


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    bank = build_question_bank(use_cache=False)
    print(f"\nTotal questions: {len(bank.questions)}")
    print(f"Questions with node links: {len([q for q in bank.questions if q.node_id])}")
    print(f"Questions with answers: {len([q for q in bank.questions if q.answer_text])}")
    print(f"Questions with steps: {len([q for q in bank.questions if q.steps])}")
    print(f"\nBy source type:")
    from collections import Counter
    for stype, count in Counter(q.source_type for q in bank.questions).most_common():
        print(f"  {stype}: {count}")
    print(f"\nBy class:")
    for cls in sorted(bank.by_class.keys()):
        print(f"  Class {cls}: {len(bank.by_class[cls])} questions")
