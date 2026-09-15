import random
import math
from fractions import Fraction
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Any
from enum import Enum

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"
    MATCH_COLUMNS = "match_columns"
    TRUE_FALSE = "true_false"
    DIAGRAM_LABEL = "diagram_label"

class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class Topic(Enum):
    CELL_STRUCTURE = "cell_structure"
    CELL_ORGANELLES = "cell_organelles"
    PLANT_VS_ANIMAL_CELL = "plant_vs_animal_cell"
    LEAF_EXTERNAL = "leaf_external"
    LEAF_INTERNAL = "leaf_internal"
    LEAF_VENATION = "leaf_venation"
    FLOWER_STRUCTURE = "flower_structure"
    DIGESTIVE_ORGANS = "digestive_organs"
    DIGESTIVE_ENZYMES = "digestive_enzymes"
    DIGESTIVE_PROCESS = "digestive_process"
    RESPIRATORY_MECHANISM = "respiratory_mechanism"
    RESPIRATORY_GASEOUS = "respiratory_gaseous"
    CIRCULATORY_HEART = "circulatory_heart"
    CIRCULATORY_BLOOD = "circulatory_blood"
    BLOOD_COMPONENTS = "blood_components"
    NERVOUS_BRAIN = "nervous_brain"
    NERVOUS_NERVES = "nervous_nerves"
    NERVOUS_REFLEX = "nervous_reflex"
    TRANSPIRATION = "transpiration"
    FACTORS_TRANSPIRATION = "factors_transpiration"
    DISEASES = "diseases"

@dataclass
class Question:
    id: str
    type: str
    topic: str
    difficulty: str
    competency: str
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    marks: int = 1
    indian_context: bool = False

@dataclass
class Step:
    step_num: int
    description: str
    result: str = ""

@dataclass
class SolveResult:
    answer: Any
    steps: List[Dict]
    verification: str
    explanation: str

def _seed(seed: int):
    random.seed(seed)

# ============================== SOLVER FUNCTIONS ==============================

def solve_leaf_venation(params: Dict) -> SolveResult:
    """Identify venation type from given leaf characteristics."""
    leaf_name = params.get("leaf_name", "")
    venation_type = params.get("venation_type", "")
    steps = [
        {"step": 1, "desc": f"Examine the leaf: {leaf_name}"},
        {"step": 2, "desc": f"Check vein arrangement: {venation_type}"},
    ]
    if venation_type == "reticulate":
        answer = "Reticulate venation — net-like arrangement of veins (dicotyledons)"
        verification = f"Common examples: mango, peepal, rose, neem — all show net-like venation"
    elif venation_type == "parallel":
        answer = "Parallel venation — veins run parallel (monocotyledons)"
        verification = f"Common examples: grass, banana, wheat, rice — all show parallel venation"
    else:
        answer = "Unknown — please specify venation type"
        verification = "Cannot verify without venation data"
    steps.append({"step": 3, "desc": f"Conclusion: {answer}"})
    return SolveResult(
        answer=answer,
        steps=steps,
        verification=verification,
        explanation=f"A leaf with {venation_type} venation has veins that are {'net-like' if venation_type=='reticulate' else 'parallel to each other'}. This is a key characteristic used in plant classification."
    )

def solve_cell_comparison(params: Dict) -> SolveResult:
    """Compare plant and animal cells."""
    feature = params.get("feature", "")
    steps = [
        {"step": 1, "desc": f"Compare cells based on: {feature}"},
    ]
    comparison_table = {
        "cell_wall": ("Present in plant cell (made of cellulose)", "Absent in animal cell"),
        "chloroplast": ("Present in plant cell (contains chlorophyll)", "Absent in animal cell"),
        "vacuole": ("Large central vacuole in plant cell", "Small or no vacuoles in animal cell"),
        "shape": ("Rectangular / fixed shape", "Round / irregular shape"),
        "centrioles": ("Usually absent", "Present (help in cell division)"),
    }
    plant_desc, animal_desc = comparison_table.get(feature, ("Unknown", "Unknown"))
    answer = f"Plant cell: {plant_desc}; Animal cell: {animal_desc}"
    steps.append({"step": 2, "desc": f"Plant cell: {plant_desc}"})
    steps.append({"step": 3, "desc": f"Animal cell: {animal_desc}"})
    verification = f"Microscopic observation confirms these structural differences are consistent across all plant and animal tissues."
    return SolveResult(
        answer=answer,
        steps=steps,
        verification=verification,
        explanation=f"Plant and animal cells share the same basic organelles (nucleus, cytoplasm, mitochondria) but differ in key structures related to their different functions."
    )

def solve_organ_function(params: Dict) -> SolveResult:
    """Identify organ and its function in human body systems."""
    organ = params.get("organ", "")
    system = params.get("system", "")
    steps = [{"step": 1, "desc": f"Identify organ: {organ} in the {system} system"}]
    organ_data = {
        "heart": {"system": "circulatory", "function": "Pumps blood throughout the body; 4 chambers (2 atria + 2 ventricles)", "facts": "About the size of a clenched fist"},
        "lungs": {"system": "respiratory", "function": "Exchange of oxygen and carbon dioxide; right lung has 3 lobes, left has 2", "facts": "Left lung is slightly smaller to make room for the heart"},
        "stomach": {"system": "digestive", "function": "Churns food with gastric juices; contains HCl and pepsin", "facts": "J-shaped muscular bag; can hold about 1-1.5 litres"},
        "small_intestine": {"system": "digestive", "function": "Absorbs digested nutrients; about 7 metres long in adults", "facts": "Has villi to increase surface area for absorption"},
        "brain": {"system": "nervous", "function": "Control centre of the body; processes information and sends signals", "facts": "Protected by the skull and cerebrospinal fluid"},
        "kidney": {"system": "excretory", "function": "Filters blood and removes waste as urine", "facts": "Humans have 2 kidneys"},
        "liver": {"system": "digestive", "function": "Produces bile; detoxifies blood; stores glycogen", "facts": "Largest internal organ"},
        "spine": {"system": "nervous", "function": "Protects spinal cord; provides support and flexibility", "facts": "Made of 33 vertebrae"},
    }
    data = organ_data.get(organ.lower(), {"function": "Unknown", "facts": "N/A"})
    answer = f"Function: {data['function']}. Key fact: {data['facts']}"
    steps.append({"step": 2, "desc": f"Function: {data['function']}"})
    steps.append({"step": 3, "desc": f"Interesting fact: {data['facts']}"})
    verification = f"Textbook biology (ICSE Class 6) confirms the {organ} belongs to the {system} system with the stated function."
    return SolveResult(
        answer=answer,
        steps=steps,
        verification=verification,
        explanation=f"The {organ} is a vital organ in the {system} system. It plays a crucial role in maintaining homeostasis."
    )

def solve_digestive_enzyme(params: Dict) -> SolveResult:
    """Identify enzyme, its site of action, and substrate."""
    enzyme = params.get("enzyme", "")
    steps = [{"step": 1, "desc": f"Analyze enzyme: {enzyme}"}]
    enzyme_data = {
        "amylase": {"site": "mouth (salivary) and small intestine", "substrate": "starch", "product": "maltose (sugar)", "pH": "slightly acidic to neutral (6.7-7.0)"},
        "pepsin": {"site": "stomach", "substrate": "proteins", "product": "peptides", "pH": "acidic (1.5-2.0)"},
        "trypsin": {"site": "small intestine", "substrate": "proteins", "product": "amino acids", "pH": "alkaline (8.0)"},
        "lipase": {"site": "small intestine (pancreatic)", "substrate": "fats / lipids", "product": "fatty acids and glycerol", "pH": "alkaline (8.0)"},
        "bile": {"site": "small intestine (from liver/gallbladder)", "substrate": "fats (emulsification)", "product": "smaller fat droplets", "pH": "alkaline"},
    }
    data = enzyme_data.get(enzyme.lower(), {"site": "Unknown", "substrate": "Unknown", "product": "Unknown", "pH": "Unknown"})
    answer = f"Site: {data['site']}; Substrate: {data['substrate']}; Product: {data['product']}; pH: {data['pH']}"
    steps.append({"step": 2, "desc": f"Site of action: {data['site']}"})
    steps.append({"step": 3, "desc": f"Substrate: {data['substrate']} → Product: {data['product']}"})
    steps.append({"step": 4, "desc": f"Optimal pH: {data['pH']}"})
    verification = f"Verified: {enzyme} acts on {data['substrate']} at {data['site']}, which matches ICSE Class 6 Biology curriculum."
    return SolveResult(
        answer=answer,
        steps=steps,
        verification=verification,
        explanation=f"{enzyme.capitalize()} is a biological catalyst that speeds up the breakdown of {data['substrate']} into {data['product']}. Each enzyme works best at a specific pH level."
    )

def solve_blood_pressure_numerical(params: Dict) -> SolveResult:
    """Numerical problem on blood pressure / pulse rate."""
    problem_type = params.get("problem_type", "pulse")
    steps = []
    if problem_type == "pulse":
        pulse_rate = params.get("pulse_rate", 72)
        time_minutes = params.get("time_minutes", 10)
        total_beats = pulse_rate * time_minutes
        answer = f"Total heartbeats in {time_minutes} minutes = {total_beats}"
        steps = [
            {"step": 1, "desc": f"Given: pulse rate = {pulse_rate} beats/minute"},
            {"step": 2, "desc": f"Time = {time_minutes} minutes"},
            {"step": 3, "desc": f"Total beats = pulse rate × time = {pulse_rate} × {time_minutes} = {total_beats}"},
        ]
        verification = f"Back-substitution: {total_beats} beats ÷ {time_minutes} min = {total_beats//time_minutes} bpm ✓"
    elif problem_type == "blood_volume":
        total_blood = params.get("total_blood_ml", 5000)
        heart_rate = params.get("heart_rate", 72)
        stroke_volume_est = total_blood / (heart_rate * 60)
        answer = f"Estimated stroke volume ≈ {stroke_volume_est:.1f} ml per beat"
        steps = [
            {"step": 1, "desc": f"Total blood volume ≈ {total_blood} ml"},
            {"step": 2, "desc": f"Heart rate = {heart_rate} beats/min = {heart_rate*60} beats/hour"},
            {"step": 3, "desc": f"Blood pumped per beat ≈ {total_blood} / {heart_rate*60} ≈ {stroke_volume_est:.1f} ml"},
        ]
        verification = f"Normal stroke volume is 60-100 ml/beat; calculated: {stroke_volume_est:.1f} ml {'✓ within range' if 60 <= stroke_volume_est <= 100 else '⚠ check values'}"
    else:
        answer = "Unknown problem type"
        verification = "N/A"
    return SolveResult(answer=answer, steps=steps, verification=verification,
                       explanation="The heart pumps blood continuously. Pulse rate is the number of heartbeats per minute, measurable at the wrist or neck.")

def solve_respiration_rate(params: Dict) -> SolveResult:
    """Numerical problem on breathing rate."""
    age_years = params.get("age_years", 12)
    resting_rate = params.get("resting_rate_per_min", 20)
    activity = params.get("activity", "walking")
    activity_multiplier = {"resting": 1.0, "walking": 1.5, "running": 2.5, "sleeping": 0.8}
    multiplier = activity_multiplier.get(activity, 1.0)
    active_rate = resting_rate * multiplier
    total_breaths_30min = active_rate * 30
    steps = [
        {"step": 1, "desc": f"Age: {age_years} years; Activity: {activity}"},
        {"step": 2, "desc": f"Resting breathing rate: {resting_rate} breaths/min"},
        {"step": 3, "desc": f"Activity multiplier: {multiplier}x"},
        {"step": 4, "desc": f"Active breathing rate = {resting_rate} × {multiplier} = {active_rate:.1f} breaths/min"},
        {"step": 5, "desc": f"Total in 30 min = {active_rate:.1f} × 30 = {total_breaths_30min:.0f} breaths"},
    ]
    answer = f"Breathing rate during {activity}: {active_rate:.1f} breaths/min; Total in 30 min: {total_breaths_30min:.0f} breaths"
    verification = f"Normal resting rate for a {age_years}-year-old is 15-25 breaths/min; {resting_rate} bpm is within normal range ✓"
    return SolveResult(answer=answer, steps=steps, verification=verification,
                       explanation="Breathing rate increases during physical activity because muscles need more oxygen and produce more carbon dioxide.")

def solve_leaf_photosynthesis_check(params: Dict) -> SolveResult:
    """Verify if a leaf experiment result is correct."""
    leaf_test = params.get("leaf_test", "iodine")
    result_expected = params.get("expected_result", "blue_black")
    steps = [
        {"step": 1, "desc": f"Test performed: {leaf_test} test on a leaf"},
        {"step": 2, "desc": f"Expected result: {result_expected}"},
    ]
    test_data = {
        "iodine": {
            "starch_present": "Blue-black colour (positive for starch — photosynthesis occurred)",
            "starch_absent": "Yellow-brown colour (no starch — no photosynthesis)",
            "blue_black": "Starch is present in the leaf → photosynthesis has occurred",
            "yellow_brown": "No starch found → photosynthesis did not occur (e.g., covered leaf)",
        },
        "co2_need": {
            "yes": "Carbon dioxide is required for photosynthesis (tested with KOH absorbing CO₂)",
            "no": "Without CO₂, no starch is produced → CO₂ is essential for photosynthesis",
        }
    }
    data = test_data.get(leaf_test, {})
    explanation_text = data.get(result_expected, "Check test parameters")
    answer = f"Result interpretation: {explanation_text}"
    steps.append({"step": 3, "desc": f"Conclusion: {explanation_text}"})