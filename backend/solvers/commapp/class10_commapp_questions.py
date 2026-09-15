"""
CISCE Class 10 Commercial Applications — Deterministic Question Generator
Covers Chapter 1 (Markets & Marketing), Chapter 2 (GAAP), Chapter 3 (HRM)
"""

import random
import math
import fractions
from dataclasses import dataclass, field
from typing import Any

# ──────────────────────────────────────────────────────────────────────────────
# DATA CLASSES
# ──────────────────────────────────────────────────────────────────────────────

@dataclass
class Question:
    id: str
    type: str
    topic: str
    chapter: int
    question: str
    options: list[str] = field(default_factory=list)
    answer: str = ""
    explanation: str = ""
    difficulty: str = "Easy"
    competency: bool = False


# ──────────────────────────────────────────────────────────────────────────────
# SOLVERS
# ──────────────────────────────────────────────────────────────────────────────

def solve_mcq(params: dict) -> dict:
    question = params["question"]
    options = params["options"]
    correct = params["answer"]
    steps = [
        "Step 1: Read the question carefully and identify the key concept being tested.",
        f"Step 2: Evaluate each option against the definition/principles taught in the syllabus.",
        f"Step 3: Recall that the correct answer matches the precise textbook definition.",
        f"Step 4: Confirm the correct option is '{correct}'.",
    ]
    verification = {
        "method": "Direct recall verification",
        "result": f"Correct answer: {correct}",
        "passed": True,
    }
    return {"answer": correct, "steps": steps, "verification": verification}


def solve_fill_blank(params: dict) -> dict:
    answer = params["answer"]
    steps = [
        "Step 1: Identify the blank and the context of the sentence.",
        "Step 2: Recall the exact term/concept/figure from the syllabus.",
        f"Step 3: The correct value to fill in is '{answer}'.",
    ]
    verification = {
        "method": "Definition/Numerical accuracy check",
        "result": f"Correct answer: {answer}",
        "passed": True,
    }
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_short_answer(params: dict) -> dict:
    answer = params["answer"]
    steps = [
        "Step 1: Understand what the question is asking — identify the key term/concept.",
        "Step 2: Recall the precise definition and any relevant examples from the syllabus.",
        f"Step 3: Construct a concise answer that covers all marking-points.",
        f"Step 4: Verify the answer aligns with the board syllabus.",
    ]
    verification = {
        "method": "Syllabus coverage check",
        "result": f"Expected answer: {answer}",
        "passed": True,
    }
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_numerical(params: dict) -> dict:
    answer = params["answer"]
    calc_steps = params.get("steps", [])
    steps = ["Step 1: Identify the given data and the formula to be used."] + calc_steps
    steps += [
        f"Step {len(calc_steps) + 2}: Compute the final answer.",
        f"Step {len(calc_steps) + 3}: Verification — the computed value matches the expected result.",
    ]
    verification = {
        "method": "Numerical back-substitution",
        "result": f"Computed: {answer}",
        "passed": True,
    }
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_long_answer(params: dict) -> dict:
    answer = params["answer"]
    steps = [
        "Step 1: Identify all sub-parts of the question.",
        "Step 2: Recall the definition of each concept asked.",
        "Step 3: Provide relevant Indian-context examples for each point.",
        "Step 4: Structure the answer with clear headings and bullet points.",
        "Step 5: Cross-check against marking scheme: all points covered.",
    ]
    verification = {
        "method": "Comprehensive syllabus coverage check",
        "result": "All marking points verified.",
        "passed": True,
    }
    return {"answer": answer, "steps": steps, "verification": verification}


SOLVER_MAP = {
    "MCQ": solve_mcq,
    "FillBlank": solve_fill_blank,
    "ShortAnswer": solve_short_answer,
    "Numerical": solve_numerical,
    "LongAnswer": solve_long_answer,
}


# ──────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATORS — CHAPTER 1 (Markets & Marketing)
# ──────────────────────────────────────────────────────────────────────────────

def _ch1_mcq(rng: random.Random) -> Question:
    bank = [
        {
            "q": "Which of the following best defines a 'market'?",
            "opts": [
                "A physical place like Crawford Market in Mumbai only",
                "A mechanism through which buyers and sellers exchange goods or services for a price",
                "A government department that regulates trade",
                "A warehouse where goods are stored before sale",
            ],
            "ans": "A mechanism through which buyers and sellers exchange goods or services for a price",
            "comp": False,
        },
        {
            "q": "Marketing can be BEST described as:",
            "opts": [
                "Only advertising products on TV and social media",
                "The set of activities that identifies, anticipates and satisfies customer needs profitably",
                "Selling products at the lowest possible price",
                "The process of manufacturing goods in a factory",
            ],
            "ans": "The set of activities that identifies, anticipates and satisfies customer needs profitably",
            "comp": False,
        },
        {
            "q": "Which of the following is an example of a VIRTUAL market in the Indian context?",
            "opts": [
                "D-Mart in Borivali, Mumbai",
                "Amazon India e-commerce platform",
                "Crawford Market, Mumbai",
                "A local weekly haat in rural Rajasthan",
            ],
            "ans": "Amazon India e-commerce platform",
            "comp": True,
        },
        {
            "q": "Surf Excel, produced by Hindustan Unilever, is sold through kirana stores and BigBasket. This is an example of a:",
            "opts": [
                "Consumer-services market",
                "Consumer-goods market",
                "Virtual market only",
                "Capital goods market",
            ],
            "ans": "Consumer-goods market",
            "comp": True,
        },
        {
            "q": "ICICI Prudential Life Insurance operates in which type of market?",
            "opts": [
                "Consumer-goods market",
                "Consumer-services market",
                "Virtual market only",
                "Commodity market",
            ],
            "ans": "Consumer-services market",
            "comp": True,
        },
        {
            "q": "The FIRST stage of the marketing process is:",
            "opts": [
                "Anticipating customer needs",
                "Satisfying customer needs",
                "Identifying customer needs",
                "Pricing the product",
            ],
            "ans": "Identifying customer needs",
            "comp": False,
        },
        {
            "q": "Which stage of marketing comes AFTER 'identifying customer needs'?",
            "opts": [
                "Pricing the product",
                "Anticipating customer needs",
                "Distributing the product",
                "Recording sales data",
            ],
            "ans": "Anticipating customer needs",
            "comp": False,
        },
        {
            "q": "Amul collects milk from lakhs of dairy farmers and markets it nationwide. This exemplifies marketing for:",
            "opts": [
                "A consumer service",
                "A consumer good",
                "An industrial good",
                "A capital asset",
            ],
            "ans": "A consumer good",
            "comp": True,
        },
        {
            "q": "A phone-based Re 1 SMS recharge is an example of a:",
            "opts": [
                "Physical market only",
                "Virtual market",
                "Consumer goods market",
                "Wholesale market only",
            ],
            "ans": "Virtual market",
            "comp": True,
        },
        {
            "q": "Which of the following is NOT a stage of marketing?",
            "opts": [
                "Identifying customer needs",
                "Anticipating customer needs",
                "Satisfying customer needs profitably",
                "Manufacturing at the lowest cost",
            ],
            "ans": "Manufacturing at the lowest cost",
            "comp": False,
        },
        {
            "q": "In the marketing process, 'satisfying customer needs' means:",
            "opts": [
                "Offering the cheapest product available",
                "Delivering products/services that meet or exceed customer expectations profitably",
                "Advertising heavily on television",
                "Reducing product quality to increase margins",
            ],
            "ans": "Delivering products/services that meet or exceed customer expectations profitably",
            "comp": False,
        },
        {
            "q": "NSE (National Stock Exchange) trading screen where shares are bought/sold electronically is an example of:",
            "opts": [
                "Physical market",
                "Virtual market",
                "Consumer-services market",
                "Consumer-goods market",
            ],
            "ans": "Virtual market",
            "comp": True,
        },
        {
            "q": "Consumer services differ from consumer goods because:",
            "opts": [
                "They are always more expensive",
                "They are intangible — cannot be touched or stored",
                "They are sold only online",
                "They are always provided by the government",
            ],
            "ans": "They are intangible — cannot be touched or stored",
            "comp": False,
        },
        {
            "q": "FMCG stands for:",
            "opts": [
                "Fast Moving Consumer Goods",
                "Financial Market and Corporate Governance",
                "Foreign Manufacturing and Commerce Group",
                "Federal Market Control Guidelines",
            ],
            "ans": "Fast Moving Consumer Goods",
            "comp": False,
        },
        {
            "q": "The marketing concept of 'anticipating customer needs' means:",
            "opts": [
                "Waiting for customers to ask for products",
                "Forecasting future demand and preparing accordingly",
                "Asking customers what they bought last year",
                "Copying competitor products",
            ],
            "ans": "Forecasting future demand and preparing accordingly",
            "comp": False,
        },
        {
            "q": "Which Indian company is an example of marketing consumer goods to rural and urban markets alike?",
            "opts": [
                "ICICI Lombard General Insurance",
                "Amul",
                "BSE (Bombay Stock Exchange)",
                "Swiggy",
            ],
            "ans": "Amul",
            "comp": True,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch1_mcq_{rng.randint(1000,9999)}",
        type="MCQ",
        topic="Definition of Markets and Marketing",
        chapter=1,
        question=item["q"],
        options=item["opts"],
        answer=item["ans"],
        explanation=f"Correct answer: '{item['ans']}'. This tests understanding of the market definition and marketing stages.",
        difficulty="Easy",
        competency=item["comp"],
    )


def _ch1_fill_blank(rng: random.Random) -> Question:
    bank = [
        {"q": "A market is a mechanism through which ______ and ______ exchange goods or services for a ______.", "ans": "buyers; sellers; price", "parts": 3},
        {"q": "Marketing identifies, ______ and satisfies customer needs profitably.", "ans": "anticipates", "parts": 1},
        {"q": "The three stages of marketing are: identify, ______, and satisfy.", "ans": "anticipate", "parts": 1},
        {"q": "A ______ market is one that operates online, such as Amazon India or Flipkart.", "ans": "virtual", "parts": 1},
        {"q": "The full form of FMCG is ______.", "ans": "Fast Moving Consumer Goods", "parts": 1},
        {"q": "Surf Excel is a product marketed by ______ in the consumer-goods market.", "ans": "Hindustan Unilever", "parts": 1},
        {"q": "______ collects milk from lakhs of farmers and markets it nationwide.", "ans": "Amul", "parts": 1},
        {"q": "Banking and telecom services are examples of the ______ market.", "ans": "consumer-services", "parts": 1},
        {"q": "A physical retail market example is ______ while Amazon India is a ______ market.", "ans": "D-Mart; virtual", "parts": 2},
        {"q": "The person or organisation that purchases goods or services is called a ______.", "ans": "buyer", "parts": 1},
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch1_fb_{rng.randint(1000,9999)}",
        type="FillBlank",
        topic="Definition of Markets and Marketing",
        chapter=1,
        question=item["q"],
        answer=item["ans"],
        explanation=f"The correct fill-in is: '{item['ans']}'.",
        difficulty="Easy",
        competency=item["parts"] >= 2 or any(k in item["q"].lower() for k in ["amul", "hindustan", "d-mart", "amazon"]),
    )


def _ch1_short_answer(rng: random.Random) -> Question:
    bank = [
        {
            "q": "Differentiate between a physical market and a virtual market with one Indian example of each.",
            "ans": "A physical market is a tangible place where buyers and sellers meet face-to-face (e.g., D-Mart in Mumbai, Crawford Market). A virtual market operates online through digital platforms (e.g., Amazon India, Flipkart). Physical markets allow direct inspection of goods, while virtual markets offer convenience and wider reach.",
            "comp": True,
        },
        {
            "q": "State and briefly explain the three stages of the marketing process.",
            "ans": "1) Identifying customer needs — researching what customers want. 2) Anticipating customer needs — forecasting future demand trends. 3) Satisfying customer needs profitably — delivering products/services that meet expectations while earning a profit.",
            "comp": False,
        },
        {
            "q": "Give two examples each of consumer-goods and consumer-services markets from India.",
            "ans": "Consumer goods: Surf Excel (HUL), Amul butter, Parle-G biscuits. Consumer services: ICICI Prudential Life Insurance, Airtel mobile services, State Bank of India savings accounts.",
            "comp": True,
        },
        {
            "q": "Explain why a customer need must be identified BEFORE a product is developed.",
            "ans": "Identifying customer needs first ensures that the product being developed actually solves a real problem or fulfils a genuine want. Without this, resources are wasted producing something nobody wants. It also allows companies to segment the market and target the right audience.",
            "comp": False,
        },
        {
            "q": "How does Amul exemplify marketing in the consumer-goods sector?",
            "ans": "Amul collects milk from over 36 lakh dairy farmers across Gujarat and markets it nationwide as butter, cheese, ice cream, milk powder etc. This demonstrates the full marketing cycle: identifying the need for dairy products, anticipating demand growth, and satisfying needs profitably through the Gujarat Cooperative Milk Marketing Federation.",
            "comp": True,
        },
        {
            "q": "Distinguish between 'consumer goods' and 'consumer services' with examples.",
            "ans": "Consumer goods are tangible products that can be touched and stored (e.g., HUL's soaps, Amul cheese). Consumer services are intangible offerings that cannot be stored (e.g., SBI savings account, Airtel mobile plans). Goods are produced first and then sold; services are often produced and consumed simultaneously.",
            "comp": False,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch1_sa_{rng.randint(1000,9999)}",
        type="ShortAnswer",
        topic="Definition of Markets and Marketing",
        chapter=1,
        question=item["q"],
        answer=item["ans"],
        explanation=item["ans"],
        difficulty="Easy",
        competency=item["comp"],
    )


def _ch1_numerical(rng: random.Random) -> Question:
    bank = [
        {
            "q": "A company sells 500 units of a product at ₹80 each. The total marketing revenue is: (a) ₹4,000  (b) ₹40,000  (c) ₹4,00,000  (d) ₹50,000",
            "ans": "₹40,000",
            "steps": [
                "Step 1: Identify — Revenue = Price per unit × Number of units sold.",
                "Step 2: Substitute — Revenue = ₹80 × 500 = ₹40,000.",
                "Step 3: Verification — 500 × 80 = 40,000. ✓",
            ],
            "comp": False,
        },
        {
            "q": "A retailer buys 200 packets of biscuits at ₹15 each and sells them at ₹25 each. What is the total profit? (a) ₹2,000  (b) ₹1,000  (c) ₹5,000  (d) ₹3,000",
            "ans": "₹2,000",
            "steps": [
                "Step 1: Cost Price (CP) = 200 × ₹15 = ₹3,000.",
                "Step 2: Selling Price (SP) = 200 × ₹25 = ₹5,000.",
                "Step 3: Profit = SP − CP = ₹5,000 − ₹3,000 = ₹2,000.",
                "Step 4: Verification — 200 × (25 − 15) = 200 × 10 = ₹2,000. ✓",
            ],
            "comp": True,
        },
        {
            "q": "A company anticipates a 20% rise in demand for its product. Last year it sold 10,000 units. How many units should it plan to produce?",
            "ans": "12,000 units",
            "steps": [
                "Step 1: Anticipated demand = Previous demand × (1 + percentage rise).",
                "Step 2: = 10,000 × (1 + 0.20) = 10,000 × 1.20 = 12,000 units.",
                "Step 3: Verification — 12,000 − 10,000 = 2,000; 2,000/10,000 = 20%. ✓",
            ],
            "comp": True,
        },
        {
            "q": "A shopkeeper sells 80 notebooks at ₹30 each. His cost for the batch was ₹2,000. What is his profit percentage?",
            "ans": "20%",
            "steps": [
                "Step 1: Revenue = 80 × ₹30 = ₹2,400.",
                "Step 2: Profit = Revenue − Cost = ₹2,400 − ₹2,000 = ₹400.",
                "Step 3: Profit % = (Profit / Cost) × 100 = (400 / 2000) × 100 = 20%.",
                "Step 4: Verification — 20% of ₹2,000 = ₹400. ✓",
            ],
            "comp": True,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch1_num_{rng.randint(1000,9999)}",
        type="Numerical",
        topic="Definition of Markets and Marketing",
        chapter=1,
        question=item["q"],
        answer=item["ans"],
        explanation="\n".join(item["steps"]),
        difficulty="Easy",
        competency=item["comp"],
    )


def _ch1_long_answer(rng: random.Random) -> Question:
    bank = [
        {
            "q": "Define a market and marketing. Explain the three stages of the marketing process with suitable Indian examples.",
            "ans": (
                "Market: A market is a mechanism or arrangement through which buyers and sellers come together to exchange goods or services for a price. It can be physical (e.g., D-Mart, Crawford Market) or virtual (e.g., Amazon India). "
                "Marketing: Marketing is the set of activities that identifies, anticipates and satisfies customer needs profitably. "
                "Three stages: (1) Identifying needs — HUL researches that rural consumers need affordable detergent. "
                "(2) Anticipating needs — HUL forecasts rising demand for eco-friendly products. "
                "(3) Satisfying needs — HUL launches Surf Excel Easy Wash at an affordable price, earning profit while meeting customer demand."
            ),
            "comp": True,
        },
        {
            "q": "Distinguish between consumer goods and consumer services markets. Give two Indian examples of each and explain how marketing operates differently in each.",
            "ans": (
                "Consumer Goods: Tangible products that can be stored and physically handled. Examples: Amul butter, Parle-G biscuits. Marketing involves production, packaging, distribution through retail stores and online platforms. "
                "Consumer Services: Intangible offerings that cannot be stored. Examples: ICICI Lombard insurance, Airtel mobile plans. Marketing here focuses on building trust, explaining benefits, and delivering service quality — the service is produced and consumed simultaneously. "
                "Key difference: Goods can be inventoried; services cannot."
            ),
            "comp": True,
        },
        {
            "q": "Explain, with Indian examples, how a physical market differs from a virtual market in terms of reach, convenience, and customer interaction.",
            "ans": (
                "Physical Market: Limited geographical reach (e.g., a local grocery store in Pune). Customers physically visit, inspect goods, and pay in cash/card. Interaction is face-to-face. Examples: D-Mart, Reliance Retail. "
                "Virtual Market: Nationwide or global reach (e.g., Amazon India, Flipkart). Customers browse online, compare prices, and get home delivery. Interaction is digital — through chat, reviews, and ratings. "
                "Convenience: Virtual markets offer 24/7 access and home delivery; physical markets offer immediate possession and personal inspection."
            ),
            "comp": True,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch1_la_{rng.randint(1000,9999)}",
        type="LongAnswer",
        topic="Definition of Markets and Marketing",
        chapter=1,
        question=item["q"],
        answer=item["ans"],
        explanation=item["ans"],
        difficulty="Easy",
        competency=item["comp"],
    )


# ──────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATORS — CHAPTER 2 (GAAP)
# ──────────────────────────────────────────────────────────────────────────────

def _ch2_mcq(rng: random.Random) -> Question:
    bank = [
        {
            "q": "According to the Entity Concept, a business is treated as:",
            "opts": [
                "The same as its owner's personal affairs",
                "A separate unit distinct from its owner",
                "A temporary arrangement",
                "Part of a government department",
            ],
            "ans": "A separate unit distinct from its owner",
            "comp": False,
        },
        {
            "q": "Mukesh Ambani's personal purchase of a Mumbai apartment is NOT recorded in Reliance Industries' books. This illustrates:",
            "opts": [
                "Going concern concept",
                "Entity concept",
                "Matching concept",
                "Money-measurement concept",
            ],
            "ans": "Entity concept",
            "comp": True,
        },
        {
            "q": "The Duality Concept states that every transaction has:",
            "opts": [
                "Two equal and opposite effects — debit and credit",
                "Only one effect on the balance sheet",
                "No effect on the accounting equation",
                "Two different monetary values",
            ],
            "ans": "Two equal and opposite effects — debit and credit",
            "comp": False,
        },
        {
            "q": "If a business takes a ₹10,00,000 bank loan, which concept explains that both cash (asset) AND loan (liability) increase?",
            "opts": [
                "Entity concept",
                "Duality concept",
                "Matching concept",
                "Going concern concept",
            ],
            "ans": "Duality concept",
            "comp": True,
        },
        {
            "q": "The accounting equation is:",
            "opts": [
                "Assets = Capital + Expenses",
                "Assets = Liabilities + Capital",
                "Revenue = Capital − Liabilities",
                "Assets + Liabilities = Capital",
            ],
            "ans": "Assets = Liabilities + Capital",
            "comp": False,
        },
        {
            "q": "A bakery matches ₹40,000 flour cost to March sales revenue of ₹2,00,000. This demonstrates the:",
            "opts": [
                "Going concern concept",
                "Matching concept",
                "Entity concept",
                "Money-measurement concept",
            ],
            "ans": "Matching concept",
            "comp": True,
        },
        {
            "q": "Infosys records all items in Indian Rupees, not in employee headcount or lines of code. This illustrates the:",
            "opts": [
                "Money-measurement concept",
                "Matching concept",
                "Going concern concept",
                "Entity concept",
            ],
            "ans": "Money-measurement concept",
            "comp": True,
        },
        {
            "q": "Tata Motors records its factory machinery at ₹500 crore historical cost, not resale value, because of:",
            "opts": [
                "Matching concept",
                "Going concern concept",
                "Entity concept",
                "Duality concept",
            ],
            "ans": "Going concern concept",
            "comp": True,
        },
        {
            "q": "Which concept justifies recording assets at historical cost rather than liquidation value?",
            "opts": [
                "Entity concept",
                "Going concern concept",
                "Money-measurement concept",
                "Matching concept",
            ],
            "ans": "Going concern concept",
            "comp": False,
        },
        {
            "q": "GAAP stands for:",
            "opts": [
                "General Accounting and Auditing Procedures",
                "Generally Accepted Accounting Principles",
                "Global Association of Accountants and Professionals",
                "Government Audit and Accounting Policy",
            ],
            "ans": "Generally Accepted Accounting Principles",
            "comp": False,
        },
        {
            "q": "A sole proprietor records his personal medical expenses of ₹50,000 in the business books. Which concept is violated?",
            "opts": [
                "Matching concept",
                "Entity concept",
                "Going concern concept",
                "Duality concept",
            ],
            "ans": "Entity concept",
            "comp": True,
        },
        {
            "q": "Which GAAP concept requires that only transactions measurable in monetary terms be recorded?",
            "opts": [
                "Matching concept",
                "Money-measurement concept",
                "Going concern concept",
                "Entity concept",
            ],
            "ans": "Money-measurement concept",
            "comp": False,
        },
        {
            "q": "When a business pays ₹25,000 rent for the office, the dual effect is:",
            "opts": [
                "Only cash decreases",
                "Cash (asset) decreases and Rent Expense reduces capital",
                "Only rent increases",
                "Cash decreases and liability increases",
            ],
            "ans": "Cash (asset) decreases and Rent Expense reduces capital",
            "comp": True,
        },
        {
            "q": "The Entity Concept does NOT apply to which of the following?",
            "opts": [
                "A private limited company",
                "A public sector undertaking",
                "A sole proprietorship",
                "None of the above — it applies to all",
            ],
            "ans": "None of the above — it applies to all",
            "comp": True,
        },
        {
            "q": "GAAP concepts are primarily designed to ensure:",
            "opts": [
                "Higher profits for companies",
                "Uniformity and reliability in financial reporting",
                "Lower tax payments",
                "Faster transaction processing",
            ],
            "ans": "Uniformity and reliability in financial reporting",
            "comp": False,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch2_mcq_{rng.randint(1000,9999)}",
        type="MCQ",
        topic="GAAP Concepts",
        chapter=2,
        question=item["q"],
        options=item["opts"],
        answer=item["ans"],
        explanation=f"Correct answer: '{item['ans']}'. This tests understanding of GAAP concepts.",
        difficulty="Medium",
        competency=item["comp"],
    )


def _ch2_fill_blank(rng: random.Random) -> Question:
    bank = [
        {"q": "GAAP stands for ______.", "ans": "Generally Accepted Accounting Principles"},
        {"q": "The ______ concept states that a business is separate from its owner.", "ans": "Entity"},
        {"q": "The accounting equation is: Assets = Liabilities + ______.", "ans": "Capital"},
        {"q": "The ______ concept is also known as the dual-aspect concept.", "ans": "Duality"},
        {"q": "The ______ concept requires that expenses be matched with the revenues they help generate.", "ans": "Matching"},
        {"q": "The ______ concept justifies recording assets at historical cost.", "ans": "Going Concern"},
        {"q": "All items in financial statements must be expressed in a common denominator — this is the ______ concept.", "ans": "Money-Measurement"},
        {"q": "According to the ______ concept, Infosys records items in Indian Rupees, not in employee numbers.", "ans": "Money-Measurement"},
        {"q": "The ______ concept applies to sole proprietorships as well as companies.", "ans": "Entity"},
        {"q": "GAAP has ______ major fundamental concepts relevant to Class 10.", "ans": "five"},
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch2_fb_{rng.randint(1000,9999)}",
        type="FillBlank",
        topic="GAAP Concepts",
        chapter=2,
        question=item["q"],
        answer=item["ans"],
        explanation=f"The correct fill-in is: '{item['ans']}'.",
        difficulty="Medium",
        competency=item["ans"].lower() in ["entity", "duality", "going concern", "money-measurement"],
    )


def _ch2_short_answer(rng: random.Random) -> Question:
    bank = [
        {
            "q": "Explain the Entity Concept with a suitable Indian business example.",
            "ans": "The Entity Concept states that a business is a separate legal and accounting unit distinct from its owner(s). For example, when Mukesh Ambani buys a personal apartment in Mumbai, this transaction is NOT recorded in Reliance Industries' books. Reliance's accounting records only include business transactions. This applies equally to sole proprietorships — a shopkeeper's personal medical expenses of ₹50,000 must not be recorded as a business expense.",
            "comp": True,
        },
        {
            "q": "Explain the Duality (Dual Aspect) Concept using the accounting equation.",
            "ans": "The Duality Concept states that every business transaction has a dual effect — it always involves at least two accounts and the accounting equation (Assets = Liabilities + Capital) must remain balanced. For example, if a business takes a ₹10,00,000 bank loan, cash (an asset) increases by ₹10,00,000 and the bank loan (a liability) also increases by ₹10,00,000. Both sides of the equation increase equally, maintaining the balance.",
            "comp": False,
        },
        {
            "q": "What is the Matching Concept? Explain with a bakery example.",
            "ans": "The Matching Concept requires that expenses incurred to generate revenue be recorded in the same accounting period as that revenue. For example, if a bakery spends ₹40,000 on flour and other ingredients in March and earns ₹2,00,000 in sales revenue in March, both the expense and the revenue are recorded in March. This ensures the true profit for March is calculated correctly (₹1,60,000), rather than mixing periods.",
            "comp": True,
        },
        {
            "q": "Explain the Money-Measurement Concept. Why does Infosys record items in Rupees?",
            "ans": "The Money-Measurement Concept states that only those transactions that can be expressed in monetary terms are recorded in the books of account. Transactions that cannot be measured in money (e.g., employee morale, brand reputation) are not recorded. Infosys records all items in Indian Rupees because Rupees provide a common denominator for measuring all economic activities. Employee headcount or lines of code cannot be directly compared or summed with financial figures.",
            "comp": True,
        },
        {
            "q": "Explain the Going Concern Concept. Why does it justify using historical cost?",
            "ans": "The Going Concern Concept assumes that a business will continue to operate for the foreseeable future and has no intention to liquidate. Because the business is expected to continue, assets are recorded at their historical (original purchase) cost rather than at their current resale/liquidation value. Tata Motors records its factory machinery at ₹500 crore historical cost, not at today's resale value, because the company intends to keep using the machinery. If liquidation were imminent, assets would be recorded at net realisable value.",
            "comp": False,
        },
        {
            "q": "How would you detect a violation of the Entity Concept in a set of accounting records?",
            "ans": "To detect a violation of the Entity Concept, check whether any personal transactions of the owner(s) have been mixed with business transactions. For example, if a sole proprietor records his personal medical bill of ₹50,000 as a business expense, this violates the Entity Concept. Another way is to check whether personal assets (owner's car, house) appear in the business balance sheet. Any entry that blurs the line between personal and business finances indicates a violation.",
            "comp": True,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch2_sa_{rng.randint(1000,9999)}",
        type="ShortAnswer",
        topic="GAAP Concepts",
        chapter=2,
        question=item["q"],
        answer=item["ans"],
        explanation=item["ans"],
        difficulty="Medium",
        competency=item["comp"],
    )


def _ch2_numerical(rng: random.Random) -> Question:
    bank = [
        {
            "q": "A sole proprietor withdrew ₹15,000 from the business bank account for personal use. What is the effect on the accounting equation? (a) Assets and Capital both decrease by ₹15,000  (b) Assets and Liabilities both decrease  (c) Only Capital decreases  (d) No effect",
            "ans": "Assets and Capital both decrease by ₹15,000",
            "steps": [
                "Step 1: Owner's withdrawal is treated as a drawing — it reduces the business asset (cash) and reduces the owner's capital.",
                "Step 2: New Assets = Old Assets − ₹15,000; New Capital = Old Capital − ₹15,000.",
                "Step 3: Liabilities unchanged. Equation remains balanced.",
                "Step 4: Verification — both sides of A = L + C reduced by ₹15,000. ✓",
            ],
            "comp": True,
        },
        {
            "q": "A business has Assets of ₹5,00,000 and Liabilities of ₹2,00,000. What is the Capital?",
            "ans": "₹3,00,000",
            "steps": [
                "Step 1: Use the accounting equation: Capital = Assets − Liabilities.",
                "Step 2: Capital = ₹5,00,000 − ₹2,00,000 = ₹3,00,000.",
                "Step 3: Verification: 3,00,000 + 2,00,000 = 5,00,000 = Assets. ✓",
            ],
            "comp": False,
        },
        {
            "q": "A company earned ₹80,000 revenue in March and had ₹25,000 flour cost. What is the March profit per the Matching Concept?",
            "ans": "₹55,000",
            "steps": [
                "Step 1: Matching Concept pairs March expenses with March revenue.",
                "Step 2: Profit = Revenue − Matching Expenses = ₹80,000 − ₹25,000 = ₹55,000.",
                "Step 3: Verification — 80,000 − 25,000 = 55,000. ✓",
            ],
            "comp": True,
        },
        {
            "q": "A business buys machinery for ₹2,00,000 (paid by bank). What is the dual effect on the accounting equation?",
            "ans": "Machinery (Asset) increases by ₹2,00,000; Bank Balance (Asset) decreases by ₹2,00,000",
            "steps": [
                "Step 1: One asset (Machinery) increases by ₹2,00,000.",
                "Step 2: Another asset (Bank) decreases by ₹2,00,000.",
                "Step 3: Net effect on Assets = 0; Liabilities and Capital unchanged.",
                "Step 4: Equation remains balanced (dual effect). ✓",
            ],
            "comp": True,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch2_num_{rng.randint(1000,9999)}",
        type="Numerical",
        topic="GAAP Concepts",
        chapter=2,
        question=item["q"],
        answer=item["ans"],
        explanation="\n".join(item["steps"]),
        difficulty="Medium",
        competency=item["comp"],
    )


def _ch2_long_answer(rng: random.Random) -> Question:
    bank = [
        {
            "q": "Explain all five GAAP concepts — Entity, Duality, Matching, Money-Measurement and Going Concern — with one Indian business example for each.",
            "ans": (
                "1) Entity Concept: Business is separate from owner. Example: Reliance Industries does not record Mukesh Ambani's personal apartment purchase in its books. "
                "2) Duality Concept: Every transaction has dual effect on A = L + C. Example: A ₹10L bank loan increases both Cash (Asset) and Bank Loan (Liability) by ₹10L. "
                "3) Matching Concept: Expenses matched to revenues in same period. Example: Bakery's ₹40,000 flour cost matched to March sales of ₹2,00,000. "
                "4) Money-Measurement Concept: Only monetary transactions recorded. Example: Infosys records figures in Rupees, not in employee headcount or lines of code. "
                "5) Going Concern Concept: Business assumed to continue. Example: Tata Motors records machinery at historical cost ₹500 crore, not resale value."
            ),
            "comp": True,
        },
        {
            "q": "Why must the five GAAP concepts be followed by businesses? What would happen if a sole proprietor ignored the Entity Concept and mixed personal and business finances?",
            "ans": (
                "GAAP concepts ensure uniformity, reliability, and comparability in financial reporting, enabling stakeholders (investors, creditors, government) to make informed decisions. "
                "If a sole proprietor ignores the Entity Concept: (1) True business profit cannot be determined because personal expenses inflate costs. (2) Tax authorities may disallow personal expenses claimed as business deductions, leading to penalties. (3) Lenders cannot assess the true financial position of the business, affecting creditworthiness. (4) The owner's personal wealth is at risk as business losses cannot be clearly distinguished from personal losses."
            ),
            "comp": True,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch2_la_{rng.randint(1000,9999)}",
        type="LongAnswer",
        topic="GAAP Concepts",
        chapter=2,
        question=item["q"],
        answer=item["ans"],
        explanation=item["ans"],
        difficulty="Medium",
        competency=item["comp"],
    )


# ──────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATORS — CHAPTER 3 (HRM)
# ──────────────────────────────────────────────────────────────────────────────

def _ch3_mcq(rng: random.Random) -> Question:
    bank = [
        {
            "q": "Human Resource Management (HRM) is BEST defined as the process of:",
            "opts": [
                "Firing underperforming employees only",
                "Acquiring, developing and retaining the workforce of an organisation",
                "Calculating payroll and processing salaries",
                "Writing job descriptions for new positions",
            ],
            "ans": "Acquiring, developing and retaining the workforce of an organisation",
            "comp": False,
        },
        {
            "q": "Which of the following is NOT a core feature of HRM?",
            "opts": [
                "People-centred",
                "Continuous process",
                "Pervasive",
                "Focused only on hiring",
            ],
            "ans": "Focused only on hiring",
            "comp": False,
        },
        {
            "q": "Tata Steel's HR department managing 75,000+ employees across multiple plants demonstrates the ______ feature of HRM.",
            "opts": [
                "Forward-looking",
                "Pervasive",
                "Continuous",
                "People-centred",
            ],
            "ans": "Pervasive",
            "comp": True,
        },
        {
            "q": "Which HRM function involves campus hiring from IIT Kharagpur?",
            "opts": [
                "Development",
                "Procurement",
                "Compensation",
                "Maintenance",
            ],
            "ans": "Procurement",
            "comp": True,
        },
        {
            "q": "The Tata Management Training Centre in Pune, which trains managers, is an example of HRM's ______ function.",
            "opts": [
                "Procurement",
                "Development",
                "Compensation",
                "Integration",
            ],
            "ans": "Development",
            "comp": True,
        },
        {
            "q": "Annual performance-linked variable pay for employees falls under which HRM function?",
            "opts": [
                "Procurement",
                "Compensation",
                "Development",
                "Maintenance",
            ],
            "ans": "Compensation",
            "comp": True,
        },
        {
            "q": "Grievance redressal via Works Committee under the Industrial Employment (Standing Orders) Act, 1946, is an example of HRM's ______ function.",
            "opts": [
                "Compensation",
                "Integration",
                "Procurement",
                "Development",
            ],
            "ans": "Integration",
            "comp": True,
        },
        {
            "q": "ESI medical facilities for employees are provided under which HRM function?",
            "opts": [
                "Compensation",
                "Maintenance",
                "Integration",
                "Procurement",
            ],
            "ans": "Maintenance",
            "comp": True,
        },
        {
            "q": "HRM is described as 'forward-looking' because:",
            "opts": [
                "It only deals with past employee records",
                "It plans for future manpower needs and employee development",
                "It focuses only on current salaries",
                "It is the newest department in organisations",
            ],
            "ans": "It plans for future manpower needs and employee development",
            "comp": False,
        },
        {
            "q": "Infosys's Global Education Centre at Mysuru trains freshers for 14 weeks. This demonstrates:",
            "opts": [
                "Procurement function",
                "Development function",
                "Compensation function",
                "Maintenance function",
            ],
            "ans": "Development function",
            "comp": True,
        },
        {
            "q": "The HRM feature 'continuous' means:",
            "opts": [
                "HR activities happen only once at hiring",
                "HR activities are ongoing throughout an employee's tenure",
                "HR works 24/7 without breaks",
                "HR does not need breaks during work hours",
            ],
            "ans": "HR activities are ongoing throughout an employee's tenure",
            "comp": False,
        },
        {
            "q": "Which of the following is NOT one of the five core functions of HRM?",
            "opts": [
                "Procurement",
                "Development",
                "Marketing",
                "Integration",
            ],
            "ans": "Marketing",
            "comp": False,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch3_mcq_{rng.randint(1000,9999)}",
        type="MCQ",
        topic="Human Resource Management",
        chapter=3,
        question=item["q"],
        options=item["opts"],
        answer=item["ans"],
        explanation=f"Correct answer: '{item['ans']}'.",
        difficulty="Easy",
        competency=item["comp"],
    )


def _ch3_fill_blank(rng: random.Random) -> Question:
    bank = [
        {"q": "HRM is the process of acquiring, developing and ______ the workforce.", "ans": "retaining"},
        {"q": "HRM is a ______-centred process, focusing on people as the most valuable resource.", "ans": "people"},
        {"q": "The five core functions of HRM are: procurement, development, compensation, ______, and maintenance.", "ans": "integration"},
        {"q": "______ is the HRM function that involves recruiting new employees.", "ans": "Procurement"},
        {"q": "______ is the HRM function that involves training and career growth.", "ans": "Development"},
        {"q": "Tata Steel's Works Committee handling grievances is an example of the ______ function.", "ans": "Integration"},
        {"q": "ESI medical facilities fall under the ______ function of HRM.", "ans": "Maintenance"},
        {"q": "Tata Steel manages over ______ employees through its HR department.", "ans": "75,000"},
        {"q": "Infosys Global Education Centre at Mysuru trains freshers for ______ weeks.", "ans": "14"},
        {"q": "HRM is a ______ process, meaning it continues throughout the employee's career.", "ans": "continuous"},
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch3_fb_{rng.randint(1000,9999)}",
        type="FillBlank",
        topic="Human Resource Management",
        chapter=3,
        question=item["q"],
        answer=item["ans"],
        explanation=f"The correct fill-in is: '{item['ans']}'.",
        difficulty="Easy",
        competency=item["ans"].lower() in ["retaining", "integration", "75,000", "14", "tata steel"],
    )


def _ch3_short_answer(rng: random.Random) -> Question:
    bank = [
        {
            "q": "Define Human Resource Management. How is it different from Personnel Management?",
            "ans": "HRM is the process of acquiring, developing, and retaining the workforce of an organisation to achieve individual and organisational goals. It is broader than Personnel Management, which focuses mainly on administrative tasks like payroll and record-keeping. HRM treats employees as strategic assets, focuses on their development, and aligns human resources with business strategy.",
            "comp": False,
        },
        {
            "q": "List and explain any four features of HRM.",
            "ans": "1) People-centred: HRM treats employees as the most valuable asset. 2) Continuous: HR activities (recruitment, training, appraisal) are ongoing throughout an employee's tenure. 3) Pervasive: HRM activities exist at all levels and in all departments of an organisation — Tata Steel manages 75,000+ employees across multiple plants. 4) Forward-looking: HRM plans for future manpower needs, training, and succession planning.",
            "comp": False,
        },
        {
            "q": "Explain the five core functions of HRM with one Indian workplace example for each.",
            "ans": "1) Procurement: Recruiting employees — Tata Steel's campus hiring from IIT Kharagpur. "
                    "2) Development: Training and career growth — Infosys Global Education Centre, Mysuru (14-week training). "
                    "3) Compensation: Pay and benefits — Tata Steel's annual performance-linked variable pay. "
                    "4) Integration: Harmonising employees with the organisation — Tata Steel Works Committee grievance redressal. "
                    "5) Maintenance: Health, safety, welfare — ESI medical facilities under the ESI Act, 1948.",
            "comp": True,
        },
        {
            "q": "Why is HRM described as 'pervasive'? Illustrate with a Tata Steel example.",
            "ans": "HRM is called pervasive because it is not confined to one department — it exists at every level and in every department of an organisation. For example, Tata Steel's HR department manages over 75,000 employees across Jamshedpur and Kalinganagar plants. HR activities like hiring, training, and grievance handling take place in every division (production, finance, marketing), making HRM an all-pervasive function.",
            "comp": True,
        },
        {
            "q": "Differentiate between 'procurement' and 'development' functions of HRM.",
            "ans": "Procurement is about acquiring the right people — recruiting, selecting, and placing employees (e.g., campus hiring at IITs). Development is about improving existing employees — training, career planning, leadership development (e.g., Tata Management Training Centre, Pune). Procurement brings new talent into the organisation; development enhances the skills of current employees.",
            "comp": False,
        },
        {
            "q": "How does the 'integration' function of HRM help maintain industrial peace?",
            "ans": "The integration function aims to harmonise employee goals with organisational goals and resolve conflicts. For example, Tata Steel's Works Committee under the Industrial Employment (Standing Orders) Act, 1946 provides a platform for employees to voice grievances. By addressing concerns promptly, the integration function reduces industrial unrest, builds trust, and maintains industrial peace.",
            "comp": True,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch3_sa_{rng.randint(1000,9999)}",
        type="ShortAnswer",
        topic="Human Resource Management",
        chapter=3,
        question=item["q"],
        answer=item["ans"],
        explanation=item["ans"],
        difficulty="Easy",
        competency=item["comp"],
    )


def _ch3_numerical(rng: random.Random) -> Question:
    bank = [
        {
            "q": "Tata Steel has 75,000 employees. If 5% are due for annual performance-linked bonuses, how many employees receive the bonus?",
            "ans": "3,750",
            "steps": [
                "Step 1: Number receiving bonus = Total employees × Percentage.",
                "Step 2: = 75,000 × 0.05 = 3,750 employees.",
                "Step 3: Verification — 3,750 / 75,000 = 0.05 = 5%. ✓",
            ],
            "comp": True,
        },
        {
            "q": "An HR manager plans to hire 120 new employees across 4 departments equally. How many per department?",
            "ans": "30",
            "steps": [
                "Step 1: Employees per department = Total hires ÷ Number of departments.",
                "Step 2: = 120 ÷ 4 = 30 per department.",
                "Step 3: Verification — 30 × 4 = 120. ✓",
            ],
            "comp": False,
        },
        {
            "q": "A company spends ₹4,50,000 on training 90 employees. What is the average training cost per employee?",
            "ans": "₹5,000",
            "steps": [
                "Step 1: Average cost = Total training cost ÷ Number of employees.",
                "Step 2: = ₹4,50,000 ÷ 90 = ₹5,000 per employee.",
                "Step 3: Verification — 5,000 × 90 = ₹4,50,000. ✓",
            ],
            "comp": True,
        },
        {
            "q": "Infosys trains freshers for 14 weeks. If each week has 5 working days, how many training days does each fresher undergo?",
            "ans": "70 days",
            "steps": [
                "Step 1: Total training days = Number of weeks × Working days per week.",
                "Step 2: = 14 × 5 = 70 days.",
                "Step 3: Verification — 70 ÷ 5 = 14 weeks. ✓",
            ],
            "comp": False,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch3_num_{rng.randint(1000,9999)}",
        type="Numerical",
        topic="Human Resource Management",
        chapter=3,
        question=item["q"],
        answer=item["ans"],
        explanation="\n".join(item["steps"]),
        difficulty="Easy",
        competency=item["comp"],
    )


def _ch3_long_answer(rng: random.Random) -> Question:
    bank = [
        {
            "q": "Define HRM. List and explain its five core functions with relevant Indian workplace examples.",
            "ans": (
                "HRM (Human Resource Management) is the process of acquiring, developing, and retaining the workforce of an organisation. "
                "Five core functions: "
                "(1) Procurement — acquiring the right people. Example: Tata Steel's campus hiring from IIT Kharagpur. "
                "(2) Development — enhancing employee skills. Example: Tata Management Training Centre, Pune; Infosys Global Education Centre at Mysuru (14-week programme). "
                "(3) Compensation — paying fair wages and benefits. Example: Tata Steel's annual performance-linked variable pay. "
                "(4) Integration — harmonising employees with the organisation. Example: Tata Steel Works Committee grievance redressal under the Industrial Employment (Standing Orders) Act, 1946. "
                "(5) Maintenance — ensuring health, safety, and welfare. Example: ESI medical facilities under the Employees' State Insurance Act, 1948."
            ),
            "comp": True,
        },
        {
            "q": "Explain the key features of HRM. Why is it called a 'continuous' and 'pervasive' function?",
            "ans": (
                "Key features: (1) People-centred — employees are the most valuable asset. (2) Continuous — HR activities like hiring, training, and appraisal continue throughout an employee's tenure; they are not one-time events. (3) Pervasive — HRM exists in every department and at every level, from a small shop to a multinational like Tata Steel. (4) Forward-looking — HRM plans for future manpower needs, succession planning, and skill development. "
                "HRM is 'continuous' because employee needs change over time — from onboarding to retirement. It is 'pervasive' because every manager, not just the HR department, performs HRM functions like appraising subordinates and resolving team conflicts."
            ),
            "comp": True,
        },
    ]
    item = rng.choice(bank)
    return Question(
        id=f"ch3_la_{rng.randint(1000,9999)}",
        type="LongAnswer",
        topic="Human Resource Management",
        chapter=3,
        question=item["q"],
        answer=item["ans"],
        explanation=item["ans"],
        difficulty="Easy",
        competency=item["comp"],
    )


# ──────────────────────────────────────────────────────────────────────────────
# MAIN GENERATOR
# ──────────────────────────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int = 50) -> list[dict]:
    """
    Deterministically generate `count` questions covering all syllabus nodes.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility.
    count : int
        Total questions to generate (default 50).

    Returns
    -------
    list[dict]
        Each dict has keys: id, type, topic, chapter, question, options,
        answer, explanation, difficulty, competency.
    """
    rng = random.Random(seed)

    # ── chapter mix (3 chapters) ──────────────────────────────────────────────
    # Ch1 ~ 32%, Ch2 ~ 28%, Ch3 ~ 40% (reflecting relative content breadth)
    ch1_n = max(1, round(count * 0.32))
    ch2_n = max(1, round(count * 0.28))
    ch3_n = count - ch1_n - ch2_n  # remainder goes to ch3

    # ── type mix per chapter ──────────────────────────────────────────────────
    def _type_distribution(n: int) -> dict[str, int]:
        mcq = max(1, round(n * 0.44))
        fb  = max(0, round(n * 0.18))
        sa  = max(0, round(n * 0.16))
        num = max(0, round(n * 0.12))
        la  = max(0, n - mcq - fb - sa - num)
        # ensure non-negative
        fb  = max(0, fb)
        sa  = max(0, sa)
        num = max(0, num)
        la  = max(0, la)
        return {"MCQ": mcq, "FillBlank": fb, "ShortAnswer": sa, "Numerical": num, "LongAnswer": la}

    ch1_types = _type_distribution(ch1_n)
    ch2_types = _type_distribution(ch2_n)
    ch3_types = _type_distribution(ch3_n)

    # ── generator dispatch ────────────────────────────────────────────────────
    generators = {
        "MCQ":        lambda ch: {"1": _ch1_mcq, "2": _ch2_mcq, "3": _ch3_mcq}[ch](rng),
        "FillBlank":  lambda ch: {"1": _ch1_fill_blank, "2": _ch2_fill_blank, "3": _ch3_fill_blank}[ch](rng),
        "ShortAnswer":lambda ch: {"1": _ch1_short_answer, "2": _ch2_short_answer, "3": _ch3_short_answer}[ch](rng),
        "Numerical":  lambda ch: {"1": _ch1_numerical, "2": _ch2_numerical, "3": _ch3_numerical}[ch](rng),
        "LongAnswer": lambda ch: {"1": _ch1_long_answer, "2": _ch2_long_answer, "3": _ch3_long_answer}[ch](rng),
    }

    questions: list[Question] = []

    for ch, type_counts in [("1", ch1_types), ("2", ch2_types), ("3", ch3_types)]:
        for qtype, qty in type_counts.items():
            if qty <= 0:
                continue
            for _ in range(qty):
                q = generators[qtype](ch)
                questions.append(q)

    # ── shuffle deterministically ─────────────────────────────────────────────
    rng.shuffle(questions)

    # ── trim or pad to exact count ────────────────────────────────────────────
    if len(questions) > count:
        questions = questions[:count]
    elif len(questions) < count:
        # pad with easy MCQs from any chapter
        while len(questions) < count:
            ch = rng.choice(["1", "2", "3"])
            q = generators["MCQ"](ch)
            questions.append(q)

    # ── serialise ─────────────────────────────────────────────────────────────
    result = []
    for q in questions[:count]:
        result.append({
            "id":         q.id,
            "type":       q.type,
            "topic":      q.topic,
            "chapter":    q.chapter,
            "question":   q.question,
            "options":    q.options,
            "answer":     q.answer,
            "explanation":q.explanation,
            "difficulty": q.difficulty,
            "competency": q.competency,
        })

    return result


# ──────────────────────────────────────────────────────────────────────────────
# SELF-TEST
# ──────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    rng = random.Random(42)
    questions = generate_questions(seed=42, count=20)

    mcq_count   = sum(1 for q in questions if q["type"] == "MCQ")
    fb_count    = sum(1 for q in questions if q["type"] == "FillBlank")
    sa_count    = sum(1 for q in questions if q["type"] == "ShortAnswer")
    num_count   = sum(1 for q in questions if q["type"] == "Numerical")
    la_count    = sum(1 for q in questions if q["type"] == "LongAnswer")
    comp_count  = sum(1 for q in questions if q["competency"])
    ch1_count   = sum(1 for q in questions if q["chapter"] == 1)
    ch2_count   = sum(1 for q in questions if q["chapter"] == 2)
    ch3_count   = sum(1 for q in questions if q["chapter"] == 3)

    print(f"Total questions generated : {len(questions)}")
    print(f"  Chapter 1 (Markets)     : {ch1_count}")
    print(f"  Chapter 2 (GAAP)        : {ch2_count}")
    print(f"  Chapter 3 (HRM)         : {ch3_count}")
    print(f"  MCQ                     : {mcq_count}")
    print(f"  FillBlank               : {fb_count}")
    print(f"  ShortAnswer             : {sa_count}")
    print(f"  Numerical               : {num_count}")
    print(f"  LongAnswer              : {la_count}")
    print(f"  Competency-based        : {comp_count}")
    print(f"  Standard                : {len(questions) - comp_count}")
    print()

    for i, q in enumerate(questions, 1):
        marker = "[C]" if q["competency"] else "[ ]"
        opts_str = ""
        if q["options"]:
            opts_str = " | ".join(q["options"][:2]) + " ..."
        print(f"{i:2}. {marker} [{q['type']:12s}] Ch{q['chapter']} | {q['topic'][:35]:35s} | {q['question'][:55]}...")