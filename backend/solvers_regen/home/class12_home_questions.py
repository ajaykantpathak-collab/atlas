"""
CISCE Home Science Class 12 - Question Generator
Deterministic, no-LLM, Indian context
"""

import random
import json
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from enum import Enum


class Topic(Enum):
    FOOD_SCIENCE = "food_science"
    NUTRITION = "nutrition"
    CHILD_DEVELOPMENT = "child_development"
    HOUSING = "housing"
    TEXTILES = "textiles"
    COMMUNITY_EXTENSION = "community_extension"


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class BloomLevel(Enum):
    REMEMBER = "remember"
    UNDERSTAND = "understand"
    APPLY = "apply"
    ANALYZE = "analyze"
    EVALUATE = "evaluate"
    CREATE = "create"


class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


@dataclass
class Question:
    topic: str
    question_type: str
    difficulty: str
    bloom_level: str
    question_text: str
    options: List[str] = field(default_factory=list)
    correct_answer: str = ""
    explanation: str = ""
    steps: List[str] = field(default_factory=list)
    competency_tags: List[str] = field(default_factory=list)


# ==================== TOPIC 1: FOOD SCIENCE ====================

def gen_food_science_standard(seed: int) -> List[Question]:
    """Standard questions on Food Science."""
    random.seed(seed)
    questions = []

    # Q1: MCQ on food adulteration
    q = Question(
        topic=Topic.FOOD_SCIENCE.value,
        question_type=QuestionType.MCQ.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="Which of the following is NOT a common adulterant in turmeric powder?",
        options=["Metanil yellow", "Chalk powder", "Lead chromate", "Mustard oil"],
        correct_answer="Mustard oil",
        explanation="Metanil yellow, chalk powder, and lead chromate are adulterants in turmeric. "
                    "Mustard oil is a food product, not an adulterant in turmeric.",
        steps=[
            "Step 1: Recall common adulterants in turmeric powder.",
            "Step 2: Metanil yellow (a dye) is a known adulterant.",
            "Step 3: Chalk powder is added to increase weight.",
            "Step 4: Lead chromate gives an artificial yellow color.",
            "Step 5: Mustard oil is a food item, not used as an adulterant in turmeric.",
            "Hence, the correct answer is Mustard oil."
        ],
        competency_tags=["Food_Adulteration", "Awareness"]
    )
    questions.append(q)

    # Q2: Numerical on food preservation
    q = Question(
        topic=Topic.FOOD_SCIENCE.value,
        question_type=QuestionType.NUMERICAL.value,
        difficulty=Difficulty.MEDIUM.value,
        bloom_level=BloomLevel.APPLY.value,
        question_text="A family in Delhi has 50 kg of mangoes. They want to preserve them by making pickles. "
                      "If each kg of mango yields 0.75 kg of pickle after removing seed and peel, "
                      "how many grams of pickle will they produce from 50 kg of mangoes?",
        correct_answer="37500",
        explanation="Pickle yield = 50 kg * 0.75 = 37.5 kg = 37500 g.",
        steps=[
            "Step 1: Given: Total mangoes = 50 kg.",
            "Step 2: Yield per kg of mango = 0.75 kg pickle.",
            "Step 3: Total pickle = 50 * 0.75 = 37.5 kg.",
            "Step 4: Convert to grams: 37.5 * 1000 = 37500 g.",
            "Answer: 37500 grams."
        ],
        competency_tags=["Food_Preservation", "Numerical_Calculation"]
    )
    questions.append(q)

    # Q3: Fill blank
    q = Question(
        topic=Topic.FOOD_SCIENCE.value,
        question_type=QuestionType.FILL_BLANK.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="The process of heating food at 121 degree C under 15 lbs pressure for 15-20 minutes "
                      "to destroy all microorganisms is called ______.",
        correct_answer="sterilization",
        explanation="Sterilization is the process of destroying all forms of microbial life including "
                    "spores, achieved by heating at 121 degree C under 15 lbs pressure.",
        steps=[
            "Step 1: The question describes a method of food preservation using high temperature and pressure.",
            "Step 2: This method destroys ALL microorganisms including bacterial spores.",
            "Step 3: The term for complete destruction of microorganisms is 'sterilization'.",
            "Answer: sterilization."
        ],
        competency_tags=["Food_Preservation", "Definitions"]
    )
    questions.append(q)

    return questions


def gen_food_science_competency(seed: int) -> List[Question]:
    """Competency-based questions on Food Science."""
    random.seed(seed)
    questions = []

    # Case Study
    q = Question(
        topic=Topic.FOOD_SCIENCE.value,
        question_type=QuestionType.LONG_ANSWER.value,
        difficulty=Difficulty.HARD.value,
        bloom_level=BloomLevel.EVALUATE.value,
        question_text="Mrs. Sharma from Jaipur operates a small-scale papad-making unit at home. "
                      "She produces 200 papads daily and sells them at Rs 0.50 each at the local market. "
                      "Her monthly raw material cost is Rs 1500 for urad dal, spices, and oil. "
                      "She spends Rs 500 per month on packaging and Rs 300 on transportation. "
                      "(a) Calculate her monthly profit. "
                      "(b) If she wants to increase her profit by 40%, what should be her new selling price per papad "
                      "(assume she works 25 days a month)? "
                      "(c) Suggest two value-addition techniques she can adopt to increase demand for her papads.",
        correct_answer="(a) Monthly income = 200 * 0.50 * 25 = Rs 2500. Total cost = 1500 + 500 + 300 = Rs 2300. "
                        "Profit = Rs 200. "
                        "(b) Target profit = 200 * 1.4 = Rs 280. New income needed = 2300 + 280 = Rs 2580. "
                        "New price = 2580 / (200 * 25) = Rs 0.516, so approx Rs 0.52 per papad. "
                        "(c) Value addition: (i) Add millets to make multi-grain papads, (ii) Add flavors like "
                        "jeera, garlic, or methi. (iii) Use attractive eco-friendly packaging with brand name.",
        explanation="This question tests understanding of food business economics and value addition in food processing.",
        steps=[
            "Step 1 (Profit Calculation): Income = 200 papads/day * Rs 0.50 * 25 days = Rs 2500/month.",
            "Step 2: Total cost = Rs 1500 + Rs 500 + Rs 300 = Rs 2300/month.",
            "Step 3: Profit = Income - Cost = 2500 - 2300 = Rs 200/month.",
            "Step 4 (40% Increase): Target profit = 200 * 1.40 = Rs 280.",
            "Step 5: Required income = Cost + Target profit = 2300 + 280 = Rs 2580.",
            "Step 6: New price = 2580 / (200 * 25) = 2580 / 5000 = Rs 0.516 per papad, approx Rs 0.52.",
            "Step 7 (Value Addition): Identify improvements to increase demand and justify higher prices.",
            "Answer: (a) Rs 200, (b) Rs 0.52 per papad, (c) Multi-grain papads, flavored varieties, branding."
        ],
        competency_tags=["Entrepreneurship", "Food_Processing", "Profit_Calculation", "Value_Addition"],
    )
    questions.append(q)

    # Data Interpretation
    q = Question(
        topic=Topic.FOOD_SCIENCE.value,
        question_type=QuestionType.SHORT_ANSWER.value,
        difficulty=Difficulty.MEDIUM.value,
        bloom_level=BloomLevel.ANALYZE.value,
        question_text="The table below shows the nutrient content per 100g of three cooking oils used in Indian households. "
                      "Analyze the data and answer:\n\n"
                      "Oil Type   | Saturated Fat(g) | Monounsaturated Fat(g) | Polyunsaturated Fat(g) | Smoke Point(C)\n"
                      "Coconut    | 90               | 6                      | 2                      | 230\n"
                      "Mustard    | 11               | 52                     | 28                     | 250\n"
                      "Sunflower  | 10               | 20                     | 69                     | 225\n\n"
                      "(a) Which oil is healthiest for regular cooking and why?\n"
                      "(b) Which oil has the highest smoke point? Why does smoke point matter in cooking?",
        correct_answer="(a) Mustard oil is healthiest for regular cooking because it has the lowest saturated fat (11g) "
                        "and a good balance of monounsaturated and polyunsaturated fats, which are heart-healthy. "
                        "(b) Mustard oil has the highest smoke point (250 C). A higher smoke point means the oil "
                        "does not break down into harmful free radicals at high cooking temperatures, making it safer "
                        "for deep frying and high-heat cooking.",
        explanation="Analyzing nutritional data helps make informed choices about cooking oils.",
        steps=[
            "Step 1: Compare saturated fat across oils: Coconut (90g) > Mustard (11g) > Sunflower (10g).",
            "Step 2: Lower saturated fat is healthier for the heart.",
            "Step 3: Mustard oil has balanced MUFA and PUFA.",
            "Step 4: Compare smoke points: Mustard (250 C) > Coconut (230 C) > Sunflower (225 C).",
            "Step 5: Higher smoke point means better stability at cooking temperatures.",
            "Answer: (a) Mustard oil, (b) Mustard oil at 250 C."
        ],
        competency_tags=["Nutrition", "Data_Analysis", "Healthy_Cooking"],
    )
    questions.append(q)

    return questions


# ==================== TOPIC 2: NUTRITION ====================

def gen_nutrition_standard(seed: int) -> List[Question]:
    """Standard questions on Nutrition."""
    random.seed(seed)
    questions = []

    # Q1: MCQ on balanced diet
    q = Question(
        topic=Topic.NUTRITION.value,
        question_type=QuestionType.MCQ.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="The RDA for protein for a sedentary adult woman (weighing 55 kg) is approximately:",
        options=["40 g/day", "50 g/day", "60 g/day", "70 g/day"],
        correct_answer="50 g/day",
        explanation="The RDA for protein for a sedentary adult woman is 1.0 g per kg body weight. "
                    "For a 55 kg woman: 55 * 1.0 = 55 g/day, approximately 50 g/day.",
        steps=[
            "Step 1: RDA for protein = 1.0 g per kg body weight for sedentary adult woman.",
            "Step 2: Weight = 55 kg.",
            "Step 3: Protein needed = 55 * 1.0 = 55 g/day.",
            "Step 4: Closest option is 50 g/day.",
            "Answer: 50 g/day."
        ],
        competency_tags=["RDA", "Protein", "Balanced_Diet"]
    )
    questions.append(q)

    # Q2: Fill blank
    q = Question(
        topic=Topic.NUTRITION.value,
        question_type=QuestionType.FILL_BLANK.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="The vitamin whose deficiency causes bleeding gums and poor wound healing is ______.",
        correct_answer="Vitamin C",
        explanation="Vitamin C (ascorbic acid) deficiency causes scurvy, whose symptoms include "
                    "bleeding gums, easy bruising, and poor wound healing.",
        steps=[
            "Step 1: Recall vitamin deficiency diseases.",
            "Step 2: Bleeding gums = scurvy.",
            "Step 3: Scurvy is caused by Vitamin C deficiency.",
            "Answer: Vitamin C."
        ],
        competency_tags=["Vitamins", "Deficiency_Diseases"]
    )
    questions.append(q)

    # Q3: Numerical - BMI
    q = Question(
        topic=Topic.NUTRITION.value,
        question_type=QuestionType.NUMERICAL.value,
        difficulty=Difficulty.MEDIUM.value,
        bloom_level=BloomLevel.APPLY.value,
        question_text="Calculate the BMI of a 28-year-old woman who weighs 72 kg and has a height of 160 cm. "
                      "Classify her nutritional status and suggest one dietary change she should make.",
        correct_answer="BMI = 72 / (1.60)^2 = 72 / 2.56 = 28.1. Classification: Overweight (Grade I). "
                        "Suggestion: Reduce intake of refined carbohydrates and fats; increase fiber-rich foods "
                        "and physical activity.",
        explanation="BMI = weight(kg) / height(m)^2. A BMI of 25-29.9 is classified as Overweight.",
        steps=[
            "Step 1: Convert height to meters: 160 cm = 1.60 m.",
            "Step 2: BMI formula = weight / (height)^2.",
            "Step 3: BMI = 72 / (1.60 * 1.60) = 72 / 2.56 = 28.125.",
            "Step 4: Round to 28.1.",
            "Step 5: Classification: 25-29.9 = Overweight (Grade I).",
            "Answer: BMI = 28.1, Overweight (Grade I)."
        ],
        competency_tags=["BMI", "Nutritional_Status", "Calculation"]
    )
    questions.append(q)

    return questions


def gen_nutrition_competency(seed: int) -> List[Question]:
    """Competency-based questions on Nutrition."""
    random.seed(seed)
    questions = []

    # Assertion-Reasoning
    q = Question(
        topic=Topic.NUTRITION.value,
        question_type=QuestionType.MCQ.value,
        difficulty=Difficulty.MEDIUM.value,
        bloom_level=BloomLevel.ANALYZE.value,
        question_text="Assertion (A): A pregnant woman in her second trimester needs an additional 300 kcal/day.\n"
                      "Reason (R): The growing fetus requires extra energy for tissue development.\n\n"
                      "Choose the correct option:\n"
                      "1. Both A and R are true and R is the correct explanation of A.\n"
                      "2. Both A and R are true but R is not the correct explanation of A.\n"
                      "3. A is true but R is false.\n"
                      "4. A is false but R is true.",
        options=["Both A and R are true and R is the correct explanation of A",
                 "Both A and R are true but R is not the correct explanation of A",
                 "A is true but R is false",
                 "A is false but R is true"],
        correct_answer="Both A and R are true and R is the correct explanation of A",
        explanation="During the second trimester, the ICMR recommends an additional 300 kcal/day "
                    "(350 kcal in third trimester). The extra calories support fetal growth, increased "
                    "maternal blood volume, and uterine tissue development.",
        steps=[
            "Step 1: Verify Assertion A: ICMR recommends 300 kcal/day extra in 2nd trimester. TRUE.",
            "Step 2: Verify Reason R: Fetal tissue development needs extra energy. TRUE.",
            "Step 3: Check if R explains A: Yes, the extra kcal is specifically for the growing fetus.",
            "Answer: Both A and R are true and R is the correct explanation of A."
        ],
        competency_tags=["Maternal_Nutrition", "Assertion_Reasoning", "ICMR_Guidelines"]
    )
    questions.append(q)

    # Case Study
    q = Question(
        topic=Topic.NUTRITION.value,
        question_type=QuestionType.LONG_ANSWER.value,
        difficulty=Difficulty.HARD.value,
        bloom_level=BloomLevel.CREATE.value,
        question_text="Priya, a 22-year-old software engineer in Bangalore, works from 9 AM to 7 PM. "
                      "She skips breakfast, eats a vada-pav and a cola for lunch, and orders biryani for dinner. "
                      "She drinks 4 cups of coffee daily. She has been experiencing fatigue and frequent headaches. "
                      "(a) Identify THREE nutritional deficiencies she likely has.\n"
                      "(b) Create a ONE-DAY meal plan suitable for her lifestyle, keeping in mind "
                      "her working hours and Indian food preferences.\n"
                      "(c) List TWO lifestyle changes (other than diet) that would improve her overall health.",
        correct_answer="(a) Deficiencies: (i) Iron (skipping breakfast, processed food diet), "
                        "(ii) Fiber (low intake of vegetables/whole grains), (iii) Vitamins B and C "
                        "(excess coffee, no fruits/vegetables). "
                        "(b) Meal Plan: Breakfast - idli with sambar and chutney + 1 fruit. "
                        "Mid-morning - buttermilk or coconut water. Lunch - brown rice + dal + sabzi + salad + curd. "
                        "Evening - roasted chana or sprouts + green tea. Dinner - roti + paneer/egg curry + salad. "
                        "(c) Lifestyle changes: (i) 30 min daily exercise/walking, (ii) 7-8 hours sleep, "
                        "(iii) Reduce coffee to 1-2 cups, (iv) Take breaks from screen every hour.",
        explanation="This question tests understanding of nutritional needs of working adults and ability to create practical solutions.",
        steps=[
            "Step 1: Analyze Priya's current diet pattern.",
            "Step 2: Identify gaps: no breakfast = low energy, vada-pav = refined carbs/fats, no fiber.",
            "Step 3: Cola and excess coffee = no nutrients, caffeine overload.",
            "Step 4: Deficiencies: Iron, Fiber, Vitamins B/C.",
            "Step 5: Design practical meal plan fitting her schedule.",
            "Step 6: Suggest realistic lifestyle changes.",
            "Answer: See correct_answer field."
        ],
        competency_tags=["Nutritional_Assessment", "Meal_Planning", "Lifestyle_Health", "Working_Adults"],
    )
    questions.append(q)

    return questions


# ==================== TOPIC 3: CHILD DEVELOPMENT ====================

def gen_child_dev_standard(seed: int) -> List[Question]:
    """Standard questions on Child Development."""
    random.seed(seed)
    questions = []

    # Q1: MCQ on Piaget
    q = Question(
        topic=Topic.CHILD_DEVELOPMENT.value,
        question_type=QuestionType.MCQ.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="According to Piaget, a child who begins to use logical thinking about concrete objects "
                      "is in which stage of cognitive development?",
        options=["Sensorimotor stage", "Preoperational stage", "Concrete operational stage", "Formal operational stage"],
        correct_answer="Concrete operational stage",
        explanation="The Concrete Operational Stage (ages 7-11 years) is when children develop logical thinking "
                    "about concrete objects and events but still struggle with abstract concepts.",
        steps=[
            "Step 1: Recall Piaget's four stages of cognitive development.",
            "Step 2: Sensorimotor (0-2 yrs): sensory and motor exploration.",
            "Step 3: Preoperational (2-7 yrs): symbolic thinking, egocentrism.",
            "Step 4: Concrete operational (7-11 yrs): logical thinking about concrete objects.",
            "Step 5: Formal operational (11+ yrs): abstract and hypothetical thinking.",
            "Answer: Concrete operational stage."
        ],
        competency_tags=["Piaget", "Cognitive_Development", "Stages"]
    )
    questions.append(q)

    # Q2: Fill blank
    q = Question(
        topic=Topic.CHILD_DEVELOPMENT.value,
        question_type=QuestionType.FILL_BLANK.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="The reflex that helps a newborn baby find the mother's breast is called ______ reflex.",
        correct_answer="rooting",
        explanation="The rooting reflex is an involuntary response where the baby turns its head toward "
                    "a touch on the cheek and opens its mouth to locate the nipple for feeding.",
        steps=[
            "Step 1: Recall newborn reflexes.",
            "Step 2: The reflex for finding the breast involves turning toward touch on the cheek.",
            "Step 3: This is called the 'rooting reflex'.",
            "Answer: rooting."
        ],
        competency_tags=["Infant_Development", "Reflexes", "Newborn"]
    )
    questions.append(q)

    # Q3: Numerical - growth
    q = Question(
        topic=Topic.CHILD_DEVELOPMENT.value,
        question_type=QuestionType.NUMERICAL.value,
        difficulty=Difficulty.MEDIUM.value,
        bloom_level=BloomLevel.APPLY.value,
        question_text="A 5-year-old boy in Mumbai weighs 18 kg and is 108 cm tall. "
                      "According to the ICMR growth standards, the expected weight for his height is 17 kg. "
                      "(a) What is his weight-for-height percentage? "
                      "(b) Classify his nutritional status.",
        correct_answer="(a) Weight-for-height % = (18/17) * 100 = 105.9%. "
                        "(b) Classification: Normal (90-110% = normal; >110% = overweight risk). "
                        "At 105.9%, he is in the normal range but approaching the upper limit.",
        explanation="Weight-for-height percentage is calculated as (actual weight / expected weight) * 100.",
        steps=[
            "Step 1: Actual weight = 18 kg. Expected weight for height = 17 kg.",
            "Step 2: Weight-for-height % = (18 / 17) * 100 = 105.88%.",
            "Step 3: Round to 105.9%.",
            "Step 4: Classification criteria: <70% = Severe undernutrition, 70-80% = Moderate, 80-90% = Mild, "
                     "90-110% = Normal, >110% = Overweight risk.",
            "Step 5: 105.9% falls in the normal range.",
            "Answer: (a) 105.9%, (b) Normal."
        ],
        competency_tags=["Growth_Monitoring", "ICMR_Standards", "Child_Nutrition"]
    )
    questions.append(q)

    return questions


def gen_child_dev_competency(seed: int) -> List[Question]:
    """Competency-based questions on Child Development."""
    random.seed(seed)
    questions = []

    # Case Study - Parenting
    q = Question(
        topic=Topic.CHILD_DEVELOPMENT.value,
        question_type=QuestionType.LONG_ANSWER.value,
        difficulty=Difficulty.HARD.value,
        bloom_level=BloomLevel.EVALUATE.value,
        question_text="Rahul is a 3-year-old boy living in Pune. His mother works as a teacher and leaves for work at 8 AM. "
                      "Rahul stays with his grandmother during the day. He is not enrolled in any playschool. "
                      "When his mother returns at 7 PM, Rahul clings to her and does not want to play with toys. "
                      "He speaks only a few words and does not interact with other children in the apartment complex. "
                      "(a) Identify TWO developmental milestones that Rahul may be missing for his age group.\n"
                      "(b) Explain why enrolling Rahul in a playschool or creche would benefit his development.\n"
                      "(c) Suggest THREE activities his grandmother can do at home to promote his language and social development.",
        correct_answer="(a) Missing milestones: (i) Language - should be using 3-4 word sentences, (ii) Social - "
                        "should engage in parallel play and interact with peers. "
                        "(b) Playschool benefits: Structured environment promotes social skills through peer interaction, "
                        "trained caregivers use age-appropriate activities for cognitive development, "
                        "routine helps emotional regulation. "
                        "(c) Activities: (i) Storytelling with picture books to develop vocabulary, "
                        "(ii) Singing nursery rhymes and action songs, "
                        "(iii) Playing simple group games with neighborhood children.",
        explanation="This question assesses understanding of early childhood development and the role of "
                    "caregivers and early education.",
        steps=[
            "Step 1: Identify Rahul's age group: 3 years (36-48 months).",
            "Step 2: List expected milestones for 3-year-olds: language (4-5 word sentences), social (peer play).",
            "Step 3: Compare with Rahul's behavior: few words, no peer interaction.",
            "Step 4: Identify the role of playschool/creche in early childhood.",
            "Step 5: Suggest practical activities for home-based development.",
            "Answer: See correct_answer field."
        ],
        competency_tags=["Early_Childhood", "Milestones", "Parenting", "Social_Development"],
    )
    questions.append(q)

    return questions


# ==================== TOPIC 4: HOUSING ====================

def gen_housing_standard(seed: int) -> List[Question]:
    """Standard questions on Housing and Resource Management."""
    random.seed(seed)
    questions = []

    # Q1: MCQ
    q = Question(
        topic=Topic.HOUSING.value,
        question_type=QuestionType.MCQ.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="The government housing scheme that provides pucca houses to all eligible rural households "
                      "by 2024 is called:",
        options=["Indira Awaas Yojana", "Pradhan Mantri Awas Yojana (Gramin)", "Jawaharlal Nehru National Urban Renewal Mission",
                 "Rajiv Awaas Yojana"],
        correct_answer="Pradhan Mantri Awas Yojana (Gramin)",
        explanation="PMAY-G (Pradhan Mantri Awas Yojana - Gramin) aims to provide pucca housing with basic "
                    "amenities to all rural households by 2024, replacing the earlier IAY.",
        steps=[
            "Step 1: Recall Government of India housing schemes.",
            "Step 2: IAY was the earlier scheme for rural housing.",
            "Step 3: PMAY-G is the current scheme targeting housing for all by 2024.",
            "Step 4: JNNURM and Rajiv Awaas Yojana are urban-focused.",
            "Answer: Pradhan Mantri Awas Yojana (Gramin)."
        ],
        competency_tags=["Housing_Schemes", "Government_Policies"]
    )
    questions.append(q)

    # Q2: Numerical
    q = Question(
        topic=Topic.HOUSING.value,
        question_type=QuestionType.NUMERICAL.value,
        difficulty=Difficulty.MEDIUM.value,
        bloom_level=BloomLevel.APPLY.value,
        question_text="The Kumar family in Agra has a monthly income of Rs 35,000. "
                      "They spend 30% on rent, 15% on food, 10% on education, 8% on transportation, "
                      "5% on utilities, and 20% on miscellaneous expenses. "
                      "(a) Calculate their monthly savings. "
                      "(b) What percentage of their income is saved? "
                      "(c) According to the 50-30-20 budgeting rule, are they saving enough? Justify.",
        correct_answer="(a) Expenses = 30+15+10+8+5+20 = 88%. Savings = 35,000 * 0.12 = Rs 4,200. "
                        "(b) Savings % = 12%. "
                        "(c) 50-30-20 rule suggests 20% savings. They save only 12%, so they are NOT saving enough. "
                        "They should reduce miscellaneous expenses to increase savings.",
        explanation="The 50-30-20 rule allocates 50% to needs, 30% to wants, and 20% to savings.",
        steps=[
            "Step 1: Calculate total expenditure percentage: 30+15+10+8+5+20 = 88%.",
            "Step 2: Monthly income = Rs 35,000.",
            "Step 3: Savings = 35,000 * (1 - 0.88) = 35,000 * 0.12 = Rs 4,200.",
            "Step 4: Savings percentage = 12%.",
            "Step 5: 50-30-20 rule recommends 20% savings.",
            "Step 6: 12% < 20%, so they are not saving enough.",
            "Answer: (a) Rs 4,200, (b) 12%, (c) No, not saving enough per 50-30-20 rule."
        ],
        competency_tags=["Budgeting", "Family_Finance", "Resource_Management"]
    )
    questions.append(q)

    # Q3: Fill blank
    q = Question(
        topic=Topic.HOUSING.value,
        question_type=QuestionType.FILL_BLANK.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="The minimum recommended floor area per person in a rural house according to national housing standards is ______ square meters.",
        correct_answer="9",
        explanation="According to the National Building Code and housing standards, the minimum floor area "
                    "recommended per person in rural housing is 9 sq.m.",
        steps=[
            "Step 1: Recall national housing standards.",
            "Step 2: Minimum floor area per person in rural housing = 9 sq.m.",
            "Answer: 9."
        ],
        competency_tags=["Housing_Standards", "Definitions"]
    )
    questions.append(q)

    return questions


def gen_housing_competency(seed: int) -> List[Question]:
    """Competency-based questions on Housing."""
    random.seed(seed)
    questions = []

    # Case Study
    q = Question(
        topic=Topic.HOUSING.value,
        question_type=QuestionType.LONG_ANSWER.value,
        difficulty=Difficulty.HARD.value,
        bloom_level=BloomLevel.EVALUATE.value,
        question_text="The Desai family of five (parents and three children aged 8, 12, and 16) "
                      "lives in a 40 sq.m one-room house in a slum in Mumbai. The room has one window. "
                      "There is no separate kitchen or bathroom. They share a community toilet with 20 other families. "
                      "The monsoon season causes water seepage in the walls. "
                      "(a) Identify THREE health hazards in their current living conditions.\n"
                      "(b) Suggest TWO government schemes they could apply for to improve their housing situation.\n"
                      "(c) Design a basic ventilation improvement plan for their house that is affordable (under Rs 5,000).",
        correct_answer="(a) Health hazards: (i) Damp walls cause respiratory problems and mold growth, "
                        "(ii) Shared toilet leads to poor sanitation and waterborne diseases, "
                        "(iii) Inadequate ventilation increases indoor air pollution and spread of infections. "
                        "(b) Schemes: (i) Pradhan Mantri Awas Yojana (Urban) - affordable housing, "
                        "(ii) Swachh Bharat Mission - individual household toilets. "
                        "(c) Ventilation plan: (i) Install an exhaust fan in the window (Rs 1500), "
                        "(ii) Add jali/ventilation panels on the upper portion of one wall (Rs 2000), "
                        "(iii) Use light-colored paint to reflect heat (Rs 800), "
                        "(iv) Keep interior doors open during the day for cross-ventilation (free).",
        explanation="This question evaluates understanding of housing conditions, health implications, "
                    "and practical solutions within resource constraints.",
        steps=[
            "Step 1: Analyze living conditions: overcrowding, dampness, poor sanitation.",
            "Step 2: Link conditions to health hazards.",
            "Step 3: Identify relevant government housing schemes.",
            "Step 4: Design affordable ventilation improvements.",
            "Answer: See correct_answer field."
        ],
        competency_tags=["Housing_Health", "Slum_Improvement", "Government_Schemes", "Problem_Solving"],
    )
    questions.append(q)

    return questions


# ==================== TOPIC 5: TEXTILES ====================

def gen_textiles_standard(seed: int) -> List[Question]:
    """Standard questions on Textiles and Clothing."""
    random.seed(seed)
    questions = []

    # Q1: MCQ
    q = Question(
        topic=Topic.TEXTILES.value,
        question_type=QuestionType.MCQ.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="Which of the following fibers is a protein fiber?",
        options=["Cotton", "Silk", "Rayon", "Nylon"],
        correct_answer="Silk",
        explanation="Silk is a protein fiber obtained from the cocoon of the silkworm Bombyx mori. "
                    "It is composed of fibroin protein. Cotton is cellulose, rayon is regenerated cellulose, "
                    "and nylon is synthetic polyamide.",
        steps=[
            "Step 1: Recall classification of textile fibers.",
            "Step 2: Protein fibers: Silk and Wool.",
            "Step 3: Cellulosic fibers: Cotton, Rayon, Linen.",
            "Step 4: Synthetic: Nylon, Polyester, Acrylic.",
            "Answer: Silk."
        ],
        competency_tags=["Textile_Fibers", "Classification"]
    )
    questions.append(q)

    # Q2: Numerical - fabric cost
    q = Question(
        topic=Topic.TEXTILES.value,
        question_type=QuestionType.NUMERICAL.value,
        difficulty=Difficulty.MEDIUM.value,
        bloom_level=BloomLevel.APPLY.value,
        question_text="Kavya wants to stitch a salwar kameez. The fabric she chose costs Rs 450 per meter. "
                      "The total fabric required is 3.5 meters. She also needs 2 meters of lining at Rs 150 per meter. "
                      "The tailoring charges are Rs 800. If she pays 5% GST on the total material cost, "
                      "what is the total cost of the outfit?",
        correct_answer="Material cost = (3.5 * 450) + (2 * 150) = 1575 + 300 = Rs 1875. "
                        "GST = 5% of 1875 = Rs 93.75. "
                        "Total cost = 1875 + 93.75 + 800 = Rs 2768.75.",
        explanation="Total cost includes fabric cost + lining cost + GST + tailoring charges.",
        steps=[
            "Step 1: Fabric cost = 3.5 m * Rs 450/m = Rs 1575.",
            "Step 2: Lining cost = 2 m * Rs 150/m = Rs 300.",
            "Step 3: Total material cost = 1575 + 300 = Rs 1875.",
            "Step 4: GST = 5% of 1875 = 0.05 * 1875 = Rs 93.75.",
            "Step 5: Total cost = 1875 + 93.75 + 800 = Rs 2768.75.",
            "Answer: Rs 2768.75."
        ],
        competency_tags=["Fabric_Cost", "GST", "Dressmaking"]
    )
    questions.append(q)

    # Q3: Fill blank
    q = Question(
        topic=Topic.TEXTILES.value,
        question_type=QuestionType.FILL_BLANK.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="The finish applied to cotton fabric to give it a smooth, glossy appearance "
                      "and improve its texture is called ______ finish.",
        correct_answer="calendering",
        explanation="Calendering is a mechanical finish where fabric is passed between heated rollers "
                    "under pressure to produce a smooth, glossy, and compact surface.",
        steps=[
            "Step 1: Recall textile finishing processes.",
            "Step 2: The process using rollers to create smooth glossy surface is calendering.",
            "Answer: calendering."
        ],
        competency_tags=["Textile_Finishes", "Fabric_Treatment"]
    )
    questions.append(q)

    return questions


def gen_textiles_competency(seed: int) -> List[Question]:
    """Competency-based questions on Textiles."""
    random.seed(seed)
    questions = []

    # Decision Making Case
    q = Question(
        topic=Topic.TEXTILES.value,
        question_type=QuestionType.SHORT_ANSWER.value,
        difficulty=Difficulty.MEDIUM.value,
        bloom_level=BloomLevel.EVALUATE.value,
        question_text="Meera, a college student in Chennai, needs to buy fabric for a saree she will wear to her sister's wedding. "
                          "The wedding is in June and the venue is an outdoor garden with temperatures around 38 degree C. "
                          "She has a budget of Rs 3000. The options she is considering are:\n"
                          "(i) Pure Cotton saree - Rs 2500, lightweight, breathable, needs frequent ironing\n"
                          "(ii) Cotton-Silk blend - Rs 2800, elegant drape, moderate maintenance\n"
                          "(iii) Synthetic georgette - Rs 1800, colorful prints, heavy but looks good\n\n"
                          "Which fabric should Meera choose and why? Consider the weather, occasion, "
                          "comfort during a 4-hour outdoor event, and her budget.",
        correct_answer="Meera should choose the Cotton-Silk blend saree (Rs 2800). "
                        "Reasons: (1) June outdoor wedding at 38 C requires breathable fabric - pure cotton is best "
                        "but georgette is too heavy and non-breathable. (2) Cotton-silk blend offers the elegance "
                        "needed for a wedding while being relatively comfortable. (3) It is within her Rs 3000 budget. "
                        "(4) Moderate maintenance is manageable for a one-time event.",
        explanation="This question tests fabric selection based on occasion, climate, and budget constraints.",
        steps=[
            "Step 1: Analyze the occasion: wedding, outdoor, formal.",
            "Step 2: Consider climate: 38 C in June = hot, humid outdoor setting.",
            "Step 3: Evaluate each option: Cotton (comfortable but may look too casual), "
                     "Cotton-Silk (elegant + comfortable), Georgette (hot, heavy).",
            "Step 4: Check budget: All options under Rs 3000.",
            "Step 5: Select Cotton-Silk blend as best compromise.",
            "Answer: Cotton-Silk blend."
        ],
        competency_tags=["Fabric_Selection", "Decision_Making", "Consumer_Education"],
    )
    questions.append(q)

    return questions


# ==================== TOPIC 6: COMMUNITY EXTENSION ====================

def gen_community_standard(seed: int) -> List[Question]:
    """Standard questions on Community and Extension Education."""
    random.seed(seed)
    questions = []

    # Q1: MCQ
    q = Question(
        topic=Topic.COMMUNITY_EXTENSION.value,
        question_type=QuestionType.MCQ.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="The process of sharing information and skills to bring about desired changes in the community is called:",
        options=["Social work", "Extension education", "Community development", "Public health"],
        correct_answer="Extension education",
        explanation="Extension education is the process of creating learning situations that help people "
                    "acquire useful knowledge, attitudes, and skills to bring about desirable changes in their behavior.",
        steps=[
            "Step 1: Recall definition of extension education.",
            "Step 2: Extension education = sharing information/skills for community change.",
            "Answer: Extension education."
        ],
        competency_tags=["Extension_Education", "Definitions"]
    )
    questions.append(q)

    # Q2: Fill blank
    q = Question(
        topic=Topic.COMMUNITY_EXTENSION.value,
        question_type=QuestionType.FILL_BLANK.value,
        difficulty=Difficulty.EASY.value,
        bloom_level=BloomLevel.REMEMBER.value,
        question_text="The national nutrition program that provides hot cooked meals to preschool children "
                      "at Anganwadi centers is called ______.",
        correct_answer="ICDS" or "Integrated Child Development Services",
        explanation="ICDS (Integrated Child Development Services) is India's flagship program for child development, "
                    "providing supplementary nutrition, immunization, health check-ups, and pre-school education.",
        steps=[
            "Step 1: Recall national nutrition programs for children.",
            "Step 2: ICDS provides hot meals at Anganwadi centers.",
            "Answer: ICDS (Integrated Child Development Services)."
        ],
        competency_tags=["Nutrition_Programs", "ICDS", "Government_Schemes"]
    )
    questions.append(q)

    # Q3: Numerical
    q = Question(
        topic=Topic.COMMUNITY_EXTENSION.value,
        question_type=QuestionType.NUMERICAL.value,
        difficulty=Difficulty.MEDIUM.value,
        bloom_level=BloomLevel.APPLY.value,
        question_text="An extension worker is conducting a nutrition education program in a village in Bihar. "
                      "The village has 200 households. She visits 10 households per day. "
                      "(a) How many days will it take her to cover all households? "
                      "(b) If she can only work 4 days per week, how many weeks will the program take? "
                      "(c) If she wants to complete it in 4 weeks, how many households must she visit per day?",
        correct_answer="(a) Days = 200 / 10 = 20 days. "
                        "(b) Weeks = 20 / 4 = 5 weeks. "
                        "(c) Households per day = 200 / (4 * 4) = 200 / 16 = 12.5, so 13 households per day.",
        explanation="Basic arithmetic applied to extension program planning.",
        steps=[
            "Step 1: Total households = 200, rate = 10/day.",
            "Step 2: Days needed = 200 / 10 = 20 days.",
            "Step 3: At 4 days/week: Weeks = 20 / 4 = 5 weeks.",
            "Step 4: For 4 weeks (16 working days): 200 / 16 = 12.5, round up to 13 households/day.",
            "Answer: (a) 20 days, (b) 5 weeks, (c) 13 households/day."
        ],
        competency_tags=["Extension_Planning", "Program_Scheduling"]
    )
    questions.append(q)

    return questions


def gen_community_competency(seed: int) -> List[Question]:
    """Competency-based questions on Community Extension."""
    random.seed(seed)
    questions = []

    # Program Planning
    q = Question(
        topic=Topic.COMMUNITY_EXTENSION.value,
        question_type=QuestionType.LONG_ANSWER.value,
        difficulty=Difficulty.HARD.value,
        bloom_level=BloomLevel.CREATE.value,
        question_text="As a Home Science extension worker in a tribal village in Odisha, you have observed that:\n"
                      "- 60% of children under 5 are underweight\n"
                      "- Most families eat only rice and one vegetable per day\n"
                      "- Women do not know about nutritional requirements during pregnancy\n"
                      "- The village has an Anganwadi center but it is underutilized\n\n"
                      "Design a community nutrition intervention program for this village. Include:\n"
                      "(a) Program objectives (minimum 3)\n"
                      "(b) Target group\n"
                      "(c) Three key activities/methods you would use\n"
                      "(d) How you would involve the Anganwadi worker (AWW) and community leaders\n"
                      "(e) One way to measure the success of your program after 6 months",
        correct_answer="(a) Objectives: (1) Reduce underweight children under 5 by 20% in 6 months, "
                        "(2) Increase dietary diversity in 70% of households, (3) Improve knowledge of "
                        "maternal nutrition among 80% of pregnant women. "
                        "(b) Target group: Pregnant women, mothers of children under 5, Anganwadi workers. "
                        "(c) Activities: (1) Weekly cooking demonstrations using locally available nutritious foods "
                        "(like ragi, drumstick, green leafy vegetables), (2) Monthly growth monitoring camps for children, "
                        "(3) Home visits to counsel pregnant women. "
                        "(d) Involve AWW: She can conduct growth monitoring, distribute supplementary food, "
                        "and mobilize mothers. Involve leaders: Get sarpanch to support, use self-help groups. "
                        "(e) Success measure: Re-measure weight of children under 5 after 6 months and compare "
                        "with baseline data to check for improvement.",
        explanation="This question tests program planning skills in community nutrition extension.",
        steps=[
            "Step 1: Analyze the situation in the village.",
            "Step 2: Set SMART objectives for the program.",
            "Step 3: Identify target beneficiaries.",
            "Step 4: Plan activities appropriate for a tribal/rural setting.",
            "Step 5: Plan community involvement strategies.",
            "Step 6: Define measurable outcomes.",
            "Answer: See correct_answer field."
        ],
        competency_tags=["Program_Planning", "Community_Nutrition", "Extension_Methods", "Program_Evaluation"],
    )
    questions.append(q)

    return questions


# ==================== MIXED REVIEW QUESTIONS ====================

def gen_mixed_review(seed: int) -> List[Question]:
    """Mixed review questions spanning multiple topics."""
    random.seed(seed)
    questions = []

    topics_pool = [
        (Topic.FOOD_SCIENCE.value, "fertilizer", "pesticide"),
        (Topic.NUTRITION.value, "calcium", "iron"),
        (Topic.CHILD_DEVELOPMENT.value, "motor", "language"),
        (Topic.HOUSING.value, "ventilation", "lighting"),
        (Topic.TEXTILES.value, "weave", "dye"),
    ]

    # Integration question
    q = Question(
        topic="integrated",
        question_type=QuestionType.LONG_ANSWER.value,
        difficulty=Difficulty.HARD.value,
        bloom_level=BloomLevel.ANALYZE.value,
        question_text="The National Family Health Survey (NFHS-5) data for India shows that:\n"
                      "- 35% of children under 5 are stunted\n"
                      "- 57% of women aged 15-49 are anemic\n"
                      "- Only 11% of children 6-23 months receive an adequate diet\n"
                      "(a) Analyze how poor housing conditions (overcrowding, poor sanitation) "
                      "contribute to these nutritional problems.\n"
                      "(b) Suggest how Home Science professionals can contribute to addressing these issues "
                      "at the community level.",
        correct_answer="(a) Overcrowding increases infection spread, reducing nutrient absorption. "
                        "Poor sanitation causes diarrheal diseases, leading to malnutrition and stunting. "
                        "Unsafe drinking water causes intestinal worms. (b) Home Science professionals can: "
                        "(1) Conduct nutrition education programs for mothers, (2) Promote kitchen gardens "
                        "for dietary diversity, (3) Advocate for sanitation improvements, "
                        "(4) Train community health workers on nutrition counseling.",
        explanation="This integrates knowledge from Nutrition, Housing, and Community Extension.",
        steps=[
            "Step 1: Understand NFHS-5 data indicators.",
            "Step 2: Link housing conditions to nutrition outcomes.",
            "Step 3: Identify role of Home Science professionals.",
            "Step 4: Suggest practical intervention strategies.",
            "Answer: See correct_answer field."
        ],
        competency_tags=["NFHS", "Integrated_Approach", "Community_Health", "Analysis"],
    )
    questions.append(q)

    return questions


# ==================== MAIN GENERATOR ====================

def generate_questions(seed: int = 42, count: int = 10, topic: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Generate practice questions for CISCE Home Science Class 12.

    Args:
        seed: Random seed for reproducibility.
        count: Number of questions to generate.
        topic: Optional topic filter (string from Topic enum values).

    Returns:
        List of question dictionaries.
    """
    random.seed(seed)

    all_questions = []

    # Define generators
    topic_generators = {
        Topic.FOOD_SCIENCE.value: (gen_food_science_standard, gen_food_science_competency),
        Topic.NUTRITION.value: (gen_nutrition_standard, gen_nutrition_competency),
        Topic.CHILD_DEVELOPMENT.value: (gen_child_dev_standard, gen_child_dev_competency),
        Topic.HOUSING.value: (gen_housing_standard, gen_housing_competency),
        Topic.TEXTILES.value: (gen_textiles_standard, gen_textiles_competency),
        Topic.COMMUNITY_EXTENSION.value: (gen_community_standard, gen_community_competency),
    }

    if topic:
        if topic not in topic_generators:
            raise ValueError(f"Unknown topic: {topic}. Available: {list(topic_generators.keys())}")
        std_fn, comp_fn = topic_generators[topic]
        all_questions.extend(std_fn(seed))
        all_questions.extend(comp_fn(seed + 100))
    else:
        # Generate from ALL topics
        for t, (std_fn, comp_fn) in topic_generators.items():
            all_questions.extend(std_fn(seed + hash(t) % 1000))
            all_questions.extend(comp_fn(seed + 100 + hash(t) % 1000))

    # Add mixed review questions
    all_questions.extend(gen_mixed_review(seed + 9999))

    # Shuffle deterministically
    rng = random.Random(seed)
    rng.shuffle(all_questions)

    # Select requested count
    selected = all_questions[:count]

    # Convert to dicts
    result = []
    for i, q in enumerate(selected):
        result.append({
            "id": i + 1,
            "topic": q.topic,
            "question_type": q.question_type,
            "difficulty": q.difficulty,
            "bloom_level": q.bloom_level,
            "question_text": q.question_text,
            "options": q.options,
            "correct_answer": q.correct_answer,
            "explanation": q.explanation,
            "steps": q.steps,
            "competency_tags": q.competency_tags,
        })

    return result


def print_question(q: Dict[str, Any], index: int) -> None:
    """Pretty-print a single question."""
    print("=" * 70)
    print(f"QUESTION {index}  |  Topic: {q['topic']}")
    print(f"Type: {q['question_type'].upper()}  |  Difficulty: {q['difficulty']}  |  Bloom: {q['bloom_level']}")
    print(f"Competency Tags: {', '.join(q['competency_tags'])}")
    print("=" * 70)
    print()
    print(q["question_text"])
    print()

    if q["options"]:
        for j, opt in enumerate(q["options"], 1):
            print(f"   ({j}) {opt}")
        print()

    print(f"CORRECT ANSWER: {q['correct_answer']}")
    print()
    print("EXPLANATION:")
    print(q["explanation"])
    print()
    print("STEP-BY-STEP SOLUTION:")
    for step in q["steps"]:
        print(f"  {step}")
    print()
    print()


def generate_mcq_only(seed: int = 42, count: int = 10, topic: Optional[str] = None) -> List[Dict[str, Any]]:
    """Generate only MCQ questions."""
    all_q = generate_questions(seed, count * 3, topic)
    mcqs = [q for q in all_q if q["question_type"] == QuestionType.MCQ.value]
    return mcqs[:count]


def generate_numerical_only(seed: int = 42, count: int = 10, topic: Optional[str] = None) -> List[Dict[str, Any]]:
    """Generate only numerical questions."""
    all_q = generate_questions(seed, count * 3, topic)
    nums = [q for q in all_q if q["question_type"] == QuestionType.NUMERICAL.value]
    return nums[:count]


def generate_by_difficulty(seed: int, difficulty: str, count: int = 10, topic: Optional[str] = None) -> List[Dict[str, Any]]:
    """Generate questions filtered by difficulty level."""
    all_q = generate_questions(seed, count * 4, topic)
    filtered = [q for q in all_q if q["difficulty"] == difficulty]
    return filtered[:count]


def get_topic_statistics(seed: int = 42) -> Dict[str, Dict[str, int]]:
    """Get statistics on available questions per topic."""
    all_q = generate_questions(seed, 100)
    stats = {}
    for q in all_q:
        t = q["topic"]
        if t not in stats:
            stats[t] = {"total": 0, "mcq": 0, "fill_blank": 0, "short_answer": 0,
                        "long_answer": 0, "numerical": 0, "easy": 0, "medium": 0, "hard": 0}
        stats[t]["total"] += 1
        stats[t][q["question_type"]] = stats[t].get(q["question_type"], 0) + 1
        stats[t][q["difficulty"]] = stats[t].get(q["difficulty"], 0) + 1
    return stats


def main() -> None:
    """Demonstrate the question generator."""
    print("=" * 70)
    print("  CISCE Home Science Class 12 - Question Generator")
    print("  Deterministic | No LLM | Indian Context")
    print("=" * 70)
    print()

    # Demo 1: Generate 5 mixed questions
    print("=" * 70)
    print("  DEMO 1: 5 Mixed Questions (All Topics)")
    print("=" * 70)
    print()

    questions = generate_questions(seed=42, count=5)
    for i, q in enumerate(questions, 1):
        print_question(q, i)

    # Demo 2: Generate 3 Nutrition questions
    print("=" * 70)
    print("  DEMO 2: 3 Questions from Nutrition Topic")
    print("=" * 70)
    print()

    questions = generate_questions(seed=100, count=3, topic=Topic.NUTRITION.value)
    for i, q in enumerate(questions, 1):
        print_question(q, i)

    # Demo 3: Generate 3 Medium difficulty questions
    print("=" * 70)
    print("  DEMO 3: 3 Medium Difficulty Questions")
    print("=" * 70)
    print()

    questions = generate_by_difficulty(seed=200, difficulty="medium", count=3)
    for i, q in enumerate(questions, 1):
        print_question(q, i)

    # Demo 4: Topic Statistics
    print("=" * 70)
    print("  DEMO 4: Topic Statistics")
    print("=" * 70)
    print()

    stats = get_topic_statistics(seed=42)
    for topic, data in stats.items():
        print(f"  {topic.upper()}:")
        print(f"    Total questions: {data['total']}")
        print(f"    MCQ: {data.get('mcq', 0)} | Fill-blank: {data.get('fill_blank', 0)} | "
              f"Short-answer: {data.get('short_answer', 0)} | Long-answer: {data.get('long_answer', 0)} | "
              f"Numerical: {data.get('numerical', 0)}")
        print(f"    Easy: {data.get('easy', 0)} | Medium: {data.get('medium', 0)} | Hard: {data.get('hard', 0)}")
        print()

    # Demo 5: Deterministic reproducibility check
    print("=" * 70)
    print("  DEMO 5: Reproducibility Check (same seed = same questions)")
    print("=" * 70)
    print()

    run1 = generate_questions(seed=999, count=3)
    run2 = generate_questions(seed=999, count=3)

    match = True
    for i in range(len(run1)):
        if run1[i]["question_text"] != run2[i]["question_text"]:
            match = False
            break

    print(f"  Run 1 first question: {run1[0]['question_text'][:80]}...")
    print(f"  Run 2 first question: {run2[0]['question_text'][:80]}...")
    print(f"  Questions match: {match}")
    print()

    # Demo 6: JSON output sample
    print("=" * 70)
    print("  DEMO 6: JSON Output Sample (1 question)")
    print("=" * 70)
    print()
    sample = generate_questions(seed=55, count=1)
    print(json.dumps(sample[0], indent=2, ensure_ascii=True))
    print()

    print("=" * 70)
    print("  Generation Complete!")
    print("  Topics covered: Food Science, Nutrition, Child Development,")
    print("                   Housing, Textiles, Community Extension")
    print("  Question types: MCQ, Fill-blank, Short-answer, Long-answer, Numerical")
    print("  All questions use Indian context and are curriculum-aligned.")
    print("=" * 70)


if __name__ == "__main__":
    main()