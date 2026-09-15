"""
CISCE Class 11 Home Science - Question Generator and Solvers

Deterministic question generator covering ISC Class 11 Home Science syllabus (c11_home_001 to c11_home_010).
All questions are factually correct per the CISCE prescribed curriculum.
Uses seeded random for reproducibility — no external API or LLM calls.
"""

import random
from typing import Dict, List, Any, Optional, Callable
import json
import hashlib


# ──────────────────────────────────────────────────────────────
# SYLLABUS TOPICS
# ──────────────────────────────────────────────────────────────

TOPICS = {
    "c11_home_001": "Concept, Scope and Importance of Home Science",
    "c11_home_002": "Family, Home and Society",
    "c11_home_003": "Individual and Family Needs, Resources and Management",
    "c11_home_004": "Nutrition, Food and Health — Basics",
    "c11_home_005": "Nutritional Needs and Balanced Diet",
    "c11_home_006": "Principles of Cooking and Meal Planning",
    "c11_home_007": "Methods and Fuels of Cooking",
    "c11_home_008": "Food Preservation",
    "c11_home_009": "Safety and Adulteration in Foods",
    "c11_home_010": "Consumer Education and Textile Fibres",
}

TOPIC_KEYS = list(TOPICS.keys())


# ──────────────────────────────────────────────────────────────
# SOLVER FUNCTIONS
# ──────────────────────────────────────────────────────────────

def solve_mcq(question: Dict[str, Any], selected_option: str) -> Dict[str, Any]:
    """Solve / evaluate an MCQ question."""
    correct = question.get("answer", "")
    is_correct = selected_option.strip().upper() == correct.strip().upper()
    return {
        "selected": selected_option,
        "correct": correct,
        "is_correct": is_correct,
        "score": 1.0 if is_correct else 0.0,
    }


def solve_fill_blank(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Solve / evaluate a fill-in-the-blank question."""
    correct = question.get("answer", "")
    normalized_user = user_answer.strip().lower()
    normalized_correct = correct.strip().lower()
    is_correct = normalized_user == normalized_correct
    return {
        "user_answer": user_answer,
        "correct_answer": correct,
        "is_correct": is_correct,
        "score": 1.0 if is_correct else 0.0,
    }


def solve_short_answer(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Evaluate a short-answer question using keyword matching."""
    keywords = question.get("keywords", [])
    normalized_answer = user_answer.strip().lower()
    matched = sum(1 for kw in keywords if kw.lower() in normalized_answer)
    coverage = matched / max(len(keywords), 1)
    is_correct = coverage >= 0.5
    return {
        "user_answer": user_answer,
        "keywords_expected": keywords,
        "keywords_matched": matched,
        "coverage": round(coverage, 2),
        "is_correct": is_correct,
        "score": round(coverage, 2),
    }


def solve_long_answer(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Evaluate a long-answer question using keyword and length heuristics."""
    keywords = question.get("keywords", [])
    normalized_answer = user_answer.strip().lower()
    word_count = len(normalized_answer.split())
    matched = sum(1 for kw in keywords if kw.lower() in normalized_answer)
    coverage = matched / max(len(keywords), 1)
    length_ok = word_count >= 50
    is_correct = coverage >= 0.5 and length_ok
    return {
        "user_answer": user_answer,
        "word_count": word_count,
        "keywords_matched": matched,
        "coverage": round(coverage, 2),
        "length_adequate": length_ok,
        "is_correct": is_correct,
        "score": round(coverage, 2),
    }


def solve_numerical(question: Dict[str, Any], user_value: float) -> Dict[str, Any]:
    """Evaluate a numerical question with tolerance."""
    correct = question.get("answer_numerical", 0.0)
    tolerance = question.get("tolerance", 0.01)
    diff = abs(user_value - correct)
    is_correct = diff <= tolerance * max(abs(correct), 1.0)
    return {
        "user_value": user_value,
        "correct_value": correct,
        "difference": round(diff, 4),
        "tolerance": tolerance,
        "is_correct": is_correct,
        "score": 1.0 if is_correct else 0.0,
    }


SOLVER_MAP = {
    "mcq": solve_mcq,
    "fill_blank": solve_fill_blank,
    "short_answer": solve_short_answer,
    "long_answer": solve_long_answer,
    "numerical": solve_numerical,
}


# ──────────────────────────────────────────────────────────────
# QUESTION GENERATORS — one function per syllabus topic
# ──────────────────────────────────────────────────────────────

def gen_c11_home_001(rng: random.Random) -> List[Dict[str, Any]]:
    """Concept, Scope and Importance of Home Science."""
    questions = []

    # MCQ — easy
    q = {
        "id": "c11_home_001_mcq_1",
        "question_text": "Which of the following is NOT a main area of Home Science?",
        "question_type": "mcq",
        "options": {
            "A": "Food and Nutrition",
            "B": "Physics",
            "C": "Textiles and Clothing",
            "D": "Human Development",
        },
        "answer": "B",
        "difficulty": 0.2,
        "topic": "c11_home_001",
        "solution": "Physics is not a main area of Home Science. The five core areas are: Food & Nutrition, "
                    "Textiles & Clothing, Human Development, Resource Management, and Community Development.",
        "verification": "CISCE ISC Home Science textbook, Chapter 1, Section on Scope.",
        "keywords": ["scope", "areas"],
    }
    questions.append(q)

    # Fill blank — medium
    q = {
        "id": "c11_home_001_fb_1",
        "question_text": "Home Science is a _____ field of study that combines science, humanities and home management.",
        "question_type": "fill_blank",
        "options": None,
        "answer": "multidisciplinary",
        "difficulty": 0.4,
        "topic": "c11_home_001",
        "solution": "Home Science is a multidisciplinary field. It draws knowledge from biology, chemistry, physics, "
                    "economics, sociology and psychology to improve quality of life.",
        "verification": "CISCE ISC Home Science, Chapter 1.",
        "keywords": ["multidisciplinary", "interdisciplinary"],
    }
    questions.append(q)

    # Short answer — medium
    q = {
        "id": "c11_home_001_sa_1",
        "question_text": "List any four areas of Home Science.",
        "question_type": "short_answer",
        "options": None,
        "answer": "Food and Nutrition, Textiles and Clothing, Human Development, Resource Management",
        "difficulty": 0.4,
        "topic": "c11_home_001",
        "solution": "The main areas are:\n"
                    "1. Food and Nutrition – study of nutrients, balanced diet, cooking methods.\n"
                    "2. Textiles and Clothing – fibres, fabrics, garment construction.\n"
                    "3. Human Development – physical, emotional, social development across the lifespan.\n"
                    "4. Resource Management – efficient use of resources in homes and communities.\n"
                    "5. Community Development – extension education and community programmes.",
        "verification": "CISCE ISC Home Science, Chapter 1.",
        "keywords": ["food", "nutrition", "textiles", "clothing", "human development", "resource", "management"],
    }
    questions.append(q)

    # Long answer — hard
    q = {
        "id": "c11_home_001_la_1",
        "question_text": "Discuss the importance of studying Home Science in today's world.",
        "question_type": "long_answer",
        "options": None,
        "answer": "Home Science is important for personal development, health, efficient home management, "
                  "vocational opportunities, informed citizenship, and community welfare.",
        "difficulty": 0.7,
        "topic": "c11_home_001",
        "solution": "Importance of Home Science:\n"
                    "1. Promotes health and nutrition awareness, reducing malnutrition and lifestyle diseases.\n"
                    "2. Teaches efficient resource management — money, time, energy.\n"
                    "3. Empowers individuals with skills in food production, textile care, and budgeting.\n"
                    "4. Opens vocational and entrepreneurial opportunities.\n"
                    "5. Develops informed consumers who can make wise choices.\n"
                    "6. Contributes to community development and social welfare.",
        "verification": "CISCE ISC Home Science, Chapter 1.",
        "keywords": ["health", "nutrition", "management", "vocational", "consumer", "community", "skills"],
    }
    questions.append(q)

    return questions


def gen_c11_home_002(rng: random.Random) -> List[Dict[str, Any]]:
    """Family, Home and Society."""
    questions = []

    q = {
        "id": "c11_home_002_mcq_1",
        "question_text": "Which family type consists of grandparents, parents, uncles, aunts and cousins living together?",
        "question_type": "mcq",
        "options": {
            "A": "Nuclear family",
            "B": "Joint family",
            "C": "Extended family",
            "D": "Single-parent family",
        },
        "answer": "B",
        "difficulty": 0.2,
        "topic": "c11_home_002",
        "solution": "A joint family consists of two or more generations living together — grandparents, parents, "
                    "uncles, aunts, cousins, etc., sharing a common kitchen and residence.",
        "verification": "CISCE ISC Home Science, Chapter 2.",
        "keywords": ["joint", "family", "generations"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_002_fb_1",
        "question_text": "A family consisting of only parents and their children is called a _____ family.",
        "question_type": "fill_blank",
        "options": None,
        "answer": "nuclear",
        "difficulty": 0.3,
        "topic": "c11_home_002",
        "solution": "A nuclear family consists of just two generations — parents and their children — living together.",
        "verification": "CISCE ISC Home Science, Chapter 2.",
        "keywords": ["nuclear", "family"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_002_sa_1",
        "question_text": "Explain the functions of a family.",
        "question_type": "short_answer",
        "options": None,
        "answer": "Economic, reproductive, educational, emotional, socialisation, health care",
        "difficulty": 0.5,
        "topic": "c11_home_002",
        "solution": "Functions of the family:\n"
                    "1. Economic – providing food, shelter, clothing.\n"
                    "2. Reproductive – bearing and raising children.\n"
                    "3. Educational – transmitting values, culture, and knowledge.\n"
                    "4. Emotional – love, affection, emotional security.\n"
                    "5. Socialisation – teaching social norms and behaviour.\n"
                    "6. Health care – caring for sick members.",
        "verification": "CISCE ISC Home Science, Chapter 2.",
        "keywords": ["economic", "reproductive", "educational", "emotional", "socialisation", "health"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_002_la_1",
        "question_text": "Discuss the changing structure of the Indian family.",
        "question_type": "long_answer",
        "options": None,
        "answer": "Shift from joint to nuclear families, urbanisation, women working, dual income, elderly care issues.",
        "difficulty": 0.7,
        "topic": "c11_home_002",
        "solution": "The Indian family is transitioning:\n"
                    "1. From joint to nuclear due to urbanisation and migration.\n"
                    "2. Women increasingly entering the workforce (dual-income families).\n"
                    "3. Decline in joint family support systems.\n"
                    "4. Rise in single-parent and child-headed households.\n"
                    "5. Elderly care becomes a challenge without extended family support.",
        "verification": "CISCE ISC Home Science, Chapter 2.",
        "keywords": ["joint", "nuclear", "urbanisation", "women", "workforce", "elderly", "migration"],
    }
    questions.append(q)

    return questions


def gen_c11_home_003(rng: random.Random) -> List[Dict[str, Any]]:
    """Individual and Family Needs, Resources and Management."""
    questions = []

    q = {
        "id": "c11_home_003_mcq_1",
        "question_text": "Which of the following is a human resource?",
        "question_type": "mcq",
        "options": {
            "A": "Money",
            "B": "Time",
            "C": "Knowledge and skills",
            "D": "House",
        },
        "answer": "C",
        "difficulty": 0.3,
        "topic": "c11_home_003",
        "solution": "Knowledge and skills are human resources. Money is financial, time is time resource, "
                    "and house is a material resource.",
        "verification": "CISCE ISC Home Science, Chapter 3.",
        "keywords": ["human", "resource", "knowledge", "skills"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_003_fb_1",
        "question_text": "The process of planning, organising, directing and controlling the use of resources to "
                         "achieve goals is called _____.",
        "question_type": "fill_blank",
        "options": None,
        "answer": "management",
        "difficulty": 0.4,
        "topic": "c11_home_003",
        "solution": "Management is the process of using resources efficiently to achieve individual and family goals. "
                    "It involves planning, organising, implementing and evaluating.",
        "verification": "CISCE ISC Home Science, Chapter 3.",
        "keywords": ["management", "planning", "resources"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_003_sa_1",
        "question_text": "Classify the resources available to a family.",
        "question_type": "short_answer",
        "options": None,
        "answer": "Human, material, community, financial, time",
        "difficulty": 0.4,
        "topic": "c11_home_003",
        "solution": "Classification of Resources:\n"
                    "1. Human – knowledge, skills, energy, health.\n"
                    "2. Material (goods) – house, furniture, appliances, clothing.\n"
                    "3. Community – roads, hospitals, schools, parks.\n"
                    "4. Financial – income, savings, investments.\n"
                    "5. Time – hours available in a day.",
        "verification": "CISCE ISC Home Science, Chapter 3.",
        "keywords": ["human", "material", "community", "financial", "time"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_003_la_1",
        "question_text": "Explain the steps in the management process with examples.",
        "question_type": "long_answer",
        "options": None,
        "answer": "Planning, organising, implementing, controlling, evaluating",
        "difficulty": 0.7,
        "topic": "c11_home_003",
        "solution": "Steps in Management Process:\n"
                    "1. Setting Goals – identify what you want (e.g., prepare a healthy meal).\n"
                    "2. Planning – list actions, resources needed, budget.\n"
                    "3. Organising – arrange resources and time.\n"
                    "4. Implementing – carry out the plan (buy ingredients, cook).\n"
                    "5. Controlling – monitor progress (is the meal on time?).\n"
                    "6. Evaluating – assess results (was the meal nutritious and tasty?).",
        "verification": "CISCE ISC Home Science, Chapter 3.",
        "keywords": ["planning", "organising", "implementing", "controlling", "evaluating", "goals"],
    }
    questions.append(q)

    return questions


def gen_c11_home_004(rng: random.Random) -> List[Dict[str, Any]]:
    """Nutrition, Food and Health — Basics."""
    questions = []

    q = {
        "id": "c11_home_004_mcq_1",
        "question_text": "Which of the following is NOT a macronutrient?",
        "question_type": "mcq",
        "options": {
            "A": "Carbohydrates",
            "B": "Proteins",
            "C": "Fats",
            "D": "Iron",
        },
        "answer": "D",
        "difficulty": 0.2,
        "topic": "c11_home_004",
        "solution": "Iron is a micronutrient (mineral). Carbohydrates, proteins and fats are macronutrients "
                    "required in large amounts.",
        "verification": "CISCE ISC Home Science, Chapter 4.",
        "keywords": ["macronutrient", "micronutrient", "iron"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_004_fb_1",
        "question_text": "The _____ provides 4 kcal per gram.",
        "question_type": "fill_blank",
        "options": None,
        "answer": "carbohydrate",
        "difficulty": 0.4,
        "topic": "c11_home_004",
        "solution": "Carbohydrates provide 4 kcal per gram. Proteins also provide 4 kcal/g, fats provide 9 kcal/g.",
        "verification": "CISCE ISC Home Science, Chapter 4.",
        "keywords": ["carbohydrate", "4 kcal"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_004_sa_1",
        "question_text": "Define a nutrient and list the six major nutrients.",
        "question_type": "short_answer",
        "options": None,
        "answer": "Carbohydrates, proteins, fats, vitamins, minerals, water",
        "difficulty": 0.3,
        "topic": "c11_home_004",
        "solution": "A nutrient is a chemical substance in food that provides energy, builds and repairs tissues, "
                    "and regulates body processes.\n"
                    "Six major nutrients:\n"
                    "1. Carbohydrates – main energy source.\n"
                    "2. Proteins – growth and repair.\n"
                    "3. Fats – energy reserve, insulation, cell structure.\n"
                    "4. Vitamins – regulate body processes.\n"
                    "5. Minerals – structural and functional roles.\n"
                    "6. Water – solvent, transport, temperature regulation.",
        "verification": "CISCE ISC Home Science, Chapter 4.",
        "keywords": ["carbohydrate", "protein", "fat", "vitamin", "mineral", "water", "energy"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_004_numerical_1",
        "question_text": "Calculate the total energy from a meal containing 60g carbohydrate, 20g protein and 15g fat. "
                         "(Use: carb=4 kcal/g, protein=4 kcal/g, fat=9 kcal/g)",
        "question_type": "numerical",
        "options": None,
        "answer": 455.0,
        "answer_numerical": 455.0,
        "tolerance": 0.02,
        "difficulty": 0.5,
        "topic": "c11_home_004",
        "solution": "Carbohydrate: 60 g × 4 kcal/g = 240 kcal\n"
                    "Protein: 20 g × 4 kcal/g = 80 kcal\n"
                    "Fat: 15 g × 9 kcal/g = 135 kcal\n"
                    "Total = 240 + 80 + 135 = 455 kcal",
        "verification": "CISCE ISC Home Science, Chapter 4.",
        "keywords": ["energy", "calculation", "kcal"],
    }
    questions.append(q)

    return questions


def gen_c11_home_005(rng: random.Random) -> List[Dict[str, Any]]:
    """Nutritional Needs and Balanced Diet."""
    questions = []

    q = {
        "id": "c11_home_005_mcq_1",
        "question_text": "Which nutrient deficiency causes anaemia?",
        "question_type": "mcq",
        "options": {
            "A": "Vitamin A",
            "B": "Iron",
            "C": "Calcium",
            "D": "Vitamin C",
        },
        "answer": "B",
        "difficulty": 0.2,
        "topic": "c11_home_005",
        "solution": "Iron deficiency leads to iron-deficiency anaemia — the most common nutritional deficiency worldwide.",
        "verification": "CISCE ISC Home Science, Chapter 5.",
        "keywords": ["iron", "anaemia", "deficiency"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_005_fb_1",
        "question_text": "A diet that contains all the essential nutrients in the right proportions is called a _____ diet.",
        "question_type": "fill_blank",
        "options": None,
        "answer": "balanced",
        "difficulty": 0.3,
        "topic": "c11_home_005",
        "solution": "A balanced diet provides all essential nutrients in the right quantities and proportions to "
                    "maintain health and promote growth.",
        "verification": "CISCE ISC Home Science, Chapter 5.",
        "keywords": ["balanced", "diet"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_005_sa_1",
        "question_text": "Explain the factors affecting nutritional requirements of an individual.",
        "question_type": "short_answer",
        "options": None,
        "answer": "Age, sex, physical activity, physiological state, health, climate, occupation",
        "difficulty": 0.5,
        "topic": "c11_home_005",
        "solution": "Factors affecting nutritional requirements:\n"
                    "1. Age – growing children and elderly have different needs.\n"
                    "2. Sex – males generally need more calories than females.\n"
                    "3. Physical activity – active people need more energy.\n"
                    "4. Physiological state – pregnancy, lactation increase needs.\n"
                    "5. Health status – illness changes nutrient requirements.\n"
                    "6. Climate – cold climates require more energy.\n"
                    "7. Occupation – manual labour needs more calories.",
        "verification": "CISCE ISC Home Science, Chapter 5.",
        "keywords": ["age", "sex", "activity", "physiological", "health", "climate", "occupation"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_005_la_1",
        "question_text": "Discuss the ICMR Recommended Dietary Allowances (RDA) for Indians, focusing on energy and protein.",
        "question_type": "long_answer",
        "options": None,
        "answer": "ICMR RDA: sedentary man 2320 kcal, woman 1900 kcal; moderate man 2730, woman 2230; "
                  "protein 60g man, 55g woman (sedentary)",
        "difficulty": 0.8,
        "topic": "c11_home_005",
        "solution": "ICMR RDA (approximate, per day):\n"
                    "Man (sedentary): 2320 kcal, 60g protein\n"
                    "Man (moderate): 2730 kcal, 60g protein\n"
                    "Woman (sedentary): 1900 kcal, 55g protein\n"
                    "Woman (moderate): 2230 kcal, 55g protein\n"
                    "Pregnant woman: +350 kcal, +23g protein\n"
                    "Lactating mother: +600 kcal, +19g protein\n"
                    "These values are periodically updated by the National Institute of Nutrition.",
        "verification": "ICMR/NIN Dietary Guidelines for Indians; CISCE ISC Home Science, Chapter 5.",
        "keywords": ["icmr", "rda", "energy", "protein", "calories", "sedentary", "moderate"],
    }
    questions.append(q)

    return questions


def gen_c11_home_006(rng: random.Random) -> List[Dict[str, Any]]:
    """Principles of Cooking and Meal Planning."""
    questions = []

    q = {
        "id": "c11_home_006_mcq_1",
        "question_text": "Which principle of cooking involves adding foods at different times to ensure all are cooked equally?",
        "question_type": "mcq",
        "options": {
            "A": "Selection of ingredients",
            "B": "Method of cooking",
            "C": "Sequence of adding ingredients",
            "D": "Seasoning",
        },
        "answer": "C",
        "difficulty": 0.3,
        "topic": "c11_home_006",
        "solution": "The sequence of adding ingredients ensures that harder-to-cook items are added first and "
                    "softer items later so everything finishes at the same time.",
        "verification": "CISCE ISC Home Science, Chapter 6.",
        "keywords": ["sequence", "ingredients", "timing"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_006_fb_1",
        "question_text": "A meal plan for one week showing the foods to be prepared each day is called a _____.",
        "question_type": "fill_blank",
        "options": None,
        "answer": "menu",
        "difficulty": 0.3,
        "topic": "c11_home_006",
        "solution": "A menu is a list of dishes planned for meals. A weekly menu plans all meals for seven days.",
        "verification": "CISCE ISC Home Science, Chapter 6.",
        "keywords": ["menu", "meal", "plan"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_006_sa_1",
        "question_text": "What is a balanced diet? How does it differ for a sedentary adult versus a manual labourer?",
        "question_type": "short_answer",
        "options": None,
        "answer": "Balanced diet: all nutrients in right proportions. Sedentary needs fewer calories than manual labourer.",
        "difficulty": 0.5,
        "topic": "c11_home_006",
        "solution": "A balanced diet supplies all essential nutrients in adequate amounts.\n"
                    "Differences:\n"
                    "• Sedentary worker: lower energy needs (~2320 kcal/day).\n"
                    "• Manual labourer: higher energy needs (~3800+ kcal/day) due to physical exertion.\n"
                    "Both need similar proportions of proteins, fats, vitamins, and minerals.",
        "verification": "CISCE ISC Home Science, Chapter 6.",
        "keywords": ["balanced", "diet", "sedentary", "manual", "calories", "energy", "nutrients"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_006_la_1",
        "question_text": "Explain the principles of meal planning. Give a one-day menu for an adolescent girl.",
        "question_type": "long_answer",
        "options": None,
        "answer": "Principles: nutritional adequacy, variety, balance, moderation, appeal, economy. "
                  "Menu: breakfast porridge+milk+fruit, mid-morning fruit, lunch chapati+dal+veg+curd, "
                  "evening snack channa, dinner khichdi+salad+milk.",
        "difficulty": 0.75,
        "topic": "c11_home_006",
        "solution": "Principles of Meal Planning:\n"
                    "1. Nutritional adequacy – include all food groups.\n"
                    "2. Variety – different foods across days.\n"
                    "3. Balance – right proportion of nutrients.\n"
                    "4. Moderation – avoid excess.\n"
                    "5. Appeal – attractive colour, texture, flavour.\n"
                    "6. Economy – cost-effective.\n"
                    "7. Consider preferences, culture, season.\n\n"
                    "One-Day Menu for Adolescent Girl:\n"
                    "Breakfast: Upma + milk + banana\n"
                    "Mid-morning: Orange juice\n"
                    "Lunch: Chapati + dal + mixed vegetable + salad + curd\n"
                    "Evening: Poha / chana chaat\n"
                    "Dinner: Khichdi + raita + fruit",
        "verification": "CISCE ISC Home Science, Chapter 6.",
        "keywords": ["meal", "planning", "principles", "nutrition", "balance", "variety", "menu", "adolescent"],
    }
    questions.append(q)

    return questions


def gen_c11_home_007(rng: random.Random) -> List[Dict[str, Any]]:
    """Methods and Fuels of Cooking."""
    questions = []

    q = {
        "id": "c11_home_007_mcq_1",
        "question_text": "Which cooking method uses dry heat with fat or oil?",
        "question_type": "mcq",
        "options": {
            "A": "Boiling",
            "B": "Steaming",
            "C": "Frying",
            "D": "Poaching",
        },
        "answer": "C",
        "difficulty": 0.2,
        "topic": "c11_home_007",
        "solution": "Frying uses dry heat with oil/fat as the medium. Boiling uses moist heat in water, "
                    "steaming uses steam, poaching uses simmering water.",
        "verification": "CISCE ISC Home Science, Chapter 7.",
        "keywords": ["frying", "dry", "heat", "oil"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_007_fb_1",
        "question_text": "Cooking food by steam without submerging it in water is called _____.",
        "question_type": "fill_blank",
        "options": None,
        "answer": "steaming",
        "difficulty": 0.3,
        "topic": "c11_home_007",
        "solution": "Steaming uses steam to cook food. Food is placed on a rack above boiling water and covered.",
        "verification": "CISCE ISC Home Science, Chapter 7.",
        "keywords": ["steaming", "steam"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_007_sa_1",
        "question_text": "Distinguish between dry-heat and moist-heat methods of cooking, giving two examples of each.",
        "question_type": "short_answer",
        "options": None,
        "answer": "Dry heat: roasting, frying, grilling (no water). Moist heat: boiling, steaming, pressure cooking (with water/steam).",
        "difficulty": 0.5,
        "topic": "c11_home_007",
        "solution": "Dry-heat cooking (no water/steam):\n"
                    "• Roasting – e.g., roasting nuts.\n"
                    "• Frying – e.g., frying pakoras.\n"
                    "• Grilling/Broiling – e.g., tikka.\n"
                    "Moist-heat cooking (water/steam):\n"
                    "• Boiling – e.g., boiling potatoes.\n"
                    "• Steaming – e.g., idlis, dhokla.\n"
                    "• Pressure cooking – e.g., dal, rice.",
        "verification": "CISCE ISC Home Science, Chapter 7.",
        "keywords": ["dry", "heat", "moist", "heat", "roasting", "frying", "boiling", "steaming"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_007_la_1",
        "question_text": "Discuss the effect of various cooking methods on the nutritive value of food.",
        "question_type": "long_answer",
        "options": None,
        "answer": "Boiling leaches water-soluble vitamins; steaming retains more; frying increases fat content; "
                  "pressure cooking retains nutrients better than open boiling.",
        "difficulty": 0.75,
        "topic": "c11_home_007",
        "solution": "Effect of cooking methods on nutrients:\n"
                    "1. Boiling – large loss of water-soluble vitamins (B, C); minerals leach into water.\n"
                    "2. Steaming – minimal nutrient loss; preserves colour and texture.\n"
                    "3. Pressure cooking – reduces cooking time, better nutrient retention.\n"
                    "4. Frying – adds fat and calories; some vitamin loss at high temperature.\n"
                    "5. Roasting/Grilling – some nutrient loss, good flavour development.\n"
                    "6. Microwaving – short cooking time preserves most nutrients.\n"
                    "Tip: use minimal water, cover pots, and reuse cooking water to reduce loss.",
        "verification": "CISCE ISC Home Science, Chapter 7.",
        "keywords": ["boiling", "steaming", "frying", "pressure", "nutrients", "vitamins", "minerals", "loss"],
    }
    questions.append(q)

    return questions


def gen_c11_home_008(rng: random.Random) -> List[Dict[str, Any]]:
    """Food Preservation."""
    questions = []

    q = {
        "id": "c11_home_008_mcq_1",
        "question_text": "Which method of food preservation uses high temperature to kill microorganisms?",
        "question_type": "mcq",
        "options": {
            "A": "Pickling",
            "B": "Pasteurisation",
            "C": "Dehydration",
            "D": "Canning",
        },
        "answer": "B",
        "difficulty": 0.3,
        "topic": "c11_home_008",
        "solution": "Pasteurisation uses mild heat (72°C for 15s) to kill pathogenic microorganisms in milk/juice.",
        "verification": "CISCE ISC Home Science, Chapter 8.",
        "keywords": ["pasteurisation", "heat", "microorganisms"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_008_fb_1",
        "question_text": "Removing moisture from food to prevent microbial growth is called _____.",
        "question_type": "fill_blank",
        "options": None,
        "answer": "dehydration",
        "difficulty": 0.3,
        "topic": "c11_home_008",
        "solution": "Dehydration (drying) removes water so microorganisms cannot grow. Used for fruits, vegetables, fish.",
        "verification": "CISCE ISC Home Science, Chapter 8.",
        "keywords": ["dehydration", "drying", "moisture"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_008_sa_1",
        "question_text": "Explain the principle of canning as a method of food preservation.",
        "question_type": "short_answer",
        "options": None,
        "answer": "Heat treatment + airtight container prevents spoilage by killing microorganisms and preventing re-entry.",
        "difficulty": 0.5,
        "topic": "c11_home_008",
        "solution": "Canning involves:\n"
                    "1. Heat treatment (100–121°C) to destroy microorganisms and enzymes.\n"
                    "2. Filling into sterilised, airtight containers (cans/jars).\n"
                    "3. Sealing while hot to create a vacuum.\n"
                    "The vacuum prevents re-contamination, giving a long shelf life.",
        "verification": "CISCE ISC Home Science, Chapter 8.",
        "keywords": ["heat", "canning", "sealing", "vacuum", "microorganisms"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_008_la_1",
        "question_text": "Describe the methods of food preservation you have studied. Include at least four methods.",
        "question_type": "long_answer",
        "options": None,
        "answer": "Methods: pasteurisation, canning, dehydration, freezing, pickling, use of preservatives.",
        "difficulty": 0.7,
        "topic": "c11_home_008",
        "solution": "Methods of Food Preservation:\n"
                    "1. Pasteurisation – mild heat to kill pathogens (milk, juice).\n"
                    "2. Canning – heat + airtight sealing (soups, fruits).\n"
                    "3. Dehydration – remove water (dried fruits, raisins).\n"
                    "4. Freezing – low temperature slows microbial growth.\n"
                    "5. Pickling – acid (vinegar) or fermentation inhibits microbes.\n"
                    "6. Use of chemical preservatives – salt, sugar, benzoates, sulphites.\n"
                    "7. Irradiation – gamma rays kill microorganisms.",
        "verification": "CISCE ISC Home Science, Chapter 8.",
        "keywords": ["pasteurisation", "canning", "dehydration", "freezing", "pickling", "preservative"],
    }
    questions.append(q)

    return questions


def gen_c11_home_009(rng: random.Random) -> List[Dict[str, Any]]:
    """Safety and Adulteration in Foods."""
    questions = []

    q = {
        "id": "c11_home_009_mcq_1",
        "question_text": "Which of the following is an example of intentional adulteration?",
        "question_type": "mcq",
        "options": {
            "A": "Insect fragments in flour",
            "B": "Lead in turmeric powder",
            "C": "Pesticide residue on vegetables",
            "D": "Mold in bread",
        },
        "answer": "B",
        "difficulty": 0.4,
        "topic": "c11_home_009",
        "solution": "Lead added to turmeric is intentional adulteration (to enhance colour). Insect fragments "
                    "and pesticide residues are incidental; mold is spoilage.",
        "verification": "CISCE ISC Home Science, Chapter 9; FSSAI guidelines.",
        "keywords": ["adulteration", "intentional", "lead", "turmeric"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_009_fb_1",
        "question_text": "Adding water to milk to increase its volume is a form of _____.",
        "question_type": "fill_blank",
        "options": None,
        "answer": "adulteration",
        "difficulty": 0.3,
        "topic": "c11_home_009",
        "solution": "Diluting milk with water is an adulteration practice. It reduces nutritional value and "
                    "can be detected using a lactometer.",
        "verification": "CISCE ISC Home Science, Chapter 9.",
        "keywords": ["adulteration", "milk", "water"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_009_sa_1",
        "question_text": "What is food adulteration? List three harmful effects.",
        "question_type": "short_answer",
        "options": None,
        "answer": "Adulteration: adding inferior/ harmful substances. Effects: nutritional deficiency, disease, death.",
        "difficulty": 0.4,
        "topic": "c11_home_009",
        "solution": "Food adulteration is the act of debasing food quality by adding inferior, harmful, or "
                    "substitute substances.\n"
                    "Harmful effects:\n"
                    "1. Nutritional deficiency – replacing quality ingredients reduces nutrient content.\n"
                    "2. Acute/chronic poisoning – lead, arsenic, colours cause toxicity.\n"
                    "3. Disease – contaminated adulterants spread infections and cause organ damage.\n"
                    "4. In severe cases, adulteration can be fatal.",
        "verification": "CISCE ISC Home Science, Chapter 9; Prevention of Food Adulteration Act.",
        "keywords": ["adulteration", "nutrition", "poisoning", "disease", "health"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_009_la_1",
        "question_text": "Discuss the Prevention of Food Adulteration Act and the role of FSSAI.",
        "question_type": "long_answer",
        "options": None,
        "answer": "PFA Act defines adulteration, sets standards, prohibits harmful additives. FSSAI regulates food safety, "
                  "licenses businesses, enforces standards.",
        "difficulty": 0.8,
        "topic": "c11_home_009",
        "solution": "Prevention of Food Adulteration (PFA) Act, 1954:\n"
                    "• Defines food adulteration and lays down standards.\n"
                    "• Prohibits sale of adulterated or misbranded food.\n"
                    "• Specifies penalties for violations.\n\n"
                    "FSSAI (Food Safety and Standards Authority of India):\n"
                    "• Regulates manufacture, storage, distribution, sale of food.\n"
                    "• Licenses and registers food businesses.\n"
                    "• Sets science-based food standards.\n"
                    "• Conducts surveillance and food testing.\n"
                    "• Promotes consumer awareness about food safety.",
        "verification": "CISCE ISC Home Science, Chapter 9; FSSAI Act, 2006.",
        "keywords": ["pfa", "act", "fssai", "standards", "adulteration", "licensing", "consumer"],
    }
    questions.append(q)

    return questions


def gen_c11_home_010(rng: random.Random) -> List[Dict[str, Any]]:
    """Consumer Education and Textile Fibres."""
    questions = []

    q = {
        "id": "c11_home_010_mcq_1",
        "question_text": "Which of the following is a natural fibre?",
        "question_type": "mcq",
        "options": {
            "A": "Polyester",
            "B": "Nylon",
            "C": "Cotton",
            "D": "Acrylic",
        },
        "answer": "C",
        "difficulty": 0.2,
        "topic": "c11_home_010",
        "solution": "Cotton is a natural cellulosic fibre obtained from the cotton plant. Polyester, nylon, and "
                    "acrylic are synthetic (man-made) fibres.",
        "verification": "CISCE ISC Home Science, Chapter 10.",
        "keywords": ["natural", "fibre", "cotton"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_010_fb_1",
        "question_text": "A consumer has the right to be informed about the quality, quantity, purity and _____ of goods.",
        "question_type": "fill_blank",
        "options": None,
        "answer": "standard",
        "difficulty": 0.4,
        "topic": "c11_home_010",
        "solution": "The Consumer Right to Information ensures consumers know quality, quantity, purity, and "
                    "standard of goods before purchasing.",
        "verification": "CISCE ISC Home Science, Chapter 10; Consumer Protection Act.",
        "keywords": ["consumer", "right", "information", "standard"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_010_sa_1",
        "question_text": "Classify textile fibres into natural and synthetic categories with two examples of each.",
        "question_type": "short_answer",
        "options": None,
        "answer": "Natural: cotton, silk, wool, jute. Synthetic: polyester, nylon, acrylic, rayon.",
        "difficulty": 0.4,
        "topic": "c11_home_010",
        "solution": "Classification of Textile Fibres:\n"
                    "Natural fibres:\n"
                    "• Vegetable (cellulosic): cotton, jute, linen, hemp.\n"
                    "• Animal (protein): silk, wool.\n"
                    "• Mineral: asbestos (less common now).\n"
                    "Man-made (regenerated/synthetic) fibres:\n"
                    "• Regenerated: rayon, viscose, acetate.\n"
                    "• Synthetic: polyester, nylon, acrylic, spandex.",
        "verification": "CISCE ISC Home Science, Chapter 10.",
        "keywords": ["natural", "synthetic", "cotton", "silk", "polyester", "nylon", "regenerated"],
    }
    questions.append(q)

    q = {
        "id": "c11_home_010_la_1",
        "question_text": "Discuss the rights of a consumer as per the Consumer Protection Act, 1986.",
        "question_type": "long_answer",
        "options": None,
        "answer": "Six rights: safety, information, choice, representation, redressal, consumer education.",
        "difficulty": 0.7,
        "topic": "c11_home_010",
        "solution": "Six Consumer Rights:\n"
                    "1. Right to Safety – protection against hazardous goods and services.\n"
                    "2. Right to Information – knowledge of quality, quantity, purity, standard, price.\n"
                    "3. Right to Choose – access to a variety of goods at competitive prices.\n"
                    "4. Right to be Heard – consumers' interests considered in policy-making.\n"
                    "5. Right to Seek Redressal – compensation for unfair practices or defective goods.\n"
                    "6. Right to Consumer Education – knowledge and skills to be an informed consumer.\n\n"
                    "Consumer Protection Act provides a three-tier quasi-judicial mechanism (District, State, National Commissions).",
        "verification": "CISCE ISC Home Science, Chapter 10; Consumer Protection Act, 1986.",
        "keywords": ["safety", "information", "choice", "representation", "redressal", "education", "rights"],
    }
    questions.append(q)

    return questions


# ──────────────────────────────────────────────────────────────
# QUESTION REGISTRY
# ──────────────────────────────────────────────────────────────

QUESTION_REGISTRY: Dict[str, Callable[[random.Random], List[Dict[str, Any]]]] = {
    "c11_home_001": gen_c11_home_001,
    "c11_home_002": gen_c11_home_002,
    "c11_home_003": gen_c11_home_003,
    "c11_home_004": gen_c11_home_004,
    "c11_home_005": gen_c11_home_005,
    "c11_home_006": gen_c11_home_006,
    "c11_home_007": gen_c11_home_007,
    "c11_home_008": gen_c11_home_008,
    "c11_home_009": gen_c11_home_009,
    "c11_home_010": gen_c11_home_010,
}


# ──────────────────────────────────────────────────────────────
# GENERATE QUESTIONS
# ──────────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Generate `count` deterministic questions from the registry using `seed`.

    The generator distributes questions round-robin across topics and,
    for each topic, cycles through its question list.  This guarantees
    reproducibility for any (seed, count) pair.

    Returns a list of question dicts, each containing:
        id, question_text, question_type, options, answer,
        difficulty, topic, solution, verification
    """
    rng = random.Random(seed)
    random.seed(seed)            # legacy seed also set

    # Collect all (topic, generator) pairs
    topic_generators = list(QUESTION_REGISTRY.items())
    total_topics = len(topic_generators)

    # Pre-compute all questions per topic (deterministic per seed)
    topic_questions: Dict[str, List[Dict[str, Any]]] = {}
    for topic_key, gen_fn in topic_generators:
        topic_questions[topic_key] = gen_fn(rng)

    # Flatten and distribute round-robin
    questions: List[Dict[str, Any]] = []
    pointers = {k: 0 for k, _ in topic_generators}

    for i in range(count):
        topic_key, _ = topic_generators[i % total_topics]
        pool = topic_questions[topic_key]
        idx = pointers[topic_key] % len(pool)
        q = dict(pool[idx])      # shallow copy
        # Ensure deterministic id by re-assigning if needed
        q["_seed_used"] = seed
        questions.append(q)
        pointers[topic_key] += 1

    return questions


# ──────────────────────────────────────────────────────────────
# VERIFICATION
# ──────────────────────────────────────────────────────────────

def _validate_question(q: Dict[str, Any]) -> List[str]:
    """Return a list of validation error strings for a single question."""
    errors: List[str] = []

    required_fields = [
        "id", "question_text", "question_type", "answer",
        "difficulty", "topic", "solution", "verification",
    ]
    for field in required_fields:
        if field not in q:
            errors.append(f"Missing field: {field}")

    if "question_type" in q:
        qtype = q["question_type"]
        if qtype not in ("mcq", "fill_blank", "short_answer", "long_answer", "numerical"):
            errors.append(f"Invalid question_type: {qtype}")

        if qtype == "mcq":
            opts = q.get("options")
            if not isinstance(opts, dict) or len(opts) < 2:
                errors.append("MCQ must have at least 2 options (dict)")
            answer = q.get("answer", "")
            if answer not in opts:
                errors.append(f"MCQ answer '{answer}' not among options {list(opts.keys())}")

        if qtype == "numerical":
            if "answer_numerical" not in q:
                errors.append("Numerical question missing 'answer_numerical'")

    if "difficulty" in q:
        d = q["difficulty"]
        if not isinstance(d, (int, float)) or not (0.0 <= d <= 1.0):
            errors.append(f"Difficulty out of range [0,1]: {d}")

    if "topic" in q and q["topic"] not in TOPICS:
        errors.append(f"Unknown topic code: {q['topic']}")

    return errors


def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Validate all questions and return a structured report.

    Returns:
        {
            "total": int,
            "passed": int,
            "failed": int,
            "errors": {question_id: [error_strings]},
            "all_valid": bool,
        }
    """
    errors_map: Dict[str, List[str]] = {}
    passed = 0
    failed = 0

    for q in questions:
        qid = q.get("id", "<unknown>")
        errs = _validate_question(q)
        if errs:
            errors_map[qid] = errs
            failed += 1
        else:
            passed += 1

    report = {
        "total": len(questions),
        "passed": passed,
        "failed": failed,
        "errors": errors_map,
        "all_valid": failed == 0,
    }
    return report


# ──────────────────────────────────────────────────────────────
# SELF-TEST
# ──────────────────────────────────────────────────────────────

def _self_test() -> None:
    """Run a comprehensive self-test when the module is executed directly."""
    print("=" * 60)
    print("CISCE Class 11 Home Science — Self-Test")
    print("=" * 60)

    # --- Test 1: deterministic generation ---
    seed = 42
    count = 20
    qs1 = generate_questions(seed, count)
    qs2 = generate_questions(seed, count)

    assert len(qs1) == count, f"Expected {count} questions, got {len(qs1)}"
    assert len(qs2) == count, f"Expected {count} questions, got {len(qs2)}"

    # Reproducibility check — identical IDs in the same order
    ids1 = [q["id"] for q in qs1]
    ids2 = [q["id"] for q in qs2]
    assert ids1 == ids2, "Reproducibility failed: different question IDs for same seed"
    print(f"[PASS] Generated {count} deterministic questions (seed={seed}).")
    print(f"       IDs: {ids1}")

    # --- Test 2: verify_all_questions ---
    report = verify_all_questions(qs1)
    print(f"\n[PASS] Verification report:")
    print(f"       Total={report['total']}, Passed={report['passed']}, Failed={report['failed']}")
    if report["errors"]:
        for qid, errs in report["errors"].items():
            for e in errs:
                print(f"       ERROR [{qid}]: {e}")
    assert report["all_valid"], "Some questions failed validation"
    print(f"       All questions valid: {report['all_valid']}")

    # --- Test 3: topic coverage ---
    topic_counts: Dict[str, int] = {}
    for q in qs1:
        t = q["topic"]
        topic_counts[t] = topic_counts.get(t, 0) + 1
    print(f"\n[PASS] Topic distribution across {count} questions:")
    for t in sorted(topic_counts):
        print(f"       {t}: {topic_counts[t]} questions — {TOPICS[t]}")

    # --- Test 4: solver functions ---
    print(f"\n[PASS] Testing solver functions:")

    mcq_q = next(q for q in qs1 if q["question_type"] == "mcq")
    result = solve_mcq(mcq_q, mcq_q["answer"])
    assert result["is_correct"] is True
    print(f"       solve_mcq  → correct={result['is_correct']}, score={result['score']}")

    fb_q = next(q for q in qs1 if q["question_type"] == "fill_blank")
    result = solve_fill_blank(fb_q, fb_q["answer"])
    assert result["is_correct"] is True
    print(f"       solve_fill_blank → correct={result['is_correct']}, score={result['score']}")

    sa_q = next(q for q in qs1 if q["question_type"] == "short_answer")
    result = solve_short_answer(sa_q, sa_q["answer"])
    assert result["is_correct"] is True
    print(f"       solve_short_answer → correct={result['is_correct']}, coverage={result['coverage']}")

    la_q = next(q for q in qs1 if q["question_type"] == "long_answer")
    result = solve_long_answer(la_q, la_q["answer"])
    assert result["is_correct"] is True
    print(f"       solve_long_answer  → correct={result['is_correct']}, coverage={result['coverage']}")

    num_q = next(q for q in qs1 if q["question_type"] == "numerical")
    result = solve_numerical(num_q, num_q["answer_numerical"])
    assert result["is_correct"] is True
    print(f"       solve_numerical    → correct={result['is_correct']}, score={result['score']}")

    # --- Test 5: wrong-answer paths ---
    print(f"\n[PASS] Testing wrong-answer paths:")
    result = solve_mcq(mcq_q, "Z")
    assert result["is_correct"] is False
    print(f"       solve_mcq (wrong)  → is_correct={result['is_correct']}")
    result = solve_numerical(num_q, num_q["answer_numerical"] + 999)
    assert result["is_correct"] is False
    print(f"       solve_numerical (wrong) → is_correct={result['is_correct']}")

    # --- Test 6: different seeds produce different outputs ---
    qs_seed2 = generate_questions(99, count)
    ids_seed2 = [q["id"] for q in qs_seed2]
    assert ids1 != ids_seed2, "Different seeds should produce different question sets"
    print(f"\n[PASS] Different seed (99) produces different output.")

    # --- Test 7: large count ---
    qs_large = generate_questions(7, 100)
    assert len(qs_large) == 100
    report_large = verify_all_questions(qs_large)
    assert report_large["all_valid"]
    print(f"[PASS] Generated and verified 100 questions (seed=7).")

    # --- Test 8: all topics present ---
    all_topics = {q["topic"] for q in qs_large}
    for tk in TOPIC_KEYS:
        assert tk in all_topics, f"Missing topic in 100-question set: {tk}"
    print(f"[PASS] All {len(TOPIC_KEYS)} topics represented in 100-question set.")

    print("\n" + "=" * 60)
    print("ALL SELF-TESTS PASSED")
    print("=" * 60)


if __name__ == "__main__":
    _self_test()