"""
CISCE Class 11 Business Studies — Deterministic Question Generator
Covers: Ch1 Meaning & Features of Business, Ch2 Forms of Business Organisation,
        Ch3 e-Business
"""

import random
import hashlib
import math
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any

# ---------------------------------------------------------------------------
# Deterministic seed helper
# ---------------------------------------------------------------------------
def make_deterministic_rng(seed: int) -> random.Random:
    """Return an isolated Random instance from a base seed."""
    return random.Random(seed)


# ============================================================
# QUESTION-BANK DATA  (static — covers every syllabus node)
# ============================================================

# ---------------------------------------------------------------------------
# NODE c11_bs_001  Meaning and Features of Business
# ---------------------------------------------------------------------------
NODE_001_MCQ = [
    {
        "id": "bs001_mcq_01",
        "type": "MCQ",
        "topic": "Meaning and Features of Business",
        "difficulty": "Easy",
        "question": "Which of the following activities is NOT classified as a business activity?",
        "options": [
            "A. Reliance Industries producing polyester fibre",
            "B. A farmer in Punjab selling wheat to FCI mandis",
            "C. A housewife selling her old car once to buy a new fridge",
            "D. Flipkart procuring electronics from Samsung and selling online",
        ],
        "answer": "C",
        "explanation": (
            "Business requires REGULARITY in dealings. A one-time sale of a personal "
            "car by a housewife lacks the element of regularity and is therefore not "
            "a business activity. Options A, B, and D involve regular production or "
            "exchange of goods for profit."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs001_mcq_02",
        "type": "MCQ",
        "topic": "Meaning and Features of Business",
        "difficulty": "Easy",
        "question": (
            "Dr. Meera runs a private cardiology clinic in Mumbai, charging patients "
            "for consultations. According to the syllabus, this activity is BEST "
            "classified as:"
        ),
        "options": [
            "A. Business",
            "B. Profession",
            "C. Employment",
            "D. Voluntary social work",
        ],
        "answer": "B",
        "explanation": (
            "A doctor's clinic is a PROFESSION, not a business. A profession requires "
            "specialised expert knowledge and skill, personal service, and is governed "
            "by a professional body (e.g., Medical Council of India). Unlike business, "
            "it does not primarily involve production or exchange of goods."
        ),
        "competency_tag": True,  # Indian context
    },
    {
        "id": "bs001_mcq_03",
        "type": "MCQ",
        "topic": "Meaning and Features of Business",
        "difficulty": "Easy",
        "question": (
            "Which of the following is NOT one of the six essential features of "
            "business as defined in the CISCE Class 11 syllabus?"
        ),
        "options": [
            "A. Economic activity",
            "B. Production or procurement of goods",
            "C. Profit motive",
            "D. Government licence",
        ],
        "answer": "D",
        "explanation": (
            "The six features of business are: (1) economic activity, (2) production "
            "or procurement of goods/services, (3) sale or exchange of goods/services, "
            "(4) regularity in dealings, (5) profit motive, (6) element of risk. "
            "Government licence is NOT listed as a core feature."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs001_mcq_04",
        "type": "MCQ",
        "topic": "Meaning and Features of Business",
        "difficulty": "Medium",
        "question": (
            "Priya buys a smartphone online, uses it for 3 years and then sells it "
            "on OLX. This transaction is NOT business because it lacks:"
        ),
        "options": [
            "A. A profit motive",
            "B. Regularity in dealings",
            "C. Production or procurement",
            "D. Both A and B",
        ],
        "answer": "B",
        "explanation": (
            "The key missing element is REGULARITY. A single sale of a used personal "
            "item does not constitute regular dealings, which is a core feature of "
            "business. While a profit motive may also be absent or minimal, the "
            "primary reason is the lack of regularity."
        ),
        "competency_tag": True,
    },
    {
        "id": "bs001_mcq_05",
        "type": "MCQ",
        "topic": "Meaning and Features of Business",
        "difficulty": "Medium",
        "question": (
            "An individual engages in an activity only when it provides a personal "
            "satisfaction that cannot be measured in monetary terms. This describes:"
        ),
        "options": [
            "A. Business",
            "B. Profession",
            "C. Employment",
            "D. All of the above",
        ],
        "answer": "B",
        "explanation": (
            "In a PROFESSION, the reward is primarily professional (personal "
            "satisfaction, service, reputation), not purely monetary profit. "
            "Business is driven by profit; employment provides a salary/wage."
        ),
        "competency_tag": False,
    },
]

NODE_001_FILL = [
    {
        "id": "bs001_fill_01",
        "type": "Fill in the Blank",
        "topic": "Meaning and Features of Business",
        "difficulty": "Easy",
        "question": "Business is an economic activity involving regular _______ or exchange of goods and services.",
        "answer": "production",
        "explanation": (
            "Business is defined as an economic activity involving regular PRODUCTION "
            "or exchange of goods and services undertaken for profit."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs001_fill_02",
        "type": "Fill in the Blank",
        "topic": "Meaning and Features of Business",
        "difficulty": "Easy",
        "question": "The element of _______ makes business different from other economic activities.",
        "answer": "risk",
        "explanation": (
            "RISK is an essential feature of business. Every business faces the risk "
            "of loss due to factors beyond its control (e.g., fire, theft, market "
            "fluctuations, government policy changes)."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs001_fill_03",
        "type": "Fill in the Blank",
        "topic": "Meaning and Features of Business",
        "difficulty": "Medium",
        "question": "A teacher working in a government school draws a monthly salary. This is an example of _______.",
        "answer": "employment",
        "explanation": (
            "EMPLOYMENT is when a person works for another (employer) and receives a "
            "wage or salary. The teacher does not own the school, does not bear the "
            "business risk, and has no profit motive."
        ),
        "competency_tag": True,
    },
    {
        "id": "bs001_fill_04",
        "type": "Fill in the Blank",
        "topic": "Meaning and Features of Business",
        "difficulty": "Medium",
        "question": "The uncertainty of earning profit in business is referred to as _______ of return.",
        "answer": "uncertainty",
        "explanation": (
            "UNCERTAINTY OF RETURN means the profit a business earns is not guaranteed; "
            "it depends on many internal and external factors. This is an essential "
            "feature distinguishing business from a salaried job."
        ),
        "competency_tag": False,
    },
]

NODE_001_SHORT = [
    {
        "id": "bs001_short_01",
        "type": "Short Answer",
        "topic": "Meaning and Features of Business",
        "difficulty": "Easy",
        "question": "Define 'Business' in the context of Class 11 Business Studies.",
        "answer": (
            "Business is a human economic activity involving regular production or "
            "exchange of goods and services with the objective of earning profit. "
            "It is characterised by regularity, production/procurement, sale/exchange, "
            "profit motive, and risk-bearing."
        ),
        "explanation": (
            "Key elements in the definition: (1) human economic activity, (2) regular "
            "production OR exchange, (3) goods and/or services, (4) undertaken for profit."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs001_short_02",
        "type": "Short Answer",
        "topic": "Meaning and Features of Business",
        "difficulty": "Easy",
        "question": (
            "State any FOUR essential features of a business activity with one "
            "suitable example for each."
        ),
        "answer": (
            "(1) Economic activity — a textile mill producing cloth.\n"
            "(2) Production or procurement of goods — a wholesaler procuring grains "
            "from mandis.\n"
            "(3) Sale or exchange — a retailer selling products to consumers.\n"
            "(4) Profit motive — Infosys aiming for annual profit growth.\n"
            "(5) Regularity in dealings — weekly vegetable vendor at a market.\n"
            "(6) Element of risk — restaurant facing risk of losses during a lockdown."
        ),
        "explanation": (
            "All six features are interlinked; absence of any one means the activity "
            "cannot be called a business."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs001_short_03",
        "type": "Short Answer",
        "topic": "Meaning and Features of Business",
        "difficulty": "Medium",
        "competency_tag": True,
        "question": (
            "Rahul, a chartered accountant, runs his own CA firm in Bengaluru and "
            "charges clients for tax and audit services. He bears the risk of "
            "client defaults. Is his activity a business or a profession? Justify "
            "your answer with TWO reasons."
        ),
        "answer": (
            "Rahul's activity is a PROFESSION, not a business. Reasons:\n"
            "(1) It requires specialised expert knowledge (Chartered Accountancy "
            "qualification from ICAI).\n"
            "(2) The service is personal and professional in nature (tax advice, "
            "audit), not the production or exchange of tangible goods.\n"
            "Although he charges fees and bears risk (features shared with business), "
            "the dominant characteristic is specialised knowledge and service, which "
            "makes it a profession."
        ),
        "explanation": (
            "Distinguish business vs profession: Business = production/exchange of "
            "goods/services for profit; Profession = specialised knowledge, personal "
            "service, professional body membership."
        ),
    },
]

NODE_001_LONG = [
    {
        "id": "bs001_long_01",
        "type": "Long Answer",
        "topic": "Meaning and Features of Business",
        "difficulty": "Medium",
        "competency_tag": False,
        "question": (
            "Distinguish clearly between Business, Profession, and Employment on "
            "the basis of (a) Basic Requirement, (b) Reward, and (c) Risk-bearing. "
            "Give ONE Indian example for each."
        ),
        "answer": (
            "BASIS             | BUSINESS          | PROFESSION         | EMPLOYMENT\n"
            "------------------|-------------------|--------------------|------------\n"
            "Basic Requirement | Capital/Enterprise | Specialised Knowledge | Qualification/Skill\n"
            "Reward            | Profit            | Fee (professional) | Salary/Wage\n"
            "Risk-bearing      | Full risk of loss | Limited (clients) | None (fixed salary)\n\n"
            "Examples:\n"
            "• Business: Reliance Retail Pvt. Ltd. — regular exchange of goods for profit.\n"
            "• Profession: Dr. Devi Shetty's Narayana Health — specialised medical services.\n"
            "• Employment: Software engineer at TCS, Hyderabad — draws monthly salary."
        ),
        "explanation": (
            "This three-way comparison is a high-frequency examination topic in CISCE. "
            "Memorise the comparison basis: Basic Requirement, Reward, Risk-bearing, "
            "Transfer of Interest, and Code of Conduct."
        ),
    },
    {
        "id": "bs001_long_02",
        "type": "Long Answer",
        "topic": "Meaning and Features of Business",
        "difficulty": "Medium",
        "competency_tag": True,
        "question": (
            "The government of India encourages farmers in Madhya Pradesh to sell "
            "their soybean crop directly to private buyers through e-NAM mandis "
            "rather than only through local APMC markets. Explain why this regular "
            "sale of agricultural produce qualifies as a 'business' activity. "
            "Also discuss whether a one-time sale of a tractor by a farmer would "
            "qualify."
        ),
        "answer": (
            "Regular sale of soybean through e-NAM is BUSINESS because:\n"
            "(1) It is an economic activity involving regular exchange of goods (soybean).\n"
            "(2) It involves production (farming) and sale/exchange.\n"
            "(3) It is undertaken for profit (farmers earn income from crop sales).\n"
            "(4) There is regularity in dealings (seasonal but predictable annual cycle).\n"
            "(5) It carries risk (crop failure, price volatility).\n\n"
            "A one-time sale of a tractor by a farmer is NOT business because it "
            "lacks REGULARITY in dealings — it is a single, isolated transaction "
            "of a capital asset."
        ),
        "explanation": (
            "This question tests the learner's ability to apply the definition of "
            "business to a real Indian economic scenario (e-NAM mandis). Key concept: "
            "regularity is the deciding factor."
        ),
    },
]

# ---------------------------------------------------------------------------
# NODE c11_bs_006  Forms of Business Organisation
# ---------------------------------------------------------------------------
NODE_006_MCQ = [
    {
        "id": "bs006_mcq_01",
        "type": "MCQ",
        "topic": "Forms of Business Organisation",
        "difficulty": "Medium",
        "question": (
            "As of 2023, the Government of India holds approximately 58.89% stake "
            "in which of the following enterprises?"
        ),
        "options": [
            "A. Reliance Industries Ltd",
            "B. Oil and Natural Gas Corporation Ltd (ONGC)",
            "C. Tata Consultancy Services Ltd",
            "D. Infosys Ltd",
        ],
        "answer": "B",
        "explanation": (
            "ONGC is a PUBLIC SECTOR Undertaking (PSU) where the Government of India "
            "holds majority ownership (~58.89% as of 2023). Options A, C, and D are "
            "private sector enterprises."
        ),
        "competency_tag": True,
    },
    {
        "id": "bs006_mcq_02",
        "type": "MCQ",
        "topic": "Forms of Business Organisation",
        "difficulty": "Medium",
        "question": (
            "The Delhi Metro Rail Corporation Ltd is an example of which form of "
            "business organisation?"
        ),
        "options": [
            "A. Private Sector",
            "B. Public Sector",
            "C. Joint Sector / PPP",
            "D. Cooperative Society",
        ],
        "answer": "C",
        "explanation": (
            "DMRC is a JOINT SECTOR / PPP enterprise jointly promoted by the "
            "Government of India and the Government of NCT of Delhi. This combines "
            "public welfare objectives with private sector efficiency."
        ),
        "competency_tag": True,
    },
    {
        "id": "bs006_mcq_03",
        "type": "MCQ",
        "topic": "Forms of Business Organisation",
        "difficulty": "Easy",
        "question": (
            "A common student confusion is that 'public sector' means a company "
            "whose shares are sold to the public. In reality, 'public sector' "
            "means:"
        ),
        "options": [
            "A. A company listed on the stock exchange",
            "B. A company majority-owned and controlled by the government",
            "C. A company serving the general public",
            "D. A non-profit organisation",
        ],
        "answer": "B",
        "explanation": (
            "PUBLIC SECTOR means the GOVERNMENT owns the majority stake and controls "
            "the enterprise. This is different from 'public limited company' (PLC), "
            "which refers to a company whose shares are traded on the stock market "
            "and can be owned by the general public. The word 'public' is used in "
            "two different senses — this is the source of the common confusion."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs006_mcq_04",
        "type": "MCQ",
        "topic": "Forms of Business Organisation",
        "difficulty": "Medium",
        "question": (
            "In a public sector enterprise, the primary source of capital is:"
        ),
        "options": [
            "A. Public share subscriptions",
            "B. Government budget allocations and retained earnings",
            "C. Foreign direct investment only",
            "D. Bank loans only",
        ],
        "answer": "B",
        "explanation": (
            "In the PUBLIC SECTOR, capital comes primarily from GOVERNMENT BUDGET "
            "allocations and retained earnings of the enterprise itself, not from "
            "public share subscriptions (unlike a public limited company in the "
            "private sector)."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs006_mcq_05",
        "type": "MCQ",
        "topic": "Forms of Business Organisation",
        "difficulty": "Easy",
        "question": (
            "Which sector prioritises SOCIAL WELFARE and NATIONAL DEVELOPMENT as "
            "primary objectives rather than profit?"
        ),
        "options": [
            "A. Private Sector",
            "B. Public Sector",
            "C. Joint Sector",
            "D. All sectors equally",
        ],
        "answer": "B",
        "explanation": (
            "The PUBLIC SECTOR's primary objectives include social welfare, national "
            "development, employment generation, and balanced regional growth. Profit "
            "is secondary. Private sector enterprises are primarily profit-driven."
        ),
        "competency_tag": False,
    },
]

NODE_006_FILL = [
    {
        "id": "bs006_fill_01",
        "type": "Fill in the Blank",
        "topic": "Forms of Business Organisation",
        "difficulty": "Easy",
        "question": "A _______ sector enterprise is owned and controlled by the government.",
        "answer": "public",
        "explanation": (
            "PUBLIC sector enterprises are those where the government holds majority "
            "ownership and exercises control. Examples: ONGC, BHEL, SAIL."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs006_fill_02",
        "type": "Fill in the Blank",
        "topic": "Forms of Business Organisation",
        "difficulty": "Easy",
        "question": "_______ sector enterprises are owned by private individuals or groups with the main objective of earning profit.",
        "answer": "Private",
        "explanation": (
            "PRIVATE sector enterprises have ownership, management, and control in "
            "private hands. Capital is raised from private sources. Examples: Reliance, "
            "TCS, Infosys."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs006_fill_03",
        "type": "Fill in the Blank",
        "topic": "Forms of Business Organisation",
        "difficulty": "Medium",
        "competency_tag": True,
        "question": "Mumbai Metro Lines 2A and 7 are operated under the _______ model by Reliance Infrastructure.",
        "answer": "PPP",
        "explanation": (
            "The Mumbai Metro Lines 2A and 7 are operated under the PPP (Public-Private "
            "Partnership) model. The government provides land and policy support, while "
            "Reliance Infrastructure invests capital and operates the system."
        ),
    },
    {
        "id": "bs006_fill_04",
        "type": "Fill in the Blank",
        "topic": "Forms of Business Organisation",
        "difficulty": "Medium",
        "question": (
            "In a _______ sector organisation, ownership and management rest with "
            "both the government and private entrepreneurs."
        ),
        "answer": "joint",
        "explanation": (
            "JOINT SECTOR enterprises combine public and private partnership. Both "
            "government and private partners contribute capital and share profits/losses. "
            "Example: Delhi Metro Rail Corporation (DMRC)."
        ),
        "competency_tag": False,
    },
]

NODE_006_SHORT = [
    {
        "id": "bs006_short_01",
        "type": "Short Answer",
        "topic": "Forms of Business Organisation",
        "difficulty": "Easy",
        "question": "Define 'Private Sector' and 'Public Sector' enterprises with ONE example of each.",
        "answer": (
            "Private Sector: Enterprises owned, managed, and controlled by private "
            "individuals or groups. Capital is raised from private sources. "
            "Example: Reliance Industries Ltd.\n"
            "Public Sector: Enterprises owned and controlled by the government "
            "(Central, State, or both). Capital comes from government budgets. "
            "Example: ONGC."
        ),
        "explanation": (
            "Focus on the key difference: ownership lies with private hands vs government."
        ),
        "competency_tag": True,
    },
    {
        "id": "bs006_short_02",
        "type": "Short Answer",
        "topic": "Forms of Business Organisation",
        "difficulty": "Medium",
        "question": (
            "Explain why a government may prefer the PPP (Public-Private Partnership) "
            "model for building a highway rather than funding it entirely through "
            "public funds."
        ),
        "answer": (
            "A government may choose the PPP model for highways because:\n"
            "(1) Reduces fiscal burden on the government budget.\n"
            "(2) Brings in private sector expertise, technology, and efficiency.\n"
            "(3) Speeds up project completion (private incentive to finish on time).\n"
            "(4) Shares risk between public and private partners.\n"
            "(5) Enables operation and maintenance by the private partner for better "
            "quality. Example: Delhi-Gurgaon Expressway (PPP with private concessionaire)."
        ),
        "explanation": (
            "This is a comprehension-level question that tests understanding of the "
            "PPP rationale — an important topic in the comparative study."
        ),
        "competency_tag": True,
    },
    {
        "id": "bs006_short_03",
        "type": "Short Answer",
        "topic": "Forms of Business Organisation",
        "difficulty": "Medium",
        "question": (
            "How does the objective of a public sector enterprise differ from that "
            "of a private sector enterprise? Give ONE example to illustrate."
        ),
        "answer": (
            "Public sector objective: social welfare and national development (profit "
            "is secondary). Example: Indian Railways — affordable transport for masses.\n"
            "Private sector objective: earning maximum profit. "
            "Example: Jio Platforms — profit-driven telecom services."
        ),
        "explanation": (
            "Public sector = welfare motive; Private sector = profit motive. This is "
            "the core distinction that all comparative study questions build upon."
        ),
        "competency_tag": True,
    },
]

NODE_006_LONG = [
    {
        "id": "bs006_long_01",
        "type": "Long Answer",
        "topic": "Forms of Business Organisation",
        "difficulty": "Medium",
        "competency_tag": False,
        "question": (
            "Prepare a comparative table between Private Sector, Public Sector, and "
            "Joint Sector enterprises on the following bases: (i) Ownership, "
            "(ii) Capital Source, (iii) Control, (iv) Risk-bearing, and (v) Objective. "
            "Give ONE Indian example for each sector."
        ),
        "answer": (
            "BASIS         | PRIVATE SECTOR          | PUBLIC SECTOR          | JOINT SECTOR\n"
            "---------------|-------------------------|------------------------|-----------------\n"
            "(i) Ownership  | Private individuals/groups | Government (majority) | Govt. + Private\n"
            "(ii) Capital   | Private sources, shares, | Government budget,     | Both govt. &\n"
            "    Source     | loans, retained earnings | retained earnings       | private capital\n"
            "(iii) Control  | Owners/Board of Directors | Govt. ministry/PSU board | Joint management\n"
            "(iv) Risk      | Borne by owners          | Borne by govt.         | Shared by both\n"
            "(v) Objective  | Maximum profit           | Social welfare,         | Balanced — welfare\n"
            "                                               national development      & profit\n\n"
            "Examples:\n"
            "• Private: Reliance Industries Ltd\n"
            "• Public: ONGC / BHEL / SAIL\n"
            "• Joint: Delhi Metro Rail Corporation (DMRC)"
        ),
        "explanation": (
            "This comparative table is a STANDARD examination question in CISCE Business "
            "Studies. All five bases listed in the syllabus must be covered for full marks."
        ),
    },
    {
        "id": "bs006_long_02",
        "type": "Long Answer",
        "topic": "Forms of Business Organisation",
        "difficulty": "Medium",
        "competency_tag": True,
        "question": (
            "The Government of India launched the 'Make in India' initiative in 2014 "
            "to boost domestic manufacturing. Discuss how Private Sector enterprises "
            "like Tata Motors and Public Sector enterprises like BHEL would respond "
            "differently to this initiative in terms of objectives, incentives, and "
            "expected outcomes."
        ),
        "answer": (
            "PRIVATE SECTOR — Tata Motors:\n"
            "• Objective: Increase market share and profits by expanding manufacturing.\n"
            "• Incentives: Tax benefits, easier land acquisition, FDI liberalisation.\n"
            "• Expected outcome: Higher production, more exports, job creation in "
            "private capacity.\n\n"
            "PUBLIC SECTOR — BHEL:\n"
            "• Objective: Support national self-reliance in power equipment and "
            "industrial machinery.\n"
            "• Incentives: Government orders, preferential procurement policies.\n"
            "• Expected outcome: Technology transfer, employment in public sector "
            "units, contribution to national infrastructure.\n\n"
            "Both sectors are complementary: private sector drives efficiency and "
            "profit; public sector ensures strategic national objectives are met."
        ),
        "explanation": (
            "Competency-based question linking syllabus content (sector differences) "
            "to a real Indian policy initiative. Tests application of knowledge."
        ),
    },
]

# ---------------------------------------------------------------------------
# NODE c11_bs_018  e-Business
# ---------------------------------------------------------------------------
NODE_018_MCQ = [
    {
        "id": "bs018_mcq_01",
        "type": "MCQ",
        "topic": "e-Business",
        "difficulty": "Medium",
        "question": (
            "Which of the following correctly distinguishes e-business from "
            "e-commerce?"
        ),
        "options": [
            "A. They are the same concept with different names",
            "B. e-business covers ALL business processes electronically; e-commerce "
            "is only buying and selling online",
            "C. e-commerce covers all business processes; e-business is only online sales",
            "D. e-business is only for large companies; e-commerce is for small ones",
        ],
        "answer": "B",
        "explanation": (
            "E-BUSINESS covers ALL business processes conducted electronically "
            "(procurement, HR, production planning, CRM, finance, etc.). "
            "E-COMMERCE is restricted to buying and selling of goods/services online. "
            "Thus, e-commerce is a SUBSET of e-business."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs018_mcq_02",
        "type": "MCQ",
        "topic": "e-Business",
        "difficulty": "Easy",
        "competency_tag": True,
        "question": (
            "Flipkart, founded in 2007 in Bengaluru, operates primarily in which "
            "e-business scope area?"
        ),
        "options": [
            "A. B2B (Business-to-Business)",
            "B. B2C (Business-to-Consumer)",
            "C. Intra-B (Internal Business)",
            "D. C2C (Consumer-to-Consumer)",
        ],
        "answer": "B",
        "explanation": (
            "Flipkart sells products directly to individual consumers — this is the "
            "B2C model. IndiaMART (B2B), OLX (C2C), and Zoho's internal HR system "
            "(Intra-B) represent the other scope areas."
        ),
    },
    {
        "id": "bs018_mcq_03",
        "type": "MCQ",
        "topic": "e-Business",
        "difficulty": "Medium",
        "competency_tag": False,
        "question": (
            "Which of the following is NOT a resource required for setting up a "
            "successful e-business?"
        ),
        "options": [
            "A. Hardware (servers, computers, mobile devices)",
            "B. Software (ERP, CRM, accounting software)",
            "C. A physical office in every city of operation",
            "D. Payment gateway (e.g., Razorpay, Paytm)",
        ],
        "answer": "C",
        "explanation": (
            "A physical office in every city is NOT required for e-business — one of "
            "its key benefits is lower setup cost compared to traditional brick-and-"
            "mortar stores. The essential resources are: hardware, software, "
            "telecom/connectivity, website, domain name, SSL certificate, payment "
            "gateway, and trained staff."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs018_mcq_04",
        "type": "MCQ",
        "topic": "e-Business",
        "difficulty": "Easy",
        "question": (
            "An SSL certificate in e-business primarily ensures:"
        ),
        "options": [
            "A. Faster website loading",
            "B. Encrypted and secure data transmission between customer and website",
            "C. Free website hosting",
            "D. Higher search engine rankings",
        ],
        "answer": "B",
        "explanation": (
            "An SSL (Secure Sockets Layer) certificate ENCRYPTS the data transmitted "
            "between the customer's browser and the website, protecting sensitive "
            "information like credit card numbers and personal data from interception."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs018_mcq_05",
        "type": "MCQ",
        "topic": "e-Business",
        "difficulty": "Medium",
        "competency_tag": True,
        "question": (
            "A small handicraft seller in Jaipur lists products on Amazon and uses "
            "Delhivery for logistics. This seller benefits from e-business in which "
            "of the following ways?"
        ),
        "options": [
            "A. Global reach without a physical store in every country",
            "B. 24×7 availability to customers",
            "C. Lower setup and operational costs",
            "D. All of the above",
        ],
        "answer": "D",
        "explanation": (
            "E-business provides MULTIPLE benefits simultaneously: global reach (Amazon "
            "delivers worldwide), 24×7 availability (customers can order anytime), "
            "and lower setup costs (no physical storefront needed). This is why small "
            "Indian artisans and MSMEs benefit greatly from e-business platforms."
        ),
    },
]

NODE_018_FILL = [
    {
        "id": "bs018_fill_01",
        "type": "Fill in the Blank",
        "topic": "e-Business",
        "difficulty": "Easy",
        "question": "_______ refers to buying and selling of goods and services over the internet.",
        "answer": "E-commerce",
        "explanation": (
            "E-COMMERCE is the subset of e-business that deals specifically with the "
            "online buying and selling of goods and services. E-business is broader "
            "and covers all electronic business processes."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs018_fill_02",
        "type": "Fill in the Blank",
        "topic": "e-Business",
        "difficulty": "Easy",
        "competency_tag": True,
        "question": "IndiaMART, based in Noida, is an example of a _______ e-business marketplace.",
        "answer": "B2B",
        "explanation": (
            "IndiaMART connects suppliers (mostly SMEs) with business buyers — this "
            "is the B2B (Business-to-Business) model. It was listed on Indian stock "
            "exchanges in 2019."
        ),
    },
    {
        "id": "bs018_fill_03",
        "type": "Fill in the Blank",
        "topic": "e-Business",
        "difficulty": "Medium",
        "question": "A _______ facilitates online payments by securely connecting the "
                     "customer's bank to the merchant's website.",
        "answer": "payment gateway",
        "explanation": (
            "A PAYMENT GATEWAY (e.g., Razorpay, Paytm Payment Gateway, CCAvenue) "
            "is a technology that authorises and processes online payments. It is an "
            "essential resource for any e-business."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs018_fill_04",
        "type": "Fill in the Blank",
        "topic": "e-Business",
        "difficulty": "Medium",
        "competency_tag": True,
        "question": "Zoho Corporation, headquartered in Chennai, uses _______ e-business "
                     "for internal HR management and procurement.",
        "answer": "intra-B",
        "explanation": (
            "INTRA-B (Intra-Business) refers to electronic business processes used "
            "within an organisation itself — e.g., internal HR systems, procurement, "
            "enterprise resource planning (ERP). Zoho is a Chennai-based SaaS company."
        ),
    },
]

NODE_018_SHORT = [
    {
        "id": "bs018_short_01",
        "type": "Short Answer",
        "topic": "e-Business",
        "difficulty": "Easy",
        "question": "Define e-business and explain how it differs from e-commerce.",
        "answer": (
            "E-business refers to carrying out all business processes electronically "
            "— including procurement, production planning, inventory management, HR, "
            "finance, and customer relationship management — using internet and digital "
            "technologies.\n\n"
            "Difference from e-commerce: E-commerce is a SUBSET of e-business and "
            "refers ONLY to buying and selling of goods/services online. E-business "
            "is broader — it encompasses e-commerce plus all other electronic business "
            "activities (e.g., a company's internal ERP system is part of e-business "
            "but not e-commerce)."
        ),
        "explanation": (
            "Key distinction: e-commerce = online transactions; e-business = all "
            "electronic business processes including non-transactional ones."
        ),
        "competency_tag": False,
    },
    {
        "id": "bs018_short_02",
        "type": "Short Answer",
        "topic": "e-Business",
        "difficulty": "Medium",
        "competency_tag": True,
        "question": (
            "A traditional saree shop in Kanchipuram decides to start selling online "
            "through its own website. List FIVE resources it will need to set up and "
            "run its e-business successfully."
        ),
        "answer": (
            "(1) HARDWARE: Computers, smartphones for inventory management, barcode "
            "scanners, and a reliable server.\n"
            "(2) SOFTWARE: E-commerce platform (e.g., Shopify), inventory management "
            "software, and accounting software.\n"
            "(3) TELECOM/INTERNET: High-speed broadband connection, domain name "
            "registration.\n"
            "(4) WEBSITE & SECURITY: A well-designed website, SSL certificate for "
            "secure transactions.\n"
            "(5) PAYMENT GATEWAY: Integration with Razorpay or similar for online "
            "payments.\n"
            "(6) TRAINED STAFF: To manage orders, customer queries, and logistics.\n"
            "(7) LOGISTICS TIE-UP: Partnership with courier services like Delhivery "
            "or Blue Dart for delivery."
        ),
        "explanation": (
            "Competency question applying e-business resources concept to a real "
            "Indian MSME scenario (Kanchipuram sarees)."
        ),
    },
    {
        "id": "bs018_short_03",
        "type": "Short Answer",
        "topic": "e-Business",
        "difficulty": "Medium",
        "competency_tag": True,
        "question": (
            "Describe the flow of an online transaction from the moment a customer "
            "adds an item to their cart on Flipkart to the point of payment confirmation."
        ),
        "answer": (
            "1. Customer adds item to cart on Flipkart.\n"
            "2. Customer proceeds to checkout and enters shipping address.\n"
            "3. Customer selects a payment method (UPI, credit/debit card, net banking, "
            "COD).\n"
            "4. For online payment: customer is redirected to payment gateway (e.g., "
            "Razorpay) which securely captures card/UPI details.\n"
            "5. Payment gateway communicates with the customer's bank to authorise "
            "the transaction.\n"
            "6. Bank sends authorisation response back to payment gateway.\n"
            "7. Payment gateway confirms success/failure to Flipkart.\n"
            "8. Flipkart generates an order confirmation with order number and "
            "estimated delivery date.\n"
            "9. Customer receives confirmation via email and/or SMS.\n"
            "10. Flipkart processes the order for fulfilment and dispatch."
        ),
        "explanation": (
            "Understanding the online transaction flow is a key learning objective "
            "for this node. The payment gateway plays a central role in ensuring "
            "security."
        ),
        "competency_tag": True,
    },
]

NODE_018_LONG = [
    {
        "id": "bs018_long_01",
        "type": "Long Answer",
        "topic": "e-Business",
        "difficulty": "Medium",
        "competency_tag": False,
        "question": (
            "Explain the scope of e-business by describing each of the four categories: "
            "(i) B2B, (ii) B2C, (iii) Intra-B, and (iv) C2C. Illustrate each category "
            "with a relevant Indian example."
        ),
        "answer": (
            "SCOPE OF E-BUSINESS:\n\n"
            "(i) B2B (Business-to-Business): Transactions between businesses. "
            "Example: IndiaMART connects steel manufacturers in Maharashtra with "
            "construction companies in Gujarat.\n\n"
            "(ii) B2C (Business-to-Consumer): Business sells directly to individual "
            "consumers online. Example: Flipkart sells smartphones, clothing, and "
            "electronics to individual customers across India.\n\n"
            "(iii) Intra-B (Intra-Business): Electronic processes within the same "
            "organisation. Example: Zoho Corporation uses its own Zoho People HR "
            "software and Zoho Books for internal employee management and accounting.\n\n"
            "(iv) C2C (Consumer-to-Consumer): Individuals sell to other individuals "
            "online. Example: OLX India — a person in Pune sells a used laptop to "
            "another person in Mumbai through the OLX platform."
        ),
        "explanation": (
            "All four scope categories must be covered. Each should have a distinct "
            "Indian example to demonstrate understanding."
        ),
    },
    {
        "id": "bs018_long_02",
        "type": "Long Answer",
        "topic": "e-Business",
        "difficulty": "Medium",
        "competency_tag": True,
        "question": (
            "During the COVID-19 lockdown (2020–2021), many small kirana stores in "
            "Mumbai and Delhi switched to accepting online orders via WhatsApp and "
            "Google Pay. Discuss how this transformation reflects FIVE benefits of "
            "e-business for small Indian retailers."
        ),
        "answer": (
            "Five benefits of e-business for small kirana stores:\n\n"
            "(1) GLOBAL REACH: Even a small kirana in a Mumbai suburb could serve "
            "customers across the city via online ordering, expanding beyond "
            "walk-in foot traffic.\n\n"
            "(2) 24×7 AVAILABILITY: Customers could place orders at any time, even "
            "outside shop hours, using WhatsApp messages or a simple online form.\n\n"
            "(3) LOWER SETUP COST: No need for a large physical storefront — the "
            "store could operate from home using just a smartphone and internet "
            "connection.\n\n"
            "(4) PAPERLESS TRANSACTIONS: UPI-based payments (Google Pay, PhonePe) "
            "eliminated cash handling, reducing the risk of theft and errors.\n\n"
            "(5) EASY COMMUNICATION: WhatsApp enabled instant order confirmation, "
            "delivery updates, and customer feedback — all at near-zero cost.\n\n"
            "This demonstrates how e-business empowers MSMEs and small retailers "
            "to compete with larger organised retail chains."
        ),
        "explanation": (
            "Competency-based question testing application of e-business benefits "
            "to a real Indian MSME scenario during COVID-19. Each benefit must be "
            "clearly linked to the kirana store context."
        ),
    },
    {
        "id": "bs018_long_03",
        "type": "Long Answer",
        "topic": "e-Business",
        "difficulty": "Medium",
        "competency_tag": True,
        "question": (
            "A handicraft exporter in Jaipur wants to start selling to international "
            "customers through an e-business website. She needs to decide between "
            "using a platform like Amazon Global Selling and setting up her own "
            "independent e-commerce website. Compare the two options on: (a) initial "
            "cost, (b) global reach, (c) control over branding, and (d) payment and "
            "logistics support."
        ),
        "answer": (
            "(a) INITIAL COST:\n"
            "• Amazon Global Selling: Low initial cost (seller account free, pay "
            "per sale).\n"
            "• Own website: Higher initial cost (domain, hosting, website development).\n\n"
            "(b) GLOBAL REACH:\n"
            "• Amazon: Immediate access to millions of international customers.\n"
            "• Own website: Requires separate marketing and SEO investment.\n\n"
            "(c) CONTROL OVER BRANDING:\n"
            "• Amazon: Limited — Amazon controls the customer interface.\n"
            "• Own website: Full control — custom design, brand experience.\n\n"
            "(d) PAYMENT & LOGISTICS:\n"
            "• Amazon: Handles both through FBA (Fulfilment by Amazon).\n"
            "• Own website: Seller must arrange own payment gateway and international "
            "shipping logistics (e.g., DHL, FedEx)."
        ),
        "explanation": (
            "This long-answer question tests analytical thinking about e-business "
            "strategy, using a real Indian MSME context (Jaipur handicrafts)."
        ),
    },
]


# ============================================================
# QUESTION GENERATOR
# ============================================================

def generate_questions(seed: int, count: int) -> list:
    """
    Generate `count` deterministic Business Studies questions for CISCE Class 11.

    Covers all three syllabus nodes:
      • c11_bs_001: Meaning and Features of Business
      • c11_bs_006: Forms of Business Organisation
      • c11_bs_018: e-Business

    Mix of types: MCQ, Fill Blank, Short Answer, Long Answer, Numerical
    50 % competency-tagged (Indian context), 50 % standard

    Parameters
    ----------
    seed : int
        Base seed for deterministic randomness.
    count : int
        Total number of questions to generate.

    Returns
    -------
    list[dict]
        Each dict has keys: id, type, topic, difficulty, question,
        options (MCQ only), answer, explanation, competency_tag
    """
    rng = make_deterministic_rng(seed)

    # ---- build one big, shuffled question pool ---------------------------
    pool: list[dict] = []
    pool.extend(NODE_001_MCQ)
    pool.extend(NODE_001_FILL)
    pool.extend(NODE_001_SHORT)
    pool.extend(NODE_001_LONG)
    pool.extend(NODE_006_MCQ)
    pool.extend(NODE_006_FILL)
    pool.extend(NODE_006_SHORT)
    pool.extend(NODE_006_LONG)
    pool.extend(NODE_018_MCQ)
    pool.extend(NODE_018_FILL)
    pool.extend(NODE_018_SHORT)
    pool.extend(NODE_018_LONG)

    rng.shuffle(pool)

    # ---- ensure all three nodes are represented --------------------------
    node_ids = ["bs001", "bs006", "bs018"]
    selected: list[dict] = []
    seen_prefixes: set = set()

    # First pass: guarantee at least one question per node
    for q in pool:
        prefix = q["id"][:5]
        if prefix not in seen_prefixes and len(selected) < count:
            selected.append(q)
            seen_prefixes.add(prefix)

    # Second pass: fill remaining slots while maintaining competency ratio
    remaining = count - len(selected)
    comp_count = sum(1 for q in selected if q.get("competency_tag", False))
    std_count = len(selected) - comp_count

    # Target: 50/50 competency ratio
    comp_target = count // 2
    std_target = count - comp_target

    comp_pool = [q for q in pool if q not in selected and q.get("competency_tag", False)]
    std_pool = [q for q in pool if q not in selected and not q.get("competency_tag", False)]
    rng.shuffle(comp_pool)
    rng.shuffle(std_pool)

    comp_needed = max(0, comp_target - comp_count)
    std_needed = max(0, std_target - std_count)

    selected.extend(comp_pool[: min(comp_needed, remaining)])
    remaining -= len(selected) - count + remaining  # recalc

    # Fill rest from whichever pool has items
    for q in comp_pool + std_pool:
        if len(selected) >= count:
            break
        if q not in selected:
            selected.append(q)

    # Final deterministic ordering
    selected = selected[:count]
    # Re-seed and shuffle selected for variety
    rng2 = make_deterministic_rng(seed + 42)
    rng2.shuffle(selected)

    return selected


# ============================================================
# SOLVER HELPERS
# ============================================================

def _mcq_solve(params: dict) -> dict:
    """Solve an MCQ question."""
    correct = params.get("correct", params.get("answer", ""))
    user_choice = params.get("user_choice", "")
    options = params.get("options", [])

    is_correct = (str(user_choice).strip().upper() == str(correct).strip().upper())

    steps = [
        f"Step 1 — Identify the question type: Multiple Choice Question (MCQ).",
        f"Step 2 — Read the question carefully: \"{params.get('question', '')[:80]}...\"",
        f"Step 3 — Eliminate obviously wrong options: {params.get('elimination', 'See explanation for reasoning.')}",
        f"Step 4 — Select the most appropriate answer: {correct}",
        f"Step 5 — Compare with user's choice: {user_choice}",
    ]

    verification = {
        "method": "Direct knowledge recall + logical elimination",
        "result": f"Correct answer is '{correct}'. User selected '{user_choice}'. "
                  f"Answer is {'CORRECT' if is_correct else 'INCORRECT'}.",
        "reference": params.get("explanation", ""),
    }

    return {
        "answer": correct,
        "user_answer": user_choice,
        "is_correct": is_correct,
        "steps": steps,
        "verification": verification,
        "explanation": params.get("explanation", ""),
    }


def _fillblank_solve(params: dict) -> dict:
    """Solve a fill-in-the-blank question."""
    correct = params.get("answer", "").strip().lower()
    user_answer = params.get("user_answer", "").strip().lower()

    is_correct = (user_answer == correct)

    steps = [
        f"Step 1 — Identify the blank in the sentence: \"{params.get('question', '')}\"",
        f"Step 2 — Recall the definition/concept from syllabus topic: {params.get('topic', '')}",
        f"Step 3 — The correct term to fill the blank is: '{params.get('answer', '')}'",
        f"Step 4 — Compare with user answer: '{params.get('user_answer', '')}'",
    ]

    verification = {
        "method": "Exact match comparison (case-insensitive)",
        "result": f"Correct answer: '{params.get('answer', '')}'. User answer: '{params.get('user_answer', '')}'. "
                  f"{'CORRECT' if is_correct else 'INCORRECT'}.",
    }

    return {
        "answer": params.get("answer", ""),
        "user_answer": params.get("user_answer", ""),
        "is_correct": is_correct,
        "steps": steps,
        "verification": verification,
        "explanation": params.get("explanation", ""),
    }


def _shortanswer_solve(params: dict) -> dict:
    """Solve a short-answer question with keyword matching."""
    correct_answer = params.get("answer", "")
    user_answer = params.get("user_answer", "").strip()

    # Keyword-based approximate matching
    correct_keywords = set(
        w.strip(".,;:!?").lower()
        for w in correct_answer.split()
        if len(w.strip(".,;:!?")) > 3
    )
    user_keywords = set(
        w.strip(".,;:!?").lower()
        for w in user_answer.split()
        if len(w.strip(".,;:!?")) > 3
    )

    if correct_keywords:
        match_ratio = len(correct_keywords & user_keywords) / len(correct_keywords)
    else:
        match_ratio = 0.0

    is_correct = match_ratio >= 0.5

    steps = [
        f"Step 1 — Read the question: \"{params.get('question', '')[:100]}...\"",
        f"Step 2 — Recall key concepts from the topic: {params.get('topic', '')}",
        f"Step 3 — Identify key points from the model answer.",
        f"Step 4 — Model answer keywords: {sorted(correct_keywords)[:8]}",
        f"Step 5 — User answer keywords: {sorted(user_keywords)[:8]}",
        f"Step 6 — Keyword match ratio: {match_ratio:.0%} "
        f"(threshold: 50% for 'correct').",
    ]

    verification = {
        "method": "Keyword overlap ratio (case-insensitive, words > 3 chars)",
        "result": f"Match ratio: {match_ratio:.0%}. "
                  f"{'CORRECT' if is_correct else 'PARTIALLY CORRECT / REVIEW NEEDED'}.",
        "correct_keywords_found": sorted(correct_keywords & user_keywords),
        "missing_keywords": sorted(correct_keywords - user_keywords),
    }

    return {
        "answer": correct_answer,
        "user_answer": user_answer,
        "is_correct": is_correct,
        "match_ratio": round(match_ratio, 2),
        "steps": steps,
        "verification": verification,
        "explanation": params.get("explanation", ""),
    }


def solve_mcq(params: dict) -> dict:
    return _mcq_solve(params)


def solve_fillblank(params: dict) -> dict:
    return _fillblank_solve(params)


def solve_shortanswer(params: dict) -> dict:
    return _shortanswer_solve(params)


def solve_longanswer(params: dict) -> dict:
    return _shortanswer_solve(params)


# ============================================================
# DEMO / VERIFICATION
# ============================================================

def _verify_generation():
    """Internal verification that the generator covers all nodes and ratios."""
    questions = generate_questions(seed=12345, count=20)

    # Check all nodes present
    prefixes = {q["id"][:5] for q in questions}
    assert "bs001" in prefixes, "Node 001 (Meaning & Features of Business) missing!"
    assert "bs006" in prefixes, "Node 006 (Forms of Business Organisation) missing!"
    assert "bs018" in prefixes, "Node 018 (e-Business) missing!"

    # Check competency ratio
    comp = sum(1 for q in questions if q.get("competency_tag", False))
    std = len(questions) - comp
    ratio = comp / len(questions)
    assert 0.35 <= ratio <= 0.65, f"Competency ratio {ratio:.0%} outside expected 50% ±15% range"

    # Check type diversity
    types = {q["type"] for q in questions}
    assert "MCQ" in types
    assert "Fill in the Blank" in types
    assert "Short Answer" in types
    assert "Long Answer" in types

    # Check all have required fields
    required = {"id", "type", "topic", "difficulty", "question", "answer", "explanation"}
    for q in questions:
        present = required & q.keys()
        assert present == required, f"Question {q['id']} missing fields: {required - present}"

    # Determinism check
    q2 = generate_questions(seed=12345, count=20)
    ids1 = [q["id"] for q in questions]
    ids2 = [q["id"] for q in q2]
    assert ids1 == ids2, "Generator is NOT deterministic!"

    print(f"✓ All {len(questions)} questions generated successfully.")
    print(f"✓ Nodes covered: {sorted(prefixes)}")
    print(f"✓ Competency ratio: {comp}/{len(questions)} = {ratio:.0%}")
    print(f"✓ Question types: {sorted(types)}")
    print(f"✓ Determinism verified (seed 12345).")
    return questions


def _demo_solvers():
    """Quick demonstration of solver functions."""
    print("\n--- Solver Demo ---")

    # MCQ solver
    mcq_result = solve_mcq({
        "question": "Which of the following is NOT a business activity?",
        "correct": "C",
        "user_choice": "C",
        "options": ["A", "B", "C", "D"],
        "topic": "Meaning and Features of Business",
        "explanation": "A one-time sale lacks regularity.",
    })
    print(f"MCQ: {mcq_result['is_correct']} → {mcq_result['answer']}")

    # Fill blank solver
    fb_result = solve_fillblank({
        "question": "Business is an economic activity involving regular ____ or exchange.",
        "answer": "production",
        "user_answer": "production",
        "topic": "Meaning and Features of Business",
        "explanation": "Business involves regular production or exchange.",
    })
    print(f"FillBlank: {fb_result['is_correct']} → {fb_result['answer']}")

    # Short answer solver
    sa_result = solve_shortanswer({
        "question": "Define business.",
        "answer": "Business is an economic activity involving regular production or exchange of goods and services undertaken for profit.",
        "user_answer": "Business is an economic activity involving regular production or exchange of goods and services undertaken for profit.",
        "topic": "Meaning and Features of Business",
        "explanation": "Standard definition.",
    })
    print(f"ShortAnswer: {sa_result['is_correct']} → match_ratio={sa_result['match_ratio']}")


if __name__ == "__main__":
    _verify_generation()
    _demo_solvers()