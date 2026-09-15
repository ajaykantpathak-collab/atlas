"""
CISCE Class 10 Economics Solver & Question Generator
Covers: Land (Ch1), Demand (Ch2), Market (Ch3)
Deterministic seeded generation, step-by-step explanations, verification
"""

import random
import re
import string
import math
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any, Optional
from enum import Enum


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _rand(seed: int) -> random.Random:
    r = random.Random(seed)
    r.seed(seed)
    return r


def _kw_score(answer_text: str, keywords: list[str]) -> float:
    """Return fraction of required keywords found (case-insensitive, partial match)."""
    if not keywords:
        return 1.0
    a = answer_text.lower()
    found = sum(1 for k in keywords if k.lower() in a)
    return found / len(keywords)


def _normalise(text: str) -> str:
    return text.strip().lower()


# ---------------------------------------------------------------------------
# Dataclasses for question objects
# ---------------------------------------------------------------------------

@dataclass
class Question:
    id: str
    type: str          # mcq | fill_blank | short_answer | long_answer | numerical
    topic: str
    difficulty: str    # Easy | Medium | Hard
    competency: bool   # True = Indian-context competency question
    question: str
    options: Optional[list[str]] = None
    answer: Any = None
    explanation: str = ""
    marks: int = 1
    steps: list[str] = field(default_factory=list)
    verification: str = ""


# ===================================================================
#  TOPIC 1 – LAND  (c10_econ_001)
# ===================================================================

# -- DATA POOLS ------------------------------------------------------

LAND_DEFINITIONS = [
    {
        "text": "In Economics, land refers to all free gifts of nature — including soil, rivers, mountains, mineral deposits, forests, climate and rainfall — that help in production.",
        "keywords": ["free gift", "nature", "soil", "rivers", "minerals", "forests", "production"]
    },
    {
        "text": "Land is the original and primary factor of production. It is a free gift of nature without any human effort and includes not just agricultural soil but also hills, seas, air, sunshine, and mineral wealth.",
        "keywords": ["factor", "production", "free gift", "nature", "soil", "mineral"]
    },
]

LAND_CHARACTERISTICS = [
    ("Free gift of nature", "Land is provided by nature without any cost or human effort."),
    ("Fixed supply", "The total quantity of land is fixed; it cannot be increased or decreased."),
    ("Immobility", "Land cannot be physically moved from one place to another."),
    ("Passive factor", "Land is passive — it needs labour and capital to become productive."),
    ("Differs in fertility", "Some land is more fertile than others depending on soil quality and climate."),
    ("Location matters", "The economic value of land is heavily influenced by its location."),
]

LAND_FERTILITY_EXAMPLES = [
    ("Punjab", "Punjab", "wheat", "~5,000", "~2,500", "Rajasthan"),
    ("West Bengal", "West Bengal", "rice", "~4,000", "~1,800", "Gujarat arid zone"),
    ("Kerala", "Kerala", "rubber", "~2,200", "~800", "Rajasthan"),
]

LAND_NUMERICAL_TEMPLATES = [
    {
        "id": "L_NUM_01",
        "template": "The net sown area of India is about {pct}% of the total geographical area of {total} million hectares. "
                     "Calculate the net sown area in million hectares.",
        "params": {"pct": (40, 48), "total": (320, 335)},
        "compute": lambda p: round(p["total"] * p["pct"] / 100, 1),
        "unit": "million hectares",
    },
    {
        "id": "L_NUM_02",
        "template": "A fertile plot in {fert_state} yields {fert_yield} kg/hectare while a less fertile plot in "
                     "{less_state} yields {less_yield} kg/hectare. What is the difference in productivity per hectare?",
        "params": {
            "fert_state": ["Punjab", "Haryana", "West Bengal"],
            "fert_yield": (4000, 5500),
            "less_state": ["Rajasthan", "Kutch", "Eastern UP"],
            "less_yield": (1500, 2800),
        },
        "compute": lambda p: p["fert_yield"] - p["less_yield"],
        "unit": "kg/hectare",
    },
]

LAND_PRODUCTIVITY_QS = [
    {
        "q": "What is meant by the productivity of land?",
        "answer": "Productivity of land refers to the output obtained per unit of land. It measures how much produce a given area of land yields.",
        "keywords": ["output", "unit", "land", "yield", "per"],
    },
    {
        "q": "Why is land called a 'passive factor' of production?",
        "answer": "Land is called a passive factor because it cannot produce anything on its own. It requires labour and capital to become productive.",
        "keywords": ["cannot", "produce", "own", "labour", "capital"],
    },
    {
        "q": "How does location affect the economic value of land?",
        "answer": "Land in a commercial or urban centre (e.g., Mumbai, Delhi) commands much higher value than an equal-sized plot in a remote rural area because of superior location.",
        "keywords": ["location", "value", "urban", "rural", "commercial"],
    },
]


# -- LAND SOLVER FUNCTIONS --------------------------------------------

def solve_land_definition(params: dict) -> dict:
    """Evaluate a land-definition answer."""
    student_answer = params.get("answer", "")
    rubric_keywords = params.get("keywords", ["free gift", "nature", "production", "soil", "rivers"])
    score = _kw_score(student_answer, rubric_keywords)
    passed = score >= 0.6
    steps = [
        "Step 1: Identify the economic definition of land.",
        "Step 2: Land = all free gifts of nature useful for production.",
        "Step 3: Check if the answer mentions key elements: free gift, nature, production.",
        "Step 4: Score = keywords_found / total_keywords.",
    ]
    return {
        "answer": "Correct" if passed else "Incorrect / Partially correct",
        "score": round(score, 2),
        "passed": passed,
        "steps": steps,
        "verification": f"Matched {int(score*len(rubric_keywords))}/{len(rubric_keywords)} keywords. "
                        f"Threshold = 60%.",
    }


def solve_land_characteristics(params: dict) -> dict:
    """Evaluate listing land characteristics."""
    student_answer = params.get("answer", "")
    required_chars = params.get("required_count", 4)
    all_chars = [c[0].lower() for c in LAND_CHARACTERISTICS]
    answer_lower = _normalise(student_answer)
    matched = [c for c in all_chars if any(kw in answer_lower for kw in c.split())]
    score = min(len(matched) / required_chars, 1.0)
    passed = score >= 0.75
    steps = [
        f"Step 1: Candidate must list at least {required_chars} characteristics.",
        "Step 2: Check each characteristic: free gift, fixed supply, immobility, passive, fertility, location.",
        "Step 3: Count matched characteristics.",
        "Step 4: Pass if >= 75% of required characteristics found.",
    ]
    return {
        "answer": f"Matched {len(matched)}/{required_chars} characteristics.",
        "score": round(score, 2),
        "passed": passed,
        "matched": matched,
        "steps": steps,
        "verification": f"Found: {matched}. Required ≥ {required_chars}.",
    }


def solve_land_numerical(params: dict) -> dict:
    """Numerical problem on land area/productivity."""
    ptype = params.get("problem_type", "area")
    if ptype == "area":
        total_area = params["total_area_mh"]   # million hectares
        pct_sown = params["pct_sown"]
        net_sown = round(total_area * pct_sown / 100, 1)
        check = round(net_sown * 100 / total_area, 1)
        steps = [
            f"Step 1: Total geographical area = {total_area} million hectares.",
            f"Step 2: Net sown area = {total_area} × {pct_sown}/100",
            f"Step 3: Net sown area = {total_area * pct_sown / 100:.1f} million hectares.",
        ]
        return {
            "answer": f"{net_sown} million hectares",
            "steps": steps,
            "verification": f"Back-check: {net_sown}/{total_area}×100 = {check}% ✓",
        }
    elif ptype == "fertility_diff":
        fert = params["fertile_yield"]
        less = params["less_fertile_yield"]
        diff = fert - less
        steps = [
            f"Step 1: Fertile plot yield = {fert} kg/ha",
            f"Step 2: Less fertile plot yield = {less} kg/ha",
            f"Step 3: Difference = {fert} − {less} = {diff} kg/ha",
        ]
        return {
            "answer": f"{diff} kg/hectare",
            "steps": steps,
            "verification": f"Back-check: {less} + {diff} = {less+diff} = {fert} ✓",
        }
    else:
        return {"answer": "Unknown problem type", "steps": [], "verification": "N/A"}


def solve_land_productivity_meaning(params: dict) -> dict:
    """Evaluate understanding of land productivity meaning."""
    student_answer = params.get("answer", "")
    kws = ["output", "unit", "land", "per hectare", "yield"]
    score = _kw_score(student_answer, kws)
    passed = score >= 0.5
    steps = [
        "Step 1: Productivity of land = output per unit area of land.",
        "Step 2: Measured as yield per hectare (or acre).",
        "Step 3: Higher output per unit → higher productivity.",
        "Step 4: Score answer on keyword match.",
    ]
    return {
        "answer": "Correct" if passed else "Incorrect",
        "score": round(score, 2),
        "passed": passed,
        "steps": steps,
        "verification": f"Keyword score: {score:.0%}. Threshold: 50%.",
    }


# ===================================================================
#  TOPIC 2 – DEMAND  (c10_econ_008)
# ===================================================================

DEMAND_TYPES = {
    "individual": ("Individual Demand", "Demand of a single consumer at various prices."),
    "market": ("Market Demand", "Total demand of all consumers in a market at each price."),
    "joint": ("Joint Demand", "Two goods demanded together (complements), e.g., car and petrol."),
    "composite": ("Composite Demand", "One good demanded for several uses, e.g., electricity."),
    "derived": ("Derived Demand", "Demand for a factor/input derived from demand for final good, e.g., steel for cars."),
    "direct": ("Direct Demand", "Demand for a good for direct consumption, e.g., food, clothes."),
}

DEMAND_CONDITIONS = [
    ("Willingness to buy", "The consumer must be willing to purchase the good."),
    ("Ability to pay", "The consumer must have the purchasing power."),
    ("Price and time reference", "Demand must specify a price and a time period."),
]

DEMAND_NUMERICAL_TEMPLATES = [
    {
        "id": "D_NUM_01",
        "template": (
            "At price ₹{p1} per kg, a consumer buys {q1} kg of rice. "
            "When price rises to ₹{p2} per kg, the consumer buys {q2} kg. "
            "Calculate the total expenditure at each price and state the change."
        ),
        "params": {"p1": (30, 60), "q1": (2, 10), "p2_factor": (1.3, 2.0)},
        "compute": lambda p: {
            "exp1": p["p1"] * p["q1"],
            "exp2": int(p["p1"] * p["p2_factor"]) * p["q2"],
            "change": int(p["p1"] * p["p2_factor"]) * p["q2"] - p["p1"] * p["q1"],
        },
        "unit": "₹",
    },
]


def solve_demand_definition(params: dict) -> dict:
    """Evaluate demand definition (3 conditions)."""
    student_answer = params.get("answer", "")
    kws = ["willingness", "ability", "pay", "price", "time", "period", "quantity"]
    score = _kw_score(student_answer, kws)
    passed = score >= 0.5
    steps = [
        "Step 1: Economic demand requires THREE conditions.",
        "   Condition 1: Willingness to buy.",
        "   Condition 2: Ability to pay (purchasing power).",
        "   Condition 3: Specified price and time period.",
        "Step 2: A mere desire without ability to pay is NOT demand.",
        "Step 3: Score = keywords found / total required keywords.",
    ]
    return {
        "answer": "Correct" if passed else "Incorrect / Incomplete",
        "score": round(score, 2),
        "passed": passed,
        "steps": steps,
        "verification": f"Matched keywords score: {score:.0%}. Threshold: 50%.",
    }


def solve_demand_types(params: dict) -> dict:
    """Evaluate classification of demand types."""
    student_answer = params.get("answer", "")
    expected_type = params.get("expected_type", "").lower()
    type_keywords = {
        "individual": ["single", "one consumer", "individual"],
        "market": ["all consumers", "total", "market"],
        "joint": ["together", "complement", "joint"],
        "composite": ["several uses", "composite", "multiple uses"],
        "derived": ["factor", "input", "final good", "derived"],
        "direct": ["direct consumption", "direct"],
    }
    expected_kws = type_keywords.get(expected_type, [])
    score = _kw_score(student_answer, expected_kws)
    # Also check the type name itself
    if expected_type in student_answer.lower():
        score = max(score, 0.5)
    passed = score >= 0.5
    steps = [
        f"Step 1: Identify the type '{expected_type}'.",
        f"Step 2: Check if answer matches definition: {DEMAND_TYPES.get(expected_type, ('',''))[1]}",
        "Step 3: Score based on keyword match.",
    ]
    return {
        "answer": "Correct" if passed else "Incorrect",
        "score": round(score, 2),
        "passed": passed,
        "expected_type": expected_type,
        "steps": steps,
        "verification": f"Expected type: {expected_type}. Keyword match: {score:.0%}.",
    }


def solve_demand_vs_desire(params: dict) -> dict:
    """Distinguish demand from desire."""
    student_answer = params.get("answer", "")
    kws = ["willingness", "ability", "pay", "desire", "want", "price", "purchasing power"]
    score = _kw_score(student_answer, kws)
    passed = score >= 0.5
    steps = [
        "Step 1: Desire/Want = merely wishing for a good (no ability to pay).",
        "Step 2: Demand = Desire + Willingness + Ability to Pay + Price + Time.",
        "Step 3: Check if answer explains why desire ≠ demand (ability to pay is the key difference).",
        "Step 4: Score on keyword presence.",
    ]
    return {
        "answer": "Correct" if passed else "Incorrect",
        "score": round(score, 2),
        "passed": passed,
        "steps": steps,
        "verification": f"Keyword score: {score:.0%}. Threshold: 50%.",
    }


def solve_demand_numerical(params: dict) -> dict:
    """Numerical: expenditure/change in demand."""
    price1 = params["price1"]
    qty1 = params["qty1"]
    price2 = params["price2"]
    qty2 = params["qty2"]
    exp1 = price1 * qty1
    exp2 = price2 * qty2
    change = exp2 - exp1
    direction = "increased" if change > 0 else "decreased" if change < 0 else "remained the same"
    steps = [
        f"Step 1: Expenditure at Price ₹{price1} = {price1} × {qty1} = ₹{exp1}",
        f"Step 2: Expenditure at Price ₹{price2} = {price2} × {qty2} = ₹{exp2}",
        f"Step 3: Change = ₹{exp2} − ₹{exp1} = ₹{change} ({direction})",
    ]
    return {
        "answer": f"Expenditure 1: ₹{exp1}; Expenditure 2: ₹{exp2}; Change: ₹{change} ({direction})",
        "steps": steps,
        "verification": f"Back-check: {price1}×{qty1}={exp1}, {price2}×{qty2}={exp2}, diff={change} ✓",
    }


# ===================================================================
#  TOPIC 3 – MARKET  (c10_econ_020)
# ===================================================================

MARKET_TYPES_INFO = {
    "perfect_competition": {
        "name": "Perfect Competition",
        "features": [
            "Large number of buyers and sellers",
            "Homogeneous (identical) product",
            "Free entry and exit",
            "Perfect knowledge of market",
            "Price taker (firms accept market price)",
        ],
        "example": "Agricultural markets in India (e.g., wheat market at APMC mandis).",
    },
    "monopoly": {
        "name": "Monopoly",
        "features": [
            "Single seller",
            "Unique product with no close substitutes",
            "High barriers to entry",
            "Price maker (sets the price)",
            "No competition",
        ],
        "example": "Indian Railways (sole provider of rail transport in India), BSES Delhi (electricity distribution in parts of Delhi).",
    },
    "monopolistic_competition": {
        "name": "Monopolistic Competition",
        "features": [
            "Many sellers",
            "Differentiated products (by brand, quality, features)",
            "Relatively free entry and exit",
            "Some price-making power",
            "Non-price competition (advertising, branding)",
        ],
        "example": "Restaurants in a city, toothpaste brands (Colgate, Pepsodent, Sensodyne), clothing brands.",
    },
    "oligopoly": {
        "name": "Oligopoly",
        "features": [
            "Few large sellers",
            "Interdependence among firms",
            "Homogeneous or differentiated products",
            "High barriers to entry",
            "Price rigidity or collusion possible",
        ],
        "example": "Telecom industry in India (Jio, Airtel, Vi), commercial airlines (IndiGo, Air India, SpiceJet).",
    },
}

MARKET_DEFINITION_KEYWORDS = ["buyers", "sellers", "commodity", "price", "arrangement", "contact", "exchange"]


def solve_market_definition(params: dict) -> dict:
    """Evaluate market definition."""
    student_answer = params.get("answer", "")
    kws = MARKET_DEFINITION_KEYWORDS
    score = _kw_score(student_answer, kws)
    passed = score >= 0.5
    steps = [
        "Step 1: A market is an arrangement/convening, not necessarily a physical place.",
        "Step 2: Four essentials: buyers, sellers, a commodity, and a price.",
        "Step 3: Check if answer captures at least 3 of these elements.",
        "Step 4: Score and verify.",
    ]
    return {
        "answer": "Correct" if passed else "Incorrect / Incomplete",
        "score": round(score, 2),
        "passed": passed,
        "steps": steps,
        "verification": f"Keyword match: {score:.0%}. Required: 50%.",
    }


def solve_market_types_features(params: dict) -> dict:
    """Evaluate market type features."""
    student_answer = params.get("answer", "")
    market_type = params.get("market_type", "")
    info = MARKET_TYPES_INFO.get(market_type, {})
    features = info.get("features", [])
    # Score based on how many feature keywords are found
    kws = [f.split()[0].lower() for f in features]  # first word of each feature
    score = _kw_score(student_answer, kws)
    passed = score >= 0.4
    steps = [
        f"Step 1: Identify market type: {info.get('name', market_type)}.",
        f"Step 2: Key features: {'; '.join(features)}",
        f"Step 3: Example: {info.get('example', 'N/A')}",
        "Step 4: Score answer against feature keywords.",
    ]
    return {
        "answer": "Correct" if passed else "Incorrect",
        "score": round(score, 2),
        "passed": passed,
        "market_type": market_type,
        "steps": steps,
        "verification": f"Feature keyword match: {score:.0%}. Threshold: 40%.",
    }


def solve_market_vs_marketplace(params: dict) -> dict:
    """Distinguish market from marketplace."""
    student_answer = params.get("answer", "")
    kws = ["arrangement", "contact", "buyers", "sellers", "not necessarily", "physical", "place"]
    score = _kw_score(student_answer, kws)
    passed = score >= 0.5
    steps = [
        "Step 1: A 'market' is an arrangement/arrangement, not necessarily a physical location.",
        "Step 2: A 'marketplace' is a physical location (e.g., APMC mandi).",
        "Step 3: Online markets (Amazon) are markets without a physical place.",
        "Step 4: Score answer.",
    ]
    return {
        "answer": "Correct" if passed else "Incorrect",
        "score": round(score, 2),
        "passed": passed,
        "steps": steps,
        "verification": f"Keyword match: {score:.0%}.",
    }


# ===================================================================
#  QUESTION GENERATORS
# ===================================================================

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


def _make_id(prefix: str, idx: int, seed: int) -> str:
    return f"{prefix}_{seed}_{idx:03d}"


# ------------------------------------------------------------------
#  LAND – question generator
# ------------------------------------------------------------------

def _gen_land_mcq(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    rng2 = _rand(seed)

    if competency:
        q = ("In India, the total geographical area is about 328.7 million hectares, of which "
             "roughly 46% is net sown area. This illustrates which characteristic of land?")
        options = ["Fixed supply", "Immobility", "Passive factor", "Durability"]
        correct = 0
        explanation = ("India's total geographical area is fixed — it cannot be increased. "
                       "The ~46% net sown area figure shows that the total land supply is fixed "
                       "and only a portion can be cultivated.")
    else:
        q = "Which of the following is NOT included in the economic concept of land?"
        options = ["Rivers and mineral deposits", "Agricultural soil", "Factory machinery", "Forests and climate"]
        correct = 2
        explanation = ("Factory machinery is capital, not land. Land includes only free gifts of "
                       "nature — soil, rivers, minerals, forests, climate, rainfall.")

    return Question(
        id=_make_id("L", idx, seed),
        type="mcq", topic="Land", difficulty="Easy",
        competency=competency,
        question=q, options=options,
        answer=correct,
        explanation=explanation, marks=1,
    )


def _gen_land_fill_blank(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    if competency:
        q = ("In Punjab, fertile alluvial soil yields about _____ kg/hectare of wheat, while "
             "arid Rajasthan yields about half that amount. The difference illustrates land's "
             "varying _____.")
        answer = "fertility"
        explanation = ("Different soil qualities give different yields. This is the 'differs in fertility' "
                       "characteristic of land. Punjab's yield ~5,000 kg/ha vs Rajasthan's ~2,500 kg/ha.")
    else:
        char = rng.choice([c[0] for c in LAND_CHARACTERISTICS])
        q = f"One key characteristic of land is that it is a {char.replace('Free gift of nature', '_____')}."
        # simplify
        q = "Land is called a _____ — it cannot be moved from one place to another."
        answer = "immobile factor"
        explanation = "Land is immobile — it cannot be physically shifted to another location."

    return Question(
        id=_make_id("L", idx, seed),
        type="fill_blank", topic="Land", difficulty="Easy",
        competency=competency,
        question=q, options=None,
        answer=answer, explanation=explanation, marks=1,
    )


def _gen_land_short(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    pool = LAND_PRODUCTIVITY_QS if not competency else LAND_PRODUCTIVITY_QS  # both have Indian context
    entry = rng.choice(pool)
    return Question(
        id=_make_id("L", idx, seed),
        type="short_answer", topic="Land", difficulty="Easy",
        competency=competency,
        question=entry["q"],
        answer=entry["answer"],
        explanation=entry["answer"],
        marks=2,
        steps=["Analyse question → recall definition → write concise answer."],
        verification=f"Keywords expected: {entry['keywords']}",
    )


def _gen_land_long(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    state1, state2, crop, y1, y2, state3 = rng.choice(LAND_FERTILITY_EXAMPLES)
    if competency:
        q = (f"{state1}'s fertile soil yields about {y1} kg/hectare of {crop}, while "
             f"{state3}'s sandy soil yields about {y2} kg/hectare. "
             "Explain THREE characteristics of land illustrated by this comparison.")
    else:
        q = ("Explain any FOUR characteristics of land as a factor of production, "
             "with one example for each.")
    answer = (
        "1. Free gift of nature: Land exists without human effort. "
        "2. Fixed supply: Total land area cannot be increased. "
        "3. Immobility: Land cannot be moved. "
        "4. Passive factor: Land needs labour and capital. "
        "5. Differs in fertility: Productivity varies by soil quality. "
        "6. Location matters: Value depends on where the land is situated."
    )
    explanation = answer
    return Question(
        id=_make_id("L", idx, seed),
        type="long_answer", topic="Land", difficulty="Medium",
        competency=competency,
        question=q, answer=answer,
        explanation=explanation, marks=4,
        steps=["Identify 4 characteristics → define each → give example → conclude."],
        verification="4 characteristics with correct definitions = full marks.",
    )


def _gen_land_numerical(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    rng2 = _rand(seed)
    if competency:
        total = rng2.randint(320, 335)
        pct = rng2.randint(40, 48)
        net_sown = round(total * pct / 100, 1)
        q = (f"The total geographical area of India is about {total} million hectares, "
             f"of which {pct}% is net sown area. Calculate the net sown area in million hectares.")
        answer = f"{net_sown} million hectares"
        explanation = f"Net sown area = {total} × {pct}/100 = {net_sown} million hectares."
        steps = [
            f"Step 1: Total area = {total} million hectares",
            f"Step 2: Net sown area = {total} × {pct}/100 = {total * pct / 100:.1f} million hectares",
            f"Step 3: Answer = {net_sown} million hectares",
        ]
        verification = f"Back-check: {net_sown}/{total}×100 = {net_sown*100/total:.1f}% ✓"
    else:
        fert = rng2.randint(4000, 5500)
        less = rng2.randint(1500, 2800)
        diff = fert - less
        q = (f"A fertile plot yields {fert} kg/hectare while a less fertile plot yields {less} kg/hectare. "
             f"What is the difference in productivity?")
        answer = f"{diff} kg/hectare"
        explanation = f"Difference = {fert} − {less} = {diff} kg/hectare."
        steps = [
            f"Step 1: Fertile yield = {fert} kg/ha",
            f"Step 2: Less fertile yield = {less} kg/ha",
            f"Step 3: Difference = {fert} − {less} = {diff} kg/ha",
        ]
        verification = f"Back-check: {less} + {diff} = {less+diff} = {fert} ✓"

    return Question(
        id=_make_id("L", idx, seed),
        type="numerical", topic="Land", difficulty="Medium",
        competency=competency,
        question=q, answer=answer,
        explanation=explanation, marks=2,
        steps=steps, verification=verification,
    )


# ------------------------------------------------------------------
#  DEMAND – question generator
# ------------------------------------------------------------------

def _gen_demand_mcq(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    if competency:
        q = ("A student in Mumbai desires a ₹2 lakh motorcycle but currently has only ₹5,000 in savings. "
             "Her desire for the motorcycle is NOT economic demand because:")
        options = [
            "She does not need a motorcycle",
            "She lacks the ability to pay (purchasing power)",
            "Motorcycles are not sold in Mumbai",
            "The price is too high",
        ]
        correct = 1
        explanation = ("Economic demand requires willingness AND ability to pay. "
                       "The student has willingness but lacks ability to pay, so her desire is not demand.")
    else:
        q = "Demand in Economics refers to:"
        options = [
            "A mere desire for a good",
            "Quantity demanded at a specific price and time",
            "Total quantity available in the market",
            "The amount producers are willing to sell",
        ]
        correct = 1
        explanation = ("Demand is the quantity a consumer is WILLING and ABLE to buy at a given "
                       "price during a given period — not just desire.")

    return Question(
        id=_make_id("D", idx, seed),
        type="mcq", topic="Demand", difficulty="Easy",
        competency=competency,
        question=q, options=options,
        answer=correct, explanation=explanation, marks=1,
    )


def _gen_demand_fill_blank(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    if competency:
        q = ("Demand for steel is _____ demand because it arises from the demand for final goods "
             "like cars and bridges (e.g., Tata Steel supplies steel to Maruti Suzuki).")
        answer = "derived"
        explanation = ("Demand for steel is derived from demand for cars, bridges, appliances, etc. "
                       "If car demand falls, steel demand falls too.")
    else:
        q = "Demand of a single consumer is called _____ demand."
        answer = "individual"
        explanation = "Individual demand refers to the demand of one consumer at various prices."

    return Question(
        id=_make_id("D", idx, seed),
        type="fill_blank", topic="Demand", difficulty="Easy",
        competency=competency,
        question=q, options=None,
        answer=answer, explanation=explanation, marks=1,
    )


def _gen_demand_short(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    demand_qs = [
        ("Distinguish between individual demand and market demand.",
         "Individual demand is the quantity a single consumer buys at different prices. "
         "Market demand is the sum of all individual demands at each price.",
         ["individual", "single", "market", "sum", "all consumers"]),
        ("What is joint demand? Give an example.",
         "Joint demand occurs when two goods are demanded together as complements. "
         "Example: car and petrol, or tea and milk.",
         ["together", "complement", "joint", "two goods"]),
        ("What is derived demand? Explain with an Indian example.",
         "Derived demand is demand for a factor/input that arises from demand for the final good. "
         "Example: demand for steel is derived from demand for cars and construction in India.",
         ["factor", "input", "final", "steel", "cars", "derived"]),
        ("What is composite demand? Give an example.",
         "Composite demand is demand for a good that has multiple uses. "
         "Example: electricity is demanded for lighting, cooling, cooking and industry.",
         ["several", "multiple uses", "electricity", "composite"]),
    ]
    q, ans, kws = rng.choice(demand_qs)
    return Question(
        id=_make_id("D", idx, seed),
        type="short_answer", topic="Demand", difficulty="Easy",
        competency=competency,
        question=q, answer=ans,
        explanation=ans, marks=2,
        steps=["Understand type → recall definition → give example."],
        verification=f"Keywords expected: {kws}",
    )


def _gen_demand_long(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    if competency:
        q = ("Differentiate between individual demand and market demand. "
             "Use the example of wheat demand in India to explain how market demand is obtained.")
        answer = (
            "Individual demand = quantity demanded by ONE consumer at various prices. "
            "Market demand = SUM of all individual demands at each price. "
            "Example: if 3 consumers demand 2kg, 3kg, and 5kg of wheat at ₹30/kg, "
            "market demand = 2+3+5 = 10kg at that price. "
            "Market demand curve is flatter (more elastic) than individual curves."
        )
    else:
        q = ("Explain the three conditions that distinguish economic demand from a mere desire. "
             "Use a suitable example.")
        answer = (
            "Three conditions: (1) Willingness to buy — the consumer must want the good. "
            "(2) Ability to pay — must have purchasing power. "
            "(3) Price and time reference — must specify at what price and during which period. "
            "Example: A student's desire for a Mercedes is not demand (no ability to pay). "
            "Buying a ₹8,000 phone IS demand (all 3 conditions met)."
        )
    return Question(
        id=_make_id("D", idx, seed),
        type="long_answer", topic="Demand", difficulty="Medium",
        competency=competency,
        question=q, answer=answer,
        explanation=answer, marks=4,
        steps=["Identify conditions → explain each → give example → conclude."],
        verification="3 conditions + 1 example = full marks.",
    )


def _gen_demand_numerical(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    rng2 = _rand(seed)
    price1 = rng2.randint(30, 80)
    qty1 = rng2.randint(2, 10)
    price2 = price1 + rng2.randint(10, 30)
    qty2 = max(1, qty1 - rng2.randint(1, 4))
    exp1 = price1 * qty1
    exp2 = price2 * qty2
    change = exp2 - exp1
    direction = "increased" if change > 0 else "decreased"
    q = (f"At ₹{price1}/kg, a consumer buys {qty1} kg of rice. When price rises to ₹{price2}/kg, "
         f"the consumer buys {qty2} kg. Calculate total expenditure at each price.")
    answer = f"₹{price1}×{qty1}=₹{exp1}; ₹{price2}×{qty2}=₹{exp2}; Change: ₹{change} ({direction})"
    explanation = answer
    steps = [
        f"Expenditure at ₹{price1} = {price1} × {qty1} = ₹{exp1}",
        f"Expenditure at ₹{price2} = {price2} × {qty2} = ₹{exp2}",
        f"Change = ₹{exp2} − ₹{exp1} = ₹{change} ({direction})",
    ]
    verification = f"Back-check: {price1}×{qty1}={exp1}, {price2}×{qty2}={exp2}, diff={change} ✓"
    return Question(
        id=_make_id("D", idx, seed),
        type="numerical", topic="Demand", difficulty="Medium",
        competency=competency,
        question=q, answer=answer,
        explanation=explanation, marks=2,
        steps=steps, verification=verification,
    )


# ------------------------------------------------------------------
#  MARKET – question generator
# ------------------------------------------------------------------

def _gen_market_mcq(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    if competency:
        q = ("Amazon India and Flipkart are examples of a market where buyers and sellers "
             "never physically meet. This illustrates that a market:")
        options = [
            "Must always be a physical place",
            "Is an arrangement and need not be a physical location",
            "Only exists in rural areas",
            "Cannot operate online",
        ]
        correct = 1
        explanation = ("A market is an arrangement bringing buyers and sellers together — it may be "
                       "physical (APMC mandi), telephonic, or online (Amazon). A marketplace is the "
                       "physical location; the market is the exchange arrangement.")
    else:
        q = "Which market structure has only ONE seller?"
        options = ["Perfect Competition", "Monopoly", "Monopolistic Competition", "Oligopoly"]
        correct = 1
        explanation = ("Monopoly = single seller, unique product, price maker. "
                       "Example: Indian Railways.")

    return Question(
        id=_make_id("M", idx, seed),
        type="mcq", topic="Market", difficulty="Easy",
        competency=competency,
        question=q, options=options,
        answer=correct, explanation=explanation, marks=1,
    )


def _gen_market_fill_blank(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    if competency:
        q = ("The telecom industry in India (Jio, Airtel, Vi) with few large interdependent firms "
             "is an example of _____ market.")
        answer = "oligopoly"
        explanation = ("Oligopoly = few large sellers, interdependence, high barriers. "
                       "Indian telecom: Jio, Airtel, Vodafone Idea are the main players.")
    else:
        q = "A market with a large number of buyers and sellers and a homogeneous product is called _____ competition."
        answer = "perfect"
        explanation = ("Perfect competition: many buyers/sellers, identical product, free entry. "
                       "Example: wheat market at APMC mandis.")

    return Question(
        id=_make_id("M", idx, seed),
        type="fill_blank", topic="Market", difficulty="Easy",
        competency=competency,
        question=q, options=None,
        answer=answer, explanation=explanation, marks=1,
    )


def _gen_market_short(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    market_qs = [
        ("List any three features of a monopoly market.",
         "1. Single seller 2. Unique product with no substitutes 3. Price maker 4. High barriers to entry.",
         ["single", "seller", "unique", "price maker", "barriers"]),
        ("Distinguish between a market and a marketplace.",
         "A market is an arrangement bringing buyers and sellers into contact for exchange at a price. "
         "A marketplace is a physical location where trade occurs. "
         "Online markets (Amazon) are markets without a physical marketplace.",
         ["arrangement", "buyers", "sellers", "physical", "place"]),
        ("What is meant by perfect competition? Give one Indian example.",
         "Perfect competition has many buyers/sellers, homogeneous product, free entry/exit. "
         "Example: wheat market at APMC mandis in Maharashtra.",
         ["many", "sellers", "homogeneous", "free entry", "wheat", "APMC"]),
    ]
    q, ans, kws = rng.choice(market_qs)
    return Question(
        id=_make_id("M", idx, seed),
        type="short_answer", topic="Market", difficulty="Easy",
        competency=competency,
        question=q, answer=ans,
        explanation=ans, marks=2,
        steps=["Recall definition → list features → give example."],
        verification=f"Keywords expected: {kws}",
    )


def _gen_market_long(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    if competency:
        q = ("The APMC mandi at Nashik brings farmers and traders together to exchange onions and grapes. "
             "Explain how this represents a market, and list the four essentials of a market. "
             "Also classify the Indian telecom industry (Jio, Airtel, Vi) into the appropriate market type.")
        answer = (
            "The Nashik APMC mandi is a market — an arrangement where farmers (sellers) and traders "
            "(buyers) exchange onions and grapes at a discovered price. "
            "Four essentials of a market: (1) Buyers, (2) Sellers, (3) Commodity, (4) Price. "
            "Indian telecom (Jio, Airtel, Vi) is an oligopoly — few large interdependent firms, "
            "high barriers to entry, price rigidity."
        )
    else:
        q = ("Compare any TWO types of markets — Perfect Competition and Monopoly — "
             "listing at least THREE features of each.")
        answer = (
            "Perfect Competition: (1) Many buyers/sellers, (2) Homogeneous product, "
            "(3) Free entry/exit, (4) Price taker. Example: wheat market at APMC mandis. "
            "Monopoly: (1) Single seller, (2) Unique product, (3) Price maker, "
            "(4) High barriers. Example: Indian Railways."
        )
    return Question(
        id=_make_id("M", idx, seed),
        type="long_answer", topic="Market", difficulty="Medium",
        competency=competency,
        question=q, answer=answer,
        explanation=answer, marks=4,
        steps=["Identify market types → list features → compare → conclude."],
        verification="3+ features per type + examples = full marks.",
    )


def _gen_market_numerical(rng: random.Random, idx: int, competency: bool) -> Question:
    seed = rng.randint(0, 999999)
    rng2 = _rand(seed)
    # Simple numerical: count market features
    market = rng2.choice(["perfect_competition", "monopoly", "monopolistic_competition", "oligopoly"])
    info = MARKET_TYPES_INFO[market]
    n_features = len(info["features"])
    feature_count = rng2.randint(3, n_features)
    q = (f"For {info['name']}, list any {feature_count} of the {n_features} key features "
         f"mentioned in your textbook.")
    answer = "; ".join(info["features"][:feature_count])
    explanation = f"{info['name']} features: " + "; ".join(info["features"])
    return Question(
        id=_make_id("M", idx, seed),
        type="numerical", topic="Market", difficulty="Easy",
        competency=competency,
        question=q, answer=answer,
        explanation=explanation, marks=2,
        steps=[
            f"Step 1: Identify market type = {info['name']}",
            f"Step 2: List {feature_count} features from the textbook",
            f"Step 3: Verify each feature is correct",
        ],
        verification=f"{feature_count} correct features listed ✓",
    )


# ------------------------------------------------------------------
#  MAIN GENERATOR
# ------------------------------------------------------------------

def generate_questions(seed: int, count: int = 20) -> list[dict]:
    """Generate `count` deterministic questions across all topics."""
    rng = _rand(seed)

    topics = ["Land", "Demand", "Market"]
    types = ["mcq", "fill_blank", "short_answer", "long_answer", "numerical"]

    generators = {
        ("Land", "mcq"): _gen_land_mcq,
        ("Land", "fill_blank"): _gen_land_fill_blank,
        ("Land", "short_answer"): _gen_land_short,
        ("Land", "long_answer"): _gen_land_long,
        ("Land", "numerical"): _gen_land_numerical,
        ("Demand", "mcq"): _gen_demand_mcq,
        ("Demand", "fill_blank"): _gen_demand_fill_blank,
        ("Demand", "short_answer"): _gen_demand_short,
        ("Demand", "long_answer"): _gen_demand_long,
        ("Demand", "numerical"): _gen_demand_numerical,
        ("Market", "mcq"): _gen_market_mcq,
        ("Market", "fill_blank"): _gen_market_fill_blank,
        ("Market", "short_answer"): _gen_market_short,
        ("Market", "long_answer"): _gen_market_long,
        ("Market", "numerical"): _gen_market_numerical,
    }

    questions: list[Question] = []

    # Distribute: 50% competency, 50% standard
    competency_count = count // 2
    standard_count = count - competency_count

    competency_pool = [(t, ty) for t in topics for ty in types]
    standard_pool = [(t, ty) for t in topics for ty in types]

    rng.shuffle(competency_pool)
    rng.shuffle(standard_pool)

    selected_competency = []
    selected_standard = []

    for i in range(competency_count):
        t, ty = competency_pool[i % len(competency_pool)]
        selected_competency.append((t, ty, True))

    for i in range(standard_count):
        t, ty = standard_pool[i % len(standard_pool)]
        selected_standard.append((t, ty, False))

    all_selected = selected_competency + selected_standard
    rng.shuffle(all_selected)

    for i, (topic, qtype, comp) in enumerate(all_selected):
        gen_fn = generators.get((topic, qtype))
        if gen_fn is None:
            continue
        q = gen_fn(rng, i, comp)
        questions.append(q)

    return [asdict(q) for q in questions]


def asdict(q: Question) -> dict:
    d = {
        "id": q.id,
        "type": q.type,
        "topic": q.topic,
        "difficulty": q.difficulty,
        "competency": q.competency,
        "question": q.question,
        "options": q.options,
        "answer": q.answer,
        "explanation": q.explanation,
        "marks": q.marks,
        "steps": q.steps,
        "verification": q.verification,
    }
    return d


# ===================================================================
#  SOLVER DISPATCH
# ===================================================================

def solve(params: dict) -> dict:
    """Unified solver — dispatches to the right solver based on 'topic' and 'type'."""
    topic = params.get("topic", "").lower()
    qtype = params.get("question_type", "").lower()

    solvers = {
        ("land", "definition"): solve_land_definition,
        ("land", "characteristics"): solve_land_characteristics,
        ("land", "numerical"): solve_land_numerical,
        ("land", "productivity"): solve_land_productivity_meaning,
        ("demand", "definition"): solve_demand_definition,
        ("demand", "types"): solve_demand_types,
        ("demand", "desire"): solve_demand_vs_desire,
        ("demand", "numerical"): solve_demand_numerical,
        ("market", "definition"): solve_market_definition,
        ("market", "types"): solve_market_types_features,
        ("market", "marketplace"): solve_market_vs_marketplace,
    }

    key = (topic, qtype)
    fn = solvers.get(key)
    if fn is None:
        return {
            "answer": "Unknown solver configuration",
            "steps": [f"No solver registered for topic='{topic}', type='{qtype}'"],
            "verification": "N/A",
        }
    return fn(params)


# Convenience wrappers

def solve_mcq(params: dict) -> dict:
    """Evaluate MCQ: params must include 'selected_option' (int) and 'correct_option' (int)."""
    selected = params.get("selected_option", -1)
    correct = params.get("correct_option", -1)
    passed = selected == correct
    steps = [
        f"Step 1: Student selected option {selected}.",
        f"Step 2: Correct answer is option {correct}.",
        f"Step 3: Comparison → {'Match' if passed else 'No match'}.",
    ]
    return {
        "answer": "Correct ✓" if passed else f"Incorrect ✗ (correct: option {correct})",
        "selected_option": selected,
        "correct_option": correct,
        "passed": passed,
        "steps": steps,
        "verification": f"{selected} == {correct} → {passed}",
    }


def solve_fill_blank(params: dict) -> dict:
    """Evaluate fill-in-the-blank."""
    student = _normalise(params.get("answer", ""))
    expected_raw = params.get("expected_answers", [])
    expected = [_normalise(e) for e in expected_raw]
    # Check exact or partial
    passed = any(student == e or e in student for e in expected) if expected else False
    steps = [
        "Step 1: Normalise student answer (lowercase, strip).",
        f"Step 2: Compare against accepted answers: {expected}",
        f"Step 3: Match found: {passed}",
    ]
    return {
        "answer": "Correct ✓" if passed else f"Incorrect ✗ (expected one of: {expected})",
        "passed": passed,
        "steps": steps,
        "verification": f"'{student}' in {expected} → {passed}",
    }


def solve_short_answer(params: dict) -> dict:
    """Evaluate short-answer using keyword scoring."""
    return solve(params)


def solve_long_answer(params: dict) -> dict:
    """Evaluate long-answer using keyword scoring."""
    return solve(params)


def solve_numerical(params: dict) -> dict:
    """Evaluate numerical — delegates to topic-specific numerical solver."""
    return solve(params)


# ===================================================================
#  DEMO / SMOKE TEST
# ===================================================================

if __name__ == "__main__":
    SEED = 42

    print("=" * 60)
    print("CISCE Class 10 Economics — Solver Demo")
    print("=" * 60)

    # --- Generate questions ---
    print("\n--- Generating 12 questions (seed=42) ---")
    qs = generate_questions(SEED, 12)
    for q in qs:
        comp_tag = "[C]" if q["competency"] else "[S]"
        opt_str = f" Options: {q['options']}" if q["options"] else ""
        print(f"  {comp_tag} [{q['type']:14s}] [{q['topic']:8s}] {q['id']}")
        print(f"      Q: {q['question'][:80]}{opt_str}")
        print(f"      A: {q['answer']}")
        print()

    # --- Solver demos ---
    print("\n--- Solver Demos ---\n")

    # 1. Land numerical
    print("1. Land Numerical (area):")
    r = solve_land_numerical({"problem_type": "area", "total_area_mh": 328.7, "pct_sown": 46})
    print(f"   Answer: {r['answer']}")
    for s in r["steps"]:
        print(f"   {s}")
    print(f"   Verification: {r['verification']}")

    # 2. Demand definition
    print("\n2. Demand Definition:")
    r = solve_demand_definition({"answer": "Willingness and ability to buy at a price in a time period"})
    print(f"   Answer: {r['answer']} (score: {r['score']})")
    for s in r["steps"]:
        print(f"   {s}")
    print(f"   Verification: {r['verification']}")

    # 3. Market definition
    print("\n3. Market Definition:")
    r = solve_market_definition({"answer": "A market is an arrangement where buyers and sellers come into contact to exchange goods at a price"})
    print(f"   Answer: {r['answer']} (score: {r['score']})")
    for s in r["steps"]:
        print(f"   {s}")
    print(f"   Verification: {r['verification']}")

    # 4. MCQ
    print("\n4. MCQ Solver:")
    r = solve_mcq({"selected_option": 1, "correct_option": 1})
    print(f"   Answer: {r['answer']}")
    for s in r["steps"]:
        print(f"   {s}")

    # 5. Fill blank
    print("\n5. Fill-blank Solver:")
    r = solve_fill_blank({
        "answer": "derived",
        "expected_answers": ["derived", "Derived"],
    })
    print(f"   Answer: {r['answer']}")
    for s in r["steps"]:
        print(f"   {s}")

    # 6. Land fertility numerical
    print("\n6. Land Fertility Difference:")
    r = solve_land_numerical({"problem_type": "fertility_diff", "fertile_yield": 5000, "less_fertile_yield": 2500})
    print(f"   Answer: {r['answer']}")
    for s in r["steps"]:
        print(f"   {s}")
    print(f"   Verification: {r['verification']}")

    # 7. Demand numerical
    print("\n7. Demand Numerical:")
    r = solve_demand_numerical({"price1": 40, "qty1": 5, "price2": 50, "qty2": 4})
    print(f"   Answer: {r['answer']}")
    for s in r["steps"]:
        print(f"   {s}")
    print(f"   Verification: {r['verification']}")

    # 8. Market types
    print("\n8. Market Types (Oligopoly):")
    r = solve_market_types_features({
        "market_type": "oligopoly",
        "answer": "Oligopoly has few large sellers, interdependence, high barriers, price rigidity.",
    })
    print(f"   Answer: {r['answer']} (score: {r['score']})")
    for s in r["steps"]:
        print(f"   {s}")

    print("\n" + "=" * 60)
    print("Demo complete.")
    print("=" * 60)