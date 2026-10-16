"""Class 7 Economics Solver — grounded in corpus nodes c7_eco_ch01..ch04.

Chapters:
  ch01 - Barter & Money            (nodes c7_eco_ch01_001..010)
  ch02 - Markets                   (nodes c7_eco_ch02_001..010)
  ch03 - Infrastructure            (nodes c7_eco_ch03_001..011)
  ch04 - Banks & Financial Systems (nodes c7_eco_ch04_001..011)

Deterministic only: every solve is a bank lookup or rule check — no LLM.
Fail-closed contract: a question not covered by the banks returns
verification failed with answer None, never a guess.
"""

import random
from typing import Any, Dict, List

# ---------------------------------------------------------------------------
# QUESTION BANKS — every item is grounded in a corpus node definition.
# ---------------------------------------------------------------------------

_BANK_CH1_MCQ = [
    {"q": "In a barter system, goods are exchanged for:",
     "options": {"A": "other goods and services directly, without money",
                 "B": "paper currency only", "C": "gold coins minted by the king",
                 "D": "bank deposits"},
     "answer": "A", "node": "c7_eco_ch01_001"},
    {"q": "The main limitation of the barter system is:",
     "options": {"A": "money loses value", "B": "the double coincidence of wants is required",
                 "C": "goods cannot be produced", "D": "markets are illegal"},
     "answer": "B", "node": "c7_eco_ch01_002"},
    {"q": "The double coincidence of wants means:",
     "options": {"A": "two parties each desire what the other offers",
                 "B": "buying two items at once", "C": "two currencies in one trade",
                 "D": "selling in two markets"},
     "answer": "A", "node": "c7_eco_ch01_002"},
    {"q": "The emergence of money solved barter's main problem by acting as a:",
     "options": {"A": "universally accepted medium of exchange",
                 "B": "government tax", "C": "type of grain", "D": "store room"},
     "answer": "A", "node": "c7_eco_ch01_003"},
    {"q": "Which of these is an example of EARLY commodity money?",
     "options": {"A": "cowrie shells and salt", "B": "UPI transfer",
                 "C": "paper ten-rupee note", "D": "cheque"},
     "answer": "A", "node": "c7_eco_ch01_004"},
    {"q": "Metallic money improved on commodity money because coins had guaranteed:",
     "options": {"A": "weight and purity", "B": "colour and shape",
                 "C": "pictures of kings only", "D": "paper backing"},
     "answer": "A", "node": "c7_eco_ch01_005"},
    {"q": "Paper currency is legal tender issued by:",
     "options": {"A": "any trader", "B": "a central monetary authority",
                 "C": "village panchayats", "D": "foreign banks only"},
     "answer": "B", "node": "c7_eco_ch01_006"},
    {"q": "Which of these is a MODERN (non-physical) form of money?",
     "options": {"A": "copper coins", "B": "cowrie shells", "C": "bank deposits and digital money",
                 "D": "salt bars"},
     "answer": "C", "node": "c7_eco_ch01_007"},
    {"q": "Besides being a medium of exchange, money also acts as a:",
     "options": {"A": "store of value", "B": "source of friction",
                 "C": "replacement for labour", "D": "type of tax"},
     "answer": "A", "node": "c7_eco_ch01_008"},
    {"q": "UPI payments and mobile wallets are examples of:",
     "options": {"A": "electronic/digital transactions", "B": "barter",
                 "C": "commodity money", "D": "metallic money"},
     "answer": "A", "node": "c7_eco_ch01_009"},
]

_BANK_CH2_MCQ = [
    {"q": "A market is best described as:",
     "options": {"A": "an arrangement where buyers and sellers meet to exchange goods/services",
                 "B": "a government office", "C": "a factory floor",
                 "D": "a bank branch"},
     "answer": "A", "node": "c7_eco_ch02_001"},
    {"q": "By geographic scope, markets are classified as local, regional, national and:",
     "options": {"A": "weekly", "B": "global", "C": "monthly", "D": "informal"},
     "answer": "B", "node": "c7_eco_ch02_003"},
    {"q": "A weekly market set up on a fixed day in a public space is called a:",
     "options": {"A": "mall", "B": "haat", "C": "stock exchange", "D": "warehouse"},
     "answer": "B", "node": "c7_eco_ch02_005"},
    {"q": "The government's role in markets includes setting rules to:",
     "options": {"A": "fix all prices daily", "B": "protect consumers and prevent unfair monopolies",
                 "C": "ban all private trade", "D": "own every shop"},
     "answer": "B", "node": "c7_eco_ch02_006"},
    {"q": "A buyer knowing about quality, price and certification marks before purchase shows:",
     "options": {"A": "consumer awareness", "B": "double coincidence",
                 "C": "migration", "D": "urbanisation"},
     "answer": "A", "node": "c7_eco_ch02_007"},
    {"q": "Market price is determined by the interaction of:",
     "options": {"A": "demand and supply", "B": "police and courts",
                 "C": "roads and bridges", "D": "births and deaths"},
     "answer": "A", "node": "c7_eco_ch02_008"},
    {"q": "Farming, manufacturing and services are respectively examples of:",
     "options": {"A": "primary, secondary and tertiary activities",
                 "B": "local, regional and national markets",
                 "C": "deposit, loan and interest", "D": "push, pull and hold factors"},
     "answer": "A", "node": "c7_eco_ch02_009"},
    {"q": "Exploitation in markets happens when one party has much more:",
     "options": {"A": "power or knowledge than the other",
                 "B": "advertising than goods", "C": "land than roads",
                 "D": "cash than coins"},
     "answer": "A", "node": "c7_eco_ch02_010"},
]

_BANK_CH3_MCQ = [
    {"q": "Roads, bridges, power grids and water supply networks are examples of:",
     "options": {"A": "physical infrastructure", "B": "paper currency",
                 "C": "human capital", "D": "double coincidence"},
     "answer": "A", "node": "c7_eco_ch03_001"},
    {"q": "Transportation infrastructure mainly helps move:",
     "options": {"A": "people, raw materials and finished goods",
                 "B": "only government files", "C": "money between banks only",
                 "D": "electricity only"},
     "answer": "A", "node": "c7_eco_ch03_002"},
    {"q": "Power grids and treated water pipelines are examples of:",
     "options": {"A": "utility infrastructure", "B": "communication networks",
                 "C": "weekly markets", "D": "payment systems"},
     "answer": "A", "node": "c7_eco_ch03_003"},
    {"q": "The internet and telephone systems belong to which infrastructure type?",
     "options": {"A": "communication networks", "B": "transportation",
                 "C": "energy", "D": "irrigation"},
     "answer": "A", "node": "c7_eco_ch03_004"},
    {"q": "Windmills, solar parks and oil pipelines are part of:",
     "options": {"A": "energy infrastructure", "B": "education infrastructure",
                 "C": "barter systems", "D": "stock markets"},
     "answer": "A", "node": "c7_eco_ch03_005"},
    {"q": "Better infrastructure improves quality of life mainly by providing:",
     "options": {"A": "all-weather roads, clean water and reliable electricity",
                 "B": "more bank branches only", "C": "longer queues", "D": "higher taxes only"},
     "answer": "A", "node": "c7_eco_ch03_007"},
    {"q": "Villages often lag behind cities in roads, electricity and water. This disparity is called the:",
     "options": {"A": "rural-urban infrastructure gap", "B": "double coincidence of wants",
                 "C": "demographic dividend", "D": "chain of markets"},
     "answer": "A", "node": "c7_eco_ch03_010"},
    {"q": "Infrastructure designed to meet today's needs without depleting natural assets is called:",
     "options": {"A": "sustainable infrastructure", "B": "metallic money",
                 "C": "weekly market", "D": "current account"},
     "answer": "A", "node": "c7_eco_ch03_011"},
]

_BANK_CH4_MCQ = [
    {"q": "A bank is a financial institution that primarily:",
     "options": {"A": "accepts deposits and lends money",
                 "B": "manufactures goods", "C": "builds highways", "D": "runs schools"},
     "answer": "A", "node": "c7_eco_ch04_002"},
    {"q": "Banks act as a bridge between:",
     "options": {"A": "savers and borrowers", "B": "buyers and roads",
                 "C": "farmers and rainfall", "D": "markets and haats"},
     "answer": "A", "node": "c7_eco_ch04_002"},
    {"q": "A depositor earns interest, while a borrower:",
     "options": {"A": "pays interest", "B": "receives interest", "C": "avoids the bank",
                 "D": "prints currency"},
     "answer": "A", "node": "c7_eco_ch04_007"},
    {"q": "Which account type is tailored for long-term saving at a higher interest rate?",
     "options": {"A": "Fixed Deposit", "B": "Current account", "C": "Savings account",
                 "D": "Trading account"},
     "answer": "A", "node": "c7_eco_ch04_005"},
    {"q": "Cheques, UPI and mobile wallets are examples of:",
     "options": {"A": "payment systems", "B": "energy infrastructure",
                 "C": "population structure", "D": "weekly markets"},
     "answer": "A", "node": "c7_eco_ch04_008"},
    {"q": "The stock market is where buyers and sellers trade:",
     "options": {"A": "shares of publicly held companies",
                 "B": "vegetables and grains", "C": "coins for shells", "D": "land records only"},
     "answer": "A", "node": "c7_eco_ch04_009"},
    {"q": "India's central bank, which issues currency and regulates commercial banks, is the:",
     "options": {"A": "Reserve Bank of India (RBI)", "B": "State Bank of India",
                 "C": "NITI Aayog", "D": "Ministry of Markets"},
     "answer": "A", "node": "c7_eco_ch04_011"},
    {"q": "Financial infrastructure helps the economy by channeling:",
     "options": {"A": "savings into productive investments",
                 "B": "tourists into cities", "C": "rain into rivers",
                 "D": "goods into barter"},
     "answer": "A", "node": "c7_eco_ch04_010"},
]

_BANK_CH1_FILL = [
    {"q": "The direct exchange of goods for goods without using money is called the ______ system.",
     "answer": "barter", "node": "c7_eco_ch01_001"},
    {"q": "Barter works only when both parties want what the other has — this is called double ______ of wants.",
     "answer": "coincidence", "node": "c7_eco_ch01_002"},
    {"q": "Cowrie shells, cattle, salt and grain were used as early forms of ______.",
     "answer": "money", "node": "c7_eco_ch01_004"},
    {"q": "Coins minted with guaranteed weight and purity are called ______ money.",
     "answer": "metallic", "node": "c7_eco_ch01_005"},
    {"q": "Money lets us save today's purchasing power for the future because it acts as a store of ______.",
     "answer": "value", "node": "c7_eco_ch01_008"},
    {"q": "Transferring funds through mobile phones without physical cash is called a ______ transaction.",
     "answer": "digital", "node": "c7_eco_ch01_009"},
]

_BANK_CH2_FILL = [
    {"q": "An arrangement where buyers and sellers meet to exchange goods and services is a ______.",
     "answer": "market", "node": "c7_eco_ch02_001"},
    {"q": "A periodic market held on a fixed day each week in rural India is called a ______.",
     "answer": "haat", "node": "c7_eco_ch02_005"},
    {"q": "The price of a good is set where consumer demand meets producer ______.",
     "answer": "supply", "node": "c7_eco_ch02_008"},
    {"q": "Farming and fishing belong to the ______ sector of economic activity.",
     "answer": "primary", "node": "c7_eco_ch02_009"},
    {"q": "Knowledge about safety, quality and price before buying is called consumer ______.",
     "answer": "awareness", "node": "c7_eco_ch02_007"},
]

_BANK_CH3_FILL = [
    {"q": "Roads, bridges and railways that move people and goods are ______ infrastructure.",
     "answer": "transportation", "node": "c7_eco_ch03_002"},
    {"q": "Electric power grids and water pipelines are examples of ______ infrastructure.",
     "answer": "utility", "node": "c7_eco_ch03_003"},
    {"q": "The disparity in infrastructure quality between villages and cities is the rural-urban infrastructure ______.",
     "answer": "gap", "node": "c7_eco_ch03_010"},
    {"q": "Infrastructure that meets present needs without depleting natural assets is ______ infrastructure.",
     "answer": "sustainable", "node": "c7_eco_ch03_011"},
]

_BANK_CH4_FILL = [
    {"q": "A ______ is a licensed institution that accepts deposits from the public and lends money.",
     "answer": "bank", "node": "c7_eco_ch04_002"},
    {"q": "The extra money a borrower pays on a loan is called ______.",
     "answer": "interest", "node": "c7_eco_ch04_007"},
    {"q": "UPI and mobile wallets are modern ______ systems.",
     "answer": "payment", "node": "c7_eco_ch04_008"},
    {"q": "India's central bank is the Reserve Bank of ______.",
     "answer": "India", "node": "c7_eco_ch04_011"},
    {"q": "A place where shares of public companies are bought and sold is the ______ market.",
     "answer": "stock", "node": "c7_eco_ch04_009"},
]

_ALL_MCQ_BANKS = {
    "ch1": _BANK_CH1_MCQ, "ch2": _BANK_CH2_MCQ,
    "ch3": _BANK_CH3_MCQ, "ch4": _BANK_CH4_MCQ,
}
_ALL_FILL_BANKS = {
    "ch1": _BANK_CH1_FILL, "ch2": _BANK_CH2_FILL,
    "ch3": _BANK_CH3_FILL, "ch4": _BANK_CH4_FILL,
}


def _fail(topic: str, reason: str) -> Dict[str, Any]:
    return {
        "answer": None,
        "steps": [f"Cannot answer deterministically: {reason}"],
        "verification": {"passed": False, "details": f"{topic}: {reason}"},
    }


def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """Answer an MCQ by exact lookup in the grounded banks. Fail-closed."""
    question = (params.get("question") or "").strip()
    user_answer = params.get("user_answer")
    for _ch, bank in _ALL_MCQ_BANKS.items():
        for entry in bank:
            if entry["q"].strip() == question:
                correct = entry["answer"]
                correct_text = entry["options"][correct]
                return {
                    "answer": {
                        "correct_option": correct,
                        "correct_text": correct_text,
                        "user_correct": user_answer == correct if user_answer else None,
                    },
                    "steps": [
                        "Matched the question against the Class 7 Economics bank "
                        f"(source node {entry['node']})",
                        f"Recalled the fact: {correct_text}",
                        f"Selected option {correct}",
                    ],
                    "verification": {"passed": True, "details": entry["node"]},
                }
    return _fail("solve_mcq", "question not in the grounded bank — refusing to guess")


def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """Answer a fill-in-the-blank by exact lookup. Fail-closed."""
    question = (params.get("question") or "").strip()
    for _ch, bank in _ALL_FILL_BANKS.items():
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


def solve_short_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Short-answer support: locate the covering bank item and return its fact."""
    question = (params.get("question") or "").strip().lower()
    if not question:
        return _fail("solve_short_answer", "empty question")
    best = None
    for bank in list(_ALL_MCQ_BANKS.values()) + list(_ALL_FILL_BANKS.values()):
        for entry in bank:
            qtext = entry["q"].lower()
            words = [w for w in qtext.replace("______", " ").split() if len(w) > 4]
            if words:
                hits = sum(1 for w in words if w in question)
                score = hits / len(words)
                if best is None or score > best[0]:
                    best = (score, entry)
    if best and best[0] >= 0.45:
        entry = best[1]
        return {
            "answer": {
                "key_fact": entry["options"][entry["answer"]] if "options" in entry else entry["answer"],
                "source": entry["node"],
                "confidence": round(best[0], 2),
            },
            "steps": [
                f"Located the closest grounded fact ({entry['node']})",
                "Returned the fact with its corpus source for verification",
            ],
            "verification": {"passed": True, "details": f"match strength {best[0]:.2f}"},
        }
    return _fail("solve_short_answer", "no grounded fact matched strongly enough — refusing to guess")


def solve(params: Dict[str, Any]) -> Dict[str, Any]:
    """Dispatcher: route by declared type, else infer from the payload."""
    qtype = params.get("type") or params.get("question_type")
    if qtype in ("mcq", "MCQ", "multiple_choice"):
        return solve_mcq(params)
    if qtype in ("fill_blank", "fill", "fill_in_the_blank"):
        return solve_fill_blank(params)
    if qtype in ("short_answer", "short"):
        return solve_short_answer(params)
    if params.get("options"):
        return solve_mcq(params)
    if "______" in (params.get("question") or ""):
        return solve_fill_blank(params)
    return solve_short_answer(params)


SOLVER_REGISTRY = {
    "c7_eco_mcq": solve_mcq,
    "c7_eco_fill_blank": solve_fill_blank,
    "c7_eco_short_answer": solve_short_answer,
    "c7_eco_solve": solve,
}


class Class7EconQuestionGenerator:
    """Deterministic practice-question generator over the same grounded banks."""

    TOPIC_BY_CH = {
        "ch1": "Money and Barter",
        "ch2": "Markets Around Us",
        "ch3": "Infrastructure",
        "ch4": "Banks and Financial Systems",
    }

    def __init__(self, seed: int = 0):
        self.rng = random.Random(seed)

    def generate_questions(self, count: int = 10) -> List[Dict[str, Any]]:
        out: List[Dict[str, Any]] = []
        for i in range(max(0, count)):
            use_mcq = i % 3 != 2
            ch = self.rng.choice(list(_ALL_MCQ_BANKS.keys() if use_mcq else _ALL_FILL_BANKS.keys()))
            if use_mcq:
                e = self.rng.choice(_ALL_MCQ_BANKS[ch])
                out.append({
                    "id": f"c7eco_{e['node']}_{self.rng.randint(1000, 9999)}",
                    "type": "mcq",
                    "topic": self.TOPIC_BY_CH[ch],
                    "difficulty": "medium",
                    "question": e["q"],
                    "options": e["options"],
                    "answer": e["answer"],
                    "explanation": f"Grounded in the Class 7 Economics corpus ({e['node']}).",
                })
            else:
                e = self.rng.choice(_ALL_FILL_BANKS[ch])
                out.append({
                    "id": f"c7eco_{e['node']}_{self.rng.randint(1000, 9999)}",
                    "type": "fill_blank",
                    "topic": self.TOPIC_BY_CH[ch],
                    "difficulty": "easy",
                    "question": e["q"],
                    "options": {},
                    "answer": e["answer"],
                    "explanation": f"Grounded in the Class 7 Economics corpus ({e['node']}).",
                })
        return out


QUESTION_GEN_REGISTRY = {
    "c7_eco_questions": Class7EconQuestionGenerator,
}
