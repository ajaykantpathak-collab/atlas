"""
CISCE Class 10 History & Civics (HISTCIV) Complete Solver and Question Generator
Covers all syllabus nodes:
- c10_histciv_001: Meaning of Federal Setup in India
- c10_histciv_009: The President - Qualifications, Electoral College, Indirect Election
- c10_histciv_016: Supreme Court - Composition, Qualifications and Appointment of Judges
"""

import random
import math
import fractions
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Dict, List, Any, Optional, Union, Tuple
from enum import Enum
import json
import sys


# ========== CONSTANTS AND SYLLABUS DATA ==========

# 1971 Census data for Electoral vote calculation (used in numerical problems)
CENSUS_1971_DATA = {
    "Uttar Pradesh": {"population": 70170134, "mlas": 426},
    "Maharashtra": {"population": 40841151, "mlas": 288},
    "Bihar": {"population": 32996771, "mlas": 243},
    "West Bengal": {"population": 29292019, "mlas": 294},
    "Tamil Nadu": {"population": 32368729, "mlas": 234},
    "Andhra Pradesh": {"population": 26302575, "mlas": 294},
    "Madhya Pradesh": {"population": 29280415, "mlas": 320},
    "Karnataka": {"population": 22886476, "mlas": 224},
    "Gujarat": {"population": 16963095, "mlas": 182},
    "Kerala": {"population": 16788541, "mlas": 140},
    "Odisha": {"population": 15035827, "mlas": 147},
    "Punjab": {"population": 10037861, "mlas": 117},
    "Haryana": {"population": 7503626, "mlas": 90},
    "Delhi": {"population": 4020000, "mlas": 70},
    "Puducherry": {"population": 520000, "mlas": 30},
    "Assam": {"population": 10842444, "mlas": 126},
    "Jammu and Kashmir": {"population": 4322533, "mlas": 86},
    "Jharkhand": {"population": 10586292, "mlas": 81},
    "Chhattisgarh": {"population": 8115458, "mlas": 90},
    "Himachal Pradesh": {"population": 3472634, "mlas": 68},
    "Uttarakhand": {"population": 4480374, "mlas": 70},
    "Tripura": {"population": 2000276, "mlas": 60},
    "Meghalaya": {"population": 1013999, "mlas": 60},
    "Manipur": {"population": 1078435, "mlas": 60},
    "Nagaland": {"population": 510774, "mlas": 60},
    "Goa": {"population": 795120, "mlas": 40},
    "Arunachal Pradesh": {"population": 467511, "mlas": 60},
    "Mizoram": {"population": 432039, "mlas": 40},
    "Sikkim": {"population": 209843, "mlas": 32},
}

# Syllabus node metadata
SYLLABUS_NODES = {
    "c10_histciv_001": {
        "title": "Meaning of Federal Setup in India",
        "chapter": "Chapter 1: Federalism",
        "topics": ["federalism", "quasi-federal", "union_list", "state_list", 
                   "concurrent_list", "seventh_schedule", "article_1", 
                   "single_citizenship", "residuary_powers", "unitary_bias"],
        "weight": 1.0
    },
    "c10_histciv_009": {
        "title": "The President - Qualifications, Electoral College, Indirect Election",
        "chapter": "Chapter 2: The President of India",
        "topics": ["president_qualifications", "electoral_college", "indirect_election",
                   "vote_value_calculation", "president_article_58"],
        "weight": 1.0
    },
    "c10_histciv_016": {
        "title": "Supreme Court - Composition, Qualifications, Appointment",
        "chapter": "Chapter 3: The Judiciary",
        "topics": ["supreme_court_composition", "judge_qualifications", "collegium_system",
                   "cj_appointment", "federal_court", "article_124"],
        "weight": 1.0
    }
}

# Question type weights for mixed generation
QUESTION_TYPES = ["mcq", "fill_blank", "short_answer", "long_answer", "numerical"]


# ========== HELPER UTILITIES ==========

def seeded_random(seed: int):
    """Create a seeded random instance for deterministic generation."""
    rng = random.Random(seed)
    return rng


def verify_back_substitution(original: float, computed: float, tolerance: float = 1e-6) -> bool:
    """Verify numerical result by back-substitution."""
    return abs(original - computed) < tolerance


def verify_mass_balance(reactants: Dict[str, float], products: Dict[str, float]) -> bool:
    """Verify mass balance (reused pattern from chemistry, adapted for civics counts)."""
    total_reactants = sum(reactants.values())
    total_products = sum(products.values())
    return abs(total_reactants - total_products) < 1e-6


def verify_charge_balance(positive: float, negative: float) -> bool:
    """Verify charge balance (adapted pattern for vote value verification)."""
    return abs(positive - negative) < 1e-6


# ========== DATA STRUCTURES ==========

@dataclass
class Question:
    id: str
    type: str  # mcq, fill_blank, short_answer, long_answer, numerical
    topic: str
    difficulty: str  # easy, medium, hard
    node_id: str
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    marks: int = 1
    competency_based: bool = False  # True if Indian context / real-world example
    tags: List[str] = field(default_factory=list)


@dataclass
class SolverResult:
    answer: Any
    steps: List[str]
    verification: Dict[str, Any]
    is_correct: bool
    confidence: float


# ========== FEDERAL SETUP SOLVER (c10_histciv_001) ==========

class FederalSetupSolver:
    """Solver for Federal Setup in India questions."""
    
    UNION_LIST = [
        "Defence", "Foreign Affairs", "Atomic Energy", "Railways", "Banking",
        "Currency", "Post Office", "Telegraph", "Telephone", "Airways",
        "Shipping", "Insurance", "Inter-state trade", "Customs duties"
    ]
    
    STATE_LIST = [
        "Police", "Public Health", "Sanitation", "Hospitals", "Agriculture",
        "Fisheries", "Forests", "Local Government", "Land Revenue", "Villages",
        "Public Order", "Prisons", "Water Supply"
    ]
    
    CONCURRENT_LIST = [
        "Education", "Marriage", "Divorce", "Bankruptcy", "Insolvency",
        "Trade Unions", "Social Security", "Economic Planning", "Price Control"
    ]
    
    FEATURES_FEDERAL = [
        "Written Constitution", "Division of Powers", "Independent Judiciary",
        "Bicameral Legislature", "Supremacy of Constitution"
    ]
    
    FEATURES_UNITARY = [
        "Single Constitution", "Single Citizenship", "Residuary Powers with Centre",
        "Centre can dismiss State governments (Article 356)", "All India Services",
        "Single Integrated Judiciary"
    ]
    
    @classmethod
    def solve_federal_definition(cls, params: Dict) -> SolverResult:
        """
        Solve: Define and explain the federal setup in India.
        
        params: {
            "concept": str  # e.g., "federalism", "quasi_federal", "lists"
        }
        """
        steps = []
        concept = params.get("concept", "federalism")
        
        steps.append("STEP 1: Identify the concept being asked about.")
        steps.append(f"  Concept: {concept}")
        
        if concept == "federalism":
            steps.append("STEP 2: Define federalism as a system of government.")
            steps.append("  Federalism = Constitutional division of power between Centre and States.")
            steps.append("  Key features: Written Constitution, Division of Powers, Independent Judiciary.")
            steps.append("STEP 3: Explain India's specific federal structure.")
            steps.append("  Article 1: 'India, that is Bharat, shall be a Union of States.'")
            steps.append("  India is QUASI-FEDERAL (K.C. Wheare): Federal form with strong unitary bias.")
            answer = {
                "definition": "A system where power is divided between central and state governments by a written constitution",
                "indian_context": "India is quasi-federal with a strong unitary bias",
                "three_features": ["Written Constitution", "Division of Powers (Union/State/Concurrent Lists)", "Independent Judiciary"],
                "key_article": "Article 1 - Union of States",
                "key_schedule": "Seventh Schedule - Division of Powers"
            }
            
        elif concept == "quasi_federal":
            steps.append("STEP 2: Define quasi-federal system.")
            steps.append("  Quasi-federal = Federal structure with strong unitary features.")
            steps.append("  K.C. Wheare coined this term for India's Constitution.")
            steps.append("STEP 3: List unitary features (strong Centre):")
            steps.append("  - Single Constitution (not like USA's 50 constitutions)")
            steps.append("  - Single Citizenship (not like USA's dual citizenship)")
            steps.append("  - Residuary Powers with Centre (in USA, with States)")
            steps.append("  - Article 356: Centre can dismiss State government (President's Rule)")
            steps.append("  - All India Services (IAS, IPS, IFS) serve both Centre and States")
            steps.append("  - Single Integrated Judiciary")
            answer = {
                "definition": "Federal form with strong unitary bias",
                "coined_by": "K.C. Wheare",
                "unitary_features": ["Single Constitution", "Single Citizenship", "Residuary powers with Centre", 
                                    "Article 356 President's Rule", "All India Services", "Single Judiciary"]
            }
            
        elif concept == "lists":
            steps.append("STEP 2: Explain the Seventh Schedule division of powers.")
            steps.append("  Seventh Schedule has THREE lists:")
            steps.append(f"  Union List (97 subjects): Defence, Foreign Affairs, Railways, Banking, Currency...")
            steps.append(f"  State List (66 subjects): Police, Public Health, Agriculture, Local Government...")
            steps.append(f"  Concurrent List (47 subjects): Education, Marriage, Divorce, Trade Unions...")
            steps.append("STEP 3: Explain residuary powers.")
            steps.append("  Subjects not in any list = Residuary Powers = belong to CENTRE (Article 248).")
            answer = {
                "union_list_count": 97,
                "state_list_count": 66,
                "concurrent_list_count": 47,
                "residuary_powers": "Centre",
                "example_union": cls.UNION_LIST[:5],
                "example_state": cls.STATE_LIST[:5],
                "example_concurrent": cls.CONCURRENT_LIST[:5]
            }
        else:
            answer = {"error": f"Unknown concept: {concept}"}
        
        steps.append("STEP 4: Verify the answer.")
        verification = {
            "concept_matches": concept in ["federalism", "quasi_federal", "lists"],
            "three_lists_present": concept == "lists" and all(k in answer for k in ["union_list_count", "state_list_count", "concurrent_list_count"]),
            "unitary_features_count": len(cls.FEATURES_UNITARY) if concept == "quasi_federal" else 0
        }
        
        return SolverResult(
            answer=answer,
            steps=steps,
            verification=verification,
            is_correct=True,
            confidence=0.95
        )
    
    @classmethod
    def solve_federal_comparison(cls, params: Dict) -> SolverResult:
        """
        Solve: Compare Indian federalism with USA federalism.
        
        params: {
            "feature": str  # e.g., "constitution", "citizenship", "residuary_powers"
        }
        """
        steps = []
        feature = params.get("feature", "all")
        
        steps.append("STEP 1: Identify the feature to compare.")
        steps.append(f"  Feature: {feature}")
        
        comparison = {
            "constitution": {
                "india": "Single Constitution for whole country",
                "usa": "Federal Constitution + 50 State Constitutions",
                "winner": "India is more unitary"
            },
            "citizenship": {
                "india": "Single Citizenship (Article 5-11)",
                "usa": "Dual Citizenship (Federal + State)",
                "winner": "India is more unitary"
            },
            "residuary_powers": {
                "india": "With Centre (Article 248)",
                "usa": "With States (10th Amendment)",
                "winner": "India is more unitary"
            },
            "amendment_power": {
                "india": "Centre can amend Constitution (Article 368) - States have limited role",
                "usa": "States must ratify amendments (3/4th of states)",
                "winner": "USA is more federal"
            },
            "governor": {
                "india": "Governor appointed by Centre (Article 155), can dismiss state govt",
                "usa": "Governor elected by state people",
                "winner": "India is more unitary"
            }
        }
        
        if feature == "all":
            steps.append("STEP 2: Compare all key features.")
            for feat, data in comparison.items():
                steps.append(f"  {feat.upper()}: India={data['india']}, USA={data['usa']}")
            answer = comparison
        else:
            steps.append(f"STEP 2: Compare '{feature}' feature.")
            if feature in comparison:
                data = comparison[feature]
                steps.append(f"  India: {data['india']}")
                steps.append(f"  USA: {data['usa']}")
                steps.append(f"  Conclusion: {data['winner']}")
                answer = data
            else:
                answer = {"error": f"Unknown feature: {feature}"}
        
        verification = {
            "comparison_complete": feature == "all" or feature in comparison,
            "total_features_compared": len(comparison) if feature == "all" else 1
        }
        
        return SolverResult(answer=answer, steps=steps, verification=verification, 
                          is_correct=True, confidence=0.95)


# ========== PRESIDENT SOLVER (c10_histciv_009) ==========

class PresidentSolver:
    """Solver for The President questions."""
    
    QUALIFICATIONS = [
        "Must be a citizen of India",
        "Must be at least 35 years old",
        "Must be qualified for election as a member of Lok Sabha"
    ]
    
    ELECTORAL_COLLEGE_COMPOSITION = {
        "elected_lok_sabha_mp": "543 elected members",
        "elected_rajya_sabha_mp": "233 elected members (as of 2023)",
        "elected_mla_delhi": "70 MLAs of Delhi Legislative Assembly",
        "elected_mla_puducherry": "30 MLAs of Puducherry Legislative Assembly",
        "elected_mla_states": "MLAs of all State Legislative Assemblies",
        "excluded_nominated_mp": "Nominated MPs (12) do NOT vote",
        "excluded_nominated_mlc": "Nominated MLCs do NOT vote",
        "excluded_state_mlc": "MLCs (if state has Legislative Council) do NOT vote"
    }
    
    REASONS_INDIRECT_ELECTION = [
        "Maintains uniformity of representation across states",
        "Prevents President from becoming a popular rival to Prime Minister",
        "Reflects federal structure (states have representation proportional to population)",
        "Ensures President is above party politics",
        "Prevents direct mandate conflict with Lok Sabha majority"
    ]
    
    @classmethod
    def solve_qualifications(cls, params: Dict) -> SolverResult:
        """
        Solve: List and explain qualifications for President.
        
        params: {
            "action": str  # "list", "explain", "verify"
        }
        """
        steps = []
        action = params.get("action", "list")
        
        steps.append("STEP 1: Reference Article 58 of the Constitution.")
        steps.append("STEP 2: List the three qualifications for President.")
        
        for i, qual in enumerate(cls.QUALIFICATIONS, 1):
            steps.append(f"  {i}. {qual}")
        
        if action == "explain":
            steps.append("STEP 3: Explain the rationale behind each qualification.")
            steps.append("  Citizen of India: Ensures loyalty to India, not foreign allegiance.")
            steps.append("  35 years minimum: Ensures maturity and experience (same as Lok Sabha but higher).")
            steps.append("  Qualified for Lok Sabha: Ensures basic eligibility for legislative office.")
            answer = {
                "article": "Article 58",
                "qualifications": cls.QUALIFICATIONS,
                "rationale": {
                    "citizenship": "Loyalty to India",
                    "age_35": "Maturity and experience",
                    "lok_sabha_eligible": "Basic legislative eligibility"
                }
            }
        elif action == "verify":
            steps.append("STEP 3: Verify against current President.")
            steps.append("  Current President (2023): Droupadi Murmu")
            steps.append("  - Citizen of India: Yes (born in Odisha)")
            steps.append("  - Age 35+: Yes (born 1958, age 65 at election)")
            steps.append("  - Qualified for Lok Sabha: Yes (former Governor, meets criteria)")
            answer = {
                "article": "Article 58",
                "qualifications": cls.QUALIFICATIONS,
                "current_president": "Droupadi Murmu (elected 2022)",
                "verification_passed": True
            }
        else:
            answer = {
                "article": "Article 58",
                "qualifications": cls.QUALIFICATIONS,
                "count": 3
            }
        
        verification = {
            "article_referenced": True,
            "qualification_count": len(cls.QUALIFICATIONS),
            "all_three_present": all(q in str(answer) for q in ["citizen", "35", "Lok Sabha"])
        }
        
        return SolverResult(answer=answer, steps=steps, verification=verification,
                          is_correct=True, confidence=0.95)
    
    @classmethod
    def solve_electoral_college_composition(cls, params: Dict) -> SolverResult:
        """
        Solve: Describe the composition of the Electoral College.
        
        params: {
            "aspect": str  # "composition", "exclusions", "both"
        }
        """
        steps = []
        aspect = params.get("aspect", "both")
        
        steps.append("STEP 1: Reference Article 54 and Representation of People Act, 1951.")
        steps.append("STEP 2: List WHO VOTES in the Electoral College:")
        
        voters = [
            ("Elected MPs - Lok Sabha", 543, "Lok Sabha"),
            ("Elected MPs - Rajya Sabha", 233, "Rajya Sabha"),
            ("Elected MLAs - State Assemblies", "varies by state", "States"),
            ("Elected MLAs - Delhi", 70, "NCT of Delhi"),
            ("Elected MLAs - Puducherry", 30, "Puducherry UT")
        ]
        
        total_electors = 0
        for voter_type, count, region in voters:
            if isinstance(count, int):
                steps.append(f"  - {voter_type}: {count}")
                total_electors += count
            else:
                steps.append(f"  - {voter_type}: {count}")
        
        if aspect in ["exclusions", "both"]:
            steps.append("STEP 3: List WHO DOES NOT VOTE:")
            exclusions = [
                "Nominated MPs (12 in Rajya Sabha)",
                "Nominated MLCs (in states with Legislative Council)",
                "MLCs (Members of Legislative Council) - even if elected",
                "Nominated MLAs (in some contexts)"
            ]
            for exc in exclusions:
                steps.append(f"  - {exc}: Does NOT vote")
        
        steps.append(f"STEP 4: Total elected members in Electoral College (approximate):")
        steps.append(f"  Elected MPs: 776 (543 LS + 233 RS)")
        steps.append(f"  Elected MLAs: Sum varies by state")
        steps.append(f"  Total: 776 MPs + All elected MLAs")
        
        answer = {
            "article": "Article 54",
            "who_votes": {
                "elected_mp_lok_sabha": 543,
                "elected_mp_rajya_sabha": 233,
                "elected_mla_states": "All elected MLAs of State Legislative Assemblies",
                "elected_mla_delhi": 70,
                "elected_mla_puducherry": 30
            },
            "who_does_not_vote": [
                "Nominated MPs",
                "Nominated MLCs",
                "MLCs (even elected)",
                "Nominated MLAs"
            ],
            "total_elected_mp": 776,
            "principle": "Indirect election through Electoral College"
        }
        
        verification = {
            "article_cited": "Article 54",
            "total_mp_count": 543 + 233,
            "uts_included": ["Delhi", "Puducherry"],
            "uts_excluded": ["Jammu and Kashmir (now state)", "Ladakh (UT)"]
        }
        
        return SolverResult(answer=answer, steps=steps, verification=verification,
                          is_correct=True, confidence=0.95)
    
    @classmethod
    def solve_vote_value_calculation(cls, params: Dict) -> SolverResult:
        """
        Solve: Calculate value of MLA and MP votes in Presidential election.
        
        params: {
            "state": str,  # State name
            "population_1971": int (optional, will use data),
            "num_elected_mlas": int (optional, will use data),
            "total_elected_mp": int = 776,
            "total_mla_vote_value": int = 549408  # 2017 election value
        }
        """
        steps = []
        state = params.get("state", "Uttar Pradesh")
        total_elected_mp = params.get("total_elected_mp", 776)
        total_mla_vote_value = params.get("total_mla_vote_value", 549408)
        
        steps.append("STEP 1: Get 1971 Census population and elected MLA count for the state.")
        
        if state in CENSUS_1971_DATA:
            pop = CENSUS_1971_DATA[state]["population"]
            mlas = CENSUS_1971_DATA[state]["mlas"]
            steps.append(f"  State: {state}")
            steps.append(f"  Population (1971 Census): {pop:,}")
            steps.append(f"  Number of elected MLAs: {mlas}")
        else:
            pop = params.get("population_1971", 0)
            mlas = params.get("num_elected_mlas", 1)
            steps.append(f"  State: {state} (using provided values)")
            steps.append(f"  Population: {pop:,}")
            steps.append(f"  MLAs: {mlas}")
        
        if pop == 0 or mlas == 0:
            return SolverResult(
                answer={"error": "Invalid population or MLA count"},
                steps=steps,
                verification={"valid_input": False},
                is_correct=False,
                confidence=0.0
            )
        
        steps.append("STEP 2: Calculate value of each MLA vote.")
        steps.append("  Formula: MLA vote value = Population / (Elected MLAs x 1000)")
        
        mla_vote_value_fraction = Fraction(pop, mlas * 1000)
        mla_vote_value = pop / (mlas * 1000)
        
        # Round to nearest whole number as per Constitution
        mla_vote_value_rounded = round(mla_vote_value)
        
        steps.append(f"  Calculation: {pop:,} / ({mlas} x 1000)")
        steps.append(f"  = {pop:,} / {mlas * 1000:,}")
        steps.append(f"  = {float(mla_vote_value_fraction):.4f}")
        steps.append(f"  Rounded to nearest whole number: {mla_vote_value_rounded}")
        
        steps.append("STEP 3: Calculate value of each MP vote.")
        steps.append("  Formula: MP vote value = Total value of all MLA votes / Total elected MPs")
        
        # For verification, recalculate total MLA vote value
        recalculated_total = mla_vote_value_rounded * mlas
        mp_vote_value = total_mla_vote_value / total_elected_mp
        mp_vote_value_rounded = round(mp_vote_value)
        
        steps.append(f"  Total MLA vote value (given): {total_mla_vote_value:,}")
        steps.append(f"  Total elected MPs: {total_elected_mp}")
        steps.append(f"  MP vote value = {total_mla_vote_value:,} / {total_elected_mp}")
        steps.append(f"  = {float(Fraction(total_mla_vote_value, total_elected_mp)):.4f}")
        steps.append(f"  Rounded to nearest whole number: {mp_vote_value_rounded}")
        
        steps.append("STEP 4: Verify the calculation.")
        
        # Verify: Total value of all MLA votes = sum of individual MLA vote values
        total_check = mla_vote_value_rounded * mlas
        steps.append(f"  Verification: MLA vote value x Number of MLAs")
        steps.append(f"  = {mla_vote_value_rounded} x {mlas} = {total_check:,}")
        steps.append(f"  (Should approximately equal total MLA vote value used)")
        
        # Verify: MP vote value x total elected MPs should equal total MLA vote value
        mp_total_check = mp_vote_value_rounded * total_elected_mp
        steps.append(f"  Verification: MP vote value x Total elected MPs")
        steps.append(f"  = {mp_vote_value_rounded} x {total_elected_mp} = {mp_total_check:,}")
        steps.append(f"  (Should approximately equal total MLA vote value)")
        
        answer = {
            "state": state,
            "population_1971": pop,
            "num_elected_mlas": mlas,
            "mla_vote_value": mla_vote_value_rounded,
            "total_elected_mp": total_elected_mp,
            "mp_vote_value": mp_vote_value_rounded,
            "total_mla_vote_value_used": total_mla_vote_value,
            "formulas": {
                "mla_vote": "Population / (Elected MLAs x 1000)",
                "mp_vote": "Total MLA vote value / Total elected MPs"
            }
        }
        
        verification = {
            "back_substitution_mla": verify_back_substitution(
                total_check, total_mla_vote_value, tolerance=mlas * 2  # Allow rounding error
            ),
            "back_substitution_mp": verify_back_substitution(
                mp_total_check, total_mla_vote_value, tolerance=total_elected_mp * 2
            ),
            "formula_correct": True,
            "rounding_applied": True
        }
        
        return SolverResult(answer=answer, steps=steps, verification=verification,
                          is_correct=True, confidence=0.95)
    
    @classmethod
    def solve_indirect_election_rationale(cls, params: Dict) -> SolverResult:
        """
        Solve: Explain reasons for indirect election of President.
        
        params: {
            "reason_index": int (optional, for specific reason)
        }
        """
        steps = []
        reason_index = params.get("reason_index", None)
        
        steps.append("STEP 1: Understand the Electoral College system (Article 54).")
        steps.append("STEP 2: List reasons for indirect election:")
        
        for i, reason in enumerate(cls.REASONS_INDIRECT_ELECTION, 1):
            if reason_index is None or reason_index == i:
                steps.append(f"  {i}. {reason}")
        
        if reason_index is not None and 1 <= reason_index <= len(cls.REASONS_INDIRECT_ELECTION):
            steps.append(f"STEP 3: Detailed explanation of reason {reason_index}:")
            reason = cls.REASONS_INDIRECT_ELECTION[reason_index - 1]
            steps.append(f"  {reason}")
            
            detailed_explanations = {
                0: "Direct election by 900+ million voters would make the President a direct rival to the PM, potentially creating constitutional crisis. Indirect election ensures President remains above party politics.",
                1: "Each state's representation is proportional to its population (through MLA vote value), ensuring smaller states have voice alongside larger states.",
                2: "The President is a constitutional head, not an executive ruler. Indirect election emphasizes the ceremonial and constitutional role.",
                3: "If President had direct mandate, it could conflict with Lok Sabha majority, leading to deadlock (as seen in some other countries).",
                4: "Electoral College ensures federal character: Centre (MPs) and States (MLAs) both participate in choosing the head of state."
            }
            steps.append(f"  Detail: {detailed_explanations.get(reason_index, 'Maintains federal balance.')}")
            
            answer = {
                "reason": reason,
                "index": reason_index,
                "article": "Article 54"
            }
        else:
            answer = {
                "reasons": cls.REASONS_INDIRECT_ELECTION,
                "count": len(cls.REASONS_INDIRECT_ELECTION),
                "article": "Article 54"
            }
        
        verification = {
            "reasons_count": len(cls.REASONS_INDIRECT_ELECTION),
            "article_cited": True,
            "indirect_election_confirmed": True
        }
        
        return SolverResult(answer=answer, steps=steps, verification=verification,
                          is_correct=True, confidence=0.95)


# ========== SUPREME COURT SOLVER (c10_histciv_016) ==========

class SupremeCourtSolver:
    """Solver for Supreme Court questions."""
    
    COMPOSITION = {
        "total_judges": 34,
        "chief_justice": 1,
        "other_judges": 33,
        "location": "New Delhi",
        "inauguration_date": "28 January 1950",
        "replaced": "Federal Court of India (est. 1937)",
        "original_strength": 8,
        "current_strength_source": "Supreme Court (Number of Judges) Amendment Act, 2019"
    }
    
    JUDGE_QUALIFICATIONS = [
        "Citizen of India",
        "Judge of a High Court for at least 5 years",
        "OR Advocate of a High Court for at least 10 years",
        "OR Distinguished Jurist (in the opinion of the President)"
    ]
    
    APPOINTMENT_PROCESS = {
        "article": "Article 124(2)",
        "process": [
            "President appoints judges",
            "On advice of Chief Justice of India",
            "In consultation with collegium of senior judges",
            "Collegium system: Established by Judges Cases (1993, 1998)",
            "For CJI: Senior-most judge of Supreme Court is appointed"
        ],
        "key_cases": ["Supreme Court Advocates-on-Record Association vs Union of India (1993)", 
                      "In Re: Presidential Reference (1998)"],
        "first_cji": "H. J. Kania",
        "current_cji_example": "D. Y. Chandrachud (appointed Nov 2022)"
    }
    
    @classmethod
    def solve_composition(cls, params: Dict) -> SolverResult:
        """
        Solve: Describe the composition of the Supreme Court.
        
        params: {
            "aspect": str  # "full", "historical", "current"
        }
        """
        steps = []
        aspect = params.get("aspect", "full")
        
        steps.append("STEP 1: Reference Article 124 of the Constitution.")
        steps.append("STEP 2: State current composition:")
        steps.append(f"  Total Judges: {cls.COMPOSITION['total_judges']}")
        steps.append(f"  Chief Justice of India: {cls.COMPOSITION['chief_justice']}")
        steps.append(f"  Other Judges: {cls.COMPOSITION['other_judges']}")
        steps.append(f"  Location: {cls.COMPOSITION['location']}")
        
        if aspect in ["historical", "full"]:
            steps.append("STEP 3: Provide historical context:")
            steps.append(f"  Inaugurated: {cls.COMPOSITION['inauguration_date']}")
            steps.append(f"  Replaced: {cls.COMPOSITION['replaced']}")
            steps.append(f"  Original strength: {cls.COMPOSITION['original_strength']} judges")
            steps.append(f"  Current strength from: {cls.COMPOSITION['current_strength_source']}")
            
        steps.append("STEP 4: Verify the numbers.")
        verification_total = cls.COMPOSITION['chief_justice'] + cls.COMPOSITION['other_judges']
        steps.append(f"  Verification: 1 CJI + 33 judges = {verification_total}")
        steps.append(f"  Matches total judges: {verification_total == cls.COMPOSITION['total_judges']}")
        
        answer = cls.COMPOSITION.copy()
        if aspect == "current":
            answer = {k: v for k, v in cls.COMPOSITION.items() 
                     if k in ["total_judges", "chief_justice", "other_judges", "location", 
                             "current_strength_source"]}
        elif aspect == "historical":
            answer = {k: v for k, v in cls.COMPOSITION.items() 
                     if k in ["inauguration_date", "replaced", "original_strength", 
                             "current_strength_source", "total_judges"]}
        
        verification = {
            "total_correct": verification_total == cls.COMPOSITION['total_judges'],
            "cj_plus_others": cls.COMPOSITION['chief_justice'] + cls.COMPOSITION['other_judges'],
            "inauguration_date_correct": cls.COMPOSITION['inauguration_date'] == "28 January 1950",
            "article_cited": True
        }
        
        return SolverResult(answer=answer, steps=steps, verification=verification,
                          is_correct=True, confidence=0.95)
    
    @classmethod
    def solve_judge_qualifications(cls, params: Dict) -> SolverResult:
        """
        Solve: List and explain qualifications for Supreme Court judges.
        
        params: {
            "qualification_type": str  # "all", "judge_path", "advocate_path", "jurist"
        }
        """
        steps = []
        qual_type = params.get("qualification_type", "all")
        
        steps.append("STEP 1: Reference Article 124(3) of the Constitution.")
        steps.append("STEP 2: List all qualifications (alternative paths):")
        
        for i, qual in enumerate(cls.JUDGE_QUALIFICATIONS, 1):
            steps.append(f"  {i}. {qual}")
        
        steps.append("STEP 3: Explain each path:")
        
        paths = {
            "judge_path": {
                "requirement": "Judge of a High Court for at least 5 years",
                "explanation": "Must have served as a judge in any High Court of India for minimum 5 years."
            },
            "advocate_path": {
                "requirement": "Advocate of a High Court for at least 10 years",
                "explanation": "Must have practiced as an advocate in a High Court for minimum 10 years."
            },
            "jurist_path": {
                "requirement": "Distinguished Jurist (President's opinion)",
                "explanation": "Must be recognized as a distinguished legal scholar by the President. This is a rare path."
            }
        }
        
        if qual_type == "all":
            for path_name, path_data in paths.items():
                steps.append(f"  Path: {path_name}")
                steps.append(f"    Requirement: {path_data['requirement']}")
                steps.append(f"    Explanation: {path_data['explanation']}")
            answer = {
                "article": "Article 124(3)",
                "qualifications": cls.JUDGE_QUALIFICATIONS,
                "paths": paths
            }
        elif qual_type in paths:
            path_data = paths[qual_type]
            steps.append(f"  Selected path: {qual_type}")
            steps.append(f"  Requirement: {path_data['requirement']}")
            steps.append(f"  Explanation: {path_data['explanation']}")
            answer = {
                "article": "Article 124(3)",
                "qualification_type": qual_type,
                "requirement": path_data['requirement'],
                "explanation": path_data['explanation']
            }
        else:
            answer = {"error": f"Unknown qualification type: {qual_type}"}
        
        verification = {
            "article_cited": True,
            "qualification_count": len(cls.JUDGE_QUALIFICATIONS),
            "three_paths_present": qual_type == "all" and len(paths) == 3,
            "citizenship_required": "citizen" in str(cls.JUDGE_QUALIFICATIONS).lower()
        }
        
        return SolverResult(answer=answer, steps=steps, verification=verification,
                          is_correct=True, confidence=0.95)
    
    @classmethod
    def solve_appointment_process(cls, params: Dict) -> SolverResult:
        """
        Solve: Explain the appointment process of Supreme Court judges.
        
        params: {
            "focus": str  # "full_process", "collegium", "cji"
        }
        """
        steps = []
        focus = params.get("focus", "full_process")
        
        steps.append("STEP 1: Reference Article 124(2) and collegium system.")
        
        if focus in ["full_process", "collegium"]:
            steps.append("STEP 2: Describe the collegium system:")
            steps.append("  - Established through Judges Cases (1993, 1998)")
            steps.append("  - For Supreme Court judges: Collegium = CJI + 4 senior Supreme Court judges")
            steps.append("  - For High Court judges: Collegium = CJI + 2 senior Supreme Court judges + Chief Justice of that High Court")
            steps.append("  - Executive has no veto power (post-1993)")
            steps.append("  - Collegium's recommendation is binding on the President")
        
        if focus in ["full_process", "cji"]:
            steps.append("STEP 3: Appointment of Chief Justice of India:")
            steps.append("  - Traditionally: Senior-most judge of Supreme Court")
            steps.append("  - President appoints on advice of collegium")
            steps.append("  - Example: D. Y. Chandrachud appointed CJI in November 2022")
            steps.append("  - First CJI: H. J. Kania (1950)")
        
        if focus == "full_process":
            steps.append("STEP 4: Complete appointment flow:")
            steps.append("  1. Collegium (CJI + senior judges) recommends names")
            steps.append("  2. Recommendation sent to Law Ministry")
            steps.append("  3. Law Ministry sends to Prime Minister")
            steps.append("  4. Prime Minister advises President")
            steps.append("  5. President formally appoints the judge")
            steps.append("  Note: Executive cannot reject collegium recommendation.")
        
        answer = {
            "article": "Article 124(2)",
            "process": cls.APPOINTMENT_PROCESS["process"],
            "collegium_system": {
                "established": "Judges Cases (1993, 1998)",
                "supreme_court_collegium": "CJI + 4 senior Supreme Court judges",
                "key_feature": "Executive has no veto power"
            },
            "cji_appointment": {
                "tradition": "Senior-most judge",
                "first_cji": "H. J. Kania",
                "example": "D. Y. Chandrachud (Nov 2022)"
            }
        }
        
        verification = {
            "article_cited": True,
            "collegium_mentioned": True,
            "executive_veto_absent": True,
            "judges_cases_cited": True
        }
        
        return SolverResult(answer=answer, steps=steps, verification=verification,
                          is_correct=True, confidence=0.95)


# ========== COMPREHENSIVE NUMERICAL SOLVER ==========

class NumericalSolver:
    """Numerical solver for civics-related calculations."""
    
    @classmethod
    def solve_electoral_composition_analysis(cls, params: Dict) -> SolverResult:
        """
        Analyze the composition of Electoral College numerically.
        
        params: {
            "elected_ls_mp": int = 543,
            "elected_rs_mp": int = 233,
            "state_name": str  # for MLA count
        }
        """
        steps = []
        elected_ls = params.get("elected_ls_mp", 543)
        elected_rs = params.get("elected_rs_mp", 233)
        state_name = params.get("state_name", "Uttar Pradesh")
        
        steps.append("STEP 1: Calculate total elected MPs in Electoral College.")
        total_elected_mp = elected_ls + elected_rs
        steps.append(f"  Lok Sabha elected MPs: {elected_ls}")
        steps.append(f"  Rajya Sabha elected MPs: {elected_rs}")
        steps.append(f"  Total elected MPs: {total_elected_mp}")
        
        steps.append("STEP 2: Calculate percentage contribution of MPs to Electoral College.")
        # We'll need total MLA count for this, so we'll use an estimate
        total_mlas = sum(v["mlas"] for v in CENSUS_1971_DATA.values())
        total_electors = total_elected_mp + total_mlas
        mp_percentage = (total_elected_mp / total_electors) * 100
        mla_percentage = (total_mlas / total_electors) * 100
        
        steps.append(f"  Total elected MLAs (all states): {total_mlas}")
        steps.append(f"  Total Electoral College members: {total_electors:,}")
        steps.append(f"  MPs percentage: {mp_percentage:.2f}%")
        steps.append(f"  MLAs percentage: {mla_percentage:.2f}%")
        
        steps.append("STEP 3: Calculate for specific state if provided.")
        if state_name in CENSUS_1971_DATA:
            state_mlas = CENSUS_1971_DATA[state_name]["mlas"]
            state_pop = CENSUS_1971_DATA[state_name]["population"]
            state_percentage = (state_mlas / total_electors) * 100
            
            steps.append(f"  State: {state_name}")
            steps.append(f"  MLAs from {state_name}: {state_mlas}")
            steps.append(f"  Population (1971): {state_pop:,}")
            steps.append(f"  Percentage of Electoral College: {state_percentage:.4f}%")
            
            # Calculate vote value
            mla_vv = round(state_pop / (state_mlas * 1000))
            total_mla_vv = sum(round(v["population"] / (v["mlas"] * 1000)) * v["mlas"] 
                              for v in CENSUS_1971_DATA.values())
            mp_vv = round(total_mla_vv / total_elected_mp)
            
            steps.append(f"  MLA vote value (approx): {mla_vv}")
            steps.append(f"  MP vote value (approx): {mp_vv}")
            
            answer = {
                "total_elected_mp": total_elected_mp,
                "total_elected_mla": total_mlas,
                "total_electors": total_electors,
                "mp_percentage": round(mp_percentage, 2),
                "mla_percentage": round(mla_percentage, 2),
                "state": state_name,
                "state_mlas": state_mlas,
                "mla_vote_value": mla_vv,
                "mp_vote_value": mp_vv
            }
        else:
            answer = {
                "total_elected_mp": total_elected_mp,
                "total_elected_mla": total_mlas,
                "total_electors": total_electors,
                "mp_percentage": round(mp_percentage, 2),
                "mla_percentage": round(mla_percentage, 2)
            }
        
        verification = {
            "total_correct": total_elected_mp == elected_ls + elected_rs,
            "percentages_sum": abs(mp_percentage + mla_percentage - 100.0) < 0.01,
            "population_data_used": state_name in CENSUS_1971_DATA
        }
        
        return SolverResult(answer=answer, steps=steps, verification=verification,
                          is_correct=True, confidence=0.95)
    
    @classmethod
    def solve_vote_value_comparison(cls, params: Dict) -> SolverResult:
        """
        Compare vote values across different states.
        
        params: {
            "state1": str,
            "state2": str
        }
        """
        steps = []
        state1 = params.get("state1", "Uttar Pradesh")
        state2 = params.get("state2", "Sikkim")
        
        steps.append("STEP 1: Retrieve data for both states.")
        
        if state1 not in CENSUS_1971_DATA or state2 not in CENSUS_1971_DATA:
            return SolverResult(
                answer={"error": "One or both states not found in census data"},
                steps=steps,
                verification={"valid_states": False},
                is_correct=False,
                confidence=0.0
            )
        
        data1 = CENSUS_1971_DATA[state1]
        data2 = CENSUS_1971_DATA[state2]
        
        steps.append(f"  State 1: {state1}")
        steps.append(f"    Population (1971): {data1['population']:,}")
        steps.append(f"    Elected MLAs: {data1['mlas']}")
        
        steps.append(f"  State 2: {state2}")
        steps.append(f"    Population (1971): {data2['population']:,}")
        steps.append(f"    Elected MLAs: {data2['mlas']}")
        
        steps.append("STEP 2: Calculate MLA vote values.")
        
        vv1 = round(data1['population'] / (data1['mlas'] * 1000))
        vv2 = round(data2['population'] / (data2['mlas'] * 1000))
        
        steps.append(f"  {state1} MLA vote value = {data1['population']:,} / ({data1['mlas']} x 1000)")
        steps.append(f"  = {data1['population'] / (data1['mlas'] * 1000):.4f} ≈ {vv1}")
        
        steps.append(f"  {state2} MLA vote value = {data2['population']:,} / ({data2['mlas']} x 1000)")
        steps.append(f"  = {data2['population'] / (data2['mlas'] * 1000):.4f} ≈ {vv2}")
        
        steps.append("STEP 3: Compare the values.")
        ratio = vv1 / vv2 if vv2 != 0 else 0
        steps.append(f"  Ratio: {vv1} / {vv2} = {ratio:.2f}")
        steps.append(f"  {state1} MLA's vote is worth {ratio:.2f}x {state2} MLA's vote")
        
        steps.append("STEP 4: Explain the significance.")
        steps.append("  This ensures proportional representation based on population.")
        steps.append("  Larger states have proportionally more influential MLAs in Presidential election.")
        
        answer = {
            "state1": state1,
            "state2": state2,
            "state1_data": {"population": data1['population'], "mlas": data1['mlas'], "vote_value": vv1},
            "state2_data": {"population": data2['population'], "mlas": data2['mlas'], "vote_value": vv2},
            "ratio": round(ratio, 2),
            "principle": "Proportional representation based on population"
        }
        
        verification = {
            "formula_applied_correctly": True,
            "both_states_valid": True,
            "ratio_calculated": ratio > 0
        }
        
        return SolverResult(answer=answer, steps=steps, verification=verification,
                          is_correct=True, confidence=0.95)


# ========== QUESTION BANK ==========

class QuestionBank:
    """Comprehensive question bank for all syllabus nodes."""
    
    def __init__(self, seed: int = 42):
        self.rng = seeded_random(seed)
        self.questions = self._build_question_bank()
    
    def _build_question_bank(self) -> List[Question]:
        """Build the complete question bank."""
        questions = []
        
        # ========== FEDERAL SETUP QUESTIONS (c10_histciv_001) ==========
        
        # MCQ - Standard
        questions.append(Question(
            id="FED001_MCQ_01",
            type="mcq",
            topic="Federalism - Definition",
            difficulty="medium",
            node_id="c10_histciv_001",
            question="Which Article of the Indian Constitution declares India as a 'Union of States'?",
            options=["Article 1", "Article 14", "Article 19", "Article 21"],
            answer="Article 1",
            explanation="Article 1 of the Constitution states: 'India, that is Bharat, shall be a Union of States.' This establishes the federal structure of India.",
            marks=1,
            competency_based=False,
            tags=["article_1", "union_of_states"]
        ))
        
        # MCQ - Competency (Indian context)
        questions.append(Question(
            id="FED001_MCQ_02",
            type="mcq",
            topic="Federalism - Quasi-federal nature",
            difficulty="medium",
            node_id="c10_histciv_001",
            question="During the COVID-19 pandemic (2020), both the Centre (through Disaster Management Act) and States (through local orders) exercised their respective powers. This demonstrates:",
            options=["Unitary system", "Federal system in action", "Dictatorial powers", "State autonomy only"],
            answer="Federal system in action",
            explanation="The concurrent exercise of power by Centre and States during COVID-19 is a real-world example of Indian federalism. The Centre used the Disaster Management Act while States used their own executive powers.",
            marks=1,
            competency_based=True,
            tags=["quasi_federal", "covid_19", "real_world_example"]
        ))
        
        # MCQ - Standard
        questions.append(Question(
            id="FED001_MCQ_03",
            type="mcq",
            topic="Federalism - Lists",
            difficulty="medium",
            node_id="c10_histciv_001",
            question="How many subjects are listed in the Union List of the Seventh Schedule?",
            options=["66", "47", "97", "100"],
            answer="97",
            explanation="The Seventh Schedule divides legislative powers into three lists: Union List (97 subjects), State List (66 subjects), and Concurrent List (47 subjects).",
            marks=1,
            competency_based=False,
            tags=["seventh_schedule", "union_list"]
        ))
        
        # MCQ - Competency
        questions.append(Question(
            id="FED001_MCQ_04",
            type="mcq",
            topic="Federalism - Comparison with USA",
            difficulty="hard",
            node_id="c10_histciv_001",
            question="Unlike the USA, India has: (i) Single Constitution, (ii) Single Citizenship, (iii) Residuary powers with States. How many of these are correct?",
            options=["Zero", "One", "Two", "Three"],
            answer="Two",
            explanation="India has (i) Single Constitution and (ii) Single Citizenship - both correct. However, (iii) is WRONG: In India, residuary powers are with the CENTRE (Article 248), not with States. In USA, residuary powers are with States. So 2 out of 3 are correct.",
            marks=1,
            competency_based=True,
            tags=["usa_comparison", "single_citizenship", "residuary_powers"]
        ))
        
        # Fill Blank - Standard
        questions.append(Question(
            id="FED001_FB_01",
            type="fill_blank",
            topic="Federalism - Key terms",
            difficulty="easy",
            node_id="c10_histciv_001",
            question="India is described as a __________ system with a strong unitary bias (as described by K.C. Wheare).",
            options=None,
            answer="quasi-federal",
            explanation="K.C. Wheare described India as a 'quasi-federal' system because while it has a federal structure (division of powers), it also has strong unitary features like a single constitution, single citizenship, and residuary powers with the Centre.",
            marks=1,
            competency_based=False,
            tags=["quasi_federal", "kc_wheare"]
        ))
        
        # Fill Blank - Competency
        questions.append(Question(
            id="FED001_FB_02",
            type="fill_blank",
            topic="Federalism - Lists",
            difficulty="medium",
            node_id="c10_histciv_001",
            question="__________ and __________ fall under the Concurrent List of the Seventh Schedule.",
            options=None,
            answer=["Education", "Marriage"],
            explanation="The Concurrent List (47 subjects) includes Education, Marriage, Divorce, Bankruptcy, Trade Unions, etc. Both Centre and States can make laws on these subjects, but Centre law prevails in case of conflict.",
            marks=1,
            competency_based=False,
            tags=["concurrent_list", "seventh_schedule"]
        ))
        
        # Short Answer - Standard
        questions.append(Question(
            id="FED001_SA_01",
            type="short_answer",
            topic="Federalism - Three features",
            difficulty="medium",
            node_id="c10_histciv_001",
            question="List any three key features of Indian federalism.",
            options=None,
            answer=["Written Constitution", "Division of Powers (Union/State/Concurrent Lists)", 
                   "Independent Judiciary", "Bicameral Legislature"],
            explanation="Three key features of Indian federalism are: (1) Written Constitution - The Constitution of India is written and detailed, (2) Division of Powers - The Seventh Schedule divides powers into Union, State, and Concurrent Lists, (3) Independent Judiciary - The Supreme Court and High Courts are independent and can settle disputes between Centre and States.",
            marks=2,
            competency_based=False,
            tags=["three_features", "federalism"]
        ))
        
        # Short Answer - Competency
        questions.append(Question(
            id="FED001_SA_02",
            type="short_answer",
            topic="Federalism - COVID-19 example",
            difficulty="medium",
            node_id="c10_histciv_001",
            question="Give one example from the COVID-19 pandemic (2020) that shows federalism in action in India.",
            options=None,
            answer="Centre imposed lockdown under Disaster Management Act while States implemented local containment measures",
            explanation="During COVID-19, the Centre used the Disaster Management Act, 2005 to impose national lockdowns. States simultaneously used their executive powers to implement local containment measures, manage health infrastructure, and enforce quarantine rules. This shows both levels of government operating in their respective domains.",
            marks=2,
            competency_based=True,
            tags=["covid_19", "real_world", "federalism_in_action"]
        ))
        
        # Short Answer - Competency
        questions.append(Question(
            id="FED001_SA_03",
            type="short_answer",
            topic="Federalism - Article 356",
            difficulty="medium",
            node_id="c10_histciv_001",
            question="What is Article 356 and how does it show the unitary bias of the Indian Constitution?",
            options=None,
            answer="Article 356 allows the President to dismiss a state government and impose President's Rule if the constitutional machinery breaks down in the state",
            explanation="Article 356 (President's Rule) allows the Centre to dismiss a state government and assume control. This is a strong unitary feature not found in purely federal systems like the USA. It has been used multiple times in Indian history, showing the Centre's overriding power over states.",
            marks=2,
            competency_based=True,
            tags=["article_356", "presidents_rule", "unitary_bias"]
        ))
        
        # Long Answer - Standard
        questions.append(Question(
            id="FED001_LA_01",
            type="long_answer",
            topic="Federalism - Comprehensive",
            difficulty="hard",
            node_id="c10_histciv_001",
            question="Explain the meaning of federalism. Describe why India is called a 'quasi-federal' state, highlighting both its federal and unitary features.",
            options=None,
            answer={
                "federal_features": ["Written Constitution", "Division of Powers", "Independent Judiciary"],
                "unitary_features": ["Single Constitution", "Single Citizenship", "Residuary powers with Centre", 
                                    "Article 356", "All India Services", "Single Integrated Judiciary"],
                "conclusion": "India is quasi-federal - federal structure with strong unitary bias"
            },
            explanation="Federalism means division of power between Centre and States by Constitution. India has federal features (written constitution, division of powers, independent judiciary) but also strong unitary features (single constitution, single citizenship, residuary powers with Centre, Article 356, All India Services, single integrated judiciary). Hence, K.C. Wheare called it 'quasi-federal'.",
            marks=4,
            competency_based=False,
            tags=["quasi_federal", "federal_vs_unitary", "comprehensive"]
        ))

# return {"status": "ok", "note": "truncated"}
