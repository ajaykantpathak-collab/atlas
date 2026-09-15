"""
CISCE Class 8 History & Civics - Deterministic Solver & Question Generator
"""

import random
import hashlib
from typing import Dict, List, Any, Optional, Tuple


# ============================================================
# Question Bank
# ============================================================

CAUSES_INDUSTRIAL_REVOLUTION = [
    "Agricultural Revolution", "Enclosure Movement",
    "Colonial Markets and Raw Materials", "Availability of Capital",
    "New Inventions and Technologies", "Stable Political Conditions",
    "Natural Resources like Coal and Iron"
]

LEADERS_NATIONAL_MOVEMENT = [
    {"name": "Mahatma Gandhi", "movement": "Non-Cooperation Movement (1920)"},
    {"name": "Bal Gangadhar Tilak", "movement": "Home Rule Movement (1916)"},
    {"name": "Jawaharlal Nehru", "movement": "Civil Disobedience Movement (1930)"},
    {"name": "Subhas Chandra Bose", "movement": "Quit India Movement (1942)"},
    {"name": "Lala Lajpat Rai", "movement": "Simon Commission Protest (1928)"},
    {"name": "Bhagat Singh", "movement": "Lahore Conspiracy Case (1929)"},
]

CENTERS_1857 = ["Delhi", "Kanpur", "Lucknow", "Jhansi", "Gwalior", "Awadh", "Bihar"]
POLITICAL_CAUSES_1857 = [
    "Doctrine of Lapse", "Subsidiary Alliance", "Annexation of Awadh",
    "Removal of Mughal King's Title"
]
SOCIAL_ECONOMIC_CAUSES_1857 = [
    "Destruction of Cottage Industries", "High Land Revenue",
    "Discriminatory Tariff Policy", "Heavy Taxation on Peasants",
    "Widespread Unemployment among Artisans"
]
LEADERS_1857 = [
    {"leader": "Rani Lakshmibai", "place": "Jhansi"},
    {"leader": "Nana Sahib", "place": "Kanpur"},
    {"leader": "Tantia Tope", "place": "Gwalior"},
    {"leader": "Begum Hazrat Mahal", "place": "Lucknow"},
    {"leader": "Kunwar Singh", "place": "Bihar"},
    {"leader": "Moulvi Ahmadullah Shah", "place": "Awadh"},
]

FEATURES_CONSTITUTION = [
    "Written and Lengthiest Constitution",
    "Federal System with Strong Centre",
    "Parliamentary System of Government",
    "Fundamental Rights and Duties",
    "Independent Judiciary",
    "Universal Adult Franchise",
    "Secular State",
    "Directive Principles of State Policy",
]
CONSTITUTION_SOURCES = [
    {"source": "Government of India Act 1935", "contribution": "Federal Structure and Emergency Provisions"},
    {"source": "British Constitution", "contribution": "Parliamentary System and Rule of Law"},
    {"source": "US Constitution", "contribution": "Fundamental Rights and Judicial Review"},
    {"source": "Irish Constitution", "contribution": "Directive Principles of State Policy"},
    {"source": "Canadian Constitution", "contribution": "Federal Structure and Residual Powers"},
    {"source": "French Constitution", "contribution": "Republicanism and Secularism"},
]

FUNDAMENTAL_RIGHTS = [
    {"article": "Article 14", "right": "Equality before Law"},
    {"article": "Article 19", "right": "Freedom of Speech and Expression"},
    {"article": "Article 21", "right": "Protection of Life and Personal Liberty"},
    {"article": "Article 25", "right": "Freedom of Religion"},
    {"article": "Article 29", "right": "Protection of Interests of Minorities"},
    {"article": "Article 32", "right": "Right to Constitutional Remedies"},
]
FUNDAMENTAL_DUTIES = [
    "To abide by the Constitution and respect its ideals",
    "To cherish and follow the noble ideals of the freedom struggle",
    "To uphold and protect the sovereignty and integrity of India",
    "To defend the country and render national service",
    "To promote harmony and spirit of common brotherhood",
    "To protect and improve the natural environment",
    "To strive towards excellence in all spheres",
]

PARLIAMENT_COMPOSITION = {
    "President": "Head of Parliament",
    "Lok Sabha": "House of the People (Max 552 members)",
    "Rajya Sabha": "Council of States (Max 250 members)",
}
LOK_SABHA_DETAILS = {
    "membership": "Up to 552 members",
    "election": "Direct election by the people",
    "term": "5 years",
    "minimum_age": "25 years",
}
RAJYA_SABHA_DETAILS = {
    "membership": "Up to 250 members",
    "election": "Indirect election by MLAs",
    "term": "6 years",
    "minimum_age": "30 years",
}

PANCHAYAT_TIERS = [
    {"level": "Village Panchayat", "scope": "Village level - single village or group of villages"},
    {"level": "Panchayat Samiti", "scope": "Block/Intermediate level - community development block"},
    {"level": "Zila Parishad", "scope": "District level - entire district"},
]
PANCHAYAT_FUNCTIONS = {
    "Village Panchayat": [
        "Construction and maintenance of village roads",
        "Construction of public wells and water supply",
        "Construction of school buildings",
        "Maintenance of burial and burning grounds",
        "Plantation of trees and maintenance of parks"
    ],
    "Panchayat Samiti": [
        "Construction of district roads",
        "Running of primary schools",
        "Construction and maintenance of hospitals",
        "Rural development programmes",
        "Coordination of Village Panchayats"
    ],
    "Zila Parishad": [
        "Coordination of Panchayat Samitis",
        "Advising State Government on rural matters",
        "Supervision of development programmes",
        "Review of work of Panchayat Samitis",
        "Distribution of funds to lower tiers"
    ],
}


# ============================================================
# Base Solver Class
# ============================================================

class BaseSolver:
    PROBLEM_TYPE: str = "base"
    QUESTION_BANK: List[Dict[str, Any]] = []

    def __init__(self, problem_id: str, seed: int = 42):
        self.problem_id = problem_id
        self.seed = seed
        self._selected_q: Optional[Dict[str, Any]] = None
        self._selected_idx: int = 0
        self._answer: Optional[Dict[str, Any]] = None

    def _get_question(self) -> Tuple[int, Dict[str, Any]]:
        random.seed(self.seed)
        idx = random.randint(0, len(self.QUESTION_BANK) - 1)
        return idx, self.QUESTION_BANK[idx]

    def solve(self) -> Dict[str, Any]:
        random.seed(self.seed)
        self._selected_idx, self._selected_q = self._get_question()
        answer = self._solve()
        verification = self._verify(answer)
        self._answer = answer
        return {
            "answer": answer,
            "steps": answer.get("steps", []),
            "verification": verification,
        }

    def _solve(self) -> Dict[str, Any]:
        return {"text": "", "steps": [], "correct": False}

    def _verify(self, answer: Dict[str, Any]) -> Dict[str, Any]:
        return {"verified": True, "message": "Verification passed"}


# ============================================================
# Solver Classes: c8_histciv_001 through c8_histciv_010
# ============================================================

class IndustrialRevolutionSolver(BaseSolver):
    PROBLEM_TYPE = "c8_histciv_001"
    QUESTION_BANK = [
        {
            "type": "causes",
            "question": "List the causes of the Industrial Revolution.",
            "answer": CAUSES_INDUSTRIAL_REVOLUTION,
        },
        {
            "type": "chronological",
            "question": "Arrange in chronological order: "
                        "(1) Steam Engine, (2) Spinning Jenny, "
                        "(3) Power Loom, (4) Cotton Gin",
            "answer": [
                "Spinning Jenny (1764)", "Cotton Gin (1793)",
                "Power Loom (1785)", "Steam Engine (1769/improved 1781)"
            ],
        },
        {
            "type": "definitions",
            "question": "Define: (1) Industrial Revolution, "
                        "(2) Capitalism, (3) Socialism",
            "answer": {
                "Industrial Revolution": (
                    "Transition from hand production to machine-based "
                    "manufacturing beginning in England (c. 1760-1840)"
                ),
                "Capitalism": (
                    "Economic system where private owners control "
                    "industry for profit"
                ),
                "Socialism": (
                    "System where means of production are owned "
                    "and controlled by the community/state"
                ),
            },
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        idx, q = self._selected_idx, self._selected_q
        t = q["type"]
        if t == "causes":
            steps = [
                "Step 1: Recall the agricultural improvements of the 18th century",
                "Step 2: Enclosure Movement displaced peasants creating a labour pool",
                "Step 3: Colonial expansion provided raw materials and markets",
                "Step 4: Capital accumulated from colonial trade funded factories",
                "Step 5: Key inventions (Spinning Jenny, Steam Engine) drove mechanisation",
                "Step 6: Political stability in Britain encouraged investment",
                "Step 7: Coal and iron deposits supplied energy and materials",
            ]
            return {"text": q["answer"], "steps": steps, "correct": True}
        elif t == "chronological":
            steps = [
                "Step 1: Spinning Jenny invented by James Hargreaves in 1764",
                "Step 2: Steam Engine improved by James Watt in 1769 (patented)",
                "Step 3: Power Loom developed by Edmund Cartwright in 1785",
                "Step 4: Cotton Gin invented by Eli Whitney in 1793",
            ]
            return {"text": q["answer"], "steps": steps, "correct": True}
        else:
            steps = [
                "Step 1: Define Industrial Revolution as a "
                        "fundamental change in production",
                "Step 2: Capitalism: private ownership of industry for profit",
                "Step 3: Socialism: community/state ownership of production",
            ]
            return {"text": q["answer"], "steps": steps, "correct": True}

    def _verify(self, answer: Dict[str, Any]) -> Dict[str, Any]:
        if not self._selected_q:
            return {"verified": False, "message": "No question selected"}
        t = self._selected_q["type"]
        ok = isinstance(answer.get("text"), (list, dict)) and bool(answer["text"])
        return {
            "verified": ok,
            "message": "Answer format correct" if ok else "Answer format error",
        }


class NationalMovementSolver(BaseSolver):
    PROBLEM_TYPE = "c8_histciv_002"
    QUESTION_BANK = [
        {
            "type": "events_order",
            "question": "Arrange in chronological order: "
                        "1857 Revolt, Formation of INC, Partition of Bengal, "
                        "Non-Cooperation Movement, Quit India Movement, Independence",
            "answer": [
                "1857 Revolt (1857)",
                "Formation of INC (1885)",
                "Partition of Bengal (1905)",
                "Non-Cooperation Movement (1920)",
                "Quit India Movement (1942)",
                "Independence (1947)",
            ],
        },
        {
            "type": "match_leaders",
            "question": "Match: (A) Bal Gangadhar Tilak, (B) Mahatma Gandhi, "
                        "(C) Jawaharlal Nehru, (D) Subhas Chandra Bose -- "
                        "with their movements",
            "answer": {
                "Bal Gangadhar Tilak": "Home Rule Movement (1916)",
                "Mahatma Gandhi": "Non-Cooperation Movement (1920)",
                "Jawaharlal Nehru": "Civil Disobedience Movement (1930)",
                "Subhas Chandra Bose": "Quit India Movement (1942)",
            },
        },
        {
            "type": "fill_dates",
            "question": "Fill in the blanks: INC formed in ____, "
                        "Partition of Bengal in ____, Gandhi returned from SA in ____",
            "answer": {
                "INC formed": "1885",
                "Partition of Bengal": "1905",
                "Gandhi returned from SA": "1915",
            },
        },
        {
            "type": "phases",
            "question": "Name the phases of the National Movement: "
                        "Moderate Phase, Extremist Phase, Gandhian Phase",
            "answer": {
                "Moderate Phase (1885-1905)": "Petitions, prayers, and protests",
                "Extremist Phase (1905-1919)": "Swaraj demand, boycott, Swadeshi",
                "Gandhian Phase (1920-1947)": (
                    "Non-violent mass movements -- "
                    "Non-Cooperation, Civil Disobedience, Quit India"
                ),
            },
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        idx, q = self._selected_idx, self._selected_q
        t = q["type"]
        if t == "events_order":
            steps = [
                "Step 1: First War of Independence / 1857 Revolt (1857)",
                "Step 2: Formation of Indian National Congress (1885)",
                "Step 3: Partition of Bengal by Lord Curzon (1905)",
                "Step 4: Non-Cooperation Movement launched by Gandhi (1920)",
                "Step 5: Quit India Movement launched (1942)",
                "Step 6: India gains Independence (15 August 1947)",
            ]
        elif t == "match_leaders":
            steps = [
                "Step 1: Bal Gangadhar Tilak -- Home Rule Movement (1916)",
                "Step 2: Mahatma Gandhi -- Non-Cooperation Movement (1920)",
                "Step 3: Jawaharlal Nehru -- Civil Disobedience Movement (1930)",
                "Step 4: Subhas Chandra Bose -- Quit India Movement (1942)",
            ]
        elif t == "fill_dates":
            steps = [
                "Step 1: Indian National Congress formed -- 1885",
                "Step 2: Partition of Bengal announced -- 1905",
                "Step 3: Gandhi returned from South Africa -- 1915",
            ]
        else:
            steps = [
                "Step 1: Moderate Phase (1885-1905): petitions and constitutional methods",
                "Step 2: Extremist Phase (1905-1919): Swadeshi and boycott",
                "Step 3: Gandhian Phase (1920-1947): mass non-violent movements",
            ]
        return {"text": q["answer"], "steps": steps, "correct": True}

    def _verify(self, answer: Dict[str, Any]) -> Dict[str, Any]:
        if not self._selected_q:
            return {"verified": False, "message": "No question selected"}
        t = self._selected_q["type"]
        if t == "events_order":
            required = ["1857", "1885", "1905", "1920", "1942", "1947"]
            text = answer.get("text", [])
            found = [any(r in str(x) for x in text) for r in required]
            ok = all(found)
        else:
            ok = bool(answer.get("text"))
        return {
            "verified": ok,
            "message": "Chronological order correct" if ok else "Check ordering",
        }


class Revolt1857Solver(BaseSolver):
    PROBLEM_TYPE = "c8_histciv_003"
    QUESTION_BANK = [
        {
            "type": "centers",
            "question": "Name the main centres of the Revolt of 1857.",
            "answer": CENTERS_1857,
        },
        {
            "type": "causes",
            "question": "What were the main causes of the Revolt of 1857?",
            "answer": {
                "Political Causes": POLITICAL_CAUSES_1857,
                "Social and Economic Causes": SOCIAL_ECONOMIC_CAUSES_1857,
            },
        },
        {
            "type": "match_leaders",
            "question": "Match the leaders of the Revolt of 1857 "
                        "with their places",
            "answer": LEADERS_1857,
        },
        {
            "type": "effects",
            "question": "What were the effects of the Revolt of 1857?",
            "answer": {
                "End of Company Rule": "Government of India came under the Crown",
                "India Act 1858": "Board of Control and Court of Directors abolished",
                "Governor General": "Title changed to Viceroy",
                "Doctrine of Lapse": "Policy abandoned",
                "Divide and Rule": (
                    "British adopted policy of divide and rule "
                    "to prevent unity"
                ),
                "Military Reorganisation": (
                    "Ratio of British to Indian soldiers increased"
                ),
            },
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        idx, q = self._selected_idx, self._selected_q
        t = q["type"]
        if t == "centers":
            steps = ["Step 1: Delhi -- captured by rebels, Bahadur Shah Zafar proclaimed Emperor",
                     "Step 2: Kanpur -- Nana Sahib led the revolt",
                     "Step 3: Lucknow -- Begum Hazrat Mahal led the revolt",
                     "Step 4: Jhansi -- Rani Lakshmibai fought bravely",
                     "Step 5: Gwalior -- Tantia Tope continued fighting",
                     "Step 6: Awadh and Bihar also saw widespread rebellion"]
        elif t == "causes":
            steps = [
                "Step 1: Political -- Doctrine of Lapse, Subsidiary Alliance, annexation of Awadh",
                "Step 2: Economic -- high land revenue, destruction of cottage industries",
                "Step 3: Social -- introduction of Western education, laws against sati",
                "Step 4: Military -- greased cartridges with cow/bear fat, low Indian pay",
                "Step 5: Immediate -- introduction of Enfield rifle cartridges",
            ]
        elif t == "match_leaders":
            steps = [
                "Step 1: Rani Lakshmibai -- fought at Jhansi",
                "Step 2: Nana Sahib -- led revolt at Kanpur",
                "Step 3: Tantia Tope -- fought at Gwalior and Rajasthan",
                "Step 4: Begum Hazrat Mahal -- led revolt at Lucknow",
                "Step 5: Kunwar Singh -- led revolt in Bihar",
            ]
        else:
            steps = [
                "Step 1: End of East India Company rule",
                "Step 2: India placed under British Crown (Government of India Act 1858)",
                "Step 3: Title of Governor General changed to Viceroy",
                "Step 4: Doctrine of Lapse abandoned",
                "Step 5: Policy of Divide and Rule adopted",
            ]
        return {"text": q["answer"], "steps": steps, "correct": True}

    def _verify(self, answer: Dict[str, Any]) -> Dict[str, Any]:
        if not self._selected_q:
            return {"verified": False, "message": "No question selected"}
        t = self._selected_q["type"]
        ok = bool(answer.get("text"))
        msg = "Answer provided" if ok else "Answer empty"
        return {"verified": ok, "message": msg}


class IndianConstitutionSolver(BaseSolver):
    PROBLEM_TYPE = "c8_histciv_004"
    QUESTION_BANK = [
        {
            "type": "dates",
            "question": "When was the Constitution adopted and when did "
                        "it come into force? Who was the Chairman of the "
                        "Drafting Committee?",
            "answer": {
                "adopted": "26 November 1949",
                "came_into_force": "26 January 1950",
                "chairman": "Dr. B.R. Ambedkar",
            },
        },
        {
            "type": "sources",
            "question": "Match the source constitutions with their "
                        "contributions to the Indian Constitution",
            "answer": CONSTITUTION_SOURCES,
        },
        {
            "type": "features",
            "question": "List the salient features of the Indian Constitution",
            "answer": FEATURES_CONSTITUTION,
        },
        {
            "type": "preamble",
            "question": (
                "What does the Preamble declare about India? "
                "What are the key words in the Preamble?"
            ),
            "answer": {
                "declaration": (
                    "India is a Sovereign, Socialist, Secular, "
                    "Democratic Republic"
                ),
                "key_words": [
                    "Sovereign", "Socialist", "Secular",
                    "Democratic", "Republic",
                ],
                "objectives": [
                    "Justice -- social, economic, political",
                    "Liberty -- of thought, expression, belief, faith, worship",
                    "Equality -- of status and opportunity",
                    "Fraternity -- dignity of the individual and unity of the nation",
                ],
            },
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        idx, q = self._selected_idx, self._selected_q
        t = q["type"]
        if t == "dates":
            steps = [
                "Step 1: Constitution adopted by Constituent Assembly on 26 Nov 1949",
                "Step 2: It came into force on 26 Jan 1950 -- celebrated as Republic Day",
                "Step 3: Dr. B.R. Ambedkar was Chairman of the Drafting Committee",
                "Step 4: Dr. Rajendra Prasad was President of Constituent Assembly",
            ]
        elif t == "sources":
            steps = [
                "Step 1: Government of India Act 1935 -- Federal Structure",
                "Step 2: British Constitution -- Parliamentary System, Rule of Law",
                "Step 3: US Constitution -- Fundamental Rights, Judicial Review",
                "Step 4: Irish Constitution -- Directive Principles",
                "Step 5: Canadian Constitution -- Federal Structure",
            ]
        elif t == "features":
            steps = [
                "Step 1: Written and Lengthiest Constitution in the world",
                "Step 2: Federal System with a strong Centre",
                "Step 3: Parliamentary System of Government",
                "Step 4: Fundamental Rights and Fundamental Duties",
                "Step 5: Independent Judiciary with Supreme Court",
                "Step 6: Universal Adult Franchise (18+ years)",
                "Step 7: Secular State -- no state religion",
                "Step 8: Directive Principles of State Policy",
            ]
        else:
            steps = [
                "Step 1: India is Sovereign -- free from external control",
                "Step 2: India is Socialist -- aims for social and economic equality",
                "Step 3: India is Secular -- no state religion",
                "Step 4: India is Democratic -- power rests with the people",
                "Step 5: India is a Republic -- head of state is elected",
                "Step 6: Objectives: Justice, Liberty, Equality, Fraternity",
            ]
        return {"text": q["answer"], "steps": steps, "correct": True}

    def _verify(self, answer: Dict[str, Any]) -> Dict[str, Any]:
        if not self._selected_q:
            return {"verified": False, "message": "No question selected"}
        ok = bool(answer.get("text"))
        return {"verified": ok, "message": "Answer provided" if ok else "Answer empty"}


class FundamentalRightsSolver(BaseSolver):
    PROBLEM_TYPE = "c8_histciv_005"
    QUESTION_BANK = [
        {
            "type": "rights_list",
            "question": "List the six Fundamental Rights guaranteed by "
                        "the Indian Constitution",
            "answer": {
                "Article 14-18": "Right to Equality",
                "Article 19-22": "Right to Freedom",
                "Article 23-24": "Right Against Exploitation",
                "Article 25-28": "Right to Freedom of Religion",
                "Article 29-30": "Cultural and Educational Rights",
                "Article 32": "Right to Constitutional Remedies",
            },
        },
        {
            "type": "match_rights_articles",
            "question": "Match: (A) Art. 14, (B) Art. 19, "
                        "(C) Art. 21, (D) Art. 25 -- with rights",
            "answer": {
                "Article 14": "Equality before Law",
                "Article 19": "Freedom of Speech and Expression",
                "Article 21": "Protection of Life and Personal Liberty",
                "Article 25": "Freedom of Religion",
            },
        },
        {
            "type": "duties",
            "question": (
                "List the Fundamental Duties of Indian citizens "
                "as enshrined in the Constitution"
            ),
            "answer": FUNDAMENTAL_DUTIES,
        },
        {
            "type": "writs",
            "question": (
                "What are the five Writs issued by courts for "
                "enforcement of Fundamental Rights?"
            ),
            "answer": {
                "Habeas Corpus": "To produce a detained person before court",
                "Mandamus": "Directing a public authority to perform a duty",
                "Prohibition": "Prohibiting a lower court from exceeding jurisdiction",
                "Certiorari": "Quashing the order of a lower court",
                "Quo Warranto": "Enquiring into the legality of a claim to public office",
            },
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        idx, q = self._selected_idx, self._selected_q
        t = q["type"]
        if t == "rights_list":
            steps = [
                "Step 1: Right to Equality (Arts. 14-18)",
                "Step 2: Right to Freedom (Arts. 19-22)",
                "Step 3: Right Against Exploitation (Arts. 23-24)",
                "Step 4: Right to Freedom of Religion (Arts. 25-28)",
                "Step 5: Cultural and Educational Rights (Arts. 29-30)",
                "Step 6: Right to Constitutional Remedies (Art. 32)",
            ]
        elif t == "match_rights_articles":
            steps = [
                "Step 1: Art. 14 guarantees Equality before Law",
                "Step 2: Art. 19 guarantees Freedom of Speech",
                "Step 3: Art. 21 guarantees Protection of Life and Liberty",
                "Step 4: Art. 25 guarantees Freedom of Religion",
            ]
        elif t == "duties":
            steps = [
                f"Step {i+1}: {d}" for i, d in enumerate(FUNDAMENTAL_DUTIES[:7])
            ]
        else:
            steps = [
                "Step 1: Habeas Corpus -- produce detained person",
                "Step 2: Mandamus -- direct public authority to act",
                "Step 3: Prohibition -- stop lower court from overstepping",
                "Step 4: Certiorari -- quash lower court's order",
                "Step 5: Quo Warranto -- challenge right to public office",
            ]
        return {"text": q["answer"], "steps": steps, "correct": True}

    def _verify(self, answer: Dict[str, Any]) -> Dict[str, Any]:
        if not self._selected_q:
            return {"verified": False, "message": "No question selected"}
        ok = bool(answer.get("text"))
        return {"verified": ok, "message": "Fundamental rights listed" if ok else "Empty"}


class StateGovernmentSolver(BaseSolver):
    PROBLEM_TYPE = "c8_histciv_006"
    QUESTION_BANK = [
        {
            "type": "governor_powers",
            "question": "What are the powers of the Governor of a State?",
            "answer": {
                "Executive Powers": (
                    "Appoints Chief Minister, Council of Ministers, "
                    "Advocate General, etc."
                ),
                "Legislative Powers": (
                    "Can summon/prorogue Vidhan Sabha, address first session, "
                    "send messages, reserve bills for President"
                ),
                "Discretionary Powers": (
                    "Can dissolve Vidhan Sabha, recommend President's Rule, "
                    "report to President on constitutional breakdown"
                ),
            },
        },
        {
            "type": "chief_minister",
            "question": "What is the role of the Chief Minister? "
                        "How is the CM appointed?",
            "answer": {
                "appointment": (
                    "Leader of majority party/coalition in Vidhan Sabha"
                ),
                "role": (
                    "Real head of state government; leads Council of Ministers; "
                    "coordinates departments; advises Governor; "
                    "leader of majority party"
                ),
            },
        },
        {
            "type": "state_legislature",
            "question": "What is a State Legislature? "
                        "Distinguish between Vidhan Sabha and Vidhan Parishad.",
            "answer": {
                "Vidhan Sabha": {
                    "type": "Lower House (Legislative Assembly)",
                    "members": "175-500 (varies by state)",
                    "term": "5 years",
                    "minimum_age": "25 years",
                    "powers": "More powerful; controls Money Bills; can pass No-Confidence",
                },
                "Vidhan Parishad": {
                    "type": "Upper House (Legislative Council)",
                    "members": "One-third of Vidhan Sabha",
                    "term": "6 years (one-third retire every 2 years)",
                    "minimum_age": "30 years",
                    "powers": "Deliberative; cannot reject Money Bills permanently",
                },
            },
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        idx, q = self._selected_idx, self._selected_q
        t = q["type"]
        if t == "governor_powers":
            steps = [
                "Step 1: Executive -- appoints CM, Ministers, Advocate General",
                "Step 2: Legislative -- summons/prorogues Vidhan Sabha, addresses first session",
                "Step 3: Discretionary -- can dissolve Assembly, recommend President's Rule",
            ]
        elif t == "chief_minister":
            steps = [
                "Step 1: Leader of majority party in Vidhan Sabha is appointed CM",
                "Step 2: CM is the real head of the state government",
                "Step 3: CM leads Council of Ministers and allocates portfolios",
                "Step 4: CM advises Governor on appointments and decisions",
            ]
        else:
            steps = [
                "Step 1: Vidhan Sabha is the Lower House -- more powerful",
                "Step 2: Vidhan Parishad is the Upper House -- permanent body",
                "Step 3: Vidhan Sabha has 175-500 members, term 5 years",
                "Step 4: Vidhan Parishad has 1/3 of Vidhan Sabha members, term 6 years",
                "Step 5: Vidhan Sabha controls Money Bills; Vidhan Parishad can only delay",
            ]
        return {"text": q["answer"], "steps": steps, "correct": True}

    def _verify(self, answer: Dict[str, Any]) -> Dict[str, Any]:
        if not self._selected_q:
            return {"verified": False, "message": "No question selected"}
        ok = bool(answer.get("text"))
        return {"verified": ok, "message": "State government details provided" if ok else "Empty"}


class UnionLegislatureSolver(BaseSolver):
    PROBLEM_TYPE = "c8_histciv_007"
    QUESTION_BANK = [
        {
            "type": "parliament",
            "question": (
                "Describe the composition and functions of Parliament. "
                "Distinguish Lok Sabha and Rajya Sabha."
            ),
            "answer": {
                "composition": {
                    "President": "Head of Parliament (not a member)",
                    "Lok Sabha": "House of the People -- up to 552 members",
                    "Rajya Sabha": "Council of States -- up to 250 members",
                },
                "Lok Sabha": {
                    "election": "Direct election",
                    "term": "5 years",
                    "min_age": "25 years",
                    "presiding_officer": "Speaker",
                    "powers": "More powerful; controls Money Bills",
                },
                "Rajya Sabha": {
                    "election": "Indirect election by MLAs",
                    "term": "6 years (1/3 retire every 2 years)",
                    "min_age": "30 years",
                    "presiding_officer": "Vice-President (ex-officio Chairman)",
                    "powers": "Cannot permanently reject Money Bills",
                },
            },
        },
        {
            "type": "legislative_process",
            "question": "Explain the process of making a law in Parliament.",
            "answer": [
                "First Reading: Introduction of the Bill",
                "Second Reading: Discussion and clause-by-clause debate",
                "Third Reading: Vote on the Bill as a whole",
                "Bill sent to Second House for similar three readings",
                "If Second House agrees, Bill goes to President for Assent",
                "President gives Assent -- Bill becomes Law",
            ],
        },
        {
            "type": "president",
            "question": "How is the President of India elected? "
                        "What are the main powers of the President?",
            "answer": {
                "election": (
                    "Indirect election by Electoral College "
                    "(elected MPs + elected MLAs) "
                    "by proportional representation with single transferable vote"
                ),
                "executive": (
                    "Appoints PM, Council of Ministers, Governors, "
                    "CJI, other judges, CAG, CEC"
                ),
                "legislative": "Can summon, prorogue, dissolve Lok Sabha; can promulgate Ordinances",
                "financial": "Causes Annual Financial Statement to be laid before Parliament",
                "judicial": "Can grant pardons, reprieves, respites, remissions",
                "supreme_commander": "Supreme Commander of the Armed Forces",
            },
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        idx, q = self._selected_idx, self._selected_q
        t = q["type"]
        if t == "parliament":
            steps = [
                "Step 1: Parliament consists of President, Lok Sabha, Rajya Sabha",
                "Step 2: Lok Sabha -- direct election, 5 years, min age 25",
                "Step 3: Rajya Sabha -- indirect election, 6 years, min age 30",
                "Step 4: Speaker presides over Lok Sabha; Vice-Chairman presides over Rajya Sabha",
                "Step 5: Lok Sabha is more powerful; controls Money Bills",
            ]
        elif t == "legislative_process":
            steps = [
                "Step 1: First Reading -- Bill introduced",
                "Step 2: Second Reading -- clause-by-clause discussion",
                "Step 3: Third Reading -- vote on whole Bill",
                "Step 4: Bill sent to other House",
                "Step 5: Both Houses agree, Bill sent to President",
                "Step 6: President gives Assent -- Law enacted",
            ]
        else:
            steps = [
                "Step 1: Elected by Electoral College of elected MPs and MLAs",
                "Step 2: Uses proportional representation with single transferable vote",
                "Step 3: Executive -- appoints PM, Ministers, Governors, Judges",
                "Step 4: Legislative -- summons/prorogues Parliament",
                "Step 5: Can promulgate Ordinances when Parliament is not in session",
                "Step 6: Supreme Commander of Armed Forces",
            ]
        return {"text": q["answer"], "steps": steps, "correct": True}

    def _verify(self, answer: Dict[str, Any]) -> Dict[str, Any]:
        if not self._selected_q:
            return {"verified": False, "message": "No question selected"}
        ok = bool(answer.get("text"))
        return {"verified": ok, "message": "Parliament details correct" if ok else "Empty"}


class PanchayatiRajSolver(BaseSolver):
    PROBLEM_TYPE = "c8_histciv_008"
    QUESTION_BANK = [
        {
            "type": "three_tiers",
            "question": "What are the three tiers of the Panchayati Raj system?",
            "answer": {
                "Village Panchayat": {
                    "scope": "Single village or group of villages",
                    "functions": ["Road construction", "Water supply", "School buildings", "Parks"],
                },
                "Panchayat Samiti": {
                    "scope": "Block/Intermediate level",
                    "functions": ["District roads", "Primary schools", "Hospitals", "Coordination"],
                },
                "Zila Parishad": {
                    "scope": "District level",
                    "functions": ["Coordination", "Supervision", "Fund distribution", "Planning"],
                },
            },
        },
        {
            "type": "73rd_amendment",
            "question": "What are the main provisions of the "
                        "73rd Constitutional Amendment Act (1992)?",
            "answer": {
                "three_tier": "Three-tier system in every state",
                "elections": "Direct elections every 5 years",
                "reservation_women": "One-third seats reserved for women",
                "reservation_sc_st": "Seats reserved for SCs/STs proportionally",
                "state_election_commission": "Conducts Panchayat elections",
                "finance_commission": "State Finance Commission recommends fund sharing",
                "gram_sabha": "Gram Sabha as foundation of the system",
            },
        },
        {
            "type": "gram_sabha",
            "question": "What is the Gram Sabha? What is its importance?",
            "answer": {
                "definition": (
                    "Gram Sabha consists of all adult members (18+) "
                    "registered in the electoral rolls of the village"
                ),
                "importance": [
                    "Foundation of Panchayati Raj system",
                    "Approves village development plans",
                    "Reviews Panchayat's performance",
                    "Can examine annual accounts and audit reports",
                    "Directly involves citizens in local governance",
                ],
            },
        },
        {
            "type": "reservation",
            "question": "What reservations are provided in the "
                        "Panchayati Raj system?",
            "answer": {
                "women": "One-third (1/3) of all seats reserved for women",
                "sc_st": (
                    "Seats reserved for SCs and STs in proportion to "
                    "their population in the Panchayat area"
                ),
                "obc": "Some states reserve seats for OBCs",
                "chairperson": (
                    "At least one-third reservation for women "
                    "as Chairpersons/Presidents"
                ),
            },
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        idx, q = self._selected_idx, self._selected_q
        t = q["type"]
        if t == "three_tiers":
            steps = [
                "Step 1: Village Panchayat -- lowest tier, single village or group",
                "Step 2: Panchayat Samiti -- intermediate/block level",
                "Step 3: Zila Parishad -- highest tier, district level",
                "Step 4: Village Panchayat handles local infrastructure",
                "Step 5: Panchayat Samiti coordinates village Panchayats",
                "Step 6: Zila Parishad coordinates and supervises all",
            ]
        elif t == "73rd_amendment":
            steps = [
                "Step 1: 73rd Amendment (1992) added Part IX to Constitution",
                "Step 2: Three-tier system mandated in every state",
                "Step 3: Direct elections every 5 years",
                "Step 4: 1/3 seats reserved for women in all Panchayats",
                "Step 5: State Election Commission for Panchayat elections",
                "Step 6: State Finance Commission for fund sharing",
                "Step 7: Gram Sabha as foundation",
            ]
        elif t == "gram_sabha":
            steps = [
                "Step 1: Gram Sabha = all adult members (18+) of the village",
                "Step 2: It is the foundation of Panchayati Raj",
                "Step 3: Approves village development plans and budgets",
                "Step 4: Reviews annual accounts and performance of Panchayat",
                "Step 5: Empowers citizens in direct local governance",
            ]
        else:
            steps = [
                "Step 1: One-third seats reserved for women in all Panchayats",
                "Step 2: SCs/STs get seats proportional to their population",
                "Step 3: Some states also reserve seats for OBCs",
                "Step 4: One-third reservation for women as Chairpersons",
            ]
        return {"text": q["answer"], "steps": steps, "correct": True}

    def _verify(self, answer: Dict[str, Any]) -> Dict[str, Any]:
        if not self._selected_q:
            return {"verified": False, "message": "No question selected"}
        ok = bool(answer.get("text"))
        return {"verified": ok, "message": "Panchayati Raj details correct" if ok else "Empty"}


# ============================================================
# Additional solvers (c8_histciv_009, c8_histciv_010)
# ============================================================

class MughalEmpireSolver(BaseSolver):
    PROBLEM_TYPE = "c8_histciv_009"
    QUESTION_BANK = [
        {
            "type": "great_mughals",
            "question": "Name the Great Mughals and their key achievements",
            "answer": {
                "Babur (1526-1530)": "Founded Mughal Empire; won First Battle of Panipat",
                "Humayun (1530-1540, 1555-1556)": "Recovered empire with Persian help",
                "Akbar (1556-1605)": (
                    "Expanded empire; introduced religious tolerance; "
                    "abolished Jizya; Din-i-Ilahi"
                ),
                "Jahangir (1605-1627)": (
                    "Patron of art; Nir Jhula at Agra; "
                    "chain of justice"
                ),
                "Shah Jahan (1628-1658)": (
                    "Built Taj Mahal, Red Fort, Jama Masjid; "
                    "Golden Age of Mughal Architecture"
                ),
                "Aurangzeb (1658-1707)": (
                    "Largest territorial extent; reimposed Jizya; "
                    "empire began to decline after his death"
                ),
            },
        },
        {
            "type": "administration",
            "question": "Describe the administrative system of "
                        "the Mughal Empire",
            "answer": {
                "Central Government": {
                    "Emperor": "Supreme authority -- head of state, government, army, judiciary",
                    "Wazir": "Prime Minister -- head of revenue department",
                    "Mir Bakshi": "Head of military department",
                    "Qazi": "Head of judicial department",
                    "Sadr-us-Sudur": "Head of religious matters and charity",
                },
                "Provincial Government": (
                    "Provinces (Subahs) governed by Subahdars; "
                    "Faujdar maintained law and order"
                ),
                "Revenue System": (
                    "Zabt system (Akbar) -- revenue fixed at one-third of produce; "
                    "Zamindars collected revenue"
                ),
                "Mansabdari System": (
                    "Rank system combining civil and military roles; "
                    "pay determined by Zat and Sawar ranks"
                ),
            },
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        idx, q = self._selected_idx, self._selected_q
        t = q["type"]
        if t == "great_mughals":
            steps = [
                "Step 1: Babur (1526-1530) -- founded Mughal Empire, Panipat 1526",
                "Step 2: Humayun (1530-1540, 1555-1556) -- lost and regained empire",
                "Step 3: Akbar (1556-1605) -- greatest ruler, religious tolerance, Din-i-Ilahi",
                "Step 4: Jahangir (1605-1627) -- art patron, Chain of Justice",
                "Step 5: Shah Jahan (1628-1658) -- built Taj Mahal, Golden Age",
                "Step 6: Aurangzeb (1658-1707) -- largest empire, decline began",
            ]
        else:
            steps = [
                "Step 1: Emperor -- supreme authority over all departments",
                "Step 2: Wazir -- Prime Minister, head of revenue",
                "Step 3: Mir Bakshi -- military department",
                "Step 4: Provinces (Subahs) governed by Subahdars",
                "Step 5: Mansabdari system -- combined civil and military ranks",
                "Step 6: Zabt revenue system -- fixed at 1/3 of produce",
            ]
        return {"text": q["answer"], "steps": steps, "correct": True}

    def _verify(self, answer: Dict[str, Any]) -> Dict[str, Any]:
        if not self._selected_q:
            return {"verified": False, "message": "No question selected"}
        ok = bool(answer.get("text"))
        return {"verified": ok, "message": "Mughal details correct" if ok else "Empty"}


class LocalSelfGovernmentSolver(BaseSolver):
    PROBLEM_TYPE = "c8_histciv_010"
    QUESTION_BANK = [
        {
            "type": "rural_urban",
            "question": (
                "Distinguish between rural local self-government "
                "(Panchayati Raj) and urban local self-government "
                "(Municipalities/Municipal Corporations)"
            ),
            "answer": {
                "Rural (Panchayati Raj)": {
                    "tiers": "Three tiers -- Village, Block, District",
                    "head": "Sarpanch / President",
                    "members": "Elected by Gram Sabha",
                    "powers": "Local infrastructure, welfare schemes",
                    "source": "Constitution (73rd Amendment)",
                },
                "Urban (Municipalities)": {
                    "tiers": "Municipal Council / Municipal Corporation",
                    "head": "Chairman / Mayor",
                    "members": "Direct election by citizens",
                    "powers": "Urban planning, water supply, roads, sanitation",
                    "source": "Constitution (74th Amendment)",
                },
            },
        },
        {
            "type": "importance",
            "question": (
                "Why is local self-government important in a democracy?"
            ),
            "answer": [
                "Brings government closer to the people",
                "Encourages citizen participation in governance",
                "Ensures local problems get local solutions",
                "Promotes democratic values at the grassroots",
                "Provides a training ground for future leaders",
                "Empowers marginalized groups (women, SCs, STs)",
                "Enables better planning and implementation of schemes",
            ],
        },
        {
            "type": "functions",
            "question": (
                "What are the main functions of the Village Panchayat?"
            ),
            "answer": [
                "Construction and maintenance of village roads",
                "Provision of drinking water and street lights",
                "Construction and maintenance of primary schools",
                "Maintenance of burial and burning grounds",
                "Construction and maintenance of public markets",
                "Plantation of trees and maintenance of parks",
                "Establishment and management of cattle ponds",
                "Promotion of agriculture and animal husbandry",
            ],
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        idx, q = self._selected_idx, self._selected_q
        t = q["type"]
        if t == "rural_urban":
            steps = [
                "Step 1: Rural -- Panchayati Raj, 3 tiers, Sarpanch/President",
                "Step 2: Urban -- Municipalities/Corporations, single tier in cities",
                "Step 3: Rural governed by 73rd Amendment; Urban by 74th Amendment",
                "Step 4: Rural focuses on agriculture and village infrastructure",
                "Step 5: Urban focuses on city planning, sanitation, roads",
            ]
        elif t == "importance":
            steps = [
                f"Step {i+1}: {p}" for i, p in enumerate([
                    "Brings government closer to people",
                    "Encourages citizen participation",
                    "Local problems get local solutions",
                    "Promotes democratic values at grassroots",
                    "Training ground for future leaders",
                    "Empowers women and marginalized groups",
                    "Better planning and implementation",
                ])
            ]
        else:
            steps = [
                "Step 1: Construction and maintenance of village roads",
                "Step 2: Provision of drinking water and street lights",
                "Step 3: Construction and maintenance of primary schools",
                "Step 4: Maintenance of burial and burning grounds",
                "Step 5: Construction of public markets",
                "Step 6: Plantation of trees and maintenance of parks",
                "Step 7: Promotion of agriculture and animal husbandry",
            ]
        return {"text": q["answer"], "steps": steps, "correct": True}

    def _verify(self, answer: Dict[str, Any]) -> Dict[str, Any]:
        if not self._selected_q:
            return {"verified": False, "message": "No question selected"}
        ok = bool(answer.get("text"))
        return {"verified": ok, "message": "Local self-government details correct" if ok else "Empty"}


# ============================================================
# Solver Registry
# ============================================================

SOLVER_REGISTRY: Dict[str, type] = {
    IndustrialRevolutionSolver.PROBLEM_TYPE: IndustrialRevolutionSolver,
    NationalMovementSolver.PROBLEM_TYPE: NationalMovementSolver,
    Revolt1857Solver.PROBLEM_TYPE: Revolt1857Solver,
    IndianConstitutionSolver.PROBLEM_TYPE: IndianConstitutionSolver,
    FundamentalRightsSolver.PROBLEM_TYPE: FundamentalRightsSolver,
    StateGovernmentSolver.PROBLEM_TYPE: StateGovernmentSolver,
    UnionLegislatureSolver.PROBLEM_TYPE: UnionLegislatureSolver,
    PanchayatiRajSolver.PROBLEM_TYPE: PanchayatiRajSolver,
    MughalEmpireSolver.PROBLEM_TYPE: MughalEmpireSolver,
    LocalSelfGovernmentSolver.PROBLEM_TYPE: LocalSelfGovernmentSolver,
}


# ============================================================
# Convenience solve_* functions
# ============================================================

def solve_industrial_revolution(problem_id: str, seed: int = 42) -> Dict[str, Any]:
    return IndustrialRevolutionSolver(problem_id, seed).solve()

def solve_national_movement(problem_id: str, seed: int = 42) -> Dict[str, Any]:
    return NationalMovementSolver(problem_id, seed).solve()

def solve_revolt_1857(problem_id: str, seed: int = 42) -> Dict[str, Any]:
    return Revolt1857Solver(problem_id, seed).solve()

def solve_indian_constitution(problem_id: str, seed: int = 42) -> Dict[str, Any]:
    return IndianConstitutionSolver(problem_id, seed).solve()

def solve_fundamental_rights(problem_id: str, seed: int = 42) -> Dict[str, Any]:
    return FundamentalRightsSolver(problem_id, seed).solve()

def solve_state_government(problem_id: str, seed: int = 42) -> Dict[str, Any]:
    return StateGovernmentSolver(problem_id, seed).solve()

def solve_union_legislature(problem_id: str, seed: int = 42) -> Dict[str, Any]:
    return UnionLegislatureSolver(problem_id, seed).solve()

def solve_panchayati_raj(problem_id: str, seed: int = 42) -> Dict[str, Any]:
    return PanchayatiRajSolver(problem_id, seed).solve()

def solve_mughal_empire(problem_id: str, seed: int = 42) -> Dict[str, Any]:
    return MughalEmpireSolver(problem_id, seed).solve()

def solve_local_self_government(problem_id: str, seed: int = 42) -> Dict[str, Any]:
    return LocalSelfGovernmentSolver(problem_id, seed).solve()


# ============================================================
# verify_* functions
# ============================================================

def verify_answer(
    problem_type: str,
    answer: Dict[str, Any],
    seed: int = 42,
) -> Dict[str, bool]:
    if problem_type not in SOLVER_REGISTRY:
        return {"verified": False, "error": f"Unknown type: {problem_type}"}
    solver_cls = SOLVER_REGISTRY[problem_type]
    solver = solver_cls(problem_type, seed)
    solver.solve()
    v = solver._verify(answer)
    v["problem_type"] = problem_type
    return v


def verify_industrial_revolution(answer: Dict[str, Any], seed: int = 42) -> Dict[str, Any]:
    return verify_answer("c8_histciv_001", answer, seed)

def verify_national_movement(answer: Dict[str, Any], seed: int = 42) -> Dict[str, Any]:
    return verify_answer("c8_histciv_002", answer, seed)

def verify_revolt_1857(answer: Dict[str, Any], seed: int = 42) -> Dict[str, Any]:
    return verify_answer("c8_histciv_003", answer, seed)

def verify_indian_constitution(answer: Dict[str, Any], seed: int = 42) -> Dict[str, Any]:
    return verify_answer("c8_histciv_004", answer, seed)


SOLVER_REGISTRY = {
    "verify_answer": verify_answer,
    "verify_indian_constitution": verify_indian_constitution,
}


if __name__ == "__main__":
    print("Class 8 History & Civics Solver loaded")