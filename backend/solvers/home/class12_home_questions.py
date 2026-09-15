"""
CISCE Class 12 Home Science - Deterministic Question Generator and Solver
Syllabus: c12_home_001 through c12_home_010 (ISC Home Science)
"""

import random
import hashlib
import re
from typing import Dict, List, Any, Optional, Callable

# ──────────────────────────────────────────────
#  Syllabus Topic Registry
# ──────────────────────────────────────────────
TOPIC_INFO: Dict[str, str] = {
    "c12_home_001": "Family and Home Management",
    "c12_home_002": "Child Development and Guidance",
    "c12_home_003": "Housing and its Equipment",
    "c12_home_004": "Food Science and Nutrition",
    "c12_home_005": "Meal Planning and Dietary Management",
    "c12_home_006": "Textiles and Apparel",
    "c12_home_007": "Consumer Education and Protection",
    "c12_home_008": "Health and Hygiene",
    "c12_home_009": "Environmental Studies and Sustainable Living",
    "c12_home_010": "Career Opportunities in Home Science",
}

# ──────────────────────────────────────────────
#  Question-Bank Templates (question_id_key -> template)
#  Each template is a dict carrying:
#    qtype, difficulty, question_text (with {n} placeholders),
#    options (list for MCQ), answer, solution
# ──────────────────────────────────────────────
_BANK: Dict[str, Dict[str, Any]] = {
    # ── Family & Home Management ──────────────────────
    "fam_001": {
        "topic": "c12_home_001",
        "qtype": "mcq",
        "difficulty": 0.2,
        "question_text": "Which of the following is a primary need of a family?",
        "options": ["Luxury car", "Food and shelter", "Vacation trip", "Designer clothes"],
        "answer": "Food and shelter",
        "solution": "Primary needs are essential for survival: food, shelter, clothing, and safety. "
                     "Luxury items and vacations are secondary needs.",
    },
    "fam_002": {
        "topic": "c12_home_001",
        "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "The process of deciding how to use resources to achieve family goals is called:",
        "options": ["Family budgeting", "Family management", "Family planning", "Family welfare"],
        "answer": "Family management",
        "solution": "Family management involves planning, organising, directing, and controlling "
                     "family resources to achieve desired goals.",
    },
    "fam_003": {
        "topic": "c12_home_001",
        "qtype": "fill_blank",
        "difficulty": 0.3,
        "question_text": "The process of assigning monetary value to family resources and expenses is called ______.",
        "answer": "budgeting",
        "solution": "Budgeting is the process of estimating income and planning expenditures "
                     "to control spending within the family.",
    },
    "fam_004": {
        "topic": "c12_home_001",
        "qtype": "short_answer",
        "difficulty": 0.4,
        "question_text": "Differentiate between a need and a want with one example each.",
        "answer": "A need is essential for survival (e.g., food, shelter), while a want is a desire "
                   "that is not essential (e.g., a smartphone, branded clothing). Needs must be "
                   "satisfied first, whereas wants can be postponed.",
        "solution": "Key differences: Needs are basic requirements essential for survival. "
                     "Wants are desires beyond basic needs. Needs have no substitutes; wants do.",
    },
    "fam_005": {
        "topic": "c12_home_001",
        "qtype": "mcq",
        "difficulty": 0.5,
        "question_text": "Which resource is NOT one of the traditional categories of family resources?",
        "options": ["Human resources", "Material resources", "Natural resources", "Community resources"],
        "answer": "Natural resources",
        "solution": "Traditional categories are: Human resources (skills, time, energy), "
                     "Material resources (money, possessions), and Community resources "
                     "(schools, hospitals, libraries).",
    },
    "fam_006": {
        "topic": "c12_home_001",
        "qtype": "short_answer",
        "difficulty": 0.6,
        "question_text": "What is the importance of time management in family management? Give two points.",
        "answer": "1) Helps complete tasks efficiently and reduces stress. 2) Allows time for "
                   "self-development, recreation, and family bonding, maintaining work-life balance.",
        "solution": "Time management involves planning and exercising conscious control over time "
                     "spent on activities. It increases productivity and quality of life.",
    },
    "fam_007": {
        "topic": "c12_home_001",
        "qtype": "long_answer",
        "difficulty": 0.7,
        "question_text": "Explain the steps involved in effective family management. Illustrate with examples.",
        "answer": "Steps: (1) Setting goals – define short-term and long-term family objectives. "
                   "(2) Assessing resources – identify human, material, and community resources. "
                   "(3) Planning – decide courses of action to achieve goals. "
                   "(4) Implementing – carry out the plan. (5) Evaluating – assess outcomes and "
                   "make adjustments. Example: For planning a family vacation, set the destination "
                   "(goal), check budget and time (resources), plan itinerary (plan), book tickets "
                   "(implement), and review the trip (evaluate).",
        "solution": "Effective family management follows a systematic process. Each step builds "
                     "on the previous one. Setting clear goals provides direction. Resource "
                     "assessment ensures feasibility. Planning outlines the approach. "
                     "Implementation puts the plan into action. Evaluation ensures continuous "
                     "improvement.",
    },

    # ── Child Development ─────────────────────────────
    "cdg_001": {
        "topic": "c12_home_002",
        "qtype": "mcq",
        "difficulty": 0.2,
        "question_text": "The period from birth to 2 years is called the:",
        "options": ["Early childhood", "Infancy", "Late childhood", "Adolescence"],
        "answer": "Infancy",
        "solution": "Infancy spans from birth to approximately 2 years. It is a period of rapid "
                     "physical, cognitive, and emotional development.",
    },
    "cdg_002": {
        "topic": "c12_home_002",
        "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "According to Jean Piaget, the stage of cognitive development from 2 to 7 years is called:",
        "options": ["Sensorimotor stage", "Pre-operational stage", "Concrete operational stage",
                    "Formal operational stage"],
        "answer": "Pre-operational stage",
        "solution": "Piaget's four stages: Sensorimotor (0-2), Pre-operational (2-7), "
                     "Concrete operational (7-11), and Formal operational (11+).",
    },
    "cdg_003": {
        "topic": "c12_home_002",
        "qtype": "fill_blank",
        "difficulty": 0.3,
        "question_text": "The process by which a child learns the norms, values, and behaviours of "
                         "their society is called ______.",
        "answer": "socialisation",
        "solution": "Socialisation is the lifelong process through which individuals learn and "
                     "internalise the norms, values, beliefs, and behaviours of their society.",
    },
    "cdg_004": {
        "topic": "c12_home_002",
        "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "Which of the following is a characteristic of adolescence?",
        "options": ["Slow physical growth", "Identity formation", "Dependency on parents",
                    "Concrete thinking only"],
        "answer": "Identity formation",
        "solution": "Adolescence (10-19 years) is marked by identity formation, rapid physical "
                     "changes (puberty), and development of abstract thinking.",
    },
    "cdg_005": {
        "topic": "c12_home_002",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "What is the role of the family in child guidance? Mention two methods.",
        "answer": "The family provides emotional security and models appropriate behaviour. "
                   "Two methods: (1) Positive reinforcement – praising good behaviour. "
                   "(2) Setting consistent rules and boundaries with explanations.",
        "solution": "Family is the primary agent of socialisation. Guidance methods include "
                     "reward, punishment, modelling, and reasoning.",
    },
    "cdg_006": {
        "topic": "c12_home_002",
        "qtype": "long_answer",
        "difficulty": 0.8,
        "question_text": "Discuss the physical, cognitive, and socio-emotional milestones of a child "
                          "between 6 and 12 years.",
        "answer": "Physical: steady growth, improved motor coordination, loss of baby teeth, "
                   "development of permanent teeth. Cognitive: concrete logical thinking, improved "
                   "memory and attention span, ability to classify objects (Piaget's concrete "
                   "operational stage). Socio-emotional: development of self-concept, peer group "
                   "becomes important, understanding of rules and fairness, development of industry "
                   "vs inferiority (Erikson).",
        "solution": "Middle childhood (6-12 years) is a crucial developmental period marked by "
                     "steady physical growth, logical thinking about concrete events, and growing "
                     "social awareness outside the family.",
    },

    # ── Housing & Equipment ──────────────────────────
    "hou_001": {
        "topic": "c12_home_003",
        "qtype": "mcq",
        "difficulty": 0.2,
        "question_text": "Which of the following is a component of a good housing plan?",
        "options": ["Decorative walls only", "Ventilation and lighting", "Expensive flooring only",
                    "Unnecessary space"],
        "answer": "Ventilation and lighting",
        "solution": "A good housing plan considers ventilation, lighting, space utilisation, "
                     "sanitation, safety, and accessibility along with aesthetics.",
    },
    "hou_002": {
        "topic": "c12_home_003",
        "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "The kitchen equipment that operates on electricity and does not produce "
                          "direct heat is called:",
        "options": ["Electrical equipment", "Mechanical equipment", "Fuel-based equipment",
                    "Hand-operated equipment"],
        "answer": "Electrical equipment",
        "solution": "Electrical equipment runs on electricity (e.g., mixer, refrigerator, "
                     "microwave). Mechanical equipment uses manual or mechanical force.",
    },
    "hou_003": {
        "topic": "c12_home_003",
        "qtype": "fill_blank",
        "difficulty": 0.3,
        "question_text": "The type of lighting that uses natural sunlight to illuminate interiors is "
                          "called ______.",
        "answer": "daylighting",
        "solution": "Daylighting is the practice of placing windows, skylights, or other "
                     "openings to allow natural light to illuminate indoor spaces.",
    },
    "hou_004": {
        "topic": "c12_home_003",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "List three factors to consider while selecting kitchen equipment.",
        "answer": "1) Durability and material (stainless steel is preferred). 2) Ease of cleaning "
                   "and maintenance. 3) Energy efficiency and safety features.",
        "solution": "Other factors include: size and storage requirements, frequency of use, "
                     "cost-effectiveness, and availability of spare parts.",
    },
    "hou_005": {
        "topic": "c12_home_003",
        "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "Which of the following is the most ergonomic height for a kitchen counter "
                          "in an Indian household?",
        "options": ["60 cm", "80-85 cm", "100 cm", "120 cm"],
        "answer": "80-85 cm",
        "solution": "An ergonomic kitchen counter height of 80-85 cm reduces strain on the back "
                     "and shoulders during food preparation tasks.",
    },
    "hou_006": {
        "topic": "c12_home_003",
        "qtype": "long_answer",
        "difficulty": 0.7,
        "question_text": "Explain the principles of kitchen planning with reference to the work triangle.",
        "answer": "The work triangle connects the three main work centres: cooking area (stove), "
                   "washing area (sink), and storage area (refrigerator). Principles: (1) Total "
                   "distance between the three points should be between 3.5 to 6.5 metres. "
                   "(2) No leg of the triangle should be less than 1.2 metres or more than 2.7 "
                   "metres. (3) The triangle should not be obstructed by appliances or furniture. "
                   "This layout minimises movement and increases efficiency.",
        "solution": "The work triangle concept was developed by the Kitchen Planning Association "
                     "to minimise walking distance and effort during meal preparation.",
    },

    # ── Food Science & Nutrition ──────────────────────
    "fsn_001": {
        "topic": "c12_home_004",
        "qtype": "mcq",
        "difficulty": 0.2,
        "question_text": "Which nutrient is the body's primary source of energy?",
        "options": ["Proteins", "Carbohydrates", "Vitamins", "Minerals"],
        "answer": "Carbohydrates",
        "solution": "Carbohydrates provide 4 kcal/g and are the body's preferred and most "
                     "readily available source of energy.",
    },
    "fsn_002": {
        "topic": "c12_home_004",
        "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "Deficiency of vitamin A leads to:",
        "options": ["Beri-beri", "Night blindness", "Scurvy", "Anaemia"],
        "answer": "Night blindness",
        "solution": "Vitamin A deficiency causes night blindness (nyctalopia). Beri-beri is "
                     "caused by thiamine (B1) deficiency, scurvy by vitamin C deficiency.",
    },
    "fsn_003": {
        "topic": "c12_home_004",
        "qtype": "fill_blank",
        "difficulty": 0.3,
        "question_text": "The process by which green plants manufacture their own food using "
                          "sunlight is called ______.",
        "answer": "photosynthesis",
        "solution": "Photosynthesis is the process in which plants use sunlight, carbon dioxide, "
                     "and water to produce glucose and oxygen.",
    },
    "fsn_004": {
        "topic": "c12_home_004",
        "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "Which cooking method uses the minimum amount of fat?",
        "options": ["Deep frying", "Shallow frying", "Steaming", "Sautéing"],
        "answer": "Steaming",
        "solution": "Steaming cooks food using steam without added fat, making it one of the "
                     "healthiest cooking methods.",
    },
    "fsn_005": {
        "topic": "c12_home_004",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "What is the difference between pasteurisation and sterilisation?",
        "answer": "Pasteurisation (e.g., of milk) kills pathogenic microorganisms at 72°C for "
                   "15 seconds, while sterilisation kills all microorganisms including spores at "
                   "higher temperatures (e.g., 121°C) for a longer time. Pasteurised milk needs "
                   "refrigeration; sterilised milk can be stored longer.",
        "solution": "Pasteurisation reduces microbial load; sterilisation eliminates all "
                     "microbial life. UHT (Ultra High Temperature) treatment is a form of "
                     "commercial sterilisation.",
    },
    "fsn_006": {
        "topic": "c12_home_004",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "Name the vitamin lost maximum when rice is polished.",
        "answer": "Vitamin B1 (Thiamine)",
        "solution": "Polishing removes the outer bran and germ layers of rice which are rich in "
                     "thiamine. Thiamine deficiency causes beriberi. Parboiling helps retain "
                     "nutrients.",
    },
    "fsn_007": {
        "topic": "c12_home_004",
        "qtype": "long_answer",
        "difficulty": 0.8,
        "question_text": "Explain the effects of cooking on the nutritive value of food. "
                          "Give two examples for each macronutrient.",
        "answer": "Carbohydrates: Gelatinisation of starch makes it digestible (e.g., cooking "
                   "potatoes). Overcooking may cause breakdown of simple sugars. Proteins: Heat "
                   "denatures proteins making them more digestible (e.g., cooking egg/meat), "
                   "but excessive heat destroys some amino acids. Fats: Prolonged heating can "
                   "cause oxidation and rancidity, reducing nutritive value. Water-soluble "
                   "vitamins (B and C) are destroyed by heat; fat-soluble vitamins (A, D, E, "
                   "K) are more heat-stable.",
        "solution": "Cooking improves digestibility and destroys anti-nutritional factors "
                     "(e.g., trypsin inhibitors in pulses) but can cause loss of heat-sensitive "
                     "nutrients.",
    },
    "fsn_008": {
        "topic": "c12_home_004",
        "qtype": "numerical",
        "difficulty": 0.7,
        "question_text": "Calculate the total energy (in kcal) provided by a meal containing: "
                          "60 g carbohydrates, 25 g proteins, and 20 g fats. "
                          "(Carbs: 4 kcal/g, Proteins: 4 kcal/g, Fats: 9 kcal/g)",
        "answer": "372 kcal",
        "solution": "Energy from carbohydrates = 60 × 4 = 240 kcal. "
                     "Energy from proteins = 25 × 4 = 100 kcal. "
                     "Energy from fats = 20 × 9 = 180 kcal. "
                     "Total = 240 + 100 + 180 = 520 kcal.",
    },

    # ── Meal Planning ────────────────────────────────
    "mpl_001": {
        "topic": "c12_home_005",
        "qtype": "mcq",
        "difficulty": 0.2,
        "question_text": "Which of the following is NOT a principle of meal planning?",
        "options": ["Nutrient adequacy", "Balance and variety", "Expensive ingredients",
                    "Economy and acceptability"],
        "answer": "Expensive ingredients",
        "solution": "Principles of meal planning: nutrient adequacy, balance, variety, energy "
                     "balance, and economy. Using expensive ingredients is NOT a principle.",
    },
    "mpl_002": {
        "topic": "c12_home_005",
        "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "The Recommended Dietary Allowance (RDA) for protein for an adult male is:",
        "options": ["30 g/day", "50 g/day", "60 g/day", "90 g/day"],
        "answer": "60 g/day",
        "solution": "ICMR RDA: Adult male – 60 g/day protein. Adult female – 55 g/day. "
                     "Pregnant women – 71 g/day.",
    },
    "mpl_003": {
        "topic": "c12_home_005",
        "qtype": "fill_blank",
        "difficulty": 0.3,
        "question_text": "The amount of a nutrient required daily to prevent deficiency diseases "
                          "is called the ______.",
        "answer": "recommended dietary allowance (RDA)",
        "solution": "RDA is the average daily dietary intake level sufficient to meet the "
                     "nutrient requirements of nearly all healthy individuals in a group.",
    },
    "mpl_004": {
        "topic": "c12_home_005",
        "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "A diet that provides all essential nutrients in required amounts is called:",
        "options": ["Balanced diet", "Deficient diet", "Excess diet", "Fad diet"],
        "answer": "Balanced diet",
        "solution": "A balanced diet contains all essential nutrients (carbohydrates, proteins, "
                     "fats, vitamins, minerals) in proper proportions to meet body requirements.",
    },
    "mpl_005": {
        "topic": "c12_home_005",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "What are the five food groups in a balanced diet? Give one example food from each.",
        "answer": "1) Cereals & millets (rice), 2) Pulses & legumes (lentils), 3) Vegetables & "
                   "fruits (spinach/apple), 4) Milk & milk products (curd), 5) Fats, sugars "
                   "& nuts (groundnuts/sugar).",
        "solution": "A balanced diet includes foods from all five groups to provide "
                     "carbohydrates, proteins, vitamins, minerals, and fats.",
    },
    "mpl_006": {
        "topic": "c12_home_005",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "List three special considerations for planning a meal for a pregnant woman.",
        "answer": "1) Increased protein (71 g/day) and iron intake. 2) Adequate calcium (1200 mg/day). "
                   "3) Extra calories (~300 kcal/day in 2nd/3rd trimester). 4) Folic acid "
                   "supplementation. 5) Small, frequent meals to manage nausea.",
        "solution": "Pregnancy requires additional nutrients to support foetal development and "
                     "maternal health. Meal plans should be nutrient-dense and varied.",
    },
    "mpl_007": {
        "topic": "c12_home_005",
        "qtype": "long_answer",
        "difficulty": 0.75,
        "question_text": "Plan a balanced day's menu for an adolescent girl (14 years) and justify "
                          "your choices based on nutritional requirements.",
        "answer": "Breakfast: Poha with peanuts + milk + banana. "
                   "Mid-morning: Sprouted moong chaat + lemon water. "
                   "Lunch: Chapatti + dal + mixed vegetable curry + curd + salad. "
                   "Snack: Peanut chikki + buttermilk. "
                   "Dinner: Vegetable pulao + raita + papad. "
                   "Justification: High iron for menstrual needs (green leafy veg, jaggery), "
                   "calcium for bone growth (curd, milk), proteins for tissue growth (dal, "
                   "peanuts), and adequate calories for growth spurt.",
        "solution": "Adolescents need extra energy, protein, calcium, and iron. Meals should "
                     "be appealing, varied, and timed around school schedules.",
    },

    # ── Textiles ──────────────────────────────────────
    "txl_001": {
        "topic": "c12_home_006",
        "qtype": "mcq",
        "difficulty": 0.2,
        "question_text": "Which fibre is a natural protein fibre?",
        "options": ["Cotton", "Silk", "Nylon", "Rayon"],
        "answer": "Silk",
        "solution": "Silk is a natural protein fibre produced by silkworms. Cotton is a "
                     "natural cellulose fibre. Nylon and rayon are synthetic.",
    },
    "txl_002": {
        "topic": "c12_home_006",
        "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "The process of removing colour from fabric using chemicals is called:",
        "options": ["Dyeing", "Printing", "Bleaching", "Calendering"],
        "answer": "Bleaching",
        "solution": "Bleaching removes natural colour and impurities from fabric. Dyeing adds "
                     "colour, printing adds patterns, and calendering adds a smooth finish.",
    },
    "txl_003": {
        "topic": "c12_home_006",
        "qtype": "fill_blank",
        "difficulty": 0.3,
        "question_text": "The type of weave in which two or more sets of yarns are interlaced at "
                          "right angles is called ______ weaving.",
        "answer": "plain",
        "solution": "Plain weave is the simplest and most common weave, where weft yarn passes "
                     "over and under alternate warp yarns.",
    },
    "txl_004": {
        "topic": "c12_home_006",
        "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "Which finish makes cotton fabrics wrinkle-resistant?",
        "options": ["Mercerisation", "Resin finishing", "Calendering", "Schreiner finish"],
        "answer": "Resin finishing",
        "solution": "Resin finishing (using DMDHEU resin) cross-links cellulose molecules, "
                     "making cotton wrinkle-resistant and dimensionally stable.",
    },
    "txl_005": {
        "topic": "c12_home_006",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "Differentiate between handloom and powerloom fabrics with two points each.",
        "answer": "Handloom: (1) Woven manually by skilled artisans, (2) Unique designs with "
                   "slight irregularities, (3) Eco-friendly, (4) Higher cost. Powerloom: "
                   "(1) Woven mechanically, (2) Uniform patterns, (3) Mass-produced, "
                   "(4) Lower cost.",
        "solution": "Handloom fabrics represent India's rich textile heritage and support "
                     "traditional craftsmanship. Powerloom fabrics cater to mass markets.",
    },
    "txl_006": {
        "topic": "c12_home_006",
        "qtype": "long_answer",
        "difficulty": 0.7,
        "question_text": "Explain the characteristics and uses of three major natural fibres: "
                          "cotton, wool, and silk.",
        "answer": "Cotton: Cellulose fibre, absorbent, durable, easy to care for. Used in "
                   "clothing, home furnishing. Wool: Protein fibre, warm, elastic, resistant "
                   "to wrinkles. Used in winter clothing, blankets. Silk: Protein fibre, "
                   "lustrous, strong, good drape. Used in formal wear, ties, sarees. Each "
                   "fibre has distinct properties determining its end-use.",
        "solution": "Natural fibres differ in chemical composition (cellulose vs protein), "
                     "physical properties, and care requirements. Cotton is most versatile, "
                     "wool provides insulation, silk offers luxury.",
    },

    # ── Consumer Education ────────────────────────────
    "cet_001": {
        "topic": "c12_home_007",
        "qtype": "mcq",
        "difficulty": 0.2,
        "question_text": "Which of the following is a consumer right under the Consumer Protection Act?",
        "options": ["Right to bargain only", "Right to be informed", "Right to be deceived",
                    "Right to pay extra"],
        "answer": "Right to be informed",
        "solution": "The six consumer rights are: Right to safety, Right to be informed, Right "
                     "to choose, Right to be heard, Right to seek redressal, Right to consumer "
                     "education.",
    },
    "cet_002": {
        "topic": "c12_home_007",
        "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "The Bureau of Indian Standards (BIS) mark on a product certifies:",
        "options": ["Lowest price guarantee", "Quality and safety standards compliance",
                    "Import approval", "Organic certification only"],
        "answer": "Quality and safety standards compliance",
        "solution": "The ISI mark (now BIS) certifies that a product meets specified quality "
                     "and safety standards laid down by the Bureau of Indian Standards.",
    },
    "cet_003": {
        "topic": "c12_home_007",
        "qtype": "fill_blank",
        "difficulty": 0.3,
        "question_text": "The law that protects consumers from unfair trade practices in India "
                          "is the ______ Act, 1986 (amended 2019).",
        "answer": "consumer protection",
        "solution": "The Consumer Protection Act was enacted in 1986 and replaced by the "
                     "Consumer Protection Act, 2019, providing enhanced consumer rights.",
    },
    "cet_004": {
        "topic": "c12_home_007",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "What is meant by 'labelling' of a product? Give two mandatory label items.",
        "answer": "Labelling provides information about the product on its packaging. Mandatory "
                   "items: (1) Name and address of manufacturer, (2) Date of manufacture and "
                   "expiry date, (3) Net quantity, (4) Maximum retail price (MRP), "
                   "(5) Batch number.",
        "solution": "Labelling is governed by the Legal Metrology (Packaged Commodities) Rules, "
                     "2011, and FSSAI regulations for food products.",
    },
    "cet_005": {
        "topic": "c12_home_007",
        "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "Which symbol indicates that a food product is vegetarian in India?",
        "options": ["Green dot", "Brown dot", "Red circle", "Blue square"],
        "answer": "Green dot",
        "solution": "A green dot inside a green square indicates vegetarian food. A brown "
                     "dot inside a brown square indicates non-vegetarian food, as per FSSAI.",
    },
    "cet_006": {
        "topic": "c12_home_007",
        "qtype": "long_answer",
        "difficulty": 0.75,
        "question_text": "Discuss the precautions a consumer should take while purchasing "
                          "packed food items.",
        "answer": "Precautions: (1) Check expiry/best-before date. (2) Look for ISI/BIS/FSSAI "
                   "mark. (3) Read the ingredient list for allergens. (4) Check nutritional "
                   "information per serving. (5) Inspect packaging for damage or tampering. "
                   "(6) Compare MRP and quantity for value. (7) Verify batch number for "
                   "traceability. (8) Store as per instructions.",
        "solution": "Informed consumers protect themselves from adulterated, misbranded, or "
                     "substandard products. Reading labels carefully is a key consumer skill.",
    },

    # ── Health & Hygiene ──────────────────────────────
    "hlh_001": {
        "topic": "c12_home_008",
        "qtype": "mcq",
        "difficulty": 0.2,
        "question_text": "Which of the following is a communicable disease?",
        "options": ["Diabetes", "Tuberculosis", "Cancer", "Hypertension"],
        "answer": "Tuberculosis",
        "solution": "Tuberculosis is a communicable (infectious) disease caused by Mycobacterium "
                     "tuberculosis. Diabetes, cancer, and hypertension are non-communicable.",
    },
    "hlh_002": {
        "topic": "c12_home_008",
        "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "The mode of transmission for water-borne diseases like cholera is:",
        "options": ["Airborne", "Vector-borne", "Faeco-oral route", "Bloodborne"],
        "answer": "Faeco-oral route",
        "solution": "Cholera and other water-borne diseases spread through the faeco-oral route "
                     "when contaminated water or food is consumed.",
    },
    "hlh_003": {
        "topic": "c12_home_008",
        "qtype": "fill_blank",
        "difficulty": 0.3,
        "question_text": "The type of immunity a baby receives from its mother through the placenta "
                          "and breast milk is called ______ immunity.",
        "answer": "passive",
        "solution": "Passive immunity is acquired from another source (mother) rather than "
                     "produced by one's own immune system. It provides temporary protection.",
    },
    "hlh_004": {
        "topic": "c12_home_008",
        "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "Which vaccine is given at birth as part of India's Universal Immunisation Programme?",
        "options": ["DPT", "BCG", "Measles", "Hepatitis B"],
        "answer": "BCG",
        "solution": "BCG (Bacillus Calmette-Guérin) is administered at birth for tuberculosis "
                     "protection. OPV and Hepatitis B are also given at birth under UIP.",
    },
    "hlh_005": {
        "topic": "c12_home_008",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "List four methods of solid waste disposal.",
        "answer": "1) Landfills – burying waste in designated areas. 2) Composting – "
                   "biodegradation into manure. 3) Incineration – burning at high temperatures. "
                   "4) Recycling – converting waste into new materials.",
        "solution": "Proper waste disposal prevents environmental pollution and disease spread. "
                     "Segregation at source is the first step.",
    },
    "hlh_006": {
        "topic": "c12_home_008",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "What is the role of WHO? Name one of its programmes.",
        "answer": "WHO (World Health Organization) is a UN specialised agency for international "
                   "public health. It sets norms and standards, provides technical support, "
                   "and monitors health trends. Programme: Expanded Programme on Immunisation "
                   "(EPI), or Global Polio Eradication Initiative.",
        "solution": "WHO was established on 7 April 1948. It is headquartered in Geneva, "
                     "Switzerland. World Health Day is observed on 7 April.",
    },
    "hlh_007": {
        "topic": "c12_home_008",
        "qtype": "long_answer",
        "difficulty": 0.75,
        "question_text": "Describe the principles and methods of first aid for common emergencies: "
                          "cuts/burns and fainting.",
        "answer": "For cuts: (1) Wash hands, (2) Apply direct pressure with clean cloth, "
                   "(3) Rinse wound under running water, (4) Apply antiseptic, (5) Cover with "
                   "sterile dressing. For burns: (1) Cool the burn under running water for 10 "
                   "minutes, (2) Cover with clean non-stick cloth, (3) Do NOT apply ice, "
                   "butter, or ointments. For fainting: (1) Lay the person flat, (2) Elevate "
                   "legs, (3) Loosen tight clothing, (4) Check breathing, (5) Do NOT give "
                   "anything by mouth until fully conscious.",
        "solution": "First aid is immediate care given to a victim before medical help arrives. "
                     "The priority is always to preserve life, prevent further harm, and "
                     "promote recovery.",
    },

    # ── Environmental Studies ────────────────────────
    "env_001": {
        "topic": "c12_home_009",
        "qtype": "mcq",
        "difficulty": 0.2,
        "question_text": "Which gas is the main contributor to the greenhouse effect?",
        "options": ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        "answer": "Carbon dioxide",
        "solution": "Carbon dioxide (CO2) is the primary greenhouse gas responsible for global "
                     "warming and climate change.",
    },
    "env_002": {
        "topic": "c12_home_009",
        "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "Which of the following is a biodegradable waste?",
        "options": ["Plastic", "Glass", "Vegetable peels", "E-waste"],
        "answer": "Vegetable peels",
        "solution": "Biodegradable waste decomposes naturally (vegetable peels, paper, food "
                     "scraps). Plastics, glass, and e-waste are non-biodegradable.",
    },
    "env_003": {
        "topic": "c12_home_009",
        "qtype": "fill_blank",
        "difficulty": 0.3,
        "question_text": "The process of converting waste materials into new materials and "
                          "objects is called ______.",
        "answer": "recycling",
        "solution": "Recycling is a key component of waste management and reduces consumption "
                     "of fresh raw materials, energy usage, and pollution.",
    },
    "env_004": {
        "topic": "c12_home_009",
        "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "World Environment Day is observed on:",
        "options": ["5th June", "22nd April", "2nd October", "21st March"],
        "answer": "5th June",
        "solution": "World Environment Day is observed on 5th June. Earth Day is on 22nd April. "
                     "World Forestry Day is on 21st March.",
    },
    "env_005": {
        "topic": "c12_home_009",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "Define 'sustainable development' and mention one of its goals.",
        "answer": "Sustainable development is development that meets the needs of the present "
                   "without compromising the ability of future generations to meet their own needs. "
                   "Goal example: SDG 2 – Zero Hunger, or SDG 6 – Clean Water and Sanitation.",
        "solution": "The concept was defined in the Brundtland Report (1987). The UN adopted "
                     "17 Sustainable Development Goals (SDGs) in 2015.",
    },
    "env_006": {
        "topic": "c12_home_009",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "What is rainwater harvesting? Mention one benefit.",
        "answer": "Rainwater harvesting is the collection and storage of rainwater for future "
                   "use. Benefits: (1) Recharges groundwater, (2) Reduces water scarcity, "
                   "(3) Decreases flooding, (4) Improves groundwater quality.",
        "solution": "Methods include rooftop harvesting, check dams, and percolation pits. "
                     "It is promoted under the Jal Shakti Abhiyan in India.",
    },
    "env_007": {
        "topic": "c12_home_009",
        "qtype": "long_answer",
        "difficulty": 0.75,
        "question_text": "Explain the causes and effects of water pollution. Suggest two measures "
                          "to control it at the domestic level.",
        "answer": "Causes: Industrial effluents, sewage discharge, agricultural runoff "
                   "(pesticides/fertilisers), oil spills. Effects: Waterborne diseases "
                   "(cholera, typhoid), destruction of aquatic life, bioaccumulation of toxins "
                   "in food chains, eutrophication. Domestic measures: (1) Do not pour "
                   "chemicals/detergents down drains. (2) Use eco-friendly cleaning products. "
                   "(3) Fix leaky taps to prevent wastage. (4) Compost kitchen waste instead "
                   "of using chemical fertilisers.",
        "solution": "Water pollution is a major environmental concern. The Central Pollution "
                     "Control Board (CPCB) monitors water quality in India under the Water "
                     "(Prevention and Control of Pollution) Act, 1974.",
    },

    # ── Career Opportunities ──────────────────────────
    "car_001": {
        "topic": "c12_home_010",
        "qtype": "mcq",
        "difficulty": 0.2,
        "question_text": "Which of the following is a career option in Home Science?",
        "options": ["Software engineer", "Dietitian/Nutritionist", "Pilot", "Mechanic"],
        "answer": "Dietitian/Nutritionist",
        "solution": "Home Science careers include: Dietitian/Nutritionist, Interior designer, "
                     "Textile designer, Child development specialist, Food technologist, "
                     "Fashion designer, and Family counsellor.",
    },
    "car_002": {
        "topic": "c12_home_010",
        "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "To become a dietitian, one typically needs a degree in:",
        "options": ["Engineering", "Home Science / Nutrition and Dietetics",
                    "Commerce", "Law"],
        "answer": "Home Science / Nutrition and Dietetics",
        "solution": "A B.Sc. in Home Science with specialisation in Nutrition and Dietetics, "
                     "or a dedicated B.Sc. in Nutrition and Dietetics, qualifies one as a "
                     "dietitian.",
    },
    "car_003": {
        "topic": "c12_home_010",
        "qtype": "fill_blank",
        "difficulty": 0.3,
        "question_text": "The professional who designs and plans interior spaces for homes and "
                          "commercial buildings is called an ______ designer.",
        "answer": "interior",
        "solution": "Interior designers plan and create functional, safe, and aesthetically "
                     "pleasing interior spaces. They need knowledge of design principles, "
                     "colour theory, and materials.",
    },
    "car_004": {
        "topic": "c12_home_010",
        "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "A professional who counsels families on relationship issues and child "
                          "rearing practices is called a:",
        "options": ["Financial advisor", "Family counsellor", "Legal advisor",
                    "Career counsellor"],
        "answer": "Family counsellor",
        "solution": "Family counsellors help families resolve conflicts, improve communication, "
                     "and strengthen relationships. They may specialise in marriage, parenting, "
                     "or child development.",
    },
    "car_005": {
        "topic": "c12_home_010",
        "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "List three employment opportunities available in the field of textiles.",
        "answer": "1) Textile designer in fashion houses. 2) Quality control officer in textile "
                   "manufacturing units. 3) Textile conservator in museums. 4) Fashion "
                   "merchandiser. 5) Entrepreneur in handloom/ handicraft.",
        "solution": "The textile industry offers diverse career paths from creative (design) "
                     "to technical (production) to commercial (merchandising) roles.",
    },
    "car_006": {
        "topic": "c12_home_010",
        "qtype": "long_answer",
        "difficulty": 0.7,
        "question_text": "Discuss the role of a food technologist and the skills required "
                          "for this career.",
        "answer": "A food technologist develops and improves food products, ensures food safety "
                   "and quality, and oversees food processing operations. Skills required: "
                   "(1) Knowledge of food chemistry and microbiology. (2) Understanding of food "
                   "processing technologies. (3) Analytical and problem-solving skills. "
                   "(4) Attention to detail and quality standards. (5) Regulatory knowledge "
                   "(FSSAI, HACCP). Career settings include food industries, research "
                   "laboratories, government food safety departments.",
        "solution": "Food technology is a rapidly growing field with opportunities in "
                     "R&D, quality assurance, production management, and entrepreneurship.",
    },
}

# Extend the bank with additional entries to reach adequate coverage
# ── Additional Family Management questions ──────────
_EXTRA_FAM = [
    {
        "key": "fam_008", "topic": "c12_home_001", "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "Which of the following is a material family resource?",
        "options": ["Education", "Time", "Money", "Skills"],
        "answer": "Money",
        "solution": "Material resources include money, house, furniture, appliances, and "
                     "clothing. Skills are human resources.",
    },
    {
        "key": "fam_009", "topic": "c12_home_001", "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "What is a family budget? Why is it important?",
        "answer": "A family budget is a plan for spending income over a specific period. "
                   "It helps control expenses, save money, and allocate funds for priorities. "
                   "It prevents overspending and ensures financial stability.",
        "solution": "A budget records expected income and planned expenditure, providing a "
                     "framework for financial decision-making.",
    },
    {
        "key": "fam_010", "topic": "c12_home_001", "qtype": "long_answer",
        "difficulty": 0.65,
        "question_text": "Explain the factors influencing family management decisions.",
        "answer": "Factors: (1) Socio-economic status – income level affects choices. "
                   "(2) Family size and composition – needs vary. (3) Cultural and religious "
                   "values – influence food, clothing, celebrations. (4) Education level – "
                   "awareness of modern practices. (5) Available resources – human, material, "
                   "community. (6) Government policies – subsidies, welfare schemes.",
        "solution": "Family management decisions are complex and influenced by multiple "
                     "interacting factors at the individual, family, and societal levels.",
    },
]

_EXTRA_CDG = [
    {
        "key": "cdg_007", "topic": "c12_home_002", "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "Erik Erikson's stage for early childhood (3-5 years) focuses on:",
        "options": ["Trust vs Mistrust", "Autonomy vs Shame and Doubt",
                    "Initiative vs Guilt", "Industry vs Inferiority"],
        "answer": "Initiative vs Guilt",
        "solution": "Erikson's stages: Infancy (Trust vs Mistrust), Toddler (Autonomy vs "
                     "Shame), Early childhood (Initiative vs Guilt), School age (Industry vs "
                     "Inferiority).",
    },
    {
        "key": "cdg_008", "topic": "c12_home_002", "qtype": "fill_blank",
        "difficulty": 0.4,
        "question_text": "The period between ages 10 and 19 years is known as ______.",
        "answer": "adolescence",
        "solution": "WHO defines adolescence as the period between 10 and 19 years. It is a "
                     "critical developmental phase between childhood and adulthood.",
    },
    {
        "key": "cdg_009", "topic": "c12_home_002", "qtype": "short_answer",
        "difficulty": 0.55,
        "question_text": "What is meant by 'developmental milestones'? Give two examples for infants.",
        "answer": "Developmental milestones are skills most children achieve by a certain age. "
                   "Infant examples: (1) By 6 months – sits without support, rolls over. "
                   "(2) By 12 months – first words, first steps. Monitoring milestones helps "
                   "identify developmental delays.",
        "solution": "Milestones cover motor, language, social, and cognitive domains. "
                     "Deviations may indicate developmental disorders.",
    },
]

_EXTRA_HOU = [
    {
        "key": "hou_007", "topic": "c12_home_003", "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "The ideal slope for a roof in a rainfall-prone area should be:",
        "options": ["Flat", "Slightly sloped", "Steeply sloped", "Underground"],
        "answer": "Steeply sloped",
        "solution": "A steep roof slope allows rainwater to drain quickly, preventing "
                     "leakage and water damage.",
    },
    {
        "key": "hou_008", "topic": "c12_home_003", "qtype": "fill_blank",
        "difficulty": 0.4,
        "question_text": "The safe material used for kitchen countertops that resists heat "
                          "and stains is ______.",
        "answer": "granite",
        "solution": "Granite is a popular kitchen countertop material due to its durability, "
                     "heat resistance, and stain resistance when sealed.",
    },
    {
        "key": "hou_009", "topic": "c12_home_003", "qtype": "short_answer",
        "difficulty": 0.55,
        "question_text": "What are the considerations for lighting in a kitchen?",
        "answer": "1) Task lighting over work surfaces (under-cabinet lights). "
                   "2) General/ambient lighting for overall illumination. "
                   "3) Natural daylighting through windows. "
                   "4) LED lights are energy-efficient and produce less heat.",
        "solution": "Good kitchen lighting combines natural and artificial sources to ensure "
                     "safety and comfort during food preparation.",
    },
]

_EXTRA_FSN = [
    {
        "key": "fsn_009", "topic": "c12_home_004", "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "Which mineral is essential for the formation of haemoglobin?",
        "options": ["Calcium", "Iron", "Sodium", "Potassium"],
        "answer": "Iron",
        "solution": "Iron is a key component of haemoglobin in red blood cells, which carries "
                     "oxygen throughout the body.",
    },
    {
        "key": "fsn_010", "topic": "c12_home_004", "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "Which of the following is a fat-soluble vitamin?",
        "options": ["Vitamin C", "Vitamin B1", "Vitamin D", "Folic acid"],
        "answer": "Vitamin D",
        "solution": "Fat-soluble vitamins (A, D, E, K) are stored in body fat. Vitamin C and "
                     "B-complex are water-soluble.",
    },
    {
        "key": "fsn_011", "topic": "c12_home_004", "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "Define 'balanced diet' and list its components.",
        "answer": "A balanced diet provides all essential nutrients in the right proportions. "
                   "Components: (1) Energy-yielding foods (carbs, fats). (2) Body-building "
                   "foods (proteins). (3) Protective foods (vitamins, minerals). (4) Water "
                   "and roughage.",
        "solution": "A balanced diet should provide 50-60% energy from carbs, 10-15% from "
                     "proteins, and 20-30% from fats, plus adequate vitamins and minerals.",
    },
]

_EXTRA_MPL = [
    {
        "key": "mpl_008", "topic": "c12_home_005", "qtype": "mcq",
        "difficulty": 0.4,
        "question_text": "For a patient with diabetes, which nutrient should be most carefully "
                          "controlled?",
        "options": ["Proteins", "Carbohydrates", "Fats", "Vitamins"],
        "answer": "Carbohydrates",
        "solution": "Carbohydrates directly affect blood sugar levels. Diabetic diets control "
                     "carbohydrate intake with complex carbs and fibre.",
    },
    {
        "key": "mpl_009", "topic": "c12_home_005", "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "What factors should be considered while planning meals for the elderly?",
        "answer": "1) Reduced calorie needs due to lower activity. 2) Adequate protein to "
                   "prevent muscle loss. 3) Calcium and vitamin D for bone health. "
                   "4) Easy-to-chew, digestible foods. 5) Adequate fibre for digestion. "
                   "6) Smaller, frequent meals.",
        "solution": "Elderly meal planning must account for metabolic changes, chronic "
                     "conditions, dental health, and medication interactions.",
    },
]

_EXTRA_TXL = [
    {
        "key": "txl_007", "topic": "c12_home_006", "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "Which fibre is known as the 'Golden Fibre'?",
        "options": ["Cotton", "Jute", "Silk", "Wool"],
        "answer": "Jute",
        "solution": "Jute is called the 'Golden Fibre' due to its golden/silvery shine and "
                     "economic importance. India is the largest producer of jute.",
    },
    {
        "key": "txl_008", "topic": "c12_home_006", "qtype": "fill_blank",
        "difficulty": 0.4,
        "question_text": "A fabric made from regenerated cellulose fibre derived from wood pulp "
                          "is called ______.",
        "answer": "rayon",
        "solution": "Rayon (viscose) is a semi-synthetic fibre made by chemically processing "
                     "cellulose from wood pulp. It is soft, absorbent, and drapes well.",
    },
    {
        "key": "txl_009", "topic": "c12_home_006", "qtype": "short_answer",
        "difficulty": 0.55,
        "question_text": "What is the purpose of 'mercerisation' in cotton processing?",
        "answer": "Mercerisation treats cotton yarn/fabric with concentrated sodium hydroxide "
                   "(caustic soda) under tension. Effects: (1) Increases lustre and dye "
                   "affinity. (2) Improves strength. (3) Increases absorbency. "
                   "(4) Makes fabric more dimensionally stable.",
        "solution": "Mercerisation is named after John Mercer who developed the process in "
                     "1844. It is widely used for high-quality cotton products.",
    },
]

_EXTRA_CET = [
    {
        "key": "cet_007", "topic": "c12_home_007", "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "Which of the following is an example of a consumer cooperative?",
        "options": ["Reliance Trends", "Amul", "Big Bazaar", "Shoppers Stop"],
        "answer": "Amul",
        "solution": "Amul is a cooperative society of dairy farmers. It is a prime example of "
                     "consumer/supplier cooperative benefiting producers and consumers alike.",
    },
    {
        "key": "cet_008", "topic": "c12_home_007", "qtype": "short_answer",
        "difficulty": 0.5,
        "question_text": "What is 'misbranding' of a product? Give an example.",
        "answer": "Misbranding occurs when a product's label is false or misleading. "
                   "Example: A product claiming to be '100% pure honey' when it contains "
                   "added sugar syrup, or a product with an incorrect net quantity label.",
        "solution": "Misbranding is an offence under the Consumer Protection Act and FSSAI "
                     "regulations. Consumers can file complaints against misbranded products.",
    },
    {
        "key": "cet_009", "topic": "c12_home_007", "qtype": "long_answer",
        "difficulty": 0.7,
        "question_text": "Explain how the Consumer Protection Act, 2019 empowers consumers.",
        "answer": "The CPA 2019 empowers consumers through: (1) Enhanced rights including "
                   "right to seek punitive damages. (2) Consumer Dispute Redressal Commissions "
                   "at District, State, and National levels. (3) E-filing of complaints. "
                   "(4) Product liability provisions holding manufacturers accountable. "
                   "(5) Central Consumer Protection Authority (CCPA) for enforcement. "
                   "(6) Simplified procedures for claims under 1 crore rupees.",
        "solution": "The 2019 amendment significantly strengthened consumer rights and "
                     "simplified dispute resolution mechanisms in India.",
    },
]

_EXTRA_HLH = [
    {
        "key": "hlh_008", "topic": "c12_home_008", "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "Which organisation is responsible for primary health care in India?",
        "options": ["WHO", "ICMR", "NRHM", "UNICEF"],
        "answer": "NRHM",
        "solution": "The National Rural Health Mission (NRHM), now subsumed under Ayushman "
                     "Bharat, is responsible for providing primary health care in rural India.",
    },
    {
        "key": "hlh_009", "topic": "c12_home_008", "qtype": "fill_blank",
        "difficulty": 0.4,
        "question_text": "The disease caused by deficiency of iodine is called ______.",
        "answer": "goitre",
        "solution": "Iodine deficiency causes enlargement of the thyroid gland (goitre). It "
                     "is prevented by iodised salt consumption.",
    },
    {
        "key": "hlh_010", "topic": "c12_home_008", "qtype": "short_answer",
        "difficulty": 0.55,
        "question_text": "What are the components of a balanced diet according to the National "
                          "Institute of Nutrition (NIN)?",
        "answer": "The NIN recommends: (1) Cereals and millets (as staple). "
                   "(2) Pulses, legumes, and meat. (3) Vegetables and fruits. "
                   "(4) Milk and milk products. (5) Fats, sugars, and nuts. "
                   "Aim for variety, moderation, and balance across food groups.",
        "solution": "NIN's dietary guidelines for Indians emphasise consuming a variety of "
                     "foods from all food groups in appropriate quantities.",
    },
]

_EXTRA_ENV = [
    {
        "key": "env_008", "topic": "c12_home_009", "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "Which of the following is NOT a greenhouse gas?",
        "options": ["Carbon dioxide", "Methane", "Nitrous oxide", "Oxygen"],
        "answer": "Oxygen",
        "solution": "Greenhouse gases include CO2, CH4 (methane), N2O, and fluorinated gases. "
                     "Oxygen is not a greenhouse gas.",
    },
    {
        "key": "env_009", "topic": "c12_home_009", "qtype": "fill_blank",
        "difficulty": 0.4,
        "question_text": "The practice of growing plants without soil, using mineral nutrient "
                          "solutions, is called ______.",
        "answer": "hydroponics",
        "solution": "Hydroponics is a method of growing plants in a water-based, nutrient-rich "
                     "solution without soil. It is used for sustainable urban farming.",
    },
    {
        "key": "env_010", "topic": "c12_home_009", "qtype": "short_answer",
        "difficulty": 0.55,
        "question_text": "What is the difference between biodegradable and non-biodegradable waste?",
        "answer": "Biodegradable waste decomposes naturally by micro-organisms (e.g., food "
                   "scraps, paper, leaves). Non-biodegradable waste does not decompose or "
                   "takes hundreds of years (e.g., plastics, glass, metals, e-waste). "
                   "Biodegradable waste can be composted; non-biodegradable requires recycling.",
        "solution": "Proper segregation and disposal of these waste types is essential for "
                     "environmental sustainability.",
    },
]

_EXTRA_CAR = [
    {
        "key": "car_007", "topic": "c12_home_010", "qtype": "mcq",
        "difficulty": 0.3,
        "question_text": "Which body is the apex consumer court in India?",
        "options": ["District Consumer Forum", "State Consumer Commission",
                    "National Consumer Disputes Redressal Commission", "Supreme Court"],
        "answer": "National Consumer Disputes Redressal Commission",
        "solution": "NCDRC (National Consumer Disputes Redressal Commission) is the apex "
                     "body. Below it are State Commissions and District Forums.",
    },
    {
        "key": "car_008", "topic": "c12_home_010", "qtype": "fill_blank",
        "difficulty": 0.4,
        "question_text": "A professional who develops new food products and ensures their "
                          "safety and quality is called a food ______.",
        "answer": "technologist",
        "solution": "Food technology is an interdisciplinary field combining food science, "
                     "microbiology, chemistry, and engineering.",
    },
    {
        "key": "car_009", "topic": "c12_home_010", "qtype": "short_answer",
        "difficulty": 0.55,
        "question_text": "What are the higher study options in Home Science after Class 12?",
        "answer": "1) B.Sc. Home Science (with specialisations in Food & Nutrition, Textiles "
                   "& Apparel, Child Development, Resource Management). "
                   "2) B.Sc. Nutrition and Dietetics. "
                   "3) B.F.Tech (Fashion Technology). "
                   "4) B.Des. Interior Design. "
                   "5) B.Ed. in Home Science.",
        "solution": "Students can pursue B.Sc., B.Tech, B.Des., and professional diplomas. "
                     "Postgraduate options include M.Sc., M.Tech, MBA, and M.Phil/Ph.D.",
    },
]

# Merge all extensions
for extra_list in [_EXTRA_FAM, _EXTRA_CDG, _EXTRA_HOU, _EXTRA_FSN, _EXTRA_MPL,
                   _EXTRA_TXL, _EXTRA_CET, _EXTRA_HLH, _EXTRA_ENV, _EXTRA_CAR]:
    for entry in extra_list:
        _BANK[entry["key"]] = {k: v for k, v in entry.items() if k != "key"}


# ──────────────────────────────────────────────
#  Solver Functions
# ──────────────────────────────────────────────

def solve_mcq(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Solve an MCQ question by checking the user answer against the correct answer."""
    correct = user_answer.strip() == question["answer"].strip()
    return {
        "correct": correct,
        "user_answer": user_answer,
        "expected_answer": question["answer"],
        "explanation": question.get("solution", ""),
    }


def solve_fill_blank(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Solve a fill-in-the-blank question."""
    correct = user_answer.strip().lower() == question["answer"].strip().lower()
    return {
        "correct": correct,
        "user_answer": user_answer,
        "expected_answer": question["answer"],
        "explanation": question.get("solution", ""),
    }


def solve_short_answer(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Solve a short-answer question by keyword matching."""
    expected = question["answer"].lower()
    user = user_answer.lower()
    expected_words = set(re.findall(r'\b[a-z]{3,}\b', expected))
    user_words = set(re.findall(r'\b[a-z]{3,}\b', user))
    if not expected_words:
        match_ratio = 0.0
    else:
        match_ratio = len(expected_words & user_words) / len(expected_words)
    correct = match_ratio >= 0.4
    return {
        "correct": correct,
        "user_answer": user_answer,
        "expected_answer": question["answer"],
        "match_ratio": round(match_ratio, 2),
        "explanation": question.get("solution", ""),
    }


def solve_long_answer(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Solve a long-answer question by keyword matching with broader tolerance."""
    expected = question["answer"].lower()
    user = user_answer.lower()
    expected_words = set(re.findall(r'\b[a-z]{4,}\b', expected))
    user_words = set(re.findall(r'\b[a-z]{4,}\b', user))
    if not expected_words:
        match_ratio = 0.0
    else:
        match_ratio = len(expected_words & user_words) / len(expected_words)
    correct = match_ratio >= 0.25
    return {
        "correct": correct,
        "user_answer": user_answer,
        "expected_answer": question["answer"],
        "match_ratio": round(match_ratio, 2),
        "explanation": question.get("solution", ""),
    }


def solve_numerical(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Solve a numerical question by extracting and comparing numeric values."""
    try:
        user_num = float(re.search(r'[\d.]+', user_answer).group())
        expected_num = float(re.search(r'[\d.]+', question["answer"]).group())
        tolerance = 0.5  # allow ±0.5
        correct = abs(user_num - expected_num) <= tolerance
    except (AttributeError, ValueError, TypeError):
        correct = False
        user_num = None
        expected_num = None
    return {
        "correct": correct,
        "user_answer": user_answer,
        "expected_answer": question["answer"],
        "explanation": question.get("solution", ""),
    }


# Dispatch table for solve functions
SOLVE_DISPATCH: Dict[str, Callable] = {
    "mcq": solve_mcq,
    "fill_blank": solve_fill_blank,
    "short_answer": solve_short_answer,
    "long_answer": solve_long_answer,
    "numerical": solve_numerical,
}


def solve_question(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Unified solver – dispatches to the appropriate type-specific solver."""
    qtype = question.get("question_type", question.get("qtype", ""))
    solver = SOLVE_DISPATCH.get(qtype)
    if solver is None:
        return {"error": f"Unknown question type: {qtype}"}
    return solver(question, user_answer)


# ──────────────────────────────────────────────
#  Verification
# ──────────────────────────────────────────────

def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Validate that every question has the required fields and consistent data."""
    required_fields = [
        "id", "question_text", "question_type", "answer",
        "difficulty", "topic", "solution", "verification",
    ]
    valid_types = {"mcq", "fill_blank", "short_answer", "long_answer", "numerical"}
    results = {"valid": True, "errors": [], "warnings": [], "count": len(questions)}

    for idx, q in enumerate(questions):
        qid = q.get("id", f"index_{idx}")
        for field in required_fields:
            if field not in q:
                results["errors"].append(f"{qid}: missing field '{field}'")
                results["valid"] = False


def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate deterministic questions from the _BANK using seeded random."""
    rng = random.Random(seed)
    all_q = list(_BANK.values())
    rng.shuffle(all_q)
    result = []
    for i, q in enumerate(all_q[:count]):
        q_copy = dict(q)
        q_copy.setdefault("id", f"c12_home_{seed}_{i:03d}")
        q_copy.setdefault("question_type", q_copy.get("type", "mcq"))
        q_copy.setdefault("difficulty", q_copy.get("difficulty", 0.5))
        q_copy.setdefault("topic", q_copy.get("topic", "home_science"))
        q_copy.setdefault("verification", True)
        if "question_text" not in q_copy and "text" in q_copy:
            q_copy["question_text"] = q_copy["text"]
        result.append(q_copy)
    return result


QUESTION_REGISTRY = {"home_science": generate_questions}


if __name__ == "__main__":
    qs = generate_questions(42, 10)
    print(f"Generated {len(qs)} questions")
    v = verify_all_questions(qs)
    print(f"Valid: {v['valid']}, Errors: {len(v['errors'])}")
    for q in qs[:3]:
        print(f"  {q.get('id', '?')}: {q.get('question_text', q.get('text', ''))[:60]}")