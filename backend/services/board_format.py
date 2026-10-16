"""board_format.py — board-specific answer-shape profiles (CBSE vs CISCE/ICSE).

Same correct mathematics, different paper conventions.  A student's answer
must match the *board's* marking contract, not just be right:

CBSE Class X Maths (2025-26 pattern, 80 marks / 3h):
    A  Q1-18  MCQ                       1m   letter only — no working awarded
       Q19-20 Assertion-Reason          1m   letter only
    B  Q21-25 VSA                       2m   ~2 marking steps; method + answer
    C  Q26-31 SA                        3m   ~3 marking steps
    D  Q32-35 LA                        5m   full working; prove/verify asks
                                             credit figure+given+construction
    E  Q36-38 case study                4m   sub-parts i(1)+ii(1)+iii(2)
    Internal choice: 2 Qs each in B, C, D; part (iii) of every case study.
    Step-marking: correct method earns the method step even on arithmetic
    slips (MS steps carry explicit fractional marks: ½/1 each).

ICSE Class X Maths (80 marks / 2.5h):
    A  compulsory — mixed MCQ + short constructed (Q1-3 style)
    B  choice — attempt 4 of ~6 structured questions, each split
       (a)(b)(c) ~3+3+4 marks
    Working is part of the mark: an unsupported correct answer earns
    less than a wrong answer with correct method.  Statement of the
    formula/theorem used is expected before substitution.

Emission contract: expected_format(question, board) -> the shape rules the
answer-writer / coach must satisfy.  Pure data + lookup — no solving here.
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional

# --------------------------------------------------------------------------- #
# CBSE Class X Maths — section rules keyed by (qlo, qhi)
# --------------------------------------------------------------------------- #

CBSE_X_MATHS: List[Dict[str, Any]] = [
    {
        "qlo": 1, "qhi": 18, "section": "A", "kind": "mcq", "marks": 1,
        "form": "option letter only",
        "rules": [
            "write only the option letter — no working is read",
            "double-check elimination on 'not / except' stems",
        ],
    },
    {
        "qlo": 19, "qhi": 20, "section": "A", "kind": "assertion_reason", "marks": 1,
        "form": "option letter (A–D) only",
        "rules": [
            "judge A and R independently, then whether R explains A",
            "both-true-but-R-not-the-explanation is the classic trap",
        ],
    },
    {
        "qlo": 21, "qhi": 25, "section": "B", "kind": "vsa", "marks": 2,
        "form": "2 marking steps",
        "rules": [
            "one line of method/identity + one line of result",
            "state the formula or theorem used",
            "answer with unit if the question has one",
        ],
    },
    {
        "qlo": 26, "qhi": 31, "section": "C", "kind": "sa", "marks": 3,
        "form": "3 marking steps",
        "rules": [
            "step 1 restate given / choose the method",
            "step 2 carry the computation or construction",
            "step 3 conclude and answer in the asked form",
            "OR-questions: attempt exactly one branch, label it",
        ],
    },
    {
        "qlo": 32, "qhi": 35, "section": "D", "kind": "la", "marks": 5,
        "form": "full worked solution",
        "rules": [
            "proofs: 'Given / To prove / Construction / Proof' blocks",
            "show every algebraic step — skipped lines cost step-marks",
            "end with a declared final answer",
            "figures earn marks where the MS lists 'correct figure'",
        ],
    },
    {
        "qlo": 36, "qhi": 38, "section": "E", "kind": "case_study", "marks": 4,
        "form": "3 sub-parts (1+1+2)",
        "rules": [
            "answer (i),(ii),(iii) separately, labelled",
            "part (iii) has OR choice — pick one branch only",
            "read data off the case stem, not from memory",
        ],
    },
]

# --------------------------------------------------------------------------- #
# ICSE Class X Maths — section A compulsory + section B choice
# --------------------------------------------------------------------------- #

ICSE_X_MATHS: List[Dict[str, Any]] = [
    {
        "section": "A", "kind": "compulsory", "marks_total": 40,
        "form": "all questions compulsory — mixed MCQ + short constructed",
        "rules": [
            "every sub-part attempted; no choice in this section",
            "show working even for short questions",
        ],
    },
    {
        "section": "B", "kind": "structured_choice", "marks_total": 40,
        "form": "attempt any FOUR of the questions; each splits (a)(b)(c) ≈ 3+3+4",
        "rules": [
            "complete working is part of the mark",
            "state the formula/theorem before substituting",
            "a correct final answer with no working earns less than",
            "a wrong final answer with correct method",
            "choose 4 questions you can finish — no partial credit",
            "across unattempted questions",
        ],
    },
]

_PROFILES = {
    ("cbse", "class_x", "maths"): CBSE_X_MATHS,
    ("icse", "class_x", "maths"): ICSE_X_MATHS,
    ("cisce", "class_x", "maths"): ICSE_X_MATHS,
}


def expected_format(board: str, class_label: str, subject: str,
                    qno: Optional[int] = None) -> Dict[str, Any]:
    """The answer-shape contract for one question (or the whole paper).

    Returns {'board', 'sections'} always; when qno is given and the profile
    is question-ranged (CBSE), also returns the matching section's rules.
    """
    key = (board.lower(), class_label.lower(), subject.lower())
    sections = _PROFILES.get(key)
    if not sections:
        return {"board": board, "sections": [], "found": False}
    out: Dict[str, Any] = {"board": board, "sections": sections, "found": True}
    if qno is not None:
        for s in sections:
            if s.get("qlo") and s["qlo"] <= qno <= s["qhi"]:
                out["section"] = s
                break
    return out


def format_rules_for_paper(board: str, paper: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Attach the board's format contract to each question of a clean paper."""
    sections = _PROFILES.get((board.lower(), paper["class_label"].lower(),
                              paper["subject"].lower()))
    if not sections:
        return []
    for q in paper["questions"]:
        for s in sections:
            if s.get("qlo") and s["qlo"] <= q["qno"] <= s["qhi"]:
                q["answer_format"] = s
                break
    return paper["questions"]
