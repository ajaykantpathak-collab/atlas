"""Board question parser — extracts questions and step decompositions from marker files.

Parses board_style_questions/*.marker files to get:
- Question text (Q1, Q2, ...)
- Model answer with step-by-step working
- Mark allocation per step
- Class level and subject

The step decomposition is derived from the model answer structure:
each "Step N:" or implicit step in the working becomes a solver step.
"""
from __future__ import annotations

import re
import json
import logging
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

logger = logging.getLogger(__name__)

BOARD_DIR = Path("C:/Users/Alesha4285/Desktop/cisce/maths/board_style_questions")


@dataclass
class BoardStep:
    """One step in a board question's solution."""
    step_num: int
    description: str = ""       # what this step does
    working: str = ""           # the actual math working
    marks: float = 0            # marks for this step
    operation: str = ""         # detected SymPy operation (diff, integrate, solve, etc.)


@dataclass
class BoardQuestion:
    """A parsed board-style question with its solution steps."""
    qid: str                    # e.g. "c12_q11"
    class_level: int
    question_num: int           # Q11 → 11
    question_text: str          # full question text
    marks: float = 0            # total marks
    steps: list[BoardStep] = field(default_factory=list)
    model_answer: str = ""      # full model answer text
    mark_allocation: str = ""   # raw mark allocation text
    # Detected operation category
    category: str = ""          # "tangent_normal", "quadratic", "matrix", etc.


@dataclass
class BoardBank:
    """Collection of all parsed board questions."""
    questions: list[BoardQuestion] = field(default_factory=list)
    by_class: dict[int, list[BoardQuestion]] = field(default_factory=dict)

    def add(self, q: BoardQuestion) -> None:
        self.questions.append(q)
        self.by_class.setdefault(q.class_level, []).append(q)


# ─────────────────────────────────────────────────────────────────────
# Parser
# ─────────────────────────────────────────────────────────────────────

# Matches: Q1. ... or Q11. ...
QUESTION_RE = re.compile(r'^\s*Q(\d+)\.\s*(.+)$')
# Matches: Model Answer:
MODEL_ANSWER_RE = re.compile(r'^\s*Model Answer:\s*$', re.IGNORECASE)
# Matches: Mark Allocation: ...
MARK_ALLOC_RE = re.compile(r'^\s*Mark Allocation:\s*(.+)$', re.IGNORECASE)
# Matches: Step N: or (a) or (b) sub-parts
STEP_RE = re.compile(r'^\s*Step\s+(\d+)[:.]\s*(.+)$', re.IGNORECASE)
SUBPART_RE = re.compile(r'^\s*\([a-z]\)\s*(.+)$')
# Matches class from filename
CLASS_RE = re.compile(r'c(\d+)_maths_board_style')


def parse_board_file(path: Path) -> list[BoardQuestion]:
    """Parse one board style marker file. Returns list of questions."""
    text = path.read_text(encoding="utf-8")
    lines = text.split("\n")

    # Extract class from filename
    m = CLASS_RE.search(path.name)
    class_level = int(m.group(1)) if m else 0

    questions: list[BoardQuestion] = []
    current_q: Optional[BoardQuestion] = None
    in_model_answer = False
    in_examples = False
    model_answer_lines: list[str] = []

    for line in lines:
        # Detect EXAMPLES section start
        if line.strip().startswith("EXAMPLES:"):
            in_examples = True
            in_model_answer = False
            continue
        if not in_examples:
            continue

        # Detect new question
        qm = QUESTION_RE.match(line)
        if qm:
            # Save previous question
            if current_q:
                current_q.model_answer = "\n".join(model_answer_lines).strip()
                _parse_steps(current_q)
                questions.append(current_q)

            qnum = int(qm.group(1))
            qtext = qm.group(2).strip()
            current_q = BoardQuestion(
                qid=f"c{class_level}_q{qnum}",
                class_level=class_level,
                question_num=qnum,
                question_text=qtext,
            )
            model_answer_lines = []
            in_model_answer = False
            continue

        if current_q is None:
            continue

        # Detect model answer start
        if MODEL_ANSWER_RE.match(line):
            in_model_answer = True
            continue

        # Detect mark allocation
        mm = MARK_ALLOC_RE.match(line)
        if mm:
            current_q.mark_allocation = mm.group(1).strip()
            # Try to extract total marks from question text
            marks_match = re.search(r'\((\d+(?:\.\d+)?)\s*marks?\)', current_q.question_text, re.IGNORECASE)
            if marks_match:
                current_q.marks = float(marks_match.group(1))
            continue

        # Collect model answer lines
        if in_model_answer:
            model_answer_lines.append(line)

    # Save last question
    if current_q:
        current_q.model_answer = "\n".join(model_answer_lines).strip()
        _parse_steps(current_q)
        questions.append(current_q)

    return questions


def _parse_steps(q: BoardQuestion) -> None:
    """Extract steps from the model answer text."""
    lines = q.model_answer.split("\n")
    step_num = 0
    current_working: list[str] = []

    for line in lines:
        sm = STEP_RE.match(line)
        if sm:
            # Save previous step
            if current_working and step_num > 0:
                q.steps[-1].working = "\n".join(current_working).strip()
            step_num = int(sm.group(1))
            q.steps.append(BoardStep(
                step_num=step_num,
                description=sm.group(2).strip(),
            ))
            current_working = []
            continue

        # Also detect sub-parts (a), (b), (c) as steps
        spm = SUBPART_RE.match(line)
        if spm and step_num == 0:
            step_num += 1
            q.steps.append(BoardStep(
                step_num=step_num,
                description=spm.group(1).strip(),
            ))
            current_working = []
            continue

        if step_num > 0:
            current_working.append(line)

    # Save last step
    if current_working and q.steps:
        q.steps[-1].working = "\n".join(current_working).strip()

    # If no explicit steps, treat whole model answer as one step
    if not q.steps and q.model_answer:
        q.steps.append(BoardStep(
            step_num=1,
            description="Solve",
            working=q.model_answer,
        ))

    # Detect operation category
    q.category = _detect_category(q.question_text + " " + q.model_answer)

    # Detect operations per step
    for step in q.steps:
        step.operation = _detect_step_operation(step.description + " " + step.working)


# ─────────────────────────────────────────────────────────────────────
# Category and operation detection
# ─────────────────────────────────────────────────────────────────────

CATEGORY_PATTERNS = [
    # Physics and Chemistry patterns first (before generic math patterns)
    (r"kinematic|velocity.*acceleration|final.*velocity|initial.*velocity|u\s*=\s*\d.*v\s*=\s*\d|v\s*=\s*u\s*\+", "phy_kinematics"),
    (r"newton.*law|f\s*=\s*ma|force.*mass.*accel|weight\s*=\s*m.*g|tension.*rope|normal.*reaction|\bforce\b.*\bacceleration\b|\bkg\b.*\bforce\b|\bforce\b.*\bn\b.*\baccel", "phy_newtons_laws"),
    (r"kinetic.*energy|potential.*energy|ke\s*=\s*|pe\s*=\s*|work\s*=\s*force|w\s*=\s*fs|energy.*conserv", "phy_energy"),
    (r"ohm.*law|v\s*=\s*ir|voltage.*current.*resist|electric.*power|p\s*=\s*vi|charge.*current.*time|q\s*=\s*it", "phy_electricity"),
    (r"moles.*mass|n\s*=\s*m/m|number.*moles|molar.*mass.*calculate", "chem_moles"),
    (r"ph\s*=\s*|ph.*calc|\bph\b.*solution|log.*h\+|hydrogen.*ion.*concentration|ph.*concentration|concentration.*ph", "chem_ph"),
    (r"dilut|m1v1\s*=\s*m2v2|dilution.*calc|mixing.*solution", "chem_dilution"),
    (r"molarity|mol/l|concentration.*mole|m\s*=\s*n/v", "chem_molarity"),
    (r"ideal.*gas|pv\s*=\s*nrt|gas.*law|pressure.*volume.*temperature", "chem_gas"),
    # Math specific patterns (most specific → least specific)
    (r"tangent.*normal|equation.*tangent|equation.*normal", "tangent_normal"),
    (r"differential equation|dy/dx\s*\+|solve.*ode|linear.*differential", "differential_equation"),
    (r"definite.*integral|integral.*from|integral.*0\s*to|area.*bounded|area.*curve", "integration"),
    (r"equivalence.*relation|reflexive.*symmetric|equivalence class", "equivalence_relation"),
    (r"composite.*function|\(g\s*o\s*f\)|\(f\s*o\s*g\)|gof|fog", "composite_function"),
    (r"inverse.*trig|sin.*inverse|cos.*inverse|tan.*inverse|arcsin|arccos|arctan|sin\^?-1|cos\^?-1|tan\^?-1", "inverse_trig"),
    (r"inverse.*function|f.*inverse|bijective|one.*one.*onto", "inverse_function"),
    (r"continuity|continuous.*at|LHL|RHL|left.*hand.*limit|right.*hand.*limit", "continuity"),
    (r"particle.*moves|velocity.*zero|velocity.*time|acceleration.*minimum|displacement.*time", "kinematics"),
    (r"increasing|decreasing|monoton", "increasing_decreasing"),
    (r"maxim|minim|critical point|stationary|extremum", "max_min"),
    (r"derivative|differentiat|dy/dx|f\s*'\(", "differentiation"),
    (r"integral|integrate|area.*bounded", "integration"),
    (r"quadratic|x\^2\s*[-+]|roots of|ax\^2", "quadratic"),
    (r"matrix|matrices|determinant|\[.*;.*\]|A\s*=\s*\[", "matrix"),
    (r"system.*equation|simultaneous|solve.*x.*y|x\s*\+\s*2y|linear.*equation.*solve", "linear_system"),
    (r"probability|bayes|conditional.*prob", "probability"),
    (r"permutation|combination|arrangement|selection", "permutation_combination"),
    (r"\bAP\b|\bGP\b|arithmetic.*progression|geometric.*progression|sum.*terms|nth term", "progression"),
    (r"trigonometric.*identity|prove.*trig|sec.*tan|sin.*cos.*identity", "trig_identity"),
    (r"vector|dot.*product|cross.*product|i\s*\+\s*2j", "vectors"),
    (r"line.*programming|LPP|optimization.*constraint|maximize.*minimize", "lpp"),
    (r"GST|tax.*rate|input.*tax|output.*tax|CGST|SGST", "gst"),
    (r"banking|recurring.*deposit|maturity.*value|RD.*account", "banking"),
    (r"share|dividend|face.*value|market.*value|investment.*share", "shares"),
    (r"inequation|inequality|x\s*<\s*\d|x\s*>\s*\d|x\s*in\s*W|x\s*in\s*Z", "inequation"),
    (r"factori|factor.*theorem|factor.*polynomial|completely.*factor", "factorization"),
    (r"coordinate.*geometry|section.*formula|midpoint|slope.*line|equation.*line", "coordinate_geometry"),
    (r"similarity|similar.*triangle", "similarity"),
    (r"circle|tangent.*circle|chord|secant|cyclic", "circle"),
    (r"mensuration|volume|surface.*area|cone|cylinder|sphere|hemisphere", "mensuration"),
    (r"height.*distance|angle.*elevation|angle.*depression", "heights_distances"),
    (r"mean|median|mode|central.*tendency|histogram|ogive|cumulative", "statistics"),
    (r"set.*theory|union|intersection|venn|\bA\s*=\s*\{|\bB\s*=\s*\{", "set_theory"),
    (r"\bratio\b|\bproportion\b|direct.*proportion|inverse.*proportion", "ratio_proportion"),
    (r"profit|loss|discount|cost.*price|selling.*price|marked.*price", "profit_loss"),
    (r"interest|simple.*interest|compound.*interest|principal.*rate", "interest"),
    (r"percentage|percent|%", "percentage"),
    (r"exponent|standard.*form|scientific.*notation|10\^", "exponents"),
    (r"decimal.*fraction|terminating|recurring|0\.\d+", "decimal"),
    (r"\bhcf\b|\blcm\b|highest.*common|lowest.*common", "hcf_lcm"),
    (r"prime.*factor|factor.*tree|prime.*number|is.*prime", "prime_factorization"),
]

STEP_OP_PATTERNS = [
    (r"dy/dx|differentiat|derivative|diff\(", "diff"),
    (r"integral|integrate|∫", "integrate"),
    (r"solve.*equation|find.*root|x\s*=", "solve"),
    (r"determinant|\|A\|", "determinant"),
    (r"matrix.*multiply|AB|A\s*B", "matrix_multiply"),
    (r"matrix.*inverse|A.*inverse|adjoint", "matrix_inverse"),
    (r"area|integral.*from|definite", "definite_integral"),
    (r"tangent|slope.*tangent|point.*slope", "tangent"),
    (r"normal|negative.*reciprocal|perpendicular", "normal"),
    (r"reflexive|symmetric|transitive", "check_relation"),
    (r"equivalence.*class|\[.*\]", "equivalence_class"),
    (r"limit|LHL|RHL|lim.*→", "limit"),
    (r"substitut|subs\(", "substitute"),
    (r"simplif|expand|factor", "simplify"),
    (r"verify|check|confirm", "verify"),
]


def _detect_category(text: str) -> str:
    text_lower = text.lower()
    for pattern, category in CATEGORY_PATTERNS:
        if re.search(pattern, text_lower):
            return category
    return "general"


def _detect_step_operation(text: str) -> str:
    text_lower = text.lower()
    for pattern, op in STEP_OP_PATTERNS:
        if re.search(pattern, text_lower):
            return op
    return "general"


# ─────────────────────────────────────────────────────────────────────
# Build and cache
# ─────────────────────────────────────────────────────────────────────

CACHE_FILE = Path(__file__).parent / "_board_cache.json"


def build_bank(use_cache: bool = True) -> BoardBank:
    """Build the full board question bank from marker files."""
    if use_cache and CACHE_FILE.exists():
        data = json.loads(CACHE_FILE.read_text(encoding="utf-8"))
        bank = BoardBank()
        for qd in data:
            steps = [BoardStep(**s) for s in qd.pop("steps", [])]
            q = BoardQuestion(**qd, steps=steps)
            bank.add(q)
        return bank

    bank = BoardBank()
    for f in sorted(BOARD_DIR.glob("c*_maths_board_style.marker")):
        questions = parse_board_file(f)
        for q in questions:
            bank.add(q)
        logger.info(f"Loaded {len(questions)} questions from {f.name}")

    # Cache
    cache_data = []
    for q in bank.questions:
        qd = {
            "qid": q.qid,
            "class_level": q.class_level,
            "question_num": q.question_num,
            "question_text": q.question_text,
            "marks": q.marks,
            "model_answer": q.model_answer,
            "mark_allocation": q.mark_allocation,
            "category": q.category,
            "steps": [
                {
                    "step_num": s.step_num,
                    "description": s.description,
                    "working": s.working,
                    "marks": s.marks,
                    "operation": s.operation,
                }
                for s in q.steps
            ],
        }
        cache_data.append(qd)
    CACHE_FILE.write_text(json.dumps(cache_data, indent=2, ensure_ascii=False), encoding="utf-8")
    return bank


# ─────────────────────────────────────────────────────────────────────
# Question matching
# ─────────────────────────────────────────────────────────────────────

def match_question(bank: BoardBank, question: str, class_level: Optional[int] = None) -> Optional[BoardQuestion]:
    """Match a typed question to the closest board question.

    Uses keyword overlap scoring. Optional class filter.
    """
    q_words = set(re.findall(r'[a-zA-Z]{3,}', question.lower()))
    # Remove generic words
    stop = {"find", "the", "and", "for", "with", "that", "show", "prove", "solve",
            "calculate", "determine", "evaluate", "given", "where", "also", "from"}
    q_words -= stop

    best_match: Optional[BoardQuestion] = None
    best_score = 0

    candidates = bank.questions
    if class_level:
        candidates = [q for q in candidates if q.class_level == class_level]

    for bq in candidates:
        bq_words = set(re.findall(r'[a-zA-Z]{3,}', bq.question_text.lower()))
        bq_words -= stop
        overlap = len(q_words & bq_words)
        # Boost for category match
        q_cat = _detect_category(question)
        if q_cat == bq.category and q_cat != "general":
            overlap += 3
        if overlap > best_score:
            best_score = overlap
            best_match = bq

    return best_match if best_score > 0 else None


if __name__ == "__main__":
    bank = build_bank(use_cache=False)
    print(f"Total questions: {len(bank.questions)}")
    for cls in sorted(bank.by_class.keys()):
        qs = bank.by_class[cls]
        cats = {}
        for q in qs:
            cats[q.category] = cats.get(q.category, 0) + 1
        print(f"\nClass {cls}: {len(qs)} questions")
        for cat, count in sorted(cats.items(), key=lambda x: -x[1])[:5]:
            print(f"  {cat}: {count}")
