"""
Question Generator for Class 1 Computer Studies (ICSE CISCE Curriculum, 2020)
Generates seeded, deterministic questions for all 4 nodes.

Usage:
    from class1_cs_questions import generate_questions, generate_worksheet
    qs = generate_questions(node_id='c1_cs_001', num=5, seed=42,
                             indian_context=True)
    ws = generate_worksheet(seed=42)
"""

import math
import random
import textwrap
from dataclasses import dataclass, field
from typing import Optional

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

_rng = random.Random()

def set_seed(seed: int) -> None:
    _rng.seed(seed)


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

NATURAL_POOL = [
    'tree', 'rock', 'water', 'air', 'flower', 'grass',
    'sun', 'mountain', 'river', 'cloud', 'mango tree', 'cow',
    'bird', 'leaf', 'sand', 'rain',
]

MANMADE_POOL = [
    'chair', 'book', 'toy', 'shirt', 'table', 'pen',
    'car', 'mobile phone', 'laptop', 'fan', 'building',
    'school bag', 'water bottle', 'bicycle', 'door',
]

MACHINE_POOL = [
    'fan', 'washing machine', 'mixer grinder', 'juicer',
    'car', 'bicycle', 'bus', 'train', 'smartphone', 'refrigerator',
]

COMPUTER_TYPES = ['desktop', 'laptop', 'tablet', 'smartphone']
COMPUTER_FEATURES = ['speed', 'storage', 'diligence']

COMPUTER_FUNCTIONS = ['drawing', 'playing games', 'showing videos',
                       'typing', 'listening to music', 'watching cartoons']

USES_HOME    = ['playing games', 'watching videos', 'video calling',
                'online shopping', 'listening to music', 'watching cartoons']
USES_SCHOOL  = ['learning', 'typing practice', 'watching educational videos',
                'drawing with mouse', 'e-learning', 'reading e-books']
USES_OFFICE  = ['writing letters', 'storing files', 'printing documents',
                'sending emails', 'keeping accounts', 'saving data']

INDIAN_USES_HOME    = ['watching cartoons', 'playing games', 'attending online classes',
                       'video calling grandparents']
INDIAN_USES_SCHOOL  = ['learning with smart boards', 'typing practice', 'e-learning',
                       'taking online exams']
INDIAN_USES_OFFICE  = ['keeping accounts', 'printing exam papers',
                       'storing student records', 'sending emails']


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def _shuffle(lst: list) -> list:
    out = lst[:]
    _rng.shuffle(out)
    return out

def _pick(lst: list, n: int = 1):
    picked = _shuffle(lst)
    return picked[:n] if n > 1 else picked[0]

def _make_options(correct: str, distractors: list[str], n_options: int = 4):
    opts = [correct] + _shuffle([d for d in distractors if d != correct])[:n_options - 1]
    _rng.shuffle(opts)
    return opts, opts.index(correct)

def _indian_marker(ic: bool) -> str:
    return " 🇮🇳" if ic else ""


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class GeneratedQuestion:
    node_id: str
    qtype: str
    question: str
    options: list[str] = field(default_factory=list)
    correct_index: int = 0
    answer_text: str = ''
    explanation: str = ''
    competency: str = 'Board'
    difficulty: str = 'Easy'
    indian_context: bool = False
    marks: int = 1


# ── c1_cs_001 generators ────────────────────────────────────────────────────

def _gen_001_mcq(ic: bool = False) -> GeneratedQuestion:
    """Multiple-choice: identify natural or man-made."""
    templates = [
        ("natural",  "Which of these is a **natural** thing?",
         'Which of these comes from nature on its own?'),
        ("man-made", "Which of these is a **man-made** thing?",
         'Which of these is made by people?'),
    ]
    cat, stem, hint = _pick(templates)

    if cat == 'natural':
        correct = _pick(NATURAL_POOL)
        distractors = MANMADE_POOL[:]
    else:
        correct = _pick(MANMADE_POOL)
        distractors = NATURAL_POOL[:]

    opts, ci = _make_options(correct, distractors)
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_001', qtype='mcq',
        question=f"{hint}{marker}\n\nA) {opts[0]}\nB) {opts[1]}\nC) {opts[2]}\nD) {opts[3]}",
        options=opts, correct_index=ci,
        answer_text=correct,
        explanation=f"'{correct}' is {cat} because it "
                    f"{'grows on its own' if cat == 'natural' else 'is made by people'}.",
        indian_context=ic,
    )

def _gen_001_tf(ic: bool = False) -> GeneratedQuestion:
    """True / False statement."""
    pairs = [
        ("A tree is a natural thing.", True),
        ("A chair is a man-made thing.", True),
        ("A rock is a man-made thing.", False),
        ("A fan is a natural thing.", False),
        ("Water comes from nature.", True),
        ("A book grows on a tree.", False),
    ]
    stmt, answer = _pick(pairs)
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_001', qtype='tf',
        question=f"Say whether this is **True** or **False**:{marker}\n\n{stmt}",
        answer_text='True' if answer else 'False',
        explanation=f"The statement is **{'True' if answer else 'False'}**. "
                    f"{'Correct! ' if answer else 'Think again — '}"
                    "Natural things grow on their own; man-made things are built.",
        indian_context=ic,
    )

def _gen_001_fill(ic: bool = False) -> GeneratedQuestion:
    """Fill in the blank."""
    templates = [
        ("A ____ is something that grows in nature.", "tree"),
        ("A ____ is something that people make.", "chair"),
        ("A ____ is a man-made tool that helps us do work.", "machine"),
        ("Things that come from nature are called ____ things.", "natural"),
        ("Things made by people are called ____ things.", "man-made"),
    ]
    q, ans = _pick(templates)
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_001', qtype='fill',
        question=f"Fill in the blank:{marker}\n\n{q}",
        answer_text=ans,
        explanation=f"The correct word is **{ans}**. "
                    "Read the sentence carefully to understand the meaning.",
        indian_context=ic,
    )

def _gen_001_classify(ic: bool = False) -> GeneratedQuestion:
    """Classify objects into natural / man-made."""
    pool = _shuffle(NATURAL_POOL + MANMADE_POOL)
    n = _rng.randint(3, 5)
    items = pool[:n]
    correct = ', '.join(items)
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_001', qtype='classify',
        question=("Sort these things into **Natural** and **Man-made**: "
                  f"{', '.join(items)}{marker}\n\n"
                  "Write your answer as: natural_item1, natural_item2, ... | "
                  "manmade_item1, manmade_item2, ..."),
        answer_text=correct,
        explanation=_build_classify_explanation(items),
        indian_context=ic,
    )

def _build_classify_explanation(items):
    lines = ["**Correct classification:**"]
    for item in items:
        tag = 'Natural' if item in NATURAL_POOL else 'Man-made'
        reason = 'grows on its own' if tag == 'Natural' else 'made by people'
        lines.append(f"  • {item} → {tag} ({reason})")
    return "\n".join(lines)


# ── c1_cs_002 generators ────────────────────────────────────────────────────

def _gen_002_mcq(ic: bool = False) -> GeneratedQuestion:
    """MCQ on computer definition / features."""
    templates = [
        ("What is a computer?",
         'smart machine made by humans', ['toy', 'plant', 'rock', 'animal']),
        ("Which is NOT a feature of a computer?",
         'eating', ['speed', 'storage', 'diligence']),
        ("A computer is ____.",
         'smart', ['dull', 'tired', 'slow', 'lazy']),
        ("A computer needs ____ to work.",
         'electricity', ['food', 'water', 'sleep', 'air']),
        ("A computer can do work ____.",
         'very fast', ['very slowly', 'only sometimes', 'when it sleeps', 'never']),
        ("A computer never gets ____.",
         'tired', ['happy', 'sad', 'sleepy', 'hungry']),
    ]
    q, correct, distractors = _pick(templates)
    opts, ci = _make_options(correct, distractors)
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_002', qtype='mcq',
        question=f"{q}{marker}\n\n"
                 f"A) {opts[0]}\nB) {opts[1]}\nC) {opts[2]}\nD) {opts[3]}",
        options=opts, correct_index=ci,
        answer_text=correct,
        explanation=f"The correct answer is **{correct}**. "
                    "A computer is a smart machine made by humans. "
                    "It works fast, stores data, and never gets tired.",
        indian_context=ic,
    )

def _gen_002_fill(ic: bool = False) -> GeneratedQuestion:
    """Fill-in-the-blank about computer definition/features."""
    templates = [
        ("A computer is a ____ machine.", 'smart'),
        ("A computer is made by ____.", 'humans'),
        ("A computer needs ____ to work.", 'electricity'),
        ("A computer has the feature of ____ (very fast).", 'speed'),
        ("A computer can ____ things.", 'remember'),
        ("A computer never gets ____.", 'tired'),
        ("A computer has the feature of ____ (keeps things safe).", 'storage'),
        ("A computer has the feature of ____ (works without rest).", 'diligence'),
    ]
    q, ans = _pick(templates)
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_002', qtype='fill',
        question=f"Fill in the blank:{marker}\n\n{q}",
        answer_text=ans,
        explanation=f"The correct word is **{ans}**.",
        indian_context=ic,
    )

def _gen_002_short(ic: bool = False) -> GeneratedQuestion:
    """Short answer: name features."""
    q = ("Name **two** features of a computer.{marker}\n"
         "(Example answers: speed, storage, diligence)")
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_002', qtype='short',
        question=q.format(marker=marker),
        answer_text='speed and storage',
        explanation="The three main features are: speed (very fast), "
                    "storage (remembers things), and diligence (never tired). "
                    "Any two are correct.",
        indian_context=ic,
        marks=2,
    )


# ── c1_cs_003 generators ────────────────────────────────────────────────────

_TYPE_DESCRIPTIONS = {
    'desktop':    'stays on a desk and has separate parts',
    'laptop':     'folds like a book and can be carried',
    'tablet':     'flat with a touch screen',
    'smartphone': 'small and fits in your pocket',
}

def _gen_003_mcq(ic: bool = False) -> GeneratedQuestion:
    """MCQ: identify type of computer."""
    templates = [
        ("Which computer folds like a book?", 'laptop'),
        ("Which computer has a touch screen and is flat?", 'tablet'),
        ("Which computer is small enough to fit in your pocket?", 'smartphone'),
        ("Which computer has separate parts that stay on a desk?", 'desktop'),
        ("Which type of computer can you carry easily?", 'laptop'),
        ("Which computer is also called a 'mini computer'?", 'smartphone'),
    ]
    q, correct = _pick(templates)
    opts, ci = _make_options(correct, COMPUTER_TYPES)
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_003', qtype='mcq',
        question=f"{q}{marker}\n\n"
                 f"A) {opts[0]}\nB) {opts[1]}\nC) {opts[2]}\nD) {opts[3]}",
        options=opts, correct_index=ci,
        answer_text=correct,
        explanation=f"**{correct.capitalize()}**: {_TYPE_DESCRIPTIONS[correct]}",
        indian_context=ic,
    )

def _gen_003_fill(ic: bool = False) -> GeneratedQuestion:
    """Fill-in-the-blank about computer types."""
    templates = [
        ("A ____ folds like a book.", 'laptop'),
        ("A ____ has a touch screen.", 'tablet'),
        ("A ____ fits in your pocket.", 'smartphone'),
        ("A ____ stays on a desk.", 'desktop'),
        ("A ____ is portable and light.", 'laptop'),
    ]
    q, ans = _pick(templates)
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_003', qtype='fill',
        question=f"Fill in the blank:{marker}\n\n{q}",
        answer_text=ans,
        explanation=f"Correct answer: **{ans}**. {_TYPE_DESCRIPTIONS[ans]}",
        indian_context=ic,
    )

def _gen_003_match(ic: bool = False) -> GeneratedQuestion:
    """Match computer types with their descriptions."""
    pool = _shuffle(COMPUTER_TYPES)
    n = _rng.randint(2, min(4, len(pool)))
    selected = pool[:n]
    shuffled_desc = _shuffle(list(_TYPE_DESCRIPTIONS.values()))
    lines = ["Match the computer type with its description:\n"]
    for i, t in enumerate(selected):
        lines.append(f"  {i+1}. {t.capitalize()}")
    lines.append("\nDescriptions:")
    for j, d in enumerate(shuffled_desc[:n]):
        lines.append(f"  a.{j+1}. {d.capitalize()}")
    answer_pairs = '; '.join([f"{t}={_TYPE_DESCRIPTIONS[t]}" for t in selected])
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_003', qtype='match',
        question='\n'.join(lines) + marker,
        answer_text=answer_pairs,
        explanation=_build_match_explanation_003(selected),
        indian_context=ic,
        marks=n,
    )

def _build_match_explanation_003(selected):
    lines = ["**Correct matches:**"]
    for t in selected:
        lines.append(f"  {t.capitalize()} → {_TYPE_DESCRIPTIONS[t]}")
    return '\n'.join(lines)


# ── c1_cs_004 generators ────────────────────────────────────────────────────

def _gen_004_mcq(ic: bool = False) -> GeneratedQuestion:
    """MCQ: identify where / how computers are used."""
    uses_home    = INDIAN_USES_HOME    if ic else USES_HOME
    uses_school  = INDIAN_USES_SCHOOL  if ic else USES_SCHOOL
    uses_office  = INDIAN_USES_OFFICE  if ic else USES_OFFICE

    templates = [
        ("Where do we use computers to learn?",
         'school', ['home', 'park', 'office', 'shop']),
        ("Where do we use computers to play games?",
         'home', ['office', 'school', 'library', 'bank']),
        ("Where are computers used to write letters and print documents?",
         'office', ['home', 'school', 'park', 'garden']),
        ("Which place uses computers for keeping accounts?",
         'office', ['home', 'playground', 'school garden', 'kitchen']),
        ("We use computers at school for ____.",
         _pick(USES_SCHOOL), _pick(USES_HOME)),
    ]
    q, correct, *rest = _pick(templates)
    if isinstance(correct, list):
        correct = correct[0] if correct else 'learning'
    distractors = rest[0] if rest else ['playing games', 'watching videos', 'eating']
    opts, ci = _make_options(correct, distractors)
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_004', qtype='mcq',
        question=f"{q}{marker}\n\n"
                 f"A) {opts[0]}\nB) {opts[1]}\nC) {opts[2]}\nD) {opts[3]}",
        options=opts, correct_index=ci,
        answer_text=correct,
        explanation=f"**{correct.capitalize()}** is the correct place/use. "
                    "Computers are used at home, school, and office for different tasks.",
        indian_context=ic,
    )

def _gen_004_fill(ic: bool = False) -> GeneratedQuestion:
    """Fill-in-the-blank about computer uses."""
    uses = (INDIAN_USES_HOME + INDIAN_USES_SCHOOL + INDIAN_USES_OFFICE) if ic \
           else (USES_HOME + USES_SCHOOL + USES_OFFICE)
    use = _pick(uses)
    templates = [
        (f"At home, we can use a computer for ____.", use),
        ("At school, we use computers for ____.", _pick(USES_SCHOOL)),
        ("At the office, computers help us in ____.", _pick(USES_OFFICE)),
        ("We use computers to ____.", use),
    ]
    q, ans = _pick(templates)
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_004', qtype='fill',
        question=f"Fill in the blank:{marker}\n\n{q}",
        answer_text=ans,
        explanation=f"Correct answer: **{ans}**. "
                    "Computers are useful at home, school, and office.",
        indian_context=ic,
    )

def _gen_004_match(ic: bool = False) -> GeneratedQuestion:
    """Match places with computer uses."""
    uses_home   = INDIAN_USES_HOME   if ic else USES_HOME
    uses_school = INDIAN_USES_SCHOOL if ic else USES_SCHOOL
    uses_office = INDIAN_USES_OFFICE if ic else USES_OFFICE

    places   = _shuffle(['home', 'school', 'office'])
    use_pool = {'home': uses_home, 'school': uses_school, 'office': uses_office}
    selected_uses = {p: _pick(use_pool[p]) for p in places}

    lines = ["Match the **place** with a **use of computers**:\n"]
    for i, p in enumerate(places):
        lines.append(f"  {i+1}. {p.capitalize()}")
    lines.append("\nUses:")
    all_uses = list(selected_uses.values())
    _rng.shuffle(all_uses)
    for j, u in enumerate(all_uses):
        lines.append(f"  a.{j+1}. {u.capitalize()}")
    answer_text = '; '.join([f"{p}={selected_uses[p]}" for p in places])
    marker = _indian_marker(ic)
    return GeneratedQuestion(
        node_id='c1_cs_004', qtype='match',
        question='\n'.join(lines) + marker,
        answer_text=answer_text,
        explanation=_build_uses_explanation_004(selected_uses),
        indian_context=ic,
        marks=3,
    )

def _build_uses_explanation_004(selected_uses):
    lines = ["**Correct matches:**"]
    for p, u in selected_uses.items():
        lines.append(f"  {p.capitalize()} → {u}")
    return '\n'.join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

_GENERATORS = {
    # node_id: {qtype: generator_fn}
    'c1_cs_001': {
        'mcq':      _gen_001_mcq,
        'tf':       _gen_001_tf,
        'fill':     _gen_001_fill,
        'classify': _gen_001_classify,
    },
    'c1_cs_002': {
        'mcq':  _gen_002_mcq,
        'fill': _gen_002_fill,
        'short': _gen_002_short,
    },
    'c1_cs_003': {
        'mcq':    _gen_003_mcq,
        'fill':   _gen_003_fill,
        'match':  _gen_003_match,
    },
    'c1_cs_004': {
        'mcq':   _gen_004_mcq,
        'fill':  _gen_004_fill,
        'match': _gen_004_match,
    },
}

_QTYPES_BY_NODE = {
    'c1_cs_001': ['mcq', 'tf', 'fill', 'classify'],
    'c1_cs_002': ['mcq', 'fill', 'short'],
    'c1_cs_003': ['mcq', 'fill', 'match'],
    'c1_cs_004': ['mcq', 'fill', 'match'],
}

_COMPETENCY_MAP = {
    'c1_cs_001': 'Board', 'c1_cs_002': 'Board',
    'c1_cs_003': 'Board', 'c1_cs_004': 'Board',
}
_DIFFICULTY_MAP = {
    'c1_cs_001': 'Easy', 'c1_cs_002': 'Easy',
    'c1_cs_003': 'Easy', 'c1_cs_004': 'Easy',
}


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def generate_question(node_id: str,
                      qtype: Optional[str] = None,
                      indian_context: bool = False,
                      seed: Optional[int] = None) -> GeneratedQuestion:
    """Generate a single question for a given node."""
    if seed is not None:
        _rng.seed(seed)
    if qtype is None:
        qtype = _pick(_QTYPES_BY_NODE.get(node_id, ['mcq']))
    gen_fn = _GENERATORS.get(node_id, {}).get(qtype)
    if gen_fn is None:
        raise ValueError(f"No generator for node={node_id}, qtype={qtype}")
    q = gen_fn(ic=indian_context)
    q.competency  = _COMPETENCY_MAP.get(node_id, 'Board')
    q.difficulty  = _DIFFICULTY_MAP.get(node_id, 'Easy')
    return q


def generate_questions(node_id: str,
                       num: int = 5,
                       qtypes: Optional[list[str]] = None,
                       indian_context: bool = False,
                       seed: Optional[int] = None) -> list[GeneratedQuestion]:
    """Generate `num` questions for a single node."""
    if seed is not None:
        _rng.seed(seed)
    if qtypes is None:
        qtypes = _QTYPES_BY_NODE.get(node_id, ['mcq']) * num
    _rng.shuffle(qtypes)
    qtypes = (qtypes * ((num // len(qtypes)) + 1))[:num]

    questions = []
    for i in range(num):
        qt = qtypes[i % len(qtypes)]
        q = generate_question(node_id, qtype=qt,
                               indian_context=indian_context,
                               seed=None)  # already seeded
        questions.append(q)
    return questions


def generate_worksheet(num_per_node: int = 2,
                       indian_context: bool = False,
                       seed: int = 42,
                       title: str = "Class 1 Computer Studies Worksheet") -> str:
    """
    Generate a printable worksheet covering all 4 nodes.
    Returns a formatted string.
    """
    _rng.seed(seed)
    lines = [
        "=" * 60,
        f"  {title}",
        "=" * 60,
        f"  Curriculum: ICSE CISCE Computer Studies 1  |  Source: 2020",
        f"  Indian Context: {'Yes' if indian_context else 'No'}",
        "=" * 60,
        "",
    ]

    grand_total = 0
    node_ids = ['c1_cs_001', 'c1_cs_002', 'c1_cs_003', 'c1_cs_004']
    node_names = {
        'c1_cs_001': 'Natural vs Man-made Things & Machines',
        'c1_cs_002': 'What is a Computer? (Definition & Features)',
        'c1_cs_003': 'Types of Computers',
        'c1_cs_004': 'Uses of a Computer',
    }

    for nid in node_ids:
        lines += [
            f"\n{'─' * 60}",
            f"  NODE: {nid.upper()}",
            f"  Topic: {node_names[nid]}",
            f"{'─' * 60}",
        ]
        qs = generate_questions(nid, num=num_per_node,
                                 indian_context=indian_context, seed=None)
        for idx, q in enumerate(qs, 1):
            grand_total += q.marks
            lines.append(f"\n  Q{idx}. [{q.qtype.upper()}]  (Marks: {q.marks})")
            lines.append(f"       {q.question}")
            lines.append(f"       [Answer: {q.answer_text}]")
            lines.append(f"       [Explanation: {q.explanation[:120]}...]")

    lines += [
        "",
        "=" * 60,
        f"  Total Questions: {num_per_node * 4}  |  Total Marks: {grand_total}",
        "=" * 60,
    ]
    return '\n'.join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def generate_answer_key(node_id: Optional[str] = None,
                        seed: int = 99) -> str:
    """Generate an answer key. If node_id is None, covers all 4 nodes."""
    _rng.seed(seed)
    targets = [node_id] if node_id else ['c1_cs_001','c1_cs_002','c1_cs_003','c1_cs_004']
    lines = ["=" * 55, "  ANSWER KEY — Class 1 Computer Studies", "=" * 55]
    for nid in targets:
        qs = generate_questions(nid, num=2, seed=None)
        lines.append(f"\n  [{nid.upper()}]")
        for q in qs:
            lines.append(f"    [{q.qtype.upper()}] {q.answer_text}")
    lines.append("\n" + "=" * 55)
    return '\n'.join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == '--worksheet':
        ws = generate_worksheet(seed=42, indian_context=True)
        print(ws)
    elif len(sys.argv) > 1 and sys.argv[1] == '--key':
        print(generate_answer_key(seed=99))
    else:
        set_seed(42)
        print("Sample questions per node (seed=42):\n")
        for nid in ['c1_cs_001','c1_cs_002','c1_cs_003','c1_cs_004']:
            q = generate_question(nid, seed=42)
            print(f"[{nid}] [{q.qtype.upper()}] {q.question}")
            print(f"  Answer : {q.answer_text}")
            print(f"  Explain: {q.explanation[:90]}...")
            print()