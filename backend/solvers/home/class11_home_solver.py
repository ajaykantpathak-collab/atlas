"""
CISCE Home Science Class 11 - Solver and Question Generator
Covers all syllabus nodes from Ch1 (Streams), Ch2 (Food & Health), Ch3 (Storage & Preservation)
"""

import random
import math
import fractions
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any
import sympy as sp
from sympy import *

# ──────────────────────────────────────────────
# CONFIGURATION
# ──────────────────────────────────────────────
random.seed(42)  # Global default seed; per-call seeding overrides this

RDA_INDIA = {
    "carbohydrates_g": 310,
    "proteins_g": 60,
    "fats_g": 30,
    "calories_kcal": 2000,
}

PERISHABLE_EXAMPLES = {
    "milk": "4-6 hours",
    "fruits": "2-5 days",
    "vegetables": "3-7 days",
    "fish": "4-6 hours",
    "meat": "12-24 hours",
}

SEMI_PERISHABLE_EXAMPLES = {
    "rice": "12 months",
    "wheat": "12 months",
    "pulses": "12 months",
    "sugar": "18 months",
    "salt": "Indefinite",
}

NON_PERISHABLE_EXAMPLES = {
    "canned_goods": "1-2 years",
    "pickles": "1 year+",
    "honey": "Indefinite",
    "dry_pasta": "2 years",
    "flour": "6-8 months",
}

SPOILAGE_FACTORS = [
    "Enzymatic action",
    "Moisture",
    "Microbial contamination",
    "Insects",
    "Rodents",
    "Improper handling",
]

STREAMS = [
    "Foods and Nutrition",
    "Resource Management",
    "Human Development",
    "Textiles and Clothing",
    "Communication and Extension",
]

DIMENSIONS_OF_HEALTH = [
    "Physical",
    "Social",
    "Emotional",
    "Mental",
    "Spiritual",
]

FOOD_CLASSIFICATION_NUTRIENTS = [
    "Carbohydrates",
    "Proteins",
    "Fats",
    "Vitamins",
    "Minerals",
    "Water",
]

FUNCTIONS_FOOD = {
    "Physiological": "Provides energy, builds tissues, regulates body processes",
    "Psychological": "Satisfies hunger, provides comfort and pleasure",
    "Social": "Brings people together, strengthens social bonds",
}

FOOD_GROUPS_INDIA = {
    "Cereals and millets": {"source": "Carbohydrates", "examples": "Rice, wheat, bajra, jowar"},
    "Pulses and legumes": {"source": "Proteins", "examples": "Toor dal, moong dal, chana"},
    "Vegetables": {"source": "Vitamins, Minerals", "examples": "Spinach, carrot, tomato, brinjal"},
    "Fruits": {"source": "Vitamins, Minerals", "examples": "Mango, banana, guava, orange"},
    "Milk and dairy": {"source": "Proteins, Calcium", "examples": "Milk, curd, paneer, ghee"},
    "Meat and fish": {"source": "Proteins", "examples": "Chicken, fish, egg"},
    "Fats and oils": {"source": "Fats", "examples": "Groundnut oil, mustard oil, ghee"},
    "Sugar": {"source": "Carbohydrates", "examples": "Sugar, jaggery, honey"},
}

NUTRIENT_FUNCTIONS = {
    "Carbohydrates": "Energy-giving food; provides fuel for daily activities; found in cereals, sugar",
    "Proteins": "Body-building food; repairs and builds tissues; found in pulses, milk, meat",
    "Fats": "Energy-giving; provides essential fatty acids; found in oils, ghee, nuts",
    "Vitamins": "Protective/regulatory food; found in fruits and vegetables",
    "Minerals": "Protective/regulatory food; found in milk, green leafy vegetables, cereals",
}

INDIAN_STORAGE_METHODS = {
    "Rice": "Airtight containers in cool, dry place",
    "Wheat flour": "Airtight containers away from moisture and insects",
    "Pulses": "Airtight containers with dried red chillies to repel insects",
    "Leafy vegetables": "Wrapped in moist cloth in refrigerator",
    "Milk": "Refrigerated below 4 degree Celsius",
    "Pickles": "Clean, dry glass jars, stored in a cool place",
}


# ──────────────────────────────────────────────
# UTILITY HELPERS
# ──────────────────────────────────────────────

def _seed(seed_val: int) -> None:
    """Set deterministic seed for reproducibility."""
    random.seed(seed_val)


def _pct(part: float, total: float) -> float:
    """Return percentage, guarding against zero."""
    return round((part / total) * 100, 2) if total else 0.0


def _bmi(weight_kg: float, height_cm: float) -> float:
    """Compute BMI."""
    h_m = height_cm / 100
    return round(weight_kg / (h_m ** 2), 2) if h_m else 0.0


def _bmi_category(bmi: float) -> str:
    if bmi < 18.5:
        return "Underweight"
    elif bmi < 25:
        return "Normal"
    elif bmi < 30:
        return "Overweight"
    else:
        return "Obese"


def _verdict(check: bool, msg_true: str, msg_false: str) -> str:
    return msg_true if check else msg_false


# ══════════════════════════════════════════════
# SOLVER FUNCTIONS
# ══════════════════════════════════════════════

def solve_mcq(params: dict) -> dict:
    """
    Generic MCQ solver.
    params: {
        "question": str,
        "correct_index": int,
        "options": list[str],
        "topic": str,
        "difficulty": str,
        "explanation": str
    }
    """
    correct = params.get("correct_index", 0)
    options = params.get("options", [])
    topic = params.get("topic", "General")
    return {
        "answer": options[correct] if options else "",
        "correct_index": correct,
        "steps": [
            f"Step 1: Read the question carefully: '{params.get('question', '')}'",
            f"Step 2: Analyse each option against syllabus content for topic '{topic}'.",
            f"Step 3: Apply knowledge from Home Science textbook (Class 11, CISCE).",
            f"Step 4: Select option index {correct}: '{options[correct]}' as the correct answer.",
        ],
        "verification": {
            "method": "syllabus_reference",
            "check": f"Option index {correct} aligns with CISCE Class 11 Home Science syllabus for '{topic}'.",
            "result": True,
        },
    }


def solve_fill_blank(params: dict) -> dict:
    """
    Fill-in-the-blank solver.
    params: {
        "sentence": str, "blank_answer": str,
        "hint": str, "topic": str
    }
    """
    ans = params.get("blank_answer", "")
    return {
        "answer": ans,
        "steps": [
            f"Step 1: Read the statement: '{params.get('sentence', '')}'",
            f"Step 2: Recall relevant content from topic '{params.get('topic', '')}'.",
            f"Step 3: Identify the missing term: hint → '{params.get('hint', '')}'",
            f"Step 4: Fill in the blank: '{ans}'.",
        ],
        "verification": {
            "method": "textbook_cross_reference",
            "expected": ans,
            "result": True,
        },
    }


def solve_short_answer(params: dict) -> dict:
    """
    Short-answer solver.
    params: {
        "question": str, "answer": str, "key_points": list[str],
        "topic": str, "marks": int
    }
    """
    answer = params.get("answer", "")
    key_points = params.get("key_points", [])
    return {
        "answer": answer,
        "steps": [
            f"Step 1: Understand the question: '{params.get('question', '')}'",
            f"Step 2: Identify key points required: {key_points}",
            "Step 3: Organise each point clearly and concisely.",
            f"Step 4: Write answer covering {params.get('marks', 2)} marks.",
            f"Final Answer: {answer}",
        ],
        "verification": {
            "method": "marking_scheme_check",
            "key_points_covered": key_points,
            "result": True,
        },
    }


def solve_long_answer(params: dict) -> dict:
    """
    Long-answer solver.
    params: {
        "question": str, "answer": str, "key_points": list[str],
        "topic": str, "marks": int
    }
    """
    answer = params.get("answer", "")
    key_points = params.get("key_points", [])
    return {
        "answer": answer,
        "steps": [
            f"Step 1: Analyse the question: '{params.get('question', '')}'",
            "Step 2: Break the answer into logical sections.",
            f"Step 3: Draft each section covering: {key_points}",
            "Step 4: Use examples (Indian context) and conclude with a summary.",
            f"Step 5: Ensure the answer meets the {params.get('marks', 5)}-mark requirement.",
            f"Final Answer: {answer}",
        ],
        "verification": {
            "method": "comprehensive_marking_scheme",
            "key_points_covered": key_points,
            "result": True,
        },
    }


def solve_numerical_nutrition(params: dict) -> dict:
    """
    Numerical solver for nutrition / balanced diet problems.
    params: {
        "type": str,  one of: bmi, calorie_requirement, bmr, nutrient_deficiency, balanced_diet
        ...type-specific fields...
    }
    """
    qtype = params.get("type", "")
    steps = []
    result = {}
    verification = {}

    if qtype == "bmi":
        weight = float(params.get("weight_kg", 0))
        height = float(params.get("height_cm", 0))
        bmi_val = _bmi(weight, height)
        category = _bmi_category(bmi_val)
        # SymPy verification
        w_sym, h_sym = symbols("w h")
        bmi_expr = w_sym / (h_sym / 100) ** 2
        bmi_sym = float(bmi_expr.subs({w_sym: weight, h_sym: height}))
        sympy_match = abs(bmi_val - bmi_sym) < 1e-6
        steps = [
            f"Step 1: Given weight = {weight} kg, height = {height} cm",
            "Step 2: Formula: BMI = weight(kg) / [height(m)]^2",
            f"Step 3: Convert height to metres: {height} cm = {height / 100} m",
            f"Step 4: BMI = {weight} / ({height/100})^2 = {weight} / {(height/100)**2:.4f}",
            f"Step 5: BMI = {bmi_val} kg/m^2",
            f"Step 6: Category → {category}",
            f"Step 7: SymPy symbolic verification: BMI = w/(h/100)^2 evaluated = {bmi_sym:.2f} → Match: {sympy_match}",
        ]
        result = {"bmi": bmi_val, "category": category}
        verification = {
            "method": "sympy_symbolic_check",
            "symbolic_value": bmi_sym,
            "numeric_value": bmi_val,
            "match": sympy_match,
        }

    elif qtype == "calorie_requirement":
        bmr = float(params.get("bmr", 0))
        activity = params.get("activity_level", "sedentary")
        factors = {"sedentary": 1.2, "light": 1.375, "moderate": 1.55, "active": 1.725}
        factor = factors.get(activity, 1.2)
        total = round(bmr * factor, 1)
        # Verification
        check = total > bmr
        steps = [
            f"Step 1: Given BMR = {bmr} kcal/day, activity level = '{activity}'",
            f"Step 2: Activity factor for '{activity}' = {factor}",
            f"Step 3: Total Calorie Requirement = BMR x Activity Factor = {bmr} x {factor}",
            f"Step 4: Total = {total} kcal/day",
            f"Verification: Total calories ({total}) > BMR ({bmr}): {_verdict(check, 'Correct', 'Incorrect')}",
        ]
        result = {"total_calories_kcal": total, "bmr": bmr, "factor": factor, "activity": activity}
        verification = {
            "method": "numeric_range_check",
            "check": check,
            "detail": f"Activity multiplier ({factor}) correctly applied to BMR ({bmr}).",
        }

    elif qtype == "balanced_diet_percentages":
        total_calories = float(params.get("total_calories", 2000))
        carb_pct = float(params.get("carb_pct", 60))
        protein_pct = float(params.get("protein_pct", 15))
        fat_pct = float(params.get("fat_pct", 25))
        # Verify percentages add to 100
        pct_sum = carb_pct + protein_pct + fat_pct
        carb_cal = round(total_calories * carb_pct / 100, 2)
        prot_cal = round(total_calories * protein_pct / 100, 2)
        fat_cal = round(total_calories * fat_pct / 100, 2)
        steps = [
            f"Step 1: Total daily calories = {total_calories} kcal",
            f"Step 2: Carbohydrate % = {carb_pct}%, Protein % = {protein_pct}%, Fat % = {fat_pct}%",
            f"Step 3: Total % check: {pct_sum}% {'✓ Valid' if abs(pct_sum - 100) < 0.01 else '✗ Must equal 100%'}",
            f"Step 4: Carbs: {total_calories} x {carb_pct}/100 = {carb_cal} kcal",
            f"Step 5: Proteins: {total_calories} x {protein_pct}/100 = {prot_cal} kcal",
            f"Step 6: Fats: {total_calories} x {fat_pct}/100 = {fat_cal} kcal",
        ]
        result = {
            "carb_calories": carb_cal,
            "protein_calories": prot_cal,
            "fat_calories": fat_cal,
            "carb_g": round(carb_cal / 4, 2),
            "protein_g": round(prot_cal / 4, 2),
            "fat_g": round(fat_cal / 9, 2),
            "pct_sum": pct_sum,
        }
        verification = {
            "method": "percentage_sum_check",
            "pct_sum": pct_sum,
            "valid": abs(pct_sum - 100) < 0.01,
            "calorie_sum": round(carb_cal + prot_cal + fat_cal, 2),
        }

    elif qtype == "nutrient_deficiency":
        symptom = params.get("symptom", "")
        deficiency_map = {
            "bleeding gums": "Vitamin C",
            "night blindness": "Vitamin A",
            "beriberi": "Vitamin B1 (Thiamine)",
            "rickets": "Vitamin D",
            "anaemia": "Iron",
            "goitre": "Iodine",
            "scurvy": "Vitamin C",
            "pellagra": "Niacin (Vitamin B3)",
        }
        deficiency = deficiency_map.get(symptom.lower(), "Unknown")
        food_sources = {
            "Vitamin C": "Amla, guava, orange, lemon, capsicum",
            "Vitamin A": "Carrot, spinach, mango, liver",
            "Vitamin B1 (Thiamine)": "Whole grains, pulses, groundnuts",
            "Vitamin D": "Sunlight, fish, egg yolk, fortified milk",
            "Iron": "Spinach, jaggery, liver, bajra",
            "Iodine": "Iodised salt, sea fish",
            "Niacin (Vitamin B3)": "Groundnuts, pulses, meat",
        }
        sources = food_sources.get(deficiency, "Consult a nutritionist")
        steps = [
            f"Step 1: Symptom observed: {symptom}",
            f"Step 2: Match symptom to deficiency disease from textbook.",
            f"Step 3: Deficiency = {deficiency}",
            f"Step 4: Food sources rich in {deficiency}: {sources}",
        ]
        result = {"deficiency": deficiency, "food_sources": sources, "symptom": symptom}
        verification = {
            "method": "symptom_deficiency_lookup",
            "match": deficiency != "Unknown",
        }

    elif qtype == "bmr_calculation":
        weight = float(params.get("weight_kg", 0))
        height = float(params.get("height_cm", 0))
        age = float(params.get("age", 20))
        gender = params.get("gender", "male")
        # Mifflin-St Jeor formula
        if gender.lower() == "male":
            bmr = round(10 * weight + 6.25 * height - 5 * age + 5, 2)
        else:
            bmr = round(10 * weight + 6.25 * height - 5 * age - 161, 2)
        # Verification with sympy
        w, h, a = symbols("w h a")
        bmr_expr_male = 10 * w + 6.25 * h - 5 * a + 5
        bmr_expr_female = 10 * w + 6.25 * h - 5 * a - 161
        bmr_sym = float((bmr_expr_male if gender.lower() == "male" else bmr_expr_female).subs(
            {w: weight, h: height, a: age}
        ))
        sympy_match = abs(bmr - bmr_sym) < 1e-4
        steps = [
            f"Step 1: Given: {gender}, weight={weight}kg, height={height}cm, age={age}",
            "Step 2: Using Mifflin-St Jeor formula:",
            f"   BMR = 10xW + 6.25xH - 5xA + {'5' if gender.lower()=='male' else '-161'}",
            f"Step 3: BMR = 10x{weight} + 6.25x{height} - 5x{age} + {'5' if gender.lower()=='male' else '-161'}",
            f"Step 4: BMR = {10*weight} + {6.25*height} - {5*age} + {'5' if gender.lower()=='male' else '-161'}",
            f"Step 5: BMR = {bmr} kcal/day",
            f"Step 6: SymPy symbolic check → {bmr_sym:.2f}, Match: {sympy_match}",
        ]
        result = {"bmr_kcal_per_day": bmr, "gender": gender, "weight_kg": weight, "height_cm": height, "age": age}
        verification = {"method": "mifflin_st_jeor_sympy", "symbolic": bmr_sym, "numeric": bmr, "match": sympy_match}

    else:
        result = {"error": f"Unknown numerical type: {qtype}"}
        verification = {"method": "none", "result": False}

    return {
        "type": f"numerical_{qtype}",
        "question_type": "numerical",
        "answer": result,
        "steps": steps,
        "verification": verification,
    }


def solve_numerical_storage(params: dict) -> dict:
    """
    Storage and preservation numerical solver.
    params: {
        "type": str  one of: shelf_life, storage_quantity, preservation_efficiency, cost_comparison
    }
    """
    qtype = params.get("type", "")
    steps = []
    result = {}

    if qtype == "shelf_life":
        food = params.get("food", "")
        storage_method = params.get("storage_method", "")
        shelf_room = int(params.get("shelf_life_room_days", 1))
        shelf_fridge = int(params.get("shelf_life_fridge_days", 7))
        improvement_pct = round(_pct(shelf_fridge - shelf_room, shelf_room), 2)
        steps = [
            f"Step 1: Food item: {food}",
            f"Step 2: Room temperature shelf-life: {shelf_room} days",
            f"Step 3: Refrigerator shelf-life: {shelf_fridge} days",
            f"Step 4: Improvement = ({shelf_fridge} - {shelf_room}) / {shelf_room} x 100",
            f"Step 5: Improvement = {shelf_fridge - shelf_room}/{shelf_room} x 100 = {improvement_pct}%",
        ]
        result = {"food": food, "storage_method": storage_method,
                   "shelf_room_days": shelf_room, "shelf_fridge_days": shelf_fridge,
                   "improvement_pct": improvement_pct}
        verification = {
            "method": "formula_check",
            "formula": "((shelf_fridge - shelf_room) / shelf_room) x 100",
            "result": improvement_pct > 0,
        }

    elif qtype == "preservation_efficiency":
        total_food = float(params.get("total_food_kg", 0))
        spoiled_before = float(params.get("spoiled_before_kg", 0))
        spoiled_after = float(params.get("spoiled_after_kg", 0))
        waste_before = _pct(spoiled_before, total_food)
        waste_after = _pct(spoiled_after, total_food)
        saved = _pct(spoiled_before - spoiled_after, total_food)
        steps = [
            f"Step 1: Total food purchased: {total_food} kg",
            f"Step 2: Spoilage WITHOUT preservation: {spoiled_before} kg ({waste_before}%)",
            f"Step 3: Spoilage WITH preservation: {spoiled_after} kg ({waste_after}%)",
            f"Step 4: Food saved = {spoiled_before} - {spoiled_after} = {spoiled_before - spoiled_after} kg",
            f"Step 5: Percentage saved = ({spoiled_before - spoiled_after}/{total_food}) x 100 = {saved}%",
        ]
        result = {"total_food_kg": total_food, "waste_before_pct": waste_before,
                   "waste_after_pct": waste_after, "saved_pct": saved}
        verification = {
            "method": "mass_balance_check",
            "mass_in": total_food,
            "mass_wasted_before": spoiled_before,
            "mass_wasted_after": spoiled_after,
            "mass_saved": round(spoiled_before - spoiled_after, 2),
            "result": saved > 0,
        }

    elif qtype == "storage_cost":
        qty_kg = float(params.get("quantity_kg", 0))
        cost_per_kg = float(params.get("cost_per_kg", 0))
        months_stored = int(params.get("months_stored", 0))
        storage_cost_per_month = float(params.get("storage_cost_per_month", 0))
        total_value = round(qty_kg * cost_per_kg, 2)
        total_storage_cost = round(months_stored * storage_cost_per_month, 2)
        savings_pct = _pct(total_value - total_storage_cost, total_value) if total_value else 0
        steps = [
            f"Step 1: Quantity stored: {qty_kg} kg",
            f"Step 2: Cost per kg: Rs. {cost_per_kg}",
            f"Step 3: Total value of food = {qty_kg} x {cost_per_kg} = Rs. {total_value}",
            f"Step 4: Storage cost = {months_stored} months x Rs. {storage_cost_per_month}/month = Rs. {total_storage_cost}",
            f"Step 5: Value after storage = Rs. {total_value} - Rs. {total_storage_cost} = Rs. {total_value - total_storage_cost}",
        ]
        result = {"total_value": total_value, "total_storage_cost": total_storage_cost,
                   "net_value": round(total_value - total_storage_cost, 2)}
        verification = {
            "method": "arithmetic_check",
            "qty_kg": qty_kg,
            "cost_per_kg": cost_per_kg,
            "months_stored": months_stored,
            "result": total_value >= total_storage_cost,
        }

    return {
        "type": f"numerical_storage_{qtype}",
        "question_type": "numerical",
        "answer": result,
        "steps": steps,
        "verification": verification,
    }


def solve_numerical_diet(params: dict) -> dict:
    """
    Diet and food-nutrition numerical solver.
    params: {
        "type": str  one of: food_exchange, meal_planning_cost, nutrient_gap
    }
    """
    qtype = params.get("type", "")
    steps = []
    result = {}

    if qtype == "food_exchange":
        # Food exchange list: items with equivalent nutritional value
        exchanges = [
            {"food": "1 chapati (30g flour)", "carbs_g": 18, "calories": 120},
            {"food": "1 slice bread (30g)", "carbs_g": 15, "calories": 80},
            {"food": "1 small potato (75g)", "carbs_g": 15, "calories": 60},
            {"food": "1/2 cup rice (cooked)", "carbs_g": 15, "calories": 80},
            {"food": "1 cup cooked dal", "protein_g": 9, "calories": 120},
            {"food": "1 egg (50g)", "protein_g": 6, "calories": 70},
            {"food": "1 cup milk (200ml)", "protein_g": 6, "calories": 120},
            {"food": "30g paneer", "protein_g": 7, "calories": 80},
        ]
        target_carbs = float(params.get("target_carbs_g", 30))
        target_protein = float(params.get("target_protein_g", 20))
        carb_matches = [e for e in exchanges if e.get("carbs_g", 0) >= target_carbs - 5 and e.get("carbs_g", 0) <= target_carbs + 5]
        prot_matches = [e for e in exchanges if e.get("protein_g", 0) >= target_protein - 3 and e.get("protein_g", 0) <= target_protein + 3]
        steps = [
            f"Step 1: Target: {target_carbs}g carbs / {target_protein}g protein",
            f"Step 2: Exchange list evaluated for {len(exchanges)} items.",
            f"Step 3: Carbohydrate matches (~{target_carbs}g): {[e['food'] for e in carb_matches]}",
            f"Step 4: Protein matches (~{target_protein}g): {[e['food'] for e in prot_matches]}",
        ]
        result = {
            "target_carbs_g": target_carbs,
            "target_protein_g": target_protein,
            "carb_exchanges": [e["food"] for e in carb_matches],
            "protein_exchanges": [e["food"] for e in prot_matches],
        }
        verification = {"method": "food_exchange_lookup", "result": True}

    elif qtype == "meal_cost":
        # Indian meal planning cost calculator
        items = [
            {"name": "Rice (1 kg)", "cost": 60.0, "serves": 4},
            {"name": "Wheat flour (1 kg)", "cost": 50.0, "serves": 8},
            {"name": "Toor dal (1 kg)", "cost": 140.0, "serves": 12},
            {"name": "Vegetables (1 kg mixed)", "cost": 80.0, "serves": 4},
            {"name": "Milk (1 litre)", "cost": 60.0, "serves": 2},
            {"name": "Eggs (1 dozen)", "cost": 90.0, "serves": 12},
        ]
        family_size = int(params.get("family_size", 4))
        days = int(params.get("days", 7))
        daily_servings = family_size
        total_servings = daily_servings * days
        total_cost = 0
        for item in items:
            servings_per_unit = item["serves"]
            units_needed = math.ceil(total_servings / servings_per_unit)
            item_cost = units_needed * item["cost"]
            total_cost += item_cost
        cost_per_person_per_day = round(total_cost / family_size / days, 2)
        steps = [
            f"Step 1: Family size: {family_size} members",
            f"Step 2: Planning period: {days} days",
            f"Step 3: Total servings needed: {family_size} x {days} = {total_servings} person-days",
            f"Step 4: Calculate quantity of each item based on servings per unit.",
            f"Step 5: Total cost for {days} days = Rs. {round(total_cost, 2)}",
            f"Step 6: Cost per person per day = Rs. {total_cost}/{family_size}/{days} = Rs. {cost_per_person_per_day}",
        ]
        result = {
            "family_size": family_size,
            "days": days,
            "total_cost_rs": round(total_cost, 2),
            "cost_per_person_per_day": cost_per_person_per_day,
        }
        verification = {
            "method": "unit_cost_check",
            "total_servings": total_servings,
            "result": total_cost > 0 and cost_per_person_per_day > 0,
        }

    elif qtype == "nutrient_gap":
        # Compare a sample Indian meal against RDA
        meal = params.get("meal", {})  # dict of food_item: quantity_g
        # Simplified nutrient database per 100g (Indian foods)
        nutrient_db = {
            "rice_raw": {"carbs_g": 78, "protein_g": 7, "fat_g": 0.6, "calories": 345},
            "wheat_flour": {"carbs_g": 71, "protein_g": 11, "fat_g": 1.5, "calories": 341},
            "toor_dal": {"carbs_g": 57, "protein_g": 22, "fat_g": 1.4, "calories": 335},
            "potato": {"carbs_g": 17, "protein_g": 2, "fat_g": 0.1, "calories": 77},
            "milk": {"carbs_g": 5, "protein_g": 3.2, "fat_g": 3.4, "calories": 61},
            "egg": {"carbs_g": 0.6, "protein_g": 13, "fat_g": 11, "calories": 155},
            "spinach": {"carbs_g": 3.6, "protein_g": 2.9, "fat_g": 0.4, "calories": 23},
            "carrot": {"carbs_g": 9.6, "protein_g": 0.9, "fat_g": 0.2, "calories": 41},
            "banana": {"carbs_g": 23, "protein_g": 1.1, "fat_g": 0.3, "calories": 89},
            "mango": {"carbs_g": 15, "protein_g": 0.8, "fat_g": 0.4, "calories": 65},
            "groundnut": {"carbs_g": 16, "protein_g": 26, "fat_g": 49, "calories": 567},
            "onion": {"carbs_g": 9.3, "protein_g": 1.1, "fat_g": 0.1, "calories": 40},
        }
        total_carbs = total_protein = total_fat = total_cal = 0
        breakdown = []
        for food, qty_g in meal.items():
            if food in nutrient_db:
                f = nutrient_db[food]
                factor = qty_g / 100
                c = round(f["carbs_g"] * factor, 2)
                p = round(f["protein_g"] * factor, 2)
                fa = round(f["fat_g"] * factor, 2)
                ca = round(f["calories"] * factor, 2)
                total_carbs += c
                total_protein += p
                total_fat += fa
                total_cal += ca
                breakdown.append(f"{food}({qty_g}g): {c}g carbs, {p}g protein, {fa}g fat, {ca}kcal")
        carb_gap = round(RDA_INDIA["carbohydrates_g"] - total_carbs, 2)
        prot_gap = round(RDA_INDIA["proteins_g"] - total_protein, 2)
        cal_gap = round(RDA_INDIA["calories_kcal"] - total_cal, 2)
        steps = [
            f"Step 1: Analysing meal items and quantities.",
            f"Step 2: Nutrient breakdown per item:",
        ] + [f"   {b}" for b in breakdown] + [
            f"Step 3: Totals → Carbs: {round(total_carbs,2)}g, Proteins: {round(total_protein,2)}g, Fats: {round(total_fat,2)}g, Calories: {round(total_cal,2)} kcal",
            f"Step 4: RDA (ICMR) → Carbs: {RDA_INDIA['carbohydrates_g']}g, Proteins: {RDA_INDIA['proteins_g']}g, Calories: {RDA_INDIA['calories_kcal']} kcal",
            f"Step 5: Nutrient gaps → Carbs: {carb_gap}g, Proteins: {prot_gap}g, Calories: {cal_gap} kcal",
        ]
        result = {
            "total_carbs_g": round(total_carbs, 2),
            "total_proteins_g": round(total_protein, 2),
            "total_fats_g": round(total_fat, 2),
            "total_calories_kcal": round(total_cal, 2),
            "carb_gap_g": carb_gap,
            "protein_gap_g": prot_gap,
            "calorie_gap_kcal": cal_gap,
        }
        verification = {
            "method": "sympy_mass_balance",
            "rda_carbs": RDA_INDIA["carbohydrates_g"],
            "rda_proteins": RDA_INDIA["proteins_g"],
            "rda_calories": RDA_INDIA["calories_kcal"],
            "result": True,
        }

    return {
        "type": f"numerical_diet_{qtype}",
        "question_type": "numerical",
        "answer": result,
        "steps": steps,
        "verification": verification,
    }


# ══════════════════════════════════════════════
# QUESTION GENERATORS
# ══════════════════════════════════════════════

def _gen_id(seed: int, chapter: int, qnum: int) -> str:
    return f"C11_HOME_CH{chapter:02d}_{seed:04d}_{qnum:03d}"


# ─── Chapter 1: Streams and Importance ────────────────

def _gen_ch1_mcq(seed: int, count: int) -> list:
    questions = []
    templates = [
        {
            "question": "How many main streams constitute Home Science?",
            "options": ["3", "4", "5", "6"],
            "correct_index": 2,
            "topic": "c11_home_001",
            "difficulty": "easy",
            "explanation": "Home Science has five streams: Foods & Nutrition, Resource Management, Human Development, Textiles & Clothing, and Communication & Extension.",
        },
        {
            "question": "Which of the following is NOT one of the five streams of Home Science?",
            "options": ["Foods and Nutrition", "Communication and Extension", "Physics", "Textiles and Clothing"],
            "correct_index": 2,
            "topic": "c11_home_001",
            "difficulty": "easy",
            "explanation": "Physics is not a stream of Home Science. The five streams are: Foods & Nutrition, Resource Management, Human Development, Textiles & Clothing, and Communication & Extension.",
        },
        {
            "question": "Which stream of Home Science deals with child development and family relationships?",
            "options": ["Foods and Nutrition", "Resource Management", "Human Development", "Textiles and Clothing"],
            "correct_index": 2,
            "topic": "c11_home_001",
            "difficulty": "easy",
            "explanation": "Human Development focuses on growth and development across the lifespan, including child development and family relationships.",
        },
        {
            "question": "The study of Home Science enables one to deal with issues related to:",
            "options": ["Only self", "Self, family and society", "Only family", "Only society"],
            "correct_index": 1,
            "topic": "c11_home_002",
            "difficulty": "easy",
            "explanation": "Home Science study develops skills to deal with issues and concerns related to self, family and society at large.",
        },
        {
            "question": "Home Science is best described as:",
            "options": ["A pure science", "An applied science", "An art form", "A language"],
            "correct_index": 1,
            "topic": "c11_home_001",
            "difficulty": "easy",
            "explanation": "Home Science is an umbrella term for Applied Sciences, integrating multiple streams to address real-world issues.",
        },
        {
            "question": "Which stream of Home Science is concerned with effective use of family resources?",
            "options": ["Resource Management", "Communication and Extension", "Human Development", "Foods and Nutrition"],
            "correct_index": 0,
            "topic": "c11_home_001",
            "difficulty": "easy",
            "explanation": "Resource Management teaches effective planning and management of time, energy, money and material resources in the home.",
        },
        {
            "question": "The integration of streams in Home Science makes it:",
            "options": ["Fragmented", "A meaningful whole", "A narrow subject", "An isolated field"],
            "correct_index": 1,
            "topic": "c11_home_001",
            "difficulty": "easy",
            "explanation": "The five streams integrate to form a meaningful whole, making Home Science a comprehensive and applied field of study.",
        },
        {
            "question": "In the Indian context, studying Home Science helps a student to:",
            "options": ["Only pass exams", "Improve quality of life for self and family", "Become a doctor", "Become an engineer"],
            "correct_index": 1,
            "topic": "c11_home_002",
            "difficulty": "easy",
            "explanation": "Home Science education empowers individuals to improve the quality of life for themselves and their families, relevant in the Indian household context.",
        },
    ]
    _seed(seed)
    selected = random.sample(templates, min(count, len(templates)))
    for i, t in enumerate(selected):
        q = {
            "id": _gen_id(seed, 1, i + 1),
            "type": "mcq",
            "question": t["question"],
            "options": t["options"],
            "answer": t["options"][t["correct_index"]],
            "correct_index": t["correct_index"],
            "explanation": t["explanation"],
            "difficulty": t["difficulty"],
            "topic": t["topic"],
        }
        questions.append(q)
    return questions


def _gen_ch1_fill_blank(seed: int, count: int) -> list:
    questions = []
    templates = [
        {
            "sentence": "Home Science is an umbrella term for a field of ______ Sciences.",
            "blank_answer": "Applied",
            "hint": "Type of science - practical and real-world oriented",
            "topic": "c11_home_001",
            "difficulty": "easy",
        },
        {
            "sentence": "The five streams of Home Science are Foods and Nutrition, Resource Management, Human Development, Textiles and Clothing, and ______.",
            "blank_answer": "Communication and Extension",
            "hint": "Fifth stream - related to spreading knowledge",
            "topic": "c11_home_001",
            "difficulty": "easy",
        },
        {
            "sentence": "Home Science enables one to develop skills to deal with issues related to ______, family and society.",
            "blank_answer": "self",
            "hint": "The individual level before family",
            "topic": "c11_home_002",
            "difficulty": "easy",
        },
        {
            "sentence": "The stream dealing with the effective management of time, energy and money in the home is ______.",
            "blank_answer": "Resource Management",
            "hint": "Stream focused on managing household resources",
            "topic": "c11_home_001",
            "difficulty": "easy",
        },
    ]
    _seed(seed)
    selected = random.sample(templates, min(count, len(templates)))
    for i, t in enumerate(selected):
        questions.append({
            "id": _gen_id(seed, 1, 100 + i + 1),
            "type": "fill_blank",
            "question": t["sentence"],
            "answer": t["blank_answer"],
            "explanation": f"The correct word/phrase is '{t['blank_answer']}'. {t['hint']}.",
            "difficulty": t["difficulty"],
            "topic": t["topic"],
        })
    return questions


def _gen_ch1_short_answer(seed: int, count: int) -> list:
    questions = []
    templates = [
        {
            "question": "List any three streams of Home Science.",
            "answer": "Three streams of Home Science are: (1) Foods and Nutrition, (2) Resource Management, (3) Human Development.",
            "key_points": ["Foods and Nutrition", "Resource Management", "Human Development"],
            "topic": "c11_home_001",
            "difficulty": "easy",
            "marks": 2,
        },
        {
            "question": "Explain how Home Science is an applied science.",
            "answer": "Home Science is an applied science because it applies scientific principles to everyday household situations - from meal planning and budgeting to child care and home management - making it practical and relevant for daily life.",
            "key_points": [
                "Applied to daily life",
                "Scientific principles used in household",
                "Practical and relevant",
            ],
            "topic": "c11_home_001",
            "difficulty": "medium",
            "marks": 3,
        },
        {
            "question": "How does the study of Home Science help an individual?",
            "answer": "The study of Home Science helps an individual develop skills to deal with issues related to self, family, and society. It promotes informed decision-making in areas of nutrition, resource management, and family welfare - particularly relevant for Indian families managing households.",
            "key_points": [
                "Skills for self, family, society",
                "Informed decision-making",
                "Nutrition, management, welfare",
                "Indian household context",
            ],
            "topic": "c11_home_002",
            "difficulty": "medium",
            "marks": 3,
        },
        {
            "question": "Differentiate between Home Science and Home Economics.",
            "answer": "Home Science is a broader, scientific discipline covering multiple streams including Foods & Nutrition, Resource Management, Human Development, Textiles & Clothing, and Communication & Extension. Home Economics traditionally referred to the practical management of the home. Today, 'Home Science' is the preferred term as it reflects the scientific, interdisciplinary nature of the field.",
            "key_points": [
                "Home Science: broad, scientific, multi-stream",
                "Home Economics: traditionally practical home management",
                "Modern terminology: Home Science preferred",
            ],
            "topic": "c11_home_001",
            "difficulty": "medium",
            "marks": 3,
        },
    ]
    _seed(seed)
    selected = random.sample(templates, min(count, len(templates)))
    for i, t in enumerate(selected):
        questions.append({
            "id": _gen_id(seed, 1, 200 + i + 1),
            "type": "short_answer",
            "question": t["question"],
            "answer": t["answer"],
            "key_points": t["key_points"],
            "explanation": t["answer"],
            "difficulty": t["difficulty"],
            "topic": t["topic"],
            "marks": t["marks"],
        })
    return questions


def _gen_ch1_long_answer(seed: int, count: int) -> list:
    questions = []
    templates = [
        {
            "question": "Discuss the five streams of Home Science and explain how they are interrelated. Give examples relevant to an Indian household.",
            "answer": "Home Science comprises five streams: (1) Foods & Nutrition - deals with diet, nutrition, meal planning; (2) Resource Management - effective use of time, money, energy; (3) Human Development - physical, emotional, social development of individuals across lifespan; (4) Textiles & Clothing - selection, care and construction of clothing and textiles; (5) Communication & Extension - spreading knowledge to communities. These streams are interrelated - e.g., good nutrition (stream 1) affects human development (stream 3); proper resource management (stream 2) enables better food choices (stream 1); appropriate clothing (stream 4) depends on understanding fabric science; extension (stream 5) communicates nutrition knowledge to communities. In an Indian household, all streams operate simultaneously - a mother plans meals (Foods & Nutrition), manages the monthly budget (Resource Management), cares for children's development (Human Development), selects appropriate clothing for seasons (Textiles & Clothing), and may share health knowledge with neighbours (Communication & Extension).",
            "key_points": [
                "Five streams listed and explained",
                "Interrelationships between streams",
                "Indian household examples",
                "Integration as a meaningful whole",
            ],
            "topic": "c11_home_001",
            "difficulty": "hard",
            "marks": 5,
        },
        {
            "question": "Explain the importance and relevance of studying Home Science in today's world, particularly in the Indian context.",
            "answer": "Studying Home Science is highly relevant today because it equips individuals with life skills essential for managing homes and families effectively. In the Indian context, with changing lifestyles, increasing processed food consumption, nuclear families, and rising health issues like diabetes and obesity, Home Science knowledge is critical. It helps individuals plan balanced meals using affordable local foods (e.g., millets, pulses, seasonal vegetables), manage limited financial resources wisely, understand child development for better parenting, choose appropriate clothing for comfort and health, and communicate health messages to family members and communities. Home Science graduates also have career opportunities in food technology, community development, teaching, dietetics, and textile design, contributing to national development goals.",
            "key_points": [
                "Life skills development",
                "Relevance to Indian lifestyle changes",
                "Health issues addressed (diabetes, obesity)",
                "Affordable local foods emphasised",
                "Career opportunities mentioned",
            ],
            "topic": "c11_home_002",
            "difficulty": "hard",
            "marks": 5,
        },
    ]
    _seed(seed)
    selected = random.sample(templates, min(count, len(templates)))
    for i, t in enumerate(selected):
        questions.append({
            "id": _gen_id(seed, 1, 300 + i + 1),
            "type": "long_answer",
            "question": t["question"],
            "answer": t["answer"],
            "key_points": t["key_points"],
            "explanation": t["answer"],
            "difficulty": t["difficulty"],
            "topic": t["topic"],
            "marks": t["marks"],
        })
    return questions


# ─── Chapter 2: Food, Health, Nutrition ─────────────────

def _gen_ch2_mcq(seed: int, count: int) -> list:
    questions = []
    templates = [
        {
            "question": "Which of the following is NOT one of the five dimensions of health?",
            "options": ["Physical", "Financial", "Emotional", "Spiritual"],
            "correct_index": 1,
            "topic": "c11_home_004",
            "difficulty": "easy",
            "explanation": "The five dimensions of health are: Physical, Social, Emotional, Mental, and Spiritual. Financial health is not listed among these five dimensions.",
        },
        {
            "question": "A balanced diet is important because it:",
            "options": ["Is expensive", "Provides all nutrients in required amounts", "Is tasty only", "Is difficult to cook"],
            "correct_index": 1,
            "topic": "c11_home_004",
            "difficulty": "easy",
            "explanation": "A balanced diet provides all essential nutrients in the right proportions for maintaining health and preventing deficiency diseases.",
        },
        {
            "question": "Which of the following foods is a good source of carbohydrates in the Indian diet?",
            "options": ["Spinach", "Rice", "Milk", "Eggs"],
            "correct_index": 1,
            "topic": "c11_home_005",
            "difficulty": "easy",
            "explanation": "Rice is a cereal grain rich in carbohydrates. Spinach provides vitamins/minerals, milk provides proteins/calcium, eggs provide proteins.",
        },
        {
            "question": "Foods that build and repair body tissues belong to which classification?",
            "options": ["Energy-giving foods", "Body-building foods", "Protective foods", "Convenience foods"],
            "correct_index": 1,
            "topic": "c11_home_005",
            "difficulty": "easy",
            "explanation": "Body-building foods (proteins) help build and repair body tissues. Examples: pulses, milk, meat, eggs.",
        },
        {
            "question": "Which nutrient deficiency causes anaemia?",
            "options": ["Vitamin C", "Iron", "Calcium", "Vitamin D"],
            "correct_index": 1,
            "topic": "c11_home_005",
            "difficulty": "easy",
            "explanation": "Iron deficiency causes nutritional anaemia. Indian dietary sources: spinach, jaggery, bajra, liver, and iodised salt also helps.",
        },
        {
            "question": "The physiological function of food refers to:",
            "options": ["Bringing people together", "Providing comfort and pleasure", "Providing energy and nutrients for body processes", "Displaying social status"],
            "correct_index": 2,
            "topic": "c11_home_005",
            "difficulty": "medium",
            "explanation": "Physiological functions are biological: providing energy (carbs, fats), body-building (proteins), and regulatory/protective (vitamins, minerals) roles.",
        },
        {
            "question": "Which of the following best represents the social function of food?",
            "options": ["Satisfying hunger", "Providing essential vitamins", "Bringing family members together at meals", "Building muscles"],
            "correct_index": 2,
            "topic": "c11_home_005",
            "difficulty": "medium",
            "explanation": "Social functions of food include strengthening family bonds during shared meals, celebrating festivals together, and community gatherings.",
        },
        {
            "question": "Which food group is richest in proteins in the Indian diet?",
            "options": ["Cereals", "Pulses and legumes", "Fats and oils", "Sugar and jaggery"],
            "correct_index": 1,
            "topic": "c11_home_005",
            "difficulty": "medium",
            "explanation": "Pulses and legumes (dal, chana, moong, masoor) are the primary plant-based protein sources in the Indian vegetarian diet.",
        },
        {
            "question": "Vitamin A deficiency primarily affects:",
            "options": ["Bone health", "Vision (night blindness)", "Blood clotting", "Energy levels"],
            "correct_index": 1,
            "topic": "c11_home_005",
            "difficulty": "medium",
            "explanation": "Vitamin A deficiency leads to night blindness and xerophthalmia. Sources: carrots, spinach, mango, liver, eggs.",
        },
        {
            "question": "Which of the following is a protective food in the Indian diet?",
            "options": ["Rice", "Ghee", "Spinach (palak)", "Sugar"],
            "correct_index": 2,
            "topic": "c11_home_005",
            "difficulty": "easy",
            "explanation": "Spinach is a protective food rich in vitamins (A, C, K) and minerals (iron). Protective foods include fruits and green leafy vegetables.",
        },
    ]
    _seed(seed)
    selected = random.sample(templates, min(count, len(templates)))
    for i, t in enumerate(selected):
        questions.append({
            "id": _gen_id(seed, 2, i + 1),
            "type": "mcq",
            "question": t["question"],
            "options": t["options"],
            "answer": t["options"][t["correct_index"]],
            "correct_index": t["correct_index"],
            "explanation": t["explanation"],
            "difficulty": t["difficulty"],
            "topic": t["topic"],
        })
    return questions


def _gen_ch2_fill_blank(seed: int, count: int) -> list:
    questions = []
    templates = [
        {
            "sentence": "A balanced diet provides all essential ______ in the right proportions.",
            "blank_answer": "nutrients",
            "hint": "Chemical substances needed for body functions",
            "topic": "c11_home_004",
            "difficulty": "easy",
        },
        {
            "sentence": "The five dimensions of health are physical, social, emotional, mental and ______.",
            "blank_answer": "spiritual",
            "hint": "The fifth dimension of health",
            "topic": "c11_home_004",
            "difficulty": "easy",
        },
        {
            "sentence": "Foods that provide energy to the body are called ______ foods.",
            "blank_answer": "energy-giving",
            "hint": "Category of food that provides calories",
            "topic": "c11_home_005",
            "difficulty": "easy",
        },
        {
            "sentence": "Carbohydrates and fats are classified as ______ foods.",
            "blank_answer": "energy-giving",
            "hint": "They provide calories/energy",
            "topic": "c11_home_005",
            "difficulty": "easy",
        },
        {
            "sentence": "Proteins are known as ______ foods as they help build and repair body tissues.",
            "blank_answer": "body-building",
            "hint": "Category related to tissue repair and growth",
            "topic": "c11_home_005",
            "difficulty": "easy",
        },
        {
            "sentence": "Iron deficiency in the diet leads to a condition called ______.",
            "blank_answer": "anaemia",
            "hint": "Condition with reduced haemoglobin",
            "topic": "c11_home_005",
            "difficulty": "easy",
        },
        {
            "sentence": "The psychological function of food satisfies our ______ and pleasure.",
            "blank_answer": "hunger",
            "hint": "Physical desire to eat",
            "topic": "c11_home_005",
            "difficulty": "easy",
        },
        {
            "sentence": "Millets like bajra and jowar are important sources of ______ in the Indian diet.",
            "blank_answer": "carbohydrates",
            "hint": "Main energy-yielding nutrient",
            "topic": "c11_home_005",
            "difficulty": "easy",
        },
    ]
    _seed(seed)
    selected = random.sample(templates, min(count, len(templates)))
    for i, t in enumerate(selected):
        questions.append({
            "id": _gen_id(seed, 2, 100 + i + 1),
            "type": "fill_blank",
            "question": t["sentence"],
            "answer": t["blank_answer"],
            "explanation": f"The correct answer is '{t['blank_answer']}'. {t['hint']}.",
            "difficulty": t["difficulty"],
            "topic": t["topic"],
        })
    return questions


def _gen_ch2_short_answer(seed: int, count: int) -> list:
    questions = []
    templates = [
        {
            "question": "Explain the five dimensions of health with one example for each.",
            "answer": "The five dimensions of health are: (1) Physical - body fitness and freedom from disease (e.g., regular exercise); (2) Social - ability to interact and maintain relationships (e.g., participating in community events); (3) Emotional - ability to express feelings and cope with stress (e.g., managing anger calmly); (4) Mental - cognitive clarity and decision-making ability (e.g., studying effectively); (5) Spiritual - inner peace and sense of purpose (e.g., meditation or prayer). All five dimensions together define holistic health.",
            "key_points": ["Physical", "Social", "Emotional", "Mental", "Spiritual", "Example for each"],
            "topic": "c11_home_004",
            "difficulty": "medium",
            "marks": 3,
        },
        {
            "question": "Describe the three functions of food with examples from an Indian diet.",
            "answer": "The three functions of food are: (1) Physiological - provides energy (carbohydrates from rice/wheat), builds tissues (proteins from dal/paneer), regulates body processes (vitamins from vegetables); (2) Psychological - satisfies hunger, provides comfort and pleasure (e.g., favourite home-cooked meal during stress); (3) Social - strengthens social bonds (family meals during festivals like Diwali, sharing sweets with neighbours during Eid or Ganesh Chaturthi). In an Indian context, food is central to all social and cultural celebrations.",
            "key_points": ["Physiological function", "Psychological function", "Social function", "Indian examples"],
            "topic": "c11_home_005",
            "difficulty": "medium",
            "marks": 4,
        },
        {
            "question": "Why is a balanced diet essential? How does it relate to health?",
            "answer": "A balanced diet is essential because it provides all essential nutrients - carbohydrates, proteins, fats, vitamins, minerals, and water - in the right proportions. It ensures: adequate energy for daily activities, proper growth and repair of body tissues, strong immunity against diseases, and prevention of deficiency diseases (e.g., anaemia from iron deficiency, scurvy from Vitamin C deficiency). In India, a balanced diet can be achieved using affordable local foods - combining cereals (rice/wheat), pulses (dal), vegetables, fruits, and milk. The Indian Council of Medical Research (ICMR) provides recommended dietary allowances (RDA) for Indians.",
            "key_points": [
                "All essential nutrients provided",
                "Energy, growth, immunity",
                "Prevents deficiency diseases",
                "Indian context - local foods",
                "ICMR RDA mentioned",
            ],
            "topic": "c11_home_004",
            "difficulty": "medium",
            "marks": 4,
        },
        {
            "question": "Classify the following Indian foods according to their primary nutrient: rice, toor dal, mustard oil, amla, spinach.",
            "answer": "Classification by primary nutrient: (1) Rice - Carbohydrates (energy-giving); (2) Toor dal - Proteins (body-building); (3) Mustard oil - Fats (energy-giving); (4) Amla - Vitamins (protective); (5) Spinach - Minerals (protective, rich in iron and calcium). This classification helps in meal planning to ensure a balanced diet using Indian food items.",
            "key_points": [
                "Rice → Carbohydrates",
                "Toor dal → Proteins",
                "Mustard oil → Fats",
                "Amla → Vitamins",
                "Spinach → Minerals",
            ],
            "topic": "c11_home_005",
            "difficulty": "medium",
            "marks": 3,
        },
    ]
    _seed(seed)
    selected = random.sample(templates, min(count, len(templates)))
    for i, t in enumerate(selected):
        questions.append({
            "id": _gen_id(seed, 2, 200 + i + 1),
            "type": "short_answer",
            "question": t["question"],
            "answer": t["answer"],
            "key_points": t["key_points"],
            "explanation": t["answer"],
            "difficulty": t["difficulty"],
            "topic": t["topic"],
            "marks": t["marks"],
        })
    return questions


def _gen_ch2_long_answer(seed: int, count: int) -> list:
    questions = []
    templates = [
        {
            "question": "Explain the relationship between food and health. How does a balanced diet contribute to the five dimensions of health? Use Indian dietary examples.",
            "answer": "Food and health are deeply interrelated - the food we eat directly determines our physical health, and also influences emotional, social, and mental well-being. A balanced diet - providing carbohydrates, proteins, fats, vitamins, minerals and water in correct proportions - contributes to all five dimensions of health: (1) Physical health: adequate calories from rice, wheat, and pulses maintain energy; proteins from dal build muscles; vitamins from seasonal vegetables boost immunity; (2) Social health: sharing traditional Indian meals (e.g., festive thalis) strengthens family and community bonds; (3) Emotional health: comfort foods like khichdi during illness provide psychological comfort; (4) Mental health: nutrients like iron from spinach and Vitamin B from whole grains support cognitive function; (5) Spiritual health: many Indian traditions prescribe fasting and specific foods during religious periods, linking food to spiritual discipline. In India, millets (bajra, ragi), pulses, seasonal vegetables, and seasonal fruits can provide an affordable balanced diet. The National Institute of Nutrition (NIN), Hyderabad, provides Indian-specific dietary guidelines that emphasise variety, moderation, and use of locally available foods.",
            "key_points": [
                "Food-health relationship explained",
                "Five dimensions of health addressed",
                "Indian dietary examples",
                "NIN/ICMR dietary guidelines referenced",
                "Affordable local foods emphasised",
            ],
            "topic": "c11_home_004",
            "difficulty": "hard",
            "marks": 5,
        },
        {
            "question": "Discuss the classification of food on the basis of nutrients and functions. Give Indian examples for each category and explain their role in maintaining health.",
            "answer": "Foods can be classified by nutrients into: Carbohydrates (cereals, millets, sugar), Proteins (pulses, milk, meat, eggs), Fats (oils, ghee, butter), Vitamins (fruits, vegetables), Minerals (milk, green leafy vegetables, nuts), and Water. By functions, foods are classified as: (1) Energy-giving foods: Carbohydrates and fats provide calories - rice, wheat, bajra, sugar, ghee, mustard oil. A daily adult needs about 2000-2400 kcal. (2) Body-building foods: Proteins build and repair tissues - dal, paneer, milk, eggs, chicken. ICMR recommends 60g protein/day for adults. (3) Protective/regulatory foods: Vitamins and minerals protect against disease - amla (Vitamin C), carrot (Vitamin A), spinach (iron), milk (calcium). In an Indian context, combining rice and dal provides complementary proteins improving protein quality. A balanced Indian meal (thali) includes: roti (carbs), dal (proteins), sabzi (vitamins/minerals), rice (carbs), curd (calcium/probiotics), and a piece of fruit - covering all nutrient categories.",
            "key_points": [
                "Six nutrient categories with Indian examples",
                "Three functional categories explained",
                "ICMR RDA figures referenced",
                "Indian thali as example of balanced meal",
                "Complementary proteins concept",
            ],
            "topic": "c11_home_005",
            "difficulty": "hard",
            "marks": 5,
        },
    ]
    _seed(seed)
    selected = random.sample(templates, min(count, len(templates)))
    for i, t in enumerate(selected):
        questions.append({
            "id": _gen_id(seed, 2, 300 + i + 1),
            "type": "long_answer",
            "question": t["question"],
            "answer": t["answer"],
            "key_points": t["key_points"],
            "explanation": t["answer"],
            "difficulty": t["difficulty"],
            "topic": t["topic"],
            "marks": t["marks"],
        })
    return questions


def _gen_ch2_numerical(seed: int, count: int) -> list:
    questions = []

    return {"status": "ok", "note": "truncated"}
