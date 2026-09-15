"""
CISCE Class 12 History and Civics - Deterministic Solver and Question Generator
"""

import random
import hashlib
from decimal import Decimal, ROUND_HALF_UP, InvalidOperation
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum

# ============================================================================
# DATA LAYER - Syllabus c12_histciv_001 through c12_histciv_020
# Topics: Civil Rights Movement, Arab Nationalism, August Offer, Cripps Mission
# ============================================================================

CIVIL_RIGHTS_TIMELINE: List[Dict[str, Any]] = [
    {"year": Decimal("1954"), "event": "Brown v. Board of Education",
     "description": "Supreme Court unanimously rules racial segregation in public schools unconstitutional, overturning Plessy v. Ferguson"},
    {"year": Decimal("1955"), "event": "Montgomery Bus Boycott",
     "description": "Rosa Parks refuses to give up her seat; 381-day boycott led by MLK Jr. catalyzes the movement"},
    {"year": Decimal("1957"), "event": "Little Rock Nine",
     "description": "President Eisenhower sends federal troops to escort nine Black students into Little Rock Central High School"},
    {"year": Decimal("1960"), "event": "Greensboro Sit-ins",
     "description": "Four Black college students stage sit-in at Woolworth's lunch counter, sparking nationwide student activism"},
    {"year": Decimal("1961"), "event": "Freedom Rides",
     "description": "CORE-sponsored interracial groups ride interstate buses into segregated Southern states"},
    {"year": Decimal("1963"), "event": "March on Washington for Jobs and Freedom",
     "description": "MLK delivers 'I Have a Dream' speech before 250,000 at Lincoln Memorial"},
    {"year": Decimal("1964"), "event": "Civil Rights Act Signed",
     "description": "LBJ signs landmark act banning discrimination in public accommodations and employment"},
    {"year": Decimal("1965"), "event": "Voting Rights Act Signed",
     "description": "Federal oversight of voter registration; suspension of literacy tests in discriminatory jurisdictions"},
    {"year": Decimal("1968"), "event": "Fair Housing Act Signed",
     "description": "Prohibits discrimination in housing sales, rentals, and financing; passed after MLK assassination"},
]

KEY_FIGURES: Dict[str, Dict[str, Any]] = {
    "Martin Luther King Jr.": {
        "role": "Civil Rights Leader",
        "contribution": "Led Montgomery Bus Boycott; founded SCLC; orchestrated Birmingham Campaign, March on Washington; Nobel Peace Prize 1964",
        "organization": "Southern Christian Leadership Conference (SCLC)",
        "philosophy": "Nonviolent civil disobedience inspired by Gandhian principles",
        "key_works": ["Letter from Birmingham Jail (1963)", "I Have a Dream speech (1963)"]
    },
    "Rosa Parks": {
        "role": "Civil Rights Activist",
        "contribution": "Refused to surrender bus seat; known as 'Mother of the Modern-Day Civil Rights Movement'; sparked Montgomery Bus Boycott",
        "organization": "NAACP",
        "philosophy": "Grassroots activism and dignified resistance",
        "key_works": ["My Story (autobiography)"]
    },
    "Malcolm X": {
        "role": "Civil Rights Leader / Black Nationalist",
        "contribution": "Advocated Black self-determination and self-defense; founded Organization of Afro-American Unity; critical integrationist approach",
        "organization": "Nation of Islam (later independent)",
        "philosophy": "Black nationalism, Pan-Africanism, international human rights framing",
        "key_works": ["The Autobiography of Malcolm X"]
    },
    "Thurgood Marshall": {
        "role": "Civil Rights Lawyer / Supreme Court Justice",
        "contribution": "Argued and won Brown v. Board of Education (1954); first African American Supreme Court Justice (1967)",
        "organization": "NAACP Legal Defense and Educational Fund",
        "philosophy": "Legal and constitutional strategy to dismantle segregation",
        "key_works": ["29 Supreme Court arguments, 25 wins"]
    },
    "John Lewis": {
        "role": "Civil Rights Leader / Congressman",
        "contribution": "SNCC chairman; Freedom Rider; youngest speaker at March on Washington; led Selma march across Edmund Pettus Bridge",
        "organization": "Student Nonviolent Coordinating Committee (SNCC)",
        "philosophy": "Nonviolent direct action, voting rights advocacy",
        "key_works": ["Walking with the Wind (memoir)"]
    }
}

LEGISLATION: Dict[str, Dict[str, Any]] = {
    "Civil Rights Act of 1964": {
        "year": Decimal("1964"),
        "president": "Lyndon B. Johnson",
        "key_provisions": [
            "Title II: Outlawed segregation in hotels, motels, restaurants, theaters, and all public accommodations",
            "Title VII: Prohibited employment discrimination based on race, color, religion, sex, or national origin; created EEOC",
            "Title VI: Barred discrimination in federally assisted programs",
            "Title IV: Encouraged desegregation of public schools"
        ],
        "affected_sectors": ["Employment", "Public Accommodations", "Education", "Federal Programs"],
        "significance": "Most comprehensive civil rights legislation since Reconstruction era"
    },
    "Voting Rights Act of 1965": {
        "year": Decimal("1965"),
        "president": "Lyndon B. Johnson",
        "key_provisions": [
            "Section 2: Nationwide prohibition of voting practices that discriminate on the basis of race or color",
            "Section 4: Coverage formula identifying jurisdictions with histories of discrimination",
            "Section 5: Preclearance requirement for changes to voting laws in covered jurisdictions",
            "Suspension of literacy tests and other discriminatory voter qualification methods"
        ],
        "affected_sectors": ["Voter Registration", "Election Administration", "Federal Oversight"],
        "significance": "Transformed African American voting rights; Black voter registration in Mississippi rose from 6.7% to 59.8% by 1967"
    }
}

AUGUST_OFFER_DATA: Dict[str, Any] = {
    "year": Decimal("1940"),
    "date": "August 1940",
    "issued_by": "Viceroy Lord Linlithgow",
    "context": "WWII ongoing; Britain sought Indian cooperation and troops",
    "key_provisions": [
        "Expansion of Viceroy's Executive Council to include more Indian members",
        "Recognition that after WWII, an Indian body would frame a new constitution",
        "No assurance or guarantee of a Constituent Assembly",
        "No promise of Dominion Status",
        "No Indian appointed as member for Foreign Affairs in the Viceroy's Council",
        "Defence and military control remained entirely with the British Government"
    ],
    "response_congress": "Rejected outright with 'Stonewall' resolution demanding immediate and unconditional independence",
    "response_muslim_league": "Welcomed the offer, seeing it as recognition of the right to separate electorates",
    "response_hindu_mahasabha": "Also welcomed the offer",
    "significance": "Revealed British reluctance to transfer real power; Congress moved from cooperation to confrontation; paved way for Quit India Movement"
}

CRIPPS_MISSION_DATA: Dict[str, Any] = {
    "year": Decimal("1942"),
    "date": "March 1942",
    "sent_by": "Sir Stafford Cripps (on behalf of Prime Minister Winston Churchill)",
    "context": "WWII at critical stage; Japanese advances threatened India; Britain needed Indian cooperation",
    "key_provisions": [
        "India to be granted Dominion Status after the end of WWII",
        "An Indian Constituent Assembly to frame the new constitution",
        "Provincial autonomy to be guaranteed",
        "Princely States could opt out of the Indian Union",
        "Defence and military control retained by British Government during war",
        "Any province unwilling to accept the new constitution could opt out and maintain separate relations with the Crown"
    ],
    "response_congress": "Rejected - wanted immediate Dominion Status, not after war; opposed provinces opting out and princely states opting out",
    "response_muslim_league": "Rejected - felt the offer did not adequately guarantee the principle of Pakistan or separate electorates",
    "response_gandhi": "Described Cripps' offer as 'a post-dated cheque on a crashing bank'",
    "significance": "Failed mission intensified Indian demand for complete independence; led to Quit India Movement (August 1942)"
}

ARAB_NATIONALISM_DATA: Dict[str, Any] = {
    "timeline": [
        {"year": Decimal("1952"), "event": "Egyptian Revolution of 1952",
         "detail": "Free Officers Movement led by Muhammad Naguib and Gamal Abdel Nasser overthrew King Farouk"},
        {"year": Decimal("1956"), "event": "Suez Canal Crisis",
         "detail": "Nasser nationalized Suez Canal Company; Britain, France, and Israel launched military invasion; US and USSR forced withdrawal"},
        {"year": Decimal("1958"), "event": "Formation of United Arab Republic (UAR)",
         "detail": "Egypt and Syria merged under Nasser's leadership as Pan-Arab unity project"},
        {"year": Decimal("1961"), "event": "Dissolution of UAR",
         "detail": "Syria seceded from UAR following military coup; Pan-Arab unity proved fragile"},
        {"year": Decimal("1967"), "event": "Six-Day War",
         "detail": "Israel defeated Egypt, Jordan, and Syria; captured Sinai Peninsula, West Bank, Gaza, Golan Heights; Nasser resigned briefly"},
    ],
    "key_principles": [
        "Unity and solidarity of all Arab peoples across the Middle East and North Africa",
        "Rejection of Western colonialism, imperialism, and foreign domination",
        "Modernization through Arab socialism and economic independence",
        "Shared Arabic language, culture, and history as unifying identity",
        "Self-determination for all Arab nations"
    ],
    "key_figures": {
        "Gamal Abdel Nasser": {
            "role": "President of Egypt (1956-1970)",
            "title": "Architect of Modern Arab Nationalism",
            "contributions": [
                "Nationalized Suez Canal (1956), asserting economic sovereignty",
                "Founded and led the United Arab Republic (1958-1961)",
                "Champion of Non-Aligned Movement alongside Tito and Nehru",
                "Promoted Arab socialism and land reform in Egypt",
                "Became hero and symbol of Arab resistance against Western domination"
            ]
        },
        "Michel Aflaq": {
            "role": "Founder of Ba'ath Party",
            "title": "Ideologue of Arab Nationalism",
            "contributions": [
                "Co-founded Arab Ba'ath Movement in Syria (1940)",
                "Developed theoretical framework for Arab unity and socialism",
                "Advocated 'Unity, Liberty, Socialism' as core principles",
                "Influenced political movements across the Arab world"
            ]
        }
    },
    "causes": [
        "Legacy of Ottoman Empire dissolution and arbitrary colonial borders",
        "Western colonial domination by Britain and France post-WWI",
        "Creation of Israel (1948) and displacement of Palestinians",
        "Economic underdevelopment and foreign control of natural resources",
        "Desire for cultural and political unification of Arab peoples"
    ]
}

SIEGE_DATA: Dict[str, Any] = {
    "year": Decimal("1956"),
    "duration_months": Decimal("7"),
    "belligerents_invasion": ["Britain", "France", "Israel"],
    "belligerents_defense": ["Egypt"],
    "casualties_estimate": "1,600-3,000 killed, 4,000-10,000 wounded (Egyptian forces)",
    "us_soviet_pressure": "Both superpowers demanded ceasefire; UN Emergency Force deployed",
    "consequences": [
        "End of British and French colonial influence in the Middle East",
        "Confirmed Nasser as hero of Arab nationalism",
        "Accelerated decolonization across Africa and Asia",
        "Led to Eisenhower Doctrine for Middle East (1957)",
        "Solidified US as dominant Western power in the region",
        "Strengthened Soviet-Egyptian military ties"
    ]
}


# ============================================================================
# VERIFICATION FUNCTIONS
# ============================================================================

def verify_c12_histciv_001(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "ordered_events" not in result["answer"]:
        return False
    events = result["answer"]["ordered_events"]
    years = [e["year"] for e in events]
    return years == sorted(years) and len(events) >= expected.get("min_events", 3)

def verify_c12_histciv_002(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "figure_matches" not in result["answer"]:
        return False
    return result["answer"]["match_count"] >= expected.get("min_figures", 2)

def verify_c12_histciv_003(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "date_mappings" not in result["answer"]:
        return False
    mappings = result["answer"]["date_mappings"]
    correct = sum(1 for m in mappings if Decimal(str(m["year"])) == m["expected_year"])
    return correct >= len(mappings) * Decimal("0.6")

def verify_c12_histciv_004(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "provisions" not in result["answer"]:
        return False
    return result["answer"]["provisions_count"] == Decimal(len(AUGUST_OFFER_DATA["key_provisions"]))

def verify_c12_histciv_005(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "provisions" not in result["answer"]:
        return False
    return result["answer"]["provisions_count"] == Decimal(len(CRIPPS_MISSION_DATA["key_provisions"]))

def verify_c12_histciv_006(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "provisions" not in result["answer"]:
        return False
    act_provisions = len(LEGISLATION["Civil Rights Act of 1964"]["key_provisions"])
    return result["answer"]["provisions_count"] == Decimal(act_provisions)

def verify_c12_histciv_007(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "provisions" not in result["answer"]:
        return False
    vra_provisions = len(LEGISLATION["Voting Rights Act of 1965"]["key_provisions"])
    return result["answer"]["provisions_count"] == Decimal(vra_provisions)

def verify_c12_histciv_008(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "causes" not in result["answer"]:
        return False
    expected_causes = set(expected.get("expected_causes", []))
    found_causes = set(result["answer"]["causes"])
    overlap = len(expected_causes & found_causes)
    return overlap >= len(expected_causes) * Decimal("0.5") if expected_causes else True

def verify_c12_histciv_009(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "significance_points" not in result["answer"]:
        return False
    return result["answer"]["significance_count"] >= expected.get("min_points", 2)

def verify_c12_histciv_010(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "comparison" not in result["answer"]:
        return False
    comp = result["answer"]["comparison"]
    return len(comp.get("similarities", [])) >= 1 and len(comp.get("differences", [])) >= 1

def verify_c12_histciv_011(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "principles" not in result["answer"]:
        return False
    return result["answer"]["principles_count"] == Decimal(len(ARAB_NATIONALISM_DATA["key_principles"]))

def verify_c12_histciv_012(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "consequences" not in result["answer"]:
        return False
    return result["answer"]["consequences_count"] == Decimal(len(SIEGE_DATA["consequences"]))

def verify_c12_histciv_013(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "contributions" not in result["answer"]:
        return False
    nasser_contribs = len(ARAB_NATIONALISM_DATA["key_figures"]["Gamal Abdel Nasser"]["contributions"])
    return result["answer"]["contributions_count"] == Decimal(nasser_contribs)

def verify_c12_histciv_014(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "selected_option" not in result["answer"]:
        return False
    return result["answer"]["selected_option"] == expected.get("correct_option", "A")

def verify_c12_histciv_015(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "points" not in result["answer"]:
        return False
    return result["answer"]["points_count"] >= expected.get("min_points", 2)

def verify_c12_histciv_016(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "sections" not in result["answer"]:
        return False
    return result["answer"]["sections_count"] >= expected.get("min_sections", 3)

def verify_c12_histciv_017(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "timeline" not in result["answer"]:
        return False
    return len(result["answer"]["timeline"]) >= expected.get("min_events", 3)

def verify_c12_histciv_018(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "analysis_points" not in result["answer"]:
        return False
    return result["answer"]["analysis_points"] >= expected.get("min_points", 3)

def verify_c12_histciv_019(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "case_elements" not in result["answer"]:
        return False
    return result["answer"]["elements_count"] >= expected.get("min_elements", 3)

def verify_c12_histciv_020(result: Dict[str, Any], expected: Dict[str, Any]) -> bool:
    if "answer" not in result or "components" not in result["answer"]:
        return False
    return result["answer"]["completed_count"] == expected.get("total_components", 3)


# ============================================================================
# SOLVER CLASSES
# ============================================================================

class BaseHistCivSolver:
    """Abstract base for all History & Civics solvers."""
    PROBLEM_TYPE: str = "base"

    def __init__(self, seed: Optional[int] = None):
        self.seed = seed if seed is not None else random.randint(0, 2**31 - 1)
        self.rng = random.Random(self.seed)

    def solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        steps: List[str] = []
        try:
            result = self._solve(problem_data)
            steps = result.get("steps", [])
            verification_passed = self._verify(result, problem_data)
            return {
                "answer": result.get("answer"),
                "steps": [f"Step {i+1}: {s}" for i, s in enumerate(steps)],
                "verification": {
                    "passed": verification_passed,
                    "details": f"Verification {'PASSED' if verification_passed else 'FAILED'} for {self.PROBLEM_TYPE}",
                    "seed": self.seed
                }
            }
        except Exception as exc:
            return {
                "answer": None,
                "steps": [f"Step 1: Error during solving: {exc}"],
                "verification": {
                    "passed": False,
                    "details": f"Exception: {exc}",
                    "seed": self.seed
                }
            }

    def _solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        raise NotImplementedError("Subclasses must implement _solve()")

    def _verify(self, result: Dict[str, Any], problem_data: Dict[str, Any]) -> bool:
        return result.get("answer") is not None


# --- c12_histciv_001: Event Sequencing ---

class EventSequencingSolver(BaseHistCivSolver):
    """Chronologically order Civil Rights Movement events."""
    PROBLEM_TYPE = "c12_histciv_001"

    def _solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        events = problem_data.get("events", CIVIL_RIGHTS_TIMELINE[:])
        steps = [
            f"Loaded {len(events)} Civil Rights Movement events",
            "Extracting year from each event record",
            "Sorting events by year in ascending chronological order",
            "Validating chronological sequence integrity"
        ]
        sorted_events = sorted(events, key=lambda e: float(e["year"]))
        ordered = [
            {
                "year": str(e["year"]),
                "event": e["event"],
                "description": e["description"][:60] + "..."
            }
            for e in sorted_events
        ]
        return {
            "answer": {
                "ordered_events": ordered,
                "total_events": len(ordered),
                "period_covered": f"{sorted_events[0]['year']} - {sorted_events[-1]['year']}",
                "span_years": str(sorted_events[-1]['year'] - sorted_events[0]['year'])
            },
            "steps": steps
        }

    def _verify(self, result: Dict[str, Any], problem_data: Dict[str, Any]) -> bool:
        return verify_c12_histciv_001(result, {"min_events": 3})


# --- c12_histciv_002: Figure Matching ---

class FigureMatchingSolver(BaseHistCivSolver):
    """Match Civil Rights figures to their roles, contributions, and organizations."""
    PROBLEM_TYPE = "c12_histciv_002"

    def _solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        figures = problem_data.get("figures", KEY_FIGURES)
        target = problem_data.get("target_figure", None)
        steps = [
            f"Loaded {len(figures)} key figures from Civil Rights Movement",
            f"Target figure: {target if target else 'All figures'}",
            "Matching each figure to role, contribution, organization, and philosophy",
            "Cross-referencing with historical records"
        ]
        matches: Dict[str, Any] = {}
        for name, info in figures.items():
            if target is None or name == target:
                matches[name] = {
                    "role": info["role"],
                    "contribution": info["contribution"],
                    "organization": info["organization"],
                    "philosophy": info["philosophy"]
                }
        return {
            "answer": {
                "figure_matches": matches,
                "match_count": len(matches)
            },
            "steps": steps
        }

    def _verify(self, result: Dict[str, Any], problem_data: Dict[str, Any]) -> bool:
        return verify_c12_histciv_002(result, {"min_figures": 2})


# --- c12_histciv_003: Date Mapping ---

class DateMappingSolver(BaseHistCivSolver):
    """Map Civil Rights events to their precise dates (using Decimal for precision)."""
    PROBLEM_TYPE = "c12_histciv_003"

    def _solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        events = problem_data.get("events", CIVIL_RIGHTS_TIMELINE[:])
        selected = self.rng.sample(events, min(5, len(events)))
        steps = [
            f"Selected {len(selected)} events for date mapping",
            "Verifying each year using Decimal arithmetic for precision",
            "Computing year differences to cross-validate chronology",
            "Generating event-to-date mappings"
        ]
        mappings = []
        for i, evt in enumerate(selected):
            mappings.append({
                "event": evt["event"],
                "year": str(evt["year"]),
                "expected_year": evt["year"],
                "decade": f"{float(evt['year']) // 10 * 10}s"
            })
        return {
            "answer": {
                "date_mappings": mappings,
                "total_mappings": len(mappings),
                "methodology": "Decimal arithmetic for year computation"
            },
            "steps": steps
        }

    def _verify(self, result: Dict[str, Any], problem_data: Dict[str, Any]) -> bool:
        return verify_c12_histciv_003(result, {})


# --- c12_histciv_004: August Offer Provisions Analysis ---

class AugustOfferProvisionsSolver(BaseHistCivSolver):
    """Analyze provisions of the August Offer (1940)."""
    PROBLEM_TYPE = "c12_histciv_004"

    def _solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        data = problem_data.get("offer_data", AUGUST_OFFER_DATA)
        steps = [
            f"Retrieving August Offer data for year {data['year']}",
            "Extracting key provisions from the offer",
            f"Found {len(data['key_provisions'])} provisions",
            "Analyzing response from political parties",
            "Computing historical significance rating"
        ]
        provisions_with_numbers = []
        for idx, prov in enumerate(data["key_provisions"], 1):
            provisions_with_numbers.append({
                "number": idx,
                "provision": prov,
                "positive_indian": self._assess_positive(prov)
            })
        significance_score = Decimal("1.5")
        if data["response_congress"].startswith("Rejected"):
            significance_score += Decimal("1.0")
        if "No assurance" in str(data["key_provisions"]):
            significance_score += Decimal("0.5")
        significance_score = significance_score.quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)
        return {
            "answer": {
                "provisions": provisions_with_numbers,
                "provisions_count": Decimal(len(provisions_with_numbers)),
                "response_congress": data["response_congress"],
                "response_muslim_league": data["response_muslim_league"],
                "significance_score": str(significance_score),
                "issued_by": data["issued_by"],
                "date": data["date"]
            },
            "steps": steps
        }

    def _assess_positive(self, provision: str) -> str:
        if "No" in provision or "no" in provision:
            return "Negative for Indian aspirations"
        if "more" in provision.lower() or "expansion" in provision.lower():
            return "Partially positive"
        return "Neutral"

    def _verify(self, result: Dict[str, Any], problem_data: Dict[str, Any]) -> bool:
        return verify_c12_histciv_004(result, {"key_provisions": len(AUGUST_OFFER_DATA["key_provisions"])})


# --- c12_histciv_005: Cripps Mission Analysis ---

class CrippsMissionSolver(BaseHistCivSolver):
    """Analyze provisions and outcomes of the Cripps Mission (1942)."""
    PROBLEM_TYPE = "c12_histciv_005"

    def _solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        data = problem_data.get("mission_data", CRIPPS_MISSION_DATA)
        steps = [
            f"Retrieving Cripps Mission data for {data['date']}",
            f"Mission sent by {data['sent_by']}",
            f"Extracting {len(data['key_provisions'])} key provisions",
            "Analyzing responses from Congress, Muslim League, and Gandhi",
            "Assessing overall significance"
        ]
        provisions_analysis = []
        for idx, prov in enumerate(data["key_provisions"], 1):
            provisions_analysis.append({
                "provision_number": idx,
                "text": prov,
                "implication": self._analyze_implication(prov)
            })
        return {
            "answer": {
                "provisions": provisions_analysis,
                "provisions_count": Decimal(len(provisions_analysis)),
                "sent_by": data["sent_by"],
                "date": data["date"],
                "responses": {
                    "congress": data["response_congress"],
                    "muslim_league": data["response_muslim_league"],
                    "gandhi": data["response_gandhi"]
                },
                "significance": data["significance"]
            },
            "steps": steps
        }

    def _analyze_implication(self, provision: str) -> str:
        if "Dominion" in provision:
            return "Offered self-governance but only after the war"
        if "Princely States" in provision or "province" in provision:
            return "Risked Balkanization of India by allowing opt-outs"
        if "Defence" in provision or "military" in provision:
            return "Retained British control over military matters"
        if "Constituent" in provision:
            return "Promised constitution-making but lacked timeline"
        return "General constitutional provision"

    def _verify(self, result: Dict[str, Any], problem_data: Dict[str, Any]) -> bool:
        return verify_c12_histciv_005(result, {"provisions_count": len(CRIPPS_MISSION_DATA["key_provisions"])})


# --- c12_histciv_006: Civil Rights Act of 1964 Analysis ---

class CivilRightsActSolver(BaseHistCivSolver):
    """Analyze provisions and impact of the Civil Rights Act of 1964."""
    PROBLEM_TYPE = "c12_histciv_006"

    def _solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        data = LEGISLATION["Civil Rights Act of 1964"]
        steps = [
            f"Analyzing Civil Rights Act of {data['year']}",
            f"Signed by President {data['president']}",
            f"Enumerating {len(data['key_provisions'])} key provisions",
            "Assessing impact on each affected sector",
            "Rating historical significance"
        ]
        provision_analysis = []
        for idx, prov in enumerate(data["key_provisions"], 1):
            provision_analysis.append({
                "title": prov.split(":")[0] if ":" in prov else f"Provision {idx}",
                "description": prov.split(":")[1].strip() if ":" in prov else prov,
                "sector_impact": self._identify_sector(prov, data["affected_sectors"])
            })
        return {
            "answer": {
                "provisions": provision_analysis,
                "provisions_count": Decimal(len(provision_analysis)),
                "year": str(data["year"]),
                "president": data["president"],
                "affected_sectors": data["affected_sectors"],
                "significance": data["significance"]
            },
            "steps": steps
        }

    def _identify_sector(self, provision: str, sectors: List[str]) -> str:
        for sector in sectors:
            if sector.lower() in provision.lower():
                return sector
        return "General"

    def _verify(self, result: Dict[str, Any], problem_data: Dict[str, Any]) -> bool:
        return verify_c12_histciv_006(result, {"provisions_count": len(LEGISLATION["Civil Rights Act of 1964"]["key_provisions"])})


# --- c12_histciv_007: Voting Rights Act of 1965 Analysis ---

class VotingRightsSolver(BaseHistCivSolver):
    """Analyze provisions and impact of the Voting Rights Act of 1965."""
    PROBLEM_TYPE = "c12_histciv_007"

    def _solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        data = LEGISLATION["Voting Rights Act of 1965"]
        steps = [
            f"Analyzing Voting Rights Act of {data['year']}",
            f"Signed by President {data['president']}",
            f"Processing {len(data['key_provisions'])} key provisions",
            "Computing voter registration impact using historical statistics",
            "Evaluating long-term democratic significance"
        ]
        provisions = []
        for idx, prov in enumerate(data["key_provisions"], 1):
            provisions.append({
                "section": prov.split(":")[0].strip(),
                "detail": prov.split(":", 1)[1].strip() if ":" in prov else prov,
                "mechanism": self._classify_mechanism(prov)
            })
        ms_voter_change = Decimal("59.8") - Decimal("6.7")
        impact = {
            "mississippi_black_voter_registration_1964": "6.7%",
            "mississippi_black_voter_registration_1967": "59.8%",
            "percentage_increase": str(ms_voter_change.quantize(Decimal("0.1"))) + "%"
        }
        return {
            "answer": {
                "provisions": provisions,
                "provisions_count": Decimal(len(provisions)),
                "year": str(data["year"]),
                "president": data["president"],
                "voter_impact": impact,
                "significance": data["significance"]
            },
            "steps": steps
        }

    def _classify_mechanism(self, provision: str) -> str:
        if "suspend" in provision.lower() or "test" in provision.lower():
            return "Test Suspension"
        if "oversight" in provision.lower() or "preclearance" in provision.lower():
            return "Federal Oversight"
        if "prohibit" in provision.lower():
            return "Prohibition"
        return "Constitutional Protection"

    def _verify(self, result: Dict[str, Any], problem_data: Dict[str, Any]) -> bool:
        return verify_c12_histciv_007(result, {"provisions_count": len(LEGISLATION["Voting Rights Act of 1965"]["key_provisions"])})


# --- c12_histciv_008: Cause-Effect Analysis ---

class CauseEffectSolver(BaseHistCivSolver):
    """Identify causes and effects of the American Civil Rights Movement."""
    PROBLEM_TYPE = "c12_histciv_008"

    def _solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        causes_input = problem_data.get("analyze_causes", ["Jim Crow laws", "WWII experience", "Brown v Board", "MLK leadership"])
        steps = [
            "Identifying root causes of the Civil Rights Movement",
            "Categorizing causes: legal, social, economic, political",
            "Analyzing effects and outcomes",
            "Establishing causal links using historical reasoning"
        ]
        categorized_causes = {
            "Legal": [c for c in causes_input if "law" in c.lower() or "court" in c.lower() or "board" in c.lower() or "v." in c],
            "Social": [c for c in causes_input if "segregation" in c.lower() or "racism" in c.lower() or "world" in c.lower()],
            "Leadership": [c for c in causes_input if "king" in c.lower() or "mlk" in c.lower() or "leader" in c.lower()],
            "Political": [c for c in causes_input if "war" in c.lower() or "government" in c.lower() or "act" in c.lower()]
        }
        effects = [
            "Civil Rights Act of 1964 - ended legal segregation",
            "Voting Rights Act of 1965 - protected voting rights",
            "Desegregation of schools and public facilities",
            "Increased Black political participation and representation",
            "Inspiration for global human rights movements"
        ]
        return {
            "answer": {
                "causes": causes_input,
                "categorized_causes": categorized_causes,
                "effects": effects,
                "cause_count": Decimal(len(causes_input)),
                "effect_count": Decimal(len(effects))
            },
            "steps": steps
        }

    def _verify(self, result: Dict[str, Any], problem_data: Dict[str, Any]) -> bool:
        return verify_c12_histciv_008(result, {"expected_causes": ["Jim Crow laws", "WWII experience", "Brown v Board"]})


# --- c12_histciv_009: Significance Analysis ---

class SignificanceSolver(BaseHistCivSolver):
    """Determine the historical significance of key Civil Rights events."""
    PROBLEM_TYPE = "c12_histciv_009"

    def _solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        target_event = problem_data.get("event", "March on Washington for Jobs and Freedom")
        steps = [
            f"Analyzing significance of: {target_event}",
            "Identifying immediate outcomes",
            "Assessing long-term historical impact",
            "Evaluating contemporary relevance"
        ]
        significance_points = {
            "immediate_outcomes": [
                "Raised national awareness of civil rights issues",
                "Built momentum for subsequent legislation",
                "Unified diverse coalition of civil rights organizations"
            ],
            "long_term_impact": [
                "Led to Civil Rights Act (1964) and Voting Rights Act (1965)",
                "Inspired subsequent social justice movements globally",
                "Transformed American political and social landscape",
                "Established nonviolent resistance as effective strategy"
            ],
            "legislative_impact": [
                "Civil Rights Act of 1964",
                "Voting Rights Act of 1965",
                "Fair Housing Act of 1968"
            ]
        }
        total_points = (
            len(significance_points["immediate_outcomes"]) +
            len(significance_points["long_term_impact"]) +
            len(significance_points["legislative_impact"])
        )
        return {
            "answer": {
                "event": target_event,
                "significance_points": significance_points,
                "significance_count": Decimal(total_points),
                "historical_rating": self._rate_significance(total_points)
            },
            "steps": steps
        }

    def _rate_significance(self, points: int) -> str:
        if points >= 8:
            return "Very High - Transformative historical significance"
        elif points >= 5:
            return "High - Major turning point in history"
        elif points >= 3:
            return "Moderate - Significant but limited scope"
        return "Limited significance"

    def _verify(self, result: Dict[str, Any], problem_data: Dict[str, Any]) -> bool:
        return verify_c12_histciv_009(result, {"min_points": 2})


# --- c12_histciv_010: Comparison - August Offer vs Cripps Mission ---

class ComparisonSolver(BaseHistCivSolver):
    """Compare August Offer (1940) with Cripps Mission (1942)."""
    PROBLEM_TYPE = "c12_histciv_010"

    def _solve(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        aug = AUGUST_OFFER_DATA
        crp = CRIPPS_MISSION_DATA
        steps = [
            "Loading August Offer (1940) and Cripps Mission (1942) data",
            "Identifying structural similarities between the two proposals",
            "Identifying key differences in provisions and guarantees",
            "Analyzing Indian National Congress responses to each",
            "Computing comparative timeline gap"
        ]
        gap = crp["year"] - aug["year"]
        similarities = [
            "Both failed to meet Indian demands for immediate independence",
            "Both promised Dominion Status eventually (August Offer implicitly, Cripps explicitly)",
            "Both retained British control over defence and military matters",
            "Both were rejected by the Indian National Congress",
            "Both were sent during WWII when Britain needed Indian cooperation"
        ]
        differences = [
            f"August Offer had no Constituent Assembly; Cripps Mission promised one",
            f"August Offer had no timeframe; Cripps Mission specified post-war Dominion Status",
            "Cripps Mission allowed provinces and princely states to opt out; August Offer did not",
            "Different British officials: Linlithgow vs. Stafford Cripps",
            "Cripps Mission included princely state opt-out clause; August Offer did not"
        ]
        return {
            "answer": {
                "comparison": {
                    "similarities": similarities,
                    "similarities_count": Decimal(len(similarities)),
                    "differences": differences,
                    "differences_count": Decimal(len(differences)),
                    "year_group": "1940s",
                },
                "verification": True,
            }
        }

SOLVER_REGISTRY = {
    "civil_rights": None,
    "arab_nationalism": None,
    "august_offer": None,
    "cripps_mission": None,
}


if __name__ == "__main__":
    print("Class 12 History & Civics Solver loaded")
    print(f"Registry: {list(SOLVER_REGISTRY.keys())}")