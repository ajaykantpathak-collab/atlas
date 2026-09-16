"""
CISCE Class 12 Business Studies - Deterministic Solver and Question Generator
Covers: Principles and Functions of Management (nature, principles, planning,
        organizing, staffing, directing, leadership, controlling),
        Business Finance and Marketing (financial management, markets,
        marketing, consumer protection).

Deterministic, seed-parameterized question bank with a ``generate_questions``
adapter compatible with backend.its.engagement.generator_registry.

No LLM in computation. Standard library only.
"""

import random
import hashlib
import json
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


# ======================================================================
# UTILITIES
# ======================================================================

def make_seed(*args) -> int:
    """Deterministic integer seed from any number of arguments."""
    raw = json.dumps(args, sort_keys=True, default=str)
    h = hashlib.md5(raw.encode()).hexdigest()
    return int(h, 16) % (2 ** 31)


def normalize(s: str) -> str:
    """Normalise whitespace and case for comparison."""
    return " ".join(s.lower().split())


def shuffle_deterministic(seed: int, items: List[Any]) -> List[Any]:
    """Return a shuffled copy of items using a fixed seed."""
    r = random.Random(seed)
    result = list(items)
    r.shuffle(result)
    return result


# ======================================================================
# MASTER QUESTION BANK
# ======================================================================

_QUESTION_BANK: List[Dict[str, Any]] = [
    # ── NATURE AND SIGNIFICANCE OF MANAGEMENT ─────────────────────────
    {
        "id": "C12B_MGT_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Nature of Management",
        "question": "Management is best described as:",
        "options": ["A - An art only", "B - A science only", "C - Both an art and a science", "D - Neither art nor science"],
        "answer": "C",
        "explanation": "Management has features of both: it uses systematically acquired knowledge (science) and requires personal skill, creativity and practice in application (art).",
        "competency": False,
    },
    {
        "id": "C12B_MGT_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Nature of Management",
        "question": "Which function of management is considered the base of all other functions?",
        "options": ["A - Organizing", "B - Staffing", "C - Planning", "D - Controlling"],
        "answer": "C",
        "explanation": "Planning is the primary function: it precedes organizing, staffing, directing and controlling because all other functions depend on deciding in advance what is to be done, how, when and by whom.",
        "competency": False,
    },
    {
        "id": "C12B_MGT_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Nature of Management",
        "question": "Explain 'management is a group activity' with an example.",
        "options": [],
        "answer": "An organisation is a collection of diverse individuals with different needs; management helps them work together towards common organisational goals. Example: in a textile company, production, marketing and finance departments must coordinate so that cloth reaches customers on time - no single individual can achieve this alone.",
        "explanation": "Management converts individual effort into collective achievement by aligning personal objectives with organisational objectives.",
        "competency": False,
    },
    # ── PRINCIPLES OF MANAGEMENT ──────────────────────────────────────
    {
        "id": "C12B_PRN_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Principles of Management",
        "question": "'Unity of command' as given by Fayol means an employee should receive orders from:",
        "options": ["A - All superiors", "B - One boss only", "C - Two bosses", "D - The workers' union"],
        "answer": "B",
        "explanation": "Fayol's principle of unity of command states that an employee should receive orders from one superior only, to avoid conflict and confusion of authority.",
        "competency": False,
    },
    {
        "id": "C12B_PRN_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Principles of Management",
        "question": "Taylor's technique of 'Functional Foremanship' violates which principle of Fayol?",
        "options": ["A - Unity of direction", "B - Unity of command", "C - Order", "D - Initiative"],
        "answer": "B",
        "explanation": "Under functional foremanship, a worker receives instructions from eight specialist foremen - four for planning and four for production - which violates Fayol's unity of command (one boss per employee).",
        "competency": True,
    },
    {
        "id": "C12B_PRN_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Principles of Management",
        "question": "Explain the principle of 'Equity' given by Fayol.",
        "options": [],
        "answer": "Equity means fair, kind and just treatment to all employees without discrimination based on gender, religion, caste or position. Managers should apply similar rules in similar situations. It builds loyalty, devotion and a sense of belonging among employees, improving morale and productivity.",
        "explanation": "Equity, along with 'justice done', strengthens employee trust in the organisation and reduces turnover.",
        "competency": False,
    },
    # ── PLANNING ──────────────────────────────────────────────────────
    {
        "id": "C12B_PLN_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Planning",
        "question": "Planning is said to be:",
        "options": ["A - Forward looking", "B - Backward looking", "C - Historical analysis", "D - Post-mortem of results"],
        "answer": "A",
        "explanation": "Planning is forward looking: it involves deciding in advance what to do and how to do it. It bridges the gap between where we are and where we want to go.",
        "competency": False,
    },
    {
        "id": "C12B_PLN_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Planning",
        "question": "Which of the following is a limitation of planning?",
        "options": ["A - Provides direction", "B - Reduces risk of uncertainty", "C - Does not guarantee success", "D - Facilitates decision making"],
        "answer": "C",
        "explanation": "Planning does not guarantee success: plans may fail due to unforeseen events, poor implementation or external changes, and managers may rely on previously successful plans without adapting them (planning rigidity is another limitation).",
        "competency": False,
    },
    {
        "id": "C12B_PLN_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Planning",
        "question": "Distinguish between policies and procedures in planning.",
        "options": [],
        "answer": "Policies are general guidelines that channel thinking in decision-making (e.g., 'recruitment through merit only'); they leave discretion to the decision maker. Procedures are exact sequences of steps to carry out a specified activity (e.g., the admission procedure of a college); they leave little discretion and answer 'how' a task is done.",
        "explanation": "Policies guide 'what' is acceptable; procedures prescribe the order of 'how' to execute routine tasks.",
        "competency": False,
    },
    # ── ORGANIZING ────────────────────────────────────────────────────
    {
        "id": "C12B_ORG_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Organizing",
        "question": "The formal structure of authority in which authority flows downward and accountability flows upward is:",
        "options": ["A - Decentralisation", "B - Delegation", "C - Formal organisation", "D - Informal organisation"],
        "answer": "C",
        "explanation": "The formal organisation deliberately creates defined positions, reporting relationships and channels: authority flows from superiors to subordinates and accountability rises from subordinates to superiors. Informal organisation arises from social interaction.",
        "competency": False,
    },
    {
        "id": "C12B_ORG_02",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Organizing",
        "question": "State any two points of importance of delegation.",
        "options": [],
        "answer": "1. Effective management: delegation frees the manager from routine work so he can focus on important matters. 2. Employee development: delegating authority gives subordinates experience and prepares them for higher positions. (Also: motivation, growth of the enterprise, basis of the organisational hierarchy.)",
        "explanation": "Delegation has three elements - authority, responsibility and accountability - and only authority can be delegated while accountability can never be.",
        "competency": False,
    },
    # ── STAFFING ──────────────────────────────────────────────────────
    {
        "id": "C12B_STF_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Staffing",
        "question": "The first step in the staffing process is:",
        "options": ["A - Recruitment", "B - Selection", "C - Estimating manpower requirements", "D - Placement and orientation"],
        "answer": "C",
        "explanation": "Staffing begins with estimating human resource requirements (workload analysis and workforce analysis) - determining how many and what kind of people are needed - before recruitment and selection can begin.",
        "competency": False,
    },
    {
        "id": "C12B_STF_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Staffing",
        "question": "Interviews, aptitude tests and reference checks are steps in which process?",
        "options": ["A - Recruitment", "B - Selection", "C - Training", "D - Performance appraisal"],
        "answer": "B",
        "explanation": "Selection is choosing the most suitable candidate from the pool recruited, using tests, interviews, reference checks, medical evaluation and the employment decision. Recruitment merely seeks applicants.",
        "competency": False,
    },
    {
        "id": "C12B_STF_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Staffing",
        "question": "Explain 'on-the-job' training with any one method.",
        "options": [],
        "answer": "On-the-job training trains employees while they work at their jobs under supervision. Methods include apprenticeship (learner works under a master craftsperson, e.g., electricians), internship (combining theory with practice for professional courses) and job rotation (moving employees across jobs for all-round development).",
        "explanation": "On-the-job methods are economical because the trainee produces while learning, but productivity may dip during training.",
        "competency": False,
    },
    # ── DIRECTING AND LEADERSHIP ──────────────────────────────────────
    {
        "id": "C12B_DIR_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Directing",
        "question": "Directing is regarded as the 'heart' of management because it:",
        "options": ["A - Sets objectives", "B - Initiates action and is a continuing process",
                    "C - Records transactions", "D - Audits performance"],
        "answer": "B",
        "explanation": "Directing initiates action: plans and organisation remain paper arrangements until people are guided, supervised, motivated and led to act. It is also a continuing function performed at every level throughout the life of the enterprise.",
        "competency": False,
    },
    {
        "id": "C12B_DIR_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Directing",
        "question": "Maslow's hierarchy of needs arranges needs from lowest to highest in the order:",
        "options": ["A - Safety, physiological, esteem, social, self-actualization",
                    "B - Physiological, safety, social, esteem, self-actualization",
                    "C - Social, physiological, safety, self-actualization, esteem",
                    "D - Physiological, social, safety, self-actualization, esteem"],
        "answer": "B",
        "explanation": "Maslow's need hierarchy: physiological needs (food, shelter) -> safety/security needs -> social/affiliation needs -> esteem needs (recognition, status) -> self-actualization (realising one's potential). A satisfied need ceases to motivate; the next higher need motivates.",
        "competency": False,
    },
    {
        "id": "C12B_DIR_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Directing",
        "question": "State any two qualities of a good leader.",
        "options": [],
        "answer": "1. Physical and mental energy: a leader needs vigour, quick decisions and the capacity to work hard. 2. Integrity and self-confidence: followers trust a leader of character who is honest, consistent and self-assured. (Other qualities: communication skills, initiative, foresight, motivation skills.)",
        "explanation": "Leadership is the art of influencing people to work willingly towards organisational goals; qualities build the credibility that makes influence possible.",
        "competency": False,
    },
    # ── CONTROLLING ───────────────────────────────────────────────────
    {
        "id": "C12B_CTL_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Controlling",
        "question": "The first step in the controlling process is:",
        "options": ["A - Taking corrective action", "B - Analysing deviations", "C - Setting performance standards", "D - Comparing actual performance"],
        "answer": "C",
        "explanation": "Controlling begins with setting performance standards - the targets or benchmarks (quantitative or qualitative) against which actual performance will later be measured.",
        "competency": False,
    },
    {
        "id": "C12B_CTL_02",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Controlling",
        "question": "Explain the relationship between planning and controlling.",
        "options": [],
        "answer": "Planning is the basis of controlling: plans set the standards against which performance is compared, and without plans controlling is meaningless. Controlling, in turn, enforces plans and provides feedback - deviations found in controlling guide future plans. They are twin functions: planning without controlling is blind; controlling without planning is pointless.",
        "explanation": "Planning prescribes action; controlling evaluates it, making the two inseparable managerial twins.",
        "competency": False,
    },
    # ── FINANCIAL MANAGEMENT ──────────────────────────────────────────
    {
        "id": "C12B_FIN_01",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Financial Management",
        "question": "The financing decision of a company relates to:",
        "options": ["A - How much to invest in fixed assets", "B - The quantum and mix of debt and equity",
                    "C - Dividend payout policy", "D - Managing day-to-day working capital"],
        "answer": "B",
        "explanation": "The financing decision determines the amount of funds to be raised from long-term sources (owners' funds vs borrowed funds) and their mix - the capital structure that balances risk, cost and control.",
        "competency": False,
    },
    {
        "id": "C12B_FIN_02",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Financial Management",
        "question": "The primary objective of financial management is:",
        "options": ["A - Maximising sales", "B - Maximising shareholder wealth",
                    "C - Minimising employees", "D - Maximising production"],
        "answer": "B",
        "explanation": "Financial management aims at maximisation of shareholders' wealth - reflected in the market value of the company's shares - through sound investment, financing and dividend decisions.",
        "competency": False,
    },
    {
        "id": "C12B_FIN_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Financial Management",
        "question": "Distinguish between fixed capital and working capital with one example of each need.",
        "options": [],
        "answer": "Fixed capital is invested in long-term assets and is needed for acquiring them - e.g., funds to buy plant and machinery or land. Working capital is the capital needed for day-to-day operations and current assets - e.g., funds for paying wages or buying raw materials and inventory.",
        "explanation": "Fixed capital decisions are long-term investment decisions; working capital management keeps the operating cycle liquid.",
        "competency": False,
    },
    # ── FINANCIAL MARKETS ─────────────────────────────────────────────
    {
        "id": "C12B_FM_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Financial Markets",
        "question": "The market where previously issued securities are bought and sold is the:",
        "options": ["A - Primary market", "B - Secondary market", "C - Money market", "D - Foreign exchange market"],
        "answer": "B",
        "explanation": "The secondary market (stock exchange) is where existing securities are traded among investors; the issuing company receives no fresh funds. In the primary market new securities are issued directly to investors.",
        "competency": False,
    },
    {
        "id": "C12B_FM_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Financial Markets",
        "question": "Treasury bills, commercial paper and call money are instruments of the:",
        "options": ["A - Capital market", "B - Money market", "C - Primary market", "D - Commodity market"],
        "answer": "B",
        "explanation": "The money market deals in short-term instruments (maturity up to one year) such as treasury bills, commercial paper, call money and certificates of deposit. Capital market instruments (shares, debentures) have longer maturities.",
        "competency": False,
    },
    # ── MARKETING ─────────────────────────────────────────────────────
    {
        "id": "C12B_MKT_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Marketing",
        "question": "The four elements of the marketing mix are:",
        "options": ["A - Product, Price, Place, Promotion", "B - People, Process, Physical evidence, Price",
                    "C - Planning, Pricing, Packaging, Publicity", "D - Product, Profit, Place, People"],
        "answer": "A",
        "explanation": "The classic marketing mix (4 Ps) comprises Product (goods/services offered), Price (value charged), Place (distribution) and Promotion (communication). The extended 7 Ps add People, Process and Physical evidence for services.",
        "competency": False,
    },
    {
        "id": "C12B_MKT_02",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Marketing",
        "question": "Distinguish between marketing and selling on any two grounds.",
        "options": [],
        "answer": "1. Focus: selling focuses on transferring the product from seller to buyer (profits through sales volume); marketing focuses on identifying and satisfying customer needs (profits through customer satisfaction). 2. Scope: selling is one element of the wider marketing process; marketing begins before production (product planning) and continues after the sale (after-sales service).",
        "explanation": "Marketing is customer-oriented and wide in scope; selling is product-oriented and narrow.",
        "competency": False,
    },
    # ── CONSUMER PROTECTION ───────────────────────────────────────────
    {
        "id": "C12B_CP_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Consumer Protection",
        "question": "Under the Consumer Protection Act, 2019, a 'consumer' includes a person who buys goods for:",
        "options": ["A - Resale", "B - Commercial purpose", "C - Personal use or self-employment", "D - Free distribution"],
        "answer": "C",
        "explanation": "A consumer buys goods or avails services for personal use or for earning livelihood by self-employment. Buyers for resale or large commercial purposes are not consumers under the Act.",
        "competency": False,
    },
    {
        "id": "C12B_CP_02",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Consumer Protection",
        "question": "Explain any two remedies available to a consumer under the Consumer Protection Act, 2019.",
        "options": [],
        "answer": "1. Removal of defects: the commission can order the trader to repair, replace or remove defects in goods or deficiencies in services. 2. Refund or compensation: the trader can be ordered to refund the price paid or compensate the consumer for loss or injury caused by a defective product or unfair trade practice. (Other remedies: punitive damages, discontinuation of unfair practices, recall of goods.)",
        "explanation": "The three-tier consumer commissions (District, State, National) provide these remedies based on pecuniary jurisdiction.",
        "competency": False,
    },
]


# ======================================================================
# SOLVER FACADE
# ======================================================================

@dataclass
class SolveResult:
    """Standard return type for the solver."""
    question_id: str
    topic: str
    steps: List[str] = field(default_factory=list)
    answer: str = ""
    explanation: str = ""
    verification: str = ""


class Class12BusinessStudiesSolver:
    """Deterministic solver for CISCE Class 12 Business Studies."""

    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self.questions = _QUESTION_BANK

    def get_topics(self) -> List[str]:
        return sorted({q["topic"] for q in self.questions})

    def get_question_count(self) -> int:
        return len(self.questions)

    def solve(self, question_id: str = "") -> Dict[str, Any]:
        """Solve a specific question from the bank."""
        q = next((item for item in self.questions if item["id"] == question_id),
                 None)
        if q is None:
            return {"error": f"Unknown question_id: {question_id}"}
        return {
            "id": q["id"],
            "type": q["type"],
            "topic": q["topic"],
            "difficulty": q["difficulty"],
            "question": q["question"],
            "options": q.get("options", []),
            "answer": q.get("answer", ""),
            "explanation": q.get("explanation", ""),
            "competency": q.get("competency", False),
        }


# ======================================================================
# REGISTRY ADAPTER
# ======================================================================

def generate_questions(seed: int = 0, count: int = None,
                       topic: str = None) -> List[Dict[str, Any]]:
    """Registry adapter: deterministic questions for Class 12 Business Studies.

    Called as fn(seed) it returns one question; with count=N it returns N.
    """
    n = 1 if count is None else max(1, int(count))
    rng = random.Random(make_seed("generate_questions", seed))
    pool = [q for q in _QUESTION_BANK if not topic
            or normalize(q.get("topic", "")) == normalize(topic)
            or normalize(topic) in normalize(q.get("topic", ""))]
    if not pool:
        pool = list(_QUESTION_BANK)
    questions = []
    seen_ids = set()
    attempts = 0
    while len(questions) < n and attempts < n * 10:
        attempts += 1
        q = dict(rng.choice(pool))
        if q["id"] in seen_ids:
            continue
        seen_ids.add(q["id"])
        out = {
            "id": q["id"],
            "type": q.get("type", "mcq"),
            "difficulty": q.get("difficulty", "Medium"),
            "topic": q.get("topic", ""),
            "question": q["question"],
            "answer": q.get("answer", ""),
            "explanation": q.get("explanation", ""),
            "competency": q.get("competency", False),
        }
        if q.get("options"):
            opts = list(q["options"])
            rng.shuffle(opts)
            out["options"] = opts
        questions.append(out)
    return questions


# ======================================================================
# MAIN
# ======================================================================

def main():
    print("=" * 70)
    print("CISCE Class 12 Business Studies - Deterministic Generator Demo")
    print("=" * 70)
    solver = Class12BusinessStudiesSolver()
    print(f"Bank size: {solver.get_question_count()}")
    print(f"Topics   : {', '.join(solver.get_topics())}")
    for q in generate_questions(seed=42, count=5):
        print(f"\n[{q['id']}] ({q['topic']}, {q['difficulty']}) "
              f"{q['question'][:90]}")
        if q.get("options"):
            for opt in q["options"]:
                print(f"    {opt}")
        print(f"    Answer: {q['answer']}")


if __name__ == "__main__":
    main()
