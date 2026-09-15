"""
Solver for Class 1 Computer Studies (ICSE CISCE Curriculum, 2020)
Handles all 4 nodes: c1_cs_001, c1_cs_002, c1_cs_003, c1_cs_004
"""

import re
import math
import random
from dataclasses import dataclass, field
from typing import Optional

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class Question:
    node_id: str
    qtype: str          # mcq / fill / match / tf / short / classify
    question: str
    options: list[str]  # MCQ options in shuffled order
    correct_index: int  # 0-based index into options
    answer_text: str    # canonical correct text
    explanation: str
    competency: str
    difficulty: str
    indian_context: bool  # True = Indian-context variant

@dataclass
class SolverResult:
    node_id: str
    correct: bool
    user_answer: str
    expected: str
    explanation: str
    score: float = 0.0

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def _norm(text: str) -> str:
    return re.sub(r'[^a-z0-9]', '', text.lower())

def _token_set(text: str) -> set:
    return set(_norm(text).replace(' ', ''))

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

# ── c1_cs_001: Natural vs man-made things and machines ─────────────────────

_NATURAL_THINGS   = {'tree', 'rock', 'water', 'air', 'flower', 'grass',
                     'sun', 'mountain', 'river', 'cloud', 'animal', 'fruit'}
_MANMADE_THINGS   = {'chair', 'book', 'toy', 'clothes', 'table', 'pen',
                     'car', 'phone', 'laptop', 'fan', 'building'}
_MACHINE_THINGS   = {'car', 'phone', 'laptop', 'fan', 'washingmachine',
                     'mixer', 'juicer', 'bicycle', 'bus', 'train'}

def solve_c1_cs_001(qtype: str, question: str, user_answer: str,
                    expected: str, options: list[str], correct_index: int,
                    indian_context: bool = False) -> SolverResult:
    """
    Validates answers for NODE c1_cs_001.
    Covers: classify natural/man-made, define machine, examples.
    """
    ua = _norm(user_answer)

    if qtype == 'mcq':
        exp = options[correct_index]
        if correct_index < len(options):
            exp = options[correct_index]
        correct = (ua == _norm(exp))
        return SolverResult(
            node_id='c1_cs_001',
            correct=correct,
            user_answer=user_answer,
            expected=exp,
            explanation=_explain_001_mcq(question, options, correct_index,
                                         indian_context),
            score=1.0 if correct else 0.0
        )

    if qtype == 'tf':
        correct = ua in ('true', 't', 'yes', 'y') if expected.lower() in ('true','t') \
                  else ua in ('false', 'f', 'no', 'n')
        return SolverResult(
            node_id='c1_cs_001',
            correct=correct,
            user_answer=user_answer,
            expected=expected,
            explanation=_explain_001_tf(question, expected, indian_context),
            score=1.0 if correct else 0.0
        )

    if qtype == 'fill':
        exp_tokens = _token_set(expected)
        ua_tokens  = _token_set(user_answer)
        overlap = len(ua_tokens & exp_tokens)
        correct = (overlap >= max(1, len(exp_tokens) * 0.5))
        return SolverResult(
            node_id='c1_cs_001',
            correct=correct,
            user_answer=user_answer,
            expected=expected,
            explanation=_explain_001_fill(question, expected, indian_context),
            score=(overlap / len(exp_tokens)) if exp_tokens else 0.0
        )

    if qtype == 'classify':
        correct_items = set(expected.split(','))
        user_items    = set(re.split(r'[,\s]+', user_answer))
        matched = len(user_items & correct_items)
        total   = len(correct_items)
        score   = matched / total if total else 0.0
        return SolverResult(
            node_id='c1_cs_001',
            correct=(score >= 0.5),
            user_answer=user_answer,
            expected=expected,
            explanation=_explain_001_classify(question, expected,
                                              matched, total, indian_context),
            score=score
        )

    return SolverResult('c1_cs_001', False, user_answer, expected,
                        'Unknown question type.', 0.0)


def _explain_001_mcq(q, opts, ci, ic):
    label = opts[ci] if ci < len(opts) else ''
    extras = ['In India, many households have a bicycle as a common machine.',
              'Remember: natural things grow on their own; man-made things are built by people.']
    return (f"The correct answer is **{label}**.\n"
            f"{' '.join(extras if ic else extras[:1])}\n"
            f"Machines are tools made by people to make work easier.")

def _explain_001_tf(q, exp, ic):
    return (f"The statement is **{exp}**.\n"
            "Natural things come from nature without human help.\n"
            "Man-made things are built or made by people.")

def _explain_001_fill(q, exp, ic):
    return (f"Correct answer: **{exp}**\n"
            "Fill-in-the-blank answers must match the key concept "
            "from the textbook. Check for spelling and word order.")

def _explain_001_classify(q, exp, matched, total, ic):
    return (f"You correctly identified {matched}/{total} items.\n"
            f"Correct classification: {exp}\n"
            "Natural things grow on their own; man-made things are made by humans.")


# ── c1_cs_002: What is a computer – definition and features ─────────────────

def solve_c1_cs_002(qtype: str, question: str, user_answer: str,
                    expected: str, options: list[str], correct_index: int,
                    indian_context: bool = False) -> SolverResult:
    ua = _norm(user_answer)

    if qtype == 'mcq':
        exp = options[correct_index] if correct_index < len(options) else ''
        correct = (ua == _norm(exp))
        return SolverResult(
            node_id='c1_cs_002', correct=correct,
            user_answer=user_answer, expected=exp,
            explanation=_explain_002_mcq(question, options, correct_index, ic),
            score=1.0 if correct else 0.0
        )

    if qtype == 'fill':
        exp_tokens = _token_set(expected)
        ua_tokens  = _token_set(user_answer)
        overlap = len(ua_tokens & exp_tokens)
        score   = overlap / len(exp_tokens) if exp_tokens else 0.0
        return SolverResult(
            node_id='c1_cs_002', correct=(score >= 0.5),
            user_answer=user_answer, expected=expected,
            explanation=f"Correct features include: {expected}. "
                        "A computer's main features are speed, storage, and diligence.",
            score=score
        )

    if qtype == 'short':
        key_concepts = ['speed', 'storage', 'diligence', 'fast', 'store', 'remember']
        exp_norm = _norm(expected)
        match_count = sum(1 for k in key_concepts if k in exp_norm or k in ua)
        score = min(1.0, match_count / 2.0)
        return SolverResult(
            node_id='c1_cs_002', correct=(score >= 0.5),
            user_answer=user_answer, expected=expected,
            explanation=_explain_002_short(expected),
            score=score
        )

    return SolverResult('c1_cs_002', False, user_answer, expected,
                        'Unknown question type.', 0.0)

def _explain_002_mcq(q, opts, ci, ic):
    label = opts[ci] if ci < len(opts) else ''
    return (f"The correct answer is **{label}**.\n"
            "A computer is a smart machine made by humans.\n"
            "Its features: speed (very fast), storage (remembers things), "
            "diligence (never gets tired).")

def _explain_002_short(exp):
    return (f"A good answer mentions that a computer is a **smart machine** "
            f"with features like **speed**, **storage**, and **diligence**.\n"
            f"Reference answer: {exp}")


# ── c1_cs_003: Types of computers ──────────────────────────────────────────

_COMPUTER_TYPES = {
    'desktop':  'stays on a desk; has separate monitor, keyboard, and CPU',
    'laptop':   'folds like a book; portable; all parts in one piece',
    'tablet':   'flat and thin; touch screen; no separate keyboard needed',
    'smartphone':'small; fits in pocket; can make calls and run apps',
}

def solve_c1_cs_003(qtype: str, question: str, user_answer: str,
                    expected: str, options: list[str], correct_index: int,
                    indian_context: bool = False) -> SolverResult:
    ua = _norm(user_answer)

    if qtype == 'mcq':
        exp = options[correct_index] if correct_index < len(options) else ''
        correct = (ua == _norm(exp))
        return SolverResult(
            node_id='c1_cs_003', correct=correct,
            user_answer=user_answer, expected=exp,
            explanation=_explain_003_mcq(question, options, correct_index, ic),
            score=1.0 if correct else 0.0
        )

    if qtype == 'match':
        expected_pairs = [p.strip() for p in expected.split(';')]
        user_pairs     = [p.strip() for p in re.split(r'[;,\n]', user_answer)]
        exp_map  = {p.split('=')[0].strip(): p.split('=')[1].strip()
                    for p in expected_pairs if '=' in p}
        matched  = 0
        for up in user_pairs:
            if '=' in up:
                k, v = up.split('=')
                if exp_map.get(k.strip(), '') and v.strip() in exp_map[k.strip()]:
                    matched += 1
        total = len(exp_map)
        score = matched / total if total else 0.0
        return SolverResult(
            node_id='c1_cs_003', correct=(score >= 0.5),
            user_answer=user_answer, expected=expected,
            explanation=_build_match_explanation(exp_map, matched, total),
            score=score
        )

    if qtype == 'fill':
        exp_tokens = _token_set(expected)
        ua_tokens  = _token_set(user_answer)
        overlap = len(ua_tokens & exp_tokens)
        score   = overlap / len(exp_tokens) if exp_tokens else 0.0
        return SolverResult(
            node_id='c1_cs_003', correct=(score >= 0.5),
            user_answer=user_answer, expected=expected,
            explanation=_explain_003_fill(expected),
            score=score
        )

    return SolverResult('c1_cs_003', False, user_answer, expected,
                        'Unknown question type.', 0.0)

def _explain_003_mcq(q, opts, ci, ic):
    label = opts[ci] if ci < len(opts) else ''
    tips = {
        'desktop':  'It has separate parts that stay on your desk.',
        'laptop':   'It folds shut like a book and you can carry it.',
        'tablet':   'It is flat, thin, and you touch the screen.',
        'smartphone':'It is tiny and fits in your pocket!',
    }
    tip = tips.get(label.lower(), '')
    return (f"The correct answer is **{label}**.\n"
            f"{tip}\n"
            "All four — desktop, laptop, tablet, smartphone — are types of computers.")

def _explain_003_fill(exp):
    return (f"Correct answer: **{exp}**\n"
            "Remember: a laptop folds like a book, a tablet has a touch screen, "
            "and a smartphone fits in your pocket.")

def _build_match_explanation(exp_map, matched, total):
    lines = [f"You matched {matched}/{total} pairs correctly."]
    for k, v in exp_map.items():
        lines.append(f"  {k} → {v}")
    return "\n".join(lines)


# ── c1_cs_004: Uses of a computer ───────────────────────────────────────────

_USES = {
    'home':     'watching videos, playing games, video calling, online shopping',
    'school':   'learning, typing practice, watching educational videos, drawing',
    'office':   'writing letters, storing files, printing documents, sending emails',
}

_INDIAN_USES = {
    'home':     'watching cartoons, playing games, attending online classes',
    'school':   'learning with smart boards, typing practice, e-learning',
    'office':   'keeping accounts, printing exam papers, storing student records',
}

def solve_c1_cs_004(qtype: str, question: str, user_answer: str,
                    expected: str, options: list[str], correct_index: int,
                    indian_context: bool = False) -> SolverResult:
    ua = _norm(user_answer)

    if qtype == 'mcq':
        exp = options[correct_index] if correct_index < len(options) else ''
        correct = (ua == _norm(exp))
        return SolverResult(
            node_id='c1_cs_004', correct=correct,
            user_answer=user_answer, expected=exp,
            explanation=_explain_004_mcq(question, options, correct_index, ic),
            score=1.0 if correct else 0.0
        )

    if qtype == 'match':
        expected_pairs = [p.strip() for p in expected.split(';')]
        user_pairs     = [p.strip() for p in re.split(r'[;,\n]', user_answer)]
        exp_map = {}
        for p in expected_pairs:
            if '=' in p:
                k, v = p.split('=')
                exp_map[k.strip()] = v.strip()
        matched = 0
        for up in user_pairs:
            if '=' in up:
                k, v = up.split('=')
                if k.strip() in exp_map and v.strip() in exp_map[k.strip()]:
                    matched += 1
        total = len(exp_map)
        score = matched / total if total else 0.0
        return SolverResult(
            node_id='c1_cs_004', correct=(score >= 0.5),
            user_answer=user_answer, expected=expected,
            explanation=_build_uses_explanation(exp_map, matched, total),
            score=score
        )

    if qtype == 'short':
        exp_tokens = _token_set(expected)
        ua_tokens  = _token_set(user_answer)
        overlap = len(ua_tokens & exp_tokens)
        score   = overlap / len(exp_tokens) if exp_tokens else 0.0
        return SolverResult(
            node_id='c1_cs_004', correct=(score >= 0.4),
            user_answer=user_answer, expected=expected,
            explanation=_explain_004_short(expected, indian_context),
            score=score
        )

    return SolverResult('c1_cs_004', False, user_answer, expected,
                        'Unknown question type.', 0.0)

def _explain_004_mcq(q, opts, ci, ic):
    label = opts[ci] if ci < len(opts) else ''
    return (f"The correct answer is **{label}**.\n"
            "Computers are used everywhere:\n"
            "- Home: games, videos, calls\n"
            "- School: learning, typing\n"
            "- Office: writing, printing, storing files")

def _explain_004_short(exp, ic):
    return (f"Expected answer includes: **{exp}**\n"
            "A good answer mentions at least one use from home, school, "
            "or office setting.")

def _build_uses_explanation(exp_map, matched, total):
    lines = [f"You matched {matched}/{total} pairs correctly."]
    for k, v in exp_map.items():
        lines.append(f"  {k} → {v}")
    return "\n".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

_SOLVERS = {
    'c1_cs_001': solve_c1_cs_001,
    'c1_cs_002': solve_c1_cs_002,
    'c1_cs_003': solve_c1_cs_003,
    'c1_cs_004': solve_c1_cs_004,
}

def solve(node_id: str, qtype: str, question: str,
          user_answer: str, expected: str,
          options: Optional[list[str]] = None,
          correct_index: int = 0,
          indian_context: bool = False) -> SolverResult:
    """Main entry point — dispatch to node-specific solver."""
    solver = _SOLVERS.get(node_id)
    if solver is None:
        return SolverResult(node_id, False, user_answer, expected,
                            f'Unknown node_id: {node_id}', 0.0)
    return solver(qtype, question, user_answer, expected,
                  options or [], correct_index, indian_context)


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    random.seed(42)

    tests = [
        ('c1_cs_001', 'mcq',
         'Which of these is a natural thing?',
         'tree', 'tree', ['tree','chair','book','toy'], 0, False),
        ('c1_cs_001', 'tf',  'A chair is a natural thing.', 'false',
         'false', [], 0, False),
        ('c1_cs_001', 'classify', 'Sort: tree, chair, book, water, toy',
         'tree,water,chair,book,toy', 'tree,water|chair,book,toy', [], 0, True),

        ('c1_cs_002', 'mcq',
         'Which is NOT a feature of a computer?',
         'eating', 'eating', ['speed','storage','diligence','eating'], 3, False),
        ('c1_cs_002', 'fill',
         'A computer is a ____ machine.',
         'smart', 'smart', [], 0, False),

        ('c1_cs_003', 'mcq',
         'Which computer folds like a book?',
         'laptop', 'laptop', ['desktop','laptop','tablet','smartphone'], 1, False),
        ('c1_cs_003', 'match',
         'Match types with features',
         'desktop=desk; laptop=folds', 'desktop=stays on desk;laptop=folds like a book',
         [], 0, False),

        ('c1_cs_004', 'mcq',
         'Where do we use computers to learn?',
         'school', 'school', ['home','school','office','park'], 1, False),
        ('c1_cs_004', 'short',
         'Name one use of a computer at home.',
         'watching videos', 'playing games', [], 0, True),
    ]

    passed = 0
    for args in tests:
        res = solve(*args)
        status = '✓' if res.correct else '✗'
        if res.correct:
            passed += 1
        print(f"{status} [{res.node_id}] score={res.score:.0%} "
              f"ans='{res.user_answer}' → expected='{res.expected}'")

    print(f"\n{passed}/{len(tests)} tests passed")