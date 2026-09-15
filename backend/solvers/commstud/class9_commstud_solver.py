"""
CISCE Class 9 Commercial Studies — Complete Solver & Question Generator
Covers: c9_commstud_001 | c9_commstud_015 | c9_commstud_019
"""

import random
import math
import re
import json
from fractions import Fraction
from typing import Dict, List, Optional, Tuple, Any
from dataclasses import dataclass, field

# ─────────────────────────────────────────────────────────────
# DETERMINISTIC SEED (override via generate_questions(seed, n))
# ─────────────────────────────────────────────────────────────
random.seed(2024)

# ═══════════════════════════════════════════════════════════════
#  VERIFICATION UTILITIES
# ═══════════════════════════════════════════════════════════════

def verify_mcq(selected: str, correct: str) -> Dict:
    return {
        "correct": selected == correct,
        "selected": selected,
        "expected": correct
    }

def verify_fill_blank(user_answer: str, correct_answers: List[str], fuzzy: bool = True) -> Dict:
    u = user_answer.strip().lower()
    passed = any(u == ca.strip().lower() for ca in correct_answers)
    return {"correct": passed, "user_answer": user_answer, "expected": correct_answers}

def verify_short_answer(user_answer: str, keywords: List[str], min_matches: int = 2) -> Dict:
    u = user_answer.strip().lower()
    matched = [kw for kw in keywords if kw.lower() in u]
    passed = len(matched) >= min_matches
    return {
        "correct": passed,
        "matched_keywords": matched,
        "keywords_expected": keywords
    }

def verify_numerical(user_value: float, expected_value: float, tolerance: float = 0.01) -> Dict:
    denom = max(abs(expected_value), 1e-10)
    rel_err = abs(user_value - expected_value) / denom
    return {
        "correct": rel_err <= tolerance,
        "user_value": user_value,
        "expected_value": expected_value,
        "relative_error": round(rel_err, 6)
    }

# ═══════════════════════════════════════════════════════════════
#  QUESTION BANK
#  Fields: id | node_id | type | question | options | answer |
#          explanation | difficulty | topic | competency |
#          indian_context | verification_fn
# ═══════════════════════════════════════════════════════════════

QUESTION_BANK: List[Dict] = [
    # ── c9_commstud_001: Commercial vs Non-Commercial ──────────

    {"id": "comm-001-mcq-01", "node_id": "c9_commstud_001", "type": "mcq",
     "difficulty": "Easy", "topic": "Commercial vs Non-Commercial",
     "competency": False,
     "question": "Rahul's mother prepares breakfast every morning for her family without charging any money. This activity is classified as:",
     "options": {
         "A": "A commercial activity",
         "B": "A non-commercial activity",
         "C": "An economic activity",
         "D": "A manufacturing activity"
     },
     "answer": "B",
     "explanation": (
         "This is a NON-COMMERCIAL activity. The key distinction is the absence of a PROFIT MOTIVE. "
         "While cooking for the family is a productive/useful activity, it is performed without any "
         "intention of earning a profit or remuneration. A commercial activity requires selling goods "
         "or services for profit. An Indian example of non-commercial activity: a grandmother telling "
         "stories to her grandchildren. An example of a commercial activity: A halwai selling jalebis "
         "at a shop in Jaipur."
     )},

    {"id": "comm-001-mcq-02", "node_id": "c9_commstud_001", "type": "mcq",
     "difficulty": "Easy", "topic": "Commercial vs Non-Commercial",
     "competency": False,
     "question": "Priya works as a software engineer at TCS in Hyderabad and draws a monthly salary of Rs. 45,000. Her employment at TCS is an example of:",
     "options": {
         "A": "A non-economic activity",
         "B": "A commercial activity",
         "C": "A non-commercial activity",
         "D": "A purely domestic activity"
     },
     "answer": "B",
     "explanation": (
         "Priya's employment at TCS is a COMMERCIAL ACTIVITY. Key reasons: (1) TCS provides software "
         "services for a fee — there is a profit motive; (2) Priya is paid a salary — she receives "
         "remuneration; (3) The activity contributes to economic output measured in GDP. It is NOT "
         "non-commercial because money is exchanged. It is NOT non-economic because it is productive "
         "and remunerated. India's IT sector (TCS, Infosys, Wipro) employs over 5 million people and "
         "contributes significantly to the economy."
     )},

    {"id": "comm-001-mcq-03", "node_id": "c9_commstud_001", "type": "mcq",
     "difficulty": "Medium", "topic": "Commercial vs Non-Commercial",
     "competency": True,
     "question": (
         "A government hospital in a small town in Uttar Pradesh provides free treatment to all patients "
         "irrespective of their ability to pay. The hospital's activities are best described as:"
     ),
     "options": {
         "A": "Commercial activities with high profit margins",
         "B": "Non-commercial activities (no profit motive)",
         "C": "Manufacturing activities",
         "D": "Non-economic activities"
     },
     "answer": "B",
     "explanation": (
         "The government hospital's activities are NON-COMMERCIAL because there is NO PROFIT MOTIVE — "
         "treatment is given free. This is an Indian-context competency example: AIIMS New Delhi, "
         "PGIMER Chandigarh, and district hospitals across UP provide free or subsidised healthcare as "
         "a public welfare service. They are funded by tax revenue, not patient fees. This distinguishes "
         "them from private hospitals like Apollo or Fortis, which are commercial. Note: they ARE "
         "economic activities (they employ staff and use resources) — the term 'non-commercial' refers "
         "specifically to the absence of a profit motive, NOT the absence of economic value."
     )},

    {"id": "comm-001-mcq-04", "node_id": "c9_commstud_001", "type": "mcq",
     "difficulty": "Medium", "topic": "Commercial vs Non-Commercial",
     "competency": True,
     "question": (
         "Mr. Sharma runs a small kirana shop in Mumbai selling groceries to local customers. "
         "He buys goods for Rs. 10,000 and sells them for Rs. 13,000 per month. His shop is a:"
     ),
     "options": {
         "A": "Non-commercial activity",
         "B": "Commercial activity",
         "C": "Non-economic activity",
         "D": "Social service activity"
     },
     "answer": "B",
     "explanation": (
         "Mr. Sharma's kirana shop is a COMMERCIAL ACTIVITY because: (1) Profit motive exists — he "
         "buys at Rs. 10,000 and sells at Rs. 13,000, earning Rs. 3,000 profit; (2) He sells goods to "
         "customers for money; (3) The activity contributes to economic activity. India has over 9 "
         "million kirana stores, the world's largest retail network, all driven by a profit motive. "
         "Contrast: if Mr. Sharma gave away groceries free to his neighbours, it would be non-commercial."
     )},

    {"id": "comm-001-fill-01", "node_id": "c9_commstud_001", "type": "fill_blank",
     "difficulty": "Easy", "topic": "Commercial vs Non-Commercial",
     "competency": False,
     "question": "An activity undertaken with the primary aim of earning a profit is called a _______.",
     "options": None,
     "answer": ["commercial activity", "commercial"],
     "explanation": (
         "A COMMERCIAL ACTIVITY is any activity undertaken with the primary aim of earning a PROFIT. "
         "Examples in India: selling snacks at a chaat stall in Delhi, driving an Ola/Uber taxi in "
         "Bangalore, selling handicrafts at Dilli Haat. The profit motive distinguishes commercial from "
         "non-commercial activities."
     )},

    {"id": "comm-001-fill-02", "node_id": "c9_commstud_001", "type": "fill_blank",
     "difficulty": "Easy", "topic": "Commercial vs Non-Commercial",
     "competency": False,
     "question": "Activities undertaken without any profit motive are called _______ activities.",
     "options": None,
     "answer": ["non-commercial", "non commercial"],
     "explanation": (
         "NON-COMMERCIAL ACTIVITIES are performed without any intention of earning a profit. Examples: "
         "a housewife cooking for family; a teacher teaching her own child at home; blood donation; "
         "volunteering at an NGO. These activities create social value but lack the profit motive "
         "central to commercial activity."
     )},

    {"id": "comm-001-fill-03", "node_id": "c9_commstud_001", "type": "fill_blank",
     "difficulty": "Medium", "topic": "Commercial vs Non-Commercial",
     "competency": True,
     "question": (
         "A farmer selling his crop produce at the local APMC (Agricultural Produce Market Committee) "
         "mandi in Maharashtra is engaged in a _______ activity."
     ),
     "options": None,
     "answer": ["commercial", "commercial activity"],
     "explanation": (
         "The farmer's sale at the APMC mandi is a COMMERCIAL ACTIVITY. He sells his produce (onions, "
         "cotton, grapes) to earn money and make a profit. India has 2,477 APMC mandis across states "
         "where farmers transact with traders. APMC acts ensure fair prices through minimum support "
         "prices (MSP) announced by the Government of India, e.g., MSP for wheat at Rs. 2,275/quintal "
         "(2024-25)."
     )},

    {"id": "comm-001-fill-04", "node_id": "c9_commstud_001", "type": "fill_blank",
     "difficulty": "Medium", "topic": "Commercial vs Non-Commercial",
     "competency": True,
     "question": (
         "When the SAME teacher teaches students in school for a salary, the activity is commercial; "
         "but when she teaches her own child at home for no payment, the activity is _______."
     ),
     "options": None,
     "answer": ["non-commercial", "non commercial", "non-commercial activity"],
     "explanation": (
         "Teaching her own child at home is a NON-COMMERCIAL ACTIVITY — no payment is received. This "
         "example highlights that the same skill (teaching) can be either commercial or non-commercial "
         "depending on the MOTIVE. Teaching at a school like Delhi Public School for a salary is "
         "commercial (it is an economic activity with remuneration). The distinction is the profit/"
         "payment motive, not the nature of the work itself."
     )},

    {"id": "comm-001-short-01", "node_id": "c9_commstud_001", "type": "short_answer",
     "difficulty": "Easy", "topic": "Commercial vs Non-Commercial",
     "competency": False,
     "question": "Define a commercial activity in your own words. Give one Indian example.",
     "options": None,
     "answer": "commercial activity: profit motive, selling goods/services for profit; e.g., Reliance Retail",
     "explanation": "Commercial activity = activity undertaken for profit, e.g., Tata Motors manufacturing cars.",
     "keywords": ["profit", "commercial", "sell", "goods", "services", "money"],
     "min_keywords": 2},

    {"id": "comm-001-short-02", "node_id": "c9_commstud_001", "type": "short_answer",
     "difficulty": "Medium", "topic": "Commercial vs Non-Commercial",
     "competency": True,
     "question": (
         "A social worker visits rural villages in Bihar and teaches children to read and write "
         "without accepting any payment. Is this activity economic, non-economic, commercial, or "
         "non-commercial? Justify your answer in two sentences."
     ),
     "options": None,
     "answer": "economic non-commercial: creates social value, no profit motive",
     "explanation": (
         "The activity is ECONOMIC (it uses resources, time, skill — productive) but NON-COMMERCIAL "
         "because there is NO PROFIT MOTIVE. The social worker does not receive payment. This is "
         "analogous to a parent teaching a child or a doctor running a free health camp in a Bihar "
         "village. Economic ≠ commercial — all commercial activities are economic, but not all "
         "economic activities are commercial."
     ),
     "keywords": ["non-commercial", "economic", "profit", "no payment", "social", "motive"],
     "min_keywords": 2},

    {"id": "comm-001-short-03", "node_id": "c9_commstud_001", "type": "short_answer",
     "difficulty": "Easy", "topic": "Commercial vs Non-Commercial",
     "competency": False,
     "question": "State the main factor that distinguishes a commercial activity from a non-commercial activity.",
     "options": None,
     "answer": "profit motive",
     "explanation": (
         "The PROFIT MOTIVE is the single most important distinguishing factor. A commercial activity "
         "is driven by the desire to earn a profit, while a non-commercial activity is undertaken "
         "without any such intention."
     ),
     "keywords": ["profit", "motive", "profit motive"],
     "min_keywords": 1},

    {"id": "comm-001-long-01", "node_id": "c9_commstud_001", "type": "long_answer",
     "difficulty": "Medium", "topic": "Commercial vs Non-Commercial",
     "competency": True,
     "question": (
         "Differentiate between commercial and non-commercial activities on the basis of: "
         "(a) Motive, (b) Source of income, (c) Outcome, and (d) Example from India. "
         "Give two Indian examples of each."
     ),
     "options": None,
     "answer": (
         "Four differences: (1) Motive — commercial = profit; non-commercial = no profit motive. "
         "(2) Source of income — commercial = sale revenue; non-commercial = donations/gifts/no income. "
         "(3) Outcome — commercial = profit; non-commercial = social welfare/personal satisfaction. "
         "Examples commercial: Tata Motors, Reliance Jio. Examples non-commercial: AIIMS free treatment, "
         "teaching own child at home."
     ),
     "explanation": (
         "FOUR KEY DIFFERENCES (Indian context):\n"
         "1. Motive: Commercial → earn profit; Non-commercial → no profit motive (welfare/service).\n"
         "2. Source of Income: Commercial → revenue from sales (e.g., MRF tyres sold to customers); "
         "Non-commercial → donations, grants, or no income (e.g., free tuition by an NGO in West Bengal).\n"
         "3. Outcome: Commercial → profit/loss; Non-commercial → social welfare/satisfaction.\n"
         "4. Scale: Commercial → often large-scale, organised; Non-commercial → often small-scale.\n"
         "Indian Examples:\n"
         "  Commercial: Maruti Suzuki manufacturing cars; Amul selling dairy products.\n"
         "  Non-commercial: A doctor running a free clinic in a Rajasthan village; ISRO's satellite "
         "missions serving national development (not for profit)."
     ),
     "min_points": 3,
     "required_keywords": ["commercial", "non-commercial", "profit", "motive", "income"],
     "point_keywords": ["motive", "income", "outcome", "example", "profit", "commercial", "non-commercial"]},

    {"id": "comm-001-long-02", "node_id": "c9_commstud_001", "type": "long_answer",
     "difficulty": "Hard", "topic": "Commercial vs Non-Commercial",
     "competency": True,
     "question": (
         "Explain why a teacher teaching in a school is said to be engaged in a commercial activity "
         "even though she does not 'sell' education directly. In your answer, distinguish between "
         "economic, commercial, and non-commercial activities with Indian examples."
     ),
     "options": None,
     "answer": (
         "Teacher is economic (productive) and commercial (paid employment): school is a commercial "
         "institution. Non-commercial example: teaching own child. Non-economic: cooking for self "
         "in a non-productive context."
     ),
     "explanation": (
         "A teacher employed at a school (e.g., Delhi Public School, Kendriya Vidyalaya) is engaged in "
         "a COMMERCIAL ACTIVITY because: (1) The school is a commercial institution that charges fees "
         "and operates for sustainability; (2) The teacher receives a SALARY — this constitutes an "
         "economic transaction; (3) Education is a service being provided for consideration (fees). "
         "Thus the teacher's activity is both ECONOMIC (productive and remunerated) and COMMERCIAL. "
         "Contrast: if the same teacher teaches her own child at home with no fee, it is NON-COMMERCIAL "
         "(though still ECONOMIC). Household chores done by a homemaker without any exchange are "
         "NON-ECONOMIC."
     ),
     "min_points": 4,
     "required_keywords": ["commercial", "economic", "non-commercial", "salary", "employment"],
     "point_keywords": ["commercial", "economic", "non-commercial", "salary", "school", "profit", "motive"]},

    {"id": "comm-001-num-01", "node_id": "c9_commstud_001", "type": "numerical",
     "difficulty": "Medium", "topic": "Commercial vs Non-Commercial",
     "competency": True,
     "question": (
         "A farmer sells his onion crop to a local trader in the Lasalgaon APMC mandi (Nashik, "
         "Maharashtra). He buys seeds for Rs. 2,000, spends Rs. 5,000 on labour and fertiliser, "
         "and sells the produce for Rs. 15,000. Calculate: "
         "(a) Total cost of production, (b) Profit earned, (c) Profit percentage."
     ),
     "options": None,
     "answer": {"cost": 7000, "profit": 8000, "profit_pct": round(8000/7000*100, 2)},
     "explanation": (
         "Total Cost = Seeds + Labour/Fertiliser = Rs. 2,000 + Rs. 5,000 = Rs. 7,000.\n"
         "Profit = Selling Price − Total Cost = Rs. 15,000 − Rs. 7,000 = Rs. 8,000.\n"
         "Profit Percentage = (Profit / Cost) × 100 = (8,000 / 7,000) × 100 ≈ 114.29%.\n"
         "Since the farmer earns a profit of Rs. 8,000, this is a COMMERCIAL ACTIVITY. "
         "Lasalgaon APMC is Asia's largest onion market, where farmers from Nashik district sell "
         "their produce daily."
     ),
     "tolerance": 0.05},

    # ── c9_commstud_015: Production Department ───────────────────

    {"id": "prod-015-mcq-01", "node_id": "c9_commstud_015", "type": "mcq",
     "difficulty": "Easy", "topic": "Production Department",
     "competency": False,
     "question": "Which of the following best describes the Production Department in a manufacturing firm?",
     "options": {
         "A": "The department that sells finished products to customers",
         "B": "The department that converts raw materials into finished goods using men, machines, and materials",
         "C": "The department that recruits employees for the company",
         "D": "The department that maintains the company accounts"
     },
     "answer": "B",
     "explanation": (
         "The PRODUCTION DEPARTMENT is the functional unit responsible for converting RAW MATERIALS "
         "into FINISHED GOODS. It uses three key resources: MEN (labour/workforce), MACHINES "
         "(equipment/technology), and MATERIALS (raw inputs). Example: Maruti Suzuki's Manesar plant "
         "uses workers, robotic assembly lines, and steel sheets to produce the Swift car. "
         "This is distinct from the Sales Department (which sells) and HR (which recruits)."
     )},

    {"id": "prod-015-mcq-02", "node_id": "c9_commstud_015", "type": "mcq",
     "difficulty": "Easy", "topic": "Production Department",
     "competency": False,
     "question": "Which of the following is NOT an objective of the Production Department?",
     "options": {
         "A": "To produce goods of the right quality",
         "B": "To minimise wastage of materials",
         "C": "To sell the finished products at the highest price",
         "D": "To produce the right quantity at the right time"
     },
     "answer": "C",
     "explanation": (
         "Option C is NOT an objective of the Production Department — SELLING is the responsibility "
         "of the MARKETING/SALES department. The Production Department's objectives are:\n"
         "1. RIGHT QUALITY — meeting quality standards (e.g., ISO 9001 at Tata Steel's Jamshedpur plant);\n"
         "2. RIGHT QUANTITY — meeting output targets without over/under-production;\n"
         "3. RIGHT TIME — meeting delivery schedules (lead time management);\n"
         "4. RIGHT COST — producing at minimum cost without sacrificing quality;\n"
         "5. MINIMUM WASTE — reducing scrap (e.g., HUL Haridwar's zero-waste initiative)."
     )},

    {"id": "prod-015-mcq-03", "node_id": "c9_commstud_015", "type": "mcq",
     "difficulty": "Medium", "topic": "Production Department",
     "competency": True,
     "question": (
         "NTPC's Ramagundam thermal power plant generates 2,600 MW of electricity — a service, "
         "not a tangible physical good. This illustrates that the concept of 'production' is:"
     ),
     "options": {
         "A": "Limited only to manufacturing physical goods like cars and steel",
         "B": "Applicable to both manufacturing goods AND producing services",
         "C": "Applicable only to agriculture",
         "D": "The same as 'trading'"
     },
     "answer": "B",
     "explanation": (
         "Production is applicable to BOTH goods AND services. NTPC Ramagundam 'produces' electricity "
         "— a service — using coal, water, and human resources. Similarly, TCS produces software "
         "services, SBI produces banking services, and Indian Railways produces transport services. "
         "The modern definition of production includes creation of ANY output — tangible or intangible "
         "— using inputs. This is an important conceptual point for Indian students who often equate "
         "production only with factories."
     )},

    {"id": "prod-015-mcq-04", "node_id": "c9_commstud_015", "type": "mcq",
     "difficulty": "Medium", "topic": "Production Department",
     "competency": True,
     "question": (
         "Tata Motors' production department uses ISO 9001 quality standards at its Pune factory. "
         "This effort directly supports which production objective?"
     ),
     "options": {
         "A": "Right cost (minimising production cost)",
         "B": "Right quantity (maximum output)",
         "C": "Right quality (meeting quality standards)",
         "D": "Minimum wastage"
     },
     "answer": "C",
     "explanation": (
         "ISO 9001 certification directly supports the RIGHT QUALITY objective. ISO 9001 is an "
         "international quality management standard that ensures products meet customer and regulatory "
         "requirements. Tata Motors achieved ISO 9001 at its Pune plant to maintain consistent quality "
         "across its vehicle lineup — from the Nano to the Safari. Quality objectives also include "
         "defect reduction (less than X defects per 1,000 vehicles) and customer satisfaction scores."
     )},

    {"id": "prod-015-fill-01", "node_id": "c9_commstud_015", "type": "fill_blank",
     "difficulty": "Easy", "topic": "Production Department",
     "competency": False,
     "question": "The conversion of raw materials into finished goods using men, machines, and materials is called _______.",
     "options": None,
     "answer": ["production", "manufacturing"],
     "explanation": (
         "PRODUCTION is the process of converting raw materials into finished goods or services "
         "using inputs of men (labour), machines (equipment), and materials (raw inputs). Example: "
         "Tata Steel's Jamshedpur blast furnace converts iron ore (raw material) into steel "
         "(finished product) using workers and furnaces. Amul's Anand dairy converts milk into "
         "butter, cheese, and ghee."
     )},

    {"id": "prod-015-fill-02", "node_id": "c9_commstud_015", "type": "fill_blank",
     "difficulty": "Easy", "topic": "Production Department",
     "competency": False,
     "question": "The five key objectives of the Production Department are: Right Quality, Right Quantity, Right Time, Right Cost, and _______.",
     "options": None,
     "answer": ["minimum wastage", "minimum waste", "least wastage"],
     "explanation": (
         "MINIMUM WASTAGE is the fifth key objective. Hindustan Unilever's Haridwar factory, for "
         "example, achieved zero-waste-to-landfill status for its Lifebuoy soap production line. "
         "Tata Steel aims for maximum yield from every tonne of iron ore. Reducing wastage lowers "
         "costs and is environmentally responsible."
     )},

    {"id": "prod-015-fill-03", "node_id": "c9_commstud_015", "type": "fill_blank",
     "difficulty": "Medium", "topic": "Production Department",
     "competency": True,
     "question": (
         "The Amul dairy plant at Anand processes 3 million litres of milk per day into butter, "
         "cheese, and ghee. The daily 3 million litre target represents the plant's _______."
     ),
     "options": None,
     "answer": ["capacity", "production capacity", "installed capacity"],
     "explanation": (
         "PRODUCTION CAPACITY is the maximum output a plant can achieve in a given period. "
         "Amul Anand has a processing capacity of ~3 million litres/day, making it the world's "
         "largest vegetarian dairy brand. 'Capacity utilisation' = (actual output / capacity) × 100. "
         "If Amul produces 2.7M litres/day, its capacity utilisation is 90%."
     )},

    {"id": "prod-015-fill-04", "node_id": "c9_commstud_015", "type": "fill_blank",
     "difficulty": "Hard", "topic": "Production Department",
     "competency": True,
     "question": (
         "The time gap between receiving a customer's order and delivering the finished product "
         "is called _______."
     ),
     "options": None,
     "answer": ["lead time", "delivery lead time"],
     "explanation": (
         "LEAD TIME is the time interval between placing an order and receiving the finished goods. "
         "For example, if a dealer orders 100 Maruti Suzuki Swift cars on January 1st and receives "
         "them on January 15th, the lead time is 14 days. Reducing lead time is a key production "
         "objective — shorter lead times mean better customer service. JIT (Just-in-Time) inventory "
         "systems aim to minimise lead time."
     )},

    {"id": "prod-015-short-01", "node_id": "c9_commstud_015", "type": "short_answer",
     "difficulty": "Easy", "topic": "Production Department",
     "competency": False,
     "question": "Define 'production'. Give two Indian examples of production of services (not physical goods).",
     "options": None,
     "answer": "production: converting inputs to outputs; services: electricity by NTPC, banking by SBI",
     "explanation": (
         "PRODUCTION is the process of converting raw materials/inputs into finished goods or services "
         "using men, machines, and materials. Service examples: (1) NTPC generating electricity — a "
         "service output (no tangible product); (2) SBI providing banking services; (3) TCS providing "
         "software services."
     ),
     "keywords": ["convert", "input", "output", "raw material", "finished", "services", "men", "machines"],
     "min_keywords": 2},

    {"id": "prod-015-short-02", "node_id": "c9_commstud_015", "type": "short_answer",
     "difficulty": "Medium", "topic": "Production Department",
     "competency": True,
     "question": (
         "Maruti Suzuki's Manesar plant aims to produce 1.5 million cars per year while maintaining "
         "ISO quality standards. State THREE specific objectives this production department is "
         "trying to achieve."
     ),
     "options": None,
     "answer": "right quantity (1.5M cars), right quality (ISO standards), right cost (efficiency)",
     "explanation": (
         "Three objectives clearly visible: (1) RIGHT QUANTITY — 1.5 million cars/year target; "
         "(2) RIGHT QUALITY — ISO quality standards; (3) RIGHT COST — maintaining cost efficiency "
         "while producing at scale. An additional implicit objective is RIGHT TIME — meeting delivery "
         "schedules to dealers."
     ),
     "keywords": ["quantity", "quality", "cost", "time", "objective", "wastage"],
     "min_keywords": 2},

    {"id": "prod-015-short-03", "node_id": "c9_commstud_015", "type": "short_answer",
     "difficulty": "Easy", "topic": "Production Department",
     "competency": False,
     "question": "Distinguish between 'production' and 'manufacturing' with one example each.",
     "options": None,
     "answer": "manufacturing: tangible goods (Maruti car); production: both goods and services (NTPC electricity)",
     "explanation": (
         "MANUFACTURING = making physical/tangible goods (e.g., Maruti Suzuki manufacturing a Swift car). "
         "PRODUCTION = broader concept including creation of both physical goods AND services "
         "(e.g., NTPC producing electricity, TCS producing software services). "
         "All manufacturing is production, but not all production is manufacturing."
     ),
     "keywords": ["manufacturing", "production", "goods", "services", "tangible", "physical"],
     "min_keywords": 2},

    {"id": "prod-015-long-01", "node_id": "c9_commstud_015", "type": "long_answer",
     "difficulty": "Medium", "topic": "Production Department",
     "competency": True,
     "question": (
         "The Production Department of a company has five main objectives. Explain any FOUR of them "
         "with specific Indian company examples."
     ),
     "options": None,
     "answer": "Four objectives: right quality (ISO at Tata Steel), right quantity (Maruti targets), right time (JIT), right cost (efficiency), minimum wastage (HUL zero-waste)",
     "explanation": (
         "FIVE OBJECTIVES OF THE PRODUCTION DEPARTMENT with Indian examples:\n"
         "1. RIGHT QUALITY: Produce goods that meet specified quality standards. "
         "Tata Steel's Jamshedpur plant uses ISO 9001 to ensure consistent steel quality for "
         "automotive and construction customers.\n"
         "2. RIGHT QUANTITY: Produce neither too much (wastage) nor too little (stockouts). "
         "Maruti Suzuki targets 1.5M cars/year to match market demand.\n"
         "3. RIGHT TIME: Meet delivery schedules. ITC's paperboards division commits to 48-hour "
         "delivery to key packaging customers.\n"
         "4. RIGHT COST: Minimise production cost while maintaining quality. "
         "Tata Nano was designed as the 'people's car' at Rs. 1 lakh to minimise cost.\n"
         "5. MINIMUM WASTAGE: Reduce scrap and by-products. HUL Haridwar achieved zero-waste-to-landfill."
     ),
     "min_points": 3,
     "required_keywords": ["quality", "quantity", "cost", "time", "waste", "wastage"],
     "point_keywords": ["quality", "quantity", "cost", "time", "waste", "wastage", "objective", "production"]},

    {"id": "prod-015-long-02", "node_id": "c9_commstud_015", "type": "long_answer",
     "difficulty": "Hard", "topic": "Production Department",
     "competency": True,
     "question": (
         "A student claims: 'Production means only making physical goods in a factory.' "
         "Using the example of NTPC Ramagundam power plant and any ONE other Indian service-sector "
         "company, explain why this statement is incorrect."
     ),
     "options": None,
     "answer": "Production includes services: NTPC generates electricity (service), TCS provides software (service); production = any output using inputs",
     "explanation": (
         "The student's statement is INCORRECT. Modern definition of production includes creation of "
         "BOTH goods and services:\n"
         "1. NTPC Ramagundam: Converts coal, water, and human labour into ELECTRICITY — a SERVICE, "
         "not a tangible good. The plant 'produces' 2,600 MW of power output.\n"
         "2. TCS (Tata Consultancy Services): Converts skilled engineers and technology into "
         "SOFTWARE SERVICES — a knowledge-based output, not a physical product.\n"
         "3. SBI: Converts capital, technology, and staff into BANKING SERVICES.\n"
         "The three input categories (men, machines, materials) apply equally to service producers. "
         "Therefore, production is not limited to factories and physical goods."
     ),
     "min_points": 3,
     "required_keywords": ["production", "services", "goods", "NTPC", "TCS", "service"],
     "point_keywords": ["production", "services", "goods", "service", "factory", "input", "output"]},

    {"id": "prod-015-num-01", "node_id": "c9_commstud_015", "type": "numerical",
     "difficulty": "Medium", "topic": "Production Department",
     "competency": True,
     "question": (
         "A bicycle manufacturing plant in Ludhiana has an installed capacity of 10,000 bicycles "
         "per month. In a particular month, it produces 8,000 bicycles and generates a total "
         "revenue of Rs. 48,00,000. The total production cost for the month was Rs. 32,00,000. "
         "Calculate: (a) Capacity Utilisation %, (b) Profit earned, (c) Profit per bicycle."
     ),
     "options": None,
     "answer": {"cap_util": 80.0, "profit": 1600000.0, "profit_per": 200.0},
     "explanation": (
         "(a) Capacity Utilisation = (Actual Output / Installed Capacity) × 100 "
         "= (8,000 / 10,000) × 100 = 80.00%.\n"
         "(b) Profit = Revenue − Cost = 48,00,000 − 32,00,000 = Rs. 16,00,000.\n"
         "(c) Profit per bicycle = Total Profit / Number of bicycles "
         "= 16,00,000 / 8,000 = Rs. 200 per bicycle.\n"
         "Ludhiana is known as the 'Bicycle City of India', producing over 50% of India's bicycles."
     ),
     "tolerance": 0.05},

    {"id": "prod-015-num-02", "node_id": "c9_commstud_015", "type": "numerical",
     "difficulty": "Hard", "topic": "Production Department",
     "competency": True,
     "question": (
         "A garment factory in Tirupur, Tamil Nadu employs 200 workers, each producing 25 shirts "
         "per day at a piece-rate wage of Rs. 30 per shirt. The factory uses fabric costing "
         "Rs. 80 per shirt and spends Rs. 15,000/day on machine operating costs. Each shirt sells "
         "for Rs. 350. Calculate: (a) Daily total output, (b) Total daily production cost, "
         "(c) Daily profit, (d) Productivity per worker (shirts/day)."
     ),
     "options": None,
     "answer": {"daily_output": 5000, "daily_cost": 415000.0, "daily_profit": 1350000.0, "productivity": 25.0},
     "explanation": (
         "(a) Daily output = 200 workers × 25 shirts/worker = 5,000 shirts.\n"
         "(b) Fabric cost = 5,000 × Rs. 80 = Rs. 4,00,000.\n"
         "    Labour cost = 5,000 × Rs. 30 = Rs. 1,50,000.\n"
         "    Total cost = 4,00,000 + 1,50,000 + 15,000 = Rs. 4,15,000.\n"
         "(c) Revenue = 5,000 × Rs. 350 = Rs. 17,50,000.\n"
         "    Profit = 17,50,000 − 4,15,000 = Rs. 13,35,000.\n"
         "(d) Productivity per worker = 25 shirts/day (given).\n"
         "Tirupur is India's knitwear capital, exporting to over 50 countries."
     ),
     "tolerance": 0.05},

    # ── c9_commstud_019: Meaning and Process of Communication ────

    {"id": "comm-019-mcq-01", "node_id": "c9_commstud_019", "type": "mcq",
     "difficulty": "Easy", "topic": "Communication Process",
     "competency": False,
     "question": "In the communication process, the person who originates and sends the message is called:",
     "options": {
         "A": "The receiver",
         "B": "The encoder",
         "C": "The sender",
         "D": "The decoder"
     },
     "answer": "C",
     "explanation": (
         "The SENDER is the person who originates the message and initiates the communication. "
         "Example: In a scenario where a Tata Motors dealer in Pune sends an email enquiry to the "
         "Chennai head office about Nexon EV stock, the DEALER is the SENDER. "
         "The other terms: ENCODER = the sender converts thoughts into a message; DECODER = "
         "the receiver interprets the message; RECEIVER = the person for whom the message is intended."
     )},

    {"id": "comm-019-mcq-02", "node_id": "c9_commstud_019", "type": "mcq",
     "difficulty": "Easy", "topic": "Communication Process",
     "competency": False,
     "question": "The process of converting thoughts and ideas into a message that can be transmitted is called:",
     "options": {
         "A": "Decoding",
         "B": "Encoding",
         "C": "Receiving",
         "D": "Feedback"
     },
     "answer": "B",
     "explanation": (
         "ENCODING is the process by which the sender converts their thoughts, ideas, or feelings "
         "into a communicable message. Example: A teacher explaining the concept of GST in Hindi — "
         "she encodes her understanding into spoken words. Reliance Jio encoding a promotional "
         "message into an SMS format for customers. Encoding involves choosing words, tone, and medium."
     )},

    {"id": "comm-019-mcq-03", "node_id": "c9_commstud_019", "type": "mcq",
     "difficulty": "Medium", "topic": "Communication Process",
     "competency": True,
     "question": (
         "A CBSE school in Bangalore sends a digital circular to parents via the school's mobile "
         "app notifying them of the annual day event. Identify the 'channel' in this communication."
     ),
     "options": {
         "A": "The annual day event",
         "B": "The school's mobile app notification system",
         "C": "The parents reading the message",
         "D": "The school principal's thoughts"
     },
     "answer": "B",
     "explanation": (
         "The CHANNEL is the route or medium through which the message travels from sender to receiver. "
         "Here, the school app notification system is the CHANNEL. Note the distinction: CHANNEL = "
         "route (electronic/digital); MEDIUM = specific form (app notification, SMS, email). "
         "The PARENTS are the RECEIVER, the NOTIFICATION TEXT is the MESSAGE, and the parents' "
         "RSVP reply is the FEEDBACK. This is a real-world Indian school communication example."
     )},

    {"id": "comm-019-mcq-04", "node_id": "c9_commstud_019", "type": "mcq",
     "difficulty": "Medium", "topic": "Communication Process",
     "competency": True,
     "question": (
         "A TV news channel broadcasts a report about new agricultural schemes for farmers. "
         "Millions of viewers watch but cannot send any reply directly to the channel during the "
         "broadcast. What type of communication is this?"
     ),
     "options": {
         "A": "Two-way communication with strong feedback",
         "B": "One-way communication (no feedback loop)",
         "C": "Encoding without a channel",
         "D": "Non-commercial communication"
     },
     "answer": "B",
     "explanation": (
         "This is ONE-WAY COMMUNICATION — the message flows from the channel (news broadcast) to "
         "the receivers (farmers/viewers) but there is NO FEEDBACK during the broadcast. "
         "Communication with a feedback loop (e.g., a teacher answering students' questions) is "
         "TWO-WAY COMMUNICATION. One-way communication examples: TV/radio broadcasts, newspaper "
         "articles, public announcements by PM on Doordarshan. Two-way: phone calls, meetings, "
         "WhatsApp conversations. Feedback makes communication effective and complete."
     )},

    {"id": "comm-019-mcq-05", "node_id": "c9_commstud_019", "type": "mcq",
     "difficulty": "Hard", "topic": "Communication Process",
     "competency": False,
     "question": (
         "Ramesh, a manager, gives instructions to his assistant to prepare a sales report. "
         "However, the assistant misunderstood the deadline and submitted it 2 days late. "
         "Which element of communication 'broke down' in this scenario?"
     ),
     "options": {
         "A": "Sender",
         "B": "Encoding",
         "C": "Channel",
         "D": "Decoding"
     },
     "answer": "D",
     "explanation": (
         "DECODING broke down — the assistant (receiver) did not correctly interpret Ramesh's "
         "message about the deadline. Decoding is the process where the receiver interprets the "
         "message. If decoding is inaccurate, the message is misunderstood — as happened here. "
         "Ramesh (sender) was clear in his instructions; the channel (verbal/email) was fine; "
         "but the assistant's interpretation (decoding) was faulty. A simple clarification from "
         "Ramesh ('Did you understand the deadline?') — FEEDBACK — would have prevented this error."
     )},

    {"id": "comm-019-fill-01", "node_id": "c9_commstud_019", "type": "fill_blank",
     "difficulty": "Easy", "topic": "Communication Process",
     "competency": False,
     "question": "Communication is defined as the exchange of information, ideas, or _______ between two or more persons.",
     "options": None,
     "answer": ["feelings", "emotions"],
     "explanation": (
         "Communication is the exchange of INFORMATION, IDEAS, or FEELINGS between two or more "
         "persons. It is not limited to facts — emotions and ideas are equally important. "
         "Example: A project manager communicating excitement about a new product launch conveys "
         "feelings, not just information. A teacher consoling a student conveys both ideas and "
         "emotions. Effective communication requires clarity in all three dimensions."
     )},

    {"id": "comm-019-fill-02", "node_id": "c9_commstud_019", "type": "fill_blank",
     "difficulty": "Easy", "topic": "Communication Process",
     "competency": False,
     "question": "The medium or route through which a message travels from sender to receiver is called the _______.",
     "options": None,
     "answer": ["channel", "medium"],
     "explanation": (
         "The CHANNEL is the route or pathway through which the message travels. Examples of channels: "
         "postal system, telephone network, internet/email, face-to-face conversation. "
         "Distinction: CHANNEL is the route (postal, electronic); MEDIUM is the specific form "
         "(letter, email, SMS). In a WhatsApp message: channel = internet; medium = WhatsApp text."
     )},

    {"id": "comm-019-fill-03", "node_id": "c9_commstud_019", "type": "fill_blank",
     "difficulty": "Medium", "topic": "Communication Process",
     "competency": True,
     "question": (
         "A company in Mumbai sends a voice message to all its 5,000 employees over the office "
         "intercom system announcing a holiday. In this communication, the intercom system is the "
         "_______, and the employees are the _______."
     ),
     "options": None,
     "answer": ["channel", "receivers"],
     "explanation": (
         "INTERCOM = CHANNEL (the route); EMPLOYEES = RECEIVERS (those who receive the message). "
         "The HR manager who recorded the announcement is the SENDER. The voice recording is the "
         "MESSAGE. When employees respond to HR asking about holiday pay, that response is FEEDBACK. "
         "This example shows a one-way communication (announcement) with potential for feedback."
     )},

    {"id": "comm-019-fill-04", "node_id": "c9_commstud_019", "type": "fill_blank",
     "difficulty": "Hard", "topic": "Communication Process",
     "competency": False,
     "question": "The response or reaction of the receiver that goes back to the sender is called _______.",
     "options": None,
     "answer": ["feedback"],
     "explanation": (
         "FEEDBACK is the receiver's response that goes back to the sender. It completes the "
         "communication loop and ensures the message was correctly understood. "
         "Types of feedback: verbal ('Yes, I understand'), written (email reply), non-verbal "
         "(nodding, facial expression). Without feedback, the sender cannot know if the message "
         "was correctly received. Example: After a teacher explains GST, students asking questions "
         "constitutes feedback — showing whether the message was understood."
     )},

    {"id": "comm-019-short-01", "node_id": "c9_commstud_019", "type": "short_answer",
     "difficulty": "Easy", "topic": "Communication Process",
     "competency": False,
     "question": "Define communication. State any FOUR elements of the communication process in sequence.",
     "options": None,
     "answer": "exchange of info/ideas/feelings; elements: sender, encoding, message, channel, receiver, decoding, feedback",
     "explanation": (
         "COMMUNICATION is the exchange of information, ideas, or feelings between two or more persons. "
         "The SEVEN ELEMENTS in sequence:\n"
         "1. SENDER (originator) → 2. ENCODING (converting thoughts to message) → "
         "3. MESSAGE (what is communicated) → 4. CHANNEL (medium/route) → "
         "5. RECEIVER (recipient) → 6. DECODING (interpreting the message) → "
         "7. FEEDBACK (receiver's response back to sender)."
     ),
     "keywords": ["exchange", "information", "ideas", "feelings", "sender", "encoding", "message", "channel", "receiver", "decoding", "feedback"],
     "min_keywords": 3},

    {"id": "comm-019-short-02", "node_id": "c9_commstud_019", "type": "short_answer",
     "difficulty": "Medium", "topic": "Communication Process",
     "competency": True,
     "question": (
         "A school principal sends a WhatsApp message to all teachers asking them to submit "
         "their lesson plans by Friday. Identify ALL SEVEN elements of communication in this scenario."
     ),
     "options": None,
     "answer": "sender=principal, encoding=writing message, message=lesson plan reminder, channel=WhatsApp, receiver=teachers, decoding=teachers reading, feedback=teachers' replies",
     "explanation": (
         "1. SENDER: School Principal\n"
         "2. ENCODING: Principal types the reminder message in WhatsApp\n"
         "3. MESSAGE: 'Submit lesson plans by Friday'\n"
         "4. CHANNEL: WhatsApp (internet/digital route)\n"
         "5. RECEIVER: All teachers\n"
         "6. DECODING: Teachers reading and understanding the message\n"
         "7. FEEDBACK: Teachers replying 'Noted' or asking questions about format\n"
         "This is an Indian school context competency example."
     ),
     "keywords": ["sender", "encoding", "message", "channel", "receiver", "decoding", "feedback", "principal", "teacher", "whatsapp"],
     "min_keywords": 4},

    {"id": "comm-019-short-03", "node_id": "c9_commstud_019", "type": "short_answer",
     "difficulty": "Medium", "topic": "Communication Process",
     "competency": True,
     "question": (
         "Why is 'feedback' considered an essential part of the communication process? "
         "Explain with a classroom example."
     ),
     "options": None,
     "answer": "feedback confirms message received correctly; without it sender doesn't know if understood; e.g., teacher asks questions after lesson",
     "explanation": (
         "FEEDBACK is essential because:\n"
         "1. CONFIRMS UNDERSTANDING: It tells the sender whether the message was correctly understood.\n"
         "2. COMPLETES THE LOOP: Communication is a two-way process — without feedback, it is incomplete.\n"
         "3. CORRECTS ERRORS: If misunderstanding exists, feedback allows the sender to clarify.\n"
         "Example: A teacher explains the concept of 'Profit' in Commercial Studies. She then asks "
         "'Can anyone give an example of profit from their daily life?' Student responses (feedback) "
         "tell the teacher whether students have understood. If they haven't, she re-explains."
     ),
     "keywords": ["feedback", "confirm", "understand", "sender", "message", "correct", "clarify"],
     "min_keywords": 2},

    {"id": "comm-019-long-01", "node_id": "c9_commstud_019", "type": "long_answer",
     "difficulty": "Medium", "topic": "Communication Process",
     "competency": True,
     "question": (
         "Describe the complete seven-element process of communication using the example of: "
         "'A customer sends an email to Amazon customer care complaining about a delayed delivery.' "
         "Identify all seven elements clearly."
     ),
     "options": None,
     "answer": "1 sender=customer, 2 encoding=writing email, 3 message=complaint, 4 channel=email, 5 receiver=Amazon care, 6 decoding=reading complaint, 7 feedback=reply from Amazon",
     "explanation": (
         "SEVEN ELEMENTS mapped to the Amazon scenario:\n"
         "1. SENDER: The customer who experienced the delayed delivery\n"
         "2. ENCODING: Customer converts frustration into a written email, choosing words carefully\n"
         "3. MESSAGE: The complaint about delayed delivery, order number, and expected resolution\n"
         "4. CHANNEL: Email (electronic/digital route through the internet)\n"
         "5. RECEIVER: Amazon customer care executive/team\n"
         "6. DECODING: The customer care executive reads and interprets the complaint, understands "
         "the customer's concern\n"
         "7. FEEDBACK: Amazon replies with an apology, a new delivery timeline, or a refund — "
         "completing the communication loop\n"
         "Note: Amazon's reply may also go through a chatbot (AI decoding) before a human responds."
     ),
     "min_points": 5,
     "required_keywords": ["sender", "encoding", "message", "channel", "receiver", "decoding", "feedback"],
     "point_keywords": ["sender", "encoding", "message", "channel", "receiver", "decoding", "feedback", "customer", "email"]},

    {"id": "comm-019-long-02", "node_id": "c9_commstud_019", "type": "long_answer",
     "difficulty": "Hard", "topic": "Communication Process",
     "competency": True,
     "question": (
         "Distinguish between 'channel' and 'medium' in the communication process. "
         "Give three Indian examples each of a channel and a medium. "
         "Also, explain why feedback is important in business communication with a real Indian example."
     ),
     "options": None,
     "answer": "channel=route (postal/internet/air); medium=specific form (letter/email/SMS); feedback confirms understanding; example: customer care reply",
     "explanation": (
         "CHANNEL vs MEDIUM:\n"
         "CHANNEL = the route/system through which message travels (e.g., postal system, internet, "
         "airwaves for radio).\n"
         "MEDIUM = the specific form/vehicle used (e.g., a letter, an email, an SMS).\n"
         "3 Indian channel examples: (1) India Post postal network, (2) Internet (Jio/BSNL), "
         "(3) Aadhaar-enabled delivery system.\n"
         "3 Indian medium examples: (1) Registered post letter, (2) Email via Gmail, "
         "(3) SMS via Airtel network.\n"
         "FEEDBACK importance: When ICICI Bank sends a transaction alert SMS, the customer replying "
         "'STOP' is feedback that helps the bank know the customer received the message and wishes "
         "to stop such alerts. Without feedback, the bank cannot confirm message receipt."
     ),
     "min_points": 4,
     "required_keywords": ["channel", "medium", "feedback", "sender", "receiver"],
     "point_keywords": ["channel", "medium", "feedback", "communication", "sender", "receiver", "route", "form"]},

    {"id": "comm-019-num-01", "node_id": "c9_commstud_019", "type": "numerical",
     "difficulty": "Medium", "topic": "Communication Process",
     "competency": True,
     "question": (
         "A sales team of 8 members communicates through daily morning meetings. In one meeting, "
         "the team leader (sender) conveys 4 different instructions to each of 8 team members "
         "(receivers) one by one. Each receiver provides written feedback. "
         "(a) How many individual sender→receiver communication links are formed? "
         "(b) How many feedback exchanges occur? "
         "(c) If 2 receivers did NOT give feedback, how many feedback exchanges are missing?"
     ),
     "options": None,
     "answer": {"sender_links": 8, "feedback_total": 8, "feedback_missing": 2},
     "explanation": (
         "(a) Individual sender→receiver links = Number of receivers = 8 links (one per person).\n"
         "(b) Total feedback exchanges = 8 (each of the 8 receivers gives written feedback).\n"
         "(c) If 2 receivers did NOT give feedback: missing feedback = 2.\n"
         "Missing feedback means the sender cannot confirm those 2 receivers understood the message, "
         "creating a potential communication breakdown. In business, this is like a manager sending "
         "instructions to 8 team members in a Mumbai office — if 2 don't acknowledge (feedback), "
         "the manager must follow up."
     ),
     "tolerance": 0.0},

    {"id": "comm-019-num-02", "node_id": "c9_commstud_019", "type": "numerical",
     "difficulty": "Hard", "topic": "Communication Process",
     "competency": True,
     "question": (
         "A rural health worker in a village in Odisha needs to communicate vaccination schedules "
         "to 12 village households. She visits each household (channel = personal visit), explains "
         "the schedule (encoding), and records their acknowledgement (feedback). "
         "(a) How many individual messages are sent if each household receives a different schedule? "
         "(b) How many feedback acknowledgements should she receive for complete communication? "
         "(c) If she received only 9 acknowledgements, what is the communication efficiency %?"
     ),
     "options": None,
     "answer": {"messages": 12, "feedback_needed": 12, "efficiency": 75.0},
     "explanation": (
         "(a) Individual messages = 12 (one customised schedule per household).\n"
         "(b) Feedback needed for complete communication = 12 acknowledgements (one per household).\n"
         "(c) Communication Efficiency = (Feedback received / Feedback needed) × 100 "
         "= (9 / 12) × 100 = 75.0%"
     ),
    }
]


def solve_question(question: Dict, user_input: Optional[str] = None) -> Dict:
    """Solve a question from the bank."""
    qid = question.get('id', '')
    for q in QUESTION_BANK:
        if q.get('id') == qid:
            return {
                'answer': q.get('answer'),
                'steps': [q.get('explanation', '')],
                'verification': True,
            }
    return {'answer': None, 'steps': ['Question not found'], 'verification': False}


def get_coverage_summary() -> Dict:
    return {
        'syllabus': 'ICSE Class 9 Commercial Studies',
        'total_questions': len(QUESTION_BANK),
        'topics': ['Communication', 'Business Organisation', 'Finance', 'Marketing'],
    }
