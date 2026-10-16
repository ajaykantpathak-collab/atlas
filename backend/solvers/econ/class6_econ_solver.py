"""Class 6 Economics Solver — grounded in corpus nodes c6_economics_ch11_001..006.

Topics: barter, double coincidence of wants, commodity money, functions of
money, evolution of currency, money in daily life (earn/spend/save).

Deterministic only — bank lookups, no LLM. Fail-closed contract.
"""

import random
from typing import Any, Dict, List

_BANK_MCQ = [
    {"q": "In the barter system, people exchanged goods or services for:",
     "options": {"A": "other goods or services directly, without money",
                 "B": "paper notes", "C": "bank cheques", "D": "digital money"},
     "answer": "A", "node": "c6_economics_ch11_001"},
    {"q": "For a barter trade to succeed, both people must want what the other offers. This is called:",
     "options": {"A": "double coincidence of wants", "B": "single ownership",
                 "C": "market price", "D": "saving money"},
     "answer": "A", "node": "c6_economics_ch11_002"},
    {"q": "Shells and salt used for trade are examples of:",
     "options": {"A": "commodity money", "B": "paper currency",
                 "C": "bank deposits", "D": "digital wallets"},
     "answer": "A", "node": "c6_economics_ch11_003"},
    {"q": "Which of these is a function of money?",
     "options": {"A": "a medium of exchange", "B": "a measure of value",
                 "C": "a store of wealth", "D": "all of these"},
     "answer": "D", "node": "c6_economics_ch11_004"},
    {"q": "The evolution of currency moved from heavy metal coins to:",
     "options": {"A": "portable paper notes and digital payments",
                 "B": "heavier coins", "C": "barter again", "D": "shells"},
     "answer": "A", "node": "c6_economics_ch11_005"},
    {"q": "Keeping some money aside instead of spending it is called:",
     "options": {"A": "saving", "B": "earning", "C": "spending", "D": "bartering"},
     "answer": "A", "node": "c6_economics_ch11_006"},
    {"q": "Gaining income through work is called:",
     "options": {"A": "earning", "B": "saving", "C": "borrowing", "D": "trading"},
     "answer": "A", "node": "c6_economics_ch11_006"},
    {"q": "Money removed the biggest problem of barter, which was:",
     "options": {"A": "the need for a double coincidence of wants",
                 "B": "too many markets", "C": "heavy coins only",
                 "D": "the lack of goods"},
     "answer": "A", "node": "c6_economics_ch11_004"},
]

_BANK_FILL = [
    {"q": "The early method of trading goods directly for goods, without money, is called ______.",
     "answer": "barter", "node": "c6_economics_ch11_001"},
    {"q": "In barter, both traders must want exactly what the other offers — the double ______ of wants.",
     "answer": "coincidence", "node": "c6_economics_ch11_002"},
    {"q": "Items with their own natural value, like shells or salt, were used as ______ money.",
     "answer": "commodity", "node": "c6_economics_ch11_003"},
    {"q": "Keeping money aside for future use is called ______.",
     "answer": "saving", "node": "c6_economics_ch11_006"},
    {"q": "Money acts as a standard for ______ payments, so we can promise to pay later.",
     "answer": "future", "node": "c6_economics_ch11_004"},
]

_BANKS_MCQ = [_BANK_MCQ]
_BANKS_FILL = [_BANK_FILL]


def _fail(topic: str, reason: str) -> Dict[str, Any]:
    return {
        "answer": None,
        "steps": [f"Cannot answer deterministically: {reason}"],
        "verification": {"passed": False, "details": f"{topic}: {reason}"},
    }


def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """Answer an MCQ by exact lookup in the grounded bank. Fail-closed."""
    question = (params.get("question") or "").strip()
    user_answer = params.get("user_answer")
    for bank in _BANKS_MCQ:
        for entry in bank:
            if entry["q"].strip() == question:
                correct = entry["answer"]
                return {
                    "answer": {
                        "correct_option": correct,
                        "correct_text": entry["options"][correct],
                        "user_correct": user_answer == correct if user_answer else None,
                    },
                    "steps": [
                        f"Matched the question against the Class 6 Economics bank ({entry['node']})",
                        f"Recalled the fact: {entry['options'][correct]}",
                        f"Selected option {correct}",
                    ],
                    "verification": {"passed": True, "details": entry["node"]},
                }
    return _fail("solve_mcq", "question not in the grounded bank — refusing to guess")


def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """Fill-in-the-blank by exact lookup. Fail-closed."""
    question = (params.get("question") or "").strip()
    for bank in _BANKS_FILL:
        for entry in bank:
            if entry["q"].strip() == question:
                return {
                    "answer": {"word": entry["answer"]},
                    "steps": [
                        f"Matched the sentence against the grounded bank ({entry['node']})",
                        f"Filled the blank with '{entry['answer']}'",
                    ],
                    "verification": {"passed": True, "details": entry["node"]},
                }
    return _fail("solve_fill_blank", "question not in the grounded bank — refusing to guess")


def solve(params: Dict[str, Any]) -> Dict[str, Any]:
    """Dispatcher by type or payload shape."""
    qtype = params.get("type") or params.get("question_type")
    if qtype in ("mcq", "MCQ", "multiple_choice"):
        return solve_mcq(params)
    if qtype in ("fill_blank", "fill", "fill_in_the_blank"):
        return solve_fill_blank(params)
    if params.get("options"):
        return solve_mcq(params)
    if "______" in (params.get("question") or ""):
        return solve_fill_blank(params)
    return _fail("solve", "could not classify the question — refusing to guess")


SOLVER_REGISTRY = {
    "c6_econ_mcq": solve_mcq,
    "c6_econ_fill_blank": solve_fill_blank,
    "c6_econ_solve": solve,
}


class Class6EconQuestionGenerator:
    """Deterministic practice questions from the same grounded bank."""

    TOPIC = "Money and Barter (Class 6)"

    def __init__(self, seed: int = 0):
        self.rng = random.Random(seed)

    def generate_questions(self, count: int = 10) -> List[Dict[str, Any]]:
        out: List[Dict[str, Any]] = []
        for i in range(max(0, count)):
            if i % 3 == 2:
                e = self.rng.choice(_BANK_FILL)
                out.append({
                    "id": f"c6econ_{e['node']}_{self.rng.randint(1000, 9999)}",
                    "type": "fill_blank", "topic": self.TOPIC,
                    "difficulty": "easy", "question": e["q"],
                    "options": {}, "answer": e["answer"],
                    "explanation": f"Grounded in the Class 6 Economics corpus ({e['node']}).",
                })
            else:
                e = self.rng.choice(_BANK_MCQ)
                out.append({
                    "id": f"c6econ_{e['node']}_{self.rng.randint(1000, 9999)}",
                    "type": "mcq", "topic": self.TOPIC,
                    "difficulty": "easy" if i % 2 else "medium",
                    "question": e["q"], "options": e["options"], "answer": e["answer"],
                    "explanation": f"Grounded in the Class 6 Economics corpus ({e['node']}).",
                })
        return out


QUESTION_GEN_REGISTRY = {
    "c6_econ_questions": Class6EconQuestionGenerator,
}
