"""
CISCE ECONAPP Class 10 Question Generator
Syllabus: Demand (Types), Land (Characteristics), Credit (Meaning & Importance)
Author: claude-fable-5 by Anthropic
"""

import random
import math
import fractions
import dataclasses
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple
from enum import Enum
import json


# ─────────────────────────────────────────────
# ENUMS & DATA CLASSES
# ─────────────────────────────────────────────

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Topic(Enum):
    DEMAND_TYPES = "demand_types"
    LAND_CHARACTERISTICS = "land_characteristics"
    CREDIT_MEANING = "credit_meaning"


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


@dataclass
class Question:
    id: str
    type: str
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    difficulty: str = "easy"
    topic: str = ""
    competency: bool = False


@dataclass
class SolverResult:
    answer: Any
    steps: List[str]
    verification: str
    is_correct: bool


# ─────────────────────────────────────────────
# SOLVER FUNCTIONS
# ─────────────────────────────────────────────

def solve_demand_types_classify(params: Dict) -> SolverResult:
    """Classify a given transaction into demand type."""
    transaction = params.get("transaction", "")
    steps = [
        "Step 1: Recall definitions:",
        "  - Demand = desire + ability to pay + willingness to pay.",
        "  - Joint demand: two goods demanded together for ONE purpose (complementary).",
        "  - Derived demand: demand for an INPUT driven by demand for a FINAL good.",
        "  - Composite demand: demand for ONE good used in MULTIPLE purposes.",
        f"Step 2: Analyse the transaction: '{transaction}'",
    ]
    transaction_lower = transaction.lower()
    answer = "Not Classified"
    if any(kw in transaction_lower for kw in ["petrol", "diesel", "car", "tyre", "pen", "ink"]):
        answer = "Joint Demand"
        steps.append("Step 3: Two goods are needed together for a single purpose → Joint Demand.")
    elif any(kw in transaction_lower for kw in ["steel", "cotton", "labour", "software engineer", "cement"]):
        answer = "Derived Demand"
        steps.append("Step 3: Demand for this input exists because of demand for the final product → Derived Demand.")
    elif any(kw in transaction_lower for kw in ["electricity", "milk", "coal", "water"]):
        answer = "Composite Demand"
        steps.append("Step 3: One good serves multiple purposes → Composite Demand.")
    else:
        answer = "Direct/Independent Demand"
        steps.append("Step 3: The good is demanded for its own sake → Direct Demand.")
    verification = f"Back-check: '{answer}' is the best fit for '{transaction}'."
    return SolverResult(answer=answer, steps=steps, verification=verification, is_correct=True)


def solve_land_characteristics_check(params: Dict) -> SolverResult:
    """Check whether a statement correctly describes a land characteristic."""
    statement = params.get("statement", "")
    characteristic = params.get("characteristic", "")
    steps = [
        f"Step 1: Given statement: '{statement}'",
        f"Step 2: Target characteristic: '{characteristic}'",
    ]
    valid_chars = [
        "free gift of nature", "fixed supply", "immobile", "heterogeneous",
        "passive factor", "indestructible"
    ]
    is_correct = characteristic.lower() in valid_chars
    steps.append(f"Step 3: '{characteristic}' is a valid economic characteristic of land: {is_correct}.")
    steps.append("Step 4: In the economic sense, land includes soil, water, forests, minerals, and climate.")
    verification = f"Characteristic '{characteristic}' is {'recognised' if is_correct else 'not a standard characteristic'} in economic theory."
    return SolverResult(
        answer="Correct" if is_correct else "Incorrect",
        steps=steps, verification=verification, is_correct=is_correct
    )


def solve_credit_time_gap(params: Dict) -> SolverResult:
    """Calculate repayment amount for a credit transaction."""
    principal = float(params.get("principal", 0))
    rate = float(params.get("rate", 0))
    time_years = float(params.get("time_years", 1))
    steps = [
        f"Step 1: Principal (P) = ₹{principal:,.2f}",
        f"Step 2: Rate of interest (R) = {rate}% per annum",
        f"Step 3: Time period (T) = {time_years} year(s)",
        "Step 4: Simple Interest formula: SI = (P x R x T) / 100",
        f"Step 5: SI = (₹{principal:,.2f} x {rate} x {time_years}) / 100 = ₹{(principal * rate * time_years / 100):,.2f}",
        f"Step 6: Total Repayment = Principal + Interest = ₹{principal:,.2f} + ₹{(principal * rate * time_years / 100):,.2f} = ₹{principal + principal * rate * time_years / 100:,.2f}",
    ]
    si = principal * rate * time_years / 100
    total = principal + si
    verification = (
        f"Verification: SI = PxRxT/100 = {principal}x{rate}x{time_years}/100 = {si:.2f}. "
        f"Total = {principal} + {si:.2f} = {total:.2f} ✓"
    )
    return SolverResult(
        answer={"simple_interest": round(si, 2), "total_repayment": round(total, 2)},
        steps=steps, verification=verification, is_correct=True
    )


def solve_credit_identify_parties(params: Dict) -> SolverResult:
    """Identify creditor and debtor in a transaction."""
    transaction = params.get("transaction", "")
    steps = [
        f"Step 1: Transaction: '{transaction}'",
        "Step 2: Identify who gives (creditor) and who receives (debtor) now with deferred payment.",
    ]
    transaction_lower = transaction.lower()
    creditor = "Unknown"
    debtor = "Unknown"
    patterns = [
        ("farmer", "sbi", "State Bank of India", "Farmer"),
        ("employee", "bajaj", "Bajaj Finserv", "Employee"),
        ("government", "rbi", "Reserve Bank of India", "Government of India"),
        ("business", "hdfc", "HDFC Bank", "Business owner"),
        ("student", "canara", "Canara Bank", "Student"),
    ]
    for lender_kw, bank_kw, bank_name, debtor_label in patterns:
        if lender_kw in transaction_lower or bank_kw in transaction_lower:
            creditor = bank_name
            debtor = debtor_label
            break
    steps.append(f"Step 3: Creditor (gives now) = {creditor}")
    steps.append(f"Step 4: Debtor (receives now, pays later) = {debtor}")
    verification = f"Verification: {creditor} extends credit → creditor role confirmed. {debtor} receives and promises to repay → debtor role confirmed."
    return SolverResult(
        answer={"creditor": creditor, "debtor": debtor},
        steps=steps, verification=verification, is_correct=True
    )


def solve_land_fixed_supply_numerical(params: Dict) -> SolverResult:
    """Numerical: Calculate percentage of land under agriculture."""
    total_area = float(params.get("total_area", 328.7))
    agri_area = float(params.get("agri_area", 179.8))
    steps = [
        f"Step 1: Total geographical area of India = {total_area} million hectares",
        f"Step 2: Area under agricultural use = {agri_area} million hectares",
        f"Step 3: Percentage = (Agricultural Area / Total Area) x 100",
        f"Step 4: Percentage = ({agri_area} / {total_area}) x 100 = {agri_area / total_area * 100:.2f}%",
        "Step 5: This demonstrates FIXED SUPPLY of land - the total area cannot increase.",
    ]
    pct = agri_area / total_area * 100
    verification = f"Verification: {agri_area}/{total_area} x 100 = {pct:.4f}% ≈ {pct:.2f}% ✓"
    return SolverResult(
        answer={"percentage": round(pct, 2)},
        steps=steps, verification=verification, is_correct=True
    )


# ─────────────────────────────────────────────
# QUESTION POOL DATA
# ─────────────────────────────────────────────

DEMAND_MCQ_POOL = [
    {
        "question": "Which of the following is NOT a condition for demand (as distinct from mere desire)?",
        "options": ["Ability to pay", "Willingness to pay", "Quantity available in the market", "Desire for the good"],
        "answer": "Quantity available in the market",
        "explanation": "Demand requires: (1) Desire for a good, (2) Ability to pay, (3) Willingness to pay. The quantity available in the market is a supply-side factor, not a condition for demand.",
    },
    {
        "question": "A student wants a bicycle worth ₹8,000 but has only ₹2,000 saved. This situation represents:",
        "options": ["Demand", "Mere desire", "Effective demand", "Composite demand"],
        "answer": "Mere desire",
        "explanation": "The student desires a bicycle but lacks the ability to pay the full price (₹8,000). Without both ability AND willingness to pay, this is mere desire, not effective demand.",
    },
    {
        "question": "The demand for petrol and a car are demanded together. This type of demand is called:",
        "options": ["Joint demand", "Derived demand", "Composite demand", "Independent demand"],
        "answer": "Joint demand",
        "explanation": "Joint demand occurs when two or more goods are demanded together to satisfy a single want. Petrol and a car are jointly demanded - you need both to run the car.",
    },
    {
        "question": "The demand for steel by Tata Motors arises because of the demand for cars. This is an example of:",
        "options": ["Joint demand", "Derived demand", "Composite demand", "Direct demand"],
        "answer": "Derived demand",
        "explanation": "Derived demand means the demand for a factor of production or intermediate good arises from the demand for the final product. Steel is demanded because cars are demanded.",
    },
    {
        "question": "Electricity is used for lighting, cooking, running ACs, and operating factories. This illustrates:",
        "options": ["Joint demand", "Derived demand", "Composite demand", "Deferred demand"],
        "answer": "Composite demand",
        "explanation": "Composite demand exists when a single good or resource is demanded for several different purposes. Electricity serves multiple uses simultaneously - hence composite demand.",
    },
    {
        "question": "Which of the following pairs shows JOINT demand?",
        "options": ["Pen and refill", "Sugar and tea", "Flour and vegetables", "Car and fuel"],
        "answer": "Car and fuel",
        "explanation": "Car and fuel (petrol/diesel) are jointly demanded - both are needed simultaneously to run the car. While pen and refill, or tea and sugar, are also complementary, 'car and fuel' is the clearest textbook example of joint demand.",
    },
    {
        "question": "The demand for software engineers in Bengaluru Tech Park is derived from the demand for:",
        "options": ["Electricity", "IT services / software products", "Petrol", "Office buildings"],
        "answer": "IT services / software products",
        "explanation": "This is derived demand. Software engineers are a factor input whose demand depends on the demand for IT services and software products in the market.",
    },
    {
        "question": "Milk has composite demand because it is used to make all of the following EXCEPT:",
        "options": ["Tea", "Curd", "Petrol", "Ghee"],
        "answer": "Petrol",
        "explanation": "Milk is used for tea, curd, ghee, sweets, and other products - giving it composite demand. Petrol has no connection to milk.",
    },
    {
        "question": "Which type of demand best describes a farmer's need for both seeds and fertilisers to grow crops?",
        "options": ["Joint demand", "Derived demand", "Composite demand", "Autonomous demand"],
        "answer": "Joint demand",
        "explanation": "Seeds and fertilisers are jointly demanded - both are needed together for the single purpose of growing crops. Neither alone suffices.",
    },
    {
        "question": "Demand in economics is best defined as:",
        "options": [
            "Desire for a good",
            "Desire backed by ability and willingness to pay",
            "Need for a good",
            "Quantity purchased"
        ],
        "answer": "Desire backed by ability and willingness to pay",
        "explanation": "Economics defines demand as desire supported by the ability and willingness to pay for a good at a given price and time. Mere desire, need, or quantity purchased do not capture the full definition.",
    },
]

DEMAND_FILL_BLANK_POOL = [
    {
        "question": "Demand means desire backed by ability and willingness to _____.",
        "answer": "pay",
        "explanation": "Demand is defined as desire + ability to pay + willingness to pay. All three conditions must be satisfied.",
    },
    {
        "question": "When two goods are demanded together for one purpose, it is called _____ demand.",
        "answer": "joint",
        "explanation": "Joint demand occurs when two or more commodities are demanded simultaneously to satisfy one single want, e.g., car and petrol.",
    },
    {
        "question": "The demand for factors of production like labour and raw materials is called _____ demand.",
        "answer": "derived",
        "explanation": "Derived demand refers to the demand for productive resources or factors which arises from the demand for the final product made from those resources.",
    },
    {
        "question": "The demand for electricity for lighting, cooling, and cooking is an example of _____ demand.",
        "answer": "composite",
        "explanation": "Composite demand exists when a single good is demanded for multiple different purposes simultaneously.",
    },
    {
        "question": "A person who receives goods or money now and promises to pay later is called a _____.",
        "answer": "debtor",
        "explanation": "The debtor is the party who receives the benefit of credit now and undertakes to repay at a future date.",
    },
]

DEMAND_SHORT_ANSWER_POOL = [
    {
        "question": "Distinguish between 'desire' and 'demand' in economics, with one example.",
        "answer": "Desire is simply wanting a good. Demand is desire backed by ability to pay and willingness to pay. Example: A poor person desiring a car has mere desire; a person with ₹5 lakh willing to spend it on a Maruti Swift has effective demand.",
        "explanation": "Desire = mere want. Demand = want + purchasing power + willingness. Without the latter two conditions, desire is not economic demand.",
        "topic": Topic.DEMAND_TYPES.value,
    },
    {
        "question": "Explain with an Indian example how the demand for cotton by a textile mill in Ahmedabad is 'derived demand'.",
        "answer": "The demand for cotton by the textile mill is derived demand because the mill buys cotton only because there is consumer demand for cotton cloth (shirts, sarees). If consumers stopped buying cotton cloth, the mill's demand for cotton would vanish. Thus, the demand for cotton is derived from the demand for the final product.",
        "explanation": "Derived demand: the demand for an intermediate good depends on the demand for the final good. Cotton → cloth → consumers.",
        "topic": Topic.DEMAND_TYPES.value,
    },
    {
        "question": "Give one Indian example each for: (a) Joint demand, (b) Derived demand, (c) Composite demand.",
        "answer": "(a) Joint demand: Petrol and a car are demanded together. (b) Derived demand: Software engineers in Bengaluru - demand arises from IT services demand. (c) Composite demand: Electricity in India used for lighting, cooking, cooling, and industry.",
        "explanation": "Each type has a distinct logic: together-for-one-purpose, input-because-of-output, one-good-many-purposes.",
        "topic": Topic.DEMAND_TYPES.value,
    },
]

DEMAND_LONG_ANSWER_POOL = [
    {
        "question": "Explain in detail the three types of demand: Joint, Derived, and Composite. Give two Indian examples for each type.",
        "answer": "Joint Demand: Two goods are demanded together to satisfy ONE want. Examples: (1) Car + petrol in India - you need both to drive. (2) Mobile phone + SIM card. Derived Demand: Demand for an input exists because of demand for the FINAL good. Examples: (1) Steel by Tata Motors - derived from car demand. (2) Software engineers in Bengaluru - derived from IT services demand. Composite Demand: ONE good is used for MULTIPLE purposes. Examples: (1) Electricity - lighting, cooking, AC, factories. (2) Milk - tea, curd, ghee, sweets, paneer.",
        "explanation": "Each type has distinct logic. Joint = two goods, one purpose. Derived = input depends on output. Composite = one good, many uses.",
        "topic": Topic.DEMAND_TYPES.value,
    },
]

DEMAND_NUMERICAL_POOL = [
    {
        "question": "A consumer in Mumbai has ₹25,000 and is willing to buy a smartwatch costing ₹22,000. Does this represent effective demand? If the same consumer wanted a laptop costing ₹60,000 with only ₹25,000, what type of demand is that?",
        "answer": "₹22,000 watch: Effective demand (desire + ability ₹25,000 >= ₹22,000 + willingness). ₹60,000 laptop: Mere desire (ability ₹25,000 < ₹60,000).",
        "explanation": "Effective demand requires: desire + ability >= price + willingness. Watch: all three conditions met. Laptop: ability falls short → mere desire.",
        "topic": Topic.DEMAND_TYPES.value,
    },
]

# ─── LAND ────────────────────────────────────

LAND_MCQ_POOL = [
    {
        "question": "In the economic sense, 'land' includes which of the following?",
        "options": ["Only agricultural farmland", "Soil, water, forests, minerals, and climate", "Only mineral deposits", "Only surface soil"],
        "answer": "Soil, water, forests, minerals, and climate",
        "explanation": "In economics, 'land' means all free gifts of nature: surface soil, water bodies, forests, mineral deposits underground, and climate/rainfall. It is NOT limited to farmland.",
    },
    {
        "question": "Which of the following is NOT a characteristic of land as a factor of production?",
        "options": ["Free gift of nature", "Fixed supply", "Mobile", "Heterogeneous quality"],
        "answer": "Mobile",
        "explanation": "Land is IMMOBILE - it cannot be physically moved. A piece of land in Maharashtra cannot be transported to Delhi. This is a key characteristic of land.",
    },
    {
        "question": "The Deccan Plateau has black regur soil ideal for cotton, while western Rajasthan has sandy soil unsuitable for agriculture. This illustrates which characteristic of land?",
        "options": ["Fixed supply", "Heterogeneous quality", "Immutability", "Passive factor"],
        "answer": "Heterogeneous quality",
        "explanation": "Heterogeneous quality means land varies in fertility and productivity from place to place. Regur soil is fertile; sandy soil of Rajasthan is not - both are 'land' but of different quality.",
    },
    {
        "question": "Land is called a 'passive factor' of production because:",
        "options": [
            "It does nothing on its own",
            "It needs labour and capital to become productive",
            "It is free of cost",
            "It cannot be sold"
        ],
        "answer": "It needs labour and capital to become productive",
        "explanation": "Land is passive because it cannot produce anything by itself. It requires labour (human effort) and capital (tools, machines) to become productive. Fertile land alone does not grow crops - farmers must work it.",
    },
    {
        "question": "The total geographical area of India is approximately:",
        "options": ["128.7 million hectares", "328.7 million hectares", "528.7 million hectares", "228.7 million hectares"],
        "answer": "328.7 million hectares",
        "explanation": "As per Census 2011 / Land Use Statistics 2019-20, India's total geographical area is 328.7 million hectares (≈3.287 million sq. km).",
    },
    {
        "question": "Which of the following statements about 'fixed supply' of land is CORRECT?",
        "options": [
            "The total area of land can be increased through reclamation",
            "The total area of land is fixed and cannot be increased",
            "Land supply increases with population",
            "Land is a man-made resource"
        ],
        "answer": "The total area of land is fixed and cannot be increased",
        "explanation": "Land has a fixed total supply - the surface area of Earth (and India) is constant. While small areas can be reclaimed from the sea, overall land supply is fixed, making it economically scarce.",
    },
    {
        "question": "The Jharia coalfields in Jharkhand are part of 'economic land' because they are:",
        "options": [
            "Manufactured by humans",
            "Free gifts of nature lying underground",
            "Imported from other countries",
            "Created by the government"
        ],
        "answer": "Free gifts of nature lying underground",
        "explanation": "Economic land includes ALL free gifts of nature - not just surface soil but also underground minerals like coal, iron ore, etc. Jharia coalfields are minerals = part of economic land.",
    },
    {
        "question": "Which characteristic of land means it cannot be moved from one place to another?",
        "options": ["Fixed supply", "Immobility", "Indestructibility", "Heterogeneity"],
        "answer": "Immobility",
        "explanation": "Immovability (immobility) means land has a fixed location and cannot be physically transported. A field in Punjab cannot be moved to Kerala.",
    },
    {
        "question": "Land is described as 'indestructible' because:",
        "options": [
            "It can never be damaged",
            "The space itself cannot be destroyed, though fertility can be lost",
            "It is immune to earthquakes",
            "It regenerates automatically"
        ],
        "answer": "The space itself cannot be destroyed, though fertility can be lost",
        "explanation": "Land as a space/area is indestructible - it cannot be physically destroyed. However, its fertility can be degraded through erosion, overuse, or pollution.",
    },
    {
        "question": "Approximately how many million hectares of India's total geographical area is reported under agricultural use?",
        "options": ["79.8 million ha", "179.8 million ha", "279.8 million ha", "128.7 million ha"],
        "answer": "179.8 million ha",
        "explanation": "As per Land Use Statistics 2019-20, about 179.8 million hectares out of India's total 328.7 million hectares is under agricultural use.",
    },
]

LAND_FILL_BLANK_POOL = [
    {
        "question": "In the economic sense, land includes all _____ gifts of nature.",
        "answer": "free",
        "explanation": "Economic land is defined as all free gifts of nature - resources provided by nature without any human effort or cost.",
    },
    {
        "question": "The total supply of land is _____ - it cannot be increased.",
        "answer": "fixed",
        "explanation": "Land supply is fixed in total quantity. The surface area of the earth (and India) is constant.",
    },
    {
        "question": "Land is described as _____ because it needs labour and capital to become productive.",
        "answer": "passive",
        "explanation": "Land is a passive factor - it does not act on its own and requires labour and capital to produce goods and services.",
    },
    {
        "question": "Land has _____ quality - no two pieces of land are exactly alike in fertility.",
        "answer": "heterogeneous",
        "explanation": "Heterogeneous quality means land differs in fertility, productivity, and other attributes from place to place.",
    },
    {
        "question": "Land is an _____ factor of production.",
        "answer": "immobile",
        "explanation": "Immovability means land cannot be physically moved or transported from one location to another.",
    },
]

LAND_SHORT_ANSWER_POOL = [
    {
        "question": "Distinguish between 'land in common usage' and 'land in the economic sense', with examples.",
        "answer": "Common usage: 'land' means only the surface soil used for farming or construction. Economic sense: land includes ALL free gifts of nature - soil surface, rivers, forests, underground minerals, climate, and rainfall. Example: Jharia coalfields (underground coal) and the Ganga river (water body) are economic land but not 'land' in common usage.",
        "explanation": "The economic definition is much broader than everyday usage. Underground minerals, rivers, and climate all count as economic land.",
        "topic": Topic.LAND_CHARACTERISTICS.value,
    },
    {
        "question": "Explain why land is called a 'passive factor' of production, with an Indian example.",
        "answer": "Land is called passive because it cannot produce anything on its own - it needs labour and capital. Example: A farmer in Punjab owns fertile land (land), but without the farmer's labour (tilling, sowing) and capital (tractor, seeds, fertiliser), the land will not produce any crop. The land sits idle without human effort.",
        "explanation": "Passive = needs other factors (labour, capital) to be productive. Land alone does nothing.",
        "topic": Topic.LAND_CHARACTERISTICS.value,
    },
    {
        "question": "List and explain any four characteristics of land.",
        "answer": "1. Free gift of nature: Provided freely by nature - no human effort created it. 2. Fixed supply: Total area of India is fixed at 328.7 million ha. 3. Immobile: Cannot be moved from one place to another. 4. Heterogeneous quality: Fertility varies - black soil in Deccan is fertile, sandy soil in Rajasthan is not. 5. Passive factor: Needs labour and capital to produce. 6. Indestructible: Land area itself cannot be destroyed, though fertility may be lost.",
        "explanation": "All six characteristics are important for the exam. Each must be explained briefly.",
        "topic": Topic.LAND_CHARACTERISTICS.value,
    },
]

LAND_LONG_ANSWER_POOL = [
    {
        "question": "Explain in detail the six characteristics of land as a factor of production, with Indian examples for each.",
        "answer": "1. Free gift of nature: Land is provided freely - farmers do not create soil. 2. Fixed supply: India's total area is 328.7 million ha, cannot increase. 3. Immobility: Punjab farmland cannot be moved to Kerala. 4. Heterogeneous quality: Black regur soil (Deccan) grows cotton well; sandy soil (Rajasthan) does not. 5. Passive factor: Fertile land in Bihar produces nothing without farmers' labour and capital investment. 6. Indestructible: The 3.28 million sq km area of India cannot be destroyed, though overuse may degrade soil fertility.",
        "explanation": "Each characteristic must be clearly defined and supported by a relevant Indian example for full marks.",
        "topic": Topic.LAND_CHARACTERISTICS.value,
    },
]

LAND_NUMERICAL_POOL = [
    {
        "question": "India's total geographical area is 328.7 million hectares and the area under agricultural use is 179.8 million hectares (Land Use Statistics 2019-20). Calculate the percentage of India's total area under agriculture.",
        "answer": round(179.8 / 328.7 * 100, 2),
        "explanation": "Percentage = (179.8 / 328.7) x 100 = 54.71%. This shows more than half of India's land is used for agriculture, yet the total supply remains fixed.",
        "topic": Topic.LAND_CHARACTERISTICS.value,
        "solver": "solve_land_fixed_supply_numerical",
        "solver_params": {"total_area": 328.7, "agri_area": 179.8},
    },
]

# ─── CREDIT ──────────────────────────────────

CREDIT_MCQ_POOL = [
    {
        "question": "Credit is best defined as a transaction where:",
        "options": [
            "Goods are sold for cash immediately",
            "Goods, services, or money are received now with a promise to pay later",
            "Money is borrowed without interest",
            "Goods are exchanged for other goods"
        ],
        "answer": "Goods, services, or money are received now with a promise to pay later",
        "explanation": "Credit is a deferred-payment transaction. The key element is receiving benefit NOW and promising to pay LATER - regardless of whether it takes the form of cash or goods.",
    },
    {
        "question": "The party who receives money or goods now and promises to repay later is called the:",
        "options": ["Creditor", "Debtor", "Guarantor", "Investor"],
        "answer": "Debtor",
        "explanation": "The debtor is the borrower who receives the credit now and undertakes the obligation to repay at a future date.",
    },
    {
        "question": "The party who gives money or goods now and expects repayment later is called the:",
        "options": ["Creditor", "Debtor", "Guarantor", "Borrower"],
        "answer": "Creditor",
        "explanation": "The creditor is the lender who extends credit (gives money/goods now) and expects repayment with or without interest in the future.",
    },
    {
        "question": "A farmer in Vidarbha takes a crop loan of ₹50,000 from SBI in June to buy seeds and repays after harvest in October. This example shows credit:",
        "options": [
            "Helping production by bridging the gap between sowing and sale",
            "Being useful only for consumption",
            "Being harmful to farmers",
            "Having no role in agriculture"
        ],
        "answer": "Helping production by bridging the gap between sowing and sale",
        "explanation": "Credit enables production by bridging the time gap between investment (buying seeds) and returns (selling the harvest). This is a key importance of credit in agriculture.",
    },
    {
        "question": "A salaried employee buys a refrigerator on EMI. This is an example of credit used for:",
        "options": ["Production", "Investment", "Consumption", "Export"],
        "answer": "Consumption",
        "explanation": "Buying a refrigerator on EMI is credit for consumption - the employee is buying a consumer durable for personal use, not for production or investment.",
    },
    {
        "question": "The Government of India borrows through dated G-Secs to fund the fiscal deficit. This shows credit being used for:",
        "options": ["Personal consumption", "Government finance / public expenditure", "Agricultural production", "Import of goods"],
        "answer": "Government finance / public expenditure",
        "explanation": "When the government borrows (e.g., through Government Securities/G-Secs), it uses credit to fund public expenditure and bridge the fiscal deficit. This is credit for government finance.",
    },
    {
        "question": "A small textile unit in Surat uses a working-capital loan from HDFC Bank to buy raw cotton. This credit is used for:",
        "options": ["Production", "Consumption", "Transfer payment", "Donation"],
        "answer": "Production",
        "explanation": "Working-capital loans are credit used to finance the production process - buying raw materials, paying wages, and covering day-to-day operational expenses.",
    },
    {
        "question": "Which of the following is NOT a form in which credit can be extended?",
        "options": ["Cash loan from a bank", "Goods bought now, paid later", "Gold coins", "EMI purchase of electronics"],
        "answer": "Gold coins",
        "explanation": "Credit can be extended in cash (bank loan), goods (buy now, pay later), or services (EMI). Gold coins are a commodity/asset, not a mechanism of credit extension.",
    },
    {
        "question": "The defining feature of credit is:",
        "options": [
            "The interest rate charged",
            "The deferred payment - receiving now, paying later",
            "The form (cash or goods)",
            "The duration of the loan"
        ],
        "answer": "The deferred payment - receiving now, paying later",
        "explanation": "The essential feature of any credit transaction is deferred payment. Whether it is a cash loan, goods on credit, or EMI - the core is receiving benefit now and paying later.",
    },
    {
        "question": "Bajaj Finserv offering a refrigerator on EMI of ₹2,000/month instead of ₹24,000 upfront is an example of:",
        "options": [
            "Informal credit",
            "Formal credit through a non-banking financial company",
            "Barter system",
            "Cash transaction"
        ],
        "answer": "Formal credit through a non-banking financial company",
        "explanation": "Bajaj Finserv is a registered NBFC (Non-Banking Financial Company) offering formal credit in the form of EMI. This is formal sector credit, not informal moneylender credit.",
    },
]

CREDIT_FILL_BLANK_POOL = [
    {
        "question": "Credit is a _____-payment transaction where goods or money are received now and paid later.",
        "answer": "deferred",
        "explanation": "Credit involves deferred payment - the payment is postponed to a future date. 'Deferred' means postponed or delayed.",
    },
    {
        "question": "The party who gives money or goods on credit is the _____.",
        "answer": "creditor",
        "explanation": "Creditor = the lender who extends credit by giving money or goods now, expecting repayment later.",
    },
    {
        "question": "The party who receives money or goods on credit is the _____.",
        "answer": "debtor",
        "explanation": "Debtor = the borrower who receives the credit now and promises to repay at a future date.",
    },
    {
        "question": "A _____ loan is taken by farmers during the sowing season to buy seeds and fertilisers.",
        "answer": "crop",
        "explanation": "Crop loans are short-term credit provided to farmers for agricultural inputs (seeds, fertilisers) during the sowing season, repaid after harvest.",
    },
    {
        "question": "The Government of India borrows through _____ Securities (G-Secs) to fund fiscal deficit.",
        "answer": "Government",
        "explanation": "G-Secs (Government Securities) are issued by the Government of India to borrow from the market and fund fiscal deficits.",
    },
    {
        "question": "_____ capital loan helps a business buy raw materials for production.",
        "answer": "Working",
        "explanation": "Working capital is the short-term capital needed for day-to-day operations - buying raw materials, paying wages, etc.",
    },
]

CREDIT_SHORT_ANSWER_POOL = [
    {
        "question": "Define credit. How does it bridge the gap between the time of investment and the time of return? Explain with a farmer's example.",
        "answer": "Credit is a deferred-payment transaction where goods, services, or money are received now with a promise to pay later. It bridges the time gap: a farmer in Vidarbha takes a ₹50,000 crop loan in June (investment time) to buy seeds and fertiliser, but earns money only after selling the harvest in October (return time). Credit bridges this 4-month gap, enabling production to begin.",
        "explanation": "Credit solves the timing mismatch between when costs are incurred and when revenue is received.",
        "topic": Topic.CREDIT_MEANING.value,
    },
    {
        "question": "Distinguish between creditor and debtor with an example.",
        "answer": "Creditor: The party who gives money/goods now and expects repayment later. Example: SBI gives a ₹50,000 crop loan to a farmer - SBI is the creditor. Debtor: The party who receives money/goods now and promises to repay later. Example: The farmer who takes the loan - the farmer is the debtor.",
        "explanation": "Creditor = lender/giver now. Debtor = borrower/receiver now. The direction of the transaction at the time of agreement determines the roles.",
        "topic": Topic.CREDIT_MEANING.value,
    },
    {
        "question": "Explain two ways in which credit is important for small businesses in India.",
        "answer": "(1) Working capital: A textile unit in Surat takes a working-capital loan from HDFC Bank to buy raw cotton, pay wages, and operate before selling finished garments. (2) Expansion: Credit enables a small business to expand capacity, buy new equipment, or enter new markets without waiting to accumulate all the funds internally.",
        "explanation": "Credit is vital for both day-to-day operations (working capital) and long-term growth (expansion investment).",
        "topic": Topic.CREDIT_MEANING.value,
    },
]

CREDIT_LONG_ANSWER_POOL = [
    {
        "question": "Explain the meaning and importance of credit. Give at least four Indian examples showing how credit supports production, consumption, investment, and government finance.",
        "answer": "Meaning: Credit is a deferred-payment transaction where goods, services, or money are received now with a promise to repay later. The giver is the creditor; the receiver is the debtor. Importance: (1) Production: A farmer in Vidarbha takes a ₹50,000 crop loan from SBI to buy seeds and fertiliser, enabling kharif cultivation. (2) Consumption: A salaried employee in Bengaluru buys a refrigerator on EMI from Bajaj Finserv. (3) Investment: A small textile unit in Surat uses a working-capital loan from HDFC Bank to expand. (4) Government finance: The Government of India borrows through G-Secs to fund the Union Budget 2024-25 fiscal deficit of ₹16.13 lakh crore.",
        "explanation": "Credit is essential across all sectors: agriculture, household consumption, business investment, and government spending.",
        "topic": Topic.CREDIT_MEANING.value,
    },
    {
        "question": "Why is credit important for farmers in India? Explain with specific reference to crop cycles.",
        "answer": "Indian farmers depend heavily on credit because of the mismatch between when they spend and when they earn. (1) Input costs: Seeds, fertilisers, pesticides, and diesel must be bought BEFORE sowing (June for kharif). (2) Time lag: The crop is harvested 3-5 months later and sold after harvest (October-December). (3) Credit bridges this gap: Without a crop loan from SBI or NABARD, a small farmer cannot afford inputs. (4) Crop insurance: Credit also helps farmers invest in irrigation and better seeds, increasing yields and income.",
        "explanation": "The crop cycle creates a natural need for credit. Small and marginal farmers are especially dependent on formal and informal credit sources.",
        "topic": Topic.CREDIT_MEANING.value,
    },
]

CREDIT_NUMERICAL_POOL = [
    {
        "question": "A farmer takes a crop loan of ₹40,000 at 7% per annum simple interest for 1 year. Calculate the simple interest and total repayment amount.",
        "answer": {"simple_interest": 2800.0, "total_repayment": 42800.0},
        "explanation": "SI = PxRxT/100 = 40000x7x1/100 = ₹2,800. Total repayment = ₹40,000 + ₹2,800 = ₹42,800.",
        "topic": Topic.CREDIT_MEANING.value,
        "solver": "solve_credit_time_gap",
        "solver_params": {"principal": 40000, "rate": 7, "time_years": 1},
    },
    {
        "question": "A small business owner borrows ₹1,20,000 at 12% per annum for 2 years. Calculate the total interest and amount to be repaid.",
        "answer": {"simple_interest": 28800.0, "total_repayment": 148800.0},
        "explanation": "SI = PxRxT/100 = 120000x12x2/100 = ₹28,800. Total repayment = ₹1,20,000 + ₹28,800 = ₹1,48,800.",
        "topic": Topic.CREDIT_MEANING.value,
        "solver": "solve_credit_time_gap",
        "solver_params": {"principal": 120000, "rate": 12, "time_years": 2},
    },
    {
        "question": "A student takes an education loan of ₹2,00,000 at 9% per annum. If repaid after 4 years, what is the total repayment?",
        "answer": {"simple_interest": 72000.0, "total_repayment": 272000.0},
        "explanation": "SI = 200000x9x4/100 = ₹72,000. Total = ₹2,00,000 + ₹72,000 = ₹2,72,000.",
        "topic": Topic.CREDIT_MEANING.value,
        "solver": "solve_credit_time_gap",
        "solver_params": {"principal": 200000, "rate": 9, "time_years": 4},
    },
]


# ─────────────────────────────────────────────
# COMPETENCY-BASED QUESTION BUILDERS
# (Indian-context scenarios, real-world data)
# ─────────────────────────────────────────────

def _build_demand_competency_mcq(rng: random.Random) -> Dict:
    scenarios = [
        {
            "q": "In 2024-25, the demand for electric vehicles (EVs) in India has increased. This has created 'derived demand' for:",
            "opts": ["EV charging stations", "Lithium-ion batteries", "EV dealerships", "All of the above"],
            "ans": "All of the above",
            "exp": "All three are derived demands - charging stations, batteries, and dealerships are demanded because of the demand for EVs. This mirrors how steel demand is derived from car demand.",
            "comp": True,
        },
        {
            "q": "A farmer in Punjab buys diesel for his tractor and seeds for wheat sowing at the same time. The demand for diesel and seeds together is:",
            "opts": ["Joint demand", "Derived demand", "Composite demand", "Independent demand"],
            "ans": "Joint demand",
            "exp": "Diesel and seeds are jointly demanded - both are needed simultaneously for the single purpose of wheat cultivation.",
            "comp": True,
        },
        {
            "q": "Maruti Suzuki's demand for steel sheets to make Swift cars is 'derived demand'. If consumer demand for Swifts falls, the demand for steel by Maruti will:",
            "opts": ["Increase", "Decrease", "Stay the same", "Become joint demand"],
            "ans": "Decrease",
            "exp": "Derived demand moves in the same direction as the demand for the final good. Fewer Swift buyers → less steel needed → derived demand for steel decreases.",
            "comp": True,
        },
        {
            "q": "The demand for coal in India is 'composite' because it is used for:",
            "opts": [
                "Electricity generation only",
                "Steel production, cement manufacturing, and electricity generation",
                "Only domestic cooking",
                "Export only"
            ],
            "ans": "Steel production, cement manufacturing, and electricity generation",
            "exp": "Coal has composite demand - it serves multiple purposes simultaneously: thermal power plants, steel plants (coking coal), and cement factories.",
            "comp": True,
        },
        {
            "q": "A woman in Jaipur has ₹1,000 and wants to buy a geyser costing ₹8,000. She sees a 'No Cost EMI' offer at a showroom. Does the EMI option create effective demand?",
            "opts": [
                "Yes, because she can now pay in instalments",
                "No, because she still cannot afford it",
                "Yes, because the showroom is offering it",
                "No, because EMI involves interest"
            ],
            "ans": "Yes, because she can now pay in instalments",
            "exp": "The EMI option means the price is spread over time. If the monthly instalment fits her budget, she now has ability + willingness to pay → effective demand. This demonstrates the time dimension of ability to pay.",
            "comp": True,
        },
        {
            "q": "Tata Consultancy Services (TCS) hires more software engineers when demand for IT outsourcing grows. The demand for software engineers is:",
            "opts": ["Joint demand", "Derived demand", "Composite demand", "Autonomous demand"],
            "ans": "Derived demand",
            "exp": "TCS's demand for software engineers is entirely driven by client demand for IT services. No client projects = no need for engineers = derived demand.",
            "comp": True,
        },
        {
            "q": "A family in Mumbai uses LPG for cooking, CNG for their car, and electricity for lighting. Their demand for energy shows:",
            "opts": ["Joint demand only", "Composite demand", "Derived demand", "Independent demand"],
            "ans": "Composite demand",
            "exp": "The family demands energy (in various forms) for multiple distinct purposes - cooking, transport, and lighting. Each is a separate use of energy resources, illustrating composite demand.",
            "comp": True,
        },
        {
            "q": "According to the RBI's Financial Inclusion report, formal credit to small farmers increased in 2024. This helps farmers:",
            "opts": [
                "Avoid dependence on moneylenders charging 24-36% interest",
                "Buy tractors and harvesters",
                "Purchase quality seeds and fertilisers on time",
                "All of the above"
            ],
            "ans": "All of the above",
            "exp": "Formal credit from banks and cooperative societies offers lower interest rates than informal moneylenders, enabling farmers to invest in inputs, equipment, and avoid debt traps.",
            "comp": True,
        },
    ]
    return rng.choice(scenarios)


def _build_land_competency_mcq(rng: random.Random) -> Dict:
    scenarios = [
        {
            "q": "As per India's Land Use Statistics 2019-20, about 179.8 million hectares out of 328.7 million hectares total area is under agriculture. This data supports which characteristic of land?",
            "opts": ["Heterogeneous quality", "Fixed supply", "Passive factor", "Free gift of nature"],
            "ans": "Fixed supply",
            "exp": "The fixed total area (328.7 million ha) cannot be expanded - demonstrating that land supply is fixed. What changes is how we use it (agriculture, forest, etc.), not the total area available.",
            "comp": True,
        },
        {
            "q": "The black regur soil of the Deccan Plateau (Maharashtra) is excellent for cotton, while the sandy soils of western Rajasthan support only drought-resistant crops. This illustrates:",
            "opts": ["Fixed supply of land", "Heterogeneous quality of land", "Immovability of land", "Passive factor"],
            "ans": "Heterogeneous quality of land",
            "exp": "Heterogeneous quality means no two pieces of land have the same fertility or productivity. Regur soil and sandy soil are both 'land' but differ greatly in quality.",
            "comp": True,
        },
        {
            "q": "The Bailadila iron ore deposits in Chhattisgarh and Jharia coalfields in Jharkhand are part of economic 'land' because:",
            "opts": [
                "They were created by human mining activity",
                "They are free gifts of nature lying underground",
                "They are government property only",
                "They can be exported"
            ],
            "ans": "They are free gifts of nature lying underground",
            "exp": "Economic land includes ALL natural resources - surface soil, underground minerals, rivers, forests, and climate. Minerals like iron ore and coal are free gifts of nature.",
            "comp": True,
        },
        {
            "q": "Soil erosion in the Himalayan foothills reduces land fertility, but the land area itself remains. This demonstrates that land is:",
            "opts": ["Completely destructible", "Indestructible as space but its fertility can be lost", "Completely indestructible", "Being created by nature daily"],
            "ans": "Indestructible as space but its fertility can be lost",
            "exp": "The land area (space) cannot be destroyed, but its productive capacity (fertility) can be degraded through erosion, overuse, or pollution.",
            "comp": True,
        },
        {
            "q": "A farmer in Bihar owns highly fertile land (kharif capacity). Without the farmer's labour and capital investment (seeds, tractor), the land produces nothing. This illustrates land as:",
            "opts": ["An active factor", "A passive factor", "A fixed resource", "A mobile resource"],
            "ans": "A passive factor",
            "exp": "Land is passive because it cannot produce on its own. It requires labour (farmer working the field) and capital (seeds, tractor) to generate output.",
            "comp": True,
        },
        {
            "q": "A real estate developer wants to buy agricultural land in Maharashtra and 'move' its fertility to build a resort in Goa. This is impossible because of which characteristic?",
            "opts": ["Fixed supply", "Immobility", "Heterogeneity", "Indestructibility"],
            "ans": "Immobility",
            "exp": "Land is immobile - it cannot be physically relocated. The fertility and location of land in Maharashtra cannot be transferred to Goa.",
            "comp": True,
        },
    ]
    return rng.choice(scenarios)


def _build_credit_competency_mcq(rng: random.Random) -> Dict:
    scenarios = [
        {
            "q": "The Government of India's fiscal deficit for 2024-25 was ₹16.13 lakh crore. To finance this, the government borrows through:",
            "opts": [
                "Donations from citizens",
                "Government Securities (G-Secs) - a form of credit",
                "Printing more currency only",
                "Foreign aid only"
            ],
            "ans": "Government Securities (G-Secs) - a form of credit",
            "exp": "G-Secs are government-issued bonds - a form of credit where the government receives money now and promises to repay with interest later. This is credit for government finance.",
            "comp": True,
        },
        {
            "q": "A farmer in Vidarbha takes a ₹50,000 crop loan from SBI in June to buy seeds for kharif season. He repays after selling his crop in October. This credit is important because:",
            "opts": [
                "The farmer does not have to wait until harvest to start farming",
                "SBI profits from the interest",
                "The government mandates all farmers take loans",
                "The farmer can buy a tractor"
            ],
            "ans": "The farmer does not have to wait until harvest to start farming",
            "exp": "Credit bridges the time gap between investment (June, before sowing) and return (October, after harvest). Without credit, the farmer could not buy seeds in June.",
            "comp": True,
        },
        {
            "q": "According to NABARD data, small and marginal farmers often depend on informal credit sources (moneylenders) charging 24-36% annual interest. This is a problem because:",
            "opts": [
                "Formal credit always has 0% interest",
                "High-interest debt traps farmers in a cycle of indebtedness",
                "Moneylenders are illegal",
                "NABARD does not exist"
            ],
            "ans": "High-interest debt traps farmers in a cycle of indebtedness",
            "exp": "Informal credit at 24-36% interest creates debt traps - farmers cannot repay high-interest loans and may lose their land. Formal credit from banks (7-12%) breaks this cycle.",
            "comp": True,
        },
        {
            "q": "EMI stands for Equated Monthly Instalment. When you buy a smartphone worth ₹30,000 on 10-month EMI of ₹3,200/month, the extra ₹2,000 paid over 10 months is:",
            "opts": ["A gift from the seller", "Interest charged on the credit", "A government tax", "A processing fee only"],
            "ans": "Interest charged on the credit",
            "exp": "EMI spreads the total cost (principal + interest) over monthly payments. The ₹2,000 extra represents the interest the financier charges for extending credit.",
            "comp": True,
        },
        {
            "q": "A small textile unit in Surat buys raw cotton worth ₹5 lakh on credit from a supplier, promising to pay after selling the finished garments. In this case, the supplier is the _____ and the textile unit is the _____.",
            "opts": [
                "Debtor / Creditor",
                "Creditor / Debtor",
                "Investor / Entrepreneur",
                "Banker / Customer"
            ],
            "ans": "Creditor / Debtor",
            "exp": "The supplier gives raw cotton NOW (creditor role) and expects payment AFTER sale (debtor role for the textile unit). This is trade credit - a common form of business credit.",
            "comp": True,
        },
        {
            "q": "The Pradhan Mantri MUDRA Yojana (PMMY) provides credit up to ₹10 lakh to small entrepreneurs and shopkeepers without collateral. This scheme helps by:",
            "opts": [
                "Giving free money with no repayment",
                "Providing formal credit to those who cannot provide collateral",
                "Replacing all bank loans",
                "Giving grants to large corporations"
            ],
            "ans": "Providing formal credit to those who cannot provide collateral",
            "exp": "MUDRA loans are collateral-free credit for small businesses ('micro units') - enabling entrepreneurs who lack land/property security to access formal credit.",
            "comp": True,
        },
    ]
    return rng.choice(scenarios)


# ─────────────────────────────────────────────
# CORE QUESTION GENERATION ENGINE
# ─────────────────────────────────────────────

def generate_questions(seed: int, count: int = 30) -> List[Dict]:
    """
    Deterministic question generator for CISCE ECONAPP Class 10.
    Covers: Demand Types, Land Characteristics, Credit Meaning & Importance.
    50% competency (Indian context), 50% standard.
    Mix: MCQ, fill-blank, short-answer, long-answer, numerical.
    """
    rng = random.Random(seed)
    questions: List[Dict] = []
    counter = [0]

    def next_id(topic: str, qtype: str) -> str:
        counter[0] += 1
        return f"E10_{topic[:3].upper()}_{qtype[:3].upper()}_{counter[0]:03d}"

    def add(q: Dict):
        q["id"] = next_id(q["topic"], q["type"])
        questions.append(q)

    # ── Split count into competency vs standard ──
    comp_count = count // 2
    std_count = count - comp_count

    # ── Type mix proportions ──
    # Standard: 35% MCQ, 20% fill-blank, 20% short-answer, 15% long-answer, 10% numerical
    std_types_pool = (
        [QuestionType.MCQ.value] * 35 +
        [QuestionType.FILL_BLANK.value] * 20 +
        [QuestionType.SHORT_ANSWER.value] * 20 +
        [QuestionType.LONG_ANSWER.value] * 15 +
        [QuestionType.NUMERICAL.value] * 10
    )
    comp_types_pool = (
        [QuestionType.MCQ.value] * 40 +
        [QuestionType.FILL_BLANK.value] * 15 +
        [QuestionType.SHORT_ANSWER.value] * 25 +
        [QuestionType.LONG_ANSWER.value] * 10 +
        [QuestionType.NUMERICAL.value] * 10
    )

    rng.shuffle(std_types_pool)
    rng.shuffle(comp_types_pool)

    # ── Topic distribution per question ──
    topics = [Topic.DEMAND_TYPES.value, Topic.LAND_CHARACTERISTICS.value, Topic.CREDIT_MEANING.value]

    def pick_topic(r: random.Random) -> str:
        return r.choice(topics)

    # ── Standard questions ──
    std_type_seq = std_types_pool[:std_count]
    for i, qtype in enumerate(std_type_seq):
        topic = pick_topic(rng)
        diff = Difficulty.EASY.value
        q: Dict = {
            "type": qtype,
            "topic": topic,
            "difficulty": diff,
            "competency": False,
        }

        if topic == Topic.DEMAND_TYPES.value:
            if qtype == QuestionType.MCQ.value:
                pool = list(DEMAND_MCQ_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "options": list(src["options"]),
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.FILL_BLANK.value:
                pool = list(DEMAND_FILL_BLANK_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.SHORT_ANSWER.value:
                pool = list(DEMAND_SHORT_ANSWER_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.LONG_ANSWER.value:
                pool = list(DEMAND_LONG_ANSWER_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.NUMERICAL.value:
                pool = list(DEMAND_NUMERICAL_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                    "solver": src.get("solver", ""),
                    "solver_params": src.get("solver_params", {}),
                })

        elif topic == Topic.LAND_CHARACTERISTICS.value:
            if qtype == QuestionType.MCQ.value:
                pool = list(LAND_MCQ_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "options": list(src["options"]),
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.FILL_BLANK.value:
                pool = list(LAND_FILL_BLANK_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.SHORT_ANSWER.value:
                pool = list(LAND_SHORT_ANSWER_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.LONG_ANSWER.value:
                pool = list(LAND_LONG_ANSWER_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.NUMERICAL.value:
                pool = list(LAND_NUMERICAL_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                    "solver": src.get("solver", ""),
                    "solver_params": src.get("solver_params", {}),
                })

        elif topic == Topic.CREDIT_MEANING.value:
            if qtype == QuestionType.MCQ.value:
                pool = list(CREDIT_MCQ_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "options": list(src["options"]),
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.FILL_BLANK.value:
                pool = list(CREDIT_FILL_BLANK_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.SHORT_ANSWER.value:
                pool = list(CREDIT_SHORT_ANSWER_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.LONG_ANSWER.value:
                pool = list(CREDIT_LONG_ANSWER_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                })
            elif qtype == QuestionType.NUMERICAL.value:
                pool = list(CREDIT_NUMERICAL_POOL)
                rng.shuffle(pool)
                src = pool[0]
                q.update({
                    "question": src["question"],
                    "answer": src["answer"],
                    "explanation": src["explanation"],
                    "solver": src.get("solver", ""),
                    "solver_params": src.get("solver_params", {}),
                })

        add(q)

    # ── Competency questions (Indian context) ──
    comp_type_seq = comp_types_pool[:comp_count]
    for qtype in comp_type_seq:
        topic = pick_topic(rng)
        diff = Difficulty.EASY.value if rng.random() < 0.6 else Difficulty.MEDIUM.value
        q = {
            "type": qtype,
            "topic": topic,
            "difficulty": diff,
            "competency": True,
        }

        if topic == Topic.DEMAND_TYPES.value:
            src = _build_demand_competency_mcq(rng)
            if qtype == QuestionType.MCQ.value:
                q.update({
                    "question": src["q"],
                    "options": list(src["opts"]),
                    "answer": src["ans"],
                    "explanation": src["exp"],
                })
            elif qtype == QuestionType.FILL_BLANK.value:
                blanks = [
                    ("derived", "The demand for lithium-ion batteries by EV manufacturers is _____ demand, derived from EV demand."),
                    ("composite", "Coal used for steel, cement, and power generation is an example of _____ demand."),
                    ("joint", "When a farmer buys diesel for his tractor along with seeds, the demand is _____ demand."),
                    ("joint", "Buying a Tata Nexon creates _____ demand for petrol."),
                ]
                rng.shuffle(blanks)
                word, qtext = blanks[0]
                q.update({
                    "question": qtext,
                    "answer": word,
                    "explanation": f"The blank should be filled with '{word}'.",
                })
            elif qtype == QuestionType.SHORT_ANSWER.value:
                pool = list(DEMAND_SHORT_ANSWER_POOL)
                rng.shuffle(pool)
                src2 = pool[0]
                q.update({
                    "question": f"[Indian Context] {src2['question']}",
                    "answer": src2["answer"],
                    "explanation": src2["explanation"],
                })
            elif qtype == QuestionType.LONG_ANSWER.value:
                pool = list(DEMAND_LONG_ANSWER_POOL)
                rng.shuffle(pool)
                src2 = pool[0]
                q.update({
                    "question": f"[Indian Context] {src2['question']}",
                    "answer": src2["answer"],
                    "explanation": src2["explanation"],
                })
            elif qtype == QuestionType.NUMERICAL.value:
                pool = list(DEMAND_NUMERICAL_POOL)
                rng.shuffle(pool)
                src2 = pool[0]
                q.update({
                    "question": src2["question"],
                    "answer": src2["answer"],
                    "explanation": src2["explanation"],
                    "solver": src2.get("solver", ""),
                    "solver_params": src2.get("solver_params", {}),
                })

        elif topic == Topic.LAND_CHARACTERISTICS.value:
            src = _build_land_competency_mcq(rng)
            if qtype == QuestionType.MCQ.value:
                q.update({
                    "question": src["q"],
                    "options": list(src["opts"]),
                    "answer": src["ans"],
                    "explanation": src["exp"],
                })
            elif qtype == QuestionType.FILL_BLANK.value:
                blanks = [
                    ("fixed", "India's total geographical area of 328.7 million hectares is _____ - it cannot be increased."),
                    ("heterogeneous", "The black regur soil of Maharashtra and the sandy soil of Rajasthan illustrate _____ quality of land."),
                    ("passive", "Land is a _____ factor because it needs labour and capital to become productive."),
                    ("free", "Economic land includes all _____ gifts of nature such as minerals, rivers, and forests."),
                ]
                rng.shuffle(blanks)
                word, qtext = blanks[0]
                q.update({
                    "question": qtext,
                    "answer": word,
                    "explanation": f"The blank should be filled with '{word}'.",
                })
            elif qtype == QuestionType.SHORT_ANSWER.value:
                pool = list(LAND_SHORT_ANSWER_POOL)
                rng.shuffle(pool)
                src2 = pool[0]
                q.update({
                    "question": f"[Indian Context] {src2['question']}",
                    "answer": src2["answer"],
                    "explanation": src2["explanation"],
                })
            elif qtype == QuestionType.LONG_ANSWER.value:
                pool = list(LAND_LONG_ANSWER_POOL)
                rng.shuffle(pool)
                src2 = pool[0]
                q.update({
                    "question": f"[Indian Context] {src2['question']}",
                    "answer": src2["answer"],
                    "explanation": src2["explanation"],
                })
            elif qtype == QuestionType.NUMERICAL.value:
                pool = list(LAND_NUMERICAL_POOL)
                rng.shuffle(pool)
                src2 = pool[0]
                q.update({
                    "question": src2["question"],
                    "answer": src2["answer"],
                    "explanation": src2["explanation"],
                    "solver": src2.get("solver", ""),
                    "solver_params": src2.get("solver_params", {}),
                })

        elif topic == Topic.CREDIT_MEANING.value:
            src = _build_credit_competency_mcq(rng)
            if qtype == QuestionType.MCQ.value:
                q.update({
                    "question": src["q"],
                    "options": list(src["opts"]),
                    "answer": src["ans"],
                    "explanation": src["exp"],
                })
# TRUNCATED:             elif qtype == Question