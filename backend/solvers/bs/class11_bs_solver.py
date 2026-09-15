"""
CISCE Class 11 Business Studies Solver and Question Generator
Syllabus: c11_bs_001, c11_bs_006, c11_bs_018
"""

import random
import hashlib
from decimal import Decimal, ROUND_HALF_UP
from typing import Dict, List, Any, Optional, Tuple

# ============================================================================
# CONSTANTS AND DATA
# ============================================================================

SINGLE_PROPRIETORSHIP_FEATURES = [
    "Formation is easy with minimal legal formalities",
    "Direct incentive to the owner (profit = reward)",
    "Decision-making is fast and independent",
    "Limited scale of operation due to capital constraints",
    "Unlimited personal liability of the owner",
    "Lack of continuity — business ends with owner's death or insolvency",
    "Secrecy of business operations is maintained",
    "Suitable for small-scale businesses and sole traders"
]

PARTNERSHIP_FEATURES = [
    "Formed by agreement (Partnership Deed or oral)",
    "Minimum two partners, maximum 50 (per Companies Act)",
    "Unlimited liability for general partners",
    "Mutual agency — each partner is an agent of the firm",
    "No free transferability of share without consent",
    "Firm lacks separate legal entity from partners",
    "Registration is optional but advantageous",
    "Partners share profits and losses in agreed ratio"
]

COMPANY_FEATURES = [
    "Separate legal entity distinct from members (Salomon v. Salomon)",
    "Limited liability of shareholders up to face value of shares",
    "Perpetual succession — continues despite changes in membership",
    "Common seal — official signature of the company",
    "Transferability of shares (in public companies)",
    "Democratic management — elected directors represent shareholders",
    "Bounded by Memorandum and Articles of Association",
    "Suitable for large-scale operations"
]

EBUSINESS_FEATURES = [
    "Low entry cost compared to physical stores",
    "24x7 global market access and availability",
    "Convenience for customers — shop anytime from anywhere",
    "Wider reach beyond geographical boundaries",
    "Reduced inventory costs through just-in-time models",
    "Lower operational overheads (no physical storefront)",
    "Data-driven customer insights and personalization",
    "Security and trust concerns for online payments"
]

EBUSINESS_BARRIERS = [
    "Digital literacy gap among entrepreneurs and consumers",
    "Reliable internet connectivity requirements",
    "Cybersecurity threats and data privacy risks",
    "Lack of legal frameworks in emerging markets",
    "Trust deficit in digital payment systems",
    "High cost of technology infrastructure for MSMEs",
    "Complexities in logistics and last-mile delivery"
]

NCERT_QUESTIONS_BUSINESS_MEANING = [
    {
        "id": "BS001-Q01",
        "type": "meaning",
        "question": "Explain the concept of Business with reference to its essential elements.",
        "expected_elements": ["economic activity", "production/procurement", "exchange", "profit motive", "regularity", "uncertainty"]
    },
    {
        "id": "BS001-Q02",
        "type": "features",
        "question": "State the features that distinguish business from employment.",
        "expected_elements": ["risk", "profit motive", "regularity", "exchange of goods/services"]
    }
]

BUSINESS_OBJECTIVES = [
    "Earning profit — primary economic objective",
    "Survival — staying competitive in the market",
    "Growth — increasing market share and customer base",
    "Innovation — developing new products and processes",
    "Economic and social responsibility",
    "Employee welfare and development",
    "Customer satisfaction and service excellence",
    "Market standing and brand reputation"
]

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def compute_hash(text: str) -> str:
    """Compute deterministic hash for verification."""
    return hashlib.sha256(text.encode()).hexdigest()[:16]


def decimalize(value, places: int = 2) -> Decimal:
    """Convert to Decimal with specified rounding."""
    if isinstance(value, Decimal):
        return value.quantize(Decimal('0.' + '0' * places), rounding=ROUND_HALF_UP)
    return Decimal(str(value)).quantize(Decimal('0.' + '0' * places), rounding=ROUND_HALF_UP)


def seeded_shuffle(items: List[Any], seed: int) -> List[Any]:
    """Return a deterministically shuffled copy of items."""
    rng = random.Random(seed)
    result = items[:]
    rng.shuffle(result)
    return result

# ============================================================================
# PROBLEM GENERATORS
# ============================================================================

class ProblemGenerator:
    """Generates deterministic problems from each topic area."""

    @staticmethod
    def generate_meaning(seed: int) -> Dict[str, Any]:
        rng = random.Random(seed)
        question_templates = [
            "What is the meaning of Business? State its characteristics.",
            "Explain the concept of business and list its key features.",
            "Define Business as an economic activity and describe its essential elements.",
            "Why is profit motive central to business? Explain with reference to business objectives.",
            "Discuss the economic and non-economic objectives of business."
        ]
        q_template = rng.choice(question_templates)
        num_elements = rng.randint(4, 6)
        selected_elements = seeded_shuffle(
            ["economic activity", "production or procurement", "exchange/transaction",
             "profit motive", "regularity of dealings", "uncertainty of return", "customer satisfaction"],
            seed + 1
        )[:num_elements]

        return {
            "problem_id": f"c11_bs_001_g{seed}",
            "topic": "Meaning and Features of Business",
            "question_text": q_template,
            "type": "short_answer",
            "expected_points": selected_elements,
            "difficulty": "easy" if rng.random() < 0.4 else "medium",
            "max_marks": rng.randint(3, 5),
            "syllabus_code": "c11_bs_001"
        }

    @staticmethod
    def generate_forms(seed: int) -> Dict[str, Any]:
        rng = random.Random(seed)
        org_types = [
            ("Sole Proprietorship", SINGLE_PROPRIETORSHIP_FEATURES),
            ("Partnership Firm", PARTNERSHIP_FEATURES),
            ("Joint Stock Company", COMPANY_FEATURES)
        ]
        org_name, features = rng.choice(org_types)
        num_features = rng.randint(4, 6)
        selected = seeded_shuffle(features, seed + 2)[:num_features]
        compare_type = rng.choice(["between", "choice", "scenario"])

        question_variants = {
            "between": [
                f"Compare Sole Proprietorship and Partnership firm on the basis of formation, liability, and continuity.",
                f"Distinguish between a Partnership firm and a Joint Stock Company with reference to limited liability and transferability of shares.",
                f"Compare any three forms of business organisation on the basis of: (i) Liability, (ii) Continuity, (iii) Decision-making."
            ],
            "choice": [
                f"Amit wants to start a small bakery with an investment of INR 2 lakh. Which form of organisation is suitable? Justify with 3 reasons.",
                f"Rahul and two friends want to start an IT consultancy. Suggest the most appropriate form of organisation and explain 4 features of it.",
                f"An entrepreneur wants to raise capital from the public and limit personal liability. Which business form should they choose?"
            ],
            "scenario": [
                f"Scenario: Priya inherited a retail shop worth INR 5 lakh. She has limited capital but wants full control. Identify the best form of organisation and list 4 features supporting your choice."
            ]
        }

        return {
            "problem_id": f"c11_bs_006_g{seed}",
            "topic": "Forms of Business Organisation",
            "question_text": rng.choice(question_variants[compare_type]),
            "type": compare_type,
            "org_type": org_name,
            "expected_points": selected,
            "difficulty": "medium" if compare_type == "choice" else "hard",
            "max_marks": rng.randint(4, 6),
            "syllabus_code": "c11_bs_006"
        }

    @staticmethod
    def generate_ebusiness(seed: int) -> Dict[str, Any]:
        rng = random.Random(seed)
        eb_types = [
            "B2B (Business-to-Business)",
            "B2C (Business-to-Consumer)",
            "C2C (Consumer-to-Consumer)",
            "C2B (Consumer-to-Business)",
            "Intra-Business"
        ]
        eb_type = rng.choice(eb_types)
        num_benefits = rng.randint(3, 5)
        num_barriers = rng.randint(2, 4)
        benefits = seeded_shuffle(EBUSINESS_FEATURES, seed + 3)[:num_benefits]
        barriers = seeded_shuffle(EBUSINESS_BARRIERS, seed + 4)[:num_barriers]

        question_templates = [
            f"What is {eb_type} e-Business? Explain its features and advantages.",
            f"Explain the concept of e-Commerce within {eb_type}. List its benefits and limitations.",
            f"Describe e-Business models with reference to {eb_type}. What are the barriers to e-Business adoption?",
            f"Differentiate between e-Business and e-Commerce. Discuss the security concerns in e-Business.",
            f"An MSME wants to go online. Explain the steps in online transaction processing and list 3 risks involved."
        ]
        q_text = rng.choice(question_templates)

        return {
            "problem_id": f"c11_bs_018_g{seed}",
            "topic": "e-Business",
            "question_text": q_text,
            "type": "analytical",
            "eb_type": eb_type,
            "expected_benefits": benefits,
            "expected_barriers": barriers,
            "difficulty": "medium" if rng.random() < 0.5 else "hard",
            "max_marks": rng.randint(5, 7),
            "syllabus_code": "c11_bs_018"
        }


# ============================================================================
# SOLVER CLASSES
# ============================================================================

class BusinessMeaningSolver:
    """Solver for c11_bs_001: Meaning and Features of Business."""

    PROBLEM_TYPE = "c11_bs_001"

    MARKS_DISTRIBUTION = {
        "Definition/meaning": 1,
        "Economic activity": 0.5,
        "Profit motive": 0.5,
        "Regularity of dealings": 0.5,
        "Uncertainty of return": 0.5,
        "Customer satisfaction": 0.5,
        "Any valid point": 0.5
    }

    def solve(self, question: str, seed: int = 42) -> Dict[str, Any]:
        return self._solve(question, seed)

    def _solve(self, question: str, seed: int = 42) -> Dict[str, Any]:
        rng = random.Random(seed)
        question_lower = question.lower()
        steps = []

        steps.append("Step 1: Identify the key keywords in the question.")
        if "meaning" in question_lower or "define" in question_lower or "concept" in question_lower:
            steps.append("Step 2: Define Business as an economic activity involving production/procurement of goods/services for sale.")
            steps.append("Step 3: State that the primary objective is earning profit, alongside customer satisfaction.")
            steps.append("Step 4: List the essential elements: economic activity, exchange, profit motive, regularity, uncertainty.")
        elif "characteristic" in question_lower or "feature" in question_lower:
            steps.append("Step 2: Enumerate the characteristics of business activity.")
            steps.append("Step 3: Each feature carries 0.5 to 1 mark — ensure at least 4–5 distinct features.")
        elif "objective" in question_lower:
            steps.append("Step 2: Classify objectives into economic (profit, growth) and social (employee welfare, CSR).")
            steps.append("Step 3: Explain that profit is necessary for survival, but modern business also pursues broader goals.")
        elif "employment" in question_lower or "distinguish" in question_lower:
            steps.append("Step 2: Distinguish on the basis of: risk, profit sharing, regularity, mode of earning.")
        else:
            steps.append("Step 2: Provide a comprehensive answer covering definition, features, and objectives.")

        # Mark allocation
        total_marks = 4.0
        if "objective" in question_lower:
            total_marks = 6.0
            steps.append("Step 4: Dedicate 3 marks to economic objectives, 3 to social/other objectives.")

        answer_text = self._build_answer_text(question_lower, seed)
        total_marks = decimalize(total_marks)

        return {
            "answer": answer_text,
            "steps": steps,
            "verification": {
                "syllabus_code": self.PROBLEM_TYPE,
                "estimated_marks": float(total_marks),
                "coverage_areas": list(self.MARKS_DISTRIBUTION.keys()),
                "pass_threshold": float(total_marks * decimalize("0.4"))
            }
        }

    def _build_answer_text(self, question_lower: str, seed: int) -> str:
        rng = random.Random(seed)
        paras = []
        paras.append(
            "Meaning of Business: Business may be defined as an economic activity "
            "involving the production or procurement of goods and services with the "
            "primary objective of earning profit through regular exchange. It is "
            "characterized by uncertainty of return and risk-bearing, and aims at "
            "satisfying human needs and wants."
        )
        paras.append(
            "Features of Business: (1) It is an economic activity — it involves earning "
            "a livelihood through production, exchange, and distribution. (2) Profit "
            "motive — the primary driving force behind any business enterprise. (3) "
            "Regularity of dealings — a single transaction does not constitute business. "
            "(4) Uncertainty of return — the actual return may be less than expected. "
            "(5) Risk element — every business involves risk due to market uncertainties."
        )
        if "objective" in question_lower:
            paras.append(
                "Objectives of Business: Economic objectives include profit maximisation, "
                "market growth, and financial stability. Social/non-economic objectives "
                "include employee welfare, environmental responsibility, and customer "
                "satisfaction. Modern businesses pursue a balanced approach combining "
                "profit with broader societal goals."
            )
        if "employment" in question_lower:
            paras.append(
                "Business vs Employment: In business, the owner earns profit but bears "
                "the risk; in employment, the employee earns a fixed salary with no risk. "
                "Business offers independence in decision-making; employment operates "
                "under employer directives."
            )
        return "\n\n".join(paras)

    def _verify(self, student_answer: str, expected_points: List[str]) -> Dict[str, Any]:
        return verify_meaning_answer(student_answer, expected_points)


class BusinessFormsSolver:
    """Solver for c11_bs_006: Forms of Business Organisation."""

    PROBLEM_TYPE = "c11_bs_006"

    COMPARISON_TABLE = {
        "basis": ["Basis of Comparison", "Sole Proprietorship", "Partnership", "Joint Stock Company"],
        "formation": ["Mode of Formation", "Sole discretion; simple registration", "Partnership deed; optional registration", "Complex legal incorporation process"],
        "liability": ["Liability", "Unlimited personal liability", "Unlimited for general partners", "Limited to face value of shares"],
        "continuity": ["Continuity", "No — ends with death/insolvency", "No — depends on partners", "Yes — separate legal entity"],
        "management": ["Management", "Sole owner manages all", "Mutual agency; any partner acts", "Board of directors elected"],
        "capital": ["Capital", "Limited to owner's resources", "Pooled from partners", "Shares issued to public/private"],
        "transfer": ["Transfer of Interest", "Difficult — whole business", "Requires consent of all partners", "Freely transferable (public companies)"],
        "registration": ["Registration", "Not mandatory", "Optional but beneficial", "Mandatory under Companies Act"]
    }

    def solve(self, question: str, org_type: str = "", seed: int = 42) -> Dict[str, Any]:
        return self._solve(question, org_type, seed)

    def _solve(self, question: str, org_type: str, seed: int = 42) -> Dict[str, Any]:
        rng = random.Random(seed)
        q_lower = question.lower()
        steps = []

        steps.append("Step 1: Identify the form(s) of organisation being asked about.")
        steps.append("Step 2: Determine the comparison basis or scenario requirement.")

        if "compare" in q_lower or "distinguish" in q_lower:
            steps.append("Step 3: Identify the comparison basis mentioned in the question.")
            steps.append("Step 4: Structure the answer as a table or point-wise comparison.")
            steps.append("Step 5: Ensure at least 4–5 distinct points of comparison with specific differences.")

        if "suitable" in q_lower or "suggest" in q_lower or "justify" in q_lower:
            steps.append("Step 3: Evaluate the scenario — identify investment amount, number of persons, risk tolerance, control needs.")
            steps.append("Step 4: Select the most appropriate form and provide at least 3-4 supporting reasons.")

        if not org_type:
            org_type = rng.choice(["Sole Proprietorship", "Partnership", "Joint Stock Company"])

        answer_text = self._build_answer_text(q_lower, org_type, seed)
        estimated_marks = 5.0 if ("compare" in q_lower or "distinguish" in q_lower) else 4.0
        estimated_marks = decimalize(estimated_marks)

        return {
            "answer": answer_text,
            "steps": steps,
            "verification": {
                "syllabus_code": self.PROBLEM_TYPE,
                "org_type": org_type,
                "estimated_marks": float(estimated_marks),
                "comparison_points": self._get_comparison_points(q_lower),
                "pass_threshold": float(estimated_marks * decimalize("0.4"))
            }
        }

    def _build_answer_text(self, q_lower: str, org_type: str, seed: int) -> str:
        paras = []
        if "sole" in org_type.lower():
            paras.append(
                "Sole Proprietorship: The simplest form of business organisation, owned and "
                "managed by a single individual. Key features include: (1) Easy formation with "
                "minimal legal formalities. (2) Direct incentive — the owner enjoys all profits. "
                "(3) Full control and fast decision-making. (4) Limited capital and resources. "
                "(5) Unlimited personal liability. (6) Lack of continuity. Best suited for small "
                "businesses like retail shops, salons, and consultancy."
            )
        elif "partnership" in org_type.lower():
            paras.append(
                "Partnership Firm: A business carried on by two or more persons sharing profits "
                "and losses in an agreed ratio. Features: (1) Formed by agreement — Partnership "
                "Deed. (2) Unlimited liability for partners. (3) Mutual agency — each partner "
                "is an agent of the firm. (4) No free transferability of share. (5) Optional "
                "registration. (6) Restricted to maximum 50 partners. Suitable for medium-scale "
                "enterprises like trading firms and professional practices."
            )
        else:
            paras.append(
                "Joint Stock Company: A voluntary association of persons formed for carrying on "
                "business, having a separate legal entity. Features: (1) Separate legal entity — "
                "the company is distinct from its members (Salomon v. Salomon case). "
                "(2) Limited liability — shareholders liable only up to face value of shares. "
                "(3) Perpetual succession — death or insolvency of a member does not affect the "
                "company. (4) Transferability of shares (in public companies). (5) Common seal. "
                "(6) Democratic management through elected directors."
            )

        if "compare" in q_lower or "distinguish" in q_lower:
            paras.append(
                "Comparison Table:"
            )
            for key, row in self.COMPARISON_TABLE.items():
                if key != "basis":
                    paras.append(f"  {row[0]}: Sole Proprietorship = {row[1]}; Partnership = {row[2]}; Company = {row[3]}")

        if "suitable" in q_lower or "suggest" in q_lower:
            paras.append(
                "Recommended Form: Given the scenario constraints, Sole Proprietorship is "
                "most appropriate if (a) investment is below INR 5 lakh, (b) sole control is "
                "preferred, and (c) risk is manageable. For investment above INR 10 lakh with "
                "need for pooled capital, a Private Limited Company is preferable."
            )

        return "\n\n".join(paras)

    def _get_comparison_points(self, q_lower: str) -> List[str]:
        points = []
        for key in ["formation", "liability", "continuity", "management", "capital", "transfer", "registration"]:
            if key in q_lower:
                points.append(key)
        if not points:
            points = ["formation", "liability", "continuity"]
        return points

    def _verify(self, student_answer: str, expected_points: List[str]) -> Dict[str, Any]:
        return verify_forms_answer(student_answer, expected_points)


class EBusinessSolver:
    """Solver for c11_bs_018: e-Business."""

    PROBLEM_TYPE = "c11_bs_018"

    EBUSINESS_MODELS = {
        "B2B": {
            "description": "Business-to-Business — commerce between two business entities via online channels.",
            "examples": ["Alibaba.com (wholesale)", "Indiamart (B2B marketplace)", "Manufacturer-distributor portals"]
        },
        "B2C": {
            "description": "Business-to-Consumer — businesses sell directly to end consumers through websites or apps.",
            "examples": ["Amazon.in", "Flipkart", "Swiggy/Zomato"]
        },
        "C2C": {
            "description": "Consumer-to-Consumer — individuals trade with each other via online platforms.",
            "examples": ["OLX", "Quikr", "eBay"]
        },
        "C2B": {
            "description": "Consumer-to-Business — consumers offer products/services to businesses.",
            "examples": ["Freelancer.com", "Google AdSense", "Influencer marketing"]
        },
        "Intra-Business": {
            "description": "e-Commerce within an organisation using intranet/extranet for internal transactions.",
            "examples": ["Internal procurement portals", "Employee self-service systems"]
        }
    }

    ONLINE_TRANSACTION_STEPS = [
        "1. Placement of Order — customer selects product and confirms order on the website.",
        "2. Processing of Order — system checks inventory, confirms availability, and generates order ID.",
        "3. Delivery of Goods — logistics partner ships the product; tracking is provided.",
        "4. Billing and Payment — invoice generated; payment via net banking, card, UPI, or digital wallet."
    ]

    def solve(self, question: str, eb_type: str = "B2C", seed: int = 42) -> Dict[str, Any]:
        return self._solve(question, eb_type, seed)

    def _solve(self, question: str, eb_type: str, seed: int = 42) -> Dict[str, Any]:
        rng = random.Random(seed)
        q_lower = question.lower()
        steps = []

        steps.append("Step 1: Identify the type of e-Business model mentioned or most relevant to the question.")
        steps.append("Step 2: Define e-Business and e-Commerce clearly, distinguishing between them.")

        if eb_type not in self.EBUSINESS_MODELS:
            eb_type = rng.choice(list(self.EBUSINESS_MODELS.keys()))

        if "model" in q_lower or "type" in q_lower or "b2b" in q_lower or "b2c" in q_lower:
            steps.append(f"Step 3: Describe {eb_type} model with definition and examples.")
            steps.append("Step 4: Optionally contrast with other models (B2B, C2C, C2B, Intra-B).")

        if "advantage" in q_lower or "benefit" in q_lower or "feature" in q_lower:
            steps.append("Step 3: Enumerate benefits — low cost, 24x7 availability, wider reach, convenience.")
            steps.append("Step 4: Support each benefit with a brief explanation.")

        if "barrier" in q_lower or "limitation" in q_lower or "challenge" in q_lower or "risk" in q_lower:
            steps.append("Step 3: Identify barriers — digital literacy, connectivity, security, legal frameworks.")
            steps.append("Step 4: Explain each barrier with a real-world example.")

        if "security" in q_lower or "payment" in q_lower or "transaction" in q_lower:
            steps.append("Step 3: Describe the 4-step online transaction process.")
            steps.append("Step 4: List security measures: encryption, SSL, two-factor authentication, firewalls.")

        if "difference" in q_lower or "distinguish" in q_lower:
            steps.append("Step 3: Distinguish on basis of scope, components, and payment mechanisms.")

        answer_text = self._build_answer_text(q_lower, eb_type, seed)
        estimated_marks = 5.0
        if "security" in q_lower or "transaction" in q_lower:
            estimated_marks = 6.0
        elif "advantage" in q_lower and "barrier" in q_lower:
            estimated_marks = 7.0
        estimated_marks = decimalize(estimated_marks)

        return {
            "answer": answer_text,
            "steps": steps,
            "verification": {
                "syllabus_code": self.PROBLEM_TYPE,
                "eb_type": eb_type,
                "estimated_marks": float(estimated_marks),
                "transaction_steps_covered": "transaction" in q_lower or "payment" in q_lower,
                "pass_threshold": float(estimated_marks * decimalize("0.4"))
            }
        }

    def _build_answer_text(self, q_lower: str, eb_type: str, seed: int) -> str:
        paras = []
        paras.append(
            "e-Business vs e-Commerce: e-Business encompasses all online business activities "
            "including customer service, partner collaboration, and internal processes. "
            "e-Commerce is specifically about buying and selling goods/services over the internet. "
            "e-Commerce is a subset of e-Business."
        )

        model_info = self.EBUSINESS_MODELS.get(eb_type, self.EBUSINESS_MODELS["B2C"])
        paras.append(
            f"{eb_type} Model: {model_info['description']} "
            f"Examples: {', '.join(model_info['examples'])}."
        )

        if "advantage" in q_lower or "benefit" in q_lower or "feature" in q_lower:
            paras.append(
                "Benefits of e-Business: (1) Low entry cost — no physical storefront needed. "
                "(2) 24x7 global availability — customers can shop anytime. (3) Convenience and "
                "accessibility — shop from anywhere. (4) Wider market reach beyond geography. "
                "(5) Reduced inventory costs through efficient supply chain management. "
                "(6) Data analytics for personalized customer experience."
            )

        if "barrier" in q_lower or "limitation" in q_lower or "challenge" in q_lower:
            paras.append(
                "Barriers to e-Business: (1) Digital literacy gap among MSME owners. "
                "(2) Reliability of internet infrastructure. (3) Cybersecurity and data privacy "
                "risks. (4) Lack of trust in digital payment systems. (5) Legal and regulatory "
                "uncertainties. (6) Logistics and last-mile delivery challenges."
            )

        if "security" in q_lower or "payment" in q_lower or "transaction" in q_lower:
            paras.append(
                "Online Transaction Process: "
                + " ".join(self.ONLINE_TRANSACTION_STEPS) + " "
                "Security Measures: (1) Encryption and SSL certificates. (2) Two-factor authentication. "
                "(3) Firewalls and intrusion detection. (4) Secure payment gateways compliant with PCI DSS. "
                "(5) Privacy policies and data protection regulations."
            )

        if "difference" in q_lower or "distinguish" in q_lower:
            paras.append(
                "Key Differences: e-Business has a broader scope covering all online business "
                "processes; e-Commerce is limited to commercial transactions. e-Business uses "
                "intranet, extranet, and website; e-Commerce primarily uses a website. e-Business "
                "may not always involve monetary transactions; e-Commerce always involves payment."
            )

        return "\n\n".join(paras)

    def _verify(self, student_answer: str, expected_points: List[str]) -> Dict[str, Any]:
        return verify_ebusiness_answer(student_answer, expected_points)


# ============================================================================
# VERIFICATION FUNCTIONS
# ============================================================================

def verify_meaning_answer(student_answer: str, expected_points: List[str]) -> Dict[str, Any]:
    answer_lower = student_answer.lower()
    found_keywords = []
    keyword_bank = {
        "economic activity": ["economic", "livelihood"],
        "profit motive": ["profit", "earn", "income", "revenue"],
        "regularity": ["regular", "habitual", "repeatedly"],
        "uncertainty": ["uncertain", "risk", "risk-bearing", "unpredictable"],
        "exchange/transaction": ["exchange", "transaction", "trade", "sale"],
        "customer satisfaction": ["customer", "consumer", "satisfaction", "need", "want"],
        "production/procurement": ["production", "procurement", "manufacturing", "goods", "services"]
    }

    for keyword, aliases in keyword_bank.items():
        for alias in aliases:
            if alias in answer_lower:
                found_keywords.append(keyword)
                break

    total_possible = len(expected_points) if expected_points else len(keyword_bank)
    actual_score = len(found_keywords)
    max_score = len(keyword_bank)
    percentage = (actual_score / max_score) * 100 if max_score > 0 else 0
    passed = percentage >= 50

    return {
        "passed": passed,
        "score": actual_score,
        "max_score": max_score,
        "percentage": round(percentage, 1),
        "found_keywords": found_keywords,
        "missing_concepts": [k for k in keyword_bank if k not in found_keywords],
        "verdict": "SATISFACTORY" if passed else "NEEDS_IMPROVEMENT",
        "syllabus_code": "c11_bs_001"
    }


def verify_forms_answer(student_answer: str, expected_points: List[str]) -> Dict[str, Any]:
    answer_lower = student_answer.lower()
    concept_bank = {
        "separate legal entity": ["separate legal", "distinct from members", "salomon"],
        "limited liability": ["limited liability", "limited to"],
        "unlimited liability": ["unlimited liability", "personal liability", "personal assets"],
        "perpetual succession": ["perpetual", "continuity", "succession"],
        "mutual agency": ["mutual agency", "agent", "partners act"],
        "formation ease": ["easy formation", "minimal formalit", "simple", "registration"],
        "transferability": ["transferability", "transfer of share", "freely transferable"],
        "partnership deed": ["partnership deed", "agreement", "moa", "aoa"],
        "common seal": ["common seal", "official signature"],
        "registration": ["registration", "incorporated"],
        "profit sharing": ["profit sharing", "profit ratio", "share profits"],
        "democratic management": ["democratic", "directors", "elected"]
    }

    found = []
    for concept, aliases in concept_bank.items():
        for alias in aliases:
            if alias in answer_lower:
                found.append(concept)
                break

    total_possible = len(concept_bank)
    actual_score = len(found)
    percentage = (actual_score / total_possible) * 100 if total_possible > 0 else 0
    passed = percentage >= 40

    return {
        "passed": passed,
        "score": actual_score,
        "max_score": total_possible,
        "percentage": round(percentage, 1),
        "found_concepts": found,
        "missing_concepts": [c for c in concept_bank if c not in found],
        "verdict": "SATISFACTORY" if passed else "NEEDS_IMPROVEMENT",
        "syllabus_code": "c11_bs_006"
    }


def verify_ebusiness_answer(student_answer: str, expected_points: List[str]) -> Dict[str, Any]:
    answer_lower = student_answer.lower()
    concept_bank = {
        "e-business definition": ["e-business", "online business", "digital business"],
        "e-commerce definition": ["e-commerce", "electronic commerce", "buying selling online"],
        "b2b model": ["b2b", "business-to-business", "business to business"],
        "b2c model": ["b2c", "business-to-consumer", "business to consumer"],
        "c2c model": ["c2c", "consumer-to-consumer", "consumer to consumer"],
        "c2b model": ["c2b", "consumer-to-business", "consumer to business"],
        "low entry cost": ["low cost", "low entry", "cost effective"],
        "24x7 availability": ["24x7", "24/7", "anytime", "round the clock"],
        "wider reach": ["global", "wider reach", "geograph", "international"],
        "digital literacy barrier": ["digital literacy", "literacy", "awareness"],
        "security concerns": ["security", "cybersecurity", "hacking", "data privacy"],
        "logistics barrier": ["logistics", "delivery", "last-mile"],
        "online transaction steps": ["order", "processing", "delivery", "payment", "billing"],
        "ssl/encryption": ["ssl", "encryption", "secure socket", "https"]
    }

    found = []
    for concept, aliases in concept_bank.items():
        for alias in aliases:
            if alias in answer_lower:
                found.append(concept)
                break

    total_possible = len(concept_bank)
    actual_score = len(found)
    percentage = (actual_score / total_possible) * 100 if total_possible > 0 else 0
    passed = percentage >= 35

    return {
        "passed": passed,
        "score": actual_score,
        "max_score": total_possible,
        "percentage": round(percentage, 1),
        "found_concepts": found,
        "missing_concepts": [c for c in concept_bank if c not in found],
        "verdict": "SATISFACTORY" if passed else "NEEDS_IMPROVEMENT",
        "syllabus_code": "c11_bs_018"
    }


# ============================================================================
# SOLVER REGISTRY
# ============================================================================

SOLVER_REGISTRY: Dict[str, Any] = {}


def register_solver(solver_class):
    """Decorator to register solver classes into the SOLVER_REGISTRY."""
    ptype = solver_class.PROBLEM_TYPE
    SOLVER_REGISTRY[ptype] = solver_class()
    return solver_class


@register_solver
class BusinessMeaningRegistered(BusinessMeaningSolver):
    pass


@register_solver
class BusinessFormsRegistered(BusinessFormsSolver):
    pass


@register_solver
class EBusinessRegistered(EBusinessSolver):
    pass


# ============================================================================
# PUBLIC API FUNCTIONS
# ============================================================================

def solve_business_meaning(question: str, seed: int = 42) -> Dict[str, Any]:
    """Solve problems on Meaning and Features of Business (c11_bs_001)."""
    solver = BusinessMeaningSolver()
    return solver.solve(question, seed)


def solve_business_forms(question: str, org_type: str = "", seed: int = 42) -> Dict[str, Any]:
    """Solve problems on Forms of Business Organisation (c11_bs_006)."""
    solver = BusinessFormsSolver()
    return solver.solve(question, org_type, seed)


def solve_ebusiness(question: str, eb_type: str = "B2C", seed: int = 42) -> Dict[str, Any]:
    """Solve problems on e-Business (c11_bs_018)."""
    solver = EBusinessSolver()
    return solver.solve(question, eb_type, seed)


def generate_question(syllabus_code: str, seed: int = 42) -> Dict[str, Any]:
    """Generate a question for a given syllabus code."""
    generator = ProblemGenerator()
    if syllabus_code == "c11_bs_001":
        return generator.generate_meaning(seed)
    elif syllabus_code == "c11_bs_006":
        return generator.generate_forms(seed)
    elif syllabus_code == "c11_bs_018":
        return generator.generate_ebusiness(seed)
    else:
        raise ValueError(f"Unknown syllabus code: {syllabus_code}")


def verify_answer(syllabus_code: str, student_answer: str,
                  expected_points: Optional[List[str]] = None) -> Dict[str, Any]:
    """Verify a student answer against expected concepts."""
    if syllabus_code == "c11_bs_001":
        return verify_meaning_answer(student_answer, expected_points or [])
    elif syllabus_code == "c11_bs_006":
        return verify_forms_answer(student_answer, expected_points or [])
    elif syllabus_code == "c11_bs_018":
        return verify_ebusiness_answer(student_answer, expected_points or [])
    else:
        raise ValueError(f"Unknown syllabus code: {syllabus_code}")


def auto_discover_solvers() -> List[str]:
    """Return list of available solver types from the registry."""
    return list(SOLVER_REGISTRY.keys())


# ============================================================================
# MAIN SELF-TEST
# ============================================================================

def run_self_test() -> None:
    """Run deterministic self-tests across all solvers."""
    print("=" * 70)
    print("CISCE Class 11 Business Studies — Solver Self-Test")
    print("=" * 70)

    test_seed = 2024
    random.seed(test_seed)

    # --- Test 1: Meaning Solver ---
    print("\n[TEST 1] Meaning of Business (c11_bs_001)")
    print("-" * 70)
    question = "Define Business and state its characteristics."
    result = solve_business_meaning(question, seed=test_seed)
    assert "answer" in result, "Missing 'answer' key"
    assert "steps" in result, "Missing 'steps' key"
    assert "verification" in result, "Missing 'verification' key"
    assert len(result["steps"]) >= 2, "Not enough steps"
    assert result["verification"]["syllabus_code"] == "c11_bs_001"
    print(f"  Answer preview: {result['answer'][:120]}...")
    print(f"  Steps count: {len(result['steps'])}")
    print(f"  Estimated marks: {result['verification']['estimated_marks']}")
    print(f"  Verification: {result['verification']['verdict']}")

    verification = verify_meaning_answer(result["answer"], result["verification"]["coverage_areas"])
    print(f"  Self-verification: {verification['verdict']} ({verification['percentage']}%)")
    print(f"  Found keywords: {verification['found_keywords']}")
    assert verification["passed"], "Self-verification failed for meaning solver"
    print("  ✓ PASSED")

    # --- Test 2: Forms Solver ---
    print("\n[TEST 2] Forms of Business Organisation (c11_bs_006)")
    print("-" * 70)
    question = "Compare Sole Proprietorship and Partnership firm."
    result = solve_business_forms(question, org_type="Sole Proprietorship", seed=test_seed + 1)
    assert "answer" in result, "Missing 'answer' key"
    assert "steps" in result, "Missing 'steps' key"
    assert "verification" in result, "Missing 'verification' key"
    assert result["verification"]["syllabus_code"] == "c11_bs_006"
    print(f"  Answer preview: {result['answer'][:120]}...")
    print(f"  Org type: {result['verification']['org_type']}")
    print(f"  Steps count: {len(result['steps'])}")

    verification = verify_forms_answer(result["answer"], result["verification"]["comparison_points"])
    print(f"  Self-verification: {verification['verdict']} ({verification['percentage']}%)")
    print(f"  Found concepts: {verification['found_concepts']}")
    assert verification["passed"], "Self-verification failed for forms solver"
    print("  ✓ PASSED")

    # --- Test 3: e-Business Solver ---
    print("\n[TEST 3] e-Business (c11_bs_018)")
    print("-" * 70)
    question = "Explain B2C e-Business models and their advantages."
    result = solve_ebusiness(question, eb_type="B2C", seed=test_seed + 2)
    assert "answer" in result, "Missing 'answer' key"
    assert "steps" in result, "Missing 'steps' key"
    assert "verification" in result, "Missing 'verification' key"
    assert result["verification"]["syllabus_code"] == "c11_bs_018"
    assert result["verification"]["eb_type"] == "B2C"
    print(f"  Answer preview: {result['answer'][:120]}...")
    print(f"  e-Business type: {result['verification']['eb_type']}")
    print(f"  Steps count: {len(result['steps'])}")

    verification = verify_ebusiness_answer(result["answer"], [])
    print(f"  Self-verification: {verification['verdict']} ({verification['percentage']}%)")
    print(f"  Found concepts: {verification['found_concepts']}")
    assert verification["passed"], "Self-verification failed for e-business solver"
    print("  ✓ PASSED")

    # --- Test 4: Question Generator ---
    print("\n[TEST 4] Question Generator")
    print("-" * 70)
    for code in ["c11_bs_001", "c11_bs_006", "c11_bs_018"]:
        q = generate_question(code, seed=test_seed + 10)
        assert q["syllabus_code"] == code, f"Wrong syllabus code: {q['syllabus_code']}"
        assert "question_text" in q
        assert len(q["question_text"]) > 20
        print(f"  Generated [{code}]: {q['question_text'][:80]}...")
    print("  ✓ PASSED")

    # --- Test 5: Registry and Auto-discovery ---
    print("\n[TEST 5] Solver Registry")
    print("-" * 70)
    available = auto_discover_solvers()
    expected_types = ["c11_bs_001", "c11_bs_006", "c11_bs_018"]
    for et in expected_types:
        assert et in available, f"Missing solver type in registry: {et}"
        print(f"  Registered: {et} -> {SOLVER_REGISTRY[et].__class__.__name__}")
    print("  ✓ PASSED")

    # --- Test 6: Determinism Check ---
    print("\n[TEST 6] Determinism Check (same seed → same output)")
    print("-" * 70)
    r1 = solve_business_meaning("What is Business?", seed=100)
    r2 = solve_business_meaning("What is Business?", seed=100)
    assert r1["answer"] == r2["answer"], "Non-deterministic output detected!"
    assert r1["steps"] == r2["steps"], "Non-deterministic steps detected!"
    print(f"  Both answers match: {r1['answer'][:60]}...")
    print("  ✓ PASSED — Output is deterministic")

    # --- Test 7: Decimal Financial Calc ---
    print("\n[TEST 7] Decimal Financial Calculations")
    print("-" * 70)
    val1 = decimalize("1234.567", 2)
    val2 = decimalize("789.123", 2)
    result_dec = val1 + val2
    assert result_dec == decimalize("2023.69", 2)
    print(f"  {val1} + {val2} = {result_dec}")
    print("  ✓ PASSED")

    # --- Test 8: Edge Cases ---
    print("\n[TEST 8] Edge Cases")
    print("-" * 70)
    short_result = solve_business_meaning("Explain.", seed=999)
    assert "answer" in short_result
    assert len(short_result["answer"]) > 50
    print(f"  Short question handled: answer length = {len(short_result['answer'])} chars")

    unknown_verification = verify_answer("c11_bs_001", "Business is trade of goods.", ["profit"])
    print(f"  Partial answer verified: {unknown_verification['verdict']} ({unknown_verification['percentage']}%)")
    print("  ✓ PASSED")

    print("\n" + "=" * 70)
    print(f"All 8 tests PASSED — {len(expected_types)} solvers active, deterministic output confirmed.")
    print("=" * 70)


if __name__ == '__main__':
    run_self_test()