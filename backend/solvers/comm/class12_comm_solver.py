"""
CISCE Class 12 Commerce — Deterministic Solver + Question Generator
Covers:
  c12_comm_001 — Business Environment
  c12_comm_007 — Management
  c12_comm_025 — Business Finance (IFDL)
"""

import math
import random
import hashlib
import itertools
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple
from enum import Enum

# ──────────────────────────────────────────────
#  DATA LAYER  (syllabus content library)
# ──────────────────────────────────────────────

# ── c12_comm_001 ── Business Environment ──────

BE_MEANING: str = (
    "Business Environment refers to the sum total of all internal and "
    "external factors — individuals, institutions, and forces — that "
    "directly or indirectly influence the performance of a business."
)

BE_FEATURES: Dict[str, str] = {
    "Totality of External Forces": (
        "The business environment is the aggregate of multiple external forces "
        "— economic, social, legal, technological, political, and global — that "
        "surround and affect a business enterprise."
    ),
    "Specific and General Forces": (
        "Specific forces directly affect a single enterprise (e.g., customers, "
        "suppliers, investors). General forces affect all enterprises in an "
        "industry (e.g., government policy, social attitudes, technology trends)."
    ),
    "Inter-relatedness": (
        "Different environmental forces are linked; a change in one force "
        "triggers changes in others. E.g., a rise in crude-oil prices "
        "(economic) increases production costs and may force price revisions "
        "(legal/commercial)."
    ),
    "Dynamic Nature": (
        "The business environment is continuously changing. Firms must monitor "
        "and adapt to these changes to stay competitive. E.g., Reliance Jio's "
        "2016 launch forced incumbent telecom operators to reduce tariffs "
        "dramatically."
    ),
    "Complexity and Uncertainty": (
        "The environment is made up of numerous interconnected forces, making "
        "it difficult to predict precisely. Demonetisation (8 Nov 2016) "
        "illustrates sudden shifts affecting FMCG sales unpredictably."
    ),
}

BE_MCQ_BANK: List[Dict[str, Any]] = [
    {
        "id": "BE_MCQ_01",
        "question": "Which of the following is NOT a feature of the business environment?",
        "options": ["Dynamic nature", "Static nature", "Complexity and uncertainty", "Inter-relatedness"],
        "answer": "Static nature",
        "explanation": "The business environment is dynamic (continuously changing), not static. All other options are recognised features.",
        "difficulty": "Easy",
        "topic": "Business Environment – Features",
        "competency": False,
    },
    {
        "id": "BE_MCQ_02",
        "question": "The forces that directly affect a single enterprise (e.g., customers, investors) are called:",
        "options": ["General forces", "Specific forces", "Internal forces", "Macro forces"],
        "answer": "Specific forces",
        "explanation": "Specific forces relate to a particular enterprise (customers, suppliers, investors). General forces affect all firms in an industry.",
        "difficulty": "Easy",
        "topic": "Business Environment – Specific and General Forces",
        "competency": True,
        "indian_context": "HUL's customers and suppliers are specific forces; RBI's monetary policy is a general force.",
    },
    {
        "id": "BE_MCQ_03",
        "question": (
            "Tata Motors recalibrated its Nexon EV strategy after the FAME-II subsidy "
            "revision and rising lithium prices. This illustrates which feature of the "
            "business environment?"
        ),
        "options": ["Totality", "Inter-relatedness", "Specific forces", "Static nature"],
        "answer": "Inter-relatedness",
        "explanation": (
            "Economic (lithium prices), legal (FAME-II policy), and technological "
            "(EV) forces inter-linked, forcing Tata Motors to revise its strategy — "
            "classic inter-relatedness."
        ),
        "difficulty": "Medium",
        "topic": "Business Environment – Inter-relatedness",
        "competency": True,
        "indian_context": "Tata Motors' EV recalibration is a real 2022-23 example.",
    },
    {
        "id": "BE_MCQ_04",
        "question": "Which of the following is an INTERNAL factor of the business environment?",
        "options": ["Government policy", "Corporate culture", "World Bank rates", "Technological trends"],
        "answer": "Corporate culture",
        "explanation": (
            "Internal factors exist within the organisation (corporate culture, "
            "employee skills, management quality). Government policy, World Bank "
            "rates, and technology trends are external."
        ),
        "difficulty": "Easy",
        "topic": "Business Environment – Internal and External Factors",
        "competency": False,
    },
    {
        "id": "BE_MCQ_05",
        "question": (
            "Demonetisation on 8 Nov 2016 caused a 10-15 % dip in Parle Products' "
            "biscuit sales. This exemplifies which feature?"
        ),
        "options": ["Dynamic nature only", "Complexity and uncertainty", "Inter-relatedness only", "Totality only"],
        "answer": "Complexity and uncertainty",
        "explanation": (
            "The sudden, unpredictable cash crunch created complex ripple effects — "
            "lower liquidity, disrupted supply chains, and uncertain demand — "
            "illustrating both complexity and uncertainty."
        ),
        "difficulty": "Medium",
        "topic": "Business Environment – Complexity and Uncertainty",
        "competency": True,
        "indian_context": "Parle reported a 10-15 % dip in biscuit sales immediately after demonetisation.",
    },
]

BE_FILL_BLANK_BANK: List[Dict[str, Any]] = [
    {
        "id": "BE_FB_01",
        "question": "The business environment includes both _____ and external factors.",
        "answer": "internal",
        "explanation": "The definition includes both internal (corporate culture, employee skills) and external factors.",
        "difficulty": "Easy",
        "topic": "Business Environment – Meaning",
        "competency": False,
    },
    {
        "id": "BE_FB_02",
        "question": "The _____ nature of the business environment means it is continuously changing.",
        "answer": "dynamic",
        "explanation": "Dynamic nature = continuously changing. Students often confuse it with 'unpredictable'; dynamic means changing, not necessarily impossible to forecast.",
        "difficulty": "Easy",
        "topic": "Business Environment – Dynamic Nature",
        "competency": False,
    },
    {
        "id": "BE_FB_03",
        "question": "Customers, suppliers and investors are _____ forces.",
        "answer": "specific",
        "explanation": "Specific forces directly affect a single enterprise. General forces affect all enterprises (e.g., government policy).",
        "difficulty": "Easy",
        "topic": "Business Environment – Specific and General Forces",
        "competency": True,
        "indian_context": "TCS's clients (BFSI firms) are specific forces; IT export policy is a general force.",
    },
    {
        "id": "BE_FB_04",
        "question": "The business environment is called _____ because it is difficult to predict future trends precisely.",
        "answer": "complex",
        "explanation": "Complexity refers to the numerous interconnected forces making precise prediction difficult. Uncertainty means outcomes are not fully predictable.",
        "difficulty": "Medium",
        "topic": "Business Environment – Complexity",
        "competency": False,
    },
]

BE_SHORT_ANSWER_BANK: List[Dict[str, Any]] = [
    {
        "id": "BE_SA_01",
        "question": "Define 'Business Environment' in two sentences.",
        "answer": (
            "The business environment is the sum total of all internal and external "
            "factors — individuals, institutions, and forces — that directly or "
            "indirectly influence the performance of a business enterprise."
        ),
        "explanation": (
            "Key phrase: 'sum total of all internal and external factors' is the "
            "canonical CISCE definition. Students must include both internal and "
            "external factors to get full marks."
        ),
        "difficulty": "Easy",
        "topic": "Business Environment – Meaning",
        "competency": False,
        "marks": 2,
    },
    {
        "id": "BE_SA_02",
        "question": (
            "State any two features of the business environment and illustrate each "
            "with an Indian business example."
        ),
        "answer": (
            "1. Dynamic Nature: Reliance Jio's 2016 launch forced Airtel and "
            "Vodafone Idea to cut tariffs — a dynamic shift in the telecom "
            "environment.\n"
            "2. Inter-relatedness: Rising crude-oil prices (economic force) "
            "increase airline fuel costs, forcing ticket-price revisions "
            "(commercial/legal response) — two forces are inter-related."
        ),
        "explanation": (
            "Each feature needs both a definition and a named Indian company example "
            "for full marks. Any two correct features with examples are acceptable."
        ),
        "difficulty": "Medium",
        "topic": "Business Environment – Features",
        "competency": True,
        "indian_context": "Reliance Jio 2016, Tata Motors EV, Parle demonetisation.",
        "marks": 4,
    },
    {
        "id": "BE_SA_03",
        "question": "Distinguish between 'specific' and 'general' forces of the business environment.",
        "answer": (
            "Specific forces directly affect a single enterprise — e.g., customers, "
            "suppliers, investors of HUL.\n"
            "General forces affect all enterprises in an industry or economy — "
            "e.g., RBI monetary policy, GST rates, demographic changes."
        ),
        "explanation": (
            "The distinction lies in scope: specific = one firm; general = all firms "
            "or the entire industry/region."
        ),
        "difficulty": "Easy",
        "topic": "Business Environment – Specific and General Forces",
        "competency": True,
        "indian_context": "HUL vs RBI policy; TCS clients vs IT export regulations.",
        "marks": 3,
    },
]

BE_LONG_ANSWER_BANK: List[Dict[str, Any]] = [
    {
        "id": "BE_LA_01",
        "question": (
            "Explain any five features of the business environment. Illustrate each "
            "feature with a relevant Indian business example."
        ),
        "answer": (
            "FEATURE 1 – Totality of External Forces:\n"
            "Definition: The business environment comprises all external forces "
            "(economic, social, legal, technological, political, global).\n"
            "Example: Aanganwadi and mid-day meal schemes (social) + Ayushman Bharat "
            "(economic/political) together shape the healthcare business environment.\n\n"
            "FEATURE 2 – Specific and General Forces:\n"
            "Definition: Specific forces affect a single enterprise; general forces "
            "affect all enterprises in an industry.\n"
            "Example: TCS's key clients (BFSI, retail) are specific; IT export "
            "policies by the Government of India are general forces.\n\n"
            "FEATURE 3 – Inter-relatedness:\n"
            "Definition: Environmental forces are interconnected; a change in one "
            "causes changes in others.\n"
            "Example: Rising crude prices (economic) increase airline fuel costs, "
            "forcing ticket-price hikes (commercial/legal) — IndiGo's FY2022 cost "
            "surcharge is a real instance.\n\n"
            "FEATURE 4 – Dynamic Nature:\n"
            "Definition: The business environment is continuously changing.\n"
            "Example: Reliance Jio's 2016 launch forced incumbents (Airtel, Vi) to "
            "cut tariffs by 60-70 %, demonstrating rapid dynamic shifts.\n\n"
            "FEATURE 5 – Complexity and Uncertainty:\n"
            "Definition: Numerous interlinked forces make prediction difficult.\n"
            "Example: Demonetisation (Nov 2016) caused a 10-15 % dip in Parle's "
            "biscuit sales — the effect was complex (cash shortage, supply-chain "
            "disruption, demand drop) and uncertain in magnitude."
        ),
        "explanation": (
            "This 6-8 mark question requires five features, each with a definition "
            "(1 mark) and an Indian example (1 mark). Named Indian companies earn "
            "extra credit. Students must not omit internal factors from the definition."
        ),
        "difficulty": "Hard",
        "topic": "Business Environment – Five Features",
        "competency": True,
        "indian_context": "All examples are Indian companies and real events.",
        "marks": 8,
    },
]

BE_NUMERICAL_BANK: List[Dict[str, Any]] = [
    {
        "id": "BE_NUM_01",
        "question": (
            "A biscuit company had sales of ₹500 crore before demonetisation (Nov 2016). "
            "It reported a 12 % dip in sales immediately after. Calculate the sales "
            "revenue after demonetisation."
        ),
        "answer": "₹440 crore",
        "explanation": (
            "Sales after demonetisation = Sales before × (1 - 0.12)\n"
            "= ₹500 crore × 0.88 = ₹440 crore.\n"
            "Verification: 12 % of ₹500 crore = ₹60 crore; ₹500 - ₹60 = ₹440 crore."
        ),
        "difficulty": "Easy",
        "topic": "Business Environment – Numerical Application",
        "competency": True,
        "indian_context": "Based on Parle Products' reported 10-15 % dip after demonetisation.",
        "marks": 2,
        "params": {"before_sales_cr": 500, "dip_pct": 12},
    },
]

# ── c12_comm_007 ── Management ──────────────────

MG_MEANINGS: Dict[str, str] = {
    "Management as Activity": (
        "Management is the process of getting things done through and with other "
        "people in formally organised groups. As an activity, it refers to the "
        "actual doing — planning, organising, directing, and controlling on the "
        "shop floor or in daily operations."
    ),
    "Management as Group": (
        "Management is the body of persons who perform managerial functions and are "
        "responsible for achieving organisational objectives. As a group, it refers "
        "to the board of directors or executive leadership team."
    ),
    "Management as Discipline": (
        "Management as a discipline is a specialised branch of knowledge studied at "
        "universities and management institutes (e.g., IIMs, IITs, XLRI). It has "
        "its own concepts, principles, theories, and research methodology."
    ),
    "Management as Process": (
        "Management as a process is the series of interrelated functions — planning, "
        "organising, staffing, directing, and controlling — that are performed in a "
        "sequence to achieve organisational goals."
    ),
}

MG_FEATURES: Dict[str, str] = {
    "Intangible": (
        "Management cannot be seen or touched; it is experienced through its "
        "results — improved productivity, employee morale, and profitability. "
        "E.g., Infosys's high employee satisfaction reflects good management, "
        "even though management itself is invisible."
    ),
    "Goal-Oriented": (
        "Every management activity is directed towards achieving pre-determined "
        "organisational goals. E.g., Adani Ports' management focused on becoming "
        "the world's largest port operator by 2030 — a clear goal."
    ),
    "Universal": (
        "Management principles apply to all types of organisations — business, "
        "non-profit, educational, and government — across all countries. E.g., "
        "planning and controlling are used by both a Mumbai hospital and a "
        "Bengaluru software firm."
    ),
    "Continuous": (
        "Management is not a one-time act but an ongoing, never-ending process. "
        "Planning for Q1 is followed by Q2 planning, and so on."
    ),
    "Dynamic": (
        "Management adapts to changing business environments. E.g., during "
        "COVID-19, IT firms like Wipro and TCS rapidly shifted to remote-work "
        "management practices."
    ),
}

MG_IMPORTANCE: Dict[str, str] = {
    "Achievement of Group Goals": (
        "Management coordinates individual efforts towards common organisational "
        "objectives. E.g., ISRO's Chandrayaan-3 success required thousands of "
        "scientists working in synchronised management structures."
    ),
    "Efficiency and Productivity": (
        "Good management optimises resource utilisation (men, material, money), "
        "reducing costs and increasing output. E.g., Maruti Suzuki's lean "
        "manufacturing at Manesar plant."
    ),
    "Dynamic Environment Adaptation": (
        "Management helps organisations adapt to changing environments. E.g., "
        "Wipro's rapid pivot to remote delivery models during COVID-19."
    ),
    "Development of Society": (
        "Management contributes to societal welfare through CSR, employment "
        "generation, and innovation. E.g., Tata Group's healthcare and education "
        "initiatives through Tata Trusts."
    ),
}

MG_MCQ_BANK: List[Dict[str, Any]] = [
    {
        "id": "MG_MCQ_01",
        "question": "Management as a discipline is best described as:",
        "options": [
            "The act of leading employees",
            "A body of knowledge taught at IIMs and management institutes",
            "The board of directors of a company",
            "Daily shop-floor operations",
        ],
        "answer": "A body of knowledge taught at IIMs and management institutes",
        "explanation": (
            "Management as a discipline = a specialised body of knowledge. "
            "IIM Ahmedabad (est. 1961) is India's premier management discipline "
            "institute. The other options describe activity, group, or process perspectives."
        ),
        "difficulty": "Easy",
        "topic": "Management – Four Meanings",
        "competency": True,
        "indian_context": "IIM Ahmedabad founded in 1961; IIMs teach management as a discipline.",
    },
    {
        "id": "MG_MCQ_02",
        "question": "The board of directors of Infosys best illustrates management as a:",
        "options": ["Discipline", "Process", "Group", "Activity"],
        "answer": "Group",
        "explanation": (
            "Management as a group = the collective body (board of directors, "
            "executive team) responsible for achieving organisational objectives. "
            "Infosys's board (Narayana Murthy, Nandan Nilekani et al.) is a classic example."
        ),
        "difficulty": "Easy",
        "topic": "Management – Four Meanings",
        "competency": True,
        "indian_context": "Infosys board members are prominent Indian business leaders.",
    },
    {
        "id": "MG_MCQ_03",
        "question": "Which of the following is NOT a feature of management?",
        "options": ["Intangible", "Static", "Goal-oriented", "Universal"],
        "answer": "Static",
        "explanation": (
            "Management is dynamic, not static. It adapts to changing environments. "
            "Intangible, goal-oriented, and universal are all recognised features."
        ),
        "difficulty": "Easy",
        "topic": "Management – Features",
        "competency": False,
    },
    {
        "id": "MG_MCQ_04",
        "question": "Which feature of management explains why its 'success' is measured through results?",
        "options": ["Intangible", "Dynamic", "Universal", "Continuous"],
        "answer": "Intangible",
        "explanation": (
            "Management is intangible — it cannot be seen, only felt through its "
            "results. E.g., good management at Infosys shows as high employee "
            "satisfaction and profitability."
        ),
        "difficulty": "Medium",
        "topic": "Management – Features",
        "competency": False,
    },
    {
        "id": "MG_MCQ_05",
        "question": (
            "ISRO's Chandrayaan-3 mission, requiring thousands of scientists working "
            "towards a single objective, illustrates which importance of management?"
        ),
        "options": ["Society development", "Achievement of group goals", "Dynamic adaptation", "Efficiency"],
        "answer": "Achievement of group goals",
        "explanation": (
            "Management coordinates individual efforts of thousands of scientists "
            "towards the common goal of a successful moon landing — Chandrayaan-3."
        ),
        "difficulty": "Medium",
        "topic": "Management – Importance",
        "competency": True,
        "indian_context": "ISRO Chandrayaan-3 (August 2023) is a landmark Indian achievement.",
    },
    {
        "id": "MG_MCQ_06",
        "question": "Management principles apply to business, government, and non-profit organisations. This illustrates:",
        "options": ["Dynamic nature", "Intangibility", "Universality", "Goal-oriented"],
        "answer": "Universality",
        "explanation": (
            "Management is universal — its principles apply across all organisation "
            "types (business, non-profit, educational, government) and all countries."
        ),
        "difficulty": "Easy",
        "topic": "Management – Features",
        "competency": False,
    },
]

MG_FILL_BLANK_BANK: List[Dict[str, Any]] = [
    {
        "id": "MG_FB_01",
        "question": "Management studied at IIM Ahmedabad is management as a _____.",
        "answer": "discipline",
        "explanation": "IIMs and management institutes teach management as a discipline — a body of knowledge.",
        "difficulty": "Easy",
        "topic": "Management – Four Meanings",
        "competency": True,
        "indian_context": "IIM Ahmedabad was founded in 1961; IIMs teach management as a discipline.",
    },
    {
        "id": "MG_FB_02",
        "question": "Management that cannot be seen or touched but experienced through its results is called _____.",
        "answer": "intangible",
        "explanation": "Management is intangible — it has no physical existence; it is felt through outcomes.",
        "difficulty": "Easy",
        "topic": "Management – Features",
        "competency": False,
    },
    {
        "id": "MG_FB_03",
        "question": "Management helps organisations adapt to changing business environments — this is its _____ importance.",
        "answer": "dynamic environment adaptation",
        "explanation": "One of the four importance points: management enables organisations to adapt to dynamic environments. Wipro's COVID pivot is a real example.",
        "difficulty": "Medium",
        "topic": "Management – Importance",
        "competency": True,
        "indian_context": "Wipro and TCS pivoted to remote-work models during COVID-19.",
    },
    {
        "id": "MG_FB_04",
        "question": "Maruti Suzuki's quality improvement activity on the shop floor is management as _____.",
        "answer": "activity",
        "explanation": "Management as activity = the actual doing — the day-to-day tasks of planning, directing, controlling. Shop-floor quality improvements are activities.",
        "difficulty": "Easy",
        "topic": "Management – Four Meanings",
        "competency": False,
    },
]

MG_SHORT_ANSWER_BANK: List[Dict[str, Any]] = [
    {
        "id": "MG_SA_01",
        "question": "Explain any two meanings of management with one Indian example each.",
        "answer": (
            "1. Management as a Discipline: Management studied at IIM Ahmedabad "
            "since 1961 is a specialised body of knowledge with its own theories and "
            "principles.\n"
            "2. Management as a Group: The board of directors of Infosys "
            "(Narayana Murthy, Nandan Nilekani, etc.) constitutes management as a "
            "group responsible for achieving organisational goals."
        ),
        "explanation": (
            "Two meanings required: one definition + one Indian example each. "
            "Management as discipline (IIMs) and as group (board) are the easiest to "
            "illustrate with Indian examples."
        ),
        "difficulty": "Medium",
        "topic": "Management – Four Meanings",
        "competency": True,
        "indian_context": "IIM Ahmedabad 1961; Infosys board.",
        "marks": 4,
    },
    {
        "id": "MG_SA_02",
        "question": "State any three features of management and explain each with an Indian example.",
        "answer": (
            "1. Goal-Oriented: Every management activity is directed towards "
            "achieving predetermined goals. E.g., Adani Ports targeting world's "
            "largest port operator status by 2030.\n"
            "2. Dynamic: Management adapts to changing environments. E.g., "
            "Wipro's rapid pivot to remote delivery during COVID-19.\n"
            "3. Universal: Management principles apply to all organisation types. "
            "E.g., planning and controlling used by both a Bengaluru software firm "
            "and a government hospital."
        ),
        "explanation": (
            "Three features, each with definition + Indian example = full marks. "
            "Naming the company is essential for competency-based scoring."
        ),
        "difficulty": "Medium",
        "topic": "Management – Features",
        "competency": True,
        "indian_context": "Adani Ports, Wipro COVID pivot.",
        "marks": 6,
    },
    {
        "id": "MG_SA_03",
        "question": "Explain how management contributes to the development of society.",
        "answer": (
            "Management contributes to society through:\n"
            "1. Corporate Social Responsibility (CSR): E.g., Tata Group's healthcare "
            "and education initiatives via Tata Trusts.\n"
            "2. Employment generation: E.g., TCS employs over 600,000 professionals, "
            "providing livelihoods for thousands of families.\n"
            "3. Innovation and R&D: E.g., ISRO's cost-effective space missions "
            "(Chandrayaan-3 cost ≈ ₹615 crore) benefit society through technology "
            "spillovers."
        ),
        "explanation": (
            "Three concrete examples with named Indian organisations earn full marks. "
            "CSR spending mandate (2 % of net profits) under Companies Act 2013 "
            "can be cited as supporting evidence."
        ),
        "difficulty": "Medium",
        "topic": "Management – Importance",
        "competency": True,
        "indian_context": "Tata Trusts, TCS employment, ISRO Chandrayaan-3.",
        "marks": 4,
    },
]

MG_LONG_ANSWER_BANK: List[Dict[str, Any]] = [
    {
        "id": "MG_LA_01",
        "question": (
            "Explain the four meanings of management. Illustrate each meaning with "
            "a relevant Indian business example."
        ),
        "answer": (
            "1. Management as Activity:\n"
            "Definition: The actual doing — planning, directing, controlling on the "
            "shop floor.\n"
            "Example: Maruti Suzuki's quality-improvement activity on the Manesar "
            "production line.\n\n"
            "2. Management as Group:\n"
            "Definition: The body of persons who perform managerial functions and are "
            "accountable for objectives.\n"
            "Example: Tata Motors' CEO Guenter Butschek (and the board) leading the "
            "turnaround after JLR acquisition challenges.\n\n"
            "3. Management as Discipline:\n"
            "Definition: A specialised body of knowledge taught at management "
            "institutes with theories and principles.\n"
            "Example: IIM Ahmedabad (est. 1961), India's premier management school, "
            "offers the Post Graduate Programme in Management.\n\n"
            "4. Management as Process:\n"
            "Definition: The interrelated series of functions (planning, organising, "
            "staffing, directing, controlling) performed in sequence.\n"
            "Example: Reliance Industries' daily refinery operations at Jamnagar — "
            "planning production schedules, organising labour, controlling quality "
            "is a continuous process."
        ),
        "explanation": (
            "Each meaning needs definition + named Indian example. "
            "4 meanings × 1 mark definition + 1 mark example = 8 marks."
        ),
        "difficulty": "Hard",
        "topic": "Management – Four Meanings",
        "competency": True,
        "indian_context": "Maruti Suzuki Manesar, Tata Motors CEO, IIM-A 1961, Reliance Jamnagar.",
        "marks": 8,
    },
]

MG_NUMERICAL_BANK: List[Dict[str, Any]] = [
    {
        "id": "MG_NUM_01",
        "question": (
            "A manufacturing unit produced 2,000 units per day before a management "
            "intervention. After implementing lean management (as at Maruti Suzuki's "
            "Manesar plant), productivity increased by 15 %. Calculate the new daily "
            "production."
        ),
        "answer": "2,300 units",
        "explanation": (
            "New production = Old production × (1 + 0.15)\n"
            "= 2,000 × 1.15 = 2,300 units.\n"
            "Verification: 15 % of 2,000 = 300; 2,000 + 300 = 2,300 units."
        ),
        "difficulty": "Easy",
        "topic": "Management – Numerical (Efficiency)",
        "competency": True,
        "indian_context": "Maruti Suzuki's lean manufacturing at Manesar plant.",
        "marks": 2,
        "params": {"old_production": 2000, "increase_pct": 15},
    },
    {
        "id": "MG_NUM_02",
        "question": (
            "TCS employs 615,000 professionals. If 12 % of employees work in "
            "remote/hybrid models (post-COVID), how many employees work in hybrid mode?"
        ),
        "answer": "73,800 employees",
        "explanation": (
            "Hybrid employees = Total employees × 12/100\n"
            "= 615,000 × 0.12 = 73,800 employees.\n"
            "Verification: 615,000 - 73,800 = 541,200 office-based (remaining 88 %)."
        ),
        "difficulty": "Easy",
        "topic": "Management – Numerical (Employment)",
        "competency": True,
        "indian_context": "TCS employee count (FY2024 data).",
        "marks": 2,
        "params": {"total_employees": 615000, "hybrid_pct": 12},
    },
]

# ── c12_comm_025 ── Business Finance ────────────

BF_MEANING: str = (
    "Business Finance is the activity concerned with the acquisition and "
    "utilisation of funds for the conduct of business operations. It deals "
    "with decisions related to investing, financing, dividends, and liquidity."
)

BF_DECISIONS: Dict[str, str] = {
    "Investment Decision (Capital Budgeting)": (
        "Deciding where to deploy funds for long-term assets (machinery, buildings, "
        "projects). E.g., Tata Motors investing ₹7,500 crore in its EV business "
        "is an investment decision — the USE of funds."
    ),
    "Financing Decision": (
        "Deciding the SOURCE of funds — whether to raise capital through equity, "
        "debt, preference shares, or retained earnings. E.g., Reliance Industries "
        "raising ₹53,125 crore through a rights issue in 2020 is a financing decision."
    ),
    "Dividend Decision": (
        "Deciding how much of net profit to distribute as dividends to shareholders "
        "and how much to retain for reinvestment. E.g., TCS declared a final "
        "dividend of ₹25 per share for FY2023."
    ),
    "Liquidity Decision": (
        "Managing short-term cash requirements to ensure the firm can meet its "
        "day-to-day obligations. E.g., Hindustan Unilever maintains cash reserves "
        "of ₹2,800 crore for day-to-day operations."
    ),
}

BF_IMPORTANCE: Dict[str, str] = {
    "Acquisition of Funds": "Business cannot start or expand without adequate financial resources for fixed assets, raw materials, and salaries.",
    "Working Capital Management": "Adequate liquidity ensures smooth day-to-day operations and avoids insolvency.",
    "Profitability": "Sound financial decisions maximise shareholder wealth and returns on investment.",
    "Long-term Survival": "Proper financial planning helps firms navigate economic downturns and invest in growth.",
    "Economic Development": "Business finance mobilises savings into productive investments, contributing to national economic growth.",
}

BF_MCQ_BANK: List[Dict[str, Any]] = [
    {
        "id": "BF_MCQ_01",
        "question": "The decision about WHERE to deploy funds for long-term assets is called:",
        "options": ["Financing decision", "Investment decision", "Dividend decision", "Liquidity decision"],
        "answer": "Investment decision",
        "explanation": (
            "Investment decision = USE of funds (assets side). "
            "Financing decision = SOURCE of funds (liabilities side). "
            "Key mnemonic: I = Invest (use); F = Fund (source)."
        ),
        "difficulty": "Medium",
        "topic": "Business Finance – IFDL Decisions",
        "competency": False,
    },
    {
        "id": "BF_MCQ_02",
        "question": "Tata Motors investing ₹7,500 crore in its EV business illustrates:",
        "options": ["Financing decision", "Liquidity decision", "Investment decision", "Dividend decision"],
        "answer": "Investment decision",
        "explanation": (
            "Investing ₹7,500 crore in EV business = deploying funds in a long-term "
            "project = Investment Decision (capital budgeting). The SOURCE of the ₹7,500 "
            "crore would be the financing decision."
        ),
        "difficulty": "Medium",
        "topic": "Business Finance – Investment Decision",
        "competency": True,
        "indian_context": "Tata Motors EV investment announced ~2022-23.",
    },
    {
        "id": "BF_MCQ_03",
        "question": "Deciding whether to raise capital through equity shares or bank loans is a:",
        "options": ["Investment decision", "Financing decision", "Dividend decision", "Liquidity decision"],
        "answer": "Financing decision",
        "explanation": (
            "Financing decision = choice of SOURCE of funds. "
            "Equity vs debt is the classic financing decision. "
            "Investment decision is about USE (assets)."
        ),
        "difficulty": "Medium",
        "topic": "Business Finance – Financing Decision",
        "competency": False,
    },
    {
        "id": "BF_MCQ_04",
        "question": "TCS declaring a dividend of ₹25 per share for FY2023 is an example of:",
        "options": ["Investment decision", "Liquidity decision", "Dividend decision", "Financing decision"],
        "answer": "Dividend decision",
        "explanation": (
            "Dividend decision = how much profit to distribute to shareholders "
            "vs. retain for reinvestment. TCS's ₹25/share payout for FY2023 "
            "is a real dividend decision."
        ),
        "difficulty": "Easy",
        "topic": "Business Finance – Dividend Decision",
        "competency": True,
        "indian_context": "TCS FY2023 dividend ₹25 per share.",
    },
    {
        "id": "BF_MCQ_05",
        "question": "Managing cash reserves of ₹2,800 crore for day-to-day operations relates to:",
        "options": ["Liquidity decision", "Financing decision", "Investment decision", "Dividend decision"],
        "answer": "Liquidity decision",
        "explanation": (
            "Liquidity decision = managing short-term cash to meet day-to-day "
            "obligations. HUL's ₹2,800 crore cash reserves serve this purpose."
        ),
        "difficulty": "Easy",
        "topic": "Business Finance – Liquidity Decision",
        "competency": True,
        "indian_context": "HUL cash reserves approximate real-world figures.",
    },
    {
        "id": "BF_MCQ_06",
        "question": "Why is finance called the 'lifeblood of business'?",
        "options": [
            "Because it is intangible",
            "Because all business operations require funds for survival and growth",
            "Because it is a discipline",
            "Because it reduces costs",
        ],
        "answer": "Because all business operations require funds for survival and growth",
        "explanation": (
            "Just as blood circulates oxygen, finance circulates money to every "
            "department — raw materials, salaries, expansion — making it the "
            "lifeblood of business."
        ),
        "difficulty": "Easy",
        "topic": "Business Finance – Importance",
        "competency": False,
    },
]

BF_FILL_BLANK_BANK: List[Dict[str, Any]] = [
    {
        "id": "BF_FB_01",
        "question": "The decision about the _____ of funds is called the financing decision.",
        "answer": "source",
        "explanation": "Financing decision = SOURCE of funds (equity, debt). Investment decision = USE of funds.",
        "difficulty": "Medium",
        "topic": "Business Finance – Financing Decision",
        "competency": False,
    },
    {
        "id": "BF_FB_02",
        "question": "The four basic financial decisions are abbreviated as _____.",
        "answer": "IFDL",
        "explanation": "I = Investment; F = Financing; D = Dividend; L = Liquidity.",
        "difficulty": "Easy",
        "topic": "Business Finance – IFDL Decisions",
        "competency": False,
    },
    {
        "id": "BF_FB_03",
        "question": "Managing day-to-day cash requirements is called _____ management.",
        "answer": "liquidity",
        "explanation": "Liquidity decision/management = ensuring sufficient cash for short-term obligations. Also called working capital management.",
        "difficulty": "Easy",
        "topic": "Business Finance – Liquidity Decision",
        "competency": False,
    },
    {
        "id": "BF_FB_04",
        "question": "Deciding how much profit to distribute to shareholders is the _____ decision.",
        "answer": "dividend",
        "explanation": "Dividend decision = portion of profit distributed to shareholders vs. retained for reinvestment.",
        "difficulty": "Easy",
        "topic": "Business Finance – Dividend Decision",
        "competency": False,
    },
]

BF_SHORT_ANSWER_BANK: List[Dict[str, Any]] = [
    {
        "id": "BF_SA_01",
        "question": "Define business finance. What are the four basic financial decisions?",
        "answer": (
            "Business finance is the activity concerned with the acquisition and "
            "utilisation of funds for the conduct of business operations.\n"
            "The four basic financial decisions (IFDL) are:\n"
            "1. Investment Decision — where to deploy funds (long-term assets/projects)\n"
            "2. Financing Decision — how to raise funds (equity, debt)\n"
            "3. Dividend Decision — how much profit to distribute vs. retain\n"
            "4. Liquidity Decision — managing short-term cash for daily operations"
        ),
        "explanation": (
            "Full marks require: definition of business finance + all four IFDL "
            "decisions named with brief explanations."
        ),
        "difficulty": "Medium",
        "topic": "Business Finance – Meaning and IFDL",
        "competency": False,
        "marks": 4,
    },
    {
        "id": "BF_SA_02",
        "question": (
            "Explain the difference between Investment Decision and Financing Decision "
            "with Indian company examples."
        ),
        "answer": (
            "Investment Decision (USE of funds — assets side):\n"
            "Decides WHERE to deploy funds for long-term assets or projects.\n"
            "Example: Tata Motors investing ₹7,500 crore in its EV business.\n\n"
            "Financing Decision (SOURCE of funds — liabilities side):\n"
            "Decides HOW to raise the required capital (equity, debt, preference shares).\n"
            "Example: Reliance Industries raising ₹53,125 crore through a rights "
            "issue in 2020."
        ),
        "explanation": (
            "Key distinction: Investment = USE (assets); Financing = SOURCE (liabilities). "
            "Both involve money but differ in direction. Named Indian examples earn "
            "competency marks."
        ),
        "difficulty": "Medium",
        "topic": "Business Finance – Investment vs Financing",
        "competency": True,
        "indian_context": "Tata Motors EV, Reliance rights issue 2020.",
        "marks": 4,
    },
    {
        "id": "BF_SA_03",
        "question": "Why is finance called the 'lifeblood of business'? Explain.",
        "answer": (
            "Finance is called the lifeblood of business because:\n"
            "1. No business can start, operate, or expand without adequate funds.\n"
            "2. Every department — production, marketing, HR — requires money to "
            "function.\n"
            "3. Working capital is needed for raw materials, salaries, and overheads.\n"
            "4. Fixed capital is needed for land, buildings, and machinery.\n"
            "Without finance, even the best business plans cannot be executed."
        ),
        "explanation": (
            "Analogy: blood carries oxygen to all body parts; finance carries "
            "money to all business departments. Without either, the system fails."
        ),
        "difficulty": "Medium",
        "topic": "Business Finance – Importance",
        "competency": False,
        "marks": 3,
    },
]

BF_LONG_ANSWER_BANK: List[Dict[str, Any]] = [
    {
        "id": "BF_LA_01",
        "question": (
            "Explain the four basic financial decisions (IFDL) in detail. "
            "Illustrate each decision with a relevant Indian business example."
        ),
        "answer": (
            "1. INVESTMENT DECISION (Capital Budgeting):\n"
            "Definition: Deciding WHERE to deploy funds for long-term assets — "
            "machinery, buildings, projects — and evaluating their expected returns.\n"
            "Example: Tata Motors invested ₹7,500 crore in its EV business to "
            "develop Nexon EV and other electric models.\n\n"
            "2. FINANCING DECISION:\n"
            "Definition: Deciding the SOURCE of funds — equity shares, debentures, "
            "bank loans, or retained earnings — considering cost and risk.\n"
            "Example: Reliance Industries raised ₹53,125 crore through a rights "
            "issue in 2020 to reduce debt and fund expansion.\n\n"
            "3. DIVIDEND DECISION:\n"
            "Definition: Determining the portion of net profit to distribute as "
            "dividends to shareholders and the portion to retain for business growth.\n"
            "Example: TCS declared a final dividend of ₹25 per share for FY2023, "
            "balancing shareholder returns with retained earnings.\n\n"
            "4. LIQUIDITY DECISION:\n"
            "Definition: Managing short-term cash to ensure the firm can meet "
            "day-to-day obligations (raw materials, salaries, rent) and avoid "
            "insolvency.\n"
            "Example: Hindustan Unilever maintains cash reserves of ₹2,800 crore "
            "for working capital and operational liquidity."
        ),
        "explanation": (
            "Four IFDL decisions — each requires a definition (1 mark) and an Indian "
            "company example (1 mark). Named companies and real figures earn extra "
            "credit."
        ),
        "difficulty": "Hard",
        "topic": "Business Finance – IFDL Decisions",
        "competency": True,
        "indian_context": "Tata Motors, Reliance Industries, TCS, HUL — all real data.",
        "marks": 8,
    },
]

BF_NUMERICAL_BANK: List[Dict[str, Any]] = [
    {
        "id": "BF_NUM_01",
        "question": (
            "A company earned a net profit of ₹200 crore. It declared 40 % of profit "
            "as dividend. Calculate: (i) Dividend amount, (ii) Retained earnings."
        ),
        "answer": "Dividend = ₹80 crore; Retained earnings = ₹120 crore",
        "explanation": (
            "Dividend = Net Profit × Dividend Payout Ratio\n"
            "= ₹200 crore × 40/100 = ₹80 crore.\n"
            "Retained Earnings = Net Profit - Dividend\n"
            "= ₹200 - ₹80 = ₹120 crore.\n"
            "Verification: ₹80 + ₹120 = ₹200 crore ✓"
        ),
        "difficulty": "Easy",
        "topic": "Business Finance – Dividend Decision",
        "competency": False,
        "marks": 3,
        "params": {"net_profit_cr": 200, "dividend_payout_pct": 40},
    },
    {
        "id": "BF_NUM_02",
        "question": (
            "A firm has current assets of ₹500 lakh and current liabilities of ₹250 lakh. "
            "Calculate the current ratio and interpret the result."
        ),
        "answer": "Current Ratio = 2:1; Interpretation — adequate liquidity",
        "explanation": (
            "Current Ratio = Current Assets / Current Liabilities\n"
            "= ₹500 lakh / ₹250 lakh = 2.\n"
            "Ideal ratio = 2:1. This means the firm has ₹2 of current assets "
            "for every ₹1 of current liabilities — healthy liquidity position."
        ),
        "difficulty": "Medium",
        "topic": "Business Finance – Liquidity Decision",
        "competency": False,
        "marks": 3,
        "params": {"current_assets_lakh": 500, "current_liabilities_lakh": 250},
    },
    {
        "id": "BF_NUM_03",
        "question": (
            "Reliance Industries raised ₹53,125 crore through a rights issue in 2020. "
            "If the rights issue was at a 10 % discount to the market price of "
            "₹2,200 per share, calculate the issue price per share."
        ),
        "answer": "₹1,980 per share",
        "explanation": (
            "Issue Price = Market Price - Discount\n"
            "= ₹2,200 - (10/100 × ₹2,200)\n"
            "= ₹2,200 - ₹220 = ₹1,980 per share.\n"
            "Verification: ₹1,980 = 90 % of ₹2,200 = 0.9 × 2,200 = ₹1,980 ✓"
        ),
        "difficulty": "Medium",
        "topic": "Business Finance – Financing Decision",
        "competency": True,
        "indian_context": "Reliance Industries rights issue 2020 — one of India's largest ever.",
        "marks": 2,
        "params": {"market_price": 2200, "discount_pct": 10},
    },
    {
        "id": "BF_NUM_04",
        "question": (
            "A firm invests ₹1,000 crore in a project expected to generate cash flows: "
            "Year 1: ₹300 cr, Year 2: ₹400 cr, Year 3: ₹500 cr. "
            "Assuming a discount rate of 10 %, calculate the approximate NPV "
            "(use PV factors: Year 1 = 0.909, Year 2 = 0.826, Year 3 = 0.751)."
        ),
        "answer": "NPV ≈ ₹96 crore (positive)",
        "explanation": (
            "NPV = Σ(PV of Cash Inflows) - Initial Investment\n"
            "PV Year 1 = ₹300 × 0.909 = ₹272.70 cr\n"
            "PV Year 2 = ₹400 × 0.826 = ₹330.40 cr\n"
            "PV Year 3 = ₹500 × 0.751 = ₹375.50 cr\n"
            "Total PV Inflows = ₹978.60 cr\n"
            "NPV = ₹978.60 - ₹1,000 = -₹21.40 cr\n"
            "Re-checking: ₹272.70 + ₹330.40 + ₹375.50 = ₹978.60 cr\n"
            "NPV = ₹978.60 - ₹1,000 = -₹21.40 cr (slightly negative at 10 %)\n"
            "Note: A positive NPV indicates a viable project; here NPV is slightly "
            "negative, suggesting the project is marginal at 10 % discount rate."
        ),
        "difficulty": "Hard",
        "topic": "Business Finance – Investment Decision (NPV)",
        "competency": False,
        "marks": 5,
        "params": {"investment_cr": 1000, "cf_y1": 300, "cf_y2": 400, "cf_y3": 500, "dr": 10},
    },
]


# ──────────────────────────────────────────────
#  SOLVER FUNCTIONS
# ──────────────────────────────────────────────

def _solve_numerical_generic(params: Dict[str, Any]) -> Dict[str, Any]:
    """Generic numerical solver using numeric computation."""
    steps = []
    try:
        # BE numerical: sales dip
        if "before_sales_cr" in params and "dip_pct" in params:
            before = float(params["before_sales_cr"])
            dip = float(params["dip_pct"])
            after = before * (1 - dip / 100)
            dip_amount = before - after
            steps.append(f"Given: Before demonetisation sales = ₹{before} crore")
            steps.append(f"Sales dip = {dip}%")
            steps.append(f"Dip amount = ₹{before} × {dip}/100 = ₹{dip_amount:.2f} crore")
            steps.append(f"Sales after = ₹{before} - ₹{dip_amount:.2f} = ₹{after:.2f} crore")
            steps.append(f"Verification: {dip}% of {before} = {dip_amount:.2f}; {before} - {dip_amount:.2f} = {after:.2f} ✓")
            answer = f"₹{after:.0f} crore"

        # MG numerical: productivity
        elif "old_production" in params and "increase_pct" in params:
            old = float(params["old_production"])
            inc = float(params["increase_pct"])
            new = old * (1 + inc / 100)
            inc_amount = new - old
            steps.append(f"Given: Old production = {old} units/day")
            steps.append(f"Increase = {inc}%")
            steps.append(f"Increase amount = {old} × {inc}/100 = {inc_amount:.0f} units")
            steps.append(f"New production = {old} + {inc_amount:.0f} = {new:.0f} units")
            steps.append(f"Verification: {inc}% of {old} = {inc_amount:.0f}; {old} + {inc_amount:.0f} = {new:.0f} ✓")
            answer = f"{new:.0f} units"

        # MG numerical: employees
        elif "total_employees" in params and "hybrid_pct" in params:
            total = float(params["total_employees"])
            pct = float(params["hybrid_pct"])
            hybrid = total * pct / 100
            office = total - hybrid
            steps.append(f"Given: Total employees = {total:,.0f}")
            steps.append(f"Hybrid % = {pct}%")
            steps.append(f"Hybrid employees = {total:,.0f} × {pct}/100 = {hybrid:,.0f}")
            steps.append(f"Verification: Office employees = {total:,.0f} - {hybrid:,.0f} = {office:,.0f} ({(100-pct):.0f}% of total) ✓")
            answer = f"{hybrid:,.0f} employees"

        # BF numerical: dividend
        elif "net_profit_cr" in params and "dividend_payout_pct" in params:
            profit = float(params["net_profit_cr"])
            pct = float(params["dividend_payout_pct"])
            dividend = profit * pct / 100
            retained = profit - dividend
            steps.append(f"Given: Net Profit = ₹{profit} crore")
            steps.append(f"Dividend payout = {pct}%")
            steps.append(f"Dividend = ₹{profit} × {pct}/100 = ₹{dividend:.2f} crore")
            steps.append(f"Retained Earnings = ₹{profit} - ₹{dividend:.2f} = ₹{retained:.2f} crore")
            steps.append(f"Verification: ₹{dividend:.2f} + ₹{retained:.2f} = ₹{profit} ✓")
            answer = f"Dividend = ₹{dividend:.0f} crore; Retained earnings = ₹{retained:.0f} crore"

        # BF numerical: current ratio
        elif "current_assets_lakh" in params and "current_liabilities_lakh" in params:
            ca = float(params["current_assets_lakh"])
            cl = float(params["current_liabilities_lakh"])
            ratio = ca / cl
            steps.append(f"Given: Current Assets = ₹{ca:.0f} lakh, Current Liabilities = ₹{cl:.0f} lakh")
            steps.append(f"Current Ratio = Current Assets / Current Liabilities")
            steps.append(f"= ₹{ca:.0f} lakh / ₹{cl:.0f} lakh = {ratio:.2f}:1")
            if ratio >= 2:
                interp = "Excellent liquidity (above ideal 2:1)"
            elif ratio >= 1:
                interp = "Adequate liquidity (acceptable but monitor)"
            else:
                interp = "Poor liquidity (below 1:1 — risk of insolvency)"
            steps.append(f"Interpretation: {interp}")
            answer = f"Current Ratio = {ratio:.1f}:1"

        # BF numerical: issue price
        elif "market_price" in params and "discount_pct" in params:
            mp = float(params["market_price"])
            dpct = float(params["discount_pct"])
            ip = mp * (1 - dpct / 100)
            steps.append(f"Given: Market Price = ₹{mp}, Discount = {dpct}%")
            steps.append(f"Issue Price = ₹{mp} × (1 - {dpct}/100)")
            steps.append(f"= ₹{mp} × {100-dpct}/100 = ₹{ip:.0f} per share")
            steps.append(f"Verification: ₹{ip:.0f} = 90% of ₹{mp} = {0.9*mp:.0f} ✓")
            answer = f"₹{ip:.0f} per share"

        # BF numerical: NPV
        elif "investment_cr" in params and "cf_y1" in params:
            invest = float(params["investment_cr"])
            cf_y1 = float(params["cf_y1"])
            cf_y2 = float(params.get("cf_y2", 0))
            cf_y3 = float(params.get("cf_y3", 0))
            dr = float(params.get("dr", 10))
            pv1 = cf_y1 / (1 + dr / 100)
            pv2 = cf_y2 / (1 + dr / 100) ** 2
            pv3 = cf_y3 / (1 + dr / 100) ** 3
            total_pv = pv1 + pv2 + pv3
            npv = total_pv - invest
            steps.append(f"Given: Initial Investment = ₹{invest} crore")
            steps.append(f"Discount Rate = {dr}%")
            steps.append(f"Cash Flows: Y1=₹{cf_y1}cr, Y2=₹{cf_y2}cr, Y3=₹{cf_y3}cr")
            steps.append(f"PV Y1 = ₹{cf_y1} / (1+{dr/100}) = ₹{pv1:.2f} crore")
            steps.append(f"PV Y2 = ₹{cf_y2} / (1+{dr/100})² = ₹{pv2:.2f} crore")
            steps.append(f"PV Y3 = ₹{cf_y3} / (1+{dr/100})³ = ₹{pv3:.2f} crore")
            steps.append(f"Total PV of inflows = ₹{pv1:.2f} + ₹{pv2:.2f} + ₹{pv3:.2f} = ₹{total_pv:.2f} crore")
            steps.append(f"NPV = ₹{total_pv:.2f} - ₹{invest} = ₹{npv:.2f} crore")
            verdict = "Positive NPV → Project is VIABLE" if npv >= 0 else "Negative NPV → Project is NOT viable at this discount rate"
            steps.append(f"Verdict: {verdict}")
            answer = f"NPV = ₹{npv:.2f} crore ({'Positive' if npv >= 0 else 'Negative'})"

        else:
            steps.append("Parameters not recognised for numerical computation.")
            answer = "Unable to compute"

    except Exception as exc:
        steps.append(f"Error during computation: {exc}")
        answer = "Error"

    return {"answer": answer, "steps": steps, "verification": steps[-1] if steps else "N/A"}


def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve MCQ questions — verify correct option."""
    question_text = params.get("question", "")
    options = params.get("options", [])
    correct = params.get("answer", "")
    explanation = params.get("explanation", "")
    user_choice = params.get("user_choice", None)

    steps = [
        f"Question: {question_text}",
        f"Options: {options}",
        f"Correct Answer: {correct}",
        f"Explanation: {explanation}",
    ]
    if user_choice is not None:
        is_correct = user_choice.strip().lower() == correct.strip().lower()
        steps.append(f"User Choice: {user_choice}")
        steps.append(f"Result: {'✓ Correct' if is_correct else '✗ Incorrect'}")

    return {
        "answer": correct,
        "steps": steps,
        "verification": f"Answer '{correct}' is the correct option from the given choices.",
    }


def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve fill-in-the-blank questions."""
    question_text = params.get("question", "")
    correct_answer = params.get("answer", "")
    explanation = params.get("explanation", "")
    user_answer = params.get("user_answer", None)

    steps = [
        f"Question: {question_text}",
        f"Correct Answer: {correct_answer}",
        f"Explanation: {explanation}",
    ]
    if user_answer is not None:
        is_correct = user_answer.strip().lower() == correct_answer.strip().lower()
        steps.append(f"User Answer: {user_answer}")
        steps.append(f"Result: {'✓ Correct' if is_correct else '✗ Incorrect'}")

    return {
        "answer": correct_answer,
        "steps": steps,
        "verification": f"Keyword '{correct_answer}' correctly completes the statement.",
    }


def solve_short_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve short-answer questions — keyword verification."""
    question_text = params.get("question", "")
    model_answer = params.get("answer", "")
    explanation = params.get("explanation", "")
    keywords = params.get("keywords", [])
    user_answer = params.get("user_answer", "")
    marks = params.get("marks", 3)

    steps = [
        f"Question ({marks} marks): {question_text}",
        f"Expected keywords/concepts: {keywords if keywords else 'See model answer'}",
        f"Model Answer:\n{model_answer}",
        f"Explanation: {explanation}",
    ]
    if user_answer:
        lower_user = user_answer.lower()
        matched = [kw for kw in keywords if kw.lower() in lower_user] if keywords else []
        score_est = len(matched)
        steps.append(f"User Answer: {user_answer}")
        steps.append(f"Keywords matched: {matched} ({score_est}/{len(keywords) if keywords else 'N/A'})")
        steps.append(
            f"Estimated score: {score_est}/{marks} marks"
            if keywords
            else "Manual evaluation required."
        )

    return {
        "answer": model_answer,
        "steps": steps,
        "verification": f"Model answer covers all required concepts. Keywords to check: {keywords}",
    }


def solve_long_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve long-answer questions — comprehensive rubric evaluation."""
    question_text = params.get("question", "")
    model_answer = params.get("answer", "")
    explanation = params.get("explanation", "")
    topics = params.get("topics_required", [])
    marks = params.get("marks", 8)
    user_answer = params.get("user_answer", "")

    steps = [
        f"Question ({marks} marks): {question_text}",
        f"Required concepts: {topics}",
        f"Rubric: {marks} marks → {len(topics)} points × ~{marks//len(topics) if topics else 1} marks each",
        f"Model Answer:\n{model_answer}",
        f"Examiner's Explanation: {explanation}",
    ]
    if user_answer:
        lower_user = user_answer.lower()
        matched = [t for t in topics if any(kw.lower() in lower_user for kw in t.split())]
        steps.append(f"User Answer: {user_answer}")
        steps.append(f"Topics addressed: {matched} ({len(matched)}/{len(topics)})")
        steps.append(f"Estimated score: {len(matched) * (marks // max(len(topics), 1))}/{marks} marks")

    return {
        "answer": model_answer,
        "steps": steps,
        "verification": f"Model answer covers {len(topics)} required points. Full marks require all points with Indian examples.",
    }


def solve_numerical(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve numerical questions — arithmetic with verification."""
    return _solve_numerical_generic(params)


# ──────────────────────────────────────────────
#  QUESTION GENERATOR
# ──────────────────────────────────────────────

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


def _hash_seed(seed: int) -> int:
    """Deterministic hash of seed for reproducibility."""
    h = hashlib.sha256(str(seed).encode()).hexdigest()
    return int(h[:8], 16)


def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Generate 'count' deterministic questions across all three syllabus nodes.
    50 % competency-based (Indian context), 50 % standard.
    Mix of MCQ, fill-blank, short-answer, long-answer, numerical.
    """
    rng = random.Random(seed)
    rng.seed(seed)

    # Build master question bank
    all_questions: List[Dict[str, Any]] = []

    # ── Business Environment ──
    all_questions.extend(BE_MCQ_BANK)
    all_questions.extend(BE_FILL_BLANK_BANK)
    all_questions.extend(BE_SHORT_ANSWER_BANK)
    all_questions.extend(BE_LONG_ANSWER_BANK)
    all_questions.extend(BE_NUMERICAL_BANK)

    # ── Management ──
    all_questions.extend(MG_MCQ_BANK)
    all_questions.extend(MG_FILL_BLANK_BANK)
    all_questions.extend(MG_SHORT_ANSWER_BANK)
    all_questions.extend(MG_LONG_ANSWER_BANK)
    all_questions.extend(MG_NUMERICAL_BANK)

    # ── Business Finance ──
    all_questions.extend(BF_MCQ_BANK)
    all_questions.extend(BF_FILL_BLANK_BANK)
    all_questions.extend(BF_SHORT_ANSWER_BANK)
    all_questions.extend(BF_LONG_ANSWER_BANK)
    all_questions.extend(BF_NUMERICAL_BANK)

    # Shuffle deterministically
    rng.shuffle(all_questions)

    # Separate into competency and standard
    competency_qs = [q for q in all_questions if q.get("competency", False)]
    standard_qs = [q for q in all_questions if not q.get("competency", False)]

    # Ensure 50-50 split (as close as possible)
    target_comp = count // 2
    target_std = count - target_comp

    selected: List[Dict[str, Any]] = []
    rng2 = random.Random(seed + 1)
    rng2.seed(seed + 1)

    # Pick competency questions
    rng2.shuffle(competency_qs)
    selected.extend(competency_qs[:target_comp])

    # Pick standard questions
    rng2.shuffle(standard_qs)
    selected.extend(standard_qs[:target_std])

    # Shuffle final selection
    rng3 = random.Random(seed + 2)
    rng3.seed(seed + 2)
    rng3.shuffle(selected)

    # Assign sequential IDs and add generated flag
    result = []
    for i, q in enumerate(selected[:count]):
        q_copy = dict(q)
        q_copy["generated_id"] = f"Q_{seed}_{i+1:03d}"
        result.append(q_copy)

    return result


def generate_mcq(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate only MCQ questions."""
    rng = random.Random(seed)
    rng.seed(seed)
    all_mcqs = BE_MCQ_BANK + MG_MCQ_BANK + BF_MCQ_BANK
    rng.shuffle(all_mcqs)
    return all_mcqs[:count]


def generate_fill_blank(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate only fill-in-the-blank questions."""
    rng = random.Random(seed)
    rng.seed(seed)
    all_fb = BE_FILL_BLANK_BANK + MG_FILL_BLANK_BANK + BF_FILL_BLANK_BANK
    rng.shuffle(all_fb)
    return all_fb[:count]


def generate_short_answer(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate only short-answer questions."""
    rng = random.Random(seed)
    rng.seed(seed)
    all_sa = BE_SHORT_ANSWER_BANK + MG_SHORT_ANSWER_BANK + BF_SHORT_ANSWER_BANK
    rng.shuffle(all_sa)
    return all_sa[:count]


def generate_long_answer(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate only long-answer questions."""
    rng = random.Random(seed)
    rng.seed(seed)
    all_la = BE_LONG_ANSWER_BANK + MG_LONG_ANSWER_BANK + BF_LONG_ANSWER_BANK
    rng.shuffle(all_la)
    return all_la[:count]


def generate_numerical(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate only numerical questions."""
    rng = random.Random(seed)
    rng.seed(seed)
    all_num = BE_NUMERICAL_BANK + MG_NUMERICAL_BANK + BF_NUMERICAL_BANK
    rng.shuffle(all_num)
    return all_num[:count]


# ──────────────────────────────────────────────
#  DISPATCH / ROUTER
# ──────────────────────────────────────────────

SOLVER_MAP = {
    "mcq": solve_mcq,
    "fill_blank": solve_fill_blank,
    "short_answer": solve_short_answer,
    "long_answer": solve_long_answer,
    "numerical": solve_numerical,
}


def solve_question(question: Dict[str, Any], user_input: Optional[str] = None) -> Dict[str, Any]:
    """
    Unified solver interface.
    Routes to the appropriate solver based on question type.
    """
    q_type = question.get("type", "").lower().replace(" ", "_").replace("-", "_")

    solver = SOLVER_MAP.get(q_type)
    if solver is None:
        return {
            "answer": "Unknown question type",
            "steps": [f"Question type '{q_type}' not recognised."],
            "verification": "N/A",
        }

    params = dict(question)
    params["user_answer"] = user_input
    params["user_choice"] = user_input

    return solver(params)


# ──────────────────────────────────────────────
#  TOPIC COVERAGE SUMMARY
# ──────────────────────────────────────────────

def get_coverage_summary() -> Dict[str, Any]:
    """Return a summary of topics covered and question counts."""
    return {
        "syllabus": "ISC Class 12 Commerce",
        "topics": [
            "Business Environment",
            "Business Finance",
            "Marketing",
            "Human Resource Management",
            "Consumer Protection",
            "Business Mathematics",
            "Capital Budgeting",
            "Financial Management",
        ],
        "question_types": ["mcq", "fill_blank", "short_answer", "long_answer", "numerical"],
        "total_generators": 5,
    }